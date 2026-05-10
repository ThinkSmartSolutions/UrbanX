# UrbanX — Arhitectura Modulară
**Versiune:** 1.0 · **Data:** 03 mai 2026 · **Status:** Producție

---

## Structura fișierelor

```
/UrbanX/
├── index.html                  ← HTML + CSS + <script src> — 1.270 linii (era 20.837)
├── ARCHITECTURE.md             ← acest fișier
│
├── js/                         ← Module JavaScript — ordine de încărcare fixă
│   ├── 00-globals.js           ← STATE, constante, auth — PRIMUL ÎNCĂRCAT ÎNTOTDEAUNA
│   ├── 02-map-core.js          ← Mapbox, layere, volume, context OSM
│   ├── 03-ui-panel.js          ← Panel lateral, tab-uri, HTML dinamic UI
│   ├── 04-search.js            ← Căutare cadastru, adresă, coordonate GPS
│   ├── 05-cad-utils.js         ← UTR helpers, switchTab, parametri PUG
│   ├── 06-aedis.js             ← Urban3D modal, renderer 3D, FAL.AI, LOISIR
│   ├── 07-pdf-utils.js         ← PDF logo, capturi hartă, bilanț edificabil
│   ├── 08-lotizare.js          ← Generator lotizare, export PDF plan
│   ├── 09-pdf-engine.js        ← Design system PDF (_initStudyPdf)
│   ├── 10-studies.js           ← Toate studiile și rapoartele PDF
│   ├── 11-viewer3d.js          ← Viewer Urban3D full-screen, materiale, Street View
│   ├── 12-admin.js             ← Admin panel, utilizatori Supabase
│   └── 13-info-drawer.js       ← RAPORT_INFO catalog, drawer lateral info
│
└── studies/                    ← (viitor) studii noi ca fișiere independente
    └── README.md
```

---

## Reguli de arhitectură — OBLIGATORII

### 1. Ordinea de încărcare e critică
Browserul execută script-urile în ordinea din `index.html`.
**`00-globals.js` TREBUIE să fie primul** — definește `S`, `AEDIS`, `V3D`, `map` etc.
Niciun modul nu importă din alt modul — toate citesc din globalele din `00-globals.js`.

### 2. Cum adaugi un modul nou
```
studii noi → adaugă funcția în 10-studies.js SAU creează 10b-studies-new.js
funcție UI nouă → 03-ui-panel.js
funcționalitate hartă → 02-map-core.js
tool nou (ex: comparator parcele) → js/14-comparator.js (număr următor)
```

**Template pentru fișier nou:**
```javascript
// UrbanX — Numele modulului
// Dependențe: 00-globals.js (S, map, REGULI)
// Adăugat: DD.MM.YYYY

// === CONSTANTE MODUL ===
const MY_MODULE_CONFIG = { ... };

// === FUNCȚII PUBLICE ===
function myNewFeature() {
  // Folosește S.parcels, map, AEDIS etc din globals
}

// === EVENT LISTENERS (dacă e cazul) ===
// document.addEventListener('DOMContentLoaded', () => { ... });
```

### 3. Variabile globale — ce există în `00-globals.js`

| Variabilă | Tip | Descriere |
|-----------|-----|-----------|
| `S` | Object | State principal al aplicației (parcele, volum, tab activ) |
| `AEDIS` | Object | Configurarea Urban3D (funcțiune, stil, niveluri) |
| `V3D` | Object | State viewer 3D (renderer, scene, camera) |
| `_LOT` | Object | State lotizare (tipuri, parametri, rezultate) |
| `REGULI` | Object | Regulamentul PUG per UTR |
| `FN_UTR` | Object | Funcțiuni urbanistice |
| `PDF_C` | Object | Paleta culori pentru PDF (main report) |
| `map` | mapboxgl.Map | Instanța hartă Mapbox — definită în 02-map-core.js |

### 4. Cum adaugi un studiu nou în rapoarte
Studiile sunt funcții `async generateXxx()` în `10-studies.js`.

