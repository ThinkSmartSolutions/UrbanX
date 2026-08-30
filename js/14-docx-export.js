// ── PATCH: Info drawer pentru ISU, Fezabilitate, Amplasament ─────────────────
// Template identic cu AACR: CE ANALIZEAZĂ / DE CE E NECESAR / BAZA LEGALĂ /
// CE PRIMEȘTI ÎN RAPORT / CÂND NU SE APLICĂ + buton Generează
const _STUDII_EXTRA = {

  isu: {
    ico:'🔥', titlu:'Studiu de Siguranță la Foc (ISU)',
    badge:'SECURITATE INCENDIU', badgeColor:'#ef4444',
    pagini:12, norma:'P118-1/2015',
    ce_analizeaza:'Verifică dacă clădirea propusă respectă normele de securitate la incendiu conform P118-1/2015 și P118-2/2013. Calculează categoria de pericol de incendiu, gradul de rezistență la foc necesar, dimensionează căile de evacuare și determină dacă este obligatoriu avizul ISU Moldova înainte de Autorizația de Construire.',
    de_ce:'Orice clădire cu înălțime mai mare de 8m sau suprafață desfășurată mai mare de 600mp necesită obținerea Avizului de Securitate la Incendiu de la ISU Moldova înainte de emiterea Autorizației de Construire. Construirea fără acest aviz atrage oprirea lucrărilor și aplicarea de amenzi contravenționale.',
    baza_legala:['P118-1/2015 — Normativ privind securitatea la incendiu a construcțiilor','P118-2/2013 — Normativ privind securitatea la incendiu a instalațiilor de stingere','Legea nr. 307/2006 privind apărarea împotriva incendiilor','Ordinul MAI nr. 163/2007 — Norme generale de apărare împotriva incendiilor','Legea 169/2026 (CATUC) — Autorizația de Construire cu aviz ISU'],
    ce_primesti:[
      {ico:'🏗', txt:'Clasificarea clădirii: categorie pericol incendiu (A-E) și grad de rezistență la foc (I-V)'},
      {ico:'🚒', txt:'Căi de acces ISU: lățime min. 3.5m (1 vehicul) / 5.5m (2 vehicule), distanță max. 80m'},
      {ico:'💧', txt:'Hidranți exteriori și interiori — necesitate, amplasament, debit de calcul'},
      {ico:'🔔', txt:'Sisteme DASI (detecție-alarmare-stingere incendiu) — când sunt obligatorii'},
      {ico:'🚪', txt:'Evacuare persoane: distanțe maxime, număr scări, lățimi coridoare (min. 1.2m)'},
      {ico:'🧱', txt:'Compartimentare la foc: pereți, planșee, uși rezistente la foc — REI minim'},
      {ico:'📋', txt:'Procedura aviz ISU: documente necesare, taxe, termen emitere (30-60 zile)'},
      {ico:'🪜', txt:'Scară pompieri — obligatorie la H>28m, cu specificații de montaj'},
    ],
    cand_nu:[
      'Clădiri cu H≤8m ȘI suprafață desfășurată ≤600mp fără funcțiuni cu pericol special',
      'Construcții provizorii sau anexe gospodărești fără funcțiune publică',
      'Nu înlocuiește avizul oficial ISU Moldova obligatoriu pentru dosarul AC',
    ],
    btn_label:'Generează Studiu ISU (12 pagini)',
    btn_fn:'generateSSF()',
  },

  amplasament: {
    ico:'🗺', titlu:'Studiu de Amplasament & Teritoriu',
    badge:'DOCUMENT FUNDAMENT', badgeColor:'#818cf8',
    pagini:12, norma:'Legea 169/2026 (CATUC)',
    ce_analizeaza:'Analizează amplasamentul în 12 domenii tehnice integrate: indicatori PUG, situație juridică, infrastructură edilitară, patrimoniu LMI, servituți, mobilitate, seismicitate, însorire, vânt, zgomot, geotehnică, impact mediu și estimare financiară. Constituie documentul fundament pe baza căruia se elaborează toate studiile de specialitate ulterioare.',
    de_ce:'Studiul de Amplasament este documentul de referință recomandat înainte de elaborarea oricărei documentații de autorizare. Centralizează toate informațiile tehnice relevante despre amplasament și determină automat lista studiilor obligatorii și avizelor necesare, economisind timp și evitând surprize în procesul de autorizare.',
    baza_legala:['Legea 169/2026 (CATUC) privind amenajarea teritoriului și urbanismul','HG nr. 525/1996 — Regulamentul General de Urbanism','P100-1/2013 — Cod de proiectare seismică (zonare seismică, ag, Tc)','CR 1-1-4/2012 — Cod de proiectare. Acțiunea vântului','OMS nr. 119/2014 + Ord. 994/2018 — Norme igienă și însorire','NP 074/2014 — Normativ privind cercetarea geotehnică','HG 930/2016 + Legea 233/2016 — Avizare construcții în zone aeronautice','Legea nr. 422/2001 privind protejarea monumentelor istorice'],
    ce_primesti:[
      {ico:'📐', txt:'Indicatori PUG complet: POT/CUT/H/SV/Pk/retrageri + bilanț suprafețe'},
      {ico:'⚖️', txt:'Situație juridică cadastrală: CF, servituți, acces, sarcini'},
      {ico:'🔌', txt:'Infrastructură tehnico-edilitară: rețele disponibile, consumuri estimate, costuri branșare'},
      {ico:'🏛', txt:'Patrimoniu LMI: zone protejate, monumente, distanțe, procedura aviz DJCPN'},
      {ico:'🌍', txt:'Seismicitate P100-1/2013: zona seismică, ag, Tc, categoria geotehnică'},
      {ico:'☀️', txt:'Însorire OMS 119/2014: altitudine solară 21 dec., conformitate, umbră proiectată'},
      {ico:'💨', txt:'Vânt CR 1-1-4/2012: presiune vânt qp(H), zona, clasificare Davenport'},
      {ico:'🔊', txt:'Zgomot SR 10009:2017: surse identificate, nivel echivalent Leq, conformitate'},
      {ico:'🪨', txt:'Geotehnică NP 074/2014: profil geologic, nivel freatic, capacitate portantă'},
      {ico:'✈️', txt:'Aeronautic AACR/ROMATSA: distanță aeroport, H max admisă ICAO, aviz necesar'},
      {ico:'🌿', txt:'Impact mediu: aer, apă, sol, deșeuri, arii protejate, Natura 2000'},
      {ico:'📊', txt:'Dashboard studii necesare: 12 domenii cu verdict OBLIGATORIU/RECOMANDAT/OK'},
      {ico:'💶', txt:'Estimare financiară primară: cost construcție, teren, ROI orientativ'},
    ],
    cand_nu:[
      'Nu există excepții — recomandat pentru orice investiție imobiliară indiferent de dimensiune',
      'Nu înlocuiește studiile tehnice de specialitate individuale obligatorii prin lege',
      'Valorile sunt orientative — verificarea obligatorie la ANCPI, Primărie și operatori utilități',
    ],
    btn_label:'Generează Studiu Amplasament (12 pagini)',
    btn_fn:'generateStudiuAmplasament()',
  },

  fezabilitate: {
    ico:'📊', titlu:'Studiu de Fezabilitate / DALI',
    badge:'TEHNICO-ECONOMIC', badgeColor:'#d4af37',
    pagini:15, norma:'HG 907/2016',
    ce_analizeaza:'Analizează viabilitatea economică a investiției imobiliare prin calcule financiare cu parametri personalizabili: preț construcție, preț teren, chirie de referință, preț vânzare și rată de ocupare. Compară 3 variante tehnice (conservatoare/recomandat/maxim), calculează randamentul brut, payback-ul și profitul estimat la vânzare. Exportabil în format PDF și Word (.doc) editabil.',
    de_ce:'Studiul de Fezabilitate / DALI (Documentație de Avizare a Lucrărilor de Intervenție) este obligatoriu conform HG 907/2016 pentru proiectele cu finanțare publică. Pentru investițiile private, constituie instrumentul esențial de decizie: validează sau infirmă oportunitatea economică a investiției înainte de cheltuielile de proiectare.',
    baza_legala:['HG nr. 907/2016 — Etapele elaborării documentațiilor tehnico-economice','Legea 169/2026 (CATUC) — Autorizarea executării lucrărilor de construcții','Legea 169/2026 (CATUC) — Amenajarea teritoriului și urbanismul','NP 074/2014 — Normativ privind cercetarea geotehnică','P100-1/2013 — Cod de proiectare seismică','OMS 119/2014 + Ord. 994/2018 — Norme igienă și însorire','NP 051/2012 rev. — Normativ privind parcajele'],
    ce_primesti:[
      {ico:'🔢', txt:'Indicatori urbanistici PUG: POT/CUT/H/SV/Pk conf. RLU UTR — bilanț suprafețe'},
      {ico:'⚖️', txt:'3 variante tehnice comparate: S1 conservator / S2 recomandat / S3 maxim RLU'},
      {ico:'✏️', txt:'Parametri financiari EDITABILI: preț construcție, teren, chirie, vânzare, rată ocupare'},
      {ico:'📈', txt:'Analiză cash flow pe 20 ani cu scenarii de chirie și vânzare'},
      {ico:'💶', txt:'ROI brut, payback period și profit estimat la vânzare — cu valorile tale'},
      {ico:'⚠️', txt:'Matrice de risc a investiției: urbanistic, geotehnic, permitting, financiar, piață'},
      {ico:'🗓', txt:'Calendar de implementare pe 10 faze: de la CU la Recepție + Intabulare CF'},
      {ico:'🔧', txt:'Optimizări arhitecturale recomandate + buget total recalculat cu studii și avize'},
      {ico:'🔗', txt:'Sinteză studii tehnice: trafic, ISU, însorire, vânt, zgomot, geotehnică'},
      {ico:'📝', txt:'Export Word (.doc) editabil — deschis cu Microsoft Word sau LibreOffice'},
    ],
    cand_nu:[
      'Obligatoriu prin lege NUMAI pentru proiecte cu finanțare publică (HG 907/2016)',
      'Pentru investiții private este recomandat, nu impus prin lege',
      'Valorile financiare sunt orientative ±25-30% — devizul definitiv necesită proiect tehnic complet',
    ],
    btn_label:'Generează Studiu Fezabilitate / DALI',
    btn_fn:'generateStudiuFezabilitate()',
  },
};

