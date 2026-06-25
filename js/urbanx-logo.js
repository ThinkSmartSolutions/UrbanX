/* ============================================================================
 * UrbanX — urbanx-logo.js — logo-ul REAL UrbanX (favicon-96x96.png) pentru PDF-uri.
 * Incarca logo-ul ca dataURL la pornire si expune _drawUrbanxLogo(pdf,x,y,size)
 * pentru a-l desena in coperti + antete (inlocuieste placeholder-ele text "UX").
 * ========================================================================== */
(function (G) {
  'use strict';
  G._urbanxLogoDataURL = null;
  function _load(src, fallbacks) {
    try {
      var img = new Image(); img.crossOrigin = 'anonymous';
      img.onload = function () {
        try {
          // rasterizam la 256x256 (crisp pt PDF) — sursa poate fi SVG (logo cyan) sau PNG
          var T = 256, c = document.createElement('canvas');
          c.width = T; c.height = T;
          c.getContext('2d').drawImage(img, 0, 0, T, T);
          G._urbanxLogoDataURL = c.toDataURL('image/png');
        } catch (e) {}
      };
      img.onerror = function () { if (fallbacks && fallbacks.length) _load(fallbacks.shift(), fallbacks); };
      img.src = src;
    } catch (e) {}
  }
  // Logo CYAN UrbanX (urbanx-logo.svg) — cu fallback la favicon-urile vechi daca lipseste
  _load('urbanx-logo.svg', ['/UrbanX/urbanx-logo.svg', 'favicon-96x96.png', '/UrbanX/favicon-96x96.png']);

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
