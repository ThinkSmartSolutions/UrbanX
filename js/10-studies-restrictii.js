// ═══════════════════════════════════════════════════════════════════════════
// 10-studies-restrictii.js — Studiu de Restricții de Construire & Zone de Risc
// Tratează restricțiile aplicabile parcelei conform legislației RO + UE:
// seismic, inundații, alunecări/stabilitate, zonă costieră, arii naturale/Delta,
// zone de protecție speciale (baraje, mine, saline, porturi).
// Date live: cotă teren (DEM), declivitate (DEM), seismicitate (P100), hidrografie.
// Urmează tiparul comun (_initStudyPdf) + InfoDrawer. break-after:avoid din helpers.
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  function _cfgApa() {
    try {
      var id = (window.S_UAT && (S_UAT.id || S_UAT.config?.id)) || '';
      return (typeof _APA_ROMANA_CFG !== 'undefined' && _APA_ROMANA_CFG[id]) || {};
    } catch (e) { return {}; }
  }

  // Detectează profilul de risc al amplasamentului din datele disponibile
  function _detectRisc(lat, lon, judet, seism, apa, cote, elev, mediu, vant) {
    var R = {};
    var j = (judet || '').toLowerCase();
    var ag = parseFloat(seism.ag || 0);
    R.seismic = { da: true, nivel: ag >= 0.30 ? 'RIDICAT' : ag >= 0.20 ? 'MEDIU-RIDICAT' : ag >= 0.15 ? 'MEDIU' : 'SCĂZUT', val: ag };
    var ri = (apa.risc_inundabil || '').toLowerCase();
    R.inundatii = { da: /mediu|ridicat|mare|posibil|q100|lunc/.test(ri) || (cote && cote.min != null && cote.min < 10),
                    nivel: /ridicat|mare/.test(ri) ? 'RIDICAT' : /mediu/.test(ri) ? 'MEDIU' : 'SCĂZUT',
                    dist: apa.distanta_curs_principal };
    var panta = cote && cote.panta != null ? cote.panta : null;
    R.alunecari = { da: panta != null && panta >= 5, nivel: panta == null ? 'NEDETERMINAT' : panta >= 15 ? 'RIDICAT' : panta >= 8 ? 'MEDIU' : panta >= 5 ? 'SCĂZUT-MEDIU' : 'SCĂZUT', panta: panta };
    var costier = /constan[țt]a|tulcea/.test(j) || (vant && /litoral|mare/i.test(vant.directie_dominanta || '')) || (vant && vant.zona === 'I') || (elev != null && elev < 15 && lon > 28.4);
    R.costier = { da: !!costier };
    var areaP = (mediu && mediu.arie_protejata_apropiere) || apa.arie_naturala || '';
    R.delta = { da: /delta|tulcea|rbdd|biosfer/i.test(areaP) || /tulcea/.test(j), arie: areaP };
    R.arii = { da: /ROSCI|ROSPA|Natura ?2000|rezerva|parc na[țt]ional|sit/i.test(areaP), arie: areaP };
    // Proximitate aeroport (servitute aeronautica) — distanta la cel mai apropiat aeroport major RO
    var AERO = [['Otopeni (OTP)',44.571,26.085],['Bucuresti-Baneasa',44.503,26.102],['Cluj-Napoca',46.785,23.686],['Timisoara',45.810,21.337],['Iasi',47.178,27.621],['Constanta (Kogalniceanu)',44.362,28.488],['Sibiu',45.785,24.091],['Bacau',46.522,26.911],['Craiova',44.318,23.889],['Suceava',47.687,26.354],['Oradea',47.025,21.925],['Targu Mures',46.467,24.412],['Arad',46.176,21.262],['Brasov-Ghimbav',45.704,25.526],['Tulcea',45.062,28.714],['Satu Mare',47.703,22.886],['Baia Mare',47.658,23.470]];
    function _hav(la1,lo1,la2,lo2){var R0=6371,dLa=(la2-la1)*Math.PI/180,dLo=(lo2-lo1)*Math.PI/180,a=Math.sin(dLa/2)*Math.sin(dLa/2)+Math.cos(la1*Math.PI/180)*Math.cos(la2*Math.PI/180)*Math.sin(dLo/2)*Math.sin(dLo/2);return R0*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
    var aMin = null, aName = '';
    if (lat && lon) AERO.forEach(function(a){ var d=_hav(lat,lon,a[1],a[2]); if(aMin==null||d<aMin){aMin=d;aName=a[0];} });
    R.aeroport = { da: aMin != null && aMin < 15, dist: aMin != null ? Math.round(aMin*10)/10 : null, nume: aName };
    // Port / zona maritima — orase portuare
    R.port = { da: /constan[țt]a|mangalia|galat|braila|tulcea|sulina|midia|agigea/.test(j) || (R.costier.da) };
    // Militar / Seveso — nu exista set public; mereu "verificare obligatorie"
    R.militar = { da: 'verificare' };
    R.seveso = { da: 'verificare' };
    return R;
  }

  async function generateStudiuRestrictii() {
    var ap = (window.S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]);
    if (!ap || !ap.geo || !ap.geo.geometry) { (window.ss || console.log)('Selectați o parcelă pentru studiu.'); return; }
    (window.ss || console.log)('Se generează Studiul de Restricții & Zone de Risc...');

    var d = _initStudyPdf('Studiu de Restrictii de Construire si Zone de Risc',
      'Risc seismic - inundatii - alunecari - costier/maritim/portuar - aeronautic - militar - Seveso', 12);
    var pdf = d.pdf, W = d.W, H = d.H, S2 = d.S2, hdr = d.hdr, ftr = d.ftr, sec = d.sec, subsec = d.subsec,
      body = d.body, tblRow = d.tblRow, kv = d.kv, nrcad = d.nrcad, utr = d.utr, area = d.area,
      lat = d.lat, lon = d.lon, uat = d.uat, judet = d.judet, dateStr = d.dateStr;
    var DARK = d.DARK || [8, 21, 42], GOLD = d.GOLD || [212, 175, 55], LIGHT = d.LIGHT || [248, 250, 253],
      GOLD2 = d.GOLD2 || [240, 210, 120], RED = d.RED || [220, 60, 60], GREEN = d.GREEN || [34, 160, 90];

    var seism = (typeof getSeismConfig === 'function') ? getSeismConfig() : { ag: 0.20, Tc: 1.0, zona: 'E', MSK: 'VII', norm: 'P100-1/2013' };
    var hidro = (typeof getHidroConfig === 'function') ? getHidroConfig() : {};
    var mediu = (typeof getMediuConfig === 'function') ? getMediuConfig() : {};
    var vant = (typeof getVantConfig === 'function') ? getVantConfig() : {};
    var apa = _cfgApa();

    var elev = null, cote = null;
    try { (window.ss || function () { })('Restrictii — obtin cota teren (DEM)...'); var ed = await _getElevation(lat, lon); elev = ed && ed.elev; } catch (e) { }
    try { if (window._CoteNivel) cote = await window._CoteNivel.analyze(ap.geo, nrcad); } catch (e) { }

    var R = _detectRisc(lat, lon, judet, seism, apa, cote, elev, mediu, vant);
    var caps = {}; try { if (typeof _captureStudyMapsSafe === 'function') caps = await _captureStudyMapsSafe(ap, function (m) { (window.ss || function () { })(m); }); } catch (e) { }

    // ── PAG 1: COVER ──────────────────────────────────────────────────────
    pdf.setFillColor.apply(pdf, DARK); pdf.rect(0, 0, W, H, 'F');
    pdf.setFillColor(10, 25, 55); pdf.rect(0, 3, W, H - 6, 'F');
    pdf.setFillColor.apply(pdf, GOLD); pdf.rect(0, 0, W, 3, 'F'); pdf.rect(0, H - 3, W, 3, 'F');
    pdf.setTextColor.apply(pdf, GOLD); pdf.setFontSize(9); pdf.setFont('helvetica', 'bold');
    pdf.text('URBANX - PLATFORMA NATIONALA DE ANALIZA URBANISTICA', W / 2, 46, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(20);
    pdf.text('STUDIU DE RESTRICTII DE CONSTRUIRE', W / 2, 66, { align: 'center' });
    pdf.text('SI ZONE DE RISC', W / 2, 80, { align: 'center' });
    pdf.setTextColor.apply(pdf, GOLD); pdf.setFontSize(8.5);
    pdf.text('Risc seismic - Inundatii - Alunecari de teren - Zona costiera - Arii protejate', W / 2, 92, { align: 'center' });
    pdf.setFillColor(20, 35, 70); pdf.rect(20, 104, W - 40, 86, 'F'); pdf.setFillColor.apply(pdf, GOLD); pdf.rect(20, 104, 3, 86, 'F');
    [['Nr. cadastral:', nrcad], ['UTR:', utr], ['Suprafata:', area + ' mp'],
    ['UAT:', uat + (judet ? ' / ' + judet : '')],
    ['Cota teren (AMSL):', elev != null ? Math.round(elev) + ' m' : 'verificare'],
    ['Declivitate:', cote ? cote.dH + ' m (' + cote.panta + '%)' : 'verificare'],
    ['Zona seismica:', (seism.zona || '-') + ' (ag=' + seism.ag + 'g, Tc=' + seism.Tc + 's)'],
    ['Risc inundatii:', R.inundatii.nivel], ['Risc alunecari:', R.alunecari.nivel]
    ].forEach(function (row, i) {
      pdf.setTextColor(150, 170, 200); pdf.setFontSize(8); pdf.setFont('helvetica', 'normal'); pdf.text(S2(row[0]), 26, 114 + i * 8.5);
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(9); pdf.setFont('helvetica', 'bold'); pdf.text(S2(String(row[1])), 95, 114 + i * 8.5);
    });
    if (caps.imgLocation) { try { pdf.addImage(caps.imgLocation, 'JPEG', 14, H - 70, W - 28, 56, undefined, 'FAST'); pdf.setDrawColor.apply(pdf, GOLD); pdf.rect(14, H - 70, W - 28, 56, 'S'); } catch (e) { } }
    ftr();

    _pdfTableOfContents && _pdfTableOfContents(pdf, W, H, [
      { num: 1, title: 'Profilul de risc al amplasamentului', page: 2 },
      { num: 2, title: 'Risc seismic (P100-1/2013)', page: 3 },
      { num: 3, title: 'Risc de inundatii (Legea 107/1996, Dir. 2007/60/CE)', page: 4 },
      { num: 4, title: 'Stabilitatea terenului si alunecari (HG 447/2003)', page: 5 },
      { num: 5, title: 'Zona costiera / arii protejate / restrictii speciale', page: 6 },
      { num: '5bis', title: 'Servituti aeronautice, militare, maritime, Seveso', page: 7 },
      { num: 6, title: 'Sinteza restrictii, avize necesare, recomandari', page: 8 },
      { num: 'ESG', title: 'ESG Urban Sustainability Rating', page: 'ult.' }
    ], 'Studiu de Restrictii de Construire si Zone de Risc');

    function page(title) { pdf.addPage(); pdf.setFillColor.apply(pdf, LIGHT); pdf.rect(0, 0, W, H, 'F'); hdr(title); ftr(); return 33; }

    // ── 1. PROFIL DE RISC ──────────────────────────────────────────────────
    var cy = page('1. PROFILUL DE RISC AL AMPLASAMENTULUI');
    cy = sec('1.1 Sinteza factorilor de risc identificati', cy);
    cy = body('Prezentul studiu analizeaza restrictiile de construire aplicabile parcelei conform legislatiei nationale si europene in vigoare. Identificarea riscurilor se bazeaza pe date geospatiale (model digital al terenului), zonarea seismica nationala P100-1/2013, datele hidrografice ale Administratiei Bazinale de Apa competente si incadrarea in arii cu regim special de protectie. Studiul are caracter preliminar si nu inlocuieste studiile de specialitate certificate (geotehnic, hidrologic, expertiza seismica) cerute pentru autorizare.', 14, cy); cy += 2;
    cy = tblRow(['Factor de risc', 'Nivel estimat', 'Sursa / temei', 'Act normativ'], cy, true, [42, 32, 56, 52]);
    [['Seismic', R.seismic.nivel, 'Zonare ag=' + seism.ag + 'g, Tc=' + seism.Tc + 's', 'P100-1/2013'],
    ['Inundatii', R.inundatii.nivel, apa.risc_inundabil || 'Verificare ABA', 'Legea 107/1996; Dir. 2007/60/CE'],
    ['Alunecari teren', R.alunecari.nivel, cote ? 'Panta ' + cote.panta + '% (DEM)' : 'Verificare geotehnica', 'HG 447/2003; Legea 575/2001'],
    ['Zona costiera', R.costier.da ? 'APLICABIL' : 'Neaplicabil', R.costier.da ? 'Amplasament litoral' : '-', 'OUG 202/2002'],
    ['Arii protejate', R.arii.da || R.delta.da ? 'POSIBIL' : 'Neaplicabil', R.arii.arie || R.delta.arie || '-', 'OUG 57/2007; Dir. 92/43/CEE'],
    ['Servitute aeronautica', R.aeroport.da ? 'APLICABIL' : 'Verificare', R.aeroport.dist != null ? (R.aeroport.dist + ' km de ' + R.aeroport.nume) : '-', 'HG 930/2016; RACR-CTA'],
    ['Zona costiera / maritima', R.costier.da ? 'APLICABIL' : 'Neaplicabil', R.costier.da ? 'Litoral / proximitate mare' : '-', 'OUG 202/2002'],
    ['Zona portuara', R.port.da ? 'POSIBIL' : 'Neaplicabil', R.port.da ? 'Oras portuar / maritim' : '-', 'Aviz administratie portuara'],
    ['Obiective militare', 'VERIFICARE', 'Servituti MApN (CU)', 'Aviz MApN'],
    ['Risc tehnologic (Seveso)', 'VERIFICARE', 'Registru APM/MMAP', 'Legea 59/2016 (Seveso III)'],
    ].forEach(function (r) { cy = tblRow(r, cy, false, [42, 32, 56, 52]); });
    cy += 3;
    cy = body('NOTA: Nivelurile sunt estimate orientativ. Pentru fiecare factor cu nivel MEDIU sau RIDICAT este obligatorie verificarea pe sursele oficiale si obtinerea avizelor/studiilor de specialitate indicate in capitolele urmatoare.', 14, cy);

    // ── 2. SEISMIC ─────────────────────────────────────────────────────────
    cy = page('2. RISC SEISMIC');
    cy = sec('2.1 Incadrare seismica a amplasamentului', cy);
    cy = body('Romania este expusa unui risc seismic semnificativ, generat preponderent de sursa subcrustala Vrancea. Proiectarea antiseismica este obligatorie conform codului P100-1/2013, pe baza acceleratiei terenului ag si a perioadei de control (colt) Tc specifice amplasamentului.', 14, cy); cy += 2;
    cy = tblRow(['Parametru', 'Valoare', 'Semnificatie'], cy, true, [52, 40, 90]);
    [['Acceleratie de varf ag', seism.ag + ' g', R.seismic.nivel + ' — interval mediu de recurenta 225 ani'],
    ['Perioada de control Tc', seism.Tc + ' s', 'Caracter al miscarii seismice (continut de frecvente)'],
    ['Zona seismica', seism.zona || '-', 'Conform hartilor de zonare P100-1/2013'],
    ['Intensitate (MSK)', seism.MSK || '-', 'Scara macroseismica'],
    ['Clasa de importanta', 'II-III (uzual)', 'Factor de importanta gamaI conform destinatie'],
    ].forEach(function (r) { cy = tblRow(r, cy, false, [52, 40, 90]); });
    cy += 3;
    cy = sec('2.2 Cerinte de proiectare', cy);
    cy = body('Pentru ag=' + seism.ag + 'g se impun: dimensionarea structurii la actiunea seismica conform P100-1/2013, detalii de armare ductila, verificarea deplasarilor relative de nivel (drift). Pentru cladiri existente vizate de interventii se aplica P100-3/2019 (evaluare) si, dupa caz, expertiza tehnica si consolidare. Expertiza tehnica este obligatorie pentru constructii peste P+3 sau pentru orice interventie la structuri existente.', 14, cy); cy += 1;
    cy = body('Surse: Cod P100-1/2013 (proiectare seismica); P100-3/2019 (evaluare existente); CR 0/2012 (bazele proiectarii); harti de zonare INCERC/MDLPA.', 14, cy, undefined, 7);

    // ── 3. INUNDATII ───────────────────────────────────────────────────────
    cy = page('3. RISC DE INUNDATII');
    cy = sec('3.1 Hidrografie si expunere la inundatii', cy);
    cy = body('Evaluarea riscului de inundatii are in vedere proximitatea cursurilor de apa, cotele terenului si hartile de hazard si risc la inundatii elaborate conform Directivei 2007/60/CE (transpusa prin Legea 107/1996 a apelor, cu modificari). Amplasamentele in zone inundabile (debit cu probabilitate Q1%, Q0.1%) sunt supuse restrictiilor de construire si necesita avizul Administratiei Bazinale de Apa.', 14, cy); cy += 2;
    cy = tblRow(['Element', 'Valoare', 'Observatie / temei legal'], cy, true, [48, 44, 90]);
    [['Bazin hidrografic', apa.bazin || 'Verificare ABA', apa.DA || 'Administratia Bazinala de Apa competenta'],
    ['Curs de apa principal', (apa.cursuri && apa.cursuri[0]) || 'Verificare', 'Distanta: ' + (apa.distanta_curs_principal != null ? apa.distanta_curs_principal + ' m' : 'n/a')],
    ['Risc inundabilitate', apa.risc_inundabil || R.inundatii.nivel, 'Harta MMAP mapgis.rowater.ro'],
    ['Zona inundabila', apa.zona_inundabila || 'Verificare harti hazard', 'Dir. 2007/60/CE — Q100/Q1000'],
    ['Cota teren (AMSL)', elev != null ? Math.round(elev) + ' m' : 'verificare', 'Model digital teren'],
    ['Aviz de gospodarire ape', R.inundatii.da ? 'PROBABIL NECESAR' : 'Dupa caz', 'Legea 107/1996; Ord. 1.464/2018'],
    ].forEach(function (r) { cy = tblRow(r, cy, false, [48, 44, 90]); });
    cy += 3;
    cy = body('Restrictii tipice in zone inundabile: interdictie de construire in albia majora / zona de protectie a cursului de apa; obligativitatea cotei pardoselii parterului peste nivelul apelor de calcul; solutii de aparare/atenuare; aviz de gospodarire a apelor. Verificare obligatorie pe mapgis.rowater.ro si la ' + (apa.DA || 'ABA competenta') + '.', 14, cy);
    cy = body('Surse: Legea 107/1996 (legea apelor); Directiva 2007/60/CE (evaluarea si gestionarea riscului la inundatii); Planurile de Management al Riscului la Inundatii (PMRI); MMAP/ANAR harti hazard.', 14, cy, undefined, 7);

    // ── 4. ALUNECARI / STABILITATE ─────────────────────────────────────────
    cy = page('4. STABILITATEA TERENULUI SI ALUNECARI DE TEREN');
    cy = sec('4.1 Susceptibilitate la alunecari', cy);
    cy = body('Susceptibilitatea la alunecari de teren se evalueaza pe baza pantei terenului, naturii litologice, conditiilor hidrogeologice si a hartilor de hazard. Zonarea riscului la alunecari este reglementata prin HG 447/2003 (norme metodologice) si Legea 575/2001 (PATN — Sectiunea V, zone de risc natural).', 14, cy); cy += 2;
    cy = tblRow(['Parametru', 'Valoare', 'Interpretare'], cy, true, [50, 38, 94]);
    [['Declivitate (panta) teren', cote ? cote.panta + ' %' : 'verificare', R.alunecari.nivel + ' susceptibilitate (estimare DEM)'],
    ['Diferenta de nivel dH', cote ? cote.dH + ' m' : 'verificare', cote ? cote.nivel : '-'],
    ['Tip teren estimat', hidro.tip_sol || 'Verificare geotehnica', 'Influenteaza stabilitatea taluzurilor'],
    ['Nivel freatic (NFA)', hidro.nfa || 'Verificare', 'Apa subterana — factor declansator'],
    ].forEach(function (r) { cy = tblRow(r, cy, false, [50, 38, 94]); });
    cy += 3;
    cy = body('Pentru pante mari (>15%), terenuri argiloase sau cu nivel freatic ridicat se impune studiu geotehnic cu analiza de stabilitate a taluzurilor (metode Fellenius/Bishop) si, dupa caz, lucrari de consolidare/drenaj. Coeficientul de siguranta minim Fs >= 1.5 (conditii statice) conform NP 074/2014.', 14, cy);
    cy = body('Surse: HG 447/2003 (zonare risc alunecari); Legea 575/2001 (PATN risc natural); NP 074/2014 (studii geotehnice); GT 019/98 (stabilitate versanti).', 14, cy, undefined, 7);

    // ── 5. COSTIER / ARII PROTEJATE / SPECIAL ──────────────────────────────
    cy = page('5. ZONA COSTIERA, ARII PROTEJATE SI RESTRICTII SPECIALE');
    if (R.costier.da) {
      cy = sec('5.1 Zona costiera (litoral Marea Neagra)', cy);
      cy = body('Amplasamentul se incadreaza in zona costiera, supusa regimului special instituit prin OUG 202/2002 privind gospodarirea integrata a zonei costiere. Se aplica servitutea de trecere si interdictii de construire in zona de protectie a plajei si a falezei, precum si avize specifice (ABADL — Administratia Bazinala de Apa Dobrogea-Litoral).', 14, cy); cy += 1;
      cy = tblRow(['Restrictie costiera', 'Regim', 'Temei'], cy, true, [56, 36, 90]);
      [['Servitute de trecere litoral', 'Zona de protectie', 'OUG 202/2002 art. 6-8'],
      ['Interdictie constructii pe plaja/faleza', 'Interdictie', 'OUG 202/2002; HG 749/2004'],
      ['Aviz gospodarire ape ABADL', 'Obligatoriu', 'Legea 107/1996'],
      ['Eroziune costiera', 'Verificare', 'Studii ABADL / proiecte protectie litorala'],
      ].forEach(function (r) { cy = tblRow(r, cy, false, [56, 36, 90]); }); cy += 3;
    }
    if (R.delta.da || R.arii.da) {
      cy = sec('5.2 Arii naturale protejate', cy);
      cy = body('Amplasamentul se afla in proximitatea / interiorul unei arii naturale protejate (' + (R.delta.arie || R.arii.arie || 'verificare') + '). Construirea este conditionata de regimul ariei (OUG 57/2007) si, pentru siturile Natura 2000, de evaluarea adecvata (Directiva Habitate 92/43/CEE si Directiva Pasari 2009/147/CE). Pentru Delta Dunarii se aplica regimul Rezervatiei Biosferei (Legea 82/1993, administratie ARBDD).', 14, cy); cy += 1;
      cy = tblRow(['Element', 'Regim', 'Temei'], cy, true, [50, 42, 90]);
      [['Arie / sit', (R.delta.arie || R.arii.arie || '-').slice(0, 40), R.delta.da ? 'Rezervatia Biosferei Delta Dunarii' : 'Natura 2000 / arie protejata'],
      ['Evaluare adecvata (EA)', 'Posibil obligatorie', 'OUG 57/2007; Ord. 19/2010'],
      ['Aviz custode / administrator arie', 'Obligatoriu in arie', 'OUG 57/2007'],
      ].forEach(function (r) { cy = tblRow(r, cy, false, [50, 42, 90]); }); cy += 3;
    }
    cy = sec('5.3 Zone de protectie / servituti speciale (verificare)', cy);
    cy = body('In functie de specificul UAT, se verifica si urmatoarele zone cu regim special, daca sunt incidente amplasamentului: zone de protectie ale barajelor si acumularilor (servituti hidrotehnice), perimetre de exploatare miniera / saline (Legea minelor 85/2003 — zone de protectie si avize ANRM), zone portuare si de cale navigabila (servituti, aviz administratia portuara), zone de protectie ale infrastructurii energetice si de transport. Incidenta acestora se confirma prin Certificatul de Urbanism si avizele detinatorilor de retele/obiective.', 14, cy); cy += 1;
    cy = tblRow(['Obiectiv special', 'Restrictie tipica', 'Temei / aviz'], cy, true, [44, 50, 88]);
    [['Baraje / acumulari', 'Zona de protectie, interdictii', 'Servituti hidrotehnice; aviz ABA/Hidroelectrica'],
    ['Exploatari miniere / saline', 'Perimetru protectie, subsidenta', 'Legea 85/2003; aviz ANRM'],
    ['Zone portuare / navigabile', 'Servituti, regim special', 'Aviz administratie portuara / AFDJ'],
    ['Infrastructura energetica', 'Culoare de protectie LEA/conducte', 'Legea 123/2012; avize operatori'],
    ].forEach(function (r) { cy = tblRow(r, cy, false, [44, 50, 88]); });

    // ── 5bis. SERVITUTI SPECIALE: AEROPORT, MILITAR, MARITIM/PORTUAR, SEVESO ──
    cy = page('5bis. SERVITUTI AERONAUTICE, MILITARE, MARITIME SI TEHNOLOGICE');
    cy = sec('5.4 Servitute aeronautica (proximitate aeroport)', cy);
    cy = body('Cel mai apropiat aeroport este ' + R.aeroport.nume + ', la cca. ' + (R.aeroport.dist != null ? R.aeroport.dist + ' km' : 'distanta necunoscuta') + '. ' + (R.aeroport.da ? 'Amplasamentul se afla in zona de servitute aeronautica: se aplica suprafetele de limitare a obstacolelor (OLS) si restrictii de inaltime conform RACR-CTA si HG 930/2016. Inaltimea constructiilor si macaralelor de santier necesita avizul AACR (Autoritatea Aeronautica Civila Romana).' : 'Amplasamentul nu pare a fi in zona de servitute aeronautica directa; pentru constructii inalte (>45 m) sau macarale, se verifica oricum cerintele AACR.'), 14, cy); cy += 1;
    cy = tblRow(['Element', 'Cerinta', 'Temei / aviz'], cy, true, [50, 50, 82]);
    [['Suprafete de limitare obstacole (OLS)', R.aeroport.da ? 'Aplicabile' : 'Verificare', 'RACR-CTA; ICAO Anexa 14'],
    ['Inaltime maxima admisa', R.aeroport.da ? 'Limitata (functie de distanta/cota)' : 'Conform RACR', 'HG 930/2016'],
    ['Aviz AACR', R.aeroport.da ? 'OBLIGATORIU' : 'La H>45m sau macarale', 'AACR'],
    ].forEach(function (r) { cy = tblRow(r, cy, false, [50, 50, 82]); }); cy += 3;
    cy = sec('5.5 Obiective militare si servituti MApN', cy);
    cy = body('Zonele de protectie ale obiectivelor militare nu sunt publice; existenta unei servituti militare incidente amplasamentului se confirma exclusiv prin Certificatul de Urbanism si, daca este cazul, prin avizul Ministerului Apararii Nationale (MApN). In zonele de servitute se aplica restrictii de construire, de inaltime si de utilizare. Verificarea este obligatorie inainte de proiectare in zonele cu prezenta militara cunoscuta.', 14, cy); cy += 3;
    cy = sec('5.6 Zona maritima / portuara (litoral si Delta)', cy);
    if (R.costier.da || R.port.da) {
      cy = body('Amplasamentul se afla in zona maritima/portuara sau costiera. Pe langa servitutea costiera (OUG 202/2002), se analizeaza: eroziunea litorala si retragerea tarmului, riscul de inundare marina si cresterea nivelului marii (proiectii IPCC), efectele furtunilor, compatibilitatea cu operatiunile portuare (culoare de navigatie, zone de siguranta, acces logistic) si protectia peisajului marin. Se recomanda un Studiu de Impact Costier (SIC) si avizul Administratiei Bazinale de Apa Dobrogea-Litoral (ABADL), respectiv al administratiei portuare.', 14, cy); cy += 1;
      cy = tblRow(['Aspect maritim/costier', 'Evaluare', 'Temei / aviz'], cy, true, [54, 40, 88]);
      [['Eroziune costiera / retragere tarm', 'Studii ABADL', 'OUG 202/2002; proiecte protectie litorala'],
      ['Inundare marina / nivel mare', 'Proiectie IPCC + harti hazard', 'Dir. 2007/60/CE'],
      ['Compatibilitate portuara', R.port.da ? 'Necesara' : 'Dupa caz', 'Aviz administratie portuara / AFDJ'],
      ['Siguranta portuara (Seveso)', 'Verificare', 'Legea 59/2016; ISU'],
      ].forEach(function (r) { cy = tblRow(r, cy, false, [54, 40, 88]); }); cy += 3;
    } else {
      cy = body('Amplasamentul nu este in zona maritima/portuara — sectiune neaplicabila.', 14, cy); cy += 3;
    }
    cy = sec('5.7 Risc tehnologic (amplasamente Seveso)', cy);
    cy = body('In proximitatea amplasamentelor cu pericol de accidente majore care implica substante periculoase (amplasamente Seveso de nivel inferior/superior), se aplica zone de planificare a urgentei si restrictii de amplasare a functiunilor vulnerabile (locuinte, scoli, spitale). Lista amplasamentelor Seveso este gestionata de APM/MMAP. Compatibilitatea se verifica obligatoriu, integrat cu studiul ISU/SU, pentru orice dezvoltare in proximitatea zonelor industriale.', 14, cy);

    // ── 6. SINTEZA ─────────────────────────────────────────────────────────
    cy = page('6. SINTEZA RESTRICTIILOR, AVIZE NECESARE SI RECOMANDARI');
    cy = sec('6.1 Avize si studii probabil necesare', cy);
    var avize = [['Aviz gospodarire ape (ABA)', (R.inundatii.da || R.costier.da) ? 'PROBABIL' : 'Dupa caz', 'Legea 107/1996'],
    ['Studiu geotehnic (NP 074/2014)', 'OBLIGATORIU', 'Toate constructiile'],
    ['Analiza stabilitate taluzuri', R.alunecari.da ? 'RECOMANDAT/OBLIGATORIU' : 'Dupa caz', 'HG 447/2003'],
    ['Expertiza tehnica seismica', (R.seismic.val >= 0.25) ? 'RECOMANDAT (>P+3)' : 'Dupa caz', 'P100-3/2019'],
    ['Evaluare adecvata (Natura 2000)', (R.delta.da || R.arii.da) ? 'POSIBIL OBLIGATORIE' : 'Neaplicabil', 'OUG 57/2007'],
    ['Aviz arie protejata / RBDD', (R.delta.da) ? 'OBLIGATORIU in arie' : 'Dupa caz', 'Legea 82/1993; OUG 57/2007'],
    ['Aviz AACR (aeronautic)', R.aeroport.da ? 'PROBABIL' : 'La H>45m', 'HG 930/2016; RACR'],
    ['Aviz MApN (militar)', 'VERIFICARE', 'Servituti militare'],
    ['Aviz administratie portuara', R.port.da ? 'POSIBIL' : 'Neaplicabil', 'Cod maritim/portuar'],
    ['Compatibilitate Seveso (APM/ISU)', 'VERIFICARE', 'Legea 59/2016']];
    // aviz patrimoniu (LMI/monumente) — serviciu comun _LMI (zona de protecție)
    var lmiAviz = null; try { if (window._LMI && window._LMI.avizForParcel) lmiAviz = await window._LMI.avizForParcel(lat, lon); } catch (e) { }
    var lmiNivel = (lmiAviz && lmiAviz.necesar) ? ((lmiAviz.nivel && /minister/i.test(lmiAviz.nivel)) ? 'PROBABIL — Min. Culturii (gr. A)' : 'PROBABIL — DJC (gr. B)') : 'Verificare LMI/RAN';
    avize.push(['Aviz patrimoniu (monument / zona de protectie)', lmiNivel, 'Legea 422/2001; OG 43/2000']);
    cy = tblRow(['Aviz / studiu', 'Necesitate', 'Temei'], cy, true, [62, 46, 74]);
    avize.forEach(function (r) { cy = tblRow(r, cy, false, [62, 46, 74]); });
    cy += 3;
    if (lmiAviz && lmiAviz.nota) { cy = body('Patrimoniu (LMI/RAN): ' + S2(lmiAviz.nota) + (lmiAviz.necesar ? ' Nivel de avizare estimat: ' + S2(lmiAviz.nivel || 'DJC') + '.' : ''), 14, cy, undefined, 7.5); cy += 2; }
    cy = sec('6.2 Recomandari pentru proiectant, beneficiar si autoritati', cy);
    cy = body('Pentru PROIECTANT: integrarea restrictiilor de la faza de concept; comandarea din timp a studiilor de specialitate (geotehnic, hidrologic, expertiza); dimensionarea la actiunea seismica ag=' + seism.ag + 'g. Pentru BENEFICIAR: bugetarea avizelor si studiilor; verificarea fezabilitatii inainte de achizitie. Pentru AUTORITATI: prezentul studiu sustine analiza incadrarii in restrictiile legale si fundamenteaza conditiile din Certificatul de Urbanism.', 14, cy); cy += 1;
    cy = body('Caracter: document preliminar de fundamentare, orientativ. Datele de risc se confirma pe sursele oficiale (MMAP/ANAR, MDLPA, ANRM, administratii de arii protejate) si prin studiile de specialitate certificate. Sursele de adevar sunt indicate la finalul fiecarui capitol.', 14, cy, undefined, 7); cy += 2;
    // ── Nota UrbanX (IVU) — context teritorial al amplasamentului (brand UrbanX) ──
    try {
      var _ivuCk = (window.TCI && window.TCI.cityKey);
      var _ivu = (window.UrbanXIVU && window.UrbanXIVU.scoreFor) ? window.UrbanXIVU.scoreFor(_ivuCk) : null;
      cy = sec('6.3 Nota UrbanX (IVU) — contextul teritorial', cy);
      if (_ivu && _ivu.R) cy = body('Amplasamentul se afla intr-un UAT cu Nota UrbanX (Indicele de Vitalitate Urbana) de ' + _ivu.R.score + '/100 (calificativ ' + _ivu.R.grade + ', categorie de marime: ' + (_ivu.R.tierLabel || '') + '). IVU este un indice compozit (0-100) dezvoltat de UrbanX, calculat din date reale pe sase dimensiuni (economie, calitatea vietii, conectivitate, mediu, demografie, rezilienta), cu formula transparenta si recalculabila. El ofera contextul de vitalitate al localitatii in care se incadreaza parcela.', 14, cy, undefined, 8);
      else cy = body('Nota UrbanX (IVU) este un indice compozit (0-100) dezvoltat de UrbanX, care exprima vitalitatea urbana a UAT pe sase dimensiuni (economie, calitatea vietii, conectivitate, mediu, demografie, rezilienta), din date reale si cu formula transparenta. Selectati un UAT cu date pentru calculul notei.', 14, cy, undefined, 8);
    } catch (e) { }

    // ── ESG ────────────────────────────────────────────────────────────────
    try {
      if (typeof _calcESGScore === 'function' && typeof _pdfESGBlock === 'function') {
        var topH = (window.S && S.vol && S.vol._lastFeats) ? S.vol._lastFeats.reduce(function (m, f) { return Math.max(m, (f.properties && f.properties.top) || 0); }, 0) : 12;
        var esg = _calcESGScore(ap, params, topH || 12, (window.AEDIS && AEDIS.fn) || 'rezidential_colectiv');
        pdf.addPage(); pdf.setFillColor.apply(pdf, LIGHT); pdf.rect(0, 0, W, H, 'F'); hdr('ESG URBAN SUSTAINABILITY RATING'); ftr();
        _pdfESGBlock(pdf, W, 33, esg);
      }
    } catch (e) { }

    if (typeof _pdfSaveMobile === 'function') _pdfSaveMobile(pdf, 'Studiu_Restrictii_Risc_' + (nrcad || 'parcela') + '.pdf');
    else pdf.save('Studiu_Restrictii_Risc_' + (nrcad || 'parcela') + '.pdf');
    (window.ss || console.log)('Studiu de Restrictii & Zone de Risc generat.');
  }

  window.generateStudiuRestrictii = generateStudiuRestrictii;
})();
