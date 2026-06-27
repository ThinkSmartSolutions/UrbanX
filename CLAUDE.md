# UrbanX — Context Complet pentru Claude Code
## Versiunea 2.0 | Actualizat: Iunie 2026

---

## 1. IDENTITATE PROIECT

- **Nume:** UrbanX — Platformă de Analiză Urbanistică în Timp Real
- **Owner:** ThinkSmart Solutions SRL / Florin Grierasu (florin@m2msolutions.ro)
- **Repo principal:** https://github.com/ThinkSmartSolutions/UrbanX
- **Repo secundar:** https://github.com/M2MSolutionsTech/UrbanX
- **Live ThinkSmart:** https://thinksmartsolutions.github.io/UrbanX/
- **Live M2M:** https://m2msolutionstech.github.io/UrbanX/
- **Folder local:** /Users/florin/Desktop/platforma_urbanism_pachet_final/UrbanX

---

## 2. DEPLOY — COMANDĂ UNICĂ (NICIODATĂ ALTA)

```bash
cd "/Users/florin/Desktop/platforma_urbanism_pachet_final/UrbanX" && \
git add -A && \
git commit -m "MESAJ" && \
git pull --rebase && \
git push
```

`git push` trimite **simultan** pe ThinkSmartSolutions/UrbanX și M2MSolutionsTech/UrbanX.

---

## 3. ARHITECTURA COMPLETĂ

### Stack tehnic
- **Hartă:** Mapbox GL JS v3.11.0
- **3D:** Three.js r128
- **Geometrie:** Turf.js v6
- **PDF:** jsPDF + html2canvas
- **Backend:** Zero server — GitHub Pages static
- **Proxy API:** Cloudflare Worker (urbanx-proxy.3dtravelsoftart.workers.dev)
- **Auth/Sync:** Supabase (opțional)

### Structura fișierelor

