// ═══════════════════════════════════════════════════════════════════════════
// URBANX — UX POLISH ENGINE v1.0
// Etapa 4: Onboarding + Mobile + Loading + Performance + Micro-animatii
// ═══════════════════════════════════════════════════════════════════════════

// ── TOAST NOTIFICATION SYSTEM ─────────────────────────────────────────────
const _Toast = {
  queue: [],
  active: 0,

  show(message, type = 'info', duration = 3500) {
    const types = {
      success: { bg: '#16a34a', icon: '✅', border: '#22c55e' },
      error:   { bg: '#dc2626', icon: '❌', border: '#ef4444' },
      warn:    { bg: '#d97706', icon: '⚠️', border: '#f59e0b' },
      info:    { bg: '#2563eb', icon: 'ℹ️',  border: '#3b82f6' },
    };
    const t = types[type] || types.info;

    const toast = document.createElement('div');
    toast.className = 'wx-toast';
    toast.innerHTML = `<span class="wx-toast-icon">${t.icon}</span><span class="wx-toast-msg">${message}</span>`;
    toast.style.cssText = `
      position:fixed; right:16px; bottom:${76 + this.active * 62}px;
      background:${t.bg}; border-left:3px solid ${t.border};
      color:#fff; padding:10px 14px; border-radius:8px;
      font-family:'Space Grotesk',sans-serif; font-size:12px;
      display:flex; align-items:center; gap:8px;
      box-shadow:0 4px 20px rgba(0,0,0,0.4);
      z-index:9999; max-width:320px; word-break:break-word;
      animation:wxToastIn .25s cubic-bezier(.34,1.56,.64,1) forwards;
      transition:transform .2s, opacity .2s;
    `;

    document.body.appendChild(toast);
    this.active++;

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => { toast.remove(); this.active = Math.max(0, this.active - 1); }, 250);
    }, duration);

    return toast;
  },

  success: (msg, d) => _Toast.show(msg, 'success', d),
  error:   (msg, d) => _Toast.show(msg, 'error',   d),
  warn:    (msg, d) => _Toast.show(msg, 'warn',     d),
  info:    (msg, d) => _Toast.show(msg, 'info',     d),
};

// Override ss() global ca sa foloseasca Toast
const _ssSaved = window.ss;
window.ss = function(msg) {
  if(!msg) return;
  const type = msg.startsWith('✅') ? 'success'
             : msg.startsWith('❌') || msg.startsWith('Eroare') ? 'error'
             : msg.startsWith('⚠') ? 'warn' : 'info';
  _Toast.show(msg.replace(/^[✅❌⚠️ℹ️]\s*/,''), type);
  if(_ssSaved) _ssSaved(msg);
};

// ── SKELETON LOADER ───────────────────────────────────────────────────────
const _Skeleton = {
  show(containerId, rows = 5) {
    const el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = Array.from({length: rows}, () => `
      <div class="wx-skeleton-row">
        <div class="wx-skeleton-block" style="width:${40+Math.random()*40}%;height:10px"></div>
        <div class="wx-skeleton-block" style="width:${20+Math.random()*20}%;height:10px"></div>
      </div>
    `).join('');
  },

  hide(containerId) {
    const el = document.getElementById(containerId);
    if(el) el.querySelectorAll('.wx-skeleton-row').forEach(r => r.remove());
  },
};

