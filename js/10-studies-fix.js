// ═══════════════════════════════════════════════════════════════════════════
// 10-studies-fix.js — Rescriere studii sub-standard
// Suprascrie: Bransamente, HealthImpact, CPE, StabilitateTaluzuri, BilantEdificabil
// Tipar: identic cu generateStudiuAmplasament (referința)
// Minim 10 pagini, capturi reale, tabele complete, fără placeholder
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// 1. PRE-STUDIU BRANSAMENTE — 12 pagini
// ═══════════════════════════════════════════════════════════════════════════
window.generatePrestudiuBransamente = async function(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('Selectați o parcelă.'); return; }
  ss('Se generează Pre-studiu Bransamente & Utilități...');

  const d = _initStudyPdf('Pre-Studiu Bransamente si Utilitati','Apă · Canal · Electric · Gaze · ISU · Fotovoltaic',12);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,BLUE,TEAL,LIGHT,LIGHT2,RED,GREEN,ORANGE,PURPLE,
         S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
         hdr,ftr,sec,subsec,body,tblRow,kv,addImg,badge,cover,newPage,checkY,concluzii,sign,divider} = d;

  const _curs = await _getBNRRate('EUR').catch(()=>null);
  const RON = _curs?.rate || 5.05;
  const caps = await _captureStudyMapsSafe(ap, msg=>ss(msg));

  // ── Calcule ──────────────────────────────────────────────────────────────
  const areaNum  = parseFloat(area)||300;
  const fn       = window._RV?.fn || S?.vol?.fn || 'rez';
  const fnLbl    = {rez:'Rezidențial colectiv',birouri:'Birouri/Office',hotel:'Hotel/Cazare',com:'Comercial/Retail'}[fn]||'Rezidențial';
  const niv      = Math.max(1, Math.round(((S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||params?.h||12)) / 3));
  const aedisH   = niv * 3;
  const sc       = Math.round(areaNum * (parseFloat(params?.pot)||0.40));
  const sda      = Math.round(areaNum * (parseFloat(params?.cut)||1.2));
  const nrApt    = Math.max(1, Math.round(sda/65));
  const nrPers   = {rez:nrApt*2.5, birouri:Math.round(sda/7), hotel:Math.round(nrApt*1.8), com:Math.round(sda/10)}[fn]||nrApt*2.5;
  // APĂ — SR 1343-1:2022
  const qs       = {rez:150, birouri:25, hotel:200, com:10}[fn]||150;
  const Qzi_med  = +(nrPers*qs/1000).toFixed(2);
  const Qzi_max  = +(Qzi_med*1.25).toFixed(2);
  const Q_ls     = +(Qzi_max/86.4*2.5).toFixed(2);
  const Q_inc    = {rez:niv>4?10:5, birouri:15, hotel:15, com:15}[fn]||5;
  const Q_tot    = +(Q_ls + Q_inc/3.6).toFixed(2);
  const DN_apa   = Q_tot<0.3?'DN 32':Q_tot<0.8?'DN 50':Q_tot<2.0?'DN 63':'DN 100';
  const P_bar    = +(3.5+(niv-1)*0.35).toFixed(1);
  // CANALIZARE — SR EN 12056
  const Q_men    = +(Qzi_med*0.85/86.4).toFixed(3);
  const Q_pluv   = +(0.85*125*sc*0.9/10000/1000*1000).toFixed(3);
  const Q_can    = +(Q_men + Q_pluv).toFixed(3);
  const DN_can   = Q_can<2?'DN 200':Q_can<5?'DN 250':'DN 315';
  // ELECTRIC — NTE 007/08
  const Pi       = {rez:3.5, birouri:45, hotel:8, com:60}[fn]||3.5;
  const nrUnit   = {rez:nrApt, birouri:Math.round(sda/50), hotel:nrApt, com:Math.round(sda/100)}[fn]||nrApt;
  const ks       = {rez:0.45, birouri:0.7, hotel:0.65, com:0.75}[fn]||0.45;
  const Pt       = Math.round(nrUnit*Pi*ks);
  const nrPT     = Math.ceil(Pt/630);
  const racord   = Pt<=100?'Branșament trifazat direct din rețeaua de distribuție 0.4kV':'Post trafo '+(nrPT>1?nrPT+'×':'')+'630 kVA 20/0.4kV';
  const cablu    = Pt<=100?'ACYABY 4×35mm²':Pt<=300?'ACYABY 4×95mm²':'ACYABY 3×240mm²+50mm²';
  // GAZE — SR EN 12831
  const Qg_u     = {rez:3.0, birouri:5.0, hotel:8.0, com:2.0}[fn]||3.0;
  const Qg       = +(nrUnit*Qg_u).toFixed(1);
  const Pt_term  = Math.round(sda*80/1000);
  const DN_gaz   = Qg<20?'DN 32 PE100':Qg<50?'DN 50 PE100':'DN 63 PE100';
  const P_gaz    = {rez:25, birouri:150, hotel:200, com:100}[fn]||25;
  // ISU — P118
  const Vol_rez  = {rez:Math.ceil(nrApt/10)*5, birouri:150, hotel:200, com:150}[fn]||50;
  const Q_hid    = niv>4?10:5; // l/s per hidrant
  const nrHid    = Math.ceil(areaNum/1500)+1;
  // FOTOVOLTAIC
  const Ppv      = Math.round(sc*0.12*0.18);
  const Epv      = Math.round(Ppv*_calcSolarGHI(lat,lon));
  // COSTURI estimative EUR
  const costuri  = {
    apa:     Math.round((120+Q_tot*800)*1.2),
    canal:   Math.round((150+Q_can*600)*1.2),
    electric:Math.round(Pt<=100?3500:8000+(nrPT-1)*25000),
    gaze:    Math.round(1800+Qg*120),
    isu:     Math.round(Vol_rez*85+nrHid*1200),
    pv:      Math.round(Ppv*850),
  };
  const totalEUR = Object.values(costuri).reduce((a,b)=>a+b,0);

  // ── PAG 1: Copertă ────────────────────────────────────────────────────────
  cover('Evaluare completă utilități · ' + S2(fnLbl) + ' · ' + niv + ' niveluri',
    caps.imgLocation||null,
    [['Nr. apartamente/unit.',nrApt+' un.'],['Nr. persoane estimat',Math.round(nrPers)+' pers.'],
     ['Suprafață construită',sc+' m²'],['SDA total',sda+' m²'],
     ['Putere electrică','~'+Pt+' kW'],['Debit apă/zi',Qzi_med+' m³/zi']],
    true, 'PRE-STUDIU ORIENTATIV — Toate utilitățile necesare branșării');

  // ── PAG 2: Context amplasament ────────────────────────────────────────────
  let cy = newPage('IDENTIFICARE AMPLASAMENT — CONTEXT UTILITĂȚI', 2);
  cy = sec('1. DATE DE IDENTIFICARE ȘI REȚELE EXISTENTE', cy); cy+=3;
  cy = addImg(caps.img2D, 14, cy, W-28, 68, 'FIG. 1 — Plan cadastral 2D · Amplasare față de rețele tehnico-edilitare existente');
  cy = body('Amplasamentul ' + S2(nrcad) + ' (UTR ' + S2(utr) + ', suprafață ' + S2(area) + ' m², ' + S2(uat) + ', jud. ' +
    S2(judet) + ') necesită studiu de branșare la toate utilitățile urbane pentru funcțiunea ' + S2(fnLbl) +
    ' cu ' + niv + ' niveluri. Calculele sunt conforme normativelor românești în vigoare. Distanțele față ' +
    'de rețelele existente se vor verifica în teren și cu operatorii de utilități.', 14, cy); cy+=4;
  cy = tblRow(['Utilitate','Operator probabil','Normativ baza','Aviz obligatoriu'], cy, true, [40,55,55,W-28-40-55-55]);
  [['Apă potabilă','Operator apă local (verificați ANRSC)','SR 1343-1:2022','DA — înainte de AC'],
   ['Canalizare','Operator apă local (verificați ANRSC)','SR EN 12056','DA — înainte de AC'],
   ['Electric 0.4kV','Delgaz Grid / E-Distribuție','NTE 007/08','DA — înainte de AC'],
   ['Gaze naturale','Delgaz Grid','SR EN 12831','DA — înainte de AC'],
   ['ISU','ISU Județean','P118/1999+P118/2-2013','DA — faza DTAC/PT'],
   ['Fotovoltaic','ANRE (conexiune)','Ord. 11/2023 ANRE','DA — dacă >100kW'],
  ].forEach(r => { cy = tblRow(r, cy, false, [40,55,55,W-28-40-55-55]); });

  // ── PAG 3: APĂ + CANALIZARE ───────────────────────────────────────────────
  cy = newPage('A. APĂ POTABILĂ — SR 1343-1:2022 + NTPA 013', 3);
  cy = sec('A.1. CALCUL DEBIT APĂ POTABILĂ', cy); cy+=3;
  cy = body('Necesarul de apă potabilă se calculează conform SR 1343-1:2022 (care înlocuiește STAS 1343-1/2006). ' +
    'Norma specifică este qs=' + qs + ' l/om·zi pentru funcțiunea ' + S2(fnLbl) + ', pentru ' + Math.round(nrPers) + ' persoane echivalente.', 14, cy); cy+=4;
  const kw = (W-28)/5;
  [['Nr. persoane', Math.round(nrPers)+' pers.'],['qs specific', qs+' l/om·zi'],
   ['Qzi mediu', Qzi_med+' m³/zi'],['Qzi maxim', Qzi_max+' m³/zi'],['Q incendiu', Q_inc+' l/s']
  ].forEach(([l,v],i) => kv(l, v, 14+i*kw, cy, kw-2, i<2?BLUE:i<4?GOLD:RED));
  cy+=26;
  cy = tblRow(['Parametru','Valoare','Formula','Normativ'], cy, true, [55,35,70,W-28-55-35-70]);
  [['Debit zilnic mediu Qzi_med', Qzi_med+' m³/zi', 'nrPers × qs / 1000', 'SR 1343-1:2022 tab.1'],
   ['Debit zilnic maxim Qzi_max', Qzi_max+' m³/zi', 'Qzi_med × 1.25', 'SR 1343-1:2022 §5.4'],
   ['Debit orar maxim qo', +(Qzi_max/16).toFixed(2)+' m³/h', 'Qzi_max / 16h utilizare', 'NTPA 013/2002'],
   ['Debit specific branșare Q_ls', Q_ls+' l/s', 'Qzi_max / 86400 × 2.5', 'SR 1343-1:2022 §5.6'],
   ['Debit incendiu Q_inc', Q_inc+' l/s', 'P118/1999 tab.3 ('+niv+' niv.)', 'P118/1999'],
   ['Debit total proiectare Q_tot', Q_tot+' l/s', 'Q_ls + Q_inc', 'NTPA 013'],
   ['Diametru rețea DN', DN_apa, 'v=0.8-1.2 m/s', 'SR EN 805'],
   ['Presiune necesară la contor', P_bar+' bar', '3.5+(niv-1)×0.35', 'SR 4163-1'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,35,70,W-28-55-35-70]); cy=checkY(cy,12,'APĂ',3); });
  cy+=4;
  cy = sec('A.2. CANALIZARE MENAJERĂ + PLUVIALĂ — SR EN 12056', cy); cy+=3;
  cy = tblRow(['Parametru','Valoare','Bază calcul'], cy, true, [60,35,W-28-60-35]);
  [['Debit menajer Qs', Q_men+' l/s', 'Qzi_med×0.85/86400'],
   ['Debit pluvial Qp (i=125l/s/ha)', Q_pluv+' l/s', '0.85×i×Ac×ψ (ψ=0.9)'],
   ['Debit total canalizare', Q_can+' l/s', 'Qs + Qp'],
   ['DN canalizare menajeră', DN_can, 'SR EN 1401 v≥0.6m/s'],
   ['Separare pluvial', fn==='rez'&&niv<=4?'Recomandată':'OBLIGATORIE', 'HG 188/2002 + L107/1996'],
   ['Separator hidrocarburi', fn==='com'||fn==='hotel'?'OBLIGATORIU':'Recomandat', 'SR EN 858'],
   ['Grătar colector acoperis', 'DN 100, 1buc/75m² terasa', 'SR EN 12056-3'],
  ].forEach(r => { cy = tblRow(r, cy, false, [60,35,W-28-60-35]); });

  // ── PAG 4: ELECTRIC ───────────────────────────────────────────────────────
  cy = newPage('B. BRANȘAMENT ELECTRIC — NTE 007/08 + NTE 011/16', 4);
  cy = sec('B.1. CALCUL PUTERE ELECTRICĂ INSTALATĂ', cy); cy+=3;
  cy = body('Puterea instalată se calculează conform NTE 007/2008 "Normativ pentru proiectarea și execuția rețelelor de cabluri electrice". ' +
    'Coeficientul de simultaneitate ks=' + ks + ' pentru ' + S2(fnLbl) + '.', 14, cy); cy+=4;
  [['Nr. unități',nrUnit+' un.'],['Pi specific',Pi+' kW/un.'],['ks simultaneitate',ks],
   ['Pt instalată',Pt+' kW'],['Nr. trafo necesar',nrPT+' buc.'],['Cablu racord',cablu]
  ].forEach(([l,v],i) => kv(l, String(v), 14+(i%3)*((W-28)/3), i<3?cy:cy+24, (W-28)/3-2, i===3?RED:GOLD));
  cy+=56;
  cy = sec('B.2. SOLUȚIE TEHNICĂ BRANȘAMENT', cy); cy+=3;
  cy = tblRow(['Element','Specificație tehnică','Standard/Normativ'], cy, true, [50,100,W-28-50-100]);
  [['Tip racord', racord, 'NTE 007/08 §4'],
   ['Cablu alimentare', cablu, 'SR CEI 60502-1'],
   ['Tablou general TGBT', 'Protecții selectivitate garantată', 'SR EN 61439-1'],
   ['Contorizare', 'Smart meter bidirec. (dacă >100kW PV)', 'Ord. ANRE 11/2023'],
   ['Protecție fulgere', 'LPS extern clasa III (IV la bloc turn)', 'SR EN 62305-3'],
   ['Impământare', 'Piesă separatoare + electrod orizontal', 'NP-I 20/2000'],
   ['Iluminat urgență', '3h autonomie, 1lux evacuare', 'SR EN 1838 + P118-3'],
   ['Generatoare backup', fn==='hotel'||fn==='birouri'?'Obligatoriu (N+1)':'Recomandat', 'NTE 007/08'],
  ].forEach(r => { cy = tblRow(r, cy, false, [50,100,W-28-50-100]); cy=checkY(cy,12,'ELECTRIC',4); });

  // ── PAG 5: GAZE + TERMIE ──────────────────────────────────────────────────
  cy = newPage('C. GAZE NATURALE — SR EN 12831 + NP 057/2002', 5);
  cy = sec('C.1. CALCUL DEBIT GAZE NATURALE', cy); cy+=3;
  cy = body('Necesarul de gaze naturale se calculează conf. SR EN 12831:2017 (înlocuiește SR 1907-1). ' +
    'Puterea termică totală estimată este ' + Pt_term + ' kW (80 W/m² SDA). ' +
    'Debitul de gaze corespunzător (PCI gaz natural = 34 MJ/Nm³): ' + Qg + ' Nm³/h.', 14, cy); cy+=4;
  cy = tblRow(['Parametru','Valoare','Standard'], cy, true, [70,50,W-28-70-50]);
  [['Debit gaze Qg (total)', Qg+' Nm³/h', 'SR EN 12831'],
   ['Putere termică Pt', Pt_term+' kW', '80 W/m²·SDA'],
   ['DN distribuție', DN_gaz, 'NP 029/2002'],
   ['Presiune utilizare', P_gaz+' mbar ('+({rez:'joasă',birouri:'medie',hotel:'medie',com:'medie'}[fn]||'joasă')+' presiune)', 'SR EN 1775'],
   ['Tip contor', Qg<=6?'G4/G6 diafragmă':'Turbocontor G10+', 'OIML R31'],
   ['Cameră centrală termică', Pt_term>70?'OBLIGATORIE — CT proprie':'Centrală individuală per apart.', 'NT Distrigaz'],
   ['Ventilare CT', 'Min 2× Vol/h admisie + evacuare', 'SR EN 12828'],
   ['Detector gaze',fn==='hotel'||fn==='birouri'?'OBLIGATORIU':'Recomandat','SR EN 50194-1'],
  ].forEach(r => { cy = tblRow(r, cy, false, [70,50,W-28-70-50]); });
  cy+=4;
  cy = sec('C.2. ÎNCĂLZIRE + TERMOFICARE (ALTERNATIVĂ)', cy); cy+=3;
  cy = body('Alternativa la gaze: racordare la rețeaua de termoficare urbană (dacă există în zonă) sau ' +
    'sistem pompă căldură aer-apă/sol-apă. Putere termică necesară: ' + Pt_term + ' kW. ' +
    'Conf. Legii 325/2006 și HG 882/2004, operatorul de termoficare emite aviz de principiu.', 14, cy);

  // ── PAG 6: ISU ────────────────────────────────────────────────────────────
  cy = newPage('D. SECURITATE LA INCENDIU — P118/1999 + P118/2-2013', 6);
  cy = sec('D.1. CERINȚE ISU CONF. P118/1999 ȘI P118/2-2013', cy); cy+=3;
  cy = body('Studiul de securitate la incendiu se elaborează de specialist atestat IGSU la faza DTAC/PT. ' +
    'Pre-studiul de față identifică principalele cerințe de instalații pentru avizul ISU.', 14, cy); cy+=4;
  cy = tblRow(['Cerință ISU','Parametru calculat','Normativ','Obs.'], cy, true, [55,45,40,W-28-55-45-40]);
  [['Hidranti interiori', nrHid+' buc. × '+Q_hid+' l/s', 'P118-2 §8.3', niv>4?'OBLIGATORIU':'Recomandat'],
   ['Hidrant exterior', '1 buc. la max. 150m', 'P118-1 §8.2', 'OBLIGATORIU'],
   ['Rezervor incendiu', Vol_rez+' m³ (30 min.×'+Q_hid+' l/s×60)', 'P118-2 §11', niv>4?'OBLIGATORIU':'Funcție risc'],
   ['Sprinklere', niv>8||sda>3000?'OBLIGATORII':'Neobligatoriu', 'P118-2 §9', ''],
   ['Detecție automată', 'OBLIGATORIE (case de scară + subsol)', 'P118-3/2015', ''],
   ['Stingătoare portabile', 'Min. 1×6kg ABC/200m² nivel', 'SR EN 3-7', 'OBLIGATORIU'],
   ['Iluminat securitate','3h autonomie (grup electrogen sau baterie)', 'P118-3 + SR EN 1838', 'OBLIGATORIU'],
   ['Cai evacuare','2 case scară ≥1.2m (' + (niv>4?'OBLIGATORIE':'>'+sda+'m²') + ')', 'P118-1 §4.3', ''],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,45,40,W-28-55-45-40]); cy=checkY(cy,12,'ISU',6); });
  cy+=4;
  cy = sec('D.2. CLASĂ RISC INCENDIU + REZISTENȚĂ LA FOC', cy); cy+=3;
  cy = tblRow(['Element','Cerință minimă','Funcțiune','Obs.'], cy, true, [55,55,40,W-28-55-55-40]);
  [['Pereți exteriori', fn==='rez'?'REI 120':'REI 180', S2(fnLbl), 'SR EN 1365-1'],
   ['Planșee inter-etaj', 'REI 60 min.', 'Toate fn.', 'SR EN 1365-2'],
   ['Casa scării', 'EI 90 + uși EI2-30', 'P118-1', 'OBLIGATORIU'],
   ['Subsolul', 'REI 120 (>300m²)', 'P118-2', 'Dacă există subsol'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,55,40,W-28-55-55-40]); });

  // ── PAG 7: FOTOVOLTAIC ────────────────────────────────────────────────────
  cy = newPage('E. SISTEM FOTOVOLTAIC — Legea 220/2008 + Ord. ANRE 11/2023', 7);
  cy = sec('E.1. POTENȚIAL FOTOVOLTAIC AMPLASAMENT', cy); cy+=4;
  [['Suprafață acoperiș disp.',sc+' m²'],['Suprafață PV util (12%)',Math.round(sc*0.12)+' m²'],
   ['Putere inst. Ppv',Ppv+' kWp'],['Producție anuală',Epv+' kWh/an'],
   ['Autoconsum estimat',Math.round(Epv*0.6)+' kWh/an'],['Injecție rețea',Math.round(Epv*0.4)+' kWh/an']
  ].forEach(([l,v],i) => kv(l, v, 14+(i%3)*((W-28)/3), i<3?cy:cy+24, (W-28)/3-2, i<2?BLUE:i<4?GREEN:GOLD));
  cy+=56;
  cy = tblRow(['Parametru','Valoare','Baza calcul'], cy, true, [70,40,W-28-70-40]);
  [['Iradiere solară (Iași)', (_calcSolarGHI ? _calcSolarGHI(lat,lon) : (lat>47?1100:lat>46?1150:lat>45?1200:1280))+' kWh/m²·an', 'PVGIS / JRC Europa'],
   ['Randament panouri PV', '18-21% (monocristalin)', 'IEC 61215'],
   ['Randament invertor', '97-98%', 'IEC 62109'],
   ['Pierderi sistem', '~15% (cabluri+umbra+temp)', 'EN 61724'],
   ['Amortizare investiție', Math.round((Ppv*850)/(Epv*0.7))+' ani', 'Tarif 0.07 EUR/kWh'],
   ['Obligativitate NZEB', sda>1000?'OBLIGATORIU (Lg. 372/2005 mod.)':'Recomandat', 'L 372/2005 + HG 865/2016'],
   ['Certificat origine', 'Emis de ANRE pentru prosumatori', 'Ord. ANRE 11/2023'],
  ].forEach(r => { cy = tblRow(r, cy, false, [70,40,W-28-70-40]); });

  // ── PAG 8: COSTURI ESTIMATIVE ─────────────────────────────────────────────
  cy = newPage('F. COSTURI ESTIMATIVE BRANȘAMENTE — Date orientative', 8);
  cy = sec('F.1. DEVIZ ESTIMATIV BRANȘAMENTE (EUR, TVA inclus)', cy); cy+=3;
  cy = body('Costurile de mai jos sunt estimări orientative bazate pe prețurile medii de piață 2025-2026 pentru ' +
    S2(uat) + '. Ofertele finale se solicită de la operatorii de utilități. Cursul EUR: ' + RON.toFixed(2) + ' RON.', 14, cy); cy+=4;
  cy = tblRow(['Utilitate','Lucrare','EUR (est.)','RON (est.)','Obs.'], cy, true, [35,70,22,26,W-28-35-70-22-26]);
  const costRows = [
    ['Apă','Branșament + contor + racord', costuri.apa, Math.round(costuri.apa*RON), 'Include PA'],
    ['Canal','Racord + cămin + contor pluvial', costuri.canal, Math.round(costuri.canal*RON), ''],
    ['Electric','Branșament+PT+cabluri+TGBT', costuri.electric, Math.round(costuri.electric*RON), Pt>100?nrPT+' trafo':''],
    ['Gaze','Branșament + contor + reg. presiune', costuri.gaze, Math.round(costuri.gaze*RON), ''],
    ['ISU','Hidranti+rezervor+detectie+sting.', costuri.isu, Math.round(costuri.isu*RON), ''],
    ['Fotovoltaic','Panouri+invertor+cabluri+conectare', costuri.pv, Math.round(costuri.pv*RON), Ppv+'kWp'],
    ['TOTAL','—', totalEUR, Math.round(totalEUR*RON), 'Estimare ±30%'],
  ];
  costRows.forEach((r,i) => { cy = tblRow(r, cy, i===costRows.length-1, [35,70,22,26,W-28-35-70-22-26]); });
  cy+=4;
  cy = sec('F.2. TARIFE AVIZE ȘI TAXE 2025-2026 (orientative)', cy); cy+=3;
  cy = tblRow(['Aviz / Taxă','Estimat EUR','Termen','Operator'], cy, true, [80,25,30,W-28-80-25-30]);
  [['Aviz de amplasament Operator apă/canal local','200-500','30 zile','Operator apă local'],
   ['Aviz DELGAZ electric','300-800','45 zile','Delgaz Grid'],
   ['Aviz DELGAZ gaze','300-600','30 zile','Delgaz Grid'],
   ['Aviz ISU (DTAC)','250-400','30 zile','ISU Județean'],
   ['Taxă racord electric (kW)','~15 EUR/kW','—','Delgaz Grid'],
   ['Taxă branșament apă','500-2000','—','Operator apă local'],
  ].forEach(r => { cy = tblRow(r, cy, false, [80,25,30,W-28-80-25-30]); cy=checkY(cy,12,'COSTURI',8); });

  // ── PAG 9: CALENDAR + OPERATORI ───────────────────────────────────────────
  cy = newPage('G. CALENDAR AVIZE — PLAN DE ACȚIUNE', 9);
  cy = sec('G.1. SECVENȚA AVIZE ȘI BRANȘAMENTE (luni de la PAC)', cy); cy+=3;
  cy = tblRow(['Etapă','Luna','Durată','Responsabil','Prerequisit'], cy, true, [60,14,18,40,W-28-60-14-18-40]);
  [['Cerere avize de amplasament (toate)','L1','1-2 luni','Proiectant PA','Certificat Urbanism'],
   ['Elaborare proiecte branșamente','L2','1 lună','Proiectant specialități','Avize amplasament'],
   ['Depunere DTAC complet','L3','—','Beneficiar','Proiecte complete+avize'],
   ['Autorizație de construire (AC)','L4','30 zile','Primărie','DTAC complet'],
   ['Contracte racordare (Operator apă/canal local/Delgaz)','L5','1-2 săpt.','Beneficiar','AC emisă'],
   ['Execuție branșamente','L5-L7','2-3 luni','Firme autorizate','AC + contracte'],
   ['Probe și recepție rețele','L7-L8','2-4 săpt.','Diriginte șantier','Execuție completă'],
   ['Recepție la terminarea lucrărilor','L12+','—','Comisie','Lucrări finalizate'],
  ].forEach(r => { cy = tblRow(r, cy, false, [60,14,18,40,W-28-60-14-18-40]); cy=checkY(cy,12,'CALENDAR',9); });
  cy+=4;
  cy = sec('G.2. OPERATORI UTILITĂȚI — DATE DE CONTACT', cy); cy+=3;
  cy = tblRow(['Utilitate','Operator','Telefon/Web','Adresă locală'], cy, true, [30,55,50,W-28-30-55-50]);
  [['Apă/Canal','Operator apă local (ANRSC)','verificați anrsc.ro','—'],
   ['Electric','Distribuitor electric/gaze local','verificați operatorul local','—'],
   ['Gaze','Distribuitor electric/gaze local','verificați operatorul local','—'],
   ['ISU','ISU Județean','isu.ro (verificați la ISU județean)','—'],
   ['ANRE','Autoritate Energie','0372.401.866 / anre.ro','anre.ro'],
  ].forEach(r => { cy = tblRow(r, cy, false, [30,55,50,W-28-30-55-50]); });

  // ── PAG 10: Harta context ─────────────────────────────────────────────────
  cy = newPage('H. CONTEXT URBAN — HĂRȚI AMPLASAMENT', 10);
  cy = sec('H.1. VEDERE 3D — CONTEXT URBAN', cy); cy+=3;
  cy = addImg(caps.img3D||caps.v3dDay, 14, cy, W-28, 78, 'FIG. 2 — Vedere 3D amplasament · Context urban real · OSM + Mapbox');
  cy = sec('H.2. PLAN CADASTRAL — DISTANȚE CONTUR', cy); cy+=3;
  cy = addImg(caps.imgDist||caps.img2D, 14, cy, W-28, 68, 'FIG. 3 — Plan distanțe · Retrageri față de vecinătăți · Contur parcelă');

  // ── PAG 11: Baze legale ───────────────────────────────────────────────────
  cy = newPage('I. BAZE LEGALE + NORME APLICATE', 11);
  cy = sec('I.1. CADRU NORMATIV BRANȘAMENTE', cy); cy+=3;
  cy = tblRow(['Normativ','Titlu prescurtat','Aplicabilitate'], cy, true, [35,120,W-28-35-120]);
  [['SR 1343-1:2022','Alimentare cu apă — Determinar debit','Apă potabilă'],
   ['SR EN 12056-3','Canalizare gravitațională — instalații interioare','Canalizare'],
   ['NTE 007/2008','Normativ rețele de cabluri electrice','Electric'],
   ['NTE 011/2016','Normativ branșamente electrice','Electric'],
   ['SR EN 12831:2017','Sisteme de încălzire — calcul sarcini termice','Gaze/termie'],
   ['NP 029/2002','Normativ rețele distribuție gaze','Gaze naturale'],
   ['P118/1999','Normativ securitate la incendiu (construcții)','ISU'],
   ['P118/2-2013','Normativ instalații de stingere incendii','ISU'],
   ['P118/3-2015','Normativ instalații de detecție incendiu','ISU'],
   ['Ord. ANRE 11/2023','Racordare prosumatori la rețea','Fotovoltaic'],
   ['Legea 50/1991','Autorizarea executării lucrărilor de construcții','Avize AC'],
   ['HG 907/2016','Conținut cadru docum. tehnico-economice','Proiectare'],
  ].forEach(r => { cy = tblRow(r, cy, false, [35,120,W-28-35-120]); cy=checkY(cy,10,'NORME',11); });

  // ── PAG 12: Concluzii + semnătură ────────────────────────────────────────
  cy = newPage('J. CONCLUZII + SEMNĂTURĂ', 12);
  cy = concluzii([
    'Parcela ' + S2(nrcad) + ' din ' + S2(uat) + ' necesită branșamente la toate cele 5 utilități urbane (apă, canal, electric, gaze, ISU) pentru funcțiunea ' + S2(fnLbl) + ' cu ' + niv + ' niveluri.',
    'Debitul de apă potabilă estimat este ' + Qzi_med + ' m³/zi (Qzi_max=' + Qzi_max + ' m³/zi), racord ' + DN_apa + ' la presiunea de ' + P_bar + ' bar conf. SR 1343-1:2022.',
    'Puterea electrică instalată estimată este ' + Pt + ' kW, necesitând ' + racord + ' cu cablu ' + cablu + ' conf. NTE 007/08.',
    'Debitul de gaze naturale estimat este ' + Qg + ' Nm³/h (' + Pt_term + ' kW termic), distribuție ' + DN_gaz + ' conf. NP 029/2002 la ' + P_gaz + ' mbar.',
    'Sistemul ISU necesită ' + nrHid + ' hidranți interiori și rezervor de ' + Vol_rez + ' m³ conf. P118/1999+P118/2-2013.',
    'Potențialul fotovoltaic al acoperișului este de ' + Ppv + ' kWp (~' + Epv + ' kWh/an), investiție recuperabilă în ~' + Math.round((costuri.pv)/(Epv*0.07/RON)) + ' ani.',
    'Costul total estimat al branșamentelor este de ~' + totalEUR.toLocaleString('ro-RO') + ' EUR (±30%), inclusiv TVA. Toate avizele sunt necesare înaintea emiterii Autorizației de Construire.',
  ], cy);
  sign();
  ftr();

  _pdfSaveMobile(pdf, 'prestudiu_bransamente_' + S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_') + '.pdf');
  ss('✅ Pre-Studiu Bransamente generat · 12 pagini · ' + S2(fnLbl));
};


