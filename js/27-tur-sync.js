/* ═══════════════════════════════════════════════════════════════════════════
   UrbanX · 27-tur-sync.js · v2.1 · 09 Iunie 2026
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

  waitReady(() => {
    _fix1_MixV2Override();
    _fix2_TurFotoButton();
    _fix3_DollhouseNavigation();
    _fix4_FloorDirectCalls();
    _fix5_MixSlidersVisibility();
    _fix6_FnDimensionWarning();
    _exposeDebug();
    console.log('[TurSync v2.1] ✅ toate fix-urile aplicate');
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
  function _fix2_TurFotoButton() {
    if (_tryInjectTurBtn()) return;
    const obs = new MutationObserver(() => {
      if (_tryInjectTurBtn()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 600000);
  }

  function _tryInjectTurBtn() {
    const topbar = document.getElementById('v3d-topbar');
    if (!topbar || document.getElementById('ts-tur-foto-btn')) return false;

    // Găsim primul rând de butoane
    const row = topbar.querySelector('div[style*="flex"]') || topbar;

    const turBtn = document.createElement('button');
    turBtn.id = 'ts-tur-foto-btn';
    turBtn.innerHTML = '✨ Tur Foto';
    turBtn.title = 'Tur virtual fotorealist — preview instant + AI Stable Diffusion + Gaussian Splat';
    turBtn.style.cssText = [
      'background:linear-gradient(135deg,rgba(168,85,247,.22),rgba(59,130,246,.15))',
      'color:#c084fc', 'border:1.5px solid rgba(168,85,247,.55)',
      'border-radius:7px', 'padding:4px 12px', 'font-size:11px', 'font-weight:800',
      'cursor:pointer', 'flex-shrink:0', 'white-space:nowrap', 'font-family:inherit',
      'margin-left:6px', 'min-height:30px', 'transition:all .2s',
    ].join(';');
    turBtn.onmouseover = () => turBtn.style.background = 'linear-gradient(135deg,rgba(168,85,247,.38),rgba(59,130,246,.25))';
    turBtn.onmouseout  = () => turBtn.style.background = 'linear-gradient(135deg,rgba(168,85,247,.22),rgba(59,130,246,.15))';
    turBtn.onclick = () => {
      // Deschide launcher-ul care creează overlay-ul înainte de _tfSelectLevel
      if (typeof window._showTurFotoLauncher === 'function') {
        window._showTurFotoLauncher();
      } else {
        // Fallback: creăm un overlay minimal direct
        if (typeof ss === 'function') ss('⚠ Modulul tur foto se încarcă... reîncercați în 2s');
        setTimeout(() => {
          if (typeof window._showTurFotoLauncher === 'function') window._showTurFotoLauncher();
          else if (typeof ss === 'function') ss('⚠ 30-tur-foto.js nu este disponibil în această pagină');
        }, 2000);
      }
    };
    row.appendChild(turBtn);

    const bimBtn = document.createElement('button');
    bimBtn.id = 'ts-glb-bim-btn';
    bimBtn.innerHTML = '📦 GLB+BIM';
    bimBtn.title = 'Export GLB semantic + IFC structural — Blender, Revit, Speckle';
    bimBtn.style.cssText = [
      'background:rgba(99,102,241,.15)', 'color:#818CF8',
      'border:1.5px solid rgba(99,102,241,.45)',
      'border-radius:7px', 'padding:4px 11px', 'font-size:11px', 'font-weight:700',
      'cursor:pointer', 'flex-shrink:0', 'white-space:nowrap', 'font-family:inherit',
      'margin-left:4px', 'min-height:30px',
    ].join(';');
    bimBtn.onclick = () => {
      if (typeof window._rvExportGLBSemantic === 'function') window._rvExportGLBSemantic();
      else if (typeof ss === 'function') ss('⚠ Modulul 32-glb-semantic-export.js nu este încărcat');
    };
    row.appendChild(bimBtn);

    console.log('[TurSync v2.1] ✅ butoane tur foto + GLB injectate în v3d-topbar');
    return true;
  }

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
      if (window.AEDIS && b?.P) { b.P.fn = window.AEDIS.fn || b.P.fn; }
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

})();