**Pași:**
1. Adaugă funcția în `10-studies.js` — copiază structura oricărui studiu existent
2. Adaugă butonul în `index.html` — secțiunea `rapoarte-menu` și `htmlMobRapoarte()`
3. Adaugă intrarea în `RAPORT_INFO` din `13-info-drawer.js`
4. Dacă studiul e mare (>300 linii) → creează `10b-studiu-nou.js` separat

**Template studiu:**
```javascript
async function generateNouStudiu() {
  const ap = S.parcels[S.activeParcel ?? 0];
  if(!ap?.geo?.geometry) { ss('Selectați o parcelă.'); return; }
  ss('Se generează...');

  const d = _initStudyPdf('Titlu Studiu', 'Subtitlu · Lege aplicabilă', 7);
  const { pdf, W, H, DARK, GOLD, LIGHT, S2, hdr, ftr, sec, body, tblRow, addImg, concluzii, sign, cover } = d;

  const caps = await _captureStudyMaps(ap, m => ss(m));

  // PAG 1: Copertă
  cover('Subtitlu copertă', caps.img3D, [['KPI 1', 'Valoare 1']], true, 'CONFORM');

  // PAG 2..N: Conținut
  pdf.addPage(); pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');
  hdr('TITLU PAGINĂ', 2); ftr();
  let cy = 33;
  cy = sec('1. SECȚIUNE', cy);
  cy = body('Text paragraf...', 14, cy);

  // Ultima pagină: concluzii + semnături
  pdf.addPage(); /* ... */ sign();

  pdf.save('UrbanX_NouStudiu_' + d.nrcad + '.pdf');
  ss('✅ Studiu generat.');
}
```

### 5. Cum adaugi funcționalitate hartă nouă
Layerele Mapbox se adaugă în `02-map-core.js`, funcția `addLayers()`.
Pattern consistent:
```javascript
// În addLayers():
map.addSource('nou-src', { type:'geojson', data:{ type:'FeatureCollection', features:[] } });
map.addLayer({ id:'nou-layer', type:'fill', source:'nou-src', paint:{ 'fill-color':'#3b82f6' } });

// Helper pentru update:
function updateNouLayer(features) {
  setSource('nou-src', { type:'FeatureCollection', features });
}
```

---

## Cum rulezi local (fără server)

Browserele blochează `<script src="...">` din fișiere locale (`file://`).
Ai nevoie de un server HTTP minim:

```bash
# Python (built-in):
cd /calea/catre/UrbanX
python3 -m http.server 8080
# Deschide: http://localhost:8080

# Node.js (dacă ai npm):
npx serve .
# Deschide: http://localhost:3000
```

---

## Viitor — când crești mai mult

### Când `06-aedis.js` (290KB) devine prea mare:
Sparge-l în:
- `06a-aedis-modal.js` — UI panel, tab-uri, render
- `06b-aedis-3d.js` — geometrie 3D, materiale
- `06c-loisir.js` — tot ce ține de LOISIR

### Când ai 5+ studii noi:
- Creează `10a-studies-tehnice.js`, `10b-studies-speciale.js`
- Sau un folder `studies/` cu un fișier per studiu

### Când vrei lazy loading (performanță):
```javascript
// In loc de <script src="10-studies.js"> in HTML,
// incarci la prima folosire:
async function generateSolarStudy() {
  if(!window._studiesLoaded) {
    await loadScript('js/10-studies.js');
    window._studiesLoaded = true;
  }
  _generateSolarStudyInternal();
}
```

### Când vrei TypeScript / build system:
- Instalezi Vite: `npm create vite@latest urbanx -- --template vanilla`
- Muți fișierele .js în `/src/`
- `import` / `export` în loc de globale
- `npm run build` generează un singur fișier optimizat

---

## Verificare rapidă după modificări

```bash
# Verifici că nu lipsesc funcții din fișierul monolitic original:
grep -c "^function\|^async function" index_v4.html   # 368
grep -rc "^function\|^async function" js/             # trebuie să fie tot 368

# Verifici că index.html are toate script-urile:
grep "script src" index.html
```

---

*UrbanX TSS·FG · Arhitectură modulară v1.0 · Mai 2026*
