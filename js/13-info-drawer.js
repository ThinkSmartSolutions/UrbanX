// UrbanX — RAPORT_INFO, info drawer, Street View


// ═══ STREET VIEW ══════════════════════════════════════════════════════════════
// Embed Google Street View panoramic + proiecție siluetă volum AEDIS

// SV moved to top

function svOpen(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('⚠️ Selectați o parcelă pentru Street View.'); return; }

  const modal = document.getElementById('sv-modal');
  modal.style.display = 'flex';
  SV.open = true;

  // Calculam centrul parcelei si pozitiile sugerate (4 directii de pe strada)
  const center = turf.centerOfMass(ap.geo).geometry.coordinates; // [lng, lat]
  const [lng, lat] = center;

  // Generam 4-6 puncte de vizualizare in jurul parcelei (de pe strada, la ~20-30m)
  _svGeneratePositions(ap.geo, lng, lat);

  // Deschidem primul punct de vizualizare
  if(SV.positions.length > 0){
    svLoadPosition(SV.positions[0]);
  } else {
    svLoadPosition({lat, lng: lng + 0.0003, heading: 270, pitch: 5, label: 'Nord'});
  }
}

function svClose(){
  const modal = document.getElementById('sv-modal');
  modal.style.display = 'none';
  SV.open = false;
  const iframe = document.getElementById('sv-iframe');
  if(iframe) iframe.src = '';
}

function svToggleVolume(){
  SV.showVolume = !SV.showVolume;
  const btn = document.getElementById('sv-toggle-vol');
  if(btn) btn.textContent = SV.showVolume ? '🏗 Volum ON' : '🏗 Volum OFF';
  const canvas = document.getElementById('sv-canvas');
  if(canvas) canvas.style.display = SV.showVolume ? 'block' : 'none';
}

function _svGeneratePositions(parcelGeo, cx, cy){
  SV.positions = [];
  // Calculam bounding box al parcelei
  const bb = turf.bbox(parcelGeo);
  const W = bb[0], S2 = bb[1], E = bb[2], N = bb[3];
  const dLat = 0.00025; // ~28m
  const dLng = 0.00035; // ~25m

  const positions = [
    {lat: N + dLat, lng: cx,        heading: 180, pitch: 5,  label: '↓ Nord (față)'},
    {lat: S2 - dLat, lng: cx,       heading: 0,   pitch: 5,  label: '↑ Sud (spate)'},
    {lat: cy,        lng: W - dLng, heading: 90,  pitch: 5,  label: '→ Vest (lateral)'},
    {lat: cy,        lng: E + dLng, heading: 270, pitch: 5,  label: '← Est (lateral)'},
    {lat: N + dLat*0.7, lng: W - dLng*0.7, heading: 135, pitch: 8, label: '↘ Colț NV'},
    {lat: N + dLat*0.7, lng: E + dLng*0.7, heading: 225, pitch: 8, label: '↙ Colț NE'},
  ];

  SV.positions = positions;
  _svRenderPositionButtons();
}

function _svRenderPositionButtons(){
  const bar = document.getElementById('sv-positions');
  if(!bar) return;
  const btnStyle = (active) =>
    'padding:6px 10px;border-radius:7px;cursor:pointer;font-size:11px;font-weight:600;white-space:nowrap;' +
    'border:1px solid ' + (active ? '#d4af37' : 'rgba(255,255,255,.15)') + ';' +
    'background:' + (active ? 'rgba(212,175,55,.2)' : 'rgba(11,18,32,.8)') + ';' +
    'color:' + (active ? '#d4af37' : '#94a3b8');

  bar.innerHTML = '<span style="font-size:10px;color:#475569;white-space:nowrap;flex-shrink:0">Vizualizare din:</span>' +
    SV.positions.map((pos, i) =>
      '<button style="' + btnStyle(SV.currentPos === i) + '" onclick="svLoadPosition(SV.positions[' + i + '],' + i + ')">' +
      pos.label + '</button>'
    ).join('');
}

function svLoadPosition(pos, idx){
  SV.currentPos = idx ?? 0;
  _svRenderPositionButtons();

  const iframe = document.getElementById('sv-iframe');
  if(!iframe) return;

  // Google Street View embed fara API key — format direct Maps embed
  // cbll = lat,lng  cbp = 12,heading,0,zoom,pitch  output=svembed
  const svUrl = 'https://www.google.com/maps?q=&layer=c' +
    '&cbll=' + pos.lat + ',' + pos.lng +
    '&cbp=12,' + (pos.heading||0) + ',0,1,' + (pos.pitch||5) +
    '&t=h&z=18&output=svembed';

  iframe.src = svUrl;

  const lbl = document.getElementById('sv-pov-label');
  if(lbl) lbl.textContent = pos.label + ' · ' + pos.lat.toFixed(5) + ', ' + pos.lng.toFixed(5);

  // Proiectam silueta volumului pe canvas dupa o pauza (SV se incarca)
  if(SV.showVolume){
    setTimeout(() => svProjectVolume(pos), 1500);
  }
}

