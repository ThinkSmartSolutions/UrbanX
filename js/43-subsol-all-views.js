// ═══════════════════════════════════════════════════════════════════════════
// 43-subsol-all-views.js — Subsol vizibil în TOATE planurile
// UrbanX TSS·FG | v1.0 | 10 Iunie 2026
//
// Rezolvă:
//   1. Tab "🅿 Subsol" forțat vizibil când există subsol
//   2. S-1 în _RV.floors (pentru tur virtual + 3D)
//   3. Dollhouse 3D: nivel S-1 sub clădire cu parcaj, rampă, ALA
//   4. 3D Floor Plan: etaj S-1 cu locuri parcare colorate
//   5. Secțiune A-A: overlay canvas cu S-1 sub ±0.00
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  function _hasSubsol() {
    var A = window.AEDIS || {};
    var b = window._RV && window._RV.building;
    return !!(
      A.subsolActiv ||
      (A.subsolNiv && A.subsolNiv > 0) ||
      (b && b.subsolNiv > 0) ||
      (b && b.bW && b.bD && b.bW * b.bD > 180)
    );
  }

  function _subsolNiv() {
    var A = window.AEDIS || {};
    var b = window._RV && window._RV.building;
    return parseInt(A.subsolNiv || (b && b.subsolNiv) || 1);
  }

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (typeof _rvRender !== 'undefined') { cb(); return; }
    setTimeout(function () { waitReady(cb, n + 1); }, 250);
  }

  waitReady(function () {
    _patch1_SubsolTab();
    _patch2_RVFloors();
    _patch3_Dollhouse();
    _patch4_FloorPlan();
    _patch5_Section();
    console.log('[Subsol] ✅ 43-subsol-all-views activ');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 1. TAB SUBSOL — forțat vizibil
  // ═══════════════════════════════════════════════════════════════════════
  function _patch1_SubsolTab() {
    function _show() {
      if (!_hasSubsol()) return;
      var tab = document.getElementById('rv-tab-subsol');
      if (!tab) return;
      tab.style.display = '';
      tab.style.background = 'rgba(245,158,11,.18)';
      tab.style.color = '#F59E0B';
      tab.style.borderColor = 'rgba(245,158,11,.4)';
      var b = window._RV && window._RV.building;
      if (b && !b.subsolNiv) b.subsolNiv = _subsolNiv();
    }

    _show();
    // Re-check după fiecare render (tab-urile se pot reinjecta)
    var origRvRender = window._rvRender;
    if (origRvRender && !origRvRender._subsolTabPatched) {
      origRvRender._subsolTabPatched = true;
      window._rvRender = function () {
        var r = origRvRender.apply(this, arguments);
        setTimeout(_show, 120);
        return r;
      };
    }
    // MutationObserver pt tab dinamic
    var obs = new MutationObserver(_show);
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { obs.disconnect(); }, 60000);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 2. _RV.FLOORS — adăugăm S-1 cu layout parcaj complet
  // ═══════════════════════════════════════════════════════════════════════
  function _patch2_RVFloors() {
    function _addS1() {
      if (!_hasSubsol()) return;
      var RV = window._RV;
      if (!RV || !RV.floors) return;
      if (RV.floors.some(function (f) { return f.floorIdx === -1; })) return;
      var b  = RV.building || {};
      var bW = b.bW || 18, bD = b.bD || 14;
      RV.floors.unshift(_genS1Floor(bW, bD));
      if (b && !b.subsolNiv) b.subsolNiv = 1;
      console.log('[Subsol] S-1 adăugat în _RV.floors');
    }

    // Hook pe generateRelevee, VTour.start, VTourFP.startFP
    ['generateRelevee'].forEach(function (name) {
      var orig = window[name];
      if (orig && !orig._s1patched) {
        orig._s1patched = true;
        window[name] = function () {
          _addS1();
          // Asigurăm _rvAllowOpen=true pt apeluri programatice
          var had = window._rvAllowOpen;
          if (!had) window._rvAllowOpen = true;
          var res = orig.apply(this, arguments);
          if (!had) setTimeout(function(){ window._rvAllowOpen = false; }, 500);
          return res;
        };
      }
    });

    var _hookObj = function (obj, method) {
      if (!obj || !obj[method] || obj[method]._s1patched) return;
      obj[method]._s1patched = true;
      var orig = obj[method];
      obj[method] = function () { _addS1(); return orig.apply(this, arguments); };
    };

    var _tryHook = function () {
      _hookObj(window.VTour, 'start');
      _hookObj(window.VTourFP, 'startFP');
    };
    _tryHook();
    var obsHook = new MutationObserver(_tryHook);
    obsHook.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { obsHook.disconnect(); }, 30000);
  }

  function _genS1Floor(bW, bD) {
    var rects = [];
    var EW = 0.35;

    // Rampă acces (stânga, exterior)
    rects.push({
      t: 'hall', x: -4.5, y: bD * 0.25, w: 4.5, h: 3.6,
      apt: -1, lbl: 'Rampă S-1', bal: false,
      doors: [{ side: 'e', pos: 3.6 * 0.5, w: 3.5 }]
    });

    // Adăpost ALA (colț dreapta-spate)
    var alaW = Math.min(bW * 0.25, 6.0);
    var alaH = Math.min(bD * 0.22, 5.5);
    rects.push({
      t: 'storage', x: bW - alaW - EW, y: EW, w: alaW, h: alaH,
      apt: -1, lbl: 'Adăpost ALA', bal: false,
      doors: [{ side: 's', pos: alaW * 0.5, w: 0.9 }]
    });

    // Cameră tehnică (colț stânga-spate)
    var tehW = Math.min(bW * 0.15, 4.0);
    var tehH = Math.min(bD * 0.20, 5.0);
    rects.push({
      t: 'storage', x: EW, y: EW, w: tehW, h: tehH,
      apt: -1, lbl: 'Tehnic', bal: false,
      doors: [{ side: 's', pos: tehW * 0.5, w: 0.9 }]
    });

    // Parcaj (suprafața rămasă)
    var pkX = tehW + EW * 2;
    var pkW = bW - tehW - alaW - EW * 4;
    rects.push({
      t: 'parking', x: pkX, y: EW, w: pkW, h: bD - EW * 2,
      apt: -1, lbl: 'Parcaj S-1', bal: false, doors: []
    });

    return {
      floorIdx: -1, label: 'S-1', isSubsol: true,
      rects: rects,
      doors: [{ x: 0, y: bD * 0.3, w: 3.5, type: 'main', swing: 'out', axis: 'V' }],
      wins: []
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 3. DOLLHOUSE 3D — nivel S-1 sub clădire
  // ═══════════════════════════════════════════════════════════════════════
  function _patch3_Dollhouse() {
    var _hook = function () {
      var vt = window.VTour;
      if (!vt || !vt.start || vt.start._s1dh) return false;
      vt.start._s1dh = true;
      var orig = vt.start;
      vt.start = function () {
        var r = orig.apply(this, arguments);
        setTimeout(_buildDollhouseSubsol, 1400);
        return r;
      };
      return true;
    };
    if (!_hook()) {
      var obs = new MutationObserver(function () { if (_hook()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  function _buildDollhouseSubsol() {
    if (!_hasSubsol()) return;
    var state = window.VTour && window.VTour._state;
    if (!state || !state.scene || state._s1dhBuilt) return;
    state._s1dhBuilt = true;

    var THREE  = window.THREE;
    var anchor = state._anchor;
    if (!THREE || !anchor) return;

    var bW = anchor.bW, bD = anchor.bD;
    var hS = 3.0; // înălțime subsol
    var baseY = anchor.baseY - hS;
    var g = new THREE.Group();
    g.name = 'Subsol_S1';

    // Material beton armat
    var matBA = new THREE.MeshStandardMaterial({
      color: 0x374151, roughness: 0.9, metalness: 0.05,
      transparent: true, opacity: 0.88
    });

    // Pereți exteriori 30cm
    var wT = 0.30;
    [
      { w: bW + wT * 2, d: wT, x: anchor.cx,        z: anchor.cz + bD / 2 + wT / 2 },
      { w: bW + wT * 2, d: wT, x: anchor.cx,        z: anchor.cz - bD / 2 - wT / 2 },
      { w: wT,          d: bD, x: anchor.cx + bW/2 + wT/2, z: anchor.cz },
      { w: wT,          d: bD, x: anchor.cx - bW/2 - wT/2, z: anchor.cz },
    ].forEach(function (p) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(p.w, hS, p.d), matBA);
      m.position.set(p.x, baseY + hS / 2, p.z);
      m.castShadow = true; m.receiveShadow = true;
      g.add(m);
    });

    // Radier (fundație)
    var radier = new THREE.Mesh(
      new THREE.BoxGeometry(bW + wT * 2, 0.35, bD + wT * 2),
      new THREE.MeshStandardMaterial({ color: 0x4B5563, roughness: 0.95 })
    );
    radier.position.set(anchor.cx, baseY - 0.175, anchor.cz);
    g.add(radier);

    // Pardoseală beton slefuit
    var pard = new THREE.Mesh(
      new THREE.BoxGeometry(bW - 0.6, 0.08, bD - 0.6),
      new THREE.MeshStandardMaterial({ color: 0x6B7280, roughness: 0.7, metalness: 0.12 })
    );
    pard.position.set(anchor.cx, baseY + 0.04, anchor.cz);
    pard.receiveShadow = true;
    g.add(pard);

    // Locuri parcare — linii albe
    var locW = 2.5, locD = 5.0;
    var nC = Math.floor((bW - 1.0) / locW);
    var nR = Math.floor((bD - 1.0) / (locD + 3.5));
    var lineMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.5 });
    var pmrMat  = new THREE.MeshStandardMaterial({
      color: 0x10B981, emissive: 0x10B981, emissiveIntensity: 0.25, roughness: 0.5
    });
    var locNr = 0;
    for (var row = 0; row < nR; row++) {
      for (var col = 0; col < nC; col++) {
        var lx = anchor.cx - bW / 2 + 0.5 + col * locW + locW / 2;
        var lz = anchor.cz - bD / 2 + 0.5 + row * (locD + 3.5) + locD / 2;
        // Loc PMR la fiecare al 7-lea
        var isPMR = locNr % 7 === 0;
        var locBox = new THREE.Mesh(
          new THREE.BoxGeometry(locW - 0.1, 0.05, locD - 0.1),
          isPMR ? pmrMat : new THREE.MeshStandardMaterial({
            color: 0x3B82F6, transparent: true, opacity: 0.4
          })
        );
        locBox.position.set(lx, baseY + 0.06, lz);
        g.add(locBox);
        // Linie delimitare
        var line = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, locD), lineMat);
        line.position.set(lx - locW / 2, baseY + 0.065, lz);
        g.add(line);
        locNr++;
      }
      // Culoar circulație (săgeată galbenă)
      var culoarZ = anchor.cz - bD/2 + 0.5 + row * (locD + 3.5) + locD + 3.5/2;
      var culoar = new THREE.Mesh(
        new THREE.BoxGeometry(bW - 1.0, 0.04, 0.12),
        new THREE.MeshStandardMaterial({ color: 0xFCD34D, emissive: 0xFCD34D, emissiveIntensity: 0.4 })
      );
      culoar.position.set(anchor.cx, baseY + 0.06, culoarZ);
      g.add(culoar);
    }

    // Rampă acces (stânga, panta 15%)
    var rampLen = hS / 0.15; // ~20m
    var rampMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.75 });
    var ramp = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.20, rampLen), rampMat);
    ramp.rotation.x = Math.atan(0.15);
    ramp.position.set(
      anchor.cx - bW / 2 - 2.1,
      anchor.baseY - hS / 2,
      anchor.cz + bD / 4
    );
    g.add(ramp);

    // Label rampă
    var rampLabel = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.1, 1.5),
      new THREE.MeshStandardMaterial({ color: 0xF59E0B, emissive: 0xF59E0B, emissiveIntensity: 0.5 })
    );
    rampLabel.position.set(anchor.cx - bW / 2 - 2.1, anchor.baseY + 0.2, anchor.cz + bD / 4);
    g.add(rampLabel);

    // Adăpost ALA (colț dreapta-spate, albastru închis)
    var alaW = Math.min(bW * 0.22, 5.5);
    var alaD = Math.min(bD * 0.20, 5.0);
    var ala = new THREE.Mesh(
      new THREE.BoxGeometry(alaW, hS * 0.85, alaD),
      new THREE.MeshStandardMaterial({ color: 0x1E3A8A, roughness: 0.7, metalness: 0.15 })
    );
    ala.position.set(
      anchor.cx + bW / 2 - alaW / 2 - 0.35,
      baseY + hS * 0.425,
      anchor.cz - bD / 2 + alaD / 2 + 0.35
    );
    g.add(ala);

    // Cameră tehnică (colț stânga-spate, gri)
    var tehW = Math.min(bW * 0.15, 4.0);
    var tehD = Math.min(bD * 0.18, 4.5);
    var teh = new THREE.Mesh(
      new THREE.BoxGeometry(tehW, hS * 0.75, tehD),
      new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.9 })
    );
    teh.position.set(
      anchor.cx - bW / 2 + tehW / 2 + 0.35,
      baseY + hS * 0.375,
      anchor.cz - bD / 2 + tehD / 2 + 0.35
    );
    g.add(teh);

    state.scene.add(g);
    console.log('[Subsol] ✅ Dollhouse S-1 construit');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 4. 3D FLOOR PLAN — etaj S-1
  // ═══════════════════════════════════════════════════════════════════════
  function _patch4_FloorPlan() {
    var _hook = function () {
      var fp = window.VTourFP;
      if (!fp || !fp.startFP || fp.startFP._s1fp) return false;
      fp.startFP._s1fp = true;
      var orig = fp.startFP;
      fp.startFP = function () {
        var r = orig.apply(this, arguments);
        setTimeout(_buildFPSubsol, 950);
        return r;
      };
      return true;
    };
    if (!_hook()) {
      var obs = new MutationObserver(function () { if (_hook()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  function _buildFPSubsol() {
    if (!_hasSubsol()) return;
    var state = window.VTour && window.VTour._state;
    if (!state || !state.scene || state._s1fpBuilt) return;
    state._s1fpBuilt = true;

    var THREE  = window.THREE;
    var anchor = state._anchor;
    if (!THREE || !anchor) return;

    var bW = anchor.bW, bD = anchor.bD;
    var hNiv = (window._RV && window._RV.building && window._RV.building.P && window._RV.building.P.hn) || 3.0;
    var baseY = anchor.baseY - hNiv;
    var wallH = 1.8;

    var g = new THREE.Group();
    g.name = 'FP_Subsol_S1';

    // Pardoseală beton
    var floorMat = new THREE.MeshStandardMaterial({ color: 0x9CA3AF, roughness: 0.8 });
    var floor = new THREE.Mesh(new THREE.BoxGeometry(bW, 0.08, bD), floorMat);
    floor.position.set(anchor.cx, baseY - 0.04, anchor.cz);
    floor.receiveShadow = true;
    g.add(floor);

    // Pereți exteriori negri
    var wMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
    var wT = 0.08;
    [
      [bW + wT*2, wT, anchor.cx,        baseY + wallH/2, anchor.cz + bD/2 + wT/2],
      [bW + wT*2, wT, anchor.cx,        baseY + wallH/2, anchor.cz - bD/2 - wT/2],
      [wT, bD,        anchor.cx+bW/2+wT/2, baseY + wallH/2, anchor.cz],
      [wT, bD,        anchor.cx-bW/2-wT/2, baseY + wallH/2, anchor.cz],
    ].forEach(function (p) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(p[0], wallH, p[1]), wMat);
      m.position.set(p[2], p[3], p[4]);
      m.castShadow = true;
      g.add(m);
    });

    // Locuri parcare colorate
    var locW = 2.5, locD = 5.0;
    var nC = Math.floor((bW - 1.0) / locW);
    var nR = Math.floor((bD - 1.0) / (locD + 3.5));
    var locNr = 0;
    for (var row = 0; row < nR; row++) {
      for (var col = 0; col < nC; col++) {
        var lx = anchor.cx - bW/2 + 0.5 + col*locW + locW/2;
        var lz = anchor.cz - bD/2 + 0.5 + row*(locD+3.5) + locD/2;
        var isPMR = locNr % 7 === 0;
        var locMat = new THREE.MeshStandardMaterial({
          color: isPMR ? 0x10B981 : 0x3B82F6,
          transparent: true, opacity: 0.65, roughness: 0.5
        });
        var loc = new THREE.Mesh(new THREE.BoxGeometry(locW-0.12, 0.07, locD-0.12), locMat);
        loc.position.set(lx, baseY + 0.075, lz);
        g.add(loc);
        // Linie delimitare albă
        var lLine = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.07, locD),
          new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
        );
        lLine.position.set(lx - locW/2, baseY + 0.08, lz);
        g.add(lLine);
        locNr++;
      }
    }

    // ALA — box albastru închis
    var alaW = Math.min(bW*0.22, 5.5), alaD = Math.min(bD*0.20, 5.0);
    var ala = new THREE.Mesh(
      new THREE.BoxGeometry(alaW, wallH, alaD),
      new THREE.MeshStandardMaterial({ color: 0x1E3A8A, transparent: true, opacity: 0.75 })
    );
    ala.position.set(anchor.cx+bW/2-alaW/2-0.35, baseY+wallH/2, anchor.cz-bD/2+alaD/2+0.35);
    g.add(ala);

    // Tehnic — box gri
    var tehW = Math.min(bW*0.15, 4.0), tehD = Math.min(bD*0.18, 4.5);
    var teh = new THREE.Mesh(
      new THREE.BoxGeometry(tehW, wallH*0.8, tehD),
      new THREE.MeshStandardMaterial({ color: 0x4B5563, transparent: true, opacity: 0.8 })
    );
    teh.position.set(anchor.cx-bW/2+tehW/2+0.35, baseY+wallH*0.4, anchor.cz-bD/2+tehD/2+0.35);
    g.add(teh);

    // Rampă (placă inclinată portocalie)
    var rampLen = hNiv / 0.15;
    var ramp = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.15, rampLen),
      new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.7 })
    );
    ramp.rotation.x = Math.atan(0.15);
    ramp.position.set(anchor.cx - bW/2 - 2.1, anchor.baseY - hNiv/2, anchor.cz + bD/4);
    g.add(ramp);

    // Ușă acces S-1 (aurie)
    var doorMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B, emissive: 0xF59E0B, emissiveIntensity: 0.35
    });
    var door = new THREE.Mesh(new THREE.BoxGeometry(3.5, wallH*0.85, 0.06), doorMat);
    door.position.set(anchor.cx - bW/2 + 0.03, baseY + wallH*0.425, anchor.cz - bD*0.2);
    door.rotation.y = Math.PI/2;
    g.add(door);

    state.scene.add(g);
    console.log('[Subsol] ✅ 3D Floor Plan S-1 construit');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 5. SECȚIUNE A-A — overlay canvas cu S-1 sub ±0.00
  // ═══════════════════════════════════════════════════════════════════════
  function _patch5_Section() {
    var orig = window._rvRender;
    if (!orig || orig._subsolSectPatched) return;
    orig._subsolSectPatched = true;
    window._rvRender = function () {
      var r = orig.apply(this, arguments);
      if (window._RV && window._RV.tab === 'sectiune') {
        setTimeout(_drawSubsolOnSection, 90);
      }
      return r;
    };
  }

  function _drawSubsolOnSection() {
    if (!_hasSubsol()) return;
    var cv = document.getElementById('rv-canvas');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    var RV  = window._RV;
    var b   = RV && RV.building;
    if (!b) return;

    var SC    = (RV.scale || 12) * 0.85;
    var hNiv  = (b.P && b.P.hn) || 3.0;
    var bW    = b.bW || 18, bD = b.bD || 14;
    var sW    = (RV.sectionType === 'BB' ? bD : bW) * SC;
    var PAD   = 60, DIM_W = 50;
    var ox    = PAD + DIM_W;
    var sH    = b.niv * hNiv * SC;
    var oy    = PAD; // top
    var ctnY  = oy + sH; // CTN = ±0.00
    var subH  = hNiv * SC; // înălțime nivel subsol
    var EW    = Math.max(4, 0.35 * SC);

    // ── Cutia subsolului sub CTN ──────────────────────────────────────
    ctx.fillStyle = 'rgba(55,65,81,.22)';
    ctx.fillRect(ox, ctnY, sW, subH);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2.0;
    ctx.strokeRect(ox, ctnY, sW, subH);

    // Hașuri beton armat
    ctx.save();
    ctx.beginPath(); ctx.rect(ox, ctnY, sW, subH); ctx.clip();
    ctx.strokeStyle = 'rgba(50,65,90,.18)'; ctx.lineWidth = 0.6;
    for (var hi = 0; hi < sW + subH + 10; hi += 9) {
      ctx.beginPath();
      ctx.moveTo(ox + hi, ctnY);
      ctx.lineTo(ox + hi - subH, ctnY + subH);
      ctx.stroke();
    }
    ctx.restore();

    // Pereți exteriori subsol (linii groase + hașuri)
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(ox, ctnY, EW, subH);
    ctx.fillRect(ox + sW - EW, ctnY, EW, subH);
    // Hașuri pereți
    [ox, ox + sW - EW].forEach(function (px) {
      ctx.save(); ctx.beginPath(); ctx.rect(px, ctnY, EW, subH); ctx.clip();
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 0.5;
      for (var h2 = 0; h2 < subH + EW + 5; h2 += 4) {
        ctx.beginPath(); ctx.moveTo(px + h2, ctnY); ctx.lineTo(px + h2 - EW, ctnY + subH); ctx.stroke();
      }
      ctx.restore();
    });

    // Locuri parcare schematice
    var locWpx = Math.max(10, 2.5 * SC);
    var locHpx = Math.min(subH * 0.55, 5.0 * SC * 0.5);
    var locYpx  = ctnY + (subH - locHpx) / 2;
    var nLoc    = Math.floor((sW - EW * 2 - 4) / (locWpx + 1.5));
    for (var li = 0; li < nLoc; li++) {
      var lxpx = ox + EW + 2 + li * (locWpx + 1.5);
      var isPMR = li % 7 === 0;
      ctx.fillStyle = isPMR ? 'rgba(16,185,129,.35)' : 'rgba(59,130,246,.22)';
      ctx.strokeStyle = isPMR ? '#10B981' : '#94A3B8';
      ctx.lineWidth = 0.8;
      ctx.fillRect(lxpx, locYpx, locWpx, locHpx);
      ctx.strokeRect(lxpx, locYpx, locWpx, locHpx);
      ctx.fillStyle = isPMR ? '#065F46' : '#475569';
      ctx.font = '5px IBM Plex Mono'; ctx.textAlign = 'center';
      ctx.fillText(isPMR ? 'PMR' : String(li + 1), lxpx + locWpx/2, locYpx + locHpx/2 + 2);
    }
    ctx.textAlign = 'left';

    // Etichetă S-1
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 8px IBM Plex Mono';
    ctx.textAlign = 'center';
    ctx.fillText('S-1 · PARCAJ · H=3.00m', ox + sW / 2, ctnY + subH / 2 + 3);
    ctx.textAlign = 'left';

    // Cotă -3.00m
    ctx.fillStyle = '#DC2626'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'right';
    ctx.fillText('-' + hNiv.toFixed(2) + 'm', ox - 5, ctnY + subH + 4);
    ctx.textAlign = 'left';

    // Linie cotă S-1 (stânga)
    ctx.strokeStyle = '#DC2626'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(ox - 18, ctnY); ctx.lineTo(ox - 18, ctnY + subH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox - 22, ctnY); ctx.lineTo(ox - 14, ctnY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox - 22, ctnY + subH); ctx.lineTo(ox - 14, ctnY + subH); ctx.stroke();
    ctx.save();
    ctx.translate(ox - 33, ctnY + subH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#DC2626'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('h=3.00m', 0, 0);
    ctx.restore();

    // Rampă (triunghi portocaliu stânga)
    var rampW = EW * 3.5;
    ctx.fillStyle = 'rgba(217,119,6,.28)';
    ctx.strokeStyle = '#B45309'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ox - rampW, ctnY);
    ctx.lineTo(ox - rampW, ctnY + subH);
    ctx.lineTo(ox, ctnY + subH);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#92400E'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('RAMPĂ', ox - rampW / 2, ctnY + subH / 2 - 4);
    ctx.fillText('i=15%', ox - rampW / 2, ctnY + subH / 2 + 5);
    ctx.textAlign = 'left';

    // ALA (dreptunghi albastru dreapta)
    var alaWpx = Math.min(sW * 0.18, 38);
    ctx.fillStyle = 'rgba(30,58,95,.30)';
    ctx.strokeStyle = '#1E40AF'; ctx.lineWidth = 1.2;
    ctx.fillRect(ox + sW - EW - alaWpx - 3, ctnY + 5, alaWpx, subH - 10);
    ctx.strokeRect(ox + sW - EW - alaWpx - 3, ctnY + 5, alaWpx, subH - 10);
    ctx.fillStyle = '#1E40AF'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText('ALA', ox + sW - EW - alaWpx/2 - 3, ctnY + subH/2);
    ctx.textAlign = 'left';
  }

})();
