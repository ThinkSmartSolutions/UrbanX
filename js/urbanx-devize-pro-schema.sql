-- ═══════════════════════════════════════════════════════════════════════════
-- UrbanX — DEVIZE & COST MANAGEMENT — schema Supabase (PostgreSQL)
-- Rulați O SINGURĂ DATĂ în Supabase → proiectul UrbanX → SQL Editor → Run.
-- Reutilizează proiectul Supabase deja configurat în js/00-globals.js
-- (window._supabase) — NU necesită cont/proiect nou.
--
-- Convenție: toate tabelele "deviz_*" (schema public, flat — la fel ca
-- urbanx_projects/urban_sesizari existente, fără scheme custom).
-- RLS: citire publică (anon+authenticated) pt vizibilitate GIS/dashboard
-- investiții; scriere doar pt utilizatori autentificați.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. PROIECTE DE INVESTIȚIE ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS deviz_proiecte (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nume                TEXT NOT NULL,
  uat_key             TEXT,
  sursa_finantare     TEXT DEFAULT 'buget_local',   -- buget_local|buget_stat|fonduri_ue|mixt
  status              TEXT DEFAULT 'activ',          -- activ|arhivat
  parcel_centroid     JSONB,                          -- [lon,lat] opțional, pt cardul GIS
  created_by          TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. OBIECTE (Deviz pe obiect, Anexa 8 HG907) ──────────────────────────────
CREATE TABLE IF NOT EXISTS deviz_obiecte (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proiect_id    UUID NOT NULL REFERENCES deviz_proiecte(id) ON DELETE CASCADE,
  cod           TEXT,                 -- "01", "02"...
  denumire      TEXT NOT NULL,
  ordine        INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. CATEGORII DE LUCRĂRI (Terasamente/Fundații/Structură/...) ────────────
CREATE TABLE IF NOT EXISTS deviz_categorii (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  obiect_id     UUID NOT NULL REFERENCES deviz_obiecte(id) ON DELETE CASCADE,
  cod           TEXT,
  denumire      TEXT NOT NULL,
  ordine        INT DEFAULT 0
);

-- ── 4. RESURSE (materiale/manoperă/utilaj/transport) ─────────────────────────
CREATE TABLE IF NOT EXISTS deviz_resurse (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cod           TEXT,
  denumire      TEXT NOT NULL,
  um            TEXT NOT NULL,
  categorie     TEXT NOT NULL DEFAULT 'material'    -- material|manopera|utilaj|transport
);

-- ── 5. NORME (bibliotecă reutilizabilă între proiecte) ──────────────────────
CREATE TABLE IF NOT EXISTS deviz_norme (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cod_norma     TEXT,
  denumire      TEXT NOT NULL,
  um            TEXT NOT NULL,
  domeniu       TEXT DEFAULT 'constructii',   -- arhitectura|instalatii|constructii_speciale
  sursa         TEXT DEFAULT 'introdusa_user', -- RpS_1981|RpC_1999|RpC_2006|proprie|introdusa_user
  versiune      TEXT
);

CREATE TABLE IF NOT EXISTS deviz_norme_resurse (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  norma_id        UUID NOT NULL REFERENCES deviz_norme(id) ON DELETE CASCADE,
  resursa_id      UUID NOT NULL REFERENCES deviz_resurse(id) ON DELETE CASCADE,
  tip             TEXT NOT NULL,     -- material|manopera|utilaj|transport (denormalizat din resursa, comod la calcul)
  consum_unitar   NUMERIC NOT NULL,  -- consum pe unitatea normei
  um              TEXT
);

-- ── 6. ARTICOLE DE DEVIZ (instanțiate per proiect, din normă sau libere) ────
CREATE TABLE IF NOT EXISTS deviz_articole (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categorie_id          UUID NOT NULL REFERENCES deviz_categorii(id) ON DELETE CASCADE,
  norma_id              UUID REFERENCES deviz_norme(id),   -- NULL = articol liber (fără normă)
  cod                   TEXT,
  denumire              TEXT NOT NULL,
  um                    TEXT NOT NULL,
  cantitate             NUMERIC NOT NULL DEFAULT 0,
  sursa_cantitate       TEXT DEFAULT 'manual',   -- proiectat|relevat|manual
  relevee_id            UUID,                     -- FK logic către deviz_relevee (nullable)
  pret_unitar_manual    NUMERIC,                  -- folosit doar dacă articolul nu are normă (preț direct)
  created_by            TEXT,
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

-- ── 7. FURNIZORI ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS deviz_furnizori (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nume      TEXT NOT NULL,
  contact   TEXT,
  cui       TEXT
);

-- ── 8. PREȚURI — 4 NIVELURI, VERSIONATE (nu se suprascrie, se adaugă rând nou) ─
CREATE TABLE IF NOT EXISTS deviz_preturi (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resursa_id          UUID NOT NULL REFERENCES deviz_resurse(id) ON DELETE CASCADE,
  nivel               TEXT NOT NULL,     -- referinta|actualizat|oferta_furnizor|folosit
  valoare             NUMERIC NOT NULL,
  data_valabilitate    DATE DEFAULT CURRENT_DATE,
  sursa_text          TEXT,
  furnizor_id         UUID REFERENCES deviz_furnizori(id),
  status              TEXT DEFAULT 'activ',   -- activ|istoric
  created_by          TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_deviz_preturi_resursa ON deviz_preturi(resursa_id, nivel, status);

-- ── 9. INDICI INSSE (generic — CNS107D + orice altă serie viitoare) ─────────
CREATE TABLE IF NOT EXISTS deviz_ins_index (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source         TEXT DEFAULT 'INSSE',
  matrix_code    TEXT NOT NULL,          -- 'CNS107D', extensibil
  tip_constructie TEXT,
  tip_lucrari    TEXT,
  perioada       TEXT NOT NULL,          -- 'YYYY-MM'
  valoare        NUMERIC NOT NULL,
  unitate        TEXT DEFAULT '%',
  retrieved_at   TIMESTAMPTZ DEFAULT NOW(),
  status         TEXT DEFAULT 'provizoriu'   -- provizoriu|final
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_deviz_ins_unique ON deviz_ins_index(matrix_code, tip_constructie, tip_lucrari, perioada);

-- ── 10. RELEVEE PE NIVEL (Clădire → Nivel → fișier) ──────────────────────────
CREATE TABLE IF NOT EXISTS deviz_relevee (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proiect_id     UUID NOT NULL REFERENCES deviz_proiecte(id) ON DELETE CASCADE,
  nivel_nume     TEXT NOT NULL,      -- subsol|parter|etaj_1|etaj_2|mansarda|...
  fisier_url     TEXT,               -- URL Supabase Storage (bucket 'devize-relevee') sau link extern
  fisier_nume    TEXT,
  tip_fisier     TEXT,               -- dwg|dxf|pdf|imagine|csv
  data_masurare  DATE,
  autor          TEXT,
  versiune       INT DEFAULT 1,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── 11. CONTRACTE ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS deviz_contracte (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proiect_id                  UUID NOT NULL REFERENCES deviz_proiecte(id) ON DELETE CASCADE,
  furnizor_id                 UUID REFERENCES deviz_furnizori(id),
  numar                       TEXT,
  valoare                     NUMERIC,
  data_semnare                DATE,
  procent_garantie_retinere   NUMERIC DEFAULT 5,     -- % reținut din fiecare situație de lucrări
  garantie_acumulata          NUMERIC DEFAULT 0,
  garantie_eliberata          NUMERIC DEFAULT 0,
  status                      TEXT DEFAULT 'activ',   -- activ|finalizat|reziliat
  created_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 12. SITUAȚII DE LUCRĂRI + DECONTARE ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS deviz_situatii_lucrari (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id   UUID NOT NULL REFERENCES deviz_contracte(id) ON DELETE CASCADE,
  perioada      TEXT,             -- 'YYYY-MM'
  status        TEXT DEFAULT 'in_lucru',   -- in_lucru|verificat|decontat
  created_by    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS deviz_situatii_articole (
  id                              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  situatie_id                     UUID NOT NULL REFERENCES deviz_situatii_lucrari(id) ON DELETE CASCADE,
  articol_id                      UUID NOT NULL REFERENCES deviz_articole(id),
  cantitate_executata_anterior    NUMERIC DEFAULT 0,
  cantitate_executata_luna        NUMERIC DEFAULT 0,
  atasamente                      JSONB DEFAULT '[]'    -- [{url, tip:'foto'|'video', geo:[lon,lat], data}]
);

-- ── 13. FLUX DE APROBARE — istoric de tranziții (nu doar status curent) ─────
CREATE TABLE IF NOT EXISTS deviz_stari (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_tip        TEXT NOT NULL,     -- 'proiect'|'contract'|'situatie'
  ref_id         UUID NOT NULL,
  stare          TEXT NOT NULL,     -- emis|aprobat|contractat|in_executie|decontat|receptionat
  user_email     TEXT,
  comentariu     TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── 14. AUDIT TRAIL ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS deviz_audit_log (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entitate          TEXT NOT NULL,      -- articol|deviz|contract|situatie
  entitate_id       UUID,
  user_email        TEXT,
  camp_modificat    TEXT,
  valoare_veche     TEXT,
  valoare_noua      TEXT,
  motiv             TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── 15. ALERTE (istoric — depășire preț/buget) ───────────────────────────────
CREATE TABLE IF NOT EXISTS deviz_alerte (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proiect_id     UUID REFERENCES deviz_proiecte(id) ON DELETE CASCADE,
  tip            TEXT NOT NULL,      -- pret_resursa|buget_articol|buget_obiect
  ref_id         UUID,
  mesaj          TEXT,
  procent_abatere NUMERIC,
  vazuta         BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────
-- Citire publică (anon + authenticated) — susține cerința "primarul deschide harta
-- și vede valoarea investiției" fără login. Scriere doar utilizatori autentificați
-- (același nivel de protecție ca restul platformei — vezi role_definitions/user_roles;
-- rafinare pe roluri specifice deviz se poate adăuga ulterior peste acest strat).
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'deviz_proiecte','deviz_obiecte','deviz_categorii','deviz_resurse','deviz_norme',
    'deviz_norme_resurse','deviz_articole','deviz_furnizori','deviz_preturi','deviz_ins_index',
    'deviz_relevee','deviz_contracte','deviz_situatii_lucrari','deviz_situatii_articole',
    'deviz_stari','deviz_audit_log','deviz_alerte'
  ]) LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "public read" ON %I', t);
    EXECUTE format('CREATE POLICY "public read" ON %I FOR SELECT USING (true)', t);
    EXECUTE format('DROP POLICY IF EXISTS "auth write" ON %I', t);
    EXECUTE format('CREATE POLICY "auth write" ON %I FOR INSERT WITH CHECK (auth.role() = ''authenticated'')', t);
    EXECUTE format('DROP POLICY IF EXISTS "auth update" ON %I', t);
    EXECUTE format('CREATE POLICY "auth update" ON %I FOR UPDATE USING (auth.role() = ''authenticated'')', t);
    EXECUTE format('DROP POLICY IF EXISTS "auth delete" ON %I', t);
    EXECUTE format('CREATE POLICY "auth delete" ON %I FOR DELETE USING (auth.role() = ''authenticated'')', t);
  END LOOP;
END $$;

-- ── trigger updated_at pe deviz_proiecte ──────────────────────────────────────
CREATE OR REPLACE FUNCTION deviz_touch_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS deviz_proiecte_touch ON deviz_proiecte;
CREATE TRIGGER deviz_proiecte_touch BEFORE UPDATE ON deviz_proiecte
  FOR EACH ROW EXECUTE FUNCTION deviz_touch_updated_at();

-- ── Storage bucket pt relevee (fișiere DWG/DXF/PDF/imagini) ──────────────────
-- Rulați o singură dată (dacă bucket-ul nu există deja):
-- Dashboard Supabase → Storage → New bucket → nume: "devize-relevee" → Public: NU
-- (acces prin URL semnat, generat de aplicație la nevoie).

-- ═══════════════════════════════════════════════════════════════════════════
-- SFÂRȘIT SCHEMĂ. După rulare: reîncărcați UrbanX — modulul Devize funcționează
-- automat cu window._supabase deja configurat (js/00-globals.js).
-- ═══════════════════════════════════════════════════════════════════════════