```
UrbanX/
├── index.html                    ← FIȘIER PRINCIPAL (300K+ chars)
├── CLAUDE.md                     ← acest fișier
├── js/
│   ├── 00-globals.js             ← Variabile globale, constante
│   ├── 02-map-core.js            ← Inițializare Mapbox, layers de bază
│   ├── 03-ui-panel.js            ← Panouri UI, sidebar, modal-uri
│   ├── 04-search.js              ← Căutare CF (60000-183379), adresă, GPS
│   ├── 05-cad-utils.js           ← Utilitare CAD, conversii coordonate
│   ├── 06-aedis.js               ← 3D builder clădiri, Urban3D, config UAT-uri
│   ├── 07-pdf-utils.js           ← Export PDF utilitar
│   ├── 08-lotizare.js            ← Algoritm lotizare parcele (bug la geometrii complexe)
│   ├── 09-pdf-engine.js          ← Motor PDF avansat
│   ├── 10-studies*.js            ← Studii urbane (geo, terrain, connector)
│   ├── 11-viewer3d.js            ← Three.js scene, renderer, camera, OrbitControls
│   ├── 12-admin.js               ← Panou admin, setări
│   ├── 13-info-drawer.js         ← Drawer info parcelă, regulament
│   ├── 14-docx-export.js         ← Export Word document
│   ├── 15-relevee*.js            ← Planșe arhitecturale (pereți, uși, ferestre, subsol, acoperiș)
│   ├── 16-projects.js            ← Gestiune proiecte utilizator
│   ├── 17-tci-cinema.js          ← Motor prezentare animată, _EXTRA_UATS, _RO_CITIES_DB
│   ├── 17-projection-engine.js   ← Motor proiecție urbană
│   ├── 18-animation-engine.js    ← Animații, tranziții
│   ├── 18-context3d.js           ← Context 3D urban
│   ├── 19-ux-polish.js           ← UX polish, micro-interacțiuni
│   ├── 20-uats-database.js       ← Baza de date UAT-uri România (188 UAT-uri)
│   ├── 21-cloud-sync.js          ← Sincronizare cloud Supabase
│   ├── 22-zoning-connector.js    ← Conector zonare PUG
│   ├── 23-legal-chain.js         ← Lanț legal documente urbanism
│   ├── 24-timeline-layer.js      ← Layer cronologie urbană
│   ├── 25-prediction-layer.js    ← Layer predicții Monte Carlo
│   ├── 26-virtual-tour.js        ← Tur virtual 3D first-person (WASD + touch)
│   ├── 27-tur-sync.js            ← Sincronizare tur virtual cu clădire
│   ├── 28-ux-master.js           ← Master UX controller
│   ├── 29-completari-finale.js   ← Completări și patch-uri finale
│   ├── 30-tur-foto.js            ← Tur foto 360°
│   ├── 31-ifc-bim-structural.js  ← Export IFC/BIM structural
│   ├── 32-glb-semantic-export.js ← Export GLB semantic
│   ├── 33-photorealism.js        ← Post-procesare fotorealistă
│   ├── 34-gaussian-splat-auto.js ← Gaussian splatting automat
│   ├── 35-furniture.js           ← Mobilier 3D automat
│   ├── 36-vtour-fixes.js         ← Fix-uri tur virtual
│   ├── 37-floor-logic.js         ← Logică etaje clădire
│   ├── 38-dollhouse-context.js   ← Vedere dollhouse
│   ├── 39-plan-upgrade.js        ← Upgrade planșe
│   ├── 40-boma-office.js         ← Standard BOMA birouri
│   ├── 41-visual-upgrade.js      ← Upgrade vizual materiale
│   ├── 42-facade-sync.js         ← Sincronizare fațade
│   ├── 43-subsol-all-views.js    ← Vederi subsol
│   ├── 44-pbr-materials.js       ← Materiale PBR
│   ├── 45-section3d.js           ← Secțiuni 3D
│   ├── 46-postprocessing.js      ← Post-procesare Three.js
│   ├── 47-render4k.js            ← Render 4K
│   ├── 48-render-gallery.js      ← Galerie randări
│   ├── cinema-v5.js              ← Motor principal prezentare (34 scene)
│   ├── cinema-data.js            ← Date statice: seismic P100, salarii INSE, RGU
│   ├── cinema-live-sources.js    ← Date live: CNAIR, OpenAQ, OpenSky, GTFS
│   ├── tci-cinematic-scenes.js   ← Funcții _add* pentru scene (SE.funcție)
│   ├── tci-masterplan*.js        ← Masterplan vizual, QR
│   ├── tci-intelligence.js       ← AI intelligence layer
│   ├── tci-data-live.js          ← Date live feed
│   ├── tci-zone-engine.js        ← Motor zonare
│   ├── tci-corridors.js          ← Coridoare urbane
│   ├── tci-pug-import.js         ← Import PUG
│   ├── tci-ghsl-layer.js         ← Layer GHSL densitate
│   ├── tci-uat-dashboard.js      ← Dashboard UAT
│   ├── urbanx-analytics.js       ← Analytics platformă
│   ├── urbanx-compare-pro.js     ← Comparare UAT-uri Pro
│   ├── urbanx-science-layer.js   ← Layer știință urbană
│   ├── urbanx-ai-narrative.js    ← Narativ AI automat
│   ├── urbanx-parcel-tools.js    ← Instrumente parcele
│   ├── urbanx-public-participation.js ← Participare publică
│   ├── osm-live-connector.js     ← Conector OSM live
│   ├── inse-connector.js         ← Conector INSE statistici
│   ├── uats-registry.js          ← Registru UAT-uri
│   ├── uats-extended-data.js     ← Date extinse UAT-uri
│   ├── rlu-loader.js             ← Încarcă fișierele rlu-*.js
│   ├── rlu-iasi.js               ← UTR-uri Municipiul Iași
│   ├── rlu-galati.js             ← UTR-uri Municipiul Galați
│   ├── rlu-vaslui.js             ← UTR-uri Municipiul Vaslui
│   ├── rlu-botosani.js           ← UTR-uri Municipiul Botoșani
│   ├── rlu-baluseni.js           ← UTR-uri Comuna Bălușeni
│   ├── rlu-miroslava.js          ← UTR-uri Comuna Miroslava
│   ├── rlu-aroneanu.js           ← UTR-uri Comuna Aroneanu
│   ├── rlu-rediu.js              ← UTR-uri Comuna Rediu
│   ├── rlu-holboca.js            ← UTR-uri Comuna Holboca
│   ├── rlu-cuzavoda.js           ← UTR-uri Comuna Cuza Vodă
│   ├── rlu-mihaieminescu.js      ← UTR-uri Comuna Mihai Eminescu BT
│   └── rlu-piatra-neamt.js       ← UTR-uri Municipiul Piatra-Neamț
├── data/
│   ├── municipiul-iasi/          pug.geojson + reguli.json
│   ├── municipiul-galati/        pug.geojson + reguli.json
│   ├── municipiul-suceava/       pug.geojson + reguli.json
│   ├── municipiul-vaslui/        pug.geojson + reguli.json
│   ├── municipiul-piatra-neamt/  pug.geojson + reguli.json
│   ├── com-baluseni/             pug.geojson + reguli.json + cadastru_index.json
│   ├── comuna-miroslava/
│   ├── comuna-rediu/
│   ├── comuna-aroneanu/
│   ├── comuna-holboca/
│   └── ...
└── zone/                         ← Fișiere zona tile per UAT
```

