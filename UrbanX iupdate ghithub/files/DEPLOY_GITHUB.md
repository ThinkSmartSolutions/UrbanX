# UrbanX — Structura completă GitHub + Deploy
**Ghid definitiv · Mai 2026 · Citește de la cap la coadă o singură dată**

---

## Structura completă a repository-ului

```
urbanx/                                   ← rădăcina repo GitHub
│
├── .github/
│   └── workflows/
│       └── deploy.yml                    ← GitHub Actions (auto-deploy pe push)
│
├── index.html                            ← aplicația principală (1.270 linii)
├── .nojekyll                             ← obligatoriu pentru GitHub Pages
├── site.webmanifest                      ← PWA manifest
│
├── favicon.ico                           ← favicon standard
├── favicon.svg                           ← favicon SVG
├── favicon-96x96.png
├── favicon-48x48.png
├── favicon-32x32.png
├── favicon-16x16.png
├── apple-touch-icon.png                  ← icon iOS
├── android-chrome-192x192.png
├── android-chrome-512x512.png
│
├── js/                                   ← module JavaScript (ordine fixă)
│   ├── 00-globals.js                     ← STATE, constante, auth — PRIMUL
│   ├── 02-map-core.js                    ← Mapbox, layere, volume
│   ├── 03-ui-panel.js                    ← Panel, tab-uri, HTML UI
│   ├── 04-search.js                      ← Căutare cadastru, adresă, GPS
│   ├── 05-cad-utils.js                   ← UTR helpers, parcele din zonă
│   ├── 06-aedis.js                       ← Urban3D, UAT_REGISTRY, FAL.AI
│   ├── 07-pdf-utils.js                   ← PDF logo, capturi, bilanț
│   ├── 08-lotizare.js                    ← Generator lotizare, export
│   ├── 09-pdf-engine.js                  ← Design system PDF
│   ├── 10-studies.js                     ← Studii și rapoarte PDF
│   ├── 11-viewer3d.js                    ← Viewer Urban3D full-screen
│   ├── 12-admin.js                       ← Admin panel, utilizatori
│   └── 13-info-drawer.js                 ← RAPORT_INFO, info drawer
│
├── data/                                 ← date GIS per UAT
│   ├── municipiul-iasi/                  ← REFERINȚĂ — complet
│   │   ├── pug.geojson                   ← zone UTR georeferențiate
│   │   ├── cadastru_index.json           ← {"nrcad": [lng, lat]}
│   │   └── reguli.json                   ← indicatori PUG locali
│   │
│   ├── municipiul-bacau/                 ← de completat
│   │   ├── pug.geojson
│   │   ├── cadastru_index.json
│   │   └── reguli.json
│   │
│   ├── municipiul-cluj-napoca/
│   ├── municipiul-timisoara/
│   ├── municipiul-brasov/
│   ├── municipiul-suceava/
│   ├── municipiul-piatra-neamt/
│   ├── municipiul-roman/
│   ├── municipiul-vaslui/
│   ├── municipiul-barlad/
│   ├── municipiul-botosani/
│   ├── municipiul-focsani/
│   ├── municipiul-galati/
│   ├── municipiul-constanta/
│   ├── municipiul-bucuresti/
│   ├── municipiul-craiova/
│   ├── oras-dorohoi/
│   ├── oras-targu-neamt/
│   ├── municipiul-falticeni/
│   ├── municipiul-radauti/
│   ├── municipiul-onesti/
│   ├── municipiul-moinesti/
│   ├── municipiul-husi/
│   ├── municipiul-tecuci/
│   └── municipiul-galati/
│
├── zone/                                 ← parcele vectoriale în tile-uri 0.05°
│   ├── zona_552_943.geojson              ← Iași centru (tile calculat automat)
│   ├── zona_553_943.geojson              ← Iași est
│   ├── zona_552_944.geojson              ← Iași nord
│   ├── zona_538_931.geojson              ← Bacău (când e disponibil)
│   └── zona_NNN_NNN.geojson             ← alte orașe, pe măsură ce le adaugi
│
└── scripts/                              ← unelte locale (NU urcate în deploy)
    ├── gen_cadastru_index.py             ← generează cadastru_index.json
    └── validate_uat_data.py              ← validează datele înainte de upload
```

