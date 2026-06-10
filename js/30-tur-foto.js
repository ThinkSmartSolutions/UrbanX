// ═══════════════════════════════════════════════════════════════════════════
// 30-tur-foto.js — Tur Virtual Fotorealistic
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// PIPELINE HIBRID 3 NIVELURI:
//
//  L1 — PREVIEW INSTANT (gratuit, browser, ~3s/cameră)
//       Three.js CubeCamera → GLSL equirect shader → Pannellum tour
//
//  L2 — AI FOTOREALISTIC (Replicate API, ~20s/cameră, ~$0.002/cameră)
//       Equirect render → Replicate ControlNet/SDXL interior design
//       → PNG fotorealistic → Pannellum tour upgrade live
//
//  L3 — GAUSSIAN SPLAT (Luma AI API, ~3min total, ~$0.10/generare)
//       Three.js orbit video → Luma AI → .splat → SuperSplat viewer
//       Identic Matterport: dollhouse + walk-through + fotorealism complet
//
// INSTALARE index.html (după 29-completari-finale.js):
//   <script src="js/30-tur-foto.js?v=20260609"></script>
//
// CONFIG API KEYS (în localStorage sau window.URBANX_CONFIG):
//   localStorage.setItem('urbanx_replicate_key', 'r8_...')
//   localStorage.setItem('urbanx_luma_key', 'luma_...')
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────────────────
  const STATE = {
    scenes: {},          // { roomKey: { preview: blobURL, foto: blobURL } }
    pannellumConfig: null,
    lumaJobId: null,
    splatURL: null,
    activeLevel: 'preview', // 'preview' | 'foto' | 'splat'
    rendering: false,
  };

  // ── Config ────────────────────────────────────────────────────────────────
  const CFG = {
    get replicateKey() { return localStorage.getItem('urbanx_replicate_key') || window.URBANX_CONFIG?.replicateKey || ''; },
    get lumaKey()      { return localStorage.getItem('urbanx_luma_key')      || window.URBANX_CONFIG?.lumaKey      || ''; },
    equirectW:  4096,
    equirectH:  2048,
    pannellumCDN: 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/',
    superSplatCDN: 'https://cdn.jsdelivr.net/npm/@playcanvas/observer/dist/',
    lumaWebCDN: 'https://cdn.jsdelivr.net/npm/@lumaai/luma-web/dist/library/luma-web.js',
  };

  // ── Prompts per tip cameră + stil ────────────────────────────────────────
  const ROOM_PROMPTS = {
    living:   (stil) => `photorealistic interior living room, ${STIL_DESC[stil]||'modern'} style, natural lighting, high-end furniture, 8K quality, professional photography, architectural visualization`,
    bedroom:  (stil) => `photorealistic bedroom interior, ${STIL_DESC[stil]||'modern'} style, soft lighting, luxury bed, neutral colors, 8K quality, real estate photography`,
    kitchen:  (stil) => `photorealistic kitchen interior, ${STIL_DESC[stil]||'modern'} style, marble countertops, stainless appliances, natural light, 8K quality`,
    bath:     (stil) => `photorealistic luxury bathroom, ${STIL_DESC[stil]||'modern'} style, marble tiles, rainfall shower, natural light, 8K quality`,
    hall:     (stil) => `photorealistic hallway corridor, ${STIL_DESC[stil]||'modern'} style, clean minimal, wood floor, 8K quality`,
    core:     (stil) => `photorealistic stairwell elevator hall, ${STIL_DESC[stil]||'modern'} residential building, natural light, 8K quality`,
    balcon:   (stil) => `photorealistic balcony terrace, ${STIL_DESC[stil]||'modern'} architecture, city view, comfortable furniture, golden hour lighting`,
    default:  (stil) => `photorealistic interior room, ${STIL_DESC[stil]||'modern'} architecture style, high quality lighting, 8K professional render`,
  };

  const STIL_DESC = {
    modern:     'contemporary modern minimalist',
    inovator:   'bold avant-garde innovative',
    clasic:     'classic elegant traditional Romanian',
    minimalist: 'ultra-minimal Scandinavian',
    industrial: 'industrial loft exposed concrete',
  };

  // ── Wait for modules ──────────────────────────────────────────────────────
  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    const ok = typeof window.THREE !== 'undefined' &&
               typeof window._RV !== 'undefined' &&
               typeof window.VTour !== 'undefined';
    if (ok) { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 200);
  }

  waitReady(() => {
    // Butonul ✨ este injectat de 27-tur-sync.js (sursa unică)
    // _injectTurFotoButton() dezactivat pentru a evita duplicarea
    _injectSettingsPanel();
    console.log('[TurFoto v1] ✅ loaded — preview + Replicate AI | buton gestionat de 27-tur-sync');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // UI — Buton + Settings Panel
  // ═══════════════════════════════════════════════════════════════════════

  function _injectTurFotoButton() {
    const _try = () => {
      if (document.getElementById('tf-launch-btn')) return true;
      const topbar = document.getElementById('v3d-topbar') ||
                     document.querySelector('.rv-zoombar')?.parentElement;
      if (!topbar) return false;

      const btn = document.createElement('button');
      btn.id = 'tf-launch-btn';
      btn.innerHTML = '✨ Tur Fotorealist';
      btn.title = 'Generează tur virtual fotorealistic — 3 niveluri de calitate';
      btn.style.cssText = `
        background: linear-gradient(135deg, rgba(168,85,247,.2), rgba(59,130,246,.15));
        color: #c084fc; border: 1.5px solid rgba(168,85,247,.5);
        border-radius: 8px; padding: 6px 14px; font-size: 11px; font-weight: 800;
        cursor: pointer; font-family: inherit; flex-shrink: 0; min-height: 34px;
        letter-spacing: .3px; white-space: nowrap;
        transition: all .2s; box-shadow: 0 2px 12px rgba(168,85,247,.2);
      `;
      btn.onmouseover = () => btn.style.background = 'linear-gradient(135deg, rgba(168,85,247,.35), rgba(59,130,246,.25))';
      btn.onmouseout  = () => btn.style.background = 'linear-gradient(135deg, rgba(168,85,247,.2), rgba(59,130,246,.15))';
      btn.onclick = () => _showTurFotoLauncher();
      topbar.appendChild(btn);
      return true;
    };
    if (_try()) return;
    const obs = setInterval(() => { if (_try()) clearInterval(obs); }, 800);
    setTimeout(() => clearInterval(obs), 20000);
  }

  function _injectSettingsPanel() {
    // Injectăm în panoul din dreapta al relevee-ului
    const _try = () => {
      if (document.getElementById('tf-settings')) return true;
      const rpanel = document.querySelector('.rv-rpanel');
      if (!rpanel) return false;

      const sec = document.createElement('div');
      sec.id = 'tf-settings';
      sec.className = 'rv-rsec';
      sec.style.cssText = 'border-top: 1px solid rgba(168,85,247,.15); padding-top: 10px; margin-top: 8px;';
      sec.innerHTML = `
        <div class="rv-rst" style="color: rgba(192,132,252,.8)">🔑 API KEYS — TUR FOTOREALIST</div>
        <div style="font-size:8px;color:#64748B;margin-bottom:6px;font-family:IBM Plex Mono,monospace">
          Necesare pentru render AI și Gaussian Splat
        </div>
        <div style="margin-bottom:6px">
          <div style="font-size:7px;color:#94A3B8;margin-bottom:2px">Replicate API Key (AI Fotorealist)</div>
          <div style="display:flex;gap:4px">
            <input type="password" id="tf-replicate-key" placeholder="r8_xxxxxxxxxxxx"
              style="flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
                     border-radius:4px;color:#DDE6F5;font-size:9px;padding:4px 6px;font-family:IBM Plex Mono,monospace"
              value="${localStorage.getItem('urbanx_replicate_key') || ''}">
            <button onclick="_tfSaveKey('replicate')"
              style="padding:4px 7px;background:rgba(168,85,247,.2);border:1px solid rgba(168,85,247,.4);
                     border-radius:4px;color:#c084fc;font-size:8px;font-weight:700;cursor:pointer">Save</button>
          </div>
          <div style="font-size:7px;color:#475569;margin-top:2px">
            <a href="https://replicate.com/account/api-tokens" target="_blank"
               style="color:#7C3AED">replicate.com/account</a> · ~$0.002/render
          </div>
        </div>
        <div>
          <div style="font-size:7px;color:#94A3B8;margin-bottom:2px">Luma AI Key (Gaussian Splat)</div>
          <div style="display:flex;gap:4px">
            <input type="password" id="tf-luma-key" placeholder="luma_xxxxxxxxxxxx"
              style="flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
                     border-radius:4px;color:#DDE6F5;font-size:9px;padding:4px 6px;font-family:IBM Plex Mono,monospace"
              value="${localStorage.getItem('urbanx_luma_key') || ''}">
            <button onclick="_tfSaveKey('luma')"
              style="padding:4px 7px;background:rgba(168,85,247,.2);border:1px solid rgba(168,85,247,.4);
                     border-radius:4px;color:#c084fc;font-size:8px;font-weight:700;cursor:pointer">Save</button>
          </div>
          <div style="font-size:7px;color:#475569;margin-top:2px">
            <a href="https://lumalabs.ai/luma-api" target="_blank"
               style="color:#7C3AED">lumalabs.ai/luma-api</a> · ~$0.10/splat
          </div>
        </div>
      `;
      rpanel.appendChild(sec);
      return true;
    };
    if (_try()) return;
    const obs = setInterval(() => { if (_try()) clearInterval(obs); }, 1500);
    setTimeout(() => clearInterval(obs), 20000);
  }

  window._tfSaveKey = (type) => {
    const val = document.getElementById('tf-' + type + '-key')?.value?.trim();
    if (!val) return;
    localStorage.setItem('urbanx_' + type + '_key', val);
    if (typeof ss === 'function') ss('✅ ' + type.charAt(0).toUpperCase() + type.slice(1) + ' API key salvat');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // LAUNCHER — alege nivelul și pornește pipeline-ul
  // ═══════════════════════════════════════════════════════════════════════

  function _showTurFotoLauncher() {
    if (document.getElementById('tf-launcher-overlay')) {
      document.getElementById('tf-launcher-overlay').remove();
    }
    const b = window._RV?.building;
    const P = window._RV?.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }

    const A = window.AEDIS || {};
    const hasReplicate = !!CFG.replicateKey;
    const hasLuma      = !!CFG.lumaKey;

    const overlay = document.createElement('div');
    overlay.id = 'tf-launcher-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(8,14,30,.96);z-index:99999;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    `;

    overlay.innerHTML = `
      <div style="max-width:680px;width:90%;padding:0 20px">

        <!-- Header -->
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:32px;margin-bottom:8px">✨</div>
          <h2 style="color:#fff;font-size:22px;margin:0 0 8px">Tur Virtual Fotorealist</h2>
          <p style="color:#64748B;font-size:12px;margin:0">
            ${P.nrCad} · ${A.fn || 'Rezidențial'} · ${b.niv} niveluri · ${b.bW?.toFixed(1)}×${b.bD?.toFixed(1)}m
          </p>
        </div>

        <!-- 3 opțiuni -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:28px">

          <!-- L1 Preview -->
          <div id="tf-opt-preview" onclick="_tfSelectLevel('preview')" style="
            background:rgba(255,255,255,.04);border:2px solid rgba(99,102,241,.4);
            border-radius:14px;padding:20px;cursor:pointer;transition:all .2s;text-align:center
          " onmouseover="this.style.borderColor='rgba(99,102,241,.8)'" onmouseout="this.style.borderColor='rgba(99,102,241,.4)'">
            <div style="font-size:28px;margin-bottom:10px">⚡</div>
            <div style="color:#818CF8;font-size:13px;font-weight:700;margin-bottom:6px">Preview Instant</div>
            <div style="color:#64748B;font-size:11px;line-height:1.5">
              WebGL PBR<br>
              <span style="color:#4ADE80">Gratuit · 3s/cameră</span><br>
              Disponibil imediat
            </div>
          </div>

          <!-- L2 AI Fotorealistic -->
          <div id="tf-opt-foto" onclick="_tfSelectLevel('foto')" style="
            background:${hasReplicate ? 'rgba(168,85,247,.06)' : 'rgba(255,255,255,.02)'};
            border:2px solid ${hasReplicate ? 'rgba(168,85,247,.5)' : 'rgba(100,116,139,.3)'};
            border-radius:14px;padding:20px;cursor:${hasReplicate ? 'pointer' : 'default'};
            transition:all .2s;text-align:center;opacity:${hasReplicate ? '1' : '.5'}
          " ${hasReplicate ? 'onmouseover="this.style.borderColor=\'rgba(168,85,247,.9)\'"' : ''}
             ${hasReplicate ? 'onmouseout="this.style.borderColor=\'rgba(168,85,247,.5)\'"' : ''}>
            <div style="font-size:28px;margin-bottom:10px">🎨</div>
            <div style="color:#C084FC;font-size:13px;font-weight:700;margin-bottom:6px">AI Fotorealist</div>
            <div style="color:#64748B;font-size:11px;line-height:1.5">
              Stable Diffusion XL<br>
              <span style="color:${hasReplicate ? '#FCD34D' : '#EF4444'}">
                ${hasReplicate ? '$0.002/cameră · 20s' : '⚠ Replicate key lipsă'}
              </span><br>
              Interior design LoRA
            </div>
          </div>

          <!-- L3 Gaussian Splat -->
          <div id="tf-opt-splat" onclick="_tfSelectLevel('splat')" style="
            background:${hasLuma ? 'rgba(34,197,94,.05)' : 'rgba(255,255,255,.02)'};
            border:2px solid ${hasLuma ? 'rgba(34,197,94,.45)' : 'rgba(100,116,139,.3)'};
            border-radius:14px;padding:20px;cursor:${hasLuma ? 'pointer' : 'default'};
            transition:all .2s;text-align:center;opacity:${hasLuma ? '1' : '.5'}
          " ${hasLuma ? 'onmouseover="this.style.borderColor=\'rgba(34,197,94,.9)\'"' : ''}
             ${hasLuma ? 'onmouseout="this.style.borderColor=\'rgba(34,197,94,.45)\'"' : ''}>
            <div style="font-size:28px;margin-bottom:10px">🌟</div>
            <div style="color:#4ADE80;font-size:13px;font-weight:700;margin-bottom:6px">Gaussian Splat</div>
            <div style="color:#64748B;font-size:11px;line-height:1.5">
              Luma AI · NeRF 3D<br>
              <span style="color:${hasLuma ? '#FCD34D' : '#EF4444'}">
                ${hasLuma ? '$0.10/generare · 3min' : '⚠ Luma key lipsă'}
              </span><br>
              Identic Matterport
            </div>
          </div>
        </div>

        <!-- Progress area (hidden initially) -->
        <div id="tf-progress-area" style="display:none;text-align:center;margin-bottom:20px">
          <div id="tf-progress-msg" style="color:#DDE6F5;font-size:13px;margin-bottom:10px"></div>
          <div style="background:rgba(255,255,255,.08);border-radius:99px;height:6px;overflow:hidden">
            <div id="tf-progress-bar" style="height:6px;background:linear-gradient(90deg,#7C3AED,#C084FC);border-radius:99px;width:0%;transition:width .4s"></div>
          </div>
          <div id="tf-progress-detail" style="color:#64748B;font-size:10px;margin-top:8px;font-family:IBM Plex Mono,monospace"></div>
        </div>

        <!-- Close -->
        <div style="text-align:center">
          <button onclick="document.getElementById('tf-launcher-overlay').remove()"
            style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
                   border-radius:8px;color:#94A3B8;padding:8px 20px;font-size:11px;cursor:pointer">
            Închide
          </button>
          ${!hasReplicate || !hasLuma ? `
          <div style="color:#475569;font-size:10px;margin-top:12px">
            Configurează API keys în panoul din dreapta pentru a activa L2 și L3
          </div>` : ''}
        </div>

      </div>
    `;

    document.body.appendChild(overlay);
  }

  window._tfSelectLevel = async function (level) {
    const b = window._RV?.building;
    if (!b) return;

    if (level === 'foto' && !CFG.replicateKey) { alert('Configurează Replicate API key mai întâi.'); return; }
    if (level === 'splat') {
      // Delegăm întotdeauna la 34-gaussian-splat-auto.js
      if (typeof window._gsLaunch === 'function') {
        STATE.rendering = false;
        document.getElementById('tf-launcher-overlay')?.remove();
        window._gsLaunch();
        return;
      }
      if (!CFG.lumaKey) { alert('Configurează Luma AI API key mai întâi.'); return; }
    }
    if (STATE.rendering) return;

    STATE.rendering = true;
    STATE.activeLevel = level;

    _tfProgress('Pregătesc scena 3D…', 5);
    const _pa = document.getElementById('tf-progress-area');
    if (_pa) _pa.style.display = 'block';
    else {
      // Launcher overlay not open yet - open it first
      if (typeof _showTurFotoLauncher === 'function') _showTurFotoLauncher();
      setTimeout(() => { const pa2 = document.getElementById('tf-progress-area'); if(pa2) pa2.style.display='block'; }, 400);
    }

    try {
      if (level === 'preview' || level === 'foto') {
        await _runPanoramasPipeline(level);
      } else if (level === 'splat') {
        await _runGaussianSplatPipeline();
      }
    } catch (e) {
      console.error('[TurFoto]', e);
      _tfProgress('⚠ Eroare: ' + e.message, 100, 'error');
      STATE.rendering = false;
    }
  };

  function _tfProgress(msg, pct, type) {
    const area = document.getElementById('tf-progress-area');
    const msgEl = document.getElementById('tf-progress-msg');
    const bar   = document.getElementById('tf-progress-bar');
    const det   = document.getElementById('tf-progress-detail');
    if (!area) return;
    area.style.display = 'block';
    if (msgEl) msgEl.textContent = msg;
    if (bar) {
      bar.style.width = pct + '%';
      bar.style.background = type === 'error' ? '#EF4444' :
                             type === 'done'  ? 'linear-gradient(90deg,#22C55E,#4ADE80)' :
                             'linear-gradient(90deg,#7C3AED,#C084FC)';
    }
    if (typeof ss === 'function') ss(msg);
  }

  function _tfDetail(msg) {
    const el = document.getElementById('tf-progress-detail');
    if (el) el.textContent = msg;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // L1 + L2 — PANORAME EQUIRECTANGULARE
  // ═══════════════════════════════════════════════════════════════════════

  async function _runPanoramasPipeline(level) {
    const b = window._RV?.building;
    const fl = window._RV?.floors?.[0];
    if (!fl?.rects) throw new Error('Plan de nivel indisponibil');

    // ── Build VTour scene dacă nu e activă ──────────────────────────────
    _tfProgress('Construiesc scena 3D…', 8);
    const scene = await _ensureVTourScene();
    // Anchor din 36-vtour-fixes.js (funcționează în orice context)
    const anchor = (typeof window._rvGetAnchor === 'function')
      ? window._rvGetAnchor()
      : window.VTour?._state?._anchor;
    if (!scene || !anchor) throw new Error('Scena 3D nu poate fi construită. Deschideți viewer-ul 3D înainte.');

    // ── Colectează camerele principale ──────────────────────────────────
    const rooms = fl.rects.filter(r => !r.bal && r.apt >= 0 && r.w * r.h >= 4 &&
      ['living', 'bedroom', 'bedroom2', 'bedroom3', 'kitchen', 'bath', 'hall', 'balcon'].includes(r.t));

    if (rooms.length === 0) throw new Error('Nu există camere valide în plan');

    const ox = anchor.cx - b.bW / 2;
    const oz = anchor.cz - b.bD / 2;

    const scenes = {};
    const total = rooms.length;

    // ── Render cubemap per cameră ────────────────────────────────────────
    for (let i = 0; i < total; i++) {
      const r = rooms[i];
      const key = `${r.t}_${r.apt}_${i}`;
      const pct = Math.round(10 + (i / total) * 45);
      _tfProgress(`Render cameră ${i + 1}/${total}: ${_roomLabel(r.t)}…`, pct);
      _tfDetail(`Pozitie: x=${(ox + r.x + r.w/2).toFixed(1)} z=${(oz + r.y + r.h/2).toFixed(1)}`);

      const worldX = ox + r.x + r.w / 2;
      const worldY = anchor.baseY + 1.5; // înălțime ochi
      const worldZ = oz + r.y + r.h / 2;

      let equirectURL = null;
      try {
        equirectURL = await _renderCubemapToEquirect(scene, worldX, worldY, worldZ);
      } catch (renderErr) {
        console.warn('[TurFoto] Eroare render cameră ' + (i+1) + ':', renderErr.message);
        equirectURL = await _generatePlaceholderPanorama(worldX, worldZ);
      }
      scenes[key] = {
        r, equirectURL,
        label: _roomLabel(r.t),
        worldX, worldY, worldZ,
        fotoURL: null,
      };
    }

    STATE.scenes = scenes;

    // ── Launch Pannellum cu preview ──────────────────────────────────────
    _tfProgress('Lansez tur virtual…', 58);
    const config = _buildPannellumConfig(scenes, rooms, ox, oz);
    STATE.pannellumConfig = config;

    _launchPannellumTour(config, 'preview');

    if (level === 'preview') {
      _tfProgress('✅ Tur preview gata!', 100, 'done');
      STATE.rendering = false;
      return;
    }

    // ── L2: Upload la Replicate pentru fiecare cameră ─────────────────
    _tfProgress('Trimit la Replicate AI…', 60);
    const keys = Object.keys(scenes);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const sc = scenes[key];
      const pct = Math.round(60 + (i / keys.length) * 38);
      _tfProgress(`Render AI ${i + 1}/${keys.length}: ${sc.label}…`, pct);
      _tfDetail('Stable Diffusion XL interior design · ~20s');

      try {
        sc.fotoURL = await _uploadToReplicate(sc.equirectURL, sc.r.t);
        // Actualizăm tur live
        _updatePannellumScene(key, sc.fotoURL);
      } catch (e) {
        console.warn('[TurFoto] Replicate error pentru', key, e.message);
        sc.fotoURL = sc.equirectURL; // fallback la preview
      }
    }

    _tfProgress('✅ Tur fotorealist AI gata!', 100, 'done');
    STATE.rendering = false;
    STATE.activeLevel = 'foto';
  }

  // ── Render CubeCamera → Equirectangular (GLSL shader) ──────────────────
  async function _renderCubemapToEquirect(scene, x, y, z) {
    return new Promise((resolve) => {
      const THREE = window.THREE;
      if (!THREE) { resolve(null); return; }

      // ── iOS Safari detection — WebGLCubeRenderTarget nu funcționează ──
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

      if (isIOS) {
        // iOS fallback: captură 2D din camera viewer-ului existent
        _renderFallbackIOS(scene, x, y, z, resolve);
        return;
      }

      const W = CFG.equirectW, H = CFG.equirectH;

      // Preferăm renderer-ul VTour existent (evităm probleme cu texturile cross-context)
      const vtState = window.VTour?._state;
      let renderer, ownRenderer = false;
      
      if (vtState?.renderer && vtState.scene === scene) {
        // Scena e a VTour → folosim renderer-ul lui direct
        renderer = vtState.renderer;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.8;
      } else {
        // Scenă proprie (clonată) → renderer nou cu preserveDrawingBuffer
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
        renderer.setSize(W, H);
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.8;
        if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
        ownRenderer = true;
      }

      // CubeCamera
      const cubeRT = new THREE.WebGLCubeRenderTarget(1024, {
        format: THREE.RGBAFormat,
        generateMipmaps: false,
        minFilter: THREE.LinearFilter,
      });
      const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRT);
      cubeCamera.position.set(x, y, z);
      scene.add(cubeCamera);
      cubeCamera.update(renderer, scene);
      scene.remove(cubeCamera);

      // Equirectangular conversion via fragment shader
      const equirectScene = new THREE.Scene();
      const equirectCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const equirectMat = new THREE.ShaderMaterial({
        uniforms: { envMap: { value: cubeRT.texture } },
        vertexShader: `
          varying vec2 vUV;
          void main() {
            vUV = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform samplerCube envMap;
          varying vec2 vUV;
          #define PI 3.141592653589793
          void main() {
            float phi   = vUV.y * PI;          // 0..PI
            float theta = vUV.x * 2.0 * PI;   // 0..2PI
            vec3 dir = vec3(
              sin(phi) * cos(theta),
              cos(phi),
              sin(phi) * sin(theta)
            );
            gl_FragColor = textureCube(envMap, dir);
          }
        `,
        depthWrite: false,
      });

      const equirectMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), equirectMat);
      equirectScene.add(equirectMesh);

      // Render equirectangular
      const equirectTarget = new THREE.WebGLRenderTarget(W, H);
      renderer.setRenderTarget(equirectTarget);
      renderer.render(equirectScene, equirectCamera);
      renderer.setRenderTarget(null);

      // Read pixels
      const pixels = new Uint8Array(W * H * 4);
      renderer.readRenderTargetPixels(equirectTarget, 0, 0, W, H, pixels);

      // Draw to canvas (flip Y — WebGL origin is bottom-left)
      const outCanvas = document.createElement('canvas');
      outCanvas.width = W; outCanvas.height = H;
      const ctx = outCanvas.getContext('2d');
      const imageData = ctx.createImageData(W, H);
      for (let row = 0; row < H; row++) {
        const srcRow = H - 1 - row;
        imageData.data.set(pixels.subarray(srcRow * W * 4, (srcRow + 1) * W * 4), row * W * 4);
      }
      ctx.putImageData(imageData, 0, 0);

      // Cleanup (dispose numai renderer-ul propriu)
      if (ownRenderer) renderer.dispose();
      cubeRT.dispose();
      equirectTarget.dispose();
      equirectMat.dispose();

      outCanvas.toBlob(blob => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.92);
    });
  }

  // ── iOS Safari fallback: render simplu 2D per cameră ────────────────────
  function _renderFallbackIOS(scene, x, y, z, resolve) {
    const THREE = window.THREE;
    const vtState = window.VTour?._state;

    // Folosim renderer-ul existent din VTour dacă e disponibil
    const renderer = vtState?.renderer;
    const camera   = vtState?.camera;

    if (!renderer || !camera) {
      // Fără renderer — generăm o imagine placeholder cu gradient
      _generatePlaceholderPanorama(x, z).then(resolve);
      return;
    }

    try {
      // Salvăm starea camerei
      const origPos = camera.position.clone();
      const origTarget = vtState.controls?.target?.clone?.() || new THREE.Vector3(x, y, z + 1);

      // Mutăm camera la poziția camerei
      camera.position.set(x, y + 1.5, z);
      camera.lookAt(x + 1, y + 1.5, z);

      // Render la resoliție redusă (safe pe iOS)
      const W = 1024, H = 512;
      renderer.setSize(W, H, false);
      renderer.render(scene, camera);

      // Capturăm din canvas
      const srcCanvas = renderer.domElement;
      const outCanvas = document.createElement('canvas');
      outCanvas.width = W; outCanvas.height = H;
      const ctx = outCanvas.getContext('2d');
      ctx.drawImage(srcCanvas, 0, 0, W, H);

      // Restaurăm renderer la dimensiunea originală
      const win = renderer.domElement.parentElement;
      const origW = win?.clientWidth || 800;
      const origH = win?.clientHeight || 600;
      renderer.setSize(origW, origH, false);

      // Restaurăm camera
      camera.position.copy(origPos);
      if (vtState.controls?.target) vtState.controls.target.copy(origTarget);

      outCanvas.toBlob(blob => {
        if(blob) { resolve(URL.createObjectURL(blob)); } else { _generatePlaceholderPanorama(x, z).then(resolve); }
      }, 'image/jpeg', 0.85);

    } catch (e) {
      console.warn('[TurFoto iOS]', e.message);
      _generatePlaceholderPanorama(x, z).then(resolve);
    }
  }

  async function _generatePlaceholderPanorama(x, z) {
    // Generăm o panoramă placeholder cu gradient cer + teren
    const W = 1024, H = 512;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');

    // Cer gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.6);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(1, '#E0F0FF');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H * 0.6);

    // Teren
    ctx.fillStyle = '#8BC34A';
    ctx.fillRect(0, H * 0.6, W, H * 0.4);

    // Text informativ
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Preview · x=' + x.toFixed(1) + ' z=' + z.toFixed(1), W/2, H/2);
    ctx.font = '16px sans-serif';
    ctx.fillText('iOS: preview simplificat', W/2, H/2 + 30);

    // Pannellum nu acceptă dataURL lung — convertim la Blob URL
    return new Promise(function(res) {
      cv.toBlob(function(blob) {
        res(blob ? URL.createObjectURL(blob) : null);
      }, 'image/jpeg', 0.85);
    });
  }


  // ── Ensure VTour scene is built ──────────────────────────────────────────
  async function _ensureVTourScene() {
    // Dacă VTour e activ și are scenă, o folosim direct
    const vState = window.VTour?._state;
    if (vState?.scene && vState.active) return vState.scene;

    // Folosim funcția din 36-vtour-fixes.js care gestionează toate contextele
    if (typeof window._buildTurFotoScene === 'function') {
      const scene = window._buildTurFotoScene();
      if (scene) return scene;
    }

    // Fallback local: construim o scenă minimală din V3D
    const THREE = window.THREE;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xc5dff0);

    // Copiem meshurile din V3D dacă există
    const V3D = window.V3D;
    if (V3D?.aedis?.length > 0) {
      V3D.aedis.forEach(m => {
        if (m && m.isObject3D) {
          const clone = m.clone();
          scene.add(clone);
        }
      });
    }

    // Iluminare
    const amb = new THREE.AmbientLight(0xfff5e4, 0.6);
    scene.add(amb);
    const sun = new THREE.DirectionalLight(0xfff0d8, 2.0);
    sun.position.set(50, 80, 30);
    sun.castShadow = true;
    scene.add(sun);
    const hemi = new THREE.HemisphereLight(0xcce4f5, 0x7a8466, 0.55);
    scene.add(hemi);

    // HDRI
    if (THREE.RGBELoader) {
      try {
        await new Promise(res => {
          new THREE.RGBELoader().load('assets/tur3d/hdri/interior.hdr',
            tex => {
              if (THREE.EquirectangularReflectionMapping) {
                tex.mapping = THREE.EquirectangularReflectionMapping;
              }
              scene.environment = tex;
              res();
            }, undefined, () => res()
          );
        });
      } catch (e) {}
    }

    return scene;
  }

  // ── Build Pannellum config ───────────────────────────────────────────────
  function _buildPannellumConfig(scenes, rooms, ox, oz) {
    const config = { default: { firstScene: null, sceneFadeDuration: 1500 }, scenes: {} };
    const keys = Object.keys(scenes);

    keys.forEach((key, i) => {
      const sc = scenes[key];
      if (i === 0) config.default.firstScene = key;

      const hotspots = [];
      // Hotspot-uri spre camere adiacente (găsim camere cu distanță < 6m)
      keys.forEach((otherKey, j) => {
        if (j === i) return;
        const other = scenes[otherKey];
        const dist = Math.hypot(sc.worldX - other.worldX, sc.worldZ - other.worldZ);
        if (dist < 7) {
          // Calculăm unghiul yaw pentru hotspot
          const dx = other.worldX - sc.worldX;
          const dz = other.worldZ - sc.worldZ;
          const yaw = Math.atan2(dx, -dz) * (180 / Math.PI);
          hotspots.push({
            type: 'scene',
            sceneId: otherKey,
            text: other.label,
            yaw,
            pitch: -10,
          });
        }
      });

      config.scenes[key] = {
        title: sc.label,
        panorama: sc.equirectURL || sc.fotoURL || '',
        hotSpots: hotspots,
        hfov: 100,
        autoLoad: true,
      };
    });

    return config;
  }

  // ── Update Pannellum scene cu foto URL ──────────────────────────────────
  function _updatePannellumScene(key, fotoURL) {
    if (!STATE.pannellumConfig?.scenes?.[key]) return;
    STATE.pannellumConfig.scenes[key].panorama = fotoURL;

    const viewer = window._tfPannellumViewer;
    if (viewer && typeof viewer.loadScene === 'function') {
      try {
        // Reload current scene if it's the one updated
        const current = viewer.getScene?.();
        if (current === key) viewer.loadScene(key);
      } catch (e) {}
    }
  }

  // ── Launch Pannellum viewer ──────────────────────────────────────────────
  function _launchPannellumTour(config, level) {
    _loadPannellumCSS();
    _injectMobileCSS();

    if (document.getElementById('tf-tour-overlay')) {
      document.getElementById('tf-tour-overlay').remove();
    }
    if (document.getElementById('tf-launcher-overlay')) {
      document.getElementById('tf-launcher-overlay').remove();
    }

    const overlay = document.createElement('div');
    overlay.id = 'tf-tour-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;background:#000;z-index:99998;
      display:flex;flex-direction:column;
    `;

    const sceneCount = Object.keys(config.scenes).length;
    const A = window.AEDIS || {};

    overlay.innerHTML = `
      <!-- Top bar -->
      <div style="
        display:flex;align-items:center;justify-content:space-between;
        padding:10px 16px;background:rgba(8,14,30,.95);
        border-bottom:1px solid rgba(168,85,247,.2);flex-shrink:0;
        z-index:10;
      ">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="color:#C084FC;font-size:14px;font-weight:700">✨ Tur Virtual</span>
          <span style="color:#475569;font-size:10px">${sceneCount} camere · ${A.fn || ''} · ${A.stil || ''}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <!-- Level toggle -->
          <div style="display:flex;gap:4px;background:rgba(255,255,255,.05);border-radius:6px;padding:2px">
            <button id="tf-btn-preview" onclick="_tfSwitchLevel('preview')"
              style="padding:4px 10px;border-radius:5px;font-size:10px;font-weight:700;cursor:pointer;border:none;
                     background:${level==='preview'?'rgba(99,102,241,.4)':'transparent'};
                     color:${level==='preview'?'#818CF8':'#475569'}">⚡ Preview</button>
            <button id="tf-btn-foto" onclick="_tfSwitchLevel('foto')"
              style="padding:4px 10px;border-radius:5px;font-size:10px;font-weight:700;cursor:pointer;border:none;
                     background:${level==='foto'?'rgba(168,85,247,.4)':'transparent'};
                     color:${level==='foto'?'#C084FC':'#475569'}">🎨 AI Foto</button>
            <button id="tf-btn-splat" onclick="_tfSwitchLevel('splat')"
              style="padding:4px 10px;border-radius:5px;font-size:10px;font-weight:700;cursor:pointer;border:none;
                     background:transparent;color:#475569">🌟 3D Splat</button>
          </div>
          <button onclick="document.getElementById('tf-tour-overlay').remove()"
            style="background:rgba(239,68,68,.15);color:#FCA5A5;border:1px solid rgba(239,68,68,.3);
                   border-radius:7px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer">
            ✕ Închide
          </button>
        </div>
      </div>

      <!-- Main area: Pannellum + Minimap -->
      <div style="flex:1;position:relative;overflow:hidden">
        <div id="tf-pannellum-container" style="width:100%;height:100%"></div>

        <!-- Minimap -->
        <div id="tf-minimap" style="
          position:absolute;bottom:16px;right:16px;
          width:140px;height:110px;background:rgba(8,14,30,.9);
          border:1px solid rgba(168,85,247,.25);border-radius:10px;overflow:hidden;z-index:10
        ">
          <canvas id="tf-minimap-canvas" width="140" height="110"
            style="width:100%;height:100%;cursor:pointer"
            onclick="_tfMinimapClick(event)"></canvas>
        </div>

        <!-- Camera title -->
        <div id="tf-room-title" style="
          position:absolute;bottom:16px;left:16px;
          background:rgba(8,14,30,.85);border:1px solid rgba(168,85,247,.2);
          border-radius:8px;padding:8px 14px;color:#DDE6F5;font-size:11px;font-weight:700;z-index:10
        "></div>

        <!-- Loading indicator pentru AI renders -->
        <div id="tf-ai-loading" style="
          position:absolute;top:16px;left:50%;transform:translateX(-50%);
          background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.3);
          border-radius:8px;padding:8px 16px;color:#C084FC;font-size:11px;font-weight:700;
          z-index:10;display:none
        ">🎨 Render AI în curs…</div>
      </div>

      <!-- Bottom: scene navigation -->
      <div id="tf-scene-bar" style="
        display:flex;align-items:center;gap:6px;padding:8px 16px;
        background:rgba(8,14,30,.95);border-top:1px solid rgba(168,85,247,.1);
        overflow-x:auto;flex-shrink:0;scrollbar-width:none
      ">
        <span style="color:#475569;font-size:9px;font-weight:700;flex-shrink:0">CAMERE:</span>
      </div>
    `;

    document.body.appendChild(overlay);

    // Adaugă butoane camere
    const sceneBar = document.getElementById('tf-scene-bar');
    Object.entries(config.scenes).forEach(([key, sc]) => {
      const btn = document.createElement('button');
      btn.dataset.sceneKey = key;
      btn.innerHTML = _roomEmoji(STATE.scenes[key]?.r?.t) + ' ' + sc.title;
      btn.style.cssText = `
        padding:5px 12px;border-radius:6px;cursor:pointer;font-size:10px;font-weight:600;
        border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);
        color:#94A3B8;white-space:nowrap;flex-shrink:0;transition:all .15s;font-family:inherit
      `;
      btn.onclick = () => {
        window._tfPannellumViewer?.loadScene?.(key);
        _tfUpdateRoomTitle(key);
        document.querySelectorAll('#tf-scene-bar button').forEach(b => {
          b.style.background = 'rgba(255,255,255,.05)';
          b.style.color = '#94A3B8';
          b.style.borderColor = 'rgba(255,255,255,.1)';
        });
        btn.style.background = 'rgba(168,85,247,.2)';
        btn.style.color = '#C084FC';
        btn.style.borderColor = 'rgba(168,85,247,.4)';
      };
      sceneBar.appendChild(btn);
    });

    // Init Pannellum
    _initPannellum(config);
    _drawMinimap2(config);
  }

  function _initPannellum(config) {
    const _load = () => {
      if (!window.pannellum) {
        _loadPannellumJS(() => _initPannellum(config));
        return;
      }
      const container = document.getElementById('tf-pannellum-container');
      if (!container) return;
      window._tfPannellumViewer = window.pannellum.viewer(container, {
        ...config,
        compass: true,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        mouseZoom: true,
        keyboardZoom: true,
        sceneFadeDuration: 1000,
      });
      window._tfPannellumViewer.on?.('scenechange', (sceneId) => {
        _tfUpdateRoomTitle(sceneId);
        _drawMinimap2(config, sceneId);
      });
      // Set title pentru prima scenă
      const first = config.default.firstScene;
      if (first) _tfUpdateRoomTitle(first);
    };
    setTimeout(_load, 200);
  }

  function _tfUpdateRoomTitle(key) {
    const el = document.getElementById('tf-room-title');
    if (!el) return;
    const sc = STATE.scenes[key];
    if (!sc) return;
    el.innerHTML = _roomEmoji(sc.r.t) + ' ' + sc.label +
      `<span style="color:#64748B;font-size:9px;margin-left:8px">${(sc.r.w * sc.r.h).toFixed(1)} m²</span>` +
      (sc.fotoURL ? ' <span style="color:#4ADE80;font-size:9px">✅ AI</span>' : '');
  }

  function _drawMinimap2(config, activeKey) {
    const cv = document.getElementById('tf-minimap-canvas');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const b = window._RV?.building;
    const fl = window._RV?.floors?.[0];
    if (!b || !fl) { ctx.fillStyle = '#0F172A'; ctx.fillRect(0, 0, 140, 110); return; }

    const W = 140, H = 110;
    const SC = Math.min((W - 12) / b.bW, (H - 12) / b.bD);
    const offX = (W - b.bW * SC) / 2, offY = (H - b.bD * SC) / 2;

    ctx.fillStyle = '#0F172A'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#1E293B'; ctx.fillRect(offX, offY, b.bW * SC, b.bD * SC);
    ctx.strokeStyle = 'rgba(168,85,247,.4)'; ctx.lineWidth = 1; ctx.strokeRect(offX, offY, b.bW * SC, b.bD * SC);

    fl.rects.forEach(r => {
      if (r.bal) return;
      const CM = { living: '#FEF3C7', bedroom: '#DCFCE7', kitchen: '#DBEAFE', bath: '#EDE9FE', hall: '#E2E8F0', core: '#CBD5E1' };
      ctx.fillStyle = CM[r.t] || '#F1F5F9';
      ctx.fillRect(offX + r.x * SC, offY + r.y * SC, r.w * SC, r.h * SC);
    });

    // Puncte camere
    Object.entries(STATE.scenes).forEach(([key, sc]) => {
      const anchor = window.VTour?._state?._anchor || { cx: b.bW/2, cz: b.bD/2 };
      const ox = anchor.cx - b.bW / 2, oz = anchor.cz - b.bD / 2;
      const px = offX + (sc.worldX - ox) * SC;
      const pz = offY + (sc.worldZ - oz) * SC;
      const isActive = key === activeKey;
      ctx.fillStyle = isActive ? '#C084FC' : (sc.fotoURL ? '#4ADE80' : '#64748B');
      ctx.beginPath(); ctx.arc(px, pz, isActive ? 5 : 3, 0, Math.PI * 2); ctx.fill();
      if (isActive) {
        ctx.strokeStyle = 'rgba(192,132,252,.5)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(px, pz, 8, 0, Math.PI * 2); ctx.stroke();
      }
    });
  }

  window._tfMinimapClick = function (e) {
    const cv = document.getElementById('tf-minimap-canvas');
    const b = window._RV?.building;
    if (!cv || !b) return;
    const rect = cv.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (140 / rect.width);
    const my = (e.clientY - rect.top) * (110 / rect.height);
    const SC = Math.min((140 - 12) / b.bW, (110 - 12) / b.bD);
    const offX = (140 - b.bW * SC) / 2, offY = (110 - b.bD * SC) / 2;
    const anchor = window.VTour?._state?._anchor || { cx: b.bW/2, cz: b.bD/2 };
    const ox = anchor.cx - b.bW / 2, oz = anchor.cz - b.bD / 2;

    let closest = null, minD = 20;
    Object.entries(STATE.scenes).forEach(([key, sc]) => {
      const px = offX + (sc.worldX - ox) * SC;
      const pz = offY + (sc.worldZ - oz) * SC;
      const d = Math.hypot(mx - px, my - pz);
      if (d < minD) { minD = d; closest = key; }
    });
    if (closest) window._tfPannellumViewer?.loadScene?.(closest);
  };

  window._tfSwitchLevel = async function (level) {
    if (level === STATE.activeLevel) return;
    if (level === 'splat') {
      if (!CFG.lumaKey) { alert('Configurează Luma AI API key mai întâi.'); return; }
      document.getElementById('tf-tour-overlay').remove();
      await _runGaussianSplatPipeline();
      return;
    }
    if (level === 'foto' && !CFG.replicateKey) { alert('Configurează Replicate API key mai întâi.'); return; }

    // Switch panorama URLs
    const config = STATE.pannellumConfig;
    if (!config) return;
    Object.entries(STATE.scenes).forEach(([key, sc]) => {
      const url = level === 'foto' && sc.fotoURL ? sc.fotoURL : sc.equirectURL;
      if (config.scenes[key]) config.scenes[key].panorama = url;
    });

    document.getElementById('tf-tour-overlay').remove();
    _launchPannellumTour(config, level);
    STATE.activeLevel = level;
  };

  // ═══════════════════════════════════════════════════════════════════════
  // L2 — REPLICATE API (Stable Diffusion XL interior design)
  // ═══════════════════════════════════════════════════════════════════════

  async function _uploadToReplicate(equirectBlobURL, roomType) {
    // Convert blob URL to base64
    const blob = await fetch(equirectBlobURL).then(r => r.blob());
    const base64 = await new Promise(res => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result); // data:image/jpeg;base64,...
      fr.readAsDataURL(blob);
    });

    const A = window.AEDIS || {};
    const stil = A.stil || 'modern';
    const prompt = (ROOM_PROMPTS[roomType] || ROOM_PROMPTS.default)(stil);

    // POST la Replicate
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + CFG.replicateKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Model: adirik/interior-design (ControlNet + SDXL)
        version: 'fa9a6a6373ea46ba8b8a19a995f27f30c5d57e1c80a4c7cef3c42e7a7d27ef4f',
        input: {
          image: base64,
          prompt: prompt,
          negative_prompt: 'blurry, bad quality, distorted, cartoon, illustration, 2D, flat',
          num_inference_steps: 30,
          guidance_scale: 7.5,
          strength: 0.45, // 0.4-0.5: păstrează structura, face fotorealistic
          scheduler: 'K_EULER_ANCESTRAL',
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error('Replicate API: ' + response.status + ' ' + err.slice(0, 100));
    }

    const prediction = await response.json();
    const predId = prediction.id;

    // Poll pentru rezultat
    for (let i = 0; i < 60; i++) { // max 60×2s = 2 minute
      await new Promise(r => setTimeout(r, 2000));
      const pollResp = await fetch('https://api.replicate.com/v1/predictions/' + predId, {
        headers: { 'Authorization': 'Token ' + CFG.replicateKey },
      });
      const poll = await pollResp.json();

      if (poll.status === 'succeeded' && poll.output) {
        const outputURL = Array.isArray(poll.output) ? poll.output[0] : poll.output;
        // Descărcăm și facem blob local (CORS)
        const imgResp = await fetch(outputURL);
        const imgBlob = await imgResp.blob();
        return URL.createObjectURL(imgBlob);
      }
      if (poll.status === 'failed') {
        throw new Error('Replicate prediction failed: ' + (poll.error || 'unknown'));
      }
    }
    throw new Error('Replicate timeout după 2 minute');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // L3 — LUMA AI GAUSSIAN SPLAT
  // ═══════════════════════════════════════════════════════════════════════

  async function _runGaussianSplatPipeline() {
    _tfProgress('Capturez video orbit 3D…', 5);

    // Capturăm video orbit din VTour scene
    const videoBlob = await _captureOrbitVideo();
    if (!videoBlob) throw new Error('Captura video eșuată');

    _tfProgress('Upload la Luma AI…', 25);
    const uploadURL = await _getLumaUploadURL(videoBlob);

    _tfProgress('Procesare Gaussian Splat (2-5 min)…', 35);
    const splatURL = await _pollLumaJob(uploadURL);

    STATE.splatURL = splatURL;
    _tfProgress('✅ Gaussian Splat gata!', 100, 'done');
    STATE.rendering = false;

    // Launch splat viewer
    _launchSplatViewer(splatURL);
  }

  async function _captureOrbitVideo() {
    const vState = window.VTour?._state;
    if (!vState?.canvas) return null;

    return new Promise((resolve) => {
      const canvas = vState.canvas;
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm',
        videoBitsPerSecond: 8_000_000,
      });
      const chunks = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));

      // Animăm camera în orbit complet
      const orbit = vState.orbit;
      const origTheta = orbit ? orbit._theta || 0 : 0;
      const frames = 120;
      let frame = 0;

      recorder.start();
      const animate = () => {
        if (frame >= frames) {
          recorder.stop();
          return;
        }
        // Rotație orbit completă
        if (orbit) {
          orbit.targetTheta = (frame / frames) * Math.PI * 2 + origTheta;
          orbit.targetPhi = Math.PI * (0.25 + 0.15 * Math.sin(frame / frames * Math.PI));
        }
        frame++;
        requestAnimationFrame(animate);
      };
      animate();
    });
  }

  async function _getLumaUploadURL(videoBlob) {
    // Luma AI API v1 — create generation
    const resp = await fetch('https://lumalabs.ai/luma-api/v1/generations', {
      method: 'POST',
      headers: {
        'Authorization': 'luma-api-key=' + CFG.lumaKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'video_to_3d',
        title: 'UrbanX_' + (window._RV?.parcelParams?.nrCad || 'x') + '_' + Date.now(),
      }),
    });

    if (!resp.ok) throw new Error('Luma API create: ' + resp.status);
    const data = await resp.json();
    const jobId = data.id;
    const uploadUrl = data.asset_url;

    STATE.lumaJobId = jobId;
    _tfDetail('Job ID: ' + jobId);

    // Upload video
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'video/webm' },
      body: videoBlob,
    });

    return jobId;
  }

  async function _pollLumaJob(jobId) {
    // Poll Luma job status
    for (let i = 0; i < 90; i++) { // max 90×3s = 4.5 minute
      await new Promise(r => setTimeout(r, 3000));
      const pct = Math.min(95, 35 + i * 0.7);
      _tfProgress('Procesare Gaussian Splat… ' + Math.round(pct) + '%', pct);
      _tfDetail('Job: ' + jobId + ' · Aștept…');

      const resp = await fetch('https://lumalabs.ai/luma-api/v1/generations/' + jobId, {
        headers: { 'Authorization': 'luma-api-key=' + CFG.lumaKey },
      });
      if (!resp.ok) continue;
      const data = await resp.json();

      if (data.status === 'completed') {
        const splatURL = data.splat_url || data.assets?.splat;
        if (splatURL) return splatURL;
        throw new Error('Luma: job completed dar fără splat URL');
      }
      if (data.status === 'failed') {
        throw new Error('Luma: job failed — ' + (data.failure_reason || 'unknown'));
      }
    }
    throw new Error('Luma timeout după 4.5 minute');
  }

  function _launchSplatViewer(splatURL) {
    if (document.getElementById('tf-tour-overlay')) document.getElementById('tf-tour-overlay').remove();
    if (document.getElementById('tf-launcher-overlay')) document.getElementById('tf-launcher-overlay').remove();

    const overlay = document.createElement('div');
    overlay.id = 'tf-tour-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99998;display:flex;flex-direction:column';

    overlay.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:10px 16px;background:rgba(8,14,30,.95);border-bottom:1px solid rgba(34,197,94,.2);flex-shrink:0">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="color:#4ADE80;font-size:14px;font-weight:700">🌟 Gaussian Splat — Fotorealism Maxim</span>
        </div>
        <div style="display:flex;gap:8px">
          <button onclick="window._tfSwitchToPreview()"
            style="padding:5px 12px;background:rgba(99,102,241,.2);border:1px solid rgba(99,102,241,.4);
                   border-radius:6px;color:#818CF8;font-size:10px;font-weight:700;cursor:pointer">
            ← Înapoi la Preview
          </button>
          <button onclick="document.getElementById('tf-tour-overlay').remove()"
            style="background:rgba(239,68,68,.15);color:#FCA5A5;border:1px solid rgba(239,68,68,.3);
                   border-radius:7px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer">✕</button>
        </div>
      </div>
      <div style="flex:1;position:relative">
        <luma-hero id="tf-luma-viewer"
          style="width:100%;height:100%;display:block"
          source="${splatURL}"
          loading="eager"
        ></luma-hero>
        <div style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);
          background:rgba(8,14,30,.85);border:1px solid rgba(34,197,94,.2);border-radius:8px;
          padding:8px 16px;color:#4ADE80;font-size:11px">
          drag = rotire · scroll = zoom · pinch = mobile
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Load Luma Web SDK
    if (!window.customElements?.get?.('luma-hero')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = CFG.lumaWebCDN;
      document.head.appendChild(script);
    }
  }

  window._tfSwitchToPreview = function () {
    document.getElementById('tf-tour-overlay')?.remove();
    if (STATE.pannellumConfig) {
      _launchPannellumTour(STATE.pannellumConfig, STATE.activeLevel === 'splat' ? 'preview' : STATE.activeLevel);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // PANNELLUM LOADER
  // ═══════════════════════════════════════════════════════════════════════


  // Mobile CSS for tour overlay
  function _injectMobileCSS() {
    if (document.getElementById('tf-mobile-css')) return;
    const s = document.createElement('style');
    s.id = 'tf-mobile-css';
    s.textContent = `
      @media (max-width: 768px) {
        #tf-launcher-overlay > div > div[style*="grid-template-columns:1fr 1fr 1fr"] {
          grid-template-columns: 1fr !important;
        }
        #tf-tour-overlay > div:first-child { flex-wrap: wrap; gap: 6px; padding: 8px 10px; }
        #tf-scene-bar button { padding: 5px 8px; font-size: 9px; }
        #tf-minimap { width: 90px; height: 72px; bottom: 54px; right: 8px; }
        #tf-room-title { font-size: 10px; max-width: 55%; }
        #ux-tour-bottombar { flex-wrap: wrap; gap: 5px; padding: 6px 8px; }
        .ux-tour-btn { padding: 5px 8px; font-size: 9.5px; }
      }
      @media (max-width: 480px) {
        #tf-launcher-overlay h2 { font-size: 17px !important; }
        #tf-ai-loading { font-size: 10px; padding: 6px 12px; }
      }
    `;
    document.head.appendChild(s);
  }

  function _loadPannellumCSS() {
    if (document.getElementById('pannellum-css')) return;
    const link = document.createElement('link');
    link.id = 'pannellum-css';
    link.rel = 'stylesheet';
    link.href = CFG.pannellumCDN + 'pannellum.min.css';
    document.head.appendChild(link);
  }

  function _loadPannellumJS(cb) {
    if (window.pannellum) { cb(); return; }
    if (document.getElementById('pannellum-js')) {
      const check = setInterval(() => { if (window.pannellum) { clearInterval(check); cb(); } }, 100);
      setTimeout(() => clearInterval(check), 10000);
      return;
    }
    const script = document.createElement('script');
    script.id = 'pannellum-js';
    script.src = CFG.pannellumCDN + 'pannellum.min.js';
    script.onload = cb;
    document.head.appendChild(script);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // UTILITIES
  // ═══════════════════════════════════════════════════════════════════════

  function _roomLabel(t) {
    const M = { living:'Camera de zi', bedroom:'Dormitor', bedroom2:'Dormitor 2', bedroom3:'Dormitor 3',
      kitchen:'Bucătărie', bath:'Baie', hall:'Hol', core:'Scări/Lift', balcon:'Balcon',
      commercial:'Spațiu comercial', office:'Birou' };
    return M[t] || t;
  }

  function _roomEmoji(t) {
    const M = { living:'🛋', bedroom:'🛏', bedroom2:'🛏', bedroom3:'🛏', kitchen:'🍳',
      bath:'🚿', hall:'🚪', core:'🪜', balcon:'🌅', commercial:'🏪', office:'💼' };
    return M[t] || '🏠';
  }


  // Expose global functions for external use
  window._showTurFotoLauncher = _showTurFotoLauncher;

})();
