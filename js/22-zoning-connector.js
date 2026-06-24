// ═══════════════════════════════════════════════════════════════════════════
// 22-zoning-connector.js — Conector Regulament Urbanistic
// UrbanX TSS·FG | v1.0 | 19 mai 2026
//
// Conectează regulile din Supabase (urban_rules) la UI-ul platformei.
// Când se selectează o parcelă, afișează automat:
//   - POT/CUT/RH din regulamentul oficial
//   - Tipul documentului sursă (PUG/PUZ/HCL)
//   - Data ultimei actualizări
//   - Conflict warnings dacă există reguli contradictorii
//
// INTEGRARE:
//   - Adaugă tab "Regulament" în panoul drept (#panel-tabs)
//   - Se activează automat la selectarea unei parcele
//   - Citește din Supabase REST API (anon key, RLS public read)
//
// DEPENDENȚE: index.html trebuie să aibă _SUPABASE_URL și _SUPABASE_ANON_KEY
// definite în 00-globals.js sau inline înainte de acest fișier.
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  // ── Config ────────────────────────────────────────────────────────────────
  // Citim din globals dacă există, altfel placeholder
  const SB_URL  = (typeof _SUPABASE_URL  !== 'undefined' && _SUPABASE_URL)
    ? _SUPABASE_URL
    : '';
  const SB_KEY  = (typeof _SUPABASE_ANON_KEY !== 'undefined' && _SUPABASE_ANON_KEY)
    ? _SUPABASE_ANON_KEY
    : '';

  const ENABLED = SB_URL.length > 10;

  // ── State ─────────────────────────────────────────────────────────────────
  let _currentUat  = null;
  let _currentUtr  = null;
  let _cache       = {};  // { "UAT:UTR" → {rules, fetched_at} }
  const CACHE_TTL  = 5 * 60 * 1000; // 5 minute

  // ── Injecție tab în panel ─────────────────────────────────────────────────
  function _injectTab(){
    if(document.getElementById('ptab-regulament')) return;

    const tabs = document.getElementById('panel-tabs');
    if(!tabs) return;

    const tab = document.createElement('button');
    tab.className    = 'ptab';
    tab.id           = 'ptab-regulament';
    tab.dataset.t    = 'regulament';
    tab.textContent  = '📋 Regulament';
    tab.onclick      = ()=>_activateTab();
    tab.style.display = 'none'; // cap.20 flow: read-only stub Supabase (fara editor PUD/PUG, infra nedesfasurata) — ascuns
    tabs.appendChild(tab);

    // Tab content container
    const body = document.getElementById('panel-body');
    if(!body) return;

    const tc = document.createElement('div');
    tc.className = 'tc';
    tc.id        = 'tc-regulament';
    tc.innerHTML = _renderEmpty();
    body.appendChild(tc);

    console.log('[ZoningConnector] tab Regulament injectat');
  }

  function _activateTab(){
    // Dezactivează toate tab-urile
    document.querySelectorAll('#panel-tabs .ptab').forEach(t=>{
      t.classList.remove('active');
    });
    document.querySelectorAll('#panel-body .tc').forEach(c=>{
      c.classList.remove('active');
    });
    // Activează Regulament
    const tab = document.getElementById('ptab-regulament');
    const tc  = document.getElementById('tc-regulament');
    if(tab) tab.classList.add('active');
    if(tc)  tc.classList.add('active');

    // Dacă avem UAT+UTR, încarcă datele
    if(_currentUat && _currentUtr){
      _loadRules(_currentUat, _currentUtr);
    }
  }

  // ── Fetch reguli din Supabase ─────────────────────────────────────────────
  async function _fetchRules(uatCode, utrCode){
    if(!ENABLED) return null;

    const cacheKey = `${uatCode}:${utrCode}`;
    const cached   = _cache[cacheKey];
    if(cached && (Date.now() - cached.fetched_at < CACHE_TTL)){
      return cached.data;
    }

    try {
      const url = `${SB_URL}/rest/v1/urbanx_rules`
        + `?uat_code=eq.${encodeURIComponent(uatCode)}`
        + `&utr_code=eq.${encodeURIComponent(utrCode)}`
        + `&status=eq.ACTIVE`
        + `&order=priority.desc,confidence.desc`;

      const r = await fetch(url, {
        headers: {
          'apikey':        SB_KEY,
          'Authorization': `Bearer ${SB_KEY}`,
          'Content-Type':  'application/json',
        },
      });

      if(!r.ok){
        console.warn('[ZoningConnector] Supabase error:', r.status);
        return null;
      }

      const data = await r.json();
      _cache[cacheKey] = { data, fetched_at: Date.now() };
      return data;

    } catch(e){
      console.warn('[ZoningConnector] fetch failed:', e.message);
      return null;
    }
  }

  // ── Load și render ────────────────────────────────────────────────────────
  async function _loadRules(uatCode, utrCode){
    const tc = document.getElementById('tc-regulament');
    if(!tc) return;

    tc.innerHTML = _renderLoading(utrCode);

    if(!ENABLED){
      tc.innerHTML = _renderNoConfig();
      return;
    }

    const rules = await _fetchRules(uatCode, utrCode);

    if(!rules || rules.length === 0){
      tc.innerHTML = _renderNoData(uatCode, utrCode);
      return;
    }

    tc.innerHTML = _renderRules(uatCode, utrCode, rules);
  }

  // ── Renderers HTML ────────────────────────────────────────────────────────

  function _renderEmpty(){
    return `
      <div style="padding:16px;text-align:center;color:#475569">
        <div style="font-size:32px;margin-bottom:10px">📋</div>
        <div style="font-size:13px;font-weight:600;color:#64748b;margin-bottom:6px">Regulament Urbanistic</div>
        <div style="font-size:11px;color:#374151;line-height:1.6">
          Selectați o parcelă pe hartă pentru a vedea<br>
          regulile urbanistice din baza de date.
        </div>
      </div>`;
  }

  function _renderLoading(utrCode){
    return `
      <div style="padding:16px;text-align:center;color:#64748b">
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;font-size:12px">
          <span class="spin"></span>
          Încărcare regulament UTR <b style="color:#d4af37">${utrCode}</b>…
        </div>
      </div>`;
  }

  function _renderNoConfig(){
    return `
      <div style="padding:12px">
        <div class="warn-box">
          ⚠️ Supabase neconfigurat.<br>
          <span style="font-size:11px;opacity:.8">
            Adaugă <code>_SUPABASE_URL</code> și <code>_SUPABASE_ANON_KEY</code>
            în <code>js/00-globals.js</code> după ce rulezi schema SQL.
          </span>
        </div>
        <div style="font-size:11px;color:#475569;margin-top:8px;line-height:1.6">
          Pași necesari:<br>
          1. Rulează <code>urbanx_schema.sql</code> în Supabase SQL Editor<br>
          2. Rulează pipeline-ul Python pentru a popula regulile<br>
          3. Adaugă credențialele în <code>00-globals.js</code>
        </div>
      </div>`;
  }

  function _renderNoData(uatCode, utrCode){
    return `
      <div style="padding:12px">
        <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;
             letter-spacing:.07em;margin-bottom:8px">UTR ${utrCode}</div>
        <div class="warn-box" style="margin:0">
          📭 Nicio regulă în baza de date pentru acest UTR.<br>
          <span style="font-size:10px;opacity:.8">UAT: ${uatCode}</span>
        </div>
        <div style="font-size:11px;color:#475569;margin-top:10px;line-height:1.6">
          Rulează pipeline-ul pentru a vectoriza<br>
          documentele urbanistice ale acestui UAT.
        </div>
        <button onclick="window._rvZoningRefresh&&_rvZoningRefresh()"
          style="margin-top:10px;width:100%;padding:8px;border-radius:8px;
          background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.3);
          color:#60a5fa;font-size:11px;cursor:pointer;font-family:inherit">
          🔄 Reîncearcă
        </button>
      </div>`;
  }

  function _renderRules(uatCode, utrCode, rules){
    // Grupăm regulile pe tip
    const byType = {};
    rules.forEach(r=>{
      if(!byType[r.rule_type]) byType[r.rule_type] = [];
      byType[r.rule_type].push(r);
    });

    // Detectăm conflicte (același tip, valori diferite)
    const conflicts = [];
    Object.entries(byType).forEach(([type, rls])=>{
      if(rls.length > 1){
        const vals = rls.map(r=>r.value_num ?? r.value_str);
        const unique = new Set(vals.map(v=>String(v)));
        if(unique.size > 1) conflicts.push(type);
      }
    });

    // Indicatorii principali
    const pot = _getBestRule(byType['POT_MAX']);
    const cut = _getBestRule(byType['CUT_MAX']);
    const rh  = _getBestRule(byType['RH_MAX']);
    const hm  = _getBestRule(byType['H_MAX_M']);

    // Sursa documentului (cel mai prioritar)
    const topRule = rules[0];
    const docType = topRule?.doc_type || '—';
    const conf    = topRule ? Math.round((topRule.confidence||0)*100) : 0;

    const confColor = conf >= 80 ? '#34d399' : conf >= 60 ? '#fbbf24' : '#f87171';
    const confLabel = conf >= 80 ? 'Ridicat' : conf >= 60 ? 'Mediu' : 'Scăzut';

    // Badge sursă
    const docBadge = {
      PUG:'b-b', PUZ:'b-g', HCL:'b-y', RLU:'b-b', PUD:'b-g', UNKNOWN:'b-r'
    }[docType] || 'b-r';

    let html = `
      <div style="padding:10px 12px 4px">

        <!-- Header UTR -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div>
            <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;
                 letter-spacing:.07em">Regulament Urban</div>
            <div style="font-size:16px;font-weight:800;color:#d4af37;margin-top:2px">UTR ${utrCode}</div>
            <div style="font-size:10px;color:#475569;margin-top:1px">${uatCode}</div>
          </div>
          <div style="text-align:right">
            <span class="badge ${docBadge}" style="font-size:11px">${docType}</span>
            <div style="font-size:10px;margin-top:4px">
              Conf: <span style="color:${confColor};font-weight:700">${confLabel} (${conf}%)</span>
            </div>
          </div>
        </div>

        <!-- Indicatori principali -->
        <div class="section" style="margin-top:0">Indicatori urbanistici</div>
        <div class="g3" style="margin-bottom:10px">
          ${_metricBox('POT max', pot ? (pot.value_num+'%') : '—', pot ? 'ok' : '')}
          ${_metricBox('CUT max', cut ? cut.value_num : '—', cut ? 'ok' : '')}
          ${_metricBox('RH max',  rh  ? (rh.value_str||rh.value_num) : '—', rh ? 'ok' : '')}
        </div>`;

    if(hm){
      html += `
        <div class="g2" style="margin-bottom:10px">
          ${_metricBox('H max (m)', hm.value_num+'m', 'ok')}
          ${_metricBox('Sursa', docType, '')}
        </div>`;
    }

    // Conflicte
    if(conflicts.length > 0){
      html += `
        <div class="warn-box" style="margin-bottom:10px">
          ⚠️ Conflicte detectate pentru: <b>${conflicts.join(', ')}</b><br>
          <span style="font-size:10px">Regula cu prioritate mai mare este aplicată automat.</span>
        </div>`;
    }

    // Toate regulile
    html += `<div class="section">Toate regulile (${rules.length})</div>
      <div style="font-size:11px">`;

    rules.forEach(r=>{
      const val   = r.value_num != null ? r.value_num + (r.unit||'') : (r.value_str||'—');
      const isConf = conflicts.includes(r.rule_type);
      const statusColor = r.status === 'ACTIVE' ? '#34d399' : '#f87171';
      html += `
        <div style="display:flex;justify-content:space-between;align-items:center;
             padding:6px 8px;border-radius:6px;margin-bottom:3px;
             background:${isConf?'rgba(245,158,11,.08)':'rgba(255,255,255,.02)'};
             border:1px solid ${isConf?'rgba(245,158,11,.25)':'rgba(255,255,255,.06)'}">
          <div>
            <span style="font-weight:700;color:#94a3b8;font-size:10px;
                  text-transform:uppercase">${_humanType(r.rule_type)}</span>
            ${isConf ? '<span style="color:#fbbf24;font-size:9px;margin-left:4px">⚠ conflict</span>' : ''}
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-weight:700;color:#e2e8f0">${val}</span>
            <span class="badge" style="font-size:9px;padding:2px 6px;
                  background:rgba(59,130,246,.1);color:#60a5fa">${r.doc_type||'?'}</span>
            <span style="width:6px;height:6px;border-radius:50%;
                  background:${statusColor};flex-shrink:0"></span>
          </div>
        </div>`;
    });

    html += `</div>`;

    // Footer timestamp
    const lastUpdate = rules[0]?.created_at
      ? new Date(rules[0].created_at).toLocaleDateString('ro-RO')
      : 'necunoscut';

    html += `
        <div style="margin-top:12px;padding:8px;border-radius:7px;
             background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);
             font-size:10px;color:#374151">
          <div style="display:flex;justify-content:space-between">
            <span>📅 Actualizat: ${lastUpdate}</span>
            <span>${rules.length} reguli active</span>
          </div>
          <div style="margin-top:4px;color:#1e293b">
            Date din baza UrbanX · Necesită verificare cu documentele oficiale
          </div>
        </div>

        <!-- Acțiuni -->
        <div class="btn-row" style="margin-top:10px">
          <button class="btn-s" style="font-size:11px;flex:1"
            onclick="window._rvZoningRefresh&&_rvZoningRefresh()">
            🔄 Reîncarcă
          </button>
          <button class="btn-s" style="font-size:11px;flex:1"
            onclick="window._rvZoningShowSource&&_rvZoningShowSource()">
            📄 Sursă
          </button>
        </div>

      </div>`;

    return html;
  }

  // ── Helpers render ────────────────────────────────────────────────────────

  function _getBestRule(ruleArray){
    if(!ruleArray || ruleArray.length === 0) return null;
    return ruleArray[0]; // deja sortate după priority DESC
  }

  function _metricBox(label, value, cls){
    return `
      <div class="met">
        <div class="ml">${label}</div>
        <div class="mv ${cls||''}" style="font-size:${String(value).length>5?'14':'16'}px">
          ${value}
        </div>
      </div>`;
  }

  function _humanType(type){
    const map = {
      POT_MAX: 'POT max', CUT_MAX: 'CUT max', RH_MAX: 'RH max',
      H_MAX_M: 'H max (m)', LOT_MIN_M2: 'Lot min (m²)',
      FRONT_MIN_M: 'Front min (m)', RETRAGERE_FATA_M: 'Retragere față',
      RETRAGERE_SPATE_M: 'Retragere spate', RETRAGERE_LATERAL_M: 'Retragere laterală',
    };
    return map[type] || type.replace(/_/g,' ').toLowerCase();
  }

  // ── API public ────────────────────────────────────────────────────────────

  // Apelat când se selectează o parcelă
  window._rvZoningUpdate = function(parcel){
    if(!parcel) return;

    // Extrage UAT code și UTR din parcel object
    // Compatibil cu structura din 02-map-core.js și 06-aedis.js
    const utr = parcel.utr || parcel.UTR || parcel.zona ||
                parcel.properties?.utr || parcel.properties?.UTR || '';
    const uat = parcel.uat_code || parcel.uat ||
                parcel.properties?.uat_code || 'RO-UNKNOWN';

    if(!utr) return; // fără UTR nu putem căuta

    _currentUat = uat;
    _currentUtr = utr;

    // Update badge în tab
    const tab = document.getElementById('ptab-regulament');
    if(tab){
      tab.textContent = `📋 Regulament · ${utr}`;
    }

    // Dacă tab-ul e activ, încarcă imediat
    const tc = document.getElementById('tc-regulament');
    if(tc && tc.classList.contains('active')){
      _loadRules(uat, utr);
    }
  };

  // Refresh manual
  window._rvZoningRefresh = function(){
    if(_currentUat && _currentUtr){
      // Invalidăm cache
      delete _cache[`${_currentUat}:${_currentUtr}`];
      _loadRules(_currentUat, _currentUtr);
    }
  };

  // Afișează sursa documentului (placeholder — va deschide PDF în viitor)
  window._rvZoningShowSource = function(){
    if(typeof ss === 'function'){
      ss('📄 Sursă: integrare PDF documente — disponibil în Etapa 2');
    }
  };

  // ── Hook la selectarea parcelei ───────────────────────────────────────────
  // Se integrează cu hook-ul existent din index.html (_onParcelSelectedHook)
  const _origHook = window._onParcelSelectedHook;
  window._onParcelSelectedHook = function(parcel){
    if(typeof _origHook === 'function') _origHook(parcel);
    window._rvZoningUpdate(parcel);
  };

  // Hook și pentru AEDIS (06-aedis.js setează _RV.ap când selectează parcela)
  // Polling ușor pentru a detecta când _RV.ap se schimbă
  let _lastParcelId = null;
  setInterval(()=>{
    const ap = (typeof _RV !== 'undefined') ? _RV?.ap || _RV?.activeParcel : null;
    if(!ap) return;
    const id = ap.id || ap.nrCad || ap.nr_cad || JSON.stringify(ap).slice(0,50);
    if(id !== _lastParcelId){
      _lastParcelId = id;
      window._rvZoningUpdate(ap);
    }
  }, 1500);

  // ── Init ──────────────────────────────────────────────────────────────────
  function _init(){
    _injectTab();
    console.log('[ZoningConnector v1] ✅ loaded | Supabase:', ENABLED ? 'configurat' : 'neconfigurat');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    setTimeout(_init, 500); // după ce panel-tabs e în DOM
  }

})();
