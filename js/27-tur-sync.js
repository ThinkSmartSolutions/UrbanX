/* ═══════════════════════════════════════════════════════════════════════════
   UrbanX · 27-tur-sync.js · v2.2 · 11 Iunie 2026
   ──────────────────────────────────────────────────────────────────────────
   FIX v2.1 — toate problemele identificate din audit + screenshots:

   FIX 1: _rvMixV2 — rezInd NUMAI dacă bW <= 18m (casă adevărată)
           dacă bW > 18m și fn=individuala → automat rezCol + avertizare
   FIX 2: Buton ✨ Tur Fotorealist injectat cu MutationObserver pe v3d-topbar
   FIX 3: Bara navigare niveluri în dollhouse (P/E1/E2/S-1) + Walk mode
   FIX 4: _rvFloor direct calls → interceptat prin _RV.floors override
   FIX 5: Mix sliders afișate/ascunse corect per funcțiune
   FIX 6: Avertizare vizuală când combinație fn+dimensiuni e imposibilă
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 300) return;
    if (typeof _RV !== 'undefined' && typeof _rvRenderPlan !== 'undefined') {
      cb(); return;
    }
    setTimeout(() => waitReady(cb, n + 1), 150);
  }

  // Guard global: patch _rvDetectBuildings dacă nu e definit (din 11-viewer3d.js)
  // Previne eroarea "not defined" la init rapid, înainte că 15-relevee.js să se execute
  (function _guardRvDetect() {
    if (typeof window._rvDetectBuildings !== 'undefined') return;
    var _guardInterval = setInterval(function() {
      if (typeof window._rvDetectBuildings !== 'undefined') {
        clearInterval(_guardInterval); return;
      }
      // Stub temporar până ce 15-relevee.js definește funcția reală
      if (!window._rvDetectBuildings) {
        window._rvDetectBuildings = function() {
          console.log('[RV bld] _rvDetectBuildings stub — 15-relevee.js nu e gata încă');
          return null;
        };
      }
    }, 200);
    // Curățăm după 30s
    setTimeout(function() { clearInterval(_guardInterval); }, 30000);
  })();

  waitReady(() => {
    _fix1_MixV2Override();
    _fix2_TurFotoButton();
    _fix3_DollhouseNavigation();
    _fix4_FloorDirectCalls();
    _fix5_MixSlidersVisibility();
    _fix6_FnDimensionWarning();
    _injectMobileUI();
    _exposeDebug();
    console.log('[TurSync v2.2] ✅ toate fix-urile aplicate');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 1 — _rvMixV2: rezInd numai pentru clădiri mici (casă reală)
  // ═══════════════════════════════════════════════════════════════════════
  function _fix1_MixV2Override() {
    // Suprascrie _rvMixV2 cu logică corectă
    window._rvMixV2 = function (P) {
      // PRIORITATE 1 — selectorul UI din relevee (_RV.fn setat de _rvSetFn)
      const rvFn = window._RV?.fn || '';
      if (rvFn === 'birouri')  return 'birouri';
      if (rvFn === 'hotel')    return 'hotel';
      if (rvFn === 'com')      return 'com';
      if (rvFn === 'rez')      return 'rezCol';
      if (rvFn && rvFn.startsWith('mixt')) return 'mixt';

      // PRIORITATE 2 — P.fn din parcela sau AEDIS
      const fnStr = String(P?.fn || window.AEDIS?.fn || '').toLowerCase();
      const b = _RV?.building;
      const niv = b?.niv || P?.niv || 4;
      const bW  = b?.bW  || P?.bW  || 20;

      if (fnStr.includes('birouri') || fnStr.includes('office'))       return 'birouri';
      if (fnStr.includes('hotel')   || fnStr.includes('cazare'))       return 'hotel';
      if (fnStr.includes('industrial') || fnStr.includes('depozit'))   return 'industrial';
      if (fnStr.includes('com') && !fnStr.includes('rezidential'))      return 'com';

      // CASA INDIVIDUALA: numai dacă e mică (max 18m lățime, max 3 niveluri)
      const isIndividuala = fnStr.includes('individuala') || fnStr.includes('vila') ||
                            fnStr.includes('duplex') || fnStr.includes('insiruit');
      if (isIndividuala && bW <= 18 && niv <= 3) return 'rezInd';

      // Clădire mică fără fn specificat explicit
      if (niv <= 2 && bW < 12) return 'rezInd';

      return 'rezCol';
    };

    // Patch și window._rvMix pentru compatibilitate
    window._rvMix = window._rvMixV2;
  // ── Sync _rvSetFn cu _rvMixV2 ────────────────────────────────────────────
  // Când utilizatorul schimbă funcțiunea din UI, re-generăm planul + mobilierul
  const _origSetFn = window._rvSetFn;
  if (_origSetFn && !window._SETFN_SYNC_HOOKED) {
    window._SETFN_SYNC_HOOKED = true;
    window._rvSetFn = function (fnKey) {
      _origSetFn.apply(this, arguments);
      // Re-trigger mobilier VTour după schimbare funcțiune
      if (window._FURNITURE_LOADED) {
        window._FURNITURE_LOADED = false;
        setTimeout(() => window._furnitureReload?.(), 800);
      }
      // Re-trigger PBR materials după schimbare stil/funcțiune
      if (window.VTour?._state?.scene) {
        setTimeout(() => window._upgradeMaterials?.(), 600);
      }
    };
  }

  }

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 2 — Buton ✨ Tur Fotorealist cu MutationObserver
  // v3d-topbar e creat dinamic la deschiderea viewer 3D
  // ═══════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════
  // TOPBAR REORGANIZAT — UX clar, fără duplicate
  // Desktop: Logo │ [☀▾] [🏙▾]  ⌂ 📏 P F T  │ [🔍 Explorare ▾] │ ✕
  // Mobil:   topbar minim + bara jos cu 3+1 butoane
  // ═══════════════════════════════════════════════════════════════════════

  function _fix2_TurFotoButton() {
    if (_tryInjectTopbar()) return;
    const obs = new MutationObserver(() => {
      if (_tryInjectTopbar()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 600000);
  }

  function _tryInjectTopbar() {
    const topbar = document.getElementById('v3d-topbar');
    if (!topbar || document.getElementById('ts-explore-btn')) return false;

    // ── 1. Ascundem rândul 3 (slider soare separat) — îl mutăm în dropdown ─
    const sunRow = document.getElementById('v3d-sun-row');
    if (sunRow) sunRow.style.display = 'none';

    // ── 2. Ascundem zoom +/- (redundant cu scroll) ───────────────────────
    topbar.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === '＋' || btn.textContent.trim() === '－') {
        btn.style.display = 'none';
      }
    });

    // ── 3. Ascundem bara verde Gaussian Splat din 27 (o mutăm în dropdown) ─
    const splatBar = document.querySelector('.ts-splat-bar, [style*="Gaussian Splat"]');
    if (splatBar && splatBar.id !== 'ts-mobile-action-bar') {
      // Căutăm bara verde dedicată
      document.querySelectorAll('button, div').forEach(el => {
        if (el.textContent?.trim() === '🌟 Gaussian Splat' && 
            el.id !== 'ts-explore-btn' && el.id !== 'mb-splat') {
          el.style.display = 'none';
        }
      });
    }

    // ── 4. Upgrade select iluminare — adaugă slider soare inline ─────────
    const lightSel = document.getElementById('v3d-light');
    if (lightSel && !lightSel._upgraded) {
      lightSel._upgraded = true;
      // Adăugăm slider soare după select (doar când nu e noapte)
      const solarWrap = document.createElement('div');
      solarWrap.id = 'ts-solar-inline';
      solarWrap.style.cssText = `
        display:flex;align-items:center;gap:6px;flex-shrink:0;
        background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.2);
        border-radius:8px;padding:3px 8px;
      `;
      solarWrap.innerHTML = `
        <span style="font-size:11px;color:#d4af37">☀</span>
        <input type="range" id="ts-sun-inline" min="6" max="20" step="0.5" value="12"
          style="width:80px;height:3px;accent-color:#d4af37;cursor:pointer"
          oninput="_v3dSetSunHour(parseFloat(this.value));document.getElementById('ts-sun-label').textContent=Math.floor(this.value)+':'+(this.value%1?'30':'00')">
        <span id="ts-sun-label" style="font-size:10px;color:#d4af37;min-width:28px">12:00</span>
      `;
      lightSel.parentNode.insertBefore(solarWrap, lightSel.nextSibling);
      // Sync cu slider-ul original
      const origSlider = document.getElementById('v3d-sun-slider');
      if (origSlider) {
        document.getElementById('ts-sun-inline').addEventListener('input', e => {
          origSlider.value = e.target.value;
        });
      }
    }

    // ── 5. Upgrade butoane P/F/L/T — adăugăm tooltip vizibil ─────────────
    const viewBtns = {
      'P': 'Perspectivă', 'F': 'Față', 'L': 'Lateral', 'T': 'Top'
    };
    topbar.querySelectorAll('button').forEach(btn => {
      const txt = btn.textContent.trim();
      if (viewBtns[txt] && !btn._labeled) {
        btn._labeled = true;
        btn.innerHTML = `<span style="font-size:9px;line-height:1">${viewBtns[txt]}</span>`;
        btn.style.minWidth = '44px';
        btn.style.fontSize = '9px';
      }
    });

    // ── 6. Buton dropdown EXPLORARE — toate acțiunile principale ──────────
    const row2 = topbar.querySelectorAll(':scope > div')[1] || topbar;

    // Separator vizual înainte de Explorare
    const sep = document.createElement('div');
    sep.style.cssText = 'width:1px;background:rgba(255,255,255,.12);height:24px;flex-shrink:0;margin:0 4px';
    row2.appendChild(sep);

    const exploreBtn = document.createElement('button');
    exploreBtn.id = 'ts-explore-btn';
    exploreBtn.innerHTML = '🔍 Explorare ▾';
    exploreBtn.style.cssText = `
      background:linear-gradient(135deg,rgba(99,102,241,.25),rgba(168,85,247,.2));
      color:#a78bfa;border:1px solid rgba(139,92,246,.5);border-radius:8px;
      padding:5px 14px;font-size:11px;font-weight:700;cursor:pointer;
      flex-shrink:0;min-height:36px;white-space:nowrap;
      position:relative;letter-spacing:.3px;
    `;

    // Dropdown menu
    const menu = document.createElement('div');
    menu.id = 'ts-explore-menu';
    menu.style.cssText = `
      position:fixed;top:0;left:0;z-index:999999;
      background:#0d1829;border:1px solid rgba(139,92,246,.4);
      border-radius:12px;padding:6px;min-width:200px;
      box-shadow:0 8px 32px rgba(0,0,0,.6);display:none;
    `;

    const menuItems = [
      { id:'mi-dollhouse', icon:'🏠', label:'Dollhouse',     sub:'Clădire explodată 3D',   color:'#00ff88', fn:() => document.getElementById('vtour-launch-btn')?.click() },
      { id:'mi-3dplan',    icon:'📐', label:'3D Floor Plan', sub:'Plan nivel interactiv',  color:'#60a5fa', fn:() => document.getElementById('vtour-fp-btn')?.click() },
      { sep: true },
      { id:'mi-tur',       icon:'✨', label:'Tur Fotorealist',sub:'Preview 360° instant',  color:'#c084fc', fn:() => typeof window._showTurFotoLauncher==='function'&&window._showTurFotoLauncher() },
      { id:'mi-render',    icon:'⭐', label:'Render HD',      sub:'Path tracing WebGL',    color:'#fbbf24', fn:() => typeof window._ptShowOverlay==='function'&&window._ptShowOverlay() },
      { id:'mi-splat',     icon:'🌟', label:'Gaussian Splat', sub:'Polycam / Luma AI',     color:'#4ade80', fn:() => typeof window._gsLaunch==='function'&&window._gsLaunch() },
      { sep: true },
      { id:'mi-glb',       icon:'📦', label:'Export GLB+BIM', sub:'3D + IFC structural',   color:'#818cf8', fn:() => typeof window._rvExportGLBSemantic==='function'&&window._rvExportGLBSemantic() },
    ];

    menuItems.forEach(item => {
      if (item.sep) {
        const s = document.createElement('div');
        s.style.cssText = 'height:1px;background:rgba(255,255,255,.08);margin:4px 0';
        menu.appendChild(s);
        return;
      }
      const el = document.createElement('button');
      el.id = item.id;
      el.style.cssText = `
        display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;
        background:transparent;border:none;border-radius:8px;cursor:pointer;
        color:#e2e8f0;font-family:inherit;text-align:left;
        transition:background .12s;
      `;
      el.innerHTML = `
        <span style="font-size:18px;width:24px;text-align:center">${item.icon}</span>
        <div>
          <div style="font-size:12px;font-weight:700;color:${item.color}">${item.label}</div>
          <div style="font-size:9px;color:#64748B;margin-top:1px">${item.sub}</div>
        </div>
      `;
      el.onmouseenter = () => el.style.background = 'rgba(255,255,255,.06)';
      el.onmouseleave = () => el.style.background = 'transparent';
      el.onclick = (e) => {
        e.stopPropagation();
        _closeExploreMenu();
        item.fn();
      };
      menu.appendChild(el);
    });

    document.body.appendChild(menu);

    // Toggle menu
    let _menuOpen = false;
    const _closeExploreMenu = () => {
      menu.style.display = 'none';
      _menuOpen = false;
      exploreBtn.innerHTML = '🔍 Explorare ▾';
    };

    exploreBtn.onclick = (e) => {
      e.stopPropagation();
      if (_menuOpen) { _closeExploreMenu(); return; }
      // Poziționăm meniul sub buton
      const r = exploreBtn.getBoundingClientRect();
      menu.style.top = (r.bottom + 6) + 'px';
      menu.style.left = Math.max(8, r.left - 40) + 'px';
      menu.style.display = 'block';
      _menuOpen = true;
      exploreBtn.innerHTML = '🔍 Explorare ▲';
    };

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== exploreBtn) _closeExploreMenu();
    });

    row2.appendChild(exploreBtn);

    // ── 7. Ascundem butoanele individuale injectate de alte module ─────────
    // Le înlocuim cu itemele din dropdown Explorare
    const toHide = ['vtour-launch-btn','vtour-fp-btn','ts-tur-foto-btn','gs-splat-btn'];
    toHide.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    // Bara verde Gaussian Splat dacă există separat
    document.querySelectorAll('button, div').forEach(el => {
      const txt = el.textContent?.trim();
      if ((txt === '🌟 Gaussian Splat' || txt === '🌟 Splat') &&
          !['ts-explore-btn','mb-splat','mi-splat','mb-more'].includes(el.id)) {
        el.style.display = 'none';
      }
    });
    // Butoane zoom +/- (redundant cu scroll/pinch)
    row2?.querySelectorAll('button').forEach(btn => {
      const txt = btn.textContent?.trim();
      if (txt === '＋' || txt === '－') btn.style.display = 'none';
    });

    return true;
  };

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 3 — Navigare niveluri în dollhouse + Walk mode
  // ═══════════════════════════════════════════════════════════════════════
  function _fix3_DollhouseNavigation() {
    const obs = new MutationObserver(() => {
      const overlay = document.getElementById('vtour-s1-overlay');
      if (overlay && !document.getElementById('ts-nav-bar')) {
        setTimeout(() => _injectNavBar(overlay), 800);
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  function _injectNavBar(overlay) {
    if (document.getElementById('ts-nav-bar')) return;
    const b = _RV?.building;
    const P = _RV?.parcelParams;
    if (!b) return;

    // CSS
    if (!document.getElementById('ts-nav-css')) {
      const s = document.createElement('style');
      s.id = 'ts-nav-css';
      s.textContent = `
        #ts-nav-bar {
          position:absolute; top:8px; left:50%; transform:translateX(-50%);
          display:flex; align-items:center; gap:5px; z-index:25;
          background:rgba(8,14,30,.92); border:1px solid rgba(255,255,255,.1);
          border-radius:10px; padding:5px 10px; flex-wrap:wrap; max-width:92%;
        }
        .ts-nb-lbl { font-size:9px; color:#4A6080; font-weight:700; white-space:nowrap; flex-shrink:0; }
        .ts-nb-btn {
          padding:3px 10px; border-radius:5px; cursor:pointer;
          font-size:10px; font-weight:700; font-family:inherit;
          border:1px solid rgba(255,255,255,.14); background:rgba(255,255,255,.05);
          color:#94A3B8; white-space:nowrap; transition:all .15s; flex-shrink:0;
        }
        .ts-nb-btn:hover { background:rgba(168,85,247,.2); color:#C084FC; border-color:rgba(168,85,247,.45); }
        .ts-nb-btn.on    { background:rgba(168,85,247,.25); color:#C084FC; border-color:rgba(168,85,247,.55); }
        .ts-nb-sep { width:1px; height:18px; background:rgba(255,255,255,.1); flex-shrink:0; margin:0 2px; }
        #ts-walk-btn { border-color:rgba(0,255,136,.3); color:#00ff88; background:rgba(0,255,136,.07); }
        #ts-walk-btn.on { background:rgba(0,255,136,.22); }
        #ts-tur-btn { border-color:rgba(192,132,252,.35); color:#c084fc; background:rgba(168,85,247,.08); }
        @media (max-width:768px) {
          #ts-nav-bar { top:4px; padding:4px 7px; gap:4px; }
          .ts-nb-btn { padding:3px 7px; font-size:9px; }
        }
      `;
      document.head.appendChild(s);
    }

    const bar = document.createElement('div');
    bar.id = 'ts-nav-bar';

    const lbl = document.createElement('span');
    lbl.className = 'ts-nb-lbl'; lbl.textContent = 'NIVEL:';
    bar.appendChild(lbl);

    // Niveluri (subsol + etaje)
    const hNiv = P?.hn || 3;
    const floors = window.VTour?._state?._aedisFloors?.floors || [];
    const labels = ['P', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'];

    if ((b.subsolNiv || 0) > 0) {
      const btnS = document.createElement('button');
      btnS.className = 'ts-nb-btn';
      btnS.style.borderColor = 'rgba(56,189,248,.35)'; btnS.style.color = '#38bdf8';
      btnS.textContent = 'S-1';
      btnS.onclick = () => _gotoFloor(-1, hNiv, b, bar);
      bar.appendChild(btnS);
    }

    (floors.length > 0 ? floors : Array.from({ length: b.niv }, (_, i) => ({ idx: i }))).forEach((fl, idx) => {
      const btn = document.createElement('button');
      btn.className = 'ts-nb-btn' + (idx === 0 ? ' on' : '');
      btn.textContent = labels[idx] || 'E' + idx;
      btn.dataset.floorIdx = idx;
      btn.onclick = () => {
        bar.querySelectorAll('.ts-nb-btn[data-floor-idx]').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        _gotoFloor(idx, hNiv, b, bar);
      };
      bar.appendChild(btn);
    });

    const sep = document.createElement('div'); sep.className = 'ts-nb-sep';
    bar.appendChild(sep);

    // Walk mode
    const walkBtn = document.createElement('button');
    walkBtn.id = 'ts-walk-btn'; walkBtn.className = 'ts-nb-btn';
    walkBtn.textContent = '🚶 Walk';
    walkBtn.title = 'Prima persoană (W/A/S/D + mouse). ESC = ieșire';
    let walkOn = false;
    walkBtn.onclick = () => {
      walkOn = !walkOn;
      walkBtn.classList.toggle('on', walkOn);
      walkBtn.textContent = walkOn ? '🚶 Walk ON' : '🚶 Walk';
      _toggleWalk(walkOn);
    };
    bar.appendChild(walkBtn);

    // Tur foto rapid
    const turBtn = document.createElement('button');
    turBtn.id = 'ts-tur-btn'; turBtn.className = 'ts-nb-btn';
    turBtn.textContent = '✨ Tur foto';
    turBtn.onclick = () => {
      overlay.remove();
      setTimeout(() => {
        if (typeof window._tfSelectLevel === 'function') window._tfSelectLevel('preview');
        else if (typeof ss === 'function') ss('⚠ 30-tur-foto.js nu este disponibil');
      }, 300);
    };
    bar.appendChild(turBtn);

    overlay.appendChild(bar);
  }

  function _gotoFloor(idx, hNiv, b, bar) {
    const state = window.VTour?._state;
    if (!state) return;
    const anchor = state._anchor;
    if (!anchor) return;

    const targetY = idx < 0
      ? anchor.baseY - 1.4
      : anchor.baseY + (idx + 0.5) * hNiv;

    const cam = state.camera;
    const orbit = state.orbit;
    if (!cam || !orbit) return;

    // Animăm
    const startY = orbit.target.y;
    const t0 = performance.now();
    const dur = 500;
    const anim = now => {
      const t = Math.min(1, (now - t0) / dur);
      const e = t < .5 ? 2*t*t : -1+(4-2*t)*t;
      orbit.target.y = startY + (targetY - startY) * e;
      if (orbit.targetRadius) orbit.targetRadius = Math.min(40, Math.max(12, b.bW * 1.1));
      if (t < 1) requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);

    if (typeof ss === 'function') ss('📍 ' + (idx < 0 ? 'Subsol S-1' : idx === 0 ? 'Parter' : 'Etaj ' + idx));
  }

  let _wKeys = {}, _wYaw = 0, _wPitch = 0, _wRaf = null;
  function _toggleWalk(on) {
    const ctn = document.getElementById('vtour-s1-canvas-ctn');
    const canvas = ctn?.querySelector('canvas') || ctn;
    if (!ctn) return;

    const state = window.VTour?._state;
    const controls = state?.controls;

    if (on) {
      ctn.style.cursor = 'crosshair';
      _wKeys = {}; _wYaw = 0; _wPitch = 0; _wMouseDown = false;

      // Dezactivăm OrbitControls — altfel resetează camera la fiecare frame
      if (controls) {
        controls._savedEnabled = controls.enabled;
        controls.enabled = false;
      }

      // Pointer lock dacă disponibil (HTTPS)
      try { ctn.requestPointerLock?.(); } catch(e) {}

      _runWalk();
      document.addEventListener('keydown', _wKeyDown);
      document.addEventListener('keyup',   _wKeyUp);
      document.addEventListener('mousemove', _wMouseMove);
      ctn.addEventListener('mousedown', _wMouseDownFn);
      ctn.addEventListener('mouseup',   _wMouseUpFn);

      if (typeof ss === 'function') ss('🚶 Walk mode ON — W/A/S/D + mouse drag · ESC = ieșire');
    } else {
      ctn.style.cursor = '';
      try { document.exitPointerLock?.(); } catch(e) {}

      // Reactivăm OrbitControls
      if (controls && controls._savedEnabled !== undefined) {
        controls.enabled = controls._savedEnabled;
      }

      if (_wRaf) { cancelAnimationFrame(_wRaf); _wRaf = null; }
      document.removeEventListener('keydown', _wKeyDown);
      document.removeEventListener('keyup',   _wKeyUp);
      document.removeEventListener('mousemove', _wMouseMove);
      ctn.removeEventListener('mousedown', _wMouseDownFn);
      ctn.removeEventListener('mouseup',   _wMouseUpFn);
      if (typeof ss === 'function') ss('🚶 Walk mode OFF');
    }
  }
  function _wKeyDown(e) {
    _wKeys[e.key.toLowerCase()] = true;
    if (e.key === 'Escape') { document.getElementById('ts-walk-btn')?.click(); }
  }
  function _wKeyUp(e) { delete _wKeys[e.key.toLowerCase()]; }
  let _wMouseDown = false;
  const _wMouseDownFn = () => { _wMouseDown = true; };
  const _wMouseUpFn   = () => { _wMouseDown = false; };

  function _wMouseMove(e) {
    // Funcționează cu pointer lock SAU cu mouse drag (buton stâng apăsat)
    const hasLock = !!document.pointerLockElement;
    if (!hasLock && !_wMouseDown) return;
    const THREE = window.THREE;
    const cam = window.VTour?._state?.camera;
    if (!cam || !THREE) return;
    const sensitivity = hasLock ? 0.002 : 0.004;
    _wYaw   -= e.movementX * sensitivity;
    _wPitch  = Math.max(-1.2, Math.min(1.2, _wPitch - e.movementY * sensitivity));
    cam.rotation.order = 'YXZ';
    cam.rotation.y = _wYaw;
    cam.rotation.x = _wPitch;
  }
  function _runWalk() {
    const state = window.VTour?._state;
    const cam = state?.camera;
    if (!cam) { _wRaf = requestAnimationFrame(_runWalk); return; }
    const THREE = window.THREE;
    const spd = 0.10;
    const dir = new THREE.Vector3();
    if (_wKeys['w'] || _wKeys['arrowup'])    dir.z -= spd;
    if (_wKeys['s'] || _wKeys['arrowdown'])  dir.z += spd;
    if (_wKeys['a'] || _wKeys['arrowleft'])  dir.x -= spd;
    if (_wKeys['d'] || _wKeys['arrowright']) dir.x += spd;
    if (dir.length() > 0) { dir.applyEuler(new THREE.Euler(0, _wYaw, 0)); cam.position.add(dir); }
    _wRaf = requestAnimationFrame(_runWalk);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 4 — _rvFloor direct calls interceptate
  // ═══════════════════════════════════════════════════════════════════════
  function _fix4_FloorDirectCalls() {
    if (window._FLOOR_SYNC_v2) return;
    window._FLOOR_SYNC_v2 = true;

    // Hook pe _rvRegenFloors
    const origRegen = window._rvRegenFloors;
    window._rvRegenFloors = function () {
      const result = origRegen?.apply(this, arguments);
      _postProcessFloors();
      return result;
    };

    // Hook pe _rvRender
    const origRender = window._rvRender;
    if (origRender) {
      window._rvRender = function () {
        _postProcessFloors();
        return origRender.apply(this, arguments);
      };
    }
  }

  function _postProcessFloors() {
    const b = _RV?.building;
    const P = _RV?.parcelParams;
    if (!b || !P || !_RV.floors?.length) return;

    const fnKey = window._rvMixV2 ? window._rvMixV2(P) : 'rezCol';

    // Dacă e hotel și planul nu are coridor central, regenerăm
    if (fnKey === 'hotel' && typeof _rvFloorHotel === 'function') {
      const fl0 = _RV.floors[0];
      const hasCoridor = fl0?.rects?.some(r => r.t === 'hall' && r.w > b.bW * 0.5);
      if (!hasCoridor) {
        for (let i = 0; i < b.niv; i++) {
          _RV.floors[i] = _rvFloorHotel(b, i);
        }
      }
    }

    // rezInd pe clădire mică - verificăm că e corect
    if (fnKey === 'rezInd' && typeof _rvFloorRezInd === 'function') {
      const fl0 = _RV.floors[0];
      const bigRoom = fl0?.rects?.find(r => r.apt >= 0 && !r.bal && r.w * r.h > 100);
      // Dacă avem camere > 100m² pe o clădire mică, e o problemă
      if (bigRoom && b.bW <= 18) {
        for (let i = 0; i < b.niv; i++) {
          _RV.floors[i] = _rvFloorRezInd(b, i);
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 5 — Mix sliders: afișate numai pentru rezCol
  // ═══════════════════════════════════════════════════════════════════════
  function _fix5_MixSlidersVisibility() {
    const _updateMixVisibility = () => {
      const b = _RV?.building;
      const P = _RV?.parcelParams;
      if (!b || !P) return;
      const fnKey = window._rvMixV2 ? window._rvMixV2(P) : 'rezCol';

      const mixSection = document.getElementById('rv-mix-body') ||
                         document.querySelector('[id*="mix"]')?.closest('.rv-rsec');
      if (!mixSection) return;

      const showMix = fnKey === 'rezCol';
      mixSection.style.opacity = showMix ? '1' : '0.4';
      mixSection.title = showMix ? '' : 'Mix apartamente activ numai pentru bloc rezidențial colectiv';

      // Adăugăm explicație dacă nu e rezCol
      let note = document.getElementById('ts-mix-note');
      if (!showMix) {
        if (!note) {
          note = document.createElement('div');
          note.id = 'ts-mix-note';
          note.style.cssText = 'font-size:9px;color:#F59E0B;padding:4px 6px;background:rgba(245,158,11,.1);border-radius:4px;margin-top:4px;font-family:IBM Plex Mono,monospace';
          mixSection.appendChild(note);
        }
        const labels = { rezInd: 'casă individuală', hotel: 'hotel', birouri: 'birouri', industrial: 'industrial', com: 'comercial' };
        note.textContent = '⚠ Mix N/A pentru ' + (labels[fnKey] || fnKey);
      } else if (note) {
        note.remove();
      }
    };

    // Rulăm la fiecare render
    const origRender = window._rvRender;
    if (origRender && !window._MIX_VIS_HOOKED) {
      window._MIX_VIS_HOOKED = true;
      const wrapped = window._rvRender;
      window._rvRender = function () {
        const r = wrapped.apply(this, arguments);
        setTimeout(_updateMixVisibility, 100);
        return r;
      };
    }
    setTimeout(_updateMixVisibility, 500);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FIX 6 — Avertizare combinație funcțiune + dimensiuni imposibilă
  // ═══════════════════════════════════════════════════════════════════════
  function _fix6_FnDimensionWarning() {
    const _checkAndWarn = () => {
      const b = _RV?.building;
      const P = _RV?.parcelParams;
      if (!b || !P) return;

      const fn = String(window.AEDIS?.fn || P.fn || '').toLowerCase();
      const bW = b.bW, niv = b.niv;

      let warn = null;

      if ((fn.includes('individuala') || fn.includes('vila')) && bW > 18) {
        warn = `⚠ Clădire ${bW.toFixed(1)}m lățime → prea mare pentru locuință individuală (max ~15m). Sistemul va genera plan de bloc rezidențial.`;
      } else if ((fn.includes('individuala') || fn.includes('vila')) && niv > 3) {
        warn = `⚠ ${niv} niveluri → prea multe pentru locuință individuală (max P+2). Schimbați funcțiunea în bloc colectiv.`;
      } else if (fn.includes('hotel') && niv < 3) {
        warn = `ℹ Hotel cu ${niv} niveluri — configurație neobișnuită. Recomandat min. P+2.`;
      }

      // Afișăm warning în panoul DNA sau sus în releveul
      let warnEl = document.getElementById('ts-fn-warn');
      if (warn) {
        if (!warnEl) {
          warnEl = document.createElement('div');
          warnEl.id = 'ts-fn-warn';
          warnEl.style.cssText = [
            'position:fixed', 'bottom:55px', 'left:50%', 'transform:translateX(-50%)',
            'background:rgba(245,158,11,.15)', 'border:1px solid rgba(245,158,11,.4)',
            'color:#FCD34D', 'font-size:11px', 'font-weight:600', 'padding:8px 16px',
            'border-radius:8px', 'z-index:9999', 'max-width:500px', 'text-align:center',
            'font-family:IBM Plex Mono,monospace', 'cursor:pointer',
            'box-shadow:0 4px 16px rgba(0,0,0,.4)',
          ].join(';');
          warnEl.onclick = () => warnEl.remove();
          document.body.appendChild(warnEl);
        }
        warnEl.textContent = warn;
        setTimeout(() => warnEl?.remove(), 8000);
      } else if (warnEl) {
        warnEl.remove();
      }
    };

    // Verificăm la fiecare render
    const origRender = window._rvRender;
    if (origRender && !window._FN_WARN_HOOKED) {
      window._FN_WARN_HOOKED = true;
      const wrapped = window._rvRender;
      window._rvRender = function () {
        const r = wrapped.apply(this, arguments);
        setTimeout(_checkAndWarn, 200);
        return r;
      };
    }
    setTimeout(_checkAndWarn, 600);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FACADE sync cu AEDIS stil
  // ═══════════════════════════════════════════════════════════════════════
  const origFacade = window._rvRenderFacade;
  if (origFacade && !window._FACADE_SYNC_v2) {
    window._FACADE_SYNC_v2 = true;
    window._rvRenderFacade = function (b) {
      if (window.AEDIS && b?.P) { b.P.fn = (window.AEDIS||{}).fn || b.P.fn; }
      return origFacade.apply(this, arguments);
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // DEBUG
  // ═══════════════════════════════════════════════════════════════════════
  function _exposeDebug() {
    window._rvTurSyncStatus = () => {
      const b = _RV?.building, P = _RV?.parcelParams;
      const fn = window._rvMixV2?.(P) || '—';
      const fl0 = _RV?.floors?.[0];
      console.table({
        'Funcțiune detectată': fn,
        'AEDIS.fn': window.AEDIS?.fn || '—',
        'bW × bD': `${b?.bW?.toFixed(1)} × ${b?.bD?.toFixed(1)} m`,
        'Niveluri': b?.niv,
        'Camere în plan': fl0?.rects?.filter(r => r.apt >= 0)?.length,
        'Uși în plan':    fl0?.doors?.length,
        'v3d-topbar':     !!document.getElementById('v3d-topbar'),
        'ts-tur-btn':     !!document.getElementById('ts-tur-foto-btn'),
        'VTour activ':    !!window.VTour?._state?.active,
      });
    };
  }


  // ── Mobile UI improvements ───────────────────────────────────────────

  function _injectMobileUI() {
    // ── CSS global pentru mobile (fără bara de jos) ───────────────────
    if (document.getElementById('ts-mobile-css')) return;
    const style = document.createElement('style');
    style.id = 'ts-mobile-css';
    style.textContent = `
      /* ── VIEWER 3D MOBIL ─────────────────────────────────── */
      @media (max-width: 768px) {
        /* Butoane duplicate ascunse — PERMANENT cu !important */
        #vtour-launch-btn,
        #vtour-fp-btn,
        #ts-tur-foto-btn,
        #gs-splat-btn { display:none !important; visibility:hidden !important; }

        /* Slider soare ascuns */
        #v3d-sun-row { display:none !important; }

        /* Topbar compact */
        #v3d-topbar { padding:4px 6px !important; }

        /* Dropdown menus full-width */
        #ts-explore-menu,
        #ux-export-menu,
        .ux-export-menu { left:8px !important; right:8px !important; min-width:unset !important; }

        /* STATUS debug ascuns pe mobil */
        #v3d-status { display:none !important; }

        /* Fix height viewer să nu permită STATUS să urce */
        #aedis-3d-viewer-overlay {
          height: 100dvh !important;
          max-height: 100dvh !important;
          overflow: hidden !important;
        }
      }

      /* ── PLANȘE — touch pan/zoom ─────────────────────────── */
      #rv-canvas {
        touch-action: none !important;
        -webkit-user-select: none !important;
        user-select: none !important;
      }
      .rv-drawwrap {
        overscroll-behavior: contain !important;
        -webkit-overflow-scrolling: touch !important;
        touch-action: pan-x pan-y !important;
      }
      @media (max-width: 768px) {
        .rv-drawwrap {
          overflow: auto !important;
          min-height: 0 !important;
          flex: 1 !important;
        }
      }

      /* ── TOPBAR PLANȘE MOBIL ─────────────────────────────── */
      @media (max-width: 768px) {
        .rv-topbar {
          flex-wrap: wrap !important;
          gap: 4px !important;
          padding: 6px 8px !important;
          height: auto !important;
        }
        /* Ascundem butoanele standalone din topbar (sunt în dropdown) */
        .rv-topbar > button:not(.rv-close-btn):not(#rv-mobile-menu-btn):not(#ux-export-btn):not(#ux-analiza-btn) {
          display: none !important;
        }
        /* Tabs scroll orizontal */
        .rv-tabs {
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
        }
        .rv-tabs::-webkit-scrollbar { display:none !important; }
      }

      /* ── STATUS DESKTOP — discret, nu intrusiv ────────────── */
      #v3d-status {
        font-size: 8px !important;
        color: rgba(100,116,139,.6) !important;
        max-width: 200px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }

      #ts-viewer-action-bar button:active { opacity:.7; transform:scale(.95); }
    `;
    document.head.appendChild(style);

    // ── Observer permanent: ascunde butoane duplicate imediat ce apar ───
    const _hideIds = ['vtour-launch-btn','vtour-fp-btn','ts-tur-foto-btn','gs-splat-btn'];
    const _hideDuplicates = () => {
      _hideIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.style.display !== 'none') {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
        }
      });
    };
    const _dupObs = new MutationObserver(_hideDuplicates);
    _dupObs.observe(document.body, { childList: true, subtree: true });
    // Rulăm imediat
    _hideDuplicates();

    // ── Bara de jos se injectează NUMAI în viewer-ul 3D ──────────────
    // Monitorizăm deschiderea viewer-ului
    const obs = new MutationObserver(() => {
      const viewer = document.getElementById('aedis-3d-viewer-overlay');
      const barExists = document.getElementById('ts-viewer-action-bar');

      if (viewer && !barExists && window.innerWidth <= 768) {
        _createViewerActionBar(viewer);
      }
      if (!viewer && barExists) {
        barExists.remove();
      }
    });
    obs.observe(document.body, { childList: true, subtree: false });
  }

  function _createViewerActionBar(viewerEl) {
    if (document.getElementById('ts-viewer-action-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'ts-viewer-action-bar';
    bar.style.cssText = `
      position:absolute;bottom:0;left:0;right:0;z-index:99990;
      background:rgba(7,16,30,.97);
      border-top:1px solid rgba(139,92,246,.3);
      display:flex;align-items:stretch;
      padding-bottom:max(8px,env(safe-area-inset-bottom));
    `;

    const mainActions = [
      { id:'mb-dollhouse', icon:'🏠', label:'Dollhouse',
        color:'#00ff88', border:'rgba(0,255,136,.35)', bg:'rgba(0,255,136,.08)',
        fn: "document.getElementById('vtour-launch-btn')?.click()||document.getElementById('mi-dollhouse')?.click()" },
      { id:'mb-3dplan', icon:'📐', label:'3D Plan',
        color:'#60a5fa', border:'rgba(59,130,246,.35)', bg:'rgba(59,130,246,.08)',
        fn: "document.getElementById('vtour-fp-btn')?.click()||document.getElementById('mi-3dplan')?.click()" },
      { id:'mb-tur', icon:'✨', label:'Tur Foto',
        color:'#c084fc', border:'rgba(168,85,247,.35)', bg:'rgba(168,85,247,.08)',
        fn: "typeof window._showTurFotoLauncher==='function'&&window._showTurFotoLauncher()" },
    ];

    mainActions.forEach(a => {
      const btn = document.createElement('button');
      btn.id = a.id;
      btn.style.cssText = `
        flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
        gap:3px;padding:8px 4px;border:none;border-top:2px solid ${a.border};
        background:${a.bg};color:${a.color};cursor:pointer;
        font-family:inherit;touch-action:manipulation;
      `;
      btn.innerHTML = `<span style="font-size:22px;line-height:1">${a.icon}</span><span style="font-size:9px;font-weight:700">${a.label}</span>`;
      btn.setAttribute('onclick', a.fn);
      bar.appendChild(btn);
    });

    // Separator + "···" Altele
    const sep = document.createElement('div');
    sep.style.cssText = 'width:1px;background:rgba(255,255,255,.1);flex-shrink:0';
    bar.appendChild(sep);

    const moreBtn = document.createElement('button');
    moreBtn.id = 'mb-more';
    moreBtn.style.cssText = `
      width:60px;display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:3px;padding:8px 4px;border:none;border-top:2px solid rgba(255,255,255,.1);
      background:rgba(255,255,255,.04);color:#64748b;cursor:pointer;
      font-family:inherit;touch-action:manipulation;
    `;
    moreBtn.innerHTML = '<span style="font-size:18px;line-height:1">···</span><span style="font-size:9px;font-weight:700">Altele</span>';
    bar.appendChild(moreBtn);

    // Drawer "Altele"
    const drawer = document.createElement('div');
    drawer.id = 'mb-drawer';
    drawer.style.cssText = `
      position:absolute;bottom:-200px;left:0;right:0;z-index:99991;
      background:#0d1829;border-top:1px solid rgba(139,92,246,.3);
      border-radius:20px 20px 0 0;padding:12px;
      transition:bottom .25s ease;
      display:grid;grid-template-columns:repeat(3,1fr);gap:8px;
    `;

    [
      { icon:'⭐', label:'Render HD', fn:"typeof window._ptShowOverlay==='function'&&window._ptShowOverlay()", color:'#fbbf24' },
      { icon:'🌟', label:'Splat',     fn:"typeof window._gsLaunch==='function'&&window._gsLaunch()",          color:'#4ade80' },
      { icon:'📦', label:'GLB+BIM',   fn:"typeof window._rvExportGLBSemantic==='function'&&window._rvExportGLBSemantic()", color:'#818cf8' },
    ].forEach(item => {
      const btn = document.createElement('button');
      btn.style.cssText = `
        display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 4px;
        background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
        border-radius:10px;color:${item.color};cursor:pointer;
        font-family:inherit;touch-action:manipulation;
      `;
      btn.innerHTML = `<span style="font-size:24px">${item.icon}</span><span style="font-size:9px;font-weight:700">${item.label}</span>`;
      btn.setAttribute('onclick', item.fn + ';document.getElementById("mb-drawer").style.bottom="-200px";drawerOpen=false');
      drawer.appendChild(btn);
    });

    let drawerOpen = false;
    moreBtn.onclick = () => {
      drawerOpen = !drawerOpen;
      drawer.style.bottom = drawerOpen ? '0' : '-200px';
      moreBtn.querySelector('span:first-child').textContent = drawerOpen ? '✕' : '···';
    };
    document.addEventListener('click', e => {
      if (drawerOpen && !drawer.contains(e.target) && e.target !== moreBtn) {
        drawer.style.bottom = '-200px';
        drawerOpen = false;
        moreBtn.querySelector('span:first-child').textContent = '···';
      }
    });

    // Adăugăm în viewer (position:absolute față de el, nu față de body)
    viewerEl.style.position = 'relative';
    viewerEl.appendChild(bar);
    viewerEl.appendChild(drawer);

    // Padding canvas pentru a nu ascunde conținut
    const canvas = viewerEl.querySelector('#v3d-canvas, canvas');
    if (canvas) canvas.style.paddingBottom = '64px';
  }





  // ── FIX: Dollhouse cu camere auto din AEDIS când lipsesc planșele ────
  function _patchDollhouseEmpty() {
    if (window._DOLLHOUSE_EMPTY_PATCHED) return;
    window._DOLLHOUSE_EMPTY_PATCHED = true;

    // Hook VTour.start (Dollhouse)
    const origStart = window.VTour && window.VTour.start;
    if (origStart && !window._DH_START_PATCHED) {
      window._DH_START_PATCHED = true;
      window.VTour.start = function () {
        _ensureRVFloors();
        return origStart.apply(this, arguments);
      };
    }

    // Hook VTourFP.startFP (3D Floor Plan) — funcție separată
    var _hookFP = function() {
      var origStartFP = window.VTourFP && window.VTourFP.startFP;
      if (origStartFP && !window._DH_STARTFP_PATCHED) {
        window._DH_STARTFP_PATCHED = true;
        window.VTourFP.startFP = function() {
          _ensureRVFloors();
          return origStartFP.apply(this, arguments);
        };
        return true;
      }
      return false;
    };

    if (!_hookFP()) {
      // VTourFP nu e gata — așteptăm
      var fpObs = new MutationObserver(function() {
        if (_hookFP()) fpObs.disconnect();
      });
      fpObs.observe(document.body, { childList: true, subtree: true });
      setTimeout(function() { fpObs.disconnect(); }, 15000);
    }
  }

  function _ensureRVFloors() {
    var RV = window._RV;
    var A  = window.AEDIS;
    if (!A) return;
    if (RV && Array.isArray(RV.floors) && RV.floors.length > 0 &&
        RV.floors[0] && RV.floors[0].rects && RV.floors[0].rects.length > 0) return;

    var corp = (Array.isArray(A.corpuri) && A.corpuri[0]) || {};
    var niv  = parseInt(corp.niv)  || parseInt(A.niv)  || 3;
    var bW   = (RV && RV.building && RV.building.bW) ? RV.building.bW : (corp.bW || 18);
    var bD   = (RV && RV.building && RV.building.bD) ? RV.building.bD : (corp.bD || 14);
    var hNiv = parseFloat(corp.hNiv) || 3.0;
    var fn   = A.fn || 'rezidential_colectiv';

    if (!window._RV) window._RV = { floors: [], floorIdx: 0 };
    var _RV2 = window._RV;
    if (!_RV2.floors) _RV2.floors = [];

    var syntheticFloors = [];
    for (var f = 0; f < niv; f++) {
      syntheticFloors.push(_genFloor(f, bW, bD, fn));
    }
    _RV2.floors = syntheticFloors;

    if (!_RV2.building) {
      _RV2.building = {
        bW: bW, bD: bD, niv: niv,
        scArea: bW * bD, sdaTotal: bW * bD * niv,
        P: { hn: hNiv, W: bW + 6, D: bD + 6, area: (bW + 6) * (bD + 6) },
        cores: [{ x: bW * 0.4, y: bD * 0.32, w: bW * 0.18, h: bD * 0.28 }],
        subsolNiv: 0,
      };
    }
    console.log('[VTour] Dollhouse sintetic: ' + niv + ' etaje (' + bW.toFixed(1) + 'x' + bD.toFixed(1) + 'm, fn=' + fn + ')');
  }

  function _genFloor(fIdx, bW, bD, fn) {
    var rects = [];
    var doors = [];
    var wins  = [];
    var isGround = fIdx === 0;

    // ── Nucleu scări + lift ─────────────────────────────────────
    var cX = bW * 0.38, cY = bD * 0.32;
    var cW = bW * 0.20, cH = bD * 0.30;
    rects.push({ t:'core', x:cX, y:cY, w:cW, h:cH, apt:-1, lbl:'Scari+Lift', bal:false,
      doors:[
        // Acces din hol comun spre casa scărilor
        { side:'s', pos:cW*0.5, w:0.9 }
      ]
    });

    if (fn === 'birouri' || fn === 'comercial') {
      rects.push({ t:'office',  x:0.3,        y:0.3,     w:bW*0.35, h:bD*0.55, apt:1, lbl:'Birou open-space', bal:false,
        doors:[{ side:'s', pos:bW*0.35*0.5, w:1.2 }] });
      rects.push({ t:'living',  x:bW*0.36+cW, y:0.3,     w:bW*0.28, h:bD*0.35, apt:1, lbl:'Sala conferinte', bal:false,
        doors:[{ side:'s', pos:bW*0.28*0.4, w:1.0 }] });
      rects.push({ t:'hall',    x:0.3,        y:bD*0.65, w:bW*0.65, h:bD*0.18, apt:-1, lbl:'Hol comun', bal:false,
        doors:[] });
      rects.push({ t:'bath',    x:bW*0.70,    y:0.3,     w:bW*0.22, h:bD*0.28, apt:1, lbl:'Sanitare', bal:false,
        doors:[{ side:'v', pos:bD*0.28*0.5, w:0.8 }] });

      // Ușă principală intrare clădire (parter)
      if (isGround) {
        doors.push({ x:bW*0.5-0.9, y:bD, w:1.8, type:'main', swing:'out' });
      }

    } else {
      // Rezidențial
      var nApt = bW > 16 ? 2 : 1;
      var aptW = (bW - cW - 0.8) / nApt;

      for (var a = 0; a < nApt; a++) {
        var aptX   = a < 1 ? 0.3 : (cX + cW + 0.3);
        var aptIdx = a + 1;
        var hasBalc = fIdx > 0;

        // Hol apartament (acces din casa scărilor)
        var holX = aptX;
        var holY = cY + cH * 0.1; // la nivelul core-ului
        var holW = aptW * 0.62;
        var holH = bD * 0.18;
        rects.push({ t:'hall', x:holX, y:holY, w:holW, h:holH, apt:aptIdx, lbl:'Hol Ap.'+aptIdx, bal:false,
          doors:[
            // Ușă acces apartament dinspre casa scărilor
            { side: a<1 ? 'e' : 'v', pos:holH*0.5, w:0.9 }
          ]
        });

        // Living — ușă spre hol
        var livX = aptX, livY = holY + holH + 0.1;
        var livW = aptW*0.48, livH = bD*0.32;
        rects.push({ t:'living', x:livX, y:livY, w:livW, h:livH, apt:aptIdx, lbl:'Living', bal:false,
          doors:[{ side:'n', pos:livW*0.4, w:0.9 }] });

        // Dormitor — ușă spre hol
        var bedX = aptX + aptW*0.50, bedY = livY;
        var bedW = aptW*0.44, bedH = bD*0.30;
        rects.push({ t:'bedroom', x:bedX, y:bedY, w:bedW, h:bedH, apt:aptIdx, lbl:'Dormitor', bal:false,
          doors:[{ side:'n', pos:bedW*0.4, w:0.8 }] });

        // Bucătărie — ușă spre living
        var kitX = aptX, kitY = livY + livH + 0.1;
        var kitW = aptW*0.40, kitH = bD*0.24;
        rects.push({ t:'kitchen', x:kitX, y:kitY, w:kitW, h:kitH, apt:aptIdx, lbl:'Bucatarie', bal:false,
          doors:[{ side:'n', pos:kitW*0.5, w:0.8 }] });

        // Baie — ușă spre hol
        var bathX = aptX + aptW*0.42, bathY = kitY;
        var bathW = aptW*0.24, bathH = bD*0.20;
        rects.push({ t:'bath', x:bathX, y:bathY, w:bathW, h:bathH, apt:aptIdx, lbl:'Baie', bal:false,
          doors:[{ side:'n', pos:bathW*0.5, w:0.7 }] });

        // Balcon (etaje 1+)
        if (hasBalc) {
          rects.push({ t:'balcon', x:livX-0.6, y:livY-0.7, w:livW*0.9, h:0.65,
            apt:aptIdx, lbl:'Balcon', bal:true, doors:[] });
        }

        // Ușă acces apartament din core (pe peretele core adiacent holului)
        doors.push({
          x: a < 1 ? cX - 0.05 : cX + cW + 0.05,
          y: holY + holH * 0.5 - 0.45,
          w: 0.9,
          type: 'apt',
          swing: a < 1 ? 'right' : 'left',
          axis: 'V',
          aptIdx: aptIdx
        });
      }

      // ── Ușă principală intrare bloc (PARTER) ─────────────────
      if (isGround) {
        doors.push({ x: bW*0.5 - 0.9, y: bD, w: 1.8, type: 'main', swing: 'out' });
        // Hol comun parter (acces din stradă → casa scărilor)
        rects.push({ t:'hall', x: bW*0.35, y: bD*0.75, w: bW*0.30, h: bD*0.22,
          apt:-1, lbl:'Hol intrare', bal:false,
          doors:[{ side:'s', pos:bW*0.30*0.5, w:1.8 }] });
      }
    }

    return { floorIdx: fIdx, rects: rects, doors: doors, wins: wins };
  }

  _patchDollhouseEmpty();

  // ── Marker 3D intrare principală + uși apartamente în 3D Floor Plan ──
  function _addDoorMarkersToFP() {
    var vtState = window.VTour && window.VTour._state;
    if (!vtState || !vtState.scene) return;
    if (vtState._doorMarkersAdded) return;
    vtState._doorMarkersAdded = true;

    var THREE  = window.THREE;
    var RV     = window._RV;
    var anchor = vtState._anchor;
    if (!THREE || !RV || !anchor) return;

    var bW = anchor.bW, bD = anchor.bD;
    var ox = anchor.cx - bW / 2;
    var oz = anchor.cz - bD / 2;
    var hNiv = (RV.building && RV.building.P && RV.building.P.hn) || 3.0;

    // Materiale
    var mainEntryMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B, emissive: 0xF59E0B, emissiveIntensity: 0.4,
      roughness: 0.4, metalness: 0.3
    });
    var aptDoorMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6, emissive: 0x3B82F6, emissiveIntensity: 0.2,
      roughness: 0.5, metalness: 0.2
    });
    var intDoorMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0, roughness: 0.8, metalness: 0
    });

    var niv = (RV.building && RV.building.niv) || 3;

    for (var fIdx = 0; fIdx < niv; fIdx++) {
      var fl    = RV.floors && RV.floors[fIdx];
      var baseY = anchor.baseY + fIdx * hNiv;
      if (!fl) continue;

      // Ușile din fl.doors (intrare principală + uși apartamente)
      var flDoors = fl.doors || [];
      flDoors.forEach(function(d) {
        var dW = d.w || 0.9, dH = 2.1;
        var mat = d.type === 'main' ? mainEntryMat : aptDoorMat;
        var door = new THREE.Mesh(new THREE.BoxGeometry(dW, dH, 0.06), mat);
        var worldX, worldZ;

        if (d.axis === 'V') {
          // Ușă pe perete vertical
          worldX = ox + d.x;
          worldZ = oz + (d.y || 0) + dW / 2;
          door.position.set(worldX, baseY + dH / 2, worldZ);
        } else {
          // Ușă pe perete orizontal (default)
          worldX = ox + d.x + dW / 2;
          worldZ = oz + (d.y || bD);
          door.position.set(worldX, baseY + dH / 2, worldZ);
        }
        door.userData.doorType = d.type;
        vtState.scene.add(door);

        // Marker pentru intrarea principală (săgeată + label)
        if (d.type === 'main' && fIdx === 0) {
          _addMainEntryMarker(vtState.scene, worldX, baseY, worldZ, anchor, THREE);
        }
      });

      // Ușile interioare din r.doors ale fiecărei camere
      var rects = fl.rects || [];
      rects.forEach(function(r) {
        if (!r.doors || !r.doors.length) return;
        r.doors.forEach(function(rd) {
          var dW2 = rd.w || 0.8, dH2 = 2.0;
          var dX, dZ;
          if (rd.side === 'n') { dX = ox + r.x + rd.pos; dZ = oz + r.y; }
          else if (rd.side === 's') { dX = ox + r.x + rd.pos; dZ = oz + r.y + r.h; }
          else if (rd.side === 'e') { dX = ox + r.x + r.w; dZ = oz + r.y + rd.pos; }
          else { dX = ox + r.x; dZ = oz + r.y + rd.pos; } // 'v'

          var intDoor = new THREE.Mesh(new THREE.BoxGeometry(dW2, dH2, 0.05), intDoorMat);
          var isVert = rd.side === 'e' || rd.side === 'v';
          if (isVert) {
            intDoor.position.set(dX, baseY + dH2 / 2, dZ + dW2 / 2);
            intDoor.rotation.y = Math.PI / 2;
          } else {
            intDoor.position.set(dX + dW2 / 2, baseY + dH2 / 2, dZ);
          }
          vtState.scene.add(intDoor);
        });
      });
    }
  }

  function _addMainEntryMarker(scene, x, baseY, z, anchor, THREE) {
    // Săgeată verticală aurie deasupra intrării
    var arrowMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B, emissive: 0xF59E0B, emissiveIntensity: 0.8
    });

    // Coloană verticală
    var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8), arrowMat);
    pole.position.set(x, baseY + 2.5, z);
    scene.add(pole);

    // Con vârf (săgeată în jos)
    var cone = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.5, 8), arrowMat);
    cone.position.set(x, baseY + 3.5, z);
    scene.add(cone);

    // Animație pulsatilă
    var _t = 0;
    var _animFn = function() {
      _t += 0.04;
      var s = 1 + Math.sin(_t) * 0.15;
      cone.scale.set(s, s, s);
      cone.position.y = baseY + 3.5 + Math.sin(_t) * 0.1;
    };
    if (!scene._entryAnimFns) scene._entryAnimFns = [];
    scene._entryAnimFns.push(_animFn);
  }

  // Hookăm startFP să adauge marcheri după build
  function _hookFPMarkers() {
    if (window._FP_MARKERS_HOOKED) return;
    window._FP_MARKERS_HOOKED = true;

    var origStartFP = window.VTourFP && window.VTourFP.startFP;
    if (!origStartFP) {
      var obs2 = new MutationObserver(function() {
        if (window.VTourFP && window.VTourFP.startFP && !window._FP_MARKERS_INNER) {
          window._FP_MARKERS_INNER = true;
          var orig2 = window.VTourFP.startFP;
          window.VTourFP.startFP = function() {
            var r = orig2.apply(this, arguments);
            setTimeout(_addDoorMarkersToFP, 800);
            return r;
          };
          obs2.disconnect();
        }
      });
      obs2.observe(document.body, { childList: true, subtree: true });
    } else if (!window._FP_MARKERS_INNER) {
      window._FP_MARKERS_INNER = true;
      window.VTourFP.startFP = function() {
        var r = origStartFP.apply(this, arguments);
        setTimeout(_addDoorMarkersToFP, 800);
        return r;
      };
    }
  }

  _hookFPMarkers();


  // ── FIX: input[type=number] cu valori text din PUG (parcaje_min) ────
  function _fixParcajInputs() {
    document.querySelectorAll('input[type="number"]').forEach(function(inp) {
      if (inp.value && isNaN(parseFloat(inp.value)) && inp.value.trim() !== '') {
        inp.type = 'text';
        inp.style.color = '#94A3B8';
        inp.style.fontSize = '10px';
      }
    });
  }
  setTimeout(_fixParcajInputs, 2000);
  setTimeout(_fixParcajInputs, 5000);

  // ── AUTO-GENERARE PLANȘE la deschiderea Viewer 3D ───────────────────
  function _initAutoPlanse() {
    if (window._AUTO_PLANSE_INIT) return;
    window._AUTO_PLANSE_INIT = true;

    // Hook pe _v3dStatus — detectăm finalizarea build-ului
    var _origStatus = window._v3dStatus;
    window._v3dStatus = function(msg) {
      if (_origStatus) _origStatus.apply(this, arguments);
      if (msg && msg.indexOf('✅') >= 0 && msg.indexOf('vol. AEDIS') >= 0) {
        _scheduleAutoPlanse('viewer_ready');
      }
    };

    // Detectăm modificări AEDIS (utilizatorul iese, modifică, reintră)
    var _lastHash = '';
    setInterval(function() {
      var A = window.AEDIS;
      if (!A) return;
      var hash = [A.stil, A.fn, A.tipAcoperis,
        A.peretelCortina ? '1' : '0',
        A.cortinaProcent || 0,
        A.activeRetragere ? '1' : '0',
        A.parterDiferit ? '1' : '0',
        (A.corpuri && A.corpuri[0] && A.corpuri[0].niv) || 0
      ].join('|');

      if (_lastHash && hash !== _lastHash) {
        _lastHash = hash;
        _scheduleAutoPlanse('aedis_changed');
      } else {
        _lastHash = hash;
      }
    }, 3000);

    console.log('[AutoPlanse] ✅ activ — planșele se sincronizează automat cu AEDIS');
  }

  var _autoPlansePending = false;

  function _scheduleAutoPlanse(reason) {
    if (_autoPlansePending) return;
    _autoPlansePending = true;
    setTimeout(function() {
      _autoPlansePending = false;
      _generatePlanseBackground(reason);
    }, 1500);
  }

  function _generatePlanseBackground(reason, _retries) {
    if (typeof window.generateRelevee !== 'function') return;
    _retries = _retries || 0;

    // Guard: _RV trebuie să existe cu floors populat înainte de generateRelevee
    // Altfel 15-relevee.js aruncă "Cannot read properties of null (reading 'floorIdx')"
    var RV = window._RV;
    if (!RV || !Array.isArray(RV.floors) || RV.floors.length === 0) {
      if (_retries > 10) {
        console.warn('[AutoPlanse] _RV.floors nu e gata după 10 reîncercări — skip');
        return;
      }
      // _RV nu e gata — re-scheduleăm după 800ms
      setTimeout(function() { _generatePlanseBackground(reason, _retries + 1); }, 800);
      return;
    }

    var modal = document.getElementById('rv-modal');
    var wasOpen = modal && modal.classList.contains('rv-modal-open');

    // Dacă planșele sunt deja deschise → re-renderăm live
    if (wasOpen && typeof window._rvRender === 'function') {
      setTimeout(function() { window._rvRender(); }, 500);
      if (typeof ss === 'function') ss('🔄 Planșe actualizate din AEDIS');
      return;
    }

    // ── Generare silențioasă în background ──────────────────────────────
    // IMPORTANT: dezactivăm guard-ul _rvAllowOpen temporar
    // (generăm datele fără interacțiune utilizator — by design)
    var prevAllow = window._rvAllowOpen;
    window._rvAllowOpen = true;

    // Ascundem modalul ÎNAINTE de generateRelevee — nu vrem să apară vizual
    if (modal) {
      modal.style.visibility = 'hidden';
      modal.style.pointerEvents = 'none';
      modal.style.zIndex = '-1';
    }

    try {
      window.generateRelevee();
    } catch(e) {
      console.warn('[AutoPlanse] Eroare:', e.message);
    }

    // Resetăm starea după generare
    setTimeout(function() {
      window._rvAllowOpen = prevAllow;
      var m2 = document.getElementById('rv-modal');
      if (m2) {
        // Ascundem complet dacă nu era deja deschis de utilizator
        m2.classList.remove('rv-modal-open');
        m2.style.visibility = 'hidden';
        m2.style.pointerEvents = '';
        m2.style.zIndex = '';
      }
    }, 400);

    var msg = reason === 'aedis_changed'
      ? '🔄 Planșe actualizate automat'
      : '✅ Planșe gata — deschide 📐 Planșe când ești pregătit';
    if (typeof ss === 'function') ss(msg);
    console.log('[AutoPlanse] generat silențios (' + reason + ')');
  }

  _initAutoPlanse();

  // ═══════════════════════════════════════════════════════════════════════
  // PATCH FORMA CLĂDIRE — extrage pts2d reale (L/U/T/curte) din S.vol
  // și le injectează în _RV.building.pts pentru planșe + tur virtual
  // ═══════════════════════════════════════════════════════════════════════
  function _initFormaPatch() {
    if (window._FORMA_PATCH_INIT) return;
    window._FORMA_PATCH_INIT = true;

    // Hook pe _rvRender — injectăm pts înainte de fiecare render
    var origRvRender = window._rvRender;
    if (origRvRender && !origRvRender._formaPatch) {
      origRvRender._formaPatch = true;
      window._rvRender = function () {
        _injectFormaPts();
        return origRvRender.apply(this, arguments);
      };
    }

    // Hook pe VTour.start și startFP
    ['start', 'startFP'].forEach(function(method) {
      var obj = method === 'start' ? window.VTour : window.VTourFP;
      if (!obj || !obj[method] || obj[method]._formaPatch) return;
      obj[method]._formaPatch = true;
      var orig = obj[method];
      obj[method] = function () {
        _injectFormaPts();
        return orig.apply(this, arguments);
      };
    });

    console.log('[FormaPatch] ✅ Forma clădire preluată în planșe și 3D');
  }

  function _injectFormaPts() {
    var RV = window._RV;
    var S  = window.S;
    if (!RV || !RV.building) return;
    if (RV.building.pts) return; // deja injectat

    // Extragem pts din S.vol._lastFeats
    var volFeats = S && S.vol && S.vol._lastFeats;
    if (!volFeats || !volFeats.length) return;

    // Găsim feature-ul de parter (floor=0) al primului corp
    var groundFeat = null;
    for (var i = 0; i < volFeats.length; i++) {
      var f = volFeats[i];
      if (f && f.geometry && f.properties && f.properties.floor === 0 &&
          !f.properties.isExistent) {
        groundFeat = f;
        break;
      }
    }
    if (!groundFeat) return;

    // Extragem coordonatele
    var coords = groundFeat.geometry.type === 'Polygon'
      ? groundFeat.geometry.coordinates[0]
      : (groundFeat.geometry.coordinates[0] && groundFeat.geometry.coordinates[0][0]) || [];
    if (coords.length < 3) return;

    // Convertim lon/lat → coordonate locale în metri
    // Folosim același toLoc din 11-viewer3d.js
    var toLoc = window._v3dToLoc || _makeToLoc(coords);

    var pts2d = coords.slice(0, -1).map(toLoc);
    if (pts2d.length < 3) return;

    // Calculăm bounding box local
    var xs = pts2d.map(function(p) { return p[0]; });
    var ys = pts2d.map(function(p) { return p[1]; });
    var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
    var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);

    // Centrăm pts față de centrul bbox
    var cx = (minX + maxX) / 2;
    var cy = (minY + maxY) / 2;
    var localPts = pts2d.map(function(p) { return [p[0] - cx, p[1] - cy]; });

    // Salvăm în building
    RV.building.pts        = localPts;    // poligon real centrat
    RV.building.ptsRaw     = pts2d;       // coordonate absolute
    RV.building.ptsBBox    = { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
    RV.building.forma      = window.AEDIS && window.AEDIS.forma || 'dreptunghi';
    RV.building.hasHole    = coords.length > 1; // curte interioară

    // Actualizăm bW și bD cu dimensiunile reale (nu bbox aproximativ)
    var realW = maxX - minX;
    var realD = maxY - minY;
    if (realW > 0.5) RV.building.bW = realW;
    if (realD > 0.5) RV.building.bD = realD;

    console.log('[FormaPatch] ✅ pts injectați: ' + localPts.length +
      ' pct, forma=' + RV.building.forma +
      ', ' + realW.toFixed(1) + '×' + realD.toFixed(1) + 'm');
  }

  function _makeToLoc(coords) {
    // Generăm toLoc minimal dacă _v3dToLoc nu e disponibil
    if (typeof window._v3dToLoc === 'function') return window._v3dToLoc;
    if (!coords || !coords.length) return function(c) { return [c[0], c[1]]; };

    var refLng = coords[0][0], refLat = coords[0][1];
    var mLng = 111320 * Math.cos(refLat * Math.PI / 180);
    var mLat = 111320;
    return function(c) {
      return [(c[0] - refLng) * mLng, (c[1] - refLat) * mLat];
    };
  }

  // Patch pe _genFloor pentru a respecta forma clădirii
  // Camerele sunt generate NUMAI în interiorul formei reale
  function _patchGenFloorForForma() {
    // _genFloor deja există în 27 — adăugăm filtrare rects outside forma
    var origGenFloor = window._genFloorOrig || _genFloor;
    if (!window._genFloorOrig) window._genFloorOrig = _genFloor;

    // Înlocuim _genFloor cu o versiune care verifică forma
    window._genFloorForma = function(fIdx, bW, bD, fn) {
      var floor = origGenFloor(fIdx, bW, bD, fn);
      var RV = window._RV;
      if (!RV || !RV.building || !RV.building.pts) return floor;

      var pts = RV.building.pts;
      var forma = RV.building.forma || 'dreptunghi';
      if (forma === 'dreptunghi' || forma === 'patrat' || forma === 'bara') return floor;

      // Filtrăm camerele care cad complet în afara formei
      var halfW = bW / 2, halfD = bD / 2;
      floor.rects = floor.rects.filter(function(r) {
        // Centrul camerei în coordonate locale (0,0 = centrul clădirii)
        var rcx = r.x + r.w / 2 - halfW;
        var rcy = r.y + r.h / 2 - halfD;
        // Verificăm dacă centrul e în interiorul poligonului formei
        return _pointInPoly(rcx, rcy, pts);
      });

      return floor;
    };
  }

  function _pointInPoly(px, py, pts) {
    // Ray casting algorithm
    var inside = false;
    for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      var xi = pts[i][0], yi = pts[i][1];
      var xj = pts[j][0], yj = pts[j][1];
      var intersect = ((yi > py) !== (yj > py)) &&
        (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  _initFormaPatch();
  _patchGenFloorForForma();


})();