---

## Ce este fiecare fișier și de unde vine

### Fișierele aplicației (sunt deja gata)

| Fișier | Dimensiune | Proveniență |
|--------|-----------|-------------|
| `index.html` | 92KB | Livrat — nu modifica direct |
| `js/*.js` (13 fișiere) | ~1MB total | Livrate — editezi doar `06-aedis.js` pentru UAT-uri |
| `favicon*`, `apple-touch-icon*` | mici | De la echipa de design sau generezi pe [realfavicongenerator.net](https://realfavicongenerator.net) |
| `site.webmanifest` | 1KB | Creat mai jos, o singură dată |
| `.nojekyll` | 0 bytes | Creat mai jos, obligatoriu |
| `deploy.yml` | 1KB | Creat mai jos, auto-deploy |

### Fișierele de date (le adaugi pe măsură ce lucrezi)

| Fișier | Dimensiune tipică | Cine îl face |
|--------|------------------|--------------|
| `data/{uat}/pug.geojson` | 2–20MB | QGIS din SHP Primărie |
| `data/{uat}/cadastru_index.json` | 0.5–5MB | Script Python livrat |
| `data/{uat}/reguli.json` | 5–20KB | Tu, din RLU Primărie |
| `zone/zona_NNN_NNN.geojson` | 1–5MB per tile | Script Python livrat |

---

## Pasul 1 — Creezi repository-ul GitHub

```bash
# 1. Mergi pe github.com → New repository
# Nume: urbanx  (sau tss-fg/urbanx dacă ești în organizație)
# Vizibilitate: Private (recomandat) sau Public
# NU bifa "Initialize with README"

# 2. Clonezi local
git clone https://github.com/CONTUL_TAU/urbanx.git
cd urbanx
```

---

## Pasul 2 — Prima structură (10 minute)

Copiezi fișierele livrate în folderul clonat:

```bash
# Din arhiva livrată, copiezi:
cp /livrat/index.html          ./index.html
cp -r /livrat/js/              ./js/
cp -r /livrat/scripts/         ./scripts/

# Creezi fișierele obligatorii:
touch .nojekyll                # fișier gol — dezactivează procesarea Jekyll

# Creezi site.webmanifest:
cat > site.webmanifest << 'EOF'
{
  "name": "UrbanX",
  "short_name": "UrbanX",
  "start_url": "/urbanx/",
  "display": "standalone",
  "theme_color": "#0b0f1a",
  "background_color": "#0b0f1a",
  "icons": [
    {"src": "android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"}
  ]
}
EOF

# Creezi folderele goale (git nu trackuiește foldere goale)
mkdir -p data/municipiul-iasi
mkdir -p data/municipiul-bacau
mkdir -p zone

# Adaugi .gitkeep pentru folderele goale
touch data/municipiul-bacau/.gitkeep
touch zone/.gitkeep
```

---

## Pasul 3 — GitHub Pages (5 minute)

### 3a. Activezi Pages

```
GitHub → repo → Settings → Pages
→ Source: "Deploy from a branch"
→ Branch: main
→ Folder: / (root)
→ Save
```

URL-ul va fi: `https://CONTUL_TAU.github.io/urbanx/`

### 3b. Actualizezi path-urile în `index.html`

Dacă repo-ul se numește `urbanx`, favicon-urile sunt deja setate pe `/UrbanX/` — potrivit.
Dacă ai alt nume de repo, schimbi în `index.html` liniile 12-19:

```html
<!-- Schimbi /UrbanX/ cu /NUMELE_REPO/ -->
<link rel="icon" href="/NUMELE_REPO/favicon.ico" sizes="any">
...
<link rel="manifest" href="/NUMELE_REPO/site.webmanifest" crossorigin="use-credentials">
```

Și în `site.webmanifest`, `start_url`:
```json
"start_url": "/NUMELE_REPO/"
```

### 3c. Actualizezi `start_url` în `js/00-globals.js`

Caută linia cu manifestul inline (~linia 36) și schimbi:
```javascript
start_url: '/UrbanX/'   →   start_url: '/NUMELE_REPO/'
```

---

## Pasul 4 — Auto-deploy cu GitHub Actions

Creezi fișierul `.github/workflows/deploy.yml`:

```yaml
name: Deploy UrbanX to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Efect:** Orice `git push` → site actualizat în 2-3 minute automat.

Dacă folosești Actions, schimbi Settings → Pages → Source la `GitHub Actions` (nu `branch`).

---

## Pasul 5 — Primul push

```bash
# Adaugi tot
git add .
git commit -m "Initial UrbanX setup — aplicatie + module JS"
git push origin main

# Verifici pe GitHub Actions tab că deploy-ul rulează
# Dupa 2-3 minute: https://CONTUL_TAU.github.io/urbanx/
```

---

## Pasul 6 — Adaugi datele pentru Iași (primul UAT complet)

Iașul e UAT-ul de referință. Fișierele lui trebuie uploadate primele.

```bash
# Copiezi fișierele Iași (pe care le ai deja)
cp /sursa/pug_iasi.geojson          data/municipiul-iasi/pug.geojson
cp /sursa/cadastru_index_iasi.json  data/municipiul-iasi/cadastru_index.json
cp /sursa/reguli_iasi.json          data/municipiul-iasi/reguli.json

# Validezi
python3 scripts/validate_uat_data.py data/municipiul-iasi/

# Copiezi tile-urile zone/ pentru Iași
# Calculezi tile-urile necesare:
python3 << 'EOF'
GRID = 0.05
# Boundingbox Iași: lng 27.54–27.68, lat 47.12–47.25
for lng_min in [27.54, 27.59, 27.64]:
    for lat_min in [47.12, 47.17, 47.22]:
        zx = int(lng_min / GRID)
        zy = int(lat_min / GRID)
        print(f"zona_{zx}_{zy}.geojson")
EOF
# → zona_550_942.geojson, zona_551_942.geojson, zona_552_942.geojson
# → zona_550_943.geojson, zona_551_943.geojson, zona_552_943.geojson
# → zona_550_944.geojson, zona_551_944.geojson, zona_552_944.geojson

# Copiezi tile-urile pe care le ai
cp /sursa/zona_552_943.geojson zone/
# etc pentru fiecare tile disponibil

# Push
git add data/municipiul-iasi/ zone/
git commit -m "Date GIS Iași — PUG, cadastru, zone parcele"
git push
```

---

## Pasul 7 — Workflow pentru fiecare UAT nou

Acesta e workflow-ul repetat de fiecare dată când adaugi un UAT:

### 7a. Creezi folderul și fișierele

```bash
UAT="municipiul-bacau"   # schimbi cu UAT-ul curent

mkdir -p data/$UAT

# 1. pug.geojson — din QGIS sau Primărie
cp /sursa/pug_bacau_wgs84.geojson data/$UAT/pug.geojson

# 2. cadastru_index.json — cu scriptul livrat
python3 scripts/gen_cadastru_index.py \
    /sursa/parcele_bacau.shp \
    data/$UAT/cadastru_index.json

# 3. reguli.json — completezi manual din RLU
cat > data/$UAT/reguli.json << 'EOF'
{
  "LL": {"d":"Locuinte individuale Bacau","pot":40,"cut":1.2,"niv":2,"h":10,"rf":5,"rl":3,"rs":5,"sv":25,"pk":2,"ao":"NU","fm":null,"ua":"Locuire","uc":"Comert mic","ui":"Industrie"},
  "CM": {"d":"Zona mixta Bacau","pot":65,"cut":3.5,"niv":7,"h":28,"rf":0,"rl":3,"rs":3,"sv":15,"pk":3,"ao":"DA","fm":20,"ua":"Comert, birouri, locuire","uc":"Cultural","ui":"Industrie"}
}
EOF
```

### 7b. Validezi

```bash
python3 scripts/validate_uat_data.py data/$UAT/
# Trebuie să scrie: ✅ Nicio eroare critică
```

### 7c. Schimbi status în `js/06-aedis.js`

```javascript
// Găsești intrarea UAT-ului și schimbi:
'municipiul-bacau': {
  ...
  status: 'complet',   // ← era 'empty'
  ...
}
```

### 7d. Adaugi tile-urile zone/

```bash
# Calculezi tile-urile pentru noul UAT
python3 << 'EOF'
GRID = 0.05
# Bacău: lng 26.87–26.97, lat 46.53–46.63
for lng in [26.87, 26.92, 26.97]:
    for lat in [46.53, 46.58, 46.63]:
        zx = int(lng / GRID)
        zy = int(lat / GRID)
        print(f"zone/zona_{zx}_{zy}.geojson")
EOF

# Copiezi tile-urile disponibile
cp /sursa/zona_538_930.geojson zone/
cp /sursa/zona_538_931.geojson zone/
# etc.
```

### 7e. Push și test

```bash
git add data/$UAT/ zone/ js/06-aedis.js
git commit -m "UAT Bacău: PUG + cadastru + reguli + zone parcele"
git push

# Test în browser (după 2-3 min):
# 1. Deschizi aplicația
# 2. Click pe indicator UAT → selectezi Bacău
# 3. Harta zoom-ează pe Bacău ✓
# 4. Click UTR → apar zonele colorate ✓
# 5. Tastezi un nrcad din Bacău → localizează ✓
# 6. Generezi Raport Urbanistic → "Bacău" în header ✓
# 7. Generezi Studiu Geotehnic → date seism D, ag=0.25g ✓
```

---

## Format fișierelor — referință rapidă

### `data/{uat}/pug.geojson`

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[26.91, 46.57], [26.92, 46.57], [26.92, 46.58], [26.91, 46.57]]]
      },
      "properties": {
        "utr": "LL"
      }
    }
  ]
}
```

**Câmpul obligatoriu:** `properties.utr` — valoarea trebuie să existe în `REGULI`.
**CRS obligatoriu:** WGS84 / EPSG:4326 (longitudine, latitudine).
**Tipuri de geometrie acceptate:** Polygon, MultiPolygon.

### `data/{uat}/cadastru_index.json`

```json
{
  "173583": [27.59045, 47.19442],
  "173584": [27.58932, 47.19510],
  "100001": [26.91234, 46.56789]
}
```

**Regulă strictă:** cheia = nrcad ca string, valoarea = `[longitudine, latitudine]`.
**Longitudine PRIMUL**, latitudine al doilea — convenție GeoJSON.

### `data/{uat}/reguli.json`

```json
{
  "LL": {
    "d": "Descriere UTR",
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
    "ua": "Utilizări admise",
    "uc": "Utilizări condiționate",
    "ui": "Utilizări interzise"
  }
}
```

**Câmpuri obligatorii:** `pot`, `cut`, `niv`, `h`, `rf`, `rl`, `rs`, `sv`.
Incluzi NUMAI UTR-urile locale care diferă de genericele din `00-globals.js`.

### `zone/zona_NNN_NNN.geojson`

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[27.590, 47.192], [27.591, 47.192], [27.591, 47.193], [27.590, 47.192]]]
      },
      "properties": {
        "nrcad": "173583",
        "utr": "LL",
        "NR_CAD": "173583"
      }
    }
  ]
}
```

**Câmpuri importante:** `properties.nrcad` (sau `NR_CAD`) și opțional `utr`.
**Cum se calculează numele fișierului:**
```python
GRID = 0.05
zx = int(longitudine / GRID)   # ex: int(27.59 / 0.05) = 551
zy = int(latitudine / GRID)    # ex: int(47.19 / 0.05) = 943
# → zona_551_943.geojson
```

---

## Cum generezi fișierele zone/ din Shapefile ANCPI

```python
# Script complet — salvează ca gen_zone_tiles.py
import json, os, math

