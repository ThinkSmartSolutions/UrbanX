// Copyright (c) 2024-2026 ThinkSmart Solutions SRL | contact@urbanx.ro | Utilizare conform LICENSE
/**
 * UrbanX TSS·FG — Cookie Consent Banner
 * Conformitate: Legea 506/2004 + Directiva ePrivacy 2002/58/CE + GDPR art.7
 * 
 * Inserează automat bannerul de cookies pe orice pagină.
 * Preferințele se salvează în localStorage și opțional pe server (dacă utilizatorul e logat).
 */

(function() {
'use strict';

const COOKIE_KEY = 'ux_cookie_consent';
const API_BASE   = 'https://api.urbanx.ro/api/v1';

// ── Verificăm dacă consimțământul a fost deja dat ─────────────────
function getConsent() {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

function setConsent(analytics, marketing) {
  const consent = {
    essential:   true,
    analytics,
    marketing,
    timestamp:   new Date().toISOString(),
    version:     '1.0',
  };
  try { localStorage.setItem(COOKIE_KEY, JSON.stringify(consent)); } catch { }
  
  // Sincronizare cu serverul dacă utilizatorul e logat
  const token = document.cookie.match(/ux_token=([^;]+)/)?.[1];
  if (token) {
    fetch(`${API_BASE}/gdpr/cookie-consent`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ analytics, marketing }),
    }).catch(() => {});
  }
  
  return consent;
}

// ── Activare/dezactivare scripturi analitics ─────────────────────
function applyConsentChoices(consent) {
  // Google Analytics (dacă e configurat)
  if (consent.analytics && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }
  
  // Event pentru alte scripturi care ascultă
  document.dispatchEvent(new CustomEvent('ux:cookie-consent', {
    detail: consent
  }));
}

// ── Creare banner HTML ────────────────────────────────────────────
function createBanner() {
  const banner = document.createElement('div');
  banner.id = 'ux-cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-labelledby', 'ux-cookie-title');
  banner.setAttribute('aria-modal', 'false');
  
  banner.style.cssText = [
    'position:fixed',
    'bottom:0', 'left:0', 'right:0',
    'z-index:999999',
    'background:#1A1A2E',
    'border-top:3px solid #D4AF37',
    'padding:20px 24px',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif',
    'font-size:14px',
    'box-shadow:0 -4px 32px rgba(0,0,0,0.3)',
  ].join(';');

  banner.innerHTML = `
    <div style="max-width:1200px;margin:0 auto">
      <div style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap">
        
        <!-- Text -->
        <div style="flex:1;min-width:280px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="background:#D4AF37;padding:4px 10px;border-radius:4px;
                        font-weight:900;font-size:13px;color:#1A1A2E">UX</div>
            <strong id="ux-cookie-title" style="color:#fff;font-size:15px">
              UrbanX folosește cookies
            </strong>
          </div>
          <p style="color:#94A3B8;margin:0;font-size:13px;line-height:1.6">
            Folosim cookies <strong style="color:#CBD5E1">esențiale</strong> (autentificare, securitate) și,
            cu acordul tău, cookies <strong style="color:#CBD5E1">de analitics</strong> pentru îmbunătățirea serviciului.
            Nu folosim cookies de marketing.
            <a href="/privacy-policy.html" 
               style="color:#D4AF37;text-decoration:none"
               target="_blank" rel="noopener">Politica de Confidențialitate</a>
            ·
            <button onclick="document.getElementById('ux-cookie-details').style.display='block';this.style.display='none'"
                    style="background:none;border:none;color:#D4AF37;cursor:pointer;font-size:13px;padding:0;text-decoration:underline">
              Detalii
            </button>
          </p>
          
          <!-- Detalii expandabile -->
          <div id="ux-cookie-details" style="display:none;margin-top:12px">
            <table style="width:100%;font-size:12px;border-collapse:collapse">
              <tr>
                <th style="background:#0f1a2e;color:#64748B;padding:6px 10px;text-align:left">Tip</th>
                <th style="background:#0f1a2e;color:#64748B;padding:6px 10px">Necesită consimțământ</th>
                <th style="background:#0f1a2e;color:#64748B;padding:6px 10px;text-align:left">Scop</th>
              </tr>
              <tr>
                <td style="color:#CBD5E1;padding:6px 10px;border-bottom:1px solid #1e2d4a">Esențiale</td>
                <td style="color:#4ADE80;padding:6px 10px;text-align:center;border-bottom:1px solid #1e2d4a">❌ Nu</td>
                <td style="color:#94A3B8;padding:6px 10px;border-bottom:1px solid #1e2d4a">Autentificare (JWT), securitate CSRF</td>
              </tr>
              <tr>
                <td style="color:#CBD5E1;padding:6px 10px;border-bottom:1px solid #1e2d4a">Preferințe</td>
                <td style="color:#FCD34D;padding:6px 10px;text-align:center;border-bottom:1px solid #1e2d4a">⚡ Opțional</td>
                <td style="color:#94A3B8;padding:6px 10px;border-bottom:1px solid #1e2d4a">Temă interfață, limb preferată</td>
              </tr>
              <tr>
                <td style="color:#CBD5E1;padding:6px 10px;border-bottom:1px solid #1e2d4a">Analitics</td>
                <td style="color:#FCD34D;padding:6px 10px;text-align:center;border-bottom:1px solid #1e2d4a">✅ Necesită acord</td>
                <td style="color:#94A3B8;padding:6px 10px;border-bottom:1px solid #1e2d4a">Statistici de utilizare anonime</td>
              </tr>
              <tr>
                <td style="color:#CBD5E1;padding:6px 10px">Marketing</td>
                <td style="color:#94A3B8;padding:6px 10px;text-align:center">— Nu folosim</td>
                <td style="color:#94A3B8;padding:6px 10px">—</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Butoane -->
        <div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0;min-width:200px">
          <!-- Accept toate -->
          <button id="ux-cookie-accept-all"
                  aria-label="Acceptă toate cookies"
                  style="background:#D4AF37;color:#1A1A2E;border:none;
                         padding:12px 24px;border-radius:8px;font-weight:700;
                         cursor:pointer;font-size:14px;width:100%;
                         transition:opacity 0.2s"
                  onmouseover="this.style.opacity='.85'"
                  onmouseout="this.style.opacity='1'">
            ✓ Acceptă toate
          </button>
          
          <!-- Respinge opționale -->
          <button id="ux-cookie-reject-optional"
                  aria-label="Acceptă doar cookies esențiale"
                  style="background:rgba(255,255,255,0.08);color:#CBD5E1;
                         border:1px solid rgba(255,255,255,0.15);
                         padding:10px 24px;border-radius:8px;font-weight:500;
                         cursor:pointer;font-size:13px;width:100%;
                         transition:all 0.2s"
                  onmouseover="this.style.background='rgba(255,255,255,0.12)'"
                  onmouseout="this.style.background='rgba(255,255,255,0.08)'">
            Doar esențiale
          </button>
          
          <!-- Personalizare -->
          <button id="ux-cookie-customize"
                  aria-label="Personalizare preferințe cookies"
                  style="background:none;color:#64748B;border:none;
                         padding:6px;cursor:pointer;font-size:12px;
                         text-decoration:underline;width:100%">
            Personalizare
          </button>
        </div>
      </div>
      
      <!-- Panou personalizare (ascuns inițial) -->
      <div id="ux-cookie-custom-panel" 
           style="display:none;margin-top:16px;padding-top:16px;border-top:1px solid #1e2d4a">
        <p style="color:#94A3B8;font-size:13px;margin-bottom:12px">
          Alege ce tipuri de cookies accepți:
        </p>
        <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center">
          
          <label style="display:flex;align-items:center;gap:8px;cursor:default">
            <input type="checkbox" checked disabled 
                   style="accent-color:#D4AF37;width:16px;height:16px">
            <span style="color:#CBD5E1;font-size:13px">
              <strong>Esențiale</strong> (obligatorii)
            </span>
          </label>
          
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" id="ux-analytics-toggle" 
                   style="accent-color:#D4AF37;width:16px;height:16px">
            <span style="color:#CBD5E1;font-size:13px">
              <strong>Analitics</strong> (statistici anonime)
            </span>
          </label>
          
          <button onclick="
            const analytics = document.getElementById('ux-analytics-toggle').checked;
            window._UrbanXCookies.save(analytics, false);
          " style="background:#D4AF37;color:#1A1A2E;border:none;padding:8px 20px;
                   border-radius:6px;font-weight:700;cursor:pointer;font-size:13px;margin-left:auto">
            Salvează preferințele
          </button>
        </div>
      </div>
    </div>
  `;

  return banner;
}