// ── PROGRESS ENGINE ───────────────────────────────────────────────────────
const _Progress = {
  current: 0,
  bar: null,

  init() {
    if(document.getElementById('wx-progress-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'wx-progress-bar';
    bar.innerHTML = '<div id="wx-progress-fill"></div>';
    bar.style.cssText = `
      position:fixed; top:0; left:0; right:0; height:2px;
      background:rgba(255,255,255,0.05); z-index:10000;
      display:none;
    `;
    bar.children[0].style.cssText = `
      height:100%; width:0%;
      background:linear-gradient(90deg, #8b5cf6, #D4AF37, #22c55e);
      transition:width .3s ease;
      box-shadow:0 0 8px rgba(212,175,55,0.6);
    `;
    document.body.prepend(bar);
    this.bar = bar;
  },

  start(label) {
    this.init();
    this.current = 0;
    this.bar.style.display = 'block';
    this._step();
    if(label) _Toast.info(label, 60000);
  },

  _step() {
    this.current = Math.min(90, this.current + (90 - this.current) * 0.1 + 2);
    const fill = document.getElementById('wx-progress-fill');
    if(fill) fill.style.width = this.current + '%';
    if(this.current < 90) setTimeout(() => this._step(), 200);
  },

  done() {
    const fill = document.getElementById('wx-progress-fill');
    if(fill) fill.style.width = '100%';
    setTimeout(() => {
      if(this.bar) this.bar.style.display = 'none';
      if(fill) fill.style.width = '0%';
    }, 500);
  },
};

// ── ONBOARDING WIZARD ─────────────────────────────────────────────────────
const _Onboarding = {
  step: 0,
  isFirstRun: !localStorage.getItem('wx_onboarded'),

  start() {
    if(!this.isFirstRun) return;
    const modal = document.createElement('div');
    modal.id = 'wx-onboarding';
    modal.innerHTML = this._buildWizard();
    modal.style.cssText = `
      position:fixed;inset:0;z-index:5000;
      background:rgba(2,6,15,0.97);
      display:flex;align-items:center;justify-content:center;
      font-family:'Space Grotesk','Inter',sans-serif;
      animation:wxFadeIn .4s ease;
    `;
    document.body.appendChild(modal);
    this._goStep(0);
  },

  _buildWizard() {
    return `
    <div style="max-width:560px;width:90%;padding:16px">
      <!-- Logo + titlu -->
      <div style="text-align:center;margin-bottom:28px">
        <div style="font-size:11px;font-weight:800;letter-spacing:.18em;color:rgba(212,175,55,0.7);
          text-transform:uppercase;margin-bottom:8px">Bun venit în</div>
        <div style="font-size:32px;font-weight:900;color:#fff;line-height:1.1">
          Urban<span style="color:#D4AF37">X</span>
        </div>
        <div style="font-size:12px;color:rgba(148,163,184,0.7);margin-top:6px">
          Urban Intelligence Operating System
        </div>
      </div>

      <!-- Steps indicator -->
      <div style="display:flex;justify-content:center;gap:8px;margin-bottom:28px" id="wx-ob-steps">
        ${[0,1,2].map(i=>`<div class="wx-ob-dot" data-step="${i}" style="
          width:28px;height:4px;border-radius:2px;
          background:${i===0?'#D4AF37':'rgba(255,255,255,0.12)'};
          transition:all .3s;
        "></div>`).join('')}
      </div>

      <!-- Content area -->
      <div id="wx-ob-content"></div>

      <!-- Navigation -->
      <div style="display:flex;gap:8px;margin-top:20px">
        <button id="wx-ob-skip" onclick="_Onboarding.skip()"
          style="padding:10px 18px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);
          background:transparent;color:rgba(148,163,184,0.7);font-size:11px;cursor:pointer;font-family:inherit">
          Sari peste
        </button>
        <button id="wx-ob-next" onclick="_Onboarding.next()"
          style="flex:1;padding:10px;border-radius:8px;border:1px solid rgba(212,175,55,0.35);
          background:rgba(212,175,55,0.12);color:#D4AF37;font-size:13px;font-weight:700;
          cursor:pointer;font-family:inherit;transition:all .15s">
          Înainte →
        </button>
      </div>
    </div>`;
  },

  _steps: [
    {
      title: 'Alege pachetul tău',
      subtitle: 'Platforma se adaptează la rolul tău',
      content: () => {
        const pkgs = typeof _PACKAGES !== 'undefined' ? Object.values(_PACKAGES) : [];
        return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${pkgs.map(p => `
            <div class="wx-ob-pkg-card" onclick="_Onboarding.selectPkg('${p.id}')"
              style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);
              background:rgba(14,26,52,0.6);cursor:pointer;transition:all .15s;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${p.icon}</div>
              <div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:3px">${p.label}</div>
              <div style="font-size:9px;color:rgba(148,163,184,0.6)">${p.sublabel}</div>
              <div style="font-size:9px;font-weight:700;color:${p.color||'#D4AF37'};
                margin-top:6px;padding:2px 8px;border-radius:12px;
                border:1px solid ${p.color||'#D4AF37'};display:inline-block">
                ${p.price}
              </div>
            </div>
          `).join('')}
        </div>`;
      },
    },
    {
      title: 'Găsește un teren',
      subtitle: 'Caută orice parcelă din România',
      content: () => `
        <div style="text-align:center;padding:20px 0">
          <div style="font-size:48px;margin-bottom:12px">🗺</div>
          <div style="font-size:13px;color:rgba(200,215,235,0.9);line-height:1.7;max-width:380px;margin:0 auto">
            Caută prin număr cadastral, adresă sau click direct pe hartă.<br>
            UrbanX extrage automat: suprafață, UTR, indicatori PUG, riscuri teritoriale.
          </div>
          <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px;max-width:300px;margin:16px auto 0">
            ${[
              ['🔍','Caută adresă sau nr. cadastral'],
              ['📍','Click direct pe hartă'],
              ['📋','Import GeoJSON / WKT'],
            ].map(([icon,text])=>`
              <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;
                border-radius:6px;background:rgba(14,26,52,0.6);text-align:left">
                <span style="font-size:18px">${icon}</span>
                <span style="font-size:11px;color:rgba(148,163,184,0.8)">${text}</span>
              </div>
            `).join('')}
          </div>
        </div>`,
    },
    {
      title: 'Generează prima analiză',
      subtitle: 'Din simplu la complex — în câteva secunde',
      content: () => `
        <div style="text-align:center;padding:10px 0">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px">
            ${[
              ['📊','Studii tehnice','Însorire, acustic, ISU, geotehnic'],
              ['💰','Analize economice','Fezabilitate, ROI, deviz HG 907'],
              ['🏙','Proiecție urbană','TCI — evoluție 30 ani animată'],
            ].map(([icon,title,sub])=>`
              <div style="padding:12px 8px;border-radius:8px;
                background:rgba(14,26,52,0.6);border:1px solid rgba(212,175,55,0.1)">
                <div style="font-size:22px;margin-bottom:6px">${icon}</div>
                <div style="font-size:10px;font-weight:700;color:#fff;margin-bottom:3px">${title}</div>
                <div style="font-size:8px;color:rgba(148,163,184,0.6)">${sub}</div>
              </div>
            `).join('')}
          </div>
          <div style="padding:10px 14px;border-radius:8px;
            background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2)">
            <div style="font-size:11px;color:#22c55e;font-weight:700">✅ Ești gata!</div>
            <div style="font-size:9px;color:rgba(148,163,184,0.7);margin-top:3px">
              Selectează o parcelă → alege un studiu → PDF în câteva secunde
            </div>
          </div>
        </div>`,
    },
  ],

  _goStep(n) {
    this.step = Math.max(0, Math.min(2, n));
    const s = this._steps[this.step];

    // Update dots
    document.querySelectorAll('.wx-ob-dot').forEach((d,i) => {
      d.style.background = i === this.step ? '#D4AF37' : 'rgba(255,255,255,0.12)';
      d.style.width = i === this.step ? '36px' : '28px';
    });

    // Update content
    const content = document.getElementById('wx-ob-content');
    if(content) {
      content.style.opacity = '0';
      content.style.transform = 'translateY(8px)';
      setTimeout(() => {
        content.innerHTML = `
          <div style="text-align:center;margin-bottom:16px">
            <div style="font-size:17px;font-weight:800;color:#fff">${s.title}</div>
            <div style="font-size:11px;color:rgba(148,163,184,0.7);margin-top:3px">${s.subtitle}</div>
          </div>
          ${s.content()}
        `;
        content.style.transition = 'all .25s';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }, 150);
    }

    // Update next button
    const nextBtn = document.getElementById('wx-ob-next');
    if(nextBtn) nextBtn.textContent = this.step === 2 ? '🚀 Începe' : 'Înainte →';
  },

  selectPkg(pkgId) {
    document.querySelectorAll('.wx-ob-pkg-card').forEach(c => {
      c.style.borderColor = 'rgba(255,255,255,0.08)';
      c.style.background = 'rgba(14,26,52,0.6)';
    });
    event.currentTarget.style.borderColor = '#D4AF37';
    event.currentTarget.style.background = 'rgba(212,175,55,0.08)';
    if(typeof _USER !== 'undefined') _USER.setPackage(pkgId.toUpperCase());
  },

  next() {
    if(this.step < 2) this._goStep(this.step + 1);
    else this.skip();
  },

  skip() {
    localStorage.setItem('wx_onboarded', '1');
    const modal = document.getElementById('wx-onboarding');
    if(modal) {
      modal.style.opacity = '0';
      modal.style.transition = 'opacity .3s';
      setTimeout(() => modal.remove(), 300);
    }
    _Toast.success('Bun venit în UrbanX! Selectează o parcelă pentru a începe.', 4000);
  },
};

