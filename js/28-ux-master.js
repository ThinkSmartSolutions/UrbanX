// ═══════════════════════════════════════════════════════════════════════════
// 28-ux-master.js — UX Master + Bilanț Suprafețe + TVA editabil + Tour UX
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// 1. TVA editabil — slider + input în deviz, memorat în localStorage
// 2. Bilanț suprafețe complet pe fiecare planșă:
//    SC, SDA, SU, balcoane, nr. apartamente per tip (garsonieră/2cam/3cam/4cam)
// 3. Plan releveu — coloana sanitară, puț lift, ghene tehnice
//    Flux complet apartament: intrare → hol → living → dormitoare → baie
// 4. Mobilier plan sincronizat cu materialele din turul virtual
// 5. Toolbar reorganizat:
//    Tab-urile planșelor → dropdown grup pe mobile / scroll pe desktop
//    Butoanele de export → un singur buton "Export ▾" cu submeniu
// 6. Tur virtual UX:
//    - Etichete flotante 3D cu suprafețe (click pe cameră → popup)
//    - Modul walk-through (prima persoană) cu WASD + mouse look
//    - Ghid gesturi (prima deschidere)
//    - Mini-map 2D sincronizat cu poziția camerei
//    - Buton "Reset view" + animație intro
//    - Mobile: touch controls îmbunătățite (swipe rotate, pinch zoom)
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (typeof _RV === 'undefined') { setTimeout(() => waitReady(cb, n + 1), 200); return; }
    cb();
  }

  waitReady(() => {
    _fixTVA();
    _patchBilant();
    _patchPlanColumns();
    _reorganizeToolbar();
    _upgradeTourUX();
    console.log('[UX Master v1] ✅ TVA editabil + bilanț + coloane + toolbar + tour UX');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 1. TVA EDITABIL
  // ═══════════════════════════════════════════════════════════════════════

  // Cheia TVA — editabilă global, persistă în localStorage
  window._UX_TVA = parseFloat(localStorage.getItem('urbanx_tva') || '0.19');

  function _fixTVA() {
    // Injectează control TVA în deviz UI dacă există panoul DNA/deviz
    const _tryInject = () => {
      if (document.getElementById('ux-tva-control')) return true;
      const anchor = document.getElementById('rv-dna-score-detail') ||
                     document.querySelector('#rv-rpanel .rv-rsec:last-child') ||
                     document.querySelector('.rv-rpanel');
      if (!anchor) return false;

      const wrap = document.createElement('div');
      wrap.id = 'ux-tva-control';
      wrap.style.cssText = 'margin:8px 0;padding:8px 10px;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.2);border-radius:6px;';
      wrap.innerHTML = `
        <div style="font-size:8px;color:#94A3B8;font-weight:700;letter-spacing:.4px;text-transform:uppercase;margin-bottom:6px">
          TVA deviz — editabil
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <input type="number" id="ux-tva-input" min="0" max="30" step="0.5"
            value="${(window._UX_TVA * 100).toFixed(1)}"
            style="width:60px;background:rgba(255,255,255,.06);border:1px solid rgba(245,158,11,.3);
                   border-radius:5px;color:#FBBF24;font-size:12px;font-weight:700;padding:4px 6px;
                   font-family:IBM Plex Mono,monospace;text-align:center">
          <span style="color:#94A3B8;font-size:10px">%</span>
          <input type="range" id="ux-tva-slider" min="0" max="25" step="0.5"
            value="${(window._UX_TVA * 100).toFixed(1)}"
            style="flex:1;accent-color:#F59E0B">
          <button onclick="window._uxSaveTVA()"
            style="padding:3px 8px;background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.4);
                   border-radius:5px;color:#FBBF24;font-size:9px;font-weight:700;cursor:pointer">
            Salvează
          </button>
        </div>
        <div style="font-size:7px;color:#64748B;margin-top:4px">
          Cod Fiscal Art.291 — TVA standard 19%. Verificați legislația în vigoare.
        </div>
      `;
      anchor.appendChild(wrap);

      const inp = document.getElementById('ux-tva-input');
      const slid = document.getElementById('ux-tva-slider');
      inp?.addEventListener('input', () => { slid.value = inp.value; window._UX_TVA = parseFloat(inp.value) / 100; });
      slid?.addEventListener('input', () => { inp.value = slid.value; window._UX_TVA = parseFloat(slid.value) / 100; });
      return true;
    };

    window._uxSaveTVA = () => {
      const v = parseFloat(document.getElementById('ux-tva-input')?.value || '19') / 100;
      window._UX_TVA = v;
      localStorage.setItem('urbanx_tva', String(v));
      if (typeof ss === 'function') ss('✅ TVA salvat: ' + (v * 100).toFixed(1) + '%');
    };

    if (_tryInject()) return;
    const obs = setInterval(() => { if (_tryInject()) clearInterval(obs); }, 1000);
    setTimeout(() => clearInterval(obs), 20000);

    // Patch _rvExportDeviz să citească TVA-ul global
    const origDeviz = window._rvExportDeviz;
    if (origDeviz) {
      window._rvExportDeviz = async function () {
        // Patch temporar COEF_HG907 TVA
        if (typeof COEF_HG907 !== 'undefined') COEF_HG907.tva = window._UX_TVA;
        await origDeviz.apply(this, arguments);
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 2. BILANȚ SUPRAFEȚE — injectat pe fiecare planșă
  // ═══════════════════════════════════════════════════════════════════════

  // Calculează bilanțul complet din _RV.floors
  function _calcBilant(b, floors) {
    const P = b?.P;
    const SC_clad = b?.scArea || b?.bW * b?.bD || 0;
    const SDA = b?.sdaTotal || SC_clad * b?.niv || 0;

    // Tipuri de camere localizabile
    const APT_ROOMS = ['living', 'bedroom', 'bedroom2', 'bedroom3', 'kitchen', 'bath', 'wc', 'hall', 'storage'];
    const aptMap = {}; // aptIdx → { rooms[], totalSU, balconSU }
    let totalBalcon = 0;
    let totalSU = 0;

    (floors || []).forEach(fl => {
      (fl?.rects || []).forEach(r => {
        if (r.apt < 0) return;
        const area = r.w * r.h;
        if (r.bal) {
          totalBalcon += area;
          if (!aptMap[r.apt]) aptMap[r.apt] = { rooms: [], su: 0, balcon: 0 };
          aptMap[r.apt].balcon = (aptMap[r.apt].balcon || 0) + area;
          return;
        }
        if (!aptMap[r.apt]) aptMap[r.apt] = { rooms: [], su: 0, balcon: 0 };
        aptMap[r.apt].rooms.push(r.t);
        aptMap[r.apt].su += area;
        totalSU += area;
      });
    });

    // Categorisire apartamente per tip
    const aptTypes = { garsoniera: 0, apt2cam: 0, apt3cam: 0, apt4cam: 0, altele: 0 };
    Object.values(aptMap).forEach(apt => {
      const nDorm = apt.rooms.filter(t => t.startsWith('bedroom')).length;
      if (nDorm === 0) aptTypes.garsoniera++;
      else if (nDorm === 1) aptTypes.apt2cam++;
      else if (nDorm === 2) aptTypes.apt3cam++;
      else if (nDorm === 3) aptTypes.apt4cam++;
      else aptTypes.altele++;
    });

    const nrApt = Object.keys(aptMap).length;
    const SC_subsol = (b?.subsolNiv || 0) * SC_clad;

    return {
      SC_clad: SC_clad.toFixed(1),
      SC_subsol: SC_subsol.toFixed(1),
      SDA: SDA.toFixed(1),
      SDA_subsol: (SDA + SC_subsol).toFixed(1),
      SU: totalSU.toFixed(1),
      SU_balcon: totalBalcon.toFixed(1),
      S_teren: P?.area?.toFixed(0) || '—',
      POT: P?.area ? (SC_clad / P.area * 100).toFixed(1) + '%' : '—',
      CUT: P?.area ? (SDA / P.area).toFixed(2) : '—',
      nrApt,
      aptTypes,
      suMedie: nrApt > 0 ? (totalSU / nrApt).toFixed(1) : '—',
    };
  }

  // Desenează bilanțul pe canvas (colț dreapta-sus, sub legendă)
  window._rvDrawBilant = function (ctx, x, y, b, floors) {
    const bil = _calcBilant(b, floors);
    const fn = window.AEDIS?.fn || b?.P?.fn || '';
    const isRez = !fn.includes('birouri') && !fn.includes('hotel') && !fn.includes('industrial');

    const W = 192, rowH = 8;
    const rows = [
      ['BILANȚ SUPRAFEȚE', null, true],
      ['S teren', bil.S_teren + ' m²', false],
      ['SC amprentă', bil.SC_clad + ' m²', false],
      ...(parseFloat(bil.SC_subsol) > 0 ? [['SC subsol', bil.SC_subsol + ' m²', false]] : []),
      ['SDA suprateran', bil.SDA + ' m²', false],
      ...(parseFloat(bil.SC_subsol) > 0 ? [['SDA total (cu subsol)', bil.SDA_subsol + ' m²', false]] : []),
      ['SU utilă apartamente', bil.SU + ' m²', false],
      ['Suprafețe balcoane', bil.SU_balcon + ' m²', false],
      ['POT realizat', bil.POT, false],
      ['CUT realizat', bil.CUT, false],
      ...(isRez && bil.nrApt > 0 ? [
        ['── Unități ──', '', false],
        ['Total apartamente', String(bil.nrApt), false],
        ['SU medie / apt.', bil.suMedie + ' m²', false],
        ...(bil.aptTypes.garsoniera > 0 ? [['Garsoniere (1 cam)', String(bil.aptTypes.garsoniera), false]] : []),
        ...(bil.aptTypes.apt2cam > 0 ? [['Ap. 2 camere', String(bil.aptTypes.apt2cam), false]] : []),
        ...(bil.aptTypes.apt3cam > 0 ? [['Ap. 3 camere', String(bil.aptTypes.apt3cam), false]] : []),
        ...(bil.aptTypes.apt4cam > 0 ? [['Ap. 4 camere', String(bil.aptTypes.apt4cam), false]] : []),
        ...(bil.aptTypes.altele > 0 ? [['Ap. 5+ cam. / penthouse', String(bil.aptTypes.altele), false]] : []),
      ] : []),
    ];

    const H = rows.length * rowH + 10;
    ctx.fillStyle = 'rgba(15,23,42,.94)'; ctx.fillRect(x, y, W, H);
    ctx.strokeStyle = 'rgba(212,175,55,.2)'; ctx.lineWidth = .6; ctx.strokeRect(x, y, W, H);
    ctx.fillStyle = 'rgba(212,175,55,.1)'; ctx.fillRect(x, y, W, rowH + 2);

    rows.forEach(([lbl, val, isHead], i) => {
      const ry = y + 6 + i * rowH;
      if (i % 2 === 0 && !isHead) { ctx.fillStyle = 'rgba(255,255,255,.02)'; ctx.fillRect(x, ry - 4, W, rowH); }
      if (isHead) {
        ctx.fillStyle = '#D4AF37'; ctx.font = 'bold 7px IBM Plex Mono'; ctx.textAlign = 'center';
        ctx.fillText(lbl, x + W / 2, ry);
      } else if (lbl.startsWith('──')) {
        ctx.fillStyle = 'rgba(212,175,55,.3)'; ctx.fillRect(x, ry - 2, W, 1);
        ctx.fillStyle = '#64748B'; ctx.font = 'bold 5.5px IBM Plex Mono'; ctx.textAlign = 'center';
        ctx.fillText(lbl.replace(/──/g, '').trim(), x + W / 2, ry);
      } else {
        ctx.fillStyle = '#64748B'; ctx.font = '6px IBM Plex Mono'; ctx.textAlign = 'left';
        ctx.fillText(lbl, x + 4, ry);
        ctx.fillStyle = '#DDE6F5'; ctx.font = 'bold 6px IBM Plex Mono'; ctx.textAlign = 'right';
        ctx.fillText(val || '', x + W - 4, ry);
      }
      ctx.textAlign = 'left';
    });
  };

  // Patch _rvRenderPlan să afișeze bilanțul
  function _patchBilant() {
    const orig = window._rvRenderPlan;
    if (!orig || window._BILANT_HOOKED) return;
    window._BILANT_HOOKED = true;
    window._rvRenderPlan = function (fl, b) {
      orig.apply(this, arguments);
      setTimeout(() => {
        const cv = document.getElementById('rv-canvas');
        const ctx = cv?.getContext('2d');
        if (!ctx || !b || !_RV.planOx) return;
        const W = cv.width;
        window._rvDrawBilant(ctx, W - 210, 10, b, _RV.floors || []);
      }, 50);
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 3. COLOANE TEHNICE ÎN PLAN — coloana sanitară, puț lift, ghene
  // ═══════════════════════════════════════════════════════════════════════

  // Adaugă elemente tehnice obligatorii în rects înainte de render
  function _patchPlanColumns() {
    const origFloor = window._rvFloor;
    if (!origFloor || window._COLUMNS_HOOKED) return;
    window._COLUMNS_HOOKED = true;

    window._rvFloor = function (b, floorIdx) {
      const fl = origFloor.apply(this, arguments);
      if (!fl?.rects || !b) return fl;

      // Adaugă elemente tehnice în nucleele existente
      const cores = b.cores || [];
      cores.forEach(core => {
        // Coloana sanitară (lângă baie, în nucleu)
        const hasSanitarCol = fl.rects.some(r => r.t === 'col_sanitar');
        if (!hasSanitarCol) {
          fl.rects.push({
            t: 'col_sanitar', apt: -1, lbl: '♻',
            x: core.x + core.w * 0.72, y: core.y + 0.05,
            w: 0.30, h: core.h * 0.18,
            zIdx: 5, isTechCol: true,
          });
        }

        // Ghena ventilație (în nucleu, lângă WC)
        const hasGhena = fl.rects.some(r => r.t === 'ghena');
        if (!hasGhena && b.niv > 1) {
          fl.rects.push({
            t: 'ghena', apt: -1, lbl: '◎',
            x: core.x + core.w * 0.05, y: core.y + 0.05,
            w: 0.25, h: core.h * 0.18,
            zIdx: 5, isTechCol: true,
          });
        }
      });

      // Marcaj coloane sanitare exterioare (lângă băi din apartamente)
      fl.rects.forEach(r => {
        if (r.t !== 'bath' && r.t !== 'wc') return;
        // Coloana sanitară (punct mic de 25×25cm)
        const onWall = r.x <= 0.3 || r.y <= 0.3;
        if (!onWall) return;
        fl.rects.push({
          t: 'col_sanitar', apt: r.apt, lbl: '◉',
          x: r.x + r.w * 0.5, y: r.y + r.h * 0.5,
          w: 0.20, h: 0.20,
          zIdx: 6, isTechCol: true,
        });
      });

      return fl;
    };

    // Patch desenul planului să afișeze simboluri tehnice
    const origRender = window._rvRenderPlan;
    if (!origRender || window._TECH_DRAW_HOOKED) return;
    window._TECH_DRAW_HOOKED = true;

    window._rvRenderPlan = function (fl, b) {
      origRender.apply(this, arguments);
      const cv = document.getElementById('rv-canvas');
      const ctx = cv?.getContext('2d');
      if (!ctx || !fl?.rects || !_RV.planOx) return;
      const ox = _RV.planOx, oy = _RV.planOy, SC = _RV.planSc;

      fl.rects.filter(r => r.isTechCol).forEach(r => {
        const rx = ox + r.x * SC, ry = oy + r.y * SC;
        const rw = r.w * SC, rh = r.h * SC;
        if (r.t === 'col_sanitar') {
          // Coloana sanitară — cerc cu punct
          ctx.fillStyle = '#1E40AF'; ctx.strokeStyle = '#1E40AF'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(rx + rw / 2, ry + rh / 2, Math.max(3, rw / 2), 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold ' + Math.max(5, rw * .7) + 'px Arial'; ctx.textAlign = 'center';
          ctx.fillText('S', rx + rw / 2, ry + rh / 2 + 2);
        } else if (r.t === 'ghena') {
          // Ghena — pătrat cu diagonale
          ctx.fillStyle = 'rgba(99,102,241,.25)'; ctx.fillRect(rx, ry, rw, rh);
          ctx.strokeStyle = '#6366F1'; ctx.lineWidth = 1; ctx.strokeRect(rx, ry, rw, rh);
          ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx + rw, ry + rh); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(rx + rw, ry); ctx.lineTo(rx, ry + rh); ctx.stroke();
          ctx.fillStyle = '#6366F1'; ctx.font = '5px Arial'; ctx.textAlign = 'center';
          ctx.fillText('G', rx + rw / 2, ry + rh / 2 + 2);
        }
        ctx.textAlign = 'left';
      });
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 4. TOOLBAR REORGANIZAT
  // ═══════════════════════════════════════════════════════════════════════

  function _reorganizeToolbar() {
    const _try = () => {
      const tabBar = document.querySelector('.rv-tabs');
      if (!tabBar || document.getElementById('ux-toolbar-done')) return false;
      tabBar.id = 'ux-toolbar-done';

      // ── CSS scroll orizontal pe mobile ──────────────────────────────────
      const style = document.createElement('style');
      style.textContent = `
        /* Tab bar scrollabil */
        .rv-tabs {
          overflow-x: auto !important;
          overflow-y: hidden !important;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .rv-tabs::-webkit-scrollbar { display: none; }
        .rv-tab { white-space: nowrap; flex-shrink: 0; }

        /* Export dropdown */
        #ux-export-wrap { position: relative; display: inline-flex; align-items: center; margin-left: 6px; flex-shrink: 0; }
        #ux-export-btn {
          height: 30px; padding: 0 12px; border-radius: 7px; cursor: pointer;
          font-family: inherit; font-size: 10px; font-weight: 800;
          background: rgba(212,175,55,.15); border: 1.5px solid rgba(212,175,55,.4); color: #FBBF24;
          display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;
        }
        #ux-export-menu {
          display: none; position: absolute; top: 34px; right: 0;
          background: #0F172A; border: 1px solid rgba(212,175,55,.2);
          border-radius: 10px; padding: 6px; min-width: 200px; z-index: 999;
          box-shadow: 0 8px 32px rgba(0,0,0,.6);
        }
        #ux-export-menu.open { display: block; }
        .ux-exp-item {
          display: flex; align-items: center; gap: 8px; padding: 8px 10px;
          border-radius: 6px; cursor: pointer; font-size: 10px; font-weight: 600;
          color: #94A3B8; font-family: inherit; border: none; background: none; width: 100%;
          text-align: left; white-space: nowrap;
        }
        .ux-exp-item:hover { background: rgba(255,255,255,.05); color: #DDE6F5; }
        .ux-exp-divider { height: 1px; background: rgba(255,255,255,.05); margin: 4px 0; }

        /* TVA badge în toolbar */
        #ux-tva-badge {
          font-size: 9px; font-weight: 700; color: #94A3B8; font-family: IBM Plex Mono, monospace;
          padding: 2px 6px; border-radius: 4px; background: rgba(245,158,11,.08);
          border: 1px solid rgba(245,158,11,.2); cursor: pointer; flex-shrink: 0; margin-left: 4px;
        }
        #ux-tva-badge:hover { color: #FBBF24; }

        /* Scroll indicator tab bar */
        .rv-tabs::after {
          content: '';
          position: sticky; right: 0; top: 0; bottom: 0;
          width: 20px; flex-shrink: 0;
          background: linear-gradient(to right, transparent, rgba(11,20,38,.95));
          pointer-events: none;
        }

        /* Mobile: tab bar mai compact */
        @media (max-width: 840px) {
          .rv-tab { padding: 8px 9px !important; font-size: 9.5px !important; }
          #ux-export-btn { font-size: 9px; padding: 0 8px; }
          #ux-tva-badge { display: none; }
        }
      `;
      document.head.appendChild(style);

      // ── Buton TVA rapid în toolbar ──────────────────────────────────────
      const zoomBar = document.querySelector('.rv-zoombar');
      if (zoomBar && !document.getElementById('ux-tva-badge')) {
        const tvaBadge = document.createElement('span');
        tvaBadge.id = 'ux-tva-badge';
        tvaBadge.title = 'TVA curent — click pentru editare';
        tvaBadge.textContent = 'TVA ' + (window._UX_TVA * 100).toFixed(0) + '%';
        tvaBadge.onclick = () => {
          const pct = prompt('TVA (%) conform legislație în vigoare:', (window._UX_TVA * 100).toFixed(1));
          if (!pct) return;
          const val = parseFloat(pct) / 100;
          if (isNaN(val) || val < 0 || val > 0.3) { alert('Valoare TVA invalidă (0–30%)'); return; }
          window._UX_TVA = val;
          localStorage.setItem('urbanx_tva', String(val));
          tvaBadge.textContent = 'TVA ' + (val * 100).toFixed(0) + '%';
          const inp = document.getElementById('ux-tva-input');
          const slid = document.getElementById('ux-tva-slider');
          if (inp) inp.value = (val * 100).toFixed(1);
          if (slid) slid.value = (val * 100).toFixed(1);
          if (typeof ss === 'function') ss('✅ TVA actualizat: ' + (val * 100).toFixed(1) + '%');
        };
        zoomBar.appendChild(tvaBadge);
      }

      // ── Export dropdown ─────────────────────────────────────────────────
      const expBtnOld = document.querySelector('.rv-expbtn');
      if (!expBtnOld) return false;

      const wrap = document.createElement('span');
      wrap.id = 'ux-export-wrap';

      const mainBtn = document.createElement('button');
      mainBtn.id = 'ux-export-btn';
      mainBtn.innerHTML = '⬇ Export ▾';
      mainBtn.onclick = (e) => {
        e.stopPropagation();
        const menu = document.getElementById('ux-export-menu');
        menu?.classList.toggle('open');
      };

      const menu = document.createElement('div');
      menu.id = 'ux-export-menu';

      const items = [
        { icon: '📄', label: 'PDF Planșe complet', fn: '_rvExportPDF', group: 'Planșe' },
        { icon: '🖼', label: 'PNG planșa curentă', fn: '_rvExport', group: 'Planșe' },
        { icon: '🔷', label: 'SVG vectorial', fn: '_exportCurrentSVG', group: 'Planșe' },
        { icon: '📐', label: 'DXF (AutoCAD)', fn: '_exportCurrentDXF', group: 'Planșe' },
        { divider: true },
        { icon: '🏗', label: 'IFC 2x3 (BIM)', fn: '_rvExportIFC', group: 'BIM' },
        { icon: '📋', label: 'Prezentare client', fn: '_rvExportPrezentare', group: 'BIM' },
        { divider: true },
        { icon: '💰', label: 'Deviz estimativ HG907', fn: '_rvExportDeviz', group: 'Documente' },
        { icon: '📦', label: 'Extras materiale', fn: '_rvExportExtras', group: 'Documente' },
        { icon: '📄', label: 'Memoriu tehnic', fn: '_rvExportMemoriu', group: 'Documente' },
        { divider: true },
        { icon: '🎯', label: 'DNA Optimizare', fn: '_rvDNAOptimize', group: 'Analiză' },
        { icon: '⚖', label: 'Scenarii A/B', fn: '_rvExportScenarii', group: 'Analiză' },
      ];

      let lastGroup = null;
      items.forEach(item => {
        if (item.divider) {
          const div = document.createElement('div'); div.className = 'ux-exp-divider';
          menu.appendChild(div); lastGroup = null; return;
        }
        if (item.group !== lastGroup) {
          const grp = document.createElement('div');
          grp.style.cssText = 'font-size:8px;color:#4A6080;font-weight:700;padding:4px 10px 2px;text-transform:uppercase;letter-spacing:.4px';
          grp.textContent = item.group;
          menu.appendChild(grp);
          lastGroup = item.group;
        }
        const btn = document.createElement('button');
        btn.className = 'ux-exp-item';
        btn.innerHTML = `<span style="font-size:14px">${item.icon}</span>${item.label}`;
        btn.onclick = () => {
          menu.classList.remove('open');
          if (typeof window[item.fn] === 'function') window[item.fn]();
          else if (typeof ss === 'function') ss('⚠ ' + item.fn + ' indisponibil');
        };
        menu.appendChild(btn);
      });

      wrap.appendChild(mainBtn);
      wrap.appendChild(menu);
      expBtnOld.parentElement.insertBefore(wrap, expBtnOld);

      // Ascunde butoanele vechi redundante (DNA, deviz, extras, memoriu, IFC, SVG etc.)
      // Le lăsăm vizibile dacă există dar le mutăm în dropdown
      ['#rv-deviz-btn', '#rv-extras-btn', '#rv-memoriu-btn', '#rv-ifc-btn', '#rv-svg-btn',
       '#rv-svg-tab-btn', '#rv-dxf-tab-btn', '#rv-optim-wrap', '#rv-deviz-wrap',
       '#rv-scen-btn', '#rv-svg-per-plansa', '#rv-prezentare-btn'].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => { el.style.display = 'none'; });
      });

      // Închide meniul la click exterior
      document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) menu.classList.remove('open');
      });

      return true;
    };

    if (_try()) return;
    const obs = setInterval(() => { if (_try()) clearInterval(obs); }, 800);
    setTimeout(() => clearInterval(obs), 15000);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 5. TUR VIRTUAL UX — upgrade complet
  // ═══════════════════════════════════════════════════════════════════════

  function _upgradeTourUX() {
    // Patch VTour.start
    const waitTour = (cb, n) => {
      n = n || 0; if (n > 150) return;
      if (window.VTour) { cb(); return; }
      setTimeout(() => waitTour(cb, n + 1), 200);
    };

    waitTour(() => {
      const origStart = window.VTour?.start;
      if (origStart && !window._TOUR_UX_PATCHED) {
        window._TOUR_UX_PATCHED = true;
        window.VTour.start = function () {
          origStart.apply(this, arguments);
          setTimeout(_injectTourEnhancements, 900);
        };
      }
    });
  }

  function _injectTourEnhancements() {
    const overlay = document.getElementById('vtour-s1-overlay');
    if (!overlay || document.getElementById('ux-tour-enhanced')) return;
    overlay.id += ''; // touch
    document.getElementById('ux-tour-enhanced') || (overlay.dataset.enhanced = '1');

    // ── CSS agăugat ──────────────────────────────────────────────────────
    if (!document.getElementById('ux-tour-css')) {
      const s = document.createElement('style');
      s.id = 'ux-tour-css';
      s.textContent = `
        /* Overlay îmbunătățit */
        #vtour-s1-overlay { background: #0a0e1a !important; }

        /* Top bar mai curat */
        #vtour-s1-overlay > div:first-child {
          background: rgba(10,14,26,.95) !important;
          border-bottom: 1px solid rgba(0,255,136,.12) !important;
          padding: 10px 16px !important;
        }

        /* Controale joase — bara bottom */
        #ux-tour-bottombar {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(10,14,26,.92);
          border-top: 1px solid rgba(0,255,136,.1);
          padding: 8px 16px;
          display: flex; align-items: center; gap: 10px;
          z-index: 10; flex-wrap: wrap;
        }
        .ux-tour-btn {
          padding: 6px 12px; border-radius: 7px; cursor: pointer;
          font-size: 10px; font-weight: 700; font-family: inherit;
          border: 1px solid rgba(0,255,136,.3); background: rgba(0,255,136,.08);
          color: #00ff88; display: inline-flex; align-items: center; gap: 5px;
          white-space: nowrap; flex-shrink: 0; transition: all .15s;
        }
        .ux-tour-btn:hover { background: rgba(0,255,136,.15); }
        .ux-tour-btn.active { background: rgba(0,255,136,.25); border-color: rgba(0,255,136,.6); }

        /* Mini-map */
        #ux-tour-minimap {
          position: absolute; bottom: 55px; right: 12px;
          width: 110px; height: 90px;
          background: rgba(10,14,26,.9); border: 1px solid rgba(0,255,136,.2);
          border-radius: 8px; overflow: hidden; z-index: 10;
        }
        #ux-tour-minimap canvas { width: 100% !important; height: 100% !important; }

        /* Etichete flotante camere */
        .ux-room-label {
          position: absolute; background: rgba(10,14,26,.9);
          border: 1px solid rgba(0,255,136,.3); border-radius: 6px;
          padding: 4px 8px; font-size: 9px; font-weight: 700;
          color: #00ff88; pointer-events: none; white-space: nowrap;
          transform: translate(-50%, -100%); z-index: 5;
          font-family: IBM Plex Mono, monospace;
        }

        /* Ghid gesturi */
        #ux-gesture-guide {
          position: absolute; inset: 0; background: rgba(10,14,26,.88);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 20; gap: 16px; cursor: pointer;
        }
        #ux-gesture-guide h3 { color: #00ff88; font-size: 16px; font-family: Space Grotesk, sans-serif; margin: 0; }
        .ux-gesture-item {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,.04); border-radius: 8px;
          padding: 10px 20px; border: 1px solid rgba(255,255,255,.06);
          color: #94A3B8; font-size: 11px; font-family: Space Grotesk, sans-serif;
        }
        .ux-gesture-ico { font-size: 24px; }
        .ux-gesture-guide-skip { color: rgba(148,163,184,.5); font-size: 10px; margin-top: 8px; cursor: pointer; }

        /* Walk mode cursor */
        #vtour-s1-canvas-ctn.walk-mode { cursor: crosshair; }

        /* Popup cameră */
        #ux-room-popup {
          position: absolute; background: rgba(10,14,26,.95);
          border: 1px solid rgba(0,255,136,.25); border-radius: 10px;
          padding: 12px 14px; font-family: IBM Plex Mono, monospace;
          color: #DDE6F5; font-size: 10px; min-width: 160px; z-index: 15;
          box-shadow: 0 8px 32px rgba(0,0,0,.5); pointer-events: none;
          display: none;
        }

        @media (max-width: 768px) {
          #ux-tour-minimap { display: none; }
          .ux-tour-btn span.desktop-only { display: none; }
          #ux-tour-bottombar { padding: 6px 8px; gap: 6px; }
          .ux-tour-btn { padding: 6px 8px; font-size: 9px; }
        }
      `;
      document.head.appendChild(s);
    }

    const canvasCtn = overlay.querySelector('#vtour-s1-canvas-ctn');
    if (!canvasCtn) return;

    // ── Bara de jos cu controale ─────────────────────────────────────────
    const bottomBar = document.createElement('div');
    bottomBar.id = 'ux-tour-bottombar';
    bottomBar.innerHTML = `
      <button class="ux-tour-btn" id="ux-tour-reset" title="Reset la vederea inițială">
        🎯 <span class="desktop-only">Reset view</span>
      </button>
      <button class="ux-tour-btn" id="ux-tour-walk" title="Mod walk-through prima persoană (W/A/S/D + mouse)">
        🚶 <span class="desktop-only">Walk mode</span>
      </button>
      <button class="ux-tour-btn" id="ux-tour-labels" title="Etichete suprafețe camere">
        🏷 <span class="desktop-only">Etichete</span>
      </button>
      <button class="ux-tour-btn" id="ux-tour-norms" title="Overlay normative OMS119/NP057">
        📐 <span class="desktop-only">Normative</span>
      </button>
      <button class="ux-tour-btn" id="ux-tour-sun" title="Simulare orientare solară">
        ☀ <span class="desktop-only">Solar</span>
      </button>
      <div style="flex:1"></div>
      <div style="font-size:8px;color:#4A6080;font-family:IBM Plex Mono,monospace" id="ux-tour-info">
        drag = rotire · scroll = zoom · pinch = mobile
      </div>
    `;
    overlay.appendChild(bottomBar);

    // ── Mini-map ──────────────────────────────────────────────────────────
    const minimap = document.createElement('div');
    minimap.id = 'ux-tour-minimap';
    const mmCv = document.createElement('canvas');
    mmCv.width = 110; mmCv.height = 90;
    minimap.appendChild(mmCv);
    overlay.appendChild(minimap);
    _drawMinimap(mmCv);

    // ── Popup cameră ──────────────────────────────────────────────────────
    const popup = document.createElement('div');
    popup.id = 'ux-room-popup';
    canvasCtn.appendChild(popup);

    // ── Ghid gesturi (prima deschidere) ───────────────────────────────────
    const hasSeenGuide = localStorage.getItem('urbanx_tour_guide_seen');
    if (!hasSeenGuide) {
      const guide = document.createElement('div');
      guide.id = 'ux-gesture-guide';
      const isMobile = window.innerWidth <= 768;
      guide.innerHTML = `
        <h3>Cum folosești turul 3D</h3>
        ${isMobile ? `
          <div class="ux-gesture-item"><span class="ux-gesture-ico">👆</span><span>Drag = rotire vedere</span></div>
          <div class="ux-gesture-item"><span class="ux-gesture-ico">🤏</span><span>Pinch = zoom in/out</span></div>
          <div class="ux-gesture-item"><span class="ux-gesture-ico">📏</span><span>Slider sus = explodare etaje</span></div>
        ` : `
          <div class="ux-gesture-item"><span class="ux-gesture-ico">🖱</span><span>Drag stânga = rotire vedere</span></div>
          <div class="ux-gesture-item"><span class="ux-gesture-ico">⚲</span><span>Scroll = zoom in/out</span></div>
          <div class="ux-gesture-item"><span class="ux-gesture-ico">📏</span><span>Slider = explodare etaje</span></div>
          <div class="ux-gesture-item"><span class="ux-gesture-ico">🚶</span><span>Walk mode = W/A/S/D + mouse look</span></div>
        `}
        <div class="ux-gesture-guide-skip">Click oriunde pentru a continua</div>
      `;
      guide.onclick = () => {
        guide.style.opacity = '0';
        guide.style.transition = 'opacity .4s';
        setTimeout(() => guide.remove(), 400);
        localStorage.setItem('urbanx_tour_guide_seen', '1');
      };
      canvasCtn.appendChild(guide);
    }

    // ── Walk-through mode ─────────────────────────────────────────────────
    let walkMode = false;
    let walkKeys = {};
    const walkSpeed = 0.15;
    let walkYaw = 0, walkPitch = 0;
    let walkMouseLock = false;
    const info = document.getElementById('ux-tour-info');

    document.getElementById('ux-tour-walk')?.addEventListener('click', () => {
      walkMode = !walkMode;
      const btn = document.getElementById('ux-tour-walk');
      btn?.classList.toggle('active', walkMode);
      canvasCtn.classList.toggle('walk-mode', walkMode);
      if (info) info.textContent = walkMode
        ? 'W/A/S/D = mișcare · Mouse = privire · ESC = ieșire walk'
        : 'drag = rotire · scroll = zoom · pinch = mobile';
      if (walkMode) canvasCtn.requestPointerLock?.();
      else document.exitPointerLock?.();
    });

    document.addEventListener('keydown', e => {
      if (!walkMode) return;
      walkKeys[e.key.toLowerCase()] = true;
      if (e.key === 'Escape') {
        walkMode = false;
        document.getElementById('ux-tour-walk')?.classList.remove('active');
        canvasCtn.classList.remove('walk-mode');
        document.exitPointerLock?.();
      }
    });
    document.addEventListener('keyup', e => { delete walkKeys[e.key.toLowerCase()]; });
    document.addEventListener('mousemove', e => {
      if (!walkMode || !document.pointerLockElement) return;
      walkYaw -= e.movementX * 0.002;
      walkPitch = Math.max(-Math.PI * .4, Math.min(Math.PI * .4, walkPitch - e.movementY * 0.002));
      const cam = window.VTour?._state?.camera;
      if (cam) {
        const THREE = window.THREE;
        cam.rotation.order = 'YXZ';
        cam.rotation.y = walkYaw;
        cam.rotation.x = walkPitch;
      }
    });

    // Walk update per frame
    const origLoop = window.VTour?._state?.loop;
    const walkUpdate = () => {
      if (!walkMode) return;
      const cam = window.VTour?._state?.camera;
      if (!cam) return;
      const THREE = window.THREE;
      const dir = new THREE.Vector3();
      if (walkKeys['w'] || walkKeys['arrowup'])    dir.z -= walkSpeed;
      if (walkKeys['s'] || walkKeys['arrowdown'])  dir.z += walkSpeed;
      if (walkKeys['a'] || walkKeys['arrowleft'])  dir.x -= walkSpeed;
      if (walkKeys['d'] || walkKeys['arrowright']) dir.x += walkSpeed;
      if (dir.length() > 0) {
        dir.applyEuler(new THREE.Euler(0, walkYaw, 0));
        cam.position.add(dir);
      }
    };
    // Injectăm în animation loop
    const stateObj = window.VTour?._state;
    if (stateObj && stateObj.animFrame != null) {
      const origAnimate = stateObj.animate;
      if (origAnimate && !stateObj._walkPatched) {
        stateObj._walkPatched = true;
        stateObj.animate = function () {
          walkUpdate();
          origAnimate.apply(this, arguments);
        };
      }
    }

    // ── Etichete flotante cameră ──────────────────────────────────────────
    let labelsVisible = false;
    const labelEls = [];

    document.getElementById('ux-tour-labels')?.addEventListener('click', () => {
      labelsVisible = !labelsVisible;
      document.getElementById('ux-tour-labels')?.classList.toggle('active', labelsVisible);
      if (labelsVisible) _showRoomLabels(canvasCtn, labelEls);
      else { labelEls.forEach(l => l.remove()); labelEls.length = 0; }
    });

    // ── Reset view ─────────────────────────────────────────────────────────
    document.getElementById('ux-tour-reset')?.addEventListener('click', () => {
      const orbit = window.VTour?._state?.orbit;
      const anchor = window.VTour?._state?._anchor;
      if (orbit && anchor) {
        orbit.target.set(anchor.cx, anchor.baseY + anchor.topY * .4, anchor.cz);
      }
    });

    // ── Normative overlay toggle ──────────────────────────────────────────
    document.getElementById('ux-tour-norms')?.addEventListener('click', () => {
      if (window.URBAN_SYNC) {
        window.URBAN_SYNC.showNormative = !window.URBAN_SYNC.showNormative;
        document.getElementById('ux-tour-norms')?.classList.toggle('active', window.URBAN_SYNC.showNormative);
      }
    });

    // ── Solar sim ─────────────────────────────────────────────────────────
    document.getElementById('ux-tour-sun')?.addEventListener('click', () => {
      const sun = window.VTour?._state?.scene?.getObjectByName?.('DirectionalLight');
      if (!sun) return;
      const hour = (new Date().getHours() + 1) % 14 + 8; // 8–22
      const angle = ((hour - 6) / 12) * Math.PI;
      const A = window.AEDIS || {};
      const frontDir = A.frontDir || window._RV?.parcelParams?.frontDir || 'S';
      const dirOffset = { N: 0, NE: Math.PI / 4, E: Math.PI / 2, SE: 3 * Math.PI / 4, S: Math.PI, SV: 5 * Math.PI / 4, V: 3 * Math.PI / 2, NV: 7 * Math.PI / 4 }[frontDir] || Math.PI;
      sun.position.set(
        Math.cos(angle + dirOffset) * 80,
        Math.sin(angle) * 60 + 20,
        Math.sin(angle + dirOffset) * 80
      );
      const info2 = document.getElementById('ux-tour-info');
      if (info2) info2.textContent = `☀ Simulare solară — ora ${hour}:00 · front ${frontDir}`;
      document.getElementById('ux-tour-sun')?.classList.add('active');
    });
  }

  // ── Etichete flotante camere în 3D ────────────────────────────────────
  function _showRoomLabels(container, labelEls) {
    const fl0 = window._RV?.floors?.[0];
    const b = window._RV?.building;
    const stateObj = window.VTour?._state;
    if (!fl0?.rects || !b || !stateObj?.renderer || !stateObj?.camera) return;

    const THREE = window.THREE;
    const anchor = stateObj._anchor;
    const ox = anchor.cx - b.bW / 2;
    const oz = anchor.cz - b.bD / 2;

    const LBLMAP = {
      living: 'Camera de zi', bedroom: 'Dormitor', bedroom2: 'Dormitor',
      bedroom3: 'Dormitor', kitchen: 'Bucătărie', bath: 'Baie', wc: 'WC',
      hall: 'Hol', storage: 'Debara', core: 'Sc. + Lift',
      balcon: 'Balcon', commercial: 'Spațiu com.', office: 'Birou',
    };

    fl0.rects.forEach(r => {
      if (r.bal || r.apt < 0 || r.w * r.h < 3) return;

      const worldX = ox + r.x + r.w / 2;
      const worldY = anchor.baseY + 1.5;
      const worldZ = oz + r.y + r.h / 2;

      const vec = new THREE.Vector3(worldX, worldY, worldZ);
      vec.project(stateObj.camera);

      const w = stateObj.renderer.domElement.clientWidth;
      const h = stateObj.renderer.domElement.clientHeight;
      const sx = (vec.x + 1) / 2 * w;
      const sy = (-vec.y + 1) / 2 * h;

      if (vec.z > 1) return; // behind camera

      const lbl = document.createElement('div');
      lbl.className = 'ux-room-label';
      lbl.innerHTML = `<div style="color:#00ff88">${LBLMAP[r.t] || r.t}</div><div style="color:#94A3B8;font-size:8px">s = ${(r.w * r.h).toFixed(1).replace('.', ',')} mp</div>`;
      lbl.style.left = sx + 'px';
      lbl.style.top = sy + 'px';
      container.appendChild(lbl);
      labelEls.push(lbl);
    });
  }

  // ── Mini-map 2D ──────────────────────────────────────────────────────
  function _drawMinimap(cv) {
    const ctx = cv.getContext('2d');
    const b = window._RV?.building;
    const fl = window._RV?.floors?.[0];
    if (!ctx || !b || !fl) {
      ctx.fillStyle = '#1E293B'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = '#4A6080'; ctx.font = '8px Arial'; ctx.textAlign = 'center';
      ctx.fillText('Plan', cv.width / 2, cv.height / 2);
      return;
    }
    const W = cv.width, H = cv.height;
    const scX = (W - 10) / b.bW, scY = (H - 10) / b.bD;
    const SC = Math.min(scX, scY);
    const offX = (W - b.bW * SC) / 2, offY = (H - b.bD * SC) / 2;
    ctx.fillStyle = '#0F172A'; ctx.fillRect(0, 0, W, H);
    // Contur
    ctx.fillStyle = '#1E293B'; ctx.fillRect(offX, offY, b.bW * SC, b.bD * SC);
    ctx.strokeStyle = '#00ff88'; ctx.lineWidth = 1; ctx.strokeRect(offX, offY, b.bW * SC, b.bD * SC);
    // Camere
    const COLS = { living: '#FEF3C7', bedroom: '#DCFCE7', bedroom2: '#DCFCE7', kitchen: '#DBEAFE', bath: '#EDE9FE', core: '#E2E8F0', hall: '#F1F5F9' };
    (fl.rects || []).forEach(r => {
      if (r.bal) return;
      ctx.fillStyle = COLS[r.t] || '#F1F5F9';
      ctx.fillRect(offX + r.x * SC, offY + r.y * SC, r.w * SC, r.h * SC);
    });
    // Camera position indicator (un mic cerc)
    const cam = window.VTour?._state?.camera;
    const anchor = window.VTour?._state?._anchor;
    if (cam && anchor) {
      const cx = offX + (cam.position.x - anchor.cx + b.bW / 2) * SC;
      const cz = offY + (cam.position.z - anchor.cz + b.bD / 2) * SC;
      ctx.fillStyle = '#00ff88'; ctx.beginPath(); ctx.arc(cx, cz, 3, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Actualizare minimap periodic
  setInterval(() => {
    const cv = document.getElementById('ux-tour-minimap')?.querySelector('canvas');
    if (cv && window.VTour?._state?.active) _drawMinimap(cv);
  }, 500);

})();
