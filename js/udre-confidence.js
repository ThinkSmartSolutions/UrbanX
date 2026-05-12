// ═══════════════════════════════════════════════════════════════════════════
// udre-confidence.js — UDRE Probabilistic Extension v1.0
// UrbanX TSS·FG
//
// EXTINDE udre-engine.js (v138) cu confidence per câmp.
// NU înlocuiește datele PUG reale — le augmentează cu certitudine.
//
// ÎNAINTE: getRules() → { pot:75, cut:4.0, hMaxFloors:12 }
// DUPĂ:    getRulesP() → {
//            pot:   { value:75,   confidence:0.95, source:'PUG_IASI_2018' },
//            cut:   { value:4.0,  confidence:0.95, source:'PUG_IASI_2018' },
//            hMax:  { value:9,    confidence:0.80, source:'seismic_P100'   },
//            retrag:{ value:3,    confidence:0.95, source:'PUG_IASI_2018' },
//          }
// ═══════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  function waitReady(cb, n) {
    n = n||0; if(n>80) return;
    if (typeof UDRE === 'undefined') { setTimeout(()=>waitReady(cb,n+1),250); return; }
    cb();
  }

  waitReady(() => {

    // ── Adăugăm getRulesP() — versiunea probabilistică ────────────────
    UDRE.getRulesP = function(zoneId, cityKey, lifecycleScore, seismicAg, zoneData) {
      // Obținem regulile standard din motorul existent
      const base = this.getRules(zoneId, cityKey, lifecycleScore, seismicAg, zoneData);
      const registry  = window.PUG_REGISTRY?.get(cityKey);
      const hasPUG    = !!registry?.udre?.zones?.[zoneId];

      // Niveluri de confidence per sursă
      const pugConf       = hasPUG ? 0.95 : 0.40;
      const seismicConf   = base.seismicFactor < 1 ? 0.85 : 0.95; // seismic corectat = mai incert
      const inferredConf  = hasPUG ? 0.70 : 0.35;

      // Sursa per câmp
      const source = hasPUG
        ? (registry?.meta?.pugVersion || 'PUG_real')
        : 'UDRE_algoritmic';

      return {
        // Câmpuri probabilistice
        pot:    { value: base.pot,         confidence: pugConf,      source },
        cut:    { value: base.cut,         confidence: pugConf,      source },
        hMax:   { value: base.hMaxFloors,  confidence: seismicConf,  source: 'P100-1/2022 + ' + source },
        hMaxM:  { value: base.hMaxM,       confidence: seismicConf,  source: 'P100-1/2022' },
        retrag: { value: base.retragereStrada, confidence: pugConf,  source },
        // Câmpuri contextuale
        tipologie: { value: base.tipLabel, confidence: pugConf,      source },
        mixFunc:   { value: base.mixFunc,  confidence: inferredConf, source: 'tipologie_inferata' },
        // Seismic
        seismicAg: { value: base.seismicAg,    confidence: 0.95, source: 'P100-1/2022' },
        seismicAlert: base.seismicAlert,
        // Meta
        hasPUG,
        overallConfidence: Math.round(
          (pugConf * 0.50 + seismicConf * 0.25 + inferredConf * 0.25) * 100
        ),
        overallLabel: pugConf > 0.85 ? '✅ Date PUG reale'
          : pugConf > 0.55 ? '⚠ Date parțial inferite'
          : '🔶 Date estimate algoritmic',
        recommendations: base.recommendations,
        // Backwards compat — câmpurile vechi rămân disponibile
        _base: base,
      };
    };

    // ── UI: render card probabilistic ────────────────────────────────────
    UDRE.renderCardP = function(rulesP) {
      if (!rulesP) return '';
      const conf = rulesP.overallConfidence;
      const confColor = conf > 80 ? '#22c55e' : conf > 50 ? '#f59e0b' : '#f87171';
      const confBg    = conf > 80 ? 'rgba(34,197,94,.08)' : conf > 50 ? 'rgba(245,158,11,.08)' : 'rgba(248,113,113,.08)';

      const fieldRow = (label, field) => {
        const c = Math.round((field?.confidence||0)*100);
        const cCol = c > 80 ? '#22c55e' : c > 50 ? '#f59e0b' : '#f87171';
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.04)">
          <span style="font-size:7.5px;color:rgba(148,163,184,.6)">${label}</span>
          <span style="display:flex;align-items:center;gap:5px">
            <span style="font-size:8.5px;font-weight:700;color:#c7d2fe">${field?.value}</span>
            <span style="font-size:6.5px;color:${cCol};background:${cCol}22;padding:1px 5px;border-radius:3px">${c}%</span>
          </span>
        </div>`;
      };

      return `
      <div style="background:rgba(8,18,40,.88);border:1px solid rgba(99,102,241,.3);border-radius:8px;padding:10px 11px;margin-top:6px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:#818cf8;letter-spacing:.06em">UDRE PROBABILISTIC</div>
          <div style="font-size:7px;font-weight:700;color:${confColor};background:${confBg};padding:2px 8px;border-radius:4px">${rulesP.overallLabel}</div>
        </div>

        <div style="height:3px;background:rgba(255,255,255,.07);border-radius:2px;margin-bottom:8px">
          <div style="width:${conf}%;height:100%;background:${confColor};border-radius:2px"></div>
        </div>
        <div style="font-size:6.5px;color:rgba(148,163,184,.4);margin-bottom:8px">Certitudine globală: ${conf}%</div>

        ${fieldRow('POT max', rulesP.pot)}
        ${fieldRow('CUT max', rulesP.cut)}
        ${fieldRow('Hmax etaje', rulesP.hMax)}
        ${fieldRow('Retragere stradă', rulesP.retrag)}

        <div style="font-size:6.5px;color:rgba(148,163,184,.35);margin-top:6px">
          ${rulesP.hasPUG ? '✅ Sursă PUG real' : '⚙ Estimare algoritm'} · ${rulesP._base?.sursa||'—'}
        </div>
      </div>`;
    };

    // ── Model inferit pentru UAT-uri fără PUG ────────────────────────
    // Elimină bias Iași — utilizează date TCI disponibile pentru orice UAT
    UDRE.inferFromTCI = function(cityData) {
      if (!cityData) return null;
      const grav    = window.TCI?._calcGravityScore?.(cityData) || { growthType:'LOCAL', gravityScore:0.5 };
      const seis    = window.TCI?._getSeismicAg?.(cityData.lon||27.6, cityData.lat||47.16) || { ag:0.20, hMaxStory:10 };
      const densHA  = (cityData.pop2021||100000) / (cityData.suprafata_ha||5000);

      // Inferență POT din densitate și growthType
      const potBase = grav.growthType === 'METROPOLITAN' ? 70
                    : grav.growthType === 'REGIONAL'     ? 55
                    : grav.growthType === 'LOCAL'        ? 40 : 30;
      const potConf = 0.35; // inferit, nu real

      const cutBase = grav.growthType === 'METROPOLITAN' ? 3.5
                    : grav.growthType === 'REGIONAL'     ? 2.2
                    : grav.growthType === 'LOCAL'        ? 1.5 : 0.9;

      return {
        pot:    { value: potBase,            confidence: potConf, source: 'inferred_gravity' },
        cut:    { value: cutBase,            confidence: potConf, source: 'inferred_gravity' },
        hMax:   { value: seis.hMaxStory,     confidence: 0.85,   source: 'P100-1/2022' },
        seismicAg: { value: seis.ag,         confidence: 0.90,   source: 'P100-1/2022' },
        overallConfidence: 38,
        overallLabel: '🔶 Date estimate din TCI (fără PUG)',
        hasPUG: false,
      };
    };

    console.log('[UDRE-Confidence] ✅ v1.0 — getRulesP() + renderCardP() + inferFromTCI()');
  });

})();