function _showExtraDrawer(key){
  const d=_STUDII_EXTRA[key];
  if(!d) return false;
  const drawer=document.getElementById('info-drawer');
  const backdrop=document.getElementById('info-drawer-backdrop');
  const icoEl=document.getElementById('info-drawer-ico');
  const titleEl=document.getElementById('info-drawer-title');
  const badgeWrap=document.getElementById('info-drawer-badge-wrap');
  const body=document.getElementById('info-drawer-body');
  if(!body||!drawer) return false;

  if(icoEl) icoEl.textContent=d.ico;
  if(titleEl) titleEl.textContent=d.titlu;
  if(badgeWrap) badgeWrap.innerHTML=`
    <span style="font-size:10px;background:rgba(212,175,55,.15);color:#d4af37;border-radius:999px;padding:2px 10px;font-weight:700;margin-right:5px">${d.pagini} pagini</span>
    <span style="font-size:10px;background:${d.badgeColor}22;color:${d.badgeColor};border-radius:999px;padding:2px 10px;font-weight:700;border:1px solid ${d.badgeColor}44">${d.badge}</span>
    <span style="font-size:10px;background:rgba(255,255,255,.06);color:#64748b;border-radius:999px;padding:2px 10px;margin-left:4px">${d.norma}</span>
  `;

  const sect=(label,content)=>`
    <div style="margin-bottom:20px">
      <div style="font-size:9px;color:#64748b;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">${label}</div>
      ${content}
    </div>`;

  const listItems=(items)=>
    `<ul style="padding:0;margin:0;list-style:none">${items.map(item=>`
      <li style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05)">
        <span style="font-size:16px;flex-shrink:0;margin-top:1px">${item.ico}</span>
        <span style="font-size:12px;color:#94a3b8;line-height:1.4">${item.txt}</span>
      </li>`).join('')}</ul>`;

  const xList=(items)=>
    items.map(txt=>`
      <div style="display:flex;gap:8px;align-items:flex-start;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.15);border-radius:8px;padding:8px 12px;margin-bottom:6px">
        <span style="color:#f87171;font-size:14px;flex-shrink:0">✕</span>
        <span style="font-size:12px;color:#f87171;line-height:1.4">${txt}</span>
      </div>`).join('');

  body.innerHTML=
    sect('CE ANALIZEAZĂ',`<p style="font-size:13px;color:#e2e8f0;line-height:1.6;margin:0">${d.ce_analizeaza}</p>`) +
    sect('DE CE ESTE NECESAR',`<p style="font-size:13px;color:#94a3b8;line-height:1.6;margin:0">${d.de_ce}</p>`) +
    sect('BAZA LEGALĂ',`<div style="font-size:11px;color:#64748b;line-height:1.8">${d.baza_legala.map(l=>`<div>· ${l}</div>`).join('')}</div>`) +
    sect('CE PRIMEȘTI ÎN RAPORT', listItems(d.ce_primesti)) +
    sect('CÂND NU SE APLICĂ', xList(d.cand_nu)) +
    `<button onclick="${d.btn_fn}" style="width:100%;padding:14px;background:linear-gradient(135deg,#1a3a7a,#0e2448);
      border:1px solid rgba(212,175,55,.4);border-radius:10px;color:#d4af37;font-size:13px;
      font-weight:700;cursor:pointer;letter-spacing:.02em;margin-top:4px">
      ${d.ico} ${d.btn_label}
    </button>`;

  if(backdrop) backdrop.classList.add('open');
  if(drawer) drawer.classList.add('open');
  return true;
}

