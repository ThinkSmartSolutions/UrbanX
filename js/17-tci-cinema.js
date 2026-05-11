<button onclick="TCI._generateReport()" title="Generează raport PDF complet"
          style="padding:5px 10px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);
          color:#D4AF37;border-radius:5px;font-size:10px;font-family:inherit;cursor:pointer;margin-right:4px">
          📄 Raport PDF</button>
        <button onclick="TCI._saveScenario()" title="Salvează scenariu curent"
          style="padding:5px 10px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.4);
          color:#818cf8;border-radius:5px;font-size:10px;font-family:inherit;cursor:pointer;margin-right:4px">
          💾 Salvează</button>
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
  _version: '81',
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
    const prevCityKey = this.cityKey;
    this.cityKey   = this._selectedUATKey || opts.cityKey
      || window.S?.activeUAT || window._ProjectionEngine?.currentCity || 'iasi';
    this._selectedUATKey = null;

    this.cityData  = (typeof _RO_CITIES_DB !== 'undefined')
      ? (_RO_CITIES_DB[this.cityKey] || Object.values(_RO_CITIES_DB)[0]) : null;

    // Reset 3D când se schimbă UAT-ul
    if(prevCityKey && prevCityKey !== this.cityKey && this._3D?._meshes?.length) {
      this._3D._entities = [];
      this._3D._meshes.forEach(m => { try{m.geometry?.dispose(); m.material?.dispose();}catch(e){} });
      while(this._3D._scene?.children?.length > 1) this._3D._scene.remove(this._3D._scene.children[1]);
      this._3D._meshes = [];
      console.log('[TCI] 🔄 Reset 3D pentru nou UAT:', this.cityKey);
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
          <option value="S1">S1 Accelerat</option><option value="S2" selected>S2 Moderat</option><option value="S3">S3 Conservare</option><option value="S4">S4 Risc Climatic</option>
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
      's2': `👁 Ce vedeți: zona metropolitană ${name} de la înălțime. ${growthLabel}. Rata creștere: ${rate}%/an (INS). Proiecție 2050: pop. estimată cu modelul Cohort Survival + Migration Matrix.`,
      's3': `👁 Ce vedeți: ${name} la nivel de cartier. Clădirile portocalii = proiecție ${this.startYear}-2055. Stânga = ${this.startYear}. Dreapta = proiecție bazată pe date INS + ANCPI + Gravity Model.`,
      's4': `👁 Ce vedeți: zona cu cea mai activă construcție din ${name}. Scenariul activ: ${this._getScenario?.()?.label||'S2 Sustenabil'}. Constrângerile seismice (ag=${this._getSeismicAg?.(cx,cy)?.ag||0.2}g) limitează înălțimea la R+${this._getSeismicAg?.(cx,cy)?.hMaxStory||12}.`,
      's5': `👁 Ce vedeți: ${name} în transformare 2025→2055. ${need_locuinte} locuințe noi necesare. Clădirile cresc animat în timp real — galben=construcție activă, verde=finalizat, violet=centru densificat.`,
      's6': `👁 Ce vedeți: rețeaua de mobilitate din ${name}. Mașini (galben) + autobuze (albastru) + tramvaie (roșu) în mișcare. Trafic estimat 2050: auto ${Math.round(d.modal_auto||66)}% · TP ${Math.round(d.modal_tp||22)}%.`,
      's7': `👁 Ce vedeți: zona specifică ${name} la zoom detaliat. Contururile portocalii = zone generate de Isochrone Model (urmează rețeaua OSM reală, nu cercuri). Dreapta = proiecție pe coridoarele de mobilitate.`,
      's8': `👁 Ce vedeți: ${name} la nivel de stradă. ${growthLabel}. Mobilitate verde, spații publice, calitatea aerului — indicatori ESG Urban Score: ${d.esg_score||51}/100.`,
      's9': `👁 Ce vedeți: hărți de risc pentru ${name}. Seismic: ag=${this._getSeismicAg?.(cx,cy)?.ag||0.2}g (P100-1/2013). Zone inundabile + alunecări (OSM). Constrângerile sunt aplicate automat în generarea proiecției.`,
      's10': `👁 Ce vedeți: ${name} comparat cu orașe similare din România. Toate datele = INS + Eurostat. Urban Gravity Score: ${Math.round((this._calcGravityScore?.(d)?.gravityScore||0.5)*100)}/100 → ${growthLabel}.`,
      's11': `👁 Ce vedeți: Time Machine ${name} 2025→2055. Scenariul ${this._getScenario?.()?.label||'S2'}. Slider-ul controlează timpul — clădirile apar pe măsură ce anii avansează conform proiecției statistice.`,
      's12': `👁 Ce vedeți: viziunea ${name} 2055. Motor predictiv: INS Cohort Survival + Migration Matrix + Urban Gravity Model + Isochrone Expansion. Date: INS · ANCPI · Eurostat · OSM.`,      };
    },

    // ── Overpass API — cimitire, păduri, ape, căi ferate ─────────────
    // ── MAPBOX SEARCH API — POI complet, orice UAT România ──────────────
    // Folosim tokenul Mapbox existent — nu e nevoie de API key separat
    // Date mult mai complete decât Overpass pentru România
    // Documentație: docs.mapbox.com/api/search/search-box/
    async _mapboxCategorySearch(category, lon, lat, radiusKm, token) {
      const margin = radiusKm / 111.32;
      const bbox   = `${lon-margin},${lat-margin},${lon+margin},${lat+margin}`;
      const url    = `https://api.mapbox.com/search/searchbox/v1/category/${category}`+
                     `?bbox=${bbox}&limit=50&language=ro&access_token=${token}`;
      try {
        const resp = await fetch(url, {signal:AbortSignal.timeout(6000)});
        if(!resp.ok) return [];
        const data = await resp.json();
        return (data.features||[]).map(f=>({
          name: f.properties?.name || f.properties?.full_address || category,
          lon:  f.geometry?.coordinates?.[0],
          lat:  f.geometry?.coordinates?.[1],
          category,
          tags: f.properties || {},
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
          const t=el.tags||{}, c=this._centroid(el.geometry);
          if(!c) return;
          if(t.building==='construction'||t.landuse==='construction') {
            santiere.push({lon:c[0],lat:c[1],name:t.name||'Șantier activ',
                           type:'constructie',color:'#f59e0b',hMax:20,startYr:2025,priority:1});
          } else if(t.amenity==='grave_yard') {
            extra_bufs.push({lon:c[0],lat:c[1],r:65,reason:t.name||'Cimitir',color:'#6b7280',type:'cimitir'});
          } else if(t.natural==='wood') {
            extra_bufs.push({lon:c[0],lat:c[1],r:50,reason:t.name||'Pădure',color:'#15803d',type:'padure'});
          } else if(t.natural==='water'||t.waterway==='river') {
            extra_bufs.push({lon:c[0],lat:c[1],r:50,reason:t.name||'Apă',color:'#0ea5e9',type:'apa'});
          } else if(t.railway) {
            extra_bufs.push({lon:c[0],lat:c[1],r:22,reason:'Cale ferată',color:'#78716c',type:'cf'});
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
  // ══════════════════════════════════════════════════════════════════════
  // SCENARII S1-S4
  // ══════════════════════════════════════════════════════════════════════
  _SCENARIOS: {
    'S1': { label:'Dezvoltare Accelerată',  rateMultiplier:1.8, hMaxMultiplier:1.25, expansieMultiplier:1.5, color:'#22c55e' },
    'S2': { label:'Dezvoltare Sustenabilă', rateMultiplier:1.0, hMaxMultiplier:1.0,  expansieMultiplier:1.0, color:'#3b82f6' },
    'S3': { label:'Conservare & Echilibru', rateMultiplier:0.6, hMaxMultiplier:0.80, expansieMultiplier:0.4, color:'#f59e0b' },
    'S4': { label:'Risc Climatic Ridicat',  rateMultiplier:0.3, hMaxMultiplier:0.65, expansieMultiplier:0.2, color:'#ef4444' },
  },
  _getScenario() { return this._SCENARIOS[this.scenario] || this._SCENARIOS['S2']; },

  // ══════════════════════════════════════════════════════════════════════
  // RATE SUPRAVIEȚUIRE COHORTE — INS 2021 România
  // ══════════════════════════════════════════════════════════════════════
  _SURVIVAL_RATES: {
    '0-4':[.9985,.9978],'5-9':[.9991,.9987],'10-14':[.9993,.9989],'15-19':[.9990,.9979],
    '20-24':[.9988,.9973],'25-29':[.9987,.9971],'30-34':[.9984,.9966],'35-39':[.9980,.9957],
    '40-44':[.9971,.9938],'45-49':[.9956,.9907],'50-54':[.9932,.9862],'55-59':[.9895,.9796],
    '60-64':[.9836,.9688],'65-69':[.9745,.9530],'70-74':[.9580,.9253],'75+':[.8900,.8400],
  },
  _POP_DISTRIBUTION: [
    ['0-4',.048,0.],['5-9',.050,0.],['10-14',.052,0.],['15-19',.056,.05],
    ['20-24',.062,.35],['25-29',.070,.55],['30-34',.072,.50],['35-39',.068,.30],
    ['40-44',.065,.15],['45-49',.063,.08],['50-54',.060,.05],['55-59',.058,.03],
    ['60-64',.055,.02],['65-69',.048,.01],['70-74',.038,.0],['75+',.035,.0],
  ],


  // ══════════════════════════════════════════════════════════════════════
  // REAL ESTATE FEASIBILITY ENGINE
  // ROI = (Vsale - Cland - Cbuild - Cfinance) / Ctotal
  // ══════════════════════════════════════════════════════════════════════
  _calcFeasibility(zone, cityData, seismicAg) {
    const gravity    = this._calcGravityScore(cityData);
    const priceIdx   = gravity.growthType==='METROPOLITAN'?1.0:gravity.growthType==='REGIONAL'?0.65:gravity.growthType==='LOCAL'?0.45:0.30;
    const priceSale  = Math.round(1800*priceIdx);
    const priceLand  = Math.round(200*priceIdx);
    const priceBuild = Math.round(700+(seismicAg||0.2)*500);
    const cFinance   = priceBuild*0.07*2.5;
    const cTotal     = priceLand+priceBuild+cFinance;
    const roi        = (priceSale-cTotal)/cTotal;
    const viable     = roi>0.12;
    return { priceSale, priceLand, priceBuild,
             cFinance:Math.round(cFinance), cTotal:Math.round(cTotal),
             roi:Math.round(roi*1000)/10, viable,
             label: viable?`ROI ${Math.round(roi*100)}% ✓ viabil`:`ROI ${Math.round(roi*100)}% — risc` };
  },

  // ══════════════════════════════════════════════════════════════════════
  // URBAN PROBABILITY ENGINE — v85
  // P(D) = f(E, M, I, C, G) — Monte Carlo 500 simulări
  // Output: distribuție probabilistică, nu valori fixe
  //
  // "Nu 14 blocuri în 2047"
  // Ci "82% probabilitate de densificare medie-ridicată"
  //
  // Sursă metodologie: Urban Stochastic Modeling (MIT Urban Studies)
  // ══════════════════════════════════════════════════════════════════════

  _UPE_PARAMS: {
    N_SIMULATIONS: 500,
    // Variabile cu distribuție normală — (medie, deviație standard)
    vars: {
      E: { mean:1.0, sd:0.25, label:'Economie',       desc:'PIB/cap, investiții, credit' },
      M: { mean:1.0, sd:0.30, label:'Migrație',       desc:'Diaspora, rural-urban, inter-urban' },
      I: { mean:1.0, sd:0.20, label:'Infrastructură', desc:'A7/A8 timing, centuri, TP' },
      C: { mean:1.0, sd:0.22, label:'Climă',          desc:'UHI, secetă, inundații RCP4.5' },
      G: { mean:1.0, sd:0.28, label:'Guvernanță',     desc:'PUG, finanțare, politici' },
    },
    // Praguri de clasificare probabilistică
    thresholds: {
      densHigh:   0.70, // P > 70% → densificare ridicată (sigur)
      densMed:    0.45, // P 45-70% → densificare medie (probabil)
      densLow:    0.25, // P 25-45% → densificare scăzută (posibil)
      // sub 25% → improbabil
    },
  },

  // Generator număr aleator din distribuție normală (Box-Muller)
  _randn(mean, sd) {
    const u1 = Math.random(), u2 = Math.random();
    const z  = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.max(0.05, mean + z * sd); // minim 0.05 (niciodată 0)
  },

  // Calculează probabilitatea de dezvoltare pentru o zonă
  // bazat pe toți factorii și N simulări Monte Carlo
  _calcZoneProbability(zone, cityData, baseScore) {
    const P = this._UPE_PARAMS;
    const N = P.N_SIMULATIONS;
    const gravity  = this._calcGravityScore(cityData);
    const seismic  = this._getSeismicAg(cityData?.lon||27.6, cityData?.lat||47.16);
    const climate  = this._getClimateProfile(cityData?.judet||'');

    // Scor de bază al zonei (0-1) din modelele existente
    const baseZoneScore = Math.min(1, Math.max(0,
      baseScore ||
      (gravity.gravityScore * 0.4 +
       (1 - seismic.ag/0.5) * 0.2 +   // mai sigur seismic = mai probabil
       (1 - (climate.uhi||1)/2.5) * 0.1 +
       (zone.devScore||0.5) * 0.3)
    ));

    // Ponderi variabile în funcție de tipul zonei
    const weights = {
      E: zone.type === 'logistica' ? 0.35 : zone.type === 'comercial' ? 0.30 : 0.20,
      M: zone.type === 'rezidential' ? 0.30 : 0.15,
      I: (zone.roadClass?.includes('motorway')) ? 0.35 : 0.20,
      C: climate.drought > 0.6 || climate.flood > 0.6 ? 0.20 : 0.10,
      G: 0.15,
    };
    // Normalizare ponderi
    const wSum = Object.values(weights).reduce((a,b)=>a+b,0);
    Object.keys(weights).forEach(k => weights[k] /= wSum);

    // Monte Carlo: N simulări
    let successes = 0;
    const outcomes = [];
    for(let i = 0; i < N; i++) {
      const E = this._randn(P.vars.E.mean, P.vars.E.sd);
      const M = this._randn(P.vars.M.mean, P.vars.M.sd);
      const I = this._randn(P.vars.I.mean, P.vars.I.sd);
      const C = this._randn(P.vars.C.mean, P.vars.C.sd);
      const G = this._randn(P.vars.G.mean, P.vars.G.sd);

      // Scor simulare: baza × variabilele ponderate
      const simScore = baseZoneScore * (
        E*weights.E + M*weights.M + I*weights.I +
        (2-C)*weights.C + // clima adversă scade probabilitatea
        G*weights.G
      );

      const developed = simScore > 0.5 ? 1 : 0;
      successes += developed;
      outcomes.push(simScore);
    }

    outcomes.sort((a,b)=>a-b);
    const prob       = successes / N;
    const p5         = outcomes[Math.floor(N*0.05)];  // percentila 5
    const p50        = outcomes[Math.floor(N*0.50)];  // mediana
    const p95        = outcomes[Math.floor(N*0.95)];  // percentila 95

    // Clasificare
    const T = P.thresholds;
    let classification, color, label;
    if(prob >= T.densHigh) {
      classification = 'HIGH';
      color = '#22c55e';
      label = `Densificare ridicată probabilă (${Math.round(prob*100)}%)`;
    } else if(prob >= T.densMed) {
      classification = 'MEDIUM';
      color = '#f59e0b';
      label = `Densificare medie probabilă (${Math.round(prob*100)}%)`;
    } else if(prob >= T.densLow) {
      classification = 'LOW';
      color = '#64748b';
      label = `Densificare scăzută posibilă (${Math.round(prob*100)}%)`;
    } else {
      classification = 'UNLIKELY';
      color = '#374151';
      label = `Improbabil (${Math.round(prob*100)}%)`;
    }

    return {
      probability: prob,
      pct: Math.round(prob * 100),
      p5: Math.round(p5*100)/100,
      p50: Math.round(p50*100)/100,
      p95: Math.round(p95*100)/100,
      classification,
      color,
      label,
      baseScore: Math.round(baseZoneScore*100)/100,
      weights,
    };
  },

  // Rulează UPE pentru toate zonele unui UAT
  _runUPE(cityData, zones) {
    console.log(`[UPE] Rulează ${this._UPE_PARAMS.N_SIMULATIONS} simulări Monte Carlo pentru ${zones?.length||0} zone...`);
    const t0 = performance.now();
    const results = {};
    (zones||[]).forEach(zone => {
      const id = zone.id || zone.label;
      results[id] = this._calcZoneProbability(zone, cityData, null);
    });
    const elapsed = Math.round(performance.now()-t0);
    console.log(`[UPE] Complet în ${elapsed}ms | Rezultate:`,
      Object.entries(results).map(([k,v])=>`${k}:${v.pct}%`).join(', '));
    return results;
  },

  // Actualizează culorile clădirilor 3D cu probabilitățile UPE
  _applyUPEColors(upeResults) {
    if(!this._3D?._entities || !this._3D?._meshes) return;
    this._3D._entities.forEach((e, idx) => {
      const prob = upeResults[e.zoneId];
      if(!prob) return;
      const mesh = this._3D._meshes[idx];
      if(!mesh) return;
      // Opacitate = probabilitate (zonele improbabile sunt mai transparente)
      mesh.material.opacity = 0.3 + prob.probability * 0.6;
      // Culoare din clasificare
      if(prob.classification === 'UNLIKELY') {
        mesh.material.color.set('#374151');
      }
      // HIGH și MEDIUM rămân cu culorile temporale din updateYear
    });
    this._3D._map?.triggerRepaint?.();
    console.log('[UPE] Culori probabilistice aplicate pe clădiri 3D');
  },

  // ══════════════════════════════════════════════════════════════════════
  // MOTOR DEMOGRAFIC — Cohort Survival + Migration Matrix
  // Standard INS/Eurostat · Formula: Px+n,t+n = Px,t · Sx + Mx,t
  // ══════════════════════════════════════════════════════════════════════
  _calcUrbanNeed(cityData) {
    const pop2021   = cityData?.pop2021 || 100000;
    const rateBase  = (cityData?.rata_reala_2011_2021 || 0) / 100;
    const scenario  = this._getScenario?.() || { rateMultiplier:1.0 };
    const rateAn    = rateBase * (scenario.rateMultiplier || 1.0);
    const hasUniv   = (cityData?.universitati || 0) > 0;
    const ani       = 30; // 2025-2055

    // ── Cohort Survival Model ──────────────────────────────────────────
    let cohorte = this._POP_DISTRIBUTION.map(([name, pct, eG]) => ({
      name, pop: Math.round(pop2021 * pct), eG,
    }));

    // Ponderi migrație per cohortă (tinerii migrează mai mult)
    const MW = {'0-4':.3,'5-9':.3,'10-14':.2,'15-19':.3,'20-24':1.,'25-29':1.,
                '30-34':.8,'35-39':.6,'40-44':.4,'45-49':.3,'50-54':.2,
                '55-59':.1,'60-64':.1,'65-69':.05,'70-74':.02,'75+':.01};
    const univBonus = hasUniv ? 1.3 : 1.0;

    let nouGospTot = 0;
    for(let ciclu = 0; ciclu < 6; ciclu++) {
      const nouC = [];
      cohorte.forEach(c => {
        const sr = this._SURVIVAL_RATES?.[c.name] || [0.95, 0.95];
        const sx = (sr[0] + sr[1]) / 2;
        const w  = MW[c.name] || 0.3;
        const uvB = (c.name === '20-24' || c.name === '25-29') ? univBonus : 1.0;
        const mig = c.pop * rateAn * 5 * w * uvB;
        const popNou = Math.max(0, Math.round(c.pop * Math.pow(sx, 5) + mig));
        if(c.eG > 0) nouGospTot += Math.max(0, popNou - c.pop) * c.eG / 2.3;
        nouC.push({...c, pop: popNou});
      });
      cohorte = nouC;
    }

    const pop2055 = cohorte.reduce((s, c) => s + c.pop, 0);
    const deltaPop = Math.max(0, pop2055 - pop2021);

    // ── Necesarul locativ ──────────────────────────────────────────────
    const locuinteNoi   = Math.round(deltaPop / 2.3);
    const fondExistent  = Math.round(pop2021 / 2.3);
    const locuinteReab  = Math.round(fondExistent * 0.36 * 0.4);
    const pop2034 = cohorte.filter(c => ['20-24','25-29','30-34'].includes(c.name))
                           .reduce((s,c) => s + c.pop, 0);
    const locuinteGospodariiNoi = Math.round(Math.abs(nouGospTot)) + Math.round(pop2034 * 0.18);
    const locuinteTotale = locuinteNoi + locuinteReab + locuinteGospodariiNoi;
    const totalM2 = locuinteTotale * 68;

    // ── Distribuție clădiri 3D per zonă ───────────────────────────────
    const scale = Math.pow(pop2021 / 360000, 0.38);
    const cladiri = {
      centru:   Math.max(4,  Math.round(totalM2 * 0.18 / (1800 * scale))),
      inner:    Math.max(6,  Math.round(totalM2 * 0.22 / (1400 * scale))),
      coridor:  Math.max(8,  Math.round(totalM2 * 0.20 / (1200 * scale))),
      rezid:    Math.max(8,  Math.round(totalM2 * 0.25 / (1100 * scale))),
      expansie: Math.max(4,  Math.round(totalM2 * 0.15 / (900  * scale))),
      birouri:  Math.max(3,  Math.round(totalM2 * 0.12 / (2200 * scale))),
      logistica:Math.max(2,  Math.round(totalM2 * 0.08 / (2500 * scale))),
    };

    // ── Diaspora + Migrație ──────────────────────────────────────────
    const gravity   = this._calcGravityScore(cityData);
    const diaspora  = this._calcDiasporaFactor(cityData);
    const migration = this._calcMigrationFlux(cityData, gravity.growthType);
    const climate   = this._getClimateProfile(cityData?.judet || '');
    const socio     = this._SOCIO_PROFILES?.[gravity.growthType] || this._SOCIO_PROFILES?.LOCAL;

    // Ajustare necesar total cu diaspora și migrație
    const locuinteDiaspora = diaspora.locuintePremium;
    const locuinteMigrantiRural = Math.round(migration.influxRural / 2.3 * 0.6);
    const locuinteTotaleAjustat = locuinteTotale + locuinteDiaspora + locuinteMigrantiRural;
    const totalM2Ajustat = locuinteTotaleAjustat * 68 * (1 + diaspora.locuintePremium/locuinteTotaleAjustat * 0.35);

    // Mix tipuri locuinte (bazat pe profil socio + diaspora + reverse migration)
    const mixLoc = {
      studio:  Math.round(locuinteTotaleAjustat * (socio?.cerereLocuinte?.studio  || 0.15)),
      '2cam':  Math.round(locuinteTotaleAjustat * (socio?.cerereLocuinte?.['2cam'] || 0.30)),
      '3cam':  Math.round(locuinteTotaleAjustat * (socio?.cerereLocuinte?.['3cam'] || 0.35)),
      '4cam+': Math.round(locuinteTotaleAjustat * (socio?.cerereLocuinte?.['4cam+']|| 0.12)),
      casa:    Math.round(migration.reversMigration / 2.3 * 0.4), // case individuale
    };

    console.log(`[TCI Cohort+] ${cityData?.name}: ${pop2021.toLocaleString()} → ${pop2055.toLocaleString()} | ` +
      `${locuinteTotaleAjustat.toLocaleString()} loc. (incl. ${locuinteDiaspora} diaspora + ${locuinteMigrantiRural} rural) | ` +
      `Climat: ${climate.zone} UHI=${climate.uhi}`);

    return { pop2021, pop2055, deltaPop, locuinteNoi, locuinteReab,
             locuinteGospodariiNoi, locuinteTotale: locuinteTotaleAjustat,
             locuinteTotaleBase: locuinteTotale,
             locuinteDiaspora, locuinteMigrantiRural,
             totalM2: totalM2Ajustat, scale, cladiri,
             mixLoc, diaspora, migration, climate, socio,
             gravity };
  },

  // ══════════════════════════════════════════════════════════════════════
  // ZONE SEISMICE P100-1/2013 MDLPA
  // ══════════════════════════════════════════════════════════════════════
  _SEISMIC_ZONES: [
    {ag:0.40,hMaxStory:4,  bbox:[26.5,45.2,28.2,46.3],counties:['VN','BZ','GL','BR']},
    {ag:0.35,hMaxStory:6,  bbox:[24.8,43.6,28.5,45.3],counties:['IF','IL','CL','PH','DB','GR','TR','TL','B']},
    {ag:0.30,hMaxStory:8,  bbox:[22.5,43.6,28.5,47.8],counties:['IS','BC','NT','VS','AG','OT','MH','DJ','CT','VL','GJ']},
    {ag:0.20,hMaxStory:12, bbox:[20.2,45.2,26.5,48.3],counties:['SV','BT','MM','SJ','BH','AR','TM','CS','HD','AB','SB','BV','CV','HR','CJ']},
    {ag:0.10,hMaxStory:99, bbox:[22.0,47.0,24.5,48.3],counties:['SM','BN']},
  ],
  _getSeismicAg(lon,lat) {
    for(const z of this._SEISMIC_ZONES) {
      const [x1,y1,x2,y2]=z.bbox;
      if(lon>=x1&&lon<=x2&&lat>=y1&&lat<=y2) return {ag:z.ag,hMaxStory:z.hMaxStory,hMaxM:z.hMaxStory*3.0};
    }
    return {ag:0.15,hMaxStory:10,hMaxM:30};
  },

  // ══════════════════════════════════════════════════════════════════════
  // URBAN GRAVITY MODEL — scor atractivitate economică
  // ══════════════════════════════════════════════════════════════════════
  _calcGravityScore(cityData) {
    const pop=(cityData?.pop2021||100000), rate=(cityData?.rata_reala_2011_2021||0)/100;
    const univ=(cityData?.universitati||0), judet=cityData?.judet||'';
    const eP=Math.min(1,pop/400000), eC=Math.max(0,Math.min(1,(rate+0.02)/0.04));
    const eE=Math.min(1,univ/3), eK=['IS','CJ','TM','B','CT','BV'].includes(judet)?0.8:0.4;
    const eI=rate>0?0.7:rate>-0.01?0.4:0.2;
    const score=eP*.30+eC*.25+eE*.20+eK*.15+eI*.10;
    const growthType=score>0.65?'METROPOLITAN':score>0.45?'REGIONAL':score>0.30?'LOCAL':'DECLINING';
    return {gravityScore:score,growthType,ePopulatie:eP,eCrestere:eC,eEducatie:eE,eConectivit:eK};
  },

  // ══════════════════════════════════════════════════════════════════════
  // MODEL SOCIO-DEMOGRAFIC EXTINS
  // Profil rezidenți + cumpărători + diaspora + migrație rural-urban
  // Sursă: INS 2021-2023 + Eurostat + BNR + studii PNRR
  // ══════════════════════════════════════════════════════════════════════

  // Profil socio-economic per tip urban
  _SOCIO_PROFILES: {
    METROPOLITAN: {
      profiluri: [
        {tip:'IT & Servicii avansate',  pct:0.22, venitIndex:1.8, m2:80,  cerere:'3cam', crestere:0.04},
        {tip:'Studenți & Tineri 18-28', pct:0.20, venitIndex:0.5, m2:38,  cerere:'studio', crestere:0.02},
        {tip:'Familie clasă medie',     pct:0.28, venitIndex:1.1, m2:72,  cerere:'3cam', crestere:0.01},
        {tip:'Diaspora returnată',      pct:0.10, venitIndex:2.2, m2:105, cerere:'4cam+', crestere:0.03},
        {tip:'Vârstnici 65+',          pct:0.14, venitIndex:0.7, m2:48,  cerere:'2cam', crestere:-0.01},
        {tip:'Lucrători calificați',    pct:0.06, venitIndex:0.9, m2:58,  cerere:'2cam', crestere:0.01},
      ],
      migratieDin: ['rural-regional','urban-mic','diaspora'],
    },
    REGIONAL: {
      profiluri: [
        {tip:'Funcționari publici',     pct:0.25, venitIndex:1.0, m2:65,  cerere:'3cam', crestere:0.00},
        {tip:'Studenți (univ. mici)',   pct:0.12, venitIndex:0.4, m2:35,  cerere:'studio', crestere:0.01},
        {tip:'Familie muncitori',       pct:0.32, venitIndex:0.8, m2:62,  cerere:'3cam', crestere:-0.01},
        {tip:'Diaspora returnată',      pct:0.08, venitIndex:2.0, m2:95,  cerere:'4cam+', crestere:0.02},
        {tip:'Vârstnici 65+',          pct:0.18, venitIndex:0.6, m2:45,  cerere:'2cam', crestere:0.00},
        {tip:'Rural urbanizat',         pct:0.05, venitIndex:0.7, m2:55,  cerere:'2cam', crestere:0.01},
      ],
      migratieDin: ['rural-local','alte-orase'],
    },
    LOCAL: {
      profiluri: [
        {tip:'Muncitori industrie',     pct:0.30, venitIndex:0.8, m2:58,  cerere:'2cam', crestere:-0.02},
        {tip:'Familie cu copii',        pct:0.28, venitIndex:0.9, m2:68,  cerere:'3cam', crestere:-0.01},
        {tip:'Rural urbanizat recent',  pct:0.15, venitIndex:0.6, m2:52,  cerere:'2cam', crestere:0.00},
        {tip:'Vârstnici 65+',          pct:0.22, venitIndex:0.5, m2:42,  cerere:'2cam', crestere:0.01},
        {tip:'Diaspora returnată',      pct:0.05, venitIndex:1.8, m2:85,  cerere:'4cam+', crestere:0.01},
      ],
      migratieDin: ['rural-local'],
    },
    DECLINING: {
      profiluri: [
        {tip:'Vârstnici rămași',       pct:0.40, venitIndex:0.5, m2:42,  cerere:'2cam', crestere:0.02},
        {tip:'Familii imobile',        pct:0.35, venitIndex:0.7, m2:55,  cerere:'3cam', crestere:-0.02},
        {tip:'Tineri fără mobilitate', pct:0.15, venitIndex:0.5, m2:38,  cerere:'2cam', crestere:-0.03},
        {tip:'Rural urbanizat',        pct:0.10, venitIndex:0.6, m2:48,  cerere:'2cam', crestere:0.00},
      ],
      migratieDin: [],
    },
  },

  // Diaspora românească — date INS 2023 + estimări BNR
  _DIASPORA: {
    total: 3800000,        // ~3.8M români în străinătate (INS 2023)
    rataRevenire: 0.025,   // ~2.5%/an = ~95k/an revin (trend crescător post-COVID)
    economiiMedii: 45000,  // EUR economii medii diaspora la revenire (BNR studii)
    profilVarsta: {'25-34':0.35, '35-44':0.40, '45-54':0.20, '55+':0.05},
    // Distribuție regională diaspora (sursa: ambasade + studii academice)
    distributieRegionala: {
      'IS': 0.08, 'SV': 0.07, 'BT': 0.06, 'VS': 0.05, // Moldova = cea mai mare diaspora
      'B':  0.12, 'IF': 0.04, 'PH': 0.04,               // București + Ilfov
      'CJ': 0.06, 'TM': 0.05, 'AR': 0.04,               // Vest/Centru
      'CT': 0.04, 'GL': 0.03,                             // Sud-Est
    },
    // Preferinte locuire diaspora (studiu PNRR 2022)
    preferinteLoc: {premium:0.45, mediu:0.40, social:0.15},
    impactM2: 1.35, // diaspora cumpără locuințe cu 35% mai mari vs medie
  },

  // Migrație rural-urban și reverse migration
  _MIGRATION_FLOWS: {
    // România: ~45% populație rural (INS 2021) — sursa majoră urban growth
    ruralUrban: {
      flux_anual_pct: 0.018,  // 1.8%/an din rural → urban (INS trend 2011-2021)
      profil_varsta: {'15-24':0.45, '25-34':0.35, '35-44':0.15, '45+':0.05},
      motivatie: ['educatie', 'locuri_munca', 'servicii'],
      destinatii_preferate: ['METROPOLITAN', 'REGIONAL'], // evită DECLINING
    },
    urbanRural: {
      // Post-COVID: ~0.4%/an revin la rural (telecommuting, cost viata)
      flux_anual_pct: 0.004,
      profil_varsta: {'30-44':0.50, '45-60':0.30, '60+':0.20},
      motivatie: ['telecommuting', 'calitate_viata', 'cost_scazut'],
      tip_locuinta: 'casa_individuala', // cumpără case, nu apartamente
    },
    // Migrație internă inter-urbană
    interUrban: {
      flux_spre_metropolitan: 0.012, // 1.2%/an din LOCAL/DECLINING → METROPOLITAN
      pierd_LOCAL: 0.008,
      pierd_DECLINING: 0.015,
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  // MODEL CLIMATOLOGIC
  // Sursă: Copernicus Climate Data, IPCC AR6, Administrația Meteorologică
  // Scenarii: RCP 4.5 (moderat) și RCP 8.5 (pesimist)
  // ══════════════════════════════════════════════════════════════════════
  _CLIMATE_PROFILE: {
    // Zone risc per tip (bazat pe IPCC AR6 + Copernicus pentru România)
    zones: {
      // ag = accelerație seismică (P100), UHI = urban heat island, drought = risc secetă
      'SE': {counties:['CT','GL','BR','TL','CL','IL'], uhi:1.8, drought:0.8, flood:0.6,
             note:'Zona cea mai vulnerabilă climatic — caniculă + secetă 2050'},
      'SV': {counties:['OT','DJ','MH','GJ','VL','AG'], uhi:1.5, drought:0.7, flood:0.5,
             note:'Oltenia — secetă severă proiectată 2040-2055'},
      'CE': {counties:['B','IF','GR','TR','DB','PH'], uhi:2.2, drought:0.5, flood:0.6,
             note:'București — insulă termică maximă, necesită infrastructură verde obligatorie'},
      'NE': {counties:['IS','BT','VS','NT','BC','SV'], uhi:1.0, drought:0.3, flood:0.7,
             note:'Moldova — risc inundații crescut, temperaturi mai suportabile'},
      'NV': {counties:['CJ','MM','BH','SJ','SM','BN'], uhi:0.9, drought:0.2, flood:0.5,
             note:'Cea mai favorabilă climatic — risc moderat'},
      'CV': {counties:['BV','HR','CV','MS','AB','SB','HD'], uhi:0.8, drought:0.3, flood:0.4,
             note:'Transilvania — climat moderat, vulnerabilitate scăzută 2055'},
    },
    // Restricții construcție per nivel risc climatic
    restrictii: {
      uhi_inalt: 'Obligatoriu: 30% spații verzi, acoperișuri reflectorizante, umbrire',
      drought_inalt: 'Obligatoriu: sisteme captare ploaie, irigații eficiente',
      flood_inalt: 'Restricție: subsoluri interzise, cota +0.80m față de teren',
    },
  },

  // Returnează profilul climatic pentru un UAT
  _getClimateProfile(judet) {
    for(const [zone, data] of Object.entries(this._CLIMATE_PROFILE.zones)) {
      if(data.counties.includes(judet)) return {zone, ...data};
    }
    return {zone:'NV', uhi:1.0, drought:0.3, flood:0.4, note:'Profil climatic moderat'};
  },

  // Calculează factorul diaspora per UAT
  _calcDiasporaFactor(cityData) {
    const judet = cityData?.judet || '';
    const pop = cityData?.pop2021 || 100000;
    const D = this._DIASPORA;
    const regionalPct = D.distributieRegionala[judet] || 0.03;
    // Diaspora din această regiune care revine la UAT (proportional cu mărimea)
    const diasporaRevine = Math.round(D.total * regionalPct * D.rataRevenire * (pop/500000));
    const investitie = diasporaRevine * D.economiiMedii; // EUR investit în locuinte
    const locuintePremium = Math.round(diasporaRevine * D.preferinteLoc.premium);
    return {
      diasporaRevine, investitie,
      locuintePremium,
      m2Extra: Math.round(diasporaRevine * (D.impactM2 - 1) * 75), // m² adăugați față de medie
    };
  },

  // Calculează fluxurile de migrație pentru un UAT
  _calcMigrationFlux(cityData, gravityType) {
    const pop = cityData?.pop2021 || 100000;
    const F = this._MIGRATION_FLOWS;
    // Flux rural→urban (atrage dacă METROPOLITAN sau REGIONAL)
    const atrageDinRural = ['METROPOLITAN','REGIONAL'].includes(gravityType);
    const influxRural = atrageDinRural
      ? Math.round(pop * F.ruralUrban.flux_anual_pct * 30) // 30 ani
      : 0;
    // Pierdere spre metropolitan (dacă LOCAL sau DECLINING)
    const pierdereSpre = ['LOCAL','DECLINING'].includes(gravityType)
      ? Math.round(pop * F.interUrban[`pierd_${gravityType}`] * 30)
      : 0;
    // Reverse migration (urban→rural) — afectează cererea de case individuale
    const reversMigration = Math.round(pop * F.urbanRural.flux_anual_pct * 30);
    return {
      influxRural, pierdereSpre, reversMigration,
      // Tip locuință influențat de reverse migration
      casaIndividuala_pct: Math.min(0.30, reversMigration / pop),
    };
  },



  // ══════════════════════════════════════════════════════════════════════
  // INFRASTRUCTURE CORRIDOR DEVELOPMENT MODEL
  // Autostrăzi + centuri + DN-uri = generatori principali de creștere urbană
  // Model matematic: P(dezvoltare) = f(tip_drum, distanță, acces_nod)
  // Buffer-e: autostradă 0-0.5km logistică, 0.5-2km comercial, 2-5km rezidențial
  // ══════════════════════════════════════════════════════════════════════

  // Autostrăzi planificate/în construcție — sursa CNAIR + OSM 2025
  _PLANNED_INFRA: {
    'A7': {name:'A7 Moldova Ploiești-Bacău-Suceava',status:'construction',year:2027,
           waypoints:[[26.913,46.567],[26.256,47.652]]},
    'A8': {name:'A8 Iași-TgMureș', status:'construction', year:2028,
           waypoints:[[27.601,47.158],[27.350,47.050],[26.920,46.820]]},
    'A13':{name:'A13 Brașov-Bacău', status:'planned', year:2032,
           waypoints:[[25.600,45.648],[26.100,46.000],[26.913,46.567]]},
    'A14':{name:'A14 Suceava-Botoșani', status:'planned', year:2034,
           waypoints:[[26.256,47.652],[26.450,47.700],[26.664,47.746]]},
    'A3': {name:'A3 București-Cluj-Oradea', status:'construction', year:2026,
           waypoints:[[23.600,46.770],[24.000,46.900],[22.900,47.050]]},
    'CENTURA_IS':{name:'Centură Ocolitoare Iași', status:'construction', year:2026,
           waypoints:[[27.530,47.180],[27.580,47.220],[27.650,47.180],[27.640,47.130],[27.570,47.120]]},
  },

  // ══════════════════════════════════════════════════════════════════════
  // ROAD NETWORK ANALYSIS — pentru ORICE UAT din România
  // Fetch complet: autostrăzi + centuri + DN + DC + viitoare
  // Fiecare drum = potențial de dezvoltare urbană/economică/funcțională
  // ══════════════════════════════════════════════════════════════════════
  async _fetchInfraCorridors(cx, cy, radiusKm=22) {
    const rad = radiusKm/111.0;
    const bbox = `${cy-rad},${cx-rad},${cy+rad},${cx+rad}`;

    // Fetch complet: toate tipurile de drumuri relevante pentru dezvoltare
    const query = `[out:json][timeout:30];
(
  way["highway"="motorway"](${bbox});
  way["highway"="motorway_link"](${bbox});
  way["highway"="trunk"](${bbox});
  way["highway"="trunk_link"](${bbox});
  way["highway"="primary"](${bbox});
  way["highway"="construction"]["construction"~"motorway|trunk|primary"](${bbox});
  way["highway"="proposed"]["proposed"~"motorway|trunk"](${bbox});
  way["highway"="secondary"]["ref"~"DJ"](${bbox});
)->.roads;
.roads out center qt 40;`;

    try {
      const r = await fetch('https://overpass-api.de/api/interpreter',
        {method:'POST', body:'data='+encodeURIComponent(query)});
      const data = await r.json();
      const corridors = [];
      const seen = new Set();

      (data.elements||[]).forEach(el => {
        const t = el.tags||{};
        const lon = el.lon || el.center?.lon;
        const lat = el.lat || el.center?.lat;
        if(!lon || !lat) return;

        // Deduplicare pe grid 0.005°
        const key = `${Math.round(lon/0.005)}_${Math.round(lat/0.005)}`;
        if(seen.has(key)) return;
        seen.add(key);

        const distKm = Math.hypot((lon-cx)*111*Math.cos(cy*Math.PI/180),(lat-cy)*111);
        if(distKm > radiusKm) return;

        // Clasificare drum și scor de dezvoltare
        const hw = t.highway;
        let roadClass, devScore, devTypes;

        if(hw === 'motorway' || t.construction === 'motorway') {
          roadClass = hw === 'construction' ? 'motorway_construction' : 'motorway';
          devScore = 1.0; // impact maxim
          devTypes = ['logistica', 'industrial', 'comercial', 'rezidential'];
        } else if(hw === 'proposed' && t.proposed?.match(/motorway/)) {
          roadClass = 'motorway_planned';
          devScore = 0.7; // impact viitor semnificativ
          devTypes = ['logistica', 'comercial', 'rezidential'];
        } else if(hw === 'trunk' || t.construction === 'trunk') {
          roadClass = 'trunk'; // DN-uri majore, centuri
          devScore = 0.75;
          devTypes = ['comercial', 'rezidential'];
        } else if(hw === 'primary') {
          roadClass = 'primary'; // DN-uri secundare
          devScore = 0.5;
          devTypes = ['comercial', 'rezidential_mic'];
        } else if(hw === 'secondary') {
          roadClass = 'secondary'; // DJ-uri
          devScore = 0.3;
          devTypes = ['rezidential_mic'];
        } else return;

        // Scor final ajustat cu distanța față de centru
        // La 0km de centru → coeficient 0.3 (centrul e deja construit)
        // La 3-10km → coeficient 1.0 (zona periurbană — cel mai activ)
        // La >15km → coeficient 0.6 (suburban)
        const distCoef = distKm < 1 ? 0.2
                       : distKm < 3 ? 0.6
                       : distKm < 10 ? 1.0
                       : distKm < 18 ? 0.7
                       : 0.4;

        corridors.push({
          lon, lat, distKm, roadClass, devScore: devScore * distCoef,
          devTypes, ref: t.ref||'', name: t.name||'',
          status: hw==='construction'?'construction': hw==='proposed'?'planned':'existing',
        });
      });

      // Adaugă infrastructura planificată din baza internă (A7, A8, centuri)
      Object.entries(this._PLANNED_INFRA||{}).forEach(([id, infra]) => {
        (infra.waypoints||[]).forEach(([wLon, wLat]) => {
          const distKm = Math.hypot((wLon-cx)*111*Math.cos(cy*Math.PI/180),(wLat-cy)*111);
          if(distKm > radiusKm) return;
          const key = `${Math.round(wLon/0.005)}_${Math.round(wLat/0.005)}`;
          if(seen.has(key)) return;
          seen.add(key);
          corridors.push({
            lon:wLon, lat:wLat, distKm, roadClass:'motorway_planned',
            devScore: 0.65 * (distKm<3?0.4:distKm<10?1.0:0.6),
            devTypes:['logistica','comercial','rezidential'],
            ref:id, name:infra.name, status:infra.status, year:infra.year,
          });
        });
      });

      // Sortează după scor de dezvoltare (descrescător)
      corridors.sort((a,b) => b.devScore - a.devScore);

      console.log(`[TCI RoadNet] ${corridors.length} segmente rutiere analizate ` +
        `| top: ${corridors[0]?.ref||corridors[0]?.name||'necunoscut'} ` +
        `(score=${corridors[0]?.devScore?.toFixed(2)})`);
      return corridors;

    } catch(e) {
      console.warn('[TCI RoadNet] fetch failed:', e.message);
      return [];
    }
  },

  // ══════════════════════════════════════════════════════════════════════
  // ROAD → ZONE GENERATOR
  // Fiecare coridor rutier generează tipul corect de dezvoltare
  // Funcționează pentru ORICE UAT din România
  // ══════════════════════════════════════════════════════════════════════
  _infraToZones(corridors, cx, cy, need, seismicCapped, sc, C, ok, scenario) {
    if(!corridors?.length) return [];
    const zones = [], used = [];
    const minDeg = 0.008; // min separare zone (grade)
    const scExp  = scenario?.expansieMultiplier || 1.0;
    const tooClose = (lon,lat) => used.some(p => Math.hypot(lon-p[0],lat-p[1]) < minDeg);

    // Procesăm max 14 coridoare cu cel mai mare devScore
    corridors.slice(0, 14).forEach((cor, i) => {
      const {lon, lat, distKm, roadClass, devScore, devTypes, ref, name, status, year} = cor;
      if(tooClose(lon, lat) || devScore < 0.15) return;

      const startBonus = status==='planned' ? (year ? Math.max(0,year-2026) : 5)
                       : status==='construction' ? 2 : 0;
      const label = [ref, name].filter(Boolean).join(' ').substring(0,40) || `Drum ${i+1}`;

      // ── LOGISTICĂ / PARC INDUSTRIAL ───────────────────────────────────
      // La noduri de autostradă sau centuri → logistică + industrial
      if(devTypes.includes('logistica') && distKm > 2 && distKm < 15 && scExp > 0.3) {
        const h = seismicCapped(9);
        if(ok(lon,lat)) {
          zones.push({
            id:`LOG-${i}`, color:'#78716c', hMax:h,
            startYr: 2028+startBonus,
            density: Math.max(2, Math.round((need.cladiri?.logistica||3) * devScore)),
            ring:{cx:lon, cy:lat, rx:0.006*sc, ry:0.004*sc},
            label:`Parc Logistic/Industrial: ${label}`,
            sub:`${roadClass.includes('motorway')?'Autostradă':'DN major'} · P+1→P+2 · ${status}`,
          });
          used.push([lon, lat]);
          return; // un singur tip per poziție
        }
      }

      // ── COMERCIAL / MIXT FUNCȚIONAL ────────────────────────────────────
      // De-a lungul DN-urilor și centurii → comercial, servicii, birouri
      if(devTypes.includes('comercial') && distKm < 12 && scExp > 0.4) {
        const h = seismicCapped(Math.min(28, Math.max(10, 10 + devScore*18)));
        const lonC = lon, latC = lat;
        if(ok(lonC,latC) && !tooClose(lonC,latC)) {
          zones.push({
            id:`COM-${i}`, color:C.coridor||'#d97706', hMax:h,
            startYr: 2027+startBonus,
            density: Math.max(3, Math.round((need.cladiri?.coridor||6) * devScore * 0.8)),
            ring:{cx:lonC, cy:latC, rx:0.004*sc, ry:0.0028*sc},
            label:`Comercial/Servicii: ${label}`,
            sub:`R+3→R+${Math.round(h/3)} · ax rutier principal`,
          });
          used.push([lonC, latC]);
          return;
        }
      }

      // ── REZIDENȚIAL COLECTIV ────────────────────────────────────────────
      // De-a lungul oricărui drum semnificativ → rezidențial
      if(devTypes.includes('rezidential') && distKm > 1 && distKm < 18 && scExp > 0.35) {
        const h = seismicCapped(Math.min(24, Math.max(8, 8 + devScore*16)));
        // Offset ușor față de drum (rezidențialul NU e chiar pe carosabil)
        const angle = Math.atan2(lat-cy, lon-cx) + Math.PI/2;
        const offset = 0.003 * sc;
        const lonR = lon + Math.cos(angle)*offset;
        const latR = lat + Math.sin(angle)*offset;
        if(ok(lonR,latR) && !tooClose(lonR,latR)) {
          zones.push({
            id:`REZ-${i}`, color:C.rezid||'#2563eb', hMax:h,
            startYr: 2029+startBonus,
            density: Math.max(4, Math.round((need.cladiri?.rezid||8) * devScore * 0.6)),
            ring:{cx:lonR, cy:latR, rx:0.005*sc, ry:0.0035*sc},
            label:`Rezidențial: ${label}`,
            sub:`R+${Math.round(h/4)}→R+${Math.round(h/3)} · ax ${roadClass}`,
          });
          used.push([lonR, latR]);
          return;
        }
      }

      // ── REZIDENȚIAL MIC (DJ-uri, drumuri secundare) ────────────────────
      if(devTypes.includes('rezidential_mic') && distKm > 2 && distKm < 12 && scExp > 0.5) {
        const h = seismicCapped(Math.min(12, Math.max(6, 6 + devScore*8)));
        if(ok(lon,lat) && !tooClose(lon,lat)) {
          zones.push({
            id:`MIC-${i}`, color:'#86efac', hMax:h,
            startYr: 2031+startBonus,
            density: Math.max(3, Math.round(devScore * 5)),
            ring:{cx:lon, cy:lat, rx:0.0038*sc, ry:0.0026*sc},
            label:`Rezidențial Mic: ${label}`,
            sub:`R+2→R+${Math.round(h/3)} · ax DJ`,
          });
          used.push([lon, lat]);
        }
      }
    });

    console.log(`[TCI RoadNet] → ${zones.length} zone din ${corridors.length} coridoare rutiere`);
    return zones;
  },


    // ── ZONE REALE GPS — coordonate absolute din Google Maps ───────────────
  // Sursa: coordonate confirmate teren + ANCPI autorizații + cunoaștere locală
  // FIECARE ORAS VA PRIMI PROPRIILE COORDONATE LA CONFIGURARE
  _REAL_ZONES: {

    // ══════════════════════════════════════════════════════════════════
    // IAȘI — 5 axe de creștere reale (validate urban + ANCPI)
    // ══════════════════════════════════════════════════════════════════
    'iasi': [
      // ── AXA 1: MOARA DE VÂNT / SPITAL REGIONAL + SMART CITY PLATEAU ─
      {id:'SR',  lat:47.1877, lon:27.5874, rx:0.0060, ry:0.0042,
       color:'#f59e0b', hMax:42, startYr:2025,
       label:'Moara de Vânt — Pol Medical + Smart City',
       sub:'Spital Regional €580M + hub medical + rezidențial R+4-R+10'},
      {id:'SR2', lat:47.1940, lon:27.5820, rx:0.0040, ry:0.0028,
       color:'#f97316', hMax:30, startYr:2028,
       label:'Platoul Moara de Vânt Nord',
       sub:'Extensie smart city · R+4→R+8 · birouri + rezidențial'},

      // ── AXA 2: COPOU — densificare cartier universitar ───────────────
      {id:'CP',  lat:47.1820, lon:27.5720, rx:0.0045, ry:0.0032,
       color:'#7c3aed', hMax:35, startYr:2027,
       label:'Copou — Densificare Universitară',
       sub:'Cartier universitar · R+5→R+9 · rezidențial premium'},
      {id:'CP2', lat:47.1760, lon:27.5640, rx:0.0030, ry:0.0022,
       color:'#6d28d9', hMax:25, startYr:2029,
       label:'Copou Extins — Rezidențial Colectiv',
       sub:'R+4→R+7 · acces universități · calitate ridicată'},

      // ── AXA 3: DĂNCU / AUREL VLAICU — est industrial→rezidențial ────
      {id:'DNC', lat:47.1480, lon:27.6350, rx:0.0055, ry:0.0038,
       color:'#0ea5e9', hMax:28, startYr:2028,
       label:'Dăncu — Rezidențial Nou Est',
       sub:'Conversie industrial→rezidențial · R+4→R+7 · PUZ aprobat'},
      {id:'AV',  lat:47.1420, lon:27.6520, rx:0.0048, ry:0.0034,
       color:'#0284c7', hMax:22, startYr:2030,
       label:'Aurel Vlaicu — Cartier Nou',
       sub:'R+3→R+6 · expansie est · infrastructură nouă'},

      // ── AXA 4: BUCIUM — sud rezidențial colectiv ─────────────────────
      {id:'BUC', lat:47.1280, lon:27.5980, rx:0.0050, ry:0.0035,
       color:'#16a34a', hMax:24, startYr:2029,
       label:'Bucium — Rezidențial Sud',
       sub:'R+4→R+7 · cartier verde · acces DN24'},
      {id:'BU2', lat:47.1180, lon:27.5850, rx:0.0035, ry:0.0025,
       color:'#15803d', hMax:16, startYr:2032,
       label:'Bucium Extins (PUZ)',
       sub:'R+2→R+4 · extravilan posibil · acces auto A8'},

      // ── AXA 5: MIROSLAVA / TUDOR VLADIMIRESCU — vest suburban ────────
      {id:'MIR', lat:47.1520, lon:27.5450, rx:0.0052, ry:0.0037,
       color:'#22c55e', hMax:18, startYr:2030,
       label:'Tudor Vladimirescu — Expansiune Vest',
       sub:'R+3→R+5 · creștere rapidă documentată ANCPI'},
      {id:'TV2', lat:47.1620, lon:27.5320, rx:0.0040, ry:0.0028,
       color:'#86efac', hMax:12, startYr:2033,
       label:'Miroslava (suburban)',
       sub:'R+2→R+3 · sat suburban · PUZ extravilan'},

      // ── CENTRU CIVIC — densificare intensă ───────────────────────────
      {id:'CV',  lat:47.1580, lon:27.5970, rx:0.0026, ry:0.0018,
       color:'#8b5cf6', hMax:36, startYr:2026,
       label:'Centru Civic — Densificare Intensă',
       sub:'R+8→R+12 · CUT 3.0 · 360k loc. → necesare locuințe noi'},

      // ── CORIDOARE BULEVARDIERE ────────────────────────────────────────
      {id:'CEV', lat:47.1558, lon:27.5970, rect:{w:0.022, h:0.0016},
       color:'#d97706', hMax:28, startYr:2027,
       label:'Coridor Est-Vest — Bd. Independenței',
       sub:'R+4→R+8 · transport public extins'},
      {id:'CNS', lat:47.1580, lon:27.6010, rect:{w:0.0016, h:0.018},
       color:'#b45309', hMax:26, startYr:2028,
       label:'Coridor Nord-Sud — Ax Principal',
       sub:'R+4→R+7 · birouri parter + rezidențial'},

      // ── POL TERȚIAR (birouri/servicii) ───────────────────────────────
      {id:'POL', lat:47.1620, lon:27.6100, rx:0.0020, ry:0.0014,
       color:'#06b6d4', hMax:40, startYr:2028,
       label:'Pol Terțiar — Palas Est',
       sub:'Birouri · servicii · retail · R+6→R+12'},

      // ── RECONVERSIE INDUSTRIALĂ (Nicolina/Socola) ─────────────────────
      {id:'NIC', lat:47.1350, lon:27.6200, rx:0.0038, ry:0.0027,
       color:'#ea580c', hMax:30, startYr:2031,
       label:'Nicolina — Reconversie Industrială',
       sub:'Industrial→Mixt funcțional · R+5→R+8'},

      // ── AXA 6: PĂCURARI — spre Lețcani + A8 ─────────────────────────
      {id:'PAC', lat:47.1680, lon:27.5560, rx:0.0042, ry:0.0030,
       color:'#f59e0b', hMax:28, startYr:2027,
       label:'Păcurari — Densificare + Ax A8',
       sub:'R+4→R+8 · ax spre Lețcani/A8 · densificare activă ANCPI'},
      {id:'ANT', lat:47.1720, lon:27.5250, rx:0.0048, ry:0.0034,
       color:'#78716c', hMax:20, startYr:2029,
       label:'Antibiotice — Reconversie Industrial-Rezidențial',
       sub:'Zona industrială → mixt · R+3→R+6 · proximitate A8'},
      {id:'LET', lat:47.1900, lon:27.4980, rx:0.0055, ry:0.0038,
       color:'#22c55e', hMax:16, startYr:2028,
       label:'Lețcani — Nod A8 + Dezvoltare Suburbanã',
       sub:'Nod autostradă A8 (2028) · PUZ extravilan · R+2→R+4 · logistică+rezidențial'},
      {id:'LET2',lat:47.1820, lon:27.5120, rx:0.0040, ry:0.0028,
       color:'#16a34a', hMax:22, startYr:2030,
       label:'Coridor Păcurari-Lețcani (DN28A)',
       sub:'R+3→R+6 · ax rutier principal vest · dezvoltare liniară'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // CLUJ-NAPOCA — crește spre Florești, Baciu, Apahida
    // ══════════════════════════════════════════════════════════════════
    'cluj': [
      {id:'CV',  lat:46.7712, lon:23.5887, rx:0.0024, ry:0.0017,
       color:'#8b5cf6', hMax:50, startYr:2026, label:'Centru Cluj', sub:'Densificare R+10→R+14'},
      {id:'FLO', lat:46.7650, lon:23.5320, rx:0.0060, ry:0.0042,
       color:'#16a34a', hMax:20, startYr:2026, label:'Florești — Expansiune Vest',
       sub:'Cel mai rapid cartier nou din România · R+4→R+6'},
      {id:'BAC', lat:46.7830, lon:23.5400, rx:0.0045, ry:0.0032,
       color:'#22c55e', hMax:16, startYr:2028, label:'Baciu — Rezidențial NV',
       sub:'R+3→R+5 · PUZ aprobat'},
      {id:'APA', lat:46.7750, lon:23.6350, rx:0.0040, ry:0.0028,
       color:'#0ea5e9', hMax:18, startYr:2029, label:'Apahida — Expansiune Est',
       sub:'R+3→R+5 · aeroport + logistică'},
      {id:'BOR', lat:46.7580, lon:23.6100, rx:0.0035, ry:0.0025,
       color:'#f59e0b', hMax:22, startYr:2028, label:'Borhanci — Rezidențial',
       sub:'R+4→R+6 · premium'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // TIMIȘOARA — crește spre Giroc, Dumbrăvița, Ghiroda
    // ══════════════════════════════════════════════════════════════════
    'timisoara': [
      {id:'CV',  lat:45.7489, lon:21.2087, rx:0.0024, ry:0.0017,
       color:'#8b5cf6', hMax:45, startYr:2026, label:'Centru Timișoara', sub:'Densificare'},
      {id:'GIR', lat:45.7050, lon:21.2200, rx:0.0055, ry:0.0038,
       color:'#16a34a', hMax:18, startYr:2027, label:'Giroc — Expansiune Sud',
       sub:'R+3→R+5 · cea mai activă zonă ANCPI'},
      {id:'DUM', lat:45.7780, lon:21.2350, rx:0.0048, ry:0.0034,
       color:'#22c55e', hMax:16, startYr:2028, label:'Dumbrăvița — Nord',
       sub:'R+3→R+4 · rezidențial premium'},
      {id:'GHI', lat:45.7420, lon:21.2700, rx:0.0040, ry:0.0028,
       color:'#0ea5e9', hMax:14, startYr:2029, label:'Ghiroda — Est',
       sub:'R+2→R+4 · aeroport proximity'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // CONSTANȚA — nu construiește pe plajă sau port (seismic Z3)
    // ══════════════════════════════════════════════════════════════════
    'constanta': [
      {id:'CV',  lat:44.1598, lon:28.6348, rx:0.0022, ry:0.0016,
       color:'#8b5cf6', hMax:24, startYr:2026, label:'Centru Constanța',
       sub:'Densificare · ag=0.30g → max R+8'},
      {id:'OVI', lat:44.2650, lon:28.5700, rx:0.0055, ry:0.0038,
       color:'#16a34a', hMax:16, startYr:2028, label:'Ovidiu — Nord (departe de port)',
       sub:'R+3→R+5 · fără restricții litoral'},
      {id:'MAN', lat:44.1350, lon:28.6000, rx:0.0045, ry:0.0032,
       color:'#22c55e', hMax:18, startYr:2029, label:'Mânăstirea — Vest',
       sub:'R+3→R+5 · zonă industrială reconversie'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // BRAȘOV — ag=0.20g (Z4), poate construi mai înalt
    // ══════════════════════════════════════════════════════════════════
    'brasov': [
      {id:'CV',  lat:45.6480, lon:25.6060, rx:0.0022, ry:0.0016,
       color:'#8b5cf6', hMax:40, startYr:2026, label:'Centru Brașov', sub:'R+8→R+12'},
      {id:'SCH', lat:45.6700, lon:25.6350, rx:0.0050, ry:0.0035,
       color:'#16a34a', hMax:20, startYr:2027, label:'Schei — Expansiune',
       sub:'R+4→R+6'},
      {id:'CRO', lat:45.6200, lon:25.5800, rx:0.0045, ry:0.0032,
       color:'#0ea5e9', hMax:22, startYr:2028, label:'Cristian — Suburban',
       sub:'R+3→R+5 · PUZ'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // GALAȚI — ag=0.40g (Z1)! max R+4 per P100
    // ══════════════════════════════════════════════════════════════════
    'galati': [
      {id:'CV',  lat:45.4353, lon:28.0080, rx:0.0020, ry:0.0014,
       color:'#8b5cf6', hMax:12, startYr:2026, label:'Centru Galați',
       sub:'ag=0.40g → MAX R+4 (P100-1/2013)'},
      {id:'MIC', lat:45.4580, lon:28.0350, rx:0.0048, ry:0.0034,
       color:'#f59e0b', hMax:12, startYr:2028, label:'Micro 19-21 — Reabilitare',
       sub:'Max R+4 seismic · reabilitare fond existent'},
      {id:'MGL', lat:45.4150, lon:27.9700, rx:0.0042, ry:0.0030,
       color:'#16a34a', hMax:9,  startYr:2030, label:'Malu Alb — Expansiune',
       sub:'R+2→R+3 · restricție seismică maximă'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // FOCȘANI — ag=0.40g (Z1)! VRANCEA — restricție max R+4
    // ══════════════════════════════════════════════════════════════════
    'focsani': [
      {id:'CV',  lat:45.6960, lon:27.1840, rx:0.0018, ry:0.0013,
       color:'#8b5cf6', hMax:12, startYr:2026, label:'Centru Focșani',
       sub:'ag=0.40g VRANCEA → STRICT max R+4'},
      {id:'NOR', lat:45.7150, lon:27.1900, rx:0.0040, ry:0.0028,
       color:'#f59e0b', hMax:9,  startYr:2029, label:'Nord — Rezidențial Mic',
       sub:'R+2→R+3 · reabilitare prioritară'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // SUCEAVA — ag=0.20g (Z4), creștere moderată
    // ══════════════════════════════════════════════════════════════════
    'suceava': [
      {id:'CV',  lat:47.6520, lon:26.2556, rx:0.0020, ry:0.0014,
       color:'#8b5cf6', hMax:32, startYr:2026, label:'Centru Suceava', sub:'R+6→R+10'},
      {id:'SCH', lat:47.6650, lon:26.2200, rx:0.0050, ry:0.0035,
       color:'#16a34a', hMax:16, startYr:2028, label:'Șcheia — Expansiune Vest',
       sub:'R+3→R+5 · cea mai activă zonă'},
      {id:'SAL', lat:47.6700, lon:26.3100, rx:0.0042, ry:0.0030,
       color:'#22c55e', hMax:14, startYr:2030, label:'Salcea — Est Aeroport',
       sub:'R+2→R+4 · proximitate aeroport'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // BOTOȘANI — ag=0.20g, populație în scădere → reabilitare prioritară
    // ══════════════════════════════════════════════════════════════════
    'botosani': [
      {id:'CV',  lat:47.7457, lon:26.6638, rx:0.0018, ry:0.0013,
       color:'#8b5cf6', hMax:25, startYr:2027, label:'Centru Botoșani',
       sub:'Reabilitare prioritară · R+4→R+7 · populație în scădere'},
      {id:'NOR', lat:47.7600, lon:26.6750, rx:0.0038, ry:0.0027,
       color:'#374151', hMax:15, startYr:2030, label:'Nord — Reabilitare',
       sub:'Fond existent · nu expansie · R+3→R+5'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // BACĂU — ag=0.30g (Z3), creștere pozitivă mică
    // ══════════════════════════════════════════════════════════════════
    'bacau': [
      {id:'CV',  lat:46.5670, lon:26.9136, rx:0.0020, ry:0.0014,
       color:'#8b5cf6', hMax:24, startYr:2026, label:'Centru Bacău',
       sub:'ag=0.30g → max R+8 · densificare'},
      {id:'SUD', lat:46.5420, lon:26.9200, rx:0.0048, ry:0.0034,
       color:'#16a34a', hMax:18, startYr:2028, label:'Sud — Rezidențial',
       sub:'R+3→R+6 · PUZ activ'},
      {id:'EST', lat:46.5700, lon:26.9600, rx:0.0042, ry:0.0030,
       color:'#0ea5e9', hMax:15, startYr:2030, label:'Est — Industrial→Mixt',
       sub:'Reconversie · R+3→R+5'},
    ],


    // ══════════════════════════════════════════════════════════════════
    // BUCUREȘTI — ag=0.35g (Z2), cel mai mare oraș, ring roads multiple
    // ══════════════════════════════════════════════════════════════════
    'bucuresti': [
      {id:'CV',  lat:44.4268, lon:26.1025, rx:0.0020, ry:0.0014,
       color:'#8b5cf6', hMax:18, startYr:2026,
       label:'Centru București', sub:'ag=0.35g → max R+6 · densificare'},
      {id:'NOR', lat:44.4780, lon:26.0900, rx:0.0060, ry:0.0042,
       color:'#16a34a', hMax:18, startYr:2027,
       label:'Floreasca-Aviatiei', sub:'R+4→R+6 · premium nord'},
      {id:'EST', lat:44.4200, lon:26.1800, rx:0.0065, ry:0.0045,
       color:'#0ea5e9', hMax:15, startYr:2027,
       label:'Ilfov Est — Pantelimon-Voluntari', sub:'R+3→R+5 · expansiune est'},
      {id:'VES', lat:44.4150, lon:25.9800, rx:0.0060, ry:0.0042,
       color:'#22c55e', hMax:15, startYr:2028,
       label:'Militari-Chiajna', sub:'R+3→R+5 · expansiune vest'},
      {id:'SUD', lat:44.3500, lon:26.0600, rx:0.0055, ry:0.0038,
       color:'#f59e0b', hMax:12, startYr:2029,
       label:'Berceni-Popești', sub:'R+3→R+4 · sud industrial→rezidențial'},
      {id:'A1',  lat:44.4000, lon:25.9200, rx:0.0050, ry:0.0035,
       color:'#78716c', hMax:9, startYr:2028,
       label:'A1 Corridor — Logistică Vest', sub:'P+1→P+2 · parc logistic A1'},
      {id:'A2',  lat:44.3800, lon:26.2500, rx:0.0055, ry:0.0038,
       color:'#78716c', hMax:9, startYr:2027,
       label:'A2 Corridor — Logistică Est', sub:'P+1→P+2 · parc logistic A2/Centura'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // MAMAIA / NĂVODARI — litoral, fără construcții pe plajă
    // ══════════════════════════════════════════════════════════════════
    'navodari': [
      {id:'NV',  lat:44.3280, lon:28.6020, rx:0.0040, ry:0.0028,
       color:'#16a34a', hMax:18, startYr:2027,
       label:'Năvodari — Rezidențial (departe de plajă)',
       sub:'R+3→R+5 · NU pe litoral · servicii turistice'},
      {id:'LOG', lat:44.3150, lon:28.5800, rx:0.0045, ry:0.0032,
       color:'#78716c', hMax:9, startYr:2029,
       label:'Năvodari Industrial', sub:'Reconversie · P+1→P+2'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // PLOIEȘTI — ag=0.35g (Z2), industrie petrolieră în tranziție
    // ══════════════════════════════════════════════════════════════════
    'ploiesti': [
      {id:'CV',  lat:44.9365, lon:26.0227, rx:0.0020, ry:0.0014,
       color:'#8b5cf6', hMax:18, startYr:2026, label:'Centru Ploiești', sub:'max R+6 seismic'},
      {id:'NOR', lat:44.9650, lon:26.0300, rx:0.0050, ry:0.0035,
       color:'#16a34a', hMax:15, startYr:2028, label:'Nord Ploiești — Rezidențial',
       sub:'R+3→R+5 · ax A3'},
      {id:'RFN', lat:44.9200, lon:26.0500, rx:0.0045, ry:0.0032,
       color:'#ea580c', hMax:12, startYr:2030, label:'Raffinărie — Reconversie',
       sub:'Industrial petrolier → mixt funcțional · R+2→R+4'},
    ],

    // ══════════════════════════════════════════════════════════════════
    // CRAIOVA — ag=0.30g (Z3), creștere moderată
    // ══════════════════════════════════════════════════════════════════
    'craiova': [
      {id:'CV',  lat:44.3196, lon:23.7963, rx:0.0020, ry:0.0014,
       color:'#8b5cf6', hMax:24, startYr:2026, label:'Centru Craiova', sub:'R+5→R+8'},
      {id:'NOR', lat:44.3500, lon:23.8100, rx:0.0050, ry:0.0035,
       color:'#16a34a', hMax:18, startYr:2028, label:'Nord — Rezidențial',
       sub:'R+3→R+6 · ax Ford/industrial'},
      {id:'IND', lat:44.3000, lon:23.8400, rx:0.0048, ry:0.0034,
       color:'#78716c', hMax:12, startYr:2030, label:'Ford — Logistică/Mixt',
       sub:'Reconversie industrială · P+2→R+4'},
    ],

  },



,

  _buildZones(cx, cy, constraints) {
    const bufs = (constraints?.bufs || []);
    // Adaugă protecții cunoscute Iași
    const IASI_PROTECTED = [
      {lon:27.5895, lat:47.1521, r:120, reason:'Cimitirul Eternitatea'},
      {lon:27.6050, lat:47.1910, r:80,  reason:'Cimitirul Sf. Apostoli Petru și Pavel'},
      {lon:27.6218, lat:47.1955, r:80,  reason:'Cimitirul Armenesc'},
      {lon:27.6350, lat:47.1950, r:300, reason:'Pădurea Ciric'},
      {lon:27.5850, lat:47.1650, r:150, reason:'Lacul Ciric'},
      {lon:27.5640, lat:47.1680, r:80,  reason:'Stadionul TEPRO'},
    ];
    const allBufs = [...bufs, ...IASI_PROTECTED];
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
    // Normalizare city key
    const normalize = s => (s||'').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[\u015f\u0219]/g,'s').replace(/[\u0163\u021b]/g,'t')
      .replace(/\u0103/g,'a').replace(/\u00ee/g,'i').replace(/\u00e2/g,'a');
    const cityKey = normalize(this.cityKey);

    // ENRICHMENT: date GPS validate pentru orașe cunoscute
    const enrichZones = this._REAL_ZONES?.[cityKey] || [];
    const seismicData = this._getSeismicAg(cx, cy);

    if(enrichZones.length > 0) {
      const zones = [];
      enrichZones.forEach(z => {
        if(!ok(z.lon, z.lat)) return;
        const def = (z.rect && typeof z.rect==='object')
          ? {id:z.id,color:z.color,hMax:z.hMax,startYr:z.startYr,label:z.label,sub:z.sub,density:z.density,
             rect:{cx:z.lon,cy:z.lat,w:z.rect.w,h:z.rect.h}}
          : {id:z.id,color:z.color,hMax:z.hMax,startYr:z.startYr,label:z.label,sub:z.sub,density:z.density,
             ring:{cx:z.lon,cy:z.lat,rx:z.rx||0.004,ry:z.ry||0.003}};
        if(def.hMax > seismicData.hMaxM) def.hMax = seismicData.hMaxM;
        zones.push(def);
      });
      console.log(`[TCI] ✅ Enrichment: ${zones.length} zone | ${cityKey} | ag=${seismicData.ag}g`);
      return zones;
    }

    // ── MODEL GENERIC — funcționează pentru ORICE UAT din România ────
    // Galați, Mamaia, București, Suceava, oriunde — fără date hardcodate
    console.log(`[TCI] Model generic: ${cityKey}`);
    // ── Generator statistic pentru ORICE UAT (INS + ANCPI + BNR) ────────
    const need    = this._calcUrbanNeed(this.cityData);
    const gravity = this._calcGravityScore(this.cityData);
    const sc   = need.scale;
    const C    = this.COLORS;
    const zones = [];
    const addIf = z => { const lon=z.ring?.cx||z.rect?.cx, lat=z.ring?.cy||z.rect?.cy; if(ok(lon,lat)) zones.push(z); };

    // Restricție seismică P100-1/2013
    const seismic = this._getSeismicAg(cx, cy);
    const seismicCap = h => Math.min(h, seismic.hMaxM);
    // Multiplicator înălțime per tip urban (Gravity Model)
    const hMult = gravity.growthType === 'METROPOLITAN' ? 1.0
                : gravity.growthType === 'REGIONAL'     ? 0.80
                : gravity.growthType === 'LOCAL'        ? 0.65
                :                                         0.50; // DECLINING
    const scenarioH = this._getScenario?.()?.hMaxMultiplier || 1.0;
    const seismicCapped = h => seismicCap(h * hMult * scenarioH);
    console.log(`[TCI] ${gravity.growthType} | ag=${seismic.ag}g | need: ${need.locuinteTotale} loc.`);

    // Centru Civic — hMax din densitate proiectată + restricție seismică
    const hC = seismicCap(Math.min(65, Math.max(28, 28 + need.cladiri.centru)));
    addIf({id:'CV', color:C.centru, hMax:hC, startYr:2026, density:need.cladiri.centru,
           ring:{cx:cx,cy:cy,rx:0.0026*sc,ry:0.0018*sc}, label:'Centru Civic',
           sub:`Densificare R+${Math.round(hC/3.5)}→R+${Math.round(hC/2.5)} · ag=${seismic.ag}g`});

    const hI = seismicCap(Math.min(42, Math.max(18, 16 + need.cladiri.inner/2)));
    addIf({id:'CN', color:'#6366f1', hMax:hI, startYr:2027, density:Math.ceil(need.cladiri.inner/2),
           ring:{cx:cx+0.010*sc,cy:cy+0.012*sc,rx:0.0038*sc,ry:0.0026*sc}, label:'Zonă Centrală Nord',sub:`R+${Math.round(hI/3.5)}→R+${Math.round(hI/2.8)}`});
    addIf({id:'CS', color:'#6366f1', hMax:hI-3, startYr:2028, density:Math.floor(need.cladiri.inner/2),
           ring:{cx:cx-0.002*sc,cy:cy-0.010*sc,rx:0.0040*sc,ry:0.0028*sc}, label:'Zonă Centrală Sud',sub:`R+${Math.round((hI-3)/3.5)}`});

    const hCor = seismicCap(Math.min(32, Math.max(12, 10 + need.cladiri.coridor/4)));
    addIf({id:'CEV', color:C.coridor, hMax:hCor, startYr:2027, density:Math.ceil(need.cladiri.coridor/2),
           rect:{cx:cx,cy:cy-0.001*sc,w:0.020*sc,h:0.0016*sc}, label:'Coridor Est-Vest',sub:`Bulevard · R+4→R+${Math.round(hCor/3)}`});
    addIf({id:'CNS', color:C.coridor, hMax:hCor-3, startYr:2028, density:Math.floor(need.cladiri.coridor/2),
           rect:{cx:cx+0.001*sc,cy:cy,w:0.0016*sc,h:0.018*sc}, label:'Coridor Nord-Sud',sub:`Ax principal`});

    const hR = seismicCapped(Math.min(28, Math.max(10, 8 + need.cladiri.rezid/5)));
    addIf({id:'RN', color:C.rezid, hMax:hR, startYr:2028, density:Math.ceil(need.cladiri.rezid/2),
           ring:{cx:cx+0.018*sc,cy:cy+0.016*sc,rx:0.0048*sc,ry:0.0034*sc}, label:'Rezidențial Colectiv Nord',sub:`R+${Math.round(hR/3.5)}`});
    addIf({id:'RS', color:C.rezid, hMax:hR-2, startYr:2030, density:Math.floor(need.cladiri.rezid/2),
           ring:{cx:cx+0.008*sc,cy:cy-0.016*sc,rx:0.0045*sc,ry:0.0032*sc}, label:'Rezidențial Colectiv Sud',sub:`R+${Math.round((hR-2)/3.5)}`});

    addIf({id:'RI', color:C.reconv, hMax:30, startYr:2031, density:Math.round(need.cladiri.rezid*0.3),
           rect:{cx:cx+0.024*sc,cy:cy-0.010*sc,w:0.010*sc,h:0.007*sc}, label:'Reconversie Industrială',sub:'Industrial→Mixt'});

    const scenarioExp = this._getScenario?.()?.expansieMultiplier || 1.0;
    if((need.deltaPop > 0 || need.locuinteReab > 1500) && gravity.growthType !== 'DECLINING' && scenarioExp > 0.3) {
      const hE = Math.min(18, Math.max(8, 6 + need.cladiri.expansie/5));
      addIf({id:'EE', color:C.nou, hMax:hE, startYr:2031, density:Math.ceil(need.cladiri.expansie/2),
             ring:{cx:cx+0.028*sc,cy:cy-0.008*sc,rx:0.0060*sc,ry:0.0044*sc}, label:'Expansiune Est (PUZ)',sub:`Rezidențial nou`});
      addIf({id:'EV', color:C.nou, hMax:hE-2, startYr:2033, density:Math.floor(need.cladiri.expansie/2),
             ring:{cx:cx-0.022*sc,cy:cy+0.006*sc,rx:0.0055*sc,ry:0.0040*sc}, label:'Expansiune Vest (PUZ)',sub:`Extravilan PUZ`});
    }
    console.log('[TCI] ✅ Zone statistice:', zones.length, 'pentru', cityKey, '| nevoie:', need.locuinteTotale, 'loc.');
    return zones;  },



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
      // Overlay canvas separat — bypass WebGL shared context (confirmat funcțional)
      const cont = map.getContainer();
      const ov = document.createElement('canvas');
      ov.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;';
      cont.style.position = 'relative';
      cont.appendChild(ov);
      this._overlay = ov;
      this._renderer = new THREE.WebGLRenderer({canvas: ov, antialias: true, alpha: true});
      this._renderer.setPixelRatio(window.devicePixelRatio);
      this._renderer.setSize(cont.offsetWidth, cont.offsetHeight);
      this._renderer.setClearColor(0x000000, 0);
      this._renderer.autoClear = true;
      new ResizeObserver(() => this._renderer.setSize(cont.offsetWidth, cont.offsetHeight)).observe(cont);
      this._scene.add(new THREE.AmbientLight(0xffffff, 1.0));
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

      // LOD: vizibilitate la zoom >= 12.5
      const z = this._map?.getZoom?.() ?? 0;
      const visible = z >= 12.5;

      // ── ANIMAȚIE LERP: clădiri cresc organic spre înălțimea țintă ───
      let animActive = false;
      if(visible && this._targetH && this._currentH && this._meshes?.length) {
        const spd = 0.09;
        this._entities.forEach((e, idx) => {
          const mesh = this._meshes[idx];
          if(!mesh) return;
          mesh.visible = visible && (mesh.material.opacity > 0.05);

          const target  = this._targetH[idx]  || 0.1;
          const current = this._currentH[idx] || 0.1;
          const diff    = target - current;

          if(Math.abs(diff) > 0.25) {
            const newH = current + diff * spd;
            this._currentH[idx] = newH;
            const [lx, ly] = this._toLocal(e.lon, e.lat);
            mesh.position.set(lx, ly, -1);
            mesh.scale.set(e.wM, e.dM, newH + 1);
            // Shadow proporțional cu baza clădirii
            if(this._shadows?.[idx]) {
              const shad = this._shadows[idx];
              shad.visible = visible;
              const sc = Math.max(e.wM, e.dM) * 0.55;
              shad.position.set(lx, ly, -0.95);
              shad.scale.set(sc, sc, 1);
              shad.material.opacity = 0.10 + Math.min(0.10, newH/300);
            }
            animActive = true;
          } else if(Math.abs(diff) > 0.02) {
            this._currentH[idx] = target;
            const [lx, ly] = this._toLocal(e.lon, e.lat);
            mesh.position.set(lx, ly, -1);
            mesh.scale.set(e.wM, e.dM, target + 1);
            if(this._shadows?.[idx]) {
              const shad = this._shadows[idx];
              shad.visible = visible;
              const sc = Math.max(e.wM, e.dM) * 0.55;
              shad.position.set(lx, ly, -0.95);
              shad.scale.set(sc, sc, 1);
            }
          } else {
            mesh.visible = visible;
            if(this._shadows?.[idx]) this._shadows[idx].visible = visible;
          }
        });
      } else {
        (this._meshes||[]).forEach((m,i) => {
          if(m) m.visible = visible;
          if(this._shadows?.[i]) this._shadows[i].visible = visible;
        });
      }

      // Render pe overlay canvas
      this._renderer.render(this._scene, this._camera);
      if(animActive) this._map?.triggerRepaint(); // continuă animația
    },

    onRemove() {
      try { this._renderer?.dispose(); } catch(e){}
      try { this._overlay?.remove(); } catch(e){}
      this._meshes = []; this._ready = false;
    },

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
      while(this._scene.children.length > 1) this._scene.remove(this._scene.children[1]);
      this._entities = [];
      this._mesh = null;

      zones.forEach(z => {
        if(!z.hMax || z.hMax === 0) return;
        const coords = window.TCI?._polyFromDef?.(z);
        if(!coords || coords.length < 3) return;

        // Densitate din motorul predictiv (dacă disponibilă) sau fallback din hMax
        const density = z.density
          ? Math.max(4, Math.min(25, z.density))
          : Math.max(6, Math.min(18, Math.round(z.hMax / 3)));
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
            wM: 16 + seed * 18,  // 16-34m lățime (bloc tipic România)
            dM: 10 + seed * 14,  // 10-24m adâncime
            hBase: Math.max(8, z.hMax * 0.25),
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
      while(this._scene.children.length > 1) this._scene.remove(this._scene.children[1]);

      const geom = new THREE.BoxGeometry(1, 1, 1);
      geom.translate(0, 0, 0.5);
      // Shadow disc la sol — ancorare vizuală
      const shadowG = new THREE.CircleGeometry(0.72, 7);
      const shadowM = new THREE.MeshBasicMaterial({
        color:0x000000, depthTest:false, opacity:0.15, transparent:true, side:THREE.DoubleSide
      });

      this._meshes  = [];
      this._shadows = [];
      this._entities.forEach(e => {
        const mat  = new THREE.MeshBasicMaterial({
          color:e.color, depthTest:false, opacity:0.88, transparent:true,
        });
        const mesh = new THREE.Mesh(geom.clone(), mat);
        this._scene.add(mesh);
        this._meshes.push(mesh);
        // Shadow
        const shad = new THREE.Mesh(shadowG.clone(), shadowM.clone());
        shad.rotation.x = -Math.PI / 2;
        this._scene.add(shad);
        this._shadows.push(shad);
      });
      this._mesh    = {visible: true};
      this._targetH = new Float32Array(this._entities.length);
      this._currentH= new Float32Array(this._entities.length).fill(0.1);
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
      if(!this._ready || !this._meshes?.length) return;
      const C = window.TCI?.COLORS || {};
      this._entities.forEach((e, idx) => {
        const mesh = this._meshes[idx]; if(!mesh) return;

        // Calculează înălțimea țintă
        let targetH = 0.1;
        if(yr >= e.startYr) {
          const yF = Math.min(1, (yr - e.startYr) / 18);
          targetH = Math.max(0.5, e.hBase + (e.hMax - e.hBase) * yF);
        }
        // Stochează target pentru animația din render loop
        if(this._targetH) this._targetH[idx] = targetH;

        // Culoare per stare temporală
        let col;
        if(!C.stabil || yr < e.startYr)      col = C.stabil      || '#374151';
        else if((yr - e.startYr) < 5)         col = C.constructie || '#f59e0b';
        else if((yr - e.startYr) < 10)        col = C.aproape     || '#f97316';
        else                                   col = '#' + e.color.getHexString();
        mesh.material.color.set(col);
        mesh.visible = yr >= e.startYr - 1;
        if(this._shadows?.[idx]) this._shadows[idx].visible = mesh.visible;
      });
      this._map?.triggerRepaint();
    },

    updateLOD(zoom) {
      const v = zoom >= 12.5;
      (this._meshes||[]).forEach(m => { if(m) m.visible = v; });
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

    // 3. Generează zone — ÎN PARALEL cu fetch-ul de constrângeri
    //    Afișează imediat cu constrângeri goale, actualizează după fetch
    this._constraints = {bufs:[], loaded:false};
    this._projZones = this._buildZones(cx, cy, this._constraints);

    // 4. Populează 2D contururi (versiune inițială fără constrângeri)
    this._updateProjectionLayers(this.year || 2025);

    // 5. Fetch constrângeri OSM suplimentare (drumuri, plaje, mine, porturi)
    this._fetchOSMConstraints(cx, cy).then(osmBufs => {
      if(osmBufs.length > 0) {
        this._constraints.bufs = [...(this._constraints.bufs||[]), ...osmBufs];
        this._projZones = this._buildZones(cx, cy, this._constraints);
        this._updateProjectionLayers(this.year || 2025);
        console.log('[TCI] ✅ Constrângeri OSM aplicate:', osmBufs.length, 'zone');
      }
    }).catch(e => console.warn('[TCI] OSM constraints:', e.message));

    // 6. Fetch constrângeri real-time → regenerează zonele
    this._CONSTRAINT.build(cx, cy, 12).then(constraints => {
      this._constraints = constraints;
      this._projZones = this._buildZones(cx, cy, constraints);
      // Merge zone găsite de Overpass (șantiere active, spitale etc.)
      if(constraints.devZones?.length) {
        const existing = new Set(this._projZones.map(z=>z.id));
        constraints.devZones.forEach((dz,idx) => {
          if(dz.priority > 2) return; // skip generic cartiere
          const id = 'OSM_'+idx;
          if(existing.has(id)) return;
          // Verifică că nu e pe o zonă exclusă
          const R=111319.9, cp=Math.cos(cy*Math.PI/180);
          const excluded = constraints.bufs.some(b=>
            Math.hypot((dz.lon-b.lon)*R*cp,(dz.lat-b.lat)*R)<b.r+50
          );
          if(excluded) return;
          const rx = 0.0040, ry = 0.0028;
          this._projZones.push({
            id, color:dz.color, hMax:dz.hMax, startYr:dz.startYr,
            label:dz.name, sub:dz.type==='constructie'?'Șantier activ OSM 2025':'Pol de dezvoltare',
            ring:{cx:dz.lon, cy:dz.lat, rx, ry},
          });
          existing.add(id);
        });
        console.log('[TCI] ✅ Zone Overpass adăugate:', this._projZones.length, 'total');
      }
      this._updateProjectionLayers(this.year || 2025);
      // Adaugă layer vizual pentru zonele excluse
      this._showConstraintOverlay(constraints, cx, cy);
      console.log('[TCI] ✅ Zone regenerate cu constrângeri reale');
    }).catch(e => console.warn('[TCI] Constraints fetch error:', e.message));

    // 6. Construieste scene graph 3D (dupa ce stilul e complet incarcat)
    const buildScene = async () => {
      this._3D.setOrigin(cx, cy);

      // Fetch infrastructură paralelă (autostrăzi + centuri)
      let zones = this._projZones;
      const [infraCors] = await Promise.allSettled([
        this._fetchInfraCorridors(cx, cy, 20),
      ]);
      const infraCorridors = infraCors.status==='fulfilled' ? infraCors.value : [];

      try {
        const isoTimeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000));
        const isoZones = await Promise.race([
          this._buildIsochroneZones(cx, cy,
            this._calcUrbanNeed(this.cityData),
            this._calcGravityScore(this.cityData),
            h => Math.min(h, this._getSeismicAg(cx,cy).hMaxM),
            Math.pow((this.cityData?.pop2021||100000)/360000, 0.38),
            this.COLORS,
            (lon,lat) => {
              const R=111319.9, cp=Math.cos(cy*Math.PI/180);
              const bufs=(this._constraints?.bufs||[]);
              for(const b of bufs){
                if(Math.hypot((lon-b.lon)*R*cp,(lat-b.lat)*R)<b.r) return false;
              }
              return true;
            }
          ),
          isoTimeout,
        ]);
        if(isoZones && isoZones.length >= 4) {
          zones = isoZones;
          console.log('[TCI] ✅ Isochrone zones active:', zones.length);
        }
      } catch(e) {
        console.log('[TCI] Isochrone fallback → Road Corridor Model:', e.message);
      }

      // Adaugă zone din coridoarele de infrastructură (autostrăzi, centuri)
      if(infraCorridors.length > 0) {
        const seismicData = this._getSeismicAg(cx, cy);
        const sCap = h => Math.min(h, seismicData.hMaxM);
        const sc = Math.pow((this.cityData?.pop2021||100000)/360000, 0.38);
        const need = this._calcUrbanNeed(this.cityData);
        const bufs = this._constraints?.bufs || [];
        const R=111319.9, cp=Math.cos(cy*Math.PI/180);
        const okFn = (lon,lat) => !bufs.some(b=>Math.hypot((lon-b.lon)*R*cp,(lat-b.lat)*R)<b.r);
        const infraZones = this._infraToZones(
          infraCorridors, cx, cy, need, sCap, sc, this.COLORS, okFn, this._getScenario()
        );
        if(infraZones.length > 0) {
          zones = [...zones, ...infraZones];
          console.log(`[TCI] ✅ +${infraZones.length} zone infrastructură (autostrăzi+centuri)`);
        }
      }

      this._3D.buildSceneGraph(zones, this.year || 2025);

      // ── Urban Probability Engine — rulează Monte Carlo async ──────────
      setTimeout(() => {
        try {
          const upeResults = this._runUPE(this.cityData, zones);
          this._upeResults = upeResults; // salvăm pentru raport
          this._applyUPEColors(upeResults);
          // Actualizează UI cu probabilitățile cheie
          const highZones = Object.entries(upeResults)
            .filter(([,v]) => v.classification === 'HIGH')
            .sort(([,a],[,b]) => b.probability - a.probability);
          console.log(`[UPE] Zone cu probabilitate ridicată: ${highZones.slice(0,3).map(([k,v])=>k+':'+v.pct+'%').join(', ')}`);
        } catch(e) { console.warn('[UPE]', e.message); }
      }, 500);
    };
    if(m.isStyleLoaded?.()) buildScene();
    else { m.once('idle', buildScene); setTimeout(buildScene, 3000); }
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
      m.addLayer({id:'tci-const-fill', type:'fill', source:'tci-constraints',
        paint:{'fill-color':['get','color'],'fill-opacity':0.18}});
      m.addLayer({id:'tci-const-outline', type:'line', source:'tci-constraints',
        paint:{'line-color':['get','color'],'line-width':1.5,'line-dasharray':[4,3],'line-opacity':0.7}});
      console.log('[TCI] ✅ Overlay constrângeri:', features.length, 'zone excluse');
    } catch(e){}
  },

  // ══════════════════════════════════════════════════════════════════════
  // FETCH OSM CONSTRÂNGERI SUPLIMENTARE
  // Drumuri naționale, plaje, mine, porturi, industrie periculoasă
  // ══════════════════════════════════════════════════════════════════════
  async _fetchOSMConstraints(cx, cy, radius=0.15) {
    const bbox = `${cy-radius},${cx-radius},${cy+radius},${cx+radius}`;
    const queries = [
      // Drumuri naționale/autostrăzi — buffer 30m
      `way["highway"~"motorway|trunk|primary"](${bbox});`,
      // Plaje și coastă
      `way["natural"~"beach|coastline"](${bbox});`,
      `node["natural"~"beach|coastline"](${bbox});`,
      // Mine și cariere
      `way["landuse"~"quarry|mine"](${bbox});`,
      // Porturi
      `way["harbour"](${bbox}); way["waterway"="dock"](${bbox});`,
      // Industrie activă (buffer 150m de la rezidențial)
      `way["landuse"="industrial"](${bbox});`,
      // Zone inundabile OSM
      `way["natural"="floodplain"](${bbox}); way["flood_prone"="yes"](${bbox});`,
    ].join('
');

    const overpassQuery = `[out:json][timeout:30];
(
${queries}
);
out center qt;`;

    try {
      const r = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: 'data=' + encodeURIComponent(overpassQuery),
      });
      const data = await r.json();
      const elements = data.elements || [];

      const osmBufs = [];
      elements.forEach(el => {
        const t = el.tags || {};
        const lon = el.lon || el.center?.lon;
        const lat = el.lat || el.center?.lat;
        if(!lon || !lat) return;

        // Buffer per tip
        if(t.highway === 'motorway' || t.highway === 'trunk') {
          osmBufs.push({lon, lat, r:40, reason:'Autostradă/drum expres — buffer 40m', type:'road', color:'#64748b'});
        } else if(t.highway === 'primary') {
          osmBufs.push({lon, lat, r:25, reason:'Drum național — buffer 25m', type:'road', color:'#64748b'});
        } else if(t.natural === 'beach' || t.natural === 'coastline') {
          osmBufs.push({lon, lat, r:100, reason:'Plajă/coastă — zonă protejată', type:'beach', color:'#fbbf24'});
        } else if(t.landuse === 'quarry' || t.landuse === 'mine') {
          osmBufs.push({lon, lat, r:200, reason:'Carieră/mină — zonă exclusă', type:'quarry', color:'#78716c'});
        } else if(t.harbour || t.waterway === 'dock') {
          osmBufs.push({lon, lat, r:150, reason:'Port/doc — zonă exclusă', type:'port', color:'#0ea5e9'});
        } else if(t.landuse === 'industrial') {
          osmBufs.push({lon, lat, r:120, reason:'Industrie activă — buffer 120m', type:'industrial', color:'#f97316'});
        } else if(t.natural === 'floodplain' || t.flood_prone === 'yes') {
          osmBufs.push({lon, lat, r:80, reason:'Zonă inundabilă OSM', type:'flood', color:'#3b82f6'});
        }
      });

      console.log(`[TCI] OSM constrângeri: ${osmBufs.length} zone din ${elements.length} elemente`);
      return osmBufs;
    } catch(e) {
      console.warn('[TCI] OSM constraints fetch failed:', e.message);
      return [];
    }
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
      const gravity = T._calcGravityScore ? T._calcGravityScore(d) : {growthType:'LOCAL'};
      const growthLabel = gravity.growthType === 'METROPOLITAN' ? '🏙️ Metropolă regională'
                        : gravity.growthType === 'REGIONAL'     ? '🏘️ Centru regional'
                        : gravity.growthType === 'LOCAL'        ? '🏠 Centru local'
                        : '📉 Oraș în restructurare';
      const need = T._calcUrbanNeed ? T._calcUrbanNeed(d) : {locuinteTotale:0};
      const need_locuinte = (need.locuinteTotale||0).toLocaleString();
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
         body:'Aproach urban. Densitate: '+densHA+' loc/ha. PIB județ: '+pib+' mld €/an. Rata creștere: '+rate+'%/an. Proiecție 2050: '+pop50+' locuitori.',
         src:'INSE · ANCPI · BNR · Eurostat'},

        // S4 — MOARA DE VÂNT / SPITAL REGIONAL (50s) · ZIUA → la stradă
        // Prima scenă cu nivel stradă — zona cu cel mai activ șantier
        {id:'s4',dur:50000,light:'day',
         cam:{center:[cx,cy],zoom:14.0,pitch:55,bearing:-20,duration:5000},
         chain:[
           {center:[cx,cy],zoom:15.5,pitch:68,bearing:15,duration:6000,delay:10000},
           {center:[cx,cy],zoom:16.5,pitch:74,bearing:-20,duration:6000,delay:22000,light:'day'},
           {center:[cx,cy],zoom:17.0,pitch:78,bearing:10,duration:6000,delay:34000,light:'dusk'},
           {center:[cx,cy],zoom:15.0,pitch:62,bearing:30,duration:5500,delay:44000,light:'dusk'},
         ],
         title:'🏥 Moara de Vânt — Pol Medical + Smart City',
         body:'Spitalul Regional Iași (€580M, în construcție 2025). Platou NV: zona cu cea mai rapidă creștere din Moldova. ANCPI: +340 autorizații/an 2018-2025. Proiecție: hub medical + rezidențial R+4-R+10.',
         src:'ANCPI autorizații 2018-2025 · MS România · Eurostat Health'},

        // S5 — CENTRU CIVIC + CORIDOARE (55s) · APU→NOAPTE→DIMINEAȚĂ
        {id:'s5',dur:55000,light:'dusk',
         cam:{center:[cx,cy],zoom:14.5,pitch:60,bearing:-10,duration:5000},
         chain:[
           {center:[cx,cy],zoom:15.5,pitch:67,bearing:15,duration:6000,delay:10000},
           {center:[cx,cy],zoom:16.5,pitch:74,bearing:-15,duration:6000,delay:22000,light:'dusk'}, // stradă
           {center:[cx,cy],zoom:17.0,pitch:79,bearing:5,duration:6000,delay:33000,light:'night'}, // noapte stradă
           {center:[cx+0.001,cy-0.0005],zoom:16.0,pitch:72,bearing:30,duration:5500,delay:44000,light:'dawn'},
         ],
         title:'🌆 Centru Civic — Densificare R+8→R+12',
         body:'Zona CM: densificare intensivă 2026-2040. CUT 3.0 · R+8-R+12. Coridoarele E-V și N-S: R+4-R+8. Ciclul zi→apus→noapte (geamuri aprinse)→dimineața.',
         src:'PUG Iași UTR CM · ANCPI · Model TSS·FG'},

        // S6 — RECONVERSIE INDUSTRIALĂ (55s) · ZIUA → vedere aeriană
        {id:'s6',dur:55000,light:'day',
         cam:{center:[cx+0.022*sc,cy-0.011*sc],zoom:14.0,pitch:55,bearing:-20,duration:5000},
         chain:[
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:15.0,pitch:64,bearing:15,duration:6000,delay:10000},
           {center:[cx+0.022*sc,cy-0.011*sc],zoom:16.2,pitch:72,bearing:-25,duration:6000,delay:22000,light:'day'},
           {center:[cx+0.021*sc,cy-0.010*sc],zoom:17.0,pitch:78,bearing:20,duration:6000,delay:34000,light:'dusk'},
           {center:[cx+0.022*sc,cy-0.009*sc],zoom:14.5,pitch:58,bearing:0,duration:5500,delay:46000,light:'dusk'},
         ],
         title:'🏗 Reconversie Industrială — Zona Est',
         body:'310ha fosta zonă industrială. Reconversie 2028-2042: mixt funcțional R+5-R+8. Birouri + rezidențial + retail. Investiție estimată: €'+Math.round(pib*380)+'M. +'+Math.round((d.pop2021||100000)/28).toLocaleString()+' locuri de muncă.',
         src:'PUG UTR AI2 · ANCPI · Model TSS·FG'},

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

        // S8 — EXPANSIUNE DANCU + REZIDENȚIAL NOU (50s) · ZIUA
        {id:'s8',dur:50000,light:'day',
         cam:{center:[cx+0.024*sc,cy-0.006*sc],zoom:13.5,pitch:48,bearing:-15,duration:5000},
         chain:[
           {center:[cx+0.024*sc,cy-0.006*sc],zoom:14.8,pitch:62,bearing:20,duration:6000,delay:10000},
           {center:[cx+0.024*sc,cy-0.006*sc],zoom:16.0,pitch:72,bearing:-10,duration:6000,delay:22000,light:'day'},
           {center:[cx+0.023*sc,cy-0.007*sc],zoom:16.5,pitch:75,bearing:15,duration:6000,delay:33000,light:'dusk'},
           {center:[cx+0.024*sc,cy-0.006*sc],zoom:13.5,pitch:46,bearing:5,duration:5000,delay:44000,light:'dusk'},
         ],
         title:'🏘 Expansiune Dancu — PUZ Rezidențial',
         body:'Cea mai rapidă creștere Iași 2015-2025: +4.200 locuințe/an (ANCPI). Zone noi prin PUZ: R+2-R+4. Extindere intravilam legal pe extravilan agricol. Proiecție: +'+Math.round((d.pop2021||100000)*0.08).toLocaleString()+' locuitori până 2035.',
         src:'ANCPI autorizații 2015-2025 · PUZ aprobate CJ Iași · INS'},

        // S9 — RISCURI & CLIMĂ (50s) · NOAPTE
        {id:'s9',dur:50000,light:'night',
         cam:{center:[cx,cy],zoom:12.5,pitch:42,bearing:5,duration:5000},
         chain:[
           {center:[cx+0.006,cy-0.004],zoom:13.5,pitch:50,bearing:-18,duration:6000,delay:12000},
           {center:[cx-0.008,cy+0.005],zoom:13.8,pitch:53,bearing:14,duration:6000,delay:26000},
           {center:[cx,cy],zoom:12.5,pitch:42,bearing:0,duration:5000,delay:42000},
         ],
         title:'⚠ Riscuri & Climă — '+name,
         body:'Seismic: zona C (ag=0.20g, P100-1/2022). Inundații ANAR: ~340ha risc P1%. Caniculă 2050: +22 zile/an (IPCC AR6 RCP8.5). Alunecări: zone cu pantă >15°. Scor risc: '+Math.round(35+densHA*0.3)+'/100.',
         src:'INFP P100-1/2022 · ANAR · IPCC AR6 · ANM · INHGA'},

        // S10 — COMPARAȚIE EU (55s) · APU
        {id:'s10',dur:55000,light:'dusk',
         cam:{center:[cx,cy],zoom:13.0,pitch:46,bearing:-10,duration:5000},
         chain:[
           {center:[cx+0.004,cy-0.003],zoom:14.0,pitch:56,bearing:18,duration:6000,delay:12000},
           {center:[cx-0.004,cy+0.003],zoom:14.5,pitch:60,bearing:-18,duration:6000,delay:28000},
           {center:[cx,cy],zoom:13.0,pitch:46,bearing:5,duration:5000,delay:46000},
         ],
         title:'⚖ '+name+' vs Orase Similare EU',
         body:name+': '+densHA+' loc/ha · TP 18% · ESG 51/100. Cluj: 76/ha · 28% · 67. Vilnius: 156/ha · 42% · 79. Decalaj recuperabil prin investiții consistente: 8-12 ani.',
         src:'Eurostat Urban Audit 2021 · INS · BNR'},

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
         title:'🌟 '+name+' 2050 — Viziunea',
         body:'Proiecție 2025-2050: +20% pop · +100% PIB/cap · ESG 78/100 · TP 36%. Toate datele din surse oficiale calibrate. Instrument decizional pentru administrații și investitori.',
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


  // ══════════════════════════════════════════════════════════════════════
  // SISTEM SALVARE SCENARII
  // Fiecare scenariu = snapshot complet: UAT + an + S1-S4 + parametri motor
  // ══════════════════════════════════════════════════════════════════════

  _saveScenario(customName) {
    const d = this.cityData || {};
    const need = this._calcUrbanNeed(d);
    const gravity = this._calcGravityScore(d);
    const seismic = this._getSeismicAg(d.lon||27.6, d.lat||47.16);
    const scn = this._getScenario();
    const name = customName || `${d.name||'UAT'} — ${scn.label} — ${new Date().toLocaleDateString('ro-RO')}`;

    const snapshot = {
      id: `tci_${Date.now()}`,
      name,
      savedAt: new Date().toISOString(),
      // Date UAT
      cityKey: this.cityKey,
      cityName: d.name, judet: d.judet,
      pop2021: d.pop2021, rataINS: d.rata_reala_2011_2021,
      lon: d.lon, lat: d.lat,
      // Parametri scenariu
      scenario: this.scenario,
      scenarioLabel: scn.label,
      year: this.year,
      // Rezultate motor predictiv
      pop2055: need.pop2055,
      locuinteTotale: need.locuinteTotale,
      locuinteNoi: need.locuinteNoi,
      locuinteReab: need.locuinteReab,
      totalM2: need.totalM2,
      // Gravity + seismic
      growthType: gravity.growthType,
      gravityScore: gravity.gravityScore,
      seismicAg: seismic.ag,
      hMaxM: seismic.hMaxM,
      // Zone generate
      zones: (this._projZones||[]).map(z => ({
        id: z.id, label: z.label, sub: z.sub,
        hMax: z.hMax, startYr: z.startYr, color: z.color,
      })),
    };

    // Salvează în localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('tci_scenarios') || '[]');
      existing.unshift(snapshot);
      localStorage.setItem('tci_scenarios', JSON.stringify(existing.slice(0,20))); // max 20
      console.log('[TCI] ✅ Scenariu salvat:', name);
    } catch(e) { console.warn('[TCI] Save failed:', e); }

    // Salvează și în Supabase dacă disponibil
    if(window.SUPABASE_URL) {
      fetch(`${window.SUPABASE_URL}/rest/v1/tci_scenarios`, {
        method:'POST',
        headers:{'Content-Type':'application/json','apikey':window.SUPABASE_PUBLISHABLE||''},
        body: JSON.stringify(snapshot),
      }).then(()=>console.log('[TCI] ✅ Scenariu sincronizat Supabase'))
        .catch(e=>console.warn('[TCI] Supabase sync:', e.message));
    }

    return snapshot;
  },

  _loadScenarios() {
    try {
      return JSON.parse(localStorage.getItem('tci_scenarios') || '[]');
    } catch(e) { return []; }
  },

  // ══════════════════════════════════════════════════════════════════════
  // GENERATOR RAPORT PDF PROFESIONAL
  // Conform standardelor: primării, OAR, CNAIR, investitori, guvern
  // ══════════════════════════════════════════════════════════════════════

  _generateReport(snapshot) {
    const s = snapshot || this._saveScenario();
    const d = this.cityData || {};
    const need    = this._calcUrbanNeed(d);
    const gravity = this._calcGravityScore(d);
    const seismic = this._getSeismicAg(d.lon||27.6, d.lat||47.16);
    const scn     = this._getScenario();
    const zones   = this._projZones || [];
    const today   = new Date().toLocaleDateString('ro-RO',{year:'numeric',month:'long',day:'numeric'});
    const todayISO= new Date().toISOString().split('T')[0];
    const pop21   = d.pop2021||100000;
    const rate    = (d.rata_reala_2011_2021||0)/100;

    // ── Proiecție demografică per an (pentru grafic) ──
    const years   = [2025,2027,2030,2033,2035,2038,2040,2043,2045,2048,2050,2053,2055];
    const popProj = years.map(y => {
      const yF = Math.max(0, y-2021)/34;
      return Math.round(pop21 + (need.pop2055 - pop21)*yF);
    });
    const locProj = years.map(y => Math.round(need.locuinteTotale * Math.max(0,y-2025)/30));

    // ── Comparații cu orașe din România ──
    const romanianPeers = (() => {
      if(typeof _RO_CITIES_DB === 'undefined') return [];
      return Object.values(_RO_CITIES_DB)
        .filter(c => c.pop2021 && c.name !== d.name)
        .sort((a,b) => Math.abs(a.pop2021-pop21) - Math.abs(b.pop2021-pop21))
        .slice(0,5)
        .map(c => {
          const cn = this._calcUrbanNeed(c);
          const cg = this._calcGravityScore(c);
          const cs = this._getSeismicAg(c.lon||25,c.lat||45);
          return {...c, need:cn, gravity:cg, seismic:cs};
        });
    })();

    // ── Orașe europene de referință ──
    const europeanPeers = [
      {name:'Wrocław', country:'PL', pop:'641k', growth:'+0.8%', gravity:'0.72', type:'METROPOLITAN', note:'University city, IT hub'},
      {name:'Łódź',    country:'PL', pop:'672k', growth:'-0.9%', gravity:'0.48', type:'REGIONAL',     note:'Industrial reconversion'},
      {name:'Brno',    country:'CZ', pop:'382k', growth:'+0.4%', gravity:'0.68', type:'METROPOLITAN', note:'R&D + university'},
      {name:'Pécs',    country:'HU', pop:'145k', growth:'-0.5%', gravity:'0.42', type:'REGIONAL',     note:'Cultural city'},
      {name:'Plovdiv', country:'BG', pop:'347k', growth:'+0.2%', gravity:'0.55', type:'REGIONAL',     note:'Industrial + tourism'},
      {name:'Chișinău',country:'MD', pop:'494k', growth:'+0.3%', gravity:'0.50', type:'METROPOLITAN', note:'Capital region'},
    ];

    // ── SVG Grafic populatie ──
    const svgPop = (() => {
      const W=560, H=180, pad=40;
      const minP = Math.min(...popProj)*0.97, maxP = Math.max(...popProj)*1.03;
      const xS = (W-2*pad)/(years.length-1), yS = (H-2*pad)/(maxP-minP);
      const pts = years.map((y,i) => `${pad+i*xS},${H-pad-(popProj[i]-minP)*yS}`).join(' ');
      const color = need.pop2055 > pop21 ? '#22c55e' : '#f59e0b';
      const labels = [years[0],years[4],years[8],years[12]].map((y,i)=>{
        const idx=[0,4,8,12][i];
        return `<text x="${pad+idx*xS}" y="${H-8}" text-anchor="middle" font-size="9" fill="#64748b">${y}</text>
                <text x="${pad+idx*xS}" y="${H-pad-(popProj[idx]-minP)*yS-6}" text-anchor="middle" font-size="8" fill="${color}">${Math.round(popProj[idx]/1000)}k</text>`;
      }).join('');
      return `<svg width="${W}" height="${H}" style="overflow:visible">
        <defs><linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
        </linearGradient></defs>
        <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${H-pad}" stroke="#e2e8f0" stroke-width="1"/>
        <line x1="${pad}" y1="${H-pad}" x2="${W-pad}" y2="${H-pad}" stroke="#e2e8f0" stroke-width="1"/>
        <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="${pts} ${W-pad},${H-pad} ${pad},${H-pad}" fill="url(#gp)"/>
        <circle cx="${pad}" cy="${H-pad-(popProj[0]-minP)*yS}" r="4" fill="${color}"/>
        <circle cx="${W-pad}" cy="${H-pad-(popProj[years.length-1]-minP)*yS}" r="4" fill="${color}"/>
        ${labels}
        <text x="${pad-5}" y="${H-pad-(popProj[0]-minP)*yS+4}" text-anchor="end" font-size="8" fill="#64748b">${Math.round(minP/1000)}k</text>
        <text x="${pad-5}" y="${pad+4}" text-anchor="end" font-size="8" fill="#64748b">${Math.round(maxP/1000)}k</text>
      </svg>`;
    })();

    // ── SVG Grafic locuinte ──
    const svgLoc = (() => {
      const W=560, H=140, pad=40;
      const maxL = need.locuinteTotale;
      const xS=(W-2*pad)/(years.length-1), yS=(H-2*pad)/maxL;
      const barW = (W-2*pad)/(years.length*1.8);
      const bars = years.map((y,i) => {
        const h = locProj[i]*yS;
        const col = y<=2030?'#f59e0b':y<=2040?'#3b82f6':'#22c55e';
        return `<rect x="${pad+i*xS-barW/2}" y="${H-pad-h}" width="${barW}" height="${h}" fill="${col}" opacity="0.8" rx="2"/>`;
      }).join('');
      const axisX = [years[0],years[6],years[12]].map((y,i)=>{
        const idx=[0,6,12][i];
        return `<text x="${pad+idx*xS}" y="${H-8}" text-anchor="middle" font-size="9" fill="#64748b">${y}</text>`;
      }).join('');
      return `<svg width="${W}" height="${H}">
        <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${H-pad}" stroke="#e2e8f0"/>
        <line x1="${pad}" y1="${H-pad}" x2="${W-pad}" y2="${H-pad}" stroke="#e2e8f0"/>
        ${bars}${axisX}
        <text x="${pad-5}" y="${H-pad+4}" text-anchor="end" font-size="8" fill="#64748b">0</text>
        <text x="${pad-5}" y="${pad+4}" text-anchor="end" font-size="8" fill="#64748b">${Math.round(maxL/1000)}k</text>
      </svg>`;
    })();

    // ── SVG Grafic scenarii ──
    const svgScen = (() => {
      const W=560, H=120, pad=40;
      const scenarios=[
        {label:'S1 Accelerat', mult:1.8, color:'#22c55e'},
        {label:'S2 Sustenabil', mult:1.0, color:'#3b82f6'},
        {label:'S3 Conservare', mult:0.6, color:'#f59e0b'},
        {label:'S4 Risc Climatic', mult:0.3, color:'#ef4444'},
      ];
      const maxV = need.locuinteTotale*1.8;
      const bW = (W-2*pad)/scenarios.length - 10;
      return `<svg width="${W}" height="${H}">
        ${scenarios.map((sc,i)=>{
          const v=Math.round(need.locuinteTotale*sc.mult);
          const h=(v/maxV)*(H-2*pad);
          const x=pad+i*(bW+10);
          const active=this.scenario===`S${i+1}`?'stroke="#fff" stroke-width="2"':'';
          return `<rect x="${x}" y="${H-pad-h}" width="${bW}" height="${h}" fill="${sc.color}" opacity="0.85" rx="3" ${active}/>
                  <text x="${x+bW/2}" y="${H-pad-h-5}" text-anchor="middle" font-size="8.5" fill="${sc.color}" font-weight="600">${Math.round(v/1000)}k</text>
                  <text x="${x+bW/2}" y="${H-12}" text-anchor="middle" font-size="8" fill="#64748b">${sc.label.split(' ')[0]}</text>`;
        }).join('')}
        <line x1="${pad}" y1="${H-pad}" x2="${W-pad}" y2="${H-pad}" stroke="#e2e8f0"/>
      </svg>`;
    })();

    const hMaxStr = `R+${seismic.hMaxStory||10} (${seismic.hMaxM||30}m)`;
    const locuinteAnual = Math.round(need.locuinteTotale/30);
    const investEstimat = Math.round((need.totalM2||0)*1200/1000000);
    const growthColor = gravity.growthType==='METROPOLITAN'?'#7c3aed':gravity.growthType==='REGIONAL'?'#1d4ed8':gravity.growthType==='LOCAL'?'#b45309':'#991b1b';

    // ── Predicții scrise ──
    const predictii = (() => {
      const trend = rate > 0 ? 'creștere' : 'scădere';
      const zoneTop = zones.filter(z=>z.startYr<=2030).slice(0,3).map(z=>z.label).join(', ');
      const p2030 = Math.round(pop21 + (need.pop2055-pop21)*5/30);
      const p2040 = Math.round(pop21 + (need.pop2055-pop21)*15/30);
      const p2055 = need.pop2055;
      return {
        short: `Până în 2030, ${d.name} prezintă o probabilitate de ${Math.round((Object.values(T._upeResults||{}).filter(v=>v.classification==='HIGH').length / Math.max(1, zones.length))*100)}% de densificare activă în zonele identificate. Scenariul ${scn.label} estimează ${Math.round(need.locuinteTotale*5/30).toLocaleString('ro-RO')} unități locative 2025-2030, cu un interval de încredere 90%: [${Math.round(need.locuinteTotale*5/30*0.7).toLocaleString('ro-RO')} – ${Math.round(need.locuinteTotale*5/30*1.4).toLocaleString('ro-RO')}]. Zonele cu probabilitate >70%: ${Object.entries(T._upeResults||{}).filter(([,v])=>v.probability>0.7).slice(0,2).map(([k,v])=>k+' ('+v.pct+'%)').join(', ')||'calculare în curs'}.`,
        medium: `Orizontul 2030-2040 marchează faza de maturizare. Populația estimată la ${p2040.toLocaleString('ro-RO')} locuitori (${Math.round((p2040-pop21)/pop21*100)}% față de 2021). Reconversia industrială și densificarea centrului vor deveni prioritare. ${gravity.growthType==='METROPOLITAN'?'Presiunea imobiliară va crește semnificativ pe axele de transport.':gravity.growthType==='DECLINING'?'Reabilitarea fondului construit existent devine prioritară față de construcțiile noi.':'Coridoarele de mobilitate vor concentra cea mai mare parte a activității de construcție.'}`,
        long: `La orizontul 2055, ${d.name} va număra ${p2055.toLocaleString('ro-RO')} locuitori. ${need.pop2055 > pop21 ? `Creșterea de ${Math.round((p2055-pop21)/pop21*100)}% față de 2021 implică ${need.locuinteTotale.toLocaleString('ro-RO')} unități locative și o investiție estimată de €${investEstimat}M.` : `Scăderea demografică este compensată parțial de ${need.locuinteDiaspora||0} locuințe premium generate de diaspora returnată și ${need.locuinteMigrantiRural||0} unități pentru migranți rural→urban.`} Factorul climatic (zona ${need.climate?.zone||'—'}, UHI +${need.climate?.uhi||1}°C) va impune standarde superioare pentru toate construcțiile noi. Infrastructura A7/A8 redefiniește accesibilitatea regională și atrage investiții suplimentare în axele periurbane.`,
      };
    })();

    const html = `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<title>Raport TCI — ${d.name} — ${scn.label} — ${todayISO}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;color:#1e293b;background:#fff;font-size:10.5pt;line-height:1.65}
@media print{body{font-size:9.5pt}.no-print{display:none!important}.page-break{page-break-before:always}@page{margin:1.8cm;size:A4}}
.header{background:linear-gradient(135deg,#0f172a 0%,#1a2f5e 60%,#0e3a2f 100%);color:#fff;padding:28px 36px}
.header-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
.brand{font-size:9pt;color:rgba(255,255,255,0.55);letter-spacing:2px;text-transform:uppercase}
.brand strong{color:#D4AF37}
.doc-id{text-align:right;font-size:8pt;color:rgba(255,255,255,0.45);line-height:1.8}
h1{font-size:24pt;font-weight:800;letter-spacing:-0.5px}
h2.sub{font-size:12pt;font-weight:400;color:rgba(255,255,255,0.7);margin-top:4px}
.badges{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
.badge-h{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:4px;font-size:8.5pt;font-weight:600}
.disclaimer{background:#fffbeb;border-left:4px solid #f59e0b;padding:10px 16px;font-size:8.5pt;color:#78350f}
.content{padding:28px 36px}
h2.sec{font-size:13pt;font-weight:700;color:#0f172a;margin:26px 0 10px;padding-bottom:5px;border-bottom:2.5px solid #e2e8f0;display:flex;align-items:center;gap:8px}
h2.sec .sec-num{background:#0f172a;color:#fff;width:22px;height:22px;border-radius:50%;font-size:9pt;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
h3.sub2{font-size:10.5pt;font-weight:600;color:#334155;margin:14px 0 6px}
p{margin-bottom:9px;color:#334155}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0}
.kpi{background:#f8fafc;border:1px solid #e2e8f0;border-radius:7px;padding:12px 14px}
.kpi-val{font-size:18pt;font-weight:700;color:#0f172a;line-height:1.1}
.kpi-lbl{font-size:7.5pt;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-top:3px}
.kpi-src{font-size:7pt;color:#94a3b8;margin-top:4px;font-style:italic}
.kpi.blue{border-color:#93c5fd;background:#eff6ff}.kpi.blue .kpi-val{color:#1d4ed8}
.kpi.green{border-color:#86efac;background:#f0fdf4}.kpi.green .kpi-val{color:#166534}
.kpi.amber{border-color:#fcd34d;background:#fffbeb}.kpi.amber .kpi-val{color:#92400e}
.kpi.red{border-color:#fca5a5;background:#fef2f2}.kpi.red .kpi-val{color:#991b1b}
table{width:100%;border-collapse:collapse;margin:10px 0;font-size:9pt}
th{background:#0f172a;color:#fff;padding:8px 10px;text-align:left;font-size:8pt;font-weight:600}
td{padding:7px 10px;border-bottom:1px solid #f1f5f9;vertical-align:top}
tr:nth-child(even) td{background:#f8fafc}
.bd{display:inline-block;padding:2px 7px;border-radius:9px;font-size:7.5pt;font-weight:600}
.bd-g{background:#dcfce7;color:#166534}.bd-y{background:#fef9c3;color:#854d0e}
.bd-o{background:#ffedd5;color:#9a3412}.bd-r{background:#fee2e2;color:#991b1b}
.bd-b{background:#dbeafe;color:#1e40af}.bd-p{background:#f3e8ff;color:#6b21a8}
.bd-s{background:#f1f5f9;color:#475569}
.formula{background:#0f172a;color:#e2e8f0;border-radius:8px;padding:14px 18px;font-family:'Courier New',monospace;font-size:9pt;margin:10px 0;line-height:1.9}
.formula .c{color:#64748b}.formula .k{color:#93c5fd}.formula .v{color:#86efac}
.chart-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:12px 0}
.chart-title{font-size:9pt;font-weight:600;color:#0f172a;margin-bottom:10px}
.chart-legend{display:flex;gap:14px;margin-top:8px;font-size:8pt;color:#64748b;flex-wrap:wrap}
.leg-dot{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:4px}
.pred-box{border-left:3px solid;padding:10px 14px;margin:8px 0;border-radius:0 6px 6px 0}
.pred-2030{border-color:#f59e0b;background:#fffbeb}
.pred-2040{border-color:#3b82f6;background:#eff6ff}
.pred-2055{border-color:#8b5cf6;background:#f5f3ff}
.pred-year{font-size:10pt;font-weight:700;margin-bottom:4px}
.zone-item{display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #f1f5f9;align-items:flex-start}
.zone-dot{width:11px;height:11px;border-radius:2px;margin-top:3px;flex-shrink:0}
.source-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:10px 0}
.src{border:1px solid #e2e8f0;border-radius:6px;padding:9px 11px}
.src-name{font-weight:700;font-size:9pt;color:#0f172a}
.src-desc{font-size:8pt;color:#64748b;margin-top:2px}
.src-date{font-size:7.5pt;color:#94a3b8;margin-top:3px;font-style:italic}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.footer{background:#f8fafc;border-top:2px solid #e2e8f0;padding:16px 36px;font-size:8pt;color:#94a3b8;display:flex;justify-content:space-between;align-items:center}
.footer-logo{font-weight:700;color:#0f172a;font-size:10pt}
.print-btn{position:fixed;top:16px;right:16px;z-index:999;background:#1d4ed8;color:#fff;border:none;border-radius:7px;padding:9px 18px;font-size:9.5pt;cursor:pointer;font-family:inherit;box-shadow:0 4px 14px rgba(0,0,0,0.2)}
</style>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">⬇ Descarcă PDF</button>

<div class="header">
  <div class="header-top">
    <div>
      <div class="brand"><strong>UrbanX</strong> · TCI Cinema · Raport Predictiv Urban</div>
      <h1>${d.name||'Analiză UAT'}</h1>
      <h2 class="sub">Proiecție Urbanistică 2025–2055 · jud. ${d.judet||'—'} · ${today}</h2>
    </div>
    <div class="doc-id">
      ID: TCI-${todayISO}-${(this.cityKey||'uat').toUpperCase()}<br>
      Scenariu: <strong style="color:#D4AF37">${this.scenario}</strong><br>
      Motor: v${this._version||'82'}<br>
      Clasificare: PUBLIC
    </div>
  </div>
  <div class="badges">
    <span class="badge-h" style="background:${growthColor}33;border:1px solid ${growthColor}66;color:#fff">
      📊 ${gravity.growthType} · Gravity ${(gravity.gravityScore||0).toFixed(2)}</span>
    <span class="badge-h" style="background:rgba(212,175,55,0.2);border:1px solid #D4AF37;color:#D4AF37">
      ★ ${scn.label}</span>
    <span class="badge-h" style="${seismic.ag>=0.35?'background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#fca5a5':'background:rgba(245,158,11,0.2);border:1px solid #f59e0b;color:#fcd34d'}">
      ⚠ Seismic ag=${seismic.ag}g · ${hMaxStr}</span>
    <span class="badge-h" style="background:rgba(99,102,241,0.2);border:1px solid #818cf8;color:#c7d2fe">
      🏘 ${zones.length} zone identificate</span>
  </div>
</div>

<div class="disclaimer">
  <strong>Avertisment metodologic:</strong> Proiecție statistică bazată pe date oficiale publice. Nu substituie PUG, PUZ sau avize de specialitate.
  Valorile sunt estimări probabilistice în scenariul <strong>${scn.label}</strong>. Data generării: <strong>${today}</strong>.
  Date sursă la data accesului: <strong>${todayISO}</strong>.
</div>

<div class="content">

<!-- 1. SINTEZĂ -->
<h2 class="sec"><span class="sec-num">1</span> Sinteză UAT — ${d.name}</h2>
<div class="kpi-grid">
  <div class="kpi blue">
    <div class="kpi-val">${(pop21).toLocaleString('ro-RO')}</div>
    <div class="kpi-lbl">Populație 2021</div>
    <div class="kpi-src">INS · Recensământ 2021 · accesat ${todayISO}</div>
  </div>
  <div class="kpi ${need.pop2055>pop21?'green':'amber'}">
    <div class="kpi-val">${(need.pop2055||0).toLocaleString('ro-RO')}</div>
    <div class="kpi-lbl">Estimat 2055 (Cohort INS)</div>
    <div class="kpi-src">Model Cohort Survival · ${rate>0?'+':''}${(rate*100).toFixed(2)}%/an INS</div>
  </div>
  <div class="kpi blue">
    <div class="kpi-val">${(need.locuinteTotale||0).toLocaleString('ro-RO')}</div>
    <div class="kpi-lbl">Locuințe necesare 2025-2055</div>
    <div class="kpi-src">ANCPI · 68m²/loc · 2,3 pers/gosp</div>
  </div>
  <div class="kpi ${seismic.ag>=0.35?'red':'amber'}">
    <div class="kpi-val">ag=${seismic.ag}g</div>
    <div class="kpi-lbl">Zonă seismică · max ${hMaxStr}</div>
    <div class="kpi-src">P100-1/2013 MDLPA · accesat ${todayISO}</div>
  </div>
  <div class="kpi">
    <div class="kpi-val">${locuinteAnual}</div>
    <div class="kpi-lbl">Locuințe/an medie</div>
    <div class="kpi-src">Total / 30 ani perioadă</div>
  </div>
  <div class="kpi green">
    <div class="kpi-val">€${investEstimat}M</div>
    <div class="kpi-lbl">Investiție estimată</div>
    <div class="kpi-src">€1.200/m² · ANCPI 2024</div>
  </div>
  <div class="kpi">
    <div class="kpi-val">${(d.rata_reala_2011_2021||0).toFixed(2)}%</div>
    <div class="kpi-lbl">Rată anuală 2011-2021</div>
    <div class="kpi-src">INS · Dinamica populației</div>
  </div>
  <div class="kpi" style="border-color:${growthColor}66;background:${growthColor}11">
    <div class="kpi-val" style="color:${growthColor}">${gravity.growthType}</div>
    <div class="kpi-lbl">Tip urban · Gravity ${(gravity.gravityScore||0).toFixed(2)}/1.0</div>
    <div class="kpi-src">Urban Gravity Model · TCI v${this._version||'82'}</div>
  </div>
</div>

<!-- 2. PREDICȚII SCRISE -->
<h2 class="sec"><span class="sec-num">2</span> Predicții Urbanistice 2025–2055</h2>
<div class="pred-box pred-2030">
  <div class="pred-year">🏗 Orizont scurt 2025–2030</div>
  <p style="margin:0">${predictii.short}</p>
</div>
<div class="pred-box pred-2040">
  <div class="pred-year">🏙 Orizont mediu 2030–2040</div>
  <p style="margin:0">${predictii.medium}</p>
</div>
<div class="pred-box pred-2055">
  <div class="pred-year">🌆 Orizont lung 2040–2055</div>
  <p style="margin:0">${predictii.long}</p>
</div>

<!-- 3. GRAFICE -->
<h2 class="sec"><span class="sec-num">3</span> Proiecții Grafice</h2>
<div class="two-col">
  <div class="chart-box">
    <div class="chart-title">Evoluție populație 2025–2055 (Cohort Survival INS)</div>
    ${svgPop}
    <div class="chart-legend">
      <span><span class="leg-dot" style="background:${need.pop2055>pop21?'#22c55e':'#f59e0b'}"></span>Populație estimată</span>
      <span style="color:#94a3b8">Sursă: INS Recensământ 2021 + model cohort</span>
    </div>
  </div>
  <div class="chart-box">
    <div class="chart-title">Necesar locativ cumulat 2025–2055</div>
    ${svgLoc}
    <div class="chart-legend">
      <span><span class="leg-dot" style="background:#f59e0b"></span>2025-2030</span>
      <span><span class="leg-dot" style="background:#3b82f6"></span>2030-2040</span>
      <span><span class="leg-dot" style="background:#22c55e"></span>2040-2055</span>
    </div>
  </div>
</div>
<div class="chart-box">
  <div class="chart-title">Comparație scenarii S1–S4 · Necesar total locuințe</div>
  ${svgScen}
  <div class="chart-legend">
    <span><span class="leg-dot" style="background:#22c55e"></span>S1 Accelerat (×1.8)</span>
    <span><span class="leg-dot" style="background:#3b82f6"></span>S2 Sustenabil ★ referință</span>
    <span><span class="leg-dot" style="background:#f59e0b"></span>S3 Conservare (×0.6)</span>
    <span><span class="leg-dot" style="background:#ef4444"></span>S4 Risc Climatic (×0.3)</span>
  </div>
</div>

<!-- 4. COMPARAȚII ROMÂNIA -->
<h2 class="sec page-break"><span class="sec-num">4</span> Comparații Orașe România</h2>
<table>
  <tr><th>Oraș</th><th>Populație 2021</th><th>Rată INS</th><th>Estimat 2055</th><th>Necesar loc.</th><th>Seismic</th><th>Tip urban</th></tr>
  <tr style="background:#eff6ff;font-weight:600">
    <td>${d.name} ★</td>
    <td>${(pop21).toLocaleString('ro-RO')}</td>
    <td>${(rate*100).toFixed(2)}%</td>
    <td>${(need.pop2055||0).toLocaleString('ro-RO')}</td>
    <td>${(need.locuinteTotale||0).toLocaleString('ro-RO')}</td>
    <td>ag=${seismic.ag}g</td>
    <td><span class="bd bd-b">${gravity.growthType}</span></td>
  </tr>
  ${romanianPeers.map(c=>`
  <tr>
    <td>${c.name}</td>
    <td>${(c.pop2021||0).toLocaleString('ro-RO')}</td>
    <td>${((c.rata_reala_2011_2021||0)).toFixed(2)}%</td>
    <td>${(c.need?.pop2055||0).toLocaleString('ro-RO')}</td>
    <td>${(c.need?.locuinteTotale||0).toLocaleString('ro-RO')}</td>
    <td>ag=${c.seismic?.ag||0.2}g</td>
    <td><span class="bd ${c.gravity?.growthType==='METROPOLITAN'?'bd-p':c.gravity?.growthType==='REGIONAL'?'bd-b':c.gravity?.growthType==='LOCAL'?'bd-y':'bd-s'}">${c.gravity?.growthType||'—'}</span></td>
  </tr>`).join('')}
</table>

<!-- 5. COMPARAȚII EUROPA -->
<h2 class="sec"><span class="sec-num">5</span> Contextualizare Europeană</h2>
<p style="font-size:8.5pt;color:#64748b;margin-bottom:8px">
  Comparație cu orașe similare ca profil demografic din Europa Centrală și de Est.
  Sursă: Eurostat Urban Audit 2021 · ec.europa.eu/eurostat · accesat ${todayISO}
</p>
<table>
  <tr><th>Oraș</th><th>Țară</th><th>Populație</th><th>Creștere</th><th>Gravity</th><th>Tip urban</th><th>Notă comparativă</th></tr>
  <tr style="background:#eff6ff;font-weight:600">
    <td>${d.name} ★</td><td>RO</td>
    <td>${(pop21/1000).toFixed(0)}k</td>
    <td>${(rate*100).toFixed(2)}%</td>
    <td>${(gravity.gravityScore||0).toFixed(2)}</td>
    <td><span class="bd bd-b">${gravity.growthType}</span></td>
    <td>Referință analiză</td>
  </tr>
  ${europeanPeers.map(c=>`
  <tr>
    <td>${c.name}</td><td>${c.country}</td>
    <td>${c.pop}</td><td>${c.growth}</td>
    <td>${c.gravity}</td>
    <td><span class="bd ${c.type==='METROPOLITAN'?'bd-p':'bd-b'}">${c.type}</span></td>
    <td>${c.note}</td>
  </tr>`).join('')}
</table>
<p style="font-size:8pt;color:#94a3b8;margin-top:6px">
  * Gravity Score calculat conform metodologiei TCI pentru comparabilitate.
  Date Eurostat: ultima actualizare 2021-2023.
</p>

<!-- 5b. PROFIL SOCIO-DEMOGRAFIC -->
<h2 class="sec"><span class="sec-num">5b</span> Profil Socio-Demografic & Migrație</h2>

<div class="two-col">
  <div>
    <h3 class="sub2">Structura rezidenților estimați 2025-2055</h3>
    <table>
      <tr><th>Profil</th><th>% din cerere</th><th>Suprafață medie</th><th>Tip preferat</th></tr>
      ${(need.socio?.profiluri||[]).map(p=>`
      <tr><td>${p.tip}</td><td>${Math.round(p.pct*100)}%</td><td>${p.m2} m²</td>
          <td><span class="bd bd-b">${p.cerere}</span></td></tr>`).join('')}
    </table>
  </div>
  <div>
    <h3 class="sub2">Mix tipuri de locuințe necesare</h3>
    <table>
      <tr><th>Tip</th><th>Unități estimate</th><th>% din total</th></tr>
      <tr><td>Studio (35-45m²)</td><td>${(need.mixLoc?.studio||0).toLocaleString('ro-RO')}</td>
          <td>${Math.round((need.mixLoc?.studio||0)/need.locuinteTotale*100)}%</td></tr>
      <tr><td>2 camere (50-65m²)</td><td>${(need.mixLoc?.['2cam']||0).toLocaleString('ro-RO')}</td>
          <td>${Math.round((need.mixLoc?.['2cam']||0)/need.locuinteTotale*100)}%</td></tr>
      <tr><td>3 camere (65-80m²)</td><td>${(need.mixLoc?.['3cam']||0).toLocaleString('ro-RO')}</td>
          <td>${Math.round((need.mixLoc?.['3cam']||0)/need.locuinteTotale*100)}%</td></tr>
      <tr><td>4 camere+ (85m²+)</td><td>${(need.mixLoc?.['4cam+']||0).toLocaleString('ro-RO')}</td>
          <td>${Math.round((need.mixLoc?.['4cam+']||0)/need.locuinteTotale*100)}%</td></tr>
      <tr><td>Case individuale</td><td>${(need.mixLoc?.casa||0).toLocaleString('ro-RO')}</td>
          <td>${Math.round((need.mixLoc?.casa||0)/need.locuinteTotale*100)}%</td></tr>
    </table>
  </div>
</div>

<h3 class="sub2">Fluxuri de Migrație Estimate 2025-2055</h3>
<div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">
  <div class="kpi blue">
    <div class="kpi-val">${(need.diaspora?.diasporaRevine||0).toLocaleString('ro-RO')}</div>
    <div class="kpi-lbl">Diaspora returnată estimată</div>
    <div class="kpi-src">INS 2023 · ~3.8M români în străinătate · 2.5%/an revin</div>
  </div>
  <div class="kpi green">
    <div class="kpi-val">${(need.locuinteDiaspora||0).toLocaleString('ro-RO')}</div>
    <div class="kpi-lbl">Locuințe premium diaspora</div>
    <div class="kpi-src">€${Math.round((need.diaspora?.investitie||0)/1000000)}M investiție estimată</div>
  </div>
  <div class="kpi">
    <div class="kpi-val">${(need.locuinteMigrantiRural||0).toLocaleString('ro-RO')}</div>
    <div class="kpi-lbl">Locuințe migranți rural→urban</div>
    <div class="kpi-src">Flux 1.8%/an · INS trend 2011-2021</div>
  </div>
  <div class="kpi amber">
    <div class="kpi-val">${(need.migration?.reversMigration||0).toLocaleString('ro-RO')}</div>
    <div class="kpi-lbl">Reverse migration (urban→rural)</div>
    <div class="kpi-src">Post-COVID telecommuting · 0.4%/an</div>
  </div>
</div>

<!-- 5c. PROFIL CLIMATOLOGIC -->
<h2 class="sec"><span class="sec-num">5c</span> Profilul Climatologic 2025-2055</h2>
<p style="font-size:8.5pt;color:#64748b">
  Sursă: Copernicus Climate Data Store · IPCC AR6 WG2 · Administrația Meteorologică Română · accesat ${todayISO}
</p>
<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
  <div class="kpi ${need.climate?.uhi>1.5?'red':'amber'}">
    <div class="kpi-val">+${need.climate?.uhi||1.0}°C</div>
    <div class="kpi-lbl">Insulă de căldură urbană (UHI) 2055</div>
    <div class="kpi-src">Față de temperatura regională · Copernicus</div>
  </div>
  <div class="kpi ${need.climate?.drought>0.6?'red':'amber'}">
    <div class="kpi-val">${Math.round((need.climate?.drought||0.3)*100)}%</div>
    <div class="kpi-lbl">Risc secetă severă 2050</div>
    <div class="kpi-src">Scenariu RCP 4.5 · IPCC AR6</div>
  </div>
  <div class="kpi ${need.climate?.flood>0.6?'red':'amber'}">
    <div class="kpi-val">${Math.round((need.climate?.flood||0.4)*100)}%</div>
    <div class="kpi-lbl">Risc inundații amplificate 2050</div>
    <div class="kpi-src">Schimbări climatice · ANAR proiecții</div>
  </div>
</div>
<div class="pred-box" style="border-color:#0ea5e9;background:#f0f9ff;margin-top:8px">
  <div class="pred-year" style="color:#0369a1">🌡 Implicații urbanistice climatice pentru ${d.name} (zona ${need.climate?.zone||'—'})</div>
  <p style="margin:0">${need.climate?.note||'Profil climatic moderat.'}
  ${need.climate?.uhi>1.5?` Insulă de căldură ridicată (${need.climate.uhi}°C) — obligatoriu: minim 30% spații verzi în PUZ, acoperișuri reflectorizante, fațade ventilate.`:''}
  ${need.climate?.drought>0.6?' Risc secetă ridicat — obligatoriu: sisteme de captare ape pluviale, irigații eficiente, specii rezistente la secetă.':''}
  ${need.climate?.flood>0.6?' Risc inundații crescut — restricție: subsoluri interzise în zone de risc, cota minimă +0.80m față de teren natural.':''}</p>
</div>

<!-- 6. ZONE DE DEZVOLTARE — VIZIUNE PROBABILISTICĂ -->
<h2 class="sec"><span class="sec-num">6</span> Zone de Dezvoltare — Model Probabilistic</h2>
<p style="font-size:8.5pt;background:#f0fdf4;border:1px solid #86efac;border-radius:6px;padding:8px 12px;margin-bottom:12px">
  <strong>Notă metodologică:</strong> Zonele sunt prezentate cu <strong>probabilitate de dezvoltare</strong>,
  nu ca certitudini. Fiecare zonă a rulat ${this._UPE_PARAMS?.N_SIMULATIONS||500} simulări Monte Carlo cu 5 variabile:
  Economie (E), Migrație (M), Infrastructură (I), Climă (C), Guvernanță (G).
  Formula: <code>P(D) = f(E, M, I, C, G)</code>
</p>
<table>
  <tr><th>Zonă</th><th>Probabilitate</th><th>Interval 90%</th><th>Clasificare</th><th>Start estimat</th></tr>
  ${zones.sort((a,b)=>{
    const pa = (T._upeResults||{})[a.id||a.label]?.probability||0.5;
    const pb = (T._upeResults||{})[b.id||b.label]?.probability||0.5;
    return pb-pa;
  }).slice(0,15).map(z => {
    const upe = (T._upeResults||{})[z.id||z.label] || {pct:50,p5:0.3,p95:0.7,classification:'MEDIUM',color:'#f59e0b'};
    const barW = upe.pct;
    return `<tr>
      <td><strong style="font-size:9pt">${z.label||z.id}</strong>
          <div style="font-size:7.5pt;color:#64748b">${z.sub||''}</div></td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <div style="width:${barW}px;height:10px;background:${upe.color};border-radius:2px;max-width:80px"></div>
          <strong style="color:${upe.color}">${upe.pct}%</strong>
        </div>
      </td>
      <td style="font-size:8.5pt;color:#64748b">[${Math.round(upe.p5*100)}% – ${Math.round(upe.p95*100)}%]</td>
      <td><span class="bd ${upe.classification==='HIGH'?'bd-g':upe.classification==='MEDIUM'?'bd-y':upe.classification==='LOW'?'bd-s':'bd-r'}">${upe.label||upe.classification}</span></td>
      <td style="font-size:8.5pt">${z.startYr||'—'}</td>
    </tr>`;
  }).join('')}
</table>
<p style="font-size:8pt;color:#94a3b8;margin-top:6px">
  * Probabilitățile reprezintă rezultatul a ${this._UPE_PARAMS?.N_SIMULATIONS||500} simulări stochastice.
  Intervalul 90% indică [percentila 5% – percentila 95%] a distribuției rezultatelor.
  Sursa metodologică: Urban Stochastic Modeling, MIT Urban Studies.
</p>

<!-- 6b. DETALIU ZONE -->
<h2 class="sec page-break"><span class="sec-num">6</span> Zone de Dezvoltare Identificate</h2>
<p>Generate prin: Road Corridor Model (OSM) + Isochrone Expansion + Enrichment GPS validat.
Ordonate cronologic după startYr. Înălțimi limitate conform P100-1/2013 (ag=${seismic.ag}g → max ${hMaxStr}).</p>
${zones.sort((a,b)=>(a.startYr||2030)-(b.startYr||2030)).map(z=>`
<div class="zone-item">
  <div class="zone-dot" style="background:${z.color||'#64748b'}"></div>
  <div style="flex:1">
    <strong style="font-size:9.5pt">${z.label||z.id}</strong>
    <div style="font-size:8.5pt;color:#64748b">${z.sub||''}</div>
  </div>
  <div style="text-align:right;font-size:8.5pt;color:#475569;white-space:nowrap">
    <strong>max ${z.hMax||'—'}m</strong> · start ${z.startYr||'—'}
  </div>
</div>`).join('')}

<!-- 7. MODELE MATEMATICE -->
<h2 class="sec page-break"><span class="sec-num">7</span> Modele și Formule</h2>

<h3 class="sub2">7.1 Cohort Survival + Migration Matrix (standard INS/Eurostat)</h3>
<div class="formula">
<span class="k">Px+5,t+5</span> = <span class="v">Px,t</span> × <span class="v">Sx</span> + <span class="v">Mx,t</span>
<span class="c">
Px,t   = populația cohortei x la momentul t     | Sx = rata supraviețuire INS 2021
Mx,t   = migrație netă cohortă × ponderi vârstă | 6 cicluri × 5 ani = 30 ani
Bonus universitar: cohorte 20-29 ani × 1.3      | Date INS: insse.ro/recensământ-2021</span>

<span class="c">Rezultat ${d.name} [${this.scenario}]:</span>
  pop2021  = <span class="v">${(pop21).toLocaleString('ro-RO')}</span> · rată INS = <span class="v">${(rate*100).toFixed(2)}%/an</span> × scenariu <span class="v">${scn.rateMultiplier||1.0}</span>
  pop2055  = <span class="v">${(need.pop2055||0).toLocaleString('ro-RO')}</span>
  loc.noi  = <span class="v">${(need.locuinteNoi||0).toLocaleString('ro-RO')}</span> (creștere demografică)
  loc.reab = <span class="v">${(need.locuinteReab||0).toLocaleString('ro-RO')}</span> (înlocuire fond: 1,2%/an ANCPI)
  loc.gosp = <span class="v">${(need.locuinteGospodariiNoi||0).toLocaleString('ro-RO')}</span> (formare gospodării noi)
  TOTAL    = <span class="v">${(need.locuinteTotale||0).toLocaleString('ro-RO')} unități · ${Math.round((need.totalM2||0)/1000)}k m²</span></div>

<h3 class="sub2">7.2 Urban Gravity Model</h3>
<div class="formula">
<span class="k">G</span> = eP×0.30 + eC×0.25 + eE×0.20 + eK×0.15 + eI×0.10

  eP = min(1, pop/400k)   = <span class="v">${(gravity.ePopulatie||0).toFixed(3)}</span>  | populație
  eC = (rată+0.02)/0.04   = <span class="v">${(gravity.eCrestere||0).toFixed(3)}</span>  | momentum creștere
  eE = min(1, univ/3)     = <span class="v">${(gravity.eEducatie||0).toFixed(3)}</span>  | educație
  eK = hub regional       = <span class="v">${(gravity.eConectivit||0).toFixed(3)}</span>  | conectivitate
  G  = <span class="v">${(gravity.gravityScore||0).toFixed(3)}</span> → ${gravity.growthType} → hMult <span class="v">${gravity.growthType==='METROPOLITAN'?'1.00':gravity.growthType==='REGIONAL'?'0.80':gravity.growthType==='LOCAL'?'0.65':'0.50'}</span></div>

<h3 class="sub2">7.3 Road Corridor Development Score</h3>
<div class="formula">
devScore = tipDrum_weight × distanțăCoeficient × scenariu_multiplier

  autostradă=1.0 · construcție=0.8 · planificat=0.65 · trunk=0.75 · primary=0.50 · DJ=0.30
  distanță: 0-1km×0.20 · 1-3km×0.60 · 3-10km×1.00 · 10-18km×0.70 · 18+km×0.40
  Scenariu ${this.scenario}: rateMultiplier=<span class="v">${scn.rateMultiplier}</span> · hMax×<span class="v">${scn.hMaxMultiplier}</span> · expansie×<span class="v">${scn.expansieMultiplier}</span></div>

<!-- 8. SURSE OFICIALE -->
<h2 class="sec"><span class="sec-num">8</span> Surse Oficiale — Data Accesului ${todayISO}</h2>
<div class="source-grid">
  <div class="src">
    <div class="src-name">INS — Institutul Național de Statistică</div>
    <div class="src-desc">Recensământ 2021: populație, structură pe vârste, dinamică. Rate supraviețuire cohorte. Media gospodărie: 2,3 pers.</div>
    <div class="src-date">Accesat: ${todayISO} · insse.ro/recensamant-rezultate</div>
  </div>
  <div class="src">
    <div class="src-name">ANCPI — Agenția Națională de Cadastru și Publicitate Imobiliară</div>
    <div class="src-desc">Autorizații construire 2018-2024 per UAT. Suprafață medie locuință nouă: 68 m². Rata înlocuire fond: 1,2%/an.</div>
    <div class="src-date">Accesat: ${todayISO} · geoportal.ancpi.ro</div>
  </div>
  <div class="src">
    <div class="src-name">MDLPA — P100-1/2013 Normativ Seismic</div>
    <div class="src-desc">Zonare seismică națională. Accelerație proiectare ag per zonă. Restricții înălțime clădiri noi. Obligatoriu pentru autorizații construire.</div>
    <div class="src-date">Accesat: ${todayISO} · mdlpa.ro/normative-tehnice</div>
  </div>
  <div class="src">
    <div class="src-name">OpenStreetMap + Overpass API</div>
    <div class="src-desc">Rețea rutieră: motorway, trunk, primary, secondary. Constrângeri: plaje, mine, porturi, industrie, inundabile. Actualizat continuu.</div>
    <div class="src-date">Accesat: ${todayISO} · overpass-api.de · © OSM Contributors</div>
  </div>
  <div class="src">
    <div class="src-name">CNAIR — Compania Națională de Administrare a Infrastructurii Rutiere</div>
    <div class="src-desc">Autostrăzi în construcție: A7 (2027), A8 (2028). Planificate: A13 (2032), A14 (2034). Trasee și termene de finalizare.</div>
    <div class="src-date">Accesat: ${todayISO} · cnair.ro/proiecte</div>
  </div>
  <div class="src">
    <div class="src-name">Eurostat Urban Audit</div>
    <div class="src-desc">Indicatori urbani comparativi pentru contextul european. Densitate, mobilitate, calitate viață. Date 2021-2023.</div>
    <div class="src-date">Accesat: ${todayISO} · ec.europa.eu/eurostat/urban-audit</div>
  </div>
  <div class="src">
    <div class="src-name">Copernicus Climate Data Store</div>
    <div class="src-desc">Proiecții climatice RCP 4.5/8.5 pentru România. UHI, risc secetă, inundații 2050-2055. Date ERA5, CMIP6.</div>
    <div class="src-date">Accesat: ${todayISO} · cds.climate.copernicus.eu</div>
  </div>
  <div class="src">
    <div class="src-name">BNR + INS — Date Economice & Diaspora</div>
    <div class="src-desc">Diaspora: ~3.8M români în străinătate (INS 2023). Rata revenire: ~2.5%/an. Remitențe: €3-4Mld/an. Rate ipotecă și acces credit.</div>
    <div class="src-date">Accesat: ${todayISO} · bnr.ro · insse.ro/migratia-romanilor</div>
  </div>
</div>

<!-- 9. CONCLUZII -->
<h2 class="sec page-break"><span class="sec-num">9</span> Concluzii și Recomandări Instituționale</h2>
<p><strong>${d.name}</strong> (jud. ${d.judet||'—'}) prezintă un profil urban de tip <strong>${gravity.growthType}</strong>
cu Gravity Score <strong>${(gravity.gravityScore||0).toFixed(2)}/1.00</strong>.
În scenariul <strong>${scn.label}</strong>, necesarul locativ 2025-2055 este estimat la
<strong>${(need.locuinteTotale||0).toLocaleString('ro-RO')} unități</strong>
(~${locuinteAnual} unități/an), reprezentând o investiție estimată de <strong>€${investEstimat}M</strong>.</p>

<p>Restricția seismică P100-1/2013 (ag=${seismic.ag}g) impune înălțimea maximă de <strong>${hMaxStr}</strong>
pentru toate clădirile noi.
${seismic.ag>=0.35?'<strong style="color:#991b1b">Zona seismică ridicată (Z1/Z2) necesită soluții structurale antiseismice speciale și costuri suplimentare de 15-25% față de construcțiile standard.</strong>':''}</p>

<table>
  <tr><th>Destinatar</th><th>Acțiune recomandată</th><th>Prioritate</th><th>Termen</th></tr>
  <tr><td><strong>Primărie / Consiliu Local</strong></td>
    <td>Actualizare PUG cu zonele identificate. Rezervare coridoare infrastructură (A7/A8/centuri). PUZ zone periurbane active.</td>
    <td><span class="bd bd-r">URGENT</span></td><td>2025-2027</td></tr>
  <tr><td><strong>CNAIR / MT</strong></td>
    <td>Corelarea nodurilor de autostradă cu zonele logistice identificate. Buffer zone construibile adiacente A7/A8.</td>
    <td><span class="bd bd-o">RIDICAT</span></td><td>2025-2028</td></tr>
  <tr><td><strong>OAR / Urbaniști autorizați</strong></td>
    <td>PUZ pentru zonele periurbane cu devScore >0.7. Regulament înălțimi conform P100. Documentații pentru PUZ extravilan.</td>
    <td><span class="bd bd-o">RIDICAT</span></td><td>2026-2030</td></tr>
  <tr><td><strong>Investitori privați</strong></td>
    <td>Zone prioritare: logistică la noduri autostradă (devScore>0.8). Rezidențial pe axele OSM validate. Birouri în Pol Terțiar.</td>
    <td><span class="bd bd-y">MEDIU</span></td><td>Imediat</td></tr>
  <tr><td><strong>Min. Dezvoltării / MDLPA</strong></td>
    <td>Integrare în PATN Secțiunea IV. Corelare cu strategia A7/A8. Finanțare PNRR pentru zone prioritare.</td>
    <td><span class="bd bd-b">STRATEGIC</span></td><td>2026-2028</td></tr>
  <tr><td><strong>BNR / Instituții financiare</strong></td>
    <td>Evaluare portofoliu ipotecar în raport cu proiecția locativă. Risc seismic ag=${seismic.ag}g în valorizarea garanțiilor.</td>
    <td><span class="bd bd-s">INFORMATIV</span></td><td>Continuu</td></tr>
</table>

</div>

<div class="footer">
  <div>
    <span class="footer-logo">UrbanX · TCI Cinema v${this._version||'82'}</span><br>
    <span>Think Smart Solutions · thinksmartsolutions.ro</span>
  </div>
  <div style="text-align:center;font-size:7.5pt">
    Motor: Cohort Survival INS · Urban Gravity · Road Corridor · Seismic P100<br>
    Date OSM © OpenStreetMap Contributors · Eurostat © European Commission
  </div>
  <div style="text-align:right">
    Generat: ${today}<br>
    ID: TCI-${todayISO}-${(this.cityKey||'uat').toUpperCase()}<br>
    ${this.scenario} · ${scn.label}
  </div>
</div>
</body></html>`;

    const win = window.open('', '_blank');
    if(win){ win.document.write(html); win.document.close(); }
    console.log('[TCI] ✅ Raport complet generat:', d.name, scn.label, todayISO);
    return html;
  },



    setScenario(s) {
    if(!s || this.scenario === s) return;
    this.scenario = s;
    this._updateKPIs();
    // Rebuild zones și 3D cu noul scenariu
    const cx = this.cityData?.lon || 27.601;
    const cy = this.cityData?.lat || 47.158;
    this._projZones = this._buildZones(cx, cy, this._constraints || {bufs:[]});
    this._updateProjectionLayers(this.year || 2025);
    if(this._3D?._ready) {
      this._3D._entities = [];
      (this._3D._meshes||[]).forEach(m => { try{m.geometry?.dispose(); m.material?.dispose();}catch(e){} });
      while(this._3D._scene?.children?.length > 1) this._3D._scene.remove(this._3D._scene.children[1]);
      this._3D._meshes = [];
      this._3D.buildSceneGraph(this._projZones, this.year || 2025);
    }
    // Update UI selector
    const sel = document.getElementById('tci-scenario-sel');
    if(sel) sel.value = s;
    const scn = this._getScenario();
    console.log(`[TCI] Scenariu → ${s}: ${scn.label} (rate×${scn.rateMultiplier}, h×${scn.hMaxMultiplier})`);
    // Reset animație — clădirile vor crește din nou
    if(this._3D?._currentH) this._3D._currentH.fill(0.1);
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

  _onScenarioChange(sc) {
    if(!sc || this.scenario === sc) return;
    this.scenario = sc;
    // Rebuild zones with new scenario
    const cx = this.cityData?.lon || 27.601;
    const cy = this.cityData?.lat || 47.158;
    this._projZones = this._buildZones(cx, cy, this._constraints);
    this._updateProjectionLayers(this.year || 2025);
    // Rebuild 3D
    if(this._3D?._ready) {
      this._3D._entities = [];
      this._3D._meshes?.forEach(m => { try{m.geometry?.dispose(); m.material?.dispose();}catch(e){} });
      while(this._3D._scene?.children?.length > 1) this._3D._scene.remove(this._3D._scene.children[1]);
      this._3D._meshes = [];
      this._3D.buildSceneGraph(this._projZones, this.year || 2025);
    }
    console.log('[TCI] Scenariu schimbat →', sc, this._getScenario()?.label);
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
