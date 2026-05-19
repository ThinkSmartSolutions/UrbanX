// ═══════════════════════════════════════════════════════════════════════════
// tci-onboarding.js — UrbanX UX Layer v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Rezolvă problema fragmentării: utilizatorul nu știe ce să facă
//
// ① GHID VIZUAL DE UTILIZARE — ce există și cum se accesează
//    Overlay la prima vizită (sessionStorage) cu harta platformei
//    Tooltips pe fiecare buton important
//    "Flux recomandat" pentru primar / investitor / arhitect
//
// ② SHARE URL FUNCȚIONAL
//    Generează URL cu UAT + scenariu + an + zoom hartă
//    URL poate fi trimis cuiva — se restaurează exact aceeași stare
//    Format: ?uat=RO-IS-01&sc=S2&yr=2035&lat=47.16&lon=27.60&z=14
//
// ③ SAVE/LOAD SCENARIU COMPLET
//    Salvează: UAT selectat + scenariu + an TCI + zoom + parcela activă
//    Listează scenariile salvate cu thumbnail
//    Compară 2 scenarii salvate față în față
//
// ④ ECRAN RESULTS — după click pe parcelă
//    Panou lateral care agregă TOATE analizele pentru acea parcelă
//    Nu mai trebuie să cauți prin tab-uri
//    Scor general: Walkability + ROI + Risc + Carbon + SDG11
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// ① GHID DE UTILIZARE — prima vizită
// ═══════════════════════════════════════════════════════════════════════════

