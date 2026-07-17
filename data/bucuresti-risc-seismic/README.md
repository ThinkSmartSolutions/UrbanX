# Date reale: clădiri cu risc seismic — București

**Sursă:** [DupăCutremur.ro](https://www.dupacutremur.ro/) (Re:Rise — Asociația pentru Reducerea Riscului Seismic + geo-spatial.org), pe baza listei oficiale AMCCRS (Administrația Municipală pentru Consolidarea Clădirilor cu Risc Seismic, Primăria Municipiului București). Licență **CC BY 4.0**.

Export original: 2026-07-14 (`csv`/`kml`/`geojson`, https://drive.google.com/drive/folders/1_OekBhQHSDnPcsmdREjtjoxqBjzCWPL7 via https://bit.ly/seturiDate).

## Fișiere
- `cladiri.geojson` — 2.507 clădiri expertizate (poligon amprentă + clasificare risc seismic Rs1-Rs4 / U1-U3 legacy, adresă, sector, an construire/expertiză, arie desfășurată, regim înălțime). Câmpuri păstrate (subset din exportul original — restul, ex. nume expert/status verificare intern, eliminate pentru dimensiune): `building_uid, adresa, numar, sector, incadrare, niveluri_f, anul_const, anul_exper, nr_apartam, h_3, arie_desfa, estimare_i, regimul_de, verification_status`.
- `strazi-risc-blocaj.geojson` — 2.559 segmente stradale cu risc de blocaj din dărâmături (adiacente clădirilor RS1), din OSM + analiză proprie DupăCutremur.

## Metodologia zonei de colaps (NU stocată — calculată client-side)
Fișierul original mai avea un strat `arii_de_colaps` (poligoane de colaps, 9,9MB) — **nu l-am păstrat**, fiindcă e derivabil direct din `cladiri.geojson` prin regula documentată de sursă: bufferul de colaps = amprenta clădirii extrudată cu `h_3` metri (h_3 = înălțime_estimată/3, deja inclus ca proprietate per clădire). Se calculează în platformă cu `turf.buffer(cladire, h_3, {units:'meters'})` — identic cu sursa, dar fără al doilea fișier greu de 9,9MB.

## Extindere pe alt oraș
Acest dataset e **specific Municipiului București** (AMCCRS e organism al Primăriei Capitalei — nu există un echivalent NAȚIONAL în acest format deschis). Pentru un alt oraș:
1. Verifică dacă primăria/consiliul județean respectiv a publicat o listă oficială a clădirilor încadrate în clasa I de risc seismic (obligație legală, HG 3/1996 + Legea 212/2022, cerută pentru clădirile construite înainte de aprox. 1978 în zone seismice) — de regulă un PDF/tabel pe site-ul primăriei, rareori în format geografic structurat.
2. Dacă lista există: geocodează adresele (sau digitizează amprentele din planul cadastral local), construiește un fișier `data/{uat-id}/cladiri-risc-seismic.geojson` cu ACELEAȘI câmpuri (`incadrare`, `adresa`, `niveluri_f`, `estimare_i`/`h_3` pentru bufferul de colaps) — modulul `js/urbanx-risc-seismic-cladiri.js` e scris generic pe UAT, nu hardcodat pe București.
3. Fără o listă oficială publicată, NU se inventează clasificări — se afișează onest "date indisponibile pentru acest UAT" (regula platformei: date reale sau nimic).
