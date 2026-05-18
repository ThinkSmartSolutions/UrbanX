// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-toolbar.js — Toolbar centralizat, grupat, scroll orizontal
// UrbanX TSS·FG
//
// Rezolvă problema: 20+ butoane injectate individual în bare diferite
// → un singur toolbar organizat în 3 grupuri logice, scroll orizontal
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  function waitReady(cb,n){
    n=n||0; if(n>100) return;
    if(typeof _RV==='undefined'){ setTimeout(()=>waitReady(cb,n+1),300); return; }
    cb();
  }
  waitReady(()=>{
    // Așteptăm puțin ca toate modulele să-și fi injectat butoanele lor
    setTimeout(_buildCentralToolbar, 1500);
    const _tbObs=setInterval(()=>{
      if(!document.getElementById('rv-central-toolbar')) setTimeout(_buildCentralToolbar,800);
      else clearInterval(_tbObs);
    },500);
  });
})();

function _buildCentralToolbar(){
  if(document.getElementById('rv-central-toolbar')) return;

  // Găsim containerul panoului de relevee
  const panel = document.querySelector('#rv-sec-relevee') ||
                document.querySelector('.rv-rsec[id*="relevee"]') ||
                document.querySelector('.rv-rsec');
  if(!panel) return;

  // Construim toolbar-ul centralizat
  const bar = document.createElement('div');
  bar.id = 'rv-central-toolbar';
  bar.style.cssText = [
    'width:100%','box-sizing:border-box',
    'background:rgba(12,18,42,.97)',
    'border-bottom:1px solid rgba(212,175,55,.2)',
    'padding:5px 8px 5px',
    'display:flex','flex-direction:column','gap:4px',
  ].join(';');

  // Grupuri de butoane
  const groups = [
    {
      label:'📐 PLANȘE',
      color:'rgba(56,189,248,.6)',
      btns:[
        {icon:'🏗', label:'Pereți Reali',  fn:'_rvExportPlanseWalls'},
        {icon:'🏠', label:'Acoperiș',       fn:'_rvExportAcoperis'},
        {icon:'🏛', label:'Fațade AEDIS',   fn:'_rvExportFatadeAEDIS'},
        {icon:'🅿', label:'Plan Subsol',    fn:'_rvExportSubsol'},
        {icon:'◼', label:'SVG',            fn:'_rvExportSVG'},
        {icon:'📐', label:'Planșe A3',      fn:'_rvExportPlanseA3'},
      ]
    },
    {
      label:'📊 RAPOARTE',
      color:'rgba(52,211,153,.6)',
      btns:[
        {icon:'📋', label:'Suprafețe',      fn:'_rvExportTabelSuprafete'},
        {icon:'🧱', label:'Materiale',      fn:'_rvExportTablouMateriale'},
        {icon:'📝', label:'Memoriu Tehnic', fn:'_rvExportMemoriu'},
        {icon:'💼', label:'Prezentare',     fn:'_rvExportPrezentare'},
        {icon:'📦', label:'Export Complet', fn:'_rvExportComplet'},
      ]
    },
    {
      label:'🔧 TOOLS',
      color:'rgba(168,85,247,.6)',
      btns:[
        {icon:'🎯', label:'DNA Optimizare', fn:'_rvDNAOptimize'},
        {icon:'⚖', label:'Scenarii A/B',   fn:'_rvExportScenarii'},
        {icon:'🏙', label:'Context 3D',     fn:'_ctx3DActivate'},
        {icon:'🌍', label:'Cesium',         fn:'_ctx3DCesium'},
        {icon:'📦', label:'GLB',            fn:'_rvExportGLB'},
        {icon:'🏗', label:'IFC',            fn:'_rvExportIFC'},
        {icon:'🎬', label:'Blender .py',    fn:'_rvDownloadBlenderScript'},
        {icon:'🌡', label:'Heatmap',        fn:'_rvToggleHeatmap'},
      ]
    },
  ];

  groups.forEach(g => {
    const row = document.createElement('div');
    row.style.cssText = [
      'display:flex','align-items:center','gap:4px',
      'overflow-x:auto','scrollbar-width:none',
    ].join(';');
    // Nascondiamo scrollbar su webkit
    row.style.msOverflowStyle = 'none';

    // Label gruppo
    const lbl = document.createElement('span');
    lbl.innerHTML = g.label;
    lbl.style.cssText = [
      'font-size:8.5px','font-weight:800','color:'+g.color,
      'white-space:nowrap','min-width:68px','flex-shrink:0',
      'font-family:inherit','letter-spacing:.3px',
    ].join(';');
    row.appendChild(lbl);

    // Separatore
    const sep = document.createElement('div');
    sep.style.cssText = 'width:1px;height:18px;background:'+g.color+';flex-shrink:0;opacity:.4;margin-right:2px;';
    row.appendChild(sep);

    // Botoane
    g.btns.forEach(b_ => {
      const btn = document.createElement('button');
      btn.id = 'rv-tb-'+b_.fn;
      btn.innerHTML = b_.icon + ' ' + b_.label;
      btn.title = b_.label;
      btn.style.cssText = [
        'height:26px','padding:0 9px','border-radius:5px','cursor:pointer',
        'font-family:inherit','font-size:9.5px','font-weight:700',
        'white-space:nowrap','flex-shrink:0',
        'background:rgba(255,255,255,.04)',
        'border:1px solid '+g.color,
        'color:#e2e8f0',
        'transition:all .12s',
      ].join(';');
      btn.onmouseover = () => {
        btn.style.background = g.color.replace('.6','.25');
        btn.style.color = '#ffffff';
      };
      btn.onmouseout = () => {
        btn.style.background = 'rgba(255,255,255,.04)';
        btn.style.color = '#e2e8f0';
      };
      btn.onclick = () => {
        if(typeof window[b_.fn] !== 'function'){
          if(typeof ss==='function') ss('⚠ '+b_.fn+' — funcție indisponibilă. Generați releveele mai întâi.');
          return;
        }
        btn.style.opacity = '.5';
        Promise.resolve(window[b_.fn]()).finally(()=>{ btn.style.opacity='1'; });
      };
      row.appendChild(btn);
    });

    bar.appendChild(row);
  });

  // Inserăm toolbar-ul ca primul element din panel
  panel.insertBefore(bar, panel.firstChild);

  // Ascundem butoanele vechi injectate de module individuale
  // (le lăsăm în DOM dar le ascundem — funcțiile rămân disponibile)
  const oldWraps = [
    'rv-walls-btns','rv-subsol-wrap','rv-acop-wrap',
    'rv-optim-wrap','rv-extras-wrap','ctx3d-btn-wrap','rv-multi-actions'
  ];
  oldWraps.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });

  
