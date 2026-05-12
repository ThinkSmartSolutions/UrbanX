// ═══════════════════════════════════════════════════════════════════════════
// zone-connector.js — TCI Zone → Pipeline Connector v1.0
// UrbanX TSS·FG
//
// Ce face:
//   1. Adaugă buton "🏗 Analizează" în panoul TCI
//   2. Click pe zonă proiectată → pipeline rulează automat
//   3. Afișează rezultat în panel lateral (loturi, reguli, massing)
//   4. Randează volumele 3D pe hartă
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0;
    if (n > 100) return;
    if (typeof TCI === 'undefined' || typeof UrbanXPipeline === 'undefined') {
      setTimeout(() => waitReady(cb, n + 1), 300);
      return;
    }
    cb();
  }

  waitReady(() => {
    console.log('[ZoneConnector] ✅ TCI + Pipeline ready');
    _addAnalyzeButton();
    _hookZoneClick();
  });

  // ── 1. Buton "🏗 Analizează" în panoul TCI ─────────────────────────────
  function _addAnalyzeButton() {
    // Așteptăm UI-ul TCI să fie construit
    const tryAdd = (attempts) => {
      if (attempts > 30) return;
      const btnRow = document.querySelector('[onclick*="_exportGeoJSON"]')?.parentElement;
      if (!btnRow) { setTimeout(() => tryAdd(attempts + 1), 500); return; }
      if (document.getElementById('tci-analyze-btn')) return;

      const btn = document.createElement('button');
      btn.id = 'tci-analyze-btn';
      btn.innerHTML = '🏗 Analizează';
      btn.title = 'Analizează zona selectată — GTL + SGE + UDRE + Massing';
      btn.style.cssText = [
        'flex:1', 'text-align:left', 'padding:6px 7px', 'border-radius:4px',
        'border:1px solid rgba(212,175,55,.4)', 'background:rgba(212,175,55,.12)',
        'color:#D4AF37', 'font-size:9px', 'cursor:pointer', 'font-family:inherit',
        'font-weight:700',
      ].join(';');
      btn.onclick = () => _runOnActiveZone();
      btnRow.appendChild(btn);
      console.log('[ZoneConnector] Buton 🏗 Analizează adăugat');
    };
    setTimeout(() => tryAdd(0), 2000);
  }

  // ── 2. Hook pe click zonă proiectată ──────────────────────────────────
  function _hookZoneClick() {
    const tryHook = (attempts) => {
      if (attempts > 30) return;
      const map = TCI.map || window.map;
      if (!map) { setTimeout(() => tryHook(attempts + 1), 500); return; }

      // Ascultăm click pe layerul de proiecție TCI
      ['tci-proj-bg', 'tci-proj-fill', 'tci-proj'].forEach(layer => {
        try {
          map.on('click', layer, (e) => {
            const f = e.features?.[0];
            if (!f) return;
            const zone = (TCI._projZones || []).find(z => z.id === f.properties?.id);
            if (zone) _runOnZone(zone);
          });
        } catch(e) { /* layer poate să nu existe */ }
      });

      // Fallback: click general pe hartă → zona cea mai apropiată
      map.on('click', (e) => {
        if (!TCI._analyzeOnClick) return;
        const { lng, lat } = e.lngLat;
        const zones = TCI._projZones || [];
        const R = 111319.9, cp = Math.cos(lat * Math.PI / 180);
        const nearest = zones.reduce((best, z) => {
          const dx = (z.lon - lng) * R * cp;
          const dy = (z.lat - lat) * R;
          const d  = Math.sqrt(dx*dx + dy*dy);
          return (!best || d < best.d) ? { z, d } : best;
        }, null);
        if (nearest && nearest.d < 2000) _runOnZone(nearest.z);
      });

      console.log('[ZoneConnector] Hook click zone activ');
    };
    setTimeout(() => tryHook(0), 3000);
  }

  // ── Rulează pipeline pe zona activă (prima din _projZones) ─────────────
  function _runOnActiveZone() {
    const zones = TCI._projZones || TCI._REAL_ZONES?.[TCI.cityKey||'iasi'] || [];
    if (!zones.length) {
      _showPanel({ error: 'Nicio zonă disponibilă. Pornește TCI mai întâi.' });
      return;
    }
    // Zona cu startYr cel mai apropiat de anul curent
    const yr = TCI.year || 2025;
    const zone = zones.reduce((b, z) =>
      Math.abs((z.startYr||2025)-yr) < Math.abs((b.startYr||2025)-yr) ? z : b
    );
    _runOnZone(zone);
  }

  // ── Rulează pipeline pe o zonă specifică ──────────────────────────────
  function _runOnZone(zone) {
    if (!zone) return;
    console.log('[ZoneConnector] Analizez zona:', zone.id, zone.label);

    // Generăm geometrie din zona TCI (rx/ry sau rect)
    const cx = zone.lon || zone.ring?.cx;
    const cy = zone.lat || zone.ring?.cy;
    if (!cx || !cy) { _showPanel({ error: 'Zonă fără coordonate: ' + zone.id }); return; }

    // Generăm poligon din parametrii zonei
    let ring;
    if (zone.rect) {
      const { cx:rx, cy:ry, w, h } = zone.rect;
      ring = [[rx-w/2,ry-h/2],[rx+w/2,ry-h/2],[rx+w/2,ry+h/2],[rx-w/2,ry+h/2],[rx-w/2,ry-h/2]];
    } else {
      // Elips → poligon aprox 12 puncte
      const rx = zone.rx || 0.003, ry = zone.ry || 0.002;
      ring = [];
      for (let i = 0; i <= 12; i++) {
        const a = (i / 12) * 2 * Math.PI;
        ring.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
      }
    }

    // Determină mode din tipologia zonei
    const label = (zone.label || '').toLowerCase();
    const mode = label.includes('logistic') ? 'logistica'
               : label.includes('rezid') || label.includes('dancu') ? 'urban'
               : 'urban';

    // Rulează pipeline
    const result = UrbanXPipeline.run({
      geometry: { type:'Polygon', coordinates:[ring], source:'TCI_zone' },
      zoneId: zone.id,
      mode,
    });

    // Randează massing 3D
    if (result && !result.error && result.buildings?.length) {
      UrbanXMassing.render(result.buildings);
    }

    // Afișează panel
    _showPanel(result, zone);
  }

  // ── Panel de rezultate ────────────────────────────────────────────────
  function _showPanel(result, zone) {
    // Creăm sau găsim panelul
    let panel = document.getElementById('tci-pipeline-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'tci-pipeline-panel';
      panel.style.cssText = [
        'position:fixed', 'bottom:70px', 'right:20px', 'width:280px',
        'background:rgba(4,10,24,0.96)', 'backdrop-filter:blur(12px)',
        'border:1px solid rgba(212,175,55,0.35)', 'border-radius:10px',
        'padding:12px 14px', 'z-index:3100', 'font-family:"Space Grotesk","Inter",sans-serif',
        'box-shadow:0 8px 32px rgba(0,0,0,.5)',
      ].join(';');
      document.body.appendChild(panel);
    }

    if (result?.error) {
      panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.1em">🏗 ANALIZĂ ZONĂ</div>
          <button onclick="this.closest('#tci-pipeline-panel').remove()" style="background:none;border:none;color:#64748b;cursor:pointer;font-size:12px">✕</button>
        </div>
        <div style="font-size:8.5px;color:#f87171">⚠ ${result.error}</div>`;
      return;
    }

    const r = result;
    const rules = r.rules;
    const confColor = (rules?.overallConfidence||0) > 70 ? '#22c55e'
                    : (rules?.overallConfidence||0) > 40 ? '#f59e0b' : '#f87171';

    const potVal  = rules?._base?.pot  || rules?.pot?.value  || '—';
    const cutVal  = rules?._base?.cut  || rules?.cut?.value  || '—';
    const hmaxVal = rules?._base?.hMaxFloors || rules?.hMax?.value || '—';
    const conf    = rules?.overallConfidence || '—';
    const confLbl = rules?.overallLabel || '—';

    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.1em">🏗 ANALIZĂ ZONĂ</div>
        <div style="display:flex;gap:6px;align-items:center">
          <button onclick="UrbanXMassing.clear()" title="Șterge 3D"
            style="background:rgba(248,113,113,.15);border:1px solid rgba(248,113,113,.3);color:#f87171;border-radius:4px;padding:2px 7px;cursor:pointer;font-size:8px;font-family:inherit">✕ 3D</button>
          <button onclick="this.closest('#tci-pipeline-panel').remove()"
            style="background:none;border:none;color:#64748b;cursor:pointer;font-size:14px;line-height:1">✕</button>
        </div>
      </div>

      <!-- Zona -->
      <div style="background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.2);border-radius:6px;padding:7px 9px;margin-bottom:8px">
        <div style="font-size:9.5px;font-weight:700;color:#D4AF37">${zone?.label || 'Zonă'}</div>
        <div style="font-size:8px;color:rgba(148,163,184,.7);margin-top:2px">${zone?.sub || ''}</div>
      </div>

      <!-- GTL + Parcelă -->
      <div style="margin-bottom:8px">
        <div style="font-size:7px;font-weight:700;color:rgba(148,163,184,.5);letter-spacing:.08em;margin-bottom:4px">GTL — GEO TRUTH</div>
        <div style="display:flex;justify-content:space-between;font-size:8px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.05)">
          <span style="color:rgba(148,163,184,.6)">Suprafață parcelă</span>
          <span style="color:#60a5fa;font-weight:700">${r.parcel?.areaLabel || '—'}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:8px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.05)">
          <span style="color:rgba(148,163,184,.6)">Sursă geometrie</span>
          <span style="color:#60a5fa">TCI_zone · ${((r.validation?.confidence||0)*100).toFixed(0)}% conf.</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:8px;padding:2px 0">
          <span style="color:rgba(148,163,184,.6)">Validare</span>
          <span style="color:${r.validation?.valid?'#22c55e':'#f87171'}">${r.validation?.valid?'✅ OK':'⚠ '+r.validation?.warnings?.[0]}</span>
        </div>
      </div>

      <!-- SGE + Loturi -->
      <div style="margin-bottom:8px">
        <div style="font-size:7px;font-weight:700;color:rgba(148,163,184,.5);letter-spacing:.08em;margin-bottom:4px">SGE — LOTURI GENERATE</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:4px">
          ${[
            { l:'Loturi', v: r.lots?.length },
            { l:'m² / lot', v: r.lots?.length ? Math.round(r.lots[0].area)+'m²' : '—' },
            { l:'Clădiri 3D', v: r.buildings?.length },
          ].map(k => `
            <div style="background:rgba(255,255,255,.04);border-radius:5px;padding:5px;text-align:center">
              <div style="font-size:10px;font-weight:800;color:#a78bfa">${k.v}</div>
              <div style="font-size:6px;color:rgba(148,163,184,.4);margin-top:1px">${k.l}</div>
            </div>`).join('')}
        </div>
        ${r.parcel?.roadAccess?.found
          ? `<div style="font-size:7.5px;color:#22c55e">✅ ${r.parcel.roadAccess.label}</div>`
          : `<div style="font-size:7.5px;color:#f59e0b">⚠ Acces rutier neverificat</div>`}
      </div>

      <!-- UDRE -->
      <div style="margin-bottom:8px">
        <div style="font-size:7px;font-weight:700;color:rgba(148,163,184,.5);letter-spacing:.08em;margin-bottom:4px">UDRE — REGULI URBANISTICE</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:5px">
          ${[
            { l:'POT', v: potVal + '%' },
            { l:'CUT', v: typeof cutVal === 'number' ? cutVal.toFixed(1) : cutVal },
            { l:'Hmax', v: 'R+' + hmaxVal },
          ].map(k => `
            <div style="background:rgba(255,255,255,.04);border-radius:5px;padding:5px;text-align:center">
              <div style="font-size:10px;font-weight:800;color:#c7d2fe">${k.v}</div>
              <div style="font-size:6px;color:rgba(148,163,184,.4);margin-top:1px">${k.l}</div>
            </div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:7px;color:rgba(148,163,184,.4)">${confLbl}</div>
          <div style="font-size:7.5px;font-weight:700;color:${confColor}">${conf}%</div>
        </div>
        ${rules?._base?.seismicAlert ? `
          <div style="font-size:7px;color:#fca5a5;margin-top:4px;background:rgba(248,113,113,.08);padding:4px 6px;border-radius:4px">${rules._base.seismicAlert}</div>` : ''}
      </div>

      <!-- TCI context -->
      <div style="border-top:1px solid rgba(255,255,255,.06);padding-top:7px">
        <div style="font-size:7px;font-weight:700;color:rgba(148,163,184,.5);letter-spacing:.08em;margin-bottom:4px">CONTEXT TCI</div>
        ${[
          { l:'Oraș', v: r.tci?.cityName + ' (' + r.tci?.growthType + ')' },
          { l:'Lifecycle L', v: (r.tci?.lifecycle||0).toFixed(2) },
          { l:'Seismic', v: 'ag=' + r.tci?.seismicAg + 'g · R+' + r.tci?.hMaxStory },
          { l:'ROI estimat', v: (r.tci?.roi || '—') + '%' },
        ].map(k => `
          <div style="display:flex;justify-content:space-between;font-size:8px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.04)">
            <span style="color:rgba(148,163,184,.5)">${k.l}</span>
            <span style="color:#e2e8f0;font-weight:600">${k.v}</span>
          </div>`).join('')}
      </div>

      <!-- Acțiuni -->
      <div style="display:flex;gap:5px;margin-top:10px">
        <button onclick="TCI._generateReport && TCI._generateReport()"
          style="flex:1;padding:7px;border-radius:6px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.35);color:#D4AF37;font-size:8px;cursor:pointer;font-family:inherit;font-weight:700">📄 Raport PDF</button>
        <button onclick="TCI._exportGeoJSON && TCI._exportGeoJSON()"
          style="flex:1;padding:7px;border-radius:6px;background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.3);color:#38bdf8;font-size:8px;cursor:pointer;font-family:inherit;font-weight:700">⬇ GeoJSON</button>
      </div>`;
  }

})();

console.log('[ZoneConnector] ✅ v1.0 loaded — click zonă → pipeline → UI panel + 3D');
