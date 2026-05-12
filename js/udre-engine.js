// ═══════════════════════════════════════════════════════════════════════════
// UDRE — URBAN DESIGN RULE ENGINE v2.0
// UrbanX TSS·FG | Motor de reguli urbanistice
//
// ENGINE PUR — nu conține date. Citește din PUG_REGISTRY.
// Fallback algoritmic automat pentru orice UAT fără date în registry.
//
// Adăugare UAT: PUG_REGISTRY.register('cluj', {...}) → funcționează automat.
// ═══════════════════════════════════════════════════════════════════════════

window.UDRE = {

  // ── Template-uri generice per tip de zonă ───────────────────────────────
  // Folosite DOAR când UAT-ul nu are intrare în PUG_REGISTRY
  _GENERIC: {
    centru:            { pot:70, cut:3.5, hMaxFloors:10, hMaxM:32, retragereStrada:3, retragereVecin:2, tip:'centru-mixt',           tipLabel:'Centru Mixt Dens' },
    rezidential_mare:  { pot:50, cut:2.8, hMaxFloors:9,  hMaxM:29, retragereStrada:4, retragereVecin:3, tip:'rezidential-colectiv',  tipLabel:'Rezidențial Colectiv Mare' },
    rezidential_mediu: { pot:45, cut:2.2, hMaxFloors:7,  hMaxM:23, retragereStrada:5, retragereVecin:4, tip:'rezidential-colectiv',  tipLabel:'Rezidențial Colectiv Mediu' },
    rezidential_mic:   { pot:38, cut:1.6, hMaxFloors:5,  hMaxM:17, retragereStrada:5, retragereVecin:4, tip:'rezidential-colectiv',  tipLabel:'Rezidențial Colectiv Mic' },
    coridor:           { pot:65, cut:3.0, hMaxFloors:7,  hMaxM:24, retragereStrada:4, retragereVecin:3, tip:'coridor-bulevardar',    tipLabel:'Coridor Mixt Bulevardar' },
    reconversie:       { pot:55, cut:2.5, hMaxFloors:8,  hMaxM:27, retragereStrada:6, retragereVecin:5, tip:'reconversie',           tipLabel:'Reconversie Industrială' },
    logistica:         { pot:65, cut:2.0, hMaxFloors:2,  hMaxM:10, retragereStrada:8, retragereVecin:6, tip:'logistica',             tipLabel:'Logistică / Industrial' },
    institutii:        { pot:55, cut:2.2, hMaxFloors:6,  hMaxM:20, retragereStrada:6, retragereVecin:4, tip:'institutii',            tipLabel:'Instituții Publice' },
    periurban:         { pot:35, cut:1.2, hMaxFloors:4,  hMaxM:14, retragereStrada:8, retragereVecin:5, tip:'rezidential-periurban', tipLabel:'Rezidențial Periurban / PUZ' },
  },

  _inferGenericType(zoneId, zoneData) {
    const id    = (zoneId    || '').toUpperCase();
    const label = ((zoneData?.label || '') + ' ' + (zoneData?.sub || '')).toLowerCase();
    if (id === 'CV'  || label.includes('centru'))                         return 'centru';
    if (label.includes('coridor') || label.includes('bulevar'))           return 'coridor';
    if (label.includes('reconversie') || label.includes('industrial'))    return 'reconversie';
    if (label.includes('logis') || label.includes('depozit'))             return 'logistica';
    if (label.includes('spital') || label.includes('medical')
      || label.includes('institutii'))                                    return 'institutii';
    if (label.includes('periurban') || label.includes('puz')
      || label.includes('extravilan'))                                    return 'periurban';
    if ((zoneData?.hMax || 0) >= 35) return 'rezidential_mare';
    if ((zoneData?.hMax || 0) >= 22) return 'rezidential_mediu';
    return 'rezidential_mic';
  },

  _seismicCorrection(rules, ag) {
    const factor = ag >= 0.35 ? 0.80 : ag >= 0.30 ? 0.88 : ag >= 0.25 ? 0.94 : 1.00;
    return {
      ...rules,
      hMaxFloors:   Math.floor(rules.hMaxFloors * factor),
      hMaxM:        Math.round(rules.hMaxM * factor),
      seismicAg:    ag,
      seismicFactor: factor,
      seismicAlert: ag >= 0.35
        ? `⚠ Zonă seismică critică ag=${ag}g — structuri speciale obligatorii P100-1/2022`
        : ag >= 0.25 ? `⚠ Seismic ag=${ag}g — calcul structural special necesar` : null,
    };
  },

  _recommendations(rules, lifecycleScore, ag) {
    const L = lifecycleScore || 0;
    const r = [];
    if (L > 0.35 && rules.pot < 65)
      r.push({ icon:'📈', text:'Presiune urbană ridicată — studiu densificare recomandat', p:'high' });
    if (L < -0.20 && rules.pot > 50)
      r.push({ icon:'⬇',  text:'Declin demografic — POT ridicat nerecomandat fără cerere confirmată', p:'med' });
    if (ag >= 0.35)
      r.push({ icon:'🔩', text:'Structuri armate speciale, diafragme — obligatoriu SEAP', p:'high' });
    if (rules.tip === 'centru-mixt' || rules.tip === 'coridor-bulevardar')
      r.push({ icon:'🏪', text:'Parter activ obligatoriu — comercial min. 80% front stradal', p:'high' });
    if (rules.reconversie || rules.decontaminare)
      r.push({ icon:'🧪', text:'Studiu de sol obligatoriu — contaminanți industriali', p:'high' });
    if (rules.cut > 3.0)
      r.push({ icon:'🌱', text:'CUT > 3.0 → acoperiș verde sau compensare conform PUG', p:'med' });
    if (rules.tip !== 'logistica' && rules.hMaxFloors > 4)
      r.push({ icon:'🚲', text:'Spații biciclete obligatorii >5% locuri parcare (HG 1030/2020)', p:'low' });
    return r;
  },

  // ── FUNCȚIE PRINCIPALĂ ──────────────────────────────────────────────────
  getRules(zoneId, cityKey, lifecycleScore, seismicAg, zoneData) {
    const registry  = window.PUG_REGISTRY?.get(cityKey);
    const regZone   = registry?.udre?.zones?.[zoneId];
    const ag        = registry?.udre?.seismicAg || seismicAg || 0.20;
    const hasPUG    = !!regZone;

    let base;
    if (hasPUG) {
      base = { ...regZone, hasPUG: true };
    } else {
      const gtype = this._inferGenericType(zoneId, zoneData);
      const tmpl  = this._GENERIC[gtype] || this._GENERIC['rezidential_mediu'];
      base = {
        ...tmpl,
        utrCode: `${(cityKey||'UAT').toUpperCase()}-${zoneId}`,
        utrName: tmpl.tipLabel + (zoneData?.label ? ` — ${zoneData.label}` : ''),
        mixFunc: [tmpl.tip, 'servicii'],
        profilStradal: 'Profil stradal standard — conform RLU județean',
        parcelMin: 600, parcelTip: 1500,
        obs:   'Reguli estimate algoritmic · Verificare PUG local obligatorie',
        sursa: 'Estimare UDRE algoritmic · Necesită verificare PUG/RLU local',
        hasPUG: false,
      };
    }

    const corrected = this._seismicCorrection(base, ag);
    const recs      = this._recommendations(corrected, lifecycleScore, ag);
    const ecoScore  = Math.round((corrected.pot/100*0.40 + Math.min(1,corrected.cut/5)*0.35 + Math.min(1,corrected.hMaxFloors/12)*0.25) * 100);

    return {
      ...corrected,
      recommendations: recs,
      economicScore: ecoScore,
      economicLabel: ecoScore > 70 ? 'Favorabil' : ecoScore > 45 ? 'Moderat' : 'Restrictiv',
      zoneId, cityKey, lifecycleScore,
    };
  },

  getCityProfile(cityKey, lifecycleScore, seismicAg) {
    const registry = window.PUG_REGISTRY?.get(cityKey);
    const zones    = window.TCI?._REAL_ZONES?.[cityKey] || [];
    return {
      cityKey, hasPUG: !!registry,
      dataPUG: registry ? registry.meta?.pugVersion : 'Estimare UDRE algoritmic',
      zones: zones.map(z => ({ zone: z, rules: this.getRules(z.id, cityKey, lifecycleScore, seismicAg, z) })),
      disclaimer: registry
        ? `Date din ${registry.meta?.pugVersion}. Verificați cu DJAT pentru actualizări.`
        : 'UDRE generează reguli estimative. Necesită verificare PUG local.',
    };
  },

  renderCard(rules) {
    if (!rules) return '';
    const seisCol  = rules.seismicAg >= 0.35 ? '#f87171' : rules.seismicAg >= 0.25 ? '#fb923c' : '#22c55e';
    const ecoCol   = rules.economicScore > 70 ? '#22c55e' : rules.economicScore > 45 ? '#f59e0b' : '#f87171';
    const pugBadge = rules.hasPUG
      ? `<span style="background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);color:#22c55e;font-size:6.5px;padding:1px 6px;border-radius:3px;font-weight:700">✅ PUG REAL</span>`
      : `<span style="background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);color:#f59e0b;font-size:6.5px;padding:1px 6px;border-radius:3px;font-weight:700">⚙ ESTIMAT</span>`;

    return `
    <div style="background:rgba(8,18,40,.88);border:1px solid rgba(99,102,241,.3);border-radius:8px;padding:10px 11px;margin-top:6px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <div style="font-size:7.5px;font-weight:700;color:#818cf8;letter-spacing:.06em">UDRE — REGULI URBANISTICE</div>
        ${pugBadge}
      </div>
      <div style="font-size:8.5px;font-weight:700;color:#c7d2fe;margin-bottom:2px">${rules.utrCode}</div>
      <div style="font-size:7.5px;color:rgba(148,163,184,.7);margin-bottom:7px">${rules.utrName}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:7px">
        ${[
          {l:'POT max', v:rules.pot+'%',                          c:'#a78bfa'},
          {l:'CUT max', v:rules.cut?.toFixed(1)||'–',             c:'#a78bfa'},
          {l:'Hmax',    v:'P+'+rules.hMaxFloors+'/'+rules.hMaxM+'m', c:seisCol},
        ].map(k=>`
          <div style="background:rgba(255,255,255,.04);border-radius:5px;padding:5px 6px;text-align:center">
            <div style="font-size:9.5px;font-weight:800;color:${k.c}">${k.v}</div>
            <div style="font-size:6px;color:rgba(148,163,184,.4);margin-top:1px">${k.l}</div>
          </div>`).join('')}
      </div>
      <div style="font-size:7px;color:rgba(148,163,184,.6);margin-bottom:3px">
        Retragere: <span style="color:#c7d2fe">${rules.retragereStrada}m stradă · ${rules.retragereVecin}m vecin</span>
      </div>
      <div style="font-size:7px;color:rgba(148,163,184,.5);margin-bottom:6px;line-height:1.5">
        ${(rules.mixFunc||[]).join(' · ')}
      </div>
      ${rules.seismicAlert ? `<div style="background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2);border-radius:5px;padding:5px 7px;margin-bottom:5px;font-size:7px;color:#fca5a5;line-height:1.45">${rules.seismicAlert}</div>` : ''}
      ${(rules.recommendations||[]).slice(0,2).map(r=>`<div style="font-size:7px;color:rgba(200,215,235,.75);padding:2px 0;border-bottom:1px solid rgba(255,255,255,.04)">${r.icon} ${r.text}</div>`).join('')}
      <div style="display:flex;justify-content:space-between;margin-top:6px">
        <div style="font-size:6px;color:rgba(100,120,150,.45);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${rules.sursa||''}</div>
        <div style="font-size:7px;font-weight:700;color:${ecoCol};margin-left:6px">${rules.economicLabel}</div>
      </div>
    </div>`;
  },
};

console.log('[UDRE] ✅ v2.0 loaded — engine pur, date din PUG_REGISTRY');