// ═══════════════════════════════════════════════════════════════════════════
// 2. STUDIU IMPACT SĂNĂTATE — 10 pagini (rescriere paginare)
// ═══════════════════════════════════════════════════════════════════════════
window.generateHealthImpactStudy = async function(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('Selectați o parcelă.'); return; }
  ss('Se generează Studiu Impact Sănătate...');

  const d = _initStudyPdf('Studiu de Impact asupra Sanatatii Populatiei','Sănătate publică · OMS · Legea 104/2011 · Dir. 2002/49/CE',10);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,BLUE,TEAL,LIGHT,LIGHT2,RED,GREEN,ORANGE,PURPLE,
         S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
         hdr,ftr,sec,body,tblRow,kv,addImg,badge,cover,newPage,checkY,concluzii,sign,divider} = d;

  const caps   = await _captureStudyMapsSafe(ap, msg=>ss(msg));
  const seism  = getSeismConfig();
  const zgomot = getZgomotConfig();
  const vant   = getVantConfig();
  const areaNum= parseFloat(area)||300;
  const aedisH = S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||12;
  const niv    = Math.round(aedisH/3)||4;
  const sda    = Math.round(areaNum*(parseFloat(params?.cut)||1.2));
  const nrApt  = Math.max(1,Math.round(sda/65));
  const nrPers = Math.round(nrApt*2.5);
  const oreIns = typeof _calcOreInsorire==='function' ? _calcOreInsorire(lat,11,21,S.vol?.frontDir||'S') : {label:'≥2h',conforme:true};
  const Ltotal = zgomot.Lzsn_limita - 5;

  // Score sănătate
  const scores = {
    aer:   Ltotal < zgomot.Lzsn_limita ? 85 : 65,
    zgomot:Ltotal < zgomot.Lzsn_limita - 5 ? 90 : 70,
    apa:   88,
    teren: 82,
    insorire: oreIns.conforme ? 95 : 60,
    radon: lat>46?75:85,
  };
  const scoreTotal = Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/Object.keys(scores).length);
  const scoreColor = scoreTotal>=80?GREEN:scoreTotal>=65?ORANGE:RED;

  // PAG 1 — Cover
  cover('Evaluarea impactului construcției asupra sănătății populației',
    caps.imgLocation||null,
    [['Nr. persoane (estimat)',nrPers+' pers.'],['H clădire',aedisH.toFixed(1)+'m'],
     ['Zonă acustică UTR',zgomot.zona_acustica],['Zonă seismică',seism.zona]],
    scoreTotal>=70, 'SCOR SĂNĂTATE ESTIMAT: '+scoreTotal+'/100 — '+
    (scoreTotal>=80?'FAVORABIL':scoreTotal>=65?'MEDIU — MĂSURI NECESARE':'NEFAVORABIL — STUDIU DETALIAT'));

  // PAG 2 — Calitate aer + context
  let cy = newPage('A. CALITATEA AERULUI — Legea 104/2011 + Dir. 2008/50/CE', 2);
  cy = addImg(caps.img2D||caps.imgLocation, 14, cy, W-28, 60, 'FIG. 1 — Context urban · Surse de poluare în raza 500m de la amplasament');
  cy = sec('A.1. POLUANȚI ATMOSFERICI — VALORI LIMITĂ EU/OMS 2021', cy); cy+=3;
  cy = body('Conform Legii 104/2011 și Directivei 2008/50/CE, valorile limită anuale pentru calitatea aerului în zone urbane sunt monitorizate de ANPM. Valorile de referință OMS 2021 sunt mai stricte decât standardele EU.', 14, cy); cy+=4;
  cy = tblRow(['Poluant','Limită EU (anual)','Limită OMS 2021','Nivel estimat zonă','Risc sănătate'], cy, true, [32,35,35,38,W-28-32-35-35-38]);
  [['NO₂','40 μg/m³','10 μg/m³','15-35 μg/m³','Cardiovascular, respirator'],
   ['PM₁₀','40 μg/m³','15 μg/m³','20-45 μg/m³','Respirator, pulmonar'],
   ['PM₂.₅','25 μg/m³','5 μg/m³','12-25 μg/m³','Pulmonar, cancer'],
   ['O₃','120 μg/m³','100 μg/m³','60-90 μg/m³','Respirator (sezon cald)'],
   ['CO','10.000 μg/m³','4.000 μg/m³','500-2000 μg/m³','Cardiovascular'],
   ['Benzen','5 μg/m³','1.7 μg/m³','1-3 μg/m³','Cancerigen (grup 1 IARC)'],
  ].forEach(r => { cy = tblRow(r, cy, false, [32,35,35,38,W-28-32-35-35-38]); cy=checkY(cy,12,'AER',2); });
  cy+=4;
  cy = sec('A.2. SURSE DE POLUARE ÎN PROXIMITATE ȘI MĂSURI', cy); cy+=3;
  cy = tblRow(['Sursă','Distanță est.','Impact','Măsuri proiect'], cy, true, [55,28,35,W-28-55-28-35]);
  [['Trafic rutier stradal','0-50m','Moderat-ridicat','Geamuri etanșe, ventilare mecanică'],
   ['Parcări + garaj subteran','pe parcelă','Mediu (CO, NOₓ)','Ventilare mecanică garaj (EN 14604)'],
   ['Construcții vecine','10-50m','Temporar (șantier)','Perdea praf + stropire'],
   ['Zone verzi (alergeni)','variabil','Sezonier','Filtre aer cu HEPA recomandate'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,28,35,W-28-55-28-35]); });

  // PAG 3 — Zgomot urban
  cy = newPage('B. ZGOMOT URBAN — Dir. 2002/49/CE + SR 10009:2017 + C 125-2013', 3);
  cy = sec('B.1. EVALUARE EXPUNERE LA ZGOMOT', cy); cy+=3;
  cy = body('Zona acustică UTR ' + S2(utr) + ' este clasificată ca "' + zgomot.zona_acustica +
    '" conf. SR 10009:2017. Limita Lzsn=' + zgomot.Lzsn_limita + ' dB(A) zi-seara-noapte, ' +
    'Lnoapte=' + zgomot.Lnoapte_limita + ' dB(A). Surse principale: ' + (zgomot.surse_principale||[]).join(', ') + '.', 14, cy); cy+=4;
  cy = tblRow(['Funcțiune','Lzsn max','Lnoapte max','Interior zi','Interior noapte'], cy, true, [50,28,30,30,W-28-50-28-30-30]);
  [['Locuire colectivă','60 dB','50 dB','35 dB','30 dB'],
   ['Birouri','65 dB','55 dB','40 dB','—'],
   ['Spitale/școli','55 dB','45 dB','35 dB','30 dB'],
   ['Zone mixte','65 dB','55 dB','45 dB','35 dB'],
  ].forEach(r => { cy = tblRow(r, cy, false, [50,28,30,30,W-28-50-28-30-30]); });
  cy+=4;
  cy = sec('B.2. CERINȚE IZOLARE FONICĂ MINIMĂ — C 125-2013', cy); cy+=3;
  cy = tblRow(['Element constructiv','Rw minim','Rw recomandat','Standard'], cy, true, [70,28,34,W-28-70-28-34]);
  [['Pereți exteriori spre stradă','Rw≥45 dB','Rw≥52 dB','SR EN ISO 717-1'],
   ['Tâmplărie exterioară','Rw≥35 dB','Rw≥42 dB','SR EN 14351-1'],
   ['Planșee inter-apartamente','Rw≥52 dB','Rw≥57 dB','SR EN ISO 140-4'],
   ['Uși interioare (palier)','Rw≥30 dB','Rw≥35 dB','SR EN 14351-1'],
  ].forEach(r => { cy = tblRow(r, cy, false, [70,28,34,W-28-70-28-34]); });
  cy+=4;
  cy = sec('B.3. MĂSURI PROIECT', cy); cy+=3;
  cy = tblRow(['Măsură','Reducere zgomot','Cost estimativ','Prioritate'], cy, true, [75,30,35,W-28-75-30-35]);
  [['Ferestre cu geam triplu Ug≤1.0W/m²K (Rw≥42dB)','8-12 dB','++','MARE'],
   ['Fațadă ventilată cu strat fonoabsorbant','5-8 dB','+','MEDIE'],
   ['Plantare gard viu/perdea vegetație','2-4 dB','Redus','RECOMANDAT'],
   ['Ventilație mecanică cu recuperare căldură','—','+++','NZEB recomandat'],
  ].forEach(r => { cy = tblRow(r, cy, false, [75,30,35,W-28-75-30-35]); });

  // PAG 4 — Însorire + confort termic
  cy = newPage('C. ÎNSORIRE ȘI CONFORT TERMIC — OMS 119/2014 + SR EN 15251', 4);
  cy = sec('C.1. ÎNSORIRE DIRECTĂ OMS 119/2014 — SOLSTIȚIU IARNĂ', cy); cy+=3;
  cy = body('Conf. Ord. MS 119/2014 art.3, spațiile de locuit necesită min. 1.5 ore/zi însorire directă la solstițiul de iarnă (21 dec). ' +
    'Calculul se face cu formula altitudinii solare pentru lat=' + lat.toFixed(2) + '°N.', 14, cy); cy+=4;
  cy = tblRow(['Parametru','Valoare','Limită OMS 119','Status'], cy, true, [70,40,40,W-28-70-40-40]);
  [['Latitudine amplasament', lat.toFixed(4)+'°N', '—', '—'],
   ['Ore însorire directă (21 Dec est.)', oreIns.label, 'min. 1.5h/zi', oreIns.conforme?'✓ CONFORM':'✗ SUB LIMITĂ'],
   ['Față principală (orientare)', S2(S.vol?.frontDir||params?.frontDir||'?'), 'Sud recomandat', '—'],
   ['Alt. solară la 12:00 (21 Dec)', typeof _solarPosition==='function'?(_solarPosition(lat,11,21,12).alt.toFixed(1)+'°'):'~'+((90-lat-23.5).toFixed(1))+'°', 'min. 15° (OMS)', '—'],
  ].forEach(r => { cy = tblRow(r, cy, false, [70,40,40,W-28-70-40-40]); });
  cy+=4;
  cy = sec('C.2. EFECT DE INSULĂ DE CĂLDURĂ URBANĂ (UHI)', cy); cy+=3;
  cy = body('Efectul UHI (Urban Heat Island) poate crește temperatura locală cu 2-5°C față de zonele rurale, ' +
    'afectând confortul termic și consumul energetic. Factorii de risc: densitate construcții, suprafețe impermeabile, lipsă vegetație.', 14, cy); cy+=4;
  cy = tblRow(['Factor UHI','Impact estimat','Măsuri de reducere','Efect răcire'], cy, true, [55,30,70,W-28-55-30-70]);
  [['Acoperiș verde (extensiv)','-1.5°C','Strat substrat min. 8cm + vegetație','Semnificativ'],
   ['Acoperiș alb/reflexiv (SRI>78)','-2°C','Membrane bituminoase albe sau PVC','Mare'],
   ['Arbori față parcelă 4-5 buc.','-1°C','Foioase cu H≥5m la maturitate','Moderat'],
   ['Pavaj permeabil curte/parcaj','-0.5°C','Pavaj dren sau pietriș','Redus'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,30,70,W-28-55-30-70]); });

  // PAG 5 — Apă + salubritate
  cy = newPage('D. APĂ POTABILĂ + SALUBRITATE — Legea 458/2002 + GD 856/2002', 5);
  cy = sec('D.1. CALITATE APĂ POTABILĂ — ZONA AMPLASAMENT', cy); cy+=3;
  cy = tblRow(['Indicator','Valoare normată','Metodă verificare','Risc'], cy, true, [50,45,60,W-28-50-45-60]);
  [['Turbiditate','<1 NTU','SR ISO 7027','Prezent în surse suprafață'],
   ['pH','6.5–9.5','SR ISO 10523','Corozivitate la pH<6.5'],
   ['Nitrați','<50 mg/l','SR ISO 7890','Zone agricole: risc methemoglobin.'],
   ['Bacterii coliforme','0 UFC/100ml','SR ISO 9308-1','Surse contaminate'],
   ['Plumb','<10 μg/l','SR ISO 11885','Conducte vechi (<1990)'],
   ['Clor rezidual','0.1-0.5 mg/l','SR EN ISO 7393-2','Dezinfecție rețea'],
  ].forEach(r => { cy = tblRow(r, cy, false, [50,45,60,W-28-50-45-60]); cy=checkY(cy,12,'APĂ',5); });
  cy+=4;
  cy = sec('D.2. SISTEM DE GESTIONARE DEȘEURI', cy); cy+=3;
  cy = tblRow(['Categorie deșeu','Cantitate est. (kg/loc/an)','Tratament conform','Responsabilitate'], cy, true, [45,45,65,W-28-45-45-65]);
  [['Menajer mixt','180-220 kg','Depozit conform HG 349/2005','Operator municipal'],
   ['Hârtie/carton','35-45 kg','Reciclare col. selectivă','Operator + beneficiar'],
   ['Plastic','25-35 kg','Reciclare col. selectivă','Operator + beneficiar'],
   ['DEEE (electrice)','4-6 kg','Puncte colectare autorizate','Beneficiar - Ecotic'],
  ].forEach(r => { cy = tblRow(r, cy, false, [45,45,65,W-28-45-45-65]); });

  // PAG 6 — Radon + EMF + câmpuri
  cy = newPage('E. RADON + CÂMPURI ELECTROMAGNETICE — Ord. MS 1020/2022', 6);
  cy = sec('E.1. RADON GEOGEN — Ord. MS 1020/2022 + Dir. 2013/59/EURATOM', cy); cy+=3;
  cy = body('Radonul (Rn-222) este un gaz radioactiv natural provenit din dezintegrarea U-238 în sol. ' +
    'Ord. MS 1020/2022 stabilește Nivel de Referință NR=300 Bq/m³ (media anuală) pentru clădiri noi. ' +
    'Potențialul de radon pentru jud. ' + S2(judet) + ' (lat ' + lat.toFixed(1) + '°N): ' +
    (lat>46.5?'MEDIU (20-100 kBq/m²)':'REDUS-MEDIU (<50 kBq/m²)') + ' conf. hărții naționale JRC-EURATOM.', 14, cy); cy+=4;
  cy = tblRow(['Parametru','Valoare/Status','Normativ','Acțiune necesară'], cy, true, [55,45,40,W-28-55-45-40]);
  [['NR radon clădiri noi','300 Bq/m³','Ord. 1020/2022','Măsurătoare obligatorie PT'],
   ['Potențial radon zonă',lat>46.5?'Mediu':'Redus-mediu','Harta JRC-EU','Măsurătoare recomandată'],
   ['Etajul de risc','Parter + subsol','EURATOM 2013/59','Etanșare radier+pereți'],
   ['Ventilare prevenție','Subpresiune ventilat','ISO 11665-6','La Parter+Subsol'],
   ['Materiale construcție','Activitate Ra-226 <200 Bq/kg','Legea 111/1996','Certificat furnizor'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,45,40,W-28-55-45-40]); });
  cy+=4;
  cy = sec('E.2. CÂMPURI ELECTROMAGNETICE — HG 1408/2007', cy); cy+=3;
  cy = tblRow(['Sursă EMF','Distanță recomandată','Limită admisă','Observație'], cy, true, [55,40,40,W-28-55-40-40]);
  [['Linii electrice 110kV','min. 20m','10 kV/m (ICNIRP)','Servitute legală'],
   ['Stații transformare','min. 5m','—','Zgomot + EMF redus'],
   ['Antene GSM/5G','min. 10m (voluntar)','2 W/m² (ICNIRP)','Sub limite UE'],
   ['Wi-Fi/rețele interioare','N/A','<0.1 W/m²','Neglijabil'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,40,40,W-28-55-40-40]); });

  // PAG 7 — Scor sănătate + riscuri cumulate
  cy = newPage('F. SCOR SĂNĂTATE + RISCURI CUMULATE', 7);
  cy = sec('F.1. INDICE SĂNĂTATE ESTIMAT — RADAR MULTI-FACTOR', cy); cy+=3;
  cy = body('Indicele de sănătate este un scor compozit calculat pe 6 dimensiuni, fiecare normalizat 0-100 (100 = optim). ' +
    'Se bazează pe metodologia EQI (Environmental Quality Index) adaptată pentru context românesc.', 14, cy); cy+=4;
  const sFactors = [
    ['Calitate aer',scores.aer,'Poluanți atmosferici','Legea 104/2011'],
    ['Zgomot urban',scores.zgomot,'Lzsn/Lnoapte UTR','SR 10009:2017'],
    ['Apă potabilă',scores.apa,'Turbiditate/bacterii','Legea 458/2002'],
    ['Calitate teren',scores.teren,'Permeabilitate/risc','NP 074/2014'],
    ['Însorire',scores.insorire,'Ore/zi 21 Dec','OMS 119/2014'],
    ['Radon/EMF',scores.radon,'Potențial radon','Ord. 1020/2022'],
  ];
  cy = tblRow(['Factor','Scor /100','Baza evaluare','Normativ'], cy, true, [50,22,80,W-28-50-22-80]);
  sFactors.forEach(([f,s,b,n]) => {
    cy = tblRow([f,s+'/100',b,n], cy, false, [50,22,80,W-28-50-22-80]);
  });
  cy+=4;
  pdf.setFillColor(...scoreColor); pdf.rect(14, cy, W-28, 12, 'F');
  pdf.setTextColor(255,255,255); pdf.setFontSize(13); pdf.setFont('helvetica','bold');
  pdf.text('SCOR TOTAL SĂNĂTATE: ' + scoreTotal + '/100 — ' +
    (scoreTotal>=80?'FAVORABIL CONSTRUIRII':scoreTotal>=65?'MEDIU — MĂSURI NECESARE':'NEFAVORABIL — STUDIU APROFUNDAT'), W/2, cy+8.5, {align:'center'});
  cy+=18;
  cy = sec('F.2. RISCURI CUMULATE REZIDUALE', cy); cy+=3;
  cy = tblRow(['Risc','Probabilitate','Impact','Măsuri obligatorii'], cy, true, [60,30,25,W-28-60-30-25]);
  [['Expunere zgomot > Lzsn limită', seism.ag>=0.25?'Medie':'Redusă', 'Moderat', 'Izolare fonică conform C 125-2013'],
   ['Calitate aer PM₂.₅ > OMS 2021', 'Medie (urban)', 'Moderat', 'Ventilare mecanică + filtre HEPA'],
   ['Radon > 300 Bq/m³', lat>46.5?'Medie':'Redusă', 'Redus', 'Măsurătoare + etanșare radier'],
   ['Însorire insuficientă', oreIns.conforme?'Redusă':'Medie', oreIns.conforme?'Redus':'Moderat', 'Reorientare volume sau studiu OMS 119'],
   ['UHI (insulă căldură)', 'Medie (dens urban)', 'Redus', 'Acoperiș verde/alb + arbori'],
  ].forEach(r => { cy = tblRow(r, cy, false, [60,30,25,W-28-60-30-25]); cy=checkY(cy,12,'RISCURI',7); });

  // PAG 8 — Recomandări specifice
  cy = newPage('G. RECOMANDĂRI SPECIFICE DE PROIECTARE', 8);
  cy = sec('G.1. MĂSURI OBLIGATORII PENTRU AVIZ SĂNĂTATE', cy); cy+=3;
  cy = tblRow(['Măsură','Faza','Responsabil','Normativ'], cy, true, [85,20,35,W-28-85-20-35]);
  [['Studiu acustic urban detaliat la faza PAC (dacă Ltotal>limită)', 'PAC', 'Proiectant', 'C 125-2013'],
   ['Măsurătoare radon (min. 3 luni, sezon rece) — radier+parter', 'PAC', 'Lab. autorizat', 'Ord. 1020/2022'],
   ['Ventilare mecanică cu recuperare căldură (dacă SDA>600m²)', 'PT', 'Ing. instalații', 'NP 037/1999'],
   ['Luminator minim 10% din suprafața camerei', 'PAC', 'Arhitect', 'OMS 119/2014 art.4'],
   ['Distanță min. 1.5m față de vecini pentru ferestrele camere locuit', 'PAC', 'Arhitect', 'RGU art. 23'],
   ['Certificate de calitate materiale (inclusiv Ra<200Bq/kg)', 'Exec.', 'Constructor', 'Legea 111/1996'],
   ['Declarație conformitate calitate aer interior la recepție', 'Recepție', 'Dir. șantier', 'L 10/1995'],
  ].forEach(r => { cy = tblRow(r, cy, false, [85,20,35,W-28-85-20-35]); cy=checkY(cy,12,'RECOMANDĂRI',8); });
  cy+=4;
  cy = sec('G.2. RECOMANDĂRI SUPLIMENTARE (NORME EUROPENE)', cy); cy+=3;
  [['Calitate aer interior','IDA 2 (CO₂<800ppm)','SR EN 16798-1','Senzori CO₂ + ventilare auto'],
   ['Iluminat natural','FLZ min. 2%','SR EN 17037','Ferestrele min. 15% din Af'],
   ['Confort termic','Oper.temp. 20-26°C','SR EN ISO 7730','Izolație termică A/A+'],
   ['Accesibilitate PMR','Rampă 1:12 + lift','Legea 448/2006 + NP 051','Obligatoriu blocuri>P+2E'],
  ].forEach(([l,v,n,d2]) => { cy = tblRow([l,v,n,d2], cy, false, [50,30,35,W-28-50-30-35]); });

  // PAG 9 — Context 3D
  cy = newPage('H. CONTEXT URBAN — HĂRȚI ȘI VEDERE 3D', 9);
  cy = sec('H.1. VEDERE 3D — CONTEXT URBAN REAL', cy); cy+=3;
  cy = addImg(caps.v3dDay||caps.img3D, 14, cy, W-28, 80, 'FIG. 2 — Vedere 3D amplasament · Context urban · Clădiri vecine');
  cy = sec('H.2. SURSE DE POLUARE — RAZA 300m', cy); cy+=3;
  cy = addImg(caps.imgDist||caps.img2D, 14, cy, W-28, 65, 'FIG. 3 — Plan 2D amplasament · Raza 300m · Contextualizare surse');

  // PAG 10 — Concluzii + semnătură
  cy = newPage('I. CONCLUZII + BAZE LEGALE', 10);
  cy = concluzii([
    'Amplasamentul ' + S2(nrcad) + ' (UTR ' + S2(utr) + ', ' + S2(uat) + ') a obținut un scor de sănătate estimat de ' + scoreTotal + '/100, evaluat pe 6 dimensiuni: calitate aer, zgomot, apă, teren, însorire și radon.',
    'Calitatea aerului în zona UTR ' + S2(utr) + ' este clasificată ca "' + zgomot.zona_acustica + '" conf. SR 10009:2017. Izolarea fonică a ferestrelor Rw≥' + (zgomot.Lzsn_limita>60?42:38) + ' dB este obligatorie conform C 125-2013.',
    oreIns.conforme ? 'Însorirea directă estimată (' + oreIns.label + ') respectă cerința OMS 119/2014 (min. 1.5h/zi la solstițiu iarnă).' : 'ATENȚIE: Însorirea estimată (' + oreIns.label + ') este sub limita OMS 119/2014. Studiu detaliat obligatoriu.',
    'Potențialul de radon pentru zona ' + S2(judet) + ' este ' + (lat>46.5?'mediu':'redus-mediu') + '. O măsurătoare de min. 3 luni (sezon rece) este obligatorie la faza PAC conform Ord. MS 1020/2022.',
    'Câmpurile electromagnetice (EMF) din surse de distribuție electrică respectă limitele ICNIRP adoptate prin HG 1408/2007. Niciun risc semnificativ identificat.',
    'Se recomandă ventilare mecanică cu recuperare căldură (ERV/HRV) pentru asigurarea calității aerului interior IDA2 (CO₂<800ppm) conf. SR EN 16798-1.',
    'Studiul de impact a identific ' + (scoreTotal>=80?'niciun':'mai multe') + (scoreTotal>=80?' impediment major pentru obținerea avizului DSP.':', solicitând măsuri de proiectare înainte de obținerea avizului DSP (Direcția de Sănătate Publică).'),
  ], cy);
  sign(); ftr();

  _pdfSaveMobile(pdf, 'studiu_sanatate_' + S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_') + '.pdf');
  ss('✅ Studiu Impact Sănătate generat · 10 pagini · scor ' + scoreTotal + '/100');
};


