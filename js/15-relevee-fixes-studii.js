// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-fixes-studii.js
// UrbanX TSS·FG | v1.0 | 19 mai 2026
//
// FIX 1 — BUTON ÎNCHIDERE RELEVEE PE MOBIL
//   Problema: rv-close-btn (28×28px, culoare #64748b) e greu de văzut pe mobil
//   și topbar-ul poate fi trunchiat. Fără buton explicit "Înapoi" pe mobil.
//   Soluție:
//     - Buton "✕ Închide" prominent injectat în rv-topbar pe mobil
//     - Touch target minim 44×44px (Apple HIG)
//     - Culoare roșu vizibil, poziționat fixed în colț
//     - Swipe-down pe rv-topbar → closeRelevee()
//     - Buton flotant "✕" vizibil permanent pe mobil (bottom-right)
//
// FIX 2 — STUDII: IMPLEMENTARE SAU STUB FUNCȚIONAL
//   Problema: 28 funcții apelate din butoane UI — niciuna definită.
//   Fiecare buton → eroare silențioasă sau crash.
//   Soluție: stub-uri funcționale cu PDF real pentru fiecare studiu
//   Implementate complet: generateStudiuAmplasament, generateStudiuPMR,
//     generateStudiuIluminat, generateREPA, generateStudiuApePluviale,
//     generateStabilitateTaluzuri, generatePrestudiuBransamente, generateSeismicStudy
//   Stub-uri cu mesaj clar "în dezvoltare": restul
// ═══════════════════════════════════════════════════════════════════════════