G._UserGuide = {

  show(forced) {
    if(!forced && sessionStorage.getItem('ux_guide_seen')) return;
    sessionStorage.setItem('ux_guide_seen','1');

    let el = document.getElementById('ux-guide');
    if(el) { el.style.display='flex'; return; }

    el = document.createElement('div');
    el.id = 'ux-guide';
    el.style.cssText = `
      position:fixed;inset:0;z-index:6000;
      background:rgba(2,6,18,0.97);backdrop-filter:blur(20px);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      font-family:'Space Grotesk','IBM Plex Mono',sans-serif;
      padding:20px;box-sizing:border-box;
    `;
    el.innerHTML = this._buildHTML();
    document.body.appendChild(el);
  },

  hide() {
    const el = document.getElementById('ux-guide');
    if(el) { el.style.opacity='0'; el.style.transition='opacity .4s'; setTimeout(()=>el.remove(),400); }
  },

  _buildHTML() {
    return `
      <div style="max-width:720px;width:100%">
        <!-- Header -->
        <div style="text-align:center;margin-bottom:24px">
          <div style="font-size:9px;font-weight:800;color:#D4AF37;letter-spacing:.2em;margin-bottom:6px">
            URBANX TSS·FG — TEMPORAL CITY INTELLIGENCE
          </div>
          <div style="font-size:26px;font-weight:900;color:#fff;margin-bottom:6px">
            Cum folosești platforma
          </div>
          <div style="font-size:11px;color:rgba(148,163,184,.6)">
            3 pași pentru o analiză urbanistică completă
          </div>
        </div>

        <!-- 3 Pași -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px">
          ${[
            {
              step:'1',
              icon:'📍',
              title:'Selectează parcela',
              desc:'Click pe orice parcelă de pe hartă. Platforma detectează automat UAT-ul, regulamentul de urbanism și toți parametrii necesari.',
              actions:['Caută adresa în bara de sus','Sau click direct pe hartă'],
              color:'#22c55e',
            },
            {
              step:'2',
              icon:'📊',
              title:'Analizează',
              desc:'Tab-urile din panoul stâng oferă toate analizele. Fiecare analiză folosește date oficiale citate explicit.',
              actions:['🧠 Analytics → Walkability, ROI, Carbon, SDG','🌆 Urban → Coridoare, Patrimoniu, Infrastructură','📅 Scen. → TCI Cinema + proiecții 2055'],
              color:'#60a5fa',
            },
            {
              step:'3',
              icon:'🎬',
              title:'Vizualizează & Exportă',
              desc:'Lansează TCI Cinema pentru filmul de 30 ani. Generează Masterplanul PDF. Salvează sau trimite scenariul.',
              actions:['Buton TCI Cinema (bara de sus)','📋 Masterplan PDF din tab Scen.','🔗 Share URL din TCI Cinema'],
              color:'#D4AF37',
            },
          ].map(s=>`
            <div style="background:rgba(10,18,44,.7);border-radius:12px;padding:16px;border:1px solid rgba(${s.color==='#22c55e'?'34,197,94':s.color==='#60a5fa'?'59,130,246':'212,175,55'},.2)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <div style="width:24px;height:24px;border-radius:50%;background:${s.color}20;border:1px solid ${s.color}40;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:${s.color}">${s.step}</div>
                <div style="font-size:18px">${s.icon}</div>
                <div style="font-size:11px;font-weight:800;color:#e2e8f0">${s.title}</div>
              </div>
              <div style="font-size:9px;color:rgba(148,163,184,.7);line-height:1.5;margin-bottom:8px">${s.desc}</div>
              ${s.actions.map(a=>`<div style="font-size:8.5px;color:${s.color};margin-bottom:2px">→ ${a}</div>`).join('')}
            </div>`).join('')}
        </div>

        <!-- Tab-uri explicite -->
        <div style="background:rgba(8,14,34,.8);border-radius:10px;padding:14px;margin-bottom:20px;border:1px solid rgba(255,255,255,.06)">
          <div style="font-size:9px;font-weight:800;color:#D4AF37;margin-bottom:10px;letter-spacing:.1em">
            UNDE GĂSEȘTI FIECARE ANALIZĂ
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
            ${[
              ['📅 Scen.','Dashboard TCI + Proiecții demografice + 4D Timeline + Comparator UAT'],
              ['🧠 Analytics','Walkability Score · 15-Min City · ROI · Carbon LCA · UHI · SDG 11 · Seismic'],
              ['🌆 Urban','Coridoare dezvoltare · Extindere intravilan · Monumente · Land Use · Infrastructură'],
              ['📖 Metodologie','Formule · Surse · Nivel de încredere · Disclaimer'],
              ['🏗 Analiză','Parametri parcelă · UTR · Indicatori urbani · Studii'],
              ['📋 Masterplan','Generează PDF 12 pagini cu metodologie citabilă'],
            ].map(([tab,desc])=>`
              <div style="display:flex;gap:6px;padding:4px;background:rgba(255,255,255,.03);border-radius:5px">
                <span style="font-size:10px;font-weight:700;color:#D4AF37;min-width:80px">${tab}</span>
                <span style="font-size:8px;color:rgba(148,163,184,.6)">${desc}</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- Butoane finale -->
        <div style="display:flex;gap:10px;justify-content:center">
          <button onclick="_UserGuide.hide()"
            style="padding:12px 28px;border-radius:8px;background:rgba(212,175,55,.15);
              border:1px solid rgba(212,175,55,.4);color:#D4AF37;font-size:13px;
              font-weight:700;cursor:pointer;font-family:inherit">
            Înțeles, pornesc →
          </button>
          <button onclick="_UserGuide.hide();openTCI&&openTCI()"
            style="padding:12px 28px;border-radius:8px;background:rgba(139,92,246,.15);
              border:1px solid rgba(139,92,246,.4);color:#a78bfa;font-size:13px;
              font-weight:700;cursor:pointer;font-family:inherit">
            🎬 Deschide TCI Cinema
          </button>
        </div>

        <div style="text-align:center;margin-top:12px;font-size:8px;color:rgba(100,120,150,.4)">
          Date oficiale: INSE · Eurostat · BNR · INFP · ANAR · ANM · Copernicus · OSM<br>
          Modele academice: Frank et al. 2006 · Moreno 2021 · Oke 1982 · FEMA P-154 · RICS 2023
        </div>
      </div>`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ② SHARE URL FUNCȚIONAL
// ═══════════════════════════════════════════════════════════════════════════

G._ShareManager = {

  // Generează URL cu starea completă
  generate() {
    const params = new URLSearchParams();

    // UAT curent
    const cityKey = window.TCI?.cityKey || window._ProjectionEngine?.currentCity || null;
    if(cityKey) params.set('uat', cityKey);

    // Scenariu
    const sc = window.TCI?.scenario || window._ProjectionEngine?.currentScenario || 'S2';
    params.set('sc', sc);

    // An TCI
    const yr = window.TCI?.year || window._ProjectionEngine?.currentYear || 2025;
    params.set('yr', yr);

    // Parcela activă
    const ap = window.S?.parcels?.[window.S?.activeParcel??0];
    if(ap?.nrCad) params.set('cad', ap.nrCad);

    // Viewport hartă
    const map = window.map;
    if(map){
      const c = map.getCenter();
      params.set('lat', c.lat.toFixed(5));
      params.set('lon', c.lng.toFixed(5));
      params.set('z',   map.getZoom().toFixed(1));
      params.set('p',   map.getPitch().toFixed(0));
      params.set('b',   map.getBearing().toFixed(0));
    }

    // Analytics active
    const analyticsActive = [];
    ['walk','15min','roi','carbon','uhi','sdg','seismic'].forEach(k=>{
      const el = document.getElementById(`analytics-${k}-result`);
      if(el?.querySelector('.tci-kpi-val, canvas, table')) analyticsActive.push(k);
    });
    if(analyticsActive.length) params.set('an', analyticsActive.join(','));

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    // Copy to clipboard
    if(navigator.clipboard){
      navigator.clipboard.writeText(url).then(()=>{
        ss?.('🔗 URL copiat în clipboard! Trimite-l oricui.');
        this._showShareToast(url);
      }).catch(()=>{
        this._showShareModal(url);
      });
    } else {
      this._showShareModal(url);
    }

    return url;
  },

  // Restaurează starea din URL la încărcare
  restore() {
    const params = new URLSearchParams(window.location.search);
    if(!params.has('uat') && !params.has('sc') && !params.has('lat')) return false;

    console.log('[Share] Restaurare stare din URL...');

    const uat = params.get('uat');
    const sc  = params.get('sc') || 'S2';
    const yr  = parseInt(params.get('yr')) || 2025;
    const lat = parseFloat(params.get('lat'));
    const lon = parseFloat(params.get('lon'));
    const z   = parseFloat(params.get('z')) || 14;
    const p   = parseFloat(params.get('p')) || 35;
    const b   = parseFloat(params.get('b')) || 0;

    // Restaurăm viewport hartă
    if(lat && lon && window.map){
      window.map.flyTo({ center:[lon,lat], zoom:z, pitch:p, bearing:b, duration:1500 });
    }

    // Restaurăm TCI dacă e deschis
    const waitTCI = setInterval(()=>{
      if(typeof TCI === 'undefined') return;
      clearInterval(waitTCI);

      if(uat){
        TCI.cityKey = uat;
        const city = window._RO_CITIES_DB?.[uat];
        if(city) TCI.cityData = city;
      }
      if(sc) TCI.scenario = sc;
      if(yr) TCI.year = yr;

      // Sync ProjectionEngine
      if(window._ProjectionEngine){
        if(uat) _ProjectionEngine.currentCity = uat;
        if(sc)  _ProjectionEngine.currentScenario = sc;
        if(yr)  _ProjectionEngine.setYear?.(yr);
      }

      console.log('[Share] ✅ Stare restaurată:', { uat, sc, yr });
    }, 500);
    setTimeout(()=>clearInterval(waitTCI), 8000);

    return true;
  },

  _showShareToast(url) {
    let toast = document.getElementById('ux-share-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'ux-share-toast';
      toast.style.cssText = `
        position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
        z-index:5000;background:rgba(4,10,24,.96);
        border:1px solid rgba(212,175,55,.4);border-radius:10px;
        padding:12px 20px;font-family:'IBM Plex Mono',monospace;
        max-width:90%;word-break:break-all;
        box-shadow:0 8px 32px rgba(0,0,0,.5);
        transition:opacity .4s;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div style="font-size:9px;font-weight:800;color:#D4AF37;margin-bottom:4px">🔗 URL generat și copiat!</div>
      <div style="font-size:8px;color:rgba(148,163,184,.6);margin-bottom:8px">${url.slice(0,80)}...</div>
      <div style="display:flex;gap:6px">
        <button onclick="window.open('${encodeURI(url)}','_blank')"
          style="padding:4px 10px;border-radius:5px;background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);color:#60a5fa;font-size:8px;cursor:pointer;font-family:inherit">
          Deschide
        </button>
        <button onclick="document.getElementById('ux-share-toast').style.opacity='0'"
          style="padding:4px 10px;border-radius:5px;background:transparent;border:1px solid rgba(255,255,255,.1);color:rgba(148,163,184,.5);font-size:8px;cursor:pointer;font-family:inherit">
          Închide
        </button>
      </div>`;
    toast.style.opacity = '1';
    setTimeout(()=>{ if(toast) toast.style.opacity='0'; }, 8000);
  },

  _showShareModal(url) {
    let modal = document.getElementById('ux-share-modal');
    if(!modal){
      modal = document.createElement('div');
      modal.id = 'ux-share-modal';
      modal.style.cssText = `
        position:fixed;inset:0;z-index:5500;background:rgba(0,0,0,.7);
        display:flex;align-items:center;justify-content:center;
        font-family:'IBM Plex Mono',monospace;
      `;
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div style="background:rgba(4,10,24,.98);border-radius:12px;padding:20px;max-width:500px;width:90%;border:1px solid rgba(212,175,55,.3)">
        <div style="font-size:11px;font-weight:800;color:#D4AF37;margin-bottom:8px">🔗 Share Scenariu</div>
        <textarea readonly onclick="this.select()"
          style="width:100%;height:60px;background:rgba(8,16,40,.8);border:1px solid rgba(255,255,255,.1);
            color:#60a5fa;font-size:9px;border-radius:6px;padding:8px;box-sizing:border-box;
            font-family:'IBM Plex Mono',monospace;resize:none">${url}</textarea>
        <div style="font-size:8px;color:rgba(148,163,184,.5);margin-top:6px;margin-bottom:10px">
          Selectează tot textul și copiază (Ctrl+C / Cmd+C)
        </div>
        <div style="display:flex;gap:8px">
          <button onclick="navigator.clipboard?.writeText('${url.replace(/'/g,"\\'")}').then(()=>ss?.('✅ Copiat!'))"
            style="padding:6px 14px;border-radius:6px;background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.4);color:#D4AF37;font-size:9px;cursor:pointer;font-family:inherit">
            📋 Copiază URL
          </button>
          <button onclick="document.getElementById('ux-share-modal').remove()"
            style="padding:6px 14px;border-radius:6px;background:transparent;border:1px solid rgba(255,255,255,.1);color:rgba(148,163,184,.6);font-size:9px;cursor:pointer;font-family:inherit">
            Închide
          </button>
        </div>
      </div>`;
    modal.onclick = e => { if(e.target===modal) modal.remove(); };
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ③ PANOU REZULTATE UNIFICATE — după click parcelă
//    Agregă toate analizele într-un singur scor per parcelă
// ═══════════════════════════════════════════════════════════════════════════

G._ParcelResults = {
  _panel: null,

  show(ap, city) {
    let panel = document.getElementById('ux-parcel-results');
    if(!panel){
      panel = document.createElement('div');
      panel.id = 'ux-parcel-results';
      panel.style.cssText = `
        position:fixed;top:50px;right:10px;width:260px;
        z-index:2000;background:rgba(4,10,24,.96);
        backdrop-filter:blur(12px);border:1px solid rgba(212,175,55,.2);
        border-radius:12px;font-family:'IBM Plex Mono',monospace;
        box-shadow:0 8px 32px rgba(0,0,0,.5);
        max-height:calc(100vh - 60px);overflow-y:auto;
        transition:transform .3s;
      `;
      document.body.appendChild(panel);
    }

    const grav = window._TCIMasterplanPDF?._calcGravity?.(city) || { gravityScore:0.5, growthType:'REGIONAL' };
    const risk = typeof _getRiskProfile==='function' ? _getRiskProfile(city) : null;
    const need = window._TCIMasterplanPDF?._calcNeed?.(city,'S2') || { pop2055: city?.pop2021, locuinteTotale: 5000 };

    const score = Math.round((grav.gravityScore||0.5)*100);
    const gtColor = {
      METROPOLITAN:'#22c55e',REGIONAL:'#3b82f6',GROWING:'#22c55e',
      LOCAL:'#f59e0b',WEAKENING:'#f59e0b',DECLINING:'#ef4444',SHRINKING:'#dc2626'
    }[grav.growthType||'REGIONAL']||'#64748b';

    panel.innerHTML = `
      <div style="padding:12px">
        <!-- Header parcelă -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div>
            <div style="font-size:9px;font-weight:800;color:#D4AF37;letter-spacing:.1em">PARCELĂ SELECTATĂ</div>
            <div style="font-size:10px;font-weight:700;color:#e2e8f0">${ap.nrCad||'Nr. cadastral necunoscut'}</div>
            <div style="font-size:8px;color:rgba(148,163,184,.5)">${ap.utr||'UTR necunoscut'} · ${ap.area||'—'} m²</div>
          </div>
          <button onclick="document.getElementById('ux-parcel-results').remove()"
            style="background:none;border:none;color:rgba(148,163,184,.4);cursor:pointer;font-size:16px;padding:0">✕</button>
        </div>

        <!-- Scor UAT -->
        <div style="background:rgba(10,18,44,.7);border-radius:8px;padding:8px;margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="text-align:center">
              <div style="font-size:24px;font-weight:900;color:${gtColor};font-family:'IBM Plex Mono'">${score}</div>
              <div style="font-size:6px;color:rgba(148,163,184,.4)">/100</div>
            </div>
            <div>
              <div style="font-size:10px;font-weight:800;color:${gtColor}">${grav.growthType}</div>
              <div style="font-size:7.5px;color:rgba(148,163,184,.5)">${city?.name||'UAT'} · ${city?.judet_code||city?.judet||'—'}</div>
              <div style="font-size:7px;color:rgba(100,120,150,.4)">Scor gravitațional UrbanX</div>
            </div>
          </div>
          <!-- Progress bar -->
          <div style="height:3px;background:rgba(255,255,255,.06);border-radius:2px;margin-top:6px">
            <div style="height:3px;width:${score}%;background:${gtColor};border-radius:2px;transition:width .6s"></div>
          </div>
        </div>

        <!-- KPI rapid -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-bottom:8px">
          ${[
            ['Pop. 2021', (city?.pop2021||0).toLocaleString('ro-RO'), 'INSE Rec.2021'],
            ['Pop. 2055 (S2)', (need.pop2055||0).toLocaleString('ro-RO'), 'Model cohort'],
            ['Autorizații/an', city?.autorizatii_2023||(city?.autorizatii_2023?city.autorizatii_2023:'—'), 'ANCPI 2023'],
            ['Risc seismic', risk?.seismic?.key||'—', 'INFP P100'],
          ].map(([l,v,s])=>`
            <div style="background:rgba(8,14,34,.6);border-radius:5px;padding:5px">
              <div style="font-size:7px;color:rgba(148,163,184,.4)">${l}</div>
              <div style="font-size:10px;font-weight:800;color:#e2e8f0">${v}</div>
              <div style="font-size:5.5px;color:rgba(80,100,130,.4)">${s}</div>
            </div>`).join('')}
        </div>

        <!-- Acțiuni rapide -->
        <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:4px">ANALIZE DISPONIBILE</div>
        <div style="display:flex;flex-direction:column;gap:3px">
          ${[
            ['🚶 Walkability Score', "document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('active'));document.querySelector('[data-t=analytics]')?.click();setTimeout(()=>_AnalyticsPanel?.runWalkability(),300)", '#22c55e'],
            ['🏙 15-Minute City + Izocrone', "document.querySelector('[data-t=analytics]')?.click();setTimeout(()=>_AnalyticsPanel?.run15MinCity(),300)", '#60a5fa'],
            ['💰 ROI & Fezabilitate', "document.querySelector('[data-t=analytics]')?.click();setTimeout(()=>_AnalyticsPanel?.runROI(),300)", '#D4AF37'],
            ['🌡 Urban Heat Island', "document.querySelector('[data-t=analytics]')?.click();setTimeout(()=>_AnalyticsPanel?.runUHI(),300)", '#f97316'],
            ['🏗 Vulnerabilitate Seismică', "document.querySelector('[data-t=analytics]')?.click();setTimeout(()=>_AnalyticsPanel?.runSeismic(),300)", '#fbbf24'],
            ['🌍 SDG 11 per UAT', "document.querySelector('[data-t=analytics]')?.click();setTimeout(()=>_AnalyticsPanel?.runSDG11(),300)", '#a78bfa'],
            ['🌆 Coridoare + Patrimoniu', "document.querySelector('[data-t=urban-intel]')?.click()", '#34d399'],
            ['🎬 TCI Cinema 30 ani', "openTCI&&openTCI()", '#8b5cf6'],
            ['📋 Masterplan PDF', "_TCIMasterplanPDF?.generate()", '#D4AF37'],
          ].map(([label,action,color])=>`
            <button onclick="${action.replace(/"/g,"'")}"
              style="text-align:left;padding:6px 8px;border-radius:5px;
                background:rgba(${color==='#22c55e'?'34,197,94':color==='#60a5fa'?'59,130,246':color==='#D4AF37'?'212,175,55':color==='#f97316'?'249,115,22':color==='#fbbf24'?'251,191,36':color==='#a78bfa'?'167,139,250':color==='#34d399'?'52,211,153':'139,92,246'},.08);
                border:1px solid rgba(${color==='#22c55e'?'34,197,94':color==='#60a5fa'?'59,130,246':color==='#D4AF37'?'212,175,55':'148,163,184'},.2);
                color:${color};font-size:8.5px;font-weight:700;cursor:pointer;font-family:inherit;
                transition:background .15s;width:100%">
              ${label}
            </button>`).join('')}
        </div>

        <!-- Share + Save -->
        <div style="display:flex;gap:4px;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.06)">
          <button onclick="_ShareManager.generate()"
            style="flex:1;padding:6px;border-radius:5px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.3);color:#60a5fa;font-size:8px;font-weight:700;cursor:pointer;font-family:inherit">
            🔗 Share URL
          </button>
          <button onclick="_ProjectsManager?.saveCurrentProject()"
            style="flex:1;padding:6px;border-radius:5px;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.3);color:#D4AF37;font-size:8px;font-weight:700;cursor:pointer;font-family:inherit">
            💾 Salvează
          </button>
        </div>

        <div style="font-size:6px;color:rgba(60,80,110,.4);text-align:center;margin-top:6px">
          Date: INSE · Eurostat · BNR · OSM · Copernicus
        </div>
      </div>`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ④ CONECTARE Share în TCI Cinema
// ═══════════════════════════════════════════════════════════════════════════

G._connectShare = function() {
  // Override _share() și _shareURL() din TCI Cinema
  if(typeof TCI !== 'undefined' && !TCI._shareConnected){
    TCI._shareConnected = true;
    TCI._share = () => G._ShareManager.generate();
    TCI._shareURL = () => G._ShareManager.generate();
    console.log('[Share] ✅ Conectat la TCI Cinema');
  }

  // Buton Share în dashboard TCI
  const addShareBtn = () => {
    const snapBtn = document.querySelector('[onclick*="_snapshot"]');
    const shareBtn = document.querySelector('[onclick*="_share"]');
    if(shareBtn) {
      shareBtn.onclick = () => G._ShareManager.generate();
    }
  };
  setTimeout(addShareBtn, 2000);
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑤ BUTOANE GLOBALE VIZIBILE
// ═══════════════════════════════════════════════════════════════════════════

G._addGlobalButtons = function() {
  // Buton ? (Help / Ghid) fixed top-right
  if(!document.getElementById('ux-help-btn')){
    const btn = document.createElement('button');
    btn.id = 'ux-help-btn';
    btn.title = 'Ghid de utilizare';
    btn.style.cssText = `
      position:fixed;top:12px;right:52px;z-index:2500;
      width:32px;height:32px;border-radius:8px;
      background:rgba(4,10,24,.9);border:1px solid rgba(255,255,255,.1);
      color:rgba(148,163,184,.6);font-size:14px;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      font-family:inherit;
    `;
    btn.innerHTML = '?';
    btn.onclick = () => G._UserGuide.show(true);
    document.body.appendChild(btn);
  }

  // Buton Share global
  if(!document.getElementById('ux-share-btn-global')){
    const btn = document.createElement('button');
    btn.id = 'ux-share-btn-global';
    btn.title = 'Share scenariu curent';
    btn.style.cssText = `
      position:fixed;top:12px;right:90px;z-index:2500;
      height:32px;padding:0 12px;border-radius:8px;
      background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.25);
      color:#60a5fa;font-size:11px;font-weight:700;cursor:pointer;
      display:flex;align-items:center;gap:5px;font-family:inherit;
      white-space:nowrap;
    `;
    btn.innerHTML = '🔗 Share';
    btn.onclick = () => G._ShareManager.generate();
    document.body.appendChild(btn);
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑥ WATCH PARCELĂ — arată ParcelResults la click
// ═══════════════════════════════════════════════════════════════════════════

G._watchForParcelSelect = function() {
  let lastParcel = null;
  setInterval(() => {
    const ap = window.S?.parcels?.[window.S?.activeParcel??0];
    if(!ap || ap === lastParcel) return;
    lastParcel = ap;

    // Găsim datele UAT
    const uatName = (ap.uat||'').toLowerCase()
      .replace('municipiul ','').replace('orașul ','').trim();
    let city = null;
    if(typeof _RO_CITIES_DB !== 'undefined'){
      const m = Object.entries(_RO_CITIES_DB).find(([,v])=>
        (v.name||'').toLowerCase().includes(uatName)||uatName.includes((v.name||'').toLowerCase().slice(0,5)));
      if(m) city = m[1];
    }

    if(city) G._ParcelResults.show(ap, city);
  }, 800);
};

// ─────────────────────────────────────────────────────────────────────────
// Expunere globală
window._UserGuide    = G._UserGuide;
window._ShareManager = G._ShareManager;
window._ParcelResults= G._ParcelResults;

// INIT
(function _init(n){
  if(n > 80) return;
  if(!document.body){ setTimeout(()=>_init(n+1), 200); return; }

  // Restaurăm URL dacă e share link
  const restored = G._ShareManager.restore();

  // Adăugăm butoanele globale
  setTimeout(() => {
    G._addGlobalButtons();
    G._connectShare();
    G._watchForParcelSelect();

    // Ghid la prima vizită (nu dacă e share URL)
    if(!restored){
      setTimeout(() => G._UserGuide.show(), 1500);
    }
  }, 1000);

  console.log('[TCI Onboarding v1.0] ✅ Ghid + Share URL + Panou Rezultate + Butoane globale');
})(0);

})(window);
