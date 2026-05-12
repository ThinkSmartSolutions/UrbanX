// ═══════════════════════════════════════════════════════════════════════════
// 19-tci-modules-patch.js — UDRE + UXL Integration Patch v2.1
// UrbanX TSS·FG
//
// FIXES v2.1 (audit 2026-05-12):
//   FIX 1: Panel UXL unic (nu left+right) — tci-kpis-r e copy HTML, nu panou separat
//   FIX 2: \n\n → <br><br> în narrative (innerHTML nu renderează \n)
//   FIX 3: UDRE panel ancorat după UXL (nu după un al doilea tci-eu-panel inexistent)
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0;
    if (n > 80) { console.warn('[Patch] Timeout așteptare TCI/UDRE/UXL/PUG_REGISTRY'); return; }
    if (typeof TCI          === 'undefined' ||
        typeof UDRE         === 'undefined' ||
        typeof UXL          === 'undefined' ||
        typeof PUG_REGISTRY === 'undefined') {
      setTimeout(() => waitReady(cb, n + 1), 250);
      return;
    }
    cb();
  }

  waitReady(() => {
    console.log('[Patch v2.1] ✅ TCI + UDRE + UXL + PUG_REGISTRY ready');

    // ────────────────────────────────────────────────────────────────────
    // 1. _updateKPIs → injectează panourile UXL + UDRE
    // ────────────────────────────────────────────────────────────────────
    const _origKPIs = TCI._updateKPIs.bind(TCI);
    TCI._updateKPIs = function () {
      _origKPIs();
      _injectUXL(this);
      _injectUDRE(this);
    };

    // ────────────────────────────────────────────────────────────────────
    // 2. _director._build → enriches narativ cu snippeturi UXL
    //    _origBuild este bound la TCI._director → 'this' corect în original
    // ────────────────────────────────────────────────────────────────────
    const _origBuild = TCI._director._build.bind(TCI._director);
    TCI._director._build = function () {
      const scenes = _origBuild();
      try {
        const T    = this._tci || TCI;
        const city = T.cityData || T.d || {};
        const need = T._calcUrbanNeed?.(city) || {};
        const prof = UXL.getProfile(city, [], need);
        T._uxlProfile = prof;
        scenes.forEach(sc => {
          const snip = UXL.getNarrativeSnippet(prof, sc.id);
          if (snip && sc.body) sc.body += ' ' + snip;
        });
      } catch (e) { console.warn('[Patch] UXL scene enrich:', e.message); }
      return scenes;
    };

    // ────────────────────────────────────────────────────────────────────
    // 3. _onYearChange → refresh UXL la milestone 5 ani
    //    Arrow function în setTimeout → 'this' capturat din closure (TCI) ✓
    // ────────────────────────────────────────────────────────────────────
    const _origYC = TCI._onYearChange.bind(TCI);
    TCI._onYearChange = function (yr) {
      _origYC(yr);
      if (yr % 5 === 0) setTimeout(() => { _injectUXL(this); _injectUDRE(this); }, 60);
    };

    // ────────────────────────────────────────────────────────────────────
    // 4. _calcFeasibility → adaugă câmpul udreRules la rezultat
    // ────────────────────────────────────────────────────────────────────
    const _origFeas = TCI._calcFeasibility.bind(TCI);
    TCI._calcFeasibility = function (zone, cityData, seismicAg) {
      const result = _origFeas(zone, cityData, seismicAg);
      try {
        const lc = TCI._calcLifecycleScore?.(cityData) || { score: 0 };
        result.udreRules = UDRE.getRules(zone?.id || 'CV', TCI.cityKey || 'iasi', lc.score, seismicAg, zone);
      } catch (e) { /* silențios */ }
      return result;
    };

    // ────────────────────────────────────────────────────────────────────
    // 5. _buildTemporalNarrative → adaugă linie UXL (FIX: <br> nu \n)
    // ────────────────────────────────────────────────────────────────────
    if (typeof TCI._buildTemporalNarrative === 'function') {
      const _origNar = TCI._buildTemporalNarrative.bind(TCI);
      TCI._buildTemporalNarrative = function (...args) {
        let base = _origNar(...args);
        try {
          const p = TCI._uxlProfile;
          if (p) {
            // FIX v2.1: <br> în loc de \n\n — output e innerHTML
            base += `<br><span style="opacity:.55;font-size:8px">🌳 ${p.verde.mp_loc?.toFixed(1)} mp/loc · 🚶 Walk ${p.walk.score}/100 · 🌡 UHI +${p.heat.uhi_mediu?.toFixed(1)}°C</span>`;
          }
        } catch (e) { /* skip */ }
        return base;
      };
    }

    console.log('[Patch v2.1] ✅ Toate patch-urile aplicate');

    // ────────────────────────────────────────────────────────────────────
    // 6. Buton toggle UXL (adăugat la UI după build)
    // ────────────────────────────────────────────────────────────────────
    setTimeout(_addToggleButton, 3500);
  });

  // ── Inject UXL panel (UN singur panel — FIX v2.1) ───────────────────────
  // tci-kpis-r e copy innerHTML din tci-kpis → nu e panou separat
  // Injectăm UN singur panou UXL după tci-eu-panel
  function _injectUXL(tci) {
    try {
      const city = tci.cityData || tci.d || {};
      if (!city.pop2021) return;
      const need    = tci._calcUrbanNeed?.(city) || {};
      const profile = UXL.getProfile(city, [], need);
      tci._uxlProfile = profile;
      const html = UXL.renderPanel(profile);
      _upsert('tci-uxl-panel', html, 'tci-eu-panel', 'afterend');
    } catch (e) { console.warn('[Patch] UXL inject:', e.message); }
  }

  // ── Inject UDRE panel (FIX v2.1: ancorare după tci-uxl-panel) ───────────
  function _injectUDRE(tci) {
    try {
      const city    = tci.cityData || tci.d || {};
      if (!city.pop2021) return;
      const cityKey = tci.cityKey || 'iasi';
      const seis    = tci._getSeismicAg?.(city.lon||27.6, city.lat||47.16) || { ag:0.20 };
      const lc      = tci._calcLifecycleScore?.(city) || { score:0 };
      const zones   = tci._REAL_ZONES?.[cityKey] || [];
      const yr      = tci.year || 2025;

      // Zona cu startYr cel mai apropiată de anul curent
      const active = zones.length
        ? zones.reduce((b, z) => Math.abs((z.startYr||2025)-yr) < Math.abs((b.startYr||2025)-yr) ? z : b)
        : null;
      if (!active) return;

      const rules = UDRE.getRules(active.id, cityKey, lc.score, seis.ag, active);
      const html  = UDRE.renderCard(rules);

      // FIX v2.1: ancorăm după tci-uxl-panel (care tocmai a fost creat)
      // Fallback: după tci-eu-panel dacă UXL nu e încă injectat
      const anchor = document.getElementById('tci-uxl-panel') ? 'tci-uxl-panel' : 'tci-eu-panel';
      _upsert('tci-udre-panel', html, anchor, 'afterend');
    } catch (e) { console.warn('[Patch] UDRE inject:', e.message); }
  }

  // ── Helper: create sau update element ────────────────────────────────────
  function _upsert(id, html, anchorId, pos) {
    const existing = document.getElementById(id);
    if (existing) { existing.innerHTML = html; return; }
    const anchor = document.getElementById(anchorId);
    if (anchor) { anchor.insertAdjacentHTML(pos, `<div id="${id}">${html}</div>`); return; }
    // Fallback: append la tci-kpis dacă niciun anchor nu e găsit
    const kpi = document.getElementById('tci-kpis');
    if (kpi) kpi.insertAdjacentHTML('afterend', `<div id="${id}">${html}</div>`);
  }

  // ── Toggle button ─────────────────────────────────────────────────────────
  function _addToggleButton() {
    if (document.getElementById('tci-uxl-toggle')) return;
    // Găsim div-ul "PROIECȚIE XXXX–2055" după text și fontSize
    const header = Array.from(document.querySelectorAll('div')).find(el =>
      el.textContent?.includes('PROIECȚIE') && el.style?.fontSize === '7px'
    );
    if (!header) return;

    const btn = document.createElement('button');
    btn.id    = 'tci-uxl-toggle';
    btn.title = 'Arată/ascunde UXL (verde, walkability, heat island) și UDRE (reguli urbanistice PUG)';
    btn.innerHTML = '🏙 UXL';
    btn.style.cssText = [
      'font-size:7.5px','font-weight:700','padding:3px 7px','border-radius:4px',
      'cursor:pointer','font-family:inherit','margin-left:4px',
      'background:rgba(16,185,129,.12)','border:1px solid rgba(16,185,129,.3)',
      'color:#34d399',
    ].join(';');
    btn.onclick = () => {
      ['tci-uxl-panel','tci-udre-panel'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = el.style.display === 'none' ? '' : 'none';
      });
    };
    header.parentElement?.insertBefore(btn, header);
  }

})();

console.log('[19-tci-modules-patch] ✅ v2.1 loaded — 3 bugs fixed');
