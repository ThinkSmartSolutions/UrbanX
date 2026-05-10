# UrbanX — Ghid complet onboarding UAT nou
**Versiune:** 1.0 · Mai 2026 · Citește integral înainte să începi

---

## Cum funcționează sistemul (2 minute)

Când schimbi UAT-ul în aplicație, sistemul face 3 lucruri în ordine:

1. **Citește `UAT_REGISTRY`** din `06-aedis.js` → ia configurarea specifică (seism, aeroport, LMI etc.)
2. **Încarcă 3 fișiere** de pe server: `pug.geojson` + `cadastru_index.json` + `reguli.json`
3. **Populează automat** harta, indicatorii PUG, și toate rapoartele/studiile generate

Dacă fișierele lipsesc → `status:'empty'` → studiile funcționează cu datele din registry, harta PUG e goală.

---

## Structura de foldere pe server

```
/UrbanX/
├── index.html
├── js/
│   └── ... (module JS)
│
└── data/                              ← TOATE datele UAT-urilor
    ├── municipiul-iasi/               ← REFERINȚĂ — complet, funcțional
    │   ├── pug.geojson                ← Zonele UTR georeferențiate
    │   ├── cadastru_index.json        ← Index parcele pentru căutare
    │   └── reguli.json                ← Regulamentul PUG local
    │
    ├── municipiul-bacau/              ← De completat
    │   ├── pug.geojson
    │   ├── cadastru_index.json
    │   └── reguli.json
    │
    ├── municipiul-cluj-napoca/
    │   └── ...
    │
    └── [fiecare UAT din registry]/
```

**Regulă:** numele folderului = cheia din `UAT_REGISTRY` din `06-aedis.js`.
Exemplu: `'municipiul-bacau'` → folder `/data/municipiul-bacau/`.

---

## Fișierul 1: `pug.geojson`

### Ce este
GeoJSON cu poligoanele zonelor UTR din PUG-ul localității.
Fiecare feature = o zonă reglementată (ex: o suprafață LL, CM, AI2A etc.)

### Format exact

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng, lat], [lng, lat], ...]]
      },
      "properties": {
        "utr": "LL",
        "NR_CAD": "optional — dacă e disponibil"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[lng, lat], ...]]]
      },
      "properties": {
        "utr": "CM"
      }
    }
  ]
}
```

### Câmpul CRITIC: `properties.utr`
- **Obligatoriu** — fără el zona nu se colorează și nu se identifică UTR-ul
- Valoarea trebuie să existe în `REGULI` din `00-globals.js` SAU în `reguli.json` local
- Majuscule: `"LL"` nu `"ll"` — sistemul normalizează intern dar e mai sigur cu majuscule
- Valori invalide (`"?"`, `""`, `null`) sunt ignorate automat

### Cum obții fișierul

**Sursa 1 — Primărie (cel mai precis)**
Primăria are PUG în format digital. Cere fișierele SHP (Shapefile) sau GeoJSON direct de la Compartimentul Urbanism. Baza legală: Legea 52/2003 (transparență) + HG 525/1996. Durata: 2-30 zile.

**Sursa 2 — QGIS din PDF/DWG scanat**
1. Deschizi planșa PUG în QGIS (sau importi DWG dacă e disponibil)
2. Digitalizezi manual poligoanele per UTR
3. Export → GeoJSON (CRS: WGS84 = EPSG:4326)

**Sursa 3 — Geoportal ANCPI / INSPIRE**
- `geoportal.ancpi.ro` → Descarcă straturi de date
- `inspire.gov.ro` → Date urbanistice vectoriale
- Atenție: nu toate UAT-urile au date complete

**Sursa 4 — OpenStreetMap Overpass (approximativ)**
```
// Query pentru zone rezidențiale dintr-un oraș
[out:json];
area["name"="Bacău"]["admin_level"="8"]->.a;
(
  way["landuse"](area.a);
  relation["landuse"](area.a);
);
out geom;
```
Limitare: OSM nu are UTR-uri PUG — poți obține zone de utilizare generice dar nu reglementările exacte.

### Validare înainte de upload
```python
# Script Python rapid de verificare
import json

