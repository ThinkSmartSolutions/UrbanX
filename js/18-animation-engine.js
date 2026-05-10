// ANIMATION ENGINE EXTENSION pentru 17-projection-engine.js
// Adaugat separat pentru a evita probleme de encoding

const _AnimationEngine = {

  ANIM: {
    yearDuration:   15000,
    milestonePause: 20000,
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
    particles:   [],
    buildings:   [],
  },

  totalDuration() {
    const A = this.ANIM;
    const normal = (A.endYear - A.startYear) * A.yearDuration;
    const pauses = A.milestones.length * A.milestonePause;
    return A.introDuration + normal + pauses + A.outroDuration;
    // 12000 + 34*15000 + 7*20000 + 12000 = 12s + 510s + 140s + 12s = 674s ≈ 11.2 min
  },

  start(engine) {
    if(this.state.running) { this.pause(engine); return; }
    this.state.running = true;
    this.state.startTime = performance.now() - this.state.pausedAt;
    if(!this.state.buildings.length) this.initBuildings();
    if(!this.state.particles.length) this.initParticles(60);
    const btn = document.getElementById('tci-play-btn');
    if(btn) btn.textContent = '\u23F8 Pauza';
    this.loop(engine);
  },

  pause(engine) {
    this.state.running = false;
    this.state.pausedAt = performance.now() - this.state.startTime;
    cancelAnimationFrame(this.state.animFrame);
    const btn = document.getElementById('tci-play-btn');
    if(btn) btn.textContent = '\u25B6 Continua';
  },

  reset(engine) {
    this.pause(engine);
    this.state.pausedAt = 0;
    this.state.phase = 'intro';
    this.state.buildings = [];
    this.state.particles = [];
    const btn = document.getElementById('tci-play-btn');
    if(btn) btn.textContent = '\u25B6 Animeaza';
    if(engine) engine.setYear(2021);
  },

  loop(engine) {
    const as = this.state;
    const A  = this.ANIM;
    if(!as.running) return;

    const elapsed = (performance.now() - as.startTime) * as.speed;

    if(elapsed < A.introDuration) {
      engine && this.renderIntro(engine.canvas, engine.ctx, elapsed/A.introDuration, engine);
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
            const mt = (t - A.yearDuration) / A.milestonePause;
            this.renderMilestone(engine.canvas, engine.ctx, yr, mt, engine);
          } else {
            this.renderYearRich(engine.canvas, engine.ctx, yr, t/A.yearDuration, engine);
          }
          found = true;
          break;
        }
        t -= dur;
      }

      if(!found) {
        const ot = Math.min(1, t/A.outroDuration);
        this.renderOutro(engine.canvas, engine.ctx, ot, engine);
        if(ot >= 1) { this.reset(engine); return; }
      }
    }

    as.animFrame = requestAnimationFrame(() => this.loop(engine));
  },

  // ── Initializare cladiri ───────────────────────────────────────────────
  initBuildings() {
    this.state.buildings = [];
    for(let i=0; i<38; i++) {
      const s = i * 1337;
      const existing = i < 14;
      this.state.buildings.push({
        id: i, x: (s%900)/1000 + 0.05,
        width: 0.028 + (s%25)/1000,
        height: 0.07 + (s%18)/100,
        niv: 3 + Math.floor(s%15),
        yearAppear: existing ? 2021 : 2021 + Math.floor((s%340)/10),
        phase: existing ? 1.0 : 0.0,
        constructed: existing,
        hue: s%25,
        fn: ['rez','birouri','mixt','com'][s%4],
      });
    }
  },

  initParticles(n) {
    this.state.particles = Array.from({length:n}, (_,i) => ({
      x: Math.random(), y: 0.66 + Math.random()*0.28,
      speed: 0.0004+Math.random()*0.0009,
      dir: Math.random()<0.5?1:-1,
      type: ['car','car','car','bike','ped'][Math.floor(Math.random()*5)],
      hue: Math.random()*40,
    }));
  },

  // ── INTRO 12s ─────────────────────────────────────────────────────────
  renderIntro(canvas, ctx, t, engine) {
    if(!canvas||!ctx) return;
    const W=canvas.width, H=canvas.height;
    const groundY = H*0.63;

    // Scena 2021
    const d0 = _getProjectionData(2021, engine.currentScenario, engine.currentCity||'iasi');
    this.renderSky(ctx,W,H,groundY,2,0.5,0.8,0,d0);
    this.renderBuildings(ctx,W,H,groundY,0,1.0,d0,0.5);
    this.renderGround(ctx,W,H,groundY,0,2);

    // Fade in
    const fi = Math.min(1, t*2.5);
    ctx.fillStyle = 'rgba(2,6,15,'+(1-fi)+')';
    ctx.fillRect(0,0,W,H);

    if(t>0.12) {
      const ta = Math.min(1,(t-0.12)/0.18) * (t<0.78?1:Math.max(0,(1-t)/0.22));
      const city = _RO_CITIES_DB && _RO_CITIES_DB[engine.currentCityKey] ? _RO_CITIES_DB[engine.currentCityKey] : {name:'Iasi'};
      ctx.textAlign='center';

      ctx.fillStyle='rgba(212,175,55,'+ta+')';
      ctx.font='bold 10px "Space Grotesk",monospace';
      ctx.fillText('TEMPORAL CITY INTELLIGENCE', W/2, H*0.31);

      ctx.fillStyle='rgba(255,255,255,'+(ta*0.95)+')';
      ctx.font='bold 30px "Space Grotesk",monospace';
      ctx.fillText(city.name, W/2, H*0.42);

      ctx.fillStyle='rgba(148,163,184,'+(ta*0.7)+')';
      ctx.font='9px "Space Grotesk"';
      ctx.fillText('Proiectie urbanistica 2021-2055 · Date INSE · Eurostat · ANCPI · IPCC AR6', W/2, H*0.50);

      if(t>0.4) {
        const bt = Math.min(1,(t-0.4)/0.45);
        const bw = (W*0.38)*bt;
        ctx.fillStyle='rgba(212,175,55,'+(ta*0.2)+')';
        ctx.fillRect(W/2-W*0.19,H*0.58,W*0.38,2);
        ctx.fillStyle='rgba(212,175,55,'+(ta*0.9)+')';
        ctx.fillRect(W/2-W*0.19,H*0.58,bw,2);
      }
      ctx.textAlign='left';
    }
  },

  // ── AN COMPLET (15s) ──────────────────────────────────────────────────
  renderYearRich(canvas, ctx, year, t, engine) {
    if(!canvas||!ctx) return;
    const W=canvas.width, H=canvas.height;
    const totalT = (year-2021)/34;
    const groundY = H*0.63;
    const d = _getProjectionData(year, engine.currentScenario, engine.currentCity||'iasi');
    if(!d) return;

    // Anotimpuri si zi/noapte (3 cicluri pe an)
    const season  = (t*2 + totalT*8) % 4;
    const dayT    = (t*6 + totalT*3) % 1;
    const sunH    = Math.max(0, Math.sin(dayT*Math.PI));

    // ── Layere ──────────────────────────────────────────────────────────
    this.renderSky(ctx,W,H,groundY,season,dayT,sunH,totalT,d);
    this.renderBuildings(ctx,W,H,groundY,totalT,t,d,dayT);
    this.renderVegetation(ctx,W,H,groundY,totalT,season,d);
    this.renderHeatmap(ctx,W,H,groundY,totalT,t,d,engine.currentScenario||'S2');
    this.renderTraffic(ctx,W,H,groundY,totalT,dayT,d);
    this.renderInfrastructure(ctx,W,H,groundY,totalT,d);
    this.renderGround(ctx,W,H,groundY,totalT,season);

    // Date overlay (dupa 55% din an)
    if(t>0.55) {
      const da = Math.min(1,(t-0.55)/0.1);
      this.renderDataCard(ctx,W,H,year,d,da);
    }

    // Year overlay permanent
    this.renderYearHUD(ctx,W,H,year,totalT,t,d,engine.currentScenario||'S2');

    // Smooth KPI update
    if(t>0.3 && t<0.95) engine._updateStats && engine._updateStats(d,year);
  },

  // ── CER ──────────────────────────────────────────────────────────────
  renderSky(ctx,W,H,groundY,season,dayT,sunH,totalT,d) {
    const si = Math.floor(season)%4;
    const isNight = dayT<0.15||dayT>0.85;
    const isDusk  = !isNight && (dayT<0.25||dayT>0.75);

    let tc, bc;
    if(isNight) {
      tc=[2,4,10]; bc=[6,12,26];
    } else if(isDusk) {
      const dt = dayT<0.25 ? dayT/0.25 : (1-dayT)/0.25;
      tc=[Math.round(2+28*dt),Math.round(4+28*dt),Math.round(10+48*dt)];
      bc=[Math.round(110+80*dt),Math.round(55+45*dt),Math.round(15+28*dt)];
    } else {
      const palettes = [[30,55,90],[26,95,168],[22+Math.round(totalT*(d?.climate?.deltaT||0)*8),107,155],[68,108,148]];
      bc = palettes[si];
      tc = bc.map((v,i)=>Math.max(0,v-[14,34,48][i]));
    }

    const sg = ctx.createLinearGradient(0,0,0,groundY);
    sg.addColorStop(0,'rgb('+tc.join(',')+')');;
    sg.addColorStop(1,'rgb('+bc.join(',')+')');;
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,groundY);

    // Stele
    if(dayT<0.2||dayT>0.8) {
      const ni = dayT<0.2?(1-dayT/0.2):(dayT-0.8)/0.2;
      const lp = Math.min(0.65, totalT*0.45+0.18);
      const sc = Math.round(100*ni*(1-lp*0.55));
      for(let i=0;i<sc;i++) {
        const sx=(i*1337+totalT*90)%W, sy=(i*983)%(groundY*0.85);
        const br=ni*(0.3+Math.sin(i+Date.now()/3000)*0.18)*(1-lp);
        ctx.fillStyle='rgba(255,255,255,'+br+')';
        ctx.beginPath(); ctx.arc(sx,sy,0.55,0,Math.PI*2); ctx.fill();
      }
    }

    // Soare
    if(sunH>0.08) {
      const sx=W*(0.2+dayT*0.6), sy=groundY*(0.82-sunH*0.72);
      const sr=13+sunH*4;
      const climateHaloMult = 1+totalT*(d?.climate?.deltaT||0)*0.15;
      const hg=ctx.createRadialGradient(sx,sy,sr,sx,sy,sr*2.8*climateHaloMult);
      hg.addColorStop(0,'rgba(255,200,80,'+(0.35*sunH)+')');
      hg.addColorStop(1,'rgba(255,200,80,0)');
      ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(sx,sy,sr*2.8*climateHaloMult,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(255,232,100,'+(Math.min(1,sunH*1.5))+')';
      ctx.beginPath(); ctx.arc(sx,sy,sr,0,Math.PI*2); ctx.fill();
    }

    // Luna
    if(dayT<0.14||dayT>0.86) {
      ctx.fillStyle='rgba(218,225,238,0.88)';
      ctx.beginPath(); ctx.arc(W*0.76,groundY*0.17,9,0,Math.PI*2); ctx.fill();
    }

    // Nori
    const cc=0.28+Math.sin(totalT*7+Date.now()/22000)*0.18;
    for(let i=0;i<Math.round(cc*5);i++) {
      const cx=((Date.now()/75+i*220)%(W+240))-120, cy=groundY*(0.14+(i%3)*0.19);
      const cr=38+(i%3)*18, ca=0.10+cc*0.07;
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,cr);
      cg.addColorStop(0,'rgba(255,255,255,'+ca+')'); cg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(cx,cy,cr,0,Math.PI*2); ctx.fill();
    }
  },

  // ── CLADIRI ──────────────────────────────────────────────────────────
  renderBuildings(ctx,W,H,groundY,totalT,yearT,d,dayT) {
    const year = Math.round(2021+totalT*34);
    const ni = (dayT<0.2||dayT>0.8)?(dayT<0.2?(1-dayT/0.2):(dayT-0.8)/0.2):0;
    const popRatio = (d?.demo?.value||360633)/360633;

    // Grid perspectiva
    ctx.strokeStyle='rgba(56,189,248,0.04)'; ctx.lineWidth=0.4;
    for(let i=0;i<=7;i++) {
      const x=W/7*i;
      ctx.beginPath(); ctx.moveTo(x,H); ctx.lineTo(W/2+x*0.03,groundY); ctx.stroke();
    }

    const sorted = [...this.state.buildings].sort((a,b)=>Math.abs(b.x-0.5)-Math.abs(a.x-0.5));

    sorted.forEach(b => {
      if(b.yearAppear > year) return;
      if(!b.constructed) {
        const ct = (year-b.yearAppear)+yearT;
        b.phase = Math.min(1,ct/2.8);
        if(b.phase>=1) b.constructed=true;
      }
      const ph=b.phase, dep=0.28+Math.abs(b.x-0.5)*0.55;
      const bx=b.x*W, bw=b.width*W*dep;
      const maxBH=b.height*H*dep, bh=maxBH*ph;
      const by=groundY-bh;
      const r=14+b.hue, g=28+Math.floor(b.hue/2), bl=60+b.hue;

      // Shadow
      ctx.fillStyle='rgba('+(r-6)+','+(g-8)+','+(bl-12)+',0.88)';
      ctx.fillRect(bx+bw*0.04,by,bw*0.96,bh);
      // Fatada
      const fg=ctx.createLinearGradient(bx,by,bx+bw,by);
      fg.addColorStop(0,'rgba('+(r+22)+','+(g+28)+','+(bl+42)+',0.93)');
      fg.addColorStop(0.65,'rgba('+(r+10)+','+(g+13)+','+(bl+22)+',0.83)');
      fg.addColorStop(1,'rgba('+r+','+g+','+bl+',0.65)');
      ctx.fillStyle=fg; ctx.fillRect(bx,by,bw,bh);

      // Ferestre
      if(ph>0.48) {
        const wa=Math.min(1,(ph-0.48)*2);
        const lc=ni*0.82*Math.min(1.2,popRatio);
        const rows=Math.floor(bh/8), cols=Math.floor(bw/7);
        for(let row=0;row<rows;row++) {
          for(let col=0;col<cols;col++) {
            const lit=Math.random()<(lc*wa);
            const wx=bx+col*7+2, wy=by+row*8+3;
            if(lit) {
              ctx.fillStyle='rgba(255,218,130,'+(wa*(0.55+ni*0.35))+')';
              ctx.fillRect(wx,wy,4,4);
            } else if(wa>0.3) {
              ctx.fillStyle='rgba(18,38,75,'+(wa*0.35)+')';
              ctx.fillRect(wx,wy,4,4);
            }
          }
        }
      }

      // Schela
      if(ph<0.88&&ph>0.04&&!b.constructed) {
        ctx.strokeStyle='rgba(255,138,0,'+(1-ph)*0.78+')'; ctx.lineWidth=1.4;
        const cx=bx+bw*0.82, cH=bh+bh*0.38;
        ctx.beginPath(); ctx.moveTo(cx,groundY); ctx.lineTo(cx,groundY-cH);
        ctx.lineTo(bx+bw*0.12,groundY-cH); ctx.stroke();
        ctx.fillStyle='rgba(255,138,0,'+(1-ph)*0.55+')';
        ctx.beginPath(); ctx.arc(bx+bw*0.12,groundY-cH+5,2.5,0,Math.PI*2); ctx.fill();
      }
    });
  },

  // ── VEGETATIE ─────────────────────────────────────────────────────────
  renderVegetation(ctx,W,H,groundY,totalT,season,d) {
    const ef=(d?.esg?.E||60)/100;
    const imp=Math.min(0.55,totalT*0.38+0.08);
    const tc=Math.round(10*ef*(1-imp*0.38));
    const si=Math.floor(season)%4;
    const lc=[[45,72,28],[36,155,55],[22,125,38],[152,95,18]][si];
    const la=[0.38,0.88,0.92,0.82][si];

    for(let i=0;i<tc;i++) {
      const s=i*397, tx=W*0.04+(s%(Math.round(W*0.92)));
      const ty=groundY, ts=7+(s%13);
      const tg=11+ts, gf=Math.min(1,totalT*1.8+0.25)*ef;
      ctx.fillStyle='rgba(55,38,18,0.78)';
      ctx.fillRect(tx-1,ty-tg*gf,2,tg*gf);
      const cr=ts*gf;
      if(cr>1.5) {
        const tg2=ctx.createRadialGradient(tx,ty-tg*gf,0,tx,ty-tg*gf,cr);
        tg2.addColorStop(0,'rgba('+lc.join(',')+','+la*0.88+')');
        tg2.addColorStop(1,'rgba('+(lc[0]-8)+','+(lc[1]-18)+','+(lc[2]-8)+',0)');
        ctx.fillStyle=tg2;
        ctx.beginPath(); ctx.arc(tx,ty-tg*gf,cr,0,Math.PI*2); ctx.fill();
      }
    }
  },

  // ── HEATMAP POPULATIE ─────────────────────────────────────────────────
  renderHeatmap(ctx,W,H,groundY,totalT,yearT,d,scenario) {
    const pr=(d?.demo?.value||360633)/360633;
    const pulse=0.5+Math.sin(Date.now()/780)*0.5;
    const bi=Math.min(0.11,(pr-1)*0.18+totalT*0.035+0.015);
    const i2=bi*(0.68+pulse*0.32);
    const hc=scenario==='S1'?'0,195,95':scenario==='S3'?'252,98,48':'98,158,252';
    const hg=ctx.createRadialGradient(W/2,groundY*0.48,0,W/2,groundY*0.48,W*0.52);
    hg.addColorStop(0,'rgba('+hc+','+i2+')');
    hg.addColorStop(0.5,'rgba('+hc+','+(i2*0.28)+')');
    hg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=hg; ctx.fillRect(0,0,W,groundY);
  },

  // ── TRAFIC CU MODAL SPLIT REAL (Eurostat + Pactul Verde UE) ────────────
  renderTraffic(ctx,W,H,groundY,totalT,dayT,d) {
    const year = Math.round(2021+totalT*34);
    // Modal split per an (Eurostat 2021 + trend EU spre 2055)
    const ms = typeof _getModalSplit==='function' ? _getModalSplit(year) : {auto:72,tp:18,bici_ped:10};
    
    // Traficul total creste cu densificarea urbana (dar incetineste cu modal shift)
    const popRatio = (d?.demo?.value||360633)/360633;
    const urbanDensity = Math.min(1.8, popRatio * (d?.urban?.densitateNoua||1650)/1650);
    const totalTraffic = 0.4 + totalT * 0.7 * urbanDensity;
    
    // Congestionare (mai multe masini, aceeasi retea → trafic mai lent)
    const congestion = Math.min(1.0, totalT * 0.6 + (ms.auto/72-1)*0.4 + 0.2);
    const carSpeed = 0.0009 * (1-congestion*0.6); // viteza scade cu congestionarea
    
    const da = dayT>0.25&&dayT<0.75?1:(dayT<0.2||dayT>0.8?0.22:0.58);
    const ni = dayT<0.3||dayT>0.7?1:0;
    
    this.state.particles.forEach((p,i) => {
      // Redistribuire tip particula conform modal split
      const modRand = (i*7919) % 100;
      const effectiveType = modRand < ms.auto ? 'car' : modRand < ms.auto+ms.tp ? 'bus' : 'bike';
      
      // Viteza diferita per tip
      const speed = effectiveType==='car'  ? carSpeed :
                    effectiveType==='bus'  ? carSpeed*0.7 : carSpeed*1.2;
      
      p.x += speed * p.dir * totalTraffic;
      if(p.x>1.05) p.x=-0.05;
      if(p.x<-0.05) p.x=1.05;
      
      const px=p.x*W, py=groundY+(p.y-0.65)*H;
      const al=da*(0.5+Math.sin(p.x*25)*0.18);
      if(al<0.04) return;
      
      if(effectiveType==='car') {
        // Culoare variaza: masini noi electrice (mai luminoase) spre 2050
        const evRatio = Math.min(0.8, totalT * 0.7); // 0→80% EV in 2055
        const carBrightness = Math.round(105 + evRatio*30);
        if(ni>0.35) {
          // Faruri (alb-galbui noaptea)
          ctx.fillStyle='rgba(255,235,145,'+(al*0.85)+')';
          ctx.fillRect(px-1,py-1,p.dir>0?6:-6,2);
          // Stopuri (rosu)
          ctx.fillStyle='rgba(255,60,60,'+(al*0.5)+')';
          ctx.fillRect(px+(p.dir>0?-4:4),py-1,2,2);
        } else {
          ctx.fillStyle='rgba('+carBrightness+','+(carBrightness-5)+',135,'+(al*0.65)+')';
          ctx.fillRect(px-2,py-2,8,4);
        }
        // Semn de congestionare (rosu) daca trafic dens
        if(congestion>0.6 && Math.random()<0.05) {
          ctx.fillStyle='rgba(239,68,68,0.6)';
          ctx.fillRect(px,py-6,4,3);
        }
      } else if(effectiveType==='bus') {
        // Transport public: autobuz / tramvai (apare progresiv dupa 2025)
        if(totalT < 0.05) return; // nu exista inainte de 2023
        const busAlpha = Math.min(1, (totalT-0.05)/0.3) * al;
        // Culoare linie transport (galben=autobuz, rosu=tramvai, albastru=metro)
        const busColor = ms.tp>30?'52,130,246':ms.tp>22?'220,38,38':'234,179,8';
        ctx.fillStyle='rgba('+busColor+','+(busAlpha*0.75)+')';
        ctx.fillRect(px-3,py-3,12,6); // mai lat decat masina
        if(ni>0.4) {
          ctx.fillStyle='rgba(255,255,200,'+(busAlpha*0.6)+')';
          ctx.fillRect(px,py-2,2,4);
          ctx.fillRect(px+8,py-2,2,4);
        }
      } else {
        // Biciclist / pieton (creste cu ESG Social)
        const esgS = d?.esg?.S || 60;
        const bikeAlpha = Math.min(1, (esgS-50)/40) * al;
        if(bikeAlpha<0.05) return;
        ctx.fillStyle='rgba(52,185,80,'+(bikeAlpha*0.7)+')';
        ctx.beginPath(); ctx.arc(px,py,1.5,0,Math.PI*2); ctx.fill();
      }
    });
    
    // Afisam modal split ca mini-bar (jos-stanga)
    if(totalT>0.1) {
      const barX=8, barY=groundY+8, barW=60, barH=6;
      ctx.fillStyle='rgba(4,10,24,0.7)';
      ctx.fillRect(barX-2,barY-2,barW+4,barH+10);
      // Auto (gri)
      const autoW=Math.round(barW*ms.auto/100);
      ctx.fillStyle='rgba(148,163,184,0.8)'; ctx.fillRect(barX,barY,autoW,barH);
      // Transport public (albastru/rosu)
      const tpW=Math.round(barW*ms.tp/100);
      ctx.fillStyle='rgba(52,130,246,0.8)'; ctx.fillRect(barX+autoW,barY,tpW,barH);
      // Biciclete/pietoni (verde)
      const bpW=barW-autoW-tpW;
      ctx.fillStyle='rgba(34,197,94,0.8)'; ctx.fillRect(barX+autoW+tpW,barY,bpW,barH);
      // Label
      ctx.fillStyle='rgba(148,163,184,0.7)'; ctx.font='6px monospace'; ctx.textAlign='left';
      ctx.fillText(ms.auto+'% auto · '+ms.tp+'% TP · '+ms.bici_ped+'% bici/ped',barX,barY+barH+5);
    }
  },

  // ── INFRASTRUCTURA ─────────────────────────────────────────────────────
  renderInfrastructure(ctx,W,H,groundY,totalT,d) {
    if(totalT<0.18) return;
    const ia=Math.min(0.58,(totalT-0.18)*1.9);
    ctx.strokeStyle='rgba(52,185,248,'+ia+')'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,groundY+5); ctx.lineTo(W,groundY+5); ctx.stroke();
    const ns=Math.round(3+totalT*3);
    for(let i=0;i<ns;i++) {
      const sx=W/(ns+1)*(i+1);
      ctx.fillStyle='rgba(52,185,248,'+(ia*0.92)+')';
      ctx.beginPath(); ctx.arc(sx,groundY+5,3+totalT*2,0,Math.PI*2); ctx.fill();
      if(totalT>0.38) {
        ctx.fillStyle='rgba(255,255,255,'+(ia*0.55)+')';
        ctx.font='6px monospace'; ctx.textAlign='center';
        ctx.fillText('S'+(i+1),sx,groundY+17); ctx.textAlign='left';
      }
    }
    if(d?.esg?.S>63&&totalT>0.28) {
      const ba=Math.min(0.38,((d.esg.S-63)/37)*0.48);
      ctx.strokeStyle='rgba(30,195,88,'+ba+')'; ctx.lineWidth=1;
      ctx.setLineDash([8,4]);
      ctx.beginPath(); ctx.moveTo(0,groundY+2); ctx.lineTo(W,groundY+2); ctx.stroke();
      ctx.setLineDash([]);
    }
  },

  // ── SOL ──────────────────────────────────────────────────────────────
  renderGround(ctx,W,H,groundY,totalT,season) {
    const si=Math.floor(season)%4;
    const snow=si===0?Math.min(0.75,0.45+Math.sin(totalT*2)*0.28):0;
    const imp=Math.min(0.65,totalT*0.38+0.14);
    const bd=Math.round(14+imp*14);
    const gg=ctx.createLinearGradient(0,groundY,0,H);
    gg.addColorStop(0,'rgb('+(bd+7)+','+(bd+13)+','+(bd+21)+')');
    gg.addColorStop(1,'rgb('+bd+','+(bd+4)+','+(bd+8)+')');
    ctx.fillStyle=gg; ctx.fillRect(0,groundY,W,H-groundY);
    if(snow>0.08) { ctx.fillStyle='rgba(238,244,255,'+(snow*0.38)+')'; ctx.fillRect(0,groundY,W,3); }
    ctx.strokeStyle='rgba(52,185,248,0.038)'; ctx.lineWidth=0.4;
    for(let i=0;i<=6;i++) {
      const x=W/6*i;
      ctx.beginPath(); ctx.moveTo(x,H); ctx.lineTo(W/2+x*0.04,groundY); ctx.stroke();
    }
  },

  // ── DATA CARD ─────────────────────────────────────────────────────────
  renderDataCard(ctx,W,H,year,d,alpha) {
    const cx=W-172, cy=8, cw=164, ch=58;
    ctx.save(); ctx.globalAlpha=alpha;
    ctx.fillStyle='rgba(4,10,24,0.88)';
    ctx.beginPath(); ctx.roundRect(cx,cy,cw,ch,6); ctx.fill();
    ctx.strokeStyle='rgba(212,175,55,0.32)'; ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.roundRect(cx,cy,cw,ch,6); ctx.stroke();
    ctx.fillStyle='rgba(212,175,55,0.82)'; ctx.font='bold 9px "Space Grotesk"';
    ctx.fillText('DATE '+year,cx+8,cy+13);
    const pop=d?.demo?.value||0, delta=d?.demo?.delta||0;
    const items=[
      ['Populatie',pop.toLocaleString()+' loc.', delta>=0?'#22c55e':'#ef4444'],
      ['Autorizatii/an',(d?.housing?.cerereAnuala||0).toString(),'#f59e0b'],
      ['PIB/cap','EUR '+(d?.housing?.pibCapProj||0).toLocaleString(),'#22c55e'],
    ];
    items.forEach(([l,v,c],i)=>{
      ctx.fillStyle='rgba(148,163,184,0.78)'; ctx.font='7.5px "Space Grotesk"';
      ctx.fillText(l+':',cx+8,cy+23+i*11);
      ctx.fillStyle=c; ctx.font='bold 7.5px "Space Grotesk"';
      ctx.fillText(v,cx+88,cy+23+i*11);
    });
    ctx.restore();
  },

  // ── HUD (heads-up display) ─────────────────────────────────────────────
  renderYearHUD(ctx,W,H,year,totalT,yearT,d,scenario) {
    ctx.textAlign='left';
    ctx.fillStyle='rgba(212,175,55,'+(0.07+Math.sin(yearT*Math.PI)*0.04)+')';
    ctx.font='bold '+Math.round(H*0.19)+'px "Space Grotesk",monospace';
    ctx.fillText(year,10,H*0.5);

    const barY=H-25;
    ctx.fillStyle='rgba(4,10,24,0.72)'; ctx.fillRect(0,barY,W,25);
    ctx.fillStyle='rgba(212,175,55,0.14)'; ctx.fillRect(0,barY,W*totalT,3);
    ctx.fillStyle='rgba(212,175,55,0.82)'; ctx.fillRect(0,barY,W*(totalT+yearT*(1/34)),3);

    ctx.textAlign='center';
    ctx.fillStyle='rgba(212,175,55,0.92)'; ctx.font='bold 10px "Space Grotesk"';
    ctx.fillText(year,W/2,barY+18);
    ctx.fillStyle='rgba(148,163,184,0.58)'; ctx.font='7.5px "Space Grotesk"';
    ctx.fillText(scenario+' · INSE · Eurostat · ANCPI · IPCC AR6',W/2,barY+10);
    ctx.textAlign='left';
  },

  // ── MILESTONE ─────────────────────────────────────────────────────────
  renderMilestone(canvas,ctx,year,t,engine) {
    if(!canvas||!ctx) return;
    const W=canvas.width,H=canvas.height;
    const totalT=(year-2021)/34;
    const d=_getProjectionData(year,engine.currentScenario||'S2',engine.currentCity||'iasi');

    this.renderSky(ctx,W,H,H*0.63,2,0.5,0.8,totalT,d);
    this.renderBuildings(ctx,W,H,H*0.63,totalT,1,d,0.5);
    this.renderVegetation(ctx,W,H,H*0.63,totalT,2,d);
    this.renderGround(ctx,W,H,H*0.63,totalT,2);

    const ci=Math.min(1,t*3.5), co=t>0.78?Math.max(0,(1-t)/0.22):1;
    const al=ci*co;
    ctx.fillStyle='rgba(2,6,15,'+(al*0.62)+')'; ctx.fillRect(0,0,W,H);
    if(al<0.08) return;

    const cw=Math.min(500,W*0.74), ch=248;
    const cx=W/2-cw/2, cy=H/2-ch/2;
    ctx.save(); ctx.globalAlpha=al;
    ctx.shadowColor='rgba(212,175,55,0.28)'; ctx.shadowBlur=38;
    ctx.fillStyle='rgba(4,10,24,0.97)';
    ctx.beginPath(); ctx.roundRect(cx,cy,cw,ch,12); ctx.fill();
    ctx.shadowBlur=0;
    ctx.strokeStyle='rgba(212,175,55,0.55)'; ctx.lineWidth=0.8;
    ctx.beginPath(); ctx.roundRect(cx,cy,cw,ch,12); ctx.stroke();
    ctx.fillStyle='rgba(212,175,55,'+al+')'; ctx.fillRect(cx+18,cy,cw-36,2);

    ctx.textAlign='center';
    ctx.fillStyle='rgba(212,175,55,'+al+')'; ctx.font='bold 46px "Space Grotesk",monospace';
    ctx.fillText(year,W/2,cy+63);

    const mt=this.getMilestoneText(year,d,engine.currentCity||'iasi');
    ctx.fillStyle='rgba(255,255,255,'+(al*0.93)+')'; ctx.font='bold 13px "Space Grotesk"';
    ctx.fillText(mt.title,W/2,cy+88);

    ctx.fillStyle='rgba(148,163,184,'+(al*0.82)+')'; ctx.font='9.5px "Space Grotesk"';
    const wds=mt.body.split(' ');
    let ln='',lns=[],mw=cw-55;
    wds.forEach(w=>{const tt=ln+w+' ';if(ctx.measureText(tt).width>mw&&ln){lns.push(ln);ln=w+' ';}else ln=tt;});
    lns.push(ln);
    lns.forEach((l,i)=>ctx.fillText(l.trim(),W/2,cy+104+i*15));

    const ky=cy+ch-58;
    ctx.fillStyle='rgba(255,255,255,0.04)'; ctx.fillRect(cx+14,ky-7,cw-28,47);
    const kpis=[
      {l:'Populatie',v:(d?.demo?.value||0).toLocaleString(),u:'loc.',c:'#8b5cf6'},
      {l:'PIB/cap',v:'EUR '+((d?.housing?.pibCapProj||0)/1000).toFixed(0)+'k',u:'',c:'#22c55e'},
      {l:'ESG',v:d?.esg?.rating||'B',u:'rating',c:'#D4AF37'},
      {l:'Temp.',v:'+'+(d?.climate?.deltaT||0),u:'°C IPCC',c:'#ef4444'},
    ];
    const kw=(cw-36)/kpis.length;
    kpis.forEach((k,i)=>{
      const kx=cx+18+i*kw+kw/2;
      ctx.fillStyle='rgba(148,163,184,'+(al*0.58)+')'; ctx.font='7.5px "Space Grotesk"';
      ctx.fillText(k.l,kx,ky);
      ctx.fillStyle=k.c; ctx.font='bold 15px "Space Grotesk"';
      ctx.fillText(k.v,kx,ky+17);
      ctx.fillStyle='rgba(148,163,184,'+(al*0.48)+')'; ctx.font='6.5px "Space Grotesk"';
      ctx.fillText(k.u,kx,ky+29);
    });
    ctx.fillStyle='rgba(96,116,148,'+(al*0.48)+')'; ctx.font='6.5px "Space Grotesk"';
    ctx.fillText('Surse: INSE · Eurostat Urban Audit · ANCPI · BNR · IPCC AR6 (2021)',W/2,cy+ch-9);
    ctx.textAlign='left';
    ctx.restore();
  },

  getMilestoneText(year,d,cityKey) {
    const city=_RO_CITIES_DB&&_RO_CITIES_DB[cityKey]?_RO_CITIES_DB[cityKey]:{name:'Iasi'};
    const nm=city.name||'Iasi';
    const pd=d?.demo?.delta||0;
    const texts={
      2025:{title:'Punctul de plecare — '+nm+' 2025',body:'Starea actuala: '+((city.pop2021||360633)).toLocaleString()+' locuitori (INSE 2021). Rata reala de evolutie 2011-2021: '+(city.rata_reala_2011_2021||0).toFixed(1)+'%/an. Modelele de proiectie sunt calibrate pe aceste date reale.'},
      2030:{title:'Primul deceniu — bilant 2030',body:'Efectele PNRR 2021-2026 sunt vizibile. '+(Math.abs(d?.housing?.stockNou||0)).toLocaleString()+' locuinte noi autorizate. Convergenta UE: '+(d?.euConvergence||74)+'% din PIB/cap mediu. Temperatura + '+(d?.climate?.deltaT||0.8)+'C vs 1990 (ANM/IPCC).'},
      2035:{title:'Jumatatea perioadei — transformare vizibila',body:'Demografic: '+(pd>=0?'+':'')+pd.toLocaleString()+' loc. vs 2021 (model Cohort-Survival Eurostat 2022). '+(d?.climate?.heatDays||18)+' zile caniculare/an (ANM prognoza). ESG urban: '+(d?.esg?.rating||'B')+' ('+((d?.esg?.total||60))+'/100).'},
      2040:{title:'Orizontul 2040 — agenda urbana',body:'Strategia Nationala Locuire si-a atins tintele. ESG: '+(d?.esg?.rating||'B')+'. Spatii verzi necesare: '+(d?.climate?.greenNeeded||22)+' mp/loc (OMS adaptare climatica). Convergenta EU: '+(d?.euConvergence||92)+'%.'},
      2045:{title:'Viziunea 2045 — urbanism de calitate',body:'PIB/cap estimat: EUR '+(d?.housing?.pibCapProj||25000).toLocaleString()+' (model Mankiw-Romer-Weil + Eurostat). Temperatura medie: '+(d?.climate?.tempProj||13.4)+'C. Presiunea pe infrastructura si spatii verzi este maxima.'},
      2050:{title:'Decarbonizare 2050 — obiectiv european',body:'Pactul European pentru Clima: orizont net-zero. Impact climatic: +'+(d?.climate?.deltaT||2.8)+'C vs 1990 (IPCC AR6 '+(d?.climate?.scenario||'RCP85')+'). '+(d?.climate?.heatDays||26)+' zile caniculare/an. Adaptarea urbana este esentiala.'},
      2055:{title:'Bilantul final — 34 ani de proiectie',body:'Variatie populatie: '+(pd>=0?'+':'')+pd.toLocaleString()+' loc. Convergenta EU: '+(d?.euConvergence||97)+'%. ESG: '+(d?.esg?.rating||'A')+' ('+d?.esg?.total+'/100). Proiectie pe date INSE, Eurostat, ANCPI, BNR, IPCC AR6 si modele academice citate.'},
    };
    return texts[year]||{title:'Proiectie '+year,body:'Analiza urbanistica continua.'};
  },

  // ── OUTRO ─────────────────────────────────────────────────────────────
  renderOutro(canvas,ctx,t,engine) {
    if(!canvas||!ctx) return;
    const W=canvas.width,H=canvas.height;
    const d=_getProjectionData(2055,engine.currentScenario||'S2',engine.currentCity||'iasi');
    this.renderSky(ctx,W,H,H*0.63,2,0.6,0.8,1,d);
    this.renderBuildings(ctx,W,H,H*0.63,1,1,d,0.6);
    this.renderGround(ctx,W,H,H*0.63,1,2);
    const fo=t>0.72?(t-0.72)/0.28:0;
    ctx.fillStyle='rgba(2,6,15,'+fo+')'; ctx.fillRect(0,0,W,H);
    const al=Math.min(1,t*2.8)*(t<0.65?1:Math.max(0,(0.7-t)/0.05));
    if(al>0.05) {
      ctx.save(); ctx.globalAlpha=al; ctx.textAlign='center';
      ctx.fillStyle='#D4AF37'; ctx.font='bold 20px "Space Grotesk"';
      const city=_RO_CITIES_DB&&_RO_CITIES_DB[engine.currentCityKey]?_RO_CITIES_DB[engine.currentCityKey]:{name:'Iasi'};
      ctx.fillText(city.name+' 2055 — Proiectie completa',W/2,H*0.3);
      ctx.fillStyle='rgba(148,163,184,0.8)'; ctx.font='10px "Space Grotesk"';
      ctx.fillText('Cohort-Survival (Eurostat) · Mankiw-Romer-Weil · Cellular Automata · IPCC AR6',W/2,H*0.38);
      ctx.fillText('INSE · Eurostat Urban Audit · ANCPI · BNR · ANM Romania',W/2,H*0.44);
      ctx.fillStyle='rgba(212,175,55,0.5)'; ctx.font='8px "Space Grotesk"';
      ctx.fillText('UrbanX Temporal City Intelligence — proiectie urbanistica bazata pe date statistice oficiale',W/2,H*0.52);
      ctx.restore();
    }
  },
};

