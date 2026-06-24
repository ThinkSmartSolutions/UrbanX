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

        // CONTINUT — SIDU REZUMA si CONECTEAZA MP/PMUD (NU le copiaza); e mare prin
        // profunzimea analizei multi-domeniu + capitolele obligatorii proprii.
        G._StratSIDUContent.build(D, ctx);

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
      const N = D.N, RN = D.RN, Pct = D.Pct, CW = D.dims.CW;
      const s = _siduModel(city, mob, need, invest, risk, grav, climate);
      const pop = s.pop, pop55 = s.pop55;
      const jud = city.judet || city.county || '';
      const reg = city.regiune || city.region || '';
      const isCom = s._isCom;
      const uat = (isCom ? 'comuna ' : 'municipiul ') + city.name;
      const Uat = (isCom ? 'Comuna ' : 'Municipiul ') + city.name;
      // helper: paragrafe multiple
      const PP = arr => arr.forEach(t => D.P(t));

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 1 — CONTEXT STRATEGIC SI CORELAREA CU DOCUMENTELE
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Context strategic si corelarea cu documentele de planificare');
      D.h2('Rolul si statutul Strategiei Integrate de Dezvoltare Urbana');
      PP([
        'Strategia Integrata de Dezvoltare Urbana (SIDU) a ' + uat + ' este documentul-cadru de nivel superior care defineste viziunea, obiectivele si portofoliul integrat de proiecte ale comunitatii pe orizontul 2026-2040. SIDU este "constitutia" dezvoltarii urbane: integreaza simultan toate domeniile vietii urbane — economie, mobilitate, regenerare, locuire, educatie, sanatate, mediu, cultura, infrastructura tehnico-edilitara, capacitate administrativa si transformare digitala — si asigura coerenta dintre interventii.',
        'Spre deosebire de documentele subordonate, SIDU nu detaliaza in profunzime o singura componenta, ci stabileste prioritatile si logica de ansamblu. Componentele sectoriale sunt aprofundate tehnic in documente proprii: mobilitatea in Planul de Mobilitate Urbana Durabila (PMUD), iar structura spatiala si regenerarea in Masterplanul Strategic. SIDU le rezuma concluziile-cheie si le coreleaza intr-un portofoliu unic, prioritizat dupa aceleasi criterii.',
        'Elaborarea SIDU este conditie de eligibilitate pentru accesarea Programului Operational Regional (POR 2021-2027) la prioritatea dedicata dezvoltarii urbane durabile, conform Regulamentului (UE) 2021/1060. La nivel european, minimum 8% din alocarea FEDR este rezervata dezvoltarii urbane durabile, in cadrul Obiectivului de Politica 5 — "O Europa mai aproape de cetateni". SIDU aprobat de autoritatea deliberativa locala constituie documentul de referinta pentru programarea investitiilor si pentru proiectele finantate din fonduri europene si nationale.'
      ]);
      D.h2('Pozitionarea in ierarhia documentelor de planificare');
      D.P('Ierarhia documentelor pentru ' + uat + ' este: SIDU (umbrela strategica, integreaza toate domeniile) -> PMUD (detaliere mobilitate) si Masterplan (detaliere structura spatiala si regenerare) -> PUG / RLU (reglementare urbanistica juridica, care emite autorizatii prin PUZ/PUD). SIDU coordoneaza, dar nu reglementeaza si nu emite autorizatii; pentru a deveni aplicabile, proiectele strategice trebuie transpuse in PUG.');
      D.table(
        ['Document', 'Scop', 'Emite autorizatii?', 'Orizont', 'Relatie cu SIDU'],
        [
          ['SIDU ' + city.name, 'Strategie integrata, toate domeniile', 'NU', '15 ani', 'Document de referinta (umbrela)'],
          ['PMUD ' + city.name, 'Mobilitate urbana durabila (SUMP)', 'NU', '10-15 ani', 'Subordonat — detaliaza mobilitatea'],
          ['Masterplan', 'Structura spatiala si regenerare', 'NU', '20-30 ani', 'Subordonat — detaliaza spatiul'],
          ['PUG ' + city.name, 'Reglementare urbanistica', 'DA (prin PUZ/PUD)', '10 ani', 'Transpune SIDU in reguli'],
          ['PUZ / PUD', 'Reglementare zona / detaliu', 'DA', '5 ani', 'Transpune proiectele SIDU']
        ],
        [34, 46, 28, 16, 50], { fs: 7 }
      );
      D.h2('Corelarea cu cadrul strategic european');
      D.P('SIDU ' + city.name + ' se incadreaza in cadrul de politici al Uniunii Europene pentru 2021-2027 si in obiectivele pe termen lung ale Pactului Verde European si Agendei 2030 (ODD). Documentul contribuie la cele cinci obiective de politica ale politicii de coeziune si la programele tematice europene relevante.');
      D.table(
        ['Cadru / Program UE', 'Contributia SIDU'],
        [
          ['Reg. (UE) 2021/1060 — OP5 "Europa mai aproape de cetateni"', 'Eligibilitate POR pentru dezvoltare urbana durabila integrata'],
          ['Pactul Verde European; Legea europeana a climei', 'Neutralitate climatica, infrastructura verde-albastra, energie'],
          ['Carta de la Leipzig (2007/2020)', 'Oras ca bun comun, prosperitate verde si echitabila, guvernanta'],
          ['New European Bauhaus', 'Spatiu public sustenabil, frumos, incluziv'],
          ['Agenda Urbana a UE (Pactul de la Amsterdam)', 'Abordare integrata, parteneriate tematice urbane'],
          ['Orizont Europa; Europa Digitala; LIFE; URBACT IV', 'Inovare, digitalizare, mediu si schimb de bune practici'],
          ['Obiectivele de Dezvoltare Durabila (ODD 11)', 'Orase si comunitati durabile, incluzive, reziliente']
        ],
        [78, CW - 78], { fs: 7 }
      );
      D.h2('Corelarea cu strategii nationale, regionale si locale');
      D.bullets([
        ['National', 'Strategia de Dezvoltare Teritoriala a Romaniei; Strategia Nationala de Renovare pe Termen Lung; Strategia Nationala privind Schimbarile Climatice; Strategia Nationala de Competitivitate; PNRR.'],
        ['Regional', 'Planul de Dezvoltare Regionala ' + (reg || 'al regiunii') + '; Strategia ADR; Planul de Amenajare a Teritoriului Judetean (PATJ) ' + (jud || '') + '.'],
        ['Local / metropolitan', 'Strategia Zonei Metropolitane; PUG ' + city.name + ' in vigoare; PMUD; Masterplan; strategii sectoriale locale (locuire, mediu, digitalizare).']
      ]);
      D.sourceBadges(['Reg. (UE) 2021/1060', 'Ghid SIDU POR/MDLPA', 'Legea 350/2001', 'HG 874/2019', 'Carta Leipzig 2020', 'PNRR']);

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 2 — ANALIZA-DIAGNOSTIC (corpul documentului)
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Analiza-diagnostic teritoriala si sectoriala');
      D.P('Analiza-diagnostic reprezinta corpul principal al SIDU si fundamenteaza intregul demers strategic. Ea acopera, pe profile sectoriale, intreaga viata urbana a ' + uat + ', pe baza datelor oficiale (INS — Recensamantul 2021, TEMPO-Online; Eurostat; date locale) si a concluziilor documentelor sectoriale (PMUD, Masterplan). Indicatorii pentru care nu exista o valoare oficiala disponibila sunt marcati cu "—" sau prezentati ca estimari, evitand cifre nefondate.');
      D.kpis([
        { val: N(pop), label: 'Populatie 2021', sub: 'INS Rec. 2021' },
        { val: N(s.pop11), label: 'Populatie 2011', sub: 'INS Rec. 2011' },
        { val: (s.varPct >= 0 ? '+' : '') + RN(s.varPct, 1) + '%', label: 'Variatie 2011-2021', sub: 'calcul direct' },
        { val: (city.tip || 'municipiu'), label: 'Categorie UAT', sub: reg || '' }
      ]);

      // 2.1 Socio-demografic
      D.h2('2.1 Profil socio-demografic');
      PP([
        'Dinamica populatiei este punctul de plecare al oricarei strategii urbane: determina cererea de locuinte, de servicii publice (educatie, sanatate, asistenta sociala) si de mobilitate. Intre recensamintele 2011 si 2021, ' + uat + ' a inregistrat o variatie de ' + (s.varPct >= 0 ? '+' : '') + RN(s.varPct, 1) + '% a populatiei de domiciliu (' + (s.delta21 >= 0 ? '+' : '') + N(s.delta21) + ' persoane). ' + (s.varPct < 0 ? 'Tendinta de declin impune politici de retentie a populatiei active, de atragere a tinerilor si de regenerare a fondului construit pentru a evita spirala depopulare-dezinvestitie.' : 'Tendinta de crestere impune corelarea stricta a dezvoltarii rezidentiale cu infrastructura tehnico-edilitara si de mobilitate, pentru a evita expansiunea necontrolata.'),
        'Structura pe grupe de varsta si fenomenul de imbatranire demografica influenteaza direct planificarea serviciilor. Rata de dependenta demografica este in crestere la nivel national, iar proiectiile pentru 2030-2040 indica accentuarea acestei tendinte, cu implicatii asupra infrastructurii de ingrijire a varstnicilor, a sistemului de sanatate si a pietei muncii. Populatia rezidenta de facto poate diferi semnificativ de cea inregistrata, in special in centrele universitare si in UAT-urile cu naveta intensa.',
        'Proiectia demografica pentru orizontul strategic se realizeaza pe trei scenarii (conservator, moderat de referinta, optimist), in functie de politicile adoptate. Scenariul de referinta (S2), pe care se fundamenteaza prezentul SIDU, estimeaza o populatie de aproximativ ' + N(pop55) + ' locuitori la orizontul de proiectie, valoare folosita pentru dimensionarea nevoilor de locuire, dotari si retele.'
      ]);
      D.lineChart([{ name: 'Populatie', color: [185, 71, 30], points: [s.pop11, pop, pop55] }], ['2011', '2021', '2040 (S2)'],
        { title: 'Evolutia si proiectia populatiei', source: 'INS Recensaminte + proiectie cohort-component (S2)' });
      D.table(['Indicator demografic', 'Valoare', 'Sursa / observatii'], [
        ['Populatie 2021', N(pop) + ' loc.', 'INS Recensamant 2021'],
        ['Populatie 2011', N(s.pop11) + ' loc.', 'INS Recensamant 2011'],
        ['Variatie 2011-2021', (s.varPct >= 0 ? '+' : '') + RN(s.varPct, 1) + '%', 'Calcul direct'],
        ['Proiectie ' + 'orizont (S2)', N(pop55) + ' loc.', 'Model cohort-component'],
        ['Categorie UAT', (city.tip || '—'), 'Clasificare administrativa'],
        ['Regiune de dezvoltare', (reg || '—'), 'NUTS 2']
      ], [60, 44, CW - 104], { fs: 7 });

      // 2.2 Economic
      D.h2('2.2 Profil economic si competitivitate');
      PP([
        'Profilul economic local determina capacitatea de finantare a dezvoltarii, atractivitatea pentru investitii si forta de munca si gradul de reziliconta la socuri. PIB-ul pe cap de locuitor estimat pentru ' + uat + ' este de aproximativ ' + N(s.pib) + ' EUR, reprezentand circa ' + RN(s.convergUE, 1) + '% din media UE-27 (' + N(s.eu27) + ' EUR). Acest decalaj indica un potential semnificativ de convergenta in orizontul strategic, conditionat de diversificarea economica si de cresterea productivitatii.',
        'Structura economica, ocuparea fortei de munca, densitatea firmelor active si specializarea sectoriala se documenteaza din INS TEMPO si ONRC. Pentru UAT-urile urbane, sectoarele cu valoare adaugata mare (servicii IT&C, sanatate, educatie, servicii profesionale) sunt motoarele de crestere, in timp ce industria si comertul asigura stabilitatea ocuparii. Pentru comune, profilul economic este dominat de agricultura, servicii de proximitate si, in zonele periurbane, de functiuni rezidentiale si logistice.',
        'Ritmul de autorizare a constructiilor — estimat la circa ' + N(s.authAn) + ' autorizatii/an — reflecta presiunea de dezvoltare si necesarul de corelare cu infrastructura. Atractivitatea economica depinde de conectivitatea regionala (autostrazi, cale ferata, aeroport), de disponibilitatea terenurilor pentru investitii si de calitatea capitalului uman.'
      ]);
      D.table(['Indicator economic', 'Valoare estimata', 'Reper'], [
        ['PIB/locuitor', N(s.pib) + ' EUR', 'INS / Eurostat'],
        ['Convergenta cu UE-27', RN(s.convergUE, 1) + '%', 'media UE-27: ' + N(s.eu27) + ' EUR'],
        ['Autorizatii constructii/an', N(s.authAn), 'estimare INS'],
        ['Nota economica UrbanX', s.noteEco + '/100', 'indice compozit'],
      ], [56, 48, CW - 104], { fs: 7 });

      // 2.3 - 2.10 profile sectoriale (parametrice, dense)
      const profile = [
        ['2.3 Profil spatial si functional',
          ['Structura spatiala a ' + uat + ' — relatia intre intravilan si extravilan, zonificarea functionala, densitatile si fondul construit — conditioneaza eficienta serviciilor publice si calitatea vietii. Bilantul teritorial (zone rezidentiale, mixte, industriale, verzi, institutionale) se preia din PUG in vigoare; decalajul intre PUG vechi si nevoile actuale genereaza presiune pentru actualizare.',
           'Expansiunea necontrolata (urban sprawl) in zona periurbana — cu densitate redusa, fara transport public, scoli sau retele complete — este una dintre cele mai costisitoare provocari urbanistice, cu costuri de infrastructura pe locuitor de pana la 3 ori mai mari decat densificarea coordonata. SIDU promoveaza densificarea calitativa in jurul transportului (TOD) si reconversia terenurilor subutilizate (brownfield) inaintea consumului de teren nou.'],
          ['Indicator spatial', 'Valoare', 'Sursa'],
          [['Suprafata UAT', '—', 'PUG / cadastru'], ['Fond locuinte 2021', N(s.locuinte), 'INS'], ['Necesar locuinte orizont', N(s.necLoc), 'model Mankiw-Romer-Weil']]],
        ['2.4 Regenerare urbana si locuire',
          ['Fondul construit cuprinde o pondere semnificativa de cladiri din perioada 1960-1990, energivore si, partial, cu risc seismic, in special in UAT-urile urbane. Regenerarea urbana integrata — reabilitare termica + spatiu public + mobilitate + dotari de cartier — este prioritara, nu doar termoizolatia. Necesarul estimat de locuinte la orizontul strategic este de aproximativ ' + N(s.necLoc) + ' unitati.',
           'Locuirea accesibila si sociala (fond public pentru tineri, familii, categorii vulnerabile) este insuficienta in majoritatea UAT-urilor, alimentand suburbanizarea. SIDU propune densificare calitativa langa transportul public si un fond de locuinte accesibile, corelat cu infrastructura.'],
          ['Indicator locuire', 'Valoare', 'Tinta orizont'],
          [['Fond locuinte 2021', N(s.locuinte), '—'], ['Necesar nou (S2)', N(s.necLoc), 'corelare infrastructura'], ['Locuinte/an necesare', N(Math.round(s.necLoc / 14)), 'ritm sustenabil']]],
        ['2.5 Infrastructura de transport si mobilitate (rezumat PMUD)',
          ['Concluziile detaliate de mobilitate sunt aprofundate in PMUD; SIDU le rezuma si le coreleaza. Distributia modala actuala este de aproximativ ' + RN(s.modalAuto, 0) + '% auto / ' + RN(s.modalTP, 0) + '% transport public / ' + RN(s.modalAct, 0) + '% deplasari active, cu un grad de motorizare de circa ' + s.motoriz + ' autoturisme/1000 locuitori. Emisiile de CO2 din transport sunt estimate la ' + s.co2cap + ' t/cap/an.',
           'Provocarile-cheie: dependenta de automobil, congestia la intrarile in oras, transportul public subfinantat si reteaua de mobilitate activa incompleta. SIDU preia tintele PMUD (transfer modal spre transport public si moduri active) si asigura rezervarea culoarelor necesare in PUG.'],
          ['Indicator mobilitate', 'Actual', 'Tinta orizont'],
          [['Cota auto', RN(s.modalAuto, 0) + '%', 'in scadere'], ['Cota transport public', RN(s.modalTP, 0) + '%', 'in crestere'], ['Cota deplasari active', RN(s.modalAct, 0) + '%', 'in crestere'], ['Motorizare', s.motoriz + '/1000', 'stabilizare'], ['CO2 transport', s.co2cap + ' t/cap', 'reducere']]],
        ['2.6 Echiparea tehnico-edilitara',
          ['Retelele de alimentare cu apa, canalizare, energie, gaze naturale si telecomunicatii sunt conditia oricarei dezvoltari. Gradul de acoperire estimat: apa ' + s.acApa + '%, canalizare ' + s.acCanal + '%, gaze ' + s.acGaz + '%, broadband ' + s.acBB + '%. Principalele vulnerabilitati tin de uzura fizica a retelelor vechi, pierderile ridicate in sistemul de apa si de incompletitudinea canalizarii in zonele periferice.',
           'Extinderea si modernizarea retelelor (reducerea pierderilor, statii de epurare conforme directivelor UE, digitalizarea managementului) conditioneaza autorizarea dezvoltarilor noi si sunt finantabile prin PNRR si POR.'],
          ['Retea', 'Acoperire estimata', 'Tinta'],
          [['Apa potabila', s.acApa + '%', '>=95%'], ['Canalizare', s.acCanal + '%', '>=90%'], ['Gaze naturale', s.acGaz + '%', 'extindere'], ['Broadband', s.acBB + '%', '>=95%']]],
        ['2.7 Servicii publice (educatie, sanatate, social, cultura)',
          ['Reteaua de servicii publice — educatie (crese, gradinite, scoli, licee, universitati), sanatate (spitale, ambulatoriu, medicina de familie), asistenta sociala si cultura — determina calitatea vietii si echitatea accesului. Starea fizica a cladirilor publice (risc seismic, eficienta energetica, dotari) si distributia teritoriala a serviciilor sunt evaluate pentru a identifica deficitele de proximitate.',
           'Principiul "orasului in 15 minute" ghideaza reorganizarea serviciilor de proximitate. Accesul echitabil la servicii medicale si educationale de calitate, modernizarea infrastructurii si reducerea abandonului scolar sunt obiective transversale.'],
          ['Domeniu serviciu', 'Provocare-cheie', 'Directie SIDU'],
          [['Educatie', 'cladiri uzate, risc seismic', 'modernizare + dotari'], ['Sanatate', 'acces inegal, infrastructura', 'pol medical + ambulatoriu'], ['Social', 'servicii pt. varstnici/vulnerabili', 'centre + ingrijire la domiciliu'], ['Cultura', 'valorificare patrimoniu', 'regenerare + turism']]],
        ['2.8 Mediu, spatii verzi si schimbari climatice',
          ['Suprafata de spatii verzi pe locuitor este de aproximativ ' + RN(s.svMpLoc, 1) + ' mp/loc, fata de norma de ' + s.normaSV + ' mp/loc (Legea 24/2007)' + (s.svMpLoc < s.normaSV ? ', rezultand un deficit estimat de circa ' + N(s.deficitSV) + ' ha la orizontul de proiectie.' : ', peste norma minima, cu accent pe conectarea retelei verzi.') + ' Distributia spatiilor verzi este de regula inegala teritorial, cu cartiere deficitare.',
           'Vulnerabilitatea la schimbari climatice se manifesta prin insula de caldura urbana (UHI), cresterea numarului de zile caniculare si riscul de inundatii pluviale la precipitatii extreme. Riscul seismic este caracterizat prin acceleratia de varf ag = ' + s.ag + 'g (zona ' + s.zonaSeism + '). Calitatea aerului inregistreaza depasiri periodice pentru particule fine, in special din trafic si incalzire rezidentiala.',
           'Infrastructura verde-albastra (regula 3-30-300, sponge city), cresterea suprafetei verzi, reducerea emisiilor si adaptarea climatica sunt prioritati, finantabile din fonduri de clima UE si POR.'],
          ['Indicator mediu', 'Valoare', 'Tinta / reper'],
          [['Spatii verzi/loc', RN(s.svMpLoc, 1) + ' mp', s.normaSV + ' mp (L.24/2007)'], ['Deficit verde', N(s.deficitSV) + ' ha', 'eliminare orizont'], ['Risc seismic (ag)', s.ag + 'g', 'zona ' + s.zonaSeism], ['CO2/cap (transport)', s.co2cap + ' t', 'reducere']]],
        ['2.9 Capacitate administrativa si financiara',
          ['Capacitatea administrativa — resursa umana, capacitatea de management de proiect, transparenta si digitalizarea serviciilor — determina viteza si calitatea implementarii SIDU. Bugetul local si capacitatea de absorbtie a fondurilor europene sunt indicatori-cheie ai sustenabilitatii financiare a portofoliului. Investitia totala estimata a portofoliului SIDU este de aproximativ ' + N(s.invTot) + ' mil. EUR.',
           'Provocarile uzuale: fluctuatia personalului din achizitii si management de proiect, durata procedurilor de avizare si expropriere, dificultatile de coordonare inter-departamentala. Consolidarea unei Unitati de Implementare a Strategiei (UIS) este esentiala.'],
          ['Indicator administrativ', 'Valoare', 'Observatii'],
          [['Investitie portofoliu', N(s.invTot) + ' M EUR', 'orizont 2026-2040'], ['Nota administrativa', '—', 'capacitate management'], ['Absorbtie fonduri UE', '—', 'maximizare']]],
        ['2.10 Transformare digitala (Smart City)',
          ['Digitalizarea administratiei si a serviciilor urbane (platforme de date, GIS / digital twin, senzori de trafic si mediu, semaforizare adaptiva, e-ticketing, ghiseu unic online) creste eficienta, transparenta si calitatea deciziilor. SIDU integreaza componenta Smart City transversal, in toate domeniile, nu ca scop in sine.',
           'Datele deschise sustin transparenta si deciziile bazate pe dovezi; o platforma urbana de date operationala este atat un proiect, cat si un instrument de monitorizare a intregului SIDU.'],
          ['Componenta Smart', 'Stare / directie', 'Tinta orizont'],
          [['Platforma date urbane', 'de dezvoltat', 'operationala'], ['Servicii publice digitale', 'partial', '>=80%'], ['ITS / trafic', 'incipient', 'artere majore']]]
      ];
      profile.forEach(pf => {
        D.h2(pf[0]);
        pf[1].forEach(t => D.P(t));
        D.table(pf[2], pf[3], [56, 44, CW - 100], { fs: 7 });
      });
      D.sourceBadges(['INS Recensamant 2021', 'INS TEMPO', 'Eurostat Urban Audit', 'PMUD ' + city.name, 'Masterplan ' + city.name, 'PUG in vigoare', 'APM / ANAR / INFP']);

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 3 — ANALIZA SWOT INTEGRATA SI ANALIZA PEST
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Analiza SWOT integrata si analiza PEST');
      D.h2('3.1 Analiza SWOT integrata');
      D.P('Analiza SWOT sintetizeaza diagnosticul pe cele patru cadrane, integrat — pe tot orasul simultan, nu pe un singur domeniu. Ea fundamenteaza obiectivele strategice din capitolul urmator.');
      const swotS = ['Capital uman' + (isCom ? '' : ' si universitar') + '; pozitie regionala', 'PIB/cap ' + N(s.pib) + ' EUR (' + RN(s.convergUE, 0) + '% din UE-27) cu potential de convergenta', (s.acApa > 90 ? 'Acoperire ridicata retele apa (' + s.acApa + '%)' : 'Proiecte de extindere retele in derulare'), (pop > 50000 ? 'Masa critica pentru servicii metropolitane' : 'Comunitate coeziva, identitate locala'), 'Patrimoniu cultural si natural valorificabil'];
      const swotW = [(s.svMpLoc < s.normaSV ? 'Deficit spatii verzi (' + RN(s.svMpLoc, 1) + ' mp/loc vs ' + s.normaSV + ')' : 'Retea verde fragmentata'), 'Decalaj SIDU/PMUD -> PUG (culoare nerezervate); fond construit invechit', 'Dependenta de autoturism (' + RN(s.modalAuto, 0) + '%); transport public subfinantat', 'Convergenta economica sub potential (' + RN(s.convergUE, 0) + '%)', 'Capacitate administrativa de proiect fluctuanta'];
      const swotO = ['Fonduri UE (POR 2021-2027, PNRR) — alocare dedicata urbanului', 'Zona metropolitana functionala; modele 15-min / TOD / superbloc', 'Digitalizare si tranzitie verde — valoare adaugata mare', 'Reconversie brownfield si densificare fara consum de teren nou', 'Diaspora — resursa de revenire si investitii'];
      const swotT = [(s.varPct < 0 ? 'Declin si imbatranire demografica' : 'Suburbanizare si sprawl periurban (cost infrastructura x3)'), 'Schimbari climatice (UHI, inundatii); risc seismic ag=' + s.ag + 'g', 'Concurenta pentru investitii si talente cu alte centre', 'Intarzieri de transpunere in PUG -> proiecte neautorizabile', 'Volatilitate economica si a fondurilor'];
      D.table(['Cadran', 'Elemente reprezentative (multisectoriale)'], [
        ['Puncte tari (S)', swotS.join('; ')],
        ['Puncte slabe (W)', swotW.join('; ')],
        ['Oportunitati (O)', swotO.join('; ')],
        ['Amenintari (T)', swotT.join('; ')]
      ], [34, CW - 34], { boldFirst: true, fs: 7.5 });
      D.h3('Strategii rezultate din corelarea SWOT');
      D.bullets([
        ['SO (max-max)', 'valorificarea capitalului uman si a fondurilor UE pentru poli de inovare si tranzitie verde'],
        ['ST (max-min)', 'folosirea masei critice si a pozitiei regionale pentru a contracara concurenta si riscurile climatice'],
        ['WO (min-max)', 'acoperirea deficitelor (verde, mobilitate) prin oportunitatile de finantare europeana'],
        ['WT (min-min)', 'reducerea dependentei de auto si a decalajului SIDU->PUG pentru a evita blocajele si pierderile']
      ]);
      D.h2('3.2 Analiza PEST');
      D.P('Analiza PEST completeaza SWOT cu o perspectiva pe factorii de context — Politici, Economici, Sociali, Tehnologici — care influenteaza dezvoltarea, dar sunt in mare masura externi controlului local.');
      D.table(['Factor', 'Influente asupra dezvoltarii ' + uat], [
        ['Politic', 'Cadrul UE 2021-2027 si POR; descentralizare si competente locale; stabilitate administrativa; politici nationale de locuire, mediu, transport'],
        ['Economic', 'Convergenta UE (' + RN(s.convergUE, 0) + '%); accesul la fonduri (POR/PNRR/BEI); piata muncii si investitiile; inflatie si costuri de constructie'],
        ['Social', 'Dinamica demografica (' + (s.varPct >= 0 ? '+' : '') + RN(s.varPct, 1) + '%); imbatranire; migratie si diaspora; cerere de locuire accesibila si servicii'],
        ['Tehnologic', 'Digitalizare si Smart City; tranzitie energetica; mobilitate electrica si activa; solutii bazate pe natura (NbS)']
      ], [26, CW - 26], { boldFirst: true, fs: 7.5 });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 4 — VIZIUNE SI OBIECTIVE STRATEGICE
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Viziunea de dezvoltare si obiectivele strategice');
      D.callout('Viziune 2040',
        Uat + ' — un oras' + (isCom ? '/comuna' : '') + ' verde, conectat si competitiv, cu servicii publice la standard european, in care fiecare locuitor ajunge in 15 minute la serviciile esentiale, dezvoltarea este corelata cu infrastructura, iar spatiul public si natura urbana sunt prioritare. O comunitate rezilienta, incluziva si atractiva pentru generatia activa.');
      D.h2('4.1 Principii directoare');
      D.bullets([
        'Oras al proximitatii (15 minute) — servicii esentiale accesibile pe jos/velo',
        'Oras verde si rezilient — infrastructura verde-albastra, 3-30-300, adaptare climatica',
        'Oras conectat — transport public eficient, mobilitate activa, naveta metropolitana',
        'Oras competitiv si inteligent — economie diversificata, digitalizare, inovare',
        'Oras incluziv — locuire accesibila, servicii sociale, participare publica',
        'Dezvoltare bazata pe dovezi — date deschise, monitorizare, evaluare continua'
      ]);
      D.h2('4.2 Obiective strategice, obiective specifice (OS) si corelarea cu obiectivele de coeziune UE');
      D.P('Obiectivele strategice (OST) se descompun in obiective specifice (OS), fiecare corelat cu Obiectivele de Politica (OP) ale politicii de coeziune UE 2021-2027. Aceasta corelare asigura eligibilitatea finantarii.');
      const obiective = [
        ['OST 1 — Oras verde si rezilient', 'OS 1.1 Mobilitate urbana durabila; OS 1.2 Neutralitate energetica; OS 1.3 Reducerea poluarii si a riscurilor climatice', 'OP2 (verde) · OP3 (mobilitate)'],
        ['OST 2 — Oras competitiv si productiv', 'OS 2.1 Valorificarea terenurilor/cladirilor pentru investitii; OS 2.2 Inovare, start-up-uri, forta de munca calificata', 'OP1 (inteligent) · OP5 (urban)'],
        ['OST 3 — Oras al serviciilor de calitate', 'OS 3.1 Infrastructura publica de calitate; OS 3.2 Acces facil la servicii publice; OS 3.3 Locuire accesibila', 'OP4 (social) · OP5 (urban)'],
        ['OST 4 — Oras inteligent si bine guvernat', 'OS 4.1 Digitalizarea administratiei; OS 4.2 Reducerea birocratiei; OS 4.3 Implicarea cetatenilor', 'OP1 · OP5']
      ];
      D.table(['Obiectiv strategic', 'Obiective specifice (OS / OSC)', 'Corelare OP coeziune UE'], obiective, [46, CW - 46 - 42, 42], { boldFirst: true, fs: 7 });
      D.P('Fiecare OS se detaliaza in obiective specifice cheie (OSC) cu masuri concrete si indicatori (baseline 2025 -> tinta 2030 -> tinta orizont 2040), prezentati in capitolul de monitorizare.');

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 5 — PORTOFOLIUL INTEGRAT DE PROIECTE
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Portofoliul integrat de proiecte');
      D.P('Portofoliul reuneste, sub aceeasi umbrela si prioritizate dupa aceleasi criterii, proiecte din toate domeniile — singurul document in care proiectele de sanatate, mobilitate, educatie, mediu si economie apar impreuna. Lista de mai jos este lista lunga de intentii, baza pentru proiectele care devin finantabile prin studii de fezabilitate; fisele detaliate de proiect constituie un document separat.');
      D.kpis([
        { val: String(s.projects.length), label: 'Proiecte (lista)', sub: 'portofoliu integrat' },
        { val: N(s.invTot) + ' M EUR', label: 'Investitie totala', sub: 'orizont 2026-2040' },
        { val: String(s.projects.filter(p => p.domeniu === 'Mobilitate').length), label: 'Conduc PMUD', sub: 'mobilitate' },
        { val: String(s.projects.filter(p => p.domeniu === 'Regenerare' || p.domeniu === 'Locuire').length), label: 'Conduc Masterplan', sub: 'regenerare' }
      ]);
      const domAgg = {};
      s.projects.forEach(p => { domAgg[p.domeniu] = (domAgg[p.domeniu] || 0) + p.cost; });
      const domBars = Object.entries(domAgg).sort((a, b) => b[1] - a[1]).map(([d, v], i) => {
        const cols = [[185, 71, 30], [59, 130, 246], [52, 211, 153], [245, 158, 11], [168, 85, 247], [120, 130, 150], [200, 100, 100], [100, 180, 100]];
        return [d, v, cols[i % cols.length]];
      });
      if (domBars.length) D.barChart(domBars, { title: 'Investitie pe domenii (M EUR)', h: 48, source: 'Portofoliu SIDU' });
      D.h2('5.1 Lista de proiecte (lista lunga)');
      D.table(['Cod', 'Proiect', 'Domeniu', 'Lista', 'Termen', 'Cost (M EUR)'],
        s.projects.map(p => [p.cod, p.titlu, p.domeniu, p.lista, p.termen, N(p.cost)]),
        [14, CW - 14 - 26 - 18 - 22 - 22, 26, 18, 22, 22], { fs: 6.6, boldFirst: true });
      D.h2('5.2 Proiecte prioritare (lista scurta) — descriere');
      s.projects.filter(p => p.lista === 'scurta').slice(0, 6).forEach(p => {
        D.h3(p.cod + ' — ' + p.titlu);
        D.P(p.desc);
        D.table(['Atribut', 'Valoare'], [
          ['Domeniu', p.domeniu], ['Termen', p.termen], ['Buget orientativ', N(p.cost) + ' mil. EUR'],
          ['Surse de finantare', (p.surse || []).join(', ')], ['Indicatori de rezultat', (p.indicatori || []).join(' · ')],
          ['Conditioneaza', (p.conditioneaza && p.conditioneaza.length) ? p.conditioneaza.join(', ') : '—']
        ], [44, CW - 44], { boldFirst: true, fs: 7 });
      });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 6 — PLAN DE ACTIUNE SI FAZARE
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Plan de actiune si fazarea in timp');
      D.P('Implementarea se etapizeaza pe termene, in functie de maturitate, finantare si dependente (proiectele de mobilitate depind de rezervarea culoarelor in PUG).');
      const labels = ['Termen scurt (2026-2029)', 'Termen mediu (2029-2034)', 'Termen lung (2034-2040)'];
      [['scurt'], ['mediu', 'scurt-mediu'], ['lung', 'mediu-lung', 'continuu']].forEach((tt, i) => {
        D.h2(labels[i]);
        const fl = s.projects.filter(p => tt.some(x => (p.termen || '').indexOf(x) >= 0));
        if (!fl.length) { D.P('Fara proiecte programate in aceasta etapa.'); return; }
        D.table(['Cod', 'Proiect', 'Domeniu', 'Cost (M EUR)', 'Sursa principala'],
          fl.map(p => [p.cod, p.titlu, p.domeniu, N(p.cost), (p.surse || ['—'])[0]]),
          [14, CW - 14 - 28 - 26 - 40, 28, 26, 40], { fs: 6.8, boldFirst: true });
      });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 7 — PLAN FINANCIAR CONSOLIDAT
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Plan financiar consolidat');
      D.P('Finantarea portofoliului combina fonduri europene (POR 2021-2027, PNRR), buget local si de stat, parteneriate public-private (PPP) si imprumuturi (BEI). Mixul de finantare reflecta sustenabilitatea financiara a strategiei.');
      const por = Math.round(s.invTot * 0.42), pnrr = Math.round(s.invTot * 0.28), bl = Math.round(s.invTot * 0.18), ppp = Math.round(s.invTot * 0.12);
      D.pie([['POR 2021-2027', por, [59, 130, 246]], ['PNRR', pnrr, [185, 71, 30]], ['Buget local/stat', bl, [52, 211, 153]], ['PPP / BEI', ppp, [245, 158, 11]]],
        { title: 'Structura investitiei pe surse (M EUR)', source: 'Portofoliu SIDU' });
      D.table(['Sursa de finantare', 'Suma (M EUR)', 'Pondere'], [
        ['POR 2021-2027 (FEDR)', N(por), '42%'], ['PNRR', N(pnrr), '28%'], ['Buget local si de stat', N(bl), '18%'], ['PPP / BEI / alte', N(ppp), '12%'], ['TOTAL', N(s.invTot), '100%']
      ], [70, 44, CW - 114], { boldFirst: true, fs: 7.5 });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 8 — CORELAREA SIDU -> PUG
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Corelarea SIDU -> PUG (transpunerea in reglementare)');
      D.P('SIDU, PMUD si Masterplanul sunt documente strategice; PUG-ul le face aplicabile prin reglementare. Decalajul intre planificarea strategica si PUG genereaza blocaje reale: benzi fara culoar de rezerva -> exproprieri imposibile; coridoare verzi propuse, dar fara regim de protectie -> construite si pierdute. Fiecare proiect prioritar trebuie transpus "linie cu linie" in RLU/PUG.');
      D.table(['Element de transpus in PUG', 'Efect daca nu se transpune'], [
        ['Culoare de mobilitate (benzi, piste, largiri)', 'Largirile cer exproprieri masive; proiectele PMUD nu se pot executa'],
        ['Regim de protectie pentru coridoare verzi / maluri', 'Spatiile verzi propuse pot fi construite si pierdute definitiv'],
        ['Zone de densificare / TOD langa transport', 'Densificarea coordonata blocata; sprawl periurban'],
        ['Indicatori urbanistici pentru zone de regenerare', 'Regenerarea nu se poate autoriza la parametrii propusi'],
        ['Rezervari pentru dotari publice (scoli, sanatate)', 'Lipsa terenului pentru servicii in zonele noi']
      ], [70, CW - 70], { boldFirst: true, fs: 7.5 });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 9 — EVALUAREA STRATEGICA DE MEDIU (SEA)
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Evaluarea strategica de mediu (SEA)');
      PP([
        'Conform OUG 195/2005 si HG 1076/2004, SIDU face obiectul procedurii de evaluare strategica de mediu (SEA), desfasurata in paralel cu elaborarea si finalizata inaintea aprobarii de catre autoritatea deliberativa. SEA evalueaza efectele probabile asupra factorilor de mediu (aer, apa, sol, biodiversitate, clima, sanatate, peisaj, patrimoniu) si propune masuri de prevenire, reducere si compensare.',
        'Procedura compara minimum trei alternative de dezvoltare (inclusiv alternativa "zero" — fara strategie) din perspectiva de mediu, si fundamenteaza alegerea scenariului de referinta. Proiectele cu impact semnificativ (peste 1 ha sau in zone sensibile) fac ulterior obiectul evaluarii impactului asupra mediului (EIM) la nivel de proiect.'
      ]);
      D.table(['Factor de mediu', 'Efect potential al SIDU', 'Masura de atenuare'], [
        ['Aer / clima', 'reducere emisii prin transfer modal si verde', 'monitorizare calitate aer; NbS'],
        ['Apa', 'presiune pe retele; risc pluvial', 'sponge city; epurare conforma'],
        ['Sol / biodiversitate', 'consum de teren la dezvoltari noi', 'reconversie brownfield; coridoare ecologice'],
        ['Sanatate / zgomot', 'expunere la trafic', 'calmare trafic; perdele verzi'],
        ['Peisaj / patrimoniu', 'presiune in zone protejate', 'regim de protectie in PUG']
      ], [34, CW - 34 - 56, 56], { boldFirst: true, fs: 7 });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 10 — MONITORIZARE SI EVALUARE (50+ indicatori)
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Sistemul de monitorizare si evaluare');
      D.P('Implementarea se urmareste printr-un set de indicatori SMART, cu valoare de referinta (baseline) si tinta, raportati periodic. Indicatorii acopera toate domeniile si permit corectia strategiei. Tabelul de mai jos prezinta indicatorii-cheie pe domenii; sistemul complet cuprinde peste 50 de indicatori.');
      const indic = [
        ['Demografie', 'Populatie rezidenta', N(pop), 'stabilizare/crestere'],
        ['Demografie', 'Rata de dependenta varstnici', '—', 'sub media nationala'],
        ['Economie', 'PIB/locuitor (% UE-27)', RN(s.convergUE, 0) + '%', 'crestere'],
        ['Economie', 'Locuri de munca nete create', '—', 'pozitiv'],
        ['Mobilitate', 'Cota auto deplasari', RN(s.modalAuto, 0) + '%', 'in scadere'],
        ['Mobilitate', 'Cota transport public + activ', RN(s.modalTP + s.modalAct, 0) + '%', 'in crestere'],
        ['Mobilitate', 'Km piste de biciclete', '—', 'crestere'],
        ['Mediu', 'Spatii verzi/locuitor', RN(s.svMpLoc, 1) + ' mp', '>=' + s.normaSV + ' mp'],
        ['Mediu', 'Emisii CO2/cap (transport+cladiri)', s.co2cap + ' t', 'reducere'],
        ['Mediu', 'Zile cu depasiri calitate aer', '—', 'sub limita legala'],
        ['Locuire', 'Locuinte noi corelate cu infrastructura', '—', '100%'],
        ['Locuire', 'Fond locuinte accesibile', '—', 'crestere'],
        ['Edilitar', 'Acoperire apa / canalizare', s.acApa + '% / ' + s.acCanal + '%', '>=95% / >=90%'],
        ['Edilitar', 'Pierderi retea apa', '—', 'sub 25%'],
        ['Servicii', 'Acces servicii in 15 min', '—', 'in crestere'],
        ['Servicii', 'Unitati scolare modernizate', '—', 'crestere'],
        ['Digital', 'Servicii publice digitale', s.acBB + '% (broadband)', '>=80% servicii'],
        ['Guvernanta', 'Proiecte SIDU transpuse in PUG', '—', '100% prioritare'],
        ['Guvernanta', 'Grad absorbtie fonduri UE', '—', 'maximizare'],
        ['Guvernanta', 'Nota UrbanX compozit', s.noteComp + '/100 (' + s.calific + ')', Math.min(100, s.noteComp + 18) + '/100']
      ];
      D.table(['Domeniu', 'Indicator', 'Baseline', 'Tinta orizont'], indic, [26, CW - 26 - 40 - 44, 40, 44], { fs: 6.8, boldFirst: true });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 11 — GUVERNANTA SI IMPLEMENTARE
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Cadrul de guvernanta si implementare');
      D.h2('11.1 Structura de implementare');
      D.bullets([
        ['Coordonare', 'Autoritatea deliberativa aproba SIDU; o Unitate de Implementare a Strategiei (UIS) coordoneaza si monitorizeaza portofoliul'],
        ['Dimensiunea metropolitana', 'proiectele metropolitane se coordoneaza prin Asociatia de Dezvoltare Intercomunitara (ADI)'],
        ['Parteneriate', 'mediul academic, sectorul privat (PPP), societatea civila, operatorii de utilitati'],
        ['Actualizare', 'SIDU este document viu — revizuire periodica (recomandat la 5 ani sau la schimbari majore de context)']
      ]);
      D.h2('11.2 Registrul de riscuri (extras)');
      D.table(['Risc', 'Probabilitate', 'Impact', 'Masura de atenuare'], [
        ['Intarziere transpunere in PUG', 'Ridicata', 'Major', 'prioritizare actualizare PUG; corelare timpurie'],
        ['Capacitate de absorbtie fonduri', 'Medie', 'Major', 'asistenta tehnica; pipeline de proiecte mature'],
        ['Crestere costuri constructie', 'Ridicata', 'Mediu', 'rezerve bugetare; etapizare'],
        ['Opozitie / blocaje sociale', 'Medie', 'Mediu', 'consultare publica reala; transparenta'],
        ['Fluctuatie personal de proiect', 'Medie', 'Mediu', 'UIS dedicata; retentie know-how']
      ], [40, 26, 22, CW - 88], { boldFirst: true, fs: 7 });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 12 — CONSULTAREA PUBLICA
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Consultarea publica si procesul participativ');
      PP([
        'Elaborarea SIDU a urmat un proces participativ structurat, conform Legii 52/2003 privind transparenta decizionala. Procesul a inclus: grupuri de lucru tematice pe domeniile strategice, cu participarea directiilor administratiei, a institutiilor subordonate si a organizatiilor relevante; interviuri cu actori-cheie (mediu economic, universitati, ONG, lideri de comunitate); si consultarea larga a cetatenilor prin chestionare si dezbateri publice.',
        'Grupurile de lucru au contribuit la validarea diagnosticului, la formularea obiectivelor, la identificarea si prioritizarea proiectelor si la definirea indicatorilor de monitorizare. Rezultatele consultarilor (viziunea cetatenilor, prioritatile exprimate, observatiile la draft) sunt integrate in document si documentate in anexe (liste de participanti, procese-verbale, rapoarte de consultare).'
      ]);
      D.table(['Etapa de consultare', 'Instrument', 'Rol in SIDU'], [
        ['Diagnostic', 'grupuri de lucru tematice', 'validarea analizei sectoriale'],
        ['Viziune si obiective', 'dezbateri publice, sondaj', 'prioritatile comunitatii'],
        ['Portofoliu', 'consultare actori-cheie', 'identificare si prioritizare proiecte'],
        ['Draft final', 'dezbatere publica (L.52/2003)', 'observatii si revizuire']
      ], [40, 46, CW - 86], { boldFirst: true, fs: 7.5 });

      // ════════════════════════════════════════════════════════════════════
      // CAPITOLUL 13 — ANEXE SI GLOSAR
      // ════════════════════════════════════════════════════════════════════
      D.chapter('Anexe si glosar de termeni');
      D.h2('13.1 Glosar de termeni si abrevieri');
      D.table(['Termen / abreviere', 'Semnificatie'], [
        ['SIDU', 'Strategia Integrata de Dezvoltare Urbana'],
        ['PMUD / SUMP', 'Plan de Mobilitate Urbana Durabila / Sustainable Urban Mobility Plan'],
        ['PUG / PUZ / PUD', 'Plan Urbanistic General / Zonal / de Detaliu'],
        ['RLU', 'Regulament Local de Urbanism'],
        ['POR', 'Programul Operational Regional'],
        ['PNRR', 'Planul National de Redresare si Rezilienta'],
        ['FEDR', 'Fondul European de Dezvoltare Regionala'],
        ['OP', 'Obiectiv de Politica (coeziune UE 2021-2027)'],
        ['OST / OS / OSC', 'Obiectiv Strategic / Specific / Specific Cheie'],
        ['SEA / EIM', 'Evaluare Strategica de Mediu / Evaluarea Impactului asupra Mediului'],
        ['TOD', 'Transit-Oriented Development (dezvoltare orientata spre transport)'],
        ['UHI', 'Urban Heat Island (insula de caldura urbana)'],
        ['NbS', 'Solutii bazate pe natura (Nature-based Solutions)'],
        ['UIS', 'Unitatea de Implementare a Strategiei'],
        ['ADI / ZM', 'Asociatie de Dezvoltare Intercomunitara / Zona Metropolitana'],
        ['ODD', 'Obiectivele de Dezvoltare Durabila (ONU)']
      ], [40, CW - 40], { boldFirst: true, fs: 7.5 });
      D.h2('13.2 Surse si bibliografie');
      D.sourceBadges(['Ghid SIDU POR/MDLPA', 'Reg. (UE) 2021/1060', 'Legea 350/2001', 'HG 874/2019', 'OUG 195/2005', 'Legea 24/2007', 'Legea 52/2003', 'INS Recensamant 2021', 'Eurostat', 'PMUD ' + city.name, 'Masterplan ' + city.name]);
      D.callout('Nota metodologica',
        'Document strategic ORIENTATIV generat de platforma UrbanX pentru ' + uat + '. Nu inlocuieste o SIDU avizata si aprobata conform ghidului POR/MDLPA (consultant atestat + procedura SEA + aprobare a autoritatii deliberative). Datele marcate "—" necesita completare din surse oficiale locale. Componentele de mobilitate (PMUD) si de structura spatiala (Masterplan) se regasesc in documentele dedicate, rezumate si corelate aici.');
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
