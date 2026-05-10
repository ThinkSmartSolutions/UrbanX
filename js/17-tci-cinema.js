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
  _showEUCompare: false,   // toggle comparare EU
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
      alert('Harta nu este inițiată. Reîncărcați pagina și așteptați harta.'); return;
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
        <button onclick="TCI.close()" style="padding:5px 12px;border-radius:5px;border:1px solid rgba(255,255,255,0.12);background:transparent;color:rgba(148,163,184,0.6);font-size:11px;cursor:pointer;font-family:inherit;pointer-events:all;">✕</button>
      </div>

      <!-- PANEL STANG -->
      <div style="position:absolute;left:0;top:48px;bottom:62px;width:185px;pointer-events:all;background:rgba(4,10,24,0.85);backdrop-filter:blur(12px);border-right:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10;">
        <div id="tci-left" style="padding:10px;display:flex;flex-direction:column;gap:8px;"></div>
      </div>

      <!-- PANEL DREAPTA: colapsibil, inchis by default -->
      <div id="tci-rpanel" style="position:absolute;right:0;top:48px;bottom:62px;width:0;pointer-events:all;background:rgba(4,10,24,0.88);backdrop-filter:blur(12px);border-left:1px solid rgba(255,255,255,0.06);overflow:hidden;z-index:10;transition:width .25s ease;">
        <div id="tci-right" style="padding:10px;width:185px;"></div>
      </div>
      <!-- Buton toggle dreapta -->
      <button id="tci-rtoggle" onclick="TCI._toggleRight()" style="position:absolute;right:0;top:50%;transform:translateY(-50%);z-index:11;background:rgba(4,10,24,0.85);border:1px solid rgba(255,255,255,0.1);border-right:none;border-radius:6px 0 0 6px;color:rgba(148,163,184,0.6);padding:8px 5px;font-size:10px;cursor:pointer;writing-mode:vertical-rl;pointer-events:all;transition:right .25s ease;">
        DATE LIVE ▸
      </button>

      <!-- NARRATIVE STRIP -->
      <div id="tci-narrative" style="
        position:absolute;bottom:62px;left:185px;right:0;z-index:9;
        background:rgba(4,10,24,0.82);backdrop-filter:blur(10px);
        border-top:1px solid rgba(212,175,55,0.1);
        padding:6px 16px;pointer-events:none;
        display:flex;align-items:center;gap:10px;min-height:28px;
        transition:opacity .5s ease;
      ">
        <div style="font-size:8px;font-weight:700;color:rgba(212,175,55,0.7);letter-spacing:.1em;flex-shrink:0;">
          ◈ ANALIZĂ
        </div>
        <div id="tci-narrative-text" style="
          font-size:9px;color:rgba(200,215,235,0.82);line-height:1.4;flex:1;
        "></div>
        <div id="tci-narrative-src" style="
          font-size:7px;color:rgba(100,120,150,0.5);flex-shrink:0;font-style:italic;
        "></div>
      </div>

      <!-- BOTTOM BAR -->
      <div style="position:absolute;bottom:0;left:185px;right:0;pointer-events:all;background:rgba(4,10,24,0.9);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.15);padding:8px 14px;display:flex;align-items:center;gap:10px;z-index:10;">
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
      <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:8px">DATE PROIECȚIE LIVE</div>
      <div id="tci-kpis-r"></div>
      <div id="tci-risk-r" style="margin-top:8px;"></div>
      <div style="margin-top:10px;background:rgba(14,26,52,0.6);border-radius:7px;padding:8px;border:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:7.5px;font-weight:700;color:#D4AF37;margin-bottom:5px;">📋 DATE OFICIALE</div>
        <div style="font-size:7px;color:rgba(148,163,184,0.75);line-height:1.8;">
          Demografie: INSE 2021<br>
          Model: Cohort-Survival (Eurostat)<br>
          Construcții: ANCPI 2015-2024<br>
          Clima: IPCC AR6 RCP4.5/8.5<br>
          Riscuri: INFP · ANAR · INHGA<br>
          Economic: BNR · Eurostat
        </div>
        <div style="margin-top:6px;padding-top:5px;border-top:1px solid rgba(255,255,255,0.05);font-size:6.5px;color:rgba(212,175,55,0.6);font-style:italic;line-height:1.5;">
          UrbanX — analiză statistică și proiecție bazată pe date oficiale publice. Nu înlocuiește documentația tehnică certificată.
        </div>
      </div>`;
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

    // ── L2: Clădiri 3D animate (cresc cu densificarea per UTR) ─────────────
    if(!m.getLayer?.('tci-bld-anim')) {
      try {
        m.addLayer({
          id: 'tci-bld-anim',
          type: 'fill-extrusion',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          minzoom: 13,
          paint: {
            'fill-extrusion-color': [
              'interpolate', ['linear'], ['get', 'height'],
              0,  '#0d1f3c',   // joase = albastru inchis
              12, '#16306e',   // medii
              25, '#1e4080',   // inalte
              50, '#2455a0',   // foarte inalte
              100,'#2e6ab8',   // turn
            ],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base':   ['get', 'min_height'],
            'fill-extrusion-opacity': 0.88,
          },
        });
      } catch(e) { console.warn('[TCI-L2] buildings:', e.message); }
    }

    // ── L2: Zone constructie activa (portocaliu pulsant) ──────────────────
    if(!m.getSource?.('tci-constr')) {
      try {
        m.addSource('tci-constr', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] }
        });
        m.addLayer({
          id: 'tci-constr-layer',
          type: 'fill-extrusion',
          source: 'tci-constr',
          paint: {
            'fill-extrusion-color':   '#f59e0b',
            'fill-extrusion-height':  ['get', 'h'],
            'fill-extrusion-base':    0,
            'fill-extrusion-opacity': 0.75,
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
      // UAT: Porneste la nivel oras dar IMEDIAT trece in Drone 3D
      // Prima miscare: panorama rapida de sus
      m.flyTo({ center:[cx,cy], zoom:11, pitch:20, bearing:0, duration:100 });
      // Dupa 800ms: zoom in cinematic cu pitch 55° (se vad cladirile 3D)
      setTimeout(() => {
        m.flyTo({
          center:   [cx, cy],
          zoom:     14.5,
          pitch:    55,
          bearing:  -20,
          duration: 5000,
          essential: true,
        });
      }, 800);
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
    // Prima narativa: explica ce urmeaza sa vada
    setTimeout(() => {
      const txt = document.getElementById('tci-narrative-text');
      const src = document.getElementById('tci-narrative-src');
      const strip = document.getElementById('tci-narrative');
      if(txt) txt.textContent = 'Culorile UTR pe hartă: Albastru=rezidențial · Violet=mixt · Portocaliu=comercial · Verde=spații verzi · Roșu=industrial. Clădirile cresc cu densificarea urbană 2026→2055.';
      if(src) src.textContent = 'PUG+RLU per UAT';
      if(strip) strip.style.opacity='1';
    }, 1000);
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
    if(now - this._narrativeTimer < 4500) return; // Schimba la 4.5s
    this._narrativeTimer = now;

    const d = (typeof _getProjectionData !== 'undefined')
      ? _getProjectionData(year, this.scenario, this.cityKey) : null;
    const pop = d?.demo?.value || 0;
    const baseP = this.cityData?.pop2021 || 100000;
    const rateP = this.cityData?.rata_reala_2011_2021 || 0;

    // Selectam narativa relevanta bazata pe context
    let narrativeKey;
    if(year >= 2045 && d?.climate?.deltaT >= 2) {
      narrativeKey = 'climate_heat';
    } else if(year >= 2030 && totalT > 0.3) {
      const keys = ['densification','traffic_modal','pib_conv','infra_tp','esg_verde'];
      narrativeKey = keys[this._narrativeIndex++ % keys.length];
    } else if(rateP < -0.5) {
      narrativeKey = 'pop_decline';
    } else if(rateP > 0.3) {
      narrativeKey = 'pop_growth';
    } else {
      const keys = ['utr_colors','traffic_modal','risk_seismic','pop_growth'];
      narrativeKey = keys[this._narrativeIndex++ % keys.length];
    }

    const narr = this._NARRATIVES[narrativeKey];
    const textEl = document.getElementById('tci-narrative-text');
    const srcEl  = document.getElementById('tci-narrative-src');
    const stripEl = document.getElementById('tci-narrative');

    if(!textEl || !narr) return;

    // Fade out → update → fade in
    if(stripEl) stripEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = narr.text;
      if(srcEl) srcEl.textContent = narr.src;
      if(stripEl) stripEl.style.opacity = '1';
    }, 400);
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
    this._drawEUComparison(ctx, W, H, this.year, _tT);
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
    panel.style.width = isOpen ? '0' : '185px';
    if(btn) {
      btn.textContent = isOpen ? 'DATE LIVE ▸' : '◂ DATE LIVE';
      btn.style.right = isOpen ? '0' : '185px';
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

  // Orase recomandate per tip UAT romanesc
  _EU_PEERS: {
    capitala:           ['brno','wroclaw','vilnius','graz'],
    municipiu_mare:     ['debrecen','plovdiv','miskolc','brno'],
    municipiu_resedinta:['miskolc','ruse','ostrava','kaunas'],
    municipiu:          ['miskolc','ruse','plovdiv','kaunas'],
    oras:               ['ruse','miskolc','plovdiv','ostrava'],
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

  _rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();},
};

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
window.addEventListener('load',()=>setTimeout(()=>{
  const p=new URLSearchParams(window.location.search);
  const tciP=p.get('tci');
  if(!tciP) return;
  try{
    const s=new URLSearchParams(atob(tciP));
    let ck=s.get('c'), sc=s.get('s'), yr=parseInt(s.get('y')||'2026'), md=s.get('m')||'uat';
    // Verifica daca cityKey exista in DB, altfel cauta by SIRUTA sau name
    if(ck && typeof _RO_CITIES_DB !== 'undefined') {
      if(!_RO_CITIES_DB[ck]) {
        // Cauta dupa SIRUTA in key (format RO-IS-105309 → siruta=105309)
        const sirutaMatch = ck.match(/(\d{5,6})$/);
        if(sirutaMatch) {
          const siruta = sirutaMatch[1];
          const found = Object.entries(_RO_CITIES_DB).find(([k,v])=>
            String(v.siruta)===siruta || String(v.SIRUTA)===siruta
          );
          if(found) ck = found[0];
        }
        // Sau cauta by county code (IS=Iasi, CJ=Cluj etc)
        if(!_RO_CITIES_DB[ck]) {
          const judetMatch = ck.match(/RO-([A-Z]{2})-/);
          if(judetMatch) {
            const judet = judetMatch[1];
            const found = Object.entries(_RO_CITIES_DB).find(([k,v])=>
              v.judet_code===judet || (v.judet||'').slice(0,2).toUpperCase()===judet
            );
            if(found) ck = found[0];
          }
        }
      }
    }
    TCI._launch(md,{cityKey:ck||'iasi',scenario:sc||'S2'});
    setTimeout(()=>TCI.scrubTo(yr),1500);
  }catch(e){console.warn('[TCI] URL restore error:',e);}
},1200));

console.log('[TCI Cinema] window.map + canvas overlay — UAT ori parcelă, zoom cinematice');