---

## 4. PUNCTE CHEIE ÎN index.html

### `_PUG_REGISTRY` — mapează cheia → fișiere
```javascript
'RO-GL-01': { 
  id:'municipiul-galati', 
  pugFile:'data/municipiul-galati/pug.geojson',   // ÎNTOTDEAUNA data/ nu js/data/
  reguli:'data/municipiul-galati/reguli.json' 
},
```

### `COMUNE_CONFIG` — lista UI (comune + orașe mici)
```javascript
{id:'comuna-miroslava', name:'Miroslava', judet:'iași', 
 parentKey:'RO-IS-01', badge:'✅ RLU', key:'RO-IS-95042'},
```

### `MUNI_RLU_PATCH` — badge-uri municipii mari
```javascript
{texts:['Galați','Municipiul Galați'], key:'RO-GL-01', 
 badge:'⚠ Parțial', bStyle:'background:rgba(59,130,246,0.2);color:#93c5fd;border:1px solid rgba(59,130,246,0.3)'},
```

### `_RO_CITIES_DB` — 31 municipii România (date demografice+economice)
Galați, Iași, Suceava, Botoșani, Neamț, Bacău, Vaslui, Vrancea,
Cluj, Timiș, Brașov, Constanța, Sibiu, Mureș, Bihor, Arad, Prahova, Dolj etc.
**Municipiile NU se adaugă în `_EXTRA_UATS`** — sunt deja aici.

### `_EXTRA_UATS` (în js/17-tci-cinema.js) — comune și sate
```javascript
'RO-IS-95042': {siruta:'95042', name:'Miroslava', judet:'IS',
  tip:'comuna', pop2021:5000, lat:47.XXX, lon:27.XXX,
  regiune:'NE', coef_hub:0.70, rata_reala_2011_2021:1.05},
```

---

## 5. FLUXUL COMPLET — CLICK PE HARTĂ

```
User click pe hartă
    ↓
Mapbox queryRenderedFeatures() → identifică parcela
    ↓
_findUTRNumericForParcel(ap) → găsește UTR numeric
    ↓
_loadReguli(cityKey) → fetch data/{uat}/reguli.json
    ↓
d.utrs[utrNr] → { fn_dominanta, subzone_admise, fn_interzise }
    ↓
subzone[result.code] → { pot_baza, cut_baza, hmax_m, regim, retrageri }
    ↓
UI: popup cu regulament + indicatori urbanistici
```

