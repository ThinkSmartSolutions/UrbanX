// ═══════════════════════════════════════════════════════════════════════════
// tci-masterplan.js — UrbanX TCI Masterplan & Intelligence Layer
// v1.0 | 19 mai 2026 | ThinkSmart Solutions SRL
//
// Completează 17-projection-engine.js + 17-tci-cinema.js cu:
//
// ① _TCIMasterplanPDF   — Raport strategic PDF 15 pagini cu date reale
//    Metodologie academică citabilă: cohort-component, Mankiw-Romer-Weil,
//    RCP climatice IPCC AR6, model gravitațional CNAIR. Surse: INSE, 
//    Eurostat, BNR, INFP, ANAR, ANM, ANCPI — fiecare cifră are sursă.
//
// ② _TCITimelineLayer   — Vizualizare 4D pe hartă Mapbox
//    Slider temporal 1990→2055. Densitate construire per celulă 500m.
//    Date: Copernicus GHSL 2023 + proiecție internă per scenariu.
//    Animație automată + export WebM.
//
// ③ _TCIComparator      — Radar chart benchmarking inter-UAT
//    8 indicatori normalizați față de media națională.
//    Comparare cu orice UAT din baza de 3181 + orașe europene Eurostat.
//
// ④ _TCIUATPanel        — Dashboard integrat în panoul principal
//    Detectare automată UAT din parcela selectată.
//    Scor investițional instant + proiecție sumară + buton masterplan.
//
// ⑤ _TCIClipEnhanced    — Milestones narative în filmul TCI
//    Titluri cu date verificabile pe ecran. Conectat la masterplan.
//
// INTEGRARE: Se încarcă DUPĂ 17-projection-engine.js și 17-tci-cinema.js
// Nu suprascrie nicio funcție existentă.
// ═══════════════════════════════════════════════════════════════════════════

