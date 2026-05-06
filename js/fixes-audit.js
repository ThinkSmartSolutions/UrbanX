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
      .replace(/\u2022/g,'-')   // bullet •
      .replace(/\u2023/g,'-')   // ‣ bullet
      .replace(/\u25cf/g,'*')   // ● circle
      .replace(/\u2713/g,'v')   // ✓ checkmark
      .replace(/\u2714/g,'v')   // ✔ heavy checkmark
      .replace(/\u2716/g,'x')   // ✖ X
      .replace(/\u2605/g,'*')   // ★ star
      .replace(/\u2606/g,'*')   // ☆ star
      .replace(/\u2190/g,'<-')  // ← left arrow
      .replace(/\u2192/g,'->')  // → right arrow
      .replace(/\u2194/g,'<->') // ↔ arrows
      .replace(/\u00b7/g,'.')   // · middle dot
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

// ═══════════════════════════════════════════════════════════════════════════
// PATCH: Info Drawer pentru Pre-Studiu Fezabilitate / DALI
// ═══════════════════════════════════════════════════════════════════════════
(function _patchInfoDrawerFezabilitate(){
  // Interceptăm infoDrawerOpen pentru 'fezabilitate'
  const _origInfoDrawer = window.infoDrawerOpen;
  window.infoDrawerOpen = function(id){
    if(id === 'fezabilitate'){
      // Construim manual drawer-ul pentru SF/DALI
      const drawer = document.getElementById('info-drawer');
      const backdrop = document.getElementById('info-drawer-backdrop');
      const ico = document.getElementById('info-drawer-ico');
      const title = document.getElementById('info-drawer-title');
      const badge = document.getElementById('info-drawer-badge-wrap');
      const body = document.getElementById('info-drawer-body');
      if(!drawer) return;

      if(ico) ico.textContent = '📊';
      if(title) title.textContent = 'Pre-Studiu Fezabilitate / DALI';
      if(badge) badge.innerHTML = `
        <span style="background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.4);color:#f59e0b;border-radius:5px;padding:2px 8px;font-size:9px;font-weight:700">HG 907/2016</span>
        <span style="background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);color:#22c55e;border-radius:5px;padding:2px 8px;font-size:9px;margin-left:4px">12 PAGINI</span>
        <span style="background:rgba(139,92,246,.1);border:1px solid rgba(139,92,246,.3);color:#a78bfa;border-radius:5px;padding:2px 8px;font-size:9px;margin-left:4px">ORIENTATIV</span>
      `;
      if(body) body.innerHTML = `
        <p style="color:#94a3b8;font-size:12px;line-height:1.7;margin-bottom:12px">
          Studiu de <b style="color:#e2e8f0">Prefezabilitate / Fezabilitate / DALI</b> conform <b style="color:#f59e0b">HG 907/2016</b> privind etapele de elaborare și conținutul-cadru al documentațiilor tehnico-economice.
        </p>
        <div style="background:rgba(255,255,255,.04);border-radius:8px;padding:10px;margin-bottom:10px">
          <div style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:6px">Conținut (12 pagini)</div>
          ${[
            ['📋','Date de identificare + indicatori PUG'],
            ['🏙','Situația existentă + context urban 3D'],
            ['📐','3 scenarii tehnice comparate (S1/S2/S3)'],
            ['💰','Indicatori tehnico-economici estimativi'],
            ['📈','Cash-flow pe 20 ani + surse finanțare'],
            ['⚠️','Matrice de risc (9 categorii)'],
            ['📅','Calendar implementare (10 faze)'],
            ['📝','11 avize și acorduri necesare'],
            ['🏛','Diferența SF vs DALI + conținut DALI'],
            ['✅','Baza legală completă HG 907/2016'],
          ].map(([i,t])=>`<div style="display:flex;gap:7px;align-items:flex-start;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.04)"><span>${i}</span><span style="color:#cbd5e1;font-size:11px">${t}</span></div>`).join('')}
        </div>
        <div style="background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.2);border-radius:8px;padding:10px;font-size:10px;color:#94a3b8;line-height:1.6">
          <b style="color:#f59e0b">NOTĂ:</b> Document cu caracter <b style="color:#e2e8f0">STRICT ORIENTATIV</b>. Nu înlocuiește SF sau DALI elaborat de consultant autorizat. Valorile financiare au precizie ±30%.
        </div>
      `;
      if(backdrop){ backdrop.style.display='block'; }
      if(drawer){ drawer.classList.add('open'); drawer.style.display='flex'; }
      return;
    }
    // Pentru orice alt id, apelăm funcția originală
    if(typeof _origInfoDrawer === 'function') _origInfoDrawer.call(this, id);
  };
  console.log('[UrbanX fixes-audit] infoDrawerOpen fezabilitate patched ✅');
})();

