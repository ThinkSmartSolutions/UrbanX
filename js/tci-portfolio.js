// ═══════════════════════════════════════════════════════════════════════════
// tci-portfolio.js — UrbanX TSS·FG
// Portofoliu Proiecte Strategice — costuri, fazare 2025-2055, surse finanțare
// Conform: HG 907/2016 · Legea 98/2016 · Reg.UE 2021/1060 FEDR
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
const N=(v,d=0)=>isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});

G._Portfolio = {

  // Generare portofoliu din datele UAT + proiectii + coridoare
  generate(cityKey, liveData, corridors) {
    const city = window._RO_CITIES_DB?.[cityKey] || liveData || {};
    const proiS2 = liveData?.proiectii?.S2;
    const need = proiS2?.locuinteNecesare || {};
    const infra = proiS2?.infrastructura || {};
    const pib = liveData?.pib_eur_cap_live || city.pib_eur_cap || 12000;
    const eu27 = 36600;
    const fedrRate = pib/eu27 < 0.75 ? 0.85 : pib/eu27 < 1.0 ? 0.60 : 0.40;
    const pop = city.pop2021||100000;

    // Cost construire calibrat BNR 2024: ~1.200 €/mp rezidential
    const costMpRez = 1200;
    const costMpInfra = 800;
    const locuinteTotal = need.total || 5000;

    const projects = [];

    // ── AXA 1: LOCUIRE ────────────────────────────────────────────────────
    projects.push({
      id:'LOC-01', axa:'LOCUIRE', prioritate:1,
      titlu:'Locuințe noi — Densificare coridoare TOD',
      descriere:`${N(Math.round(locuinteTotal*0.45))} unități rezidențiale pe coridoarele TOD identificate. Densificare controlată P+5—P+8, mix funcțional.`,
      cost_mil_eur: Math.round(locuinteTotal*0.45*65*costMpRez/1e6),
      faze: [
        { an:'2025-2030', actiune:'Actualizare PUG + PUZ coridoare', cost_pct:8 },
        { an:'2030-2035', actiune:'Construire prima etapă (35%)', cost_pct:35 },
        { an:'2035-2045', actiune:'Construire etapa a doua (40%)', cost_pct:40 },
        { an:'2045-2055', actiune:'Completare și evaluare (17%)', cost_pct:17 },
      ],
      surse: [
        { sursa:'Sector privat + piață', pct:70, ref:'Mecanism piață liberă' },
        { sursa:'ANL — Agenția Națională a Locuinței', pct:15, ref:'Legea 152/1998' },
        { sursa:'FEDR POR 2021-2027+', pct:15, ref:`Reg.UE 2021/1060 — ${Math.round(fedrRate*100)}% rată` },
      ],
      kpi:'Nr. unități/an · Grad ocupare · Prețuri piață · Acces tânăra generație',
      legal:'Legea 50/1991 · Legea 350/2001 · HG 525/1996 RGU',
    });

    projects.push({
      id:'LOC-02', axa:'LOCUIRE', prioritate:2,
      titlu:'Reabilitare fond construit 1960-1989',
      descriere:`${N(need.reinnoire_fond_uzat||Math.round(locuinteTotal*0.25))} unități cu uzură morală și termică. Reabilitare energetică NZEB + seismică Rz II+.`,
      cost_mil_eur: Math.round((need.reinnoire_fond_uzat||locuinteTotal*0.25)*65*800/1e6),
      faze: [
        { an:'2025-2028', actiune:'Cadastru fond uzat + cartare seismică', cost_pct:5 },
        { an:'2028-2035', actiune:'Reabilitare prioritară Rz I/II (50%)', cost_pct:50 },
        { an:'2035-2055', actiune:'Reabilitare restul fondului', cost_pct:45 },
      ],
      surse: [
        { sursa:'PNRR C10-I2 Seismic', pct:40, ref:'100% grant pentru Rz I/II' },
        { sursa:'PNRR C5 Eficiență Energetică', pct:35, ref:'Legea 372/2005 + EPBD 2024' },
        { sursa:'Proprietari + credit bancar', pct:25, ref:'Schema garantare FNGCIMM' },
      ],
      kpi:'Nr. clădiri reabilitate/an · Economie energie % · Incidente seismice prevenite',
      legal:'OUG 18/2009 · Legea 282/2015 (seismic) · Legea 372/2005 (eficiență energetică)',
    });

    // ── AXA 2: MOBILITATE ─────────────────────────────────────────────────
    const costTP = Math.round(pop/100000*8); // ~8M EUR per 100k locuitori
    projects.push({
      id:'MOB-01', axa:'MOBILITATE', prioritate:1,
      titlu:'Modernizare Transport Public Urban — SUMP',
      descriere:`Plan de Mobilitate Urbană Durabilă (SUMP). Flota electrică, benzi dedicate, integrare tarifară, aplicație mobilitate.`,
      cost_mil_eur: costTP,
      faze: [
        { an:'2025-2027', actiune:'Elaborare SUMP + studii trafic', cost_pct:5 },
        { an:'2027-2030', actiune:'Flotă electrică + infrastructură (50%)', cost_pct:50 },
        { an:'2030-2035', actiune:'Extindere rețea + integrare regională', cost_pct:30 },
        { an:'2035-2055', actiune:'Optimizare + extindere', cost_pct:15 },
      ],
      surse: [
        { sursa:'FEDR POR OS2.3 Mobilitate urbană', pct:Math.round(fedrRate*85), ref:`${Math.round(fedrRate*100)}% rată co-finanțare` },
        { sursa:'Buget local + credit BEI', pct:100-Math.round(fedrRate*85), ref:'BEI Urban Development' },
      ],
      kpi:'Modal split TP (țintă 30% 2035) · Emisii CO₂ transport · Acoperire TP %',
      legal:'OUG 57/2019 Cod Administrativ · SUMP Reg.UE 2021/1056 · Legea 92/2021',
    });

    projects.push({
      id:'MOB-02', axa:'MOBILITATE', prioritate:2,
      titlu:'Infrastructură Velo-urbană + Zone Pietonale',
      descriere:`Rețea coerentă de piste ciclism 80km, 5 zone pietonale extinse, 20 puncte Park & Bike. Implementare "15-minute city" (Moreno, 2021).`,
      cost_mil_eur: Math.round(pop/1e5*3.5),
      faze: [
        { an:'2025-2028', actiune:'Rețea primară velo + 2 zone pietonale pilot', cost_pct:40 },
        { an:'2028-2035', actiune:'Extindere rețea + conectare cartiere', cost_pct:45 },
        { an:'2035-2055', actiune:'Completare + întreținere', cost_pct:15 },
      ],
      surse: [
        { sursa:'FEDR POR — Mobilitate sustenabilă', pct:70, ref:'OS2.3' },
        { sursa:'CEF Transport — componenta urbană', pct:15, ref:'Reg.UE 2021/1153' },
        { sursa:'Buget local', pct:15, ref:'HG 907/2016' },
      ],
      kpi:'Km piste velo · Modal split bicicletă (țintă 8% 2035) · Nr. utilizatori/zi',
      legal:'OG 43/1997 (drumuri) · Legea 38/2003 (biciclism) · SUMP',
    });

    // ── AXA 3: ECONOMIE ───────────────────────────────────────────────────
    projects.push({
      id:'ECO-01', axa:'ECONOMIE', prioritate:1,
      titlu:'Reconversie Zone Industriale — Brownfield',
      descriere:`Reconversia terenurilor industriale dezafectate în zone mixte: co-working, tech hub, rezidențial loft, cultură. Model: Barcelona 22@ District.`,
      cost_mil_eur: Math.round(pop/1e5*12),
      faze: [
        { an:'2025-2028', actiune:'Studii fezabilitate + decontaminare teren', cost_pct:15 },
        { an:'2028-2035', actiune:'Reconversie prima etapă (50%)', cost_pct:55 },
        { an:'2035-2055', actiune:'Completare + activare economică', cost_pct:30 },
      ],
      surse: [
        { sursa:'FEDR — OS1.1 Competitivitate', pct:45, ref:`${Math.round(fedrRate*100)}% rată` },
        { sursa:'InvestEU — Pilonul 1 Inovare', pct:20, ref:'Reg.UE 2021/523' },
        { sursa:'Sector privat (PPP)', pct:35, ref:'Legea 233/2016 PPP' },
      ],
      kpi:'Nr. locuri muncă create · Valoare adăugată brută · Ocupare teren brownfield %',
      legal:'Legea 350/2001 PUZ · OUG 114/2007 · Legea 292/2018 (teren degradat)',
    });

    projects.push({
      id:'ECO-02', axa:'ECONOMIE', prioritate:2,
      titlu:'Ecosistem Antreprenorial & Hub Digital',
      descriere:`Parc tehnologic, accelerator startup, co-working municipal, laborator urban data. Integrare platformă UrbanX ca instrument de planificare digitală.`,
      cost_mil_eur: Math.round(pop/1e5*5),
      faze: [
        { an:'2025-2027', actiune:'Strategie + spațiu pilot hub digital', cost_pct:20 },
        { an:'2027-2032', actiune:'Construire parc tehnologic', cost_pct:60 },
        { an:'2032-2055', actiune:'Operaționalizare + scale-up', cost_pct:20 },
      ],
      surse: [
        { sursa:'FSE+ — OS4.1 Competențe digitale', pct:50, ref:'80% rată co-finanțare' },
        { sursa:'Horizon Europe — Cluster', pct:20, ref:'Reg.UE 2021/695' },
        { sursa:'Buget local + parteneriate', pct:30, ref:'HCL' },
      ],
      kpi:'Nr. startup-uri incubate/an · Locuri muncă IT · Venituri ecosistem',
      legal:'Legea 346/2004 (IMM) · OG 57/2002 (cercetare-inovare)',
    });

    // ── AXA 4: INFRASTRUCTURA TEHNICO-EDILITARA ───────────────────────────
    const infra_cost = Math.round(pop/1e5 * 15);
    projects.push({
      id:'INF-01', axa:'INFRASTRUCTURĂ', prioritate:1,
      titlu:'Modernizare Infrastructură Tehnico-Edilitară',
      descriere:`Extindere și reabilitare rețele apă-canal, modernizare energetică rețele, smart metering, reducere pierderi la 15%.`,
      cost_mil_eur: infra_cost,
      faze: [
        { an:'2025-2028', actiune:'Audit rețele + proiectare', cost_pct:10 },
        { an:'2028-2035', actiune:'Reabilitare rețele principale', cost_pct:50 },
        { an:'2035-2055', actiune:'Extindere + rețele noi cartiere', cost_pct:40 },
      ],
      surse: [
        { sursa:'FC Coeziune — OS2.1 Apă și canalizare', pct:Math.round(fedrRate*100), ref:'85% rată regiuni mai puțin dezv.' },
        { sursa:'BEI — Environmental Infrastructure', pct:10, ref:'Împrumut preferențial' },
        { sursa:'Buget local + tarife servicii', pct:100-Math.round(fedrRate*100)-10, ref:'ANRSC' },
      ],
      kpi:'Acoperire apă % · Pierderi rețea % · Calitate apă indicator · Eficiență energetică',
      legal:'Legea 241/2006 (apă) · Directiva 91/271/CEE · Legea 123/2012 (energie)',
    });

    // ── AXA 5: SPATII VERZI SI CLIMA ──────────────────────────────────────
    const spV = city.spatii_verzi_mp_loc||11;
    const spV_deficit = Math.max(0, 9-spV); // OMS: 9m²/loc minim
    projects.push({
      id:'SV-01', axa:'SPAȚII VERZI & CLIMĂ', prioritate: spV<9?1:2,
      titlu:'Infrastructură Verde — Rețea Ecologică Urbană',
      descriere:`${spV<9?`URGENT — deficit față de standard OMS: ${spV}m²/loc față de 9m²/loc minim. ` : ''}${N(Math.round(infra.spatii_verzi_ha||pop*9/10000))} ha spații verzi noi, coridor ecologic, renaturare cursuri apă.`,
      cost_mil_eur: Math.round((infra.spatii_verzi_ha||pop*9/10000)*0.8), // ~0.8M EUR/ha parc urban
      faze: [
        { an:'2025-2027', actiune:'Inventar terenuri + proiect rețea ecologică', cost_pct:5 },
        { an:'2027-2033', actiune:'Amenajare parcuri + coridor verde principal', cost_pct:55 },
        { an:'2033-2055', actiune:'Extindere + întreținere', cost_pct:40 },
      ],
      surse: [
        { sursa:'FEDR — OS2.7 Biodiversitate & Natură', pct:75, ref:'Green Deal · Reg.UE 2021/1060' },
        { sursa:'Life+ Programme', pct:10, ref:'60% rată finanțare' },
        { sursa:'Buget local', pct:15, ref:'Legea 24/2007 spații verzi' },
      ],
      kpi:`Spații verzi m²/loc (țintă 15m² 2035 · OMS 9m²) · Indice biodiversitate · Zile căldură extremă`,
      legal:'Legea 24/2007 · OMS standard 9m²/loc · Directiva UE Biodiversitate 2030',
    });

    // ── AXA 6: DIGITALIZARE SI GUVERNANTA ────────────────────────────────
    projects.push({
      id:'DIG-01', axa:'DIGITALIZARE & GUVERNANȚĂ', prioritate:2,
      titlu:'Digital Twin Urban — Platformă Date Teritoriale',
      descriere:`Implementare digital twin urban integrat cu platformă UrbanX, date cadastrale ANCPI, sensori IoT urban, dashboard public. Model: Singapore, Helsinki.`,
      cost_mil_eur: Math.round(pop/1e5*2.5),
      faze: [
        { an:'2025-2027', actiune:'Arhitectură date + pilot digital twin', cost_pct:30 },
        { an:'2027-2032', actiune:'Extindere platformă + integrare ANCPI/INSE', cost_pct:50 },
        { an:'2032-2055', actiune:'Operaționalizare + actualizare continuă', cost_pct:20 },
      ],
      surse: [
        { sursa:'FEDR — OS1.5 Digitalizare', pct:50, ref:'Min.Cercetării + MCID' },
        { sursa:'PNRR C7 — Transformare digitală', pct:35, ref:'Jaloane PNRR digitalizare' },
        { sursa:'Buget local', pct:15, ref:'HCL' },
      ],
      kpi:'Grad digitalizare servicii % · Utilizatori platformă · Decizii bazate pe date %',
      legal:'Reg.UE INSPIRE 2007/2/CE · Legea 51/2003 · GDPR',
    });

    // Calcul total portofoliu
    const total = projects.reduce((s,p)=>s+(p.cost_mil_eur||0),0);
    const totalFedr = projects.reduce((s,p)=>{
      const fedrSursa = p.surse.find(su=>su.sursa.includes('FEDR')||su.sursa.includes('FC'));
      return s+(fedrSursa?(p.cost_mil_eur*fedrSursa.pct/100):0);
    },0);

    return {
      cityKey, city: city.name,
      generated: new Date().toISOString(),
      projects,
      total_mil_eur: total,
      total_fedr_mil_eur: Math.round(totalFedr),
      total_privat_mil_eur: Math.round(total-totalFedr),
      per_an_mil_eur: Math.round(total/30),
      per_cap_eur: Math.round(total*1e6/(city.pop2021||100000)),
      note: 'Estimări orientative. Costuri reale necesită SF/DALI per proiect (HG 907/2016).',
    };
  },

  // Render HTML dashboard portofoliu
  renderDashboard(portfolio) {
    if(!portfolio) return '<div style="color:#64748b;padding:20px">Portofoliu negăsit</div>';

    const byAxa = {};
    portfolio.projects.forEach(p => { (byAxa[p.axa]||(byAxa[p.axa]=[])).push(p); });

    const axaColors = {
      'LOCUIRE':'#D4AF37', 'MOBILITATE':'#60a5fa', 'ECONOMIE':'#22c55e',
      'INFRASTRUCTURĂ':'#f97316', 'SPAȚII VERZI & CLIMĂ':'#34d399', 'DIGITALIZARE & GUVERNANȚĂ':'#a78bfa',
    };

    return `
      <div style="font-family:'Courier New',monospace;color:#c8d7f0">

        <!-- Header KPI -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
          ${[
            ['TOTAL PORTOFOLIU', portfolio.total_mil_eur+' mil. €', '#D4AF37'],
            ['FONDURI UE', portfolio.total_fedr_mil_eur+' mil. €', '#60a5fa'],
            ['PER AN (mediu)', portfolio.per_an_mil_eur+' mil. €/an', '#22c55e'],
          ].map(([l,v,c])=>`
            <div style="background:rgba(10,20,50,.8);border-radius:8px;padding:10px;text-align:center;
              border:1px solid rgba(30,58,138,.4)">
              <div style="color:#64748b;font-size:9px">${l}</div>
              <div style="color:${c};font-size:15px;font-weight:700">${v}</div>
            </div>
          `).join('')}
        </div>

        <!-- Bar chart buget per axa -->
        <div style="background:rgba(8,14,38,.8);border-radius:8px;padding:12px;margin-bottom:12px;
          border:1px solid rgba(30,58,138,.4)">
          <div style="color:#94a3b8;font-size:10px;font-weight:700;margin-bottom:8px">DISTRIBUȚIE BUGET PE AXE</div>
          ${Object.entries(byAxa).map(([axa,prjs])=>{
            const total_axa = prjs.reduce((s,p)=>s+(p.cost_mil_eur||0),0);
            const pct = Math.round(total_axa/portfolio.total_mil_eur*100);
            const col = axaColors[axa]||'#94a3b8';
            return `<div style="margin-bottom:6px">
              <div style="display:flex;justify-content:space-between;font-size:9px;margin-bottom:2px">
                <span style="color:${col}">${axa}</span>
                <span style="color:#94a3b8">${total_axa} mil. € (${pct}%)</span>
              </div>
              <div style="background:rgba(15,25,60,.8);border-radius:3px;height:6px;overflow:hidden">
                <div style="background:${col};height:100%;width:${pct}%;border-radius:3px;transition:width 1s"></div>
              </div>
            </div>`;
          }).join('')}
        </div>

        <!-- Proiecte per axa -->
        ${Object.entries(byAxa).map(([axa,prjs])=>{
          const col = axaColors[axa]||'#94a3b8';
          return `
            <div style="margin-bottom:12px">
              <div style="color:${col};font-size:11px;font-weight:700;padding:6px 10px;
                background:rgba(10,20,50,.6);border-radius:6px;margin-bottom:6px;
                border-left:3px solid ${col}">
                AXA: ${axa}
              </div>
              ${prjs.map(p=>`
                <div style="background:rgba(8,14,38,.7);border-radius:8px;padding:10px;
                  margin-bottom:6px;border:1px solid rgba(30,58,138,.3)">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
                    <div>
                      <span style="background:rgba(30,58,138,.4);color:#94a3b8;font-size:8px;
                        padding:2px 5px;border-radius:3px;margin-right:6px">${p.id}</span>
                      <span style="color:#c8d7f0;font-size:11px;font-weight:700">${p.titlu}</span>
                    </div>
                    <span style="color:${col};font-size:12px;font-weight:700;white-space:nowrap;margin-left:8px">
                      ${p.cost_mil_eur} mil. €
                    </span>
                  </div>
                  <div style="color:#64748b;font-size:9px;margin-bottom:6px">${p.descriere.slice(0,120)}${p.descriere.length>120?'…':''}</div>

                  <!-- Fazare -->
                  <div style="display:flex;gap:2px;margin-bottom:6px">
                    ${p.faze.map(f=>`
                      <div style="flex:${f.cost_pct};background:rgba(${
                        f.an<'2030'?'212,175,55':f.an<'2040'?'59,130,246':'34,197,94'
                      },.2);border-radius:3px;padding:3px 4px;min-width:0">
                        <div style="color:#64748b;font-size:7px;white-space:nowrap;overflow:hidden">${f.an}</div>
                        <div style="color:#94a3b8;font-size:7px">${f.cost_pct}%</div>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Surse finantare -->
                  <div style="display:flex;gap:4px;flex-wrap:wrap">
                    ${p.surse.map(s=>`
                      <span style="background:rgba(30,58,138,.3);color:#60a5fa;font-size:8px;
                        padding:2px 6px;border-radius:12px">
                        ${s.sursa.split(' — ')[0].split(' ').slice(0,3).join(' ')} ${s.pct}%
                      </span>
                    `).join('')}
                  </div>

                  <div style="color:#334155;font-size:8px;margin-top:4px">KPI: ${p.kpi.slice(0,80)}</div>
                </div>
              `).join('')}
            </div>
          `;
        }).join('')}

        <!-- Footer legal -->
        <div style="color:#334155;font-size:8px;padding:8px;border-top:1px solid rgba(30,58,138,.2)">
          ${portfolio.note}<br>
          Cadru legal: HG 907/2016 SF/DALI · Legea 98/2016 achiziții · Reg.UE 2021/1060 FEDR<br>
          Generat: ${new Date(portfolio.generated).toLocaleString('ro-RO')}
        </div>
      </div>
    `;
  },

  // Export PDF portofoliu
  async exportPDF(portfolio) {
    const J = typeof jsPDF!=='undefined'?jsPDF:window.jspdf?.jsPDF;
    if(!J) { window.ss?.('❌ jsPDF indisponibil'); return; }

    const pdf = new J({orientation:'portrait', unit:'mm', format:'a4'});
    const W=210, H=297;
    const today = new Date().toLocaleDateString('ro-RO',{year:'numeric',month:'long',day:'numeric'});

    // Cover
    pdf.setFillColor(4,10,28); pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(212,175,55); pdf.rect(0,H*0.55,W,0.8,'F');
    pdf.setTextColor(212,175,55); pdf.setFont('helvetica','bold'); pdf.setFontSize(24);
    pdf.text('PORTOFOLIU PROIECTE STRATEGICE', W/2, 80, {align:'center'});
    pdf.setTextColor(255,255,255); pdf.setFontSize(16);
    pdf.text((portfolio.city||'UAT').toUpperCase()+' · 2025–2055', W/2, 96, {align:'center'});
    pdf.setTextColor(148,163,184); pdf.setFontSize(11);
    pdf.text(`Total estimat: ${portfolio.total_mil_eur} mil. EUR`, W/2, 114, {align:'center'});
    pdf.text(`${portfolio.projects.length} proiecte · 6 axe strategice`, W/2, 122, {align:'center'});
    pdf.setTextColor(71,85,105); pdf.setFontSize(8);
    pdf.text('UrbanX TSS·FG v2.0 · Document orientativ · Necesită validare SF/DALI', W/2, 240, {align:'center'});
    pdf.text(today, W/2, 248, {align:'center'});

    // Pagini per axa
    const byAxa = {};
    portfolio.projects.forEach(p=>{(byAxa[p.axa]||(byAxa[p.axa]=[])).push(p);});
    const axaColors2 = {
      'LOCUIRE':[212,175,55],'MOBILITATE':[59,130,246],'ECONOMIE':[34,197,94],
      'INFRASTRUCTURĂ':[249,115,22],'SPAȚII VERZI & CLIMĂ':[52,211,153],'DIGITALIZARE & GUVERNANȚĂ':[167,139,250],
    };

    Object.entries(byAxa).forEach(([axa,prjs])=>{
      pdf.addPage();
      const col = axaColors2[axa]||[148,163,184];
      pdf.setFillColor(4,10,28); pdf.rect(0,0,W,H,'F');
      pdf.setFillColor(...col); pdf.rect(0,0,W,16,'F');
      pdf.setTextColor(4,10,28); pdf.setFont('helvetica','bold'); pdf.setFontSize(11);
      pdf.text('AXA: '+axa, 14, 10.5);
      let y=22;
      prjs.forEach(p=>{
        if(y>H-40){pdf.addPage();pdf.setFillColor(4,10,28);pdf.rect(0,0,W,H,'F');y=14;}
        pdf.setFillColor(8,16,42); pdf.roundedRect(14,y,W-28,8,1,1,'F');
        pdf.setFillColor(...col); pdf.rect(14,y,3,8,'F');
        pdf.setTextColor(...col); pdf.setFont('helvetica','bold'); pdf.setFontSize(8.5);
        pdf.text(p.id+' — '+p.titlu.slice(0,60), 20,y+5.5);
        pdf.setTextColor(200,215,235); pdf.setFont('helvetica','bold'); pdf.setFontSize(9);
        pdf.text(p.cost_mil_eur+' mil. €', W-16,y+5.5,{align:'right'});
        y+=10;
        pdf.setTextColor(148,163,184); pdf.setFont('helvetica','normal'); pdf.setFontSize(7.5);
        const desc = pdf.splitTextToSize(p.descriere, W-30).slice(0,3);
        desc.forEach((l,i)=>{ if(window._jPdfLine && desc.length>1) window._jPdfLine(pdf,l,17,y+i*4,W-30,i===desc.length-1); else pdf.text(l,17,y+i*4); });
        y+=desc.length*4+2;
        // Surse
        pdf.setTextColor(96,165,250); pdf.setFontSize(7);
        pdf.text('Finanțare: '+p.surse.map(s=>s.sursa.split(' — ')[0]+' '+s.pct+'%').join(' · '), 17,y);
        y+=4;
        pdf.setTextColor(50,70,110); pdf.setFontSize(7);
        pdf.text('KPI: '+p.kpi.slice(0,100), 17,y);
        y+=4;
        // Fazare
        const fazW = (W-32)/p.faze.length;
        p.faze.forEach((f,fi)=>{
          const fx=14+fi*fazW+(W-28)/p.faze.length*fi;
          const fc=fi===0?[212,175,55]:fi===1?[59,130,246]:[34,197,94];
          pdf.setFillColor(...fc,50); pdf.roundedRect(17+fi*(W-34)/p.faze.length, y, (W-34)/p.faze.length-1, 6,1,1,'F');
          pdf.setTextColor(...fc); pdf.setFontSize(6.5);
          pdf.text(f.an+' · '+f.cost_pct+'%', 19+fi*(W-34)/p.faze.length, y+4.2);
        });
        y+=9;
        pdf.setDrawColor(15,28,65); pdf.setLineWidth(0.2);
        pdf.line(14,y,W-14,y);
        y+=5;
      });
    });

    // Pagina rezumat financiar
    pdf.addPage();
    pdf.setFillColor(4,10,28); pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(212,175,55); pdf.rect(0,0,W,16,'F');
    pdf.setTextColor(4,10,28); pdf.setFont('helvetica','bold'); pdf.setFontSize(11);
    pdf.text('REZUMAT FINANCIAR + SURSE FINANȚARE', 14, 10.5);
    let y2=24;
    pdf.setTextColor(148,163,184); pdf.setFont('helvetica','normal'); pdf.setFontSize(8);
    [
      ['Total portofoliu', portfolio.total_mil_eur+' mil. EUR',''],
      ['din care Fonduri UE', portfolio.total_fedr_mil_eur+' mil. EUR','(~'+Math.round(portfolio.total_fedr_mil_eur/portfolio.total_mil_eur*100)+'%)'],
      ['din care Sector privat/local', portfolio.total_privat_mil_eur+' mil. EUR',''],
      ['Investiție per an (medie)', portfolio.per_an_mil_eur+' mil. EUR/an','2025-2055'],
      ['Investiție per locuitor', N(portfolio.per_cap_eur)+' EUR/loc.',''],
    ].forEach(([l,v,n])=>{
      pdf.setFillColor(8,16,42); pdf.rect(14,y2,W-28,8,'F');
      pdf.setTextColor(148,163,184); pdf.setFont('helvetica','normal'); pdf.setFontSize(8);
      pdf.text(l,17,y2+5.5);
      pdf.setTextColor(212,175,55); pdf.setFont('helvetica','bold'); pdf.setFontSize(9);
      pdf.text(v,W-16,y2+5.5,{align:'right'});
      pdf.setTextColor(100,120,150); pdf.setFont('helvetica','normal'); pdf.setFontSize(7);
      if(n) pdf.text(n, W-16,y2+9,{align:'right'});
      y2+=11;
    });
    y2+=6;
    pdf.setTextColor(50,70,110); pdf.setFont('helvetica','italic'); pdf.setFontSize(7.5);
    pdf.text(portfolio.note, 14, y2, {maxWidth:W-28});

    const fname = 'portofoliu_'+( portfolio.city||'uat').toLowerCase().replace(/[^a-z0-9]/g,'_')+'_2025_2055.pdf';
    pdf.save(fname);
    window.ss?.('✅ Portofoliu exportat: '+fname);
  },
};

window._Portfolio = G._Portfolio;
window.generatePortfolio = async function() {
  const k = window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01';
  const liveData = await window._DataEngine?.fetchCityData(k) || window._RO_CITIES_DB?.[k];
  const zoneData = window._ZoneEngine?._cache?.[k];
  const corridors = window._CorridorsLayer?.generateCorridors(k, zoneData, liveData) || [];
  const portfolio = window._Portfolio.generate(k, liveData, corridors);
  window._lastPortfolio = portfolio;

  // Afisam in UAT Dashboard sau panel separat
  const existing = document.getElementById('portfolio-panel');
  if(existing) { existing.remove(); return; }

  const panel = document.createElement('div');
  panel.id = 'portfolio-panel';
  panel.style.cssText = `
    position:fixed;top:0;left:0;width:min(480px,100vw);height:100vh;
    background:rgba(4,10,28,.97);border-right:1px solid rgba(212,175,55,.3);
    z-index:8400;overflow-y:auto;font-family:'Courier New',monospace;
  `;
  panel.innerHTML = `
    <div style="position:sticky;top:0;background:rgba(4,10,28,.97);
      padding:12px 16px;border-bottom:1px solid rgba(212,175,55,.2);
      display:flex;justify-content:space-between;align-items:center;z-index:2">
      <div>
        <div style="color:#D4AF37;font-weight:700">📋 Portofoliu Strategic 2025-2055</div>
        <div style="color:#64748b;font-size:10px">${portfolio.city} · ${portfolio.total_mil_eur} mil. EUR · ${portfolio.projects.length} proiecte</div>
      </div>
      <div style="display:flex;gap:6px">
        <button onclick="window._Portfolio.exportPDF(window._lastPortfolio)"
          style="background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.3);
            color:#D4AF37;padding:5px 10px;border-radius:6px;cursor:pointer;font-size:10px">
          📄 PDF
        </button>
        <button onclick="document.getElementById('portfolio-panel').remove()"
          style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);
            color:#ef4444;padding:5px 10px;border-radius:6px;cursor:pointer">✕</button>
      </div>
    </div>
    <div style="padding:16px">${window._Portfolio.renderDashboard(portfolio)}</div>
  `;
  document.body.appendChild(panel);
  window.ss?.('✅ Portofoliu generat: '+portfolio.projects.length+' proiecte · '+portfolio.total_mil_eur+' mil. EUR');
};

console.log('[UrbanX] Portfolio v1.0: 6 axe · FEDR+PNRR+PPP · fazare 2025-2055');
})(window);