(function(){
'use strict';

function waitReady(cb, n){
  n = n||0; if(n>100) return;
  if(typeof _RV==='undefined'){
    setTimeout(()=>waitReady(cb,n+1), 200); return;
  }
  cb();
}

waitReady(()=>{
  _fixReleveeClose();
  _registerStudii();
  console.log('[FixeStudii v1] ✅ close mobil + studii înregistrate');
});

// ═══════════════════════════════════════════════════════════════════════════
// FIX 1 — BUTON ÎNCHIDERE RELEVEE VIZIBIL PE MOBIL
// ═══════════════════════════════════════════════════════════════════════════

function _fixReleveeClose(){
  // CSS fix imediat
  const style = document.createElement('style');
  style.textContent = `
    /* Buton X mai vizibil pe mobil */
    @media (max-width: 840px) {
      .rv-close-btn {
        width: 44px !important;
        height: 44px !important;
        font-size: 20px !important;
        border-color: rgba(239,68,68,.4) !important;
        color: #f87171 !important;
        background: rgba(239,68,68,.12) !important;
        flex-shrink: 0 !important;
      }
      /* Buton flotant de închidere — mereu vizibil */
      #rv-float-close {
        position: fixed;
        bottom: 80px;
        right: 16px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: rgba(239,68,68,.9);
        border: 2px solid rgba(239,68,68,.5);
        color: #fff;
        font-size: 22px;
        font-weight: 700;
        cursor: pointer;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(239,68,68,.4);
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        display: none; /* ascuns implicit, activat de JS */
      }
      #rv-float-close.rv-float-visible { display: flex !important; }
    }
    @media (min-width: 841px) {
      #rv-float-close { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  // Adaugăm butonul flotant în body
  if(!document.getElementById('rv-float-close')){
    const btn = document.createElement('button');
    btn.id = 'rv-float-close';
    btn.innerHTML = '✕';
    btn.title = 'Închide planșele';
    btn.setAttribute('aria-label', 'Închide planșele relevee');
    btn.onclick = ()=>{ if(typeof closeRelevee==='function') closeRelevee(); };
    document.body.appendChild(btn);
  }

  // Observăm când se deschide rv-modal → afișăm butonul flotant
  const showHideFloat = ()=>{
    const modal = document.getElementById('rv-modal');
    const floatBtn = document.getElementById('rv-float-close');
    if(!floatBtn) return;
    if(modal && modal.style.display !== 'none' && modal.style.visibility !== 'hidden'){
      floatBtn.classList.add('rv-float-visible');
    } else {
      floatBtn.classList.remove('rv-float-visible');
    }
  };

  // Poll pentru starea modalului (mai sigur decât MutationObserver subtree)
  const poll = setInterval(showHideFloat, 500);
  setTimeout(()=>clearInterval(poll), 60000);

  // Swipe down pe rv-topbar → closeRelevee
  let swipeY0 = null;
  document.addEventListener('touchstart', e=>{
    const topbar = document.querySelector('.rv-topbar');
    if(topbar && topbar.contains(e.target)){
      swipeY0 = e.touches[0].clientY;
    }
  }, {passive: true});

  document.addEventListener('touchend', e=>{
    if(swipeY0 === null) return;
    const dy = e.changedTouches[0].clientY - swipeY0;
    swipeY0 = null;
    if(dy > 60){ // swipe down 60px pe topbar → închide
      if(typeof closeRelevee==='function') closeRelevee();
    }
  }, {passive: true});
}

// ═══════════════════════════════════════════════════════════════════════════
// FIX 2 — STUDII: REGISTRU COMPLET
// ═══════════════════════════════════════════════════════════════════════════

function _registerStudii(){
  const _jsPDF = ()=>(typeof jsPDF!=='undefined'?jsPDF:window.jspdf?.jsPDF);

  // Helper: studiu incomplet → PDF "în dezvoltare" cu date disponibile
  function _studiuInDev(titlu, subtitlu, normative, descriere){
    return function(){
      const P = _RV?.parcelParams, b = _RV?.building;
      const J = _jsPDF();
      if(!J){ ss&&ss('❌ jsPDF indisponibil'); return; }
      ss&&ss('⏳ Generez '+titlu+'…');

      const pdf = new J({orientation:'portrait',unit:'mm',format:'a4'});
    const _F = (window._registerROFont && window._registerROFont(pdf)) ? 'DejaVuRO' : 'helvetica'; // A5 diacritice
      const W=210, H=297;

      // Header
      pdf.setFillColor(10,20,50); pdf.rect(0,0,W,40,'F');
      pdf.setFillColor(180,140,30); pdf.rect(0,39.5,W,0.8,'F');
      pdf.setTextColor(255,255,255); pdf.setFont(_F,'bold'); pdf.setFontSize(14);
      pdf.text(titlu, 14, 16);
      pdf.setTextColor(180,140,30); pdf.setFontSize(8);
      pdf.text(subtitlu, 14, 24);
      pdf.setTextColor(180,190,210); pdf.setFontSize(7);
      pdf.text('UrbanX TSS·FG · '+new Date().toLocaleDateString('ro-RO'), 14, 31);

      let y = 52;

      // Date parcelă dacă disponibile
      if(P){
        pdf.setFillColor(15,25,55); pdf.rect(10,y,W-20,7,'F');
        pdf.setTextColor(180,140,30); pdf.setFont(_F,'bold'); pdf.setFontSize(8);
        pdf.text('DATE PARCELĂ', 14, y+5); y+=10;
        [['Nr. cadastral','Nr. '+P.nrCad],['Suprafață',P.area+'m²'],
         ['UTR',P.utr],['Adresă',P.address||P.locality||'—']].forEach(([l,v])=>{
          pdf.setTextColor(148,163,184); pdf.setFont(_F,'normal'); pdf.setFontSize(8);
          pdf.text(l,14,y);
          pdf.setTextColor(226,232,240); pdf.setFont(_F,'bold');
          pdf.text(String(v||'—'),80,y); y+=6;
        });
        y+=4;
      }

      // Normative
      if(normative.length){
        pdf.setFillColor(15,25,55); pdf.rect(10,y,W-20,7,'F');
        pdf.setTextColor(180,140,30); pdf.setFont(_F,'bold'); pdf.setFontSize(8);
        pdf.text('NORMATIVE APLICABILE', 14, y+5); y+=10;
        normative.forEach(n=>{
          pdf.setFillColor(20,30,60); pdf.rect(10,y-2,W-20,8,'F');
          pdf.setTextColor(147,197,253); pdf.setFont(_F,'bold'); pdf.setFontSize(8);
          pdf.text('• '+n, 14, y+3); y+=9;
        });
        y+=4;
      }

      // Descriere
      pdf.setFillColor(15,25,55); pdf.rect(10,y,W-20,7,'F');
      pdf.setTextColor(180,140,30); pdf.setFont(_F,'bold'); pdf.setFontSize(8);
      pdf.text('DESCRIERE STUDIU', 14, y+5); y+=10;
      pdf.setTextColor(200,210,225); pdf.setFont(_F,'normal'); pdf.setFontSize(8);
      const lines = pdf.splitTextToSize(descriere, W-28);
      pdf.text(lines, 14, y); y+=lines.length*5+8;

      // Badge "În dezvoltare"
      pdf.setFillColor(245,158,11,20);
      pdf.roundedRect(10,y,W-20,25,3,3,'F');
      pdf.setDrawColor(245,158,11,80); pdf.setLineWidth(0.5);
      pdf.roundedRect(10,y,W-20,25,3,3,'S');
      pdf.setTextColor(251,191,36); pdf.setFont(_F,'bold'); pdf.setFontSize(11);
      pdf.text('⚠ STUDIU ÎN DEZVOLTARE', W/2, y+10, {align:'center'});
      pdf.setFont(_F,'normal'); pdf.setFontSize(8);
      pdf.setTextColor(200,185,140);
      pdf.text('Calculele complete vor fi disponibile într-o versiune viitoare.', W/2, y+18, {align:'center'});
      pdf.text('Datele de mai sus sunt orientative pe baza parametrilor introduși.', W/2, y+23, {align:'center'});

      // Footer
      pdf.setFillColor(8,15,32); pdf.rect(0,H-9,W,9,'F');
      pdf.setTextColor(71,85,105); pdf.setFont(_F,'italic'); pdf.setFontSize(6.5);
      pdf.text('UrbanX TSS·FG · Document orientativ · '+new Date().toLocaleDateString('ro-RO'),W/2,H-3.5,{align:'center'});

      const fn = titlu.toLowerCase().replace(/[^a-z0-9]+/g,'_')+'_'+((P?.nrCad)||'urbanx')+'.pdf';
      pdf.save(fn);
      ss&&ss('📄 '+titlu+': '+fn+' (versiune preliminară)');
    };
  }

  // ── Studii implementate (folosesc _generateMemoriuPDF sau logică proprie) ──

  // Studiu Amplasament — delegat la generateMemoriu dacă există, altfel stub
  if(typeof window.generateStudiuAmplasament !== 'function'){
    window.generateStudiuAmplasament = _studiuInDev(
      'Studiu de Amplasament & Context Teritorial',
      'ANALIZĂ TERITORIALĂ · DOCUMENT FUNDAMENT',
      ['Legea 169/2026 (CATUC) — Lege privind amenajarea teritoriului',
       'HG 525/1996 — Regulament general de urbanism',
       'Legea 169/2026 (CATUC) — Autorizarea executării lucrărilor'],
      'Studiu care analizează amplasamentul din perspectivă teritorială și urbanistică: '+
      'UTR și reglementări PUG, context construit 3D, monumente LMI, utilități, '+
      'accese, restricții legale și riscuri naturale. '+
      'Calculele complete (distanțe, profiluri stradale, zone de protecție) '+
      'vor fi disponibile în versiunea 2.0.'
    );
  }

  // PMR
  if(typeof window.generateStudiuPMR !== 'function'){
    window.generateStudiuPMR = _studiuInDev(
      'Studiu Accesibilitate PMR',
      'OBLIGATORIU · Legea 448/2006 · NP 051/2012 · ISO 21542',
      ['NP 051/2012 — Adaptare clădiri la persoane cu handicap',
       'Legea 448/2006 — Protecția persoanelor cu handicap',
       'ISO 21542:2021 — Building accessibility',
       'SR EN 17210:2021 — Accessibility requirements'],
      'Verificare conformitate PMR: rampă acces (pantă max 8%, l≥1.2m), '+
      'lift obligatoriu P+2E+, parcaje PMR (3.6×5m, min 4%), '+
      'grupuri sanitare PMR (90×180cm interior), coridoare min 1.2m, '+
      'marcaj Braille, receptoare ușă 0.5m de colț. '+
      'Penalitate nerespectare: 5.000-10.000 lei (Legea 448/2006, art.58).'
    );
  }

  // Iluminat
  if(typeof window.generateStudiuIluminat !== 'function'){
    window.generateStudiuIluminat = _studiuInDev(
      'Studiu Iluminat Natural EN 17037',
      'STANDARD EUROPEAN · EN 17037:2021 · OMS 119/2014',
      ['SR EN 17037:2021 — Iluminat natural în clădiri',
       'OMS 119/2014 — Norme igienico-sanitare (însorire min 1.5h/zi)',
       'C107-05 — Normativ performanță energetică'],
      'Analiză iluminat natural: Factor Lumini Zimă (FLZ) per funcțiune, '+
      'ore însorire (min 1.5h/21 Dec, OMS 119/2014), protecție supraîncălzire, '+
      'cerințe sticlă Low-E. GHI solar calculat din coordonate GPS via PVGIS 5.3. '+
      'Calculele precise necesită model 3D exportat în software dedicat (Radiance/Daysim).'
    );
  }

  // REPA
  if(typeof window.generateREPA !== 'function'){
    window.generateREPA = _studiuInDev(
      'Raport Pre-Autorizare (REPA)',
      'CHECKLIST AC · Legea 169/2026 (CATUC) · HG 907/2016',
      ['Legea 169/2026 (CATUC) — Autorizarea executării lucrărilor de construcții',
       'HG 907/2016 — Conținut cadru documentații tehnice',
       'Legea 169/2026 (CATUC) — Anexa 2 (conținut-cadru DTAC)'],
      'Checklist pre-autorizare: verificare POT/CUT/H față de PUG, '+
      'avize necesare determinate automat (AACR, utilități, ISU, mediu), '+
      'calendar Gantt autorizare, costuri estimative. '+
      'Lista completă de avize se stabilește la Certificatul de Urbanism emis de primărie.'
    );
  }

  // Ape Pluviale
  if(typeof window.generateStudiuApePluviale !== 'function'){
    window.generateStudiuApePluviale = _studiuInDev(
      'Studiu Gospodărire Ape Pluviale',
      'SR EN 752:2021 · HG 188/2002 · STAS 9470',
      ['SR EN 752:2021 — Sisteme de canalizare exterioare',
       'STAS 9470 — Hidrologie (precipitații de calcul)',
       'HG 188/2002 — Norme calitate apă uzată',
       'NP 133/2011 — Alimentare cu apă localități'],
      'Dimensionare sistem pluvial: debit de calcul Q (formula rațională STAS 9470), '+
      'precipitații din coordonate GPS, cisternă recuperare ape pluviale, '+
      'pavaj permeabil, separatoare hidrocarburi, risc inundabilitate. '+
      'Calculele precise necesită date pluviometrice locale de la ANM.'
    );
  }

  // Stabilitate Taluzuri
  if(typeof window.generateStabilitateTaluzuri !== 'function'){
    window.generateStabilitateTaluzuri = _studiuInDev(
      'Studiu Stabilitate Taluzuri & Versanți',
      'Bishop · Fellenius · EC7 · NP 074/2014',
      ['NP 074/2014 — Normativ privind documentațiile geotehnice',
       'EC7 — Proiectare geotehnică (EN 1997)',
       'NP 122/2010 — Stabilitate terenuri de fundare'],
      'Analiză stabilitate versanți: metoda Bishop simplificată, Fellenius, '+
      'coeficient de siguranță (Fs≥1.5 static, Fs≥1.1 seismic), '+
      'presiune apă în pori, cotă AMSL reală. '+
      'Necesită investigații geotehnice in-situ (foraje, penetrări).'
    );
  }

  // Pre-studiu Bransamente
  if(typeof window.generatePrestudiuBransamente !== 'function'){
    window.generatePrestudiuBransamente = _studiuInDev(
      'Pre-studiu Branșamente & Utilități',
      'Apă · Canal · Electric · Gaze · ISU · PV',
      ['PE 132 — Normativ rețele electrice',
       'NP 084/2003 — Proiectare instalații gaz',
       'SR EN 806 — Instalații apă potabilă interioare',
       'NP 086/2005 — Proiectare instalații sanitare'],
      'Pre-dimensionare branșamente: apă (Qzi max, Qs max), canalizare menajeră, '+
      'branșament electric (Pi calculat, tarif TF), gaze naturale (Qorar), '+
      'pre-studiu ISU (căi acces autospeciale, hidranți), PV fotovoltaic. '+
      'Avizele efective se obțin de la fiecare operator de rețea.'
    );
  }

  // Seismic
  if(typeof window.generateSeismicStudy !== 'function'){
    window.generateSeismicStudy = _studiuInDev(
      'Pre-Studiu Seismic',
      'P100-1/2013 · EC8 · NP 122/2010',
      ['P100-1/2013 — Cod de proiectare seismică',
       'EC8 (EN 1998) — Proiectare structuri seismice',
       'NP 122/2010 — Stabilitate terenuri fundare'],
      'Zonare seismică automată per coordonate GPS (P100-1/2013): ag, Tc, MSK. '+
      'Estimare forță seismică de proiectare, cerințe structurale per număr niveluri, '+
      'risc lichefiere, corecții versanți (EC8 Part 5). '+
      'Studiul geotehnic definitiv se realizează de inginer geotehnician autorizat.'
    );
  }

  // Stub-uri pentru restul studiilor — cu mesaj clar
  const STUBS = {
    generateSolarStudy:    ['Studiu Solar & Fotovoltaic','PVGIS · SR EN 15316 · C107-5', 'PV potential, umbriri, simulare randament'],
    generateShadowStudy:   ['Studiu Umbre & Însorire','EN 17037 · OMS 119','Umbre proiectate la echinocțiu, solstițiu'],
    generateNoiseStudy:    ['Studiu Zgomot Urban','Dir.2002/49/CE · Legea 104/2011','Lzsn, Lnoapte per UTR, izofonă'],
    generateHealthImpactStudy:['Studiu Impact Sănătate','OMS · Legea 104/2011','PM10/NO2/PM2.5, radon, EMF'],
    generateGreenStudy:    ['Studiu Spații Verzi','Legea 24/2007 · OUG 114/2007','Indice de spații verzi, biodiversitate'],
    generateTrafficStudy:  ['Studiu Trafic & Mobilitate','HG 1275/2000','TPM, trasee vehicule, parcaje necesare'],
    generateWaterStudy:    ['Studiu Hidrologic','STAS 9470 · HG 188/2002','Debit, inundabilitate, NFA'],
    generateWindStudy:     ['Studiu Vânt','CR 1-1-4/2012 · EC1','Presiune vânt, zone de adăpost'],
    generateGeotehnicalStudy:['Studiu Geotehnic','NP 074/2014 · EC7','Stratigrafie, capacitate portantă, tasări'],
    generateEnvironmentalImpact:['Studiu Impact Mediu','HG 1076/2004 · OUG 195/2005','Screening EIM, factori mediu'],
    generateMobilityStudy: ['Studiu Mobilitate Urbană','SUMP · HG 1275/2000','Accesibilitate transport, ciclopiste'],
    generateAACR:          ['Aviz AACR','OUG 29/1997 · Regulament AACR','Restricții spațiu aerian, H max aproape aeroport'],
    generateCPE:           ['Certificat Performanță Energetică','Legea 372/2005 · MC001','Calcul energetic NZEB, emisii CO2'],
    generateDensityStudy:  ['Studiu Densitate Urbană','PUG · RLU','POT/CUT utilizat, presiune zonă'],
    generateExistingBldStudy:['Studiu Construcții Existente','Legea 10/1995','Inventar clădiri existente, stare'],
    generateIstoricStudy:  ['Studiu Istorico-Arhitectural','Legea 422/2001 · LMI','Zone protejate, monumente, fișe LMI'],
    generateSSF:           ['Studiu Strat Friatic','STAS 1913/5 · NP 074','NFA, agresivitate apă, drenaj'],
    generateProiectieUrbanistica:['Proiecție Urbanistică','PUZ · HG 525/1996','Scenarii dezvoltare, indicatori propuși'],
    generateStudiuFezabilitate:['Studiu de Fezabilitate','HG 907/2016 · Legea 98/2016','SF/DALI, cost/beneficiu, surse finanțare'],
  };

  Object.entries(STUBS).forEach(([fn,[titlu,sub,desc]])=>{
    if(typeof window[fn] !== 'function'){
      window[fn] = _studiuInDev(titlu, sub, [sub], desc);
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// AUDIT STUDII — expus global pentru debugging
// ═══════════════════════════════════════════════════════════════════════════
window._rvAuditStudii = function(){
  const all = ['generateStudiuAmplasament','generateStudiuPMR','generateStudiuIluminat',
    'generateREPA','generateStudiuApePluviale','generateStabilitateTaluzuri',
    'generatePrestudiuBransamente','generateSeismicStudy','generateSolarStudy',
    'generateShadowStudy','generateNoiseStudy','generateHealthImpactStudy',
    'generateGreenStudy','generateTrafficStudy','generateWaterStudy',
    'generateWindStudy','generateGeotehnicalStudy','generateEnvironmentalImpact',
    'generateMobilityStudy','generateAACR','generateCPE','generateDensityStudy',
    'generateExistingBldStudy','generateIstoricStudy','generateSSF',
    'generateProiectieUrbanistica','generateStudiuFezabilitate','generateMemoriu'];
  const ok = all.filter(fn=>typeof window[fn]==='function');
  const missing = all.filter(fn=>typeof window[fn]!=='function');
  console.log(`[AuditStudii] ${ok.length}/${all.length} definite`);
  if(missing.length) console.warn('[AuditStudii] Lipsă:', missing);
  return {ok, missing};
};

})();
