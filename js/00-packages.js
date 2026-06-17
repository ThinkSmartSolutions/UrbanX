// ═══════════════════════════════════════════════════════════════════════════
// URBANX — SISTEM PACHETE + ACCESS CONTROL + WORKSPACE
// v3.2.0 — Arhitectura multi-rol pentru lansare comerciala
// ═══════════════════════════════════════════════════════════════════════════

// ── Definitia pachetelor comerciale ──────────────────────────────────────
const _PACKAGES = {

  EXPLORATOR: {
    id: 'explorator',
    label: 'Explorator',
    sublabel: 'Caut un teren',
    icon: '🔍',
    color: '#38bdf8',
    price: 'Gratuit',
    description: 'Perfect pentru cine caută un teren de cumpărat. Informații esențiale despre orice parcelă.',
    access: {
      discover:  'full',      // acces complet la hartă și info parcelă
      design:    false,       // nu poate proiecta
      analyze:   'basic',     // doar indicatori de bază (POT/CUT/H/scor)
      project:   'view',      // vede proiecția urbanistică dar nu o modifică
      export:    false,       // nu poate exporta PDF
      relevee:   false,
      lotizare:  false,
      save:      'limited',   // max 3 proiecte salvate
    },
    studii_allowed: [],       // niciun studiu tehnic
    features: [
      'Hartă interactivă — caută orice adresă din România',
      'Info parcelă — suprafață, UTR, indicatori urbanistici',
      'Vedere 3D volum maxim admis',
      'Scor zonă — accesibilitate, servicii, risc',
      'Proiecție urbană animată (view-only)',
      'Salvare 3 parcele favorite',
    ],
  },

  DEVELOPER: {
    id: 'developer',
    label: 'Developer',
    sublabel: 'Promovez imobiliar',
    icon: '🏗',
    color: '#f59e0b',
    price: 'Standard',
    description: 'Pentru promotori imobiliari și investitori. Analiză completă de fezabilitate și proiectare.',
    access: {
      discover:  'full',
      design:    'full',      // AEDIS complet
      analyze:   'economic',  // studii economice + tehnice de bază
      project:   'animated',  // proiecție animată completă
      export:    'pdf',       // export PDF studii
      relevee:   true,        // Releveu Instant
      lotizare:  true,        // Plan Lotizare
      save:      'unlimited',
    },
    studii_allowed: [
      'generateStudiuAmplasament',
      'generateStudiuFezabilitate',
      'generateSolarStudy', 'generateShadowStudy',
      'generateNoiseStudy', 'generateGeotehnicalStudy',
      'generateSSF', 'generateStabilitateTaluzuri',
      'generateCPE', 'generateMemoriu',
      'generatePrestudiuBransamente',
      'generateProiectieUrbanistica',
    ],
    features: [
      'Tot ce include Explorator',
      'AEDIS — proiectare 3D completă cu toate funcțiunile',
      'Releveu Instant — planuri, fațade, secțiuni, axonometrie',
      'Plan de Lotizare — parcele, acces, utilitati',
      'Studiu Fezabilitate/DALI — deviz HG 907, scenarii ROI',
      'Studii tehnice: Însorire, Acustic, ISU, Geotehnic, CPE',
      'Memoriu Tehnic Preliminar complet',
      'Pre-Studiu Bransamente cu costuri reale 2025',
      'Proiecție Urbanistică animată 10/20/30 ani',
      'Salvare nelimitată proiecte',
      'Export PDF toate studiile',
    ],
  },

  ADMINISTRATIE: {
    id: 'administratie',
    label: 'Administrație',
    sublabel: 'Planificare teritorială',
    icon: '🏛',
    color: '#8b5cf6',
    price: 'Enterprise',
    description: 'Pentru primării, consilii județene, instituții publice. Focus pe teritoriu și planificare.',
    access: {
      discover:  'full',
      design:    false,       // nu proiectează individual
      analyze:   'territorial', // studii teritoriale + statistici
      project:   'full',      // proiecție completă cu scenarii
      export:    'institutional', // rapoarte institutionale
      relevee:   false,
      lotizare:  false,
      save:      'unlimited',
    },
    studii_allowed: [
      'generateStudiuAmplasament',
      'generateDensityStudy',
      'generateTrafficStudy',
      'generateGreenStudy',
      'generateEnvironmentalImpact',
      'generateWaterStudy',
      'generateIstoricStudy',
      'generateProiectieUrbanistica',
      'generateWindStudy',
    ],
    features: [
      'Analiză multi-parcelă — statistici per UTR, cartier, UAT',
      'Proiecție demografică completă cu scenarii INSE',
      'Studiu Densitate Urbană — per zone și indicatori',
      'Studiu Impact Trafic — zonal',
      'Studiu Spații Verzi — inventar și deficit',
      'Studiu Impact Mediu — zone sensibile',
      'Gestiune patrimoniu construit',
      'Export rapoarte institutionale (format primărie)',
      'Hărți tematice: riscuri, densitate, conformitate PUG',
    ],
  },

  PROFESSIONAL: {
    id: 'professional',
    label: 'Professional',
    sublabel: 'Arhitect / Urbanist',
    icon: '📐',
    color: '#22c55e',
    price: 'Professional',
    description: 'Acces complet la toate funcțiile platformei. Pentru arhitecți, urbaniști și consultanți.',
    access: {
      discover:  'full',
      design:    'full',
      analyze:   'complete',  // toate studiile
      project:   'full',
      export:    'all',       // export tot: PDF + JSON + GeoJSON
      relevee:   true,
      lotizare:  true,
      save:      'unlimited',
      api:       true,        // acces API
    },
    studii_allowed: ['ALL'], // toate studiile
    features: [
      'Acces complet la toate funcțiile UrbanX',
      'Toate cele 23 studii și rapoarte generate',
      'Parametri avansați — override orice valoare',
      'Export complet: PDF + JSON + GeoJSON + date brute',
      'API access pentru integrare în alte sisteme',
      'Proiecție Urbanistică — editare scenarii proprii',
      'Releveu Instant complet cu toate panourile',
      'Plan Lotizare avansat',
      'Prioritate suport tehnic',
    ],
  },
};

