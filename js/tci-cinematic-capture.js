// ═══════════════════════════════════════════════════════════════════════════
// tci-cinematic-capture.js — UrbanX Cinematic Capture Engine v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Capturează automat câte un frame reprezentativ din fiecare din cele
// 12 scene TCI Cinema și generează un colaj vizual care se atașează
// automat în documentul de Masterplan PDF.
//
// FLUX:
// ① La pornirea Cinema v2 → activăm modul de captură
// ② Per scenă, la t=0.65 (când overlay-ul e complet vizibil):
//    → Compozităm Mapbox canvas + overlay canvas într-un canvas temporar
//    → toDataURL('image/jpeg', 0.82) → stocăm base64
//    → Adăugăm metadata: titlu scenă, date afișate, timestamp
// ③ La finalul filmului (scena 12 completă):
//    → Avem 12 frames stocate
//    → Generăm colajul: grid 4×3 cu titluri și date per scenă
//    → Stocăm în window._CinematicFrames
// ④ Masterplanul PDF detectează automat frames disponibile:
//    → Inserează pagina de colaj cinematic DUPĂ copertă
//    → Grid 4×3 cu frame-uri, titluri, date, legendă
//    → Sursă: "TCI Cinematic v2 · UrbanX TSS·FG · " + data
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// CAPTURE ENGINE
// ═══════════════════════════════════════════════════════════════════════════