// ── TOOLTIP SYSTEM ────────────────────────────────────────────────────────
const _Tooltip = {
  el: null,
  timeout: null,

  init() {
    this.el = document.createElement('div');
    this.el.id = 'wx-tooltip';
    this.el.style.cssText = `
      position:fixed;z-index:9998;pointer-events:none;
      background:rgba(4,10,24,0.96);border:1px solid rgba(212,175,55,0.2);
      color:rgba(200,215,235,0.9);font-size:11px;line-height:1.5;
      padding:8px 12px;border-radius:8px;max-width:220px;
      font-family:'Space Grotesk',sans-serif;
      box-shadow:0 4px 20px rgba(0,0,0,0.4);
      display:none;transition:opacity .15s;
    `;
    document.body.appendChild(this.el);

    // Ataseaza pe toate elementele cu data-tip
    document.addEventListener('mouseover', e => {
      const target = e.target.closest('[data-tip]');
      if(target) this.show(target, target.dataset.tip);
    });
    document.addEventListener('mouseout', e => {
      if(!e.target.closest('[data-tip]')) this.hide();
    });
  },

  show(el, text) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if(!this.el) return;
      this.el.innerHTML = text;
      this.el.style.display = 'block';
      const rect = el.getBoundingClientRect();
      const tx = Math.min(rect.left, window.innerWidth - 240);
      const ty = rect.bottom + 6;
      this.el.style.left = tx + 'px';
      this.el.style.top  = ty + 'px';
      this.el.style.opacity = '1';
    }, 400);
  },

  hide() {
    clearTimeout(this.timeout);
    if(this.el) { this.el.style.opacity = '0'; setTimeout(() => { if(this.el) this.el.style.display = 'none'; }, 150); }
  },
};

