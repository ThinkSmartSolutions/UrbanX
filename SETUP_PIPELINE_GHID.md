# Ghid Complet — Setup Pipeline Date Spațiale
## Timp estimat: 20-30 minute

---

## PASUL 1 — Supabase: găsește credențialele

1. Deschide **https://supabase.com** și loghează-te
   *(dacă nu ai cont: Sign Up gratuit — nu trebuie card)*

2. Click pe **proiectul tău UrbanX**
   *(sau creează unul nou: "New Project" → nume: `urbanx-spatial` → generează parolă → Create)*

3. În meniul din stânga → **Settings** (rotița ⚙️)

4. Click pe **API** din submeniu

5. Notează:
   - **Project URL** → ex: `https://abcdefghij.supabase.co`
   - **anon / public** key → șir lung care începe cu `eyJ...` (pentru TCI frontend)
   - **service_role** key → alt șir `eyJ...` (pentru pipeline Python — PRIVAT)

---

## PASUL 2 — Supabase: creează tabela

1. În Supabase, click stânga → **SQL Editor** (iconița cu `<>`)

2. Click **"New query"**

3. Copiază și paste **TOT** textul de mai jos:

```sql
-- Tabela principală LMI România
CREATE TABLE IF NOT EXISTS lmi_romania (
  id          BIGSERIAL PRIMARY KEY,
  source      TEXT NOT NULL,
  layer       TEXT NOT NULL,
  cod_lmi     TEXT,
  wikidata_id TEXT,
  osm_id      TEXT,
  denumire    TEXT,
  categorie   TEXT,
  localitate  TEXT,
  judet       TEXT,
  lon         DOUBLE PRECISION NOT NULL,
  lat         DOUBLE PRECISION NOT NULL,
  buffer_m    INTEGER DEFAULT 50,
  geom_type   TEXT,
  geom_json   TEXT,
  historic    TEXT,
  heritage    TEXT,
  landuse     TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index rapid pentru query bbox
CREATE INDEX IF NOT EXISTS lmi_lon_lat ON lmi_romania (lon, lat);
CREATE INDEX IF NOT EXISTS lmi_source  ON lmi_romania (source);

-- Permite citire publică (pentru TCI frontend)
ALTER TABLE lmi_romania ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read" ON lmi_romania;
CREATE POLICY "public read" ON lmi_romania
  FOR SELECT USING (true);
```

4. Click **"Run"** (sau Ctrl+Enter)

5. Ar trebui să apară: `Success. No rows returned`

6. **Verificare:** click stânga → **Table Editor** → ar trebui să apară tabela `lmi_romania`

---

## PASUL 3 — GitHub: adaugă secretele

1. Deschide **https://github.com/ThinkSmartSolutions/UrbanX**

2. Click **Settings** (tab sus, nu meniu stânga)

3. Meniu stânga → **Secrets and variables** → **Actions**

4. Click **"New repository secret"** — adaugă PRIMUL secret:
   - **Name:** `SUPABASE_URL`
   - **Secret:** `https://abcdefghij.supabase.co` (URL-ul tău din Pasul 1)
   - Click **"Add secret"**

5. Click din nou **"New repository secret"** — al DOILEA secret:
   - **Name:** `SUPABASE_SERVICE_KEY`
   - **Secret:** cheia `service_role` din Pasul 1 (cea PRIVATĂ, nu anon)
   - Click **"Add secret"**

6. Ar trebui să vezi acum 2 secrete listate: `SUPABASE_URL` și `SUPABASE_SERVICE_KEY`

---

## PASUL 4 — TCI: adaugă cheia publică Supabase

Aceasta permite TCI să citească din Supabase (cheia `anon`, nu secretă):

1. Deschide `index.html` din repo

2. Găsește linia care conține `17-tci-cinema.js` la sfârșit

3. Adaugă **înainte** de ea:
```html
<script>
  window.SUPABASE_URL      = 'https://abcdefghij.supabase.co';
  window.SUPABASE_ANON_KEY = 'eyJ...cheia_ta_anon...';
</script>
```

4. Commit și push

---

## PASUL 5 — Rulare manuală (primul test)

1. Deschide **https://github.com/ThinkSmartSolutions/UrbanX/actions**

2. Click pe **"Romania Spatial Data Pipeline"** în lista din stânga

3. Click butonul **"Run workflow"** (dreapta sus, buton verde)

4. Confirmă cu **"Run workflow"**

5. Apare un run nou cu cercul galben ⏳ → așteptă 3-5 minute

---

## PASUL 6 — Verificare că a mers

### Verificare A — GitHub Actions
- Cercul devine **verde** ✅ → succes
- Cercul devine **roșu** ❌ → click pe el → vezi exact ce linie a eșuat

### Verificare B — Supabase
1. Supabase → **Table Editor** → `lmi_romania`
2. Ar trebui să apară **sute sau mii de rânduri**
3. Filtrează după `source = 'CIMEC'` → dacă e gol, CIMEC era indisponibil (normal uneori)
4. Filtrează după `source = 'OSM'` → ar trebui să aibă cel puțin câteva sute

### Verificare C — TCI
1. Deschide **https://thinksmartsolutions.github.io/UrbanX/** → lansează TCI
2. Jos în panoul stâng, secțiunea **STATUS SURSE DATE** arată:
   - `✅ LMI Supabase: 4.832 monumente` → totul funcționează
   - `⬜ LMI Supabase: neconfigurat` → Pasul 4 lipsește
   - `❌ LMI Supabase: eroare` → verifică URL-ul și cheia

### Verificare D — Consolă browser (F12)
Caută în consolă:
```
[LMI] ✅ Supabase: 847 monumente    ← funcționează
[CONSTRAINT] ✅ 23 excluderi        ← constrângerile sunt active
```

---

## DACĂ CEVA NU MERGE

### Eroare: "relation does not exist"
→ Pasul 2 nu a rulat. Repetă SQL Editor.

### Eroare: "Invalid API key"
→ Ai folosit cheia greșită. Service_role pentru pipeline, anon pentru TCI.

### Pipeline verde dar 0 records în Supabase
→ CIMEC și OSM au timeout. Rulează din nou manual mâine.

### TCI arată "neconfigurat"
→ Pasul 4 lipsește sau index.html nu a fost pushat.

---

## DUPĂ SETUP — ce se întâmplă automat

```
În fiecare duminică 02:00:
  GitHub Action rulează pipeline
  → CIMEC + OSM + Wikidata → Supabase
  → dacă eșuează → Issue creat automat în repo
  → artifact (JSON export) salvat 30 zile

TCI la fiecare lansare:
  → queryLMI() → Supabase bbox query
  → monumente excluse din proiecție
  → STATUS widget confirmă că datele sunt fresh
```

