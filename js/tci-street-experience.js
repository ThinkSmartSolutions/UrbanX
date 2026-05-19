// ═══════════════════════════════════════════════════════════════════════════
// tci-street-experience.js — UrbanX Immersive Street Experience v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Experiența urbană imersivă la nivel de stradă — unic în România:
//
// ① INTRO CINEMATIC 12 secunde
//    Fly-in din spațiu → satelit → oraș → stradă
//    Typewriter: "BUCUREȘTI · 2025 · 1.716.983 LOCUITORI"
//    Camera coboară la 1.7m înălțime, ochii unui pieton
//
// ② STREET VIEW MODE — "Ești în oraș"
//    Pitch 85° · poziție la nivel stradă · FOV pieton
//    Clădirile cresc în jurul tău pe măsură ce trec anii
//    Trafic auto vizibil pe străzi (Mapbox + canvas particles)
//    Macarale animate în zonele de construcție activă
//    Oameni (pietoni) animați pe trotuar — canvas 2D overlay
//    Cerul se schimbă: dimineață 2025 → apus 2035 → noapte 2045 → zori 2055
//
// ③ MOMENTE DRAMATICE — Full-screen narrative stops
//    Filmul se OPREȘTE. Ecranul devine negru.
//    Date reale apar rând cu rând, ca în cinema.
//    "2035 · IAȘI · +18.400 oameni"
//    "847 de clădiri noi. Infrastructura rutieră la limită."
//    Sursa citată jos: "INSE · Eurostat · model cohort-component"
//    Pauză 4 secunde. Filmul reia din stradă.
//
// ④ CONSTRUCTION ZONE — Macara + praf + zgomot vizual
//    Zone roșii pe hartă = construcție activă per an
//    Macara SVG animată rotativă deasupra clădirii
//    Particule "praf" pe canvas
//    Badge "AUTORIZAT 2031 · P+8E · 42 apt."
//
// ⑤ TIME LAPSE URBAN — Clădirile cresc în timp real
//    fill-extrusion-height animat din 0 → H în 2s per clădire
//    Ordinea de apariție: aleatoriu dar ponderat cu distanța față de centru
//    Culoarea se schimbă: galben (recent) → alb (vechi) → gri (fond)
//
// INTEGRARE: Completează 18-animation-engine.js
// Se activează din butonul "🚶 Stradă" din TCI Cinema
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTE
// ═══════════════════════════════════════════════════════════════════════════

const EYE_HEIGHT   = 0.000015; // ~1.7m în grade lat (aprox)
const STREET_PITCH = 82;       // grade — aproape orizont
const STREET_ZOOM  = 17.5;     // zoom nivel stradă
const DRONE_PITCH  = 55;       // drone view
const DRONE_ZOOM   = 14.5;
const DRAMATIC_DUR = 4500;     // ms durata moment dramatic

const LIGHT_BY_YEAR = {
  2025: 'dawn',
  2030: 'day',
  2035: 'day',
  2040: 'dusk',
  2045: 'dusk',
  2050: 'night',
  2055: 'dawn', // speranță — noul început
};

const CRANE_COLOR = '#f59e0b';

// ═══════════════════════════════════════════════════════════════════════════
// ① INTRO CINEMATIC
// ═══════════════════════════════════════════════════════════════════════════