// ── Conectam AnimationEngine la _ProjectionEngine ─────────────────────────
if(typeof _ProjectionEngine !== 'undefined') {
  _ProjectionEngine._AE = _AnimationEngine;

  // Override startAnimation sa foloseasca noul engine
  _ProjectionEngine.startAnimation = function() {
    if(!this.canvas || !this.ctx) { this.open(); setTimeout(()=>this.startAnimation(),600); return; }
    _AnimationEngine.state.speed = parseFloat(document.getElementById('tci-speed')?.value || '1') / 15; // normalizat la noul timing
    _AnimationEngine.start(this);
  };

  _ProjectionEngine.stopAnimation = function() {
    _AnimationEngine.reset(this);
  };

  _ProjectionEngine.pauseAnimation = function() {
    _AnimationEngine.pause(this);
  };

  _ProjectionEngine.togglePlay = function() {
    if(_AnimationEngine.state.running) _AnimationEngine.pause(this);
    else _AnimationEngine.start(this);
  };

  // Override _renderCanvas sa foloseasca renderYearRich cand animatia e oprita
  _ProjectionEngine._renderCanvas = function() {
    if(!this.canvas||!this.ctx) return;
    const totalT = (this.currentYear-2021)/34;
    const d = _getProjectionData(this.currentYear, this.currentScenario, this.currentCity||'iasi');
    if(!d) return;
    _AnimationEngine.renderSky(this.ctx,this.canvas.width,this.canvas.height,this.canvas.height*0.63,2,0.5,0.8,totalT,d);
    _AnimationEngine.renderBuildings(this.ctx,this.canvas.width,this.canvas.height,this.canvas.height*0.63,totalT,1.0,d,0.5);
    _AnimationEngine.renderVegetation(this.ctx,this.canvas.width,this.canvas.height,this.canvas.height*0.63,totalT,2,d);
    _AnimationEngine.renderHeatmap(this.ctx,this.canvas.width,this.canvas.height,this.canvas.height*0.63,totalT,1,d,this.currentScenario);
    _AnimationEngine.renderTraffic(this.ctx,this.canvas.width,this.canvas.height,this.canvas.height*0.63,totalT,0.5,d);
    _AnimationEngine.renderGround(this.ctx,this.canvas.width,this.canvas.height,this.canvas.height*0.63,totalT,2);
    _AnimationEngine.renderYearHUD(this.ctx,this.canvas.width,this.canvas.height,this.currentYear,totalT,0.5,d,this.currentScenario);
    this._updateStats(d, this.currentYear);
  };

  // Update speed selector values pentru noul timing
  window.addEventListener('DOMContentLoaded',()=>{
    const sel = document.getElementById('tci-speed');
    if(sel) {
      sel.innerHTML = '<option value="1">1x (11 min)</option><option value="2">2x (5.5 min)</option><option value="4">4x (2.8 min)</option><option value="8">8x (1.4 min)</option>';
    }
  });

  // Total duration info
  const totalMin = Math.round(_AnimationEngine.totalDuration() / 60000);
  console.log('[TCI] Animatie totala: ~' + totalMin + ' minute');
}