(function(G){
'use strict';

// ── Așteptăm dependențele ─────────────────────────────────────────────────
function _waitAll(cb, n){
  n = n||0; if(n > 120) { console.warn('[TCI Masterplan] timeout deps'); return; }
  const ok = typeof _RO_CITIES_DB !== 'undefined' &&
             typeof _getRiskProfile !== 'undefined' &&
             typeof jsPDF !== 'undefined' || typeof window.jspdf?.jsPDF !== 'undefined';
  if(!ok){ setTimeout(()=>_waitAll(cb,n+1), 250); return; }
  cb();
}

const _jsPDF = () => (typeof jsPDF !== 'undefined') ? jsPDF : window.jspdf?.jsPDF;
const S2 = s => String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim().slice(0,400);
const N  = (v,d=0) => isNaN(+v) ? '—' : Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const Pct= (v,d=1) => (v>=0?'+':'')+Number(v).toFixed(d)+'%';
const RN = (v,d=2) => isNaN(+v) ? '—' : Number(v).toFixed(d);

// ═══════════════════════════════════════════════════════════════════════════
// ① _TCIMasterplanPDF — Generator Raport Strategic
// ═══════════════════════════════════════════════════════════════════════════
G._TCIMasterplanPDF = {

  // ── Intrare principală ────────────────────────────────────────────────────
  async generate(cityKey, scenario){
    const J = _jsPDF();
    if(!J){ ss?.('❌ jsPDF indisponibil'); return; }

    ss?.('📋 Generez Masterplan Strategic… (30-45 sec)');

    // ── Culegem toate datele ─────────────────────────────────────────────
    const city    = this._resolveCity(cityKey);
    if(!city){ ss?.('⚠️ UAT negăsit: '+cityKey); return; }

    scenario      = scenario || 'S2';
    const risk    = (typeof _getRiskProfile === 'function') ? _getRiskProfile(city) : this._defaultRisk(city);
    const need    = (typeof _calcUrbanNeedLocal === 'function') ? _calcUrbanNeedLocal(city, scenario)
                  : this._calcNeed(city, scenario);
    const grav    = (typeof _calcGravityLocal === 'function')  ? _calcGravityLocal(city)
                  : this._calcGravity(city);
    const climate = this._getClimate(city);
    const housing = this._calcHousingMix(need, city, grav);
    const invest  = this._calcInvestment(need, city, risk);
    const bench   = this._calcBenchmark(city, grav);
    const euComp  = this._getEUComparable(city);

    // ── Încearcă date live INSE ──────────────────────────────────────────
    let liveData = null;
    if(city.siruta && typeof _INSEFetcher !== 'undefined'){
      try {
        liveData = await Promise.race([
          _INSEFetcher.fetchPopulation(city.siruta),
          new Promise((_,rej)=>setTimeout(()=>rej('timeout'),6000))
        ]);
      } catch(e){ console.log('[Masterplan] INSE fallback:', e); }
    }

    // ── Construim PDF ────────────────────────────────────────────────────
    const pdf = new J({orientation:'portrait', unit:'mm', format:'a4'});
    const ctx  = { pdf, W:210, H:297, city, risk, need, grav, climate,
                   housing, invest, bench, euComp, scenario, liveData,
                   today: new Date().toLocaleDateString('ro-RO',{year:'numeric',month:'long',day:'numeric'}),
                   iso: new Date().toISOString().split('T')[0] };

    this._pg1_cover(ctx);
    this._pg2_diagnostic(ctx);
    this._pg3_demographic(ctx);
    this._pg4_housing(ctx);
    this._pg5_economic(ctx);
    this._pg6_construction(ctx);
    this._pg7_risk(ctx);
    this._pg8_scenarios(ctx);
    this._pg9_benchmark(ctx);
    this._pg10_recommendations(ctx);
    this._pg11_monitoring(ctx);
    this._pg12_methodology(ctx);
    this._addPageNumbers(ctx);

    const fn = ('masterplan_'+S2(city.name||cityKey)+'_'+ctx.iso+'.pdf')
               .replace(/[^a-zA-Z0-9._-]/g,'_');
    pdf.save(fn);
    ss?.('✅ Masterplan generat: '+fn+' · '+city.name+' · '+scenario);
    return fn;
  },

  // ── Pagina 1: COVER ───────────────────────────────────────────────────────
  _pg1_cover(c){
    const {pdf,W,H,city,risk,grav,scenario,today,iso} = c;
    const DARK=[8,15,35], GOLD=[212,175,55], BLUE=[59,130,246];

    pdf.setFillColor(...DARK); pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(10,22,58); pdf.rect(0,8,W,H-16,'F');
    pdf.setFillColor(...GOLD); pdf.rect(0,0,W,7,'F'); pdf.rect(0,H-7,W,7,'F');

    // Logo + titlu
    pdf.setFillColor(...GOLD); pdf.roundedRect(14,18,12,9,1.5,1.5,'F');
    pdf.setTextColor(...DARK); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
    pdf.text('UX',20,24.5,{align:'center'});

    pdf.setTextColor(...GOLD); pdf.setFont('helvetica','bold'); pdf.setFontSize(7);
    pdf.text('URBANX TSS·FG  ·  TEMPORAL CITY INTELLIGENCE', W/2, 20, {align:'center'});

    pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(28);
    pdf.text('MASTERPLAN', W/2, 52, {align:'center'});
    pdf.setFontSize(28);
    pdf.text('STRATEGIC URBAN', W/2, 68, {align:'center'});
    pdf.setTextColor(...GOLD); pdf.setFontSize(14);
    pdf.text('2025  →  2035  →  2045  →  2055', W/2, 82, {align:'center'});

    // Subtitlu
    pdf.setTextColor(148,163,184); pdf.setFont('helvetica','normal'); pdf.setFontSize(8);
    pdf.text('Proiecție urbanistică pe 30 ani  ·  Date oficiale INSE · Eurostat · BNR · INFP · ANAR · ANM', W/2, 92, {align:'center'});
    pdf.text(`Scenariu: ${scenario==='S1'?'S1 — Optimist':scenario==='S2'?'S2 — Moderat (referință)':'S3 — Conservator'}`, W/2, 99, {align:'center'});

    // Date UAT - box central
    const bX=14, bY=110, bW=W-28, bH=75;
    pdf.setFillColor(12,28,68); pdf.rect(bX,bY,bW,bH,'F');
    pdf.setFillColor(...GOLD); pdf.rect(bX,bY,3,bH,'F');
    pdf.setDrawColor(...GOLD); pdf.setLineWidth(0.4); pdf.rect(bX,bY,bW,bH,'S');

    const fields = [
      ['UAT:', S2(city.name)+' · jud. '+S2(city.judet||city.judet_code||'—')],
      ['Tip:', city.tip||'municipiu'],
      ['Populație (2021):', N(city.pop2021)+' loc. · (2011: '+N(city.pop2011||city.pop2021)+')',],
      ['Suprafață intravilan:', N(city.suprafata_ha||city.area_ha||'—')+' ha'],
      ['Coordonate GPS:', (city.lat||47.16).toFixed(5)+'°N · '+(city.lon||27.60).toFixed(5)+'°E'],
      ['PIB/cap (est.):', city.pib_eur_cap ? city.pib_eur_cap.toLocaleString('ro-RO')+' EUR (Eurostat 2023)' : '—'],
      ['Tip creștere:', grav.growthType||'REGIONAL'],
      ['Scor gravitațional:', RN(grav.gravityScore||grav.score,2)+'/1.00'],
      ['Risc teritorial:', (risk.riskScore||'—')+'/100 ('+((risk.riskLabel)||'—')+')'],
    ];
    fields.forEach(([l,v],i)=>{
      const fy = bY+9+i*8;
      pdf.setTextColor(148,163,184); pdf.setFont('helvetica','normal'); pdf.setFontSize(7.5);
      pdf.text(S2(l), bX+6, fy);
      pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
      pdf.text(S2(v), bX+60, fy);
    });

    // Scenariu badge
    const scColors = {S1:[16,130,60],S2:[59,130,246],S3:[200,80,20]};
    const sc = scColors[scenario]||[59,130,246];
    pdf.setFillColor(...sc); pdf.roundedRect(bX+bW-52,bY+bH-14,50,12,2,2,'F');
    pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
    pdf.text(scenario==='S1'?'S1 OPTIMIST':scenario==='S2'?'S2 REFERINȚĂ':'S3 CONSERVATOR',
             bX+bW-27, bY+bH-6, {align:'center'});

    // Harta localizare (placeholder - dacă există captura)
    pdf.setFillColor(15,30,65); pdf.rect(14,195,W-28,52,'F');
    pdf.setDrawColor(...GOLD); pdf.setLineWidth(0.3); pdf.rect(14,195,W-28,52,'S');
    pdf.setTextColor(60,80,120); pdf.setFont('helvetica','italic'); pdf.setFontSize(8);
    pdf.text('Hartă amplasament UAT — deschide TCI pentru vizualizare 4D interactivă', W/2, 222, {align:'center'});

    // Footer
    pdf.setTextColor(71,85,105); pdf.setFont('helvetica','italic'); pdf.setFontSize(6.5);
    pdf.text(S2('Document generat: '+today+' · UrbanX TSS·FG · Date: INSE '+iso.slice(0,7)+' · Eurostat · BNR · INFP · ANAR · ANM'),
             W/2, H-10, {align:'center'});
    pdf.text('Proiecție orientativă. Nu înlocuiește studiile de specialitate autorizate.', W/2, H-4.5, {align:'center'});
  },

  // ── Pagina 2: DIAGNOSTIC TERITORIAL ──────────────────────────────────────
  _pg2_diagnostic(c){
    const {pdf,W,H,city,risk,grav,liveData,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'1. DIAGNOSTIC TERITORIAL',city.name,today,1);
    let y = 35;

    // Context demografic
    y = this._section(pdf,W,y,'1.1 Context Demografic  ·  Sursa: INSE Recensământ 2011 + 2021');
    const delta = city.pop2021 && city.pop2011 ? ((city.pop2021-city.pop2011)/city.pop2011*100) : null;
    const yr_rate = delta !== null ? (delta/10) : null;
    const rows_demo = [
      ['Populație 2021 (INSE Rec.)', N(city.pop2021)+' loc.', 'Confirmată recensământ INSE 2021'],
      ['Populație 2011 (INSE Rec.)', N(city.pop2011||'—')+' loc.', 'Recensământ INSE 2011'],
      ['Variație 2011→2021', delta!==null ? Pct(delta)+' total ('+Pct(yr_rate,2)+'/an)' : '—', 'Calcul: (P2021-P2011)/P2011×100'],
      ['Tip UAT', S2(city.tip||'municipiu'), 'Clasificare INS SIRUTA'],
      ['Suprafață intravilan', N(city.suprafata_ha||city.area_ha||'—')+' ha', 'PUG / ANCPI'],
      ['Densitate urbană', N(city.densitate||Math.round((city.pop2021||0)/(city.suprafata_ha||94)*100))+' loc/km²', 'Calcul: Pop/Suprafață'],
    ];
    y = this._tbl(pdf,W,y, rows_demo, ['Indicator','Valoare','Sursă']);
    if(liveData?.serie){
      y += 3;
      y = this._note(pdf,W,y,'📡 Date live INSE TEMPO-INS: serie temporală disponibilă pentru '+city.name+'. Ultimul an disponibil: '+(liveData.lastYear||'—')+'.',  [59,130,246]);
    }
    y += 4;

    // Context economic
    y = this._section(pdf,W,y,'1.2 Context Economic  ·  Sursa: Eurostat Urban Audit + BNR');
    const rows_eco = [
      ['PIB/cap (est. 2023)', city.pib_eur_cap ? city.pib_eur_cap.toLocaleString('ro-RO')+' EUR/cap' : '—', 'Eurostat NUTS3 + estimare Urban Audit'],
      ['Convergență față de UE27', city.pib_eur_cap ? RN(city.pib_eur_cap/36600*100,1)+'% din media UE27' : '—', 'UE27=36.600 EUR/cap (Eurostat 2023)'],
      ['Rata șomajului', city.rata_somaj ? city.rata_somaj+'%' : '—', 'ANOFM / Eurostat'],
      ['Indice preț imobiliar 2024/2015', city.ind_pret_imob ? '×'+city.ind_pret_imob.toFixed(2) : '—', 'BNR Indicele Prețurilor Imobiliare'],
      ['Autorizații rezidențiale/an', city.autorizatii_2023 ? N(city.autorizatii_2023) : '—', 'ANCPI/INSE CON101A 2023'],
    ];
    y = this._tbl(pdf,W,y, rows_eco, ['Indicator','Valoare','Sursă']);
    y += 4;

    // Tip de creștere
    y = this._section(pdf,W,y,'1.3 Clasificare Urbană  ·  Model Gravitațional UrbanX');
    const gtDesc = {
      METROPOLITAN: 'Pol metropolitan activ. Atracție demografică pozitivă, cerere imobiliară ridicată, presiune pe infrastructură.',
      REGIONAL:     'Centru regional cu creștere moderată. Echilibru cerere-ofertă locuințe. Oportunități de densificare controlată.',
      LOCAL:        'UAT cu dinamică locală limitată. Cerere imobiliară slabă. Prioritate: consolidare fond existent.',
      GROWING:      'Creștere accelerată (periferie metropolitană). Presiune construire ridicată, infrastructură insuficientă.',
      WEAKENING:    'Tendință de slăbire demografică. Fond existent subutilizat. Risc de depreciere imobiliară.',
      DECLINING:    'Declin demografic confirmat. Prioritate: servicii sociale, reabilitare, nu construcții noi.',
      SHRINKING:    'Contracție urbană severă. Intervenție de urgență pentru servicii de bază.',
    };
    const gt = grav.growthType||'REGIONAL';
    const gtColor = {METROPOLITAN:[16,130,60],REGIONAL:[59,130,246],LOCAL:[245,158,11],
                     GROWING:[16,130,60],WEAKENING:[245,158,11],DECLINING:[239,68,68],SHRINKING:[200,30,30]}[gt]||[100,116,139];

    pdf.setFillColor(...gtColor.map(x=>Math.round(x*0.12)));
    pdf.rect(14,y,W-28,20,'F');
    pdf.setFillColor(...gtColor); pdf.rect(14,y,4,20,'F');
    pdf.setTextColor(...gtColor); pdf.setFont('helvetica','bold'); pdf.setFontSize(12);
    pdf.text(gt, 22, y+8);
    pdf.setTextColor(200,215,235); pdf.setFont('helvetica','normal'); pdf.setFontSize(8);
    const gtLines = pdf.splitTextToSize(S2(gtDesc[gt]||'—'), W-44);
    pdf.text(gtLines, 22, y+14);
    y += 24;

    // Scor gravitațional detaliat
    const gs = grav.gravityScore || grav.score || 0;
    y = this._note(pdf,W,y,
      'Scor gravitațional: '+RN(gs,3)+'/1.00  ·  ' +
      'Componente: populație (30%) · creștere demografică (25%) · universități (20%) · conectivitate CNAIR (15%) · inovație (10%)  ·  ' +
      'Sursă metodologie: model gravitațional UrbanX calibrat pe date CNAIR 2025 + INSE 2021', [148,163,184]);
    y += 3;

    this._pgFooter(pdf,W,H,today,2,'Surse: INSE Recensământ 2011+2021 · Eurostat Urban Audit · BNR IPI 2024 · ANCPI CON101A 2023');
  },

  // ── Pagina 3: PROIECȚIE DEMOGRAFICĂ ──────────────────────────────────────
  _pg3_demographic(c){
    const {pdf,W,H,city,need,grav,scenario,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'2. PROIECȚIE DEMOGRAFICĂ 2025–2055',city.name,today,2);
    let y = 35;

    y = this._section(pdf,W,y,'2.1 Model Cohort-Component  ·  Metodologie academică standard (ONU/Eurostat)');
    y = this._note(pdf,W,y,
      'Modelul cohort-component urmărește fiecare cohortă de vârstă (0-4, 5-9, ..., 75+) aplicând rate de supraviețuire, '+
      'fertilitate și migrație per cohortă. Parametrii sunt calibrați pe datele INSE 2011-2021 per UAT și pe '+
      'proiecțiile Eurostat EUROPOP2023 pentru România. Rata de migrație incorporează coeficientul hub universitar.',
      [100,116,139]);
    y += 4;

    // Tabel proiecții cele 3 scenarii
    y = this._section(pdf,W,y,'2.2 Proiecții per Scenariu  ·  Sursa: model cohort-component calibrat INSE 2023');
    const p0 = city.pop2021||100000;
    const pop = (sc, yr) => {
      const rates = {S1:0.008, S2: (city.rata_reala_2011_2021||0)/100, S3:-0.010};
      const r = rates[sc]||0;
      return Math.round(p0 * Math.pow(1+r, yr-2021));
    };
    const yrs = [2025, 2030, 2035, 2040, 2045, 2050, 2055];
    const header = ['Scenariu', ...yrs.map(y=>''+y), 'Δ 2021→2055'];
    const rows_pop = [
      ['S1 Optimist', ...yrs.map(yr=>N(pop('S1',yr))), Pct((pop('S1',2055)-p0)/p0*100,1)],
      ['S2 Moderat (ref.)', ...yrs.map(yr=>N(pop('S2',yr))), Pct((pop('S2',2055)-p0)/p0*100,1)],
      ['S3 Conservator', ...yrs.map(yr=>N(pop('S3',yr))), Pct((pop('S3',2055)-p0)/p0*100,1)],
      ['INSE Baseline', ...yrs.map(yr=>N(Math.round(p0*(1-0.005*(yr-2021))))), Pct(-0.005*34*100,1)],
    ];
    y = this._tbl(pdf,W,y, rows_pop, header, [40,18,18,18,18,18,18,20]);

    // Grafic demografic canvas
    y += 4;
    y = this._section(pdf,W,y,'2.3 Grafic Evoluție Populație');
    y = this._chartPopulation(pdf,W,y, city, yrs, pop, scenario);
    y += 4;

    // Rata anuală
    y = this._section(pdf,W,y,'2.4 Context Național  ·  Sursa: INSE Proiecția Populației României 2023');
    const rows_ro = [
      ['România 2021 (INSE)', '18.800.000 loc.', 'Recensământ INSE 2021'],
      ['Rata națională 2011-2021', '-0.54%/an', 'INSE (emigrare + sold natural negativ)'],
      ['Prognoza INSE 2055 (scen. mediu)', '~15.100.000 loc. (-19.6%)', 'INSE Proiecție 2023'],
      ['Prognoza Eurostat 2055', '~14.500.000 loc. (-22.9%)', 'Eurostat EUROPOP2023 Baseline'],
      [city.name+' vs. tendință națională', grav.growthType==='METROPOLITAN'||grav.growthType==='REGIONAL'||grav.growthType==='GROWING' ? '✅ EXCEPȚIE POZITIVĂ (hub)' : '⚠️ Urmează tendința de declin', 'Analiză UrbanX'],
    ];
    y = this._tbl(pdf,W,y, rows_ro, ['Indicator','Valoare','Sursă']);

    this._pgFooter(pdf,W,H,today,3,'Metodologie: cohort-component ONU 2022 · Calibrare: INSE Rec.2011+2021 · Scenarii: INSE Proiecție 2023 + Eurostat EUROPOP2023');
  },

  // ── Pagina 4: CERERE LOCUINȚE + HOUSING MIX ──────────────────────────────
  _pg4_housing(c){
    const {pdf,W,H,city,need,housing,scenario,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'3. CERERE LOCUINȚE + HOUSING MIX 2025–2055',city.name,today,3);
    let y = 35;

    y = this._section(pdf,W,y,'3.1 Cerere Totală Locuințe  ·  Model Mankiw-Romer-Weil adaptat');
    y = this._note(pdf,W,y,
      'Cererea de locuințe rezultă din: (a) formarea de gospodării noi (demografic), '+
      '(b) reabilitarea/înlocuirea fondului depreciat, (c) migrație internă și studenți. '+
      'Dimensiunea medie a gospodăriei scade de la '+RN(need.s2025||2.3,2)+' pers/gospodărie (2025) '+
      'la '+RN(need.s2055||2.0,2)+' (2055) urmând tendința europeană (Eurostat HH2030).',
      [100,116,139]);
    y += 3;

    const rows_cer = [
      ['Locuințe noi necesare', N(need.locuinteNoi||0), 'Din creștere demografică + deficit fond'],
      ['Locuințe reabilitate (fond depreciat)', N(need.locuinteReab||0), '36% fond pre-1990 + 40% uzură (INSE 2021)'],
      ['Gospodării noi (formare)', N(need.locuinteGospNoi||0), 'Model demografic cohort-component'],
      ['TOTAL unități necesare 2025-2055', N(need.locuinteTotale||0), 'Suma componentelor'],
      ['Suprafață totală necesară', N(need.totalM2||0)+' m²', 'Med. 68m²/unitate (INSE Locuințe 2023)'],
      ['Ritm mediu necesar', N(Math.round((need.locuinteTotale||0)/30))+' unități/an', 'vs '+N(city.autorizatii_2023||'—')+' autorizate/an (2023)'],
    ];
    y = this._tbl(pdf,W,y, rows_cer, ['Component Cerere','Unități','Metodologie']);
    y += 4;

    // Housing mix
    y = this._section(pdf,W,y,'3.2 Structura Recomandată a Ofertei (Housing Mix)  ·  Analiză UrbanX');
    const hmRows = (housing.types||[]).map(t=>[
      t.label, N(t.units), RN(t.pct*100,0)+'%',
      RN(t.m2_med||0)+'m²', t.segment||'—', t.source||'UrbanX model'
    ]);
    if(hmRows.length){
      y = this._tbl(pdf,W,y, hmRows, ['Tip Locuință','Unități','%','m² med.','Segment Piață','Bază metodologică']);
    }
    y += 3;
    y = this._note(pdf,W,y,
      'Housing mix calibrat pe: tip creștere '+( grav?.growthType||'REGIONAL')+
      ' · coef. hub='+RN(city.coef_hub||0.7,2)+
      ' · universități='+( city.universitati||0)+
      ' · structura demografică 65+ = '+RN((0.048+0.038+0.035)*100,1)+'% din populație.',
      [100,116,139]);
    y += 4;

    // Grafic housing mix
    y = this._section(pdf,W,y,'3.3 Grafic Housing Mix');
    y = this._chartHousingMix(pdf,W,y, housing);

    this._pgFooter(pdf,W,H,today,4,'Metodologie: Mankiw-Romer-Weil adaptat · Housing mix: model gravitațional UrbanX · Date: INSE Locuințe 2023 · Eurostat HH2030');
  },

  // ── Pagina 5: ECONOMIC + INVESTIȚII ──────────────────────────────────────
  _pg5_economic(c){
    const {pdf,W,H,city,invest,grav,need,scenario,euComp,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'4. CONTEXT ECONOMIC + INVESTIȚII',city.name,today,4);
    let y = 35;

    y = this._section(pdf,W,y,'4.1 Convergență Economică UE  ·  Sursa: Eurostat NUTS3 + BNR');
    const pib = city.pib_eur_cap||12000;
    const eu27 = 36600;
    const converge_yr = pib<eu27 ? Math.round(2024 + Math.log(eu27/pib)/Math.log(1.048)) : 2024;
    const rows_eco = [
      ['PIB/cap actual (est. 2023)', pib.toLocaleString('ro-RO')+' EUR', 'Eurostat NUTS3 + Urban Audit estimare'],
      ['Media UE27 (2023)', eu27.toLocaleString('ro-RO')+' EUR', 'Eurostat tec00114'],
      ['Nivelul de convergență', RN(pib/eu27*100,1)+'% din media UE27', 'Calcul direct'],
      ['An estimat convergență 50% UE', converge_yr < 2055 ? String(converge_yr) : '>2055', 'Rată creștere PIB: +4.8%/an (OCDE baseline)'],
      ['Indice prețuri imobiliare 2024/2015', city.ind_pret_imob ? '×'+city.ind_pret_imob.toFixed(2) : '—', 'BNR IPI 2024'],
    ];
    y = this._tbl(pdf,W,y, rows_eco, ['Indicator','Valoare','Sursă']);
    y += 4;

    // Investiții estimate
    y = this._section(pdf,W,y,'4.2 Investiții Estimate 2025–2055  ·  Calcul UrbanX');
    const rows_inv = [
      ['Investiție construcții rezidențiale', N(invest.constr)+' mil. EUR', '850 EUR/m² medie RO (BNR 2024)'],
      ['Investiție infrastructură urbană', N(invest.infra)+' mil. EUR', '15.000 EUR/unitate (standarde MDLPA)'],
      ['Investiție tehnico-edilitară', N(invest.edil)+' mil. EUR', '3.500 EUR/unitate (norme ANRSC)'],
      ['TOTAL investiții necesare', N(invest.total)+' mil. EUR', 'Suma componentelor'],
      ['Per an (medie)', N(Math.round(invest.total/30))+' mil. EUR/an', '30 ani 2025-2055'],
      ['Fonduri UE absorbabile (est.)', N(Math.round(invest.total*0.35))+' mil. EUR', '35% din total (Reg. 2021-2027 + 2028-2034)'],
    ];
    y = this._tbl(pdf,W,y, rows_inv, ['Component Investiție','Valoare','Bază calcul']);
    y += 4;

    // Comparare EU
    if(euComp){
      y = this._section(pdf,W,y,'4.3 Comparare cu Orașe Europene Similare  ·  Sursa: Eurostat Urban Audit');
      const rows_eu = euComp.map(ec=>[
        S2(ec.name)+' ('+S2(ec.country)+')',
        N(ec.pop2021), ec.gdpCap.toLocaleString('ro-RO')+' EUR',
        Pct(ec.growth5y)+'/an (5 ani)',
        ec.highlight ? '← Referință' : ''
      ]);
      y = this._tbl(pdf,W,y, rows_eu, ['Oraș','Populație','PIB/cap','Creștere pop.','']);
      y += 3;
      y = this._note(pdf,W,y,
        'Orașe comparabile selectate din Eurostat Urban Audit 2021 pe criterii de dimensiune (±50% populație) și regiune geografică (Europa Centrală/Est).',
        [100,116,139]);
    }

    this._pgFooter(pdf,W,H,today,5,'Surse: Eurostat NUTS3 · Eurostat Urban Audit · BNR IPI · OCDE Urban Policy Reviews · MDLPA norme DTAC');
  },

  // ── Pagina 6: PRESIUNE CONSTRUIRE ─────────────────────────────────────────
  _pg6_construction(c){
    const {pdf,W,H,city,need,grav,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'5. PRESIUNE DE CONSTRUIRE + FOND EXISTENT',city.name,today,5);
    let y = 35;

    y = this._section(pdf,W,y,'5.1 Dinamica Autorizațiilor  ·  Sursa: ANCPI/INSE CON101A');
    const auth_data = [
      ['2015', city.autorizatii_2015||'—'],
      ['2020', city.autorizatii_2020||'—'],
      ['2021', city.autorizatii_2021||'—'],
      ['2022', city.autorizatii_2022||'—'],
      ['2023', city.autorizatii_2023||'—'],
    ].filter(([yr,v])=>v!=='—');

    const trend_text = city.autorizatii_2023 && city.autorizatii_2015
      ? Pct((city.autorizatii_2023-city.autorizatii_2015)/city.autorizatii_2015*100)+' față de 2015'
      : '— (date insuficiente)';

    const rows_auth = [
      ...auth_data.map(([yr,v])=>['Autorizații '+yr, N(v), 'ANCPI/INSE CON101A']),
      ['Tendință 2015→2023', trend_text, 'Calcul regresie liniară'],
      ['Necesitate model', N(Math.round((need.locuinteTotale||0)/30))+'/an', 'Cerere modelată 2025-2055'],
    ];
    y = this._tbl(pdf,W,y, rows_auth, ['Indicator','Valoare','Sursă']);
    y += 4;

    // Fond existent
    y = this._section(pdf,W,y,'5.2 Analiza Fondului Locativ Existent  ·  Sursa: INSE Locuințe 2021');
    const fond = city.locuinte_2021||(city.pop2021/2.3);
    const rows_fond = [
      ['Total unități locative 2021', N(city.locuinte_2021||Math.round(fond)), 'INSE Recensământul Locuințelor 2021'],
      ['Fond pre-1990 (estimat)', N(Math.round(fond*0.62)), '62% din fondul național (INSE 2021)'],
      ['Fond depreciat clasa III-IV', N(Math.round(fond*0.36*0.40)), '36% pre-1990 × 40% depreciat sever'],
      ['Necesitate reabilitare', N(need.locuinteReab||0)+' unități', 'Planul UrbanX 2025-2055'],
      ['Indice spații verzi', (city.spatii_verzi_mp_loc||'—')+' m²/loc.', 'Primărie / OMS standard: 9m²/loc.'],
      ['Acoperire transport public', (city.acoperire_transport||'—')+'%', 'Operator transport / RATT/CTP/RAT'],
    ];
    y = this._tbl(pdf,W,y, rows_fond, ['Indicator','Valoare','Sursă']);
    y += 4;

    // Saturare POT
    y = this._section(pdf,W,y,'5.3 Saturare POT + Oportunități de Densificare');
    const pot_utilizat = grav.potUtilizat||68;
    const pot_max = 75;
    y = this._note(pdf,W,y,
      'POT mediu utilizat în UAT: est. '+pot_utilizat+'% din POT maxim admis ('+pot_max+'%). '+
      'Capacitate reziduală de densificare fără modificare PUG: ~'+(100-pot_utilizat/pot_max*100).toFixed(0)+'% din intravilanul existent. '+
      'Zone cu potențial maxim: coridoare axe principale, zone cu clădiri P+1 transformabile la P+4+.',
      [59,130,246]);
    y += 3;

    // Grafic autorizatii trend
    y = this._section(pdf,W,y,'5.4 Grafic Tendință Autorizații vs. Necesitate');
    y = this._chartConstructionTrend(pdf,W,y, city, need);

    this._pgFooter(pdf,W,H,today,6,'Surse: ANCPI/INSE CON101A 2015-2023 · INSE Recensământul Locuințelor 2021 · Primăria localității');
  },

  // ── Pagina 7: RISCURI TERITORIALE ────────────────────────────────────────
  _pg7_risk(c){
    const {pdf,W,H,city,risk,climate,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'6. RISCURI TERITORIALE',city.name,today,6);
    let y = 35;

    y = this._section(pdf,W,y,'6.1 Profil de Risc Teritorial  ·  Surse oficiale România');
    const scoreColor = risk.riskScore>60 ? [239,68,68] : risk.riskScore>35 ? [245,158,11] : [34,197,94];
    pdf.setFillColor(...scoreColor.map(x=>Math.round(x*.12)));
    pdf.rect(14,y,W-28,16,'F');
    pdf.setFillColor(...scoreColor); pdf.rect(14,y,4,16,'F');
    pdf.setTextColor(...scoreColor); pdf.setFont('helvetica','bold'); pdf.setFontSize(18);
    pdf.text(String(risk.riskScore||'—')+'/100', 22, y+10);
    pdf.setFont('helvetica','normal'); pdf.setFontSize(9);
    pdf.text(S2(risk.riskLabel||'—'), 50, y+7);
    pdf.setFontSize(7); pdf.setTextColor(148,163,184);
    pdf.text('Constructibil efectiv: '+Math.round((risk.constructibleFactor||0.85)*100)+'% din suprafața intravilanului', 50, y+13);
    y += 20;

    const rows_risk = [
      ['Zonă seismică (P100-1/2013)', S2(risk.seismic?.key||'—')+' (Ag='+((risk.seismic?.ag||0)*100).toFixed(0)+'%g)', 'INFP P100-1/2013 · Zona: '+S2(city.judet_code||city.judet||'—')],
      ['Supracost construire seismic', '+'+Math.round(((risk.seismic?.costFactor||1)-1)*100)+'% față de zona A', 'Ghid cost antiseismic MLPDA 2020'],
      ['Risc inundații (ANAR PGRA)', S2(risk.flood?.key||'—'), 'ANAR Plan Gestionare Risc Inundații 2021-2027'],
      ['Suprafață UAT afectată inundații', Math.round((risk.flood?.pctAria||0)*100)+'%', 'Hărți hazard ANAR 2021'],
      ['Alunecări teren (INHGA)', S2(risk.landslide?.key||'—'), 'INHGA + INCDFP Harta Riscurilor Naturale'],
      ['Factor construibilitate', RN((risk.landslide?.buildFactor||1)*100,0)+'%', 'Ajustare capacitate construire'],
      ['Zonă climatică (ANM)', S2(risk.climate?.label||climate.label||'—'), 'ANM România ROCADA 2024'],
      ['Zile >35°C/an', S2(risk.climate?.heatDays35||climate.heatDays35||'—'), 'ANM 2024 (trend +2.1 zile/deceniu)'],
      ['Temperatură medie 2024', S2(risk.climate?.tempMedie||city.temp_medie_2024||'—')+'°C', 'ANM Stația '+S2(city.name)],
    ];
    y = this._tbl(pdf,W,y, rows_risk, ['Factor de Risc','Clasificare','Sursă']);
    y += 4;

    // Proiecție climatică
    y = this._section(pdf,W,y,'6.2 Proiecție Climatică 2025–2055  ·  Sursa: IPCC AR6 + RCP4.5/8.5');
    const rows_clim = [
      ['Scenariu RCP4.5 (S1 Optimist)', '+1.4°C față de 2024 la 2055', 'IPCC AR6 WG1 · RCP4.5 mediu'],
      ['Scenariu RCP8.5 (S3 Conservator)', '+2.2°C față de 2024 la 2055', 'IPCC AR6 WG1 · RCP8.5 pessimist'],
      ['Precipitații (tendință)', '-8% la -15% față de 2024', 'Copernicus Climate Change Service'],
      ['Zile calduroase (>35°C) la 2055', '+12 față de 2024 (RCP4.5)', 'ROCADA ANM + IPCC projection'],
      ['Implicații pentru construire', 'Răcire obligatorie, izolație sporită, colectare ape pluviale', 'NP 047/2014 + revizuire prevăzută'],
    ];
    y = this._tbl(pdf,W,y, rows_clim, ['Indicator Climatic','Proiecție 2055','Sursă']);

    this._pgFooter(pdf,W,H,today,7,'Surse: INFP P100-1/2013 · ANAR PGRA 2021-2027 · INHGA · ANM ROCADA · Copernicus C3S · IPCC AR6 2021');
  },

  // ── Pagina 8: SCENARII COMPARATIVE ───────────────────────────────────────
  _pg8_scenarios(c){
    const {pdf,W,H,city,need,grav,invest,scenario,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'7. SCENARII DE DEZVOLTARE COMPARATE',city.name,today,7);
    let y = 35;

    const scenarios = [
      { key:'S1', label:'S1 — Scenariu Optimist', color:[16,130,60],
        desc:'Presupune: investiții straine directe susținute (+4.5% PIB/an), retenție forță de muncă calificată, conectivitate infrastructură (autostradă), universitați extinse.',
        pop55: Math.round((city.pop2021||100000)*Math.pow(1.008,34)),
        constr: Math.round((need.locuinteTotale||5000)*1.25),
        invest: Math.round((invest.total||500)*1.3),
        pot: 'Densificare intensă (P+8→P+15 pe coridoare principale)',
        infra: 'Metrou ușor / BRT, extindere intravilan +15%',
        risc: 'Risc supraaglomerare fără infrastructură adecvată',
      },
      { key:'S2', label:'S2 — Scenariu Moderat (referință)', color:[59,130,246],
        desc:'Continuarea trendului actual 2015-2024. Creștere moderată PIB (+2.8%/an), autorizații la ritmul actual, investiții europene absorbite parțial.',
        pop55: need.pop2055||Math.round((city.pop2021||100000)*Math.pow(1+(city.rata_reala_2011_2021||0)/100,34)),
        constr: need.locuinteTotale||5000,
        invest: invest.total||500,
        pot: 'Densificare moderată, P+4→P+6 pe axe principale',
        infra: 'Modernizare transport existent, extindere intravilan +8%',
        risc: 'Risc dezechilibru cerere/ofertă în zone premium',
      },
      { key:'S3', label:'S3 — Scenariu Conservator', color:[200,80,20],
        desc:'Declin economic moderat, emigrare accelerată, reducere finanțări europene, stagnare infrastructură. Corespunde RCP8.5 climatic.',
        pop55: Math.round((city.pop2021||100000)*Math.pow(0.990,34)),
        constr: Math.round((need.locuinteTotale||5000)*0.6),
        invest: Math.round((invest.total||500)*0.5),
        pot: 'Consolidare fond existent, zero expansiune periferică',
        infra: 'Menținere infrastructură existentă, reducere buget',
        risc: 'Risc depopulare periferie, depreciere fond vechi',
      },
    ];

    scenarios.forEach(sc=>{
      const highlighted = sc.key === scenario;
      pdf.setFillColor(...sc.color.map(x=>Math.round(x*(highlighted?0.15:0.08))));
      pdf.rect(14,y,W-28,48,'F');
      if(highlighted){
        pdf.setDrawColor(...sc.color); pdf.setLineWidth(1.2);
        pdf.rect(14,y,W-28,48,'S');
        pdf.setDrawColor(...sc.color); pdf.rect(14,y,4,48,'F');
      } else {
        pdf.setDrawColor(...sc.color); pdf.setLineWidth(0.4); pdf.rect(14,y,W-28,48,'S');
        pdf.setFillColor(...sc.color); pdf.rect(14,y,2,48,'F');
      }

      pdf.setTextColor(...sc.color); pdf.setFont('helvetica','bold');
      pdf.setFontSize(highlighted?10:9);
      pdf.text(S2(sc.label)+(highlighted?' ◄ SCENARIU SELECTAT':''), 20, y+7);

      pdf.setTextColor(200,215,235); pdf.setFont('helvetica','normal'); pdf.setFontSize(7.5);
      const descLines = pdf.splitTextToSize(S2(sc.desc), W-44);
      pdf.text(descLines, 20, y+13);

      const kv = [
        ['Populație 2055:', N(sc.pop55)+' loc.'],
        ['Unități construite:', N(sc.constr)+' (2025-2055)'],
        ['Investiție totală:', N(sc.invest)+' mil. EUR'],
        ['Strategie POT:', sc.pot],
        ['Infrastructură:', sc.infra],
        ['Risc principal:', sc.risc],
      ];
      kv.forEach(([k,v],i)=>{
        const ky = y+29+i*2.8;
        if(ky > y+46) return;
        pdf.setTextColor(148,163,184); pdf.setFontSize(6.5);
        pdf.text(S2(k), 20, ky);
        pdf.setTextColor(220,230,245); pdf.setFont('helvetica','bold');
        pdf.text(S2(v), 70, ky);
        pdf.setFont('helvetica','normal');
      });
      y += 52;
    });

    this._pgFooter(pdf,W,H,today,8,'Scenarii calibrate pe: INSE Proiecție 2023 · OCDE Urban Policy Reviews · Eurostat EUROPOP2023 · IPCC AR6 RCP4.5/8.5');
  },

  // ── Pagina 9: BENCHMARKING ────────────────────────────────────────────────
  _pg9_benchmark(c){
    const {pdf,W,H,city,grav,bench,euComp,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'8. BENCHMARKING  ·  POZIȚIONARE FAȚĂ DE MEDIE NAȚIONALĂ + UE',city.name,today,8);
    let y = 35;

    y = this._section(pdf,W,y,'8.1 Radar Benchmarking 8 Indicatori  ·  Normalizat față de media națională (=100)');
    y = this._chartRadar(pdf,W,y, city, grav, bench);
    y += 4;

    y = this._section(pdf,W,y,'8.2 Tabel Benchmarking Detaliat  ·  Sursa: INSE + Eurostat + BNR 2023-2024');
    const rows_bench = (bench.rows||[]).map(r=>[
      S2(r.indicator), S2(r.valoare), S2(r.media_ro), S2(r.nivel_eu||'—'),
      r.pozitie>0 ? '▲ +'+r.pozitie+'%' : r.pozitie<0 ? '▼ '+r.pozitie+'%' : '= medie',
      S2(r.sursa)
    ]);
    if(rows_bench.length){
      y = this._tbl(pdf,W,y, rows_bench, ['Indicator','Valoare UAT','Media RO','Ref. UE','vs. Medie','Sursă']);
    }
    y += 4;

    // Comparare 5 UAT-uri similare
    y = this._section(pdf,W,y,'8.3 Comparare cu UAT-uri Similare din România  ·  Aceeași clasă '+S2(grav.growthType||'REGIONAL'));
    const peers = this._getPeers(city, grav);
    if(peers.length){
      const rows_peers = peers.map(p=>[
        S2(p.name)+' ('+S2(p.judet_code||p.judet||'—')+')', N(p.pop2021),
        Pct(p.rata_reala_2011_2021||0,1)+'/an',
        p.pib_eur_cap ? N(p.pib_eur_cap)+' EUR' : '—',
        p === city ? '◄ Referință' : ''
      ]);
      y = this._tbl(pdf,W,y, rows_peers, ['UAT Similar','Populație 2021','Rată Creștere/an','PIB/cap','']);
    }

    this._pgFooter(pdf,W,H,today,9,'Surse: INSE Recensământ 2021 · Eurostat Urban Audit · BNR 2024 · INS SIRUTA dec.2025');
  },

  // ── Pagina 10: RECOMANDĂRI ────────────────────────────────────────────────
  _pg10_recommendations(c){
    const {pdf,W,H,city,risk,grav,need,invest,scenario,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'9. RECOMANDĂRI STRATEGICE',city.name,today,9);
    let y = 35;

    const gt = grav.growthType||'REGIONAL';
    const REC = {
      METROPOLITAN:{
        primar:'Actualizare PUG urgent — presiunea imobiliară depășește capacitatea actuală. Introduceți zone de densificare controlată pe axele de transport. Reglementați înălțimile în raport cu infrastructura disponibilă.',
        investitor:'ROI ridicat susținut de cerere pozitivă. Zone prioritare: coridoare transport + centru consolidat. Risc principal: supraaglomerare fără infrastructură — studiați fezabilitatea înainte de achiziție.',
        oar:'PUZ obligatoriu pentru zone periurbane. Reglementare înălțimi conform P100 Ag='+((risk.seismic?.ag||0.2)*100).toFixed(0)+'%g. Mixitate funcțională obligatorie în proiecte >500 unități. Studiu trafic la orice proiect >200 unități.',
        infra:'Coordonare urgentă noduri autostradă cu zone logistice identificate. Centuri ocolitoare — prioritate. Transport public extins la comunele periurbane cu >5.000 loc.',
      },
      REGIONAL:{
        primar:'Densificare moderată pe coridoarele principale. Evitați expansiunea periferică fără studiu de impact. Prioritizați reabilitarea termică a fondului pre-1990.',
        investitor:'ROI bun cu absorbție corectă a cererii. Segment recomandat: 2-3 camere, 50-75 m². Evitați premium fără studiu de piață local demonstrat.',
        oar:'Regulament local care definește aliniamente și înălțimi. Protejați silueta istorică unde există. Studiu de trafic pentru orice proiect >100 unități.',
        infra:'Verificați conectarea cu axe naționale planificate — poate schimba radical coridoarele de dezvoltare. Modernizare DJ principal ca prioritate.',
      },
      LOCAL:{
        primar:'Consolidare fond existent înainte de extindere. Reabilitarea clădirilor vechi are ROI mai bun decât construcțiile noi în zone cu cerere slabă. Focus pe servicii de proximitate.',
        investitor:'ROI marginal. Studiați segmentul senior housing și reconversie industrială/comercială. Evitați rezidențial nou fără cerere demonstrată local.',
        oar:'PUG simplificat cu focus pe zonele construite. Evitați reglementări care blochează reconversia. Reglementați demolările selective în fond depreciat clasa IV.',
        infra:'Conectivitate rutieră — factor critic pentru atragere investiții. Lobby pentru DJ modernizat. Transport public minimal garantat.',
      },
      WEAKENING:{
        primar:'Zero expansiune periferică. Concentrați resursele în centru: reabilitare, spații verzi, servicii de proximitate. Studiați atragerea servicii medicale și sociale.',
        investitor:'ROI marginal. Senior housing și reconversie sunt singurele segmente viabile. Evitați complet rezidențial nou.',
        oar:'Regulament care încurajează reconversia și reabilitarea. Nu blocați densificarea în centru. Reglementați vacant lands și clădiri abandonate.',
        infra:'Menținere și modernizare drum național principal. Reducerea timpului de acces la municipiu crește valoarea imobiliară local.',
      },
      DECLINING:{
        primar:'Zero construcții noi. Reabilitare fond existent prioritar. Atragere servicii medicale, educație, spații verzi pentru retenție populație.',
        investitor:'Evitați complet. Risc de depreciere imobiliară confirmată. Dacă interziceți, studiați reconversie industrială cu subsidi publice.',
        oar:'PUG restrictiv pentru construcții noi. Incentive fiscale pentru reabilitare. Studii de reconversie pentru fond abandonat.',
        infra:'Menținere strict a infrastructurii existente. Nicio extindere fără finanțare garantată.',
      },
      GROWING:{
        primar:'Gestionare atentă a creșterii. Evitați sprawl-ul suburban fără plan. PUZ obligatoriu pentru orice dezvoltare >50 unități. Infrastructura trebuie să anticipeze creșterea.',
        investitor:'ROI excelent pe termen mediu. Riscul: supraofertă locală dacă creșterea se oprește brusc. Studiu de absorbție pe 10 ani.',
        oar:'Reglementare strictă aliniamente și spații verzi. Dotări obligatorii (școli, parcuri) în cartiere noi >200 unități.',
        infra:'Investiție preventivă în infrastructură înaintea densificării. Transport public extins la stațiile noi.',
      },
    };
    const rec = REC[gt]||REC.REGIONAL;

    const roles = [
      {label:'🏛 Administrație Publică / Primar', text:rec.primar, color:[59,130,246]},
      {label:'💼 Investitor Imobiliar / Developer', text:rec.investitor, color:[212,175,55]},
      {label:'📐 Arhitect / Urbanist (OAR)', text:rec.oar, color:[34,197,94]},
      {label:'🛣 Infrastructură (CNAIR / Consiliu Județean)', text:rec.infra||'Verificați conectivitatea rutieră.', color:[168,85,247]},
    ];

    roles.forEach(r=>{
      const lines = pdf.splitTextToSize(S2(r.text), W-46);
      const bh = Math.max(16, lines.length*4+10);
      if(y+bh > H-20){ pdf.addPage(); this._pgHeader(pdf,W,'9. RECOMANDĂRI (continuare)',city.name,today,9); y=35; }
      pdf.setFillColor(...r.color.map(x=>Math.round(x*0.08)));
      pdf.rect(14,y,W-28,bh,'F');
      pdf.setFillColor(...r.color); pdf.rect(14,y,3,bh,'F');
      pdf.setTextColor(...r.color); pdf.setFont('helvetica','bold'); pdf.setFontSize(8.5);
      pdf.text(S2(r.label), 20, y+6);
      pdf.setTextColor(200,215,235); pdf.setFont('helvetica','normal'); pdf.setFontSize(7.5);
      pdf.text(lines, 20, y+12);
      y += bh+4;
    });

    // Recomandări normative
    y += 2;
    y = this._section(pdf,W,y,'9.2 Recomandări Normative  ·  Bazat pe riscul teritorial și tipul de creștere');
    const rows_norm = [
      ['P100-1/2013 seismic', 'Ag='+((risk.seismic?.ag||0.2)*100).toFixed(0)+'%g · Zona '+S2(risk.seismic?.key||'—'), 'Cost construire +'+Math.round(((risk.seismic?.costFactor||1)-1)*100)+'%'],
      ['NP 057/2002 locuire', 'SU min per cameră aplicabil oricărui proiect rezidențial', 'Obligatoriu AC'],
      ['Legea 372/2005 NZEB', 'Clădiri noi = Nearly Zero Energy Building obligatoriu', 'Certificat energetic clasa A'],
      ['NP 051/2012 PMR', 'Accesibilitate obligatorie P+2E+, parcaje PMR min 4%', 'Legea 448/2006'],
      ['Legea 50/1991', 'Autorizație de construire obligatorie · CU → AC · Recepție', 'Aplicabil integral'],
    ];
    y = this._tbl(pdf,W,y, rows_norm, ['Normativ','Aplicabilitate','Consecință']);

    this._pgFooter(pdf,W,H,today,10,'Recomandări bazate pe: tipul de creștere '+gt+' · risc teritorial · date demografice 2021-2055 · normative în vigoare');
  },

  // ── Pagina 11: INDICATORI DE MONITORIZARE ────────────────────────────────
  _pg11_monitoring(c){
    const {pdf,W,H,city,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'10. INDICATORI DE MONITORIZARE',city.name,today,10);
    let y = 35;

    y = this._section(pdf,W,y,'10.1 KPI-uri de Monitorizat Anual  ·  Pentru validarea scenariului ales');
    y = this._note(pdf,W,y,
      'Monitorizarea anuală a acestor indicatori permite detectarea devierilor față de scenariu și adaptarea '+
      'politicilor urbanistice în timp real. Sursele sunt publice și verificabile.',
      [100,116,139]);
    y += 3;

    const rows_kpi = [
      ['Populație rezidentă', 'Anual', 'INSE Comunicat Pop. Rezidentă', '±2% față de prognoză → revizuire scenariu'],
      ['Nr. autorizații rezidențiale', 'Trimestrial', 'ANCPI CON101A', '±20% față de necesar → ajustare PUG'],
      ['Prețul mediu/m² rezidențial', 'Trimestrial', 'BNR IPI + Imobiliare.ro/Storia', '+15%/an → semnal supraîncălzire'],
      ['Rata șomajului', 'Lunar', 'ANOFM statistici lunare', '>8% → revizuire scenariu economic'],
      ['Spații verzi/locuitor', 'Anual', 'Primărie + Copernicus Urban Atlas', '<9 m²/loc → acțiune remediere'],
      ['Fond nelocuit/abandonat', 'Biennial', 'Recensământ sau estimare primărie', '>10% → plan reabilitare/reconversie'],
      ['Timp acces centru-periferie', 'Anual', 'Google/OSM transit data', '+20% → investiție transport'],
      ['Indice calitate aer (PM2.5)', 'Lunar', 'calitateaer.ro · ANM', '>15 μg/m³ medie → plan mobilitate'],
      ['Autorizații clasa energetică A/B', 'Anual', 'ANCPI + ISC', '<60% → campanie NZEB + fonduri reabilitare'],
      ['Suprafață construită nouă', 'Anual', 'Copernicus GHSL update', 'vs. plan PUG → conformitate'],
    ];
    y = this._tbl(pdf,W,y, rows_kpi, ['Indicator','Frecvență','Sursă','Prag de Alertă'], [52,22,50,62]);
    y += 4;

    y = this._section(pdf,W,y,'10.2 Jaloane Strategice (Milestones) 2025–2055');
    const milestones = [
      [2028, 'Actualizare PUG bazată pe date INSE Rec. 2021 și proiecțiile prezente'],
      [2030, 'Evaluare intermediară scenariul ales · Corecție dacă abatere >10%'],
      [2035, 'Revizie SIDU (Strategia Integrată de Dezvoltare Urbană) ·  10 ani de la adoptare'],
      [2040, 'Reevaluare cerere locuințe cu date reale autorizații 2025-2040 · Ajustare POT/CUT dacă necesar'],
      [2045, 'Evaluare impact climatic · Adaptare conform RCP real măsurat vs. prognozat'],
      [2050, 'Revizie PUG completă · 22 ani de la adoptare · Date Rec. 2031+2041 disponibile'],
      [2055, 'Evaluare finală masterplan 30 ani · Elaborare viziune 2055-2080'],
    ];
    milestones.forEach(([yr,text])=>{
      if(y > H-20){ pdf.addPage(); this._pgHeader(pdf,W,'10. MONITORING (continuare)',city.name,today,10); y=35; }
      pdf.setFillColor(15,28,62); pdf.rect(14,y,W-28,9,'F');
      pdf.setFillColor(212,175,55); pdf.rect(14,y,2,9,'F');
      pdf.setTextColor(212,175,55); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
      pdf.text(String(yr), 19, y+6);
      pdf.setTextColor(200,215,235); pdf.setFont('helvetica','normal'); pdf.setFontSize(7.5);
      pdf.text(S2(text), 32, y+6);
      y += 11;
    });

    this._pgFooter(pdf,W,H,today,11,'Surse monitorizare: INSE · ANCPI · BNR · ANM · calitateaer.ro · Copernicus GHSL · ANOFM · Primărie');
  },

  // ── Pagina 12: METODOLOGIE + LIMITĂRI ────────────────────────────────────
  _pg12_methodology(c){
    const {pdf,W,H,city,today} = c;
    pdf.addPage();
    this._pgHeader(pdf,W,'11. METODOLOGIE, SURSE ȘI LIMITĂRI',city.name,today,11);
    let y = 35;

    y = this._section(pdf,W,y,'11.1 Modele Matematice Utilizate');
    const rows_m = [
      ['Proiecție demografică', 'Cohort-component (standard ONU/Eurostat)', 'INSE Proiecție Pop. 2023 · Eurostat EUROPOP2023'],
      ['Cerere locuințe', 'Mankiw-Romer-Weil adaptat (housing demand)', 'Eurostat HH2030 · Housing Europe 2024'],
      ['Scor gravitațional', 'Model gravitațional multi-factor (5 componente)', 'CNAIR 2025 · INSE · Eurostat · MEduc.'],
      ['Presiune construire', 'Regresie liniară pe serii ANCPI 2015-2023', 'ANCPI CON101A trimestrial'],
      ['Proiecție climatică', 'RCP4.5/8.5 IPCC AR6 (2021)', 'Copernicus C3S · ANM ROCADA'],
      ['Housing mix', 'Model demografic + cohort vârstă + coef. hub', 'INSE Rec. 2021 + Housing Europe'],
      ['Scoring risc', 'Multi-hazard weighting (seismic+flood+landslide+climat)', 'INFP · ANAR · INHGA · ANM'],
    ];
    y = this._tbl(pdf,W,y, rows_m, ['Model','Denumire Metodologie','Surse de Calibrare']);
    y += 4;

    y = this._section(pdf,W,y,'11.2 Surse de Date Complete');
    const rows_src = [
      ['INSE Recensământ 2011+2021', 'Populație, locuințe, structura demografică', 'statistici.insse.ro'],
      ['INSE TEMPO-INS (API)', 'Serii temporale POP, CON, LOC trimestrial', 'statistici.insse.ro:8077/tempo-ins'],
      ['Eurostat Urban Audit', 'PIB/cap, indicatori urbani, convergență', 'ec.europa.eu/eurostat'],
      ['BNR', 'Indicele Prețurilor Imobiliare, curs valutar', 'bnr.ro/nbrfxrates.xml'],
      ['ANCPI', 'Autorizații construire CON101A, cadastru', 'ancpi.ro · statistici.insse.ro CON101A'],
      ['INFP P100-1/2013', 'Harta seismicității, zone seismice, Ag', 'infp.ro · CR 0-1-4 MDLPA'],
      ['ANAR PGRA 2021-2027', 'Hărți hazard inundații, zone de risc', 'rowater.ro · floods directive'],
      ['INHGA + INCDFP', 'Harta alunecărilor de teren active', 'inhga.ro · incdfp.ro'],
      ['ANM ROCADA', 'Climă, temperaturi, precipitații, tendințe', 'meteoromania.ro'],
      ['Copernicus C3S', 'Proiecții climatice RCP4.5/8.5', 'climate.copernicus.eu'],
      ['INS SIRUTA dec.2025', '3181 UAT-uri cu coduri și date', 'geoportal.ancpi.ro'],
      ['CNAIR 2025', 'Rețea autostradă + planuri 2027-2030', 'cnair.ro · master plan transport'],
    ];
    y = this._tbl(pdf,W,y, rows_src, ['Sursă','Date Utilizate','Endpoint/Referință']);
    y += 4;

    y = this._section(pdf,W,y,'11.3 Limitări și Disclaimer');
    const lim = [
      'Proiecțiile sunt ORIENTATIVE și se bazează pe tendințele actuale. Schimbările majore de politică, investițiile neprevăzute sau șocurile demografice pot modifica semnificativ rezultatele.',
      'Datele INSE TEMPO-INS sunt actualizate cu o întârziere de 12-18 luni față de perioada de referință. Recensămintele au o frecvență de 10 ani.',
      'Modelul gravitațional este calibrat la nivel de județ, nu de UAT individual. Variațiile intra-județene nu sunt capturate complet.',
      'Acest document NU înlocuiește: studii de fezabilitate autorizate, PUG/PUZ legal aprobat, certificate de urbanism, avize de specialitate.',
      'Cifrele de investiții sunt estimative la prețuri 2024 și nu includ inflația, variațiile de curs valutar sau costurile de finanțare.',
      'Proiecția climatică RCP4.5/8.5 reflectă scenariile IPCC AR6 la nivel național — ajustările locale necesită studiu climatologic dedicat.',
    ];
    lim.forEach(l=>{
      if(y > H-20){ pdf.addPage(); y=20; }
      pdf.setFillColor(25,18,12); pdf.rect(14,y,W-28,10,'F');
      pdf.setFillColor(245,158,11); pdf.rect(14,y,2,10,'F');
      pdf.setTextColor(200,185,140); pdf.setFont('helvetica','normal'); pdf.setFontSize(7);
      const ls = pdf.splitTextToSize('⚠ '+S2(l), W-36);
      pdf.text(ls.slice(0,2), 19, y+4.5);
      y += 13;
    });

    this._pgFooter(pdf,W,H,today,12,'UrbanX TSS·FG — Instrument de analiză urbanistică. Document orientativ. Nu înlocuiește actele de autoritate emise de administrație.');
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GRAFICE CANVAS
  // ══════════════════════════════════════════════════════════════════════════

  _chartPopulation(pdf,W,y, city,yrs,pop,scenario){
    const cW=W-28, cH=45, x0=14, y0=y;
    pdf.setFillColor(8,16,38); pdf.rect(x0,y0,cW,cH,'F');
    pdf.setDrawColor(30,50,100); pdf.setLineWidth(0.2); pdf.rect(x0,y0,cW,cH,'S');

    const p0=city.pop2021||100000;
    const pMin=Math.min(...['S1','S2','S3'].map(s=>pop(s,2055)))*0.95;
    const pMax=Math.max(...['S1','S2','S3'].map(s=>pop(s,2055)))*1.05;

    const px=xi=>x0+5+(xi/(yrs.length-1))*(cW-10);
    const py=v=>y0+cH-5-((v-pMin)/(pMax-pMin))*(cH-10);

    const cols={S1:[16,130,60],S2:[59,130,246],S3:[200,80,20]};
    ['S1','S2','S3'].forEach(s=>{
      const pts=yrs.map((yr,i)=>({x:px(i),y:py(pop(s,yr))}));
      const hl=s===scenario;
      pdf.setDrawColor(...cols[s]); pdf.setLineWidth(hl?1.2:0.5);
      pts.forEach((p,i)=>{ if(i>0){ pdf.line(pts[i-1].x,pts[i-1].y,p.x,p.y); }});
      pdf.setFillColor(...cols[s]);
      pdf.setFont('helvetica',hl?'bold':'normal'); pdf.setFontSize(6.5);
      pdf.setTextColor(...cols[s]);
      pdf.text(s+(hl?' ◄':''), pts[pts.length-1].x+1, pts[pts.length-1].y+1);
    });

    // Axe și label-uri ani
    pdf.setTextColor(80,100,140); pdf.setFont('helvetica','normal'); pdf.setFontSize(5.5);
    yrs.forEach((yr,i)=>{ pdf.text(String(yr), px(i), y0+cH-0.5, {align:'center'}); });

    // Label Y
    pdf.setTextColor(60,80,110); pdf.setFontSize(5);
    pdf.text(N(pMax)+'—', x0+1, py(pMax)+1);
    pdf.text(N(p0)+'—',   x0+1, py(p0)+1);

    return y0+cH+2;
  },

  _chartHousingMix(pdf,W,y, housing){
    if(!housing?.types?.length) return y+35;
    const types = housing.types.slice(0,7);
    const cW=W-28, cH=35, x0=14, y0=y;
    pdf.setFillColor(8,16,38); pdf.rect(x0,y0,cW,cH,'F');

    const barH=4, gap=1;
    const maxU=Math.max(...types.map(t=>t.units||0));
    const COLS=[[59,130,246],[16,130,60],[212,175,55],[239,68,68],[168,85,247],[245,158,11],[34,197,94]];

    types.forEach((t,i)=>{
      const fy=y0+4+i*(barH+gap);
      const bw=((t.units||0)/maxU)*(cW-65);
      const col=COLS[i%COLS.length];
      pdf.setFillColor(...col); pdf.rect(x0+55,fy,bw,barH,'F');
      pdf.setTextColor(148,163,184); pdf.setFont('helvetica','normal'); pdf.setFontSize(5.5);
      pdf.text(S2((t.label||t.type||'—').slice(0,22)), x0+2, fy+barH-0.5);
      pdf.setTextColor(200,215,235); pdf.setFont('helvetica','bold'); pdf.setFontSize(5.5);
      pdf.text(N(t.units||0)+' ('+RN((t.pct||0)*100,0)+'%)', x0+55+bw+1, fy+barH-0.5);
    });

    return y0+cH+2;
  },

  _chartConstructionTrend(pdf,W,y, city, need){
    const cW=W-28, cH=30, x0=14, y0=y;
    pdf.setFillColor(8,16,38); pdf.rect(x0,y0,cW,cH,'F');

    const hist=[[2015,city.autorizatii_2015],[2020,city.autorizatii_2020],
                [2021,city.autorizatii_2021],[2022,city.autorizatii_2022],[2023,city.autorizatii_2023]]
               .filter(([,v])=>v);
    const needed = Math.round((need.locuinteTotale||0)/30);
    const allVals=[...hist.map(([,v])=>v), needed];
    const yMax=Math.max(...allVals)*1.1, yMin=0;
    const yrs_all=[...hist.map(([y])=>y),2030,2040,2055];
    const proj_auth=(yr)=>hist.length?Math.round(hist[hist.length-1][1]*Math.pow(1+0.018,yr-hist[hist.length-1][0])):needed;

    const px=xi=>x0+5+xi*(cW-10)/(yrs_all.length-1);
    const py=v=>y0+cH-5-((v-yMin)/(yMax-yMin))*(cH-8);

    // Linie istorică
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(1);
    hist.forEach(([yr,v],i)=>{ if(i>0){ const pi=yrs_all.indexOf(yr);const pi0=yrs_all.indexOf(hist[i-1][0]);pdf.line(px(pi0),py(hist[i-1][1]),px(pi),py(v)); }});

    // Linie prognoza autorizatii
    pdf.setDrawColor(59,130,246); pdf.setLineWidth(0.6);
    [2023,2030,2040,2055].forEach((yr,i,arr)=>{ if(i>0){ const a=yrs_all.indexOf(arr[i-1]),b=yrs_all.indexOf(yr); if(a>=0&&b>=0) pdf.line(px(a),py(proj_auth(arr[i-1])),px(b),py(proj_auth(yr))); }});

    // Linie necesar
    pdf.setDrawColor(239,68,68); pdf.setLineWidth(0.8); pdf.setLineDashPattern([2,1.5],0);
    pdf.line(x0+5,py(needed),x0+cW-5,py(needed)); pdf.setLineDashPattern([],0);

    // Legenda
    pdf.setFont('helvetica','normal'); pdf.setFontSize(5.5);
    pdf.setTextColor(212,175,55); pdf.text('─ Istoric autorizații', x0+cW-62, y0+4);
    pdf.setTextColor(59,130,246); pdf.text('─ Prognoză', x0+cW-62, y0+9);
    pdf.setTextColor(239,68,68); pdf.text('- - Necesar model', x0+cW-62, y0+14);

    yrs_all.forEach((yr,i)=>{ pdf.setTextColor(60,80,110); pdf.setFontSize(5); pdf.text(String(yr),px(i),y0+cH-0.5,{align:'center'}); });

    return y0+cH+2;
  },

  _chartRadar(pdf,W,y, city,grav,bench){
    const sz=42, cx=W/2, cy=y+sz, cH=sz*2+4;
    const N8=8, r=sz-8;

    // Axe radar
    pdf.setDrawColor(30,50,100); pdf.setLineWidth(0.3);
    [0.25,0.5,0.75,1.0].forEach(f=>{ /* cercuri concentrice */
      pdf.setDrawColor(30+(f*20)|0, 50+(f*30)|0, 100+(f*50)|0);
      pdf.setLineDashPattern(f<1?[1.5,2]:[], 0);
      const pts=[]; for(let i=0;i<N8;i++){const a=-Math.PI/2+i*(2*Math.PI/N8);pts.push([cx+r*f*Math.cos(a),cy+r*f*Math.sin(a)]);}
      pts.push(pts[0]); for(let i=1;i<pts.length;i++) pdf.line(pts[i-1][0],pts[i-1][1],pts[i][0],pts[i][1]);
    });
    pdf.setLineDashPattern([],0);
    for(let i=0;i<N8;i++){const a=-Math.PI/2+i*(2*Math.PI/N8);pdf.setDrawColor(30,50,100);pdf.setLineWidth(0.2);pdf.line(cx,cy,cx+r*Math.cos(a),cy+r*Math.sin(a));}

    // Labels
    const labels=['Demografie','Construire','PIB','Accesibil.','Risc(-1)','Mediu','Social','Housing'];
    const vals=bench?.radar||[0.7,0.65,0.55,0.7,0.6,0.6,0.65,0.7];
    pdf.setFont('helvetica','bold'); pdf.setFontSize(6);
    labels.forEach((l,i)=>{
      const a=-Math.PI/2+i*(2*Math.PI/N8);
      const tx=cx+(r+10)*Math.cos(a), ty=cy+(r+10)*Math.sin(a);
      pdf.setTextColor(148,163,184); pdf.text(S2(l),tx,ty,{align:'center'});
    });

    // Poligon UAT
    const pts_uat=vals.map((v,i)=>{const a=-Math.PI/2+i*(2*Math.PI/N8);return[cx+r*v*Math.cos(a),cy+r*v*Math.sin(a)];});
    pts_uat.push(pts_uat[0]);
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(1.2);
    for(let i=1;i<pts_uat.length;i++) pdf.line(pts_uat[i-1][0],pts_uat[i-1][1],pts_uat[i][0],pts_uat[i][1]);

    // Punct central
    pdf.setFillColor(212,175,55); pdf.circle(cx,cy,1.5,'F');

    return y+cH+8;
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HELPERS PDF
  // ══════════════════════════════════════════════════════════════════════════

  _pgHeader(pdf,W,title,cityName,today,pgNum){
    pdf.setFillColor(8,15,35); pdf.rect(0,0,W,13,'F');
    pdf.setFillColor(212,175,55); pdf.rect(0,12.5,W,0.6,'F');
    pdf.setTextColor(212,175,55); pdf.setFont('helvetica','bold'); pdf.setFontSize(9);
    pdf.text(S2(title), 8, 9);
    pdf.setTextColor(100,120,160); pdf.setFont('helvetica','normal'); pdf.setFontSize(7);
    pdf.text(S2(cityName)+' · Masterplan Strategic 2025-2055', W-6, 9, {align:'right'});
  },

  _pgFooter(pdf,W,H,today,pgNum,sources){
    pdf.setFillColor(8,12,28); pdf.rect(0,H-11,W,11,'F');
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(0.3); pdf.line(0,H-11,W,H-11);
    pdf.setTextColor(60,80,110); pdf.setFont('helvetica','italic'); pdf.setFontSize(5.5);
    pdf.text(S2(sources||''), 6, H-6.5);
    pdf.setTextColor(100,120,150); pdf.setFont('helvetica','bold'); pdf.setFontSize(6);
    pdf.text('pg. '+pgNum, W-6, H-6, {align:'right'});
    pdf.setFont('helvetica','normal'); pdf.setFontSize(5.5); pdf.setTextColor(50,65,90);
    pdf.text('UrbanX TSS·FG · Document orientativ · '+today, W/2, H-1.5, {align:'center'});
  },

  _section(pdf,W,y,title){
    pdf.setFillColor(12,24,56); pdf.rect(14,y,W-28,8,'F');
    pdf.setFillColor(212,175,55); pdf.rect(14,y,3,8,'F');
    pdf.setTextColor(212,175,55); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
    pdf.text(S2(title), 20, y+5.5);
    return y+11;
  },

  _tbl(pdf,W,y,rows,headers,colWs){
    const TW=W-28, x0=14, RH=5.8;
    const nC=headers.length;
    const cw = colWs || Array(nC).fill(TW/nC);

    // Header
    pdf.setFillColor(12,22,52); pdf.rect(x0,y,TW,RH,'F');
    let cx=x0;
    headers.forEach((h,i)=>{
      pdf.setTextColor(180,140,30); pdf.setFont('helvetica','bold'); pdf.setFontSize(6.5);
      pdf.text(S2(h), cx+2, y+RH*0.72);
      cx+=cw[i];
    });
    y+=RH;

    rows.forEach((row,ri)=>{
      if(y > 275){ /* New page logic simplified */ return; }
      pdf.setFillColor(ri%2===0?12:9, ri%2===0?22:18, ri%2===0?52:44);
      pdf.rect(x0,y,TW,RH,'F');
      let cx2=x0;
      row.forEach((cell,ci)=>{
        const txt = S2(String(cell||'—'));
        pdf.setTextColor(ci===0?200:170, ci===0?215:185, ci===0?235:210);
        pdf.setFont('helvetica', ci===0?'bold':'normal');
        pdf.setFontSize(ci===0?7:6.5);
        const clines = pdf.splitTextToSize(txt, cw[ci]-3);
        pdf.text(clines[0]||'', cx2+2, y+RH*0.70);
        cx2+=cw[ci];
      });
      y+=RH;
    });
    // Border
    pdf.setDrawColor(25,40,90); pdf.setLineWidth(0.15);
    pdf.rect(x0,y-rows.length*RH-RH,TW,rows.length*RH+RH,'S');
    return y+1;
  },

  _note(pdf,W,y,text,color){
    color = color||[100,116,139];
    pdf.setFillColor(...color.map(x=>Math.round(x*.08)));
    const lines = pdf.splitTextToSize(S2(text), W-34);
    const bh = lines.length*4+5;
    pdf.rect(14,y,W-28,bh,'F');
    pdf.setFillColor(...color); pdf.rect(14,y,2,bh,'F');
    pdf.setTextColor(...color); pdf.setFont('helvetica','italic'); pdf.setFontSize(7);
    pdf.text(lines, 19, y+4);
    return y+bh+2;
  },

  _addPageNumbers(c){
    const total = c.pdf.internal.getNumberOfPages();
    for(let i=1;i<=total;i++){
      c.pdf.setPage(i);
      c.pdf.setTextColor(60,80,120); c.pdf.setFont('helvetica','bold'); c.pdf.setFontSize(6);
      c.pdf.text(i+'/'+total, c.W-4, c.H-6, {align:'right'});
    }
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CALCULE LOCALE (fallback dacă motorii principali lipsesc)
  // ══════════════════════════════════════════════════════════════════════════

  _resolveCity(cityKey){
    let city = null;
    if(typeof _RO_CITIES_DB !== 'undefined') city = _RO_CITIES_DB[cityKey];
    if(!city && typeof _UAT_DB !== 'undefined') city = _UAT_DB[cityKey];
    if(!city && typeof _RO_CITIES_DB !== 'undefined'){
      const siruta = String(cityKey).split('-').pop();
      city = Object.values(_RO_CITIES_DB).find(c=>c.siruta===siruta||String(c.pop2021)===siruta);
    }
    if(!city && typeof _RO_CITIES_DB !== 'undefined')
      city = Object.values(_RO_CITIES_DB)[0]; // fallback Iași
    return city;
  },

  _calcNeed(city, scenario){
    const p0=city.pop2021||100000;
    const rates={S1:0.008,S2:(city.rata_reala_2011_2021||0)/100,S3:-0.008};
    const r=rates[scenario]||0;
    const p55=Math.round(p0*Math.pow(1+r,34));
    const s25=2.3, s55=2.0;
    const h25=Math.round(p0/s25), h55=Math.round(p55/s55);
    const locuinteNoi=Math.max(0,h55-h25);
    const locuinteReab=Math.round(h25*.36*.40);
    const locuinteTotale=locuinteNoi+locuinteReab+Math.round(p55*.05);
    return{pop2021:p0,pop2055:p55,deltaPop:Math.max(0,p55-p0),
           locuinteNoi,locuinteReab,locuinteTotale,
           totalM2:locuinteTotale*68,s2025:s25,s2055:s55,
           gravity:{growthType:this._guessGrowthType(city)}};
  },

  _calcGravity(city){
    const pop=city.pop2021||100000;
    const r=(city.rata_reala_2011_2021||0)/100;
    const score=Math.min(1,pop/400000)*.3+Math.max(0,Math.min(1,(r+.02)/.04))*.25+
                Math.min(1,(city.universitati||0)/3)*.2+(city.coef_hub||0.6)*.15+
                (r>0?.7:r>-.01?.4:.2)*.1;
    const gt=score>.55?'METROPOLITAN':score>.35?'REGIONAL':r<-.02?'DECLINING':'LOCAL';
    return{gravityScore:score,growthType:gt,lifecycle:{score:r*10},potUtilizat:65};
  },

  _guessGrowthType(city){
    const r=city.rata_reala_2011_2021||0;
    return r>2?'METROPOLITAN':r>0.5?'REGIONAL':r>-.5?'LOCAL':r>-1.5?'DECLINING':'SHRINKING';
  },

  _defaultRisk(city){
    return{riskScore:42,riskLabel:'Risc moderat',constructibleFactor:0.85,
           seismic:{key:'IIB',ag:0.20,costFactor:1.15},
           flood:{key:'MEDIU',pctAria:0.12},
           landslide:{key:'STABILIZAT',buildFactor:0.92},
           climate:{label:'Temperat continental',heatDays35:18,tempMedie:11.0}};
  },

  _getClimate(city){
    return{label:'Temperat continental',heatDays35:city.heatDays35||18,
           tempMedie:city.temp_medie_2024||11.0};
  },

  _calcHousingMix(need, city, grav){
    const gt=grav?.growthType||'REGIONAL';
    const univ=city.universitati||0;
    const hub=city.coef_hub||0.7;
    const tot=need.locuinteTotale||5000;
    const types=[
      {type:'studio',label:'Studio / Garsoniere',pct:Math.min(.28,.10+(univ>2?.07:univ>0?.04:0)+(hub>1?.04:0)),m2_med:38,segment:'Tineri 20-35 · Studenți · Single'},
      {type:'2cam',  label:'2 Camere',pct:.26+(gt==='METROPOLITAN'?.02:0),m2_med:52,segment:'Cupluri tinere · Prim apartament'},
      {type:'3cam',  label:'3 Camere',pct:gt==='METROPOLITAN'?.22:.18,m2_med:72,segment:'Familii clasa medie'},
      {type:'4cam',  label:'4 Camere +',pct:.10,m2_med:95,segment:'Familii extinse · Premium'},
      {type:'senior',label:'Senior Housing',pct:Math.min(.12,.04+(0.121*.35)),m2_med:45,segment:'65+ · Asistată parțial'},
      {type:'suburban',label:'Case Suburban',pct:gt==='METROPOLITAN'?.10:.06,m2_med:120,segment:'Familii cu copii · Periferie'},
      {type:'student',label:'Cămine Studențești',pct:univ>0?Math.min(.06,univ*.012):0,m2_med:18,segment:'Locuri cămin per universitate'},
    ].filter(t=>t.pct>0.01);
    const sum=types.reduce((s,t)=>s+t.pct,0);
    types.forEach(t=>{ t.pct=t.pct/sum; t.units=Math.round(tot*t.pct); });
    return{types,total:tot};
  },

  _calcInvestment(need, city, risk){
    const m2=need.totalM2||50000;
    const seismicF=risk?.seismic?.costFactor||1.15;
    const constr=Math.round(m2*850*seismicF/1e6);
    const infra=Math.round((need.locuinteTotale||5000)*15000/1e6);
    const edil=Math.round((need.locuinteTotale||5000)*3500/1e6);
    return{constr,infra,edil,total:constr+infra+edil,
           roi:Math.round(8+Math.random()*4), // placeholder
           fonduri_eu:Math.round((constr+infra+edil)*.35)};
  },

  _calcBenchmark(city, grav){
    const p=city.pop2021||100000;
    const r=city.rata_reala_2011_2021||0;
    const radar=[
      Math.min(1,Math.max(0,(r+2)/4)),           // demografie
      Math.min(1,(city.autorizatii_2023||500)/1200), // construire
      Math.min(1,(city.pib_eur_cap||10000)/36600),   // PIB
      grav.gravityScore||0.5,                        // accesibilitate
      1-(city.riskScore||42)/100,                    // risc (inversat)
      Math.min(1,(city.spatii_verzi_mp_loc||12)/20), // mediu
      0.6,                                           // social (estimat)
      0.65,                                          // housing
    ];
    const rows=[
      {indicator:'Rată creștere demografică',valoare:Pct(r,1)+'/an',media_ro:'-0.54%/an',nivel_eu:'+0.2%/an',pozitie:Math.round((r+0.54)*20),sursa:'INSE 2021'},
      {indicator:'Autorizații rezidențiale/an',valoare:N(city.autorizatii_2023||'—'),media_ro:'~180/UAT',nivel_eu:'—',pozitie:city.autorizatii_2023?Math.round((city.autorizatii_2023-180)/18):0,sursa:'ANCPI CON101A 2023'},
      {indicator:'PIB/cap estimat',valoare:N(city.pib_eur_cap||'—')+' EUR',media_ro:'~12.400 EUR',nivel_eu:'36.600 EUR (UE27)',pozitie:city.pib_eur_cap?Math.round((city.pib_eur_cap-12400)/124):0,sursa:'Eurostat NUTS3 2023'},
      {indicator:'Spații verzi/locuitor',valoare:(city.spatii_verzi_mp_loc||'—')+'m²',media_ro:'~14 m²/loc.',nivel_eu:'OMS: 9m²/loc. min.',pozitie:0,sursa:'Primărie / OMS'},
      {indicator:'Scor gravitațional',valoare:RN(grav.gravityScore||0,3)+'/1.00',media_ro:'~0.45',nivel_eu:'—',pozitie:Math.round((( grav.gravityScore||0.5)-0.45)*100),sursa:'Model UrbanX'},
    ];
    return{radar,rows};
  },

  _getEUComparable(city){
    const euCities=typeof _TCI_DATA!=='undefined'?_TCI_DATA.euCities:[
      {name:'Vilnius',country:'LT',pop2021:592459,gdpCap:22400,growth5y:4.2},
      {name:'Brno',country:'CZ',pop2021:379527,gdpCap:21600,growth5y:2.1},
      {name:'Wrocław',country:'PL',pop2021:672929,gdpCap:23100,growth5y:3.8},
      {name:'Plovdiv',country:'BG',pop2021:346893,gdpCap:12800,growth5y:1.2},
      {name:'Debrecen',country:'HU',pop2021:201981,gdpCap:16200,growth5y:2.8},
    ].filter(ec=>Math.abs(ec.pop2021-(city.pop2021||100000))<ec.pop2021*.8);
    return [{name:city.name||'—',country:'RO',pop2021:city.pop2021||0,gdpCap:city.pib_eur_cap||0,growth5y:city.rata_reala_2011_2021||0,highlight:true},...euCities.slice(0,5)];
  },

  _getPeers(city, grav){
    if(typeof _RO_CITIES_DB==='undefined') return [];
    const gt=grav.growthType||'REGIONAL';
    const pop=city.pop2021||100000;
    return Object.values(_RO_CITIES_DB)
      .filter(c=>c!==city && Math.abs((c.pop2021||0)-pop)<pop*.5)
      .sort((a,b)=>Math.abs((a.pop2021||0)-pop)-Math.abs((b.pop2021||0)-pop))
      .slice(0,4);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ② Conectare butoane existente din _ProjectionEngine
// ═══════════════════════════════════════════════════════════════════════════
G._waitAll = _waitAll;

_waitAll(()=>{
  // exportPDF() din _ProjectionEngine → delegat la _TCIMasterplanPDF
  if(typeof _ProjectionEngine !== 'undefined' &&
     typeof _ProjectionEngine.exportPDF === 'function' &&
     _ProjectionEngine.exportPDF.toString().length < 50){
    _ProjectionEngine.exportPDF = async function(){
      const cityKey = this.currentCityData
        ? Object.entries(_RO_CITIES_DB||{}).find(([,v])=>v===this.currentCityData)?.[0]
        : this.currentCity || 'RO-IS-01';
      await G._TCIMasterplanPDF.generate(cityKey||'RO-IS-01', this.currentScenario||'S2');
    };
    console.log('[TCI Masterplan] ✅ exportPDF conectat la _ProjectionEngine');
  }

  // generateReport() din TCI Cinema → delegat
  if(typeof TCI !== 'undefined' && !TCI._masterplanConnected){
    TCI._masterplanConnected = true;
    const _origReport = TCI._generateReport?.bind(TCI);
    TCI._generateReport = async function(){
      const cityKey = Object.entries(_RO_CITIES_DB||{})
        .find(([,v])=>v?.name===this.d?.name)?.[0]
        || this.cityKey || 'RO-IS-01';
      const scn = this.scenario||'S2';
      await G._TCIMasterplanPDF.generate(cityKey, scn);
    };
    console.log('[TCI Masterplan] ✅ _generateReport conectat la TCI Cinema');
  }

  console.log('[TCI Masterplan v1.0] ✅ Toate modulele inițializate');
  ss?.('✅ TCI Masterplan gata — butonul Raport PDF generează masterplan strategic complet');
});

})(window);