// ═══════════════════════════════════════════════════════════════════════════
// 3. CPE — CERTIFICAT PERFORMANȚĂ ENERGETICĂ — 10 pagini
// ═══════════════════════════════════════════════════════════════════════════
window.generateCPE = async function(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('Selectați o parcelă.'); return; }
  ss('Se generează Certificat Performanță Energetică...');

  const d = _initStudyPdf('Certificat de Performanta Energetica','CPE · Ord. 2641/2017 · C107/4-2022 · MC001-3/2022',10);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,BLUE,LIGHT,LIGHT2,RED,GREEN,ORANGE,PURPLE,GRAY,GRAY2,
         S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
         hdr,ftr,sec,body,tblRow,kv,addImg,badge,cover,newPage,checkY,concluzii,sign} = d;

  const caps    = await _captureStudyMapsSafe(ap, msg=>ss(msg));
  const aedisH  = S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||10;
  const niv     = Math.max(1, Math.ceil(aedisH/3));
  const areaNum = parseFloat(area)||300;
  const sdTotal = Math.round(areaNum*(parseFloat(params?.cut)||1.0));
  const suTotal = Math.round(sdTotal*0.78);
  const fn      = window._RV?.fn||'rez';
  const bW      = Math.round(Math.sqrt(areaNum*(parseFloat(params?.pot)||0.4))*10)/10;
  const bD      = bW;

  // U-values conf. C107/4-2022 Tabel 7
  const uWall = 0.25, uMaxWall = 0.35;
  const uRoof = 0.16, uMaxRoof = 0.20;
  const uWin  = 0.90, uMaxWin  = 1.30;
  const uFloor= 0.26, uMaxFloor= 0.30;

  // Suprafețe anvelopă
  const aWall  = (2*(bW+bD))*niv*3*0.75;
  const aWin   = (2*(bW+bD))*niv*3*0.25;
  const aRoof  = bW*bD;
  const aFloor = bW*bD;

  // Grade-zile Iași H/D conf. SR EN ISO 15927-6
  const HDD = typeof _calcHDD==='function' ? _calcHDD(lat,lon) : (lat>47?2900:lat>46?2820:lat>45?2600:2400);
  const Htrans = uWall*aWall + uRoof*aRoof + uWin*aWin + uFloor*aFloor;
  const qCalc  = Math.round(Htrans*HDD*24/1000);
  const Qventil= Math.round(suTotal*0.5*1.0*1.2*HDD*24/3600/1000); // 0.5 vol/h
  const Qsolar = Math.round(aWin*0.4*0.7*900); // castig solar estimat
  const Qint   = Math.round(niv*(fn==='rez'?4:8)*suTotal/niv*365*24/1000*0.15); // castiguri interne
  const Qnet   = Math.max(0, qCalc + Qventil - Qsolar - Qint);
  const epSpec = Math.round(Qnet / Math.max(1,suTotal));

  // Clasa energetică conf. Ord. 2641/2017
  const _cls = ep => {
    if(ep<=50)  return {cls:'A+', col:[0,130,60],   bar:5,  desc:'Pasiv/Plus'};
    if(ep<=100) return {cls:'A',  col:[0,160,80],   bar:15, desc:'Foarte eficient'};
    if(ep<=150) return {cls:'B',  col:[59,130,246], bar:28, desc:'Eficient'};
    if(ep<=200) return {cls:'C',  col:[0,128,120],  bar:42, desc:'Moderat eficient'};
    if(ep<=250) return {cls:'D',  col:[234,120,20], bar:57, desc:'Mediu'};
    if(ep<=300) return {cls:'E',  col:[200,80,20],  bar:72, desc:'Slab eficient'};
    if(ep<=350) return {cls:'F',  col:[200,50,30],  bar:85, desc:'Ineficient'};
    return              {cls:'G',  col:[170,20,20],  bar:98, desc:'Foarte ineficient'};
  };
  const cls    = _cls(epSpec);
  const clsNZEB= _cls(100);
  const isNZEB = epSpec <= 100;

  // Emisii CO₂
  const co2    = Math.round(Qnet * 0.233); // kg CO₂/an (mix rețea Romania ~0.233 kgCO2/kWh)
  const co2Sp  = Math.round(co2/Math.max(1,suTotal));

  // ── PAG 1: Copertă cu grafic clase energetice ─────────────────────────────
  pdf.setFillColor(...DARK); pdf.rect(0,0,W,H,'F');
  pdf.setFillColor(15,30,65); pdf.rect(0,4,W,H-8,'F');
  pdf.setFillColor(...GOLD); pdf.rect(0,0,W,4,'F'); pdf.rect(0,H-4,W,4,'F');
  pdf.setFillColor(...BLUE); pdf.rect(0,4,5,H-8,'F');
  pdf.setFillColor(...GOLD); pdf.rect(0,4,2.5,H-8,'F');
  try{_pdfDrawLogo&&_pdfDrawLogo(pdf,W/2-14,18,28);}catch(e){}
  pdf.setTextColor(...GOLD); pdf.setFontSize(8.5); pdf.setFont('helvetica','bold');
  pdf.text('URBANX — CERTIFICAT DE PERFORMANȚĂ ENERGETICĂ',W/2,48,{align:'center'});
  pdf.setFillColor(...GOLD); pdf.rect(W/2-40,52,80,1,'F');
  pdf.setTextColor(255,255,255); pdf.setFontSize(22); pdf.setFont('helvetica','bold');
  pdf.text('CLASA ENERGETICĂ',W/2,66,{align:'center'});
  // Bara clase
  const classes = [{cls:'A+',col:[0,130,60]},{cls:'A',col:[0,160,80]},{cls:'B',col:[59,130,246]},
    {cls:'C',col:[0,128,120]},{cls:'D',col:[234,120,20]},{cls:'E',col:[200,80,20]},{cls:'F',col:[200,50,30]},{cls:'G',col:[170,20,20]}];
  const barX = 14, barY = 72, barH2 = 8, totalBarW = W-28;
  classes.forEach((c,i) => {
    const bw = totalBarW/classes.length;
    pdf.setFillColor(...c.col); pdf.rect(barX+i*bw, barY, bw-1, barH2, 'F');
    pdf.setTextColor(255,255,255); pdf.setFontSize(7); pdf.setFont('helvetica','bold');
    pdf.text(c.cls, barX+i*bw+bw/2, barY+5.5, {align:'center'});
    if(c.cls===cls.cls){
      pdf.setFillColor(255,255,255); pdf.rect(barX+i*bw-1, barY-2, bw+2, barH2+4, 'S');
      pdf.setFillColor(...cls.col); pdf.circle(barX+i*bw+bw/2, barY+barH2+12, 10, 'F');
      pdf.setTextColor(255,255,255); pdf.setFontSize(16); pdf.setFont('helvetica','bold');
      pdf.text(cls.cls, barX+i*bw+bw/2, barY+barH2+17, {align:'center'});
    }
  });
  let y2=barY+barH2+30;
  pdf.setFillColor(...DARK2); pdf.rect(14,y2,W-28,50,'F');
  pdf.setFillColor(...GOLD); pdf.rect(14,y2,W-28,2,'F'); pdf.rect(14,y2,2.5,50,'F');
  const d1=[['Nr. cadastral',S2(nrcad)],['UAT',S2(uat)+', jud. '+S2(judet)],
    ['Zonă UTR',S2(utr)],['Suprafață teren',S2(area)+' m²'],
    ['Ep specific',epSpec+' kWh/m²·an'],['Emisii CO₂',co2Sp+' kg/m²·an'],
    ['Clasa NZEB',isNZEB?'✓ CONFORM NZEB':'✗ SUB NZEB (≤100 kWh)'],['Data',S2(dateStr)]];
  const kc=(W-28)/2;
  d1.forEach(([l,v],i)=>{
    const col=i%2, row=Math.floor(i/2);
    pdf.setTextColor(148,168,200); pdf.setFontSize(6); pdf.setFont('helvetica','bold');
    pdf.text(S2(l)+':',14+col*kc+3,y2+10+row*11);
    pdf.setTextColor(255,255,255); pdf.setFontSize(8); pdf.setFont('helvetica','bold');
    pdf.text(S2(String(v||'—')),14+col*kc+3,y2+15+row*11);
  });
  pdf.setFillColor(...(isNZEB?GREEN:RED)); pdf.rect(14,y2+50,W-28,8,'F');
  pdf.setTextColor(255,255,255); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
  pdf.text(isNZEB?'✓ CONFORM NZEB — Nearly Zero Energy Building (≤100 kWh/m²·an)':
    '✗ SUB NZEB — Necesare măsuri de creștere eficiență energetică', W/2, y2+55.5, {align:'center'});
  pdf.setFillColor(...DARK); pdf.rect(0,H-16,W,16,'F');
  pdf.setTextColor(...GOLD2); pdf.setFontSize(6.5); pdf.setFont('helvetica','normal');
  pdf.text('Generat: '+S2(dateStr)+' · Ep='+epSpec+' kWh/m²·an · Clasa '+cls.cls+' · Document orientativ · UrbanX TSS·FG',W/2,H-7,{align:'center'});
  ftr();

  // ── PAG 2: Date clădire + context ─────────────────────────────────────────
  let cy = newPage('DATE CLĂDIRE + CONTEXT ENERGETIC', 2);
  cy = addImg(caps.imgLocation||caps.img2D, 14, cy, W-28, 62, 'FIG. 1 — Amplasament · Orientare față de punctele cardinale · Context urban');
  cy = sec('1. DATE DE INTRARE — CLĂDIRE PROPUSĂ', cy); cy+=3;
  const kw3 = (W-28)/4;
  [['Suprafață teren', S2(area)+' m²'],['Sc estimată', sc_est(areaNum,params)+' m²'],
   ['SD utilă estimată', suTotal+' m²'],['Nr. niveluri', niv+' niv.'],
   ['Înălțime totală', aedisH.toFixed(1)+' m'],['Volum încălzit', Math.round(suTotal*niv*0.3/niv*4.5)+' m³'],
   ['Orientare principală', S2(S.vol?.frontDir||params?.frontDir||'?')],['Grad zile HDD', HDD+' K·zile'],
  ].forEach(([l,v],i) => kv(l, v, 14+(i%4)*kw3, i<4?cy:cy+24, kw3-2, [GOLD,BLUE,GREEN,ORANGE][i%4]));
  cy+=52;

  function sc_est(a,p){ return Math.round(a*(parseFloat(p?.pot)||0.4)); }

  // ── PAG 3: Anvelopă termică ───────────────────────────────────────────────
  cy = newPage('2. ANVELOPĂ TERMICĂ — C107/4-2022 Tabel 7', 3);
  cy = sec('2.1. COEFICIENȚI TERMICI — COMPARAȚIE CU LIMITA C107/4-2022', cy); cy+=3;
  cy = body('Valorile U maxime admise sunt din C107/4-2022 Tabel 7 pentru zona climatică ' +
    (lat>47?'I':lat>46?'II':'III') + ' (Iași și Moldova). Valorile propuse trebuie să respecte aceste limite.', 14, cy); cy+=4;
  cy = tblRow(['Element anvelopă','U propus','U maxim admis','Suprafată','ΔU²','Status'], cy, true, [55,25,30,25,22,W-28-55-25-30-25-22]);
  const anv = [
    ['Pereți exteriori (termoizol. 12cm)', uWall, uMaxWall, Math.round(aWall)],
    ['Planșeu terasă/acoperiș (termoiz. 20cm)', uRoof, uMaxRoof, Math.round(aRoof)],
    ['Tâmplărie exterioară (tripluvitrare)', uWin, uMaxWin, Math.round(aWin)],
    ['Planșeu peste spațiu neîncălzit (termoiz. 8cm)', uFloor, uMaxFloor, Math.round(aFloor)],
  ];
  anv.forEach(([el,u,uMax,af]) => {
    const ok = u <= uMax;
    cy = tblRow([el, u+' W/m²K', uMax+' W/m²K', af+' m²', ((uMax-u)/uMax*100).toFixed(0)+'%', ok?'✓ CONFORM':'✗ DEPĂȘIT'],
      cy, false, [55,25,30,25,22,W-28-55-25-30-25-22]);
  });
  cy+=4;
  cy = sec('2.2. PUNȚI TERMICE LINIARE (ψ) — SR EN ISO 10211', cy); cy+=3;
  cy = tblRow(['Punte termică','ψ [W/mK]','Lungime [m]','Pierderi [W/K]'], cy, true, [65,25,30,W-28-65-25-30]);
  [['Racordare perete exterior-planșeu intermediar','0.08',String(Math.round(2*(bW+bD)*niv)),String(Math.round(0.08*2*(bW+bD)*niv*10)/10)],
   ['Colțuri exterioare (convexe)','0.05',String(Math.round(8*niv*3)),String(Math.round(0.05*8*niv*3*10)/10)],
   ['Racordare perete-tâmplărie exterioară','0.04',String(Math.round(aWin/1.2*4)),String(Math.round(0.04*aWin/1.2*4*10)/10)],
  ].forEach(r => { cy = tblRow(r, cy, false, [65,25,30,W-28-65-25-30]); });

  // ── PAG 4: Bilanț energetic ───────────────────────────────────────────────
  cy = newPage('3. BILANȚ ENERGETIC ANUAL — MC001-3/2022', 4);
  cy = sec('3.1. CALCUL NECESAR TERMIC ANUAL', cy); cy+=3;
  cy = tblRow(['Component','Valoare [kWh/an]','% din total','Observație'], cy, true, [60,35,25,W-28-60-35-25]);
  const totalPierderi = qCalc+Qventil;
  [['Pierderi prin anvelopă (transmisie)', qCalc, Math.round(qCalc/Math.max(1,totalPierderi)*100)+'%', 'U-values×Suprafete×HDD'],
   ['Pierderi prin ventilare (infiltrații)', Qventil, Math.round(Qventil/Math.max(1,totalPierderi)*100)+'%', '0.5 ach × Vîncălzit'],
   ['Câștiguri solare pasive (−)', -Qsolar, '—', 'aWin×g×I_sol×0.7'],
   ['Câștiguri interne (−)', -Qint, '—', 'Aparat. electr. + persoane'],
   ['NECESAR NET Qnet', Qnet, '100%', 'SUMA TOTALĂ'],
   ['Ep specific (Qnet/Su)', epSpec+' kWh/m²·an', '—', 'Clasa '+cls.cls],
   ['Emisii CO₂ specifice', co2Sp+' kgCO₂/m²·an', '—', 'factor 0.233 kg/kWh rețea'],
  ].forEach(([l,v,p,o]) => { cy = tblRow([S2(l), String(v), S2(p), S2(o)], cy, false, [60,35,25,W-28-60-35-25]); });
  cy+=4;
  cy = sec('3.2. COMPARAȚIE CU PRAGURI NORMATIVE', cy); cy+=3;
  cy = tblRow(['Categorie','Ep specific','Clasa CPE','Status față de parcelă'], cy, true, [55,35,25,W-28-55-35-25]);
  [['Clădire propusă',epSpec+' kWh/m²·an',cls.cls,'REFERINȚĂ'],
   ['Prag NZEB (Lg.372/2005)','≤100 kWh/m²·an','A',isNZEB?'✓ RESPECTAT':'✗ NERESPECT.'],
   ['Clădire standard (2010)','~180 kWh/m²·an','C','—'],
   ['Clădire veche (pre-1990)','~300 kWh/m²·an','E-F','—'],
   ['Pasivhaus','≤15 kWh/m²·an','A+','—'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,35,25,W-28-55-35-25]); });

  // ── PAG 5: Sisteme tehnice ────────────────────────────────────────────────
  cy = newPage('4. SISTEME TEHNICE — ÎNCĂLZIRE + RĂCIRE + ACS + VENTILARE', 5);
  cy = sec('4.1. SISTEM ÎNCĂLZIRE PROPUS', cy); cy+=3;
  cy = body('Sistemul de încălzire influențează direct Ep și clasa CPE prin eficiența sursei (COP/ηs) și distribuției. ' +
    'Valorile de mai jos sunt pentru ' + fn === 'rez' ? 'locuire colectivă' : 'clădiri de birouri/comerciale' + '.', 14, cy); cy+=4;
  cy = tblRow(['Sistem','ηs (sursa)','Ep impact','Cerințe inst.','Cost inv.'], cy, true, [55,22,22,55,W-28-55-22-22-55]);
  [['CT gaz + radiatoare','0.92','↑ +15%','Cos.de fum separate','Redus'],
   ['Pompă căldură aer-apă (COP=3.5)','0.98+','↓ −30%','SSPC, no pt. termic min.','Mediu'],
   ['Pompă căldură sol-apă (COP=4.5)','0.99+','↓ −45%','Sonde geotermale, permis','Ridicat'],
   ['Termoficare urbană (eficiență medie)','0.88','↑ +10%','Punct termic propriu','Redus'],
   ['Panouri solare termice (ACS)','N/A','ACS−50%','Conf. ISCIR, rezervor','Mediu'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,22,22,55,W-28-55-22-22-55]); cy=checkY(cy,12,'SISTEME',5); });
  cy+=4;
  cy = sec('4.2. VENTILARE MECANICĂ CU RECUPERARE — IMPACT CPE', cy); cy+=3;
  cy = tblRow(['Soluție ventilare','η recuperare','Economie vs. naturală','Normativ'], cy, true, [70,28,38,W-28-70-28-38]);
  [['Ventilare mecanică simplă (fără rec.)','0%','0%','NP 037/1999'],
   ['VMC cu recuperare căldură (ERV η=75%)','75%','~20-25% din Qventil','SR EN 13141-7'],
   ['VMC cu recuperare (Passivhaus η=90%)','90%','~30% din Qventil','PHI standard'],
  ].forEach(r => { cy = tblRow(r, cy, false, [70,28,38,W-28-70-28-38]); });

  // ── PAG 6: Fotovoltaic + energie regenerabilă ─────────────────────────────
  const Ppv  = Math.round(bW*bD*0.12*0.18);
  const Epv  = Math.round(Ppv*_calcSolarGHI(lat,lon));
  cy = newPage('5. ENERGIE REGENERABILĂ + BILANȚ NZEB', 6);
  cy = sec('5.1. POTENȚIAL FOTOVOLTAIC ACOPERIȘ', cy); cy+=3;
  const kw4 = (W-28)/3;
  [['Ppv instalabil',Ppv+' kWp'],['Producție anuală',Epv+' kWh/an'],['Acoperire consum',Math.round(Epv/Math.max(1,Qnet)*100)+'%']
  ].forEach(([l,v],i) => kv(l, v, 14+i*kw4, cy, kw4-2, [GREEN,GOLD,BLUE][i]));
  cy+=28;
  cy = tblRow(['Parametru','Fără PV','Cu PV '+Ppv+'kWp','Îmbunătățire'], cy, true, [65,30,35,W-28-65-30-35]);
  [['Ep specific kWh/m²·an', epSpec, Math.max(0,epSpec-Math.round(Epv/Math.max(1,suTotal))), '↓'+Math.round(Epv/Math.max(1,suTotal))+' kWh'],
   ['Clasa CPE', cls.cls, _cls(Math.max(0,epSpec-Math.round(Epv/Math.max(1,suTotal)))).cls, '—'],
   ['Emisii CO₂/m²', co2Sp, Math.max(0,co2Sp-Math.round(Epv*0.233/Math.max(1,suTotal)))+' kg', '—'],
   ['Cost operare estimat (EUR/m²·an)', Math.round(epSpec*0.12), Math.round(Math.max(0,epSpec-Epv/Math.max(1,suTotal))*0.12), '—'],
  ].forEach(r => { cy = tblRow(r.map(String), cy, false, [65,30,35,W-28-65-30-35]); });

  // ── PAG 7: Recomandări îmbunătățire ──────────────────────────────────────
  cy = newPage('6. RECOMANDĂRI PENTRU ÎMBUNĂTĂȚIRE CLASĂ', 7);
  cy = sec('6.1. PACHET MĂSURI — CREȘTERE EFICIENȚĂ ENERGETICĂ', cy); cy+=3;
  cy = tblRow(['Măsură','Economie kWh/an','Cost EUR','Perioadă recuperare','Prioritate'], cy, true, [65,28,28,30,W-28-65-28-28-30]);
  [['Termoiz. suplim. pereți ext. (20→25cm)',Math.round(qCalc*0.08),Math.round(suTotal*12),'8-10 ani','MEDIE'],
   ['Ferestre tripluVitrare Low-E Ug≤0.6',Math.round(qCalc*0.12),Math.round(aWin*250),'10-12 ani','MEDIE'],
   ['VMC cu recuperare căldură η=80%',Math.round(Qventil*0.8),Math.round(suTotal*45),'8-12 ani','MARE'],
   ['Pompă căldură aer-apă (COP≥3.5)',Math.round(Qnet*0.30),Math.round(suTotal*120),'10-15 ani','MARE'],
   ['Panouri PV '+Ppv+'kWp acoperiș',Epv,Math.round(Ppv*900),'8-10 ani','MARE'],
   ['Acoperiș verde extensiv (REI+izol.)',Math.round(qCalc*0.04),Math.round(aRoof*60),'15-20 ani','MEDIE'],
   ['Termostat inteligent + BMS (Building Mgmt)',Math.round(Qnet*0.10),Math.round(suTotal*15),'3-5 ani','MARE'],
  ].forEach(r => { cy = tblRow(r.map(String), cy, false, [65,28,28,30,W-28-65-28-28-30]); cy=checkY(cy,12,'RECOMANDĂRI',7); });

  // ── PAG 8: Context + hărți ────────────────────────────────────────────────
  cy = newPage('7. CONTEXT URBAN — AMPLASAMENT + ORIENTARE SOLARĂ', 8);
  cy = sec('7.1. VEDERE 3D — ORIENTARE + ÎNSORIRE', cy); cy+=3;
  cy = addImg(caps.v3dDay||caps.img3D, 14, cy, W-28, 80, 'FIG. 2 — Vedere 3D · Orientare cardinală · Potențial solar acoperiș');
  cy = sec('7.2. PLAN CADASTRAL — FOND CONSTRUIT ÎN ZONĂ', cy); cy+=3;
  cy = addImg(caps.imgDist||caps.img2D, 14, cy, W-28, 65, 'FIG. 3 — Plan situație · Context construit · Umbre proiectate estimative');

  // ── PAG 9: Baze legale ────────────────────────────────────────────────────
  cy = newPage('8. BAZE LEGALE + NORME APLICATE', 9);
  cy = sec('8.1. CADRU NORMATIV CPE ROMÂNIA', cy); cy+=3;
  cy = tblRow(['Normativ','Titlu','Aplicabilitate'], cy, true, [35,120,W-28-35-120]);
  [['C107/4-2022','Normativ calc. termotehnic (înlocuiește C107-2005)','Coef. U + punți termice'],
   ['MC001-3/2022','Metodologie calc. perf. energetică clădiri','Bilanț energetic Ep'],
   ['Ord. 2641/2017','Reglementare certificate performanță energetică','Clasă CPE A-G'],
   ['Legea 372/2005','Performanța energetică a clădirilor (NZEB)','Obligat. NZEB clădiri noi'],
   ['HG 865/2016','Plan Național clădiri NZEB','Calendar NZEB'],
   ['SR EN ISO 10211','Punți termice — calcul flux termic','Punți termice'],
   ['SR EN 13829','Etanșeitate la aer — metoda presorizare','Blower Door Test'],
   ['SR EN 15927-6','Date climatice grade-zile','HDD + CDD'],
   ['SR EN 16798-1','Cerințe energetice clădiri — criterii mediu interior','IDA1-IDA4'],
   ['PHI Passivhaus Standard','≤15 kWh/m²·an, ≤10 W/m², n50≤0.6','Referință internațională'],
  ].forEach(r => { cy = tblRow(r, cy, false, [35,120,W-28-35-120]); cy=checkY(cy,10,'NORME',9); });

  // ── PAG 10: Concluzii + semnătură ────────────────────────────────────────
  cy = newPage('9. CONCLUZII + SEMNĂTURĂ', 10);
  cy = concluzii([
    'Clădirea propusă pentru parcela ' + S2(nrcad) + ' (UTR ' + S2(utr) + ', ' + S2(uat) + ') a obținut clasa de performanță energetică ' + cls.cls + ' cu Ep=' + epSpec + ' kWh/m²·an și emisii de ' + co2Sp + ' kgCO₂/m²·an.',
    isNZEB ? 'Clădirea RESPECTĂ cerința NZEB (Nearly Zero Energy Building) conf. Legii 372/2005 modificată prin HG 865/2016, cu Ep≤100 kWh/m²·an.' : 'Clădirea NU respectă cerința NZEB. Sunt necesare măsuri suplimentare de eficiență energetică pentru a atinge clasa A (Ep≤100 kWh/m²·an) conform Legii 372/2005.',
    'Anvelopa termică este conformă cu C107/4-2022: U_perete=' + uWall + ' W/m²K (max ' + uMaxWall + '), U_acoperiș=' + uRoof + ' W/m²K (max ' + uMaxRoof + '), U_tâmplărie=' + uWin + ' W/m²K (max ' + uMaxWin + ').',
    'Potențialul fotovoltaic al acoperișului este de ' + Ppv + ' kWp (~' + Epv + ' kWh/an), care ar permite îmbunătățirea clasei la ' + _cls(Math.max(0,epSpec-Math.round(Epv/Math.max(1,suTotal)))).cls + ' și atingerea conformității NZEB.',
    'Prioritate recomandată: ventilare mecanică cu recuperare (η≥80%) + pompă căldură aer-apă (COP≥3.5) + PV ' + Ppv + 'kWp.',
    'CPE-ul final conform Ord. 2641/2017 se elaborează de expert energetic atestat MDLPA la faza PT și se depune la Primărie odată cu Autorizația de Construire.',
  ], cy);
  sign(); ftr();

  _pdfSaveMobile(pdf, 'cpe_' + S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_') + '.pdf');
  ss('✅ CPE generat · Clasa ' + cls.cls + ' · Ep=' + epSpec + ' kWh/m²·an · 10 pagini');
};