// ── Sync Info button state cu body ──────────────────────────────────────
function _syncInfoBtn(){
  const btn  = document.getElementById('rv-btn-hide-rpanel');
  const body = document.getElementById('rv-body-main');
  if(!btn || !body) return;
  const isHidden = body.classList.contains('rpanel-hidden');
  if(isHidden){
    btn.textContent   = '◉ Info ↩';
    btn.style.color   = '#94a3b8';
    btn.style.borderColor = 'rgba(148,163,184,.3)';
    btn.style.background  = 'rgba(148,163,184,.06)';
    btn.dataset.hidden = '1';
  } else {
    btn.textContent   = '○ Info';
    btn.style.color   = '#38bdf8';
    btn.style.borderColor = 'rgba(56,189,248,.3)';
    btn.style.background  = 'rgba(56,189,248,.08)';
    btn.dataset.hidden = '0';
  }
}

// Patch onclick să citească starea din body
function _patchInfoToggle(){
  const btn = document.getElementById('rv-btn-hide-rpanel');
  if(!btn || btn._syncPatched) return;
  btn._syncPatched = true;
  btn.onclick = null; // remove inline handler
  btn.addEventListener('click', function(){
    const body = document.getElementById('rv-body-main');
    if(!body) return;
    const hidden = body.classList.contains('rpanel-hidden');
    if(hidden){
      body.classList.remove('rpanel-hidden');
    } else {
      body.classList.add('rpanel-hidden');
    }
    _syncInfoBtn();
    setTimeout(()=>{ if(window._rvRender && window._RV?.building) _rvRender(); }, 150);
  });
}

// Rulăm la fiecare mutație (re-render relevee poate adăuga butonul din nou)
setInterval(()=>{ try{_patchInfoToggle();_syncInfoBtn();}catch(e){} },1000);
setTimeout(()=>{ _patchInfoToggle(); _syncInfoBtn(); }, 2000);


// ═══════════════════════════════════════════════════════════════════════════
// MOBILE FIXES — panel toggle, info button, layout
// ═══════════════════════════════════════════════════════════════════════════

