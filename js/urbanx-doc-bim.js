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

  // niv label pt indexul de nivel fi (0=parter, 1..=etaje, subsol separat)
  function _nivLabel(fi) { return fi === 0 ? 'P' : String(fi); }

  // Construiește floors (rects/doors/wins) din planul cu coridor (UXPlanSVG.layout),
  // astfel încât exportatorul IFC să genereze pereți + spații + uși + ferestre REALE
  // (nu doar lespedea de massă). Aliniază anvelopa clădirii la geometria planului.
  function _floorsFromLayout(D, b) {
    if (!G.UXPlanSVG || !G.UXPlanSVG.layout || !D._spatii || !D._spatii.length) return { floors: [], W: b.bW, Db: b.bD };
    var lay = G.UXPlanSVG.layout(D._spatii);
    var maxW = 0, maxD = 0;
    Object.keys(lay).forEach(function (k) { if (lay[k].w > maxW) maxW = lay[k].w; if (lay[k].h > maxD) maxD = lay[k].h; });
    var niv = Math.max(1, +D.niv_supraterane || 1);
    var floors = [];
    for (var fi = 0; fi < niv; fi++) {
      var d = lay[_nivLabel(fi)] || lay['P'];
      if (!d) { floors.push({ rects: [], doors: [], wins: [] }); continue; }
      var rects = [], doors = [], wins = [];
      // nucleu (pereți portanți)
      rects.push({ x: d.core.x, y: d.core.y, w: d.core.w, h: d.core.h, t: 'core', lbl: 'Scara / lift', apt: -1, solarOk: true });
      d.rects.forEach(function (rc) {
        rects.push({ x: rc.x, y: rc.y, w: rc.w, h: rc.h, t: 'room', lbl: (rc.room.nume || '').slice(0, 60), apt: -1, solarOk: rc.band === 'N' });
        // ușă spre coridor
        var doorY = (rc.band === 'N') ? (rc.y + rc.h) : rc.y;
        doors.push({ x: rc.x + rc.w / 2 - 0.45, y: doorY, w: 0.9, type: 'int' });
        // fereastră pe fațadă (camerele cu iluminat)
        var cat = rc.room.cat || '';
        if (!/Sanitare|Tehnic|Depozit|Circula/.test(cat) && rc.w > 2.0) {
          wins.push({ x: rc.x + rc.w / 2 - 0.9, y: 0, w: 1.8, wall: (rc.band === 'N') ? 'N' : 'S' });
        }
      });
      // ușă de acces principal (parter) — pe fațada de capăt, în dreptul coridorului
      if (fi === 0) doors.push({ x: d.coreW + 0.1, y: d.Db, w: 1.6, type: 'main' });
      floors.push({ rects: rects, doors: doors, wins: wins, W: d.w, D: d.h });
    }
    return { floors: floors, W: maxW || b.bW, D: maxD || b.bD };
  }

  // Populează window._RV din modelul de documentație
  function buildRV(D) {
    var P = _paramsFromDoc(D);
    var b = _compBuilding(P);
    var fl = _floorsFromLayout(D, b);
    if (fl.floors.length) { b.bW = fl.W; b.bD = fl.D; b.niv = fl.floors.length; b.scArea = fl.W * fl.D; b.sdaTotal = b.scArea * b.niv; b.sdaPerFloor = b.scArea; }
    if (!G._RV) G._RV = {};
    G._RV.parcelParams = P;
    G._RV.building = b;
    G._RV.floors = fl.floors;    // pereți/spații/uși/ferestre REALE per nivel
    G._RV.curFloor = 0;
    return { P: P, building: b, floors: fl.floors.length };
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
