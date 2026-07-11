/* ============================================================================
 * UrbanX — GARDĂ PE DOMENIU (js/ux-domain-gate.js)
 * Pe deploy-ul M2M (m2msolutionstech.github.io), restrânge accesul DOAR la
 * Cinematic (film) și Masterplan — cerință explicită Florin (11 iul 2026).
 * NU afectează deloc ThinkSmartSolutions/UrbanX sau rularea locală (no-op).
 * Test local: adaugă ?m2mgate=1 în URL pentru a simula garda fără să schimbi domeniul.
 *
 * Blocaj pe 3 niveluri (belt-and-suspenders, ca invocarea directă — Cmd/K,
 * cod extern — să nu ocolească filtrarea vizuală a sertarului):
 *  1) UXRoles.canSee — filtrează ce se RANDEAZĂ în sertarul de navigare (NAV) + Rapoarte
 *  2) UXSidebar.openModule — blochează DISPATCH-ul direct al oricărui modul nepermis
 *  3) UXDoc.openPanel — neutralizează explicit Generatorul de documentații tehnice
 *     (nu are moduleId în NAV, deci canSee/openModule nu-l ating)
 * + ascunde butoanele statice „Generator Documentații Tehnice" din HTML.
 * ========================================================================== */
(function (G) {
  'use strict';
  var M2M_HOST = 'm2msolutionstech.github.io';
  function isGateActive() {
    try {
      if (location.search.indexOf('m2mgate=1') !== -1) return true;
      return location.hostname === M2M_HOST;
    } catch (e) { return false; }
  }
  if (!isGateActive()) return; // no-op pe ThinkSmart / local / orice alt domeniu

  // Module lăsate accesibile: STRICT Cinematic (film + panou clasic) + Masterplan — nimic altceva
  // (inclusiv „Hartă" e scos, ca să dispară complet grupul „Teritoriu & hărți" din sertar).
  var ALLOWED = { film: 1, tciClasic: 1, masterplan: 1 };

  function patchRoles() {
    if (!G.UXRoles || G.UXRoles.__m2mGatePatched) return false;
    var orig = G.UXRoles.canSee;
    G.UXRoles.canSee = function (moduleId) {
      if (ALLOWED[moduleId]) return orig ? orig.call(G.UXRoles, moduleId) : true;
      return false;
    };
    G.UXRoles.__m2mGatePatched = true;
    return true;
  }

  function patchOpenModule() {
    if (!G.UXSidebar || G.UXSidebar.__m2mGatePatched) return false;
    var orig = G.UXSidebar.openModule;
    G.UXSidebar.openModule = function (id) {
      if (id !== '_search' && !ALLOWED[id]) {
        if (G.ss) G.ss('Modul indisponibil în această versiune de previzualizare.');
        return;
      }
      return orig(id);
    };
    G.openModule = G.UXSidebar.openModule;
    G.UXSidebar.__m2mGatePatched = true;
    return true;
  }

  function patchUXDoc() {
    if (!G.UXDoc || typeof G.UXDoc.openPanel !== 'function' || G.UXDoc.__m2mGatePatched) return false;
    G.UXDoc.openPanel = function () {
      if (G.ss) G.ss('Generatorul de documentații tehnice nu este disponibil în această versiune de previzualizare.');
    };
    G.UXDoc.__m2mGatePatched = true;
    return true;
  }

  function hideStaticButtons() {
    try {
      var els = document.querySelectorAll('[onclick*="UXDoc"], .ux-doc-gen-btn');
      for (var i = 0; i < els.length; i++) els[i].style.display = 'none';
    } catch (e) {}
  }

  // Modulele se încarcă asincron (ordine de script-uri) — reîncearcă pe scurt până se prind toate, apoi oprește.
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    var r1 = patchRoles(), r2 = patchOpenModule(); patchUXDoc(); hideStaticButtons();
    if (tries > 80 || (r1 && r2 && G.UXDoc && G.UXDoc.__m2mGatePatched)) clearInterval(iv);
  }, 250);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hideStaticButtons);
  else hideStaticButtons();

  console.log('[UX Domain Gate] mod previzualizare M2M activ — acces limitat la Cinematic + Masterplan');
})(window);
