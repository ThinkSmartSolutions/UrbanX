/* ============================================================================
 * UrbanX — strat global de navigare/UX (vanilla, additiv, zero-regresie).
 * Adresează lacunele reale din auditul UX (modulele sunt vanilla JS, nu React):
 *   1. ESCAPE închide modalul deschis (0/23 module aveau Escape) — declanșează
 *      închiderea proprie a modalului (backdrop-click) ca să ruleze și cleanup-ul.
 *   2. Cmd/Ctrl+K → deschide căutarea de parcelă.
 *   3. Cmd/Ctrl+. → închide tot (modale + meniuri).
 * Nu atinge logica modulelor; doar ascultă tastatura la nivel global.
 * ========================================================================== */
(function (G) {
  'use strict';
  var D = document;

  // overlay de modal = div copil al body, position:fixed, z-index mare, acoperă tot ecranul
  function topOverlay() {
    var kids = D.body ? D.body.children : [];
    var found = null, topZ = -1;
    for (var i = 0; i < kids.length; i++) {
      var el = kids[i]; if (el.tagName !== 'DIV') continue;
      var cs; try { cs = G.getComputedStyle(el); } catch (e) { continue; }
      if (cs.position !== 'fixed' || cs.display === 'none' || cs.visibility === 'hidden') continue;
      var z = parseInt(cs.zIndex || '0', 10) || 0; if (z < 8000) continue;
      var r = el.getBoundingClientRect();
      // full-screen overlay (nu meniu ancorat): acoperă >60% din viewport pe ambele axe
      if (r.width < G.innerWidth * 0.6 || r.height < G.innerHeight * 0.6) continue;
      if (z >= topZ) { topZ = z; found = el; }
    }
    return found;
  }
  function closeTopOverlay() {
    var ov = topOverlay(); if (!ov) return false;
    // 1) încearcă închiderea proprie (backdrop-click) → rulează cleanup-ul modulului
    try { ov.click(); } catch (e) {}
    // 2) fallback: dacă tot e în DOM, caută butonul de închidere (✕) sau elimină nodul
    if (ov.isConnected) {
      var x = null, btns = ov.querySelectorAll('button');
      for (var i = 0; i < btns.length; i++) { var t = (btns[i].textContent || '').trim(); if (t === '✕' || t === '×' || t === 'X') { x = btns[i]; break; } }
      if (x) { try { x.click(); } catch (e) {} }
      if (ov.isConnected) { try { ov.remove(); } catch (e) {} }
    }
    return true;
  }

  function openSearch() {
    // deschide tab-ul de căutare din panoul lateral + focus pe primul input
    try {
      var tab = D.querySelector('.ptab[data-t="search"]');
      if (tab) tab.click();
      var panel = D.getElementById('panel') || D;
      // focus pe primul input text/search vizibil
      var inputs = (panel.querySelectorAll ? panel : D).querySelectorAll('input[type="text"],input[type="search"],input:not([type])');
      for (var i = 0; i < inputs.length; i++) { var r = inputs[i].getBoundingClientRect(); if (r.width > 0 && r.height > 0) { inputs[i].focus(); return true; } }
      if (tab) return true;
    } catch (e) {}
    return false;
  }

  D.addEventListener('keydown', function (e) {
    // Cmd/Ctrl+K → paleta de comenzi (launcher unificat); fallback pe căutare
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      if (G.Launcher && G.Launcher.toggle) { G.Launcher.toggle(); e.preventDefault(); }
      else if (openSearch()) { e.preventDefault(); }
      return;
    }
    // Cmd/Ctrl+. → închide tot
    if ((e.metaKey || e.ctrlKey) && e.key === '.') {
      closeTopOverlay(); try { if (typeof G._closeAllMenusAndOverlay === 'function') G._closeAllMenusAndOverlay(); } catch (e2) {}
      e.preventDefault(); return;
    }
    // Escape → întâi modalul deschis, apoi meniurile
    if (e.key === 'Escape') {
      // dacă se editează un input/textarea, lasă comportamentul nativ (blur/clear)
      var ae = D.activeElement;
      if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) { return; }
      if (closeTopOverlay()) { e.preventDefault(); e.stopPropagation(); return; }
      try {
        var anyMenu = ['tci-adv-menu', 'rapoarte-menu', 'viz-menu', 'tools-menu'].some(function (id) { var m = D.getElementById(id); return m && m.style.display !== 'none'; });
        if (anyMenu && typeof G._closeAllMenusAndOverlay === 'function') { G._closeAllMenusAndOverlay(); e.preventDefault(); }
      } catch (e3) {}
    }
  }, false); // bubble phase — modulele cu Escape propriu rulează primele

  console.log('[UX-nav] strat global navigare încărcat (Esc închide modal · Cmd/Ctrl+K căutare)');
})(window);