function svProjectVolume(pos){
  const canvas = document.getElementById('sv-canvas');
  if(!canvas) return;
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry) return;

  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  canvas.width = W; canvas.height = H;
  const ctx2d = canvas.getContext('2d');
  ctx2d.clearRect(0, 0, W, H);

  // Obtinem geometria volumului AEDIS (footprint + inaltimi)
  const feats = S.vol._lastFeats || [];
  if(!feats.length) return;

  // Colectam etajele AEDIS (nu existentele)
  const aedisFeats = feats.filter(f => !f.properties?.isExistent && (f.properties?.floor ?? 0) >= 0);
  if(!aedisFeats.length) return;

  // Calculam inaltimea maxima
  const maxTop = Math.max(...feats.map(f => f.properties?.top || 0));
  const parter = aedisFeats.find(f => (f.properties?.floor ?? 0) === 0);
  if(!parter?.geometry?.coordinates) return;

  const ring = parter.geometry.coordinates[0];
  const viewLat = pos.lat, viewLng = pos.lng;
  const headingRad = (pos.heading || 0) * Math.PI / 180;
  const fovH = 90 * Math.PI / 180; // field of view horizontal
  const fovV = fovH * (H / W);

  // Proiecție simpla perspectivă: fiecare colț al clădirii → pixel pe canvas
  // Coordonate relative la camera (metri)
  const mLng = 111320 * Math.cos(viewLat * Math.PI / 180);
  const mLat = 111320;

  function project3D(lng, lat, height){
    // Vector de la camera spre punct (metri)
    const dx = (lng - viewLng) * mLng;
    const dy = (lat - viewLat) * mLat;
    const dz = height - 1.6; // inaltimea ochiului: 1.6m

    // Rotatie in planul orizontal (heading)
    const cosH = Math.cos(-headingRad), sinH = Math.sin(-headingRad);
    const rx = dx * cosH - dy * sinH;
    const ry = dx * sinH + dy * cosH;
    // ry = adancime (inainte), rx = stanga-dreapta, dz = sus-jos

    if(ry <= 0.5) return null; // in spatele camerei

    // Proiectie perspectiva
    const px = W/2 + (rx / ry) * (W / (2 * Math.tan(fovH/2)));
    const py = H/2 - (dz / ry) * (H / (2 * Math.tan(fovV/2)));
    const depth = Math.sqrt(dx*dx + dy*dy + dz*dz);
    return {px, py, depth};
  }

  // Desenam silueta la sol (footprint)
  const basePoints = ring.slice(0,-1).map(([lng,lat]) => project3D(lng, lat, 0)).filter(Boolean);
  const topPoints  = ring.slice(0,-1).map(([lng,lat]) => project3D(lng, lat, maxTop)).filter(Boolean);

  if(basePoints.length < 3) return;

  // Fill fata clădirii (fețele vizibile)
  ctx2d.save();

  // Desenam fiecare fata a clădirii
  for(let i = 0; i < ring.length - 1; i++){
    const j = (i + 1) % (ring.length - 1);
    const b0 = project3D(ring[i][0], ring[i][1], 0);
    const b1 = project3D(ring[j][0], ring[j][1], 0);
    const t0 = project3D(ring[i][0], ring[i][1], maxTop);
    const t1 = project3D(ring[j][0], ring[j][1], maxTop);
    if(!b0||!b1||!t0||!t1) continue;
    if(b0.depth > 300 || b1.depth > 300) continue; // prea departe

    // Culoare fata - variatie per stil
    const stilDef = AEDIS_STIL[AEDIS.stil] || AEDIS_STIL.modern;
    const baseColor = stilDef.floorColors?.[3] || '#3b82f6';

    ctx2d.beginPath();
    ctx2d.moveTo(b0.px, b0.py);
    ctx2d.lineTo(b1.px, b1.py);
    ctx2d.lineTo(t1.px, t1.py);
    ctx2d.lineTo(t0.px, t0.py);
    ctx2d.closePath();
    ctx2d.fillStyle = baseColor + 'aa'; // 67% opacitate
    ctx2d.fill();
    ctx2d.strokeStyle = baseColor;
    ctx2d.lineWidth = 1.5;
    ctx2d.stroke();
  }

  // Conturul de sus (terasa)
  if(topPoints.length >= 3){
    ctx2d.beginPath();
    ctx2d.moveTo(topPoints[0].px, topPoints[0].py);
    topPoints.forEach(p => ctx2d.lineTo(p.px, p.py));
    ctx2d.closePath();
    const stilDef2 = AEDIS_STIL[AEDIS.stil] || AEDIS_STIL.modern;
    ctx2d.fillStyle = (stilDef2.aticColor || '#0f172a') + 'cc';
    ctx2d.fill();
    ctx2d.strokeStyle = '#ffffff88';
    ctx2d.lineWidth = 2;
    ctx2d.stroke();
  }

  // Eticheta inălțime
  const centerProj = project3D(
    ring.reduce((s,c2)=>s+c2[0],0)/ring.length,
    ring.reduce((s,c2)=>s+c2[1],0)/ring.length,
    maxTop * 0.6
  );
  if(centerProj && centerProj.depth < 200){
    ctx2d.font = 'bold 13px Segoe UI, Arial';
    ctx2d.fillStyle = '#d4af37';
    ctx2d.strokeStyle = 'rgba(0,0,0,.8)';
    ctx2d.lineWidth = 3;
    const label = 'H=' + maxTop.toFixed(0) + 'm · ' + (AEDIS_STIL[AEDIS.stil]?.label || '');
    ctx2d.strokeText(label, centerProj.px - 40, centerProj.py);
    ctx2d.fillText(label, centerProj.px - 40, centerProj.py);
  }

  ctx2d.restore();
  document.getElementById('sv-subtitle').textContent =
    'Siluetă proiectată · ' + pos.label + ' · dist. ~' +
    Math.round(Math.sqrt(
      Math.pow((pos.lng - (ring.reduce((s,c3)=>s+c3[0],0)/ring.length))*mLng, 2) +
      Math.pow((pos.lat - (ring.reduce((s,c3)=>s+c3[1],0)/ring.length))*mLat, 2)
    )) + 'm';
}

// ═══════════════════════════════════════════════════════════════════════════
// INFO DRAWER — Catalog rapoarte cu descrieri complete
// ═══════════════════════════════════════════════════════════════════════════