---

## 6. STRUCTURA FIȘIERELOR DE DATE

### `pug.geojson`
```json
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "utr": "15",        // string — cheie în reguli.json utrs
      "zf": "ZF07",       // zona funcțională
      "det": null,        // denumire detaliată (opțional)
      "obs": null         // observații (opțional)
    },
    "geometry": { "type": "Polygon", "coordinates": [...] }
  }]
}
```
- CRS: **WGS84 (EPSG:4326)** — obligatoriu
- Sursa shapefiles: EPSG:3844 (Stereo70) → convertit cu geopandas

### `reguli.json`
```json
{
  "_meta": { "uat": "...", "uat_key": "RO-XX-01", "sursa": "RLU ...", "versiune": "1.0.0" },
  "subzone": {
    "ZF07": {
      "denumire": "Zona Centrală",
      "pot_baza": 60, "cut_baza": 3.0, "hmax_m": 22.5, "niv_max": 5,
      "regim": "P+2÷P+5",
      "retragere_fata": "3.0m", "retragere_lat": "min. 3.0m", "retragere_spate": "H/2",
      "spatii_verzi_pct": 20
    }
  }
}
```

### `rlu-{uat}.js`
```javascript
(function() {
  window._PUG_REGULI = window._PUG_REGULI || {};
  var _inject = function(d) {
    d.utrs = {
      '15': { denumire:'UTR 15 — Zona Centrală', fn_dominanta:'ZF07',
        subzone_admise:['ZF08.1','ZF08.5'], fn_interzise:['ZF12.1','ZF12.2'] },
      'G': { ... },  // UTR-uri non-numerice cu cheie string
    };
  };
  // Pattern injectare după fetch reguli.json
})();
```

---

## 7. CUM ADAUGI UN UAT NOU

### MUNICIPIU — 6 pași

**1. Fișiere date:**
```bash
mkdir -p data/municipiul-{nume}
cp ~/Downloads/pug.geojson data/municipiul-{nume}/
cp ~/Downloads/reguli.json data/municipiul-{nume}/
```

**2. `index.html` → `_PUG_REGISTRY`:**
```javascript
'RO-{JJ}-01': { id:'municipiul-{nume}', name:'Municipiul {Nume}',
  pugFile:'data/municipiul-{nume}/pug.geojson',
  reguli:'data/municipiul-{nume}/reguli.json' },
```

**3. `index.html` → `MUNI_RLU_PATCH`:**
```javascript
{texts:['{Nume}','Municipiul {Nume}'], key:'RO-{JJ}-01',
 badge:'⚠ Parțial',  // sau ✅ RLU sau ✅ Complet
 bStyle:'background:rgba(59,130,246,0.2);color:#93c5fd;border:1px solid rgba(59,130,246,0.3)'},
```

**4. `js/06-aedis.js`:**
```javascript
'RO-{JJ}-01': { center:[lon, lat], zoom:13,
  pugFile:'./data/municipiul-{nume}/pug.geojson',
  reguliFile:'./data/municipiul-{nume}/reguli.json', status:'partial' }
```

**5. `js/rlu-{nume}.js`** — creat din zero cu utrs per UTR.

**6. `index.html`** — adaugă `<script src="js/rlu-{nume}.js?v=DATA">` după celelalte rlu-*.js.

### COMUNĂ — pași suplimentari față de municipiu

**+1. `index.html` → `COMUNE_CONFIG`:**
```javascript
{id:'comuna-{nume}', name:'{Nume}', judet:'{judet}',
 parentKey:'RO-{JJ}-01', badge:'✅ RLU', key:'RO-{JJ}-SIRUTA'},
```

**+2. `js/17-tci-cinema.js` → `_EXTRA_UATS`:**
```javascript
'RO-{JJ}-SIRUTA': {siruta:'SIRUTA', name:'{Nume}', judet:'{JJ}',
  tip:'comuna', pop2021:XXXX, lat:XX.XXXX, lon:XX.XXXX,
  regiune:'NE', coef_hub:0.70, rata_reala_2011_2021:1.05},
```

