-- ═══════════════════════════════════════════════════════════════════════════
-- UrbanX — DEVIZE & COST MANAGEMENT — migrare v2 (Supabase, PostgreSQL)
-- Rulați O SINGURĂ DATĂ în Supabase → SQL Editor → Run, DUPĂ ce ați rulat deja
-- js/urbanx-devize-pro-schema.sql. Idempotent (ADD COLUMN IF NOT EXISTS) —
-- sigur de rulat de mai multe ori.
--
-- De ce: tiparul REAL de deviz (F3 — Listă cantități de lucrări, format
-- devize.ro/ISDP) cere pe antet Beneficiar+Proiectant (nu doar Obiectiv), și
-- un subsol cu Cheltuieli directe → Alte cheltuieli directe → Contribuție
-- asiguratorie pentru muncă (CAM, 2.25% legal pe manoperă) → Cheltuieli
-- indirecte → Profit → TOTAL GENERAL. CAM e procent fix legal; indirecte/
-- profit NU sunt fixate legal — sunt decizii de antreprenor, de aceea sunt
-- editabile per obiect (cu valori implicite orientative, nu impuse).
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE deviz_proiecte ADD COLUMN IF NOT EXISTS beneficiar TEXT;
ALTER TABLE deviz_proiecte ADD COLUMN IF NOT EXISTS proiectant TEXT;

ALTER TABLE deviz_obiecte ADD COLUMN IF NOT EXISTS stadiu_fizic TEXT;              -- ex. "ARHITECTURA", "ALEI PIETONALE", "ORGANIZARE DE SANTIER"
ALTER TABLE deviz_obiecte ADD COLUMN IF NOT EXISTS alte_cheltuieli_directe_pct NUMERIC DEFAULT 0;
ALTER TABLE deviz_obiecte ADD COLUMN IF NOT EXISTS cam_pct NUMERIC DEFAULT 2.25;   -- legal, Codul Fiscal — contribuție asiguratorie pentru muncă
ALTER TABLE deviz_obiecte ADD COLUMN IF NOT EXISTS cheltuieli_indirecte_pct NUMERIC DEFAULT 10; -- orientativ, editabil
ALTER TABLE deviz_obiecte ADD COLUMN IF NOT EXISTS profit_pct NUMERIC DEFAULT 8;   -- orientativ, editabil
ALTER TABLE deviz_obiecte ADD COLUMN IF NOT EXISTS durata_zile_lucratoare NUMERIC; -- opțional, pt echivalent FTE (nr. muncitori) în extrasul de manoperă

-- ═══════════════════════════════════════════════════════════════════════════
-- SFÂRȘIT migrare v2. După rulare: reîncărcați UrbanX.
-- ═══════════════════════════════════════════════════════════════════════════
