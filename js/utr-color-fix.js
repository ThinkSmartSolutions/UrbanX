/**
 * UrbanX — UTR Color Fix v20260522
 * 
 * Rezolvă 3 probleme:
 *  1. Paleta _C din IIFE are 10 culori diferite față de GeoJSON-ul Sucevei (curated)
 *  2. MutationObserver (PATCH 2) nu declanșează re-colorarea pt că verifică
 *     borderColor greșit ('rgb(100,116,139)' vs DEFAULT '#CBD5E1')
 *  3. _loadPUGOnMap suprascrie câmpul 'c' din GeoJSON cu culori recalculate
 *     din paleta _C — dar GeoJSON-ul are deja culorile corecte stocate
 *
 * SOLUȚIE PRINCIPALĂ: Facem _loadPUGOnMap să PRESERVEZE câmpul 'c' existent
 * din GeoJSON dacă acesta există și nu e gri/default. Recalculăm doar dacă lipsește.
 * Totodată corectăm paleta _C și _UTR_COLORS.
 */
(function () {
  'use strict';

  // ── 1. Paleta corectă — aliniată cu GeoJSON-ul Sucevei (curated TSS·FG) ──
  // 10 coduri aveau shade diferit față de ce e stocat în pug.geojson
  const _C_CORRECTIONS = {
    'V1':  '#16A34A',  // era '#86EFAC'  — verde mai închis, corect per PUG SV
    'V2C': '#22C55E',  // lipsea complet
    'V3':  '#4ADE80',  // era '#16A34A'
    'M2':  '#F87171',  // era '#EF4444'
    'M3':  '#FDA4AF',  // era '#DC2626'
    'M4':  '#FB7185',  // era '#B91C1C'
    'G1':  '#60A5FA',  // era '#93C5FD'
    'G2':  '#3B82F6',  // era '#60A5FA'
    'C2A': '#FDBA74',  // era '#F97316'
    'C2B': '#FCA5A5',  // era '#FB923C'
  };

  // ── 2. Patch _utrColor global ──────────────────────────────────────────────
  // Suprascrierea se face pe window._utrColor (expus în IIFE la linia 4811)
  // Nu putem atinge _C din IIFE (e în scope privat), deci wrappăm global
  const _wait = function (tries) {
    if (++tries > 40) return;
    if (typeof window._utrColor !== 'function') {
      return setTimeout(function () { _wait(tries); }, 200);
    }

    const _origUtrColor = window._utrColor;
    window._utrColor = function (code) {
      if (!code) return '#CBD5E1';
      const c = String(code).trim().toUpperCase().replace(/\s+/g, '');
      if (_C_CORRECTIONS[c]) return _C_CORRECTIONS[c];
      return _origUtrColor(code);
    };
    console.log('[UTR-Color-Fix] ✅ _utrColor patched cu 10 corecții');
  };
  _wait(0);

  // ── 3. Patch _loadPUGOnMap — preservă 'c' din GeoJSON dacă există ─────────
  // Problema: _loadPUGOnMap face { ...p, c: _utrColor(utr) } suprascriind
  // culorile curate din GeoJSON. Wrappăm global după load.
  const _patchLoadPUG = function (tries) {
    if (++tries > 40) return;
    if (typeof window._loadPUGOnMap !== 'function') {
      return setTimeout(function () { _patchLoadPUG(tries); }, 200);
    }
    if (window._loadPUGOnMap._colorFixed) return;
    window._loadPUGOnMap._colorFixed = true;

    const _orig = window._loadPUGOnMap;
    window._loadPUGOnMap = async function (geojsonUrl, cityName, fitCoords) {
      const result = await _orig.call(this, geojsonUrl, cityName, fitCoords);
      // Dacă e ok, re-procesăm datele din sursă pentru a restaura 'c' corect
      if (result && result.features) {
        const DEFAULT = '#CBD5E1';
        result.features.forEach(function (f) {
          const p = f.properties;
          if (!p) return;
          // Dacă GeoJSON original a trimis 'c' valid (non-default), re-aplicăm
          // culorile din _C_CORRECTIONS unde e nevoie
          const utr = p.utr || p.UTR || '';
          const corrected = window._utrColor ? window._utrColor(utr) : null;
          if (corrected && corrected !== DEFAULT) {
            p.c = corrected;
          }
        });
        // Re-setăm sursa Mapbox cu datele corectate
        try {
          const mapSrc = window.map && window.map.getSource('utr-src');
          if (mapSrc) mapSrc.setData(result);
        } catch (_) {}
      }
      return result;
    };
    console.log('[UTR-Color-Fix] ✅ _loadPUGOnMap patched — preservă culorile GeoJSON');
  };
  _patchLoadPUG(0);

  // ── 4. Fix MutationObserver — verificare culoare default corectă ──────────
  // PATCH 2 din index.html verifică rgb(100,116,139) dar DEFAULT e rgb(203,213,225)
  // Suprascriem _chipObs cu o versiune corectă
  const _fixChipObserver = function (tries) {
    if (++tries > 40) return;
    const el = document.getElementById('utr-chips');
    if (!el) return setTimeout(function () { _fixChipObserver(tries); }, 300);

    const DEFAULT_COLORS = ['rgb(203, 213, 225)', 'rgb(100, 116, 139)', 'transparent', ''];

    const obs = new MutationObserver(function () {
      const chips = el.querySelectorAll('.utr-chip');
      chips.forEach(function (chip) {
        const utrCode = (chip.dataset.utr || chip.textContent.trim().split(/\s/)[0] || '')
          .replace(/\s.*/, '').toUpperCase();
        if (!utrCode) return;
        const border = chip.style.borderColor;
        const isDefault = !border || DEFAULT_COLORS.some(function (d) { return border === d; });
        if (!isDefault) return; // deja colorat
        const col = window._utrColor ? window._utrColor(utrCode) : null;
        if (col && col !== '#CBD5E1') {
          chip.style.borderColor = col;
          chip.style.backgroundColor = col + '22';
          chip.style.color = col;
        }
      });
    });
    obs.observe(el, { childList: true, subtree: true });
    console.log('[UTR-Color-Fix] ✅ MutationObserver re-colorare chips — fix activ');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { _fixChipObserver(0); });
  } else {
    _fixChipObserver(0);
  }

  // ── 5. Fix _UTR_COLORS (complex object) — sincronizăm borderele ──────────
  const _syncComplexPalette = function (tries) {
    if (++tries > 20) return;
    if (!window._UTR_COLORS) return setTimeout(function () { _syncComplexPalette(tries); }, 300);
    Object.entries(_C_CORRECTIONS).forEach(function (entry) {
      const code = entry[0];
      const hex = entry[1];
      const hexToRgba = function (h, a) {
        const n = parseInt(h.slice(1), 16);
        return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
      };
      window._UTR_COLORS[code] = { fill: hexToRgba(hex, 0.22), border: hex };
    });
    console.log('[UTR-Color-Fix] ✅ window._UTR_COLORS sincronizat cu 10 corecții');
  };
  _syncComplexPalette(0);

  console.log('[UTR-Color-Fix] v20260522 încărcat');
})();