// ── Starea utilizatorului curent ──────────────────────────────────────────
const _USER = {
  pkg: null,          // pachetul activ
  email: null,
  name: null,
  role: null,
  isLoggedIn: false,

  // Seteaza pachetul (apelat la login / schimbare pachet)
  setPackage(pkgId) {
    this.pkg = _PACKAGES[pkgId.toUpperCase()] || _PACKAGES.EXPLORATOR;
    this.isLoggedIn = true;
    localStorage.setItem('ux_package', pkgId);
    _WorkspaceManager.applyPackageUI();
    console.log('[UrbanX] Pachet activ:', this.pkg.label);
  },

  // Verifica daca are acces la un modul
  canAccess(module) {
    if(!this.pkg) return module === 'discover';
    const a = this.pkg.access[module];
    return a && a !== false;
  },

  // Verifica daca poate genera un studiu
  canGenerateStudy(fnName) {
    if(!this.pkg) return false;
    if(this.pkg.studii_allowed[0] === 'ALL') return true;
    return this.pkg.studii_allowed.includes(fnName);
  },

  // Nivel de acces (pentru UI diferentiat)
  accessLevel(module) {
    if(!this.pkg) return false;
    return this.pkg.access[module];
  },

  restore() {
    const saved = localStorage.getItem('ux_package');
    if(saved) this.setPackage(saved);
    else this.setPackage('PROFESSIONAL'); // default dev
  },
};

