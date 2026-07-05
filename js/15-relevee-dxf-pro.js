/* ============================================================================
 * UrbanX — EXPORT DXF PRO (js/15-relevee-dxf-pro.js)
 * Propagă standardul motorului comun UX_DRAW în modulul Planșe (relevee):
 * ia logica REALĂ de camere din _RV.floors și produce planșe la calitatea nouă
 * (DXF AutoCAD 2010 / AC1024, layere SR EN ISO, hașuri material, adnotări cu
 * finisaje, cartuș ISO 7200 + parametrii tehnici derivați) + secțiune/fațadă
 * parametrice, cu PREVIEW SVG pe ecran. Additiv — nu atinge exportul DXF vechi.
 * ========================================================================== */
(function () {
  'use strict';
  function ready(cb, n) { n = n || 0; if (n > 100) return; if (typeof _RV === 'undefined' || !window.UX_DRAW || !window.UXPlanseUI) { setTimeout(function () { ready(cb, n + 1); }, 300); return; } cb(); }
  ready(function () {
    var iv = setInterval(function () { if (document.getElementById('rv-dxfpro-btn')) { clearInterval(iv); return; } inject(); }, 800);
    setTimeout(function () { clearInterval(iv); inject(); }, 2500);
    try { console.log('[DXF PRO] loaded — export planșe relevee prin motorul comun UX_DRAW'); } catch (e) {}
  });

  function inject() {
    if (document.getElementById('rv-dxfpro-btn')) return;
    var anchor = document.getElementById('rv-dxf-btn') || document.querySelector('#rv-planseA3-btn') || document.querySelector('.rv-expbtn');
    if (!anchor) return;
    var btn = document.createElement('button');
    btn.id = 'rv-dxfpro-btn';
    btn.innerHTML = '📐 DXF Pro (AC1024)';
    btn.title = 'Planșe la calitate proiectant — camere reale + layere SR EN ISO + hașuri material + parametri tehnici · preview pe ecran';
    btn.style.cssText = ['height:32px', 'padding:0 12px', 'border-radius:7px', 'cursor:pointer', 'border:1px solid rgba(125,211,252,.5)', 'background:rgba(125,211,252,.16)', 'color:#7dd3fc', 'font-size:12px', 'font-weight:700'].join(';');
    btn.onclick = run;
    anchor.parentNode.insertBefore(btn, anchor.nextSibling);
  }

  function run() {
    var P = (typeof _RV !== 'undefined') && _RV.parcelParams, b = (typeof _RV !== 'undefined') && _RV.building;
    if (!P || !b) { alert('Generați releveele mai întâi.'); return; }
    var floors = _RV.floors || [];
    var UX = window.UX_DRAW;
    // parametrii tehnici derivați (aceeași calitate ca documentele)
    var ac = {}; try { ac = UX.derivedParamsFor(Object.assign({ scArea: b.scArea }, P)); } catch (e) {}
    var meta = { bW: b.bW, bD: b.bD, rl: P.rl, rf: P.rf, W: P.W, D: P.D, nrCad: P.nrCad, utr: P.utr,
      params: ac, proiect: (P.fn || 'Obiectiv') + ' · nr.cad ' + P.nrCad, beneficiar: '',
      data: (function () { try { return new Date().toLocaleDateString('ro-RO'); } catch (e) { return ''; } })(), faza: 'DTAC' };
    var sheets = [];
    // Plan parter (camere reale)
    if (floors[0] && floors[0].rects) sheets.push({ key: 'parter', label: 'Plan parter (camere reale)', plansa: 'A-01', doc: UX.planFromReleveeFloor(floors[0].rects, Object.assign({}, meta, { floorLabel: 'parter', plansa: 'A-01' })) });
    // Plan etaj tip (dacă există etaj distinct)
    if (floors[1] && floors[1].rects) sheets.push({ key: 'etaj', label: 'Plan etaj tip (camere reale)', plansa: 'A-02', doc: UX.planFromReleveeFloor(floors[1].rects, Object.assign({}, meta, { floorLabel: 'etaj tip', plansa: 'A-02' })) });
    // Fațadă + secțiune parametrice (din regimul de înălțime real)
    var niv = Math.max(1, b.niv || 1), hn = P.hn || 3.0;
    var fopt = { width: b.bW, adancime: b.bD, niv: niv, hParter: hn, hEtaj: hn, roof: niv > 2 ? 'terasa' : 'sarpanta',
      winPerFloor: Math.max(2, Math.round(b.bW / 3)), params: ac, adancimeFundatie: (ac && ac.adancime_inghet_m) || 1.0,
      proiect: meta.proiect, beneficiar: '', data: meta.data, faza: 'DTAC' };
    sheets.push({ key: 'fatada', label: 'Fațadă principală', plansa: 'A-05', doc: UX.facadeDoc(Object.assign({}, fopt, { plansa: 'A-05', orient: 'principală' })) });
    sheets.push({ key: 'sectiune', label: 'Secțiune transversală', plansa: 'A-07', doc: UX.sectionDoc(Object.assign({}, fopt, { plansa: 'A-07' })) });
    window.UXPlanseUI.preview(sheets, { title: 'Planșe DXF Pro — ' + (P.nrCad || ''), nrcad: P.nrCad });
  }
})();
