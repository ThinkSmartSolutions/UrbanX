// ═══════════════════════════════════════════════════════════════════════════
// URBANX — TCI CINEMA v1.0
// Animeaza harta EXISTENTA din platforma (window.map)
// Camera cinematica: overview → zoom zone → strada → detaliu parcela
// Canvas overlay: text, carduri, HUD — pe deasupra hartii reale
// ═══════════════════════════════════════════════════════════════════════════

const TCI = {

  map: null,          // window.map — harta existenta din platforma
  canvas: null,       // canvas overlay 2D (text, carduri)
  ctx: null,
  running: false,
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

      <!-- PANEL DREAPTA -->
      <div style="position:absolute;right:0;top:48px;bottom:62px;width:185px;pointer-events:all;background:rgba(4,10,24,0.85);backdrop-filter:blur(12px);border-left:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10;">
        <div id="tci-right" style="padding:10px;"></div>
      </div>

      <!-- BOTTOM BAR -->
      <div style="position:absolute;bottom:0;left:185px;right:185px;pointer-events:all;background:rgba(4,10,24,0.9);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.15);padding:8px 14px;display:flex;align-items:center;gap:10px;z-index:10;">
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
        <input type="text" id="tci-cmp-inp" placeholder="Al 2-lea UAT..."
          autocomplete="off" oninput="TCI._cmpSearch(this.value)"
          style="width:100%;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:6px 8px;border-radius:6px;font-size:10px;font-family:inherit;box-sizing:border-box;">
        <div id="tci-cmp-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:6px;max-height:100px;overflow-y:auto;display:none;margin-top:3px;"></div>
        <div id="tci-cmp-out" style="display:none;margin-top:6px;"></div>
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
    const d = this.cityData;
    const cx = this.activeParcel?.lon || d?.lon || 27.601;
    const cy = this.activeParcel?.lat || d?.lat || 47.158;

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
      // Zoom in dramatic pe parcela
      m.flyTo({ center:[cx,cy], zoom:13, pitch:0, bearing:0, duration:100 });
      setTimeout(() => {
        m.flyTo({ center:[cx,cy], zoom:16.5, pitch:62, bearing:-15, duration:4000, essential:true });
      }, 200);
    } else {
      // Overview oras → drone
      m.flyTo({ center:[cx,cy], zoom:10.5, pitch:0, bearing:0, duration:100 });
      setTimeout(() => {
        m.flyTo({ center:[cx,cy], zoom:13, pitch:50, bearing:-15, duration:5000, essential:true });
      }, 200);
    }
    this.bearing = -15;
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
  },

  // ── 2D Overlay: intro ────────────────────────────────────────────────────
  _draw2D_intro(t) {
    const ctx=this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    const fi=Math.min(1,t*2.5);
    ctx.fillStyle=`rgba(2,6,15,${1-fi})`;
    ctx.fillRect(0,0,W,H);
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
    ctx.fillRect(185, H-63, (W-370)*(totalT+yearT*(1/Math.max(1,2055-this.startYear))), 2);
    // Watermark
    ctx.save();ctx.globalAlpha=0.45;ctx.textAlign='right';
    ctx.fillStyle='rgba(148,163,184,0.6)';ctx.font='7px "Space Grotesk"';
    ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6 · ANM · INFP · ANAR',W-190,H-70);
    ctx.fillStyle='rgba(212,175,55,0.5)';ctx.font='bold 7px "Space Grotesk"';
    ctx.fillText('UrbanX · Analiză statistică și proiecție · date oficiale publice',W-190,H-61);
    ctx.restore();ctx.textAlign='left';
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
    navigator.clipboard?.writeText(url).then(()=>typeof _Toast!=='undefined'&&_Toast.success('URL copiat!'));
    return url;
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
    const ck=s.get('c'),sc=s.get('s'),yr=parseInt(s.get('y')||'2026'),md=s.get('m')||'uat';
    TCI._launch(md,{cityKey:ck||'iasi',scenario:sc||'S2'});
    setTimeout(()=>TCI.scrubTo(yr),1500);
  }catch(e){}
},1200));

console.log('[TCI Cinema] window.map + canvas overlay — UAT ori parcelă, zoom cinematice');