// ── Workspace Manager — gestioneaza modulele active ───────────────────────
const _WorkspaceManager = {

  activeModule: 'discover',
  panels: {},

  // Initializare
  init() {
    _USER.restore();
    this.render();
    this.activateModule('discover');
  },

  // Schimba modulul activ
  activateModule(moduleId) {
    if(!_USER.canAccess(moduleId)) {
      _WorkspaceManager.showUpgradePrompt(moduleId);
      return;
    }
    this.activeModule = moduleId;

    // Actualizeaza navigatia
    document.querySelectorAll('.wx-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.module === moduleId);
    });

    // Actualizeaza panelul stang si drept
    this.renderLeftPanel(moduleId);
    this.renderRightPanel(moduleId);

    // Actiuni specifice per modul
    if(moduleId === 'project') _ProjectionEngine.show();
    else _ProjectionEngine.hide();

    if(moduleId === 'export') _ProjectsManager.showPanel();
  },

  // Aplica UI conform pachetului
  applyPackageUI() {
    document.querySelectorAll('[data-pkg-require]').forEach(el => {
      const req = el.dataset.pkgRequire;
      const hasAccess = _USER.canAccess(req) || req === _USER.pkg?.id;
      el.style.display = hasAccess ? '' : 'none';
    });
    document.querySelectorAll('[data-study-require]').forEach(el => {
      const fn = el.dataset.studyRequire;
      const ok = _USER.canGenerateStudy(fn);
      el.classList.toggle('study-locked', !ok);
      if(!ok) el.title = 'Necesita pachet ' + _getMinPackageFor(fn);
    });
    // Badge pachet in header
    const badge = document.getElementById('wx-pkg-badge');
    if(badge && _USER.pkg) {
      badge.textContent = _USER.pkg.icon + ' ' + _USER.pkg.label;
      badge.style.color = _USER.pkg.color;
    }
  },

  showUpgradePrompt(moduleId) {
    const labels = {
      design: 'DESIGN necesită pachet Developer sau Professional',
      analyze: 'Studiile complete necesită pachet Developer sau superior',
      project: 'Proiecția Urbanistică necesită pachet Developer sau superior',
      export: 'Exportul necesită pachet cu acces PDF',
    };
    ss('🔒 ' + (labels[moduleId] || 'Necesita upgrade pachet'));
  },

  // Render navigatie (desktop top + mobile bottom)
  render() {
    const navItems = [
      { id: 'discover', icon: '🔍', label: 'Discover', mLabel: 'Hartă' },
      { id: 'design',   icon: '✏️',  label: 'Design',   mLabel: 'Design' },
      { id: 'analyze',  icon: '📊',  label: 'Analize',  mLabel: 'Studii' },
      { id: 'project',  icon: '🏙',  label: 'Proiecție',mLabel: 'Urban' },
      { id: 'export',   icon: '📁',  label: 'Proiecte', mLabel: 'Salvat' },
    ];

    // Desktop: top navigation
    const desktopNav = document.getElementById('wx-nav-desktop');
    if(desktopNav) {
      desktopNav.innerHTML = navItems.map(item => {
        const locked = !_USER.canAccess(item.id);
        return `<button class="wx-nav-btn ${locked?'locked':''}" 
          data-module="${item.id}"
          onclick="_WorkspaceManager.activateModule('${item.id}')"
          title="${locked?'Necesita upgrade pachet':item.label}">
          <span class="wx-nav-icon">${item.icon}</span>
          <span class="wx-nav-label">${item.label}</span>
          ${locked?'<span class="wx-lock">🔒</span>':''}
        </button>`;
      }).join('');
    }

    // Mobile: bottom navigation
    const mobileNav = document.getElementById('wx-nav-mobile');
    if(mobileNav) {
      mobileNav.innerHTML = navItems.map(item => {
        const locked = !_USER.canAccess(item.id);
        return `<button class="wx-mob-btn ${locked?'locked':''}"
          data-module="${item.id}"
          onclick="_WorkspaceManager.activateModule('${item.id}')">
          <span class="wx-mob-icon">${item.icon}</span>
          <span class="wx-mob-label">${item.mLabel}</span>
        </button>`;
      }).join('');
    }
  },

  renderLeftPanel(moduleId) {
    const panel = document.getElementById('wx-left-panel');
    if(!panel) return;
    panel.innerHTML = _PanelRenderer.getLeftPanel(moduleId);
    _PanelRenderer.postRender(moduleId);
  },

  renderRightPanel(moduleId) {
    const panel = document.getElementById('wx-right-panel');
    if(!panel) return;
    panel.innerHTML = _PanelRenderer.getRightPanel(moduleId);
  },
};

// ── Helper: pachetul minim necesar pentru un studiu ───────────────────────
function _getMinPackageFor(fnName) {
  const adminOnly = ['generateDensityStudy','generateProiectieUrbanistica'];
  if(adminOnly.includes(fnName)) return 'Developer+';
  return 'Developer';
}

