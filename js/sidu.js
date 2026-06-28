/* ============================================================================
 * UrbanX — SIDU (Strategia Integrată de Dezvoltare Urbană) — UMBRELA strategică.
 * SIDU = „constituția" orașului (10-15 ani): integrează toate domeniile și conduce
 * Masterplan (cartier) + PMUD (mobilitate), care trebuie transpuse în PUG (lege
 * spațială). E nivelul cel mai înalt. Modul complet: registru de proiecte pe domenii
 * + dashboard investiții + ierarhia SIDU→PMUD→PUG + verificarea coerenței (blocaje).
 * window.SIDU: registry · projects · dashboard · check · openPanel · chapter
 * Surse: ghid SIDU (POR/MDLPA) · HG 874/2019 · Legea 350/2001. Ex.: SIDU Iași (331 proiecte).
 * ========================================================================== */
(function (G) {
  'use strict';
  var DOMENII = {
    economie: { label: 'Economie & competitivitate', ico: '💼', drives: '' },
    mobilitate: { label: 'Mobilitate urbană', ico: '🚍', drives: 'PMUD' },
    regenerare: { label: 'Regenerare urbană & spații verzi', ico: '🌳', drives: 'Masterplan/LOISIR' },
    educatie: { label: 'Educație', ico: '🎓', drives: '' },
    sanatate: { label: 'Sănătate & social', ico: '🏥', drives: '' },
    locuire: { label: 'Locuire', ico: '🏘️', drives: 'PUG' },
    turism: { label: 'Turism & cultură', ico: '🏛️', drives: 'Patrimoniu' },
    infrastructura: { label: 'Infrastructură & digitalizare', ico: '🛠️', drives: 'PUG' }
  };
  var FUNDING = ['POR', 'PNRR', 'buget local', 'buget de stat', 'PPP', 'BEI'];
  var STATUS = { propus: 'propus', finantat: 'finanțat', in_executie: 'în execuție', finalizat: 'finalizat' };

  // seed real (proiecte publice SIDU Iași — exemplu)
  // structura unui SIDU real (ESTI București / ghid POR): 5 secțiuni
  var SECTIUNI = ['Context & analiză', 'Formularea strategiei (viziune)', 'Portofoliu de proiecte (listă lungă/scurtă/metropolitane)', 'Plan de acțiune', 'Mediu & monitorizare'];
  var TERMEN = { scurt: 'scurt (0-3 ani)', mediu: 'mediu (3-7 ani)', lung: 'lung (7-15 ani)' };
  var LISTA = { lunga: 'listă lungă', scurta: 'listă scurtă', metropolitan: 'metropolitan' };
  var SEED = [
    { name: 'Spital Regional de Urgență Iași (Moara de Vânt)', domain: 'sanatate', status: 'finantat', cost_mil: 350, funding: 'PNRR', priority: 1, termen: 'mediu', lista: 'scurta' },
    { name: 'Tren Metropolitan Iași (Lețcani–Ciurea–Tomești)', domain: 'mobilitate', status: 'finantat', cost_mil: 280, funding: 'PNRR', priority: 1, drives: 'PMUD', termen: 'mediu', lista: 'metropolitan' },
    { name: 'Tramvaie + autobuze electrice + benzi dedicate', domain: 'mobilitate', status: 'in_executie', cost_mil: 120, funding: 'POR', priority: 1, drives: 'PMUD', termen: 'scurt', lista: 'scurta' },
    { name: 'Iași Velocity — bike-sharing + piste velo metropolitane', domain: 'mobilitate', status: 'propus', cost_mil: 25, funding: 'POR', priority: 2, drives: 'PMUD', termen: 'scurt', lista: 'lunga' },
    { name: 'Regenerare maluri Bahlui (coridor verde)', domain: 'regenerare', status: 'propus', cost_mil: 60, funding: 'POR', priority: 1, drives: 'Masterplan/LOISIR', termen: 'mediu', lista: 'scurta' },
    { name: 'Superbloc-uri pilot (model Barcelona) — regenerare cartiere', domain: 'regenerare', status: 'propus', cost_mil: 15, funding: 'POR', priority: 2, drives: 'Masterplan/PMUD', termen: 'mediu', lista: 'lunga' },
    { name: 'Pol economic Aeroport + Parcuri Industriale (Miroslava/Holboca)', domain: 'economie', status: 'in_executie', cost_mil: 90, funding: 'PPP', priority: 1, termen: 'mediu', lista: 'metropolitan' },
    { name: 'Modernizare rețea școli/grădinițe (ex. Col. Gh. Asachi)', domain: 'educatie', status: 'finantat', cost_mil: 40, funding: 'PNRR', priority: 2, termen: 'scurt', lista: 'lunga' },
    { name: 'Autostrada A8 (Unirii) + A7 — conectivitate regională', domain: 'infrastructura', status: 'in_executie', cost_mil: 0, funding: 'buget de stat', priority: 1, drives: 'PUG', termen: 'lung', lista: 'metropolitan' }
  ];
  var KEY = 'urbanx_sidu_projects_v2';
  function load() { try { var v = localStorage.getItem(KEY); if (v == null) { var a = SEED.map(function (p, i) { return Object.assign({ id: 'sp_seed_' + i, seed: true }, p); }); localStorage.setItem(KEY, JSON.stringify(a)); return a; } return JSON.parse(v); } catch (e) { return SEED.slice(); } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var projects = {
    list: function () { return load(); },
    add: function (p) { var a = load(); p.id = 'sp' + Date.now(); a.push(p); save(a); return p; },
    remove: function (id) { save(load().filter(function (p) { return p.id !== id; })); }
  };
  function dashboard() {
    var ps = load(); var byDom = {}, byStatus = {}, byFund = {}, byTermen = {}, byLista = {}, total = 0;
    ps.forEach(function (p) { byDom[p.domain] = (byDom[p.domain] || 0) + 1; byStatus[p.status] = (byStatus[p.status] || 0) + 1; byFund[p.funding] = (byFund[p.funding] || 0) + (+p.cost_mil || 0); if (p.termen) byTermen[p.termen] = (byTermen[p.termen] || 0) + 1; if (p.lista) byLista[p.lista] = (byLista[p.lista] || 0) + 1; total += (+p.cost_mil || 0); });
    return { count: ps.length, total_mil: Math.round(total), by_domain: byDom, by_status: byStatus, by_funding: byFund, by_termen: byTermen, by_lista: byLista, drives_pmud: ps.filter(function (p) { return /PMUD/.test(p.drives || ''); }).length, drives_mp: ps.filter(function (p) { return /Masterplan/.test(p.drives || ''); }).length };
  }

  // verificarea coerentei (pastrata)
  var Q = [
    { k: 'sidu', t: 'Există o SIDU aprobată (strategia integrată 10-15 ani)?', gap: 'Fără SIDU, proiectele sunt punctuale, fără prioritizare și fără acces coerent la fonduri UE (POR).' },
    { k: 'pmud', t: 'Există PMUD aprobat și corelat cu SIDU?', gap: 'Fără PMUD corelat, mobilitatea nu detaliază viziunea SIDU; finanțarea (POR/PNRR) e blocată.' },
    { k: 'culoare', t: 'PUG-ul rezervă culoare pentru proiectele PMUD (benzi, piste, lărgiri)?', gap: 'BLOCAJ: fără culoar în PUG, lărgirile/benzile cer exproprieri — nu se pot autoriza.' },
    { k: 'metropolitan', t: 'Ansamblurile din zona metropolitană au străzi corelate cu PMUD?', gap: 'Străzi prea înguste → autobuzul metropolitan nu intră → ambuteiaje la intrările în oraș.' },
    { k: 'transpunere', t: 'Proiectele prioritare SIDU sunt transpuse în RLU/PUG?', gap: 'Proiectele netranspuse în regulamentul de construire rămân pe hârtie / se contestă.' },
    { k: 'verde', t: 'Coridoarele verzi / malurile au regim de protecție în PUG?', gap: 'Fără regim în PUG, coridoarele verzi propuse în SIDU pot fi construite — pierdute.' }
  ];
  function check(ans) { ans = ans || {}; var gaps = Q.filter(function (q) { return ans[q.k] === false; }); var yes = Q.filter(function (q) { return ans[q.k] === true; }).length; var score = Math.round(yes / Q.length * 100); return { score: score, gaps: gaps, verdict: score >= 80 ? 'coerent' : score >= 50 ? 'parțial — risc de blocaje' : 'necorelat — blocaje majore' }; }

  // ── caseta "Document subordonat SIDU" ELIMINATA la cererea beneficiarului ──
  // Se suprapunea peste coperta MP/PMUD (caseta alba). No-op pastrat pt compatibilitate API.
  function subordinationNote(D) { return; }

  // ════════════ DOCUMENT SIDU STANDALONE (umbrela, peste MP + PMUD) ════════════
  function _resolveCity(cityKey) {
    cityKey = cityKey || (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    var c = (G._RO_CITIES_DB && G._RO_CITIES_DB[cityKey]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[cityKey]) || {};
    return { key: cityKey, name: c.name || (G.TCI && G.TCI.cityName) || 'UAT', pop: c.pop2021 || c.pop || c.populatie || 0, judet: c.judet || '', c: c };
  }
  // Document SIDU COMPLET (multi-capitol, PDF) — pe motorul strategic _makeStratDoc,
  // ACELAȘI tipar dens ca Masterplanul / PMUD (cuprins, antet/subsol, justify, grafice).
  function generateDocument(cityKey) {
    // SIDU COMPLET (document-umbrelă peste MP+PMUD) — generatorul dedicat _StratSIDU
    // (13 capitole, 8 domenii, portofoliu parametric/UAT). Acesta e documentul principal.
    if (G._StratSIDU && G._StratSIDU.generate) {
      try {
        var sc = (G._ProjectionEngine && G._ProjectionEngine.currentScenario) || 'S2';
        return G._StratSIDU.generate(cityKey || (G.TCI && G.TCI.cityKey) || _resolveCity().key, sc);
      } catch (e) { console.warn('[SIDU] _StratSIDU esuat → fallback intern', e); }
    }
    try {
      var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!J) { alert('jsPDF indisponibil'); return; }
      if (typeof G._makeStratDoc !== 'function') { console.warn('[SIDU] motor strategic indisponibil → fallback simplu'); return _generateDocumentSimple(cityKey); }
      var city = _resolveCity(cityKey), d = dashboard(), ps = projects.list();
      var c = city.c || {};
      var pop21 = +city.pop || 0, pop11 = +(c.pop2011 || 0);
      var delta = (pop21 && pop11) ? ((pop21 - pop11) / pop11 * 100) : null;
      var tip = c.tip || '', regiune = c.regiune || '', judet = city.judet || c.judet || '';
      var dateStr = new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
      var iso = new Date().toISOString().split('T')[0];

      // agregări portofoliu pentru grafice
      var costByDom = {}, cntByDom = {};
      ps.forEach(function (p) { costByDom[p.domain] = (costByDom[p.domain] || 0) + (+p.cost_mil || 0); cntByDom[p.domain] = (cntByDom[p.domain] || 0) + 1; });
      var domShort = { economie: 'Economie', mobilitate: 'Mobilitate', regenerare: 'Regenerare', educatie: 'Educație', sanatate: 'Sănătate', locuire: 'Locuire', turism: 'Turism', infrastructura: 'Infrastr.' };

      var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.__doc = 'SIDU ' + city.name;
      var D = G._makeStratDoc(pdf, { docTitle: 'SIDU — STRATEGIA INTEGRATĂ DE DEZVOLTARE URBANĂ', cityName: city.name, accent: [96, 165, 250] });
      var N = D.N, Pct = D.Pct;
      var W = 210, H = 297, F = G._registerROFont ? 'DejaVuRO' : 'helvetica';

      // ── COPERTĂ (pagina 1) ──
      D.setSuppress(true); D.setPage(1);
      pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, H, 'F');
      pdf.setFillColor(96, 165, 250); pdf.rect(0, 92, W, 1.5, 'F');
      pdf.setFont(F, 'bold'); pdf.setFontSize(11); pdf.setTextColor(96, 165, 250); pdf.text('STRATEGIA INTEGRATĂ DE DEZVOLTARE URBANĂ', W / 2, 78, { align: 'center' });
      pdf.setFontSize(40); pdf.setTextColor(255); pdf.text('SIDU', W / 2, 120, { align: 'center' });
      pdf.setFontSize(20); pdf.text(city.name, W / 2, 134, { align: 'center' });
      pdf.setFont(F, 'normal'); pdf.setFontSize(11); pdf.setTextColor(160, 175, 200); pdf.text('„Constituția" dezvoltării urbane · orizont 10-15 ani', W / 2, 146, { align: 'center' });
      pdf.setFontSize(9); pdf.setTextColor(120, 135, 165); pdf.text('Cadrul-umbrelă peste Masterplan și PMUD · integrează toate domeniile', W / 2, 156, { align: 'center' });
      // box KPI sintetic pe copertă
      pdf.setDrawColor(96, 165, 250); pdf.setLineWidth(0.3); pdf.roundedRect(38, 178, W - 76, 30, 2, 2, 'S');
      var cw4 = (W - 76) / 4;
      [[city.pop ? N(city.pop) : '—', 'populație 2021'], ['' + d.count, 'proiecte'], [d.total_mil + ' M€', 'investiție'], ['' + Object.keys(DOMENII).length, 'domenii']].forEach(function (it, i) {
        var bx = 38 + i * cw4; pdf.setFont(F, 'bold'); pdf.setFontSize(15); pdf.setTextColor(96, 165, 250); pdf.text(String(it[0]), bx + cw4 / 2, 191, { align: 'center' });
        pdf.setFont(F, 'normal'); pdf.setFontSize(7); pdf.setTextColor(160, 175, 200); pdf.text(it[1], bx + cw4 / 2, 197, { align: 'center' });
      });
      pdf.setFontSize(9); pdf.setTextColor(120, 135, 165); pdf.text(dateStr, W / 2, 270, { align: 'center' });
      pdf.setFontSize(7.5); pdf.setTextColor(90, 105, 135); pdf.text('Generat de platforma UrbanX · document strategic orientativ', W / 2, 277, { align: 'center' });
      D.setSuppress(false);
      var coverPages = 1;

      // ═══ CAP. 1 — INTRODUCERE & CADRU METODOLOGIC ═══
      D.chapter('Introducere și cadrul metodologic');
      D.h2('Scopul și rolul documentului');
      D.P('Strategia Integrată de Dezvoltare Urbană (SIDU) este documentul-cadru de nivel superior care definește viziunea, ' +
        'obiectivele și portofoliul integrat de proiecte ale unei comunități pe un orizont de 10-15 ani. SIDU este „constituția" ' +
        'dezvoltării urbane: integrează simultan toate domeniile — economie, mobilitate, regenerare urbană, educație, sănătate, ' +
        'locuire, turism și infrastructură — și asigură coerența între intervenții. Spre deosebire de documentele subordonate, ' +
        'SIDU nu detaliază o singură componentă, ci stabilește prioritățile și logica de ansamblu.');
      D.h2('Poziționarea în ierarhia documentelor strategice și spațiale');
      D.bullets([
        ['SIDU', 'document-umbrelă, strategic, multisectorial (10-15 ani) — stabilește viziunea și portofoliul integrat.'],
        ['Masterplan', 'componentă subordonată — aprofundează regenerarea unui cartier / zonă (formă urbană, spațiu public).'],
        ['PMUD', 'componentă subordonată — detaliază mobilitatea durabilă (model SUMP/ELTIS, HG 874/2019).'],
        ['PUG / RLU', 'instrumentul legal care face aplicabile proiectele — fără transpunere în PUG, proiectele SIDU rămân neautorizabile.']
      ]);
      D.callout('Principiul cheie', 'SIDU, Masterplanul și PMUD sunt documente de planificare strategică; PUG-ul este documentul de reglementare spațială. ' +
        'Coerența SIDU → PMUD/Masterplan → PUG este condiția pentru accesarea fondurilor (POR/PNRR) și pentru autorizare.', [96, 130, 200]);
      D.h2('Cadrul metodologic');
      D.P('Documentul urmează logica standard a strategiilor integrate (ghidul POR/MDLPA, model ESTI/SIDU pentru municipii): ' +
        'analiză-diagnostic → analiză SWOT → viziune → obiective strategice și specifice → portofoliu de proiecte (listă lungă/scurtă/' +
        'metropolitan) → plan de acțiune și fazare → plan financiar → cadru de implementare și guvernanță → monitorizare și evaluare.');
      D.sourceBadges(['Ghid SIDU — POR/MDLPA', 'Legea 350/2001', 'HG 874/2019', 'Cadru SDG 11 ONU', 'EU Green Deal', 'New European Bauhaus']);

      // ═══ CAP. 2 — DIAGNOSTIC TERITORIAL ȘI SOCIO-ECONOMIC ═══
      D.chapter('Analiza-diagnostic teritorială și socio-economică');
      D.P('Diagnosticul stabilește profilul actual al comunității și fundamentează prioritățile. Indicatorii de mai jos provin din ' +
        'recensămintele INS (2011, 2021) și din baza teritorială a platformei; acolo unde o valoare nu este disponibilă oficial, ' +
        'este marcată cu „—" pentru a evita estimări nefondate.');
      D.kpis([
        { label: 'Populație (2021)', val: pop21 ? N(pop21) : '—', sub: 'INS Rec. 2021' },
        { label: 'Populație (2011)', val: pop11 ? N(pop11) : '—', sub: 'INS Rec. 2011' },
        { label: 'Variație 2011→2021', val: delta != null ? Pct(delta) : '—', sub: 'calcul direct' },
        { label: 'Categorie UAT', val: tip ? tip.replace(/_/g, ' ') : '—', sub: regiune ? 'regiunea ' + regiune : '' }
      ]);
      D.h2('Demografie');
      D.P('Dinamica populației este punctul de plecare al oricărei strategii: determină cererea de locuințe, de servicii publice ' +
        '(educație, sănătate) și de mobilitate. ' +
        (delta != null
          ? ('Între recensămintele 2011 și 2021, ' + city.name + ' a înregistrat o variație de ' + Pct(delta) + ' a populației de domiciliu' +
            (delta < 0 ? ', tendință de declin care impune politici de retenție a populației active și de regenerare a fondului construit.' :
              ', tendință de creștere care impune corelarea dezvoltării imobiliare cu infrastructura tehnico-edilitară și de mobilitate.'))
          : 'Datele de recensământ trebuie completate la nivel local pentru o caracterizare demografică completă.'));
      if (pop11 && pop21) {
        D.lineChart([{ name: 'Populație', color: [96, 165, 250], points: [pop11, pop21] }], ['2011', '2021'],
          { title: 'Evoluția populației (recensăminte)', source: 'INS — Recensăminte 2011 și 2021' });
      }
      D.h2('Economie, locuire și infrastructură');
      D.bullets([
        ['Economie & competitivitate', 'profilul economic local (ocupare, firme active, poli de creștere) determină capacitatea de finanțare și atractivitatea — se documentează din INS TEMPO și ONRC.'],
        ['Locuire', 'fondul de locuințe, vârsta și gradul de ocupare; corelarea autorizărilor de construire cu rețelele edilitare.'],
        ['Infrastructură tehnico-edilitară', 'acoperirea cu apă-canal, energie, gaz, telecomunicații; capacitatea de a susține noile dezvoltări.'],
        ['Mediu & spații verzi', 'suprafața verde pe locuitor (țintă OMS ≥ 26 mp/loc), expunerea la riscuri (inundații, seismic, insule de căldură urbană).'],
        ['Mobilitate', 'distribuția modală, gradul de motorizare și acoperirea cu transport public — detaliate în PMUD subordonat.']
      ]);
      D.source('INS Recensăminte 2011/2021 · INS TEMPO · Eurostat Urban Audit · baza teritorială UrbanX (PUG/OSM)');

      // ═══ CAP. 3 — ANALIZA SWOT INTEGRATĂ ═══
      D.chapter('Analiza SWOT integrată');
      D.P('Analiza SWOT sintetizează diagnosticul pe cele patru cadrane și fundamentează obiectivele strategice. Este integrată — ' +
        'acoperă toate domeniile, nu doar mobilitatea sau regenerarea.');
      D.table(['Cadran', 'Elemente reprezentative (multisectoriale)'], [
        ['Puncte tari', 'capital uman / universitar; poziție regională; patrimoniu cultural; proiecte majore în execuție (spital, tren metropolitan).'],
        ['Puncte slabe', 'decalaj SIDU/PMUD ↔ PUG (culoare nerezervate); fond construit învechit; suprafață verde/locuitor sub țintă; congestie la intrările în oraș.'],
        ['Oportunități', 'fonduri UE (POR 2021-2027, PNRR); zona metropolitană; modele 15-minute / superbloc; digitalizare și economie verde.'],
        ['Amenințări', 'declin/îmbătrânire demografică (după caz); expansiune necontrolată periurbană; schimbări climatice (UHI, inundații); blocaje de autorizare.']
      ], [30, D.dims.CW - 30], { boldFirst: true });

      // ═══ CAP. 4 — VIZIUNEA DE DEZVOLTARE ═══
      D.chapter('Viziunea de dezvoltare (10-15 ani)');
      D.callout('Viziune', 'Un oraș verde, conectat și competitiv economic, cu servicii publice la standard european, în care fiecare ' +
        'locuitor are acces în 15 minute la serviciile esențiale, dezvoltarea imobiliară este corelată cu infrastructura, iar spațiul ' +
        'public și natura urbană sunt prioritare. ' + city.name + ' — comunitate rezilientă, incluzivă și atractivă pentru generația activă.', [96, 165, 250]);
      D.h2('Principii directoare');
      D.bullets([
        ['Oraș al proximității (15 minute)', 'servicii esențiale accesibile pe jos/velo în 15 minute (C. Moreno).'],
        ['Oraș verde și rezilient', 'infrastructură verde-albastră, regula 3-30-300, adaptare climatică (sponge city).'],
        ['Oraș conectat', 'transport public eficient, mobilitate activă, navetă metropolitană integrată (PMUD).'],
        ['Oraș competitiv și inteligent', 'economie diversificată, digitalizare, poli de inovare.'],
        ['Oraș incluziv', 'locuire accesibilă, servicii sociale, participare publică.']
      ]);
      D.P('Viziunea se aliniază Obiectivului de Dezvoltare Durabilă 11 (ONU — orașe și comunități durabile), Pactului Verde European ' +
        'și inițiativei New European Bauhaus (sustenabil, frumos, împreună).');

      // ═══ CAP. 5 — OBIECTIVE STRATEGICE ȘI SPECIFICE ═══
      D.chapter('Obiective strategice și specifice (pe domenii)');
      D.P('Fiecărui domeniu integrat îi corespund obiective specifice, ținte și indicatori. Domeniile sunt cele 8 ale strategiei integrate:');
      var objByDom = {
        economie: 'Creșterea competitivității și a numărului de locuri de muncă; poli economici și de inovare.',
        mobilitate: 'Transfer modal spre transport public și mobilitate activă; reducerea congestiei și a emisiilor (→ PMUD).',
        regenerare: 'Regenerarea cartierelor și a fondului construit; creșterea suprafeței verzi/locuitor (→ Masterplan/LOISIR).',
        educatie: 'Modernizarea infrastructurii educaționale și reducerea abandonului școlar.',
        sanatate: 'Acces echitabil la servicii medicale; pol medical regional.',
        locuire: 'Locuire accesibilă și de calitate, corelată cu infrastructura (→ PUG).',
        turism: 'Valorificarea patrimoniului cultural și dezvoltarea turismului urban.',
        infrastructura: 'Modernizarea rețelelor edilitare și digitalizarea serviciilor (→ PUG).'
      };
      D.table(['Domeniu', 'Obiectiv specific', 'Conduce'], Object.keys(DOMENII).map(function (k) {
        return [(DOMENII[k].ico || '') + ' ' + DOMENII[k].label, objByDom[k] || '—', DOMENII[k].drives || '—'];
      }), [42, D.dims.CW - 42 - 26, 26], { boldFirst: true });

      // ═══ CAP. 6 — PORTOFOLIUL DE PROIECTE ═══
      D.chapter('Portofoliul integrat de proiecte');
      D.P('Portofoliul reunește, sub aceeași umbrelă, proiecte din toate domeniile, prioritizate pe liste (lungă → scurtă → metropolitan) ' +
        'și pe termen de implementare. Acesta corespunde componentei centrale a SIDU (model SIDU Iași — 331 proiecte).');
      D.kpis([
        { label: 'Proiecte', val: '' + d.count, sub: 'în portofoliu' },
        { label: 'Investiție totală', val: d.total_mil + ' M€', sub: 'cumulat' },
        { label: 'Conduc PMUD', val: '' + d.drives_pmud, sub: 'mobilitate' },
        { label: 'Conduc Masterplan', val: '' + d.drives_mp, sub: 'regenerare' }
      ]);
      // grafic: investiție pe domeniu
      var domBars = Object.keys(costByDom).filter(function (k) { return costByDom[k] > 0; })
        .sort(function (a, b) { return costByDom[b] - costByDom[a]; })
        .map(function (k, i) { return [domShort[k] || k, costByDom[k], D.PAL[i % D.PAL.length]]; });
      if (domBars.length) D.barChart(domBars, { title: 'Investiție pe domenii (M€)', vfmt: function (v) { return N(v); }, source: 'Portofoliu SIDU — platformă UrbanX' });
      // tabel proiecte complet
      D.h2('Lista de proiecte');
      var prows = ps.map(function (p) { var dm = DOMENII[p.domain] || {}; return [p.name, dm.label || p.domain, (LISTA[p.lista] || '—'), (TERMEN[p.termen] || '—').replace(/\s*\(.*\)/, ''), (p.cost_mil ? p.cost_mil + ' M€' : '—'), STATUS[p.status] || p.status]; });
      D.table(['Proiect', 'Domeniu', 'Listă', 'Termen', 'Cost', 'Status'], prows, [52, 30, 22, 18, 22, 28], { boldFirst: true });

      // ═══ CAP. 7 — PLAN DE ACȚIUNE & FAZARE ═══
      D.chapter('Planul de acțiune și fazarea în timp');
      D.P('Implementarea se etapizează pe termene, în funcție de maturitate, finanțare și dependențe (ex. proiectele de mobilitate ' +
        'depind de rezervarea culoarelor în PUG).');
      var byT = { scurt: [], mediu: [], lung: [] }; ps.forEach(function (p) { if (byT[p.termen]) byT[p.termen].push(p); });
      ['scurt', 'mediu', 'lung'].forEach(function (t) {
        D.h2('Termen ' + (TERMEN[t] || t));
        if (byT[t].length) D.bullets(byT[t].map(function (p) { return [p.name, (DOMENII[p.domain] ? DOMENII[p.domain].label : p.domain) + (p.cost_mil ? ' · ' + p.cost_mil + ' M€' : '') + ' · ' + (STATUS[p.status] || p.status)]; }));
        else D.P('Nu există proiecte alocate acestui termen în portofoliul curent.');
      });

      // ═══ CAP. 8 — PLAN FINANCIAR & SURSE ═══
      D.chapter('Planul financiar și sursele de finanțare');
      D.P('Finanțarea portofoliului combină fonduri europene (POR 2021-2027, PNRR), buget local și de stat, parteneriate ' +
        'public-privat (PPP) și împrumuturi (BEI). Mixul de finanțare este un indicator al sustenabilității financiare a strategiei.');
      var fundSlices = Object.keys(d.by_funding || {}).filter(function (k) { return d.by_funding[k] > 0; })
        .map(function (k, i) { return [k, Math.round(d.by_funding[k]), D.PAL[i % D.PAL.length]]; });
      if (fundSlices.length) D.pie(fundSlices, { title: 'Structura investiției pe surse de finanțare (M€)', source: 'Portofoliu SIDU' });
      else D.P('Costurile pe surse de finanțare se completează pe măsură ce proiectele sunt bugetate.');
      D.kpis([
        { label: 'Investiție totală', val: d.total_mil + ' M€', sub: 'portofoliu' },
        { label: 'Surse distincte', val: '' + Object.keys(d.by_funding || {}).length, sub: 'finanțare' },
        { label: 'Proiecte finanțate', val: '' + ((d.by_status || {}).finantat || 0), sub: 'asigurate' },
        { label: 'În execuție', val: '' + ((d.by_status || {}).in_executie || 0), sub: 'active' }
      ]);

      // ═══ CAP. 9 — CORELAREA SIDU ↔ MASTERPLAN ↔ PMUD ↔ PUG ═══
      D.chapter('Corelarea SIDU → Masterplan / PMUD → PUG');
      D.P('SIDU este umbrela; PMUD detaliază mobilitatea; Masterplanul aprofundează regenerarea de cartier; PUG-ul le face aplicabile ' +
        '(regim de construire). Decalajul dintre planificarea strategică și reglementarea spațială (PUG) generează blocaje reale: benzi ' +
        'fără culoar de rezervă → exproprieri imposibile; ansambluri în comune cu străzi unde autobuzul metropolitan nu intră; coridoare ' +
        'verzi propuse, dar fără regim de protecție în PUG → construite și pierdute.');
      D.h2('Verificarea coerenței (riscuri de blocaj)');
      D.P('Întrebările de mai jos sunt cheile coerenței strategie → PUG; un răspuns negativ semnalează un blocaj de transpunere care trebuie remediat la actualizarea PUG/RLU.');
      D.table(['Verificare', 'Risc dacă nu este îndeplinită'], Q.map(function (q) { return [q.t.replace(/\?$/, ''), q.gap]; }), [70, D.dims.CW - 70], { boldFirst: true });
      D.callout('Recomandare', 'Fiecare proiect prioritar din portofoliu trebuie transpus „linie cu linie" în RLU/PUG (culoare de mobilitate, ' +
        'regim de protecție pentru coridoarele verzi, indicatori urbanistici pentru zonele de regenerare). Altfel proiectele rămân nefinanțabile/neautorizabile.', [96, 130, 200]);

      // ═══ CAP. 10 — IMPLEMENTARE & GUVERNANȚĂ ═══
      D.chapter('Cadrul de implementare și guvernanță');
      D.bullets([
        ['Coordonare', 'Primăria / Consiliul Local aprobă SIDU și coordonează implementarea; o structură dedicată (unitate de management) monitorizează portofoliul.'],
        ['Dimensiunea metropolitană', 'proiectele metropolitane se coordonează prin Asociația de Dezvoltare Intercomunitară (ADI) și se corelează cu UAT-urile vecine.'],
        ['Parteneriate', 'mediul academic, sectorul privat (PPP), societatea civilă și operatorii de utilități.'],
        ['Participare publică', 'consultarea comunității în etapele cheie (viziune, portofoliu, monitorizare) — transparență și acceptare socială.'],
        ['Actualizare', 'SIDU este un document viu: portofoliul și prioritățile se revizuiesc periodic (recomandat la 2-3 ani).']
      ]);

      // ═══ CAP. 11 — MONITORIZARE & EVALUARE ═══
      D.chapter('Monitorizare, evaluare și mediu');
      D.P('Implementarea se urmărește printr-un set de indicatori SMART, cu valoare de referință (baseline) și țintă, raportați periodic. ' +
        'Indicatorii acoperă toate domeniile și permit corecția strategiei.');
      D.table(['Indicator', 'Unitate / țintă orientativă'], [
        ['Suprafață verde / locuitor', 'mp/loc · țintă ≥ 26 (OMS)'],
        ['Acces servicii în 15 minute', '% populație · țintă în creștere'],
        ['Transfer modal spre TP + activ', '% deplasări · țintă PMUD'],
        ['Locuințe noi corelate cu infrastructura', '% autorizări · țintă 100%'],
        ['Reducere emisii CO₂ (transport+clădiri)', 't CO₂/an · trend descrescător'],
        ['Proiecte SIDU transpuse în PUG', '% portofoliu prioritar · țintă 100%'],
        ['Grad de absorbție fonduri UE', '% alocare · maximizare']
      ], [70, D.dims.CW - 70], { boldFirst: true });
      D.h2('Evaluarea de mediu');
      D.P('Strategia și proiectele cu impact semnificativ (peste 1 ha sau în zone sensibile) fac obiectul evaluării de mediu — evaluarea ' +
        'strategică de mediu (SEA) pentru documentul de planificare și evaluarea impactului (EIA) pentru proiecte, conform OUG 195/2005 ' +
        'și legislației subsecvente.');

      // ═══ CAP. 12 — CONCLUZII & CADRU LEGAL ═══
      D.chapter('Concluzii și cadru legal');
      D.P('SIDU oferă cadrul coerent care transformă proiectele punctuale într-o strategie integrată, finanțabilă și autorizabilă. ' +
        'Condiția de succes este transpunerea consecventă în PUG/RLU și monitorizarea continuă a indicatorilor. ' + city.name +
        ' dispune de premisele necesare (proiecte majore în derulare, dimensiune metropolitană, acces la fonduri UE) pentru o ' +
        'dezvoltare urbană durabilă pe orizontul 2025-2040.');
      D.sourceBadges(['Ghid SIDU — POR/MDLPA', 'Legea 350/2001 (PUG/PUZ)', 'HG 874/2019 (mobilitate)', 'OUG 195/2005 (mediu)', 'Model ESTI București', 'INS Recensăminte 2011/2021', 'Eurostat Urban Audit', 'SDG 11 ONU']);
      D.callout('Notă', 'Document strategic ORIENTATIV generat de platforma UrbanX. Nu înlocuiește o SIDU avizată/aprobată de Consiliul Local ' +
        'conform ghidului POR/MDLPA. Datele marcate „—" necesită completare din surse oficiale locale. Generat: ' + dateStr + '.', [158, 100, 20]);

      // ── CUPRINS (inserat după copertă) ──
      G._buildStratTOC(D, coverPages);

      try { G.__siduPages = pdf.getNumberOfPages(); } catch (e) {}
      var slug = (G._asciiFile ? G._asciiFile(city.name) : (city.name || 'UAT')).replace(/[^a-zA-Z0-9._-]/g, '_');
      pdf.save(G._stratFileName ? G._stratFileName('SIDU', { territorial: true, localitate: city.name }) : ('SIDU_' + slug + '.pdf'));
      G.ss && G.ss('📜 Document SIDU generat: ' + pdf.getNumberOfPages() + ' pagini · ' + city.name);
    } catch (e) { try { G.__siduErr = (e && e.stack) || (e && e.message) || String(e); } catch (_) {} console.warn('[SIDU] document', e); alert('Eroare la generarea documentului SIDU: ' + e.message); }
  }

  // Fallback simplu (dacă motorul strategic nu e încărcat) — păstrat minimal.
  function _generateDocumentSimple(cityKey) {
    try {
      var jsPDFns = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!jsPDFns) { alert('jsPDF indisponibil'); return; }
      var city = _resolveCity(cityKey), d = dashboard();
      var pdf = new jsPDFns({ unit: 'mm', format: 'a4' }); if (G._registerROFont) G._registerROFont(pdf);
      var W = 210, H = 297, F = G._registerROFont ? 'DejaVuRO' : 'helvetica';
      pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, H, 'F');
      pdf.setFont(F, 'bold'); pdf.setFontSize(40); pdf.setTextColor(255); pdf.text('SIDU', W / 2, 120, { align: 'center' });
      pdf.setFontSize(20); pdf.text(city.name, W / 2, 134, { align: 'center' });
      pdf.setFont(F, 'normal'); pdf.setFontSize(10); pdf.setTextColor(160, 175, 200);
      pdf.text('Document SIDU — motor strategic indisponibil; reîncărcați pagina.', W / 2, 160, { align: 'center' });
      pdf.save('SIDU_' + (city.name || 'UAT').replace(/[^\w]+/g, '_') + '.pdf');
      G.ss && G.ss('📜 Document SIDU (minimal) generat');
    } catch (e) { console.warn('[SIDU] simple', e); alert('Eroare SIDU: ' + e.message); }
  }

  // ════════════ DOCUMENT SIDU — EXPORT WORD (.doc, client-side) ════════════
  // Mecanism client-only (ca tot restul platformei): HTML + Blob application/msword.
  // Word deschide nativ .doc-ul cu stiluri, titluri (navigabile), tabel portofoliu.
  function generateDocx(cityKey) {
    try {
      var city = _resolveCity(cityKey), d = dashboard(), ps = projects.list();
      var N = function (n) { try { return Math.round(n).toLocaleString('ro-RO'); } catch (e) { return '' + n; } };
      var dateStr = new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' });
      var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
      var H1 = function (t) { return '<h1>' + esc(t) + '</h1>'; };
      var H2 = function (t) { return '<h2>' + esc(t) + '</h2>'; };
      var P = function (t) { return '<p class="bt">' + esc(t) + '</p>'; };
      function table(hdr, rows) {
        return '<table><thead><tr>' + hdr.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
      }
      var b = '';
      // copertă
      b += '<div class="cover"><div class="cl">STRATEGIA INTEGRATĂ DE DEZVOLTARE URBANĂ</div>' +
        '<div class="cb">SIDU</div><div class="cn">' + esc(city.name) + '</div>' +
        '<div class="cs">„Constituția" dezvoltării urbane · orizont 10-15 ani</div>' +
        '<div class="cs2">Cadrul-umbrelă peste Masterplan și PMUD · integrează toate domeniile</div>' +
        '<div class="cd">' + dateStr + '</div></div><br clear="all" style="page-break-before:always">';
      // cuprins (titlurile H1/H2 devin navigabile în Word)
      b += H2('Cuprins');
      b += '<p class="bt">' + SECTIUNI.map(function (s, i) { return (i + 1) + '. ' + esc(s); }).join('<br>') + '</p>';
      b += '<br clear="all" style="page-break-before:always">';
      // 1. Context
      b += H1('1. Context și analiză (radiografia comunității)');
      b += P('SIDU pornește de la o radiografie completă a comunității: demografie, economie, infrastructură, mediu și calitatea vieții. Spre deosebire de PMUD (exclusiv mobilitate) și de Masterplan (regenerarea unui cartier), SIDU integrează absolut toate domeniile și stabilește prioritățile pe 10-15 ani.');
      b += table(['Indicator', 'Valoare'], [
        ['Populație', city.pop ? N(city.pop) + ' loc.' : '—'],
        ['Proiecte strategice în portofoliu', '' + d.count],
        ['Investiție portofoliu', d.total_mil + ' M€'],
        ['Domenii integrate', '' + Object.keys(DOMENII).length]
      ]);
      b += P('Domeniile acoperite: ' + Object.keys(DOMENII).map(function (k) { return DOMENII[k].label; }).join(' · ') + '.');
      // 2. Viziune
      b += H1('2. Formularea strategiei (viziunea pe 10-15 ani)');
      b += P('Viziune: un oraș verde, conectat și competitiv economic, cu servicii publice la standard european, în care fiecare locuitor are acces în 15 minute la servicii esențiale, iar dezvoltarea imobiliară este corelată cu infrastructura. SIDU spune „ce vrem să devină orașul"; PMUD detaliază componenta de mobilitate; Masterplanul detaliază regenerarea de cartier.');
      // 3. Portofoliu
      b += H1('3. Portofoliul de proiecte (listă lungă / scurtă / metropolitane)');
      b += P('Portofoliul integrat reunește, sub aceeași umbrelă, proiecte din toate domeniile (model SIDU Iași — 331 proiecte). Prioritizare pe liste (lungă → scurtă → metropolitane) și pe termen de implementare.');
      b += table(['Proiect', 'Domeniu', 'Listă', 'Termen', 'Cost', 'Status'], ps.map(function (p) {
        var dm = DOMENII[p.domain] || {};
        return [p.name, dm.label || p.domain, (LISTA[p.lista] || '—'), (TERMEN[p.termen] || '—').replace(/\s*\(.*\)/, ''), (p.cost_mil ? p.cost_mil + ' M€' : '—'), STATUS[p.status] || p.status];
      }));
      // 4. Plan de acțiune
      b += H1('4. Plan de acțiune (fazare pe termene)');
      var byT = { scurt: [], mediu: [], lung: [] }; ps.forEach(function (p) { if (byT[p.termen]) byT[p.termen].push(p); });
      ['scurt', 'mediu', 'lung'].forEach(function (t) { b += P('Termen ' + (TERMEN[t] || t) + ': ' + (byT[t].length ? byT[t].map(function (p) { return p.name; }).join('; ') : '—') + '.'); });
      // 5. Ierarhie
      b += H1('5. Ierarhia SIDU → PMUD → PUG și corelarea');
      b += P('SIDU este umbrela mare. PMUD preia componenta de transport și o detaliază matematic. Masterplanul aprofundează un cartier. Niciunul nu emite autorizații — pentru reguli stricte de construire se folosește PUG-ul, cu care SIDU și PMUD trebuie corelate obligatoriu. Decalajul SIDU/PMUD ↔ PUG creează blocaje reale (benzi fără culoar de rezervă → exproprieri; ansambluri în comune cu străzi unde autobuzul metropolitan nu intră). Fiecare proiect strategic trebuie transpus linie cu linie în PUG.');
      // 6. Mediu & monitorizare
      b += H1('6. Considerații de mediu și monitorizare');
      b += P('Implementarea se monitorizează prin indicatori (mp spațiu verde/locuitor, transfer modal, reducere emisii, locuințe noi corelate cu infrastructura). Proiectele cu impact > 1 ha necesită evaluare de mediu (OUG 195/2005). Actualizare periodică a portofoliului.');
      b += P('Surse & cadru: ghid SIDU (POR/MDLPA) · HG 874/2019 (mobilitate) · Legea 350/2001 (PUG/PUZ) · model ESTI București. Document strategic orientativ — se aprobă de Consiliul Local și se transpune în PUG.');
      b += '<p class="disc"><b>NOTĂ:</b> Document strategic ORIENTATIV generat de platforma UrbanX. Nu înlocuiește SIDU avizată/aprobată de Consiliul Local conform ghidului POR/MDLPA. Generat: ' + dateStr + '.</p>';

      var css = 'body{font-family:"Times New Roman",serif;font-size:12pt;color:#222;line-height:1.5}' +
        'h1{font-family:Arial,sans-serif;font-size:18pt;color:#1F3864;border-bottom:2pt solid #2E75B6;padding-bottom:3pt;margin:18pt 0 8pt}' +
        'h2{font-family:Arial,sans-serif;font-size:14pt;color:#2E75B6;margin:14pt 0 6pt}' +
        'p.bt{text-align:justify;margin:0 0 8pt}' +
        'table{border-collapse:collapse;width:100%;margin:8pt 0;font-size:10pt}' +
        'th{background:#2E75B6;color:#fff;border:.5pt solid #2E75B6;padding:4pt 6pt;text-align:left}' +
        'td{border:.5pt solid #B7C3D9;padding:4pt 6pt}' +
        'tr:nth-child(even) td{background:#D9E2F3}' +
        '.cover{text-align:center;padding-top:120pt}.cl{font-family:Arial;color:#2E75B6;font-size:13pt;font-weight:bold;letter-spacing:1pt}' +
        '.cb{font-family:Arial;font-size:60pt;font-weight:bold;color:#1F3864;margin:20pt 0 0}.cn{font-family:Arial;font-size:26pt;color:#2E75B6;margin:0 0 18pt}' +
        '.cs{font-size:13pt;color:#444}.cs2{font-size:11pt;color:#777;margin-top:6pt}.cd{margin-top:50pt;font-size:11pt;color:#555}' +
        '.disc{font-style:italic;color:#9E1414;font-size:9pt;border:1pt solid #9E1414;padding:8pt;margin-top:24pt}';
      var full = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>SIDU " + esc(city.name) + "</title>" +
        "<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->" +
        '<style>@page{size:A4;margin:2.5cm 2cm 2.5cm 3cm}' + css + '</style></head><body>' + b + '</body></html>';
      var blob = new Blob(['﻿', full], { type: 'application/msword' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      var slug = (city.name || 'UAT').replace(/[șş]/g, 's').replace(/[țţ]/g, 't').replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/[ȘŞ]/g, 'S').replace(/[ȚŢ]/g, 'T').replace(/[ĂÂ]/g, 'A').replace(/Î/g, 'I').replace(/[^\w]+/g, '_');
      a.href = url; a.download = 'SIDU_' + slug + '_' + new Date().getFullYear() + '.doc';
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(url); try { document.body.removeChild(a); } catch (e) {} }, 2000);
      try { G.__siduDocxLen = full.length; } catch (e) {}
      G.ss && G.ss('📝 Document SIDU (Word) generat');
    } catch (e) { try { G.__siduDocxErr = (e && e.stack) || String(e); } catch (_) {} console.warn('[SIDU] docx', e); alert('Eroare la generarea documentului Word SIDU: ' + e.message); }
  }

  // capitol pt rapoarte (cadru strategic SIDU) — DEPRECAT pt MP/PMUD (vezi subordinationNote); păstrat pt compat
  function chapter(D) {
    if (!D || !D.chapter) return;
    var d = dashboard();
    D.chapter('Cadru strategic — SIDU (umbrela)');
    D.P('SIDU (Strategia Integrată de Dezvoltare Urbană) este cadrul de nivel superior (10-15 ani) care ' +
      'integrează toate domeniile și conduce Masterplanul (regenerare de cartier) și PMUD (mobilitate). ' +
      'Acestea trebuie transpuse în PUG pentru a deveni aplicabile.');
    D.kpis([{ label: 'Proiecte strategice', val: '' + d.count, sub: 'în portofoliu' }, { label: 'Investiție', val: d.total_mil + ' M€', sub: 'cumulat' }, { label: 'Conduc PMUD', val: '' + d.drives_pmud, sub: 'mobilitate' }]);
    D.P('Documentația SIDU este structurată (model ESTI București / ghid POR) în 5 secțiuni: ' +
      SECTIUNI.map(function (s, i) { return (i + 1) + '. ' + s; }).join('; ') + '. Portofoliul de mai jos corespunde secțiunii a 3-a, ' +
      'cu prioritizare pe liste (lungă → scurtă → metropolitane) și termen de implementare.');
    var rows = projects.list().slice(0, 12).map(function (p) { var dm = DOMENII[p.domain] || {}; return [p.name, dm.label || p.domain, (LISTA[p.lista] || '—'), (TERMEN[p.termen] || '—').replace(/\s*\(.*\)/, ''), (p.cost_mil ? p.cost_mil + ' M€' : '—'), STATUS[p.status] || p.status]; });
    D.table(['Proiect', 'Domeniu', 'Listă', 'Termen', 'Cost', 'Status'], rows, [54, 30, 22, 18, 22, 26], { boldFirst: true });
    D.callout('Ierarhia SIDU → PMUD → PUG', 'SIDU stabilește viziunea; PMUD detaliază mobilitatea; PUG-ul o face aplicabilă (regim de construire). Proiectele care nu sunt transpuse în PUG rămân nefinanțabile/neautorizabile.', [96, 130, 200]);
  }

  // ── UI ──
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(720px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(96,165,250,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#2563eb,#1d4ed8);color:#fff;border:0;border-radius:9px;padding:10px 14px;font-weight:700;cursor:pointer;font-size:13px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#93c5fd;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🏛 SIDU — Strategia Integrată (umbrela)</div><div style="font-size:11px;color:#94a3b8">Cadrul de nivel superior care conduce Masterplan + PMUD → transpus în PUG</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: 'background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;font-size:12px;color:#cbd5e1;margin-bottom:10px' },
      '<b style="color:#60a5fa">SIDU</b> <span style="color:#d4af37">→</span> <b style="color:#34d399">PMUD</b> (mobilitate) + <b style="color:#fbbf24">Masterplan</b> (cartier) <span style="color:#d4af37">→</span> <b style="color:#a78bfa">PUG</b> (lege spațială). SIDU e umbrela; restul se subordonează și se transpun în PUG.' +
      '<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07);font-size:11px;color:#94a3b8">Structura documentației (model <b style="color:#cbd5e1">ESTI București</b> / ghid POR): ' +
      SECTIUNI.map(function (s, i) { return '<span style="color:#cbd5e1">' + (i + 1) + '.</span> ' + s; }).join(' &nbsp;·&nbsp; ') + '</div>'));
    var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:8px' });
    var t1 = el('button', { style: ST.ghost }, '📋 Proiecte strategice'); var t2 = el('button', { style: ST.ghost }, '☑ Coerență → PUG');
    tabs.appendChild(t1); tabs.appendChild(t2); body.appendChild(tabs);
    var p1 = el('div'); var p2 = el('div', { style: 'display:none' }); body.appendChild(p1); body.appendChild(p2);
    t1.onclick = function () { p1.style.display = ''; p2.style.display = 'none'; renderProjects(); }; t2.onclick = function () { p1.style.display = 'none'; p2.style.display = ''; };

    // PROIECTE
    var dashEl = el('div'); p1.appendChild(dashEl);
    var listEl = el('div'); p1.appendChild(listEl);
    // adaugare
    p1.appendChild(el('div', { style: ST.label }, 'Adaugă proiect strategic'));
    var g = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr;gap:6px' });
    var nm = el('input', { style: ST.inp, placeholder: 'denumire proiect' });
    var domSel = el('select', { style: ST.inp }); Object.keys(DOMENII).forEach(function (k) { domSel.appendChild(el('option', { value: k }, DOMENII[k].ico + ' ' + DOMENII[k].label)); });
    g.appendChild(nm); g.appendChild(domSel); p1.appendChild(g);
    var g2 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr 60px;gap:6px;margin-top:6px' });
    var cost = el('input', { style: ST.inp, type: 'number', placeholder: 'M€' });
    var fund = el('select', { style: ST.inp }); FUNDING.forEach(function (f) { fund.appendChild(el('option', { value: f }, f)); });
    var stat = el('select', { style: ST.inp }); Object.keys(STATUS).forEach(function (s) { stat.appendChild(el('option', { value: s }, STATUS[s])); });
    var addB = el('button', { style: ST.btn }, '+'); g2.appendChild(cost); g2.appendChild(fund); g2.appendChild(stat); g2.appendChild(addB); p1.appendChild(g2);
    addB.onclick = function () { if (!nm.value.trim()) return; projects.add({ name: nm.value, domain: domSel.value, cost_mil: +cost.value || 0, funding: fund.value, status: stat.value, priority: 2, drives: (DOMENII[domSel.value] || {}).drives }); nm.value = ''; cost.value = ''; renderProjects(); };
    function renderProjects() {
      var d = dashboard();
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center"><div style="font-size:17px;font-weight:800;color:' + (c || '#60a5fa') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      dashEl.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(d.count, 'proiecte') + card(d.total_mil + ' M€', 'investiție', '#34d399') + card(d.drives_pmud, '→ PMUD', '#fbbf24') + card(d.drives_mp, '→ Masterplan', '#a78bfa') + '</div>';
      var ps = projects.list();
      var lc = { scurta: '#34d399', metropolitan: '#a78bfa', lunga: '#94a3b8' };
      listEl.innerHTML = ps.map(function (p) { var dm = DOMENII[p.domain] || {}; var sc = p.status === 'finalizat' ? '#34d399' : p.status === 'in_executie' ? '#60a5fa' : p.status === 'finantat' ? '#fbbf24' : '#94a3b8';
        var badge = p.lista ? '<span style="font-size:9px;padding:1px 5px;border-radius:4px;background:rgba(255,255,255,.06);color:' + (lc[p.lista] || '#94a3b8') + '">' + (LISTA[p.lista] || p.lista) + (p.termen ? ' · t. ' + p.termen : '') + '</span> ' : '';
        return '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span>' + (dm.ico || '') + ' ' + p.name + ' <span style="color:#64748b">· ' + (dm.label || p.domain) + (p.drives ? ' → ' + p.drives : '') + '</span></span><span style="white-space:nowrap">' + badge + '<b style="color:' + sc + '">' + (STATUS[p.status] || p.status) + '</b> · ' + (p.cost_mil ? p.cost_mil + 'M€' : '') + ' <button data-del="' + p.id + '" style="' + ST.ghost + ';padding:1px 6px;margin-left:4px">✕</button></span></div>'; }).join('');
      listEl.querySelectorAll('[data-del]').forEach(function (b) { b.onclick = function () { projects.remove(b.getAttribute('data-del')); renderProjects(); }; });
    }
    renderProjects();
    // EXPORT document strategic (PDF + Word)
    var expBar = el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)' });
    var bpdf = el('button', { style: ST.btn }, '📜 Document SIDU (PDF)'); bpdf.onclick = function () { generateDocument(_resolveCity().key); };
    var bdoc = el('button', { style: ST.btn + ';background:linear-gradient(180deg,#0E6432,#0a4f28)' }, '📝 Document SIDU (Word .doc)'); bdoc.onclick = function () { generateDocx(_resolveCity().key); };
    expBar.appendChild(bpdf); expBar.appendChild(bdoc); p1.appendChild(expBar);

    // COERENTA
    p2.appendChild(el('div', { style: 'font-size:12px;color:#cbd5e1;margin-bottom:8px' }, 'Verifică dacă strategia e transpusă în PUG (altfel = blocaje). Ex. Iași: decalajul SIDU/PMUD ↔ PUG creează blocaje reale (Podu Roș, benzi fără culoar, ansambluri fără străzi pt autobuz).'));
    var ans = {}; var qrows = el('div'); p2.appendChild(qrows);
    Q.forEach(function (q) { var row = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.05)' }); row.appendChild(el('span', { style: 'font-size:12px;flex:1' }, q.t)); var seg = el('div', { style: 'display:flex;gap:4px;flex-shrink:0' }); ['DA', 'NU'].forEach(function (v) { var b = el('button', { style: ST.ghost + ';padding:4px 10px' }, v); b.onclick = function () { ans[q.k] = (v === 'DA'); seg.querySelectorAll('button').forEach(function (bb) { bb.style.background = 'rgba(255,255,255,.06)'; bb.style.color = '#cbd5e1'; }); b.style.background = v === 'DA' ? 'rgba(34,197,94,.25)' : 'rgba(239,68,68,.25)'; b.style.color = v === 'DA' ? '#34d399' : '#f87171'; }; seg.appendChild(b); }); row.appendChild(seg); qrows.appendChild(row); });
    var cb = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Evaluează coerența'); p2.appendChild(cb);
    var cout = el('div', { style: 'margin-top:10px' }); p2.appendChild(cout);
    cb.onclick = function () { var r = check(ans); var col = r.score >= 80 ? '#22c55e' : r.score >= 50 ? '#f59e0b' : '#ef4444'; cout.innerHTML = '<div style="text-align:center;margin-bottom:8px"><span style="font-size:26px;font-weight:900;color:' + col + '">' + r.score + '%</span> <span style="color:#94a3b8">coerență · ' + r.verdict + '</span></div>' + (r.gaps.length ? r.gaps.map(function (g2) { return '<div style="font-size:12px;padding:5px 8px;margin-bottom:4px;background:#0a1120;border-left:3px solid #ef4444;border-radius:5px"><b>' + g2.t.replace(/\?$/, '') + '</b><br><span style="color:#94a3b8">' + g2.gap + '</span></div>'; }).join('') : '<div style="color:#34d399;font-size:13px">✓ Strategia e transpusă coerent în PUG.</div>'); };

    ov.appendChild(m); document.body.appendChild(ov);
  }

  G.SIDU = { projects: projects, dashboard: dashboard, check: check, chapter: chapter, subordinationNote: subordinationNote, generateDocument: generateDocument, generateDocx: generateDocx, openPanel: openPanel, DOMENII: DOMENII, Q: Q };
  console.log('[SIDU] modul strategic (umbrela) încărcat (window.SIDU)');
})(window);
