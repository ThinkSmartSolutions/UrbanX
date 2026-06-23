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

  // ─── 003: BEFORE/AFTER SLIDER + DOCUMENT EXPORT (modele urbane) ───
  function renderBeforeAfterSlider(containerId, value, disabled) {
    var el = D.getElementById(containerId);
    if (!el) { console.error('003: #' + containerId + ' nu există'); return; }
    el.innerHTML = '<div class="ba-slider-wrap"><div class="ba-slider-labels"><span>← Situație actuală</span><span>Cu intervenție →</span></div>' +
      '<div class="ba-slider-row"><span class="ba-label ' + (value === 0 ? 'active' : '') + '" style="color:#888780">ÎNAINTE</span>' +
      '<input type="range" min="0" max="100" value="' + value + '" ' + (disabled ? 'disabled' : '') +
      ' oninput="UrbanModelsStore.setTransition(parseInt(this.value)); _updateSliderHint(\'' + containerId + '\',parseInt(this.value))">' +
      '<span class="ba-label ' + (value === 100 ? 'active' : '') + '" style="color:#639922">DUPĂ</span></div>' +
      '<div class="ba-slider-hint" id="' + containerId + '-hint">' + (value === 0 ? 'Starea actuală' : value === 100 ? 'Cu intervenția aplicată' : 'Tranziție ' + value + '%') + '</div></div>';
  }
  function _updateSliderHint(containerId, v) { var h = D.getElementById(containerId + '-hint'); if (h) h.textContent = v === 0 ? 'Starea actuală' : v === 100 ? 'Cu intervenția aplicată' : 'Tranziție ' + v + '%'; }
  function renderDocumentExport(containerId, documentContent) {
    var el = D.getElementById(containerId);
    if (!el) { console.error('003: #' + containerId + ' nu există'); return; }
    el._docContent = documentContent;
    el.innerHTML = '<div class="doc-export"><div class="doc-export-tabs">' +
      '<button class="doc-tab active" onclick="switchDocTab(this,\'sidu\',\'' + containerId + '\')">SIDU — portofoliu</button>' +
      '<button class="doc-tab" onclick="switchDocTab(this,\'masterplan\',\'' + containerId + '\')">Masterplan</button>' +
      '<button class="doc-tab" onclick="switchDocTab(this,\'pmud\',\'' + containerId + '\')">PMUD</button></div>' +
      '<div class="doc-export-content" id="' + containerId + '-text">' + _getDocText('sidu', documentContent) + '</div>' +
      '<div class="doc-export-footer"><button class="uxc-btn uxc-btn--sec" onclick="_copyDocText(\'' + containerId + '\')">Copiază text</button>' +
      '<span style="font-size:11px;opacity:0.45">Inserează direct în documentul strategic</span></div></div>';
  }
  function switchDocTab(btn, tab, containerId) {
    var el = D.getElementById(containerId); if (!el) return;
    var tabs = el.querySelectorAll('.doc-tab'); for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
    btn.classList.add('active');
    var t = D.getElementById(containerId + '-text'); if (t) t.innerHTML = _getDocText(tab, el._docContent);
  }
  function _getDocText(tab, dc) {
    if (!dc) return ''; var nl = function (s) { return s ? String(s).replace(/\n/g, '<br>') : ''; };
    if (tab === 'sidu') { var s = dc.siduSection; return nl('<strong>' + s.projectTitle + '</strong>\n\n' + s.description + '\n\n<strong>Justificare:</strong> ' + s.justification + '\n<strong>Cost:</strong> ' + s.costEstimate + '\n<strong>Termen:</strong> ' + s.timeline + '\n<strong>Baza legală:</strong> ' + s.legalBasis + '\n\n<strong>Indicatori:</strong>\n' + s.indicators.map(function (i) { return '• ' + i; }).join('\n')); }
    if (tab === 'masterplan') { var m = dc.masterplanSection; return nl('<strong>Tip intervenție:</strong> ' + m.interventionType + '\n<strong>Suprafață:</strong> ' + m.affectedArea + '\n\n<strong>Fazare:</strong>\n' + m.phasing.map(function (p) { return '• ' + p; }).join('\n') + '\n\n<strong>Principii:</strong>\n' + m.designPrinciples.map(function (p) { return '• ' + p; }).join('\n')); }
    var p = dc.pmudSection; return nl('<strong>Tip măsură:</strong> ' + p.measureType + '\n<strong>Impact trafic:</strong> ' + p.trafficImpact + '\n<strong>Transfer modal:</strong> ' + p.modalShift + '\n\n<strong>Infrastructură necesară:</strong>\n' + p.infrastructureNeeded.map(function (i) { return '• ' + i; }).join('\n'));
  }
  function _copyDocText(containerId) {
    var el = D.getElementById(containerId + '-text'); if (!el) return;
    try { navigator.clipboard.writeText(el.innerText).then(function () { var btn = D.querySelector('#' + containerId + ' .uxc-btn'); if (btn) { btn.textContent = '✓ Copiat'; setTimeout(function () { btn.textContent = 'Copiază text'; }, 2000); } }); } catch (e) {}
  }
  var st003 = D.createElement('style');
  st003.textContent = [
    '.ba-slider-wrap{font-size:12px}.ba-slider-labels{display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-bottom:6px}',
    '.ba-slider-row{display:flex;align-items:center;gap:10px}.ba-slider-row input[type=range]{flex:1}',
    '.ba-label{font-size:10px;font-weight:700;letter-spacing:.05em;opacity:.55}.ba-label.active{opacity:1}',
    '.ba-slider-hint{text-align:center;font-size:11px;color:#cbd5e1;margin-top:6px}',
    '.doc-export-tabs{display:flex;gap:4px;margin-bottom:8px}.doc-tab{flex:1;padding:6px 8px;border:0;border-radius:6px;background:rgba(255,255,255,.06);color:#cbd5e1;cursor:pointer;font-size:12px}',
    '.doc-tab.active{background:rgba(46,117,182,.25);color:#93c5fd;font-weight:700}',
    '.doc-export-content{background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:12px;font-size:12px;line-height:1.55;color:#cbd5e1;max-height:300px;overflow:auto;white-space:normal}',
    '.doc-export-footer{display:flex;align-items:center;gap:10px;margin-top:8px}',
    '.model-sel-btn{padding:7px 11px;border:1px solid rgba(255,255,255,.14);border-radius:8px;background:rgba(255,255,255,.05);color:#cbd5e1;cursor:pointer;font-size:12px;white-space:nowrap}.model-sel-btn.active{font-weight:700}'
  ].join('');
  D.head.appendChild(st003);

  // expune global (002 le folosește inline + 003 le presupune)
  G.actionBar = actionBar; G.moduleHeader = moduleHeader; G.viewTabs = viewTabs;
  G.confirmAction = confirmAction; G.uxcCloseConfirm = uxcCloseConfirm;
  G.uxcToggleDropdown = uxcToggleDropdown; G.uxcCloseDropdowns = uxcCloseDropdowns;
  G.renderBeforeAfterSlider = renderBeforeAfterSlider; G._updateSliderHint = _updateSliderHint;
  G.renderDocumentExport = renderDocumentExport; G.switchDocTab = switchDocTab; G._copyDocText = _copyDocText;
  console.log('[UX-components] actionBar/moduleHeader/viewTabs/confirmAction + 003 slider/docExport încărcate');
})(window);
