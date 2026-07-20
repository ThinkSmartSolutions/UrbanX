/* ============================================================================
 * UrbanX — GARDĂ DOWNLOAD CONT DEMO (js/ux-demo-download-gate.js)
 * Conturile demo (14 zile, token-based — vezi js/urbanx-demo-system.js,
 * window._DEMO_MODE setat în UrbanXDemo.checkAndBoot()) NU pot descărca
 * niciun studiu sau raport (teritorial sau de parcelă) — doar previzualizare
 * în aplicație. Cerință explicită Florin (20 iul 2026).
 *
 * Belt-and-suspenders pe 3 chokepoint-uri comune tuturor generatoarelor
 * (~76 apeluri pdf.save + toate exporturile Word + dosarele DOCX/ZIP),
 * în loc de a modifica fiecare din cele ~50 fișiere generatoare individual —
 * același principiu ca js/ux-domain-gate.js.
 * ========================================================================== */
(function (G) {
  'use strict';

  function isDemoBlocked() { return !!G._DEMO_MODE; }

  function warn() {
    if (G.ss) G.ss('🔒 Cont demo — previzualizare doar în aplicație, fără descărcare de studii/rapoarte.');
  }

  // 1) jsPDF.save — acoperă toate studiile/rapoartele PDF (teritoriale + parcelă)
  function patchJsPDF() {
    var ns = G.jspdf;
    if (!ns || !ns.jsPDF || !ns.jsPDF.prototype || ns.jsPDF.prototype.__demoGatePatched) return false;
    var orig = ns.jsPDF.prototype.save;
    ns.jsPDF.prototype.save = function () {
      if (isDemoBlocked()) { warn(); return this; }
      return orig.apply(this, arguments);
    };
    ns.jsPDF.prototype.__demoGatePatched = true;
    return true;
  }

  // 2) _saveWordDoc — acoperă exporturile .doc ale studiilor
  function patchSaveWordDoc() {
    if (typeof G._saveWordDoc !== 'function' || G._saveWordDoc.__demoGatePatched) return false;
    var orig = G._saveWordDoc;
    var wrapped = function (htmlBody, filename) {
      if (isDemoBlocked()) { warn(); return; }
      return orig(htmlBody, filename);
    };
    wrapped.__demoGatePatched = true;
    G._saveWordDoc = wrapped;
    return true;
  }

  // 3) UXDocBuilder.genereazaDosar — acoperă dosarele DOCX/ZIP (DTAC/PTh)
  function patchDocBuilder() {
    if (!G.UXDocBuilder || typeof G.UXDocBuilder.genereazaDosar !== 'function' || G.UXDocBuilder.__demoGatePatched) return false;
    var orig = G.UXDocBuilder.genereazaDosar;
    G.UXDocBuilder.genereazaDosar = function () {
      if (isDemoBlocked()) { warn(); return Promise.resolve(); }
      return orig.apply(this, arguments);
    };
    G.UXDocBuilder.__demoGatePatched = true;
    return true;
  }

  // Globalele se încarcă asincron (ordine de script-uri) — reîncearcă până se prind toate.
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    var r1 = patchJsPDF(), r2 = patchSaveWordDoc(), r3 = patchDocBuilder();
    if (tries > 120 || (r1 && r2 && r3)) clearInterval(iv);
  }, 250);

  console.log('[UX Demo Download Gate] activ — blochează exportul PDF/Word pentru conturi demo (14 zile)');
})(window);