G._CaptureEngine = {

  _frames:    [],    // [{dataURL, sceneId, label, data, timestamp}]
  _active:    false,
  _cityName:  '',

  SCENE_LABELS: [
    'Overview — Romania',
    'Zoom Regional — Moldova',
    'Approach — Date live',
    'City Overview 3D',
    'Dezvoltare Urbana',
    'Infrastructura & Mobilitate',
    'Focus Zona — Presiune',
    'Comparatie UAT-uri',
    'Street Level',
    'Viata Urbana',
    'Evolutie Temporala',
    'Concluzie & Viziune',
  ],

  start(cityName) {
    this._frames   = [];
    this._active   = true;
    this._cityName = cityName || 'UAT';
    console.log('[CaptureEngine] Start captură 12 scene pentru', cityName);
  },

  stop() {
    this._active = false;
  },

  // Capturează frame-ul curent (compozitat Mapbox + overlay)
  captureFrame(sceneId, sceneLabel, displayData) {
    if (!this._active) return;

    try {
      // Canvas de compozitare
      const W = window.innerWidth;
      const H = window.innerHeight;
      const comp = document.createElement('canvas');
      comp.width  = Math.min(W, 1280);
      comp.height = Math.min(H, 720);
      const ctx = comp.getContext('2d');

      // 1. Draw Mapbox canvas (background)
      const mapCanvas = window.map?.getCanvas?.();
      if (mapCanvas) {
        try {
          ctx.drawImage(mapCanvas, 0, 0, comp.width, comp.height);
        } catch(e) {
          // Fallback: gradient dark background
          const grad = ctx.createLinearGradient(0, 0, 0, comp.height);
          grad.addColorStop(0, '#040a1c');
          grad.addColorStop(1, '#081532');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, comp.width, comp.height);
        }
      } else {
        ctx.fillStyle = '#040a1c';
        ctx.fillRect(0, 0, comp.width, comp.height);
      }

      // 2. Draw overlay canvas (scene data cards etc.)
      const overlayCanvas = document.getElementById('tci-scene-canvas');
      if (overlayCanvas && overlayCanvas.width > 0) {
        try {
          ctx.drawImage(overlayCanvas, 0, 0, comp.width, comp.height);
        } catch(e) {}
      }

      // 3. Watermark discret
      ctx.fillStyle = 'rgba(212,175,55,0.25)';
      ctx.font = 'bold 11px IBM Plex Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('UrbanX TSS·FG · ' + new Date().getFullYear(), comp.width - 8, comp.height - 6);

      // 4. Banda de titlu jos (semi-transparentă)
      ctx.fillStyle = 'rgba(4,10,28,0.75)';
      ctx.fillRect(0, comp.height - 32, comp.width, 32);
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 12px IBM Plex Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(sceneId + '. ' + (sceneLabel || this.SCENE_LABELS[sceneId-1] || '').toUpperCase(), 10, comp.height - 18);
      if (displayData) {
        ctx.fillStyle = 'rgba(148,163,184,0.8)';
        ctx.font = '10px IBM Plex Mono, monospace';
        ctx.fillText(displayData, 10, comp.height - 6);
      }

      // 5. Număr scenă (colț dreapta-sus)
      ctx.fillStyle = 'rgba(212,175,55,0.9)';
      ctx.font = 'bold 14px IBM Plex Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(sceneId + '/12', comp.width - 10, 20);

      const dataURL = comp.toDataURL('image/jpeg', 0.82);
      this._frames.push({
        dataURL,
        sceneId,
        label:     sceneLabel || this.SCENE_LABELS[sceneId-1] || ('Scena ' + sceneId),
        data:      displayData || '',
        timestamp: new Date().toISOString(),
      });

      console.log(`[CaptureEngine] ✅ Frame ${sceneId} capturat (${Math.round(dataURL.length/1024)}KB)`);
      return dataURL;

    } catch(e) {
      console.warn('[CaptureEngine] Eroare captură scenă', sceneId, e.message);
      // Adăugăm un frame placeholder
      this._frames.push({
        dataURL: this._generatePlaceholder(sceneId, sceneLabel),
        sceneId,
        label:     sceneLabel || ('Scena ' + sceneId),
        data:      displayData || '',
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Generează placeholder dacă captura eșuează
  _generatePlaceholder(sceneId, label) {
    const c = document.createElement('canvas');
    c.width = 640; c.height = 360;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#040a1c';
    ctx.fillRect(0, 0, 640, 360);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1;
    ctx.strokeRect(2, 2, 636, 356);
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(sceneId + '. ' + (label || '').toUpperCase(), 320, 160);
    ctx.fillStyle = 'rgba(148,163,184,0.6)';
    ctx.font = '12px monospace';
    ctx.fillText('UrbanX TCI Cinema v2', 320, 200);
    return c.toDataURL('image/jpeg', 0.8);
  },

  // Returnează frames disponibile
  getFrames() {
    return this._frames;
  },

  isReady() {
    return this._frames.length >= 6; // suficient pentru colaj
  },

  // Salvează frames în window pentru persistență între sesiuni
  persist() {
    window._CinematicFrames = {
      frames:   this._frames,
      cityName: this._cityName,
      capturedAt: new Date().toISOString(),
      count:    this._frames.length,
    };
    console.log(`[CaptureEngine] ${this._frames.length} frames salvate în _CinematicFrames`);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// COLAJ PDF GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

G._CinematicCollage = {

  // Generează pagina de colaj în PDF
  // Apelat din _TCIMasterplanPDF.generate() automat
  generate(pdf, W, H, cityName, today) {
    const stored = window._CinematicFrames;
    const frames = stored?.frames || G._CaptureEngine._frames;

    if (!frames || frames.length < 3) {
      console.log('[Collage] Insuficiente frames — skip');
      return false;
    }

    pdf.addPage();

    // ── Header pagină ─────────────────────────────────────────────────────
    pdf.setFillColor(4, 10, 28);
    pdf.rect(0, 0, W, H, 'F');
    pdf.setFillColor(212, 175, 55);
    pdf.rect(0, 0, W, 6, 'F');

    // Titlu
    pdf.setTextColor(212, 175, 55);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('TCI CINEMATIC EXPERIENCE', W / 2, 15, { align: 'center' });

    pdf.setTextColor(148, 163, 184);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(
      this._s(cityName || 'UAT') + '  ·  Vizualizare urbanistica 2025-2055  ·  Generat cu UrbanX TSS.FG',
      W / 2, 22, { align: 'center' }
    );

    // Linie decorativă
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(0.3);
    pdf.line(14, 26, W - 14, 26);

    // ── Grid 4×3 ──────────────────────────────────────────────────────────
    const COLS    = 4;
    const ROWS    = 3;
    const margin  = 5;
    const gridX   = 14;
    const gridY   = 30;
    const gridW   = W - 28;
    const gridH   = H - 55; // lasam loc pentru footer
    const cellW   = (gridW - margin * (COLS - 1)) / COLS;
    const cellH   = (gridH - margin * (ROWS - 1)) / ROWS;
    const imgH    = cellH - 12; // spatiu pentru titlu sub imagine
    const imgW    = cellW;

    // Completăm cu placeholders dacă avem mai puțin de 12 frames
    const allFrames = [...frames];
    while (allFrames.length < 12) {
      const idx = allFrames.length + 1;
      allFrames.push({
        dataURL:  G._CaptureEngine._generatePlaceholder(idx, G._CaptureEngine.SCENE_LABELS[idx-1]),
        sceneId:  idx,
        label:    G._CaptureEngine.SCENE_LABELS[idx-1] || ('Scena ' + idx),
        data:     '',
      });
    }

    allFrames.slice(0, 12).forEach((frame, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x   = gridX + col * (cellW + margin);
      const y   = gridY + row * (cellH + margin);

      // Frame background
      pdf.setFillColor(8, 14, 40);
      pdf.roundedRect(x, y, cellW, cellH, 1.5, 1.5, 'F');

      // Imagine
      try {
        pdf.addImage(
          frame.dataURL,
          'JPEG',
          x, y,
          imgW, imgH,
          '', 'FAST'
        );
      } catch(e) {
        // Fallback vizual dacă addImage eșuează
        pdf.setFillColor(12, 22, 55);
        pdf.rect(x, y, imgW, imgH, 'F');
        pdf.setTextColor(212, 175, 55);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.text(String(frame.sceneId), x + imgW / 2, y + imgH / 2, { align: 'center' });
      }

      // Border auriu pe imagine
      pdf.setDrawColor(212, 175, 55);
      pdf.setLineWidth(0.3);
      pdf.rect(x, y, imgW, imgH, 'S');

      // Număr scenă (badge colț stânga-sus)
      pdf.setFillColor(212, 175, 55);
      pdf.roundedRect(x + 1, y + 1, 10, 6, 1, 1, 'F');
      pdf.setTextColor(4, 10, 28);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(6);
      pdf.text(String(frame.sceneId), x + 6, y + 5, { align: 'center' });

      // Titlu scenă (sub imagine)
      const titleY = y + imgH + 4;
      pdf.setTextColor(212, 175, 55);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(6.5);
      const titleText = this._s((frame.label || '').toUpperCase()).slice(0, 28);
      pdf.text(titleText, x + cellW / 2, titleY, { align: 'center' });

      // Data afișată (sub titlu)
      if (frame.data && cellH > 25) {
        pdf.setTextColor(100, 120, 160);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(5.5);
        pdf.text(this._s(frame.data).slice(0, 30), x + cellW / 2, titleY + 5, { align: 'center' });
      }
    });

    // ── Footer colaj ──────────────────────────────────────────────────────
    const footerY = H - 18;
    pdf.setFillColor(6, 12, 34);
    pdf.rect(0, footerY, W, 18, 'F');
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(0.2);
    pdf.line(0, footerY, W, footerY);

    // Legendă
    const legendItems = [
      { color: [59, 130, 246],  label: 'Date live INSE + Eurostat' },
      { color: [34, 197, 94],   label: 'Proiectii 2025-2055' },
      { color: [212, 175, 55],  label: 'Analiza urbanistica' },
      { color: [249, 115, 22],  label: 'Riscuri teritoriale' },
    ];
    let lx = 14;
    legendItems.forEach(({ color, label }) => {
      pdf.setFillColor(...color);
      pdf.circle(lx + 3, footerY + 7, 2.5, 'F');
      pdf.setTextColor(148, 163, 184);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6);
      pdf.text(this._s(label), lx + 7, footerY + 9);
      lx += pdf.getTextWidth(this._s(label)) + 14;
    });

    // Info dreapta
    pdf.setTextColor(100, 120, 150);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6);
    pdf.text(
      'TCI Cinematic v2  ·  ' + this._s(cityName || '') + '  ·  ' + this._s(today || '') + '  ·  UrbanX TSS.FG',
      W - 14, footerY + 9, { align: 'right' }
    );

    pdf.setFillColor(212, 175, 55);
    pdf.rect(0, H - 5, W, 5, 'F');

    console.log('[Collage] ✅ Pagina colaj generată cu', allFrames.length, 'frames');
    return true;
  },

  _s(text) {
    if (!text) return '';
    return String(text)
      .replace(/ă/g,'a').replace(/Ă/g,'A')
      .replace(/â/g,'a').replace(/Â/g,'A')
      .replace(/î/g,'i').replace(/Î/g,'I')
      .replace(/ș/g,'s').replace(/Ș/g,'S')
      .replace(/ț/g,'t').replace(/Ț/g,'T')
      .replace(/ş/g,'s').replace(/ţ/g,'t')
      .replace(/[^\x20-\x7E]/g,' ').trim().slice(0, 500);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// INTEGRARE CU SceneEngine — captură automată per scenă
// ═══════════════════════════════════════════════════════════════════════════

G._patchSceneEngineForCapture = function() {
  const SE = window._SceneEngine;
  if (!SE || SE._capturePatchApplied) return;
  SE._capturePatchApplied = true;

  // Override launch pentru a porni captura
  const origLaunch = SE.launch.bind(SE);
  SE.launch = async function(cityKey) {
    const city = window._RO_CITIES_DB?.[cityKey] ||
                 Object.values(window._RO_CITIES_DB || {})[0];
    G._CaptureEngine.start(city?.name || cityKey);
    return origLaunch(cityKey);
  };

  // Override _runScene pentru a captura la momentul potrivit
  const origRunScene = SE._runScene?.bind(SE);
  SE._runScene = function(idx) {
    if (!SE.SCENES || idx >= SE.SCENES.length) {
      SE._finish?.();
      return;
    }
    const scene = SE.SCENES[idx];
    SE._scene  = idx;
    SE._startT = performance.now();

    const CAPTURE_AT = 0.65; // 65% din durata scenei
    let captured = false;

    const loop = () => {
      if (!SE._playing) return;
      const t = Math.min(1, (performance.now() - SE._startT) / scene.dur);
      SE._renderScene?.(scene.id, t);

      // Captură la momentul potrivit
      if (t >= CAPTURE_AT && !captured && G._CaptureEngine._active) {
        captured = true;
        // Mic delay pentru ca overlay-ul să fie randant
        setTimeout(() => {
          const displayData = G._extractSceneData(scene.id, SE._city, SE._zones);
          G._CaptureEngine.captureFrame(scene.id, scene.label, displayData);
        }, 150);
      }

      if (t < 1) {
        SE._raf = requestAnimationFrame(loop);
      } else {
        SE._runScene(idx + 1);
      }
    };

    SE._setupScene?.(scene.id);
    SE._raf = requestAnimationFrame(loop);
  };

  // Override _finish pentru a finaliza captura și a persista frames
  const origFinish = SE._finish?.bind(SE);
  SE._finish = function() {
    G._CaptureEngine._active = false;
    G._CaptureEngine.persist();

    const count = G._CaptureEngine._frames.length;
    if (count >= 3) {
      ss?.(`✅ TCI Cinematic finalizat · ${count} scene capturate → disponibile pentru Masterplan PDF`);
    }

    if (origFinish) origFinish();
  };

  console.log('[CaptureEngine] ✅ SceneEngine patat pentru captură automată');
};

// Extrage datele relevante per scenă pentru label în colaj
G._extractSceneData = function(sceneId, city, zones) {
  const N = (v) => isNaN(+v) ? '—' : Number(v).toLocaleString('ro-RO');
  const r = city?.rata_reala_2011_2021 || 0;

  const dataMap = {
    1:  'Romania · Context european · ' + new Date().getFullYear(),
    2:  'Regiunea Nord-Est · ' + (city?.name || '') + ' · Hub regional',
    3:  'Pop. 2021: ' + N(city?.pop2021) + ' · Crestere: ' + (r >= 0 ? '+' : '') + r.toFixed(1) + '%/an',
    4:  'Densitate: ' + N(city?.densitate || Math.round((city?.pop2021||0)/(city?.suprafata_ha||5000)*100)) + ' loc/ha',
    5:  'Autorizatii 2023: ' + N(city?.autorizatii_2023) + '/an · MAJORĂ/MEDIE/MICĂ',
    6:  'Transport public: ' + (city?.acoperire_transport || 60) + '% acoperire · Modal split 2055',
    7:  zones ? Object.values(zones).slice(0,1).map(z=>z.label+': +'+(z.densifPct||0)+'% densificare').join('') : 'Zone identificate dinamic OSM',
    8:  'Comparatie cu orase similare · 20 indicatori',
    9:  'Pitch 82° · Vehicule OSM reale · Iluminat urban real',
    10: 'TP +62% · Modal split evolutiv 2025-2055',
    11: 'Slider 2025 → 2055 · Transformare in timp real',
    12: (city?.name || '') + ' 2055 · Viziune sustenabila',
  };

  return dataMap[sceneId] || '';
};

// ═══════════════════════════════════════════════════════════════════════════
// PATCH MASTERPLAN PDF — inserează automat pagina de colaj
// ═══════════════════════════════════════════════════════════════════════════

G._patchMasterplanWithCollage = function() {
  const MP = window._TCIMasterplanPDF;
  if (!MP || MP._collagePatchApplied) return;
  MP._collagePatchApplied = true;

  const origGenerate = MP.generate.bind(MP);
  MP.generate = async function(cityKey, scenario) {
    // Rulăm originalul pentru a obține PDF-ul de bază
    // Dar mai întâi verificăm dacă avem frames disponibile
    const hasFrames = (window._CinematicFrames?.frames?.length >= 3) ||
                      (G._CaptureEngine._frames.length >= 3);

    if (!hasFrames) {
      ss?.('ℹ️ Tip: Rulați TCI Cinematic v2 înainte de Masterplan pentru a include colajul cinematic!');
    }

    // Apelăm generate-ul original
    await origGenerate(cityKey, scenario);
  };

  // Override _pg1_cover dacă există visual patch — adăugăm collage page AFTER cover
  // Injectăm în fluxul de pagini
  const origPg1 = MP._pg1_cover?.bind(MP);
  if (origPg1) {
    MP._pg1_cover = function(c) {
      origPg1(c);

      // Dacă avem frames, inserăm colajul imediat după copertă
      const frames = window._CinematicFrames?.frames || G._CaptureEngine._frames;
      if (frames && frames.length >= 3) {
        const cityName = c.city?.name || '';
        const today = c.today || new Date().toLocaleDateString('ro-RO');
        G._CinematicCollage.generate(c.pdf, c.W, c.H, cityName, today);
        console.log('[MasterplanCollage] ✅ Pagina colaj inserată după copertă');
      }
    };
  }

  console.log('[CaptureEngine] ✅ Masterplan patat — colaj se inserează automat după copertă');
};

// ═══════════════════════════════════════════════════════════════════════════
// BUTON MANUAL — pentru testare/captură fără film
// ═══════════════════════════════════════════════════════════════════════════

G._addCaptureButton = function() {
  if (document.getElementById('cinema-capture-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'cinema-capture-btn';
  btn.title = 'Capturează scene pentru colaj PDF';
  btn.style.cssText = `
    position: fixed; bottom: 130px; right: 10px; z-index: 3200;
    width: 36px; height: 36px; border-radius: 8px;
    background: rgba(4,10,24,.92);
    border: 1px solid rgba(139,92,246,.4);
    color: #a78bfa; font-size: 16px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-family: inherit;
    transition: background .2s;
  `;
  btn.innerHTML = '📸';
  btn.onclick = () => {
    const cnt = (window._CinematicFrames?.frames?.length || G._CaptureEngine._frames.length);
    if (cnt > 0) {
      ss?.(`📸 ${cnt} scene capturate. Generați Masterplan PDF pentru a include colajul!`);
    } else {
      ss?.('📸 Rulați TCI Cinematic v2 pentru a captura scenele. Colajul se generează automat.');
    }
  };
  document.body.appendChild(btn);
};

// ═══════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════
(function _init(n) {
  if (n > 80) return;

  // Așteptăm SceneEngine și Masterplan
  const hasScene  = typeof window._SceneEngine !== 'undefined';
  const hasMP     = typeof window._TCIMasterplanPDF !== 'undefined';

  if (!hasScene || !hasMP) {
    setTimeout(() => _init(n + 1), 400);
    return;
  }

  G._patchSceneEngineForCapture();
  G._patchMasterplanWithCollage();
  G._addCaptureButton();

  // Expunere globală
  window._CaptureEngine    = G._CaptureEngine;
  window._CinematicCollage = G._CinematicCollage;

  console.log('[TCI Cinematic Capture v1.0] ✅ Captură automată + Colaj PDF activ');
  ss?.('📸 Cinematic Capture activ — rulați Cinema v2 și Masterplanul va include colajul!');
})(0);

})(window);
