// ═══════════════════════════════════════════════════════════════════════
// UrbanX Data Bus — Sursă unică de date pentru toate rapoartele
// Când se schimbă o caracteristică (niv, bW, funcțiune etc.),
// toate rapoartele sunt notificate și se recalculează automat.
// ═══════════════════════════════════════════════════════════════════════
window._RV_DataBus = (() => {
  const subscribers = {};
  let _computed = null;

  return {
    // ── Actualizează datele (apelat din releveu după calcul clădire) ──────
    update(building, P) {
      if(!building || !P) return;
      const niv = building.niv || 1;
      const hn  = P.hn || 3;
      const nrApt = Math.max(1, Math.round(building.sdaTotal / 70));
      const bW = building.bW || P.W;
      const bD = building.bD || P.D;

      _computed = {
        // ─ Identificare ──────────────────────────────────────────────────
        nrCad:       P.nrCad,
        utr:         P.utr,
        functiune:   P.fn || 'rezidential_colectiv',
        uat:         'Municipiul Iași',
        frontDir:    P.frontDir || 'N',
        // ─ Geometrie clădire ─────────────────────────────────────────────
        bW, bD,
        niv,
        H:           niv * hn,
        hn,
        SC:          building.scArea || 0,
        SDA:         building.sdaTotal || 0,
        sdaPerFloor: building.sdaPerFloor || 0,
        nrCores:     (building.cores || []).length,
        // ─ Indicatori urbanistici ─────────────────────────────────────────
        pot:         P.pot,
        cut:         P.cut,
        potReal:     building.scArea / P.area,
        cutReal:     building.sdaTotal / P.area,
        parcelArea:  P.area,
        // ─ Unități locative ───────────────────────────────────────────────
        nrApt,
        suMedieApt:  building.sdaTotal / Math.max(1, nrApt) * 0.82,
        // ─ Termici (C107/4-2022) ──────────────────────────────────────────
        uWall:       0.27,   // W/m²K perete exterior cu EPS15
        uRoof:       0.18,   // W/m²K terasă inversă XPS20
        uWin:        1.0,    // W/m²K tâmplărie PVC triplu low-E
        uFloor:      0.28,   // W/m²K planșeu parter
        // ─ Suprafețe termice ──────────────────────────────────────────────
        aWall:       (2 * (bW + bD)) * niv * hn * 0.75, // ~75% plin
        aRoof:       bW * bD,
        aWin:        (2 * (bW + bD)) * niv * hn * 0.25, // ~25% vitrat
        aFloor:      bW * bD,
        // ─ Pentru studiu însorire (OMS 119/2014) ─────────────────────────
        azimutFront: {N:0,NE:45,E:90,SE:135,S:180,SV:225,V:270,NV:315}[P.frontDir]||0,
        hddIasi:     2820,   // grade-zile incălzire Iași
        // ─ Trafic (HCL Iași) ──────────────────────────────────────────────
        tripuriZi:   nrApt * 8,    // ~8 deplasări/zi/apartament
        tripuriOra:  Math.ceil(nrApt * 0.12), // vârf dimineață 12%
        // ─ Parcaje (NP 067/2002) ─────────────────────────────────────────
        parcajeNec:  Math.ceil(nrApt * 1.2),
        parcajePMR:  Math.max(2, Math.ceil(nrApt * 1.2 * 0.05)),
        parcajeLibere: Math.floor(Math.max(0, P.area - bW * bD - 200) / 28),
        // ─ Acustică (SR EN ISO 717) ───────────────────────────────────────
        rwNecesar:   P.fn?.includes('birouri') ? 48 : 52, // dB
        distToStreet: P.rs || 5,
        // ─ Geotehnică (NP 074/2014) ──────────────────────────────────────
        nrForaje:    Math.max(3, Math.ceil(bW * bD / 500)), // 1 foraj/500m²
        adancForaj:  Math.max(8, niv * 1.2 + 2), // m
        // ─ Seismic (P100-1/2013 zona Iași) ───────────────────────────────
        ag:          0.2,    // g
        Tc:          1.6,    // s
        zonaSeism:   'E',
        // ─ Timestamp ─────────────────────────────────────────────────────
        updatedAt:   new Date().toISOString(),
      };

      // Notifică toți abonații
      Object.values(subscribers).forEach(fn => {
        try { fn(_computed); } catch(e) { console.warn('[DataBus] subscriber error:', e); }
      });

      // Emite eveniment global pentru debugging / integrări externe
      document.dispatchEvent(new CustomEvent('urbanx:building-updated', { detail: _computed }));
      console.log('[UrbanX DataBus] ✅ Updated — nrApt:', nrApt, '| SC:', Math.round(_computed.SC), '| SDA:', Math.round(_computed.SDA));
    },

    // ── Abonare la actualizări ────────────────────────────────────────────
    subscribe(id, fn) {
      subscribers[id] = fn;
      if(_computed) fn(_computed); // date imediate dacă există
    },
    unsubscribe(id) { delete subscribers[id]; },

    // ── Acces direct la datele curente ───────────────────────────────────
    get()    { return _computed; },
    isReady(){ return _computed !== null; },

    // ── Utilitar: returnează summary pentru afișare în alte rapoarte ──────
    getSummary() {
      if(!_computed) return null;
      const d = _computed;
      return {
        headline: `${d.nrApt} apt. · ${Math.round(d.SC)}m² SC · ${Math.round(d.SDA)}m² SDA · P+${d.niv-1}E H=${d.H.toFixed(1)}m`,
        parcaje:  `Necesar ${d.parcajeNec} loc. (${d.nrApt} apt × 1.2) — PMR ${d.parcajePMR}`,
        energie:  `U_perete=${d.uWall} W/m²K · U_geam=${d.uWin} W/m²K · HDD=${d.hddIasi}`,
        trafic:   `${d.tripuriOra} vehicule/oră vârf (${d.tripuriZi} total/zi)`,
        geotech:  `${d.nrForaje} foraje min. × ${d.adancForaj}m adâncime`,
        seismic:  `Zona ${d.zonaSeism}, ag=${d.ag}g, Tc=${d.Tc}s — structură BA C25/30`,
      };
    },
  };
})();
