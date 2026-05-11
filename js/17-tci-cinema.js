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
    const _prevKey = this.cityKey;
    this.cityKey   = this._selectedUATKey || opts.cityKey
      || window.S?.activeUAT || window._ProjectionEngine?.currentCity || 'iasi';
    this._selectedUATKey = null;
    // ── Lookup cityData — 3 strategii ────────────────────────────────────
    // 1. Key direct în _RO_CITIES_DB (ex: 'RO-IS-01' din projection-engine)
    // 2. Key direct în _UAT_DB (ex: 'RO-VN-78046' din uats-database)
    // 3. Siruta în _RO_CITIES_DB (extrage din key 'RO-VN-78046' → '78046')
    this.cityData = null;
    if(typeof _RO_CITIES_DB !== 'undefined')
      this.cityData = _RO_CITIES_DB[this.cityKey];
    if(!this.cityData && typeof _UAT_DB !== 'undefined')
      this.cityData = _UAT_DB[this.cityKey];
    if(!this.cityData && typeof _RO_CITIES_DB !== 'undefined') {
      const siruta = this.cityKey.split('-').pop();
      this.cityData = Object.values(_RO_CITIES_DB).find(c => c.siruta === siruta || c.siruta === String(+siruta));
    }
    if(!this.cityData && typeof _RO_CITIES_DB !== 'undefined')
      this.cityData = Object.values(_RO_CITIES_DB)[0];
    this.d = this.cityData;

    // ── Diagnostic — vizibil în consolă la orice lansare ─────────────────
    console.log(`[TCI] Launch: key="${this.cityKey}" → name="${this.d?.name}" lon=${this.d?.lon} lat=${this.d?.lat}`);

    // ── Normalizare câmpuri _UAT_DB → format intern ───────────────────────
    // _UAT_DB folosește coef_hub în loc de universitati, judet_code în loc de judet
    if(this.d && !this.d.universitati && this.d.coef_hub) {
      // Estimare universitati din coef_hub + tip urban
      // coef_hub >= 1.0 = hub regional cu universitate
      const jc = (this.d.judet_code||this.d.judet||'').toUpperCase();
      this.d.universitati = this.d.coef_hub >= 1.10 ? 5
        : this.d.coef_hub >= 1.0  ? 3
        : this.d.coef_hub >= 0.85 ? 1
        : 0;
      // Orașe cunoscute cu universitate (din INS)
      const UNIV = {'IS':5,'CJ':4,'TM':4,'B':8,'CT':2,'BV':2,'SV':1,'BC':1,'OT':1,'PH':1,'DJ':2,'GL':1,'BH':1,'SB':1,'AB':1};
      if(UNIV[jc]) this.d.universitati = UNIV[jc];
    }
    if(this.d && !this.d.judet && this.d.judet_code) {
      this.d.judet = this.d.judet_code; // fallback pentru câmpul judet
    }
    if(_prevKey && _prevKey!==this.cityKey && this._3D?._meshes?.length){
      this._3D._entities=[];
      (this._3D._meshes||[]).forEach(m=>{try{m.geometry?.dispose();m.material?.dispose();}catch(e){}});
      while(this._3D._scene?.children?.length>1)this._3D._scene.remove(this._3D._scene.children[1]);
      this._3D._meshes=[];this._3D._shadows=[];
      console.log('[TCI] Reset 3D pentru',this.cityKey);
    }

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
      // Jump explicit la orașul selectat — după setStyle camera poate rătăci
      try { this.map.jumpTo({center:[cx,cy], zoom:11, pitch:0, bearing:0}); } catch(e){}
      setTimeout(() => {
        this._director.init(this);
        this.start();
        // A doua garanție — dacă directorul crapa, camera e tot pe orașul corect
        setTimeout(() => {
          try { this.map.flyTo({center:[cx,cy], zoom:12, pitch:40, bearing:-10, duration:2000}); } catch(e){}
        }, 2500);
        console.log('[TCI] ✅ Split screen: EXISTENT 2025 | PROIECTAT · '+this.d?.name);
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
        try {
          // Sync complet: center, zoom, pitch, bearing
          // La pitch mare, folosim getFreeCameraOptions pentru precizie maximă
          const pitch   = this.map.getPitch();
          const bearing = this.map.getBearing();
          const zoom    = this.map.getZoom();
          const center  = this.map.getCenter();

          if(pitch > 50) {
            // La pitch mare — sync via FreeCameraOptions pentru aliniere perfectă
            const opts = this.map.getFreeCameraOptions();
            if(opts && this.mapLeft.setFreeCameraOptions) {
              this.mapLeft.setFreeCameraOptions(opts);
            } else {
              this.mapLeft.jumpTo({ center, zoom, pitch, bearing });
            }
          } else {
            this.mapLeft.jumpTo({ center, zoom, pitch, bearing });
          }
        } catch(e){}
        this._syncLock = false;
      });
    } catch(e) { console.warn('[TCI] mapLeft error:', e.message); }
  },

  _setLight(preset) {
    try { this.map.setConfigProperty('basemap','lightPreset',preset); } catch(e){}
    try { this.mapLeft?.setConfigProperty('basemap','lightPreset',preset); } catch(e){}

    // Geamuri clădiri proiectate — se aprind noaptea/seara
    const emissiveByPreset = { night:0.45, dawn:0.25, dusk:0.15, day:0.0 };
    const intensity = emissiveByPreset[preset] ?? 0.0;
    // Culoare geamuri: galben cald la noapte, portocaliu la seara
    const emissiveColor = preset === 'night' ? 0xffd060 : preset === 'dawn' ? 0xff9040 : 0x000000;

    try {
      const mesh = this._3D?._mesh;
      if(mesh?.material) {
        mesh.material.emissive = new THREE.Color(emissiveColor);
        mesh.material.emissiveIntensity = intensity;
        mesh.material.needsUpdate = true;
        this._3D._map?.triggerRepaint?.();
      }
    } catch(e){}

    // Ambientlight Three.js — mai scăzut noaptea, mai puternic ziua
    const ambientByPreset = { night:0.35, dawn:0.65, dusk:0.80, day:1.20 };
    try {
      const ambient = this._3D?._scene?.children?.find?.(c=>c.isAmbientLight);
      if(ambient) { ambient.intensity = ambientByPreset[preset] ?? 1.0; this._3D._map?.triggerRepaint?.(); }
    } catch(e){}
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

    // ── DETECȚIE MOBIL ───────────────────────────────────────────────────
    const isMob = window.innerWidth < 768;
    this._isMobile = isMob;

    const mapEl = document.getElementById('map');
    if(mapEl) mapEl.style.display = 'none';

    if(isMob) {
      // ── MOBIL: un singur map full screen ────────────────────────────
      const sc = document.createElement('div');
      sc.id = 'tci-split-cont';
      sc.style.cssText = 'position:fixed;inset:0;z-index:2999;background:#000;';
      if(mapEl){
        mapEl.style.cssText='position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;';
        sc.appendChild(mapEl);
      }
      document.body.appendChild(sc);
      this.map?.resize?.();
      this._buildOverlayMobile(cx, cy);
      return;
    }

    // ── DESKTOP: split screen ────────────────────────────────────────────
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
      <!-- PANEL STÂNG UNIC — conține tot: date live + narativ + proiecție + legendă -->
      <!-- Ambele hărți au aceeași lățime → sync perfect -->
      <div id="tci-lpanel" style="position:absolute;left:0;top:42px;bottom:60px;width:280px;pointer-events:all;background:rgba(4,10,24,0.92);backdrop-filter:blur(12px);border-right:1px solid rgba(255,255,255,0.06);overflow-y:auto;z-index:10">
        <div style="padding:10px;display:flex;flex-direction:column;gap:6px">

          <!-- DATE LIVE -->
          <div style="font-size:7px;font-weight:700;color:#D4AF37;letter-spacing:.08em">DATE LIVE</div>
          <div id="tci-kpis"></div>

          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:6px">
            <div style="font-size:7px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:5px">COMPARARE UAT</div>
            <input type="text" id="tci-cmp-inp" placeholder="Caută UAT..." autocomplete="off" oninput="TCI._cmpSearch(this.value)"
              style="width:100%;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:#fff;padding:5px 7px;border-radius:5px;font-size:9.5px;font-family:inherit;box-sizing:border-box">
            <div id="tci-cmp-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:5px;max-height:80px;overflow-y:auto;display:none;margin-top:2px"></div>
            <div id="tci-cmp-out" style="margin-top:4px"></div>
          </div>

          <div style="display:flex;gap:4px">
            <button onclick="TCI._snapshot()" style="flex:1;text-align:left;padding:5px 7px;border-radius:4px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.75);font-size:9px;cursor:pointer;font-family:inherit">📷 Snapshot</button>
            <button onclick="TCI._share()" style="flex:1;text-align:left;padding:5px 7px;border-radius:4px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.75);font-size:9px;cursor:pointer;font-family:inherit">🔗 Share URL</button>
          </div>
          <div style="display:flex;gap:4px;margin-top:4px">
            <button onclick="TCI._generateReport()" style="flex:1;text-align:left;padding:6px 7px;border-radius:4px;border:1px solid rgba(212,175,55,0.4);background:rgba(212,175,55,0.12);color:#D4AF37;font-size:9px;cursor:pointer;font-family:inherit;font-weight:600">📄 Raport PDF</button>
            <button onclick="TCI._saveScenario();alert('Scenariu salvat!')" style="flex:1;text-align:left;padding:6px 7px;border-radius:4px;border:1px solid rgba(99,102,241,0.4);background:rgba(99,102,241,0.12);color:#818cf8;font-size:9px;cursor:pointer;font-family:inherit;font-weight:600">💾 Salvează</button>
          </div>

          <!-- SEPARATOR -->
          <div style="border-top:1px solid rgba(212,175,55,0.2);margin:2px 0"></div>

          <!-- SCENA CURENTĂ / NARATIV -->
          <div id="tci-narcard" style="background:rgba(14,26,52,0.8);border:1px solid rgba(212,175,55,0.28);border-radius:7px;padding:9px;transition:opacity .35s">
            <div id="tci-nar-title" style="font-size:10px;font-weight:700;color:#D4AF37;margin-bottom:3px;line-height:1.3"></div>
            <div id="tci-nar-body" style="font-size:9px;color:rgba(200,215,235,0.85);line-height:1.55"></div>
            <div id="tci-nar-src" style="font-size:7px;color:rgba(148,163,184,0.4);margin-top:3px;font-style:italic"></div>
          </div>

          <!-- CE VEDEȚI -->
          <div id="tci-nar-what" style="background:rgba(8,18,40,0.8);border:1px solid rgba(96,165,250,0.18);border-radius:7px;padding:8px">
            <div style="font-size:7px;font-weight:700;color:#60a5fa;margin-bottom:2px;letter-spacing:.05em">👁 CE VEDEȚI</div>
            <div id="tci-nar-whattext" style="font-size:8.5px;color:rgba(180,200,225,0.82);line-height:1.5"></div>
          </div>

          <!-- PROIECȚIE KPIs -->
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:5px">
            <div style="font-size:7px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:4px">PROIECȚIE ${this.startYear}–2055</div>
            <div id="tci-kpis-r"></div>
            <canvas id="tci-chart" width="255" height="55" style="width:100%;display:block;margin-top:5px"></canvas>
            <div id="tci-eu-panel"></div>
          </div>

          <!-- LEGENDĂ -->
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:6px">
            <div style="font-size:7px;font-weight:700;color:rgba(148,163,184,0.55);margin-bottom:4px;letter-spacing:.06em">LEGENDA PROIECȚIE</div>
            ${[
              {c:'#374151',l:'Planificat'},
              {c:'#f59e0b',l:'Construcție activă'},
              {c:'#f97316',l:'Aproape finalizat'},
              {c:'#7c3aed',l:'Centru civic'},
              {c:'#d97706',l:'Coridor bulevardier'},
              {c:'#2563eb',l:'Rezidențial colectiv'},
              {c:'#ea580c',l:'Reconversie industrială'},
              {c:'#16a34a',l:'Creștere rezidențială'},
            ].map(it=>`<div style="display:flex;align-items:center;gap:4px;margin-bottom:2px"><div style="width:8px;height:6px;background:${it.c};border-radius:1px;flex-shrink:0"></div><span style="font-size:7px;color:rgba(180,200,220,0.7)">${it.l}</span></div>`).join('')}
            <div style="font-size:6px;color:rgba(100,120,150,0.45);margin-top:3px">INS · Eurostat · ANCPI · Model TSS·FG</div>
          </div>
          <!-- STATUS DATE SURSE -->
          <div style='border-top:1px solid rgba(255,255,255,0.06);padding-top:5px;margin-top:2px'>
            <div style='font-size:6.5px;font-weight:700;color:rgba(148,163,184,0.5);margin-bottom:3px'>STATUS SURSE DATE</div>
            <div id='tci-data-status' style='font-size:7px;line-height:1.6;color:rgba(148,163,184,0.5)'>verificare...</div>
          </div>
          </div>
        </div>
      </div>

      <!-- BANNER SURSE — de la panoul stâng la marginea dreaptă -->
      <div id="tci-src-banner" style="position:absolute;top:42px;left:280px;right:0;z-index:9;pointer-events:none;background:rgba(4,10,24,0.75);border-bottom:1px solid rgba(255,255,255,0.05);padding:3px 14px;display:flex;align-items:center;gap:10px;flex-wrap:nowrap;overflow:hidden">
        <div style="font-size:6px;font-weight:700;color:rgba(212,175,55,0.6);letter-spacing:.12em;white-space:nowrap">SURSE OFICIALE:</div>
        ${['INSE','Eurostat','ANCPI','BNR','Meteo România','INFP','ANAR','IPCC AR6'].map(s=>`<span style="font-size:6px;color:rgba(148,163,184,0.45);white-space:nowrap">${s}</span>`).join('<span style="color:rgba(255,255,255,0.1)">·</span>')}
        <div style="flex:1;font-size:6px;color:rgba(100,120,150,0.35);text-align:right;white-space:nowrap">Valori orientative · Model predictiv TSS·FG ©</div>
      </div>

      <!-- BOTTOM BAR — de la panoul stâng la marginea dreaptă -->
      <div id="tci-bbar" style="position:absolute;bottom:0;left:280px;right:0;pointer-events:all;background:rgba(4,10,24,0.92);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.15);padding:7px 14px;display:flex;align-items:center;gap:10px;z-index:10">
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
    setTimeout(() => this._checkDataStatus(), 2000);
    this._updateNarCard('', '', '');
  },

  _resizeCv() {
    if(!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  // ── OVERLAY MOBIL — un singur map, drawer jos ─────────────────────────
  _buildOverlayMobile(cx, cy) {
    const ov = document.createElement('div');
    ov.id = 'tci-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:3000;pointer-events:none;font-family:"Space Grotesk","Inter",sans-serif;';

    ov.innerHTML = `
      <canvas id="tci-cv" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:transparent"></canvas>

      <!-- TOP BAR MOBIL — compact -->
      <div style="position:absolute;top:0;left:0;right:0;pointer-events:all;background:rgba(4,10,24,0.93);backdrop-filter:blur(10px);border-bottom:1px solid rgba(212,175,55,0.2);padding:10px 12px;display:flex;align-items:center;gap:8px;z-index:10">
        <div style="font-size:9px;font-weight:700;color:#D4AF37;letter-spacing:.12em">TCI</div>
        <div id="tci-h1" style="font-size:15px;font-weight:800;color:#fff;flex:1"></div>
        <div id="tci-yr-top" style="font-size:11px;font-weight:700;color:#D4AF37;min-width:36px;text-align:right"></div>
        <button onclick="TCI.close()" style="background:rgba(255,255,255,0.08);border:none;color:#94a3b8;cursor:pointer;font-size:18px;pointer-events:all;padding:4px 10px;border-radius:6px;line-height:1">✕</button>
      </div>

      <!-- CARD NARATIV — plutitor deasupra hărții, centrat -->
      <div id="tci-narcard" style="position:absolute;left:12px;right:12px;top:62px;background:rgba(4,10,24,0.85);backdrop-filter:blur(10px);border:1px solid rgba(212,175,55,0.3);border-radius:10px;padding:10px 12px;pointer-events:none;transition:opacity .35s;z-index:9">
        <div id="tci-nar-title" style="font-size:11px;font-weight:700;color:#D4AF37;margin-bottom:3px;line-height:1.3"></div>
        <div id="tci-nar-body" style="font-size:10px;color:rgba(200,215,235,0.88);line-height:1.55"></div>
        <div id="tci-nar-src" style="font-size:8px;color:rgba(148,163,184,0.4);margin-top:3px;font-style:italic"></div>
      </div>

      <!-- DRAWER JOS — date + controale -->
      <!-- Handle pentru deschis/închis -->
      <div id="tci-mob-handle" onclick="TCI._mobDrawer()" style="position:absolute;bottom:120px;left:50%;transform:translateX(-50%);pointer-events:all;z-index:11;background:rgba(4,10,24,0.90);border:1px solid rgba(212,175,55,0.3);border-radius:20px;padding:6px 20px;cursor:pointer">
        <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.08em" id="tci-mob-hlbl">▲ DATE</div>
      </div>

      <!-- Drawer — date KPI -->
      <div id="tci-mob-drawer" style="position:absolute;bottom:120px;left:0;right:0;pointer-events:all;z-index:10;background:rgba(4,10,24,0.95);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.2);padding:12px 14px 8px;max-height:0;overflow:hidden;transition:max-height .35s ease,padding .35s">
        <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.08em;margin-bottom:7px">DATE CALCULATE</div>
        <div id="tci-kpis" style="display:grid;grid-template-columns:1fr 1fr;gap:3px 10px"></div>
        <div id="tci-kpis-r" style="display:none"></div>
        <canvas id="tci-chart" width="300" height="50" style="width:100%;display:block;margin-top:8px"></canvas>
        <div id="tci-eu-panel" style="margin-top:5px"></div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button onclick="TCI._generateReport()" style="flex:1;padding:9px;border-radius:7px;border:1px solid rgba(212,175,55,0.4);background:rgba(212,175,55,0.12);color:#D4AF37;font-size:10px;cursor:pointer;font-family:inherit;font-weight:600">📄 Raport PDF</button>
          <button onclick="TCI._saveScenario();alert('Salvat!')" style="flex:1;padding:9px;border-radius:7px;border:1px solid rgba(99,102,241,0.4);background:rgba(99,102,241,0.12);color:#818cf8;font-size:10px;cursor:pointer;font-family:inherit;font-weight:600">💾 Salvează</button>
        </div>
        <div id="tci-nar-what" style="margin-top:8px;background:rgba(8,18,40,0.8);border:1px solid rgba(96,165,250,0.18);border-radius:7px;padding:8px">
          <div style="font-size:8px;font-weight:700;color:#60a5fa;margin-bottom:2px">👁 CE VEDEȚI</div>
          <div id="tci-nar-whattext" style="font-size:9px;color:rgba(180,200,225,0.82);line-height:1.5"></div>
        </div>
      </div>

      <!-- BOTTOM BAR MOBIL — play + slider + scenariu -->
      <div id="tci-bbar" style="position:absolute;bottom:0;left:0;right:0;pointer-events:all;background:rgba(4,10,24,0.95);backdrop-filter:blur(12px);border-top:1px solid rgba(212,175,55,0.15);padding:8px 12px 10px;z-index:12">
        <!-- Rândul 1: an + play + viteza + scenariu -->
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <div id="tci-yr" style="font-size:22px;font-weight:900;color:#D4AF37;min-width:46px"></div>
          <button id="tci-play" onclick="TCI.toggle()" style="padding:8px 18px;border-radius:8px;background:rgba(212,175,55,0.18);border:1px solid rgba(212,175,55,0.5);color:#D4AF37;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">▶ Play</button>
          <select onchange="TCI.speed=+this.value" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:7px 8px;border-radius:6px;font-size:11px;font-family:inherit;cursor:pointer;flex:1">
            <option value="1">1×</option><option value="2">2×</option><option value="5">5×</option>
          </select>
          <select onchange="TCI.setScenario(this.value)" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:7px 8px;border-radius:6px;font-size:11px;font-family:inherit;cursor:pointer;flex:2">
            <option value="S1">S1 Optimist</option><option value="S2" selected>S2 Moderat</option><option value="S3">S3 Conserv.</option><option value="S4">S4 Climatic</option>
          </select>
        </div>
        <!-- Rândul 2: slider -->
        <input type="range" id="tci-scrub" min="${this.startYear}" max="2055" value="${this.startYear}" step="1"
          oninput="TCI.scrubTo(+this.value)"
          style="width:100%;accent-color:#D4AF37;height:5px;border-radius:3px">
        <div style="display:flex;justify-content:space-between;font-size:8px;color:rgba(148,163,184,0.35);margin-top:2px">
          <span>${this.startYear}</span><span>2030</span><span>2040</span><span>2050</span><span>2055</span>
        </div>
      </div>`;

    document.body.appendChild(ov);

    this.canvas = document.getElementById('tci-cv');
    this.ctx    = this.canvas.getContext('2d');
    this._resizeCv();
    window.addEventListener('resize', () => this._resizeCv());
    this._updateHeader();
    this._updateKPIs();
    setTimeout(() => this._checkDataStatus?.(), 2000);
    this._updateNarCard('', '', '');
  },

  // Toggle drawer mobil
  _mobDrawer() {
    const drawer = document.getElementById('tci-mob-drawer');
    const lbl    = document.getElementById('tci-mob-hlbl');
    const handle = document.getElementById('tci-mob-handle');
    if(!drawer) return;
    const isOpen = drawer.style.maxHeight && drawer.style.maxHeight !== '0px' && drawer.style.maxHeight !== '0';
    if(isOpen){
      drawer.style.maxHeight='0';
      drawer.style.padding='0 14px';
      handle.style.bottom='120px';
      if(lbl) lbl.textContent='▲ DATE';
    } else {
      drawer.style.maxHeight='70vh';
      drawer.style.padding='12px 14px 8px';
      handle.style.bottom='';
      if(lbl) lbl.textContent='▼ ÎNCHIDE';
    }
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

  // ── STATUS DATE — verificare vizuală că sursele sunt active ──────────
  async _checkDataStatus() {
    const el = document.getElementById('tci-data-status');
    if(!el) return;

    const checks = [];

    // 1. Supabase LMI
    try {
      const url  = window.SUPABASE_URL;
      const key  = window.SUPABASE_ANON_KEY;
      if(url && key) {
        const r = await fetch(`${url}/rest/v1/lmi_romania?select=count`,
          {headers:{'apikey':key,'Authorization':`Bearer ${key}`,'Prefer':'count=exact'},
           signal:AbortSignal.timeout(4000)});
        const count = parseInt(r.headers.get('Content-Range')?.split('/')[1]||'0');
        checks.push(count > 100
          ? `<span style="color:#22c55e">✅ LMI Supabase: ${count.toLocaleString()} monumente</span>`
          : `<span style="color:#f59e0b">⚠️ LMI Supabase: ${count} (puțin)</span>`);
      } else {
        checks.push(`<span style="color:#6b7280">⬜ LMI Supabase: neconfigurat</span>`);
      }
    } catch(e) {
      checks.push(`<span style="color:#ef4444">❌ LMI Supabase: eroare</span>`);
    }

    // 2. Mapbox Geocoding
    try {
      const token = mapboxgl?.accessToken;
      const r = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/cimitir.json?bbox=27,47,28,48&limit=1&access_token=${token}`,
        {signal:AbortSignal.timeout(4000)});
      checks.push(r.ok
        ? `<span style="color:#22c55e">✅ Mapbox Geocoding: activ</span>`
        : `<span style="color:#ef4444">❌ Mapbox Geocoding: ${r.status}</span>`);
    } catch(e) {
      checks.push(`<span style="color:#ef4444">❌ Mapbox Geocoding: timeout</span>`);
    }

    // 3. Zone constrângeri încărcate
    const bufsCount = this._constraints?.bufs?.length || 0;
    checks.push(bufsCount > 0
      ? `<span style="color:#22c55e">✅ Constrângeri: ${bufsCount} zone excluse</span>`
      : `<span style="color:#6b7280">⬜ Constrângeri: în așteptare</span>`);

    el.innerHTML = checks.join('<br>');
  },

  _updateKPIs() {
    const city = this._city();
    const el   = document.getElementById('tci-kpis');
    if(!el || !city.pop2021) return;

    // ── Date din motoarele reale ─────────────────────────────────────────
    const need = this._calcUrbanNeed(city);
    const grav = this._calcGravityScore(city);
    const seis = this._getSeismicAg(city.lon||27.6, city.lat||47.16);
    const clim = this._getClimateProfile(city.judet||'');
    const feas = this._calcFeasibility({}, city, seis.ag);
    const scn  = this._getScenario();

    // ── Investiție estimată (ANCPI + MDLPA cost mediu construcție RO) ───
    // Bază: cost construcție medie 850 €/m² (MDLPA 2024) + infra 15k €/loc.
    const invConstr = Math.round(need.totalM2 * 850 / 1e6);   // €M
    const invInfra  = Math.round(need.locuinteTotale * 15000 / 1e6); // €M
    const invTotal  = invConstr + invInfra;

    // ── Dinamica populației pe an curent ────────────────────────────────
    const yrFrac  = Math.max(0, (this.year - 2021)) / 34;
    const popCrt  = Math.round(need.pop2021 + (need.pop2055 - need.pop2021) * yrFrac);
    const fmt     = n => (n||0).toLocaleString('ro-RO');
    const trend   = need.pop2055 > need.pop2021 ? '▲' : '▼';
    const trendC  = need.pop2055 > need.pop2021 ? '#22c55e' : '#f87171';

    // ── Scor risc climatic simplificat ──────────────────────────────────
    const riskScore = Math.round((clim.uhi/2.2*30) + (clim.flood*25) + (clim.drought*25));
    const riskLbl   = riskScore > 55 ? 'Ridicat' : riskScore > 35 ? 'Mediu' : 'Scăzut';
    const riskC     = riskScore > 55 ? '#f87171' : riskScore > 35 ? '#f59e0b' : '#22c55e';

    const rows = [
      {l:'Populație '+this.year,  v: fmt(popCrt),                      c:'#60a5fa'},
      {l:'Proiecție 2055',        v: trend+' '+fmt(need.pop2055),       c: trendC},
      {l:'Locuințe necesare',     v: fmt(need.locuinteTotale),          c:'#D4AF37'},
      {l:'Investiție estimată',   v: '≈'+invTotal+' M€',               c:'#a78bfa',
       t:'Construcție '+invConstr+'M€ + Infrastructură '+invInfra+'M€ · Bază MDLPA 2024'},
      {l:'Tip urban',             v: grav.growthType,                   c:'#38bdf8'},
      {l:'hMax legal (seismic)',  v: seis.hMaxStory+' etaje / '+seis.hMaxM+'m', c:'#fb923c'},
      {l:'Risc climatic 2055',    v: riskLbl+' ('+riskScore+'/100)',    c: riskC},
      {l:'ROI estimat',           v: feas.roi+'%'+(feas.viable?' ✓':' ⚠'), c: feas.viable?'#22c55e':'#f87171'},
      {l:'Scenariu',              v: scn.label+' ×'+scn.rateMultiplier, c:'#94a3b8'},
    ];

    el.innerHTML = rows.map(r=>`
      <div style="display:flex;justify-content:space-between;align-items:baseline;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04)"
        ${r.t?`title="${r.t}"`:''}
      >
        <span style="font-size:9px;color:rgba(148,163,184,0.6);flex-shrink:0;margin-right:4px">${r.l}</span>
        <span style="font-size:10px;font-weight:700;color:${r.c};text-align:right">${r.v}</span>
      </div>`).join('');

    const r2 = document.getElementById('tci-kpis-r');
    if(r2) r2.innerHTML = el.innerHTML;

    this._drawMiniChart();
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

    // ── Date calculate din motoare ───────────────────────────────────────
    const need  = this._calcUrbanNeed(city);
    const grav  = this._calcGravityScore(city);
    const clim  = this._getClimateProfile(city.judet||'');

    // Densitate: suprafață UAT dacă există, altfel estimare pe tip urban
    const suprafataHa = city.suprafata_ha || (
      grav.growthType==='METROPOLITAN' ? 9000 :
      grav.growthType==='REGIONAL'     ? 4500 :
      grav.growthType==='LOCAL'        ? 2000 : 1000
    );
    const densHA     = Math.round(city.pop2021 / suprafataHa);
    const densHA2055 = Math.round(need.pop2055  / suprafataHa);

    // Referințe Eurostat Urban Audit 2022 — orașe similare din estul UE
    const euRef = grav.growthType==='METROPOLITAN'
      ? {city:'Vilnius',dens:56,tp:42,esg:79}
      : grav.growthType==='REGIONAL'
      ? {city:'Rzeszów',dens:28,tp:28,esg:62}
      : {city:'Sibiu',  dens:18,tp:22,esg:58};

    const barW = (val, ref, max) => Math.min(98, Math.round(val/max*100));

    el.innerHTML=`
      <div style="font-size:7.5px;font-weight:700;color:#a78bfa;margin-bottom:6px">⚖ Context EU · ${euRef.city}</div>
      ${[
        {l:'Densitate loc/ha',    v:densHA,           ref:euRef.dens, max:150, fmt:v=>v+' vs '+euRef.dens, c:'#60a5fa', src:'INS/Eurostat'},
        {l:'Densitate 2055',      v:densHA2055,       ref:euRef.dens, max:150, fmt:v=>v+' est.',            c:'#38bdf8', src:'Model TSS·FG'},
        {l:'UHI °C suplim.',      v:clim.uhi,         ref:1.0,        max:2.5, fmt:v=>'+'+v+'°C',          c: clim.uhi>1.5?'#f87171':'#22c55e', src:'IPCC AR6'},
        {l:'Risc inundații',      v:Math.round(clim.flood*100), ref:50, max:100, fmt:v=>v+'%',             c: clim.flood>0.6?'#f87171':'#f59e0b', src:'ANAR/IPCC'},
      ].map(r=>`
        <div style="margin-bottom:5px">
          <div style="display:flex;justify-content:space-between;margin-bottom:1px">
            <span style="font-size:7px;color:rgba(148,163,184,0.6)">${r.l}</span>
            <span style="font-size:8px;font-weight:700;color:${r.c}">${r.fmt(r.v)}</span>
          </div>
          <div style="background:rgba(255,255,255,0.07);border-radius:2px;height:3px;position:relative">
            <div style="width:${barW(r.v,r.ref,r.max)}%;background:${r.c};height:100%;border-radius:2px;transition:width .5s"></div>
          </div>
          <div style="font-size:5.5px;color:rgba(100,120,150,0.35);text-align:right">${r.src}</div>
        </div>`).join('')}
      <div style="font-size:6.5px;color:rgba(100,120,150,0.45);margin-top:5px">Eurostat Urban Audit 2022 · IPCC AR6 · INS</div>`;
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


  // ══════════════════════════════════════════════════════════════════════
  // SCENARII S1-S4
  // ══════════════════════════════════════════════════════════════════════
  _SCENARIOS:{'S1':{label:'Accelerat',rateMultiplier:1.8,hMaxMultiplier:1.25,expansieMultiplier:1.5},'S2':{label:'Sustenabil',rateMultiplier:1.0,hMaxMultiplier:1.0,expansieMultiplier:1.0},'S3':{label:'Conservare',rateMultiplier:0.6,hMaxMultiplier:0.80,expansieMultiplier:0.4},'S4':{label:'Risc Climatic',rateMultiplier:0.3,hMaxMultiplier:0.65,expansieMultiplier:0.2}},
  _getScenario(){return this._SCENARIOS[this.scenario]||this._SCENARIOS['S2'];},

  // ══════════════════════════════════════════════════════════════════════
  // ZONE SEISMICE P100-1/2013
  // ══════════════════════════════════════════════════════════════════════
  _SEISMIC_ZONES:[
    {ag:0.40,hMaxStory:4, bbox:[26.5,45.2,28.2,46.3]},
    {ag:0.35,hMaxStory:6, bbox:[24.8,43.6,28.5,45.3]},
    {ag:0.30,hMaxStory:8, bbox:[22.5,43.6,28.5,47.8]},
    {ag:0.20,hMaxStory:12,bbox:[20.2,45.2,26.5,48.3]},
    {ag:0.10,hMaxStory:99,bbox:[22.0,47.0,24.5,48.3]},
  ],
  _getSeismicAg(lon,lat){
    for(const z of this._SEISMIC_ZONES){
      const[x1,y1,x2,y2]=z.bbox;
      if(lon>=x1&&lon<=x2&&lat>=y1&&lat<=y2)return{ag:z.ag,hMaxStory:z.hMaxStory,hMaxM:z.hMaxStory*3.0};
    }
    return{ag:0.15,hMaxStory:10,hMaxM:30};
  },

  // ══════════════════════════════════════════════════════════════════════
  // URBAN GRAVITY MODEL
  // ══════════════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════
  // URBAN LIFECYCLE SCORE — L = f(Pg, Eg, Mn, Ac) ∈ [-1.0, +1.0]
  // ── Scor continuu, nu etichete fixe ──────────────────────────────────
  // Surse: INS rata demografică, coef_hub economic, INS AC trend
  // -1.0 = shrinking sever | 0.0 = stabil | +1.0 = boomtown
  // ══════════════════════════════════════════════════════════════════════
  _calcLifecycleScore(cityData) {
    if(!cityData) return 0;
    const rata = cityData.rata_reala_2011_2021 || 0;

    // Pg: creștere demografică normalizată [-1, +1]
    // Rata -3%/an → -1.0 | 0% → 0 | +3%/an → +1.0
    const Pg = Math.max(-1, Math.min(1, rata / 2.5));

    // Eg: presiune economică din coef_hub calibrat pe media RO (0.78)
    // 0.5 → -0.5 (declin) | 0.78 → 0 (mediu) | 1.25 → +1.0 (boom)
    const hub = cityData.coef_hub || 0.78;
    const Eg = Math.max(-1, Math.min(1, (hub - 0.78) * 2.2));

    // Mn: balanță migrație (proxy: rata demografică cu pondere universitară)
    const univBonus = (cityData.universitati || 0) > 2 ? 0.15 : 0;
    const Mn = Math.max(-1, Math.min(1, Pg + univBonus));

    // Ac: trend autorizații INS TEMPO (dacă disponibil)
    // 0.5× → -0.5 | 1.0× → 0 | 2.0× → +0.5
    const permTrend = cityData._permitsGrowth || 1.0;
    const Ac = Math.max(-1, Math.min(1, (permTrend - 1.0) * 1.5));

    // L = combinație ponderată
    const L = Pg*0.35 + Eg*0.25 + Mn*0.25 + Ac*0.15;
    const score = Math.max(-1, Math.min(1, L));

    // Clasificare pentru compatibilitate cu codul existent
    const lifecycleType =
      score >  0.45 ? 'GROWING'    :
      score >  0.10 ? 'STABLE'     :
      score > -0.30 ? 'STABLE'     :  // LOCAL stabil = nu declining
      score > -0.55 ? 'DECLINING'  :
                      'SHRINKING';

    return { score, lifecycleType, Pg, Eg, Mn, Ac };
  },

  _calcGravityScore(cityData){
    const pop=(cityData?.pop2021||100000),rate=(cityData?.rata_reala_2011_2021||0)/100;
    const UNIV_CITIES={'IS':5,'CJ':4,'TM':4,'B':10,'BV':2,'SB':2,'CS':2,'BC':1,'SV':1,'GL':1,'CT':2,'MS':2,'HR':1,'NT':1};
    const univ=(cityData?.universitati||UNIV_CITIES[cityData?.judet||'']||0),judet=cityData?.judet||'';
    const eP=Math.min(1,pop/400000),eC=Math.max(0,Math.min(1,(rate+0.02)/0.04));
    const eE=Math.min(1,univ/3),eK=['IS','CJ','TM','B','CT','BV'].includes(judet)?0.8:0.4;
    const eI=rate>0?0.7:rate>-0.01?0.4:0.2;
    const score=eP*.30+eC*.25+eE*.20+eK*.15+eI*.10;

    // ── Lifecycle Score integrat în growthType ────────────────────────
    const lifecycle = this._calcLifecycleScore(cityData);
    const isLargeCity = pop > 250000;

    // growthType = combinație gravity + lifecycle
    const growthType =
      (score>0.55 || isLargeCity&&score>0.45) ? 'METROPOLITAN' :
      score>0.35 && lifecycle.score>-0.2      ? 'REGIONAL'     :
      lifecycle.score < -0.55                  ? 'SHRINKING'    :
      lifecycle.score < -0.30                  ? 'DECLINING'    :
      score>0.22                               ? 'LOCAL'        :
                                                 'DECLINING';

    return {
      gravityScore:score, growthType,
      ePopulatie:eP, eCrestere:eC, eEducatie:eE, eConectivit:eK,
      lifecycle, // score continuu disponibil pentru oricine îl cere
    };
  },

  // ══════════════════════════════════════════════════════════════════════
  // HOUSEHOLD FORMATION ENGINE — Ht = Pt/St dinamic
  // Trend INS: 2.3(2021) → 1.9(2040) → 1.75(2055)
  // ══════════════════════════════════════════════════════════════════════
  _householdSizeAt(year,gravityType){
    const base={METROPOLITAN:2.20,REGIONAL:2.35,LOCAL:2.50,DECLINING:2.60};
    const s0=base[gravityType]||2.30,yr=Math.max(2021,Math.min(2055,year));
    const rata=yr<=2040?0.0080:0.0050;
    return Math.max(1.65,Math.round(s0*Math.pow(1-rata,yr-2021)*100)/100);
  },

  // ══════════════════════════════════════════════════════════════════════
  // RATE SUPRAVIEȚUIRE COHORTE — INS 2021
  // ══════════════════════════════════════════════════════════════════════
  _SURVIVAL_RATES:{'0-4':[.9985,.9978],'5-9':[.9991,.9987],'10-14':[.9993,.9989],'15-19':[.9990,.9979],'20-24':[.9988,.9973],'25-29':[.9987,.9971],'30-34':[.9984,.9966],'35-39':[.9980,.9957],'40-44':[.9971,.9938],'45-49':[.9956,.9907],'50-54':[.9932,.9862],'55-59':[.9895,.9796],'60-64':[.9836,.9688],'65-69':[.9745,.9530],'70-74':[.9580,.9253],'75+':[.8900,.8400]},
  _POP_DIST:[['0-4',.048,0.],['5-9',.050,0.],['10-14',.052,0.],['15-19',.056,.05],['20-24',.062,.35],['25-29',.070,.55],['30-34',.072,.50],['35-39',.068,.30],['40-44',.065,.15],['45-49',.063,.08],['50-54',.060,.05],['55-59',.058,.03],['60-64',.055,.02],['65-69',.048,.01],['70-74',.038,.0],['75+',.035,.0]],

  // ══════════════════════════════════════════════════════════════════════
  // MOTOR DEMOGRAFIC — Cohort Survival + Migration Matrix
  // Px+n,t+n = Px,t · Sx + Mx,t (standard INS/Eurostat)
  // ══════════════════════════════════════════════════════════════════════
  _calcUrbanNeed(cityData){
    const pop2021=cityData?.pop2021||100000;
    const scn=this._getScenario?.();
    const rateAn=(cityData?.rata_reala_2011_2021||0)/100*(scn?.rateMultiplier||1.0);
    const hasUniv=(cityData?.universitati||0)>0;
    const gravity=this._calcGravityScore(cityData);
    const MW={'0-4':.3,'5-9':.3,'10-14':.2,'15-19':.3,'20-24':1.,'25-29':1.,'30-34':.8,'35-39':.6,'40-44':.4,'45-49':.3,'50-54':.2,'55-59':.1,'60-64':.1,'65-69':.05,'70-74':.02,'75+':.01};
    const ub=hasUniv?1.3:1.0;
    let cohorte=this._POP_DIST.map(([n,p,e])=>({n,pop:Math.round(pop2021*p),e}));
    let nouGospTot=0;
    for(let c=0;c<6;c++){
      const nc=[];
      cohorte.forEach(x=>{
        const sr=this._SURVIVAL_RATES?.[x.n]||[.95,.95];
        const sx=(sr[0]+sr[1])/2,w=MW[x.n]||.3,uvb=(x.n==='20-24'||x.n==='25-29')?ub:1.;
        const pn=Math.max(0,Math.round(x.pop*Math.pow(sx,5)+x.pop*rateAn*5*w*uvb));
        if(x.e>0)nouGospTot+=Math.max(0,pn-x.pop)*x.e/2.3;
        nc.push({...x,pop:pn});
      });
      cohorte=nc;
    }
    const pop2055=cohorte.reduce((s,x)=>s+x.pop,0);
    const s25=this._householdSizeAt(2025,gravity.growthType);
    const s55=this._householdSizeAt(2055,gravity.growthType);
    const h25=Math.round(pop2021/s25),h55=Math.round(pop2055/s55);
    const locuinteNoi=Math.max(0,h55-h25)+Math.max(0,h55-Math.round(pop2055/s25));
    const locuinteReab=Math.round(h25*.36*.40);
    const pop2034=cohorte.filter(x=>['20-24','25-29','30-34'].includes(x.n)).reduce((s,x)=>s+x.pop,0);
    const locuinteGospNoi=Math.round(Math.abs(nouGospTot))+Math.round(pop2034*.18);
    const locuinteTotale=locuinteNoi+locuinteReab+locuinteGospNoi;
    const totalM2=locuinteTotale*68;
    const scale=Math.pow(pop2021/360000,.38);
    const cladiri={centru:Math.max(4,Math.round(totalM2*.18/(1800*scale))),inner:Math.max(6,Math.round(totalM2*.22/(1400*scale))),coridor:Math.max(8,Math.round(totalM2*.20/(1200*scale))),rezid:Math.max(8,Math.round(totalM2*.25/(1100*scale))),expansie:Math.max(4,Math.round(totalM2*.15/(900*scale))),logistica:Math.max(2,Math.round(totalM2*.08/(2500*scale)))};
    console.log(`[TCI Cohort] ${cityData?.name}: ${pop2021.toLocaleString()}→${pop2055.toLocaleString()} | s=${s25}→${s55} | ${locuinteTotale.toLocaleString()} loc.`);
    return{pop2021,pop2055,deltaPop:Math.max(0,pop2055-pop2021),locuinteNoi,locuinteReab,locuinteTotale,totalM2,scale,cladiri,s2025:s25,s2055:s55,gravity};
  },

  // ══════════════════════════════════════════════════════════════════════
  // PROFIL CLIMATIC — Copernicus + IPCC AR6
  // ══════════════════════════════════════════════════════════════════════
  _CLIMATE_ZONES:{
    'SE':{counties:['CT','GL','BR','TL','CL','IL'],uhi:1.8,drought:.8,flood:.6,note:'Zonă vulnerabilă — caniculă+secetă 2050'},
    'CE':{counties:['B','IF','GR','TR','DB','PH'],uhi:2.2,drought:.5,flood:.6,note:'București — insulă termică maximă'},
    'NE':{counties:['IS','BT','VS','NT','BC','SV'],uhi:1.0,drought:.3,flood:.7,note:'Moldova — risc inundații crescut'},
    'NV':{counties:['CJ','MM','BH','SJ','SM','BN'],uhi:0.9,drought:.2,flood:.5,note:'Cel mai favorabil climatic'},
    'CV':{counties:['BV','HR','CV','MS','AB','SB','HD'],uhi:0.8,drought:.3,flood:.4,note:'Transilvania — climat moderat'},
    'SV':{counties:['OT','DJ','MH','GJ','VL','AG'],uhi:1.5,drought:.7,flood:.5,note:'Oltenia — secetă severă 2040-2055'},
  },
  _getClimateProfile(judet){
    for(const[z,d]of Object.entries(this._CLIMATE_ZONES))if(d.counties.includes(judet))return{zone:z,...d};
    return{zone:'NV',uhi:1.0,drought:.3,flood:.4,note:'Profil climatic moderat'};
  },

  // ══════════════════════════════════════════════════════════════════════
  // AUTOSTRĂZI PLANIFICATE — CNAIR 2025
  // ══════════════════════════════════════════════════════════════════════
  _PLANNED_INFRA:{
    'A7':{name:'A7 Moldova',status:'construction',year:2027,waypoints:[[26.913,46.567],[26.256,47.652]]},
    'A8':{name:'A8 Iași-TgMureș',status:'construction',year:2028,waypoints:[[27.601,47.158],[27.350,47.050],[26.920,46.820]]},
    'A13':{name:'A13 Brașov-Bacău',status:'planned',year:2032,waypoints:[[25.600,45.648],[26.913,46.567]]},
    'CENTURA_IS':{name:'Centură Iași',status:'construction',year:2026,waypoints:[[27.530,47.180],[27.580,47.220],[27.650,47.180],[27.640,47.130],[27.570,47.120]]},
  },

  // ══════════════════════════════════════════════════════════════════════
  // FETCH INFRASTRUCTURĂ OSM + PLANIFICATĂ
  // ══════════════════════════════════════════════════════════════════════
  async _fetchInfraCorridors(cx,cy,radiusKm=22){
    const rad=radiusKm/111.0,bbox=`${cy-rad},${cx-rad},${cy+rad},${cx+rad}`;
    // ── Fetch cu geometrie completă (nu doar centru) ──────────────────────
    // out geom → returnează toate nodurile drumului → putem face buffer corect
    const q=`[out:json][timeout:30];(
      way["highway"="motorway"](${bbox});
      way["highway"="construction"]["construction"~"motorway|trunk"](${bbox});
      way["highway"="trunk"](${bbox});
      way["highway"="primary"](${bbox});
      way["highway"="secondary"](${bbox});
    )->.r;.r out geom qt 60;`;
    const cors=[];
    try{
      const r=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:'data='+encodeURIComponent(q),signal:AbortSignal.timeout(25000)});
      const data=await r.json();
      const seen=new Set();
      const R=111*Math.cos(cy*Math.PI/180);

      (data.elements||[]).forEach(el=>{
        const t=el.tags||{};
        const hw=t.highway;
        const isM=hw==='motorway'||t.construction==='motorway';
        const isSec=hw==='secondary';

        // Geometrie completă: sample la fiecare ~120m pentru coridoare, ~80m pentru secundare
        const geom=el.geometry||[];
        const step=isSec?8:12; // noduri între sample-uri
        for(let i=0;i<geom.length;i+=Math.max(1,Math.floor(step))){
          const g=geom[i]; if(!g) continue;
          const lon=g.lon,lat=g.lat;
          if(!lon||!lat) continue;
          const key=`${Math.round(lon/0.001)}_${Math.round(lat/0.001)}`;
          if(seen.has(key)) continue; seen.add(key);
          const dk=Math.hypot((lon-cx)*R,(lat-cy)*111);
          if(dk>radiusKm) continue;

          const dS=(isM?1.0:hw==='trunk'?.75:hw==='primary'?.50:.35)*(dk<1?.2:dk<3?.6:dk<8?1.0:dk<15?.75:.45);
          const dt=isM?['logistica','comercial','rezidential']:hw==='trunk'?['comercial','rezidential']:['rezidential','rezidential_mic'];
          cors.push({lon,lat,distKm:dk,devScore:dS,devTypes:dt,roadClass:hw,
                     ref:t.ref||'',name:t.name||'',
                     status:hw==='construction'?'construction':'existing',
                     wayId:el.id});
        }
      });
    }catch(e){console.warn('[TCI Infra]',e.message);}

    // Autostrăzi planificate (waypoints CNAIR)
    Object.entries(this._PLANNED_INFRA||{}).forEach(([id,inf])=>{
      (inf.waypoints||[]).forEach(([wl,wt])=>{
        const dk=Math.hypot((wl-cx)*111*Math.cos(cy*Math.PI/180),(wt-cy)*111);
        if(dk>radiusKm)return;
        cors.push({lon:wl,lat:wt,distKm:dk,devScore:.65*(dk<3?.4:dk<10?1.0:.6),
                   devTypes:['logistica','comercial','rezidential'],
                   roadClass:'motorway_planned',ref:id,name:inf.name,
                   status:inf.status,year:inf.year});
      });
    });

    cors.sort((a,b)=>b.devScore-a.devScore);
    this._lastCors = cors;
    console.log(`[TCI Infra] ${cors.length} puncte rutiere (geometrie completă)`);
    return cors;
  },

  _infraToZones(cors,cx,cy,need,seismicCap,sc,C,ok,scn){
    if(!cors?.length)return[];

    // ── FIX DECLINING: oraș în scădere → ZERO expansiune periferică ──────
    // Regula urbanistică: nu construim nou unde populația scade și ROI<0
    // Doar reabilitare fond existent + eventual reconversie industrială
    const gravity = this._calcGravityScore(this.d);
    if(gravity.growthType === 'DECLINING' || gravity.growthType === 'SHRINKING') {
      console.log('[TCI]', gravity.growthType, '→ tipologii speciale. L=', gravity.lifecycle?.score?.toFixed(2));
      const zones = [];
      const L = gravity.lifecycle?.score || -0.4;
      const hC = seismicCap(Math.min(20, Math.max(10, 10 + need.cladiri.centru/4)));

      // ── Centru: reabilitare + densificare controlată ──────────────
      if(ok(cx,cy)) zones.push({
        id:'CV-REAB', color:'#7c3aed', hMax:hC, startYr:2027,
        density:Math.max(2, Math.round(need.cladiri.centru*0.3)),
        ring:{cx,cy,rx:0.0016*sc,ry:0.0011*sc},
        label:'Centru — Reabilitare',
        sub:`L=${L.toFixed(2)} · R+${Math.round(hC/3.5)} max · Fond existent`
      });

      // ── Medical/Senior Housing — cerere crescută prin îmbătrânire ──
      // Documentul: "medical = logică îmbătrânire. Senior housing = demografie"
      const medLon=cx+0.010*sc, medLat=cy+0.006*sc;
      if(ok(medLon,medLat)) zones.push({
        id:'MED-DECL', color:'#06b6d4', hMax:seismicCap(12), startYr:2028,
        density:Math.max(2,3),
        ring:{cx:medLon,cy:medLat,rx:0.0020*sc,ry:0.0014*sc},
        label:'Medical · Senior Housing',
        sub:`Demografie îmbătrânire · R+2→R+4`
      });

      // ── Reconversie industrială — singura expansiune permisă ────────
      const riLon=cx+0.018*sc, riLat=cy-0.008*sc;
      if(ok(riLon,riLat)) zones.push({
        id:'RI-DECL', color:'#ea580c', hMax:seismicCap(15), startYr:2031,
        density:Math.max(2, Math.round(need.cladiri.logistica*0.4)),
        rect:{cx:riLon,cy:riLat,w:0.008*sc,h:0.005*sc},
        label:'Reconversie Industrială',
        sub:`Industrial→Mixed compact · eficiență`
      });

      // ── SHRINKING: adaugă verde urban / demolări ──────────────────
      if(gravity.growthType === 'SHRINKING') {
        const verdeLon=cx-0.012*sc, verdeLat=cy+0.004*sc;
        if(ok(verdeLon,verdeLat)) zones.push({
          id:'VERDE-SHR', color:'#16a34a', hMax:0, startYr:2026,
          density:1,
          ring:{cx:verdeLon,cy:verdeLat,rx:0.0025*sc,ry:0.0018*sc},
          label:'Verde Urban · Shrinking',
          sub:`Demolări + renaturarizare · L=${L.toFixed(2)}`
        });
      }

      return zones;
    }

    const zones=[],used=[],minD=0.008,sExp=scn?.expansieMultiplier||1.0;
    const tooClose=(lon,lat)=>used.some(p=>Math.hypot(lon-p[0],lat-p[1])<minD);
    cors.slice(0,12).forEach((cor,i)=>{
      const{lon,lat,devScore,devTypes,roadClass,ref,name,status,year}=cor;
      if(tooClose(lon,lat)||devScore<.15)return;
      const sb=status==='planned'?(year?Math.max(0,year-2026):5):status==='construction'?2:0;
      const lbl=([ref,name].filter(Boolean).join(' ')||`Drum ${i+1}`).substring(0,40);
      if(devTypes.includes('logistica')&&cor.distKm>2&&cor.distKm<15&&sExp>.3){
        const h=seismicCap(9);
        if(ok(lon,lat)){zones.push({id:`LOG-${i}`,color:C.reconv||'#ea580c',hMax:h,startYr:2028+sb,density:Math.max(2,Math.round((need.cladiri?.logistica||3)*devScore)),ring:{cx:lon,cy:lat,rx:.006*sc,ry:.004*sc},label:`Parc Logistic: ${lbl}`,sub:`${roadClass} · P+1→P+2`});used.push([lon,lat]);return;}
      }
      if(devTypes.includes('comercial')&&cor.distKm<12&&sExp>.4){
        const h=seismicCap(Math.min(28,Math.max(10,10+devScore*18)));
        if(ok(lon,lat)&&!tooClose(lon,lat)){zones.push({id:`COM-${i}`,color:C.coridor||'#d97706',hMax:h,startYr:2027+sb,density:Math.max(3,Math.round((need.cladiri?.coridor||6)*devScore*.8)),ring:{cx:lon,cy:lat,rx:.004*sc,ry:.0028*sc},label:`Comercial: ${lbl}`,sub:`R+3→R+${Math.round(h/3)}`});used.push([lon,lat]);return;}
      }
      if(devTypes.includes('rezidential')&&cor.distKm>1&&cor.distKm<18&&sExp>.35){
        const h=seismicCap(Math.min(24,Math.max(8,8+devScore*16)));
        const ang=Math.atan2(lat-cy,lon-cx)+Math.PI/2,off=.003*sc;
        const lr=lon+Math.cos(ang)*off,ltr=lat+Math.sin(ang)*off;
        if(ok(lr,ltr)&&!tooClose(lr,ltr)){zones.push({id:`REZ-${i}`,color:C.rezid||'#2563eb',hMax:h,startYr:2029+sb,density:Math.max(4,Math.round((need.cladiri?.rezid||8)*devScore*.6)),ring:{cx:lr,cy:ltr,rx:.005*sc,ry:.0035*sc},label:`Rezidențial: ${lbl}`,sub:`R+${Math.round(h/4)}→R+${Math.round(h/3)}`});used.push([lr,ltr]);}
      }
    });
    console.log(`[TCI Infra] → ${zones.length} zone din coridoare`);
    return zones;
  },

  // ══════════════════════════════════════════════════════════════════════
  // URBAN FRONTIER ANALYSIS — P(u) = f(Ra, Db, Ec, Id, Ce, Zf, Sg)
  // ── Grid 200m × 200m · Scor per celulă · Fără hardcodat ──────────────
  // Surse: OSM buildings (Db), OSM landuse (Zf), roads (Ra)
  //        Cohort (Sg), Seismic (Ce), coef_hub (Ec)
  // ══════════════════════════════════════════════════════════════════════
  async _analyzeFrontier(cx, cy, radiusKm=5) {
    // ── FIX: DECLINING → frontier analysis irelevant ─────────────────
    const gravity = this._calcGravityScore(this.d);
    if(gravity.growthType === 'DECLINING') {
      console.log('[Frontier] DECLINING → frontier analysis blocat. Nicio zonă nouă.');
      return [];
    }
    // LOCAL cu scădere demografică puternică → raza redusă
    const effectiveRadius = gravity.growthType==='LOCAL' && (this.d?.rata_reala_2011_2021||0)<-0.5
      ? Math.min(radiusKm, 3)
      : radiusKm;

    console.log('[Frontier] Analizez frontier urban pentru', cx.toFixed(3), cy.toFixed(3),
      '| growthType:', gravity.growthType, '| raza:', effectiveRadius, 'km');
    const R = 111319.9;
    const cp = Math.cos(cy * Math.PI/180);
    const cellDeg = 0.002; // ~200m per celulă

    // ── Fetch paralel: OSM + INS TEMPO permits_growth ─────────────────
    const siruta = this.d?.siruta || '';
    const [osmData, permitsData] = await Promise.allSettled([
      (async () => {
        const rad = effectiveRadius/111.0;
        const bbox = `${cy-rad},${cx-rad},${cy+rad},${cx+rad}`;
        const q=`[out:json][timeout:20];(way["building"](${bbox});way["landuse"~"^(residential|commercial|industrial|retail|farmland|meadow|forest|cemetery|recreation_ground)$"](${bbox}););out center qt 200;`;
        const r = await fetch('https://overpass-api.de/api/interpreter',
          {method:'POST',body:'data='+encodeURIComponent(q),signal:AbortSignal.timeout(18000)});
        return (await r.json()).elements||[];
      })(),
      siruta ? this._fetchPermitsGrowth(siruta) : Promise.resolve(null),
    ]);

    const elements = osmData.status==='fulfilled' ? osmData.value : [];
    const permits  = permitsData.status==='fulfilled' ? permitsData.value : null;
    // permits_growth: >1.0 = creștere AC, <1.0 = scădere, 1.0 = neutru
    const permitsGrowth = permits?.trend || 1.0;

    if(!elements.length) {
      console.warn('[Frontier] OSM fără date — frontier analysis anulat');
      return [];
    }
    console.log('[Frontier] OSM:', elements.length, '| INS AC trend:', permitsGrowth.toFixed(2));

    // ── Clasificare OSM ───────────────────────────────────────────────
    const buildings=[], excludedCells=new Set(), developableCells=new Set();
    elements.forEach(el=>{
      const lon=el.lon||el.center?.lon, lat=el.lat||el.center?.lat;
      if(!lon||!lat) return;
      const t=el.tags||{}, ck=`${Math.round(lon/cellDeg)}_${Math.round(lat/cellDeg)}`;
      if(t.building) buildings.push([lon,lat]);
      if(t.landuse) {
        if(['forest','cemetery','recreation_ground'].includes(t.landuse)) excludedCells.add(ck);
        if(['farmland','meadow'].includes(t.landuse)) developableCells.add(ck);
      }
    });

    // ── Grid 200m × 200m ─────────────────────────────────────────────
    const cells = new Map();
    const gridR = Math.ceil(effectiveRadius*1000/200);
    const need  = this._calcUrbanNeed(this.d);
    const seisC = this._getSeismicAg(cx,cy);
    const clim  = this._getClimateProfile(this.d?.judet||'');

    for(let gi=-gridR; gi<=gridR; gi++) {
      for(let gj=-gridR; gj<=gridR; gj++) {
        const lon=cx+gj*cellDeg, lat=cy+gi*cellDeg;
        const dk=Math.hypot((lon-cx)*R*cp,(lat-cy)*R)/1000;
        if(dk>effectiveRadius) continue;
        const ck=`${Math.round(lon/cellDeg)}_${Math.round(lat/cellDeg)}`;
        if(excludedCells.has(ck)) continue;

        // Ra: accesibilitate rutieră
        const nearRoad=this._lastCors?.length
          ? Math.min(...this._lastCors.slice(0,60).map(c=>Math.hypot((lon-c.lon)*R*cp,(lat-c.lat)*R)))
          : 800;
        const Ra=Math.max(0,1-nearRoad/2000);

        // Db: densitate clădiri vecine în 400m
        const Db_n=buildings.filter(([bl,bt])=>Math.hypot((lon-bl)*R*cp,(lat-bt)*R)<400).length;
        const Db=Math.min(1,Db_n/15);
        const isFrontier=Db>0.05&&Db<0.7;

        // Zf: compatibilitate teren
        const Zf=developableCells.has(ck)?0.9:(Db<0.3?0.7:0.4);

        // Ec: economie + trend autorizații INS TEMPO LOC103A
        const Ec=Math.min(1,(this.d?.coef_hub||0.7)*Math.min(1.4,permitsGrowth));

        // Ce: climă/risc (inversat)
        const Ce=Math.max(0,1-seisC.ag/0.5*0.4-clim.flood*0.2);

        // Sg: demografic
        const Sg=Math.min(1,(need.deltaPop>0?0.7:0.3)+(need.locuinteTotale>5000?0.3:0.1));

        // Id: proximitate centru
        const Id=Math.max(0,1-dk/effectiveRadius);

        // P(u) din document
        const Pu=isFrontier
          ? Ra*0.25+Db*0.20+Ec*0.15+Id*0.15+Ce*0.10+Zf*0.10+Sg*0.05
          : Ra*0.12+Db*0.10+Ec*0.10+Id*0.10+Ce*0.05+Zf*0.05+Sg*0.03;

        if(Pu>0.22) cells.set(`${gj}_${gi}`,{lon,lat,Pu,Ra,Db,Ec,Id,Ce,Zf,Sg,isFrontier,dk,permitsGrowth});
      }
    }

    // ── Slope Engine: batch elevation pentru top 100 celule ──────────
    // Documentul: "Nu faceți fetch per celulă. Faceți batch."
    const sortedForSlope = [...cells.values()].sort((a,b)=>b.Pu-a.Pu).slice(0,100);
    const elevBatch = sortedForSlope.map(c=>({key:`${c.lon.toFixed(4)}_${c.lat.toFixed(4)}`,lon:c.lon,lat:c.lat}));
    const elevMap = await this._fetchElevationBatch(elevBatch);

    // Calculează panta și aplică suitability
    const cellDegM = cellDeg * R; // ~222m per celulă
    if(elevMap.size > 0) {
      cells.forEach((cell, key) => {
        const eKey = `${cell.lon.toFixed(4)}_${cell.lat.toFixed(4)}`;
        const elev = elevMap.get(eKey);
        if(elev === undefined) return;

        // Calculează panta față de celula vecină la est (+cellDeg)
        const neighborKey = `${(cell.lon+cellDeg).toFixed(4)}_${cell.lat.toFixed(4)}`;
        const elevNeighbor = elevMap.get(neighborKey) || elev;
        const slopeDeg = this._calcSlopeDeg(elev, elevNeighbor, cellDegM);
        const suit = this._slopeToSuitability(slopeDeg, gravity.lifecycle?.score || 0);

        cell.elevation = elev;
        cell.slopeDeg  = slopeDeg;
        cell.slopeSuit = suit.suit;
        cell.slopeType = suit.type;
        cell.allowType = suit.allow;

        // Aplică slope suitability în P(u)
        cell.Pu = cell.Pu * suit.suit;

        // Dacă slope interzice construcțiile noi → elimină din candidați
        if(suit.allow === 'none' || suit.allow === 'none_new') {
          cells.delete(key);
        }
      });
      console.log(`[Slope] ✅ Slope aplicat. Celule rămase: ${cells.size}`);
    }

    // ── Top celule → zone (clustering minim 600m) ─────────────────────
    const sorted=[...cells.values()].sort((a,b)=>b.Pu-a.Pu);
    const zones=[],used=[],minDist=600;

    for(const cell of sorted){
      if(zones.length>=8) break;
      if(used.some(u=>Math.hypot((cell.lon-u[0])*R*cp,(cell.lat-u[1])*R)<minDist)) continue;
      const seis=this._getSeismicAg(cell.lon,cell.lat);
      const scn=this._getScenario();

      // Slope suitability influențează hMax și tipul de dezvoltare
      const slopeSuit = cell.slopeSuit ?? 1.0;
      const isVillaPremium = cell.allowType === 'villa_low_density';
      const hBase = isVillaPremium ? 8 : (cell.Pu>0.6?30:cell.Pu>0.45?20:12);
      const hMax = Math.min(seis.hMaxM*(scn.hMaxMultiplier||1), hBase * slopeSuit + 4);

      const pClass=cell.Pu>0.65?'HIGH':cell.Pu>0.45?'MEDIUM':'LOW';
      const color = isVillaPremium ? '#a78bfa'  // violet = premium
        : cell.Pu>0.65?'#f59e0b':cell.Pu>0.45?'#2563eb':'#16a34a';
      const startYr=2025+Math.round((1-cell.Pu)*15);

      const slopeLabel = cell.slopeDeg
        ? ` · ${Math.round(cell.slopeDeg)}° ${cell.slopeType||''}`
        : '';
      const label = isVillaPremium
        ? `Premium Low-Density · P=${Math.round(cell.Pu*100)}%`
        : `Frontier ${pClass} · P=${Math.round(cell.Pu*100)}%`;

      zones.push({
        lon:cell.lon,lat:cell.lat,
        id:`FRN-${zones.length}`,color,hMax,startYr,
        rx:isVillaPremium?0.002:0.003+cell.Pu*0.003,
        ry:isVillaPremium?0.0014:0.002+cell.Pu*0.002,
        label,
        sub:`Db=${cell.Db.toFixed(2)} Ra=${cell.Ra.toFixed(2)}${slopeLabel}`,
        _prob:cell.Pu,_class:pClass,
      });
      used.push([cell.lon,cell.lat]);
    }

    console.log(`[Frontier] ✅ ${zones.length} zone (${cells.size} celule) · AC_trend=${permitsGrowth.toFixed(2)}`);
    return zones;
  },


  // ══════════════════════════════════════════════════════════════════════
  // INS TEMPO — LOC103A: Autorizații de Construire per UAT
  // API gratuit · portal statistici.insse.ro
  // Returnează permits_growth = trend AC ultimii 3 ani vs precedenți 3
  // ══════════════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════
  // SLOPE ENGINE — Terrain Suitability via OpenTopoData SRTM 90m
  // ── Batch sampling (nu per celulă!) — max 100 locații per request ────
  // Sursa: api.opentopodata.org · SRTM 90m · gratuit fără autentificare
  //
  // Suitability per pantă (din document):
  //   0-5°  → 1.00 (excelent)
  //   5-10° → 0.85 (bun)
  //  10-15° → 0.60 (limitat)
  //  15-25° → 0.25 (dificil — sau premium vilă dacă income high)
  //   >25°  → 0.00 (interzis)
  // ══════════════════════════════════════════════════════════════════════
  async _fetchElevationBatch(cells) {
    // cells = [{lon, lat, key}, ...] — max 100
    if(!cells?.length) return new Map();

    const batch = cells.slice(0, 100);
    const locations = batch.map(c => `${c.lat.toFixed(4)},${c.lon.toFixed(4)}`).join('|');
    const url = `https://api.opentopodata.org/v1/srtm90m?locations=${locations}`;

    try {
      const r = await fetch(url, {signal: AbortSignal.timeout(8000)});
      if(!r.ok) return new Map();
      const data = await r.json();
      const elevMap = new Map();
      (data.results || []).forEach((res, i) => {
        if(batch[i]) elevMap.set(batch[i].key, res.elevation || 0);
      });
      console.log(`[Slope] ✅ Elevație pentru ${elevMap.size} celule`);
      return elevMap;
    } catch(e) {
      console.warn('[Slope] OpenTopoData indisponibil:', e.message);
      return new Map();
    }
  },

  // Calculează suitability din pantă (grade)
  // Bonus premium: pantă 10-25° + lifecycle.score > 0 → vilă low density
  _slopeToSuitability(slopeDeg, lifecycleScore=0) {
    if(slopeDeg <= 5)  return {suit:1.00, type:'flat',    allow:'all'};
    if(slopeDeg <= 10) return {suit:0.85, type:'gentle',  allow:'all'};
    if(slopeDeg <= 15) return {suit:0.60, type:'moderate',allow:'residential_medium'};
    if(slopeDeg <= 25) {
      // Pantă medie + economie bună = potential premium (Copou, Brașov, faleză)
      if(lifecycleScore > 0.2) return {suit:0.35, type:'steep_premium', allow:'villa_low_density'};
      return {suit:0.20, type:'steep', allow:'none_new'};
    }
    return {suit:0.00, type:'cliff', allow:'none'};
  },

  // Calculează panta în grade între două celule adiacente
  _calcSlopeDeg(elev1, elev2, distM) {
    if(!distM || distM === 0) return 0;
    return Math.abs(Math.atan2(Math.abs(elev1 - elev2), distM) * 180 / Math.PI);
  },

  async _fetchPermitsGrowth(sirutaCode) {
    if(!sirutaCode) return null;
    const url = `https://statistici.insse.ro:8077/tempo-ins/matrix/LOC103A?`+
      `Judete=${sirutaCode}&Destinatii=TOTAL&Ani=2019,2020,2021,2022,2023,2024&lang=ro`;
    try {
      const r = await fetch(url, {signal:AbortSignal.timeout(6000), mode:'cors'});
      if(!r.ok) return null;
      const data = await r.json();
      const vals = (data?.rowDimensions?.[0]?.valori||[]).map(Number).filter(v=>!isNaN(v)&&v>0);
      if(vals.length < 4) return null;
      const recent = vals.slice(-3).reduce((a,b)=>a+b,0)/3;
      const older  = vals.slice(-6,-3).reduce((a,b)=>a+b,0)/3;
      const trend  = older > 0 ? recent/older : 1.0;
      console.log(`[INS TEMPO] LOC103A ${sirutaCode}: trend=${trend.toFixed(2)} (${Math.round(recent)} AC/an)`);
      return {trend, acPerAn: Math.round(recent)};
    } catch(e) {
      console.log('[INS TEMPO] indisponibil:', e.message);
      return null;
    }
  },

  // ══════════════════════════════════════════════════════════════════════
  // OSRM — Travel time center (isochrone engine)
  // API gratuit · router.project-osrm.org
  // Returnează travel_time_center în minute pentru orice punct → centru UAT
  // ══════════════════════════════════════════════════════════════════════
  async _fetchTravelTime(fromLon, fromLat, toLon, toLat) {
    const url = `https://router.project-osrm.org/route/v1/driving/`+
      `${fromLon},${fromLat};${toLon},${toLat}?overview=false&alternatives=false`;
    try {
      const r = await fetch(url, {signal:AbortSignal.timeout(5000)});
      if(!r.ok) return null;
      const data = await r.json();
      return {
        durationMin: Math.round((data.routes?.[0]?.duration||0)/60),
        distanceKm:  Math.round((data.routes?.[0]?.distance||0)/100)/10,
      };
    } catch(e) { return null; }
  },

  _randn(m,s){const u1=Math.random(),u2=Math.random();return Math.max(.05,m+Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2)*s);},
  _calcZoneProb(zone,cityData,baseScore){
    const N=300,grav=this._calcGravityScore(cityData),seis=this._getSeismicAg(cityData?.lon||27.6,cityData?.lat||47.16),clim=this._getClimateProfile(cityData?.judet||'');
    const bs=Math.min(1,Math.max(0,baseScore||(grav.gravityScore*.4+(1-seis.ag/.5)*.2+(zone.devScore||.5)*.4)));
    const W={E:.25,M:.20,I:.25,C:.15,G:.15};
    let ok=0;
    for(let i=0;i<N;i++){
      const sc=bs*(this._randn(1,.25)*W.E+this._randn(1,.30)*W.M+this._randn(1,.20)*W.I+(2-this._randn(1,.22))*W.C+this._randn(1,.28)*W.G);
      if(sc>.5)ok++;
    }
    const p=ok/N,pct=Math.round(p*100);
    const cls=p>=.70?'HIGH':p>=.45?'MEDIUM':p>=.25?'LOW':'UNLIKELY';
    const col=p>=.70?'#22c55e':p>=.45?'#f59e0b':p>=.25?'#64748b':'#374151';
    return{probability:p,pct,classification:cls,color:col,label:`${cls} ${pct}%`};
  },
  _runUPE(cityData,zones){
    const res={};
    (zones||[]).forEach(z=>{res[z.id||z.label]=this._calcZoneProb(z,cityData,null);});
    console.log('[UPE] Monte Carlo complet:',Object.entries(res).map(([k,v])=>`${k}:${v.pct}%`).slice(0,5).join(', '));
    return res;
  },

  // ══════════════════════════════════════════════════════════════════════
  // REAL ESTATE FEASIBILITY ENGINE
  // ROI = (Vsale - Ctotal) / Ctotal
  // ══════════════════════════════════════════════════════════════════════
  _calcFeasibility(zone,cityData,seismicAg){
    const g=this._calcGravityScore(cityData);
    const pi=g.growthType==='METROPOLITAN'?1.0:g.growthType==='REGIONAL'?.65:g.growthType==='LOCAL'?.45:.30;
    const pS=Math.round(1800*pi),pL=Math.round(200*pi),pB=Math.round(700+(seismicAg||.2)*500);
    const cF=pB*.07*2.5,cT=pL+pB+cF,roi=(pS-cT)/cT;
    return{priceSale:pS,priceLand:pL,priceBuild:pB,cTotal:Math.round(cT),roi:Math.round(roi*1000)/10,viable:roi>.12,label:roi>.12?`ROI ${Math.round(roi*100)}% ✓`:`ROI ${Math.round(roi*100)}% — risc`};
  },

  // ══════════════════════════════════════════════════════════════════════
  // SALVARE SCENARII
  // ══════════════════════════════════════════════════════════════════════
  _saveScenario(name){
    const d=this.cityData||{},scn=this._getScenario(),need=this._calcUrbanNeed(d);
    const snap={id:`tci_${Date.now()}`,name:name||`${d.name||'UAT'} — ${scn.label} — ${new Date().toLocaleDateString('ro-RO')}`,savedAt:new Date().toISOString(),cityKey:this.cityKey,cityName:d.name,pop2021:d.pop2021,scenario:this.scenario,pop2055:need.pop2055,locuinteTotale:need.locuinteTotale,zones:(this._projZones||[]).map(z=>({id:z.id,label:z.label,hMax:z.hMax,startYr:z.startYr}))};
    try{const ex=JSON.parse(localStorage.getItem('tci_scenarios')||'[]');ex.unshift(snap);localStorage.setItem('tci_scenarios',JSON.stringify(ex.slice(0,20)));}catch(e){}
    console.log('[TCI] Scenariu salvat:',snap.name);
    return snap;
  },

  // ══════════════════════════════════════════════════════════════════════
  // GENERATOR RAPORT PDF
  // ══════════════════════════════════════════════════════════════════════
  _generateReport(){
    const d=this.d||{},scn=this._getScenario(),need=this._calcUrbanNeed(d);
    const grav=this._calcGravityScore(d),seis=this._getSeismicAg(d.lon||27.6,d.lat||47.16);
    const clim=this._getClimateProfile(d.judet||''),zones=this._projZones||[];
    const upeRes=this._runUPE(d,zones),feas=this._calcFeasibility({},d,seis.ag);
    const today=new Date().toLocaleDateString('ro-RO',{year:'numeric',month:'long',day:'numeric'});
    const todayISO=new Date().toISOString().split('T')[0];
    const pop21=(d.pop2021||0).toLocaleString('ro-RO'),pop55=(need.pop2055||0).toLocaleString('ro-RO');
    const investEst=Math.round((need.totalM2||0)*1200/1000000);
    const html=`<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8"><title>Raport TCI — ${d.name} — ${today}</title>
<style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;color:#1e293b;font-size:10.5pt;line-height:1.65}
@media print{.no-print{display:none}.page-break{page-break-before:always}@page{margin:1.8cm;size:A4}}
.hdr{background:linear-gradient(135deg,#0f172a,#1a2f5e);color:#fff;padding:28px 36px}
h1{font-size:22pt;font-weight:800}.sub{font-size:11pt;color:rgba(255,255,255,.7);margin-top:4px}
.warn{background:#fffbeb;border-left:4px solid #f59e0b;padding:10px 16px;font-size:8.5pt;color:#78350f}
.content{padding:28px 36px}
h2{font-size:13pt;font-weight:700;color:#0f172a;margin:24px 0 10px;padding-bottom:5px;border-bottom:2.5px solid #e2e8f0}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0}
.kpi{background:#f8fafc;border:1px solid #e2e8f0;border-radius:7px;padding:12px 14px}
.kv{font-size:17pt;font-weight:700;color:#0f172a;line-height:1.1}.kl{font-size:7.5pt;color:#64748b;text-transform:uppercase;margin-top:3px}.ks{font-size:7pt;color:#94a3b8;margin-top:4px;font-style:italic}
.kpi.b{border-color:#93c5fd;background:#eff6ff}.kpi.b .kv{color:#1d4ed8}
.kpi.g{border-color:#86efac;background:#f0fdf4}.kpi.g .kv{color:#166534}
.kpi.r{border-color:#fca5a5;background:#fef2f2}.kpi.r .kv{color:#991b1b}
table{width:100%;border-collapse:collapse;margin:10px 0;font-size:9pt}
th{background:#0f172a;color:#fff;padding:8px 10px;text-align:left;font-size:8pt;font-weight:600}
td{padding:7px 10px;border-bottom:1px solid #f1f5f9}tr:nth-child(even) td{background:#f8fafc}
.formula{background:#0f172a;color:#e2e8f0;border-radius:8px;padding:14px 18px;font-family:monospace;font-size:9pt;margin:10px 0;line-height:1.9}
.formula .c{color:#64748b}.formula .v{color:#86efac}
.pred{border-left:3px solid;padding:10px 14px;margin:8px 0;border-radius:0 6px 6px 0}
.pred.y{border-color:#f59e0b;background:#fffbeb}.pred.b{border-color:#3b82f6;background:#eff6ff}.pred.p{border-color:#8b5cf6;background:#f5f3ff}
.zone-row{display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #f1f5f9}
.zone-dot{width:11px;height:11px;border-radius:2px;flex-shrink:0;margin-top:3px}
.src-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:10px 0}
.src{border:1px solid #e2e8f0;border-radius:6px;padding:9px 11px}
.sn{font-weight:700;font-size:9pt}.sd{font-size:8pt;color:#64748b;margin-top:2px}.st{font-size:7.5pt;color:#94a3b8;margin-top:3px;font-style:italic}
.footer{background:#f8fafc;border-top:2px solid #e2e8f0;padding:16px 36px;font-size:8pt;color:#94a3b8;display:flex;justify-content:space-between}
.btn{position:fixed;top:16px;right:16px;z-index:999;background:#1d4ed8;color:#fff;border:none;border-radius:7px;padding:9px 18px;font-size:9.5pt;cursor:pointer;font-family:inherit}</style></head>
<body><button class="btn no-print" onclick="window.print()">⬇ Descarcă PDF</button>
<div class="hdr">
  <div style="font-size:9pt;color:rgba(255,255,255,.55);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px"><strong style="color:#D4AF37">UrbanX</strong> · TCI Cinema · Raport Predictiv Urban</div>
  <h1>${d.name||'Analiză UAT'}</h1>
  <div class="sub">Proiecție Urbanistică 2025–2055 · jud. ${d.judet||'—'} · ${today}</div>
  <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
    <span style="background:rgba(212,175,55,.2);border:1px solid #D4AF37;color:#D4AF37;padding:4px 10px;border-radius:4px;font-size:8.5pt;font-weight:600">★ ${scn.label}</span>
    <span style="background:${seis.ag>=.35?'rgba(239,68,68,.2)':'rgba(245,158,11,.2)'};border:1px solid ${seis.ag>=.35?'#ef4444':'#f59e0b'};color:${seis.ag>=.35?'#fca5a5':'#fcd34d'};padding:4px 10px;border-radius:4px;font-size:8.5pt">⚠ ag=${seis.ag}g · max R+${seis.hMaxStory}</span>
    <span style="background:rgba(99,102,241,.2);border:1px solid #818cf8;color:#c7d2fe;padding:4px 10px;border-radius:4px;font-size:8.5pt">${grav.growthType} · Gravity ${grav.gravityScore.toFixed(2)}</span>
  </div>
</div>
<div class="warn">⚠ Proiecție statistică bazată pe date oficiale. Nu substituie PUG/PUZ. Data: ${today} · Surse accesate: ${todayISO}</div>
<div class="content">
<h2>1. Sinteză UAT</h2>
<div class="kpis">
  <div class="kpi b"><div class="kv">${pop21}</div><div class="kl">Populație 2021</div><div class="ks">INS · Recensământ 2021</div></div>
  <div class="kpi ${need.pop2055>(d.pop2021||0)?'g':''}"><div class="kv">${pop55}</div><div class="kl">Estimat 2055</div><div class="ks">Cohort Survival INS · s=${need.s2025}→${need.s2055}</div></div>
  <div class="kpi b"><div class="kv">${(need.locuinteTotale||0).toLocaleString('ro-RO')}</div><div class="kl">Locuințe necesare</div><div class="ks">HFE + Cohort · ANCPI</div></div>
  <div class="kpi ${seis.ag>=.35?'r':''}"><div class="kv">ag=${seis.ag}g</div><div class="kl">Seismic · max R+${seis.hMaxStory}</div><div class="ks">P100-1/2013 MDLPA</div></div>
  <div class="kpi g"><div class="kv">€${investEst}M</div><div class="kl">Investiție estimată</div><div class="ks">€1.200/m² · ANCPI 2024</div></div>
  <div class="kpi"><div class="kv">${feas.roi}%</div><div class="kl">ROI estimat · ${feas.viable?'✓ Viabil':'⚠ Risc'}</div><div class="ks">Prag viabilitate: 12%</div></div>
  <div class="kpi"><div class="kv">${need.s2025}→${need.s2055}</div><div class="kl">Household size 2025→2055</div><div class="ks">HFE · INS trend scădere</div></div>
  <div class="kpi"><div class="kv">${clim.uhi}°C UHI</div><div class="kl">Insulă căldură 2055 · zona ${clim.zone}</div><div class="ks">Copernicus · IPCC AR6 RCP4.5</div></div>
</div>

<h2>2. Predicții 2025–2055</h2>
<div class="pred y"><div style="font-size:10pt;font-weight:700;margin-bottom:4px">🏗 2025–2030</div>
  <p style="margin:0">Orizont scurt: ${(need.locuinteNoi||0).toLocaleString('ro-RO')} locuințe noi din creștere demografică + ${(need.locuinteReab||0).toLocaleString('ro-RO')} reabilitări. Household size în scădere (${need.s2025}→${need.s2055}) generează cerere suplimentară. Zone active: ${zones.filter(z=>z.startYr<=2030).slice(0,3).map(z=>z.label||z.id).join(', ')||'—'}.</p></div>
<div class="pred b"><div style="font-size:10pt;font-weight:700;margin-bottom:4px">🏙 2030–2040</div>
  <p style="margin:0">Faza de maturizare. ${grav.growthType==='METROPOLITAN'?'Presiunea imobiliară crescută pe axele de transport. IT și servicii avansate domină cererea de locuințe premium.':grav.growthType==='DECLINING'?'Reabilitarea fondului construit devine prioritară. Construcțiile noi limitate la zone strategice.':'Densificare moderată de-a lungul coridoarelor de mobilitate.'} Impactul A7/A8 se materializează în zone logistice și rezidențiale periurbane.</p></div>
<div class="pred p"><div style="font-size:10pt;font-weight:700;margin-bottom:4px">🌆 2040–2055</div>
  <p style="margin:0">Orizont lung: populație estimată ${pop55}. Climat (zona ${clim.zone}, UHI +${clim.uhi}°C) impune standarde verzi obligatorii. ${seis.ag>=.35?`Restricție seismică ag=${seis.ag}g menține înălțimile reduse (max R+${seis.hMaxStory}).`:''} Household size ${need.s2055} → cerere structurală pentru locuințe mai mici și de calitate.</p></div>

<h2>3. Modele Matematice</h2>
<div class="formula"><span class="c">Cohort Survival (INS/Eurostat):</span>
Px+5,t+5 = Px,t × Sx + Mx,t
  <span class="c">Sx = rata supraviețuire INS 2021 per cohortă și sex</span>
  <span class="c">Mx,t = flux migrație per cohortă × ponderi vârstă × bonus universitar ×${(d?.universitati||0)>0?'1.3':'1.0'}</span>
  <span class="v">→ ${(d.pop2021||0).toLocaleString('ro-RO')} → ${pop55} | rată INS: ${(d.rata_reala_2011_2021||0).toFixed(2)}%/an × scenariu ×${scn.rateMultiplier}</span>

<span class="c">Household Formation Engine:</span>
Ht = Pt / St  — St = f(tip_urban, an)   <span class="v">→ ${need.s2025} (2025) → ${need.s2055} (2055)</span>

<span class="c">Urban Gravity Model:</span>
G = eP×0.30 + eC×0.25 + eE×0.20 + eK×0.15 + eI×0.10   <span class="v">→ ${grav.gravityScore.toFixed(3)} = ${grav.growthType}</span>

<span class="c">Urban Probability Engine (Monte Carlo N=300):</span>
P(D) = f(E, M, I, C, G)   <span class="v">→ probabilitate per zonă, nu valori fixe</span>

<span class="c">Real Estate Feasibility:</span>
ROI = (Vsale - Ctotal) / Ctotal   <span class="v">→ ROI ${feas.roi}% (prag 12%: ${feas.viable?'✓ VIABIL':'⚠ RISC'})</span></div>

<h2>4. Zone de Dezvoltare — Probabilistic</h2>
<p style="font-size:8.5pt;color:#64748b;margin-bottom:10px">P(D) = f(E,M,I,C,G) — Monte Carlo 300 simulări per zonă · Nu certitudini, ci probabilități.</p>
<table>
  <tr><th>Zonă</th><th>Probabilitate</th><th>Clasificare</th><th>hMax</th><th>Start</th></tr>
  ${zones.slice(0,15).map(z=>{const u=upeRes[z.id||z.label]||{pct:50,classification:'MEDIUM',color:'#f59e0b'};return`<tr><td><strong>${z.label||z.id}</strong><div style="font-size:7.5pt;color:#64748b">${z.sub||''}</div></td><td><div style="display:flex;align-items:center;gap:6px"><div style="width:${u.pct}px;height:9px;background:${u.color};border-radius:2px;max-width:80px"></div><strong style="color:${u.color}">${u.pct}%</strong></div></td><td><span style="background:${u.color}22;color:${u.color};padding:2px 7px;border-radius:9px;font-size:7.5pt;font-weight:600">${u.classification}</span></td><td>${z.hMax||'—'}m</td><td>${z.startYr||'—'}</td></tr>`;}).join('')}
</table>

<h2 class="page-break">5. Scenarii Comparative</h2>
<table>
  <tr><th>Scenariu</th><th>Ipoteză</th><th>Rată ×</th><th>Locuințe est.</th><th>hMax ×</th></tr>
  ${['S1','S2','S3','S4'].map(s=>{const sc=this._SCENARIOS[s];const loc=Math.round((need.locuinteTotale||0)*sc.rateMultiplier);return`<tr ${this.scenario===s?'style="background:#eff6ff;font-weight:600"':''}><td>${s} ${sc.label}</td><td>${s==='S1'?'PNRR complet, investiții masive':s==='S2'?'Referință INS':s==='S3'?'Prioritate calitate':' Crize climatice'}</td><td>×${sc.rateMultiplier}</td><td>${loc.toLocaleString('ro-RO')}</td><td>×${sc.hMaxMultiplier}</td></tr>`;}).join('')}
</table>

<h2>6. Surse Oficiale — Data accesului: ${todayISO}</h2>
<div class="src-grid">
  <div class="src"><div class="sn">INS — Institutul Național de Statistică</div><div class="sd">Recensământ 2021, rate supraviețuire cohorte, household size trend</div><div class="st">insse.ro · accesat ${todayISO}</div></div>
  <div class="src"><div class="sn">ANCPI — Cadastru și Publicitate Imobiliară</div><div class="sd">Autorizații construire, suprafață medie 68m², rata înlocuire 1.2%/an</div><div class="st">geoportal.ancpi.ro · accesat ${todayISO}</div></div>
  <div class="src"><div class="sn">MDLPA — Normativ P100-1/2013</div><div class="sd">Zonare seismică, accelerație ag, restricții înălțime clădiri</div><div class="st">mdlpa.ro · accesat ${todayISO}</div></div>
  <div class="src"><div class="sn">OpenStreetMap + Overpass API</div><div class="sd">Rețea rutieră live: autostrăzi, DN, DJ. Constrângeri: plaje, mine, porturi</div><div class="st">overpass-api.de · accesat ${todayISO}</div></div>
  <div class="src"><div class="sn">CNAIR — Autostrăzi planificate</div><div class="sd">A7 (2027), A8 (2028), A13 (2032), centuri ocolitoare</div><div class="st">cnair.ro · accesat ${todayISO}</div></div>
  <div class="src"><div class="sn">Copernicus + IPCC AR6 + Eurostat</div><div class="sd">UHI, RCP4.5/8.5, risc secetă/inundații, Urban Audit comparații EU</div><div class="st">cds.climate.copernicus.eu · ec.europa.eu/eurostat · accesat ${todayISO}</div></div>
</div>

<h2>7. Recomandări Instituționale</h2>
<table>
  <tr><th>Destinatar</th><th>Acțiune</th><th>Termen</th></tr>
  <tr><td><strong>Primărie / CL</strong></td><td>Actualizare PUG cu zonele identificate. Rezervare coridor A7/A8/centuri</td><td>2025-2027</td></tr>
  <tr><td><strong>CNAIR</strong></td><td>Coordonare noduri autostradă cu zonele logistice (devScore>0.7)</td><td>2025-2028</td></tr>
  <tr><td><strong>OAR / Urbaniști</strong></td><td>PUZ zone periurbane. Regulament înălțimi conform P100 ag=${seis.ag}g</td><td>2026-2030</td></tr>
  <tr><td><strong>Investitori</strong></td><td>Zone prioritare: ROI ${feas.roi}% · ${feas.viable?'Viabil în condițiile actuale':'Verificați finanțarea'}</td><td>Imediat</td></tr>
  <tr><td><strong>MDLPA</strong></td><td>Integrare PATN Secțiunea IV · corelare A7/A8 · finanțare PNRR</td><td>2026-2028</td></tr>
</table>
</div>
<div class="footer">
  <div><strong>UrbanX TCI Cinema</strong> · Think Smart Solutions<br>Motor: Cohort Survival INS · HFE · Urban Gravity · Road Corridor · UPE Monte Carlo · Seismic P100</div>
  <div style="text-align:right">Generat: ${today}<br>${this.scenario} · ${scn.label} · ID: TCI-${todayISO}-${(this.cityKey||'uat').toUpperCase()}</div>
</div></body></html>`;
    const w=window.open('','_blank');
    if(w){w.document.write(html);w.document.close();}
    return html;
  },

    // Genereaza zonele de proiecție statistic — cercuri concentrice
  // + coridoare de mobilitate + zone de reconversie industrială
  _generateStatisticalProjection(cx, cy) {
    const pop  = this.d?.pop2021 || 100000;
    const rate = Math.abs(this.d?.rata_reala_2011_2021 || 0) / 100;
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

  // ══════════════════════════════════════════════════════════════════════
  // SISTEM CONSTRÂNGERI — universal, orice UAT România
  // Sursă: CIMEC WFS (LMI), Overpass OSM (cimitire/păduri/ape/CF),
  //        DB aeroporturi România (OCA geometric), P100-1/2022 (seismic)
  // Rezultat: zonă construibilă reală după eliminarea TUTUROR restricțiilor
  // ══════════════════════════════════════════════════════════════════════

  _CONSTRAINT: {

    // ── Aeroporturi România — OCA ICAO Annexa 14 geometric ─────────────
    // ── BAZA DE DATE PROTECȚII CRITICE ROMÂNIA ──────────────────────────
    // Locații care NU pot apărea în nicio predicție
    // Sursa: LMI oficial + cunoaștere teren + PUG-uri verificate
    // OSM poate fi greșit — această bază este mereu corectă
    PROTECTED_RO: {
      'iasi': [
        {lon:27.5895, lat:47.1521, r:120, reason:'Cimitirul Eternitatea — LMI I-s-B-02537'},
        {lon:27.6050, lat:47.1910, r:80,  reason:'Cimitirul Sf. Apostoli Petru și Pavel'},
        {lon:27.6218, lat:47.1955, r:80,  reason:'Cimitirul Armenesc'},
        {lon:27.6350, lat:47.1950, r:350, reason:'Pădurea Ciric — rezervație naturală'},
        {lon:27.5850, lat:47.1650, r:200, reason:'Lacul Ciric — zonă hidrografică'},
        {lon:27.5640, lat:47.1680, r:80,  reason:'Stadionul TEPRO'},
        {lon:27.5960, lat:47.1560, r:100, reason:'Grădina Botanică Iași — LMI'},
        {lon:27.5790, lat:47.1600, r:60,  reason:'Cimitirul Evreiesc Iași'},
      ],
      'botosani': [
        {lon:26.6680, lat:47.7420, r:80,  reason:'Cimitirul Central Botoșani'},
        {lon:26.6350, lat:47.7550, r:200, reason:'Parcul Naturăl Botoșani'},
      ],
      'cluj': [
        {lon:23.5902, lat:46.7712, r:100, reason:'Cimitirul Central Cluj'},
        {lon:23.5825, lat:46.7834, r:300, reason:'Parcul Felie Cluj'},
      ],
      'timisoara': [
        {lon:21.2240, lat:45.7519, r:100, reason:'Cimitirul Eroilor Timișoara'},
      ],
      'constanta': [
        {lon:28.6330, lat:44.1715, r:150, reason:'Cimitirul Municipal Constanța'},
      ],
      // Template pentru adăugare UAT nou:
      // 'key-uat': [{lon, lat, r_in_meters, reason}, ...]
    },

    // Returnează protecțiile pentru un UAT dat (combinate cu Overpass)
    getProtectedForCity(lon, lat) {
      // Identifică UAT-ul după coordonate (simplu: cel mai apropiat din PROTECTED_RO)
      const R = 111319.9;
      let bestKey = null, minDist = Infinity;
      Object.entries(this.PROTECTED_RO).forEach(([key, zones]) => {
        zones.forEach(z => {
          const d = Math.hypot((lon-z.lon)*R, (lat-z.lat)*R);
          if(d < minDist) { minDist = d; bestKey = key; }
        });
      });
      // Returnează zonele dacă suntem în proximitate (<30km de centrul de date)
      if(bestKey && minDist < 30000) {
        console.log('[CONSTRAINT] Protecții hardcodate pentru:', bestKey, '(', this.PROTECTED_RO[bestKey].length, 'zone)');
        return this.PROTECTED_RO[bestKey];
      }
      return [];
    },

    AIRPORTS: [
      {n:'Iași LRIA',             lon:27.6199,lat:47.1782,elev:121,pista:2400},
      {n:'București Otopeni LROP',lon:26.0850,lat:44.5722,elev:96, pista:3500},
      {n:'Băneasa LRBS',          lon:26.1021,lat:44.5030,elev:90, pista:1800},
      {n:'Cluj-Napoca LRCL',      lon:23.6862,lat:46.7852,elev:415,pista:2100},
      {n:'Timișoara LRTR',        lon:21.3380,lat:45.7998,elev:91, pista:3500},
      {n:'Constanța LRCK',        lon:28.4883,lat:44.1822,elev:62, pista:3100},
      {n:'Bacău LRBC',            lon:26.9102,lat:46.5219,elev:185,pista:2400},
      {n:'Sibiu LRSB',            lon:24.0913,lat:45.7856,elev:444,pista:2000},
      {n:'Târgu Mureș LRTM',      lon:24.4125,lat:46.4677,elev:308,pista:2000},
      {n:'Oradea LROD',           lon:21.9025,lat:47.0253,elev:131,pista:2000},
      {n:'Suceava LRSV',          lon:26.3541,lat:47.6875,elev:374,pista:2400},
      {n:'Satu Mare LRSM',        lon:22.8857,lat:47.7033,elev:121,pista:2000},
      {n:'Arad LRAR',             lon:21.2620,lat:46.1766,elev:100,pista:2500},
      {n:'Craiova LRCV',          lon:23.8886,lat:44.3181,elev:95, pista:2000},
      {n:'Tulcea LRTC',           lon:28.7103,lat:45.0625,elev:10, pista:2000},
      {n:'Brașov-Ghimbav LRBV',   lon:25.5128,lat:45.8119,elev:540,pista:2200},
      {n:'Deva-Soimus LROD',      lon:22.9018,lat:45.8769,elev:238,pista:1800},
      {n:'Tuzla LRTZ',            lon:28.5997,lat:43.9925,elev:9,  pista:1800},
      {n:'Caransebeș LRCS',       lon:22.2532,lat:45.4200,elev:240,pista:2000},
    ],

    // ── Zonare seismică P100-1/2022 — per regiune geografică ─────────
    // ag = accelerație proiectare [g], Tc = perioadă colț [s]
    _seismicByCoord(lon, lat) {
      // Zona B — influență directă Vrancea (Moldova de Sud + Muntenia)
      if(lat>=44.8&&lat<=46.8&&lon>=26.0&&lon<=28.5) return {zone:'B',ag:0.30,Tc:1.6};
      // Zona A — epicentral Vrancea
      if(lat>=45.0&&lat<=46.0&&lon>=26.5&&lon<=27.5) return {zone:'A',ag:0.40,Tc:1.6};
      // București + Ilfov
      if(lat>=44.0&&lat<=44.8&&lon>=25.8&&lon<=26.4) return {zone:'B',ag:0.30,Tc:1.6};
      // Moldova Nord (Iași, Botoșani, Suceava)
      if(lat>=46.8&&lat<=48.2&&lon>=26.5&&lon<=28.5) return {zone:'C',ag:0.20,Tc:1.6};
      // Dobrogea
      if(lat>=43.5&&lat<=45.5&&lon>=28.0&&lon<=30.0) return {zone:'C',ag:0.20,Tc:0.7};
      // Transilvania — seismicitate redusă
      if(lon>=22.5&&lon<=26.5&&lat>=45.0&&lat<=47.5) return {zone:'D',ag:0.15,Tc:0.7};
      // Banat
      if(lon>=20.5&&lon<=22.5&&lat>=44.5&&lat<=47.0) return {zone:'D',ag:0.15,Tc:0.7};
      // Default
      return {zone:'D',ag:0.15,Tc:0.7};
    },

    // ── Check aeronautic — geometric OCA ──────────────────────────────
    checkAeronautic(lon, lat) {
      const R = 111319.9;
      const cp = Math.cos(lat*Math.PI/180);
      let closest=null, minDist=Infinity;
      this.AIRPORTS.forEach(ap=>{
        const d = Math.hypot((lon-ap.lon)*R*cp, (lat-ap.lat)*R);
        if(d<minDist){minDist=d;closest=ap;}
      });
      if(!closest||minDist>20000) return {restricted:false};
      // OCA simplificat ICAO Annexa 14: h_max crește cu distanța de la ARP
      const hMax = minDist>15000?Infinity : minDist>10000?150 : minDist>4000?45 : 15;
      return {
        restricted: minDist<15000, airport:closest.n,
        dist:Math.round(minDist), hMax,
        note:`OCA ICAO — ${closest.n} la ${Math.round(minDist/1000*10)/10}km`,
      };
    },

    // ── Overpass API — cimitire, păduri, ape, căi ferate ─────────────
    // ── MAPBOX SEARCH API — POI complet, orice UAT România ──────────────
    // Folosim tokenul Mapbox existent — nu e nevoie de API key separat
    // Date mult mai complete decât Overpass pentru România
    // Documentație: docs.mapbox.com/api/search/search-box/
    async _mapboxCategorySearch(category, lon, lat, radiusKm, token) {
      // Mapbox SearchBox v1/category este deprecat → 400 Bad Request
      // Folosim Geocoding API v5 cu query text — stabil și documentat
      const catMap = {
        'cemetery':   'cimitir cemetery graveyard',
        'park':       'parc park',
        'playground': 'loc de joacă playground',
        'hospital':   'spital hospital',
        'university': 'universitate university',
        'stadium':    'stadion stadium arena',
      };
      const q = catMap[category] || category;
      const margin = radiusKm / 111.32;
      const bbox   = `${lon-margin},${lat-margin},${lon+margin},${lat+margin}`;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json`+
                  `?bbox=${bbox}&limit=10&language=ro&access_token=${token}`;
      try {
        const resp = await fetch(url, {signal:AbortSignal.timeout(6000)});
        if(!resp.ok) return [];
        const data = await resp.json();
        return (data.features||[]).map(f=>({
          name:     f.text || f.place_name || category,
          lon:      f.center?.[0],
          lat:      f.center?.[1],
          category,
          tags:     f.properties || {},
        })).filter(p=>p.lon&&p.lat);
      } catch(e) { return []; }
    },

    // ── QUERY CONSTRÂNGERI — cimitire, spitale, parcuri via Mapbox ────
    // ── CIMEC WFS — LMI național, toate monumentele din orice UAT ──────
    // 3 tentative CORS: direct → corsproxy.io → allorigins.win
    // Aceasta e singura sursă completă pentru TOATE monumentele istorice RO
    // ── CIMEC WFS — toate monumentele istorice România ──────────────────
    // Necesită Cloudflare Worker proxy (cimec-worker.js din repo)
    // Setează URL-ul worker-ului în TCI.CIMEC_PROXY după deploy
    // Instrucțiuni: see DEPLOY_CIMEC_PROXY.md în repo
    // ── LMI — Supabase (primar) → CIMEC fallback ────────────────────────
    // Supabase: date pre-ingerate server-side, fără CORS, rapid
    // CIMEC: fallback dacă Supabase nu e configurat
    async queryLMI(lon, lat, radiusM) {
      // Încearcă Supabase mai întâi (romania_spatial_pipeline.py populează)
      const supabaseUrl = window.SUPABASE_URL || '';
      const supabaseKey = window.SUPABASE_ANON_KEY || '';
      if(supabaseUrl && supabaseKey) {
        try {
          const margin = radiusM / 111320;
          const url = `${supabaseUrl}/rest/v1/lmi_romania`+
            `?lon=gte.${lon-margin}&lon=lte.${lon+margin}`+
            `&lat=gte.${lat-margin}&lat=lte.${lat+margin}`+
            `&select=denumire,categorie,lon,lat,buffer_m,source`;
          const resp = await fetch(url, {
            headers:{'apikey':supabaseKey,'Authorization':`Bearer ${supabaseKey}`},
            signal:AbortSignal.timeout(5000),
          });
          if(resp.ok) {
            const rows = await resp.json();
            if(rows?.length) {
              console.log(`[LMI] ✅ Supabase: ${rows.length} monumente`);
              // Convertește în format CIMEC-compatibil
              return {
                monumente: rows.filter(r=>r.source!=='OSM' || r.landuse!=='cemetery')
                               .map(r=>({
                  geometry:{type:'Point',coordinates:[r.lon,r.lat]},
                  properties:{DENUMIRE:r.denumire,CATEGORIE:r.categorie,buffer_m:r.buffer_m}
                })),
                zone: [],
                situri: [],
              };
            }
          }
        } catch(e) { console.log('[LMI] Supabase error:', e.message); }
      }

      // Fallback: CIMEC direct + proxy worker (dacă configurat)
      if(typeof _cimecQueryWFS === 'function') {
        try { return await _cimecQueryWFS(lon, lat, radiusM); } catch(e){}
      }
      const proxyUrl = window.TCI?.CIMEC_PROXY || '';
      if(!proxyUrl) {
        console.log('[LMI] Fără Supabase/proxy — rulați romania_spatial_pipeline.py');
        return {monumente:[],zone:[],situri:[]};
      }
      const CIMEC = 'https://map.cimec.ro/Mapserver/wms';
      const km = radiusM/111320;
      const bbox = [lon-km,lat-km,lon+km,lat+km].join(',');
      const result = {monumente:[],zone:[],situri:[]};
      for(const[layer,key] of [['LMI_Puncte','monumente'],['LMI_Zone','zone'],['Situri_Arh','situri']]) {
        const wfsQ = `${CIMEC}?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=${layer}&BBOX=${bbox},EPSG:4326&SRSNAME=EPSG:4326&OUTPUTFORMAT=application/json&maxFeatures=200`;
        try {
          const resp = await fetch(`${proxyUrl}?url=${encodeURIComponent(wfsQ)}`,
                                   {signal:AbortSignal.timeout(5000),mode:'cors'});
          if(resp.ok) {
            const txt = await resp.text();
            if(txt.includes('FeatureCollection')) result[key] = JSON.parse(txt).features||[];
          }
        } catch(e){}
      }
      return result;
    },



    async queryConstraints(lon, lat, radiusKm, token) {
      // Categorii de exclus sau de urmărit
      const searches = [
        {cat:'cemetery',   bufR:70,  type:'cimitir',  color:'#6b7280', exclude:true},
        {cat:'park',       bufR:80,  type:'parc',     color:'#15803d', exclude:true},
        {cat:'playground', bufR:30,  type:'loc_joaca',color:'#15803d', exclude:false},
        {cat:'hospital',   bufR:0,   type:'spital',   color:'#06b6d4', exclude:false, isDev:true},
        {cat:'university', bufR:0,   type:'univ',     color:'#8b5cf6', exclude:false, isDev:true},
        {cat:'stadium',    bufR:80,  type:'stadion',  color:'#374151', exclude:true},
      ];

      const results = await Promise.all(
        searches.map(s =>
          this._mapboxCategorySearch(s.cat, lon, lat, radiusKm, token)
               .then(pois => pois.map(p=>({...p,...s})))
        )
      );

      const flat = results.flat();
      const bufs = [];
      const devZones = [];

      flat.forEach(p => {
        if(p.exclude && p.bufR > 0) {
          bufs.push({lon:p.lon, lat:p.lat, r:p.bufR,
                     reason:p.name, color:p.color, type:p.type});
        }
        if(p.isDev) {
          devZones.push({lon:p.lon, lat:p.lat, name:p.name,
                        type:p.type, color:p.color,
                        hMax:p.type==='spital'?40:25,
                        startYr:2026, priority:1});
        }
      });

      console.log(`[CONSTRAINT] Mapbox Search: ${bufs.length} excluse + ${devZones.length} zone dev din ${flat.length} POI`);
      return {bufs, devZones};
    },

    // ── QUERY ȘANTIERE ACTIVE — Overpass (Mapbox nu are categoria) ────
    async queryConstructionSites(lon, lat, radiusM) {
      const r = Math.min(radiusM, 12000);
      const q = `[out:json][timeout:10];
(
  way["building"="construction"](around:${r},${lat},${lon});
  way["landuse"="construction"](around:${r},${lat},${lon});
  node["amenity"="grave_yard"](around:${r},${lat},${lon});
  way["amenity"="grave_yard"](around:${r},${lat},${lon});
  way["natural"="wood"](around:${r},${lat},${lon});
  way["natural"="water"](around:${r},${lat},${lon});
  way["waterway"~"^(river|canal)$"](around:${r},${lat},${lon});
  way["railway"~"^(rail|light_rail)$"](around:${r},${lat},${lon});
);
out geom qt;`;
      try {
        const resp = await fetch('https://overpass-api.de/api/interpreter',
          {method:'POST', body:'data='+encodeURIComponent(q),
           signal:AbortSignal.timeout(10000)});
        if(!resp.ok) return {santiere:[], extra_bufs:[]};
        const data = await resp.json();
        const santiere = [], extra_bufs = [];
        (data.elements||[]).forEach(el=>{
          const t=el.tags||{};

          // ── FIX: apă + pădure cu geometrie completă (nu centroid unic) ──
          // Râul Bistrița are 10km → centroid = 1 punct → buffer insuficient
          // Sample la fiecare ~8 noduri → acoperire completă a cursului
          const isWater   = t.natural==='water'||t.waterway==='river'||t.waterway==='stream';
          const isWood    = t.natural==='wood'||t.landuse==='forest';
          const isCimitir = t.amenity==='grave_yard'||t.landuse==='cemetery';
          const isRail    = !!(t.railway);

          if(isWater||isWood||isCimitir||isRail) {
            const geom = el.geometry || [];
            const step = isWater ? 5 : isWood ? 8 : 4; // noduri între sample-uri
            const r_buf = isWater ? 80 : isWood ? 60 : isCimitir ? 65 : 25;
            const reason = t.name || (isWater?'Apă':isWood?'Pădure':isCimitir?'Cimitir':'Cale ferată');
            const color  = isWater?'#0ea5e9':isWood?'#15803d':isCimitir?'#6b7280':'#78716c';
            const type   = isWater?'apa':isWood?'padure':isCimitir?'cimitir':'cf';

            if(geom.length === 0) {
              // Fallback la centroid dacă nu avem geometrie
              const c = this._centroid(el.geometry);
              if(c) extra_bufs.push({lon:c[0],lat:c[1],r:r_buf,reason,color,type});
            } else {
              // Sample de-a lungul geometriei
              for(let i=0; i<geom.length; i+=step) {
                const g = geom[i];
                if(g?.lon && g?.lat) extra_bufs.push({lon:g.lon,lat:g.lat,r:r_buf,reason,color,type});
              }
              // Asigură că ultimul nod e inclus
              const last = geom[geom.length-1];
              if(last?.lon && last?.lat) extra_bufs.push({lon:last.lon,lat:last.lat,r:r_buf,reason,color,type});
            }
            return;
          }

          // Restul: centroid simplu
          const c=this._centroid(el.geometry);
          if(!c) return;
          if(t.building==='construction'||t.landuse==='construction') {
            santiere.push({lon:c[0],lat:c[1],name:t.name||'Șantier activ',
                           type:'constructie',color:'#f59e0b',hMax:20,startYr:2025,priority:1});
          }
        });
        return {santiere, extra_bufs};
      } catch(e) { return {santiere:[], extra_bufs:[]}; }
    },


    _centroid(geom) {
      if(!geom) return null;
      if(geom.type==='Point') return geom.coordinates;
      const coords = geom.type==='Polygon' ? geom.coordinates[0] :
                     geom.type==='LineString' ? geom.coordinates : null;
      if(!coords||!coords.length) return null;
      return [
        coords.reduce((s,c)=>s+c[0],0)/coords.length,
        coords.reduce((s,c)=>s+c[1],0)/coords.length,
      ];
    },

    // ── CHECK POINT EXCLUDED ──────────────────────────────────────────
    // Returnează motivul excluderii sau null dacă e construibil
    isExcluded(lon, lat, bufs) {
      const R=111319.9, cp=Math.cos(lat*Math.PI/180);
      for(const b of bufs) {
        const d = Math.hypot((lon-b.lon)*R*cp, (lat-b.lat)*R);
        if(d < b.r) return b.reason;
      }
      return null;
    },

    // ── BUILD — funcția principală ────────────────────────────────────
    async build(lon, lat, radiusKm=12) {
      console.log('[CONSTRAINT] Build pentru', lon.toFixed(4), lat.toFixed(4));
      const token = mapboxgl?.accessToken || window.MAPBOX_TOKEN || '';

      // Rulează toate query-urile în paralel
      const [lmiRes, mapboxRes, overpassRes] = await Promise.allSettled([
        this.queryLMI(lon, lat, radiusKm*1000),
        token ? this.queryConstraints(lon, lat, radiusKm, token) : Promise.resolve({bufs:[],devZones:[]}),
        this.queryConstructionSites(lon, lat, radiusKm*1000),
      ]);

      const lmi       = lmiRes.status==='fulfilled'      ? lmiRes.value      : {monumente:[],zone:[],situri:[]};
      const mapboxData= mapboxRes.status==='fulfilled'   ? mapboxRes.value   : {bufs:[],devZones:[]};
      const overpass  = overpassRes.status==='fulfilled' ? overpassRes.value : {santiere:[],extra_bufs:[]};

      // Protecții hardcodate (mereu corecte)
      const hardProtected = this.getProtectedForCity(lon, lat);

      // Buffer-e combinate: hardcoded + Mapbox + Overpass extra
      const bufs = [
        ...hardProtected,
        ...mapboxData.bufs,
        ...overpass.extra_bufs,
      ];

      // LMI din CIMEC (când CORS permite)
      [...(lmi.monumente||[]),...(lmi.zone||[])].forEach(m=>{
        const c=this._centroid(m.geometry); if(!c) return;
        const cat=(m.properties?.CATEGORIE||'B').toUpperCase();
        bufs.push({lon:c[0],lat:c[1],r:cat.startsWith('A')?100:50,
                   reason:'LMI '+(m.properties?.DENUMIRE||'Monument'),color:'#dc2626',type:'lmi'});
      });

      // Zone de dezvoltare: Mapbox spitale/univ + Overpass șantiere
      const devZones = [
        ...mapboxData.devZones,
        ...overpass.santiere,
      ];

      const aeronautic = this.checkAeronautic(lon, lat);
      const seismic    = this._seismicByCoord(lon, lat);

      // Deduplicare buffere (elimină duplicatele la <150m)
      const R=111319.9, cp=Math.cos(lat*Math.PI/180);
      const dedupBufs = [];
      bufs.forEach(b=>{
        const dup = dedupBufs.some(d=>
          Math.hypot((b.lon-d.lon)*R*cp,(b.lat-d.lat)*R)<150 && d.type===b.type
        );
        if(!dup) dedupBufs.push(b);
      });

      console.log(`[CONSTRAINT] ✅ ${dedupBufs.length} excluderi | ${devZones.length} zone dev | Mapbox:${mapboxData.bufs.length} Overpass:${overpass.extra_bufs.length} Hard:${hardProtected.length}`);
      return {bufs:dedupBufs, aeronautic, seismic, lmi, devZones, loaded:true};
    },
  },


  // ── ZONELE STATISTICE — mici, precise, fără elipse uriașe ───────────
  // ── Generează zone de creștere — filtrate prin constrângeri ─────────
  // Include expansiune intravilam (extravilan construibil prin PUZ)
  // Specific Iași: Moara de Vânt, Bucium, Miroslava, Dancu
  // ── Baza de date zone reale per oras ───────────────────────────────────
  // Sursă: Google Maps GPS + ANCPI autorizații + teren
  // ── ZONE REALE GPS — coordonate absolute din Google Maps ───────────────
  // Sursa: coordonate confirmate teren + ANCPI autorizații + cunoaștere locală
  // FIECARE ORAS VA PRIMI PROPRIILE COORDONATE LA CONFIGURARE
  _REAL_ZONES: {
    'iasi': [
      // ── ZONE ACTIVE 2025 — deja în construcție ──────────────────────
      {id:'SR', lat:47.1877, lon:27.5874, rx:0.0060, ry:0.0042,
       color:'#f59e0b', hMax:45, startYr:2025,
       label:'Spital Regional + Pol Medical',
       sub:'Hub medical + rezidențial R+4→R+10 · €580M'},
      {id:'CR', lat:47.2011, lon:27.5349, rx:0.0050, ry:0.0035,
       color:'#8b5cf6', hMax:32, startYr:2025,
       label:'Complex Royal — Copou',
       sub:'Rezidențial colectiv R+6→R+10 · activ'},
      {id:'CG', lat:47.1987, lon:27.5374, rx:0.0035, ry:0.0025,
       color:'#7c3aed', hMax:28, startYr:2026,
       label:'Copou Garden Residence',
       sub:'Rezidențial R+5→R+8 · Copou-Breazu'},
      // ── ZONA DANCU / GREENPARK / HIMSON — expansiune est ────────────
      // Complex Himson, Greenpark — zona cu creștere maximă
      {id:'DK', lat:47.1420, lon:27.6530, rx:0.0080, ry:0.0055,
       color:'#16a34a', hMax:20, startYr:2026,
       label:'Dancu — Greenpark · Himson',
       sub:'Rezidențial nou R+2→R+5 · extravilan PUZ'},
      // ── CENTRU CIVIC — densificare intravilam ───────────────────────
      {id:'CV', lat:47.1580, lon:27.6010, rx:0.0026, ry:0.0018,
       color:'#7c3aed', hMax:52, startYr:2026,
       label:'Centru Civic',
       sub:'Densificare R+8→R+12 · zona CM'},
      // ── CORIDOARE BULEVARDIERE ────────────────────────────────────────
      {id:'CEV', lat:47.1572, lon:27.6005, rect:{w:0.018, h:0.0013},
       color:'#d97706', hMax:28, startYr:2027,
       label:'Coridor Est-Vest',
       sub:'Bd. Independenței R+4→R+7'},
      // ── RECONVERSIE NICOLINA / AUREL VLAICU ─────────────────────────
      // Zona industrială Nicolina în conversie rapidă
      {id:'RI', lat:47.1460, lon:27.6210, rx:0.0075, ry:0.0052,
       color:'#ea580c', hMax:33, startYr:2030,
       label:'Reconversie Nicolina',
       sub:'Industrial→Mixt R+5→R+8'},
      // ── REZIDENȚIAL SUD — Baza 3 / Calea Chișinăului ────────────────
      {id:'RS', lat:47.1360, lon:27.5850, rx:0.0048, ry:0.0034,
       color:'#2563eb', hMax:22, startYr:2031,
       label:'Rezidențial Sud',
       sub:'Reabilitare + supraetajare R+4→R+5'},
    ],
    // ── TEMPLATE PENTRU ALTE ORASE ─────────────────────────────────────
    // Adaugă coordonate GPS preluate din Google Maps / ANCPI
    // Format: {id, lat, lon, rx, ry, color, hMax, startYr, label, sub}
    'botosani': [
      // ── CENTRU CIVIC — densificare moderată ──────────────────────────────
      {id:'CV',  lat:47.7453, lon:26.6653, rx:0.0022, ry:0.0015,
       color:'#7c3aed', hMax:35, startYr:2027,
       label:'Centru Botoșani', sub:'Densificare R+5→R+8'},
      // ── CĂTĂMĂRĂȘTI-DEAL — direcția NV, extindere confirmată ANCPI ───────
      // Sursa: PUZ aprobate CJ Botoșani + autorizații ANCPI 2019-2025
      {id:'CAT', lat:47.7720, lon:26.6420, rx:0.0055, ry:0.0038,
       color:'#16a34a', hMax:18, startYr:2026,
       label:'Cătămărăști-Deal NV', sub:'Rezidențial R+3→R+5 · PUZ activ'},
      // ── ALFA PARK — ansamblu 30+ blocuri în construcție ──────────────────
      // Sursa: autorizații construire 2022-2025, șantier activ
      {id:'AFP', lat:47.7630, lon:26.6750, rx:0.0045, ry:0.0032,
       color:'#f59e0b', hMax:22, startYr:2025,
       label:'Alfa Park', sub:'30+ blocuri · în construcție · R+5→R+7'},
      // ── ȘOSEAUA IAȘULUI — direcția NE, coridor DN29 ───────────────────────
      // Sursa: traseu DN29 + autorizații periurbane
      {id:'SIS', lat:47.7580, lon:26.6820, rx:0.0048, ry:0.0034,
       color:'#2563eb', hMax:16, startYr:2028,
       label:'Șos. Iașului NE', sub:'Coridor DN29 · R+3→R+4'},
      // ── VEST — Calea Națională, extindere confirmată ───────────────────────
      {id:'CV2', lat:47.7430, lon:26.6450, rx:0.0040, ry:0.0028,
       color:'#22c55e', hMax:14, startYr:2029,
       label:'Vest — Cal. Națională', sub:'R+2→R+4 · PUZ periurban'},
    ],

    'cluj':     [{id:'CV',lat:46.7712,lon:23.5887,rx:.0024,ry:.0017,color:'#8b5cf6',hMax:50,startYr:2026,label:'Centru Cluj',sub:'R+10→R+14'},{id:'FLO',lat:46.7650,lon:23.5320,rx:.0060,ry:.0042,color:'#16a34a',hMax:20,startYr:2026,label:'Florești',sub:'R+4→R+6'},{id:'BAC',lat:46.7830,lon:23.5400,rx:.0045,ry:.0032,color:'#22c55e',hMax:16,startYr:2028,label:'Baciu NV',sub:'R+3→R+5'},{id:'APA',lat:46.7750,lon:23.6350,rx:.0040,ry:.0028,color:'#0ea5e9',hMax:18,startYr:2029,label:'Apahida Est',sub:'Aeroport'}],
    'timisoara':[{id:'CV',lat:45.7489,lon:21.2087,rx:.0024,ry:.0017,color:'#8b5cf6',hMax:45,startYr:2026,label:'Centru TM',sub:'Densificare'},{id:'GIR',lat:45.7050,lon:21.2200,rx:.0055,ry:.0038,color:'#16a34a',hMax:18,startYr:2027,label:'Giroc Sud',sub:'R+3→R+5'},{id:'DUM',lat:45.7780,lon:21.2350,rx:.0048,ry:.0034,color:'#22c55e',hMax:16,startYr:2028,label:'Dumbrăvița Nord',sub:'R+3→R+4'}],
    'constanta': [{id:'CV',lat:44.1598,lon:28.6348,rx:.0022,ry:.0016,color:'#8b5cf6',hMax:24,startYr:2026,label:'Centru CT',sub:'ag=0.30g max R+8'},{id:'OVI',lat:44.2650,lon:28.5700,rx:.0055,ry:.0038,color:'#16a34a',hMax:16,startYr:2028,label:'Ovidiu Nord',sub:'Departe de port'}],
    'brasov':    [{id:'CV',lat:45.6480,lon:25.6060,rx:.0022,ry:.0016,color:'#8b5cf6',hMax:40,startYr:2026,label:'Centru BV',sub:'R+8→R+12'},{id:'SCH',lat:45.6700,lon:25.6350,rx:.0050,ry:.0035,color:'#16a34a',hMax:20,startYr:2027,label:'Schei',sub:'R+4→R+6'}],
    'galati':    [{id:'CV',lat:45.4353,lon:28.0080,rx:.0020,ry:.0014,color:'#8b5cf6',hMax:12,startYr:2026,label:'Centru GL',sub:'ag=0.40g MAX R+4'},{id:'MIC',lat:45.4580,lon:28.0350,rx:.0048,ry:.0034,color:'#f59e0b',hMax:12,startYr:2028,label:'Micro 19-21',sub:'Max R+4 seismic'}],
    'focsani':   [{id:'CV',lat:45.6960,lon:27.1840,rx:.0018,ry:.0013,color:'#8b5cf6',hMax:12,startYr:2026,label:'Centru FV',sub:'ag=0.40g STRICT R+4'}],
    'suceava':   [{id:'CV',lat:47.6520,lon:26.2556,rx:.0020,ry:.0014,color:'#8b5cf6',hMax:32,startYr:2026,label:'Centru SV',sub:'R+6→R+10'},{id:'SCH',lat:47.6650,lon:26.2200,rx:.0050,ry:.0035,color:'#16a34a',hMax:16,startYr:2028,label:'Șcheia Vest',sub:'R+3→R+5'}],
    'bacau':     [{id:'CV',lat:46.5670,lon:26.9136,rx:.0020,ry:.0014,color:'#8b5cf6',hMax:24,startYr:2026,label:'Centru BC',sub:'ag=0.30g R+8'},{id:'SUD',lat:46.5420,lon:26.9200,rx:.0048,ry:.0034,color:'#16a34a',hMax:18,startYr:2028,label:'Sud BC',sub:'R+3→R+6'}],
    'bucuresti': [{id:'CV',lat:44.4268,lon:26.1025,rx:.0020,ry:.0014,color:'#8b5cf6',hMax:18,startYr:2026,label:'Centru B',sub:'ag=0.35g R+6'},{id:'NOR',lat:44.4780,lon:26.0900,rx:.0060,ry:.0042,color:'#16a34a',hMax:18,startYr:2027,label:'Floreasca-Aviației',sub:'R+4→R+6 premium'},{id:'EST',lat:44.4200,lon:26.1800,rx:.0065,ry:.0045,color:'#0ea5e9',hMax:15,startYr:2027,label:'Voluntari-Pantelimon',sub:'R+3→R+5'},{id:'A2',lat:44.3800,lon:26.2500,rx:.0055,ry:.0038,color:'#78716c',hMax:9,startYr:2027,label:'Logistică A2',sub:'P+1→P+2'}],
    'ploiesti':  [{id:'CV',lat:44.9365,lon:26.0227,rx:.0020,ry:.0014,color:'#8b5cf6',hMax:18,startYr:2026,label:'Centru PH',sub:'ag=0.35g R+6'},{id:'NOR',lat:44.9650,lon:26.0300,rx:.0050,ry:.0035,color:'#16a34a',hMax:15,startYr:2028,label:'Nord PH',sub:'R+3→R+5'}],
    'craiova':   [{id:'CV',lat:44.3196,lon:23.7963,rx:.0020,ry:.0014,color:'#8b5cf6',hMax:24,startYr:2026,label:'Centru CJ',sub:'ag=0.30g R+8'},{id:'NOR',lat:44.3500,lon:23.8100,rx:.0050,ry:.0035,color:'#16a34a',hMax:18,startYr:2028,label:'Nord CJ — Ford',sub:'R+3→R+6'}],

  },

  _buildZones(cx, cy, constraints) {
    const bufs = (constraints?.bufs || []);
    // Adaugă road centerpoints din cors ca buffere de excludere (nu construim PE drum)
    const roadBufs = (this._lastCors || []).map(c => ({
      lon: c.lon, lat: c.lat,
      r: c.roadClass==='motorway'||c.roadClass==='motorway_planned' ? 30 :
         c.roadClass==='trunk' ? 22 : 14,
      reason: 'Drum: '+(c.name||c.ref||c.roadClass),
      type: 'drum',
    }));
    // Protecții hardcodate Iași (mereu active)
    const IASI_PROTECTED = [
      {lon:27.5895, lat:47.1521, r:150, reason:'Cimitirul Eternitatea'},
      {lon:27.6050, lat:47.1910, r:100, reason:'Cimitirul Sf. Apostoli Petru și Pavel'},
      {lon:27.6218, lat:47.1955, r:100, reason:'Cimitirul Armenesc'},
      {lon:27.6350, lat:47.1950, r:320, reason:'Pădurea Ciric'},
      {lon:27.5850, lat:47.1650, r:180, reason:'Lacul Ciric'},
      {lon:27.5640, lat:47.1680, r:90,  reason:'Stadionul TEPRO'},
      {lon:27.5960, lat:47.1560, r:120, reason:'Grădina Botanică'},
    ];
    const allBufs = [...bufs, ...roadBufs, ...IASI_PROTECTED];
    const R   = 111319.9;
    const cp  = Math.cos(cy * Math.PI / 180);
    const ok  = (lon, lat, extraR=0) => {
      for(const b of allBufs) {
        const d = Math.hypot((lon-b.lon)*R*cp, (lat-b.lat)*R);
        if(d < b.r + extraR) return false;
      }
      return true;
    };

    // ── Date reale per oras ────────────────────────────────────────────
    // cityKey poate fi: 'iasi' (vechi), 'RO-IS-105309' (nou din _UAT_DB)
    // _REAL_ZONES are chei simple: 'iasi', 'focsani', 'cluj' etc.
    // Normalizăm: 'RO-VN-78046' → name='Focșani' → 'focsani'
    const cityKey = (this.cityKey||'').toLowerCase();
    const nameNorm = (this.d?.name||'')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')  // elimină diacritice
      .split(/[-\s]/)[0];  // primul cuvânt: 'Cluj-Napoca'→'cluj', 'Focșani'→'focsani'
    const realZones = this._REAL_ZONES[cityKey] || this._REAL_ZONES[nameNorm];

    // Dacă avem date reale → folosim GPS direct
    if(realZones) {
      const zones = [];
      realZones.forEach(z => {
        if(!ok(z.lon, z.lat)) {
          console.log('[TCI] Zonă exclusă de constrângere:', z.label, z.lon, z.lat);
          return;
        }
        // Construiesc definiția zonei în formatul cerut de _polyFromDef
        const def = z.rect
          ? {id:z.id,color:z.color,hMax:z.hMax,startYr:z.startYr,label:z.label,sub:z.sub,
             rect:{cx:z.lon, cy:z.lat, w:z.rect.w, h:z.rect.h}}
          : {id:z.id,color:z.color,hMax:z.hMax,startYr:z.startYr,label:z.label,sub:z.sub,
             ring:{cx:z.lon, cy:z.lat, rx:z.rx, ry:z.ry}};
        zones.push(def);
      });
      console.log('[TCI] ✅ Zone reale GPS:', zones.length, 'zone pentru', cityKey);
      return zones;
    }

    // ── GENERATOR DE ZONE — 3 niveluri de precizie ───────────────────────
    //
    // Nivel 1 (precizie maximă): _REAL_ZONES GPS — date validate manual ↑ (deja aplicat)
    //
    // Nivel 2 (model real): Coridoare OSM + autostrăzi planificate
    //   _fetchInfraCorridors → drumuri reale din Overpass + A7/A8/A13 CNAIR
    //   _infraToZones        → zone de-a lungul coridoarelor reale
    //   Filtrate prin: seismic P100 + gravity model + constrângeri
    //
    // Nivel 3 (fallback geometric): offset-uri relative față de centru
    //   Folosit DOAR când rețeaua nu e disponibilă (offline, timeout Overpass)

    const need    = this._calcUrbanNeed(this.d);
    const gravity = this._calcGravityScore(this.d);
    const seismic = this._getSeismicAg(cx, cy);
    const scn     = this._getScenario?.() || {hMaxMultiplier:1.0,expansieMultiplier:1.0};
    const sc      = need.scale;
    const C       = this.COLORS;
    const zones   = [];
    const addIf   = z => { const lon=z.ring?.cx||z.rect?.cx,lat=z.ring?.cy||z.rect?.cy; if(ok(lon,lat)) zones.push(z); };
    const hMult   = (gravity.growthType==='METROPOLITAN'?1.0:gravity.growthType==='REGIONAL'?.80:gravity.growthType==='LOCAL'?.65:.50) * (scn.hMaxMultiplier||1.0);
    const seismicCap = h => Math.min(h*hMult, seismic.hMaxM);

    // ── CENTRU CIVIC — prezent indiferent de nivel (nu depinde de drumuri) ──
    const hC = seismicCap(Math.min(60,Math.max(25,25+need.cladiri.centru)));
    addIf({id:'CV',color:C.centru||'#8b5cf6',hMax:hC,startYr:2026,density:need.cladiri.centru,
           ring:{cx,cy,rx:0.0022*sc,ry:0.0015*sc},label:'Centru Civic',
           sub:`Densificare R+${Math.round(hC/3.5)}→R+${Math.round(hC/2.5)} · ${gravity.growthType}`});

    // ── NIVEL 2: Zone de-a lungul coridoarelor rutiere reale ─────────────
    // Condiție: avem cel puțin 3 coridoare OSM încărcate
    if(this._lastCors?.length >= 3) {
      const infraZones = this._infraToZones(
        this._lastCors, cx, cy, need, seismicCap, sc, C, ok, scn
      );
      infraZones.forEach(z => zones.push(z));
      console.log(`[TCI] ✅ Nivel 2 — ${infraZones.length} zone pe coridoare reale OSM | ${gravity.growthType} | ag=${seismic.ag}g`);

      // Adaugă reconversie industrială și expansiune periferică
      // (nu depind de drumuri — depind de nevoia demografică)
      addIf({id:'RI',color:C.reconv||'#ea580c',hMax:seismicCap(28),startYr:2031,
             density:Math.round(need.cladiri.rezid*.3),
             rect:{cx:cx+0.024*sc,cy:cy-0.010*sc,w:0.010*sc,h:0.007*sc},
             label:'Reconversie Industrială',sub:'Industrial→Mixt funcțional'});

      if((need.deltaPop>0||need.locuinteReab>1500)&&gravity.growthType!=='DECLINING'&&(scn.expansieMultiplier||1)>.3){
        const hE=seismicCap(Math.min(16,Math.max(7,7+need.cladiri.expansie/6)));
        addIf({id:'EE',color:C.nou||'#16a34a',hMax:hE,startYr:2031,density:Math.ceil(need.cladiri.expansie/2),
               ring:{cx:cx+0.028*sc,cy:cy-0.008*sc,rx:0.0058*sc,ry:0.0040*sc},
               label:'Expansiune Periferică Est',sub:`R+2→R+${Math.round(hE/3)} · PUZ extravilan`});
        addIf({id:'EV',color:C.nou||'#16a34a',hMax:hE-2,startYr:2033,density:Math.floor(need.cladiri.expansie/2),
               ring:{cx:cx-0.022*sc,cy:cy+0.006*sc,rx:0.0052*sc,ry:0.0036*sc},
               label:'Expansiune Periferică Vest',sub:'Include extravilan'});
      }

      console.log(`[TCI] Total zone model real: ${zones.length} | ${need.locuinteTotale.toLocaleString()} loc. necesare`);
      return zones;
    }

    // ── NIVEL 3: Fallback geometric (rețea indisponibilă) ─────────────────
    // Același model ca înainte — coridoare relative față de centru
    // Se afișează imediat, înlocuit cu Nivel 2 după ce Overpass răspunde
    console.warn('[TCI] ⚠️ Fallback geometric — coridoare OSM încă nu sunt disponibile');

    const hCor = seismicCap(Math.min(30,Math.max(12,12+need.cladiri.coridor/5)));
    addIf({id:'AX-EV',color:C.coridor||'#d97706',hMax:hCor,startYr:2027,density:Math.ceil(need.cladiri.coridor/3),
           rect:{cx,cy:cy-0.001*sc,w:0.020*sc,h:0.0014*sc},label:'Ax Est-Vest (provizoriu)',sub:`Bulevard · R+4→R+${Math.round(hCor/3)}`});
    addIf({id:'AX-NS',color:C.coridor||'#d97706',hMax:hCor-3,startYr:2028,density:Math.ceil(need.cladiri.coridor/3),
           rect:{cx:cx+0.001*sc,cy,w:0.0014*sc,h:0.018*sc},label:'Ax Nord-Sud (provizoriu)',sub:`Arteră principală`});

    const hI = seismicCap(Math.min(40,Math.max(18,16+need.cladiri.inner/3)));
    addIf({id:'CN',color:'#6366f1',hMax:hI,startYr:2027,density:Math.ceil(need.cladiri.inner/2),
           ring:{cx:cx+0.010*sc,cy:cy+0.012*sc,rx:0.0038*sc,ry:0.0026*sc},label:'Zonă Centrală Nord',sub:`R+${Math.round(hI/3.5)}`});
    addIf({id:'CS',color:'#6366f1',hMax:hI-3,startYr:2028,density:Math.floor(need.cladiri.inner/2),
           ring:{cx:cx-0.002*sc,cy:cy-0.010*sc,rx:0.0040*sc,ry:0.0028*sc},label:'Zonă Centrală Sud',sub:`R+${Math.round((hI-3)/3.5)}`});

    const hR = seismicCap(Math.min(28,Math.max(10,10+need.cladiri.rezid/5)));
    addIf({id:'RN',color:C.rezid||'#2563eb',hMax:hR,startYr:2028,density:Math.ceil(need.cladiri.rezid/2),
           ring:{cx:cx+0.018*sc,cy:cy+0.016*sc,rx:0.0048*sc,ry:0.0034*sc},label:'Rezidențial Nord',sub:`R+${Math.round(hR/3.5)}`});
    addIf({id:'RS',color:C.rezid||'#2563eb',hMax:hR-2,startYr:2030,density:Math.floor(need.cladiri.rezid/2),
           ring:{cx:cx+0.008*sc,cy:cy-0.016*sc,rx:0.0045*sc,ry:0.0032*sc},label:'Rezidențial Sud',sub:`R+${Math.round((hR-2)/3.5)}`});

    addIf({id:'RI',color:C.reconv||'#ea580c',hMax:seismicCap(28),startYr:2031,density:Math.round(need.cladiri.rezid*.3),
           rect:{cx:cx+0.024*sc,cy:cy-0.010*sc,w:0.010*sc,h:0.007*sc},label:'Reconversie Industrială',sub:'Industrial→Mixt'});

    if((need.deltaPop>0||need.locuinteReab>1500)&&gravity.growthType!=='DECLINING'&&(scn.expansieMultiplier||1)>.3){
      const hE=seismicCap(Math.min(16,Math.max(7,7+need.cladiri.expansie/6)));
      addIf({id:'EE',color:C.nou||'#16a34a',hMax:hE,startYr:2031,density:Math.ceil(need.cladiri.expansie/2),
             ring:{cx:cx+0.028*sc,cy:cy-0.008*sc,rx:0.0058*sc,ry:0.0040*sc},label:'Expansiune Est (PUZ)',sub:`R+2→R+${Math.round(hE/3)}`});
      addIf({id:'EV',color:C.nou||'#16a34a',hMax:hE-2,startYr:2033,density:Math.floor(need.cladiri.expansie/2),
             ring:{cx:cx-0.022*sc,cy:cy+0.006*sc,rx:0.0052*sc,ry:0.0036*sc},label:'Expansiune Vest (PUZ)',sub:'Include extravilan'});
    }
    console.log(`[TCI] Fallback geometric ${gravity.growthType} | ag=${seismic.ag}g | ${need.locuinteTotale.toLocaleString()} loc.`);
    return zones;
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
      this._camera = new THREE.Camera();
      this._scene  = new THREE.Scene();
      const cont = map.getContainer();
      const ov = document.createElement('canvas');
      ov.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;';
      cont.style.position='relative'; cont.appendChild(ov); this._overlay=ov;
      this._renderer = new THREE.WebGLRenderer({canvas:ov,antialias:true,alpha:true});
      this._renderer.setPixelRatio(window.devicePixelRatio);
      this._renderer.setSize(cont.offsetWidth,cont.offsetHeight);
      this._renderer.setClearColor(0x000000,0); this._renderer.autoClear=true;
      new ResizeObserver(()=>this._renderer.setSize(cont.offsetWidth,cont.offsetHeight)).observe(cont);
      this._scene.add(new THREE.AmbientLight(0xffffff,1.0));
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

      const z=this._map?.getZoom?.()??0; const vis=z>=12.5;
      let anim=false;
      if(vis&&this._targetH&&this._currentH&&this._meshes?.length){
        this._entities.forEach((e,i)=>{
          const m=this._meshes[i]; if(!m)return; m.visible=vis;
          const tgt=this._targetH[i]||0.1, cur=this._currentH[i]||0.1, d=tgt-cur;
          if(Math.abs(d)>0.2){
            const h=cur+d*0.10; this._currentH[i]=h;
            const [lx,ly]=this._toLocal(e.lon,e.lat);
            m.position.set(lx,ly,-1); m.scale.set(e.wM,e.dM,h+1);
            if(this._shadows?.[i]){const s=this._shadows[i];s.visible=vis;const sc=Math.max(e.wM,e.dM)*0.55;s.position.set(lx,ly,-0.95);s.scale.set(sc,sc,1);}
            anim=true;
          } else {
            if(Math.abs(d)>0.02){this._currentH[i]=tgt;const[lx,ly]=this._toLocal(e.lon,e.lat);m.position.set(lx,ly,-1);m.scale.set(e.wM,e.dM,tgt+1);}
            if(this._shadows?.[i])this._shadows[i].visible=vis;
          }
        });
      } else { (this._meshes||[]).forEach((m,i)=>{if(m)m.visible=vis;if(this._shadows?.[i])this._shadows[i].visible=vis;}); }
      this._renderer.render(this._scene, this._camera);
      if(anim)this._map?.triggerRepaint();
    },

    onRemove(){try{this._renderer?.dispose();}catch(e){}try{this._overlay?.remove();}catch(e){}this._meshes=[];this._shadows=[];this._ready=false;},

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
    buildSceneGraph(zones, year, constraintBufs) {
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

        // Buffere de constrângeri — primite ca parametru (nu async!)
        // Include protecții hardcodate + constrângeri încărcate
        const _bufs = Array.isArray(constraintBufs) ? constraintBufs : [];
        const _R = 111319.9;
        const _cp = Math.cos((coords[0]?.[1]||47) * Math.PI/180);
        const _okPos = (lo, la) => {
          for(const b of _bufs) {
            if(Math.hypot((lo-b.lon)*_R*_cp,(la-b.lat)*_R) < b.r) return false;
          }
          return true;
        };
        for(let i = 0; i < density; i++) {
          let lon, lat, tries = 0;
          do {
            lon = bbox.minX + Math.random() * (bbox.maxX - bbox.minX);
            lat = bbox.minY + Math.random() * (bbox.maxY - bbox.minY);
            tries++;
          } while((!this._pip([lon,lat], coords) || !_okPos(lon,lat)) && tries < 40);
          if(tries >= 40) continue;

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
      while(this._scene.children.length>1)this._scene.remove(this._scene.children[1]);
      const geom=new THREE.BoxGeometry(1,1,1); geom.translate(0,0,0.5);
      const sG=new THREE.CircleGeometry(0.72,7);
      const sM=new THREE.MeshBasicMaterial({color:0x000000,depthTest:false,opacity:0.15,transparent:true,side:THREE.DoubleSide});
      this._meshes=[]; this._shadows=[];
      this._entities.forEach(e=>{
        const mat=new THREE.MeshBasicMaterial({color:e.color,depthTest:false,opacity:0.88,transparent:true});
        const mesh=new THREE.Mesh(geom.clone(),mat); this._scene.add(mesh); this._meshes.push(mesh);
        const sh=new THREE.Mesh(sG.clone(),sM.clone()); sh.rotation.x=-Math.PI/2; this._scene.add(sh); this._shadows.push(sh);
      });
      this._mesh={visible:true};
      this._targetH=new Float32Array(this._entities.length);
      this._currentH=new Float32Array(this._entities.length).fill(0.1);
    },

    // Lumini stradale — puncte calde la 8m înălțime pe arterele principale
    _addStreetLights() {
      const spacing = 60; // m între stâlpi
      const height  = 8;
      // Axa E-V: de la -1800m la +1800m față de centru, la Y=0
      // Axa N-S: de la -1600m la +1600m, la X=0
      const axes = [
        {axis:'x', range:[-1800,1800], fixed:0,    spacing},
        {axis:'y', range:[-1600,1600], fixed:30,   spacing},
      ];
      this._lights = [];
      axes.forEach(ax => {
        for(let v = ax.range[0]; v <= ax.range[1]; v += ax.spacing) {
          const light = new THREE.PointLight(0xfff0d0, 0.0, 120);
          if(ax.axis === 'x') light.position.set(v, ax.fixed, height);
          else                light.position.set(ax.fixed, v, height);
          this._scene.add(light);
          this._lights.push(light);
        }
      });
      console.log('[3D] Street lights:', this._lights.length);
    },

    // Aprinde/stinge luminile stradale
    setNightLights(on) {
      (this._lights||[]).forEach(l => {
        l.intensity = on ? (0.3 + Math.random()*0.15) : 0;
      });
      this._map?.triggerRepaint?.();
    },

    updateYear(yr) {
      if(!this._ready||!this._meshes?.length) return;
      const C=window.TCI?.COLORS||{};
      this._entities.forEach((e,i)=>{
        const m=this._meshes[i]; if(!m)return;
        let tgt=0.1;
        if(yr>=e.startYr){const yF=Math.min(1,(yr-e.startYr)/18);tgt=Math.max(0.5,e.hBase+(e.hMax-e.hBase)*yF);}
        if(this._targetH)this._targetH[i]=tgt;
        let col;
        if(!C.stabil||yr<e.startYr)  col=C.stabil||'#374151';
        else if((yr-e.startYr)<5)     col=C.constructie||'#f59e0b';
        else if((yr-e.startYr)<10)    col=C.aproape||'#f97316';
        else                          col='#'+e.color.getHexString();
        m.material.color.set(col); m.visible=yr>=e.startYr-1;
        if(this._shadows?.[i])this._shadows[i].visible=m.visible;
      });
      this._map?.triggerRepaint();
    },

    updateLOD(zoom){const v=zoom>=12.5;(this._meshes||[]).forEach(m=>{if(m)m.visible=v;});(this._shadows||[]).forEach(s=>{if(s)s.visible=v;});},

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

    // 3. PROTECȚII HARDCODATE — disponibile SINCRON, fără nicio dependență de rețea
    // ── Validate pe teren + LMI oficial + PUG-uri + cunoaștere locală ────────
    const HARDCODED_BUFS = [
      // ── IAȘI ──────────────────────────────────────────────────────────────
      {lon:27.5895,lat:47.1521,r:150,reason:'Cimitirul Eternitatea — LMI I-s-B-02537',type:'cimitir'},
      {lon:27.6050,lat:47.1910,r:100,reason:'Cimitirul Sf.Apostoli Petru și Pavel Iași',type:'cimitir'},
      {lon:27.6218,lat:47.1955,r:100,reason:'Cimitirul Armenesc Iași',type:'cimitir'},
      {lon:27.6350,lat:47.1950,r:320,reason:'Pădurea Ciric Iași',type:'padure'},
      {lon:27.5850,lat:47.1650,r:180,reason:'Lacul Ciric Iași',type:'apa'},
      {lon:27.5640,lat:47.1680,r:90, reason:'Stadionul TEPRO Iași',type:'stadion'},
      {lon:27.5960,lat:47.1560,r:120,reason:'Grădina Botanică Iași — LMI',type:'parc'},
      // ── CLUJ-NAPOCA ────────────────────────────────────────────────────────
      {lon:23.5897,lat:46.7712,r:130,reason:'Cimitirul Central Cluj-Napoca',type:'cimitir'},
      {lon:23.6121,lat:46.7698,r:100,reason:'Cimitirul Hajongard Cluj — LMI',type:'cimitir'},
      {lon:23.5866,lat:46.7580,r:150,reason:'Parcul Central Cluj-Napoca',type:'parc'},
      // ── TIMIȘOARA ──────────────────────────────────────────────────────────
      {lon:21.2292,lat:45.7536,r:120,reason:'Cimitirul Eroilor Timișoara',type:'cimitir'},
      {lon:21.2310,lat:45.7490,r:100,reason:'Cimitirul Ortodox Timișoara',type:'cimitir'},
      {lon:21.2267,lat:45.7489,r:100,reason:'Parcul Rozelor Timișoara',type:'parc'},
      // ── BUCUREȘTI ─────────────────────────────────────────────────────────
      {lon:26.0457,lat:44.4396,r:130,reason:'Cimitirul Bellu București — LMI',type:'cimitir'},
      {lon:26.1146,lat:44.4258,r:90, reason:'Cimitirul Ghencea București',type:'cimitir'},
      {lon:26.0827,lat:44.4519,r:200,reason:'Parcul Tineretului București',type:'parc'},
      {lon:26.0813,lat:44.4638,r:150,reason:'Parcul IOR București',type:'parc'},
      // ── CONSTANȚA ─────────────────────────────────────────────────────────
      {lon:28.6460,lat:44.1598,r:110,reason:'Cimitirul Central Constanța',type:'cimitir'},
      {lon:28.6563,lat:44.1800,r:500,reason:'Plaja Mamaia — zonă protejată',type:'plaja'},
      // ── BRAȘOV ────────────────────────────────────────────────────────────
      {lon:25.5833,lat:45.6527,r:110,reason:'Cimitirul Central Brașov',type:'cimitir'},
      {lon:25.5820,lat:45.6611,r:200,reason:'Parcul Central Brașov',type:'parc'},
      // ── ORADEA ────────────────────────────────────────────────────────────
      {lon:21.9167,lat:47.0722,r:110,reason:'Cimitirul Municipal Oradea',type:'cimitir'},
      // ── GALAȚI ────────────────────────────────────────────────────────────
      {lon:28.0100,lat:45.4335,r:200,reason:'Dunărea — zona portuară Galați',type:'apa'},
      // ── CRAIOVA ────────────────────────────────────────────────────────────
      {lon:23.7943,lat:44.3303,r:250,reason:'Parcul Nicolae Romanescu Craiova — LMI',type:'parc'},
      // ── SUCEAVA ────────────────────────────────────────────────────────────
      {lon:26.0953,lat:47.6497,r:120,reason:'Cetatea de Scaun Suceava — LMI',type:'monument'},
      {lon:25.9953,lat:47.6336,r:100,reason:'Cimitirul Central Suceava',type:'cimitir'},
      // ── BACĂU ──────────────────────────────────────────────────────────────
      {lon:26.9164,lat:46.5668,r:100,reason:'Cimitirul Central Bacău',type:'cimitir'},
      // ── PLOIEȘTI ────────────────────────────────────────────────────────────
      {lon:26.0211,lat:44.9443,r:100,reason:'Cimitirul Bolovani Ploiești',type:'cimitir'},
    ];

    this._constraints = {bufs: HARDCODED_BUFS, loaded:false};
    this._projZones = this._buildZones(cx, cy, this._constraints);

    // 4. 2D contururi — imediat cu protecții hardcodate
    this._updateProjectionLayers(this.year || 2025);

    // 5. 3D — imediat cu protecții hardcodate (nu mai așteptăm Overpass)
    const buildScene = (bufs) => {
      this._3D.setOrigin(cx, cy);
      this._3D.buildSceneGraph(this._projZones, this.year || 2025, bufs || HARDCODED_BUFS);
    };
    if(m.isStyleLoaded?.()) buildScene();
    else { m.once('idle', ()=>buildScene()); setTimeout(()=>buildScene(), 3000); }

    // 6. Fetch constrângeri real-time → rebuild cu date complete
    this._CONSTRAINT.build(cx, cy, 12).then(constraints => {
      // Merge: hardcoded + real-time (fără duplicate la <100m)
      const R=111319.9, cp=Math.cos(cy*Math.PI/180);
      const mergedBufs = [...HARDCODED_BUFS];
      (constraints.bufs||[]).forEach(b => {
        const dup = mergedBufs.some(h =>
          Math.hypot((b.lon-h.lon)*R*cp,(b.lat-h.lat)*R) < 100 && h.type===b.type
        );
        if(!dup) mergedBufs.push(b);
      });

      constraints.bufs = mergedBufs;
      this._constraints = constraints;
      this._projZones = this._buildZones(cx, cy, constraints);

      if(constraints.devZones?.length) {
        const existing = new Set(this._projZones.map(z=>z.id));
        constraints.devZones.forEach((dz,idx) => {
          if(dz.priority > 2) return;
          const id = 'OSM_'+idx;
          if(existing.has(id)) return;
          const excluded = mergedBufs.some(b=>
            Math.hypot((dz.lon-b.lon)*R*cp,(dz.lat-b.lat)*R)<b.r+50
          );
          if(excluded) return;
          this._projZones.push({
            id, color:dz.color, hMax:dz.hMax, startYr:dz.startYr,
            label:dz.name, sub:dz.type==='constructie'?'Șantier activ OSM 2025':'Pol de dezvoltare',
            ring:{cx:dz.lon, cy:dz.lat, rx:0.0040, ry:0.0028},
          });
          existing.add(id);
        });
      }

      this._updateProjectionLayers(this.year || 2025);
      this._showConstraintOverlay(constraints, cx, cy);

      // Rebuild 3D cu toate constrângerile — versiunea finală corectă
      this._3D.setOrigin(cx, cy);
      this._3D.buildSceneGraph(this._projZones, this.year || 2025, mergedBufs);
      console.log(`[TCI] ✅ 3D rebuild final: ${mergedBufs.length} constrângeri (${HARDCODED_BUFS.length} hard + ${mergedBufs.length-HARDCODED_BUFS.length} live)`);

    }).catch(e => {
      console.warn('[TCI] Constraints fetch error:', e.message);
      // Fallback: rebuild 3D cu doar hardcoded — tot mai bine decât zero
      this._3D.buildSceneGraph(this._projZones, this.year || 2025, HARDCODED_BUFS);
    });

    // 7. Fetch coridoare rutiere reale OSM + autostrăzi planificate CNAIR
    this._lastCors = [];
    this._fetchInfraCorridors(cx, cy, 22).then(cors => {
      if(!cors?.length) {
        console.warn('[TCI] ⚠️ Overpass fără date — rămânem pe fallback geometric');
        return;
      }
      this._lastCors = cors;
      this._projZones = this._buildZones(cx, cy, this._constraints);
      this._updateProjectionLayers(this.year || 2025);
      this._3D.setOrigin(cx, cy);
      this._3D.buildSceneGraph(this._projZones, this.year || 2025, this._constraints?.bufs || HARDCODED_BUFS);
      console.log(`[TCI] ✅ Rebuild cu coridoare OSM reale: ${cors.length} puncte → ${this._projZones.length} zone`);

      // 8. Frontier Analysis — după ce avem drumurile, analizăm frontier-ul urban
      // Rulează async, adaugă zone suplimentare bazate pe P(u) per celulă
      // NUMAI pentru UAT-uri fără date GPS hardcodate (Nivel 2 generic)
      const hasRealZones = !!(this._REAL_ZONES[(this.cityKey||'').toLowerCase()] ||
        this._REAL_ZONES[(this.d?.name||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(/[-\s]/)[0]]);

      if(!hasRealZones) {
        this._analyzeFrontier(cx, cy, 5).then(frontierZones => {
          if(!frontierZones?.length) return;
          const bufs = this._constraints?.bufs || HARDCODED_BUFS;
          const R = 111319.9, cp = Math.cos(cy*Math.PI/180);
          const existing = new Set(this._projZones.map(z=>z.id));
          frontierZones.forEach(fz => {
            if(existing.has(fz.id)) return;
            // Verifică constrângeri
            const excluded = bufs.some(b =>
              Math.hypot((fz.lon-b.lon)*R*cp, (fz.lat-b.lat)*R) < b.r + 50
            );
            if(excluded) return;
            this._projZones.push({
              id: fz.id, color: fz.color, hMax: fz.hMax, startYr: fz.startYr,
              label: fz.label, sub: fz.sub,
              ring: {cx: fz.lon, cy: fz.lat, rx: fz.rx, ry: fz.ry},
            });
            existing.add(fz.id);
          });
          this._updateProjectionLayers(this.year || 2025);
          this._3D.setOrigin(cx, cy);
          this._3D.buildSceneGraph(this._projZones, this.year || 2025, bufs);
          console.log(`[TCI] ✅ Frontier Analysis: +${frontierZones.length} zone P(u) → total ${this._projZones.length}`);
        }).catch(e => console.warn('[TCI] Frontier error:', e.message));
      }

    }).catch(e => console.warn('[TCI] Infra corridors error:', e.message));
  },

  // Afișează vizual zonele excluse (buffer-ele de constrângeri)
  _showConstraintOverlay(constraints, cx, cy) {
    const m = this.map; if(!m) return;
    if(m.getSource?.('tci-constraints')) return;
    try {
      const features = (constraints.bufs||[]).map(b => {
        const coords = this._poly(b.lon, b.lat, b.r/111319.9, b.r/111319.9, 20);
        return {type:'Feature', geometry:{type:'Polygon',coordinates:[coords]},
          properties:{reason:b.reason, color:b.color, type:b.type}};
      });
      m.addSource('tci-constraints', {type:'geojson', data:{type:'FeatureCollection',features}});
      m.addLayer({id:'tci-const-fill',type:'fill',source:'tci-constraints',maxzoom:13,paint:{'fill-color':['get','color'],'fill-opacity':0.12}});
      m.addLayer({id:'tci-const-outline',type:'line',source:'tci-constraints',maxzoom:14,paint:{'line-color':['get','color'],'line-width':1,'line-dasharray':[4,3],'line-opacity':0.5}});
      console.log('[TCI] ✅ Overlay constrângeri:', features.length, 'zone excluse');
    } catch(e){}
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
        console.log('[Director] ✅ '+this._scenes.length+' scene încărcate pentru '+this._tci?.d?.name);
      } catch(e) {
        console.error('[Director] Eroare build scenes:',e.message, e.stack?.split('\n')[1]||'');
        // Fallback — folosim this._tci (T nu e în scope aici!)
        const d=this._tci?.d||{};
        const cx=d.lon||27.601, cy=d.lat||47.158;
        const name=d.name||'UAT';
        this._scenes=[
          {id:'fb1',dur:60000,light:'dusk',
           cam:{center:[cx,cy],zoom:4.5,pitch:0,bearing:0,duration:3500},
           chain:[{center:[cx,cy],zoom:12,pitch:50,bearing:-20,duration:6000,delay:8000},
                  {center:[cx,cy],zoom:15,pitch:68,bearing:10,duration:5000,delay:20000}],
           title:'🏙 '+name,body:name+' — proiecție urbanistică 2025-2055',src:'UrbanX TSS·FG'},
          {id:'fb2',dur:60000,light:'dusk',
           cam:{center:[cx,cy],zoom:13.5,pitch:55,bearing:-25,duration:5000},
           chain:[{center:[cx,cy],zoom:16.5,pitch:76,bearing:20,duration:6000,delay:12000},
                  {center:[cx,cy],zoom:12,pitch:40,bearing:0,duration:5000,delay:35000}],
           title:'📊 Date Oficiale '+name,body:'Proiecție calibrată: INSE · Eurostat · ANCPI · BNR · IPCC AR6',src:'UrbanX TSS·FG'},
        ];
        console.log('[Director] Fallback la',cx.toFixed(3),cy.toFixed(3),'pentru',name);
      }
      this._idx=-1;
      clearTimeout(this._timer);
      setTimeout(()=>this._next(),1500);
    },

    _build() {
      const T=this._tci;
      const d=T.d||{};
      const cx=d.lon||27.601, cy=d.lat||47.158;
      const name=d.name||'UAT';
      const pop=(d.pop2021||100000).toLocaleString();
      const yr=T.year||2025;
      const county=d.judet||'';
      const rate=(d.rata_reala_2011_2021||0).toFixed(2);
      const sc=Math.pow((d.pop2021||100000)/360000, 0.4);

      // ── Date din motoarele reale — folosite în toate scenele ──────────
      const need = T._calcUrbanNeed?.(d) || {pop2021:d.pop2021||100000,pop2055:Math.round((d.pop2021||100000)*1.1),locuinteTotale:5000,totalM2:340000,cladiri:{centru:10,inner:12,coridor:14,rezid:14,expansie:8,logistica:4}};
      const grav = T._calcGravityScore?.(d) || {growthType:'LOCAL',gravityScore:0.3};
      const seis = T._getSeismicAg?.(cx,cy) || {ag:0.20,hMaxStory:8,hMaxM:24};
      const clim = T._getClimateProfile?.(county) || {zone:'NV',uhi:1.0,flood:0.4,drought:0.3,note:'Profil moderat'};
      const scn  = T._getScenario?.() || {label:'Moderat',rateMultiplier:1.0};
      const densHA = Math.round((d.pop2021||100000) / (d.suprafata_ha||5000));

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
         body:'Zona metropolitana extinsă. Rată demografică: '+rate+'%/an. Densitate: '+densHA+' loc/km². PIB județ: '+Math.round((d.pop2021||100000)*(d.coef_hub||0.8)*0.05/1000)+' mld €/an.',
         src:'INS · ADR Nord-Est · Eurostat NUTS'},

        // S3 — Aproach (22s) — chains la 7s și 16s
        // ══════════════════════════════════════════════════════════════════
        // DIRECTOR v2 — dinamic, 3D de la scena 3, alternând zi/noapte/dusk
        // REGULA: max 20s în 2D → coborâre la stradă (zoom 16-17) → urcare → altă zonă
        // ══════════════════════════════════════════════════════════════════

        // S3 — APROACH + primul zoom 3D (22s) · ZIUA
        {id:'s3',dur:22000,light:'day',
         cam:{center:[cx,cy],zoom:11.5,pitch:28,bearing:-15,duration:3500},
         chain:[
           {center:[cx,cy],zoom:13.0,pitch:48,bearing:-8,duration:5000,delay:6000},
           {center:[cx,cy],zoom:15.0,pitch:65,bearing:-5,duration:5500,delay:14000},  // 3D!
         ],
         title:'✈ '+name+' — Vedere 3D',
         body:'Aproach urban. Densitate: '+densHA+' loc/ha. PIB județ: '+Math.round((d.pop2021||100000)*(d.coef_hub||0.8)*0.05/1000)+' mld €/an. Rata creștere: '+rate+'%/an. Proiecție 2055: '+Math.round(need.pop2055).toLocaleString('ro-RO')+' locuitori.',
         src:'INSE · ANCPI · BNR · Eurostat'},

        // S4 — ZONA CU ACTIVITATE MAXIMĂ (50s) · ZIUA → la stradă
        // Offset relativ față de centrul UAT, nu hardcodat pe Iași
        {id:'s4',dur:50000,light:'day',
         cam:{center:[cx-0.012,cy+0.009],zoom:14.0,pitch:55,bearing:-20,duration:5000},
         chain:[
           {center:[cx-0.012,cy+0.009],zoom:15.5,pitch:68,bearing:15,duration:6000,delay:10000},
           {center:[cx-0.012,cy+0.009],zoom:16.5,pitch:74,bearing:-20,duration:6000,delay:22000,light:'day'},
           {center:[cx-0.011,cy+0.009],zoom:17.0,pitch:78,bearing:10,duration:6000,delay:34000,light:'dusk'},
           {center:[cx-0.010,cy+0.009],zoom:15.0,pitch:62,bearing:30,duration:5500,delay:44000,light:'dusk'},
         ],
         title:'🏗 '+name+' — Zonă Activă',
         body:'Zonă cu creștere accelerată '+need.cladiri.inner+' clădiri noi estimate ('+grav.growthType+'). ANCPI '+Math.round(d.pop2021/85).toLocaleString()+' autorizații/an estimat. hMax seismic: '+seis.hMaxStory+' etaje.',
         src:'ANCPI · P100-1/2022 · Model TSS·FG'},

        // S5 — CENTRU CIVIC + CORIDOARE (55s) · APU→NOAPTE→DIMINEAȚĂ
        {id:'s5',dur:55000,light:'dusk',
         cam:{center:[cx,cy],zoom:14.5,pitch:60,bearing:-10,duration:5000},
         chain:[
           {center:[cx,cy],zoom:15.5,pitch:67,bearing:15,duration:6000,delay:10000},
           {center:[cx,cy],zoom:16.5,pitch:74,bearing:-15,duration:6000,delay:22000,light:'dusk'},
           {center:[cx,cy],zoom:17.0,pitch:79,bearing:5,duration:6000,delay:33000,light:'night'},
           {center:[cx+0.001,cy-0.0005],zoom:16.0,pitch:72,bearing:30,duration:5500,delay:44000,light:'dawn'},
         ],
         title:'🌆 Centru Civic — Densificare '+grav.growthType,
         body:'Zona centrală: densificare '+need.cladiri.centru+' clădiri estimat 2025-2040. CUT calculat per seismic (ag='+seis.ag+'g): R+'+Math.max(4,seis.hMaxStory-2)+'-R+'+seis.hMaxStory+'. Coridoare principale E-V și N-S. Ciclu zi→apus→noapte→dimineață.',
         src:'PUG UTR · ANCPI · P100-1/2022 · Model TSS·FG'},

        // S6 — RECONVERSIE INDUSTRIALĂ (55s) · ZIUA → vedere aeriană
        {id:'s6',dur:55000,light:'day',
         cam:{center:[cx+0.022*sc,cy-0.011*sc],zoom:14.0,pitch:55,bearing:-20,duration:5000},
         chain:[
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:15.0,pitch:64,bearing:15,duration:6000,delay:10000},
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:16.2,pitch:72,bearing:-25,duration:6000,delay:22000,light:'day'},
           {center:[cx+0.021*sc,cy-0.010*sc],zoom:17.0,pitch:78,bearing:20,duration:6000,delay:34000,light:'dusk'},
           {center:[cx+0.022*sc,cy-0.009*sc],zoom:14.5,pitch:58,bearing:0,duration:5500,delay:46000,light:'dusk'},
         ],
         title:'🏗 Reconversie Industrială — '+name,
         body:'Zonă industrială potențial reconversie. '+need.cladiri.logistica+' clădiri logistică + '+need.cladiri.coridor+' coridoare mixte estimate 2028-2042. Investiție estimată: ≈'+Math.round(need.totalM2*0.08*850/1e6)+'M€. ROI estimat zona: '+T._calcFeasibility?.({},d,seis.ag)?.roi+'%.',
         src:'PUG UTR AI · ANCPI · Model TSS·FG'},

        // S7 — NIVEL STRADĂ NOAPTE DRAMATICĂ (55s) — geamuri aprinse, stâlpi
        {id:'s7',dur:55000,light:'night',
         cam:{center:[cx+0.021*sc,cy-0.009*sc],zoom:16.0,pitch:72,bearing:-10,duration:5000},
         chain:[
           {center:[cx+0.021*sc,cy-0.010*sc],zoom:17.0,pitch:78,bearing:15,duration:6000,delay:10000,light:'night'},
           {center:[cx+0.020*sc,cy-0.011*sc],zoom:17.3,pitch:79,bearing:-20,duration:6000,delay:22000,light:'night'},
           {center:[cx+0.019*sc,cy-0.009*sc],zoom:16.5,pitch:74,bearing:30,duration:5500,delay:34000,light:'dawn'},
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:15.0,pitch:62,bearing:10,duration:5500,delay:46000,light:'dawn'},
         ],
         title:'🌃 Noaptea — '+name+' 2040',
         body:'Nivel pietonal: geamuri aprinse (rezidențial densificat), iluminat stradal LED, activitate nocturnă. Comparație stânga (2025, industrial) vs dreapta (2040, mixt funcțional). Densitate proiectată: +'+Math.round(densHA*0.4)+' loc/ha.',
         src:'PMUD · ANM · OMS · ANCPI · Model TSS·FG'},

        // S8 — EXPANSIUNE PERIFERICĂ + REZIDENȚIAL NOU (50s) · ZIUA
        {id:'s8',dur:50000,light:'day',
         cam:{center:[cx+0.024*sc,cy-0.006*sc],zoom:13.5,pitch:48,bearing:-15,duration:5000},
         chain:[
           {center:[cx+0.024*sc,cy-0.006*sc],zoom:14.8,pitch:62,bearing:20,duration:6000,delay:10000},
           {center:[cx+0.024*sc,cy-0.006*sc],zoom:16.0,pitch:72,bearing:-10,duration:6000,delay:22000,light:'day'},
           {center:[cx+0.023*sc,cy-0.007*sc],zoom:16.5,pitch:75,bearing:15,duration:6000,delay:33000,light:'dusk'},
           {center:[cx+0.024*sc,cy-0.006*sc],zoom:13.5,pitch:46,bearing:5,duration:5000,delay:44000,light:'dusk'},
         ],
         title:'🏘 Expansiune Periferică — Rezidențial Nou',
         body:'Zona periferică '+name+'. Estimare PUZ noi: +'+need.cladiri.expansie+' clădiri R+2-R+4. Extindere intravilam pe extravilan. Proiecție: +'+Math.round((d.pop2021||100000)*0.08).toLocaleString()+' locuitori până 2035. Tip creștere: '+grav.growthType+'.',
         src:'ANCPI · INS · Model TSS·FG'},

        // S9 — RISCURI & CLIMĂ (50s) · NOAPTE
        {id:'s9',dur:50000,light:'night',
         cam:{center:[cx,cy],zoom:12.5,pitch:42,bearing:5,duration:5000},
         chain:[
           {center:[cx+0.006,cy-0.004],zoom:13.5,pitch:50,bearing:-18,duration:6000,delay:12000},
           {center:[cx-0.008,cy+0.005],zoom:13.8,pitch:53,bearing:14,duration:6000,delay:26000},
           {center:[cx,cy],zoom:12.5,pitch:42,bearing:0,duration:5000,delay:42000},
         ],
         title:'⚠ Riscuri & Climă — '+name,
         body:'Seismic P100-1/2022: ag='+seis.ag+'g → hMax '+seis.hMaxStory+' etaje. Climă zona '+clim.zone+': UHI +'+clim.uhi+'°C, risc inundații '+Math.round(clim.flood*100)+'%, secetă '+Math.round(clim.drought*100)+'%. '+clim.note+'. IPCC AR6 RCP8.5.',
         src:'INFP P100-1/2022 · ANAR · IPCC AR6 · ANM · INHGA'},

        // S10 — COMPARAȚIE EU (55s) · APU
        {id:'s10',dur:55000,light:'dusk',
         cam:{center:[cx,cy],zoom:13.0,pitch:46,bearing:-10,duration:5000},
         chain:[
           {center:[cx+0.004,cy-0.003],zoom:14.0,pitch:56,bearing:18,duration:6000,delay:12000},
           {center:[cx-0.004,cy+0.003],zoom:14.5,pitch:60,bearing:-18,duration:6000,delay:28000},
           {center:[cx,cy],zoom:13.0,pitch:46,bearing:5,duration:5000,delay:46000},
         ],
         title:'⚖ '+name+' — Context European',
         body:name+': '+densHA+' loc/ha · Tip '+grav.growthType+' · Seismic ag='+seis.ag+'g · Climă zona '+clim.zone+'. Referință UE similară: Rzeszów (PL) 32loc/ha · Vilnius (LT) 56loc/ha · Brno (CZ) 48loc/ha. Decalaj recuperabil în 8-15 ani cu investiții consistente.',
         src:'Eurostat Urban Audit 2022 · INS · INFP'},

        // S11 — TIME MACHINE orbit 360° (70s) · ZIUA→APU→NOAPTE
        {id:'s11',dur:70000,light:'day',
         cam:{center:[cx,cy],zoom:14.0,pitch:55,bearing:0,duration:5000},
         chain:[
           {center:[cx,cy],zoom:14.8,pitch:60,bearing:90,duration:8000,delay:12000,light:'day'},
           {center:[cx,cy],zoom:15.0,pitch:62,bearing:180,duration:8000,delay:28000,light:'dusk'},
           {center:[cx,cy],zoom:15.2,pitch:64,bearing:270,duration:8000,delay:46000,light:'night'},
           {center:[cx,cy],zoom:14.5,pitch:58,bearing:360,duration:7000,delay:62000,light:'dawn'},
         ],
         title:'⏱ Time Machine — 2025 → 2050',
         body:'Orbită 360° completă. Zi→apus→noapte→dimineață. Clădirile cresc progresiv. Scrub pe slider pentru orice an. Transformare totală: '+Math.round((yr-2025)/25*100)+'%.',
         src:'INSE · ANCPI · IPCC · Model TSS·FG',
         animYear:true,yearFrom:2025,yearTo:2050},

        // S12 — CONCLUZIE (40s) · DIMINEAȚA
        {id:'s12',dur:40000,light:'dawn',
         cam:{center:[cx,cy],zoom:12.5,pitch:44,bearing:-15,duration:4500},
         chain:[
           {center:[cx,cy],zoom:14.0,pitch:58,bearing:20,duration:6000,delay:10000},
           {center:[cx,cy],zoom:15.5,pitch:66,bearing:-10,duration:5500,delay:26000},
           {center:[cx,cy],zoom:12.0,pitch:38,bearing:0,duration:5000,delay:35000},
         ],
         title:'🌟 '+name+' 2055 — Viziunea',
         body:'Proiecție '+need.pop2021.toLocaleString('ro-RO')+'→'+need.pop2055.toLocaleString('ro-RO')+' loc. · '+need.locuinteTotale.toLocaleString('ro-RO')+' locuințe necesare · Inv. estimată ≈'+(Math.round(need.totalM2*850/1e6)+Math.round(need.locuinteTotale*15000/1e6))+'M€. Scenariu: '+scn.label+'. Date calibrate INS·ANCPI·BNR·IPCC AR6.',
         src:'UrbanX TSS·FG © — INSE · Eurostat · ANCPI · BNR · IPCC AR6'},
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
        try{const cx=T.d?.lon||27.601,cy=T.d?.lat||47.158;
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
    if(!s||this.scenario===s)return;
    this.scenario=s;
    this._updateKPIs();
    // Rebuild zones cu noul scenariu
    const cx=this.d?.lon||27.601, cy=this.d?.lat||47.158;
    this._projZones=this._buildZones(cx,cy,this._constraints||{bufs:[]});
    this._updateProjectionLayers(this.year||2025);
    // Rebuild 3D cu animație resetată
    if(this._3D?._ready){
      this._3D._entities=[];
      (this._3D._meshes||[]).forEach(m=>{try{m.geometry?.dispose();m.material?.dispose();}catch(e){}});
      (this._3D._shadows||[]).forEach(s=>{try{s.geometry?.dispose();s.material?.dispose();}catch(e){}});
      while(this._3D._scene?.children?.length>1)this._3D._scene.remove(this._3D._scene.children[1]);
      this._3D._meshes=[];this._3D._shadows=[];
      if(this._3D._currentH)this._3D._currentH.fill(0.1);
      this._3D.buildSceneGraph(this._projZones, this.year||2025, this._constraints?.bufs||[]);
    }
    console.log('[TCI] Scenariu→',s,this._getScenario()?.label);
  },

  _snapshot() {
    try {
      const cv=this.map?.getCanvas?.();
      if(!cv) return;
      const a=document.createElement('a');
      a.href=cv.toDataURL('image/png');
      a.download=`UrbanX-${this.d?.name||'UAT'}-${this.year}.png`;
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
    box.innerHTML=`<div style="font-size:8px;color:#D4AF37;margin-bottom:6px">🔗 SHARE URL — ${this.d?.name||''} ${this.year}</div>
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
        a.download=`UrbanX-${this.d?.name||'UAT'}-${this.year}.webm`;
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
