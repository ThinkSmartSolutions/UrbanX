-- UrbanX — Setup Supabase (rulează o singură dată în SQL Editor)
-- Supabase → SQL Editor → New query → Paste → Run

-- ═══════════════════════════════════════════════════════════
-- 1. TABELUL DE PROFILE
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email      TEXT,
  role       TEXT        DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Utilizatorii văd doar propriul profil
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Utilizatorii își pot actualiza propriul profil (nu rolul)
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- ═══════════════════════════════════════════════════════════
-- 2. TRIGGER — creare profil automat la signup
-- ═══════════════════════════════════════════════════════════
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

-- ═══════════════════════════════════════════════════════════
-- 3. FUNCȚII RPC PENTRU ADMIN
-- ═══════════════════════════════════════════════════════════

-- Listare toți utilizatorii (doar admin poate apela)
CREATE OR REPLACE FUNCTION list_all_users()
RETURNS TABLE(
  id         UUID,
  email      TEXT,
  role       TEXT,
  confirmed  BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- Verificăm că cel care apelează e admin
  IF (SELECT role FROM public.profiles WHERE id = auth.uid()) != 'admin' THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
    SELECT
      p.id,
      p.email,
      p.role,
      (u.email_confirmed_at IS NOT NULL) AS confirmed,
      p.created_at
    FROM public.profiles p
    JOIN auth.users u ON u.id = p.id
    ORDER BY p.created_at DESC;
END;
$$;

-- Schimbare rol utilizator (doar admin poate apela)
CREATE OR REPLACE FUNCTION set_user_role(target_id UUID, new_role TEXT)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- Verificăm că cel care apelează e admin
  IF (SELECT role FROM public.profiles WHERE id = auth.uid()) != 'admin' THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  -- Validăm rolul nou
  IF new_role NOT IN ('user', 'admin') THEN
    RAISE EXCEPTION 'Invalid role: %', new_role;
  END IF;

  UPDATE public.profiles SET role = new_role WHERE id = target_id;
END;
$$;

-- ═══════════════════════════════════════════════════════════
-- 4. PRIMUL ADMIN — setezi email-ul tău
-- ═══════════════════════════════════════════════════════════
-- Rulează DUPĂ ce te-ai înregistrat în aplicație:
--
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE email = 'EMAIL_TAU@EXEMPLU.RO';

-- ═══════════════════════════════════════════════════════════
-- Verificare: ar trebui să returneze tabela goală (sau profilul tău)
SELECT * FROM public.profiles LIMIT 5;
