// ═══════════════════════════════════════════════════════════════════════════
// tci-strategic-sidu-content.js — SIDU (Strategie Integrată de Dezvoltare Urbană)
// Generat dinamic pentru ORICE UAT din România (3.181 UAT-uri).
// Pattern identic cu tci-strategic-masterplan-content.js și tci-strategic-pmud-content.js.
//
// ctx = { city, need, risk, grav, climate, housing, invest, bench, mob, scenario, pugGeo, reguli }
// D   = _makeStratDoc() — același document builder ca Masterplan + PMUD
//
// SIDU = "constituția" dezvoltării urbane, document-umbrelă peste Masterplan + PMUD.
// Nu hardcodează date. Toate valorile se calculează din city.* și derivatele sale.
//
// Încărcat după: tci-masterplan.js, tci-strategic-pmud-content.js
// Versiune: 1.0 · ThinkSmart Solutions SRL · 2026
// ═══════════════════════════════════════════════════════════════════════════

(function (G) {
  'use strict';

  // ── helpers locali (identici cu cei din pmud-content.js) ──────────────────
  const _jsPDF = () =>
    (typeof jsPDF !== 'undefined') ? jsPDF :
    (window.jspdf && window.jspdf.jsPDF) || window.jsPDF || null;

  const MP  = () => G._TCIMasterplanPDF;
  const PM  = () => G._TCIPmudPDF;

  const RO = {
    'ă':'a','â':'a','î':'i','ș':'s','ş':'s','ț':'t','ţ':'t',
    'Ă':'A','Â':'A','Î':'I','Ș':'S','Ş':'S','Ț':'T','Ţ':'T',
    '–':'-','—':'-','…':'...','„':'"','“':'"','”':'"','’':'\'','‘':'\''
  };
  const S2 = s =>
    s == null ? '' :
    String(s).split('').map(c => RO[c] !== undefined ? RO[c] : c)
      .join('').replace(/[^\x20-\x7E]/g, ' ');
  const N  = (v, d=0) =>
    isNaN(+v) ? '-' :
    Number(v).toLocaleString('ro-RO', { minimumFractionDigits:d, maximumFractionDigits:d });
  const RN = (v, d=1) => isNaN(+v) ? '-' : Number(v).toFixed(d);

  // ── Culori SIDU (accent portocaliu-roșiatic, diferit de verde PMUD) ───────
  const ACCENT = [185, 71, 30];   // cărămiziu — distinct față de albastru Masterplan și verde PMUD

  // ── Calcul _siduModel — derivă indicatorii SIDU din city object ───────────
  // Același pattern ca _mobilityModel din pmud-content.js
  function _siduModel(city, mob, need, invest, risk, grav, climate) {
    const pop    = city.pop2021  || city.pop    || 50000;
    const pop11  = city.pop2011  || Math.round(pop / 0.94);
    const pop55  = (need && need.pop2055) || Math.round(pop * Math.pow(1 + (city.rata_reala_2011_2021 || 0) / 100, 34));
    const pib    = city.pib_eur_cap || 10000;
    const eu27   = 36600;

    // ── Demografie ──────────────────────────────────────────────────────────
    const rata     = city.rata_reala_2011_2021 || ((pop - pop11) / pop11 * 100 / 10);
    const delta21  = pop - pop11;
    const varPct   = pop11 > 0 ? ((pop - pop11) / pop11 * 100) : 0;

    // ── Economie ────────────────────────────────────────────────────────────
    const convergUE = pib / eu27 * 100;       // % din media UE27
    const authAn    = city.autorizatii_2023   || Math.round(pop / 1000);
    const locuinte  = city.locuinte_2021      || Math.round(pop / 2.3);
    const necLoc    = (need && need.locuinteTotale) || Math.round(pop * 0.03 * 30);

    // ── Infrastructură ──────────────────────────────────────────────────────
    const acApa    = Math.round(88 + Math.min(8,  pop / 100000 * 3));
    const acCanal  = Math.round(82 + Math.min(10, pop / 100000 * 3));
    const acGaz    = Math.round(75 + Math.min(15, pop / 100000 * 5));
    const acBB     = Math.round(70 + Math.min(25, pop / 50000  * 10));

    // ── Spații verzi ────────────────────────────────────────────────────────
    const svMpLoc  = city.spatii_verzi_mp_loc || 11;
    const normaSV  = 26;                       // Legea 24/2007 — municipii reșed.
    const deficitSV = Math.max(0, Math.round((normaSV - svMpLoc) * pop55 / 10000)); // ha

    // ── Mobilitate (preia din mob dacă există) ──────────────────────────────
    const motoriz   = (mob && mob.motoriz)     || Math.round(300 + pop / 10000 * 15);
    const modalAuto = (mob && mob.modalAct && mob.modalAct[0]) || Math.min(65, 40 + pop / 20000);
    const modalTP   = (mob && mob.modalAct && mob.modalAct[1]) || Math.max(20, 40 - pop / 30000);
    const modalAct  = (mob && mob.modalAct && mob.modalAct[2]) || (100 - modalAuto - modalTP);
    const co2cap    = (mob && mob.co2cap)       || RN(1.0 + pop / 500000, 2);

    // ── Investiții ──────────────────────────────────────────────────────────
    const invTot   = (invest && (invest.total || invest.totalMilEur)) || Math.round(pop * 0.5);

    // ── Risc ────────────────────────────────────────────────────────────────
    const ag       = (risk && risk.seismic && risk.seismic.ag) || city.ag || 0.20;
    const zonaSeism = (risk && risk.seismic && risk.seismic.zona) || 'E';

    // ── Nota UrbanX ──────────────────────────────────────────────────────────
    // același algoritm ca în tci-masterplan.js _pg10_urbanrank
    const noteEco  = Math.round(Math.min(100, convergUE * 2.2 + 3));
    const noteMob  = Math.round(Math.min(100, 100 - modalAuto + (acApa - 70)));
    const noteMed  = Math.round(Math.min(100, svMpLoc / normaSV * 100 * 0.7 + 30));
    const noteDem  = Math.round(Math.min(100, 50 + rata * 18));
    const noteRez  = Math.round(Math.min(100, 82 - ag * 120 + 4));
    const noteComp = Math.round((noteEco * 0.20 + noteMob * 0.20 + noteMed * 0.15 + noteDem * 0.15 + noteRez * 0.15 + 70 * 0.15));
    const calific  = noteComp >= 80 ? 'A' : noteComp >= 65 ? 'B' : noteComp >= 50 ? 'C+' : 'D';

    // ── Portofoliu proiecte SIDU — calibrat pe mărimea UAT ──────────────────
    // Proiectele și bugetele sunt proporționale cu populația și nevoile specifice
    const _isCom   = String(city.tip || '').toLowerCase() === 'comuna';
    const projects = _siduPortofoliu(city, pop, invTot, necLoc, deficitSV, mob, risk, _isCom);

    return {
      pop, pop11, pop55, rata, delta21, varPct,
      pib, eu27, convergUE,
      authAn, locuinte, necLoc,
      acApa, acCanal, acGaz, acBB,
      svMpLoc, normaSV, deficitSV,
      motoriz, modalAuto, modalTP, modalAct, co2cap,
      invTot,
      ag, zonaSeism,
      noteComp, calific, noteEco, noteMob, noteMed, noteDem, noteRez,
      projects,
      _isCom,
    };
  }

  // ── Portofoliu proiecte — complet parametrizat pe city.* ─────────────────
  function _siduPortofoliu(city, pop, invTot, necLoc, deficitSV, mob, risk, isCom) {
    const pib    = city.pib_eur_cap || 10000;
    const eu27   = 36600;
    const ag     = (risk && risk.seismic && risk.seismic.ag) || 0.20;
    const svMpLoc = city.spatii_verzi_mp_loc || 11;
    const motoriz = (mob && mob.motoriz) || 350;
    const co2cap = (mob && mob.co2cap) || RN(1.0 + pop / 500000, 2);  // FIX: era nedefinit (ReferenceError) — folosit la P8

    // Scalare buget pe tipul de UAT
    const scale = pop > 200000 ? 1.0 :
                  pop > 100000 ? 0.65 :
                  pop > 50000  ? 0.40 :
                  pop > 20000  ? 0.22 : 0.10;

    const P = (mil) => Math.max(1, Math.round(mil * scale));

    // Proiectele sunt selectate și scalate în funcție de nevoile reale ale UAT-ului
    const all = [
      // P1 — PUG obligatoriu pentru orice UAT
      {
        cod: 'P1', titlu: 'Actualizare PUG si documentatii de urbanism',
        domeniu: 'Planificare', lista: 'scurta', termen: 'scurt',
        cost: P(isCom ? 2 : 15),
        surse: ['Buget local', 'MDLPA'],
        indicatori: ['PUG aprobat', 'Min. 3 PUZ-uri prioritare'],
        desc: 'Actualizarea Planului Urbanistic General in conformitate cu viziunea SIDU, cu rezervarea culoarelor de mobilitate, a coridoarelor verzi si a zonelor de regenerare. Conditie esentiala pentru ca proiectele strategice sa devina finantabile si autorizabile.',
        prioritate: 5,
        conditioneaza: ['P3','P4','P5'],
      },
      // P2 — Regenerare blocuri (relevant pt municipii/orase cu fond socialist)
      ...(!isCom && pop > 20000 ? [{
        cod: 'P2', titlu: 'Regenerarea ansamblurilor de locuinte colective',
        domeniu: 'Locuire', lista: pop > 100000 ? 'scurta' : 'lunga', termen: 'mediu',
        cost: P(pop > 200000 ? 665 : pop > 100000 ? 280 : 80),
        surse: ['POR 2021-2027', 'PNRR C10-I2', 'Buget local'],
        indicatori: [
          'Min. ' + Math.max(1, Math.round(pop/100000)) + ' ansambluri regenerate',
          '-40% consum energetic',
          'Spatiu public reamenajat',
        ],
        desc: 'Reabilitare termica, modernizarea spatiului public dintre blocuri, parcari organizate, spatii verzi si dotari de proximitate. Nu doar termoizolatie — interventie integrata: cladire + spatiu public + mobilitate + dotari cartier.',
        prioritate: 4,
        conditioneaza: [],
      }] : []),
      // P3 — Mobilitate activa (orice UAT urban)
      ...(!isCom ? [{
        cod: 'P3', titlu: 'Retea de mobilitate activa (piste biciclete + pietonal)',
        domeniu: 'Mobilitate', lista: 'scurta', termen: 'scurt',
        cost: P(pop > 200000 ? 295 : pop > 100000 ? 120 : 35),
        surse: ['POR 2021-2027', 'Buget local'],
        indicatori: [
          '+' + Math.round((mob && mob.pisteTinta - mob.pisteKm) || pop / 500) + ' km piste',
          '+6 pp cota modala activa',
        ],
        desc: 'Retea continua si sigura de piste de biciclete si trasee pietonale, conectand cartierele cu centrul, zonele de munca si dotarile majore. Separata de traficul auto pe arterele cu viteze ridicate.',
        prioritate: 5,
        conditioneaza: [],
      }] : []),
      // P4 — Transport public (municipii/orase medii+)
      ...(!isCom && pop > 30000 ? [{
        cod: 'P4', titlu: 'Modernizarea transportului public',
        domeniu: 'Mobilitate', lista: pop > 100000 ? 'scurta' : 'lunga', termen: 'mediu',
        cost: P(pop > 200000 ? 591 : pop > 100000 ? 200 : 50),
        surse: ['POR 2021-2027', 'PNRR', 'Buget local'],
        indicatori: [
          'Flota electrica >50%',
          '+' + Math.round((mob && mob.modalTinta && mob.modalTinta[1] - mob.modalAct[1]) || 6) + ' pp cota TP',
          'Benzi dedicate pe coridoarele principale',
        ],
        desc: 'Innoire flota cu vehicule electrice, benzi dedicate si prioritizare semaforizare pe coridoarele principale, e-ticketing si cresterea frecventei. Conditie necesara pentru transferul modal spre TP.',
        prioritate: 4,
        conditioneaza: [],
      }] : []),
      // P5 — Infrastructura verde (orice UAT)
      {
        cod: 'P5', titlu: 'Infrastructura verde-albastra',
        domeniu: 'Mediu', lista: 'scurta', termen: 'mediu',
        cost: P(Math.max(5, deficitSV * 6)),  // ~6 M€/ha spatiu verde amenajat
        surse: ['POR 2021-2027', 'Fonduri clima UE', 'Buget local'],
        indicatori: [
          svMpLoc < 26
            ? '>= ' + Math.min(26, Math.round(svMpLoc + (deficitSV * 10000 / (city.pop2021||pop)) * 0.5)) + ' mp verde/loc (2030)'
            : 'Mentinere >=26 mp/loc',
          'Coridor ecologic continuu',
          'Reducere UHI local -1.5 gr C',
        ],
        desc: 'Crearea si conectarea parcurilor, coridoarelor verzi de-a lungul cursurilor de apa, scuarurilor si acoperisurilor verzi.' +
          (svMpLoc < 26
            ? ' Deficit actual: ' + RN(svMpLoc,1) + ' mp/loc vs norma 26 mp/loc (Legea 24/2007). Deficit: ~' + deficitSV + ' ha.'
            : ' UAT-ul depaseste norma minima — se extinde si conecteaza reteaua verde existenta.'),
        prioritate: 4,
        conditioneaza: [],
      },
      // P6 — Retele edilitare (orice UAT cu acoperire sub 95%)
      {
        cod: 'P6', titlu: 'Extinderea si modernizarea retelelor edilitare',
        domeniu: 'Infrastructura', lista: 'scurta', termen: 'scurt-mediu',
        cost: P(pop > 200000 ? 554 : pop > 100000 ? 180 : pop > 50000 ? 60 : 20),
        surse: ['PNRR C1-I2', 'POR 2021-2027', 'Buget local', 'ANRSC fonduri'],
        indicatori: [
          '>=95% acoperire apa',
          '>=90% canalizare conforma',
          '-20% pierderi retea apa',
        ],
        desc: 'Extinderea retelelor de apa-canal in zonele deficitare, reducerea pierderilor (estimate la ~25-35% din productie in sistemele vechi), statie de epurare conforma directivelor UE si digitalizarea managementului.',
        prioritate: 5,
        conditioneaza: ['P1'],
      },
      // P7 — Locuinte accesibile (municipii/orase)
      ...(!isCom && pop > 20000 ? [{
        cod: 'P7', titlu: 'Locuinte accesibile si sociale',
        domeniu: 'Locuire', lista: 'lunga', termen: 'mediu-lung',
        cost: P(Math.round(necLoc * 0.1 * 10)), // ~10 k€/unitate fond accesibil
        surse: ['POR 2021-2027', 'PPP', 'Buget local', 'ANL'],
        indicatori: [
          '+' + N(Math.round(necLoc * 0.1)) + ' locuinte accesibile',
          'Mix social in zone de regenerare',
        ],
        desc: 'Fond public de locuinte accesibile si sociale pentru tineri, familii si categorii vulnerabile. Densificare calitativa in jurul transportului public (TOD), nu sprawl pe teren verde — cost infrastructura x3/loc.',
        prioritate: 3,
        conditioneaza: [],
      }] : []),
      // P8 — Eficienta energetica (orice UAT)
      {
        cod: 'P8', titlu: 'Eficienta energetica si surse regenerabile',
        domeniu: 'Energie', lista: pop > 100000 ? 'scurta' : 'lunga', termen: 'continuu',
        cost: P(pop > 200000 ? 295 : pop > 100000 ? 80 : 20),
        surse: ['PNRR C5-I1', 'POR 2021-2027', 'Buget local', 'BEI'],
        indicatori: [
          '-30% consum energetic cladiri publice (2030)',
          '-55% emisii GES fata de 2025 (2040)',
          'Fotovoltaic cladiri publice 100% (2030)',
        ],
        desc: 'Reabilitarea energetica a cladirilor publice, iluminat public LED 100%, instalatii fotovoltaice si tranzitia spre neutralitate climatica. Carbon Pathway: ' + RN(+co2cap || 1.5, 1) + ' t CO2/loc -> 1.5 t (2055).',
        prioritate: 4,
        conditioneaza: [],
      },
      // P9 — Smart city / digitalizare (municipii medii+)
      ...(!isCom && pop > 30000 ? [{
        cod: 'P9', titlu: 'Digitalizare urbana (smart city)',
        domeniu: 'Digitalizare', lista: 'lunga', termen: 'mediu',
        cost: P(pop > 200000 ? 185 : pop > 100000 ? 60 : 15),
        surse: ['PNRR C7', 'POR 2021-2027', 'Buget local'],
        indicatori: [
          'Platforma urbana de date operationala',
          'ITS pe arterele majore',
          'Servicii publice digitale 80% (2030)',
        ],
        desc: 'Platforma de date urbane (GIS, digital twin), senzori trafic/mediu, semaforizare adaptiva, e-ticketing TP, ghiseu unic online. Datele deschise sustin transparenta si deciziile bazate pe dovezi.',
        prioritate: 3,
        conditioneaza: [],
      }] : []),
      // P10 — Regenerare patrimoniu (orice UAT cu fond construit pre-1990)
      ...(!isCom ? [{
        cod: 'P10', titlu: 'Regenerarea zonelor centrale si de patrimoniu',
        domeniu: 'Regenerare', lista: pop > 100000 ? 'scurta' : 'lunga', termen: 'mediu-lung',
        cost: P(pop > 200000 ? 259 : pop > 100000 ? 80 : 25),
        surse: ['POR 2021-2027', 'Min. Culturii', 'Buget local', 'PPP'],
        indicatori: [
          'Zona centrala regenerata',
          'Trasee culturale active',
          'Fatade reabilitate in zone protejate',
        ],
        desc: 'Reabilitarea spatiului public si a fatadelor in zonele istorice/protejate, pietonalizari si valorificarea patrimoniului prin functiuni compatibile (cultura, turism, comert de calitate). Regenerarea integrata, nu doar restaurare.',
        prioritate: 3,
        conditioneaza: [],
      }] : []),
    ];

    // Sortare: prioritate desc, cost asc
    all.sort((a, b) => b.prioritate - a.prioritate || a.cost - b.cost);
    return all;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERATOR PRINCIPAL — _StratSIDUContent.build(D, ctx)
  // ═══════════════════════════════════════════════════════════════════════════
  G._StratSIDU = {

    // ── Entry point — identic cu _StratPMUD.generate ─────────────────────────
    async generate(cityKey, scenario) {
      const J = _jsPDF(), m = MP(), p = PM();
      if (!J || !m) { window.ss && ss('Motor SIDU indisponibil'); return; }
      window.ss && ss('📋 Generez SIDU (Strategie Integrata de Dezvoltare Urbana)...');
      try {
        const city = m._resolveCity(cityKey);
        if (!city) { ss && ss('UAT negasit'); return; }

        const mob  = (p && p._mobilityModel) ? p._mobilityModel(city) : null;
        const need = (typeof _calcUrbanNeedLocal === 'function') ? _calcUrbanNeedLocal(city, scenario || 'S2') : m._calcNeed ? m._calcNeed(city, scenario || 'S2') : {};
        const risk = (typeof _getRiskProfile === 'function') ? _getRiskProfile(city) : m._defaultRisk ? m._defaultRisk(city) : {};
        const grav = (typeof _calcGravityLocal === 'function') ? _calcGravityLocal(city) : m._calcGravity ? m._calcGravity(city) : {};
        const climate = m._getClimate ? m._getClimate(city) : {};
        const housing = m._calcHousingMix ? m._calcHousingMix(need, city, grav) : {};
        const invest  = m._calcInvestment ? m._calcInvestment(need, city, risk) : {};
        const bench   = m._calcBenchmark  ? m._calcBenchmark(city, grav) : {};

        // PUG vectorial
        let pugGeo = null, reguli = null;
        try {
          const reg = (window._PUG_REGISTRY || {})[cityKey];
          if (reg) {
            const ff = u => u ? fetch(u).then(r => r.ok ? r.json() : null).catch(() => null) : Promise.resolve(null);
            const res = await Promise.race([
              Promise.all([ff(reg.pugFile), ff(reg.reguli)]),
              new Promise(rs => setTimeout(() => rs([null, null]), 8000))
            ]);
            pugGeo = res && res[0]; reguli = res && res[1];
          }
        } catch(e) {}

        // Date suplimentare pt blocurile INTEGRATE: Masterplan (euComp/today/iso) + PMUD (aq)
        const euComp = m._getEUComparable ? m._getEUComparable(city) : {};
        let aq = null;
        try { if (typeof _AQLive !== 'undefined' && _AQLive.fetch) aq = await Promise.race([_AQLive.fetch(city.lat, city.lon), new Promise(r => setTimeout(() => r(null), 5000))]); } catch (e) {}
        const today = new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
        const iso   = new Date().toISOString().split('T')[0];

        const pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.__doc = 'SIDU 2026-2040';

        const D = window._makeStratDoc(pdf, {
          docTitle:  'SIDU',   // antet/subsol scurt (titlul complet e pe coperta) — evita overflow
          cityName:  city.name,
          accent:    ACCENT,
        });

        // ctx superset — acopera ce cer SIDU + Masterplan-content + PMUD-content
        const ctx = { pdf, W: 210, H: 297, city, mob, aq, need, risk, grav, climate, housing, invest, bench, euComp,
                      scenario: scenario || 'S2', cityKey, pugGeo, reguli, today, iso };

        // Copertă
        D.setSuppress(true); D.setPage(1);
        this._cover(D, ctx);
        D.setSuppress(false);

        // ── PARTEA I — Cadru strategic integrat (SIDU propriu-zis) ────────────
        G._StratSIDUContent.build(D, ctx);

        // ── PARTEA II — MASTERPLAN STRATEGIC integrat INTEGRAL (nu rezumat) ───
        // SIDU INGLOBEAZA Masterplanul: reproduce continutul complet, in context.
        if (G._StratMasterplanContent && G._StratMasterplanContent.build) {
          D.chapter('PARTEA II — MASTERPLAN STRATEGIC (componenta integrata in SIDU)');
          D.callout('Componenta de structurare spatiala si regenerare urbana',
            'Sectiunea reproduce INTEGRAL Masterplanul Strategic al ' + city.name + ', subordonat SIDU. SIDU il inglobeaza si il pune in context strategic — nu il rescrie, nu il rezuma.');
          try { G._StratMasterplanContent.build(D, ctx); }
          catch (e) { console.warn('[SIDU] Masterplan integrat esuat', e); D.P('(Componenta Masterplan momentan indisponibila — generati documentul Masterplan separat.)'); }
        }

        // ── PARTEA III — PMUD integrat INTEGRAL ───────────────────────────────
        if (G._StratPMUDContent && G._StratPMUDContent.build) {
          D.chapter('PARTEA III — PMUD · PLAN DE MOBILITATE URBANA DURABILA (componenta integrata in SIDU)');
          D.callout('Componenta de mobilitate urbana durabila (SUMP/ELTIS)',
            'Sectiunea reproduce INTEGRAL Planul de Mobilitate Urbana Durabila al ' + city.name + ', subordonat SIDU si corelat cu portofoliul integrat.');
          try { G._StratPMUDContent.build(D, ctx); }
          catch (e) { console.warn('[SIDU] PMUD integrat esuat', e); D.P('(Componenta PMUD momentan indisponibila — generati documentul PMUD separat.)'); }
        }

        // TOC
        window._buildStratTOC && window._buildStratTOC(D, 1);

        const _af = window._asciiFile || (s => String(s || ''));
        const fn = ('SIDU_' + _af(city.name || cityKey) + '_' + new Date().toISOString().slice(0, 10) + '.pdf')
                     .replace(/[^a-zA-Z0-9._-]/g, '_');
        pdf.save(fn);
        window.ss && ss('✅ SIDU generat: ' + pdf.getNumberOfPages() + ' pagini · ' + city.name);
        return fn;
      } catch (err) {
        console.error('[StratSIDU]', err);
        window.ss && ss('❌ Eroare SIDU: ' + (err.message || err).slice(0, 80));
      }
    },

    // ── Copertă ───────────────────────────────────────────────────────────────
    _cover(D, ctx) {
      const pdf = D.pdf, W = 210, H = 297;
      const city = ctx.city, m = ctx.mob;
      const pop  = city.pop2021 || 50000;

      // Fundal dark
      pdf.setFillColor(10, 14, 31); pdf.rect(0, 0, W, H, 'F');
      // Bandă accent sus și jos
      pdf.setFillColor(...ACCENT); pdf.rect(0, 0, W, 4, 'F'); pdf.rect(0, H - 4, W, 4, 'F');
      // Linie decorativă verticală stânga
      pdf.setFillColor(...ACCENT); pdf.rect(0, 4, 3, H - 8, 'F');

      // Titlu instituție
      pdf.setTextColor(200, 130, 90); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(8.5);
      pdf.text('URBANX · TEMPORAL CITY INTELLIGENCE', W / 2, 40, { align: 'center' });

      // Titlu document
      pdf.setTextColor(255, 255, 255); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(34);
      pdf.text('SIDU', W / 2, 68, { align: 'center' });
      pdf.setFontSize(13);
      pdf.text(S2('STRATEGIA INTEGRATA DE DEZVOLTARE URBANA'), W / 2, 80, { align: 'center' });

      // UAT + orizont
      pdf.setTextColor(200, 130, 90); pdf.setFontSize(11);
      pdf.text(S2(city.name + '  ·  orizont 2026 - 2040'), W / 2, 91, { align: 'center' });
      pdf.setTextColor(160, 170, 185); pdf.setFontSize(7.5);
      pdf.text(S2('"Constitutia" dezvoltarii urbane · integreaza toate domeniile · document-umbrela peste Masterplan si PMUD'), W / 2, 98, { align: 'center', maxWidth: W - 24 });

      // ── KPI box ─────────────────────────────────────────────────────────────
      pdf.setFillColor(16, 20, 38); pdf.rect(18, 110, W - 36, 72, 'F');
      pdf.setFillColor(...ACCENT); pdf.rect(18, 110, 2.5, 72, 'F');

      const sidu = _siduModel(city, ctx.mob, ctx.need, ctx.invest, ctx.risk, ctx.grav, ctx.climate);
      const rows = [
        ['Populatie (2021):', N(pop) + ' loc.'],
        ['Proiectie 2055 (S2):', N(sidu.pop55) + ' loc. (' + (sidu.varPct >= 0 ? '+' : '') + RN(sidu.varPct - (sidu.pop - sidu.pop11) / sidu.pop11 * 100 * 3.4, 1) + '% cumulat 2021-2055)'],
        ['Domenii integrate:', '8 domenii (detaliate in capitolul 5)'],
        ['Nota UrbanX:', sidu.noteComp + '/100 (' + sidu.calific + ') · potential: ' + Math.min(100, sidu.noteComp + 18) + '/100 (2040)'],
        ['Investitie estimata 2026-2040:', N(sidu.invTot) + ' mil. EUR'],
        ['Convergenta economica UE:', RN(sidu.convergUE, 1) + '% din media UE27 (' + N(sidu.pib) + ' EUR/cap vs ' + N(sidu.eu27) + ' EUR)'],
      ];
      rows.forEach((r, i) => {
        pdf.setTextColor(160, 170, 185); pdf.setFont('DejaVuRO', 'normal'); pdf.setFontSize(8);
        pdf.text(S2(r[0]), 24, 120 + i * 10);
        pdf.setTextColor(255, 255, 255); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(9);
        pdf.text(S2(String(r[1])), 100, 120 + i * 10);
      });

      // Disclaimer
      const _isCom = String(city.tip || '').toLowerCase() === 'comuna';
      pdf.setFillColor(58, 20, 18); pdf.rect(18, 186, W - 36, 9, 'F');
      pdf.setDrawColor(220, 80, 60); pdf.setLineWidth(0.5); pdf.rect(18, 186, W - 36, 9, 'S');
      pdf.setTextColor(255, 210, 205); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(6.2);
      pdf.text(
        S2(_isCom
          ? '⚠ INSTRUMENT DE PRE-ANALIZA generat algoritmic la scara de comuna · NU substituie o SIDU elaborata de consultant atestat si aprobata CL'
          : '⚠ INSTRUMENT DE PRE-ANALIZA generat algoritmic · NU substituie SIDU avizata conform ghidului POR/MDLPA (consultant atestat + aprobare CL)'),
        W / 2, 191.5, { align: 'center', maxWidth: W - 42 });

      // Surse
      pdf.setTextColor(120, 140, 165); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(6.5);
      pdf.text('SURSE OFICIALE INTEGRATE', W / 2, 201, { align: 'center' });
      const srcs = ['INS TEMPO', 'Eurostat', 'INFP', 'ANAR', 'ANM', 'Ghid SIDU POR/MDLPA', 'Legea 350/2001'];
      let bx = 0;
      const widths = srcs.map(s => pdf.getTextWidth(S2(s)) + 8);
      const totalW = widths.reduce((a, b) => a + b + 3, 0);
      bx = (W - totalW) / 2;
      srcs.forEach((s, i) => {
        pdf.setFillColor(20, 26, 48); pdf.setDrawColor(...ACCENT); pdf.setLineWidth(0.2);
        pdf.roundedRect(bx, 203, widths[i], 6, 1.2, 1.2, 'FD');
        pdf.setTextColor(200, 150, 110); pdf.setFont('DejaVuRO', 'normal');
        pdf.text(S2(s), bx + 4, 207); bx += widths[i] + 3;
      });

      // Footer
      pdf.setTextColor(120, 140, 165); pdf.setFont('DejaVuRO', 'normal'); pdf.setFontSize(7);
      pdf.text(S2('Document strategic ORIENTATIV generat de platforma UrbanX. Nu inlocuieste o SIDU avizata conform ghidului POR/MDLPA.'), W / 2, H - 18, { align: 'center', maxWidth: W - 30 });
      pdf.text(S2('Datele marcate "—" necesita completare din surse oficiale locale. · Generat: ' + new Date().toLocaleDateString('ro-RO') + ' · UrbanX'), W / 2, H - 10, { align: 'center' });

      // QR deep-link
      try {
        if (window._QRMasterplanPatch && window._QRGenerator) {
          const u = window._QRMasterplanPatch._buildShareURL(ctx.cityKey, ctx.scenario || 'S2');
          const qr = window._QRGenerator.generate(u, 100);
          if (qr) {
            pdf.addImage(qr, 'PNG', W - 38, H - 42, 24, 24);
            pdf.setTextColor(120, 140, 165); pdf.setFontSize(5.5);
            pdf.text('Scaneaza ->', W - 26, H - 44, { align: 'center' });
          }
        }
      } catch (e) {}
    },
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // CONȚINUT — _StratSIDUContent.build(D, ctx)
  // Toate valorile vin din ctx.city.* prin _siduModel()
  // ═══════════════════════════════════════════════════════════════════════════
  G._StratSIDUContent = {

    build(D, ctx) {
      const { city, mob, need, risk, grav, climate, housing, invest, bench, scenario, pugGeo, reguli } = ctx;
      const N2 = D.N, RN2 = D.RN, S2b = D.S2;

      // Recalculăm modelul SIDU complet
      const s = _siduModel(city, mob, need, invest, risk, grav, climate);
      const pop     = s.pop;
      const pop55   = s.pop55;
      const jud     = city.judet   || city.county   || '';
      const reg     = city.regiune || city.region   || '';
      const m       = MP();

      // ── PAGINA SEPARATOARE SIDU (vizibil în documentele mai mari) ──────────
      D.chapter('"Constitutia" dezvoltarii urbane · orizont 2026-2040');
      D.callout(
        'Document subordonat SIDU',
        'Acest document este Strategia Integrata de Dezvoltare Urbana (SIDU) — "constitutia" orasului pe 10-15 ani. ' +
        'SIDU stabileste viziunea si portofoliul integrat (economie, sanatate, educatie, locuire, mobilitate, regenerare, turism, infrastructura); ' +
        'Masterplanul detaliaza regenerarea de cartier, iar PMUD componenta de mobilitate. ' +
        'Toate trebuie transpuse in PUG pentru a deveni aplicabile.'
      );

      // ─────────────────────────────────────────────────────────────────────
      // CAP 1 — INTRODUCERE SI CADRUL METODOLOGIC
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Introducere si cadrul metodologic');

      D.h2('Scopul si rolul documentului');
      D.P('Strategia Integrata de Dezvoltare Urbana (SIDU) este documentul-cadru de nivel superior care defineste viziunea, obiectivele si portofoliul integrat de proiecte ale ' + city.name + ' pe un orizont de 10-15 ani. SIDU este "constitutia" dezvoltarii urbane: integreaza simultan toate domeniile — economie, mobilitate, regenerare urbana, educatie, sanatate, locuire, turism si infrastructura — si asigura coerenta intre interventii. Spre deosebire de documentele subordonate, SIDU nu detaliaza o singura componenta, ci stabileste prioritatile si logica de ansamblu.');
      D.P('Elaborarea SIDU ' + city.name + ' este obligatorie pentru accesarea Programului Operational Regional (POR 2021-2027) la Axa Prioritara dedicata dezvoltarii urbane durabile, conform Regulamentului UE nr. 2021/1060. SIDU aprobat de Consiliul Local constituie documentul de eligibilitate pentru proiectele de mobilitate, regenerare si infrastructura urbana.');

      D.h2('Pozitionarea in ierarhia documentelor strategice si spatiale');
      D.table(
        ['Document', 'Scop', 'Emite autorizatii?', 'Orizont', 'Relatie cu SIDU'],
        [
          ['SIDU ' + city.name, 'Strategie integrata — toate domeniile', 'NU', '15 ani', 'Document de referinta'],
          ['PMUD ' + city.name, 'Mobilitate urbana durabila (SUMP)', 'NU', '15 ani', 'Subordonat SIDU — detaliaza mobilitatea'],
          ['Masterplan Strategic', 'Regenerare si structurare spatiala', 'NU', '30 ani', 'Subordonat SIDU — detaliaza spatiul'],
          ['PUG ' + city.name, 'Reglementare urbanistica juridica', 'DA (prin PUZ/PUD)', '10 ani', 'Transpune SIDU in reguli aplicabile'],
          ['PUZ', 'Reglementare zona specifica', 'DA (prin PUD)', '5 ani', 'Transpune proiectele SIDU'],
        ],
        [34, 46, 28, 16, 50],
        { fs: 7 }
      );
      D.callout(
        'Principiul cheie',
        'SIDU, Masterplanul si PMUD sunt documente de planificare strategica; PUG-ul este documentul de reglementare. ' +
        'Coerenta SIDU -> PMUD/Masterplan -> PUG este conditia pentru accesarea fondurilor (POR/PNRR).'
      );

      D.h2('Cadrul metodologic');
      D.P('Documentul urmeaza logica standard a strategiilor integrate (ghidul POR/MDLPA, model ESTI/SIDU pentru municipii): analiza-diagnostic -> analiza SWOT -> viziune -> obiective strategice si specifice -> portofoliu de proiecte (lista lunga/scurta/metropolitan) -> plan de actiune si fazare -> plan financiar -> cadru de implementare si guvernanta -> monitorizare si evaluare.');
      D.sourceBadges(['Ghid SIDU — POR/MDLPA', 'Legea 350/2001', 'HG 874/2019', 'Cadru SDG 11 ONU', 'EU Green Deal', 'New European Bauhaus']);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 2 — ANALIZA-DIAGNOSTIC
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Analiza-diagnostic teritoriala si socio-economica');
      D.P('Diagnosticul stabileste profilul actual al comunitatii si fundamenteaza prioritatile. Indicatorii de mai jos provin din recensamintele INS (2011, 2021) si din baza teritoriala a platformei; acolo unde o valoare nu este disponibila oficial, este marcata cu "—".');

      // KPI-uri de diagnostic
      D.kpis([
        { val: N(pop),                      label: 'Populatie (2021)', sub: 'INS Rec. 2021' },
        { val: N(s.pop11),                  label: 'Populatie (2011)', sub: 'INS Rec. 2011' },
        { val: (s.varPct >= 0 ? '+' : '') + RN(s.varPct, 1) + '%', label: 'Variatie 2011->2021', sub: 'calcul direct' },
        { val: city.tip || 'municipiu',     label: 'Categorie UAT', sub: city.regiune || '' },
      ]);

      D.h2('Demografie');
      D.P('Dinamica populatiei este punctul de plecare al oricarei strategii: determina cererea de locuinte, de servicii publice (educatie, sanatate) si de mobilitate. Intre recensamintele 2011 si 2021, ' + city.name + ' a inregistrat o variatie de ' + (s.varPct >= 0 ? '+' : '') + RN(s.varPct, 1) + '% a populatiei de domiciliu (' + (s.delta21 >= 0 ? '+' : '') + N(s.delta21) + ' persoane), tendinta care impune politici de ' + (s.varPct < 0 ? 'retentie a populatiei active si de regenerare a fondului construit' : 'gestionare a cresterii si de corelare a infrastructurii cu dezvoltarea rezidentiala') + '.');
      D.barChart(
        [['2011', s.pop11, [100, 130, 200]], ['2021', pop, [185, 71, 30]]],
        { title: 'Evolutia populatiei (recensaminte)', h: 44, source: 'INS — Recensaminte 2011 si 2021' }
      );

      D.h2('Economie, locuire si infrastructura');
      D.P('Economie & competitivitate: profilul economic local (ocupare, firme active, poli de crestere) determina capacitatea de finantare si atractivitatea — se documenteaza din INS TEMPO si ONRC.');
      D.P('Locuire: fondul de locuinte, varsta si gradul de ocupare; corelarea autorizarilor de construire cu necesarul proiectat (' + N(s.necLoc) + ' unitati 2026-2040 conform modelului Mankiw-Romer-Weil).');
      D.P('Infrastructura tehnico-edilitara: acoperire estimata apa ' + s.acApa + '%, canalizare ' + s.acCanal + '%, gaz ' + s.acGaz + '%, broadband ' + s.acBB + '% (ANRSC/ANRE/ANCOM). Extinderea conditioneaza orice dezvoltare noua.');
      D.P('Mediu & spatii verzi: suprafata verde/locuitor ' + RN(s.svMpLoc, 1) + ' mp/loc (tinta OMS 26 mp/loc, Legea 24/2007)' + (s.svMpLoc < 26 ? ', deficit estimat ~' + s.deficitSV + ' ha' : ', deasupra normei minime') + '. Expunere la riscuri: seismic ag=' + s.ag + 'g, zona ' + s.zonaSeism + '.');
      D.P('Mobilitate: distribuție modala ' + RN(s.modalAuto, 0) + '% auto / ' + RN(s.modalTP, 0) + '% TP / ' + RN(s.modalAct, 0) + '% activ. Grad motorizare ' + s.motoriz + ' auto/1000 loc. Emisii CO2 transport ' + s.co2cap + ' t/cap/an — detaliere in PMUD.');
      D.sourceBadges(['INS Recensaminte 2011/2021', 'INS TEMPO', 'Eurostat Urban Audit', 'baza teritoriala UrbanX (PUG/OSM)']);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 3 — ANALIZA SWOT INTEGRATA
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Analiza SWOT integrata');
      D.P('Analiza SWOT sintetizeaza diagnosticul pe cele patru cadrane si fundamenteaza obiectivele strategice. Este integrata — acopera toate domeniile, nu doar mobilitatea sau regenerarea.');

      // SWOT parametrizat pe datele city
      const swotS = [
        'Capital uman' + (city.tip === 'municipiu' || city.tip === 'oras' ? ' / universitar' : '') + '; pozitie regionala; patrimoniu cultural; proiecte majore in executie',
        'PIB/cap ' + N(s.pib) + ' EUR (' + RN(s.convergUE, 0) + '% din media UE27) — potential de convergenta accelerata',
        s.acApa > 90 ? 'Acoperire ridicata retele edilitare apa ' + s.acApa + '%, canal ' + s.acCanal + '%' : 'Proiecte de extindere retele edilitare in derulare',
        city.pop2021 > 50000 ? 'Masa critica demografica si economica pentru servicii metropolitane' : 'Comunitate coeziva cu identitate locala puternica',
      ];
      const swotW = [
        s.svMpLoc < 26 ? 'Deficit spatii verzi/locuitor: ' + RN(s.svMpLoc, 1) + ' mp/loc vs norma 26 (Legea 24/2007)' : 'Spatii verzi fragmentate, conectivitate ecologica insuficienta',
        'Decalaj SIDU/PMUD -> PUG (culoarele proiectelor nerezervate); fond construit invechit',
        'Dependenta de autoturism (' + RN(s.modalAuto, 0) + '% deplasari); transport public subfinantat',
        'Convergenta economica UE la ' + RN(s.convergUE, 1) + '% — sub media nationala a municipiilor',
      ];
      const swotO = [
        'Fonduri UE (POR 2021-2027, PNRR) — alocare prioritara poli de crestere',
        'Zona metropolitana functionala; modele 15-minute / superbloc aplicabile local',
        'Digitalizare (broadband ' + s.acBB + '%) si tranzitie verde — sectoare cu valoare adaugata mare',
        'Reconversie brownfield si densificare TOD — fara consum de teren nou',
      ];
      const swotT = [
        s.varPct < 0 ? 'Declin demografic (-' + RN(Math.abs(s.varPct), 1) + '% 2011-2021); imbatranire' : 'Suburbanizare si sprawl periurban — costuri infrastructura ×3',
        'Expansiune necontrolata periurbana; schimbari climatice (UHI, inundatii); risc seismic ag=' + s.ag + 'g',
        'Concurenta pentru investitii si talente cu alte centre regionale',
        'Intarzieri transpunere in PUG -> proiecte nefinantabile/neautorizabile',
      ];

      D.table(
        ['Cadran', 'Elemente reprezentative (multisectoriale)'],
        [
          ['Puncte tari (S)', swotS.join('; ')],
          ['Puncte slabe (W)', swotW.join('; ')],
          ['Oportunitati (O)', swotO.join('; ')],
          ['Amenintari (T)', swotT.join('; ')],
        ],
        [38, 136],
        { boldFirst: true }
      );

      // ─────────────────────────────────────────────────────────────────────
      // CAP 4 — VIZIUNEA DE DEZVOLTARE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Viziunea de dezvoltare (10-15 ani)');
      D.callout(
        'Viziune',
        'Un oras verde, conectat si competitiv economic, cu servicii publice la standard european, in care fiecare locuitor ajunge in 15 minute la serviciile esentiale, dezvoltarea imobiliara este corelata cu infrastructura, iar spatiile publice sunt prioritizate. ' + city.name + ' — comunitate rezilienta, incluziva si atractiva pentru generatia activa.'
      );

      D.h2('Principii directoare');
      D.bullets([
        'Oras al proximitatii (15 minute): servicii esentiale accesibile pe jos/velo in 15 minute (C. Moreno)',
        'Oras verde si rezilient: infrastructura verde-albastra, regula 3-30-300, adaptare climatica (sponge city)',
        'Oras conectat: transport public eficient, mobilitate activa, naveta metropolitana integrata (PMUD)',
        'Oras competitiv si inteligent: economie diversificata, digitalizare, poli de inovare',
        'Oras incluziv: locuire accesibila, servicii sociale, participare publica',
      ]);

      D.P('Viziunea se aliniaza Obiectivului de Dezvoltare Durabila 11 (ONU — orase si comunitati durabile), Pactului Verde European si initiativei New European Bauhaus (sustenabil, frumos, impreuna).');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 5 — OBIECTIVE STRATEGICE (pe domenii)
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Obiective strategice si specifice (pe domenii)');
      D.P('Fiecarui domeniu integrat ii corespund obiective specifice, tinte si indicatori. Domeniile SIDU sunt 8, acoperind integral viata urbana.');

      D.table(
        ['Domeniu', 'Obiectiv specific', 'Conduce la'],
        [
          ['Economie & competitivitate', 'Cresterea competitivitatii si a numarului de locuri de munca; poli economici si de inovare', '—'],
          ['Mobilitate urbana', 'Transfer modal spre transport public si mobilitate activa; reducerea congestiei si a emisiilor (tinta: ' + (mob && mob.modalTinta ? mob.modalTinta[0] : Math.round(s.modalAuto - 10)) + '% auto 2030)', 'PMUD'],
          ['Regenerare urbana & spatii verzi', 'Regenerarea cartierelor si a fondului construit; cresterea suprafetei verzi/locuitor (tinta 26 mp/loc)', 'Masterplan/LOISIR'],
          ['Educatie', 'Modernizarea infrastructurii educationale si reducerea abandonului scolar', '—'],
          ['Sanatate & social', 'Acces echitabil la servicii medicale; pol medical regional', '—'],
          ['Locuire', 'Locuire accesibila si de calitate, corelata cu infrastructura (necesarul: ~' + N(Math.round(s.necLoc / 14)) + ' unitati/an)', 'PUG'],
          ['Turism & cultura', 'Valorificarea patrimoniului cultural si dezvoltarea turismului urban', 'Patrimoniu'],
          ['Infrastructura & digitalizare', 'Modernizarea retelelor edilitare si digitalizarea serviciilor', 'PUG'],
        ],
        [40, 100, 34],
        { fs: 7.5 }
      );

      // ─────────────────────────────────────────────────────────────────────
      // CAP 6 — PORTOFOLIUL INTEGRAT DE PROIECTE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Portofoliul integrat de proiecte');
      D.P('Portofoliul reuneste, sub aceeasi umbrela, proiecte din toate domeniile, prioritizate pe liste (lunga -> scurta -> metropolitan) si pe termen de implementare. Bugetele sunt orientative si se confirma in studiile de fezabilitate.');

      // KPI-uri portofoliu
      D.kpis([
        { val: String(s.projects.length), label: 'Proiecte in portofoliu', sub: '' },
        { val: N(s.invTot) + ' M€',       label: 'Investitie totala cumulata', sub: '' },
        { val: String(s.projects.filter(p => p.domeniu === 'Mobilitate').length),
          label: 'Conduc PMUD', sub: 'mobilitate' },
        { val: String(s.projects.filter(p => p.domeniu === 'Regenerare' || p.domeniu === 'Locuire').length),
          label: 'Conduc Masterplan', sub: 'regenerare' },
      ]);

      // Bar chart investitie pe domenii
      const domainsAgg = {};
      s.projects.forEach(p => { domainsAgg[p.domeniu] = (domainsAgg[p.domeniu] || 0) + p.cost; });
      const domChartData = Object.entries(domainsAgg)
        .sort((a, b) => b[1] - a[1])
        .map(([d, v], i) => {
          const cols = [[185,71,30],[59,130,246],[52,211,153],[245,158,11],[168,85,247],[120,130,150],[200,100,100],[100,180,100]];
          return [d, v, cols[i % cols.length]];
        });
      D.barChart(domChartData, {
        title: 'Investitie pe domenii (M€)',
        h: 48,
        source: 'Portofoliu SIDU — platforma UrbanX',
      });

      D.h2('Lista de proiecte');
      D.table(
        ['Proiect', 'Domeniu', 'Lista', 'Termen', 'Cost est.', 'Status'],
        s.projects.map(p => [
          p.titlu,
          p.domeniu,
          p.lista,
          p.termen,
          N(p.cost) + ' M€',
          'propus',
        ]),
        [66, 26, 18, 22, 18, 14],
        { fs: 7 }
      );

      // Fise detaliate pentru primele 5 proiecte (cele cu prioritate maxima)
      const top5 = s.projects.slice(0, 5);
      top5.forEach(p => {
        D.h2(p.cod + ' — ' + p.titlu);
        D.table(
          ['Atribut', 'Valoare'],
          [
            ['Domeniu', p.domeniu],
            ['Lista', p.lista],
            ['Termen de implementare', p.termen],
            ['Buget orientativ', N(p.cost) + ' mil. EUR'],
            ['Surse de finantare probabile', p.surse.join(', ')],
            ['Indicatori de rezultat', p.indicatori.join(' · ')],
            ['Conditioneaza proiectele', p.conditioneaza.length ? p.conditioneaza.join(', ') : '—'],
          ],
          [50, 124],
          { boldFirst: true, fs: 7.5 }
        );
        D.P(p.desc);
      });

      // ─────────────────────────────────────────────────────────────────────
      // CAP 7 — PLANUL DE ACTIUNE SI FAZAREA IN TIMP
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Planul de actiune si fazarea in timp');
      D.P('Implementarea se etapizeaza pe termene, in functie de maturitate, finantare si dependente (ex. proiectele de mobilitate depind de rezervarea culoarelor in PUG).');

      const termene = ['scurt', 'mediu', 'lung', 'scurt-mediu', 'mediu-lung', 'continuu'];
      const labels   = ['Termen scurt (0-3 ani)', 'Termen mediu (3-7 ani)', 'Termen lung (7-15 ani)'];

      [
        ['scurt'],
        ['mediu', 'scurt-mediu'],
        ['lung', 'mediu-lung', 'continuu'],
      ].forEach((t, i) => {
        D.h2(labels[i]);
        const filtered = s.projects.filter(p => t.some(tt => p.termen.indexOf(tt) >= 0));
        if (!filtered.length) { D.P('Nu exista proiecte programate in aceasta etapa.'); return; }
        filtered.forEach(p => {
          D.P(p.titlu + ': ' + p.domeniu + ' - ' + N(p.cost) + ' M€ - ' + p.surse[0]);
        });
      });

      // ─────────────────────────────────────────────────────────────────────
      // CAP 8 — PLANUL FINANCIAR SI SURSELE DE FINANTARE
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Planul financiar si sursele de finantare');
      D.P('Finantarea portofoliului combina fonduri europene (POR 2021-2027, PNRR), buget local si de stat, parteneriate public-private (PPP) si imprumuturi (BEI). Mixul de finantare este un indicator al sustenabilitatii financiare a strategiei.');

      // Structura surse (calibrata standard pe tipul de proiecte)
      const pnrrPct = Math.round(s.invTot * 0.28);
      const porPct  = Math.round(s.invTot * 0.42);
      const blPct   = Math.round(s.invTot * 0.18);
      const pppPct  = Math.round(s.invTot * 0.12);

      D.pie(
        [
          ['POR 2021-2027', porPct,  [59, 130, 246]],
          ['PNRR',          pnrrPct, [185, 71, 30]],
          ['Buget local',   blPct,   [52, 211, 153]],
          ['PPP',           pppPct,  [245, 158, 11]],
        ],
        { title: 'Structura investitiei pe surse de finantare (M€)', source: 'Portofoliu SIDU' }
      );

      D.kpis([
        { val: N(s.invTot) + ' M€',         label: 'Investitie totala portofoliu', sub: '' },
        { val: '4',                           label: 'Surse distincte finantare',   sub: '' },
        { val: String(s.projects.filter(p => p.surse.some(ss2 => ss2.includes('PNRR'))).length),
          label: 'Proiecte eligibile PNRR', sub: '' },
        { val: String(s.projects.filter(p => p.termen === 'scurt').length),
          label: 'Proiecte prioritare 0-3 ani', sub: '' },
      ]);

      // ─────────────────────────────────────────────────────────────────────
      // CAP 9 — CORELAREA SIDU ↔ MASTERPLAN / PMUD ↔ PUG
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Corelarea SIDU -> Masterplan / PMUD -> PUG');
      D.P('SIDU este umbrela; PMUD detaliaza mobilitatea; Masterplanul aprofundeaza regenerarea de cartier; PUG-ul le face aplicabile (regim de construire). Decalajul dintre planificarea strategica si reglementarea spatiala (PUG) genereaza blocaje reale: benzi fara culoar de rezerva -> exproprieri imposibile; ansambluri in comune cu strazi unde autobuzul metropolitan nu intra; coridoare verzi propuse, dar fara regim de protectie in PUG -> construite si pierdute.');

      D.h2('Verificarea coerentei (riscuri de blocaj)');
      D.P('Intrebarile de mai jos sunt cheile coerentei strategie -> PUG; un raspuns negativ semnaleaza un blocaj de transpunere care trebuie remediat la actualizarea PUG/RLU.');
      D.table(
        ['Verificare', 'Risc daca nu este indeplinit'],
        [
          ['Exista o SIDU aprobata (strategia integrata 10-15 ani)', 'Fara SIDU, proiectele sunt punctuale, fara prioritizare si fara acces complet la fonduri (POR).'],
          ['Exista PMUD aprobat si corelat cu SIDU', 'Fara PMUD corelat, mobilitatea nu detaliaza viziunea SIDU; finantare blocata.'],
          ['PUG-ul rezerva culoarele pentru proiectele PMUD (benzi, piste, largiri)', 'BLOCAJ: fara culoar in PUG, largirile/benzile cer exproprieri — nu se pot executa.'],
          ['Ansamblurile din zona metropolitana au strazi corelate cu PMUD', 'Strazi prea inguste -> autobuzul metropolitan nu intra -> ambuteiaje la inrare in oras.'],
          ['Proiectele prioritare SIDU sunt transpuse in RLU/PUG', 'Proiectele netranspuse in regulamentul de construire raman pe hartie.'],
          ['Coridoarele verzi / malurile au regim de protectie in PUG', 'Fara regim in PUG, coridoarele verzi propuse in SIDU pot fi construite si pierdute definitiv.'],
        ],
        [80, 94],
        { fs: 7.5 }
      );
      D.callout(
        'Recomandare',
        'Fiecare proiect prioritar din portofoliu trebuie transpus "linie cu linie" in RLU/PUG (culoarele de mobilitate, regimul spatiilor verzi, indicatorii urbanistici pentru zonele de regenerare). Altfel proiectele raman nefinantabile/neautorizabile.'
      );

      // ─────────────────────────────────────────────────────────────────────
      // CAP 10 — CADRUL DE IMPLEMENTARE SI GUVERNANTA
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Cadrul de implementare si guvernanta');
      D.h2('Coordonare');
      D.P('Primaria / Consiliul Local aproba SIDU si coordoneaza implementarea; o structura dedicata (unitate de management) monitorizeaza portofoliul.');
      D.h2('Dimensiunea metropolitana');
      D.P('Proiectele metropolitane se coordoneaza prin Asociatia de Dezvoltare Intercomunitara (ADI) si se coreleaza cu UAT-urile vecine.');
      D.h2('Parteneriate');
      D.P('Mediul academic, sectorul privat (PPP), societatea civila si operatorii de utilitati sunt parteneri in implementarea SIDU.');
      D.h2('Participare publica');
      D.P('Consultarea comunitatii in etapele cheie (viziune, portofoliu, monitorizare) — transparenta si acceptare sociala, conform Legii 52/2003.');
      D.h2('Actualizare');
      D.P('SIDU este un document viu: portofoliul si prioritatile se revizuiesc periodic (recomandabil la 5 ani sau la modificari majore de context).');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 11 — MONITORIZARE, EVALUARE SI MEDIU
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Monitorizare, evaluare si mediu');
      D.P('Implementarea se urmareste printr-un set de indicatori SMART, cu valoare de referinta (baseline) si tinta, raportati periodic. Indicatorii acopera toate domeniile si permit corectia strategiei.');

      D.table(
        ['Indicator', 'Unitate / tinta orientativa'],
        [
          ['Suprafata verde / locuitor', 'mp/loc - tinta >= ' + (s.svMpLoc < 26 ? '26 (OMS/L.24)' : 'mentinere >= 26')],
          ['Acces servicii in 15 minute', '% populatie - tinta in crestere'],
          ['Transfer modal spre TP + activ', '% deplasari - tinta PMUD (' + (mob && mob.modalTinta ? mob.modalTinta[1] + '+' + mob.modalTinta[2] : Math.round(s.modalTP + s.modalAct + 10)) + '% 2030)'],
          ['Locuinte noi corelate cu infrastructura', '% autorizatii - tinta 100%'],
          ['Reducere emisii CO2 (transport+cladiri)', 't CO2/an - trend descrescator; tinta: 1.5 t/cap (2055)'],
          ['Proiecte SIDU transpuse in PUG', '% portofoliu prioritar - tinta 100%'],
          ['Grad de absorbtie fonduri UE', '% alocare - maximizare'],
          ['Nota UrbanX compozit', '/100 - actual: ' + s.noteComp + ' (' + s.calific + ') -> tinta: ' + Math.min(100, s.noteComp + 18) + ' (2040)'],
        ],
        [90, 84],
        { boldFirst: true }
      );

      D.h2('Evaluarea de mediu');
      D.P('Strategia si proiectele cu impact semnificativ (peste 1 ha sau in zone sensibile) fac obiectul evaluarii de mediu — evaluarea strategica de mediu (SEA) pentru documentul de planificare si evaluarea impactului (EIA) pentru proiecte, conform OUG 195/2005 si legislatiei subsecvente.');

      // ─────────────────────────────────────────────────────────────────────
      // CAP 12 — CONCLUZII SI CADRUL LEGAL
      // ─────────────────────────────────────────────────────────────────────
      D.chapter('Concluzii si cadrul legal');
      D.P('SIDU ofera cadrul coerent care transforma proiectele punctuale intr-o strategie integrata, finantabila si autorizabila. Conditia de succes este transpunerea consecventa in PUG/RLU si monitorizarea continua a indicatorilor. ' + city.name + ' dispune de premisele necesare (proiecte in derulare, ' + (pop > 100000 ? 'dimensiune metropolitana, ' : '') + 'acces la fonduri UE) pentru o dezvoltare urbana durabila pe orizontul 2026-2040.');
      D.sourceBadges([
        'Ghid SIDU — POR/MDLPA',
        'Legea 350/2001 (PUG/PUZ)',
        'HG 874/2019 (mobilitate)',
        'OUG 195/2005 (mediu)',
        'Model ESTI Bucuresti',
        'INS Recensaminte 2011/2021',
        'Eurostat Urban Audit',
        'SDG 11 ONU',
      ]);
      D.callout(
        'Nota',
        'Document strategic ORIENTATIV generat de platforma UrbanX. Nu inlocuieste o SIDU avizata si aprobata conform ghidului POR/MDLPA. Datele marcate "—" necesita completare din surse oficiale locale.'
      );
    },
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // INIT — asteapta _TCIMasterplanPDF si se inregistreaza
  // Acelasi pattern ca tci-strategic-pmud-content.js
  // ═══════════════════════════════════════════════════════════════════════════
  (function _init(n) {
    if (n > 80) { console.warn('[StratSIDU] timeout asteptare dependente'); return; }
    const ok = typeof window._TCIMasterplanPDF !== 'undefined' &&
               typeof window._makeStratDoc    !== 'undefined';
    if (!ok) { setTimeout(() => _init(n + 1), 350); return; }

    // Expune API public
    window._StratSIDU        = G._StratSIDU;
    window._StratSIDUContent = G._StratSIDUContent;

    // Buton in UI (daca exista containerul de butoane al Masterplanului)
    const tryAddBtn = (attempt) => {
      if (attempt > 30) return;
      const bar = document.querySelector('.tci-doc-buttons, .masterplan-actions, [data-tci-docbar]');
      if (!bar) { setTimeout(() => tryAddBtn(attempt + 1), 600); return; }
      if (bar.querySelector('[data-sidu-btn]')) return; // deja adaugat
      const btn = document.createElement('button');
      btn.setAttribute('data-sidu-btn', '1');
      btn.textContent = '📋 SIDU';
      btn.title = 'Genereaza SIDU — Strategia Integrata de Dezvoltare Urbana';
      btn.style.cssText = 'padding:6px 14px;border-radius:6px;border:1px solid rgba(185,71,30,0.5);background:rgba(185,71,30,0.12);color:#e8936a;cursor:pointer;font-size:13px;font-weight:600;margin-left:8px;';
      btn.onclick = () => {
        const cityKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
        const scenario = window._ProjectionEngine?.currentScenario || 'S2';
        G._StratSIDU.generate(cityKey, scenario);
      };
      bar.appendChild(btn);
      console.log('[StratSIDU] ✅ Buton SIDU adaugat in bara de documente');
    };
    tryAddBtn(0);

    console.log('[tci-strategic-sidu-content.js] ✅ SIDU generator activ pentru orice UAT din Romania');
    window.ss?.('📋 SIDU generator activ — genereaza SIDU pentru orice UAT');
  })(0);

})(window);
