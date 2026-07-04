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
  superbloc: {
    ico: '🟧', label: 'Superbloc (model Barcelona)', badge: 'recomandat', badgeLabel: 'Funcție integrată · regenerare', color: '251,146,60',
    fn: 'window.Superbloc&&window.Superbloc.openPanel&&window.Superbloc.openPanel()',
    ce: 'Aplică modelul superbloc (Barcelona / Salvador Rueda): grupezi ~9 cvartale (~400×400m), devii traficul de tranzit pe perimetru, iar interiorul devine zonă cu 10 km/h pentru pietoni și bicicliști. Calculează spațiul public recâștigat din carosabil, verde + piațete, populația deservită, răcirea (legat de UHI) și transferul modal. Vizualizare ÎNAINTE/DUPĂ pe hartă (perimetru de tranzit + străzi interioare devenite verzi + piațete la intersecții).',
    dece: 'Nu e un calculator izolat — e o FUNCȚIE integrată în tot fluxul UrbanX: apare ca instrument în SIDU (domeniul regenerare), ca scenă reală pe hartă în prezentarea cinematică (b12s1), și ca un capitol dedicat în Masterplan (spațiu public + climă) și PMUD (tranzit pe perimetru + calmarea traficului). Studii ISGlobal Barcelona: reduce zgomotul, emisiile și bolile cardiovasculare/respiratorii.',
    legal: 'Concept urbanistic (nu normă RO); se implementează prin PUZ de regenerare + reglementări de trafic locale. Model: Agència d\'Ecologia Urbana Barcelona (S. Rueda) · ISGlobal · plan Cerdà.',
    output: [
      { ico: '🗺', txt: 'Vizualizare ÎNAINTE/DUPĂ pe hartă: perimetru + străzi interioare verzi + piațete' },
      { ico: '🟩', txt: 'Spațiu public recâștigat (mp) → verde + piațete + răcire (UHI) + transfer modal' },
      { ico: '🎬', txt: 'Scenă reală în cinematic (b12s1) + instrument în SIDU' },
      { ico: '📄', txt: 'Capitol dedicat în Masterplan (spațiu public/climă) + PMUD (mobilitate)' },
    ],
    nu: ['Estimări pe rata de carosabil eliberat — rerutarea de perimetru cere studiu de trafic (UrbanX Flux)', 'Necesită PUZ + reglementări locale de circulație'],
  },
  loisir: {
    ico: '🌿', label: 'LOISIR — Spații verzi & plămân urban', badge: 'recomandat', badgeLabel: 'Modul complet · 5 funcții', color: '34,197,94',
    fn: 'window.Loisir&&window.Loisir.openPanel&&window.Loisir.openPanel()',
    ce: 'Modulul complet de spații de recreere și infrastructură verde, cu 5 funcții: (1) CATALOG spații verzi — inventarul obligatoriu prin Legea 24/2007, cu KPI mp/locuitor vs ținta de 26; (2) PROIECTARE ASISTATĂ parc — generează programul spațial al unui parc (cele 12 zone, mobilier, ecologie) din NORME, plus estimare de cost și specii native recomandate; (3) 3D PARC — vizualizator procedural Three.js al parcului proiectat; (4) CONCURS DE IDEI — brief PDF + criterii + punctaj juriu ponderat; (5) CLIMĂ/UHI — calculatorul de răcire și scorecard-ul verde (insula de căldură).',
    dece: 'Spațiile verzi sunt obligatorii prin lege (catalog + 26 mp/loc), dar majoritatea UAT-urilor nu le au digitalizate și nici nu proiectează parcuri pe baza unui program spațial fundamentat. UrbanX acoperă tot lanțul: de la inventarul legal, la concursul de idei, la proiectarea pe norme și vizualizarea 3D. Benchmark: Central Park, Tiergarten, Vondelpark, Gardens by the Bay, Superkilen.',
    legal: 'Legea 24/2007 (art.7 — 26 mp/loc; art.11 — catalog) · EN 1176/1177 (joacă) · EN 16630 (fitness) · NP 051/2012 (PMR) · SR EN 13201-2 (iluminat) · Legea 98/2016 (concurs de soluții art.110-114)',
    output: [
      { ico: '📊', txt: 'Catalog spații verzi + KPI mp/locuitor vs ținta Legea 24/2007 (deficit în ha)' },
      { ico: '🎨', txt: 'Program spațial parc (12 zone din norme) + mobilier + cost estimativ + specii native' },
      { ico: '🧊', txt: 'Vizualizator 3D procedural Three.js (zi/noapte, anotimp, captură PNG)' },
      { ico: '🏆', txt: 'Concurs de idei: brief PDF + criterii + clasament juriu ponderat' },
    ],
    nu: ['Costurile sunt estimative — nu înlocuiesc devizul tehnic', 'Portalul public de depunere anonimă + e-mail arhitecți, asistentul AI și monitorizarea satelitară NDVI/IoT = Faza 2 (server)', 'Desenul tehnic final al parcului = proiectant peisagist atestat'],
  },
  uhi: {
    ico: '🌡', label: 'LOISIR/Climă — Insulă de căldură (UHI)', badge: 'recomandat', badgeLabel: 'Componentă climă · NbS', color: '34,197,94',
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
  cadastru: {
    ico: '📐', label: 'Fișă cadastrală (lotizare/comasare/dezmembrare)', badge: 'recomandat', badgeLabel: 'Documentație ANCPI · cadastrist', color: '56,189,248',
    fn: 'window.Cadastru&&window.Cadastru.openPanel&&window.Cadastru.openPanel()',
    ce: 'Generează DOCUMENTAȚIA tehnică cadastrală pentru o parcelă reală (cea selectată pe hartă), în formatul Ordinului ANCPI 700/2014: (1) Plan de amplasament și delimitare — schiță la scară cu vârfurile numerotate; (2) Inventar de coordonate Stereo70 (Punct, X-Nord, Y-Est) + lungimi laturi + perimetru; (3) Tabel de mișcare parcelară (situația actuală → viitoare). Operații: fișă simplă, dezmembrare/lotizare (1 lot → N loturi cu bilanț de suprafețe), comasare (alipire de parcele).',
    dece: 'Aceasta NU este „masterplanul lotizării" (acela e proiectarea — modulul Masterplan ansamblu). E paperwork-ul concret de care are nevoie un CADASTRIST pentru a depune la OCPI. UrbanX convertește geometria parcelei (WGS84) în coordonate Stereo70 și pre-completează cele 3 piese, economisind ore de lucru manual.',
    legal: 'Ordin ANCPI 700/2014 (regulament recepție și înscriere) · Legea 7/1996 (cadastru și publicitate imobiliară) · sistem de proiecție Stereografic 1970 (EPSG:3844). Conversie cu proj4 (Helmert 7 parametri).',
    output: [
      { ico: '🗺', txt: 'Plan de amplasament și delimitare (schiță la scară, vârfuri numerotate, N↑)' },
      { ico: '📊', txt: 'Inventar de coordonate Stereo70 (X-Nord, Y-Est) + lungimi laturi + perimetru' },
      { ico: '📋', txt: 'Tabel de mișcare parcelară (actual → viitor) cu bilanț de suprafețe' },
    ],
    nu: ['DRAFT ORIENTATIV — coordonatele provin din reproiecția platformei (proj4), NU dintr-o ridicare topografică', 'Documentația oficială ANCPI necesită măsurători cu TransDatRO + viză topograf autorizat', 'Categoria de folosință și proprietarii se completează din actele de proprietate'],
  },
  sidu: {
    ico: '🏛', label: 'SIDU — Strategia Integrată (umbrela)', badge: 'recomandat', badgeLabel: 'Strategie · nivel superior', color: '96,165,250',
    fn: 'window.SIDU&&window.SIDU.openPanel&&window.SIDU.openPanel()',
    ce: 'SIDU = cadrul strategic de nivel SUPERIOR (10-15 ani) care integrează toate domeniile (economie, mobilitate, regenerare/verde, educație, sănătate, locuire, turism, infrastructură) și conduce Masterplanul (cartier) și PMUD (mobilitate). Modulul ține un registru de proiecte strategice pe domenii (cu cost, finanțare POR/PNRR, status), un dashboard de investiții, și un verificator de coerență SIDU→PMUD→PUG care semnalează blocajele (ex. PMUD propune benzi dar PUG nu rezervă culoar → exproprieri).',
    dece: 'În România, decalajul SIDU/PMUD ↔ PUG e cauza majoră a blocajelor: proiecte strategice frumoase pe hârtie, neaplicabile pentru că nu sunt transpuse în regimul de construire. Niciun proiect din SIDU/PMUD nu prinde viață fără să fie desenat linie cu linie în PUG. UrbanX evidențiază aceste goluri.',
    legal: 'HG 874/2019 (mobilitate urbană) · Legea 350/2001 (PUG/PUZ) · ghid SIDU (POR/MDLPA) · ghid PMUD/SUMP MDLPA. SIDU/PMUD nu emit autorizații — PUG-ul o face, deci corelarea e obligatorie.',
    output: [
      { ico: '📋', txt: 'Registru proiecte strategice pe 8 domenii (cost, finanțare, status) + dashboard investiții' },
      { ico: '🔗', txt: 'Câte proiecte conduc PMUD / Masterplan + ierarhia SIDU→PMUD→PUG' },
      { ico: '☑️', txt: 'Verificator coerență → PUG: scor + lista blocajelor + consecințe' },
      { ico: '📄', txt: 'Capitol „Cadru strategic SIDU" în Masterplan + PMUD' },
    ],
    nu: ['Lista completă de proiecte SIDU per UAT + corelarea geometrică detaliată în PUG = etapă cu date (server)', 'Nu emite autorizații — PUG-ul o face; corelarea e obligatorie'],
  },
  // ═══ DOCUMENTE STRATEGICE TERITORIALE (generatoare PDF) ═══
  sidu_doc: {
    ico: '🏛', label: 'SIDU — Strategia Integrată de Dezvoltare Urbană', badge: 'strategic', badgeLabel: 'Document strategic · nivel superior · 10-15 ani', color: '96,165,250',
    fn: "window.SIDU&&window.SIDU.generateDocument&&window.SIDU.generateDocument(window.TCI&&window.TCI.cityKey)",
    ce: 'Generează DOCUMENTUL SIDU complet (PDF) — strategia umbrelă de nivel superior pe 10-15 ani, structurată în cele 5 secțiuni oficiale: (1) Context și analiză a situației existente (demografie, economie, mobilitate, mediu, locuire, servicii); (2) Viziune și obiective strategice; (3) Portofoliul de proiecte pe domenii (cu cost, sursă de finanțare POR/PNRR, orizont termen scurt/mediu/lung, listă scurtă/lungă/metropolitană); (4) Plan de acțiune și implementare; (5) Monitorizare și evaluare (indicatori). Documentul integrează toate domeniile și CONDUCE Masterplanul și PMUD, cu capturi de hartă reale ale UAT-ului și secțiunea Nota UrbanX (IVU).',
    dece: 'SIDU e „constituția" de dezvoltare a orașului (ex. Iași: 331 proiecte) și condiție pentru accesarea fondurilor POR/PNRR. Spre deosebire de registrul interactiv (modulul „SIDU — registru & coerență"), acesta este livrabilul formal — documentul scris pe care îl depui și prezinți. Decalajul real în RO e că SIDU/PMUD nu sunt transpuse în PUG; documentul evidențiază portofoliul ce trebuie corelat.',
    legal: 'Ghid SIDU (POR/MDLPA) · Legea 350/2001 (PUG/PUZ) · cadrul celor 5 secțiuni (Context→Viziune→Portofoliu→Plan acțiune→Monitorizare) aliniat la modelele oficiale (ex. estibucuresti.pmb.ro/sidu).',
    output: [
      { ico: '📑', txt: 'Document PDF dezvoltat: copertă, cuprins, 5 secțiuni, capitole cu analiză și diagnoză' },
      { ico: '📋', txt: 'Portofoliu de proiecte pe domenii (cost, finanțare, termen scurt/mediu/lung)' },
      { ico: '🗺', txt: 'Capturi de hartă reale ale UAT (zonare PUG, dotări, modele/indici)' },
      { ico: '📊', txt: 'Grafice și tabele pe capitole (date reale + prognoză)' },
      { ico: '🎯', txt: 'Secțiunea Nota UrbanX (IVU) — scor, formulă transparentă, benchmark' },
    ],
    nu: ['Document strategic orientativ la nivel teritorial — nu substituie SIDU oficial elaborat și aprobat de consultant/UAT', 'Lista completă de proiecte per UAT + corelarea geometrică în PUG = etapă cu date (server)'],
  },
  masterplan: {
    ico: '🏙', label: 'Masterplan Urban', badge: 'strategic', badgeLabel: 'Document strategic · fundamentare PUG/PUZ', color: '167,139,250',
    fn: 'generateMasterplan()',
    ce: 'Generează Masterplanul Urban (PDF) — documentul de fundamentare a viziunii spațiale de dezvoltare a orașului/zonei: concept urbanistic, zonare funcțională propusă, structura mobilității și a spațiilor publice/verzi, etapizarea dezvoltării și indicatorii-țintă. Integrează capturi de hartă reale, capitole din modulele de decizie (regenerare/superbloc, climă, spații verzi) și cadrul strategic SIDU, cu secțiunea Nota UrbanX (IVU).',
    dece: 'Masterplanul traduce strategia (SIDU) în organizare spațială concretă — „cum arată orașul peste 10-20 de ani" — și fundamentează deciziile de PUG/PUZ. Fără un masterplan coerent, intervențiile sunt punctuale și necorelate; cu el, investițiile publice și private se ordonează după o viziune comună.',
    legal: 'Legea 350/2001 (amenajarea teritoriului și urbanism) · masterplan ca instrument de fundamentare a documentațiilor de urbanism (PUG/PUZ) · ghid POR/MDLPA dezvoltare urbană.',
    output: [
      { ico: '📑', txt: 'Document PDF dezvoltat: concept, zonare funcțională, mobilitate, spații publice' },
      { ico: '🗺', txt: 'Capturi de hartă reale ale UAT + modele urbane proiectate' },
      { ico: '🟧', txt: 'Capitole din module: regenerare/superbloc, spații verzi (LOISIR), climă' },
      { ico: '📊', txt: 'Indicatori-țintă + etapizarea dezvoltării + grafice pe capitole' },
      { ico: '🎯', txt: 'Cadru strategic SIDU + secțiunea Nota UrbanX (IVU)' },
    ],
    nu: ['Document de fundamentare orientativ — masterplanul final și PUG/PUZ se elaborează de echipă atestată RUR', 'Nu emite autorizații — fundamentează reglementarea, care se aplică prin PUG'],
  },
  portofoliu: {
    ico: '📂', label: 'Portofoliu strategic 2025-2055', badge: 'recomandat', badgeLabel: 'Predicție · investiții pe orizonturi', color: '96,165,250',
    fn: 'generatePortfolio()',
    ce: 'Construiește un portofoliu strategic de proiecte și investiții pe orizonturi (2025→2055), grupate pe domenii și etape (termen scurt/mediu/lung), cu estimări de cost, surse de finanțare și impact așteptat. Oferă o imagine de ansamblu a traiectoriei de dezvoltare a UAT-ului.',
    dece: 'Deciziile de investiții au nevoie de un orizont lung și de o ierarhizare a proiectelor — ce se face întâi, ce depinde de ce, ce surse de finanțare sunt realiste. Portofoliul leagă proiectele de strategia SIDU și de proiecția urbanistică pe 10/20/30 de ani.',
    legal: 'Instrument de planificare strategică (orientativ) · aliniat la portofoliile SIDU (POR/MDLPA) · nu este angajament bugetar.',
    output: [
      { ico: '📋', txt: 'Listă proiecte pe domenii și orizonturi (scurt/mediu/lung)' },
      { ico: '💶', txt: 'Estimări de cost și surse de finanțare orientative' },
      { ico: '📈', txt: 'Traiectorie de dezvoltare 2025-2055 + impact așteptat' },
    ],
    nu: ['Orientativ — nu substituie programul de investiții aprobat al UAT', 'Costurile sunt estimative, se validează cu bugetul local și ghidurile de finanțare'],
  },
  analytics: {
    ico: '📊', label: 'Analytics — indici urbani live', badge: 'recomandat', badgeLabel: 'Tablou de bord · Walk/15-min/ROI/UHI/SDG/seismic', color: '83,74,183',
    fn: "try{var t=document.getElementById('tab-analytics');if(t)t.click();}catch(e){}",
    ce: 'Tabloul de bord de analiză cu indici urbani calculați live: Walkability, accesibilitate 15-minute, ROI, insulă de căldură (UHI), aliniere la SDG 11, expunere seismică și altele. Fiecare indice are definiție, formulă și sursă, cu vizualizare pe hartă a elementelor reale (străzi, dotări, spații verzi).',
    dece: 'Indicii urbani transformă datele brute (rețea OSM, populație, relief) în măsuri comparabile și acționabile — „cât de mergibil e cartierul", „ce rază acoperă serviciile în 15 minute". Sunt baza obiectivă pentru prioritizarea intervențiilor și pentru raportul de indici.',
    legal: 'Metodologii recunoscute: Walk Score · conceptul orașului 15-minute (C. Moreno) · ONU SDG 11 · ISO 37120 (indicatori orașe). Surse: OSM · INS · Eurostat.',
    output: [
      { ico: '🚶', txt: 'Walkability + accesibilitate 15-minute (izocrone pe rețea reală)' },
      { ico: '🌡', txt: 'UHI, expunere seismică, aliniere SDG 11' },
      { ico: '🗺', txt: 'Vizualizare pe hartă a elementelor reale per indice' },
      { ico: '📄', txt: 'Trecere directă la „Raport indici urbani" (PDF, 12 indici)' },
    ],
    nu: ['Indici orientativi calculați din date deschise — nu măsurători de teren', 'Acuratețea depinde de completitudinea datelor OSM/INS pentru UAT'],
  },
  indici: {
    ico: '📈', label: 'Raport indici urbani (PDF, 12 indici)', badge: 'recomandat', badgeLabel: 'Raport PDF · definiție+formulă+sursă', color: '83,74,183',
    fn: "window.UrbanIndicesReport&&window.UrbanIndicesReport.generate()",
    ce: 'Generează raportul PDF cu cei 12 indici urbani — fiecare cu definiție, formulă transparentă, sursa datelor, valorile calculate și o captură de hartă a elementelor reale măsurate (rețea, dotări, spații verzi). Raport unitar care strânge la un loc analizele din tabloul Analytics.',
    dece: 'Un raport scris, cu formule și surse vizibile, e ce poți atașa unei documentații sau prezenta într-o ședință — spre deosebire de un tablou interactiv. Transparența formulei și a sursei face indicii verificabili și apărabili.',
    legal: 'Metodologii: Walk Score · oraș 15-minute · ONU SDG 11 · ISO 37120 · indicatori UE. Surse citate per indice (OSM/INS/Eurostat/GHSL).',
    output: [
      { ico: '📑', txt: 'PDF cu 12 indici: definiție + formulă + sursă + valori' },
      { ico: '🗺', txt: 'Captură de hartă a elementelor reale per indice' },
      { ico: '🎯', txt: 'Poziționare vs. media națională / benchmark' },
    ],
    nu: ['Indici orientativi din date deschise — nu substituie studii de specialitate', 'Valorile reflectă completitudinea datelor disponibile pentru UAT'],
  },
  metodologie: {
    ico: '📚', label: 'Metodologie & surse de date', badge: 'recomandat', badgeLabel: 'Transparență · cum se calculează tot', color: '148,163,184',
    fn: "try{var t=document.getElementById('tab-methodology');if(t)t.click();}catch(e){}",
    ce: 'Documentează metodologia platformei: ce surse de date folosește UrbanX (INS TEMPO, Eurostat, OpenStreetMap, GHSL, OpenAQ, INFP etc.), cum sunt calculați indicii și indicatorii, ce formule și ce ipoteze stau în spate, plus limitările cunoscute. Transparență completă asupra modului în care se obține fiecare cifră.',
    dece: 'Orice valoare prezentată trebuie să fie verificabilă și apărabilă. Această secțiune răspunde la „de unde știți asta?" — sursa, formula, data datelor și gradul de încredere — și marchează onest ce este estimare vs. măsurătoare.',
    legal: 'Surse oficiale: INS (TEMPO-Online) · Eurostat · OpenStreetMap (ODbL) · GHSL (Comisia Europeană) · INFP · OpenAQ. Metodologiile citate per indicator.',
    output: [
      { ico: '🗂', txt: 'Inventar surse de date cu cadență și vechime (vezi „Prospețimea datelor")' },
      { ico: '🧮', txt: 'Formulele și ipotezele pentru indici și indicatori' },
      { ico: '⚠️', txt: 'Limitări cunoscute + marcaj estimare vs. măsurătoare' },
    ],
    nu: ['Secțiune informativă — nu generează un document de avizare', 'Pentru date la zi vezi modulul „Prospețimea datelor"'],
  },
  dataFresh: {
    ico: '🗓', label: 'Prospețimea datelor (surse la zi)', badge: 'recomandat', badgeLabel: 'Registru surse · cadență + vechime', color: '96,165,250',
    fn: "window._DataFreshness&&window._DataFreshness.openPanel()",
    ce: 'Registrul surselor de date folosite de platformă, cu pentru fiecare: data ultimului snapshot, cadența de actualizare, vechimea curentă și starea (la zi / de reîmprospătat). Semnalează explicit sursele învechite (ex. LMI 2012) ca să știi cât de mult te poți baza pe o cifră.',
    dece: 'O analiză e atât de bună cât de proaspete sunt datele din spate. Acest panou face vizibilă vechimea fiecărei surse, ca să nu prezinți o decizie pe date depășite fără să știi — disciplină de integritate a datelor.',
    legal: 'Instrument de transparență a datelor (nu document oficial). Sursele și licențele sunt cele din secțiunea Metodologie.',
    output: [
      { ico: '🗂', txt: 'Listă surse: snapshot, cadență, vechime, stare' },
      { ico: '🔴', txt: 'Semnalarea surselor învechite (ex. LMI 2012)' },
      { ico: '✅', txt: 'Indicator la-zi / de-reîmprospătat per sursă' },
    ],
    nu: ['Reflectă starea datelor integrate în platformă — nu reîmprospătează automat sursele externe', 'Actualizarea efectivă a unor surse = pipeline server (Faza 2)'],
  },
  studyzone: {
    ico: '📐', label: 'Zonă de studiu flexibilă', badge: 'recomandat', badgeLabel: 'Fundație · fără nr. cadastral', color: '34,211,238',
    fn: 'window.StudyZone&&window.StudyZone.openBuilder&&window.StudyZone.openBuilder()',
    ce: 'Definește o zonă de studiu (poligon) FĂRĂ a depinde de un număr cadastral, prin 5 metode: desen pe hartă, buffer în jurul unei linii (râu, cale ferată), feature OSM căutat după nume (ex. „râul Bahlui" via Nominatim), adresă + rază, sau combinare de parcele. Rezultatul — un poligon GeoJSON — devine zona activă folosită de toate modulele.',
    dece: 'Multe situri importante nu au referință cadastrală: coridoare de râu (Bahlui, Dâmbovița), căi ferate dezafectate, axe urbane, zone periurbane fără PUG. Fără un mod de a le delimita, modulele (LOISIR, UHI, Superbloc, Mobilitate) nu pot lucra pe ele. StudyZone e stratul de intrare comun — un singur desen, toate modulele.',
    legal: 'Instrument de delimitare a ariei de studiu (nu document cadastral). Geometriile vin din OpenStreetMap/Nominatim (gratuit). Pentru parcele cu valoare juridică = ANCPI.',
    output: [
      { ico: '🗺', txt: 'Poligon GeoJSON + suprafață (ha) + perimetru' },
      { ico: '🌊', txt: 'Ex. coridor Bahlui: buffer pe râu → folosit de LOISIR/UHI/Mobilitate' },
      { ico: '🔗', txt: 'Zonă activă (★) citită de celelalte module' },
    ],
    nu: ['Buffer asimetric (mal stâng/drept) + import SHP/KML = etapă viitoare', 'Nu înlocuiește delimitarea cadastrală oficială (ANCPI)'],
  },
  simlab: {
    ico: '🧪', label: 'SimLab — explorare pre-proiectare', badge: 'recomandat', badgeLabel: 'Hub · 6 simulatoare · L.350 art.5', color: '212,175,55',
    fn: 'window.SimLab&&window.SimLab.openDashboard&&window.SimLab.openDashboard()',
    ce: 'Dashboard de simulare care schimbă fluxul din „aprobi apoi descoperi problemele" în „explorezi întâi, decizi informat". 10 simulatoare: (1) UHI — profil termic urban cu presete (Parc minim / Standard european / Singapore); (2) Front de apă — secțiune mal + viitură Q100; (3) Impact capacitate — gauges live (apă/canalizare/școli/grădinițe/verde/impermeabilizare) cu factori Intelligence; (4) Oraș 15 minute — izocronă acces servicii; (5) TOD — densitate țintă în jurul unei stații + reducere auto; (6) Coridor mixt — locuințe + locuri de muncă + venit fiscal; (7) Sponge City — retenție apă + reducere inundații + răcire; (8) Parc 3D (→ LOISIR); (9) Fezabilitate (→ Pro-formă); (10) Superbloc (→ Barcelona). Scenariile se salvează, se compară side-by-side și se exportă ca „Studiu de oportunitate".',
    dece: 'Fluxul clasic RO: idee → consultant → 18 luni → PUZ → se descoperă problemele. SimLab: idee → 30 minute de explorare → înțelegi implicațiile → ABIA APOI pornești procedura formală cu un brief clar. Ca un simulator de zbor înainte de avionul real. Bază legală: Legea 350/2001, Art. 5 (studii de oportunitate, pre-PUG/PUZ).',
    legal: 'Legea 350/2001 Art. 5 (studii de oportunitate / strategii de dezvoltare, informale). Documentul exportat e informativ, fără valoare juridică în procedurile de autorizare. Formule: C40/Bowler 2010 (UHI), factori Intelligence (capacitate).',
    output: [
      { ico: '🌡', txt: 'UHI: profil termic + reducere °C + CO2 (sliders + presete)' },
      { ico: '🌊', txt: 'Front de apă: secțiune mal + viitură Q100 animată' },
      { ico: '📊', txt: 'Capacitate: gauges live la N apartamente (factori Intelligence)' },
      { ico: '📄', txt: 'Salvare scenarii + export „Studiu de oportunitate" (L.350 art.5)' },
    ],
    nu: ['Document informativ, fără valoare juridică — nu substituie PUZ/PUD', 'Capacitatea actuală e estimată din populație (orientativ) — bilanțul autoritativ e în modulul Intelligence', 'Stocarea scenariilor pe server + share-link = Faza 2 (acum local în browser)'],
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
  plati: {
    ico: '💳', label: 'Plăți taxe urbanistice', badge: 'recomandat', badgeLabel: 'Administrație · fiscal', color: '34,197,94',
    fn: 'window.Plati&&window.Plati.openPanel&&window.Plati.openPanel()',
    ce: 'Calculator de taxe urbanistice (Certificat de Urbanism, Autorizație de Construire = 0,5% din valoarea autorizată, taxă PUZ, copii, prelungiri) + flux de plată online + chitanță PDF cu suma în litere. Plata confirmată deblochează emiterea în CAU (concept de ghișeu unic digital).',
    dece: 'OUG 98/2017 obligă primăriile peste 50.000 locuitori să ofere servicii publice online. Calculul taxei AC (0,5% din valoarea lucrărilor) e o sursă frecventă de erori și dispute. UrbanX calculează corect taxa și simulează încasarea, pregătind integrarea reală cu un procesator.',
    legal: 'Legea 50/1991 art. 30 (taxa AC = 0,5% din valoarea autorizată) · Legea 227/2015 (Codul Fiscal — taxe locale + chitanță) · OUG 98/2017 (servicii online primării) · Legea 458/2002 (plăți electronice).',
    output: [
      { ico: '🧮', txt: 'Calcul taxă CU/AC/PUZ cu plafoane legale + temei' },
      { ico: '💳', txt: 'Flux de plată (simulat) + istoric plăți' },
      { ico: '🧾', txt: 'Chitanță PDF cu nr. (CHT-...) + suma în litere (L.227/2015)' },
    ],
    nu: ['Simulare — procesatorul real (Netopia/Stripe) + webhook HMAC + reconciliere fiscală = Faza 2 (server + persoană juridică)', 'Chitanța fiscală oficială (CIF/IBAN/serie fiscală) se emite de primărie', 'Nu stochează date de card'],
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
  'registru-imobil': {
    ico: '🏢', label: 'Registrul Imobilelor', badge: 'recomandat', badgeLabel: 'Administrație · GDPR', color: '94,234,212',
    fn: 'window.RegistruImobil&&window.RegistruImobil.openPanel&&window.RegistruImobil.openPanel()',
    ce: 'Registrul master al imobilelor dintr-un UAT: fiecare imobil cu identitate cadastrală, status pe ciclul de viață (teren → CU → autorizație → șantier → recepție → intabulat) și lanțul de documente. Statusul e derivat automat din CAU. Complementar Dosarului Digital (acela = fișa unei parcele; acesta = registrul întregului fond).',
    dece: 'Primăria nu are un registru unificat, permanent, al imobilelor cu istoricul lor — informația e împrăștiată pe dosare de autorizare. Registrul devine coloana vertebrală care leagă parcela de toate documentele ei fără a le duplica (le citește din CAU/Sesizări prin Dosar).',
    legal: 'Legea 7/1996 (cadastru) · L.50/1991 (autorizare) · Regulamentul UE 2016/679 (GDPR) — date personale pseudonimizate, consimțământ / sarcină publică, retenție și drept la ștergere',
    output: [
      { ico: '🪪', txt: 'Imobil: nr. cadastral, adresă, UTR, suprafață, status' },
      { ico: '🔗', txt: 'Lanț documente (CU/AC/sesizări) prin referințe, fără duplicare' },
      { ico: '🔒', txt: 'Date proprietar pseudonimizate GDPR + fișă/registru PDF' },
    ],
    nu: ['Numele/CNP proprietarilor cu valoare juridică = date ANCPI; aici doar pseudonimizat cu consimțământ', 'Registru partajat multi-utilizator + audit GDPR = Faza 2 (Supabase RLS)'],
  },
  pedologie: {
    ico: '🌱', label: 'Studiu Pedologic & Agrochimic', badge: 'recomandat', badgeLabel: 'Teren agricol · MADR', color: '167,139,250',
    fn: 'window.generatePedologie&&window.generatePedologie()',
    ce: 'Studiu de sol AGRICOL pentru scoaterea terenului din circuitul agricol: clasificare SRTS 2012, indicatori agrochimici (pH/humus/N-P-K), bonitare (notă 0–100), încadrare în clase de calitate I–V și calculul taxei de scoatere (Ord. MADR 83/2018). Analiză de relief pe date live (elevație/pantă) și folosința terenului din OSM. PDF ≥40 pagini.',
    dece: 'Autorizarea construcțiilor pe teren extravilan agricol necesită scoaterea din circuitul agricol, condiționată de un studiu pedologic. Diferit de Studiul Geotehnic: pedologia evaluează solul AGRICOL (fertilitate, clase I–V, taxă), geotehnica evaluează solul de FUNDARE (portanță) — se completează, nu se dublează.',
    legal: 'Ordinul MADR 83/2018 · Legea 18/1991 (fondul funciar) · SRTS 2012 (ICPA) · OUG 195/2005 · metodologie bonitare ICPA',
    output: [
      { ico: '🧪', txt: 'Clasificare sol + agrochimie + bonitare (notă 0–100)' },
      { ico: '🏷', txt: 'Clasă de calitate I–V + favorabilitate scoatere' },
      { ico: '💶', txt: 'Taxă scoatere Ord. 83/2018 + relief live + PDF ≥40 pag' },
    ],
    nu: ['Determinarea exactă a clasei și notei de bonitare se face de OSPA/atestat MADR în laborator', 'Tarifele Ord. 83/2018 se actualizează anual prin HG — se verifică la data depunerii'],
  },
  silvic: {
    ico: '🌲', label: 'Studiu Regim Silvic', badge: 'recomandat', badgeLabel: 'Fond forestier · Cod Silvic', color: '77,160,0',
    fn: 'window.generateSilvic&&window.generateSilvic()',
    ce: 'Studiu privind regimul silvic și scoaterea terenului din fondul forestier național: categorii funcționale (I–V), taxă de scoatere (HG 861/2009), obligația de reîmpădurire, benzi de protecție și avize. Date LIVE: păduri din OpenStreetMap, tip pădure din Copernicus HRL, arii protejate Natura 2000 (EEA WDPA). Desenare păduri + bandă 20 m pe hartă.',
    dece: 'Construirea pe / lângă fondul forestier este strict reglementată; scoaterea din fond necesită taxă, reîmpădurire compensatorie și avize. Studiul punctual pe parcelă completează profilul silvic teritorial (rang superior) și alimentează IVU (dimensiunea mediu), Loisir (păduri de recreere) și studiile GPL (banda 20 m).',
    legal: 'Codul Silvic (Legea 46/2008) · HG 861/2009 · Ord. 1540/2011 · Legea 5/2000 · OUG 195/2005 · Ord. 19/2010 (evaluare adecvată Natura 2000)',
    output: [
      { ico: '🌲', txt: 'Categorie funcțională I–V + regim de construire' },
      { ico: '💶', txt: 'Taxă scoatere HG 861/2009 + reîmpădurire (3:1 / 1:1)' },
      { ico: '🗺', txt: 'Păduri OSM + Natura 2000 live + bandă protecție pe hartă' },
    ],
    nu: ['Apartenența la fondul forestier și categoria funcțională se stabilesc oficial pe amenajamentul silvic', 'Tarifele HG 861/2009 se indexează anual — se verifică la depunere'],
  },
  hale: {
    ico: '🏭', label: 'Proiectare hală industrială', badge: 'recomandat', badgeLabel: 'Obiect 3D + planșe', color: '167,139,250',
    fn: 'window.proiecteazaHala&&window.proiecteazaHala()',
    ce: 'Proiectează hala industrială/depozit ca OBIECT 3D REAL în motorul AEDIS (volum pe parcelă, vizibil pe hartă și în Viewer 3D), cu dimensionare automată (H liberă/streașină/coamă din funcțiune), și o leagă la modulul de Planșe (plan/secțiuni/fațade/acoperiș) și la AI Render fotorealist. Fișa tehnică PDF (dimensionare + compartiment P118 + POT/CUT) rămâne disponibilă separat în Rapoarte.',
    dece: 'Halele sunt obiecte de proiectat, nu doar de descris: platforma generează volumul 3D și planșele arhitecturale prin aceleași motoare ca la clădirile rezidențiale (AEDIS + relevee), astfel încât hala devine un obiect real, editabil și vizualizabil, integrat în platformă.',
    legal: 'NP 008-97 · P118/1-2015 · Legea 319/2006 · GP 114-2006 · Eurocod 1/2/3 · HG 525/1996 (RGU) · GT 035-02',
    output: [
      { ico: '🧱', txt: 'Volum 3D hală în AEDIS (hartă + Viewer 3D) + AI render' },
      { ico: '📐', txt: 'Planșe (plan/secțiuni/fațade/acoperiș) prin modulul relevee' },
      { ico: '📊', txt: 'Dimensionare + compartiment P118 + POT/CUT (fișă PDF în Rapoarte)' },
    ],
    nu: ['Pre-proiectare (temă/anteproiect) — nu înlocuiește proiectul tehnic și calculul structural Eurocod', 'Scenariul complet de incendiu se face în modulul SSI, avizat ISU'],
  },
  'utilitati-nationale': {
    ico: '⚡', label: 'Utilități naționale (SEN + transport)', badge: 'recomandat', badgeLabel: 'Infrastructură · date LIVE', color: '147,197,253',
    fn: 'window.UtilitatiRO&&window.UtilitatiRO.openPanel&&window.UtilitatiRO.openPanel()',
    ce: 'Dashboard LIVE al Sistemului Energetic Național (producție/consum/sold + mix pe surse + interconexiuni transfrontaliere, în timp real de la Transelectrica) și desenarea rețelelor de transport (linii 400/220/110 kV + conducte gaz SNT) pe hartă din OpenStreetMap.',
    dece: 'Traseele de utilități de transport nu erau vizibile în platformă, iar datele energetice reale (câtă energie produce/consumă România acum, din ce surse) nu erau expuse. Hărțile oficiale Transelectrica/Transgaz sunt schematice statice; aici traseele vin din OSM (machine-readable) iar datele live din feed-ul SEN. Alimentează SKID (proximitate gaz), SSI (apă/gaz/hidranți) și Hale (branșamente).',
    legal: 'CN Transelectrica SA (operator transport energie) · SNTGN Transgaz SA (transport gaze) · date publice; distribuția locală aparține operatorilor de distribuție',
    output: [
      { ico: '⚡', txt: 'SEN LIVE: producție/consum/sold + mix surse + interconexiuni' },
      { ico: '🗺', txt: 'Rețele 400/220/110 kV + gaz SNT pe hartă (OSM, colorate pe voltaj)' },
      { ico: '📏', txt: 'Proximitate linie/conductă pentru studiile de obiect (SKID/SSI/Hale)' },
    ],
    nu: ['Hărțile Transgaz/Transelectrica sunt schematice statice — folosite ca referință/denumiri, nu ca feed', 'Distribuția de joasă tensiune / branșamentele gaz aparțin operatorilor de distribuție (nu în RET/SNT)'],
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
    ico: '🔔', label: 'Notificarea vecinilor afectați', badge: 'recomandat', badgeLabel: 'Primărie · Aarhus', color: '94,234,212',
    fn: 'window.Notificari&&window.Notificari.openPanel&&window.Notificari.openPanel()',
    ce: 'Latura PRIMĂRIEI (funcționează acum): la înregistrarea unui PUZ/AC, sistemul desenează zona de notificare (buffer 50-200m) și identifică imobilele afectate (din OSM/cadastru) — proprietarii de notificat. Latura cetățean (abonare + email automat) urmează mecanismul planningalerts și necesită server.',
    dece: 'Notificarea vecinilor azi = afiș fizic + anunț în ziar, pe care nimeni nu le citește (Convenția Aarhus cere participare reală). Mecanismul corect: autoritatea publică cererea → server face matching geospatial cu abonații → email. UrbanX livrează partea legal relevantă (cine e afectat); livrarea email = Faza 2.',
    legal: 'Legea 50/1991 (art. 6 afișare la fața locului, art. 7¹ termen obiecție 10 zile) · Ordin 839/2009 · Convenția Aarhus',
    output: [
      { ico: '🏛', txt: 'Zona de notificare + imobile afectate pe hartă (latura primăriei)' },
      { ico: '📋', txt: 'Nr. proprietari de notificat + termen obiecție 10 zile' },
      { ico: '🔔', txt: 'Abonare cetățean + email automat = Faza 2 (server)' },
    ],
    nu: ['Abonarea + emailul către cetățeni necesită server + ca primăria să publice cererile (Faza 2)', 'SUPLIMENTEAZĂ afișajul fizic (art. 6), nu-l înlocuiește', 'Lista exactă de proprietari (nume/CF) = date ANCPI'],
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
  market: {
    ico: '📈', label: 'Market Intelligence imobiliar', badge: 'recomandat', badgeLabel: 'Investitor · piață', color: '16,185,129',
    fn: 'window.Market&&window.Market.openPanel&&window.Market.openPanel()',
    ce: 'Inteligență de piață per UAT și tip de imobil (apartament/casă/teren/comercial/birou): preț median €/mp (și RON), interval min-max, variație pe 3 și 12 luni (trend SVG), pipeline ofertă, comparare între UAT-uri. Poți adăuga tranzacții reale locale manual.',
    dece: 'Era singura piesă lipsă din lanțul investițional — modulele Investment Score și Pro-forma o așteptau ca sursă de preț. Fără un reper de piață, scorul de oportunitate și fezabilitatea rămân pe ipoteze. UrbanX agregă tranzacțiile (date publice din cărțile funciare) într-un indicator de piață.',
    legal: 'Legea 7/1996 art. 51 (publicitatea cărților funciare — date publice) · GDPR L.190/2018 (prețuri agregate, fără nume) · Legea 297/2004. Disclaimer: „Nu constituie consultanță financiară sau investițională."',
    output: [
      { ico: '💶', txt: 'Preț median €/mp + RON + interval min-max + medie' },
      { ico: '📉', txt: 'Variație 3 luni / 12 luni + trend SVG pe 12 luni' },
      { ico: '⚖', txt: 'Comparare UAT-uri (același tip) + raport PDF' },
    ],
    nu: ['Date demonstrative — tranzacțiile reale (ANCPI eTranzacții) = Faza 2 (server)', 'Nu constituie consultanță financiară/investițională', 'Prețuri agregate, fără date personale (GDPR)'],
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
  // ── Module noi (folosesc drawer-ul STANDARD) ──
  rcai_parcela: {
    ico: '🏺', label: 'Raport Cercetare Arheologică — Parcelă', badge: 'recomandat', badgeLabel: 'Patrimoniu · risc investiție', color: '180,83,9',
    fn: "window._RCAI&&window._RCAI.generatePDF(window.TCI&&window.TCI.cityKey,'S')",
    ce: 'Evaluează potențialul arheologic al amplasamentului/zonei selectate și riscul pe care patrimoniul îngropat îl poate genera pentru investiție. Integrează cercetarea documentară, cartografică (planuri istorice) și arheologică (situri RAN, monumente LMI, cercetări anterioare), geomorfologia și o stratigrafie estimativă, cu evaluarea potențialului și scenarii de risc.',
    dece: 'Anticipă obligațiile arheologice (supraveghere, diagnostic, cercetare preventivă, descărcare de sarcină) înainte de demararea lucrărilor, evitând sistarea șantierului. Orientează beneficiarul, proiectantul și autoritatea de avizare (DJC/MCIN) conform OG 43/2000 și Legii 422/2001.',
    legal: 'OG 43/2000 · Legea 422/2001 · norme MCIN · Convenția de la Valletta',
    output: [
      { ico: '🏺', txt: 'Evaluarea potențialului arheologic (ridicat/mediu/redus) al amplasamentului' },
      { ico: '🗺', txt: 'Analiză cartografică — planuri istorice suprapuse pe situația actuală' },
      { ico: '📊', txt: 'Context arheologic: situri RAN, monumente LMI, cercetări anterioare' },
      { ico: '📐', txt: 'Stratigrafie estimativă pe niveluri, cu adâncimi și probabilitate' },
      { ico: '⚠️', txt: 'Analiza riscului pentru investiție — scenarii A/B/C/D cu cost și durată' }
    ],
    nu: ['Selectează o parcelă pe hartă pentru raport punctual', 'Document de pre-cercetare — nu înlocuiește raportul unui arheolog autorizat MCIN și nu are valoare juridică în avizare'],
  },
  rcai_teritoriu: {
    ico: '🏺', label: 'RCAI Teritoriu — Cercetare Arheologică UAT', badge: 'optional', badgeLabel: 'Patrimoniu · teritorial', color: '180,83,9',
    fn: "window._RCAI&&window._RCAI.generatePDF(window.TCI&&window.TCI.cityKey,'T')",
    ce: 'Inventarul și evaluarea patrimoniului arheologic la nivelul întregului UAT: evoluția istorică, siturile RAN și monumentele LMI, cercetările anterioare, geomorfologia și zonarea potențialului arheologic pe teritoriu. Document teritorial amplu.',
    dece: 'Fundamentează capitolele de patrimoniu din SIDU/Masterplan și deciziile de planificare teritorială; semnalează zonele cu potențial arheologic ridicat care necesită prudență la dezvoltare.',
    legal: 'OG 43/2000 · Legea 422/2001 · norme MCIN · Convenția de la Valletta',
    output: [
      { ico: '🗺', txt: 'Zonarea potențialului arheologic pe teritoriul UAT' },
      { ico: '📊', txt: 'Inventar situri RAN și monumente LMI' },
      { ico: '🏺', txt: 'Evoluția istorică a așezării pe perioade' },
      { ico: '⚠️', txt: 'Zone sensibile și recomandări pentru planificare' }
    ],
    nu: ['Document de pre-cercetare — nu înlocuiește cercetarea unui arheolog autorizat MCIN', 'Pentru raport pe o parcelă, folosește „RCAI Parcelă/Zonă" din meniul Rapoarte'],
  },
  hbu_teritoriu: {
    ico: '🏗', label: 'HBU Teritoriu — Reconversie (UAT)', badge: 'recomandat', badgeLabel: 'Strategic · teritorial', color: '217,119,6',
    fn: "window._HBU&&window._HBU.generatePDF(window.TCI&&window.TCI.cityKey,'T')",
    ce: 'Studiu TERITORIAL de reconversie urbană la nivelul întregului UAT: cadrul metodologic Highest & Best Use, profilul economic și de piață al orașului, ierarhia funcțiunilor de reconversie și politica de regenerare a siturilor subutilizate/industriale. Document amplu (100+ pagini), complementar celui de parcelă.',
    dece: 'Fundamentează strategia de regenerare urbană din SIDU/Masterplan: ce tipuri de reconversie sunt prioritare în oraș, în ce zone și cu ce instrumente (POR, PNRR, captare de plusvaloare).',
    legal: 'Metodologie HBU (IVS/ANEVAR) · Legea 350/2001 · POR Axa 5 · PNRR · Carta de la Leipzig',
    output: [
      { ico: '📊', txt: 'Ierarhia funcțiunilor de reconversie la nivel de oraș' },
      { ico: '🗺', txt: 'Hărți, diagrame și indici teritoriali' },
      { ico: '🏛', txt: 'Cadru legal, european și instrumente de finanțare' },
      { ico: '🎯', txt: 'Politică de regenerare și monitorizare (100+ pagini)' }
    ],
    nu: ['Pentru analiza unei parcele anume folosește „HBU Parcelă" din meniul Rapoarte', 'Pre-analiză strategică — orientează deciziile, nu înlocuiește fezabilitatea'],
  },
  hbu: {
    ico: '🏗', label: 'HBU Parcelă — Reconversie (punctual)', badge: 'recomandat', badgeLabel: 'Investițional · parcelă', color: '217,119,6',
    fn: "window._HBU&&window._HBU.openPanel(window.TCI&&window.TCI.cityKey)",
    ce: 'Studiu PUNCTUAL de reconversie pentru parcela selectată și ZONA (UTR/subzona) din care face parte: regimul urbanistic real al parcelei (POT/CUT/Hmax/retrageri), edificabilul teoretic, cele 4 teste HBU aplicate pe amplasament, vecinătatea imediată (dotări <500m), scor pentru 12 funcțiuni și pre-analiză financiară (GDV/CAPEX/profit/ROI). Min. 50+ pagini.',
    dece: 'Fundamentează decizia de reconversie/achiziție și negocierile cu administrația sau investitorii, eliminând incertitudinea prin metodologia IVS/ANEVAR și repere de piață. Sprijină regenerarea urbană și densificarea în locul expansiunii periferice.',
    legal: 'Metodologie HBU (IVS/ANEVAR) · Legea 350/2001 · POR Axa 5 · PNRR',
    output: [
      { ico: '📊', txt: 'Scor de compatibilitate pentru 12 funcțiuni de reconversie' },
      { ico: '💰', txt: 'Analiză financiară: GDV, CAPEX, profit, ROI și sensibilitate' },
      { ico: '⚠️', txt: 'Constrângeri și due diligence (contaminare, seismic, patrimoniu, PUZ)' },
      { ico: '🎯', txt: 'Scenariul recomandat cu etapizare și instrumente de finanțare' }
    ],
    nu: ['Selectează o parcelă pentru analiză punctuală; altfel se analizează centrul UAT', 'Pre-analiză — necesită studiu de fezabilitate și due diligence'],
  },
  clima: {
    ico: '🌦', label: 'Profil Climatic & Studiu (SECAP)', badge: 'recomandat', badgeLabel: 'Climă · adaptare', color: '37,99,235',
    fn: "window._ClimateEngine&&window._ClimateEngine.generatePDF(window.TCI&&window.TCI.cityKey)",
    ce: 'Caracterizează regimul climatic al UAT din date publice reale (Open-Meteo / Copernicus ERA5): temperaturi și precipitații medii lunare, grade-zile de încălzire/răcire (HDD/CDD), profil sezonier, zile tropicale și de îngheț, indice de confort climatic.',
    dece: 'Fundamentează SECAP, eficiența energetică (nZEB) și măsurile de adaptare la căldură și la apele pluviale (infrastructură verde-albastră). Sprijină capitolele de mediu și risc din SIDU/MP/PMUD.',
    legal: 'Open-Meteo / Copernicus C3S · EN ISO 15927 (grade-zile) · IPCC AR6 · cadru SECAP',
    output: [
      { ico: '🌡', txt: 'Regim termic și pluviometric — diagrame lunare' },
      { ico: '📐', txt: 'Grade-zile încălzire/răcire (HDD/CDD) și indice de confort' },
      { ico: '🌳', txt: 'Implicații de adaptare: insulă de căldură, ape pluviale, spații verzi' },
      { ico: '📈', txt: 'Semnal de schimbare climatică și scenarii' }
    ],
    nu: ['Date orientative (reanaliză) — pentru proiectare se folosesc datele oficiale ANM', 'Nu substituie un studiu climatologic de specialitate'],
  },
  economie: {
    ico: '💰', label: 'Analiză economică a UAT', badge: 'recomandat', badgeLabel: 'Finanțe locale', color: '13,148,136',
    fn: "window._Economy&&window._Economy.generatePDF(window.TCI&&window.TCI.cityKey)",
    ce: 'Analizează situația economică și financiară a UAT, micro și macro: structura veniturilor bugetului local (venituri proprii, cote IPV, sume TVA, subvenții, fonduri UE), autonomia fiscală și dependența de bugetul de stat, cheltuielile de funcționare vs. dezvoltare.',
    dece: 'Oferă administrației un tablou al capacității de a-și finanța prioritățile și de a co-finanța proiecte europene; investitorilor — contextul economic; proiectanților — repere pentru fundamentare.',
    legal: 'Legea 273/2006 (finanțe publice locale) · Ministerul Finanțelor · INS · Eurostat',
    output: [
      { ico: '📊', txt: 'Structura veniturilor bugetului local (diagramă)' },
      { ico: '🏛', txt: 'Autonomie fiscală vs. dependență de bugetul de stat și județean' },
      { ico: '🔧', txt: 'Cheltuieli funcționare vs. dezvoltare; capacitate de investiție' },
      { ico: '📈', txt: 'Benchmark pe categorii de UAT și recomandări de consolidare' }
    ],
    nu: ['Valori orientative (model L.273/2006) — pentru cifre oficiale: execuția bugetară MFP', 'Nu substituie analiza unui expert în finanțe publice'],
  },
  valori: {
    ico: '💶', label: 'Hartă Valori Imobiliare (€/mp)', badge: 'optional', badgeLabel: 'Rentă urbană', color: '16,124,92',
    fn: "window._ValueMap&&window._ValueMap.show('apartament')",
    ce: 'Afișează pe hartă valoarea estimată €/mp printr-un model de rentă urbană (von Thünen/Alonso): valoarea scade radial de la centru și se modulează pe zone funcționale. Re-click pe buton = ascunde stratul.',
    dece: 'Util pentru pre-evaluare, identificarea terenurilor subutilizate semicentrale și calibrarea bazei de impozitare. Pentru raportul complet folosește „Studiu Valori Imobiliare (PDF)".',
    legal: 'Model rentă urbană UrbanX · ANCPI (L.7/1996) · standardele ANEVAR/IVS',
    output: [
      { ico: '🗺', txt: 'Heatmap valoric €/mp pe hartă' },
      { ico: '📊', txt: 'Distribuție valorică pe benzi (periferie/median/central)' },
      { ico: '📈', txt: 'Scenarii de evoluție a valorii (orizont 3–5 ani)' }
    ],
    nu: ['Valori orientative — nu substituie o evaluare ANEVAR', 'Acoperirea datelor de piață variază teritorial'],
  },
  valori_pdf: {
    ico: '📄', label: 'Studiu Valori Imobiliare (PDF)', badge: 'recomandat', badgeLabel: 'Evaluare de piață', color: '16,124,92',
    fn: "window._ValueMap&&window._ValueMap.generatePDF()",
    ce: 'Generează studiul complet de valori imobiliare: metodologie și formulă, distribuție valorică, factori determinanți, scenarii de evoluție, hartă a valorilor și secțiunea Nota UrbanX (IVU).',
    dece: 'Susține deciziile de investiție și politicile fiscale locale cu o pre-evaluare structurată, în format unitar SIDU.',
    legal: 'Model rentă urbană · ANCPI · ANEVAR/IVS · Eurostat',
    output: [
      { ico: '🗺', txt: 'Captura hărții de valori' }, { ico: '📊', txt: 'Distribuție valorică și factori determinanți' },
      { ico: '📈', txt: 'Predicții pe scenarii' }, { ico: '🏆', txt: 'Secțiunea Nota UrbanX (IVU)' }
    ],
    nu: ['Valori orientative — nu substituie o evaluare ANEVAR'],
  },
  registru: {
    ico: '📋', label: 'Registru Indicatori Urbani', badge: 'optional', badgeLabel: 'Audit indicatori', color: '124,58,237',
    fn: "window.IndicatorsRegistry&&window.IndicatorsRegistry.generate(window.TCI&&window.TCI.cityKey)",
    ce: 'Document de audit care enumeră toți indicatorii urbani monitorizați de platformă, grupați pe 8 domenii, fiecare cu definiție, metodă/formulă și sursă oficială. Include secțiunea Nota UrbanX (IVU).',
    dece: 'Demonstrează transparența și acoperirea metodologică a platformei; baza cantitativă a documentelor strategice.',
    legal: 'ISO 37120/37122 · UN-Habitat SDG 11 · EEA · OMS · INS · Eurostat',
    output: [
      { ico: '📊', txt: 'Indicatori pe 8 domenii cu definiție, formulă și sursă' },
      { ico: '🎯', txt: 'Praguri, ținte și benchmarking' }, { ico: '🏆', txt: 'Secțiunea Nota UrbanX (IVU)' }
    ],
    nu: ['Valorile per-UAT se calculează în modulele dedicate'],
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
  // ═══ TERITORIU & HĂRȚI · RISCURI · CETĂȚENI · PREZENTARE (UXSidebar) ═══
  dashboardUAT: {
    ico: '📊', label: 'Dashboard UAT Live', badge: 'recomandat', badgeLabel: 'Date live · INS·Eurostat·OSM·GHSL', color: '96,165,250',
    fn: "window.UXSidebar&&UXSidebar.openModule('dashboardUAT')",
    ce: 'Tabloul de bord în timp real al UAT-ului: demografie (populație, structură de vârstă, traiectorie 2011→2021), economie (salariu, șomaj, firme), infrastructură urbană din OSM pe rază (școli, spitale, transport, parcuri, farmacii etc.), necesarul de locuințe pe scenarii și suprafața construită din GHSL. Datele se încarcă live din surse oficiale, cu data și sursa afișate.',
    dece: 'Înainte de orice studiu sau decizie ai nevoie de o radiografie rapidă și obiectivă a orașului — „unde stăm acum". Dashboard-ul strânge într-un singur loc indicatorii-cheie din surse deschise, ca punct de pornire pentru analize, prezentări și fundamentări.',
    legal: 'Surse: INS TEMPO-Online · Eurostat · OpenStreetMap (ODbL) · GHSL (Comisia Europeană/JRC). Indicatori orientativi din date deschise.',
    output: [
      { ico: '👥', txt: 'Demografie: populație, structură de vârstă, traiectorie 2011-2021' },
      { ico: '💼', txt: 'Economie: salariu mediu, șomaj, mediu de afaceri' },
      { ico: '🏙', txt: 'Infrastructură OSM pe rază (POI, click → afișare pe hartă)' },
      { ico: '🏠', txt: 'Necesar de locuințe pe scenarii + suprafață construită GHSL' },
    ],
    nu: ['Indicatori orientativi din date deschise — nu substituie statistica oficială validată', 'Acuratețea POI depinde de completitudinea OSM pentru UAT'],
  },
  ghsl: {
    ico: '🛰', label: 'GHSL — suprafață construită 1975-2055', badge: 'recomandat', badgeLabel: 'Strat satelitar · expansiune urbană', color: '96,165,250',
    fn: "window.UXSidebar&&UXSidebar.openModule('ghsl')",
    ce: 'Afișează stratul GHSL (Global Human Settlement Layer) — suprafața construită derivată din imagini satelitare, pe intervale din 1975 până azi, cu proiecție către 2055. Vizualizează cum s-a extins amprenta urbană în timp și unde se concentrează creșterea (expansiune vs. densificare).',
    dece: 'Expansiunea necontrolată a intravilanului (urban sprawl) crește costurile de infrastructură și consumă terenul agricol. GHSL oferă o măsură obiectivă, comparabilă internațional, a modului în care orașul a crescut — esențială pentru a decide între extindere și regenerare.',
    legal: 'GHSL — Comisia Europeană, Joint Research Centre (JRC). Date deschise. Rezoluție și an de referință conform produsului GHS-BUILT.',
    output: [
      { ico: '🗺', txt: 'Strat suprafață construită pe hartă, pe intervale temporale' },
      { ico: '📈', txt: 'Traiectoria amprentei urbane 1975 → prezent → proiecție 2055' },
      { ico: '🌍', txt: 'Citire expansiune vs. densificare' },
    ],
    nu: ['Produs satelitar global — acuratețe locală limitată față de cadastru/PUG', 'Proiecția este o extrapolare de model, nu un plan aprobat'],
  },
  coridoare: {
    ico: '🧭', label: 'Coridoare de dezvoltare spațială', badge: 'recomandat', badgeLabel: 'Direcții de creștere · axe', color: '96,165,250',
    fn: "window.UXSidebar&&UXSidebar.openModule('coridoare')",
    ce: 'Identifică și desenează pe hartă coridoarele de dezvoltare spațială ale UAT-ului — direcțiile preferențiale de creștere urbană de-a lungul axelor de infrastructură (drumuri majore, căi ferate, râuri), pe baza datelor de localizare a activității și a rețelei.',
    dece: 'Orașele nu cresc uniform, ci de-a lungul unor axe. Înțelegerea coridoarelor ajută la corelarea dezvoltării cu transportul public (TOD), la evitarea expansiunii haotice și la prioritizarea investițiilor în infrastructură acolo unde presiunea de creștere e reală.',
    legal: 'Instrument analitic (orientativ). Concept: dezvoltare orientată spre transit (TOD) · axe de dezvoltare din planificarea teritorială (Legea 350/2001).',
    output: [
      { ico: '🗺', txt: 'Coridoare de creștere desenate pe hartă' },
      { ico: '🚆', txt: 'Corelare cu axele de infrastructură (drum/CF/râu)' },
      { ico: '🎯', txt: 'Suport pentru prioritizarea investițiilor și TOD' },
    ],
    nu: ['Model analitic orientativ — nu substituie strategia de dezvoltare aprobată', 'Depinde de datele de rețea și activitate disponibile'],
  },
  importPug: {
    ico: '📥', label: 'Import PUG digital (GeoJSON/KML)', badge: 'recomandat', badgeLabel: 'Instrument · încărcare zonare', color: '55,138,221',
    fn: "window.UXSidebar&&UXSidebar.openModule('importPug')",
    ce: 'Permite încărcarea unui Plan Urbanistic General digital (fișier GeoJSON sau KML) în platformă, pentru a vizualiza zonarea funcțională și a o folosi în analize. Util când UAT-ul are PUG-ul digitalizat dar nu e încă integrat nativ în UrbanX.',
    dece: 'Multe primării au PUG-ul în format digital (de la proiectant) dar nu îl pot exploata interactiv. Importul aduce zonarea în platformă, unde se poate suprapune peste hartă, parcele și module — fără să aștepți integrarea oficială.',
    legal: 'PUG aprobat conform Legii 350/2001. CRS recomandat: WGS84 (EPSG:4326). Fișierul rămâne local în sesiune.',
    output: [
      { ico: '🗂', txt: 'Încărcare GeoJSON/KML cu zonarea PUG' },
      { ico: '🗺', txt: 'Afișare zonare funcțională peste hartă' },
      { ico: '🔗', txt: 'Folosire în analize și suprapunere cu parcele' },
    ],
    nu: ['Vizualizare orientativă — sursa de adevăr rămâne PUG-ul oficial aprobat', 'Geometriile incorecte (CRS greșit) se afișează deplasat'],
  },
  riscSeismic: {
    ico: '🌍', label: 'Simulare cutremur (mag. 5-8, Vrancea)', badge: 'recomandat', badgeLabel: 'Protecție civilă · scenariu seismic', color: '239,68,68',
    fn: "window.UXSidebar&&UXSidebar.openModule('riscSeismic')",
    ce: 'Simulează un cutremur cu magnitudine aleasă (5-8) cu sursa în zona Vrancea (INFP, adâncime ~95 km), folosind atenuarea Kovesligethy și estimarea PGA (Wald 1999), cu intensitate pe scara EMS-98. Compară accelerația rezultată cu valoarea de proiectare ag din normativul P100 și desenează pe hartă discul de scuturare, tenta pe clădiri și epicentrul.',
    dece: 'România are cel mai mare risc seismic din UE continentală (sursa Vrancea afectează jumătate de țară). O simulare rapidă arată ce intensitate ar resimți UAT-ul și cum se raportează la nivelul de proiectare — util pentru conștientizare, planuri de urgență și prioritizarea consolidărilor.',
    legal: 'P100-1 (cod de proiectare seismică) · INFP (catalog seismic Vrancea) · Kovesligethy (atenuare intensitate) · Wald 1999 (relații PGA-intensitate) · EMS-98.',
    output: [
      { ico: '🗺', txt: 'Disc de scuturare + tentă pe clădiri + epicentru pe hartă' },
      { ico: '📉', txt: 'PGA și intensitate EMS-98 estimate la nivelul UAT' },
      { ico: '⚖️', txt: 'Comparație cu ag de proiectare (P100)' },
    ],
    nu: ['SCENARIU de conștientizare — nu este o evaluare seismică structurală', 'Vulnerabilitatea reală a clădirilor necesită expertiză tehnică (P100-3)'],
  },
  riscFlood: {
    ico: '🌊', label: 'Predicție inundație pluvială', badge: 'recomandat', badgeLabel: 'Protecție civilă · scenariu ape', color: '239,68,68',
    fn: "window.UXSidebar&&UXSidebar.openModule('riscFlood')",
    ce: 'Estimează inundația pluvială (din ploaie torențială) pentru intensități presetate (25/45/70/100 mm), folosind metoda rațională (Q = C·i·A) și un bilanț de volum „bathtub" pe modelul digital de elevație real (DEM Terrain-RGB). Arată pe hartă zonele joase unde s-ar acumula apa.',
    dece: 'Inundațiile pluviale (nu din râu) sunt tot mai frecvente în orașe, din cauza impermeabilizării și a canalizării subdimensionate. Simularea identifică punctele critice (depresiuni, subtraversări) unde apa se adună — util pentru planuri de urgență și pentru proiectarea infrastructurii verzi-albastre.',
    legal: 'Metoda rațională (Q=C·i·A) · SR 1846 (canalizare) · Directiva 2007/60/CE (inundații) · DEM Copernicus/Terrain-RGB.',
    output: [
      { ico: '🗺', txt: 'Zone de acumulare a apei pe hartă (pe DEM real)' },
      { ico: '💧', txt: 'Volum și adâncime estimate per scenariu de ploaie' },
      { ico: '🎯', txt: 'Puncte critice pentru intervenții (sponge city)' },
    ],
    nu: ['SCENARIU simplificat (bathtub) — nu înlocuiește un model hidraulic 2D (HEC-RAS, MIKE)', 'Nu modelează canalizarea reală; rezultatul e indicativ'],
  },
  riscAla: {
    ico: '🛡', label: 'Inventar adăposturi ALA', badge: 'recomandat', badgeLabel: 'Protecție civilă · candidați adăpostire', color: '239,68,68',
    fn: "window.UXSidebar&&UXSidebar.openModule('riscAla')",
    ce: 'Identifică din OpenStreetMap clădirile-candidat pentru adăpostire a populației (blocuri P+3 și peste, instituții publice cu subsol/parter rezistent), conform principiilor NP-073, și estimează capacitatea de adăpostire (amprentă × 0,4 / 2,5 mp/persoană). Le afișează pe hartă ca rețea posibilă de adăposturi.',
    dece: 'În caz de dezastru (seism, conflict), populația are nevoie de spații de adăpostire identificate din timp. UrbanX oferă o primă cartare automată a candidaților, ca punct de plecare pentru planul de protecție civilă — care apoi se validează la ISU.',
    legal: 'NP-073 (norme adăposturi de protecție civilă) · Legea 481/2004 (protecția civilă). NU este registrul oficial ISU al adăposturilor.',
    output: [
      { ico: '🗺', txt: 'Clădiri-candidat pentru adăpostire pe hartă' },
      { ico: '👥', txt: 'Capacitate estimată de adăpostire (persoane)' },
      { ico: '📋', txt: 'Punct de plecare pentru planul de protecție civilă' },
    ],
    nu: ['Estimare din OSM — NU este inventarul oficial ISU al adăposturilor ALA', 'Capacitatea reală depinde de structură, dotări și avizare'],
  },
  retele: {
    ico: '🔌', label: 'Rețele edilitare pe hartă', badge: 'recomandat', badgeLabel: 'Infrastructură · OSM', color: '239,68,68',
    fn: "window.UXSidebar&&UXSidebar.openModule('retele')",
    ce: 'Aduce din OpenStreetMap și desenează cu geometrie rețelele edilitare și de transport din zonă: energie (linii, stații), conducte (gaz/apă), căi ferate și cursuri de apă — cu legendă pe tipuri. Oferă o imagine a infrastructurii majore care condiționează dezvoltarea.',
    dece: 'Orice dezvoltare depinde de infrastructura existentă (branșamente, culoare tehnice, servituți). Vizualizarea rețelelor ajută la identificarea constrângerilor și a oportunităților de racordare, înainte de a planifica intervenții.',
    legal: 'Date OpenStreetMap (ODbL). Pentru trasee exacte și servituți = operatorii de utilități (avize). Orientativ.',
    output: [
      { ico: '⚡', txt: 'Energie: linii și stații electrice' },
      { ico: '🚰', txt: 'Conducte (gaz/apă) + cursuri de apă' },
      { ico: '🚆', txt: 'Căi ferate + legendă pe tipuri' },
    ],
    nu: ['Date OSM orientative — trasee și servituți exacte = operatorii de utilități', 'Acoperirea variază mult în funcție de cât e cartat OSM local'],
  },
  participare: {
    ico: '🗣', label: 'Participare publică (model Helsinki)', badge: 'recomandat', badgeLabel: 'Cetățeni · consultare geolocalizată', color: '29,158,117',
    fn: "window.UXSidebar&&UXSidebar.openModule('participare')",
    ce: 'Strat de participare publică în stil Helsinki/Decidim: comentarii ale cetățenilor geolocalizate pe hartă, pe categorii (mobilitate, spații verzi, siguranță etc.), cu voturi și invitație la dialog. Transformă consultarea dintr-o formalitate într-o hartă vie a nevoilor exprimate de comunitate.',
    dece: 'Consultarea publică e obligatorie legal, dar de multe ori e bifată formal. Un instrument geolocalizat aduce vocile cetățenilor exact acolo unde e problema și le face vizibile și prioritizabile — crescând legitimitatea deciziilor de urbanism.',
    legal: 'Legea 350/2001 (informarea și consultarea publicului) · Convenția Aarhus (acces la decizie în probleme de mediu) · Ordinul MDRT 2701/2010 (consultare PUZ/PUG).',
    output: [
      { ico: '🗺', txt: 'Comentarii cetățeni geolocalizate pe hartă, pe categorii' },
      { ico: '👍', txt: 'Voturi pe propuneri/sesizări + ierarhizare' },
      { ico: '💬', txt: 'Invitație la dialog și transparență' },
    ],
    nu: ['Demonstrativ client-side — portalul public oficial cu autentificare + arhivare = Faza 2 (server)', 'Nu înlocuiește dezbaterea publică legală, o pregătește'],
  },
  film: {
    ico: '🎬', label: 'Film cinematic (prezentare animată)', badge: 'recomandat', badgeLabel: 'Prezentare · ~25 scene automate', color: '139,92,246',
    fn: "window.UXSidebar&&UXSidebar.openModule('film')",
    ce: 'Pornește prezentarea cinematică a UAT-ului — un film automat de ~25 de scene care animează pe hartă datele și analizele platformei: creștere urbană, demografie, riscuri, mobilitate, proiecte, cultură/turism, faună, nota UrbanX etc. Fiecare scenă are vizual real pe hartă, nu doar text.',
    dece: 'Pentru ședințe de consiliu, prezentări la finanțatori sau evenimente publice, un film coerent comunică mult mai bine decât tabele. Prezentarea transformă datele tehnice într-o poveste urbană ușor de urmărit, cu pauză pentru explicații.',
    legal: 'Instrument de comunicare. Datele provin din sursele platformei (INS/Eurostat/OSM/GHSL/INFP etc.), citate în scene.',
    output: [
      { ico: '🎞', txt: '~25 scene automate cu vizual real pe hartă' },
      { ico: '⏸', txt: 'Control: pauză/avans pentru prezentare live' },
      { ico: '🏆', txt: 'Include nota UrbanX (IVU) și metodologia' },
    ],
    nu: ['Material de prezentare — indicatorii rămân orientativi (vezi Metodologie)', 'Necesită hartă încărcată și conexiune pentru datele live'],
  },
  tciClasic: {
    ico: '🧩', label: 'TCI Clasic (panou interactiv)', badge: 'optional', badgeLabel: 'Prezentare · panou clasic', color: '139,92,246',
    fn: "window.UXSidebar&&UXSidebar.openModule('tciClasic')",
    ce: 'Deschide panoul interactiv clasic TCI (Territorial Context Intelligence) — varianta cu control manual a vizualizărilor teritoriale, pentru explorare pas-cu-pas a straturilor și indicatorilor, ca alternativă la filmul automat.',
    dece: 'Unii utilizatori preferă să exploreze datele în ritm propriu, comutând manual straturile, în loc să urmărească un film liniar. Panoul clasic oferă acest control fin pentru analiză sau prezentări interactive.',
    legal: 'Instrument de explorare. Surse: aceleași ca restul platformei (citate per strat).',
    output: [
      { ico: '🎛', txt: 'Comutare manuală a straturilor teritoriale' },
      { ico: '🗺', txt: 'Explorare pas-cu-pas a indicatorilor pe hartă' },
    ],
    nu: ['Panou de explorare — pentru o prezentare liniară folosește „Film cinematic"', 'Indicatori orientativi (vezi Metodologie)'],
  },
  // alias pentru butonul "stabilitate" (continutul detaliat e la stabilitate_taluzuri)
  get stabilitate(){ return this.stabilitate_taluzuri; },
};

// Expune registrul + harta alias moduleId→cheie RAPORT_INFO, ca UXSidebar să poată
// afișa AUTOMAT butonul ⓘ pentru ORICE studiu/raport cu conținut info (cerut de Florin:
// info drawer pe fiecare studiu/raport, inclusiv SIDU/Masterplan/PMUD).
try { window.RAPORT_INFO = RAPORT_INFO; } catch(e){}
window._MOD_INFO_ALIAS = {
  'sidu-doc': 'sidu_doc',        // documentul SIDU (≠ modulul „sidu" registru)
  intelligence: 'ux_capacitate', // Capacitate & conformitate UAT
  mobility: 'flux_trafic',       // Flux — studiu de trafic
  proiectie: 'proiectie_urb',    // Proiecție urbanistică 10/20/30
  aiMemoriu: 'memoriu',          // AI Memoriu justificativ
  monumente: 'heritage'          // Inventar patrimoniu & monumente (GIS)
};

// Info-drawer SPS construit DINAMIC din _SPS.STUDIES (cheie 'sps:<id>') — evită
// 20 de intrări hardcodate. Doar studiile aplicabile pe parcelă au mod parcelă.
function _spsInfoEntry(id){
  try{
    var S = window._SPS && window._SPS.STUDIES && window._SPS.STUDIES[id];
    if(!S) return null;
    var isParcel = !!S.parcel;
    var out = [
      { ico:'📑', txt:'Studiu strategic dezvoltat: copertă, cuprins, metodologie și capitole cu analiză, diagnoză, viziune și recomandări' },
      { ico:'📊', txt:'Grafice și tabele pe capitole (date reale + prognoză)' },
      { ico:'🗺', txt:'Capturi de hartă: teritoriul UAT, zonare PUG și dotări în proximitate' },
      { ico:'🎯', txt:'Secțiunea „Nota UrbanX (IVU)" — scor, formulă transparentă și benchmark' },
      { ico:'📚', txt:'Surse citate: ' + (S.surse || 'INS · Eurostat · OSM') }
    ];
    if(isParcel) out.push({ ico:'📍', txt:'Mod PARCELĂ: dacă ai o parcelă selectată, studiul se aplică punctual (CF/UTR/POT/CUT + edificabil)' });
    return {
      ico: S.ico || '📘',
      label: S.t || id,
      badge: 'recomandat',
      badgeLabel: (S.badge || 'STUDIU') + (isParcel ? ' · teritoriu/parcelă' : ' · teritorial'),
      ce: S.ce || '',
      dece: 'Fundamentează deciziile de planificare ' + (isParcel ? 'la nivel de parcelă/zonă și ' : '') + 'la nivelul UAT, conform cadrului legal aplicabil.',
      legal: S.legal || '—',
      output: out,
      nu: isParcel
        ? ['Document orientativ — nu substituie documentația de urbanism aprobată sau studiile de specialitate avizate', 'Pe parcelă, indicatorii preiau regimul PUG al zonei — se verifică cu Certificatul de Urbanism oficial']
        : ['Document strategic orientativ la nivel teritorial (UAT) — nu substituie un studiu de specialitate avizat'],
      fn: "window._SPS&&window._SPS.generate('" + id + "',window.TCI&&window.TCI.cityKey)"
    };
  }catch(e){ return null; }
}
function infoDrawerOpen(key) {
  let d = RAPORT_INFO[key];
  if(!d && key && key.indexOf('sps:')===0) d = _spsInfoEntry(key.slice(4));
  if(!d) return;
  // Închidem TOATE meniurile dropdown înainte (inclusiv UrbanX Pro / tci-adv-menu)
  try { if (typeof _closeAllMenusAndOverlay === 'function') _closeAllMenusAndOverlay(); } catch(e){}
  // Închide meniul Rapoarte DOAR dacă e deschis. toggleRapoarteMenu() e un TOGGLE
  // fără argument — apelat necondiționat (cum era înainte cu „true") îl DESCHIDEA
  // peste drawer când venea din UXSidebar (meniu închis). Bug raportat de Florin.
  try { var _rm = document.getElementById('rapoarte-menu'); if (_rm && _rm.style.display === 'block') toggleRapoarteMenu(); } catch(e){}
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
      ${d.ico} ${(window.T ? window.T('Generează') : 'Generează')} ${(window.T ? window.T(d.label) : d.label)}
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