// ── Panel Renderer — HTML pentru fiecare modul ───────────────────────────
const _PanelRenderer = {

  getLeftPanel(moduleId) {
    const panels = {
      discover: this._discoverPanel(),
      design:   this._designPanel(),
      analyze:  this._analyzePanel(),
      project:  this._projectPanel(),
      export:   this._exportPanel(),
    };
    return panels[moduleId] || panels.discover;
  },

  getRightPanel(moduleId) {
    // Panoul drept e contextual — se actualizeaza cu rezultatele
    return `<div class="wx-rp-content" id="wx-rp-inner">
      <div class="wx-rp-title">${this._moduleTitle(moduleId)}</div>
      <div id="wx-rp-data">
        ${this._defaultRightContent(moduleId)}
      </div>
    </div>`;
  },

  _moduleTitle(id) {
    const titles = {
      discover: '🔍 Parcelă selectată',
      design:   '✏️ Parametri proiect',
      analyze:  '📊 Rezultate analize',
      project:  '🏙 Proiecție urbană',
      export:   '📁 Proiectele mele',
    };
    return titles[id] || '';
  },

  _defaultRightContent(moduleId) {
    if(moduleId === 'discover') return `
      <div class="wx-rp-hint">
        <div style="font-size:32px;text-align:center;padding:20px 0">🗺</div>
        <div style="font-size:11px;color:#4A6080;text-align:center;line-height:1.6">
          Click pe orice parcelă de pe hartă<br>pentru a vedea informațiile.
        </div>
      </div>`;
    if(moduleId === 'analyze') return `
      <div class="wx-rp-hint">
        <div style="font-size:32px;text-align:center;padding:20px 0">📄</div>
        <div style="font-size:11px;color:#4A6080;text-align:center;line-height:1.6">
          Generează un studiu din panoul stâng.<br>Rezultatele apar aici.
        </div>
      </div>`;
    return '';
  },

  _discoverPanel() {
    return `
    <div class="wx-panel" id="wx-discover-panel">
      <!-- Cautare rapida -->
      <div class="wx-section">
        <div class="wx-section-title">Caută</div>
        <div class="wx-search-wrap">
          <input type="text" id="wx-search" placeholder="Adresă, nr. cadastral..." 
            class="wx-input" onkeydown="if(event.key==='Enter')_wxSearch(this.value)">
          <button class="wx-btn-icon" onclick="_wxSearch(document.getElementById('wx-search').value)">→</button>
        </div>
        <div class="wx-search-actions">
          <button class="wx-chip" onclick="gotoGPS&&gotoGPS()">📍 GPS</button>
          <button class="wx-chip" onclick="showUTRLayer&&showUTRLayer()">🗺 UTR</button>
          <button class="wx-chip" onclick="toggleLegend&&toggleLegend()">📋 Legendă</button>
        </div>
      </div>

      <!-- Info parcelă activă -->
      <div class="wx-section" id="wx-parcel-info-section" style="display:none">
        <div class="wx-section-title">Parcelă selectată</div>
        <div id="wx-parcel-kpis" class="wx-kpi-grid">
          <!-- populat din JS -->
        </div>
        <div class="wx-action-row">
          <button class="wx-btn-primary" onclick="_WorkspaceManager.activateModule('design')"
            data-pkg-require="design">
            ✏️ Proiectează
          </button>
          <button class="wx-btn-secondary" onclick="_WorkspaceManager.activateModule('analyze')"
            data-pkg-require="analyze">
            📊 Analizează
          </button>
        </div>
      </div>

      <!-- Layere harta -->
      <div class="wx-section">
        <div class="wx-section-title collapsible" onclick="_wxToggle(this)">Layere hartă ▾</div>
        <div class="wx-layer-list">
          <label class="wx-layer-item"><input type="checkbox" checked onchange="_toggleLayer('utr',this.checked)"> UTR (zonificare)</label>
          <label class="wx-layer-item"><input type="checkbox" onchange="_toggleLayer('hazard',this.checked)"> Zone risc</label>
          <label class="wx-layer-item"><input type="checkbox" onchange="_toggleLayer('heritage',this.checked)"> Patrimoniu</label>
          <label class="wx-layer-item"><input type="checkbox" onchange="_toggleLayer('aacr',this.checked)"> Zone AACR</label>
          <label class="wx-layer-item"><input type="checkbox" onchange="_toggleLayer('apa',this.checked)"> Ape / inundabil</label>
        </div>
      </div>

      <!-- Scor rapid (Explorator) -->
      <div class="wx-section" id="wx-quick-score" style="display:none">
        <div class="wx-section-title">Scor rapid zonă</div>
        <div id="wx-zone-score" class="wx-score-display">—</div>
      </div>
    </div>`;
  },

  _designPanel() {
    if(!_USER.canAccess('design')) return this._lockedPanel('design', '✏️ Design', 'Developer');
    return `
    <div class="wx-panel" id="wx-design-panel">
      <div class="wx-section">
        <div class="wx-section-title">Funcțiune clădire</div>
        <div id="wx-fn-selector"><!-- AEDIS fn selector --></div>
      </div>
      <div class="wx-section">
        <div class="wx-section-title">Volum propus</div>
        <div class="wx-slider-group">
          <div class="wx-slider-row">
            <span>Niveluri</span>
            <input type="range" min="1" max="20" value="4" id="wx-niv-slider"
              oninput="document.getElementById('wx-niv-val').textContent=this.value+' niv.';_wxUpdateDesign()">
            <span id="wx-niv-val" class="wx-slider-val">4 niv.</span>
          </div>
          <div class="wx-slider-row">
            <span>Înălțime nivel</span>
            <input type="range" min="2.5" max="5" step="0.5" value="3" id="wx-hniv-slider"
              oninput="document.getElementById('wx-hniv-val').textContent=this.value+'m';_wxUpdateDesign()">
            <span id="wx-hniv-val" class="wx-slider-val">3m</span>
          </div>
        </div>
      </div>
      <div class="wx-section">
        <div class="wx-section-title">Indicator live</div>
        <div id="wx-design-indicators" class="wx-kpi-grid">
          <!-- POT/CUT/H live -->
        </div>
      </div>
      <div class="wx-section">
        <div class="wx-section-title">Vizualizare</div>
        <div class="wx-view-btns">
          <button class="wx-view-btn active" onclick="_wxSetView('3d')">3D</button>
          <button class="wx-view-btn" onclick="_wxSetView('plan')">Plan</button>
          <button class="wx-view-btn" onclick="_wxSetView('fatada')">Fațadă</button>
        </div>
      </div>
      <div class="wx-action-row">
        <button class="wx-btn-primary" onclick="if(typeof openViewer3D!=='undefined')openViewer3D()">
          🎮 Viewer 3D
        </button>
        <button class="wx-btn-secondary" onclick="if(typeof generateRelevee!=='undefined')generateRelevee()">
          📐 Releveu
        </button>
      </div>
      <div class="wx-action-row">
        <button class="wx-btn-secondary full" onclick="_WorkspaceManager.activateModule('analyze')">
          📊 Treci la Analize →
        </button>
      </div>
    </div>`;
  },

  _analyzePanel() {
    if(!_USER.canAccess('analyze')) return this._lockedPanel('analyze', '📊 Analize', 'Developer');
    const pkg = _USER.pkg;
    
    // Grupuri de studii per pachet
    const studyGroups = [
      {
        id: 'baza',
        title: '① Analize de bază',
        icon: '🗺',
        studies: [
          { fn: 'generateStudiuAmplasament', label: 'Studiu Amplasament & Context', icon: '🗺', badge: 'ANCPI' },
          { fn: 'generateMemoriu',           label: 'Memoriu Tehnic Preliminar',    icon: '📄', badge: 'juridic' },
        ],
      },
      {
        id: 'tehnice',
        title: '② Studii tehnice',
        icon: '🔬',
        studies: [
          { fn: 'generateSolarStudy',        label: 'Însorire — OMS 119/2014',     icon: '☀️', badge: 'obligatoriu' },
          { fn: 'generateShadowStudy',       label: 'Umbre & Obstrucție',          icon: '🌑', badge: '' },
          { fn: 'generateSSF',               label: 'Siguranță Foc — ISU',         icon: '🚒', badge: 'P118' },
          { fn: 'generateGeotehnicalStudy',  label: 'Pre-Studiu Geotehnic',        icon: '⛏', badge: 'NP074' },
          { fn: 'generateStabilitateTaluzuri',label:'Stabilitate Taluzuri',         icon: '⛰', badge: 'EC7' },
          { fn: 'generateAACR',              label: 'Aviz Aeroport (AACR)',        icon: '✈️', badge: 'ICAO' },
          { fn: 'generateNoiseStudy',        label: 'Studiu Acustic Urban',        icon: '🔊', badge: 'ISO9613' },
          { fn: 'generateWindStudy',         label: 'Vânt & Confort Pietonal',     icon: '💨', badge: '' },
        ],
      },
      {
        id: 'mediu',
        title: '③ Mediu & Infrastructură',
        icon: '🌿',
        studies: [
          { fn: 'generateGreenStudy',        label: 'Spații Verzi',               icon: '🌳', badge: '' },
          { fn: 'generateWaterStudy',        label: 'Gospodărire Ape — DTGA',     icon: '💧', badge: 'ABA' },
          { fn: 'generateEnvironmentalImpact',label:'Studiu Impact Mediu (EIM)',   icon: '🌍', badge: '' },
          { fn: 'generatePrestudiuBransamente',label:'Pre-studiu Bransamente',     icon: '🔌', badge: 'SR1343' },
        ],
      },
      {
        id: 'mobil',
        title: '④ Mobilitate & Impact',
        icon: '🚗',
        studies: [
          { fn: 'generateTrafficStudy',      label: 'Impact Trafic',              icon: '🚦', badge: 'HCM7' },
          { fn: 'generateMobilityStudy',     label: 'Mobilitate & Parcaje',       icon: '🚗', badge: 'NP064' },
          { fn: 'generateDensityStudy',      label: 'Densitate Urbană',           icon: '🏙', badge: '' },
        ],
      },
      {
        id: 'special',
        title: '⑤ Speciale & Patrimoniu',
        icon: '🏛',
        studies: [
          { fn: 'generateIstoricStudy',      label: 'Patrimoniu & Istoric',       icon: '🏛', badge: 'MC' },
          { fn: 'generateHealthImpactStudy', label: 'Studiu Sănătate',            icon: '❤️', badge: '' },
        ],
      },
      {
        id: 'teheco',
        title: '⑥ Tehnico-Economice',
        icon: '💰',
        studies: [
          { fn: 'generateStudiuFezabilitate',label: 'Fezabilitate / DALI',        icon: '💰', badge: 'HG907' },
          { fn: 'generateCPE',               label: 'Certificat Performanță Ener.',icon: '⚡', badge: 'NZEB' },
          { fn: 'generatePrestudiuBransamente',label:'Pre-studiu Bransamente',    icon: '🔌', badge: '' },
        ],
      },
    ];

    const _proGated = (window._USER && _USER.email === 'office@m2msolutions.ro');
    const groupsHTML = studyGroups.map(group => {
      const studiesHTML = group.studies
        .filter(s => !(_proGated && (s.fn === 'generateMasterplan' || s.fn === 'generatePMUD')))
        .map(s => {
        const canDo = _USER.canGenerateStudy(s.fn);
        return `<button class="wx-study-btn ${canDo?'':'locked'}"
          data-study-require="${s.fn}"
          onclick="${canDo ? s.fn+'()' : '_WorkspaceManager.showUpgradePrompt(\"analyze\")'}"
          title="${s.label}${canDo?'':' — Necesita upgrade'}">
          <span class="wx-study-icon">${s.icon}</span>
          <span class="wx-study-label">${s.label}</span>
          ${s.badge?`<span class="wx-study-badge">${s.badge}</span>`:''}
          ${canDo?'':`<span class="wx-study-lock">🔒</span>`}
          <button class="wx-study-info" onclick="event.stopPropagation();infoDrawerOpen&&infoDrawerOpen('${s.fn.replace('generate','').toLowerCase()}')">ⓘ</button>
        </button>`;
      }).join('');
      
      return `<div class="wx-study-group">
        <div class="wx-group-title collapsible" onclick="_wxToggle(this)">
          ${group.icon} ${group.title} ▾
        </div>
        <div class="wx-group-studies">${studiesHTML}</div>
      </div>`;
    }).join('');

    return `<div class="wx-panel" id="wx-analyze-panel">
      <div class="wx-pkg-badge" style="background:${pkg?.color||'#38bdf8'}22;border-color:${pkg?.color||'#38bdf8'}44;color:${pkg?.color||'#38bdf8'}">
        ${pkg?.icon||'📊'} ${pkg?.label||'Professional'} — studii disponibile
      </div>
      ${groupsHTML}
    </div>`;
  },

  _projectPanel() {
    if(!_USER.canAccess('project')) return this._lockedPanel('project', '🏙 Proiecție', 'Developer');
    return `
    <div class="wx-panel" id="wx-project-panel">
      <div class="wx-section">
        <div class="wx-section-title">Proiecție Urbanistică</div>
        <div style="font-size:10px;color:#4A6080;line-height:1.5;padding:6px 0">
          Animație interactivă a evoluției urbane a amplasamentului pe 10, 20 și 30 ani.
        </div>
      </div>
      <div class="wx-section">
        <div class="wx-section-title">Scenariu</div>
        <div class="wx-scenario-btns">
          <button class="wx-scen-btn active" onclick="_ProjectionEngine.setScenario('S2')" id="wx-scen-s1">S2 Moderat</button>
          <button class="wx-scen-btn" onclick="_ProjectionEngine.setScenario('S1')" id="wx-scen-s2">S1 Optimist</button>
          <button class="wx-scen-btn" onclick="_ProjectionEngine.setScenario('S3')" id="wx-scen-s3">S3 Conserv.</button>
        </div>
      </div>
      <div class="wx-section">
        <div class="wx-section-title">An proiecție</div>
        <div class="wx-timeline-wrap">
          <input type="range" min="2025" max="2055" step="1" value="2025"
            id="wx-timeline-slider"
            oninput="_ProjectionEngine.setYear(parseInt(this.value))"
            style="width:100%;accent-color:#8b5cf6">
          <div class="wx-timeline-labels">
            <span>2025</span><span>2035</span><span>2045</span><span>2055</span>
          </div>
          <div id="wx-timeline-year" style="text-align:center;font-size:22px;font-weight:900;color:#8b5cf6;padding:4px 0">2025</div>
        </div>
      </div>
      <div class="wx-section">
        <div class="wx-section-title">Date proiecție</div>
        <div id="wx-proj-stats" class="wx-proj-stats-grid">
          <!-- populat de ProjectionEngine -->
        </div>
      </div>
      <div class="wx-action-row">
        <button class="wx-btn-primary" onclick="_ProjectionEngine.playAnimation()">▶ Animează</button>
        <button class="wx-btn-secondary" onclick="_ProjectionEngine.reset()">↺ Reset</button>
      </div>
      <div class="wx-action-row">
        <button class="wx-btn-secondary full" onclick="generateProiectieUrbanistica&&generateProiectieUrbanistica()">
          📄 Generează Raport PDF
        </button>
      </div>
    </div>`;
  },

  _exportPanel() {
    return `
    <div class="wx-panel" id="wx-export-panel">
      <div class="wx-section">
        <div class="wx-section-title">Proiectele mele</div>
        <div id="wx-projects-list">
          <!-- populat de _ProjectsManager -->
        </div>
        <button class="wx-btn-primary full" onclick="_ProjectsManager.saveCurrentProject()">
          💾 Salvează proiectul curent
        </button>
      </div>
      <div class="wx-section">
        <div class="wx-section-title">Export studii generate</div>
        <div id="wx-generated-studies">
          <!-- lista studii generate in sesiunea curenta -->
        </div>
      </div>
      <div class="wx-section" data-pkg-require="export">
        <div class="wx-section-title">Export date</div>
        <button class="wx-btn-secondary full" onclick="_ProjectsManager.exportGeoJSON()">
          📍 Export GeoJSON
        </button>
        <button class="wx-btn-secondary full" onclick="_ProjectsManager.exportJSON()">
          📋 Export JSON complet
        </button>
      </div>
    </div>`;
  },

  _lockedPanel(moduleId, label, minPackage) {
    return `<div class="wx-panel wx-panel-locked">
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:40px">🔒</div>
        <div style="font-size:14px;font-weight:700;color:#f59e0b;margin:10px 0">${label}</div>
        <div style="font-size:11px;color:#4A6080;line-height:1.6">
          Necesită pachet <b style="color:#fff">${minPackage}</b> sau superior.
        </div>
        <button class="wx-btn-primary" style="margin-top:16px" onclick="_showPackageSelector()">
          ⬆️ Upgrade pachet
        </button>
      </div>
    </div>`;
  },

  postRender(moduleId) {
    if(moduleId === 'design') {
      // Conectam sliderele la AEDIS
      setTimeout(() => {
        if(window.S?.parcels?.[S.activeParcel??0]) _wxUpdateDesign();
      }, 100);
    }
    if(moduleId === 'export') {
      _ProjectsManager.renderList();
    }
  },
};