with open('pug.geojson') as f:
    data = json.load(f)

features = data.get('features', [])
print(f"Total zone: {len(features)}")

utrs = {}
fara_utr = 0
for f in features:
    utr = f.get('properties', {}).get('utr', '')
    if not utr or utr in ['?', '??']:
        fara_utr += 1
    else:
        utrs[utr] = utrs.get(utr, 0) + 1

print(f"Fără UTR: {fara_utr}")
print(f"UTR-uri găsite ({len(utrs)}):")
for utr, count in sorted(utrs.items()):
    print(f"  {utr}: {count} zone")
```

### Dimensiune tipică
- Oraș mic (50k loc): 200-500 features, ~2-5 MB
- Municipiu (200k loc): 500-2000 features, ~5-20 MB
- București: 2000+ features, 30-50 MB

**Dacă fișierul e prea mare (>15MB):** Simplifică geometriile în QGIS:
`Vector → Geometry Tools → Simplify` cu toleranță 0.0001 grade

---

## Fișierul 2: `cadastru_index.json`

### Ce este
Index de căutare rapidă: număr cadastral → coordonate centroid parcelă.
Permite aplicației să localizeze instant o parcelă după numărul cadastral introdus.

### Format exact

```json
{
  "173583": [27.59045, 47.19442],
  "173584": [27.58932, 47.19510],
  "173585": [27.59128, 47.19388],
  "100001": [26.91234, 46.56789]
}
```

**Regulă strictă:**
- Cheia = numărul cadastral ca **string** (nu număr)
- Valoarea = array `[longitudine, latitudine]` în WGS84
- Ordinea: **LNG primul, LAT al doilea** (convenție GeoJSON)

### Cum obții fișierul

**Sursa 1 — API ANCPI (recomandat pentru precizie)**
ANCPI expune date prin `geoportal.ancpi.ro`. Există endpoint-uri pentru interogare după UAT.
Poți extrage centroizii tuturor parcelelor dintr-un UAT și construi indexul.

**Sursa 2 — Script din Shapefile ANCPI**
Dacă ai shapefilele ANCPI pentru UAT:
```python
import geopandas as gpd
import json

# Citește shapefile parcele
parcele = gpd.read_file('parcele_bacau.shp')
parcele = parcele.to_crs('EPSG:4326')  # Convertim la WGS84

# Construim indexul
index = {}
for _, row in parcele.iterrows():
    nrcad = str(row.get('NR_CAD', row.get('nrcad', '')))
    if nrcad and nrcad != 'nan':
        centroid = row.geometry.centroid
        index[nrcad] = [round(centroid.x, 6), round(centroid.y, 6)]

with open('cadastru_index.json', 'w') as f:
    json.dump(index, f, ensure_ascii=False)