// Override infoDrawerOpen — 13-info-drawer.js handles ISU/Amplasament/Fezabilitate natively
// This override is kept as fallback only for older contexts
const _origInfoDrawerOpen = window.infoDrawerOpen;
window.infoDrawerOpen = function(key){
  // If RAPORT_INFO (13-info-drawer.js) already handles this key, use it directly
  if(typeof RAPORT_INFO !== 'undefined' && RAPORT_INFO[key]){
    if(typeof _origInfoDrawerOpen === 'function') _origInfoDrawerOpen(key);
    return;
  }
  // Fallback: use our _STUDII_EXTRA for any key not in RAPORT_INFO
  if(_STUDII_EXTRA[key]){ _showExtraDrawer(key); return; }
  if(typeof _origInfoDrawerOpen === 'function') _origInfoDrawerOpen(key);
  else { console.warn('infoDrawerOpen: key not found:', key); }
};

// ── MEMORIE PARAMETRI FEZABILITATE ───────────────────────────────────────────
// Salvează ultima configurare pentru sesiune — modalul se redeschide cu valorile tale
let _sfLastParams = {};

// UrbanX — Export Word (.doc) fără dependențe externe
// Generează documente editabile HTML→Word cu CSS Office-compatible
// ════════════════════════════════════════════════════════════════════════════

// ── FALLBACK getFinanciarConfig ─────────────────────────────────────────────
if(typeof getFinanciarConfig === 'undefined'){
  window.getFinanciarConfig = function(){
    const f=(typeof S_UAT!=='undefined'&&S_UAT.financiar)?S_UAT.financiar:{};
    return {
      pretConstructie: f.pretConstructie||700,
      pretTeren:       f.pretTeren      ||800,
      chirieRef:       f.chirieRef      ||50,
      pretVanzare:     f.pretVanzare    ||1800,
    };
  };
}

// ── CSS stiluri document Word ────────────────────────────────────────────────
const _WORD_CSS = `
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #222; margin: 2cm; }
  h1 { font-size: 16pt; font-weight: bold; color: #0E2448; border-bottom: 2px solid #C49206;
       padding-bottom: 6px; margin-top: 18pt; page-break-after: avoid; }
  h2 { font-size: 13pt; font-weight: bold; color: #14326A; margin-top: 14pt; page-break-after: avoid; }
  h3 { font-size: 11pt; font-weight: bold; color: #5A6878; margin-top: 10pt; page-break-after: avoid; }
  p  { line-height: 1.5; margin: 6pt 0; text-align: justify; }
  table { border-collapse: collapse; width: 100%; margin: 8pt 0; page-break-inside: avoid; }
  th { background-color: #0E2448; color: white; padding: 6pt 8pt; font-weight: bold;
       font-size: 10pt; text-align: left; border: 1px solid #0E2448; }
  td { border: 1px solid #CCCCCC; padding: 5pt 8pt; font-size: 10pt; vertical-align: top; }
  tr:nth-child(even) td { background-color: #F0F4FA; }
  .cover-box { background: #0d1a2e; color: #fff; padding: 24pt; margin-bottom: 24pt;
               border-left: 6pt solid #C49206; }
  .cover-title { font-size: 22pt; font-weight: bold; color: #fff; margin: 0 0 8pt 0; }
  .cover-sub { font-size: 12pt; color: #C49206; margin: 0 0 16pt 0; }
  .cover-meta td { border: none; padding: 3pt 8pt; font-size: 10pt; color: #ccc; }
  .cover-meta td:first-child { font-weight: bold; color: #C49206; width: 40%; }
  .status-ok  { background: #0E6432; color: white; padding: 8pt 12pt; font-weight: bold;
                margin: 12pt 0; text-align: center; }
  .status-warn{ background: #9E1414; color: white; padding: 8pt 12pt; font-weight: bold;
                margin: 12pt 0; text-align: center; }
  .status-info{ background: #14326A; color: white; padding: 8pt 12pt; font-weight: bold;
                margin: 12pt 0; text-align: center; }
  .note { font-style: italic; color: #5A6878; font-size: 9pt; border-left: 3pt solid #C49206;
          padding-left: 8pt; margin: 8pt 0; }
  .disclaimer { font-style: italic; color: #9E1414; font-size: 9pt; border: 1pt solid #9E1414;
                padding: 8pt; margin-top: 24pt; }
  .page-break { page-break-before: always; }
  ul { margin: 4pt 0 4pt 16pt; }
  li { margin: 3pt 0; line-height: 1.4; }
  .highlight { background: #FFF9E6; border-left: 3pt solid #C49206; padding: 4pt 8pt; }
  @media print { h1,h2,h3 { page-break-after: avoid; } }
`;

