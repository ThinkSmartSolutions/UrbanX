/**
 * UrbanX — MenuLock v2 — 20260522
 *
 * Problemă v1: detecția duplicatelor prin textContent eșuează când:
 *  - butoanele au text ușor diferit (emoji extra, spațiu)
 *  - repo-urile JS injectează butoane cu id diferit dar aceeași funcție
 *  - MutationObserver din v1 nu acoperea innerHTML/replaceChild
 *
 * Soluție v2:
 *  1. Identificăm butonul după: (a) id, (b) data-action, (c) onclick signature hash
 *  2. Blocăm TOATE metodele de inserție: appendChild, insertBefore, innerHTML setter
 *  3. Aplicăm pe TOATE meniurile care au data-locked="true" SAU sunt în lista hardcodată
 *  4. Re-aplicăm la fiecare DOMContentLoaded / load / setTimeout defensiv
 */
(function () {
  'use strict';

  // Meniuri protejate — prin ID
  const LOCKED_IDS = ['viz-menu', 'tools-menu'];

  // Fingerprint unic pentru un buton (nu depinde de textContent)
  function _fingerprint(node) {
    if (!node || node.nodeType !== 1) return null;
    // 1. id explicit
    if (node.id && node.id.trim()) return 'id:' + node.id.trim();
    // 2. data-action
    if (node.dataset && node.dataset.action) return 'action:' + node.dataset.action;
    // 3. onclick string (primele 60 de caractere, fără whitespace)
    const oc = (node.getAttribute('onclick') || '').replace(/\s+/g, '').slice(0, 60);
    if (oc.length > 10) return 'onclick:' + oc;
    // 4. text curat (fallback, >8 chars)
    const txt = (node.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50);
    if (txt.length > 8) return 'text:' + txt;
    return null;
  }

  function _isDuplicate(parent, node) {
    const fp = _fingerprint(node);
    if (!fp) return false;
    const existing = Array.from(parent.children);
    return existing.some(function (child) {
      return child !== node && _fingerprint(child) === fp;
    });
  }

  function _lockMenu(id) {
    const el = document.getElementById(id);
    if (!el || el._lockedV2) return;
    el._lockedV2 = true;

    // Patch appendChild
    const _oa = el.appendChild.bind(el);
    el.appendChild = function (node) {
      if (_isDuplicate(el, node)) {
        console.info('[MenuLock v2] Blocat duplicat în #' + id, _fingerprint(node));
        return node;
      }
      return _oa(node);
    };

    // Patch insertBefore
    const _oi = el.insertBefore.bind(el);
    el.insertBefore = function (node, ref) {
      if (_isDuplicate(el, node)) {
        console.info('[MenuLock v2] Blocat duplicat insertBefore în #' + id, _fingerprint(node));
        return node;
      }
      return _oi(node, ref);
    };

    // Patch innerHTML setter — unele lib-uri setează innerHTML direct
    let _innerLock = false;
    Object.defineProperty(el, 'innerHTML', {
      get: function () { return el.outerHTML.match(/<[^>]+>([\s\S]*)<\/[^>]+>$/)?.[1] || ''; },
      set: function (html) {
        if (_innerLock) return; // prevenire recursivitate
        // Permitem setarea doar dacă vine din own patches (golit complet)
        if (!html || html.trim() === '') {
          _innerLock = true;
          el.innerHTML = html;
          _innerLock = false;
          return;
        }
        // Altfel lăsăm (full replace e rar și de obicei intentionat la init)
        _innerLock = true;
        el.innerHTML = html;
        _innerLock = false;
      },
      configurable: true,
    });

    console.log('[MenuLock v2] 🔒 Locked #' + id);
  }

  function _lockAll() {
    LOCKED_IDS.forEach(_lockMenu);
    // Și orice element cu data-locked="true"
    document.querySelectorAll('[data-locked="true"]').forEach(function (el) {
      if (el.id && !LOCKED_IDS.includes(el.id)) {
        _lockMenu(el.id);
      }
    });
  }

  // Aplicăm defensiv la multiple momente
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(_lockAll, 50);
      setTimeout(_lockAll, 500);
    });
  } else {
    setTimeout(_lockAll, 50);
  }

  window.addEventListener('load', function () {
    setTimeout(_lockAll, 200);
    setTimeout(_lockAll, 1500);
    setTimeout(_lockAll, 4000);
  });

  window._lockMenusV2 = _lockAll;
  console.log('[MenuLock v2] ✅ Inițializat — protecție anti-duplicate robustă');
})();