// ═══════════════════════════════════════════════════════════════════════════
// getFinanciarConfig() — Prețuri de piață imobiliară per UAT
// Returnează estimări calibrate pe baza dimensiunii și rangului orașului
// ═══════════════════════════════════════════════════════════════════════════
window.getFinanciarConfig = function(){
  const uatId = (typeof S_UAT !== 'undefined' ? S_UAT.id : null) || 'municipiul-iasi';
  const uat   = (typeof getUATLabel !== 'undefined' ? getUATLabel() : 'Localitate');

  // Tabel de prețuri per UAT (EUR/mp teren, EUR/mp construcție, EUR/mp/lună chirie)
  const PRET_UAT = {
    // Tier 0 — Capitală
    'municipiul-bucuresti':     {pretTeren:1400, pretConstructie:800, chirieRef:70, operatorApa:'Apa Nova București SA',  operatorEnerg:'Enel Energie Muntenia'},
    // Tier 1 — Mari orașe universitare
    'municipiul-cluj-napoca':   {pretTeren:1100, pretConstructie:780, chirieRef:65, operatorApa:'Compania de Apă Someș SA', operatorEnerg:'CEZ Distribuție SA'},
    'municipiul-timisoara':     {pretTeren: 950, pretConstructie:760, chirieRef:60, operatorApa:'Aquatim SA Timișoara',     operatorEnerg:'DEER SA (E-ON)'},
    'municipiul-brasov':        {pretTeren: 900, pretConstructie:750, chirieRef:58, operatorApa:'Compania Apa Brașov SA',   operatorEnerg:'CEZ Distribuție SA'},
    'municipiul-constanta':     {pretTeren: 850, pretConstructie:730, chirieRef:55, operatorApa:'RAJA SA Constanța',        operatorEnerg:'Enel Energie Muntenia'},
    // Tier 2 — Orașe regionale importante
    'municipiul-iasi':          {pretTeren: 750, pretConstructie:710, chirieRef:50, operatorApa:'APAVITAL SA Iași',         operatorEnerg:'DEER SA (E-ON Moldova)'},
    'municipiul-bacau':         {pretTeren: 450, pretConstructie:690, chirieRef:32, operatorApa:'Compania Regională Bacău', operatorEnerg:'DEER SA (E-ON Moldova)'},
    'municipiul-galati':        {pretTeren: 420, pretConstructie:680, chirieRef:30, operatorApa:'Apaserv Galați SA',        operatorEnerg:'DEER SA (E-ON Muntenia)'},
    'municipiul-craiova':       {pretTeren: 500, pretConstructie:700, chirieRef:35, operatorApa:'SC Salubritate 2000 SA',   operatorEnerg:'CEZ Distribuție SA'},
    'municipiul-suceava':       {pretTeren: 380, pretConstructie:680, chirieRef:28, operatorApa:'Acet SA Suceava',          operatorEnerg:'DEER SA (E-ON Moldova)'},
    // Tier 3 — Orașe medii
    'municipiul-botosani':      {pretTeren: 250, pretConstructie:660, chirieRef:20, operatorApa:'Nova Apaserv SA Botoșani',  operatorEnerg:'DEER SA (E-ON Moldova)'},
    'municipiul-vaslui':        {pretTeren: 220, pretConstructie:650, chirieRef:18, operatorApa:'Aquavas SA Vaslui',         operatorEnerg:'DEER SA (E-ON Moldova)'},
    'municipiul-piatra-neamt':  {pretTeren: 320, pretConstructie:670, chirieRef:24, operatorApa:'Util Serv SA Piatra-Neamț', operatorEnerg:'DEER SA (E-ON Moldova)'},
    'municipiul-roman':         {pretTeren: 280, pretConstructie:660, chirieRef:22, operatorApa:'Compania de Apă Roman SA',  operatorEnerg:'DEER SA (E-ON Moldova)'},
    'municipiul-focsani':       {pretTeren: 260, pretConstructie:655, chirieRef:20, operatorApa:'Compania de Apă Focșani',   operatorEnerg:'DEER SA'},
    'municipiul-barlad':        {pretTeren: 200, pretConstructie:645, chirieRef:16, operatorApa:'Aquavas SA Vaslui',         operatorEnerg:'DEER SA (E-ON Moldova)'},
    // Tier 4 — Orașe mici / comune
    'default':                  {pretTeren: 200, pretConstructie:640, chirieRef:15, operatorApa:'Operator local apă-canal',  operatorEnerg:'Operator local energie electrică'},
  };

  const cfg = PRET_UAT[uatId] || PRET_UAT['default'];

  return {
    ...cfg,
    // Date pentru text descriptiv
    sursa: 'Estimare piață imobiliară '+uat+' · Date UrbanX / Imobiliare.ro · 2024-2025',
    nota: 'Prețuri ORIENTATIVE ±30%. Piața imobiliară variază semnificativ pe microzone și perioadă.',
  };
};

