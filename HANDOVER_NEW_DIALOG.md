# HANDOVER — UrbanX TCI Cinema
## Sesiunea: 10 Mai 2026 · v66 · Continuare dialog nou

---

## 1. PROIECT

**Repo:** https://github.com/ThinkSmartSolutions/UrbanX.git  
**Live:** https://thinksmartsolutions.github.io/UrbanX/  
**Fișier principal:** `js/17-tci-cinema.js` (v66, 2490 linii, 126KB)  
**Index:** `index.html` (cache version `v=2026051066`)  

---

## 2. CE ESTE TCI CINEMA

**TCI = Temporal Cinematic Interface** — instrument predictiv urbanistic, NU joc, NU animație decorativă.

Afișează **split-screen sincronizat**:
- **STÂNGA** = Realitatea 2025 (Mapbox Standard 3D, OSM, înghețat)
- **DREAPTA** = Proiecție statistică 2025–2055 (aceeași hartă + clădiri 3D proiectate)

**Baza predicțiilor:** INS cohort-survival + ANCPI autorizații + BNR + Eurostat + P100-1/2022 + OCA aeronautic. NU PUG/UTR ca limitare — PUZ permite extindere intravilam.

---

## 3. ARHITECTURA TEHNICĂ

### Stack
```
Mapbox GL JS v3.11.0  (harta)
Three.js r128         (clădiri 3D proiectate)
Supabase JS v2        (DB LMI România — în lucru)
vanilla ES6           (fără React)
```

### CustomLayerInterface (3D engine)
```javascript
TCI._3D = {
  type: 'custom', renderingMode: '3d',
  render(gl, matrix) {
    // CHEIA: modelMatrix cu Y negat elimină drift-ul
    const modelMatrix = new THREE.Matrix4()
      .makeTranslation(tx, ty, tz)
      .scale(new THREE.Vector3(s, -s, s));  // -s pentru Y!
    camera.projectionMatrix = new THREE.Matrix4()
      .fromArray(matrix).multiply(modelMatrix);
  }
}
```

### Material clădiri proiectate
```javascript
// MeshBasicMaterial — NU depinde de lumini, culoarea apare GARANTAT
new THREE.MeshBasicMaterial({ vertexColors: true })
// + instanceColor inițializat înainte de primul render (fix shader compile)
```

### Camera sync (pitch > 50°)
```javascript
map.on('move', () => {
  if(pitch > 50) {
    mapLeft.setFreeCameraOptions(map.getFreeCameraOptions());
  } else {
    mapLeft.jumpTo({center, zoom, pitch, bearing});
  }
});
```

### Layout (v59+)
- **UN SINGUR panou stâng (280px)** cu TOT: date live + narativ + KPI + legendă
- **Ambele hărți `flex:1`** → lățime identică → sync perfect
- **ZERO panou drept** — cauza desincronizării eliminate

---

## 4. SISTEMUL DE CONSTRÂNGERI (_CONSTRAINT)

### Flux build() — 3 surse în paralel
```
Supabase lmi_romania  →  LMI toate monumentele (când e populat)
Mapbox SearchBox API  →  cemetery, park, hospital, stadium, university
Overpass OSM          →  building=construction, natural=wood/water, railway
                    +
PROTECTED_RO hardcodat → Cimitirul Eternitatea, Pădurea Ciric, etc.
```

### Buffers de excludere
| Tip | Buffer | Sursă |
|---|---|---|
| LMI cat. A | 100m | CIMEC/Supabase |
| LMI cat. B | 50m | CIMEC/Supabase |
| Cimitir | 60-70m | Mapbox + PROTECTED_RO |
| Pădure | 55m | Overpass |
| Râu/lac | 50m | Overpass |
| Cale ferată | 22m | Overpass |
| Stadion | 80m | Mapbox |

### PROTECTED_RO (fallback Iași)
```javascript
'iasi': [
  {lon:27.5895, lat:47.1521, r:120, reason:'Cimitirul Eternitatea — LMI I-s-B-02537'},
  {lon:27.6350, lat:47.1950, r:350, reason:'Pădurea Ciric'},
  {lon:27.5790, lat:47.1600, r:60,  reason:'Cimitirul Evreiesc'},
  // + 5 mai multe
]
```

**ATENȚIE:** PROTECTED_RO este fallback pentru Iași. Pentru alte UAT-uri → Mapbox + Overpass + Supabase (după populare cu pipeline).

---

## 5. ZONE GPS REALE IAȘI (_REAL_ZONES)

Coordonate confirmate de utilizator (urbanist cu 20 ani experiență Iași):