// ── MOBILE GESTURES + BOTTOM SHEET ───────────────────────────────────────
const _MobileUX = {
  sheet: null,
  startY: 0,
  currentY: 0,
  isDragging: false,
  threshold: 80,

  init() {
    this.sheet = document.getElementById('wx-mobile-sheet');
    if(!this.sheet) return;

    // Touch events pe handle
    const handle = document.getElementById('wx-sheet-handle') || this.sheet;
    handle.addEventListener('touchstart', e => this._onTouchStart(e), { passive: true });
    handle.addEventListener('touchmove',  e => this._onTouchMove(e),  { passive: false });
    handle.addEventListener('touchend',   e => this._onTouchEnd(e),   { passive: true });

    // Swipe orizontal între module (pe hartă)
    const map = document.getElementById('map');
    if(map) {
      let startX = 0;
      map.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      map.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - startX;
        const modules = ['discover','design','analyze','project','export'];
        if(Math.abs(dx) > 60 && typeof _WorkspaceManager !== 'undefined') {
          const cur  = modules.indexOf(_WorkspaceManager.activeModule);
          const next = dx < 0 ? Math.min(cur+1, modules.length-1) : Math.max(cur-1, 0);
          _WorkspaceManager.activateModule(modules[next]);
        }
      }, { passive: true });
    }
  },

  open() {
    if(!this.sheet) return;
    this.sheet.classList.add('open');
    if(navigator.vibrate) navigator.vibrate(10);
  },

  close() {
    if(!this.sheet) return;
    this.sheet.classList.remove('open');
  },

  toggle() {
    if(!this.sheet) return;
    this.sheet.classList.toggle('open');
  },

  _onTouchStart(e) {
    this.startY = e.touches[0].clientY;
    this.isDragging = true;
    if(this.sheet) this.sheet.style.transition = 'none';
  },

  _onTouchMove(e) {
    if(!this.isDragging || !this.sheet) return;
    e.preventDefault();
    const dy = e.touches[0].clientY - this.startY;
    if(dy > 0) {
      this.sheet.style.transform = `translateY(${dy}px)`;
    }
  },

  _onTouchEnd(e) {
    if(!this.isDragging || !this.sheet) return;
    this.isDragging = false;
    this.sheet.style.transition = '';
    const dy = e.changedTouches[0].clientY - this.startY;
    if(dy > this.threshold) {
      this.close();
    } else {
      this.sheet.style.transform = '';
    }
  },
};

