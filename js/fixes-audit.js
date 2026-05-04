// ═══════════════════════════════════════════════════════════════════════════
// UrbanX — fixes-audit.js  v2
// Adaugă în index.html ÎNAINTE de </body>, după toate celelalte <script>
// ═══════════════════════════════════════════════════════════════════════════

(function _urbanxPatches(){
  'use strict';

  // ─── CSS ────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Fix Multi button dublu pe mobil */
    @media (max-width: 768px) {
      .top-bar button[onclick*="ulti"],
      .top-toolbar button[onclick*="ulti"],
      #btn-multi-top, .toolbar-multi { display: none !important; }
    }
    /* Buton SF/DALI styling */
    .report-item[onclick*="Fezabilitate"],
    .report-item[onclick*="fezabilitate"],
    .dropdown-item[onclick*="Fezabilitate"] {
      border-left: 3px solid #f59e0b;
    }
  `;
  document.head.appendChild(style);

  // ─── 1. REDENUMIRE "Raport Urbanistic Complet" → "Studiu de Amplasament" ──
  function doRename(){
    const VECHI = ['Raport Urbanistic Complet','Raport urbanistic complet','RAPORT URBANISTIC COMPLET'];
    const NOU   = 'Studiu de Amplasament';

    // Texte în DOM
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(node => {
      VECHI.forEach(v => {
        if(node.nodeValue?.includes(v))
          node.nodeValue = node.nodeValue.replaceAll(v, NOU);
      });
    });

    // Atribute title, data-label, placeholder
    document.querySelectorAll('[title],[aria-label],[placeholder],[data-label]').forEach(el => {
      VECHI.forEach(v => {
        if(el.title?.includes(v))        el.title       = el.title.replaceAll(v, NOU);
        if(el.ariaLabel?.includes(v))    el.ariaLabel   = el.ariaLabel.replaceAll(v, NOU);
        if(el.placeholder?.includes(v))  el.placeholder = el.placeholder.replaceAll(v, NOU);
      });
    });
  }

  // ─── 2. INJECTARE BUTON "Pre-Studiu Fezabilitate / DALI" ────────────────
  function injectFezabilitate(){
    if(document.querySelector('[onclick*="generateStudiuFezabilitate"]')) return; // deja injectat

    // Caută ancora: butonul "Memoriu Tehnic Preliminar"
    const anchors = [...document.querySelectorAll('button,a,[role="button"],[onclick]')].filter(el =>
      el.textContent?.includes('Memoriu') && el.textContent?.includes('Tehnic')
    );

    if(!anchors.length){
      // Fallback: caută orice element din lista rapoartelor
      const rapoarteSection = document.querySelector('.dropdown-menu, .reports-list, [data-tab="rapoarte"] ul, #rapoarte-list');
      if(rapoarteSection){
        rapoarteSection.appendChild(createBtn());
        return;
      }
      return; // retry la MutationObserver
    }

    const anchor = anchors[0];
    // Clonăm stilul elementului existent
    const btn = createBtn(anchor);
    anchor.parentNode.insertBefore(btn, anchor.nextSibling);
  }

  function createBtn(anchor){
    // Determinăm tipul de element din anchor
    const tagName = anchor?.tagName?.toLowerCase() || 'div';
    const el = document.createElement(tagName === 'button' ? 'button' : 'a');
    
    // Copiăm clasele din elementul de referință (anchor)
    if(anchor) el.className = anchor.className;
    
    el.setAttribute('onclick', 'generateStudiuFezabilitate()');
    el.setAttribute('title', 'Studiu de Prefezabilitate / Fezabilitate / DALI — HG 907/2016');
    if(el.tagName === 'A') el.href = '#';

    // Detectăm structura internă din anchor
    if(anchor?.querySelector('span')){
      // Are span-uri interne (structura cu icon + label)
      el.innerHTML = anchor.innerHTML; // clone
      const spans = el.querySelectorAll('span');
      if(spans[0]) spans[0].textContent = '📊';
      if(spans[1]) spans[1].textContent = 'Pre-Studiu Fezabilitate / DALI';
      // Actualizăm onclick-ul butonului info dacă există
      const infoBtns = el.querySelectorAll('[onclick*="showInfo"],[onclick*="info"]');
      infoBtns.forEach(b => b.setAttribute('onclick', "event.stopPropagation();showInfo&&showInfo('sf_dali')"));
    } else {
      el.innerHTML = '📊 Pre-Studiu Fezabilitate / DALI';
    }
    return el;
  }

  // ─── 3. RE-WIRING BUTOANE GENERATE (dacă au onclick inline) ────────────
  function rewireGenerateButtons(){
    // Mapare onclick text → funcție corectă
    const mapping = {
      'generateIstoricStudy':    window.generateIstoricStudy,
      'generateExistingBldStudy':window.generateExistingBldStudy,
      'generateEnvironmentalImpact':window.generateEnvironmentalImpact,
      'generateStudiuFezabilitate':window.generateStudiuFezabilitate,
    };
    Object.entries(mapping).forEach(([fnName, fn]) => {
      if(typeof fn !== 'function') return;
      document.querySelectorAll(`[onclick*="${fnName}"]`).forEach(el => {
        if(el._rewired) return;
        el.addEventListener('click', async (e) => {
          e.preventDefault();
          try { await fn(); }
          catch(err) {
            console.error('['+fnName+']', err);
            if(typeof ss === 'function') ss('⚠️ Eroare: '+err.message);
          }
        });
        el._rewired = true;
      });
    });
  }

  // ─── Init + MutationObserver ─────────────────────────────────────────────
  let _initDone = false;
  function init(){
    if(_initDone) return;
    _initDone = true;
    doRename();
    injectFezabilitate();
    rewireGenerateButtons();
    console.log('[UrbanX fixes-audit v2] ✅ Patches applied');
  }

  // Pornire
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>setTimeout(init,300));
  } else {
    setTimeout(init, 300);
  }

  // Re-run la modificări DOM (meniuri dinamice)
  new MutationObserver(muts => {
    if(muts.some(m => m.addedNodes.length)){
      doRename();
      injectFezabilitate();
      rewireGenerateButtons();
    }
  }).observe(document.body, {childList:true, subtree:true});

})();
