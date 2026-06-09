// ═══════════════════════════════════════════════════════════════════════════
// 37-floor-logic.js — Planuri diferențiate per nivel și funcțiune
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// CE REZOLVĂ:
//   Fiecare nivel are plan specific funcțiunii și poziției în clădire:
//
//   rezCol:  Parter = hol intrare + comercial opțional
//            Etaje 1..N-1 = apartamente (mix sliders)
//            Ultimul etaj = penthouse retras dacă ph>0
//
//   rezInd:  Parter = living + bucătărie + baie + garaj + terasă
//            Etaje = dormitoare + băi + birou + dressing
//
//   birouri: Parter = recepție lobby + securitate + cafeteria + conf mari
//            Etaje = open-space + birouri celulare + conf mici + sanitare
//            Ultimul etaj = management suite (birouri premium)
//
//   hotel:   Parter = lobby + recepție + restaurant + bar + spa + conf
//            Etaje = camere standard/duble/suite (coridor central)
//            Ultimul etaj = suite premium + terasa panoramică
//
//   com:     Parter = magazine cu vitrine mari + depozit + sanitare
//            Etaj (dacă există) = birouri administrative
//
//   mixt_com_rez: Parter = comercial (vitrine) + hol intrare rezidențial
//                 Etaje = apartamente
//
// INSTALARE: după 36-vtour-fixes.js în index.html
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (typeof _rvFloor !== 'undefined' && typeof _RV !== 'undefined') { cb(); return; }
    setTimeout(() => waitReady(cb, n + 1), 200);
  }

  waitReady(() => {
    _patchFloorLogic();
    console.log('[FloorLogic v1] ✅ planuri diferențiate per nivel și funcțiune');
  });

  // ═══════════════════════════════════════════════════════════════════════
  // PATCH _rvFloor — interceptăm pentru a adăuga logica per nivel
  // ═══════════════════════════════════════════════════════════════════════

  function _patchFloorLogic() {
    if (window._FLOOR_LOGIC_PATCHED) return;
    window._FLOOR_LOGIC_PATCHED = true;

    // Hook pe _rvRegenFloors — după regenerare, enrichim cu logica per nivel
    const origRegen = window._rvRegenFloors;
    window._rvRegenFloors = function () {
      const result = origRegen?.apply(this, arguments);
      _enrichAllFloors();
      return result;
    };

    // Și la render
    const origRender = window._rvRender;
    if (origRender && !window._FLOOR_LOGIC_RENDER) {
      window._FLOOR_LOGIC_RENDER = true;
      window._rvRender = function () {
        const r = origRender.apply(this, arguments);
        setTimeout(_enrichAllFloors, 150);
        return r;
      };
    }

    setTimeout(_enrichAllFloors, 600);
  }

  function _enrichAllFloors() {
    const b = window._RV?.building;
    const P = window._RV?.parcelParams;
    const floors = window._RV?.floors;
    if (!b || !P || !Array.isArray(floors) || !floors.length) return;

    const fnKey = window._rvMixV2 ? window._rvMixV2(P) : 'rezCol';
    const niv = b.niv || floors.length;
    const isLastFloor = (fi) => fi === niv - 1;
    const isGround = (fi) => fi === 0;

    floors.forEach((fl, fi) => {
      if (!fl?.rects) return;

      // Adăugăm metadata nivel
      fl._floorType = _getFloorType(fnKey, fi, niv, window._RV.unitMix);
      fl._floorLabel = _getFloorLabel(fl._floorType, fi);

      // Adăugăm camere speciale care lipsesc din planul generic
      _enrichFloor(fl, fl._floorType, b, fi, niv);
    });
  }

  // ── Determină tipul etajului ───────────────────────────────────────────
  function _getFloorType(fnKey, fi, niv, mix) {
    const isGround = fi === 0;
    const isLast = fi === niv - 1;
    const isPH = mix?.ph > 0 && isLast && niv > 2;

    switch (fnKey) {
      case 'rezCol':
        if (isGround) return 'rezCol_parter';
        if (isPH)     return 'rezCol_penthouse';
        return 'rezCol_etaj';

      case 'rezInd':
        if (isGround) return 'rezInd_parter';
        return 'rezInd_etaj';

      case 'birouri':
        if (isGround) return 'birouri_parter';
        if (isLast && niv > 2) return 'birouri_management';
        return 'birouri_etaj';

      case 'hotel':
        if (isGround) return 'hotel_parter';
        if (isLast && niv > 2) return 'hotel_premium';
        return 'hotel_etaj';

      case 'com':
        if (isGround) return 'com_parter';
        return 'com_etaj_birouri';

      case 'mixt':
        if (isGround) return 'mixt_parter';
        return 'rezCol_etaj';

      default:
        return fnKey + (isGround ? '_parter' : '_etaj');
    }
  }

  function _getFloorLabel(type, fi) {
    const labels = {
      rezCol_parter:       'Parter — Hol intrare bloc',
      rezCol_etaj:         `Etaj ${fi} — Apartamente`,
      rezCol_penthouse:    'Penthouse — Ultimul etaj',
      rezInd_parter:       'Parter — Zona zi',
      rezInd_etaj:         `Etaj ${fi} — Zona noapte`,
      birouri_parter:      'Parter — Recepție + Lobby',
      birouri_etaj:        `Etaj ${fi} — Open Space + Birouri`,
      birouri_management:  'Etaj Management — Suite premium',
      hotel_parter:        'Parter — Lobby + Restaurant',
      hotel_etaj:          `Etaj ${fi} — Camere hotel`,
      hotel_premium:       'Etaj premium — Suite',
      com_parter:          'Parter — Spații comerciale',
      com_etaj_birouri:    `Etaj ${fi} — Birouri administrative`,
      mixt_parter:         'Parter — Comercial + Intrare rezidențial',
    };
    return labels[type] || `Etaj ${fi}`;
  }

  // ── Îmbogățim planul cu elemente specifice per tip etaj ───────────────
  function _enrichFloor(fl, type, b, fi, niv) {
    const { bW, bD } = b;
    const rects = fl.rects;

    switch (type) {

      // ── REZIDENȚIAL COLECTIV PARTER ─────────────────────────────────
      case 'rezCol_parter': {
        // Verificăm dacă există deja hol intrare
        const hasHolIntrare = rects.some(r => r.apt === -2 && r.t === 'hall');
        if (!hasHolIntrare) {
          // Adăugăm hol intrare bloc cu cutii poștale
          rects.push({
            t: 'hall', x: 0, y: bD - 3.0, w: bW, h: 3.0,
            lbl: '🏠 Hol intrare\n📮 Cutii poștale',
            apt: -2, zIdx: -1, normMin: 0,
            _enriched: true,
          });
        }
        // Marcăm camerele de la parter cu info extra
        rects.forEach(r => {
          if (r.apt > 0 && r.t === 'hall' && !r._enriched) {
            r.lbl = r.lbl || 'Hol apartament P';
          }
        });
        break;
      }

      // ── PENTHOUSE ────────────────────────────────────────────────────
      case 'rezCol_penthouse': {
        // Terasă mare pe acoperis
        const hasTerasa = rects.some(r => r.t === 'balcon' && r.w * r.h > 20);
        if (!hasTerasa) {
          rects.push({
            t: 'balcon', x: 0, y: 0, w: bW * 0.4, h: bD * 0.3,
            lbl: '🌆 Terasă\nAcoperiș',
            apt: 0, bal: true, _enriched: true,
          });
        }
        // Marcăm penthouse
        rects.forEach(r => {
          if (r.apt >= 0 && !r.bal && !r._enriched) {
            r._isPenthouse = true;
          }
        });
        break;
      }

      // ── REZIDENTIAL INDIVIDUAL PARTER ────────────────────────────────
      case 'rezInd_parter': {
        // Verificăm că avem zona zi completă
        const hasGaraj = rects.some(r => r.t === 'storage' && r.lbl?.includes('Garaj'));
        const hasTerasaP = rects.some(r => r.bal && r.lbl?.includes('Tera'));

        if (!hasGaraj && bW > 10) {
          rects.push({
            t: 'storage', x: bW * 0.7, y: bD - 3.5, w: bW * 0.3, h: 3.5,
            lbl: '🚗 Garaj\n/ Depozit',
            apt: 0, _enriched: true,
          });
        }
        // Label intrare principală
        if (fl.doors) {
          fl.doors.forEach(d => {
            if (d.type === 'main') d._label = 'Intrare principală';
          });
        }
        break;
      }

      // ── REZIDENTIAL INDIVIDUAL ETAJ ──────────────────────────────────
      case 'rezInd_etaj': {
        const hasDressing = rects.some(r => r.lbl?.toLowerCase().includes('dressing'));
        if (!hasDressing && bW > 12) {
          // Dressing lângă dormitorul master
          const master = rects.find(r => r.t === 'bedroom' && !r._enriched);
          if (master) {
            rects.push({
              t: 'storage', x: master.x, y: master.y + master.h, w: master.w * 0.5, h: Math.min(2.5, bD * 0.15),
              lbl: '👗 Dressing',
              apt: 0, _enriched: true,
            });
          }
        }
        break;
      }

      // ── BIROURI PARTER ───────────────────────────────────────────────
      case 'birouri_parter': {
        // Înlocuim/augmentăm cu recepție, lobby, securitate
        const hasReceptie = rects.some(r =>
          r.t === 'reception' || r.lbl?.toLowerCase().includes('recep'));

        if (!hasReceptie) {
          // Ștergem camerele generic de la parter și adăugăm funcțiuni specifice
          // (păstrăm core-urile)
          const cores = rects.filter(r => r.t === 'core');
          fl.rects = cores;

          fl.rects.push({
            t: 'reception', x: 0, y: bD * 0.55, w: bW * 0.55, h: bD * 0.45,
            lbl: '🏢 Recepție\n+ Lobby',
            apt: -2, zIdx: -1, _enriched: true,
          });
          fl.rects.push({
            t: 'office', x: bW * 0.55 + 0.2, y: bD * 0.55, w: bW * 0.45 - 0.2, h: bD * 0.22,
            lbl: '🔐 Securitate\n/ Control acces',
            apt: 0, _enriched: true,
          });
          fl.rects.push({
            t: 'kitchen', x: bW * 0.55 + 0.2, y: bD * 0.77 + 0.15, w: bW * 0.45 - 0.2, h: bD * 0.23 - 0.15,
            lbl: '☕ Cafeteria\n/ Lounge',
            apt: 0, _enriched: true,
          });
          fl.rects.push({
            t: 'living', x: 0, y: 0, w: bW * 0.65, h: bD * 0.55,
            lbl: '📋 Sală Conferință\nMare',
            apt: 1, _enriched: true,
          });
          fl.rects.push({
            t: 'office', x: bW * 0.65 + 0.2, y: 0, w: bW * 0.35 - 0.2, h: bD * 0.3,
            lbl: '🖥 Sală Training',
            apt: 1, _enriched: true,
          });
          fl.rects.push({
            t: 'bath', x: bW * 0.65 + 0.2, y: bD * 0.3 + 0.15, w: bW * 0.2 - 0.1, h: bD * 0.25,
            lbl: 'Sanitar M',
            apt: -1, zIdx: -1, _enriched: true,
          });
          fl.rects.push({
            t: 'wc', x: bW * 0.85 + 0.1, y: bD * 0.3 + 0.15, w: bW * 0.15 - 0.1, h: bD * 0.25,
            lbl: 'Sanitar F',
            apt: -1, zIdx: -1, _enriched: true,
          });
        }
        break;
      }

      // ── BIROURI ETAJ NORMAL ──────────────────────────────────────────
      case 'birouri_etaj': {
        // Etichetare mai clară
        rects.forEach(r => {
          if (r.t === 'office' && !r._enriched) {
            r.lbl = r.lbl || `Open Space\nEt.${fi}`;
          }
        });
        break;
      }

      // ── BIROURI MANAGEMENT (ultimul etaj) ────────────────────────────
      case 'birouri_management': {
        const cores = rects.filter(r => r.t === 'core');
        fl.rects = cores;
        // Birouri premium cu vedere panoramică
        fl.rects.push({
          t: 'office', x: 0, y: 0, w: bW * 0.38, h: bD * 0.6,
          lbl: '👔 Director\nGeneral', apt: 0, _enriched: true,
        });
        fl.rects.push({
          t: 'office', x: bW * 0.38 + 0.2, y: 0, w: bW * 0.28, h: bD * 0.6,
          lbl: '👔 CFO / COO', apt: 1, _enriched: true,
        });
        fl.rects.push({
          t: 'living', x: bW * 0.66 + 0.2, y: 0, w: bW * 0.34 - 0.2, h: bD * 0.6,
          lbl: '🏆 Board Room', apt: 2, _enriched: true,
        });
        fl.rects.push({
          t: 'kitchen', x: 0, y: bD * 0.6 + 0.2, w: bW * 0.35, h: bD * 0.4 - 0.2,
          lbl: '☕ Executive\nLounge', apt: 0, _enriched: true,
        });
        fl.rects.push({
          t: 'bath', x: bW * 0.35 + 0.2, y: bD * 0.6 + 0.2, w: bW * 0.65 - 0.4, h: bD * 0.4 - 0.2,
          lbl: 'Sanitare\nExecutive', apt: -1, _enriched: true,
        });
        break;
      }

      // ── HOTEL PARTER ─────────────────────────────────────────────────
      case 'hotel_parter': {
        const hasLobby = rects.some(r => r.lbl?.toLowerCase().includes('lobby'));
        if (!hasLobby) {
          const cores = rects.filter(r => r.t === 'core');
          fl.rects = cores;
          fl.rects.push({
            t: 'commercial', x: 0, y: bD * 0.5, w: bW * 0.6, h: bD * 0.5,
            lbl: '🏨 Lobby\n+ Recepție Hotel', apt: -2, zIdx: -1, _enriched: true,
          });
          fl.rects.push({
            t: 'living', x: bW * 0.6 + 0.2, y: bD * 0.5, w: bW * 0.4 - 0.2, h: bD * 0.3,
            lbl: '🍽 Restaurant', apt: 0, _enriched: true,
          });
          fl.rects.push({
            t: 'kitchen', x: bW * 0.6 + 0.2, y: bD * 0.8 + 0.1, w: bW * 0.4 - 0.2, h: bD * 0.2 - 0.1,
            lbl: '🍹 Bar / Lounge', apt: 0, _enriched: true,
          });
          fl.rects.push({
            t: 'office', x: 0, y: 0, w: bW * 0.5, h: bD * 0.5,
            lbl: '🏋 Fitness\n+ Wellness', apt: 1, _enriched: true,
          });
          fl.rects.push({
            t: 'bath', x: bW * 0.5 + 0.2, y: 0, w: bW * 0.5 - 0.2, h: bD * 0.3,
            lbl: '🧖 Spa', apt: 1, _enriched: true,
          });
          fl.rects.push({
            t: 'living', x: bW * 0.5 + 0.2, y: bD * 0.3 + 0.15, w: bW * 0.5 - 0.2, h: bD * 0.2,
            lbl: '🎤 Sală Conferință', apt: 2, _enriched: true,
          });
        }
        break;
      }

      // ── HOTEL ETAJ NORMAL ────────────────────────────────────────────
      case 'hotel_etaj': {
        // Etichetare camere hotel cu număr cameră
        let camNr = fi * 100 + 1;
        rects.forEach(r => {
          if (r.t === 'bedroom' && !r._enriched) {
            r.lbl = `🛏 Cam. ${camNr++}\n${(r.w * r.h).toFixed(0)}m²`;
          }
        });
        break;
      }

      // ── HOTEL ETAJ PREMIUM ───────────────────────────────────────────
      case 'hotel_premium': {
        const cores = rects.filter(r => r.t === 'core');
        fl.rects = cores;
        const sW = Math.min(bW * 0.5, 12), sD = Math.min(bD * 0.7, 14);
        const nSuite = Math.max(1, Math.floor(bW / (sW + 0.3)));
        for (let i = 0; i < nSuite; i++) {
          fl.rects.push({
            t: 'bedroom', x: i * (sW + 0.3), y: 0, w: sW * 0.65, h: sD * 0.6,
            lbl: `🌟 Suite ${i + 1}\nDormitor`, apt: i, _enriched: true,
          });
          fl.rects.push({
            t: 'living', x: i * (sW + 0.3) + sW * 0.65 + 0.1, y: 0, w: sW * 0.35 - 0.1, h: sD * 0.6,
            lbl: 'Living\nSuite', apt: i, _enriched: true,
          });
          fl.rects.push({
            t: 'bath', x: i * (sW + 0.3), y: sD * 0.6 + 0.1, w: sW, h: sD * 0.4 - 0.1,
            lbl: '🛁 Baie\nLux', apt: i, _enriched: true,
          });
        }
        fl.rects.push({
          t: 'balcon', x: 0, y: sD + 0.2, w: bW, h: bD - sD - 0.4,
          lbl: '🌇 Terasă\nPanoramică', apt: -1, bal: true, _enriched: true,
        });
        break;
      }

      // ── COMERCIAL PARTER ─────────────────────────────────────────────
      case 'com_parter': {
        rects.forEach(r => {
          if (r.t === 'commercial' && !r._enriched) {
            r.lbl = r.lbl || '🏪 Spațiu comercial\n(vitrină stradă)';
          }
        });
        break;
      }

      // ── COMERCIAL ETAJ BIROURI ───────────────────────────────────────
      case 'com_etaj_birouri': {
        // Dacă etajul e generat ca rezidențial, îl convertim în birouri
        const hasOffice = rects.some(r => r.t === 'office');
        if (!hasOffice) {
          const cores = rects.filter(r => r.t === 'core');
          fl.rects = cores;
          fl.rects.push({
            t: 'office', x: 0, y: 0, w: bW * 0.7, h: bD,
            lbl: `🖥 Birouri Administrative\nEt.${fi}`, apt: 0, _enriched: true,
          });
          fl.rects.push({
            t: 'bath', x: bW * 0.7 + 0.2, y: 0, w: bW * 0.3 - 0.2, h: bD * 0.4,
            lbl: 'Sanitare', apt: -1, _enriched: true,
          });
          fl.rects.push({
            t: 'kitchen', x: bW * 0.7 + 0.2, y: bD * 0.4 + 0.15, w: bW * 0.3 - 0.2, h: bD * 0.3,
            lbl: '☕ Break Room', apt: 0, _enriched: true,
          });
          fl.rects.push({
            t: 'storage', x: bW * 0.7 + 0.2, y: bD * 0.7 + 0.2, w: bW * 0.3 - 0.2, h: bD * 0.3 - 0.2,
            lbl: '📦 Arhivă\n/ Depozit', apt: 0, _enriched: true,
          });
        }
        break;
      }

      // ── MIXT PARTER ──────────────────────────────────────────────────
      case 'mixt_parter': {
        const hasComercial = rects.some(r => r.t === 'commercial');
        if (!hasComercial) {
          const cores = rects.filter(r => r.t === 'core');
          fl.rects = cores;
          fl.rects.push({
            t: 'commercial', x: 0, y: 0, w: bW * 0.65, h: bD,
            lbl: '🏪 Spațiu Comercial P0\n(vitrină stradă)', apt: 0, _enriched: true,
          });
          fl.rects.push({
            t: 'hall', x: bW * 0.65 + 0.2, y: bD * 0.4, w: bW * 0.35 - 0.2, h: bD * 0.6,
            lbl: '🏠 Hol intrare\nRezidențial',
            apt: -2, zIdx: -1, _enriched: true,
          });
          fl.rects.push({
            t: 'storage', x: bW * 0.65 + 0.2, y: 0, w: bW * 0.35 - 0.2, h: bD * 0.4,
            lbl: '📦 Depozit\nBack-office', apt: 0, _enriched: true,
          });
        }
        break;
      }
    }
  }

})();
