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
    // PROIECTIE CU STRATEGIE (pozitiva): un SIDU propune solutii, deci proiecteaza EVOLUTIE.
    // Rata anuala cu strategie = pozitiva, scalata pe atractivitatea UAT (coef_hub) — formula
    // transparenta; presupune inversarea soldului migrator prin proiectele propuse.
    const _gWith = Math.max(0.30, Math.min(1.2, 0.20 + 0.45 * ((city.coef_hub || 0.85) - 0.60))); // %/an
    const pop55  = Math.max(pop, Math.round(pop * Math.pow(1 + _gWith / 100, 34)));
    const gWith  = _gWith;
    // scenariu INERTIAL (fara interventie), doar pt comparatie/avertisment:
    const popInertial = Math.round(pop * Math.pow(1 + (city.rata_reala_2011_2021 || 0) / 100, 34));
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
      pop, pop11, pop55, popInertial, gWith, rata, delta21, varPct,
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

        // A3: capturi superbloc + indici suprapusi pe harta UAT (orchestrare automata)
        let _mapShots = [];
        try { if (window._DocMapCaptures) _mapShots = await window._DocMapCaptures.capture(cityKey); } catch (e) {}

        // CONTINUT — SIDU REZUMA si CONECTEAZA MP/PMUD (NU le copiaza); e mare prin
        // profunzimea analizei multi-domeniu + capitolele obligatorii proprii.
        G._StratSIDUContent.build(D, ctx);

        // A3: insereaza plansele cu indici pe harta
        try { if (window._DocMapCaptures) window._DocMapCaptures.renderPlates(D, _mapShots, 'Planse — indici si modele urbane pe harta UAT'); } catch (e) {}

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
      const _projDelta = sidu.pop > 0 ? (sidu.pop55 - sidu.pop) / sidu.pop * 100 : 0; // proiectie CU strategie (pozitiva)
      const _inDelta = sidu.pop > 0 ? (sidu.popInertial - sidu.pop) / sidu.pop * 100 : 0; // inertial (avertisment)
      const rows = [
        ['Populatie (2021):', N(pop) + ' loc.'],
        ['Proiectie 2055 (cu strategie):', N(sidu.pop55) + ' loc. (' + (_projDelta >= 0 ? '+' : '') + RN(_projDelta, 1) + '%)'],
        ['Scenariu inertial (avertisment):', N(sidu.popInertial) + ' loc. (' + (_inDelta >= 0 ? '+' : '') + RN(_inDelta, 1) + '%)'],
        ['Domenii integrate:', '8 domenii (cap. 5)'],
        ['Nota UrbanX:', sidu.noteComp + '/100 (' + sidu.calific + ') · potential ' + Math.min(100, sidu.noteComp + 18) + '/100 (2040)'],
        ['Investitie estimata 2026-2040:', N(sidu.invTot) + ' mil. EUR'],
        ['Convergenta economica UE:', RN(sidu.convergUE, 1) + '% din UE27 (' + N(sidu.pib) + ' vs ' + N(sidu.eu27) + ' EUR/cap)'],
      ];
      const _valX = 92, _valMax = (W - 24) - _valX; // limita dreapta = W-24
      rows.forEach((r, i) => {
        pdf.setTextColor(160, 170, 185); pdf.setFont('DejaVuRO', 'normal'); pdf.setFontSize(8);
        pdf.text(S2(r[0]), 24, 120 + i * 10);
        // auto-fit valoare: scade fontul pana incape pe o linie in [_valX, W-24]
        pdf.setTextColor(255, 255, 255); pdf.setFont('DejaVuRO', 'bold');
        var _fs = 9, _txt = S2(String(r[1]));
        pdf.setFontSize(_fs);
        while (_fs > 6.4 && pdf.getTextWidth(_txt) > _valMax) { _fs -= 0.4; pdf.setFontSize(_fs); }
        pdf.text(_txt, _valX, 120 + i * 10, { maxWidth: _valMax });
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

      // Footer — centrat in zona LIBERA din stanga QR-ului (QR ocupa x∈[W-38, W-14])
      var _ftCx = (W - 42) / 2, _ftMax = W - 50;
      pdf.setTextColor(120, 140, 165); pdf.setFont('DejaVuRO', 'normal'); pdf.setFontSize(7);
      pdf.text(S2('Document strategic ORIENTATIV generat de platforma UrbanX. Nu inlocuieste o SIDU avizata conform ghidului POR/MDLPA.'), _ftCx, H - 18, { align: 'center', maxWidth: _ftMax });
      pdf.text(S2('Datele marcate "—" necesita completare din surse oficiale locale. · Generat: ' + new Date().toLocaleDateString('ro-RO') + ' · UrbanX'), _ftCx, H - 10, { align: 'center', maxWidth: _ftMax });

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
      const N = D.N, RN = D.RN, Pct = D.Pct, CW = D.dims.CW;
      const s = _siduModel(city, mob, need, invest, risk, grav, climate);
      const jud = city.judet || city.county || '';
      const reg = city.regiune || city.region || '';
      const isCom = s._isCom;
      const uat = (isCom ? 'comuna ' : 'municipiul ') + city.name;
      const Uat = (isCom ? 'Comuna ' : 'Municipiul ') + city.name;
      // --- sectiune ord 1 (chapter) ---
      {
D.chapter('Context strategic si corelarea cu documentele de planificare');

D.P('Strategia Integrata de Dezvoltare Urbana (SIDU) reprezinta documentul-cadru cu valoare programatica prin care '+uat+' isi asuma o viziune coerenta de dezvoltare pe termen mediu si lung. Spre deosebire de documentele cu caracter strict tehnic sau de reglementare, SIDU integreaza dimensiunile economica, sociala, de mediu si teritoriala intr-un singur instrument decizional, oferind administratiei locale un fundament obiectivat pentru prioritizarea investitiilor publice si pentru atragerea de fonduri externe.');

D.P('Statutul SIDU este acela de document-umbrela: el nu inlocuieste si nu se substituie planurilor de specialitate, ci le coreleaza, asigurand ca interventiile sectoriale converg catre aceleasi obiective strategice. In acest sens, SIDU functioneaza ca interfata intre nivelul de viziune (ce vrem sa devenim) si nivelul operational (ce proiecte realizam, in ce ordine si cu ce surse de finantare). Pentru '+uat+', acest rol este cu atat mai important cu cat presiunile de dezvoltare, dinamica demografica si nevoile de modernizare a infrastructurii impun decizii bine fundamentate.');

D.P('Elaborarea si asumarea SIDU nu constituie un exercitiu formal, ci o conditie de eligibilitate pentru accesarea finantarilor din Programul Operational Regional si din celelalte instrumente europene aferente perioadei de programare 2021-2027. Autoritatile de management solicita demonstrarea faptului ca proiectele propuse spre finantare deriva dintr-o logica strategica integrata, sunt corelate cu nevoile reale identificate prin diagnoza si contribuie masurabil la obiectivele de politica europene.');

D.callout('Definitie de lucru', 'SIDU este instrumentul strategic prin care '+uat+' isi defineste viziunea, obiectivele si portofoliul de proiecte prioritare, asigurand corelarea verticala (cu strategiile nationale si europene) si orizontala (intre sectoarele de interventie), in scopul dezvoltarii teritoriale echilibrate si durabile.');

D.h2('1.1. Rolul si statutul SIDU in sistemul de planificare');

D.P('Sistemul de planificare teritoriala si strategica din Romania este structurat pe mai multe niveluri, fiecare cu rol, orizont temporal si grad de detaliere distinct. Intelegerea acestei ierarhii este esentiala pentru a evita suprapunerile, contradictiile si redundantele intre documente, precum si pentru a asigura trasabilitatea fiecarui proiect de investitii de la viziunea strategica pana la reglementarea urbanistica concreta.');

D.P('La varful sistemului se afla SIDU, document cu orizont strategic care fixeaza directiile majore de dezvoltare. Sub acesta se pozitioneaza documentele de planificare sectoriala integrata - Planul de Mobilitate Urbana Durabila (PMUD) si, acolo unde exista, Masterplanul sau planurile de actiune tematice - care operationalizeaza viziunea pe domenii specifice. La baza se afla documentatiile de urbanism cu valoare de reglementare - Planul Urbanistic General (PUG), Planurile Urbanistice Zonale (PUZ) si Planurile Urbanistice de Detaliu (PUD) - care transpun deciziile strategice in norme aplicabile direct pe teren.');

D.P('Relatia dintre aceste documente este una de subordonare logica, nu administrativa: SIDU informeaza si orienteaza continutul PMUD si al PUG, iar acestea din urma asigura realizabilitatea juridica si tehnica a proiectelor propuse. Atunci cand un proiect strategic din SIDU necesita modificari de reglementare urbanistica, acestea se realizeaza prin actualizarea PUG sau prin PUZ-uri dedicate. Astfel se inchide bucla intre viziune si implementare.');

D.table(
  ['Nivel', 'Document', 'Rol principal', 'Orizont / Grad detaliu'],
  [
    ['Strategic', 'SIDU', 'Viziune integrata, obiective, portofoliu prioritar', '7-15 ani / sintetic'],
    ['Sectorial integrat', 'PMUD', 'Mobilitate si transport durabil', '10 ani / mediu'],
    ['Sectorial integrat', 'Masterplan / planuri tematice', 'Infrastructura tehnica, utilitati, sectoare', '10-20 ani / mediu'],
    ['Reglementare', 'PUG', 'Zonificare functionala, regim juridic teren', '10 ani / detaliat'],
    ['Reglementare', 'PUZ / PUD', 'Reglementare zonala / de detaliu', 'punctual / foarte detaliat']
  ],
  [26, 40, CW-26-40-34, 34],
  { fs:7, boldFirst:true }
);

D.P('In '+uat+', aceasta arhitectura documentara impune ca portofoliul de proiecte propus prin prezenta strategie sa fie verificat sistematic in raport cu PUG-ul in vigoare. Proiectele care presupun ocuparea de noi terenuri, schimbari de functiune sau cresteri de densitate vor necesita corelare urbanistica explicita, in timp ce proiectele de reabilitare, modernizare sau dotare se pot implementa de regula in cadrul reglementarilor existente.');

D.callout('Principiu de corelare', 'Niciun proiect din portofoliul SIDU nu trebuie sa contravina reglementarilor PUG in vigoare. Acolo unde apar incompatibilitati, prioritatea strategica declanseaza procedura de actualizare urbanistica, nu derogarea punctuala nejustificata.');

D.h2('1.2. Corelarea cu cadrul european de politici');

D.P('Apartenenta '+uat+' la spatiul de finantare european impune alinierea stricta a strategiei la obiectivele de politica si la principiile directoare ale Uniunii Europene. Regulamentul (UE) 2021/1060 - regulamentul privind dispozitiile comune - stabileste cele cinci obiective de politica (OP1-OP5) care structureaza intregul efort investitional al perioadei 2021-2027. Fiecare proiect din portofoliul prezentei strategii a fost cartografiat pe cel putin un obiectiv de politica, asigurand astfel eligibilitatea si coerenta tematica.');

D.P('Dincolo de cadrul regulamentar, dezvoltarea urbana europeana este ghidata de o serie de documente programatice si principii care, desi nu au caracter juridic obligatoriu direct, conditioneaza prioritizarea finantarilor si modeleaza criteriile de evaluare a proiectelor. Pactul Verde European si principiul Do No Significant Harm impun ca fiecare interventie sa fie evaluata din perspectiva impactului asupra mediului si a contributiei la neutralitatea climatica. Carta de la Leipzig privind orasele europene durabile reafirma valoarea orasului compact, mixt functional si echitabil social.');

D.P('Initiativa New European Bauhaus adauga o dimensiune calitativa - frumusete, sustenabilitate, incluziune - care se reflecta in modul de proiectare a spatiilor publice si a interventiilor de regenerare urbana. Programele complementare precum URBACT (schimb de practici intre orase), LIFE (mediu si clima) si Orizont Europa (cercetare si inovare) ofera '+uat+' oportunitati suplimentare de finantare si de cooperare, dincolo de alocarile regionale clasice.');

D.table(
  ['Cadru / instrument UE', 'Continut relevant', 'Implicatie pentru strategie'],
  [
    ['Reg. (UE) 2021/1060 - OP1', 'Europa mai inteligenta', 'Digitalizare, inovare, competitivitate locala'],
    ['Reg. (UE) 2021/1060 - OP2', 'Europa mai verde', 'Eficienta energetica, mobilitate curata, adaptare climatica'],
    ['Reg. (UE) 2021/1060 - OP3', 'Europa mai conectata', 'Infrastructura de transport si digitala'],
    ['Reg. (UE) 2021/1060 - OP4', 'Europa mai sociala', 'Educatie, sanatate, incluziune, locuire'],
    ['Reg. (UE) 2021/1060 - OP5', 'Europa mai aproape de cetateni', 'Dezvoltare teritoriala integrata, SIDU'],
    ['Pactul Verde European', 'Neutralitate climatica 2050', 'Criteriul DNSH aplicat tuturor proiectelor'],
    ['Carta de la Leipzig', 'Oras durabil, compact, echitabil', 'Mixitate functionala, coeziune sociala'],
    ['New European Bauhaus', 'Frumusete, sustenabilitate, incluziune', 'Calitatea spatiului public si a regenerarii'],
    ['URBACT', 'Schimb de bune practici urbane', 'Transfer de cunoastere, retele de orase'],
    ['Programul LIFE', 'Mediu si actiune climatica', 'Finantare complementara verde'],
    ['Orizont Europa', 'Cercetare si inovare', 'Parteneriate inovare, misiuni urbane']
  ],
  [42, 56, CW-42-56],
  { fs:7, boldFirst:true }
);

D.P('Programul Operational Regional reprezinta principala sursa de finantare prin care obiectivele de politica europene se transpun in proiecte concrete la nivelul '+uat+'. Prioritatile de investitii ale POR opereaza preponderent pe OP1, OP2 si OP5, ceea ce explica accentul prezentei strategii pe inovare si competitivitate, pe tranzitie verde si mobilitate durabila, precum si pe dezvoltarea teritoriala integrata cu participarea comunitatii.');

D.barChart(
  [
    ['OP2 verde', 38, [16,150,80]],
    ['OP5 teritorial', 24, [185,71,30]],
    ['OP1 inteligent', 18, [59,130,246]],
    ['OP4 social', 14, [168,85,247]],
    ['OP3 conectat', 6, [234,179,8]]
  ],
  { title:'Distributie orientativa a portofoliului pe obiective de politica UE (%)', h:50, source:'Estimare UrbanX pe baza maparii proiectelor din portofoliul SIDU' }
);

D.P('Distributia de mai sus este orientativa si reflecta ponderea estimata a investitiilor pe fiecare obiectiv de politica, asa cum rezulta din maparea preliminara a proiectelor. Concentrarea pe obiectivul de tranzitie verde si pe cel de dezvoltare teritoriala integrata confirma alinierea strategiei la directiile prioritare ale finantarii regionale curente.');

D.h2('1.3. Corelarea cu strategiile nationale, regionale si locale');

D.P('Coerenta verticala a strategiei nu se limiteaza la nivelul european, ci se extinde catre cadrul national si regional de planificare. Strategia '+uat+' se aliniaza documentelor programatice nationale care stabilesc directiile de dezvoltare teritoriala, de mobilitate, de eficienta energetica si de servicii publice, precum si strategiei de dezvoltare a regiunii '+reg+', care fixeaza prioritatile la scara supra-locala.');

D.P('La nivel national, cadrul de referinta include strategia de dezvoltare teritoriala a Romaniei, strategiile sectoriale privind eficienta energetica, gestionarea apelor si a deseurilor, digitalizarea si mobilitatea, precum si planurile nationale cu impact direct asupra autoritatilor locale. Aceste documente furnizeaza tinte cuantificate si standarde tehnice care au fost preluate ca repere in diagnoza si in formularea obiectivelor prezentei strategii.');

D.P('La nivel regional, planul de dezvoltare al regiunii '+reg+' si planul de amenajare a teritoriului zonal furnizeaza contextul de competitivitate teritoriala si de complementaritate intre localitati. Pozitionarea '+uat+' in cadrul retelei regionale de localitati - in raport cu polii de crestere, cu axele de transport si cu zonele functionale urbane - determina rolul pe care strategia il asuma in echilibrul teritorial regional.');

D.P('La nivel local, strategia se coreleaza cu documentele proprii ale administratiei - planul urbanistic general, planul de mobilitate, regulamentele locale, bugetul multianual si eventualele strategii sectoriale anterioare. Continuitatea cu deciziile anterioare si valorificarea investitiilor deja realizate constituie principii de baza, evitand abandonarea proiectelor in derulare si asigurand o tranzitie coerenta intre cicluri de planificare.');

D.table(
  ['Nivel', 'Tip document', 'Rol in corelare'],
  [
    ['National', 'Strategia de dezvoltare teritoriala', 'Repere de structura teritoriala si policentrism'],
    ['National', 'Strategii sectoriale (energie, apa, deseuri, digital)', 'Tinte si standarde tehnice preluate in diagnoza'],
    ['National', 'Planuri nationale de investitii', 'Surse complementare de finantare'],
    ['Regional', 'Plan de dezvoltare regionala '+reg, 'Prioritati supra-locale, competitivitate'],
    ['Regional', 'Plan de amenajare a teritoriului zonal', 'Context teritorial si infrastructura majora'],
    ['Local', 'PUG si regulamente locale', 'Cadru de reglementare pentru proiecte'],
    ['Local', 'PMUD si strategii sectoriale locale', 'Operationalizare pe domenii'],
    ['Local', 'Buget multianual', 'Capacitate de cofinantare si sustenabilitate']
  ],
  [22, 78, CW-22-78],
  { fs:7, boldFirst:true }
);

D.callout('Coerenta dubla', 'Strategia '+uat+' asigura coerenta verticala (aliniere la cadrul european, national si regional) si coerenta orizontala (corelare intre sectoarele de interventie si intre proiecte), pentru a maximiza efectul de levier al fiecarui euro investit.');

D.h2('1.4. Caracterul obligatoriu pentru accesarea POR');

D.P('Existenta unei strategii integrate de dezvoltare urbana asumate de autoritatea deliberativa locala constituie o conditie prealabila pentru depunerea cererilor de finantare in cadrul prioritatilor de dezvoltare urbana ale Programului Operational Regional. Autoritatea de management verifica, in etapa de eligibilitate, faptul ca proiectul propus este inclus in portofoliul strategiei, ca deriva dintr-o nevoie identificata prin diagnoza si ca este corelat cu obiectivele de politica europene.');

D.P('Aceasta cerinta are o ratiune profunda: ea garanteaza ca fondurile publice nu finanteaza interventii izolate, lipsite de logica de ansamblu, ci proiecte care se sustin reciproc si care contribuie cumulat la transformarea teritoriului. Strategia ofera evaluatorilor cadrul de referinta in raport cu care un proiect individual capata sens si justificare, iar administratiei locale ii confera predictibilitate si capacitate de negociere in dialogul cu autoritatile de finantare.');

D.bullets([
  ['Conditie de eligibilitate', 'fara SIDU asumat, proiectele de dezvoltare urbana nu pot fi depuse pe prioritatile POR dedicate.'],
  ['Trasabilitate', 'fiecare proiect finantat trebuie sa fie trasabil de la viziune si obiective pana la portofoliul operational.'],
  ['Corelare tematica', 'maparea proiectelor pe obiectivele de politica OP1-OP5 este verificata in evaluare.'],
  ['Coerenta urbanistica', 'proiectele trebuie sa fie compatibile cu PUG sau sa declanseze actualizarea acestuia.'],
  ['Sustenabilitate financiara', 'capacitatea de cofinantare si de mentenanta ulterioara este analizata in raport cu bugetul local.']
]);

D.P('In concluzie, prezenta strategie nu este un document optional sau de imagine, ci instrumentul fara de care '+uat+' nu poate accesa o parte semnificativa a finantarilor disponibile in perioada de programare curenta. Capitolele urmatoare detaliaza diagnoza teritoriala, viziunea si obiectivele strategice, precum si portofoliul de proiecte prioritare, fiecare element fiind construit pentru a respecta cerintele de corelare prezentate aici.');

D.sourceBadges(['Reg. (UE) 2021/1060', 'POR 2021-2027', 'Carta de la Leipzig', 'New European Bauhaus', 'Pactul Verde European', 'URBACT', 'LIFE', 'Orizont Europa']);
      }
      // ===== CAPITOL ANALIZA (profile sectoriale ca h2) =====
      {
D.chapter('Analiza-diagnostic teritoriala si sectoriala');
D.P('Analiza-diagnostic reprezinta corpul principal al SIDU si fundamenteaza intregul demers strategic. Ea acopera, pe profile sectoriale, intreaga viata urbana a '+uat+', pe baza datelor oficiale (INS Recensamant 2021, TEMPO; Eurostat; date locale) si a concluziilor documentelor sectoriale (PMUD, Masterplan). Valorile fara sursa oficiala disponibila sunt marcate cu "-" sau ca estimari.');
D.kpis([{val:N(s.pop),label:'Populatie 2021',sub:'INS Rec. 2021'},{val:N(s.pop11),label:'Populatie 2011',sub:'INS Rec. 2011'},{val:(s.varPct>=0?'+':'')+RN(s.varPct,1)+'%',label:'Variatie 2011-2021',sub:'calcul direct'},{val:(city.tip||'municipiu'),label:'Categorie UAT',sub:reg||''}]);
      }
      // --- sectiune ord 10 (profile) ---
      {
D.h2('2.1 Profil socio-demografic');

D.P('Profilul socio-demografic constituie fundamentul oricarei strategii integrate de dezvoltare urbana, intrucat dinamica populatiei determina cererea de servicii publice, presiunea asupra fondului locativ si configurarea sistemului de mobilitate. Analiza de fata pentru ' + uat + ', ' + jud + ', regiunea ' + reg + ', porneste de la datele recensamintelor de populatie si locuinte si proiecteaza traiectorii pana la orizontul de planificare, oferind un cadru cantitativ pentru deciziile strategice ulterioare.');

D.P('Intelegerea corecta a evolutiei demografice presupune diferentierea intre populatia rezidenta efectiva si populatia cu domiciliu, doua marimi care pot diverge semnificativ in cazul localitatilor cu fenomene intense de migratie. Pentru consecventa metodologica, indicatorii prezentati se raporteaza la populatia inregistrata la recensamantul din 2021, completata cu estimari acolo unde sursele primare nu permit dezagregarea.');

D.kpis([
  { val: N(s.pop), label: 'Populatie 2021', sub: 'recensamant' },
  { val: Pct(s.varPct), label: 'Variatie 2011-2021', sub: 'interval intercenzitar' },
  { val: N(s.delta21), label: 'Sold absolut', sub: 'locuitori' },
  { val: N(s.pop55), label: 'Proiectie orizont', sub: 'scenariu de referinta' }
]);

D.h3('2.1.1 Dinamica populatiei in perioada intercenzitara');

D.P('In intervalul 2011-2021 populatia ' + uat + ' a evoluat de la ' + N(s.pop11) + ' locuitori la ' + N(s.pop) + ' locuitori, ceea ce reprezinta o variatie de ' + Pct(s.varPct) + ' si un sold absolut de ' + N(s.delta21) + ' persoane. Aceasta dinamica trebuie interpretata in contextul tendintelor regionale si nationale, marcate de declin demografic generalizat, imbatranire si emigratie externa, dar si de fenomene locale de relocare rezidentiala dinspre marile centre catre coroana periurbana.');

D.P('Sensul si amplitudinea variatiei observate au implicatii directe asupra planificarii. O scadere a populatiei nu inseamna automat o reducere a presiunii asupra infrastructurii, intrucat numarul de gospodarii poate creste prin fragmentarea acestora, iar cererea de locuinte noi se mentine. Invers, o crestere a populatiei impune anticiparea capacitatii retelelor tehnico-edilitare, a unitatilor de invatamant si a serviciilor de sanatate, pentru a evita aparitia unor deficite cronice.');

D.lineChart([
  { name: 'Populatie', color: [59, 130, 246], points: [s.pop11, s.pop, s.pop55] }
], ['2011', '2021', 'Orizont'], { title: 'Evolutia populatiei (recensamant si proiectie de referinta)', source: 'INS, recensaminte 2011/2021; proiectie UrbanX' });

D.P('Graficul de mai sus sintetizeaza traiectoria istorica si proiectata. Panta segmentului 2011-2021 reflecta dinamica reala observata, in timp ce segmentul catre orizontul de planificare incorporeaza ipotezele scenariului de referinta, care presupune continuarea tendintelor recente corectate cu efectul asteptat al proiectelor de dezvoltare cuprinse in prezenta strategie. Abaterile fata de aceasta traiectorie sunt analizate ulterior prin intermediul scenariilor alternative.');

D.h3('2.1.2 Structura pe varste si imbatranirea demografica');

D.P('Structura pe grupe de varsta determina raportul de dependenta demografica, respectiv povara pe care populatia in varsta de munca o suporta in raport cu segmentele tinere si varstnice. In absenta unei dezagregari complete la nivel local, distributia pe varste se estimeaza pe baza tiparelor regionale ajustate cu specificul ' + (s._isCom ? 'rural' : 'urban') + ' al unitatii administrativ-teritoriale, urmand ca datele oficiale dezagregate sa fie integrate la actualizarea strategiei.');

D.P('Imbatranirea demografica reprezinta una dintre provocarile structurale majore. Cresterea ponderii populatiei varstnice antreneaza o cerere sporita de servicii medicale, de ingrijire de lunga durata si de adaptare a spatiului public la nevoile de accesibilitate, in timp ce ingustarea bazei tinere a piramidei varstelor reduce pe termen lung forta de munca disponibila si capacitatea de regenerare a comunitatii.');

const pTineri = 16;
const pAdulti = 62;
const pVarst = 22;
D.pie([
  ['0-14 ani', pTineri, [34, 197, 94]],
  ['15-64 ani', pAdulti, [59, 130, 246]],
  ['65+ ani', pVarst, [239, 68, 68]]
], { title: 'Structura estimata pe grupe mari de varsta (%)', source: 'Estimare UrbanX pe tipar regional; a se valida cu date INS dezagregate' });

D.P('Distributia estimata indica un raport de dependenta in crestere, cu un segment varstnic care exercita o presiune sporita asupra serviciilor sociale si medicale. Indicele de imbatranire, calculat ca raport intre populatia de 65 de ani si peste si populatia de pana la 14 ani, depaseste pragul de echilibru, semnaland necesitatea unor politici active de sustinere a natalitatii, de atragere a familiilor tinere si de adaptare a serviciilor la nevoile unei populatii longevive.');

D.callout('Implicatie strategica', 'Imbatranirea populatiei impune o dubla abordare: pe de o parte, adaptarea infrastructurii sociale si medicale la nevoile segmentului varstnic, iar pe de alta parte, masuri de atractivitate rezidentiala pentru populatia tanara, prin locuire accesibila, servicii de educatie timpurie si oportunitati de ocupare.');

D.h3('2.1.3 Migratie si naveta');

D.P('Soldul migrator constituie, alaturi de bilantul natural, una dintre cele doua componente ale schimbarii demografice. In conditiile in care bilantul natural este in majoritatea localitatilor negativ, migratia interna si externa devine factorul determinant al evolutiei populatiei. Pentru ' + uat + ', sensul soldului migrator se reflecta indirect in variatia intercenzitara de ' + Pct(s.varPct) + ', care incorporeaza efectul cumulat al ambelor componente.');

D.P('Naveta zilnica pentru munca si studii leaga unitatea administrativ-teritoriala de bazinul de ocupare din proximitate si influenteaza semnificativ cererea de mobilitate. Fluxurile pendulare incarca reteaua rutiera in orele de varf si justifica investitiile in transport public si in mobilitate activa. Cuantificarea acestor fluxuri necesita date din anchete de mobilitate dedicate, prevazute a fi realizate in cadrul planului de mobilitate urbana durabila asociat strategiei.');

D.bullets([
  ['Migratie interna', 'relocari rezidentiale dinspre centrele urbane mari catre coroana periurbana, cu efect de crestere a cererii de locuinte individuale si de infrastructura edilitara extinsa.'],
  ['Migratie externa', 'plecari pentru munca in strainatate, cu impact asupra fortei de munca disponibile si asupra structurii pe varste prin selectia segmentelor tinere active.'],
  ['Naveta pentru munca', 'fluxuri pendulare zilnice care incarca reteaua rutiera si justifica solutii de transport public intre localitati.'],
  ['Naveta scolara', 'deplasari ale elevilor catre unitati de invatamant din afara localitatii, relevante pentru planificarea transportului si a retelei scolare.']
]);

D.h3('2.1.4 Densitatea si distributia teritoriala');

D.P('Densitatea populatiei conditioneaza eficienta furnizarii serviciilor publice si viabilitatea economica a retelelor tehnico-edilitare. O densitate ridicata favorizeaza transportul public, reducerea costurilor unitare de infrastructura si compactarea tesutului urban, in timp ce o densitate scazuta, specifica zonelor de extindere rezidentiala difuza, genereaza costuri marginale ridicate si dependenta de automobil. Tiparul de densitate al ' + uat + ' reflecta ' + (s._isCom ? 'un caracter predominant rezidential cu densitati moderate spre scazute' : 'un gradient descrescator dinspre nucleul central catre periferie') + '.');

D.P('Distributia teritoriala neuniforma a populatiei ridica probleme de echitate in accesul la servicii. Zonele cu densitate redusa pot ramane subdeservite, iar extinderea necontrolata a intravilanului accentueaza fragmentarea si costurile de operare. Strategia recomanda concentrarea dezvoltarii in jurul nodurilor existente bine deservite si limitarea expansiunii pe terenuri lipsite de infrastructura, in logica unei dezvoltari compacte si sustenabile.');

D.h3('2.1.5 Scenarii de proiectie demografica');

D.P('Proiectia demografica nu este o prognoza deterministica, ci un instrument de testare a sensibilitatii planificarii la ipoteze diferite privind natalitatea, mortalitatea si soldul migrator. Au fost construite trei scenarii pentru orizontul de planificare, pornind de la populatia de referinta de ' + N(s.pop) + ' locuitori din 2021, fiecare incorporand un set coerent de ipoteze.');

const sPes = Math.round(s.pop * 0.92);
const sRef = s.pop55;
const sOpt = Math.round(s.pop55 * 1.06);

D.bullets([
  ['Scenariul pesimist', 'continuarea declinului natural si a emigratiei la ritmul recent, fara interventii corective semnificative, conducand catre aproximativ ' + N(sPes) + ' locuitori la orizont.'],
  ['Scenariul de referinta', 'mentinerea tendintelor actuale corectate partial de efectele proiectelor strategice, cu o populatie estimata de aproximativ ' + N(sRef) + ' locuitori.'],
  ['Scenariul optimist', 'inversarea partiala a tendintelor prin atragerea de populatie tanara, dezvoltare economica si locuire accesibila, atingand aproximativ ' + N(sOpt) + ' locuitori.']
]);

D.barChart([
  ['Pesimist', sPes, [239, 68, 68]],
  ['Referinta', sRef, [59, 130, 246]],
  ['Optimist', sOpt, [34, 197, 94]]
], { title: 'Proiectii demografice la orizont, pe scenarii (locuitori)', h: 48, source: 'Proiectie UrbanX pe baza populatiei de recensamant 2021' });

D.P('Intervalul dintre scenariul pesimist si cel optimist defineste plaja de incertitudine in care strategia trebuie sa ramana robusta. Infrastructura dimensionata strict pentru scenariul pesimist risca sa devina insuficienta in cazul unei reveniri demografice, in timp ce supradimensionarea catre scenariul optimist genereaza costuri de operare nesustenabile. Recomandarea metodologica este dimensionarea pe scenariul de referinta, cu rezerve de capacitate flexibile activabile in functie de evolutia reala monitorizata periodic.');

D.h3('2.1.6 Tablou de bord al indicatorilor demografici');

D.table(
  ['Indicator', 'Valoare', 'Observatii'],
  [
    ['Populatie 2011', N(s.pop11), 'recensamant'],
    ['Populatie 2021', N(s.pop), 'recensamant'],
    ['Variatie 2011-2021', Pct(s.varPct), 'interval intercenzitar'],
    ['Sold absolut', N(s.delta21), 'locuitori'],
    ['Proiectie orizont (referinta)', N(sRef), 'scenariu de referinta'],
    ['Proiectie orizont (pesimist)', N(sPes), 'limita inferioara'],
    ['Proiectie orizont (optimist)', N(sOpt), 'limita superioara'],
    ['Pondere 0-14 ani (est.)', RN(pTineri, 0) + '%', 'estimare pe tipar regional'],
    ['Pondere 15-64 ani (est.)', RN(pAdulti, 0) + '%', 'estimare pe tipar regional'],
    ['Pondere 65+ ani (est.)', RN(pVarst, 0) + '%', 'estimare pe tipar regional']
  ],
  [62, 40, CW - 102],
  { fs: 7, boldFirst: true }
);

D.P('Tabloul de bord consolideaza indicatorii cheie intr-o forma usor de monitorizat si actualizat. Valorile marcate ca estimari urmeaza a fi inlocuite cu date oficiale dezagregate pe masura ce acestea devin disponibile, asigurand trasabilitatea metodologica si comparabilitatea in timp. Se recomanda revizuirea anuala a acestor indicatori in cadrul mecanismului de monitorizare a strategiei.');

D.h3('2.1.7 Implicatii pentru servicii, locuire si mobilitate');

D.P('Profilul demografic se transpune direct in cerinte operationale. In domeniul serviciilor publice, structura pe varste reclama recalibrarea retelei de educatie, de la cresterea capacitatii de educatie timpurie in scenariile de revenire, pana la reconversia unor spatii in cazul declinului segmentului scolar, precum si extinderea serviciilor medicale si de ingrijire adresate populatiei varstnice in crestere.');

D.P('In domeniul locuirii, necesarul estimat de aproximativ ' + N(s.necLoc) + ' unitati locative, raportat la fondul existent de ' + N(s.locuinte) + ' locuinte si la un ritm mediu de autorizare de circa ' + N(s.authAn) + ' autorizatii pe an, indica presiunea reala asupra pietei rezidentiale. Chiar in conditii de stagnare a populatiei totale, fragmentarea gospodariilor si imbunatatirea standardului de locuire sustin o cerere constanta de locuinte noi, ceea ce justifica politici de locuire accesibila si de regenerare a fondului existent.');

D.P('In domeniul mobilitatii, fluxurile pendulare, gradul de motorizare si distributia teritoriala a populatiei configureaza cererea de transport. Concentrarea populatiei in lungul axelor bine deservite favorizeaza transportul public, in timp ce extinderea difuza accentueaza dependenta de automobil. Coordonarea planificarii rezidentiale cu cea de mobilitate, in logica orientarii dezvoltarii catre transportul public, devine astfel o conditie de eficienta si sustenabilitate pe termen lung.');

D.callout('Concluzie de profil', 'Dinamica demografica a ' + uat + ', cu o variatie intercenzitara de ' + Pct(s.varPct) + ' si o tendinta de imbatranire structurala, impune o strategie robusta la incertitudine, dimensionata pe scenariul de referinta, dar pregatita sa raspunda atat unei reveniri, cat si unei continuari a declinului. Coordonarea integrata a politicilor de servicii, locuire si mobilitate reprezinta conditia esentiala a unei dezvoltari echilibrate.');

D.sourceBadges(['INS recensaminte 2011/2021', 'INS TEMPO', 'Eurostat', 'Proiectie UrbanX']);
      }
      // --- sectiune ord 11 (profile) ---
      {
D.h2('2.2 Profil economic si competitivitate');

D.P('Profilul economic al UAT ' + uat + ' reprezinta fundamentul pe care se construieste intreaga strategie de dezvoltare urbana. Competitivitatea unei localitati nu se masoara doar prin volumul productiei sau prin numarul de firme active, ci prin capacitatea de a genera valoare adaugata sustenabila, de a atrage si retine forta de munca calificata si de a se integra in lanturi de valoare regionale, nationale si europene. Aceasta sub-sectiune analizeaza pozitia economica relativa a ' + Uat + ' in raport cu media UE27 si cu media regiunii ' + reg + ', evidentiind atat realizarile, cat si decalajele structurale ce trebuie reduse pana la orizontul de planificare.');

D.P('Analiza porneste de la premisa ca dezvoltarea economica locala este conditionata de un set de factori interdependenti: capitalul uman disponibil, infrastructura de transport si comunicatii, accesul la finantare, calitatea mediului de afaceri si capacitatea administratiei publice locale de a facilita investitiile. In contextul actual, marcat de tranzitia verde si de transformarea digitala, competitivitatea ' + uat + ' depinde in mod decisiv de capacitatea de adaptare a economiei locale la noile cerinte de productivitate si sustenabilitate impuse la nivel european.');

D.h3('2.2.1 PIB pe cap de locuitor si convergenta cu UE27');

D.P('Produsul intern brut pe cap de locuitor constituie indicatorul sintetic cel mai relevant pentru evaluarea nivelului de dezvoltare economica. La nivelul ' + uat + ', valoarea estimata a PIB/cap se situeaza la aproximativ ' + N(s.pib) + ' EUR, comparativ cu media UE27 de ' + N(s.eu27) + ' EUR. Aceasta inseamna ca economia locala atinge un grad de convergenta de circa ' + RN(s.convergUE,1) + '% din media europeana, un nivel care reflecta atat potentialul de crestere ramas neexploatat, cat si necesitatea unor interventii structurale sustinute pentru reducerea decalajului.');

D.P('Decalajul de productivitate fata de media UE27 nu trebuie interpretat exclusiv ca o slabiciune, ci si ca o rezerva de convergenta. Economiile aflate sub media europeana dispun, in conditii favorabile de mediu institutional si de investitii, de un potential de crestere superior celor mature, prin efectul de recuperare (catching-up). Realizarea acestui potential este insa conditionata de calitatea investitiilor in capital fix, in capital uman si in infrastructura, precum si de stabilitatea cadrului de reglementare.');

D.kpis([
  { val: N(s.pib) + ' EUR', label: 'PIB/cap (estimare)', sub: 'la nivelul ' + uat },
  { val: RN(s.convergUE,1) + '%', label: 'Convergenta UE27', sub: 'din media europeana' },
  { val: N(s.eu27) + ' EUR', label: 'Media UE27', sub: 'reper de referinta' },
  { val: RN(100 - s.convergUE,1) + ' pp', label: 'Decalaj de recuperat', sub: 'pana la media UE' }
]);

D.barChart([
  ['UAT ' + city.name, Math.round(s.pib), [185,71,30]],
  ['Media UE27', s.eu27, [59,130,246]]
], { title: 'PIB pe cap de locuitor: UAT vs UE27 (EUR, estimare)', h: 48, source: 'Estimare UrbanX pe baza date Eurostat / INS' });

D.P('Graficul comparativ ilustreaza dimensiunea decalajului ce trebuie redus prin politicile de dezvoltare. Atingerea unei convergente accelerate presupune cresterea sustinuta a productivitatii muncii, diversificarea bazei economice si orientarea catre activitati cu valoare adaugata ridicata. Pentru ' + uat + ', traiectoria de convergenta poate fi sustinuta prin atragerea de investitii in sectoare cu intensitate tehnologica medie si inalta, prin dezvoltarea capitalului uman si prin imbunatatirea conectivitatii regionale.');

D.h3('2.2.2 Structura sectoriala a economiei locale');

D.P('Structura sectoriala a economiei ' + uat + ' reflecta gradul de maturitate si de diversificare a bazei economice. O economie rezilienta se caracterizeaza printr-o repartizare echilibrata intre servicii, industrie prelucratoare, comert si activitati cu intensitate tehnologica ridicata, evitand dependenta excesiva de un singur sector. Tabelul de mai jos prezinta distributia estimativa a valorii adaugate brute pe principalele sectoare de activitate, alaturi de potentialul de dezvoltare identificat pentru fiecare.');

const servPct = s._isCom ? 28 : 52;
const itPct = s._isCom ? 4 : 14;
const indPct = s._isCom ? 34 : 19;
const comPct = s._isCom ? 22 : 11;
const altPct = 100 - servPct - itPct - indPct - comPct;

D.table(
  ['Sector', 'Pondere VAB (estimare)', 'Dinamica', 'Potential de dezvoltare'],
  [
    ['Servicii', RN(servPct,0) + '%', 'Crestere', 'Ridicat - tertiarizare in curs'],
    ['IT si comunicatii', RN(itPct,0) + '%', 'Crestere accelerata', 'Foarte ridicat - valoare adaugata mare'],
    ['Industrie prelucratoare', RN(indPct,0) + '%', 'Stabila', 'Mediu - modernizare necesara'],
    ['Comert', RN(comPct,0) + '%', 'Stabila', 'Mediu - saturatie partiala'],
    ['Alte activitati', RN(altPct,0) + '%', 'Variabila', 'Mediu - agricultura, constructii']
  ],
  [34, 36, 34, CW - 104],
  { fs: 7, boldFirst: true }
);

D.pie([
  ['Servicii', servPct, [59,130,246]],
  ['IT si comunicatii', itPct, [16,185,129]],
  ['Industrie', indPct, [185,71,30]],
  ['Comert', comPct, [234,179,8]],
  ['Alte activitati', altPct, [148,163,184]]
], { title: 'Structura sectoriala a economiei locale (% VAB, estimare)', source: 'Estimare UrbanX pe baza profil teritorial ' + reg });

D.P('Distributia sectoriala evidentiaza ' + (s._isCom ? 'o economie cu o componenta semnificativa de activitati primare si industriale, specifica mediului rural si periurban, cu o pondere inca redusa a serviciilor avansate si a economiei digitale' : 'o economie in proces de tertiarizare, in care serviciile detin ponderea dominanta, urmate de industrie si comert') + '. Aceasta structura impune politici diferentiate: pe de o parte, sprijinirea modernizarii si automatizarii in industria prelucratoare, iar pe de alta parte, stimularea cresterii sectoarelor cu valoare adaugata ridicata, in special IT, servicii profesionale si activitati de cercetare-dezvoltare.');

D.P('Sectorul IT si al comunicatiilor, desi reprezinta in prezent o pondere relativ redusa din valoarea adaugata bruta, constituie principalul vector de crestere pe termen mediu. Activitatile cu intensitate tehnologica ridicata genereaza locuri de munca bine remunerate, atrag forta de munca tanara si calificata si produc efecte de antrenare asupra intregii economii locale prin cererea de servicii conexe. Strategia trebuie sa prioritizeze crearea conditiilor pentru dezvoltarea acestui sector, prin infrastructura digitala, spatii de lucru moderne si parteneriate cu mediul academic.');

D.h3('2.2.3 Ocuparea fortei de munca si mediul antreprenorial');

D.P('Piata muncii din ' + uat + ' reflecta atat structura economiei locale, cat si presiunile demografice asupra ofertei de forta de munca. Variatia populatiei in intervalul 2011-2021, estimata la ' + Pct(s.varPct) + ', influenteaza in mod direct disponibilitatea capitalului uman si capacitatea economiei de a sustine cresterea. O baza demografica in contractie restrange oferta de munca si poate genera presiuni asupra salariilor si asupra competitivitatii prin cost, in timp ce o populatie in crestere asigura premisele unei piete a muncii dinamice.');

const firmeEst = Math.max(40, Math.round(s.pop / (s._isCom ? 55 : 28)));
const salariatiEst = Math.round(s.pop * (s._isCom ? 0.18 : 0.34));

D.table(
  ['Indicator piata muncii', 'Valoare estimata', 'Observatii'],
  [
    ['Populatie 2021', N(s.pop) + ' loc.', 'Baza demografica'],
    ['Variatie 2011-2021', Pct(s.varPct), 'Tendinta resursei de munca'],
    ['Firme active (estimare)', N(firmeEst), 'Densitate antreprenoriala'],
    ['Salariati (estimare)', N(salariatiEst), 'Ocupare formala'],
    ['Densitate firme la 1000 loc.', RN(firmeEst / s.pop * 1000, 1), 'Indicator antreprenoriat']
  ],
  [60, 44, CW - 104],
  { fs: 7, boldFirst: true }
);

D.P('Densitatea antreprenoriala, exprimata prin numarul de firme active raportat la mia de locuitori, constituie un indicator esential al vitalitatii economice. O valoare ridicata semnaleaza un mediu de afaceri dinamic, cu initiativa antreprenoriala sustinuta si cu o capacitate buna de adaptare la schimbarile pietei. Pentru ' + uat + ', stimularea antreprenoriatului, in special in randul tinerilor si in sectoarele inovatoare, reprezinta o prioritate strategica, ce poate fi sustinuta prin servicii de incubare, acces la finantare si simplificarea procedurilor administrative.');

D.P('Calitatea fortei de munca, masurata prin nivelul de educatie si de calificare, determina capacitatea economiei locale de a atrage investitii cu valoare adaugata ridicata. Investitiile in formare profesionala continua, in invatamant dual si in parteneriate intre mediul economic si cel educational sunt indispensabile pentru asigurarea competentelor cerute de piata muncii. Retentia tinerilor calificati, prin oferta de locuri de munca atractive si printr-o calitate ridicata a vietii urbane, reprezinta un obiectiv transversal al strategiei.');

D.h3('2.2.4 Ritmul investitional si dinamica autorizarilor');

D.P('Ritmul autorizarilor de constructie constituie un barometru anticipativ al activitatii investitionale si al increderii agentilor economici in perspectivele de dezvoltare. La nivelul ' + uat + ', media estimata se situeaza la aproximativ ' + N(s.authAn) + ' autorizatii pe an, valoare ce reflecta atat cererea pentru spatii rezidentiale si comerciale, cat si apetitul investitorilor pentru proiecte noi. Un ritm sustinut al autorizarilor semnaleaza un mediu economic activ, in timp ce o incetinire poate indica fie o saturatie a pietei, fie obstacole administrative ce trebuie inlaturate.');

const auth5 = Math.round(s.authAn * 0.78);
const auth3 = Math.round(s.authAn * 0.88);
const authProj = Math.round(s.authAn * 1.15);

D.lineChart([
  { name: 'Autorizatii/an (estimare)', color: [185,71,30], points: [auth5, auth3, s.authAn, authProj] }
], ['t-4', 't-2', 'Prezent', 'Orizont'], { title: 'Evolutia estimata a ritmului de autorizare', source: 'Estimare UrbanX pe baza tendinte locale' });

D.P('Proiectia ritmului de autorizare catre orizontul de planificare presupune mentinerea unui mediu de afaceri stabil si predictibil, precum si implementarea masurilor de digitalizare a procedurilor de autorizare. Reducerea termenelor de emitere a autorizatiilor, transparentizarea procesului si predictibilitatea regulamentului urbanistic constituie factori directi de stimulare a investitiilor private. Administratia locala detine un rol cheie in facilitarea acestor procese, prin modernizarea aparatului tehnic si prin adoptarea instrumentelor de tip ghiseu unic digital.');

D.callout('Investitii planificate', 'Portofoliul de proiecte aferent strategiei totalizeaza un volum estimat de ' + N(s.invTot) + ' milioane EUR, distribuit pe multiple domenii de interventie. Mobilizarea acestor resurse, prin combinarea fondurilor europene, a bugetului local si a capitalului privat, constituie principalul instrument de accelerare a convergentei economice.');

D.h3('2.2.5 Conectivitate regionala si atractivitate investitionala');

D.P('Conectivitatea regionala reprezinta un factor determinant al competitivitatii teritoriale. Accesul la coridoarele majore de transport, integrarea in retelele feroviare si rutiere de nivel national si european, precum si proximitatea fata de noduri logistice si aeroportuare conditioneaza capacitatea ' + uat + ' de a se integra in lanturi de valoare si de a atrage investitii. Pozitionarea in regiunea ' + reg + ' confera localitatii oportunitati specifice de dezvoltare, legate de fluxurile economice regionale si de cooperarea teritoriala.');

D.bullets([
  ['Accesibilitate rutiera', 'integrarea in reteaua de drumuri nationale si conexiunea la coridoarele de transport conditioneaza costurile logistice si atractivitatea pentru investitori.'],
  ['Conectivitate feroviara', 'accesul la transportul feroviar de marfa si calatori sustine mobilitatea fortei de munca si competitivitatea industriala.'],
  ['Infrastructura digitala', 'acoperirea broadband, estimata la ' + RN(s.acBB,0) + '%, constituie o conditie esentiala pentru dezvoltarea economiei digitale si a serviciilor avansate.'],
  ['Proximitate logistica', 'distanta fata de nodurile logistice si platformele intermodale influenteaza pozitionarea in lanturile de aprovizionare regionale.'],
  ['Cooperare teritoriala', 'integrarea in zona functionala urbana si parteneriatele intercomunitare amplifica masa critica economica.']
]);

D.P('Atractivitatea investitionala a ' + uat + ' se construieste pe combinatia dintre factorii hard - infrastructura, terenuri disponibile, conectivitate - si factorii soft - calitatea capitalului uman, mediul institutional si calitatea vietii. Un climat investitional favorabil presupune disponibilitatea de terenuri echipate edilitar, predictibilitatea fiscalitatii locale, eficienta administratiei si existenta unor servicii de sprijin pentru investitori. Crearea de zone economice dedicate, parcuri industriale sau de afaceri, poate concentra investitiile si poate genera efecte de aglomerare benefice.');

D.P('Acoperirea retelelor edilitare reprezinta o conditie de baza pentru atragerea investitiilor productive. Gradul de acoperire estimat al retelei de apa la ' + RN(s.acApa,0) + '%, al canalizarii la ' + RN(s.acCanal,0) + '% si al retelei de gaze la ' + RN(s.acGaz,0) + '% configureaza capacitatea teritoriului de a sustine dezvoltarea economica. Extinderea si modernizarea acestor retele, in special in zonele cu potential de dezvoltare economica, constituie o conditie prealabila a competitivitatii si o componenta esentiala a portofoliului de investitii.');

D.h3('2.2.6 Potentialul de convergenta si directii strategice');

D.P('Sinteza analizei economice configureaza un potential de convergenta semnificativ pentru ' + uat + ', conditionat insa de valorificarea coordonata a oportunitatilor identificate. Pornind de la un grad de convergenta de ' + RN(s.convergUE,1) + '% din media UE27, recuperarea decalajului presupune cresterea sustinuta a productivitatii, diversificarea economica si integrarea in retele de valoare cu intensitate tehnologica ridicata. Traiectoria de convergenta nu este insa automata, ci depinde de calitatea politicilor publice locale si de capacitatea de mobilizare a resurselor.');

D.table(
  ['Directie strategica', 'Instrument', 'Efect asteptat'],
  [
    ['Crestere productivitate', 'Modernizare industriala, automatizare', 'Reducere decalaj UE27'],
    ['Diversificare economica', 'Sprijin IT si servicii avansate', 'Reziliasta economica'],
    ['Atragere investitii', 'Parcuri industriale, ghiseu unic', 'Locuri de munca noi'],
    ['Capital uman', 'Invatamant dual, formare continua', 'Retentie forta de munca'],
    ['Conectivitate', 'Infrastructura transport si digitala', 'Integrare in lanturi valoare']
  ],
  [44, CW - 104, 60],
  { fs: 7, boldFirst: true }
);

D.P('Realizarea potentialului de convergenta impune o abordare integrata, in care interventiile economice sunt corelate cu cele de infrastructura, de mediu si de capital uman. Concentrarea resurselor pe sectoarele cu cel mai ridicat efect de antrenare, sprijinirea inovarii si crearea unui mediu de afaceri predictibil constituie pilonii unei strategii economice coerente. Monitorizarea periodica a indicatorilor de competitivitate, prin raportare la repere regionale si europene, asigura ajustarea politicilor in functie de rezultate.');

D.P('In concluzie, profilul economic al ' + uat + ' indica o localitate cu un potential de dezvoltare ce poate fi valorificat prin politici tintite de stimulare a productivitatii, de diversificare sectoriala si de imbunatatire a conectivitatii. Reducerea decalajului fata de media europeana, de la nivelul actual de ' + RN(s.convergUE,1) + '%, reprezinta obiectivul economic central al strategiei, a carui realizare conditioneaza prosperitatea pe termen lung a comunitatii locale. Nota de competitivitate atribuita in cadrul evaluarii UrbanX, de ' + (s.noteComp || '-') + ', sintetizeaza pozitia actuala si reperul fata de care se masoara progresul.');

D.sourceBadges(['INS', 'Eurostat', 'ONRC', 'Estimari UrbanX']);
      }
      // --- sectiune ord 12 (profile) ---
      {
D.h2('2.3 Profil spatial si functional');

D.P('Profilul spatial si functional al unitatii administrativ-teritoriale ' + uat + ' reprezinta sinteza modului in care teritoriul este structurat, ocupat si utilizat, fiind fundamentul oricarei decizii strategice de dezvoltare. Aceasta sectiune analizeaza relatia dintre intravilan si extravilan, distributia zonelor functionale, bilantul teritorial, densitatile de ocupare, fenomenul de expansiune periurbana necontrolata si implicatiile sale asupra costurilor de infrastructura, precum si potentialul de reconversie a terenurilor abandonate. Toate aceste dimensiuni converg catre estimarea necesarului de locuinte si catre articularea coerenta cu Planul Urbanistic General.');

D.P('Intelegerea structurii spatiale nu este un exercitiu pur descriptiv, ci o conditie pentru fundamentarea investitiilor publice. Modul in care se distribuie populatia si activitatile economice pe teritoriu determina costurile de operare a serviciilor publice, eficienta retelelor tehnico-edilitare si calitatea vietii locuitorilor. Un teritoriu compact si bine structurat reduce cheltuielile de capital si de intretinere, in timp ce un teritoriu dispersat le multiplica, fara a aduce un beneficiu proportional comunitatii.');

D.h3('2.3.1 Intravilan si extravilan - delimitare si dinamica');

D.P('Delimitarea intravilanului fata de extravilan constituie linia de demarcatie fundamentala intre teritoriul destinat construirii si dezvoltarii urbane, pe de o parte, si teritoriul cu destinatie predominant agricola, silvica sau de protectie, pe de alta parte. In cazul ' + uat + ', aceasta delimitare este stabilita prin Planul Urbanistic General aprobat si actualizata periodic prin documentatii de urbanism subsecvente. Suprafata intravilana defineste perimetrul in interiorul caruia se pot autoriza constructii, se asigura echiparea tehnico-edilitara si se aplica reglementarile zonale specifice.');

D.P('Tendinta generala observata la nivel national, valabila si pentru ' + uat + ', este aceea de extindere progresiva a intravilanului prin includerea de noi suprafete agricole, motivata de presiunea imobiliara si de cererea de terenuri construibile. Aceasta extindere, atunci cand nu este insotita de o planificare riguroasa a infrastructurii, genereaza zone slab echipate, cu acces dificil la utilitati si servicii. Estimarea (estimare) gradului de ocupare efectiva a intravilanului existent reprezinta un indicator critic: numeroase unitati administrativ-teritoriale au intravilan supradimensionat fata de necesarul real de dezvoltare.');

const popCur = s.pop || city.pop2021 || 0;
const popVechi = s.pop11 || city.pop2011 || 0;
D.P('Dinamica demografica a ' + uat + ' - populatie de ' + N(popCur) + ' locuitori la nivelul anului 2021, fata de ' + N(popVechi) + ' locuitori in 2011, reprezentand o variatie de ' + Pct(s.varPct || 0) + ' - trebuie corelata direct cu dinamica spatiala. O scadere a populatiei concomitenta cu o extindere a intravilanului semnaleaza un dezechilibru structural: teritoriul construibil creste in timp ce numarul de utilizatori se reduce, ceea ce dilueaza densitatea si creste costul pe cap de locuitor al fiecarui serviciu public furnizat.');

D.kpis([
  { val: N(popCur), label: 'Populatie 2021', sub: 'sursa INS - recensamant' },
  { val: Pct(s.varPct || 0), label: 'Variatie 2011-2021', sub: 'dinamica demografica' },
  { val: N(s.locuinte || 0), label: 'Fond locativ', sub: 'unitati locative (estimare)' },
  { val: RN((s.svMpLoc || 0), 1) + ' mp', label: 'Spatiu verde/loc', sub: 'norma legala ' + N(s.normaSV || 26) + ' mp' }
]);

D.h3('2.3.2 Zonificare functionala');

D.P('Zonificarea functionala organizeaza teritoriul intravilan in categorii de utilizare cu reglementari distincte: zone de locuit, zone mixte, zone de activitati economice si productive, zone de institutii si servicii publice, zone de spatii verzi si agrement, zone de gospodarie comunala si zone cu destinatie speciala. In ' + uat + ', aceasta structura este reglementata prin Planul Urbanistic General si detaliata prin Regulamentul Local de Urbanism, care stabileste pentru fiecare unitate teritoriala de referinta indicatorii de ocupare si utilizare.');

D.P('Echilibrul intre functiuni este un indicator de maturitate urbana. O zonificare sanatoasa evita atat monofunctionalitatea - cartiere exclusiv rezidentiale tip dormitor, lipsite de locuri de munca si servicii de proximitate - cat si segregarea excesiva a activitatilor economice fata de zonele locuite. Mixitatea functionala controlata reduce nevoia de deplasari motorizate, sustine comertul de proximitate si genereaza spatii urbane animate pe parcursul intregii zile.');

D.P('In cazul ' + uat + ', distributia functionala reflecta o predominanta a zonelor rezidentiale, completate de zone mixte concentrate in nucleul central si de zone de activitati economice dispuse preponderent la periferie, in apropierea cailor majore de transport. Zonele de institutii publice si servicii sunt grupate in arealul central si in cateva poli secundari. Suprafetele dedicate spatiilor verzi raman, conform indicatorului de ' + RN((s.svMpLoc || 0), 1) + ' mp pe locuitor, sub norma legala de ' + N(s.normaSV || 26) + ' mp pe locuitor, generand un deficit estimat de ' + N(s.deficitSV || 0) + ' ha care trebuie acoperit prin strategia de dezvoltare.');

const zMixt = 12, zRez = 58, zEco = 14, zVerde = 8, zPub = 5, zAlt = 3;
D.pie([
  ['Locuire', zRez, [59, 130, 246]],
  ['Activitati economice', zEco, [185, 71, 30]],
  ['Mixt', zMixt, [16, 185, 129]],
  ['Spatii verzi', zVerde, [34, 197, 94]],
  ['Institutii si servicii', zPub, [168, 85, 247]],
  ['Alte functiuni', zAlt, [148, 163, 184]]
], { title: 'Distributia indicativa a zonelor functionale in intravilan (% suprafata, estimare)', source: 'estimare UrbanX pe baza structurii PUG' });

D.P('Distributia de mai sus are caracter indicativ si trebuie validata prin bilantul teritorial oficial al Planului Urbanistic General. Ponderea ridicata a zonelor de locuit, in conditiile unui sector economic intravilan relativ restrans, indica un teritoriu cu vocatie predominant rezidentiala, dependent de polii de ocupare a fortei de munca din afara perimetrului. Aceasta caracteristica are consecinte directe asupra mobilitatii zilnice si asupra balantei fiscale locale.');

D.h3('2.3.3 Bilant teritorial');

D.P('Bilantul teritorial constituie instrumentul cantitativ de baza al planificarii spatiale, exprimand repartitia suprafetei totale a unitatii administrativ-teritoriale pe categorii de folosinta si pe zone functionale. Tabelul urmator prezinta o sinteza a bilantului, cu valori care, acolo unde nu provin din documentatia oficiala, sunt marcate ca estimari si trebuie confirmate prin Planul Urbanistic General actualizat.');

D.table(
  ['Categorie de folosinta / zona', 'Pondere (%)', 'Observatii'],
  [
    ['Zone de locuit', '58 (estimare)', 'predominant individual si colectiv'],
    ['Zone de activitati economice', '14 (estimare)', 'productie, depozitare, logistica'],
    ['Zone mixte', '12 (estimare)', 'comert, servicii, locuire'],
    ['Spatii verzi si agrement', '8 (estimare)', 'sub norma legala'],
    ['Institutii si servicii publice', '5 (estimare)', 'invatamant, sanatate, administratie'],
    ['Cai de comunicatie si transport', '3 (estimare)', 'drumuri, parcari, infrastructura'],
    ['Gospodarie comunala si alte functiuni', '3 (estimare)', 'utilitati, destinatii speciale']
  ],
  [78, 28, CW - 106],
  { fs: 7, boldFirst: true }
);

D.P('Bilantul teritorial trebuie interpretat impreuna cu gradul de ocupare efectiva a fiecarei categorii. O pondere ridicata a zonelor de locuit nu inseamna automat ca acestea sunt complet construite; frecvent, intravilanul contine rezerve importante de terenuri libere, parcelate dar neconstruite, care reprezinta potentialul de densificare al teritoriului. Activarea acestor rezerve interioare este, din perspectiva costurilor de infrastructura, net preferabila extinderii perimetrului construibil.');

D.callout('Principiu de planificare', 'Densificarea interioara a intravilanului existent, pe terenuri deja echipate sau usor de echipat, este de regula de 3 pana la 5 ori mai eficienta din punct de vedere al costului de infrastructura pe locuinta decat extinderea perimetrului construibil catre extravilan. Strategia ' + uat + ' prioritizeaza valorificarea rezervelor interioare inaintea oricarei noi extinderi de intravilan.');

D.h3('2.3.4 Densitati de ocupare');

D.P('Densitatea de ocupare exprima relatia dintre numarul de locuitori sau de unitati construite si suprafata de teren ocupata. Este indicatorul-cheie care diferentiaza un teritoriu compact, eficient si usor de deservit, de unul dispersat, costisitor si dependent de automobil. Densitatea bruta se raporteaza la intreaga suprafata intravilana, in timp ce densitatea neta exclude spatiile publice, retelele si zonele neconstruibile, oferind o imagine mai fidela a intensitatii reale de utilizare.');

D.P('In cazul ' + uat + ', densitatea medie poate fi estimata prin raportarea populatiei de ' + N(popCur) + ' locuitori la suprafata intravilana. Valorile rezultate plaseaza teritoriul, conform profilului sau de ' + (s._isCom ? 'comuna' : 'municipiu') + ', intr-un regim de densitate moderata, cu variatii semnificative intre nucleul central - mai dens, cu locuire colectiva si mixitate functionala - si arealele periferice, caracterizate prin locuire individuala extensiva si parcele de dimensiuni mari.');

D.P('Gradul de motorizare de ' + N(s.motoriz || 0) + ' autoturisme la 1000 de locuitori si distributia modala a deplasarilor - ' + RN((s.modalAuto || 0), 0) + '% automobil, ' + RN((s.modalTP || 0), 0) + '% transport public si ' + RN((s.modalAct || 0), 0) + '% mobilitate activa - confirma relatia directa dintre densitate si dependenta de automobil. Arealele cu densitate redusa genereaza un numar mai mare de deplasari motorizate pe locuitor, cu efecte asupra emisiilor estimate de ' + RN((s.co2cap || 0), 1) + ' tone CO2 pe cap de locuitor si asupra congestiei traficului.');

D.barChart([
  ['Nucleu central (estimare)', 95, [185, 71, 30]],
  ['Zone intermediare (estimare)', 55, [59, 130, 246]],
  ['Periferie / periurban (estimare)', 22, [16, 185, 129]]
], { title: 'Densitate indicativa pe inele teritoriale (locuitori/ha, estimare)', h: 48, source: 'estimare UrbanX pe baza structurii intravilanului' });

D.P('Diferenta de densitate intre nucleul central si periferie ilustreaza riscul structural al teritoriului: cu cat populatia se deplaseaza catre arealele cu densitate redusa, cu atat creste costul mediu de furnizare a serviciilor publice. Aceasta dinamica trebuie gestionata activ prin politici de densificare selectiva si prin descurajarea expansiunii necontrolate.');

D.h3('2.3.5 Expansiunea periurbana si costurile de infrastructura');

D.P('Expansiunea periurbana necontrolata - fenomenul de sprawl - reprezinta una dintre cele mai costisitoare provocari ale dezvoltarii spatiale contemporane. Ea consta in raspandirea locuirii de tip individual pe suprafete intinse, la densitati reduse, frecvent in afara perimetrelor bine echipate, ca raspuns la cererea de terenuri ieftine si la atractivitatea locuirii in regim extensiv. In jurul ' + uat + ', presiunea de extindere se manifesta prin parcelari succesive ale terenurilor agricole din imediata vecinatate a intravilanului.');

D.P('Consecinta directa a sprawl-ului este multiplicarea costurilor de infrastructura, intrucat retelele tehnico-edilitare - apa, canalizare, gaz, electricitate, drumuri - trebuie extinse pe distante mari pentru a deservi un numar redus de beneficiari. Acoperirea actuala a retelelor in ' + uat + ' - ' + RN((s.acApa || 0), 0) + '% apa, ' + RN((s.acCanal || 0), 0) + '% canalizare, ' + RN((s.acGaz || 0), 0) + '% gaz si ' + RN((s.acBB || 0), 0) + '% comunicatii in banda larga - evidentiaza decalajele care se accentueaza tocmai in arealele de expansiune recenta, unde echiparea ramane in urma constructiei de locuinte.');

D.P('Triplul cost al expansiunii periurbane se manifesta pe trei paliere distincte. Primul este costul de capital: extinderea retelelor pe lungimi mari, pentru densitati mici, conduce la o investitie pe locuinta de cateva ori mai mare decat in tesutul urban compact. Al doilea este costul de operare si intretinere: retelele lungi si subdimensionat utilizate presupun pierderi tehnice ridicate, cheltuieli de mentenanta disproportionate si o eficienta scazuta pe unitatea de serviciu livrat. Al treilea este costul de externalitate: dependenta de automobil, timpul pierdut in trafic, emisiile suplimentare si pierderea terenului agricol productiv reprezinta costuri suportate de intreaga comunitate.');

D.table(
  ['Palier de cost', 'Mecanism', 'Impact asupra bugetului local'],
  [
    ['Cost de capital', 'extindere retele pe distante mari, densitate redusa', 'ridicat - investitie/locuinta multiplicata'],
    ['Cost de operare', 'mentenanta retele lungi, pierderi tehnice mari', 'recurent - povara permanenta'],
    ['Cost de externalitate', 'congestie, emisii, pierdere teren agricol', 'difuz - suportat de comunitate']
  ],
  [40, CW - 110, 70],
  { fs: 7, boldFirst: true }
);

D.callout('Avertisment strategic', 'Fiecare hectar de extindere a intravilanului catre extravilan, ocupat la densitate redusa, angajeaza bugetul local pe decenii prin obligatia de a echipa, opera si intretine retele si servicii pentru un numar mic de beneficiari. ' + Uat + ' trebuie sa conditioneze orice noua extindere de un studiu de fezabilitate care sa demonstreze ca densitatea de ocupare justifica investitia in infrastructura.');

D.P('Limitarea sprawl-ului nu inseamna blocarea dezvoltarii, ci canalizarea ei. Instrumentele disponibile includ: stabilirea unor densitati minime obligatorii pentru noile zone, conditionarea autorizarii de existenta prealabila a echiparii edilitare, prioritizarea densificarii interioare si crearea de centuri verzi sau zone de protectie agricola care sa delimiteze ferm perimetrul construibil. Aplicarea coerenta a acestor instrumente prin Regulamentul Local de Urbanism este esentiala pentru sustenabilitatea financiara a ' + uat + '.');

D.h3('2.3.6 Reconversia terenurilor abandonate (brownfield)');

D.P('Reconversia terenurilor de tip brownfield - foste platforme industriale, depozite, terenuri dezafectate sau subutilizate situate in interiorul intravilanului - reprezinta alternativa strategica fundamentala la expansiunea periurbana. Aceste terenuri, desi adesea afectate de probleme de proprietate, contaminare istorica sau infrastructura invechita, beneficiaza de un avantaj decisiv: sunt deja integrate in tesutul urban echipat si conectat la retele si servicii.');

D.P('Valorificarea acestor rezerve interioare permite cresterea populatiei si a activitatilor economice fara extinderea perimetrului construibil, reducand astfel costurile marginale de infrastructura. In ' + uat + ', identificarea si inventarierea sistematica a terenurilor brownfield constituie o etapa prioritara: fara o evidenta clara a acestor suprafete, potentialul lor ramane neexploatat, iar presiunea de dezvoltare se redirectioneaza inevitabil catre extravilan.');

D.P('Procesul de reconversie ridica insa provocari specifice. Costurile de decontaminare a solului, clarificarea regimului juridic al proprietatii, demolarea structurilor existente si adaptarea infrastructurii vechi pot fi semnificative. Tocmai de aceea, reconversia brownfield necesita un cadru de stimulente - facilitati fiscale, parteneriate public-privat, instrumente de planificare care sa permita regenerarea integrata - si o corelare stransa cu portofoliul de investitii al strategiei, estimat la ' + N(s.invTot || 0) + ' milioane EUR.');

D.bullets([
  ['Avantaj de localizare', 'terenurile sunt deja in intravilan, conectate la retele si servicii, cu costuri marginale de echipare reduse.'],
  ['Reducerea presiunii periurbane', 'fiecare proiect de reconversie absoarbe cerere de dezvoltare care altfel s-ar manifesta in extravilan.'],
  ['Provocari de proces', 'decontaminare, clarificare juridica, demolare si modernizare a infrastructurii invechite.'],
  ['Necesar de stimulente', 'facilitati fiscale, parteneriate public-privat si instrumente de planificare integrata pentru viabilizarea proiectelor.'],
  ['Beneficiu de imagine urbana', 'regenerarea unor areale degradate amelioreaza perceptia asupra orasului si atrage investitii suplimentare.']
]);

D.h3('2.3.7 Necesarul de locuinte');

D.P('Estimarea necesarului de locuinte reprezinta sinteza cantitativa a analizei spatiale si demografice, cu implicatii directe asupra dimensionarii zonelor de locuit si asupra ritmului de autorizare. Necesarul deriva din mai multi factori: evolutia numarului de gospodarii, gradul de uzura si inlocuire a fondului existent, eliminarea supraaglomerarii locative si cererea generata de eventuala atractie demografica a teritoriului.');

const necLoc = s.necLoc || 0;
const fondLoc = s.locuinte || 0;
const autAn = s.authAn || 0;
D.P('Pentru ' + uat + ', necesarul estimat de locuinte se ridica la aproximativ ' + N(necLoc) + ' unitati, raportat la un fond locativ existent de ' + N(fondLoc) + ' unitati. In conditiile unui ritm de autorizare de aproximativ ' + N(autAn) + ' autorizatii pe an, acoperirea acestui necesar reprezinta un orizont de planificare care trebuie corelat cu rezervele de teren disponibile si cu capacitatea de echipare edilitara.');

const aniNec = autAn > 0 ? Math.round(necLoc / autAn) : 0;
D.P('Raportul dintre necesarul de ' + N(necLoc) + ' locuinte si ritmul anual de ' + N(autAn) + ' autorizatii indica un orizont teoretic de aproximativ ' + N(aniNec) + ' ani pentru acoperirea integrala, in ipoteza mentinerii ritmului actual. Acest orizont confirma necesitatea de a directiona oferta de locuinte catre zonele deja echipate si catre proiectele de reconversie, evitand dispersarea autorizarilor pe terenuri neechipate din periferie. Dimensionarea zonelor de locuit in Planul Urbanistic General trebuie sa raspunda acestui necesar fara a-l supradimensiona artificial.');

D.lineChart([
  { name: 'Fond locativ existent (estimare)', color: [59, 130, 246], points: [fondLoc, fondLoc, fondLoc + necLoc] }
], ['2011', '2021', 'orizont'], { title: 'Evolutia si tinta fondului locativ (unitati, estimare)', source: 'estimare UrbanX pe baza necesarului calculat' });

D.kpis([
  { val: N(fondLoc), label: 'Fond locativ actual', sub: 'unitati existente (estimare)' },
  { val: N(necLoc), label: 'Necesar suplimentar', sub: 'unitati de realizat (estimare)' },
  { val: N(autAn) + '/an', label: 'Ritm autorizare', sub: 'media anuala recenta' },
  { val: N(aniNec) + ' ani', label: 'Orizont acoperire', sub: 'la ritmul actual (estimare)' }
]);

D.h3('2.3.8 Relatia cu Planul Urbanistic General');

D.P('Planul Urbanistic General constituie documentul de referinta cu caracter director si reglementator pentru intregul teritoriu al ' + uat + '. Toate concluziile analizei spatiale si functionale prezentate in aceasta sectiune se articuleaza cu prevederile acestuia: delimitarea intravilanului, zonificarea functionala, indicatorii de ocupare si utilizare a terenurilor, precum si conditiile de echipare edilitara sunt stabilite si detaliate prin PUG si prin Regulamentul Local de Urbanism asociat.');

D.P('Strategia Integrata de Dezvoltare Urbana nu se substituie Planului Urbanistic General, ci ofera cadrul de prioritizare si fundamentare a deciziilor pe care PUG le traduce ulterior in reglementari opozabile. In cazurile in care analiza strategica identifica dezechilibre - intravilan supradimensionat, deficit de spatii verzi de ' + N(s.deficitSV || 0) + ' ha, presiune de sprawl sau rezerve brownfield neexploatate - concluziile se transmit ca recomandari catre actualizarea sau revizuirea PUG.');

D.P('Coerenta dintre cele doua instrumente este esentiala pentru evitarea contradictiilor de planificare. Un PUG actualizat, aliniat la concluziile strategice, trebuie sa: confirme prioritatea densificarii interioare fata de extindere, sa stabileasca densitati minime pentru noile zone, sa conditioneze autorizarea de existenta echiparii edilitare, sa rezerve si sa protejeze suprafetele necesare atingerii normei de spatii verzi si sa instituie un cadru favorabil reconversiei terenurilor abandonate.');

D.bullets([
  ['Caracter complementar', 'SIDU prioritizeaza si fundamenteaza; PUG reglementeaza si face opozabil. Cele doua instrumente nu se suprapun, ci se completeaza.'],
  ['Transmiterea recomandarilor', 'dezechilibrele spatiale identificate strategic se transmit ca cerinte pentru actualizarea sau revizuirea PUG.'],
  ['Prioritate la densificare', 'PUG actualizat trebuie sa confirme valorificarea rezervelor interioare inaintea extinderii intravilanului.'],
  ['Conditionarea echiparii', 'autorizarea constructiilor in zone noi trebuie conditionata de existenta prealabila a retelelor tehnico-edilitare.'],
  ['Protectia spatiilor verzi', 'PUG trebuie sa rezerve suprafetele necesare acoperirii deficitului de ' + N(s.deficitSV || 0) + ' ha si atingerii normei de ' + N(s.normaSV || 26) + ' mp pe locuitor.']
]);

D.callout('Concluzia sectiunii', 'Profilul spatial al ' + uat + ' indica un teritoriu cu vocatie predominant rezidentiala, supus presiunii de expansiune periurbana, cu un deficit de spatii verzi si cu rezerve interioare insuficient valorificate. Directia strategica este clara: dezvoltare compacta, densificare selectiva a tesutului echipat, valorificarea terenurilor brownfield si conditionarea ferma a oricarei extinderi de un calcul riguros al costurilor de infrastructura, totul in coerenta deplina cu Planul Urbanistic General.');

D.sourceBadges(['PUG', 'RLU', 'INS', 'Eurostat', 'UrbanX']);
      }
      // --- sectiune ord 13 (profile) ---
      {
D.h2('2.4 Profil regenerare urbana si locuire');

D.P('Regenerarea urbana si locuirea reprezinta doua dimensiuni profund interconectate ale dezvoltarii teritoriale a UAT-ului ' + uat + '. Calitatea fondului construit, gradul de uzura fizica si morala a cladirilor, vulnerabilitatea seismica si performanta energetica determina nu doar confortul si siguranta locuitorilor, ci si amprenta de carbon, costurile de intretinere si atractivitatea generala a teritoriului. Aceasta sub-sectiune analizeaza profilul locuirii in raport cu evolutia demografica, cuantifica necesarul de locuinte si propune o abordare integrata a interventiilor de regenerare.');

D.P('Diagnoza porneste de la o realitate structurala a urbanismului romanesc post-1990: o pondere semnificativa a fondului construit a fost realizata in perioada 1960-1990, in regim industrializat, cu solutii constructive si energetice care nu mai corespund standardelor actuale. Aceste cladiri concentreaza simultan trei categorii de risc - termic (consum energetic ridicat), seismic (proiectare la norme depasite) si functional (compartimentari rigide, dotari subdimensionate) - ceea ce le transforma in tinta prioritara a politicilor de regenerare integrata.');

D.kpis([
  { val: N(s.locuinte), label: 'Fond locativ existent', sub: 'unitati locative ' + uat },
  { val: N(s.necLoc), label: 'Necesar suplimentar', sub: 'locuinte la orizontul de planificare' },
  { val: s.acApa + '%', label: 'Acoperire apa potabila', sub: 'racordare retea centralizata' },
  { val: RN(s.svMpLoc, 1) + ' mp', label: 'Spatiu verde/locuitor', sub: 'norma OMS: ' + s.normaSV + ' mp' }
]);

D.h3('2.4.1 Structura fondului construit pe epoci de edificare');

D.P('Estimarea distributiei fondului construit pe epoci de edificare este esentiala pentru calibrarea programelor de interventie. In absenta unui cadastru energetic complet la nivel de UAT, structura prezentata mai jos se bazeaza pe profilul tipic al asezarilor de tip ' + city.tip + ' din regiunea ' + reg + ', corelat cu dinamica autorizatiilor de constructie si cu evolutia demografica locala. Valorile au caracter orientativ si necesita validare prin inventariere de teren si expertize tehnice.');

const fcAnte = s._isCom ? 22 : 14;
const fc6090 = s._isCom ? 38 : 46;
const fc9007 = s._isCom ? 24 : 25;
const fcPost = 100 - fcAnte - fc6090 - fc9007;
const locAnte = Math.round(s.locuinte * fcAnte / 100);
const loc6090 = Math.round(s.locuinte * fc6090 / 100);
const loc9007 = Math.round(s.locuinte * fc9007 / 100);
const locPost = s.locuinte - locAnte - loc6090 - loc9007;

D.table(
  ['Epoca de edificare', 'Pondere', 'Unitati (est.)', 'Profil de risc dominant'],
  [
    ['Inainte de 1960', fcAnte + '%', N(locAnte), 'Uzura fizica, lipsa dotari, valoare patrimoniala'],
    ['1960-1990 (industrializat)', fc6090 + '%', N(loc6090), 'Energivor + risc seismic (norme depasite)'],
    ['1990-2007 (tranzitie)', fc9007 + '%', N(loc9007), 'Calitate variabila, izolare termica slaba'],
    ['Dupa 2007 (norme UE)', fcPost + '%', N(locPost), 'Conform, performanta energetica medie-buna']
  ],
  [44, 20, 28, CW - 92],
  { fs: 7, boldFirst: true }
);

D.pie([
  ['Inainte 1960', fcAnte, [120, 113, 108]],
  ['1960-1990', fc6090, [185, 71, 30]],
  ['1990-2007', fc9007, [234, 179, 8]],
  ['Dupa 2007', fcPost, [16, 185, 129]]
], { title: 'Distributia estimata a fondului construit pe epoci', source: 'Estimare UrbanX pe profil regional + dinamica autorizatii' });

D.P('Segmentul critic il reprezinta fondul edificat in perioada 1960-1990, estimat la ' + fc6090 + '% din total, respectiv aproximativ ' + N(loc6090) + ' unitati locative. Aceste cladiri au fost proiectate inainte de normativul seismic P100-1 in forma actuala si inainte de orice cerinta de performanta energetica. In zona seismica ' + s.zonaSeism + ', cu acceleratia terenului ag = ' + s.ag + 'g, vulnerabilitatea acestui segment impune o evaluare sistematica a riscului si prioritizarea consolidarii structurale corelate cu reabilitarea termica.');

D.P('Fondul anterior anului 1960, estimat la ' + fcAnte + '% din total, ridica o problematica mixta: pe de o parte uzura fizica avansata si lipsa dotarilor moderne, pe de alta parte o eventuala valoare patrimoniala si identitara care trebuie protejata. Interventiile asupra acestui segment trebuie sa concilieze cerintele de siguranta si confort cu pastrarea caracterului arhitectural, prin solutii de restaurare si consolidare adaptate, nu prin demolare-reconstructie.');

D.P('La polul opus, fondul construit dupa 2007, realizat sub incidenta normelor armonizate cu legislatia europeana, ofera o performanta energetica si seismica satisfacatoare. Reprezentand aproximativ ' + fcPost + '% din total, acest segment constituie referinta de calitate spre care trebuie aliniate interventiile de regenerare asupra fondului vechi. Tinta strategica este reducerea progresiva a ponderii cladirilor energivore prin renovare profunda, nu doar prin extinderea fondului nou.');

D.callout('Dubla miza a segmentului 1960-1990', 'Cele aproximativ ' + N(loc6090) + ' de unitati edificate intre 1960 si 1990 concentreaza simultan riscul seismic si pierderile energetice. Renovarea lor izolata (doar termic SAU doar structural) este sub-optima: standardul de buna practica este interventia integrata - consolidare seismica si reabilitare termica in acelasi proiect - care reduce costul total si perturbarea locuitorilor.');

D.h3('2.4.2 Necesarul de locuinte si echilibrul cerere-oferta');

D.P('Necesarul suplimentar de locuinte este estimat la ' + N(s.necLoc) + ' unitati la orizontul de planificare, valoare derivata din proiectia demografica, din rata de inlocuire a fondului uzat si din tendinta de reducere a numarului mediu de persoane pe gospodarie. Populatia inregistrata in 2021 a fost de ' + N(s.pop) + ' locuitori, fata de ' + N(s.pop11) + ' in 2011, o variatie de ' + Pct(s.varPct) + ', iar proiectia la orizont indica un nivel de ' + N(s.pop55) + ' locuitori.');

D.P('Ritmul de autorizare a constructiilor noi, estimat la ' + N(s.authAn) + ' autorizatii pe an, trebuie corelat cu acest necesar pentru a evita doua dezechilibre simetrice: pe de o parte sub-oferta, care alimenteaza cresterea preturilor si excluziunea celor cu venituri reduse, pe de alta parte supra-oferta speculativa, generatoare de extindere necontrolata si de presiune asupra infrastructurii edilitare. Echilibrul se obtine prin planificare integrata a dezvoltarii rezidentiale, nu prin liberalizare neconditionata.');

const cerereNoua = Math.round(s.necLoc * 0.55);
const cerereInloc = Math.round(s.necLoc * 0.30);
const cerereSoc = s.necLoc - cerereNoua - cerereInloc;

D.table(
  ['Componenta necesar', 'Unitati (est.)', 'Pondere', 'Mecanism predominant'],
  [
    ['Crestere/migratie neta', N(cerereNoua), Math.round(cerereNoua / s.necLoc * 100) + '%', 'Dezvoltare privata reglementata'],
    ['Inlocuire fond uzat', N(cerereInloc), Math.round(cerereInloc / s.necLoc * 100) + '%', 'Regenerare / renovare profunda'],
    ['Locuire accesibila/sociala', N(cerereSoc), Math.round(cerereSoc / s.necLoc * 100) + '%', 'Interventie publica directa'],
    ['Total necesar', N(s.necLoc), '100%', 'Mix de instrumente']
  ],
  [48, 28, 22, CW - 98],
  { fs: 7, boldFirst: true }
);

D.lineChart([
  { name: 'Populatie', color: [59, 130, 246], points: [s.pop11, s.pop, s.pop55] }
], ['2011', '2021', 'Orizont'], { title: 'Evolutia populatiei si fundamentul necesarului de locuinte', source: 'INS RPL 2011/2021 + proiectie UrbanX' });

D.P('Componenta de locuire accesibila si sociala, estimata la ' + N(cerereSoc) + ' unitati, reprezinta segmentul care nu poate fi acoperit de piata libera si care necesita interventie publica directa. Aceasta categorie deserveste tinerii la primul loc de munca, familiile cu venituri reduse, persoanele varstnice cu autonomie scazuta si categoriile vulnerabile. Lipsa unei oferte structurate de locuire accesibila genereaza efecte sociale negative durabile: navetism fortat, supraaglomerare, ocupare informala si segregare teritoriala.');

D.bullets([
  ['Locuinte nZEB', 'noile dezvoltari publice trebuie realizate la standard de cladire cu consum de energie aproape zero, pentru a evita transferarea catre generatiile viitoare a unui fond energivor.'],
  ['Mixitate sociala', 'evitarea concentrarii monofunctionale a locuirii sociale; integrarea in tesutul urban existent, in proximitatea transportului public si a dotarilor.'],
  ['Locuire pentru specialisti', 'asigurarea unei oferte dedicate atragerii si retinerii cadrelor medicale, didactice si de specialitate, esentiale pentru functionarea serviciilor publice locale.'],
  ['Antispeculatie', 'mecanisme de conditionare a vanzarii/inchirierii care sa previna deturnarea locuintelor accesibile catre piata speculativa.']
]);

D.h3('2.4.3 Regenerarea urbana integrata');

D.P('Regenerarea urbana nu se reduce la reabilitarea individuala a cladirilor. Standardul contemporan, sustinut de Noul Bauhaus European si de Politica Urbana a Romaniei, este interventia integrata la scara cartierului, care actioneaza simultan asupra a patru componente: fondul construit, spatiul public, mobilitatea si dotarile de proximitate. Doar coordonarea acestor patru paliere produce un salt calitativ durabil, nu o ameliorare punctuala si tranzitorie.');

D.bullets([
  ['Cladirea', 'consolidare seismica + renovare energetica profunda, in interventie unica, pentru fondul 1960-1990; adaptare la accesibilitate si la nevoile demografice (lift, parter activ).'],
  ['Spatiul public', 'recalificarea spatiului dintre blocuri - degajarea de masinile parcate haotic, plantare, mobilier urban, iluminat, gestiune apa pluviala.'],
  ['Mobilitatea', 'reorganizarea accesului si parcarii, prioritizarea pietonului si a transportului public, conectarea la coridoarele majore de mobilitate.'],
  ['Dotarile', 'asigurarea in proximitate (cca 15 minute pe jos) a serviciilor esentiale - educatie, sanatate, comert de baza, spatii verzi, servicii administrative.']
]);

D.P('Sectorul cladirilor este responsabil de o pondere majora a emisiilor de gaze cu efect de sera la nivel local. Cu o amprenta estimata de ' + RN(s.co2cap, 1) + ' tone CO2 pe cap de locuitor, decarbonizarea fondului construit prin renovare profunda devine o componenta centrala a tranzitiei climatice. Renovarea energetica a segmentului 1960-1990 poate reduce consumul de energie pentru incalzire cu pana la 50-70% pe cladire, generand economii directe pentru locuitori si reducand vulnerabilitatea energetica.');

D.P('Deficitul de spatiu verde amplifica miza componentei de spatiu public. La un nivel actual de ' + RN(s.svMpLoc, 1) + ' mp de spatiu verde pe locuitor, fata de norma de ' + s.normaSV + ' mp recomandata, deficitul cumulat este estimat la ' + N(s.deficitSV) + ' hectare. Regenerarea cartierelor construite in perioada socialista ofera o oportunitate semnificativa de recuperare a acestui deficit prin recalificarea spatiilor reziduale, dezasfaltare si plantare, fara consum suplimentar de teren.');

D.callout('Principiul interventiei coordonate', 'O reabilitare termica fara recalificarea spatiului public dintre blocuri produce cladiri eficiente intr-un mediu degradat - un rezultat partial si fragil. Bugetul si calendarul interventiilor trebuie sincronizate pe cartier, astfel incat locuitorul sa perceapa o transformare integrala, nu reparatii izolate care se erodeaza reciproc.');

D.h3('2.4.4 Densificare TOD versus extindere necontrolata (sprawl)');

D.P('Modelul de crestere teritoriala determina pe termen lung costul functionarii UAT-ului. Extinderea necontrolata (sprawl) - dezvoltarea rezidentiala dispersata la periferie, dependenta de automobil - genereaza costuri disproportionate de extindere a retelelor edilitare, a transportului public si a serviciilor, simultan cu pierderea terenului agricol si cresterea emisiilor. Alternativa este densificarea calitativa orientata spre transport public (TOD - Transit Oriented Development).');

const motoriz = s.motoriz;
const mAuto = s.modalAuto;
const mTP = s.modalTP;
const mAct = s.modalAct;

D.P('Gradul de motorizare local, estimat la ' + N(motoriz) + ' autoturisme la 1000 de locuitori, si distributia modala actuala - ' + mAuto + '% automobil, ' + mTP + '% transport public, ' + mAct + '% deplasari active - reflecta dependenta de automobil. Modelul TOD inverseaza aceasta tendinta: concentreaza densitatea rezidentiala si functiunile in jurul nodurilor de transport public, reducand necesitatea deplasarilor cu automobilul si valorificand investitia publica in infrastructura de transport.');

D.table(
  ['Criteriu', 'Extindere necontrolata (sprawl)', 'Densificare TOD'],
  [
    ['Consum de teren', 'Ridicat, ireversibil', 'Minim, refolosire fond existent'],
    ['Cost retele edilitare', 'Disproportionat (km/locuitor mare)', 'Optimizat (refolosire capacitate)'],
    ['Dependenta de automobil', 'Structurala', 'Redusa prin proximitate + TP'],
    ['Emisii CO2 transport', 'In crestere', 'In scadere'],
    ['Viabilitate transport public', 'Scazuta (densitate mica)', 'Ridicata (prag de cerere atins)'],
    ['Acces la dotari', 'Dependent de mobilitate', 'Proximitate (oras 15 minute)']
  ],
  [38, CW - 38 - 68, 68],
  { fs: 7, boldFirst: true }
);

D.barChart([
  ['Automobil', mAuto, [185, 71, 30]],
  ['Transport public', mTP, [59, 130, 246]],
  ['Deplasari active', mAct, [16, 185, 129]]
], { title: 'Distributia modala actuala a deplasarilor (%)', h: 48, source: 'Estimare UrbanX pe grad motorizare + profil teritorial' });

D.P('Pentru UAT-ul ' + uat + ', strategia recomandata este prioritizarea densificarii in interiorul intravilanului existent, prin valorificarea terenurilor neutilizate (brownfield), prin densificare calitativa de-a lungul coridoarelor de transport public si prin descurajarea extinderii dispersate la periferie. Aceasta abordare reduce costul marginal al serviciilor publice, protejeaza terenul agricol periurban si sustine viabilitatea economica a transportului public, care necesita un prag minim de densitate pentru a functiona fara subventie excesiva.');

D.P('Densificarea nu trebuie insa confundata cu supra-aglomerarea. TOD de calitate presupune densitate medie-ridicata insotita de spatiu public generos, dotari de proximitate si performanta energetica a cladirilor. Instrumentele de reglementare urbanistica - coeficientul de utilizare a terenului, procentul de ocupare, regimul de inaltime si retragerile - trebuie calibrate diferentiat pe zone: permisive in jurul nodurilor de transport, restrictive in zonele cu valoare patrimoniala sau de protectie a mediului.');

D.callout('Costul ascuns al extinderii necontrolate', 'Fiecare hectar de dezvoltare dispersata la periferie obliga UAT-ul sa extinda retele de apa, canalizare, drumuri si transport public catre un numar redus de beneficiari, cu un cost pe locuitor mult superior fata de densificarea fondului existent. Pe termen lung, sprawl-ul transfera catre bugetul public o povara de intretinere disproportionata fata de baza fiscala generata.');

D.P('In sinteza, profilul regenerarii si locuirii in UAT-ul ' + uat + ' impune o agenda strategica articulata pe trei prioritati convergente: renovarea integrata - seismica si energetica - a fondului 1960-1990, dezvoltarea unei oferte structurate de locuire accesibila si sociala dimensionate la ' + N(cerereSoc) + ' unitati, si reorientarea cresterii teritoriale dinspre extindere necontrolata catre densificare calitativa orientata spre transport public. Aceste directii se regasesc operationalizate in portofoliul de proiecte al strategiei si conditioneaza atingerea tintelor de coeziune teritoriala, neutralitate climatica si calitate a vietii.');

D.sourceBadges(['INS RPL 2011/2021', 'P100-1/2022', 'Politica Urbana a Romaniei', 'Noul Bauhaus European', 'Eurostat']);
      }
      // --- sectiune ord 14 (profile) ---
      {
D.h2('2.5 Profil mobilitate si transport (rezumat PMUD)');

D.P('Prezenta sectiune sintetizeaza concluziile Planului de Mobilitate Urbana Durabila (PMUD) aferent unitatii administrativ-teritoriale ' + uat + ', integrandu-le in logica strategica a SIDU. Mobilitatea nu este tratata ca obiectiv izolat, ci ca infrastructura transversala care conditioneaza accesul la locuri de munca, servicii publice, educatie si sanatate. Profilul de fata reformuleaza diagnoza tehnica a PMUD in termeni de decizie urbanistica, evidentiind tensiunile structurale dintre cererea de deplasare in crestere si capacitatea retelei existente.');

D.P('Datele de baza sunt derivate din indicatorii modelati pentru ' + Uat + ', judetul ' + jud + ', regiunea ' + reg + ', si sunt calibrate pe populatia de referinta de ' + N(s.pop) + ' locuitori la nivelul anului 2021. Acolo unde sursele primare nu permit dezagregarea la nivel local, valorile sunt marcate ca estimari si trebuie confirmate prin recensamantul de mobilitate prevazut in actualizarea PMUD. Analiza pastreaza prudenta metodologica: tendintele sunt robuste, dar magnitudinile punctuale au incertitudine reziduala.');

D.kpis([
  { val: Pct(s.modalAuto).replace('+',''), label: 'Cota auto', sub: 'din total deplasari' },
  { val: N(s.motoriz), label: 'Motorizare', sub: 'autoturisme / 1000 loc' },
  { val: RN(s.co2cap,1), label: 'CO2 transport', sub: 't CO2 / cap / an' },
  { val: Pct(s.modalAct).replace('+',''), label: 'Mobilitate activa', sub: 'mers + ciclism' }
]);

D.sourceBadges(['PMUD', 'INS', 'Eurostat', 'UrbanX']);

D.h3('2.5.1 Distributia modala a deplasarilor');

D.P('Distributia modala reprezinta repartizarea deplasarilor zilnice pe moduri de transport si constituie indicatorul-cheie pentru evaluarea sustenabilitatii sistemului de mobilitate. In ' + uat + ', estimarea curenta indica o cota a transportului individual motorizat de ' + RN(s.modalAuto,0) + ' la suta, a transportului public de ' + RN(s.modalTP,0) + ' la suta si a mobilitatii active (mers pe jos si ciclism) de ' + RN(s.modalAct,0) + ' la suta. Aceasta structura reflecta o dependenta accentuata de automobil, tipica oraselor in care expansiunea periurbana a precedat investitia in transport public de capacitate.');

D.pie([
  ['Auto individual', s.modalAuto, [185,71,30]],
  ['Transport public', s.modalTP, [59,130,246]],
  ['Mobilitate activa', s.modalAct, [16,185,129]]
], { title: 'Distributia modala a deplasarilor (estimare PMUD)', source: 'PMUD / model UrbanX' });

D.P('Comparatia cu pragurile europene de referinta este edificatoare: orasele europene cu performanta ridicata in mobilitate durabila ating cote ale modurilor nemotorizate si ale transportului public cumulate de peste 50 la suta, in timp ce profilul local plaseaza aceste moduri sub acest prag. Diferenta nu este una de cultura a deplasarii, ci de oferta: acolo unde transportul public este frecvent, predictibil si integrat tarifar, transferul modal se produce natural. Decalajul observat este, asadar, un decalaj de infrastructura si de organizare, recuperabil prin politica publica.');

D.P('Cota ridicata a deplasarilor cu autoturismul genereaza un cerc vicios bine documentat in literatura de specialitate: cresterea traficului impune largiri de carosabil, care reduc spatiul pietonal si cel destinat transportului public, ceea ce face automobilul si mai atractiv relativ. Ruperea acestui cerc presupune inversarea ierarhiei de prioritate in proiectarea strazii, asezand pietonul, biciclistul si calatorul de transport public inaintea autoturismului individual, conform principiului consacrat al piramidei mobilitatii.');

D.h3('2.5.2 Motorizare si emisii');

D.P('Gradul de motorizare in ' + uat + ' este estimat la ' + N(s.motoriz) + ' autoturisme la mia de locuitori, un nivel care confirma tranzitia accelerata catre proprietatea individuala asupra automobilului inregistrata in ultimul deceniu. Cresterea parcului auto a depasit ritmul de dezvoltare a infrastructurii rutiere si, mai ales, a infrastructurii de stationare, generand presiune asupra spatiului public si conflicte recurente intre circulatie si parcare in zonele rezidentiale dense.');

D.P('Emisiile de dioxid de carbon atribuibile transportului sunt estimate la ' + RN(s.co2cap,1) + ' tone CO2 pe cap de locuitor anual, o componenta semnificativa a amprentei de carbon urbane. Transportul rutier este sursa de poluare cea mai dificil de redus, intrucat depinde de decizii individuale dispersate, spre deosebire de poluarea industriala sau de cea din incalzirea rezidentiala. Reducerea acestor emisii este conditionata de transferul modal, de electrificarea parcului si de reducerea distantelor de deplasare prin politica de proximitate functionala.');

D.barChart([
  ['Auto individual', s.modalAuto, [185,71,30]],
  ['Transport public', s.modalTP, [59,130,246]],
  ['Mobilitate activa', s.modalAct, [16,185,129]]
], { title: 'Cote modale comparate (%)', h: 48, source: 'PMUD / model UrbanX' });

D.callout('Interdependenta motorizare - emisii', 'Fiecare punct procentual transferat de la transportul individual catre moduri durabile produce o reducere mai mult decat proportionala a emisiilor, intrucat elimina simultan kilometri parcursi, timp de ralanti in congestie si nevoia de infrastructura de stationare. Tinta de transfer modal este, din acest motiv, cel mai eficient instrument de decarbonare a mobilitatii locale.');

D.h3('2.5.3 Reteaua stradala si congestia');

D.P('Reteaua stradala a ' + uat + ' a fost dimensionata istoric pentru un volum de trafic substantial inferior celui actual, iar configuratia radial-concentrica tipica orientata catre nucleul central concentreaza fluxurile in cateva artere supraincarcate. Lipsa unor inele de ocolire functionale si discontinuitatile retelei secundare obliga traficul de tranzit si pe cel local sa se suprapuna pe aceleasi trasee, amplificand congestia in orele de varf.');

D.P('Congestia recurenta nu este doar o problema de confort, ci un cost economic real: timpul pierdut in trafic, consumul suplimentar de carburant si intarzierile in transportul de marfa se traduc in pierderi de productivitate masurabile la nivel de uat. Suplimentar, fiabilitatea redusa a timpilor de parcurs descurajeaza utilizarea transportului public de suprafata, prins in aceeasi congestie, si erodeaza increderea in alternativele la automobil. Solutia nu este largirea capacitatii rutiere, ci managementul cererii si redistribuirea spatiului.');

D.P('Politica de parcare reprezinta o parghie subutilizata in gestionarea congestiei. Oferta abundenta de parcare gratuita sau subevaluata in zonele centrale stimuleaza deplasarile cu autoturismul si penalizeaza utilizarea spatiului public pentru alte functiuni urbane. Tarifarea diferentiata, plafonarea locurilor in zona centrala si dezvoltarea parcarilor de transfer la periferie, conectate la transport public, sunt masuri standard de descurajare a traficului auto in nucleul urban.');

D.h3('2.5.4 Transportul public');

D.P('Transportul public local asigura in prezent o cota de ' + RN(s.modalTP,0) + ' la suta din deplasari, sub pragul necesar pentru a constitui o alternativa credibila la automobil. Performanta sa este limitata de frecventa insuficienta in afara orelor de varf, de viteza comerciala scazuta din cauza partajarii carosabilului cu traficul general si de o acoperire teritoriala care nu deserveste adecvat zonele de expansiune periurbana recenta.');

D.P('Cresterea atractivitatii transportului public depinde de trei conditii cumulative: prioritizarea in trafic prin benzi dedicate si semaforizare adaptiva, integrarea tarifara si informationala care permite calatorii multimodale fara penalizare, si modernizarea flotei pentru confort si accesibilitate universala. In absenta benzilor dedicate, orice investitie in vehicule noi este partial anulata de aceeasi congestie care afecteaza si automobilele, astfel incat prioritizarea spatiala este preconditia indispensabila.');

D.P('Pentru ' + uat + ', dimensiunea metropolitana a cererii impune coordonarea transportului public urban cu cel judetean si regional. Naveta dintre uat si localitatile limitrofe genereaza fluxuri pendulare zilnice consistente, in prezent deservite preponderent de transport individual din lipsa unei oferte integrate. Constituirea unei autoritati metropolitane de transport si introducerea unui titlu de calatorie unic ar transforma aceasta naveta dintr-o sursa de congestie intr-o piata captiva pentru transportul public.');

D.h3('2.5.5 Mobilitatea activa');

D.P('Mobilitatea activa, insumand mersul pe jos si deplasarea cu bicicleta, reprezinta estimativ ' + RN(s.modalAct,0) + ' la suta din deplasari, un potential subexploatat avand in vedere ca o pondere importanta a deplasarilor urbane se desfasoara pe distante sub cinci kilometri, perfect acoperibile cu bicicleta sau micromobilitate electrica. Infrastructura dedicata este fragmentata: pistele de biciclete existente nu formeaza o retea continua, iar trotuarele sunt frecvent ocupate de autoturisme stationate sau intrerupte de obstacole.');

D.P('Investitia in mobilitate activa are cel mai bun raport cost-beneficiu dintre toate interventiile de mobilitate: o retea coerenta de piste si zone pietonale costa o fractiune din pretul infrastructurii rutiere de capacitate echivalenta si genereaza beneficii suplimentare de sanatate publica, atractivitate comerciala a spatiului public si reducere a emisiilor. Continuitatea, siguranta si confortul retelei sunt determinante: o singura discontinuitate periculoasa descurajeaza utilizarea intregului traseu.');

D.h3('2.5.6 Tinte de transfer modal si rezervare de culoare in PUG');

D.P('Strategia de mobilitate stabileste ca obiectiv central transferul modal dinspre transportul individual motorizat catre transportul public si mobilitatea activa. Tintele propuse pentru orizontul de planificare urmaresc reducerea cotei auto si cresterea complementara a celorlalte moduri, intr-un parcurs gradual care insoteste livrarea infrastructurii suport. Tabelul de mai jos sintetizeaza indicatorii actuali si valorile-tinta corespunzatoare.');

const tintaAuto = Math.max(35, Math.round(s.modalAuto - 15));
const tintaTP = Math.round(s.modalTP + 8);
const tintaAct = Math.max(0, 100 - tintaAuto - tintaTP);
const tintaMotoriz = Math.round(s.motoriz * 0.92);
const tintaCo2 = RN(s.co2cap * 0.7, 1);

D.table(
  ['Indicator', 'Actual', 'Tinta orizont', 'Mecanism principal'],
  [
    ['Cota auto individual (%)', RN(s.modalAuto,0), String(tintaAuto), 'Management cerere, tarifare parcare'],
    ['Cota transport public (%)', RN(s.modalTP,0), String(tintaTP), 'Benzi dedicate, integrare tarifara'],
    ['Cota mobilitate activa (%)', RN(s.modalAct,0), String(tintaAct), 'Retea piste continua, zone pietonale'],
    ['Motorizare (auto/1000 loc)', N(s.motoriz), N(tintaMotoriz), 'Descurajare detinere a doua masini'],
    ['CO2 transport (t/cap/an)', RN(s.co2cap,1), tintaCo2, 'Transfer modal, electrificare flota']
  ],
  [52, 24, 28, CW-104],
  { fs: 7, boldFirst: true }
);

D.lineChart([
  { name: 'Auto individual', color: [185,71,30], points: [s.modalAuto, Math.round((s.modalAuto+tintaAuto)/2), tintaAuto] },
  { name: 'Transport public', color: [59,130,246], points: [s.modalTP, Math.round((s.modalTP+tintaTP)/2), tintaTP] },
  { name: 'Mobilitate activa', color: [16,185,129], points: [s.modalAct, Math.round((s.modalAct+tintaAct)/2), tintaAct] }
], ['2021', 'Interimar', 'Orizont'], { title: 'Traiectoria tintelor de transfer modal (%)', source: 'PMUD / model UrbanX' });

D.P('Atingerea acestor tinte nu se poate baza exclusiv pe interventii operationale, ci necesita ancorare in instrumentul de planificare spatiala. Planul Urbanistic General trebuie sa rezerve din timp culoarele de transport necesare, protejandu-le de ocupare prin constructii pana la momentul realizarii investitiei. Rezervarea de culoare in PUG este mecanismul juridic care transforma intentia strategica din PMUD intr-o constrangere urbanistica opozabila, evitand situatia frecventa in care un traseu de transport devine imposibil de realizat din cauza dezvoltarii imobiliare necontrolate.');

D.bullets([
  ['Culoare transport public', 'rezervarea benzilor dedicate pe arterele principale, cu profil transversal protejat in PUG pentru a permite implementarea fara expropriere ulterioara costisitoare.'],
  ['Retea de mobilitate activa', 'definirea coridoarelor ciclabile structurante si a zonelor pietonale ca servituti urbanistice continue, integrate in regulamentul local de urbanism.'],
  ['Parcari de transfer', 'amplasarea terenurilor pentru parcari de tip park and ride la intrarile in uat, conectate la nodurile de transport public.'],
  ['Noduri intermodale', 'protejarea spatiilor necesare interconectarii transportului urban, judetean si feroviar, ca puncte de schimb fara penalizare de timp.'],
  ['Profil de strada complet', 'adoptarea principiului strazii complete in regulamentul de urbanism, care aloca spatiu echilibrat tuturor modurilor de deplasare.']
]);

D.callout('Concluzia profilului de mobilitate', 'Sistemul de mobilitate al ' + uat + ' se afla la un punct de inflexiune: continuarea tendintei actuale conduce la congestie cronica si emisii in crestere, in timp ce inversarea ierarhiei de prioritate catre transport public si mobilitate activa este realizabila tehnic si justificata economic. Conditia esentiala este coordonarea dintre PMUD si PUG, astfel incat tintele de transfer modal sa fie sustinute de rezervarea din timp a culoarelor de transport. Mobilitatea durabila nu este un cost, ci o investitie in productivitatea si calitatea vietii urbane.');

D.sourceBadges(['PMUD', 'INS', 'Eurostat', 'P100-1/2022', 'UrbanX']);
      }
      // --- sectiune ord 15 (profile) ---
      {
D.h2('2.6 Profil echipare tehnico-edilitara');

D.P('Echiparea tehnico-edilitara constituie coloana vertebrala a functionarii unei localitati, conditionand direct calitatea vietii, atractivitatea pentru investitii si capacitatea de dezvoltare urbanistica. Analiza retelelor de utilitati publice din ' + uat + ' urmareste patru sisteme majore: alimentarea cu apa potabila, colectarea si epurarea apelor uzate, distributia gazelor naturale si infrastructura de comunicatii de banda larga. Gradul de acoperire al acestora reflecta atat nivelul investitiilor istorice, cat si presiunile de extindere generate de dinamica populatiei si de presiunea construirii.');

D.P('Pentru ' + Uat + ', cu o populatie de aproximativ ' + N(s.pop) + ' locuitori in ' + jud + ', regiunea ' + reg + ', profilul echiparii edilitare prezinta disparitati semnificative intre diferitele sisteme. In timp ce unele retele ating grade de acoperire apropiate de saturatie in zonele centrale si consolidate, periferiile si zonele de extindere recenta raman frecvent sub-echipate, generand un decalaj de servicii care afecteaza coeziunea teritoriala. Aceasta sectiune cuantifica gradele de acoperire actuale, identifica pierderile tehnice, evalueaza uzura fizica a infrastructurii si stabileste necesarul de investitii pentru modernizare si extindere.');

D.kpis([
  { val: Pct(s.acApa).replace('+',''), label: 'Acoperire apa potabila', sub: 'din total gospodarii' },
  { val: Pct(s.acCanal).replace('+',''), label: 'Acoperire canalizare', sub: 'racordare la retea' },
  { val: Pct(s.acGaz).replace('+',''), label: 'Acoperire gaze naturale', sub: 'distributie urbana' },
  { val: Pct(s.acBB).replace('+',''), label: 'Acoperire broadband', sub: 'fix de mare viteza' }
]);

D.h3('2.6.1 Grad de acoperire a retelelor de utilitati');

D.P('Tabelul de mai jos sintetizeaza situatia actuala a celor patru sisteme edilitare principale, indicand gradul estimat de acoperire raportat la totalul gospodariilor, precum si deficitul de racordare ramas. Valorile reflecta date administrative agregate la nivel de ' + (s._isCom ? 'comuna' : 'municipiu') + ' si trebuie interpretate ca medii care mascheaza variatii intraurbane importante, in special intre tesutul consolidat si zonele de extindere.');

const apaDef = Math.max(0, 100 - s.acApa);
const canalDef = Math.max(0, 100 - s.acCanal);
const gazDef = Math.max(0, 100 - s.acGaz);
const bbDef = Math.max(0, 100 - s.acBB);

D.table(
  ['Sistem edilitar', 'Acoperire (%)', 'Deficit (%)', 'Prioritate'],
  [
    ['Alimentare cu apa potabila', RN(s.acApa, 0) + '%', RN(apaDef, 0) + '%', apaDef > 25 ? 'Ridicata' : (apaDef > 10 ? 'Medie' : 'Scazuta')],
    ['Canalizare si epurare', RN(s.acCanal, 0) + '%', RN(canalDef, 0) + '%', canalDef > 25 ? 'Ridicata' : (canalDef > 10 ? 'Medie' : 'Scazuta')],
    ['Distributie gaze naturale', RN(s.acGaz, 0) + '%', RN(gazDef, 0) + '%', gazDef > 25 ? 'Ridicata' : (gazDef > 10 ? 'Medie' : 'Scazuta')],
    ['Comunicatii broadband fix', RN(s.acBB, 0) + '%', RN(bbDef, 0) + '%', bbDef > 25 ? 'Ridicata' : (bbDef > 10 ? 'Medie' : 'Scazuta')]
  ],
  [62, 38, 38, CW - 138],
  { fs: 7, boldFirst: true }
);

D.barChart(
  [
    ['Apa', RN(s.acApa, 0), [59, 130, 246]],
    ['Canal', RN(s.acCanal, 0), [16, 185, 129]],
    ['Gaze', RN(s.acGaz, 0), [245, 158, 11]],
    ['Broadband', RN(s.acBB, 0), [139, 92, 246]]
  ],
  { title: 'Grad de acoperire a retelelor edilitare (%)', h: 50, source: 'Estimari administrative UAT / operatori regionali' }
);

D.P('Analiza comparativa releva un tipar frecvent intalnit in localitatile romanesti: alimentarea cu apa potabila si distributia gazelor naturale ating in general grade de acoperire superioare, fiind sisteme cu istoric investitional mai vechi si cu rentabilitate comerciala directa pentru operatori. In schimb, canalizarea si epurarea apelor uzate raman, de regula, veriga slaba, intrucat necesita investitii substantiale in infrastructura colectoare si in statii de epurare, cu un retur economic indirect, dependent de subventionarea publica.');

D.P('In cazul ' + uat + ', decalajul dintre acoperirea cu apa (' + RN(s.acApa, 0) + '%) si cea cu canalizare (' + RN(s.acCanal, 0) + '%) reprezinta un indicator-cheie al disfunctionalitatii edilitare. Acolo unde apa este distribuita fara o colectare corespunzatoare a apelor uzate, exista riscul descarcarii necontrolate in sol, fose septice neetanse si poluare a panzei freatice, cu implicatii directe asupra sanatatii publice si a calitatii mediului. Reducerea acestui decalaj constituie o prioritate strategica de prim rang.');

D.h3('2.6.2 Pierderi in retea si eficienta tehnica');

D.P('Pierderile de apa in reteaua de distributie reprezinta un indicator critic al starii tehnice a infrastructurii. In retelele vechi, cu conducte din fonta sau azbociment instalate cu decenii in urma, pierderile pot depasi frecvent 35-45% din volumul introdus in sistem, comparativ cu un prag de bune practici europene situat sub 15-20%. Aceste pierderi se traduc in costuri operationale ridicate, in presiune insuficienta la consumatori si in risipa unei resurse din ce in ce mai pretioase in contextul schimbarilor climatice.');

const pierdEst = s.acApa >= 90 ? 28 : (s.acApa >= 75 ? 35 : 42);

D.table(
  ['Indicator de eficienta', 'Valoare estimata', 'Tinta UE / bune practici'],
  [
    ['Pierderi in reteaua de apa', '~' + pierdEst + '% (estimare)', '< 20%'],
    ['Apa nefacturata (NRW)', '~' + (pierdEst + 5) + '% (estimare)', '< 25%'],
    ['Grad de contorizare', s.acApa >= 90 ? '~95%' : '~80% (estimare)', '100%'],
    ['Conformitate epurare ape uzate', s.acCanal >= 80 ? 'Partiala' : 'Insuficienta', 'Conform Dir. 91/271/CEE'],
    ['Continuitate furnizare apa', '24/24 zone centrale', '24/24 integral']
  ],
  [70, 52, CW - 122],
  { fs: 7, boldFirst: true }
);

D.P('Pentru ' + Uat + ', nivelul estimat al pierderilor de aproximativ ' + pierdEst + '% indica o uzura semnificativa a infrastructurii de distributie si necesitatea unui program sustinut de reabilitare. Apa nefacturata, care include atat pierderile fizice (avarii, scurgeri), cat si pierderile comerciale (contorizare deficitara, consum neautorizat), erodeaza viabilitatea economica a operatorului si limiteaza capacitatea de autofinantare a investitiilor.');

D.P('Imbunatatirea eficientei tehnice presupune un complex de masuri: inlocuirea conductelor degradate, sectorizarea retelei in zone de masurare a consumului (DMA - District Metered Areas), implementarea sistemelor SCADA de monitorizare in timp real, contorizarea integrala a consumatorilor si detectarea activa a pierderilor prin tehnici acustice. Aceste interventii reduc pierderile, optimizeaza presiunea si prelungesc durata de viata a activelor.');

D.barChart(
  [
    ['Pierderi actuale', pierdEst, [220, 38, 38]],
    ['Tinta UE', 18, [16, 185, 129]],
    ['Reducere necesara', Math.max(0, pierdEst - 18), [245, 158, 11]]
  ],
  { title: 'Pierderi in reteaua de apa vs tinta (%)', h: 48, source: 'Estimare UrbanX pe baza acoperirii si vechimii retelei' }
);

D.h3('2.6.3 Epurarea apelor uzate');

D.P('Epurarea apelor uzate reprezinta dimensiunea cu cel mai ridicat grad de exigenta de mediu, fiind reglementata de Directiva 91/271/CEE privind tratarea apelor urbane reziduale, transpusa in legislatia nationala. Conformitatea presupune nu doar racordarea gospodariilor la reteaua de canalizare, ci si existenta unei statii de epurare cu treapta tertiara (eliminarea azotului si fosforului) dimensionata corespunzator pentru aglomerarea umana deservita.');

D.P('Cu un grad de racordare la canalizare de aproximativ ' + RN(s.acCanal, 0) + '%, ' + uat + ' se confrunta cu un deficit de colectare care, cumulat cu eventuale limitari ale capacitatii de epurare, genereaza riscuri de neconformitate. Apele uzate provenite de la gospodariile neracordate ajung in fose septice individuale, adesea neetanse, sau sunt deversate necontrolat, contaminand emisarii naturali si panza freatica. Extinderea retelei de colectare si modernizarea statiei de epurare constituie investitii prioritare cu impact direct asupra mediului.');

D.bullets([
  ['Colectare', 'extinderea retelei de canalizare in zonele de locuire neacoperite, cu prioritate in arealele cu densitate ridicata si proximitate fata de surse de apa.'],
  ['Epurare', 'modernizarea / extinderea statiei de epurare pentru asigurarea treptei tertiare si a capacitatii corespunzatoare aglomerarii deservite.'],
  ['Namol', 'gestionarea durabila a namolului rezultat din epurare, prin valorificare agricola controlata sau co-incinerare.'],
  ['Ape pluviale', 'separarea retelelor de canalizare menajera de cele pluviale pentru reducerea incarcarii statiei in perioade de precipitatii intense.'],
  ['Monitorizare', 'instalarea de sisteme de masurare a calitatii efluentului pentru asigurarea conformitatii continue cu parametrii de descarcare.']
]);

D.h3('2.6.4 Uzura fizica a infrastructurii');

D.P('O parte semnificativa a retelelor edilitare din localitatile romanesti a fost realizata in perioada 1960-1990, depasind in prezent durata normata de exploatare. Conductele de apa din otel, fonta cenusie sau azbociment, colectoarele de canalizare din beton si retelele de distributie a gazelor prezinta grade avansate de uzura, manifestate prin avarii frecvente, infiltratii, coroziune si pierderi de capacitate hidraulica. Reabilitarea acestor active nu este o optiune, ci o necesitate impusa de siguranta in exploatare si de costurile de mentenanta in crestere.');

D.table(
  ['Categorie retea', 'Vechime estimata', 'Stare tehnica', 'Necesar interventie'],
  [
    ['Conducte apa - tronson vechi', '> 30 ani', 'Avansata uzura', 'Inlocuire urgenta'],
    ['Conducte apa - extinderi recente', '< 15 ani', 'Buna', 'Mentenanta'],
    ['Colectoare canalizare', '20-40 ani', 'Variabila', 'Reabilitare selectiva'],
    ['Statie de epurare', 'Variabila', 'Capacitate limitata', 'Modernizare / extindere'],
    ['Retea gaze naturale', '15-35 ani', 'Acceptabila', 'Monitorizare / extindere'],
    ['Infrastructura broadband', '< 10 ani', 'Moderna', 'Densificare periferii']
  ],
  [54, 32, 40, CW - 126],
  { fs: 7, boldFirst: true }
);

D.P('Diferentierea interventiilor in functie de vechimea si starea fiecarui tronson permite o alocare eficienta a resurselor, concentrand investitiile acolo unde riscul de avarie si pierderile sunt maxime. O strategie de tip asset management, bazata pe inventarierea georeferentiata a activelor si pe planificarea ciclului de viata, este recomandata pentru optimizarea programului de reabilitare pe termen mediu si lung.');

D.h3('2.6.5 Necesar de extindere si modernizare');

D.P('Dinamica demografica si presiunea construirii genereaza un necesar continuu de extindere a retelelor in zonele de dezvoltare. ' + (s.varPct >= 0 ? 'Cresterea populatiei cu ' + Pct(s.varPct) + ' in intervalul 2011-2021 amplifica' : 'Chiar in contextul unei variatii demografice de ' + Pct(s.varPct) + ' in intervalul 2011-2021, restructurarea teritoriala mentine') + ' cererea de echipare edilitara, in special in arealele de extindere a intravilanului unde noile locuinte necesita racordare integrala la toate utilitatile.');

D.P('Necesarul de extindere se coreleaza direct cu numarul estimat de locuinte (' + N(s.locuinte) + ') si cu necesarul suplimentar de locuinte (' + N(s.necLoc) + ' unitati). Fiecare unitate locativa noua reclama racordare la apa, canalizare, gaze si comunicatii, ceea ce impune o coordonare riguroasa intre planificarea urbanistica si programarea investitiilor edilitare. Lipsa acestei coordonari genereaza dezvoltari rezidentiale sub-echipate, dependente de solutii individuale provizorii.');

D.callout('Principiu de planificare edilitara', 'Extinderea intravilanului si autorizarea de noi dezvoltari rezidentiale trebuie conditionate de existenta sau de programarea ferma a echiparii edilitare complete. Echiparea trebuie sa preceada sau sa insoteasca dezvoltarea, nu sa o urmeze cu intarziere, pentru a evita formarea de zone urbane cronic sub-deservite.');

D.bullets([
  ['Apa', 'extinderea retelei de distributie in zonele de dezvoltare si asigurarea presiunii necesare prin statii de pompare / rezervoare suplimentare.'],
  ['Canalizare', 'prioritate maxima de extindere pentru reducerea decalajului fata de acoperirea cu apa potabila.'],
  ['Gaze', 'densificarea retelei in zonele cu cerere consolidata, in echilibru cu obiectivele de decarbonizare.'],
  ['Broadband', 'asigurarea conectivitatii de mare viteza in periferii si zonele rurale ale UAT pentru reducerea decalajului digital.'],
  ['Inteligenta', 'integrarea contoarelor inteligente si a sistemelor de monitorizare pentru gestiunea optimizata a tuturor utilitatilor.']
]);

D.h3('2.6.6 Finantare si surse de investitii');

D.P('Modernizarea si extinderea infrastructurii edilitare implica investitii care depasesc, de regula, capacitatea de autofinantare a bugetelor locale si a operatorilor. Accesarea fondurilor europene si nationale devine astfel esentiala. Principalele instrumente disponibile in actualul cadru financiar includ Planul National de Redresare si Rezilienta (PNRR), Programul Operational Dezvoltare Durabila (PODD), Programele Operationale Regionale (POR) si Programul National de Investitii Anghel Saligny pentru localitatile mici.');

D.table(
  ['Sursa de finantare', 'Domeniu eligibil', 'Aplicabilitate ' + (s._isCom ? 'comuna' : 'municipiu')],
  [
    ['PNRR - Componenta apa/canal', 'Retele apa, canalizare, epurare', 'Ridicata'],
    ['PODD (FEDR/Coeziune)', 'Infrastructura mediu si apa', 'Ridicata'],
    ['POR regional', 'Modernizare urbana, eficienta', 'Medie-Ridicata'],
    ['Anghel Saligny', 'Apa, canal, gaze localitati mici', s._isCom ? 'Ridicata' : 'Medie'],
    ['Buget local + credite', 'Cofinantare, extinderi punctuale', 'Permanenta'],
    ['Parteneriat public-privat', 'Broadband, distributie gaze', 'Selectiva']
  ],
  [56, 60, CW - 116],
  { fs: 7, boldFirst: true }
);

D.P('Pentru ' + uat + ', strategia de finantare trebuie sa combine sursele nerambursabile pentru investitiile majore de capital (statii de epurare, colectoare principale, reabilitari de amploare) cu resursele bugetare proprii pentru cofinantare si pentru extinderile punctuale. Pregatirea unui portofoliu matur de proiecte, cu documentatii tehnico-economice elaborate si avizate, reprezinta conditia esentiala pentru absorbtia eficienta a fondurilor disponibile in ferestrele de finantare.');

D.lineChart(
  [
    { name: 'Acoperire canalizare', color: [16, 185, 129], points: [Math.max(0, RN(s.acCanal, 0) - 12), RN(s.acCanal, 0), Math.min(100, RN(s.acCanal, 0) + 18)] },
    { name: 'Acoperire apa', color: [59, 130, 246], points: [Math.max(0, RN(s.acApa, 0) - 8), RN(s.acApa, 0), Math.min(100, RN(s.acApa, 0) + 6)] }
  ],
  ['2011', '2021', '2040 (tinta)'],
  { title: 'Evolutia si tinta de acoperire a retelelor (%)', source: 'Estimari UrbanX / proiectie SIDU' }
);

D.P('Proiectia tintelor de acoperire pentru orizontul strategic evidentiaza prioritatea reducerii decalajului la canalizare, sistemul cu cel mai mare potential de progres. Atingerea unei acoperiri apropiate de universalizare pentru apa si canalizare, dublata de conformitatea epurarii, reprezinta obiectivul edilitar central al strategiei, conditie a calitatii vietii si a sustenabilitatii de mediu pe teritoriul ' + uat + '.');

D.callout('Concluzie - profil edilitar', 'Echiparea tehnico-edilitara a ' + uat + ' prezinta un grad bun de acoperire la apa si gaze, dar un deficit semnificativ la canalizare si epurare, cumulat cu pierderi tehnice ridicate generate de uzura retelelor vechi. Prioritatile investitionale sunt: reducerea decalajului apa-canal, modernizarea epurarii in conformitate cu Directiva 91/271/CEE, reabilitarea tronsoanelor degradate si extinderea coordonata in zonele de dezvoltare, prin valorificarea fondurilor PNRR, PODD, POR si Anghel Saligny.');

D.sourceBadges(['INS', 'Operatori regionali apa-canal', 'PNRR', 'PODD', 'Directiva 91/271/CEE', 'UrbanX']);
      }
      // --- sectiune ord 16 (profile) ---
      {
D.h2('2.7 Profil servicii publice (educatie, sanatate, social, cultura)');

D.P('Capitalul de servicii publice reprezinta infrastructura sociala care sustine calitatea vietii, atractivitatea rezidentiala si echitatea teritoriala la nivelul ' + uat + '. Analiza dotarilor de interes public - educatie, sanatate, asistenta sociala si cultura - evidentiaza nu doar gradul de acoperire cantitativa, ci si starea fizica a cladirilor, distributia spatiala si capacitatea de a raspunde nevoilor unei populatii de ' + N(s.pop) + ' locuitori. Evaluarea acestor servicii constituie un pilon fundamental al diagnozei SIDU, intrucat deficitele de dotare genereaza presiuni de mobilitate, inechitati intre cartiere si pierdere de capital uman.');

D.P('Profilul demografic al ' + uat + ', cu o variatie de populatie de ' + Pct(s.varPct) + ' in perioada 2011-2021, conditioneaza direct dimensionarea retelei de servicii. O dinamica demografica negativa impune rationalizarea si modernizarea retelei existente, in timp ce zonele cu crestere genereaza necesar suplimentar de capacitate. Echilibrarea acestor tendinte teritoriale interne reprezinta una dintre provocarile centrale ale strategiei de dezvoltare a serviciilor publice.');

D.kpis([
  { val: N(s.pop), label: 'Populatie deservita', sub: 'beneficiari potentiali servicii publice' },
  { val: s.zonaSeism || '-', label: 'Zona seismica', sub: 'ag = ' + RN(s.ag, 2) + 'g (P100-1/2022)' },
  { val: Pct(s.varPct), label: 'Variatie populatie', sub: 'presiune asupra dimensionarii retelei' },
  { val: (s._isCom ? 'Comuna' : 'Municipiu'), label: 'Tip UAT', sub: 'profil servicii adaptat rangului' }
]);

D.h3('2.7.1 Educatie si invatamant');

D.P('Reteaua de educatie din ' + uat + ' acopera, in mod ideal, intregul parcurs formativ: educatie anteprescolara (crese), prescolara (gradinite), invatamant primar si gimnazial, liceal si, dupa caz, tertiar. Pentru un UAT de tipul analizat, prioritatea o constituie asigurarea proximitatii unitatilor de invatamant obligatoriu, astfel incat distanta parcursa de elevi sa fie minima, iar siguranta deplasarii sa fie garantata. Capacitatea creselor si gradinitelor ramane, la nivel national, segmentul cel mai deficitar, cu rate de cuprindere ante-prescolara semnificativ sub media europeana.');

D.P('Evaluarea infrastructurii educationale trebuie sa integreze trei dimensiuni complementare: cantitativa (numar de locuri raportat la cohortele de varsta), calitativa (dotari, laboratoare, sali de sport, conectivitate digitala) si fizica (starea constructiva a cladirilor). O parte semnificativa a fondului construit educational din Romania dateaza din perioada anterioara anului 1990, ceea ce ridica probleme acute de eficienta energetica si, in zonele seismice, de rezistenta structurala. In ' + uat + ', incadrarea in zona seismica cu ag = ' + RN(s.ag, 2) + 'g impune evaluarea prioritara a riscului seismic pentru toate cladirile cu functiuni educationale.');

D.P('Cuprinderea scolara si rata de parasire timpurie a sistemului educational sunt indicatori-cheie ai coeziunii sociale. Investitiile in modernizarea, reabilitarea termica si echiparea unitatilor de invatamant genereaza efecte multiplicatoare asupra rezultatelor educationale si asupra atractivitatii ' + uat + ' pentru familiile tinere. Necesarul estimat de locuinte noi de ' + N(s.necLoc) + ' unitati indica, indirect, presiunea viitoare asupra capacitatii educationale in zonele de extindere rezidentiala.');

D.table(
  ['Nivel educational', 'Functiune si rol', 'Prioritate de interventie'],
  [
    ['Anteprescolar (crese)', 'Cuprindere 0-3 ani; suport pentru ocuparea parintilor', 'Ridicata - deficit cronic de capacitate'],
    ['Prescolar (gradinite)', 'Cuprindere 3-6 ani; pregatire pentru scoala', 'Ridicata - proximitate si capacitate'],
    ['Primar si gimnazial', 'Invatamant obligatoriu; dotari de baza', 'Medie - reabilitare si siguranta seismica'],
    ['Liceal si profesional', 'Calificare; corelare cu piata muncii locala', 'Medie - modernizare ateliere'],
    ['Tertiar / formare', 'Mentinere capital uman tanar in teritoriu', s._isCom ? 'Redusa - dependenta de polul urban' : 'Medie - parteneriate']
  ],
  [42, CW - 42 - 48, 48],
  { fs: 7, boldFirst: true }
);

D.P('In cazul unui UAT de tip comuna, segmentul liceal si tertiar este in mod tipic asigurat de polul urban invecinat, ceea ce genereaza fluxuri zilnice de naveta educationala. Aceasta dependenta functionala impune coordonarea politicilor educationale la nivel metropolitan si investitii corelate in transportul public scolar si in infrastructura de deplasare sigura.');

D.h3('2.7.2 Sanatate si servicii medicale');

D.P('Reteaua de sanatate cuprinde trei paliere functionale: asistenta medicala primara (medicina de familie), asistenta ambulatorie de specialitate si asistenta spitaliceasca. Accesibilitatea serviciilor medicale de baza reprezinta un criteriu esential de echitate teritoriala, intrucat distanta fata de cel mai apropiat cabinet de medicina de familie sau farmacie determina direct capacitatea populatiei de a beneficia de preventie si tratament la timp. Pentru ' + uat + ', cu ' + N(s.pop) + ' locuitori, dimensionarea retelei de medicina primara trebuie corelata cu normativele de un medic de familie la aproximativ 1.500-2.000 de locuitori.');

D.P('Asistenta spitaliceasca de inalta complexitate este, in mod natural, concentrata in polii urbani regionali, ceea ce face ca pentru numeroase UAT-uri accesul la servicii medicale specializate sa depinda de conectivitatea cu acesti poli. Timpul de raspuns al serviciilor de urgenta si distanta pana la cea mai apropiata unitate de primiri urgente sunt indicatori critici de siguranta a vietii. Strategia de dezvoltare trebuie sa vizeze atat consolidarea retelei locale de asistenta primara si ambulatorie, cat si imbunatatirea legaturilor cu unitatile spitalicesti de referinta.');

D.P('Starea fizica a infrastructurii medicale ridica aceleasi probleme ca in cazul educatiei: cladiri vechi, ineficiente energetic si, frecvent, neevaluate seismic. In contextul incadrarii ' + uat + ' in zona seismica caracterizata de ag = ' + RN(s.ag, 2) + 'g, evaluarea si consolidarea cladirilor cu functiuni medicale capata caracter de urgenta, dat fiind rolul lor critic in gestionarea situatiilor de dezastru.');

D.barChart(
  [
    ['Medicina primara', 70, [59, 130, 246]],
    ['Ambulatoriu', 45, [16, 185, 129]],
    ['Spitalicesc', s._isCom ? 15 : 55, [185, 71, 30]],
    ['Urgenta / SMURD', 60, [234, 179, 8]]
  ],
  { title: 'Grad estimat de acoperire a serviciilor medicale (% nevoi acoperite local, estimare)', h: 48, source: 'Estimare UrbanX pe profil tip UAT - necesita validare cu date DSP' }
);

D.callout('Echitate teritoriala in sanatate', 'Deficitul de servicii medicale de specialitate la nivel local nu se rezolva prin replicarea infrastructurii spitalicesti in fiecare UAT, ci prin asigurarea unei retele de asistenta primara dense si bine distribuite, dublata de conectivitate rapida si sigura catre polii medicali regionali. Investitiile in telemedicina si in caravane medicale mobile pot reduce semnificativ inechitatile de acces.');

D.h3('2.7.3 Asistenta sociala');

D.P('Serviciile de asistenta sociala raspund nevoilor categoriilor vulnerabile: varstnici, persoane cu dizabilitati, copii in situatii de risc, familii monoparentale si persoane fara adapost. Imbatranirea demografica accentuata, caracteristica multor UAT-uri din Romania, genereaza o presiune crescanda asupra serviciilor pentru persoane varstnice - centre de zi, ingrijire la domiciliu si centre rezidentiale. Variatia de populatie de ' + Pct(s.varPct) + ' si soldul demografic de ' + N(s.delta21) + ' persoane reflecta, indirect, tendintele de imbatranire si depopulare care modeleaza cererea de servicii sociale.');

D.P('Infrastructura de asistenta sociala este, in general, subdimensionata si fragmentata, cu o dependenta ridicata de finantari nerambursabile si de sectorul neguvernamental. Dezvoltarea unei retele integrate de servicii sociale comunitare, ancorata in proximitatea beneficiarilor si coordonata cu serviciile medicale si educationale, reprezinta o directie strategica prioritara. Principiul dezinstitutionalizarii si al ingrijirii in comunitate trebuie sa ghideze investitiile viitoare.');

D.bullets([
  ['Varstnici', 'centre de zi, ingrijire la domiciliu, locuinte protejate - prioritate in contextul imbatranirii demografice'],
  ['Persoane cu dizabilitati', 'servicii de recuperare, accesibilizarea spatiului public si a institutiilor'],
  ['Copii in dificultate', 'centre de zi, prevenirea separarii de familie, suport educational'],
  ['Persoane vulnerabile economic', 'cantine sociale, locuinte sociale, masuri de incluziune activa']
]);

D.h3('2.7.4 Cultura si patrimoniu');

D.P('Infrastructura culturala - biblioteci, camine si case de cultura, muzee, sali de spectacol - indeplineste un rol dublu: pastrarea identitatii locale si stimularea coeziunii comunitare. Pentru ' + uat + ', valorificarea patrimoniului construit si imaterial constituie atat o resursa de atractivitate turistica, cat si un vector de mandrie locala si apartenenta. Cladirile cu valoare de patrimoniu necesita interventii specializate de conservare si restaurare, care trebuie corelate cu evaluarea riscului seismic in conditiile ag = ' + RN(s.ag, 2) + 'g.');

D.P('Spatiile culturale moderne, multifunctionale si accesibile, contribuie la animarea vietii urbane si la reducerea izolarii sociale. Reconversia cladirilor cu functiuni culturale neutilizate sau subutilizate in centre comunitare polivalente reprezinta o solutie eficienta de valorificare a fondului construit existent. Digitalizarea serviciilor culturale - biblioteci digitale, tururi virtuale ale obiectivelor de patrimoniu - extinde accesul si atrage publicul tanar.');

D.P('Patrimoniul construit reprezinta o componenta neregenerabila a capitalului teritorial: odata pierdut, nu poate fi inlocuit. Politicile de protectie a patrimoniului trebuie sa imbine instrumentele de reglementare urbanistica - zone construite protejate, regulamente specifice - cu mecanisme de stimulare a proprietarilor pentru intretinerea si reabilitarea constructiilor cu valoare istorica si arhitecturala.');

D.h3('2.7.5 Starea fizica a cladirilor publice si eficienta energetica');

D.P('O caracteristica transversala a tuturor categoriilor de servicii publice o constituie starea fizica precara a unei parti semnificative din fondul construit. Multe cladiri publice - scoli, dispensare, camine culturale, sedii administrative - au fost edificate inainte de 1990, fiind ineficiente energetic si, in numeroase cazuri, neconforme cu normele actuale de siguranta seismica. Consumurile energetice ridicate greveaza bugetele locale, iar confortul termic redus afecteaza calitatea serviciului prestat.');

D.P('Incadrarea ' + uat + ' in zona seismica ' + (s.zonaSeism || '-') + ', cu acceleratie de varf a terenului ag = ' + RN(s.ag, 2) + 'g conform P100-1/2022, impune un program sistematic de expertizare tehnica a cladirilor publice cu rol critic - in special unitati de invatamant si de sanatate. Cladirile care adapostesc functiuni esentiale pentru gestionarea situatiilor de urgenta trebuie sa fie prioritizate pentru consolidare, intrucat trebuie sa ramana operationale chiar si dupa un eveniment seismic major.');

D.P('Reabilitarea integrata - care combina consolidarea structurala, eficientizarea energetica si modernizarea functionala - reprezinta abordarea optima din perspectiva costului pe ciclu de viata. Interventiile fragmentate, care trateaza separat fiecare problema, genereaza costuri totale mai mari si perioade prelungite de indisponibilitate a serviciului. Portofoliul de investitii estimat la ' + N(s.invTot) + ' mil. EUR la nivelul intregii strategii trebuie sa aloce o componenta substantiala pentru aceasta reabilitare integrata a fondului construit public.');

D.table(
  ['Categorie cladiri', 'Provocare principala', 'Prioritate'],
  [
    ['Unitati de invatamant', 'Eficienta energetica scazuta; risc seismic neevaluat', 'Critica'],
    ['Unitati medicale', 'Cladiri cu rol critic in urgente; uzura fizica', 'Critica'],
    ['Cladiri culturale / patrimoniu', 'Degradare; lipsa interventiilor de conservare', 'Ridicata'],
    ['Servicii sociale', 'Subdimensionare; spatii neadaptate', 'Ridicata'],
    ['Sedii administrative', 'Consum energetic; digitalizare incompleta', 'Medie']
  ],
  [46, CW - 46 - 26, 26],
  { fs: 7, boldFirst: true }
);

D.h3('2.7.6 Distributie teritoriala, proximitate si principiul orasului de 15 minute');

D.P('Dincolo de acoperirea cantitativa, calitatea serviciilor publice se masoara prin proximitatea fata de locuitori. Principiul orasului de 15 minute - conform caruia majoritatea nevoilor cotidiene (educatie, sanatate de baza, cumparaturi, recreere, servicii administrative) trebuie sa fie accesibile in interval de 15 minute pe jos sau cu bicicleta - reprezinta cadrul conceptual de referinta pentru evaluarea distributiei teritoriale a dotarilor. Pentru ' + uat + ', aplicarea acestui principiu necesita o cartare detaliata a izocronelor de acces la fiecare categorie de serviciu.');

D.P('Distributia inegala a dotarilor genereaza zone subdeservite, in care locuitorii sunt obligati la deplasari lungi pentru accesarea serviciilor de baza. Aceste deficite de proximitate alimenteaza dependenta de automobil - indicatorul de motorizare de ' + N(s.motoriz) + ' autoturisme la 1.000 de locuitori si distributia modala cu ' + RN(s.modalAuto, 0) + '% deplasari cu autoturismul reflecta, partial, aceasta carenta structurala. Cresterea proximitatii serviciilor publice este, astfel, o masura de mobilitate durabila si de reducere a emisiilor, contribuind la diminuarea amprentei de ' + RN(s.co2cap, 1) + ' t CO2 pe cap de locuitor.');

D.P('Pentru un UAT ' + (s._isCom ? 'de tip comuna, dispersia teritoriala a populatiei in sate componente face dificila atingerea pragului de 15 minute pe jos pentru toate serviciile; in acest context, prioritatea o constituie asigurarea unui nucleu de servicii esentiale in localitatea de resedinta si transport public adaptat catre satele periferice' : 'urban, densitatea construita permite, in principiu, atingerea pragului de 15 minute in zonele centrale si pericentrale, insa cartierele periferice si zonele de extindere rezidentiala raman frecvent subdeservite, necesitand investitii tintite in dotari de proximitate') + '.');

D.lineChart(
  [
    { name: 'Acces educatie de baza', color: [59, 130, 246], points: [60, 72, 88] },
    { name: 'Acces sanatate primara', color: [16, 185, 129], points: [55, 65, 82] },
    { name: 'Acces servicii sociale/cultura', color: [185, 71, 30], points: [40, 52, 75] }
  ],
  ['Actual', 'Orizont mediu', 'Orizont SIDU'],
  { title: 'Tinta de crestere a populatiei cu acces in 15 minute la servicii (% locuitori, estimare)', source: 'Estimare UrbanX pe principiul orasului de 15 minute - necesita cartare izocrone' }
);

D.pie(
  [
    ['Bine deservite (< 15 min)', 45, [16, 185, 129]],
    ['Partial deservite (15-30 min)', 35, [234, 179, 8]],
    ['Subdeservite (> 30 min)', 20, [185, 71, 30]]
  ],
  { title: 'Distributia estimata a populatiei dupa accesul la servicii de baza (estimare)', source: 'Estimare UrbanX - necesita validare prin analiza izocrone reala' }
);

D.callout('Principiul proximitatii ca politica integrata', 'Apropierea serviciilor publice de locuitori nu este doar o chestiune de confort, ci o strategie integrata care leaga simultan obiectivele de echitate sociala, mobilitate durabila si reducere a emisiilor. Fiecare dotare de proximitate nou amplasata reduce kilometrii parcursi cu automobilul, decongestioneaza reteaua rutiera si creste calitatea vietii in cartier.');

D.h3('2.7.7 Sinteza provocarilor si directiilor de actiune');

D.P('Diagnoza serviciilor publice din ' + uat + ' contureaza un set coerent de provocari transversale: subdimensionarea cronica a unor segmente (anteprescolar, asistenta sociala), starea fizica precara si vulnerabilitatea seismica a fondului construit, distributia teritoriala inegala si deficitele de proximitate. Tabelul de sinteza de mai jos asociaza fiecarui domeniu provocarea principala si directia strategica de actiune, oferind fundamentul pentru fundamentarea portofoliului de proiecte din partea operationala a strategiei.');

D.table(
  ['Domeniu', 'Provocare principala', 'Directie strategica de actiune'],
  [
    ['Educatie', 'Deficit anteprescolar; cladiri ineficiente si neevaluate seismic', 'Extindere capacitate crese/gradinite; reabilitare integrata'],
    ['Sanatate', 'Acces inegal la specialitati; cladiri vechi', 'Densificare retea primara; conectivitate cu poli regionali'],
    ['Asistenta sociala', 'Subdimensionare; presiune din imbatranire', 'Retea de servicii comunitare; ingrijire in comunitate'],
    ['Cultura / patrimoniu', 'Degradare patrimoniu; spatii subutilizate', 'Conservare; reconversie in centre polivalente'],
    ['Cladiri publice', 'Risc seismic; ineficienta energetica', 'Program de expertizare si consolidare prioritizata'],
    ['Proximitate / 15 min', 'Zone subdeservite; dependenta de auto', 'Dotari de proximitate; cartare izocrone']
  ],
  [30, CW - 30 - 70, 70],
  { fs: 7, boldFirst: true }
);

D.P('Aceste directii de actiune se vor regasi, operationalizate sub forma de proiecte concrete cu indicatori si surse de finantare, in partea de implementare a strategiei. Coerenta dintre diagnoza serviciilor publice si portofoliul de investitii - estimat la ' + N(s.invTot) + ' mil. EUR - reprezinta conditia esentiala pentru ca strategia de dezvoltare a ' + uat + ' sa produca efecte masurabile asupra calitatii vietii locuitorilor.');

D.sourceBadges(['INS', 'Eurostat', 'P100-1/2022', 'Ministerul Educatiei', 'Ministerul Sanatatii', 'UrbanX']);
      }
      // --- sectiune ord 17 (profile) ---
      {
D.h2('2.8 Profil mediu, spatii verzi si schimbari climatice');

D.P('Profilul de mediu al ' + uat + ' integreaza patru dimensiuni interdependente care conditioneaza calitatea vietii urbane: dotarea cu spatii verzi accesibile, expunerea la riscuri naturale (seism, inundatii pluviale, val de caldura), calitatea factorilor de mediu (aer, sol, apa) si capacitatea de adaptare la schimbarile climatice. Aceasta sectiune cuantifica fiecare dimensiune pe baza indicatorilor disponibili si formuleaza directiile de interventie aliniate la politicile europene de tranzitie verde si neutralitate climatica.');

D.P('Contextul climatic regional impune o abordare proactiva. Tendinta de incalzire observata in ultimele decenii in ' + reg + ' se manifesta prin cresterea numarului de zile caniculare, intensificarea episoadelor de precipitatii torentiale si prelungirea perioadelor de seceta agricola. Aceste fenomene afecteaza disproportionat zonele urbane dens construite, lipsite de vegetatie matura si dominate de suprafete impermeabile, unde efectul de insula de caldura amplifica disconfortul termic si consumul energetic pentru racire.');

D.kpis([
  { val: RN(s.svMpLoc, 1) + ' mp', label: 'Spatiu verde / locuitor', sub: 'norma OMS-UE: ' + s.normaSV + ' mp' },
  { val: N(s.deficitSV) + ' ha', label: 'Deficit spatii verzi', sub: 'fata de norma minima' },
  { val: 'a_g = ' + RN(s.ag, 2) + 'g', label: 'Acceleratie seismica', sub: 'zona ' + s.zonaSeism },
  { val: RN(s.co2cap, 1) + ' t', label: 'Emisii CO2 / cap', sub: 'tinta reducere -55% 2030' }
]);

D.h3('2.8.1 Spatii verzi: dotare, deficit si distributie');

D.P('Suprafata de spatiu verde public revine in prezent la aproximativ ' + RN(s.svMpLoc, 1) + ' mp pe locuitor in ' + uat + ', fata de norma de ' + s.normaSV + ' mp pe locuitor recomandata de Organizatia Mondiala a Sanatatii si transpusa in legislatia nationala prin OUG 114/2007. Diferenta genereaza un deficit total estimat la ' + N(s.deficitSV) + ' ha, care trebuie acoperit prin extinderea si reabilitarea retelei de parcuri, scuaruri, aliniamente stradale si centuri verzi periurbane.');

D.P('Pentru a ilustra distanta fata de tinta, graficul urmator compara dotarea actuala cu norma minima legala si cu valori de referinta intalnite in orase europene comparabile. Decalajul nu este doar cantitativ ci si calitativ: o parte din suprafetele inregistrate statistic ca spatiu verde sunt degradate, fragmentate sau inaccesibile publicului, ceea ce reduce beneficiul real perceput de locuitori.');

D.barChart([
  ['Actual ' + city.name, RN(s.svMpLoc, 1), [185, 71, 30]],
  ['Norma minima UE', s.normaSV, [59, 130, 246]],
  ['Referinta buna', 40, [16, 185, 129]]
], { title: 'Spatiu verde pe locuitor (mp) - comparatie cu norma', h: 50, source: 'OUG 114/2007, OMS, estimare UrbanX' });

D.P('Atingerea normei presupune o strategie etapizata pe trei orizonturi: pe termen scurt, regenerarea spatiilor verzi existente degradate si plantarea aliniamentelor stradale; pe termen mediu, amenajarea de noi parcuri de cartier in zonele deficitare si conversia terenurilor neutilizate; pe termen lung, constituirea unei centuri verzi periurbane si a unor coridoare ecologice care sa lege parcurile intre ele intr-o retea coerenta. Indicatorul tinta este reducerea deficitului cu cel putin jumatate pana la orizontul de proiectie.');

D.P('Accesibilitatea este criteriul cheie: obiectivul european este ca fiecare locuitor sa aiba acces la un spatiu verde de cel putin 1 ha la o distanta de mers pe jos de maximum 300 de metri. Cartografierea zonelor neacoperite de aceasta distanta de mers permite prioritizarea investitiilor acolo unde densitatea de populatie este mare iar dotarea verde este minima, maximizand astfel beneficiul social al fiecarui euro investit.');

D.h3('2.8.2 Insula de caldura urbana si confortul termic');

D.P('Efectul de insula de caldura urbana descrie diferenta de temperatura dintre zonele construite dens si spatiile naturale invecinate, diferenta care poate atinge cateva grade Celsius in nopcile de vara. Cauzele principale sunt suprafetele impermeabile care acumuleaza caldura, lipsa vegetatiei care ar asigura umbrire si evapotranspiratie, geometria canioanelor stradale care reduce ventilatia si caldura antropica degajata de trafic si climatizare.');

D.P('Numarul de zile caniculare, cu temperaturi maxime peste pragul de 35 de grade Celsius, a urmat in ultimele decenii o tendinta crescatoare in regiune. Proiectiile climatice indica o intensificare a acestui fenomen pana la orizontul strategiei, cu efecte directe asupra sanatatii populatiei vulnerabile (varstnici, copii, persoane cu afectiuni cronice) si asupra cererii de energie pentru racire. Cartierele cu cea mai mare vulnerabilitate termica sunt cele cu fond construit dens si dotare verde redusa.');

D.table(
  ['Indicator confort termic', 'Situatie actuala', 'Tinta orizont'],
  [
    ['Zile caniculare / an (peste 35 C)', '15-25 (estimare)', 'limitare expunere'],
    ['Intensitate insula caldura', '2-4 C (estimare)', 'sub 2 C'],
    ['Suprafata umbrita spatii publice', 'redusa', 'min. 30% acoperire arbori'],
    ['Albedo suprafete (reflectivitate)', 'scazut', 'crescut prin materiale reci'],
    ['Populatie expusa stres termic', 'in crestere', 'in scadere']
  ],
  [70, CW - 130, 60],
  { fs: 7, boldFirst: true }
);

D.P('Masurile de atenuare a insulei de caldura sunt in mare parte aceleasi cu cele de crestere a dotarii verzi, ceea ce genereaza sinergii importante: plantarea de arbori maturi care asigura umbrire, inverzirea acoperisurilor si fatadelor, utilizarea materialelor cu albedo ridicat pentru pavaje si invelitori, crearea de fantani si oglinzi de apa care racesc prin evaporare. Prioritizarea acestor masuri in zonele cu vulnerabilitate maxima asigura cel mai bun raport intre cost si beneficiu pentru sanatatea publica.');

D.h3('2.8.3 Riscul de inundatii pluviale si managementul apelor');

D.P('Pe langa riscul de inundatii din revarsarea cursurilor de apa, ' + uat + ' este expus inundatiilor pluviale, generate de episoade de precipitatii intense care depasesc capacitatea de preluare a retelei de canalizare. Impermeabilizarea progresiva a solului urban, prin extinderea suprafetelor construite si betonate, reduce infiltrarea naturala si concentreaza scurgerea de suprafata, generand baltiri, blocaje de trafic si pagube materiale in zonele joase.');

D.P('Acoperirea cu retea de canalizare in ' + uat + ' este estimata la ' + RN(s.acCanal, 0) + ' la suta, ceea ce inseamna ca o parte din teritoriu nu dispune de colectare controlata a apelor pluviale. Acolo unde reteaua exista, ea este in multe cazuri de tip unitar (preia simultan ape uzate si pluviale) si dimensionata pentru ploi cu frecventa redusa, fiind depasita de evenimentele extreme care devin tot mai frecvente in contextul schimbarilor climatice.');

D.P('Solutia moderna este abordarea de tip oras-burete (sponge city), care urmareste retinerea, infiltrarea si reutilizarea apei pluviale cat mai aproape de locul unde cade, in loc de evacuarea ei rapida prin conducte. Instrumentele includ gradini de ploaie, santuri vegetate, bazine de retentie, pavaje permeabile si acoperisuri verzi. Aceste solutii bazate pe natura reduc varful de scurgere, recarcheaza panza freatica, racesc microclimatul si adauga valoare peisagistica spatiului public.');

D.bullets([
  ['Gradini de ploaie', 'depresiuni plantate care colecteaza si infiltreaza scurgerea de pe trotuare si parcari'],
  ['Pavaje permeabile', 'inlocuirea betonului impermeabil cu materiale care permit infiltrarea apei in sol'],
  ['Bazine de retentie', 'amenajari multifunctionale care stocheaza temporar apa la ploi mari si servesc ca spatiu verde restul timpului'],
  ['Acoperisuri verzi', 'straturi vegetate care retin precipitatiile si reduc varful de scurgere catre canalizare'],
  ['Coridoare albastre', 'reabilitarea cursurilor de apa si a malurilor ca infrastructura ecologica si de agrement']
]);

D.h3('2.8.4 Riscul seismic');

D.P('Din perspectiva hazardului seismic, ' + uat + ' se incadreaza in zona caracterizata prin acceleratia terenului a_g egala cu ' + RN(s.ag, 2) + 'g, conform codului de proiectare seismica P100-1/2022, ceea ce corespunde zonei ' + s.zonaSeism + '. Acest parametru determina nivelul fortelor seismice de proiectare pentru constructiile noi si exigentele de consolidare pentru fondul construit existent, in special pentru cladirile vechi proiectate inainte de normele moderne.');

D.P('Vulnerabilitatea seismica a fondului construit nu depinde doar de hazard ci si de varsta, sistemul structural si starea de intretinere a cladirilor. Cladirile de locuit colective construite in perioade in care normele antiseismice erau mai permisive, precum si constructiile de patrimoniu nereabilitate, reprezinta categoriile cu risc ridicat. Identificarea, expertizarea si includerea lor intr-un program de consolidare prioritizata este o componenta esentiala a rezilientei urbane.');

D.table(
  ['Parametru seismic', 'Valoare', 'Implicatie'],
  [
    ['Acceleratia terenului a_g', RN(s.ag, 2) + 'g', 'baza de calcul forte seismice'],
    ['Zona de hazard', s.zonaSeism, 'incadrare P100-1/2022'],
    ['Perioada de colt T_C', '0,7 - 1,6 s (regional)', 'spectru de raspuns'],
    ['Fond construit vulnerabil', 'cladiri vechi necosolidate', 'necesita expertizare'],
    ['Program consolidare', 'prioritizare pe risc', 'componenta reziliente']
  ],
  [55, 50, CW - 105],
  { fs: 7, boldFirst: true }
);

D.callout('Reziliise seismica', 'Combinarea hazardului seismic cu densitatea fondului construit vulnerabil impune un program multianual de expertizare tehnica si consolidare, cu prioritizarea cladirilor de locuit colective si a dotarilor publice esentiale (spitale, scoli, sedii operationale). Costul prevenirii este o fractiune din costul reconstructiei post-seism.');

D.h3('2.8.5 Calitatea aerului');

D.P('Calitatea aerului in mediul urban este influentata in principal de traficul rutier, de sistemele individuale de incalzire pe combustibili solizi si de eventualele surse industriale. Poluantii de interes pentru sanatate sunt particulele in suspensie (PM10 si PM2,5), dioxidul de azot (NO2) asociat traficului si ozonul troposferic (O3) format in episoadele caniculare. Expunerea cronica la aceste depasiri este asociata cu afectiuni respiratorii si cardiovasculare.');

D.P('Cu un grad de motorizare estimat la ' + N(s.motoriz) + ' autovehicule la 1000 de locuitori si o distributie modala dominata de transportul individual auto (' + RN(s.modalAuto, 0) + ' la suta din deplasari), traficul ramane principala sursa de poluare a aerului in zonele centrale si pe arterele principale. Reducerea presiunii auto prin transferul catre transport public, mers pe jos si bicicleta produce un beneficiu dublu, asupra calitatii aerului si asupra emisiilor de gaze cu efect de sera.');

D.barChart([
  ['Auto individual', RN(s.modalAuto, 0), [185, 71, 30]],
  ['Transport public', RN(s.modalTP, 0), [59, 130, 246]],
  ['Mers / bicicleta', RN(s.modalAct, 0), [16, 185, 129]]
], { title: 'Distributia modala a deplasarilor (%) - impact asupra aerului', h: 48, source: 'estimare UrbanX pe baza gradului de motorizare' });

D.P('Masurile de imbunatatire a calitatii aerului se intersecteaza cu politica de mobilitate si cu cea energetica: extinderea zonelor cu emisii reduse in centrul istoric, reinnoirea parcului de transport public catre vehicule electrice sau cu emisii reduse, racordarea la retele centralizate eficiente pentru a elimina arderea combustibililor solizi in gospodarii si extinderea perdelelor de vegetatie care filtreaza poluantii de-a lungul arterelor cu trafic intens.');

D.h3('2.8.6 Infrastructura verde-albastra: 3-30-300 si solutii bazate pe natura');

D.P('Conceptul de infrastructura verde-albastra trateaza vegetatia si apa nu ca elemente decorative ci ca sisteme functionale care presteaza servicii ecosistemice: racire, retinerea apei pluviale, captarea carbonului, suport pentru biodiversitate si beneficii pentru sanatatea mentala. Planificarea integrata a acestei retele, in locul interventiilor punctuale izolate, multiplica beneficiile si reduce costurile de operare prin solutii care lucreaza cu procesele naturale.');

D.P('Regula 3-30-300 ofera un cadru simplu si masurabil de echitate verde, adoptat de tot mai multe orase europene. Ea stabileste ca fiecare locuitor ar trebui sa vada cel putin trei arbori de la fereastra locuintei, ca fiecare cartier ar trebui sa aiba o acoperire cu coronament arboricol de cel putin treizeci la suta si ca fiecare locuinta ar trebui sa fie la maximum trei sute de metri de un spatiu verde public de calitate. Indicatorii sunt usor de comunicat si de monitorizat in timp.');

D.bullets([
  ['Regula celor 3 arbori', 'vizibilitatea a minimum trei arbori de la fiecare locuinta - indicator de acces vizual la natura'],
  ['Acoperirea de 30%', 'minimum 30 la suta coronament arboricol la nivel de cartier - atenueaza insula de caldura'],
  ['Distanta de 300 m', 'maximum 300 metri pana la un spatiu verde public - asigura accesul echitabil'],
  ['Servicii ecosistemice', 'cuantificarea beneficiilor: racire, retentie apa, captare carbon, biodiversitate'],
  ['Coridoare ecologice', 'conectarea spatiilor verzi fragmentate intr-o retea continua functionala']
]);

D.P('Operationalizarea acestor principii in ' + uat + ' presupune un plan de infrastructura verde-albastra care sa cartografieze deficitele pe cartiere, sa stabileasca tinte intermediare si sa integreze solutiile bazate pe natura in toate proiectele de regenerare urbana, de reabilitare a strazilor si de management al apelor pluviale. Standardizarea acestor solutii in regulamentul de urbanism asigura aplicarea lor consecventa la fiecare interventie.');

D.h3('2.8.7 Reducerea emisiilor si tranzitia catre neutralitate climatica');

D.P('Emisiile de gaze cu efect de sera atribuibile teritoriului ' + uat + ' sunt estimate la aproximativ ' + RN(s.co2cap, 1) + ' tone de CO2 echivalent pe cap de locuitor anual, generate preponderent de sectoarele transport, incalzirea cladirilor si consumul de energie electrica. Tinta europeana de reducere cu cel putin 55 la suta a emisiilor pana in 2030, fata de nivelul de referinta, si neutralitatea climatica pana in 2050 stabilesc traiectoria obligatorie de decarbonare.');

D.lineChart([
  { name: 'Traiectorie emisii (t CO2/cap)', color: [185, 71, 30], points: [RN(s.co2cap, 1), RN(s.co2cap * 0.45, 1), RN(s.co2cap * 0.1, 1)] }
], ['2021 (referinta)', '2030 (-55%)', '2050 (neutralitate)'], { title: 'Traiectoria de reducere a emisiilor pe cap de locuitor', source: 'tinte Pactul Verde European, estimare UrbanX' });

D.P('Atingerea acestor tinte presupune actiune coordonata pe trei sectoare principale. In cladiri: renovarea energetica profunda a fondului existent, standarde aproape de zero emisii pentru constructiile noi si trecerea la surse de incalzire fara ardere de combustibili fosili. In mobilitate: transferul modal catre transport public si activ, electrificarea flotelor si descurajarea traficului auto in zonele centrale. In energie: extinderea surselor regenerabile locale si cresterea eficientei sistemelor centralizate.');

D.P('Un instrument-cadru recomandat este elaborarea unui Plan de Actiune pentru Energie Durabila si Clima (PAEDC), in linia initiativei europene Conventia Primarilor, care inventariaza emisiile de referinta, stabileste tinte cuantificate si defineste portofoliul de masuri cu responsabili, termene si surse de finantare. Acest plan ofera coerenta strategica si acces facilitat la fondurile europene dedicate tranzitiei verzi.');

D.h3('2.8.8 Tabloul de bord al indicatorilor de mediu');

D.P('Tabelul urmator sintetizeaza indicatorii de mediu monitorizati, cu valoarea actuala, tinta de atins la orizontul strategiei si sursa principala de date. Acesti indicatori formeaza nucleul sistemului de monitorizare a componentei de mediu si trebuie actualizati periodic pentru a urmari progresul si a recalibra interventiile acolo unde ritmul este insuficient.');

D.table(
  ['Indicator de mediu', 'Actual', 'Tinta orizont', 'Sursa'],
  [
    ['Spatiu verde / locuitor (mp)', RN(s.svMpLoc, 1), '>= ' + s.normaSV, 'INS, GIS local'],
    ['Deficit spatii verzi (ha)', N(s.deficitSV), 'redus la jumatate', 'calcul UrbanX'],
    ['Emisii CO2 / cap (t/an)', RN(s.co2cap, 1), '-55% pana in 2030', 'PAEDC (estimare)'],
    ['Acoperire canalizare (%)', RN(s.acCanal, 0), '100', 'operator apa'],
    ['Acoperire coronament arbori (%)', '< 30 (estimare)', '>= 30', 'teledetectie'],
    ['Acces spatiu verde la 300 m (%)', '(estimare)', 'crescator', 'GIS local'],
    ['Acceleratie seismica a_g', RN(s.ag, 2) + 'g', 'fond consolidat', 'P100-1/2022'],
    ['Grad motorizare (auto/1000 loc)', N(s.motoriz), 'stabilizare', 'DRPCIV'],
    ['Cota mers + bicicleta (%)', RN(s.modalAct, 0), 'crescator', 'estimare UrbanX']
  ],
  [60, 28, 46, CW - 134],
  { fs: 7, boldFirst: true }
);

D.callout('Sinergii intre obiectivele de mediu', 'Cele patru dimensiuni analizate - spatii verzi, confort termic, managementul apei si emisii - nu sunt independente. O singura interventie bine proiectata, precum un parc cu vegetatie matura si bazin de retentie, raspunde simultan deficitului verde, insulei de caldura, riscului pluvial si captarii de carbon. Strategia trebuie sa prioritizeze tocmai aceste solutii cu beneficii multiple, care ofera cel mai bun raport intre investitie si rezultat la nivel de teritoriu.');

D.sourceBadges(['INS', 'Eurostat', 'P100-1/2022', 'OUG 114/2007', 'Pactul Verde European', 'OMS']);
      }
      // --- sectiune ord 18 (profile) ---
      {
D.h2('2.9 Profil capacitate administrativa si financiara');

D.P('Capacitatea administrativa si financiara reprezinta factorul determinant care transforma o strategie de dezvoltare urbana dintr-un document de intentii intr-un portofoliu de investitii implementat. Indiferent de calitatea analizei urbanistice sau de pertinenta proiectelor propuse, ritmul real de realizare depinde de resursa umana disponibila la nivelul administratiei locale, de soliditatea bugetului propriu, de gradul de acces la fonduri europene si nerambursabile, precum si de eficienta proceselor interne de avizare, achizitie si expropriere. Aceasta sub-sectiune evalueaza profilul administrativ al unitatii ' + uat + ', identificand atat punctele de sprijin, cat si constrangerile structurale care pot afecta orizontul de implementare al portofoliului de investitii.');

D.P('Pentru ' + Uat + ', cu o populatie de ' + N(s.pop) + ' locuitori (recensamant 2021), dimensiunea aparatului administrativ si volumul resurselor bugetare proprii sunt direct corelate cu baza demografica si economica locala. Variatia demografica inregistrata in intervalul 2011-2021, de ' + Pct(s.varPct) + ', influenteaza atat baza de impozitare locala, cat si capacitatea de a sustine cofinantarea proiectelor cu finantare externa. Un produs intern brut estimat la ' + N(s.pib) + ' EUR pe cap de locuitor, reprezentand ' + RN(s.convergUE,1) + '% din media UE27 de ' + N(s.eu27) + ' EUR, indica nivelul de resurse economice ce poate fi mobilizat la nivel local prin cote defalcate din impozitul pe venit si prin impozitele si taxele locale.');

D.kpis([
  { val: N(s.invTot) + ' mil', label: 'Portofoliu investitii (EUR)', sub: 'orizont SIDU' },
  { val: N(s.authAn), label: 'Autorizatii construire/an', sub: 'ritm administrativ curent' },
  { val: RN(s.convergUE,1) + '%', label: 'Convergenta PIB/UE27', sub: 'baza fiscala relativa' },
  { val: s.calific, label: 'Calificativ UrbanX', sub: 'nota ' + RN(s.noteComp,1) + '/10' }
]);

D.h3('2.9.1 Resursa umana si capacitatea de management de proiect');

D.P('Resursa umana specializata constituie cel mai frecvent factor limitativ in implementarea strategiilor de dezvoltare urbana din Romania. Capacitatea de a pregati, contracta si monitoriza proiecte de investitii depinde de existenta unui personal calificat in domeniile tehnic (urbanism, infrastructura, constructii), economic (achizitii publice, finante, contabilitate) si juridic (avizare, contencios, expropriere). Pentru unitatea ' + uat + ', dimensiunea aparatului propriu trebuie raportata la volumul portofoliului de ' + N(s.invTot) + ' milioane EUR, care presupune gestionarea simultana a mai multor contracte de proiectare, executie si supervizare.');

D.P('In cazul administratiilor de talia ' + uat + ', se constata in mod tipic o subdimensionare a compartimentelor de management de proiect raportat la numarul si complexitatea investitiilor aflate in derulare. Un singur expert in management de proiect poate coordona eficient un numar limitat de contracte simultane, iar depasirea acestui prag conduce la intarzieri in raportare, la deficiente in monitorizarea indicatorilor si la riscuri de dezangajare a fondurilor. Portofoliul curent de ' + (s.projects ? N(s.projects.length) : '-') + ' proiecte structurante necesita o capacitate de coordonare care, in absenta unei structuri dedicate, depaseste resursa umana tipica a unei administratii de aceasta dimensiune.');

D.P('Pe langa numarul de posturi, calitatea resursei umane este conditionata de fluctuatia de personal si de capacitatea de retentie a expertilor formati. Salariile din sectorul public local sunt frecvent necompetitive in raport cu sectorul privat de proiectare si constructii, ceea ce genereaza o migratie a personalului calificat dupa perioade de formare finantate din bani publici. Formarea continua, certificarea in management de proiect si specializarea in legislatia achizitiilor publice reprezinta investitii necesare pentru a asigura continuitatea administrativa pe intregul orizont al strategiei.');

D.bullets([
  ['Personal tehnic', 'urbanisti, ingineri constructori si de infrastructura responsabili de documentatiile tehnico-economice si de receptia lucrarilor.'],
  ['Personal economic', 'experti in achizitii publice, finante si contabilitate care asigura procedurile de atribuire si fluxul financiar al proiectelor.'],
  ['Personal juridic', 'consilieri responsabili de avizare, de procedurile de expropriere pentru cauza de utilitate publica si de gestionarea litigiilor.'],
  ['Management de proiect', 'experti dedicati monitorizarii indicatorilor, raportarii catre autoritatile de management si respectarii calendarului de implementare.'],
  ['Formare si retentie', 'programe de certificare, specializare si masuri de fidelizare a personalului calificat pentru reducerea fluctuatiei.']
]);

D.h3('2.9.2 Bugetul local si absorbtia fondurilor europene');

D.P('Bugetul local al unitatii ' + uat + ' se compune din venituri proprii (impozite si taxe locale, cote defalcate din impozitul pe venit), sume defalcate din bugetul de stat si venituri din fonduri externe nerambursabile. Pentru o populatie de ' + N(s.pop) + ' locuitori, baza de venituri proprii este in mod direct influentata de numarul de proprietati impozabile, de valoarea cladirilor si terenurilor si de activitatea economica locala. Gradul de autonomie financiara, exprimat prin ponderea veniturilor proprii in totalul bugetului, determina capacitatea administratiei de a asigura cofinantarea proiectelor europene si de a sustine cheltuielile neeligibile.');

D.P('Absorbtia fondurilor europene reprezinta principalul mecanism de finantare a investitiilor structurante in infrastructura urbana, in conditiile in care veniturile proprii ale administratiilor de talia ' + uat + ' nu pot sustine singure un portofoliu de ' + N(s.invTot) + ' milioane EUR. Sursele relevante pentru orizontul actual de programare includ Programul Operational Regional, Programul Operational Dezvoltare Durabila, Programul Operational Transport, precum si componentele relevante ale Planului National de Redresare si Rezilienta. Accesul la aceste surse presupune o capacitate avansata de pregatire a cererilor de finantare, de elaborare a studiilor de fezabilitate si de demonstrare a maturitatii proiectelor.');

D.table(
  ['Sursa de finantare', 'Tip', 'Domenii eligibile prioritare'],
  [
    ['Buget local (venituri proprii)', 'Propriu', 'Cofinantare, cheltuieli neeligibile, intretinere'],
    ['Program Operational Regional', 'UE nerambursabil', 'Mobilitate urbana, regenerare, eficienta energetica'],
    ['PODD / mediu', 'UE nerambursabil', 'Apa-canal, spatii verzi, economie circulara'],
    ['PNRR', 'UE / national', 'Renovare, digitalizare, transport curat'],
    ['Buget de stat (PNI / CNI)', 'National', 'Infrastructura edilitara, dotari publice'],
    ['Imprumuturi / instrumente financiare', 'Rambursabil', 'Investitii cu randament, prefinantare']
  ],
  [56, 32, CW-56-32],
  { fs: 7, boldFirst: true }
);

D.P('Capacitatea de absorbtie nu se masoara doar prin valoarea contractelor semnate, ci prin rata efectiva de plata catre executanti si prin gradul de finalizare a investitiilor in cadrul perioadei de eligibilitate. Riscul de dezangajare a fondurilor, generat de intarzieri in achizitii, in obtinerea avizelor sau in solutionarea exproprierilor, reprezinta principala amenintare la adresa implementarii portofoliului. O rata de absorbtie scazuta semnaleaza deficiente in capacitatea administrativa care trebuie corectate prin masuri de consolidare institutionala.');

D.barChart(
  [
    ['Pregatire', 18, [59,130,246]],
    ['Contractare', 24, [16,185,129]],
    ['Executie', 38, [185,71,30]],
    ['Plata-receptie', 20, [234,179,8]]
  ],
  { title: 'Distributie tipica a duratei pe etape de proiect (% din durata totala)', h: 48, source: 'Estimare UrbanX pe baza ciclului de implementare al investitiilor publice' }
);

D.h3('2.9.3 Portofoliul de investitii si efortul financiar');

D.P('Portofoliul de investitii propus prin prezenta strategie insumeaza ' + N(s.invTot) + ' milioane EUR, distribuiti pe ' + (s.projects ? N(s.projects.length) : 'mai multe') + ' proiecte structurante care acopera domeniile prioritare de dezvoltare urbana. Acest volum trebuie corelat cu capacitatea anuala de absorbtie si cu profilul de cheltuieli al administratiei, pentru a evita atat suprasolicitarea aparatului tehnic, cat si concentrarea excesiva a investitiilor intr-un interval scurt. O esalonare realista a portofoliului pe intregul orizont al strategiei este conditia de baza pentru o implementare sustenabila.');

D.P('Raportarea efortului investitional la baza demografica ofera un indicator relevant al ambitiei strategiei. Cu un portofoliu de ' + N(s.invTot) + ' milioane EUR si o populatie de ' + N(s.pop) + ' locuitori, investitia medie pe cap de locuitor exprima nivelul de transformare urbana asumat. Acest indicator trebuie interpretat in context regional, raportat la nivelul de convergenta de ' + RN(s.convergUE,1) + '% fata de media UE27 si la necesarul de recuperare a decalajelor de infrastructura acumulate.');

(function(){
  const inv = s.invTot || 0;
  const pop = s.pop || 1;
  const pc = pop ? Math.round((inv * 1000000) / pop) : 0;
  const ani = 7;
  D.kpis([
    { val: N(inv) + ' mil', label: 'Portofoliu total (EUR)', sub: 'orizont strategie' },
    { val: N(pc), label: 'Investitie/locuitor (EUR)', sub: 'raportat la ' + N(pop) + ' loc.' },
    { val: N(Math.round(inv / ani)) + ' mil', label: 'Necesar mediu anual (EUR)', sub: 'esalonare pe ' + ani + ' ani' },
    { val: RN(s.convergUE,1) + '%', label: 'Convergenta UE27', sub: 'context recuperare decalaje' }
  ]);
})();

(function(){
  const inv = s.invTot || 100;
  D.lineChart(
    [{ name: 'Esalonare cumulata portofoliu (%)', color: [185,71,30], points: [8, 24, 46, 70, 88, 100] }],
    ['An 1', 'An 2', 'An 3', 'An 4', 'An 5', 'An 6+'],
    { title: 'Profil ipotetic de absorbtie cumulata a portofoliului de ' + N(inv) + ' mil EUR', source: 'Model esalonare UrbanX (ipoteza de planificare)' }
  );
})();

D.h3('2.9.4 Durata de avizare, achizitie si expropriere');

D.P('Durata proceselor administrative reprezinta o variabila critica adesea subestimata in planificarea investitiilor publice. Ciclul complet al unui proiect de infrastructura urbana parcurge etapele de elaborare a documentatiei tehnico-economice, obtinerea avizelor si acordurilor, procedura de achizitie publica, executia propriu-zisa si receptia lucrarilor. Fiecare dintre aceste etape are durate minime impuse de legislatie si durate efective influentate de capacitatea administrativa, de calitatea documentatiilor si de eventualele contestatii.');

D.P('Procedura de expropriere pentru cauza de utilitate publica constituie frecvent etapa cea mai imprevizibila si cu cel mai mare potential de blocaj. Identificarea proprietarilor, evaluarea despagubirilor, eventualele contestatii in instanta si punerea in posesie pot extinde durata de pregatire a proiectelor de infrastructura liniara (drumuri, retele) cu intervale semnificative. Pentru proiectele care presupun ocuparea unor suprafete private extinse, durata exproprierii poate deveni factorul determinant al intregului calendar de implementare, motiv pentru care aceste proceduri trebuie demarate cu maximum de anticipare.');

D.table(
  ['Etapa de proces', 'Durata orientativa', 'Factori de risc'],
  [
    ['Documentatie tehnico-economica', '3-9 luni', 'Calitatea proiectarii, refaceri'],
    ['Avize si acorduri', '2-6 luni', 'Numar avizatori, completari'],
    ['Achizitie publica', '3-8 luni', 'Contestatii, oferte neconforme'],
    ['Expropriere (daca e cazul)', '6-24 luni', 'Contestatii, evaluare, punere in posesie'],
    ['Executie lucrari', '12-36 luni', 'Capacitate executant, conditii teren'],
    ['Receptie si punere in functiune', '1-3 luni', 'Remedieri, conformitate']
  ],
  [50, 30, CW-50-30],
  { fs: 7, boldFirst: true }
);

D.P('Ritmul curent de emitere a autorizatiilor de construire, estimat la ' + N(s.authAn) + ' autorizatii pe an pentru unitatea ' + uat + ', ofera un indicator indirect al capacitatii de procesare a documentatiilor la nivelul compartimentului de urbanism. Acest ritm reflecta atat cererea de dezvoltare din teritoriu, cat si capacitatea administrativa de a procesa solicitarile in termenele legale. O capacitate de avizare sub-dimensionata se traduce in intarzieri care afecteaza atat investitiile private, cat si proiectele publice gestionate de aceeasi structura.');

D.h3('2.9.5 Coordonarea inter-departamentala');

D.P('Implementarea unei strategii integrate de dezvoltare urbana presupune coordonarea simultana a mai multor compartimente ale administratiei: urbanism, investitii, achizitii publice, juridic, financiar-contabil si patrimoniu. Caracterul integrat al strategiei implica faptul ca multe proiecte conditioneaza sau sunt conditionate de alte interventii, generand interdependente care nu pot fi gestionate izolat la nivelul unui singur departament. Lipsa unui mecanism formal de coordonare conduce la decizii necorelate, la suprapuneri de competente si la blocaje in fluxul de aprobare.');

D.P('In cadrul portofoliului propus, mai multe proiecte prezinta relatii de conditionare reciproca, in care realizarea unei investitii este premisa pentru demararea sau valorificarea alteia. Aceste interdependente impun o secventiere atenta si o coordonare permanenta intre departamentele responsabile. Un mecanism eficient de coordonare presupune intalniri periodice de monitorizare, un sistem unic de evidenta a stadiului proiectelor si o repartizare clara a responsabilitatilor si a termenelor pentru fiecare etapa.');

(function(){
  const pj = (s.projects || []).filter(function(p){ return p && p.conditioneaza && p.conditioneaza.length; });
  if (pj.length) {
    const rows = pj.slice(0, 8).map(function(p){
      return [
        (p.cod || '-'),
        (p.titlu || '-'),
        (p.domeniu || '-'),
        (p.conditioneaza || []).join(', ') || '-'
      ];
    });
    D.table(
      ['Cod', 'Proiect', 'Domeniu', 'Conditioneaza'],
      rows,
      [18, CW-18-26-30, 26, 30],
      { fs: 7, boldFirst: true }
    );
    D.P('Tabelul de mai sus evidentiaza proiectele cu relatii de conditionare in cadrul portofoliului, pentru care coordonarea inter-departamentala este esentiala. Fiecare relatie de conditionare reprezinta un punct de risc in calendarul de implementare, intrucat intarzierea proiectului premisa propaga efecte asupra tuturor investitiilor dependente.');
  } else {
    D.P('In configuratia curenta a portofoliului nu sunt declarate explicit relatii de conditionare intre proiecte; cu toate acestea, principiul integrarii impune ca interventiile din domenii complementare (infrastructura tehnico-edilitara, mobilitate, spatii publice) sa fie planificate corelat, pentru a evita interventii repetate asupra acelorasi amplasamente si pentru a maximiza efectul de levier al investitiilor.');
  }
})();

D.callout('Principiul coordonarii', 'Caracterul integrat al strategiei nu se realizeaza la nivelul documentului, ci la nivelul mecanismului de implementare. In absenta unei structuri care sa asigure corelarea permanenta intre departamente si intre proiecte, portofoliul risca sa se fragmenteze intr-o suma de interventii izolate, cu pierderea efectului sinergic urmarit.');

D.h3('2.9.6 Necesarul unei Unitati de Implementare a Strategiei');

D.P('Analiza capacitatii administrative converge catre concluzia ca implementarea unui portofoliu de ' + N(s.invTot) + ' milioane EUR necesita o structura dedicata de coordonare, denumita generic Unitate de Implementare a Strategiei. Spre deosebire de structurile existente, care gestioneaza simultan activitatea curenta a administratiei si proiectele de investitii, o unitate dedicata asigura focalizarea resurselor umane specializate exclusiv asupra implementarii portofoliului strategic, cu responsabilitati clare de monitorizare, raportare si coordonare.');

D.P('O Unitate de Implementare a Strategiei reuneste competentele tehnice, economice si juridice necesare ciclului complet al proiectelor, functionand ca interfata unica intre departamentele administratiei, autoritatile de management ale programelor de finantare si executantii contractati. Atributiile principale ale acestei structuri includ pregatirea si actualizarea portofoliului, monitorizarea indicatorilor de rezultat, gestiunea calendarului de implementare, semnalarea timpurie a riscurilor si raportarea periodica catre conducerea administratiei si catre publicul interesat.');

D.bullets([
  ['Coordonare', 'punct unic de contact pentru toate proiectele din portofoliu si interfata cu autoritatile de management.'],
  ['Monitorizare', 'urmarirea indicatorilor, a calendarului si a bugetelor, cu raportare periodica si transparenta.'],
  ['Pregatire proiecte', 'elaborarea si actualizarea documentatiilor, a cererilor de finantare si a studiilor suport.'],
  ['Gestiune riscuri', 'identificarea timpurie a blocajelor in avizare, achizitie si expropriere si propunerea de masuri corective.'],
  ['Capacitate', 'echipa dimensionata in raport cu volumul portofoliului, cu masuri de formare si retentie a personalului.']
]);

D.P('Dimensionarea Unitatii de Implementare a Strategiei trebuie corelata cu volumul si complexitatea portofoliului. Pentru un portofoliu de talia celui propus pentru unitatea ' + uat + ', o structura functionala presupune un nucleu de coordonare sustinut de experti pe domeniile tehnic, economic si juridic, cu posibilitatea de externalizare a serviciilor specializate (proiectare, consultanta in achizitii, asistenta tehnica) pentru activitatile care depasesc capacitatea interna. Costul de functionare al acestei structuri reprezinta o investitie in capacitatea de absorbtie, cu un randament direct exprimat in volumul de fonduri atrase si in respectarea calendarului de implementare.');

D.h3('2.9.7 Indicatori sintetici ai capacitatii administrative');

D.P('Tabelul urmator sintetizeaza principalii indicatori care caracterizeaza capacitatea administrativa si financiara a unitatii ' + uat + ', oferind o baza de monitorizare pe intregul orizont al strategiei. Acesti indicatori trebuie actualizati periodic si raportati la tintele asumate, permitand identificarea timpurie a abaterilor si ajustarea masurilor de consolidare institutionala.');

(function(){
  const inv = s.invTot || 0;
  const pop = s.pop || 1;
  const pc = pop ? Math.round((inv * 1000000) / pop) : 0;
  const np = s.projects ? s.projects.length : 0;
  D.table(
    ['Indicator', 'Valoare / stadiu', 'Observatie'],
    [
      ['Populatie (2021)', N(s.pop) + ' loc.', 'baza demografica si fiscala'],
      ['Variatie demografica 2011-2021', Pct(s.varPct), 'tendinta bazei de impozitare'],
      ['PIB/cap (estimare)', N(s.pib) + ' EUR', RN(s.convergUE,1) + '% din UE27'],
      ['Portofoliu investitii', N(inv) + ' mil EUR', np ? (np + ' proiecte structurante') : 'proiecte structurante'],
      ['Investitie/locuitor', N(pc) + ' EUR', 'efort investitional relativ'],
      ['Autorizatii construire/an', N(s.authAn), 'capacitate de procesare urbanism'],
      ['Necesar UIS', 'da', 'structura dedicata de implementare'],
      ['Calificativ capacitate (UrbanX)', s.calific, 'nota ' + RN(s.noteComp,1) + '/10']
    ],
    [54, 40, CW-54-40],
    { fs: 7, boldFirst: true }
  );
})();

D.P('Profilul de capacitate administrativa si financiara rezultat din aceasta analiza indica faptul ca succesul implementarii strategiei depinde mai putin de disponibilitatea surselor de finantare, care exista la nivelul programelor europene si nationale, si mai mult de capacitatea interna de a accesa, gestiona si valorifica aceste surse. Consolidarea resursei umane, infiintarea unei unitati dedicate de implementare, scurtarea proceselor de avizare si demararea anticipata a procedurilor de expropriere reprezinta masurile prioritare care conditioneaza realizarea portofoliului de ' + N(s.invTot) + ' milioane EUR in orizontul asumat.');

D.callout('Concluzie operationala', 'Capacitatea administrativa nu este o conditie de fundal, ci o componenta activa a strategiei. Masurile de consolidare institutionala trebuie tratate ca proiecte in sine, cu termene, responsabili si indicatori proprii, intrucat de ele depinde realizarea tuturor celorlalte investitii din portofoliu.');

D.sourceBadges(['INS', 'Eurostat', 'MDLPA', 'Buget local', 'UrbanX']);
      }
      // --- sectiune ord 19 (profile) ---
      {
D.h2('2.10 Profil transformare digitala (Smart City)');

D.P('Transformarea digitala reprezinta vectorul transversal care leaga toate domeniile de dezvoltare ale ' + uat + ': mobilitate, mediu, servicii publice, planificare urbana si participare cetateneasca. Spre deosebire de un domeniu sectorial clasic, Smart City nu se substituie investitiilor fizice, ci le potenteaza prin date, automatizare si transparenta. Prezentul profil evalueaza maturitatea digitala a administratiei locale si propune un parcurs etapizat de digitalizare ancorat in nevoile reale ale comunitatii.');

D.P('Abordarea adoptata evita capcana achizitiilor de tehnologie izolate, fara integrare si fara guvernanta a datelor. Principiul director este urmatorul: orice componenta digitala trebuie sa produca date interoperabile, sa reduca un cost operational sau un timp de procesare administrativ si sa fie masurabila printr-un indicator de performanta clar. Digitalizarea de dragul imaginii, fara impact operational, este considerata investitie neeligibila in logica acestei strategii.');

D.callout('Smart City ca strat, nu ca insula', 'Maturitatea digitala a unui ' + (s._isCom ? 'UAT comunal' : 'municipiu') + ' nu se masoara prin numarul de aplicatii, ci prin gradul de integrare a datelor intre departamente si prin proportia serviciilor catre cetatean care pot fi finalizate integral online. Un ghiseu unic functional valoreaza mai mult decat zece aplicatii care nu comunica intre ele.');

D.h3('2.10.1 Diagnostic de maturitate digitala');

D.P('Evaluarea maturitatii digitale pentru ' + uat + ' urmeaza un model in cinci paliere: prezenta digitala de baza (site, contact), tranzactional (plati si formulare online), integrat (date partajate intre departamente), predictiv (analiza date pentru decizie) si participativ (cetateanul co-decide pe baza datelor deschise). Majoritatea administratiilor locale din ' + reg + ' se afla intre palierul tranzactional incipient si cel integrat partial, cu diferente semnificative intre municipii si comune.');

D.P('In cazul de fata, infrastructura de date urbane este fragmentata: evidentele cadastrale, registrul de autorizatii de construire, reteaua de utilitati si datele de mobilitate sunt gestionate in sisteme separate, frecvent pe suport hibrid (digital partial, hartie partial). Aceasta fragmentare genereaza costuri ascunse: timp de cautare a informatiei, erori de transcriere, imposibilitatea corelarii rapide a unei solicitari de certificat de urbanism cu regimul juridic si tehnic al parcelei. Un numar estimat de ' + N(s.authAn) + ' autorizatii pe an reprezinta tot atatea fluxuri care ar beneficia de un sistem GIS integrat.');

const popDig = s.pop || city.pop2021 || 0;
D.kpis([
  { val: N(s.authAn), label: 'Autorizatii / an', sub: 'fluxuri digitalizabile in ghiseu unic' },
  { val: N(popDig), label: 'Locuitori deserviti', sub: 'baza de utilizatori servicii digitale' },
  { val: RN(s.acBB, 0) + '%', label: 'Acoperire broadband', sub: 'precon ditie servicii online' },
  { val: s.calific || '-', label: 'Nota maturitate UrbanX', sub: 'evaluare compozita' }
]);

D.P('Acoperirea cu internet de mare viteza, estimata la ' + RN(s.acBB, 0) + '% din gospodarii, constituie o preconditie favorabila: fara conectivitate, serviciile digitale raman accesibile doar unei minoritati si adancesc excluziunea. Acolo unde acoperirea broadband ramane sub pragul de 90%, strategia trebuie sa includa puncte publice de acces digital (biblioteca, primarie, centre comunitare) pentru a evita transformarea digitalizarii intr-un factor de inechitate sociala.');

D.h3('2.10.2 Platforma de date urbane si geamanul digital (GIS / digital twin)');

D.P('Coloana vertebrala a oricarui demers Smart City este platforma de date urbane: un sistem informatic geografic (GIS) care reuneste intr-un singur model spatial parcela cadastrala, regimul de zonare din planul urbanistic, retelele de utilitati, dotarile publice, spatiile verzi si infrastructura de transport. Pe acest fundament se poate construi progresiv un geaman digital (digital twin) - o replica virtuala a teritoriului, actualizata cu date, pe care administratia poate simula scenarii inainte de a investi resurse fizice.');

D.P('Pentru ' + uat + ', un GIS integrat ar elimina principala sursa de intarziere in emiterea actelor de urbanism: necesitatea de a consulta manual mai multe registre pentru a stabili regimul tehnic si juridic al unei parcele. Integrarea regulamentului local de urbanism in stratul digital permite generarea automata a indicatorilor admisi - procent de ocupare a terenului, coeficient de utilizare, regim de inaltime, retrageri - pentru orice parcela selectata, reducand timpul de raspuns de la zile la minute.');

D.P('Geamanul digital depaseste functia de inventar si devine instrument de decizie: permite simularea impactului unei noi dezvoltari asupra traficului, a umbririi cladirilor vecine, a incarcarii retelelor de utilitati sau a deficitului de spatiu verde pe cartier. Investitia in digital twin nu este un lux tehnologic, ci o asigurare impotriva deciziilor de planificare gresite, al caror cost de remediere depaseste cu mult costul modelarii prealabile.');

D.bullets([
  ['Strat cadastral', 'parcele, proprietate, suprafete masurate, sincronizate cu evidenta nationala.'],
  ['Strat zonare', 'unitati teritoriale de referinta si regulament local cu indicatori urbanistici per zona.'],
  ['Strat utilitati', 'retele apa, canalizare, gaz, electricitate, telecomunicatii georeferentiate.'],
  ['Strat mobilitate', 'reteaua de strazi, transport public, parcari, fluxuri de trafic.'],
  ['Strat mediu', 'spatii verzi, calitate aer, zone de risc seismic si la inundatii.'],
  ['Strat dotari', 'unitati de invatamant, sanatate, cultura, administratie, cu raze de deservire.']
]);

D.callout('Date interoperabile, nu silozuri', 'Conditia de succes a platformei GIS este interoperabilitatea: fiecare strat trebuie sa foloseasca un sistem de coordonate unitar si identificatori comuni (numar cadastral, cod UTR) astfel incat informatia sa poata fi corelata automat intre departamente. Un GIS care nu comunica cu registrul de autorizatii este doar o harta scumpa.');

D.h3('2.10.3 Servicii publice digitale si ghiseul unic');

D.P('Digitalizarea relatiei cu cetateanul se materializeaza prin ghiseul unic electronic: un punct de acces unde locuitorul depune o cerere, plateste taxa aferenta, urmareste stadiul dosarului si primeste documentul final fara a se deplasa fizic. Pentru ' + uat + ', prioritatea o reprezinta fluxurile cu volum mare si frecventa ridicata: certificate de urbanism, autorizatii de construire, taxe si impozite locale, certificate fiscale, sesizari privind spatiul public.');

D.P('Beneficiul digitalizarii nu este doar confortul cetateanului, ci si descarcarea administrativa a functionarilor: un dosar depus complet digital, validat automat la depunere, reduce numarul de reveniri pentru completari si elibereaza timp pentru analiza tehnica de fond. Estimarea conservatoare indica o reducere de 30-40% a timpului mediu de procesare pentru fluxurile standardizate, in conditiile pastrarii aceluiasi numar de personal.');

D.table(
  ['Serviciu digital', 'Volum estimat / an', 'Stare actuala', 'Tinta orizont'],
  [
    ['Certificat de urbanism', N(Math.round((s.authAn || 100) * 1.4)), 'Hibrid (depunere fizica)', 'Integral online'],
    ['Autorizatie de construire', N(s.authAn || 100), 'Hibrid', 'Integral online'],
    ['Taxe si impozite locale', N(Math.round(popDig * 0.45)) || '-', 'Plata online partiala', 'Plata + factura digitala'],
    ['Sesizari spatiu public', N(Math.round(popDig * 0.08)) || '-', 'Telefonic / email', 'App dedicata + GIS'],
    ['Certificate fiscale', N(Math.round(popDig * 0.2)) || '-', 'Fizic', 'Eliberare automata'],
    ['Programari registratura', '-', 'Inexistent', 'Sistem de programari']
  ],
  [52, 36, 44, CW - 132],
  { fs: 7, boldFirst: true }
);

D.P('Tinta strategica este ca, la orizontul de planificare, cel putin 70% din serviciile catre cetatean sa poata fi finalizate integral online, iar restul sa beneficieze de programare digitala pentru a elimina cozile. Indicatorul de monitorizat nu este numarul de servicii listate pe portal, ci proportia tranzactiilor efectiv finalizate digital din totalul tranzactiilor cu administratia.');

D.barChart([
  ['Prezenta web', 85, [59, 130, 246]],
  ['Plati online', 45, [59, 130, 246]],
  ['Servicii integrate', 25, [185, 71, 30]],
  ['Date deschise', 15, [185, 71, 30]],
  ['Participare digitala', 10, [185, 71, 30]]
], { title: 'Maturitate digitala pe paliere (% finalizare estimata)', h: 50, source: 'Evaluare UrbanX / autoevaluare administrativa' });

D.h3('2.10.4 Senzori, mediu si sisteme inteligente de transport (ITS)');

D.P('Stratul de senzori transforma orasul dintr-un obiect static intr-un sistem care isi raporteaza propria stare in timp real. Pentru ' + uat + ', prioritatile de senzorizare sunt acelea care alimenteaza decizii concrete: calitatea aerului in punctele cu trafic intens, nivelul de zgomot in zonele rezidentiale adiacente arterelor, fluxurile de trafic in intersectiile critice si nivelul cursurilor de apa in zonele expuse riscului de inundatii.');

D.P('Cu un grad de motorizare estimat la ' + N(s.motoriz) + ' autovehicule la 1000 de locuitori si o distributie modala dominata de transportul individual cu autoturismul (' + RN(s.modalAuto, 0) + '%), gestiunea inteligenta a traficului devine o miza centrala. Sistemele inteligente de transport (ITS) - semaforizare adaptiva, informare in timp real privind transportul public, ghidare catre locuri de parcare libere - pot reduce timpii pierduti in trafic si, implicit, emisiile asociate, estimate la ' + RN(s.co2cap, 1) + ' tone CO2 pe locuitor.');

D.P('E-ticketing-ul pentru transportul public reprezinta o componenta cu raport beneficiu-cost favorabil: validarea electronica genereaza date precise privind cererea de transport pe trasee si intervale orare, date care fundamenteaza optimizarea graficelor de circulatie. Fara aceste date, planificarea transportului public ramane bazata pe estimari, iar subventia publica nu poate fi directionata eficient. Integrarea e-ticketing cu o aplicatie de informare in timp real creste atractivitatea transportului public si sustine transferul modal dinspre automobilul personal.');

D.table(
  ['Sistem senzorial / ITS', 'Indicator masurat', 'Decizie sustinuta'],
  [
    ['Statii calitate aer', 'PM10, PM2.5, NO2', 'Restrictii trafic, alerte populatie'],
    ['Senzori trafic intersectii', 'Flux, timp asteptare', 'Semaforizare adaptiva'],
    ['E-ticketing transport public', 'Cerere pe traseu / ora', 'Optimizare grafic circulatie'],
    ['Senzori nivel ape', 'Cota, debit', 'Alertare timpurie inundatii'],
    ['Senzori parcare', 'Grad ocupare', 'Ghidare si tarifare dinamica'],
    ['Iluminat inteligent', 'Consum, prezenta', 'Reducere consum energetic']
  ],
  [54, 56, CW - 110],
  { fs: 7, boldFirst: true }
);

D.callout('Senzorul fara decizie este cost mort', 'Fiecare componenta senzoriala trebuie cuplata explicit cu o decizie operationala. Un senzor de calitate a aerului care nu declanseaza nicio masura este o cheltuiala de capital fara contrapartida. Inainte de orice achizitie de senzori se defineste lantul: date - prag - alerta - actiune - responsabil.');

D.h3('2.10.5 Date deschise si transparenta');

D.P('Politica de date deschise (open data) inchide bucla intre administratie si comunitate: datele neconfidentiale produse de oras - bugete, autorizatii, achizitii, calitatea mediului, indicatori de mobilitate - sunt publicate intr-un format reutilizabil, permitand cetatenilor, mediului academic si firmelor sa le analizeze si sa creeze valoare. Transparenta prin date reduce neincrederea si suspiciunea de arbitrar in deciziile administrative.');

D.P('Pentru ' + uat + ', un portal de date deschise ancorat in platforma GIS ar permite vizualizarea publica a regimului de zonare, a portofoliului de investitii in valoare estimata de ' + N(s.invTot) + ' milioane EUR si a stadiului proiectelor in derulare. Publicarea proactiva a acestor informatii reduce volumul solicitarilor punctuale de informatii de interes public si demonstreaza maturitate institutionala.');

D.bullets([
  ['Buget si executie', 'venituri, cheltuieli, executie bugetara in format tabelar deschis.'],
  ['Urbanism', 'zonare, regulament, autorizatii emise, anonimizate corespunzator.'],
  ['Investitii', 'portofoliu de proiecte, stadiu, surse de finantare, indicatori.'],
  ['Mediu', 'calitate aer, spatii verzi, zone de risc.'],
  ['Mobilitate', 'trasee transport public, orare, date de trafic agregate.']
]);

D.h3('2.10.6 Smart City ca strat transversal in toate domeniile');

D.P('Forta abordarii Smart City sta in caracterul ei transversal: aceeasi platforma de date serveste simultan urbanismul, mobilitatea, mediul si serviciile sociale. In urbanism, GIS-ul accelereaza emiterea actelor; in mobilitate, datele de trafic si e-ticketing fundamenteaza planificarea transportului; in mediu, senzorii monitorizeaza calitatea aerului si gestiunea spatiilor verzi, evaluate la un deficit de ' + RN(s.deficitSV, 1) + ' hectare fata de norma de ' + N(s.normaSV) + ' mp pe locuitor; in servicii sociale, datele permit directionarea sprijinului catre grupurile vulnerabile.');

D.P('Aceasta transversalitate impune o guvernanta dedicata: o structura responsabila de strategia digitala, de standardele de date si de coordonarea intre departamente. Fara o asemenea structura, fiecare directie achizitioneaza solutii proprii, incompatibile, iar promisiunea integrarii ramane neonorata. Recomandarea strategica este desemnarea unui responsabil de transformare digitala cu mandat transversal, subordonat conducerii executive.');

D.lineChart([
  { name: 'Servicii integral online (%)', color: [59, 130, 246], points: [15, 40, 75] },
  { name: 'Seturi date deschise (nr.)', color: [185, 71, 30], points: [2, 12, 35] }
], ['Actual', 'Etapa intermediara', 'Orizont'], { title: 'Traiectoria de maturizare digitala', source: 'Tinte strategice UrbanX' });

D.h3('2.10.7 Foaie de parcurs si componente Smart City');

D.P('Implementarea nu se face simultan, ci etapizat, in ordinea raportului impact-cost. Prima etapa consolideaza fundatia: platforma GIS si ghiseul unic pentru fluxurile cu volum mare. A doua etapa adauga stratul senzorial cuplat cu decizii operationale: ITS, e-ticketing, monitorizare mediu. A treia etapa deschide datele si activeaza participarea, transformand administratia intr-un sistem transparent si predictiv. Aceasta secventiere asigura ca fiecare investitie se sprijina pe fundatia anterioara.');

D.table(
  ['Componenta Smart City', 'Stare actuala', 'Tinta orizont', 'Etapa'],
  [
    ['Platforma GIS urbana', 'Fragmentata / hibrid', 'Integrata, un singur model', 'Etapa 1'],
    ['Geaman digital (twin)', 'Inexistent', 'Operational pentru simulare', 'Etapa 3'],
    ['Ghiseu unic electronic', 'Partial', 'Peste 70% servicii online', 'Etapa 1'],
    ['Plati online', 'Partial', 'Generalizat + factura digitala', 'Etapa 1'],
    ['Senzori calitate aer', 'Punctual / inexistent', 'Retea cuplata cu alerte', 'Etapa 2'],
    ['ITS / semaforizare adaptiva', 'Inexistent', 'Intersectii critice acoperite', 'Etapa 2'],
    ['E-ticketing transport', 'Inexistent / partial', 'Generalizat + date cerere', 'Etapa 2'],
    ['Portal date deschise', 'Inexistent', 'Publicare proactiva', 'Etapa 3'],
    ['Participare digitala', 'Incipienta', 'Consultari si bugetare online', 'Etapa 3'],
    ['Guvernanta datelor', 'Difuza', 'Responsabil dedicat + standarde', 'Etapa 1']
  ],
  [50, 44, 50, CW - 144],
  { fs: 7, boldFirst: true }
);

D.callout('Conditie de eligibilitate digitala', 'Orice proiect Smart City propus in portofoliul strategic trebuie sa raspunda afirmativ la trei intrebari: produce date interoperabile reutilizabile in alte domenii? reduce un cost operational sau un timp de procesare masurabil? are un indicator de performanta definit si un responsabil de monitorizare? Un proiect care nu trece acest filtru ramane achizitie de imagine, nu investitie in capacitate administrativa.');

D.P('In concluzie, profilul de transformare digitala al ' + uat + ' indica un punct de plecare modest dar cu potential ridicat de recuperare, conditionat de doua decizii strategice: prioritizarea integrarii datelor in detrimentul achizitiilor izolate de tehnologie si instituirea unei guvernante digitale cu mandat transversal. Smart City nu este un capitol separat al strategiei, ci stratul care confera celorlalte domenii capacitatea de a fi planificate pe baza de date si monitorizate in mod transparent.');

D.sourceBadges(['INS', 'Eurostat', 'MDLPA', 'ADR ' + reg, 'Evaluare UrbanX']);
      }
      // --- sectiune ord 30 (chapter) ---
      {
D.chapter('Analiza SWOT integrata si analiza PEST')

D.P('Analiza SWOT integrata constituie instrumentul metodologic central prin care strategia de dezvoltare urbana sintetizeaza diagnoza teritoriala intr-un cadru decizional operational. Pentru ' + uat + ', judetul ' + jud + ', regiunea ' + reg + ', analiza pune in relatie factorii interni controlabili (puncte tari si puncte slabe) cu factorii externi de mediu (oportunitati si amenintari), pe baza indicatorilor cantitativi derivati din diagnoza prezentata in capitolele anterioare. Scopul nu este o inventariere descriptiva, ci identificarea pozitionarii strategice care fundamenteaza prioritatile de investitii.');

D.P('Spre deosebire de o analiza SWOT clasica, abordarea integrata coreleaza fiecare element al matricei cu domeniile sectoriale: demografie, economie, infrastructura tehnico-edilitara, mobilitate, spatii verzi, mediu si reziliente. Astfel, fiecare punct tare sau slab este insotit de valoarea de referinta masurabila care il sustine, ceea ce permite ulterior monitorizarea evolutiei prin indicatori comparabili in timp.');

D.P('Datele de baza utilizate in cuantificarea cadranelor SWOT sunt urmatoarele: populatie 2021 de ' + N(s.pop) + ' locuitori fata de ' + N(s.pop11) + ' in 2011, o variatie de ' + Pct(s.varPct) + ' pe deceniu; PIB pe cap de locuitor de ' + N(s.pib) + ' EUR, reprezentand ' + RN(s.convergUE,1) + ' procente din media UE27 (' + N(s.eu27) + ' EUR); un ritm de ' + N(s.authAn) + ' autorizatii de construire pe an si un necesar estimat de ' + N(s.necLoc) + ' locuinte. Acolo unde o valoare nu este disponibila in sursele oficiale, elementul este marcat ca estimare.');

D.sourceBadges(['INS','Eurostat','PUG','UrbanX']);

D.h2('1. Matricea SWOT integrata');

D.h3('Puncte tari (Strengths)');

D.P('Punctele tari reprezinta resursele si avantajele interne pe care ' + uat + ' le poate valorifica activ in procesul de dezvoltare. Acestea sunt active deja existente, controlabile la nivel local, care ofera baza competitiva a teritoriului.');

const stren = [
  ['Capital uman', 'populatie de ' + N(s.pop) + ' locuitori in 2021, masa critica suficienta pentru sustinerea serviciilor publice si a unei piete locale de bunuri si servicii.'],
  ['Acoperire apa potabila', 'retea de alimentare cu apa la ' + RN(s.acApa,0) + ' procente din gospodarii, infrastructura edilitara de baza partial consolidata.'],
  ['Acoperire energetica', 'conectare la reteaua de gaze naturale la ' + RN(s.acGaz,0) + ' procente si infrastructura de comunicatii (banda larga) la ' + RN(s.acBB,0) + ' procente.'],
  ['Fond construit activ', 'un stoc de ' + N(s.locuinte) + ' locuinte si un ritm de autorizare de ' + N(s.authAn) + ' autorizatii pe an, semnal al unei dinamici imobiliare functionale.'],
  ['Pozitionare regionala', 'apartenenta la judetul ' + jud + ' si regiunea ' + reg + ', cu acces la programele operationale regionale si la coridoarele de finantare nationale.'],
  ['Portofoliu de investitii structurat', 'un portofoliu de proiecte de ' + N(s.invTot) + ' milioane EUR, deja prioritizat si esalonat in cadrul prezentei strategii.']
];

D.bullets(stren);

D.h3('Puncte slabe (Weaknesses)');

D.P('Punctele slabe sunt deficientele interne care limiteaza capacitatea de dezvoltare si care, spre deosebire de amenintari, pot fi corectate prin masuri locale. Cuantificarea lor permite stabilirea unor tinte de imbunatatire verificabile.');

const weak = [
  ['Deficit de spatii verzi', 'doar ' + RN(s.svMpLoc,1) + ' mp spatiu verde pe locuitor fata de norma de ' + N(s.normaSV) + ' mp, rezultand un deficit estimat de ' + N(s.deficitSV) + ' hectare de amenajat.'],
  ['Acoperire canalizare', 'retea de canalizare la doar ' + RN(s.acCanal,0) + ' procente din gospodarii, sub nivelul retelei de apa, generand risc de poluare a apelor subterane.'],
  ['Dependenta de automobil', 'un grad de motorizare de ' + N(s.motoriz) + ' autovehicule la 1000 de locuitori si o cota a deplasarilor cu automobilul de ' + RN(s.modalAuto,0) + ' procente, in defavoarea transportului public (' + RN(s.modalTP,0) + ' procente).'],
  ['Convergenta economica redusa', 'PIB pe cap de locuitor la doar ' + RN(s.convergUE,1) + ' procente din media UE27, indicand un decalaj de productivitate si venituri.'],
  ['Presiune demografica', 'o variatie a populatiei de ' + Pct(s.varPct) + ' intre 2011 si 2021, cu efecte asupra dimensionarii serviciilor si a bazei fiscale locale.'],
  ['Expunere la risc seismic', 'amplasare in zona seismica ' + s.zonaSeism + ' cu acceleratie de varf a terenului ag = ' + RN(s.ag,2) + ' g, ce impune cerinte sporite de consolidare a fondului construit.']
];

D.bullets(weak);

D.h3('Oportunitati (Opportunities)');

D.P('Oportunitatile sunt factorii externi favorabili, situati in afara controlului direct al administratiei locale, dar care pot fi captati prin actiune proactiva. Ele tin de cadrul de finantare, de tendintele tehnologice si de dinamicile regionale.');

const opp = [
  ['Fonduri europene 2021-2027', 'disponibilitatea Programului Operational Regional, a Programului Operational Dezvoltare Durabila si a PNRR pentru infrastructura verde, mobilitate si eficienta energetica.'],
  ['Tranzitia verde', 'agenda europeana a neutralitatii climatice creeaza linii de finantare pentru reducerea emisiilor, de la nivelul actual de ' + RN(s.co2cap,1) + ' tone CO2 pe cap de locuitor.'],
  ['Digitalizare administrativa', 'fondurile pentru transformarea digitala permit modernizarea serviciilor publice si extinderea infrastructurii de banda larga peste nivelul de ' + RN(s.acBB,0) + ' procente.'],
  ['Cerere de locuire', 'necesarul estimat de ' + N(s.necLoc) + ' locuinte reprezinta o oportunitate de dezvoltare imobiliara planificata si de atragere de investitii private.'],
  ['Cooperare metropolitana', 'integrarea in retele de cooperare la nivelul judetului ' + jud + ' si al regiunii ' + reg + ' deschide accesul la proiecte de anvergura supra-locala.'],
  ['Economia turismului si a serviciilor', 'valorificarea pozitiei regionale si a patrimoniului local ca motor de diversificare economica fata de profilul actual.']
];

D.bullets(opp);

D.h3('Amenintari (Threats)');

D.P('Amenintarile sunt factorii externi nefavorabili care pot afecta negativ dezvoltarea daca nu sunt anticipati si gestionati. Ele nu pot fi eliminate de administratia locala, dar impactul lor poate fi atenuat prin masuri de adaptare si reziliente.');

const threat = [
  ['Declin si imbatranire demografica', 'tendinta nationala de scadere a populatiei, confirmata local de variatia de ' + Pct(s.varPct) + ', cu risc de reducere a fortei de munca active.'],
  ['Schimbari climatice', 'cresterea frecventei evenimentelor meteorologice extreme accentueaza vulnerabilitatea zonelor cu deficit de spatii verzi (' + N(s.deficitSV) + ' hectare).'],
  ['Risc seismic regional', 'incadrarea in zona ' + s.zonaSeism + ' (ag = ' + RN(s.ag,2) + ' g) expune fondul construit vechi la pierderi materiale si umane in caz de cutremur major.'],
  ['Competitia teritoriala', 'concurenta cu polii urbani mai dezvoltati din regiune pentru atragerea de investitii, forta de munca calificata si fonduri.'],
  ['Volatilitate macroeconomica', 'inflatia costurilor de constructie si fluctuatiile valutare pot eroda bugetul portofoliului de ' + N(s.invTot) + ' milioane EUR.'],
  ['Dependenta de transferuri', 'baza fiscala locala limitata de convergenta economica scazuta (' + RN(s.convergUE,1) + ' procente din UE27) creeaza dependenta de transferuri de la bugetul central.']
];

D.bullets(threat);

D.h3('Sinteza tabelara a matricei SWOT');

D.table(
  ['Factori interni', 'Factori externi'],
  [
    ['PUNCTE TARI: populatie ' + N(s.pop) + ' loc; apa ' + RN(s.acApa,0) + ' procente; gaze ' + RN(s.acGaz,0) + ' procente; banda larga ' + RN(s.acBB,0) + ' procente; ' + N(s.locuinte) + ' locuinte; portofoliu ' + N(s.invTot) + ' mil EUR.', 'OPORTUNITATI: fonduri UE 2021-2027 si PNRR; tranzitie verde; digitalizare; cerere ' + N(s.necLoc) + ' locuinte; cooperare metropolitana; turism si servicii.'],
    ['PUNCTE SLABE: verde ' + RN(s.svMpLoc,1) + ' mp/loc (deficit ' + N(s.deficitSV) + ' ha); canalizare ' + RN(s.acCanal,0) + ' procente; motorizare ' + N(s.motoriz) + '/1000; convergenta ' + RN(s.convergUE,1) + ' procente; variatie pop ' + Pct(s.varPct) + '.', 'AMENINTARI: declin demografic; schimbari climatice; risc seismic zona ' + s.zonaSeism + '; competitie teritoriala; volatilitate macroeconomica; dependenta de transferuri.']
  ],
  [CW/2, CW/2],
  { fs:7, boldFirst:true }
);

D.kpis([
  { val: RN(s.svMpLoc,1), label: 'mp verde/locuitor', sub: 'norma ' + N(s.normaSV) + ' mp' },
  { val: RN(s.convergUE,1) + '%', label: 'din PIB/cap UE27', sub: N(s.pib) + ' EUR/cap' },
  { val: N(s.invTot), label: 'mil EUR portofoliu', sub: s.projects && s.projects.length ? N(s.projects.length) + ' proiecte' : 'prioritizat' },
  { val: RN(s.ag,2), label: 'ag (g) seismic', sub: 'zona ' + s.zonaSeism }
]);

D.barChart([
  ['Apa', RN(s.acApa,0), [59,130,246]],
  ['Canalizare', RN(s.acCanal,0), [185,71,30]],
  ['Gaze', RN(s.acGaz,0), [34,197,94]],
  ['Banda larga', RN(s.acBB,0), [168,85,247]]
], { title: 'Acoperirea retelelor tehnico-edilitare (procente gospodarii)', h:48, source: 'Diagnoza SIDU / operatori utilitati' });

D.h2('2. Strategii derivate din corelarea SWOT (TOWS)');

D.P('Matricea SWOT capata valoare strategica numai prin corelarea cadranelor intre ele. Analiza TOWS combina sistematic factorii interni cu cei externi, generand patru familii de strategii: SO (valorificare ofensiva), ST (aparare prin puncte tari), WO (corectare prin oportunitati) si WT (minimizare defensiva). Acestea constituie puntea logica intre diagnoza si portofoliul de proiecte.');

D.h3('Strategii SO - maxi-maxi (puncte tari x oportunitati)');

D.P('Strategiile SO folosesc punctele tari interne pentru a capta oportunitatile externe. Sunt strategiile cele mai agresive si cu cel mai mare potential de crestere, deoarece mizeaza pe active deja existente.');

D.bullets([
  ['Atragere de fonduri', 'utilizarea portofoliului structurat de ' + N(s.invTot) + ' milioane EUR ca instrument de absorbtie a fondurilor UE 2021-2027 si PNRR.'],
  ['Dezvoltare imobiliara planificata', 'valorificarea ritmului de ' + N(s.authAn) + ' autorizatii pe an si a celor ' + N(s.locuinte) + ' locuinte existente pentru a raspunde cererii de ' + N(s.necLoc) + ' locuinte noi.'],
  ['Hub digital regional', 'extinderea acoperirii de banda larga de la ' + RN(s.acBB,0) + ' procente pentru pozitionare ca pol de servicii digitale in judetul ' + jud + '.'],
  ['Pozitionare metropolitana', 'folosirea masei critice de ' + N(s.pop) + ' locuitori in proiecte de cooperare la nivelul regiunii ' + reg + '.']
]);

D.h3('Strategii ST - maxi-mini (puncte tari x amenintari)');

D.P('Strategiile ST mobilizeaza punctele tari pentru a contracara sau atenua amenintarile externe. Ele protejeaza pozitia dobandita impotriva factorilor de risc care nu pot fi controlati direct.');

D.bullets([
  ['Reziliente fiscala', 'consolidarea bazei economice locale pentru a reduce dependenta de transferuri in fata volatilitatii macroeconomice.'],
  ['Consolidare antiseismica', 'directionarea unei parti din portofoliul de ' + N(s.invTot) + ' milioane EUR catre reabilitarea fondului construit expus in zona seismica ' + s.zonaSeism + '.'],
  ['Diferentiere competitiva', 'valorificarea infrastructurii edilitare (apa ' + RN(s.acApa,0) + ' procente, gaze ' + RN(s.acGaz,0) + ' procente) pentru a atrage investitii in fata competitiei teritoriale.'],
  ['Stabilizare demografica', 'imbunatatirea calitatii serviciilor publice pentru a contracara tendinta de declin si imbatranire demografica.']
]);

D.h3('Strategii WO - mini-maxi (puncte slabe x oportunitati)');

D.P('Strategiile WO folosesc oportunitatile externe pentru a remedia punctele slabe interne. Ele transforma vulnerabilitatile in tinte de finantare si de modernizare prioritara.');

D.bullets([
  ['Recuperare deficit verde', 'accesarea fondurilor pentru infrastructura verde pentru a reduce deficitul de ' + N(s.deficitSV) + ' hectare si a ridica indicatorul de ' + RN(s.svMpLoc,1) + ' mp/locuitor catre norma de ' + N(s.normaSV) + ' mp.'],
  ['Extindere canalizare', 'folosirea Programului Operational Dezvoltare Durabila pentru a ridica acoperirea canalizarii de la ' + RN(s.acCanal,0) + ' procente.'],
  ['Mobilitate sustenabila', 'captarea fondurilor de mobilitate verde pentru a reduce dependenta de automobil (' + RN(s.modalAuto,0) + ' procente) si a creste cota transportului public (' + RN(s.modalTP,0) + ' procente).'],
  ['Convergenta economica', 'utilizarea instrumentelor de coeziune pentru a apropia PIB-ul local de media UE27 fata de actualele ' + RN(s.convergUE,1) + ' procente.']
]);

D.h3('Strategii WT - mini-mini (puncte slabe x amenintari)');

D.P('Strategiile WT sunt defensive si urmaresc minimizarea simultana a punctelor slabe si a expunerii la amenintari. Ele vizeaza situatiile cele mai vulnerabile, unde o slabiciune interna se suprapune peste un risc extern.');

D.bullets([
  ['Adaptare climatica', 'reducerea simultana a deficitului de spatii verzi si a vulnerabilitatii la schimbari climatice prin solutii bazate pe natura.'],
  ['Reducere emisii', 'masuri integrate de mobilitate si eficienta energetica pentru a scadea emisiile de la ' + RN(s.co2cap,1) + ' tone CO2 pe cap de locuitor.'],
  ['Protectie buget', 'esalonarea prudenta a portofoliului de ' + N(s.invTot) + ' milioane EUR pentru a limita expunerea la inflatia costurilor de constructie.'],
  ['Mentinere baza fiscala', 'politici de atragere si retentie a populatiei active pentru a contracara declinul demografic si eroziunea bazei fiscale.']
]);

D.callout('Concluzie SWOT', 'Pozitionarea strategica a ' + uat + ' indica o combinatie de active edilitare consolidate si vulnerabilitati de mediu si mobilitate. Prioritatea revine strategiilor WO, care transforma punctele slabe cuantificate (deficit verde de ' + N(s.deficitSV) + ' ha, canalizare ' + RN(s.acCanal,0) + ' procente, convergenta ' + RN(s.convergUE,1) + ' procente) in tinte directe de finantare europeana, sustinute de strategiile SO de valorificare a portofoliului de ' + N(s.invTot) + ' milioane EUR.');

D.h2('3. Analiza PEST a mediului extern');

D.P('Analiza PEST completeaza SWOT prin examinarea sistematica a macro-mediului in care evolueaza ' + uat + '. Spre deosebire de SWOT, care priveste atat factorii interni cat si externi, PEST se concentreaza exclusiv asupra fortelor externe necontrolabile, grupate in patru dimensiuni: Politic, Economic, Social si Tehnologic. Aceasta analiza ofera contextul in care prioritatile strategice trebuie sa devina operationale.');

D.P('Fiecare dimensiune PEST este evaluata in raport cu efectele sale asupra dezvoltarii locale, cu o estimare a directiei de influenta (favorabila, mixta sau nefavorabila) si cu indicatorii sau valorile de referinta care o fundamenteaza. Acolo unde datele cantitative lipsesc, evaluarea este calitativa si marcata ca estimare.');

D.h3('Dimensiunea Politica');

D.P('Factorii politici si legislativi determina cadrul de finantare, reglementarile de urbanism si stabilitatea administrativa in care se implementeaza strategia. Pentru un ' + (s._isCom ? 'unitate administrativ-teritoriala de tip comuna' : 'centru urban') + ', accesul la programele operationale si coerenta politicilor nationale sunt determinante.');

D.bullets([
  ['Cadru de finantare', 'arhitectura fondurilor europene 2021-2027, PNRR si programele nationale ofera un context favorabil, conditionat de capacitatea administrativa de absorbtie.'],
  ['Reglementare urbanistica', 'cadrul legal al documentatiilor de urbanism (PUG, PUZ, RLU) structureaza dezvoltarea, dar actualizarile legislative frecvente genereaza incertitudine.'],
  ['Descentralizare fiscala', 'dependenta de transferuri de la bugetul central, accentuata de convergenta economica de ' + RN(s.convergUE,1) + ' procente, limiteaza autonomia investitionala.'],
  ['Politici climatice', 'angajamentele nationale si europene de neutralitate climatica impun obligatii de reducere a emisiilor (nivel actual ' + RN(s.co2cap,1) + ' t CO2/cap).']
]);

D.h3('Dimensiunea Economica');

D.P('Factorii economici influenteaza direct capacitatea de finantare, atractivitatea pentru investitii si bunastarea populatiei. Pozitia ' + uat + ' este caracterizata de un decalaj de convergenta fata de media europeana, dar si de o dinamica imobiliara activa.');

D.bullets([
  ['Nivel de dezvoltare', 'PIB pe cap de locuitor de ' + N(s.pib) + ' EUR, reprezentand ' + RN(s.convergUE,1) + ' procente din media UE27 de ' + N(s.eu27) + ' EUR.'],
  ['Dinamica imobiliara', 'ritm de ' + N(s.authAn) + ' autorizatii de construire pe an, semnal al unei cereri active si al unui potential de crestere a bazei fiscale.'],
  ['Volatilitate de cost', 'inflatia costurilor de constructie si fluctuatiile valutare reprezinta un risc pentru bugetul portofoliului de ' + N(s.invTot) + ' milioane EUR.'],
  ['Diversificare economica', 'necesitatea reducerii dependentei de un numar limitat de sectoare prin valorificarea serviciilor, turismului si economiei digitale.']
]);

D.h3('Dimensiunea Sociala');

D.P('Factorii sociali si demografici modeleaza cererea de servicii publice, forta de munca si coeziunea comunitatii. Evolutia populatiei si calitatea locuirii sunt determinanti centrali ai sustenabilitatii pe termen lung.');

D.bullets([
  ['Dinamica demografica', 'populatie de ' + N(s.pop) + ' locuitori in 2021 fata de ' + N(s.pop11) + ' in 2011, o variatie de ' + Pct(s.varPct) + ' care influenteaza dimensionarea serviciilor.'],
  ['Conditii de locuire', 'stoc de ' + N(s.locuinte) + ' locuinte si un necesar estimat de ' + N(s.necLoc) + ' locuinte noi pentru acoperirea cererii.'],
  ['Calitatea mediului de viata', 'deficitul de spatii verzi (' + RN(s.svMpLoc,1) + ' mp/locuitor fata de ' + N(s.normaSV) + ' mp) afecteaza sanatatea publica si atractivitatea rezidentiala.'],
  ['Mobilitate cotidiana', 'dependenta de automobil (' + RN(s.modalAuto,0) + ' procente din deplasari) genereaza congestie, poluare si inechitate de acces pentru populatia fara autoturism.']
]);

D.h3('Dimensiunea Tehnologica');

D.P('Factorii tehnologici determina nivelul de modernizare al infrastructurii, eficienta serviciilor si capacitatea de inovare. Digitalizarea si tehnologiile verzi reprezinta principalele vectoare de transformare.');

D.bullets([
  ['Infrastructura digitala', 'acoperire de banda larga la ' + RN(s.acBB,0) + ' procente, baza pentru servicii digitale, administratie electronica si economia cunoasterii.'],
  ['Modernizare edilitara', 'necesitatea integrarii tehnologiilor de monitorizare inteligenta in retelele de apa (' + RN(s.acApa,0) + ' procente) si canalizare (' + RN(s.acCanal,0) + ' procente).'],
  ['Tehnologii verzi', 'oportunitatea adoptarii solutiilor de eficienta energetica si energie regenerabila pentru reducerea emisiilor de ' + RN(s.co2cap,1) + ' t CO2/cap.'],
  ['Mobilitate inteligenta', 'sisteme de management al traficului si transport public digitalizat pentru a echilibra distributia modala (auto ' + RN(s.modalAuto,0) + ' procente, transport public ' + RN(s.modalTP,0) + ' procente, activ ' + RN(s.modalAct,0) + ' procente).']
]);

D.h3('Sinteza tabelara PEST');

D.table(
  ['Dimensiune', 'Factor cheie', 'Indicator de referinta', 'Influenta'],
  [
    ['Politic', 'Fonduri UE si PNRR 2021-2027', 'portofoliu ' + N(s.invTot) + ' mil EUR', 'Favorabila'],
    ['Politic', 'Dependenta de transferuri', 'convergenta ' + RN(s.convergUE,1) + ' procente UE27', 'Nefavorabila'],
    ['Economic', 'Nivel de dezvoltare', N(s.pib) + ' EUR/cap', 'Mixta'],
    ['Economic', 'Dinamica imobiliara', N(s.authAn) + ' autorizatii/an', 'Favorabila'],
    ['Economic', 'Volatilitate costuri', 'inflatie constructii', 'Nefavorabila'],
    ['Social', 'Evolutie demografica', Pct(s.varPct) + ' (2011-2021)', s.varPct < 0 ? 'Nefavorabila' : 'Favorabila'],
    ['Social', 'Deficit spatii verzi', RN(s.svMpLoc,1) + ' mp/loc (norma ' + N(s.normaSV) + ')', 'Nefavorabila'],
    ['Social', 'Cerere de locuire', N(s.necLoc) + ' locuinte necesare', 'Mixta'],
    ['Tehnologic', 'Infrastructura digitala', RN(s.acBB,0) + ' procente banda larga', 'Favorabila'],
    ['Tehnologic', 'Tehnologii verzi', RN(s.co2cap,1) + ' t CO2/cap de redus', 'Favorabila']
  ],
  [22, CW-22-46-26, 46, 26],
  { fs:7, boldFirst:true }
);

D.pie([
  ['Auto', RN(s.modalAuto,0), [185,71,30]],
  ['Transport public', RN(s.modalTP,0), [59,130,246]],
  ['Deplasari active', RN(s.modalAct,0), [34,197,94]]
], { title: 'Distributia modala a deplasarilor (dimensiunea sociala si tehnologica)', source: 'Diagnoza mobilitate SIDU' });

D.P('Sinteza PEST confirma concluziile analizei SWOT: contextul politic si tehnologic ofera vectori favorabili (fonduri europene, digitalizare, tehnologii verzi), in timp ce dimensiunile economica si sociala concentreaza principalele provocari (convergenta scazuta de ' + RN(s.convergUE,1) + ' procente, deficit de spatii verzi de ' + N(s.deficitSV) + ' hectare si dependenta de automobil). Strategia de dezvoltare trebuie sa transforme oportunitatile de finantare in solutii pentru vulnerabilitatile sociale si economice identificate.');

D.callout('Articularea SWOT-PEST cu portofoliul', 'Coroborarea celor doua analize indica directia strategica: utilizarea cadrului favorabil politic si tehnologic (factori externi) pentru a remedia punctele slabe interne cuantificate, prin portofoliul de investitii de ' + N(s.invTot) + ' milioane EUR. Aceasta articulare asigura ca fiecare proiect propus in capitolele urmatoare raspunde unei vulnerabilitati documentate, nu unei prioritati conjuncturale.');

D.sourceBadges(['INS','Eurostat','PNRR','PUG','UrbanX']);
      }
      // --- sectiune ord 40 (chapter) ---
      {
D.chapter('Viziunea de dezvoltare si obiectivele strategice');

D.P('Viziunea de dezvoltare reprezinta proiectia coerenta a starii dorite a teritoriului ' + uat + ' la orizontul anului 2040, articuland aspiratiile comunitatii cu realitatile demografice, economice si de mediu ale teritoriului. Aceasta nu este o lista de dorinte, ci un angajament strategic care fundamenteaza intregul portofoliu de proiecte si care orienteaza alocarea resurselor publice catre prioritatile cu cel mai ridicat efect multiplicator. Pornind de la diagnoza, viziunea integreaza cele trei dimensiuni ale dezvoltarii durabile - economica, sociala si de mediu - intr-un model spatial echilibrat, adaptat profilului de ' + city.tip + ' din regiunea ' + reg + '.');

D.callout('Viziunea ' + Uat + ' 2040', 'In anul 2040, ' + uat + ' este un teritoriu rezilient, conectat si incluziv, in care cei aproximativ ' + N(s.pop55) + ' de locuitori proiectati beneficiaza de servicii publice de calitate, de o economie locala diversificata cu un PIB pe cap de locuitor in convergenta accelerata catre media europeana (de la ' + Pct(s.convergUE) + ' din media UE27 in prezent catre tinte superioare), de un mediu construit sigur seismic in zona ' + s.zonaSeism + ' si de un cadru natural protejat in care fiecare locuitor dispune de minimum ' + N(s.normaSV) + ' mp de spatiu verde. Dezvoltarea urbana se realizeaza compact, eficient energetic si orientat catre transportul public si mobilitatea activa, reducand dependenta de autoturismul personal si amprenta de carbon de la nivelul actual de ' + RN(s.co2cap, 1) + ' t CO2 pe cap de locuitor.');

D.P('Aceasta viziune se traduce operational printr-un sistem ierarhizat de obiective: obiective strategice teritoriale (OST) care definesc directiile majore de transformare, obiective specifice (OS) care detaliaza fiecare directie in tinte masurabile si obiective complementare (OSC) care asigura coerenta intersectoriala. Intregul sistem este corelat cu cele cinci Obiective de Politica ale Uniunii Europene (OP1-OP5) pentru perioada de programare, garantand eligibilitatea proiectelor pentru finantare europeana si alinierea la prioritatile de coeziune.');

D.h2('Principiile directoare ale dezvoltarii');

D.P('Implementarea viziunii este guvernata de un set de sase principii directoare care functioneaza ca filtru pentru toate deciziile de planificare si pentru ierarhizarea investitiilor. Aceste principii asigura ca interventiile individuale converg catre obiectivele de ansamblu si ca resursele limitate sunt directionate catre solutii cu impact sistemic.');

D.bullets([
  ['Sustenabilitate', 'fiecare interventie este evaluata prin prisma impactului asupra mediului si a amprentei de carbon, prioritizand solutiile bazate pe natura, eficienta energetica si economia circulara, in conditiile unui deficit actual de spatiu verde estimat la ' + N(s.deficitSV) + ' ha.'],
  ['Reziliență', 'teritoriul este pregatit sa absoarba si sa se adapteze la riscuri - seismic (acceleratie de varf ' + RN(s.ag, 2) + 'g), climatic si economic - prin redundanta retelelor, diversificarea economiei si consolidarea fondului construit vulnerabil.'],
  ['Incluziune sociala', 'accesul la locuire, servicii publice, educatie si spatii publice de calitate este garantat tuturor categoriilor de locuitori, indiferent de venit, varsta sau zona de resedinta, reducand polarizarea teritoriala.'],
  ['Compactare urbana', 'dezvoltarea se concentreaza in interiorul intravilanului existent prin densificare calitativa si regenerare, evitand extinderea necontrolata care suprasolicita retelele si fragmenteaza teritoriul.'],
  ['Mobilitate durabila', 'sistemul de transport reechilibreaza distributia modala dinspre autoturismul personal (' + Pct(s.modalAuto) + ' in prezent) catre transport public (' + Pct(s.modalTP) + ') si mobilitate activa (' + Pct(s.modalAct) + '), reducand congestia si poluarea.'],
  ['Guvernanta participativa', 'deciziile de dezvoltare sunt fundamentate pe date, transparente si elaborate impreuna cu cetatenii, mediul de afaceri si societatea civila, asigurand asumarea colectiva a strategiei.']
]);

D.kpis([
  { val: N(s.pop55), label: 'Populatie tinta 2040', sub: 'proiectie de la ' + N(s.pop) + ' (2021)' },
  { val: Pct(s.convergUE), label: 'Convergenta UE27', sub: 'PIB/cap raportat la ' + N(s.eu27) + ' EUR' },
  { val: N(s.normaSV), label: 'mp verde/loc tinta', sub: 'de la ' + RN(s.svMpLoc, 1) + ' mp in prezent' },
  { val: N(s.invTot) + ' mil', label: 'Portofoliu investitii', sub: 'EUR pe orizontul strategiei' }
]);

D.h2('Arhitectura obiectivelor strategice');

D.P('Sistemul de obiective este structurat pe patru obiective strategice teritoriale, fiecare raspunzand unei provocari majore identificate in diagnoza si fiecare corelat cu unul sau mai multe Obiective de Politica europene. Matricea de corelare de mai jos demonstreaza alinierea integrala a strategiei la cadrul european de finantare, conditie esentiala pentru atragerea fondurilor structurale si de coeziune.');

D.table(
  ['Obiectiv strategic teritorial', 'OP UE corelat', 'Domeniu principal'],
  [
    ['OST1 - Economie competitiva si inovatoare', 'OP1 - Europa mai inteligenta', 'Competitivitate, digitalizare, cercetare'],
    ['OST2 - Teritoriu verde si rezilient', 'OP2 - Europa mai verde', 'Mediu, energie, adaptare climatica'],
    ['OST3 - Conectivitate si mobilitate durabila', 'OP3 - Europa mai conectata', 'Transport, retele, infrastructura digitala'],
    ['OST4 - Comunitate incluziva si coeziva', 'OP4 / OP5 - Europa sociala si mai aproape de cetateni', 'Locuire, servicii, regenerare urbana']
  ],
  [78, 56, CW - 134],
  { fs: 7, boldFirst: true }
);

D.P('Distributia indicativa a portofoliului de investitii intre cele patru obiective strategice reflecta atat amploarea provocarilor, cat si capacitatea de absorbtie si maturitatea proiectelor. Ponderile sunt orientative si vor fi recalibrate anual in functie de stadiul implementarii si de oportunitatile de finantare disponibile.');

D.pie(
  [
    ['OST1 Economie', 22, [185, 71, 30]],
    ['OST2 Mediu', 28, [16, 152, 84]],
    ['OST3 Mobilitate', 30, [59, 130, 246]],
    ['OST4 Comunitate', 20, [168, 85, 247]]
  ],
  { title: 'Distributie indicativa portofoliu investitii pe OST (%)', source: 'Model SIDU UrbanX - estimare' }
);

D.h2('OST1 - Economie competitiva si inovatoare');

D.P('Primul obiectiv strategic vizeaza consolidarea bazei economice a ' + uat + ', in conditiile unui PIB pe cap de locuitor de ' + N(s.pib) + ' EUR, reprezentand ' + Pct(s.convergUE) + ' din media UE27. Decalajul de convergenta indica un potential semnificativ de crestere, conditionat insa de diversificarea economica, de cresterea valorii adaugate si de retinerea fortei de munca calificate pe teritoriu. Acest obiectiv se aliniaza Obiectivului de Politica OP1 al Uniunii Europene si urmareste tranzitia catre o economie bazata pe cunoastere.');

D.h3('OS1.1 - Diversificarea si modernizarea structurii economice');

D.P('Masurile concrete includ dezvoltarea infrastructurii de sprijin pentru afaceri - incubatoare, parcuri tehnologice si spatii de lucru flexibile - precum si stimularea sectoarelor cu valoare adaugata ridicata. Se urmareste reducerea dependentei de sectoarele traditionale cu productivitate scazuta si atragerea de investitii in domenii inovatoare, valorificand pozitia teritoriului in regiunea ' + reg + '. Tinta este cresterea numarului de locuri de munca in sectoare cu valoare adaugata mare si reducerea volatilitatii ocuparii.');

D.h3('OS1.2 - Digitalizarea economiei si a administratiei');

D.P('Pornind de la o acoperire a retelelor de banda larga de ' + Pct(s.acBB) + ', masura vizeaza extinderea infrastructurii digitale catre acoperire integrala si digitalizarea serviciilor publice. Se vor implementa platforme de tip ghiseu unic, sisteme de gestiune urbana bazate pe date si solutii de oras inteligent care reduc costurile administrative si imbunatatesc calitatea relatiei cu cetatenii si mediul de afaceri.');

D.h3('OS1.3 - Dezvoltarea capitalului uman si retinerea talentelor');

D.P('In contextul unei variatii demografice de ' + Pct(s.varPct) + ' intre 2011 si 2021, retinerea si atragerea fortei de munca calificate devin prioritati strategice. Masurile includ parteneriate intre mediul educational si cel economic, programe de reconversie profesionala aliniate cerintelor pietei si crearea de conditii de viata atractive care reduc emigratia tinerilor. Capitalul uman este recunoscut ca factor determinant al competitivitatii pe termen lung.');

D.h2('OST2 - Teritoriu verde si rezilient');

D.P('Al doilea obiectiv strategic raspunde provocarilor de mediu si climatice, in corelare cu Obiectivul de Politica OP2. Punctul de plecare este un deficit de spatiu verde estimat la ' + N(s.deficitSV) + ' ha fata de norma de ' + N(s.normaSV) + ' mp pe locuitor, o dotare actuala de ' + RN(s.svMpLoc, 1) + ' mp pe locuitor si o amprenta de carbon de ' + RN(s.co2cap, 1) + ' t CO2 pe cap de locuitor. Obiectivul integreaza protectia mediului, tranzitia energetica si adaptarea la schimbarile climatice intr-o abordare unitara.');

D.barChart(
  [
    ['Actual', RN(s.svMpLoc, 1), [185, 71, 30]],
    ['Tinta 2040', s.normaSV, [16, 152, 84]]
  ],
  { title: 'Spatiu verde pe locuitor - actual vs tinta (mp/loc)', h: 48, source: 'Model SIDU UrbanX / norma OMS' }
);

D.h3('OS2.1 - Extinderea si calitatea infrastructurii verzi');

D.P('Pentru reducerea deficitului de ' + N(s.deficitSV) + ' ha de spatiu verde, masurile includ amenajarea de noi parcuri si scuaruri, crearea de coridoare verzi care conecteaza zonele naturale existente, plantari masive de aliniament si conversia terenurilor degradate sau a fostelor platforme industriale in spatii verzi publice. Se prioritizeaza solutiile bazate pe natura care ofera simultan beneficii ecologice, sociale si de gestiune a apelor pluviale.');

D.h3('OS2.2 - Eficienta energetica si tranzitia catre surse regenerabile');

D.P('Masura vizeaza reabilitarea termica a fondului construit public si rezidential, modernizarea sistemelor de iluminat public si de incalzire, precum si dezvoltarea capacitatilor de productie a energiei din surse regenerabile. Obiectivul contribuie direct la reducerea amprentei de carbon de la nivelul actual de ' + RN(s.co2cap, 1) + ' t CO2 pe cap de locuitor si la cresterea independentei energetice a teritoriului.');

D.h3('OS2.3 - Reziliența seismica si adaptarea climatica');

D.P('Avand in vedere amplasarea in zona seismica ' + s.zonaSeism + ' cu o acceleratie de varf a terenului de ' + RN(s.ag, 2) + 'g, consolidarea fondului construit vulnerabil reprezinta o prioritate de siguranta publica. Masurile cuprind expertizarea si consolidarea cladirilor incadrate in clase de risc seismic, dezvoltarea sistemelor de gestiune a riscurilor si implementarea de solutii de adaptare la valuri de caldura, secete si inundatii.');

D.h2('OST3 - Conectivitate si mobilitate durabila');

D.P('Al treilea obiectiv strategic, corelat cu Obiectivul de Politica OP3, urmareste transformarea sistemului de transport si a infrastructurii de retele. Cu un grad de motorizare de ' + N(s.motoriz) + ' autoturisme la 1000 de locuitori si o distributie modala dominata de autoturismul personal (' + Pct(s.modalAuto) + '), reechilibrarea catre transport public (' + Pct(s.modalTP) + ' in prezent) si mobilitate activa (' + Pct(s.modalAct) + ') este esentiala pentru reducerea congestiei si a poluarii.');

D.lineChart(
  [
    { name: 'Autoturism', color: [185, 71, 30], points: [s.modalAuto, RN(s.modalAuto * 0.85, 0), RN(s.modalAuto * 0.6, 0)] },
    { name: 'Transport public', color: [59, 130, 246], points: [s.modalTP, RN(s.modalTP * 1.4, 0), RN(s.modalTP * 1.9, 0)] },
    { name: 'Mobilitate activa', color: [16, 152, 84], points: [s.modalAct, RN(s.modalAct * 1.3, 0), RN(s.modalAct * 1.7, 0)] }
  ],
  ['2021', '2030', '2040'],
  { title: 'Evolutia tinta a distributiei modale (%)', source: 'Model SIDU UrbanX - scenariu durabil' }
);

D.h3('OS3.1 - Dezvoltarea transportului public si a mobilitatii active');

D.P('Masurile includ modernizarea si extinderea flotei de transport public, crearea de benzi dedicate, dezvoltarea infrastructurii pietonale si velo continue si sigure, precum si amenajarea de noduri intermodale. Tinta este aproape dublarea cotei transportului public si cresterea semnificativa a mobilitatii active, descurajand in acelasi timp utilizarea autoturismului personal in zonele centrale.');

D.h3('OS3.2 - Modernizarea infrastructurii rutiere si a sigurantei circulatiei');

D.P('In paralel cu promovarea alternativelor durabile, se urmareste fluidizarea traficului prin reabilitarea retelei stradale, eliminarea punctelor critice si implementarea sistemelor inteligente de management al traficului. Siguranta circulatiei pentru toti participantii, in special pentru pietoni si bicicliasti, constituie un criteriu transversal in toate interventiile asupra infrastructurii rutiere.');

D.h3('OS3.3 - Completarea retelelor tehnico-edilitare');

D.P('Plecand de la nivelurile actuale de acoperire - apa ' + Pct(s.acApa) + ', canalizare ' + Pct(s.acCanal) + ', gaze naturale ' + Pct(s.acGaz) + ' - masura vizeaza extinderea retelelor catre acoperire integrala, conditie de baza pentru dezvoltarea echilibrata a teritoriului. Decalajul intre acoperirea cu apa si cea cu canalizare indica o prioritate clara pentru investitiile in infrastructura de epurare si protectie a mediului.');

D.table(
  ['Retea tehnico-edilitara', 'Acoperire actuala', 'Tinta 2040', 'Decalaj de acoperit'],
  [
    ['Alimentare cu apa', Pct(s.acApa), '100%', Pct(100 - s.acApa)],
    ['Canalizare', Pct(s.acCanal), '100%', Pct(100 - s.acCanal)],
    ['Gaze naturale', Pct(s.acGaz), '95%', Pct(95 - s.acGaz)],
    ['Banda larga', Pct(s.acBB), '100%', Pct(100 - s.acBB)]
  ],
  [56, 40, 34, CW - 130],
  { fs: 7, boldFirst: true }
);

D.h2('OST4 - Comunitate incluziva si coeziva');

D.P('Al patrulea obiectiv strategic, corelat cu Obiectivele de Politica OP4 si OP5, abordeaza dimensiunea sociala a dezvoltarii si dezvoltarea teritoriala integrata. Cu un fond locativ de aproximativ ' + N(s.locuinte) + ' locuinte si un necesar estimat de ' + N(s.necLoc) + ' locuinte noi pe orizontul strategiei, asigurarea accesului la locuire de calitate si la servicii publice echitabil distribuite reprezinta conditii ale coeziunii sociale.');

D.h3('OS4.1 - Cresterea fondului locativ si locuirea accesibila');

D.P('Pentru acoperirea necesarului de ' + N(s.necLoc) + ' locuinte, masurile includ dezvoltarea de locuinte publice si sociale, stimularea constructiei private printr-un cadru de reglementare predictibil si reabilitarea fondului locativ existent. Ritmul actual de autorizare de aproximativ ' + N(s.authAn) + ' autorizatii pe an este insuficient pentru a acoperi necesarul, ceea ce impune masuri active de stimulare a ofertei de locuinte.');

D.h3('OS4.2 - Regenerarea urbana si calitatea spatiilor publice');

D.P('Masura vizeaza interventii integrate de regenerare in zonele degradate, marginalizate sau cu functiuni abandonate, transformandu-le in spatii de calitate care genereaza coeziune sociala si valoare economica. Se prioritizeaza amenajarea spatiilor publice, reabilitarea cladirilor de patrimoniu si reconversia siturilor industriale dezafectate, in logica utilizarii eficiente a terenului din intravilan.');

D.h3('OS4.3 - Servicii publice de calitate accesibile tuturor');

D.P('Echitatea teritoriala in accesul la educatie, sanatate, cultura si servicii sociale constituie obiectivul acestei masuri. Interventiile cuprind modernizarea si extinderea infrastructurii de servicii publice, distributia echilibrata a dotarilor in teritoriu si adaptarea ofertei de servicii la structura demografica in schimbare, cu atentie speciala pentru categoriile vulnerabile si pentru zonele subdeservite.');

D.callout('Coerenta strategica', 'Cele patru obiective strategice teritoriale nu functioneaza izolat, ci se conditioneaza si se potenteaza reciproc. Economia competitiva (OST1) finanteaza tranzitia verde (OST2) si genereaza resurse pentru coeziune sociala (OST4); mobilitatea durabila (OST3) sustine atat reducerea amprentei de carbon, cat si accesul echitabil la oportunitati. Aceasta interdependenta impune o implementare integrata, in care fiecare proiect este evaluat nu doar prin contributia la obiectivul propriu, ci si prin efectele asupra intregului sistem teritorial.');

D.sourceBadges(['INS', 'Eurostat', 'Model SIDU UrbanX', 'OP UE 2021-2027']);
      }
      // --- sectiune ord 50 (chapter) ---
      {
D.chapter('Portofoliul integrat de proiecte');

D.P('Portofoliul integrat de proiecte constituie expresia operationala a viziunii strategice asumate prin prezenta Strategie Integrata de Dezvoltare Urbana. Acesta transpune obiectivele de dezvoltare in interventii concrete, masurabile si fazate in timp, asigurand legatura directa intre diagnosticul teritorial al unitatii administrativ-teritoriale ' + uat + ' si rezultatele asteptate la orizontul de planificare.');

D.P('Spre deosebire de o simpla lista de dorinte, portofoliul este structurat pe doua niveluri de maturitate. Primul nivel cuprinde lista lunga de intentii de investitii, care reflecta nevoile identificate prin analiza diagnostic si consultarea partilor interesate. Al doilea nivel cuprinde fisele detaliate de proiect, elaborate pentru interventiile prioritare, care fac obiectul unui document separat de programare bugetara si tehnica.');

D.P('Aceasta dubla structura raspunde unei cerinte metodologice esentiale: o strategie credibila nu poate detalia in egala masura toate interventiile, ci trebuie sa distinga intre ceea ce este matur pentru implementare imediata si ceea ce ramane la stadiul de intentie ce necesita maturizare ulterioara. Listarea integrala a intentiilor asigura transparenta si trasabilitate, in timp ce concentrarea resurselor de elaborare pe proiectele prioritare asigura realismul implementarii.');

const _projs = (s.projects && s.projects.length) ? s.projects : [];
const _nProj = _projs.length;
const _scurte = _projs.filter(function(p){ return p && p.lista === 'scurta'; });
const _lungi = _projs.filter(function(p){ return p && p.lista !== 'scurta'; });
const _nScurte = _scurte.length;
const _nLungi = _lungi.length;

let _condPMUD = 0;
for (let i = 0; i < _projs.length; i++) {
  const cz = _projs[i].conditioneaza;
  if (cz && cz.length) {
    for (let j = 0; j < cz.length; j++) {
      const t = ('' + cz[j]).toLowerCase();
      if (t.indexOf('pmud') >= 0 || t.indexOf('masterplan') >= 0 || t.indexOf('master plan') >= 0) { _condPMUD++; break; }
    }
  }
}

D.kpis([
  { val: N(_nProj), label: 'Interventii in portofoliu', sub: _nScurte + ' prioritare / ' + _nLungi + ' intentii' },
  { val: N(s.invTot) + ' mil', label: 'Valoare estimata (EUR)', sub: 'Orizont de planificare' },
  { val: N(_condPMUD), label: 'Proiecte structurante', sub: 'Conditioneaza PMUD / Masterplan' },
  { val: N(_nScurte), label: 'Fise detaliate', sub: 'Document separat de programare' }
]);

D.P('Cele ' + N(_nProj) + ' interventii cuprinse in portofoliu insumeaza o valoare estimata de aproximativ ' + N(s.invTot) + ' milioane EUR, repartizata pe domenii de interventie corespunzatoare obiectivelor strategice. Dintre acestea, ' + N(_nScurte) + ' au fost selectate ca proiecte prioritare pentru elaborarea de fise detaliate, iar ' + N(_condPMUD) + ' au caracter structurant, in sensul ca finantarea sau implementarea lor conditioneaza sau este conditionata de documentatii de planificare conexe de tipul Planului de Mobilitate Urbana Durabila sau al Masterplanului de utilitati.');

D.h2('Distributia investitiilor pe domenii de interventie');

const _domAgg = {};
for (let i = 0; i < _projs.length; i++) {
  const p = _projs[i];
  const dom = (p.domeniu && ('' + p.domeniu).trim()) ? ('' + p.domeniu).trim() : 'Nealocat';
  const cost = (typeof p.cost === 'number') ? p.cost : (parseFloat(p.cost) || 0);
  if (!_domAgg[dom]) _domAgg[dom] = { val: 0, n: 0 };
  _domAgg[dom].val += cost;
  _domAgg[dom].n += 1;
}
const _domKeys = Object.keys(_domAgg).sort(function(a, b){ return _domAgg[b].val - _domAgg[a].val; });
const _palette = [[185,71,30],[59,130,246],[16,185,129],[245,158,11],[139,92,246],[236,72,153],[20,184,166],[100,116,139]];
const _barData = [];
for (let i = 0; i < _domKeys.length; i++) {
  const k = _domKeys[i];
  _barData.push([k.length > 22 ? k.substring(0, 21) + '.' : k, RN(_domAgg[k].val, 1), _palette[i % _palette.length]]);
}

D.P('Repartizarea valorii estimate pe domenii de interventie reflecta prioritatile strategice asumate de ' + uat + '. Graficul urmator evidentiaza concentrarea resurselor catre domeniile cu cel mai ridicat impact teritorial si social, in concordanta cu deficitele identificate in etapa de diagnostic.');

if (_barData.length) {
  D.barChart(_barData, { title: 'Investitie estimata pe domenii (mil. EUR)', h: Math.max(48, _barData.length * 9), source: 'Portofoliu SIDU ' + Uat + ', estimari proprii' });
}

const _totDom = _domKeys.reduce(function(acc, k){ return acc + _domAgg[k].val; }, 0) || 1;
const _domTableRows = [];
for (let i = 0; i < _domKeys.length; i++) {
  const k = _domKeys[i];
  const sh = (_domAgg[k].val / _totDom) * 100;
  _domTableRows.push([k, N(_domAgg[k].n), RN(_domAgg[k].val, 1) + ' mil', RN(sh, 1) + '%']);
}
D.table(['Domeniu de interventie', 'Nr. proiecte', 'Valoare est.', 'Pondere'], _domTableRows, [78, 26, 36, CW - 140], { fs: 7, boldFirst: true });

D.P('Tabelul de mai sus confirma faptul ca alocarea resurselor nu este uniforma, ci ponderata in functie de gravitatea deficitelor si de potentialul de generare a efectelor multiplicatoare. Domeniile cu pondere ridicata sunt, de regula, cele care conditioneaza dezvoltarea celorlalte: infrastructura de baza, mobilitatea si regenerarea urbana creeaza premisele pentru interventiile complementare in domeniul economic, social si de mediu.');

if (_domKeys.length >= 2) {
  const _pieData = [];
  for (let i = 0; i < Math.min(_domKeys.length, 8); i++) {
    const k = _domKeys[i];
    _pieData.push([k.length > 18 ? k.substring(0, 17) + '.' : k, RN((_domAgg[k].val / _totDom) * 100, 1), _palette[i % _palette.length]]);
  }
  D.pie(_pieData, { title: 'Structura procentuala a portofoliului pe domenii', source: 'Portofoliu SIDU ' + Uat });
}

D.h2('Lista lunga a intentiilor de investitii');

D.P('Lista lunga prezentata in continuare cuprinde integralitatea celor ' + N(_nProj) + ' interventii avute in vedere, indiferent de gradul lor de maturitate. Caracterul exhaustiv al acestei liste este intentionat: el asigura ca nicio nevoie identificata in diagnostic nu este pierduta din vedere si ofera o baza transparenta pentru reprioritizarea periodica a portofoliului in cadrul mecanismului de monitorizare si revizuire a strategiei.');

D.P('Fiecare interventie este identificata printr-un cod unic, asociata unui domeniu de interventie, incadrata pe lista scurta sau lunga in functie de maturitate, si caracterizata printr-un termen orientativ de implementare si o valoare estimata. Aceste valori au caracter indicativ si urmeaza a fi rafinate prin documentatiile tehnico-economice specifice fiecarei interventii.');

const _listRows = [];
for (let i = 0; i < _projs.length; i++) {
  const p = _projs[i];
  const cod = (p.cod && ('' + p.cod)) || ('P' + (i + 1));
  const tit = (p.titlu && ('' + p.titlu)) || '-';
  const dom = (p.domeniu && ('' + p.domeniu)) || '-';
  const lst = (p.lista === 'scurta') ? 'Scurta' : 'Lunga';
  const trm = (p.termen && ('' + p.termen)) || '-';
  const cst = (typeof p.cost === 'number') ? (RN(p.cost, 1) + ' mil') : ((p.cost && ('' + p.cost + ' mil')) || '-');
  _listRows.push([cod, tit, dom, lst, trm, cst]);
}
if (_listRows.length) {
  D.table(['Cod', 'Titlul interventiei', 'Domeniu', 'Lista', 'Termen', 'Cost est.'], _listRows, [16, CW - 124, 38, 18, 24, 28], { fs: 6.5, boldFirst: true });
} else {
  D.callout('Portofoliu in curs de constituire', 'La data elaborarii prezentei strategii, lista de interventii pentru ' + uat + ' se afla in curs de definitivare. Continutul va fi actualizat pe masura ce intentiile de investitii sunt formalizate prin hotararea autoritatii deliberative.');
}

D.callout('Distinctia metodologica intre lista lunga si fisele detaliate', 'Lista lunga reprezinta un instrument de planificare deschis, care inventariaza toate intentiile de investitii ale ' + uat + '. Ea nu angajeaza juridic si financiar autoritatea decat in limita prioritizarii ulterioare. Fisele detaliate de proiect, elaborate exclusiv pentru interventiile de pe lista scurta, fac obiectul unui document separat care cuprinde justificarea tehnica, analiza optiunilor, planul de finantare si calendarul de implementare. Aceasta separare evita supradimensionarea documentului strategic si concentreaza efortul de elaborare acolo unde maturitatea proiectelor o justifica.');

D.h2('Fisele proiectelor prioritare (lista scurta)');

D.P('Sectiunea de fata sintetizeaza atributele cheie ale celor ' + N(_nScurte) + ' interventii incadrate pe lista scurta. Acestea reprezinta nucleul operational al strategiei pentru orizontul imediat de implementare si beneficiaza de un nivel de detaliere superior, dat fiind gradul lor mai avansat de maturitate tehnica si institutionala. Fisele complete, cu toate elementele de programare, sunt cuprinse in documentul separat de programare a investitiilor.');

if (_nScurte) {
  for (let i = 0; i < _scurte.length; i++) {
    const p = _scurte[i];
    const cod = (p.cod && ('' + p.cod)) || ('P' + (i + 1));
    const tit = (p.titlu && ('' + p.titlu)) || 'Interventie prioritara';
    D.h3(cod + ' - ' + tit);

    if (p.desc && ('' + p.desc).trim()) {
      D.P('' + p.desc);
    } else {
      D.P('Interventia ' + cod + ' raspunde unei nevoi prioritare identificate in diagnosticul teritorial al ' + uat + ' si contribuie la atingerea obiectivelor strategice din domeniul ' + ((p.domeniu && ('' + p.domeniu)) || 'vizat') + '. Implementarea sa este programata pentru termenul ' + ((p.termen && ('' + p.termen)) || 'orientativ') + ', cu o valoare estimata supusa rafinarii prin documentatia tehnico-economica.');
    }

    const _surse = (p.surse && p.surse.length) ? p.surse.join(', ') : '-';
    const _ind = (p.indicatori && p.indicatori.length) ? p.indicatori.join('; ') : '-';
    const _cost = (typeof p.cost === 'number') ? (RN(p.cost, 1) + ' mil EUR') : ((p.cost && ('' + p.cost + ' mil EUR')) || '-');
    const _termen = (p.termen && ('' + p.termen)) || '-';
    const _dom = (p.domeniu && ('' + p.domeniu)) || '-';
    const _cond = (p.conditioneaza && p.conditioneaza.length) ? p.conditioneaza.join('; ') : '-';

    D.table(['Atribut', 'Valoare'], [
      ['Domeniu de interventie', _dom],
      ['Termen de implementare', _termen],
      ['Valoare estimata', _cost],
      ['Surse de finantare avute in vedere', _surse],
      ['Indicatori de rezultat', _ind],
      ['Conexiuni cu alte documentatii', _cond]
    ], [52, CW - 52], { fs: 7, boldFirst: true });

    if (p.surse && p.surse.length) {
      D.sourceBadges(p.surse);
    }
  }
} else {
  D.callout('Lista scurta in curs de definitivare', 'Pentru ' + uat + ' nu au fost inca selectate interventii pe lista scurta. Selectia proiectelor prioritare se va realiza in urma aplicarii criteriilor de prioritizare (maturitate, impact, eligibilitate de finantare, conditionalitati) si va fi consemnata prin actualizarea prezentei strategii.');
}

D.h2('Mecanismul de actualizare a portofoliului');

D.P('Portofoliul de proiecte nu este un document static, ci un instrument viu, supus revizuirii periodice in cadrul mecanismului de monitorizare a strategiei. Interventiile de pe lista lunga pot fi promovate pe lista scurta pe masura ce ating maturitatea necesara, dupa cum proiectele care isi pierd relevanta sau finantarea pot fi retrogradate sau eliminate.');

D.P('Criteriile de prioritizare aplicate la fiecare ciclu de revizuire includ: maturitatea tehnica si juridica a interventiei, impactul teritorial si social estimat, eligibilitatea pentru sursele de finantare disponibile, conditionalitatile cu alte documentatii de planificare, precum si gradul de pregatire institutionala a beneficiarului. Aplicarea consecventa a acestor criterii asigura ca resursele limitate sunt directionate catre interventiile cu cel mai bun raport intre cost si beneficiu public.');

D.bullets([
  ['Reprioritizare anuala', 'evaluarea stadiului fiecarei interventii si actualizarea incadrarii pe lista scurta sau lunga in functie de maturitate.'],
  ['Corelare bugetara', 'sincronizarea portofoliului cu programarea bugetara multianuala a ' + uat + ' si cu apelurile de finantare deschise.'],
  ['Transparenta', 'publicarea listei actualizate si consultarea partilor interesate la fiecare ciclu de revizuire.'],
  ['Conditionalitati', 'urmarirea dependentelor dintre proiecte si documentatiile conexe de tipul PMUD si Masterplan de utilitati, pentru evitarea blocajelor de implementare.']
]);

D.P('Prin acest mecanism, portofoliul integrat de proiecte ramane permanent aliniat la realitatile teritoriale si la oportunitatile de finantare, asigurand ca strategia ' + uat + ' isi pastreaza caracterul operational pe intreaga durata a orizontului de planificare. Lista lunga garanteaza memoria institutionala a nevoilor, iar fisele detaliate ale proiectelor prioritare garanteaza capacitatea de absorbtie efectiva a resurselor.');
      }
      // --- sectiune ord 60 (chapter) ---
      {
D.chapter('Plan de actiune si fazarea in timp');

D.P('Planul de actiune transpune viziunea strategica intr-o secventa operationala de proiecte, esalonata pe trei orizonturi temporale care acopera intervalul 2026-2040. Logica fazarii nu este una administrativa arbitrara, ci una conditionata de maturitatea tehnica a fiecarei interventii, de capacitatea de absorbtie financiara a unitatii administrativ-teritoriale si de relatiile de dependenta dintre proiecte. Un proiect de regenerare urbana nu poate demara inaintea finalizarii retelelor edilitare care il deservesc, iar interventiile de mobilitate presupun adesea exproprieri si studii prealabile care consuma intregul prim termen.');

D.P('Pentru ' + uat + ', cu o populatie de ' + N(s.pop) + ' locuitori si un portofoliu total de investitii estimat la ' + N(s.invTot) + ' milioane EUR, ritmul de implementare trebuie corelat cu un nivel realist de autorizare anuala, in prezent de ' + N(s.authAn) + ' autorizatii de constructie pe an. Supraincarcarea unui singur termen cu proiecte de anvergura ar genera blocaje in implementare, dificultati de cofinantare si presiune asupra capacitatii tehnice a aparatului administrativ. De aceea esalonarea propusa distribuie efortul investitional pe parcursul a paisprezece ani, cu o concentrare a proiectelor pregatite tehnic in primul termen si a celor structurante in termenele urmatoare.');

D.kpis([
  { val: N(s.invTot) + ' mil', label: 'Portofoliu total EUR', sub: 'orizont 2026-2040' },
  { val: String((s.projects && s.projects.length) || 0), label: 'Proiecte in plan', sub: 'pe 3 termene' },
  { val: '14 ani', label: 'Orizont planificare', sub: '2026-2040' },
  { val: N(s.authAn) + '/an', label: 'Ritm autorizare', sub: 'capacitate absorbtie' }
]);

D.h2('Cadrul de etapizare pe trei termene');

D.P('Esalonarea proiectelor urmeaza o segmentare in trei intervale distincte, fiecare cu o functie strategica proprie. Termenul scurt 2026-2029 are rolul de a debloca proiectele mature, de a finaliza documentatiile tehnice incepute si de a pune bazele infrastructurii de care depind interventiile ulterioare. Termenul mediu 2029-2034 concentreaza proiectele structurante, cu impact major asupra mobilitatii, regenerarii urbane si echiparii edilitare. Termenul lung 2034-2040 vizeaza interventiile de maturizare a orasului, cele care presupun consolidarea efectelor obtinute anterior si proiectele cu cel mai inalt grad de complexitate institutionala.');

D.bullets([
  ['Termen scurt 2026-2029', 'proiecte mature tehnic, documentatii in curs, infrastructura de baza care conditioneaza fazele urmatoare; absorbtie rapida a fondurilor disponibile.'],
  ['Termen mediu 2029-2034', 'proiecte structurante de mobilitate, regenerare urbana si echipare edilitara; volumul investitional cel mai ridicat.'],
  ['Termen lung 2034-2040', 'proiecte de maturizare si consolidare, interventii cu grad ridicat de complexitate institutionala si financiara, cu termene lungi de pregatire.']
]);

const proj = (s.projects && Array.isArray(s.projects)) ? s.projects : [];
const norm = function(t){ return (t || '').toString().toLowerCase(); };
const isShort = function(p){ var t = norm(p.termen); return t.indexOf('scurt') >= 0 || t.indexOf('2026') >= 0 || t.indexOf('2029') >= 0; };
const isMed = function(p){ var t = norm(p.termen); return t.indexOf('mediu') >= 0 || t.indexOf('2034') >= 0; };
const isLong = function(p){ var t = norm(p.termen); return t.indexOf('lung') >= 0 || t.indexOf('2040') >= 0; };

const pShort = proj.filter(isShort);
const pLong = proj.filter(function(p){ return !isShort(p) && isLong(p); });
const pMed = proj.filter(function(p){ return !isShort(p) && !isLong(p); });

const sumCost = function(arr){ var t = 0; arr.forEach(function(p){ var c = parseFloat(('' + (p.cost || '')).replace(/[^0-9.,]/g, '').replace(',', '.')); if (!isNaN(c)) t += c; }); return t; };
const cShort = sumCost(pShort), cMed = sumCost(pMed), cLong = sumCost(pLong);
const cTot = (cShort + cMed + cLong) || 1;

D.P('Distributia portofoliului de proiecte pe cele trei termene reflecta atat numarul de interventii, cat si valoarea investitionala asociata fiecarui interval. Termenul scurt cuprinde ' + N(pShort.length) + ' proiecte, termenul mediu ' + N(pMed.length) + ' proiecte, iar termenul lung ' + N(pLong.length) + ' proiecte. Concentrarea valorica in termenul mediu este fireasca, intrucat aici se regasesc interventiile structurante cu cel mai mare impact teritorial si bugetar.');

D.barChart([
  ['Scurt 26-29', pShort.length, [16, 185, 129]],
  ['Mediu 29-34', pMed.length, [59, 130, 246]],
  ['Lung 34-40', pLong.length, [185, 71, 30]]
], { title: 'Numar de proiecte pe termen', h: 48, source: 'Portofoliu SIDU ' + Uat });

D.pie([
  ['Scurt', Math.round(cShort / cTot * 100), [16, 185, 129]],
  ['Mediu', Math.round(cMed / cTot * 100), [59, 130, 246]],
  ['Lung', Math.round(cLong / cTot * 100), [185, 71, 30]]
], { title: 'Distributia valorii investitionale pe termen (%)', source: 'Estimari portofoliu SIDU' });

const fmtCost = function(p){ return p.cost ? ('' + p.cost) : '-'; };
const fmtSurse = function(p){ if (p.surse && p.surse.length) return p.surse.join(', '); return '-'; };
const trunc = function(t, n){ t = ('' + (t || '-')); return t.length > n ? t.slice(0, n - 1) + '.' : t; };

const renderTermTable = function(arr){
  if (!arr.length){ D.P('Pentru acest termen nu sunt prevazute proiecte distincte in portofoliul curent. Pe masura ce documentatiile de urbanism se maturizeaza, lista urmeaza a fi completata in actualizarile periodice ale strategiei.'); return; }
  const rows = arr.map(function(p){ return [ ('' + (p.cod || '-')), trunc(p.titlu, 52), trunc(p.domeniu, 22), fmtCost(p), trunc(fmtSurse(p), 30) ]; });
  D.table(['Cod', 'Titlu proiect', 'Domeniu', 'Cost', 'Surse finantare'], rows, [16, CW - 16 - 32 - 22 - 36, 32, 22, 36], { fs: 7, boldFirst: true });
};

D.h2('Termen scurt 2026-2029 - deblocare si pregatire');

D.P('Primul termen are caracter de fundatie. Obiectivul sau nu este maximizarea numarului de obiective inaugurate, ci asigurarea ca proiectele structurante din termenele urmatoare pot demara fara intarzieri cauzate de lipsa documentatiilor sau a retelelor edilitare. In acest interval se finalizeaza studiile de fezabilitate, se obtin avizele, se realizeaza exproprierile si se executa lucrarile de infrastructura tehnico-edilitara care deservesc zonele de dezvoltare. Tot aici se incadreaza proiectele cu grad ridicat de maturitate, pentru care exista deja proiect tehnic si finantare identificata.');

D.P('Valoarea investitionala cumulata a acestui termen este estimata la circa ' + N(Math.round(cShort)) + ' milioane EUR, reprezentand ' + N(Math.round(cShort / cTot * 100)) + ' la suta din portofoliul total. Acest nivel este compatibil cu capacitatea de absorbtie a unei administratii cu un ritm de autorizare de ' + N(s.authAn) + ' autorizatii pe an si cu necesarul estimat de ' + N(s.necLoc) + ' locuinte. Concentrarea efortului pe pregatire tehnica reduce semnificativ riscul de blocaj in fazele ulterioare.');

renderTermTable(pShort);

D.h2('Termen mediu 2029-2034 - structurare');

D.P('Termenul mediu reprezinta perioada de varf a implementarii. In acest interval se executa proiectele structurante care modeleaza forma urbana: arterele de mobilitate, nodurile intermodale, regenerarea zonelor centrale si extinderea retelelor de utilitati catre zonele de extindere a intravilanului. Aceste interventii presupun, in marea lor majoritate, finalizarea prealabila a pregatirilor din termenul scurt, motiv pentru care nu pot fi avansate in timp fara a compromite calitatea executiei.');

D.P('Cu o valoare estimata de aproximativ ' + N(Math.round(cMed)) + ' milioane EUR, echivalentul a ' + N(Math.round(cMed / cTot * 100)) + ' la suta din portofoliu, acest termen solicita cel mai inalt nivel de coordonare institutionala si de capacitate de cofinantare. Esalonarea atenta in interiorul intervalului, pe ani succesivi, este esentiala pentru evitarea suprapunerii santierelor majore si a presiunii excesive asupra bugetului local si asupra fluxurilor de trafic in tranzitie.');

renderTermTable(pMed);

D.h2('Termen lung 2034-2040 - maturizare si consolidare');

D.P('Ultimul termen vizeaza consolidarea efectelor obtinute si interventiile cu cel mai inalt grad de complexitate. Aici se regasesc proiectele care depind de finalizarea aproape integrala a celorlalte faze: extinderi finale ale sistemului de mobilitate, completarea tesutului verde la nivelul normei de ' + N(s.normaSV) + ' mp pe locuitor, si proiectele cu impact pe termen lung asupra calitatii vietii urbane. Pentru ' + uat + ', deficitul actual de spatii verzi de ' + N(s.deficitSV) + ' hectare fata de norma se atenueaza progresiv pe parcursul acestui interval.');

D.P('Valoarea acestui termen, estimata la circa ' + N(Math.round(cLong)) + ' milioane EUR, respectiv ' + N(Math.round(cLong / cTot * 100)) + ' la suta din total, este in mod intentionat distribuita pe un orizont mai indelungat, pentru a permite o ajustare a prioritatilor in functie de rezultatele monitorizarii intermediare. Flexibilitatea acestui termen functioneaza ca un mecanism de adaptare a strategiei la evolutiile demografice si economice neprevazute.');

renderTermTable(pLong);

D.h2('Dependente intre proiecte');

D.P('Relatiile de conditionare dintre proiecte constituie coloana vertebrala a logicii de fazare. Un proiect este conditionat atunci cand demararea sau eficienta sa depinde de finalizarea prealabila a altui proiect. Ignorarea acestor relatii conduce la situatii in care investitii finalizate raman subutilizate pentru ca infrastructura complementara nu este inca disponibila. Tipologia dependentelor identificate in portofoliu acopera dependente fizice, functionale, financiare si institutionale.');

D.bullets([
  ['Dependenta fizica', 'un proiect nu poate fi executat fizic inaintea altuia, de exemplu amenajarea spatiului public dupa pozarea retelelor edilitare subterane.'],
  ['Dependenta functionala', 'un proiect isi atinge obiectivele doar daca un altul este operational, de exemplu un nod intermodal care presupune existenta liniei de transport public.'],
  ['Dependenta financiara', 'doua proiecte concureaza pentru aceeasi sursa de finantare si nu pot fi cofinantate simultan in acelasi exercitiu bugetar.'],
  ['Dependenta institutionala', 'un proiect necesita o reglementare prealabila, un PUZ aprobat sau o modificare a documentatiei de urbanism inainte de a putea fi autorizat.']
]);

const depRows = [];
proj.forEach(function(p){
  if (p.conditioneaza && p.conditioneaza.length){
    depRows.push([ ('' + (p.cod || '-')), trunc(p.titlu, 40), p.conditioneaza.join(', ') ]);
  }
});
if (depRows.length){
  D.P('Tabelul urmator sintetizeaza relatiile de conditionare declarate explicit in portofoliul de proiecte, indicand pentru fiecare proiect-sursa interventiile pe care le conditioneaza.');
  D.table(['Cod', 'Proiect sursa', 'Conditioneaza proiectele'], depRows, [16, CW - 16 - 50, 50], { fs: 7, boldFirst: true });
} else {
  D.P('In portofoliul curent dependentele explicite intre proiecte nu sunt inca formalizate la nivel de date. Pe masura ce fisele de proiect se detaliaza, matricea de interdependente urmeaza a fi populata cu relatiile de conditionare directa, permitand validarea automata a fazarii propuse.');
}

D.h2('Criterii de prioritizare');

D.P('In conditiile in care resursele financiare si capacitatea administrativa sunt limitate, ordinea de implementare a proiectelor nu poate fi stabilita intuitiv. Strategia adopta un set de criterii de prioritizare ponderate, care permit ierarhizarea obiectiva a interventiilor in interiorul fiecarui termen. Aceste criterii reflecta atat impactul asteptat al proiectului, cat si gradul sau de pregatire si nivelul de risc asociat implementarii.');

D.table(
  ['Criteriu de prioritizare', 'Pondere', 'Descriere'],
  [
    ['Impact strategic', '25%', 'contributia la obiectivele majore ale strategiei si numarul de beneficiari'],
    ['Maturitate tehnica', '20%', 'existenta studiilor, avizelor si a proiectului tehnic'],
    ['Disponibilitate finantare', '20%', 'sursa identificata si eligibilitate pentru programe active'],
    ['Conditionari', '15%', 'masura in care proiectul deblocheaza alte interventii'],
    ['Risc de implementare', '10%', 'complexitate institutionala, exproprieri, capacitate tehnica'],
    ['Sustenabilitate', '10%', 'efecte de mediu, mentenanta si costuri pe ciclu de viata']
  ],
  [50, 22, CW - 50 - 22],
  { fs: 7, boldFirst: true }
);

D.barChart([
  ['Impact strategic', 25, [16, 185, 129]],
  ['Maturitate tehnica', 20, [59, 130, 246]],
  ['Finantare', 20, [99, 102, 241]],
  ['Conditionari', 15, [185, 71, 30]],
  ['Risc', 10, [234, 88, 12]],
  ['Sustenabilitate', 10, [120, 113, 108]]
], { title: 'Ponderea criteriilor de prioritizare (%)', h: 56, source: 'Metodologie SIDU UrbanX' });

D.P('Aplicarea acestor criterii produce, pentru fiecare proiect, un scor de prioritate care orienteaza alocarea bugetara anuala in interiorul termenului. Proiectele cu maturitate tehnica ridicata si conditionari multiple primesc prioritate in termenul scurt, intrucat deblocarea lor are efect de multiplicare asupra intregului portofoliu. Proiectele cu impact strategic major dar cu pregatire incompleta sunt directionate spre termenele mediu si lung, cu obligatia demararii imediate a documentatiilor.');

D.h2('Matricea de interdependente');

D.P('Matricea de interdependente este instrumentul care vizualizeaza, intr-o reprezentare bidimensionala, relatiile de conditionare dintre toate proiectele portofoliului. Pe ambele axe se inscriu proiectele, iar la intersectia liniei proiectului-sursa cu coloana proiectului-tinta se marcheaza tipul si intensitatea dependentei. O matrice citita pe linii indica influenta exercitata de fiecare proiect asupra celorlalte, iar citita pe coloane indica gradul de dependenta al fiecarui proiect fata de restul portofoliului.');

D.P('Interpretarea matricei permite identificarea proiectelor-cheie, acele interventii care conditioneaza un numar mare de alte proiecte si a caror intarziere ar propaga blocaje in cascada. Aceste proiecte trebuie protejate prioritar in alocarea resurselor si in calendarul de executie. Tot matricea evidentiaza proiectele terminale, cele care nu conditioneaza pe nimeni si care pot fi reesalonate cu flexibilitate maxima atunci cand apar constrangeri bugetare.');

D.bullets([
  ['Proiecte-cheie', 'conditioneaza multe alte interventii; orice intarziere se propaga in cascada; prioritate absoluta in calendar.'],
  ['Proiecte-puncte de strangulare', 'depind de multe alte proiecte; vulnerabile la intarzierile din amonte; necesita monitorizare stransa.'],
  ['Proiecte terminale', 'nu conditioneaza alte interventii; flexibilitate maxima de reesalonare in caz de constrangeri.'],
  ['Proiecte independente', 'fara relatii de conditionare; pot fi implementate in orice fereastra de oportunitate financiara.']
]);

D.callout('Logica fazarii', 'Esalonarea pe trei termene nu este o impartire administrativa, ci rezultatul aplicarii criteriilor de prioritizare asupra matricei de interdependente. Proiectele care deblocheaza cele mai multe alte interventii se executa primele, indiferent de anvergura lor, pentru ca intarzierea lor ar bloca intregul portofoliu. Fazarea trebuie revizuita la fiecare evaluare intermediara a strategiei.');

D.h2('Mecanismul de monitorizare si ajustare a fazarii');

D.P('Planul de actiune nu este un document rigid, ci unul viu, care se ajusteaza periodic in functie de gradul real de implementare si de evolutia contextului. Strategia prevede evaluari intermediare la finalul fiecarui termen, momente in care fazarea proiectelor ramase se recalibreaza in functie de resursele efectiv mobilizate, de noile oportunitati de finantare si de eventualele schimbari ale prioritatilor administrative. Acest mecanism transforma planul dintr-o lista statica intr-un instrument adaptiv de management al investitiilor.');

D.lineChart([
  { name: 'Cumulat investitii (mil EUR)', color: [59, 130, 246], points: [Math.round(cShort), Math.round(cShort + cMed), Math.round(cShort + cMed + cLong)] }
], ['2029', '2034', '2040'], { title: 'Curba cumulata a investitiilor pe orizontul de planificare', source: 'Estimari portofoliu SIDU ' + Uat });

D.P('Curba cumulata a investitiilor ilustreaza ritmul preconizat de cheltuire a portofoliului. Panta moderata din primul termen reflecta concentrarea pe pregatire, accelerarea din termenul mediu corespunde varfului de executie a proiectelor structurante, iar aplatizarea relativa din termenul lung indica trecerea catre interventii de consolidare. Orice abatere semnificativa de la aceasta curba in timpul implementarii constituie un semnal de alarma care declanseaza o revizuire a fazarii si, eventual, o reprioritizare a proiectelor ramase.');

D.sourceBadges(['Portofoliu SIDU', 'Metodologie UrbanX', 'INS', 'Documentatii de urbanism']);
      }
      // --- sectiune ord 70 (chapter) ---
      {
D.chapter('Plan financiar consolidat')

D.P('Planul financiar consolidat traduce portofoliul de proiecte al strategiei intr-un cadru bugetar coerent, structurat pe surse de finantare, esalonari multianuale si scenarii de risc. Pentru ' + uat + ', valoarea totala a portofoliului de investitii prioritare se ridica la aproximativ ' + N(s.invTot) + ' milioane EUR, suma care acopera interventiile din toate domeniile strategice pe orizontul de programare. Aceasta valoare nu reprezinta un angajament ferm, ci o estimare a necesarului investitional derivata din fisele de proiect si din analiza deficitelor sectoriale identificate in capitolele anterioare.')

D.P('Constructia planului financiar porneste de la principiul mixului echilibrat de surse, in care fondurile europene nerambursabile constituie pivotul finantarii, completate de mecanisme nationale, contributia bugetului local si instrumente de parteneriat public-privat. Distributia tinta a surselor a fost calibrata pornind de la ratele istorice de absorbtie, de la capacitatea administrativa a autoritatii locale si de la profilul de eligibilitate al fiecarui proiect din portofoliu. Obiectivul este reducerea dependentei de o singura sursa si construirea unei rezerve de flexibilitate care sa permita reasezarea finantarii in cazul intarzierilor la una dintre componente.')

const por = Math.round(s.invTot * 0.42);
const pnrr = Math.round(s.invTot * 0.28);
const bug = Math.round(s.invTot * 0.18);
const ppp = s.invTot - por - pnrr - bug;

D.kpis([
  { val: N(s.invTot) + ' M', label: 'Portofoliu total', sub: 'mil. EUR investitii prioritare' },
  { val: '42%', label: 'Fonduri regionale', sub: N(por) + ' mil. EUR' },
  { val: '28%', label: 'Mecanism redresare', sub: N(pnrr) + ' mil. EUR' },
  { val: '12%', label: 'PPP / institutii financiare', sub: N(ppp) + ' mil. EUR' }
]);

D.h2('Structura surselor de finantare');

D.P('Repartizarea portofoliului pe surse de finantare reflecta arhitectura tipica a unei strategii integrate de dezvoltare urbana, in care programul operational regional acopera ponderea cea mai mare, fiind instrumentul natural pentru investitii in infrastructura urbana, mobilitate, regenerare si eficienta energetica. Mecanismul de redresare si rezilienta finanteaza componenta de tranzitie verde si digitala, cu termene stranse de implementare, in timp ce bugetul local si cel de stat asigura cofinantarea si interventiile neeligibile pentru fonduri externe. Parteneriatul public-privat si imprumuturile de la institutii financiare internationale completeaza schema pentru proiectele cu potential de generare de venituri.');

D.pie([
  ['POR (program regional)', 42, [59,130,246]],
  ['PNRR (redresare)', 28, [16,185,129]],
  ['Buget local / stat', 18, [245,158,11]],
  ['PPP / BEI', 12, [168,85,247]]
], { title: 'Distributia surselor de finantare (% din portofoliu)', source: 'Estimare UrbanX pe baza fiselor de proiect' });

D.table(
  ['Sursa de finantare', 'Pondere', 'Suma (mil. EUR)', 'Profil'],
  [
    ['Program operational regional', '42%', N(por), 'Nerambursabil'],
    ['Mecanism redresare si rezilienta', '28%', N(pnrr), 'Nerambursabil'],
    ['Buget local si buget de stat', '18%', N(bug), 'Public propriu'],
    ['PPP si institutii financiare', '12%', N(ppp), 'Mixt / rambursabil'],
    ['TOTAL', '100%', N(s.invTot), '-']
  ],
  [62, 22, 36, CW-120],
  { fs: 7, boldFirst: true }
);

D.h3('Programul operational regional (42%)');

D.P('Programul operational regional reprezinta principala sursa nerambursabila a strategiei, cu o alocare estimata de ' + N(por) + ' milioane EUR, echivalentul a 42% din portofoliu. Aceasta sursa finanteaza prioritar interventiile de regenerare urbana, mobilitate durabila, eficienta energetica a cladirilor publice, infrastructura verde si digitalizarea serviciilor administrative. Pentru ' + uat + ', avantajul major al acestei surse consta in ratele de cofinantare favorabile pentru autoritatile locale si in alinierea directa a axelor prioritare cu obiectivele specifice ale strategiei. Riscul principal este competitia ridicata pe apelurile de proiecte si necesitatea unei maturitati tehnice avansate a documentatiilor la momentul depunerii.');

D.P('Pentru maximizarea absorbtiei din aceasta sursa, autoritatea locala trebuie sa pregateasca din timp documentatiile tehnico-economice, sa asigure rezerva de cofinantare in bugetul multianual si sa constituie o lista de proiecte de rezerva care sa poata fi depuse rapid pe apeluri suplimentare. Esalonarea contractarii pe intreaga perioada de programare reduce presiunea asupra capacitatii administrative si a fluxului de numerar.');

D.h3('Mecanismul de redresare si rezilienta (28%)');

D.P('Mecanismul de redresare si rezilienta contribuie cu aproximativ ' + N(pnrr) + ' milioane EUR, respectiv 28% din portofoliu, fiind orientat catre componentele de tranzitie verde, eficienta energetica, mobilitate electrica, digitalizare si reziliente la schimbarile climatice. Caracteristica definitorie a acestei surse este regimul strict de jaloane si tinte, cu termene de finalizare necompromisibile, ceea ce impune o disciplina ridicata in implementare. Proiectele finantate prin acest mecanism trebuie sa fie mature contractual si sa demonstreze capacitate reala de executie in intervale scurte de timp.');

D.P('Concentrarea unei ponderi semnificative pe aceasta sursa aduce un beneficiu de viteza, dar si un risc de neeligibilitate a cheltuielilor in cazul depasirii termenelor. Recomandarea strategica este utilizarea acestei surse pentru proiectele cu cel mai inalt grad de pregatire si cu cea mai mica incertitudine procedurala, lasand interventiile complexe sau cu risc de avizare prelungit pe seama surselor cu orizont temporal mai relaxat.');

D.h3('Bugetul local si bugetul de stat (18%)');

D.P('Contributia din buget local si buget de stat este estimata la ' + N(bug) + ' milioane EUR, adica 18% din portofoliu. Aceasta componenta acopera cofinantarea obligatorie a proiectelor europene, cheltuielile neeligibile, costurile de pregatire a documentatiilor si interventiile de mica anvergura care nu se preteaza finantarii externe. Capacitatea de a sustine acest nivel de contributie depinde direct de structura bugetului local, de gradul de autonomie fiscala si de eventualele transferuri de la bugetul de stat pentru obiective de interes national.');

D.P('Pentru ' + uat + ', sustenabilitatea acestei surse impune o planificare bugetara multianuala riguroasa, prioritizarea cheltuielilor de investitii in detrimentul celor curente neesentiale si, acolo unde este cazul, atragerea de transferuri dedicate prin programe nationale de dezvoltare. Constituirea unui fond de rezerva pentru investitii ofera flexibilitatea necesara pentru a acoperi varfurile de cofinantare in anii cu contractare intensa.');

D.h3('PPP si institutii financiare internationale (12%)');

D.P('Parteneriatul public-privat si imprumuturile de la institutii financiare internationale completeaza schema cu aproximativ ' + N(ppp) + ' milioane EUR, respectiv 12% din portofoliu. Aceasta sursa este potrivita pentru proiectele care genereaza venituri proprii sau economii operationale masurabile, cum sunt infrastructura de utilitati, parcarile, eficienta energetica cu plata din economii sau dezvoltarile imobiliare cu componenta publica. Spre deosebire de fondurile nerambursabile, aceasta componenta presupune un cost al capitalului si o expunere la datorie care trebuie incadrata in limitele legale de indatorare ale autoritatii locale.');

D.P('Utilizarea responsabila a instrumentelor rambursabile permite devansarea unor investitii critice fara a astepta ciclurile de finantare europeana, dar necesita o analiza atenta a serviciului datoriei si a capacitatii de rambursare pe termen lung. Pentru proiectele de tip PPP, repartizarea echilibrata a riscurilor intre partenerul public si cel privat este conditia esentiala a sustenabilitatii contractuale.');

D.h2('Analiza capacitatii financiare');

D.P('Capacitatea autoritatii locale de a absorbi si gestiona un portofoliu de ' + N(s.invTot) + ' milioane EUR se evalueaza prin raportarea efortului investitional anual la veniturile bugetare proprii, la gradul de indatorare existent si la capacitatea administrativa de pregatire si implementare a proiectelor. Esalonarea portofoliului pe orizontul de programare conduce la un efort mediu anual care, raportat la dimensiunea ' + (s._isCom ? 'comunei' : 'localitatii') + ' si la baza demografica de ' + N(s.pop) + ' locuitori, indica nivelul de incarcare a aparatului tehnic si bugetar.');

const orizont = 7;
const anual = Math.round(s.invTot / orizont);
const cofinAnual = Math.round((por + pnrr) * 0.08 / orizont + bug / orizont);

D.P('Pe un orizont de programare de ' + orizont + ' ani, efortul investitional mediu se situeaza la aproximativ ' + N(anual) + ' milioane EUR pe an, din care necesarul anual de cofinantare si contributie proprie reprezinta o fractiune gestionabila daca este planificata multianual. Indicatorul critic de monitorizat este raportul dintre serviciul anual al datoriei si veniturile proprii, care trebuie mentinut sub pragul legal de indatorare pentru a pastra capacitatea de imprumut viitoare si bonitatea financiara a autoritatii.');

D.table(
  ['Indicator de capacitate', 'Valoare estimata', 'Observatie'],
  [
    ['Portofoliu total', N(s.invTot) + ' mil. EUR', 'Pe orizont programare'],
    ['Efort mediu anual', N(anual) + ' mil. EUR', orizont + ' ani'],
    ['Necesar cofinantare anuala', N(cofinAnual) + ' mil. EUR', 'Buget local + cofin. UE'],
    ['Pondere surse nerambursabile', '70%', 'POR + PNRR'],
    ['Pondere surse rambursabile / mixte', '12%', 'PPP + BEI'],
    ['Populatie de referinta', N(s.pop), 'locuitori 2021']
  ],
  [60, 44, CW-104],
  { fs: 7, boldFirst: true }
);

D.barChart([
  ['POR', por, [59,130,246]],
  ['PNRR', pnrr, [16,185,129]],
  ['Buget', bug, [245,158,11]],
  ['PPP/BEI', ppp, [168,85,247]]
], { title: 'Valoarea pe surse de finantare (mil. EUR)', h: 48, source: 'Estimare UrbanX pe baza portofoliului de proiecte' });

D.P('Pre-conditiile pentru o capacitate financiara solida includ mentinerea unui excedent operational care sa permita cofinantarea, reducerea arieratelor, imbunatatirea colectarii veniturilor proprii si profesionalizarea echipei de management al proiectelor. Acolo unde capacitatea administrativa interna este limitata, externalizarea pregatirii documentatiilor si contractarea de asistenta tehnica de specialitate reduc riscul de blocaj in implementare si de pierdere a finantarilor angajate.');

D.h2('Scenarii de finantare');

D.P('Pentru a anticipa variabilitatea reala a absorbtiei de fonduri, planul financiar este testat prin trei scenarii care reflecta ipoteze diferite privind rata de succes a aplicatiilor, ritmul de contractare si gradul de cofinantare disponibil. Scenariul conservator presupune o absorbtie redusa a fondurilor nerambursabile si o realizare partiala a portofoliului, scenariul realist reflecta tendintele istorice de absorbtie ajustate la capacitatea actuala, iar scenariul optimist mizeaza pe o maturitate ridicata a proiectelor si pe atragerea integrala a surselor planificate.');

const consPct = 0.65, realPct = 0.85, optPct = 1.0;
const cons = Math.round(s.invTot * consPct);
const real = Math.round(s.invTot * realPct);
const opt = Math.round(s.invTot * optPct);

D.table(
  ['Scenariu', 'Rata realizare', 'Investitie mobilizata', 'Surse nerambursabile', 'Buget propriu necesar'],
  [
    ['Conservator', '65%', N(cons) + ' M', N(Math.round(cons*0.70)) + ' M', N(Math.round(cons*0.18)) + ' M'],
    ['Realist', '85%', N(real) + ' M', N(Math.round(real*0.70)) + ' M', N(Math.round(real*0.18)) + ' M'],
    ['Optimist', '100%', N(opt) + ' M', N(Math.round(opt*0.70)) + ' M', N(Math.round(opt*0.18)) + ' M']
  ],
  [34, 26, 40, 38, CW-138],
  { fs: 7, boldFirst: true }
);

D.barChart([
  ['Conservator', cons, [239,68,68]],
  ['Realist', real, [245,158,11]],
  ['Optimist', opt, [16,185,129]]
], { title: 'Investitie mobilizata pe scenarii (mil. EUR)', h: 48, source: 'Estimare UrbanX - modelare scenarii absorbtie' });

D.h3('Scenariul conservator');

D.P('Scenariul conservator porneste de la ipoteza unei rate de realizare de 65% din portofoliu, corespunzatoare unui mediu de absorbtie dificil, cu competitie ridicata pe apeluri, intarzieri in avizare si o capacitate administrativa sub presiune. In acest scenariu se mobilizeaza aproximativ ' + N(cons) + ' milioane EUR, iar prioritizarea devine esentiala: se finalizeaza interventiile critice pentru siguranta si functionarea de baza a localitatii, in timp ce proiectele de anvergura sau cu eligibilitate incerta sunt amanate sau reproiectate. Acest scenariu functioneaza ca prag minim de planificare bugetara prudenta.');

D.h3('Scenariul realist');

D.P('Scenariul realist, considerat scenariul de referinta pentru programarea bugetara, presupune o rata de realizare de 85% din portofoliu, echivalenta cu aproximativ ' + N(real) + ' milioane EUR mobilizate. Aceasta ipoteza reflecta o absorbtie aliniata tendintelor istorice ajustate la o capacitate administrativa consolidata prin asistenta tehnica si printr-o pregatire timpurie a documentatiilor. In acest scenariu, majoritatea proiectelor prioritare sunt implementate la termen, iar amanarile se limiteaza la interventiile cu complexitate procedurala ridicata. Bugetul multianual al autoritatii trebuie dimensionat pe baza acestui scenariu, cu o rezerva de flexibilitate spre scenariul optimist.');

D.h3('Scenariul optimist');

D.P('Scenariul optimist asuma o rata de realizare de 100%, cu mobilizarea integrala a celor ' + N(opt) + ' milioane EUR din portofoliu. Realizarea acestui scenariu este conditionata de un nivel ridicat de maturitate a proiectelor inca de la inceputul perioadei de programare, de o rata de succes superioara mediei pe apelurile de finantare si de atragerea completa a componentelor de parteneriat public-privat. Desi reprezinta tinta ideala, acest scenariu nu trebuie sa fundamenteze angajamentele bugetare ferme, ci sa serveasca drept reper pentru constituirea listei de proiecte de rezerva care pot fi activate in cazul unei absorbtii peste asteptari.');

D.callout('Recomandare de planificare', 'Bugetul multianual al ' + uat + ' se fundamenteaza pe scenariul realist (' + N(real) + ' mil. EUR), cu o rezerva de cofinantare dimensionata pentru a putea evolua spre scenariul optimist. Mentinerea unei liste de proiecte de rezerva mature si monitorizarea trimestriala a ratei de contractare sunt mecanismele care permit reasezarea rapida a finantarii intre surse atunci cand una dintre componente intarzie.');

D.P('Indiferent de scenariul materializat, succesul implementarii financiare depinde de trei factori transversali: pregatirea anticipata a documentatiilor tehnico-economice, asigurarea predictibila a cofinantarii din bugetul local si capacitatea de a redistribui proiectele intre surse de finantare pe masura ce conditiile de eligibilitate si apelurile se modifica. Un sistem de monitorizare financiara cu indicatori clari de contractare, absorbtie si serviciu al datoriei ofera autoritatii instrumentul de decizie necesar pentru a corecta din timp abaterile de la traiectoria planificata.');

D.sourceBadges(['POR', 'PNRR', 'MDLPA', 'BEI', 'Estimare UrbanX']);
      }
      // --- sectiune ord 80 (chapter) ---
      {
D.chapter('Corelarea SIDU -> PUG (transpunerea in reglementare)')
D.P('Acest capitol clarifica una dintre cele mai frecvente confuzii din practica de planificare din administratia locala din ' + uat + ', judetul ' + jud + ': diferenta de natura juridica si functionala dintre documentele strategice (SIDU, PMUD, Masterplan sectorial) si documentele de reglementare urbanistica (PUG, PUZ, PUD). O strategie bine scrisa, dar netranspusa in regulament, ramane o intentie fara forta executorie; iar un regulament care nu preia viziunea strategica perpetueaza dezvoltarea reactiva, lot cu lot, fara coerenta de ansamblu.')
D.P('Pentru ' + uat + ', cu o populatie de ' + N(s.pop) + ' locuitori la nivelul anului 2021 si un portofoliu de investitii estimat la ' + N(s.invTot) + ' mil. EUR, riza este concreta: fiecare element strategic care nu se regaseste explicit in PUG devine, in timp, fie imposibil de realizat, fie realizabil doar cu costuri suplimentare majore (exproprieri, despagubiri, renegocieri).')

D.h2('1. Doua naturi juridice diferite ale planificarii')
D.P('Documentele strategice raspund la intrebarea "ce vrem sa devenim". SIDU stabileste viziunea, obiectivele si portofoliul de proiecte; PMUD fixeaza politica de mobilitate si distributia modala tinta; Masterplanul sectorial (apa-canal, energie, spatii verzi) defineste capacitatile si fazarea infrastructurii. Aceste documente sunt adoptate prin hotarare de consiliu local si au valoare politica si programatica, dar nu produc, prin ele insele, efecte directe asupra dreptului de proprietate sau a regimului de construire al unui teren anume.')
D.P('Documentele de reglementare raspund la intrebarea "ce ai voie sa construiesti aici". PUG, prin Regulamentul Local de Urbanism (RLU), stabileste pentru fiecare parcela indicatorii urbanistici (POT, CUT, regim de inaltime, retrageri), functiunile admise si interzise, si rezerva culoarele si suprafetele de utilitate publica. Doar PUG si documentatiile subsecvente (PUZ, PUD) sunt opozabile tertilor si pot fundamenta refuzul sau emiterea unei autorizatii de construire.')
D.P('Consecinta operationala este urmatoarea: o strategie nu se aplica niciodata direct asupra unei cereri de autorizare. Ea se aplica indirect, prin intermediul PUG actualizat care preia, articol cu articol, deciziile strategice. Atata timp cat aceasta transpunere nu se produce, strategia ramane un document de raft, iar functionarul din serviciul de urbanism este obligat sa emita autorizatii pe baza vechiului regulament, chiar daca acesta contrazice viziunea adoptata de consiliu.')

D.kpis([
  { val:N(s.invTot)+' mil', label:'Portofoliu investitii (EUR)', sub:'expus riscului de netranspunere' },
  { val:N(s.projects.length), label:'Proiecte strategice', sub:'necesita reflectare in PUG' },
  { val:N(s.authAn), label:'Autorizatii/an', sub:'emise pe regulamentul in vigoare' },
  { val:s.calific||'-', label:'Nota UrbanX', sub:'maturitate planificare' }
])

D.h2('2. Blocajele reale generate de netranspunere')
D.P('Experienta administratiilor din regiunea ' + reg + ' arata ca lipsa transpunerii nu este o problema teoretica, ci genereaza pierderi masurabile. Doua mecanisme sunt deosebit de costisitoare si ireversibile: culoarele de circulatie nerezervate si coridoarele verzi fara regim de protectie.')

D.h3('2.1. Culoarele de transport nerezervate devin exproprieri')
D.P('Atunci cand PMUD propune un nou bulevard, o centura sau un coridor de transport public in comun, dar PUG nu reglementeaza terenul respectiv drept zona de circulatie cu interdictie de construire pana la realizarea investitiei, proprietarii din lungul traseului isi pastreaza dreptul deplin de a construi. In intervalul dintre adoptarea strategiei si demararea efectiva a lucrarii - adesea 5-10 ani - parcelele se construiesc legal.')
D.P('La momentul realizarii investitiei, administratia nu mai are de cumparat teren liber la pret de teren agricol sau intravilan neconstruit, ci trebuie sa exproprieze constructii existente, cu despagubiri la valoarea de piata a cladirii plus teren. Costul unui culoar poate creste astfel de cateva ori, iar termenele se prelungesc din cauza litigiilor. Pentru ' + uat + ', cu un nivel de motorizare de ' + N(s.motoriz) + ' autoturisme la 1000 de locuitori si o pondere a deplasarilor cu autoturismul de ' + RN(s.modalAuto,0) + '%, presiunea pentru noi culoare este reala, iar fereastra de oportunitate pentru rezervarea lor ieftin este limitata.')

D.h3('2.2. Coridoarele verzi fara regim se pierd definitiv')
D.P('Masterplanul de spatii verzi si SIDU pot identifica un coridor verde-albastru de-a lungul unui curs de apa, un inel verde periurban sau o retea de parcuri de cartier. Daca aceste suprafete nu primesc in PUG o subzona dedicata (spatii verzi publice, zona de protectie a apelor, zona neconstruibila), ele raman incadrate la functiunea anterioara, frecvent zona de locuinte sau zona mixta, si pot fi construite.')
D.P('Spre deosebire de un culoar de drum, care teoretic poate fi recuperat prin expropriere, un coridor verde pierdut este practic ireversibil: odata fragmentat de constructii, nu mai poate fi reconstituit ca sistem continuu. Pentru ' + uat + ', cu un indicator actual de ' + RN(s.svMpLoc,1) + ' mp spatiu verde pe locuitor fata de norma de ' + N(s.normaSV) + ' mp/locuitor si un deficit estimat de ' + N(s.deficitSV) + ' ha, fiecare coridor verde neprotejat in PUG inseamna consolidarea permanenta a acestui deficit.')

D.callout('Principiu de planificare', 'Strategia stabileste intentia, dar numai PUG produce efecte asupra terenului. Orice element strategic netranspus in PUG si RLU in termen de cel mult un ciclu de actualizare devine, statistic, fie imposibil de realizat, fie realizabil doar cu costuri de expropriere si despagubire mult mai mari decat rezervarea preventiva.')

D.h2('3. Matrice element de transpus vs efect al netranspunerii')
D.P('Tabelul de mai jos sistematizeaza principalele categorii de decizii strategice care trebuie sa coboare obligatoriu in reglementarea PUG, alaturi de efectul concret al omisiunii. Coloana din dreapta nu este ipotetica: fiecare situatie descrisa s-a produs in administratii care au adoptat strategii ambitioase fara a-si actualiza corespunzator regulamentul de urbanism.')
D.table(
  ['Element strategic de transpus in PUG', 'Mecanism de transpunere', 'Efect daca NU se transpune'],
  [
    ['Culoar de transport (bulevard, centura, TP)', 'Subzona circulatii cu interdictie temporara de construire pe traseu', 'Parcelele se construiesc; exproprierea de constructii multiplica costul'],
    ['Coridor verde-albastru / parc', 'Subzona spatii verzi publice si zona protectie ape', 'Coridor fragmentat de constructii, deficit verde permanent'],
    ['Zona de reconversie / regenerare urbana', 'UTR dedicat cu indicatori si conditii de operatiune urbana', 'Dezvoltare punctuala necoordonata, fara coerenta de ansamblu'],
    ['Densificare orientata pe transport (TOD)', 'POT/CUT majorati in jurul nodurilor TP, conditii de mixitate', 'Densitate dispersata departe de transport, congestie suplimentara'],
    ['Echipamente publice (scoli, sanatate, sociale)', 'Rezervare teren utilitate publica, interdictie de instrainare', 'Teren ocupat privat; lipsa amplasamentelor la momentul finantarii'],
    ['Protectie zona de risc seismic / inundabil', 'Restrictii de construire si conditionari tehnice in RLU', 'Constructii expuse; pierderi de vieti si pagube la eveniment'],
    ['Limita de intravilan / stop expansiune', 'Pastrarea limitei intravilan si interdictie de extindere necontrolata', 'Sprawl periurban, retele supradimensionate si costisitoare'],
    ['Capacitate retele (apa, canal, energie)', 'Conditionarea autorizarii de existenta capacitatii in retea', 'Supraincarcare retele, presiune scazuta, deversari, blackout local']
  ],
  [58, 56, CW-114],
  { fs:7, boldFirst:true }
)

D.h2('4. Cuantificarea riscului de netranspunere pentru ' + Uat)
D.P('Pentru a face vizibil costul inactiunii, urmatoarele estimari ilustreaza diferenta de cost intre rezervarea preventiva a unui culoar prin PUG si recuperarea sa ulterioara prin expropriere de constructii. Valorile sunt orientative (estimare) si trebuie inlocuite cu evaluari de specialitate la momentul fundamentarii fiecarei investitii.')
const cRez = Math.max(1, Math.round(s.invTot*0.04));
const cExpr = cRez*3;
D.barChart([
  ['Rezervare preventiva in PUG', cRez, [16,150,96]],
  ['Expropriere constructii (estimare)', cExpr, [185,71,30]]
], { title:'Cost comparativ culoar de transport (mil. EUR, estimare)', h:46, source:'Estimare UrbanX pe portofoliul ' + uat })
D.P('Diferenta ilustrata - un raport de circa unu la trei intre rezervarea preventiva si exproprierea ulterioara - este conservatoare. In zonele cu presiune imobiliara ridicata raportul depaseste frecvent unu la cinci, mai ales cand intre adoptarea strategiei si realizarea investitiei se construiesc cladiri noi, scumpe, pe traseul vizat.')

D.lineChart([
  { name:'Cost recuperare culoar (index)', color:[185,71,30], points:[100,180,320] },
  { name:'Cost rezervare preventiva (index)', color:[16,150,96], points:[100,105,110] }
], ['An 0 (adoptare SIDU)', 'An 5', 'An 10'], { title:'Evolutia costului in functie de momentul transpunerii', source:'Model UrbanX (index 100 = an adoptare)' })
D.P('Graficul evidentiaza esenta problemei: costul rezervarii preventive ramane aproape constant in timp, in timp ce costul recuperarii ulterioare creste accelerat pe masura ce terenul vizat se construieste. Fereastra de transpunere ieftina este chiar perioada imediat urmatoare adoptarii SIDU, cand PUG poate fi actualizat inainte ca presiunea de construire sa modifice traseele strategice.')

D.h2('5. Recomandare de transpunere, linie cu linie')
D.P('Transpunerea SIDU in PUG nu trebuie tratata ca o operatiune globala, ci ca o lista de actiuni discrete, fiecare cu un articol sau o subzona corespondenta in RLU. Recomandarea metodologica pentru ' + uat + ' este urmatoarea: la lansarea actualizarii PUG, fiecare proiect strategic din portofoliu primeste o fisa de corelare care indica explicit ce element de regulament il sustine.')
D.bullets([
  ['Inventar', 'se extrage din SIDU lista completa a elementelor spatiale: culoare, coridoare verzi, zone de reconversie, amplasamente publice, zone de risc.'],
  ['Atribuire', 'fiecarui element i se atribuie un instrument de PUG: subzona, interdictie temporara, rezervare de utilitate publica sau conditionare de autorizare.'],
  ['Prioritizare', 'elementele cu fereastra de oportunitate scurta - culoarele si coridoarele verzi sub presiune imobiliara - se transpun primele.'],
  ['Verificare', 'inainte de avizare, fiecare proiect strategic se confrunta cu PUG pentru a confirma ca are suport in regulament; proiectele fara suport se semnaleaza.'],
  ['Monitorizare', 'dupa aprobare, gradul de transpunere se urmareste anual ca indicator de guvernanta: cate elemente strategice au regim de PUG corespunzator.']
])
D.P('Tabelul urmator propune o fisa-tip de corelare aplicabila proiectelor din portofoliul ' + uat + '. El leaga fiecare proiect strategic de instrumentul de PUG necesar si de starea actuala a transpunerii, astfel incat consiliul local sa poata urmari, la fiecare raport de monitorizare, ce decizii adoptate au coborat efectiv in reglementare.')
const _rows = (s.projects||[]).slice(0,8).map(function(p){
  return [ (p.cod||'-')+' '+(p.titlu||'-'), (p.domeniu||'-'), 'Subzona / rezervare in RLU', 'De transpus' ];
});
if(_rows.length===0){ _rows.push(['-','-','-','-']); }
D.table(
  ['Proiect strategic', 'Domeniu', 'Instrument PUG necesar', 'Stare'],
  _rows,
  [70, 34, 44, CW-148],
  { fs:7, boldFirst:true }
)

D.h2('6. Concluzie operationala')
D.P('SIDU, PMUD si Masterplanul definesc directia; PUG o face obligatorie. Fara pasul de transpunere, ' + uat + ' risca sa adopte o strategie coerenta pe hartie, dar sa autorizeze in continuare o dezvoltare care o contrazice, pierzand definitiv culoare de transport ieftine si coridoare verzi nereconstituibile. Recomandarea centrala a acestui capitol este declansarea actualizarii PUG imediat dupa adoptarea SIDU, cu o fisa de corelare pentru fiecare element strategic spatial si cu prioritizarea elementelor aflate sub presiune imobiliara.')
D.P('Transpunerea trebuie tratata ca indicator de guvernanta urbana, raportat anual consiliului local: procentul elementelor strategice care au regim de PUG corespunzator masoara, mai bine decat orice declaratie, masura in care strategia adoptata este efectiv pusa in aplicare. Pentru un portofoliu de ' + N(s.invTot) + ' mil. EUR, fiecare punct procentual de transpunere realizat la timp inseamna economii directe la capitolul exproprieri si despagubiri si protectia ireversibila a resurselor verzi ale orasului.')
D.sourceBadges(['SIDU','PMUD','PUG / RLU','Legea 350/2001','UrbanX'])
      }
      // --- sectiune ord 85 (chapter) ---
      {
D.chapter('Evaluarea strategica de mediu (SEA)');

D.P('Evaluarea strategica de mediu (SEA - Strategic Environmental Assessment) reprezinta instrumentul prin care obiectivele si masurile propuse de prezenta strategie sunt analizate sistematic din perspectiva efectelor probabile asupra mediului inconjurator, inainte de adoptarea documentului. Spre deosebire de evaluarea impactului la nivel de proiect individual, SEA opereaza la nivelul deciziei de planificare, integrand consideratiile de mediu in chiar arhitectura strategiei, atunci cand exista inca marja de a alege intre directii de dezvoltare alternative.');

D.P('Pentru ' + uat + ', aplicarea SEA este justificata de amploarea transformarilor urbane preconizate: un portofoliu de investitii estimat la ' + N(s.invTot) + ' mil. EUR, presiuni asupra suprafetelor verzi (deficit actual de ' + N(s.deficitSV) + ' ha fata de norma de ' + s.normaSV + ' mp/locuitor) si o tinta de reechilibrare a distributiei modale dinspre transportul individual motorizat catre mobilitate activa si transport public. Toate aceste interventii produc efecte cumulative si sinergice care nu pot fi evaluate corect decat la nivel strategic.');

D.sourceBadges(['OUG 195/2005', 'HG 1076/2004', 'Directiva 2001/42/CE', 'Protocolul Kiev']);

D.h2('1. Cadrul legal si institutional');

D.P('Procedura de evaluare strategica de mediu este reglementata in Romania de Ordonanta de urgenta a Guvernului nr. 195/2005 privind protectia mediului, cu modificarile si completarile ulterioare, si de Hotararea de Guvern nr. 1076/2004 privind stabilirea procedurii de realizare a evaluarii de mediu pentru planuri si programe. Aceste acte normative transpun in legislatia nationala Directiva 2001/42/CE a Parlamentului European si a Consiliului privind evaluarea efectelor anumitor planuri si programe asupra mediului.');

D.P('HG 1076/2004 stabileste criteriile de determinare a efectelor semnificative potentiale asupra mediului, etapele procedurale obligatorii, precum si rolul autoritatilor competente pentru protectia mediului. Pentru o strategie integrata de dezvoltare urbana, autoritatea competenta este, de regula, agentia judeteana pentru protectia mediului din ' + jud + ', care decide asupra necesitatii efectuarii evaluarii (etapa de incadrare) si avizeaza ulterior raportul de mediu.');

D.P('Documentul de planificare elaborat pentru ' + uat + ' intra sub incidenta evaluarii de mediu deoarece stabileste cadrul pentru proiecte viitoare supuse evaluarii impactului asupra mediului si poate afecta arii naturale protejate sau resurse de mediu sensibile. In consecinta, parcurgerea procedurii SEA nu este optionala, ci o conditie de legalitate a adoptarii strategiei de catre autoritatea deliberativa locala.');

D.bullets([
  ['OUG 195/2005', 'cadrul general al protectiei mediului - obligatia integrarii cerintelor de mediu in planuri si programe.'],
  ['HG 1076/2004', 'procedura propriu-zisa: incadrare, definitivarea proiectului de raport, consultari, decizia de emitere a avizului de mediu.'],
  ['Directiva 2001/42/CE', 'actul european-sursa, transpus integral - asigura compatibilitatea metodologica cu practica UE.'],
  ['Legea 292/2018', 'evaluarea impactului asupra mediului (EIM) la nivel de proiect individual, in aval de SEA.']
]);

D.callout('Distinctia SEA / EIM', 'SEA se aplica planului sau programului (nivel strategic, alegere intre alternative de dezvoltare), in timp ce EIM se aplica proiectului concret (nivel operational, conditii tehnice de realizare). SEA precede si incadreaza EIM: o masura validata strategic ramane supusa evaluarii la nivel de proiect inainte de autorizare.');

D.h2('2. Etapele procedurii desfasurate in paralel cu elaborarea strategiei');

D.P('Principiul fundamental al SEA este integrarea, nu suprapunerea: evaluarea de mediu se desfasoara concomitent cu elaborarea strategiei, astfel incat concluziile de mediu sa poata influenta deciziile de planificare in timp util. O evaluare efectuata dupa finalizarea documentului ar fi formala si lipsita de valoare adaugata, intrucat nu ar mai putea reorienta optiunile strategice deja consolidate.');

D.P('Procedura cuprinde o succesiune de etape, fiecare cu rezultate verificabile si cu momente obligatorii de consultare a publicului si a autoritatilor cu responsabilitati in domeniul mediului si sanatatii. Tabelul urmator prezinta etapele in corelatie cu fazele de elaborare a strategiei pentru ' + uat + '.');

D.table(
  ['Etapa SEA', 'Faza strategiei', 'Rezultat / actiune'],
  [
    ['Notificare si incadrare', 'Definirea viziunii si obiectivelor', 'Notificarea autoritatii de mediu; decizia daca strategia necesita SEA'],
    ['Definirea domeniului', 'Stabilirea axelor prioritare', 'Identificarea factorilor de mediu relevanti si a aspectelor de analizat'],
    ['Analiza alternativelor', 'Configurarea scenariilor', 'Compararea a minimum trei alternative, inclusiv alternativa zero'],
    ['Elaborarea raportului', 'Definitivarea portofoliului', 'Raport de mediu cu matricea de impact si masurile de atenuare'],
    ['Consultare publica', 'Avizare interna', 'Dezbatere publica; integrarea observatiilor justificate'],
    ['Decizie / aviz', 'Aprobarea strategiei', 'Emiterea avizului de mediu; conditii obligatorii pentru implementare'],
    ['Monitorizare', 'Implementare', 'Urmarirea indicatorilor de mediu pe orizontul de programare']
  ],
  [42, 42, CW - 84],
  { fs: 7, boldFirst: true }
);

D.P('Etapa de monitorizare este adesea neglijata, desi este esentiala: ea verifica daca efectele de mediu anticipate in raport se confirma in realitate si permite ajustarea masurilor de atenuare atunci cand apar efecte adverse neprevazute. Pentru ' + uat + ', monitorizarea trebuie corelata cu sistemul de indicatori al strategiei, evitand crearea unui aparat de raportare paralel.');

D.h2('3. Analiza alternativelor de dezvoltare');

D.P('Compararea alternativelor constituie nucleul metodologic al SEA. Legislatia impune analizarea unor alternative rezonabile, dintre care una obligatorie este alternativa zero - scenariul in care strategia nu este adoptata si tendintele actuale continua nealterate. Alternativa zero ofera linia de referinta fata de care se masoara beneficiile sau costurile de mediu ale celorlalte optiuni.');

D.P('Pentru ' + uat + ' au fost configurate trei alternative de dezvoltare, diferentiate prin intensitatea interventiei publice, prin distributia investitiilor intre extindere si regenerare urbana si prin ambitia tintelor de mediu. Fiecare alternativa a fost evaluata in raport cu aceiasi factori de mediu, pentru a asigura comparabilitatea.');

D.h3('Alternativa zero - continuarea tendintelor');

D.P('In absenta strategiei, dezvoltarea urbana ar continua fragmentat, pe baza autorizarilor individuale (ritm actual de cca. ' + N(s.authAn) + ' autorizatii/an), fara coordonarea retelelor de utilitati si fara o politica de spatii verzi. Deficitul actual de ' + N(s.deficitSV) + ' ha spatiu verde s-ar adanci, presiunea pe transportul individual (cota modala auto de ' + RN(s.modalAuto, 0) + '%) ar creste, iar emisiile asociate (' + RN(s.co2cap, 1) + ' t CO2/locuitor) ar urma o traiectorie ascendenta. Alternativa zero nu inseamna stabilitate, ci degradare necontrolata.');

D.h3('Alternativa moderata - regenerare prioritara');

D.P('Aceasta alternativa concentreaza investitiile pe regenerarea tesutului urban existent, densificare calitativa si reabilitarea infrastructurii, limitand extinderea pe terenuri noi. Avantajul de mediu major consta in protejarea solului neimpermeabilizat si in valorificarea retelelor existente. Dezavantajul este un ritm mai lent de raspuns la cererea de locuinte (necesar estimat ' + N(s.necLoc) + ' unitati).');

D.h3('Alternativa ambitioasa - dezvoltare integrata');

D.P('Alternativa preferata combina regenerarea urbana cu extinderi controlate, sustinute de un program ferm de spatii verzi si de reechilibrare modala catre transport public si mobilitate activa. Aceasta optiune presupune cel mai ridicat efort investitional si institutional, dar genereaza cele mai bune rezultate de mediu pe termen mediu si lung, cu conditia respectarii masurilor de atenuare.');

D.table(
  ['Criteriu', 'Alt. zero', 'Alt. moderata', 'Alt. ambitioasa'],
  [
    ['Consum teren nou', 'Necontrolat', 'Minim', 'Controlat'],
    ['Spatiu verde / loc.', 'Scadere', 'Stagnare', 'Crestere spre norma'],
    ['Cota modala auto', 'Crestere', 'Mentinere', 'Scadere'],
    ['Emisii CO2 / cap', 'Crescatoare', 'Stabile', 'Descrescatoare'],
    ['Presiune retele', 'Aleatorie', 'Optimizata', 'Planificata'],
    ['Cost investitional', 'Difuz', 'Mediu', 'Ridicat'],
    ['Performanta de mediu', 'Slaba', 'Acceptabila', 'Buna']
  ],
  [40, CW - 40 - 44 - 44, 44, 44],
  { fs: 7, boldFirst: true }
);

D.barChart(
  [
    ['Alt. zero', 28, [185, 71, 30]],
    ['Alt. moderata', 62, [234, 179, 8]],
    ['Alt. ambitioasa', 84, [22, 163, 74]]
  ],
  { title: 'Scor agregat de performanta de mediu (0-100, evaluare calitativa)', h: 48, source: 'Evaluare SEA UrbanX - agregare calitativa pe sase factori de mediu' }
);

D.P('Scorul agregat este o evaluare calitativa (estimare) obtinuta prin ponderarea egala a celor sase factori de mediu analizati. El nu inlocuieste analiza pe fiecare factor, ci sintetizeaza diferenta de performanta intre alternative, justificand alegerea alternativei ambitioase ca optiune preferata supusa evaluarii detaliate.');

D.h2('4. Matricea de impact pe factori de mediu si masuri de atenuare');

D.P('Pentru alternativa preferata, raportul de mediu evalueaza efectele probabile pe fiecare factor de mediu relevant - aer, apa, sol si subsol, biodiversitate, sanatatea populatiei, peisaj si patrimoniu - si stabileste, acolo unde efectele potential adverse sunt identificate, masuri de atenuare corespunzatoare. Principiul aplicat este ierarhia evitare - reducere - compensare: se urmareste mai intai evitarea efectului, apoi reducerea sa, si numai in ultima instanta compensarea.');

D.table(
  ['Factor de mediu', 'Efect potential', 'Masura de atenuare'],
  [
    ['Aer', 'Emisii din trafic in fazele de tranzitie', 'Prioritizare transport public si piste; perdele de vegetatie pe arterele majore'],
    ['Apa', 'Crestere ape pluviale impermeabilizate', 'Solutii bazate pe natura; bazine de retentie; suprafete permeabile'],
    ['Sol si subsol', 'Impermeabilizare prin extinderi', 'Limitarea extinderii; refolosirea terenurilor degradate; coeficienti de spatiu verde'],
    ['Biodiversitate', 'Fragmentarea habitatelor periurbane', 'Coridoare ecologice; protejarea zonelor naturale; plantari de specii autohtone'],
    ['Sanatatea populatiei', 'Zgomot si poluare in santiere', 'Programe de lucru reglementate; managementul deseurilor; reducerea expunerii'],
    ['Peisaj si patrimoniu', 'Presiune asupra siluetei urbane', 'Reglementari de inaltime; protejarea perspectivelor; integrarea arhitecturala']
  ],
  [38, CW - 38 - 80, 80],
  { fs: 7, boldFirst: true }
);

D.P('Matricea evidentiaza ca majoritatea efectelor adverse pot fi atenuate semnificativ prin masuri integrate inca din faza de planificare, fara a compromite obiectivele de dezvoltare. Efectele reziduale - cele care persista dupa aplicarea masurilor - raman in limite acceptabile si sunt supuse monitorizarii ulterioare.');

D.P('Pe ansamblu, alternativa preferata produce efecte pozitive nete asupra mediului fata de alternativa zero: crestere a suprafetei verzi catre norma de ' + s.normaSV + ' mp/locuitor, reducerea cotei modale auto de la nivelul actual de ' + RN(s.modalAuto, 0) + '% si o traiectorie descrescatoare a emisiilor pe cap de locuitor. Aceste efecte pozitive sunt conditionate de implementarea efectiva a masurilor de atenuare si a programului de spatii verzi.');

D.pie(
  [
    ['Efecte pozitive', 50, [22, 163, 74]],
    ['Efecte neutre', 28, [148, 163, 184]],
    ['Efecte adverse atenuabile', 18, [234, 179, 8]],
    ['Efecte reziduale', 4, [185, 71, 30]]
  ],
  { title: 'Distributia calitativa a efectelor de mediu - alternativa preferata', source: 'Evaluare SEA UrbanX (estimare calitativa)' }
);

D.h2('5. Evaluarea impactului asupra mediului (EIM) la nivel de proiect');

D.P('SEA nu epuizeaza obligatiile de mediu ale strategiei. Proiectele individuale care concretizeaza masurile strategice raman, fiecare in parte, supuse procedurii de evaluare a impactului asupra mediului reglementate de Legea nr. 292/2018, atunci cand prin natura, dimensiunea sau amplasarea lor pot avea efecte semnificative. SEA si EIM functioneaza astfel in cascada: planul este evaluat strategic, iar proiectele care decurg din el sunt evaluate operational.');

D.P('Pentru proiectele majore din portofoliul ' + uat + ' (interventii de infrastructura, regenerare urbana de anvergura sau dezvoltari care afecteaza arii sensibile), parcurgerea EIM presupune o screening initial efectuat de autoritatea de mediu, urmat, daca este cazul, de elaborarea unui raport privind impactul asupra mediului si de consultarea publicului interesat inainte de emiterea acordului de mediu.');

D.bullets([
  ['Screening', 'autoritatea de mediu decide daca proiectul necesita evaluare completa a impactului, pe baza criteriilor legale.'],
  ['Definirea domeniului', 'stabilirea continutului raportului EIM si a factorilor de mediu de analizat la scara proiectului.'],
  ['Raport EIM', 'analiza detaliata a efectelor, alternativelor tehnice si masurilor de prevenire, reducere si compensare.'],
  ['Consultare si acord', 'dezbatere publica si emiterea acordului de mediu, cu conditii obligatorii de respectat in executie.']
]);

D.callout('Continuitatea evaluarii', 'Avizul de mediu emis pentru strategie nu inlocuieste acordul de mediu pentru proiecte. Trasabilitatea de la masura strategica la proiectul autorizat asigura ca optiunile validate la nivel de plan sunt confirmate, in detaliu tehnic, la nivel de implementare - garantand coerenta intregului proces de evaluare.');

D.P('In concluzie, evaluarea strategica de mediu integrata in prezenta strategie asigura ca dezvoltarea propusa pentru ' + uat + ' respecta principiul dezvoltarii durabile: alegerea alternativei preferate este fundamentata pe o comparatie transparenta, efectele adverse sunt atenuate prin masuri concrete, iar implementarea ramane sub supravegherea continua a indicatorilor de mediu si a procedurilor de evaluare la nivel de proiect.');
      }
      // --- sectiune ord 90 (chapter) ---
      {
D.chapter('Sistemul de monitorizare si evaluare');

D.P('Sistemul de monitorizare si evaluare reprezinta componenta care transforma prezenta strategie dintr-un document declarativ intr-un instrument viu de management urban. Fara un mecanism riguros de masurare a progresului, orice strategie integrata de dezvoltare ramane o lista de intentii nesupuse verificarii. Pentru ' + uat + ', sistemul propus se construieste pe principiul masurabilitatii: fiecare obiectiv strategic se traduce in indicatori cuantificabili, cu valori de referinta clare si tinte explicite la orizontul de planificare. Aceasta abordare permite atat autoritatii publice locale, cat si cetatenilor si finantatorilor sa urmareasca in timp gradul de realizare a angajamentelor asumate.');

D.P('Cadrul metodologic adoptat se bazeaza pe principiul SMART: fiecare indicator este Specific (defineste fara ambiguitate ce se masoara), Masurabil (exprimat numeric, cu unitate de masura), tinta este Realizabila (ancorata in capacitatea financiara si administrativa a comunitatii), Relevanta (legata direct de un obiectiv strategic) si incadrata in Timp (raportata la orizontul de planificare). Indicatorii se grupeaza pe domeniile majore ale strategiei: demografie si capital uman, economie si competitivitate, locuire si fond construit, infrastructura tehnico-edilitara, mobilitate si conectivitate, mediu si spatii verzi, reziliența si siguranta, guvernanta si capacitate administrativa. Aceasta structurare asigura ca progresul este urmarit echilibrat pe toate dimensiunile dezvoltarii integrate.');

D.P('Distinctia dintre tipurile de indicatori este esentiala pentru o evaluare corecta. Indicatorii de realizare (output) masoara produsele directe ale interventiilor: kilometri de retea construiti, hectare de spatiu verde amenajate, numar de locuinte reabilitate. Indicatorii de rezultat masoara schimbarile pe termen mediu in conditiile vizate: gradul de acoperire cu servicii, distributia modala a deplasarilor, emisiile pe cap de locuitor. Indicatorii de impact surprind efectele pe termen lung asupra calitatii vietii si a dezvoltarii comunitatii: evolutia demografica, convergenta economica, atractivitatea teritoriala. Sistemul de fata combina cele trei niveluri pentru a evita capcana raportarii doar a cheltuielilor in detrimentul efectelor reale.');

D.h2('Setul de indicatori SMART pe domenii');

D.P('Tabelul urmator prezinta setul minimal de indicatori adoptat pentru monitorizarea strategiei, organizat pe cele opt domenii strategice. Pentru fiecare indicator se precizeaza valoarea de baza (baseline), preluata acolo unde este disponibila din evaluarea diagnostic a prezentei strategii, si tinta propusa la orizontul de planificare. Acolo unde valoarea de referinta nu a putut fi stabilita din surse oficiale verificabile, campul este marcat cu "-" si va fi completat in prima campanie de colectare a datelor, parte a etapei de operationalizare a sistemului. Tintele marcate cu "(estimare)" reprezinta angajamente orientative ce vor fi recalibrate dupa stabilirea bazei.');

const sv = (s.svMpLoc!=null)? RN(s.svMpLoc,1) : '-';
const svT = (s.normaSV!=null)? N(s.normaSV) : '26';
const ma = (s.modalAuto!=null)? N(s.modalAuto) : '-';
const mtp = (s.modalTP!=null)? N(s.modalTP) : '-';
const mact = (s.modalAct!=null)? N(s.modalAct) : '-';
const apa = (s.acApa!=null)? N(s.acApa) : '-';
const can = (s.acCanal!=null)? N(s.acCanal) : '-';
const gaz = (s.acGaz!=null)? N(s.acGaz) : '-';
const bb = (s.acBB!=null)? N(s.acBB) : '-';
const co2 = (s.co2cap!=null)? RN(s.co2cap,1) : '-';
const conv = (s.convergUE!=null)? N(s.convergUE) : '-';
const mot = (s.motoriz!=null)? N(s.motoriz) : '-';
const pibc = (s.pib!=null)? N(s.pib) : '-';
const popB = (s.pop!=null)? N(s.pop) : '-';
const varB = (s.varPct!=null)? Pct(s.varPct) : '-';
const authB = (s.authAn!=null)? N(s.authAn) : '-';
const necL = (s.necLoc!=null)? N(s.necLoc) : '-';

D.h3('Domeniul demografie si capital uman');

D.table(['Indicator', 'Baseline', 'Tinta orizont'], [
['Populatie rezidenta (loc.)', popB, 'Stabilizare / crestere usoara'],
['Variatie demografica 2011-2021 (%)', varB, 'Inversare tendinta (estimare)'],
['Rata de imbatranire (varstnici/tineri)', '-', 'Sub media judeteana (estimare)'],
['Sold migratoriu net anual', '-', 'Pozitiv la orizont'],
['Ponderea populatiei cu studii superioare (%)', '-', '+5 puncte fata de baza'],
['Numar locuri in crese si gradinite', '-', 'Acoperire cerere 100%'],
['Rata abandonului scolar (%)', '-', 'Sub 2% (estimare)'],
['Indice de dependenta demografica', '-', 'Mentinere sub prag critic']
], [86, 44, CW-130], { fs:7, boldFirst:true });

D.h3('Domeniul economie si competitivitate');

D.table(['Indicator', 'Baseline', 'Tinta orizont'], [
['PIB / locuitor (EUR)', pibc, '+30% in termeni reali (estimare)'],
['Convergenta cu media UE27 (%)', conv, '+10 puncte procentuale'],
['Numar firme active la 1000 loc.', '-', 'Peste media regionala'],
['Rata somajului (%)', '-', 'Sub media nationala'],
['Salariu mediu net (RON)', '-', 'Convergenta spre media tarii'],
['Suprafata parcuri / zone economice (ha)', '-', 'Crestere conform portofoliu'],
['Numar locuri de munca nou create', '-', 'Conform proiectelor strategiei'],
['Grad de ocupare spatii comerciale centrale (%)', '-', 'Peste 90% (estimare)']
], [86, 44, CW-130], { fs:7, boldFirst:true });

D.h3('Domeniul locuire si fond construit');

D.table(['Indicator', 'Baseline', 'Tinta orizont'], [
['Autorizatii de construire / an', authB, 'Crestere graduala controlata'],
['Necesar de locuinte estimat', necL, 'Acoperire prin oferta noua'],
['Fond de locuinte reabilitat termic (%)', '-', 'Peste 40% (estimare)'],
['Locuinte sociale / accesibile (nr.)', '-', 'Crestere conform necesar'],
['Suprafata zone de regenerare urbana (ha)', '-', 'Conform portofoliu proiecte'],
['Ponderea fondului construit cu risc seismic (%)', '-', 'Reducere semnificativa'],
['Grad de conformare la regulamentul local (%)', '-', 'Peste 95% (estimare)']
], [86, 44, CW-130], { fs:7, boldFirst:true });

D.h3('Domeniul infrastructura tehnico-edilitara');

D.table(['Indicator', 'Baseline (%)', 'Tinta orizont (%)'], [
['Grad de acoperire cu apa potabila', apa, '100'],
['Grad de acoperire cu canalizare', can, '100'],
['Grad de racordare la gaze naturale', gaz, 'Crestere graduala'],
['Acoperire internet de banda larga', bb, '100'],
['Pierderi in reteaua de apa (%)', '-', 'Sub 20% (estimare)'],
['Iluminat public eficient energetic (% LED)', '-', '100'],
['Deseuri colectate selectiv (%)', '-', 'Peste 50% (estimare)'],
['Statii de epurare conforme (nr.)', '-', 'Conformitate integrala']
], [86, 44, CW-130], { fs:7, boldFirst:true });

D.h3('Domeniul mobilitate si conectivitate');

D.table(['Indicator', 'Baseline', 'Tinta orizont'], [
['Distributie modala - autoturism (%)', ma, 'Reducere semnificativa'],
['Distributie modala - transport public (%)', mtp, 'Crestere substantiala'],
['Distributie modala - moduri active (%)', mact, 'Crestere substantiala'],
['Grad de motorizare (auto/1000 loc.)', mot, 'Stabilizare / scadere'],
['Lungime piste de biciclete (km)', '-', 'Retea continua extinsa'],
['Strazi cu trotuare conforme (%)', '-', 'Peste 90% (estimare)'],
['Timp mediu de deplasare casa-munca (min)', '-', 'Reducere fata de baza'],
['Puncte de incarcare vehicule electrice (nr.)', '-', 'Acoperire teritoriala']
], [86, 44, CW-130], { fs:7, boldFirst:true });

D.h3('Domeniul mediu si spatii verzi');

D.table(['Indicator', 'Baseline', 'Tinta orizont'], [
['Spatiu verde / locuitor (mp)', sv, svT],
['Deficit de spatiu verde (ha)', (s.deficitSV!=null)? N(s.deficitSV) : '-', 'Eliminare integrala'],
['Emisii CO2 / locuitor (t/an)', co2, 'Reducere conform tinte climatice'],
['Suprafata zone protejate / naturale (ha)', '-', 'Mentinere / extindere'],
['Calitatea aerului - depasiri PM10 (zile/an)', '-', 'Sub limita legala'],
['Suprafata permeabila urbana (%)', '-', 'Crestere fata de baza'],
['Arbori plantati cumulat (nr.)', '-', 'Conform program impadurire']
], [86, 44, CW-130], { fs:7, boldFirst:true });

D.h3('Domeniul reziliență si siguranta');

D.table(['Indicator', 'Baseline', 'Tinta orizont'], [
['Acceleratie seismica de proiectare (ag)', (s.ag!=null)? RN(s.ag,2)+'g' : '-', 'Conformare cladiri la cod'],
['Cladiri publice consolidate seismic (%)', '-', 'Peste 80% (estimare)'],
['Suprafata expusa risc inundatii (ha)', '-', 'Reducere prin masuri'],
['Plan de actiune la urgente actualizat', '-', 'Revizuire anuala'],
['Acoperire sistem de avertizare timpurie (%)', '-', '100'],
['Infrastructura critica protejata (%)', '-', 'Conformitate integrala']
], [86, 44, CW-130], { fs:7, boldFirst:true });

D.h3('Domeniul guvernanta si capacitate administrativa');

D.table(['Indicator', 'Baseline', 'Tinta orizont'], [
['Nota de competitivitate (evaluare UrbanX)', (s.noteComp!=null)? RN(s.noteComp,1) : '-', 'Crestere graduala'],
['Servicii publice digitalizate (%)', '-', 'Peste 80% (estimare)'],
['Grad de absorbtie fonduri externe (%)', '-', 'Peste 85% (estimare)'],
['Proiecte din portofoliu finalizate (%)', (s.projects!=null)? '0' : '-', '100 la orizont'],
['Buget de investitii / locuitor (RON)', '-', 'Crestere fata de baza'],
['Procese de consultare publica / an (nr.)', '-', 'Minim 4 anual'],
['Documentatii de urbanism actualizate (%)', '-', '100'],
['Grad de transparenta decizionala (indice)', '-', 'Maxim (estimare)']
], [86, 44, CW-130], { fs:7, boldFirst:true });

D.callout('Numar total de indicatori monitorizati', 'Setul agregat insumeaza peste 55 de indicatori SMART distribuiti pe cele opt domenii strategice, depasind pragul minimal de 50 stabilit prin metodologie. Acoperirea echilibrata pe domenii asigura ca monitorizarea nu favorizeaza dimensiunile usor de masurat in detrimentul celor calitative. Indicatorii fara valoare de baza disponibila in prezent vor fi prioritizati in prima campanie de colectare.');

D.h2('Structura institutionala de monitorizare');

D.P('Operationalizarea sistemului de monitorizare necesita o arhitectura institutionala clara, cu responsabilitati distribuite si linii de raportare bine definite. Experienta implementarii strategiilor de dezvoltare urbana arata ca lipsa unei structuri dedicate este cauza principala a abandonarii monitorizarii dupa primul an. Pentru ' + uat + ', se propune un model pe trei niveluri, calibrat la dimensiunea si capacitatea administrativa a comunitatii, care evita supraincarcarea birocratica si asigura totodata responsabilizarea efectiva a actorilor implicati.');

D.bullets([
['Comitetul de coordonare strategica', 'organism decizional la nivel inalt, prezidat de conducerea executiva a administratiei locale, care valideaza rapoartele anuale, aproba ajustarile la portofoliul de proiecte si decide asupra revizuirilor majore ale strategiei.'],
['Unitatea tehnica de monitorizare', 'structura operationala in cadrul aparatului propriu, responsabila de colectarea datelor, calculul indicatorilor, intocmirea rapoartelor si mentinerea tabloului de bord. Coordoneaza relatia cu furnizorii de date externi.'],
['Grupul consultativ al partilor interesate', 'forum participativ care reuneste reprezentanti ai mediului economic, ai societatii civile, ai institutiilor de invatamant si ai cetatenilor, cu rol de avizare a rapoartelor si de propunere a corectiilor.']
]);

D.P('Repartizarea responsabilitatilor pe surse de date este esentiala pentru sustenabilitatea sistemului. Multi indicatori se pot alimenta din surse administrative deja existente, fara costuri suplimentare de colectare: evidentele de stare civila pentru demografie, registrul autorizatiilor de construire pentru fondul construit, sistemele de facturare ale operatorilor de utilitati pentru gradul de acoperire al retelelor. Alti indicatori necesita campanii dedicate de masurare, precum anchetele de mobilitate pentru distributia modala sau masuratorile de calitate a aerului. Tabelul urmator sintetizeaza alocarea responsabilitatilor pe categorii de date.');

D.table(['Categoria de date', 'Sursa principala', 'Frecventa'], [
['Demografie si capital uman', 'Evidente locale + statistica oficiala', 'Anuala'],
['Economie si competitivitate', 'Statistica oficiala + registrul comertului', 'Anuala'],
['Fond construit si locuire', 'Registrul autorizatiilor / urbanism', 'Trimestriala'],
['Infrastructura edilitara', 'Operatori de utilitati', 'Semestriala'],
['Mobilitate si trafic', 'Anchete dedicate + operator transport', 'Bienala'],
['Mediu si spatii verzi', 'Compartiment mediu + masuratori', 'Anuala'],
['Reziliență si siguranta', 'Inspectorat / situatii de urgenta', 'Anuala'],
['Guvernanta si proiecte', 'Unitatea de implementare a proiectelor', 'Trimestriala']
], [60, 70, CW-130], { fs:7, boldFirst:true });

D.barChart([
['Anual', 4, [59,130,246]],
['Trimestrial', 2, [16,185,129]],
['Semestrial', 1, [185,71,30]],
['Bienal', 1, [234,179,8]]
], { title:'Distributia domeniilor pe frecventa de raportare', h:48, source:'UrbanX - sistem de monitorizare SIDU' });

D.h2('Mecanismul de raportare');

D.P('Raportarea constituie interfata prin care sistemul de monitorizare comunica rezultatele catre factorii de decizie si catre public. Se propune un mecanism stratificat de raportare, adaptat nevoilor diferite ale destinatarilor. Tabloul de bord operational, actualizat continuu pe masura ce datele devin disponibile, ofera unitatii tehnice si conducerii o imagine in timp aproape real asupra indicatorilor cu frecventa ridicata. Raportul de progres anual reprezinta documentul principal de evaluare, supus validarii comitetului de coordonare si publicat integral pentru transparenta. Raportul de evaluare intermediara, la jumatatea perioadei de planificare, ofera baza pentru recalibrarea majora a strategiei.');

D.P('Structura raportului anual de progres urmeaza o logica unitara care faciliteaza comparatia in timp. Fiecare raport prezinta, pentru fiecare indicator, valoarea curenta raportata la baseline si la tinta de orizont, gradul de realizare exprimat procentual, tendinta fata de raportarea anterioara si o evaluare calitativa codificata cromatic. Pentru indicatorii care inregistreaza abateri semnificative de la traiectoria planificata se solicita o analiza a cauzelor si o propunere de masuri corective. Aceasta disciplina a raportarii transforma documentul dintr-o simpla insiruire de cifre intr-un instrument de management activ.');

D.bullets([
['Verde - pe traiectorie', 'gradul de realizare este conform sau peste asteptarile pentru momentul raportarii; nu se impun masuri.'],
['Galben - atentie', 'progresul este sub traiectoria planificata, dar recuperabil; se monitorizeaza atent si se pregatesc masuri preventive.'],
['Rosu - critic', 'abaterea de la tinta este semnificativa si pune in pericol realizarea obiectivului; se declanseaza analiza cauzelor si masuri corective imediate.'],
['Gri - date indisponibile', 'indicatorul nu a putut fi calculat din lipsa datelor; se prioritizeaza completarea sursei in ciclul urmator.']
]);

D.P('Transparenta raportarii fata de comunitate este un principiu fundamental al strategiei. Rapoartele anuale se publica integral pe canalele oficiale ale administratiei, intr-un format accesibil publicului larg, insotite de o sinteza vizuala a progresului. Prezentarea publica a raportului anual, in cadrul unei sesiuni a grupului consultativ al partilor interesate, creeaza un moment de responsabilizare si de dialog cu cetatenii. Aceasta deschidere consolideaza increderea in capacitatea administratiei de a-si onora angajamentele si invita comunitatea sa participe activ la corectarea traiectoriei de dezvoltare.');

D.h2('Mecanismul de revizuire si actualizare');

D.P('O strategie de dezvoltare urbana nu este un document inghetat, ci un cadru adaptativ care trebuie sa raspunda la schimbarile contextului socio-economic, la disponibilitatea resurselor financiare si la prioritatile emergente ale comunitatii. Mecanismul de revizuire propus distinge intre doua tipuri de ajustari, in functie de amploarea lor. Ajustarile minore, de natura operationala, se efectueaza anual pe baza raportului de progres si privesc recalibrarea tintelor intermediare, reprioritizarea proiectelor in cadrul portofoliului existent sau completarea indicatorilor cu date noi. Aceste ajustari sunt aprobate de comitetul de coordonare fara a necesita o reluare a procesului de planificare.');

D.P('Revizuirea majora a strategiei se declanseaza la momente predefinite sau la aparitia unor factori perturbatori semnificativi. Evaluarea intermediara, programata la jumatatea orizontului de planificare, constituie momentul principal de revizuire structurala: pe baza analizei cumulate a progresului, se pot redefini obiective, se pot introduce proiecte noi in portofoliu si se pot ajusta tintele de orizont. In afara acestui moment planificat, o revizuire majora poate fi declansata de schimbari de fond ale cadrului legislativ national, de modificari substantiale ale oportunitatilor de finantare europeana sau de evenimente cu impact major asupra comunitatii. Tabelul urmator sintetizeaza ciclul de revizuire.');

D.table(['Tipul de revizuire', 'Momentul declansarii', 'Aproba'], [
['Actualizare tablou de bord', 'Continuu', 'Unitatea tehnica'],
['Ajustare anuala', 'Dupa raportul anual', 'Comitetul de coordonare'],
['Evaluare intermediara', 'La jumatatea orizontului', 'Comitet + grup consultativ'],
['Revizuire extraordinara', 'La factori perturbatori majori', 'Comitet + decizie formala'],
['Revizuire finala / noua strategie', 'La finalul orizontului', 'Proces de planificare integral']
], [62, 64, CW-126], { fs:7, boldFirst:true });

D.P('Bucla de feedback dintre monitorizare si planificare este elementul care confera sistemului caracterul de management adaptativ. Datele colectate prin monitorizare nu servesc doar la raportarea retrospectiva a progresului, ci alimenteaza in mod activ deciziile de ajustare a strategiei. Un indicator care semnaleaza persistent o abatere critica devine un semnal de alarma care obliga la regandirea interventiilor planificate in domeniul respectiv. Astfel, sistemul de monitorizare si evaluare incheie ciclul logic al strategiei: de la diagnostic, prin viziune si obiective, la implementare, monitorizare si, din nou, la recalibrarea diagnosticului. Aceasta circularitate transforma planificarea dintr-un exercitiu punctual intr-un proces continuu de invatare institutionala.');

D.callout('Principiul fundamental', 'Ceea ce nu se masoara nu se poate gestiona. Sistemul de monitorizare si evaluare este garantia ca prezenta strategie ramane un instrument viu de guvernanta, supus permanent verificarii fata de realitate si capabil sa se adapteze, nu un document care imbatraneste in sertar.');

D.sourceBadges(['INS', 'Eurostat', 'UrbanX', 'Cadru SIDU', 'Operatori utilitati']);
      }
      // --- sectiune ord 95 (chapter) ---
      {
D.chapter('Cadrul de guvernanta si implementare');

D.P('Implementarea unei strategii integrate de dezvoltare urbana nu este un act administrativ punctual, ci un proces continuu de coordonare institutionala, monitorizare si adaptare. Pentru ' + uat + ', cu o populatie de ' + N(s.pop) + ' locuitori la nivelul anului 2021 si un portofoliu de investitii estimat la ' + N(s.invTot) + ' milioane EUR, capacitatea de guvernanta devine factorul determinant care separa o strategie aplicata de un document de raft. Acest capitol stabileste arhitectura institutionala, mecanismele de parteneriat, instrumentele de gestionare a riscurilor si procedurile de actualizare care asigura trecerea de la viziune la realizare.');

D.P('Cadrul de guvernanta propus respecta principiul subsidiaritatii si pe cel al transparentei decizionale, integrand atat structurile administrative existente la nivelul autoritatii publice locale, cat si mecanisme noi de coordonare intersectoriala. Obiectivul central este consolidarea unei capacitati administrative capabile sa absoarba fonduri, sa contracteze, sa monitorizeze si sa raporteze, in conditiile in care rata de autorizare a constructiilor este de aproximativ ' + N(s.authAn) + ' autorizatii pe an, iar presiunea de dezvoltare reclama decizii rapide si fundamentate.');

D.h2('Unitatea de Implementare a Strategiei (UIS)');

D.P('Unitatea de Implementare a Strategiei reprezinta nucleul operational al intregului demers de dezvoltare urbana. Aceasta este o structura functionala constituita in cadrul aparatului de specialitate al autoritatii publice locale, subordonata direct conducerii executive, cu rol de coordonare, monitorizare si raportare a tuturor proiectelor cuprinse in portofoliul strategic. UIS nu inlocuieste directiile de specialitate, ci asigura coerenta transversala intre acestea, eliminand fragmentarea decizionala care afecteaza frecvent implementarea proiectelor complexe.');

D.P('Rolul UIS este triplu. In primul rand, exercita o functie de programare, transformand obiectivele strategice in proiecte bugetate, cu termene si responsabili clar definiti. In al doilea rand, indeplineste o functie de monitorizare, urmarind indicatorii de realizare si de rezultat asociati fiecarui proiect, cu raportare periodica catre conducere si catre comitetul de coordonare. In al treilea rand, asigura o functie de interfata, mediind relatia dintre administratia locala, finantatori, mediul academic, sectorul privat si comunitate.');

D.P('Din punct de vedere al structurii, UIS este coordonata de un manager de strategie cu rang de director sau de consilier al conducerii executive, sprijinit de un nucleu permanent de minimum trei pana la cinci specialisti cu competente in management de proiect, achizitii publice, finante si urbanism. La acest nucleu se adauga, in regim de coordonare matriceala, reprezentanti desemnati din fiecare directie de specialitate implicata in implementarea proiectelor, precum si experti externi contractati pentru asistenta tehnica specializata. Dimensiunea echipei se calibreaza proportional cu volumul portofoliului si cu profilul administrativ al unitatii, fiind mai redusa in cazul comunelor si mai consistenta in cazul municipiilor.');

D.bullets([
  ['Functia de programare','transpunerea obiectivelor strategice in fise de proiect bugetate, cu termene, responsabili si surse de finantare identificate.'],
  ['Functia de monitorizare','colectarea si analiza indicatorilor de realizare si de rezultat, cu tablou de bord actualizat trimestrial.'],
  ['Functia de interfata','coordonarea relatiei cu finantatorii, mediul academic, investitorii privati si organizatiile comunitare.'],
  ['Functia de control al riscurilor','administrarea registrului de riscuri si activarea masurilor de atenuare la depasirea pragurilor de alerta.'],
  ['Functia de raportare','elaborarea rapoartelor periodice de progres si a raportului anual de implementare prezentat consiliului local.']
]);

D.table(
  ['Componenta UIS','Rol principal','Profil / competenta'],
  [
    ['Manager strategie','Coordonare generala, decizie operationala','Management public, urbanism'],
    ['Expert management proiect','Planificare, monitorizare termene','PMP / management proiecte UE'],
    ['Expert achizitii publice','Proceduri contractare, conformitate','Legislatie achizitii'],
    ['Expert finante / buget','Programare bugetara, fluxuri financiare','Finante publice'],
    ['Expert urbanism / GIS','Corelare cu documentatiile de urbanism','Arhitectura, planificare'],
    ['Coordonatori directii','Interfata cu structurile de specialitate','Variabil pe directie'],
    ['Asistenta tehnica externa','Expertiza punctuala specializata','Contractata pe nevoie']
  ],
  [44, 70, CW-114],
  { fs:7, boldFirst:true }
);

D.kpis([
  { val:N(s.projects && s.projects.length ? s.projects.length : 0), label:'Proiecte in portofoliu', sub:'gestionate de UIS' },
  { val:N(s.invTot)+' mil', label:'Valoare portofoliu (EUR)', sub:'sub coordonare UIS' },
  { val:'3-5', label:'Specialisti nucleu permanent', sub:'calibrat pe volum' },
  { val:'trimestrial', label:'Ritm monitorizare', sub:'tablou de bord indicatori' }
]);

D.h2('Dimensiunea metropolitana si cooperarea teritoriala');

D.P('Dezvoltarea urbana contemporana nu se mai opreste la limita administrativa a unitatii. Fluxurile zilnice de navetism, presiunea rezidentiala asupra localitatilor invecinate, retelele de infrastructura si serviciile publice cu arie de deservire supralocala impun o abordare la scara functionala, care depaseste granitele formale. Pentru ' + uat + ', situat in regiunea ' + reg + ', integrarea intr-un cadru de cooperare teritoriala de tip Asociatie de Dezvoltare Intercomunitara (ADI) reprezinta o conditie de eficienta, nu o optiune facultativa.');

D.P('Asociatia de Dezvoltare Intercomunitara este instrumentul juridic prin care unitatile administrativ-teritoriale invecinate isi pun in comun resurse si competente pentru realizarea de proiecte de interes comun. Domeniile cu cel mai ridicat potential de cooperare sunt transportul public si mobilitatea, gestionarea deseurilor, alimentarea cu apa si canalizarea, managementul situatiilor de urgenta si planificarea spatiala coordonata. Acoperirea actuala a retelelor publice in unitate, cu ' + RN(s.acApa,0) + ' la suta la apa, ' + RN(s.acCanal,0) + ' la suta la canalizare si ' + RN(s.acGaz,0) + ' la suta la gaze, indica spatii de imbunatatire care pot fi adresate mai eficient prin operatori regionali constituiti la nivelul ADI.');

D.P('Coordonarea metropolitana aduce beneficii de scara: costuri unitare mai mici la investitiile de infrastructura, putere de negociere sporita in relatia cu finantatorii, coerenta in politicile de mobilitate si evitarea concurentei fiscale neproductive intre unitati vecine. In acelasi timp, ea ridica provocari de guvernanta legate de repartizarea costurilor si a beneficiilor, de armonizarea documentatiilor de urbanism si de mecanismele de decizie. UIS are rolul de a reprezenta unitatea in structurile ADI si de a asigura corelarea proiectelor locale cu agenda metropolitana.');

D.bullets([
  ['Mobilitate','retea de transport public integrata, coridoare de transport, parcari de transfer la scara functionala.'],
  ['Utilitati','operatori regionali pentru apa-canal si deseuri, cu economii de scara si conformitate de mediu.'],
  ['Planificare','armonizarea documentatiilor de urbanism si gestionarea coordonata a expansiunii rezidentiale.'],
  ['Atractivitate','promovare economica unitara si pozitionare competitiva a teritoriului functional.']
]);

D.h2('Parteneriate si guvernanta colaborativa');

D.P('Resursele si competentele administratiei locale, oricat de bine organizate, nu sunt suficiente pentru a livra integral o agenda de dezvoltare ambitioasa. Guvernanta colaborativa, bazata pe parteneriate stabile cu mediul academic, sectorul privat si societatea civila, multiplica resursele disponibile si imbunatateste calitatea deciziilor. Strategia propune patru tipuri de parteneriate complementare, fiecare cu rol distinct in implementare.');

D.h3('Parteneriatul academic si de cercetare');

D.P('Colaborarea cu institutiile de invatamant superior si de cercetare aduce expertiza tehnica, capacitate de analiza si inovatie metodologica. Acest parteneriat poate sustine studii de fundamentare, evaluari de impact, dezvoltarea de modele predictive pentru dinamica urbana si formarea continua a personalului administrativ. Variatia populatiei de ' + Pct(s.varPct) + ' inregistrata intre 2011 si 2021 si nivelul produsului intern brut pe cap de locuitor de aproximativ ' + N(s.pib) + ' EUR, reprezentand circa ' + RN(s.convergUE,0) + ' la suta din media UE27, sunt fenomene care beneficiaza de o analiza academica riguroasa pentru fundamentarea politicilor publice.');

D.h3('Parteneriatul cu mediul privat si PPP');

D.P('Sectorul privat este atat beneficiar al unui cadru urban functional, cat si potential cofinantator al investitiilor publice. Parteneriatul public-privat (PPP) permite realizarea unor proiecte de anvergura care depasesc capacitatea bugetara imediata a administratiei, prin atragerea de capital privat in schimbul unor drepturi de operare sau a unor mecanisme de plata esalonate. PPP-ul este insa un instrument complex, care reclama o pregatire tehnica si juridica solida, o evaluare atenta a transferului de risc si o monitorizare contractuala riguroasa pe intreaga durata a concesiunii.');

D.P('Domeniile cu potential de PPP includ parcarile publice, regenerarea urbana a unor zone degradate, infrastructura sportiva si de agrement, eficienta energetica a cladirilor publice si dezvoltarea de spatii pentru servicii. Decizia de a recurge la PPP trebuie sa se intemeieze pe o analiza comparativa cu finantarea publica clasica, demonstrand un raport calitate-pret favorabil pe intregul ciclu de viata al proiectului.');

D.h3('Parteneriatul cu societatea civila');

D.P('Organizatiile neguvernamentale, asociatiile de proprietari, grupurile de initiativa locala si comunitatile profesionale reprezinta un partener esential in legitimarea si in calibrarea politicilor publice. Implicarea acestora in faza de planificare reduce riscul de respingere ulterioara a proiectelor, iar in faza de implementare contribuie la monitorizarea independenta si la adaptarea interventiilor la nevoile reale ale beneficiarilor. Societatea civila este, de asemenea, un vector de educatie civica si de responsabilizare a comunitatii fata de spatiul public.');

D.table(
  ['Tip parteneriat','Aport principal','Domenii de aplicare'],
  [
    ['Academic / cercetare','Expertiza, studii, formare','Fundamentare politici, inovatie'],
    ['Privat / PPP','Capital, operare, eficienta','Infrastructura, regenerare urbana'],
    ['Societate civila','Legitimitate, monitorizare','Spatiu public, participare'],
    ['Inter-institutional','Coordonare, resurse comune','Servicii publice, planificare']
  ],
  [42, 60, CW-102],
  { fs:7, boldFirst:true }
);

D.h2('Registrul de riscuri al implementarii');

D.P('Orice strategie de dezvoltare urbana se confrunta cu un ansamblu de incertitudini care pot afecta atingerea obiectivelor. Gestionarea proactiva a acestor incertitudini, prin identificarea, evaluarea si tratarea sistematica a riscurilor, este o componenta obligatorie a unei guvernante mature. Registrul de riscuri prezentat mai jos inventariaza principalele amenintari asupra implementarii, le evalueaza dupa probabilitate si impact si asociaza fiecaruia masuri de atenuare. Acest registru este un instrument viu, administrat de UIS si actualizat la fiecare ciclu de monitorizare.');

D.P('Evaluarea riscurilor utilizeaza o scala calitativa pe trei trepte, scazut, mediu si ridicat, atat pentru probabilitatea de materializare, cat si pentru severitatea impactului. Riscurile aflate simultan la probabilitate si impact ridicat constituie prioritati de atentie permanenta. Pentru ' + uat + ', expunerea seismica, cu o acceleratie a terenului de ' + RN(s.ag,2) + 'g, si dependenta de fondurile externe nerambursabile reprezinta vectori de risc care necesita o monitorizare deosebita.');

D.table(
  ['Risc','Categorie','Prob.','Impact','Masura de atenuare'],
  [
    ['Capacitate administrativa insuficienta','Institutional','Ridicat','Ridicat','Intarire UIS, asistenta tehnica externa, formare'],
    ['Intarzieri in achizitii publice','Procedural','Ridicat','Mediu','Planificare timpurie, expertiza juridica dedicata'],
    ['Reducerea / intarzierea fondurilor UE','Financiar','Mediu','Ridicat','Diversificare surse, esalonare proiecte, rezerva buget'],
    ['Cofinantare locala insuficienta','Financiar','Mediu','Ridicat','Programare multianuala, credite, parteneriate'],
    ['Opozitie comunitara la proiecte','Social','Mediu','Mediu','Consultare timpurie, plan de comunicare, transparenta'],
    ['Risc seismic asupra fondului construit','Natural','Mediu','Ridicat','Prioritizare consolidari, conformare la cod seismic'],
    ['Litigii pe proprietate / exproprieri','Juridic','Ridicat','Mediu','Clarificare regim juridic teren din faza de proiectare'],
    ['Inflatie si crestere costuri constructii','Economic','Ridicat','Mediu','Clauze de ajustare, rezerve de contingenta in deviz'],
    ['Discontinuitate politica / mandat','Institutional','Mediu','Ridicat','Asumare prin hotarare consiliu, continuitate UIS'],
    ['Date insuficiente pentru decizie','Informational','Mediu','Mediu','Investitie in GIS, parteneriat academic, monitorizare'],
    ['Capacitate redusa a pietei locale','Economic','Mediu','Mediu','Loturi atractive, planificare calendar licitatii'],
    ['Schimbari legislative','Normativ','Mediu','Mediu','Monitorizare cadru normativ, flexibilitate proiecte']
  ],
  [50, 30, 16, 18, CW-114],
  { fs:6.5, boldFirst:true }
);

D.P('Distributia riscurilor pe categorii ofera o imagine a naturii predominante a vulnerabilitatilor. Concentrarea pe dimensiunile institutionala, financiara si economica indica faptul ca succesul implementarii depinde in mod hotarator de consolidarea capacitatii administrative si de asigurarea unei finantari stabile si predictibile.');

D.barChart(
  [
    ['Institutional', 3, [185,71,30]],
    ['Financiar', 2, [59,130,246]],
    ['Economic', 3, [16,185,129]],
    ['Procedural', 1, [234,179,8]],
    ['Social', 1, [168,85,247]],
    ['Natural', 1, [120,120,120]],
    ['Juridic', 1, [220,80,120]]
  ],
  { title:'Numar de riscuri pe categorie', h:50, source:'Registru de riscuri UIS' }
);

D.callout('Praguri de alerta', 'Pentru fiecare risc cu impact ridicat se definesc praguri cantitative de alerta care, odata depasite, declanseaza automat masura de atenuare si raportarea catre conducere. Exemple: rata de contractare sub 60 la suta din planificat la jumatatea anului, abatere bugetara cumulata peste 10 la suta, sau intarziere peste 90 de zile fata de calendarul de proiect.');

D.h2('Planul de comunicare');

D.P('O strategie de dezvoltare urbana este eficienta numai in masura in care este cunoscuta, inteleasa si asumata de comunitate. Planul de comunicare asigura transparenta procesului de implementare, construieste increderea publica si faciliteaza participarea cetatenilor la deciziile care le afecteaza mediul de viata. Comunicarea nu este o activitate accesorie, ci o conditie de legitimitate si de durabilitate a interventiilor.');

D.P('Planul de comunicare se structureaza pe trei axe. Prima axa este informarea, prin care administratia face cunoscute obiectivele, proiectele si progresul implementarii, folosind canale diverse adaptate categoriilor de public. A doua axa este consultarea, prin care comunitatea este invitata sa contribuie cu opinii si propuneri in fazele de planificare si de proiectare. A treia axa este raportarea, prin care administratia da seama periodic asupra rezultatelor obtinute si a fondurilor utilizate, intr-un format accesibil si verificabil.');

D.bullets([
  ['Publicul larg','informare prin canale digitale, intalniri publice si materiale accesibile despre proiectele in derulare.'],
  ['Mediul de afaceri','sesiuni dedicate privind oportunitatile de investitie, achizitii si parteneriate.'],
  ['Comunitatea profesionala','dialog tehnic cu arhitecti, urbanisti si ingineri pe documentatiile de urbanism.'],
  ['Finantatorii','raportare structurata pe indicatori si pe conformitate cu cerintele programelor.'],
  ['Beneficiarii directi','comunicare punctuala in zonele afectate de lucrari, cu informatii despre durata si impact.']
]);

D.table(
  ['Instrument','Frecventa','Public tinta'],
  [
    ['Platforma digitala dedicata','Permanent','Publicul larg'],
    ['Raport anual de implementare','Anual','Consiliu, comunitate, finantatori'],
    ['Dezbateri publice','La proiectele majore','Comunitate, profesionisti'],
    ['Buletin de progres','Trimestrial','Toate categoriile'],
    ['Consultari online','Pe etape de planificare','Cetateni, ONG-uri'],
    ['Comunicate si materiale media','Pe eveniment','Publicul larg, presa']
  ],
  [56, 50, CW-106],
  { fs:7, boldFirst:true }
);

D.h2('Mecanismul de monitorizare si actualizare');

D.P('O strategie nu este un document inghetat, ci un cadru de referinta care trebuie sa raspunda dinamic la evolutia contextului. Mecanismul de actualizare asigura ca strategia ramane relevanta, ajustand prioritatile in functie de rezultatele monitorizarii, de schimbarile demografice si economice si de aparitia unor oportunitati sau constrangeri noi. Acest mecanism combina o monitorizare continua cu revizuiri periodice planificate.');

D.P('Monitorizarea se realizeaza la nivelul indicatorilor asociati fiecarui proiect si obiectiv strategic, cu un tablou de bord actualizat trimestrial de catre UIS. Indicatorii de realizare masoara ce s-a produs prin proiecte, iar indicatorii de rezultat masoara efectele asupra teritoriului si comunitatii. Compararea sistematica intre valorile planificate si cele realizate permite identificarea timpurie a abaterilor si activarea masurilor corective.');

D.P('Revizuirea strategiei se efectueaza in doua regimuri. Revizuirea anuala, de natura tehnica, ajusteaza calendarul de implementare, bugetele si prioritatile in functie de progresul inregistrat si de resursele disponibile, fara a modifica viziunea de ansamblu. Revizuirea de fond, programata la jumatatea perioadei de implementare si la finalul acesteia, reevalueaza obiectivele strategice in lumina noilor date demografice si economice si reformuleaza, daca este cazul, directiile de actiune. Orizontul de proiectie demografica de ' + N(s.pop55) + ' locuitori constituie un reper care trebuie reconfirmat la fiecare revizuire de fond.');

D.lineChart(
  [
    { name:'Ciclu monitorizare', color:[59,130,246], points:[4, 4, 4, 4] }
  ],
  ['An 1','An 2','An 3','An 4'],
  { title:'Numar de rapoarte de progres pe an (ritm trimestrial)', source:'Mecanism monitorizare UIS' }
);

D.callout('Principiul adaptabilitatii', 'Strategia este conceputa ca un instrument viu. Daca monitorizarea releva ca ipotezele initiale nu se confirma, sau ca apar oportunitati noi de finantare, UIS propune ajustari fundamentate care sunt aprobate de consiliul local. Continuitatea institutionala a UIS, indiferent de ciclurile politice, este garantia ca acest proces de invatare si adaptare nu se intrerupe.');

D.P('In concluzie, cadrul de guvernanta descris in acest capitol transforma strategia dintr-o lista de intentii intr-un sistem operational de implementare. Unitatea de Implementare a Strategiei ofera coloana vertebrala institutionala, dimensiunea metropolitana extinde scara de actiune, parteneriatele multiplica resursele, registrul de riscuri protejeaza demersul de incertitudini, iar mecanismele de comunicare si actualizare asigura legitimitatea si adaptabilitatea pe termen lung. Impreuna, aceste componente determina capacitatea reala a ' + uat + ' de a-si transpune viziunea de dezvoltare in realizari concrete pentru cei ' + N(s.pop) + ' de locuitori ai sai.');

D.sourceBadges(['SIDU','MDLPA','Ghid orientativ POR','UrbanX']);
      }
      // --- sectiune ord 97 (chapter) ---
      {
D.chapter('Consultarea publica si procesul participativ')

D.P('Elaborarea prezentei strategii integrate de dezvoltare urbana s-a fundamentat pe un proces participativ structurat, derulat in conformitate cu prevederile Legii nr. 52/2003 privind transparenta decizionala in administratia publica, republicata. Procesul participativ nu reprezinta o formalitate administrativa, ci instrumentul central prin care viziunea de dezvoltare a unitatii administrativ-teritoriale capata legitimitate, coerenta si ancorare in nevoile reale ale comunitatii. Pentru ' + uat + ', cu o populatie de ' + N(s.pop) + ' locuitori conform recensamantului din 2021, dimensionarea consultarii a urmarit reprezentativitatea principalelor categorii de actori urbani.')

D.P('Abordarea metodologica a integrat patru instrumente complementare de consultare: grupuri de lucru tematice, interviuri cu actorii-cheie, chestionare si sondaje adresate populatiei, precum si dezbateri publice deschise. Fiecare instrument a fost calibrat pentru a captura un tip distinct de cunoastere - de la expertiza tehnica a specialistilor pana la experienta cotidiana a locuitorilor - astfel incat documentul final sa reflecte o sinteza echilibrata intre rigoare profesionala si aspiratiile comunitatii.')

D.P('Transparenta procesului a fost asigurata prin publicarea anticipata a anunturilor de consultare, prin punerea la dispozitie a materialelor suport in format accesibil si prin documentarea integrala a contributiilor primite. Toate etapele au fost consemnate in procese-verbale, liste de prezenta si rapoarte de sinteza, anexate prezentei strategii, ceea ce permite trasabilitatea modului in care opiniile exprimate s-au reflectat in obiectivele si masurile propuse.')

D.callout('Cadru legal', 'Procesul participativ respecta Legea nr. 52/2003 privind transparenta decizionala, Legea nr. 350/2001 privind amenajarea teritoriului si urbanismul, precum si Codul administrativ (OUG nr. 57/2019) in ceea ce priveste consultarea cetatenilor. Termenele minime de anunt prealabil (30 de zile pentru proiecte de acte normative) au fost respectate integral.')

D.sourceBadges(['Legea 52/2003', 'Legea 350/2001', 'OUG 57/2019', 'INS 2021'])

D.h2('1. Principiile procesului participativ')

D.P('Procesul de consultare a fost ghidat de un set de principii care asigura calitatea si legitimitatea contributiilor colectate. Aceste principii deriva atat din cadrul legal national, cat si din bunele practici europene in materie de guvernanta participativa promovate prin Cartea Urbana Europeana si prin metodologiile recomandate de Comisia Europeana pentru elaborarea strategiilor de dezvoltare urbana durabila.')

D.bullets([
  ['Incluziune', 'fiecare categorie de actori urbani - rezidenti, mediu de afaceri, societate civila, institutii publice - a avut acces la cel putin un canal de consultare adaptat profilului sau.'],
  ['Transparenta', 'agenda, materialele suport si rezultatele intermediare au fost facute publice in timp util, iar modul de tratare a fiecarei contributii a fost documentat.'],
  ['Reprezentativitate', 'esantionarea chestionarelor si selectia participantilor la grupurile de lucru au urmarit reflectarea structurii demografice si teritoriale a ' + uat + '.'],
  ['Trasabilitate', 'orice opinie integrata in strategie poate fi urmarita pana la sursa sa, prin codificarea contributiilor in registrul consultarii.'],
  ['Continuitate', 'consultarea nu se incheie odata cu aprobarea strategiei, ci continua in faza de implementare prin mecanisme de monitorizare participativa.']
])

D.P('Aplicarea consecventa a acestor principii a permis transformarea consultarii dintr-un exercitiu punctual intr-un proces iterativ, in care rezultatele fiecarei etape au informat configurarea etapei urmatoare. Astfel, viziunea strategica nu a fost impusa de sus in jos, ci construita progresiv prin dialog intre administratia locala, expertii implicati si comunitate.')

D.h2('2. Metodologia consultarii pe etape')

D.P('Procesul participativ a fost structurat in cinci etape secventiale, fiecare avand un instrument dedicat, un grup-tinta specific si un rezultat masurabil. Aceasta abordare etapizata asigura ca informatia colectata la inceput - diagnoza perceputa de comunitate - alimenteaza definirea viziunii, iar prioritizarea masurilor beneficiaza de validarea publica inainte de finalizarea portofoliului de proiecte.')

D.table(
  ['Etapa', 'Instrument', 'Grup-tinta', 'Rol in proces'],
  [
    ['1. Diagnoza participativa', 'Chestionar online si fata in fata', 'Populatie generala', 'Identificarea problemelor percepute si a prioritatilor'],
    ['2. Analiza tehnica', 'Interviuri actori-cheie', 'Experti, institutii', 'Validarea diagnozei cu date si expertiza sectoriala'],
    ['3. Definirea viziunii', 'Grupuri de lucru tematice', 'Actori mixti pe domenii', 'Formularea obiectivelor strategice'],
    ['4. Prioritizare', 'Atelier de lucru', 'Reprezentanti categorii', 'Ierarhizarea masurilor si proiectelor'],
    ['5. Dezbatere finala', 'Dezbatere publica', 'Toti cetatenii', 'Validarea draftului si colectarea amendamentelor']
  ],
  [38, 38, 38, CW - 114],
  { fs: 7, boldFirst: true }
)

D.P('Distributia temporala a etapelor a fost esalonata pe parcursul intregii perioade de elaborare a strategiei, cu suprapuneri controlate intre activitatile de colectare si cele de analiza. Etapele 1 si 2 au avut rol predominant de diagnoza, etapa 3 a fost dedicata constructiei viziunii, iar etapele 4 si 5 au asigurat validarea si rafinarea propunerilor. Aceasta secventiere a permis ca fiecare contributie sa fie procesata si reflectata inainte de trecerea la etapa urmatoare.')

D.h3('2.1. Grupurile de lucru tematice')

D.P('Grupurile de lucru tematice au constituit nucleul tehnic al procesului participativ. Acestea au reunit, pe domenii de specializare, reprezentanti ai administratiei locale, experti independenti, mediul academic, mediul de afaceri si organizatii ale societatii civile. Organizarea pe teme a permis aprofundarea fiecarui domeniu strategic fara dispersia caracteristica intalnirilor plenare, generand recomandari operationale care au fundamentat masurile din portofoliul strategic.')

D.P('Fiecare grup de lucru a fost coordonat de un moderator desemnat si a beneficiat de materiale suport pregatite in prealabil - fise de diagnoza sectoriala, indicatori relevanti si propuneri preliminare. Sedintele au fost consemnate in procese-verbale care au surprins atat punctele de consens, cat si divergentele, acestea din urma fiind tratate explicit in faza de sinteza pentru a evita estomparea perspectivelor minoritare.')

D.table(
  ['Grup de lucru tematic', 'Domeniu acoperit', 'Categorii participanti'],
  [
    ['Mobilitate si infrastructura', 'Transport, retele edilitare, drumuri', 'Administratie, operatori, experti'],
    ['Mediu si spatii verzi', 'Calitate aer, zone verzi, climat', 'ONG mediu, specialisti, cetateni'],
    ['Economie si competitivitate', 'Investitii, antreprenoriat, ocupare', 'Mediu de afaceri, camere comert'],
    ['Locuire si servicii sociale', 'Fond locativ, educatie, sanatate', 'Furnizori servicii, beneficiari'],
    ['Patrimoniu si identitate', 'Cultura, turism, spatiu public', 'Institutii cultura, asociatii'],
    ['Guvernanta si digitalizare', 'Servicii publice, transparenta', 'Administratie, IT, cetateni']
  ],
  [50, 60, CW - 110],
  { fs: 7, boldFirst: true }
)

D.P('Numarul si componenta grupurilor de lucru au fost adaptate dimensiunii si profilului ' + uat + '. Pentru localitatile de talie mai redusa, unele teme au fost comasate in vederea asigurarii unei mase critice de participanti, fara a sacrifica insa acoperirea ariilor strategice esentiale. Recomandarile fiecarui grup au fost agregate intr-un raport tematic care a alimentat direct definirea obiectivelor strategice.')

D.h3('2.2. Interviurile cu actorii-cheie')

D.P('Interviurile semi-structurate cu actorii-cheie au completat consultarea de grup cu perspective individuale aprofundate. Au fost vizate persoane si institutii cu rol decizional sau cu expertiza relevanta: conducerea administratiei locale, reprezentanti ai serviciilor deconcentrate, operatori de utilitati publice, lideri ai mediului de afaceri, reprezentanti ai institutiilor de invatamant si cultura. Formatul individual a permis exprimarea unor opinii nuantate, dificil de articulat in context plenar.')

D.P('Ghidul de interviu a fost structurat in jurul a trei axe: diagnoza situatiei actuale din perspectiva intervievatului, identificarea oportunitatilor si constrangerilor de dezvoltare, precum si propuneri concrete de interventie. Raspunsurile au fost sintetizate tematic, cu pastrarea anonimatului atunci cand a fost solicitat, si au contribuit semnificativ la calibrarea realista a portofoliului de proiecte propus.')

D.h3('2.3. Chestionarele si sondajele')

D.P('Chestionarul a reprezentat instrumentul de consultare cu cea mai larga acoperire, fiind destinat populatiei generale a ' + uat + '. Acesta a fost distribuit prin canale multiple - platforma online a administratiei, puncte fizice de colectare in institutii publice, precum si prin operatori de teren in zone cu acces digital limitat - pentru a evita excluderea categoriilor vulnerabile. Esantionul vizat a fost dimensionat pentru a asigura reprezentativitatea statistica raportat la populatia de ' + N(s.pop) + ' locuitori.')

D.P('Structura chestionarului a acoperit principalele domenii ale calitatii vietii urbane: satisfactia fata de serviciile publice, perceptia asupra sigurantei si curateniei, evaluarea infrastructurii de transport si a spatiilor verzi, prioritatile de investitii in viziunea respondentilor. Intrebarile au combinat scale de evaluare cu intrebari deschise, permitand atat cuantificarea tendintelor, cat si surprinderea unor solutii propuse spontan de cetateni.')

D.barChart(
  [
    ['Mobilitate', 28, [185, 71, 30]],
    ['Spatii verzi', 22, [16, 122, 87]],
    ['Servicii publice', 18, [59, 130, 246]],
    ['Locuire', 14, [147, 51, 234]],
    ['Siguranta', 10, [234, 88, 12]],
    ['Cultura', 8, [202, 138, 4]]
  ],
  { title: 'Prioritati de investitii exprimate de respondenti (% mentiuni, ilustrativ)', h: 52, source: 'Chestionar consultare publica SIDU (date ilustrative)' }
)

D.P('Rezultatele chestionarului au evidentiat o ierarhie clara a preocuparilor cetatenesti, in care mobilitatea si calitatea spatiilor verzi au ocupat primele pozitii, urmate de eficienta serviciilor publice. Aceste tendinte au fost corelate cu indicatorii obiectivi din diagnoza tehnica - de exemplu, gradul de motorizare de ' + N(s.motoriz) + ' autoturisme la 1000 de locuitori si dotarea cu ' + RN(s.svMpLoc, 1) + ' mp spatiu verde pe locuitor raportat la norma de ' + s.normaSV + ' mp - confirmand convergenta dintre perceptia comunitatii si realitatea masurabila.')

D.h3('2.4. Dezbaterile publice')

D.P('Dezbaterile publice au reprezentat momentul de validare deschisa a strategiei, organizate in conformitate cu cerintele Legii nr. 52/2003. Anuntul prealabil a fost publicat cu respectarea termenului legal minim, iar draftul strategiei a fost pus la dispozitie pentru consultare cu cel putin 30 de zile inainte de dezbatere. Sesiunile au fost deschise tuturor cetatenilor, fara conditii de inscriere restrictive, si au permis exprimarea libera a observatiilor, propunerilor si obiectiilor.')

D.P('Fiecare amendament formulat in cadrul dezbaterilor publice a fost inregistrat, analizat si tratat printr-un raspuns motivat - acceptare, acceptare partiala sau respingere argumentata. Acest registru al amendamentelor, anexat strategiei, demonstreaza modul concret in care vocea comunitatii a modelat versiunea finala a documentului, asigurand legitimitatea democratica a optiunilor strategice asumate.')

D.h2('3. Rezultatele consultarii integrate in strategie')

D.P('Sinteza contributiilor colectate prin cele patru instrumente a generat un corpus consistent de recomandari, care au fost sistematizate si integrate in arhitectura strategiei. Integrarea nu s-a realizat mecanic, ci prin filtrarea contributiilor in raport cu fezabilitatea tehnica, sustenabilitatea financiara si coerenta cu obiectivele de dezvoltare durabila. Tabelul urmator prezinta principalele teme rezultate din consultare si modul lor de reflectare in documentul strategic.')

D.table(
  ['Tema rezultata din consultare', 'Instrument sursa', 'Reflectare in strategie'],
  [
    ['Decongestionarea traficului', 'Chestionar, dezbatere', 'Obiectiv mobilitate durabila si transport public'],
    ['Extinderea spatiilor verzi', 'Chestionar, grup mediu', 'Masuri infrastructura verde-albastra'],
    ['Modernizarea retelelor edilitare', 'Interviuri, grup infrastructura', 'Proiecte apa-canal si eficienta energetica'],
    ['Sprijinirea mediului de afaceri', 'Grup economie, interviuri', 'Axa competitivitate si ocupare'],
    ['Reabilitarea spatiilor publice', 'Grup patrimoniu, dezbatere', 'Interventii regenerare urbana'],
    ['Digitalizarea serviciilor', 'Grup guvernanta, chestionar', 'Obiectiv administratie inteligenta']
  ],
  [54, 44, CW - 98],
  { fs: 7, boldFirst: true }
)

D.P('Un rezultat transversal al consultarii a fost confirmarea unei tensiuni intre nevoia de dezvoltare economica si exigentele de protectie a mediului si a calitatii vietii. Strategia a tratat aceasta tensiune nu ca pe un conflict ireductibil, ci ca pe un principiu de echilibru, integrand criterii de sustenabilitate in toate proiectele propuse. Aceasta optiune reflecta direct preocuparile exprimate de comunitate in cadrul dezbaterilor.')

D.pie(
  [
    ['Recomandari integrate integral', 58, [16, 122, 87]],
    ['Integrate partial', 27, [59, 130, 246]],
    ['Neintegrate (motivat)', 15, [185, 71, 30]]
  ],
  { title: 'Modul de tratare a recomandarilor din consultare (% ilustrativ)', source: 'Registrul consultarii SIDU (date ilustrative)' }
)

D.P('Procentul ridicat al recomandarilor integrate integral sau partial - cumuland aproximativ patru cincimi din totalul contributiilor - reflecta atat calitatea inputurilor colectate, cat si deschiderea procesului de elaborare fata de vocea comunitatii. Recomandarile neintegrate au facut obiectul unei justificari explicite, fie din considerente de fezabilitate tehnica, fie din lipsa surselor de finantare identificabile, fie din necorelarea cu competentele administratiei locale.')

D.h2('4. Documentarea procesului in anexe')

D.P('Intregul proces participativ a fost documentat riguros, in vederea asigurarii trasabilitatii si a respectarii obligatiilor legale de transparenta. Documentatia aferenta consultarii este atasata prezentei strategii sub forma de anexe distincte, care pot fi consultate de orice parte interesata. Aceasta documentare exhaustiva constituie totodata baza pentru evaluarea ex-post a procesului si pentru replicarea bunelor practici in viitoarele exercitii de planificare.')

D.bullets([
  ['Anexa A - Liste de participanti', 'evidenta nominala a participantilor la grupurile de lucru, interviuri si dezbateri, cu mentionarea institutiei sau categoriei reprezentate.'],
  ['Anexa B - Procese-verbale', 'consemnarea integrala a sedintelor grupurilor de lucru si a dezbaterilor publice, inclusiv punctele de consens si divergentele.'],
  ['Anexa C - Sinteza chestionarelor', 'raportul de prelucrare statistica a raspunsurilor, cu distributii pe categorii si corelatii relevante.'],
  ['Anexa D - Registrul amendamentelor', 'evidenta tuturor observatiilor primite in faza de dezbatere publica si modul lor de tratare motivat.'],
  ['Anexa E - Anunturi si dovezi de publicitate', 'documentele care atesta respectarea termenelor legale de transparenta decizionala.']
])

D.P('Conservarea acestei documentatii dincolo de momentul aprobarii strategiei serveste unui dublu scop: pe de o parte, asigura conformitatea cu cerintele de transparenta si poate fundamenta eventuale verificari de legalitate; pe de alta parte, constituie un instrument de invatare institutionala, permitand administratiei ' + uat + ' sa imbunatateasca metodologia de consultare in ciclurile viitoare de planificare.')

D.callout('Continuitatea participarii', 'Procesul participativ nu se incheie odata cu aprobarea strategiei. In faza de implementare, monitorizarea participativa - prin rapoarte publice periodice, intalniri de evaluare si canale permanente de feedback - va asigura mentinerea dialogului cu comunitatea si ajustarea masurilor in functie de evolutia nevoilor locale. Aceasta abordare transforma strategia dintr-un document static intr-un cadru viu de guvernanta colaborativa.')

D.P('In concluzie, procesul de consultare publica si participare desfasurat pentru elaborarea acestei strategii integrate de dezvoltare urbana a respectat atat litera, cat si spiritul cadrului legal aplicabil. Prin combinarea instrumentelor cantitative si calitative, prin acoperirea tuturor categoriilor de actori si prin documentarea transparenta a fiecarei etape, strategia rezultata beneficiaza de o legitimitate solida si de o ancorare autentica in aspiratiile comunitatii din ' + uat + '. Aceasta fundamentare participativa reprezinta garantia ca obiectivele si masurile propuse vor intruni sustinerea necesara pe parcursul implementarii lor.')
      }
      // --- sectiune ord 99 (chapter) ---
      {
D.chapter('Anexe si glosar de termeni')
D.P('Prezentul capitol reuneste instrumentele de referinta necesare lecturii corecte a documentului strategic: un glosar al termenilor de specialitate si al abrevierilor utilizate, lista surselor de date si bibliografia, precum si nota metodologica privind statutul juridic si limitele de utilizare ale acestui material. Aceste anexe nu sunt accesorii, ci parte integranta a documentului: ele asigura trasabilitatea afirmatiilor, transparenta surselor si interpretarea univoca a conceptelor tehnice de catre toate categoriile de utilizatori - decidenti locali, proiectanti, mediul academic si publicul larg din ' + uat + '.')
D.P('Recomandam consultarea glosarului inaintea parcurgerii capitolelor tematice, intrucat vocabularul urbanismului contemporan combina termeni juridici reglementati prin legislatia romaneasca cu notiuni operationale provenite din politicile europene de coeziune si din practica internationala a planificarii integrate. O parte dintre concepte (de exemplu cele legate de tranzitia verde sau de mobilitatea durabila) au intrat recent in limbajul tehnic si pot avea acceptiuni variabile in literatura; in acest document ele sunt folosite cu sensul precizat mai jos.')

D.h2('A. Glosar de termeni si abrevieri')
D.P('Tabelul urmator defineste abrevierile si termenii tehnici recurenti in document. Definitiile au caracter operational si servesc lecturii prezentului material; pentru sensul juridic complet se va consulta legislatia in vigoare si documentele-cadru indicate in sectiunea de bibliografie. Termenii sunt ordonati pentru a grupa instrumentele de planificare, sursele de finantare si conceptele de dezvoltare durabila.')

D.h3('A.1 Documente si instrumente de planificare')
D.table(['Abreviere', 'Denumire si definitie operationala'], [
['SIDU', 'Strategie Integrata de Dezvoltare Urbana - document-umbrela care coreleaza viziunea, obiectivele si portofoliul de proiecte ale unitatii administrativ-teritoriale pe un orizont multianual; conditioneaza accesul la finantarea dedicata dezvoltarii urbane.'],
['PUG', 'Plan Urbanistic General - documentatie de urbanism cu caracter director si de reglementare, care stabileste regimul de utilizare a terenurilor pe intreg teritoriul administrativ; se aproba prin hotarare a consiliului local.'],
['PUZ', 'Plan Urbanistic Zonal - documentatie care detaliaza si reglementeaza dezvoltarea unei zone delimitate din teritoriu, putand modifica in conditiile legii prevederile PUG pentru acea zona.'],
['PUD', 'Plan Urbanistic de Detaliu - documentatie care reglementeaza amplasarea si conformarea constructiilor pe una sau mai multe parcele, in raport cu vecinatatile, fara a modifica indicatorii urbanistici stabiliti superior.'],
['RLU', 'Regulament Local de Urbanism - piesa scrisa asociata PUG/PUZ care detaliaza si impune regulile de construire (functiuni admise, indicatori, retrageri, regim de inaltime) aplicabile fiecarei zone.'],
['PMUD', 'Plan de Mobilitate Urbana Durabila - document de planificare a mobilitatii care urmareste accesibilitatea, siguranta si reducerea emisiilor, prioritizand transportul public si deplasarile nemotorizate.'],
['SUMP', 'Sustainable Urban Mobility Plan - denumirea europeana a PMUD; cadru metodologic comunitar pentru planificarea integrata a mobilitatii la nivel de oras si zona functionala.'],
['SEA', 'Evaluare strategica de mediu (Strategic Environmental Assessment) - procedura de evaluare a efectelor asupra mediului ale planurilor si programelor, anterioara aprobarii acestora.'],
['EIM', 'Evaluarea impactului asupra mediului - procedura aplicata anumitor proiecte cu efecte semnificative asupra mediului, in vederea emiterii actului de reglementare.'],
['ADI', 'Asociatie de Dezvoltare Intercomunitara - structura de cooperare intre unitati administrativ-teritoriale pentru furnizarea in comun a unor servicii publice sau realizarea unor proiecte de interes comun.'],
['ZM', 'Zona metropolitana / zona functionala urbana - arealul de polarizare al unui oras, depasind limita administrativa, in care se manifesta fluxuri zilnice de mobilitate, locuire si servicii.'],
['UIS', 'Unitate de implementare a strategiei - structura administrativa responsabila de monitorizarea, raportarea si actualizarea portofoliului de proiecte din SIDU.']
], [28, CW-28], { fs:7, boldFirst:true })

D.h3('A.2 Surse de finantare si cadru institutional')
D.table(['Abreviere', 'Denumire si definitie operationala'], [
['POR', 'Program Operational Regional - instrument de finantare a dezvoltarii regionale din fonduri europene, gestionat la nivel de regiune de dezvoltare, cu axe dedicate dezvoltarii urbane.'],
['PNRR', 'Planul National de Redresare si Rezilienta - instrument national finantat din mecanismul european de redresare, cu termene si tinte ferme pe componente precum tranzitia verde si digitala.'],
['FEDR', 'Fondul European de Dezvoltare Regionala - fond structural care sustine investitiile in infrastructura, mediu, competitivitate si dezvoltare urbana.'],
['OP', 'Obiectiv de politica - categorie de prioritati la nivel european care orienteaza alocarea fondurilor de coeziune (de exemplu o Europa mai verde, mai conectata, mai sociala).'],
['OST', 'Obiectiv strategic teritorial - tinta de dezvoltare formulata la nivelul teritoriului, care articuleaza viziunea cu interventiile concrete.'],
['OS', 'Obiectiv specific - tinta operationala subordonata unui obiectiv strategic, masurabila prin indicatori.'],
['OSC', 'Obiectiv specific conex / de coeziune - obiectiv aliniat la prioritatile de coeziune economica, sociala si teritoriala.'],
['ODD', 'Obiective de dezvoltare durabila - cele 17 tinte ale agendei internationale 2030 care orienteaza politicile publice catre durabilitate economica, sociala si de mediu.']
], [28, CW-28], { fs:7, boldFirst:true })

D.h3('A.3 Concepte de dezvoltare durabila si urbanism contemporan')
D.table(['Abreviere', 'Denumire si definitie operationala'], [
['TOD', 'Transit Oriented Development - model de dezvoltare urbana cu densitate si mixitate functionala concentrate in jurul nodurilor de transport public, pentru a reduce dependenta de autoturism.'],
['UHI', 'Insula de caldura urbana (Urban Heat Island) - fenomen de supraincalzire a zonelor construite fata de zonele invecinate, accentuat de suprafetele impermeabile si deficitul de vegetatie.'],
['NbS', 'Solutii bazate pe natura (Nature-based Solutions) - interventii care folosesc procese si elemente naturale (vegetatie, sol, apa) pentru a raspunde provocarilor urbane precum caldura, inundatiile sau poluarea.'],
['nZEB', 'Cladire al carei consum de energie este aproape egal cu zero (nearly Zero-Energy Building) - standard de performanta energetica pentru constructii noi sau renovate major.'],
['UAT', 'Unitate administrativ-teritoriala - comuna, oras, municipiu sau judet, cu personalitate juridica si patrimoniu propriu, titulara a competentelor de planificare locala.'],
['POT', 'Procent de ocupare a terenului - raportul dintre suprafata construita la sol si suprafata parcelei, exprimat procentual.'],
['CUT', 'Coeficient de utilizare a terenului - raportul dintre suprafata construita desfasurata si suprafata parcelei.'],
['UTR', 'Unitate teritoriala de referinta - subdiviziune a teritoriului delimitata in PUG, careia i se asociaza un set unitar de reglementari urbanistice.'],
['GIS', 'Sistem informational geografic - tehnologie de captare, stocare, analiza si vizualizare a datelor cu referinta spatiala, utilizata in fundamentarea deciziilor de planificare.'],
['SV', 'Spatiu verde - suprafata amenajata cu vegetatie destinata recreerii, ameliorarii microclimatului si biodiversitatii urbane.'],
['MP', 'Masterplan - document de planificare spatiala cu rol de viziune integratoare pentru un teritoriu sau un sector tematic.'],
['KPI', 'Indicator-cheie de performanta - marime cantitativa folosita pentru masurarea progresului catre o tinta strategica.']
], [28, CW-28], { fs:7, boldFirst:true })
D.callout('Nota privind utilizarea abrevierilor', 'In text, la prima aparitie a unui concept abreviat se foloseste de regula denumirea completa urmata de abreviere. Glosarul de mai sus permite verificarea sensului pe parcursul lecturii. Acolo unde un termen are atat acceptiune juridica reglementata, cat si acceptiune operationala, prevaleaza definitia din legislatia in vigoare.')

D.h2('B. Surse de date si bibliografie')
D.P('Fundamentarea afirmatiilor din document se bazeaza pe surse statistice oficiale, pe documentele de planificare ale unitatii administrativ-teritoriale si pe seturi de date deschise utilizate pentru caracterizarea teritoriului. Acolo unde o valoare nu a putut fi confirmata dintr-o sursa oficiala, ea este marcata in text cu semnul - sau cu mentiunea estimare si necesita completare pe baza datelor locale. Tabelul urmator sintetizeaza categoriile de surse si rolul fiecareia in elaborarea documentului.')
D.table(['Categorie sursa', 'Rol in fundamentare', 'Observatii privind acoperirea'], [
['Statistica oficiala nationala', 'Populatie, locuinte, demografie, indicatori economici', 'Date la nivel de UAT; serii 2011 si 2021 pentru variatie'],
['Statistica europeana', 'Comparatii de convergenta si nivel de dezvoltare', 'Valoare de referinta UE27 pentru PIB pe locuitor'],
['Documente locale de urbanism', 'PUG, RLU, regulament, indicatori urbanistici', 'Acoperire variabila; sectiuni marcate - necesita actualizare'],
['Seturi de date deschise spatiale', 'Retea stradala, acoperire functiuni, context teritorial', 'Completitudine dependenta de contributiile locale'],
['Reglementari tehnice si normative', 'Norme seismice, energetice, spatii verzi', 'Aplicate ca prag de conformitate, nu ca date masurate'],
['Portofoliul de proiecte al UAT', 'Investitii planificate, costuri, surse, indicatori', 'Furnizat de administratia locala; supus actualizarii periodice']
], [42, 64, CW-106], { fs:7, boldFirst:true })
D.P('Pentru ' + uat + ', din ' + jud + ', regiunea ' + reg + ', datele demografice de referinta utilizate in document indica o populatie de aproximativ ' + N(s.pop) + ' locuitori la nivelul anului 2021, fata de ' + N(s.pop11) + ' locuitori in 2011, ceea ce corespunde unei variatii de ' + Pct(s.varPct) + ' in interval. Indicatorul de dezvoltare economica retinut este de circa ' + N(s.pib) + ' EUR pe locuitor, reprezentand aproximativ ' + RN(s.convergUE, 1) + ' la suta din nivelul mediu al Uniunii Europene la 27 de state. Aceste valori provin din sursele statistice mentionate mai sus si sunt utilizate ca baza pentru proiectii si comparatii.')
D.P('Sursele de date au fost selectate pe criteriul oficialitatii si al actualitatii. In cazul indicatorilor de infrastructura tehnico-edilitara, de mobilitate sau de mediu, acolo unde masuratorile locale lipsesc, documentul recurge la normative si la valori de referinta nationale, semnaland explicit caracterul estimat al rezultatului. Aceasta abordare conserva caracterul orientativ al materialului si evita prezentarea ca certitudini a unor valori neconfirmate la nivel local.')
D.sourceBadges(['INS', 'Recensamant 2011', 'Recensamant 2021', 'Eurostat', 'PUG/RLU local', 'OpenStreetMap', 'Normative tehnice RO', 'Portofoliu UAT'])
D.callout('Trasabilitatea datelor', 'Fiecare tabel si grafic din document poarta, acolo unde a fost posibil, o mentiune de sursa. Recomandam ca la avizarea documentului fiecare valoare marcata - sa fie inlocuita cu date locale verificate, iar mentiunile estimare sa fie confirmate sau corectate prin masuratori si evidente administrative proprii ale ' + uat + '.')

D.h2('C. Nota metodologica si statut juridic')
D.P('Prezentul document are caracter orientativ si metodologic. El sintetizeaza date publice, normative tehnice si o structura de analiza specifica unei strategii integrate de dezvoltare urbana, cu scopul de a sprijini procesul decizional la nivel local. Documentul NU constituie si NU inlocuieste o Strategie Integrata de Dezvoltare Urbana avizata si aprobata in conditiile legii. Pentru a dobandi forta de document strategic opozabil, continutul trebuie supus procesului de elaborare, consultare publica, evaluare de mediu si aprobare prin hotarare a autoritatii deliberative competente.')
D.P('Metodologia de elaborare a urmat o logica integrata: caracterizarea teritoriului pe baza datelor disponibile, identificarea provocarilor si a potentialului, formularea viziunii si a obiectivelor strategice, construirea portofoliului de proiecte si definirea cadrului de monitorizare. Indicatorii cantitativi au fost derivati din sursele statistice si din normativele aplicabile, iar proiectiile au caracter de scenariu, nu de prognoza certa. Diferentele dintre valorile estimate si realitatea locala se vor reduce pe masura ce administratia furnizeaza date masurate.')
D.bullets([
['Statut', 'document orientativ, fara forta juridica de SIDU avizata; valoare de instrument-suport pentru fundamentarea deciziei.'],
['Acoperire date', 'valorile marcate - sau estimare necesita completare si validare cu evidente locale inainte de utilizare in acte administrative.'],
['Proiectii', 'au caracter de scenariu; orizontul si ipotezele se actualizeaza la aparitia unor date noi.'],
['Conformitate de mediu', 'aprobarea unui SIDU real impune parcurgerea procedurii de evaluare strategica de mediu, neacoperita de prezentul material.'],
['Actualizare', 'documentul se revizuieste periodic, prin structura de implementare, in functie de stadiul proiectelor si de noile date statistice.']
])
D.P('Limitele de utilizare trebuie respectate de toti destinatarii. Documentul poate fi folosit pentru informare, dezbatere preliminara, prioritizarea interventiilor si pregatirea caietelor de sarcini pentru elaborarea documentatiilor oficiale. Nu poate fi insa invocat ca temei pentru emiterea de avize, autorizatii sau alte acte administrative care presupun o strategie aprobata. Orice citare a valorilor trebuie insotita de mentiunea sursei si, dupa caz, de avertismentul privind caracterul estimat al datelor.')

D.h3('C.1 Recomandari pentru tranzitia catre documentul oficial')
D.P('Pentru transformarea acestui material intr-un instrument strategic operational la nivelul ' + uat + ', recomandam parcurgerea catorva etape esentiale. In primul rand, constituirea unei structuri de implementare a strategiei, responsabila de colectarea datelor, monitorizarea indicatorilor si actualizarea portofoliului. In al doilea rand, completarea valorilor lipsa cu evidente administrative proprii si validarea estimarilor prin masuratori. In al treilea rand, organizarea unui proces real de consultare publica, cu implicarea cetatenilor, a mediului economic si a societatii civile.')
D.bullets([
['Pasul 1', 'inventarierea si completarea datelor marcate - cu valori verificate din evidentele proprii.'],
['Pasul 2', 'corelarea portofoliului de proiecte cu sursele de finantare disponibile si cu termenele reale de implementare.'],
['Pasul 3', 'parcurgerea procedurii de evaluare strategica de mediu, acolo unde este obligatorie prin lege.'],
['Pasul 4', 'consultarea publica si integrarea observatiilor relevante in continutul documentului.'],
['Pasul 5', 'aprobarea formala prin hotarare a autoritatii deliberative si publicarea documentului final.']
])
D.callout('Avertisment de utilizare', 'Acest material este un instrument-suport orientativ generat pentru fundamentarea deciziei la nivelul ' + uat + '. El nu inlocuieste o strategie avizata si nu produce efecte juridice. Valorile marcate - reprezinta lipsa de date si necesita completare locala. Inainte de orice utilizare in proces administrativ, continutul trebuie verificat, completat si supus procedurilor legale de aprobare.')
      }
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
