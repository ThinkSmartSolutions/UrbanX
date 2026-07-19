// ═══════════════════════════════════════════════════════════════════════════
// URBANX — SISTEM CONT DEMO (token-based, izolat de producție)
// Conturi demo pentru investitori/presă/testeri: cerere din formular → token
// unic → acces 14 zile → expirare automată → tracking sesiuni → dashboard admin.
//
// De ce token, nu Supabase Auth: înregistrarea publică e dezactivată deliberat
// (invite-only, vezi js/00-globals.js) — conturile demo NU trebuie să ocolească
// acea decizie de securitate. Sunt un sistem paralel, separat de auth.users,
// bazat pe un rând în tabelul demo_accounts + un token secret în URL/localStorage.
//
// SETUP (o singură dată, manual): copiază SQL-ul din UrbanXDemo.setupSQL() și
// rulează-l în Supabase SQL Editor (proiectul deja configurat al platformei).
// Reutilizează _SUPABASE_CONFIG / clientul supabase-js deja încărcat de
// js/21-cloud-sync.js — acest fișier NU creează o conexiune nouă.
// ═══════════════════════════════════════════════════════════════════════════

const _DEMO_SQL_SCHEMA = `
-- ── Tabele ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.demo_accounts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token           TEXT UNIQUE NOT NULL,
  nume            TEXT,
  email           TEXT NOT NULL,
  organizatie     TEXT,
  motiv           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at      TIMESTAMPTZ NOT NULL,
  status          TEXT NOT NULL DEFAULT 'activ' CHECK (status IN ('activ','expirat','revocat')),
  extended_by     TEXT,
  extended_at     TIMESTAMPTZ,
  extension_days  INT NOT NULL DEFAULT 0,
  last_seen_at    TIMESTAMPTZ,
  sursa           TEXT
);
ALTER TABLE public.demo_accounts ADD COLUMN IF NOT EXISTS sursa TEXT;
CREATE INDEX IF NOT EXISTS idx_demo_accounts_token  ON public.demo_accounts(token);
CREATE INDEX IF NOT EXISTS idx_demo_accounts_email  ON public.demo_accounts(email);
CREATE INDEX IF NOT EXISTS idx_demo_accounts_status ON public.demo_accounts(status);
CREATE INDEX IF NOT EXISTS idx_demo_accounts_sursa  ON public.demo_accounts(sursa);

CREATE TABLE IF NOT EXISTS public.demo_sessions (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id         UUID NOT NULL REFERENCES public.demo_accounts(id) ON DELETE CASCADE,
  login_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_activity_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip                 TEXT,
  duration_seconds   INT NOT NULL DEFAULT 0,
  modules            JSONB NOT NULL DEFAULT '[]'::jsonb,
  features           JSONB NOT NULL DEFAULT '[]'::jsonb,
  clicks             JSONB NOT NULL DEFAULT '[]'::jsonb,
  documents          JSONB NOT NULL DEFAULT '[]'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_demo_sessions_account ON public.demo_sessions(account_id);

ALTER TABLE public.demo_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_sessions ENABLE ROW LEVEL SECURITY;

-- Fără politici pentru anon/authenticated pe tabele — TOATE operațiile trec
-- exclusiv prin funcțiile SECURITY DEFINER de mai jos (audit + validare server-side).
-- Excepție: admin (rol 'admin' în public.profiles) poate citi direct, pentru dashboard.
DROP POLICY IF EXISTS "admin reads demo_accounts" ON public.demo_accounts;
CREATE POLICY "admin reads demo_accounts" ON public.demo_accounts
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

DROP POLICY IF EXISTS "admin reads demo_sessions" ON public.demo_sessions;
CREATE POLICY "admin reads demo_sessions" ON public.demo_sessions
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- ── Cerere cont demo (public, apelat din formularul de pe website) ────────
-- DROP întâi: adăugarea unui parametru nou schimbă semnătura — fără DROP,
-- CREATE OR REPLACE ar crea un al doilea overload în loc să înlocuiască vechea funcție.
DROP FUNCTION IF EXISTS public.request_demo_account(TEXT,TEXT,TEXT,TEXT);
CREATE OR REPLACE FUNCTION public.request_demo_account(p_nume TEXT, p_email TEXT, p_organizatie TEXT, p_motiv TEXT, p_sursa TEXT DEFAULT NULL)
RETURNS TABLE(token TEXT, expires_at TIMESTAMPTZ, reused BOOLEAN) AS $$
DECLARE
  v_existing RECORD;
  v_token TEXT;
  v_expires TIMESTAMPTZ;
BEGIN
  IF p_email IS NULL OR p_email !~ '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' THEN
    RAISE EXCEPTION 'Adresă de email invalidă';
  END IF;

  -- reutilizează cererea existentă dacă e încă activă (evită spam la dublu-click)
  -- NOTĂ: coloanele tabelului sunt calificate cu alias (da.) fiindcă RETURNS TABLE
  -- de mai sus declară automat variabile 'expires_at'/'token' — fără alias, referința
  -- devine ambiguă (variabilă PL/pgSQL vs. coloană tabel), eroare reală prinsă la test live.
  SELECT da.* INTO v_existing FROM public.demo_accounts da
    WHERE da.email = lower(p_email) AND da.status = 'activ' AND da.expires_at > now()
    ORDER BY da.created_at DESC LIMIT 1;
  IF FOUND THEN
    RETURN QUERY SELECT v_existing.token, v_existing.expires_at, true;
    RETURN;
  END IF;

  -- token din 2x gen_random_uuid() (nativ Postgres 13+, fără extensia pgcrypto —
  -- gen_random_bytes() a eșuat la test live: extensia nu era activată pe proiect)
  v_token := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
  v_expires := now() + INTERVAL '14 days';

  INSERT INTO public.demo_accounts (token, nume, email, organizatie, motiv, expires_at, sursa)
  VALUES (v_token, p_nume, lower(p_email), p_organizatie, p_motiv, v_expires, p_sursa);

  RETURN QUERY SELECT v_token, v_expires, false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── Status cont (public — doar câmpuri neconfidențiale, verificat prin token) ──
CREATE OR REPLACE FUNCTION public.get_demo_status(p_token TEXT)
RETURNS TABLE(status TEXT, expires_at TIMESTAMPTZ, nume TEXT, days_remaining INT) AS $$
BEGIN
  -- alias (da.) obligatoriu în WHERE: RETURNS TABLE de mai sus declară 'status'/'expires_at'
  -- ca variabile PL/pgSQL, altfel referința bare e ambiguă cu coloana tabelului.
  UPDATE public.demo_accounts da SET status = 'expirat'
    WHERE da.token = p_token AND da.status = 'activ' AND da.expires_at <= now();

  RETURN QUERY
    SELECT a.status, a.expires_at, a.nume,
           GREATEST(0, CEIL(EXTRACT(EPOCH FROM (a.expires_at - now())) / 86400)::INT)
    FROM public.demo_accounts a WHERE a.token = p_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── Login sesiune demo (creează un rând de sesiune, actualizează last_seen) ────
CREATE OR REPLACE FUNCTION public.record_demo_login(p_token TEXT, p_ip TEXT)
RETURNS TABLE(session_id UUID, ok BOOLEAN, message TEXT) AS $$
DECLARE
  v_acc RECORD;
  v_session_id UUID;
BEGIN
  UPDATE public.demo_accounts SET status = 'expirat'
    WHERE token = p_token AND status = 'activ' AND expires_at <= now();

  SELECT * INTO v_acc FROM public.demo_accounts WHERE token = p_token;
  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::UUID, false, 'Token invalid';
    RETURN;
  END IF;
  IF v_acc.status = 'expirat' THEN
    RETURN QUERY SELECT NULL::UUID, false, 'Perioada de testare a expirat, contactează-ne pentru acces extins';
    RETURN;
  END IF;
  IF v_acc.status = 'revocat' THEN
    RETURN QUERY SELECT NULL::UUID, false, 'Acces revocat';
    RETURN;
  END IF;

  UPDATE public.demo_accounts SET last_seen_at = now() WHERE id = v_acc.id;
  INSERT INTO public.demo_sessions (account_id, ip) VALUES (v_acc.id, p_ip) RETURNING id INTO v_session_id;
  RETURN QUERY SELECT v_session_id, true, 'ok';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── Tracking evenimente (append pe sesiunea curentă) ──────────────────────
CREATE OR REPLACE FUNCTION public.record_demo_event(p_session_id UUID, p_kind TEXT, p_payload JSONB)
RETURNS VOID AS $$
BEGIN
  IF p_kind = 'module' THEN
    UPDATE public.demo_sessions SET modules = modules || jsonb_build_array(p_payload),
      last_activity_at = now(),
      duration_seconds = duration_seconds + GREATEST(0, LEAST(120, EXTRACT(EPOCH FROM (now() - last_activity_at))::INT))
      WHERE id = p_session_id;
  ELSIF p_kind = 'feature' THEN
    UPDATE public.demo_sessions SET features = features || jsonb_build_array(p_payload),
      last_activity_at = now(),
      duration_seconds = duration_seconds + GREATEST(0, LEAST(120, EXTRACT(EPOCH FROM (now() - last_activity_at))::INT))
      WHERE id = p_session_id;
  ELSIF p_kind = 'click' THEN
    UPDATE public.demo_sessions SET clicks = clicks || jsonb_build_array(p_payload),
      last_activity_at = now(),
      duration_seconds = duration_seconds + GREATEST(0, LEAST(120, EXTRACT(EPOCH FROM (now() - last_activity_at))::INT))
      WHERE id = p_session_id;
  ELSIF p_kind = 'document' THEN
    UPDATE public.demo_sessions SET documents = documents || jsonb_build_array(p_payload),
      last_activity_at = now(),
      duration_seconds = duration_seconds + GREATEST(0, LEAST(120, EXTRACT(EPOCH FROM (now() - last_activity_at))::INT))
      WHERE id = p_session_id;
  ELSIF p_kind = 'heartbeat' THEN
    UPDATE public.demo_sessions SET
      duration_seconds = duration_seconds + GREATEST(0, LEAST(120, EXTRACT(EPOCH FROM (now() - last_activity_at))::INT)),
      last_activity_at = now()
      WHERE id = p_session_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── Administrare (doar rol 'admin' în public.profiles) ────────────────────
CREATE OR REPLACE FUNCTION public._is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin');
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

DROP FUNCTION IF EXISTS public.admin_list_demo_accounts();
CREATE OR REPLACE FUNCTION public.admin_list_demo_accounts()
RETURNS TABLE(id UUID, token TEXT, nume TEXT, email TEXT, organizatie TEXT, motiv TEXT,
              created_at TIMESTAMPTZ, expires_at TIMESTAMPTZ, status TEXT, days_remaining INT,
              last_seen_at TIMESTAMPTZ, session_count BIGINT, sursa TEXT) AS $$
BEGIN
  IF NOT public._is_admin() THEN RAISE EXCEPTION 'Acces interzis'; END IF;
  -- alias (da.) obligatoriu: RETURNS TABLE de mai jos declară 'status'/'expires_at' ca variabile.
  UPDATE public.demo_accounts da SET status = 'expirat' WHERE da.status = 'activ' AND da.expires_at <= now();
  RETURN QUERY
    SELECT a.id, a.token, a.nume, a.email, a.organizatie, a.motiv, a.created_at, a.expires_at, a.status,
           GREATEST(0, CEIL(EXTRACT(EPOCH FROM (a.expires_at - now())) / 86400)::INT),
           a.last_seen_at,
           (SELECT count(*) FROM public.demo_sessions s WHERE s.account_id = a.id),
           a.sursa
    FROM public.demo_accounts a ORDER BY a.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.admin_demo_source_summary()
RETURNS TABLE(sursa TEXT, total BIGINT, active BIGINT) AS $$
BEGIN
  IF NOT public._is_admin() THEN RAISE EXCEPTION 'Acces interzis'; END IF;
  RETURN QUERY
    SELECT COALESCE(a.sursa, '(necunoscut)'), count(*),
           count(*) FILTER (WHERE a.status = 'activ')
    FROM public.demo_accounts a GROUP BY a.sursa ORDER BY 2 DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.admin_demo_sessions(p_account_id UUID)
RETURNS SETOF public.demo_sessions AS $$
BEGIN
  IF NOT public._is_admin() THEN RAISE EXCEPTION 'Acces interzis'; END IF;
  RETURN QUERY SELECT * FROM public.demo_sessions WHERE account_id = p_account_id ORDER BY login_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.admin_extend_demo(p_account_id UUID, p_days INT)
RETURNS VOID AS $$
BEGIN
  IF NOT public._is_admin() THEN RAISE EXCEPTION 'Acces interzis'; END IF;
  UPDATE public.demo_accounts SET
    expires_at = GREATEST(expires_at, now()) + (p_days || ' days')::INTERVAL,
    status = 'activ', extended_by = auth.email(), extended_at = now(),
    extension_days = extension_days + p_days
    WHERE id = p_account_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.admin_revoke_demo(p_account_id UUID)
RETURNS VOID AS $$
BEGIN
  IF NOT public._is_admin() THEN RAISE EXCEPTION 'Acces interzis'; END IF;
  UPDATE public.demo_accounts SET status = 'revocat' WHERE id = p_account_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.admin_reactivate_demo(p_account_id UUID, p_days INT DEFAULT 14)
RETURNS VOID AS $$
BEGIN
  IF NOT public._is_admin() THEN RAISE EXCEPTION 'Acces interzis'; END IF;
  UPDATE public.demo_accounts SET status = 'activ', expires_at = now() + (p_days || ' days')::INTERVAL,
    extended_by = auth.email(), extended_at = now(), extension_days = extension_days + p_days
    WHERE id = p_account_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.admin_demo_usage_summary()
RETURNS TABLE(item TEXT, kind TEXT, uses BIGINT) AS $$
BEGIN
  IF NOT public._is_admin() THEN RAISE EXCEPTION 'Acces interzis'; END IF;
  RETURN QUERY
    SELECT m.value #>> '{}', 'module', count(*) FROM public.demo_sessions s, jsonb_array_elements(s.modules) m
      GROUP BY 1 ORDER BY 3 DESC LIMIT 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ── Permisiuni de execuție ────────────────────────────────────────────────
GRANT EXECUTE ON FUNCTION public.request_demo_account(TEXT,TEXT,TEXT,TEXT,TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_demo_source_summary()                TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_demo_status(TEXT)                     TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_demo_login(TEXT,TEXT)              TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_demo_event(UUID,TEXT,JSONB)        TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_demo_accounts()                TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_demo_sessions(UUID)                 TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_extend_demo(UUID,INT)               TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_revoke_demo(UUID)                   TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_reactivate_demo(UUID,INT)           TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_demo_usage_summary()                TO authenticated;
`;