GRID = 0.05

def shp_to_zone_tiles(shp_path, output_folder, nrcad_field='NR_CAD', utr_field=None):
    import geopandas as gpd
    
    print(f"Citesc: {shp_path}")
    gdf = gpd.read_file(shp_path)
    gdf = gdf.to_crs('EPSG:4326')
    
    tiles = {}   # {"zona_NNN_NNN": [features]}
    
    for _, row in gdf.iterrows():
        nrcad = str(row.get(nrcad_field, '')).strip()
        if not nrcad or nrcad == 'nan':
            continue
        
        # Calculăm centroid pentru a determina tile-ul
        try:
            centroid = row.geometry.centroid
            lng, lat = centroid.x, centroid.y
            zx = int(lng / GRID)
            zy = int(lat / GRID)
            tile_name = f"zona_{zx}_{zy}"
            
            # Convertim geometria la GeoJSON
            geom = json.loads(row.geometry.to_json())
            
            feature = {
                "type": "Feature",
                "geometry": geom,
                "properties": {
                    "nrcad": nrcad,
                    "NR_CAD": nrcad,
                }
            }
            if utr_field and utr_field in row:
                feature["properties"]["utr"] = str(row[utr_field])
            
            if tile_name not in tiles:
                tiles[tile_name] = []
            tiles[tile_name].append(feature)
        except Exception as e:
            continue
    
    os.makedirs(output_folder, exist_ok=True)
    
    for tile_name, features in tiles.items():
        path = os.path.join(output_folder, f"{tile_name}.geojson")
        with open(path, 'w') as f:
            json.dump({
                "type": "FeatureCollection",
                "features": features
            }, f)
    
    total = sum(len(v) for v in tiles.values())
    print(f"✅ {len(tiles)} tile-uri generate, {total} parcele total")
    print(f"   Tile-uri: {sorted(tiles.keys())[:5]}...")

