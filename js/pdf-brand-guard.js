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

  // Logo UrbanX desenat VECTORIAL (cyan X pe patrat inchis rotunjit) — fara addImage,
  // ca sa se serializeze corect cand e adaugat pe pagina 1 prin setPage(1) la save.
  function vlogo(doc, x, y, s) {
    try {
      doc.setFillColor(11, 16, 24);
      doc.roundedRect(x, y, s, s, s * 0.22, s * 0.22, 'F');
      // glow discret
      doc.setDrawColor(22, 174, 203); doc.setLineWidth(s * 0.05);
      doc.roundedRect(x + s * 0.06, y + s * 0.06, s * 0.88, s * 0.88, s * 0.18, s * 0.18, 'S');
      // X cyan din doua bare
      doc.setDrawColor(125, 240, 251); doc.setLineWidth(s * 0.13); doc.setLineCap('round');
      doc.line(x + s * 0.30, y + s * 0.30, x + s * 0.70, y + s * 0.70);
      doc.line(x + s * 0.70, y + s * 0.30, x + s * 0.30, y + s * 0.70);
      try { doc.setLineCap('butt'); } catch (e) {}
    } catch (e) {}
  }

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

      // — LOGO pe coperta (pagina 1), colt dreapta-sus —
      // IMPORTANT: desenam VECTORIAL (rect + linii), NU addImage. La save, doc-ul are ca
      // pagina curenta ultima pagina; addImage adaugat pe pagina 1 prin setPage(1) NU se
      // serializeaza (XObject-ul de imagine e legat de pagina curenta la output), pe cand
      // operatiile vectoriale se scriu corect in stream-ul paginii 1 (la fel ca disclaimer-ul).
      // Florin: logo-ul vectorial (X cyan) în colțul dreapta-sus arăta ca un buton de „închide"
      // și dubla logo-ul propriu al coperții → ELIMINAT. Branding-ul rămâne pe coperta proprie a
      // documentului + disclaimer-ul de mai jos. (vlogo păstrat pt eventuale docuri fără copertă.)
      // (dezactivat intenționat — nu mai ștampilăm X-ul în colț)

      // — DISCLAIMER pe ULTIMA pagina (sau pagina noua daca nu incape) —
      try {
        doc.setPage(n);
        if (window._pdfDisclaimer) window._pdfDisclaimer(doc, { y: H - 26 });
      } catch (e) {}

      // revenim pe ultima pagina ca save-ul sa finalizeze corect
      try { doc.setPage(doc.getNumberOfPages()); } catch (e) {}
    } catch (e) {}
  }

  // jsPDF copiaza save()/output() ca proprietati pe INSTANTA (din API), NU pe prototip.
  // Deci patch-ul pe prototip e umbrit -> trebuie sa patch-uim fiecare instanta.
  function patchInstance(d) {
    try {
      if (!d || d.__brandInst) return; d.__brandInst = 1;
      ['save', 'output'].forEach(function (fn) {
        var orig = d[fn];
        if (typeof orig !== 'function') return;
        d[fn] = function () { try { stamp(this); } catch (e) {} return orig.apply(this, arguments); };
      });
    } catch (e) {}
  }

  // Invelim constructorul jsPDF: orice instanta noua isi primeste save/output patch-uite.
  function wrapCtor(ns, key) {
    try {
      var Orig = ns[key];
      if (typeof Orig !== 'function' || Orig.__brandCtor) return;
      function Wrapped(opts) {
        if (!(this instanceof Wrapped)) return new Wrapped(opts);
        var r = Orig.apply(this, arguments);
        var inst = (r && typeof r === 'object') ? r : this;
        patchInstance(inst);
        return inst;
      }
      Wrapped.prototype = Orig.prototype;
      try { Object.keys(Orig).forEach(function (k) { try { Wrapped[k] = Orig[k]; } catch (e) {} }); } catch (e) {}
      Wrapped.__brandCtor = 1;
      Wrapped.__orig = Orig;
      ns[key] = Wrapped;
    } catch (e) {}
  }

  function tryHook() {
    try { if (window.jspdf && window.jspdf.jsPDF) wrapCtor(window.jspdf, 'jsPDF'); } catch (e) {}
    try { if (window.jsPDF) wrapCtor(window, 'jsPDF'); } catch (e) {}
  }

  tryHook();
  // jsPDF poate fi incarcat mai tarziu -> reincercam o vreme
  var tries = 0;
  var iv = setInterval(function () { tries++; tryHook(); if (tries > 50) clearInterval(iv); }, 300);
})();