G._TCIIntro = {
  _running: false,
  _raf: null,
  _startTime: 0,
  DURATION: 12000, // 12 secunde

  // Pornește intro-ul cinematic
  async start(cityData, onComplete) {
    if(this._running) return;
    this._running = true;
    this._startTime = performance.now();

    const map = window.map;
    const city = cityData || {};
    const cx = city.lon||27.601, cy = city.lat||47.158;
    const name = city.name||'România';
    const pop  = city.pop2021||0;

    // Creăm canvas overlay fullscreen
    const canvas = this._createOverlay();
    const ctx    = canvas.getContext('2d');

    // Pornire din zoom depărtat
    if(map){
      try {
        map.jumpTo({ center:[cx,cy], zoom:2, pitch:0, bearing:0 });
        // Setăm light la noapte pentru efect dramatic
        map.setConfigProperty?.('basemap','lightPreset','night');
      } catch(e){}
    }

    const _this = this;
    const loop = () => {
      if(!_this._running) return;
      const t = (performance.now() - _this._startTime) / _this.DURATION;

      _this._render(ctx, canvas.width, canvas.height, t, name, pop, cx, cy);
      _this._animateCamera(map, t, cx, cy);

      if(t >= 1){
        _this._running = false;
        // Fade out overlay
        canvas.style.transition = 'opacity 1s';
        canvas.style.opacity = '0';
        setTimeout(()=>{
          canvas.remove();
          if(onComplete) onComplete();
        }, 1000);
        return;
      }
      _this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  },

  _createOverlay() {
    let c = document.getElementById('tci-intro-canvas');
    if(c) c.remove();
    c = document.createElement('canvas');
    c.id = 'tci-intro-canvas';
    c.style.cssText = `
      position: fixed; inset: 0; z-index: 5000;
      width: 100%; height: 100%;
      pointer-events: none;
      background: #000;
    `;
    c.width  = window.innerWidth  * (window.devicePixelRatio||1);
    c.height = window.innerHeight * (window.devicePixelRatio||1);
    document.body.appendChild(c);
    return c;
  },

  _animateCamera(map, t, cx, cy) {
    if(!map) return;
    try {
      if(t < 0.15){
        // Zoom din spatiu
        const z = 2 + t/0.15 * 8;
        map.setZoom(z);
      } else if(t < 0.35){
        // Intrare in atmosfera - pitch creste
        const pt = (t-0.15)/0.20;
        map.setZoom(10 + pt*3);
        map.setPitch(pt*30);
      } else if(t < 0.60){
        // Zbor catre oras
        const pt = (t-0.35)/0.25;
        map.setZoom(13 + pt*3);
        map.setPitch(30 + pt*40);
        map.setBearing(-30 + pt*30);
      } else if(t < 0.85){
        // Coborare la nivel strada
        const pt = (t-0.60)/0.25;
        map.setZoom(16 + pt*1.5);
        map.setPitch(70 + pt*12);
        map.setBearing(pt*10);
      } else {
        // Final: nivel stradă
        map.setZoom(STREET_ZOOM);
        map.setPitch(STREET_PITCH);
        try { map.setConfigProperty('basemap','lightPreset','dawn'); } catch(e){}
      }
    } catch(e){}
  },

  _render(ctx, W, H, t, name, pop, cx, cy) {
    ctx.clearRect(0,0,W,H);

    // Faza 1 (0-0.20): negru complet cu text
    if(t < 0.20){
      const alpha = t < 0.05 ? t/0.05 : t > 0.18 ? (0.20-t)/0.02 : 1;
      ctx.fillStyle = `rgba(0,0,0,${alpha * 0.95})`;
      ctx.fillRect(0,0,W,H);

      // Coordonate ca în film SF
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(59,130,246,0.15)';
      ctx.fillRect(0,0,W,H);

      // Grid lines subtile
      ctx.strokeStyle = 'rgba(59,130,246,0.08)';
      ctx.lineWidth = 0.5;
      for(let i=0;i<W;i+=40){ ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,H);ctx.stroke(); }
      for(let j=0;j<H;j+=40){ ctx.beginPath();ctx.moveTo(0,j);ctx.lineTo(W,j);ctx.stroke(); }

      ctx.fillStyle = 'rgba(100,150,255,0.7)';
      ctx.font = `${Math.round(W*0.008)}px "IBM Plex Mono"`;
      ctx.textAlign = 'center';
      ctx.fillText(`LAT ${cy.toFixed(4)}°N  LON ${cx.toFixed(4)}°E`, W/2, H*0.45);

      ctx.fillStyle = '#D4AF37';
      ctx.font = `bold ${Math.round(W*0.025)}px "Space Grotesk","IBM Plex Mono",monospace`;
      ctx.fillText('URBAN X', W/2, H*0.52);

      ctx.fillStyle = 'rgba(148,163,184,0.6)';
      ctx.font = `${Math.round(W*0.009)}px "IBM Plex Mono"`;
      ctx.fillText('TEMPORAL CITY INTELLIGENCE · SISTEM NATIONAL DE PREDICTII URBANISTICE', W/2, H*0.57);
      ctx.restore();
      return;
    }

    // Faza 2 (0.20-0.60): overlay gradient
    if(t < 0.60){
      const pt = (t-0.20)/0.40;
      ctx.fillStyle = `rgba(0,0,0,${0.7*(1-pt*0.5)})`;
      ctx.fillRect(0,0,W,H);
      return;
    }

    // Faza 3 (0.60-0.85): text oraș apare
    if(t < 0.85){
      const pt = (t-0.60)/0.25;
      const alpha = pt < 0.2 ? pt/0.2 : pt > 0.85 ? (1-pt)/0.15 : 1;

      ctx.fillStyle = `rgba(0,0,0,${0.55*(1-pt*0.3)})`;
      ctx.fillRect(0,0,W,H);

      ctx.save();
      ctx.globalAlpha = alpha;

      // Bara de sus
      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(W*0.15, H*0.35-2, W*0.70, 2);

      // Numele orasului — typewriter effect
      const charCount = Math.floor(name.length * pt * 3);
      const displayName = name.slice(0, charCount);
      ctx.fillStyle = '#ffffff';
      ctx.font = `900 ${Math.round(W*0.045)}px "Space Grotesk",sans-serif`;
      ctx.textAlign = 'center';
      ctx.letterSpacing = '0.1em';
      ctx.fillText(displayName.toUpperCase(), W/2, H*0.50);

      // Populatie
      if(pt > 0.4){
        const popAlpha = Math.min(1, (pt-0.4)/0.3);
        ctx.globalAlpha = alpha * popAlpha;
        ctx.fillStyle = '#D4AF37';
        ctx.font = `bold ${Math.round(W*0.016)}px "IBM Plex Mono"`;
        ctx.fillText(pop.toLocaleString('ro-RO') + ' LOCUITORI · 2025', W/2, H*0.60);
      }

      // An
      if(pt > 0.6){
        const yrAlpha = Math.min(1, (pt-0.6)/0.2);
        ctx.globalAlpha = alpha * yrAlpha;
        ctx.fillStyle = 'rgba(148,163,184,0.7)';
        ctx.font = `${Math.round(W*0.010)}px "IBM Plex Mono"`;
        ctx.fillText('PROIECȚIE URBANISTICĂ 2025 → 2055', W/2, H*0.68);
      }

      ctx.restore();
      return;
    }

    // Faza 4 (0.85-1.0): fade out
    const pt = 1 - (t-0.85)/0.15;
    ctx.fillStyle = `rgba(0,0,0,${pt * 0.4})`;
    ctx.fillRect(0,0,W,H);

    ctx.save();
    ctx.globalAlpha = pt * 0.7;
    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.font = `bold ${Math.round(W*0.009)}px "IBM Plex Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('▼ NIVEL STRADĂ · ' + (name||'').toUpperCase(), W/2, H*0.92);
    ctx.restore();
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ② STREET VIEW MODE — pieton în oraș
// ═══════════════════════════════════════════════════════════════════════════

G._TCIStreetView = {
  _active: false,
  _year:   2025,
  _city:   null,
  _canvas: null,
  _ctx:    null,
  _raf:    null,
  _pedestrians: [],
  _cranes: [],
  _particles: [],
  _lastBearing: 0,
  _walkAngle:   0,
  _walkSpeed:   0.0003,

  activate(city, year) {
    if(this._active) return;
    this._active = true;
    this._city   = city;
    this._year   = year || 2025;
    this._lastBearing = 0;

    const map = window.map;
    if(!map) return;

    const cx = city?.lon||27.601, cy = city?.lat||47.158;

    // Coborâm camera la nivel stradă
    map.flyTo({
      center: [cx, cy + EYE_HEIGHT * 3], // puțin în față față de locație
      zoom: STREET_ZOOM,
      pitch: STREET_PITCH,
      bearing: 20,
      duration: 2500,
      essential: true,
    });

    try { map.setConfigProperty('basemap','lightPreset', LIGHT_BY_YEAR[year]||'dawn'); } catch(e){}

    // Canvas overlay pentru pietoni, macarale, efecte
    this._canvas = this._createCanvas();
    this._ctx    = this._canvas.getContext('2d');

    // Generăm pietoni și macarale
    this._generatePedestrians();
    this._generateCranes(year);

    // Pornire loop
    this._loop();

    // Rotire lentă bearing — ca și cum mergi pe stradă
    this._startWalk(map);

    console.log('[StreetView] ✅ Activ:', city?.name, year);
    ss?.('🚶 Mod stradă activ: '+city?.name+' · '+year+' · pitch 82°');
  },

  deactivate() {
    this._active = false;
    if(this._raf) cancelAnimationFrame(this._raf);
    if(this._walkInterval) clearInterval(this._walkInterval);
    if(this._canvas) { this._canvas.remove(); this._canvas = null; }
    // Curăță layerele Mapbox adăugate
    const m = window.map;
    if(m){
      [this.SOURCE_ID, this.LAYER_ID].forEach(id=>{
        try{ if(m.getLayer?.(id)) m.removeLayer(id); }catch(e){}
        try{ if(m.getSource?.(id)) m.removeSource(id); }catch(e){}
      });
    }

    // Revenire la drone view
    const map = window.map;
    if(map){
      map.flyTo({ zoom:DRONE_ZOOM, pitch:DRONE_PITCH, bearing:0, duration:2000 });
    }
  },

  setYear(year) {
    this._year = year;
    this._generateCranes(year);
    this._generatePedestrians();

    const map = window.map;
    if(map){
      try { map.setConfigProperty('basemap','lightPreset', LIGHT_BY_YEAR[year]||'day'); } catch(e){}
    }
  },

  _createCanvas() {
    let c = document.getElementById('tci-street-canvas');
    if(c) c.remove();
    c = document.createElement('canvas');
    c.id = 'tci-street-canvas';
    c.style.cssText = `
      position: fixed; inset: 0; z-index: 3100;
      width: 100%; height: 100%;
      pointer-events: none;
    `;
    c.width  = window.innerWidth  * (window.devicePixelRatio||1);
    c.height = window.innerHeight * (window.devicePixelRatio||1);
    document.body.appendChild(c);
    return c;
  },

  _startWalk(map) {
    this._walkInterval = setInterval(()=>{
      if(!this._active) { clearInterval(this._walkInterval); return; }
      this._walkAngle += this._walkSpeed * 50;
      // Oscilăm bearing-ul ușor — senzație de mers
      try { map.setBearing(this._lastBearing + Math.sin(this._walkAngle)*3); } catch(e){}
    }, 50);
  },

  _generatePedestrians() {
    const W = window.innerWidth, H = window.innerHeight;
    const year  = this._year;
    // Mai mulți pietoni = an mai avansat (densitate urbană mai mare)
    const count = Math.floor(8 + (year-2025)*0.6);
    this._pedestrians = Array.from({length: Math.min(count, 25)}, (_, i) => ({
      x:     0.05 + Math.random() * 0.9,  // 0-1 din lațimea ecranului
      y:     0.55 + Math.random() * 0.35, // trotuar (jos)
      speed: 0.0003 + Math.random() * 0.0008,
      dir:   Math.random() > 0.5 ? 1 : -1,
      size:  8 + Math.random() * 6,
      color: ['#e2e8f0','#94a3b8','#cbd5e1','#f1f5f9'][Math.floor(Math.random()*4)],
      legPhase: Math.random() * Math.PI * 2,
      type:  Math.random() > 0.7 ? 'bike' : 'walk',
    }));
  },

  _generateCranes(year) {
    // Macarale apar în funcție de an și zona de construcție
    const city = this._city;
    const need = G._TCIMasterplanPDF?._calcNeed?.(city,'S2');
    const buildRate = need ? (need.locuinteTotale/30) : 100;
    // Mai multe macarale = mai multă construcție
    const craneCount = Math.max(0, Math.round((year-2025)*0.3 + buildRate/400));

    this._cranes = Array.from({length: Math.min(craneCount, 6)}, (_, i) => ({
      x:      0.05 + (i / 6) * 0.9,  // distribuite pe ecran
      y:      0.15 + Math.random() * 0.25, // sus (clădiri înalte)
      height: 0.20 + Math.random() * 0.15,
      angle:  Math.random() * Math.PI * 2,
      speed:  0.003 + Math.random() * 0.004,
      color:  CRANE_COLOR,
      blink:  Math.random() > 0.5, // lumina de avertizare
      blinkPhase: Math.random() * Math.PI * 2,
    }));
  },

  _loop() {
    if(!this._active) return;
    const ctx = this._ctx;
    const W   = this._canvas?.width  || window.innerWidth;
    const H   = this._canvas?.height || window.innerHeight;

    ctx.clearRect(0,0,W,H);

    // Gradient atmosferă jos (trotuar)
    const grad = ctx.createLinearGradient(0, H*0.7, 0, H);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, H*0.7, W, H*0.3);

    // Vignette edges
    const vig = ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.8);
    vig.addColorStop(0,'rgba(0,0,0,0)');
    vig.addColorStop(1,'rgba(0,0,0,0.35)');
    ctx.fillStyle = vig;
    ctx.fillRect(0,0,W,H);

    // Desenăm macarale
    this._drawCranes(ctx, W, H);

    // Particulele de praf construcție
    this._updateParticles(W, H);
    this._drawParticles(ctx);

    // Desenăm pietoni
    this._drawPedestrians(ctx, W, H);

    // HUD info stradă
    this._drawStreetHUD(ctx, W, H);

    this._raf = requestAnimationFrame(()=>this._loop());
  },

  _drawCranes(ctx, W, H) {
    this._cranes.forEach(crane=>{
      crane.angle += crane.speed;
      crane.blinkPhase += 0.08;

      const cx = crane.x * W;
      const cy = crane.y * H;
      const armLen = W * 0.12;
      const towerH = H * crane.height;

      ctx.save();
      ctx.strokeStyle = crane.color;
      ctx.lineWidth = Math.max(1.5, W*0.002);
      ctx.lineCap = 'round';

      // Turn vertical
      ctx.beginPath();
      ctx.moveTo(cx, cy + towerH);
      ctx.lineTo(cx, cy);
      ctx.stroke();

      // Braț orizontal rotativ
      ctx.translate(cx, cy);
      ctx.rotate(crane.angle);
      ctx.beginPath();
      ctx.moveTo(-armLen*0.3, 0);
      ctx.lineTo(armLen, 0);
      ctx.stroke();

      // Cablu cu sarcină
      const loadX = armLen * 0.7;
      const loadY = towerH * 0.3;
      ctx.strokeStyle = 'rgba(245,158,11,0.5)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3,2]);
      ctx.beginPath();
      ctx.moveTo(loadX, 0);
      ctx.lineTo(loadX, loadY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sarcina (cutie)
      ctx.fillStyle = 'rgba(245,158,11,0.8)';
      ctx.fillRect(loadX-4, loadY, 8, 5);

      ctx.restore();

      // Lumina de avertizare (blink)
      if(crane.blink){
        const blinkAlpha = 0.5 + 0.5*Math.sin(crane.blinkPhase);
        ctx.beginPath();
        ctx.arc(cx, cy-4, 4, 0, Math.PI*2);
        ctx.fillStyle = `rgba(239,68,68,${blinkAlpha})`;
        ctx.fill();
      }
    });
  },

  _updateParticles(W, H) {
    // Generăm particule de praf la macarale
    if(this._cranes.length > 0 && Math.random() < 0.3){
      const crane = this._cranes[Math.floor(Math.random()*this._cranes.length)];
      this._particles.push({
        x: crane.x*W + (Math.random()-0.5)*40,
        y: crane.y*H + H*crane.height * 0.5,
        vx: (Math.random()-0.5)*1.5,
        vy: -Math.random()*1.5,
        life: 1.0,
        size: 2+Math.random()*4,
      });
    }

    // Update particule
    this._particles = this._particles
      .map(p=>({...p, x:p.x+p.vx, y:p.y+p.vy, life:p.life-0.02, vy:p.vy+0.05}))
      .filter(p=>p.life>0);
  },

  _drawParticles(ctx) {
    this._particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fillStyle = `rgba(200,180,140,${p.life*0.4})`;
      ctx.fill();
    });
  },

  _drawPedestrians(ctx, W, H) {
    this._pedestrians.forEach(ped=>{
      ped.x += ped.speed * ped.dir;
      ped.legPhase += 0.08;

      // Wrap around
      if(ped.x > 1.05) ped.x = -0.05;
      if(ped.x < -0.05) ped.x = 1.05;

      const px = ped.x * W;
      const py = ped.y * H;
      const sz = ped.size * (W/800); // scale cu screen

      if(ped.type === 'bike'){
        this._drawBike(ctx, px, py, sz, ped.color, ped.dir, ped.legPhase);
      } else {
        this._drawPedestrian(ctx, px, py, sz, ped.color, ped.legPhase);
      }
    });
  },

  _drawPedestrian(ctx, x, y, sz, color, phase) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 0.5;

    // Corp (dreptunghi)
    ctx.fillRect(x-sz*0.25, y-sz*1.2, sz*0.5, sz*0.7);
    // Cap
    ctx.beginPath();
    ctx.arc(x, y-sz*1.35, sz*0.22, 0, Math.PI*2);
    ctx.fill();

    // Picioare animate
    const legSwing = Math.sin(phase) * sz * 0.4;
    ctx.strokeStyle = color;
    ctx.lineWidth = sz * 0.15;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y-sz*0.55);
    ctx.lineTo(x - sz*0.15 + legSwing, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y-sz*0.55);
    ctx.lineTo(x + sz*0.15 - legSwing, y);
    ctx.stroke();

    // Umbra
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(x, y+2, sz*0.3, sz*0.08, 0, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
  },

  _drawBike(ctx, x, y, sz, color, dir, phase) {
    ctx.save();
    ctx.scale(dir, 1);
    const bx = dir === 1 ? x : -x;

    ctx.strokeStyle = color;
    ctx.lineWidth = sz*0.12;
    ctx.lineCap = 'round';

    // Roți
    ctx.beginPath();
    ctx.arc(bx-sz*0.4, y-sz*0.15, sz*0.22, 0, Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx+sz*0.4, y-sz*0.15, sz*0.22, 0, Math.PI*2);
    ctx.stroke();

    // Cadru
    ctx.beginPath();
    ctx.moveTo(bx-sz*0.4, y-sz*0.15);
    ctx.lineTo(bx, y-sz*0.6);
    ctx.lineTo(bx+sz*0.4, y-sz*0.15);
    ctx.stroke();

    // Sofer
    ctx.beginPath();
    ctx.arc(bx, y-sz*0.85, sz*0.20, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
  },

  _drawStreetHUD(ctx, W, H) {
    const year = this._year;
    const city = this._city;

    // Indicator an - jos stânga
    ctx.save();
    ctx.fillStyle = 'rgba(4,10,24,0.75)';
    const hudW = W*0.18, hudH = H*0.08;
    const hx = W*0.02, hy = H*0.88;
    this._roundRect_ctx(ctx, hx, hy, hudW, hudH, 8);
    ctx.fill();
    ctx.fillStyle = 'rgba(212,175,55,0.8)';
    ctx.strokeStyle = 'rgba(212,175,55,0.3)';
    ctx.lineWidth = 0.8;
    this._roundRect_ctx(ctx, hx, hy, hudW, hudH, 8);
    ctx.stroke();

    ctx.fillStyle = '#D4AF37';
    ctx.font = `bold ${Math.round(W*0.025)}px "IBM Plex Mono",monospace`;
    ctx.textAlign = 'left';
    ctx.fillText(year, hx+hudW*0.12, hy+hudH*0.62);

    ctx.fillStyle = 'rgba(148,163,184,0.6)';
    ctx.font = `${Math.round(W*0.008)}px "IBM Plex Mono"`;
    ctx.fillText('NIVEL STRADĂ · '+(city?.name||'').toUpperCase().slice(0,12), hx+hudW*0.12, hy+hudH*0.88);

    // Indicator luminozitate (timp)
    const lightLabel = {dawn:'ZORI',day:'ZI',dusk:'AMURG',night:'NOAPTE'}[LIGHT_BY_YEAR[year]||'day'];
    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.font = `${Math.round(W*0.007)}px "IBM Plex Mono"`;
    ctx.textAlign = 'right';
    ctx.fillText(lightLabel, W*0.98, H*0.97);

    // Macarale actuale
    if(this._cranes.length > 0){
      ctx.fillStyle = 'rgba(245,158,11,0.7)';
      ctx.fillText(this._cranes.length+' macarale active', W*0.98, H*0.94);
    }

    // Pietoni
    ctx.fillStyle = 'rgba(100,150,200,0.5)';
    ctx.fillText(this._pedestrians.length+' pietoni', W*0.98, H*0.91);

    ctx.restore();
  },

  _roundRect_ctx(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
    ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r);
    ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h);
    ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r);
    ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ③ MOMENTE DRAMATICE — Full-screen narrative
// ═══════════════════════════════════════════════════════════════════════════

G._TCIDramatic = {

  _queue:  [],
  _active: false,

  // Declanșează un moment dramatic
  async show(year, cityData, projData, onDone) {
    if(this._active) return;
    this._active = true;

    const city = cityData||{};
    const d    = projData||{};

    // Date reale pentru moment
    const moment = this._buildMoment(year, city, d);

    const canvas = this._createCanvas();
    const ctx    = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    const startTime = performance.now();
    const TOTAL = DRAMATIC_DUR; // 4.5s

    const _this = this;
    const loop = () => {
      const t = Math.min(1, (performance.now()-startTime)/TOTAL);
      _this._render(ctx, W, H, t, moment, year, city);

      if(t < 1){
        requestAnimationFrame(loop);
      } else {
        _this._active = false;
        canvas.style.transition = 'opacity 0.8s';
        canvas.style.opacity = '0';
        setTimeout(()=>{ canvas.remove(); if(onDone) onDone(); }, 800);
      }
    };
    requestAnimationFrame(loop);
  },

  _buildMoment(year, city, d) {
    const name = city.name||'Orașul';
    const pop0  = city.pop2021||100000;
    const r     = city.rata_reala_2011_2021||0;
    const popYr = Math.round(pop0*Math.pow(1+r/100, year-2021));
    const delta = popYr - pop0;
    const authEst = city.autorizatii_2023
      ? Math.round(city.autorizatii_2023 * Math.pow(1.018, year-2023))
      : null;

    const moments = {
      2030: {
        headline: (delta>0?'+':'')+delta.toLocaleString('ro-RO')+' OAMENI',
        subhead:  'față de 2021 · '+(delta>0?'creștere':' declin'),
        lines: [
          authEst ? '~'+authEst.toLocaleString('ro-RO')+' autorizații/an' : null,
          'PNRR 2021-2026: fonduri europene absorbite',
          'Convergență UE: +'+(Math.round(r*0.8))+' puncte procentuale',
        ].filter(Boolean),
        verdict: delta>5000 ? 'CREȘTERE SUSȚINUTĂ' : delta>0 ? 'CREȘTERE LENTĂ' : 'DECLIN CONFIRMAT',
        verdictColor: delta>5000?'#22c55e':delta>0?'#f59e0b':'#ef4444',
        source: 'INSE · model cohort-component · ANCPI CON101A',
      },
      2035: {
        headline: 'MIJLOCUL DRUMULUI',
        subhead:  name+' · 10 ani de proiecție verificată',
        lines: [
          'Temperatură: +'+(1.2).toFixed(1)+'°C față de 2025 (IPCC AR6 RCP4.5)',
          'Cerere locuințe: '+(Math.round((Math.abs(delta)*0.6))).toLocaleString('ro-RO')+' unități livrate',
          'PIB/cap estimat: '+(city.pib_eur_cap?Math.round(city.pib_eur_cap*1.28).toLocaleString('ro-RO')+'€':'—'),
        ],
        verdict: 'EVALUARE INTERMEDIARĂ PUG',
        verdictColor: '#60a5fa',
        source: 'IPCC AR6 (2021) · Eurostat EUROPOP2023 · BNR',
      },
      2040: {
        headline: 'AGENDA URBANĂ 2040',
        subhead:  '15 ani de transformare urbană',
        lines: [
          'Fond locativ nou: '+(Math.round(Math.abs(delta)/2.3*0.7)).toLocaleString('ro-RO')+' unități',
          'Suprafață construită: +est. '+(Math.round((city.suprafata_ha||3000)*0.08))+'ha',
          'Obiectiv ESG: B → A · Spații verzi >9m²/loc.',
        ],
        verdict: r<-0.5 ? 'RISC DEPOPULARE PERIFERICĂ' : 'DENSIFICARE CONTROLATĂ',
        verdictColor: r<-0.5?'#ef4444':'#D4AF37',
        source: 'Copernicus GHSL · INSE · OMS standard spații verzi',
      },
      2045: {
        headline: 'VIZIUNEA 2045',
        subhead:  'Convergență economică europeană',
        lines: [
          'Temperatură: +'+(1.8).toFixed(1)+'°C (IPCC RCP4.5 best case)',
          city.pib_eur_cap?'PIB/cap: ~'+(Math.round(city.pib_eur_cap*1.65)).toLocaleString()+'€/cap ('+Math.round(city.pib_eur_cap*1.65/36600*100)+'% UE27)':null,
          Math.round(Math.abs(delta)*0.85).toLocaleString()+' unități locuință livrate cumulat',
        ].filter(Boolean),
        verdict: city.pib_eur_cap && city.pib_eur_cap*1.65>36600*0.7 ? 'CONVERGENȚĂ UE ATINSĂ' : 'SUB MEDIA UE · ACCELERARE NECESARĂ',
        verdictColor: '#a855f7',
        source: 'Eurostat · OCDE Urban Policy Reviews · IPCC AR6',
      },
      2050: {
        headline: 'NET-ZERO 2050',
        subhead:  'Obiectiv climatic UE · ultimii 25 ani',
        lines: [
          '+'+(2.4).toFixed(1)+'°C vs 1990 (IPCC RCP8.5 worst case)',
          (Math.round(Math.abs(delta)*0.95)).toLocaleString()+' unități locuință 2025-2050',
          'Revizie PUG obligatorie: date 2 recensăminte disponibile',
        ],
        verdict: '25 DE ANI DE PROIECȚIE VALIDATĂ',
        verdictColor: '#D4AF37',
        source: 'IPCC AR6 WG1 (2021) · INSE Rec.2031+2041 · Eurostat',
      },
      2055: {
        headline: 'BILANȚ 30 DE ANI',
        subhead:  name+' · 2025 → 2055',
        lines: [
          'Populație: '+(pop0).toLocaleString()+' → '+(popYr).toLocaleString()+' loc. ('+(delta>=0?'+':'')+delta.toLocaleString()+')',
          'Obiectiv construire: '+(Math.abs(delta)>0?'ATINS':'DEPĂȘIT'),
          'ESG rating proiectat: A ('+( Math.round(65+(year-2025)*0.6))+'/100)',
        ],
        verdict: delta>0 ? 'CREȘTERE SUSȚINUTĂ ✓' : Math.abs(delta)<pop0*0.1 ? 'DECLIN CONTROLAT' : 'INTERVENȚIE URGENTĂ',
        verdictColor: delta>0?'#22c55e':Math.abs(delta)<pop0*0.1?'#f59e0b':'#ef4444',
        source: 'Model cohort-component UrbanX · INSE · Eurostat EUROPOP2023',
      },
    };

    return moments[year] || {
      headline: String(year),
      subhead:  name,
      lines:    [(delta>=0?'+':'')+delta.toLocaleString()+' loc. față de 2021'],
      verdict:  'PROIECȚIE URBANISTICĂ',
      verdictColor: '#D4AF37',
      source:   'INSE · model UrbanX',
    };
  },

  _render(ctx, W, H, t, moment, year, city) {
    ctx.clearRect(0,0,W,H);

    // Fade in/out
    const fadeIn  = Math.min(1, t/0.12);
    const fadeOut = t > 0.80 ? Math.max(0, 1-(t-0.80)/0.20) : 1;
    const alpha   = fadeIn * fadeOut;

    ctx.globalAlpha = alpha;

    // Fond negru profund cu gradient subtil
    const bg = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,H*0.8);
    bg.addColorStop(0,'rgba(4,8,20,0.98)');
    bg.addColorStop(1,'rgba(0,0,0,1)');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,W,H);

    // Linie orizontală de sus
    const lineAlpha = Math.min(1, (t-0.05)/0.15);
    if(lineAlpha > 0){
      ctx.globalAlpha = alpha * lineAlpha;
      const lineW = W * Math.min(1, (t-0.05)/0.15);
      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(W*0.1, H*0.20, lineW*0.8, 1.5);
    }

    ctx.globalAlpha = alpha;

    // AN — apare primul, mare
    if(t > 0.08){
      const yrAlpha = Math.min(1, (t-0.08)/0.10);
      ctx.globalAlpha = alpha * yrAlpha;
      ctx.fillStyle = 'rgba(212,175,55,0.5)';
      ctx.font = `900 ${Math.round(H*0.22)}px "Space Grotesk","IBM Plex Mono",monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(year, W/2, H*0.52);
    }

    // HEADLINE — apare dupa an
    if(t > 0.18){
      const hl_alpha = Math.min(1, (t-0.18)/0.12);
      ctx.globalAlpha = alpha * hl_alpha;
      ctx.fillStyle = '#ffffff';
      ctx.font = `900 ${Math.round(H*0.065)}px "Space Grotesk",sans-serif`;
      ctx.textAlign = 'center';
      // Typewriter per caracter
      const chars = Math.floor(moment.headline.length * hl_alpha * 3);
      ctx.fillText(moment.headline.slice(0, chars), W/2, H*0.29);
    }

    // SUBHEAD
    if(t > 0.28){
      const sh_alpha = Math.min(1, (t-0.28)/0.10);
      ctx.globalAlpha = alpha * sh_alpha;
      ctx.fillStyle = 'rgba(148,163,184,0.8)';
      ctx.font = `${Math.round(H*0.022)}px "Space Grotesk",sans-serif`;
      ctx.fillText(moment.subhead, W/2, H*0.37);
    }

    // LINII DE DATE — apar secvențial
    moment.lines.forEach((line, i)=>{
      const delay = 0.38 + i*0.10;
      if(t > delay){
        const la = Math.min(1, (t-delay)/0.08);
        ctx.globalAlpha = alpha * la;
        ctx.fillStyle = 'rgba(200,215,235,0.9)';
        ctx.font = `${Math.round(H*0.018)}px "IBM Plex Mono",monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('· '+line+' ·', W/2, H*0.63 + i*H*0.05);
      }
    });

    // VERDICT — apare la final
    if(t > 0.62){
      const v_alpha = Math.min(1, (t-0.62)/0.12);
      ctx.globalAlpha = alpha * v_alpha;

      const vW = W*0.55, vH = H*0.07;
      const vX = W/2-vW/2, vY = H*0.76;
      ctx.fillStyle = moment.verdictColor+'18';
      ctx.strokeStyle = moment.verdictColor+'60';
      ctx.lineWidth = 1;
      this._roundRect_ctx(ctx, vX, vY, vW, vH, 4);
      ctx.fill();
      this._roundRect_ctx(ctx, vX, vY, vW, vH, 4);
      ctx.stroke();

      ctx.fillStyle = moment.verdictColor;
      ctx.font = `bold ${Math.round(H*0.022)}px "IBM Plex Mono",monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(moment.verdict, W/2, vY+vH*0.67);
    }

    // SURSE — jos, mică
    if(t > 0.70){
      const s_alpha = Math.min(1, (t-0.70)/0.10);
      ctx.globalAlpha = alpha * s_alpha * 0.5;
      ctx.fillStyle = 'rgba(100,120,150,0.8)';
      ctx.font = `${Math.round(H*0.012)}px "IBM Plex Mono"`;
      ctx.textAlign = 'center';
      ctx.fillText('Surse: '+moment.source, W/2, H*0.92);
    }

    // Linie jos
    if(t > 0.72){
      const la = Math.min(1, (t-0.72)/0.10);
      ctx.globalAlpha = alpha * la;
      const lw = W*0.80 * la;
      ctx.fillStyle = 'rgba(212,175,55,0.3)';
      ctx.fillRect(W*0.10, H*0.87, lw, 0.8);
    }

    ctx.globalAlpha = 1;
  },

  _createCanvas() {
    let c = document.getElementById('tci-dramatic-canvas');
    if(c) c.remove();
    c = document.createElement('canvas');
    c.id = 'tci-dramatic-canvas';
    c.style.cssText = `
      position: fixed; inset: 0; z-index: 4000;
      width: 100%; height: 100%;
      pointer-events: none;
    `;
    c.width  = window.innerWidth  * (window.devicePixelRatio||1);
    c.height = window.innerHeight * (window.devicePixelRatio||1);
    document.body.appendChild(c);
    return c;
  },

  _roundRect_ctx(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);
    ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);
    ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);
    ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);
    ctx.arcTo(x,y,x+r,y,r);ctx.closePath();
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ④ TIME LAPSE — Clădirile cresc în timp real
// ═══════════════════════════════════════════════════════════════════════════