# Folosire:
# python3 gen_zone_tiles.py
if __name__ == '__main__':
    import sys
    if len(sys.argv) < 3:
        print("Folosire: python3 gen_zone_tiles.py input.shp output_folder/ [camp_nrcad] [camp_utr]")
        sys.exit(1)
    
    shp  = sys.argv[1]
    out  = sys.argv[2]
    nrc  = sys.argv[3] if len(sys.argv) > 3 else 'NR_CAD'
    utr  = sys.argv[4] if len(sys.argv) > 4 else None
    
    shp_to_zone_tiles(shp, out, nrc, utr)
```

```bash
# Rulezi:
python3 gen_zone_tiles.py parcele_iasi.shp zone/ NR_CAD UTR

# Uploadezi tile-urile generate:
git add zone/
git commit -m "Zone parcele Iași — tile-uri vectoriale"
git push
```

---

## Credențiale — unde le setezi și ce nu urci pe GitHub

**Aceste valori sunt în `js/00-globals.js` și sunt vizibile public dacă repo-ul e public.**

| Cheie | Locație | Securitate |
|-------|---------|-----------|
| `mapboxgl.accessToken` | `js/00-globals.js` linia ~784 | Token public Mapbox — restricționează domeniile în dashboard Mapbox |
| `SUPABASE_URL` | `js/00-globals.js` linia ~791 | URL public — OK |
| `SUPABASE_KEY` | `js/00-globals.js` linia ~795 | Anon key — public by design, restricționează RLS în Supabase |
| `ADMIN_EMAILS` | `js/00-globals.js` linia ~809 | Email admin — ține repo Private dacă e sensibil |
| `FAL_AI key` | `js/03-ui-panel.js` sau `06-aedis.js` | Dacă există — repo TREBUIE să fie Private |

**Dacă repo-ul e Public:** setezi restricții de domeniu pentru Mapbox în [account.mapbox.com](https://account.mapbox.com) → Access tokens → URL restrictions.

**Alternativă securizată (pentru viitor):** muți cheile în variabile de mediu GitHub Actions și le injectezi la build. Dar pentru MVP, cum e acum funcționează.

---

## Supabase — setup baza de date (o singură dată)

Aplicația folosește Supabase doar pentru autentificare. Nu are tabele complexe.

### SQL necesar în Supabase → SQL Editor:

```sql
-- Tabelul de profile (creat automat de Supabase Auth, dar adăugăm rolul)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Trigger: creează profil automat la signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Funcție RPC pentru admin: listare utilizatori
CREATE OR REPLACE FUNCTION list_all_users()
RETURNS TABLE(id UUID, email TEXT, role TEXT, confirmed BOOLEAN, created_at TIMESTAMPTZ)
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.email, p.role,
    (u.email_confirmed_at IS NOT NULL) AS confirmed,
    p.created_at
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  ORDER BY p.created_at DESC;
END;
$$;

