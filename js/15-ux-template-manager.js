/* ============================================================================
 * UrbanX — MANAGER ȘABLOANE PLANȘE (js/15-ux-template-manager.js) — Sprint 2
 * Componenta 3 din motorul de planșe: șabloane configurabile per beneficiar
 * (format planșe, casetă, finisaje implicite, materiale, reguli active,
 * codificare planșe, opțiuni export). Persistat în localStorage + cloud via
 * _CloudSync (record dedicat). Non-destructiv. window.UX_TEMPLATES
 * ========================================================================== */
(function (G) {
  'use strict';
  var KEY = 'uxdoc-template-activ';
  var LIST_KEY = 'uxdoc-templates';

  // Schema unui șablon (valori implicite = DTAC România standard)
  var DEFAULT = {
    id: 'DTAC_RO_STANDARD',
    name: 'DTAC România — Standard',
    beneficiary: { name: '', logo: '', address: '', cui: '', contact: '' },
    sheets: { format: 'A3', orientation: 'LANDSCAPE', titleBlock: 'ISO7200_RO', scaleDefault: 100, scaleSituatie: 500, scaleIncadrare: 5000 },
    codification: {
      plan: 'A-{nn}-P{floor}', fatada: 'A-{nn}-F{orientation}', sectiune: 'A-{nn}-S{axis}',
      acoperis: 'A-{nn}-AC', situatie: 'A-{nn}-PS', incadrare: 'A-{nn}-PI', coordRetele: 'A-{nn}-CR'
    },
    finishes: {
      LIVING: { floor: 'Parchet stejar 22mm', wall: 'Tencuială gletuit vopsit', ceiling: 'Gips-carton vopsit' },
      DORMITOR: { floor: 'Parchet stejar 22mm', wall: 'Tencuială gletuit vopsit', ceiling: 'Tencuială gletuit vopsit' },
      BUCATARIE: { floor: 'Gresie porțelanată 60×60', wall: 'Faianță 30×60 H=2.20m', ceiling: 'Tencuială gletuit vopsit' },
      BAIE: { floor: 'Gresie antiderapantă', wall: 'Faianță 30×60 H=2.40m', ceiling: 'Tavan fals GK hidrofug' },
      HOL: { floor: 'Gresie porțelanată 60×60', wall: 'Tencuială gletuit vopsit', ceiling: 'Tencuială gletuit vopsit' },
      TERASA: { floor: 'Gresie exterior antiderapantă pe plot', wall: '-', ceiling: '-' },
      BALCON: { floor: 'Gresie exterior antiderapantă', wall: '-', ceiling: '-' }
    },
    materials: {
      wall_exterior: 'ZIDARIE_BCA', wall_interior: 'ZIDARIE_BCA', wall_partition: 'ZIDARIE_BCA',
      slab: 'BETON_ARMAT', foundation: 'BETON_ARMAT', roof: 'LEMN', insulation: 'TERMOIZOLATIE'
    },
    rules: { active: ['NP057-*', 'NP062-*', 'NP063-*', 'P118-*', 'PUG-*', 'CONS-*'], disabled: [], custom: [] },
    export: { formats: ['DXF', 'PDF'], dxfVersion: 'AC1024', pdfDPI: 300, bundleSheets: true, watermark: '' }
  };

  // Șabloane predefinite (seturi de planșe obligatorii)
  var BUILTIN = {
    DTAC_RO_STANDARD: {
      name: 'DTAC România — Standard', desc: 'Cerințe minime Ordinul 839/2009',
      sheets_required: ['PS', 'PI', 'P00', 'P01+', 'F_N', 'F_S', 'F_E', 'F_V', 'S_AA', 'S_BB', 'AC', 'CR']
    },
    PTH_RO_STANDARD: {
      name: 'PTh România — Standard', desc: 'HG 907/2016, conținut PTh detaliat',
      sheets_required: ['PS', 'PI', 'PF', 'P00', 'P01+', 'F_ALL', 'S_ALL', 'AC', 'CR', 'D_FUND', 'D_PLANSEU']
    },
    PAC_RO_STANDARD: {
      name: 'PAC — Autorizare Construire', desc: 'Subset DTAC, piese obligatorii AC',
      sheets_required: ['PS', 'P00', 'F_N', 'S_AA']
    }
  };

  function _deep(o) { return JSON.parse(JSON.stringify(o)); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function getActive() { var t = load(); if (!t) { t = _deep(DEFAULT); } return t; }
  function saveActive(t) { try { localStorage.setItem(KEY, JSON.stringify(t)); } catch (e) {} cloudSave(t); return t; }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} }

  // Finisaje pentru un tip de încăpere (din șablonul activ) — fallback generic
  function finishFor(roomType) {
    var t = getActive(); var key = (roomType || '').toUpperCase();
    // mapare tipuri model relevee → chei finisaje
    var map = { LIVING: 'LIVING', BEDROOM: 'DORMITOR', BEDROOM2: 'DORMITOR', BEDROOM3: 'DORMITOR', KITCHEN: 'BUCATARIE', BATH: 'BAIE', WC: 'BAIE', HALL: 'HOL', STORAGE: 'HOL', BALCON: 'BALCON', TERASA: 'TERASA' };
    var fk = map[key] || key;
    return (t.finishes && t.finishes[fk]) || { floor: '', wall: '', ceiling: '' };
  }

  // materialul de perete/planșeu din șablon (pentru hașuri UX_DRAW)
  function materialFor(elem) { var t = getActive(); return (t.materials && t.materials[elem]) || 'BETON_ARMAT'; }

  // codificare planșă: înlocuiește {nn},{floor},{orientation},{axis}
  function sheetCode(kind, vars) {
    var t = getActive(); var pat = (t.codification && t.codification[kind]) || 'A-{nn}';
    vars = vars || {};
    return pat.replace('{nn}', ('0' + (vars.nn || 1)).slice(-2)).replace('{floor}', vars.floor != null ? vars.floor : '00')
      .replace('{orientation}', vars.orientation || 'N').replace('{axis}', vars.axis || 'AA');
  }

  // ── CLOUD (reutilizează _CloudSync — nu se pierde la golirea browserului) ──
  function cloudConfigured() { try { return !!(G._CloudSync && G._CloudSync.saveToCloud && localStorage.getItem('wx_supabase_url') && localStorage.getItem('wx_supabase_url') !== 'YOUR_SUPABASE_URL'); } catch (e) { return false; } }
  function cloudSave(t) { if (!cloudConfigured()) return; try { G._CloudSync.saveToCloud({ id: 'uxdoc-template', name: 'DTAC — șablon activ', _uxtemplate: t, modified: new Date().toISOString() }); } catch (e) {} }

  G.UX_TEMPLATES = {
    SCHEMA: DEFAULT, BUILTIN: BUILTIN, getActive: getActive, saveActive: saveActive, reset: reset,
    finishFor: finishFor, materialFor: materialFor, sheetCode: sheetCode
  };
  try { console.log('[UX_TEMPLATES] manager șabloane încărcat · activ: ' + getActive().name + ' · ' + Object.keys(BUILTIN).length + ' șabloane predefinite'); } catch (e) {}
})(window);
