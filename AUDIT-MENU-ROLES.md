# AUDIT — Meniu, Roluri & i18n (Task 001)
## Fundamentul pentru roluri/grade de acces + multilingv, FĂRĂ a strica ce există
**Data:** 28 iunie 2026 · UrbanX / ThinkSmart Solutions

> Acest audit este pasul 1 (non-destructiv) din planul în 5 faze pentru Task 001.
> Concluzie-cheie: **infrastructura de bază există deja** (registru de module + sistem de pachete/acces +
> setare limbă). Implementarea nu pornește de la zero și NU trebuie să dubleze nimic.

---

## 1. MECANISMUL DE AUTENTIFICARE (există)

- **Supabase** — `supabase.createClient(SUPABASE_URL, SUPABASE_KEY)` în `js/00-globals.js:1046`
  (URL `xzctxxchdykowysqjzkq.supabase.co`). Listener `_supabase.auth.onAuthStateChange()` (`:1082`).
- Utilizator curent: variabila globală **`_authUser`** (`js/00-globals.js:1098`), setată în `_authSuccess(user)` (`:1105`).
- Admin: emailuri hardcodate `ADMIN_EMAILS` (`js/00-globals.js:971`) → flag **`_isAdmin`** (`:972`).
- **Sistem de pachete (ACCES deja existent)** — `js/00-packages.js`:
  - `_USER.pkg.access` + **`_USER.canAccess(module)`** (`:175`) + **`_USER.canGenerateStudy(fnName)`** (`:182`).
  - Pachete: `EXPLORATOR`, `PROFESSIONAL`, `DEVELOPER` (matrice de acces per modul).
- Rol în sidebar: `isAdmin()` verifică `role==='admin' || role==='primar' || isAdmin` (`js/ux-sidebar.js:160`).

**Implicație:** stratul de roluri se construiește PESTE Supabase + `_USER` existent (rol + uatSiruta în
user metadata), NU pe Cloudflare Worker KV + SHA-256 (cum propunea spec-ul — duplicat și mai puțin sigur).

---

## 2. MENIUL TERITORIU — `UXSidebar` (`js/ux-sidebar.js`)

- Definiție: array **`NAV`** (`:63+`), 8 grupuri (Teritoriu&hărți, Analiză, Mobilitate, Mediu, Riscuri,
  Strategic Planning Suite ~35 itemi, Cetățeni, Prezentare). Fiecare item: `{label, moduleId, info?}`.
- Dispatch: `onclick="UXSidebar.openModule('<moduleId>')"` (`:184`) → `openModule(id)` (`:147`) → `MODULE_OPEN[id]()`.

---

## 3. MENIUL RAPOARTE / PARCELĂ (`index.html:1427-1592`)

- HTML static, 7 categorii. Pattern buton: `onclick="generate<Studiu>();toggleRapoarteMenu()"`.
- Exemple: Amplasament→`generateStudiuAmplasament()`, Însorire→`generateSolarStudy()`, Acustic→`generateNoiseStudy()`,
  Geotehnic→`generateGeotehnicalStudy()`, Carbon→`generateCarbonStudy()`, Trafic→`generateTrafficStudy()`.
- **Observație:** Rapoarte e definit separat de NAV → recomandare fază 3: registru unic (sau strat de filtrare
  comun) care acoperă AMBELE, fără a rescrie funcțiile.

---

## 4. REGISTRUL DE MODULE = LINCHPIN-UL (există deja!)

- **`MODULE_OPEN`** (`js/ux-sidebar.js:16-60`) — ~55 `moduleId` → funcție. Trei tipare:
  - `call('fn')` → `window.fn()`;  `mod('Obj','m')` → `window.Obj.m()`;  funcție inline (logică custom).
  - SPS dinamic: `moduleId='sps:<id>'` → `window._SPS.generate(id, cityKey, 'T')`.
- **`RAPORT_INFO`** (`js/13-info-drawer.js:245+`) — moduleId/cheie → info-drawer (`ce/dece/legal/output/nu` + `fn`).
- **`_MOD_INFO_ALIAS`** (`js/13-info-drawer.js:1462+`) — moduleId → cheie RAPORT_INFO când diferă.

**Implicație:** maparea `accessId → modul real` (piesa pe care spec-ul o cerea ca fundament) **EXISTĂ** sub forma
`MODULE_OPEN` (+ alias). Rolurile se exprimă ca LISTĂ de `moduleId` permise, comparată cu cheile `MODULE_OPEN`.
Nu mai inventăm accessId-uri abstracte — refolosim moduleId-urile reale.

---

## 5. TEXTE HARDCODATE (pentru i18n)

- ~300-400 string-uri RO vizibile utilizatorului. Concentrări: `NAV` (~65, ux-sidebar.js:63-137),
  `RAPORT_INFO` (~100+, 13-info-drawer.js), meniul Rapoarte (~30, index.html:1427-1592), 03-ui-panel.js (~20),
  topbar (~15).
- **Avantaj:** textul e deja externalizat în structuri (NAV/RAPORT_INFO) → se mapează direct pe chei i18n.
- **Fazare obligatorie:** Faza 1 = chrome UI (meniu/header/butoane/common) RO/EN/FR/DE; Faza 2 separat =
  conținutul PDF (1556 capitole SPS × 4 limbi → pipeline traducere automată, NU manual).
- Cheie limbă deja existentă: **`urbanx_lang`** în localStorage.

---

## 6. CHEI localStorage (relevante)

Auth/sesiune: `wx_user_id`, `wx_supabase_url`, `wx_supabase_key`, `wx_onboarded`, `ux_session`, `ux_user`.
Acces: `ux_package`. Context: `ux_last_city`, `ux_shortcuts`. Limbă: **`urbanx_lang`**.
Cache/altele: `ux_cache_*`, `tci_scenarios`, `_tci_geocache`, chei API (`fal_/luma_/polycam_/replicate_`).

---

## PLAN ÎN 5 FAZE (revizuit pe baza auditului)

1. **(✓ în mare parte) Mapare accessId→modul** — refolosește `MODULE_OPEN` + `_MOD_INFO_ALIAS`. Rămâne doar
   definirea listelor de `moduleId` per rol.
2. **Roluri pe Supabase** — `role` + `uatSiruta` în user metadata; extinde `_USER` (NU Worker KV / SHA-256).
3. **Strat de filtrare** peste `UXSidebar.NAV` + meniul Rapoarte (ascunde/blochează item după `moduleId` ∈ rol).
   Securitate reală = RLS Supabase + validare token pe proxy (filtrul client-side e doar UX).
4. **i18n Faza 1** — chrome UI în 4 limbi (chei pe NAV/RAPORT_INFO/common); switcher lângă login; `urbanx_lang`.
5. **i18n Faza 2 (separat)** — conținut PDF prin pipeline de traducere automată.

*Cele ~20 funcții NOI din spec (timeline AC, dezmembrări, bilanț verde, fișă tehnică…) → backlog separat,
nu se amestecă cu reorganizarea.*
