// ═══════════════════════════════════════════════════════════════════════════
// UrbanX — MAP RESIZE FIX
// Harta se extinde la full width când panelul lateral e ascuns/închis
// ═══════════════════════════════════════════════════════════════════════════

(function _mapResizeFix(){

  // CSS: panel lateral → hartă se extinde
  const style = document.createElement('style');
  style.textContent = `
    /* Când panelul lateral e ascuns, harta ocupă tot spațiul disponibil */
    .sidebar-hidden #map,
    .panel-hidden #map,
    .side-panel[style*="display: none"] ~ #map,
    .side-panel[style*="display:none"] ~ #map {
      width: 100% !important;
      left: 0 !important;
    }

    /* Container map — tranziție smooth la resize */
    #map, .map-container, #mapbox-container {
      transition: width 0.25s ease, left 0.25s ease;
    }

    /* Panel lateral — tranziție smooth */
    .side-panel, #side-panel, .left-panel, #panel-left,
    .info-panel, #info-panel, .result-panel {
      transition: width 0.25s ease, transform 0.25s ease;
    }

    /* Buton ascunde/arată panel — always visible */
    #btn-toggle-panel, .toggle-panel-btn, .collapse-btn {
      z-index: 500;
      position: relative;
    }
  `;
  document.head.appendChild(style);

  // JS: interceptăm toate butoanele de închidere/ascundere a panoului
  function patchToggleButtons(){
    // Pattern 1: Butoane cu onclick care conțin "panel", "sidebar", "hide", "close"
    document.querySelectorAll('button, .btn, [role="button"]').forEach(btn => {
      const oc = btn.getAttribute('onclick') || '';
      const txt = btn.textContent.trim();
      const cls = btn.className || '';
      
      const isToggle = (
        oc.includes('panel') || oc.includes('sidebar') || oc.includes('hide') ||
        cls.includes('toggle') || cls.includes('collapse') || cls.includes('close-panel') ||
        txt === '✕' || txt === '×' || txt === '❌' || txt === '⟨' || txt === '›' ||
        btn.id?.includes('close') || btn.id?.includes('toggle')
      );
      
      if(isToggle && !btn._resizeWired){
        btn.addEventListener('click', () => {
          // Dăm un mic delay pentru CSS transition, apoi resize harta
          setTimeout(triggerMapResize, 50);
          setTimeout(triggerMapResize, 300);
        });
        btn._resizeWired = true;
      }
    });

    // Pattern 2: Elemente cu clasa 'close' sau 'x-btn' din paneluri
    document.querySelectorAll('.close, .btn-close, [data-dismiss], .panel-close').forEach(el => {
      if(!el._resizeWired){
        el.addEventListener('click', () => {
          setTimeout(triggerMapResize, 50);
          setTimeout(triggerMapResize, 300);
        });
        el._resizeWired = true;
      }
    });
  }

  function triggerMapResize(){
    // Metoda 1: Mapbox standard resize
    const map = window.map || window._map || window.mapInstance;
    if(map && typeof map.resize === 'function'){
      try{ map.resize(); } catch(e){}
    }

    // Metoda 2: Trigger resize event pe window
    try{ window.dispatchEvent(new Event('resize')); } catch(e){}

    // Metoda 3: Forțăm dimensiunea #map să se extindă
    const mapEl = document.getElementById('map') || document.querySelector('.map-container');
    if(mapEl){
      const parent = mapEl.parentElement;
      if(parent){
        // Dacă panelul sibling e ascuns, extindem harta
        const panels = parent.querySelectorAll('.side-panel, #side-panel, .left-panel, .info-panel');
        let panelWidth = 0;
        panels.forEach(p => {
          const style = window.getComputedStyle(p);
          if(style.display !== 'none' && style.visibility !== 'hidden'){
            panelWidth += p.offsetWidth || 0;
          }
        });
        // Lăsăm CSS să gestioneze dimensiunea, dar triggeram resize pe map
      }
    }

    // Metoda 4: Three.js V3D resize dacă e activ
    if(typeof V3D !== 'undefined' && V3D.renderer){
      try{
        const container = V3D.renderer.domElement?.parentElement;
        if(container){
          V3D.renderer.setSize(container.clientWidth, container.clientHeight);
          if(V3D.camera){
            V3D.camera.aspect = container.clientWidth / container.clientHeight;
            V3D.camera.updateProjectionMatrix();
          }
        }
      }catch(e){}
    }
  }

  // Observăm schimbările de vizibilitate în DOM (paneluri care apar/dispar)
  const observer = new MutationObserver(function(mutations){
    let needsResize = false;
    mutations.forEach(m => {
      if(m.type === 'attributes' && (m.attributeName === 'style' || m.attributeName === 'class')){
        const target = m.target;
        // Verificăm dacă e un panel relevant
        if(target.classList?.contains('side-panel') ||
           target.id?.includes('panel') ||
           target.className?.includes('panel') ||
           target.className?.includes('sidebar')){
          needsResize = true;
        }
      }
      if(m.type === 'childList'){
        // Nou buton adăugat? Re-patch
        if(m.addedNodes.length) patchToggleButtons();
      }
    });
    if(needsResize){
      setTimeout(triggerMapResize, 50);
      setTimeout(triggerMapResize, 300);
    }
  });

  // Init
  function init(){
    patchToggleButtons();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Patch și butonul X din panelul LMI (cel vizibil în screenshot)
    // Identificat după pattern: butonul cu text ✕ sau × sau 🔴 care închide un panel
    document.querySelectorAll('[onclick*="closePanel"], [onclick*="hidePanel"], [onclick*="ss("], .close-x, .btn-x').forEach(btn => {
      if(!btn._resizeWired){
        btn.addEventListener('click', () => setTimeout(triggerMapResize, 300));
        btn._resizeWired = true;
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 200);
  }

  // Expunem funcția global pentru apel manual
  window._triggerMapResize = triggerMapResize;

})();