| ID | Denumire | GPS | hMax | startYr |
|---|---|---|---|---|
| SR | Spital Regional + Pol Medical | 47.1877, 27.5874 | 45m | 2025 |
| CR | Complex Royal — Copou | 47.2011, 27.5349 | 32m | 2025 |
| CG | Copou Garden Residence | 47.1987, 27.5374 | 28m | 2026 |
| DK | Dancu — Greenpark · Himson | 47.1420, 27.6530 | 20m | 2026 |
| CV | Centru Civic | 47.1580, 27.6010 | 52m | 2026 |
| CEV | Coridor Est-Vest | 47.1572, 27.6005 | 28m | 2027 |
| RI | Reconversie Nicolina | 47.1460, 27.6210 | 33m | 2030 |
| RS | Rezidențial Sud | 47.1360, 27.5850 | 22m | 2031 |

**Zone neconfirmate (estimare — necesită verificare utilizator):**
- Dancu coordonate: `47.1420, 27.6530` — utilizatorul nu a confirmat explicit
- Reconversie Nicolina: `47.1460, 27.6210` — estimare

---

## 6. SISTEMUL DE CULORI (6 culori, logică clară)

```javascript
COLORS: {
  centru:      '#7c3aed',  // violet — centru civic densificat
  coridor:     '#d97706',  // amber — coridoare bulevardiere
  rezid:       '#2563eb',  // albastru — rezidențial colectiv
  reconv:      '#ea580c',  // roșu-portocaliu — reconversie industrială
  nou:         '#16a34a',  // verde — creștere periferică/PUZ
  stabil:      '#374151',  // gri — planificat (>startYr)
  constructie: '#f59e0b',  // galben — construcție activă (0-5 ani)
  aproape:     '#f97316',  // portocaliu — aproape finalizat (5-10 ani)
}
```

---

## 7. DIRECTOR — 12 SCENE

Scene rescrise complet în v58. Filozofie: **max 20s în 2D → zoom la stradă (zoom 17) → pull-back → altă zonă**:

| Scenă | Zonă | Zoom max | Lumina |
|---|---|---|---|
| S1 | Global Romania | 7 | day |
| S2 | Regiune Moldova | 11 | day |
| S3 | Aproach 3D | 15 | day |
| **S4** | **Spital Regional GPS real** | **17 pitch 78°** | day→dusk |
| **S5** | **Centru Civic — noapte** | **17 pitch 79°** | dusk→night→dawn |
| S6 | Reconversie est | 17 pitch 78° | day→dusk |
| **S7** | **Noapte dramatică** | **17.3 pitch 79°** | night |
| S8 | Dancu expansiune | 16.5 pitch 75° | day→dusk |
| S9 | Riscuri & climă | 13.5 | night |
| S10 | Comparație EU | 14.5 | dusk |
| S11 | Orbit 360° | 15.2 | day→dusk→night→dawn |
| S12 | Concluzie | 15.5 | dawn |

---

## 8. AEROPORTURI ROMÂNIA (19 aeroporturi)

OCA calculat geometric (ICAO Annexa 14). Iași LRIA hardcodat cu coordonate AIP:
- Prag 08: `27.6199, 47.1782` | Prag 26: `27.6470, 47.1731`
- Elevație: 121m AMSL | Pistă: 2400m

---

## 9. DATA PIPELINE (nou în v66)

### Fișiere generate
- `romania_spatial_pipeline.py` — script Python 367 linii
- `.github/workflows/spatial-pipeline.yml` — GitHub Action săptămânal
- `supabase_schema.sql` — schema DB

### Schema Supabase
```sql
TABLE lmi_romania (
  source TEXT,      -- 'CIMEC' | 'OSM' | 'Wikidata'
  cod_lmi TEXT,
  denumire TEXT,
  categorie TEXT,   -- 'A' | 'B'
  lon DOUBLE, lat DOUBLE,
  buffer_m INTEGER,
  ...
)
```

### Surse pipeline
1. **CIMEC** — ArcGIS REST `/FeatureServer/0/query?f=geojson` (server-side, fără CORS)
2. **OSM Overpass** — `historic=*`, `heritage=*`, `landuse=cemetery` pentru toată România
3. **Wikidata SPARQL** — 4000+ monumente cu GPS verificat

### Status
- Script scris ✅
- **Supabase neconfigurate încă** — necesită `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` în GitHub Secrets
- TCI interoghează Supabase dacă `window.SUPABASE_URL` e setat

---

## 10. BUGS CUNOSCUTE & LIMITĂRI

### Rezolvate în această sesiune
- ✅ Clădiri negre → MeshBasicMaterial fix
- ✅ Cimitirul Eternitatea construit peste → exclus hardcodat
- ✅ Moara de Vânt coordonate greșite → GPS real 47.1877, 27.5874
- ✅ Camera desincronizată → panel stâng unic, hărți egale
- ✅ Director plictisitor → zoom 17 de la scena 4