const RAPORT_INFO = {
  raport_complet: {
    ico: '📄', label: 'Raport Urbanistic Complet',
    badge: 'recomandat', badgeLabel: 'Raport de bază',
    color: '226,232,240',
    fn: 'runExport()',
    ce: 'Sintetizează toți parametrii urbanistici ai parcelei selectate într-un document PDF complet: indicatori PUG, reglementări UTR, bilanț suprafețe, volumetrie propusă și contextul cadastral. Este documentul de referință pentru orice proiect de construire.',
    dece: 'Certificatul de Urbanism emis de Primărie face trimitere la indicatorii PUG. Acest raport îi documentează și îi interpretează în raport cu volumetria propusă, oferind arhitectului și beneficiarului o imagine clară înainte de a angaja cheltuieli de proiectare.',
    legal: 'Legea 50/1991 · Legea 350/2001 · PUG în vigoare · Regulament Local de Urbanism',
    output: [
      { ico: '📐', txt: 'Fișă parcela: suprafață, UTR, coordonate GPS' },
      { ico: '📊', txt: 'Indicatori urbanistici: POT, CUT, H max, aliniamente' },
      { ico: '🏗', txt: 'Bilanț volumetrie propusă vs. admis PUG' },
      { ico: '🗺', txt: 'Capturi hartă 3D și plan de situație' },
      { ico: '✅', txt: 'Verificare conformitate automată per criteriu' },
    ],
    nu: ['Nu este un aviz sau document oficial — nu înlocuiește Certificatul de Urbanism', 'Nu se aplică parcelelor fără număr cadastral identificat'],
  },
  lotizare: {
    ico: '🏘', label: 'Plan de Lotizare PDF',
    badge: 'recomandat', badgeLabel: 'Proiect de lotizare',
    color: '192,132,252',
    fn: '_lotExportPDF()',
    ce: 'Generează documentația PDF pentru parcelarea unui teren în loturi rezidențiale individuale. Include planul de situație cu loturi și circulații interioare, bilanțul suprafețelor, distribuția pe tipuri de locuință, analiza financiară preliminară (ROI estimat) și verificarea conformității cu PUG.',
    dece: 'Parcelarea unui teren necesită documentație tehnică pentru obținerea Autorizației de Construire și pentru dezlipirea cadastrală la ANCPI. Planul de lotizare este documentul de bază pe care îl prezinți Primăriei, topografului și notarului.',
    legal: 'Legea 50/1991 (art. 3) · Legea 7/1996 (cadastru) · Legea 350/2001 · NP 051/2012 (parcaje)',
    output: [
      { ico: '🗺', txt: 'Plan de situație 2D cu loturi și circulații interioare' },
      { ico: '📊', txt: 'Bilanț suprafețe: loturi, drumuri, spații verzi' },
      { ico: '🏠', txt: 'Distribuție tipuri locuință: individuală, înșiruită, duplex, bloc mic' },
      { ico: '💰', txt: 'Analiză financiară: cost construcție, preț vânzare, ROI estimat' },
      { ico: '✅', txt: 'Verificare conformitate: lot minim, lățime drum, eficiență teren' },
      { ico: '🏙', txt: 'Vederi 3D: zi, golden hour, noapte' },
    ],
    nu: ['Necesită activarea modulului Lotizare din meniul Instrumente înainte de generare', 'Nu înlocuiește documentația cadastrală întocmită de topograf autorizat ANCPI'],
  },
  memoriu: {
    ico: '🏗', label: 'Memoriu Tehnic Preliminar',
    badge: 'recomandat', badgeLabel: 'Dosar avizare',
    color: '212,175,55',
    fn: 'generateMemoriu()',
    ce: 'Redactează memoriul tehnic preliminar al proiectului de construire, care descrie în limbaj tehnico-juridic: amplasamentul, funcțiunea propusă, regimul de înălțime, soluția arhitecturală de principiu, conformitatea cu PUG și lista avizelor necesare.',
    dece: 'Memoriul tehnic este documentul obligatoriu din dosarul pentru Certificatul de Urbanism și Autorizația de Construire. Fără el, Primăria nu poate procesa solicitarea. Varianta preliminară accelerează consultările cu arhitectul și identifică din timp avizele de obținut.',
    legal: 'Legea 50/1991 · HG 907/2016 (conținut-cadru proiecte) · Ordinul MDRAP 839/2009',
    output: [
      { ico: '📝', txt: 'Date de identificare amplasament și beneficiar' },
      { ico: '🏗', txt: 'Descriere soluție arhitecturală și volum propus' },
      { ico: '📋', txt: 'Conformitate cu indicatorii PUG (POT, CUT, H, aliniamente)' },
      { ico: '📋', txt: 'Listă avize și acorduri necesare pentru autorizare' },
      { ico: '⚠️', txt: 'Observații și riscuri identificate preliminar' },
    ],
    nu: ['Document orientativ — nu înlocuiește memoriul tehnic semnat de arhitect cu drept de semnătură', 'Textul generat necesită verificare și adaptare de către proiectant'],
  },
  insorire: {
    ico: '☀', label: 'Studiu de Însorire',
    badge: 'obligatoriu', badgeLabel: 'Avizare clădiri noi',
    color: '251,191,36',
    fn: 'generateSolarStudy()',
    ce: 'Analizează câte ore de radiație solară directă primesc fațadele și spațiile interioare ale construcției propuse. Calculează bilanțul solar pe anotimpuri, verifică respectarea duratei minime de însorire impuse de normative și identifică fațadele deficitare.',
    dece: 'Normativele românești (C 107, OMS 119/2014) impun un minim de 1,5 ore de însorire/zi pentru încăperile de locuit, la solstițiul de iarnă. Autoritățile de sănătate publică solicită acest studiu în dosarul de avizare pentru orice clădire rezidențială.',
    legal: 'OMS 119/2014 (norme igienă) · C 107/2005 · SR 6221 · HG 525/1996 (RGU art. 17)',
    output: [
      { ico: '☀', txt: 'Bilanț ore însorire per fațadă (N/S/E/V) la solstițiu de iarnă' },
      { ico: '📊', txt: 'Grafic însorire pe luni: minim, mediu, maxim' },
      { ico: '✅', txt: 'Verificare conformitate OMS 119: CONFORM / ATENȚIE per cameră' },
      { ico: '🗺', txt: 'Captură 3D cu orientarea solară și umbra la ora 12:00' },
      { ico: '💡', txt: 'Recomandări arhitecturale pentru îmbunătățirea însoriri' },
    ],
    nu: ['Nu se aplică clădirilor industriale, depozite, birouri fără camere de locuit', 'Rezultatele sunt orientative — studiul definitiv se realizează cu software specializat (Heliodon, EnergyPlus)'],
  },
  umbre: {
    ico: '🌑', label: 'Studiu Umbre & Obstrucție',
    badge: 'obligatoriu', badgeLabel: 'Protecție vecini',
    color: '251,146,60',
    fn: 'generateShadowStudy()',
    ce: 'Calculează umbrele proiectate de volumul propus asupra parcelelor și clădirilor adiacente. Determină la ce ore și în ce perioade ale anului umbra construcției tale afectează vecinii, fereastra de însorire a acestora și spațiile publice din proximitate.',
    dece: 'Este documentul cel mai frecvent solicitat de vecini și de Primărie în cadrul contestațiilor la autorizație. Demonstrează că proiectul respectă dreptul vecinilor la însorire (min. 1,5 ore/zi) și că nu creează obstacole vizuale sau de ventilație în zona de protecție.',
    legal: 'OMS 119/2014 · C 107/2005 · Legea 50/1991 art. 27 (drept de contestație vecini) · SR 6221',
    output: [
      { ico: '🌑', txt: 'Harta umbrelor la ore critice: 9:00, 12:00, 15:00' },
      { ico: '📊', txt: 'Tabel impact per vecin: ore afectate, procentaj fațadă obstruată' },
      { ico: '✅', txt: 'Verificare conformitate: CONFORM / DEPĂȘIRE limită admisă' },
      { ico: '🗺', txt: 'Vederi 3D cu proiecția umbrei la solstițiu de iarnă și vară' },
      { ico: '📐', txt: 'Distanțe critice calculate față de ferestrele vecinilor' },
    ],
    nu: ['Nu se aplică parcelelor izolate fără vecini cu ferestre orientate spre amplasament', 'Nu înlocuiește expertiza tehnică a unui specialist certificat în cazul litigiilor'],
  },
  acustic: {
    ico: '🔇', label: 'Studiu Acustic Urban',
    badge: 'obligatoriu', badgeLabel: 'Zone cu trafic / industrie',
    color: '167,139,250',
    fn: 'generateNoiseStudy()',
    ce: 'Evaluează nivelul de zgomot la care va fi expusă clădirea propusă, provenind din sursele din proximitate: trafic rutier, feroviar, activități industriale sau comerciale. Verifică dacă nivelul de zgomot la fațadă respectă limitele admise și recomandă soluții de izolare.',
    dece: 'SR 10009/2017 și Legea 121/2019 (poluare fonică) impun limite stricte de zgomot pentru locuințe. APM și DSP solicită studiul acustic în dosarul de avizare pentru clădirile amplasate în zone cu trafic intens sau în apropierea surselor industriale.',
    legal: 'SR 10009/2017 · Legea 121/2019 (zgomot ambiental) · HG 321/2005 · Directiva UE 2002/49/CE',
    output: [
      { ico: '🔇', txt: 'Niveluri zgomot Lday/Lnight la fiecare fațadă (dB)' },
      { ico: '📊', txt: 'Harta acustică în raza 200m cu identificarea surselor' },
      { ico: '✅', txt: 'Verificare conformitate SR 10009: CONFORM / DEPĂȘIRE' },
      { ico: '🏗', txt: 'Recomandări: grosime geam, izolație fațadă, bariere fonice' },
      { ico: '📋', txt: 'Clasificare zone acustice conform PUG' },
    ],
    nu: ['Nu se aplică în zone rurale fără surse semnificative de zgomot la 200m', 'Evaluarea utilizează modele simplificate — studiul definitiv necesită măsurători in situ'],
  },
  vant: {
    ico: '🌬', label: 'Studiu Vânt & Confort Pietonal',
    badge: 'recomandat', badgeLabel: 'Clădiri >P+3E',
    color: '56,189,248',
    fn: 'generateWindStudy()',
    ce: 'Analizează efectele aerodinamice ale construcției propuse asupra confortului pietonal în spațiile publice adiacente. Identifică zonele cu curenți de aer accelerați sau turbulențe la nivelul solului, utilizând criteriile Lawson pentru clasificarea confortului pietonal.',
    dece: 'Clădirile înalte sau cu forme complexe pot accelera vântul la nivelul solului la valori de 2-3 ori mai mari decât viteza naturală, creând disconfort sau pericol pietonal. Unele Primării și studii de impact solicită această analiză pentru clădiri peste P+3E sau cu suprafață frontală mare.',
    legal: 'SR 13330/2014 (acțiunea vântului) · EN 1991-1-4 · Criteriu Lawson (standard internațional)',
    output: [
      { ico: '🌬', txt: 'Clasificare Lawson per zonă: Calm / Confort / Acceptabil / Risc / Pericol' },
      { ico: '🗺', txt: 'Harta curenților la nivelul solului în raza 50m' },
      { ico: '📊', txt: 'Viteze medii vânt per direcție și sezon (8 direcții)' },
      { ico: '✅', txt: 'Verificare confort spații publice și intrări clădire' },
      { ico: '💡', txt: 'Recomandări: plantatii, pergole, deflectoare pentru reducerea turbulențelor' },
    ],
    nu: ['Mai puțin relevant pentru clădiri mici (P, P+1E) în zone protejate de vânt', 'Simularea CFD completă necesită software specializat (Ansys Fluent, OpenFOAM)'],
  },
  verde: {
    ico: '🌿', label: 'Studiu Spații Verzi',
    badge: 'obligatoriu', badgeLabel: 'Toate proiectele',
    color: '74,222,128',
    fn: 'generateGreenStudy()',
    ce: 'Calculează suprafața de spații verzi necesară conform UTR și o compară cu cea disponibilă pe parcelă după implantarea volumului propus. Identifică tipurile de vegetație admise, suprafețele permeabile și soluțiile de compensare dacă minimul nu este atins.',
    dece: 'Legea 24/2007 și PUG impun un procent minim de spații verzi pe lot (uzual 20-40% din suprafața parcelei). Primăria respinge documentațiile care nu respectă acest minim sau care nu dovedesc suprafețele verzi prin planuri și calcule.',
    legal: 'Legea 24/2007 (spații verzi) · HG 525/1996 art. 15 · PUG local · OMS 119/2014',
    output: [
      { ico: '🌿', txt: 'Bilanț SV: necesar conform UTR vs. propus pe parcelă (mp și %)' },
      { ico: '📊', txt: 'Suprafață permeabilă vs. impermeabilă (asfalt, dale, beton)' },
      { ico: '🌳', txt: 'Plantații recomandate: arbori, arbuști, covor vegetal' },
      { ico: '✅', txt: 'Verificare conformitate: CONFORM / DEFICIT · soluții compensare' },
      { ico: '💧', txt: 'Coeficient de permeabilitate și gestionare ape pluviale' },
    ],
    nu: ['Nu înlocuiește planul de amenajare peisagistică semnat de peisagist autorizat', 'Valorile sunt calculate pe baza suprafeței de construire estimate, nu a proiectului tehnic definitiv'],
  },
  mobilitate: {
    ico: '🚗', label: 'Studiu Mobilitate & Parcaje',
    badge: 'obligatoriu', badgeLabel: 'Toate proiectele',
    color: '244,114,182',
    fn: 'generateMobilityStudy()',
    ce: 'Calculează numărul minim de locuri de parcare impus de NP 051 în funcție de tipul și suprafața construcției, verifică dacă accesele auto și pietonale respectă normativele și identifică impactul traficului generat de proiect asupra rețelei stradale existente.',
    dece: 'Primăria refuză autorizația dacă proiectul nu asigură parcajele minime pe lot sau dacă accesele nu respectă normativele (lățime intrare, raza de întoarcere, vizibilitate). Este unul dintre cele mai frecvente motive de respingere a dosarelor de avizare.',
    legal: 'NP 051/2012 (normativ parcaje) · HG 525/1996 · SR 13330/2014 · Regulament Local Urbanism',
    output: [
      { ico: '🚗', txt: 'Necesar parcaje: nr. locuri per funcțiune conform NP 051' },
      { ico: '📐', txt: 'Dimensionare acces auto: lățime, rază întoarcere, vizibilitate' },
      { ico: '🚶', txt: 'Accese pietonale: lățimi, conexiune trotuar, accesibilitate PMR' },
      { ico: '📊', txt: 'Trafic generat: vehicule/oră la intrare și ieșire' },
      { ico: '✅', txt: 'Verificare conformitate NP 051: CONFORM / DEFICIT locuri' },
    ],
    nu: ['Nu înlocuiește studiul de trafic complet pentru proiecte mari (>50 apartamente)', 'Calculul parcajelor pentru funcțiuni mixte complexe necesită verificare manuală'],
  },
  densitate: {
    ico: '📊', label: 'Studiu Densitate Urbană',
    badge: 'optional', badgeLabel: 'Analiză comparativă',
    color: '148,163,184',
    fn: 'generateDensityStudy()',
    ce: 'Analizează densitatea construită a parcelei propuse în raport cu contextul urban imediat (200-500m). Calculează POT și CUT medii ale vecinilor, compară cu indicatorii propuși și evaluează dacă proiectul se încadrează coerent în țesutul urban existent.',
    dece: 'Consiliile locale și comisiile de avizare pot respinge proiecte care, deși respectă PUG, creează discontinuități vizuale sau densități excesive față de contextul construit existent. Studiul demonstrează coerența urbanistică a proiectului cu vecinătatea sa.',
    legal: 'Legea 350/2001 · Ghid metodologic PUZ 2016 · Regulament Local Urbanism',
    output: [
      { ico: '📊', txt: 'POT și CUT mediu al vecinilor în raza 200m și 500m' },
      { ico: '📐', txt: 'Comparație regim înălțime: propus vs. context (H mediu vecini)' },
      { ico: '🗺', txt: 'Hartă densitate construită cu codificare cromatică' },
      { ico: '✅', txt: 'Poziționare proiect față de media zonei: sub / la / peste' },
      { ico: '💡', txt: 'Argumentare urbanistică pentru eventuale derogări de la PUG' },
    ],
    nu: ['Studiul are valoare orientativă în absența unui PUZ aprobat pentru zonă', 'Datele OSM pot fi incomplete în zone cu construcții recente neactualizate'],
  },
  aacr: {
    ico: '✈', label: 'Studiu AACR — Aviz Aeroport',
    badge: 'obligatoriu', badgeLabel: 'Zone aeroportuare',
    color: '96,165,250',
    fn: 'generateAACR()',
    ce: 'Verifică dacă înălțimea construcției propuse depășește suprafețele de limitare a obstacolelor definite de ICAO Anexa 14 și HG 930/2016 în raport cu cel mai apropiat aeroport. Calculează înălțimea maximă admisă și dacă este necesar avizul ROMATSA.',
    dece: 'Orice construcție situată în zona de protecție aeronautică a unui aeroport trebuie să obțină avizul AACR (Autoritatea Aeronautică Civilă Română) înainte de Autorizația de Construire. Construirea fără acest aviz atrage demolarea pe cheltuiala proprietarului.',
    legal: 'HG 930/2016 · Legea 233/2016 (Codul Aerian) · ICAO Anexa 14 ed.8 · Legea 50/1991 art.7 · OMAI 14/2007',
    output: [
      { ico: '✈', txt: 'Distanța față de pragul pistei și aeroportul ICAO identificat' },
      { ico: '📐', txt: 'Înălțime maximă admisă AACR calculată (formula ICAO)' },
      { ico: '✅', txt: 'Verdict: CONFORM / DEPĂȘIRE cu indicarea marjei (metri)' },
      { ico: '📋', txt: 'Suprafața ICAO aplicabilă: De cursă / De abordare / Conică / Orizontală' },
      { ico: '📝', txt: 'Procedura obținere aviz ROMATSA: etape și documente necesare' },
    ],
    nu: ['Se aplică NUMAI parcelelor situate în zona de protecție a unui aeroport (uzual <15km)', 'Nu înlocuiește avizul oficial AACR/ROMATSA obligatoriu pentru dosarul AC'],
  },
  existente: {
    ico: '🏚', label: 'Studiu Construcții Existente',
    badge: 'recomandat', badgeLabel: 'Parcele cu construcții',
    color: '251,113,133',
    fn: 'generateExistingBldStudy()',
    ce: 'Inventariază construcțiile existente pe parcelă identificate din surse OSM și satelitare, estimează suprafața construită existentă și propune scenarii de intervenție: demolare totală, extindere orizontală/verticală, mansardare, reconversie sau înglobare.',
    dece: 'Înainte de a proiecta, trebuie să știi ce există pe teren și ce se poate face cu clădirile existente. Demolarea necesită autorizație separată; extinderea implică verificarea structurii existente. Studiul clarifică scenariul optim economic și tehnic înainte de angajarea proiectantului.',
    legal: 'Legea 50/1991 (demolare) · HG 907/2016 · Legea 422/2001 (monumente) · OUG 57/2020',
    output: [
      { ico: '🏚', txt: 'Inventar construcții existente: suprafață, regim înălțime estimat, funcțiune' },
      { ico: '📊', txt: 'Bilanț: suprafață ocupată vs. teren disponibil pentru construire' },
      { ico: '🔧', txt: 'Scenarii propuse: demolare / extindere / mansardare / reconversie' },
      { ico: '💰', txt: 'Estimare cost demolare vs. cost reabilitare per scenariu' },
      { ico: '⚠️', txt: 'Avertismente: monumente istorice, zone protejate, servituți' },
    ],
    nu: ['Datele OSM pot fi incomplete sau depășite — verificarea in situ este obligatorie', 'Nu evaluează starea structurală a clădirilor (necesită expertiză tehnică)'],
  },
  geotehnic: {
    ico: '🪨', label: 'Pre-Studiu Geotehnic',
    badge: 'obligatoriu', badgeLabel: 'Proiecte cu fundații',
    color: '167,139,250',
    fn: 'generateGeotehnicalStudy()',
    ce: 'Oferă o evaluare preliminară a condițiilor geotehnice ale amplasamentului: seismicitate (zonă seismică, Tc, ag), tipul de teren estimat, nivelul freatic probabil și tipul de fundare recomandat, pe baza datelor publice disponibile pentru zona geografică respectivă.',
    dece: 'Proiectul de rezistență nu poate fi elaborat fără studiu geotehnic. Banca finanțatoare și Primăria îl solicită în dosar. Varianta preliminară ajută arhitectul și investitorul să estimeze din timp costurile de fundare (fundație directă vs. piloți vs. baretă) înainte de comanda studiului oficial.',
    legal: 'NP 074/2014 (normativ geotehnic) · P 100-1/2013 (seismicitate) · SR EN 1997-1 (Eurocode 7) · Legea 10/1995',
    output: [
      { ico: '🗺', txt: 'Zonă seismică: ag și Tc conform P 100-1/2013 pentru UAT' },
      { ico: '🪨', txt: 'Tip teren estimat și capacitate portantă orientativă (kPa)' },
      { ico: '💧', txt: 'Nivel freatic probabil și risc de inundabilitate' },
      { ico: '🏗', txt: 'Tip fundare recomandat: directă / indirectă / radier general' },
      { ico: '📋', txt: 'Avize necesare: Studiu geo oficial, aviz ANAR dacă e cazul' },
    ],
    nu: ['Nu înlocuiește studiul geotehnic oficial realizat de geotehnician autorizat cu foraje', 'Datele de teren estimate sunt orientative — condiționatele reale pot diferi semnificativ'],
  },
  trafic: {
    ico: '🚦', label: 'Studiu de Impact Trafic',
    badge: 'obligatoriu', badgeLabel: 'Proiecte >20 unități',
    color: '52,211,153',
    fn: 'generateTrafficStudy()',
    ce: 'Estimează traficul auto și pietonal generat de proiect (vehicule/oră la orele de vârf), evaluează capacitatea rețelei stradale adiacente de a prelua fluxul suplimentar și propune măsuri de management al traficului pentru integrarea proiectului fără degradarea nivelului de serviciu stradal.',
    dece: 'Primăriile și Consiliile Județene solicită studiul de impact asupra traficului pentru proiectele care generează mai mult de 50-100 vehicule/zi. Fără el, autorizația poate fi condiționată sau respinsă, mai ales în zone cu infrastructură stradală saturată.',
    legal: 'Normativ AND 600/2010 · HG 525/1996 · SR 13330/2014 · Ghid ITE (Institute of Transportation Engineers)',
    output: [
      { ico: '🚦', txt: 'Trafic generat: vehicule/oră la vârful de dimineață și seară' },
      { ico: '🗺', txt: 'Harta intersecțiilor afectate în raza 300m' },
      { ico: '📊', txt: 'Nivel de serviciu (LOS A-F) pentru accesele principale' },
      { ico: '🏗', txt: 'Măsuri propuse: sensuri, semaforizare, marcaje, sens giratoriu' },
      { ico: '🚶', txt: 'Trafic pietonal generat și conexiuni la rețeaua de transport public' },
    ],
    nu: ['Nu se aplică proiectelor mici (1-5 unități) cu acces direct din stradă existentă', 'Modelarea detaliată a intersecțiilor necesită software specializat (VISSIM, SIDRA)'],
  },
  patrimoniu: {
    ico: '🏛', label: 'Studiu Patrimoniu & Istoric',
    badge: 'obligatoriu', badgeLabel: 'Zone protejate / LMI',
    color: '245,158,11',
    fn: 'generateIstoricStudy()',
    ce: 'Verifică dacă parcela sau vecinătățile sale se află în zone de protecție ale monumentelor istorice (LMI), în situri arheologice, în zone construite protejate (ZCP) sau în zone de interes etnografic. Identifică restricțiile de construire aplicabile și avizele obligatorii.',
    dece: 'Construirea în zona de protecție a unui monument istoric fără avizul DJCPN (Direcția Județeană pentru Cultură) este contravenție și poate atrage și demolarea. Verificarea prealabilă evită cheltuieli inutile dacă terenul se dovedește a fi în zonă protejată.',
    legal: 'Legea 422/2001 (monumente istorice) · OG 43/2000 (situri arheologice) · Legea 350/2001 · HG 493/2004',
    output: [
      { ico: '🏛', txt: 'Verificare LMI: monumente istorice în raza 200m cu cod și categorie' },
      { ico: '🗺', txt: 'Zone de protecție: ZCP, sit arheologic, rezervație arhitecturală' },
      { ico: '⚠️', txt: 'Restricții aplicabile: înălțime, materiale, culori, retrageri speciale' },
      { ico: '📋', txt: 'Avize necesare: DJCPN, MCID, Comisia Națională a Monumentelor' },
      { ico: '🔍', txt: 'Surse verificate: CIMEC, RGIS, PUG zonă protejată' },
    ],
    nu: ['Nu înlocuiește expertiza istorică realizată de specialist atestat MCID', 'Lista LMI se actualizează periodic — verificați întotdeauna pe cimec.ro înainte de depunerea dosarului'],
  },
  eim: {
    ico: '🌿', label: 'Studiu Impact asupra Mediului (EIM)',
    badge: 'obligatoriu', badgeLabel: 'Proiecte cu impact semnificativ',
    color: '134,239,172',
    fn: 'generateEnvironmentalImpact()',
    ce: 'Evaluează impactul proiectului de construire asupra factorilor de mediu: aer, apă, sol, biodiversitate, peisaj și populație. Identifică măsurile de prevenire și reducere a impactului negativ, conform metodologiei APM (Agenția pentru Protecția Mediului).',
    dece: 'Legea 292/2018 și HG 1076/2004 impun Acordul de Mediu emis de APM pentru proiectele care depășesc anumite praguri (suprafață, funcțiune, localizare în zone sensibile). Fără acord de mediu, AC nu poate fi emisă. Studiul preliminar ajută la identificarea din timp a obligațiilor de mediu.',
    legal: 'Legea 292/2018 (evaluare mediu) · HG 1076/2004 · OUG 195/2005 · Directiva UE 2011/92/UE (EIA)',
    output: [
      { ico: '🌿', txt: 'Factori de mediu analizați: aer, apă, sol, biodiversitate, peisaj' },
      { ico: '⚠️', txt: 'Identificare impacte semnificative în faza de construire și exploatare' },
      { ico: '🔧', txt: 'Măsuri de reducere impact: colectare deșeuri, gestionare ape uzate' },
      { ico: '📋', txt: 'Procedura APM: dacă necesită acord de mediu simplu sau EIM complet' },
      { ico: '🗺', txt: 'Verificare Natura 2000: situri protejate în raza 5km' },
    ],
    nu: ['Nu înlocuiește Raportul EIM complet realizat de evaluator de mediu acreditat', 'Studiul preliminar nu este acceptat de APM ca documentație oficială de avizare'],
  },

  // ── STUDII TEHNICO-ECONOMICE ────────────────────────────────────────────
  amplasament: {
    ico: '🗺', label: 'Studiu de Amplasament & Teritoriu',
    badge: 'recomandat', badgeLabel: 'Document fundament · 13 pagini',
    color: '129,140,248',
    fn: 'generateStudiuAmplasament()',
    ce: 'Analizează amplasamentul în 12 domenii tehnice integrate: indicatori PUG, situație juridică, infrastructură edilitară, patrimoniu LMI, servituți, mobilitate, seismicitate, însorire, vânt, zgomot, geotehnică, impact mediu și estimare financiară. Constituie documentul fundament pe baza căruia se elaborează toate studiile de specialitate ulterioare.',
    dece: 'Studiul de Amplasament centralizează toate informațiile tehnice relevante despre un teren înainte de a angaja cheltuieli de proiectare. Determină automat lista studiilor obligatorii și avizelor necesare, economisind timp și evitând surprize în procesul de autorizare.',
    legal: 'Legea 350/2001 (urbanism) · HG 525/1996 (RGU) · P100-1/2013 (seismic) · CR 1-1-4/2012 (vânt) · OMS 119/2014 (însorire) · NP 074/2014 (geotehnică) · HG 930/2016 (aeronautic) · Legea 422/2001 (patrimoniu)',
    output: [
      { ico: '📐', txt: 'Indicatori PUG complet: POT/CUT/H/SV/Pk/retrageri + bilanț suprafețe' },
      { ico: '⚖️', txt: 'Situație juridică cadastrală: CF, servituți, acces, sarcini' },
      { ico: '🔌', txt: 'Infrastructură tehnico-edilitară: rețele disponibile, consumuri, costuri branșare' },
      { ico: '🏛', txt: 'Patrimoniu LMI: zone protejate, monumente, distanțe, procedura aviz DJCPN' },
      { ico: '🌍', txt: 'Seismicitate P100-1/2013: zona seismică, ag, Tc, categoria geotehnică' },
      { ico: '☀️', txt: 'Însorire OMS 119/2014: altitudine solară 21 dec., conformitate' },
      { ico: '💨', txt: 'Vânt CR 1-1-4/2012: presiune vânt qp(H), zona, clasificare teren' },
      { ico: '🔊', txt: 'Zgomot SR 10009:2017: surse identificate, nivel echivalent Leq' },
      { ico: '🪨', txt: 'Geotehnică NP 074/2014: profil geologic, nivel freatic, capacitate portantă' },
      { ico: '✈️', txt: 'Aeronautic AACR/ROMATSA: distanță aeroport, H max admisă ICAO' },
      { ico: '🌿', txt: 'Impact mediu: aer, apă, sol, deșeuri, arii protejate, Natura 2000' },
      { ico: '📊', txt: 'Dashboard studii necesare: 12 domenii cu verdict OBLIGATORIU/RECOMANDAT/OK' },
      { ico: '💶', txt: 'Estimare financiară primară: cost construcție, teren, ROI orientativ' },
    ],
    nu: ['Nu există excepții — recomandat pentru orice investiție imobiliară indiferent de dimensiune', 'Nu înlocuiește studiile tehnice de specialitate individuale obligatorii prin lege', 'Valorile sunt orientative — verificarea obligatorie la ANCPI, Primărie și operatori utilități'],
  },
  isu: {
    ico: '🔥', label: 'Studiu de Siguranță la Foc (ISU)',
    badge: 'obligatoriu', badgeLabel: 'H>8m sau SD>600mp · 12 pagini',
    color: '248,113,113',
    fn: 'generateSSF()',
    ce: 'Verifică dacă clădirea propusă respectă normele de securitate la incendiu conform P118-1/2015 și P118-2/2013. Calculează categoria de pericol de incendiu, gradul de rezistență la foc necesar, dimensionează căile de evacuare și determină dacă este obligatoriu avizul ISU Moldova înainte de Autorizația de Construire.',
    dece: 'Orice clădire cu înălțime mai mare de 8m sau suprafață desfășurată mai mare de 600mp necesită Avizul de Securitate la Incendiu de la ISU Moldova înainte de emiterea Autorizației de Construire. Construirea fără acest aviz atrage oprirea lucrărilor și amenzi contravenționale.',
    legal: 'P118-1/2015 (securitate incendiu construcții) · P118-2/2013 (instalații stingere) · Legea 307/2006 (apărare incendii) · Ordinul MAI 163/2007 · Legea 50/1991 art. 7',
    output: [
      { ico: '🏗', txt: 'Clasificarea clădirii: categorie pericol incendiu (A-E) și grad rezistență foc (I-V)' },
      { ico: '🚒', txt: 'Căi de acces ISU: lățime min. 3.5m (1 vehicul) / 5.5m (2 vehicule), dist. max. 80m' },
      { ico: '💧', txt: 'Hidranți exteriori și interiori — necesitate, amplasament, debit de calcul' },
      { ico: '🔔', txt: 'Sisteme DASI (detecție-alarmare-stingere incendiu) — când sunt obligatorii' },
      { ico: '🚪', txt: 'Evacuare persoane: distanțe maxime, număr scări, lățimi coridoare (min. 1.2m)' },
      { ico: '🧱', txt: 'Compartimentare la foc: pereți, planșee, uși rezistente — REI minim' },
      { ico: '📋', txt: 'Procedura aviz ISU: documente necesare, taxe, termen emitere (30-60 zile)' },
      { ico: '🪜', txt: 'Scară pompieri — obligatorie la H>28m, cu specificații de montaj' },
    ],
    nu: ['Clădiri cu H≤8m ȘI suprafață desfășurată ≤600mp fără funcțiuni cu pericol special', 'Construcții provizorii sau anexe gospodărești fără funcțiune publică', 'Nu înlocuiește avizul oficial ISU Moldova obligatoriu pentru dosarul AC'],
  },
  relevee: {
    ico: '📐', label: 'Relevee Instant',
    color: '212,175,55',
    ce: ['Planuri funcționale orientative generate instant din datele parcelei active',
         'Plan nivel per etaj cu distribuție camere conform NP 057/2002',
         'Fațadă principală cu ferestre, balcoane și cotare',
         'Secțiune transversală cu plăci, scări și nivel freatic estimat',
         'Vedere axonometrică 3D a volumului generat',
         'Verificare însorire OMS 119/2014 per cameră',
         'Verificare căi evacuare ISU P118-2/2013',
         'Bilanț complet suprafețe + verificare normative'],
    fn: 'generateRelevee()',
    dece: 'Releveele orientative UrbanX generează instant planuri funcționale din datele cadastrale și urbanistice ale parcelei active. Documentul orientativ indică distribuția optimă a spațiilor conform normativelor românești în vigoare și poate fi folosit ca bază de discuție cu arhitectul de proiect.',
    output: ['Plan Parter și Planuri Etaj (toate nivelurile)', 'Fațadă principală cotată', 'Secțiune transversală A-A', 'Vedere axonometrică', 'Bilanț suprafețe + tabel normative'],
    nu: ['Nu înlocuiește proiectul tehnic elaborat de arhitect OAR autorizat', 'Dimensiunile sunt estimative — proiectul tehnic stabilește cotele exacte', 'Nu constituie documentație pentru Autorizație de Construire'],
    legal: ['NP 057/2002 — Norme proiectare locuințe', 'OMS 119/2014 — Cerințe igienă', 'P118-2/2013 — Securitate incendiu', 'NP 051/2012 — Accesibilitate PMR', 'P100-1/2013 — Proiectare seismică'],
  },
  fezabilitate: {
    ico: '📊', label: 'Studiu de Fezabilitate / DALI',
    badge: 'recomandat', badgeLabel: 'Tehnico-economic · 15 pagini',
    color: '212,175,55',
    fn: 'generateStudiuFezabilitate()',
    ce: 'Analizează viabilitatea economică a investiției imobiliare prin calcule financiare cu parametri personalizabili: preț construcție, preț teren, chirie de referință, preț vânzare și rată de ocupare. Compară 3 variante tehnice (conservatoare/recomandat/maxim), calculează ROI brut, payback-ul și profitul estimat la vânzare.',
    dece: 'Studiul de Fezabilitate / DALI este obligatoriu conform HG 907/2016 pentru proiectele cu finanțare publică. Pentru investițiile private, constituie instrumentul esențial de decizie înainte de cheltuielile de proiectare. Validează sau infirmă oportunitatea economică a investiției.',
    legal: 'HG 907/2016 (documentații tehnico-economice) · Legea 50/1991 · Legea 350/2001 · NP 074/2014 · P100-1/2013 · OMS 119/2014 · NP 051/2012 (parcaje)',
    output: [
      { ico: '🔢', txt: 'Indicatori urbanistici PUG: POT/CUT/H/SV/Pk conf. RLU UTR — bilanț suprafețe' },
      { ico: '⚖️', txt: '3 variante tehnice comparate: S1 conservator / S2 recomandat / S3 maxim RLU' },
      { ico: '✏️', txt: 'Parametri financiari EDITABILI: preț construcție, teren, chirie, vânzare, rată ocupare' },
      { ico: '📈', txt: 'Analiză cash flow pe 20 ani cu scenarii de chirie și vânzare' },
      { ico: '💶', txt: 'ROI brut, payback period și profit estimat la vânzare — cu valorile tale' },
      { ico: '⚠️', txt: 'Matrice de risc: urbanistic, geotehnic, permitting, financiar, piață' },
      { ico: '🗓', txt: 'Calendar implementare pe 10 faze: de la CU la Recepție + Intabulare CF' },
      { ico: '📝', txt: 'Export Word (.doc) editabil — deschis cu Microsoft Word sau LibreOffice' },
    ],
    nu: ['Obligatoriu prin lege NUMAI pentru proiecte cu finanțare publică (HG 907/2016)', 'Pentru investiții private este recomandat, nu impus prin lege', 'Valorile financiare sunt orientative ±25-30% — devizul definitiv necesită proiect tehnic'],
  },

  apa: {
    ico: '💧', label: 'Studiu Gospodărire Ape — DTGA',
    badge: 'obligatoriu', badgeLabel: 'Aviz Apele Române',
    color: '34,211,238',
    fn: 'generateWaterStudy()',
    ce: 'Documentează contextul hidrografic al amplasamentului (bazin, sub-bazin, cursuri de apă, Direcția Apelor competentă), evaluează riscul de inundabilitate conform hărților INHGA/PMRI, caracterizează apele subterane (NFA, tip sol, portanță) și prezintă toate documentele și studiile necesare pentru obținerea Avizului de Gospodărire a Apelor (AGA) de la Apele Române.',
    dece: 'Avizul de Gospodărire a Apelor (AGA) este OBLIGATORIU conform Legii 107/1996 Art. 48 pentru orice construcție care afectează resursele de apă — inclusiv fundații, racorduri la rețele, amenajări de teren. AGA se obține ÎNAINTE de Autorizația de Construire și este condiție pentru emiterea acesteia de către Primărie.',
    legal: 'Legea Apelor 107/1996 (republicată) · HG 930/2010 (norme metodologice) · Ord. 662/2006 (procedura DTGA) · Dir. 2007/60/CE (HG 846/2010 — risc inundații) · Dir. 2000/60/CE (Directiva Cadru Apă) · NTPA 001/2002 (calitate ape uzate)',
    output: [
      { ico: '🗺', txt: 'Context hidrografic: bazin, sub-bazin, cursuri de apă, Direcția Apelor competentă' },
      { ico: '🌊', txt: 'Evaluarea riscului de inundabilitate (Q100, hărți INHGA, PMRI)' },
      { ico: '🪨', txt: 'Ape subterane: NFA estimat, tip sol, portanță, adâncime fundare' },
      { ico: '📋', txt: 'Conținut DTGA — 10 documente obligatorii cf. Ord. 662/2006' },
      { ico: '🔬', txt: '5 tipuri de studii detaliate (hidrologic, hidrogeologic, inundabilitate, amplasament)' },
      { ico: '⚖️', txt: 'Procedura avizare: 8 etape + termene + taxe orientative' },
      { ico: '🔧', txt: 'Cerințe tehnice ape pluviale + uzate (calcule specifice parcelei)' },
      { ico: '☑️', txt: 'Checklist 10 documente + date complete Direcția Apelor (adresă, tel, email, web)' },
      { ico: '📞', txt: 'Configurație per UAT: 24 municipii — DA, bazin, cursuri, risc inundabilitate' },
    ],
    nu: ['Nu înlocuiește DTGA elaborată de consultant autorizat ANAR/INHGA', 'Valorile NFA și portanță sunt estimative — studiu geotehnic obligatoriu pe amplasament', 'Hărțile de risc la inundații se verifică obligatoriu pe platforma INHGA (www.inhga.ro)'],
  },
};