-- Funcție RPC pentru admin: schimbare rol
CREATE OR REPLACE FUNCTION set_user_role(target_id UUID, new_role TEXT)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.profiles SET role = new_role WHERE id = target_id;
END;
$$;
```

Rulezi SQL-ul o singură dată în Supabase → SQL Editor → Run.

---

## Checklist lansare inițială

```
□ Repository GitHub creat
□ index.html + js/ copiate în repo
□ .nojekyll creat (fișier gol)
□ site.webmanifest creat
□ favicon-urile uploadate
□ deploy.yml creat în .github/workflows/
□ GitHub Pages activat (Settings → Pages → GitHub Actions)
□ Primul push realizat
□ URL-ul funcționează: https://CONT.github.io/urbanx/
□ Aplicația se deschide și harta se afișează
□ Login funcționează (dacă Supabase e configurat)
□ date/municipiul-iasi/ uploadat
□ js/06-aedis.js: iași are status:'complet'
□ Iași funcționează: PUG, căutare, rapoarte
```

## Checklist per UAT nou

```
□ Folder data/{uat}/ creat
□ pug.geojson valid (câmpul utr prezent)
□ cadastru_index.json valid (format [lng, lat])
□ reguli.json completat din RLU
□ validate_uat_data.py trece fără erori
□ js/06-aedis.js: status schimbat la 'complet'
□ zone/ tile-urile uploadate (cel puțin centrul)
□ git push realizat
□ Test: schimb UAT → zoom corect
□ Test: UTR → zone colorate pe hartă
□ Test: nrcad → localizează
□ Test: Raport Urbanistic → UAT corect în header
□ Test: Studiu specific (AACR dacă are aeroport, geotehnic etc.)
```

---

## Ordinea recomandată de extindere

| Prioritate | UAT | Motiv |
|-----------|-----|-------|
| 1 | **Iași** | Referință — deja complet, verifici că totul merge |
| 2 | **Bacău** | Aeroport LRBC configurat + seism D (ag=0.25g) — util demo |
| 3 | **Suceava** | Aeroport configurat, zonă cu cerere |
| 4 | **Piatra-Neamț** | LMI complet configurat, tur frumos |
| 5 | **Cluj-Napoca** | Piață mare, dar PUG complex |
| 6 | **Timișoara** | Piață mare, aeroport configurat |
| 7+ | Rest | Pe măsura cererii |

---

*UrbanX TSS·FG · Ghid complet deploy v1.0 · Mai 2026*
*Actualizează versiunea și data la fiecare modificare majoră*
DOCEOF