// ══════════════════════════════════════════════════════════════════════════
// PATCH: PDF Safety — interceptează _initStudyPdf și wrappe tblRow/kv safe
// Oprește crash-urile jsPDF.rect cu Invalid arguments
// ══════════════════════════════════════════════════════════════════════════
(function _patchPdfSafety(){
  // Așteptăm până _initStudyPdf e disponibil
  function patchWhenReady(){
    if(typeof window._initStudyPdf !== 'function'){
      setTimeout(patchWhenReady, 500);
      return;
    }
    const _orig = window._initStudyPdf;
    window._initStudyPdf = function(...args){
      const result = _orig.apply(this, args);
      if(!result) return result;

      // Wrap tblRow safe
      const _origTbl = result.tblRow;
      if(typeof _origTbl === 'function'){
        result.tblRow = function(cells, cy, isHeader, widths, ...rest){
          // Guard: cells trebuie sa fie array
          if(!Array.isArray(cells)){
            console.warn('[UrbanX safety] tblRow primit non-array cells:', typeof cells, cells);
            cells = cells ? [String(cells)] : ['—'];
          }
          // Guard: cy trebuie sa fie numar finit
          const safeCy = (typeof cy === 'number' && isFinite(cy) && cy > 0) ? cy : 33;
          // Guard: widths trebuie sa fie array de numere pozitive
          if(Array.isArray(widths)){
            widths = widths.map(w => (typeof w === 'number' && w > 0) ? w : 20);
          }
          try{
            return _origTbl.call(this, cells, safeCy, isHeader, widths, ...rest);
          }catch(e){
            console.warn('[UrbanX safety] tblRow error:', e.message);
            return safeCy + 7;
          }
        };
      }

      // Wrap kv safe
      const _origKv = result.kv;
      if(typeof _origKv === 'function'){
        result.kv = function(rows, cy){
          const safeCy = (typeof cy === 'number' && isFinite(cy) && cy > 0) ? cy : 33;
          if(!Array.isArray(rows)) return safeCy + 7;
          try{
            const r = _origKv.call(this, rows, safeCy);
            return (typeof r === 'number' && isFinite(r)) ? r : safeCy + rows.length * 7;
          }catch(e){
            console.warn('[UrbanX safety] kv error:', e.message);
            return safeCy + rows.length * 7;
          }
        };
      }

      // Wrap sec/body/hdr/ftr safe
      ['sec','body','hdr','ftr'].forEach(fn => {
        const _origFn = result[fn];
        if(typeof _origFn === 'function'){
          result[fn] = function(...fnArgs){
            try{ return _origFn.apply(this, fnArgs); }
            catch(e){ console.warn('[UrbanX safety] '+fn+' error:', e.message); return fnArgs[1]||33; }
          };
        }
      });

      return result;
    };
    console.log('[UrbanX fixes-audit] PDF safety patch aplicat ✅');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>setTimeout(patchWhenReady, 800));
  } else {
    setTimeout(patchWhenReady, 800);
  }
})();