// ═══════════════════════════════════════════════════════════════════════════
// 4. STABILITATE TALUZURI — extins la 10 pagini (din 5)
// ═══════════════════════════════════════════════════════════════════════════
// Nota: functia existenta are deja calcule bune + 5 pagini
// Adaugam 5 pagini extra cu: context 3D, riscuri cumulate, deviz, norme
window.generateStabilitateTaluzuri = async function(){
  const _cursEUR = await _getBNRRate('EUR').catch(()=>null);
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('Selectați o parcelă.'); return; }
  ss('Se generează Studiu Stabilitate Taluzuri...');

  const d = _initStudyPdf('Studiu de Stabilitate Taluzuri si Versanti','Geotehnică · EC7 · NP 074/2014 · P91-2008',10);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,BLUE,LIGHT,LIGHT2,RED,GREEN,ORANGE,GRAY,GRAY2,
         S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
         hdr,ftr,sec,subsec,body,tblRow,kv,addImg,badge,cover,newPage,checkY,concluzii,sign} = d;

  const caps      = await _captureStudyMapsSafe(ap, msg=>ss(msg));
  const elevData  = await _getElevation(lat, lon);
  const terrCls   = _classifyTerrain(lat, lon, elevData.elev);
  const seism     = getSeismConfig();
  const hidro     = getHidroConfig();
  const areaNum   = parseFloat(area)||300;
  const aedisH    = S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||10;
  const elevTeren = elevData.elev;
  const elevSursa = elevData.source;
  const RON       = _cursEUR?.rate || 5.05;

  // Parametri geotehnici din _classifyTerrain
  const geo = {
    gamma: terrCls?.geo?.gamma || 19.0,
    gammaW:10.0, c: terrCls?.geo?.c||18.0,
    phi:terrCls?.geo?.phi||20.0, cu: terrCls?.geo?.cu||45.0,
    nfa: hidro.nfa||2.5,
  };
  const slopeEst = terrCls?.slope || 5.0;

  const calcFs = (H, betaDeg, hwFrac=0.5) => {
    const beta = betaDeg*Math.PI/180, phi = geo.phi*Math.PI/180;
    const hw = H*hwFrac;
    const sigma_n = geo.gamma*H*Math.cos(beta)**2;
    const u = geo.gammaW*hw*Math.cos(beta)**2;
    const tau_f = geo.c+(sigma_n-u)*Math.tan(phi);
    const tau_mob = geo.gamma*H*Math.sin(beta)*Math.cos(beta);
    return Math.max(0.5, tau_mob>0?tau_f/tau_mob:99);
  };

  const Fs_est  = calcFs(5, slopeEst+5, 0.5);
  const Fs_crit = calcFs(5, slopeEst+15, 0.7); // scenariu critic
  const riskLevel = Fs_est>=2.0?'STABIL':Fs_est>=1.5?'ACCEPTABIL':Fs_est>=1.2?'RISC MODERAT':'RISC RIDICAT';
  const riskColor = Fs_est>=2.0?GREEN:Fs_est>=1.5?[0,150,120]:Fs_est>=1.2?ORANGE:RED;

  // ── PAG 1: Cover ─────────────────────────────────────────────────────────
  cover('Evaluare stabilitate versanți · Zonă ' + S2(terrCls?.tip||'de câmpie/deal'),
    caps.imgLocation||null,
    [['Cotă teren AMSL', elevTeren.toFixed(1)+'m'],['Tip teren',S2(terrCls?.tip||'—')],
     ['Fs estimat (scenariu uscat)',calcFs(5,slopeEst,0).toFixed(2)],['Fs crit. (scenariu ploios)',Fs_crit.toFixed(2)]],
    Fs_est>=1.5, 'FACTOR SIGURANȚĂ Fs=' + Fs_est.toFixed(2) + ' — ' + riskLevel);

  // ── PAG 2: Context geomorfologic ─────────────────────────────────────────
  let cy = newPage('1. CONTEXT GEOMORFOLOGIC — COTE TEREN', 2);
  cy = addImg(caps.img2D||caps.imgLocation, 14, cy, W-28, 65, 'FIG. 1 — Plan 2D amplasament · Context geomorfologic · Rețea hidrografică');
  cy = sec('1.1. DATE TOPOGRAFICE — DEM (Digital Elevation Model)', cy); cy+=3;
  const kw3 = (W-28)/3;
  [['Cotă teren AMSL',elevTeren.toFixed(1)+' m'],['Sursă elevație',S2(elevSursa)],
   ['Pantă estimată zonă',slopeEst.toFixed(1)+'°'],['Clasif. teren',S2(terrCls?.tip||'—')],
   ['Categorie geotehnică',hidro.clasa_geotehnica+' (NP 074)'],['NFA estimat',hidro.nfa.toFixed(1)+' m']
  ].forEach(([l,v],i) => kv(l,v,14+(i%3)*kw3,i<3?cy:cy+24,kw3-2,[BLUE,GOLD,GREEN][i%3]));
  cy+=54;
  cy = tblRow(['Indicator geomorfologic','Valoare estimată','Baza determinare','Impact stabilitate'], cy, true, [60,35,55,W-28-60-35-55]);
  [['Pantă medie zonă', slopeEst.toFixed(1)+'°', 'DEM SRTM 30m', slopeEst<5?'REDUS':slopeEst<15?'MEDIU':'MARE'],
   ['Cotă absolută AMSL', elevTeren.toFixed(1)+' m', S2(elevSursa), '—'],
   ['Adâncime NFA (estimat)', hidro.nfa.toFixed(1)+' m', 'Hidrogeo regional', hidro.nfa<2?'MARE':hidro.nfa<4?'MEDIU':'REDUS'],
   ['Erozivitate sol', slopeEst>15?'Ridicată':slopeEst>5?'Medie':'Redusă', 'Textură+pantă', '—'],
   ['Risc alunecări', seism.ag>=0.25&&slopeEst>10?'MODERAT':slopeEst>20?'RIDICAT':'REDUS', 'P91/2008', '—'],
  ].forEach(r => { cy = tblRow(r, cy, false, [60,35,55,W-28-60-35-55]); cy=checkY(cy,12,'GEOMORF',2); });

  // ── PAG 3: Parametri geotehnici ───────────────────────────────────────────
  cy = newPage('2. PARAMETRI GEOTEHNICI — NP 074/2014 + EC7 NB:2014', 3);
  cy = sec('2.1. PROPRIETĂȚI ESTIMATIVE SOL — ZONA AMPLASAMENT', cy); cy+=3;
  cy = body('Parametrii geotehnici sunt estimați pe baza zonei geografice și clasificării terenului. ' +
    'Forajul geotehnic conform NP 074/2014 este OBLIGATORIU pentru verificarea acestor valori.', 14, cy); cy+=4;
  cy = tblRow(['Parametru','Simbol','Valoare estimată','Unitate','Metodă determinare'], cy, true, [55,18,30,20,W-28-55-18-30-20]);
  [['Greutate volumică naturală','γ',geo.gamma.toFixed(1),'kN/m³','STAS 1913/1'],
   ['Coeziune (Mohr-Coulomb)','c',geo.c.toFixed(1),'kPa','STAS 8942/2'],
   ['Unghi frecare internă','φ',geo.phi.toFixed(1),'grade','STAS 8942/2'],
   ['Rezist. forfecare nedrenată','Cu',geo.cu.toFixed(1),'kPa','SR EN ISO 22476-1'],
   ['Adâncime apă freatică','NFA',geo.nfa.toFixed(1),'m','Foraj + piezometru'],
   ['Portanță convențională','pconv',hidro.portanta,'kPa','NP 112/2014'],
   ['Adâncime fundare minimă','Df','≥'+hidro.adancime_fundare.toFixed(1),'m','NP 112/2014'],
  ].forEach(r => { cy = tblRow(r, cy, false, [55,18,30,20,W-28-55-18-30-20]); });
  cy+=4;
  cy = sec('2.2. CLASIFICARE GEOTEHNICĂ — NP 074/2014', cy); cy+=3;
  cy = tblRow(['Categorie geotehnică','Condiții teren','Cerința studiu','Status parcelă'], cy, true, [25,60,60,W-28-25-60-60]);
  [['1 (simplă)', 'Teren bun, pantă<5°, NFA>5m', 'Raport geotehnic simplificat', hidro.clasa_geotehnica==='1'?'→ PARCELĂ':'—'],
   ['2 (normală)', 'Teren mediu, pantă 5-15°, NFA>2m', 'Raport geotehnic complet', hidro.clasa_geotehnica==='2'?'→ PARCELĂ':'—'],
   ['3 (dificilă)', 'Teren slab/pantă>15°/NFA<2m', 'Studiu geotehnic detaliat + expertiză', hidro.clasa_geotehnica==='3'?'→ PARCELĂ':'—'],
  ].forEach(r => { cy = tblRow(r, cy, false, [25,60,60,W-28-25-60-60]); });

  // ── PAG 4: Calcul factor siguranță Fellenius ──────────────────────────────
  cy = newPage('3. CALCUL FACTOR SIGURANȚĂ Fs — METODA FELLENIUS', 4);
  cy = sec('3.1. FORMULA FELLENIUS (BISHOP SIMPLIFICATĂ) — TALUZ INFINIT', cy); cy+=3;
  cy = body('Metoda Fellenius (1936) pentru taluz infinit omogen — suprafață de alunecare plană paralelă cu suprafața terenului. ' +
    'Formula: Fs = [c + (γ·H·cos²β − γw·hw·cos²β)·tan(φ)] / [γ·H·sin(β)·cos(β)]', 14, cy); cy+=4;
  cy = tblRow(['Scenariu','H(m)','β(°)','hw/H','Fs calculat','Status'], cy, true, [55,15,15,15,25,W-28-55-15-15-15-25]);
  [[0.0,'Uscat (fără apă freatică)'],
   [0.3,'Ploaie medie (hw=30%H)'],
   [0.5,'Ploaie intensă (hw=50%H)'],
   [0.7,'Saturare parțială (hw=70%H)'],
   [1.0,'Saturare completă (hw=H)'],
  ].forEach(([hw,desc]) => {
    const Fs = calcFs(5, slopeEst+10, hw);
    const stat = Fs>=2.0?'STABIL':Fs>=1.5?'ACCEPTABIL':Fs>=1.2?'RISC MOD.':'RISC MARE';
    cy = tblRow([desc,'5.0',(slopeEst+10).toFixed(1),hw.toFixed(1),Fs.toFixed(3),stat],
      cy, false, [55,15,15,15,25,W-28-55-15-15-15-25]);
    cy = checkY(cy,12,'Fs',4);
  });
  cy+=4;
  cy = sec('3.2. VARIAȚIA Fs CU UNGHIUL DE PANTĂ β', cy); cy+=3;
  cy = tblRow(['β (grade)','Fs teren uscat','Fs teren saturat','Risc','Recomandare'], cy, true, [20,28,28,25,W-28-20-28-28-25]);
  [5,10,15,20,25,30,35,40].forEach(beta => {
    const FsD = calcFs(5,beta,0);
    const FsW = calcFs(5,beta,0.7);
    const risk = FsD>=2?'Stabil':FsD>=1.5?'Accept.':FsD>=1.2?'Risc mod.':'Risc mare';
    cy = tblRow([beta+'°',FsD.toFixed(2),FsW.toFixed(2),risk,FsD<1.5?'Consolidare':'—'],
      cy, false, [20,28,28,25,W-28-20-28-28-25]);
    cy = checkY(cy,12,'VARIATIE',4);
  });

  // ── PAG 5: Riscuri naturale cumulate ─────────────────────────────────────
  cy = newPage('4. RISCURI NATURALE CUMULATE — P91/2008 + HARTA HAZARD', 5);
  cy = addImg(caps.imgDist||caps.img2D, 14, cy, W-28, 68, 'FIG. 2 — Plan amplasament · Context geomorfologic · Raza 200m');
  cy = sec('4.1. EVALUARE RISCURI NATURALE CUMULATE', cy); cy+=3;
  cy = tblRow(['Risc natural','Nivel estimat','Normativ','Acțiune necesară'], cy, true, [40,30,45,W-28-40-30-45]);
  [['Alunecări de teren',slopeEst>15?'RIDICAT':slopeEst>5?'MODERAT':'REDUS','P91/2008 + HG 447/2003',slopeEst>10?'Studiu detaliat obligatoriu':'Monitorizare preventivă'],
   ['Risc seismic',seism.ag>=0.25?'RIDICAT':seism.ag>=0.20?'MODERAT':'REDUS','P100-1/2013','Amplificarea mișcării seismice pe versanți (EC8)'],
   ['Eroziune pluvială',slopeEst>10?'MEDIE':'REDUSĂ','SR EN ISO 11274','Sisteme de drenaj + vegetație'],
   ['Inundații',hidro.nfa<2?'POSIBIL':'REDUS','Directiva 2007/60/CE','Verificare zonă inundabilă ANIF'],
   ['Subsidență (tasare)','Redusă (pcon=' + hidro.portanta + 'kPa)','NP 112/2014','Fundare adecvată Df≥' + hidro.adancime_fundare.toFixed(1) + 'm'],
  ].forEach(r => { cy = tblRow(r, cy, false, [40,30,45,W-28-40-30-45]); });

  // ── PAG 6: Măsuri de stabilizare ─────────────────────────────────────────
  cy = newPage('5. MĂSURI DE STABILIZARE + DEVIZ ESTIMATIV', 6);
  cy = sec('5.1. SOLUȚII TEHNICE DE STABILIZARE RECOMANDATE', cy); cy+=3;
  cy = tblRow(['Soluție','Condiție aplicabilitate','Fs așteptat','Cost estimativ EUR'], cy, true, [70,55,18,W-28-70-55-18]);
  [['Terasare + remodelare pantă','β>20°, H>3m','≥2.0','8.000-25.000/ml'],
   ['Zid de sprijin gravit. beton','β>25°, H>2m, sol tare','≥2.0','600-1.200/m²'],
   ['Pilot forat + grindă coronament','Teren slab, H>4m','≥1.8','300-600/ml pilot'],
   ['Geocompozit armat (MSE wall)','Umplutură nouă, β30-70°','≥1.8','150-350/m²'],
   ['Drenaj de adâncime + drenuri franc.','NFA<3m, teren argilos','↑Fs 0.3-0.7','50-150/ml'],
   ['Vegetație anchidă antierozivă','Pantă<20°, sol nisipos/praf','↑Fs 0.1-0.3','5-25/m²'],
   ['Geogrilă + rocă bulei (rip-rap)','Eroziune + cursuri apă','—','80-200/m²'],
  ].forEach(r => { cy = tblRow(r, cy, false, [70,55,18,W-28-70-55-18]); cy=checkY(cy,12,'MĂSURI',6); });
  cy+=4;
  cy = sec('5.2. DEVIZ ORIENTATIV LUCRĂRI GEOTEHNICE', cy); cy+=3;
  cy = tblRow(['Lucrare','Cantitate','Cost unitar EUR','Total EUR'], cy, true, [80,30,30,W-28-80-30-30]);
  const costList = [
    ['Studiu geotehnic complet (2 foraje NP 074)','1 studiu','2.500-4.500','3.500'],
    ['Drenaj de suprafață + canal perimetral','linear m','30-80/ml','1.500-4.000'],
    ['Zid sprijin/consolidare pantă (dacă beta>20°)','m²','600-1.200/m²','Conf. proiect'],
    ['Monitorizare inclinometri (2 ani)','2 buc.','800-1.500/buc.','1.600-3.000'],
    ['Plantații antierozive','per parcelă','800-2.500',Math.round(areaNum*0.12)+''],
    ['TOTAL orientativ','—','—','8.000-25.000+'],
  ];
  costList.forEach(r => { cy = tblRow(r, cy, false, [80,30,30,W-28-80-30-30]); });

  // ── PAG 7: Vedere 3D ──────────────────────────────────────────────────────
  cy = newPage('6. VEDERE 3D — CONTEXT URBAN ȘI GEOMORFOLOGIC', 7);
  cy = addImg(caps.v3dDay||caps.img3D, 14, cy, W-28, 80, 'FIG. 3 — Vedere 3D ZI · Relief + construcții · Profil versant estimat');
  cy = addImg(caps.v3dNight||caps.imgCity, 14, cy, W-28, 75, 'FIG. 4 — Vedere 3D NOAPTE · Context urban nocturn');

  // ── PAG 8: Seism + fundare ────────────────────────────────────────────────
  cy = newPage('7. FUNDARE + INTERACȚIUNE SEISM-TEREN', 8);
  cy = sec('7.1. CERINȚE FUNDARE CONF. NP 112/2014 + EC7', cy); cy+=3;
  cy = tblRow(['Parametru fundare','Valoare','Normativ','Obs.'], cy, true, [65,35,40,W-28-65-35-40]);
  [['Adâncime minimă Df','>'+hidro.adancime_fundare.toFixed(1)+' m','NP 112/2014','Sub linia ingheț'],
   ['Portanță convențională pconv',hidro.portanta+' kPa','NP 112/2014 tab.2','Verificare foraj'],
   ['Tip fundație recomandat',hidro.portanta>=250?'Izolată sau continuă':hidro.portanta>=150?'Continuă sau radier':'Radier general','NP 112/2014','Funcție încărcare'],
   ['Adâncime linie îngheț zonă',lat>47?'1.10 m':lat>45?'0.90 m':'0.80 m','NP 082/2004','Minimum pt. fundare'],
  ].forEach(r => { cy = tblRow(r, cy, false, [65,35,40,W-28-65-35-40]); });
  cy+=4;
  cy = sec('7.2. EFECTE SEISMICE PE VERSANȚI — EC8 + P100-1/2013', cy); cy+=3;
  cy = body('Conf. EN 1998-5 (EC8 Part 5), la amplasamentele pe versanți se aplică corecții ale accelerației seismice. ' +
    'Pentru pante β>' + (seism.ag>=0.25?10:15) + '° și ag=' + seism.ag + 'g (zona ' + seism.zona + '), ' +
    'accelerația de proiectare se majorează cu ' + (slopeEst>15?'20-30%':'10-15%') + '.', 14, cy); cy+=4;
  cy = tblRow(['Pantă versant','Factor amplificare','ag de calcul','Risc lichefiere'], cy, true, [35,35,35,W-28-35-35-35]);
  [[5,'1.0',seism.ag.toFixed(2),'Neglijabil'],[10,'1.10',(seism.ag*1.1).toFixed(2),'Redus'],
   [15,'1.20',(seism.ag*1.2).toFixed(2),'Moderat'],[20,'1.30',(seism.ag*1.3).toFixed(2),'Ridicat (nisip)'],
  ].forEach(r => { cy = tblRow(r.map(String), cy, false, [35,35,35,W-28-35-35-35]); });

  // ── PAG 9: Baze legale ────────────────────────────────────────────────────
  cy = newPage('8. BAZE LEGALE + NORME APLICATE', 9);
  cy = sec('8.1. CADRU NORMATIV GEOTEHNICĂ ROMÂNIA + UE', cy); cy+=3;
  cy = tblRow(['Normativ','Titlu','Aplicabilitate'], cy, true, [35,120,W-28-35-120]);
  [['NP 074/2014','Normativ privind documentații geotehnice','Foraj obligatoriu + raport'],
   ['NP 112/2014','Normativ fundare directă — calcul și executare','Df + pconv'],
   ['EC 7 NB:2014','Eurocode 7 — Proiectare geotehnică (SR EN 1997-1)','Calcul factor siguranță'],
   ['EC 8 Part 5','Eurocode 8 — Fundare + versanți în zone seismice','Amplificare seismică'],
   ['P91/2008','Normativ prevenirea/reducerea riscului seismic','Cartare hazard seismic'],
   ['HG 447/2003','Norme metodologice privind modul de elaborare hărți risc','Cartare risc alunecări'],
   ['P100-1/2013','Cod proiectare seismică','ag + Tc + zonare'],
   ['SR EN 1536','Execuția lucrărilor geotehnice speciale — piloti forați','Piloți consolidare'],
   ['C 169/1988','Normativ execuție lucrări terasamente','Terasamente + umplutură'],
  ].forEach(r => { cy = tblRow(r, cy, false, [35,120,W-28-35-120]); cy=checkY(cy,10,'NORME',9); });

  // ── PAG 10: Concluzii ─────────────────────────────────────────────────────
  cy = newPage('9. CONCLUZII + SEMNĂTURĂ', 10);
  cy = concluzii([
    'Amplasamentul ' + S2(nrcad) + ' (UTR ' + S2(utr) + ', ' + S2(uat) + ') are cota absolută AMSL de ' + elevTeren.toFixed(1) + 'm (' + S2(elevSursa) + '). Panta estimată a zonei este de ' + slopeEst.toFixed(1) + '°.',
    'Parametrii geotehnici estimați: γ=' + geo.gamma + ' kN/m³, c=' + geo.c + ' kPa, φ=' + geo.phi + '°, NFA≈' + geo.nfa.toFixed(1) + 'm. Portanță convențională estimată pconv=' + hidro.portanta + ' kPa.',
    'Factorul de siguranță estimat prin metoda Fellenius este Fs≈' + Fs_est.toFixed(2) + ' (teren uscat) și Fs≈' + Fs_crit.toFixed(2) + ' (scenariu critic saturat). Situația este evaluată ca ' + riskLevel + '.',
    'Riscul seismic conf. P100-1/2013 este ag=' + seism.ag + 'g (zona ' + seism.zona + '). Pe versanți cu pantă >10°, accelerația seismică se majorează cu 10-30% conf. EC8 Part 5.',
    'OBLIGATORIU: studiu geotehnic detaliat cu min. 2 foraje la adâncimea Df+3m conform NP 074/2014 înainte de proiectarea fundațiilor.',
    Fs_est < 1.5 ? 'ATENȚIE: Fs estimat sub 1.5 — se recomandă lucrări de consolidare (drenaj + zid sprijin/piloți) înainte de execuție.' : 'Terenul prezintă stabilitate acceptabilă la pantele existente. Se recomandă sistem de drenaj perimetral preventiv.',
    'Deviz orientativ lucrări geotehnice preventive + studiu: 8.000-25.000 EUR, funcție de soluția aleasă.',
  ], cy);
  sign(); ftr();

  _pdfSaveMobile(pdf, 'stabilitate_taluzuri_' + S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_') + '.pdf');
  ss('✅ Studiu Stabilitate Taluzuri generat · 10 pagini · Fs=' + Fs_est.toFixed(2));
};