// ── Helper: salvare blob ca .doc ─────────────────────────────────────────────
function _saveWordDoc(htmlBody, filename){
  const fullHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
    xmlns:w='urn:schemas-microsoft-com:office:word'
    xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${filename}</title>
<style>${_WORD_CSS}</style></head>
<body>${htmlBody}</body></html>`;

  const blob = new Blob(['\ufeff', fullHtml], {type:'application/msword'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename + '.doc';
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); document.body.removeChild(a); }, 2000);
}

// ── Helpers HTML ─────────────────────────────────────────────────────────────
const _wH1 = t => `<h1>${t||''}</h1>`;
const _wH2 = t => `<h2>${t||''}</h2>`;
const _wH3 = t => `<h3>${t||''}</h3>`;
const _wP  = (t,cls='') => `<p${cls?' class="'+cls+'"':''}>${t||''}</p>`;
const _wBr = () => `<div class="page-break"></div>`;

function _wTable(headers, rows){
  const th = headers.map(h=>`<th>${h||''}</th>`).join('');
  const trs = rows.map(row=>`<tr>${row.map(c=>`<td>${c??'—'}</td>`).join('')}</tr>`).join('');
  return `<table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>`;
}

function _wBullets(items){
  return `<ul>${items.map(i=>`<li>${i||''}</li>`).join('')}</ul>`;
}

function _wCover(title, subtitle, meta, statusText, statusOk){
  const rows = (meta||[]).map(([l,v])=>`<tr><td>${l}</td><td style="color:white;font-weight:bold">${v||'—'}</td></tr>`).join('');
  const st = statusText ? `<div class="${statusOk!==false?'status-ok':'status-warn'}">${statusText}</div>` : '';
  return `<div class="cover-box">
    <div class="cover-title">${title||''}</div>
    <div class="cover-sub">${subtitle||''}</div>
    <table class="cover-meta"><tbody>${rows}</tbody></table>
    ${st}
  </div>`;
}

function _wDisclaimer(){
  return `<div class="disclaimer">
    <strong>NOTĂ:</strong> Document ORIENTATIV generat automat de platforma UrbanX TSS·FG.
    Nu înlocuiește documentațiile tehnice avizate conform Legea 169/2026 (CATUC).
    Valorile sunt estimative — devizul și studiile detaliate obligatorii se elaborează de specialiști atestați.
    Generat: ${new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'})}.
  </div>`;
}

// ════════════════════════════════════════════════════════════════════════════
// GENERARE DOCUMENT WORD SF/DALI — CU PARAMETRI EDITABILI
// ════════════════════════════════════════════════════════════════════════════
async function generateFezabilitateDocx(userParams={}){
  try{
    ss('Se generează documentul Word SF/DALI...');

    const ap=S.parcels[S.activeParcel??0];
    if(!ap?.geo?.geometry){ss('Selectați o parcelă.');return;}

    // Date de bază
    const nrcad=ap?.nrcad||'—', utr=ap?.utr||'—';
    const area=ap?.area?ap.area.toFixed(0):'—';
    const areaNum=parseFloat(area)||300;
    const lat=ap?turf.centerOfMass(ap.geo).geometry.coordinates[1]:47.16;
    const lon=ap?turf.centerOfMass(ap.geo).geometry.coordinates[0]:27.59;
    const params=ap?.params||getDefaultParams(utr);
    const uat=getUATLabel(), judet=getUATJudet();
    const dateStr=new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'});
    const scMax=Math.round(areaNum*parseFloat(params?.pot||35)/100);
    const sdTotal=Math.round(areaNum*parseFloat(params?.cut||1.0));
    const aedisH=S.vol._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||13.2;
    const niv=Math.max(1,Math.ceil(aedisH/3));
    const svMin=Math.round(areaNum*parseFloat(params?.sv||20)/100);
    const pkMin=Math.max(2,Math.ceil(sdTotal/120)*parseInt(params?.pk||1));
    const fnLabel=params?.fn_label||'Locuire colectivă / Mixt';

    // Parametri financiari — cu overrides utilizator
    const _fc=getFinanciarConfig();
    const pretConstr  = parseFloat(userParams.pretConstr  || _fc.pretConstructie);
    const pretTeren   = parseFloat(userParams.pretTeren   || _fc.pretTeren);
    const chirieRef   = parseFloat(userParams.chirieRef   || _fc.chirieRef);
    const pretVanzare = parseFloat(userParams.pretVanzare || _fc.pretVanzare || pretConstr*1.4);
    const rataOcupare = parseFloat(userParams.rataOcupare || 85) / 100;
    const costConstr  = Math.round(sdTotal * pretConstr);
    const costTeren   = Math.round(areaNum * pretTeren);
    const costTotal   = Math.round((costConstr + costTeren) * 1.25);
    const venitAn     = Math.round(sdTotal * rataOcupare * chirieRef * 12);
    const venitVanzare= Math.round(sdTotal * rataOcupare * pretVanzare);
    const rentabilitate=((venitAn/costTotal)*100).toFixed(1);
    const payback     = Math.ceil(costTotal/venitAn);
    const seismCfg    = getSeismConfig();
    const pkMinF      = pkMin;
    const isISUOblig  = (aedisH>8||sdTotal>600);
    const catGeoF     = aedisH>28?'3 — Complexă':aedisH>10?'2 — Curentă':'1 — Simplă';
    const costGeoF    = catGeoF.includes('3')?8000:catGeoF.includes('2')?3500:1500;
    function solarAlt2(lt,mo,ho){const D2R=Math.PI/180;const d=(-23.45*Math.cos(D2R*(360/365)*(mo*30+10)))*D2R;const h=(ho-12)*15*D2R;return Math.max(0,Math.asin(Math.sin(lt*D2R)*Math.sin(d)+Math.cos(lt*D2R)*Math.cos(d)*Math.cos(h))*180/Math.PI);}
    const altDec = solarAlt2(lat,11,12);
    const vantCfg = getVantConfig();
    const qpH = (vantCfg.presiune_vant||0.55)*Math.pow(aedisH/10,0.3)*1.15;

    const hasCustomParams = Object.keys(userParams).some(k=>userParams[k]);

    // ── Construire HTML ──────────────────────────────────────────────────────
    let html = '';

    // COVER
    html += _wCover(
      'STUDIU DE PREFEZABILITATE / FEZABILITATE / DALI',
      'conf. HG 907/2016 · Document Orientativ UrbanX · ' + dateStr,
      [
        ['Nr. cadastral', nrcad],
        ['UAT / Localitate', uat + ' · jud. ' + judet],
        ['Zonă UTR', utr],
        ['Suprafață teren', areaNum + ' mp'],
        ['Funcțiune propusă', fnLabel],
        ['Regim înălțime', 'P+' + (niv-1) + ' (H=' + aedisH.toFixed(1) + 'm)'],
        ['POT / CUT max RLU', params?.pot + '% / ' + params?.cut],
        hasCustomParams ? ['⚠ Parametri financiari', 'PERSONALIZAȚI de utilizator'] : ['Parametri financiari', 'Valori medii statistice UAT ' + uat],
        ['Preț construcție', pretConstr + ' EUR/mp SDA'],
        ['Preț teren', pretTeren + ' EUR/mp'],
        ['Chirie referință', chirieRef + ' EUR/mp/lună'],
        ['Preț vânzare estimat', pretVanzare + ' EUR/mp'],
        ['Rată ocupare', (rataOcupare*100).toFixed(0) + '%'],
      ],
      hasCustomParams ? '⚠ PARAMETRI FINANCIARI PERSONALIZAȚI — valorile din tabelul de mai jos sunt calculate cu datele introduse manual' : '✓ STUDIU ORIENTATIV — PREFEZABILITATE URBANISTICĂ DIGITALĂ',
      !hasCustomParams
    );

    // 1. Indicatori urbanistici
    html += _wBr();
    html += _wH1('1. DATE DE IDENTIFICARE ȘI INDICATORI URBANISTICI PUG');
    html += _wTable(
      ['Parametru','Valoare estimativă','Baza de calcul','Observații'],
      [
        ['Suprafață construită la sol (SC)', scMax+' mp (POT='+params?.pot+'%)', 'RLU UTR '+utr, 'Estimativ'],
        ['Suprafață desfășurată totală (SDA)', sdTotal+' mp (CUT='+params?.cut+')', 'RLU UTR '+utr, 'Estimativ'],
        ['Înălțime maximă propusă', aedisH.toFixed(1)+'m (P+'+(niv-1)+' niv.)', 'Conf. AEDIS 3D', 'Orientativ'],
        ['Spații verzi minime', svMin+' mp ('+params?.sv+'%)', 'RLU UTR '+utr, 'Obligatoriu'],
        ['Parcaje minime', pkMin+' locuri ('+params?.pk+'/unit.)', 'NP 051/2012', 'Verificare'],
        ['Retragere față', params?.rf+'m', 'RLU', 'Obligatoriu'],
        ['Retragere laterală', params?.rl+'m', 'RLU', 'Obligatoriu'],
        ['Retragere spate', params?.rs+'m', 'RLU', 'Obligatoriu'],
        ['Coordonate GPS', lat.toFixed(5)+'°N / '+lon.toFixed(5)+'°E', 'UrbanX GIS', 'Cadastru'],
      ]
    );

    // 2. Variante tehnice
    html += _wBr();
    html += _wH1('2. VARIANTE TEHNICE COMPARATE');
    const sc1=Math.round(scMax*0.7), sda1=Math.round(sdTotal*0.7);
    html += _wTable(
      ['Scenariu','SC (mp)','SDA (mp)','H max','Cost estimat','Rentabilitate chirie'],
      [
        ['S1 — Conservator', sc1+'', sda1+'', Math.round(aedisH*0.75)+'m', Math.round(sda1*pretConstr/1000)+' kEUR', ((sda1*rataOcupare*chirieRef*12)/(sda1*pretConstr*1.25+costTeren)/1000).toFixed(1)+'%'],
        ['★ S2 — Recomandat', scMax+'', sdTotal+'', aedisH.toFixed(0)+'m', Math.round(sdTotal*pretConstr/1000)+' kEUR', rentabilitate+'%'],
        ['S3 — Maxim RLU', Math.round(scMax*0.9)+'', Math.round(sdTotal*1.1)+'', (params?.h||aedisH.toFixed(0))+'m', Math.round(sdTotal*1.1*pretConstr/1000)+' kEUR', ((sdTotal*1.1*rataOcupare*chirieRef*12)/((sdTotal*1.1*pretConstr*1.25+costTeren))/1000).toFixed(1)+'%'],
      ]
    );

    // 3. Indicatori tehnico-economici
    html += _wBr();
    html += _wH1('3. INDICATORI TEHNICO-ECONOMICI — ESTIMARE ORIENTATIVĂ');
    if(hasCustomParams) html += `<div class="highlight">⚠ Parametrii financiari marcați cu * au fost introduși manual de utilizator și diferă de valorile statistice UAT ${uat}.</div>`;
    html += _wTable(
      ['Indicator','UM','Valoare estimativă','Baza de calcul'],
      [
        ['Suprafață teren (ST)', 'mp', areaNum+'', 'Extras CF'],
        ['Suprafață construită la sol (SC)', 'mp', scMax+'', 'POT='+params?.pot+'%'],
        ['Suprafață desfășurată (SDA)', 'mp', sdTotal+'', 'CUT='+params?.cut],
        ['Nr. niveluri', 'niv.', 'P+'+(niv-1), 'Conf. RLU'],
        ['Înălțime maximă (Hmax)', 'm', aedisH.toFixed(1), 'Conf. AEDIS'],
        ['Nr. locuri parcare', 'locuri', pkMin+'', 'NP 051/2012'],
        ['─── PARAMETRI FINANCIARI ───', '', '', ''],
        [(userParams.pretConstr?'Preț construcție (PERSONALIZAT)':'Preț construcție'), 'EUR/mp SDA', pretConstr+'', userParams.pretConstr?'⚠ Valoare introdusă manual':'Media statistică '+uat],
        [(userParams.pretTeren?'Preț teren (PERSONALIZAT)':'Preț teren'), 'EUR/mp', pretTeren+'', userParams.pretTeren?'⚠ Valoare introdusă manual':'Media statistică '+uat],
        [(userParams.chirieRef?'Chirie referință (PERSONALIZATĂ)':'Chirie referință'), 'EUR/mp/lună', chirieRef+'', userParams.chirieRef?'⚠ Valoare introdusă manual':'Media statistică '+uat],
        [(userParams.pretVanzare?'Preț vânzare (PERSONALIZAT)':'Preț vânzare estimat'), 'EUR/mp', pretVanzare+'', userParams.pretVanzare?'⚠ Valoare introdusă manual':'Estimat ~1.4×preț construcție'],
        ['Rată ocupare', '%', (rataOcupare*100).toFixed(0)+'', userParams.rataOcupare?'⚠ Valoare introdusă manual':'Standard SF (85%)'],
        ['─── COSTURI ───', '', '', ''],
        ['Cost construcție', 'EUR', costConstr.toLocaleString(), pretConstr+' EUR/mp × '+sdTotal+' mp SDA'],
        ['Cost teren', 'EUR', costTeren.toLocaleString(), pretTeren+' EUR/mp × '+areaNum+' mp'],
        ['Diverse+TVA+proiectare (25%)', 'EUR', Math.round((costConstr+costTeren)*0.25).toLocaleString(), '25% din total'],
        ['VALOARE TOTALĂ INVESTIȚIE', 'EUR', costTotal.toLocaleString(), 'Total estimativ (±25-30%)'],
        ['─── VENITURI ───', '', '', ''],
        ['Venit anual din CHIRIE', 'EUR/an', venitAn.toLocaleString(), chirieRef+' EUR/mp/lună × '+Math.round(sdTotal*rataOcupare)+' mp × 12'],
        ['Venit din VÂNZARE', 'EUR', venitVanzare.toLocaleString(), pretVanzare+' EUR/mp × '+Math.round(sdTotal*rataOcupare)+' mp'],
        ['Randament brut (ROI chirie)', '%/an', rentabilitate, 'Venit anual / Investiție totală'],
        ['Perioadă recuperare (chirie)', 'ani', payback+'', 'Payback simplu'],
        ['Profit estimat la vânzare', 'EUR', (venitVanzare-costTotal).toLocaleString(), venitVanzare>costTotal?'✓ Pozitiv':'⚠ Negativ — reviziți parametrii'],
      ]
    );

    // 4. Cash flow
    html += _wBr();
    html += _wH1('4. ANALIZA FINANCIARĂ — FLUX DE NUMERAR');
    html += _wTable(
      ['An','Investiție (EUR)','Venit estimat (EUR)','Cheltuieli op.','Cash flow net','Recuperare (%)'],
      [0,1,2,3,5,7,10,15,20].map(an=>{
        const ven=an===0?0:Math.round(venitAn*(1+0.03*an));
        const chelt=an===0?0:Math.round(ven*0.25);
        const cf=an===0?-costTotal:ven-chelt;
        const recup=Math.min(100,Math.round(((ven*(an||1))/costTotal)*100));
        return ['An '+(an||0), an===0?'-'+costTotal.toLocaleString():'-', an===0?'-':ven.toLocaleString(), an===0?'-':chelt.toLocaleString(), cf.toLocaleString(), an===0?'0%':recup+'%'];
      })
    );

    // 5. Matrice risc
    html += _wBr();
    html += _wH1('5. MATRICEA DE RISC A INVESTIȚIEI');
    html += _wTable(
      ['Tip risc','Probabilitate','Impact','Nivel risc','Măsuri de mitigare'],
      [
        ['Urbanistic (modificare PUG)','5%','Major','Scăzut','Verificare PUG + CU înainte de achiziție teren'],
        ['Geotehnic (teren slab)','20%','Major','Mediu','Studiu geotehnic detaliat obligatoriu'],
        ['Permitting (avize întârziate)','30%','Mediu','Mediu','Pregătire dosar complet din timp'],
        ['Financiar (creștere costuri)','40%','Major','Ridicat','Rezervă contingență 15-20%'],
        ['De piață (cerere imobiliară)','25%','Major','Mediu','Analiză piață + pre-vânzări/pre-închirieri'],
        ['Juridic (litigii proprietate)','5%','Major','Scăzut','Verificare CF + expertiză juridică'],
        ['Seismic (zona '+seismCfg.zona+', ag='+seismCfg.ag+'g)','Certitudine','Variabil','Mediu','Structură antiseismică P100-1/2013'],
        ['Prețuri construcție (+20%)','35%','Major','Mediu','Contingență 15% inclusă în buget'],
      ]
    );

    // 6. Calendar implementare
    html += _wBr();
    html += _wH1('6. CALENDARUL DE IMPLEMENTARE');
    html += _wTable(
      ['Fază','Durată','Documente necesare','Responsabil'],
      [
        ['FAZA 0 — Pre-achiziție teren','0-2 luni','Verificare CF + PUG + CU informativ','Beneficiar + jurist'],
        ['FAZA 1 — Achiziție teren','1-3 luni','Contract vânzare-cumpărare + Intabulare CF','Beneficiar + notar'],
        ['FAZA 2 — Certificat Urbanism','1-2 luni','Cerere CU + Plan situație + Acte proprietate','Beneficiar la Primărie'],
        ['FAZA 3 — Studii de bază','2-4 luni','Studiu geotehnic + Relevee + Studii CU','Specialiști atestați'],
        ['FAZA 4 — Proiect PAC/DTAC','3-6 luni','DTAC complet + planșe + memorii','Arhitect OAR + ingineri'],
        ['FAZA 5 — Obținere avize','2-4 luni','ISU, E-ON, RAJA, AACR, DJCPN etc.','Arhitect + beneficiar'],
        ['FAZA 6 — Autorizație de Construire','1-2 luni','Dosar AC complet la Primăria '+uat,'Beneficiar'],
        ['FAZA 7 — Proiect Tehnic + DDE','3-6 luni','PT complet + detalii execuție','Arhitect + ingineri'],
        ['FAZA 8 — Execuție',Math.round(sdTotal/300)+'-'+Math.round(sdTotal/200)+' luni','Contract antreprenor + diriginte','Antreprenor CL/CQ'],
        ['FAZA 9 — Recepție + Intabulare','1-2 luni','PV recepție + CF actualizat','Beneficiar + comisie'],
        ['TOTAL ESTIMAT','~'+(12+Math.ceil(sdTotal/200))+'-'+(24+Math.ceil(sdTotal/150))+' luni','—','—'],
      ]
    );

    // 7. Avize necesare
    html += _wBr();
    html += _wH1('7. AVIZE ȘI ACORDURI NECESARE');
    html += _wTable(
      ['Aviz / Acord','Emitent','Obligativitate','Termen'],
      [
        ['E-ON Moldova (energie electrică)','Operatorul de rețea','Obligatoriu','30-60 zile'],
        ['Delgaz Grid (gaz natural)','Delgaz Grid SA','Oblig. dacă se prevede gaz','30-60 zile'],
        ['RAJA SA Iași (apă-canal)','RAJA Iași','Obligatoriu','30-60 zile'],
        ['ISU Moldova (P.S.I.)', isISUOblig?'ISU Moldova — OBLIGATORIU':'ISU Moldova', isISUOblig?'OBLIGATORIU (H>8m sau SD>600mp)':'Verificare CU','30-60 zile'],
        ['AACR / ROMATSA (dist.<15km LRIA)','ROMATSA + AACR','Dacă în zona de protecție aeroport','30-90 zile'],
        ['DJCPN Iași (patrimoniu)','DJCPN Iași','Dacă UTR cu patrimoniu / ZCP','30-60 zile'],
        ['APM Iași (mediu)','APM Iași','Dacă SD>1000mp sau curs apă','30-60 zile'],
        ['DSP Iași (sănătate publică)','DSP Iași','La locuire + dotări medicale','15-30 zile'],
      ]
    );

    // 8. Sinteza studii tehnice
    html += _wBr();
    html += _wH1('8. SINTEZA STUDIILOR TEHNICE — CONCLUZII AGREGATE');
    html += _wH2('8.1. Impact trafic');
    const totalZilnicF = Math.ceil(sdTotal/80)*8;
    html += _wTable(
      ['Indicator','Valoare estimată','Cerință','Status'],
      [
        ['Trafic generat zilnic', totalZilnicF+' veh/zi', 'Conf. ITE TG11', 'Orientativ'],
        ['Trafic oră vârf seara', Math.ceil(totalZilnicF*0.12)+' veh/h', 'LOS C recomandat', 'Verificare'],
        ['Locuri parcare obligatorii', pkMinF+' locuri', 'NP 051/2012 + RLU', 'Obligatoriu'],
        ['Locuri PMR (4%)', Math.max(1,Math.ceil(pkMinF*0.04))+' locuri', 'NP 051/2012', 'Obligatoriu'],
        ['Stații EV recomandate', Math.max(1,Math.ceil(pkMinF*0.1))+' prize 22kW', 'Reg. UE 2023/1804', 'Recomandare'],
      ]
    );
    html += _wH2('8.2. Siguranță la foc (ISU)');
    html += _wTable(
      ['Parametru ISU','Valoare','Cerință','Status'],
      [
        ['Aviz ISU obligatoriu?', isISUOblig?'DA':'Verificare CU', 'H>8m / SD>600mp', isISUOblig?'OBLIGATORIU':'Verificare'],
        ['Cale acces ISU', 'min. 3.5m', 'P118-2/2013 art. 6', 'Verificare proiect'],
        ['Cost estimat conformare ISU', isISUOblig?'3.000-8.000 EUR':'—', '—', 'Inclus buget total'],
        ['Scară pompieri', aedisH>28?'OBLIGATORIE':'Nu se impune', 'P118-2/2013 art. 7', aedisH>28?'OBLIGATORIU':'OK'],
      ]
    );
    html += _wH2('8.3. Însorire, vânt, zgomot, geotehnică');
    html += _wTable(
      ['Domeniu','Valoare calculată','Cerință','Implicație'],
      [
        ['Altitudine solară 21 Dec, 12:00', altDec.toFixed(1)+'°', 'min. 15° (OMS 119)', altDec>=15?'✓ Conform':'⚠ Neconform — studiu OAR'],
        ['Presiune vânt la H='+aedisH.toFixed(0)+'m', qpH.toFixed(3)+' kN/mp', 'CR 1-1-4/2012', 'Input calcul structural'],
        ['Categoria geotehnică', catGeoF, 'NP 074/2014', 'Studiu geo obligatoriu'],
        ['Cost studiu geotehnic', costGeoF.toLocaleString()+'-'+(costGeoF*1.8).toFixed(0)+' EUR', '—', 'Inclus buget total'],
        ['Zona seismică', seismCfg.zona+' (ag='+seismCfg.ag+'g, Tc='+seismCfg.Tc+'s)', 'P100-1/2013', 'Impact cost +5-15%'],
      ]
    );

    // 9. Optimizări
    html += _wBr();
    html += _wH1('9. OPTIMIZĂRI RECOMANDATE');
    html += _wTable(
      ['Optimizare','Beneficiu estimat','Cost implementare','Prioritate'],
      [
        ['Orientare corp principal E-V', 'Reducere consum energetic 15-20%', '0 EUR (proiect)', '★★★'],
        ['Parter comercial activ (vitrine >40%)', 'Chirie parter 2-3× față de rezidențial', '0 EUR (proiect)', '★★★'],
        ['Parcaj subteran P-1 dacă parcela mică', '+'+pkMinF+' locuri → suprafață liberă la sol', Math.round(pkMinF*5000).toLocaleString()+' EUR extra', '★★★'],
        ['Acoperiș verde/FV', '~'+Math.round(scMax*0.6/6.5*1100)+' kWh/an', '~'+Math.round(scMax*0.6*100).toLocaleString()+' EUR', '★★'],
        ['Sistem BMS', 'Reducere op. 20-30%', '8.000-25.000 EUR', '★★'],
        ['Stații EV + rastele biciclete', 'Atracție chiriași premium', Math.max(2,Math.ceil(pkMinF*0.1))*1500+' EUR', '★★'],
      ]
    );
    html += _wH2('9.1. Buget total recalculat');
    html += _wTable(
      ['Categorie','Estimare (EUR)','%','Observații'],
      [
        ['Cost construcție', costConstr.toLocaleString(), Math.round(costConstr/costTotal*100)+'%', pretConstr+' EUR/mp × '+sdTotal+' mp'],
        ['Teren', costTeren.toLocaleString(), Math.round(costTeren/costTotal*100)+'%', pretTeren+' EUR/mp × '+areaNum+' mp'],
        ['Proiectare (PAC+PT+DDE)', Math.round(costConstr*0.025).toLocaleString(), '~2.5%', 'Arhitect OAR'],
        ['Studii tehnice (geo, trafic)', Math.round(costGeoF*2.5).toLocaleString(), '—', 'Obligatorii din CU'],
        ['Taxe + avize', Math.round(costConstr*0.01).toLocaleString(), '~1%', 'CU + AC + avize'],
        ['Instalații ISU', isISUOblig?'8.000-25.000 EUR':'Nu se impune', '—', 'Dacă aviz ISU'],
        ['Contingență (15%)', Math.round(costConstr*0.15).toLocaleString(), '15%', 'Variații materiale'],
        ['TOTAL RECALCULAT', Math.round(costTotal*1.05).toLocaleString(), '100%', 'Estimat ±25-30%'],
      ]
    );

    // 10. Concluzii + baza legala
    html += _wBr();
    html += _wH1('10. CONCLUZII FINALE ȘI BAZA LEGALĂ');
    html += _wTable(
      ['Indicator cheie','Valoare','Status'],
      [
        ['Valoare totală investiție', '~'+costTotal.toLocaleString()+' EUR', 'Orientativ ±30%'],
        ['Suprafață desfășurată (SDA)', sdTotal+' mp', 'Conf. CUT='+params?.cut],
        ['Randament brut (ROI chirie)', rentabilitate+'%/an', 'La '+chirieRef+' EUR/mp/lună'],
        ['Profit estimat la vânzare', '~'+(venitVanzare-costTotal).toLocaleString()+' EUR', venitVanzare>costTotal?'✓ PROFIT POZITIV':'⚠ VERIFICARE'],
        ['Perioadă recuperare (chirie)', payback+' ani', 'Payback simplu'],
        ['Conformitate indicatori PUG', 'CONFORM (orientativ)', 'Verificare obligatorie CU'],
        ['Studiu geotehnic', 'OBLIGATORIU', 'NP 074/2014'],
        ['Aviz ISU', isISUOblig?'OBLIGATORIU':'Verificare CU', 'P118+Legea 307/2006'],
      ]
    );
    html += _wH2('10.1. Baza legală');
    html += _wBullets([
      'HG nr. 907/2016 — Etapele de elaborare și conținutul-cadru al documentațiilor tehnico-economice.',
      'Legea 169/2026 (CATUC) — Autorizarea executării lucrărilor de construcții.',
      'Legea 169/2026 (CATUC) — Amenajarea teritoriului și urbanismul, republicată.',
      'NP 074/2014 — Normativ privind cercetarea geotehnică.',
      'P100-1/2013 — Cod de proiectare seismică. Zona '+seismCfg.zona+' (ag='+seismCfg.ag+'g).',
      'NP 051/2012 rev. — Normativ privind parcajele și adaptarea la necesitățile PMR.',
      'P118-1/2015 + P118-2/2013 — Norme de securitate la incendiu.',
      'CR 1-1-4/2012 — Acțiunea vântului.',
      'OMS nr. 119/2014 + Ord. 994/2018 — Norme de igienă (însorire).',
      'Regulamentul UE 2023/1804 — Infrastructura pentru vehicule electrice.',
      'PUG '+uat+' în vigoare — UTR '+utr+' — Regulamentul Local de Urbanism.',
      'Legea nr. 10/1995 republicată — Calitatea în construcții.',
    ]);

    html += _wDisclaimer();

    // Salvare
    const filename = 'SF_DALI_'+nrcad+'_'+new Date().getFullYear();
    _saveWordDoc(html, filename);
    ss('✅ Document Word SF/DALI generat! Deschideți cu Microsoft Word sau LibreOffice.');

  }catch(err){
    console.error('generateFezabilitateDocx error:',err);
    ss('❌ Eroare generare Word: '+err.message);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// MODAL EDITARE PARAMETRI
// ════════════════════════════════════════════════════════════════════════════
function showSFParamsModal(){
  const existing=document.getElementById('sf-params-modal');
  if(existing) existing.remove();

  const _fc=getFinanciarConfig();
  const ap=S.parcels[S.activeParcel??0];
  const utr=ap?.utr||'—';
  const uat=getUATLabel();

  // Folosește ultima configurare dacă există, altfel defaulturi UAT
  const lastP = _sfLastParams||{};
  const def = (key, fallback) => lastP[key] ?? fallback;

  const modal=document.createElement('div');
  modal.id='sf-params-modal';
  modal.style.cssText=`
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;
    background:#0d1a2e;border:1px solid #C49206;border-radius:8px;
    padding:24px 28px;width:520px;max-width:95vw;max-height:90vh;
    overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.7);font-family:Calibri,sans-serif;
  `;

  const hasLastParams = Object.keys(lastP).some(k=>lastP[k]!=null);

  modal.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <div>
        <div style="color:#C49206;font-size:10px;font-weight:bold;letter-spacing:1px;">URBANX · STUDIU FEZABILITATE / DALI</div>
        <div style="color:#fff;font-size:15px;font-weight:bold;margin-top:2px;">Parametri de generare</div>
        <div style="color:#7890b0;font-size:11px;margin-top:2px;">UTR ${utr} · ${uat}</div>
      </div>
      <button onclick="document.getElementById('sf-params-modal').remove()"
        style="background:none;border:none;color:#7890b0;font-size:18px;cursor:pointer;padding:4px 8px;">✕</button>
    </div>

    <div style="background:rgba(20,50,98,.4);border:1px solid rgba(32,70,136,.6);border-radius:6px;padding:10px 12px;margin-bottom:16px;font-size:11px;color:#7890b0;line-height:1.5">
      <span style="color:#C49206;font-weight:bold">Cum se folosește:</span>
      Modifică valorile de mai jos, apoi apasă <b style="color:#fff">Generează PDF</b> sau <b style="color:#34d399">Generează Word</b>.
      Valorile rămân salvate pentru sesiunea curentă.
      ${hasLastParams?'<br><span style="color:#34d399">✓ Se folosesc valorile modificate anterior.</span>':'<br><span style="color:#94a3b8">Valorile implicite sunt medii statistice pentru '+uat+'.</span>'}
    </div>

    <div style="border-top:1px solid #1e3a5f;padding-top:16px;">
      <div style="color:#C49206;font-size:10px;font-weight:bold;letter-spacing:1px;margin-bottom:12px;">PARAMETRI FINANCIARI</div>
      ${_sfParamRow('pretConstr','Preț construcție (EUR/mp SDA)',def('pretConstr',_fc.pretConstructie),_fc.pretConstructie,'Standard Iași 2024-2025')}
      ${_sfParamRow('pretTeren','Preț teren (EUR/mp)',def('pretTeren',_fc.pretTeren),_fc.pretTeren,'Introduceți prețul real negociat / evaluat')}
      ${_sfParamRow('chirieRef','Chirie referință (EUR/mp/lună)',def('chirieRef',_fc.chirieRef),_fc.chirieRef,'Chirie estimată sau negociată / conform piață')}
      ${_sfParamRow('pretVanzare','Preț vânzare (EUR/mp)',def('pretVanzare',Math.round((_fc.pretConstructie||700)*1.4)),Math.round((_fc.pretConstructie||700)*1.4),'Dacă se vinde în loc de închiriat')}
      ${_sfParamRow('rataOcupare','Rată ocupare estimată (%)',def('rataOcupare',85),85,'85% = conservator · 95% = optimist')}
    </div>

    <div style="border-top:1px solid #1e3a5f;padding-top:16px;margin-top:8px;">
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button onclick="_sfGeneratePDF()" style="flex:1;min-width:180px;background:#14326A;color:#fff;
          border:1px solid #C49206;border-radius:5px;padding:11px 14px;cursor:pointer;font-size:13px;font-weight:bold;">
          📄 Generează PDF
        </button>
        <button onclick="_sfGenerateDocx()" style="flex:1;min-width:180px;background:#0E6432;color:#fff;
          border:1px solid #C49206;border-radius:5px;padding:11px 14px;cursor:pointer;font-size:13px;font-weight:bold;">
          📝 Generează Word (.doc)
        </button>
      </div>
      <div style="display:flex;gap:8px;margin-top:8px;">
        <button onclick="_sfResetParams()" style="flex:1;background:none;border:1px solid rgba(255,255,255,.1);
          color:#64748b;border-radius:5px;padding:6px;cursor:pointer;font-size:11px;">
          ↺ Resetează la valorile UAT
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(()=>{
    document.addEventListener('click',function handler(e){
      if(!modal.contains(e.target)&&modal.isConnected){
        modal.remove();document.removeEventListener('click',handler);
      }
    });
  },300);
}

function _sfParamRow(id,label,currentVal,defaultVal,hint){
  const isModified=currentVal!==defaultVal;
  return `
    <div style="margin-bottom:12px;">
      <label style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="color:#a0b4cc;font-size:11px;">${label}</span>
        ${isModified?'<span style="font-size:9px;color:#34d399;font-weight:bold;background:rgba(52,211,153,.1);padding:1px 6px;border-radius:4px">MODIFICAT</span>':'<span style="font-size:9px;color:#475569">implicit UAT</span>'}
      </label>
      <input id="sfp-${id}" type="number" value="${currentVal}"
        style="width:100%;background:#0a1628;border:1px solid ${isModified?'#34d399':'#1e3a5f'};color:#fff;
        padding:7px 10px;border-radius:4px;font-size:13px;box-sizing:border-box;"
        onfocus="this.style.borderColor='#C49206'"
        onblur="this.style.borderColor=this.value!='${defaultVal}'?'#34d399':'#1e3a5f'">
      <div style="color:#5A6878;font-size:10px;margin-top:2px;">${hint} · <span style="color:#475569">implicit: ${defaultVal}</span></div>
    </div>
  `;
}

function _sfGetParams(){
  const get=id=>{
    const el=document.getElementById('sfp-'+id);
    if(!el) return null;
    const v=parseFloat(el.value);
    return isNaN(v)?null:v;
  };
  return {pretConstr:get('pretConstr'),pretTeren:get('pretTeren'),chirieRef:get('chirieRef'),pretVanzare:get('pretVanzare'),rataOcupare:get('rataOcupare')};
}

function _sfResetParams(){
  _sfLastParams={};
  document.getElementById('sf-params-modal')?.remove();
  showSFParamsModal();
}

async function _sfGeneratePDF(){
  const params=_sfGetParams();
  _sfLastParams={...params}; // Salvează pentru sesiune
  document.getElementById('sf-params-modal')?.remove();
  await generateStudiuFezabilitate(params);
}

async function _sfGenerateDocx(){
  const params=_sfGetParams();
  _sfLastParams={...params}; // Salvează pentru sesiune
  document.getElementById('sf-params-modal')?.remove();
  await generateFezabilitateDocx(params);
}

// ════════════════════════════════════════════════════════════════════════════
// EXPORT GENERIC WORD PENTRU ORICE STUDIU (folosit în viitor)
// ════════════════════════════════════════════════════════════════════════════
async function _exportStudyAsDocx(studyData){
  try{
    let html='';
    html += _wCover(studyData.title,studyData.subtitle||'',
      [['Nr. cadastral',studyData.nrcad||'—'],['UAT',studyData.uat||'—'],['Zonă UTR',studyData.utr||'—'],
       ['Suprafață',( studyData.area||'—')+' mp'],['Data elaborare',studyData.dateStr||new Date().toLocaleDateString('ro-RO')]],
      '✓ Document orientativ — UrbanX TSS·FG', true
    );
    for(const sec of (studyData.sections||[])){
      if(sec.pageBreak) html+=_wBr();
      if(sec.heading)   html+=_wH1(sec.heading);
      if(sec.subheading)html+=_wH2(sec.subheading);
      if(sec.text)      html+=_wP(sec.text);
      if(sec.table)     html+=_wTable(sec.table.headers,sec.table.rows);
      if(sec.bullets)   html+=_wBullets(sec.bullets);
      if(sec.note)      html+=_wP(sec.note,'note');
    }
    html+=_wDisclaimer();
    _saveWordDoc(html, studyData.filename||'Studiu_UrbanX');
    ss('✅ Document Word generat!');
  }catch(err){
    ss('❌ Eroare Word: '+err.message);
  }
}
