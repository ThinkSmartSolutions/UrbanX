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
    const obs = new MutationObserver(()=>{
      if(!document.getElementById('rv-central-toolbar')) {
        setTimeout(_buildCentralToolbar, 800);
      }
    });
    obs.observe(document.body,{childList:true,subtree:true});
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
const _infoPatchObs = new MutationObserver(()=>{
  _patchInfoToggle();
  _syncInfoBtn();
});
_infoPatchObs.observe(document.body, {childList:true, subtree:true});
setTimeout(()=>{ _patchInfoToggle(); _syncInfoBtn(); }, 2000);

console.log('[Toolbar] ✅ Toolbar centralizat activ — 3 grupuri, scroll orizontal');
  if(typeof ss==='function') ss('✅ Toolbar reorganizat: 📐 Planșe · 📊 Rapoarte · 🔧 Tools');
}