// ── KEYBOARD SHORTCUTS ────────────────────────────────────────────────────
const _Shortcuts = {
  map: {
    'd': () => _WorkspaceManager?.activateModule('discover'),
    'e': () => _WorkspaceManager?.activateModule('design'),
    'a': () => _WorkspaceManager?.activateModule('analyze'),
    'p': () => _WorkspaceManager?.activateModule('project'),
    'x': () => _WorkspaceManager?.activateModule('export'),
    't': () => window.openTCI?.(),
    '?': () => _Shortcuts.showHelp(),
    'Escape': () => {
      document.getElementById('tci-modal')?.classList.remove('tci-open');
      document.getElementById('wx-onboarding')?.remove();
    },
  },

  init() {
    document.addEventListener('keydown', e => {
      // Nu daca e intr-un input
      if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const handler = this.map[e.key];
      if(handler) { e.preventDefault(); handler(); }
    });
  },

  showHelp() {
    const existing = document.getElementById('wx-shortcuts-help');
    if(existing) { existing.remove(); return; }
    const el = document.createElement('div');
    el.id = 'wx-shortcuts-help';
    el.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      background:rgba(4,10,24,0.97);border:1px solid rgba(212,175,55,0.2);
      border-radius:12px;padding:20px 24px;z-index:9000;
      font-family:'Space Grotesk',sans-serif;
      box-shadow:0 8px 40px rgba(0,0,0,0.6);min-width:260px;
    `;
    el.innerHTML = `
      <div style="font-size:12px;font-weight:800;color:#D4AF37;margin-bottom:12px">
        ⌨ Shortcuts UrbanX
      </div>
      ${Object.entries({
        'D':'Discover (hartă)', 'E':'Design (AEDIS)', 'A':'Analize (studii)',
        'P':'Proiecție urbană', 'X':'Export proiecte',
        'T':'Deschide TCI', '?':'Shortcuts', 'Esc':'Închide modal',
      }).map(([k,v])=>`
        <div style="display:flex;justify-content:space-between;padding:5px 0;
          border-bottom:1px solid rgba(255,255,255,0.04)">
          <span style="font-size:11px;background:rgba(255,255,255,0.08);
            border-radius:4px;padding:1px 7px;font-weight:700;color:#fff">${k}</span>
          <span style="font-size:11px;color:rgba(148,163,184,0.7)">${v}</span>
        </div>
      `).join('')}
      <div style="margin-top:10px;text-align:center;font-size:9px;color:rgba(100,120,150,0.5)">
        Click oriunde sau Esc pentru a închide
      </div>
    `;
    el.onclick = () => el.remove();
    document.body.appendChild(el);
  },
};

// ── OFFLINE DETECTOR ──────────────────────────────────────────────────────
const _OfflineDetector = {
  init() {
    window.addEventListener('online',  () => _Toast.success('Conexiune restabilită'));
    window.addEventListener('offline', () => _Toast.warn('Fără conexiune — unele funcții sunt limitate', 8000));
    if(!navigator.onLine) _Toast.warn('Mod offline — date live indisponibile', 6000);
  },
};

// ── PERFORMANCE: DEBOUNCE + LAZY ──────────────────────────────────────────
function _debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function _throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if(!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ── RIPPLE EFFECT pe butoane ──────────────────────────────────────────────
function _addRipple(e) {
  const btn = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size/2;
  const y = e.clientY - rect.top  - size/2;
  ripple.style.cssText = `
    position:absolute;border-radius:50%;
    width:${size}px;height:${size}px;
    left:${x}px;top:${y}px;
    background:rgba(255,255,255,0.2);
    transform:scale(0);animation:wxRipple .5s ease-out forwards;
    pointer-events:none;
  `;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
}

// ── CSS: TOATE ANIMATIILE + STILURI UX POLISH ─────────────────────────────
const _UXStyles = document.createElement('style');
_UXStyles.textContent = `
  /* Keyframes */
  @keyframes wxToastIn {
    from { opacity:0; transform:translateX(20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes wxFadeIn {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes wxRipple {
    from { transform:scale(0); opacity:1; }
    to   { transform:scale(2); opacity:0; }
  }
  @keyframes wxSkeleton {
    0%  { background-position:-200px 0; }
    100%{ background-position:calc(200px + 100%) 0; }
  }
  @keyframes wxPulse {
    0%,100% { opacity:1; } 50% { opacity:.5; }
  }
  @keyframes wxSlideUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Toast */
  .wx-toast { pointer-events:auto; }
  .wx-toast-icon { font-size:14px; flex-shrink:0; }
  .wx-toast-msg  { font-size:11.5px; line-height:1.4; }

  /* Skeleton */
  .wx-skeleton-row {
    display:flex;justify-content:space-between;align-items:center;
    padding:8px 12px;border-radius:6px;margin-bottom:4px;
    background:rgba(14,26,52,0.6);gap:8px;
  }
  .wx-skeleton-block {
    border-radius:4px;height:10px;
    background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%);
    background-size:400px 100%;
    animation:wxSkeleton 1.4s ease infinite;
  }

  /* Ripple container */
  .wx-btn-primary, .wx-btn-secondary, .wx-study-btn,
  .tci-play-btn, .tci-export-btn {
    cursor:pointer;
  }

  /* Focus ring accesibil */
  *:focus-visible {
    outline:2px solid rgba(212,175,55,0.6);
    outline-offset:2px;
    border-radius:4px;
  }

  /* Module transitions */
  .wx-panel {
    animation:wxSlideUp .2s ease;
  }

  /* Hover pe nav buttons */
  .wx-nav-btn:not(.locked):hover {
    transform:translateY(-1px);
  }
  .wx-nav-btn.active {
    transform:translateY(-1px);
  }

  /* Study button hover */
  .wx-study-btn:not(.locked):active {
    transform:scale(0.98);
  }

  /* Tooltip arrow */
  #wx-tooltip::before {
    content:'';position:absolute;top:-4px;left:12px;
    width:8px;height:8px;
    background:rgba(4,10,24,0.96);
    transform:rotate(45deg);
    border-left:1px solid rgba(212,175,55,0.2);
    border-top:1px solid rgba(212,175,55,0.2);
  }

  /* Mobile sheet improved */
  #wx-mobile-sheet {
    will-change:transform;
  }

  /* Loading overlay */
  #wx-loading-overlay {
    position:fixed;inset:0;z-index:8000;
    background:rgba(2,6,15,0.85);
    display:flex;flex-direction:column;
    align-items:center;justify-content:center;
    font-family:'Space Grotesk',sans-serif;
    backdrop-filter:blur(8px);
  }
  .wx-loading-spinner {
    width:40px;height:40px;border-radius:50%;
    border:3px solid rgba(212,175,55,0.15);
    border-top-color:#D4AF37;
    animation:wxSpin .8s linear infinite;
  }
  @keyframes wxSpin { to { transform:rotate(360deg); } }

  /* Package cards hover */
  .wx-ob-pkg-card:hover {
    border-color:rgba(212,175,55,0.3)!important;
    transform:translateY(-2px);
    box-shadow:0 4px 20px rgba(0,0,0,0.3);
  }

  /* Smooth scrollbar */
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:rgba(0,0,0,0.1); }
  ::-webkit-scrollbar-thumb { background:rgba(212,175,55,0.2);border-radius:2px; }
  ::-webkit-scrollbar-thumb:hover { background:rgba(212,175,55,0.35); }

  /* Empty state */
  .wx-empty-state {
    text-align:center;padding:32px 16px;color:rgba(100,120,150,0.7);
    font-size:11px;line-height:1.7;
  }
  .wx-empty-state .wx-es-icon { font-size:36px;margin-bottom:8px;opacity:0.6; }

  /* Data-tip elements */
  [data-tip] { cursor:help; }
`;
document.head.appendChild(_UXStyles);

// ── LOADING OVERLAY pentru studii ─────────────────────────────────────────
const _LoadingOverlay = {
  show(message, steps) {
    const existing = document.getElementById('wx-loading-overlay');
    if(existing) existing.remove();

    const el = document.createElement('div');
    el.id = 'wx-loading-overlay';
    el.innerHTML = `
      <div class="wx-loading-spinner" style="margin-bottom:16px"></div>
      <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:8px">${message}</div>
      ${steps ? `
        <div style="max-width:280px;width:100%">
          ${steps.map((s,i)=>`
            <div id="wx-ls-${i}" style="display:flex;align-items:center;gap:8px;padding:4px 0;
              font-size:10px;color:rgba(148,163,184,0.5);transition:color .3s">
              <span class="wx-ls-icon" style="width:14px">⏳</span>
              <span>${s}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
    document.body.appendChild(el);
    _Progress.start(message);
    return el;
  },

  setStep(i) {
    // Marcheaza pasul anterior ca done
    if(i > 0) {
      const prev = document.getElementById('wx-ls-'+(i-1));
      if(prev) {
        prev.style.color = 'rgba(34,197,94,0.8)';
        prev.querySelector('.wx-ls-icon').textContent = '✓';
      }
    }
    // Marcheaza pasul curent ca activ
    const cur = document.getElementById('wx-ls-'+i);
    if(cur) {
      cur.style.color = '#D4AF37';
      cur.querySelector('.wx-ls-icon').textContent = '▶';
    }
  },

  hide() {
    const el = document.getElementById('wx-loading-overlay');
    if(el) {
      el.style.opacity = '0';
      el.style.transition = 'opacity .3s';
      setTimeout(() => el.remove(), 300);
    }
    _Progress.done();
  },
};

