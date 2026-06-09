// ═══════════════════════════════════════════════════════════════════════════
// 34-gaussian-splat-auto.js — Tur Gaussian Splat Automatizat Complet
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// PIPELINE COMPLET AUTOMATIZAT (utilizatorul apasă 1 buton):
//
//  1. Generează 50 frame-uri orbit din scena VTour (browser, instant)
//  2. Trimite la Polycam API sau Luma AI via proxy Cloudflare Worker
//  3. Polling status (~3-8 min procesare)
//  4. Primește .splat URL
//  5. Embed viewer Gaussian Splat direct în UrbanX
//     → utilizatorul navighează identic Matterport
//
// PROXY: Cloudflare Worker (gratuit, deploy 5 min)
//   URL: https://urbanx-splat-proxy.YOURNAME.workers.dev
//   Cod Worker: în această pagină la _getWorkerCode()
//
// COST: $0.20/tur (Polycam) sau $0.10/tur (Luma AI)
// TIMP: 3-8 minute procesare + instant embed
//
// FĂRĂ PROXY (demo): ghidăm utilizatorul să uploadeze manual pe polycam.com
// CU PROXY: complet automat, zero interacțiune utilizator
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Config ─────────────────────────────────────────────────────────────
  const CFG = {
    get proxyUrl()    { return localStorage.getItem('urbanx_splat_proxy')  || ''; },
    get polycamKey()  { return localStorage.getItem('urbanx_polycam_key')  || ''; },
    get lumaKey()     { return localStorage.getItem('urbanx_luma_key')     || ''; },
    FRAMES:       50,
    FRAME_W:      1280,
    FRAME_H:      960,
    FRAME_QUALITY:0.92,
    POLL_INTERVAL:5000,   // 5s
    MAX_POLLS:    120,    // 10 min max
  };

  // ── State ───────────────────────────────────────────────────────────────
  const STATE = {
    captureId:  null,
    splatUrl:   null,
    status:     'idle',  // idle | generating | uploading | processing | done | error
    provider:   null,    // 'polycam' | 'luma' | 'manual'
    frames:     [],
    viewer:     null,
  };

  // ═══════════════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════════════

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (typeof _RV !== 'undefined' && typeof window.VTour !== 'undefined') { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 200);
  }

  waitReady(() => {
    _injectButton();
    _injectSettingsUI();
    console.log('[GaussianSplat v1] ✅ loaded — Polycam + Luma AI auto pipeline');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // UI
  // ═══════════════════════════════════════════════════════════════════════

  function _injectButton() {
    // MutationObserver pentru v3d-topbar (creat dinamic)
    const obs = new MutationObserver(() => {
      if (_tryInjectBtn()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    _tryInjectBtn();

    // Și în dropdown export
    const _addToMenu = () => {
      const menu = document.getElementById('ux-export-menu');
      if (!menu || document.getElementById('gs-menu-item')) return false;
      const div = document.createElement('div'); div.className = 'ux-exp-divider';
      menu.appendChild(div);
      const btn = document.createElement('button');
      btn.id = 'gs-menu-item'; btn.className = 'ux-exp-item';
      btn.innerHTML = '<span style="font-size:16px">🌟</span>Tur Gaussian Splat (Matterport-quality)';
      btn.onclick = () => { menu.classList.remove('open'); window._gsLaunch(); };
      menu.appendChild(btn);
      return true;
    };
    if (!_addToMenu()) {
      const obs2 = setInterval(() => { if (_addToMenu()) clearInterval(obs2); }, 1000);
      setTimeout(() => clearInterval(obs2), 20000);
    }
  }

  function _tryInjectBtn() {
    const topbar = document.getElementById('v3d-topbar');
    if (!topbar || document.getElementById('gs-splat-btn')) return false;

    const btn = document.createElement('button');
    btn.id = 'gs-splat-btn';
    btn.innerHTML = '🌟 Gaussian Splat';
    btn.title = 'Generează tur virtual 3D navigabil — calitate Matterport ($0.10-0.20)';
    btn.style.cssText = `
      background:linear-gradient(135deg,rgba(34,197,94,.18),rgba(16,185,129,.12));
      color:#4ADE80; border:1.5px solid rgba(34,197,94,.45);
      border-radius:8px; padding:5px 13px; font-size:11px; font-weight:800;
      cursor:pointer; flex-shrink:0; white-space:nowrap; font-family:inherit;
      margin-left:4px; min-height:30px; transition:all .2s;
    `;
    btn.onmouseover = () => btn.style.background = 'linear-gradient(135deg,rgba(34,197,94,.3),rgba(16,185,129,.22))';
    btn.onmouseout  = () => btn.style.background = 'linear-gradient(135deg,rgba(34,197,94,.18),rgba(16,185,129,.12))';
    btn.onclick = () => window._gsLaunch();
    topbar.appendChild(btn);
    return true;
  }

  function _injectSettingsUI() {
    const _try = () => {
      const rpanel = document.querySelector('.rv-rpanel');
      if (!rpanel || document.getElementById('gs-settings')) return false;
      const sec = document.createElement('div');
      sec.id = 'gs-settings';
      sec.style.cssText = 'border-top:1px solid rgba(34,197,94,.15);padding-top:10px;margin-top:8px';
      sec.innerHTML = `
        <div style="font-size:8px;color:rgba(74,222,128,.7);font-weight:700;letter-spacing:.4px;text-transform:uppercase;margin-bottom:6px">
          🌟 Gaussian Splat — API Keys
        </div>
        <div style="margin-bottom:6px">
          <div style="font-size:7px;color:#94A3B8;margin-bottom:2px">Cloudflare Proxy URL</div>
          <input type="text" id="gs-proxy-inp" placeholder="https://urbanx-splat.YOURNAME.workers.dev"
            value="${CFG.proxyUrl}"
            style="width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
                   border-radius:4px;color:#DDE6F5;font-size:8px;padding:4px 6px;font-family:IBM Plex Mono,monospace">
          <div style="font-size:6.5px;color:#475569;margin-top:2px">
            Fără proxy → mod manual (tu uploadezi pe polycam.com)
          </div>
        </div>
        <div style="margin-bottom:6px">
          <div style="font-size:7px;color:#94A3B8;margin-bottom:2px">Polycam API Key</div>
          <div style="display:flex;gap:4px">
            <input type="password" id="gs-polycam-inp" placeholder="polycam_..."
              value="${CFG.polycamKey}"
              style="flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
                     border-radius:4px;color:#DDE6F5;font-size:8px;padding:4px 6px;font-family:IBM Plex Mono,monospace">
            <button onclick="window._gsSaveKeys()"
              style="padding:3px 7px;background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.35);
                     border-radius:4px;color:#4ADE80;font-size:8px;font-weight:700;cursor:pointer">Save</button>
          </div>
          <div style="font-size:6.5px;color:#475569;margin-top:2px">
            <a href="https://polycam.io/settings/api" target="_blank" style="color:#22C55E">polycam.io/settings/api</a>
            · $0.20/tur · 3 free/lună
          </div>
        </div>
        <div>
          <div style="font-size:7px;color:#94A3B8;margin-bottom:2px">Luma AI Key (calitate superioară)</div>
          <input type="password" id="gs-luma-inp" placeholder="luma_..."
            value="${CFG.lumaKey}"
            style="width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
                   border-radius:4px;color:#DDE6F5;font-size:8px;padding:4px 6px;font-family:IBM Plex Mono,monospace">
          <div style="font-size:6.5px;color:#475569;margin-top:2px">
            <a href="https://lumalabs.ai/luma-api" target="_blank" style="color:#22C55E">lumalabs.ai/luma-api</a>
            · $0.10/tur · necesită aprobare
          </div>
        </div>
      `;
      rpanel.appendChild(sec);

      // Salveaza la input
      ['gs-proxy-inp','gs-polycam-inp','gs-luma-inp'].forEach(id => {
        document.getElementById(id)?.addEventListener('blur', () => window._gsSaveKeys());
      });
      return true;
    };
    if (_try()) return;
    const obs = setInterval(() => { if (_try()) clearInterval(obs); }, 1000);
    setTimeout(() => clearInterval(obs), 20000);
  }

  window._gsSaveKeys = () => {
    const proxy   = document.getElementById('gs-proxy-inp')?.value?.trim();
    const polycam = document.getElementById('gs-polycam-inp')?.value?.trim();
    const luma    = document.getElementById('gs-luma-inp')?.value?.trim();
    if (proxy)   localStorage.setItem('urbanx_splat_proxy',  proxy);
    if (polycam) localStorage.setItem('urbanx_polycam_key',  polycam);
    if (luma)    localStorage.setItem('urbanx_luma_key',     luma);
    if (typeof ss === 'function') ss('✅ API keys salvate');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // LAUNCHER
  // ═══════════════════════════════════════════════════════════════════════

  window._gsLaunch = function () {
    const vtourState = window.VTour?._state;
    if (!vtourState?.scene) {
      if (typeof ss === 'function') ss('⚠ Deschideți Viewer 3D → Dollhouse înainte');
      return;
    }

    // Determină provider
    const hasProxy   = !!CFG.proxyUrl;
    const hasLuma    = !!CFG.lumaKey;
    const hasPolycam = !!CFG.polycamKey;
    const canAuto    = hasProxy && (hasPolycam || hasLuma);

    _showLauncher(canAuto, hasLuma, hasPolycam);
  };

  function _showLauncher(canAuto, hasLuma, hasPolycam) {
    if (document.getElementById('gs-launcher')) document.getElementById('gs-launcher').remove();

    const ov = document.createElement('div');
    ov.id = 'gs-launcher';
    ov.style.cssText = `
      position:fixed;inset:0;background:rgba(6,8,14,.97);z-index:99999;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    `;

    ov.innerHTML = `
      <div style="max-width:600px;width:90%;padding:0 16px">
        <div style="text-align:center;margin-bottom:28px">
          <div style="font-size:36px;margin-bottom:10px">🌟</div>
          <h2 style="color:#fff;font-size:20px;margin:0 0 8px">Tur Virtual Gaussian Splat</h2>
          <p style="color:#64748B;font-size:12px;margin:0">
            Calitate Matterport · navigare 3D completă · dollhouse + walk-through
          </p>
        </div>

        <!-- Options -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px">

          ${canAuto ? `
          <div onclick="_gsStartAuto('${hasLuma ? 'luma' : 'polycam'}')"
            style="background:rgba(34,197,94,.08);border:2px solid rgba(34,197,94,.5);
                   border-radius:12px;padding:18px;cursor:pointer;transition:all .2s"
            onmouseover="this.style.borderColor='rgba(34,197,94,.9)'"
            onmouseout="this.style.borderColor='rgba(34,197,94,.5)'">
            <div style="font-size:22px;margin-bottom:8px">🤖</div>
            <div style="color:#4ADE80;font-size:13px;font-weight:700;margin-bottom:6px">Automatizat</div>
            <div style="color:#64748B;font-size:11px;line-height:1.5">
              Tot procesul automat<br>
              Tu primești direct turul<br>
              <span style="color:#4ADE80">${hasLuma ? 'Luma AI · $0.10' : 'Polycam · $0.20'}</span>
            </div>
          </div>` : `
          <div style="background:rgba(255,255,255,.03);border:2px solid rgba(255,255,255,.1);
                   border-radius:12px;padding:18px;opacity:.4">
            <div style="font-size:22px;margin-bottom:8px">🤖</div>
            <div style="color:#64748B;font-size:13px;font-weight:700;margin-bottom:6px">Automatizat</div>
            <div style="color:#475569;font-size:11px;line-height:1.5">
              Necesită:<br>
              ${!CFG.proxyUrl ? '• Cloudflare Proxy URL<br>' : ''}
              ${!hasPolycam && !hasLuma ? '• Polycam sau Luma API key' : ''}
            </div>
          </div>`}

          <div onclick="_gsStartManual()"
            style="background:rgba(99,102,241,.08);border:2px solid rgba(99,102,241,.4);
                   border-radius:12px;padding:18px;cursor:pointer;transition:all .2s"
            onmouseover="this.style.borderColor='rgba(99,102,241,.85)'"
            onmouseout="this.style.borderColor='rgba(99,102,241,.4)'">
            <div style="font-size:22px;margin-bottom:8px">📤</div>
            <div style="color:#818CF8;font-size:13px;font-weight:700;margin-bottom:6px">Semi-manual</div>
            <div style="color:#64748B;font-size:11px;line-height:1.5">
              Generăm frames automat<br>
              Tu incarci pe polycam.com<br>
              <span style="color:#818CF8">Gratuit (3/lună) sau $20/lună</span>
            </div>
          </div>
        </div>

        <!-- Progress (hidden) -->
        <div id="gs-progress" style="display:none;margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <span id="gs-prog-lbl" style="font-size:12px;color:#DDE6F5"></span>
            <span id="gs-prog-pct" style="font-size:12px;font-weight:700;color:#4ADE80"></span>
          </div>
          <div style="background:rgba(255,255,255,.06);border-radius:3px;height:6px">
            <div id="gs-prog-bar" style="height:6px;border-radius:3px;background:linear-gradient(90deg,#22C55E,#4ADE80);width:0%;transition:width .4s"></div>
          </div>
          <div id="gs-prog-detail" style="font-size:10px;color:#334155;margin-top:4px;text-align:center;font-family:IBM Plex Mono,monospace"></div>
        </div>

        <!-- Close -->
        <div style="text-align:center">
          <button onclick="document.getElementById('gs-launcher').remove()"
            style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
                   border-radius:8px;color:#94A3B8;padding:8px 20px;font-size:11px;cursor:pointer;font-family:inherit">
            Închide
          </button>
        </div>

        <!-- Setup guide (if no proxy) -->
        ${!canAuto ? `
        <div style="margin-top:20px;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.2);
             border-radius:10px;padding:14px 16px">
          <div style="color:#FCD34D;font-size:11px;font-weight:700;margin-bottom:8px">
            ⚡ Activează modul automatizat în 10 minute
          </div>
          <div style="color:#64748B;font-size:10px;line-height:1.8">
            1. Deploy Cloudflare Worker (cod jos) → copiază URL-ul<br>
            2. Creează cont <a href="https://polycam.io" target="_blank" style="color:#F59E0B">polycam.io</a> → API key din Settings<br>
            3. Setează URL + key în panoul din dreapta<br>
            4. Gata — complet automatizat pentru toți utilizatorii
          </div>
          <button onclick="_gsShowWorkerCode()"
            style="margin-top:8px;padding:5px 14px;background:rgba(245,158,11,.15);
                   border:1px solid rgba(245,158,11,.35);border-radius:6px;color:#FCD34D;
                   font-size:10px;font-weight:700;cursor:pointer;font-family:inherit">
            📋 Codul Cloudflare Worker
          </button>
        </div>` : ''}
      </div>
    `;

    document.body.appendChild(ov);
  }

  function _gsProgress(msg, pct, detail) {
    const prog = document.getElementById('gs-progress');
    if (prog) prog.style.display = 'block';
    const lbl = document.getElementById('gs-prog-lbl');
    const bar = document.getElementById('gs-prog-bar');
    const pctEl = document.getElementById('gs-prog-pct');
    const det = document.getElementById('gs-prog-detail');
    if (lbl) lbl.textContent = msg;
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    if (det && detail) det.textContent = detail;
    if (typeof ss === 'function') ss(msg + ' ' + pct + '%');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FLOW AUTOMAT
  // ═══════════════════════════════════════════════════════════════════════

  window._gsStartAuto = async function (provider) {
    STATE.provider = provider;
    STATE.status = 'generating';

    // Ascundem opțiunile, arătăm progress
    document.querySelector('#gs-launcher > div > div:nth-child(2)')?.remove();

    try {
      // Step 1: Generează frames
      _gsProgress('Generez 50 frame-uri...', 5);
      STATE.frames = await _generateFrames();

      // Step 2: Upload la API
      _gsProgress('Upload la ' + (provider === 'luma' ? 'Luma AI' : 'Polycam') + '...', 35);
      const captureId = provider === 'luma'
        ? await _uploadToLuma(STATE.frames)
        : await _uploadToPolycam(STATE.frames);
      STATE.captureId = captureId;

      // Step 3: Poll
      STATE.status = 'processing';
      _gsProgress('Procesare Gaussian Splat...', 40, 'Acest proces durează 3-8 minute');
      const splatUrl = await _pollUntilDone(provider, captureId);
      STATE.splatUrl = splatUrl;
      STATE.status = 'done';

      // Step 4: Embed viewer
      _gsProgress('✅ Tur gata!', 100);
      document.getElementById('gs-launcher')?.remove();
      _launchSplatViewer(splatUrl, provider);

    } catch (e) {
      STATE.status = 'error';
      console.error('[GaussianSplat]', e);
      _gsProgress('⚠ Eroare: ' + e.message, 100);
    }
  };

  // ── Generare 50 frame-uri orbit ────────────────────────────────────────
  async function _generateFrames() {
    const vtState = window.VTour?._state;
    if (!vtState?.scene) throw new Error('Scena VTour nu este disponibilă');
    const THREE = window.THREE;
    const anchor = vtState._anchor;
    const b = window._RV?.building;

    const W = CFG.FRAME_W, H = CFG.FRAME_H;
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 1000);
    const cx = anchor?.cx || 0;
    const cy = anchor?.baseY + ((b?.niv || 4) * (window._RV?.parcelParams?.hn || 3)) * 0.5 || 8;
    const cz = anchor?.cz || 0;
    const R = Math.max(b?.bW || 20, b?.bD || 20) * 0.85;
    const FRAMES = CFG.FRAMES;
    const blobs = [];

    for (let i = 0; i < FRAMES; i++) {
      const pct = Math.round(5 + (i / FRAMES) * 28);
      _gsProgress(`Generez frame ${i + 1}/${FRAMES}...`, pct);

      // Orbită completă cu variații verticale
      const theta = (i / FRAMES) * Math.PI * 2;
      const phiBase = 0.3;
      const phi = phiBase + 0.25 * Math.sin((i / FRAMES) * Math.PI * 4);
      const r = R * (0.65 + 0.35 * Math.cos((i / FRAMES) * Math.PI * 2));
      const eyeH = cy + r * Math.sin(phi);

      camera.position.set(
        cx + r * Math.cos(phi) * Math.sin(theta),
        eyeH,
        cz + r * Math.cos(phi) * Math.cos(theta)
      );

      // Punctul de privire variază ușor (sus/jos pentru mai mult parallax)
      const lookY = cy * (0.3 + 0.4 * (i / FRAMES));
      camera.lookAt(cx, lookY, cz);
      camera.updateProjectionMatrix();

      renderer.render(vtState.scene, camera);

      const blob = await new Promise(res =>
        renderer.domElement.toBlob(res, 'image/jpeg', CFG.FRAME_QUALITY)
      );
      blobs.push(blob);

      await new Promise(r => setTimeout(r, 20));
    }

    renderer.dispose();
    return blobs;
  }

  // ── Upload la Polycam (via proxy) ─────────────────────────────────────
  async function _uploadToPolycam(frames) {
    const proxy = CFG.proxyUrl;
    const key   = CFG.polycamKey;
    if (!proxy || !key) throw new Error('Proxy URL și Polycam API key necesare');

    // 1. Creează captură
    const createResp = await fetch(proxy + '/polycam/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: key,
        name: 'UrbanX_' + (window._RV?.parcelParams?.nrCad || 'x') + '_' + Date.now(),
        type: 'gaussian_splat',
      }),
    });
    if (!createResp.ok) throw new Error('Polycam create failed: ' + createResp.status);
    const { id, uploadUrl } = await createResp.json();
    _gsProgress('Captura creată, upload imagini...', 40, `ID: ${id}`);

    // 2. Upload frames
    const formData = new FormData();
    frames.forEach((blob, i) => {
      formData.append('images', blob, `frame_${String(i).padStart(3, '0')}.jpg`);
    });

    const uploadResp = await fetch(proxy + '/polycam/upload/' + id, {
      method: 'POST',
      body: formData,
    });
    if (!uploadResp.ok) throw new Error('Upload failed: ' + uploadResp.status);

    // 3. Start processing
    await fetch(proxy + '/polycam/process/' + id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key }),
    });

    return id;
  }

  // ── Upload la Luma AI (via proxy) ─────────────────────────────────────
  async function _uploadToLuma(frames) {
    const proxy = CFG.proxyUrl;
    const key   = CFG.lumaKey;
    if (!proxy || !key) throw new Error('Proxy URL și Luma API key necesare');

    // 1. Creează job
    const createResp = await fetch(proxy + '/luma/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: key,
        title: 'UrbanX_' + (window._RV?.parcelParams?.nrCad || 'x'),
        type: 'image_to_3d',
      }),
    });
    if (!createResp.ok) throw new Error('Luma create failed: ' + createResp.status);
    const { id, uploadUrl } = await createResp.json();

    // 2. Upload frames ca ZIP
    const JSZip = window.JSZip;
    if (!JSZip) throw new Error('JSZip nu este încărcat');
    const zip = new JSZip();
    frames.forEach((blob, i) => zip.file(`frame_${String(i).padStart(3, '0')}.jpg`, blob));
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    await fetch(proxy + '/luma/upload/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/zip' },
      body: zipBlob,
    });

    return id;
  }

  // ── Polling până e gata ──────────────────────────────────────────────
  async function _pollUntilDone(provider, id) {
    const proxy = CFG.proxyUrl;
    const key   = provider === 'luma' ? CFG.lumaKey : CFG.polycamKey;

    for (let i = 0; i < CFG.MAX_POLLS; i++) {
      await new Promise(r => setTimeout(r, CFG.POLL_INTERVAL));

      const pct = Math.round(40 + Math.min(55, i * 0.5));
      const elapsed = Math.round(i * CFG.POLL_INTERVAL / 60000);
      _gsProgress(
        `Procesare Gaussian Splat... ${i * 5}s`,
        pct,
        `~${3 + elapsed} min · ${provider === 'luma' ? 'Luma AI' : 'Polycam'} · job ${id.slice(0, 8)}...`
      );

      try {
        const resp = await fetch(`${proxy}/${provider}/status/${id}?key=${encodeURIComponent(key)}`);
        if (!resp.ok) continue;
        const data = await resp.json();

        if (data.status === 'complete' || data.status === 'completed' || data.status === 'success') {
          const splatUrl = data.splat_url || data.assets?.splat || data.result?.splat_url;
          if (splatUrl) return splatUrl;
          throw new Error('Job complet dar fără splat URL');
        }

        if (data.status === 'failed' || data.status === 'error') {
          throw new Error('Procesare eșuată: ' + (data.error || data.failure_reason || 'unknown'));
        }
      } catch (e) {
        if (e.message.includes('Procesare eșuată')) throw e;
        // Erori de rețea → continuăm polling
      }
    }
    throw new Error('Timeout după ' + (CFG.MAX_POLLS * CFG.POLL_INTERVAL / 60000) + ' minute');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // FLOW SEMI-MANUAL (fără proxy)
  // ═══════════════════════════════════════════════════════════════════════

  window._gsStartManual = async function () {
    document.querySelector('#gs-launcher > div > div:nth-child(2)')?.remove();

    try {
      _gsProgress('Generez 50 frame-uri...', 5);
      const frames = await _generateFrames();
      _gsProgress('Creare ZIP...', 85);

      // Creează ZIP
      const hasJSZip = !!window.JSZip;
      if (!hasJSZip) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }

      const zip = new window.JSZip();
      frames.forEach((blob, i) => zip.file(`frame_${String(i).padStart(3, '0')}.jpg`, blob));
      zip.file('INSTRUCTIUNI.txt', [
        'UrbanX — Gaussian Splat Frames',
        '',
        'Pași pentru a obține turul 3D:',
        '1. Mergi pe https://poly.cam (sau polycam.com)',
        '2. Creează cont gratuit (3 capturi/lună gratis)',
        '3. Click "New Capture" → "Upload Images"',
        '4. Selectează TOATE imaginile din acest ZIP',
        '5. Click "Process" → așteptați 3-5 minute',
        '6. Copiați link-ul turului și inserați-l în UrbanX',
        '',
        'Sau: Încărcați pe https://lumalabs.ai/capture',
        '',
        'UrbanX TSS·FG · ' + new Date().toLocaleDateString('ro-RO'),
      ].join('\n'));

      const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      _gsProgress('✅ ZIP gata — se descarcă...', 95);

      // Download
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `urbanx_splat_${window._RV?.parcelParams?.nrCad || 'x'}_${Date.now()}.zip`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      _gsProgress('✅ ZIP descărcat!', 100);

      // Show next step instructions
      _showManualInstructions();

    } catch (e) {
      _gsProgress('⚠ Eroare: ' + e.message, 100);
    }
  };

  function _showManualInstructions() {
    const prog = document.getElementById('gs-progress');
    if (prog) prog.insertAdjacentHTML('afterend', `
      <div style="background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.25);
           border-radius:10px;padding:14px 16px;margin-top:16px">
        <div style="color:#818CF8;font-size:12px;font-weight:700;margin-bottom:10px">
          📤 Pași următori
        </div>
        <div style="color:#94A3B8;font-size:11px;line-height:2">
          1. <a href="https://poly.cam" target="_blank" style="color:#818CF8">Deschide poly.cam</a>
             → New Capture → Upload Images<br>
          2. Selectează toate imaginile din ZIP<br>
          3. Procesare 3-5 minute → primești link<br>
          4. <button onclick="_gsEmbedUrl()" style="background:rgba(99,102,241,.2);
             border:1px solid rgba(99,102,241,.4);border-radius:5px;color:#818CF8;
             padding:3px 10px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit">
             Inserează link tur în UrbanX
          </button>
        </div>
      </div>
    `);
  }

  window._gsEmbedUrl = function () {
    const url = prompt('Inserează URL-ul turului Polycam/Luma (ex: https://poly.cam/view/XXXXX):');
    if (!url) return;
    document.getElementById('gs-launcher')?.remove();
    _launchSplatViewer(url, 'polycam-manual');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // VIEWER GAUSSIAN SPLAT
  // ═══════════════════════════════════════════════════════════════════════

  function _launchSplatViewer(splatUrl, provider) {
    if (document.getElementById('gs-viewer-overlay')) {
      document.getElementById('gs-viewer-overlay').remove();
    }

    const P = window._RV?.parcelParams;
    const A = window.AEDIS || {};

    const ov = document.createElement('div');
    ov.id = 'gs-viewer-overlay';
    ov.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99998;display:flex;flex-direction:column';

    // Detectăm tipul URL
    const isPolycam = splatUrl.includes('poly.cam') || splatUrl.includes('polycam');
    const isLuma    = splatUrl.includes('lumalabs') || splatUrl.includes('luma');
    const isSplatFile = splatUrl.endsWith('.splat') || splatUrl.includes('.splat?');

    ov.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:10px 16px;background:rgba(6,8,14,.95);border-bottom:1px solid rgba(34,197,94,.2);flex-shrink:0">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="color:#4ADE80;font-size:14px;font-weight:700">🌟 Tur Virtual Gaussian Splat</span>
          <span style="color:#334155;font-size:10px">${A.fn || ''} · ${P?.nrCad || ''}</span>
          <span style="background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);
            color:#4ADE80;font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px">
            ${provider === 'luma' ? 'Luma AI' : isPolycam ? 'Polycam' : 'Gaussian Splat'}
          </span>
        </div>
        <div style="display:flex;gap:8px">
          <button onclick="_gsShare('${splatUrl}')"
            style="padding:5px 12px;background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.35);
                   border-radius:6px;color:#4ADE80;font-size:10px;font-weight:700;cursor:pointer">
            ↗ Share
          </button>
          <button onclick="document.getElementById('gs-viewer-overlay').remove()"
            style="background:rgba(239,68,68,.15);color:#FCA5A5;border:1px solid rgba(239,68,68,.3);
                   border-radius:7px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer">✕</button>
        </div>
      </div>
      <div style="flex:1;position:relative;overflow:hidden" id="gs-viewer-container">
        ${_buildViewerEmbed(splatUrl, isPolycam, isLuma, isSplatFile)}
      </div>
      <div style="padding:8px 16px;background:rgba(6,8,14,.92);border-top:1px solid rgba(34,197,94,.1);
        font-size:10px;color:#334155;flex-shrink:0;text-align:center">
        drag = rotire · scroll = zoom · pinch = mobile · click = teleportare
      </div>
    `;

    document.body.appendChild(ov);

    // Dacă e .splat file nativ, folosim @pmndrs/drei sau SuperSplat
    if (isSplatFile) _loadSplatViewer(splatUrl);
  }

  function _buildViewerEmbed(url, isPolycam, isLuma, isSplatFile) {
    if (isPolycam) {
      // Polycam iframe embed
      const embedUrl = url.replace('poly.cam/view/', 'poly.cam/view/').replace('/view/', '/embed/');
      return `<iframe src="${embedUrl}" style="width:100%;height:100%;border:none" allow="xr-spatial-tracking" allowfullscreen></iframe>`;
    }
    if (isLuma) {
      // Luma embed
      return `
        <script src="https://cdn.jsdelivr.net/npm/@lumaai/luma-web/dist/library/luma-web.js" type="module"></sc` + `ript>
        <luma-hero source="${url}" style="width:100%;height:100%;display:block" loading="eager"></luma-hero>
      `;
    }
    if (isSplatFile) {
      return `<canvas id="gs-splat-canvas" style="width:100%;height:100%;display:block"></canvas>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">
          <div style="color:#4ADE80;font-size:12px">Se încarcă Gaussian Splat...</div>
        </div>`;
    }
    // Generic iframe
    return `<iframe src="${url}" style="width:100%;height:100%;border:none" allowfullscreen></iframe>`;
  }

  function _loadSplatViewer(splatUrl) {
    // Lazy load @pmndrs/gaussian-splatting sau SuperSplat
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@playcanvas/supersplat@1.0.0/dist/supersplat.js';
    script.onload = () => {
      if (window.SuperSplat) {
        new window.SuperSplat.Viewer(
          document.getElementById('gs-splat-canvas'),
          { src: splatUrl }
        );
      }
    };
    document.head.appendChild(script);
  }

  window._gsShare = function (url) {
    if (navigator.share) {
      navigator.share({ title: 'Tur Virtual UrbanX', url })
        .catch(() => _gsCopyLink(url));
    } else {
      _gsCopyLink(url);
    }
  };

  function _gsCopyLink(url) {
    navigator.clipboard?.writeText(url).then(() => {
      if (typeof ss === 'function') ss('✅ Link copiat în clipboard');
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CLOUDFLARE WORKER — cod pentru proxy
  // ═══════════════════════════════════════════════════════════════════════

  window._gsShowWorkerCode = function () {
    const code = _getWorkerCode();
    const ov = document.createElement('div');
    ov.style.cssText = `
      position:fixed;inset:0;background:rgba(6,8,14,.98);z-index:999999;
      display:flex;flex-direction:column;font-family:IBM Plex Mono,monospace;
    `;
    ov.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:12px 18px;background:rgba(245,158,11,.08);border-bottom:1px solid rgba(245,158,11,.2)">
        <span style="color:#FCD34D;font-size:13px;font-weight:700">☁ Cloudflare Worker — Proxy CORS</span>
        <div style="display:flex;gap:8px">
          <button onclick="navigator.clipboard.writeText(document.getElementById('worker-code').textContent);this.textContent='✅ Copiat!'"
            style="padding:5px 14px;background:rgba(245,158,11,.2);border:1px solid rgba(245,158,11,.4);
                   border-radius:6px;color:#FCD34D;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit">
            📋 Copiază
          </button>
          <button onclick="this.closest('div[style*=fixed]').remove()"
            style="background:rgba(239,68,68,.15);color:#FCA5A5;border:1px solid rgba(239,68,68,.3);
                   border-radius:6px;padding:5px 12px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit">✕</button>
        </div>
      </div>
      <div style="padding:12px 18px;background:rgba(245,158,11,.04);border-bottom:1px solid rgba(255,255,255,.06);
        font-size:10px;color:#94A3B8;line-height:1.8">
        Deploy în 5 min:
        1. Mergi pe <a href="https://dash.cloudflare.com" target="_blank" style="color:#FCD34D">dash.cloudflare.com</a> →
           Workers & Pages → Create<br>
        2. Copiază codul de jos → Deploy<br>
        3. Copiază URL-ul worker-ului → setează în UrbanX (panoul dreapta)
      </div>
      <pre id="worker-code" style="flex:1;overflow:auto;padding:16px 18px;margin:0;
        font-size:11px;color:#4ADE80;line-height:1.6;white-space:pre-wrap">${_escHtml(code)}</pre>
    `;
    document.body.appendChild(ov);
  };

  function _escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function _getWorkerCode() {
    return `// UrbanX Gaussian Splat Proxy — Cloudflare Worker
// Deploy pe dash.cloudflare.com → Workers & Pages → Create

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // ── POLYCAM ENDPOINTS ─────────────────────────────────────────────
    if (path.startsWith('/polycam/create')) {
      const body = await request.json();
      const resp = await fetch('https://api.polycam.io/v1/captures', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + body.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: body.name, type: 'gaussian_splat' }),
      });
      const data = await resp.json();
      return new Response(JSON.stringify(data), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    if (path.startsWith('/polycam/upload/')) {
      const id = path.split('/').pop();
      const formData = await request.formData();
      const resp = await fetch(\`https://api.polycam.io/v1/captures/\${id}/images\`, {
        method: 'POST',
        body: formData,
      });
      const data = await resp.json();
      return new Response(JSON.stringify(data), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    if (path.startsWith('/polycam/process/')) {
      const id = path.split('/').pop();
      const body = await request.json();
      const resp = await fetch(\`https://api.polycam.io/v1/captures/\${id}/process\`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + body.apiKey },
      });
      const data = await resp.json();
      return new Response(JSON.stringify(data), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    if (path.startsWith('/polycam/status/')) {
      const id = path.split('/').pop();
      const key = url.searchParams.get('key');
      const resp = await fetch(\`https://api.polycam.io/v1/captures/\${id}\`, {
        headers: { 'Authorization': 'Bearer ' + key },
      });
      const data = await resp.json();
      // Normalize response
      return new Response(JSON.stringify({
        status: data.state || data.status,
        splat_url: data.result?.splat_url || data.download?.splat,
        ...data,
      }), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    // ── LUMA AI ENDPOINTS ─────────────────────────────────────────────
    if (path.startsWith('/luma/create')) {
      const body = await request.json();
      const resp = await fetch('https://lumalabs.ai/luma-api/v1/generations', {
        method: 'POST',
        headers: {
          'Authorization': 'luma-api-key=' + body.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'image_to_3d', title: body.title }),
      });
      const data = await resp.json();
      return new Response(JSON.stringify(data), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    if (path.startsWith('/luma/upload/')) {
      const id = path.split('/').pop();
      const zipData = await request.arrayBuffer();
      // Get upload URL first
      const uploadResp = await fetch(\`https://lumalabs.ai/luma-api/v1/generations/\${id}/upload\`, {
        method: 'GET',
      });
      const { upload_url } = await uploadResp.json();
      await fetch(upload_url, { method: 'PUT', body: zipData, headers: { 'Content-Type': 'application/zip' } });
      return new Response(JSON.stringify({ ok: true }), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    if (path.startsWith('/luma/status/')) {
      const id = path.split('/').pop();
      const key = url.searchParams.get('key');
      const resp = await fetch(\`https://lumalabs.ai/luma-api/v1/generations/\${id}\`, {
        headers: { 'Authorization': 'luma-api-key=' + key },
      });
      const data = await resp.json();
      return new Response(JSON.stringify({
        status: data.status,
        splat_url: data.splat_url || data.assets?.splat,
        ...data,
      }), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};`;
  }

})();
