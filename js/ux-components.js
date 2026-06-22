/* ============================================================================
 * UrbanX — 002: Componente UI partajate (vanilla, ARCHITECTURE.md).
 * Funcții globale reutilizabile pt module: actionBar, moduleHeader, viewTabs,
 * confirmAction + dropdown helpers. Convenții UrbanX: innerHTML template literals,
 * onclick inline, emoji (fără librărie iconițe), CSS injectat via <style>.
 * Dependență pentru 003 (Barcelona) și orice modul care vrea bară de acțiuni 1-rând.
 * Produce: window.actionBar(), moduleHeader(), viewTabs(), confirmAction()
 * ========================================================================== */
(function (G) {
  'use strict';
  var D = document;
  var esc = function (s) { return String(s == null ? '' : s).replace(/'/g, "\\'"); };

  // ─── ACTION BAR (1 rând: primar | acțiuni max 5 | spacer | Export ▾ | ⋯) ───
  function actionBar(o) {
    o = o || {}; var primary = o.primary, actions = o.actions || [], exportItems = o.exportItems || [], moreItems = o.moreItems || [];
    var primaryBtn = primary ? '<button class="uxc-btn uxc-btn--primary" onclick="' + primary.onclick + '">' + primary.label + '</button><div class="uxc-sep"></div>' : '';
    var actionBtns = actions.slice(0, 5).map(function (a) {
      var oc = a.confirm ? "confirmAction('" + esc(a.confirm.title) + "','" + esc(a.confirm.desc) + "','" + esc(a.onclick) + "')" : a.onclick;
      return '<button class="uxc-btn uxc-btn--sec" onclick="' + oc + '">' + a.label + '</button>';
    }).join('');
    var exportDd = exportItems.length ? '<div class="uxc-dd"><button class="uxc-btn uxc-btn--sec" onclick="uxcToggleDropdown(this)">Export ▾</button><div class="uxc-ddmenu" style="display:none;right:0">' + _groupExports(exportItems) + '</div></div>' : '';
    var moreDd = moreItems.length ? '<div class="uxc-dd"><button class="uxc-btn uxc-btn--sec" onclick="uxcToggleDropdown(this)">⋯</button><div class="uxc-ddmenu" style="display:none;right:0">' + moreItems.map(function (i) { return '<button class="uxc-ddi" onclick="' + i.onclick + '">' + i.label + '</button>'; }).join('') + '</div></div>' : '';
    return '<div class="uxc-bar">' + primaryBtn + '<div class="uxc-grp">' + actionBtns + '</div><div class="uxc-spacer"></div>' + exportDd + moreDd + '</div>';
  }
  function _groupExports(items) {
    function cat(label, fmts) { var f = items.filter(function (i) { return fmts.indexOf(i.format || '') >= 0; }); return f.length ? '<div class="uxc-ddlabel">' + label + '</div>' + f.map(function (i) { return '<button class="uxc-ddi" onclick="' + i.onclick + '">' + i.label + '</button>'; }).join('') : ''; }
    var other = items.filter(function (i) { return ['PNG', 'SVG', 'JPG', 'PDF', 'A3', 'DOCX', 'DXF', 'CSV', 'JSON'].indexOf(i.format || '') < 0; });
    return cat('Imagini', ['PNG', 'SVG', 'JPG']) + cat('Documente', ['PDF', 'A3', 'DOCX']) + cat('Date', ['DXF', 'CSV', 'JSON']) + (other.length ? other.map(function (i) { return '<button class="uxc-ddi" onclick="' + i.onclick + '">' + i.label + '</button>'; }).join('') : '');
  }

  // ─── MODULE HEADER (titlu + context badge + ? help + ✕) ───
  function moduleHeader(o) {
    o = o || {};
    return '<div class="uxc-head">' + (o.onBack ? '<button class="uxc-ico" onclick="' + o.onBack + '" title="Înapoi">←</button>' : '') +
      '<h2 class="uxc-title">' + (o.title || '') + '</h2>' + (o.context ? '<span class="uxc-ctx">' + o.context + '</span>' : '') +
      '<div class="uxc-spacer"></div>' + (o.infoKey ? '<button class="uxc-ico" onclick="infoDrawerOpen(\'' + esc(o.infoKey) + '\')" title="Info">ⓘ</button>' : '') +
      (o.onClose ? '<button class="uxc-ico" onclick="' + o.onClose + '" title="Închide">✕</button>' : '') + '</div>';
  }

  // ─── VIEW TABS (navigare = ce văd, nu acțiuni) ───
  function viewTabs(o) {
    o = o || {}; var tabs = o.tabs || [], activeTab = o.activeTab, onChangeFn = o.onChangeFn, maxVisible = o.maxVisible || 5;
    var visible = tabs.slice(0, maxVisible), hidden = tabs.slice(maxVisible);
    var tabHtml = visible.map(function (t) {
      var isActive = activeTab === t.id;
      return '<button class="uxc-tab' + (isActive ? ' active' : '') + '" onclick="' + onChangeFn + "('" + esc(t.id) + "')\">" + t.label + '</button>';
    }).join('');
    var overflow = hidden.length ? '<div class="uxc-dd"><button class="uxc-tab" onclick="uxcToggleDropdown(this)">≫</button><div class="uxc-ddmenu" style="display:none;right:0">' + hidden.map(function (t) { return '<button class="uxc-ddi' + (activeTab === t.id ? ' active' : '') + '" onclick="' + onChangeFn + "('" + esc(t.id) + "'); uxcCloseDropdowns()\">" + t.label + '</button>'; }).join('') + '</div></div>' : '';
    return '<div class="uxc-tabs">' + tabHtml + overflow + '</div>';
  }

  // ─── CONFIRM MODAL (acțiuni destructive/ireversibile) ───
  function confirmAction(title, desc, callbackFnName) {
    var old = D.getElementById('uxc-confirm'); if (old) old.remove();
    D.body.insertAdjacentHTML('beforeend',
      '<div id="uxc-confirm" class="uxc-modal-ov" onclick="if(event.target===this)uxcCloseConfirm()">' +
      '<div class="uxc-modal"><h3 class="uxc-mtitle">' + title + '</h3><p class="uxc-mdesc">' + desc + '</p>' +
      '<div class="uxc-macts"><button class="uxc-btn uxc-btn--sec" onclick="uxcCloseConfirm()">Anulează</button>' +
      '<button class="uxc-btn uxc-btn--primary" onclick="uxcCloseConfirm(); (' + (callbackFnName || '') + ')()">Continuă</button></div></div></div>');
  }
  function uxcCloseConfirm() { var m = D.getElementById('uxc-confirm'); if (m) m.remove(); }

  // ─── DROPDOWN helpers ───
  function uxcToggleDropdown(btn) { var menu = btn.nextElementSibling; if (!menu || !menu.classList.contains('uxc-ddmenu')) return; var wasOpen = menu.style.display === 'block'; uxcCloseDropdowns(); if (!wasOpen) menu.style.display = 'block'; }
  function uxcCloseDropdowns() { var ms = D.querySelectorAll('.uxc-ddmenu'); for (var i = 0; i < ms.length; i++) ms[i].style.display = 'none'; }
  D.addEventListener('click', function (e) { if (!e.target.closest || (!e.target.closest('.uxc-dd'))) uxcCloseDropdowns(); });

  // ─── CSS (injectat — convenție UrbanX, fără .css separate) ───
  var st = D.createElement('style');
  st.textContent = [
    '.uxc-bar{display:flex;align-items:center;gap:4px;padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.08);flex-wrap:wrap}',
    '.uxc-grp{display:flex;gap:4px;flex-wrap:wrap}.uxc-spacer{flex:1}.uxc-sep{width:1px;height:22px;background:rgba(255,255,255,.15);margin:0 6px}',
    '.uxc-btn{height:32px;padding:0 12px;border-radius:7px;border:0;cursor:pointer;font-size:13px;white-space:nowrap;color:#e6edf7;font-family:inherit}',
    '.uxc-btn--primary{background:linear-gradient(180deg,#d4af37,#b8941f);color:#06101f;font-weight:700}',
    '.uxc-btn--sec{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12)}.uxc-btn--sec:hover{background:rgba(255,255,255,.13)}',
    '.uxc-head{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.08)}',
    '.uxc-title{font-size:15px;font-weight:700;margin:0;color:#e6edf7}.uxc-ctx{font-size:12px;color:#94a3b8;background:rgba(255,255,255,.07);padding:2px 8px;border-radius:5px}',
    '.uxc-ico{background:transparent;border:1px solid rgba(255,255,255,.1);cursor:pointer;width:30px;height:30px;border-radius:6px;color:#94a3b8;font-size:14px}.uxc-ico:hover{color:#e6edf7;background:rgba(255,255,255,.08)}',
    '.uxc-tabs{display:flex;align-items:center;border-bottom:1px solid rgba(255,255,255,.08);padding:0 12px;overflow-x:auto}',
    '.uxc-tab{height:38px;padding:0 13px;background:transparent;border:0;border-bottom:2px solid transparent;cursor:pointer;color:#cbd5e1;font-size:13px;white-space:nowrap}',
    '.uxc-tab.active{border-bottom-color:#d4af37;font-weight:700;color:#e6edf7}.uxc-tab:hover{background:rgba(255,255,255,.04)}',
    '.uxc-dd{position:relative}.uxc-ddmenu{position:absolute;top:100%;margin-top:4px;min-width:180px;background:#111a2c;border:1px solid rgba(255,255,255,.12);border-radius:8px;z-index:9800;padding:4px 0;box-shadow:0 8px 24px rgba(0,0,0,.5)}',
    '.uxc-ddi{display:block;width:100%;padding:7px 14px;text-align:left;background:transparent;border:0;cursor:pointer;color:#cbd5e1;font-size:13px}.uxc-ddi:hover{background:rgba(255,255,255,.07)}.uxc-ddi.active{font-weight:700;color:#e6edf7}',
    '.uxc-ddlabel{padding:6px 14px 2px;font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.08em}',
    '.uxc-modal-ov{position:fixed;inset:0;background:rgba(2,6,16,.7);display:flex;align-items:center;justify-content:center;z-index:9900}',
    '.uxc-modal{max-width:420px;width:90%;padding:22px;border-radius:12px;background:#0b1424;border:1px solid rgba(212,175,55,.4);font-family:system-ui,sans-serif}',
    '.uxc-mtitle{font-size:16px;font-weight:700;margin:0 0 8px;color:#e6edf7}.uxc-mdesc{font-size:13.5px;color:#94a3b8;margin:0 0 20px;line-height:1.5}',
    '.uxc-macts{display:flex;gap:8px;justify-content:flex-end}'
  ].join('');
  D.head.appendChild(st);

  // expune global (002 le folosește inline + 003 le presupune)
  G.actionBar = actionBar; G.moduleHeader = moduleHeader; G.viewTabs = viewTabs;
  G.confirmAction = confirmAction; G.uxcCloseConfirm = uxcCloseConfirm;
  G.uxcToggleDropdown = uxcToggleDropdown; G.uxcCloseDropdowns = uxcCloseDropdowns;
  console.log('[UX-components] actionBar/moduleHeader/viewTabs/confirmAction încărcate');
})(window);
