# UrbanX — ARCHITECTURE.md
# Generat de Claude Code · 2026-06-22 · Sursă de adevăr pentru prompturile 001–006
# NU modifica manual — regenerează cu promptul 000 dacă repo-ul se schimbă

---

## 1. STACK
- Frontend: Vanilla JS (zero framework)
- Bundler: NICIUNUL — `<script src>` directe, în ordine
- HTML principal: `index.html` (rădăcină, ~300K caractere)
- Încărcare JS: SCRIPT TAGS ÎN ORDINE (213 tag-uri, ne-bundlat, cache-bust `?v=`)
- Backend: NU EXISTĂ server live — client-only pe GitHub Pages. Python doar OFFLINE (`romania_spatial_pipeline.py`, `scripts/*-probe.py`). `urbanx-mobility/` = FastAPI SEPARAT, Faza 2, NEdeployat.
- DB: NU EXISTĂ — date statice `data/`, localStorage pt registre, Supabase opțional (auth)

---

## 2. HARTA — Mapbox GL JS (NU MapLibre)
```javascript
const MAP_VAR  = "window.map";          // window.map.addLayer(...) sau G.map
const MAP_FILE = "js/02-map-core.js";   // const map=new mapboxgl.Map({...}); window.map=map; (l.8)
const MAP_READY_EVENT = "map.on('load', cb)";   // și map.on('style.load')
const MAP_ADD_LAYER_FN = null;          // direct map.addSource(id,..)+map.addLayer({..})
```
Este **Mapbox GL JS v3.11.0**, nu MapLibre (token Mapbox deja configurat). Instanțe secundare cinematic: `TCI.tciMap`, `TCI.mapLeft`. Pentru module → `window.map`.
**REGULĂ:** layere noi → `window.map`; șterge layer ÎNAINTE de source la cleanup.

---

## 3. MECANISMUL DE MODULE
NU există `openPanel()` central. Fiecare modul = IIFE care expune `window.X` cu metoda proprie (`.openPanel()/.open()/.openDashboard()/.openWizard()`).
```javascript
// Pattern overlay (toate modulele): div full-screen creat dinamic
//   ST.overlay='position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;...'
//   ov.onclick=function(e){ if(e.target===ov) ov.remove(); };  // backdrop-close
//   document.body.appendChild(ov);
// Închidere: ov.remove() (backdrop / ✕). GLOBAL: Escape (js/ux-navigation.js) închide modalul de sus.
// Vizual: overlay modal PESTE hartă (harta rămâne dedesubt). Meniurile sunt panouri ancorate sus.
```
**REGULĂ:** modul nou → IIFE `window.X` + overlay propriu (z9000, inset:0, backdrop-close). NU inventa openModule() central.

---

## 4. NAVIGARE & ACCES FUNCȚII
- **Launcher** (`js/ux-launcher.js`, `window.Launcher`): paletă căutabilă cu ~63 funcții grupate + Quick Actions. Deschidere: buton `🔍 Funcții` (bara sus) + **Cmd/Ctrl+K**. PUNCTUL DE ACCES PRINCIPAL.
- Meniuri dropdown: `#tci-adv-menu` ("UrbanX Pro", `_toggleTCIMenu`), `#rapoarte-menu` (`toggleRapoarteMenu`), `#viz-menu`, `#tools-menu`.
- `_closeAllMenusAndOverlay()` (index.html) închide toate meniurile. NU există sidebar lateral.

---

## 5. ORDINEA & STRUCTURA
- 213 `<script src>` ne-bundlat. Dependențe sus (~l.1813), apoi `js/*.js`. Module noi LA FINAL (înainte `</body>`), `?v=YYYYMMDDxx`.
```
index.html · ARCHITECTURE.md · CLAUDE.md
js/*.js (212 fișiere, FLAT) · data/{uat}/ (pug.geojson+reguli.json) · scripts/*.py (test/GIS offline) · urbanx-mobility/ (FastAPI Faza 2)
```
**REGULĂ:** JS noi în `js/` flat; fără foldere noi; script tag la final.

---

## 6. CONVENȚII DE COD
```javascript
const HTML_METHOD  = "innerHTML template literals + document.createElement (mixt)";
const EVENT_METHOD = "onclick inline (meniuri) + .onclick/addEventListener după createElement (module)";
const CSS_PREFIX   = null;          // module UX folosesc id-uri ux-* (ux-launcher, ux-navigation)
const ICON_LIB     = "NU EXISTĂ — EMOJI (🗺 📐 🌿 🏛...) + text";
const CSS_METHOD   = "style inline în JS (obiect ST/modul) + <style> în index.html; fără .css separate";
```
**REGULĂ:** emoji pt iconițe (NU instala librărie), style inline ST, IIFE `(function(G){...})(window)`.

