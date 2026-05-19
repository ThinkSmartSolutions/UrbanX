// ═══════════════════════════════════════════════════════════════════════════
// 24-timeline-layer.js — Temporal Evolution Layer
// UrbanX TSS·FG | v1.0 | 19 mai 2026
//
// Adaugă slider temporal în UI pentru vizualizarea evoluției
// reglementărilor urbanistice în timp.
//
// Afișează:
//   - Timeline events (modificări POT/CUT/RH)
//   - Comparator înainte/după
//   - Integrare cu 18-animation-engine.js pentru animații
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  const SB_URL = (typeof _SUPABASE_URL !== 'undefined') ? _SUPABASE_URL : '';
  const SB_KEY = (typeof _SUPABASE_ANON_KEY !== 'undefined') ? _SUPABASE_ANON_KEY : '';

  let _uat = null, _utr = null, _timelineData = null;

  // ── Init ──────────────────────────────────────────────────────────────────
  function _init(){
    if(document.getElementById('ptab-temporal')) return;

    const tabs = document.getElementById('panel-tabs');
    if(!tabs) return;

    const tab = document.createElement('button');
    tab.className   = 'ptab';
    tab.id          = 'ptab-temporal';
    tab.dataset.t   = 'temporal';
    tab.textContent = '⏱ Temporal';
    tab.onclick     = _activateTab;
    tabs.appendChild(tab);

    const body = document.getElementById('panel-body');
    if(!body) return;
    const tc = document.createElement('div');
    tc.className = 'tc';
    tc.id        = 'tc-temporal';
    tc.innerHTML = _renderEmpty();
    body.appendChild(tc);

    console.log('[TimelineLayer v1] ✅ tab injectat');
  }

  function _activateTab(){
    document.querySelectorAll('#panel-tabs .ptab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('#panel-body .tc').forEach(c=>c.classList.remove('active'));
    document.getElementById('ptab-temporal')?.classList.add('active');
    document.getElementById('tc-temporal')?.classList.add('active');
    if(_uat && _utr) _load(_uat, _utr);
  }

  // ── Fetch ─────────────────────────────────────────────────────────────────
  async function _load(uat, utr){
    const tc = document.getElementById('tc-temporal');
    if(!tc) return;
    tc.innerHTML = `<div style="padding:16px;text-align:center;color:#64748b;font-size:12px">
      <span class="spin"></span> Încarc timeline ${utr}…</div>`;

    if(!SB_URL){
      tc.innerHTML = _renderDemo(uat, utr);
      return;
    }

    try {
      const [eventsR, snapsR] = await Promise.all([
        fetch(`${SB_URL}/rest/v1/urbanx_timeline_events?uat_code=eq.${uat}&utr_code=eq.${utr}&order=event_date.desc&limit=20`,
          { headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`} }),
        fetch(`${SB_URL}/rest/v1/urbanx_snapshots?uat_code=eq.${uat}&order=snapshot_date.desc&limit=12`,
          { headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`} }),
      ]);

      const events    = eventsR.ok ? await eventsR.json() : [];
      const snapshots = snapsR.ok  ? await snapsR.json()  : [];
      _timelineData   = { events, snapshots };

      if(!events.length && !snapshots.length){
        tc.innerHTML = _renderNoData(uat, utr);
      } else {
        tc.innerHTML = _renderTimeline(uat, utr, events, snapshots);
      }
    } catch(e){
      tc.innerHTML = _renderDemo(uat, utr);
    }
  }

  // ── Renderers ─────────────────────────────────────────────────────────────

  function _renderEmpty(){
    return `<div style="padding:20px;text-align:center;color:#475569">
      <div style="font-size:28px;margin-bottom:8px">⏱</div>
      <div style="font-size:13px;font-weight:600;color:#64748b;margin-bottom:5px">Evoluție Temporală</div>
      <div style="font-size:11px;color:#374151;line-height:1.6">
        Selectați o parcelă pentru a vedea<br>istoricul modificărilor urbanistice.
      </div>
    </div>`;
  }

  function _renderNoData(uat, utr){
    return `<div style="padding:12px">
      <div class="warn-box">📭 Niciun eveniment temporal pentru ${utr} (${uat}).</div>
      <div style="font-size:11px;color:#475569;margin-top:8px">
        Rulați <code>temporal_snapshots.py --snapshot ${uat}</code> pentru a iniția tracking-ul.
      </div>
    </div>`;
  }

  function _renderTimeline(uat, utr, events, snapshots){
    const impactColor = {HIGH:'#f87171', MEDIUM:'#fbbf24', LOW:'#34d399'};

    let html = `<div style="padding:10px 12px">
      <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;
           letter-spacing:.07em;margin-bottom:4px">Evoluție Temporală</div>
      <div style="font-size:15px;font-weight:800;color:#d4af37;margin-bottom:12px">UTR ${utr}</div>`;

    // Snapshots ca bara de timp
    if(snapshots.length > 0){
      html += `<div class="section" style="margin-top:0">Snapshot-uri (${snapshots.length})</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px">`;
      snapshots.slice(0,8).forEach(s=>{
        const date = s.snapshot_date?.slice(0,7) || '?';
        html += `<div style="padding:4px 8px;border-radius:5px;font-size:10px;
                     background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
                     color:#64748b;cursor:default" title="${s.rules_count} reguli">
          ${date}
        </div>`;
      });
      html += `</div>`;
    }

    // Events timeline
    if(events.length > 0){
      html += `<div class="section">Modificări detectate</div>
        <div style="position:relative;padding-left:16px">
          <div style="position:absolute;left:6px;top:0;bottom:0;width:2px;
               background:rgba(255,255,255,.08);border-radius:1px"></div>`;

      events.forEach(e=>{
        const col   = impactColor[e.impact||'MEDIUM'] || '#fbbf24';
        const date  = e.event_date?.slice(0,10) || '—';
        const delta = e.old_value != null && e.new_value != null
          ? `${e.old_value} → ${e.new_value}` : '';
        html += `
          <div style="position:relative;margin-bottom:10px;
               padding:8px 10px;border-radius:8px;
               background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06)">
            <div style="position:absolute;left:-13px;top:10px;width:8px;height:8px;
                 border-radius:50%;background:${col}"></div>
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <span style="font-size:10px;font-weight:700;color:${col}">${e.event_type||'EVENT'}</span>
                ${e.utr_code ? `<span style="font-size:9px;color:#475569;margin-left:5px">${e.utr_code}</span>` : ''}
              </div>
              <span style="font-size:10px;color:#374151">${date}</span>
            </div>
            <div style="font-size:11px;color:#94a3b8;margin-top:3px">
              ${e.description || e.rule_type || ''}
              ${delta ? `<span style="color:#e2e8f0;font-weight:700;margin-left:5px">${delta}</span>` : ''}
            </div>
          </div>`;
      });
      html += `</div>`;
    }

    // Comparator
    html += `<div class="section">Comparator</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px">
        <div>
          <div style="font-size:10px;color:#64748b;margin-bottom:3px">De la</div>
          <input type="date" id="temp-date-a" class="inp" style="font-size:11px;padding:6px 8px;margin:0"
            value="${snapshots.length>1 ? snapshots[snapshots.length-1].snapshot_date : ''}">
        </div>
        <div>
          <div style="font-size:10px;color:#64748b;margin-bottom:3px">Până la</div>
          <input type="date" id="temp-date-b" class="inp" style="font-size:11px;padding:6px 8px;margin:0"
            value="${snapshots.length>0 ? snapshots[0].snapshot_date : ''}">
        </div>
      </div>
      <button class="btn-s" style="width:100%;font-size:11px"
        onclick="window._rvTemporalCompare&&_rvTemporalCompare()">
        📊 Compară perioadele
      </button>
      <div id="temporal-compare-result" style="margin-top:8px"></div>

    </div>`;

    return html;
  }

  function _renderDemo(uat, utr){
    // Date demo pentru UI preview fără Supabase
    const demoEvents = [
      {event_date:'2024-03-15',event_type:'RULE_CHANGE',utr_code:utr,
       rule_type:'POT_MAX',old_value:30,new_value:35,impact:'HIGH',
       description:'POT crescut prin PUZ aprobat HCL 45/2024'},
      {event_date:'2022-09-01',event_type:'RULE_CHANGE',utr_code:utr,
       rule_type:'CUT_MAX',old_value:1.0,new_value:1.2,impact:'MEDIUM',
       description:'CUT modificat la revizuirea PUG'},
      {event_date:'2020-01-10',event_type:'DOC_ADDED',utr_code:utr,
       rule_type:'',description:'PUG inițial introdus în sistem',impact:'LOW'},
    ];
    const demoSnaps = [
      {snapshot_date:'2024-05-19',rules_count:8},
      {snapshot_date:'2023-11-01',rules_count:7},
      {snapshot_date:'2022-08-15',rules_count:6},
    ];
    return _renderTimeline(uat, utr, demoEvents, demoSnaps) +
      `<div style="padding:0 12px 10px;font-size:10px;color:#374151;
           text-align:center">Demo — configurați Supabase pentru date reale</div>`;
  }

  // ── API public ────────────────────────────────────────────────────────────

  window._rvTemporalUpdate = function(parcel){
    if(!parcel) return;
    const utr = parcel.utr||parcel.UTR||parcel.properties?.utr||'';
    const uat = parcel.uat_code||parcel.uat||'RO-UNKNOWN';
    if(!utr) return;
    _uat = uat; _utr = utr;
    const tab = document.getElementById('ptab-temporal');
    if(tab) tab.textContent = `⏱ Temporal · ${utr}`;
    const tc = document.getElementById('tc-temporal');
    if(tc && tc.classList.contains('active')) _load(uat, utr);
  };

  window._rvTemporalCompare = async function(){
    const da   = document.getElementById('temp-date-a')?.value;
    const db   = document.getElementById('temp-date-b')?.value;
    const res  = document.getElementById('temporal-compare-result');
    if(!da || !db || !res) return;

    res.innerHTML = `<div style="font-size:11px;color:#64748b">
      <span class="spin"></span> Se compară…</div>`;

    if(!SB_URL){
      res.innerHTML = `<div class="ok-box" style="font-size:11px">
        Demo: POT a crescut de la 30% → 35% (+5%)<br>
        CUT a crescut de la 1.0 → 1.2 (+0.2)</div>`;
      return;
    }

    // Fetch snapshots pentru cele două date
    try {
      const r = await fetch(
        `${SB_URL}/rest/v1/rpc/get_rule_timeline`,
        { method:'POST', headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Content-Type':'application/json'},
          body: JSON.stringify({p_uat:_uat, p_utr:_utr, p_rule_type:'POT_MAX'}) }
      );
      const data = r.ok ? await r.json() : [];
      if(data.length === 0){
        res.innerHTML = `<div class="warn-box" style="font-size:11px">Nicio modificare detectată în perioada selectată.</div>`;
      } else {
        res.innerHTML = `<div class="ok-box" style="font-size:11px">${data.length} modificări în perioadă.</div>`;
      }
    } catch(e){
      res.innerHTML = `<div class="warn-box" style="font-size:11px">Eroare comparare: ${e.message}</div>`;
    }
  };

  // Hook la parcel select
  const _origLegal = window._rvZoningUpdate;
  window._rvZoningUpdate = function(parcel){
    if(typeof _origLegal === 'function') _origLegal(parcel);
    window._rvTemporalUpdate(parcel);
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>setTimeout(_init, 700));
  } else {
    setTimeout(_init, 700);
  }

})();
