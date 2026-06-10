// ═══════════════════════════════════════════════════════════════════════════
// 41-visual-upgrade.js — Upgrade vizual complet planșe 2D + Dollhouse 3D
// UrbanX TSS·FG | v1.0 | 10 Iunie 2026
//
// GRUP A — PLANȘE 2D (post-render canvas patches):
//   A1. Figuri umane scară (1.75m) pe fațadă + axonometrie
//   A2. Umbră proprie clădire pe axonometrie
//   A3. Copaci schematici 2D pe fațadă + situație + axonometrie
//   A4. Stratigrafie planșeu inter-etaj în secțiune A-A
//   A5. Cote interioare camere pe plan nivel
//
// GRUP B — DOLLHOUSE 3D:
//   B1. Click cameră → popup info (Raycaster)
//   B2. Copaci 3D billboards în jurul clădirii
//   B3. Trotuar + asfalt texturat în jurul parcelei
//   B4. Lumini ferestre emissive la modul Noapte
//   B5. Hover highlight apartament (culoare distinctivă)
//
// GRUP C — 3D FLOOR PLAN:
//   C1. Label-uri camere floating (CSS2DObject sau canvas overlay)
//   C2. Click cameră → popup suprafață + tip
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (typeof _RV !== 'undefined' && typeof _rvRenderPlan !== 'undefined') { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 250);
  }

  waitReady(() => {
    _patchA_2DPlans();
    _patchB_Dollhouse();
    _patchC_FloorPlan();
    console.log('[VisualUpgrade v1] ✅ A(2D) + B(Dollhouse) + C(FloorPlan) aplicate');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // GRUP A — PLANȘE 2D
  // ═══════════════════════════════════════════════════════════════════════

  function _patchA_2DPlans() {
    if (window._VISUAL_2D_PATCHED) return;
    window._VISUAL_2D_PATCHED = true;

    const orig = window._rvRender;
    if (!orig) return;

    window._rvRender = function () {
      const r = orig.apply(this, arguments);
      setTimeout(() => {
        const cv = document.getElementById('rv-canvas');
        if (!cv) return;
        const ctx = cv.getContext('2d');
        const tab = window._RV?.tab;
        try {
          if (tab === 'fatada')   { _A1_humansFacade(ctx); _A3_treesFacade(ctx); }
          if (tab === 'axono')    { _A2_shadowAxono(ctx);  _A1_humansAxono(ctx); _A3_treesAxono(ctx); }
          if (tab === 'sectiune') { _A4_stratSection(ctx); _A1_humanSection(ctx); }
          if (tab === 'plan')     { _A5_innerDims(ctx); }
        } catch(e) { console.warn('[VisualUpgrade A]', e.message); }
      }, 90);
      return r;
    };
  }

  // ── A1. Figuri umane scară ─────────────────────────────────────────────
  // Siluetă simplă: elipsă cap + dreptunghi corp + linii picioare
  function _drawHuman(ctx, x, baseY, scale, color) {
    const h = 1.75 * scale; // înălțime reală
    const headR = h * 0.12;
    const bodyH = h * 0.45;
    const bodyW = h * 0.22;
    const legH  = h * 0.38;
    const armH  = h * 0.35;

    ctx.save();
    ctx.strokeStyle = color || 'rgba(30,50,80,.65)';
    ctx.fillStyle   = color || 'rgba(30,50,80,.5)';
    ctx.lineWidth   = Math.max(0.8, scale * 0.08);

    // Cap
    ctx.beginPath();
    ctx.arc(x, baseY - h + headR, headR, 0, Math.PI * 2);
    ctx.fill();

    // Corp
    ctx.fillRect(x - bodyW/2, baseY - h + headR*2 + 1, bodyW, bodyH);

    // Brațe
    ctx.beginPath();
    ctx.moveTo(x - bodyW/2, baseY - h + headR*2 + bodyH*0.15);
    ctx.lineTo(x - bodyW/2 - armH*0.4, baseY - h + headR*2 + bodyH*0.5);
    ctx.moveTo(x + bodyW/2, baseY - h + headR*2 + bodyH*0.15);
    ctx.lineTo(x + bodyW/2 + armH*0.4, baseY - h + headR*2 + bodyH*0.5);
    ctx.stroke();

    // Picioare
    ctx.beginPath();
    ctx.moveTo(x - bodyW*0.15, baseY - legH);
    ctx.lineTo(x - bodyW*0.25, baseY);
    ctx.moveTo(x + bodyW*0.15, baseY - legH);
    ctx.lineTo(x + bodyW*0.25, baseY);
    ctx.stroke();

    // Cotă înălțime (discret)
    ctx.strokeStyle = 'rgba(30,100,200,.4)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(x + bodyW*0.7, baseY - h);
    ctx.lineTo(x + bodyW*0.7, baseY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(30,100,200,.7)';
    ctx.font = '6px IBM Plex Mono';
    ctx.textAlign = 'left';
    ctx.fillText('1.75m', x + bodyW*0.75, baseY - h/2);
    ctx.textAlign = 'left';

    ctx.restore();
  }

  function _A1_humansFacade(ctx) {
    const b = window._RV?.building;
    if (!b) return;
    const SC  = (window._RV?.scale || 15) * 0.85;
    const P   = b.P;
    const niv = b.niv;
    const Ht  = niv * (P?.hn || 3);
    const pad = 40;
    const facadeH = Ht * SC;

    // Fațada principală e prima (aprox oy = pad + facadeH*0 + 80)
    // Căutăm direct poziția corectă din canvas
    const W = ctx.canvas.width;
    const facadeW = b.bW * SC;
    const ox = pad;
    const oy = pad + 80; // header-ul e ~80px

    const baseY  = oy + facadeH;
    const hScale = SC; // 1 unitate = SC pixeli

    // 2 figuri: una în stânga, una în dreapta clădirii
    _drawHuman(ctx, ox - 18, baseY, hScale, 'rgba(40,60,100,.55)');
    _drawHuman(ctx, ox + facadeW + 22, baseY, hScale, 'rgba(40,60,100,.55)');
  }

  function _A1_humansAxono(ctx) {
    const b = window._RV?.building;
    if (!b) return;
    const SC  = (window._RV?.scale || 15) * 0.7;
    const P   = b.P;
    const ANG = Math.PI / 6;
    const DF  = 0.6;
    const pad = 60;
    const H   = b.niv * (P?.hn || 3) * SC + b.bD * SC + pad * 2 + 120;
    const ox  = pad + 60;
    const oy  = H - pad - 80;

    // Funcția iso din axonometrie
    const iso = (wx, wy, wz) => [
      ox + wx * SC + wy * Math.cos(ANG) * SC * DF,
      oy - wz * SC - wy * Math.sin(ANG) * SC * DF,
    ];

    // Figuri în față stânga și dreapta
    const [lx, ly] = iso(-2.5, 0, 0);
    const [rx, ry] = iso(b.bW + 2, 0, 0);
    _drawHuman(ctx, lx, ly, SC, 'rgba(40,60,100,.5)');
    _drawHuman(ctx, rx, ry, SC, 'rgba(40,60,100,.5)');

    // Mașină schematică (dreptunghi cu roți) în față-stânga
    _drawCar(ctx, lx - 60, ly, SC);
  }

  function _A1_humanSection(ctx) {
    const b = window._RV?.building;
    if (!b) return;
    const SC    = (window._RV?.scale || 15) * 0.85;
    const P     = b.P;
    const niv   = b.niv;
    const Ht    = niv * (P?.hn || 3);
    const pad   = 60;
    const DIM_W = 50;
    const sH    = Ht * SC;
    const ox    = pad + DIM_W;
    const oy    = pad;

    const baseY = oy + sH;
    _drawHuman(ctx, ox - 22, baseY, SC, 'rgba(40,60,100,.5)');
  }

  // ── Mașină schematică ──────────────────────────────────────────────────
  function _drawCar(ctx, x, baseY, scale) {
    const cW = 4.5 * scale, cH = 1.5 * scale;
    const cY = baseY - cH;
    ctx.save();
    ctx.fillStyle = 'rgba(80,100,130,.3)';
    ctx.strokeStyle = 'rgba(50,70,100,.5)';
    ctx.lineWidth = 0.8;
    // Caroserie
    ctx.fillRect(x, cY, cW, cH);
    ctx.strokeRect(x, cY, cW, cH);
    // Acoperiș
    ctx.fillStyle = 'rgba(70,90,120,.4)';
    ctx.beginPath();
    ctx.moveTo(x + cW * 0.15, cY);
    ctx.lineTo(x + cW * 0.3, cY - cH * 0.55);
    ctx.lineTo(x + cW * 0.75, cY - cH * 0.55);
    ctx.lineTo(x + cW * 0.88, cY);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // Roți
    const rR = cH * 0.32;
    [x + cW * 0.22, x + cW * 0.78].forEach(rx => {
      ctx.fillStyle = 'rgba(30,30,30,.6)';
      ctx.beginPath(); ctx.arc(rx, baseY - rR, rR, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
  }

  // ── A2. Umbră proprie pe axonometrie ──────────────────────────────────
  function _A2_shadowAxono(ctx) {
    const b = window._RV?.building;
    if (!b) return;
    const SC  = (window._RV?.scale || 15) * 0.7;
    const P   = b.P;
    const ANG = Math.PI / 6;
    const DF  = 0.6;
    const pad = 60;
    const H   = b.niv * (P?.hn || 3) * SC + b.bD * SC + pad * 2 + 120;
    const ox  = pad + 60;
    const oy  = H - pad - 80;
    const Ht  = b.niv * (P?.hn || 3);

    const iso = (wx, wy, wz) => [
      ox + wx * SC + wy * Math.cos(ANG) * SC * DF,
      oy - wz * SC - wy * Math.sin(ANG) * SC * DF,
    ];

    // Direcție soare: unghi 45° față de fațadă principală
    const shadowLen = Ht * 0.7;
    const sdx = shadowLen * 0.8;
    const sdz = shadowLen * 0.3;

    // Umbra = proiecție pe planul y=0 cu offset solar
    const shadowPts = [
      iso(0,    0,    0),
      iso(b.bW, 0,    0),
      iso(b.bW + sdx, 0 + sdz, 0),
      iso(0    + sdx, 0 + sdz, 0),
    ];

    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#1E3A5F';
    ctx.beginPath();
    ctx.moveTo(shadowPts[0][0], shadowPts[0][1]);
    shadowPts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // ── A3. Copaci schematici 2D ──────────────────────────────────────────
  function _drawTree2D(ctx, x, baseY, scale, type) {
    const h = (type === 'tall' ? 8 : 5) * scale;
    const r = (type === 'tall' ? 1.2 : 2) * scale;
    ctx.save();

    // Trunchi
    ctx.fillStyle = 'rgba(80,55,30,.6)';
    ctx.fillRect(x - scale*0.12, baseY - h*0.4, scale*0.24, h*0.4);

    // Coroană (cercuri suprapuse)
    const crowdColors = ['rgba(34,120,50,.35)', 'rgba(22,100,40,.4)', 'rgba(45,140,60,.3)'];
    if (type === 'round') {
      // Copac rotund
      crowdColors.forEach((col, i) => {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x + (i-1)*r*0.2, baseY - h*0.5 - i*r*0.15, r*(1-i*0.1), 0, Math.PI*2);
        ctx.fill();
      });
    } else {
      // Copac înalt (pin/brad)
      ctx.fillStyle = 'rgba(20,80,35,.5)';
      ctx.beginPath();
      ctx.moveTo(x, baseY - h);
      ctx.lineTo(x - r, baseY - h*0.35);
      ctx.lineTo(x + r, baseY - h*0.35);
      ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, baseY - h*0.75);
      ctx.lineTo(x - r*1.2, baseY - h*0.1);
      ctx.lineTo(x + r*1.2, baseY - h*0.1);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }

  function _A3_treesFacade(ctx) {
    const b = window._RV?.building;
    if (!b) return;
    const SC     = (window._RV?.scale || 15) * 0.85;
    const niv    = b.niv;
    const Ht     = niv * (b.P?.hn || 3);
    const facadeH = Ht * SC;
    const pad    = 40;
    const facadeW = b.bW * SC;
    const ox = pad;
    const oy = pad + 80;
    const baseY = oy + facadeH;
    const sc = SC;

    _drawTree2D(ctx, ox - 50, baseY, sc, 'round');
    _drawTree2D(ctx, ox + facadeW + 55, baseY, sc, 'tall');
    _drawTree2D(ctx, ox + facadeW + 90, baseY, sc, 'round');
  }

  function _A3_treesAxono(ctx) {
    const b = window._RV?.building;
    if (!b) return;
    const SC  = (window._RV?.scale || 15) * 0.7;
    const P   = b.P;
    const ANG = Math.PI / 6;
    const DF  = 0.6;
    const pad = 60;
    const H   = b.niv * (P?.hn || 3) * SC + b.bD * SC + pad * 2 + 120;
    const ox  = pad + 60;
    const oy  = H - pad - 80;
    const iso = (wx, wy, wz) => [
      ox + wx * SC + wy * Math.cos(ANG) * SC * DF,
      oy - wz * SC - wy * Math.sin(ANG) * SC * DF,
    ];

    const treePos = [
      [-3, b.bD * 0.3], [-3, b.bD * 0.7],
      [b.bW + 2, b.bD * 0.2], [b.bW + 2, b.bD * 0.7],
    ];
    treePos.forEach(([wx, wy], i) => {
      const [px, py] = iso(wx, wy, 0);
      _drawTree2D(ctx, px, py, SC * 0.4, i % 2 === 0 ? 'round' : 'tall');
    });
  }

  // ── A4. Stratigrafie planșeu inter-etaj în secțiune ───────────────────
  function _A4_stratSection(ctx) {
    const b = window._RV?.building;
    if (!b) return;
    const SC    = (window._RV?.scale || 15) * 0.85;
    const P     = b.P;
    const niv   = b.niv;
    const hNiv  = P?.hn || 3;
    const Ht    = niv * hNiv;
    const pad   = 60;
    const DIM_W = 50;
    const sH    = Ht * SC;
    const ox    = pad + DIM_W;
    const oy    = pad;

    // Stratigrafie pentru fiecare planșeu inter-etaj (nu acoperiș)
    const slabLayers = [
      { h: 0.04*SC, col: 'rgba(200,180,150,.5)',  lbl: 'Parchet/gresie (4cm)' },
      { h: 0.05*SC, col: 'rgba(180,170,160,.4)',  lbl: 'Șapă (5cm)' },
      { h: 0.03*SC, col: 'rgba(34,197,94,.35)',   lbl: 'Izolație fonoabsorbantă' },
      { h: 0.20*SC, col: 'rgba(50,65,90,.4)',     lbl: 'Planșeu BA (20cm)' },
      { h: 0.015*SC,col: 'rgba(200,200,200,.35)', lbl: 'Tencuială (1.5cm)' },
    ];

    const totalSlabH = slabLayers.reduce((s, l) => s + l.h, 0);
    const sectionW   = window._RV?.building
      ? (window._RV.sectionType === 'BB' ? b.bD : b.bW) * SC
      : b.bW * SC;

    // Desenăm stratigrafie pentru etajele 1..niv (nu parter și nu acoperiș)
    for (let i = 1; i < niv; i++) {
      const flY = oy + sH - i * hNiv * SC;

      // Zoom-in pe planșeu — mini secțiune detaliată în dreapta
      const detX = ox + sectionW + 55;
      const detW = 80;
      const detScale = detW / totalSlabH;

      // Linie de indicație
      ctx.save();
      ctx.strokeStyle = 'rgba(100,116,139,.3)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(ox + sectionW, flY);
      ctx.lineTo(detX, flY);
      ctx.stroke();
      ctx.setLineDash([]);

      if (i === 1) { // Desenăm detaliu o singură dată pentru claritate
        let layY = flY - totalSlabH / 2;
        const detH = totalSlabH;
        ctx.fillStyle = 'rgba(248,250,252,.95)';
        ctx.strokeStyle = 'rgba(148,163,184,.4)';
        ctx.lineWidth = 0.5;
        ctx.fillRect(detX, layY, detW, detH);
        ctx.strokeRect(detX, layY, detW, detH);

        let ly = layY;
        slabLayers.forEach(layer => {
          ctx.fillStyle = layer.col;
          ctx.fillRect(detX, ly, detW * 0.35, layer.h);
          ctx.strokeStyle = 'rgba(100,116,139,.3)';
          ctx.strokeRect(detX, ly, detW * 0.35, layer.h);
          ctx.fillStyle = '#334155';
          ctx.font = '5.5px IBM Plex Mono';
          ctx.fillText(layer.lbl, detX + detW * 0.38, ly + layer.h / 2 + 2);
          ly += layer.h;
        });

        ctx.fillStyle = '#1E40AF';
        ctx.font = 'bold 6.5px IBM Plex Mono';
        ctx.textAlign = 'center';
        ctx.fillText('PLANȘEU TIP', detX + detW / 2, layY - 5);
        ctx.textAlign = 'left';
      }

      ctx.restore();
    }
  }

  // ── A5. Cote interioare camere pe plan nivel ───────────────────────────
  function _A5_innerDims(ctx) {
    const b  = window._RV?.building;
    const fl = window._RV?.floors?.[window._RV?.floorIdx || 0];
    if (!b || !fl?.rects) return;

    const SC  = window._RV?.scale || 15;
    const P   = b.P;
    const pad = 60;
    const ox  = pad + (P?.rl || 0) * SC;
    const oy  = pad + (P?.rf || 0) * SC;

    ctx.save();
    ctx.font = '6px IBM Plex Mono';

    fl.rects.forEach(r => {
      if (r.bal || r.w * r.h < 3) return;
      const rx = ox + r.x * SC;
      const ry = oy + r.y * SC;
      const rw = r.w * SC;
      const rh = r.h * SC;

      // Cota lățime (jos în cameră)
      if (rw > 35) {
        ctx.fillStyle = 'rgba(30,64,175,.6)';
        ctx.textAlign = 'center';
        ctx.fillText(r.w.toFixed(2) + 'm', rx + rw/2, ry + rh - 5);
      }
      // Cota adâncime (dreapta în cameră)
      if (rh > 28) {
        ctx.save();
        ctx.translate(rx + rw - 5, ry + rh/2);
        ctx.rotate(-Math.PI/2);
        ctx.fillStyle = 'rgba(30,64,175,.6)';
        ctx.textAlign = 'center';
        ctx.fillText(r.h.toFixed(2) + 'm', 0, 0);
        ctx.restore();
      }
    });

    ctx.textAlign = 'left';
    ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // GRUP B — DOLLHOUSE 3D
  // ═══════════════════════════════════════════════════════════════════════

  function _patchB_Dollhouse() {
    if (window._VISUAL_3D_PATCHED) return;
    window._VISUAL_3D_PATCHED = true;

    // Hook pe VTour.start
    const origStart = window.VTour?.start;
    if (!origStart) {
      // VTour nu e gata, așteptăm
      const obs = new MutationObserver(() => {
        if (window.VTour?.start && !window._VISUAL_3D_PATCHED_INNER) {
          window._VISUAL_3D_PATCHED_INNER = true;
          _hookVTourStart();
          obs.disconnect();
        }
      });
      obs.observe(document.body, { childList: true, subtree: true });
      return;
    }
    _hookVTourStart();
  }

  function _hookVTourStart() {
    const origStart = window.VTour.start;
    if (window._VISUAL_VTOUR_HOOKED) return;
    window._VISUAL_VTOUR_HOOKED = true;

    window.VTour.start = function () {
      const r = origStart.apply(this, arguments);
      setTimeout(() => {
        try {
          _B2_addTrees();
          _B3_addTerrain();
          _B1_addRaycaster();
          _B4_nightLights();
        } catch(e) { console.warn('[VisualUpgrade B]', e.message); }
      }, 1400);
      return r;
    };
  }

  // ── B1. Raycaster — click cameră → popup info ─────────────────────────
  function _B1_addRaycaster() {
    if (window._RAYCASTER_ADDED) return;
    const state = window.VTour?._state;
    if (!state?.scene || !state?.camera || !state?.canvas) return;
    window._RAYCASTER_ADDED = true;

    const THREE = window.THREE;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let _lastClickTime = 0;

    state.canvas.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - _lastClickTime < 300) return; // debounce
      _lastClickTime = now;

      // Verificăm că nu e drag
      const rect = state.canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, state.camera);
      const intersects = raycaster.intersectObjects(state.scene.children, true);

      if (!intersects.length) {
        _closeRoomPopup();
        return;
      }

      // Căutăm un mesh cu userData de cameră
      let found = null;
      for (const hit of intersects) {
        let obj = hit.object;
        while (obj) {
          if (obj.userData?.roomType || obj.userData?.floorIdx !== undefined) {
            found = { obj, point: hit.point };
            break;
          }
          obj = obj.parent;
        }
        if (found) break;
      }

      if (found) {
        _showRoomPopup(found.obj.userData, found.point, e.clientX, e.clientY);
        _B5_highlightApt(found.obj.userData?.aptIdx);
      } else {
        _closeRoomPopup();
        _B5_highlightApt(null);
      }
    });

    // Tag-uim mesh-urile cu userData
    _tagMeshesWithRoomData(state);
  }

  function _tagMeshesWithRoomData(state) {
    const RV = window._RV;
    if (!RV?.floors) return;

    const anchor = window._rvGetAnchor?.() || state._anchor;
    if (!anchor) return;
    const b = RV.building;
    const ox = anchor.cx - b.bW / 2;
    const oz = anchor.cz - b.bD / 2;
    const hNiv = b.P?.hn || 3;

    RV.floors.forEach((fl, fIdx) => {
      fl?.rects?.forEach((r, rIdx) => {
        const roomCx = ox + r.x + r.w / 2;
        const roomCz = oz + r.y + r.h / 2;
        const roomBaseY = anchor.baseY + fIdx * hNiv;

        // Găsim mesh-urile de podea în această poziție
        state.dollhouseGroup?.traverse(obj => {
          if (!obj.isMesh) return;
          const wp = new window.THREE.Vector3();
          obj.getWorldPosition(wp);
          const dist = Math.hypot(wp.x - roomCx, wp.z - roomCz);
          if (dist < Math.min(r.w, r.h) * 0.4 &&
              Math.abs(wp.y - roomBaseY) < hNiv * 0.7) {
            obj.userData.roomType = r.t;
            obj.userData.roomLabel = r.lbl || r.t;
            obj.userData.roomArea  = +(r.w * r.h).toFixed(2);
            obj.userData.aptIdx    = r.apt;
            obj.userData.floorIdx  = fIdx;
          }
        });
      });
    });
  }

  function _showRoomPopup(data, point, cx, cy) {
    _closeRoomPopup();
    const popup = document.createElement('div');
    popup.id = 'vtour-room-popup';
    popup.style.cssText = `
      position:fixed;left:${Math.min(cx + 12, window.innerWidth - 200)}px;
      top:${Math.min(cy - 10, window.innerHeight - 120)}px;
      z-index:999999;background:rgba(8,14,30,.96);
      border:1px solid rgba(212,175,55,.4);border-radius:10px;
      padding:10px 14px;min-width:160px;
      box-shadow:0 4px 20px rgba(0,0,0,.6);
      font-family:IBM Plex Mono,monospace;
      pointer-events:none;
    `;

    const typeLabels = {
      living:'🛋 Living', bedroom:'🛏 Dormitor', bedroom2:'🛏 Dormitor 2',
      kitchen:'🍳 Bucătărie', bath:'🚿 Baie', wc:'🚽 WC',
      hall:'🚪 Hol', office:'💼 Birou', reception:'🏢 Recepție',
      storage:'📦 Depozit', balcon:'🌿 Balcon',
    };

    const label = typeLabels[data.roomType] || data.roomLabel || data.roomType || '—';
    const etaj = data.floorIdx === 0 ? 'Parter' : `Etaj ${data.floorIdx}`;
    const apt  = data.aptIdx > 0 ? `Ap. ${data.aptIdx}` : '';

    popup.innerHTML = `
      <div style="font-size:13px;font-weight:700;color:#D4AF37;margin-bottom:6px">${label}</div>
      <div style="font-size:10px;color:#94A3B8">${etaj}${apt ? '  ·  ' + apt : ''}</div>
      <div style="font-size:11px;color:#E2E8F0;margin-top:4px">
        ${data.roomArea ? data.roomArea + ' m²' : ''}
      </div>
    `;

    document.body.appendChild(popup);
    setTimeout(() => _closeRoomPopup(), 4000);
  }

  function _closeRoomPopup() {
    document.getElementById('vtour-room-popup')?.remove();
  }

  // ── B2. Copaci 3D billboards ──────────────────────────────────────────
  function _B2_addTrees() {
    if (window._TREES_ADDED) return;
    const state = window.VTour?._state;
    if (!state?.scene) return;
    window._TREES_ADDED = true;

    const THREE = window.THREE;
    const anchor = window._rvGetAnchor?.() || state._anchor;
    if (!anchor) return;
    const b = window._RV?.building;
    if (!b) return;

    const treeGroup = new THREE.Group();
    treeGroup.name = 'Trees';

    const treePositions = [
      [-4,   anchor.cz - b.bD * 0.3, 'round', 5],
      [-4,   anchor.cz + b.bD * 0.2, 'round', 4],
      [anchor.cx + b.bW/2 + 5, anchor.cz - b.bD*0.4, 'tall', 7],
      [anchor.cx + b.bW/2 + 9, anchor.cz + b.bD*0.3, 'round', 5],
      [anchor.cx - b.bW/2 - 5, anchor.cz - b.bD*0.2, 'tall', 6],
      [anchor.cx - b.bW/2 - 9, anchor.cz + b.bD*0.4, 'round', 4.5],
    ].map(([x, z, type, h]) => ({ x: x < 0 ? anchor.cx - b.bW/2 + x : x, z, type, h }));

    treePositions.forEach(pos => {
      _addTree3D(treeGroup, pos.x, anchor.baseY, pos.z, pos.h, pos.type, THREE);
    });

    state.scene.add(treeGroup);
    state._treeGroup = treeGroup;
  }

  function _addTree3D(group, x, baseY, z, height, type, THREE) {
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x5D3A1A, roughness: 0.9, metalness: 0,
    });
    const trunkH = height * 0.35;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.18, trunkH, 6),
      trunkMat
    );
    trunk.position.set(x, baseY + trunkH / 2, z);
    trunk.castShadow = true;
    group.add(trunk);

    const foliageMat = new THREE.MeshStandardMaterial({
      color: type === 'tall' ? 0x1A5C2A : 0x2D7A3A,
      roughness: 0.95, metalness: 0,
    });

    if (type === 'round') {
      const ball = new THREE.Mesh(
        new THREE.SphereGeometry(height * 0.28, 7, 6),
        foliageMat
      );
      ball.position.set(x, baseY + trunkH + height * 0.22, z);
      ball.castShadow = true;
      group.add(ball);
    } else {
      // Conifer — 3 straturi conice
      [0.5, 0.65, 0.8].forEach((yFrac, i) => {
        const coneR = height * (0.3 - i * 0.06);
        const coneH = height * 0.35;
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(coneR, coneH, 7),
          foliageMat
        );
        cone.position.set(x, baseY + height * yFrac, z);
        cone.castShadow = true;
        group.add(cone);
      });
    }
  }

  // ── B3. Trotuar + asfalt texturat ────────────────────────────────────
  function _B3_addTerrain() {
    if (window._TERRAIN_ADDED) return;
    const state = window.VTour?._state;
    if (!state?.scene) return;
    window._TERRAIN_ADDED = true;

    const THREE = window.THREE;
    const anchor = window._rvGetAnchor?.() || state._anchor;
    if (!anchor) return;
    const b = window._RV?.building;
    if (!b) return;

    const terrainGroup = new THREE.Group();
    terrainGroup.name = 'Terrain';

    const P  = window._RV?.parcelParams;
    const pW = (P?.W || b.bW * 2) + 10;
    const pD = (P?.D || b.bD * 2) + 10;

    // Parcela (gazon mai deschis pe suprafața liberă)
    const parcelMat = new THREE.MeshStandardMaterial({
      color: 0x7CB87A, roughness: 0.95, metalness: 0,
    });
    const parcel = new THREE.Mesh(
      new THREE.BoxGeometry(pW, 0.05, pD),
      parcelMat
    );
    parcel.position.set(anchor.cx, anchor.baseY - 0.025, anchor.cz);
    parcel.receiveShadow = true;
    terrainGroup.add(parcel);

    // Trotuar frontal (beton gri deschis)
    const trotuarMat = new THREE.MeshStandardMaterial({
      color: 0xCDD5DE, roughness: 0.85, metalness: 0.02,
    });
    const trotuarW = pW + 4, trotuarD = 2.0;
    const trotuar = new THREE.Mesh(
      new THREE.BoxGeometry(trotuarW, 0.06, trotuarD),
      trotuarMat
    );
    trotuar.position.set(
      anchor.cx,
      anchor.baseY - 0.03,
      anchor.cz + b.bD / 2 + (P?.rs || 3) + trotuarD / 2
    );
    trotuar.receiveShadow = true;
    terrainGroup.add(trotuar);

    // Stradă (asfalt întunecat)
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x2A2E35, roughness: 0.9, metalness: 0.1,
    });
    const road = new THREE.Mesh(
      new THREE.BoxGeometry(trotuarW + 20, 0.04, 6.5),
      roadMat
    );
    road.position.set(
      anchor.cx,
      anchor.baseY - 0.02,
      anchor.cz + b.bD / 2 + (P?.rs || 3) + trotuarD + 3.25
    );
    road.receiveShadow = true;
    terrainGroup.add(road);

    // Marcaje stradă (linii albe punctate)
    const lineMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF, roughness: 0.7, metalness: 0,
      transparent: true, opacity: 0.7,
    });
    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue;
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 0.02, 0.15),
        lineMat
      );
      line.position.set(
        anchor.cx + i * 4,
        anchor.baseY,
        road.position.z
      );
      terrainGroup.add(line);
    }

    state.scene.add(terrainGroup);
    state._terrainGroup = terrainGroup;
  }

  // ── B4. Lumini ferestre la modul Noapte ──────────────────────────────
  function _B4_nightLights() {
    // Hook pe selectorul de iluminare din viewer 3D
    const lightSel = document.getElementById('v3d-light');
    if (!lightSel || lightSel._nightHooked) return;
    lightSel._nightHooked = true;

    const _updateNightMode = (val) => {
      const state = window.VTour?._state;
      if (!state?.scene) return;
      const THREE = window.THREE;
      const isNight = val === 'night';

      // Schimbăm culoarea cerului
      if (state.scene.background) {
        state.scene.background = new THREE.Color(
          isNight ? 0x060A14 : 0xc5dff0
        );
      }

      // Adăugăm/ștergem lumini ferestre
      if (isNight && !state._windowLights) {
        state._windowLights = _addWindowLights(state, THREE);
      } else if (!isNight && state._windowLights) {
        state._windowLights.forEach(l => state.scene.remove(l));
        state._windowLights = null;
      }

      // Ajustăm soarele
      state.scene.traverse(obj => {
        if (obj.isDirectionalLight && obj.castShadow) {
          obj.intensity = isNight ? 0.1 : 2.4;
          obj.color.set(isNight ? 0x203040 : 0xfff4e0);
        }
        if (obj.isHemisphereLight) {
          obj.intensity = isNight ? 0.1 : 0.55;
        }
      });
    };

    lightSel.addEventListener('change', (e) => _updateNightMode(e.target.value));

    // Și butonul inline
    const inlineSel = document.getElementById('ts-solar-inline');
    if (inlineSel) inlineSel.style.display = 'none'; // ascundem slider soare la noapte
  }

  function _addWindowLights(state, THREE) {
    const anchor = window._rvGetAnchor?.() || state._anchor;
    if (!anchor) return [];
    const b = window._RV?.building;
    if (!b) return [];

    const lights = [];
    const hNiv = b.P?.hn || 3;

    for (let floor = 0; floor < b.niv; floor++) {
      const y = anchor.baseY + floor * hNiv + hNiv * 0.5;
      const nLights = Math.max(2, Math.floor(b.bW / 4));

      for (let i = 0; i < nLights; i++) {
        const x = anchor.cx - b.bW/2 + (i + 0.5) * (b.bW / nLights);
        const light = new THREE.PointLight(0xFFE8A0, 0.6, 8);
        light.position.set(x, y, anchor.cz - b.bD/2 - 0.3);
        state.scene.add(light);
        lights.push(light);
      }
    }
    return lights;
  }

  // ── B5. Hover highlight apartament ────────────────────────────────────
  function _B5_highlightApt(aptIdx) {
    const state = window.VTour?._state;
    if (!state?.dollhouseGroup) return;
    const THREE = window.THREE;

    state.dollhouseGroup.traverse(obj => {
      if (!obj.isMesh) return;
      if (aptIdx !== null && obj.userData?.aptIdx === aptIdx) {
        // Highlight
        if (!obj._origMat) obj._origMat = obj.material;
        obj.material = new THREE.MeshStandardMaterial({
          color: 0xFFD700,
          roughness: 0.6,
          metalness: 0.1,
          transparent: true,
          opacity: 0.85,
          emissive: 0xFFD700,
          emissiveIntensity: 0.15,
        });
      } else if (obj._origMat) {
        // Reset
        obj.material = obj._origMat;
        obj._origMat = null;
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // GRUP C — 3D FLOOR PLAN
  // ═══════════════════════════════════════════════════════════════════════

  function _patchC_FloorPlan() {
    if (window._VISUAL_FP_PATCHED) return;
    window._VISUAL_FP_PATCHED = true;

    // Hook pe VTour.start — adăugăm labels după build
    const origStart = window.VTour?.start;
    if (!origStart) return;

    if (!window._VISUAL_FP_HOOKED) {
      window._VISUAL_FP_HOOKED = true;
      const orig = window.VTour.start;
      window.VTour.start = function () {
        const r = orig.apply(this, arguments);
        setTimeout(_C1_addRoomLabels, 1600);
        setTimeout(_C2_addFloorPlanClick, 1700);
        return r;
      };
    }
  }

  // ── C1. Label-uri camere floating (overlay CSS) ────────────────────────
  function _C1_addRoomLabels() {
    const state = window.VTour?._state;
    if (!state?.scene || !state?.renderer || !state?.camera) return;

    const THREE = window.THREE;
    const RV = window._RV;
    if (!RV?.floors) return;

    const anchor = window._rvGetAnchor?.() || state._anchor;
    if (!anchor) return;
    const b  = RV.building;
    const ox = anchor.cx - b.bW / 2;
    const oz = anchor.cz - b.bD / 2;
    const hNiv = b.P?.hn || 3;

    // Container labels (overlay pe canvas)
    let labelContainer = document.getElementById('vtour-labels');
    if (!labelContainer) {
      labelContainer = document.createElement('div');
      labelContainer.id = 'vtour-labels';
      labelContainer.style.cssText = `
        position:absolute;inset:0;pointer-events:none;overflow:hidden;
      `;
      const ctn = document.getElementById('vtour-s1-canvas-ctn');
      if (ctn) { ctn.style.position = 'relative'; ctn.appendChild(labelContainer); }
    }
    labelContainer.innerHTML = '';

    const labelsData = [];
    const shownFloor = RV.floorIdx || 0; // arătăm labeluri doar pentru etajul selectat

    RV.floors[shownFloor]?.rects?.forEach(r => {
      if (r.bal || r.w * r.h < 4) return;
      const typeLabels = {
        living:'Living', bedroom:'Dormitor', bedroom2:'Dormitor',
        kitchen:'Bucătărie', bath:'Baie', wc:'WC',
        hall:'Hol', office:'Birou', reception:'Recepție',
        core:'Scări/Lift', storage:'Depozit',
      };
      const lbl = typeLabels[r.t] || r.t;
      const wx = ox + r.x + r.w / 2;
      const wz = oz + r.y + r.h / 2;
      const wy = anchor.baseY + shownFloor * hNiv + hNiv * 0.3;
      labelsData.push({ wx, wy, wz, lbl, area: (r.w * r.h).toFixed(1) });
    });

    // Actualizăm pozițiile în fiecare frame
    const updateLabels = () => {
      if (!document.getElementById('vtour-labels')) return;
      const canvas  = state.canvas || state.renderer?.domElement;
      if (!canvas) return;
      const rect    = canvas.getBoundingClientRect();

      labelsData.forEach((data, i) => {
        let el = document.getElementById('vl-' + i);
        if (!el) {
          el = document.createElement('div');
          el.id = 'vl-' + i;
          el.style.cssText = `
            position:absolute;transform:translate(-50%,-50%);
            background:rgba(8,14,30,.82);border:1px solid rgba(212,175,55,.3);
            border-radius:6px;padding:3px 7px;pointer-events:none;
            font:700 9px IBM Plex Mono,monospace;color:#F5C518;
            white-space:nowrap;text-align:center;line-height:1.4;
            transition:opacity .2s;
          `;
          labelContainer.appendChild(el);
        }

        // Proiectăm coordonata 3D pe ecran
        const pos3D = new THREE.Vector3(data.wx, data.wy, data.wz);
        pos3D.project(state.camera);

        const sx = (pos3D.x * 0.5 + 0.5) * rect.width;
        const sy = (-pos3D.y * 0.5 + 0.5) * rect.height;
        const vis = pos3D.z < 1;

        el.style.left = sx + 'px';
        el.style.top  = sy + 'px';
        el.style.opacity = vis ? '1' : '0';
        el.innerHTML = data.lbl + '<br><span style="color:#94A3B8;font-size:8px">' + data.area + ' m²</span>';
      });
    };

    // Adăugăm în render loop
    if (!state._labelUpdate) {
      const origRaf = state.raf;
      const labelLoop = () => {
        updateLabels();
        state._labelRafId = requestAnimationFrame(labelLoop);
      };
      state._labelRafId = requestAnimationFrame(labelLoop);
      state._labelUpdate = true;

      // Cleanup la stop
      const origStop = window.VTour.stop;
      window.VTour.stop = function () {
        if (state._labelRafId) cancelAnimationFrame(state._labelRafId);
        document.getElementById('vtour-labels')?.remove();
        state._labelUpdate = false;
        return origStop.apply(this, arguments);
      };
    }
  }

  // ── C2. Click cameră în 3D Floor Plan → popup ─────────────────────────
  function _C2_addFloorPlanClick() {
    const state = window.VTour?._state;
    if (!state?.canvas || state._fpClickAdded) return;
    state._fpClickAdded = true;

    const THREE = window.THREE;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let _lastDown = { x: 0, y: 0 };

    state.canvas.addEventListener('mousedown', e => {
      _lastDown = { x: e.clientX, y: e.clientY };
    });

    state.canvas.addEventListener('mouseup', e => {
      const moved = Math.hypot(e.clientX - _lastDown.x, e.clientY - _lastDown.y);
      if (moved > 5) return; // era drag

      const rect = state.canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, state.camera);
      const hits = raycaster.intersectObjects(state.scene.children, true);

      let found = null;
      for (const h of hits) {
        let obj = h.object;
        while (obj) {
          if (obj.userData?.roomType) { found = obj; break; }
          obj = obj.parent;
        }
        if (found) break;
      }

      if (found) {
        _showRoomPopup(found.userData, new THREE.Vector3(), e.clientX, e.clientY);
      }
    });
  }

})();
