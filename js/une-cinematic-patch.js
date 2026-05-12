// ═══════════════════════════════════════════════════════════════════════════
// une-cinematic-patch.js — UNE Director Enrichment v1.0
// UrbanX TSS·FG
//
// CE LIPSEA din fluxul video față de motoarele TCI:
//   ❌ Housing Mix (7 tipologii) → nicăieri în scene
//   ❌ Lifecycle detaliat Pg/Eg/Mn → absent din narativ
//   ❌ ROI complet (brut + ajustat + absorbție) → doar parțial în s6
//   ❌ UDRE reguli PUG per zonă → complet absent
//   ❌ ACT 4 PUBLIC REALM → nicio scenă dedicată verde/walkability/TP
//   ✅ UXL partial → adăugat de 19-patch (5 scene)
//
// SOLUȚIE: enrichment post-_build() pe toate scenele
//   + o scenă nouă PUBLIC REALM inserată între s8 și s9
//   + _updateNarExtra îmbogățit cu date live la fiecare an
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0;
    if (n > 80) return;
    if (typeof TCI === 'undefined') { setTimeout(() => waitReady(cb, n+1), 250); return; }
    cb();
  }

  waitReady(() => {

    // ────────────────────────────────────────────────────────────────────
    // 1. Patch _director._build — enriches toate scenele cu date reale
    //    + inserează scena PUBLIC REALM (ACT 4 din UNE)
    // ────────────────────────────────────────────────────────────────────
    const _origBuild = TCI._director._build.bind(TCI._director);

    TCI._director._build = function () {
      const scenes = _origBuild();
      try {
        const T    = this._tci || TCI;
        const city = T.cityData || T.d || {};
        if (!city.pop2021) return scenes;

        const need  = T._calcUrbanNeed?.(city) || {};
        const grav  = T._calcGravityScore?.(city) || { growthType:'LOCAL', gravityScore:0.3 };
        const seis  = T._getSeismicAg?.(city.lon||27.6, city.lat||47.16) || { ag:0.20, hMaxStory:8 };
        const feas  = T._calcFeasibility?.({}, city, seis.ag) || {};
        const hMix  = T._calcHousingMix?.(need, city) || { mix:{}, totalInvestitie:0 };
        const lc    = grav.lifecycle || {};
        const cx = city.lon||27.6, cy = city.lat||47.16;
        const name = city.name||'UAT';

        // UXL profile (dacă disponibil)
        const uxlP  = (typeof UXL !== 'undefined') ? UXL.getProfile?.(city, [], need) : null;
        T._uxlProfile = uxlP;

        // UDRE city profile (dacă disponibil)
        const udreP = (typeof UDRE !== 'undefined' && typeof PUG_REGISTRY !== 'undefined')
          ? UDRE.getCityProfile?.(T.cityKey||'iasi', lc.score, seis.ag) : null;

        // ── Construiește snippeturi per categorie ─────────────────────

        // A. LIFECYCLE detaliat
        const lcSnippet = lc.Pg != null ? [
          `Lifecycle L=${lc.score>=0?'+':''}${lc.score?.toFixed(2)} (${grav.lifecycle?.lifecycleType||grav.growthType}).`,
          `Pg=${lc.Pg>=0?'+':''}${lc.Pg?.toFixed(2)} (demografie)`,
          `Eg=${lc.Eg>=0?'+':''}${lc.Eg?.toFixed(2)} (economie)`,
          `Mn=${lc.Mn>=0?'+':''}${lc.Mn?.toFixed(2)} (migrație netă).`,
        ].join(' · ') : '';

        // B. HOUSING MIX top 3 tipologii
        const topMix = Object.entries(hMix.mix||{})
          .filter(([,v])=>v.unitati>0)
          .sort((a,b)=>b[1].unitati-a[1].unitati)
          .slice(0,3);
        const mixSnippet = topMix.length
          ? `Cerere locuințe: ${topMix.map(([k,v])=>`${v.label} ${v.pct}%`).join(' · ')}. Total ${(need.locuinteTotale||0).toLocaleString('ro-RO')} unități.`
          : '';

        // C. ROI complet
        const roiSnippet = feas.roi
          ? `ROI_brut=${feas.roiBrut}% → ajustat absorbție → ROI=${feas.roi}% ${feas.viable?'✓ viabil':'⚠ risc'}. Absorbție ${(feas.absorbtieAn||0).toLocaleString('ro-RO')} un./an (${feas.pctGospodariAcces}% gospodării cu acces credit BNR).`
          : '';

        // D. UDRE prima zonă activă
        let udreSnippet = '';
        if (udreP?.zones?.length) {
          const z = udreP.zones[0];
          if (z.rules) {
            udreSnippet = `${z.rules.hasPUG?'PUG real':'UDRE estimat'}: ${z.rules.utrCode} · POT ${z.rules.pot}% · CUT ${z.rules.cut?.toFixed(1)} · Hmax R+${z.rules.hMaxFloors}/${z.rules.hMaxM}m.`;
          }
        }

        // E. UXL snippeturi per scenă
        const uxlSnippets = {
          's1':  uxlP ? `UXL ${uxlP.uxlScore}/100: Verde ${uxlP.verde.mp_loc?.toFixed(1)} mp/loc · Walk ${uxlP.walk.score}/100 · UHI +${uxlP.heat.uhi_mediu?.toFixed(1)}°C.` : '',
          's2':  uxlP ? `Verde accesibil: ${uxlP.verde.mp_loc?.toFixed(1)} mp/loc (OMS min ${uxlP.verde.target_oms} mp/loc${uxlP.verde.mp_loc < uxlP.verde.target_oms ? ' ⚠ DEFICIT' : ' ✓'}). Walkability: ${uxlP.walk.score}/100.` : '',
          's4':  uxlP ? (uxlP.verde.mp_loc < uxlP.verde.target_oms ? `Deficit verde critic în această zonă: ${uxlP.verde.mp_loc?.toFixed(1)} mp/loc vs ${uxlP.verde.target_oms} mp/loc target OMS.` : `Verde: ${uxlP.verde.mp_loc?.toFixed(1)} mp/loc.`) : '',
          's5':  uxlP && udreSnippet ? `Centru: walkability ${uxlP.walk.score}/100. ${udreSnippet}` : (uxlP ? `Centru: walkability ${uxlP.walk.score}/100 · UHI +${uxlP.heat.uhi_mediu?.toFixed(1)}°C.` : ''),
          's9':  uxlP ? `Heat island: +${uxlP.heat.uhi_mediu?.toFixed(1)}°C mediu. Hotspot: +${uxlP.heat.hotspots?.[0]?.uhi?.toFixed(1)||'?'}°C (${uxlP.heat.hotspots?.[0]?.zona||'zonă industrială'}). Proiecție 2055: ${uxlP.heat.zile_canicula_2055} zile caniculă/an (IPCC AR6 RCP8.5).` : '',
          's12': uxlP ? `UXL ${uxlP.uxlScore}/100 (${uxlP.uxlLabel}) · Verde ${uxlP.verde.mp_loc?.toFixed(1)} mp/loc · Walk ${uxlP.walk.score}/100 · UHI ${uxlP.heat.label}.` : '',
        };

        // ── Enrichment per scenă ──────────────────────────────────────
        const enrichMap = {
          's1': uxlSnippets['s1'],
          's2': [mixSnippet, uxlSnippets['s2']].filter(Boolean).join(' '),
          's3': lcSnippet,
          's4': [lcSnippet, uxlSnippets['s4']].filter(Boolean).join(' '),
          's5': [udreSnippet || '', uxlSnippets['s5']].filter(Boolean).join(' '),
          's6': roiSnippet,
          's7': uxlP ? `Nivel stradă: walkability ${uxlP.walk.score}/100. ${uxlP.verde.mp_loc < uxlP.verde.target_oms ? 'Deficit verde în această zonă.' : 'Verde adecvat.'}` : '',
          's8': mixSnippet,
          's9': uxlSnippets['s9'],
          's10': roiSnippet ? `Comparație EU: ${roiSnippet.substring(0,120)}...` : '',
          's12': [mixSnippet, uxlSnippets['s12']].filter(Boolean).join(' '),
        };

        // Aplicăm enrichment pe scenele existente
        scenes.forEach(sc => {
          const add = enrichMap[sc.id];
          if (add && sc.body) sc.body += ' ' + add;
        });

        // ── INSERT: Scena PUBLIC REALM (ACT 4 UNE) ───────────────────
        // Inserată după s8 (expansiune periferică)
        if (uxlP) {
          const s8idx = scenes.findIndex(s => s.id === 's8');
          const insertIdx = s8idx >= 0 ? s8idx + 1 : scenes.length - 2;

          const greenActions = uxlP.verde.actiuni?.slice(0,2).join(' · ') || 'Pocket parks și aliniament arbori prioritar';
          const walkActions  = uxlP.walk.actiuni?.slice(0,2).join(' · ') || 'Piste biciclete + trotuare reabilitate';
          const socialNote   = uxlP.social.seniori?.deficit_major
            ? `Centre seniori: ${uxlP.social.seniori.nr||0}/${uxlP.social.seniori.necesar_2055||0} necesare 2055 — PRIORITATE CRITICĂ.`
            : '';

          const pubRealmScene = {
            id: 's_realm',
            dur: 50000,
            light: 'day',
            cam: { center:[cx, cy], zoom:14.0, pitch:55, bearing:-10, duration:5000 },
            chain: [
              { center:[cx-0.008,cy+0.005], zoom:15.5, pitch:65, bearing:15,  duration:6000, delay:10000 },
              { center:[cx+0.006,cy-0.003], zoom:16.0, pitch:70, bearing:-20, duration:6000, delay:24000, light:'dusk' },
              { center:[cx, cy],            zoom:13.5, pitch:50, bearing:5,   duration:5000, delay:40000, light:'dusk' },
            ],
            title: `🌳 ${name} — Spațiu Public & Mobilitate`,
            body: [
              `Calitate spațiu urban: ${uxlP.uxlScore}/100 (${uxlP.uxlLabel}).`,
              `Verde accesibil: ${uxlP.verde.mp_loc?.toFixed(1)} mp/loc`,
              `(target OMS: ${uxlP.verde.target_oms} mp/loc${uxlP.verde.mp_loc < uxlP.verde.target_oms ? ` — DEFICIT ${(uxlP.verde.mp_loc - uxlP.verde.target_oms).toFixed(1)} mp/loc` : ' ✓'}).`,
              `Walkability: ${uxlP.walk.score}/100 (benchmark UE: ${uxlP.walk.benchmark_ue}).`,
              socialNote,
              `Priorități: ${greenActions}. Mobilitate: ${walkActions}.`,
            ].filter(Boolean).join(' '),
            src: uxlP.hasReal
              ? 'INS · PMUD local · WHO Green Space Atlas · ANM · OMS'
              : 'Estimare UXL algoritmic · Model TSS·FG',
          };

          scenes.splice(insertIdx, 0, pubRealmScene);
          console.log('[UNE] ✅ Scenă PUBLIC REALM inserată la poziția', insertIdx, '— total scene:', scenes.length);
        }

      } catch (e) {
        console.warn('[UNE Patch] Eroare enrichment scenes:', e.message);
      }

      return scenes;
    };

    // ────────────────────────────────────────────────────────────────────
    // 2. Patch _updateNarExtra — narativul temporal mai bogat
    //    Adaugă Housing Mix + ROI + UXL la narativul din CE VEDEȚI
    // ────────────────────────────────────────────────────────────────────
    const _origNarExtra = TCI._updateNarExtra?.bind(TCI);
    if (_origNarExtra) {
      TCI._updateNarExtra = function (sceneId, yr) {
        _origNarExtra(sceneId, yr);

        // Adaugăm un sub-panel sub narativ cu date live din motoare
        try {
          const city  = TCI.cityData || TCI.d || {};
          if (!city.pop2021) return;

          const need  = TCI._calcUrbanNeed?.(city) || {};
          const grav  = TCI._calcGravityScore?.(city) || {};
          const feas  = TCI._calcFeasibility?.({}, city, 0.20) || {};
          const lc    = grav.lifecycle || {};
          const uxlP  = TCI._uxlProfile;
          const yr_f  = Math.max(0, Math.min(1, (yr - 2025) / 30));
          const popEst = Math.round((need.pop2021||0) + ((need.pop2055||0)-(need.pop2021||0)) * yr_f);

          // Injectăm un panou compact de date live sub narativul existent
          let livePanel = document.getElementById('tci-une-live');
          if (!livePanel) {
            const narcard = document.getElementById('tci-narcard');
            if (!narcard) return;
            livePanel = document.createElement('div');
            livePanel.id = 'tci-une-live';
            livePanel.style.cssText = [
              'margin-top:5px','padding:6px 8px','border-radius:6px',
              'background:rgba(4,10,24,0.75)','border:1px solid rgba(255,255,255,0.08)',
              'font-size:7.5px','line-height:1.65',
            ].join(';');
            narcard.appendChild(livePanel);
          }

          // Scena PUBLIC REALM → afișează UXL detaliat
          const isRealm = sceneId === 's_realm';

          livePanel.innerHTML = [
            // Linie 1: demografie live
            `<span style="color:rgba(148,163,184,.5)">Pop ${yr}:</span> <span style="color:#60a5fa;font-weight:700">${popEst.toLocaleString('ro-RO')}</span>`,
            `<span style="color:rgba(148,163,184,.3)">·</span>`,
            `<span style="color:rgba(148,163,184,.5)">L:</span> <span style="color:${lc.score>0?'#4ade80':lc.score>-0.2?'#fbbf24':'#f87171'};font-weight:700">${lc.score>=0?'+':''}${lc.score?.toFixed(2)}</span>`,
            `<span style="color:rgba(148,163,184,.3)">·</span>`,
            // ROI
            feas.roi ? `<span style="color:rgba(148,163,184,.5)">ROI:</span> <span style="color:${feas.viable?'#4ade80':'#f87171'};font-weight:700">${feas.roi}%</span>` : '',
            // UXL în scena realm
            isRealm && uxlP ? `<span style="color:rgba(148,163,184,.3)">·</span> <span style="color:#34d399">🌳 ${uxlP.verde.mp_loc?.toFixed(1)} mp/loc · 🚶 ${uxlP.walk.score}/100</span>` : '',
            // Housing hint la milestone 2030
            yr === 2030 && need.locuinteTotale ? `<br><span style="color:#D4AF37;font-size:7px">⚡ 2030: ${Math.round(need.locuinteTotale/6).toLocaleString('ro-RO')} unități livrate din ${need.locuinteTotale.toLocaleString('ro-RO')} necesare</span>` : '',
          ].filter(Boolean).join(' ');

        } catch (e) { /* silent */ }
      };
    }

    console.log('[UNE Cinematic Patch] ✅ v1.0 — scene enriched + PUBLIC REALM + live panel');
  });

})();
