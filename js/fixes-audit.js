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
  // rewireGenerateButtons() ELIMINAT — adăuga addEventListener pe butoane care
  // aveau deja onclick="generateXxx()" → dublu download la fiecare studiu
  // Butoanele din index.html au deja handleri corecți, nu mai e nevoie de rewire

  // ─── Init + MutationObserver ─────────────────────────────────────────────
  let _initDone = false;
  function init(){
    if(_initDone) return;
    _initDone = true;
    doRename();
    injectFezabilitate();
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
    }
  }).observe(document.body, {childList:true, subtree:true});

})();

// ═══════════════════════════════════════════════════════════════════════════
// PATCH: _pdfSafe — fix diacritice românești în toate PDF-urile
// Problema: Ș/Ț cu virgulă (U+021A/021B) nu erau tratate, apăreau ca litere
// greșite sau lowercase în jsPDF (font Helvetica suportă doar Latin-1)
// ═══════════════════════════════════════════════════════════════════════════
(function _patchPdfSafe(){

  function _pdfSafeFixed(s){
    if(s === null || s === undefined) return '\u2014';
    return String(s)
      // ─── Minuscule ───────────────────────────────────────────────────
      .replace(/\u0103/g,'a')   // ă (U+0103)
      .replace(/\u00e2/g,'a')   // â (U+00E2)
      .replace(/\u00ee/g,'i')   // î (U+00EE)
      .replace(/\u0219/g,'s')   // ș cu virgulă (U+0219) ← LIPSEA
      .replace(/\u015f/g,'s')   // ş cu cedilă  (U+015F)
      .replace(/\u021b/g,'t')   // ț cu virgulă (U+021B) ← LIPSEA
      .replace(/\u0163/g,'t')   // ţ cu cedilă  (U+0163)
      // ─── Majuscule ───────────────────────────────────────────────────
      .replace(/\u0102/g,'A')   // Ă (U+0102)
      .replace(/\u00c2/g,'A')   // Â (U+00C2)
      .replace(/\u00ce/g,'I')   // Î (U+00CE)
      .replace(/\u0218/g,'S')   // Ș cu virgulă (U+0218) ← LIPSEA
      .replace(/\u015e/g,'S')   // Ş cu cedilă  (U+015E)
      .replace(/\u021a/g,'T')   // Ț cu virgulă (U+021A) ← LIPSEA
      .replace(/\u0162/g,'T')   // Ţ cu cedilă  (U+0162)
      // ─── Caractere speciale ──────────────────────────────────────────
      .replace(/\u2014/g,'-')   // — em dash
      .replace(/\u2013/g,'-')   // – en dash
      .replace(/\u201e/g,'"')   // „ ghilimele jos
      .replace(/\u201c/g,'"')   // " ghilimele stânga
      .replace(/\u201d/g,'"')   // " ghilimele dreapta
      .replace(/\u00ab/g,'<<')  // «
      .replace(/\u00bb/g,'>>')  // »
      .replace(/\u20ac/g,'EUR') // € simbol
      .replace(/\u2248/g,'~')   // ≈ aproximativ
      .replace(/\u2264/g,'<=')  // ≤
      .replace(/\u2265/g,'>=')  // ≥
      .replace(/\u00d7/g,'x')   // × înmulțire
      .replace(/\u00f7/g,'/')   // ÷ împărțire
      // ─── Catch-all: orice caracter non-Latin1 rămas → ?  ─────────────
      // (jsPDF Helvetica suportă doar ISO-8859-1 = U+0000–U+00FF)
      .replace(/[^\x00-\xFF]/g, function(ch){
        // Încearcă o mapare de urgență pentru litere comune
        const emergency = {
          '\u0410':'A','\u0430':'a','\u0411':'B','\u0431':'b', // Cyrillic basic
        };
        return emergency[ch] || '?';
      });
  }

  // Suprascrie global — toată aplicația folosește _pdfSafe
  if(typeof window._pdfSafe === 'function'){
    window._pdfSafe = _pdfSafeFixed;
    console.log('[UrbanX fixes-audit] _pdfSafe patched ✅ — diacritice românești fixate');
  } else {
    // Dacă nu există încă, o definim
    window._pdfSafe = _pdfSafeFixed;
    console.log('[UrbanX fixes-audit] _pdfSafe definit ✅');
  }

})();