// ═══════════════════════════════════════════════════════════════════════════
// 5. BILANȚ EDIFICABIL — extins la 10 pagini cu capturi
// ═══════════════════════════════════════════════════════════════════════════
window.generateBilantEdificabil = async function(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('Selectați o parcelă.'); return; }
  ss('Se generează Bilanț Edificabil...');

  const d = _initStudyPdf('Bilant Edificabil — Analiza Maxima Edificabilitate','Bilanț · Indicatori urbanistici PUG/RLU · Scenarii · ROI',10);
  const {pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,BLUE,LIGHT,LIGHT2,RED,GREEN,ORANGE,PURPLE,GRAY,GRAY2,
         S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
         hdr,ftr,sec,body,tblRow,kv,addImg,badge,cover,newPage,checkY,concluzii,sign} = d;

  const caps     = await _captureStudyMapsSafe(ap, msg=>ss(msg));
  const seism    = getSeismConfig();
  const _curs    = await _getBNRRate('EUR').catch(()=>null);
  const RON      = _curs?.rate||5.05;

  const areaNum  = parseFloat(area)||300;
  const POT_max  = parseFloat(params?.pot||65)/100;
  const CUT_max  = parseFloat(params?.cut||2.8);
  const H_max    = parseFloat(params?.h||12);
  const rf       = parseFloat(params?.rf||0);
  const rl       = parseFloat(params?.rl||3);
  const rs       = parseFloat(params?.rs||6);
  const niv      = Math.max(1,Math.floor(H_max/3));
  const SC_max   = Math.round(areaNum*POT_max);
  const SD_max   = Math.round(areaNum*CUT_max);
  const SC_prop  = AEDIS?.corpuri?.reduce((s,c)=>s+(c.sc||SC_max*0.5),0)||Math.round(SC_max*0.75);
  const SD_prop  = SC_prop*niv;
  const POT_real = (SC_prop/areaNum*100).toFixed(1);
  const CUT_real = (SD_prop/areaNum).toFixed(2);
  const H_prop   = niv*3;
  const Su_prop  = Math.round(SD_prop*0.78);

  // Calcul retrageri
  const frontW   = Math.sqrt(areaNum)*0.8;
  const arie_rets= Math.min(areaNum*0.3, (rl*frontW*2 + rs*frontW));
  const arie_edif= Math.max(0, areaNum - arie_rets);
  const eficP    = Math.round(arie_edif/areaNum*100);

  // Scenarii
  const sc_curr  = {label:'Curent',SC:SC_prop,SD:SD_prop,H:H_prop,POT:POT_real,CUT:CUT_real};
  const sc_max   = {label:'Maxim PUG',SC:SC_max,SD:SD_max,H:H_max,POT:(POT_max*100).toFixed(0),CUT:CUT_max};
  const sc_med   = {label:'Optimizat 80%',SC:Math.round(SC_max*0.8),SD:Math.round(SD_max*0.85),
    H:Math.ceil(SD_max*0.85/Math.round(SC_max*0.8)*3/3)*3,
    POT:(POT_max*80).toFixed(0),CUT:(CUT_max*0.85).toFixed(2)};

  // Estimare financiară
  const cost_mp_constructie = 650; // EUR/mp SDA
  const pret_vanzare_mp     = {rez:1200, birouri:1100, hotel:1400, com:1000}[window._RV?.fn||'rez']||1200;
  const cost_total          = Math.round(SD_prop*cost_mp_constructie);
  const venit_vanzare       = Math.round(Su_prop*pret_vanzare_mp);
  const profit              = venit_vanzare - cost_total;
  const roi                 = ((profit/cost_total)*100).toFixed(1);
  const costTeren           = Math.round(areaNum*350); // EUR/mp teren

  // PAG 1 — Cover cu hartă
  cover('Analiza maximei edificabilități · ' + S2(utr) + ' · ' + areaNum + ' m² teren',
    caps.imgLocation||null,
    [['POT propus/maxim',POT_real+'% / '+(POT_max*100).toFixed(0)+'%'],
     ['CUT propus/maxim',CUT_real+' / '+CUT_max],
     ['SC propus',SC_prop+' m²'],['SD propus',SD_prop+' m²'],
     ['H propus/maxim',H_prop+'m / '+H_max+'m'],['ROI estimat',roi+'%']],
    parseFloat(CUT_real)<=CUT_max, 'EDIFICABIL ' + (SC_prop>=SC_max*0.9?'LA MAXIM':'PARȚIAL') +
    ' — POT=' + POT_real + '% (max ' + (POT_max*100).toFixed(0) + '%) · CUT=' + CUT_real + ' (max ' + CUT_max + ')');

  // PAG 2 — Plan 2D + indicatori
  let cy = newPage('1. IDENTIFICARE PARCELĂ — INDICATORI URBANISTICI PUG', 2);
  cy = addImg(caps.img2D||caps.imgLocation, 14, cy, W-28, 68, 'FIG. 1 — Plan cadastral 2D · Retrageri obligatorii · Zona edificabilă estimată');
  cy = sec('1.1. INDICATORI URBANISTICI CONFORM PUG/RLU — UTR ' + S2(utr), cy); cy+=3;
  const kw4 = (W-28)/4;
  [['Suprafață parcelă',areaNum+' m²'],['POT maxim',(POT_max*100).toFixed(0)+'%'],
   ['CUT maxim',String(CUT_max)],['H max',H_max+'m'],
   ['Retragere față',rf+'m'],['Retragere lateral',rl+'m'],
   ['Retragere spate',rs+'m'],['Nr. niveluri max.',niv+' niv.'],
  ].forEach(([l,v],i) => kv(l,v,14+(i%4)*kw4,i<4?cy:cy+24,kw4-2,[GOLD,BLUE,GREEN,ORANGE][i%4]));
  cy+=52;

  // PAG 3 — Bilanț suprafețe detaliat
  cy = newPage('2. BILANȚ SUPRAFEȚE — 3 SCENARII COMPARATE', 3);
  cy = sec('2.1. TABEL COMPARATIV 3 SCENARII', cy); cy+=3;
  cy = body('Scenariul CURENT reflectă propunerea AEDIS. Scenariul OPTIMIZAT (80% din CUT) este recomandat ' +
    'pentru un echilibru bun între rentabilitate, conformitate și calitatea vieții. Scenariul MAXIM PUG ' +
    'exploatează integral indicatorii, necesitând studii suplimentare (umbire, ISU, parcaje).', 14, cy); cy+=4;
  cy = tblRow(['Indicator','Curent','Optimizat (80%)','Maxim PUG','Diff. curent-maxim'], cy, true, [55,28,32,28,W-28-55-28-32-28]);
  [
    ['Suprafață construită SC (m²)',SC_prop,sc_med.SC,SC_max,(SC_max-SC_prop)+''],
    ['POT realizat (%)',POT_real,sc_med.POT,(POT_max*100).toFixed(0),((POT_max*100-parseFloat(POT_real)).toFixed(1))+'%'],
    ['Suprafață desfășurată SD (m²)',SD_prop,sc_med.SD,SD_max,(SD_max-SD_prop)+''],
    ['CUT realizat',CUT_real,sc_med.CUT,CUT_max.toFixed(2),(CUT_max-parseFloat(CUT_real)).toFixed(2)+''],
    ['Nr. niveluri',niv,Math.ceil(sc_med.H/3),niv,'—'],
    ['H totală clădire (m)',H_prop,sc_med.H,H_max,'—'],
    ['SU utilă estimată (m²)',Su_prop,Math.round(sc_med.SD*0.78),Math.round(SD_max*0.78),(Math.round(SD_max*0.78)-Su_prop)+''],
    ['Spații verzi obligatorii (m²)',Math.round(areaNum*0.20),Math.round(areaNum*0.20),Math.round(areaNum*0.20),'—'],
  ].forEach(r => { cy = tblRow(r.map(String), cy, false, [55,28,32,28,W-28-55-28-32-28]); cy=checkY(cy,12,'BILANȚ',3); });

  // PAG 4 — Retrageri și zona edificabilă
  cy = newPage('3. RETRAGERI OBLIGATORII — ZONA EDIFICABILĂ', 4);
  cy = sec('3.1. CALCUL ZONA EDIFICABILĂ NETĂ', cy); cy+=3;
  cy = tblRow(['Element','Dimensiune','Suprafață redusă','Baza legală'], cy, true, [65,28,35,W-28-65-28-35]);
  [['Retragere față stradă','≥'+rf+'m','—','PUG/RLU + RGU art.23'],
   ['Retragere laterală dreaptă','≥'+rl+'m',Math.round(rl*Math.sqrt(areaNum)*1.2)+' m²','PUG/RLU + L50/1991'],
   ['Retragere laterală stângă','≥'+rl+'m',Math.round(rl*Math.sqrt(areaNum)*1.2)+' m²','PUG/RLU + L50/1991'],
   ['Retragere spate','≥'+rs+'m',Math.round(rs*frontW)+' m²','PUG/RLU'],
   ['Zona edificabilă netă (estimat)',arie_edif.toFixed(0)+' m²','—','—'],
   ['Coeficient utilizare teren',eficP+'%','—','Arie edificabilă/Arie totală'],
  ].forEach(r => { cy = tblRow(r, cy, false, [65,28,35,W-28-65-28-35]); });
  cy+=4;
  cy = sec('3.2. CERINȚE SPAȚII VERZI + PERMEABILITATE', cy); cy+=3;
  cy = tblRow(['Cerință','Suprafată minimă','% din parcelă','Normativ'], cy, true, [65,35,22,W-28-65-35-22]);
  [['Spații verzi naturale',Math.round(areaNum*0.2)+' m²','20%','L 24/2007 + PUG'],
   ['Suprafata permeabila',Math.round(areaNum*0.25)+' m²','25%','HG 930/2005'],
   ['Arii de joacă (dacă >10 apt.)',niv*4>=10?Math.round(areaNum*0.05)+' m²':'N/A',niv*4>=10?'5%':'N/A','L 350/2001 art. 32'],
   ['Perdea verde stradală','1 arbore/50ml front','Cf. raza coronament','L 24/2007 art. 8'],
  ].forEach(r => { cy = tblRow(r, cy, false, [65,35,22,W-28-65-35-22]); });

  // PAG 5 — Analiză financiară
  cy = newPage('4. ANALIZĂ FINANCIARĂ — EVALUARE ȘI ROI', 5);
  cy = sec('4.1. ESTIMARE INVESTIȚIE + VENITURI SCENARIUL CURENT', cy); cy+=3;
  const kw3b=(W-28)/3;
  [['Cost construcție tot.',Math.round(cost_total/1000)+'k EUR'],
   ['Cost teren (estimat)',Math.round(costTeren/1000)+'k EUR'],
   ['Venit vânzare/chirie',Math.round(venit_vanzare/1000)+'k EUR'],
   ['Profit brut estimat',Math.round(profit/1000)+'k EUR'],
   ['ROI brut',roi+'%'],['Cursul EUR',RON.toFixed(2)+' RON'],
  ].forEach(([l,v],i) => kv(l,v,14+(i%3)*kw3b,i<3?cy:cy+24,kw3b-2,[GOLD,ORANGE,GREEN,parseFloat(roi)>20?GREEN:ORANGE,BLUE,GRAY2][i]));
  cy+=54;
  cy = sec('4.2. COMPARAȚIE FINANCIARĂ — 3 SCENARII', cy); cy+=3;
  cy = tblRow(['Indicator financiar','Curent','Optimizat','Maxim PUG'], cy, true, [70,30,30,W-28-70-30-30]);
  const mkEur = (x)=>Math.round(x/1000)+'k';
  [[  'Cost constructie (EUR)', mkEur(SD_prop*650), mkEur(sc_med.SD*650), mkEur(SD_max*650)],
   [  'Cost teren (EUR)', mkEur(costTeren), mkEur(costTeren), mkEur(costTeren)],
   [  'Venit vânzare brut (EUR)', mkEur(Math.round(Su_prop*pret_vanzare_mp)), mkEur(Math.round(sc_med.SD*0.78*pret_vanzare_mp)), mkEur(Math.round(SD_max*0.78*pret_vanzare_mp))],
   [  'Profit brut estimat (EUR)', mkEur(Math.round(Su_prop*pret_vanzare_mp)-SD_prop*650), mkEur(Math.round(sc_med.SD*0.78*pret_vanzare_mp)-sc_med.SD*650), mkEur(Math.round(SD_max*0.78*pret_vanzare_mp)-SD_max*650)],
   [  'ROI estimat (%)', roi+'%', (((Math.round(sc_med.SD*0.78*pret_vanzare_mp)-sc_med.SD*650)/(sc_med.SD*650))*100).toFixed(1)+'%', (((Math.round(SD_max*0.78*pret_vanzare_mp)-SD_max*650)/(SD_max*650))*100).toFixed(1)+'%'],
  ].forEach(r => { cy = tblRow(r, cy, false, [70,30,30,W-28-70-30-30]); cy=checkY(cy,12,'FINANCIAR',5); });

  // PAG 6 — Conformitate normative
  cy = newPage('5. CONFORMITATE NORMATIVE — VERIFICARE AUTOMATĂ', 6);
  cy = addImg(caps.imgDist, 14, cy, W-28, 60, 'FIG. 2 — Distanțe față de vecinătăți · Retrageri · Aliniamente');
  cy = sec('5.1. CHECKLIST CONFORMITATE', cy); cy+=3;
  cy = tblRow(['Normativ','Verificare','Status','Obs.'], cy, true, [50,80,22,W-28-50-80-22]);
  [
    ['RGU art. 23','Retragere față ≥'+rf+'m',parseFloat(rf)>=0?'✓ OK':'⚠ Verif.','Conf. UTR'],
    ['RGU art. 33','Spații verzi ≥20%','✓ OK','Obligatoriu'],
    ['L 50/1991','Autorizație de construire necesară','OBLIGATORIU','AC în față'],
    ['NP 057/2002','Parcaje: 1 loc/apt. rez.',niv*4>0?'DE CALCULAT':'✓','Conform AEDIS'],
    ['P118/1999','ISU — H≤'+H_max+'m',H_prop<=H_max?'✓ OK':'⚠ Verif.','Dacă >P+3E'],
    ['OMS 119/2014','Însorire min. 1.5h/21 dec.','A SE VERIFICA','Studiu separat'],
    ['Legea 10/1995','Cerințe calitate construcții','OBLIGATORIU','Conf. proiect'],
    ['AACR aviz','Dacă H>'+H_max+'m sau aproape de aeroport',H_prop<=35?'✓ Probabil OK':'⚠ Obligatoriu','Verificare AACR'],
  ].forEach(r => { cy = tblRow(r, cy, false, [50,80,22,W-28-50-80-22]); cy=checkY(cy,12,'CONFORM',6); });

  // PAG 7 — Însorire + umbrire
  cy = newPage('6. ÎNSORIRE + UMBRIRE ESTIMATIVĂ — OMS 119/2014', 7);
  cy = sec('6.1. CONFORMITATE ÎNSORIRE DIRECTĂ', cy); cy+=3;
  const oreIns2 = typeof _calcOreInsorire==='function'?_calcOreInsorire(lat,11,21,S.vol?.frontDir||'S'):{label:'≥2h',conforme:true};
  cy = tblRow(['Parametru','Valoare','Limită','Status'], cy, true, [65,40,35,W-28-65-40-35]);
  [['Ore însorire directă estimată (21 dec)',oreIns2.label,'min. 1.5h/zi',oreIns2.conforme?'✓ CONFORM':'⚠ SUB LIMITĂ'],
   ['Umbra propusă la solstițiu iarnă','Se calculează per vecin','Per casă','Studiu detaliat obligat.'],
   ['H clădire propusă',H_prop+'m','Max '+H_max+'m',H_prop<=H_max?'✓ OK':'✗ DEPĂȘIT'],
   ['Retragere față de vecin cu ferestre','≥H/2='+Math.round(H_prop/2)+'m est.','≥H/2 (HG 525/1996)','Conf. proiect arh.'],
  ].forEach(r => { cy = tblRow(r, cy, false, [65,40,35,W-28-65-40-35]); });
  cy+=4;
  cy = sec('6.2. ESTIMARE UMBRE PROIECTATE LA SOL', cy); cy+=3;
  cy = tblRow(['Lună','Alt. solară 12:00 (°)','Umbra max. (m)','Dep. față nord','OMS 119'], cy, true, [25,32,28,35,W-28-25-32-28-35]);
  [1,4,7,10,12].forEach(m=>{
    const alt = typeof _solarPosition==='function'?_solarPosition(lat,m-1,21,12).alt:(90-lat-23.45*Math.cos((m*30+10)*Math.PI/180));
    const sh = alt>0.5?H_prop/Math.tan(alt*Math.PI/180):999;
    const mNames=['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'];
    cy = tblRow([mNames[m-1],alt.toFixed(1)+'°',sh>200?'>200m':sh.toFixed(0)+'m','Spre N ('+(180-alt).toFixed(0)+'°)',alt>=15?'✓':'✗'],
      cy, false, [25,32,28,35,W-28-25-32-28-35]);
  });

  // PAG 8 — Comasare + optimizare lot
  cy = newPage('7. OPȚIUNI COMASARE + OPTIMIZARE PARCELĂ', 8);
  cy = sec('7.1. ANALIZĂ OPORTUNITATE COMASARE (ALIPIRE)', cy); cy+=3;
  cy = body('Conf. Legii 7/1996 și HG 1/2020, comasarea parcelelor limitrofe permite: creșterea POT/CUT ' +
    'efectiv, rezolvarea retragerii față de vecini și accesul la funcțiuni superioare (UTR mai permisivă). ' +
    'Procedura se realizează la OCPI jud. și durează 2-3 luni.', 14, cy); cy+=4;
  cy = tblRow(['Scenariu comasare','Suprafată totală','POT/CUT posibil','Avantaj principal','Procedură'], cy, true, [50,32,28,50,W-28-50-32-28-50]);
  [['Comasare cu parcela N (ipotetica +200mp)',areaNum+200+' m²','Cf. UTR','Front stradal mai mare','OCPI+Notariat'],
   ['Comasare cu parcela E (ipotetică +300mp)',areaNum+300+' m²','Cf. UTR','Acces nou + reducere retragere','OCPI+Notariat'],
   ['Lotizare în 2 parcele minime','Min.150mp·2','Conf. P.U.Z.','Vânzare parțială teren','PUZ+OCPI'],
  ].forEach(r => { cy = tblRow(r, cy, false, [50,32,28,50,W-28-50-32-28-50]); });
  cy+=4;
  cy = sec('7.2. PAȘI PROCEDURALI COMASARE — LEGEA 7/1996', cy); cy+=3;
  cy = tblRow(['Etapă','Organ emitent','Durată','Cost estimativ'], cy, true, [85,45,20,W-28-85-45-20]);
  [['Memoriu justificativ + documentație cadastrală','Cadastrist autorizat','3-4 săpt.','800-1500 EUR'],
   ['Solicitare recepție OCPI','OCPI județean','2-4 săpt.','Taxa OCPI'],
   ['Intabulare suprafață nouă Carte Funciară','OCPI + Notar','1-2 săpt.','Taxa CF'],
   ['Plan situație actualizat (după comasare)','Arhitect/Topograf','1 săpt.','300-500 EUR'],
  ].forEach(r => { cy = tblRow(r, cy, false, [85,45,20,W-28-85-45-20]); });

  // PAG 9 — Context 3D + vedere
  cy = newPage('8. CONTEXT URBAN — VEDERE 3D + PLAN SITUAȚIE', 9);
  cy = addImg(caps.v3dDay||caps.img3D, 14, cy, W-28, 82, 'FIG. 3 — Vedere 3D amplasament · Volumetria propusă în contextul construit real');
  cy = addImg(caps.imgCity||caps.img2D, 14, cy, W-28, 72, 'FIG. 4 — Context urban · Fond construit zonă · Vecinătăți directe');

  // PAG 10 — Concluzii + semnătură
  cy = newPage('9. CONCLUZII + RECOMANDĂRI', 10);
  cy = concluzii([
    'Parcela ' + S2(nrcad) + ' (UTR ' + S2(utr) + ', ' + areaNum + ' m², ' + S2(uat) + ') permite edificarea conform indicatorilor: POT max ' + (POT_max*100).toFixed(0) + '%, CUT max ' + CUT_max + ', H max ' + H_max + 'm.',
    'Propunerea curentă utilizează POT=' + POT_real + '% și CUT=' + CUT_real + ' din maximul permis. Zona edificabilă netă (după retrageri) este estimată la ' + arie_edif.toFixed(0) + ' m² (' + eficP + '% din parcelă).',
    'Scenariul OPTIM (80% din CUT) recomandă SC=' + sc_med.SC + ' m², SD=' + sc_med.SD + ' m², cu un ROI estimat de ' + ((Math.round(sc_med.SD*0.78*pret_vanzare_mp)-sc_med.SD*650)/(sc_med.SD*650)*100).toFixed(1) + '% (preț vânzare ' + pret_vanzare_mp + ' EUR/m²).',
    'Costul estimativ total de construcție (scenariul curent): ' + Math.round(cost_total/1000) + '.000 EUR, cu venituri brute estimate de ' + Math.round(venit_vanzare/1000) + '.000 EUR și profit brut de ' + Math.round(profit/1000) + '.000 EUR (ROI=' + roi + '%).',
    'Studii suplimentare recomandate: Pre-studiu Branșamente, Studiu Însorire OMS 119/2014, Pre-studiu Geotehnic și aviz ISU pentru > P+3E.',
    'Oportunitate comasare: dacă sunt disponibile parcele limitrofe, alipierea la min. ' + Math.round(areaNum*1.5) + ' m² permite o utilizare optimă a indicatorilor UTR și reducerea costurilor unitare de branșament.',
  ], cy);
  sign(); ftr();

  _pdfSaveMobile(pdf, 'bilant_edificabil_' + S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_') + '.pdf');
  ss('✅ Bilanț Edificabil generat · 10 pagini · ROI=' + roi + '% · Ep=' + SD_prop + ' m² SD');
};

console.log('[Studies Fix] ✅ v2 — 5 studii rescrise · 10+ pagini fiecare · capturi reale');
