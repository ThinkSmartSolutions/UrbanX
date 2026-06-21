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
  // ═══ MODULE DE DECIZIE & ADMINISTRAȚIE (UrbanX Pro) ═══
  uhi: {
    ico: '🌿', label: 'LOISIR — Insulă de căldură (UHI)', badge: 'recomandat', badgeLabel: 'Mediu & climă · NbS', color: '34,197,94',
    fn: 'window.UHI&&window.UHI.openPanel&&window.UHI.openPanel()',
    ce: 'Calculează efectul de răcire al soluțiilor bazate pe natură (pădure urbană, parc, acoperiș verde, zonă umedă, pavaj permeabil, fântână de răcire) folosind modele empirice validate — câte grade răcorește o intervenție și pe ce rază, plus CO₂ sechestrat. Plus un scorecard verde pe 6 dimensiuni comparat cu Singapore/Copenhaga/Paris.',
    dece: 'România are 9 din 10 veri record în ultimii 15 ani; orașe ca București/Cluj/Craiova au insule de căldură de 4-7°C. Soluțiile verzi-albastre (Nature-Based Solutions) reduc temperatura, poluarea și bolile. Modelul: Singapore „City in a Garden" + Klimaatlas Stuttgart. UrbanX cuantifică impactul intervențiilor înainte de a le finanța.',
    legal: 'Bowler 2010 · Gill 2007 · Santamouris 2013 · C40 Cities · WHO (30% canopy, 300m acces verde) · EU Nature Restoration Law 2023 · EU Biodiversity Strategy 2030',
    output: [
      { ico: '❄', txt: 'Răcire estimată (°C) + rază + CO₂/an per intervenție + simulare cumulată' },
      { ico: '🌳', txt: 'Scorecard verde 6 dimensiuni vs benchmark mondial' },
      { ico: '🛰', txt: 'Hartă insulă de căldură (Landsat/Sentinel LST) + coridoare aer rece — pipeline Copernicus (Faza 2)' },
    ],
    nu: ['Estimări empirice ±30-50% local — nu măsurători', 'Harta termică din satelit + coridoarele Stuttgart necesită server Copernicus (Faza 2)'],
  },
  ansamblu: {
    ico: '🏘️', label: 'Masterplan ansamblu (lotizare ghidată)', badge: 'recomandat', badgeLabel: 'Proiectare · metodologie PUZ/PUD', color: '168,85,247',
    fn: 'window.Ansamblu&&window.Ansamblu.openWizard&&window.Ansamblu.openWizard()',
    ce: 'Ghidează proiectarea unui ansamblu (case + colective + comerț + grădiniță + biserică + parc) în ORDINEA corectă: 1) programul funcțional, 2) accesele (min 2, ISU), 3) ierarhia stradală pe 3 niveluri (colector → local → woonerf), 4) separarea fluxurilor incompatibile (grădiniță drop-off, comerț pe colector, biserică cu parcare temporară), 5) abia apoi loturile + edificabilul pe ce rămâne. Verifică aprobabilitatea (accese, verde, densitate, continuitate pietonală).',
    dece: 'Greșeala frecventă (și în versiunea veche de lotizare) e să pleci de la POT/CUT + retrageri și să tai loturi. Aprobabilitatea unui PUZ/PUD depinde de coerența circulațiilor și separarea fluxurilor — pietonalul se proiectează ÎNAINTEA mașinii ("poate un copil merge în siguranță din orice locuință la grădiniță/parc?"). UrbanX impune metodologia corectă, lucru pe care niciun tool din RO nu-l face.',
    legal: 'Legea 350/2001 (PUZ/PUD) · NP 068/2002 (căi de circulație) · Legea 24/2007 (spații verzi 8 mp/loc) · GD 525/1996 (parcaje) · Legea 50/1991 (acces ISU)',
    output: [
      { ico: '📋', txt: 'Bilanț suprafețe: circulații ~22% + verde + echipamente ÎNAINTEA loturilor' },
      { ico: '🛣', txt: 'Ierarhie stradală 3 niveluri cu profile + rol' },
      { ico: '🔀', txt: 'Reguli de amplasare per funcțiune (separarea fluxurilor)' },
      { ico: '☑️', txt: 'Verificări de aprobabilitate (accese/ISU, verde, CUT, pietonal) + brief PDF' },
    ],
    nu: ['Schemă de organizare + brief orientativ — desenul PUZ/PUD final (loturi, profile, plan reglementări) = proiectant atestat RUR', 'Pentru subdivizare simplă geometrică folosește „Lotizare" clasic'],
  },
  fisa360: {
    ico: '🧭', label: 'Fișa parcelei 360°', badge: 'recomandat', badgeLabel: 'Hub · toate modulele', color: '212,175,55',
    fn: 'window.Fisa360&&window.Fisa360.open&&window.Fisa360.open()',
    ce: 'Rulează simultan TOATE motoarele UrbanX pe parcela selectată și prezintă o imagine unificată: scor de conformitate (Dosar), avize necesare (CAU), trafic generat (Flux), randament investițional (Pro-formă), oportunitate (Investment Score), amprentă de carbon, monumente în proximitate (Patrimoniu) și sesizări legate. Fiecare indicator deschide modulul complet.',
    dece: 'Este „inima" care leagă tot ecosistemul: în loc să deschizi 9 module separate pentru o parcelă, vezi totul într-un singur ecran — relevant pentru decident, investitor și administrație. Pentru trafic/pro-formă/carbon folosește scenariul maxim edificabil ipotetic (teren × CUT).',
    legal: 'Agregare din modulele UrbanX (cadastru, PUG, registre CAU/Sesizări/Patrimoniu) · orientativ, nu substituie documentațiile oficiale',
    output: [
      { ico: '💯', txt: 'Scor conformitate + KPI: investiție, marjă, carbon, trafic, avize' },
      { ico: '📋', txt: 'Avize necesare + patrimoniu în rază + sesizări + istoric autorizații' },
      { ico: '🔗', txt: 'Fiecare indicator → deschide modulul complet' },
    ],
    nu: ['Cifrele trafic/pro-formă/carbon folosesc scenariul ipotetic maxim — rulează modulul pt valori reale', 'Nu substituie analizele detaliate per modul'],
  },
  ux_capacitate: {
    ico: '🏗️', label: 'Capacitate & Conformitate UAT', badge: 'recomandat', badgeLabel: 'Intelligence · administrație', color: '96,165,250',
    fn: 'window.UXI&&window.UXI.openDashboard&&window.UXI.openDashboard()',
    ce: 'Calculează bilanțul cumulativ al infrastructurii unui UAT față de TOT ce e aprobat (nu față de populația curentă): apă, canalizare, locuri de școală/grădiniță, spații verzi, impermeabilizare. La depunerea unui PUZ nou dă un verdict (conformitate / în analiză / blocat) și menține un registru PUZ cu alerte.',
    dece: 'Problema reală: un UAT aprobă PUZ-uri individual, fiecare pare ok, dar nimeni nu vede agregatul (ex. Florești: 38 PUZ-uri = 47.000 locuitori pe infrastructură de 12.000). Acest modul arată adevărul cumulativ ÎNAINTE ca aprobarea să se dea — pentru arhitectul șef și primar.',
    legal: 'Legea 350/2001 · NTPA 013/2002 (apă 150 l/loc/zi) · Legea 24/2007 (spații verzi 8 mp/loc) · norme MEN (1 loc școală / 4 locuințe) · praguri UE impermeabilizare',
    output: [
      { ico: '📊', txt: 'Bilanț pe indicatori: % utilizare vs capacitate, status verde/galben/roșu' },
      { ico: '⚖️', txt: 'Verdict PUZ nou: conformitate preliminară / în analiză / BLOCAT' },
      { ico: '🗂', txt: 'Registru PUZ persistent + alerte automate la depășire prag' },
      { ico: '📄', txt: 'Capitol „Capacitate & Conformitate" în Masterplan/PMUD' },
    ],
    nu: ['Capacitățile de infrastructură sunt ESTIMATE din populație — necesită date verificate de la operatori (apă-canal, ISJ)', 'Scorul e orientativ, decizia rămâne a arhitectului șef și CL'],
  },
  cau: {
    ico: '📋', label: 'CAU — Acorduri Unice (CU + avize)', badge: 'recomandat', badgeLabel: 'Administrație · autorizare', color: '167,139,250',
    fn: 'window.CAU&&window.CAU.openPanel&&window.CAU.openPanel()',
    ce: 'Determină automat avizele necesare pentru Certificatul de Urbanism (9 reguli: proximitate rețele din OSM, ISU, Cultură, Apele Române, Drumuri, CFR, Mediu, DSP, ANRE) și gestionează fluxul: solicitantul depune cererea → primăria emite CU → solicitantul comandă obținerea avizelor (contra-cost) → primăria le obține de la avizatori în numele lui → aviz tacit la 30 zile → Acord Unic.',
    dece: 'Procesul de avizare e manual, lent (3-18 luni) și opac. Mecanismul Comisiei de Acorduri Unice (ghișeu unic) permite primăriei să obțină avizele în numele solicitantului. Modulul calculează lista corectă de avize (un aviz lipsă invalidează AC-ul) și urmărește termenele.',
    legal: 'Legea 50/1991 (art. 5, art. 7 — aviz tacit) · Ordin 839/2009 · Ordin 233/2016 (conținut CU) · legi sectoriale avize (307/2006 ISU, 422/2001 Cultură, 107/1996 Ape, OG 43/1997 Drumuri, 292/2018 Mediu)',
    output: [
      { ico: '📋', txt: 'Lista avizelor obligatorii/recomandate + deținător + bază legală + tarif' },
      { ico: '💳', txt: 'Calcul taxe: CU + serviciu CAU + tarife avizatori' },
      { ico: '⏱', txt: 'Tracking 30 zile + aviz tacit favorabil automat la expirare' },
      { ico: '📄', txt: 'PDF Certificat de Urbanism + Acord Unic' },
    ],
    nu: ['Rețelele din OSM = date estimate (confirmați cu operatorii)', 'Dispecerizarea reală prin email/API + portalul avizatorilor + plata online = etapă viitoare (necesită server)', 'Nu înlocuiește CU-ul oficial emis de primărie'],
  },
  dosar: {
    ico: '🗂️', label: 'Dosar Digital al imobilului', badge: 'recomandat', badgeLabel: 'Cetățean · transparență', color: '94,234,212',
    fn: 'window.Dosar&&window.Dosar.open&&window.Dosar.open()',
    ce: 'Agregă într-un singur „pașaport" toate datele unei parcele din modulele UrbanX: identitate cadastrală, reglementări PUG (POT/CUT), istoricul autorizațiilor (CU/AC din CAU), sesizările legate, plus un scor de conformitate 0-100.',
    dece: 'În România, cumpărătorul/dezvoltatorul nu are o sursă unică pentru istoricul unui imobil (există în UK Land Registry, Estonia, Olanda). UrbanX are deja 80% din date — le prezintă unificat, per parcelă, nu împrăștiat pe tipuri de documente.',
    legal: 'Legea 7/1996 (cadastru și publicitate imobiliară) · date publice; scorul de conformitate e indicativ, fără valoare legală',
    output: [
      { ico: '🪪', txt: 'Identitate: nr. cadastral, suprafață, UAT, UTR' },
      { ico: '📐', txt: 'Reglementări PUG + istoric CU/AC + sesizări' },
      { ico: '💯', txt: 'Scor conformitate 0-100 (indicativ) + extras PDF' },
    ],
    nu: ['Tranzacțiile ANCPI și riscul climatic per-parcelă necesită surse externe', 'Datele cu valoare juridică (CF, sarcini) se obțin de la ANCPI/OCPI'],
  },
  sesizari: {
    ico: '📢', label: 'Sesizări urbane', badge: 'optional', badgeLabel: 'Cetățean · participare', color: '94,234,212',
    fn: 'window.Sesizari&&window.Sesizari.openForm&&window.Sesizari.openForm()',
    ce: 'Raportare georeferențiată a problemelor urbane (construire ilegală, imobil abandonat, stradă degradată, deșeuri etc.), cu hartă, statut și statistici. La „construire ilegală" verifică automat în CAU dacă parcela are autorizație — dacă nu, marchează prioritate mare.',
    dece: 'Azi cetățenii raportează prin telefon/email, fără urmărire, iar UAT-ul nu are o imagine agregată. Inspirat din FixMyStreet (UK, 2007). Sesizările alimentează Dosarul Digital și scorul de conformitate.',
    legal: 'OUG 57/2019 (Codul administrativ) · transparență decizională (Legea 52/2003)',
    output: [
      { ico: '📍', txt: 'Sesizare pe hartă + categorie + prioritate + statut' },
      { ico: '🔗', txt: 'Cross-check automat cu CAU (există AC?)' },
      { ico: '📈', txt: 'Listă, hartă pini, statistici (timp mediu rezolvare)' },
    ],
    nu: ['Foto upload + email + multi-user (oraș întreg) = etapă viitoare (server)'],
  },
  notificari: {
    ico: '🔔', label: 'Notificări vecini (planning alerts)', badge: 'optional', badgeLabel: 'Cetățean · Aarhus', color: '94,234,212',
    fn: 'window.Notificari&&window.Notificari.openPanel&&window.Notificari.openPanel()',
    ce: 'Te abonezi la o zonă (parcelă + rază sau tot UAT-ul) și primești alertă când se depune ceva în apropiere (CU din CAU, sesizări), cu termenul de obiecție de 10 zile. Poți depune obiecții digital.',
    dece: 'Notificarea vecinilor azi = afiș fizic + un anunț în ziar, pe care nimeni nu le citește — încălcând obligațiile Convenției Aarhus. Inspirat din PlanningAlerts.org.au. Crește participarea publică reală.',
    legal: 'Legea 50/1991 (art. 6 afișare, art. 7¹ termen obiecție 10 zile) · Ordin 839/2009 · Convenția Aarhus (participare publică)',
    output: [
      { ico: '🔔', txt: 'Abonare la adresă/zonă/UAT (in-app)' },
      { ico: '📬', txt: 'Feed evenimente în rază + termen obiecție' },
      { ico: '✋', txt: 'Depunere obiecții' },
    ],
    nu: ['SUPLIMENTEAZĂ afișajul fizic (nu-l înlocuiește)', 'Emailul real + confirmare = etapă viitoare (server)'],
  },
  heritage: {
    ico: '🏛️', label: 'Inventar Patrimoniu (GIS)', badge: 'recomandat', badgeLabel: 'Administrație · patrimoniu', color: '252,165,165',
    fn: 'window.Heritage&&window.Heritage.openPanel&&window.Heritage.openPanel()',
    ce: 'Inventar GIS al monumentelor și zonelor protejate (LMI), cu hartă. Integrat cu avizarea: o parcelă aflată lângă un monument declanșează automat avizul Cultură obligatoriu în CAU. Diferit de Studiul Patrimoniu PDF (din Rapoarte) — acela e documentul, acesta e baza de date GIS.',
    dece: 'Lista Monumentelor Istorice (LMI) e un PDF, nu un strat GIS — multe clădiri valoroase sunt demolate pentru că nimeni nu știe că sunt protejate. Acest inventar face proximitatea verificabilă automat în fluxul de autorizare.',
    legal: 'Legea 422/2001 (monumente istorice) · LMI (Min. Culturii) — nivel A protecție legală; inventar local/recomandat — fără valoare legală',
    output: [
      { ico: '🗺', txt: 'Hartă monumente (A național / B local / recomandat)' },
      { ico: '🔗', txt: 'Verificare proximitate → aviz Cultură automat în CAU' },
      { ico: '➕', txt: 'Propunere monument (cetățean/UAT)' },
    ],
    nu: ['Importul complet LMI din Excel + geocodare = etapă viitoare', 'Statutul „local/recomandat" nu are valoare legală (doar LMI nivel A)'],
  },
  feaz: {
    ico: '💰', label: 'Pro-formă investițional', badge: 'optional', badgeLabel: 'Investitor · ≠ SF/DALI', color: '196,181,253',
    fn: 'window.Feaz&&window.Feaz.openPanel&&window.Feaz.openPanel()',
    ce: 'Pro-forma de dezvoltator: din indicatorii PUG live (CUT/POT) calculează suprafața vandabilă, costurile (construcție, soft, teren, finanțare), valoarea de dezvoltare (GDV), profitul, marja, IRR, valoarea reziduală a terenului și o matrice de senzitivitate cost×preț.',
    dece: 'Răspunde la „merită investiția?" din perspectiva DEZVOLTATORULUI/INVESTITORULUI. NU este Studiul de Fezabilitate/DALI (HG 907/2016, documentul tehnico-economic — acela e în meniul Rapoarte). Aici e analiza de randament, ca un Argus Developer adaptat la PUG-ul românesc.',
    legal: 'Orientativ. Pentru documentația oficială vezi Studiul de Fezabilitate/DALI (HG 907/2016). Prețuri/costuri estimative EUR/mp.',
    output: [
      { ico: '🏗', txt: 'GBA maximă + suprafață vandabilă din CUT/POT' },
      { ico: '💶', txt: 'Cost total · GDV · profit · marjă · IRR · valoare reziduală teren' },
      { ico: '📊', txt: 'Matrice senzitivitate (cost ±20% × preț ±15%) + PDF' },
    ],
    nu: ['NU înlocuiește SF/DALI HG 907 (doc tehnic) și nici consultanța unui evaluator ANEVAR', 'Prețul de piață real necesită date ANCPI'],
  },
  invest: {
    ico: '📊', label: 'Investment Score (oportunitate)', badge: 'optional', badgeLabel: 'Investitor · scoring', color: '251,191,36',
    fn: 'window.Invest&&window.Invest.openPanel&&window.Invest.openPanel()',
    ce: 'Scor compus de oportunitate investițională 0-100 pe parcelă, care integrează TOATE modulele: potențial urbanistic (PUG), risc (proximitate patrimoniu + sesizări deschise), bariere (mărime parcelă), piață și locație. Fiecare componentă are flag de calitate (real/estimat/neutru).',
    dece: 'Pentru fonduri, dezvoltatori și investitori instituționali care prioritizează achiziții. Model inspirat din HouseCanary / Parcl Labs / Green Street. Este capstone-ul care leagă toate modulele într-un singur indicator.',
    legal: 'Orientativ — NU este sfat de investiție. Componentele de piață necesită date ANCPI/OSM.',
    output: [
      { ico: '💯', txt: 'Scor 0-100 + etichetă oportunitate' },
      { ico: '🧩', txt: 'Defalcare pe 5 componente cu pondere + flag calitate' },
    ],
    nu: ['Componenta de piață e neutră fără date ANCPI', 'Nu constituie recomandare financiară'],
  },
  portfolio: {
    ico: '🏦', label: 'Portfolio Due Diligence', badge: 'optional', badgeLabel: 'Bănci/fonduri · DD', color: '251,191,36',
    fn: 'window.Portfolio&&window.Portfolio.openPanel&&window.Portfolio.openPanel()',
    ce: 'Due diligence urbanistic automat pe un portofoliu de parcele: agregă Dosarul fiecăreia (scor, autorizații, sesizări, proximitate patrimoniu), evidențiază red flags și produce un raport DD. Înlocuiește săptămâni de muncă manuală de avocat/consultant.',
    dece: 'Băncile (colateral), fondurile (achiziții), avocații și consultanții (CBRE/JLL) fac DD manual, lent. Inspirat din Drooms / CBRE DD. Pre-screening rapid pe sute de parcele.',
    legal: 'Orientativ. Verificarea juridică finală (extras CF, sarcini, ipoteci, litigii) se face la ANCPI/OCPI și de un avocat.',
    output: [
      { ico: '📋', txt: 'Tabel parcele cu scor + red flags per imobil' },
      { ico: '⚠️', txt: 'Sumar portofoliu: scor mediu, flags, suprafață totală' },
      { ico: '📄', txt: 'Raport DD PDF' },
    ],
    nu: ['Nu înlocuiește DD juridic complet de la ANCPI/avocat'],
  },
  lvc: {
    ico: '📈', label: 'Land Value Capture', badge: 'optional', badgeLabel: 'Administrație · fiscal', color: '196,181,253',
    fn: 'window.LVC&&window.LVC.openPanel&&window.LVC.openPanel()',
    ce: 'Calculează cât valoare adaugă infrastructura publică / rezonarea terenului privat (plusvaloarea) și ce contribuție e corect de negociat cu dezvoltatorul, ca EUR/mp ADC. Model ZAC (Franța), CIL (UK), reparcelación (Spania).',
    dece: 'Când UATul face un drum sau extinde rețele, valoarea terenului privat crește 300-500%; publicul plătește infrastructura, proprietarul încasează plusvaloarea. UrbanX cuantifică ce e corect de recuperat pentru comunitate.',
    legal: 'România NU are mecanism LVC direct în lege (2025) — contribuția e VOLUNTARĂ, negociată în acordul PUZ (Legea 350/2001 Art. 56)',
    output: [
      { ico: '📈', txt: 'Plusvaloare teren (%) + totală' },
      { ico: '🤝', txt: 'Contribuție sugerată (EUR/mp ADC) + comparabile UK/Franța' },
      { ico: '📄', txt: 'Notă de negociere PDF' },
    ],
    nu: ['Contribuția e voluntară (nu există obligație legală în RO)', 'Valorile cer evaluare ANEVAR + consultanță juridică'],
  },
  carbon: {
    ico: '🌍', label: 'Carbon Tracker (CO₂ · ESG)', badge: 'optional', badgeLabel: 'ESG · EU Taxonomy', color: '134,239,172',
    fn: 'window.Carbon&&window.Carbon.openPanel&&window.Carbon.openPanel()',
    ce: 'Calculează amprenta de carbon a unei dezvoltări: carbon înglobat (construcție), operațional (utilizare × grid RO), transport indus (din logica Flux) și total pe 30 ani, cu etichetă verde A-D și context față de ținta EU 2030.',
    dece: 'Reglementările UE se înăspresc (CSRD, EU Taxonomy, Covenant of Mayors). Dezvoltatorii au nevoie de date de carbon pentru finanțare verde, băncile pentru creditare sustenabilă, UAT-urile pentru raportare UE.',
    legal: 'IPCC 2023 · RICS embodied carbon · grid RO ~0.28 kg CO₂/kWh (ENTSO-E) · EU 2030 (-55% vs 1990) · EU Taxonomy',
    output: [
      { ico: '🏗', txt: 'Carbon înglobat + operațional + transport' },
      { ico: '🏷', txt: 'Etichetă verde A-D + economie cu structură din lemn' },
      { ico: '📄', txt: 'Raport carbon PDF (ESG)' },
    ],
    nu: ['Factori estimativi — orientativ pentru ESG', 'Nu înlocuiește un audit de carbon certificat'],
  },
  flux_trafic: {
    ico: '🚦', label: 'Trafic interactiv (Flux)', badge: 'optional', badgeLabel: 'Mobilitate · ≠ Studiu PDF', color: '52,211,153',
    fn: 'window.Flux&&window.Flux.openStudiu&&window.Flux.openStudiu()',
    ce: 'Calculator interactiv + hartă pentru impactul de trafic al unui PUZ/PUD: generarea deplasărilor (rate ITE adaptate RO), distribuție, repartiție modală, încărcarea intersecțiilor (v/c, LOS), necesar parcare și emisii CO₂ — cu overlay pe hartă.',
    dece: 'Permite o pre-analiză rapidă a traficului generat de o dezvoltare, direct pe parcela selectată. Diferit de Studiul de Impact Trafic PDF (din Rapoarte) — acela e documentul; acesta e motorul interactiv care îl poate alimenta.',
    legal: 'NP 068/2002 · STAS 10144 · ITE Trip Generation (adaptat RO) · orientativ, nu substituie model de trafic calibrat (Visum)',
    output: [
      { ico: '🚗', txt: 'Deplasări vârf AM/PM + zilnic, pe moduri' },
      { ico: '🚦', txt: 'v/c + LOS pe intersecții, overlay hartă' },
      { ico: '📄', txt: 'Studiu de trafic PDF + capitol PMUD' },
    ],
    nu: ['NU este model de trafic calibrat (Visum/PTV)', 'Studiul de Impact Trafic oficial (PDF) e în meniul Rapoarte'],
  },

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
  restrictii: {
    ico: '🚧', label: 'Studiu Restricții & Zone de Risc',
    badge: 'fundamentare', badgeLabel: 'Toate amplasamentele',
    color: '248,113,113',
    fn: 'generateStudiuRestrictii()',
    ce: 'Identifică și tratează restricțiile de construire aplicabile parcelei conform legislației naționale și europene: risc seismic (P100), inundații (Directiva 2007/60/CE), alunecări de teren / stabilitate (HG 447/2003), zonă costieră (OUG 202/2002), arii naturale protejate și Delta (OUG 57/2007, Natura 2000), precum și zone de protecție speciale (baraje, mine, saline, porturi). Profilul de risc este determinat din date geospațiale (cotă teren și declivitate din DEM), zonarea seismică și datele hidrografice ale Administrației Bazinale de Apă.',
    dece: 'Restricțiile de risc natural condiționează autorizarea și pot face un teren neconstruibil sau scump de fundat. Identificarea lor din faza de concept evită blocaje la avizare, fundamentează condițiile din Certificatul de Urbanism și ajută beneficiarul să bugeteze din timp avizele și studiile de specialitate.',
    legal: 'P100-1/2013 (seismic) · Legea 107/1996 + Dir. 2007/60/CE (ape/inundații) · HG 447/2003 + Legea 575/2001 (alunecări) · OUG 202/2002 (zonă costieră) · OUG 57/2007 + Dir. 92/43/CEE (arii protejate) · Legea 82/1993 (RBDD) · NP 074/2014',
    output: [
      { ico: '⚠️', txt: 'Profil de risc sintetic: seismic, inundații, alunecări, costier, arii protejate' },
      { ico: '🌍', txt: 'Risc seismic: ag, Tc, zona și cerințe de proiectare antiseismică' },
      { ico: '💧', txt: 'Risc inundații: bazin, curs de apă, zonă inundabilă, aviz ABA' },
      { ico: '⛰', txt: 'Stabilitate teren: declivitate (DEM), susceptibilitate alunecări' },
      { ico: '📋', txt: 'Sinteză avize/studii necesare + recomandări proiectant/beneficiar/autorități' },
    ],
    nu: ['Document preliminar de fundamentare — nu înlocuiește studiile de specialitate certificate (geotehnic, hidrologic, expertiză seismică, evaluare adecvată)', 'Nivelurile de risc sunt estimative; se confirmă pe sursele oficiale (MMAP/ANAR, MDLPA, ANRM, administrații arii protejate)'],
  },
  pmud: {
    ico: '🚍', label: 'PMUD — Plan Mobilitate Urbană Durabilă',
    badge: 'strategic', badgeLabel: 'Nivel UAT · obligatoriu fonduri',
    color: '52,211,153',
    fn: 'generatePMUD()',
    ce: 'Generează un Plan de Mobilitate Urbană Durabilă (PMUD/SUMP) la nivel de UAT, structurat în cele 8 componente oficiale (ghid MDLPA + metodologia EU SUMP/ELTIS): analiza situației existente, modelul de transport, evaluarea impactului, viziune și ținte (KPI), direcții de acțiune și măsuri, evaluarea scenariilor, plan de acțiune și finanțare, monitorizare. Indicatori de mobilitate calculați din date (motorizare INS, rețea OSM, calitate aer OpenAQ live unde există), cu distribuție modală actual vs. țintă 2030 și analiză cost-beneficiu pe scenarii.',
    dece: 'PMUD aprobat este condiție de eligibilitate pentru majoritatea finanțărilor pe mobilitate urbană (POR, PNRR). Documentul fundamentează strategia de mobilitate a orașului, prioritizează proiectele și aliniază orașul la Pactul Verde European și Strategia Națională de Mobilitate.',
    legal: 'Ghid MDLPA elaborare PMUD · Liniile directoare EU SUMP (ELTIS) · Legea 350/2001 · Directiva 2008/50/CE (calitate aer) · Pactul Verde European',
    output: [
      { ico: '🚗', txt: 'Distribuție modală actuală vs. țintă SUMP 2030 (auto/TP/activ)' },
      { ico: '🚌', txt: 'Indicatori: motorizare, acoperire TP, viteză comercială, piste' },
      { ico: '🌍', txt: 'Impact: emisii CO2, calitate aer (PM2.5/NO2), siguranță rutieră' },
      { ico: '🎯', txt: 'Obiective și ținte KPI cuantificate cu orizont 2030' },
      { ico: '💶', txt: 'Plan de acțiune: proiecte prioritare, buget, surse POR/PNRR, calendar' },
    ],
    nu: ['Document de fundamentare (pre-PMUD) — PMUD final necesită recensământ de trafic, anchete de mobilitate și model calibrat de consultant atestat', 'Indicatorii sunt estimări calibrate; se validează cu primăria și operatorii de transport'],
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
    ico: '🗺', label: 'Studiu de Amplasament & Context Teritorial',
    badge: 'recomandat', badgeLabel: 'Analiză teritorială · 13 pagini',
    color: '129,140,248',
    fn: 'generateStudiuAmplasament()',
    ce: 'Analizează amplasamentul în 12 domenii tehnice <b>teritoriale și urbanistice</b>: indicatori PUG/UTR, situație juridică, infrastructură edilitară, patrimoniu LMI, servituți, mobilitate, seismicitate, însorire, vânt, zgomot, geotehnică, impact mediu și estimare financiară. Constituie documentul fundament pe baza căruia se elaborează toate studiile de specialitate ulterioare.<br><br><b>⚠ Diferit de Memoriu Tehnic Preliminar:</b> acesta analizează <b>TERENUL și CONTEXTUL URBAN</b> (unde construiești, ce restricții există, ce avize trebuie), nu planurile arhitecturale.',
    dece: 'Studiul de Amplasament & Context Teritorial centralizează toate informațiile tehnice despre un teren înainte de cheltuieli de proiectare. Detectează automat conflicte urbanistice, determină lista studiilor obligatorii și avizelor necesare, economisind timp și evitând surprize în autorizare.<br><br>Nu confunda cu <b>Memoriu Tehnic Preliminar</b> care generează <b>planuri arhitecturale</b> (planuri etaje, secțiuni A-A, axonometrie, bilanț suprafețe).',
    legal: 'Legea 350/2001 (urbanism) · HG 525/1996 (RGU) · P100-1/2013 (seismic) · CR 1-1-4/2012 (vânt) · OMS 119/2014 (însorire) · NP 074/2014 (geotehnică) · HG 930/2016 (aeronautic) · Legea 422/2001 (patrimoniu)',
    output: [
      { ico: '📐', txt: 'Indicatori PUG complet: POT/CUT/H/SV/Pk/retrageri + bilanț suprafețe' },
      { ico: '⚡', txt: 'Conflict Detection Engine: verificare automată H max, AACR, ISU, LMI, SV' },
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
      { ico: '💶', txt: 'Estimare financiară primară: cost construcție SDA, venituri SU, ROI orientativ' },
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
    ico: '📐', label: 'Memoriu Tehnic Preliminar',
    badge: 'recomandat', badgeLabel: 'Pre-proiectare · Arhitectural',
    color: '212,175,55',
    fn: 'generateRelevee()',
    ce: 'Generează instant planuri funcționale orientative pentru clădirea propusă pe parcela activă: plan nivel per etaj cu distribuția camerelor conform NP 057/2002, fațadă principală cotată, secțiune transversală A-A, vedere axonometrică 3D și bilanț complet de suprafețe. <br><br><b>⚠ Diferit de Studiu de Amplasament:</b> acesta este un document <b>ARHITECTURAL</b> (cum arată clădirea pe interior — planuri, secțiuni, suprafețe), nu teritorial.',
    dece: 'Înainte de a angaja un arhitect, Memoriul Tehnic Preliminar UrbanX îți arată în câteva secunde cum ar putea arăta clădirea pe parcela ta: câte apartamente încap, cum sunt distribuite camerele, care sunt suprafețele estimate și dacă volumul respectă indicatorii PUG. Este documentul perfect pentru a porni o discuție cu arhitectul, cu banca sau cu investitorii.<br><br>Nu confunda cu <b>Studiul de Amplasament & Context Teritorial</b> care analizează <b>terenul și contextul urban</b> (UTR, restricții, LMI, utilități), nu propunerea arhitecturală.',
    legal: 'NP 057/2002 (locuințe) · OMS 119/2014 (igienă și însorire) · P118-2/2013 (securitate incendiu) · NP 051/2012 (accesibilitate PMR) · P100-1/2013 (proiectare seismică) · NP 067/2002 (parcaje)',
    output: [
      { ico: '📐', txt: 'Plan Parter și Planuri Etaj pentru toate nivelurile — camere, baie, bucătărie, hol, balcon' },
      { ico: '🏗', txt: 'Fațadă principală cotată cu ferestre, balcoane și regim de înălțime' },
      { ico: '✂', txt: 'Secțiune transversală A-A cu grosimi plăci, scări și nivel freatic estimat' },
      { ico: '📦', txt: 'Vedere axonometrică 3D a volumului propus cu stil arhitectural ales' },
      { ico: '📊', txt: 'Bilanț complet suprafețe: SC, SDA, SU, balcoane, parcaje, spații comune' },
      { ico: '☀', txt: 'Verificare însorire OMS 119/2014 per cameră — CONFORM / ATENȚIE' },
      { ico: '🔥', txt: 'Verificare căi evacuare ISU P118-2/2013 — distanțe la scări, lățimi coridoare' },
      { ico: '✅', txt: 'Tabel normative NP 057: suprafețe minime per tip cameră — status per apartament' },
    ],
    nu: ['Nu înlocuiește proiectul tehnic elaborat și semnat de arhitect cu drept de semnătură OAR', 'Dimensiunile sunt estimative — proiectul tehnic stabilește cotele exacte și soluțiile constructive', 'Nu constituie documentație pentru Autorizație de Construire sau Certificat de Urbanism'],
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

  proiectie_urb: {
    ico: '🏙', label: 'Proiecție Urbanistică 10/20/30 Ani',
    badge: 'strategic', badgeLabel: 'INSE · Scenarii S1/S2/S3',
    color: '100,130,220',
    fn: 'generateProiectieUrbanistica()',
    ce: 'Analizează evoluția demografică și urbanistică a amplasamentului pe orizonturi de 10, 20 și 30 ani. Integrează date INSE (populatie, rata natalitate, migratie), prognoze Eurostat, scenarii S1/S2/S3 de dezvoltare și proiectează indicatorii urbanistici (POT/CUT/H) la revizuirile viitoare de PUG.',
    dece: 'Legea 350/2001 Art. 46 impune revizuirea PUG la 10 ani. Investitorii și băncile finanțatoare solicită tot mai frecvent studii de fezabilitate pe termen lung care includ evoluția demografică. Studiul demonstrează adaptabilitatea proiectului la schimbările urbanistice viitoare.',
    legal: 'Legea 350/2001 (amenajarea teritoriului) · HG 525/1996 (RGU) · PATN — Planul de Amenajare a Teritoriului Național · INSE — date statistice oficiale · Eurostat Romania Demographic Outlook · Strategia Nationala pentru Locuire 2021-2030',
    output: [
      { ico: '📊', txt: 'Proiecție demografică 3 scenarii (S1 optimist/S2 moderat/S3 conservator) cu grafice 2025-2055' },
      { ico: '🏗', txt: 'Indicatori urbanistici proiectați: POT/CUT/H estimat la 2035/2045/2055' },
      { ico: '🏠', txt: 'Cerere locuinte estimată: nr. apartamente și SDA necesare pe decade' },
      { ico: '🌐', txt: 'ESG Rating proiectat: scor E/S/G acum vs 2035 cu potențial de îmbunătățire' },
      { ico: '📍', txt: 'Hartă amplasament cu context strategic regional (FIG.1-4 cu north arrow)' },
      { ico: '⚖', txt: 'Baza legală completă: Legea 350/2001, INSE 2025, Eurostat, OCDE Urban Reviews' },
    ],
    nu: ['Nu înlocuiește studiul de piață imobiliară profesionist (evaluator ANEVAR)', 'Proiecțiile demografice sunt estimative — nu includ șocuri exogene (pandemii, crize)', 'Indicatorii urbanistici proiectați nu reprezintă angajamente ale administrației locale'],
  },

  cpe: {
    ico: '⚡', label: 'Certificat de Performanță Energetică',
    badge: 'obligatoriu', badgeLabel: 'Clădiri noi · NZEB 2021',
    color: '52,211,153',
    fn: 'generateCPE()',
    ce: 'Calculează consumul anual de energie al clădirii propuse (EP_specific, kWh/m²an) și o încadrează într-o clasă energetică de la A+ la G, conform Ordinului 2641/2017 și metodologiei MC001-3/2022. Analizează parametrii termici ai anvelopei (U-values pereți, terasă, tâmplărie, planșeu), bilanțul energetic anual cu pierderi și câștiguri solare, și verifică conformitatea cu cerința NZEB obligatorie din 2021.',
    dece: 'Legea 372/2005 republicată și Directiva europeană EPBD 2024/1275/UE (recast) impun că toate clădirile noi trebuie să atingă standardul Nearly Zero Energy Building (NZEB), adică cel puțin clasa energetică A (EP ≤ 100 kWh/m²an). Certificatul este obligatoriu la vânzare, închiriere și recepția oricărei clădiri noi. Băncile finanțatoare și cumpărătorii de apartamente îl solicită tot mai frecvent la faza de pre-vânzare.',
    legal: 'Legea 372/2005 republicată · Ord. MDLPA 2641/2017 (metodologie CPE) · MC001-3/2022 (calcul necesar căldură) · C107/1-5:2022 (coeficienți termici) · Directiva EPBD 2024/1275/UE (recast) · Ord. 1071/2015 (auditori energetici atestați)',
    output: [
      { ico: '⚡', txt: 'Clasa energetică A+→G cu EP_specific (kWh/m²an) și vizualizare scală grafică' },
      { ico: '🏗', txt: 'Indicatori termici anvelopă vs. limite C107/4-2022: U_perete, U_terasă, U_geam, U_planșeu' },
      { ico: '📊', txt: 'Bilanț energetic anual: pierderi transmisie + ventilație − câștiguri solare − interne = necesar net' },
      { ico: '✅', txt: 'Conformitate NZEB: DA (EP ≤ 100 kWh/m²an) / NU — cu indicarea deficitului' },
      { ico: '💡', txt: '6 recomandări de îmbunătățire clasă cu impact EP estimat (termoizolație, geam triplu, VmC, FV)' },
      { ico: '🌿', txt: 'Emisii CO₂ estimate (tone/an) conform factorilor IPCC 2021' },
    ],
    nu: ['Nu înlocuiește Certificatul Energetic oficial semnat de auditor energetic atestat ANRE/MDLPA', 'Valorile EP sunt orientative ±20% — calculul definitiv necesită proiect tehnic complet cu toate detaliile constructive', 'Nu acoperă instalațiile de climatizare, ventilație mecanică sau producere ACM — incluse în CPE oficial'],
  },

  stabilitate_taluzuri: {
    ico: '⛰', label: 'Stabilitate Taluzuri & Versanți',
    badge: 'recomandat', badgeLabel: 'Teren în pantă · Săpături',
    color: '180,76,4',
    fn: 'generateStabilitateTaluzuri()',
    ce: 'Evaluează stabilitatea taluzurilor și versanților pe amplasamentul propus folosind metoda Fellenius (taluz infinit) pentru săpături H<5m. Calculează factorul de siguranță Fs în 4 scenarii (uscat, umed, saturat, săpătură verticală) pe baza parametrilor geotehnici tipici zonei și a cotei reale AMSL obținute prin Elevation Engine (Mapbox Terrain-RGB / EU-DEM 25m Copernicus).',
    dece: 'Orice proiect cu săpături pentru fundații, subsoluri sau amenajări pe teren cu pantă >5° necesită o evaluare preliminară de stabilitate. Dacă Fs < 1.5, sunt necesare măsuri active (taluzare, piloți, drenaj) înainte de executarea lucrărilor. SR EN 1997-1 (Eurocode 7) și NP 074/2014 impun ca proiectantul să demonstreze stabilitatea taluzurilor pe toată durata execuției.',
    legal: 'SR EN 1997-1:2004 (Eurocode 7) — proiectare geotehnică · NP 074/2014 (cercetarea terenului de fundare) · P91/2008 (consolidare teren) · Ord. MTCT 1422/2003 (zonare risc alunecări) · SR EN 1998-5:2004 (EC8 — aspecte seismice fundații) · P100-1/2022 (zonare seismică, ag, Tc)',
    output: [
      { ico: '📍', txt: 'Cotă teren AMSL reală (Mapbox Terrain-RGB, precizie ±1m) — nu estimare hardcodată' },
      { ico: '⚖', txt: 'Factor de siguranță Fs calculat în 4 scenarii: uscat / umed / saturat / săpătură verticală' },
      { ico: '🏗', txt: 'Clasificare stabilitate EC7: STABIL (Fs≥2.0) / CONDIȚIONAT / LIMITĂ / INSTABIL (<1.3)' },
      { ico: '🔬', txt: 'Parametri geotehnici estimați (c, phi, gamma, NFA) cu surse normative (NP 074, EC7)' },
      { ico: '⚠', txt: 'Risc geomorfologic conform Ord. 1422/2003: alunecare / eroziune / tasare / sufoziune / lichefiere' },
      { ico: '🛠', txt: 'Măsuri de stabilizare recomandate cu termene de execuție' },
    ],
    nu: ['Nu înlocuiește studiul geotehnic certificat semnat de expert geotehnician atestat (NP 074/2014)', 'Parametrii geotehnici sunt ESTIMATIVI — valorile reale necesită foraje in situ + laborator', 'Metoda Fellenius este conservativă; pentru H>5m sau geometrii complexe este necesară analiza Bishop circular sau Spencer'],
  },
  iluminat: {
    ico: '🌤', label: 'Studiu Iluminat Natural EN 17037', badge: 'recomandat', badgeLabel: 'Daylight · factor lumină',
    color: '251,191,36', fn: 'generateStudiuIluminat()',
    ce: 'Estimează nivelul de iluminat natural (daylight) al spațiilor propuse conform EN 17037: factorul mediu de lumină naturală, raportul fereastră/podea și gradul de conformitate pentru fiecare orientare a fațadei.',
    dece: 'Iluminatul natural insuficient afectează confortul, sănătatea și valorea imobilului. EN 17037 și OMS 119/2014 stabilesc praguri minime; verificarea preliminară evită respingeri la avizare și corecții costisitoare în proiectul tehnic.',
    legal: 'SR EN 17037:2019 (iluminat natural) · OMS 119/2014 (igienă) · NP 057/2002 (locuințe)',
    output: [{ico:'🌤',txt:'Factor mediu de lumină naturală (DF) per orientare'},{ico:'🪟',txt:'Raport fereastră/podea recomandat'},{ico:'🧭',txt:'Conformitate per fațadă N/E/S/V'},{ico:'✅',txt:'Status EN 17037 — CONFORM / verificare PT'}],
    nu: ['Estimare preliminară — nu înlocuiește simularea de iluminat (Radiance/DIALux) din proiectul tehnic', 'Nu ține cont de obstrucții vegetale sau reflexii interioare'],
  },
  pmr: {
    ico: '♿', label: 'Studiu Accesibilitate PMR', badge: 'obligatoriu', badgeLabel: 'NP 051/2012 · Legea 448/2006',
    color: '167,139,250', fn: 'generateStudiuPMR()',
    ce: 'Verifică accesibilitatea pentru persoane cu mobilitate redusă: pante rampe, lățimi căi de acces, gabarit lift, locuri de parcare adaptate și trasee fără bariere, conform NP 051/2012.',
    dece: 'Accesibilitatea PMR este obligatorie legal pentru clădiri publice și de locuit colectiv; nerespectarea împiedică recepția și avizarea. Verificarea preliminară asigură conformitatea din faza de concept.',
    legal: 'NP 051/2012 (adaptare clădiri PMR) · Legea 448/2006 (protecția persoanelor cu handicap) · HG 907/2016',
    output: [{ico:'♿',txt:'Pante rampe (max 8%) și lățimi acces (min 1.2m)'},{ico:'🛗',txt:'Gabarit lift / platformă elevatoare'},{ico:'🅿️',txt:'Locuri parcare adaptate — număr necesar'},{ico:'🚪',txt:'Trasee fără bariere, uși min. 0.9m'}],
    nu: ['Verificare preliminară — proiectul tehnic detaliază soluțiile certificate', 'Nu înlocuiește auditul de accesibilitate la recepție'],
  },
  sanatate: {
    ico: '🩺', label: 'Studiu de Impact asupra Sănătății', badge: 'condiționat', badgeLabel: 'Aviz DSP',
    color: '34,197,94', fn: 'generateHealthImpactStudy()',
    ce: 'Evaluează impactul investiției asupra sănătății populației: zgomot, calitatea aerului, însorire, distanțe de protecție sanitară și expunere la factori de risc, în vederea avizului DSP.',
    dece: 'Anumite funcțiuni (unități medicale, alimentare, producție) necesită aviz sanitar DSP înainte de AC. Studiul preliminar identifică riscurile și distanțele de protecție sanitară obligatorii.',
    legal: 'Ordin MS 119/2014 (norme de igienă) · Legea 95/2006 (reforma sănătății) · HG 857/2011',
    output: [{ico:'🔊',txt:'Expunere zgomot vs praguri OMS'},{ico:'🌬',txt:'Calitatea aerului și surse de poluare'},{ico:'📏',txt:'Distanțe de protecție sanitară'},{ico:'🩺',txt:'Recomandări pentru avizul DSP'}],
    nu: ['Nu înlocuiește avizul sanitar oficial DSP', 'Estimări orientative — măsurătorile certificate se fac la fața locului'],
  },
  seismic: {
    ico: '🌐', label: 'Pre-Studiu Seismic și Risc Seismic', badge: 'recomandat', badgeLabel: 'P100-1/2013 · CR 0/2012',
    color: '239,68,68', fn: 'generateSeismicStudy()',
    ce: 'Stabilește parametrii seismici de proiectare ai amplasamentului (ag, Tc, clasa de importanță), încadrarea în zona seismică și cerințele de proiectare antiseismică conform P100-1/2013.',
    dece: 'România este o țară cu risc seismic ridicat (sursa Vrancea). Parametrii seismici corecți sunt esențiali pentru dimensionarea structurii; pentru clădiri existente, evaluarea P100-3 poate impune consolidare.',
    legal: 'P100-1/2013 (proiectare seismică) · P100-3/2019 (evaluare existente) · CR 0/2012 (bazele proiectării) · NP 122/2010',
    output: [{ico:'🌐',txt:'Parametri ag, Tc, zona seismică a amplasamentului'},{ico:'🏗',txt:'Clasa de importanță și factor de comportare'},{ico:'⚠️',txt:'Cerințe proiectare antiseismică'},{ico:'📋',txt:'Necesitate expertiză tehnică (existente >P+3)'}],
    nu: ['Nu înlocuiește expertiza tehnică seismică semnată de expert atestat MLPAT', 'Parametrii sunt orientativi conform zonării — proiectul stabilește valorile de calcul'],
  },
  ape_pluviale: {
    ico: '🌧', label: 'Studiu Gospodărire Ape Pluviale', badge: 'condiționat', badgeLabel: 'Aviz ABA · NP 133/2013',
    color: '56,189,248', fn: 'generateStudiuApePluviale()',
    ce: 'Calculează debitul de ape pluviale generat de amprenta impermeabilă propusă și dimensionează soluțiile de atenuare/infiltrare/retenție necesare pentru a nu suprasolicita rețeaua de canalizare.',
    dece: 'Impermeabilizarea terenului crește scurgerea pluvială; multe UAT-uri și ABA impun atenuarea debitului la sursă (bazine de retenție, infiltrare). Verificarea preliminară evită respingerea avizului de gospodărire a apelor.',
    legal: 'NP 133/2013 (canalizări) · Legea 107/1996 (legea apelor) · Ord. ABA · HG 930/2005 (zone de protecție)',
    output: [{ico:'🌧',txt:'Debit pluvial de calcul (l/s) per amprentă'},{ico:'💧',txt:'Volum de atenuare/retenție necesar'},{ico:'🟢',txt:'Soluții de infiltrare și suprafețe permeabile'},{ico:'📋',txt:'Cerințe pentru avizul de gospodărire a apelor'}],
    nu: ['Estimare preliminară — dimensionarea exactă se face în proiectul de specialitate', 'Nu înlocuiește avizul ABA / operatorului de apă-canal'],
  },
  bransamente: {
    ico: '🔌', label: 'Pre-Studiu Branșamente și Utilități', badge: 'recomandat', badgeLabel: 'Apă · Canal · Electric · Gaze',
    color: '96,165,250', fn: 'generatePrestudiuBransamente()',
    ce: 'Inventariază necesarul de racorduri la utilități (apă, canalizare, energie electrică, gaze, termoficare) și estimează capacitățile, traseele și avizele de operator necesare pentru autorizare.',
    dece: 'Lipsa sau imposibilitatea branșamentelor poate bloca un proiect. Pre-studiul identifică din timp disponibilitatea utilităților și avizele de racordare necesare la dosarul de AC.',
    legal: 'HG 907/2016 (documentații) · Legea 123/2012 (energie) · Legea 241/2006 (apă-canal) · avize operatori',
    output: [{ico:'💧',txt:'Necesar apă-canal și disponibilitate racord'},{ico:'⚡',txt:'Putere electrică estimată și branșament'},{ico:'🔥',txt:'Racord gaze naturale (dacă e cazul)'},{ico:'📋',txt:'Avize de operator necesare la AC'}],
    nu: ['Estimări orientative — capacitățile reale se confirmă prin avizele tehnice de racordare', 'Nu înlocuiește avizele oficiale ale operatorilor de utilități'],
  },
  repa: {
    ico: '📑', label: 'Raport de Evaluare Prealabilă Autorizare (REPA)', badge: 'recomandat', badgeLabel: 'Sinteză pre-autorizare',
    color: '212,175,55', fn: 'generateREPA()',
    ce: 'Sinteză preliminară care agregă verificările cheie înainte de demararea autorizării: încadrare urbanistică, indicatori, riscuri, avize necesare și gradul de pregătire al amplasamentului pentru obținerea Certificatului de Urbanism și a Autorizației de Construire.',
    dece: 'Oferă o imagine de ansamblu rapidă a fezabilității administrative a proiectului — ce avize lipsesc, ce riscuri există — înainte de a investi în documentația tehnică completă.',
    legal: 'Legea 50/1991 (autorizare) · Legea 350/2001 (urbanism) · HG 907/2016',
    output: [{ico:'🗺',txt:'Încadrare urbanistică și indicatori PUG'},{ico:'⚠️',txt:'Riscuri și restricții identificate'},{ico:'📋',txt:'Lista avizelor necesare conform CU'},{ico:'✅',txt:'Grad de pregătire pentru autorizare'}],
    nu: ['Document orientativ de sinteză — nu înlocuiește Certificatul de Urbanism oficial', 'Lista de avize finală se stabilește prin CU emis de primărie'],
  },
  // alias pentru butonul "stabilitate" (continutul detaliat e la stabilitate_taluzuri)
  get stabilitate(){ return this.stabilitate_taluzuri; },
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
