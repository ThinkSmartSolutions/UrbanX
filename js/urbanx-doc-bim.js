/* ============================================================================
 * UrbanX — PUNTE MODEL DOCUMENTAȚIE → BIM/IFC/GLB
 * Modelul funcțional (D: teren, Sc/Sd, niveluri, retrageri, funcțiune, spații)
 * este transpus în structura window._RV (parcelParams + building), compatibilă cu
 * exportatoarele existente, dovedite:
 *   • window._rvExportIFCStructural()  (js/31-ifc-bim-structural.js — IFC 2x3 ISO 16739)
 *   • window._rvExportGLBSemantic()    (js/32-glb-semantic-export.js — glTF/GLB)
 * Reutilizează logica _rvCompBuilding (replicată identic din 15-relevee.js), NU
 * reimplementează motorul IFC. Astfel modelul de documentație produce BIM real.
 * window.UXDocBIM.exportIFC(D) / exportGLB(D) / buildRV(D)
 * ========================================================================== */
(function (G) {
  'use strict';

  // Construiește parcelParams (P) din modelul de documentație D
  function _paramsFromDoc(D) {
    D = D || {};
    var area = +D.Steren || 0;
    var sc = +D.Sc || 0, sd = +D.Sd || 0;
    var niv = Math.max(1, +D.niv_supraterane || Math.max(1, Math.round(sd && sc ? sd / sc : 1)));
    var pot = area ? Math.min(0.95, sc / area) : 0.4;
    var cut = area ? sd / area : (sc ? niv * sc / Math.max(area, sc * 1.4) : 1.2);
    // dimensiuni parcelă: dacă avem front real, îl folosim; altfel pătrat echivalent
    var W = +D.front_teren || +D.latime_teren || 0;
    var Dp = 0;
    if (W > 0 && area > 0) Dp = area / W; else { W = Math.sqrt(Math.max(area, 400)); Dp = W; }
    var fnLbl = '';
    try { fnLbl = (G.UXDoc && G.UXDoc.FUNCTIUNI && G.UXDoc.FUNCTIUNI[D.functiune] ? G.UXDoc.FUNCTIUNI[D.functiune].label : '') || D.functiune || ''; } catch (e) { fnLbl = D.functiune || ''; }
    return {
      W: W, D: Dp, area: area || W * Dp,
      rl: +D.retragere_lateral || 3, rf: +D.retragere_fata || 5, rs: +D.retragere_spate || 5,
      fn: fnLbl, pot: pot || 0.4, cut: cut || 1.2, niv: niv, hn: 3.0
    };
  }

  // Replică EXACTĂ a _rvCompBuilding (15-relevee.js) — sursa de adevăr a exportatoarelor
  function _compBuilding(P) {
    var effW = P.W, effD = P.D;
    if (P.area < 100) { effW = Math.max(P.W, Math.sqrt(P.area * 0.8)); effD = Math.max(P.D, P.area / effW); }
    var _fnRez = !String(P.fn || '').toLowerCase().includes('birouri') && !String(P.fn || '').toLowerCase().includes('hotel');
    var bW = _fnRez ? Math.min(80, Math.max(6, effW - P.rl * 2)) : Math.max(6, effW - P.rl * 2);
    var bD_raw = Math.max(6, effD - P.rf - P.rs);
    var bD = _fnRez ? Math.min(26, bD_raw) : bD_raw;
    var scArea = Math.min(bW * bD, Math.max(P.area * P.pot, 36));
    var sdaTarget = P.area * P.cut;
    var niv = Math.min(P.niv, Math.max(1, Math.round(sdaTarget / scArea)));
    var sdaTotal = scArea * niv;
    var nStairs = Math.max(1, Math.min(_fnRez ? 4 : 8, Math.floor(bW / 18.0)));
    var stairW = 3.6, stairD = Math.min(6.6, bD * 0.5), colSp = bW / nStairs;
    var cores = [];
    for (var i = 0; i < nStairs; i++) cores.push({ x: colSp * (i + 0.5) - stairW / 2, y: (bD - stairD) / 2, w: stairW, h: stairD });
    return { P: P, bW: bW, bD: bD, niv: niv, scArea: scArea, sdaTotal: sdaTotal, sdaPerFloor: scArea, cores: cores, parcelArea: P.area };
  }

  // Populează window._RV din modelul de documentație
  function buildRV(D) {
    var P = _paramsFromDoc(D);
    var b = _compBuilding(P);
    if (!G._RV) G._RV = {};
    G._RV.parcelParams = P;
    G._RV.building = b;
    G._RV.floors = [];           // exportatorul IFC regenerează/înlocuiește la nevoie
    G._RV.curFloor = 0;
    return { P: P, building: b };
  }

  function _ss(m) { if (typeof G.ss === 'function') G.ss(m); }

  function exportIFC(D) {
    if (typeof G._rvExportIFCStructural !== 'function') { _ss('Exportul IFC (modul relevee/AEDIS) nu e încărcat. Deschideți Urban3D o dată în sesiune.'); return false; }
    buildRV(D);
    _ss('⏳ Generez modelul BIM (IFC 2x3) din modelul de documentație…');
    try { G._rvExportIFCStructural(); return true; } catch (e) { _ss('Eroare la exportul IFC: ' + (e && e.message || e)); return false; }
  }
  function exportGLB(D) {
    if (typeof G._rvExportGLBSemantic !== 'function') { _ss('Exportul GLB (modul 3D) nu e încărcat. Deschideți Urban3D o dată în sesiune.'); return false; }
    buildRV(D);
    _ss('⏳ Generez modelul BIM (GLB/glTF)…');
    try { G._rvExportGLBSemantic(); return true; } catch (e) { _ss('Eroare la exportul GLB: ' + (e && e.message || e)); return false; }
  }

  G.UXDocBIM = { paramsFromDoc: _paramsFromDoc, compBuilding: _compBuilding, buildRV: buildRV, exportIFC: exportIFC, exportGLB: exportGLB };
})(window);
