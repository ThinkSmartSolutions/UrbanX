/* ============================================================================
 * UrbanX — pdf-brand-guard.js
 * GARDA GLOBALA: garanteaza ca ORICE PDF generat (jsPDF) are logo pe coperta
 * (colt dreapta-sus) + disclaimer la final. Florin: obligatoriu in TOATE PDF-urile,
 * inclusiv toate rapoartele din meniul Rapoarte.
 *
 * Mecanism neinvaziv: invelim save()/output() pe prototipul jsPDF si, o singura data
 * per document, stampilam logo + disclaimer. Documentele strategice (SIDU/MP/PMUD)
 * isi gestioneaza singure branding-ul (au pdf.__doc) -> le sarim, ca sa nu dublam.
 * Se incarca DUPA urbanx-logo.js + 07-pdf-utils.js (foloseste _pdfStampLogo/_pdfDisclaimer).
 * ========================================================================== */
(function () {
  'use strict';

  function stamp(doc) {
    try {
      if (!doc || doc.__brandStamped) return;
      // documentele strategice au branding propriu (logo coperta + disclaimer) -> nu dubla
      if (doc.__doc) { doc.__brandStamped = 1; return; }
      if (typeof doc.getNumberOfPages !== 'function') return;
      var n = doc.getNumberOfPages();
      if (!n || n < 1) return;
      doc.__brandStamped = 1;

      var W = doc.internal.pageSize.getWidth();
      var H = doc.internal.pageSize.getHeight();

      // — LOGO pe coperta (pagina 1), colt dreapta-sus, mic si discret —
      try {
        doc.setPage(1);
        if (window._pdfStampLogo) window._pdfStampLogo(doc, W - 20, 6, 12);
      } catch (e) {}

      // — DISCLAIMER pe ULTIMA pagina (sau pagina noua daca nu incape) —
      try {
        doc.setPage(n);
        if (window._pdfDisclaimer) window._pdfDisclaimer(doc, { y: H - 26 });
      } catch (e) {}

      // revenim pe ultima pagina ca save-ul sa finalizeze corect
      try { doc.setPage(doc.getNumberOfPages()); } catch (e) {}
    } catch (e) {}
  }

  function hookProto(P) {
    if (!P || P.__brandHook) return;
    P.__brandHook = 1;
    ['save', 'output'].forEach(function (fn) {
      var orig = P[fn];
      if (typeof orig !== 'function') return;
      P[fn] = function () {
        try { stamp(this); } catch (e) {}
        return orig.apply(this, arguments);
      };
    });
  }

  function tryHook() {
    try { if (window.jspdf && window.jspdf.jsPDF) hookProto(window.jspdf.jsPDF.prototype); } catch (e) {}
    try { if (window.jsPDF) hookProto(window.jsPDF.prototype); } catch (e) {}
    try { if (typeof jsPDF !== 'undefined') hookProto(jsPDF.prototype); } catch (e) {}
  }

  tryHook();
  // jsPDF poate fi incarcat mai tarziu -> reincercam o vreme
  var tries = 0;
  var iv = setInterval(function () { tries++; tryHook(); if (tries > 50) clearInterval(iv); }, 300);
})();
