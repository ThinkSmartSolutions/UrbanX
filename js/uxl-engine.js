// ═══════════════════════════════════════════════════════════════════════════
// UXL — URBAN EXPERIENCE LAYER v2.0
// UrbanX TSS·FG | Motor calitate spațiu urban
//
// ENGINE PUR — nu conține date. Citește din PUG_REGISTRY.
// Fallback algoritmic automat pentru orice UAT fără date în registry.
//
// Adăugare UAT: PUG_REGISTRY.register('cluj', { uxl: {...} }) → automat.
// ═══════════════════════════════════════════════════════════════════════════

window.UXL = {

  // ── Calcul Verde ────────────────────────────────────────────────────────
  _verde(uxlData, cityData) {
    if (uxlData?.verde) {
      const d     = uxlData.verde;
      const score = Math.round(Math.min(100, (d.mp_loc_accesibil / (d.target_OMS_ideal||26)) * 100));
      return {
        score,
        mp_loc:         d.mp_loc_accesibil,
        mp_loc_total:   d.mp_loc_total,
        target_oms:     d.target_OMS_min    || 9,
        target_ideal:   d.target_OMS_ideal  || 26,
        target_ue:      d.target_UE_mediu   || 16.5,
        deficit:        d.mp_loc_accesibil - (d.target_OMS_min || 9),
        status_color:   d.mp_loc_accesibil < 9 ? '#f87171' : '#22c55e',
        deficit_label:  d.mp_loc_accesibil < 9 ? '⚠ SUB TARGET OMS' : '✅ Peste target OMS',
        distributie:    d.distributie_nota,
        actiuni:        d.actiuni_prioritare || [],
        parcuri:        d.parcuriMajore     || [],
        tinta_2035:     d.tinta_2035,
      };
    }
    // Fallback algoritmic
    const pop  = cityData?.pop2021 || 100000;
    const dens = pop / (cityData?.suprafata_ha || 5000);
    const mp   = Math.max(2, Math.round(32 - dens * 0.9));
    return {
      score:        Math.round(Math.min(100, (mp / 26) * 100)),
      mp_loc:       mp, target_oms: 9, target_ideal: 26, target_ue: 16.5,
      deficit:      mp - 9,
      status_color: mp < 9 ? '#f87171' : '#22c55e',
      deficit_label: mp < 9 ? '⚠ SUB TARGET OMS' : '✅ Peste target OMS',
      distributie:  'Estimat algoritmic',
      actiuni: [],
    };
  },

  // ── Calcul Walkability ───────────────────────────────────────────────────
  _walkability(uxlData, cityData) {
    if (uxlData?.walkability) {
      const d = uxlData.walkability;
      return {
        score:       d.scor_mediu,
        benchmark_ue:d.benchmark_ue_similar || 65,
        gap_ue:      d.scor_mediu - (d.benchmark_ue_similar || 65),
        label:       d.scor_mediu > 65 ? 'Bun' : d.scor_mediu > 45 ? 'Mediu' : 'Slab',
        color:       d.scor_mediu > 65 ? '#22c55e' : d.scor_mediu > 45 ? '#f59e0b' : '#f87171',
        cartiere:    d.cartiere || {},
        actiuni:     d.actiuni_prioritare || [],
      };
    }
    const coef  = cityData?.coef_hub || 0.7;
    const pop   = cityData?.pop2021  || 100000;
    const scor  = Math.round(Math.min(85, 28 + coef * 42 + Math.min(12, (pop/350000)*10)));
    return {
      score: scor, benchmark_ue: 65, gap_ue: scor - 65,
      label: scor > 65 ? 'Bun' : scor > 45 ? 'Mediu' : 'Slab',
      color: scor > 65 ? '#22c55e' : scor > 45 ? '#f59e0b' : '#f87171',
    };
  },

  // ── Calcul Heat Island ───────────────────────────────────────────────────
  _heat(uxlData, cityData) {
    if (uxlData?.heat) {
      const d    = uxlData.heat;
      const risk = Math.round(Math.min(100, (d.uhi_mediu/3)*50 + (d.zile_canicula_2024/60)*50));
      return {
        riskScore:          risk,
        uhi_mediu:          d.uhi_mediu,
        zile_canicula_2024: d.zile_canicula_2024,
        zile_canicula_2055: d.zile_canicula_2055,
        hotspots:           d.hotspots || [],
        alerta:             d.alerta_2055,
        solutii:            d.solutii_prioritare || [],
        label: risk > 65 ? 'Ridicat' : risk > 40 ? 'Mediu' : 'Scăzut',
        color: risk > 65 ? '#f87171' : risk > 40 ? '#fb923c' : '#22c55e',
      };
    }
    const clim = window.TCI?._getClimateProfile?.(cityData?.judet||'') || { uhi:1.5, drought:0.3 };
    const risk = Math.round(Math.min(100, (clim.uhi/3)*50 + clim.drought*50));
    return {
      riskScore: risk, uhi_mediu: clim.uhi,
      zile_canicula_2024: 20, zile_canicula_2055: 38,
      label: risk > 65 ? 'Ridicat' : risk > 40 ? 'Mediu' : 'Scăzut',
      color: risk > 65 ? '#f87171' : risk > 40 ? '#fb923c' : '#22c55e',
    };
  },

  // ── Calcul Social Infra ──────────────────────────────────────────────────
  _social(uxlData, cityData, need) {
    if (uxlData?.socialInfra) {
      const d    = uxlData.socialInfra;
      const s    = d.scoli, g = d.gradinite, sr = d.centre_seniori;
      const score = Math.round(
        ((s?.surplus > 0 ? 90 : 60)   * 0.25) +
        ((g?.deficit < 0 ? 55 : 85)   * 0.30) +
        (85                            * 0.15) +
        ((sr?.deficit_major ? 20 : 70) * 0.30)
      );
      return {
        score,
        label:    score > 65 ? 'Adecvat' : score > 45 ? 'Parțial' : 'Deficitar',
        color:    score > 65 ? '#22c55e' : score > 45 ? '#f59e0b' : '#f87171',
        scoli:    s, gradinite: g, spitale: d.spitale,
        seniori:  sr,
        presiune_2055: d.presiune_2055,
        prioritati: [
          sr?.deficit_major ? 'Centre seniori — PRIORITATE 1' : null,
          g?.deficit < 0    ? `Grădinițe: ${Math.abs(g.deficit)} unități lipsă` : null,
        ].filter(Boolean),
      };
    }
    const score = Math.round(55 + (cityData?.coef_hub||0.6) * 28);
    return {
      score, label: score > 65 ? 'Adecvat' : 'Parțial',
      color: score > 65 ? '#22c55e' : '#f59e0b',
      presiune_2055: 'Medie',
    };
  },

  // ── PROFIL COMPLET ───────────────────────────────────────────────────────
  getProfile(cityData, zones, need) {
    const registry   = window.PUG_REGISTRY?.get(
      window.TCI?.cityKey || cityData?.name || '',
      cityData
    );
    const uxlData    = registry?.uxl || null;
    const hasReal    = !!uxlData;

    const verde  = this._verde     (uxlData, cityData);
    const walk   = this._walkability(uxlData, cityData);
    const heat   = this._heat      (uxlData, cityData);
    const social = this._social    (uxlData, cityData, need);

    const uxlScore = Math.round(
      verde.score       * 0.25 +
      walk.score        * 0.30 +
      (100-heat.riskScore) * 0.20 +
      social.score      * 0.25
    );

    return {
      uxlScore,
      uxlLabel: uxlScore > 65 ? 'Bun' : uxlScore > 45 ? 'Mediu' : 'Slab',
      uxlColor: uxlScore > 65 ? '#22c55e' : uxlScore > 45 ? '#f59e0b' : '#f87171',
      verde, walk, heat, social,
      hasReal,
      dataSursa: hasReal
        ? (registry?.meta?.surse?.join(' · ') || 'Date reale din PUG_REGISTRY')
        : 'Estimare algoritm UXL',
    };
  },

  // ── Snippet pentru scenele director ─────────────────────────────────────
  getNarrativeSnippet(profile, sceneId) {
    if (!profile) return '';
    const {verde, walk, heat} = profile;
    const mp   = verde.mp_loc?.toFixed(1) || '?';
    const uhi  = heat.uhi_mediu?.toFixed(1) || '?';
    const snip = {
      's2':  `Verde: ${mp} mp/loc (OMS min ${verde.target_oms}). Walk: ${walk.score}/100. UHI: +${uhi}°C.`,
      's4':  verde.mp_loc < verde.target_oms
               ? `Deficit verde critic: ${mp} mp/loc vs ${verde.target_oms} mp/loc target OMS.`
               : `Verde urban: ${mp} mp/loc — adecvat OMS.`,
      's5':  `Centru: walkability maxim ${walk.score}/100. Heat island ${heat.label}. Verde: ${mp} mp/loc.`,
      's9':  `UHI: +${uhi}°C mediu. Hotspot: +${heat.hotspots?.[0]?.uhi?.toFixed(1)||'?'}°C. Proiecție 2055: ${heat.zile_canicula_2055} zile caniculă/an.`,
      's12': `UXL ${profile.uxlScore}/100 (${profile.uxlLabel}) · Verde ${mp} mp/loc · Walk ${walk.score}/100 · UHI ${heat.label}.`,
    };
    return snip[sceneId] || '';
  },

  // ── Render HTML pentru panoul KPI ─────────────────────────────────────────
  renderPanel(profile) {
    if (!profile) return '';
    const {verde, walk, heat, social, uxlScore, uxlColor, uxlLabel, hasReal} = profile;

    const bar = (val, max, col) => {
      const pct = Math.round(Math.min(100, (val/max)*100));
      return `<div style="height:3px;background:rgba(255,255,255,.07);border-radius:2px;margin:3px 0 6px">
        <div style="width:${pct}%;height:100%;background:${col};border-radius:2px;transition:width .5s ease"></div></div>`;
    };

    const dataBadge = hasReal
      ? `<span style="background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:#22c55e;font-size:6px;padding:1px 5px;border-radius:3px">✅ DATE REALE</span>`
      : `<span style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);color:#f59e0b;font-size:6px;padding:1px 5px;border-radius:3px">⚙ ESTIMAT</span>`;

    return `
    <div style="background:rgba(4,12,32,.88);border:1px solid rgba(16,185,129,.3);border-radius:8px;padding:10px 11px;margin-top:6px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:7px">
        <div style="font-size:7.5px;font-weight:700;color:#34d399;letter-spacing:.06em">UXL — CALITATE SPAȚIU URBAN</div>
        ${dataBadge}
      </div>

      <!-- Hero score + grid 4 KPIs -->
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="text-align:center;min-width:42px">
          <div style="font-size:22px;font-weight:900;color:${uxlColor};line-height:1">${uxlScore}</div>
          <div style="font-size:6.5px;color:rgba(148,163,184,.5)">/100</div>
          <div style="font-size:8px;font-weight:700;color:${uxlColor}">${uxlLabel}</div>
        </div>
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:3px">
          ${[
            {l:'🌳 Verde',   v:(verde.mp_loc?.toFixed(1)||'?')+' mp/loc', c:verde.status_color},
            {l:'🚶 Walk.',   v:walk.score+'/100',                         c:walk.color},
            {l:'🌡 UHI',     v:'+' +(heat.uhi_mediu?.toFixed(1)||'?')+'°C', c:heat.color},
            {l:'🏫 Social',  v:social.label,                              c:social.color},
          ].map(k=>`
            <div style="background:rgba(255,255,255,.04);border-radius:4px;padding:3px 5px">
              <div style="font-size:6.5px;color:rgba(148,163,184,.45)">${k.l}</div>
              <div style="font-size:8.5px;font-weight:700;color:${k.c}">${k.v}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Verde detaliu -->
      <div style="border-top:1px solid rgba(255,255,255,.06);padding-top:6px;margin-bottom:4px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1px">
          <span style="font-size:7px;color:rgba(148,163,184,.6)">Verde accesibil/locuitor</span>
          <span style="font-size:8.5px;font-weight:700;color:${verde.status_color}">${verde.mp_loc?.toFixed(1)} mp/loc</span>
        </div>
        ${bar(verde.mp_loc||0, verde.target_ideal||26, verde.status_color)}
        <div style="display:flex;gap:6px;font-size:6.5px;color:rgba(148,163,184,.4)">
          <span>OMS min: <span style="color:#f59e0b">${verde.target_oms}</span></span>
          <span>ideal: <span style="color:#22c55e">${verde.target_ideal}</span></span>
          <span>UE: <span style="color:#60a5fa">${verde.target_ue}</span></span>
          <span>mp/loc</span>
        </div>
        ${verde.distributie ? `<div style="font-size:6.5px;color:rgba(245,158,11,.7);margin-top:3px">⚠ ${verde.distributie}</div>` : ''}
      </div>

      <!-- Walkability -->
      <div style="border-top:1px solid rgba(255,255,255,.06);padding-top:6px;margin-bottom:4px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1px">
          <span style="font-size:7px;color:rgba(148,163,184,.6)">Walkability Score</span>
          <span style="font-size:8.5px;font-weight:700;color:${walk.color}">${walk.score}/100
            <span style="font-size:6.5px;color:rgba(148,163,184,.4)">(UE ~${walk.benchmark_ue})</span></span>
        </div>
        ${bar(walk.score, 100, walk.color)}
        ${walk.gap_ue < -10 ? `<div style="font-size:6.5px;color:#f87171">Gap UE: ${walk.gap_ue} pct — infra pietonală prioritară</div>` : ''}
      </div>

      <!-- Heat Island -->
      <div style="border-top:1px solid rgba(255,255,255,.06);padding-top:6px;margin-bottom:4px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1px">
          <span style="font-size:7px;color:rgba(148,163,184,.6)">Urban Heat Island</span>
          <span style="font-size:8.5px;font-weight:700;color:${heat.color}">+${heat.uhi_mediu?.toFixed(1)}°C · ${heat.zile_canicula_2024} zile/an</span>
        </div>
        ${bar(heat.riskScore, 100, heat.color)}
        <div style="font-size:6.5px;color:rgba(148,163,184,.4)">2055: <span style="color:${heat.color}">${heat.zile_canicula_2055} zile caniculă/an</span></div>
      </div>

      <!-- Social -->
      <div style="border-top:1px solid rgba(255,255,255,.06);padding-top:6px">
        <div style="font-size:7px;color:rgba(148,163,184,.6);margin-bottom:3px">Infrastructură Socială</div>
        ${social.seniori?.deficit_major ? `
          <div style="background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2);border-radius:4px;padding:4px 6px;font-size:6.5px;color:#fca5a5;line-height:1.45">
            ⚠ Centre seniori: ${social.seniori.nr||0}/${social.seniori.necesar_2055||0} necesare 2055 — PRIORITATE CRITICĂ
          </div>` : ''}
        ${social.gradinite?.deficit < 0 ? `
          <div style="font-size:6.5px;color:rgba(245,158,11,.7);margin-top:3px">
            ⚠ Grădinițe: lipsă ${Math.abs(social.gradinite.deficit)} unități
          </div>` : ''}
        <div style="font-size:6.5px;color:rgba(148,163,184,.45);margin-top:3px">${social.presiune_2055||''}</div>
      </div>

      <!-- Footer -->
      <div style="border-top:1px solid rgba(255,255,255,.06);margin-top:6px;padding-top:4px;display:flex;justify-content:space-between">
        <div style="font-size:6px;color:rgba(100,120,150,.4);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${profile.dataSursa}</div>
        <div style="font-size:6px;color:rgba(100,120,150,.3);margin-left:4px">UXL v2.0</div>
      </div>
    </div>`;
  },
};

console.log('[UXL] ✅ v2.0 loaded — engine pur, date din PUG_REGISTRY');