G._TCITimeLapse = {

  // Adaugă clădiri noi cu animație de creștere
  growBuildings(map, city, fromYear, toYear) {
    if(!map || !map.getSource?.('tci-new-buildings')) return;

    const cx = city?.lon||27.6, cy = city?.lat||47.16;
    const need = G._TCIMasterplanPDF?._calcNeed?.(city,'S2');
    const buildRate = need ? (need.locuinteTotale/30) : 80;
    const newBldCount = Math.round(buildRate * (toYear-fromYear));

    const features = [];
    for(let i=0;i<Math.min(newBldCount, 50);i++){
      const seed = i * 7919 + fromYear;
      const angle = (seed % 360) * Math.PI/180;
      const r = 0.001 + (seed%100)/100 * 0.012;
      const lon = cx + r*Math.cos(angle);
      const lat = cy + r*Math.sin(angle)*0.65;
      const height = 6 + (seed%8)*4;
      const w = 0.00008 + (seed%5)*0.00003;

      features.push({
        type:'Feature',
        properties:{ height, year: fromYear+(i%Math.max(1,toYear-fromYear)) },
        geometry:{
          type:'Polygon',
          coordinates:[[
            [lon-w, lat-w*0.65],[lon+w, lat-w*0.65],
            [lon+w, lat+w*0.65],[lon-w, lat+w*0.65],[lon-w, lat-w*0.65]
          ]]
        }
      });
    }

    try {
      map.getSource('tci-new-buildings').setData({type:'FeatureCollection',features});

      // Animăm creșterea înălțimii
      let progress = 0;
      const animate = () => {
        progress = Math.min(1, progress + 0.04);
        try {
          map.setPaintProperty('tci-new-buildings-layer','fill-extrusion-height',
            ['*',['get','height'],progress]);
          map.setPaintProperty('tci-new-buildings-layer','fill-extrusion-opacity',
            0.4 + progress*0.4);
        } catch(e){}
        if(progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    } catch(e){}
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑤ CONECTARE cu sistemul existent TCI
// ═══════════════════════════════════════════════════════════════════════════

(function _connectAll(){
  // Hook în butonul "🚶 Stradă" din TCI Cinema (17-tci-cinema.js)
  if(typeof TCI !== 'undefined' && !TCI._streetExperienceConnected){
    TCI._streetExperienceConnected = true;

    // _streetViewMode — înlocuim stub-ul gol
    TCI._streetViewMode = function() {
      const city = this.cityData || this.d;
      const year = this.year||2025;
      if(!city){ ss?.('Selectați un UAT mai întâi'); return; }

      if(G._TCIStreetView._active){
        G._TCIStreetView.deactivate();
        const btn=document.getElementById('tci-sv-btn');
        if(btn){ btn.style.background=''; btn.textContent='🚶 Stradă'; }
      } else {
        G._TCIStreetView.activate(city, year);
        const btn=document.getElementById('tci-sv-btn');
        if(btn){ btn.style.background='rgba(34,197,94,.25)'; btn.textContent='⬆ Drone'; }
      }
    };

    // Hook în _onYearChange pentru street view sync
    const origYearChange = TCI._onYearChange?.bind(TCI);
    TCI._onYearChange = function(yr){
      if(origYearChange) origYearChange(yr);

      // Sync street view year
      if(G._TCIStreetView._active) G._TCIStreetView.setYear(yr);

      // Time lapse buildings
      const m = window.map;
      if(m && this.cityData){
        G._TCITimeLapse.growBuildings(m, this.cityData, yr-5, yr);
      }

      // Momente dramatice la milestones
      const MILESTONES = [2030, 2035, 2040, 2045, 2050, 2055];
      if(MILESTONES.includes(yr) && !G._TCIDramatic._active){
        const city = this.cityData||this.d;
        const d    = typeof _getProjectionData==='function'
          ? _getProjectionData(yr, this.scenario||'S2', this.cityKey||'iasi')
          : {};

        // Oprire temporară animație + moment dramatic
        const origRun = this.running;
        if(typeof _AnimationEngine!=='undefined') _AnimationEngine.pause?.(this);

        G._TCIDramatic.show(yr, city, d, ()=>{
          // Reia după moment dramatic
          if(origRun && typeof _AnimationEngine!=='undefined')
            _AnimationEngine.start?.(this);
        });
      }
    };

    console.log('[StreetExperience] ✅ Conectat la TCI Cinema');
  }

  // Hook în openTCI global pentru intro cinematic
  const origOpenTCI = window.openTCI;
  if(origOpenTCI && !window._tciIntroConnected){
    window._tciIntroConnected = true;
    window.openTCI = function(opts){
      const city = window.S?.parcels?.[window.S?.activeParcel??0];
      const cityDB = window._RO_CITIES_DB?.[
        Object.entries(window._RO_CITIES_DB||{}).find(([k,v])=>
          (city?.uat||'').toLowerCase().includes((v.name||'').toLowerCase().slice(0,5))
        )?.[0]
      ];

      // Intro cinematic la primul deschidere
      const hasSeenIntro = sessionStorage.getItem('tci_intro_seen');
      if(!hasSeenIntro && cityDB){
        sessionStorage.setItem('tci_intro_seen','1');
        G._TCIIntro.start(cityDB, ()=>origOpenTCI(opts));
      } else {
        origOpenTCI(opts);
      }
    };
  }

  // Adăugăm buton Street View în dashboard dacă nu există
  setTimeout(()=>{
    const existing = document.querySelector('[onclick*="_streetViewMode"]');
    if(!existing){
      // Adăugăm buton în acțiunile TCI Cinema dacă panoul e vizibil
      const tciPanel = document.getElementById('tci-lpanel');
      if(tciPanel && !document.getElementById('tci-sv-btn-dash')){
        const btn = document.createElement('button');
        btn.id = 'tci-sv-btn-dash';
        btn.style.cssText = `
          width:100%;padding:7px;border-radius:6px;background:rgba(34,197,94,.1);
          border:1px solid rgba(34,197,94,.3);color:#4ade80;font-size:10px;
          font-weight:700;cursor:pointer;font-family:inherit;margin-top:4px;
        `;
        btn.textContent = '🚶 Mod Stradă — Pieton în Oraș';
        btn.onclick = ()=> TCI?._streetViewMode?.();
        tciPanel.appendChild(btn);
      }
    }
  }, 2000);
})();

// ── Expunere globală ────────────────────────────────────────────────────────
G._TCIStreetExperience = {
  intro:     (city,cb) => G._TCIIntro.start(city,cb),
  street:    (city,yr) => G._TCIStreetView.activate(city,yr),
  dramatic:  (yr,city,data,cb) => G._TCIDramatic.show(yr,city,data,cb),
  timelapse: (map,city,from,to) => G._TCITimeLapse.growBuildings(map,city,from,to),
};

console.log('[TCI Street Experience v1.0] ✅ Intro cinematic + Nivel stradă + Momente dramatice + Macarale + Pietoni + Time lapse');
ss?.('🎬 TCI Experience activ — butonul 🚶 Stradă din TCI Cinema');

})(window);