print(f"Index generat: {len(index)} parcele")
```

**Sursa 3 — Index parțial (minim viabil)**
Chiar și un index parțial (câteva mii de parcele) e util.
Căutarea funcționează pentru parcelele indexate; pentru cele neindexate, sistemul folosește API-ul ANCPI online.

### Dimensiune tipică
- 10.000 parcele → ~500KB
- 100.000 parcele → ~5MB
- Format text JSON → se comprimă bine cu gzip pe server

---

## Fișierul 3: `reguli.json`

### Ce este
Regulamentul local de urbanism al UAT-ului — POT, CUT, H, aliniamente per UTR.
**Suprascrie** valorile generice din `REGULI` (00-globals.js) pentru UTR-urile locale.

### Format exact — aceeași structură ca `REGULI` din globals

```json
{
  "LL": {
    "d": "Locuințe individuale — Bacău",
    "pot": 40,
    "cut": 1.2,
    "niv": 2,
    "h": 10,
    "rf": 5,
    "rl": 3,
    "rs": 5,
    "sv": 25,
    "pk": 2,
    "ao": "NU",
    "fm": null,
    "ua": "Locuire individuală și funcțiuni complementare",
    "uc": "Comerț mic, servicii",
    "ui": "Industrie, activități poluante"
  },
  "CM": {
    "d": "Zonă mixtă centrală — Bacău",
    "pot": 65,
    "cut": 3.5,
    "niv": 7,
    "h": 28,
    "rf": 0,
    "rl": 3,
    "rs": 3,
    "sv": 15,
    "pk": 3,
    "ao": "DA",
    "fm": 20,
    "ua": "Comerț, birouri, servicii, locuire colectivă",
    "uc": "Activități culturale, educative",
    "ui": "Industrie, activități poluante"
  }
}
```

### Explicația câmpurilor

| Câmp | Tip | Descriere |
|------|-----|-----------|
| `d` | string | Descriere UTR pentru afișare |
| `pot` | number | POT maxim admis (%) |
| `cut` | number | CUT maxim admis |
| `niv` | number | Număr maxim niveluri |
| `h` | number | Înălțime maximă (m) |
| `rf` | number | Retragere față stradă (m) |
| `rl` | number | Retragere lateral (m) |
| `rs` | number | Retragere spate (m) |
| `sv` | number | Spații verzi minime (%) |
| `pk` | number | Locuri parcare/unitate |
| `ao` | string | Aliniere obligatorie: `"DA"` sau `"NU"` |
| `fm` | number\|null | Front minim stradal (m) sau `null` |
| `ua` | string | Utilizări admise |
| `uc` | string | Utilizări condiționate |
| `ui` | string | Utilizări interzise |

### Câmpuri opționale suplimentare

```json
{
  "LL": {
    "...câmpuri de bază...",
    "obs": "Notă specială PUG local",
    "hmax_abs": "12m față de teren amenajat",
    "regula_specifica": "Conform RLU art. 23 alin. 4"
  }
}
```

### Cum obții valorile
1. **Regulamentul Local de Urbanism (RLU)** — documentul oficial al Primăriei, disponibil pe site sau la cerere. Conține tabelul cu toți indicatorii per UTR.
2. **Certificat de Urbanism** emis recent pentru zona respectivă — indică indicatorii aplicabili.
3. **Arhitectul local** care lucrează cu acel PUG cunoaște valorile din memorie.

### Câte UTR-uri include
Incluzi NUMAI UTR-urile unde valorile locale diferă de cele din `REGULI` generic.
Nu trebuie să incluzi toate — merge-ul e cumulativ. Dacă `LL` din `reguli.json` există, îl suprascrie pe cel generic.

---

## Fișierul 4 (opțional): `.pmtiles` — Cadastru vectorial

### Ce este și când îl folosești
Fișier PMTiles = toate parcelele UAT-ului ca straturi vectoriale tile-uri.
Permite click pe orice parcelă din hartă → sistem identifică automat nrcad + date ANCPI.

**Când merită efortul:**
- UAT mare cu >50.000 parcele
- Vrei click direct pe hartă fără să tastezi nrcad
- Ai acces la datele vectoriale ANCPI pentru acel UAT

### Cum generezi fișierul PMTiles
```bash
# 1. Instalezi tippecanoe
brew install tippecanoe  # macOS
# sau: apt install tippecanoe  # Ubuntu

# 2. Convertești shapefile ANCPI la GeoJSON
ogr2ogr -f GeoJSON -t_srs EPSG:4326 parcele.geojson parcele_ancpi.shp

# 3. Generezi PMTiles
tippecanoe \
  -o parcele_bacau.pmtiles \
  -l parcele \
  -z16 -Z10 \
  --drop-densest-as-needed \
  parcele.geojson

