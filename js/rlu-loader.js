// ═══════════════════════════════════════════════════════════════════════════
// rlu-loader.js — Loader generic RLU pentru toate UAT-urile UrbanX
// Funcționează automat pentru orice UAT din _PUG_REGISTRY care are reguli.json
// Nu necesită rlu-xxx.js separat per UAT
// UrbanX TSS·FG | v1.0 | 2026-06-06
// ═══════════════════════════════════════════════════════════════════════════

(function () {

  // Cache: key → true dacă deja încărcat
  var _loaded = {};
  // Queue: key → [callbacks] dacă se încarcă
  var _loading = {};

  // ── Normalizare reguli.json format subzone → format REGULI intern ─────────
  function _convertSubzoneFormat(d, cityKey) {
    if (!d || typeof d !== 'object') return {};
    if (!d.subzone && !d.utrs) return d; // format vechi direct

    var subzone = d.subzone || {};
    var utrs = d.utrs || {};
    var result = {};

    // Dacă are utrs — mapăm fiecare UTR la datele din subzona dominantă
    if (Object.keys(utrs).length > 0) {
      Object.entries(utrs).forEach(function (kv) {
        var utrCod = kv[0];
        var utrData = kv[1];
        var fnDom = utrData.fn_dominanta || utrCod;
        var sub = subzone[fnDom] || subzone[utrCod] || {};

        // Adunăm funcțiunile admise din toate subzonele admise
        var subzoneAdmise = utrData.subzone_admise || [fnDom];
        var fnComplementare = subzoneAdmise
          .filter(function (s) { return s !== fnDom && subzone[s]; })
          .map(function (s) { return subzone[s].denumire || s; });

        var fnAdmise = sub.fn_admise_text || sub.utilizari_admise || sub.fn_complementare || [];
        var fnInterzise = (sub.fn_interzise_text || sub.utilizari_interzise || sub.fn_interzise || [])
          .concat(utrData.fn_interzise || []);

        function parseM(s) {
          if (s == null) return null;
          if (typeof s === 'number') return s;
          var m = String(s).match(/^([\d]+(?:[.,][\d]+)?)/);
          return m ? parseFloat(m[1].replace(',', '.')) : null;
        }

        result[utrCod] = {
          d: utrData.denumire || sub.denumire || utrCod,
          fn_dominanta: fnDom,
          culoare: sub.culoare || '#94a3b8',
          pot: sub.pot_baza != null ? sub.pot_baza : null,
          cut: sub.cut_baza != null ? sub.cut_baza : null,
          h: sub.hmax_m != null ? sub.hmax_m : null,
          niv: sub.niv_max || null,
          sv: sub.spatii_verzi_pct || null,
          pk: sub.parcaje_min || null,
          fm: sub.suprafata_min_mp || sub.parcela_min_mp || null,
          ao: sub.regim || null,
          rf: parseM(sub.retragere_fata || sub.retragere_strada || null),
          rl: parseM(sub.retragere_laterala || sub.retragere_lat || null),
          rr: parseM(sub.retragere_laterala || sub.retragere_lat || null),
          rs: parseM(sub.retragere_spate || sub.retragere_posterior || null),
          lung_min_aliniament_m: sub.lung_min_aliniament_m || sub.front_min_m || null,
          adancime_min_m: sub.adancime_min_m || null,
          aliniament_note: sub.aliniament_note || null,
          ua: fnAdmise.length ? fnAdmise.join('; ') : null,
          uc: fnComplementare.length ? fnComplementare.join('; ') : (sub.fn_conditionari ? (Array.isArray(sub.fn_conditionari) ? sub.fn_conditionari.join('; ') : sub.fn_conditionari) : null),
          ui: fnInterzise.length ? fnInterzise.join('; ') : null,
          subzone_admise: subzoneAdmise,
        };

        // Curăță null-urile
        Object.keys(result[utrCod]).forEach(function (k) {
          if (result[utrCod][k] == null) delete result[utrCod][k];
        });
      });
      return result;
    }

    // Dacă are doar subzone fără utrs — fiecare subzonă e direct un UTR
    Object.entries(subzone).forEach(function (kv) {
      var cod = kv[0];
      var sub = kv[1];

      function parseM(s) {
        if (s == null) return null;
        if (typeof s === 'number') return s;
        var m = String(s).match(/^([\d]+(?:[.,][\d]+)?)/);
        return m ? parseFloat(m[1].replace(',', '.')) : null;
      }

      var fnAdmise = sub.fn_admise_text || sub.utilizari_admise || sub.fn_complementare || [];
      var fnInterzise = sub.fn_interzise_text || sub.utilizari_interzise || sub.fn_interzise || [];

      result[cod] = {
        d: sub.denumire || cod,
        culoare: sub.culoare || '#94a3b8',
        pot: sub.pot_baza != null ? sub.pot_baza : null,
        cut: sub.cut_baza != null ? sub.cut_baza : null,
        h: sub.hmax_m != null ? sub.hmax_m : null,
        niv: sub.niv_max || null,
        sv: sub.spatii_verzi_pct || null,
        pk: sub.parcaje_min || null,
        fm: sub.suprafata_min_mp || sub.parcela_min_mp || null,
        ao: sub.regim || null,
        rf: parseM(sub.retragere_fata || sub.retragere_strada || null),
        rl: parseM(sub.retragere_laterala || sub.retragere_lat || null),
        rr: parseM(sub.retragere_laterala || sub.retragere_lat || null),
        rs: parseM(sub.retragere_spate || sub.retragere_posterior || null),
        lung_min_aliniament_m: sub.lung_min_aliniament_m || sub.front_min_m || null,
        adancime_min_m: sub.adancime_min_m || null,
        aliniament_note: sub.aliniament_note || null,
        ua: fnAdmise.length ? fnAdmise.join('; ') : null,
        ui: fnInterzise.length ? fnInterzise.join('; ') : null,
      };

      Object.keys(result[cod]).forEach(function (k) {
        if (result[cod][k] == null) delete result[cod][k];
      });
    });

    return result;
  }

  // ── Încarcă reguli.json pentru un UAT și apelează mergeIntoREGULI ─────────
  function loadReguliForUAT(cityKey, callback) {
    if (_loaded[cityKey]) {
      if (callback) callback();
      return;
    }
    if (_loading[cityKey]) {
      if (callback) _loading[cityKey].push(callback);
      return;
    }

    var reg = window._PUG_REGISTRY && window._PUG_REGISTRY[cityKey];
    if (!reg || !reg.reguli) {
      console.log('[RLU Loader] No reguli path for', cityKey);
      if (callback) callback();
      return;
    }

    // Skip dacă are deja rlu-xxx.js propriu (Botoșani, Iași etc.)
    // — le recunoaștem prin faptul că _PUG_REGULI[cityKey] există deja
    if (window._PUG_REGULI && window._PUG_REGULI[cityKey]) {
      _loaded[cityKey] = true;
      if (callback) callback();
      return;
    }

    _loading[cityKey] = callback ? [callback] : [];

    fetch(reg.reguli + '?v=' + (window._RLU_LOADER_VER || '20260606'))
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        if (typeof mergeIntoREGULI !== 'function') {
          console.warn('[RLU Loader] mergeIntoREGULI nedisponibil pentru', cityKey);
          return;
        }

        // Detectăm formatul și convertim
        var converted;
        if (data.subzone || data.utrs) {
          converted = _convertSubzoneFormat(data, cityKey);
          // Salvăm și formatul original
          window._PUG_REGULI = window._PUG_REGULI || {};
          window._PUG_REGULI[cityKey] = data;
        } else {
          converted = data;
        }

        var count = Object.keys(converted).length;
        if (count > 0) {
          mergeIntoREGULI(converted, cityKey);
          console.log('[RLU Loader] ✅', cityKey, '—', count, 'UTR-uri încărcate din', reg.reguli);
        } else {
          console.warn('[RLU Loader] ⚠ 0 UTR-uri pentru', cityKey);
        }

        _loaded[cityKey] = true;
        var cbs = _loading[cityKey] || [];
        delete _loading[cityKey];
        cbs.forEach(function (cb) { try { cb(); } catch (e) {} });
      })
      .catch(function (err) {
        console.warn('[RLU Loader] ❌ Eroare la', cityKey, reg.reguli, err.message);
        _loaded[cityKey] = true; // nu mai reîncearcă
        var cbs = _loading[cityKey] || [];
        delete _loading[cityKey];
        cbs.forEach(function (cb) { try { cb(); } catch (e) {} });
      });
  }

  // ── Ascultă schimbarea UAT-ului și încarcă automat ────────────────────────
  function onCityChanged(cityKey) {
    if (!cityKey) return;
    loadReguliForUAT(cityKey);
  }

  window.addEventListener('ux:city_changed', function (e) {
    var key = (e.detail && e.detail.key) || window.TCI?.cityKey || localStorage.getItem('ux_last_city');
    onCityChanged(key);
  });

  // ── Încarcă UAT-ul activ la startup ──────────────────────────────────────
  function loadActive() {
    if (typeof mergeIntoREGULI !== 'function' || !window._PUG_REGISTRY) {
      setTimeout(loadActive, 400);
      return;
    }
    var key = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    onCityChanged(key);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(loadActive, 600); });
  } else {
    setTimeout(loadActive, 600);
  }

  // ── Expune API public ─────────────────────────────────────────────────────
  window._RLU_LOADER = {
    load: loadReguliForUAT,
    loaded: _loaded,
    convert: _convertSubzoneFormat,
    version: '1.0.0',
  };

  console.log('[RLU Loader] v1.0 — loader generic inițializat');

})();
