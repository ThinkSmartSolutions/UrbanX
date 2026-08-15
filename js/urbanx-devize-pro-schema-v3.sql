-- ═══════════════════════════════════════════════════════════════════════════
-- UrbanX — DEVIZE & COST MANAGEMENT — migrare v3 (Supabase, PostgreSQL)
-- Rulați O SINGURĂ DATĂ în Supabase → SQL Editor → Run, DUPĂ v1 și v2. Idempotent.
--
-- De ce: F4 oficial (HG 907/2016, Anexa 8) = "LISTA cu cantitățile de utilaje și
-- echipamente tehnologice, inclusiv dotări și active necorporale" — bunuri de
-- CAPITAL cumpărate pentru investiție (centrală termică, lift, echipamente de
-- producție — Cap. 4.3 din Deviz General), DIFERIT LEGAL de utilajele de șantier
-- (macara/excavator — ore de funcționare, cost în Cap. 4.1 C+M, deja acoperite
-- de resursele tip 'utilaj' din normele de deviz). Nu pot fi unite corect sub
-- același formular — de-aici tabelul nou, separat.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS deviz_dotari (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  obiect_id      UUID NOT NULL REFERENCES deviz_obiecte(id) ON DELETE CASCADE,
  cod            TEXT,
  denumire       TEXT NOT NULL,
  um             TEXT DEFAULT 'buc',
  cantitate      NUMERIC DEFAULT 1,
  pret_unitar    NUMERIC DEFAULT 0,          -- lei, fără TVA
  furnizor       TEXT,
  necesita_montaj BOOLEAN DEFAULT true,       -- determină Cap.4.3 ("necesită montaj") vs 4.4 ("nu necesită montaj"), Anexa 7 HG907
  producator     TEXT,                       -- pt fișa tehnică F5
  model          TEXT,
  parametri      TEXT,                       -- parametri tehnici, text liber
  garantie_luni  NUMERIC,
  ordine         INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

DO $$
BEGIN
  ALTER TABLE deviz_dotari ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS "public read" ON deviz_dotari;
  CREATE POLICY "public read" ON deviz_dotari FOR SELECT USING (true);
  DROP POLICY IF EXISTS "auth write" ON deviz_dotari;
  CREATE POLICY "auth write" ON deviz_dotari FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  DROP POLICY IF EXISTS "auth update" ON deviz_dotari;
  CREATE POLICY "auth update" ON deviz_dotari FOR UPDATE USING (auth.role() = 'authenticated');
  DROP POLICY IF EXISTS "auth delete" ON deviz_dotari;
  CREATE POLICY "auth delete" ON deviz_dotari FOR DELETE USING (auth.role() = 'authenticated');
END $$;

-- ═══════════════════════════════════════════════════════════════════════════
-- SFÂRȘIT migrare v3. După rulare: reîncărcați UrbanX.
-- ═══════════════════════════════════════════════════════════════════════════