function infoDrawerOpen(key) {
  const d = RAPORT_INFO[key];
  if(!d) return;
  // Închidem meniurile dropdown înainte
  toggleRapoarteMenu(true);
  const drawer = document.getElementById('info-drawer');
  const backdrop = document.getElementById('info-drawer-backdrop');
  const titleEl = document.getElementById('info-drawer-title');
  const badgeWrap = document.getElementById('info-drawer-badge-wrap');
  const ico = document.getElementById('info-drawer-ico');
  const body = document.getElementById('info-drawer-body');
  if(!drawer) return;

  ico.textContent = d.ico;
  titleEl.textContent = d.label;

  const badgeColors = {
    obligatoriu: 'obligatoriu',
    recomandat: 'recomandat',
    optional: 'optional'
  };
  badgeWrap.innerHTML = `<span class="idr-badge ${badgeColors[d.badge]||'optional'}">${d.badgeLabel}</span>`;

  const outputRows = (d.output||[]).map(o =>
    `<div class="idr-output-row"><span class="idr-output-ico">${o.ico}</span><span class="idr-output-txt">${o.txt}</span></div>`
  ).join('');
  const nuRows = (d.nu||[]).map(n =>
    `<div class="idr-nu-row"><span style="font-size:13px;flex-shrink:0">✕</span><span class="idr-nu-txt">${n}</span></div>`
  ).join('');

  body.innerHTML = `
    <div class="idr-section">Ce analizează</div>
    <p class="idr-text">${d.ce}</p>

    <div class="idr-section">De ce este necesar</div>
    <p class="idr-text">${d.dece}</p>

    <div class="idr-section">Bază legală</div>
    <p class="idr-text" style="font-size:12px;color:#64748b">${d.legal}</p>

    <div class="idr-section">Ce primești în raport</div>
    ${outputRows}

    <div class="idr-section">Când NU se aplică</div>
    ${nuRows}

    <button id="info-drawer-gen-btn" onclick="${d.fn};infoDrawerClose()">
      ${d.ico} Generează ${d.label}
    </button>
    <p style="font-size:10px;color:#334155;text-align:center;margin-top:8px">Document orientativ · UrbanX TSS·FG · Valori preliminare</p>
  `;

  drawer.classList.add('open');
  backdrop.classList.add('open');
}

function infoDrawerClose() {
  document.getElementById('info-drawer')?.classList.remove('open');
  document.getElementById('info-drawer-backdrop')?.classList.remove('open');
}

// Escape key closes drawer
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') infoDrawerClose();
});