---

## 7. STATE GLOBAL
```javascript
// window.S      : {parcels:[{geo,nrcad,area,utr,params}], activeParcel, multiMode}
// window.TCI    : {cityKey:'RO-IS-01', cityName, _EXTRA_UATS}
// window.REGULI : reguli PUG zona activă · window._RO_CITIES_DB : 31 municipii · window._USER : {email,role} · window.map
// localStorage: ux_last_city, ux_user, ux_session, ux_package, ux_shortcuts, ux_comments_offline,
//   urbanx_* (registre: urbanx_sidu_projects_v2, urbanx_market_tx_v1, urbanx_plati_v1, urbanx_heritage_v1,
//   urbanx_portfolio_v1, urbanx_loisir_catalog_v1, urbanx_simlab_scenarios_v1...), tci_scenarios, ux_cache_*
```
**REGULĂ:** NU suprascrie window.S/TCI/map/REGULI; chei localStorage prefixate `urbanx_`.

---

## 8. BACKEND API
```
BACKEND: NU EXISTĂ server live (client-only). Fetch extern prin Cloudflare Worker:
  https://urbanx-proxy.3dtravelsoftart.workers.dev
    /osm?q=<overpass> → Overpass (rețea OSM reală: OSMStreets/CAU/Flux LOS)
    /inse → INSE TEMPO · /anar → ANAR WMS · /proxy?url= → CORS bypass
urbanx-mobility/ (FastAPI 8001) = Faza 2, nedeployat.
```
**REGULĂ:** fetch extern → proxy; server real (email/plăți/NDVI/atribuire trafic) = „Faza 2" onest.

---

## 9. DEPENDENȚE
```
Mapbox GL JS v3.11.0 (NU MapLibre) · Turf.js v6 · Three.js r128 (fără OrbitControls/CapsuleGeometry)
jsPDF 2.5.1 (+_registerROFont, font DejaVuRO) · proj4js 2.11.0 (Stereo70 EPSG:3844)
html2canvas 1.4.1 · Mapbox GL Draw 1.5.0 · Iconițe: EMOJI
```

---

## 10. MODULE EXISTENTE (window.X, funcționale)
```
Launcher (ux-launcher) · UX nav (ux-navigation) · OSMStreets (osm-streets)
SIDU (sidu — document standalone+registru) · Loisir (+validator+uhi) · Superbloc (real OSM drawReal)
SimLab (10 simulatoare) · Cadastru (Stereo70) · Lotizare (08-lotizare+ansamblu+validator)
Flux (engine+ui, +LOS OSM) · UXI/Intelligence · CAU · Plati (mock) · Market (demo)
Dosar · Sesizari · Notificari · Heritage · Feaz · Invest · Portfolio (6-RAG) · LVC · Carbon · Fisa360 · StudyZone
ORFANE (NU în index.html — NU edita fără re-cablare): massing-render.js, udre-engine.js,
  pipeline.js, udre-confidence.js, 19-tci-modules-patch.js, 20-report-engine.js
```

---

## 11. FUNCȚII GLOBALE
```javascript
_closeAllMenusAndOverlay()  · infoDrawerOpen(key) (js/13-info-drawer.js) · toggleRapoarteMenu() · _toggleTCIMenu(e)
window.Launcher.open()/toggle() · ss(msg) (toast) · _registerROFont(pdf) · showUATSelector()
window.OSMStreets.fetch(center,radiusM) · generate{Solar,Shadow,SSF,Traffic,Water,...}Study()
```

---

## 12. REGULI GLOBALE
1. MAP_VAR = `window.map` (Mapbox v3.11.0)
2. Module = IIFE `window.X` + overlay propriu (ST z9000, backdrop-close); NU openModule() central
3. Scripturi noi LA FINAL în index.html cu `?v=`
4. Fișiere noi în `js/` flat
5. Emoji iconițe, style inline ST, fără librării noi
6. NU suprascrie window.S/TCI/map/REGULI; localStorage prefix `urbanx_`
7. Fetch extern → proxy; server real = Faza 2
8. **VERIFICĂ `grep -c "fisier.js" index.html` ÎNAINTE de a edita un fișier ca feature** — multe sunt orfane (neîncărcate → cod invizibil)