function _rvMobileFixes(){
  const isMobile = window.innerWidth <= 840;
  if(!isMobile) return;

  // ── 1. Left panel toggle — overlay backdrop ─────────────────────────────
  const menuBtn = document.getElementById('rv-mobile-menu-btn');
  const lpanel  = document.getElementById('rv-lpanel-main') || document.querySelector('.rv-lpanel');
  
  if(menuBtn && lpanel && !menuBtn._mobilePatchedFG){
    menuBtn._mobilePatchedFG = true;

    // Creăm overlay backdrop
    let overlay = document.getElementById('rv-mobile-overlay');
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'rv-mobile-overlay';
      overlay.style.cssText = [
        'position:fixed','inset:0','z-index:190','background:rgba(0,0,0,.5)',
        'display:none','backdrop-filter:blur(2px)','-webkit-backdrop-filter:blur(2px)',
      ].join(';');
      overlay.onclick = () => closePanel();
      document.getElementById('rv-modal')?.appendChild(overlay);
    }

    const openPanel = () => {
      lpanel.classList.add('rv-lpanel-open');
      overlay.style.display = 'block';
      menuBtn.innerHTML = '✕';
      menuBtn.style.background = 'rgba(212,175,55,.2)';
      menuBtn.style.borderColor = 'rgba(212,175,55,.5)';
      menuBtn.style.color = '#D4AF37';
    };
    const closePanel = () => {
      lpanel.classList.remove('rv-lpanel-open');
      overlay.style.display = 'none';
      menuBtn.innerHTML = '☰';
      menuBtn.style.background = 'rgba(255,255,255,.08)';
      menuBtn.style.borderColor = 'rgba(255,255,255,.15)';
      menuBtn.style.color = '#fff';
    };

    // Înlocuim handler-ul onclick inline
    menuBtn.onclick = null;
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if(lpanel.classList.contains('rv-lpanel-open')) closePanel();
      else openPanel();
    }, { passive: false });

    // Touch swipe: swipe stânga pe panel = close
    let touchStartX = 0;
    lpanel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive:true});
    lpanel.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if(dx < -60) closePanel();
    }, {passive:true});
  }

  // ── 2. Info button pe mobil — toggle zoombar ─────────────────────────────
  const infoBtn = document.getElementById('rv-btn-hide-rpanel');
  const zoombar = document.querySelector('#rv-modal .rv-zoombar');
  const body    = document.getElementById('rv-body-main');

  if(infoBtn && zoombar && !infoBtn._mobileInfoPatched){
    infoBtn._mobileInfoPatched = true;
    infoBtn.onclick = null;
    
    // Pe mobil: Info ascunde/arată bara de jos (zoombar)
    infoBtn.addEventListener('click', () => {
      const hidden = zoombar.style.display === 'none';
      if(hidden){
        zoombar.style.display = '';
        infoBtn.textContent = '○ Info';
        infoBtn.style.color = '#38bdf8';
        infoBtn.style.opacity = '1';
      } else {
        zoombar.style.display = 'none';
        infoBtn.textContent = '◉ Info ↑';
        infoBtn.style.color = '#94a3b8';
      }
    });
    // Buton flotant pentru a readuce zoombar-ul când e ascuns
    let floatBtn = document.getElementById('rv-mobile-show-bar');
    if(!floatBtn){
      floatBtn = document.createElement('button');
      floatBtn.id = 'rv-mobile-show-bar';
      floatBtn.innerHTML = '↑';
      floatBtn.title = 'Arată controalele';
      floatBtn.style.cssText = [
        'position:fixed','bottom:12px','right:12px','z-index:300',
        'width:40px','height:40px','border-radius:50%',
        'background:rgba(10,14,26,.9)','border:1.5px solid rgba(212,175,55,.4)',
        'color:#D4AF37','font-size:16px','cursor:pointer',
        'display:none','align-items:center','justify-content:center',
        'box-shadow:0 4px 20px rgba(0,0,0,.5)',
      ].join(';');
      floatBtn.onclick = () => {
        zoombar.style.display = '';
        floatBtn.style.display = 'none';
        infoBtn.textContent = '○ Info';
        infoBtn.style.color = '#38bdf8';
      };
      document.getElementById('rv-modal')?.appendChild(floatBtn);
    }

    // Observer: când zoombar e ascuns arătăm floatBtn
    const zbObs = new MutationObserver(() => {
      floatBtn.style.display = zoombar.style.display==='none' ? 'flex' : 'none';
    });
    zbObs.observe(zoombar, {attributes:true, attributeFilter:['style']});
  }

  // ── 3. Canvas — touch pan/zoom nativ ─────────────────────────────────────
  const canvas = document.querySelector('#rv-modal canvas');
  if(canvas && !canvas._touchPatched){
    canvas._touchPatched = true;
    // Prevenim scroll de pagină când e pe canvas
    canvas.addEventListener('touchmove', e => e.preventDefault(), {passive:false});
  }

  // ── 4. Zoombar scroll orizontal pe mobil ─────────────────────────────────
  const toolbar = document.getElementById('rv-toolbar-main');
  if(toolbar && !toolbar._scrollPatched){
    toolbar._scrollPatched = true;
    toolbar.style.overflowX = 'auto';
    toolbar.style.overflowY = 'hidden';
    toolbar.style.webkitOverflowScrolling = 'touch';
    toolbar.style.msOverflowStyle = 'none';
    toolbar.style.scrollbarWidth = 'none';
  }
}