# 4. Uploadezi pe server și setezi URL în UAT_REGISTRY:
# pmtilesFile: './data/municipiul-bacau/parcele_bacau.pmtiles'
```

### Adaugi în UAT_REGISTRY
```javascript
'municipiul-bacau': {
  // ... configurare existentă ...
  pmtilesFile: './data/municipiul-bacau/parcele_bacau.pmtiles',
}
```

Și în `06-aedis.js`, în `switchUAT()`, după încărcarea datelor:
```javascript
if(cfg.pmtilesFile) cadastruInitPMTiles(cfg.pmtilesFile);
```

---

## Ordinea operațiilor — un UAT de la zero

### ETAPA 0 — Pregătire (o dată, nu per UAT)
Verifici că structura de foldere există pe server:
```
/UrbanX/data/  ← trebuie să existe și să fie accesibil HTTP
```

### ETAPA 1 — Colectare date (1-5 zile)

**Pasul 1.1** — Contactezi Primăria pentru PUG digital
- Email la compartimentul urbanism: „Solicit fișierele GIS ale PUG în vigoare (shapefile/GeoJSON) conform Legii 52/2003"
- Dacă refuză sau durează: mergi la Etapa 1 sursă alternativă

**Pasul 1.2** — Descarci/primești fișierele
- SHP, DWG, sau GeoJSON cu zonele UTR
- RLU (Regulament Local de Urbanism) — document PDF cu toți indicatorii

**Pasul 1.3** — Procesezi datele în QGIS
```
QGIS → Deschide fișier SHP/DWG
     → Verifici că există câmpul UTR (poate fi "utr", "UTR", "Simbol", "Zone")
     → Redenumești câmpul la "utr" dacă e necesar
     → Export → GeoJSON → CRS: EPSG:4326 (WGS84)
     → Salvezi ca: pug.geojson
```

### ETAPA 2 — Generare fișiere (2-4 ore per UAT)

**Pasul 2.1** — Creezi folderul
```bash
mkdir -p /UrbanX/data/municipiul-bacau
```

**Pasul 2.2** — Copiezi și validezi `pug.geojson`
```bash
cp pug_bacau_procesat.geojson /UrbanX/data/municipiul-bacau/pug.geojson

# Validare rapidă (opțional, dacă ai Python):
python3 -c "
import json
with open('/UrbanX/data/municipiul-bacau/pug.geojson') as f:
    d = json.load(f)
utrs = set(f['properties'].get('utr','') for f in d['features'])
print(f'OK: {len(d[\"features\"])} zone, UTR-uri: {sorted(utrs)}')
"
```

**Pasul 2.3** — Generezi `cadastru_index.json`
Folosești scriptul Python de mai sus sau construiești manual pentru un subset.
```bash
cp cadastru_index_bacau.json /UrbanX/data/municipiul-bacau/cadastru_index.json
```

**Pasul 2.4** — Creezi `reguli.json`
Deschizi RLU-ul Primăriei și transcrii valorile per UTR.
```bash
nano /UrbanX/data/municipiul-bacau/reguli.json
# introduci JSON-ul cu indicatorii
```

### ETAPA 3 — Completezi `UAT_REGISTRY` (30 min)

Deschizi `js/06-aedis.js` și găsești intrarea pentru UAT-ul respectiv.
Schimbi `status:'empty'` → `status:'complet'` (sau `'pug_only'` dacă ai doar PUG fără cadastru).

Verifici și completezi câmpurile lipsă sau `~2` (parțiale) dacă le-ai găsit:

```javascript
'municipiul-bacau': {
  label:'Municipiul Bacău', short:'Bacău',
  judet:'Bacău', judetCode:'BC', siruta:'21562',
  center:[26.9130,46.5670], zoom:13,
  pugFile:'./data/municipiul-bacau/pug.geojson',
  cadastruIndex:'./data/municipiul-bacau/cadastru_index.json',
  reguliFile:'./data/municipiul-bacau/reguli.json',
  status:'complet',           // ← SCHIMBI ASTA
  // ... restul câmpurilor rămân neschimbate
  mediu:{
    sv_minim_procent:20,
    // adaugi câmpuri specifice dacă le-ai găsit:
    parc_cel_mai_apropiat:'Parcul Cancicov',
    natura2000_proximitate:['ROSCI0258 Valea Trotușului — 8km'],
    // etc.
  },
}
```

### ETAPA 4 — Upload și test (30 min)

**Pasul 4.1** — Upload fișiere pe server
```bash
# Dacă folosești FTP/SFTP:
scp -r /UrbanX/data/municipiul-bacau/ user@server:/var/www/UrbanX/data/

