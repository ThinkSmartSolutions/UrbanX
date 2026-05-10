// ═══════════════════════════════════════════════════════════════════════════
// URBANX — TCI ANIMATION ENGINE v2.0 (MAPBOX REAL)
// Animatie pe harta reala Mapbox GL 3D — nu canvas generic
// Camera fly, 3D buildings, traffic on real streets, layers animate
// ═══════════════════════════════════════════════════════════════════════════

const _AnimationEngine = {

  ANIM: {
    yearDuration:   15000,   // 15s per an
    milestonePause: 20000,   // 20s milestone
    introDuration:  12000,
    outroDuration:  12000,
    milestones:     [2025, 2030, 2035, 2040, 2045, 2050, 2055],
    startYear:      2021,
    endYear:        2055,
  },

  state: {
    running:     false,
    startTime:   0,
    pausedAt:    0,
    phase:       'intro',
    currentYear: 2021,
    animFrame:   null,
    speed:       1.0,
    map:         null,   // referinta Mapbox map
    trafficInterval: null,
    trafficParticles: [],
    cameraAngle: 0,
  },

  // ── Pornire animatie ────────────────────────────────────────────────────
  start(engine) {
    const as = this.state;
    if(as.running) { this.pause(engine); return; }

    // Obtine referinta la harta Mapbox
    as.map = window.map || window.mapbox || null;

    if(!as.map) {
      console.warn('[TCI] Mapbox map nu e disponibil — fallback canvas');
      this._startCanvasFallback(engine);
      return;
    }

    as.running = true;
    as.startTime = performance.now() - as.pausedAt;

    // Setup initial Mapbox pentru animatie
    this._setupMapbox(engine);

    const btn = document.getElementById('tci-play-btn');
    if(btn) btn.textContent = '⏸ Pauza';

    this._loop(engine);
  },

  pause(engine) {
    const as = this.state;
    as.running = false;
    as.pausedAt = performance.now() - as.startTime;
    cancelAnimationFrame(as.animFrame);
    clearInterval(as.trafficInterval);
    const btn = document.getElementById('tci-play-btn');
    if(btn) btn.textContent = '▶ Continua';
  },

  reset(engine) {
    this.pause(engine);
    const as = this.state;
    as.pausedAt  = 0;
    as.phase     = 'intro';
    as.currentYear = 2021;
    if(engine) engine.setYear(2021);
    this._resetMapbox();
    const btn = document.getElementById('tci-play-btn');
    if(btn) btn.textContent = '▶ Animeaza';
  },

  // ── Gaseste instanta Mapbox GL corecta ─────────────────────────────────
  _getMapboxInstance() {
    // Incearca mai multe variante de acces
    const candidates = [
      window.map,
      window.MAP,
      window.mapbox,
      window.map?.map,        // wrapper cu .map intern
      window.map?._map,       // alt wrapper
      window.mapboxMap,
      document.querySelector('.mapboxgl-map')?._mapbox,
    ];
    for(const m of candidates) {
      if(m && typeof m.getLayer === 'function' && typeof m.addLayer === 'function') {
        return m;
      }
    }
    return null;
  },

  // ── Setup Mapbox pentru animatie ────────────────────────────────────────
  _setupMapbox(engine) {
    // Incearca sa gaseasca instanta Mapbox corecta
    this.state.map = this._getMapboxInstance();
    const m = this.state.map;
    if(!m) {
      console.warn('[TCI] Mapbox instance not found — canvas fallback');
      this._startCanvasFallback(engine);
      return;
    }

    // Obtine locatia parcele active sau centrul orasului curent
    const city = _RO_CITIES_DB && engine.currentCityKey
      ? _RO_CITIES_DB[engine.currentCityKey]
      : null;
    const ap = window.S?.parcels?.[window.S?.activeParcel??0];

    const centerLon = ap?.lon || city?.lon || 27.601;
    const centerLat = ap?.lat || city?.lat || 47.158;

    // Adauga layer 3D buildings daca nu exista
    if(!m.getLayer('3d-buildings-tci')) {
      try {
        m.addLayer({
          id: '3d-buildings-tci',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': [
              'interpolate', ['linear'], ['get', 'height'],
              0,   '#0a1628',
              20,  '#0d2040',
              50,  '#102855',
              100, '#153070',
              200, '#1a3880',
            ],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.85,
          },
        }, 'waterway-label');
      } catch(e) { console.warn('[TCI] 3D buildings layer:', e.message); }
    }

    // Adauga layer pentru constructii noi (highlight galben)
    if(!m.getSource('tci-new-buildings')) {
      try {
        m.addSource('tci-new-buildings', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });
        m.addLayer({
          id: 'tci-new-buildings-layer',
          type: 'fill-extrusion',
          source: 'tci-new-buildings',
          paint: {
            'fill-extrusion-color': '#D4AF37',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.7,
          },
        });
      } catch(e) {}
    }

    // Adauga layer traffic (particule animate pe stradal)
    if(!m.getSource('tci-traffic')) {
      try {
        m.addSource('tci-traffic', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });
        m.addLayer({
          id: 'tci-traffic-layer',
          type: 'circle',
          source: 'tci-traffic',
          paint: {
            'circle-radius': ['get', 'radius'],
            'circle-color':  ['get', 'color'],
            'circle-opacity': 0.85,
            'circle-blur': 0.2,
          },
        });
      } catch(e) {}
    }

    // Adauga layer heatmap populatie
    if(!m.getSource('tci-population')) {
      try {
        m.addSource('tci-population', {
          type: 'geojson',
          data: this._generatePopHeatmap(centerLat, centerLon, 1.0),
        });
        m.addLayer({
          id: 'tci-population-heat',
          type: 'heatmap',
          source: 'tci-population',
          paint: {
            'heatmap-weight': ['get', 'weight'],
            'heatmap-intensity': 0.6,
            'heatmap-radius': 30,
            'heatmap-opacity': 0.35,
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0,   'rgba(0,0,255,0)',
              0.3, 'rgba(100,100,255,0.3)',
              0.6, 'rgba(139,92,246,0.5)',
              0.8, 'rgba(212,175,55,0.6)',
              1.0, 'rgba(255,80,0,0.7)',
            ],
          },
        });
      } catch(e) {}
    }

    // Camera initiala: fly la oras, pitch 55°, bearing -10°
    m.flyTo({
      center:   [centerLon, centerLat],
      zoom:     14.5,
      pitch:    55,
      bearing:  -10,
      duration: 3000,
      essential: true,
    });

    this.state.cameraAngle = -10;
  },

  // ── Loop principal ──────────────────────────────────────────────────────
  _loop(engine) {
    const as = this.state;
    const A  = this.ANIM;
    if(!as.running) return;

    const elapsed = (performance.now() - as.startTime) * as.speed;

    if(elapsed < A.introDuration) {
      this._introPhase(elapsed / A.introDuration, engine);
    } else {
      let t = elapsed - A.introDuration;
      let found = false;

      for(let yr = A.startYear; yr <= A.endYear; yr++) {
        const isMilestone = A.milestones.includes(yr);
        const dur = isMilestone ? A.yearDuration + A.milestonePause : A.yearDuration;

        if(t < dur) {
          as.currentYear = yr;
          if(yr !== engine.currentYear) engine.setYear(yr);

          if(isMilestone && t >= A.yearDuration) {
            this._milestonePhase(yr, (t - A.yearDuration) / A.milestonePause, engine);
          } else {
            this._yearPhase(yr, t / A.yearDuration, engine);
          }
          found = true;
          break;
        }
        t -= dur;
      }

      if(!found) {
        const ot = Math.min(1, t / A.outroDuration);
        this._outroPhase(ot, engine);
        if(ot >= 1) { this.reset(engine); return; }
      }
    }

    as.animFrame = requestAnimationFrame(() => this._loop(engine));
  },

  // ── Intro: camera revela orasul ─────────────────────────────────────────
  _introPhase(t, engine) {
    const m = this.state.map;
    if(!m) return;

    const city = _RO_CITIES_DB?.[engine.currentCityKey];
    const ap   = window.S?.parcels?.[window.S?.activeParcel??0];
    const centerLon = ap?.lon || city?.lon || 27.601;
    const centerLat = ap?.lat || city?.lat || 47.158;

    // Zoom in progresiv + rotire camera
    if(t < 0.3) {
      m.setZoom(12 + t * 8);
    } else if(t < 0.7) {
      const pT = (t - 0.3) / 0.4;
      m.setPitch(30 + pT * 30);
      m.setBearing(-30 + pT * 20);
      this.state.cameraAngle = -30 + pT * 20;
    }

    // Overlay titlu pe canvas TCI
    this._renderOverlayText(
      engine.currentCity || 'Iași',
      2021,
      'INTRO',
      t,
      engine
    );
  },

  // ── An curent: animeaza toate layerele ──────────────────────────────────
  _yearPhase(year, t, engine) {
    const m = this.state.map;
    const d = _getProjectionData(year, engine.currentScenario || 'S2', engine.currentCity || 'iasi');
    if(!d) return;

    const totalT = (year - 2021) / 34;

    // ── 1. Camera rotatie lenta continua ─────────────────────────────────
    if(m) {
      this.state.cameraAngle += 0.003 * this.state.speed;
      m.setBearing(this.state.cameraAngle % 360);

      // Zoom variaza usor cu densificarea
      const targetZoom = 14.5 + totalT * 0.5;
      const currentZoom = m.getZoom();
      m.setZoom(currentZoom + (targetZoom - currentZoom) * 0.01);
    }

    // ── 2. Culoare 3D buildings evolueaza cu timpul ────────────────────────
    if(m && m.getLayer('3d-buildings-tci')) {
      try {
        // Cladirile devin mai dense si mai colorate
        const densityColor = totalT > 0.5 ? '#153070' : '#0a1628';
        const highColor    = totalT > 0.7 ? '#2040a0' : '#1a3880';
        m.setPaintProperty('3d-buildings-tci', 'fill-extrusion-color', [
          'interpolate', ['linear'], ['get', 'height'],
          0,   '#0a1628',
          20,  densityColor,
          50,  '#102855',
          100, highColor,
          200, '#' + Math.round(25 + totalT*20).toString(16).padStart(2,'0') + '3880',
        ]);

        // Inaltimea creste usor cu urbanizarea (densificare)
        const heightMult = 1 + totalT * d.riskProfile?.pressureFactor * 0.15 || 1 + totalT * 0.1;
        m.setPaintProperty('3d-buildings-tci', 'fill-extrusion-height',
          ['*', ['get', 'height'], heightMult]
        );
      } catch(e) {}
    }

    // ── 3. Constructii noi apar pe parcele (zona activa) ──────────────────
    if(t > 0.2 && m && m.getSource('tci-new-buildings')) {
      const buildingsData = this._generateNewBuildings(engine, totalT, year, t);
      try { m.getSource('tci-new-buildings').setData(buildingsData); } catch(e) {}
    }

    // ── 4. Traffic particles pe strazi reale ─────────────────────────────
    if(m && m.getSource('tci-traffic')) {
      const ms = typeof _getModalSplit === 'function' ? _getModalSplit(year) : {auto:72,tp:18,bici_ped:10};
      const trafficData = this._generateTrafficParticles(engine, totalT, ms, year);
      try { m.getSource('tci-traffic').setData(trafficData); } catch(e) {}
    }

    // ── 5. Population heatmap intensitate ────────────────────────────────
    if(m && m.getLayer('tci-population-heat')) {
      const popRatio = d.demo?.value / 360633 || 1;
      const pulse = 0.3 + Math.sin(Date.now() / 800) * 0.1;
      try {
        m.setPaintProperty('tci-population-heat', 'heatmap-opacity',
          Math.min(0.6, 0.2 + totalT * 0.3 + pulse * 0.05)
        );
        m.setPaintProperty('tci-population-heat', 'heatmap-intensity',
          0.4 + totalT * 0.6 * popRatio
        );
      } catch(e) {}
    }

    // ── 6. Zi/noapte prin luminozitate ────────────────────────────────────
    const dayNight = (t * 6 + totalT * 3) % 1;
    const isDaytime = dayNight > 0.2 && dayNight < 0.8;
    if(m) {
      try {
        if(m.setLightPreset) {
          m.setLightPreset(isDaytime ? 'day' : 'night');
        } else if(m.setLight) {
          const sunAngle = dayNight * 360;
          m.setLight({
            anchor: 'map',
            color:   isDaytime ? '#ffffff' : '#2040a0',
            intensity: isDaytime ? 0.5 : 0.2,
            position: [1.5, sunAngle, 90 - Math.sin(dayNight*Math.PI)*80],
          });
        }
      } catch(e) {}
    }

    // ── 7. Data overlay pe canvas TCI (daca e vizibil) ────────────────────
    if(t > 0.55) {
      const canvas = document.getElementById('tci-main-canvas');
      if(canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        if(ctx) {
          canvas.width  = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          this._renderDataCardOnCanvas(ctx, canvas.width, canvas.height, year, d, (t-0.55)/0.45);
        }
      }
    }

    // ── 8. HUD ────────────────────────────────────────────────────────────
    this._updateHUD(year, totalT, t, d, engine.currentScenario || 'S2');
    engine._updateStats && engine._updateStats(d, year);
  },

  // ── Milestone: camera fly la locatie importanta ─────────────────────────
  _milestonePhase(year, t, engine) {
    const m = this.state.map;
    const d = _getProjectionData(year, engine.currentScenario || 'S2', engine.currentCity || 'iasi');

    // Camera: drone-style fly
    if(m && t < 0.2) {
      const city = _RO_CITIES_DB?.[engine.currentCityKey];
      const ap   = window.S?.parcels?.[window.S?.activeParcel??0];
      m.flyTo({
        center:   [ap?.lon || city?.lon || 27.601, ap?.lat || city?.lat || 47.158],
        zoom:     15 + Math.random() * 1.5,
        pitch:    45 + Math.random() * 25,
        bearing:  (this.state.cameraAngle + 90) % 360,
        duration: 3000,
        essential: true,
      });
    }

    // Card milestone pe canvas
    const canvas = document.getElementById('tci-main-canvas');
    if(canvas) {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if(ctx) this._renderMilestoneCard(ctx, canvas.width, canvas.height, year, d, t, engine);
    }

    engine._updateStats && engine._updateStats(d, year);
  },

  // ── Outro: camera retrage ────────────────────────────────────────────────
  _outroPhase(t, engine) {
    const m = this.state.map;
    if(m && t < 0.15) {
      m.flyTo({
        zoom: 12, pitch: 30, bearing: 0,
        duration: 3000, essential: true,
      });
    }

    const canvas = document.getElementById('tci-main-canvas');
    if(canvas) {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const alpha = Math.min(1, t * 3) * (t < 0.65 ? 1 : Math.max(0, (0.7-t)/0.05));
        if(alpha > 0.05) {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle   = 'rgba(2,6,15,0.7)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.textAlign = 'center';
          ctx.fillStyle = '#D4AF37';
          ctx.font = 'bold 22px "Space Grotesk",sans-serif';
          const city = _RO_CITIES_DB?.[engine.currentCityKey];
          ctx.fillText((city?.name || 'Iași') + ' 2055 — Proiecție completă', canvas.width/2, canvas.height * 0.4);
          ctx.fillStyle = 'rgba(148,163,184,0.8)';
          ctx.font = '11px "Space Grotesk",sans-serif';
          ctx.fillText('INSE · Eurostat Urban Audit · ANCPI · BNR · IPCC AR6', canvas.width/2, canvas.height*0.5);
          ctx.restore();
        }
      }
    }
  },

  // ── Generare particule trafic pe bbox orasului ───────────────────────────
  _generateTrafficParticles(engine, totalT, ms, year) {
    const city = _RO_CITIES_DB?.[engine.currentCityKey];
    const ap   = window.S?.parcels?.[window.S?.activeParcel??0];
    const cx   = ap?.lon || city?.lon || 27.601;
    const cy   = ap?.lat || city?.lat || 47.158;
    const spread = 0.015;

    // Numarul de particule creste cu urbanizarea
    const count = Math.round(80 + totalT * 60);
    const features = [];

    for(let i = 0; i < count; i++) {
      const seed = (i * 1337 + year) % 10000;
      const px   = cx + (Math.random() - 0.5) * spread * 2;
      const py   = cy + (Math.random() - 0.5) * spread;
      const type = seed % 100 < ms.auto ? 'car' :
                   seed % 100 < ms.auto + ms.tp ? 'bus' : 'bike';

      const colors = {
        car:  totalT > 0.5 ? '#94a3b8' : '#cbd5e1',
        bus:  '#3b82f6',
        bike: '#22c55e',
      };
      const radii = { car: 2, bus: 3.5, bike: 1.5 };

      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [px, py] },
        properties: {
          color:  colors[type],
          radius: radii[type],
          type,
        },
      });
    }

    return { type: 'FeatureCollection', features };
  },

  // ── Generare cladiri noi pe parcele din zona ─────────────────────────────
  _generateNewBuildings(engine, totalT, year, yearT) {
    const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
    if(!ap?.geo?.geometry) return { type: 'FeatureCollection', features: [] };

    // Afisam cladirile in constructie pe parcela activa
    const constructionPhase = yearT < 0.6 ? yearT / 0.6 : 1.0;
    const targetH = (AEDIS?.corpuri?.[0]?.niv || 4) * 3 * constructionPhase;

    // Folosim geometria parcelei active
    const features = ap.geo ? [{
      type: 'Feature',
      geometry: ap.geo.geometry,
      properties: {
        height: Math.max(1, targetH),
        color:  constructionPhase < 0.8 ? '#D4AF37' : '#2d6a9f',
      },
    }] : [];

    return { type: 'FeatureCollection', features };
  },

  // ── Heatmap populatie ─────────────────────────────────────────────────────
  _generatePopHeatmap(lat, lon, intensity) {
    const features = [];
    const points = 50;
    for(let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const r     = Math.random() * 0.02;
      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lon + Math.cos(angle) * r, lat + Math.sin(angle) * r * 0.7],
        },
        properties: { weight: Math.random() * intensity },
      });
    }
    return { type: 'FeatureCollection', features };
  },

  // ── Milestone card pe canvas ─────────────────────────────────────────────
  _renderMilestoneCard(ctx, W, H, year, d, t, engine) {
    ctx.clearRect(0, 0, W, H);

    const ci   = Math.min(1, t * 4);
    const co   = t > 0.78 ? Math.max(0, (1-t)/0.22) : 1;
    const alpha = ci * co;
    if(alpha < 0.05) return;

    const pd = d?.demo?.delta || 0;
    const texts = {
      2025: { title: 'Punctul de plecare',     body: 'Calibrare date INSE 2021. Rata reală observată 2011-2021 activată.' },
      2030: { title: 'Primul deceniu',         body: 'PNRR 2021-2026 finalizat. ' + Math.abs(d?.housing?.stockNou||0).toLocaleString() + ' locuințe noi autorizate. Convergență UE: ' + (d?.euConvergence||74) + '%.' },
      2035: { title: 'Jumătatea perioadei',    body: (pd>=0?'+':'')+pd.toLocaleString() + ' loc. față de 2021 (INSE). Temperatură +'+(d?.climate?.deltaT||1.2)+'°C vs 1990 (IPCC AR6).' },
      2040: { title: 'Agenda urbană 2040',     body: 'ESG: '+(d?.esg?.rating||'B')+'. Spații verzi necesare: '+(d?.climate?.greenNeeded||22)+' mp/loc (OMS adaptare climatică).' },
      2045: { title: 'Viziunea 2045',          body: 'PIB/cap estimat: €'+(d?.housing?.pibCapProj||25000).toLocaleString()+'. Convergență EU: '+(d?.euConvergence||92)+'%.' },
      2050: { title: 'Decarbonizare 2050',     body: 'Obiectiv net-zero UE. +'+(d?.climate?.deltaT||2.8)+'°C vs 1990 (IPCC). '+(d?.climate?.heatDays||26)+' zile caniculare/an.' },
      2055: { title: 'Bilanț 30 ani',          body: (pd>=0?'+':'')+pd.toLocaleString()+' loc. · ESG '+(d?.esg?.rating||'A')+' ('+(d?.esg?.total||87)+'/100) · EU '+(d?.euConvergence||97)+'%' },
    };
    const mt = texts[year] || { title: 'Proiecție '+year, body: '—' };

    ctx.save();
    ctx.globalAlpha = alpha;

    // Overlay intunecat pe harta
    ctx.fillStyle = 'rgba(2,6,15,0.65)';
    ctx.fillRect(0, 0, W, H);

    // Card central
    const cw = Math.min(480, W * 0.72);
    const ch = 220;
    const cx2 = W/2 - cw/2;
    const cy2 = H/2 - ch/2;

    // Shadow
    ctx.shadowColor = 'rgba(212,175,55,0.3)';
    ctx.shadowBlur  = 40;
    ctx.fillStyle   = 'rgba(4,10,24,0.97)';
    this._roundRect(ctx, cx2, cy2, cw, ch, 12);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Border + bara sus
    ctx.strokeStyle = 'rgba(212,175,55,0.6)';
    ctx.lineWidth   = 1;
    this._roundRect(ctx, cx2, cy2, cw, ch, 12);
    ctx.stroke();
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(cx2+18, cy2, cw-36, 2);

    // An
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 48px "Space Grotesk",monospace';
    ctx.fillText(year, W/2, cy2 + 60);

    // Titlu
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font      = 'bold 14px "Space Grotesk"';
    ctx.fillText(mt.title, W/2, cy2 + 88);

    // Body
    ctx.fillStyle = 'rgba(148,163,184,0.85)';
    ctx.font      = '10px "Space Grotesk"';
    const words = mt.body.split(' ');
    let line = '', lines = [], maxW = cw - 60;
    words.forEach(w => {
      const test = line + w + ' ';
      if(ctx.measureText(test).width > maxW && line) { lines.push(line); line = w + ' '; }
      else line = test;
    });
    lines.push(line);
    lines.forEach((l, i) => ctx.fillText(l.trim(), W/2, cy2 + 105 + i*14));

    // KPIs
    const ky = cy2 + ch - 55;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(cx2+14, ky-6, cw-28, 42);
    const kpis = [
      { l:'Populatie', v:(d?.demo?.value||0).toLocaleString(), c:'#8b5cf6' },
      { l:'PIB/cap',   v:'€'+((d?.housing?.pibCapProj||0)/1000).toFixed(0)+'k', c:'#22c55e' },
      { l:'ESG',       v:d?.esg?.rating||'B', c:'#D4AF37' },
      { l:'Clima +',   v:''+(d?.climate?.deltaT||0)+'°C', c:'#ef4444' },
    ];
    const kw = (cw-30)/kpis.length;
    kpis.forEach((k,i) => {
      const kx = cx2+15 + i*kw + kw/2;
      ctx.fillStyle = k.c;
      ctx.font = 'bold 16px "Space Grotesk"';
      ctx.fillText(k.v, kx, ky+14);
      ctx.fillStyle = 'rgba(148,163,184,0.5)';
      ctx.font = '7px "Space Grotesk"';
      ctx.fillText(k.l, kx, ky+26);
    });

    // Sursa
    ctx.fillStyle = 'rgba(100,120,150,0.5)';
    ctx.font = '7px "Space Grotesk"';
    ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6', W/2, cy2+ch-8);
    ctx.textAlign = 'left';
    ctx.restore();
  },

  // ── Data card overlay ─────────────────────────────────────────────────────
  _renderDataCardOnCanvas(ctx, W, H, year, d, alpha) {
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.globalAlpha = Math.min(1, alpha) * 0.9;

    // Mini card jos-dreapta
    const cw = 180, ch = 70;
    const cx2 = W - cw - 12, cy2 = H - ch - 12;

    ctx.fillStyle = 'rgba(4,10,24,0.88)';
    this._roundRect(ctx, cx2, cy2, cw, ch, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,175,55,0.3)';
    ctx.lineWidth   = 0.5;
    this._roundRect(ctx, cx2, cy2, cw, ch, 6);
    ctx.stroke();

    ctx.fillStyle = 'rgba(212,175,55,0.85)';
    ctx.font = 'bold 9px "Space Grotesk"';
    ctx.textAlign = 'left';
    ctx.fillText('DATE ' + year, cx2+8, cy2+12);

    const delta = d?.demo?.delta || 0;
    const items = [
      ['Pop.', (d?.demo?.value||0).toLocaleString()+' loc.', delta>=0?'#22c55e':'#ef4444'],
      ['Auth/an', (d?.housing?.cerereAnuala||0)+'', '#f59e0b'],
      ['PIB/cap', '€'+(d?.housing?.pibCapProj||0).toLocaleString(), '#22c55e'],
    ];
    items.forEach(([l,v,c],i) => {
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.font = '7.5px "Space Grotesk"';
      ctx.fillText(l+':', cx2+8, cy2+22+i*14);
      ctx.fillStyle = c;
      ctx.font = 'bold 7.5px "Space Grotesk"';
      ctx.fillText(v, cx2+55, cy2+22+i*14);
    });
    ctx.textAlign = 'left';
    ctx.restore();
  },

  // ── HUD actualizare ────────────────────────────────────────────────────────
  _updateHUD(year, totalT, yearT, d, scenario) {
    const el = document.getElementById('tci-year-display');
    if(el) el.textContent = year;
    const bar = document.getElementById('wx-progress-fill');
    if(bar) bar.style.width = (totalT * 100) + '%';
  },

  // ── Overlay text intro ────────────────────────────────────────────────────
  _renderOverlayText(cityName, year, phase, t, engine) {
    const canvas = document.getElementById('tci-main-canvas');
    if(!canvas) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fi = Math.min(1, t * 2.5);
    ctx.fillStyle = `rgba(2,6,15,${1-fi})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(t > 0.15) {
      const ta = Math.min(1, (t-0.15)/0.2) * (t < 0.78 ? 1 : Math.max(0,(1-t)/0.22));
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(212,175,55,${ta})`;
      ctx.font = 'bold 10px "Space Grotesk",monospace';
      ctx.fillText('TEMPORAL CITY INTELLIGENCE', canvas.width/2, canvas.height*0.32);
      ctx.fillStyle = `rgba(255,255,255,${ta*0.95})`;
      ctx.font = 'bold 30px "Space Grotesk",monospace';
      ctx.fillText(cityName, canvas.width/2, canvas.height*0.42);
      ctx.fillStyle = `rgba(148,163,184,${ta*0.7})`;
      ctx.font = '9px "Space Grotesk"';
      ctx.fillText('Proiectie urbanistica 2021-2055 · INSE · Eurostat · ANCPI · IPCC AR6', canvas.width/2, canvas.height*0.50);
      ctx.textAlign = 'left';
    }
  },

  // ── Fallback canvas REAL animat ─────────────────────────────────────────
  _startCanvasFallback(engine) {
    console.log('[TCI] Canvas 3D fallback activ');
    const as = this.state;
    as.running = true;
    as.startTime = performance.now() - as.pausedAt;

    // Initializeaza starea de cladiri si particule
    if(!as.buildings?.length) this._initBuildingsCanvas();
    if(!as.particles?.length)  this._initParticlesCanvas(80);

    const btn = document.getElementById('tci-play-btn');
    if(btn) btn.textContent = '⏸ Pauza';

    this._loopCanvas(engine);
  },

  _initBuildingsCanvas() {
    const as = this.state;
    as.buildings = [];
    for(let i=0;i<40;i++){
      const s=i*1337;
      as.buildings.push({
        id:i, x:(s%900)/1000+0.05,
        width:0.028+(s%25)/1000,
        height:0.07+(s%18)/100,
        niv:3+Math.floor(s%15),
        yearAppear:i<15?2021:2021+Math.floor((s%340)/10),
        phase:i<15?1.0:0.0,
        constructed:i<15,
        hue:s%25,
      });
    }
  },

  _initParticlesCanvas(n) {
    const as = this.state;
    as.particles = Array.from({length:n},(_,i)=>({
      x:Math.random(), y:0.66+Math.random()*0.28,
      speed:0.0004+Math.random()*0.0009,
      dir:Math.random()<0.5?1:-1,
      type:['car','car','car','bike','ped'][Math.floor(Math.random()*5)],
      hue:Math.random()*40,
    }));
  },

  _loopCanvas(engine) {
    const as = this.state;
    const A  = this.ANIM;
    if(!as.running) return;

    const elapsed = (performance.now() - as.startTime) * as.speed;

    if(elapsed < A.introDuration) {
      this._renderCanvasFrame(engine, 2021, 0, elapsed/A.introDuration, 'intro');
    } else {
      let t = elapsed - A.introDuration;
      let found = false;

      for(let yr = A.startYear; yr <= A.endYear; yr++) {
        const isMilestone = A.milestones.includes(yr);
        const dur = isMilestone ? A.yearDuration + A.milestonePause : A.yearDuration;

        if(t < dur) {
          if(yr !== engine.currentYear) engine.setYear(yr);
          const yearT = isMilestone && t >= A.yearDuration
            ? 1.0
            : Math.min(1, t / A.yearDuration);
          this._renderCanvasFrame(engine, yr, yearT, (yr-2021)/34,
            isMilestone && t >= A.yearDuration ? 'milestone' : 'year');
          if(isMilestone && t >= A.yearDuration) {
            const mT = (t - A.yearDuration) / A.milestonePause;
            const canvas = document.getElementById('tci-main-canvas');
            if(canvas) {
              const ctx = canvas.getContext('2d');
              const d   = _getProjectionData(yr, engine.currentScenario||'S2', engine.currentCity||'iasi');
              if(ctx && d) this._renderMilestoneCard(ctx, canvas.width, canvas.height, yr, d, mT, engine);
            }
          }
          found = true;
          break;
        }
        t -= dur;
      }

      if(!found) {
        const ot = Math.min(1, t/A.outroDuration);
        this._renderCanvasOutro(engine, ot);
        if(ot >= 1) { this.reset(engine); return; }
      }
    }

    as.animFrame = requestAnimationFrame(() => this._loopCanvas(engine));
  },

  _renderCanvasFrame(engine, year, yearT, totalT, phase) {
    const canvas = document.getElementById('tci-main-canvas');
    if(!canvas) return;

    // Dimensioneaza corect
    const W = canvas.offsetWidth || 600;
    const H = canvas.offsetHeight || 400;
    if(canvas.width !== W || canvas.height !== H) {
      canvas.width  = W;
      canvas.height = H;
    }
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    const d = _getProjectionData(year, engine.currentScenario||'S2', engine.currentCity||'iasi');
    const season  = (yearT * 2 + totalT * 8) % 4;
    const dayT    = (yearT * 6 + totalT * 3) % 1;
    const sunH    = Math.max(0, Math.sin(dayT * Math.PI));
    const groundY = H * 0.63;

    // 8 layere canvas
    this.renderSky(ctx, W, H, groundY, season, dayT, sunH, totalT, d);
    this.renderBuildings(ctx, W, H, groundY, totalT, yearT, d, dayT);
    this.renderVegetation(ctx, W, H, groundY, totalT, season, d);
    this.renderHeatmap(ctx, W, H, groundY, totalT, yearT, d, engine.currentScenario||'S2');
    this.renderTraffic(ctx, W, H, groundY, totalT, dayT, d);
    this.renderInfrastructure(ctx, W, H, groundY, totalT, d);
    this.renderGround(ctx, W, H, groundY, totalT, season);

    // Data overlay dupa 55% din an
    if(yearT > 0.55 && d) {
      this._renderDataCardOnCanvas(ctx, W, H, year, d, (yearT-0.55)/0.45);
    }

    // HUD
    this.renderYearHUD && this.renderYearHUD(ctx, W, H, year, totalT, yearT, d, engine.currentScenario||'S2');

    // Update stats
    engine._updateStats && engine._updateStats(d, year);
  },

  _renderCanvasOutro(engine, t) {
    const canvas = document.getElementById('tci-main-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    const W = canvas.width, H = canvas.height;
    const d = _getProjectionData(2055, engine.currentScenario||'S2', engine.currentCity||'iasi');
    this.renderSky(ctx,W,H,H*0.63,2,0.6,0.8,1,d);
    this.renderBuildings(ctx,W,H,H*0.63,1,1,d,0.6);
    this.renderGround(ctx,W,H,H*0.63,1,2);
    const fo = t > 0.72 ? (t-0.72)/0.28 : 0;
    ctx.fillStyle = 'rgba(2,6,15,'+fo+')';
    ctx.fillRect(0,0,W,H);
    const al = Math.min(1,t*2.8)*(t<0.65?1:Math.max(0,(0.7-t)/0.05));
    if(al > 0.05) {
      ctx.save(); ctx.globalAlpha = al; ctx.textAlign = 'center';
      ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 20px "Space Grotesk"';
      const city = _RO_CITIES_DB?.[engine.currentCityKey]||{name:"Iasi"};
      ctx.fillText(city.name+' 2055 — Proiectie completa', W/2, H*0.3);
      ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.font = '10px "Space Grotesk"';
      ctx.fillText('INSE · Eurostat · ANCPI · BNR · IPCC AR6', W/2, H*0.38);
      ctx.restore();
    }
  },

  // ── Reset Mapbox la normal ─────────────────────────────────────────────────
  _resetMapbox() {
    const m = this.state.map;
    if(!m) return;
    try {
      m.flyTo({ zoom: 14, pitch: 30, bearing: 0, duration: 1500 });
      if(m.getLayer('tci-new-buildings-layer')) m.removeLayer('tci-new-buildings-layer');
      if(m.getSource('tci-new-buildings')) m.removeSource('tci-new-buildings');
      if(m.getLayer('tci-traffic-layer')) m.removeLayer('tci-traffic-layer');
      if(m.getSource('tci-traffic')) m.removeSource('tci-traffic');
      if(m.getLayer('tci-population-heat')) m.removeLayer('tci-population-heat');
      if(m.getSource('tci-population')) m.removeSource('tci-population');
      if(m.getLayer('3d-buildings-tci')) m.removeLayer('3d-buildings-tci');
    } catch(e) {}
    const canvas = document.getElementById('tci-main-canvas');
    if(canvas) canvas.getContext('2d')?.clearRect(0,0,canvas.width,canvas.height);
  },

  // ── Helper roundRect ─────────────────────────────────────────────────────
  _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.lineTo(x+w-r,y);
    ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r);
    ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h);
    ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y);
    ctx.closePath();
  },

};