---

## 8. CLASIFICARE BADGE

| Status | Badge | Culoare | Condiție |
|--------|-------|---------|----------|
| ✅ Complet | `✅ Complet` | verde intens | RLU + PUG + Cadastru |
| ⚠ Parțial | `⚠ Parțial` | albastru | RLU + PUG |
| ✅ RLU | `✅ RLU` | verde | Doar RLU |
| ○ Gol | `○ Gol` | roșu | Nimic |

Stiluri CSS:
- **Complet/RLU:** `background:rgba(5,150,105,0.2);color:#34d399;border:1px solid rgba(5,150,105,0.3)`
- **Parțial:** `background:rgba(59,130,246,0.2);color:#93c5fd;border:1px solid rgba(59,130,246,0.3)`

---

## 9. UAT-URI EXISTENTE CU PUG

| Cheie | SIRUTA | Nume | Badge | Folder |
|-------|--------|------|-------|--------|
| `RO-IS-01` | 179132 | Municipiul Iași | ✅ Complet | municipiul-iasi |
| `RO-SV-01` | 114462 | Municipiul Suceava | ✅ Complet | municipiul-suceava |
| `RO-BT-01` | 10169 | Municipiul Botoșani | ⚠ Parțial | botosani |
| `RO-VS-01` | 92672 | Municipiul Vaslui | ✅ RLU | municipiul-vaslui |
| `RO-NT-01` | 111198 | Municipiul Piatra-Neamț | ✅ RLU | municipiul-piatra-neamt |
| `RO-GL-01` | 79810 | Municipiul Galați | ⚠ Parțial | municipiul-galati |
| `RO-IS-95042` | 95042 | Miroslava | ✅ RLU | comuna-miroslava |
| `RO-IS-95087` | 95087 | Rediu | ✅ RLU | comuna-rediu |
| `RO-IS-94889` | 94889 | Aroneanu | ✅ RLU | comuna-aroneanu |
| `RO-IS-94951` | 94951 | Holboca | ⚠ Parțial | comuna-holboca |
| `RO-IS-95069` | 95069 | Popricani | ⚠ Parțial | comuna-popricani |
| `RO-IS-95354` | 95354 | Vlădeni | ⚠ Parțial | comuna-vladeni |
| `RO-BT-18073` | 18073 | Bălușeni | ✅ RLU | com-baluseni |
| `RO-BT-18875` | 18875 | Mihai Eminescu BT | ⚠ Parțial | comuna-mihaieminescu |
| `RO-GL-77595` | 77595 | Cuza Vodă | ⚠ Parțial | comuna-cuzavoda |
| `RO-B-01` | 179141 | Municipiul București (agregat S2+S6) | ⚠ Parțial | bucuresti |
| `RO-B-179178` | 179178 | București — Sectorul 2 | ⚠ Parțial (PUG+RLU+cadastru) | bucuresti-sector-2 |
| `RO-B-179211` | 179211 | București — Sectorul 6 | ⚠ Parțial (PUG, reguli orientative) | bucuresti-sector-6 |

---

## 10. PROXY CLOUDFLARE — OBLIGATORIU

```javascript
// CORECT — toate fetch-urile externe:
const proxy = 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
fetch(`${proxy}/proxy?url=${encodeURIComponent(url)}`);

// GREȘIT — niciodată direct:
fetch('https://api-extern.ro/date');
```

Endpoint-uri disponibile prin proxy:
- `/osm` → Overpass API (OpenStreetMap)
- `/inse` → INSE TEMPO statistici.insse.ro
- `/anar` → ANAR WMS gis.rowater.ro
- `/proxy` → orice URL extern (CORS bypass)

---

## 11. BUGS CUNOSCUTE