// Rulăm la injecție și la resize
const _rvMobileObs=setInterval(()=>{ if(document.getElementById('rv-mobile-menu-btn')){_rvMobileFixes();clearInterval(_rvMobileObs);} },500);
window.addEventListener('resize', _rvMobileFixes);
setTimeout(_rvMobileFixes, 1500);
setTimeout(_rvMobileFixes, 3000);


// ── CSS mobil îmbunătățit ─────────────────────────────────────────────────
(function(){
  const st = document.createElement('style');
  st.textContent = `
    /* Overlay backdrop panel stâng */
    #rv-mobile-overlay {
      transition: opacity .25s;
    }

    /* Panel stâng - tranziție smoothă */
    #rv-lpanel-main, .rv-lpanel {
      transition: left .28s cubic-bezier(.4,0,.2,1) !important;
    }

    /* Buton hamburger - mai vizibil pe mobil */
    @media (max-width: 840px) {
      #rv-mobile-menu-btn {
        position: fixed !important;
        top: 10px !important;
        left: 10px !important;
        z-index: 220 !important;
        width: 38px !important;
        height: 38px !important;
        border-radius: 8px !important;
        font-size: 16px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
        box-shadow: 0 2px 12px rgba(0,0,0,.4) !important;
      }

      /* Topbar pe mobil — ascunde elemente secundare */
      #rv-modal .rv-logo-t { display: none !important; }
      #rv-modal .rv-tinfo  { display: none !important; }

      /* Zoombar pe mobil — scroll orizontal */
      #rv-modal .rv-zoombar {
        overflow-x: auto !important;
        overflow-y: hidden !important;
        -webkit-overflow-scrolling: touch !important;
        flex-wrap: nowrap !important;
        gap: 5px !important;
        padding: 6px 8px !important;
        scrollbar-width: none !important;
      }
      #rv-modal .rv-zoombar::-webkit-scrollbar { display: none !important; }

      /* Butoane zoom mai mari pe touch */
      #rv-modal .rv-zbtn {
        min-width: 38px !important;
        height: 38px !important;
        font-size: 16px !important;
        flex-shrink: 0 !important;
      }

      /* Butoane export — mai compacte dar tappable */
      #rv-modal .rv-expbtn {
        font-size: 9.5px !important;
        padding: 5px 9px !important;
        height: 30px !important;
        flex-shrink: 0 !important;
      }

      /* Canvas wrap — full height disponibil */
      #rv-modal .rv-drawwrap {
        height: calc(100dvh - 120px) !important;
        padding: 4px !important;
      }

      /* Tabs — scroll orizontal */
      #rv-modal .rv-tabs {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        flex-wrap: nowrap !important;
        scrollbar-width: none !important;
      }
      #rv-modal .rv-tabs::-webkit-scrollbar { display: none !important; }
      #rv-modal .rv-tab {
        flex-shrink: 0 !important;
        padding: 8px 10px !important;
        font-size: 10px !important;
      }

      /* Info button pe mobil */
      #rv-btn-hide-rpanel {
        flex-shrink: 0 !important;
      }

      /* Multi-building selector pe mobil */
      #rv-multi-selector {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        scrollbar-width: none !important;
        flex-wrap: nowrap !important;
      }
    }

    /* Buton flotant "arată bara" */
    #rv-mobile-show-bar {
      transition: opacity .2s !important;
    }
  `;
  document.head.appendChild(st);
})();

console.log('[Toolbar] ✅ Toolbar centralizat activ — 3 grupuri, scroll orizontal');
  if(typeof ss==='function') ss('✅ Toolbar reorganizat: 📐 Planșe · 📊 Rapoarte · 🔧 Tools');
}