// ── Client runtime ──────────────────────────────────────────────────────────
const UrbanXDemo = {
  session: null,          // {sessionId, token, expiresAt, nume}
  _flushTimer: null,

  setupSQL() { return _DEMO_SQL_SCHEMA; },

  _sb() {
    // reutilizează clientul supabase-js deja inițializat de 21-cloud-sync.js
    return (typeof _supabase !== 'undefined' && _supabase) ? _supabase : null;
  },

  // ── Cerere formular (website multi-audiență) ────────────────────────────
  // sursa: identificator al paginii de unde vine cererea (government/ministry/
  // designer/developer/investitori/press/university/utilities) — dacă lipsește,
  // se deduce din numele fișierului curent (window._UX_AUDIENCE sau location).
  async request({ nume, email, organizatie, motiv, sursa }) {
    const sb = this._sb();
    if (!sb) return { ok: false, error: 'Supabase indisponibil — reîncearcă mai târziu.' };
    const src = sursa || window._UX_AUDIENCE || (location.pathname.match(/([a-z]+)\.html/) || [])[1] || 'necunoscut';
    try {
      const { data, error } = await sb.rpc('request_demo_account', {
        p_nume: nume || null, p_email: email, p_organizatie: organizatie || null, p_motiv: motiv || null,
        p_sursa: src,
      });
      if (error) return { ok: false, error: error.message };
      const row = Array.isArray(data) ? data[0] : data;
      if (!row || !row.token) return { ok: false, error: 'Răspuns neașteptat de la server.' };
      const link = `${location.origin}${location.pathname.replace(/investor\/.*$/, '')}index.html?demo=${row.token}`;
      return { ok: true, token: row.token, expiresAt: row.expires_at, reused: !!row.reused, link };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },

  // ── IP vizitator (prin proxy-ul Cloudflare deja existent, fără CORS) ────
  async _fetchIP() {
    try {
      const proxy = 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
      const r = await fetch(`${proxy}/proxy?url=${encodeURIComponent('https://api.ipify.org?format=json')}`);
      const j = await r.json();
      return j && j.ip ? j.ip : null;
    } catch (e) { return null; }
  },

  // ── Boot: verifică ?demo=TOKEN (sau localStorage), blochează sau pornește tracking ──
  async checkAndBoot() {
    const params = new URLSearchParams(location.search);
    const token = params.get('demo') || localStorage.getItem('ux_demo_token');
    if (!token) return { active: false };

    const sb = this._sb();
    if (!sb) return { active: false };

    const { data: statusRows, error: statusErr } = await sb.rpc('get_demo_status', { p_token: token });
    const st = Array.isArray(statusRows) ? statusRows[0] : statusRows;
    if (statusErr || !st) { this._renderBlock('Link de acces demo invalid.'); return { active: false, blocked: true }; }
    if (st.status !== 'activ') {
      this._renderBlock('Perioada de testare a expirat, contactează-ne pentru acces extins.');
      return { active: false, blocked: true };
    }

    localStorage.setItem('ux_demo_token', token);
    const ip = await this._fetchIP();
    const { data: loginRows, error: loginErr } = await sb.rpc('record_demo_login', { p_token: token, p_ip: ip });
    const login = Array.isArray(loginRows) ? loginRows[0] : loginRows;
    if (loginErr || !login || !login.ok) {
      this._renderBlock((login && login.message) || 'Perioada de testare a expirat, contactează-ne pentru acces extins.');
      return { active: false, blocked: true };
    }

    this.session = { sessionId: login.session_id, token, nume: st.nume, daysRemaining: st.days_remaining };
    window._DEMO_MODE = this.session;
    this._startHeartbeat();
    this._renderBadge();
    this._attachClickTracker();
    this._seedDemoProjects();
    return { active: true, daysRemaining: st.days_remaining };
  },

  // ── Proiecte fictive preîncărcate (ceva de explorat imediat la login) ──
  // Rulează O SINGURĂ DATĂ per browser (flag local) — scrise DOAR în IndexedDB
  // locală (_ProjectsManager), NICIODATĂ către tabela de producție urbanx_projects
  // (vezi guard-ul window._DEMO_MODE din js/21-cloud-sync.js syncAll()).
  async _seedDemoProjects() {
    try {
      if (localStorage.getItem('ux_demo_seeded')) return;
      if (typeof _ProjectsManager === 'undefined') return;
      if (!_ProjectsManager.db) await _ProjectsManager.init();

      const now = new Date().toISOString();
      const mk = (id, name, nrCad, utr, area, lat, lon, dx, dy, notes) => ({
        id, version: '3.2.0', created: now, modified: now,
        name: '🧪 DEMO — ' + name,
        author: { email: 'demo@urbanx.ro', package: 'professional' },
        parcel: {
          nrCad, utr, area, lat, lon, uat: 'Municipiul Iași', judet: 'Iași',
          geo: {
            type: 'Feature',
            properties: { utr, det: null, obs: 'Parcelă fictivă — cont demo' },
            geometry: { type: 'Polygon', coordinates: [[
              [lon, lat], [lon + dx, lat], [lon + dx, lat + dy], [lon, lat + dy], [lon, lat],
            ]] },
          },
          params: {},
        },
        aedis: null,
        thumbnail: null,
        notes: notes + ' — proiect fictiv, preîncărcat automat pentru testarea contului demo (nu reprezintă o parcelă reală).',
        tags: ['demo'],
        studies_generated: [],
        map_state: { center: [lon, lat], zoom: 16, bearing: 0, pitch: 45 },
        projection_state: null,
      });

      const seeds = [
        mk('DEMO-BLOC-001', 'Bloc de locuințe S+P+8E', '999901', 'L3', 2450, 47.1620, 27.5870, 0.00055, 0.00040,
          'Regim S+P+8E, 64 apartamente, parcare subterană.'),
        mk('DEMO-SPITAL-001', 'Unitate medicală / clinică', '999902', 'ISm', 5200, 47.1495, 27.5695, 0.00075, 0.00060,
          'Clinică ambulatorie P+3, imagistică + laborator.'),
        mk('DEMO-CENTRUSOCIAL-001', 'Centru social de zi', '999903', 'ISs', 890, 47.1555, 27.5945, 0.00035, 0.00028,
          'Centru de zi pentru vârstnici, regim P+1, capacitate 40-60 beneficiari.'),
      ];

      const tx = _ProjectsManager.db.transaction(['projects'], 'readwrite');
      seeds.forEach((p) => tx.objectStore('projects').put(p));
      await new Promise((res) => { tx.oncomplete = res; });
      localStorage.setItem('ux_demo_seeded', '1');
      try { if (_ProjectsManager.renderList) _ProjectsManager.renderList(); } catch (e) {}
      console.log('[UrbanXDemo] 3 proiecte demo preîncărcate.');
    } catch (e) { console.warn('[UrbanXDemo] seed proiecte eșuat:', e.message); }
  },

  // ── Click-uri cheie: un singur listener delegat, nu instrumentare manuală
  // pe fiecare buton din aplicație. Prinde eticheta butonului/link-ului apăsat.
  _attachClickTracker() {
    document.addEventListener('click', (e) => {
      const el = e.target.closest('button, a, [role="button"]');
      if (!el) return;
      const label = (el.textContent || el.title || el.getAttribute('aria-label') || '').trim().slice(0, 80);
      if (label) this.trackClick(label);
    }, { capture: true, passive: true });
  },

  // ── Instrumentare (apelată din restul aplicației) ───────────────────────
  trackModule(id) { this._event('module', { id, at: Date.now() }); },
  trackFeature(name) { this._event('feature', { name, at: Date.now() }); },
  trackClick(label) { this._event('click', { label, at: Date.now() }); },
  trackDocument(type, count) { this._event('document', { type, count: count || 1, at: Date.now() }); },

  _event(kind, payload) {
    if (!this.session) return;
    const sb = this._sb();
    if (!sb) return;
    sb.rpc('record_demo_event', { p_session_id: this.session.sessionId, p_kind: kind, p_payload: payload })
      .then(() => {}).catch(() => {});
  },

  _startHeartbeat() {
    if (this._flushTimer) clearInterval(this._flushTimer);
    this._flushTimer = setInterval(() => this._event('heartbeat', {}), 30000);
    window.addEventListener('beforeunload', () => this._event('heartbeat', {}));
  },

  _renderBadge() {
    const b = document.createElement('div');
    b.style.cssText = 'position:fixed;bottom:14px;left:14px;z-index:99999;background:rgba(20,184,166,.15);'
      + 'border:1px solid rgba(45,212,191,.4);color:#5eead4;font:600 12px system-ui;padding:8px 14px;'
      + 'border-radius:10px;backdrop-filter:blur(6px)';
    b.textContent = `🧪 Cont demo · ${this.session.daysRemaining} zile rămase`;
    document.body.appendChild(b);
  },

  _renderBlock(message) {
    document.addEventListener('DOMContentLoaded', () => this._paintBlock(message));
    if (document.readyState !== 'loading') this._paintBlock(message);
  },
  _paintBlock(message) {
    if (document.getElementById('ux-demo-block')) return;
    const ov = document.createElement('div');
    ov.id = 'ux-demo-block';
    ov.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#050b14;color:#f3f7fb;'
      + 'display:flex;align-items:center;justify-content:center;font-family:system-ui;text-align:center;padding:24px';
    ov.innerHTML = `<div style="max-width:420px">
      <div style="font-size:40px;margin-bottom:18px">⏳</div>
      <div style="font-size:19px;font-weight:800;margin-bottom:10px">${message}</div>
      <div style="color:#8ea3c2;font-size:14px;margin-bottom:22px">office@think-ss.eu · 0725 246 822</div>
      <a href="mailto:office@think-ss.eu" style="display:inline-block;background:#2dd4bf;color:#04211d;font-weight:700;
        padding:12px 22px;border-radius:10px;text-decoration:none">Cere acces extins →</a>
    </div>`;
    document.body.appendChild(ov);
  },
};

window.UrbanXDemo = UrbanXDemo;