| Bug | Fișier | Status |
|-----|--------|--------|
| Lotizare crăpă pe geometrii complexe (CF 56832 Bălușeni) | js/08-lotizare.js | ✅ Rezolvat — `_lotSanitizeGeom()` (cleanCoords+rewind+buffer(0)) repară self-intersection (area 0 → validă) |
| Coordonate terenuri tenis Bălușeni greșite | data/com-baluseni/pug.geojson | ❌ Nerezolvat |
| Search CF < 60000 nu funcționează | js/04-search.js | ℹ️ Nu e gate de cod — `04-search.js` caută în `S.cadIdx` (cu match parțial); CF<60000 lipsește din `cadastru_index.json` (limitare de date) |
| Buton Tur Virtual nu e în panoul Urban3D | js/06-aedis.js | ✅ Rezolvat — buton 🥽 Tur în `aedis-actions`, apelează `window.VTour.start()` |
| 11 poligoane neidentificate în PUG Galați | data/municipiul-galati/pug.geojson | ⚠ Necesită proiectant |

### Fix lotizare (când îl rezolvi):
```javascript
// În 08-lotizare.js, înainte de turf.intersect():
const simplified = turf.simplify(utrFeature, {tolerance: 0.00001, highQuality: true});
const lotizareFeatures = pugFeatures.filter(f => f.properties.utr !== 'CE');
```

### Fix search CF:
```javascript
// În 04-search.js — extinde range-ul:
// de la: range: [60000, 183379]
// la:    range: [50000, 183379]
```

---

## 12. REGULI DE AUR — NICIODATĂ ÎNCĂLCATE

1. **ZERO diacritice** în chei JS, ID-uri, nume foldere (folder: `municipiul-galati` nu `municipiul-galați`)
2. **Calea `data/{folder}/`** — niciodată `js/data/{folder}/`
3. **Șterge layerele ÎNAINTE de source** în Mapbox cleanup
4. **Toate fetch-urile externe prin proxy** Cloudflare
5. **Municipiile NU în `_EXTRA_UATS`** — sunt în `_RO_CITIES_DB`
6. **Verifică 3 locuri** la orice UAT nou: `_PUG_REGISTRY` + `MUNI_RLU_PATCH`/`COMUNE_CONFIG` + `06-aedis.js`
7. **Deploy automat** după orice modificare
8. **ZERO duplicare de conținut între studii/rapoarte.** Niciun studiu sau raport nu se suprapune ca și conținut cu altul. Fiecare livrabil are un SCOP DISTINCT și conținut diferit. Înainte de a adăuga conținut într-un studiu, verifică să nu existe deja în altul — dacă există, nu-l copia (trimite-l prin referință la livrabilul dedicat).
9. **TERITORIU ≠ PARCELĂ. Rang superior ≠ rang inferior.** Un studiu de rang superior (TERITORIAL — UAT/zonă/strategie) NU este același lucru cu un studiu de rang inferior (PE PARCELĂ — punctual, cifre concrete pe lot). Sunt DIFERITE ca scop, nivel de analiză și conținut — tratează-le diferit, nu le converge. Ex.: SFU (fezabilitate urbană, teritorial/strategic) ≠ SF/DALI (fezabilitate de investiție pe parcelă, deviz HG 907) — NU pune pro-forma de parcelă în studiul teritorial și invers.

---

## 13. PREZENTAREA ANIMATĂ (fostul "Cinematic")

Motorul de prezentare animată rulează 34 de scene automat:

```
cinema-v5.js          ← Motor principal, orchestrează scenele
cinema-data.js        ← Date statice (seismic, salarii, demographice)
cinema-live-sources.js ← Date live (trafic, meteo, aviație)
tci-cinematic-scenes.js ← Funcții SE._add*(map) per scenă
17-tci-cinema.js      ← Motor v8, _EXTRA_UATS, _RO_CITIES_DB
```

