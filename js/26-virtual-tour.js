/* ═══════════════════════════════════════════════════════════════════════════
   UrbanX · Tur Virtual 3D — VERSIUNE SAFE (TUR DEZACTIVAT TEMPORAR)
   ──────────────────────────────────────────────────────────────────────────
   Această versiune injectează DOAR butoanele în topbar viewer 3D.
   Click pe oricare → toast informativ. NICIUN cod 3D nu rulează.
   GARANTAT: zero crash. Restul platformei UrbanX neafectată.
   ═══════════════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const VERSION = '20260603-SAFE';

  function _toast(title, body){
    let t = document.getElementById('vtour-safe-toast');
    if(t) t.remove();
    t = document.createElement('div');
    t.id = 'vtour-safe-toast';
    t.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      background:rgba(15,23,42,.97);color:#e2e8f0;
      padding:24px 32px;border-radius:14px;
      border:1px solid rgba(251,191,36,.4);
      box-shadow:0 12px 48px rgba(0,0,0,.6);
      z-index:99999;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      max-width:420px;text-align:center;
      backdrop-filter:blur(12px);
    `;
    t.innerHTML = `
      <div style="font-size:14px;font-weight:700;color:#fbbf24;margin-bottom:10px;letter-spacing:.3px">
        ⚠ ${title}
      </div>
      <div style="font-size:12px;color:#cbd5e1;line-height:1.5">
        ${body}
      </div>
      <button onclick="this.parentElement.remove()"
        style="margin-top:14px;background:rgba(251,191,36,.15);color:#fbbf24;
        border:1px solid rgba(251,191,36,.4);padding:6px 16px;border-radius:6px;
        cursor:pointer;font-size:11px;font-weight:600">
        Înțeles
      </button>
    `;
    document.body.appendChild(t);
    setTimeout(() => { if(t.parentNode) t.remove(); }, 8000);
  }

  function _injectButtons(){
    const tryInject = () => {
      if(document.getElementById('vtour-launch-btn')) return true;
      const topbar = document.getElementById('v3d-topbar');
      if(!topbar) return false;
      const rows = topbar.querySelectorAll(':scope > div');
      const targetRow = rows[1] || topbar;

      const btn = document.createElement('button');
      btn.id = 'vtour-launch-btn';
      btn.title = 'Tur Virtual 3D (în reproiectare)';
      btn.innerHTML = '🥽 Tur Virtual';
      btn.style.cssText = `
        background:rgba(100,116,139,.15);color:#94a3b8;
        border:1px solid rgba(100,116,139,.4);border-radius:8px;
        padding:5px 13px;font-size:11px;font-weight:700;cursor:pointer;
        flex-shrink:0;min-height:36px;letter-spacing:.3px;white-space:nowrap;
      `;
      btn.addEventListener('click', () => {
        _toast('Tur Virtual indisponibil temporar',
          'Funcționalitatea de tur virtual 3D este în reproiectare pentru a elimina ' +
          'instabilitatea identificată. Vom restabili într-o iterație viitoare. ' +
          'Restul platformei UrbanX funcționează normal.');
      });
      targetRow.appendChild(btn);

      const entBtn = document.createElement('button');
      entBtn.id = 'vtour-entrance-btn';
      entBtn.title = 'Marker intrare (în reproiectare)';
      entBtn.innerHTML = '🚪 Intrare';
      entBtn.style.cssText = `
        background:rgba(100,116,139,.1);color:#94a3b8;
        border:1px solid rgba(100,116,139,.3);border-radius:8px;
        padding:5px 11px;font-size:11px;font-weight:700;cursor:pointer;
        flex-shrink:0;min-height:36px;letter-spacing:.3px;white-space:nowrap;
      `;
      entBtn.addEventListener('click', () => {
        _toast('Marker intrare indisponibil temporar',
          'Funcționalitatea este împreună cu turul virtual în reproiectare.');
      });
      targetRow.appendChild(entBtn);

      console.log('[VTour SAFE v' + VERSION + '] Butoane injectate (mod inactiv)');
      return true;
    };

    if(tryInject()) return;
    const observer = new MutationObserver(() => { tryInject(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // API public minimal — în caz că alte module îl apelează
  window.VTour = {
    init: () => {},
    start: () => { _toast('Tur indisponibil', 'În reproiectare. Revenim curând.'); },
    stop: () => {},
    toggleEntranceMarker: () => {},
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _injectButtons);
  } else {
    _injectButtons();
  }
})();