// ── PATCH: Override _pdfSaveMobile cu loading overlay ────────────────────
const _origSaveMobile = window._pdfSaveMobile;
if(_origSaveMobile) {
  window._pdfSaveMobile = function(pdf, filename) {
    _LoadingOverlay.hide();
    _origSaveMobile(pdf, filename);
    _Toast.success('PDF generat: ' + filename.split('/').pop(), 4000);
  };
}

// ── INITIALIZATION ────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    _Tooltip.init();
    _MobileUX.init();
    _Shortcuts.init();
    _OfflineDetector.init();

    // Adauga ripple pe toate butoanele
    document.querySelectorAll('.wx-btn-primary,.wx-btn-secondary,.wx-study-btn,.tci-play-btn')
      .forEach(btn => btn.addEventListener('click', _addRipple));

    // Adauga data-tip pe elemente UI
    const tips = [
      ['#wx-pkg-badge',       'Pachetul tău activ — click pentru a schimba'],
      ['[data-module=design]','Proiectează volumetria cu AEDIS — setează etaje, funcțiune, repartizare'],
      ['[data-module=analyze]','Generează studii tehnice și economice pentru parcela selectată'],
      ['[data-module=project]','Temporal City Intelligence — proiecție urbană animată 2021-2055'],
      ['[data-module=export]', 'Proiectele salvate + export PDF/JSON/GeoJSON'],
    ];
    tips.forEach(([sel, tip]) => {
      document.querySelectorAll(sel).forEach(el => el.dataset.tip = tip);
    });

    // Onboarding
    _Onboarding.start();

    console.log('[UrbanX UX] Polish Engine v1.0 initializat');
  }, 800);
});

// Expune global
window._Toast          = _Toast;
window._Progress       = _Progress;
window._LoadingOverlay = _LoadingOverlay;
window._Onboarding     = _Onboarding;
window._MobileUX       = _MobileUX;
window._Shortcuts      = _Shortcuts;

