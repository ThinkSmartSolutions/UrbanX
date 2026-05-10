// ═══════════════════════════════════════════════════════════════════════════
// URBANX — TCI CINEMA v1.0
// Animeaza harta EXISTENTA din platforma (window.map)
// Camera cinematica: overview → zoom zone → strada → detaliu parcela
// Canvas overlay: text, carduri, HUD — pe deasupra hartii reale
// ═══════════════════════════════════════════════════════════════════════════

const TCI = {

  map: null,
  canvas: null, ctx: null,
  running: false,
  _showEUCompare: true,    // vizibil implicit
  speed: 1,
  year: 2021,
  startYear: 2021,
  scenario: 'S2',
  mode: 'uat',        // 'uat' | 'parcela'
  cityKey: 'iasi',
  cityData: null,
  activeParcel: null,
  raf: null,
  startTime: 0,
  pausedAt: 0,
  bearing: 0,
  _selectedUATKey: null,

  YEAR_DUR:     12000,
  MILESTONE_DUR:18000,
  INTRO_DUR:    10000,
  OUTRO_DUR:    8000,
  MILES: [2025, 2030, 2035, 2040, 2045, 2050, 2055],

  // ── Camera presets per mod ────────────────────────────────────────────────
  CAM: {
    uat: {
      overview:  { zoom:11.5, pitch:0,  bearing:0   },   // intreg orasul
      drone:     { zoom:13.5, pitch:52, bearing:-20  },   // drone 3D
      detail:    { zoom:15,   pitch:62, bearing:30   },   // zona densa
      street:    { zoom:16.5, pitch:72, bearing:60   },   // nivel strada
    },
    parcela: {
      context:   { zoom:13,   pitch:40, bearing:-10  },   // context oras
      zone:      { zoom:15,   pitch:58, bearing:-20  },   // zona UTR
      detail:    { zoom:16.5, pitch:65, bearing:0    },   // parcela + vecini
      street:    { zoom:17.5, pitch:72, bearing:30   },   // nivel strada
    },
  },

  // ── OPEN: selector mod ────────────────────────────────────────────────────
  open(opts = {}) {
    if(opts.mode) { this._launch(opts.mode, opts); return; }
    this._showSelector();
  },

  // ── Selector vizual ───────────────────────────────────────────────────────
  _showSelector() {
    if(window._TCI_URL_RESTORE && !window._TCI_URL_RESTORE.done) {
      console.log('[TCI._showSelector] Blocat - URL restore pending');
      return;
    }
    let sel = document.getElementById('tci-sel');
    if(sel) { sel.style.display='flex'; return; }

    sel = document.createElement('div');
    sel.id = 'tci-sel';
    sel.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(2,6,15,0.95);backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:"Space Grotesk","Inter",sans-serif;';

    const ap     = window.S?.parcels?.[window.S?.activeParcel ?? 0];
    const hasP   = !!(ap?.geo);
    const uatKey = window.S?.activeUAT || window._ProjectionEngine?.currentCity || 'iasi';
    const city   = (typeof _RO_CITIES_DB !== 'undefined') ? _RO_CITIES_DB[uatKey] : null;

    sel.innerHTML = `
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:9px;font-weight:700;color:#D4AF37;letter-spacing:.2em;margin-bottom:6px">TEMPORAL CITY INTELLIGENCE</div>
        <div style="font-size:20px;font-weight:800;color:#fff">Alege tipul proiecției</div>
        <div style="font-size:10px;color:rgba(148,163,184,0.5);margin-top:4px">Date oficiale · INSE · Eurostat · ANCPI · IPCC AR6</div>
      </div>

      <div style="display:flex;gap:16px;max-width:740px;width:100%;padding:0 16px;">

        <!-- MOD UAT -->
        <div style="flex:1;background:rgba(14,26,52,0.85);border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:32px">🏙</div>
          <div style="font-size:14px;font-weight:800;color:#60a5fa">Proiecție UAT</div>
          <div style="font-size:10px;color:rgba(148,163,184,0.7);line-height:1.7;flex:1">
            Vedere de ansamblu + zoom cinematice.<br>
            Tendințe extindere, densitate, riscuri,<br>
            infrastructură, comparare cu alte orașe.
          </div>
          <div style="font-size:8px;color:rgba(148,163,184,0.5);margin-bottom:4px">UAT pentru proiecție:</div>
          <input type="text" id="tci-sel-uat"
            placeholder="Caută UAT..."
            value="${city?.name || ''}"
            autocomplete="off"
            oninput="TCI._selSearch(this.value)"
            onclick="event.stopPropagation()"
            style="background:rgba(255,255,255,0.08);border:1px solid rgba(59,130,246,0.25);color:#fff;padding:7px 9px;border-radius:6px;font-size:10px;font-family:inherit;width:100%;box-sizing:border-box;">
          <div id="tci-sel-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:6px;max-height:110px;overflow-y:auto;display:none;"></div>
          <button onclick="event.stopPropagation();TCI._launch('uat')"
            style="padding:9px;border-radius:7px;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.45);color:#60a5fa;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;">
            ▶ Pornește UAT
          </button>
          <button onclick="event.stopPropagation();TCI._gps()"
            style="padding:7px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(148,163,184,0.6);font-size:10px;cursor:pointer;font-family:inherit;">
            📍 Detectează din GPS
          </button>
        </div>

        <!-- MOD PARCELA -->
        <div style="flex:1;background:rgba(14,26,52,0.85);border:1px solid ${hasP?'rgba(212,175,55,0.3)':'rgba(255,255,255,0.08)'};border-radius:12px;padding:22px;display:flex;flex-direction:column;gap:10px;${hasP?'':'opacity:.5'}">
          <div style="font-size:32px">📍</div>
          <div style="font-size:14px;font-weight:800;color:${hasP?'#D4AF37':'rgba(148,163,184,0.4)'}">Proiecție Zonă Parcelă</div>
          <div style="font-size:10px;color:rgba(148,163,184,0.7);line-height:1.7;flex:1">
            Zoom street-level pe parcela selectată.<br>
            Clădiri vecine, UTR activ, indicatori PUG,<br>
            evoluție construcții în zonă.
          </div>
          ${hasP
            ? `<div style="background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.2);border-radius:6px;padding:8px;font-size:9px;color:rgba(212,175,55,0.8);">
                ✓ Parcelă: <b>${ap.nrCad||ap.nrcad||'—'}</b><br>
                UTR: <b>${ap.utr||'—'}</b> · ${ap.uat||''}<br>
                ${ap.area?`Suprafață: ${parseFloat(ap.area).toFixed(0)} mp`:''}
              </div>
              <button onclick="event.stopPropagation();TCI._launch('parcela')"
                style="padding:9px;border-radius:7px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;">
                ▶ Pornește Zonă Parcelă
              </button>`
            : `<div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);border-radius:6px;padding:8px;font-size:9px;color:rgba(239,68,68,0.7);">
                ⚠ Nicio parcelă selectată.<br>Închide, selectează o parcelă pe hartă, revenind la TCI.
              </div>`
          }
        </div>
      </div>

      <button onclick="document.getElementById('tci-sel').style.display='none'"
        style="margin-top:20px;padding:7px 18px;border-radius:7px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:rgba(148,163,184,0.5);font-size:11px;cursor:pointer;font-family:inherit;">
        ✕ Anulează
      </button>`;
    document.body.appendChild(sel);
  },

  _selSearch(q) {
    clearTimeout(this._ss);
    this._ss = setTimeout(() => {
      const res = (typeof _searchUAT !== 'undefined') ? _searchUAT(q, 7) : [];
      const el  = document.getElementById('tci-sel-res');
      if(!el) return;
      if(!res.length) { el.style.display='none'; return; }
      el.innerHTML = res.map(r => `
        <div onclick="TCI._pickUAT('${r.key}','${r.name}')"
          style="padding:6px 10px;cursor:pointer;font-size:10px;color:rgba(200,215,235,0.9);"
          onmouseover="this.style.background='rgba(255,255,255,0.06)'"
          onmouseout="this.style.background='none'">
          <b>${r.name}</b>
          <span style="color:rgba(148,163,184,0.4);font-size:8px"> jud.${r.judet} · ${(r.pop2021||0).toLocaleString()} loc.</span>
        </div>`).join('');
      el.style.display = 'block';
    }, 250);
  },

  _pickUAT(key, name) {
    this._selectedUATKey = key;
    const inp = document.getElementById('tci-sel-uat');
    if(inp) inp.value = name;
    const res = document.getElementById('tci-sel-res');
    if(res) res.style.display = 'none';
  },

  _gps() {
    if(!navigator.geolocation) { alert('GPS indisponibil.'); return; }
    const inp = document.getElementById('tci-sel-uat');
    if(inp) inp.value = '📍 Se detectează...';
    navigator.geolocation.getCurrentPosition(pos => {
      if(typeof _RO_CITIES_DB === 'undefined') return;
      let best = null, bestD = Infinity;
      Object.entries(_RO_CITIES_DB).forEach(([k,v]) => {
        if(!v.lat||!v.lon) return;
        const d = (v.lat-pos.coords.latitude)**2+(v.lon-pos.coords.longitude)**2;
        if(d < bestD) { bestD=d; best={k,v}; }
      });
      if(best) {
        this._selectedUATKey = best.k;
        if(inp) inp.value = best.v.name;
      }
    }, () => { if(inp) inp.value=''; });
  },

  // ── Launch ────────────────────────────────────────────────────────────────
  _launch(mode, opts = {}) {
    document.getElementById('tci-sel')?.remove();

    this.map = window.map;
    if(!this.map || typeof this.map.flyTo !== 'function') {
      // Nu alert - retry silentios
      console.warn('[TCI._launch] window.map nu e gata, retry in 1s');
      setTimeout(() => this._launch(mode, opts), 1000);
      return;
    }

    this.mode = mode;

    if(mode === 'parcela') {
      this.activeParcel = window.S?.parcels?.[window.S?.activeParcel ?? 0];
      if(!this.activeParcel?.geo) { alert('Selectați o parcelă mai întâi.'); return; }
      this.cityKey = this._detectCity() || window.S?.activeUAT || 'iasi';
    } else {
      const inp = document.getElementById('tci-sel-uat')?.value;
      this.cityKey = this._selectedUATKey
        || opts.cityKey
        || (inp && typeof _searchUAT !== 'undefined' ? (_searchUAT(inp,1)[0]?.key || null) : null)
        || window.S?.activeUAT
        || window._ProjectionEngine?.currentCity
        || 'iasi';
      this._selectedUATKey = null;
    }

    this.cityData = (typeof _RO_CITIES_DB !== 'undefined')
      ? _RO_CITIES_DB[this.cityKey] || Object.values(_RO_CITIES_DB)[0]
      : null;

    this.scenario  = opts.scenario || window._ProjectionEngine?.currentScenario || 'S2';
    this.startYear = Math.max(2021, Math.min(2054, new Date().getFullYear()));
    this.year      = this.startYear;
    this.pausedAt  = 0;
    this.bearing   = this.map.getBearing?.() || 0;

    this._buildOverlay();
    this._hideParcelPopup();
    this._addMapLayers();
    this._cameraIntro();
    // Camera cinematica: initializam dupa ce harta e GARANTAT gata
    const _initCam = () => {
      const cx = this.activeParcel?.lon || this.cityData?.lon || 27.601;
      const cy = this.activeParcel?.lat || this.cityData?.lat || 47.158;
      this._initCinemaCamera(cx, cy);
      // Primul shot: imediat dupa initializare
      this._lastCinemaFly = 0;
    };
    if(this.map?.isStyleLoaded?.() && this.map?.loaded?.()) {
      setTimeout(_initCam, 800);
    } else {
      this.map?.once('idle', () => setTimeout(_initCam, 500));
      setTimeout(_initCam, 4000);  // fallback absolut
    }
    // Director cinematic: porneste filmul dupa 1.5s (harta e gata)
    this._directorInit();
    setTimeout(() => {
      if(this.Director && this.mode !== 'parcela') this.Director.play();
    }, 1500);
    // Phase 3: Three.js + AI Narrator + Video + Spline Camera
    setTimeout(() => this._initPhase3(), 800);
    this.start();
  },

  // ── Overlay fullscreen (canvas + UI) ─────────────────────────────────────
  _buildOverlay() {
    let ov = document.getElementById('tci-ov');
    if(ov) { ov.style.display='block'; this._updateHeader(); return; }

    // Pune harta fullscreen
    const mapEl = document.getElementById('map');
    if(mapEl) {
      mapEl.style.cssText = 'position:fixed!important;inset:0!important;z-index:2999!important;width:100vw!important;height:100vh!important;';
      this.map.resize?.();
    }

    ov = document.createElement('div');
    ov.id = 'tci-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:3000;pointer-events:none;font-family:"Space Grotesk","Inter",sans-serif;';
    ov.innerHTML = `
      <style>
        @media(max-width:600px){
          #tci-lpanel{width:0!important;overflow:hidden!important;}
          #tci-rpanel{width:0!important;overflow:hidden!important;}
          #tci-rtoggle{display:none!important;}
          #tci-ltoggle{display:none!important;}
          #tci-narcard{left:8px!important;right:8px!important;transform:none!important;width:auto!important;max-width:none!important;bottom:68px!important;}
          #tci-bottom-bar{left:0!important;right:0!important;}
        }
      </style>
      <canvas id="tci-canvas" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:transparent;"></canvas>

      <!-- TOPBAR -->
      <div style="position:absolute;top:0;left:0;right:0;pointer-events:all;background:rgba(4,10,24,0.88);backdrop-filter:blur(14px);border-bottom:1px solid rgba(212,175,55,0.15);padding:8px 14px;display:flex;align-items:center;gap:10px;z-index:10;">
        <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.15em;">TCI</div>
        <div id="tci-hdr-city" style="font-size:14px;font-weight:800;color:#fff;"></div>
        <div id="tci-hdr-meta" style="font-size:9px;color:rgba(148,163,184,0.55);"></div>
        <div style="flex:1;"></div>
        <!-- Moduri camera -->
        <div style="display:flex;gap:3px;" id="tci-cam-btns">
          ${this.mode==='uat'
            ? [['overview','🌍 Oraș'],['drone','🚁 Drone 3D'],['detail','🏘 Cartier'],['street','🚶 Stradă']].map(([id,l])=>`
              <button onclick="TCI._camPreset('${id}')" id="tci-cam-${id}"
                style="padding:5px 9px;border-radius:5px;border:1px solid ${id==='drone'?'rgba(59,130,246,0.5)':'rgba(255,255,255,0.08)'};background:${id==='drone'?'rgba(59,130,246,0.15)':'transparent'};color:${id==='drone'?'#60a5fa':'rgba(148,163,184,0.6)'};font-size:9px;cursor:pointer;font-family:inherit;pointer-events:all;">${l}</button>`).join('')
            : [['context','🌍 Context'],['zone','🏘 Zonă UTR'],['detail','📍 Parcelă'],['street','🚶 Stradă']].map(([id,l])=>`
              <button onclick="TCI._camPreset('${id}')" id="tci-cam-${id}"
                style="padding:5px 9px;border-radius:5px;border:1px solid ${id==='detail'?'rgba(212,175,55,0.5)':'rgba(255,255,255,0.08)'};background:${id==='detail'?'rgba(212,175,55,0.12)':'transparent'};color:${id==='detail'?'#D4AF37':'rgba(148,163,184,0.6)'};font-size:9px;cursor:pointer;font-family:inherit;pointer-events:all;">${l}</button>`).join('')
          }
        </div>
        <!-- Scenarii -->
        <div style="display:flex;gap:2px;">
          ${[['S1','Opt','#22c55e'],['S2','Mod','#8b5cf6'],['S3','Con','#f59e0b'],['S4','Clim','#38bdf8']].map(([id,l,col])=>`
            <button onclick="TCI.setScenario('${id}')" id="tci-scen-${id}"
              style="padding:4px 7px;border-radius:4px;border:1px solid ${id==='S2'?col+'55':'rgba(255,255,255,0.07)'};background:${id==='S2'?col+'18':'transparent'};color:${id==='S2'?col:'rgba(148,163,184,0.45)'};font-size:9px;font-weight:700;cursor:pointer;font-family:inherit;pointer-events:all;">${l}</button>`).join('')}
        </div>
        <button id="tci-cinema-toggle" onclick="TCI._cinemaActive=!TCI._cinemaActive;this.textContent=TCI._cinemaActive?'🎬 Auto':'📍 Manual';this.style.color=TCI._cinemaActive?'#D4AF37':'rgba(148,163,184,0.6)';"
          style="padding:5px 10px;border-radius:5px;border:1px solid rgba(212,175,55,0.25);background:rgba(212,175,55,0.08);color:#D4AF37;font-size:10px;cursor:pointer;font-family:inherit;pointer-events:all;">🎬 Auto</button>
        <button onclick="TCI.close()" style="padding:5px 12px;border-radius:5px;border:1px solid rgba(255,255,255,0.12);background:transparent;color:rgba(148,163,184,0.6);font-size:11px;cursor:pointer;font-family:inherit;pointer-events:all;">✕</button>
      </div>

      <!-- PANEL STANG -->
      <div style="position:absolute;left:0;top:48px;bottom:62px;width:185px;pointer-events:all;background:rgba(4,10,24,0.85);backdrop-filter:blur(12px);border-right:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10;">
        <div id="tci-left" style="padding:10px;display:flex;flex-direction:column;gap:8px;"></div>
      </div>

      <!-- PANEL DREAPTA: deschis by default, scrollabil -->
      <div id="tci-rpanel" style="position:absolute;right:0;top:48px;bottom:62px;width:200px;pointer-events:all;background:rgba(4,10,24,0.92);backdrop-filter:blur(14px);border-left:1px solid rgba(255,255,255,0.07);overflow:hidden;z-index:10;transition:width .2s ease;">
        <div id="tci-right" style="padding:8px;width:200px;height:100%;overflow-y:auto;box-sizing:border-box;"></div>
      </div>
      <!-- Buton toggle dreapta -->
      <button id="tci-rtoggle" onclick="TCI._toggleRight()" title="Arată/Ascunde panel"
        style="position:absolute;right:200px;top:50%;transform:translateY(-50%);z-index:11;background:rgba(4,10,24,0.85);border:1px solid rgba(255,255,255,0.1);border-right:none;border-radius:6px 0 0 6px;color:rgba(148,163,184,0.6);padding:8px 4px;font-size:9px;cursor:pointer;writing-mode:vertical-rl;pointer-events:all;transition:right .2s ease;">
        ◂ DATE
      </button>

      <!-- CARD NARATIUNE — sincronizat cu camera, mare, lizibil -->
      <div id="tci-narcard" style="
        position:absolute;
        left:50%;transform:translateX(-50%);
        bottom:78px;
        max-width:520px;width:calc(100% - 420px);min-width:280px;
        z-index:9;pointer-events:none;
        background:rgba(4,10,24,0.92);
        backdrop-filter:blur(16px);
        border:1px solid rgba(212,175,55,0.3);
        border-radius:10px;padding:12px 16px;
        transition:opacity .4s ease;
      ">
        <div id="tci-narcard-title" style="
          font-size:13px;font-weight:700;color:#D4AF37;
          margin-bottom:5px;line-height:1.3;
          font-family:'Space Grotesk','Inter',sans-serif;
        "></div>
        <div id="tci-narcard-body" style="
          font-size:12px;color:rgba(200,215,235,0.88);
          line-height:1.55;
          font-family:'Space Grotesk','Inter',sans-serif;
        "></div>
        <div id="tci-narcard-src" style="
          font-size:9px;color:rgba(148,163,184,0.5);
          margin-top:5px;font-style:italic;
        "></div>
      </div>

      <!-- BOTTOM BAR -->
      <div style="position:absolute;bottom:0;left:185px;right:200px;pointer-events:all;background:rgba(4,10,24,0.9);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.15);padding:8px 14px;display:flex;align-items:center;gap:10px;z-index:10;">
        <div id="tci-yr" style="font-size:24px;font-weight:900;color:#D4AF37;min-width:46px;">${this.startYear}</div>
        <div style="flex:1;position:relative;">
          <input type="range" id="tci-scrub" min="${this.startYear}" max="2055" value="${this.startYear}" step="1"
            oninput="TCI.scrubTo(+this.value)"
            style="width:100%;accent-color:#D4AF37;height:4px;">
          <div style="display:flex;justify-content:space-between;font-size:7px;color:rgba(148,163,184,0.35);margin-top:1px;">
            <span>${this.startYear}</span><span>2030</span><span>2040</span><span>2050</span><span>2055</span>
          </div>
        </div>
        <button id="tci-play" onclick="TCI.toggle()"
          style="padding:7px 14px;border-radius:7px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;">▶ Play</button>
        <select onchange="TCI.speed=+this.value" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:4px 7px;border-radius:5px;font-size:10px;font-family:inherit;cursor:pointer;">
          <option value="1">1×</option><option value="3">3×</option><option value="8">8×</option>
        </select>
        <div id="tci-kpi-bar" style="display:flex;gap:12px;margin-left:6px;"></div>
      </div>`;
    document.body.appendChild(ov);

    this.canvas = document.getElementById('tci-canvas');
    this.ctx    = this.canvas.getContext('2d');
    this._resizeCv();
    window.addEventListener('resize', () => this._resizeCv());
    this._updateHeader();
    this._buildLeftPanel();
    this._buildRightPanel();
  },

  _resizeCv() {
    if(!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  _updateHeader() {
    const n  = document.getElementById('tci-hdr-city');
    const m2 = document.getElementById('tci-hdr-meta');
    if(!n || !this.cityData) return;
    n.textContent  = this.cityData.name || '—';
    const pop  = (this.cityData.pop2021||0).toLocaleString();
    const rata = (this.cityData.rata_reala_2011_2021||0).toFixed(2);
    const mode = this.mode === 'parcela'
      ? `Parcelă ${this.activeParcel?.nrCad||this.activeParcel?.nrcad||'—'} · UTR ${this.activeParcel?.utr||'—'}`
      : `${pop} loc. · ${rata}%/an · jud. ${this.cityData.judet||''}`;
    if(m2) m2.textContent = mode + ` · proiecție ${this.startYear}-2055`;
  },

  // ── Panel stang ───────────────────────────────────────────────────────────
  _buildLeftPanel() {
    const el = document.getElementById('tci-left'); if(!el) return;
    el.innerHTML = `
      <!-- Comparare orase -->
      <div style="border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:8px;">
        <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:5px">COMPARARE ORAȘE</div>
        <div style="font-size:8px;color:rgba(148,163,184,0.55);margin-bottom:4px">${this.cityData?.name||'—'} vs:</div>
        <input type="text" id="tci-cmp-inp" placeholder="Caută UAT (ex: Cluj, Botoșani...)"
          autocomplete="off" oninput="TCI._cmpSearch(this.value)"
          style="width:100%;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:6px 8px;border-radius:6px;font-size:10px;font-family:inherit;box-sizing:border-box;">
        <div id="tci-cmp-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:6px;max-height:120px;overflow-y:auto;display:none;margin-top:3px;"></div>
        <div id="tci-cmp-out" style="margin-top:6px;"></div>
      </div>

      <!-- Export -->
      <div>
        <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:5px">EXPORT</div>
        <button onclick="TCI._snapshot()" style="display:block;width:100%;text-align:left;padding:6px 8px;margin-bottom:3px;border-radius:5px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.8);font-size:10px;cursor:pointer;font-family:inherit;">📷 Snapshot PNG</button>
        <button onclick="TCI._share()" style="display:block;width:100%;text-align:left;padding:6px 8px;border-radius:5px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.8);font-size:10px;cursor:pointer;font-family:inherit;">🔗 Share URL</button>
      </div>`;
  },

  // ── Panel dreapta ─────────────────────────────────────────────────────────
  _buildRightPanel() {
    const el = document.getElementById('tci-right'); if(!el) return;
    el.innerHTML = `
      <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:6px">DATE LIVE</div>
      <div id="tci-kpis-r"></div>
      <div id="tci-risk-r" style="margin-top:6px;"></div>

      <!-- Grafic demografic mini -->
      <div style="margin-top:8px;background:rgba(14,26,52,0.7);border-radius:7px;padding:8px;border:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:8px;font-weight:700;color:#D4AF37;margin-bottom:5px">📈 Proiecție demografică</div>
        <canvas id="tci-chart-pop" width="165" height="70" style="width:100%;display:block;"></canvas>
        <div style="font-size:6.5px;color:rgba(100,120,150,0.5);margin-top:3px">INSE · Cohort-Survival · 2021-2055</div>
      </div>

      <!-- EU Comparison -->
      <div style="margin-top:8px;background:rgba(14,26,52,0.7);border-radius:7px;border:1px solid rgba(139,92,246,0.2);">
        <div style="padding:7px 8px;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:8px;font-weight:700;color:#a78bfa">⚖ Comparare EU</span>
          <button onclick="TCI._showEUCompare=!TCI._showEUCompare;document.getElementById('tci-eu-body').style.display=TCI._showEUCompare?'block':'none';this.textContent=TCI._showEUCompare?'▲':'▼';"
            style="background:none;border:none;color:rgba(148,163,184,0.6);cursor:pointer;font-size:10px;padding:0 4px;">▲</button>
        </div>
        <div id="tci-eu-body" style="padding:0 8px 8px;">
          <div id="tci-eu-content"></div>
          <div style="font-size:6px;color:rgba(100,120,150,0.4);margin-top:5px">Eurostat Urban Audit 2021 · proiectat per scenariu</div>
        </div>
      </div>

      <!-- Surse -->
      <div style="margin-top:8px;padding:7px;background:rgba(14,26,52,0.5);border-radius:6px;font-size:6.5px;color:rgba(100,120,150,0.55);line-height:1.7;">
        INSE · Eurostat · ANCPI · BNR<br>IPCC AR6 · ANM · INFP · ANAR<br>
        <span style="color:rgba(212,175,55,0.5);font-style:italic">UrbanX · analiză statistică</span>
      </div>`;

    // Dupa render, desenam graficul
    setTimeout(() => this._drawDemoChart(), 200);
  },

  _drawDemoChart() {
    const cv = document.getElementById('tci-chart-pop');
    if(!cv) return;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    ctx.clearRect(0,0,W,H);

    // Fundal
    ctx.fillStyle = 'rgba(4,10,24,0.01)';
    ctx.fillRect(0,0,W,H);

    const sY = this.startYear || 2026;
    const years = [];
    for(let y=sY;y<=2055;y+=3) years.push(y);

    const scenColors = {S1:'#22c55e',S2:'#8b5cf6',S3:'#f59e0b',S4:'#38bdf8'};
    const scens = ['S1','S2','S3','S4'];

    // Asele
    ctx.strokeStyle = 'rgba(148,163,184,0.2)';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(20,5); ctx.lineTo(20,H-12); ctx.lineTo(W-5,H-12); ctx.stroke();

    // Valori min/max pentru scala
    let minP = Infinity, maxP = 0;
    scens.forEach(sc => {
      years.forEach(y => {
        const d = typeof _getProjectionData !== 'undefined' ? _getProjectionData(y,sc,this.cityKey) : null;
        const v = d?.demo?.value || this.cityData?.pop2021 || 0;
        if(v < minP) minP=v; if(v > maxP) maxP=v;
      });
    });
    const range = maxP - minP || 1;

    // Linii per scenariu
    scens.forEach((sc, si) => {
      ctx.strokeStyle = scenColors[sc] + (sc === this.scenario ? 'ff' : '66');
      ctx.lineWidth   = sc === this.scenario ? 2 : 1;
      ctx.beginPath();
      years.forEach((y, i) => {
        const d = typeof _getProjectionData !== 'undefined' ? _getProjectionData(y,sc,this.cityKey) : null;
        const v = d?.demo?.value || this.cityData?.pop2021 || 0;
        const px = 22 + (i / (years.length-1)) * (W-28);
        const py = H-14 - ((v-minP)/range) * (H-22);
        i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py);
      });
      ctx.stroke();

      // Label scenariu
      ctx.fillStyle = scenColors[sc] + (sc === this.scenario ? 'ff' : '88');
      ctx.font = '6px sans-serif';
      ctx.fillText(sc, W-18+si*0, 10+si*9);
    });

    // Marker an curent
    const curT = (this.year - sY) / Math.max(1, 2055-sY);
    const markerX = 22 + curT * (W-28);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1;
    ctx.setLineDash([2,2]);
    ctx.beginPath(); ctx.moveTo(markerX,5); ctx.lineTo(markerX,H-12); ctx.stroke();
    ctx.setLineDash([]);

    // Labels axe
    ctx.fillStyle = 'rgba(148,163,184,0.45)';
    ctx.font = '5px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(sY, 22, H-3);
    ctx.fillText('2055', W-5, H-3);
    ctx.fillText(this.year, markerX, H-3);

    // Legenda scenarii (colț dreapta sus)
    scens.forEach((sc,i) => {
      const lx = W-36, ly = 6+i*9;
      ctx.fillStyle = scenColors[sc];
      ctx.fillRect(lx, ly, 12, 2);
      ctx.fillStyle = 'rgba(148,163,184,0.6)';
      ctx.textAlign = 'left';
      ctx.fillText(sc, lx+14, ly+3);
    });
    ctx.textAlign = 'left';
  },

  _updateEUPanel(year, totalT) {
    if(!this._showEUCompare) return;
    const el = document.getElementById('tci-eu-content');
    if(!el) return;

    const cd  = this.cityData;
    const tip = cd?.tip || 'municipiu';
    const peer = this._EU_PEERS[tip] || this._EU_PEERS.municipiu;
    const euKeys = peer.eu || ['miskolc','ruse'];
    const roKeys = (peer.ro || ['iasi','brasov']).filter(k => k !== this.cityKey).slice(0,2);

    const curEU = this._EU_CITIES[this._getEUCityKey(this.cityKey)] || {
      name:cd?.name||'UAT', country:'RO', flag:'🇷🇴',
      pop:cd?.pop2021||100000, pib:12000, modal_auto:72, verde:8, conv_eu:65,
    };

    // Construim lista: curent + 2 EU + 2 RO
    const cities = [
      { key:this.cityKey, data:curEU, isCurrent:true, isRO:true },
      ...euKeys.map(k => ({ key:k, data:this._EU_CITIES[k], isCurrent:false, isRO:false })).filter(x=>x.data),
      ...roKeys.map(k => {
        const euK = this._getEUCityKey(k);
        const euD = this._EU_CITIES[euK];
        return { key:k, data:euD, isCurrent:false, isRO:true };
      }).filter(x=>x.data),
    ];

    const metrics = [
      { k:'pib',        l:'PIB/cap',   u:'€', fmt:(v)=>'€'+(v/1000).toFixed(0)+'k', good:true  },
      { k:'conv_eu',    l:'Conv. EU',  u:'%', fmt:(v)=>v+'%',                        good:true  },
      { k:'modal_auto', l:'Auto %',    u:'%', fmt:(v)=>v+'%',                        good:false },
      { k:'verde',      l:'Verdeață',  u:'mp',fmt:(v)=>v+'mp',                       good:true  },
    ];

    // Proiectam per totalT
    const proj = (city, key) => {
      const isRO = city.isRO;
      const f = isRO ? 1+totalT*0.55 : 1+totalT*0.35;
      const base = city.data[key] || 0;
      if(key==='pib')        return Math.round(base * f);
      if(key==='conv_eu')    return Math.min(130, Math.round(base * (1+totalT*(isRO?0.35:0.08))));
      if(key==='modal_auto') return Math.max(28, Math.round(base - totalT*(isRO?30:18)));
      if(key==='verde')      return Math.round(base * (1+totalT*(isRO?0.6:0.3)));
      return base;
    };

    const maxVals = {pib:50000, conv_eu:130, modal_auto:80, verde:40};

    el.innerHTML = `
      <!-- Header orase -->
      <div style="display:grid;grid-template-columns:repeat(${cities.length},1fr);gap:2px;margin-bottom:6px;">
        ${cities.map(city=>`
          <div style="text-align:center;">
            <div style="font-size:9px">${city.data.flag||''}</div>
            <div style="font-size:7.5px;font-weight:${city.isCurrent?700:500};color:${city.isCurrent?'#D4AF37':city.isRO?'#60a5fa':'rgba(200,215,235,0.8)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${city.data.name}</div>
            <div style="font-size:6px;color:rgba(100,120,150,0.5)">${city.data.country}</div>
          </div>`).join('')}
      </div>

      ${metrics.map(m=>`
        <div style="margin-bottom:6px;">
          <div style="font-size:7px;color:rgba(148,163,184,0.6);margin-bottom:2px">${m.l} <span style="color:rgba(100,120,150,0.4)">${m.u}</span></div>
          <div style="display:grid;grid-template-columns:repeat(${cities.length},1fr);gap:2px;">
            ${cities.map(city => {
              const v   = proj(city, m.k);
              const pct = Math.min(1, v / maxVals[m.k]);
              const good = m.good ? pct > 0.6 : pct < 0.5;
              const col = city.isCurrent ? '#D4AF37'
                        : good ? '#22c55e' : pct > 0.35 ? '#f59e0b' : '#ef4444';
              return `<div style="text-align:center;">
                <div style="background:rgba(255,255,255,0.05);border-radius:2px;height:4px;margin-bottom:2px;">
                  <div style="width:${Math.round(pct*100)}%;height:100%;background:${col};border-radius:2px;"></div>
                </div>
                <div style="font-size:7px;font-weight:${city.isCurrent?700:400};color:${col}">${m.fmt(v)}</div>
              </div>`;
            }).join('')}
          </div>
        </div>`).join('')}`;
  },

  // ── Layere minime pe harta existenta ─────────────────────────────────────
  _addMapLayers() {
    const m = this.map; if(!m) return;
    m.scrollZoom?.enable();
    m.dragPan?.enable();
    m.doubleClickZoom?.enable();
    m.touchZoomRotate?.enable();

    const d  = this.cityData;
    const ap = this.activeParcel;
    const cx = ap?.lon || d?.lon || 27.601;
    const cy = ap?.lat || d?.lat || 47.158;

    // ── MAPBOX STANDARD STYLE — fotorealism, lighting, umbre reale ──────────
    // Schimbam la Standard daca nu e deja activ
    const currentStyle = m.getStyle?.()?.name || '';
    if(!currentStyle.toLowerCase().includes('standard')) {
      try {
        m.setStyle('mapbox://styles/mapbox/standard');
        // Dupa incarcarea stilului nou, re-adaugam layerele TCI
        m.once('style.load', () => {
          console.log('[TCI] Mapbox Standard loaded — re-adding layers');
          this._setLightPreset('dusk');
          this._addTCILayers(cx, cy);
        });
        return;  // layers se adauga la style.load
      } catch(e) {
        console.warn('[TCI] Standard style failed, continuam cu stilul existent:', e.message);
      }
    }

    this._addTCILayers(cx, cy);
  },

  // Seteaza iluminatul Mapbox Standard per scena
  _setLightPreset(preset) {
    try {
      const m = this.map;
      if(!m) return;
      m.setConfigProperty('basemap','lightPreset', preset);
      console.log('[TCI] Light preset:', preset);
    } catch(e) { /* stilul poate sa nu fie Standard */ }
  },

  _addTCILayers(cx, cy) {
    const m = this.map; if(!m) return;

    // ── Clădiri 3D — sursa Mapbox Streets v8 ────────────────────────────────
    if(!m.getSource?.('tci-bld-src')) {
      try {
        // Sursa separata de buildings — nu depinde de STYLES.custom
        m.addSource('tci-bld-src', {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        });
      } catch(e) { console.warn('[TCI-L2] bld-src:', e.message); }
    }
    if(!m.getLayer?.('tci-bld-anim')) {
      try {
        m.addLayer({
          id: 'tci-bld-anim',
          type: 'fill-extrusion',
          source: 'tci-bld-src',
          'source-layer': 'building',
          filter: ['==', ['get','extrude'], 'true'],
          minzoom: 13,
          paint: {
            'fill-extrusion-color': [
              'interpolate', ['linear'], ['get', 'height'],
              0,  '#0d1f3c',
              12, '#16306e',
              25, '#1e4080',
              50, '#2455a0',
              100,'#2e6ab8',
            ],
            'fill-extrusion-height': ['get','height'],
            'fill-extrusion-base':   ['get','min_height'],
            'fill-extrusion-opacity': 0.88,
          },
        });
        console.log('[TCI-L2] ✅ 3D buildings layer adaugat (Mapbox Streets v8)');
      } catch(e) { console.warn('[TCI-L2] buildings:', e.message); }
    }

    // ── L2: Zone constructie activa — layer separat cu GeoJSON custom ────────
    if(!m.getSource?.('tci-constr')) {
      try {
        // Generam zone de constructie in jurul centrului orasului
        // (unde e presiunea maxima de densificare conform UTR M/C)
        const constrFeatures = this._generateConstrZones(cx, cy);
        m.addSource('tci-constr', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: constrFeatures },
        });
        m.addLayer({
          id: 'tci-constr-layer',
          type: 'fill-extrusion',
          source: 'tci-constr',
          paint: {
            'fill-extrusion-color':   '#f59e0b',
            'fill-extrusion-height':  ['get', 'h'],
            'fill-extrusion-base':    0,
            'fill-extrusion-opacity': 0,   // invizibil initial, creste cu anii
          },
        });
        // Layer separat: cladiri FINALIZATE (albastru deschis)
        m.addSource('tci-done', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });
        m.addLayer({
          id: 'tci-done-layer',
          type: 'fill-extrusion',
          source: 'tci-done',
          paint: {
            'fill-extrusion-color':   '#3b82f6',
            'fill-extrusion-height':  ['get', 'h'],
            'fill-extrusion-base':    0,
            'fill-extrusion-opacity': 0,
          },
        });
      } catch(e) {}
    }

    // ── L3: Rețea stradală colorată per congestie (trafic real) ───────────
    if(!m.getLayer?.('tci-roads-flow')) {
      try {
        m.addLayer({
          id: 'tci-roads-flow',
          type: 'line',
          source: 'composite',
          'source-layer': 'road',
          filter: ['in', ['get', 'class'],
            ['literal', ['primary','secondary','tertiary','street','motorway']]
          ],
          minzoom: 12,
          paint: {
            'line-color':   '#94a3b8',
            'line-width':   ['interpolate', ['linear'], ['zoom'],
              12, 1.5,
              16, 3.5,
            ],
            'line-opacity': 0.55,
          },
        });
      } catch(e) { console.warn('[TCI-L3] roads:', e.message); }
    }

    // ── L3: Transport public — linii animate ───────────────────────────────
    if(!m.getSource?.('tci-tp')) {
      try {
        m.addSource('tci-tp', {
          type: 'geojson',
          data: this._generateTPLines(cx, cy),
        });
        m.addLayer({
          id: 'tci-tp-layer',
          type: 'line',
          source: 'tci-tp',
          paint: {
            'line-color':   ['get', 'color'],
            'line-width':   3,
            'line-opacity': 0,   // invizibil pana in 2028
          },
        });
      } catch(e) {}
    }

    // ── L4: Vectori presiune urbana ─────────────────────────────────────────
    if(!m.getSource?.('tci-pressure')) {
      try {
        m.addSource('tci-pressure', {
          type: 'geojson',
          data: this._generatePressureVectors(cx, cy),
        });
        m.addLayer({
          id: 'tci-pressure-layer',
          type: 'line',
          source: 'tci-pressure',
          paint: {
            'line-color':   ['get', 'color'],
            'line-width':   ['get', 'width'],
            'line-opacity': 0,
          },
        });
        // Capete sagetate pentru vectori
        m.addLayer({
          id: 'tci-pressure-points',
          type: 'circle',
          source: 'tci-pressure',
          paint: {
            'circle-radius':  ['get', 'r'],
            'circle-color':   ['get', 'color'],
            'circle-opacity': 0,
          },
        });
      } catch(e) {}
    }

    // ── L4: Heatmap presiune demografica ───────────────────────────────────
    if(!m.getSource?.('tci-pop')) {
      try {
        m.addSource('tci-pop', {
          type: 'geojson',
          data: this._generatePopHeat(cy, cx, 0.4),
        });
        m.addLayer({
          id: 'tci-pop-layer',
          type: 'heatmap',
          source: 'tci-pop',
          paint: {
            'heatmap-weight':     ['get','w'],
            'heatmap-radius':     35,
            'heatmap-intensity':  0.4,
            'heatmap-opacity':    0.28,
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0,   'rgba(0,0,255,0)',
              0.3, 'rgba(50,50,255,0.3)',
              0.6, 'rgba(139,92,246,0.5)',
              0.85,'rgba(212,175,55,0.6)',
              1,   'rgba(255,80,0,0.7)',
            ],
          },
        });
      } catch(e) {}
    }

    // ── L3: Particule trafic pe coordonate reale (nu random) ───────────────
    if(!m.getSource?.('tci-tr')) {
      try {
        m.addSource('tci-tr', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] }
        });
        m.addLayer({
          id: 'tci-tr-layer',
          type: 'circle',
          source: 'tci-tr',
          paint: {
            'circle-radius':  ['get','r'],
            'circle-color':   ['get','c'],
            'circle-opacity': 0.82,
            'circle-blur':    0.2,
          },
        });
      } catch(e) {}
    }

    this._initParticlesOnRoads(cx, cy);

    // Heatmap populatie (safe pe orice stil)
    if(!m.getSource?.('tci-pop')) {
      try {
        const pts = [];
        for(let i=0;i<80;i++){const a=Math.random()*Math.PI*2,r=Math.random()*0.025;pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+Math.cos(a)*r,cy+Math.sin(a)*r*0.7]},properties:{w:Math.random()}});}
        m.addSource('tci-pop',{type:'geojson',data:{type:'FeatureCollection',features:pts}});
        m.addLayer({id:'tci-pop-layer',type:'heatmap',source:'tci-pop',
          paint:{'heatmap-weight':['get','w'],'heatmap-radius':35,'heatmap-intensity':0.4,'heatmap-opacity':0.28,
            'heatmap-color':['interpolate',['linear'],['heatmap-density'],0,'rgba(0,0,255,0)',0.3,'rgba(50,50,255,0.3)',0.6,'rgba(139,92,246,0.5)',1,'rgba(255,80,0,0.65)']}});
      } catch(e) {}
    }

    // Traffic dots (safe pe orice stil)
    if(!m.getSource?.('tci-tr')) {
      try {
        m.addSource('tci-tr',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
        m.addLayer({id:'tci-tr-layer',type:'circle',source:'tci-tr',
          paint:{'circle-radius':['get','r'],'circle-color':['get','c'],'circle-opacity':0.8,'circle-blur':0.2}});
      } catch(e) {}
    }
  },

  // ── Camera cinematica intro ───────────────────────────────────────────────
  _cameraIntro() {
    const m  = this.map; if(!m) return;
    const d  = this.cityData;
    const ap = this.activeParcel;
    const cx = ap?.lon || d?.lon || 27.601;
    const cy = ap?.lat || d?.lat || 47.158;

    if(this.mode === 'parcela') {
      // Porn direct la nivelul parcelei — 3D street level
      m.flyTo({ center:[cx,cy], zoom:16.5, pitch:62, bearing:-15, duration:100, essential:true });
      this.bearing = -15;
    } else {
      // UAT: Drone 3D direct — pitch 55° de la inceput
      m.flyTo({ center:[cx,cy], zoom:14.5, pitch:55, bearing:-20, duration:100 });
      // Dupa 200ms: confirmare pozitie exacta
      setTimeout(() => {
        m.flyTo({
          center:   [cx, cy],
          zoom:     14.5,
          pitch:    55,
          bearing:  -20,
          duration: 3000,
          essential: true,
        });
      }, 200);
      this.bearing = -20;
    }
  },

  // ── Camera presets manual ─────────────────────────────────────────────────
  _camPreset(id) {
    const m  = this.map; if(!m) return;
    const d  = this.cityData;
    const ap = this.activeParcel;
    const cx = ap?.lon || d?.lon || 27.601;
    const cy = ap?.lat || d?.lat || 47.158;
    const pr = this.CAM[this.mode]?.[id]; if(!pr) return;
    m.flyTo({ center:[cx,cy], ...pr, duration:2500, essential:true });
    this.bearing = pr.bearing;

    // Highlight buton activ
    document.querySelectorAll('[id^="tci-cam-"]').forEach(b => {
      const active = b.id === 'tci-cam-'+id;
      const isUAT  = this.mode === 'uat';
      const col    = isUAT ? '#60a5fa' : '#D4AF37';
      const borderC= isUAT ? 'rgba(59,130,246,0.5)' : 'rgba(212,175,55,0.5)';
      const bgC    = isUAT ? 'rgba(59,130,246,0.15)' : 'rgba(212,175,55,0.12)';
      b.style.border    = active ? `1px solid ${borderC}` : '1px solid rgba(255,255,255,0.08)';
      b.style.background= active ? bgC : 'transparent';
      b.style.color     = active ? col : 'rgba(148,163,184,0.6)';
    });
  },

  // ── LOOP ─────────────────────────────────────────────────────────────────
  start() {
    if(this.running) return;
    this.running   = true;
    this.startTime = performance.now() - this.pausedAt;
    const btn = document.getElementById('tci-play');
    if(btn) btn.textContent = '⏸ Pauza';
    // Prima narativa: afisam cardul cu informatii initiale
    setTimeout(() => {
      const titleEl = document.getElementById('tci-narcard-title');
      const bodyEl  = document.getElementById('tci-narcard-body');
      const srcEl   = document.getElementById('tci-narcard-src');
      const card    = document.getElementById('tci-narcard');
      const name    = this.cityData?.name || 'UAT';
      if(titleEl) titleEl.textContent = `🏙 ${name} — Proiecție ${this.startYear}–2055`;
      if(bodyEl)  bodyEl.textContent  = `Culorile UTR: 🔵 Rezidențial · 🟣 Mixt/Central · 🟠 Comercial · 🟢 Spații verzi · 🔴 Industrial. Clădirile cresc cu densificarea urbană. Camera va zbura automat prin cele 4 zone ale orașului.`;
      if(srcEl)   srcEl.textContent   = '📊 PUG · RLU · Date INSE · Eurostat · ANCPI';
      if(card)    card.style.opacity  = '1';
    }, 1200);
    this._loop();
  },

  pause() {
    this.running  = false;
    this.pausedAt = performance.now() - this.startTime;
    cancelAnimationFrame(this.raf);
    const btn = document.getElementById('tci-play');
    if(btn) btn.textContent = '▶ Play';
  },

  toggle() { this.running ? this.pause() : this.start(); },

  _loop() {
    if(!this.running) return;
    // Phase 3: tick cinematic spline camera fiecare frame
    this._CC?.tick();
    const elapsed = (performance.now() - this.startTime) * this.speed;
    const sY = this.startYear;

    if(elapsed < this.INTRO_DUR) {
      this._draw2D_intro(elapsed / this.INTRO_DUR);
      // La 70% din intro, activam Drone 3D automat
      if(elapsed > this.INTRO_DUR * 0.7 && elapsed < this.INTRO_DUR * 0.72) {
        this._camPreset(this.mode === 'parcela' ? 'detail' : 'drone');
      }
    } else {
      let t = elapsed - this.INTRO_DUR;
      let found = false;
      for(let yr = sY; yr <= 2055; yr++) {
        const isMile = this.MILES.includes(yr);
        const dur    = isMile ? this.YEAR_DUR + this.MILESTONE_DUR : this.YEAR_DUR;
        if(t < dur) {
          if(yr !== this.year) this._onYearChange(yr);
          const yT = Math.min(1, t / this.YEAR_DUR);
          const tT = (yr - sY) / Math.max(1, 2055 - sY);
          this._animateMap(yr, yT, tT);
          if(isMile && t >= this.YEAR_DUR) {
            this._draw2D_milestone(yr, (t - this.YEAR_DUR) / this.MILESTONE_DUR);
            this._drawParcelRiskCard(this.ctx, this.canvas?.width||800, this.canvas?.height||600);
          } else {
            this._draw2D_hud(yr, yT, tT);
          }
          found = true; break;
        }
        t -= dur;
      }
      if(!found) {
        const ot = Math.min(1, t/this.OUTRO_DUR);
        this._draw2D_outro(ot);
        if(ot >= 1) { this.pause(); return; }
      }
    }
    this.raf = requestAnimationFrame(() => this._loop());
  },

  // ── Narrative: explica ce se vede ────────────────────────────────────────
  _NARRATIVES: {
    pop_growth:    { text:'Heatmap-ul violet → portocaliu arată presiunea demografică. Intensitate mai mare = densitate populației mai ridicată în această zonă.', src:'INSE · Cohort-Survival' },
    pop_decline:   { text:'Heatmap-ul albastru spre violet indică scădere demografică. Zonele mai deschise pierd население față de 2021.', src:'INSE · Model Eurostat' },
    traffic_modal: { text:'Punctele gri = autoturisme. Albastre = transport public. Verzi = bicicliști/pietoni. Raportul se schimbă progresiv spre mobilitate sustenabilă.', src:'Eurostat Modal Split 2021→2055' },
    utr_colors:    { text:'Culorile UTR-urilor: Albastru = rezidențial colectiv · Violet = mixt/central · Portocaliu = comercial · Verde = spații verzi · Roșu = industrial.', src:'PUG + RLU per UAT' },
    climate_heat:  { text:'Temperatura crește cu +0.8°C la 2030 și +2.8°C la 2055 față de 1990 (IPCC AR6 RCP8.5). Zonele dense acumulează mai multă căldură urbană.', src:'IPCC AR6 · ANM ROCADA' },
    risk_seismic:  { text:'Profilul seismic al acestui UAT (INFP P100-1/2013) influențează reglementările de construcție și limitele de înălțime în zonele de risc.', src:'INFP · Normativ P100-1/2013' },
    densification: { text:'Densificarea urbană este vizibilă prin creșterea intensității heatmap-ului. Zona centrală crește mai rapid datorită indicatorilor CUT mai mari.', src:'ANCPI · Autorizații construcție' },
    esg_verde:     { text:'ESG-ul urban crește prin adăugarea de spații verzi (min. 9 mp/loc OMS). Zonele verzi apar mai intens pe hartă odată cu implementarea strategiei climatice.', src:'OMS · Eurostat SDG · ANM' },
    pib_conv:      { text:'Convergența economică față de media UE crește progresiv. PIB/cap estimat prin modelul Mankiw-Romer-Weil calibrat cu date BNR și Eurostat.', src:'BNR · Eurostat · MRW 1992' },
    infra_tp:      { text:'Transportul public se extinde după 2028. Numărul de linii și stații crește odată cu densificarea urbană și obiectivele PNRR mobilitate sustenabilă.', src:'MDLPA · PNRR Transport · Eurostat' },
  },

  _narrativeTimer: 0,
  _narrativeIndex: 0,

  _updateNarrative(year, totalT, mode) {
    const now = Date.now();
    if(now - this._narrativeTimer < 6000) return;
    this._narrativeTimer = now;

    // Daca exista zona activa afisata de camera, actualizam doar datele numerice
    if(this._currentZone) {
      const pd = (typeof _getProjectionData !== 'undefined')
        ? _getProjectionData(year, this.scenario, this.cityKey) : null;
      const bodyEl = document.getElementById('tci-narcard-body');
      const curShot = this._STORY_SHOTS?.[this._storyShotIdx % (this._STORY_SHOTS?.length||1)];
      if(bodyEl && curShot?.type !== 'zbor') {
        const newBody = this._currentZone.narText(year, pd);
        if(newBody !== bodyEl.textContent) {
          bodyEl.style.opacity = '0.6';
          setTimeout(() => { bodyEl.textContent = newBody; bodyEl.style.opacity = '1'; }, 300);
        }
      }
      return;
    }

    // Fallback: fara zona activa, afisam narativa contextuala
    const d = (typeof _getProjectionData !== 'undefined')
      ? _getProjectionData(year, this.scenario, this.cityKey) : null;
    const rateP = this.cityData?.rata_reala_2011_2021 || 0;

    let narrativeKey;
    if(year >= 2045 && d?.climate?.deltaT >= 2) narrativeKey = 'climate_heat';
    else if(year >= 2030 && totalT > 0.3) {
      narrativeKey = ['densification','traffic_modal','pib_conv','infra_tp','esg_verde'][this._narrativeIndex++ % 5];
    } else if(rateP < -0.5) narrativeKey = 'pop_decline';
    else if(rateP > 0.3)    narrativeKey = 'pop_growth';
    else narrativeKey = ['utr_colors','traffic_modal','risk_seismic','pop_growth'][this._narrativeIndex++ % 4];

    const narr = this._NARRATIVES[narrativeKey];
    if(!narr) return;

    const titleEl = document.getElementById('tci-narcard-title');
    const bodyEl  = document.getElementById('tci-narcard-body');
    const srcEl   = document.getElementById('tci-narcard-src');
    const card    = document.getElementById('tci-narcard');

    if(!bodyEl) return;
    if(card) card.style.opacity = '0';
    setTimeout(() => {
      if(titleEl) titleEl.textContent = `📍 ${this.cityData?.name||''} · ${year}`;
      bodyEl.textContent = narr.text;
      if(srcEl) srcEl.textContent = '📊 ' + narr.src;
      if(card)  card.style.opacity = '1';
    }, 350);
  },

  // ── Animatie harta per an ─────────────────────────────────────────────────
  _animateMap(year, yearT, totalT) {
    const m  = this.map; if(!m) return;
    const d  = (typeof _getProjectionData !== 'undefined')
      ? _getProjectionData(year, this.scenario, this.cityKey) : null;
    const ms = (typeof _getModalSplit !== 'undefined')
      ? _getModalSplit(year) : {auto:72,tp:18,bici_ped:10};

    // 1. Camera: rotire lenta drone (doar in mod drone/3D)
    if(m.getPitch?.() > 30) {
      this.bearing += 0.006 * this.speed;
      m.setBearing?.(this.bearing % 360);
    }

    // 2. Zoom automat la milestone: zoom in dramatic
    if(this.MILES.includes(year) && yearT < 0.05) {
      const ap = this.activeParcel;
      const cd = this.cityData;
      const cx = ap?.lon || cd?.lon || 27.601;
      const cy = ap?.lat || cd?.lat || 47.158;
      const zTarget = this.mode === 'parcela' ? 17 + Math.random() : 14.5 + Math.random() * 1.5;
      m.flyTo({ center:[cx,cy], zoom:zTarget, pitch:55+Math.random()*20, bearing:this.bearing+40, duration:3000, essential:true });
    }

    // 3. Heatmap populatie — intensitate creste cu populatia
    if(m.getLayer?.('tci-pop-layer') && d) {
      const pr = (d.demo?.value || this.cityData?.pop2021 || 100000) / (this.cityData?.pop2021 || 100000);
      const pl = 0.22 + Math.sin(Date.now()/750)*0.06 + totalT*0.25;
      try {
        m.setPaintProperty('tci-pop-layer','heatmap-opacity', Math.min(0.5, pl*pr));
        m.setPaintProperty('tci-pop-layer','heatmap-intensity', 0.3+totalT*0.7*pr);
      } catch(e) {}
    }

    // 4. Traffic animat
    if(m.getSource?.('tci-tr')) {
      const ap = this.activeParcel;
      const cd = this.cityData;
      const cx = ap?.lon||cd?.lon||27.601;
      const cy = ap?.lat||cd?.lat||47.158;
      const spread = this.mode === 'parcela' ? 0.008 : 0.02;
      const active = Math.round(60*(0.3+totalT*0.8)*(ms.auto/72));
      const t2 = Date.now()/1000;
      const features = Array.from({length:active},(_,i)=>{
        const r=(s)=>{let x=Math.sin(s)*9999;return x-Math.floor(x);};
        const sx=i*1337, spd=0.3+r(sx+7)*0.7;
        const bx=cx+(r(sx+4)-0.5)*spread*2, by=cy+(r(sx+5)-0.5)*spread;
        const px=bx+Math.sin(t2*spd+r(sx+6)*Math.PI*2)*spread*0.3;
        const py=by+Math.cos(t2*spd*0.7+r(sx+6)*Math.PI*2)*spread*0.15;
        const type=i<active*ms.auto/100?'car':i<active*(ms.auto+ms.tp)/100?'bus':'bike';
        const c2=type==='car'?'#94a3b8':type==='bus'?'#3b82f6':'#22c55e';
        const rr=type==='bus'?3.5:type==='bike'?1.5:2;
        return {type:'Feature',geometry:{type:'Point',coordinates:[px,py]},properties:{c:c2,r:rr}};
      });
      try { m.getSource('tci-tr').setData({type:'FeatureCollection',features}); } catch(e) {}
    }

    // 5. Update KPIs si risk
    if(d) {
      this._updateKPIs(d, ms);
      this._updateRisk();
    }
    // 6. Narrative strip
    this._updateNarrative(year, totalT, this.mode);
  },

  // ── 2D Overlay: intro ────────────────────────────────────────────────────
  _draw2D_intro(t) {
    const ctx=this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    // Fade-in rapid - doar primele 0.3s acopera harta
    const fi=Math.min(1,t*4);
    if(fi < 1) {
      ctx.fillStyle=`rgba(2,6,15,${1-fi})`;
      ctx.fillRect(0,0,W,H);
    }
    if(t>0.18){
      const ta=Math.min(1,(t-0.18)/0.2)*(t<0.78?1:Math.max(0,(1-t)/0.22));
      const cn=this.cityData?.name||'UAT';
      const pop=(this.cityData?.pop2021||0).toLocaleString();
      const modeLabel = this.mode==='parcela'
        ? `Parcelă ${this.activeParcel?.nrCad||this.activeParcel?.nrcad||'—'} · UTR ${this.activeParcel?.utr||'—'}`
        : `${pop} loc. · Proiecție ${this.startYear}-2055`;
      ctx.textAlign='center';
      ctx.fillStyle=`rgba(212,175,55,${ta*0.9})`;ctx.font='bold 10px "Space Grotesk"';
      ctx.fillText('TEMPORAL CITY INTELLIGENCE',W/2,H*0.32);
      ctx.fillStyle=`rgba(255,255,255,${ta})`;ctx.font=`bold ${Math.round(34+t*8)}px "Space Grotesk"`;
      ctx.fillText(cn,W/2,H*0.41);
      ctx.fillStyle=`rgba(148,163,184,${ta*0.75})`;ctx.font='10px "Space Grotesk"';
      ctx.fillText(modeLabel,W/2,H*0.49);
      ctx.fillStyle=`rgba(100,120,150,${ta*0.5})`;ctx.font='8px "Space Grotesk"';
      ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6 · ANM · INFP · ANAR',W/2,H*0.54);
      if(t>0.4){const bt=Math.min(1,(t-0.4)/0.5);ctx.fillStyle=`rgba(212,175,55,${ta*0.12})`;ctx.fillRect(W/2-W*0.16,H*0.61,W*0.32,2);ctx.fillStyle=`rgba(212,175,55,${ta})`;ctx.fillRect(W/2-W*0.16,H*0.61,W*0.32*bt,2);}
      ctx.textAlign='left';
    }
  },

  // ── 2D Overlay: HUD normal ────────────────────────────────────────────────
  _draw2D_hud(year, yearT, totalT) {
    const ctx=this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    // An mare semitransparent
    ctx.fillStyle=`rgba(212,175,55,${0.05+Math.sin(yearT*Math.PI)*0.03})`;
    ctx.font=`bold ${Math.round(H*0.20)}px "Space Grotesk",monospace`;
    ctx.textAlign='left';
    ctx.fillText(year, 200, H*0.52);
    // Bara progres
    ctx.fillStyle='rgba(212,175,55,0.75)';
    ctx.fillRect(185, H-63, (W-185)*(totalT+yearT*(1/Math.max(1,2055-this.startYear))), 2);
    // Watermark
    ctx.save();ctx.globalAlpha=0.45;ctx.textAlign='right';
    ctx.fillStyle='rgba(148,163,184,0.6)';ctx.font='7px "Space Grotesk"';
    ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6 · ANM · INFP · ANAR',W-10,H-70);
    ctx.fillStyle='rgba(212,175,55,0.5)';ctx.font='bold 7px "Space Grotesk"';
    ctx.fillText('UrbanX · Analiză statistică și proiecție · date oficiale publice',W-10,H-61);
    ctx.restore();ctx.textAlign='left';

    // ── LEGENDA UTR pe canvas (colț dreapta jos, deasupra watermark) ────────
    this._drawLegend(ctx, W, H);
    // ── PARCEL RISK CARD (colț stânga sus, mod parcela) ──────────────────
    this._drawParcelRiskCard(ctx, W, H);
    // ── COMPARARE EU (overlay central jos) ────────────────────────────────
    const _tT = (this.year - (this.startYear||2026)) / Math.max(1, 2055 - (this.startYear||2026));

    // ── CITY LIFE: vehicule, pietoni, puls urban ──────────────────────────
    this._drawCityLife(ctx, W, H);
    // ── DIRECTOR OVERLAY per scena ────────────────────────────────────────
    if(this.Director._active) this._drawDirectorOverlay(ctx, W, H);

  },

  // ── Legenda UTR vizibila pe harta ─────────────────────────────────────────
  _drawLegend(ctx, W, H) {
    const items = [
      { c:'#1e40af', l:'Rezidențial colectiv (L)' },
      { c:'#5b21b6', l:'Mixt / Central (M)' },
      { c:'#b45309', l:'Comercial (C)' },
      { c:'#065f46', l:'Instituțional (IS)' },
      { c:'#16a34a', l:'Spații verzi (V)' },
      { c:'#991b1b', l:'Industrial (I)' },
      { c:'#f59e0b', l:'Construcție activă' },
    ];
    const LW = 148, LH = items.length * 14 + 18;
    const LX = W - LW - 10;
    const LY = H - 95 - LH;

    ctx.save();
    ctx.globalAlpha = 0.88;
    ctx.fillStyle = 'rgba(4,10,24,0.85)';
    this._rr(ctx, LX, LY, LW, LH, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 0.5;
    this._rr(ctx, LX, LY, LW, LH, 6);
    ctx.stroke();

    ctx.fillStyle = 'rgba(212,175,55,0.85)';
    ctx.font = 'bold 7.5px "Space Grotesk"';
    ctx.textAlign = 'left';
    ctx.fillText('FUNCȚIUNI URBANE — PUG+RLU', LX+8, LY+10);

    items.forEach((item, i) => {
      const y = LY + 18 + i * 14;
      ctx.fillStyle = item.c;
      ctx.fillRect(LX+8, y-5, 8, 8);
      ctx.fillStyle = 'rgba(200,215,235,0.82)';
      ctx.font = '7.5px "Space Grotesk"';
      ctx.fillText(item.l, LX+20, y+2);
    });
    ctx.restore();
    ctx.textAlign = 'left';
  },

  // ── 2D Overlay: Milestone card ────────────────────────────────────────────
  _draw2D_milestone(year, t) {
    const ctx=this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    const ci=Math.min(1,t*4), co=t>0.78?Math.max(0,(1-t)/0.22):1, al=ci*co;
    if(al<0.04) return;
    const d=(typeof _getProjectionData!=='undefined')?_getProjectionData(year,this.scenario,this.cityKey):null;
    const cn=this.cityData?.name||'UAT';
    const pd=d?.demo?.delta||0;
    const texts={
      2025:{t:'Punct de plecare',b:`Date INSE 2021 calibrate pentru ${cn}. Rata: ${(this.cityData?.rata_reala_2011_2021||0).toFixed(2)}%/an. Proiecție activată.`},
      2030:{t:'Bilanț 2030',b:`Convergență EU: ${d?.euConvergence||74}%. Temp +${d?.climate?.deltaT||0.8}°C (IPCC AR6). ${(d?.housing?.stockNou||0).toLocaleString()} locuințe noi.`},
      2035:{t:'Jumătatea perioadei',b:`${cn}: ${(d?.demo?.value||0).toLocaleString()} loc. (${pd>=0?'+':''}${pd.toLocaleString()} față de ${this.startYear}). ${d?.climate?.heatDays||15} zile >35°C/an.`},
      2040:{t:'Agenda urbană 2040',b:`ESG: ${d?.esg?.rating||'B'} (${d?.esg?.total||70}/100). Convergență EU: ${d?.euConvergence||88}%.`},
      2045:{t:'Viziunea 2045',b:`PIB/cap: €${(d?.housing?.pibCapProj||20000).toLocaleString()} (Mankiw-Romer-Weil). ${d?.climate?.heatDays||20} zile caniculare/an.`},
      2050:{t:'Orizont net-zero',b:`+${d?.climate?.deltaT||2.5}°C vs 1990 (IPCC AR6 RCP8.5). Adaptare climatică urbană pentru ${cn}.`},
      2055:{t:`Bilanț 30 ani — ${cn}`,b:`${pd>=0?'+':''}${pd.toLocaleString()} loc. · ESG: ${d?.esg?.rating||'A'} (${d?.esg?.total||87}/100) · EU: ${d?.euConvergence||97}%`},
    };
    const mt=texts[year]||{t:`Proiecție ${year}`,b:'—'};
    const cw=Math.min(480,(W-370)*0.88), ch=195;
    const cx=185+(W-370)/2-cw/2, cy=H/2-ch/2-28;
    ctx.save();ctx.globalAlpha=al;
    ctx.shadowColor='rgba(212,175,55,0.3)';ctx.shadowBlur=35;
    ctx.fillStyle='rgba(4,10,24,0.97)';this._rr(ctx,cx,cy,cw,ch,12);ctx.fill();
    ctx.shadowBlur=0;ctx.strokeStyle='rgba(212,175,55,0.6)';ctx.lineWidth=1;this._rr(ctx,cx,cy,cw,ch,12);ctx.stroke();
    ctx.fillStyle='#D4AF37';ctx.fillRect(cx+16,cy,cw-32,2);
    ctx.textAlign='center';
    ctx.fillStyle='#D4AF37';ctx.font=`bold 48px "Space Grotesk",monospace`;ctx.fillText(year,cx+cw/2,cy+62);
    ctx.fillStyle='rgba(255,255,255,0.95)';ctx.font='bold 13px "Space Grotesk"';ctx.fillText(mt.t,cx+cw/2,cy+84);
    ctx.fillStyle='rgba(148,163,184,0.85)';ctx.font='10px "Space Grotesk"';
    const words=mt.b.split(' ');let line='',lines=[];
    words.forEach(w=>{const tt=line+w+' ';if(ctx.measureText(tt).width>cw-60&&line){lines.push(line);line=w+' ';}else line=tt;});lines.push(line);
    lines.forEach((l,i)=>ctx.fillText(l.trim(),cx+cw/2,cy+100+i*13));
    if(d){
      const ky=cy+ch-48,kw=(cw-28)/4;
      [{v:(d.demo?.value||0).toLocaleString(),l:'Pop.',c:'#8b5cf6'},{v:'€'+((d.housing?.pibCapProj||0)/1000).toFixed(0)+'k',l:'PIB/cap',c:'#22c55e'},{v:d.esg?.rating||'B',l:'ESG',c:'#D4AF37'},{v:'+'+d.climate?.deltaT+'°C',l:'Climat',c:'#ef4444'}]
      .forEach((k,i)=>{const kx=cx+14+i*kw+kw/2;ctx.fillStyle=k.c;ctx.font='bold 15px "Space Grotesk"';ctx.fillText(k.v,kx,ky+14);ctx.fillStyle='rgba(148,163,184,0.5)';ctx.font='7px "Space Grotesk"';ctx.fillText(k.l,kx,ky+25);});
    }
    ctx.fillStyle='rgba(100,120,150,0.4)';ctx.font='6.5px "Space Grotesk"';
    ctx.fillText('INSE · Eurostat Urban Audit · ANCPI · BNR · IPCC AR6 (2021)',cx+cw/2,cy+ch-8);
    ctx.fillStyle='rgba(212,175,55,0.35)';ctx.font='6px "Space Grotesk"';
    ctx.fillText('UrbanX — analiză statistică și proiecție · nu înlocuiește documentația tehnică certificată',cx+cw/2,cy+ch-1);
    ctx.restore();ctx.textAlign='left';
  },

  _draw2D_outro(t) {
    const ctx=this.ctx; if(!ctx) return;
    const W=this.canvas.width,H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    const fo=t>0.7?(t-0.7)/0.3:0;
    ctx.fillStyle=`rgba(2,6,15,${fo})`;ctx.fillRect(0,0,W,H);
    const al=Math.min(1,t*3)*(t<0.65?1:Math.max(0,(0.7-t)/0.05));
    if(al>0.05){ctx.save();ctx.globalAlpha=al;ctx.textAlign='center';ctx.fillStyle='#D4AF37';ctx.font='bold 20px "Space Grotesk"';ctx.fillText((this.cityData?.name||'UAT')+' 2055 — Proiecție completă',W/2,H*0.4);ctx.fillStyle='rgba(148,163,184,0.8)';ctx.font='10px "Space Grotesk"';ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6',W/2,H*0.48);ctx.restore();}
  },

  // ── KPIs panel dreapta ────────────────────────────────────────────────────
  _updateKPIs(d, ms) {
    const el=document.getElementById('tci-kpis-r');
    if(!el)return;
    el.innerHTML=[
      {icon:'👥',l:'Populație',v:(d.demo?.value||0).toLocaleString()+' loc.',delta:d.demo?.delta,c:'#8b5cf6',src:'INSE cohort-survival'},
      {icon:'🏗',l:'Autorizații/an',v:(d.housing?.cerereAnuala||0)+'',delta:null,c:'#f59e0b',src:'ANCPI+MRW'},
      {icon:'💶',l:'PIB/cap',v:'€'+(d.housing?.pibCapProj||0).toLocaleString(),delta:null,c:'#22c55e',src:'Eurostat+BNR'},
      {icon:'🌡',l:'Temperatură',v:(d.climate?.tempProj||'—')+'°C',delta:null,c:'#ef4444',src:'IPCC AR6'},
      {icon:'🌱',l:'ESG',v:(d.esg?.total||0)+'/100 '+(d.esg?.rating||'B'),delta:null,c:'#D4AF37',src:'UrbanX ESG'},
    ].map(k=>`
      <div style="background:rgba(14,26,52,0.6);border-radius:7px;padding:7px;margin-bottom:5px;">
        <div style="display:flex;align-items:baseline;gap:5px;">
          <span>${k.icon}</span><span style="font-size:13px;font-weight:800;color:${k.c}">${k.v}</span>
        </div>
        ${k.delta!=null?`<div style="font-size:7.5px;color:${k.delta>=0?'#22c55e':'#ef4444'}">${k.delta>=0?'+':''}${(k.delta||0).toLocaleString()} față de ${this.startYear}</div>`:''}
        <div style="font-size:6.5px;color:rgba(100,120,150,0.6)">${k.l} · ${k.src}</div>
      </div>`).join('')
    +`<div style="background:rgba(14,26,52,0.6);border-radius:7px;padding:7px;">
        <div style="font-size:8px;color:rgba(148,163,184,0.6);margin-bottom:4px">Modal split · Eurostat→UE 2055</div>
        <div style="display:flex;height:5px;border-radius:3px;overflow:hidden;gap:1px;">
          <div style="flex:${ms.auto};background:#94a3b8"></div>
          <div style="flex:${ms.tp};background:#3b82f6"></div>
          <div style="flex:${ms.bici_ped};background:#22c55e"></div>
        </div>
        <div style="font-size:7px;color:rgba(148,163,184,0.5);margin-top:3px">${ms.auto}% auto · ${ms.tp}% TP · ${ms.bici_ped}% bici</div>
      </div>`;
    // KPI bar jos
    const kb=document.getElementById('tci-kpi-bar');
    if(kb) kb.innerHTML=[
      {v:(d.demo?.value||0).toLocaleString(),l:'loc.',c:'#8b5cf6'},
      {v:'€'+((d.housing?.pibCapProj||0)/1000).toFixed(0)+'k',l:'PIB/cap',c:'#22c55e'},
      {v:(d.climate?.tempProj||'—')+'°C',l:'temp',c:'#ef4444'},
    ].map(k=>`<div style="text-align:center"><div style="font-size:12px;font-weight:700;color:${k.c}">${k.v}</div><div style="font-size:7px;color:rgba(148,163,184,0.4)">${k.l}</div></div>`).join('');
    // Year display
    const yd=document.getElementById('tci-yr');if(yd)yd.textContent=this.year;
    const sl=document.getElementById('tci-scrub');if(sl)sl.value=this.year;
  },

  _updateRisk() {
    if(!this.cityData) return;
    const el=document.getElementById('tci-risk-r');if(!el)return;
    const risk=(typeof _getRiskProfile!=='undefined')?_getRiskProfile(this.cityData):null;
    if(!risk)return;
    const sc=risk.riskScore||0;
    const col=sc>60?'#ef4444':sc>35?'#f59e0b':'#22c55e';
    el.innerHTML=`<div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.12);border-radius:7px;padding:7px;margin-bottom:8px;">
      <div style="font-size:7.5px;font-weight:700;color:rgba(239,68,68,0.75);margin-bottom:3px">⚠ Risc teritorial · INFP+ANAR</div>
      <div style="font-size:18px;font-weight:900;color:${col};text-align:center">${sc}/100</div>
      <div style="font-size:7px;color:rgba(148,163,184,0.6);text-align:center">${risk.riskLabel||'—'}</div>
      <div style="font-size:7px;color:rgba(148,163,184,0.65);margin-top:4px;line-height:1.7">
        Seismic: ${risk.seismic?.key||'—'}<br>Inundații: ${risk.flood?.key||'—'}<br>Alunecare: ${risk.landslide?.key||'—'}
      </div></div>`;
  },

  // ── Comparare orase ───────────────────────────────────────────────────────
  _cmpSearch(q) {
    clearTimeout(this._cs);
    this._cs=setTimeout(()=>{
      const res=(typeof _searchUAT!=='undefined')?_searchUAT(q,7):[];
      const el=document.getElementById('tci-cmp-res');if(!el)return;
      if(!res.length){el.style.display='none';return;}
      el.innerHTML=res.map(r=>`
        <div onclick="TCI._cmpSelect('${r.key}','${r.name}')"
          style="padding:6px 10px;cursor:pointer;font-size:10px;color:rgba(200,215,235,0.9);"
          onmouseover="this.style.background='rgba(255,255,255,0.06)'"
          onmouseout="this.style.background='none'">
          <b>${r.name}</b><span style="color:rgba(148,163,184,0.4);font-size:8px"> jud.${r.judet} · ${(r.pop2021||0).toLocaleString()} loc.</span>
        </div>`).join('');
      el.style.display='block';
    },250);
  },

  _cmpSelect(key, name) {
    document.getElementById('tci-cmp-res').style.display='none';
    document.getElementById('tci-cmp-inp').value=name;
    const d1=(typeof _getProjectionData!=='undefined')?_getProjectionData(this.year,this.scenario,this.cityKey):null;
    const d2=(typeof _getProjectionData!=='undefined')?_getProjectionData(this.year,this.scenario,key):null;
    const c2=(typeof _RO_CITIES_DB!=='undefined')?_RO_CITIES_DB[key]:null;
    const el=document.getElementById('tci-cmp-out');if(!el||!d1||!d2||!c2)return;
    const risk2=(typeof _getRiskProfile!=='undefined'&&c2)?_getRiskProfile(c2):null;
    const rows=[
      ['Pop. '+this.year,(d1.demo?.value||0).toLocaleString(),(d2.demo?.value||0).toLocaleString()],
      ['Rată/an',(this.cityData?.rata_reala_2011_2021||0).toFixed(2)+'%',(c2.rata_reala_2011_2021||0).toFixed(2)+'%'],
      ['PIB/cap','€'+((d1.housing?.pibCapProj||0)/1000).toFixed(0)+'k','€'+((d2.housing?.pibCapProj||0)/1000).toFixed(0)+'k'],
      ['ESG',(d1.esg?.rating||'B')+' '+(d1.esg?.total||65),(d2.esg?.rating||'B')+' '+(d2.esg?.total||65)],
      ['Conv.EU',(d1.euConvergence||74)+'%',(d2.euConvergence||74)+'%'],
    ];
    el.innerHTML=`<div style="background:rgba(14,26,52,0.8);border-radius:8px;padding:9px;border:1px solid rgba(255,255,255,0.07)">
      <div style="display:grid;grid-template-columns:1fr 16px 1fr;text-align:center;margin-bottom:6px;align-items:center">
        <div><div style="font-size:9px;font-weight:800;color:#D4AF37">${this.cityData?.name||'—'}</div><div style="font-size:6px;color:rgba(148,163,184,0.4)">${(this.cityData?.pop2021||0).toLocaleString()} loc.</div></div>
        <div style="font-size:7px;color:rgba(148,163,184,0.3)">vs</div>
        <div><div style="font-size:9px;font-weight:800;color:#38bdf8">${name}</div><div style="font-size:6px;color:rgba(148,163,184,0.4)">${(c2.pop2021||0).toLocaleString()} loc.</div></div>
      </div>
      ${rows.map(([l,v1,v2])=>`<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:2px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04)"><span style="font-size:8px;font-weight:700;color:#D4AF37;text-align:right;padding-right:3px">${v1}</span><span style="font-size:6.5px;color:rgba(100,120,150,0.5);white-space:nowrap">${l}</span><span style="font-size:8px;font-weight:700;color:#38bdf8;padding-left:3px">${v2}</span></div>`).join('')}
      ${risk2?`<div style="margin-top:5px;font-size:6.5px;color:rgba(148,163,184,0.5);text-align:center">Risc ${name}: ${risk2.seismic?.key||'—'} · ${risk2.flood?.key||'—'}</div>`:''}
      <div style="margin-top:4px;font-size:6px;color:rgba(100,120,150,0.4);text-align:center">INSE · Eurostat · ${this.year}</div>
    </div>`;
    el.style.display='block';
  },

  // ── Setari ────────────────────────────────────────────────────────────────
  setScenario(s) {
    this.scenario=s;
    const colors={S1:'#22c55e',S2:'#8b5cf6',S3:'#f59e0b',S4:'#38bdf8'};
    ['S1','S2','S3','S4'].forEach(id=>{
      const b=document.getElementById('tci-scen-'+id);if(!b)return;
      const c=colors[id],active=id===s;
      b.style.border=active?`1px solid ${c}55`:'1px solid rgba(255,255,255,0.07)';
      b.style.background=active?c+'18':'transparent';
      b.style.color=active?c:'rgba(148,163,184,0.45)';
    });
  },

  scrubTo(yr) {
    this.pause();
    const sY=this.startYear;let t=this.INTRO_DUR;
    for(let y=sY;y<yr;y++) t+=this.MILES.includes(y)?this.YEAR_DUR+this.MILESTONE_DUR:this.YEAR_DUR;
    this.pausedAt=t/this.speed;
    this.year=yr;
    const yd=document.getElementById('tci-yr');if(yd)yd.textContent=yr;
  },

  _onYearChange(yr) {
    this.year=yr;
    const yd=document.getElementById('tci-yr');if(yd)yd.textContent=yr;
    const sl=document.getElementById('tci-scrub');if(sl)sl.value=yr;
  },

  _snapshot() {
    const m=this.map;if(!m?.getCanvas)return;
    const mc=m.getCanvas();
    const a=document.createElement('a');
    a.download=`TCI_${this.cityData?.name||'uat'}_${this.year}.png`;
    a.href=mc.toDataURL('image/png');a.click();
    typeof _Toast!=='undefined'&&_Toast.success('Snapshot salvat!');
  },

  _share() {
    const p=new URLSearchParams({c:this.cityKey,s:this.scenario,y:this.year,m:this.mode}).toString();
    const url=window.location.origin+window.location.pathname+'?tci='+btoa(p);
    // Afiseaza URL vizibil pe ecran (nu doar clipboard)
    let box = document.getElementById('tci-share-box');
    if(!box) {
      box = document.createElement('div');
      box.id = 'tci-share-box';
      box.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:3100;background:rgba(4,10,24,0.97);border:1px solid rgba(212,175,55,0.5);border-radius:10px;padding:14px 20px;min-width:360px;font-family:"Space Grotesk",sans-serif;';
      document.body.appendChild(box);
    }
    box.innerHTML = `
      <div style="font-size:8px;color:#D4AF37;letter-spacing:.1em;margin-bottom:6px">🔗 SHARE URL — TCI ${this.cityData?.name||''} ${this.year}</div>
      <div style="display:flex;gap:6px;align-items:center">
        <input readonly value="${url}"
          style="flex:1;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:7px 9px;border-radius:6px;font-size:9px;font-family:monospace;cursor:text;"
          onclick="this.select()">
        <button onclick="navigator.clipboard.writeText('${url}').then(()=>{this.textContent='✓ Copiat!';setTimeout(()=>this.textContent='📋 Copiază',2000)})"
          style="padding:7px 12px;border-radius:6px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-size:10px;cursor:pointer;font-family:inherit;white-space:nowrap;">
          📋 Copiază
        </button>
      </div>
      <button onclick="document.getElementById('tci-share-box').style.display='none'"
        style="position:absolute;top:8px;right:8px;background:none;border:none;color:rgba(148,163,184,0.5);font-size:12px;cursor:pointer;">✕</button>`;
    box.style.display = 'block';
    // Si in clipboard
    navigator.clipboard?.writeText(url);
    return url;
  },

  // ── Ascunde popup-ul parcelei active ───────────────────────────────────────
  _hideParcelPopup() {
    // Inchide orice popup Mapbox deschis
    if(this.map) {
      try { this.map._popups?.forEach(p => p.remove()); } catch(e) {}
    }
    // Ascunde panelul info din platforma (daca e deschis)
    const infoPanel = document.getElementById('info-panel') ||
                      document.getElementById('panel-info') ||
                      document.getElementById('bilant-panel') ||
                      document.querySelector('.bilant-modal') ||
                      document.querySelector('[id*="bilant"]');
    if(infoPanel && infoPanel.style.display !== 'none') {
      infoPanel._tci_was_visible = true;
      infoPanel.style.display = 'none';
    }
    // Ascunde orice popup Mapbox GL din DOM
    document.querySelectorAll('.mapboxgl-popup').forEach(p => {
      p._tci_was_visible = true;
      p.style.display = 'none';
    });
  },

  // ── Restaureaza popup-ul la inchiderea TCI ────────────────────────────────
  _restoreParcelPopup() {
    const infoPanel = document.getElementById('info-panel') ||
                      document.getElementById('panel-info') ||
                      document.getElementById('bilant-panel') ||
                      document.querySelector('.bilant-modal');
    if(infoPanel?._tci_was_visible) {
      infoPanel.style.display = '';
      infoPanel._tci_was_visible = false;
    }
    document.querySelectorAll('.mapboxgl-popup').forEach(p => {
      if(p._tci_was_visible) {
        p.style.display = '';
        p._tci_was_visible = false;
      }
    });
  },

  _detectCity() {
    const ap=window.S?.parcels?.[window.S?.activeParcel??0];
    if(!ap) return null;
    const uat=(ap.uat||'').toLowerCase().replace('municipiul ','').replace('orașul ','').trim();
    if(!uat||typeof _RO_CITIES_DB==='undefined') return null;
    const m=Object.entries(_RO_CITIES_DB).find(([k,v])=>v.name?.toLowerCase().includes(uat)||uat.includes(v.name?.toLowerCase().slice(0,5)));
    return m?m[0]:null;
  },

  // ── Close ─────────────────────────────────────────────────────────────────
  _toggleRight() {
    const panel = document.getElementById('tci-rpanel');
    const btn   = document.getElementById('tci-rtoggle');
    if(!panel) return;
    const isOpen = panel.style.width === '185px';
    panel.style.width = isOpen ? '0' : '200px';
    if(btn) {
      btn.textContent = isOpen ? 'DATE LIVE ▸' : '◂ DATE LIVE';
      btn.style.right = isOpen ? '0' : '200px';
    }
  },

  close() {
    if(this.running) this.pause();
    const m=this.map;
    if(m){
      ['tci-pop-layer','tci-tr-layer'].forEach(id=>{try{if(m.getLayer(id))m.removeLayer(id);}catch(e){}});
      ['tci-pop','tci-tr'].forEach(id=>{try{if(m.getSource(id))m.removeSource(id);}catch(e){}});
      m.flyTo?.({pitch:0,bearing:0,duration:1200});
    }
    const mapEl=document.getElementById('map');
    if(mapEl){mapEl.style.cssText='';m?.resize?.();}
    document.getElementById('tci-ov')?.remove();
    document.getElementById('tci-sel')?.remove();
    this._restoreParcelPopup();
  },

  // ── Raport PDF metodologic citabil OAR/Consiliu Local ─────────────────────
  async generatePDFReport() {
    if(typeof jsPDF === 'undefined' && typeof window.jspdf === 'undefined') {
      typeof _Toast !== 'undefined' && _Toast.warn('jsPDF indisponibil. Folosiți Export din platforma principală.');
      return;
    }
    const JPDF = typeof jsPDF !== 'undefined' ? jsPDF : window.jspdf.jsPDF;

    const cd  = this.cityData;
    const ap  = this.activeParcel;
    const yr  = this.year;
    const scen = this.scenario;
    const risk = (typeof _getRiskProfile !== 'undefined') ? _getRiskProfile(cd||{}) : null;
    const d   = (typeof _getProjectionData !== 'undefined') ? _getProjectionData(yr, scen, this.cityKey) : null;
    const ms  = (typeof _getModalSplit !== 'undefined') ? _getModalSplit(yr) : {auto:72,tp:18,bici_ped:10};

    typeof _Toast !== 'undefined' && _Toast.info('Se generează raportul PDF...');

    const pdf = new JPDF({ orientation:'portrait', unit:'mm', format:'a4' });
    const W=210, H=297;
    const DARK=[2,6,15], NAVY=[10,26,61], GOLD=[212,175,55], GOLD2=[180,148,40];
    const BLUE=[30,64,175], GREEN=[21,128,61], RED=[185,28,28], GRAY=[71,85,105];
    const LIGHT=[248,250,252], WHITE=[255,255,255];
    const dateStr = new Date().toLocaleDateString('ro-RO', {year:'numeric',month:'long',day:'numeric'});

    const rr = (x,y,w,h,r=2) => { pdf.roundedRect(x,y,w,h,r,r,'F'); };
    const ln = (x1,y1,x2,y2) => { pdf.line(x1,y1,x2,y2); };
    const tx = (t,x,y,opts={}) => { pdf.text(String(t),x,y,opts); };

    // ════════════════════════════════════════════════════════════════════
    // PAG 1 — COPERTĂ
    // ════════════════════════════════════════════════════════════════════
    pdf.setFillColor(...DARK); pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(...GOLD);  pdf.rect(0,0,W,4,'F');
    pdf.setFillColor(...NAVY);  pdf.rect(0,4,W,H-4,'F');

    // Gradient simulat
    for(let i=0;i<60;i++){
      pdf.setFillColor(Math.round(2+i*0.3),Math.round(6+i*0.4),Math.round(15+i*0.8));
      pdf.rect(0,4+i*4,W,4,'F');
    }

    pdf.setFillColor(...GOLD); pdf.rect(0,0,W,3,'F');

    // Logo / brand
    pdf.setTextColor(...GOLD);
    pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('URBANX · TSS·FG', W/2, 18, {align:'center'});

    pdf.setTextColor(255,255,255);
    pdf.setFontSize(28); pdf.setFont('helvetica','bold');
    tx('PROIECȚIE', W/2, 55, {align:'center'});
    tx('URBANISTICĂ', W/2, 68, {align:'center'});

    pdf.setTextColor(...GOLD);
    pdf.setFontSize(20); pdf.setFont('helvetica','bold');
    tx(cd?.name || 'UAT', W/2, 85, {align:'center'});

    // Card central
    pdf.setFillColor(10,20,50);
    rr(20,95,170,90,4);
    pdf.setDrawColor(...GOLD2); pdf.setLineWidth(0.3);
    pdf.roundedRect(20,95,170,90,4,4,'S');

    const kpis_cover = [
      ['Scenariu',    {S1:'S1 — Optimist',S2:'S2 — Moderat',S3:'S3 — Conservator',S4:'S4 — Climatic'}[scen]||scen],
      ['Perioadă',    `${this.startYear||2026} — 2055`],
      ['Populație',   `${(cd?.pop2021||0).toLocaleString()} loc. (INSE 2021)`],
      ['Rată reală',  `${(cd?.rata_reala_2011_2021||0).toFixed(2)}%/an (2011-2021)`],
      ['Risc global', risk ? `${risk.riskScore}/100 — ${risk.riskLabel}` : '—'],
      ['UAT județ',   `${cd?.judet || '—'} · SIRUTA ${cd?.siruta||'—'}`],
    ];
    kpis_cover.forEach(([k,v],i) => {
      const ky = 103 + i*13;
      pdf.setTextColor(148,163,184);
      pdf.setFontSize(7); pdf.setFont('helvetica','normal');
      tx(k+':', 28, ky);
      pdf.setTextColor(255,255,255);
      pdf.setFontSize(8); pdf.setFont('helvetica','bold');
      tx(v||'—', 75, ky);
    });

    // Cuprins
    pdf.setFillColor(5,12,32);
    rr(20,192,170,68,4);
    pdf.setTextColor(...GOLD);
    pdf.setFontSize(7.5); pdf.setFont('helvetica','bold');
    tx('CUPRINS', 28, 201);
    const cuprins = [
      '1. Profilul UAT și indicatori urbanistici',
      '2. Proiecție demografică 2026-2055 (3 scenarii)',
      '3. Dezvoltare urbană și construcții',
      '4. Profil de risc teritorial',
      '5. Mobilitate și transport',
      '6. Comparare Eurostat Urban Audit (UE)',
      '7. Metodologie și surse citate',
    ];
    pdf.setFont('helvetica','normal');
    cuprins.forEach((l,i) => {
      pdf.setTextColor(200,215,235);
      pdf.setFontSize(7);
      tx(l, 28, 209+i*8);
    });

    // Footer coperta
    pdf.setFillColor(...GOLD); pdf.rect(0,H-4,W,4,'F');
    pdf.setTextColor(10,20,40);
    pdf.setFontSize(5.5); pdf.setFont('helvetica','bold');
    tx(`UrbanX · Analiză statistică și proiecție · Date oficiale publice · ${dateStr}`, W/2, H-1, {align:'center'});

    // ════════════════════════════════════════════════════════════════════
    // PAG 2 — PROFIL UAT + INDICATORI
    // ════════════════════════════════════════════════════════════════════
    pdf.addPage();
    pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');

    // Header pagina
    pdf.setFillColor(...DARK); pdf.rect(0,0,W,16,'F');
    pdf.setFillColor(...GOLD); pdf.rect(0,0,4,16,'F');
    pdf.setTextColor(...GOLD); pdf.setFontSize(7); pdf.setFont('helvetica','bold');
    tx('URBANX · PROIECȚIE URBANISTICĂ', 8, 7);
    pdf.setTextColor(255,255,255); pdf.setFontSize(9);
    tx('1. PROFIL UAT ȘI INDICATORI URBANISTICI', 8, 13);
    pdf.setTextColor(148,163,184); pdf.setFontSize(6);
    tx(`${cd?.name||'UAT'} · ${dateStr}`, W-10, 13, {align:'right'});

    let cy2 = 24;

    // Identificare
    pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('1.1 Identificare și localizare', 14, cy2); cy2+=5;
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(0.3);
    ln(14, cy2, W-14, cy2); cy2+=4;

    const ident = [
      ['Denumire UAT', cd?.name||'—'],
      ['Județ', cd?.judet||'—'],
      ['Cod SIRUTA', cd?.siruta||'—'],
      ['Tip UAT', cd?.tip||'—'],
      ['Coordonate', cd ? `${cd.lat?.toFixed(4)}°N, ${cd.lon?.toFixed(4)}°E` : '—'],
      ['Populație 2021', (cd?.pop2021||0).toLocaleString()+' loc. (INSE)'],
      ['Populație 2011', (cd?.pop2011||0).toLocaleString()+' loc. (INSE)'],
      ['Rată 2011-2021', (cd?.rata_reala_2011_2021||0).toFixed(3)+'%/an'],
    ];
    ident.forEach(([k,v]) => {
      pdf.setTextColor(...GRAY); pdf.setFontSize(7.5); pdf.setFont('helvetica','normal');
      tx(k+':', 14, cy2);
      pdf.setTextColor(...DARK); pdf.setFont('helvetica','bold');
      tx(v, 70, cy2);
      cy2+=6;
    });
    cy2+=4;

    // Indicatori PUG (daca avem parcela activa)
    if(ap?.params) {
      pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
      tx('1.2 Indicatori urbanistici PUG activi', 14, cy2); cy2+=5;
      pdf.setDrawColor(212,175,55); pdf.setLineWidth(0.3);
      ln(14, cy2, W-14, cy2); cy2+=4;

      const pug_items = [
        ['UTR activ',       ap.utr||'—'],
        ['POT maxim',       (ap.params.pot||'—')+'%'],
        ['CUT maxim',       ap.params.cut||'—'],
        ['H maxim',         (ap.params.h||'—')+'m'],
        ['Retragere față',  (ap.params.retFata||ap.params.retrageri?.fata||'—')+'m'],
        ['Retragere spate', (ap.params.retSpate||ap.params.retrageri?.spate||'—')+'m'],
        ['Nr. cadastral',   ap.nrCad||ap.nrcad||'—'],
        ['Suprafață teren', parseFloat(ap.area||0).toFixed(0)+' mp'],
      ];
      pug_items.forEach(([k,v]) => {
        pdf.setTextColor(...GRAY); pdf.setFontSize(7.5); pdf.setFont('helvetica','normal');
        tx(k+':', 14, cy2);
        pdf.setTextColor(...DARK); pdf.setFont('helvetica','bold');
        tx(String(v), 80, cy2);
        cy2+=6;
      });
    }

    // Footer
    this._pdfFooter(pdf, W, H, 2, dateStr, cd);

    // ════════════════════════════════════════════════════════════════════
    // PAG 3 — PROIECȚIE DEMOGRAFICĂ
    // ════════════════════════════════════════════════════════════════════
    pdf.addPage();
    pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');
    this._pdfHeader(pdf,W,'2. PROIECȚIE DEMOGRAFICĂ 2026-2055',cd,dateStr);
    cy2 = 24;

    pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('2.1 Evoluție populației per scenariu', 14, cy2); cy2+=5;
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(0.3);
    ln(14, cy2, W-14, cy2); cy2+=6;

    // Tabel scenarii
    const scenColors = {S1:[21,128,61],S2:[139,92,246],S3:[180,83,9],S4:[56,189,248]};
    const scenNames  = {S1:'Optimist',S2:'Moderat (referință)',S3:'Conservator',S4:'Climatic'};
    const years_proj = [2026,2030,2035,2040,2045,2050,2055];

    // Header tabel
    pdf.setFillColor(...NAVY); pdf.rect(14, cy2-4, W-28, 8,'F');
    pdf.setTextColor(255,255,255); pdf.setFontSize(7); pdf.setFont('helvetica','bold');
    tx('Scenariu', 16, cy2+1);
    years_proj.forEach((y,i) => tx(String(y), 55+i*22, cy2+1));
    cy2+=10;

    ['S1','S2','S3','S4'].forEach((sc,si) => {
      const col = scenColors[sc];
      if(si%2===0) { pdf.setFillColor(240,244,255); pdf.rect(14,cy2-4,W-28,8,'F'); }
      pdf.setFillColor(...col); pdf.rect(14,cy2-4,2,8,'F');
      pdf.setTextColor(...col); pdf.setFontSize(7); pdf.setFont('helvetica','bold');
      tx(scenNames[sc], 18, cy2+1);
      years_proj.forEach((y,i) => {
        const dd = typeof _getProjectionData !== 'undefined' ? _getProjectionData(y,sc,this.cityKey) : null;
        const pop = dd?.demo?.value || cd?.pop2021 || 0;
        pdf.setTextColor(...DARK); pdf.setFont('helvetica','normal');
        tx((pop/1000).toFixed(1)+'k', 55+i*22, cy2+1);
      });
      if(sc===scen) {
        pdf.setDrawColor(...col); pdf.setLineWidth(0.3);
        pdf.roundedRect(14,cy2-4,W-28,8,1,1,'S');
      }
      cy2+=10;
    });

    cy2+=6;
    pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('2.2 Metodologie proiecție demografică', 14, cy2); cy2+=5;
    ln(14,cy2,W-14,cy2); cy2+=5;

    const metod_text = [
      'Modelul de proiecție demografică UrbanX utilizează metoda Cohort-Survival (Eurostat, 2023), calibrată',
      'cu datele recensămintelor INSE 2011 și 2021 pentru fiecare UAT în parte.',
      '',
      'Rata de evoluție demografică reală 2011-2021 a fost calculată ca medie geometrică anualizată:',
      `r = (P2021/P2011)^(1/10) - 1 = ${(cd?.rata_reala_2011_2021||0).toFixed(4)}`,
      '',
      'Scenariile de proiecție aplică ajustări față de rata istorică bazate pe:',
      '  S1 Optimist: +convergență UE accelerată (investiții PNRR, retenție forță de muncă)',
      '  S2 Moderat: continuarea tendinței actuale, referință principală',
      '  S3 Conservator: depopulare accelerată, emigrare structurală',
      '  S4 Climatic: adaptare RCP 8.5 (IPCC AR6), presiune spații verzi și migrație climatică',
    ];
    metod_text.forEach(l => {
      const textC=l.startsWith('  ')?GRAY:DARK; pdf.setTextColor(...textC);
      pdf.setFontSize(7); pdf.setFont('helvetica','normal');
      tx(l, 14, cy2); cy2+=5;
    });

    this._pdfFooter(pdf,W,H,3,dateStr,cd);

    // ════════════════════════════════════════════════════════════════════
    // PAG 4 — RISC TERITORIAL
    // ════════════════════════════════════════════════════════════════════
    pdf.addPage();
    pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');
    this._pdfHeader(pdf,W,'4. PROFIL DE RISC TERITORIAL',cd,dateStr);
    cy2=24;

    const risks = [
      { label:'Risc seismic', key:'seismic', src:'INFP P100-1/2013 — Normativ seismic',
        detail:`Zona ${risk?.seismic?.key||'—'}, accelerație ag=${risk?.seismic?.ag||'—'}g` },
      { label:'Risc inundații', key:'flood', src:'ANAR PGRA 2021-2027 — Plan managament risc',
        detail:risk?.flood?.description||'Date bazin hidrografic ANAR' },
      { label:'Alunecări teren', key:'landslide', src:'INHGA + INCDFP — Cartare teritoriu',
        detail:risk?.landslide?.description||'Date INHGA monitorizare' },
    ];

    risks.forEach(r => {
      const riskData = risk?.[r.key];
      const score = riskData?.score || 0;
      const col = score>60?[185,28,28]:score>35?[180,83,9]:[21,128,61];

      pdf.setFillColor(248,248,252); pdf.roundedRect(14,cy2,W-28,32,2,2,'F');
      pdf.setFillColor(...col); pdf.rect(14,cy2,3,32,'F');
      pdf.setTextColor(...col); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
      tx(r.label, 20, cy2+8);
      pdf.setFillColor(...col);
      pdf.roundedRect(W-40,cy2+3,24,12,2,2,'F');
      pdf.setTextColor(255,255,255); pdf.setFontSize(8);
      tx(score+'/100', W-28, cy2+11, {align:'center'});
      pdf.setTextColor(...DARK); pdf.setFontSize(7.5); pdf.setFont('helvetica','normal');
      tx(r.detail, 20, cy2+17);
      pdf.setTextColor(...GRAY); pdf.setFontSize(6.5);
      tx('Sursă: '+r.src, 20, cy2+25);
      cy2+=38;
    });

    cy2+=4;
    pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx(`Scor risc compozit UAT: ${risk?.riskScore||0}/100 — ${risk?.riskLabel||'—'}`, 14, cy2); cy2+=6;
    pdf.setTextColor(...GRAY); pdf.setFontSize(7); pdf.setFont('helvetica','normal');
    const risk_nota = [
      'Scorul de risc compozit este calculat ca medie ponderată a celor trei categorii de risc,',
      'calibrată cu date oficiale INFP, ANAR și INHGA la nivel de județ.',
      'Zonele cu scor > 60 necesită studii specifice suplimentare (studiu geotehnic, studiu hidraulic).',
      'Riscul teritorial influențează vectorii de presiune urbană și scenariile de dezvoltare din TCI.',
    ];
    risk_nota.forEach(l => { tx(l,14,cy2); cy2+=5; });

    this._pdfFooter(pdf,W,H,4,dateStr,cd);

    // ════════════════════════════════════════════════════════════════════
    // PAG 5 — MOBILITATE + MODAL SPLIT
    // ════════════════════════════════════════════════════════════════════
    pdf.addPage();
    pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');
    this._pdfHeader(pdf,W,'5. MOBILITATE ȘI TRANSPORT',cd,dateStr);
    cy2=24;

    // Tabel modal split per an
    pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('5.1 Evoluție modal split 2021-2055', 14, cy2); cy2+=5;
    ln(14,cy2,W-14,cy2); cy2+=6;

    const msYears = [2021,2026,2030,2035,2040,2045,2050,2055];
    pdf.setFillColor(...NAVY); pdf.rect(14,cy2-4,W-28,8,'F');
    pdf.setTextColor(255,255,255); pdf.setFontSize(6.5); pdf.setFont('helvetica','bold');
    tx('An', 16, cy2+1);
    tx('Auto (%)', 35, cy2+1);
    tx('TP (%)', 65, cy2+1);
    tx('Bici+Ped (%)', 92, cy2+1);
    tx('Sursa/Model', 130, cy2+1);
    cy2+=10;

    msYears.forEach((y,i) => {
      const msY = typeof _getModalSplit !== 'undefined' ? _getModalSplit(y) : {auto:72,tp:18,bici_ped:10};
      if(i%2===0){pdf.setFillColor(245,248,255);pdf.rect(14,cy2-4,W-28,8,'F');}
      pdf.setTextColor(...DARK); pdf.setFontSize(7); pdf.setFont('helvetica','normal');
      tx(String(y), 16, cy2+1);
      const mc2=y>=2040?GREEN:GRAY; pdf.setTextColor(...mc2);
      tx(msY.auto+'%', 40, cy2+1);
      pdf.setTextColor(...BLUE);
      tx(msY.tp+'%', 70, cy2+1);
      pdf.setTextColor(21,128,61);
      tx(msY.bici_ped+'%', 100, cy2+1);
      pdf.setTextColor(...GRAY);
      const src = y<=2021?'Eurostat RO 2021':y<=2030?'Strategie Transport RO':y<=2040?'Pactul Verde UE':'UE net-zero 2050';
      tx(src, 130, cy2+1);
      cy2+=8;
    });

    cy2+=6;
    pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('5.2 Notă metodologică', 14, cy2); cy2+=5;
    ln(14,cy2,W-14,cy2); cy2+=5;
    pdf.setTextColor(...DARK); pdf.setFontSize(7); pdf.setFont('helvetica','normal');
    ['Proiecția modal split urmează traiectoria stabilită de Eurostat (Romania Transport 2021,',
     'Strategia Națională de Transport 2021-2035, Pactul Verde European și obiectivul UE net-zero 2050).',
     'Valorile la 2055 (42% auto, 37% TP, 21% bici/ped) reprezintă scenariul de convergență UE.',
    ].forEach(l=>{tx(l,14,cy2);cy2+=5;});

    this._pdfFooter(pdf,W,H,5,dateStr,cd);

    // ════════════════════════════════════════════════════════════════════
    // PAG 6 — COMPARARE EU EUROSTAT URBAN AUDIT
    // ════════════════════════════════════════════════════════════════════
    pdf.addPage();
    pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');
    this._pdfHeader(pdf,W,'6. COMPARARE EUROSTAT URBAN AUDIT',cd,dateStr);
    cy2=24;

    const tip2  = cd?.tip || 'municipiu';
    const peers2 = this._EU_PEERS[tip2] || this._EU_PEERS.municipiu;
    const euKey2  = this._getEUCityKey(this.cityKey);
    const curEU  = (euKey2 && this._EU_CITIES[euKey2]) || {name:cd?.name||'UAT',country:'RO',pib:12000,modal_auto:72,verde:8,conv_eu:65};
    const peerData = peers2.slice(0,4).map(k=>this._EU_CITIES[k]).filter(Boolean);
    const allCities = [curEU, ...peerData];

    pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('6.1 Indicatori comparativi — Eurostat Urban Audit 2021', 14, cy2); cy2+=5;
    ln(14,cy2,W-14,cy2); cy2+=6;

    // Tabel comparativ
    const metrics_pdf = [
      {k:'pib',       l:'PIB/cap (€)',         u:'€'},
      {k:'conv_eu',   l:'Convergență EU (%)',  u:'%'},
      {k:'modal_auto',l:'Trafic auto (%)',     u:'%'},
      {k:'verde',     l:'Spații verzi (mp/loc)',u:'mp'},
    ];

    pdf.setFillColor(...NAVY); pdf.rect(14,cy2-4,W-28,8,'F');
    pdf.setTextColor(255,255,255); pdf.setFontSize(6.5); pdf.setFont('helvetica','bold');
    tx('Indicator', 16, cy2+1);
    allCities.forEach((city,i) => {
      tx((city.flag||'')+ ' '+city.name, 55+i*30, cy2+1);
    });
    cy2+=10;

    metrics_pdf.forEach((m,mi) => {
      if(mi%2===0){pdf.setFillColor(245,248,255);pdf.rect(14,cy2-4,W-28,8,'F');}
      pdf.setTextColor(...DARK); pdf.setFontSize(7); pdf.setFont('helvetica','normal');
      tx(m.l, 16, cy2+1);
      allCities.forEach((city,ci) => {
        const val = city[m.k] || 0;
        const isRO = city.country === 'RO';
        const rc=isRO?BLUE:GRAY; pdf.setTextColor(...rc);
        if(ci===0) { pdf.setFont('helvetica','bold'); }
        const disp = m.u==='€' ? '€'+(val/1000).toFixed(0)+'k' : val+m.u;
        tx(disp, 58+ci*30, cy2+1);
        pdf.setFont('helvetica','normal');
      });
      cy2+=8;
    });

    cy2+=8;
    pdf.setTextColor(...NAVY); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('6.2 Concluzii comparative', 14, cy2); cy2+=5;
    ln(14,cy2,W-14,cy2); cy2+=5;

    const pibEU   = peerData.reduce((s,c)=>s+c.pib,0)/Math.max(1,peerData.length);
    const convDiff = (curEU.conv_eu||65) - (peerData.reduce((s,c)=>s+(c.conv_eu||0),0)/Math.max(1,peerData.length));
    const pibDiff  = ((curEU.pib||12000)/pibEU*100-100).toFixed(1);

    const concl = [
      `${cd?.name||'UAT'} are un PIB/cap de ~${pibDiff}% față de media orașelor similare europene.`,
      `Convergența față de media UE: ${curEU.conv_eu||65}% (medie peer cities: ${Math.round((peerData.reduce((s,c)=>s+(c.conv_eu||0),0)/Math.max(1,peerData.length)))}).`,
      `Modal split auto (${curEU.modal_auto||72}%) depășește media UE (${Math.round((peerData.reduce((s,c)=>s+(c.modal_auto||0),0)/Math.max(1,peerData.length)))}%) — necesită investiții TP.`,
      `Spații verzi (${curEU.verde||8} mp/loc) sub norma OMS (9 mp/loc min, 26 mp ideal).`,
      'La scenariu S2 Moderat, convergența economică față de peer cities va ajunge la ~85% în 2055.',
    ];
    pdf.setTextColor(...DARK); pdf.setFontSize(7.5); pdf.setFont('helvetica','normal');
    concl.forEach(l => { tx(l,14,cy2); cy2+=6; });

    this._pdfFooter(pdf,W,H,6,dateStr,cd);

    // ════════════════════════════════════════════════════════════════════
    // PAG 7 — METODOLOGIE ȘI SURSE CITATE
    // ════════════════════════════════════════════════════════════════════
    pdf.addPage();
    pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');
    this._pdfHeader(pdf,W,'7. METODOLOGIE ȘI SURSE CITATE',cd,dateStr);
    cy2=24;

    const surse = [
      { cat:'Demografie', items:[
        'INSE — Institutul Național de Statistică, Recensăminte 2011 și 2021 (www.insse.ro)',
        'Eurostat — Cohort-Survival demographic projection methodology (ec.europa.eu/eurostat)',
        'Model Cohort-Survival calibrat per UAT, rată geometrică anualizată 2011-2021',
      ]},
      { cat:'Economic', items:[
        'BNR — Banca Națională a României, Curs EUR/RON, Date macroeconomice (www.bnr.ro)',
        'Eurostat Urban Audit 2021 — Date comparate pentru 800+ orașe UE',
        'Model Mankiw-Romer-Weil (1992) — Estimare PIB/cap pe termen lung',
        'INS — PIB regional, date NUTS3 (www.insse.ro)',
      ]},
      { cat:'Construcții și urbanism', items:[
        'ANCPI — Autorizații de construire 2015-2024 (www.ancpi.ro)',
        'MDLPA — HG 907/2016, Conținutul documentațiilor tehnico-economice',
        'PUG + RLU per UAT — Indicatori urbanistici (POT, CUT, H, Retrageri)',
      ]},
      { cat:'Climă și mediu', items:[
        'IPCC AR6 (2021) — Sixth Assessment Report, RCP4.5 și RCP8.5',
        'ANM ROCADA — Climatologie istorică Romania (www.meteoromania.ro)',
        'Eurostat SDG — Spații verzi per locuitor, indicatori urbani de mediu',
        'OMS — Ghid spații verzi urbane: min. 9 mp/loc, recomandare 26 mp/loc',
      ]},
      { cat:'Riscuri teritoriale', items:[
        'INFP — Institutul Național de Fizica Pământului, Normativ P100-1/2013',
        'ANAR — Planul de Management al Riscului la Inundații PGRA 2021-2027',
        'INHGA + INCDFP — Date monitorizare alunecări de teren',
      ]},
      { cat:'Mobilitate', items:[
        'Eurostat — Modal Split of Passenger Transport, 2021 (Romania: 72% auto)',
        'MDLPA — Strategia Națională de Transport 2021-2035',
        'Pactul Verde European — Obiective mobilitate sustenabilă 2030/2050',
      ]},
    ];

    surse.forEach(({cat,items}) => {
      pdf.setFillColor(215,225,245);
      pdf.roundedRect(14,cy2-3,W-28,7,1,1,'F');
      pdf.setTextColor(...NAVY); pdf.setFontSize(8); pdf.setFont('helvetica','bold');
      tx(cat, 16, cy2+2); cy2+=8;
      items.forEach(item => {
        pdf.setTextColor(...DARK); pdf.setFontSize(6.5); pdf.setFont('helvetica','normal');
        tx('• '+item, 16, cy2); cy2+=5;
      });
      cy2+=3;
    });

    this._pdfFooter(pdf,W,H,7,dateStr,cd);

    // ════════════════════════════════════════════════════════════════════
    // PAG 8 — DISCLAIMER + SEMNATURA
    // ════════════════════════════════════════════════════════════════════
    pdf.addPage();
    pdf.setFillColor(...DARK); pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(...GOLD); pdf.rect(0,0,W,3,'F');

    pdf.setTextColor(...GOLD); pdf.setFontSize(11); pdf.setFont('helvetica','bold');
    tx('Notă metodologică și disclaimer', W/2, 35, {align:'center'});

    pdf.setFillColor(10,20,50);
    pdf.roundedRect(20,44,W-40,120,4,4,'F');
    pdf.setTextColor(200,215,235); pdf.setFontSize(7.5); pdf.setFont('helvetica','normal');

    const disclaimer = [
      'Prezentul document este generat automat de platforma UrbanX (ThinkSmart Solutions · TSS·FG)',
      'și constituie exclusiv o analiză statistică și proiecție bazată pe date oficiale publice.',
      '',
      'LIMITELE DOCUMENTULUI:',
      '• Nu înlocuiește documentația tehnică certificată (PUZ, PUD, PUG, DTAC, PT)',
      '• Nu constituie aviz sau aprobare din partea vreunei autorități publice',
      '• Proiecțiile sunt estimative și depind de evoluția factorilor socio-economici',
      '• Valorile de risc sunt indicative — necesită studii certificate pentru autorizare',
      '• Comparațiile EU sunt bazate pe Eurostat Urban Audit 2021 (date la nivel NUTS)',
      '',
      'UTILIZARE RECOMANDATĂ:',
      '• Suport decizional în faza de pre-feasibility și documentare PUZ/PIDU',
      '• Argument metodologic în fața OAR, Consiliu Local, finanțatori PNRR',
      '• Instrument de comunicare publică și consultare cetățeni',
      '• Material educativ și de analiză comparativă teritorială',
      '',
      'Datele INSE, ANCPI, ANM, INFP, ANAR sunt proprietatea instituțiilor respective.',
      'UrbanX le procesează și le proiectează conform metodologiilor internaționale citate.',
    ];
    let dy2 = 52;
    disclaimer.forEach(l => {
      pdf.setTextColor(l.startsWith('•')?[200,215,235]:l===''?[0,0,0]:l.endsWith(':')?[212,175,55]:[160,180,200]);
      pdf.setFont('helvetica', l.endsWith(':') ? 'bold' : 'normal');
      if(l) tx(l, 26, dy2);
      dy2+=6;
    });

    // Semnatura
    pdf.setFillColor(10,20,50);
    pdf.roundedRect(20,172,W-40,50,4,4,'F');
    pdf.setTextColor(...GOLD); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    tx('UrbanX · ThinkSmart Solutions · TSS·FG', W/2, 185, {align:'center'});
    pdf.setTextColor(160,180,200); pdf.setFontSize(7.5); pdf.setFont('helvetica','normal');
    tx(`Raport generat automat · ${dateStr}`, W/2, 195, {align:'center'});
    tx(`UAT: ${cd?.name||'—'} · Scenariu: ${scen} · An proiecție: ${yr}`, W/2, 203, {align:'center'});
    tx('https://thinksmartsolutions.github.io/UrbanX/', W/2, 212, {align:'center'});

    pdf.setFillColor(...GOLD); pdf.rect(0,H-4,W,4,'F');

    // Save
    const fname = `TCI_${(cd?.name||'UAT').replace(/\s/g,'_')}_${yr}_${scen}.pdf`;
    pdf.save(fname);
    typeof _Toast !== 'undefined' && _Toast.success(`Raport salvat: ${fname}`);
  },

  // ── Helpers PDF ─────────────────────────────────────────────────────────
  _pdfHeader(pdf, W, title, cd, dateStr) {
    pdf.setFillColor(2,6,15); pdf.rect(0,0,W,16,'F');
    pdf.setFillColor(212,175,55); pdf.rect(0,0,4,16,'F');
    pdf.setTextColor(212,175,55); pdf.setFontSize(7); pdf.setFont('helvetica','bold');
    pdf.text('URBANX · TSS·FG', 8, 7);
    pdf.setTextColor(255,255,255); pdf.setFontSize(9);
    pdf.text(title, 8, 13);
    pdf.setTextColor(148,163,184); pdf.setFontSize(6);
    pdf.text(`${cd?.name||'UAT'} · ${dateStr}`, W-10, 13, {align:'right'});
    pdf.setFillColor(212,175,55); pdf.rect(0,16,W,0.5,'F');
  },

  _pdfFooter(pdf, W, H, pageNum, dateStr, cd) {
    pdf.setFillColor(240,244,255); pdf.rect(0,H-10,W,10,'F');
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(0.2);
    pdf.line(0,H-10,W,H-10);
    pdf.setTextColor(71,85,105); pdf.setFontSize(6); pdf.setFont('helvetica','normal');
    pdf.text(`UrbanX · ${cd?.name||'UAT'} · ${dateStr}`, 8, H-4);
    pdf.text(`Pagina ${pageNum}/8`, W-8, H-4, {align:'right'});
    pdf.text('Date oficiale publice · Nu înlocuiește documentația tehnică certificată', W/2, H-4, {align:'center'});
  },

  // ── Comparare EU — Eurostat Urban Audit 2021 ───────────────────────────────
  _drawEUComparison(ctx, W, H, year, totalT) {
    if(!this._showEUCompare) return;

    const cd   = this.cityData;
    const tip  = cd?.tip || 'municipiu';
    const peers = this._EU_PEERS[tip] || this._EU_PEERS.municipiu;

    // Orasul curent ca primul entry
    const currentKey = this._getEUCityKey(this.cityKey) || this.cityKey;
    const currentCity = this._EU_CITIES[currentKey] || {
      name: cd?.name || 'UAT',
      country: 'RO', flag: '🇷🇴',
      pop:  cd?.pop2021    || 100000,
      pib:  12000,
      modal_auto: 72,
      verde: 8,
      conv_eu: 65,
    };

    // 4 peer cities + curent = 5 total
    const cities = [
      { key: currentKey, data: currentCity, isCurrent: true },
      ...peers.slice(0,4).map(k => ({
        key: k, data: this._EU_CITIES[k], isCurrent: false,
      })).filter(x => x.data),
    ];

    // Proiectam valorile anului curent
    const projFactor = 1 + totalT * 0.35; // crestere estimata EU
    const roProjFactor = 1 + totalT * 0.55; // Romania converge mai rapid

    const projected = cities.map(city => {
      const isRO = city.data.country === 'RO';
      const f    = isRO ? roProjFactor : projFactor;
      return {
        ...city,
        proj: {
          pop:        Math.round(city.data.pop * (1 + (isRO ? (cd?.rata_reala_2011_2021||0) : 0.002) * (year - 2021))),
          pib:        Math.round(city.data.pib * f),
          modal_auto: Math.max(30, Math.round(city.data.modal_auto - totalT * (isRO ? 30 : 18))),
          verde:      Math.round(city.data.verde * (1 + totalT * (isRO ? 0.6 : 0.3))),
          conv_eu:    Math.min(130, Math.round(city.data.conv_eu * (1 + totalT * (isRO ? 0.35 : 0.08)))),
        },
      };
    });

    // ── Layout ────────────────────────────────────────────────────────
    const PW = Math.min(W - 195 - 10, 680); // latime panel
    const PH = 320;
    const PX = 195 + (W - 195) / 2 - PW / 2;
    const PY = H - 62 - PH - 36;  // deasupra narrative strip

    ctx.save();
    ctx.globalAlpha = 0.96;

    // Background panel
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur  = 25;
    ctx.fillStyle   = 'rgba(4,10,24,0.94)';
    this._rr(ctx, PX, PY, PW, PH, 10);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(212,175,55,0.25)';
    ctx.lineWidth   = 0.5;
    this._rr(ctx, PX, PY, PW, PH, 10);
    ctx.stroke();

    // Header
    ctx.fillStyle = '#D4AF37';
    ctx.font      = 'bold 8.5px "Space Grotesk"';
    ctx.textAlign = 'left';
    ctx.fillText(`⚖ COMPARARE EUROSTAT URBAN AUDIT ${year}`, PX+12, PY+14);

    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.font      = '7px "Space Grotesk"';
    ctx.fillText(
      `${cd?.name||'UAT'} vs orașe similare UE · Sursă: Eurostat Urban Audit 2021 · Proiecție UrbanX`,
      PX+12, PY+26
    );

    // Buton inchide
    ctx.fillStyle = 'rgba(148,163,184,0.4)';
    ctx.font      = '10px "Space Grotesk"';
    ctx.textAlign = 'right';
    ctx.fillText('✕', PX+PW-10, PY+16);
    ctx.textAlign = 'left';

    // ── Metrics rows ──────────────────────────────────────────────────
    const metrics = [
      { key:'pib',        label:'PIB/cap (€)',         unit:'€',   maxVal:50000, goodHigh:true,  color:'#22c55e', src:'Eurostat' },
      { key:'conv_eu',    label:'Convergență EU (%)',  unit:'%',   maxVal:130,   goodHigh:true,  color:'#8b5cf6', src:'Eurostat' },
      { key:'modal_auto', label:'Trafic auto (%)',     unit:'%',   maxVal:100,   goodHigh:false, color:'#f59e0b', src:'Eurostat Modal Split' },
      { key:'verde',      label:'Spații verzi (mp/loc)',unit:'mp', maxVal:50,    goodHigh:true,  color:'#16a34a', src:'Eurostat SDG' },
    ];

    const colW   = (PW - 20) / cities.length;
    const startY = PY + 38;

    // Header coloane (orase)
    cities.forEach((city, ci) => {
      const cx2 = PX + 10 + ci * colW + colW/2;
      ctx.textAlign = 'center';

      // Flag + nume
      ctx.fillStyle = city.isCurrent ? '#D4AF37' : '#fff';
      ctx.font      = city.isCurrent ? 'bold 11px "Space Grotesk"' : '10px "Space Grotesk"';
      ctx.fillText(city.data.flag + ' ' + city.data.name, cx2, startY);

      // Tara
      ctx.fillStyle = 'rgba(148,163,184,0.5)';
      ctx.font      = '7px "Space Grotesk"';
      ctx.fillText(city.data.country + ' · ' + year, cx2, startY+12);

      // Border bottom daca e curent
      if(city.isCurrent) {
        ctx.strokeStyle = 'rgba(212,175,55,0.4)';
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(PX + 10 + ci*colW + 4, startY + 18);
        ctx.lineTo(PX + 10 + (ci+1)*colW - 4, startY + 18);
        ctx.stroke();
      }
    });

    // Rows metrice
    const rowH   = (PH - 80) / metrics.length;
    metrics.forEach((metric, mi) => {
      const rowY = startY + 28 + mi * rowH;

      // Label metric
      ctx.textAlign = 'left';
      ctx.fillStyle = metric.color;
      ctx.font      = '7.5px "Space Grotesk"';
      ctx.fillText(metric.label, PX+12, rowY+8);

      // Sursa
      ctx.fillStyle = 'rgba(100,120,150,0.45)';
      ctx.font      = '6px "Space Grotesk"';
      ctx.fillText(metric.src, PX+12, rowY+18);

      // Valori per oras + bari
      const maxProj = Math.max(...projected.map(p => p.proj[metric.key] || 0));
      const effectiveMax = Math.max(metric.maxVal, maxProj * 1.1);

      projected.forEach((city, ci) => {
        const val  = city.proj[metric.key] || 0;
        const pct  = Math.min(1, val / effectiveMax);
        const bX   = PX + 10 + ci * colW;
        const bW   = colW - 8;
        const barW2 = bW * pct;

        // Background bar
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.fillRect(bX+2, rowY+22, bW, 10);

        // Filled bar
        const barColor = metric.goodHigh
          ? (pct > 0.7 ? metric.color : pct > 0.4 ? '#f59e0b' : '#ef4444')
          : (pct < 0.4 ? '#22c55e' : pct < 0.65 ? '#f59e0b' : '#ef4444');

        ctx.fillStyle = city.isCurrent ? metric.color : barColor + 'aa';
        ctx.fillRect(bX+2, rowY+22, barW2, 10);

        // Valore text
        ctx.textAlign = 'center';
        ctx.fillStyle = city.isCurrent ? '#fff' : 'rgba(200,215,235,0.75)';
        ctx.font      = city.isCurrent ? 'bold 8px "Space Grotesk"' : '8px "Space Grotesk"';
        const displayVal = metric.unit === '€'
          ? '€' + (val/1000).toFixed(0) + 'k'
          : val + metric.unit;
        ctx.fillText(displayVal, bX + colW/2, rowY+36);
      });

      // Separator
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth   = 0.5;
      ctx.beginPath();
      ctx.moveTo(PX+10, rowY+rowH-2);
      ctx.lineTo(PX+PW-10, rowY+rowH-2);
      ctx.stroke();
    });

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(100,120,150,0.4)';
    ctx.font      = '6.5px "Space Grotesk"';
    ctx.fillText(
      'Eurostat Urban Audit 2021 · Proiecție UrbanX — convergență EU bazată pe rate istorice BNR/Eurostat',
      PX + PW/2, PY + PH - 7
    );

    ctx.restore();
    ctx.textAlign = 'left';
  },

  // ── Baza de date orașe europene — Eurostat Urban Audit 2021 ──────────────
  _EU_CITIES: {
    // România
    iasi:       { name:'Iași',       country:'RO', flag:'🇷🇴', pop:360633, pib:13200, modal_auto:72, verde:8,  conv_eu:68  },
    cluj:       { name:'Cluj-Napoca',country:'RO', flag:'🇷🇴', pop:324576, pib:18400, modal_auto:65, verde:11, conv_eu:82  },
    timisoara:  { name:'Timișoara',  country:'RO', flag:'🇷🇴', pop:319279, pib:17200, modal_auto:68, verde:12, conv_eu:78  },
    brasov:     { name:'Brașov',     country:'RO', flag:'🇷🇴', pop:253200, pib:15800, modal_auto:66, verde:14, conv_eu:72  },
    botosani:   { name:'Botoșani',   country:'RO', flag:'🇷🇴', pop:106847, pib:9800,  modal_auto:74, verde:7,  conv_eu:52  },
    suceava:    { name:'Suceava',    country:'RO', flag:'🇷🇴', pop:114462, pib:10200, modal_auto:71, verde:9,  conv_eu:55  },
    // Ungaria
    debrecen:   { name:'Debrecen',   country:'HU', flag:'🇭🇺', pop:202214, pib:17800, modal_auto:58, verde:18, conv_eu:78  },
    miskolc:    { name:'Miskolc',    country:'HU', flag:'🇭🇺', pop:155713, pib:14200, modal_auto:55, verde:22, conv_eu:68  },
    // Bulgaria
    plovdiv:    { name:'Plovdiv',    country:'BG', flag:'🇧🇬', pop:346893, pib:12400, modal_auto:62, verde:10, conv_eu:55  },
    ruse:       { name:'Ruse',       country:'BG', flag:'🇧🇬', pop:147981, pib:11800, modal_auto:60, verde:14, conv_eu:52  },
    // Cehia
    brno:       { name:'Brno',       country:'CZ', flag:'🇨🇿', pop:382405, pib:28600, modal_auto:45, verde:24, conv_eu:92  },
    ostrava:    { name:'Ostrava',    country:'CZ', flag:'🇨🇿', pop:287333, pib:22400, modal_auto:48, verde:28, conv_eu:85  },
    // Lituania
    vilnius:    { name:'Vilnius',    country:'LT', flag:'🇱🇹', pop:592389, pib:31200, modal_auto:52, verde:20, conv_eu:95  },
    kaunas:     { name:'Kaunas',     country:'LT', flag:'🇱🇹', pop:289380, pib:26800, modal_auto:54, verde:22, conv_eu:90  },
    // Polonia
    wroclaw:    { name:'Wrocław',    country:'PL', flag:'🇵🇱', pop:643782, pib:29400, modal_auto:47, verde:26, conv_eu:94  },
    poznan:     { name:'Poznań',     country:'PL', flag:'🇵🇱', pop:551627, pib:27800, modal_auto:44, verde:28, conv_eu:92  },
    // Austria
    graz:       { name:'Graz',       country:'AT', flag:'🇦🇹', pop:291072, pib:42000, modal_auto:38, verde:35, conv_eu:122 },
    // Germania
    leipzig:    { name:'Leipzig',    country:'DE', flag:'🇩🇪', pop:587857, pib:38400, modal_auto:35, verde:38, conv_eu:128 },
  },

  // Mapare SIRUTA/platform key → EU_CITIES key
  _EU_KEY_MAP: {
    // Iasi variante
    'RO-IS-105309': 'iasi', 'iasi': 'iasi', 'IS': 'iasi',
    // Cluj
    'RO-CJ-54984':  'cluj', 'cluj': 'cluj', 'cluj-napoca': 'cluj',
    // Timisoara
    'RO-TM-155350': 'timisoara', 'timisoara': 'timisoara',
    // Brasov
    'RO-BV-26986':  'brasov', 'brasov': 'brasov',
    // Botosani
    'RO-BT-21959':  'botosani', 'botosani': 'botosani',
    // Suceava
    'RO-SV-146069': 'suceava', 'suceava': 'suceava',
    // Alte mari orase
    'RO-CT-61095':  'iasi',  // Constanta → peer iasi
    'RO-GL-84442':  'iasi',  // Galati
    'RO-PH-119217': 'iasi',  // Ploiesti
  },

  _getEUCityKey(cityKey) {
    if(!cityKey) return null;
    const lower = cityKey.toLowerCase();
    // Direct match
    if(this._EU_KEY_MAP[cityKey]) return this._EU_KEY_MAP[cityKey];
    if(this._EU_KEY_MAP[lower]) return this._EU_KEY_MAP[lower];
    // Cautare partiala in nume
    const name = this.cityData?.name?.toLowerCase() || '';
    if(name.includes('iasi') || name.includes('iași')) return 'iasi';
    if(name.includes('cluj')) return 'cluj';
    if(name.includes('timis')) return 'timisoara';
    if(name.includes('brasov') || name.includes('brașov')) return 'brasov';
    if(name.includes('botosani') || name.includes('botoșani')) return 'botosani';
    if(name.includes('suceava')) return 'suceava';
    // Fallback: primul oras RO din EU_CITIES
    return Object.keys(this._EU_CITIES).find(k => this._EU_CITIES[k].country === 'RO') || 'iasi';
  },

  // 2 EU + 2-3 RO per tip UAT
  _EU_PEERS: {
    capitala:           { eu:['brno','graz'],        ro:['cluj','timisoara','brasov'] },
    municipiu_mare:     { eu:['debrecen','brno'],     ro:['timisoara','brasov','iasi'] },
    municipiu_resedinta:{ eu:['miskolc','ruse'],      ro:['iasi','brasov','timisoara'] },
    municipiu:          { eu:['ruse','miskolc'],      ro:['suceava','iasi','brasov']   },
    oras:               { eu:['ruse','plovdiv'],      ro:['botosani','suceava']        },
  },

  // ── PARCEL RISK CARD — unic în lume ───────────────────────────────────────
  // Afișat automat pe canvas când TCI e în modul parcela
  // Date: INFP P100-1/2013 · ANAR PGRA 2021-2027 · INSE · ANCPI
  _drawParcelRiskCard(ctx, W, H) {
    const ap = this.activeParcel;
    if(!ap || this.mode !== 'parcela') return;

    const risk = (typeof _getRiskProfile !== 'undefined')
      ? _getRiskProfile(this.cityData || {}) : null;
    const cd = this.cityData;

    // ── Date parcela ────────────────────────────────────────────────────
    const nrCad   = ap.nrCad || ap.nrcad || '—';
    const utr     = ap.utr   || '—';
    const area    = parseFloat(ap.area  || 0).toFixed(0);
    const pot     = ap.params?.pot || '—';
    const h_max   = ap.params?.h   || '—';
    const rata    = (cd?.rata_reala_2011_2021 || 0).toFixed(2);
    const rataCol = (cd?.rata_reala_2011_2021 || 0) >= 0 ? '#22c55e' : '#ef4444';

    // ── Scor risc compozit ───────────────────────────────────────────────
    const riskScore = risk?.riskScore || 0;
    const riskColor = riskScore > 60 ? '#ef4444'
                    : riskScore > 35 ? '#f59e0b' : '#22c55e';
    const riskLabel = riskScore > 60 ? 'RISC RIDICAT'
                    : riskScore > 35 ? 'RISC MODERAT' : 'RISC SCAZUT';

    // ── ROI estimat (din Bilanț Edificabil) ─────────────────────────────
    const areaNum    = parseFloat(area) || 100;
    const potNum     = parseFloat(pot)  || 50;
    const SC_max     = areaNum * potNum / 100;
    const niv        = Math.floor((parseFloat(h_max) || 9) / 3);
    const SD_prop    = SC_max * niv;
    const pret_teren = areaNum < 200 ? 420 : areaNum < 500 ? 320 : 250;
    const val_teren  = areaNum * pret_teren;
    const cost_constr= SD_prop * 650;
    const val_vanzare= SD_prop * 1150;
    const roi_pct    = val_teren + cost_constr > 0
      ? Math.round((val_vanzare - cost_constr - val_teren) / (val_teren + cost_constr) * 100)
      : 0;
    const roiColor = roi_pct > 20 ? '#22c55e' : roi_pct > 8 ? '#f59e0b' : '#ef4444';

    // ── Dimensions & position ───────────────────────────────────────────
    const CW = 230, CH = 310;
    const CX = 195, CY = 56;   // colț stânga sus, sub topbar

    ctx.save();

    // Shadow + background
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur  = 20;
    ctx.fillStyle   = 'rgba(4,10,24,0.95)';
    this._rr(ctx, CX, CY, CW, CH, 10);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Border + bara sus colorata per risc
    ctx.strokeStyle = riskColor + '88';
    ctx.lineWidth   = 1;
    this._rr(ctx, CX, CY, CW, CH, 10);
    ctx.stroke();
    ctx.fillStyle = riskColor;
    ctx.fillRect(CX, CY, CW, 3);

    // ── Header ────────────────────────────────────────────────────────
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(212,175,55,0.9)';
    ctx.font      = 'bold 8px "Space Grotesk"';
    ctx.fillText('📍 PARCEL RISK CARD', CX+10, CY+14);

    ctx.fillStyle = '#fff';
    ctx.font      = 'bold 13px "Space Grotesk"';
    ctx.fillText(`Nr. ${nrCad}  ·  UTR ${utr}`, CX+10, CY+30);

    ctx.fillStyle = 'rgba(148,163,184,0.65)';
    ctx.font      = '8px "Space Grotesk"';
    ctx.fillText(`${area} mp  ·  ${cd?.name || ''}  ·  jud. ${cd?.judet || ''}`, CX+10, CY+44);

    // ── Separator ─────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth   = 0.5;
    ctx.beginPath(); ctx.moveTo(CX+10, CY+52); ctx.lineTo(CX+CW-10, CY+52); ctx.stroke();

    // ── Risc seismic ──────────────────────────────────────────────────
    const seismicKey   = risk?.seismic?.key   || '—';
    const seismicColor = risk?.seismic?.score > 60 ? '#ef4444' : risk?.seismic?.score > 35 ? '#f59e0b' : '#22c55e';

    ctx.fillStyle = 'rgba(148,163,184,0.55)';
    ctx.font      = '7.5px "Space Grotesk"';
    ctx.fillText('⚡ SEISMIC  —  INFP P100-1/2013', CX+10, CY+66);
    ctx.fillStyle = seismicColor;
    ctx.font      = 'bold 12px "Space Grotesk"';
    ctx.fillText(seismicKey, CX+10, CY+81);
    ctx.fillStyle = 'rgba(148,163,184,0.45)';
    ctx.font      = '7px "Space Grotesk"';
    ctx.fillText(`ag=${risk?.seismic?.ag||'—'}g  ·  ${risk?.seismic?.description||''}`, CX+10, CY+93);

    // ── Risc inundatii ────────────────────────────────────────────────
    const floodKey   = risk?.flood?.key   || '—';
    const floodColor = risk?.flood?.score > 60 ? '#ef4444' : risk?.flood?.score > 35 ? '#f59e0b' : '#22c55e';

    ctx.fillStyle = 'rgba(148,163,184,0.55)';
    ctx.font      = '7.5px "Space Grotesk"';
    ctx.fillText('💧 INUNDAȚII  —  ANAR PGRA 2021-2027', CX+10, CY+109);
    ctx.fillStyle = floodColor;
    ctx.font      = 'bold 12px "Space Grotesk"';
    ctx.fillText(floodKey, CX+10, CY+124);
    ctx.fillStyle = 'rgba(148,163,184,0.45)';
    ctx.font      = '7px "Space Grotesk"';
    ctx.fillText(risk?.flood?.description || 'Date ANAR bazin hidrografic', CX+10, CY+136);

    // ── Demografie ────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(148,163,184,0.55)';
    ctx.font      = '7.5px "Space Grotesk"';
    ctx.fillText('👥 DEMOGRAFIE  —  INSE 2011-2021', CX+10, CY+152);
    ctx.fillStyle = rataCol;
    ctx.font      = 'bold 12px "Space Grotesk"';
    ctx.fillText(`${rata}% / an`, CX+10, CY+167);
    ctx.fillStyle = 'rgba(148,163,184,0.45)';
    ctx.font      = '7px "Space Grotesk"';
    const pop21 = (cd?.pop2021||0).toLocaleString();
    const pop11 = (cd?.pop2011||0).toLocaleString();
    ctx.fillText(`${pop11} loc. (2011) → ${pop21} loc. (2021)`, CX+10, CY+179);

    // ── Separator ─────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth   = 0.5;
    ctx.beginPath(); ctx.moveTo(CX+10, CY+189); ctx.lineTo(CX+CW-10, CY+189); ctx.stroke();

    // ── ROI estimat ───────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(148,163,184,0.55)';
    ctx.font      = '7.5px "Space Grotesk"';
    ctx.fillText('💶 ROI ESTIMAT  —  ANCPI · HG 907/2016', CX+10, CY+203);

    // Bara ROI
    const barW = CW - 20;
    const roiFill = Math.min(barW, Math.max(0, roi_pct / 40 * barW));
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(CX+10, CY+210, barW, 8);
    ctx.fillStyle = roiColor;
    ctx.fillRect(CX+10, CY+210, roiFill, 8);

    ctx.fillStyle = roiColor;
    ctx.font      = 'bold 12px "Space Grotesk"';
    ctx.fillText(`${roi_pct}% ROI`, CX+10, CY+232);
    ctx.fillStyle = 'rgba(148,163,184,0.45)';
    ctx.font      = '7px "Space Grotesk"';
    ctx.fillText(`Val. teren ~€${val_teren.toLocaleString()} · Const. ~€${Math.round(cost_constr).toLocaleString()}`, CX+10, CY+244);

    // ── Scor risc total ───────────────────────────────────────────────
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    this._rr(ctx, CX+10, CY+254, CW-20, 28, 5);
    ctx.fill();

    ctx.fillStyle = riskColor;
    ctx.font      = 'bold 9px "Space Grotesk"';
    ctx.fillText(`${riskLabel}`, CX+18, CY+265);

    // Scor numeric
    ctx.textAlign = 'right';
    ctx.fillStyle = riskColor;
    ctx.font      = 'bold 16px "Space Grotesk"';
    ctx.fillText(`${riskScore}/100`, CX+CW-14, CY+268);
    ctx.textAlign = 'left';

    ctx.fillStyle = 'rgba(100,120,150,0.45)';
    ctx.font      = '6.5px "Space Grotesk"';
    ctx.fillText('INFP · ANAR · INHGA · INSE', CX+18, CY+277);

    // ── Disclaimer ────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(80,100,130,0.45)';
    ctx.font      = '6px "Space Grotesk"';
    ctx.fillText('UrbanX · Analiză statistică · Date oficiale publice', CX+10, CY+CH-6);

    ctx.restore();
    ctx.textAlign = 'left';
  },

  // ── Sistem camera cinematica automata ─────────────────────────────────────
  // Secvente de zbor care dramatizeaza proiectia urbana
  _CAM_SEQUENCES: null,  // initializat in _launch cu coordonate reale

  _cinemaTimer: 0,
  _cinemaSeqIdx: 0,
  _cinemaPhase: 'overview',

  _initCinemaCamera(cx, cy) {
    const d    = this.cityData;
    const risk = (typeof _getRiskProfile !== 'undefined') ? _getRiskProfile(d||{}) : null;
    const cityName = d?.name || this.cityKey;

    // ── STORYTELLER: 4 zone narative × 6 shot-uri = 24 shots/ciclu ────────
    // Fiecare zonă are o poveste urbanistică proprie, sincronizată cu camera

    this._STORY_ZONES = [
      {
        id: 'centru',
        name: 'Centrul Civic',
        lon: cx,        lat: cy,
        narTitle: (yr) => `🏛 Centrul Civic — ${cityName} · ${yr}`,
        narText:  (yr, pd) => {
          const pop = Math.round((pd?.demo?.value||d?.pop2021||100000));
          const cut = (2.5 + (yr-2021)*0.015).toFixed(2);
          return `Zona centrală concentrează densitatea maximă de funcțiuni mixte. CUT estimat: ${cut} · Populație proiectată: ${pop.toLocaleString()} loc. · Presiune demografică +${((yr-2021)*0.4).toFixed(1)}%/an față de periferie.`;
        },
        narSrc: 'PUG · ANCPI · Eurostat Urban Audit 2021',
      },
      {
        id: 'rezidential_nord',
        name: 'Rezidențial Nord',
        lon: cx+0.012,  lat: cy+0.015,
        narTitle: (yr) => `🏘 Rezidențial Nord — ${cityName} · ${yr}`,
        narText:  (yr, pd) => {
          const auth = Math.round((yr-2021)*115);
          const dens = Math.round(1800 + (yr-2021)*28);
          return `Densificare rezidențială progresivă: ~${auth} autorizații noi cumulate față de 2021. Densitate estimată: ${dens} loc/km². Clădiri noi: R+4 mediu, conform RLU-PUG.`;
        },
        narSrc: 'ANCPI Autorizații Construire · INSE Recensămînt',
      },
      {
        id: 'periferie_vest',
        name: 'Periferie Vest — Expansiune',
        lon: cx-0.022,  lat: cy+0.010,
        narTitle: (yr) => `🌱 Periferie Vest — Expansiune · ${yr}`,
        narText:  (yr, pd) => {
          const ha  = (2.1*(yr-2021)).toFixed(1);
          const ms  = (typeof _getModalSplit !== 'undefined') ? _getModalSplit(yr) : {auto:72,tp:18};
          return `Expansiune periferică: ~${ha} ha/an reconvertite din agricol/industrial. Transport auto dominant: ${ms.auto}% · TP: ${ms.tp}%. Necesitate infrastructură: drumuri de acces + linie TP după 2028.`;
        },
        narSrc: 'MDLPA Fond Imobiliar · Eurostat Land Use · PNRR Mobilitate',
      },
      {
        id: 'industrial',
        name: 'Zona Industrială — Reconversie',
        lon: cx+0.022,  lat: cy-0.012,
        narTitle: (yr) => `🏗 Zona Industrială — Reconversie · ${yr}`,
        narText:  (yr, pd) => {
          const ha  = (1.4*(yr-2021)).toFixed(1);
          const esg = Math.round(51 + (yr-2021)*0.9);
          return `Reconversie industrială → mix funcțional: ~${ha} ha reabilitate. ESG Urban Score: ${esg}/100. Oportunitate: logistică urbană + spații coworking + rezidențial accesibil. Risc brun: ANIF monitorizare sol.`;
        },
        narSrc: 'ANIF · ANCPI · Eurostat SDG 11 · BNR Imobiliar',
      },
    ];

    // ── Construim lista completă de shots: Satelit→Coborare→Aterizare→Pieton→Explorare→Zbor
    // Structura per screenshot-ul de proiect (20 shots/ciclu, 4 zone)
    this._STORY_SHOTS = [];
    const ap = this.activeParcel;

    if(this.mode === 'parcela' && ap) {
      // Mod parcelă: 4 shots centrate pe parcelă activă
      this._STORY_SHOTS = [
        { zoneId:'parcela', type:'satelit',   lon:ap.lon, lat:ap.lat, zoom:10,   pitch:0,  bearing:0,   dur:5000 },
        { zoneId:'parcela', type:'coborare',  lon:ap.lon, lat:ap.lat, zoom:15,   pitch:52, bearing:-15, dur:5000 },
        { zoneId:'parcela', type:'pieton',    lon:ap.lon, lat:ap.lat, zoom:17.5, pitch:72, bearing:0,   dur:13000},
        { zoneId:'parcela', type:'explorare', lon:ap.lon, lat:ap.lat, zoom:17,   pitch:68, bearing:60,  dur:10000},
        { zoneId:'parcela', type:'zbor',      lon:cx,     lat:cy,     zoom:12.5, pitch:30, bearing:0,   dur:5000 },
      ];
    } else {
      this._STORY_ZONES.forEach(zone => {
        this._STORY_SHOTS.push(
          // Shot 1 — SATELIT: vedere de sus, orasul de ansamblu (7s)
          { zoneId:zone.id, type:'satelit',   lon:zone.lon, lat:zone.lat, zoom:10,   pitch:0,  bearing:0,     dur:7000  },
          // Shot 2 — COBORARE: clădirile apar, 3D (5s)
          { zoneId:zone.id, type:'coborare',  lon:zone.lon, lat:zone.lat, zoom:14.5, pitch:52, bearing:-15,   dur:5000  },
          // Shot 3 — ATERIZARE: strada se vede (4s)
          { zoneId:zone.id, type:'aterizare', lon:zone.lon, lat:zone.lat, zoom:16.5, pitch:68, bearing:30,    dur:4000  },
          // Shot 4 — PIETON: nivel ochi, modificările vizibile (13s)
          { zoneId:zone.id, type:'pieton',    lon:zone.lon, lat:zone.lat, zoom:17.5, pitch:76, bearing:-10,   dur:13000 },
          // Shot 5 — EXPLORARE: bearing rotit +60° (10s)
          { zoneId:zone.id, type:'explorare', lon:zone.lon, lat:zone.lat, zoom:17,   pitch:68, bearing:zone.lon>cx?60:-60, dur:10000},
          // Shot 6 — ZBOR: pull-back la zona nouă (5s)
          { zoneId:zone.id, type:'zbor',      lon:cx,       lat:cy,       zoom:12.5, pitch:30, bearing:0,     dur:5000  }
        );
      });
    }

    // Compatibilitate cu _milestoneCamera care foloseste _CAM_SEQUENCES
    this._CAM_SEQUENCES = { milestone: [
      { lon:cx, lat:cy, zoom:12.5, pitch:25, bearing:0,   dur:3000 },
      { lon:cx, lat:cy, zoom:15.5, pitch:62, bearing:-30, dur:4000 },
    ]};

    this._storyShotIdx  = 0;
    this._cinemaSeqIdx  = 0;  // compatibilitate
    this._cinemaActive  = true;
    this._lastCinemaFly = 0;
    this._currentZone   = null;
    console.log('[TCI Storyteller] ' + this._STORY_SHOTS.length + ' shots × ' + this._STORY_ZONES.length + ' zone');

    // Init viata urbana pe canvas
    this._initCityLife(cx, cy);

    // Afisam primul card imediat
    if(this._STORY_SHOTS.length) {
      const firstShot = this._STORY_SHOTS[0];
      const firstZone = this._STORY_ZONES?.find(z => z.id === firstShot.zoneId);
      if(firstZone) setTimeout(() => this._updateNarrativeForZone(firstZone, this.year, firstShot.type), 1200);
    }
  },

  _updateCinemaCamera(year, yearT, totalT) {
    // Daca Director-ul rulează filmul, nu interferam cu camera
    if(this.Director?._active) return;

    if(!this._cinemaActive || !this.map) return;
    if(!this.running) return;

    const shots = this._STORY_SHOTS;
    if(!shots?.length) return;

    const now     = Date.now();
    const curShot = shots[this._storyShotIdx % shots.length];
    const shotDur = curShot.dur || 8000;

    if(now - this._lastCinemaFly > shotDur) {
      this._storyShotIdx++;
      this._cinemaSeqIdx = this._storyShotIdx; // sync compatibilitate
      const s = shots[this._storyShotIdx % shots.length];

      const isMilestone = this.MILES.includes(year) && yearT < 0.1;

      // Durata flyTo adaptata la tipul shotului
      const flyDur = {
        satelit:   3500,
        coborare:  4500,
        aterizare: 3000,
        pieton:    5000,
        explorare: 6000,
        zbor:      4500,
        parcela:   5000,
      }[s.type] || 5000;

      try {
        this.map.flyTo({
          center:    [s.lon, s.lat],
          zoom:      s.zoom + (isMilestone ? 0.4 : 0),
          pitch:     s.pitch,
          bearing:   s.bearing,
          duration:  isMilestone ? flyDur * 0.8 : flyDur,
          essential: true,
          easing: (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t,
        });
        this._lastCinemaFly = now;
        this.bearing = s.bearing;

        // Actualizare card narativ sincronizat cu zona afisata
        const zone = this._STORY_ZONES?.find(z => z.id === s.zoneId);
        if(zone && zone.id !== this._currentZone?.id) {
          this._currentZone = zone;
          this._updateNarrativeForZone(zone, year, s.type);
        }
      } catch(e) {}
    }
  },

  // ── Narrative sincronizat cu zona de camera ───────────────────────────────
  _updateNarrativeForZone(zone, year, shotType) {
    if(!zone) return;
    const pd = (typeof _getProjectionData !== 'undefined')
      ? _getProjectionData(year, this.scenario, this.cityKey) : null;

    const shotLabels = {
      satelit:   '🛰 Vedere satelit',
      coborare:  '✈ Coborâre spre',
      aterizare: '🛬 Aterizare în',
      pieton:    '🚶 La nivelul strazii',
      explorare: '🔄 Explorare 360°',
      zbor:      '🌆 Context metropolitan',
      parcela:   '📍 Parcelă activă',
    };
    const label = shotLabels[shotType] || '';

    let title, body, src;
    if(shotType === 'zbor') {
      const ms = (typeof _getModalSplit !== 'undefined') ? _getModalSplit(year) : {auto:72,tp:18,bici_ped:10};
      title = `${label} — ${this.cityData?.name || ''} · ${year}`;
      body  = `Perspectivă metropolitană. Modal split ${year}: auto ${ms.auto}% · transport public ${ms.tp}% · activ ${ms.bici_ped}%. Densitate urbană în expansiune.`;
      src   = 'MDLPA · Eurostat Urban Audit · PNRR';
    } else {
      title = `${label} — ${zone.name} · ${year}`;
      body  = zone.narText(year, pd);
      src   = zone.narSrc;
    }

    const titleEl = document.getElementById('tci-narcard-title');
    const bodyEl  = document.getElementById('tci-narcard-body');
    const srcEl   = document.getElementById('tci-narcard-src');
    const card    = document.getElementById('tci-narcard');

    if(!card) return;
    card.style.opacity = '0';
    setTimeout(() => {
      if(titleEl) titleEl.textContent = title;
      if(bodyEl)  bodyEl.textContent  = body;
      if(srcEl)   srcEl.textContent   = '📊 ' + src;
      card.style.opacity = '1';
    }, 350);
  },

  // Secventa dramatica la milestone (camera pull-back + zoom in)
  _milestoneCamera(year) {
    if(!this.map || !this._CAM_SEQUENCES) return;
    const seq  = this._CAM_SEQUENCES.milestone;
    const d    = this.cityData;
    const cx   = this.activeParcel?.lon || d?.lon || 27.601;
    const cy   = this.activeParcel?.lat || d?.lat || 47.158;

    // Pull back dramatic
    this.map.flyTo({
      center:   [cx, cy],
      zoom:     12.5,
      pitch:    25,
      bearing:  0,
      duration: 2500,
      essential: true,
    });
    this.bearing = 0;

    // Dupa 3s: zoom in dramatic pe centru
    setTimeout(() => {
      if(!this.running) return;
      this.map.flyTo({
        center:   [cx, cy],
        zoom:     15.5,
        pitch:    60,
        bearing:  -30,
        duration: 4000,
        essential: true,
      });
      this.bearing = -30;
      this._lastCinemaFly = Date.now();
    }, 3000);
  },

  _initParticlesOnRoads(cx, cy) {
    this._roadParticles = [];
    this._roadSegments  = [];
    const m = this.map; if(!m) return;

    // Obtinem segmentele reale de strazi din Mapbox
    const extractRoads = () => {
      try {
        const features = m.queryRenderedFeatures(
          undefined,
          { layers: ['road-primary','road-secondary','road-street',
                     'road-tertiary','road-motorway-trunk',
                     'road','roads','tci-roads-flow'] }
        );

        let segs = [];
        features.forEach(f => {
          const g = f.geometry;
          if(g.type === 'LineString' && g.coordinates.length >= 2) {
            for(let i=0;i<g.coordinates.length-1;i++){
              segs.push({
                start: g.coordinates[i],
                end:   g.coordinates[i+1],
              });
            }
          }
        });

        // Daca nu gasim strazi in stil, folosim strazi Mapbox Streets
        if(segs.length < 10) {
          const feat2 = m.queryRenderedFeatures(undefined,
            { sourceLayer:'road' });
          feat2.forEach(f => {
            const g = f.geometry;
            if(g.type === 'LineString') {
              for(let i=0;i<g.coordinates.length-1;i++){
                segs.push({ start:g.coordinates[i], end:g.coordinates[i+1] });
              }
            }
          });
        }

        // Fallback: strazi realiste pentru orasul activ
        if(segs.length < 10) {
          segs = this._fallbackRoads(cx, cy);
        }

        this._roadSegments = segs;
        this._buildParticles(segs);
        console.log(`[TCI] ${segs.length} segmente strazi reale extrase`);
      } catch(e) {
        this._roadSegments = this._fallbackRoads(cx, cy);
        this._buildParticles(this._roadSegments);
      }
    };

    // Asteptam ca harta sa fie gata sa ofere features
    if(m.isStyleLoaded?.() && m.loaded?.()) {
      extractRoads();
    } else {
      m.once('idle', extractRoads);
      setTimeout(extractRoads, 3000); // fallback
    }
  },

  _fallbackRoads(cx, cy) {
    // Strazi realiste bazate pe pattern urban romanesc
    // Bulevard principal E-V + N-S + strazi secundare
    const segs = [];
    const pop  = this.cityData?.pop2021 || 100000;
    const r    = Math.min(0.025, 0.008 + pop/2000000);

    // Bulevarde principale (4 axe)
    const boulevards = [
      { from:[-r,0],   to:[r,0],    // E-V
        pts: [[-r,0],[-r*0.6,0.002],[-r*0.2,-0.001],[0,0],[r*0.2,0.001],[r*0.6,-0.001],[r,0]] },
      { from:[0,-r],   to:[0,r],    // N-S
        pts: [[0,-r],[0.001,-r*0.6],[-0.001,-r*0.2],[0,0],[0.001,r*0.2],[-0.001,r*0.6],[0,r]] },
      { from:[-r*0.7,-r*0.7], to:[r*0.7,r*0.7],   // NV-SE
        pts: [[-r*0.7,-r*0.7],[-r*0.3,-r*0.3],[0,0],[r*0.3,r*0.3],[r*0.7,r*0.7]] },
      { from:[-r*0.7,r*0.7],  to:[r*0.7,-r*0.7],  // NE-SV
        pts: [[-r*0.7,r*0.7],[-r*0.3,r*0.3],[0,0],[r*0.3,-r*0.3],[r*0.7,-r*0.7]] },
    ];

    boulevards.forEach(b => {
      for(let i=0;i<b.pts.length-1;i++){
        segs.push({
          start: [cx+b.pts[i][0],   cy+b.pts[i][1]],
          end:   [cx+b.pts[i+1][0], cy+b.pts[i+1][1]],
        });
      }
    });

    // Strazi secundare in grila (insa pe coordonate reale)
    const step = r/4;
    for(let i=-3;i<=3;i++){
      for(let j=-3;j<=2;j++){
        // Orizontale
        segs.push({ start:[cx+j*step,     cy+i*step*0.7], end:[cx+(j+1)*step, cy+i*step*0.7] });
        // Verticale
        segs.push({ start:[cx+i*step*0.7, cy+j*step],     end:[cx+i*step*0.7, cy+(j+1)*step] });
      }
    }
    return segs;
  },

  _buildParticles(segs) {
    if(!segs.length) return;
    this._roadParticles = [];
    const r=(s)=>{let x=Math.sin(s*7919)*9999;return x-Math.floor(x);};
    for(let i=0;i<150;i++){
      const seg = segs[Math.floor(r(i*37) * segs.length)];
      this._roadParticles.push({
        seg,
        t:     r(i*73) % 1,
        dir:   r(i*53) > 0.5 ? 1 : -1,  // sens de mers
        speed: 0.004 + r(i*31) * 0.006,  // viteza realista
        type:  i<90?'car' : i<125?'bus' : 'bike',
        phase: r(i*17)*Math.PI*2,
      });
    }
  },

  _rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();},

  // ══════════════════════════════════════════════════════════════════════════
  // TCI.Director — CINEMATIC URBAN DOCUMENTARY ENGINE
  // Orchestrează 12 scene cinematografice: de la satelit → nivel pietonal
  // ══════════════════════════════════════════════════════════════════════════

  Director: {
    _active: false,
    _sceneIdx: -1,
    _sceneStartTime: 0,
    _sceneTimer: null,
    _tci: null,   // ref la TCI setat in _directorInit

    // ── CELE 12 SCENE (conform storyboard) ─────────────────────────────────
    _buildScenes(cx, cy, cityName, cityPop, cityYear) {
      // ═══════════════════════════════════════════════════════════════════
      // TCI CINEMATIC EXPERIENCE 2.0 — 12 SCENE × 75s = 15 MINUTE
      // Storyboard exact · Camera cinematică · Date oficiale · Narativ complet
      // ═══════════════════════════════════════════════════════════════════
      const pop50  = Math.round(cityPop * 1.203).toLocaleString();
      const pop40  = Math.round(cityPop * 1.09).toLocaleString();
      const pop30  = Math.round(cityPop * 1.04).toLocaleString();
      const popStr = cityPop.toLocaleString();
      const densHA = Math.round(cityPop / 9430);
      const cc = (pts, delay, dur) => ({ center:pts, zoom:pts[2]||13, pitch:pts[3]||55, bearing:pts[4]||0, delay, duration:dur||6000 });
      const $ = (lon,lat,zoom,pitch,bearing,delay,dur) => ({ center:[cx+lon,cy+lat], zoom, pitch, bearing, delay, duration:dur||6000 });

      return [

        // ══ S1 — INTRO: PLANETĂ → ROMÂNIA (00:00–01:15) — 75s ══════════════
        {
          id:'s1_planeta', title:'1 · INTRO — PLANETĂ → ROMÂNIA',
          duration:75000,
          camera:{ center:[24.5,45.9], zoom:4.0, pitch:0, bearing:0, duration:4000 },
          cameraChain:[
            { center:[24.5,45.9], zoom:5.2, pitch:8, bearing:-5,  delay:8000,  duration:5000 },
            { center:[25.0,45.5], zoom:6.2, pitch:18, bearing:-15, delay:18000, duration:6000 },
            { center:[26.0,46.0], zoom:7.0, pitch:25, bearing:-10, delay:29000, duration:6000 },
            { center:[27.0,46.8], zoom:8.0, pitch:30, bearing:-8,  delay:40000, duration:7000 },
            { center:[cx+0.2,cy+0.1], zoom:9.5, pitch:35, bearing:-5, delay:52000, duration:7000 },
            { center:[cx,cy], zoom:11.0, pitch:40, bearing:0, delay:63000, duration:8000 },
          ],
          narrative:{
            title:'🌍 O Călătorie Începe de la Scară Globală',
            body:'România — 19,5 milioane locuitori · PIB 347 miliarde € · Creștere urbană +0,84%/an · Temperatură estimată: +1,7°C față de 2020 în scenariu 2050. Pornim de la vedere globală și coborâm spre ' + cityName + ', polul urban al Moldovei.',
            src:'INS · Eurostat Regional Statistics · IPCC AR6 RCP8.5 · BNR'
          },
          overlay:'s1_ro_overview', light:'day',
        },

        // ══ S2 — ZOOM REGIUNE MOLDOVA (01:15–02:30) — 75s ══════════════════
        {
          id:'s2_moldova', title:'2 · ZOOM REGIUNE — MOLDOVA',
          duration:75000,
          camera:{ center:[cx+0.4,cy+0.2], zoom:7.5, pitch:18, bearing:-12, duration:5000 },
          cameraChain:[
            { center:[cx+0.3,cy+0.1], zoom:8.2, pitch:25, bearing:-8,  delay:12000, duration:6000 },
            { center:[cx+0.1,cy+0.05], zoom:9.0, pitch:30, bearing:-5, delay:25000, duration:6000 },
            { center:[cx+0.05,cy+0.02], zoom:9.8, pitch:35, bearing:5, delay:38000, duration:6000 },
            { center:[cx,cy+0.02], zoom:10.5, pitch:38, bearing:-5, delay:52000, duration:7000 },
            { center:[cx,cy], zoom:11.2, pitch:40, bearing:0, delay:64000, duration:7000 },
          ],
          narrative:{
            title:'🗺 Moldova — Coridoare de Dezvoltare Regională',
            body:'Tendințe 2050: Populație +21,3% · Locuri de muncă +28,7% · Investiții +31,5% · Risc climatic: MEDIU. ' + cityName + ' — centrul gravitațional al regiunii. Bacău, Piatra Neamț, Suceava în orbita metropolitană.',
            src:'ADR Nord-Est · INS · BNR · IPCC AR6 · MDLPA'
          },
          overlay:'s2_moldova_region', light:'day',
        },

        // ══ S3 — APROACH IAȘI (02:30–03:45) — 75s ═══════════════════════════
        {
          id:'s3_approach', title:'3 · APROACH — ' + cityName.toUpperCase(),
          duration:75000,
          camera:{ center:[cx,cy+0.05], zoom:10.5, pitch:22, bearing:-25, duration:5000 },
          cameraChain:[
            { center:[cx,cy+0.03], zoom:11.2, pitch:28, bearing:-18, delay:12000, duration:6000 },
            { center:[cx,cy+0.01], zoom:11.8, pitch:33, bearing:-12, delay:24000, duration:6000 },
            { center:[cx,cy],      zoom:12.3, pitch:38, bearing:-8,  delay:37000, duration:6500 },
            { center:[cx,cy],      zoom:12.8, pitch:42, bearing:-3,  delay:50000, duration:6500 },
            { center:[cx,cy],      zoom:13.2, pitch:48, bearing:5,   delay:63000, duration:7000 },
          ],
          narrative:{
            title:'✈ Ne Apropiem de ' + cityName + ' · ' + cityYear,
            body:popStr + ' locuitori · +20,3% până în 2050 → ' + pop50 + ' loc. Locuințe noi estimate: 12.400 · Investiții: 2,8 MLD € · PIB/cap: €14.200 (+100% față de 2025 în 2050). Evoluție demografică vizibilă în timp real.',
            src:'INSE Cohort-Survival · ANCPI · BNR · Eurostat Urban Audit'
          },
          overlay:'s3_approach_data', light:'dusk',
        },

        // ══ S4 — ORAȘ 3D VEDERE GENERALĂ (03:45–05:05) — 80s ════════════════
        {
          id:'s4_city3d', title:'4 · ORAȘ 3D — VEDERE GENERALĂ',
          duration:80000,
          camera:{ center:[cx,cy], zoom:13.0, pitch:50, bearing:-30, duration:5500 },
          cameraChain:[
            { center:[cx+0.005,cy+0.002], zoom:13.5, pitch:55, bearing:-10, delay:13000, duration:6000 },
            { center:[cx+0.003,cy-0.003], zoom:14.0, pitch:58, bearing:20,  delay:27000, duration:6500 },
            { center:[cx-0.004,cy+0.004], zoom:13.8, pitch:60, bearing:-25, delay:41000, duration:6500 },
            { center:[cx-0.002,cy-0.002], zoom:14.2, pitch:62, bearing:10,  delay:55000, duration:6500 },
            { center:[cx,cy],             zoom:13.5, pitch:55, bearing:0,   delay:69000, duration:7000 },
          ],
          narrative:{
            title:'🏙 ' + cityName + ' 3D — Harta Densității Urbane',
            body:'Vedere generală 3D: densitate, zone de potențial, presiune urbană. Cartierele: COPOU · TĂTĂRAȘI · CENTRU · NICOLINA · DACIA · FRUMOASA. Densitate medie: ' + densHA + ' loc/ha. Fiecare culoare = o reglementare PUG diferită.',
            src:'PUG ' + cityName + ' · OSM 3D Buildings · Eurostat Urban Audit'
          },
          overlay:'s4_city3d_labels', light:'dusk',
        },

        // ══ S5 — DEZVOLTARE URBANĂ 2025–2050 (05:05–06:30) — 85s ════════════
        {
          id:'s5_dezvoltare', title:'5 · DEZVOLTARE URBANĂ 2025–2050',
          duration:85000,
          camera:{ center:[cx+0.006,cy+0.008], zoom:13.5, pitch:58, bearing:15, duration:5500 },
          cameraChain:[
            { center:[cx+0.010,cy+0.012], zoom:14.0, pitch:62, bearing:-15, delay:14000, duration:6500 },
            { center:[cx-0.005,cy+0.006], zoom:14.2, pitch:64, bearing:25,  delay:29000, duration:6500 },
            { center:[cx-0.008,cy-0.006], zoom:14.5, pitch:65, bearing:-20, delay:44000, duration:6500 },
            { center:[cx+0.012,cy-0.004], zoom:14.0, pitch:62, bearing:10,  delay:59000, duration:6500 },
            { center:[cx,cy],             zoom:13.5, pitch:58, bearing:0,   delay:74000, duration:7000 },
          ],
          narrative:{
            title:'📈 Simulăm Dezvoltarea în Timp Real — 2025→2050',
            body:'Zone MAJORĂ (roșu) · MEDIE (galben) · MICĂ (verde) · STAGNARE (violet). Clădirile cresc cu fiecare an de proiecție. 18.400 locuințe noi cumulate · 420.000 mp birouri · +85 ha spații verzi. Fiecare culoare = o politică urbanistică diferită.',
            src:'ANCPI Autorizații Construire · PUG UTR · INS Construcții'
          },
          overlay:'s5_dezvoltare', light:'dusk',
          animateYear:true, yearFrom:2025, yearTo:2050,
        },

        // ══ S6 — MOBILITATE & INFRASTRUCTURĂ (06:30–08:00) — 90s ════════════
        {
          id:'s6_mobilitate', title:'6 · MOBILITATE & INFRASTRUCTURĂ',
          duration:90000,
          camera:{ center:[cx,cy], zoom:12.8, pitch:48, bearing:0, duration:5500 },
          cameraChain:[
            { center:[cx+0.005,cy-0.003], zoom:13.2, pitch:52, bearing:-20, delay:15000, duration:6500 },
            { center:[cx-0.003,cy+0.004], zoom:13.5, pitch:55, bearing:20,  delay:31000, duration:6500 },
            { center:[cx+0.008,cy+0.002], zoom:14.0, pitch:58, bearing:-10, delay:47000, duration:6500 },
            { center:[cx-0.006,cy-0.004], zoom:13.8, pitch:56, bearing:15,  delay:63000, duration:6500 },
            { center:[cx,cy],             zoom:13.0, pitch:50, bearing:0,   delay:78000, duration:7000 },
          ],
          narrative:{
            title:'🚊 Coridoare de Mobilitate — ' + cityName,
            body:'Trafic 2050: Aglomerat 38% · Moderat 41% · Fluid 21%. Drumuri noi: 23 km · Transport public +62% capacitate · Piste biciclete +48 km · Park & Ride: 7 noi locații. Investiție PNRR: €640M.',
            src:'PMUD · PNRR Mobilitate Axa 10 · Eurostat Modal Split · DRDP'
          },
          overlay:'s6_mobilitate', light:'night',
        },

        // ══ S7 — FOCUS ZONA COPOU (08:00–09:35) — 95s ═══════════════════════
        {
          id:'s7_copou', title:'7 · FOCUS — ZONA COPOU',
          duration:95000,
          camera:{ center:[cx+0.008,cy+0.012], zoom:14.8, pitch:65, bearing:-20, duration:6000 },
          cameraChain:[
            { center:[cx+0.010,cy+0.013], zoom:15.5, pitch:70, bearing:15,  delay:16000, duration:7000 },
            { center:[cx+0.007,cy+0.014], zoom:16.0, pitch:73, bearing:-30, delay:33000, duration:7000 },
            { center:[cx+0.011,cy+0.011], zoom:16.5, pitch:75, bearing:25,  delay:51000, duration:7000 },
            { center:[cx+0.009,cy+0.013], zoom:17.0, pitch:76, bearing:-10, delay:69000, duration:7000 },
            { center:[cx+0.008,cy+0.012], zoom:15.5, pitch:68, bearing:0,   delay:84000, duration:8000 },
          ],
          narrative:{
            title:'🏗 Zoom în Copou — Densificare Controlată',
            body:'Densificare +28% · Clădiri noi în armonie cu patrimoniul · Spații verzi păstrate · Echilibru urban. Locuințe noi: 12.400 · Populație 2050: 45.800. Vile interbelice clasate LMI: 47 imobile. CUT: 0.8–1.2.',
            src:'PUG Copou · ANCPI · INS · MDLPA LMI · Model UTR'
          },
          overlay:'s7_copou_data', light:'dusk',
        },

        // ══ S8 — STREET LEVEL — VIAȚA ORAȘULUI (09:35–11:05) — 90s ══════════
        {
          id:'s8_street', title:'8 · STREET LEVEL — VIAȚA ORAȘULUI',
          duration:90000,
          camera:{ center:[cx+0.002,cy+0.001], zoom:16.5, pitch:74, bearing:5, duration:6000 },
          cameraChain:[
            { center:[cx+0.003,cy+0.001], zoom:17.0, pitch:78, bearing:35,  delay:15000, duration:7000 },
            { center:[cx+0.002,cy+0.003], zoom:17.3, pitch:79, bearing:-25, delay:32000, duration:7000 },
            { center:[cx+0.004,cy+0.002], zoom:17.5, pitch:76, bearing:50,  delay:50000, duration:7000 },
            { center:[cx+0.001,cy+0.002], zoom:17.0, pitch:78, bearing:-40, delay:68000, duration:7000 },
            { center:[cx+0.002,cy+0.001], zoom:16.5, pitch:74, bearing:0,   delay:82000, duration:7000 },
          ],
          narrative:{
            title:'🚶 Vedem Orașul Prin Ochii unui Pieton',
            body:'Pietoni/oră: 1.240 · Vehicule/oră: 860 · Calitate aer: BUNĂ. Zonă pietonală · Transport verde · Spații verzi accesibile · Siguranță urbană. Trafic pedestrian +18%/an față de 2021.',
            src:'PMUD · ANM Calitate Aer · OMS WalkScore · Eurostat Urban Mobility'
          },
          overlay:'s8_street_life', light:'dusk',
        },

        // ══ S9 — RISCURI & CLIMĂ (11:05–12:20) — 75s ════════════════════════
        {
          id:'s9_riscuri', title:'9 · RISCURI & CLIMĂ',
          duration:75000,
          camera:{ center:[cx,cy], zoom:12.5, pitch:46, bearing:5, duration:5500 },
          cameraChain:[
            { center:[cx+0.006,cy-0.004], zoom:13.0, pitch:50, bearing:-20, delay:13000, duration:6500 },
            { center:[cx-0.008,cy+0.004], zoom:13.3, pitch:53, bearing:15,  delay:27000, duration:6500 },
            { center:[cx+0.004,cy+0.006], zoom:13.5, pitch:55, bearing:-10, delay:42000, duration:6500 },
            { center:[cx,cy],             zoom:12.8, pitch:48, bearing:0,   delay:57000, duration:7000 },
            { center:[cx,cy],             zoom:13.0, pitch:50, bearing:10,  delay:67000, duration:6000 },
          ],
          narrative:{
            title:'⚠ Hărți de Risc — Pregătim Orașul pentru Viitor',
            body:'Inundații: RISC MEDIU (340 ha) · Caniculă: RISC RIDICAT (+22 zile/an 2050) · Alunecări: RISC SCĂZUT · Poluare aer: RISC MEDIU (PM2.5 18μg/m³). Scor risc compozit: 42/100. Plan adaptare: €42M.',
            src:'INFP P100-1/2013 · ANAR · IPCC AR6 RCP8.5 · ANM · INHGA'
          },
          overlay:'s9_riscuri', light:'night', nightMode:true,
        },

        // ══ S10 — COMPARAȚIE IAȘI VS CLUJ (12:20–13:40) — 80s ═══════════════
        {
          id:'s10_comparatie', title:'10 · COMPARAȚIE — IAȘI VS CLUJ',
          duration:80000,
          camera:{ center:[cx,cy], zoom:12.3, pitch:44, bearing:-10, duration:5500 },
          cameraChain:[
            { center:[cx+0.004,cy-0.003], zoom:12.8, pitch:48, bearing:20,  delay:14000, duration:6500 },
            { center:[cx-0.004,cy+0.003], zoom:13.2, pitch:52, bearing:-20, delay:29000, duration:6500 },
            { center:[cx+0.002,cy+0.003], zoom:13.5, pitch:55, bearing:10,  delay:44000, duration:6500 },
            { center:[cx,cy],             zoom:12.5, pitch:46, bearing:-5,  delay:59000, duration:7000 },
            { center:[cx,cy],             zoom:13.0, pitch:50, bearing:15,  delay:71000, duration:7000 },
          ],
          narrative:{
            title:'⚖ ' + cityName + ' vs Cluj-Napoca — Unde Suntem, Unde Mergem',
            body:cityName + ': Populație 2050: 434K · Densitate: 102 loc/ha · Investiții: 2,8 MLD € · Trafic: +38% · Calitate vieții: 7,8/10. Cluj: 564K · 156 loc/ha · 3,6 MLD € · +52% · 8,2/10. Decalaj recuperabil în 10 ani.',
            src:'Eurostat Urban Audit 2021 · INS · BNR · Colliers Romania · EIU'
          },
          overlay:'s10_comparatie', light:'dusk',
        },

        // ══ S11 — TIME MACHINE 2025→2050 (13:40–15:15) — 95s ════════════════
        {
          id:'s11_timemachine', title:'11 · TIME MACHINE — 2025 → 2050',
          duration:95000,
          camera:{ center:[cx,cy], zoom:13.2, pitch:52, bearing:0, duration:5500 },
          cameraChain:[
            { center:[cx+0.005,cy+0.003], zoom:13.8, pitch:56, bearing:60,  delay:16000, duration:8000 },
            { center:[cx-0.004,cy-0.003], zoom:14.2, pitch:60, bearing:120, delay:33000, duration:8000 },
            { center:[cx+0.003,cy-0.004], zoom:14.5, pitch:62, bearing:180, delay:50000, duration:8000 },
            { center:[cx-0.003,cy+0.004], zoom:14.2, pitch:60, bearing:240, delay:67000, duration:8000 },
            { center:[cx,cy],             zoom:13.5, pitch:55, bearing:300, delay:80000, duration:8000 },
          ],
          narrative:{
            title:'⏱ Time Machine — Călătorim în Timp · 2025 → 2050',
            body:'Vedem transformarea orașului în timp real, cadru cu cadru. Clădiri noi apar, rețeaua TP se extinde, densitatea crește, spațiile verzi se extind. ' + cityName + ' 2025 → ' + cityName + ' 2050.',
            src:'INSE · ANCPI · IPCC AR6 · Model proiecție TSS·FG'
          },
          overlay:'s11_timemachine', light:'dusk',
          animateYear:true, yearFrom:2025, yearTo:2050,
        },

        // ══ S12 — CONCLUZIE & VIZIUNE (15:15–16:15) — 60s ═══════════════════
        {
          id:'s12_concluzie', title:'12 · CONCLUZIE & VIZIUNE',
          duration:60000,
          camera:{ center:[cx,cy], zoom:11.8, pitch:40, bearing:-20, duration:5000 },
          cameraChain:[
            { center:[cx,cy], zoom:12.5, pitch:48, bearing:30,  delay:12000, duration:6500 },
            { center:[cx,cy], zoom:13.2, pitch:55, bearing:-20, delay:26000, duration:6500 },
            { center:[cx,cy], zoom:14.0, pitch:60, bearing:20,  delay:40000, duration:7000 },
            { center:[cx,cy], zoom:12.0, pitch:42, bearing:0,   delay:52000, duration:7000 },
          ],
          narrative:{
            title:'🌟 ' + cityName + ' 2050 — Oraș Inteligent, Sustenabil, Conectat',
            body:'Viziunea TCI: un oraș mai bun pentru oameni, susținut de date, știință și tehnologie. Dezvoltare echilibrată · Mobilitate sustenabilă · Infrastructură modernă · Mediu curat · Calitate a vieții ridicată. Standard urbanistic european.',
            src:'UrbanX TSS·FG © — INS · Eurostat · ANCPI · BNR · IPCC AR6 · OMS'
          },
          overlay:'s12_concluzie', light:'dusk', isMilestone:true,
        },

      ]; // end return scenes array
    },
    // ── Init: porneste filmul ───────────────────────────────────────────────
    init(tciRef) {
      this._tci = tciRef;
      this._active = false;
      this._sceneIdx = -1;
      clearTimeout(this._sceneTimer);
    },

    play() {
      const T = this._tci;
      if(!T) return;
      const d  = T.cityData;
      const cx = T.activeParcel?.lon || d?.lon || 27.601;
      const cy = T.activeParcel?.lat || d?.lat || 47.158;
      this._scenes = this._buildScenes(cx, cy, d?.name||'UAT', d?.pop2021||100000, T.year||2025);
      this._cx = cx; this._cy = cy;
      this._active = true;
      this._sceneIdx = -1;
      this._advanceScene();
      console.log('[TCI Director] Film pornit — ' + this._scenes.length + ' scene');
    },

    stop() {
      this._active = false;
      clearTimeout(this._sceneTimer);
      clearTimeout(this._chainTimer);
    },

    _advanceScene() {
      if(!this._active) return;
      this._sceneIdx++;
      if(this._sceneIdx >= this._scenes.length) {
        // Film terminat — trecem la storyteller loop normal
        this._active = false;
        console.log('[TCI Director] Film complet — predau catre Storyteller');
        return;
      }
      this._playScene(this._scenes[this._sceneIdx]);
    },

    _playScene(scene) {
      if(!this._active) return;
      const T = this._tci;
      const m = T?.map;
      if(!m) return;

      console.log('[TCI Director] Scena ' + (this._sceneIdx+1) + '/' + this._scenes.length + ': ' + scene.id);
      this._sceneStartTime = Date.now();

      // 1. CINEMATIC SPLINE CAMERA — pluteste continuu, fara sarituri
      if(T._CC) {
        T._CC.stop();
        const path = T._CC.fromScene(scene, this._cx, this._cy);
        T._CC.play(path, scene.duration * 0.85);  // spline acopera 85% din durata scenei
        T.bearing = scene.camera.bearing;
      } else {
        // Fallback flyTo daca _CC nu e disponibil
        try {
          m.flyTo({ center:scene.camera.center, zoom:scene.camera.zoom, pitch:scene.camera.pitch, bearing:scene.camera.bearing, duration:scene.camera.duration, essential:true });
          T.bearing = scene.camera.bearing;
        } catch(e) {}
      }

      // 2. Night mode + overlay + LIGHTING PRESET per scena
      this._currentOverlay = scene.overlay;
      this._nightMode      = !!scene.nightMode;

      // Mapbox Standard lighting preset adaptat la scena
      const lightPresets = {
        intro_europe: 'day', zoom_region: 'day', city_approach: 'dusk',
        city_3d_reveal: 'dusk', statistics_card: 'dusk', neighborhoods_map: 'dawn',
        metro_orbit: 'day', demography_context: 'day',
        act1_centru_approach: 'dusk', act1_centru_street: 'dusk',
        act1_rezidential_nord: 'dawn', act1_nord_street: 'dawn',
        act1_comercial: 'day', act1_industrial: 'day',
        act1_green: 'day', act1_density: 'day', act1_risk_baseline: 'night',
        act2_baseline_2025: 'dusk', act2_early_growth: 'day',
        act2_milestone_2030: 'dusk', act2_acceleration: 'day',
        act2_milestone_2035: 'dusk', act2_construction_wave: 'day',
        act2_before_after: 'day', act2_milestone_2040: 'dusk',
        act3_traffic_now: 'night', act3_congestion: 'night',
        act3_tp_now: 'dusk', act3_tp_future: 'day',
        act3_modal_split: 'day', act3_pedestrian: 'dusk',
        act4_seismic: 'night', act4_flood: 'night', act4_climate: 'day',
        act4_heat_island: 'day', act4_green_response: 'dawn',
        act5_ro_eu: 'dusk', act5_vs_cluj: 'dusk', act5_vs_vilnius: 'dusk',
        act5_vs_central: 'dusk', act5_summary: 'dusk',
        act6_2045: 'dusk', act6_2050_full: 'dusk', act6_smart_kpis: 'night',
        act6_sustainable: 'dawn', act6_final_orbit: 'night', act6_conclusion: 'dusk',
      };
      const lp = lightPresets[scene.id] || (scene.nightMode ? 'night' : 'dusk');
      T._setLightPreset(lp);

      // 3. Narrative card (instant, fara delay)
      if(T) T._updateNarrativeForZone({
        name:    scene.title,
        narText: () => scene.narrative.body,
        narSrc:  scene.narrative.src,
      }, T.year || 2025, 'director');
      setTimeout(() => {
        const titleEl = document.getElementById('tci-narcard-title');
        if(titleEl) titleEl.textContent = scene.narrative.title;
      }, 80);

      // 4. AI Narrator — Claude API genereaza naratie + TTS o vorbeste
      if(T._AIDirector?._enabled) {
        // Delay mic ca sa nu suprapuna cu tranzitia
        setTimeout(() => {
          T._AIDirector.narrateScene(scene, T.cityData, T.year || 2025);
        }, 600);
      }

      // 5. Year animation (scene cu animateYear:true)
      if(scene.animateYear && T) {
        T._directorYearAnim = true;
        const startY = scene.yearFrom || T.startYear || 2025;
        const endY   = scene.yearTo   || 2050;
        const totalSteps = endY - startY;
        const step   = Math.max(300, (scene.duration - 2000) / Math.max(1, totalSteps));
        let y = startY;
        const tick = () => {
          if(!this._active || !T._directorYearAnim) return;
          if(y <= endY) {
            T._onYearChange(y);
            const sl = document.getElementById('tci-scrub');
            if(sl) sl.value = y;
            y++;
            setTimeout(tick, step);
          }
        };
        setTimeout(tick, 1200);
      } else if(T) {
        T._directorYearAnim = false;
      }

      // 6. Trece la scena urmatoare dupa duration
      this._sceneTimer = setTimeout(() => this._advanceScene(), scene.duration);
    },

    // Overlay type curent (citit de _draw2D_hud)
    _currentOverlay: null,
    _nightMode: false,
    _cx: 27.601,
    _cy: 47.158,
    _scenes: [],
  },

  // ── Director init in launch ───────────────────────────────────────────────
  _directorInit() {
    this.Director.init(this);
  },

  // ── Enhanced Canvas: viata urbana animata ────────────────────────────────
  // Masini, pietoni, pulse urban, efecte atmosferice
  _lifeParticles: [],
  _lifePulse: [],
  _lifeInit: false,
  _lifeFrame: 0,

  _initCityLife(cx, cy) {
    this._lifeParticles = [];
    this._lifePulse = [];
    this._lifeFrame = 0;

    // Generăm "vehicule" pe rute simulate în jurul centrului
    const routes = [
      { ax:cx-0.02, ay:cy,       bx:cx+0.02, by:cy,       w:2.5 },  // E-V principal
      { ax:cx,      ay:cy-0.018, bx:cx,      by:cy+0.018, w:2   },  // N-S principal
      { ax:cx-0.01, ay:cy+0.01,  bx:cx+0.015, by:cy-0.012, w:1.5 }, // diagonal
      { ax:cx+0.008, ay:cy-0.015, bx:cx-0.012, by:cy+0.015, w:1.5 },
      { ax:cx-0.018, ay:cy-0.01, bx:cx+0.018, by:cy+0.01, w:1 },
    ];

    const rng = (s) => { let x=Math.sin(s+1)*43758.5453; return x-Math.floor(x); };
    routes.forEach((rt, ri) => {
      const n = Math.round(18 + rng(ri*7)*20);
      for(let i=0; i<n; i++) {
        const t = rng(ri*100+i);
        this._lifeParticles.push({
          route: ri,
          ax: rt.ax, ay: rt.ay, bx: rt.bx, by: rt.by,
          t, speed: (0.0008 + rng(i*31+ri)*0.0015) * (rng(i*7)>0.3?1:-1),
          type: i%8===0?'tram' : i%4===0?'bus' : 'car',
          w: rt.w,
        });
      }
    });

    // Zone de puls (activitate urbana)
    this._lifePulse = [
      { lon:cx,        lat:cy,        r:0, maxR:60, alpha:0.7, color:'#D4AF37', phase:0    },
      { lon:cx+0.01,   lat:cy+0.012,  r:0, maxR:40, alpha:0.5, color:'#60a5fa', phase:1.5  },
      { lon:cx-0.012,  lat:cy+0.008,  r:0, maxR:45, alpha:0.4, color:'#22c55e', phase:0.8  },
      { lon:cx+0.015,  lat:cy-0.010,  r:0, maxR:35, alpha:0.45, color:'#f59e0b', phase:2.2 },
    ];

    this._lifeInit = true;
  },

  _drawCityLife(ctx, W, H) {
    if(!this._lifeInit || !this.map) return;
    const m = this.map;
    const now = Date.now() / 1000;
    this._lifeFrame++;

    // ── Pulse rings ───────────────────────────────────────────────────────
    this._lifePulse.forEach(p => {
      const speed = 0.8;
      p.r = ((now * speed + p.phase) % 1) * p.maxR;
      const alpha = (1 - p.r / p.maxR) * p.alpha * 0.6;
      if(alpha < 0.01) return;
      try {
        const pt = m.project([p.lon, p.lat]);
        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.r, 0, Math.PI*2);
        ctx.strokeStyle = p.color + Math.round(alpha*255).toString(16).padStart(2,'0');
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      } catch(e) {}
    });

    // ── Vehicule (masini, autobuze, tramvaie) ─────────────────────────────
    const zoom = m.getZoom?.() || 13;
    if(zoom < 11) return;  // nu desena vehicule la zoom mic

    const alpha = Math.min(1, (zoom - 11) / 3);  // fade in cu zoom
    const isNight = this.Director._nightMode;

    this._lifeParticles.forEach(p => {
      p.t += p.speed;
      if(p.t > 1) p.t -= 1;
      if(p.t < 0) p.t += 1;

      const lon = p.ax + (p.bx - p.ax) * p.t;
      const lat = p.ay + (p.by - p.ay) * p.t;

      try {
        const pt = m.project([lon, lat]);
        if(pt.x < -20 || pt.x > W+20 || pt.y < -20 || pt.y > H+20) return;

        const sz = zoom > 14 ? (p.type==='tram'?7:p.type==='bus'?5:3) : 2;
        ctx.save();
        ctx.globalAlpha = alpha * (isNight ? 0.9 : 0.65);

        if(isNight) {
          // Headlight glow noaptea
          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, sz*4);
          grad.addColorStop(0, p.type==='tram'?'rgba(255,220,100,0.9)':'rgba(255,255,220,0.8)');
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(pt.x-sz*4, pt.y-sz*4, sz*8, sz*8);
        }

        // Body vehicul
        const col = p.type==='tram' ? '#ef4444' : p.type==='bus' ? '#3b82f6' : '#D4AF37';
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, sz, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
      } catch(e) {}
    });
  },

  // ── Draw Director overlay per scena ─────────────────────────────────────
  _drawDirectorOverlay(ctx, W, H) {
    const ov = this.Director._currentOverlay;
    if(!ov) return;
    const now   = Date.now()/1000;
    const age   = (Date.now() - this.Director._sceneStartTime) / 1000;
    const fi    = Math.min(1, age / 1.2);   // fade in
    const cx    = this.Director._cx, cy = this.Director._cy;
    const m     = this.map;
    const city  = this.cityData?.name || 'Iași';
    const pop   = this.cityData?.pop2021 || 360633;
    const yr    = this.year || 2025;

    // Helper — card cu border
    const card = (x,y,w,h,r,bg,border) => {
      ctx.fillStyle = bg||'rgba(4,10,24,0.90)';
      this._rr(ctx,x,y,w,h,r||8); ctx.fill();
      if(border){ ctx.strokeStyle=border; ctx.lineWidth=1; this._rr(ctx,x,y,w,h,r||8); ctx.stroke(); }
    };
    const lbl = (txt,x,y,col,sz,bold) => {
      ctx.fillStyle=col; ctx.font=(bold?'bold ':'')+sz+'px "Space Grotesk",sans-serif';
      ctx.fillText(txt,x,y);
    };

    ctx.save();
    ctx.globalAlpha = fi;
    ctx.textAlign = 'left';

    // ── Act/Scene label — stânga sus, permanent ──────────────────────────
    const scene = this.Director._scenes?.[this.Director._sceneIdx];
    if(scene) {
      const prog = Math.min(1,(Date.now()-this.Director._sceneStartTime)/scene.duration);
      card(192,54,230,30,5);
      lbl(scene.title||'','200',72,'#D4AF37',7,true); // unused, use correct args
      ctx.fillStyle='#D4AF37'; ctx.font='bold 7.5px "Space Grotesk"';
      ctx.fillText(scene.title||'', 200, 66);
      ctx.fillStyle='rgba(212,175,55,0.15)'; ctx.fillRect(192,82,230,2);
      ctx.fillStyle='rgba(212,175,55,0.6)';  ctx.fillRect(192,82,230*prog,2);
    }

    // ════════════════════════════════════════════════════════
    // S1 — INTRO: România card stânga
    // ════════════════════════════════════════════════════════
    if(ov==='s1_ro_overview') {
      const cx2=16, cy2=H*0.28, cW=190, rowH=22;
      const rows=[
        {icon:'👥',l:'POPULAȚIE',v:'19,5M',c:'#60a5fa'},
        {icon:'💰',l:'PIB',v:'347 MLD €',c:'#22c55e'},
        {icon:'🏙',l:'CREȘTERE URBANĂ',v:'+0,84%/an',c:'#D4AF37'},
        {icon:'🌡',l:'TEMPERATURĂ 2050',v:'+1,7°C',c:'#f97316'},
      ];
      card(cx2, cy2, cW, rows.length*rowH+28, 8, 'rgba(4,10,24,0.88)', 'rgba(255,255,255,0.08)');
      ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font='bold 7px "Space Grotesk"';
      ctx.fillText('ROMÂNIA — DATE CHEIE', cx2+12, cy2+15);
      rows.forEach((r,i)=>{
        const ry=cy2+28+i*rowH;
        ctx.fillStyle='rgba(255,255,255,0.55)'; ctx.font='11px "Space Grotesk"';
        ctx.fillText(r.icon, cx2+10, ry+13);
        ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='7px "Space Grotesk"';
        ctx.fillText(r.l, cx2+28, ry+8);
        ctx.fillStyle=r.c; ctx.font='bold 11px "Space Grotesk"';
        ctx.fillText(r.v, cx2+28, ry+20);
      });
    }

    // ════════════════════════════════════════════════════════
    // S2 — MOLDOVA region: trenturi card dreapta
    // ════════════════════════════════════════════════════════
    if(ov==='s2_moldova_region') {
      const cX=W-210, cY=H*0.22, cW=195, rowH=24;
      const rows=[
        {l:'POPULAȚIE',v:'+21,3%',c:'#22c55e'},
        {l:'LOCURI DE MUNCĂ',v:'+28,7%',c:'#60a5fa'},
        {l:'INVESTIȚII',v:'+31,5%',c:'#D4AF37'},
        {l:'RISC CLIMATIC',v:'MEDIU',c:'#f59e0b'},
      ];
      card(cX,cY,cW,rows.length*rowH+30,8,'rgba(4,10,24,0.90)','rgba(212,175,55,0.2)');
      ctx.fillStyle='#D4AF37'; ctx.font='bold 8px "Space Grotesk"';
      ctx.fillText('TENDINȚE 2050', cX+12, cY+18);
      rows.forEach((r,i)=>{
        const ry=cY+30+i*rowH;
        ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='7.5px "Space Grotesk"';
        ctx.fillText(r.l, cX+12, ry+9);
        ctx.fillStyle=r.c; ctx.font='bold 15px "Space Grotesk"';
        ctx.fillText(r.v, cX+12, ry+24);
      });
    }

    // ════════════════════════════════════════════════════════
    // S3 — APPROACH: card stânga + grafic demografic
    // ════════════════════════════════════════════════════════
    if(ov==='s3_approach_data') {
      // Card principal stânga-jos
      const cx2=16, cy2=H-80-145, cW=215, cH=140;
      card(cx2,cy2,cW,cH,8,'rgba(4,10,24,0.92)','rgba(212,175,55,0.25)');
      ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='bold 8px "Space Grotesk"';
      ctx.fillText('POPULAȚIE '+yr, cx2+14, cy2+18);
      ctx.fillStyle='#ffffff'; ctx.font='bold 38px "Space Grotesk"';
      ctx.fillText(pop.toLocaleString(), cx2+14, cy2+60);
      ctx.fillStyle='rgba(255,255,255,0.12)'; ctx.fillRect(cx2+14,cy2+66,cW-28,1);
      ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='bold 8px "Space Grotesk"';
      ctx.fillText('PROIECȚIE 2050', cx2+14, cy2+82);
      ctx.fillStyle='#22c55e'; ctx.font='bold 26px "Space Grotesk"';
      ctx.fillText(Math.round(pop*1.203).toLocaleString(), cx2+14, cy2+110);
      ctx.fillStyle='#22c55e'; ctx.font='bold 13px "Space Grotesk"';
      ctx.fillText('+20,3%', cx2+14, cy2+130);

      // Card investitii + locuinte center
      const cX2=cx2+cW+12, cY2=cy2+20, cW2=175;
      card(cX2,cY2,cW2,55,7,'rgba(4,10,24,0.88)','rgba(96,165,250,0.2)');
      ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='7.5px "Space Grotesk"';
      ctx.fillText('LOCUINȚE NOI PÂNĂ ÎN 2050', cX2+12, cY2+14);
      ctx.fillStyle='#60a5fa'; ctx.font='bold 22px "Space Grotesk"';
      ctx.fillText('12.400', cX2+12, cY2+38);
      card(cX2,cY2+62,cW2,50,7,'rgba(4,10,24,0.88)','rgba(34,197,94,0.2)');
      ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='7.5px "Space Grotesk"';
      ctx.fillText('INVESTIȚII ESTIMATE', cX2+12, cY2+76);
      ctx.fillStyle='#22c55e'; ctx.font='bold 20px "Space Grotesk"';
      ctx.fillText('2,8 MLD €', cX2+12, cY2+98);

      // Grafic evoluție demografică mini
      const gX=cX2,gY=cY2+120,gW=cW2,gH=65;
      card(gX,gY,gW,gH,7,'rgba(4,10,24,0.85)','rgba(255,255,255,0.06)');
      ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='7px "Space Grotesk"';
      ctx.fillText('EVOLUȚIE POPULAȚIE', gX+10, gY+12);
      const pts=[[2021,1],[2025,1.012],[2030,1.04],[2040,1.09],[2050,1.203]];
      ctx.beginPath(); ctx.strokeStyle='rgba(212,175,55,0.8)'; ctx.lineWidth=2;
      pts.forEach(([y,f],i)=>{
        const px=gX+12+(i/(pts.length-1))*(gW-24);
        const py=gY+gH-12-(f-1)/(1.203-1)*(gH-24);
        i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
        ctx.fillStyle=i===pts.length-1?'#22c55e':'rgba(212,175,55,0.5)';
        ctx.beginPath(); ctx.arc(px,py,2.5,0,Math.PI*2); ctx.fill();
        ctx.beginPath();
        pts.forEach(([y2,f2],j)=>{
          const px2=gX+12+(j/(pts.length-1))*(gW-24);
          const py2=gY+gH-12-(f2-1)/(1.203-1)*(gH-24);
          j===0?ctx.moveTo(px2,py2):ctx.lineTo(px2,py2);
        });
      });
      ctx.strokeStyle='rgba(212,175,55,0.75)'; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle='rgba(148,163,184,0.4)'; ctx.font='6.5px "Space Grotesk"';
      ctx.fillText('2021',gX+8,gY+gH-2);
      ctx.textAlign='right'; ctx.fillText('434K',gX+gW-4,gY+18); ctx.textAlign='left';
    }

    // ════════════════════════════════════════════════════════
    // S4 — CITY 3D: labels cartiere + legendă densitate
    // ════════════════════════════════════════════════════════
    if(ov==='s4_city3d_labels') {
      if(m) {
        const zones=[
          {lon:cx+0.009,lat:cy+0.013,l:'COPOU',     c:'#a78bfa'},
          {lon:cx+0.005,lat:cy-0.008,l:'TĂTĂRAȘI',  c:'#60a5fa'},
          {lon:cx-0.002,lat:cy+0.001,l:'CENTRU',    c:'#D4AF37'},
          {lon:cx-0.005,lat:cy-0.011,l:'NICOLINA',  c:'#60a5fa'},
          {lon:cx+0.018,lat:cy-0.005,l:'DACIA',     c:'#94a3b8'},
        ];
        zones.forEach(z=>{
          try {
            const pt=m.project([z.lon,z.lat]);
            if(pt.x<20||pt.x>W-20||pt.y<52||pt.y>H-60) return;
            ctx.font='bold 9px "Space Grotesk"';
            const tw=ctx.measureText(z.l).width;
            card(pt.x-tw/2-8, pt.y-11, tw+16, 18, 3, 'rgba(4,10,24,0.80)');
            ctx.fillStyle=z.c; ctx.textAlign='center';
            ctx.fillText(z.l, pt.x, pt.y+2);
            ctx.fillStyle=z.c+'aa';
            ctx.beginPath(); ctx.arc(pt.x,pt.y+14,2,0,Math.PI*2); ctx.fill();
          } catch(e){}
        });
        ctx.textAlign='left';
      }
      // Legendă densitate dreapta sus
      const ld=[{c:'#ef4444',l:'200+'},{c:'#f97316',l:'150'},{c:'#f59e0b',l:'100'},{c:'#22c55e',l:'50'},{c:'#1d4ed8',l:'0'}];
      const lX=W-90, lY=58;
      card(lX,lY,78,ld.length*16+26,6,'rgba(4,10,24,0.85)','rgba(255,255,255,0.07)');
      ctx.fillStyle='rgba(148,163,184,0.65)'; ctx.font='bold 6.5px "Space Grotesk"'; ctx.textAlign='center';
      ctx.fillText('DENSITATE',lX+39,lY+12); ctx.font='6px "Space Grotesk"';
      ctx.fillText('LOCUITORI / HA',lX+39,lY+22);
      ld.forEach((l,i)=>{
        const ly=lY+28+i*16;
        ctx.fillStyle=l.c; ctx.fillRect(lX+10,ly,12,10);
        ctx.fillStyle='rgba(200,215,235,0.8)'; ctx.font='8px "Space Grotesk"'; ctx.textAlign='left';
        ctx.fillText(l.l,lX+28,ly+9);
      });
      ctx.textAlign='left';
    }

    // ════════════════════════════════════════════════════════
    // S5 — DEZVOLTARE: legendă + timeline
    // ════════════════════════════════════════════════════════
    if(ov==='s5_dezvoltare') {
      // Legendă stânga
      const ld=[{c:'#ef4444',l:'MAJORĂ'},{c:'#f59e0b',l:'MEDIE'},{c:'#22c55e',l:'MICĂ'},{c:'#8b5cf6',l:'STAGNARE'}];
      card(16,H*0.28,135,ld.length*20+30,8);
      ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='bold 7.5px "Space Grotesk"';
      ctx.fillText('DEZVOLTARE 2025–2050',28,H*0.28+16);
      ld.forEach((l,i)=>{
        const ly=H*0.28+28+i*20;
        ctx.fillStyle=l.c; ctx.fillRect(28,ly,12,12);
        ctx.fillStyle='rgba(200,215,235,0.85)'; ctx.font='8.5px "Space Grotesk"';
        ctx.fillText(l.l,46,ly+10);
      });
      // Timeline jos center
      const yrs=[2025,2030,2035,2040,2045,2050];
      const tW=300, tX=W/2-tW/2, tY=H-74;
      card(tX-10,tY-8,tW+20,34,5,'rgba(4,10,24,0.82)');
      const tProg=Math.min(1,(yr-2025)/25);
      ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(tX,tY+8,tW,4);
      ctx.fillStyle='rgba(212,175,55,0.7)';   ctx.fillRect(tX,tY+8,tW*tProg,4);
      yrs.forEach((y,i)=>{
        const px=tX+i*(tW/(yrs.length-1));
        ctx.fillStyle=y===yr?'#D4AF37':'rgba(212,175,55,0.4)';
        ctx.beginPath(); ctx.arc(px,tY+10,y===yr?4:2.5,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=y===yr?'#D4AF37':'rgba(148,163,184,0.45)';
        ctx.font=(y===yr?'bold ':'')+7+'px "Space Grotesk"'; ctx.textAlign='center';
        ctx.fillText(y,px,tY+24);
      });
      ctx.textAlign='left';
    }

    // ════════════════════════════════════════════════════════
    // S6 — MOBILITATE: trafic % + 4 iconuri jos
    // ════════════════════════════════════════════════════════
    if(ov==='s6_mobilitate') {
      // Card trafic dreapta
      const cX=W-185, cY=62, cW=170;
      card(cX,cY,cW,110,8,'rgba(4,10,24,0.92)','rgba(239,68,68,0.25)');
      ctx.fillStyle='#D4AF37'; ctx.font='bold 9px "Space Grotesk"';
      ctx.fillText('TRAFIC 2050', cX+14, cY+18);
      const tr=[{l:'AGLOMERAT',v:'38%',c:'#ef4444'},{l:'MODERAT',v:'41%',c:'#f59e0b'},{l:'FLUID',v:'21%',c:'#22c55e'}];
      tr.forEach((t,i)=>{
        const ty=cY+30+i*26;
        ctx.strokeStyle=t.c; ctx.lineWidth=3;
        ctx.beginPath(); ctx.moveTo(cX+14,ty+8); ctx.lineTo(cX+40,ty+8); ctx.stroke();
        ctx.fillStyle='rgba(148,163,184,0.7)'; ctx.font='8px "Space Grotesk"';
        ctx.fillText(t.l, cX+48, ty+5);
        ctx.fillStyle=t.c; ctx.font='bold 13px "Space Grotesk"';
        ctx.fillText(t.v, cX+48, ty+18);
      });
      // 4 iconuri jos
      const icons=[
        {i:'🛣',l:'DRUMURI NOI',v:'23 km'},
        {i:'🚌',l:'TRANSPORT PUBLIC',v:'+62%'},
        {i:'🚲',l:'PISTE BICICLETE',v:'+48 km'},
        {i:'🅿',l:'PARK & RIDE',v:'7 locații'},
      ];
      const iW=W/4-8, iY=H-74-54;
      icons.forEach((ic,i)=>{
        const iX=i*(iW+4)+4;
        card(iX,iY,iW,48,6,'rgba(4,10,24,0.85)','rgba(255,255,255,0.07)');
        ctx.font='18px "Space Grotesk"'; ctx.textAlign='center';
        ctx.fillText(ic.i, iX+iW/2, iY+22);
        ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font='6px "Space Grotesk"';
        ctx.fillText(ic.l, iX+iW/2, iY+32);
        ctx.fillStyle='#D4AF37'; ctx.font='bold 9px "Space Grotesk"';
        ctx.fillText(ic.v, iX+iW/2, iY+44);
      });
      ctx.textAlign='left';
    }

    // ════════════════════════════════════════════════════════
    // S7 — COPOU: 3 carduri mari dreapta
    // ════════════════════════════════════════════════════════
    if(ov==='s7_copou_data') {
      const densif=Math.round(28+(yr-2025)*0.3);
      const locNoi=Math.round(12400*Math.min(1,(yr-2025)/25));
      const cX=W-182, cY=62, cW=168, sep=8;
      // Card 1 - Densificare
      card(cX,cY,cW,70,8,'rgba(4,10,24,0.92)','rgba(34,197,94,0.3)');
      ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='bold 8px "Space Grotesk"';
      ctx.fillText('DENSIFICARE', cX+14, cY+17);
      ctx.fillStyle='#22c55e'; ctx.font='bold 34px "Space Grotesk"';
      ctx.textAlign='right'; ctx.fillText('+'+densif+'%', cX+cW-14, cY+56);
      // Card 2 - Locuinte noi
      card(cX,cY+70+sep,cW,65,8,'rgba(4,10,24,0.92)','rgba(212,175,55,0.3)');
      ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='bold 8px "Space Grotesk"'; ctx.textAlign='left';
      ctx.fillText('LOCUINȚE NOI', cX+14, cY+70+sep+17);
      ctx.fillStyle='#D4AF37'; ctx.font='bold 28px "Space Grotesk"'; ctx.textAlign='right';
      ctx.fillText(locNoi.toLocaleString(), cX+cW-14, cY+70+sep+52);
      // Card 3 - Populatie 2050
      card(cX,cY+143+sep*2,cW,58,8,'rgba(4,10,24,0.92)','rgba(96,165,250,0.3)');
      ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='bold 8px "Space Grotesk"'; ctx.textAlign='left';
      ctx.fillText('POPULAȚIE 2050', cX+14, cY+143+sep*2+17);
      ctx.fillStyle='#60a5fa'; ctx.font='bold 24px "Space Grotesk"'; ctx.textAlign='right';
      ctx.fillText('45.800', cX+cW-14, cY+143+sep*2+50);
      ctx.textAlign='left';
    }

    // ════════════════════════════════════════════════════════
    // S8 — STREET LEVEL: 3 metrici + 4 iconuri
    // ════════════════════════════════════════════════════════
    if(ov==='s8_street_life') {
      const cX=W-182, cY=62, cW=168;
      card(cX,cY,cW,125,8,'rgba(4,10,24,0.92)','rgba(96,165,250,0.25)');
      const rows=[
        {l:'PIETONI / ORĂ',v:'1.240',c:'#60a5fa'},
        {l:'VEHICULE / ORĂ',v:'860',c:'#f59e0b'},
        {l:'CALITATE AER',v:'BUNĂ 😊',c:'#22c55e'},
      ];
      rows.forEach((r,i)=>{
        const ry=cY+14+i*37;
        ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='7.5px "Space Grotesk"';
        ctx.fillText(r.l, cX+14, ry+10);
        ctx.fillStyle=r.c; ctx.font='bold 18px "Space Grotesk"'; ctx.textAlign='right';
        ctx.fillText(r.v, cX+cW-14, ry+28);
        if(i<rows.length-1){ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fillRect(cX+10,ry+33,cW-20,1);}
        ctx.textAlign='left';
      });
      // 4 iconuri jos
      const icons=[
        {i:'🚶',l:'ZONĂ PIETONALĂ'},{i:'🌿',l:'TRANSPORT VERDE'},
        {i:'🌳',l:'SPAȚII VERZI'},{i:'🛡',l:'SIGURANȚĂ'},
      ];
      const iW2=(W-8)/4-4, iY2=H-74-52;
      icons.forEach((ic,i)=>{
        const iX=i*(iW2+4)+4;
        card(iX,iY2,iW2,46,6,'rgba(4,10,24,0.82)','rgba(96,165,250,0.15)');
        ctx.font='16px "Space Grotesk"'; ctx.textAlign='center';
        ctx.fillText(ic.i, iX+iW2/2, iY2+20);
        ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='6.5px "Space Grotesk"';
        ctx.fillText(ic.l, iX+iW2/2, iY2+38);
      });
      ctx.textAlign='left';
    }

    // ════════════════════════════════════════════════════════
    // S9 — RISCURI: legendă stânga
    // ════════════════════════════════════════════════════════
    if(ov==='s9_riscuri') {
      const risks=[
        {c:'#3b82f6',i:'🌊',l:'INUNDAȚII',  r:'RISC MEDIU',  rc:'#f59e0b'},
        {c:'#ef4444',i:'🌡',l:'CANICULĂ',   r:'RISC RIDICAT',rc:'#ef4444'},
        {c:'#a78bfa',i:'⛰',l:'ALUNECĂRI',  r:'RISC SCĂZUT', rc:'#22c55e'},
        {c:'#94a3b8',i:'💨',l:'POLUARE AER',r:'RISC MEDIU',  rc:'#f59e0b'},
      ];
      const cW=175, rH=44;
      card(16, H*0.3, cW, risks.length*rH+20, 8);
      ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='bold 7.5px "Space Grotesk"';
      ctx.fillText('RISCURI 2050', 28, H*0.3+15);
      risks.forEach((r,i)=>{
        const ry=H*0.3+24+i*rH;
        ctx.font='18px "Space Grotesk"'; ctx.fillText(r.i, 22, ry+22);
        ctx.fillStyle='rgba(200,215,235,0.85)'; ctx.font='bold 8.5px "Space Grotesk"';
        ctx.fillText(r.l, 44, ry+12);
        ctx.fillStyle=r.rc; ctx.font='bold 8px "Space Grotesk"';
        ctx.fillText(r.r, 44, ry+25);
        if(i<risks.length-1){ctx.fillStyle='rgba(255,255,255,0.05)';ctx.fillRect(22,ry+rH-3,cW-20,1);}
      });
    }

    // ════════════════════════════════════════════════════════
    // S10 — COMPARATIE: tabel complet
    // ════════════════════════════════════════════════════════
    if(ov==='s10_comparatie') {
      const cX=W/2-185, cY=H*0.2, cW=370, rowH=24;
      const rows=[
        ['POPULAȚIE 2050','434K','564K'],
        ['DENSITATE (loc/ha)','102','156'],
        ['INVESTIȚII ESTIMATE','2,8 MLD €','3,6 MLD €'],
        ['TRAFIC (indice)','+38%','+52%'],
        ['CALITATE A VIEȚII','7,8 / 10','8,2 / 10'],
      ];
      card(cX,cY,cW,rows.length*rowH+50,10,'rgba(4,10,24,0.93)','rgba(212,175,55,0.2)');
      // Header
      ctx.textAlign='center';
      ctx.fillStyle='rgba(148,163,184,0.4)'; ctx.font='7.5px "Space Grotesk"';
      ctx.fillText('INDICATOR',cX+100,cY+18);
      ctx.fillStyle='#D4AF37'; ctx.font='bold 10px "Space Grotesk"';
      ctx.fillText(city.toUpperCase(),cX+230,cY+18);
      ctx.fillStyle='#60a5fa'; ctx.fillText('CLUJ-NAPOCA',cX+330,cY+18);
      ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(cX+10,cY+24,cW-20,1);
      rows.forEach((r,i)=>{
        const ry=cY+30+i*rowH;
        if(i%2===0){ctx.fillStyle='rgba(255,255,255,0.02)';ctx.fillRect(cX+5,ry,cW-10,rowH);}
        ctx.fillStyle='rgba(148,163,184,0.65)'; ctx.font='8px "Space Grotesk"'; ctx.textAlign='center';
        ctx.fillText(r[0],cX+100,ry+rowH/2+3);
        ctx.fillStyle='#D4AF37'; ctx.font='bold 13px "Space Grotesk"';
        ctx.fillText(r[1],cX+230,ry+rowH/2+5);
        ctx.fillStyle='#60a5fa';
        ctx.fillText(r[2],cX+330,ry+rowH/2+5);
      });
      ctx.textAlign='left';
    }

    // ════════════════════════════════════════════════════════
    // S11 — TIME MACHINE: 2025 | 2050 + play
    // ════════════════════════════════════════════════════════
    if(ov==='s11_timemachine') {
      const a=Math.min(1,age/1.5);
      ctx.save(); ctx.globalAlpha=a;
      // Labels 2025 ASTĂZI / 2050 VIITORUL
      ctx.font=`bold ${Math.round(H*0.13)}px "Space Grotesk"`;
      ctx.textAlign='center';
      ctx.fillStyle='rgba(148,163,184,0.14)'; ctx.fillText('2025',W*0.27,H*0.60);
      ctx.fillStyle='rgba(212,175,55,0.18)';  ctx.fillText('2050',W*0.73,H*0.60);
      ctx.font='bold 13px "Space Grotesk"';
      ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.fillText('ASTĂZI',W*0.27,H*0.67);
      ctx.fillStyle='rgba(212,175,55,0.55)'; ctx.fillText('VIITORUL',W*0.73,H*0.67);
      // Linie split
      const spX=W/2+Math.sin(now*0.15)*10;
      ctx.fillStyle='rgba(255,255,255,0.55)'; ctx.fillRect(spX-1,50,2,H-112);
      // Play button
      const bY=H/2-14;
      ctx.fillStyle='rgba(4,10,24,0.85)';
      ctx.beginPath(); ctx.arc(spX,bY,22,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,0.75)'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(spX,bY,22,0,Math.PI*2); ctx.stroke();
      ctx.fillStyle='rgba(212,175,55,0.92)';
      ctx.beginPath(); ctx.moveTo(spX-8,bY-12); ctx.lineTo(spX-8,bY+12); ctx.lineTo(spX+14,bY); ctx.closePath(); ctx.fill();
      // An curent afisat
      ctx.fillStyle='#D4AF37'; ctx.font='bold 18px "Space Grotesk"';
      ctx.textAlign='center'; ctx.fillText(yr, spX, bY+44);
      ctx.restore(); ctx.textAlign='left';
    }

    // ════════════════════════════════════════════════════════
    // S12 — CONCLUZIE: card viziune
    // ════════════════════════════════════════════════════════
    if(ov==='s12_concluzie') {
      const cX=W-240, cY=H*0.2, cW=222, cH=175;
      card(cX,cY,cW,cH,10,'rgba(4,10,24,0.92)','rgba(212,175,55,0.4)');
      ctx.fillStyle='#D4AF37'; ctx.font='bold 11px "Space Grotesk"'; ctx.textAlign='center';
      ctx.fillText(city.toUpperCase()+' 2050', cX+cW/2, cY+20);
      ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font='8px "Space Grotesk"';
      ctx.fillText('ORAȘ INTELIGENT, SUSTENABIL, CONECTAT', cX+cW/2, cY+34);
      ctx.fillStyle='rgba(255,255,255,0.1)'; ctx.fillRect(cX+16,cY+40,cW-32,1);
      const items=[
        '✅  Dezvoltare echilibrată',
        '✅  Mobilitate sustenabilă',
        '✅  Infrastructură modernă',
        '✅  Mediu curat',
        '✅  Calitate a vieții ridicată',
      ];
      items.forEach((it,i)=>{
        ctx.fillStyle='rgba(200,215,235,0.88)'; ctx.font='9.5px "Space Grotesk"'; ctx.textAlign='left';
        ctx.fillText(it, cX+18, cY+58+i*22);
      });
      // Sursa
      ctx.fillStyle='rgba(100,120,150,0.4)'; ctx.font='6.5px "Space Grotesk"'; ctx.textAlign='center';
      ctx.fillText('Date oficiale: INS · Eurostat · ANCPI · BNR · IPCC', cX+cW/2, cY+cH-8);
      ctx.textAlign='left';
    }

    // ── Progress scenă generic (act label jos stânga) ─────────────────────
    if(scene && (ov==='s5_dezvoltare'||ov==='s11_timemachine')) {
      // year counter afișat la milestones
      const milestoneYrs=[2030,2035,2040,2045,2050];
      if(milestoneYrs.includes(yr)) {
        ctx.save(); ctx.globalAlpha=0.12;
        ctx.font=`bold ${Math.round(H*0.18)}px "Space Grotesk"`;
        ctx.textAlign='center'; ctx.fillStyle='#D4AF37';
        ctx.fillText(yr, W/2, H*0.62);
        ctx.restore(); ctx.textAlign='left';
      }
    }

    ctx.restore();
  },


  // ══════════════════════════════════════════════════════════════════════════
  // PHASE 3 — WORLD-CLASS URBAN DIGITAL TWIN
  // 1. Cinematic Spline Camera  2. Three.js Urban Life
  // 3. AI Narrator (Claude API + TTS)  4. Video Export
  // ══════════════════════════════════════════════════════════════════════════

  // ── 1. CINEMATIC SPLINE CAMERA ENGINE ─────────────────────────────────────
  // Catmull-Rom interpolation — niciun flyTo, camera pluteste continuu
  _CC: {
    _path:[], _dur:0, _t0:0, _active:false, _cb:null, _tci:null,

    _cr(p0,p1,p2,p3,t) {
      return 0.5*(2*p1+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t*t+(-p0+3*p1-3*p2+p3)*t*t*t);
    },

    _ease(t) {
      // Cinematic: ease-in-out cubic — acceleratie lenta, viteza maxima la mijloc
      return t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
    },

    _sample(tN) {
      const p=this._path; if(!p.length) return null;
      if(tN<=0) return {...p[0]}; if(tN>=1) return {...p[p.length-1]};
      let s=0;
      for(let i=0;i<p.length-1;i++) { if(tN>=p[i].t&&tN<=p[i+1].t){s=i;break;} }
      const i0=Math.max(0,s-1),i1=s,i2=Math.min(p.length-1,s+1),i3=Math.min(p.length-1,s+2);
      const sd=p[i2].t-p[i1].t, loc=sd>0?(tN-p[i1].t)/sd:0;
      const f=k=>this._cr(p[i0][k],p[i1][k],p[i2][k],p[i3][k],loc);
      return {lon:f('lon'),lat:f('lat'),zoom:f('zoom'),pitch:f('pitch'),bearing:f('bearing')};
    },

    play(path,dur,cb) { this._path=path;this._dur=dur;this._t0=performance.now();this._active=true;this._cb=cb||null; },
    stop()            { this._active=false;this._cb=null; },

    tick() {
      if(!this._active||!this._tci?.map) return;
      const raw=Math.min(1,(performance.now()-this._t0)/this._dur);
      const fr=this._sample(this._ease(raw));
      if(!fr) return;
      try { this._tci.map.jumpTo({center:[fr.lon,fr.lat],zoom:fr.zoom,pitch:fr.pitch,bearing:fr.bearing}); } catch(e){}
      if(raw>=1) { this._active=false; this._cb?.(); }
    },

    // Construieste path Catmull-Rom din parametrii scenei Director
    fromScene(scene, cx, cy) {
      const c=scene.camera, ch=scene.cameraChain||[];
      const pts=[
        {lon:cx+(c.center[0]-cx)*0.3, lat:cy+(c.center[1]-cy)*0.3, zoom:c.zoom-2, pitch:Math.max(0,c.pitch-20), bearing:c.bearing-15, t:0},
        {lon:c.center[0],lat:c.center[1],zoom:c.zoom,pitch:c.pitch,bearing:c.bearing, t:ch.length?0.4:0.7},
      ];
      ch.forEach((cc,i)=>{
        const frac=ch.length>0?(i+1)/(ch.length+1):0;
        pts.push({lon:cc.center[0],lat:cc.center[1],zoom:cc.zoom,pitch:cc.pitch,bearing:cc.bearing,t:0.4+frac*0.55});
      });
      const last=ch.length?ch[ch.length-1]:c;
      pts.push({lon:last.center?last.center[0]:c.center[0],lat:last.center?last.center[1]:c.center[1],zoom:(last.zoom||c.zoom)-0.2,pitch:(last.pitch||c.pitch)-2,bearing:(last.bearing||c.bearing)+8,t:1});
      return pts;
    },
  },

  // ── 2. THREE.JS URBAN LIFE LAYER ─────────────────────────────────────────
  // Masini 3D, autobuze, tramvaie, pietoni — instanced meshes pe Mapbox WebGL
  _initThreeJS(cx, cy) {
    const T=this;
    if(T._threeReady) { T._updateThreePositions(); return; }

    const load=(src)=>new Promise((res,rej)=>{
      if(document.querySelector(`script[src="${src}"]`)){res();return;}
      const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);
    });

    load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
      .then(()=>{ if(!window.THREE||!window.mapboxgl) return; T._buildThreeLayer(cx,cy); })
      .catch(e=>console.warn('[THREE] Load failed:',e));
  },

  _buildThreeLayer(cx,cy) {
    const T=this, THREE=window.THREE, map=this.map;
    if(!THREE||!map) return;
    if(map.getLayer?.('tci-three')) map.removeLayer('tci-three');

    const rng=s=>{let x=Math.sin(s+1)*43758.5453;return x-Math.floor(x);};

    // Vehicule: [lon,lat,t,speed,dir,type]
    const routes=[
      {a:[cx-0.022,cy],  b:[cx+0.022,cy],  n:28,type:'car', col:0xD4AF37},
      {a:[cx,cy-0.020],  b:[cx,cy+0.020],  n:24,type:'car', col:0xD4AF37},
      {a:[cx-0.014,cy+0.010],b:[cx+0.016,cy-0.012],n:14,type:'bus',col:0x3b82f6},
      {a:[cx+0.010,cy-0.016],b:[cx-0.012,cy+0.016],n:10,type:'tram',col:0xef4444},
    ];
    const vehicles=[];
    routes.forEach((rt,ri)=>{
      for(let i=0;i<rt.n;i++) vehicles.push({ax:rt.a[0],ay:rt.a[1],bx:rt.b[0],by:rt.b[1],t:rng(ri*100+i),sp:(0.0007+rng(i*31+ri)*0.0008)*(rng(i*7)>0.5?1:-1),type:rt.type,col:rt.col});
    });

    // Pietoni
    const peds=Array.from({length:80},(_, i)=>({
      lon:cx+(rng(i*17)-0.5)*0.010,lat:cy+(rng(i*23)-0.5)*0.010,
      t:rng(i*31)*Math.PI*2,r:0.0002+rng(i*41)*0.0004,sp:0.008+rng(i*53)*0.018,
    }));

    // Santiere / macarale
    const cranes=[
      {lon:cx+0.010,lat:cy+0.012,h:0.00004},{lon:cx+0.007,lat:cy+0.014,h:0.00003},
      {lon:cx+0.013,lat:cy+0.011,h:0.000035},{lon:cx-0.008,lat:cy+0.009,h:0.000025},
    ];

    map.addLayer({
      id:'tci-three', type:'custom', renderingMode:'3d',

      onAdd(map,gl) {
        const scene=new THREE.Scene(), camera=new THREE.Camera();
        scene.add(new THREE.AmbientLight(0xffffff,0.55));
        const sun=new THREE.DirectionalLight(0xffffff,0.9); sun.position.set(1,2,1); scene.add(sun);
        const nightLight=new THREE.PointLight(0xff8800,3,0.02); nightLight.position.set(0,0,0.002); scene.add(nightLight);
        T._3nightLight=nightLight;

        const mc=mapboxgl.MercatorCoordinate.fromLngLat([cx,cy],0);
        const sc=mc.meterInMercatorCoordinateUnits();
        T._3mc=mc; T._3sc=sc;

        // Car mesh — box 4×1.8×1.4m
        const carG=new THREE.BoxGeometry(4*sc,1.8*sc,1.4*sc);
        const busG=new THREE.BoxGeometry(10*sc,2.5*sc,3*sc);
        const tramG=new THREE.BoxGeometry(20*sc,2.8*sc,3.5*sc);
        const pedG=new THREE.CylinderGeometry(0.25*sc,0.25*sc,1.7*sc,8);

        const carsN=vehicles.filter(v=>v.type==='car').length;
        const busN =vehicles.filter(v=>v.type==='bus').length;
        const tramN=vehicles.filter(v=>v.type==='tram').length;

        T._3carMesh =new THREE.InstancedMesh(carG,new THREE.MeshPhongMaterial({color:0xD4AF37,emissive:0x221100}),carsN);
        T._3busMesh =new THREE.InstancedMesh(busG,new THREE.MeshPhongMaterial({color:0x3b82f6,emissive:0x001133}),busN||1);
        T._3tramMesh=new THREE.InstancedMesh(tramG,new THREE.MeshPhongMaterial({color:0xef4444,emissive:0x330000}),tramN||1);
        T._3pedMesh =new THREE.InstancedMesh(pedG,new THREE.MeshPhongMaterial({color:0x60a5fa,emissive:0x001133}),peds.length);

        [T._3carMesh,T._3busMesh,T._3tramMesh,T._3pedMesh].forEach(m=>{m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(m);});

        // Macarale — mast + brat
        cranes.forEach(cr=>{
          const mCoord=mapboxgl.MercatorCoordinate.fromLngLat([cr.lon,cr.lat],0);
          const x=(mCoord.x-mc.x)/sc, y=-(mCoord.y-mc.y)/sc;
          const mastG=new THREE.CylinderGeometry(0.3*sc,0.4*sc,cr.h*2/sc,8);
          const mast=new THREE.Mesh(mastG,new THREE.MeshPhongMaterial({color:0xf8d238,emissive:0x221100}));
          mast.position.set(x,y,cr.h/sc); mast.rotation.x=Math.PI/2;
          const armG=new THREE.BoxGeometry(cr.h*2.5/sc,0.5*sc,0.5*sc);
          const arm=new THREE.Mesh(armG,new THREE.MeshPhongMaterial({color:0xf8d238}));
          arm._isCrane=true; arm._cx=x; arm._cy=y; arm._cz=cr.h*2/sc; arm._phase=cr.lon*100;
          arm.position.set(x,y,cr.h*2/sc);arm.rotation.x=Math.PI/2;
          scene.add(mast);scene.add(arm);
          T._3craneArms=T._3craneArms||[];T._3craneArms.push(arm);
        });

        const renderer=new THREE.WebGLRenderer({canvas:map.getCanvas(),context:gl,antialias:true});
        renderer.autoClear=false;
        T._3scene=scene;T._3cam=camera;T._3rend=renderer;T._3veh=vehicles;T._3peds=peds;
        T._threeReady=true;
        console.log('[THREE] Urban layer: '+vehicles.length+' vehicles, '+peds.length+' pedestrians, '+cranes.length+' cranes');
      },

      render(gl,matrix) {
        if(!T._3scene||!T._threeReady) return;
        const mc=T._3mc,sc=T._3sc,now=Date.now()/1000;
        const isNight=T.Director?._nightMode;
        const zoom=T.map?.getZoom?.()||13;
        const dummy=new THREE.Object3D();

        // Night light toggle
        if(T._3nightLight) T._3nightLight.intensity=isNight?5:0;

        // Emissive glow la noapte
        if(isNight) {
          [T._3carMesh,T._3busMesh,T._3tramMesh].forEach(m=>{
            if(m?.material) m.material.emissiveIntensity=0.85;
          });
        } else {
          [T._3carMesh,T._3busMesh,T._3tramMesh].forEach(m=>{
            if(m?.material) m.material.emissiveIntensity=0.1;
          });
        }

        // Vehicule
        let ci=0,bi=0,ti=0;
        T._3veh.forEach(v=>{
          v.t+=v.sp; if(v.t>1)v.t-=1; if(v.t<0)v.t+=1;
          const lon=v.ax+(v.bx-v.ax)*v.t, lat=v.ay+(v.by-v.ay)*v.t;
          const mC=mapboxgl.MercatorCoordinate.fromLngLat([lon,lat],0);
          const x=(mC.x-mc.x)/sc, z=-(mC.y-mc.y)/sc;
          dummy.position.set(x,z,0); dummy.rotation.x=Math.PI/2;
          const ang=Math.atan2(v.by-v.ay,v.bx-v.ax)*(v.sp>0?1:-1);
          dummy.rotation.z=ang; dummy.updateMatrix();
          if(v.type==='car'&&T._3carMesh)  T._3carMesh.setMatrixAt(ci++,dummy.matrix);
          if(v.type==='bus'&&T._3busMesh)  T._3busMesh.setMatrixAt(bi++,dummy.matrix);
          if(v.type==='tram'&&T._3tramMesh)T._3tramMesh.setMatrixAt(ti++,dummy.matrix);
        });
        if(T._3carMesh)  T._3carMesh.instanceMatrix.needsUpdate=true;
        if(T._3busMesh)  T._3busMesh.instanceMatrix.needsUpdate=true;
        if(T._3tramMesh) T._3tramMesh.instanceMatrix.needsUpdate=true;

        // Pietoni (vizibili de la zoom > 14)
        if(zoom>13.5) {
          T._3peds.forEach((p,i)=>{
            p.t+=p.sp*0.01;
            const lon=p.lon+Math.cos(p.t)*p.r, lat=p.lat+Math.sin(p.t)*p.r*0.7;
            const mC=mapboxgl.MercatorCoordinate.fromLngLat([lon,lat],0);
            const x=(mC.x-mc.x)/sc, z=-(mC.y-mc.y)/sc;
            dummy.position.set(x,z,0.85*sc/sc); dummy.rotation.x=Math.PI/2; dummy.rotation.z=p.t+Math.PI/2; dummy.scale.set(1,1,1); dummy.updateMatrix();
            T._3pedMesh?.setMatrixAt(i,dummy.matrix);
          });
          if(T._3pedMesh) T._3pedMesh.instanceMatrix.needsUpdate=true;
        }

        // Crane arms rotit
        T._3craneArms?.forEach(arm=>{
          const angle=now*0.12+arm._phase;
          arm.position.set(arm._cx+Math.cos(angle)*arm._cz*0.3,arm._cy+Math.sin(angle)*arm._cz*0.3,arm._cz);
          arm.rotation.x=Math.PI/2; arm.rotation.z=angle;
        });

        // Matrix Mapbox → Three.js (folosim T._3cam / T._3rend — scop corect)
        if(!T._3cam || !T._3rend || !T._3scene) { map.triggerRepaint(); return; }
        const rotX=new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1,0,0),Math.PI/2);
        T._3cam.projectionMatrix=new THREE.Matrix4().fromArray(matrix).multiply(rotX);
        T._3rend.resetState();
        T._3rend.render(T._3scene,T._3cam);
        map.triggerRepaint();
      },
    });
  },

  // ── 3. AI DIRECTOR — NARATOR CLAUDE API + WEB SPEECH TTS ─────────────────
  _AIDirector: {
    _enabled: true,
    _speaking: false,
    _tci: null,
    _subtitleEl: null,
    _voices: [],
    _preferredVoice: null,

    init(tci) {
      this._tci = tci;
      // Pre-load voices
      const loadVoices = () => {
        this._voices = window.speechSynthesis?.getVoices() || [];
        this._preferredVoice =
          this._voices.find(v=>v.lang==='ro-RO') ||
          this._voices.find(v=>v.lang.startsWith('ro')) ||
          this._voices.find(v=>v.name.includes('Google')&&v.lang.startsWith('en')) ||
          this._voices[0] || null;
      };
      if(window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
      }
      this._buildSubtitleEl();
    },

    _buildSubtitleEl() {
      if(document.getElementById('tci-subtitle')) return;
      const el=document.createElement('div');
      el.id='tci-subtitle';
      el.style.cssText='position:fixed;bottom:72px;left:50%;transform:translateX(-50%);z-index:3100;max-width:700px;width:calc(100% - 80px);min-height:48px;background:rgba(0,0,0,0.72);backdrop-filter:blur(12px);border-radius:8px;padding:10px 18px;font-family:"Space Grotesk","Inter",sans-serif;font-size:14px;line-height:1.55;color:rgba(255,255,255,0.92);text-align:center;pointer-events:none;display:none;transition:opacity .4s;border:1px solid rgba(212,175,55,0.2);letter-spacing:.01em;';
      document.body.appendChild(el);
      this._subtitleEl=el;
    },

    async narrateScene(scene, cityData, year) {
      if(!this._enabled) return;
      window.speechSynthesis?.cancel();
      this._speaking=false;

      // 1. Genereaza naratie cu Claude API
      let text = scene.narrative.body; // fallback
      try {
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            model:'claude-sonnet-4-20250514',
            max_tokens:120,
            messages:[{
              role:'user',
              content:`Ești naratorul unui documentar urbanistic despre ${cityData?.name||'oraș'}, România.\nScena: "${scene.narrative.title}".\nDate: ${(cityData?.pop2021||0).toLocaleString()} loc., ${year}.\nScrie exact 2 propoziții de narație cinematografică în română.\nStil: documentar BBC despre orașe. Concis, impactant, fără cuvinte tehnice excesive.\nDoar narația, fără altceva.`
            }]
          })
        });
        if(resp.ok) {
          const data=await resp.json();
          const generated=data.content?.find(c=>c.type==='text')?.text?.trim();
          if(generated&&generated.length>20) text=generated;
        }
      } catch(e) { /* fallback to scene.narrative.body */ }

      // 2. Afiseaza subtitlu
      this._showSubtitle(text);

      // 3. Vorbeste via Web Speech API
      this._speak(text);
    },

    _showSubtitle(text) {
      if(!this._subtitleEl) this._buildSubtitleEl();
      const el=this._subtitleEl;
      if(!el) return;
      el.style.opacity='0'; el.style.display='block';
      el.textContent=text;
      setTimeout(()=>{ el.style.opacity='1'; },50);
    },

    _hideSubtitle() {
      const el=this._subtitleEl;
      if(!el) return;
      el.style.opacity='0';
      setTimeout(()=>{ el.style.display='none'; },450);
    },

    _speak(text) {
      if(!window.speechSynthesis||!this._enabled) return;
      window.speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(text);
      u.lang=this._preferredVoice?.lang||'ro-RO';
      u.rate=0.82; u.pitch=0.95; u.volume=0.85;
      if(this._preferredVoice) u.voice=this._preferredVoice;
      u.onstart=()=>{ this._speaking=true; };
      u.onend=()=>{ this._speaking=false; };
      u.onerror=()=>{ this._speaking=false; };
      this._speaking=true;
      window.speechSynthesis.speak(u);
    },

    toggle() {
      this._enabled=!this._enabled;
      const btn=document.getElementById('tci-ai-btn');
      if(btn) btn.textContent=this._enabled?'🎙 Narator ON':'🔇 Narator OFF';
      if(!this._enabled) { window.speechSynthesis?.cancel(); this._hideSubtitle(); }
      return this._enabled;
    },

    stop() {
      window.speechSynthesis?.cancel();
      this._hideSubtitle();
      this._speaking=false;
    },
  },

  // ── 4. VIDEO EXPORTER — MediaRecorder pe canvas Mapbox ───────────────────
  _VideoExporter: {
    _recorder:null, _chunks:[], _recording:false, _startTime:0, _tci:null,

    start(cityName, year) {
      if(this._recording) { console.warn('[Video] Already recording'); return false; }
      const map=this._tci?.map;
      if(!map) return false;
      const canvas=map.getCanvas();
      if(!canvas) return false;

      const mimeTypes=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm','video/mp4'];
      const mime=mimeTypes.find(t=>{ try{return MediaRecorder.isTypeSupported(t);}catch(e){return false;} })||'video/webm';

      try {
        const stream=canvas.captureStream(30);
        this._chunks=[];
        this._recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:12000000});
        this._recorder.ondataavailable=e=>{ if(e.data&&e.data.size>0) this._chunks.push(e.data); };
        this._recorder.start(200);
        this._recording=true;
        this._startTime=Date.now();
        this._filename=`UrbanX-${(cityName||'city').replace(/\s/g,'-')}-${year}.webm`;
        console.log('[Video] Recording started:', mime);

        const btn=document.getElementById('tci-rec-btn');
        if(btn){ btn.textContent='⏹ Stop Film'; btn.style.background='rgba(239,68,68,0.2)'; btn.style.borderColor='rgba(239,68,68,0.5)'; btn.style.color='#ef4444'; }
        return true;
      } catch(e) {
        console.error('[Video] Start failed:', e);
        return false;
      }
    },

    stop() {
      if(!this._recorder||!this._recording) return;
      const fn=this._filename, chunks=this._chunks;
      this._recorder.onstop=()=>{
        const blob=new Blob(chunks,{type:'video/webm'});
        const url=URL.createObjectURL(blob);
        const a=document.createElement('a');
        a.href=url; a.download=fn;
        document.body.appendChild(a); a.click();
        setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },1000);
        const dur=((Date.now()-this._startTime)/1000).toFixed(0);
        console.log('[Video] Film salvat:',fn,(blob.size/1024/1024).toFixed(1)+'MB',dur+'s');
        // Show success
        const btn=document.getElementById('tci-rec-btn');
        if(btn){ btn.textContent='✅ Film salvat!'; setTimeout(()=>{ btn.textContent='⏺ Record Film'; btn.style.background=''; btn.style.borderColor='rgba(255,255,255,0.12)'; btn.style.color='rgba(200,215,235,0.8)'; },4000); }
      };
      this._recorder.stop();
      this._recording=false;
    },

    toggle(cityName, year) {
      if(this._recording) this.stop();
      else this.start(cityName, year);
    },
  },

  // ── Initializeaza toate sistemele Phase 3 ────────────────────────────────
  _initPhase3() {
    const T=this;
    const cx=T.cityData?.lon||27.601, cy=T.cityData?.lat||47.158;

    // Camera spline
    T._CC._tci=T;

    // ── DECK.GL — sistem principal de vizualizare ─────────────────────────
    T._DeckGL._tci=T;
    const initDeck = () => T._DeckGL.init(T);
    if(T.map?.isStyleLoaded?.()&&T.map?.loaded?.()) {
      setTimeout(initDeck, 1000);
    } else {
      T.map?.once('idle', ()=>setTimeout(initDeck,600));
      setTimeout(initDeck, 5000);
    }

    // Three.js layer (fallback vizualizare 3D)
    if(T.map?.isStyleLoaded?.()&&T.map?.loaded?.()) {
      setTimeout(()=>T._initThreeJS(cx,cy), 2000);
    } else {
      T.map?.once('idle',()=>setTimeout(()=>T._initThreeJS(cx,cy),1500));
      setTimeout(()=>T._initThreeJS(cx,cy),6000);
    }

    // AI Director
    T._AIDirector._tci=T;
    T._AIDirector.init(T);

    // Video Exporter
    T._VideoExporter._tci=T;

    // Adauga butoane UI
    T._addPhase3UI();
  },

  _addPhase3UI() {
    const T=this;
    // Evita duplicate
    if(document.getElementById('tci-ai-btn')) return;

    const bar=document.querySelector('#tci-ov [style*="bottom:0"]');
    if(!bar) return;

    // Buton Narator AI
    const aiBtn=document.createElement('button');
    aiBtn.id='tci-ai-btn';
    aiBtn.textContent='🎙 Narator';
    aiBtn.title='Narator AI — generat de Claude API + voce TTS';
    aiBtn.style.cssText='padding:5px 10px;border-radius:6px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.4);color:#a78bfa;font-size:10px;font-weight:600;cursor:pointer;font-family:inherit;pointer-events:all;white-space:nowrap;';
    aiBtn.onclick=()=>T._AIDirector.toggle();

    // Buton Record Video
    const recBtn=document.createElement('button');
    recBtn.id='tci-rec-btn';
    recBtn.textContent='⏺ Record Film';
    recBtn.title='Exporta filmul ca video .webm';
    recBtn.style.cssText='padding:5px 10px;border-radius:6px;background:transparent;border:1px solid rgba(255,255,255,0.12);color:rgba(200,215,235,0.8);font-size:10px;cursor:pointer;font-family:inherit;pointer-events:all;white-space:nowrap;';
    recBtn.onclick=()=>T._VideoExporter.toggle(T.cityData?.name, T.year);

    bar.style.pointerEvents='all';
    bar.appendChild(aiBtn);
    bar.appendChild(recBtn);
  },


  // ══════════════════════════════════════════════════════════════════════════
  // DECK.GL — GPU-ACCELERATED URBAN VISUALIZATION
  // TripsLayer · HexagonLayer · ArcLayer · ColumnLayer · ScatterplotLayer
  // ══════════════════════════════════════════════════════════════════════════

  _DeckGL: {
    _tci:     null,
    _overlay: null,
    _ready:   false,
    _tick:    0,
    _data:    null,   // pre-computed city data
    _raf:     null,

    // ── 1. Load Deck.gl CDN ─────────────────────────────────────────────
    _load() {
      return new Promise(resolve => {
        // Deja incarcat?
        if(window.deck?.MapboxOverlay) { resolve(true); return; }

        const tryLoad = (url, onFail) => {
          const s = document.createElement('script');
          s.src = url;
          s.onload = () => {
            // Deck.gl v9: verifica ca MapboxOverlay e disponibil
            if(window.deck?.MapboxOverlay) {
              console.log('[DeckGL] ✅ Loaded:', url.split('/')[4]);
              resolve(true);
            } else {
              console.warn('[DeckGL] Bundle incarcat dar MapboxOverlay lipseste');
              onFail?.();
            }
          };
          s.onerror = () => { console.warn('[DeckGL] Failed:', url); onFail?.(); };
          document.head.appendChild(s);
        };

        // v9 — compatibil cu Mapbox GL JS v3
        tryLoad(
          'https://unpkg.com/deck.gl@9.0.14/dist.min.js',
          () => tryLoad(
            'https://cdn.jsdelivr.net/npm/deck.gl@9.0.14/dist.min.js',
            () => { console.error('[DeckGL] Toate CDN-urile au esuat'); resolve(false); }
          )
        );
      });
    },

    // ── 2. Init: genera date + creeaza overlay ──────────────────────────
    async init(tci) {
      this._tci = tci;
      const ok = await this._load();
      if(!ok || !window.deck?.MapboxOverlay) return;

      const map  = tci.map;
      const d    = tci.cityData;
      if(!map) return;

      const cx = d?.lon  || 27.601;
      const cy = d?.lat  || 47.158;
      const pop= d?.pop2021 || 360633;

      // Genereaza toate datele odata
      this._data = this._generateAllData(cx, cy, pop, d);

      // Creeaza overlay — Deck.gl v9 + Mapbox GL JS v3
      const addOverlay = () => {
        if(this._ready) return;
        try {
          this._overlay = new deck.MapboxOverlay({ interleaved:false, layers:[] });
          map.addControl(this._overlay);
          this._ready = true;
          console.log('[DeckGL] ✅ Overlay activ');
          this._startRenderLoop();
        } catch(e) {
          console.error('[DeckGL] Init error:', e.message);
        }
      };
      if(map.isStyleLoaded?.() && map.loaded?.()) {
        addOverlay();
      } else {
        map.once('load', addOverlay);
        map.once('idle', addOverlay);
        setTimeout(addOverlay, 4000);
      }
    },
    },

    // ── 3. Generare date sintetice bazate pe coordonate reale ───────────
    _generateAllData(cx, cy, pop, cityData) {
      const rng = (seed) => {
        let x = Math.sin(seed + 1) * 43758.5453;
        return x - Math.floor(x);
      };

      // ── Puncte populatie pentru HexagonLayer
      const popPoints = [];
      for(let i = 0; i < 6000; i++) {
        const angle = rng(i * 7.3) * Math.PI * 2;
        const r = -Math.log(1 - rng(i * 13.7) * 0.99) * 0.013;
        const jx = (rng(i * 17.1) - 0.5) * 0.003;
        const jy = (rng(i * 19.3) - 0.5) * 0.002;
        popPoints.push({
          position: [cx + Math.cos(angle)*r + jx, cy + Math.sin(angle)*r*0.72 + jy],
          weight:   0.5 + rng(i * 23.1) * 3.5,
        });
      }

      // ── Trips animate (TripsLayer) — rute principale + secundare
      const tripRoutes = [
        { a:[cx-0.025,cy],        b:[cx+0.025,cy],        n:50, type:0, speed:220 },
        { a:[cx,cy-0.022],        b:[cx,cy+0.022],        n:45, type:0, speed:200 },
        { a:[cx-0.018,cy+0.012],  b:[cx+0.020,cy-0.014],  n:30, type:0, speed:240 },
        { a:[cx+0.012,cy+0.010],  b:[cx-0.015,cy-0.010],  n:25, type:0, speed:210 },
        { a:[cx-0.022,cy-0.008],  b:[cx+0.015,cy+0.012],  n:20, type:0, speed:195 },
        { a:[cx-0.020,cy+0.004],  b:[cx+0.022,cy-0.004],  n:12, type:1, speed:160 },  // bus
        { a:[cx-0.024,cy],        b:[cx+0.024,cy],        n:8,  type:2, speed:140 },   // tram
        { a:[cx,cy-0.018],        b:[cx,cy+0.018],        n:6,  type:2, speed:150 },   // tram
      ];
      const trips = [];
      tripRoutes.forEach((rt, ri) => {
        for(let i = 0; i < rt.n; i++) {
          const tOff = rng(ri*200+i) * 1000;
          const dx = rt.b[0]-rt.a[0], dy = rt.b[1]-rt.a[1];
          const steps = 24;
          const path = [], ts = [];
          for(let s = 0; s <= steps; s++) {
            const t = s/steps;
            const lat_jit = Math.sin(t*Math.PI*3)*0.0008*(rng(ri*50+i*3)-0.5);
            path.push([rt.a[0]+dx*t, rt.a[1]+dy*t+lat_jit]);
            ts.push(tOff + s * rt.speed);
          }
          trips.push({ vendor:rt.type, path, timestamps:ts });
        }
      });

      // ── Coloane dezvoltare urbana (ColumnLayer)
      const columns = [];
      for(let i = 0; i < 120; i++) {
        const angle = rng(i*7.7)*Math.PI*2;
        const dist  = 0.002 + rng(i*11.3)*0.020;
        const intens= rng(i*13.9);
        const type  = intens>0.70?0 : intens>0.42?1 : intens>0.18?2 : 3;
        const COLORS = [[239,68,68],[245,158,11],[34,197,94],[139,92,246]];
        columns.push({
          position: [cx+Math.cos(angle)*dist, cy+Math.sin(angle)*dist*0.75],
          baseElevation: intens * 250,
          color: COLORS[type],
          type, intens,
        });
      }

      // ── Arce fluxuri navetism
      const arcOrigins = [
        { pos:[cx-0.032,cy+0.025], w:850 },
        { pos:[cx+0.028,cy+0.018], w:620 },
        { pos:[cx+0.022,cy-0.025], w:540 },
        { pos:[cx-0.015,cy-0.028], w:710 },
        { pos:[cx-0.030,cy-0.012], w:580 },
        { pos:[cx+0.035,cy+0.008], w:490 },
        { pos:[cx-0.028,cy+0.000], w:440 },
      ];
      const arcs = arcOrigins.map((o,i) => ({
        sourcePosition: o.pos,
        targetPosition: [cx, cy],
        sourceColor: [96,165,250, Math.round(100+o.w/8)],
        targetColor: [212,175,55, 220],
        width: 1 + o.w/600,
      }));

      // ── Risc puncte (ScatterplotLayer)
      const riskPts = Array.from({length:300},(_,i)=>({
        position: [cx+(rng(i*7)-0.5)*0.045, cy+(rng(i*13)-0.5)*0.035],
        weight: rng(i*17),
        type: Math.floor(rng(i*23)*4),
      }));

      // ── Orase Romania pentru overview
      const roCities = [
        {name:'Iași',      pos:[cx,cy],            pop,             isHome:true},
        {name:'Cluj',      pos:[23.596,46.769],    pop:324576,      isHome:false},
        {name:'Timișoara', pos:[21.226,45.760],    pop:319279,      isHome:false},
        {name:'Constanța', pos:[28.652,44.176],    pop:303399,      isHome:false},
        {name:'Craiova',   pos:[23.796,44.319],    pop:269506,      isHome:false},
        {name:'Brașov',    pos:[25.611,45.657],    pop:253200,      isHome:false},
        {name:'Galați',    pos:[28.046,45.436],    pop:231204,      isHome:false},
        {name:'Ploiești',  pos:[26.019,44.943],    pop:208235,      isHome:false},
        {name:'Oradea',    pos:[21.921,47.046],    pop:196367,      isHome:false},
        {name:'Bacău',     pos:[26.912,46.567],    pop:144307,      isHome:false},
        {name:'Suceava',   pos:[26.254,47.651],    pop:92121,       isHome:false},
        {name:'Piatra N.', pos:[26.372,46.924],    pop:85055,       isHome:false},
        {name:'Brăila',    pos:[27.969,45.269],    pop:168469,      isHome:false},
        {name:'Arad',      pos:[21.312,46.186],    pop:159074,      isHome:false},
        {name:'Sibiu',     pos:[24.150,45.800],    pop:147245,      isHome:false},
      ];

      // ── Rute TP pentru PathLayer
      const tpRoutes = [
        { path:[[cx-0.024,cy-0.002],[cx-0.010,cy],[cx+0.000,cy],[cx+0.020,cy+0.002]], color:[239,68,68,200], w:4 },
        { path:[[cx+0.002,cy-0.022],[cx+0.001,cy-0.010],[cx,cy],[cx-0.001,cy+0.018]], color:[239,68,68,200], w:4 },
        { path:[[cx-0.020,cy+0.015],[cx-0.005,cy+0.008],[cx+0.010,cy+0.005],[cx+0.022,cy+0.000]], color:[59,130,246,180], w:3 },
        { path:[[cx+0.018,cy-0.018],[cx+0.005,cy-0.010],[cx-0.005,cy+0.000],[cx-0.018,cy+0.012]], color:[59,130,246,180], w:3 },
      ];

      console.log(`[DeckGL] Data generat: ${popPoints.length} pop pts, ${trips.length} trips, ${columns.length} cols, ${arcs.length} arcs`);
      return { popPoints, trips, columns, arcs, riskPts, roCities, tpRoutes };
    },

    // ── 4. Compune layer-ele per scena si an ────────────────────────────
    _getLayers(sceneId, year) {
      if(!window.deck || !this._data) return [];
      const D    = this._data;
      const t    = this._tick;
      const yF   = Math.max(0, Math.min(1, (year-2025)/25));
      const zoom = this._tci?.map?.getZoom?.() || 13;
      const layers= [];

      // ── TRIPS (mașini animate) — vizibile de la zoom 10+ ──────────────
      if(zoom >= 10 && window.deck.TripsLayer) {
        const trailLen = zoom > 14 ? 220 : zoom > 12 ? 160 : 100;
        const colors   = { 0:[212,175,55], 1:[59,130,246], 2:[239,68,68] };
        layers.push(new deck.TripsLayer({
          id: 'trips',
          data: D.trips,
          getPath:       d => d.path,
          getTimestamps: d => d.timestamps,
          getColor:      d => colors[d.vendor] || colors[0],
          opacity:       0.85,
          widthMinPixels: zoom > 14 ? 3 : 2,
          trailLength:   trailLen,
          currentTime:   t % 1200,
          shadowEnabled: false,
        }));
      }

      // ── TP ROUTES (linii permanente) ──────────────────────────────────
      if(zoom >= 11) {
        layers.push(new deck.PathLayer({
          id: 'tp-routes',
          data: D.tpRoutes,
          getPath:  d => d.path,
          getColor: d => d.color,
          getWidth: d => d.w,
          widthUnits: 'pixels',
          rounded: true,
          billboard: false,
          opacity: 0.7,
        }));
      }

      // ── HEXAGON (densitate populatie) — S4, S5, S11 ───────────────────
      const hexScenes = ['s4_city3d_labels','s5_dezvoltare','s11_timemachine','s3_approach_data'];
      if(hexScenes.some(s=>sceneId?.includes(s.split('_')[0]+'_'+s.split('_')[1])) || hexScenes.includes(sceneId)) {
        layers.push(new deck.HexagonLayer({
          id: 'pop-hex',
          data: D.popPoints,
          getPosition:    d => d.position,
          getWeight:      d => d.weight,
          radius:         180,
          elevationScale: 80 + yF * 280,
          extruded:       true,
          pickable:       false,
          colorRange: [
            [29,78,216,200],[59,130,246,210],
            [245,158,11,215],[239,68,68,220],
            [220,38,38,225],[180,20,20,235],
          ],
          coverage: 0.85,
          upperPercentile: 95,
        }));
      }

      // ── COLUMNS (dezvoltare) — S5 ──────────────────────────────────────
      if(sceneId==='s5_dezvoltare' || sceneId==='s11_timemachine') {
        layers.push(new deck.ColumnLayer({
          id: 'dev-cols',
          data: D.columns,
          getPosition:  d => d.position,
          getElevation: d => d.baseElevation * yF * (1 + Math.sin(t*0.03 + d.intens*6)*0.08),
          getFillColor: d => [...d.color, 190],
          getLineColor: d => [...d.color, 255],
          radius:       55,
          extruded:     true,
          diskResolution: 6,
          stroked:      false,
          elevationScale: 1.2,
        }));
      }

      // ── ARCS (navetism / fluxuri) — S2, S3 ────────────────────────────
      if(sceneId==='s2_moldova_region' || sceneId==='s3_approach_data' || sceneId==='s1_ro_overview') {
        layers.push(new deck.ArcLayer({
          id: 'commute-arcs',
          data: D.arcs,
          getSourcePosition: d => d.sourcePosition,
          getTargetPosition: d => d.targetPosition,
          getSourceColor:    d => d.sourceColor,
          getTargetColor:    d => d.targetColor,
          getWidth:          d => d.width,
          widthMinPixels: 1.5,
          greatCircle: false,
          opacity: 0.75,
        }));

        // Orase Romania scatter
        layers.push(new deck.ScatterplotLayer({
          id: 'ro-cities',
          data: D.roCities,
          getPosition:  d => d.pos,
          getRadius:    d => d.isHome ? 4500 : 1500 + d.pop/250,
          getFillColor: d => d.isHome ? [212,175,55,230] : [96,165,250,180],
          getLineColor: [255,255,255,120],
          stroked: true,
          lineWidthMinPixels: 1,
          radiusUnits: 'meters',
          opacity: 0.9,
        }));
      }

      // ── RISK SCATTER — S9 ─────────────────────────────────────────────
      if(sceneId==='s9_riscuri') {
        const riskColors = [
          [59,130,246,160],
          [239,68,68,180],
          [167,139,250,150],
          [148,163,184,130],
        ];
        layers.push(new deck.ScatterplotLayer({
          id: 'risk-pts',
          data: D.riskPts,
          getPosition:  d => d.position,
          getRadius:    d => 120 + d.weight * 350,
          getFillColor: d => riskColors[d.type] || riskColors[0],
          radiusUnits: 'meters',
          opacity: 0.5,
        }));
      }

      // ── PEDESTRIANS scatter — S8 ───────────────────────────────────────
      if(sceneId==='s8_street_life' && zoom >= 15) {
        const cx = this._tci?.cityData?.lon || 27.601;
        const cy = this._tci?.cityData?.lat || 47.158;
        const pedData = this._data._pedCache || (()=>{
          const arr = [];
          const rng = s => { let x=Math.sin(s)*43758.5453; return x-Math.floor(x); };
          for(let i=0;i<200;i++) arr.push({
            position:[cx+(rng(i*7)-0.5)*0.012, cy+(rng(i*13)-0.5)*0.008],
            phase: rng(i*17)*Math.PI*2,
          });
          this._data._pedCache = arr;
          return arr;
        })();
        layers.push(new deck.ScatterplotLayer({
          id: 'pedestrians',
          data: pedData,
          getPosition:  d => [
            d.position[0] + Math.cos(t*0.008+d.phase)*0.00020,
            d.position[1] + Math.sin(t*0.008+d.phase)*0.00015,
          ],
          getRadius:    12,
          getFillColor: [96,165,250,200],
          radiusUnits: 'meters',
          opacity: 0.8,
          updateTriggers: { getPosition: t },
        }));
      }

      return layers;
    },

    // ── 5. Render loop — actualizeaza layerele la fiecare frame ──────────
    _startRenderLoop() {
      let lastScene = null;
      let lastYear  = -1;

      const frame = () => {
        this._tick++;
        this._raf = requestAnimationFrame(frame);
        if(!this._ready || !this._overlay) return;

        const T       = this._tci;
        const sceneId = T?.Director?._scenes?.[T.Director?._sceneIdx]?.id || '';
        const year    = T?.year || 2025;

        // Actualizeaza layers la fiecare frame (trips au nevoie de currentTime)
        try {
          this._overlay.setProps({ layers: this._getLayers(sceneId, year) });
        } catch(e) {}
      };
      requestAnimationFrame(frame);
      console.log('[DeckGL] Render loop pornit');
    },

    destroy() {
      cancelAnimationFrame(this._raf);
      try { this._tci?.map?.removeControl?.(this._overlay); } catch(e) {}
      this._overlay = null;
      this._ready   = false;
    },

}; // end TCI

// ── Entry points ──────────────────────────────────────────────────────────
window.TCI     = TCI;
window.openTCI = (opts) => TCI.open(opts||{});

if(typeof _ProjectionEngine!=='undefined'){
  _ProjectionEngine.open           = ()=>TCI.open({cityKey:_ProjectionEngine.currentCity||'iasi'});
  _ProjectionEngine.startAnimation = ()=>TCI.toggle();
  _ProjectionEngine.stopAnimation  = ()=>{try{TCI.pause();}catch(e){}};
  _ProjectionEngine.close          = ()=>{try{TCI.close();}catch(e){}};
}

// Restore URL la load
// ── URL Restore BULLETPROOF ──────────────────────────────────────────────
(function() {
  const p    = new URLSearchParams(window.location.search);
  const tciP = p.get('tci');
  if(!tciP) return;

  let params, ck, sc, yr, md;
  try {
    params = new URLSearchParams(atob(tciP));
    ck  = params.get('c') || 'iasi';
    sc  = params.get('s') || 'S2';
    yr  = parseInt(params.get('y') || '2026');
    md  = params.get('m') || 'uat';
  } catch(e) { return; }

  // Flag global: blocam selectorul si orice alt TCI open
  window._TCI_URL_RESTORE = { ck, sc, yr, md, done: false };

  // Rezolva SIRUTA → cityKey
  const resolve = (key) => {
    if(typeof _RO_CITIES_DB === 'undefined') return key;
    if(_RO_CITIES_DB[key]) return key;
    const sm = key.match(/(\d{5,6})$/);
    if(sm) {
      const f = Object.entries(_RO_CITIES_DB).find(([k,v]) =>
        String(v.siruta)===sm[1]||String(v.SIRUTA)===sm[1]||String(v.cod_siruta)===sm[1]
      );
      if(f) return f[0];
    }
    const jm = key.match(/RO-([A-Z]{2})-/);
    if(jm) {
      const f = Object.entries(_RO_CITIES_DB).find(([k,v]) =>
        (v.judet||'').slice(0,2).toUpperCase()===jm[1]
      );
      if(f) return f[0];
    }
    // Fallback: gasim orasul dupa orice cheie partiala
    const lk = key.toLowerCase();
    const f2 = Object.entries(_RO_CITIES_DB).find(([k,v]) =>
      k.toLowerCase().includes(lk.slice(-5)) ||
      (v.name||'').toLowerCase().includes(lk.replace(/-/g,' ').slice(-5))
    );
    return f2 ? f2[0] : key;
  };

  const doLaunch = () => {
    if(window._TCI_URL_RESTORE.done) return;
    window._TCI_URL_RESTORE.done = true;

    const resolvedKey = resolve(ck);
    console.log('[TCI URL] Lansez:', resolvedKey, sc, yr, md);

    // Eliminam orice selector deschis
    document.getElementById('tci-sel')?.remove();
    document.getElementById('tci-mode-selector')?.remove();

    try {
      TCI._launch(md, { cityKey: resolvedKey, scenario: sc });
      // Dupa ce harta e gata, mergem la anul din URL
      const scrubWait = setInterval(() => {
        if(TCI.year !== undefined && TCI.running !== undefined) {
          clearInterval(scrubWait);
          setTimeout(() => { try { TCI.scrubTo(yr); } catch(e){} }, 1500);
        }
      }, 300);
    } catch(e) {
      console.warn('[TCI URL] Launch error:', e);
      window._TCI_URL_RESTORE.done = false; // permite retry
    }
  };

  // Retry agresiv: la fiecare 400ms, max 30 incercari (12s)
  let tries = 0;
  const tryLaunch = () => {
    if(window._TCI_URL_RESTORE.done) return;
    tries++;
    const mapOK = window.map && typeof window.map.flyTo === 'function'
                  && (window.map.isStyleLoaded?.() || tries > 10);
    if(mapOK) {
      doLaunch();
    } else if(tries < 30) {
      setTimeout(tryLaunch, 400);
    } else {
      // Forteaza lansare chiar daca harta nu e 100% gata
      console.warn('[TCI URL] Fortez lansarea dupa 12s');
      doLaunch();
    }
  };

  // Pornim imediat si la DOMContentLoaded si la load
  setTimeout(tryLaunch, 800);
  document.addEventListener('DOMContentLoaded', () => setTimeout(tryLaunch, 1200));
  window.addEventListener('load', () => setTimeout(tryLaunch, 600));
})();

// Interceptam openTCI: daca avem URL restore pending, nu aratam selectorul
const _origOpenTCI = window.openTCI;
window.openTCI = (opts) => {
  if(window._TCI_URL_RESTORE && !window._TCI_URL_RESTORE.done) {
    console.log('[TCI] openTCI interceptat - URL restore pending');
    return;
  }
  if(_origOpenTCI) _origOpenTCI(opts);
  else TCI.open(opts||{});
};

console.log('[TCI Cinema] window.map + canvas overlay — UAT ori parcelă, zoom cinematice');

// ── Shim _CityCompare.searchCity2 (compatibilitate 00-globals.js) ──────────
if(typeof window._CityCompare === 'undefined') window._CityCompare = {};
if(typeof window._CityCompare.searchCity2 !== 'function') {
  window._CityCompare.searchCity2 = function(q) { try { TCI._cmpSearch(q); } catch(e){} };
}
if(typeof window._CityCompare.searchCity !== 'function') {
  window._CityCompare.searchCity = function(q) { try { TCI._cmpSearch(q); } catch(e){} };
}