### Limitări rămase
- ❌ **Vehicule pe trasee reale** — dezactivate, necesită OSM routing + spline animation (~3 zile)
- ❌ **Clădiri individuale OSM nu cresc** — limitare Mapbox Standard, nu se poate modifica înălțimea clădirilor existente
- ❌ **Anotimpuri/vreme** — nu implementate (shaders complexi)
- ❌ **Pietoni animați** — nu implementați (GLTF assets + routing)
- ⚠️ **CIMEC CORS** — blocat din browser; rezolvat prin pipeline server-side sau Cloudflare Worker

### Console errors la start
- `Failed to evaluate expression ["all",...]` — din 02-map-core.js (nu TCI), nu afectează TCI
- `Cutoff is currently disabled on terrain` — Mapbox, inofensiv
- `Uncaught (in promise) Error: A listener` — din messaging async Mapbox, inofensiv

---

## 11. DEPLOY WORKFLOW

```bash
# Fișiere de copiat după fiecare modificare:
cp ~/Downloads/17-tci-cinema.js js/
cp ~/Downloads/index.html .

# Commit și push:
git add -f js/17-tci-cinema.js index.html
git commit -m "descriere v6X"
git push

# Cache clear în browser:
caches.keys().then(k=>k.forEach(n=>caches.delete(n)));
location.reload(true);
```

**Versioning:** `v=2026051066` în `index.html` — incrementează la fiecare deploy.

---

## 12. NEXT STEPS PRIORITARE

### Imediat (poate fi implementat în dialog nou)
1. **Testare v66** — verifică că clădirile colorate apar (MeshBasicMaterial)
2. **Confirmare coordonate Dancu și Nicolina** — utilizatorul trebuie să verifice pe teren
3. **Rulare pipeline** — `python romania_spatial_pipeline.py` → populează Supabase

### Mediu termen (zile)
4. **Vehicule pe TP routes** — OSM routing pe arterele principale Iași
5. **Lighting zi/noapte** — ciclul corect per scenă (deja parțial implementat)
6. **Alte UAT-uri** — adaugă `_REAL_ZONES['botosani']` etc. cu GPS din teren

### Lung termen (săptămâni)
7. **Romania Urban Knowledge Graph** — Supabase cu toate sursele
8. **Vector tiles proprii** — pentru zone protejate la nivel național
9. **Pedestrians + traffic** — GLTF + OSM routing

---

## 13. FIȘIERE CHEIE ÎN REPO

```
js/17-tci-cinema.js          ← TCI, tot codul (2490 linii)
js/00-globals.js             ← MAPBOX_TOKEN, _RO_CITIES_DB (188 UAT-uri)
js/20-uats-database.js       ← Date demografice per UAT
js/10-studies.js             ← _cimecQueryWFS() + studii PDF
data/municipiul-iasi/
  pug.geojson                ← 586 UTR-uri reale Iași (NU folosit în TCI)
  reguli.json                ← POT/CUT/H per UTR
  cadastru_index.json        ← Index cadastral
zone/
  index.json                 ← Manifest zone UTR
  zona_NNN_NNN.geojson       ← Zone UTR tile-based
romania_spatial_pipeline.py  ← Pipeline date naționale (NOU)
.github/workflows/
  spatial-pipeline.yml       ← GitHub Action săptămânal (NOU)
cimec-worker.js              ← Cloudflare Worker proxy (alternativă)
DEPLOY_CIMEC_PROXY.md        ← Instrucțiuni Cloudflare Worker
```

---

## 14. CONTEXT IMPORTANT PENTRU DIALOG NOU

**Utilizatorul** este urbanist cu 20 ani experiență în Iași. Cunoaște terenul. Orice coordonate sau zone pe care le menționează sunt CORECTE și trebuie implementate imediat cu GPS precis.

**Filosofia proiectului:**
- Date oficiale → nu invenții
- GPS real → nu offset-uri relative
- Constraint-uri urbanistice → nu ignorat
- PUG = context, NU limitare (PUZ permite extindere)

**Ce NU funcționează și utilizatorul știe:**
- Vehicule animate (dezactivate conștient)
- Clădiri individuale care cresc (limitare Mapbox)
- Anotimpuri (nu implementate)

**Ce a deranjat utilizatorul în această sesiune:**
- Zone plasate greșit (Moara de Vânt peste Păcurari)
- Construcții peste cimitire
- Clădiri negre persistente
- Camera nesincronizată
- Director prea static (zoom 17 abia la scena 8)

---

*Generat automat la finalul sesiunii 10 Mai 2026*  
*Versiune curentă: v66 | 2490 linii | 126KB*