// ── Helper UI functions ──────────────────────────────────────────────────
function _wxToggle(titleEl) {
  const content = titleEl.nextElementSibling;
  if(!content) return;
  const hidden = content.style.display === 'none';
  content.style.display = hidden ? '' : 'none';
  titleEl.textContent = titleEl.textContent.replace(hidden?'▸':'▾', hidden?'▾':'▸');
}

function _wxSearch(query) {
  if(!query) return;
  if(typeof searchAddress !== 'undefined') searchAddress(query);
  else if(window.map) {
    // Fallback: geocoding Mapbox
    const token = mapboxgl.accessToken;
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&country=ro`)
      .then(r=>r.json())
      .then(data=>{
        if(data.features?.[0]) {
          const [lng,lat] = data.features[0].center;
          map.flyTo({center:[lng,lat], zoom:17, duration:1500});
        }
      });
  }
}

function _wxUpdateDesign() {
  const niv = parseInt(document.getElementById('wx-niv-slider')?.value||4);
  const hNiv = parseFloat(document.getElementById('wx-hniv-slider')?.value||3);
  if(window.AEDIS) {
    AEDIS.corpuri = AEDIS.corpuri||[{}];
    AEDIS.corpuri[0].niv = niv;
    AEDIS.corpuri[0].hNiv = hNiv;
    if(typeof generateVolume3D !== 'undefined') generateVolume3D();
  }
  _wxUpdateIndicators();
}

function _wxUpdateIndicators() {
  const ap = window.S?.parcels?.[S.activeParcel??0];
  if(!ap) return;
  const area = parseFloat(ap.area||300);
  const niv = parseInt(document.getElementById('wx-niv-slider')?.value||4);
  const hNiv = parseFloat(document.getElementById('wx-hniv-slider')?.value||3);
  const sc = area * 0.35; // estimat
  const sda = sc * niv;
  const h = niv * hNiv;
  const el = document.getElementById('wx-design-indicators');
  if(el) el.innerHTML = `
    <div class="wx-kpi"><div class="wx-kpi-val">${(sc/area*100).toFixed(0)}%</div><div class="wx-kpi-lbl">POT</div></div>
    <div class="wx-kpi"><div class="wx-kpi-val">${(sda/area).toFixed(2)}</div><div class="wx-kpi-lbl">CUT</div></div>
    <div class="wx-kpi"><div class="wx-kpi-val">${h.toFixed(1)}m</div><div class="wx-kpi-lbl">H total</div></div>
    <div class="wx-kpi"><div class="wx-kpi-val">${Math.round(sda)}mp</div><div class="wx-kpi-lbl">SDA</div></div>
  `;
}

function _wxSetView(type) {
  document.querySelectorAll('.wx-view-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function _wxUpdateParcelInfo(parcel) {
  const section = document.getElementById('wx-parcel-info-section');
  const kpis = document.getElementById('wx-parcel-kpis');
  if(!section || !kpis || !parcel) return;
  section.style.display = '';
  const p = parcel.params || {};
  kpis.innerHTML = `
    <div class="wx-kpi"><div class="wx-kpi-val" style="font-size:11px">${parcel.nrCad||'—'}</div><div class="wx-kpi-lbl">Nr. cad.</div></div>
    <div class="wx-kpi"><div class="wx-kpi-val">${parcel.area||'—'}</div><div class="wx-kpi-lbl">mp</div></div>
    <div class="wx-kpi"><div class="wx-kpi-val">${p.pot||'—'}%</div><div class="wx-kpi-lbl">POT</div></div>
    <div class="wx-kpi"><div class="wx-kpi-val">${p.cut||'—'}</div><div class="wx-kpi-lbl">CUT</div></div>
    <div class="wx-kpi"><div class="wx-kpi-val">${p.h||'—'}m</div><div class="wx-kpi-lbl">H max</div></div>
    <div class="wx-kpi"><div class="wx-kpi-val" style="font-size:10px">${parcel.utr||'—'}</div><div class="wx-kpi-lbl">UTR</div></div>
  `;
}

function _showPackageSelector() {
  const modal = document.getElementById('wx-package-modal');
  if(modal) modal.style.display = 'flex';
}

// Auto-init
window.addEventListener('load', () => {
  setTimeout(() => _WorkspaceManager.init(), 500);
});

// ── GATE Masterplan/PMUD pentru office@m2msolutions.ro ─────────────────────
// Ascunde butoanele care apeleaza generateMasterplan/generatePMUD oriunde in UI
// (meniu Pro index.html, onboarding etc.). Functiile sunt deja gate-uite la apel.
// NU se atinge ADMIN_EMAILS — doar afisarea acestor doua rapoarte.
window._gateProReports = function(){
  try{
    if(!(window._USER && _USER.email === 'office@m2msolutions.ro')) return;
    document.querySelectorAll('[onclick*="generateMasterplan"],[onclick*="generatePMUD"]').forEach(function(el){
      // urcam la butonul-container daca info-ul e copil
      var btn = el.closest ? (el.closest('button,[class*="card"],[class*="btn"],[class*="item"]') || el) : el;
      btn.style.display = 'none';
    });
  }catch(e){}
};
window.addEventListener('load', function(){ [600,1500,3000,6000].forEach(function(d){ setTimeout(window._gateProReports, d); }); });
document.addEventListener('click', function(){ setTimeout(window._gateProReports, 120); }, true);