# Dacă folosești panel hosting (cPanel, Plesk):
# Uploadezi folderul prin File Manager

# Dacă folosești GitHub Pages / Netlify:
git add data/municipiul-bacau/
git commit -m "Add Bacau UAT data"
git push
```

**Pasul 4.2** — Upload `js/06-aedis.js` actualizat (cu `status:'complet'`)

**Pasul 4.3** — Test în browser
```
1. Deschizi UrbanX
2. Click pe "📍 Iași" din topbar → apare selectorul UAT
3. Selectezi "Municipiul Bacău"
4. Verifici că harta zoomează pe Bacău
5. Click pe butonul UTR → verifici că apar zonele colorate
6. Tastezi un nrcad cunoscut din Bacău → verifici că localizează
7. Generezi un Raport Urbanistic → verifici că apare "Bacău" în header
8. Generezi Studiu AACR → verifici că folosește datele aeroportului Bacău
```

---

## Statusuri și ce înseamnă fiecare

| Status | Ce funcționează | Ce lipsește |
|--------|----------------|-------------|
| `complet` | Tot: PUG pe hartă, căutare cadastrală, rapoarte complete | — |
| `pug_only` | Harta PUG, UTR-uri, rapoarte cu indicatori | Căutare după nrcad |
| `partial` | Unele funcționalități, date incomplete | Verifici câmp cu câmp |
| `empty` | Studii și rapoarte (seism, vânt, LMI etc.) | PUG pe hartă, căutare cadastrală |

Schimbi statusul manual în `06-aedis.js` după ce uploadezi fișierele.

---

## Adăugare UAT complet nou (nu există în registry)

Dacă vrei să adaugi un UAT care nu există deloc în `UAT_REGISTRY`:

### 1. Adaugi în grupul de regiuni din `showUATSelector()`

```javascript
const REGIUNI = {
  // ...
  'Sud — Prahova':  ['municipiul-ploiesti'],  // adaugi grupul
  // ...
};
```

### 2. Adaugi intrarea în `UAT_REGISTRY`

Copiezi template-ul de mai jos și completezi cu datele UAT-ului:

```javascript
'municipiul-ploiesti': {
  label:'Municipiul Ploiești', short:'Ploiești',
  judet:'Prahova', judetCode:'PH', siruta:'119316',
  center:[26.0226, 44.9454], zoom:13,
  pugFile:'./data/municipiul-ploiesti/pug.geojson',
  cadastruIndex:'./data/municipiul-ploiesti/cadastru_index.json',
  reguliFile:'./data/municipiul-ploiesti/reguli.json',
  status:'empty',
  primar:'Primăria Municipiului Ploiești',
  daU:'Direcția Generală de Urbanism și Valorificare Patrimoniu',
  djcpn:'DJCPN Prahova', djcpnEmail:'djcpn.prahova@cultura.ro',
  cjPut:'CJ Prahova',
  aeroport: null,  // sau configurezi dacă are
  seism:{
    zona:'F', ag:0.35, Tc:1.6, MSK:'VIII-IX',
    norm:'P100-1/2013',
    descriere:'Zona seismică F — Câmpia Română, intensitate ridicată. ag=0.35g.',
    recomandare:'Fundare specială obligatorie. Calcul seismic riguros pentru orice clădire.',
  },
  hidro:{
    nfa:'0.5-2.0m', tip_sol:'Nisipuri, pietrișuri aluvionare',
    portanta:'160-240 kPa',
    risc_inundabil:'Mediu (bazinul Prahova)',
    adancime_fundare:'min. 1.0m',
    clasa_geotehnica:'2-3',
    studiu_obligatoriu:'Da — obligatoriu',
  },
  lmi:{
    cimecRadius:1000,
    zone_protejate:[
      {cod:'PH-II-s-B-16001', tip:'Zonă construită protejată',
       centru:[26.0226,44.9454], raza:600,
       desc:'Centrul istoric Ploiești', aviz:'DJCPN Prahova'},
    ],
    monumente_reprezentative:[
      {cod:'PH-II-m-A-16001', denumire:'Ceasul de Apă Ploiești',
       categorie:'A', adresa:'Piața Victoriei 1'},
    ],
    reglementare:'Legea 422/2001',
  },
  zgomot:{
    zona_acustica:'II', Lzsn_limita:60, Lnoapte_limita:50,
    surse_principale:['Trafic rutier DN1A','Rafinărie Petrobrazi (7km)'],
    norm:'SR 10009:2017',
  },
  vant:{
    zona:'III', v_ref:30, presiune_vant:0.55,
    directie_dominanta:'NV (Câmpia Română)',
    norm:'CR 1-1-4/2012', factor_teren:'II',
  },
  trafic:{
    viteza_proiectare:50, TMA_ref:15000,
    norm_parcaje:'NP 051/2012 rev.',
    acces_transport_public:true,
  },
  mediu:{
    sv_minim_procent:20,
    norm:'Legea 24/2007',
    natura2000_proximitate:['ROSPA0101 Dealurile Agighiolului — 45km'],
  },
},
```

### 3. Creezi folderul și fișierele (Etapa 2 de mai sus)

### 4. Schimbi `status:'empty'` → `status:'complet'` după ce uploadezi fișierele

---

## Unde găsești datele specifice per câmp

| Câmp | Sursa |
|------|-------|
| `seism.zona`, `ag`, `Tc` | Harta de zonare seismică P100-1/2013 Anexa A |
| `hidro.nfa`, `tip_sol` | Studii geotehnice locale, INMH, hărți ANCPI |
| `lmi` monumente, zone | [map.cimec.ro](https://map.cimec.ro) + LMI actualizată MCID |
| `zgomot.Lzsn_limita` | SR 10009:2017 Tabel 1 (funcție de tip zonă acustică) |
| `vant.zona`, `v_ref` | CR 1-1-4/2012 Harta vântului, Anexa B |
| `aeroport.*` | AIP Romania (Aeronautical Information Publication) |
| `trafic.TMA_ref` | Studii de trafic locale, CESTRIN |
| `mediu.natura2000` | [natura2000.eea.europa.eu](https://natura2000.eea.europa.eu) |

---

## Checklist final înainte de lansare UAT nou

```
□ Folder /data/municipiul-X/ creat pe server
□ pug.geojson uploadat și validat (are câmpul "utr" în properties)
□ cadastru_index.json uploadat (format {"nrcad": [lng, lat]})
□ reguli.json uploadat (are cel puțin 5 UTR-uri locale)
□ UAT_REGISTRY actualizat cu status:'complet'
□ js/06-aedis.js uploadat pe server
□ Test: schimb UAT în aplicație → harta zoomează corect
□ Test: buton UTR → apar zonele colorate pe hartă
□ Test: căutare nrcad → localizează parcela
□ Test: generez Raport Urbanistic → UAT corect în header
□ Test: generez Studiu Geotehnic → date seism locale corecte
□ Test: generez Studiu AACR → dacă are aeroport, calculul e corect
```

---

*UrbanX TSS·FG · Ghid onboarding UAT v1.0 · Mai 2026*
*Actualizat de fiecare dată când adaugi un UAT nou*
