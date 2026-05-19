// ═══════════════════════════════════════════════════════════════════════════
// 23-legal-chain.js — Legal Chain Visualization
// UrbanX TSS·FG | v1.0 | 19 mai 2026
//
// Afișează lanțul juridic complet pentru o parcelă:
//   Parcelă → UTR → Regulă → Document → HCL sursă
//
// Date: citite din Neo4j via API intermediar SAU direct din Supabase
//       (dacă Neo4j nu e configurat, fallback la Supabase urbanx_rules)
//
// Tab "⚖ Legal" în panoul drept, sub tab-ul "Regulament"
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  // ── Config ────────────────────────────────────────────────────────────────
  // API intermediar Neo4j (opțional — dacă există)
  const NEO4J_API = (typeof _NEO4J_API_URL !== 'undefined' && _NEO4J_API_URL)
    ? _NEO4J_API_URL : '';

  // Fallback: citim direct din Supabase
  const SB_URL = (typeof _SUPABASE_URL !== 'undefined' && _SUPABASE_URL)
    ? _SUPABASE_URL : '';
  const SB_KEY = (typeof _SUPABASE_ANON_KEY !== 'undefined' && _SUPABASE_ANON_KEY)
    ? _SUPABASE_ANON_KEY : '';

  // ── State ─────────────────────────────────────────────────────────────────
  let _uat = null, _utr = null;
  let _cache = {};

  // ── Injecție tab ──────────────────────────────────────────────────────────
  function _init(){
    if(document.getElementById('ptab-legal')) return;

    const tabs = document.getElementById('panel-tabs');
    if(!tabs) return;

    const tab = document.createElement('button');
    tab.className   = 'ptab';
    tab.id          = 'ptab-legal';
    tab.dataset.t   = 'legal';
    tab.textContent = '⚖ Legal';
    tab.onclick     = _activateTab;
    tabs.appendChild(tab);

    const body = document.getElementById('panel-body');
    if(!body) return;
    const tc = document.createElement('div');
    tc.className = 'tc';
    tc.id        = 'tc-legal';
    tc.innerHTML = _renderEmpty();
    body.appendChild(tc);

    console.log('[LegalChain v1] ✅ tab injectat');
  }

  function _activateTab(){
    document.querySelectorAll('#panel-tabs .ptab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('#panel-body .tc').forEach(c=>c.classList.remove('active'));
    document.getElementById('ptab-legal')?.classList.add('active');
    document.getElementById('tc-legal')?.classList.add('active');
    if(_uat && _utr) _load(_uat, _utr);
  }

  // ── Fetch ─────────────────────────────────────────────────────────────────
  async function _fetch(uat, utr){
    const key = `${uat}:${utr}`;
    if(_cache[key]) return _cache[key];

    // 1. Încearcă Neo4j API dacă e configurat
    if(NEO4J_API){
      try {
        const r = await fetch(`${NEO4J_API}/legal-chain?uat=${encodeURIComponent(uat)}&utr=${encodeURIComponent(utr)}`);
        if(r.ok){
          const data = await r.json();
          _cache[key] = data;
          return data;
        }
      } catch(e){ console.debug('[LegalChain] Neo4j API unavailable, fallback Supabase'); }
    }

    // 2. Fallback: Supabase
    if(!SB_URL) return null;

    try {
      const url = `${SB_URL}/rest/v1/urbanx_rules`
        + `?uat_code=eq.${encodeURIComponent(uat)}`
        + `&utr_code=eq.${encodeURIComponent(utr)}`
        + `&status=eq.ACTIVE`
        + `&order=priority.desc`;

      const r = await fetch(url, {
        headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` }
      });
      if(!r.ok) return null;
      const rules = await r.json();

      // Transformăm în format legal chain
      const chain = {
        rules: rules.map(rule=>({
          rule_type:  rule.rule_type,
          value:      rule.value_num ?? rule.value_str,
          unit:       rule.unit || '',
          confidence: rule.confidence || 0.5,
          status:     rule.status,
          source: {
            doc_type:  rule.doc_type || '—',
            doc_title: `Document ${rule.doc_type || 'urban'}`,
            source_url: '',
          },
        })),
        total:        rules.length,
        source:       'supabase',
        generated_at: new Date().toISOString(),
      };
      _cache[key] = chain;
      return chain;
    } catch(e){
      console.warn('[LegalChain] fetch error:', e.message);
      return null;
    }
  }

  // ── Load + render ─────────────────────────────────────────────────────────
  async function _load(uat, utr){
    const tc = document.getElementById('tc-legal');
    if(!tc) return;

    tc.innerHTML = _renderLoading(utr);
    const chain = await _fetch(uat, utr);

    if(!chain || !chain.rules || chain.rules.length === 0){
      tc.innerHTML = _renderNoData(uat, utr);
    } else {
      tc.innerHTML = _renderChain(uat, utr, chain);
    }
  }

  // ── Renderers ─────────────────────────────────────────────────────────────

  function _renderEmpty(){
    return `<div style="padding:20px;text-align:center;color:#475569">
      <div style="font-size:28px;margin-bottom:8px">⚖</div>
      <div style="font-size:13px;font-weight:600;color:#64748b;margin-bottom:5px">Lanț Juridic</div>
      <div style="font-size:11px;color:#374151;line-height:1.6">
        Selectați o parcelă pentru a vedea<br>lanțul juridic al reglementărilor.
      </div>
    </div>`;
  }

  function _renderLoading(utr){
    return `<div style="padding:16px;text-align:center;color:#64748b;font-size:12px">
      <span class="spin"></span> Construiesc lanțul juridic UTR <b style="color:#d4af37">${utr}</b>…
    </div>`;
  }

  function _renderNoData(uat, utr){
    return `<div style="padding:12px">
      <div class="warn-box">📭 Niciun lanț juridic pentru UTR <b>${utr}</b> (${uat}).</div>
      <div style="font-size:11px;color:#475569;margin-top:8px;line-height:1.6">
        Rulați pipeline-ul de vectorizare pentru a popula baza de date.
      </div>
    </div>`;
  }

  function _renderChain(uat, utr, chain){
    const rules  = chain.rules || [];
    const source = chain.source === 'supabase' ? 'Supabase' : 'Neo4j';

    // Grupare pe tip
    const byType = {};
    rules.forEach(r=>{ (byType[r.rule_type] = byType[r.rule_type]||[]).push(r); });

    let html = `<div style="padding:10px 12px">

      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div>
          <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em">Lanț Juridic</div>
          <div style="font-size:16px;font-weight:800;color:#d4af37;margin-top:2px">UTR ${utr}</div>
        </div>
        <span class="badge b-b" style="font-size:10px">${source}</span>
      </div>

      <!-- Vizualizare lanț: parcelă → UTR → reguli → documente -->
      <div class="section" style="margin-top:0">Traseul reglementării</div>

      <!-- Node: Parcelă -->
      <div style="${_nodeStyle('#3b82f6')}">
        <span style="font-size:14px">📍</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:#60a5fa">PARCELĂ SELECTATĂ</div>
          <div style="font-size:10px;color:#475569">${uat}</div>
        </div>
      </div>
      ${_arrow()}

      <!-- Node: UTR -->
      <div style="${_nodeStyle('#d4af37')}">
        <span style="font-size:14px">🗺</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:#d4af37">UTR ${utr}</div>
          <div style="font-size:10px;color:#475569">Unitate Teritorială de Referință</div>
        </div>
      </div>
      ${_arrow()}`;

    // Noduri reguli
    rules.forEach((r, i)=>{
      const val   = r.value != null ? `${r.value}${r.unit}` : '—';
      const conf  = Math.round((r.confidence||0)*100);
      const cCol  = conf>=80?'#34d399':conf>=60?'#fbbf24':'#f87171';
      html += `
      <div style="${_nodeStyle('#8b5cf6')}">
        <span style="font-size:12px">📋</span>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:11px;font-weight:700;color:#a78bfa">${_humanType(r.rule_type)}</span>
            <span style="font-size:13px;font-weight:800;color:#e2e8f0">${val}</span>
          </div>
          <div style="font-size:10px;color:#475569;margin-top:2px">
            Sursă: <b style="color:#64748b">${r.source?.doc_type||'?'}</b>
            · Conf: <span style="color:${cCol}">${conf}%</span>
          </div>
        </div>
      </div>`;
      if(i < rules.length-1) html += _arrow();
    });

    // Surse unice
    const sources = [...new Map(rules.map(r=>[r.source?.doc_type, r.source])).values()].filter(s=>s?.doc_type);

    html += `${_arrow()}
      <!-- Node: Documente sursă -->
      <div style="${_nodeStyle('#10b981')}">
        <span style="font-size:14px">📄</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:#34d399">DOCUMENTE SURSĂ</div>
          <div style="font-size:10px;color:#475569;margin-top:2px">`;

    sources.forEach(s=>{
      html += `<div style="margin-top:3px">
        <span class="badge b-g" style="font-size:9px">${s.doc_type}</span>
        ${s.doc_title ? `<span style="font-size:10px;color:#475569;margin-left:4px">${s.doc_title.slice(0,40)}</span>` : ''}
        ${s.source_url ? `<a href="${s.source_url}" target="_blank"
          style="font-size:9px;color:#3b82f6;margin-left:4px">↗ Deschide</a>` : ''}
      </div>`;
    });

    html += `</div></div></div>

      <!-- Stats -->
      <div style="margin-top:12px;padding:8px;border-radius:7px;
           background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);
           font-size:10px;color:#374151;display:flex;justify-content:space-between">
        <span>⚖ ${rules.length} reglementări active</span>
        <span>🕐 ${new Date(chain.generated_at||Date.now()).toLocaleDateString('ro-RO')}</span>
      </div>

      <!-- Acțiuni -->
      <div class="btn-row" style="margin-top:10px">
        <button class="btn-s" style="font-size:11px;flex:1"
          onclick="window._rvLegalRefresh&&_rvLegalRefresh()">🔄 Reîncarcă</button>
        <button class="btn-s" style="font-size:11px;flex:1"
          onclick="window._rvLegalExport&&_rvLegalExport()">📋 Export JSON</button>
      </div>

    </div>`;

    return html;
  }

  function _nodeStyle(color){
    return `display:flex;align-items:flex-start;gap:10px;padding:10px;
            border-radius:8px;margin-bottom:2px;
            background:rgba(255,255,255,.02);
            border:1px solid ${color}33;
            border-left:3px solid ${color}`;
  }

  function _arrow(){
    return `<div style="text-align:center;color:#374151;font-size:14px;
                 line-height:1;margin:2px 0">↓</div>`;
  }

  function _humanType(type){
    const m = {
      POT_MAX:'POT max', CUT_MAX:'CUT max', RH_MAX:'RH max',
      H_MAX_M:'H max (m)', LOT_MIN_M2:'Lot minim (m²)',
      FRONT_MIN_M:'Front minim (m)', RETRAGERE_FATA_M:'Retragere față',
      RETRAGERE_SPATE_M:'Retragere spate',
    };
    return m[type] || type.replace(/_/g,' ').toLowerCase();
  }

  // ── API public ────────────────────────────────────────────────────────────

  window._rvLegalUpdate = function(parcel){
    if(!parcel) return;
    const utr = parcel.utr || parcel.UTR || parcel.zona || parcel.properties?.utr || '';
    const uat = parcel.uat_code || parcel.uat || parcel.properties?.uat_code || 'RO-UNKNOWN';
    if(!utr) return;
    _uat = uat; _utr = utr;

    const tab = document.getElementById('ptab-legal');
    if(tab) tab.textContent = `⚖ Legal · ${utr}`;

    const tc = document.getElementById('tc-legal');
    if(tc && tc.classList.contains('active')) _load(uat, utr);
  };

  window._rvLegalRefresh = function(){
    if(_uat && _utr){
      delete _cache[`${_uat}:${_utr}`];
      _load(_uat, _utr);
    }
  };

  window._rvLegalExport = function(){
    const key = `${_uat}:${_utr}`;
    const data = _cache[key];
    if(!data){ if(typeof ss==='function') ss('⚠️ Nu există date de exportat'); return; }
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.download = `legal_chain_${_utr}_${_uat}.json`;
    a.href = url; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 2000);
  };

  // Hook la parcel select (se integrează cu 22-zoning-connector.js)
  const _origZoning = window._rvZoningUpdate;
  window._rvZoningUpdate = function(parcel){
    if(typeof _origZoning === 'function') _origZoning(parcel);
    window._rvLegalUpdate(parcel);
  };

  // ── Init ──────────────────────────────────────────────────────────────────
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>setTimeout(_init, 600));
  } else {
    setTimeout(_init, 600);
  }

})();
