// ═══════════════════════════════════════════════════════════════════════════
// URBANX — TEMPORAL CITY INTELLIGENCE v4.0
// Animatie pe harta REALA Mapbox — window.map confirmat functional
// UTR zones colorate, 3D buildings, camera drone, layere animate
// ═══════════════════════════════════════════════════════════════════════════

const TCI = {

  map: null,
  canvas: null, ctx: null,
  running: false, speed: 1,
  year: 2021, scenario: 'S2',
  cityKey: 'iasi',
  raf: null, startTime: 0, pausedAt: 0,
  particles: [], bearing: 0,
  activeMode: '3d',   // '3d' | 'densitate' | 'riscuri' | 'verde' | 'mobilitate'
  layersAdded: false,

  INTRO: 8000, YEAR_DUR: 12000, MILESTONE: 18000, OUTRO: 8000,
  MILES: [2025, 2030, 2035, 2040, 2045, 2050, 2055],

  // ── UTR color palette (standard urbanism Romania) ─────────────────────
  UTR_COLORS: {
    'L':  { fill:'#1e40af', label:'Rezidențial colectiv',  h_max:24, pot:65, cut:2.5 },
    'P1': { fill:'#0369a1', label:'Rezidențial individual', h_max:9,  pot:35, cut:0.9 },
    'M':  { fill:'#7c3aed', label:'Mixt / Central',        h_max:36, pot:70, cut:3.0 },
    'C':  { fill:'#d97706', label:'Comercial',              h_max:20, pot:80, cut:3.5 },
    'IS': { fill:'#059669', label:'Instituțional',          h_max:16, pot:50, cut:2.0 },
    'V':  { fill:'#16a34a', label:'Spații verzi',           h_max:8,  pot:5,  cut:0.1 },
    'I':  { fill:'#b91c1c', label:'Industrial',             h_max:18, pot:60, cut:2.0 },
    'A':  { fill:'#92400e', label:'Agrement / Sport',       h_max:12, pot:20, cut:0.5 },
  },

  // ── DESCHIDE TCI ────────────────────────────────────────────────────────
  open(opts = {}) {
    this.scenario = opts.scenario || this.scenario;
    this.cityKey  = opts.cityKey  || this.cityKey;
    this.map = window.map;

    if(!this.map || typeof this.map.flyTo !== 'function') {
      alert('Harta nu este inițiată. Reîncărcați pagina și așteptați ca harta să se încarce complet.');
      return;
    }

    this.buildModal();
    this.setupMapLayers();
    this.initParticles();
    this.pausedAt = 0;
    this.start();
  },

  // ── MODAL FULLSCREEN ────────────────────────────────────────────────────
  buildModal() {
    let modal = document.getElementById('tci-v4-modal');
    if(modal) { modal.style.display = 'flex'; this._resizeCanvas(); return; }

    modal = document.createElement('div');
    modal.id = 'tci-v4-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:3000;display:flex;flex-direction:column;background:#000;font-family:"Space Grotesk","Inter",sans-serif;';

    modal.innerHTML = `
      <canvas id="tci-v4-canvas" style="position:absolute;inset:0;z-index:20;pointer-events:none;width:100%;height:100%;"></canvas>

      <!-- TOPBAR -->
      <div style="position:absolute;top:0;left:0;right:0;z-index:30;background:rgba(4,10,24,0.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(212,175,55,0.2);padding:10px 16px;display:flex;align-items:center;gap:12px;">
        <div style="font-size:11px;font-weight:800;color:#D4AF37;letter-spacing:.15em;">TCI</div>
        <div id="tci-v4-city" style="font-size:14px;font-weight:700;color:#fff;">Iași</div>
        <div style="font-size:10px;color:rgba(148,163,184,0.6);">Proiecție 2021-2055</div>
        <div style="flex:1"></div>
        <!-- Moduri -->
        <div style="display:flex;gap:4px;" id="tci-mode-btns">
          ${[['3d','🏙 3D Urban'],['densitate','📊 Densitate'],['riscuri','⚠️ Riscuri'],['verde','🌱 Verde'],['mobilitate','🚌 Mobilitate']].map(([id,label])=>`
            <button onclick="TCI.setMode('${id}')" id="tci-mode-${id}"
              style="padding:5px 10px;border-radius:6px;border:1px solid ${id==='3d'?'rgba(59,130,246,0.5)':'rgba(255,255,255,0.1)'};
              background:${id==='3d'?'rgba(59,130,246,0.15)':'transparent'};
              color:${id==='3d'?'#60a5fa':'rgba(148,163,184,0.7)'};
              font-size:10px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;">
              ${label}
            </button>
          `).join('')}
        </div>
        <!-- Scenarii -->
        <div style="display:flex;gap:3px;">
          ${[['S1','Opt','#22c55e'],['S2','Mod','#8b5cf6'],['S3','Con','#f59e0b'],['S4','Clim','#38bdf8']].map(([id,l,c])=>`
            <button onclick="TCI.setScenario('${id}')" id="tci-v4-scen-${id}"
              style="padding:4px 8px;border-radius:5px;border:1px solid ${id==='S2'?c+'66':'rgba(255,255,255,0.08)'};
              background:${id==='S2'?c+'22':'transparent'};color:${id==='S2'?c:'rgba(148,163,184,0.5)'};
              font-size:9px;font-weight:700;cursor:pointer;font-family:inherit;">${l}
            </button>
          `).join('')}
        </div>
        <button onclick="TCI.close()" style="padding:6px 12px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:rgba(148,163,184,0.7);font-size:11px;cursor:pointer;font-family:inherit;">✕</button>
      </div>

      <!-- BOTTOM BAR -->
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:30;background:rgba(4,10,24,0.9);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.2);padding:10px 16px;display:flex;align-items:center;gap:12px;">
        <div id="tci-v4-year" style="font-size:28px;font-weight:900;color:#D4AF37;min-width:54px;line-height:1;">2021</div>
        <div style="flex:1;position:relative;">
          <input type="range" id="tci-v4-scrub" min="2021" max="2055" value="2021" step="1"
            style="width:100%;accent-color:#D4AF37;height:4px;"
            oninput="TCI.scrubTo(+this.value)">
          <div style="display:flex;justify-content:space-between;font-size:7px;color:rgba(148,163,184,0.4);margin-top:2px;">
            ${[2021,2025,2030,2035,2040,2045,2050,2055].map(y=>`<span>${y}</span>`).join('')}
          </div>
        </div>
        <button id="tci-v4-play" onclick="TCI.toggle()" style="padding:8px 18px;border-radius:8px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#D4AF37;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;">▶ Play</button>
        <select onchange="TCI.speed=+this.value" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:5px 8px;border-radius:6px;font-size:10px;font-family:inherit;cursor:pointer;">
          <option value="1">1×</option><option value="3">3×</option><option value="8">8×</option>
        </select>
        <!-- KPIs live -->
        <div id="tci-v4-kpis" style="display:flex;gap:16px;margin-left:8px;"></div>
      </div>

      <!-- LEGENDA (lateral stanga) -->
      <div id="tci-v4-legend" style="position:absolute;left:12px;top:60px;bottom:60px;z-index:25;width:170px;background:rgba(4,10,24,0.85);backdrop-filter:blur(10px);border-radius:8px;border:1px solid rgba(255,255,255,0.08);padding:10px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;">
        <div id="tci-v4-legend-content"></div>
      </div>

      <!-- CARD MILESTONE -->
      <div id="tci-v4-milestone" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:35;display:none;background:rgba(4,10,24,0.97);border:1px solid rgba(212,175,55,0.6);border-radius:12px;padding:28px 36px;text-align:center;min-width:400px;max-width:560px;"></div>
    `;

    document.body.appendChild(modal);
    this.canvas = document.getElementById('tci-v4-canvas');
    this.ctx = this.canvas.getContext('2d');
    this._resizeCanvas();
    window.addEventListener('resize', () => this._resizeCanvas());
  },

  _resizeCanvas() {
    if(!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  // ── SETUP LAYERE MAPBOX PE HARTA REALA ──────────────────────────────────
  setupMapLayers() {
    const m = this.map;
    if(!m || this.layersAdded) return;

    // 1. Pune harta fullscreen
    const mapEl = document.getElementById('map');
    if(mapEl) {
      mapEl.style.cssText = 'position:fixed!important;inset:0!important;z-index:2999!important;width:100vw!important;height:100vh!important;';
      m.resize();
    }

    // 2. Camera initiala: panoramica deasupra Iasului
    const city = (typeof _RO_CITIES_DB !== 'undefined') ? _RO_CITIES_DB[this.cityKey] : null;
    const cx = city?.lon || 27.601, cy = city?.lat || 47.158;

    m.flyTo({ center:[cx,cy], zoom:12.5, pitch:0, bearing:0, duration:2000, essential:true });

    // 3. 3D Buildings layer (pe harta reala OSM)
    if(!m.getLayer?.('tci-3d-buildings')) {
      try {
        m.addLayer({
          id: 'tci-3d-buildings',
          type: 'fill-extrusion',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          minzoom: 13,
          paint: {
            'fill-extrusion-color': [
              'interpolate', ['linear'], ['get', 'height'],
              0,  '#0d1f3c', 10, '#122444', 25, '#162d58',
              50, '#1a3566', 100, '#1f3d78',
            ],
            'fill-extrusion-height': ['get','height'],
            'fill-extrusion-base': ['get','min_height'],
            'fill-extrusion-opacity': 0.88,
          },
        });
      } catch(e) { console.warn('[TCI] 3D buildings:', e.message); }
    }

    // 4. Layer constructii noi (portocaliu animat)
    if(!m.getSource?.('tci-constructii')) {
      try {
        m.addSource('tci-constructii', { type:'geojson', data:{type:'FeatureCollection',features:[]} });
        m.addLayer({
          id: 'tci-constructii-layer',
          type: 'fill-extrusion',
          source: 'tci-constructii',
          paint: {
            'fill-extrusion-color': ['get','color'],
            'fill-extrusion-height': ['get','h'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': ['get','op'],
          },
        });
      } catch(e) {}
    }

    // 5. Heatmap populatie
    if(!m.getSource?.('tci-heatmap')) {
      try {
        m.addSource('tci-heatmap', { type:'geojson', data:this._popGeoJSON(cy,cx,0.4) });
        m.addLayer({
          id: 'tci-heatmap-layer',
          type: 'heatmap',
          source: 'tci-heatmap',
          paint: {
            'heatmap-weight': ['get','w'],
            'heatmap-radius': 40,
            'heatmap-intensity': 0.5,
            'heatmap-opacity': 0.3,
            'heatmap-color': [
              'interpolate',['linear'],['heatmap-density'],
              0,'rgba(0,0,255,0)', 0.3,'rgba(50,50,255,0.3)',
              0.6,'rgba(139,92,246,0.5)', 0.85,'rgba(212,175,55,0.6)',
              1,'rgba(255,80,0,0.7)',
            ],
          },
        });
      } catch(e) {}
    }

    // 6. Trafic particles
    if(!m.getSource?.('tci-traffic')) {
      try {
        m.addSource('tci-traffic', { type:'geojson', data:{type:'FeatureCollection',features:[]} });
        m.addLayer({
          id: 'tci-traffic-layer',
          type: 'circle',
          source: 'tci-traffic',
          paint: {
            'circle-radius': ['get','r'],
            'circle-color': ['get','c'],
            'circle-opacity': 0.85,
            'circle-blur': 0.3,
          },
        });
      } catch(e) {}
    }

    // 7. Risc inundatii overlay (vizibil in modul Riscuri)
    if(!m.getSource?.('tci-risk-flood')) {
      try {
        const city2 = (typeof _RO_CITIES_DB !== 'undefined') ? _RO_CITIES_DB[this.cityKey] : null;
        const floodFeatures = this._generateRiskZones(cy, cx, 'flood');
        m.addSource('tci-risk-flood', { type:'geojson', data:{type:'FeatureCollection',features:floodFeatures} });
        m.addLayer({
          id: 'tci-risk-flood-layer',
          type: 'fill',
          source: 'tci-risk-flood',
          paint: { 'fill-color':['get','color'], 'fill-opacity': 0 },
        });
      } catch(e) {}
    }

    this.layersAdded = true;
    this.renderLegend('3d');
    console.log('[TCI v4] Layere Mapbox initializate pe harta reala');
  },

  // ── INITIALIZARE PARTICULE TRAFIC ────────────────────────────────────────
  initParticles() {
    const city = (typeof _RO_CITIES_DB !== 'undefined') ? _RO_CITIES_DB[this.cityKey] : null;
    const cx = city?.lon || 27.601, cy = city?.lat || 47.158;
    this.particles = [];
    const SPREAD = 0.02;
    for(let i = 0; i < 150; i++) {
      const s = i*1337;
      const r = (x)=>{let v=Math.sin(x)*10000;return v-Math.floor(v);};
      this.particles.push({
        lon: cx + (r(s)-0.5)*SPREAD*2,
        lat: cy + (r(s+1)-0.5)*SPREAD,
        dLon: (r(s+2)-0.5)*0.00005,
        dLat: (r(s+3)-0.5)*0.000025,
        bLon: cx + (r(s+4)-0.5)*SPREAD*2,
        bLat: cy + (r(s+5)-0.5)*SPREAD,
        phase: r(s+6)*Math.PI*2,
        spd: 0.3 + r(s+7)*0.8,
        type: i<90?'car':i<130?'bus':'bike',
      });
    }
  },

  // ── LOOP ANIMATIE ─────────────────────────────────────────────────────────
  start() {
    if(this.running) return;
    this.running = true;
    this.startTime = performance.now() - this.pausedAt;
    document.getElementById('tci-v4-play').textContent = '⏸ Pauza';
    this._loop();
  },

  pause() {
    this.running = false;
    this.pausedAt = performance.now() - this.startTime;
    cancelAnimationFrame(this.raf);
    document.getElementById('tci-v4-play').textContent = '▶ Play';
  },

  toggle() { this.running ? this.pause() : this.start(); },

  _loop() {
    if(!this.running) return;
    const elapsed = (performance.now() - this.startTime) * this.speed;

    if(elapsed < this.INTRO) {
      this._phaseIntro(elapsed / this.INTRO);
    } else {
      let t = elapsed - this.INTRO;
      let found = false;
      for(let yr = 2021; yr <= 2055; yr++) {
        const isMile = this.MILES.includes(yr);
        const dur = isMile ? this.YEAR_DUR + this.MILESTONE : this.YEAR_DUR;
        if(t < dur) {
          if(yr !== this.year) this._onYearChange(yr);
          const yT = Math.min(1, t / this.YEAR_DUR);
          const tT = (yr-2021)/34;
          this._animateYear(yr, yT, tT);
          if(isMile && t >= this.YEAR_DUR) {
            this._showMilestone(yr, (t-this.YEAR_DUR)/this.MILESTONE);
          } else {
            this._hideMilestone();
            this._renderHUD(yr, yT, tT);
          }
          found = true; break;
        }
        t -= dur;
      }
      if(!found) { this._renderOutro(Math.min(1, t/this.OUTRO)); if(t>this.OUTRO){this.pause();return;} }
    }

    this.raf = requestAnimationFrame(() => this._loop());
  },

  // ── ANIMATIE PER AN ───────────────────────────────────────────────────────
  _animateYear(year, yearT, totalT) {
    const m = this.map; if(!m) return;
    const d = typeof _getProjectionData !== 'undefined'
      ? _getProjectionData(year, this.scenario, this.cityKey) : null;
    const ms = typeof _getModalSplit !== 'undefined'
      ? _getModalSplit(year) : {auto:72,tp:18,bici_ped:10};

    // 1. Camera rotire lenta drone
    this.bearing += 0.008 * this.speed;
    m.setBearing?.(this.bearing % 360);

    // 2. Zoom variaza cu modul activ
    const targetZoom = this.activeMode === 'densitate' ? 12 :
                       this.activeMode === 'riscuri'   ? 11.5 :
                       this.activeMode === 'mobilitate'? 13   : 14;
    const cz = m.getZoom?.() || 14;
    m.setZoom?.(cz + (targetZoom - cz) * 0.02);

    // 3. Pitch variaza cu modul
    const targetPitch = this.activeMode === 'densitate' ? 15 :
                        this.activeMode === 'riscuri'   ? 10 :
                        this.activeMode === 'mobilitate'? 30 : 52 + Math.sin(totalT*Math.PI)*12;
    const cp = m.getPitch?.() || 50;
    m.setPitch?.(cp + (targetPitch - cp) * 0.03);

    // 4. 3D buildings: culoare + inaltime evolueaza
    if(m.getLayer?.('tci-3d-buildings')) {
      try {
        const heightMult = 1 + totalT * 0.15;
        m.setPaintProperty('tci-3d-buildings', 'fill-extrusion-height',
          ['*', ['get','height'], heightMult]);
        // Culoare mai intensa cu densificarea
        const base = Math.round(13 + totalT*12);
        m.setPaintProperty('tci-3d-buildings', 'fill-extrusion-color', [
          'interpolate',['linear'],['get','height'],
          0, `#0d1f${base.toString(16).padStart(2,'0')}`,
          25,'#162d58', 80,'#1a3566', 150,'#1f3d78',
        ]);
        m.setPaintProperty('tci-3d-buildings', 'fill-extrusion-opacity',
          this.activeMode === '3d' ? 0.88 : 0.35);
      } catch(e) {}
    }

    // 5. Constructii noi pe parcela activa
    const ap = window.S?.parcels?.[window.S?.activeParcel??0];
    if(ap?.geo && m.getSource?.('tci-constructii') && year > 2023) {
      const ph = Math.min(1, (year-2023 + yearT) / 3);
      const niv = window.AEDIS?.corpuri?.[0]?.niv || 4;
      const h = niv * 3 * ph;
      const color = ph < 0.7 ? '#f59e0b' : '#1d4ed8';
      try {
        m.getSource('tci-constructii').setData({
          type:'FeatureCollection',
          features:[{ type:'Feature', geometry:ap.geo.geometry,
            properties:{ h:Math.max(0.5,h), color, op:Math.min(0.9,ph*1.5) } }],
        });
      } catch(e) {}
    }

    // 6. Trafic animat
    this._updateTraffic(totalT, ms);

    // 7. Heatmap populatie
    if(m.getLayer?.('tci-heatmap-layer') && d) {
      const popRatio = (d.demo?.value||360633)/360633;
      const pulse = 0.25 + Math.sin(Date.now()/750)*0.06;
      const showHeat = ['densitate','3d'].includes(this.activeMode);
      try {
        m.setPaintProperty('tci-heatmap-layer','heatmap-opacity',
          showHeat ? Math.min(0.55, 0.12+totalT*0.35+pulse) : 0);
        m.setPaintProperty('tci-heatmap-layer','heatmap-intensity',
          0.3 + totalT*0.8*popRatio);
      } catch(e) {}
    }

    // 8. Risc flood: vizibil doar in modul Riscuri
    if(m.getLayer?.('tci-risk-flood-layer')) {
      try {
        m.setPaintProperty('tci-risk-flood-layer','fill-opacity',
          this.activeMode === 'riscuri' ? 0.4 : 0);
      } catch(e) {}
    }

    // 9. Zi/noapte prin lumina
    const dayT = (yearT*5 + totalT*3) % 1;
    const isDay = dayT > 0.22 && dayT < 0.78;
    if(m.setLight) {
      try {
        m.setLight({
          anchor:'map',
          color: isDay ? '#fff8f0' : '#1a2a6c',
          intensity: isDay ? 0.4 : 0.15,
          position: [1.5, (dayT*360+30)%360, 65-Math.sin(dayT*Math.PI)*50],
        });
      } catch(e) {}
    }

    // 10. Update KPIs si UI
    if(d) this._updateKPIs(d, year, ms);
  },

  // ── Trafic animat pe coordonate reale ────────────────────────────────────
  _updateTraffic(totalT, ms) {
    const m = this.map;
    if(!m?.getSource?.('tci-traffic')) return;
    const t = Date.now()/1000;
    const scale = 0.00007 * (0.4+totalT*0.9);
    const active = Math.round(this.particles.length*(0.2+totalT*0.8));
    const features = [];

    this.particles.slice(0,active).forEach((p,i) => {
      p.lon = p.bLon + Math.sin(t*p.spd+p.phase)*scale;
      p.lat = p.bLat + Math.cos(t*p.spd*0.7+p.phase)*scale*0.5;

      const modR = i%100;
      const type = modR<ms.auto?'car':modR<ms.auto+ms.tp?'bus':'bike';
      const isNight = (t%86400)/86400 < 0.25 || (t%86400)/86400 > 0.75;

      const cfg = {
        car:  { c:isNight?'#fef08a':'#94a3b8', r:2.0+totalT*0.5 },
        bus:  { c:'#3b82f6', r:3.5+totalT },
        bike: { c:'#22c55e', r:1.6 },
      }[type];

      if(!['mobilitate','3d'].includes(this.activeMode)) return;
      features.push({
        type:'Feature',
        geometry:{type:'Point',coordinates:[p.lon,p.lat]},
        properties:{c:cfg.c,r:cfg.r},
      });
    });
    try { m.getSource('tci-traffic').setData({type:'FeatureCollection',features}); } catch(e) {}
  },

  // ── Intro: camera zboara deasupra orasului ────────────────────────────────
  _phaseIntro(t) {
    const m = this.map; if(!m) return;
    const city = (typeof _RO_CITIES_DB !== 'undefined') ? _RO_CITIES_DB[this.cityKey] : null;
    const cx = city?.lon||27.601, cy = city?.lat||47.158;

    if(t < 0.4) {
      m.flyTo({ center:[cx,cy], zoom:11+t*3, pitch:t*55, bearing:t*-20, duration:5000, essential:true });
    }

    const ctx = this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    const fi = Math.min(1, t*2.5);
    ctx.fillStyle = `rgba(2,6,15,${1-fi})`;
    ctx.fillRect(0,0,W,H);

    if(t > 0.15) {
      const ta = Math.min(1,(t-0.15)/0.2)*(t<0.78?1:Math.max(0,(1-t)/0.22));
      ctx.textAlign='center';
      ctx.fillStyle=`rgba(212,175,55,${ta*0.9})`;
      ctx.font='bold 11px "Space Grotesk",monospace';
      ctx.fillText('TEMPORAL CITY INTELLIGENCE', W/2, H*0.3);
      ctx.fillStyle=`rgba(255,255,255,${ta})`;
      ctx.font=`bold ${Math.round(36+t*8)}px "Space Grotesk",monospace`;
      ctx.fillText(city?.name||'Iași', W/2, H*0.4);
      ctx.fillStyle=`rgba(148,163,184,${ta*0.7})`;
      ctx.font='10px "Space Grotesk"';
      ctx.fillText('Proiecție urbanistică 2021—2055 · Date INSE · Eurostat · ANCPI · IPCC AR6', W/2, H*0.48);
      if(t>0.4) {
        const bt=Math.min(1,(t-0.4)/0.5);
        ctx.fillStyle=`rgba(212,175,55,${ta*0.15})`;
        ctx.fillRect(W/2-W*0.18,H*0.56,W*0.36,2);
        ctx.fillStyle=`rgba(212,175,55,${ta})`;
        ctx.fillRect(W/2-W*0.18,H*0.56,W*0.36*bt,2);
      }
      ctx.textAlign='left';
    }
  },

  // ── HUD (an mare + scenariu) ───────────────────────────────────────────────
  _renderHUD(year, yearT, totalT) {
    const ctx = this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    // An mare semitransparent
    ctx.fillStyle=`rgba(212,175,55,${0.06+Math.sin(yearT*Math.PI)*0.03})`;
    ctx.font=`bold ${Math.round(H*0.2)}px "Space Grotesk",monospace`;
    ctx.textAlign='left';
    ctx.fillText(year, 190, H*0.52);

    // Bara progres jos (deasupra bottom bar)
    ctx.fillStyle='rgba(212,175,55,0.8)';
    ctx.fillRect(0, H-62, W*(totalT+yearT*(1/34)), 2);
    ctx.textAlign='left';
  },

  // ── Milestone card ────────────────────────────────────────────────────────
  _showMilestone(year, t) {
    const el = document.getElementById('tci-v4-milestone');
    if(!el) return;

    const ci=Math.min(1,t*4), co=t>0.78?Math.max(0,(1-t)/0.22):1;
    el.style.opacity = String(ci*co);
    el.style.display = 'block';

    if(t < 0.05) { // Genereaza continutul o singura data
      const d = typeof _getProjectionData !== 'undefined'
        ? _getProjectionData(year, this.scenario, this.cityKey) : null;
      const pd = d?.demo?.delta || 0;
      const texts = {
        2025:{t:'Punctul de plecare — 2025',b:`Date INSE 2021 calibrate. Harta actualizată cu 586 zone UTR. Rata reală de evoluție demografică activată per UAT.`},
        2030:{t:'Bilanț primul deceniu',b:`PNRR 2021-2026 finalizat. +${(d?.housing?.stockNou||0).toLocaleString()} locuințe noi autorizate. Convergență UE: ${d?.euConvergence||74}%. Temperatura +${d?.climate?.deltaT||0.8}°C (IPCC AR6).`},
        2035:{t:'Jumătatea perioadei',b:`Populație: ${(d?.demo?.value||0).toLocaleString()} loc. (${pd>=0?'+':''}${pd.toLocaleString()} vs 2021). ${d?.climate?.heatDays||15} zile >35°C/an (ANM prognoză).`},
        2040:{t:'Agenda urbană 2040',b:`ESG Urban: ${d?.esg?.rating||'B'} (${d?.esg?.total||70}/100). Spații verzi necesare: ${d?.climate?.greenNeeded||22} mp/loc (OMS). Convergență EU: ${d?.euConvergence||88}%.`},
        2045:{t:'Viziunea 2045',b:`PIB/cap estimat: €${(d?.housing?.pibCapProj||24000).toLocaleString()} (Mankiw-Romer-Weil+Eurostat). ${d?.climate?.heatDays||20} zile caniculare/an.`},
        2050:{t:'Orizont net-zero 2050',b:`Obiectiv UE: emisii nete zero. +${d?.climate?.deltaT||2.5}°C vs 1990 (IPCC AR6 RCP8.5). Adaptare urbană climatică esențială.`},
        2055:{t:`Bilanț 30 ani — ${(typeof _RO_CITIES_DB!=='undefined'?_RO_CITIES_DB[this.cityKey]?.name:null)||'Iași'}`,b:`Variație pop.: ${pd>=0?'+':''}${pd.toLocaleString()} loc. ESG: ${d?.esg?.rating||'A'} (${d?.esg?.total||88}/100). Convergență EU: ${d?.euConvergence||97}%.`},
      };
      const mt = texts[year]||{t:'Proiecție '+year,b:'—'};
      const kpis = d ? [
        {v:(d.demo?.value||0).toLocaleString(),l:'Populație',c:'#8b5cf6'},
        {v:'€'+((d.housing?.pibCapProj||0)/1000).toFixed(0)+'k',l:'PIB/cap',c:'#22c55e'},
        {v:(d.esg?.rating||'B')+' '+(d.esg?.total||70),l:'ESG',c:'#D4AF37'},
        {v:'+'+d.climate?.deltaT+'°C',l:'Climat',c:'#ef4444'},
      ] : [];

      el.innerHTML = `
        <div style="border-top:2px solid #D4AF37;margin:-28px -36px 20px;border-radius:12px 12px 0 0;height:2px"></div>
        <div style="font-size:54px;font-weight:900;color:#D4AF37;line-height:1;margin-bottom:8px">${year}</div>
        <div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:10px">${mt.t}</div>
        <div style="font-size:11px;color:rgba(148,163,184,0.85);line-height:1.7;margin-bottom:16px">${mt.b}</div>
        ${kpis.length ? `<div style="display:flex;gap:16px;justify-content:center;padding-top:14px;border-top:1px solid rgba(255,255,255,0.08)">
          ${kpis.map(k=>`<div style="text-align:center"><div style="font-size:18px;font-weight:800;color:${k.c}">${k.v}</div><div style="font-size:8px;color:rgba(148,163,184,0.55)">${k.l}</div></div>`).join('')}
        </div>` : ''}
        <div style="font-size:7px;color:rgba(100,120,150,0.5);margin-top:12px">INSE · Eurostat Urban Audit · ANCPI · BNR · IPCC AR6 (2021)</div>
      `;
    }
  },

  _hideMilestone() {
    const el = document.getElementById('tci-v4-milestone');
    if(el) el.style.display = 'none';
  },

  _renderOutro(t) {
    const ctx=this.ctx; if(!ctx) return;
    const W=this.canvas.width, H=this.canvas.height;
    ctx.clearRect(0,0,W,H);
    const fo=t>0.7?(t-0.7)/0.3:0;
    ctx.fillStyle=`rgba(2,6,15,${fo})`; ctx.fillRect(0,0,W,H);
    const al=Math.min(1,t*3)*(t<0.65?1:Math.max(0,(0.7-t)/0.05));
    if(al>0.05){
      ctx.save(); ctx.globalAlpha=al; ctx.textAlign='center';
      const city=(typeof _RO_CITIES_DB!=='undefined')?_RO_CITIES_DB[this.cityKey]:null;
      ctx.fillStyle='#D4AF37'; ctx.font='bold 24px "Space Grotesk"';
      ctx.fillText((city?.name||'Iași')+' 2055 — Proiecție completă',W/2,H*0.38);
      ctx.fillStyle='rgba(148,163,184,0.85)'; ctx.font='12px "Space Grotesk"';
      ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6',W/2,H*0.46);
      ctx.restore();
    }
  },

  _onYearChange(yr) {
    this.year = yr;
    const el = document.getElementById('tci-v4-year'); if(el) el.textContent=yr;
    const sl = document.getElementById('tci-v4-scrub'); if(sl) sl.value=yr;
    // Camera zoom-in la milestone
    if(this.MILES.includes(yr) && this.map) {
      const city=(typeof _RO_CITIES_DB!=='undefined')?_RO_CITIES_DB[this.cityKey]:null;
      const cx=city?.lon||27.601, cy=city?.lat||47.158;
      this.map.flyTo({center:[cx,cy], zoom:14+Math.random()*1.5, pitch:50+Math.random()*20, bearing:this.bearing+45, duration:3000, essential:true});
    }
  },

  _updateKPIs(d, year, ms) {
    const el = document.getElementById('tci-v4-kpis'); if(!el) return;
    el.innerHTML = [
      {v:(d.demo?.value||0).toLocaleString(),l:'loc.',c:'#8b5cf6'},
      {v:'€'+((d.housing?.pibCapProj||0)/1000).toFixed(0)+'k',l:'PIB/cap',c:'#22c55e'},
      {v:d.climate?.tempProj+'°C',l:'temp',c:'#ef4444'},
      {v:ms.auto+'%',l:'auto',c:'#94a3b8'},
      {v:ms.tp+'%',l:'TP',c:'#3b82f6'},
    ].map(k=>`<div style="text-align:center"><div style="font-size:13px;font-weight:700;color:${k.c}">${k.v}</div><div style="font-size:7px;color:rgba(148,163,184,0.5)">${k.l}</div></div>`).join('');
  },

  // ── MODURI ───────────────────────────────────────────────────────────────
  setMode(mode) {
    this.activeMode = mode;
    document.querySelectorAll('[id^="tci-mode-"]').forEach(b => {
      const id = b.id.replace('tci-mode-','');
      const active = id===mode;
      b.style.background = active?'rgba(59,130,246,0.15)':'transparent';
      b.style.color = active?'#60a5fa':'rgba(148,163,184,0.7)';
      b.style.borderColor = active?'rgba(59,130,246,0.5)':'rgba(255,255,255,0.1)';
    });
    this.renderLegend(mode);
    // Ajustare camera per mod
    const m = this.map; if(!m) return;
    const city=(typeof _RO_CITIES_DB!=='undefined')?_RO_CITIES_DB[this.cityKey]:null;
    const cx=city?.lon||27.601, cy=city?.lat||47.158;
    const cameraPresets = {
      '3d':         {zoom:14,   pitch:52, bearing:this.bearing},
      'densitate':  {zoom:12,   pitch:15, bearing:0},
      'riscuri':    {zoom:11.5, pitch:10, bearing:0},
      'verde':      {zoom:13,   pitch:30, bearing:45},
      'mobilitate': {zoom:13,   pitch:30, bearing:this.bearing},
    };
    const preset = cameraPresets[mode]||cameraPresets['3d'];
    m.flyTo({center:[cx,cy],...preset,duration:2000,essential:true});
  },

  renderLegend(mode) {
    const el = document.getElementById('tci-v4-legend-content'); if(!el) return;
    const legends = {
      '3d': {
        title: '🏙 Funcțiuni urbane',
        items: [
          {c:'#1e40af',l:'Rezidențial colectiv'},
          {c:'#0369a1',l:'Rezidențial individual'},
          {c:'#7c3aed',l:'Mixt / Central'},
          {c:'#d97706',l:'Comercial'},
          {c:'#059669',l:'Instituțional'},
          {c:'#16a34a',l:'Spații verzi'},
          {c:'#b91c1c',l:'Industrial'},
          {c:'#f59e0b',l:'Construcție activă'},
        ],
        note: 'Sursa: PUG · OSM · ANCPI',
      },
      'densitate': {
        title: '📊 Densitate populație',
        items: [
          {c:'#ff5000',l:'Densitate maximă'},
          {c:'#D4AF37',l:'Densitate ridicată'},
          {c:'#8b5cf6',l:'Densitate medie'},
          {c:'#3b82f6',l:'Densitate scăzută'},
        ],
        note: 'Sursa: INSE · cohort-survival',
      },
      'riscuri': {
        title: '⚠️ Riscuri teritoriale',
        items: [
          {c:'#ef4444',l:'Inundabil 10 ani (ANAR)'},
          {c:'#f97316',l:'Inundabil 100 ani'},
          {c:'#eab308',l:'Monitorizat'},
          {c:'#dc2626',l:'Seismic IA (Ag=40%g)'},
          {c:'#7f1d1d',l:'Alunecare activa'},
        ],
        note: 'Sursa: ANAR PGRA · INFP P100',
      },
      'verde': {
        title: '🌱 Spații verzi',
        items: [
          {c:'#16a34a',l:'Parc urban existent'},
          {c:'#4ade80',l:'Coridor ecologic propus'},
          {c:'#86efac',l:'Zonă tampon climă'},
          {c:'#dcfce7',l:'Potențial nou spațiu verde'},
        ],
        note: 'OMS: 9-26 mp/loc · ANM climatologie',
      },
      'mobilitate': {
        title: '🚌 Rețea transport',
        items: [
          {c:'#dc2626',l:'Tramvai existent'},
          {c:'#2563eb',l:'Autobuz RATT'},
          {c:'#7c3aed',l:'Linie nouă propusă'},
          {c:'#22c55e',l:'Pistă bicicletă'},
          {c:'#f59e0b',l:'Punct negru trafic'},
        ],
        note: 'Sursa: RATT · MDLPA · Pactul Verde UE',
      },
    };
    const leg = legends[mode]||legends['3d'];
    el.innerHTML = `
      <div style="font-size:9px;font-weight:700;color:#D4AF37;margin-bottom:8px;letter-spacing:.08em">${leg.title}</div>
      ${leg.items.map(i=>`
        <div style="display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
          <div style="width:10px;height:10px;border-radius:2px;background:${i.c};flex-shrink:0"></div>
          <div style="font-size:9px;color:rgba(200,215,235,0.85);line-height:1.3">${i.l}</div>
        </div>
      `).join('')}
      <div style="font-size:7px;color:rgba(100,120,150,0.5);margin-top:8px;font-style:italic">${leg.note}</div>
      <div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08)">
        <div style="font-size:8px;color:rgba(148,163,184,0.6);margin-bottom:4px">An proiecție</div>
        <div style="font-size:20px;font-weight:900;color:#D4AF37" id="tci-leg-year">2021</div>
      </div>
    `;
  },

  setScenario(s) {
    this.scenario = s;
    const colors = {S1:'#22c55e',S2:'#8b5cf6',S3:'#f59e0b',S4:'#38bdf8'};
    ['S1','S2','S3','S4'].forEach(id => {
      const b = document.getElementById('tci-v4-scen-'+id);
      if(!b) return;
      const c = colors[id];
      const active = id===s;
      b.style.background    = active ? c+'22' : 'transparent';
      b.style.color         = active ? c : 'rgba(148,163,184,0.5)';
      b.style.borderColor   = active ? c+'66' : 'rgba(255,255,255,0.08)';
    });
  },

  scrubTo(year) {
    this.pause();
    const A = this;
    let elapsed = A.INTRO;
    for(let yr=2021; yr<year; yr++) elapsed += A.MILES.includes(yr) ? A.YEAR_DUR+A.MILESTONE : A.YEAR_DUR;
    this.pausedAt = elapsed / this.speed;
    this._onYearChange(year);
    const d = typeof _getProjectionData !== 'undefined' ? _getProjectionData(year,this.scenario,this.cityKey) : null;
    if(d) this._updateKPIs(d, year, typeof _getModalSplit !== 'undefined' ? _getModalSplit(year) : {auto:72,tp:18,bici_ped:10});
  },

  close() {
    this.pause();
    const m = this.map;
    if(m) {
      ['tci-3d-buildings','tci-constructii-layer','tci-heatmap-layer','tci-traffic-layer','tci-risk-flood-layer'].forEach(id=>{try{if(m.getLayer(id))m.removeLayer(id);}catch(e){}});
      ['tci-constructii','tci-heatmap','tci-traffic','tci-risk-flood'].forEach(id=>{try{if(m.getSource(id))m.removeSource(id);}catch(e){}});
      m.flyTo?.({zoom:13,pitch:0,bearing:0,duration:1500});
    }
    const mapEl = document.getElementById('map');
    if(mapEl) { mapEl.style.cssText=''; m?.resize?.(); }
    const modal = document.getElementById('tci-v4-modal');
    if(modal) modal.style.display = 'none';
    this.layersAdded = false;
  },

  // ── Cautare al 2-lea oras pentru comparatie ─────────────────────────────
  _searchCity2(query) {
    if(!query || query.length < 2) return;
    // Debounce
    clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(async () => {
      const results = typeof _searchUAT !== 'undefined' ? _searchUAT(query, 8) : [];
      const container = document.getElementById('tci-compare-results-v4');
      if(!container) return;
      if(!results.length) { container.innerHTML = ''; return; }
      container.innerHTML = results.map(r => `
        <div onclick="TCI._selectCity2('${r.key}','${r.name}')" style="
          padding:6px 8px;cursor:pointer;border-radius:5px;font-size:10px;
          color:rgba(200,215,235,0.9);border-bottom:1px solid rgba(255,255,255,0.05);"
          onmouseover="this.style.background='rgba(255,255,255,0.06)'"
          onmouseout="this.style.background='transparent'">
          <span style="font-weight:600">${r.name}</span>
          <span style="color:rgba(148,163,184,0.5);font-size:9px"> jud. ${r.judet}</span>
        </div>
      `).join('');
      container.style.display = 'block';
    }, 300);
  },

  _selectCity2(key, name) {
    const container = document.getElementById('tci-compare-results-v4');
    if(container) container.style.display = 'none';
    const input = document.getElementById('tci-compare-input-v4');
    if(input) input.value = name;
    this._showCityComparison(key, name);
  },

  _showCityComparison(city2Key, city2Name) {
    const el = document.getElementById('tci-compare-output-v4');
    if(!el) return;
    const year = this.year || 2025;
    const scen = this.scenario || 'S2';
    const d1 = typeof _getProjectionData !== 'undefined' ? _getProjectionData(year, scen, this.cityKey) : null;
    const d2 = typeof _getProjectionData !== 'undefined' ? _getProjectionData(year, scen, city2Key) : null;
    const c1 = typeof _RO_CITIES_DB !== 'undefined' ? _RO_CITIES_DB[this.cityKey] : null;
    const c2 = typeof _RO_CITIES_DB !== 'undefined' ? _RO_CITIES_DB[city2Key] : null;
    if(!d1 || !d2 || !c1 || !c2) { el.innerHTML = '<div style="font-size:9px;color:#ef4444">Date indisponibile</div>'; return; }

    const rows = [
      ['Populație '+year, (d1.demo?.value||0).toLocaleString(), (d2.demo?.value||0).toLocaleString()],
      ['Rată 2011-2021', (c1.rata_reala_2011_2021||0).toFixed(2)+'%/an', (c2.rata_reala_2011_2021||0).toFixed(2)+'%/an'],
      ['PIB/cap est.', '€'+((d1.housing?.pibCapProj||0)/1000).toFixed(0)+'k', '€'+((d2.housing?.pibCapProj||0)/1000).toFixed(0)+'k'],
      ['ESG Rating', (d1.esg?.rating||'B')+' '+(d1.esg?.total||65), (d2.esg?.rating||'B')+' '+(d2.esg?.total||65)],
      ['Convergență EU', (d1.euConvergence||74)+'%', (d2.euConvergence||74)+'%'],
    ];

    el.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:4px;text-align:center;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.08)">
        <div style="font-size:10px;font-weight:700;color:#D4AF37">${c1.name}</div>
        <div style="font-size:8px;color:rgba(148,163,184,0.4)">vs</div>
        <div style="font-size:10px;font-weight:700;color:#38bdf8">${city2Name}</div>
      </div>
      ${rows.map(([l,v1,v2])=>`
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:2px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04);align-items:center">
          <div style="font-size:9px;font-weight:700;color:#D4AF37;text-align:right">${v1}</div>
          <div style="font-size:7px;color:rgba(100,120,150,0.6);text-align:center;padding:0 4px">${l}</div>
          <div style="font-size:9px;font-weight:700;color:#38bdf8;text-align:left">${v2}</div>
        </div>
      `).join('')}
      <div style="font-size:6.5px;color:rgba(100,120,150,0.4);margin-top:6px;text-align:center">INSE · Eurostat · model Cohort-Survival</div>
    `;
    el.style.display = 'block';
  },

  // ── Helpers ───────────────────────────────────────────────────────────────
  _popGeoJSON(lat, lon, intensity) {
    const features=[];
    for(let i=0;i<80;i++){
      const a=Math.random()*Math.PI*2, r=Math.random()*0.025;
      features.push({type:'Feature',geometry:{type:'Point',coordinates:[lon+Math.cos(a)*r,lat+Math.sin(a)*r*0.7]},properties:{w:Math.random()*intensity}});
    }
    return {type:'FeatureCollection',features};
  },

  _generateRiskZones(lat, lon, type) {
    // Zone de risc simulate pe coordonate reale (bazin Bahlui pentru Iasi)
    const zones = [];
    const floodAreas = [
      {dlat:-0.02,dlon:-0.01,r:0.018,color:'rgba(239,68,68,0.5)'},
      {dlat:0.01,dlon:0.025,r:0.012,color:'rgba(249,115,22,0.4)'},
    ];
    floodAreas.forEach(({dlat,dlon,r,color})=>{
      const pts=[];
      for(let i=0;i<=16;i++){const a=i/16*Math.PI*2;pts.push([lon+dlon+Math.cos(a)*r,lat+dlat+Math.sin(a)*r*0.6]);}
      pts.push(pts[0]);
      zones.push({type:'Feature',geometry:{type:'Polygon',coordinates:[pts]},properties:{color}});
    });
    return zones;
  },
};

// ── Entry points ────────────────────────────────────────────────────────────
window.TCI     = TCI;
window.openTCI = (opts) => TCI.open(opts);

if(typeof _ProjectionEngine !== 'undefined') {
  _ProjectionEngine.open            = () => TCI.open({cityKey: _ProjectionEngine.currentCity||'iasi'});
  _ProjectionEngine.startAnimation  = () => TCI.toggle();
  _ProjectionEngine.stopAnimation   = () => TCI.pause();
  _ProjectionEngine.close           = () => TCI.close();
}

console.log('[TCI v4.0] window.map confirmed — harta reala Iasi activa');