Funcții disponibile (`SE.funcție(map)`):
- `SE._add3DGrowth(map)` — bare 3D UTR-uri
- `SE._addTrafficPulse(map)` — puls trafic OSM
- `SE._addSeismicHeat(map)` — heatmap seismic
- `SE._addFloodExpand(map)` — inundații
- `SE._addDensityHeat(map)` — densitate populație
- `SE._addBuildings(map)` — clădiri colorate per UTR

Date accesibile din cinema-v5.js:
- `SE._city` — datele UAT curent
- `SE._pred` — predicții calculate
- `SE._pugGeo` — geometria PUG
- `SE._reguli` — regulile PUG
- `SE._map` — instanța Mapbox

---

## 14. TURUL VIRTUAL 3D

```
js/26-virtual-tour.js    ← Motor principal first-person (WASD + touch)
js/27-tur-sync.js        ← Sincronizare cu clădirea generată
js/36-vtour-fixes.js     ← Fix-uri diverse
```

Status: Deploiat dar butonul nu e în panoul Urban3D (în js/06-aedis.js).
Fix necesar: adaugă `<button onclick="window.VTour && window.VTour.start()">🥽 Tur Virtual 3D</button>` în funcția `aedisRender()`.

---

## 15. PROCESARE GIS — CONVERSIE SHAPEFILES

Când primești shapefiles (.shp) pentru un UAT nou:

```python
import geopandas as gpd
import json
from shapely.geometry import mapping

# Citește și convertește la WGS84
gdf = gpd.read_file('pug.shp').to_crs('EPSG:4326')

# Normalizează UTR-uri
import re
def norm(utr):
    u = utr.strip()
    m = re.match(r'(?:TRUP|Trup)\s+(\d+)', u, re.IGNORECASE)
    if m: return f"Trup {m.group(1)}"
    if u in ['?', '-', '']: return '?'
    return u

# Generează GeoJSON
features = []
for _, row in gdf.iterrows():
    features.append({
        "type": "Feature",
        "properties": {"utr": norm(row['UTR']), "zf": None, "det": None, "obs": None},
        "geometry": mapping(row.geometry)
    })

with open('pug.geojson', 'w') as f:
    json.dump({"type": "FeatureCollection", "features": features}, f, ensure_ascii=False)
```

**Dependențe Python necesare:**
```bash
pip install geopandas rasterio pyproj --break-system-packages
```

---

## 16. ERORI COMUNE ȘI FIX-URI RAPIDE

| Eroare | Cauza | Fix |
|--------|-------|-----|
| `HTTP 404 PUG {uat}` | Cale greșită în `_PUG_REGISTRY` sau `06-aedis.js` | Verifică `data/` vs `js/data/` cu grep |
| UAT nu apare în selector | Lipsește din `COMUNE_CONFIG` sau `MUNI_RLU_PATCH` | Adaugă în locul potrivit |
| Badge greșit pe municipiu | `patchMuniBadges` nu prinde elementul | Verifică `m.badge` și `m.bStyle` |
| Prezentare pornește pe Iași | Cheia UAT incorectă | Verifică SIRUTA și cheia în toate cele 3 locuri |
| `Source cannot be removed` | Cleanup Mapbox greșit | Șterge layere ÎNAINTE de source |
| `SyntaxError: unexpected token` | Diacritice în JS | Înlocuiește cu ASCII |
| CORS errors | Fetch direct din browser | Rutează prin proxy Cloudflare |
| Harta inundații persistă | `hideAll()` incomplet | Curăță explicit ID-urile din `_cleanV9()` |

---

## 17. COMANDĂ DIAGNOSTICARE RAPIDĂ

```bash
# Verifică toate căile unui UAT
grep -n "municipiul-galati" index.html js/06-aedis.js

# Verifică că fișierele există
ls -la data/municipiul-galati/

# Verifică că nu mai sunt căi js/data/ greșite
grep -rn "js/data/municipiul" index.html js/

# Verifică remotes git (să fie ambele conturi)
git remote -v
```