// ── Handlers butoane ─────────────────────────────────────────────
function attachHandlers(banner) {
  banner.querySelector('#ux-cookie-accept-all').onclick = () => {
    window._UrbanXCookies.save(true, false);  // analytics=true, marketing=false
  };
  
  banner.querySelector('#ux-cookie-reject-optional').onclick = () => {
    window._UrbanXCookies.save(false, false);
  };
  
  banner.querySelector('#ux-cookie-customize').onclick = () => {
    const panel = document.getElementById('ux-cookie-custom-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  };
}

// ── API publică ────────────────────────────────────────────────────
window._UrbanXCookies = {
  // Inițializare — apelat automat la load
  init() {
    const existing = getConsent();
    if (existing) {
      applyConsentChoices(existing);
      return;  // Banner-ul nu mai apare dacă consimțământul a fost dat
    }
    
    // Afișăm banner-ul
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this._showBanner());
    } else {
      // Mic delay pentru a nu bloca render-ul
      setTimeout(() => this._showBanner(), 500);
    }
  },
  
  _showBanner() {
    if (document.getElementById('ux-cookie-banner')) return;
    const banner = createBanner();
    attachHandlers(banner);
    document.body.appendChild(banner);
  },
  
  // Salvare preferințe și ascundere banner
  save(analytics, marketing) {
    const consent = setConsent(analytics, marketing);
    applyConsentChoices(consent);
    
    const banner = document.getElementById('ux-cookie-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transition = 'opacity 0.3s';
      setTimeout(() => banner.remove(), 300);
    }
    
    console.log('[UrbanX Cookies] Preferințe salvate:', { analytics, marketing });
  },
  
  // Resetare (pt "Modifică preferințele")
  reset() {
    try { localStorage.removeItem(COOKIE_KEY); } catch { }
    this._showBanner();
  },
  
  // Verificare status
  getStatus() {
    return getConsent();
  },
};

// ── Auto-start ────────────────────────────────────────────────────
window._UrbanXCookies.init();

})();