// ── Conectare la _ProjectionEngine ────────────────────────────────────────
if(typeof _ProjectionEngine !== 'undefined') {
  _ProjectionEngine._AE = _AnimationEngine;

  _ProjectionEngine.startAnimation = function() {
    _AnimationEngine.state.speed = (() => {
      const v = parseInt(document.getElementById('tci-speed')?.value || '1');
      return v;
    })();
    _AnimationEngine.start(this);
  };

  _ProjectionEngine.stopAnimation = function() {
    _AnimationEngine.reset(this);
  };

  _ProjectionEngine.togglePlay = function() {
    if(_AnimationEngine.state.running) _AnimationEngine.pause(this);
    else _AnimationEngine.start(this);
  };

  // Canvas-ul TCI sa fie transparent (harta Mapbox e fundalul real)
  _ProjectionEngine._renderCanvas = function() {
    // Nu mai renderam pe canvas cand animatia e oprita —
    // Harta Mapbox e vizibila direct prin canvas transparent
    const canvas = document.getElementById('tci-main-canvas');
    if(canvas) {
      canvas.style.pointerEvents = 'none';
      canvas.style.background = 'transparent';
    }

    // Doar update statistici
    const d = _getProjectionData(this.currentYear, this.currentScenario, this.currentCity || 'iasi');
    if(d) this._updateStats(d, this.currentYear);
  };

  // Canvas-ul TCI trebuie sa fie transparent pentru a vedea harta
  window.addEventListener('load', () => {
    setTimeout(() => {
      const canvas = document.getElementById('tci-main-canvas');
      if(canvas) {
        canvas.style.background = 'transparent';
        canvas.style.pointerEvents = 'none';
      }
    }, 1000);
  });

  // Speed selector
  window.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('tci-speed');
    if(sel) sel.innerHTML = '<option value="1">1x (~11 min)</option><option value="2">2x (~5.5 min)</option><option value="4">4x (~2.8 min)</option><option value="8">8x (~1.4 min)</option>';
  });

  console.log('[TCI] Animation Engine v2.0 — Mapbox GL 3D ready');
}
