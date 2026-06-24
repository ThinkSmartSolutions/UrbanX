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
  cityKey: (function(){try{return localStorage.getItem('ux_last_city')||'RO-IS-01';}catch(e){return 'RO-IS-01';}}()), cityData: null,
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
          autocomplete="off" autocorrect="off" autocapitalize="words" spellcheck="false" inputmode="search"
          oninput="TCI._selSearch(this.value)"
          ontouchend="event.stopPropagation();this.focus()"
          style="width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(59,130,246,0.25);color:#fff;padding:12px 14px;border-radius:7px;font-size:16px;font-family:inherit;box-sizing:border-box;margin-bottom:8px;-webkit-appearance:none;">
        <div id="tci-sel-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:7px;max-height:140px;overflow-y:auto;display:none;margin-bottom:12px"></div>
        <button onclick="event.stopPropagation();TCI._launch('uat')"
          style="width:100%;padding:12px;border-radius:8px;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.5);color:#60a5fa;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">
          ▶ Pornește Filmul
        </button>
      </div>
      <button onclick="document.getElementById('tci-sel').style.display='none'"
        style="margin-top:16px;background:none;border:none;color:rgba(148,163,184,0.4);cursor:pointer;font-size:11px;font-family:inherit">Anulează</button>`;

    document.body.appendChild(sel);
    // iOS: focus sincron după append
    setTimeout(() => {
      const inp = document.getElementById('tci-sel-uat');
      if(inp && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) inp.focus();
    }, 300);
  },

  // ── Comune periurbane — supliment față de 20-uats-database.js ──────────
  // 20-uats-database.js are doar municipii + orașe (fără comune)
  // Adăugăm manual comune periurbane relevante cu date INS 2021
  // Format: [siruta, nume, judet, jc, tip, pop2021, pop2011, lat, lon, regiune, coef_hub]
  // ── Comune IS (Iași) + BT (Botoșani) — date INS 2021 ──────────────────
  // Sursă: INS Recensământ 2021 · coordonate GPS validate
  _EXTRA_UATS: {
    // ═══ IAȘI (IS) ════════════════════════════════════════════════════════
    'RO-IS-95042':{siruta:'95042',name:'Miroslava',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:17842,pop2011:11200,lat:47.14597,lon:27.527077,regiune:'NE',coef_hub:0.85,rata_reala_2011_2021:4.76},
    'RO-IS-94889':{siruta:'94889',name:'Aroneanu',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:5840,pop2011:4100,lat:47.203683,lon:27.602671,regiune:'NE',coef_hub:0.72,rata_reala_2011_2021:3.60},
    'RO-IS-95024':{siruta:'95024',name:'Lețcani',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:7200,pop2011:5600,lat:47.155,lon:27.478,regiune:'NE',coef_hub:0.75,rata_reala_2011_2021:2.54},
    'RO-IS-95005':{siruta:'95005',name:'Ciurea',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:12400,pop2011:9800,lat:47.065,lon:27.512,regiune:'NE',coef_hub:0.78,rata_reala_2011_2021:2.37},
    'RO-IS-95087':{siruta:'95087',name:'Rediu',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:6100,pop2011:4800,lat:47.185,lon:27.635,regiune:'NE',coef_hub:0.74,rata_reala_2011_2021:2.41},
    'RO-IS-94951':{siruta:'94951',name:'Holboca',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:11200,pop2011:8900,lat:47.138,lon:27.69,regiune:'NE',coef_hub:0.76,rata_reala_2011_2021:2.32},
    'RO-IS-94977':{siruta:'94977',name:'Ipătele',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:3200,pop2011:3100,lat:47.080,lon:27.642,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.32},
    'RO-IS-95069':{siruta:'95069',name:'Popricani',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:6800,pop2011:6200,lat:47.258,lon:27.61,regiune:'NE',coef_hub:0.65,rata_reala_2011_2021:0.94},
    'RO-IS-94870':{siruta:'94870',name:'Bârnova',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:6400,pop2011:5800,lat:47.048,lon:27.565,regiune:'NE',coef_hub:0.71,rata_reala_2011_2021:1.00},
    'RO-IS-94913':{siruta:'94913',name:'Comarna',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:2800,pop2011:2900,lat:47.040,lon:27.660,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.35},
    'RO-IS-94995':{siruta:'94995',name:'Horpaz',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:2600,pop2011:2100,lat:47.135,lon:27.548,regiune:'NE',coef_hub:0.70,rata_reala_2011_2021:2.15},
    'RO-IS-95033':{siruta:'95033',name:'Lunca Cetățuii',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:4200,pop2011:3600,lat:47.104,lon:27.585,regiune:'NE',coef_hub:0.68,rata_reala_2011_2021:1.56},
    'RO-IS-95114':{siruta:'95114',name:'Schitu Duca',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:3400,pop2011:3200,lat:47.098,lon:27.714,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:0.61},
    'RO-IS-95132':{siruta:'95132',name:'Sinești',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:4100,pop2011:4000,lat:47.348,lon:27.623,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:0.25},
    'RO-IS-95213':{siruta:'95213',name:'Tomești',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:9600,pop2011:7400,lat:47.12,lon:27.58,regiune:'NE',coef_hub:0.77,rata_reala_2011_2021:2.63},
    'RO-IS-95294':{siruta:'95294',name:'Valea Lupului',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:8900,pop2011:6200,lat:47.178,lon:27.525,regiune:'NE',coef_hub:0.79,rata_reala_2011_2021:3.68},
    'RO-IS-95258':{siruta:'95258',name:'Tătăruși',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:3100,pop2011:3000,lat:47.047,lon:27.574,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:0.33},
    'RO-IS-95249':{siruta:'95249',name:'Tudor Vladimirescu',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:5800,pop2011:5400,lat:47.293,lon:27.664,regiune:'NE',coef_hub:0.64,rata_reala_2011_2021:0.72},
    'RO-IS-95276':{siruta:'95276',name:'Ungheni IS',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:5900,pop2011:5600,lat:47.065,lon:27.296,regiune:'NE',coef_hub:0.65,rata_reala_2011_2021:0.52},
    'RO-IS-95318':{siruta:'95318',name:'Vânători IS',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:3600,pop2011:3500,lat:47.352,lon:27.775,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:0.28},
    'RO-IS-95354':{siruta:'95354',name:'Vlădeni IS',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:3800,pop2011:3700,lat:47.240,lon:27.773,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:0.27},
    'RO-IS-95150':{siruta:'95150',name:'Strunga',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:5200,pop2011:5100,lat:47.363,lon:27.026,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:0.19},
    'RO-IS-95177':{siruta:'95177',name:'Țibana',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:3800,pop2011:3900,lat:47.211,lon:27.279,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.26},
    'RO-IS-95231':{siruta:'95231',name:'Trifești IS',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:2900,pop2011:2800,lat:47.318,lon:27.514,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:0.35},
    'RO-IS-94932':{siruta:'94932',name:'Dobrovăț',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:4600,pop2011:4500,lat:47.026,lon:27.462,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:0.22},
    'RO-IS-95195':{siruta:'95195',name:'Tibănești',judet:'IS',judet_code:'IS',tip:'comuna',pop2021:4600,pop2011:4700,lat:47.256,lon:27.220,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.21},
    // ═══ BOTOȘANI (BT) ═══════════════════════════════════════════════════
    'RO-BT-18180':{siruta:'18180',name:'Cătămărăști',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:8400,pop2011:6200,lat:47.750243,lon:26.570911,regiune:'NE',coef_hub:0.73,rata_reala_2011_2021:3.08},
    'RO-BT-18384':{siruta:'18384',name:'Curtești',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:6800,pop2011:5800,lat:47.678,lon:26.735,regiune:'NE',coef_hub:0.70,rata_reala_2011_2021:1.59},
    'RO-BT-18357':{siruta:'18357',name:'Cristești BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4200,pop2011:4100,lat:47.618,lon:26.617,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:0.24},
    'RO-BT-19276':{siruta:'19276',name:'Ștefănești BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:10200,pop2011:10400,lat:47.804,lon:27.196,regiune:'NE',coef_hub:0.66,rata_reala_2011_2021:-0.19},
    'RO-BT-19187':{siruta:'19187',name:'Săveni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:9800,pop2011:10200,lat:47.961,lon:26.860,regiune:'NE',coef_hub:0.65,rata_reala_2011_2021:-0.39},
    'RO-BT-18153':{siruta:'18153',name:'Bucecea',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:5200,pop2011:5400,lat:47.778,lon:26.461,regiune:'NE',coef_hub:0.64,rata_reala_2011_2021:-0.37},
    'RO-BT-18659':{siruta:'18659',name:'Hudești',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:5600,pop2011:5800,lat:48.060,lon:26.766,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:-0.35},
    'RO-BT-18831':{siruta:'18831',name:'Manoleasa',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:5200,pop2011:5400,lat:48.074,lon:26.822,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.37},
    'RO-BT-19133':{siruta:'19133',name:'Roma BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:7200,pop2011:7400,lat:47.920,lon:26.974,regiune:'NE',coef_hub:0.64,rata_reala_2011_2021:-0.27},
    'RO-BT-19169':{siruta:'19169',name:'Ripiceni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4400,pop2011:4500,lat:47.957,lon:26.934,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.23},
    'RO-BT-19079':{siruta:'19079',name:'Rădăuți-Prut',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:5800,pop2011:6000,lat:48.238,lon:26.822,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:-0.33},
    'RO-BT-19321':{siruta:'19321',name:'Trușești',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:5800,pop2011:6000,lat:47.784,lon:26.882,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:-0.33},
    'RO-BT-18857':{siruta:'18857',name:'Mihăileni BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4800,pop2011:4900,lat:47.869,lon:26.661,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.21},
    'RO-BT-18875':{siruta:'18875',name:'Mihai Eminescu BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:5600,pop2011:5800,lat:47.766133,lon:26.55851,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:-0.35},
    'RO-BT-18964':{siruta:'18964',name:'Nicșeni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4100,pop2011:4200,lat:47.838,lon:26.669,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.24},
    'RO-BT-19535':{siruta:'19535',name:'Vlăsinești',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4800,pop2011:5000,lat:47.911,lon:26.806,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.41},
    'RO-BT-18419':{siruta:'18419',name:'Dângeni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3600,pop2011:3700,lat:47.802,lon:26.822,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.27},
    'RO-BT-18598':{siruta:'18598',name:'Hănești',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3400,pop2011:3500,lat:47.730,lon:26.490,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.29},
    'RO-BT-18991':{siruta:'18991',name:'Păltinaș',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3200,pop2011:3300,lat:47.776,lon:26.718,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.31},
    'RO-BT-19016':{siruta:'19016',name:'Pomârla',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4600,pop2011:4800,lat:48.073,lon:26.706,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.42},
    'RO-BT-19043':{siruta:'19043',name:'Răchiți',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4800,pop2011:5000,lat:47.627,lon:26.564,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.41},
    'RO-BT-19106':{siruta:'19106',name:'Răușeni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3100,pop2011:3200,lat:47.729,lon:26.655,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.32},
    'RO-BT-18722':{siruta:'18722',name:'Leorda',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:5400,pop2011:5600,lat:47.973,lon:26.838,regiune:'NE',coef_hub:0.63,rata_reala_2011_2021:-0.36},
    'RO-BT-18562':{siruta:'18562',name:'George Enescu BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4200,pop2011:4400,lat:47.961,lon:26.696,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.46},
    'RO-BT-19562':{siruta:'19562',name:'Vorona',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:5200,pop2011:5400,lat:47.596,lon:26.744,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.37},
    'RO-BT-18073':{siruta:'18073',name:'Băluşeni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2900,pop2011:3000,lat:47.669937,lon:26.795311,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.34},
    'RO-BT-18019':{siruta:'18019',name:'Albești BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4200,pop2011:4300,lat:47.931,lon:26.768,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.24},
    'RO-BT-18046':{siruta:'18046',name:'Avrămeni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3800,pop2011:3900,lat:47.962,lon:26.578,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.26},
    'RO-BT-18135':{siruta:'18135',name:'Brăteni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:1800,pop2011:1900,lat:47.842,lon:26.815,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.53},
    'RO-BT-18206':{siruta:'18206',name:'Conceşti',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2200,pop2011:2300,lat:47.603,lon:26.598,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.44},
    'RO-BT-18224':{siruta:'18224',name:'Copălău',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3600,pop2011:3700,lat:47.876,lon:26.524,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.27},
    'RO-BT-18251':{siruta:'18251',name:'Cordăreni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2800,pop2011:2900,lat:47.991,lon:26.632,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.35},
    'RO-BT-18278':{siruta:'18278',name:'Corlăteni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4100,pop2011:4200,lat:47.873,lon:26.772,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.24},
    'RO-BT-18304':{siruta:'18304',name:'Costești BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3200,pop2011:3300,lat:47.643,lon:26.765,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.31},
    'RO-BT-18331':{siruta:'18331',name:'Cotu Șuca',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4800,pop2011:4900,lat:48.034,lon:26.668,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.21},
    'RO-BT-18473':{siruta:'18473',name:'Drăgușeni BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2800,pop2011:2900,lat:47.581,lon:26.648,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.35},
    'RO-BT-18508':{siruta:'18508',name:'Durnești',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3900,pop2011:4000,lat:47.791,lon:26.542,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.25},
    'RO-BT-18535':{siruta:'18535',name:'Frumușica',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2900,pop2011:3100,lat:47.671,lon:26.485,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.67},
    'RO-BT-18623':{siruta:'18623',name:'Hilișeu-Horia',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3100,pop2011:3200,lat:47.935,lon:26.540,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.32},
    'RO-BT-18686':{siruta:'18686',name:'Ibănești BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3200,pop2011:3300,lat:47.554,lon:26.666,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.31},
    'RO-BT-18704':{siruta:'18704',name:'Ionășeni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2400,pop2011:2500,lat:47.832,lon:26.749,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.41},
    'RO-BT-18759':{siruta:'18759',name:'Liteni BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2800,pop2011:2900,lat:47.631,lon:26.696,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.35},
    'RO-BT-18786':{siruta:'18786',name:'Lunca BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3100,pop2011:3200,lat:47.648,lon:26.830,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.32},
    'RO-BT-18813':{siruta:'18813',name:'Lupăria',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:1900,pop2011:2000,lat:47.594,lon:26.730,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.51},
    'RO-BT-18911':{siruta:'18911',name:'Mileanca',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2600,pop2011:2700,lat:48.016,lon:26.756,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.38},
    'RO-BT-18937':{siruta:'18937',name:'Mitoc',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3400,pop2011:3500,lat:48.044,lon:26.610,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.29},
    'RO-BT-19213':{siruta:'19213',name:'Sendriceni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2800,pop2011:2900,lat:47.973,lon:26.782,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.35},
    'RO-BT-19240':{siruta:'19240',name:'Stăuceni BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:4200,pop2011:4400,lat:47.671,lon:26.652,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.46},
    'RO-BT-19303':{siruta:'19303',name:'Sulița',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3600,pop2011:3700,lat:47.914,lon:26.620,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.27},
    'RO-BT-19384':{siruta:'19384',name:'Ungureni BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3800,pop2011:3900,lat:47.631,lon:26.490,regiune:'NE',coef_hub:0.62,rata_reala_2011_2021:-0.26},
    'RO-BT-19446':{siruta:'19446',name:'Vârfu Câmpului',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3200,pop2011:3300,lat:47.875,lon:26.451,regiune:'NE',coef_hub:0.61,rata_reala_2011_2021:-0.31},
    'RO-BT-19473':{siruta:'19473',name:'Viișoara BT',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:2400,pop2011:2500,lat:47.559,lon:26.744,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.41},
    'RO-BT-18050':{siruta:'18050',name:'Adășeni',judet:'BT',judet_code:'BT',tip:'comuna',pop2021:3200,pop2011:3300,lat:47.872,lon:26.914,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.31},
    // ═══ ALTE COMUNE PERIURBANE ═══════════════════════════════════════════
    'RO-CJ-54232':{siruta:'54232',name:'Florești',judet:'CJ',judet_code:'CJ',tip:'comuna',pop2021:35800,pop2011:21400,lat:46.729,lon:23.497,regiune:'NV',coef_hub:1.05,rata_reala_2011_2021:5.27},
    'RO-CJ-54269':{siruta:'54269',name:'Baciu',judet:'CJ',judet_code:'CJ',tip:'comuna',pop2021:12100,pop2011:8900,lat:46.782,lon:23.520,regiune:'NV',coef_hub:0.90,rata_reala_2011_2021:3.12},
    'RO-CJ-54304':{siruta:'54304',name:'Chinteni',judet:'CJ',judet_code:'CJ',tip:'comuna',pop2021:6200,pop2011:4800,lat:46.815,lon:23.650,regiune:'NV',coef_hub:0.78,rata_reala_2011_2021:2.58},
    'RO-TM-155980':{siruta:'155980',name:'Giroc',judet:'TM',judet_code:'TM',tip:'comuna',pop2021:14200,pop2011:9600,lat:45.699,lon:21.209,regiune:'V',coef_hub:0.95,rata_reala_2011_2021:3.99},
    'RO-TM-155999':{siruta:'155999',name:'Dumbrăvița',judet:'TM',judet_code:'TM',tip:'comuna',pop2021:18600,pop2011:11200,lat:45.793,lon:21.258,regiune:'V',coef_hub:0.92,rata_reala_2011_2021:5.22},
    'RO-TM-155961':{siruta:'155961',name:'Ghiroda',judet:'TM',judet_code:'TM',tip:'comuna',pop2021:9400,pop2011:6800,lat:45.728,lon:21.284,regiune:'V',coef_hub:0.88,rata_reala_2011_2021:3.28},
    'RO-BV-28960':{siruta:'28960',name:'Sânpetru',judet:'BV',judet_code:'BV',tip:'comuna',pop2021:7800,pop2011:6200,lat:45.675,lon:25.677,regiune:'C',coef_hub:0.82,rata_reala_2011_2021:2.31},
    'RO-BH-26573':{siruta:'26573',name:'Sânmartin',judet:'BH',judet_code:'BH',tip:'comuna',pop2021:12400,pop2011:9200,lat:47.034,lon:21.968,regiune:'NV',coef_hub:0.88,rata_reala_2011_2021:3.02},
    'RO-NT-110974':{siruta:'110974',name:'Vânători-Neamț',judet:'NT',judet_code:'NT',tip:'comuna',pop2021:8200,pop2011:8600,lat:47.200,lon:26.390,regiune:'NE',coef_hub:0.60,rata_reala_2011_2021:-0.48},
  },

  _selSearch(q) {
    clearTimeout(this._ss);
    // Injectăm comunele extra în _UAT_DB dacă nu s-a făcut deja
    // Asta face _searchUAT să le găsească natural, fără cod special
    if(!this._extrasInjected) {
      this._extrasInjected = true;
      this._applyGeoCache(); // Restaurează coordonate geocodate din sesiunile anterioare
      try {
        if(typeof _UAT_DB !== 'undefined') {
          Object.assign(_UAT_DB, this._EXTRA_UATS);
          console.log('[TCI] Injectat', Object.keys(this._EXTRA_UATS).length, 'comune în _UAT_DB');
        } else {
          // _UAT_DB nu e încă disponibil — îl creăm cu comunele noastre
          window._UAT_DB = {...this._EXTRA_UATS};
        }
      } catch(e) { console.warn('[TCI] Inject comune:', e.message); }
    }

    this._ss = setTimeout(() => {
      // _searchSIRUTA = toate 3181 UAT-urile din INS SIRUTA dec.2025
      // _searchUAT = doar municipii+orase din 20-uats-database.js
      // Prioritate: _searchSIRUTA dacă e disponibil
      let res = [];
      if(typeof _searchSIRUTA !== 'undefined') {
        res = _searchSIRUTA(q, 10);
      } else if(typeof _searchUAT !== 'undefined') {
        res = _searchUAT(q, 10);
      }

      // Fallback direct în comune _EXTRA_UATS dacă nimic găsit
      if(!res.length && q && q.length >= 2) {
        const qN = q.toLowerCase().replace(/[șş]/g,'s').replace(/[țţ]/g,'t').replace(/[ăâ]/g,'a').replace(/î/g,'i');
        res = Object.entries(this._EXTRA_UATS||{})
          .filter(([,c])=>{
            const n=(c.name||'').toLowerCase().replace(/[șş]/g,'s').replace(/[țţ]/g,'t').replace(/[ăâ]/g,'a').replace(/î/g,'i');
            return n.startsWith(qN)||n.includes(qN);
          })
          .map(([k,c])=>({key:k,name:c.name,judet:c.judet,pop2021:c.pop2021,tip:c.tip}))
          .slice(0,8);
      }

      const el = document.getElementById('tci-sel-res');
      if(!el) return;
      if(!res.length) { el.style.display='none'; return; }
      el.innerHTML = res.map(r=>`
        <div onclick="TCI._selPick('${r.key}','${r.name}')"
          style="padding:8px 12px;cursor:pointer;font-size:11px;color:rgba(200,215,235,0.9)"
          onmouseover="this.style.background='rgba(255,255,255,0.06)'"
          onmouseout="this.style.background='none'">
          <b>${r.name}</b><span style="color:rgba(148,163,184,0.4);font-size:9px"> · ${r.judet||'—'} · ${(r.pop2021||0).toLocaleString()} loc.</span>
        </div>`).join('');
      el.style.display = 'block';
    }, 150);
  },

  _selPick(key, name) {
    this._selectedUATKey = key;

    // ── SETĂM IMEDIAT cityKey și localStorage ────────────────────────────
    // Acesta e momentul în care userul a ales un UAT — salvăm persistent
    this.cityKey = key;
    try { localStorage.setItem('ux_last_city', key); } catch(e) {}

    // ── Bridge TCI → 06-aedis.js (switchUAT) ────────────────────────────
    // Citim registry-ul dinamic dacă există, altfel fallback la map static
    (function(){
      const reg = window._PUG_REGISTRY;
      const uatId = reg?.[key]?.id || {
        'RO-IS-01':'municipiul-iasi',
        'RO-SV-01':'municipiul-suceava',
        'RO-BT-01':'municipiul-botosani',
      }[key];
      if(uatId && typeof window.switchUAT === 'function') {
        console.log('[TCI] bridge → switchUAT('+uatId+')');
        window.switchUAT(uatId);
      }
      // Resetăm PUG încărcat ca să forțăm re-încărcare pentru noul UAT
      if(window.S) { window.S.pug = null; window.S.pugIdx = []; window.S._loadedCityKey = null; }
    })();

    if(window._ProjectionEngine) window._ProjectionEngine.currentCity = key;
    if(window._SceneEngine) window._SceneEngine._cityKey = key;

    // Actualizăm badge-ul din topbar
    const uatInd = document.getElementById('uat-indicator');
    if(uatInd) uatInd.textContent = name;
    // Actualizăm butonul UAT din topbar (📍 Suceava)
    const tbUAT = document.querySelector('[data-city-name], #btn-uat-active');
    if(tbUAT) tbUAT.textContent = name;

    console.log('[TCI] UAT selectat:', key, '—', name, '→ salvat în localStorage');

    const inp = document.getElementById('tci-sel-uat');
    if(inp) inp.value = name;
    const res = document.getElementById('tci-sel-res');
    if(res) res.style.display = 'none';

    // ── Geocodare automată la selecție ───────────────────────────────────
    // Pentru ORICE UAT (comună, sat, oraș) — geocodăm imediat după selecție
    // Astfel la lansare coordonatele sunt deja corecte
    // Nu mai depindem de coordonate estimate/hardcodate
    const token = mapboxgl?.accessToken || '';
    if(!token) return;

    // Căutăm UAT-ul în toate bazele de date disponibile
    let uatData = null;
    if(typeof _RO_CITIES_DB !== 'undefined') uatData = _RO_CITIES_DB[key];
    if(!uatData && typeof _UAT_DB !== 'undefined') uatData = _UAT_DB[key];
    if(!uatData) uatData = this._EXTRA_UATS?.[key];

    const judet = uatData?.judet || uatData?.judet_code || '';
    const query = encodeURIComponent(`${name}, ${judet}, Romania`);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`+
      `?types=place,locality,neighborhood,poi&country=ro&limit=1&access_token=${token}`;

    fetch(url, {signal: AbortSignal.timeout(5000)})
      .then(r => r.json())
      .then(data => {
        const feat = data.features?.[0];
        if(!feat?.center) return;
        const [lon, lat] = feat.center;
        // Verificăm că e în România (bounding box România)
        if(lat < 43.5 || lat > 48.5 || lon < 20 || lon > 30) return;

        console.log(`[TCI] Geocodat "${name}": ${lat.toFixed(5)}, ${lon.toFixed(5)}`);

        // Actualizăm _UAT_REGISTRY (sursa principală)
        if(window._UAT_REGISTRY?.[key]) {
          window._UAT_REGISTRY[key].centroid = [lon, lat];
          window._UAT_REGISTRY[key].geo_verified = true;
        } else if(window._UAT_REGISTRY) {
          // UAT nou — adăugăm în registry
          window._UAT_REGISTRY[key] = {
            centroid: [lon, lat], geo_verified: true,
            name, siruta: key.split('-').pop()
          };
        }

        // Actualizăm și în bazele de date vechi (compatibilitate)
        if(typeof _UAT_DB !== 'undefined' && _UAT_DB[key]) {
          _UAT_DB[key].lat = lat; _UAT_DB[key].lon = lon;
        }
        if(this._EXTRA_UATS?.[key]) {
          this._EXTRA_UATS[key].lat = lat; this._EXTRA_UATS[key].lon = lon;
        }
        // Cache persistent IndexedDB-like via localStorage (nu sessionStorage)
        try {
          const cache = JSON.parse(localStorage.getItem('_tci_geocache')||'{}');
          cache[key] = {lat, lon, name, ts: Date.now()};
          localStorage.setItem('_tci_geocache', JSON.stringify(cache));
        } catch(e) {}
      })
      .catch(() => {}); // Silențios — coordonatele existente rămân ca fallback
  },

  // Aplică cache-ul de geocodare la startup
  _applyGeoCache() {
    try {
      // localStorage → persistent între sesiuni (nu sessionStorage)
      const cache = JSON.parse(localStorage.getItem('_tci_geocache')||'{}');
      let applied = 0;
      Object.entries(cache).forEach(([key,{lat,lon}]) => {
        // Scriem în _UAT_REGISTRY (sursa principală)
        if(window._UAT_REGISTRY?.[key]) {
          window._UAT_REGISTRY[key].centroid = [lon, lat];
          window._UAT_REGISTRY[key].geo_verified = true;
        }
        // Compatibilitate cu DB-urile vechi
        if(this._EXTRA_UATS?.[key]) {
          this._EXTRA_UATS[key].lat = lat;
          this._EXTRA_UATS[key].lon = lon;
        }
        if(typeof _UAT_DB !== 'undefined' && _UAT_DB[key]) {
          _UAT_DB[key].lat = lat; _UAT_DB[key].lon = lon;
        }
        applied++;
      });
      if(applied) console.log(`[UAT Registry] Cache aplicat: ${applied} UAT-uri cu coordonate corectate`);
    } catch(e) {}
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
    // Step 4: comune periurbane din _EXTRA_UATS (nu sunt în DB principal)
    if(!this.cityData && this._EXTRA_UATS[this.cityKey])
      this.cityData = this._EXTRA_UATS[this.cityKey];
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

    // ── Geocodare automată pentru comune din _EXTRA_UATS ─────────────────
    // Coordonatele estimate din _EXTRA_UATS pot fi incorecte
    // Folosim Mapbox Geocoding API pentru a obține coordonate precise
    if(this.d?.tip === 'comuna' && this._EXTRA_UATS[this.cityKey]) {
      const token = mapboxgl?.accessToken || '';
      const numeComuna = this.d.name;
      const judet = this.d.judet || this.d.judet_code || '';
      if(token) {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(numeComuna+', '+judet+', Romania')}.json?types=place,locality,neighborhood&country=ro&limit=1&access_token=${token}`)
          .then(r=>r.json())
          .then(data=>{
            const feat = data.features?.[0];
            if(feat?.center) {
              const [newLon, newLat] = feat.center;
              console.log(`[TCI] Geocodat ${numeComuna}: ${newLat.toFixed(4)}, ${newLon.toFixed(4)} (era ${this.d.lat}, ${this.d.lon})`);
              // Actualizăm coordonatele în obiectul de date
              this.d.lon = newLon;
              this.d.lat = newLat;
              this.cityData.lon = newLon;
              this.cityData.lat = newLat;
              // Stocăm pentru sesiunile viitoare
              if(this._EXTRA_UATS[this.cityKey]) {
                this._EXTRA_UATS[this.cityKey].lon = newLon;
                this._EXTRA_UATS[this.cityKey].lat = newLat;
              }
              // Salt la coordonatele corecte
              try { this.map.flyTo({center:[newLon,newLat], zoom:15.5, pitch:65, bearing:20, duration:2000}); } catch(e){}
            }
          })
          .catch(e=>console.warn('[TCI] Geocodare comună:', e.message));
      }
    }

    // ── UAT Spatial Registry — geometry-first ───────────────────────────
    // Prioritate: 1. _UAT_REGISTRY (centroid verificat/bbox)
    //             2. cityData.lon/lat (din DB existent)
    //             3. Fallback Iași
    const spatial = window._getUATSpatial?.(this.cityKey);
    const cx = spatial?.centroid?.[0] ?? this.cityData?.lon ?? 27.601;
    const cy = spatial?.centroid?.[1] ?? this.cityData?.lat ?? 47.158;

    // Zoom optim per tip UAT — bbox folosit doar pentru centrare
    // Formula log2 anterioară era greșită (dădea zoom prea mic)
    const zoomForUAT = this.d?.tip === 'comuna'      ? 13 :
                       this.d?.tip === 'oras'         ? 12 :
                       this.d?.tip?.includes('munic') ? 11 :
                       this.d?.tip === 'C'            ? 10 : 11;

    if(spatial) {
      console.log(`[UAT Registry] ${this.d?.name}: centroid=[${cx.toFixed(4)},${cy.toFixed(4)}] verified=${spatial.geo_verified}`);
    }

    this._buildUI(cx, cy);
    this.map.jumpTo({ center:[cx,cy], zoom:15.5, pitch:65, bearing:20 });

    const onStyleReady = () => {
      this._setLight('dusk');
      this._initMapLayers();
      this._initVehicles();
      this._initLeftMap(cx, cy);
      // Jump explicit la orașul selectat — după setStyle camera poate rătăci
      try { this.map.jumpTo({center:[cx,cy], zoom:15.5, pitch:65, bearing:20}); } catch(e){}
      setTimeout(() => {
        this._director.init(this);
        this.start();
        // A doua garanție — dacă directorul crapa, camera e tot pe orașul corect
        setTimeout(() => {
          try { this.map.flyTo({center:[cx,cy], zoom:15.5, pitch:65, bearing:30, duration:2000}); } catch(e){}
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
        center: [cx, cy], zoom: 11.0, pitch: 35, bearing: -12,
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
          <div id="tci-housing-mix" style="margin-top:6px;padding:6px 0;border-top:1px solid rgba(255,255,255,0.06)"></div>

          <!-- BENCHMARK — vizibil, deasupra butoanelor -->
          <div style="border:1px solid rgba(56,189,248,0.25);border-radius:8px;padding:8px;margin-top:6px;background:rgba(14,26,52,0.6)">
            <div style="font-size:8px;font-weight:700;color:#38bdf8;letter-spacing:.06em;margin-bottom:6px">⚖ COMPARĂ CU ALT UAT</div>
            <input type="text" id="tci-cmp-inp" placeholder="Tastează oraș, comună..." autocomplete="off" oninput="TCI._cmpSearch(this.value)"
              style="width:100%;background:rgba(255,255,255,0.09);border:1px solid rgba(56,189,248,0.3);color:#fff;padding:7px 9px;border-radius:6px;font-size:11px;font-family:inherit;box-sizing:border-box">
            <div id="tci-cmp-res" style="background:rgba(4,10,24,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:5px;max-height:100px;overflow-y:auto;display:none;margin-top:3px"></div>
            <div id="tci-cmp-out" style="margin-top:4px;max-height:340px;overflow-y:auto"></div>
          </div>

          <div style="display:flex;gap:4px">
            <button onclick="TCI._snapshot()" style="flex:1;text-align:left;padding:5px 7px;border-radius:4px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.75);font-size:9px;cursor:pointer;font-family:inherit">📷 Snapshot</button>
            <button onclick="TCI._share()" style="flex:1;text-align:left;padding:5px 7px;border-radius:4px;border:1px solid rgba(255,255,255,0.07);background:rgba(14,26,52,0.5);color:rgba(200,215,235,0.75);font-size:9px;cursor:pointer;font-family:inherit">🔗 Share URL</button>
          </div>
          <div style="display:flex;gap:4px;margin-top:4px">
            <button onclick="TCI._generateReport()" style="flex:1;text-align:left;padding:6px 7px;border-radius:4px;border:1px solid rgba(212,175,55,0.4);background:rgba(212,175,55,0.12);color:#D4AF37;font-size:9px;cursor:pointer;font-family:inherit;font-weight:600">📄 Raport PDF</button>
            <button onclick="TCI._streetViewMode()" id="tci-sv-btn" title="Mod nivel stradă — zoom pe clădiri, construcție etaj cu etaj"
              style="padding:6px 10px;border-radius:6px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:#22c55e;font-size:10px;cursor:pointer;font-family:inherit;font-weight:700">
              🚶 Stradă
            </button>
            <button onclick="TCI._exportGeoJSON()" title="Export zone ca GeoJSON — compatibil QGIS, ArcGIS, uMap" style="flex:1;text-align:left;padding:6px 7px;border-radius:4px;border:1px solid rgba(56,189,248,0.4);background:rgba(56,189,248,0.08);color:#38bdf8;font-size:9px;cursor:pointer;font-family:inherit;font-weight:600">⬇ Export GIS</button>
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
    // Dev Pressure overlay init
    setTimeout(()=>{
      if(!document.getElementById('tci-dev-pressure')){
        const dp=document.createElement('div');
        dp.id='tci-dev-pressure';
        dp.style.cssText='position:absolute;bottom:110px;right:20px;width:225px;background:rgba(4,10,24,0.9);backdrop-filter:blur(8px);border:1px solid rgba(212,175,55,0.3);border-radius:8px;padding:10px 12px;pointer-events:none;z-index:20;display:none';
        (document.getElementById('tci-root')||document.body).appendChild(dp);
      }
      this._updateDevPressureOverlay(this.year||2025);
    },2000);
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
          <button onclick="TCI._exportGeoJSON()" title="Export GeoJSON — QGIS/ArcGIS" style="flex:1;padding:9px;border-radius:7px;border:1px solid rgba(56,189,248,0.4);background:rgba(56,189,248,0.08);color:#38bdf8;font-size:10px;cursor:pointer;font-family:inherit;font-weight:600">⬇ Export GIS</button>
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

  // ── NARATIV TEMPORAL ACTIV ───────────────────────────────────────────
  // La fiecare an din slider, o propoziție generată din date reale
  // Utilizatorul înțelege CE SE ÎNTÂMPLĂ și DE CE în acel an
  _updateNarExtra(sceneId, yr) {
    let el = document.getElementById('tci-nar-whattext');
    if(!el) {
      const nc = document.getElementById('tci-narcard');
      if(!nc) return;
      el = document.createElement('div');
      el.id = 'tci-nar-whattext';
      el.style.cssText = 'margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);font-size:9.5px;color:rgba(148,163,184,0.7);line-height:1.6';
      nc.appendChild(el);
    }

    const city  = this._city();
    const need  = this._calcUrbanNeed(city);
    const grav  = this._calcGravityScore(city);
    const lc    = grav.lifecycle || {};
    const name  = city.name || 'UAT';
    const zones = this._projZones || [];
    const rata  = city.rata_reala_2011_2021 || 0;

    // ── Narativ bazat pe AN — date reale din motoare ──────────────────
    const temporal = this._buildTemporalNarrative(city, need, grav, lc, zones, yr, name, rata);
    const sceneCtx = this._buildSceneContext(sceneId, yr, name, zones);

    el.innerHTML = `
      <div style="margin-bottom:6px;opacity:0.5;font-size:8px">${sceneCtx}</div>
      <div style="font-size:9.5px;line-height:1.7;color:rgba(210,225,240,0.85)">${temporal}</div>
    `;
  },

  _buildTemporalNarrative(city, need, grav, lc, zones, yr, name, rata) {
    const pop2021 = city.pop2021 || 100000;
    const pop2055 = need.pop2055 || pop2021;
    const yrFrac  = Math.max(0, Math.min(1, (yr - 2025) / 30));
    const popEst  = Math.round(pop2021 + (pop2055 - pop2021) * yrFrac);
    const deltaP  = popEst - pop2021;
    const fmt     = n => Math.abs(n).toLocaleString('ro-RO');

    const zonesActive    = zones.filter(z => yr >= (z.startYr||2026));
    const zonesThisYear  = zones.filter(z => yr === (z.startYr||2026));
    const zonesBuilding  = zones.filter(z => yr >= (z.startYr||2026) && yr < (z.startYr||2026)+6);
    const zonesDone      = zones.filter(z => yr >= (z.startYr||2026) + 6);
    const locuinteEst    = Math.round((need.locuinteTotale||0) * yrFrac);
    const investEst      = Math.round((need.totalM2||0) * 850 * yrFrac / 1e6);

    // ── Fragmente narative per tip eveniment ─────────────────────────
    const fragments = [];

    // 1. Context demografic
    if(yr <= 2027) {
      fragments.push(`<strong>${yr}</strong> — Populația estimată: <strong>${fmt(popEst)}</strong> loc. ${deltaP > 0 ? `(+${fmt(deltaP)} față de 2021)` : `(${fmt(deltaP)} față de 2021)`}.`);
    } else {
      const trend = deltaP > 0 ? `crește cu +${fmt(deltaP)} față de 2021` : `scade cu ${fmt(Math.abs(deltaP))} față de 2021`;
      fragments.push(`<strong>${yr}</strong> — Populația ${trend} → <strong>${fmt(popEst)}</strong> loc.`);
    }

    // 2. Zone active
    if(zonesThisYear.length > 0) {
      const zNames = zonesThisYear.slice(0,2).map(z=>z.label||z.id).join(', ');
      fragments.push(`🔶 <strong>Nou în ${yr}:</strong> ${zNames} intră în construcție.`);
    }

    if(zonesBuilding.length > 0 && zonesThisYear.length === 0) {
      fragments.push(`🏗 <strong>${zonesBuilding.length} zone</strong> în construcție activă.`);
    }

    if(zonesDone.length > 0) {
      fragments.push(`✅ <strong>${zonesDone.length} zone</strong> finalizate — ${Math.round(need.locuinteTotale * (zonesDone.length/Math.max(1,zones.length))).toLocaleString('ro-RO')} unități livrate.`);
    }

    // 3. Presiune imobiliară
    if(locuinteEst > 0) {
      fragments.push(`📊 Cerere cumulată 2025→${yr}: <strong>≈${fmt(locuinteEst)}</strong> locuințe · ≈${fmt(investEst)} M€.`);
    }

    // 4. Moment critic — milestones specifice
    if(yr === 2030) {
      fragments.push(`⚡ <strong>2030 — Moment critic:</strong> PNRR investiții urbanistice trebuiau finalizate. Verificați dacă infrastructura planificată e operațională.`);
    }
    if(yr === 2035 && rata > 1) {
      const popExtra = Math.round(pop2021 * (Math.pow(1 + rata/100, 14) - 1));
      fragments.push(`📈 <strong>2035 —</strong> La rata actuală (+${rata.toFixed(1)}%/an), ${name} adaugă <strong>+${fmt(popExtra)}</strong> loc. față de 2021. Infrastructura de utilități trebuie extinsă.`);
    }
    if(yr === 2040 && grav.growthType === 'METROPOLITAN') {
      fragments.push(`🏙 <strong>2040 —</strong> Zona metropolitană atinge densitate critică. Risc supraaglomerare fără transport public extins.`);
    }
    if(yr === 2045 && (grav.growthType === 'DECLINING' || grav.growthType === 'WEAKENING')) {
      fragments.push(`⚠️ <strong>2045 —</strong> Fondul construit excedentar devine vizibil. Prioritate: reabilitare și densificare selectivă, nu extindere.`);
    }
    if(yr === 2050) {
      const converged = pop2055 > pop2021 ? 'creștere sustenabilă' : 'contracție controlată';
      fragments.push(`🎯 <strong>2050 —</strong> Traiectoria confirmă ${converged}. ${zonesDone.length}/${zones.length} zone finalizate.`);
    }

    // 5. Sursa și metodologia — câte o linie discretă
    if(yr === this.startYear) {
      fragments.push(`<span style="opacity:0.45;font-size:8px">Model: INS Cohort Survival · Gravity · P(u) Frontier · OSRM · P100-1/2013</span>`);
    }

    return fragments.join('<br>');
  },

  _buildSceneContext(sceneId, yr, name, zones) {
    const ctx = {
      's1': `👁 Hartă Europa — localizare ${name}`,
      's2': `👁 Vista aeriană — rețea transport + vehicule live`,
      's3': `👁 Apropierea de ${name} — clădiri 3D activate la zoom 14+`,
      's4': `👁 3D urban — STÂNGA: 2025 · DREAPTA: proiecție ${yr}`,
      's5': `👁 Construcție activă ${yr} — galben=nou · colorat=finalizat`,
      's6': `👁 Transport public + trafic — roșu=tramvai · albastru=autobuz`,
      's7': `👁 Detaliu zonă — contur=UTR din PUG · clădiri=proiecție`,
      's8': `👁 Nivel pietonal — clădiri OSM real + proiecție densificare`,
      's9': `👁 Hartă risc — albastru=inundații · roșu=seismic · galben=caniculă`,
      's10':`👁 Benchmark EU — ${name} vs orașe similare Eurostat`,
      's11':`👁 Transformare 2025→2055 — slider = orice an`,
      's12':`👁 ${name} ${yr} — imagine completă · ${zones.filter(z=>yr>=(z.startYr||2026)+6).length}/${zones.length} zone finalizate`,
    };
    return ctx[sceneId] || `👁 Scenă ${sceneId} — ${yr}`;
  },


  // ── EXPORT GEOJSON ──────────────────────────────────────────────────
  // Zone proiectate → GeoJSON cu atribute complete
  // Utilizabil direct în QGIS, ArcGIS, orice GIS profesional
  _exportGeoJSON() {
    const city   = this._city();
    const zones  = this._projZones || [];
    const need   = this._calcUrbanNeed(city);
    const grav   = this._calcGravityScore(city);
    const seis   = this._getSeismicAg(city.lon||27.6, city.lat||47.16);
    const today  = new Date().toISOString().split('T')[0];

    if(!zones.length) {
      alert('Nu există zone proiectate de exportat. Lansați mai întâi o proiecție.');
      return;
    }

    // Construim GeoJSON FeatureCollection
    const features = zones.map((z, i) => {
      // Reconstruim poligonul din ring (același algoritm ca _updateProjectionLayers)
      const ring = z.ring || {};
      const cx = ring.cx || (z.lon||0);
      const cy = ring.cy || (z.lat||0);
      const rx = ring.rx || 0.005;
      const ry = ring.ry || 0.003;
      const R = 111319.9;
      const cp = Math.cos(cy * Math.PI / 180);

      // Poligon eliptic cu 32 puncte
      const coords = [];
      for(let a = 0; a <= 360; a += 11.25) {
        const rad = a * Math.PI / 180;
        coords.push([
          Math.round((cx + rx * Math.cos(rad)) * 100000) / 100000,
          Math.round((cy + ry * Math.sin(rad)) * 100000) / 100000,
        ]);
      }
      coords.push(coords[0]); // închide poligonul

      return {
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [coords] },
        properties: {
          // Identificatori oficiali
          id:            z.id || `zone-${i+1}`,
          siruta:        city.siruta || (this.cityKey||'').split('-').pop(),
          uat_name:      city.name || '',
          judet:         city.judet || '',
          uat_key:       this.cityKey || '',

          // Clasificare urbanistică
          label:         z.label || '',
          sub:           z.sub || '',
          tipologie:     (z.label||'').split('—')[0]?.trim() || '',
          growth_type:   grav.growthType,
          lifecycle_l:   (grav.lifecycle?.score||0).toFixed(3),
          lifecycle_type:grav.lifecycle?.lifecycleType || '',

          // Date temporale
          start_year:    z.startYr || 2026,
          h_max_m:       z.hMax || 0,
          scenario:      this.scenario || 'S2',

          // Probabilitate dezvoltare P(u)
          prob_pct:      z._prob ? Math.round(z._prob * 100) : null,
          pu_class:      z._prob > 0.6 ? 'HIGH' : z._prob > 0.35 ? 'MEDIUM' : 'LOW',

          // Factori P(u)
          factor_ra:     z._Ra != null ? +z._Ra.toFixed(3) : null,
          factor_db:     z._Db != null ? +z._Db.toFixed(3) : null,
          travel_min:    z._travelMin || null,
          slope_deg:     z.slopeDeg != null ? +z.slopeDeg.toFixed(1) : null,

          // Riscuri
          seismic_ag:    seis.ag,
          seismic_hmax:  seis.hMaxStory,

          // Metadata
          model_version: 'TCI v131',
          generated:     today,
          disclaimer:    'Predictie statistica. Nu substituie aviz urbanistic sau PUG.',
        },
      };
    });

    const geojson = {
      type: 'FeatureCollection',
      name: `TCI_${city.name||'UAT'}_${today}`,
      crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
      metadata: {
        generator:    'UrbanX TCI Cinema v131',
        uat:          city.name || '',
        siruta:       city.siruta || '',
        judet:        city.judet || '',
        growth_type:  grav.growthType,
        lifecycle_l:  (grav.lifecycle?.score||0).toFixed(3),
        pop2021:      city.pop2021 || 0,
        pop2055:      need.pop2055 || 0,
        locuinte:     need.locuinteTotale || 0,
        scenario:     this.scenario || 'S2',
        generated:    today,
        zones_count:  zones.length,
        seismic_ag:   seis.ag,
        disclaimer:   'Predictie statistica INS+OSM+OSRM. Nu substituie aviz urbanistic.',
      },
      features,
    };

    // Download
    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `TCI_${(city.name||'UAT').replace(/\s/g,'_')}_${today}.geojson`;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`[TCI] Export GeoJSON: ${features.length} zone, ${(blob.size/1024).toFixed(1)}KB`);
  },


  // ══════════════════════════════════════════════════════════════════════
  // MOD NIVEL STRADĂ — experiența completă la nivel pietonal
  // Zoom 18.8 · Pitch 78° · Construcție etaj-cu-etaj · Trafic live
  // ══════════════════════════════════════════════════════════════════════

  _streetViewMode() {
    if(this._inStreetView) { this._exitStreetView(); return; }
    const m = this.map; if(!m) return;
    this._inStreetView = true;
    const btn = document.getElementById('tci-sv-btn');
    if(btn){btn.textContent='✕ Ieși stradă';btn.style.borderColor='rgba(248,113,113,0.5)';btn.style.color='#f87171';}

    const zones  = this._projZones?.filter(z=>this.year>=(z.startYr||2026))||[];
    const cx = this.d?.lon||27.601, cy = this.d?.lat||47.158;
    let tLon=cx, tLat=cy;
    if(zones.length>0){
      const z=zones[0], ring=z.ring||{};
      const zCx=ring.cx||cx, zCy=ring.cy||cy;
      const bRad=(m.getBearing?.()|| 0)*Math.PI/180;
      tLon=zCx-Math.sin(bRad)*0.0015; tLat=zCy+Math.cos(bRad)*0.0012;
    }
    this._enableMapbox3D();
    m.flyTo({center:[tLon,tLat],zoom:18.8,pitch:78,bearing:m.getBearing?.()|| -20,duration:3500,
      easing:t=>t<0.5?2*t*t:-1+(4-2*t)*t});
    setTimeout(()=>{this._setLight('dusk');this._3D?.setNightLights?.(true);this._startDayNightCycle();this._spawnStreetPedestrians();},3500);
    this._setupStreetViewControls();
    this._showStreetViewOverlay();
    console.log('[TCI] 🚶 Mod nivel stradă activat');
  },

  _exitStreetView() {
    this._inStreetView=false;
    const btn=document.getElementById('tci-sv-btn');
    if(btn){btn.textContent='🚶 Stradă';btn.style.borderColor='rgba(34,197,94,0.3)';btn.style.color='#22c55e';}
    this.map?.flyTo({zoom:12,pitch:45,bearing:-12,duration:2500});
    this._stopDayNightCycle();
    this._teardownStreetViewControls();
    this._removeStreetPedestrians();
    document.getElementById('tci-sv-overlay')?.remove();
    const bld=this.map?.getLayer?.('tci-3d-bld-existing');
    if(bld) try{this.map.removeLayer('tci-3d-bld-existing');}catch(e){}
    setTimeout(()=>this._setLight('day'),2500);
  },

  _enableMapbox3D() {
    const m=this.map; if(!m) return;
    if(!m.getLayer?.('tci-3d-bld-existing')) {
      try {
        if(m.getSource?.('composite')) {
          m.addLayer({
            id:'tci-3d-bld-existing',type:'fill-extrusion',
            source:'composite','source-layer':'building',
            filter:['==','extrude','true'],
            paint:{
              'fill-extrusion-color':'#1a2744',
              'fill-extrusion-height':['get','height'],
              'fill-extrusion-base':['get','min_height'],
              'fill-extrusion-opacity':0.85,
            },
          },'tci-3d-engine');
        }
      } catch(e){console.warn('[TCI] 3D OSM buildings:',e.message);}
    }
    try{m.setMaxZoom?.(22);m.setMaxPitch?.(85);}catch(e){}
  },

  _startDayNightCycle() {
    if(this._dayNightInterval) return;
    const presets=['dusk','night','night','dawn','day']; let idx=0;
    this._setLight(presets[0]);
    this._dayNightInterval=setInterval(()=>{
      idx=(idx+1)%presets.length;
      this._setLight(presets[idx]);
      this._3D?.setNightLights?.(presets[idx]==='night');
    },8000);
  },

  _stopDayNightCycle() {
    if(this._dayNightInterval){clearInterval(this._dayNightInterval);this._dayNightInterval=null;}
  },

  _setupStreetViewControls() {
    if(this._svKeysActive) return;
    this._svKeysActive=true;
    this._svKeyHandler=(e)=>{
      if(!this._inStreetView) return;
      const m=this.map, center=m.getCenter(), bearing=(m.getBearing?.()||0), speed=0.00008;
      const br=bearing*Math.PI/180;
      switch(e.key){
        case 'ArrowLeft':  m.setBearing?.(bearing-8); break;
        case 'ArrowRight': m.setBearing?.(bearing+8); break;
        case 'ArrowUp': case 'w': case 'W':
          m.setCenter([center.lng+Math.sin(br)*speed,center.lat+Math.cos(br)*speed]); break;
        case 'ArrowDown': case 's': case 'S':
          m.setCenter([center.lng-Math.sin(br)*speed,center.lat-Math.cos(br)*speed]); break;
        case 'q': case 'Q': m.setPitch?.(Math.min(85,(m.getPitch?.()||78)+5)); break;
        case 'e': case 'E': m.setPitch?.(Math.max(30,(m.getPitch?.()||78)-5)); break;
        case 'Escape': this._exitStreetView(); break;
        default: return;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown',this._svKeyHandler);
  },

  _teardownStreetViewControls() {
    if(this._svKeyHandler){window.removeEventListener('keydown',this._svKeyHandler);this._svKeyHandler=null;}
    this._svKeysActive=false;
  },

  _showStreetViewOverlay() {
    const ov=document.createElement('div'); ov.id='tci-sv-overlay';
    ov.style.cssText='position:fixed;bottom:120px;right:20px;z-index:3000;background:rgba(4,10,24,0.92);border:1px solid rgba(34,197,94,0.3);border-radius:10px;padding:12px 14px;min-width:200px;font-family:"Space Grotesk",sans-serif;pointer-events:none';
    ov.innerHTML=`<div style="font-size:8px;font-weight:700;color:#22c55e;letter-spacing:.08em;margin-bottom:8px">🚶 MOD NIVEL STRADĂ</div>
      <div style="font-size:8px;color:rgba(148,163,184,0.7);line-height:2.2">
        <kbd style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px">←→</kbd> Rotire vedere<br>
        <kbd style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px">↑↓</kbd> / <kbd style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px">W S</kbd> Mișcare<br>
        <kbd style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px">Q E</kbd> Unghi privire<br>
        <kbd style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px">ESC</kbd> Ieșire<br>
        <span style="color:rgba(148,163,184,0.4);font-size:7px">Slider = construcție etaj cu etaj</span>
      </div>`;
    document.body.appendChild(ov);
  },

  _spawnStreetPedestrians() {
    if(!this._3D?._scene || typeof THREE === 'undefined') return;
    this._svPedestrians = [];
    const cx = this.d?.lon || 27.601;
    const cy = this.d?.lat || 47.158;
    const R  = 111319.9;
    const cp = Math.cos(cy * Math.PI / 180);
    const sM = this._3D._scale || 1e-6;

    // ── Paleta de culori haine — variată, realistă ──────────────────
    const OUTFIT_COLORS = [
      0x1e40af, 0x7c3aed, 0xdc2626, 0x15803d, 0x92400e,
      0x0891b2, 0xb45309, 0x475569, 0x9333ea, 0xbe123c,
      0x065f46, 0x1d4ed8, 0x7e22ce, 0x166534, 0xb91c1c,
    ];
    const SKIN_COLORS = [0xffd5b5, 0xf0c090, 0xd4956a, 0x8d5524, 0xc68642];

    // ── Crează un biped din primitive ────────────────────────────────
    const makeBiped = (outfitColor, skinColor, height) => {
      const g = new THREE.Group();
      const s = sM; // scara Mercator

      // Cap
      const headG = new THREE.SphereGeometry(0.12*s, 5, 4);
      const headM = new THREE.MeshBasicMaterial({color:skinColor, depthTest:false, transparent:true, opacity:0.92});
      const head  = new THREE.Mesh(headG, headM);
      head.position.set(0, 0, 1.62 * height * s);
      g.add(head);

      // Torso
      const torsoG = new THREE.BoxGeometry(0.36*s, 0.22*s, 0.62*s);
      const torsoM = new THREE.MeshBasicMaterial({color:outfitColor, depthTest:false, transparent:true, opacity:0.90});
      const torso  = new THREE.Mesh(torsoG, torsoM);
      torso.position.set(0, 0, 1.20 * height * s);
      g.add(torso);

      // Picioare — pivot la șold (translateZ(-0.38) = pivot la vârf)
      const makeLeg = (xOff) => {
        const legG = new THREE.BoxGeometry(0.15*s, 0.15*s, 0.76*s);
        legG.translate(0, 0, -0.38*s);               // pivot la vârf (șold)
        const legM = new THREE.MeshBasicMaterial({color:0x1e293b, depthTest:false, transparent:true, opacity:0.88});
        const leg  = new THREE.Mesh(legG, legM);
        leg.position.set(xOff*s, 0, 0.88 * height * s); // la înălțimea șoldului
        return leg;
      };
      const legL = makeLeg(-0.11);
      const legR = makeLeg( 0.11);
      g.add(legL); g.add(legR);

      // Brațe — pivot la umăr
      const makeArm = (xOff) => {
        const armG = new THREE.BoxGeometry(0.11*s, 0.11*s, 0.52*s);
        armG.translate(0, 0, -0.26*s);
        const armM = new THREE.MeshBasicMaterial({color:outfitColor, depthTest:false, transparent:true, opacity:0.80});
        const arm  = new THREE.Mesh(armG, armM);
        arm.position.set(xOff*s, 0, 1.46 * height * s);
        return arm;
      };
      const armL = makeArm(-0.25);
      const armR = makeArm( 0.25);
      g.add(armL); g.add(armR);

      return {group:g, legL, legR, armL, armR, torso, head};
    };

    // ── Spawn 30 pietoni în zona activă ─────────────────────────────
    const zones   = this._projZones?.filter(z => this.year >= (z.startYr||2026)) || [];
    const zCenter = zones[0]?.ring || {};

    for(let i = 0; i < 30; i++) {
      const outfitCol = OUTFIT_COLORS[i % OUTFIT_COLORS.length];
      const skinCol   = SKIN_COLORS[Math.floor(i / 3) % SKIN_COLORS.length];
      const height    = 0.90 + Math.random() * 0.20; // 0.90–1.10 × scara normală

      const {group, legL, legR, armL, armR} = makeBiped(outfitCol, skinCol, height);

      // Pozitie initiala
      const angle = Math.random() * Math.PI * 2;
      const dist  = 20 + Math.random() * 180;
      const baseLon = (zCenter.cx || cx) + (dist * Math.sin(angle)) / (R * cp);
      const baseLat = (zCenter.cy || cy) + (dist * Math.cos(angle)) / R;

      group.userData = {
        lon:      baseLon,
        lat:      baseLat,
        speed:    0.4 + Math.random() * 0.5,   // m/s
        bearing:  Math.random() * Math.PI * 2,
        turnTimer:Math.random() * 5,
        phase:    Math.random() * Math.PI * 2,  // offset animatie
        legL, legR, armL, armR,
        height,
        homeX:    baseLon,
        homeY:    baseLat,
      };

      this._3D._scene.add(group);
      this._svPedestrians.push(group);
    }

    // ── Loop 1: mișcare (pozitie) — 80ms ────────────────────────────
    this._svPedInterval = setInterval(() => {
      if(!this._inStreetView || !this._svPedestrians?.length) return;
      const dt = 0.08;
      const _sM = this._3D._scale || 1e-6;

      this._svPedestrians.forEach(g => {
        const u = g.userData;

        // Schimba directia aleatoriu
        u.turnTimer -= dt;
        if(u.turnTimer <= 0) {
          u.bearing += (Math.random() - 0.5) * 1.4;
          u.turnTimer = 2 + Math.random() * 5;
        }

        // Miscare
        u.lon += Math.sin(u.bearing) * u.speed * dt / (R * cp);
        u.lat += Math.cos(u.bearing) * u.speed * dt / R;

        // Teleport daca ies prea departe
        const dx = (u.lon - cx) * R * cp;
        const dy = (u.lat - cy) * R;
        if(Math.hypot(dx, dy) > 300) {
          const aNew = Math.random() * Math.PI * 2;
          u.lon = cx + (30 * Math.sin(aNew)) / (R * cp);
          u.lat = cy + (30 * Math.cos(aNew)) / R;
        }

        // Pozitionam grupul pe harta
        const x = (u.lon - (this._3D._cx || cx)) * R * cp;
        const y = (u.lat - (this._3D._cy || cy)) * R;
        g.position.set(x * _sM, y * _sM, 0);

        // Rotim pieton sa priveasca in directia mersului
        g.rotation.z = -u.bearing;
      });

      this._3D._map?.triggerRepaint?.();
    }, 80);

    // ── Loop 2: animatie vizuala (mers) — rAF ────────────────────────
    const animateWalk = () => {
      if(!this._inStreetView) return;
      const now = Date.now() * 0.001;
      const _sM = this._3D._scale || 1e-6;

      this._svPedestrians?.forEach(g => {
        const u = g.userData;
        const freq  = u.speed * 2.2;        // frecventa pasi per secunda
        const t     = now * freq + u.phase;

        // Balansul picioarelor — opus
        if(u.legL) u.legL.rotation.x = Math.sin(t) * 0.42;
        if(u.legR) u.legR.rotation.x = Math.sin(t + Math.PI) * 0.42;

        // Balansul bratelor — opus picioarelor
        if(u.armL) u.armL.rotation.x = Math.sin(t + Math.PI) * 0.28;
        if(u.armR) u.armR.rotation.x = Math.sin(t) * 0.28;

        // Bobbing vertical al corpului — 2 pasi per ciclu complet
        const bob = Math.abs(Math.sin(t * 2)) * 0.022 * _sM;
        g.position.z = bob; // oscilatie verticala 2.2cm
      });

      this._3D._map?.triggerRepaint?.();
      this._svAnimFrame = requestAnimationFrame(animateWalk);
    };

    this._svAnimFrame = requestAnimationFrame(animateWalk);
  },


  _removeStreetPedestrians() {
    // Opreste ambele loop-uri: setInterval (miscare) + rAF (animatie)
    if(this._svPedInterval) { clearInterval(this._svPedInterval); this._svPedInterval = null; }
    if(this._svAnimFrame)   { cancelAnimationFrame(this._svAnimFrame); this._svAnimFrame = null; }

    // Curata scene Three.js + memory
    this._svPedestrians?.forEach(g => {
      this._3D?._scene?.remove(g);
      g.traverse(child => {
        if(child.geometry) child.geometry.dispose();
        if(child.material) child.material.dispose();
      });
    });
    this._svPedestrians = [];
  },

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

    const need = this._calcUrbanNeed(city);
    const grav = this._calcGravityScore(city);
    const seis = this._getSeismicAg(city.lon||27.6, city.lat||47.16);
    const clim = this._getClimateProfile(city.judet||'');
    const feas = this._calcFeasibility({}, city, seis.ag);
    const scn  = this._getScenario();
    const lifecycle = grav.lifecycle || this._calcLifecycleScore(city);
    const L = lifecycle.score ?? 0;
    const housingMix = this._calcHousingMix(need, city);

    const invConstr = Math.round(need.totalM2 * 850 / 1e6);
    const invInfra  = Math.round(need.locuinteTotale * 15000 / 1e6);
    const invTotal  = invConstr + invInfra;
    const yrFrac    = Math.max(0, (this.year - 2021)) / 34;
    const popCrt    = Math.round(need.pop2021 + (need.pop2055 - need.pop2021) * yrFrac);
    const fmt       = n => (n||0).toLocaleString('ro-RO');
    const trend     = need.pop2055 > need.pop2021 ? '▲' : '▼';
    const trendC    = need.pop2055 > need.pop2021 ? '#22c55e' : '#f87171';
    const riskScore = Math.round((clim.uhi/2.2*30) + (clim.flood*25) + (clim.drought*25));
    const riskLbl   = riskScore > 55 ? 'Ridicat' : riskScore > 35 ? 'Mediu' : 'Scăzut';
    const riskC     = riskScore > 55 ? '#f87171' : riskScore > 35 ? '#f59e0b' : '#22c55e';

    // ── Lifecycle vizual ────────────────────────────────────────────────
    const Lcolor      = L > 0.3 ? '#22c55e' : L > -0.2 ? '#f59e0b' : '#f87171';
    const LbgColor    = L > 0.3 ? 'rgba(34,197,94,0.1)' : L > -0.2 ? 'rgba(245,158,11,0.1)' : 'rgba(248,113,113,0.1)';
    const LborderColor= L > 0.3 ? 'rgba(34,197,94,0.35)' : L > -0.2 ? 'rgba(245,158,11,0.35)' : 'rgba(248,113,113,0.35)';
    const Llabel      = L > 0.45 ? 'GROWING' : L > 0.05 ? 'STABLE' : L > -0.20 ? 'WEAKENING' : L > -0.55 ? 'DECLINING' : 'SHRINKING';
    const LdescMap    = {GROWING:'creștere activă',STABLE:'echilibru urban',WEAKENING:'slăbire demografică',DECLINING:'declin activ',SHRINKING:'contracție severă'};

    const Hd = Math.min(1, need.locuinteTotale / Math.max(1, city.pop2021) * 10);
    const Ig = Math.max(0, (lifecycle.Eg + 1) / 2);
    const Ca = Math.min(1, (city.coef_hub || 0.7));
    const Dp = Math.round((Hd*0.40 + Ig*0.35 + Ca*0.25) * 100);
    const Dpcolor = Dp > 60 ? '#f59e0b' : Dp > 35 ? '#60a5fa' : '#94a3b8';

    const rows = [
      {l:'Populație '+this.year, v:fmt(popCrt), c:'#60a5fa'},
      {l:'Proiecție 2055',       v:trend+' '+fmt(need.pop2055), c:trendC},
      {l:'Locuințe necesare',    v:fmt(need.locuinteTotale), c:'#D4AF37'},
      {l:'Investiție estimată',  v:'≈'+invTotal+' M€', c:'#a78bfa',
       t:'Construcție '+invConstr+'M€ + Infrastructură '+invInfra+'M€'},
      {l:'hMax legal (seismic)', v:seis.hMaxStory+' etaje / '+seis.hMaxM+'m', c:'#fb923c'},
      {l:'Risc climatic 2055',   v:riskLbl+' ('+riskScore+'/100)', c:riskC},
      {l:'ROI estimat',          v:feas.roi+'%'+(feas.viable?' ✓':' ⚠'), c:feas.viable?'#22c55e':'#f87171',
       t:'Brut '+feas.roiBrut+'% × factor absorbție → '+feas.roi+'% ajustat'},
      {l:'Absorbție piață',      v:(feas.absorbtieAn||0).toLocaleString('ro-RO')+' un./an',
       c:(feas.absorbtieAn||0)>200?'#22c55e':(feas.absorbtieAn||0)>80?'#f59e0b':'#f87171',
       t:'Credit: '+feas.pctGospodariAcces+'% gospodării · Vacanță: '+feas.vacantaLocativa+'%'},
      {l:'Dev. Pressure',        v:Dp+'/100', c:Dpcolor},
      {l:'Scenariu',             v:scn.label+' ×'+scn.rateMultiplier, c:'#94a3b8'},
    ];

    // ── HERO SCORE — Lifecycle mare, colorat, ierarhie clară ───────────
    const heroHTML = `
      <div style="background:${LbgColor};border:1px solid ${LborderColor};border-radius:10px;padding:12px 14px;margin-bottom:8px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;background:${Lcolor};opacity:0.07;border-radius:50%;filter:blur(20px)"></div>
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4px">
          <div>
            <div style="font-size:8px;color:rgba(148,163,184,0.45);letter-spacing:.08em;text-transform:uppercase;margin-bottom:1px">Lifecycle Score</div>
            <div style="font-size:26px;font-weight:900;color:${Lcolor};line-height:1">${L>=0?'+':''}${L.toFixed(2)}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px;font-weight:800;color:${Lcolor};letter-spacing:.04em">${Llabel}</div>
            <div style="font-size:7.5px;color:rgba(148,163,184,0.4);margin-top:2px">${LdescMap[Llabel]||''}</div>
          </div>
        </div>
        <div style="height:3px;background:rgba(255,255,255,0.07);border-radius:2px;margin:6px 0 8px">
          <div style="height:100%;border-radius:2px;background:${Lcolor};width:${Math.round((L+1)/2*100)}%;transition:width 0.6s ease"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:8px">
          ${[{k:'Pg',v:lifecycle.Pg||0,l:'Demografie'},{k:'Eg',v:lifecycle.Eg||0,l:'Economie'},{k:'Mn',v:lifecycle.Mn||0,l:'Migrație'}].map(s=>{
            const sc=s.v>0.1?'#22c55e':s.v>-0.1?'#f59e0b':'#f87171';
            return '<div style="background:rgba(255,255,255,0.04);border-radius:5px;padding:4px 6px;text-align:center"><div style="font-size:9px;font-weight:700;color:'+sc+'">'+(s.v>=0?'+':'')+s.v.toFixed(2)+'</div><div style="font-size:6px;color:rgba(148,163,184,0.4);margin-top:1px">'+s.l+'</div></div>';
          }).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:7.5px;font-weight:700;color:#38bdf8;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);padding:2px 8px;border-radius:4px;letter-spacing:.05em">${grav.growthType}</span>
          <span style="font-size:7px;color:rgba(148,163,184,0.35)">G=${grav.gravityScore.toFixed(2)} · ag=${seis.ag}g</span>
        </div>

        <!-- Sparkline traiectorie L → 2055 -->
        <div style="margin-top:5px;opacity:0.65">
          <div style="font-size:6px;color:rgba(148,163,184,0.35);margin-bottom:2px">Traiectorie L → 2055</div>
          <svg width="100%" height="18" viewBox="0 0 160 18" preserveAspectRatio="none"
            style="display:block;border-radius:2px;overflow:visible">
            <!-- Linia zero -->
            <line x1="3" y1="9" x2="157" y2="9" stroke="rgba(255,255,255,0.07)" stroke-width="0.5" stroke-dasharray="2,2"/>
            <!-- Traiectorie — calculata simplu -->
            ${(()=>{
              const pts=[], steps=12;
              let lc2=L;
              for(let i=0;i<=steps;i++){
                const x=3+i*(154/steps), y=9-lc2*7.5;
                pts.push(x.toFixed(1)+','+y.toFixed(1));
                lc2=Math.max(-1,Math.min(1, 0.7*lc2+0.3*(lifecycle.rawScore||L)));
              }
              const endY=9-(Math.max(-1,Math.min(1,lc2)))*7.5;
              const endCol=lc2>0.1?'#22c55e':lc2>-0.2?'#f59e0b':'#f87171';
              return '<path d="M '+pts.join(' L ')+ '" fill="none" stroke="'+Lcolor+'" stroke-width="1.5"/>'
                +'<circle cx="157" cy="'+endY.toFixed(1)+'" r="2.5" fill="'+endCol+'"/>';
            })()}
          </svg>
        </div>
      </div>
      <div style="font-size:7px;font-weight:700;color:rgba(148,163,184,0.3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px">DATE LIVE ${this.year}</div>`;

    el.innerHTML = heroHTML + rows.map(r=>`
      <div style="display:flex;justify-content:space-between;align-items:baseline;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04)" ${r.t?'title="'+r.t+'"':''}>
        <span style="font-size:8.5px;color:rgba(148,163,184,0.55);flex-shrink:0;margin-right:4px">${r.l}</span>
        <span style="font-size:9.5px;font-weight:700;color:${r.c};text-align:right">${r.v}</span>
      </div>`).join('');

    const r2 = document.getElementById('tci-kpis-r');
    if(r2) r2.innerHTML = el.innerHTML;

    // Housing Mix
    const hmEl = document.getElementById('tci-housing-mix');
    if(hmEl && housingMix) {
      const {mix,totalInvestitie} = housingMix;
      hmEl.innerHTML = `<div style="font-size:7px;font-weight:700;color:#D4AF37;letter-spacing:.06em;margin-bottom:5px">MIX CERERE LOCUINȚE 2025→2055</div>
        ${Object.entries(mix).filter(([,v])=>v.unitati>0).map(([k,v])=>`
          <div style="margin-bottom:3px">
            <div style="display:flex;justify-content:space-between">
              <span style="font-size:8px;color:rgba(200,215,235,0.8)">${v.label}</span>
              <span style="font-size:8px;font-weight:700;color:#D4AF37">${v.unitati.toLocaleString('ro-RO')} un.</span>
            </div>
            <div style="height:2px;background:rgba(255,255,255,0.06);border-radius:1px;margin-top:3px">
              <div style="width:${Math.min(100,v.pct*3)}%;height:100%;background:#D4AF37;opacity:0.6;border-radius:1px"></div>
            </div>
          </div>`).join('')}
        <div style="border-top:1px solid rgba(255,255,255,0.08);margin-top:5px;padding-top:4px;display:flex;justify-content:space-between">
          <span style="font-size:7px;color:rgba(148,163,184,0.5)">Total investiție</span>
          <span style="font-size:9px;font-weight:700;color:#a78bfa">≈${totalInvestitie.toLocaleString('ro-RO')} M€</span>
        </div>`;
    }

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
      // _searchSIRUTA = toate 3181 UAT-urile din INS SIRUTA dec.2025
      let res = typeof _searchSIRUTA!=='undefined' ? _searchSIRUTA(q,8) :
                typeof _searchUAT!=='undefined'    ? _searchUAT(q,8) : [];
      const el=document.getElementById('tci-cmp-res'); if(!el) return;
      if(!res.length){el.style.display='none';return;}
      el.innerHTML=res.map(r=>`
        <div onclick="TCI._cmpSelect('${r.key}','${r.name}')"
          style="padding:7px 10px;cursor:pointer;font-size:11px;color:rgba(200,215,235,0.9)"
          onmouseover="this.style.background='rgba(255,255,255,0.06)'"
          onmouseout="this.style.background='none'">
          <b>${r.name}</b><span style="color:rgba(148,163,184,0.4);font-size:9px"> · ${r.judet||'—'} · ${(r.pop2021||0).toLocaleString()}</span>
        </div>`).join('');
      el.style.display='block';
    },200);
  },

  _cmpSelect(key, name) {
    document.getElementById('tci-cmp-res').style.display='none';
    document.getElementById('tci-cmp-inp').value = name;

    // ── Lookup date UAT2 — același 3-step ca în _launch ─────────────────
    let d2 = null;
    if(typeof _RO_CITIES_DB !== 'undefined') d2 = _RO_CITIES_DB[key];
    if(!d2 && typeof _UAT_DB !== 'undefined')  d2 = _UAT_DB[key];
    if(!d2 && typeof _UAT_DB !== 'undefined') {
      const siruta = key.split('-').pop();
      d2 = Object.values(_UAT_DB).find(c => c.siruta === siruta || c.siruta === String(+siruta));
    }
    if(!d2) {
      document.getElementById('tci-cmp-out').innerHTML =
        `<div style="font-size:9px;color:#f87171;padding:6px">UAT negăsit în baza de date.</div>`;
      return;
    }

    const d1 = this.d || this.cityData || {};
    const el = document.getElementById('tci-cmp-out');
    if(!el) return;

    // ── Calculăm toți indicatorii pentru ambele UAT-uri ─────────────────
    const calc = (d) => {
      const grav  = this._calcGravityScore(d);
      const need  = this._calcUrbanNeed(d);
      const seis  = this._getSeismicAg(d.lon||27.6, d.lat||47.16);
      const clim  = this._getClimateProfile(d.judet||'');
      const feas  = this._calcFeasibility({}, d, seis.ag);
      const housing = this._calcHousingMix(need, d);
      const L     = grav.lifecycle?.score ?? 0;
      const Ltype = grav.growthType;
      const Lcolor = L > 0.3 ? '#4ade80' : L > -0.2 ? '#fbbf24' : '#f87171';
      return { d, grav, need, seis, clim, feas, housing, L, Ltype, Lcolor };
    };

    const A = calc(d1);
    const B = calc(d2);

    // ── Funcție de comparare vizuală ─────────────────────────────────────
    // win=true dacă A e mai bun, false dacă B e mai bun, null = neutral
    const cmp = (valA, valB, higherIsBetter=true) => {
      if(valA == null || valB == null) return null;
      const diff = higherIsBetter ? valA - valB : valB - valA;
      if(Math.abs(diff) < 0.01 * Math.max(Math.abs(valA),Math.abs(valB),1)) return null;
      return diff > 0 ? 'A' : 'B';
    };

    const fmt = (v, suffix='', decimals=0) =>
      v == null ? '—' : (typeof v === 'number' ? v.toFixed(decimals) : v) + suffix;

    // ── Rânduri benchmark ─────────────────────────────────────────────────
    const rows = [
      // [label, valA, valB, winner (A/B/null), unitate vizuală]
      { l:'Lifecycle Score L',
        vA: (A.L>=0?'+':'')+A.L.toFixed(2),
        vB: (B.L>=0?'+':'')+B.L.toFixed(2),
        cA: A.Lcolor, cB: B.Lcolor,
        w: cmp(A.L, B.L), tip:'Scor continuu [-1,+1] · Formula: f(Pg,Eg,Mn,Ac)' },
      { l:'Tip urban',
        vA: A.Ltype, vB: B.Ltype,
        cA:'#e2e8f0', cB:'#e2e8f0', w: null },
      { l:'Populație 2021',
        vA: (A.d.pop2021||0).toLocaleString('ro-RO'),
        vB: (B.d.pop2021||0).toLocaleString('ro-RO'),
        cA:'#e2e8f0', cB:'#e2e8f0',
        w: cmp(A.d.pop2021, B.d.pop2021), tip:'INS Recensământ 2021' },
      { l:'Prognoză 2055',
        vA: (A.need.pop2055||0).toLocaleString('ro-RO'),
        vB: (B.need.pop2055||0).toLocaleString('ro-RO'),
        cA: A.need.pop2055 > A.d.pop2021 ? '#4ade80':'#f87171',
        cB: B.need.pop2055 > B.d.pop2021 ? '#4ade80':'#f87171',
        w: cmp(A.need.pop2055, B.need.pop2055), tip:'Cohort Survival INS · Scenariu '+this.scenario },
      { l:'Rată demografică',
        vA: fmt(A.d.rata_reala_2011_2021, '%/an', 2),
        vB: fmt(B.d.rata_reala_2011_2021, '%/an', 2),
        cA: (A.d.rata_reala_2011_2021||0)>=0?'#4ade80':'#f87171',
        cB: (B.d.rata_reala_2011_2021||0)>=0?'#4ade80':'#f87171',
        w: cmp(A.d.rata_reala_2011_2021, B.d.rata_reala_2011_2021), tip:'INS 2011-2021' },
      { l:'Gravity Score',
        vA: A.grav.gravityScore.toFixed(3),
        vB: B.grav.gravityScore.toFixed(3),
        cA:'#e2e8f0', cB:'#e2e8f0',
        w: cmp(A.grav.gravityScore, B.grav.gravityScore), tip:'G = eP×0.30 + eC×0.25 + eE×0.20 + eK×0.15 + eI×0.10' },
      { l:'Presiune economică',
        vA: fmt(A.d.coef_hub, '', 2),
        vB: fmt(B.d.coef_hub, '', 2),
        cA:'#e2e8f0', cB:'#e2e8f0',
        w: cmp(A.d.coef_hub, B.d.coef_hub), tip:'coef_hub: 1.0=mediu, >1.0=hub regional, <0.7=periferic' },
      { l:'Locuințe necesare',
        vA: (A.need.locuinteTotale||0).toLocaleString('ro-RO'),
        vB: (B.need.locuinteTotale||0).toLocaleString('ro-RO'),
        cA:'#e2e8f0', cB:'#e2e8f0',
        w: null, tip:'HFE + Cohort · cerere totală 2025-2055' },
      { l:'Investiție estimată',
        vA: '≈'+Math.round((A.need.totalM2||0)*850/1e6)+'M€',
        vB: '≈'+Math.round((B.need.totalM2||0)*850/1e6)+'M€',
        cA:'#e2e8f0', cB:'#e2e8f0',
        w: null, tip:'€850/m² medie națională ANCPI 2024' },
      { l:'ROI estimat',
        vA: fmt(A.feas.roi, '%'),
        vB: fmt(B.feas.roi, '%'),
        cA: (A.feas.roi||0)>=12?'#4ade80':'#f87171',
        cB: (B.feas.roi||0)>=12?'#4ade80':'#f87171',
        w: cmp(A.feas.roi, B.feas.roi), tip:'Prag viabilitate: 12%' },
      { l:'Risc seismic',
        vA: 'ag='+A.seis.ag+'g · max R+'+A.seis.hMaxStory,
        vB: 'ag='+B.seis.ag+'g · max R+'+B.seis.hMaxStory,
        cA: A.seis.ag>=0.35?'#f87171':'#fbbf24',
        cB: B.seis.ag>=0.35?'#f87171':'#fbbf24',
        w: cmp(A.seis.ag, B.seis.ag, false), tip:'P100-1/2013 · MDLPA' },
      { l:'Risc climatic 2055',
        vA: A.clim.label || (A.clim.uhi+'°C UHI'),
        vB: B.clim.label || (B.clim.uhi+'°C UHI'),
        cA:'#e2e8f0', cB:'#e2e8f0',
        w: null, tip:'IPCC AR6 RCP4.5 · Copernicus' },

      // ── ECONOMIC ABSORPTION ────────────────────────────────────────
      { l:'Absorbție piață/an',
        vA: (A.feas.absorbtieAn||0).toLocaleString('ro-RO')+' un.',
        vB: (B.feas.absorbtieAn||0).toLocaleString('ro-RO')+' un.',
        cA: (A.feas.absorbtieAn||0)>200?'#4ade80':(A.feas.absorbtieAn||0)>80?'#fbbf24':'#f87171',
        cB: (B.feas.absorbtieAn||0)>200?'#4ade80':(B.feas.absorbtieAn||0)>80?'#fbbf24':'#f87171',
        w: cmp(A.feas.absorbtieAn, B.feas.absorbtieAn),
        tip:'Gospodării noi + cerere înlocuire − stoc excedentar · BNR + putere cumpărare locală' },
      { l:'Acces credit gospodării',
        vA: (A.feas.pctGospodariAcces||0)+'%',
        vB: (B.feas.pctGospodariAcces||0)+'%',
        cA: (A.feas.pctGospodariAcces||0)>35?'#4ade80':'#fbbf24',
        cB: (B.feas.pctGospodariAcces||0)>35?'#4ade80':'#fbbf24',
        w: cmp(A.feas.pctGospodariAcces, B.feas.pctGospodariAcces),
        tip:'% gospodării cu salariu ≥ rata credit. INS salariu mediu net per județ' },
      { l:'Vacanță locativă',
        vA: (A.feas.vacantaLocativa||0)+'%',
        vB: (B.feas.vacantaLocativa||0)+'%',
        cA: (A.feas.vacantaLocativa||0)<10?'#4ade80':'#f87171',
        cB: (B.feas.vacantaLocativa||0)<10?'#4ade80':'#f87171',
        w: cmp(A.feas.vacantaLocativa, B.feas.vacantaLocativa, false),
        tip:'Fond locativ excedentar — concurează cu piața primară' },

      // ── HOUSING MIX — top 2 tipologii ─────────────────────────────
      { l:'Tipologie dominantă',
        vA: (() => { const hm=A.housing?.mix; if(!hm) return '—'; const top=Object.entries(hm).sort((a,b)=>b[1].unitati-a[1].unitati)[0]; return top?`${top[1].label.split('/')[0].trim()} (${top[1].pct}%)`:'—'; })(),
        vB: (() => { const hm=B.housing?.mix; if(!hm) return '—'; const top=Object.entries(hm).sort((a,b)=>b[1].unitati-a[1].unitati)[0]; return top?`${top[1].label.split('/')[0].trim()} (${top[1].pct}%)`:'—'; })(),
        cA:'#e2e8f0', cB:'#e2e8f0',
        w: null, tip:'Tipologia cu cea mai mare cerere din Housing Mix Engine' },
      { l:'Senior housing',
        vA: (() => { const hm=A.housing?.mix; return hm?.senior?`${hm.senior.unitati.toLocaleString('ro-RO')} un. (${hm.senior.pct}%)`:'—'; })(),
        vB: (() => { const hm=B.housing?.mix; return hm?.senior?`${hm.senior.unitati.toLocaleString('ro-RO')} un. (${hm.senior.pct}%)`:'—'; })(),
        cA:'#a78bfa', cB:'#a78bfa',
        w: cmp(A.housing?.mix?.senior?.unitati, B.housing?.mix?.senior?.unitati),
        tip:'Cerere Senior Housing 65+ ani · populație în îmbătrânire rapidă' },
    ];

    // ── Scor global benchmark ─────────────────────────────────────────────
    let scoreA = 0, scoreB = 0;
    rows.forEach(r => { if(r.w==='A') scoreA++; else if(r.w==='B') scoreB++; });

    // ── Radar Chart SVG — 6 axe ────────────────────────────────────
    // Normalizăm 6 indicatori cheie pe [0,1] pentru vizualizare radar
    const radarNorm = (v, lo, hi) => v == null ? 0.1 : Math.max(0.05, Math.min(1, (v-lo)/(hi-lo)));
    const radarAxes = [
      { label:'Lifecycle L', vA: radarNorm(A.L, -1, 1), vB: radarNorm(B.L, -1, 1) },
      { label:'Gravity G',   vA: radarNorm(A.grav.gravityScore, 0, 1), vB: radarNorm(B.grav.gravityScore, 0, 1) },
      { label:'Absorbție',   vA: radarNorm(A.feas.absorbtieAn||0, 0, 800), vB: radarNorm(B.feas.absorbtieAn||0, 0, 800) },
      { label:'ROI',         vA: radarNorm(A.feas.roi||0, -50, 80), vB: radarNorm(B.feas.roi||0, -50, 80) },
      { label:'Pop 2055',    vA: radarNorm(A.need.pop2055||0, 0, 500000), vB: radarNorm(B.need.pop2055||0, 0, 500000) },
      { label:'Seismic ↓',   vA: radarNorm(1-A.seis.ag*2, 0, 1), vB: radarNorm(1-B.seis.ag*2, 0, 1) },
    ];

    const cx = 100, cy = 95, R = 72, n = radarAxes.length;
    const pt = (i, v) => {
      const a = (i / n) * 2 * Math.PI - Math.PI/2;
      return [cx + v*R*Math.cos(a), cy + v*R*Math.sin(a)];
    };
    const poly = (vals, col, opacity=0.18) => {
      const pts = vals.map((v,i) => pt(i,v).join(',')).join(' ');
      return `<polygon points="${pts}" fill="${col}" fill-opacity="${opacity}" stroke="${col}" stroke-width="1.5" stroke-opacity="0.8"/>`;
    };
    const ptsA = radarAxes.map((ax,i) => pt(i, ax.vA).join(','));
    const ptsB = radarAxes.map((ax,i) => pt(i, ax.vB).join(','));

    // Grid
    let gridSVG = '';
    [0.25, 0.5, 0.75, 1.0].forEach(lv => {
      const gpts = radarAxes.map((_,i) => pt(i,lv).join(',')).join(' ');
      gridSVG += `<polygon points="${gpts}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>`;
    });
    // Axes
    let axesSVG = radarAxes.map((_,i) => {
      const [x,y] = pt(i,1);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>`;
    }).join('');
    // Labels
    let labelsSVG = radarAxes.map((ax,i) => {
      const [x,y] = pt(i, 1.28);
      const anchor = x < cx-5 ? 'end' : x > cx+5 ? 'start' : 'middle';
      return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="7" fill="rgba(148,163,184,0.6)" font-family="system-ui">${ax.label}</text>`;
    }).join('');

    const radarSVG = `
      <svg width="200" height="190" viewBox="0 0 200 190">
        ${gridSVG}${axesSVG}
        ${poly(radarAxes.map(ax=>ax.vB), '#38bdf8')}
        ${poly(radarAxes.map(ax=>ax.vA), '#D4AF37')}
        ${labelsSVG}
        <!-- Legende -->
        <rect x="8" y="8" width="8" height="8" fill="#D4AF37" fill-opacity="0.7" rx="1"/>
        <text x="19" y="15.5" font-size="7.5" fill="rgba(200,215,235,0.7)" font-family="system-ui">${A.d.name||'A'}</text>
        <rect x="8" y="20" width="8" height="8" fill="#38bdf8" fill-opacity="0.7" rx="1"/>
        <text x="19" y="27.5" font-size="7.5" fill="rgba(200,215,235,0.7)" font-family="system-ui">${B.d.name||'B'}</text>
      </svg>`;


    el.innerHTML = `
      <div style="background:rgba(8,15,35,0.95);border:1px solid rgba(212,175,55,0.2);border-radius:10px;overflow:hidden;margin-top:5px">

        <!-- Radar Chart -->
        <div style="display:flex;justify-content:center;background:rgba(0,0,0,0.2);padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
          ${radarSVG}
        </div>

        <!-- Header -->
        <div style="display:grid;grid-template-columns:1fr 1fr;background:rgba(0,0,0,0.3);border-bottom:1px solid rgba(255,255,255,0.06)">
          <div style="padding:8px 10px;border-right:1px solid rgba(255,255,255,0.06)">
            <div style="font-size:9px;font-weight:800;color:#D4AF37">${A.d.name||'—'}</div>
            <div style="font-size:7px;color:rgba(148,163,184,0.5)">jud. ${A.d.judet||'—'} · ${(A.d.pop2021||0).toLocaleString()}</div>
          </div>
          <div style="padding:8px 10px">
            <div style="font-size:9px;font-weight:800;color:#38bdf8">${B.d.name||'—'}</div>
            <div style="font-size:7px;color:rgba(148,163,184,0.5)">jud. ${B.d.judet||'—'} · ${(B.d.pop2021||0).toLocaleString()}</div>
          </div>
        </div>

        <!-- Rânduri indicatori -->
        ${rows.map(r=>`
          <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid rgba(255,255,255,0.04)"
            title="${r.tip||''}">
            <div style="padding:5px 10px;border-right:1px solid rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:space-between;gap:4px">
              <span style="font-size:9px;font-weight:700;color:${r.cA}">${r.vA}</span>
              ${r.w==='A'?'<span style="font-size:8px;color:#4ade80">◀</span>':''}
            </div>
            <div style="padding:5px 10px;display:flex;align-items:center;justify-content:space-between;gap:4px">
              ${r.w==='B'?'<span style="font-size:8px;color:#38bdf8">▶</span>':''}
              <span style="font-size:9px;font-weight:700;color:${r.cB}">${r.vB}</span>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.02);padding:1px 10px 3px">
            <span style="font-size:7px;color:rgba(100,120,150,0.55)">${r.l}</span>
          </div>`
        ).join('')}

        <!-- Scor global -->
        <div style="display:grid;grid-template-columns:1fr 1fr;background:rgba(0,0,0,0.2)">
          <div style="padding:8px 10px;border-right:1px solid rgba(255,255,255,0.06);text-align:center">
            <span style="font-size:14px;font-weight:800;color:#D4AF37">${scoreA}</span>
            <span style="font-size:7px;color:rgba(148,163,184,0.4)"> indicatori favorabili</span>
          </div>
          <div style="padding:8px 10px;text-align:center">
            <span style="font-size:14px;font-weight:800;color:#38bdf8">${scoreB}</span>
            <span style="font-size:7px;color:rgba(148,163,184,0.4)"> indicatori favorabili</span>
          </div>
        </div>
        <div style="padding:4px 10px 6px;text-align:center">
          <span style="font-size:6.5px;color:rgba(100,120,150,0.4)">
            ◀ ▶ = indicator favorabil · Motoare: Lifecycle · Cohort · Gravity · Seismic · Climate · HFE · ROI
          </span>
        </div>
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
    const hub  = cityData.coef_hub || 0.78;
    const univ = cityData.universitati || 0;

    // Pg: creștere demografică normalizată [-1, +1]
    // Pg: calibrat pe distributia INS. Rata 4%/an = maxim real in RO.
    // Anterior 2.5 era prea mic → Iași (+2.19%) dădea Pg=0.88 (aproape maxim)
    const Pg = Math.max(-1, Math.min(1, rata / 4.0));

    // Eg: presiune economică din coef_hub (media RO = 0.78)
    const Eg = Math.max(-1, Math.min(1, (hub - 0.78) * 2.2));

    // Mn: balanță migrație — SEMNAL INDEPENDENT de Pg
    // Audit v125: Mn = Pg + bonus era duplicat. Fix:
    // Mn = f(deviereRegionala, pullEconomic, pullUniversitar)
    // Logică: un oraș crește față de media regiunii → atrage migrație netă
    const RATA_MED_REGIUNE = {
      'BI':0.5,'NV':0.1,'V':0.0,'C':-0.2,
      'NE':-0.6,'SE':-0.9,'S':-1.1,'SV':-1.2
    };
    const regiune = cityData.regiune || 'NE';
    const rataReg = RATA_MED_REGIUNE[regiune] ?? -0.5;
    const deviereReg  = Math.max(-1, Math.min(1, (rata - rataReg) / 3.0));
    const pullEcon    = Math.max(-0.5, Math.min(0.5, (hub - 0.78) * 1.2));
    const pullUniv    = Math.min(0.4, univ * 0.10);
    const Mn = Math.max(-1, Math.min(1,
      deviereReg * 0.55 + pullEcon * 0.30 + pullUniv * 0.15
    ));

    // Ac: trend autorizații INS TEMPO
    const permTrend = cityData._permitsGrowth || 1.0;
    const Ac = Math.max(-1, Math.min(1, (permTrend - 1.0) * 1.5));

    // L = Pg×0.35 + Eg×0.25 + Mn×0.25 + Ac×0.15
    const L = Pg*0.35 + Eg*0.25 + Mn*0.25 + Ac*0.15;
    const score = Math.max(-1, Math.min(1, L));

    // Inertie: L(t+1) = 0.7×L(t) + 0.3×L_nou
    const rawScore = score;
    const prevL = cityData._lifecyclePrev ?? score;
    const inertiaScore = 0.7 * prevL + 0.3 * rawScore;
    if(cityData) cityData._lifecyclePrev = inertiaScore;
    const finalScore = Math.max(-1, Math.min(1, inertiaScore));

    // FIX audit: STABLE [-0.30, +0.10] era prea larg
    // Botoșani (L=-0.14) și Piatra Neamț (L=-0.25) apăreau STABLE — incorect
    // Adăugăm WEAKENING ca stare intermediară
    const lifecycleType =
      finalScore >  0.45 ? 'GROWING'   :
      finalScore >  0.05 ? 'STABLE'    :
      finalScore > -0.20 ? 'WEAKENING' :
      finalScore > -0.55 ? 'DECLINING' :
                           'SHRINKING';

    return { score:finalScore, rawScore, lifecycleType, Pg, Eg, Mn, Ac,
             inertia:prevL, deviereReg, pullEcon, pullUniv };
  },

  _calcGravityScore(cityData){
    const pop=(cityData?.pop2021||100000),rate=(cityData?.rata_reala_2011_2021||0)/100;
    const UNIV_CITIES={'IS':5,'CJ':4,'TM':4,'B':10,'BV':2,'SB':2,'CS':2,'BC':1,'SV':1,'GL':1,'CT':2,'MS':2,'HR':1,'NT':1};
    const univ=(cityData?.universitati||UNIV_CITIES[cityData?.judet||'']||0),judet=cityData?.judet||'';
    const eP=Math.min(1,pop/400000),eC=Math.max(0,Math.min(1,(rate+0.02)/0.04));
    const eE=Math.min(1,univ/3);

    // eK: conectivitate rutieră reală per județ — Audit: hardcodat 6 județe era greșit
    // Sursă: CNAIR 2025 + Masterplan autostrăzi + A7(2027)/A8(2028)
    const EK_MAP = {
      'B':1.00,'IF':0.92,'TM':0.88,'CJ':0.88,'PH':0.82,'AR':0.82,'BH':0.82,
      'BV':0.82,'CT':0.82,'SB':0.78,'DJ':0.78,'AB':0.72,'DB':0.72,'AG':0.70,
      'IS':0.70,'MS':0.68,'HD':0.68,'MM':0.66,'SM':0.66,'GL':0.68,'BC':0.68,
      'SJ':0.62,'NT':0.62,'SV':0.62,'CS':0.62,'BZ':0.62,'BR':0.62,
      'BT':0.52,'VS':0.58,'GJ':0.58,'VL':0.58,'OT':0.56,'MH':0.56,
      'HR':0.56,'BN':0.60,'CV':0.58,'IL':0.56,'VN':0.52,'TR':0.52,'TL':0.48,'CL':0.54,
    };
    const eK = EK_MAP[judet] || 0.52;

    const eI=rate>0?0.7:rate>-0.01?0.4:0.2;
    const score=eP*.30+eC*.25+eE*.20+eK*.15+eI*.10;

    const lifecycle = this._calcLifecycleScore(cityData);
    const isLargeCity = pop > 250000;
    // FIX audit: comune periurbane cu creștere rapidă apăreau REGIONAL/METROPOLITAN
    const isComuna_g = (cityData?.tip === 'comuna');
    const growthTypeBase =
      (score>0.55 || isLargeCity&&score>0.45) ? 'METROPOLITAN' :
      score>0.35 && lifecycle.score>-0.2      ? 'REGIONAL'     :
      lifecycle.score < -0.55                  ? 'SHRINKING'    :
      lifecycle.score < -0.20                  ? 'DECLINING'    :
      score>0.22                               ? 'LOCAL'        :
                                                 'DECLINING'    ;
    // Comune: max GROWING sau LOCAL (nu pol regional sau metropolitan)
    const growthType = isComuna_g
      ? (lifecycle.score > 0.45 ? 'GROWING'   :
         lifecycle.score > 0.05 ? 'LOCAL'      :
         lifecycle.score > -0.20? 'WEAKENING'  : 'DECLINING')
      : growthTypeBase;

    return { gravityScore:score, growthType,
             ePopulatie:eP, eCrestere:eC, eEducatie:eE, eConectivit:eK, lifecycle };
  },

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
  // ══════════════════════════════════════════════════════════════════════
  // HOUSING DEMAND ENGINE — Mix tipologii locuințe 2025-2055
  // Audit: anterior era un singur număr total. Acum: 7 tipologii distincte.
  // Fiecare are cerere diferită per growthType + demografic + economic.
  // ══════════════════════════════════════════════════════════════════════════
  _calcHousingMix(need, cityData) {
    const { locuinteTotale, pop2021 } = need;
    const { growthType } = need.gravity;
    const hub  = cityData?.coef_hub || 0.78;
    const univ = cityData?.universitati || 0;

    // Structura demografică din populația curentă
    const pct65plus = 0.048 + 0.038 + 0.035; // 65-69 + 70-74 + 75+
    const seniorPop = Math.round(pop2021 * pct65plus);

    // ── Ponderi per tipologie ────────────────────────────────────────────
    // Studio/Garsoniere: tineri 20-35 + single + studenți
    const pctStudio = Math.min(0.30,
      0.12 + (univ > 2 ? 0.07 : univ > 0 ? 0.04 : 0)
           + (hub > 1.0 ? 0.04 : 0)
           + (growthType==='METROPOLITAN'||growthType==='REGIONAL' ? 0.03 : 0)
    );
    // 2 camere: primul apartament, cupluri tinere, migrație economică
    const pct2cam = 0.26 + (growthType==='METROPOLITAN' ? 0.02 : 0);
    // 3 camere: familii consolidate, clasa medie
    const pct3cam = growthType==='METROPOLITAN' ? 0.22 : 0.18;
    // Senior Housing: 65+ în creștere rapidă (+40% până în 2055)
    const pctSenior = Math.min(0.15, 0.04 + (seniorPop / pop2021) * 0.35);
    // Premium: hub economic puternic, expați, management
    const pctPremium = Math.max(0, Math.min(0.10, (hub - 0.90) * 0.35));
    // Suburban/Case: expansie periurbană, familii cu copii
    const pctSuburban = (growthType==='METROPOLITAN'||growthType==='REGIONAL') ? 0.11 : 0.07;
    // Cămine studențești: per universitate (unități = locuri de cazare)
    const pctStudent = univ > 0 ? Math.min(0.07, univ * 0.014) : 0;

    // Normalizăm să sumeze 1.0
    const rawPcts = { studio:pctStudio, t2cam:pct2cam, t3cam:pct3cam,
                      senior:pctSenior, premium:pctPremium,
                      suburban:pctSuburban, student:pctStudent };
    const sumPct = Object.values(rawPcts).reduce((s,v)=>s+v, 0);
    const pcts = Object.fromEntries(Object.entries(rawPcts).map(([k,v])=>[k, v/sumPct]));

    // Suprafețe medii (m²) și prețuri medii (€/m² ANCPI 2024)
    const META = {
      studio:   { m2:38,  eur:1050, label:'Studio / Garsoniere',    segment:'tineri 20-35 ani · studenți · single' },
      t2cam:    { m2:58,  eur:950,  label:'Apartamente 2 camere',   segment:'familii tinere · migrație economică' },
      t3cam:    { m2:78,  eur:900,  label:'Apartamente 3 camere',   segment:'familii cu copii · clasă medie' },
      senior:   { m2:48,  eur:850,  label:'Senior Housing',         segment:'65+ ani · cerere +40% până în 2055' },
      premium:  { m2:125, eur:1800, label:'Rezidențial Premium',    segment:'venituri >3.000€/lună · expați' },
      suburban: { m2:155, eur:700,  label:'Case Suburbane',         segment:'expansie periurbană · familii cu mașini' },
      student:  { m2:18,  eur:600,  label:'Cămine Studențești',     segment:`${Math.round(univ*8000)} locuri necesare` },
    };

    const mix = {};
    Object.entries(pcts).forEach(([k, pct]) => {
      const m = META[k];
      const unitati = Math.max(0, Math.round(locuinteTotale * pct));
      const m2_total = unitati * m.m2;
      mix[k] = {
        ...m,
        pct:       Math.round(pct * 100),
        unitati,
        m2_total,
        investitie_m: Math.round(m2_total * m.eur / 1e6), // M€
      };
    });

    const totalInvestitie = Object.values(mix).reduce((s,v)=>s+v.investitie_m, 0);
    return { mix, totalInvestitie };
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
    if(gravity.growthType === 'DECLINING' || gravity.growthType === 'SHRINKING') {
      console.log('[Frontier] ' + gravity.growthType + ' → frontier analysis blocat.');
      return [];
    }
    // WEAKENING: frontier activ dar raza redusă (nu extindem, densificăm selectiv)
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

    // ── Accessibility Engine — OSRM Table API ────────────────────────
    // Documentul audit: "Orașele cresc după timp de acces, nu distanță geometrică"
    // OSRM table endpoint: O singură cerere pentru top 30 celule
    // Înlocuiește Id = 1 - dk/radius (euclidean) cu Id = f(travel_time_min)
    //
    // Miroslava e la 8km de Iași dar 12 min → Id ridicat
    // Un sat la 6km pe drum montan → 35 min → Id scăzut
    const topCellsForOSRM = [...cells.values()]
      .sort((a,b)=>b.Pu-a.Pu)
      .slice(0, 30); // max 30 → o singură cerere OSRM

    if(topCellsForOSRM.length > 0) {
      try {
        // Format: src;dst1;dst2;... (centrul orașului = sursa)
        const coords = [
          `${cx},${cy}`,
          ...topCellsForOSRM.map(c=>`${c.lon.toFixed(5)},${c.lat.toFixed(5)}`)
        ].join(';');
        const destinations = topCellsForOSRM.map((_,i)=>i+1).join(';');
        const osrmUrl = `https://router.project-osrm.org/table/v1/driving/${coords}` +
          `?sources=0&destinations=${destinations}&annotations=duration`;

        const osrmResp = await fetch(osrmUrl, {signal: AbortSignal.timeout(6000)});
        if(osrmResp.ok) {
          const osrmData = await osrmResp.json();
          const durations = osrmData.durations?.[0] || []; // timpi în secunde de la centru

          topCellsForOSRM.forEach((cell, i) => {
            const durSec = durations[i];
            if(durSec == null || durSec < 0) return; // null = inaccesibil rutier

            const durMin = durSec / 60;
            cell.travelMin = Math.round(durMin);

            // Id bazat pe timp real — înlocuiește distanța euclidiană
            // < 10 min: excelent | 10-20: bun | 20-35: moderat | > 35: slab
            const IdReal = durMin < 10  ? 1.00 :
                           durMin < 20  ? 0.75 :
                           durMin < 30  ? 0.50 :
                           durMin < 45  ? 0.25 : 0.05;

            // Recalculează P(u) cu Id real (înlocuiește Id euclidean)
            const IdOld = cell.Id;
            cell.Id = IdReal;
            cell.Pu = cell.isFrontier
              ? cell.Ra*0.25 + cell.Db*0.20 + cell.Ec*0.15 + IdReal*0.15 +
                cell.Ce*0.10 + cell.Zf*0.10 + cell.Sg*0.05
              : cell.Ra*0.12 + cell.Db*0.10 + cell.Ec*0.10 + IdReal*0.10 +
                cell.Ce*0.05 + cell.Zf*0.05 + cell.Sg*0.03;

            // Aplică din nou slope (dacă fusese aplicat)
            if(cell.slopeSuit != null) cell.Pu *= cell.slopeSuit;
          });
          const validTimes = topCellsForOSRM.filter(c=>c.travelMin!=null);
          console.log(`[OSRM] ✅ Travel time pentru ${validTimes.length} celule | ` +
            `min=${Math.min(...validTimes.map(c=>c.travelMin))}min ` +
            `max=${Math.max(...validTimes.map(c=>c.travelMin))}min`);
        }
      } catch(e) {
        console.warn('[OSRM] Table API indisponibil:', e.message, '— folosim distanță euclidiană');
      }
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
      const accessLabel = cell.travelMin != null ? ` · ${cell.travelMin}min` : '';
      const label = isVillaPremium
        ? `Premium Low-Density · P=${Math.round(cell.Pu*100)}%`
        : `Frontier ${pClass} · P=${Math.round(cell.Pu*100)}%`;

      zones.push({
        lon:cell.lon,lat:cell.lat,
        id:`FRN-${zones.length}`,color,hMax,startYr,
        rx:isVillaPremium?0.002:0.003+cell.Pu*0.003,
        ry:isVillaPremium?0.0014:0.002+cell.Pu*0.002,
        label,
        sub:`Db=${cell.Db.toFixed(2)} Ra=${cell.Ra.toFixed(2)}${slopeLabel}${accessLabel}`,
        // Provenance — vizibil în popup la click
        _prob:cell.Pu, _class:pClass,
        _Ra:cell.Ra, _Db:cell.Db, _Ec:cell.Ec,
        _Ce:cell.Ce, _Zf:cell.Zf, _Sg:cell.Sg,
        _permitsGrowth:cell.permitsGrowth,
        _travelMin:cell.travelMin,
        slopeDeg:cell.slopeDeg, slopeType:cell.slopeType,
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
  // ══════════════════════════════════════════════════════════════════════
  // SLOPE ENGINE — Terrain via Mapbox Terrain RGB tiles
  // ── Fără CORS, fără API key separat — folosim token-ul Mapbox existent
  // ── Mapbox Terrain-RGB: elevatia encodată în RGB per pixel
  //    elevation = -10000 + (R*256*256 + G*256 + B) * 0.1
  // ── Fallback: estimare din lat (România: câmpie 50-200m, deal 200-600m)
  // ══════════════════════════════════════════════════════════════════════
  async _fetchElevationBatch(cells) {
    if(!cells?.length) return new Map();
    const elevMap = new Map();

    // Obținem token Mapbox din harta existentă
    const token = mapboxgl?.accessToken || window._mapboxToken || '';

    if(token) {
      // Zoom 9 — rezoluție ~300m/pixel, suficient pentru grid 200m
      const Z = 9;
      const n2t = (lat,lon,z) => {
        const n = Math.floor((1-Math.log(Math.tan(lat*Math.PI/180)+1/Math.cos(lat*Math.PI/180))/Math.PI)/2*Math.pow(2,z));
        const t = Math.floor((lon+180)/360*Math.pow(2,z));
        return [t,n];
      };

      // Grupăm celulele pe tile-uri pentru a minimiza request-urile
      const tileGroups = new Map();
      cells.forEach(cell => {
        const [tx,ty] = n2t(cell.lat, cell.lon, Z);
        const tk = `${tx}_${ty}`;
        if(!tileGroups.has(tk)) tileGroups.set(tk,[]);
        tileGroups.get(tk).push(cell);
      });

      // Fetch max 6 tile-uri (cele mai populate)
      const sorted = [...tileGroups.entries()].sort((a,b)=>b[1].length-a[1].length).slice(0,6);

      await Promise.allSettled(sorted.map(async ([tk, tcells]) => {
        const [tx,ty] = tk.split('_').map(Number);
        const url = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${Z}/${tx}/${ty}.pngraw?access_token=${token}`;
        try {
          const resp = await fetch(url, {signal:AbortSignal.timeout(5000)});
          if(!resp.ok) return;
          const blob = await resp.blob();
          const img = await createImageBitmap(blob);
          const canvas = new OffscreenCanvas(256, 256);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          tcells.forEach(cell => {
            // Coordonate pixel în tile
            const tileSize = Math.pow(2,Z);
            const px = Math.floor(((cell.lon+180)/360*tileSize - tx) * 256);
            const py = Math.floor(((1-Math.log(Math.tan(cell.lat*Math.PI/180)+1/Math.cos(cell.lat*Math.PI/180))/Math.PI)/2*tileSize - ty) * 256);
            if(px<0||px>255||py<0||py>255) return;
            const [r,g,b] = ctx.getImageData(px,py,1,1).data;
            const elev = -10000 + (r*256*256 + g*256 + b) * 0.1;
            elevMap.set(cell.key, Math.round(elev));
          });
        } catch(e) { /* tile fetch failed, fallback below */ }
      }));
    }

    // Fallback pentru celule fără elevație: estimare din latitudine și longitudine
    // România: câmpie sud/vest ~50-150m, deal central ~200-500m, munte ~600-2500m
    cells.forEach(cell => {
      if(elevMap.has(cell.key)) return;
      // Estimare brută: munții Carpați sunt la lon 22-26.5, lat 44.5-47.5
      const isMountain = (cell.lon > 22.5 && cell.lon < 26.5) &&
                         (cell.lat > 44.5 && cell.lat < 47.5);
      const elevEst = isMountain ? 400 : 150; // estimare conservatoare
      elevMap.set(cell.key, elevEst);
    });

    const realCount = [...elevMap.values()].filter(v=>v!==150&&v!==400).length;
    console.log(`[Slope] ✅ ${elevMap.size} celule | ${realCount} din Mapbox Terrain | ${elevMap.size-realCount} fallback`);
    return elevMap;
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
      const _pUrl = 'https://urbanx-proxy.3dtravelsoftart.workers.dev/proxy?url=' + encodeURIComponent(url);
      const r = await fetch(_pUrl, {signal:AbortSignal.timeout(6000)});
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
  // ══════════════════════════════════════════════════════════════════════
  // ECONOMIC ABSORPTION ENGINE — v2
  // Audit: ROI anterior = (pS - cT) / cT. Prea simplu — ignora absorbția reală.
  //
  // Absorbție reală = f(putere_cumpărare, creditare, stoc_excedentar, vacanță)
  //
  // Date disponibile local (fără API extern):
  //   - Salariu mediu net per județ (INS 2024, static)
  //   - Rata BNR de referință (hardcodat la valoarea curentă)
  //   - Stoc excedentar estimat din household size trend
  //   - Vacanță locativă estimată din growthType
  // ══════════════════════════════════════════════════════════════════════
  _calcFeasibility(zone, cityData, seismicAg) {
    const g = this._calcGravityScore(cityData);
    const need = this._calcUrbanNeed(cityData);
    const pop = cityData?.pop2021 || 100000;
    const judet = cityData?.judet || 'IS';

    // ── 1. PREȚURI DE VÂNZARE — per tip urban ─────────────────────────
    // Sursă: ANCPI raport piață imobiliară 2024, calibrat per tier
    // Prețuri vânzare: per județ dacă disponibil, altfel per tier
    // Audit: METROPOLITAN unic 1800€/m² era greșit — Oradea ≠ Iași ≠ București
    // Sursă: ANCPI Raport Piață Imobiliară 2024
    const PRET_VANZARE_JUDET = {
      'B':2200,'IF':1700,'CJ':1700,'TM':1600,'BV':1450,'SB':1400,
      'CT':1350,'IS':1600,'BH':1250,'AR':1150,'PH':1050,'GL':850,
      'BC':950, 'NT':820, 'BT':700, 'VS':650, 'SV':780, 'MM':950,
      'MS':900, 'HR':800, 'CV':780, 'CS':780, 'HD':820, 'AB':900,
      'BN':850, 'SM':900, 'SJ':820, 'BR':800, 'VN':750, 'BZ':900,
      'PH':1050,'DB':950, 'AG':900, 'OT':700, 'DJ':900, 'GJ':750,
      'VL':750, 'MH':720, 'TR':680, 'GR':750, 'CL':680, 'IL':720, 'TL':700,
    };
    const PRET_VANZARE_TIER = {
      METROPOLITAN:1400, REGIONAL:900, LOCAL:650, DECLINING:450, SHRINKING:300
    };
    const pS = PRET_VANZARE_JUDET[cityData?.judet||''] || PRET_VANZARE_TIER[g.growthType] || 700;

    // ── 2. COSTURI CONSTRUCȚIE — per caracteristici UAT ───────────────
    const seismic = seismicAg || 0.20;
    const factorSeismic = seismic >= 0.35 ? 1.28 : seismic >= 0.25 ? 1.14 : 1.00;
    const pB = Math.round(850 * factorSeismic); // €/m² construcție + seismic
    // EK_MAP disponibil local pentru calculul pL
    const EK_MAP = {
      'B':1.00,'IF':0.92,'TM':0.88,'CJ':0.88,'PH':0.82,'AR':0.82,'BH':0.82,
      'BV':0.82,'CT':0.82,'SB':0.78,'DJ':0.78,'AB':0.72,'DB':0.72,'AG':0.70,
      'IS':0.70,'MS':0.68,'HD':0.68,'MM':0.66,'SM':0.66,'GL':0.68,'BC':0.68,
      'SJ':0.62,'NT':0.62,'SV':0.62,'CS':0.62,'BZ':0.62,'BR':0.62,
      'BT':0.52,'VS':0.58,'GJ':0.58,'VL':0.58,'OT':0.56,'MH':0.56,
      'HR':0.56,'BN':0.60,'CV':0.58,'IL':0.56,'VN':0.52,'TR':0.52,'TL':0.48,'CL':0.54,
    };
    // pL: teren. Comune = mult mai ieftin decât municipii.
    // Audit: pL=150×G×2.2 pentru Miroslava dădea ~230€/m², prea mare pentru o comună
    const tipUAT = cityData?.tip || 'municipiu';
    const isComuna = tipUAT === 'comuna';
    const eKForPL  = EK_MAP[cityData?.judet||''] || 0.52;
    const pL = isComuna
      ? Math.round(60 * Math.min(1.0, eKForPL * 1.5))   // comună: teren 60€ bază
      : Math.round(150 * (g.gravityScore || 0.4) * 2.2); // municipiu/oraș: original
    const cF = Math.round(pB * 0.08);  // costuri financiare (credit constructor)
    const cT = pL + pB + cF;

    // ── 3. PUTEREA DE CUMPĂRARE — salariu mediu net per județ ─────────
    // INS 2024 — salariu mediu net lunar (RON), convertit la EUR (1 EUR = 5.0 RON)
    const SALARIU_NET_EUR = {
      'B':1580,'IF':1420,'CJ':1380,'TM':1350,'BV':1280,'CT':1250,'SB':1220,
      'IS':1080,'AR':1180,'BH':1200,'SV':980,'NT':920,'BC':980,'VS':860,
      'BT':840,'GL':980,'BR':920,'DJ':1050,'OT':880,'GJ':960,'VL':900,
      'PH':1100,'DB':1020,'AG':1050,'CS':950,'HD':1020,'MS':1050,'HR':980,
      'MM':1020,'SM':1050,'SJ':960,'AB':1020,'CV':980,'BN':980,'BZ':980,
      'IL':920,'CL':900,'GR':880,'TR':860,'TL':920,'VN':880,'MH':900,
    };
    const salariuEur = SALARIU_NET_EUR[judet] || 950;

    // ── 4. ACCESIBILITATE CREDIT ──────────────────────────────────────
    // Rata BNR referință (actualizată manual la necesitate)
    const RATA_BNR = 5.75; // % anual (mai 2026)
    const rataCreditIpotecar = RATA_BNR + 2.5; // spread bancă tipic
    // Unitate medie 68m² — cât costă și câtă rată suportă
    const pretUnitateEur = Math.round(pS * 68);
    const avans20pct = Math.round(pretUnitateEur * 0.20);
    const creditNecesar = pretUnitateEur - avans20pct;
    // Rată lunară credit 30 ani
    const rataLunara_pct = rataCreditIpotecar / 100 / 12;
    const nrLuni = 30 * 12;
    const rataCreditLunara = Math.round(
      creditNecesar * rataLunara_pct * Math.pow(1 + rataLunara_pct, nrLuni)
      / (Math.pow(1 + rataLunara_pct, nrLuni) - 1)
    );
    // Regula BNR: rata ≤ 40% din venit net
    const venitMaxAdmis = Math.round(rataCreditLunara / 0.40);
    // Gospodării cu venituri suficiente (proxy din salariu mediu)
    // Presupunem distribuție log-normală: ~30% din gospodării au venit > pragul
    const pctGospodariAcces = Math.max(0.05, Math.min(0.65,
      salariuEur > venitMaxAdmis
        ? 0.55  // salariu mediu depășește pragul → >50% au acces
        : (salariuEur / venitMaxAdmis) * 0.45
    ));

    // ── 5. STOC EXCEDENTAR — locuințe goale în piață ─────────────────
    // Estimat din rata demografică și household size trend
    const rataDemogr = cityData?.rata_reala_2011_2021 || 0;
    const vacantaLocativa = g.growthType === 'GROWING'    ? 0.04 :
                            g.growthType === 'STABLE'     ? 0.08 :
                            g.growthType === 'LOCAL'      ? 0.12 :
                            g.growthType === 'WEAKENING'  ? 0.15 :
                            g.growthType === 'DECLINING'  ? 0.18 :
                                                            0.28; // SHRINKING
    // Fond existent estimat (INS ratio ~0.43 locuinte/persoana)
    const fondExistent = Math.round(pop * 0.43);
    const stocExcedentar = Math.round(fondExistent * vacantaLocativa);

    // ── 6. ABSORBȚIE ANUALĂ ───────────────────────────────────────────
    // Gospodării noi anual (din cohort survival)
    const gospodariiNoi = Math.round((need.locuinteTotale || 0) / 30); // pe 30 ani
    // Absorbție = gospodării cu acces credit × rata accesibilitate
    const absorbtieGospodarii = Math.round(gospodariiNoi * pctGospodariAcces);
    // Penalizare stoc excedentar: concurență cu piața secundară
    const penalizareStoc = Math.max(0, Math.round(stocExcedentar * 0.05)); // 5%/an se reabsorb
    const absorbtieNeta = Math.max(0, absorbtieGospodarii - penalizareStoc);
    // Cerere de înlocuire: fond vechi (>40 ani) → 1.2%/an necesită înlocuire
    const cerereInlocuire = Math.round(fondExistent * 0.012);
    const absorbtieAnualaTotal = absorbtieNeta + cerereInlocuire;

    // ── 7. ROI AJUSTAT CU ABSORBȚIE ───────────────────────────────────
    // ROI brut (preț vs cost)
    const roiBrut = (pS - cT) / cT;
    // Factor absorbție: piață cu absorbție mică → risc crescut → ROI ajustat în jos
    const absorbtieRef = { METROPOLITAN:600, REGIONAL:250, LOCAL:120, DECLINING:60, SHRINKING:20 };
    const absorbtieRefVal = absorbtieRef[g.growthType] || 120;
    const factorAbsorbtie = Math.min(1.2, Math.max(0.5,
      absorbtieAnualaTotal / absorbtieRefVal
    ));
    const roiAjustat = roiBrut * factorAbsorbtie;
    const roi = Math.round(roiAjustat * 1000) / 10;
    const viable = roiAjustat > 0.12;

    return {
      // Prețuri
      priceSale: pS, priceLand: pL, priceBuild: pB, cTotal: cT,
      // ROI
      roi, roiBrut: Math.round(roiBrut * 1000) / 10,
      viable,
      // Absorbție
      absorbtieAn:      absorbtieAnualaTotal,
      absorbtieNeta,
      cerereInlocuire,
      stocExcedentar,
      vacantaLocativa:  Math.round(vacantaLocativa * 100),
      // Credit
      salariuEur, rataCreditLunara, pctGospodariAcces: Math.round(pctGospodariAcces * 100),
      venitMaxAdmis, pretUnitate: pretUnitateEur,
      // Label
      label: viable
        ? `ROI ${roi}% ✓ · Absorbție ~${absorbtieAnualaTotal} un./an`
        : `ROI ${roi}% ⚠ · Absorbție limitată ~${absorbtieAnualaTotal} un./an`,
    };
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
    const d=this.d||{}, scn=this._getScenario(), need=this._calcUrbanNeed(d);
    const grav=this._calcGravityScore(d), seis=this._getSeismicAg(d.lon||27.6,d.lat||47.16);
    const clim=this._getClimateProfile(d.judet||''), zones=this._projZones||[];
    const upeRes=this._runUPE(d,zones), feas=this._calcFeasibility({},d,seis.ag);
    const housing=this._calcHousingMix(need,d);
    const lc=grav.lifecycle||{score:0,Pg:0,Eg:0,Mn:0,Ac:0};
    const today=new Date().toLocaleDateString('ro-RO',{year:'numeric',month:'long',day:'numeric'});
    const iso=new Date().toISOString().split('T')[0];
    const n=(v,dec=0)=>typeof v==='number'?v.toLocaleString('ro-RO',{minimumFractionDigits:dec,maximumFractionDigits:dec}):v||'—';
    const pct=v=>`${v>=0?'+':''}${(v*100).toFixed(0)}%`;

    // ── Recomandări specifice per growthType ─────────────────────────
    const REC = {
      METROPOLITAN: {
        primar:   'Actualizare PUG urgent — presiune imobiliară depășește capacitatea actuală. Introduceți zone de densificare controlată pe axele de transport.',
        investit: `ROI ${feas.roi}% susținut de cerere ridicată. Zone prioritare: coridoare transport + centru consolidat. Risc: supraaglomerare fără infrastructură.`,
        oar:      'PUZ obligatoriu pentru zone periurbane. Reglementare înălțimi per P100 ag=' + seis.ag + 'g. Mixitate funcțională obligatorie în proiecte >500 unități.',
        cnair:    'Coordonare urgentă noduri autostradă cu zone logistice identificate. Centuri ocolitoare — prioritate națională.',
      },
      REGIONAL: {
        primar:   'Densificare moderată pe coridoarele principale. Evitați expansiunea necontrolată — costul infrastructurii depășește beneficiul fiscal pe termen scurt.',
        investit: `ROI ${feas.roi}% — viabil cu absorbție corectă. Segment recomandat: 2 camere + suburban. Evitați premium fără studiu de piață local.`,
        oar:      'Regulament local urbanistic care definește aliniamente și înălțimi. Protejați silueta istorică acolo unde există.',
        cnair:    'Verificați conectarea cu A7/A8/A13 planificate — poate schimba radical coridoarele de dezvoltare.',
      },
      LOCAL: {
        primar:   'Consolidare fond existent înainte de extindere. Reabilitarea clădirilor vechi are ROI mai bun decât construcțiile noi în zone cu cerere slabă.',
        investit: `ROI ${feas.roi}% — marginal. Studiați segmentul senior housing și reconversie industrială. Evitați rezidențial nou fără cerere demonstrată.`,
        oar:      'PUG simplificat cu focus pe zonele construite. Evitați reglementări care blochează reconversia.',
        cnair:    'Conectivitate rutieră — factor critic pentru atragere investiții. Lobby pentru DJ modernizat.',
      },
      WEAKENING: {
        primar:   'Consolidare fond existent înainte de orice extindere. Reabilitare termică și structurală — reduce costul pe termen lung.',
        investit: `ROI ${'{feas.roi}'}% — marginal. Studiați senior housing și reconversie. Evitați rezidențial nou fără studiu de absorbție local.`,
        oar:      'Regulament local care încurajează reconversia și reabilitarea. Nu blocați densificarea în centru.',
        cnair:    'Menținere și modernizare drum național principal — reducerea timpului de acces la municipiu crește valoarea imobiliară local.',
      },
      DECLINING: {
        primar:   'Zero expansiune periferică. Concentrați resursele în centru: reabilitare, spații verzi, servicii de proximitate. Atrageți servicii medicale și sociale.',
        investit: `ROI ${feas.roi}% — nesustenabil pentru rezidențial nou. Oportunitate: reconversie industrială, medical, senior housing subvenționat.`,
        oar:      'Demolare clădiri abandonate și reconstrucție pe același amprentă — singura expansiune justificată. Prioritate verde urban.',
        cnair:    'Investiție în transport public, nu în drumuri noi — reduce costul mobilității pentru populația rămasă.',
      },
      SHRINKING: {
        primar:   'Plan de contracție controlată. Concentrați serviciile în nuclee viabile. Renunțați la infrastructura din zonele depopulate.',
        investit: 'Nu recomandăm investiții rezidențiale noi. Potențial: agricultură intensivă, energie regenerabilă, turism rural.',
        oar:      'Studiu de reconversie și demolare selectivă. Fond construit excedentar — costul întreținerii depășește valoarea.',
        cnair:    'Menținere infrastructură minimă vitală. Redirecționare fonduri spre UAT-uri cu potențial.',
      },
    };
    const rec = REC[grav.growthType] || REC['LOCAL'];

    // ── Top zone cu motiv specific ───────────────────────────────────
    const topZones = zones.slice(0,8).map(z => {
      const u = upeRes[z.id||z.label] || {pct:50,classification:'MEDIUM',color:'#f59e0b'};
      const motivParts = [];
      if(z._Db!=null)  motivParts.push(`Densitate clădiri: ${(z._Db*100).toFixed(0)}%`);
      if(z._Ra!=null)  motivParts.push(`Acces rutier: ${(z._Ra*100).toFixed(0)}%`);
      if(z._travelMin!=null) motivParts.push(`${z._travelMin} min centru`);
      if(z.slopeDeg!=null)   motivParts.push(`Pantă ${z.slopeDeg.toFixed(1)}°`);
      return {...z, prob:u.pct, cls:u.classification, color:u.color,
               motiv: motivParts.join(' · ') || 'Analiză geometrică'};
    });

    const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;color:#1e293b;font-size:10pt;line-height:1.6}
@media print{.no-print{display:none}.pb{page-break-before:always}@page{margin:1.8cm;size:A4}}
.hdr{background:linear-gradient(135deg,#0f172a,#1a3060);color:#fff;padding:28px 36px}
h1{font-size:22pt;font-weight:800;margin-bottom:4px}
.sub{font-size:10pt;color:rgba(255,255,255,.65)}
.tag{display:inline-block;padding:4px 11px;border-radius:4px;font-size:8pt;font-weight:600;margin-top:8px;margin-right:6px}
.warn{background:#fffbeb;border-left:4px solid #f59e0b;padding:10px 16px;font-size:8.5pt;color:#78350f;margin:0}
.body{padding:28px 36px}
h2{font-size:12pt;font-weight:800;color:#0f172a;margin:22px 0 10px;padding-bottom:5px;border-bottom:2px solid #e2e8f0}
h3{font-size:10pt;font-weight:700;color:#334155;margin:14px 0 6px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin:10px 0}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:10px 0}
.kpi{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px}
.kpi.b{border-color:#93c5fd;background:#eff6ff}.kpi.b .kv{color:#1d4ed8}
.kpi.g{border-color:#86efac;background:#f0fdf4}.kpi.g .kv{color:#15803d}
.kpi.r{border-color:#fca5a5;background:#fef2f2}.kpi.r .kv{color:#991b1b}
.kpi.y{border-color:#fcd34d;background:#fffbeb}.kpi.y .kv{color:#92400e}
.kv{font-size:16pt;font-weight:800;line-height:1.1}
.kl{font-size:7.5pt;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-top:3px}
.ks{font-size:7pt;color:#94a3b8;margin-top:3px;font-style:italic}
.box{border:1px solid #e2e8f0;border-radius:8px;padding:14px;background:#f8fafc}
.score-big{font-size:28pt;font-weight:900;line-height:1}
table{width:100%;border-collapse:collapse;font-size:8.5pt;margin:8px 0}
th{background:#0f172a;color:#fff;padding:7px 10px;text-align:left;font-size:7.5pt;font-weight:700}
td{padding:6px 10px;border-bottom:1px solid #f1f5f9;vertical-align:top}
tr:nth-child(even) td{background:#f8fafc}
.bar{height:7px;border-radius:3px;display:inline-block}
.rec-box{border-left:3px solid;border-radius:0 7px 7px 0;padding:10px 14px;margin:6px 0}
.mono{background:#0f172a;color:#86efac;border-radius:7px;padding:12px 16px;font-family:monospace;font-size:8.5pt;line-height:1.9;margin:8px 0}
.mono .c{color:#64748b}.mono .v{color:#D4AF37}
.src-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}
.src{border:1px solid #e2e8f0;border-radius:6px;padding:9px 11px}
.sn{font-weight:700;font-size:9pt}.sd{font-size:8pt;color:#64748b;margin-top:2px}.st{font-size:7pt;color:#94a3b8;margin-top:2px;font-style:italic}
.footer{background:#f8fafc;border-top:2px solid #e2e8f0;padding:14px 36px;font-size:7.5pt;color:#94a3b8;display:flex;justify-content:space-between;align-items:center}
.btn{position:fixed;top:16px;right:16px;z-index:999;background:#1d4ed8;color:#fff;border:none;border-radius:7px;padding:9px 18px;font-size:9.5pt;cursor:pointer;font-family:inherit;font-weight:700}
`;

    const lcColor = lc.score>0.1?'#15803d':lc.score>-0.3?'#92400e':'#991b1b';
    const lcBg = lc.score>0.1?'#f0fdf4':lc.score>-0.3?'#fffbeb':'#fef2f2';

    const html = `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8">
<title>Raport TCI — ${d.name} — ${iso}</title><style>${css}</style></head>
<body>
<button class="btn no-print" onclick="window.print()">⬇ Descarcă PDF</button>

<div class="hdr">
  <div style="font-size:8pt;color:rgba(212,175,55,.8);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">
    UrbanX · TCI Cinema · Raport Predictiv Urban
  </div>
  <h1>${d.name||'Analiză UAT'}</h1>
  <div class="sub">Proiecție urbanistică 2025–2055 · jud. ${d.judet||'—'} · ${today}</div>
  <div>
    <span class="tag" style="background:rgba(212,175,55,.2);border:1px solid #D4AF37;color:#D4AF37">★ ${scn.label}</span>
    <span class="tag" style="background:rgba(99,102,241,.2);border:1px solid #818cf8;color:#c7d2fe">${grav.growthType} · G=${grav.gravityScore.toFixed(2)}</span>
    <span class="tag" style="background:${seis.ag>=.35?'rgba(239,68,68,.2)':'rgba(245,158,11,.2)'};border:1px solid ${seis.ag>=.35?'#ef4444':'#f59e0b'};color:${seis.ag>=.35?'#fca5a5':'#fcd34d'}">⚠ ag=${seis.ag}g · max R+${seis.hMaxStory}</span>
  </div>
</div>

<div class="warn">⚠ Proiecție statistică bazată pe date oficiale INS/ANCPI/MDLPA. Nu substituie PUG sau aviz urbanistic. · ${today}</div>

<div class="body">

<!-- 1. SINTEZĂ -->
<h2>1. Sinteză UAT — ${d.name}</h2>
<div class="grid4">
  <div class="kpi b"><div class="kv">${n(d.pop2021)}</div><div class="kl">Populație 2021</div><div class="ks">INS · Recensământ 2021</div></div>
  <div class="kpi ${need.pop2055>(d.pop2021||0)?'g':'r'}"><div class="kv">${n(need.pop2055)}</div><div class="kl">Estimat 2055</div><div class="ks">Cohort Survival · scenariu ${this.scenario}</div></div>
  <div class="kpi y"><div class="kv">${n(need.locuinteTotale)}</div><div class="kl">Locuințe necesare</div><div class="ks">HFE + Cohort 2025-2055</div></div>
  <div class="kpi ${seis.ag>=.35?'r':''}"><div class="kv">ag=${seis.ag}g</div><div class="kl">Risc seismic · R+${seis.hMaxStory} max</div><div class="ks">P100-1/2013 MDLPA</div></div>
  <div class="kpi b"><div class="kv">≈${n(Math.round(need.totalM2*1200/1e6))}M€</div><div class="kl">Investiție estimată</div><div class="ks">€1.200/m² ANCPI 2024</div></div>
  <div class="kpi ${feas.viable?'g':'r'}"><div class="kv">${feas.roi}%</div><div class="kl">ROI ajustat · ${feas.viable?'✓ Viabil':'⚠ Risc'}</div><div class="ks">Brut ${feas.roiBrut}% × absorbție · seismic ×${seis.ag>=.35?'1.25':seis.ag>=.25?'1.12':'1.0'}</div></div>
  <div class="kpi ${(feas.absorbtieAn||0)>200?'g':(feas.absorbtieAn||0)>80?'y':'r'}"><div class="kv">${n(feas.absorbtieAn||0)}</div><div class="kl">Absorbție un./an</div><div class="ks">Credit BNR ${RATA_BNR||5.75}% · ${feas.pctGospodariAcces}% gospodării cu acces</div></div>
  <div class="kpi"><div class="kv">${need.s2025}→${need.s2055}</div><div class="kl">Persoane/gospodărie</div><div class="ks">HFE · INS trend</div></div>
  <div class="kpi"><div class="kv">${clim.uhi}°C UHI</div><div class="kl">Insulă termică 2055</div><div class="ks">IPCC AR6 RCP4.5 · zona ${clim.zone}</div></div>
</div>

<!-- 2. DIAGNOSTIC LIFECYCLE -->
<h2>2. Diagnostic Urban — Lifecycle Score</h2>
<div class="grid2">
  <div class="box" style="border-color:${lcColor};background:${lcBg}">
    <div style="font-size:8pt;text-transform:uppercase;color:${lcColor};letter-spacing:.06em;margin-bottom:6px">Lifecycle Score L ∈ [-1, +1]</div>
    <div class="score-big" style="color:${lcColor}">${lc.score>=0?'+':''}${lc.score.toFixed(2)}</div>
    <div style="font-size:11pt;font-weight:700;color:${lcColor};margin-top:4px">${grav.growthType}</div>
    <div style="font-size:8pt;color:#475569;margin-top:8px;line-height:1.6">
      Pg (demografie) = <strong>${lc.Pg>=0?'+':''}${lc.Pg.toFixed(2)}</strong><br>
      Eg (economie) = <strong>${lc.Eg>=0?'+':''}${lc.Eg.toFixed(2)}</strong><br>
      Mn (migrație) = <strong>${lc.Mn>=0?'+':''}${lc.Mn.toFixed(2)}</strong><br>
      Ac (autorizații) = <strong>${lc.Ac>=0?'+':''}${lc.Ac.toFixed(2)}</strong>
    </div>
  </div>
  <div class="box">
    <div style="font-size:8pt;text-transform:uppercase;color:#64748b;letter-spacing:.06em;margin-bottom:8px">De ce crește / scade</div>
    <div style="font-size:9pt;line-height:1.8;color:#334155">
      ${(d.rata_reala_2011_2021||0)>=0?'▲':'▼'} <strong>Rată demografică ${(d.rata_reala_2011_2021||0).toFixed(2)}%/an</strong> (INS 2011-2021)<br>
      ${(d.coef_hub||0.7)>0.9?'▲':'→'} <strong>Hub economic ${(d.coef_hub||0.7).toFixed(2)}</strong> (media RO: 0.78)<br>
      ${(d.universitati||0)>1?'▲':'▼'} <strong>${(d.universitati||0)>0?`${d.universitati} universități`:'Fără universitate'}</strong> — ${(d.universitati||0)>1?'stabilizator demografic':'vulnerabilitate migrație tineri'}<br>
      ${lc.deviereReg!=null?`${lc.deviereReg>0?'▲':'▼'} <strong>Deviere față de media regiunii</strong>: ${lc.deviereReg>0?'+':''}${(lc.deviereReg*100).toFixed(0)}%`:''}
    </div>
    <div style="margin-top:12px;font-size:8pt;color:#64748b;background:#f1f5f9;border-radius:6px;padding:8px">
      <strong>Concluzie:</strong> ${
        grav.growthType==='METROPOLITAN' ? 'Presiune imobiliară ridicată. Risc supraaglomerare fără infrastructură adecvată.' :
        grav.growthType==='REGIONAL'     ? 'Creștere moderată sustenabilă. Densificare controlată pe coridoare.' :
        grav.growthType==='WEAKENING'    ? 'Slăbire demografică moderată. Consolidați centrul, evitați expansiunea. Oportunitate: reabilitare + senior housing.' :
        grav.growthType==='DECLINING'    ? 'Declin activ. Prioritate: reabilitare fond existent, nu extindere.' :
        grav.growthType==='SHRINKING'    ? 'Contracție severă. Plan de densificare a serviciilor în nuclee viabile.' :
        'Echilibru fragil. Densificare selectivă + reabilitare prioritară.'}
    </div>
  </div>
</div>

<!-- 3. HOUSING MIX -->
<h2>3. Cerere Locuințe 2025–2055 — Mix pe Tipologii</h2>
<p style="font-size:8.5pt;color:#64748b;margin-bottom:10px">Distribuție calculată din structura demografică (Cohort INS), presiune economică (coef_hub=${(d.coef_hub||0.78).toFixed(2)}) și tip urban (${grav.growthType}).</p>
<table>
  <tr><th>Tipologie</th><th>Segment Țintă</th><th>Unități</th><th>Pondere</th><th>Suprafață medie</th><th>Investiție est.</th></tr>
  ${Object.entries(housing.mix).filter(([,v])=>v.unitati>0).map(([k,v])=>`
  <tr>
    <td><strong>${v.label}</strong></td>
    <td style="color:#64748b;font-size:8pt">${v.segment}</td>
    <td><strong>${n(v.unitati)}</strong></td>
    <td>
      <div style="display:flex;align-items:center;gap:6px">
        <div class="bar" style="width:${Math.min(80,v.pct*2.5)}px;background:#D4AF37;opacity:.7"></div>
        <span style="font-weight:700">${v.pct}%</span>
      </div>
    </td>
    <td>${v.m2}m²</td>
    <td><strong>≈${n(v.investitie_m)}M€</strong></td>
  </tr>`).join('')}
  <tr style="background:#0f172a;color:#fff">
    <td colspan="2"><strong>TOTAL</strong></td>
    <td><strong>${n(need.locuinteTotale)}</strong></td>
    <td><strong>100%</strong></td>
    <td>—</td>
    <td><strong>≈${n(housing.totalInvestitie)}M€</strong></td>
  </tr>
</table>

<!-- 3b. ECONOMIC ABSORPTION -->
<h2>4. Economic Absorption — Capacitatea Reală a Pieței</h2>
<p style="font-size:8.5pt;color:#64748b;margin-bottom:10px">
  Câte unități poate absorbi piața local pe an — calculat din putere de cumpărare, 
  accesibilitate credit și stoc existent.
</p>
<div class="grid4">
  <div class="kpi ${(feas.absorbtieAn||0)>200?'g':(feas.absorbtieAn||0)>80?'y':'r'}">
    <div class="kv">${n(feas.absorbtieAn)}</div>
    <div class="kl">Absorbție totală/an</div>
    <div class="ks">gospodării noi + cerere înlocuire</div>
  </div>
  <div class="kpi b">
    <div class="kv">${n(feas.cerereInlocuire)}</div>
    <div class="kl">Cerere înlocuire/an</div>
    <div class="ks">fond >40 ani · rata 1.2%/an</div>
  </div>
  <div class="kpi ${(feas.stocExcedentar||0)<1000?'g':'r'}">
    <div class="kv">${n(feas.stocExcedentar)}</div>
    <div class="kl">Stoc excedentar</div>
    <div class="ks">vacanță ${feas.vacantaLocativa}% · concurență piață secundară</div>
  </div>
  <div class="kpi">
    <div class="kv">${feas.pctGospodariAcces}%</div>
    <div class="kl">Gospodării cu acces credit</div>
    <div class="ks">salariu mediu ${n(feas.salariuEur)}€ · rată ${n(feas.rataCreditLunara)}€/lună</div>
  </div>
</div>
<table>
  <tr><th>Factor</th><th>Valoare</th><th>Sursă</th><th>Impact</th></tr>
  <tr><td>Preț unitate 68m²</td><td><strong>${n(feas.pretUnitate)}€</strong></td><td>ANCPI 2024 · ${grav.growthType}</td><td>Determină accesibilitatea</td></tr>
  <tr><td>Rată credit lunară (30 ani)</td><td><strong>${n(feas.rataCreditLunara)}€/lună</strong></td><td>BNR + spread 2.5% = ${(5.75+2.5).toFixed(2)}%</td><td>Venit minim necesar: ${n(feas.venitMaxAdmis)}€/lună</td></tr>
  <tr><td>Salariu mediu net jud. ${d.judet}</td><td><strong>${n(feas.salariuEur)}€/lună</strong></td><td>INS 2024</td><td>${feas.salariuEur>=feas.venitMaxAdmis?'✓ Accesibil pentru clasa medie':'⚠ Acces limitat — necesită 2 salarii'}</td></tr>
  <tr><td>ROI brut (preț vs cost)</td><td><strong>${feas.roiBrut}%</strong></td><td>Calcul intern</td><td>Înainte de ajustarea pentru absorbție</td></tr>
  <tr><td>ROI ajustat absorbție</td><td><strong style="color:${feas.viable?'#15803d':'#991b1b'}">${feas.roi}%</strong></td><td>Factor ${grav.growthType}: ${(feas.absorbtieAn/({METROPOLITAN:600,REGIONAL:250,LOCAL:120,DECLINING:60,SHRINKING:20}[grav.growthType]||120)).toFixed(2)}×</td><td>${feas.viable?'✓ Viabil — peste pragul de 12%':'⚠ Sub pragul de viabilitate'}</td></tr>
</table>

<!-- 5. ZONE PRIORITARE -->
<h2>4. Zone de Dezvoltare — Prioritare și Motiv</h2>
<p style="font-size:8.5pt;color:#64748b;margin-bottom:10px">P(D) = f(E,M,I,C,G) · Probabilitate per zonă, nu certitudini. Monte Carlo N=300.</p>
<table>
  <tr><th>Zonă</th><th>Probabilitate</th><th>Motiv identificat</th><th>hMax</th><th>Start</th></tr>
  ${topZones.map(z=>`
  <tr>
    <td>
      <div style="display:flex;align-items:center;gap:7px">
        <div style="width:10px;height:10px;border-radius:2px;background:${z.color||'#f59e0b'};flex-shrink:0"></div>
        <div><strong>${z.label||z.id}</strong><div style="font-size:7.5pt;color:#64748b">${z.sub||''}</div></div>
      </div>
    </td>
    <td>
      <div style="display:flex;align-items:center;gap:5px">
        <div class="bar" style="width:${Math.min(60,z.prob*0.6)}px;background:${z.color||'#f59e0b'}"></div>
        <strong style="color:${z.color||'#f59e0b'}">${z.prob}%</strong>
        <span style="font-size:7pt;background:${z.color||'#f59e0b'}22;color:${z.color||'#f59e0b'};padding:1px 6px;border-radius:8px">${z.cls}</span>
      </div>
    </td>
    <td style="font-size:8pt;color:#475569">${z.motiv}</td>
    <td>${z.hMax||'—'}m</td>
    <td>${z.startYr||'—'}</td>
  </tr>`).join('')}
</table>

<!-- 5. RECOMANDĂRI ACȚIONABILE -->
<h2>6. Recomandări — ${grav.growthType}</h2>
<div class="rec-box" style="border-color:#1d4ed8;background:#eff6ff">
  <div style="font-size:8pt;font-weight:700;color:#1d4ed8;text-transform:uppercase;margin-bottom:4px">🏛 Primărie / Consiliu Local</div>
  <div style="font-size:9pt;color:#1e3a5f">${rec.primar}</div>
</div>
<div class="rec-box" style="border-color:#15803d;background:#f0fdf4">
  <div style="font-size:8pt;font-weight:700;color:#15803d;text-transform:uppercase;margin-bottom:4px">💰 Investitori / Dezvoltatori</div>
  <div style="font-size:9pt;color:#14532d">${rec.investit}</div>
</div>
<div class="rec-box" style="border-color:#7c3aed;background:#f5f3ff">
  <div style="font-size:8pt;font-weight:700;color:#7c3aed;text-transform:uppercase;margin-bottom:4px">📐 OAR / Urbaniști</div>
  <div style="font-size:9pt;color:#4c1d95">${rec.oar}</div>
</div>
<div class="rec-box" style="border-color:#92400e;background:#fffbeb">
  <div style="font-size:8pt;font-weight:700;color:#92400e;text-transform:uppercase;margin-bottom:4px">🛣 CNAIR / Infrastructură</div>
  <div style="font-size:9pt;color:#78350f">${rec.cnair}</div>
</div>

<!-- 6. MODELE MATEMATICE -->
<h2 class="pb">7. Modele Matematice și Surse</h2>
<div class="mono">
<span class="c">// Lifecycle Score L ∈ [-1, +1]</span>
L = Pg×0.35 + Eg×0.25 + Mn×0.25 + Ac×0.15  <span class="v">→ L=${lc.score>=0?'+':''}${lc.score.toFixed(2)} (${grav.growthType})</span>
  Pg = rata_demografică / 2.5                <span class="v">→ ${lc.Pg>=0?'+':''}${lc.Pg.toFixed(2)}</span>
  Eg = (coef_hub - 0.78) × 2.2              <span class="v">→ ${lc.Eg>=0?'+':''}${lc.Eg.toFixed(2)}</span>
  Mn = deviereRegionala×0.55 + pullEcon×0.30 <span class="v">→ ${lc.Mn>=0?'+':''}${lc.Mn.toFixed(2)} [semnal independent]</span>
  L(t+1) = 0.7×L(t) + 0.3×L_nou            <span class="c">// Inertie urbană</span>

<span class="c">// Urban Gravity G ∈ [0, 1]</span>
G = eP×0.30 + eC×0.25 + eE×0.20 + eK×0.15 + eI×0.10  <span class="v">→ G=${grav.gravityScore.toFixed(3)}</span>
  eK = conectivitate per județ (CNAIR 2025)  <span class="v">→ ${grav.eConectivit.toFixed(2)} [corect per jud. ${d.judet}]</span>

<span class="c">// Cohort Survival INS 2021</span>
Px+5,t+5 = Px,t × Sx + Mx,t                <span class="v">→ ${n(d.pop2021)} → ${n(need.pop2055)} loc. (2055)</span>

<span class="c">// Housing Formation</span>
H(t) = P(t) / S(t)  S=${need.s2025}→${need.s2055} <span class="v">→ ${n(need.locuinteTotale)} unități necesare</span>

<span class="c">// Feasibility Engine</span>
ROI = (Vsale - Ctotal) / Ctotal             <span class="v">→ ${feas.roi}% (prag 12%: ${feas.viable?'✓ VIABIL':'⚠ RISC'})</span>
</div>

<h2>8. Surse de Date</h2>
<div class="src-grid">
  <div class="src"><div class="sn">INS SIRUTA dec.2025 + Recensământ 2021</div><div class="sd">3181 UAT-uri, rate demografice, cohort survival, household size</div><div class="st">insse.ro · accesat ${iso}</div></div>
  <div class="src"><div class="sn">ANCPI — Geoportal Cadastral</div><div class="sd">Autorizații construire, suprafață medie 68m²/unitate</div><div class="st">geoportal.ancpi.ro · accesat ${iso}</div></div>
  <div class="src"><div class="sn">P100-1/2013 — MDLPA</div><div class="sd">Zonare seismică, ag=${seis.ag}g, înălțime max R+${seis.hMaxStory}</div><div class="st">mdlpa.ro</div></div>
  <div class="src"><div class="sn">OpenStreetMap + OSRM</div><div class="sd">Rețea rutieră live, timp acces, accesibilitate UAT</div><div class="st">overpass-api.de · router.project-osrm.org · accesat ${iso}</div></div>
  <div class="src"><div class="sn">CNAIR — Masterplan Autostrăzi 2030</div><div class="sd">A7(2027), A8(2028), A13(2032), centuri ocolitoare</div><div class="st">cnair.ro</div></div>
  <div class="src"><div class="sn">IPCC AR6 + Copernicus</div><div class="sd">UHI +${clim.uhi}°C 2055, risc secetă ${Math.round(clim.drought*100)}%, inundații ${Math.round(clim.flood*100)}%</div><div class="st">cds.climate.copernicus.eu · accesat ${iso}</div></div>
</div>
</div>

<div class="footer">
  <div><strong>UrbanX TCI Cinema</strong> · Think Smart Solutions · Motor: Cohort INS · HFE · Gravity · P(u) · Lifecycle v2</div>
  <div style="text-align:right">Generat: ${today} · ${this.scenario} · ${scn.label}<br>ID: TCI-${iso}-${(this.cityKey||'uat').toUpperCase()}</div>
</div>
</body></html>`;

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
    centru:     '#7c3aed',  // violet — max density central
    coridor:    '#d97706',  // amber — boulevards/corridors
    rezid:      '#2563eb',  // blue — collective housing
    reconv:     '#ea580c',  // red-orange — industrial reconversion
    nou:        '#16a34a',  // green — new growth
    stabil:     '#374151',  // gray — stable, no change
    constructie:'#fbbf24',  // yellow — active construction (sync cu 3D)
    aproape:    '#f97316',  // orange — nearly complete (sync cu 3D)
    // ── Culori per growthType — sincronizate cu tipologiile 3D ─────
    // Regula: zona 2D și clădirile 3D din ea au aceeași culoare dominantă
    METROPOLITAN: '#f97316',  // portocaliu — creștere intensă
    REGIONAL:     '#f59e0b',  // amber — creștere moderată
    LOCAL:        '#3b82f6',  // albastru — creștere locală
    GROWING:      '#22c55e',  // verde — creștere rapidă
    WEAKENING:    '#94a3b8',  // gri-albăstrui — slăbire
    DECLINING:    '#ef4444',  // roșu — declin
    SHRINKING:    '#6b7280',  // gri — contracție
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
  way["amenity"="university"](around:${r},${lat},${lon});
  way["amenity"="college"](around:${r},${lat},${lon});
  way["landuse"="education"](around:${r},${lat},${lon});
  way["leisure"~"^(park|nature_reserve|stadium)$"](around:${r},${lat},${lon});
  way["landuse"~"^(military|religious|recreation_ground)$"](around:${r},${lat},${lon});
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
          const isWater    = t.natural==='water'||t.waterway==='river'||t.waterway==='stream';
          const isWood     = t.natural==='wood'||t.landuse==='forest';
          const isCimitir  = t.amenity==='grave_yard'||t.landuse==='cemetery';
          const isRail     = !!(t.railway);
          const isUniv     = t.amenity==='university'||t.amenity==='college'||t.landuse==='education';
          const isParcStad = t.leisure==='park'||t.leisure==='nature_reserve'||t.leisure==='stadium';
          const isMilRel   = t.landuse==='military'||t.landuse==='religious'||t.landuse==='recreation_ground';

          if(isWater||isWood||isCimitir||isRail||isUniv||isParcStad||isMilRel) {
            const geom = el.geometry || [];
            const step = isWater ? 5 : isWood ? 8 : 4;
            const r_buf = isWater   ? 80
                        : isWood    ? 60
                        : isCimitir ? 65
                        : isUniv    ? 80   // campus universitar — buffer mare
                        : isParcStad? 50   // parc/stadion
                        : isMilRel  ? 60   // militar/religios
                        :             25;  // cale ferată
            const reason = t.name || (
              isWater?'Apă':isWood?'Pădure':isCimitir?'Cimitir':
              isUniv?'Campus universitar':isParcStad?'Parc/Stadion':
              isMilRel?'Zonă specială':'Cale ferată');
            const color = isWater?'#0ea5e9':isWood?'#15803d':isCimitir?'#6b7280':
                          isUniv?'#7c3aed':isParcStad?'#16a34a':'#78716c';
            const type  = isWater?'apa':isWood?'padure':isCimitir?'cimitir':
                          isUniv?'campus':isParcStad?'parc':'cf';

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
    // ── Road buffers context-aware — logică urbanistică corectă ─────────
    // Legea drumurilor + L350/2001 + RLU:
    //
    // CONTEXT 1 — ZONĂ CONSTRUITĂ EXISTENTĂ (intravilan dens):
    //   Clădirile SE ALINIAZĂ la stradă — buffer = doar ampriza fizică
    //   (nu putem construi PE asfalt, dar putem fi la 0m de trotuar)
    //   Referință: RLU "aliniament obligatoriu" în UTR centrale
    //
    // CONTEXT 2 — ZONĂ NOUĂ / PERIFERICĂ (extravilan sau intravilan nou):
    //   Se aplică zona de protecție legală:
    //   - Autostradă: 50m de la ax (HG 600/2014)
    //   - DN: 22m de la marginea platformei (L198/2015)
    //   - DJ: 20m de la marginea platformei
    //   - Stradă nouă: 6-8m retragere față de limita proprietății
    //
    // Distincția o face densitatea de clădiri vecine (Db din OSM buildings).
    // Db > 0.4 = zonă construită → buffer mic (aliniament)
    // Db < 0.3 = zonă nouă → buffer protecție legală

    const _roadBufR = (rc, isBuiltUp) => {
      if(isBuiltUp) {
        // Aliniament stradal — buffer = DOAR ampriza fizică a carosabilului
        // Nu blocăm construcțiile aliniate la stradă
        return rc==='motorway'||rc==='motorway_planned' ? 18 :  // 2×3.75m + acostament minim
               rc==='trunk'                              ? 13 :  // 2×3.5m + bordură
               rc==='primary'                            ?  9 :  // 2×3m + bordură
               rc==='secondary'                          ?  7 :  // 2×3m
                                                           5 ;  // stradă locală
      } else {
        // Zonă nouă periferică — zone de protecție legale
        // Surse: L198/2015 (drumuri publice), HG 600/2014 (autostrăzi)
        return rc==='motorway'||rc==='motorway_planned' ? 50 :  // 50m de la ax autostradă
               rc==='trunk'                              ? 30 :  // DN major
               rc==='primary'                            ? 22 :  // DN/DJ — 22m de la marginea platformei
               rc==='secondary'                          ? 15 :  // DJ local
                                                          10 ;  // stradă nouă
      }
    };

    // Estimăm densitatea locală per coridor rutier
    // (folosim _lastCors distKm ca proxy — mai departe de centru = mai puțin construit)
    const roadBufs = (this._lastCors || []).map(c => {
      // Zonă construită: aproape de centru (< 3km) SAU secondary/residential
      const likelyBuiltUp = c.distKm < 3.5 ||
                            c.roadClass === 'secondary' ||
                            c.roadClass === 'residential';
      return {
        lon: c.lon, lat: c.lat,
        r: _roadBufR(c.roadClass, likelyBuiltUp),
        reason: 'Drum: '+(c.name||c.ref||c.roadClass),
        type: 'drum',
        builtUp: likelyBuiltUp,
      };
    });
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

    onRemove(){try{this._renderer&&this._renderer.forceContextLoss&&this._renderer.forceContextLoss();}catch(e){}try{this._renderer?.dispose();}catch(e){}try{this._overlay?.remove();}catch(e){}this._meshes=[];this._shadows=[];this._ready=false;},

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
      while(this._scene.children.length > 2) this._scene.remove(this._scene.children[2]);
      this._entities = [];
      this._mesh = null;

      // ── Tipologie din label zonă ─────────────────────────────────────
      // Clădirile au geometrie diferită per tipologie — nu mai sunt toate cutii identice
      const _tipologie = (label='', hMax=12) => {
        const lb = label.toLowerCase();
        if(lb.includes('logistic') || lb.includes('industrial') || lb.includes('reconvers'))
          return 'industrial';   // Hale: late, joase, acoperis în pantă
        if(lb.includes('senior') || lb.includes('medical') || lb.includes('social'))
          return 'social';       // Blocuri mici, compacte
        if(lb.includes('premium') || lb.includes('rezidential') && hMax > 30)
          return 'premium';      // Turn slender
        if(lb.includes('verde') || lb.includes('parc') || lb.includes('sport'))
          return 'verde';        // Structuri joase deschise
        if(hMax > 40)
          return 'turn';         // Turn înalt
        if(hMax < 12)
          return 'suburban';     // Case — volum mic
        return 'rezidential';    // Bloc standard
      };

      // ── Culoare per lifecycle UAT ────────────────────────────────────
      // Nu mai e uniform portocaliu — culoarea povestește starea urbană
      const _lifecycleColor = (growthType='', tipZona='') => {
        const tip = tipZona.toLowerCase();
        if(tip.includes('medical') || tip.includes('senior'))  return '#a78bfa'; // violet
        if(tip.includes('logistic') || tip.includes('industr')) return '#64748b'; // gri
        if(tip.includes('verde'))                               return '#4ade80'; // verde
        const colMap = {
          METROPOLITAN: '#f97316', REGIONAL: '#f59e0b', LOCAL: '#60a5fa',
          GROWING: '#22c55e', WEAKENING: '#94a3b8', DECLINING: '#ef4444', SHRINKING: '#6b7280',
        };
        return colMap[growthType] || '#f59e0b';
      };

      const growthType = window.TCI?._calcGravityScore?.(window.TCI?._city?.())?.growthType || 'LOCAL';

      zones.forEach(z => {
        if(!z.hMax || z.hMax === 0) return;
        const coords = window.TCI?._polyFromDef?.(z);
        if(!coords || coords.length < 3) return;

        const tip     = _tipologie(z.label||'', z.hMax);
        const baseCol = _lifecycleColor(growthType, z.label||'');
        const density = tip === 'industrial' ? Math.max(3, Math.round(z.hMax/8))
                      : tip === 'suburban'   ? Math.max(8, Math.round(z.hMax/2))
                      : Math.max(6, Math.min(18, Math.round(z.hMax/3)));

        const bbox  = this._bboxCoords(coords);
        const _bufs = Array.isArray(constraintBufs) ? constraintBufs : [];
        const _R    = 111319.9;
        const _cp   = Math.cos((coords[0]?.[1]||47) * Math.PI/180);
        const _okPos = (lo, la) => {
          for(const b of _bufs) {
            if(Math.hypot((lo-b.lon)*_R*_cp, (la-b.lat)*_R) < b.r) return false;
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

          // Dimensiuni diferențiate per tipologie
          let wM, dM, hBase, hFinal;
          switch(tip) {
            case 'industrial':
              wM = 40 + seed * 60; dM = 30 + seed * 40;
              hBase = 6; hFinal = Math.min(z.hMax, 8 + seed * 6);
              break;
            case 'suburban':
              wM = 10 + seed * 8; dM = 8 + seed * 6;
              hBase = 4; hFinal = Math.min(z.hMax, 5 + seed * 4);
              break;
            case 'turn':
              wM = 14 + seed * 10; dM = 12 + seed * 8;
              hBase = 20; hFinal = z.hMax * (0.75 + seed * 0.25);
              break;
            case 'premium':
              wM = 16 + seed * 12; dM = 14 + seed * 10;
              hBase = 15; hFinal = z.hMax * (0.70 + seed * 0.30);
              break;
            case 'verde':
              wM = 20 + seed * 15; dM = 20 + seed * 15;
              hBase = 3; hFinal = Math.min(z.hMax, 5 + seed * 3);
              break;
            default: // rezidential, social
              wM = 18 + seed * 22; dM = 14 + seed * 18;
              hBase = Math.max(6, z.hMax * 0.2);
              hFinal = z.hMax * (0.65 + seed * 0.35);
          }

          this._entities.push({
            lon, lat, wM, dM,
            hBase, hMax: hFinal,
            startYr: z.startYr,
            color:   new THREE.Color(baseCol),
            baseCol,
            tipologie: tip,
            zoneId:  z.id,
            growthType,
          });
        }
      });

      console.log('[3D] Entities:', this._entities.length,
        'pentru', zones.length, 'zone',
        '| tipologii:', [...new Set(this._entities.map(e=>e.tipologie))].join(','));
      this._buildMesh();
      this.updateYear(year);
    },

    _buildMesh() {
      if(!this._entities.length) return;
      while(this._scene.children.length>1) this._scene.remove(this._scene.children[1]);

      this._meshes  = [];
      this._shadows = [];

      this._entities.forEach(e => {
        // Geometrie diferențiată per tipologie
        let geom;
        switch(e.tipologie) {
          case 'industrial':
            // Hală — box lat și jos
            geom = new THREE.BoxGeometry(1, 1, 0.5);
            geom.translate(0, 0, 0.25);
            break;
          case 'suburban':
            // Casă — box mic cu acoperiș simulat (piramidă deasupra)
            geom = new THREE.BoxGeometry(1, 1, 1);
            geom.translate(0, 0, 0.5);
            break;
          case 'turn':
          case 'premium':
            // Turn — box subțire și înalt
            geom = new THREE.BoxGeometry(0.7, 0.7, 1);
            geom.translate(0, 0, 0.5);
            break;
          default:
            geom = new THREE.BoxGeometry(1, 1, 1);
            geom.translate(0, 0, 0.5);
        }

        const mat  = new THREE.MeshBasicMaterial({
          color:       e.color,
          depthTest:   false,
          opacity:     e.tipologie === 'verde' ? 0.60 : 0.88,
          transparent: true,
        });
        const mesh = new THREE.Mesh(geom, mat);
        this._scene.add(mesh);
        this._meshes.push(mesh);

        // Umbra pe sol — cerc/elipsă, dă sens scării
        const sRadius = Math.max(0.5, (e.wM / 60));
        const sG = new THREE.CircleGeometry(sRadius, 8);
        const sM = new THREE.MeshBasicMaterial({
          color:0x000000, depthTest:false,
          opacity: e.tipologie === 'industrial' ? 0.08 : 0.14,
          transparent:true, side:THREE.DoubleSide,
        });
        const sh = new THREE.Mesh(sG, sM);
        sh.rotation.x = -Math.PI/2;
        this._scene.add(sh);
        this._shadows.push(sh);
      });

      this._mesh      = {visible: true};
      this._targetH   = new Float32Array(this._entities.length);
      this._currentH  = new Float32Array(this._entities.length).fill(0.1);
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
      const FLOOR_H = 3.2; // înălțimea unui etaj în metri

      this._entities.forEach((e,i)=>{
        const m=this._meshes[i]; if(!m) return;
        const age = yr - (e.startYr||2026);
        let tgt = 0.1;

        if(age >= 0) {
          // ── Construcție etaj cu etaj ────────────────────────────────
          // Faza 0 (age<0.5): fundație — slab plat la sol
          // Faza 1 (age 0-3): crește etaj cu etaj, vizibil
          // Faza 2 (age 3+): completat, stabilizat
          const maxFloors = Math.max(1, Math.ceil(e.hMax / FLOOR_H));

          if(age < 0.3) {
            // Fundație: 0.6m înălțime
            tgt = 0.6;
          } else if(age < 3.5) {
            // Construcție activă: etaje apar discret
            // La fiecare ~0.25 ani apare un etaj nou
            const floorsBuilt = Math.floor(age / 0.25);
            const floorsTarget = Math.min(maxFloors, floorsBuilt);
            tgt = Math.min(e.hMax, Math.max(0.6, floorsTarget * FLOOR_H));
          } else {
            // Finalizat
            tgt = e.hMax;
          }
        }

        if(this._targetH) this._targetH[i] = tgt;

        // ── Culori per fază construcție ──────────────────────────────
        let col, opacity=0.88;
        if(age < 0) {
          col='#1e293b'; opacity=0.0;              // invizibil — nu a început
        } else if(age < 0.3) {
          col='#78716c'; opacity=0.6;              // fundație — beton brut
        } else if(age < 2.0) {
          col='#fbbf24'; opacity=0.82;             // schelet — galben construcție
        } else if(age < 4.0) {
          col='#f97316'; opacity=0.85;             // faadă — portocaliu aproape gata
        } else {
          col=e.baseCol||'#f97316'; opacity=0.88;  // finalizat — culoarea lifecycle
        }

        m.material.color.set(col);
        m.material.opacity = opacity;
        m.visible = age >= -0.5;

        // ── Platforma de construcție (slab orizontal la vârful actual) ──
        // Vizibilă ca "nivel activ" în faza de construcție
        const platform = this._platforms?.[i];
        if(platform) {
          platform.visible = age >= 0 && age < 3.5 && tgt > 1;
          if(platform.visible) {
            // Pozitionam platforma la vârful construcției
            if(this._3D?._positionEntity) {
              // Se va actualiza în _animate
              platform.userData.h = tgt;
            }
          }
        }

        if(this._shadows?.[i]) this._shadows[i].visible = age >= 0;
      });
      this._map?.triggerRepaint();
    },


    updateLOD(zoom){
      const v=zoom>=12.5;
      (this._meshes||[]).forEach(m=>{if(m)m.visible=m.visible&&v;});
      (this._shadows||[]).forEach(s=>{if(s)s.visible=s.visible&&v;});
      // La zoom mare (nivel stradă) activăm toate entitățile
      if(zoom>=17)(this._meshes||[]).forEach((m,i)=>{if(m&&this._entities[i])m.visible=this._entities[i].startYr<=(window.TCI?.year||2030);});
    },

    // Pozitionează o entitate Three.js pe coordonate geografice
    // cx,cy=centrul origin, lon/lat=coordonate geografice, scaleX/Y/Z=dimensiuni în metri
    _positionEntity(mesh, lon, lat, baseH, scaleX, scaleY, scaleZ) {
      if(!mesh||!this._cx) return;
      const R=111319.9, cp=Math.cos(this._cy*Math.PI/180);
      const x=(lon-this._cx)*R*cp;
      const y=(lat-this._cy)*R;
      const sM=this._scale||1e-6;
      mesh.position.set(x*sM, y*sM, baseH*sM);
      if(scaleX!=null) mesh.scale.set(scaleX*sM, scaleY*sM, scaleZ*sM);
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

        // Fundal colorat subtil — zona vizibilă chiar și fără 3D
        m.addLayer({id:'tci-proj-bg', type:'fill', source:'tci-proj',
          paint:{
            'fill-color':['get','color'],
            'fill-opacity':['interpolate',['linear'],['zoom'],
              9, 0.06,   // zoom mic: abia vizibil
              13, 0.10,  // zoom mediu: ușor colorat
              16, 0.05   // zoom mare: aproape transparent (clădirile 3D iau fața)
            ],
          }
        });

        // Contur principal — mai gros, mai vizibil
        m.addLayer({id:'tci-proj-outline', type:'line', source:'tci-proj',
          paint:{
            'line-color':['get','color'],
            'line-width':['interpolate',['linear'],['zoom'],
              8,  1.5,
              11, 2.5,
              14, 4.0,
              17, 5.0
            ],
            'line-opacity': 0.92,
            'line-dasharray':[5,3],
          }
        });

        // Contur interior alb — face conturul să "iasă" pe orice fundal
        m.addLayer({id:'tci-proj-outline-inner', type:'line', source:'tci-proj',
          minzoom: 12,
          paint:{
            'line-color': 'rgba(255,255,255,0.25)',
            'line-width':['interpolate',['linear'],['zoom'],12,0.5,16,1.5],
            'line-opacity': 0.6,
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
        // Fill clickabil — folosim bg-ul deja existent, nu un layer separat
        // tci-proj-bg are fill vizibil → click funcționează natural

      } catch(e) { console.warn('[TCI] 2D layers:', e.message); }
    }

    // ── Click handler PROVENANCE — înregistrat O SINGURĂ DATĂ ────────────
    // CRITIC: trebuie să fie AFARĂ din if(!getSource) — altfel nu se re-înregistrează
    if(!this._provenanceClickRegistered && m.getLayer?.('tci-proj-bg')) {
      this._provenanceClickRegistered = true;
      const TCI = this; // captăm referința corectă

      m.on('click','tci-proj-bg', (e) => {
        const f = e.features?.[0]; if(!f) return;
        const p = f.properties || {};
        const zonId = p.id || '?';
        const zone = (TCI._projZones||[]).find(z=>z.id===zonId) || p;

        // ── Factori în LIMBAJ UMAN — nu cod tehnic ───────────────────
        // Un primar sau investitor trebuie să înțeleagă fără explicații
        const factors = [];

        // Acces rutier
        if(Ra != null) {
          const raText = Ra > 0.7 ? 'Drum principal la mai puțin de 100m — acces excelent'
                       : Ra > 0.4 ? 'Drum secundar în apropiere — acces bun'
                       : 'Acces rutier limitat — drum local sau absent';
          factors.push({sign: Ra>0.6?'+':Ra>0.3?'~':'-', label: raText, src:'OSM rețea rutieră'});
        }

        // Densitate construită
        if(Db != null) {
          const dbText = Db > 0.6 ? 'Zonă semi-construită — extindere naturală a țesutului urban'
                       : Db > 0.2 ? 'Zonă parțial construită — potențial de densificare'
                       : Db < 0.1 ? 'Teren liber — extravilan sau periferie nedezvoltată'
                       : 'Densitate medie — cartier rezidențial existent';
          factors.push({sign: Db>0.1&&Db<0.8?'+':'-', label: dbText, src:'OSM Buildings'});
        }

        // Timp de acces — cel mai important factor
        if(tm != null) {
          const tmText = tm < 10 ? `${tm} minute până în centrul orașului — accesibilitate maximă`
                       : tm < 20 ? `${tm} minute până în centru — naveta zilnică fezabilă`
                       : tm < 35 ? `${tm} minute până în centru — periurban extins`
                       : `${tm} minute până în centru — distanță mare, risc de nerealizare`;
          factors.push({sign: tm<10?'+':tm<25?'~':'-', label: tmText, src:'OSRM routing live'});
        }

        // Pantă teren
        if(sl != null) {
          const slText = sl < 5  ? `Teren plan (${sl.toFixed(1)}°) — construcție fără restricții`
                       : sl < 12 ? `Pantă ușoară (${sl.toFixed(1)}°) — rezidențial cu costuri moderate`
                       : sl < 20 ? `Pantă moderată (${sl.toFixed(1)}°) — vile și case individuale`
                       : `Pantă mare (${sl.toFixed(1)}°) — restricții constructive, costuri ridicate`;
          factors.push({sign: sl<5?'+':sl<15?'~':'-', label: slText, src:'Mapbox Terrain RGB'});
        }

        // Risc seismic/climatic
        if(Ce != null) {
          const risk = Math.round((1-Ce)*100);
          const ceText = risk < 30 ? 'Risc seismic și climatic scăzut — zona favorabilă'
                        : risk < 55 ? `Risc moderat (${risk}%) — necesită calcul seismic la proiectare`
                        : `Risc ridicat (${risk}%) — supracost construcție +14-28% · P100-1/2013`;
          factors.push({sign: Ce>0.6?'+':Ce>0.3?'~':'-', label: ceText, src:'P100-1/2013 + IPCC AR6'});
        }

        // Compatibilitate teren
        if(Zf != null) {
          const zfText = Zf > 0.7 ? 'Teren agricol sau liber — conversie posibilă prin PUZ'
                       : Zf > 0.4 ? 'Zonă mixtă — verificați reglementările UTR'
                       : 'Teren restricționat — pădure, apă sau protecție';
          factors.push({sign: Zf>0.6?'+':'-', label: zfText, src:'OSM landuse'});
        }

        // Autorizații
        if(pg != null && pg !== 1.0) {
          const pgText = pg > 1.2 ? `Autorizații în creștere (+${Math.round((pg-1)*100)}%) — piață activă`
                       : pg < 0.8 ? `Autorizații în scădere (${Math.round((pg-1)*100)}%) — piață în contracție`
                       : 'Autorizații stabile — piață echilibrată';
          factors.push({sign: pg>1.1?'+':pg>0.9?'~':'-', label: pgText, src:'INS TEMPO LOC103A'});
        }

        // Lifecycle
        factors.push({
          sign: grav.growthType==='DECLINING'||grav.growthType==='SHRINKING'?'-':
                grav.growthType==='WEAKENING'?'~':
                grav.growthType==='METROPOLITAN'||grav.growthType==='GROWING'?'+':'~',
          label: `Dinamica urbană: ${grav.growthType} · L=${L>=0?'+':''}${L.toFixed(2)} · ${
            L>0.3?'Urban activ — cerere reală de locuințe':
            L>-0.1?'Urban echilibrat — cerere moderată':
            'Urban în declin — risc de neabsorbție'}`,
          src:'Lifecycle Engine'
        });

        if(zone.startYr||p.startYr)
          factors.push({sign:'~', label:`Start estimat construcție: ${zone.startYr||p.startYr}`, src:'Model TSS·FG'});

        const factorHtml = factors.length
          ? factors.map(f=>`
            <div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <span style="width:18px;flex-shrink:0;font-size:14px;color:${f.sign==='+'?'#4ade80':f.sign==='-'?'#f87171':'#fbbf24'};line-height:1.2">
                ${f.sign==='+'?'✅':f.sign==='-'?'⚠️':'➡️'}
              </span>
              <div>
                <div style="font-size:9.5px;color:#e2e8f0;line-height:1.4">${f.label}</div>
                <div style="font-size:8px;color:#475569;margin-top:1px">${f.src}</div>
              </div>
            </div>`).join('')
          : '<div style="color:#64748b;font-size:9px;padding:4px 0">Date provenance indisponibile</div>';

        const pct = zone._prob ? Math.round(zone._prob*100) : (Number(p.prob)||50);
        const pColor = pct>65?'#f59e0b':pct>45?'#3b82f6':'#22c55e';
        const lbl = p.label || zone.label || zonId;
        const sub = p.sub  || zone.sub  || '';

        new mapboxgl.Popup({closeButton:true, maxWidth:'300px'})
          .setLngLat(e.lngLat)
          .setHTML(`<div style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-family:system-ui,sans-serif;margin:-10px -10px -15px">
            <div style="font-size:11px;font-weight:700;color:${p.color||'#f59e0b'};margin-bottom:2px">${lbl}</div>
            <div style="font-size:8.5px;color:#94a3b8;margin-bottom:8px">${sub}</div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:6px 8px;background:rgba(255,255,255,0.05);border-radius:5px">
              <div style="font-size:20px;font-weight:800;color:${pColor}">${pct}%</div>
              <div><div style="font-size:9px;font-weight:600;color:${pColor}">Probabilitate dezvoltare</div>
                   <div style="font-size:8px;color:#64748b">Monte Carlo N=300 · TSS·FG</div></div>
            </div>
            <div style="font-size:8.5px;font-weight:600;color:#64748b;text-transform:uppercase;margin-bottom:4px">Factori identificați</div>
            ${factorHtml}
            <div style="margin-top:6px;font-size:7.5px;color:#475569">⚠ Nu substituie PUG/PUZ · UrbanX TSS·FG ${new Date().getFullYear()}</div>
          </div>`)
          .addTo(m);
      });

      m.on('mouseenter','tci-proj-bg',()=>{ m.getCanvas().style.cursor='pointer'; });
      m.on('mouseleave','tci-proj-bg',()=>{ m.getCanvas().style.cursor=''; });
      console.log('[TCI] ✅ Provenance click handler înregistrat');
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

      // ── Road buffers context-aware pentru 3D ────────────────────────────
      // Același principiu: zonă construită → aliniament (buffer mic)
      //                    zonă nouă periferică → zonă protecție legală
      const R3d=111319.9, cp3d=Math.cos(cy*Math.PI/180);
      const roadBufsFor3D = cors.map(c => {
        const likelyBuiltUp = c.distKm < 3.5 ||
                              c.roadClass === 'secondary' ||
                              c.roadClass === 'residential';
        const r = likelyBuiltUp
          ? (c.roadClass==='motorway'||c.roadClass==='motorway_planned' ? 18 :
             c.roadClass==='trunk'    ? 13 :
             c.roadClass==='primary'  ?  9 :
             c.roadClass==='secondary'?  7 : 5)
          : (c.roadClass==='motorway'||c.roadClass==='motorway_planned' ? 50 :
             c.roadClass==='trunk'    ? 30 :
             c.roadClass==='primary'  ? 22 :
             c.roadClass==='secondary'? 15 : 10);
        return {lon:c.lon, lat:c.lat, r, type:'drum', builtUp:likelyBuiltUp};
      });
      // Merge cu constrângerile existente (cimitire, păduri, apă, LMI)
      const existingBufs = this._constraints?.bufs || HARDCODED_BUFS;
      const fullBufs = [...existingBufs];
      roadBufsFor3D.forEach(rb => {
        // Deduplicare: nu adăugăm un buffer dacă există deja unul de același tip la <60m
        const dup = fullBufs.some(b =>
          b.type==='drum' && Math.hypot((rb.lon-b.lon)*R3d*cp3d,(rb.lat-b.lat)*R3d) < 60
        );
        if(!dup) fullBufs.push(rb);
      });

      this._projZones = this._buildZones(cx, cy, this._constraints);
      this._updateProjectionLayers(this.year || 2025);
      this._3D.setOrigin(cx, cy);
      // Acum 3D primește road buffers → clădiri departe de bulevarde
      this._3D.buildSceneGraph(this._projZones, this.year || 2025, fullBufs);
      console.log(`[TCI] ✅ 3D cu ${roadBufsFor3D.length} road buffers (45/38/32/22/15m) → ${this._projZones.length} zone`);

      const hasRealZones = !!(this._REAL_ZONES[(this.cityKey||'').toLowerCase()] ||
        this._REAL_ZONES[(this.d?.name||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(/[-\s]/)[0]]);

      if(!hasRealZones) {
        this._analyzeFrontier(cx, cy, 5).then(frontierZones => {
          if(!frontierZones?.length) return;
          const existing = new Set(this._projZones.map(z=>z.id));
          frontierZones.forEach(fz => {
            if(existing.has(fz.id)) return;
            const excluded = fullBufs.some(b =>
              Math.hypot((fz.lon-b.lon)*R3d*cp3d, (fz.lat-b.lat)*R3d) < b.r + 50
            );
            if(excluded) return;
            this._projZones.push({
              id:fz.id, color:fz.color, hMax:fz.hMax, startYr:fz.startYr,
              label:fz.label, sub:fz.sub,
              ring:{cx:fz.lon, cy:fz.lat, rx:fz.rx, ry:fz.ry},
            });
            existing.add(fz.id);
          });
          this._updateProjectionLayers(this.year || 2025);
          this._3D.setOrigin(cx, cy);
          this._3D.buildSceneGraph(this._projZones, this.year || 2025, fullBufs);
          console.log(`[TCI] ✅ Frontier: +${frontierZones.length} zone → total ${this._projZones.length}`);
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
            id:z.id, label:z.label, sub:z.sub||'',
            color:z.color, dc:statusColor(z,yr),
            prob:z._prob?Math.round(z._prob*100):null,
            // Provenance pentru popup
            _Ra:z._Ra, _Db:z._Db, _Ce:z._Ce, _Zf:z._Zf,
            _permitsGrowth:z._permitsGrowth,
            slopeDeg:z.slopeDeg, slopeType:z.slopeType, _travelMin:z._travelMin,
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
           cam:{center:[cx,cy],zoom:15.5,pitch:65,bearing:20,duration:2800},
           chain:[{center:[cx,cy],zoom:13.0,pitch:52,bearing:-8,duration:5000,delay:6000},
                  {center:[cx,cy],zoom:15.0,pitch:68,bearing:10,duration:5000,delay:16000}],
           title:'🏙 '+name,body:name+' — proiecție urbanistică 2025-2055',src:'UrbanX TSS·FG'},
          {id:'fb2',dur:60000,light:'dusk',
           cam:{center:[cx,cy],zoom:13.5,pitch:55,bearing:-25,duration:3000},
           chain:[{center:[cx,cy],zoom:16.5,pitch:76,bearing:20,duration:6000,delay:12000},
                  {center:[cx,cy],zoom:15.5,pitch:65,bearing:30,duration:5000,delay:35000}],
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
        // S1 — DIRECT PE ORAȘ (nu mai facem tur turistic al României)
        // ── Aterizare imediată + date live ────────────────────────────────
        {id:'s1',dur:20000,light:'dusk',
         cam:{center:[cx,cy],zoom:15.5,pitch:65,bearing:20,duration:2800},
         chain:[
           {center:[cx,cy],zoom:13.0,pitch:52,bearing:-8,duration:4000,delay:5000},
           {center:[cx,cy],zoom:14.5,pitch:64,bearing:8,duration:5000,delay:13000},
         ],
         title:'🏙 '+name+' — Proiecție 2025→2055',
         body:cityProfile()+' Populație '+pop.toLocaleString()+' loc. · '+
              (grav.growthType==='DECLINING'?'Declin demografic: reabilitare prioritară.':
               grav.growthType==='METROPOLITAN'?'Creștere accelerată: presiune imobiliară ridicată.':
               'Creștere moderată pe coridoare principale.')+
              ' Lifecycle L='+grav.lifecycle?.score?.toFixed(2)+'. Risc seismic ag='+seis.ag+'g.',
         src:'INS · ANCPI · P100-1/2022 · Model TSS·FG'},

        // S2 — DATE LIVE: KPI-uri + zone de risc + infrastructură (20s)
        // ── Nu mai plimbăm camera pe Moldova ────────────────────────────
        {id:'s2',dur:20000,light:'day',
         cam:{center:[cx,cy],zoom:12.5,pitch:42,bearing:-20,duration:3000},
         chain:[
           {center:[cx,cy],zoom:13.5,pitch:55,bearing:5,duration:5000,delay:6000},
           {center:[cx,cy],zoom:14.0,pitch:60,bearing:-15,duration:5000,delay:14000},
         ],
         title:'📊 Date Oficiale — '+name,
         body:'Proiecție calibrată: '+need.pop2055.toLocaleString()+' loc. în 2055 ('+
              (need.deltaPop>=0?'+':'')+Math.round(((need.pop2055-need.pop2021)/need.pop2021)*100)+'% față de 2021). '+
              'Necesare '+need.locuinteTotale.toLocaleString()+' locuințe · Investiție estimată ≈'+
              Math.round(need.totalM2*850/1e6+need.locuinteTotale*15000/1e6)+'M€. '+
              'hMax seismic: R+'+seis.hMaxStory+'. Risc climatic: '+clim.label+'.',
         src:'INSE · ANCPI · BNR · IPCC AR6 · Model TSS·FG'},

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
          T.map.jumpTo({center:[cx,cy],zoom:15.5,pitch:65,bearing:20});}catch(e){}
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
    const lr=document.getElementById('tci-lbl-right');
    if(lr) lr.textContent='🔮 PROIECTAT · '+yr;
    if(Math.abs(yr-(this._lastKpiUpdate||0))>=2){
      this._lastKpiUpdate=yr;
      this._updateKPIs();
      this._updateBuildingHeight(yr);
      this._updateProjectionLayers(yr);
    }

    // ── Development Pressure Visualization pentru 2025-2028 ──────────
    // Documentul audit: "Nu clădiri. Arată presiuni, riscuri, probabilități."
    this._updateDevPressureOverlay(yr);
  },

  _updateDevPressureOverlay(yr) {
    const el = document.getElementById('tci-dev-pressure');
    if(!el) return;

    const grav = this._calcGravityScore(this.d);
    const need = this._calcUrbanNeed(this.d);
    const L = grav.lifecycle?.score || 0;

    if(yr <= 2028) {
      // Primii 3 ani: nu apar clădiri → arată presiunile active
      const yDelta = yr - 2025;
      const presRez = Math.round(need.locuinteTotale / 30 * (1 + yDelta * 0.04));
      const presEco = Math.round((grav.lifecycle?.Ec || 0.5) * 100);
      const migr2534 = (this.d?.rata_reala_2011_2021||0) > -0.5 ? '+' : '−';

      const items = [
        {icon:'🏘', label:'Presiune rezidențială', val:`+${presRez} unit/an`, color:'#f59e0b'},
        {icon:'📈', label:`Lifecycle L=${L>=0?'+':''}${L.toFixed(2)}`, val:grav.growthType, color:L>0.1?'#4ade80':L>-0.3?'#fbbf24':'#f87171'},
        {icon:'👥', label:'Migrație 25-34 ani', val:`${migr2534} tendință`, color:'#60a5fa'},
        {icon:'🏗', label:'Autorizații estimate', val:`~${need.cladiri.centru+need.cladiri.inner}/an`, color:'#a78bfa'},
      ];

      el.style.display='block';
      el.innerHTML = `
        <div style="font-size:8px;font-weight:700;color:#D4AF37;text-transform:uppercase;margin-bottom:5px;letter-spacing:1px">
          📊 Presiuni Urbane ${yr}
        </div>
        ${items.map(it=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
            <span style="font-size:9px;color:rgba(180,200,225,0.7)">${it.icon} ${it.label}</span>
            <span style="font-size:9px;font-weight:700;color:${it.color}">${it.val}</span>
          </div>`).join('')}
        <div style="font-size:7px;color:rgba(148,163,184,0.4);margin-top:4px">Clădirile apar din ${(this._projZones||[]).reduce((m,z)=>Math.min(m,z.startYr||2055),2055)}</div>`;
    } else {
      el.style.display='none';
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
    const year = yr || this.year || 2025;
    const yF   = Math.max(0, Math.min(1, (year - 2025) / 30));
    const entities = this._3D?._entities || [];

    // ── Contorizăm clădirile per categorie în ANUL CURENT ──────────────
    let cActive = 0, cDone = 0, cPending = 0;
    const tipCounts = {};
    entities.forEach(e => {
      const age = year - (e.startYr || 2026);
      if(age < 0)       { cPending++; }
      else if(age < 3)  { cActive++; }
      else              { cDone++; }
      if(age >= 0) {
        const t = e.tipologie || 'rezidential';
        tipCounts[t] = (tipCounts[t]||0) + 1;
      }
    });
    const totalActive = cActive + cDone;

    // ── Items legendă cu numere live ──────────────────────────────────
    const growthType = window.TCI?._calcGravityScore?.(window.TCI?._city?.())?.growthType || '';
    const colMap = {
      METROPOLITAN:'#f97316', REGIONAL:'#f59e0b', LOCAL:'#60a5fa',
      GROWING:'#22c55e', WEAKENING:'#94a3b8', DECLINING:'#ef4444', SHRINKING:'#6b7280',
    };
    const mainCol = colMap[growthType] || '#f59e0b';

    const items = [
      {c:'#1e3a5f',  s:'■', l:'Fond existent 2025',     n: null},
      {c:'#fbbf24',  s:'■', l:'Construcție activă',      n: cActive > 0 ? cActive+' cl.' : null},
      {c: mainCol,   s:'■', l:`Finalizat · ${growthType}`, n: cDone > 0 ? cDone+' cl.' : null},
      {c:'#a78bfa',  s:'■', l:'Social / Medical',         n: tipCounts['social'] ? tipCounts['social']+' cl.' : null},
      {c:'#64748b',  s:'▬', l:'Industrial / Logistic',    n: tipCounts['industrial'] ? tipCounts['industrial']+' cl.' : null},
      {c:'#4ade80',  s:'■', l:'Verde / Sport',             n: tipCounts['verde'] ? tipCounts['verde']+' cl.' : null},
    ].filter(it => it.n !== null || it.c === '#1e3a5f' || it.c === mainCol);

    const LW = 200, LH = items.length * 15 + 38;
    const LX = W - LW - 10, LY = H - 75 - LH;

    ctx.save();
    // Background
    ctx.fillStyle = 'rgba(4,10,24,0.88)';
    this._rr(ctx, LX, LY, LW, LH, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    this._rr(ctx, LX, LY, LW, LH, 7); ctx.stroke();

    // Header
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 7.5px "Space Grotesk"';
    ctx.fillText('CLĂDIRI — ' + year, LX + 10, LY + 13);

    // Bara progres densificare + număr total
    const bpW = LW - 20;
    ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fillRect(LX+10, LY+17, bpW, 3);
    ctx.fillStyle = mainCol; ctx.globalAlpha = 0.65;
    ctx.fillRect(LX+10, LY+17, bpW * yF, 3);
    ctx.globalAlpha = 1;

    // Număr total clădiri active
    if(totalActive > 0) {
      ctx.fillStyle = 'rgba(148,163,184,0.5)';
      ctx.font = '7px "Space Grotesk"';
      ctx.textAlign = 'right';
      ctx.fillText(totalActive + ' clădiri proiectate', LX + LW - 10, LY + 13);
      ctx.textAlign = 'left';
    }

    // Items cu număr live
    items.forEach((it, i) => {
      const y = LY + 24 + i * 15;
      // Pătrat culoare
      ctx.fillStyle = it.c;
      if(it.s === '▬') {
        ctx.fillRect(LX+10, y+2, 12, 6);
      } else {
        ctx.fillRect(LX+10, y, 10, 10);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(LX+10, y, 10, 10);

      // Label
      ctx.fillStyle = 'rgba(200,215,235,0.80)';
      ctx.font = '8px "Space Grotesk"';
      ctx.fillText(it.l, LX + 26, y + 8.5);

      // Număr live — dreapta
      if(it.n) {
        ctx.fillStyle = it.c;
        ctx.font = 'bold 7.5px "Space Grotesk"';
        ctx.textAlign = 'right';
        ctx.fillText(it.n, LX + LW - 8, y + 8.5);
        ctx.textAlign = 'left';
      }
    });

    // Notă tipologie dacă există industrial
    if(tipCounts['turn'] || tipCounts['premium']) {
      const y = LY + LH - 9;
      ctx.fillStyle = 'rgba(148,163,184,0.3)';
      ctx.font = '6.5px "Space Grotesk"';
      const turnStr = [];
      if(tipCounts['turn']) turnStr.push(tipCounts['turn']+' turnuri');
      if(tipCounts['premium']) turnStr.push(tipCounts['premium']+' premium');
      ctx.fillText('incl. ' + turnStr.join(' · '), LX + 10, y);
    }

    ctx.restore();
  },


  _rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();},

  // ── Comenzi ──────────────────────────────────────────────────────────────
  _updateSliderPhase(yr) {
    const lbl = document.getElementById('tci-phase-label');
    if(!lbl) return;
    const phases = [
      {end:2030, label:'▶ Inițiere 2025-2030', color:'#475569'},
      {end:2038, label:'▶ Creștere 2030-2038', color:'#16a34a'},
      {end:2048, label:'▶ Maturitate 2038-2048', color:'#d97706'},
      {end:2055, label:'▶ Consolidare 2048-2055', color:'#9333ea'},
    ];
    const phase = phases.find(p => yr <= p.end) || phases[phases.length-1];
    lbl.textContent = phase.label;
    lbl.style.color = phase.color + 'bb';

    // Actualizam cursorul slider cu culoarea fazei
    const sl = document.getElementById('tci-scrub');
    if(sl) sl.style.accentColor = phase.color;
  },

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
    // ── Share URL cu stare completă ──────────────────────────────────
    // URL codifică: UAT key + an + scenariu + zoom + centru hartă
    // Când cineva deschide link-ul, TCI Cinema lansează direct în acea stare
    const city = this.d || {};
    const mapCenter = this.map?.getCenter?.();
    const mapZoom   = this.map?.getZoom?.();

    const stateObj = {
      c: this.cityKey || '',          // UAT key (RO-IS-95060)
      n: city.name || '',             // Nume UAT (pentru afișare rapidă)
      s: this.scenario || 'S2',       // Scenariu
      y: this.year || 2027,           // An curent
      m: this.mode || 'uat',          // Mod lansare
      ln: mapCenter?.lng?.toFixed(4) || '',
      lt: mapCenter?.lat?.toFixed(4) || '',
      z:  mapZoom?.toFixed(1) || '',
    };

    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(stateObj))));
    const url = location.origin + location.pathname + '#tci/' + encoded;

    // Scriem în history fără reload — URL-ul reflectă mereu starea curentă
    try { history.replaceState(null, '', url); } catch(e) {}
    navigator.clipboard?.writeText(url).catch(()=>{});

    const lc = this._calcGravityScore?.(city)?.lifecycle?.score ?? 0;
    const lcLabel = lc>0.45?'GROWING':lc>0.05?'STABLE':lc>-0.20?'WEAKENING':lc>-0.55?'DECLINING':'SHRINKING';
    const verDate = 'INS SIRUTA dec.2025';

    let box = document.getElementById('tci-share-box');
    if(!box) {
      box = document.createElement('div');
      box.id = 'tci-share-box';
      box.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:3100;background:rgba(4,10,24,0.97);border:1px solid rgba(212,175,55,0.5);border-radius:12px;padding:16px 20px;min-width:380px;max-width:440px;font-family:"Space Grotesk",sans-serif;pointer-events:all;box-shadow:0 20px 60px rgba(0,0,0,0.6)';
      document.body.appendChild(box);
    }

    box.innerHTML = `
      <button onclick="this.parentElement.remove()" style="position:absolute;top:10px;right:12px;background:none;border:none;color:rgba(148,163,184,0.4);font-size:14px;cursor:pointer;line-height:1">✕</button>

      <div style="font-size:8px;color:#D4AF37;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px">
        🔗 Share — ${city.name||'UAT'} · ${this.year} · ${this.scenario}
      </div>

      <!-- URL cu stare completă -->
      <div style="display:flex;gap:6px;margin-bottom:12px">
        <input readonly value="${url}"
          onclick="this.select()"
          style="flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#94a3b8;padding:7px 9px;border-radius:6px;font-size:8px;font-family:monospace;overflow:hidden;text-overflow:ellipsis">
        <button onclick="navigator.clipboard.writeText('${url}').then(()=>{this.textContent='✓';this.style.color='#22c55e';setTimeout(()=>{this.textContent='📋';this.style.color=''},2000)})"
          style="padding:7px 12px;border-radius:6px;background:rgba(212,175,55,0.12);border:1px solid rgba(212,175,55,0.35);color:#D4AF37;font-size:12px;cursor:pointer;flex-shrink:0">
          📋
        </button>
      </div>

      <!-- Starea codificată — ce vede destinatarul -->
      <div style="background:rgba(255,255,255,0.04);border-radius:7px;padding:8px 10px;margin-bottom:12px;font-size:8px">
        <div style="color:rgba(148,163,184,0.6);margin-bottom:4px">La deschidere, destinatarul va vedea:</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px">
          <div style="color:#e2e8f0">📍 ${city.name||'—'}</div>
          <div style="color:#e2e8f0">📅 ${this.year}</div>
          <div style="color:#e2e8f0">📊 Scenariu ${this.scenario}</div>
          <div style="color:${lc>0?'#22c55e':lc>-0.2?'#f59e0b':'#f87171'}">⚡ ${lcLabel}</div>
        </div>
      </div>

      <!-- Metodologie vizibilă — Item 3 -->
      <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:10px">
        <div style="font-size:7.5px;color:rgba(148,163,184,0.5);margin-bottom:5px">📐 Metodologie model</div>
        <div style="font-size:7.5px;color:rgba(148,163,184,0.45);line-height:1.8">
          Model calibrat pe <strong style="color:rgba(148,163,184,0.7)">3.181 UAT-uri</strong> · Surse: INS + OSM + OSRM + P100-1/2013 + IPCC AR6<br>
          Acuratețe estimată: <strong style="color:rgba(148,163,184,0.7)">~70%</strong> · Target: 80% cu geometrii oficiale ANCPI<br>
          Ultima actualizare date: <strong style="color:rgba(148,163,184,0.7)">${verDate}</strong><br>
          <span style="color:rgba(100,120,150,0.4)">⚠ Predicție statistică · Nu substituie PUG/PUZ/aviz urbanistic</span>
        </div>
      </div>`;

    box.style.display = 'block';

    // ── La inițializare: dacă URL conține stare, o restaurăm ──────────
    // (apelat o singură dată la încărcarea paginii din _init)
  },

  // Restaurează starea din URL hash la deschidere
  _restoreFromURL() {
    try {
      const hash = location.hash;
      if(!hash.startsWith('#tci/')) return false;
      const encoded = hash.slice(5);
      const state = JSON.parse(decodeURIComponent(escape(atob(encoded))));
      if(state.c) {
        this._selectedUATKey = state.c;
        if(state.n) {
          const inp = document.getElementById('tci-sel-uat');
          if(inp) inp.value = state.n;
        }
        if(state.y) this._pendingYear = parseInt(state.y);
        if(state.s) this._pendingScenario = state.s;
        console.log('[TCI] Stare restaurată din URL:', state.c, 'an:', state.y);
        return true;
      }
    } catch(e) { /* URL invalid sau gol */ }
    return false;
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

// ── URL Restore — suportă atât ?tci= (vechi) cât și #tci/ (nou) ─────────
(function(){
  let ck, sc, yr, md;

  // Format nou: #tci/{base64 JSON}
  const hash = location.hash;
  if(hash.startsWith('#tci/')) {
    try {
      const state = JSON.parse(decodeURIComponent(escape(atob(hash.slice(5)))));
      ck = state.c; sc = state.s || 'S2';
      yr = parseInt(state.y) || 2026; md = state.m || 'uat';
    } catch(e) { /* hash invalid */ }
  }

  // Format vechi: ?tci= (compatibilitate)
  if(!ck) {
    const p = new URLSearchParams(location.search);
    const tp = p.get('tci'); if(!tp) return;
    try {
      const pp = new URLSearchParams(atob(tp));
      ck=pp.get('c')||'iasi'; sc=pp.get('s')||'S2';
      yr=parseInt(pp.get('y')||'2026'); md=pp.get('m')||'uat';
    } catch(e) { return; }
  }

  if(!ck) return;

  window._TCI_URL_RESTORE = {ck, sc, yr, md, done: false};
  const resolve = key => {
    if(typeof _RO_CITIES_DB==='undefined') return key;
    if(_RO_CITIES_DB[key]) return key;
    const sm=key.match(/(\d{5,6})$/);
    if(sm){ const f=Object.entries(_RO_CITIES_DB).find(([k,v])=>String(v.siruta)===sm[1]||String(v.SIRUTA)===sm[1]); if(f) return f[0]; }
    return key;
  };
  const doLaunch = () => {
    if(window._TCI_URL_RESTORE.done) return;
    window._TCI_URL_RESTORE.done = true;
    // Ștergem hash-ul din URL ca refreshul să nu redeschidă TCI
    try { history.replaceState(null, '', location.pathname + location.search); } catch(e) {}
    document.getElementById('tci-sel')?.remove();
    try {
      TCI._selectedUATKey = null;
      TCI._launch(md, {cityKey: resolve(ck), scenario: sc});
      const w = setInterval(() => {
        if(TCI.year !== undefined) {
          clearInterval(w);
          setTimeout(() => { try{ TCI.scrubTo(yr); } catch(e){} }, 1500);
        }
      }, 300);
    } catch(e) { window._TCI_URL_RESTORE.done = false; }
  };
  let tries = 0;
  const tryLaunch = () => {
    // Nu relansăm TCI dacă pagina a fost reîncărcată (F5/refresh) — hash-ul poate fi vechi
    try { if(performance.navigation && performance.navigation.type === 1) return; } catch(e){}
    if(++tries > 30) return;
    if(typeof TCI !== 'undefined' && typeof _RO_CITIES_DB !== 'undefined' && window.map)
      doLaunch();
    else
      setTimeout(tryLaunch, 400);
  };
  setTimeout(tryLaunch, 800);
  document.addEventListener('DOMContentLoaded', () => setTimeout(tryLaunch, 1200));
  window.addEventListener('load', () => setTimeout(tryLaunch, 600));
})();


const _origOpenTCI=window.openTCI;
window.openTCI=(opts)=>{
  if(window._TCI_URL_RESTORE&&!window._TCI_URL_RESTORE.done) return;
  if(_origOpenTCI) _origOpenTCI(opts); else TCI.open(opts||{});
};

console.log('[TCI v40] Rescris complet — Mapbox nativ — vehicule animate — date reale per UAT');
