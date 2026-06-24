/* ============================================================================
 * UrbanX — urbanx-logo.js — logo-ul REAL UrbanX (favicon-96x96.png) pentru PDF-uri.
 * Incarca logo-ul ca dataURL la pornire si expune _drawUrbanxLogo(pdf,x,y,size)
 * pentru a-l desena in coperti + antete (inlocuieste placeholder-ele text "UX").
 * ========================================================================== */
(function (G) {
  'use strict';
  G._urbanxLogoDataURL = null;
  function _load(src) {
    try {
      var img = new Image(); img.crossOrigin = 'anonymous';
      img.onload = function () {
        try {
          var n = img.naturalWidth || 96, c = document.createElement('canvas');
          c.width = n; c.height = img.naturalHeight || n;
          c.getContext('2d').drawImage(img, 0, 0);
          G._urbanxLogoDataURL = c.toDataURL('image/png');
        } catch (e) {}
      };
      img.onerror = function () { if (src.indexOf('/UrbanX/') < 0) _load('/UrbanX/favicon-96x96.png'); };
      img.src = src;
    } catch (e) {}
  }
  _load('favicon-96x96.png');

  // deseneaza logo-ul real; daca nu e gata, fallback la un patrat cu "X" (ca sa nu cada PDF-ul)
  G._drawUrbanxLogo = function (pdf, x, y, size, fallbackBg, fallbackFg) {
    try {
      if (G._urbanxLogoDataURL) { pdf.addImage(G._urbanxLogoDataURL, 'PNG', x, y, size, size); return true; }
    } catch (e) {}
    try {
      var bg = fallbackBg || [12, 18, 32], fg = fallbackFg || [56, 189, 248];
      pdf.setFillColor(bg[0], bg[1], bg[2]); pdf.roundedRect(x, y, size, size, size * 0.18, size * 0.18, 'F');
      pdf.setTextColor(fg[0], fg[1], fg[2]); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(size * 0.62);
      pdf.text('X', x + size / 2, y + size * 0.68, { align: 'center' });
    } catch (e) {}
    return false;
  };
})(window);
