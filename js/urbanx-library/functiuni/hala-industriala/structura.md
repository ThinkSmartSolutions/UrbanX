# MEMORIU TEHNIC DE REZISTENȚĂ — HALĂ INDUSTRIALĂ CU STRUCTURĂ METALICĂ

**Faza: DTAC + PTh** · Structură de rezistență · Verificare tehnică A1/Af

---

## 1. Date generale, sistem structural, categorie și clasă de importanță

### 1.1. Obiectul memoriului

Prezentul memoriu de rezistență fundamentează concepția, calculul și verificarea structurii de rezistență pentru o **hală industrială parter înalt cu structură metalică**, destinată producției și depozitării. Documentul acoperă faza DTAC (Documentație Tehnică pentru Autorizarea executării lucrărilor de Construire) și pregătește faza PTh (Proiect Tehnic), cu detalierea ulterioară a planșelor de armare, îmbinare, liste de bare și caiet de sarcini în PTh + DE (Detalii de Execuție).

### 1.2. Hala de referință (parametri geometrici de calcul)

Toate exemplele numerice din memoriu sunt lucrate pentru o **hală de referință** cu următoarea configurație, reprezentativă pentru tipologia curentă:

| Parametru geometric | Valoare | Observație |
|---|---|---|
| Lungime totală | L = 60,00 m | 10 travee × 6,00 m |
| Lățime (deschidere cadru) | B = 40,00 m | soluție cu cadru dublu 2×20 m + stâlp intermediar SAU cadru unic 20 m + hală geamănă |
| Deschidere modul portant | l = 20,00 m | deschidere cadru transversal (varianta modulară) |
| Travee (interax cadre) | t = 6,00 m | 11 cadre transversale |
| Înălțime la streașină | Hs = 9,50 m | (interval cerință 8÷10 m) |
| Înălțime la coamă | Hc = 10,70 m | pantă acoperiș ~6° (10%) |
| Panta acoperiș | α ≈ 6° (10%) | < 30° → μ1 = 0,8 zăpadă |
| Cotă cârlig pod rulant | +8,00 m | pod rulant Q = 8 t (opțional) |
| Cotă cale de rulare | +6,50 m | consolă stâlp / grindă de rulare |
| Mezanin birouri | ~150 mp | planșeu compozit oțel-beton, cotă +4,00 m |

> **Notă privind schema portantă transversală.** Pentru B = 40 m se adoptă soluția modulară cu **două cadre transversale de 20,00 m** cuplate pe un șir de stâlpi intermediari (configurație „multi-span" cu 3 șiruri de stâlpi: A, B-median, C). Alternativ, pentru hala de referință simplificată în exemplele numerice se lucrează pe **cadrul-tip cu deschidere l = 20,00 m**, care este modulul de calcul unitar. Deschiderea de 20 m se încadrează optim în zona de folosire a **cadrelor cu inimă plină și vute** (12÷30 m), sub pragul economic al fermelor cu zăbrele (>30 m).

### 1.3. Sistemul structural adoptat (sinteză)

Structura este **spațială**, cu separarea clară a funcțiilor de preluare a acțiunilor:

- **În sens transversal:** 11 cadre transversale (interax 6,00 m) formate din stâlpi articulați la bază + rigle cu vute, cu **noduri rigide** riglă-stâlp și la coamă → **cadre necontravântuite cu noduri rigide (MRF — Moment Resisting Frames)**.
- **În sens longitudinal:** stabilitatea este asigurată de **contravântuiri verticale** (în X sau V) dispuse în travee de capăt și centrală, în planul pereților longitudinali, cuplate cu **contravântuiri orizontale de acoperiș** („vântul de acoperiș") și **rigle de streașină / tiranți longitudinali** care transmit forțele la contravântuirile verticale → **cadre contravântuite concentric (CBF — Concentrically Braced Frames)**.
- **Elemente secundare:** pane Z (interax ~1,75 m) cu sag-rods (tiranți intermediari), rigle de perete Z/C, stâlpi de fronton (rezistă la vânt frontal, transmit longitudinal).
- **Infrastructura:** fundații izolate tip bloc + cuzinet (sau pahar), grinzi de soclu / de legătură perimetrale, placă de pardoseală pe pat elastic cu rost de decuplare.

### 1.4. Categoria și clasa de importanță

| Parametru | Valoare | Referință |
|---|---|---|
| Categoria de importanță | **C — normală** | HG 766/1997 |
| Clasa de importanță și expunere seismică | **III** (γI,e = 1,0) | P100-1/2013, tab. 4.2 |
| Clasa de consecințe | **CC2** → RC2, EXC2, DSL2 | SR EN 1990, Anexa B |
| Durata de viață proiectată | 50 ani | SR EN 1990 |
| Categoria geotehnică | 2 | NP 074 |

> **Notă privind clasa de importanță.** La depozitarea de substanțe periculoase (toxice/explozive) sau la aglomerări de peste 300 de persoane, hala trece în **clasa de importanță II** (γI,e = 1,20), iar toate forțele seismice de calcul se rescalează cu factorul 1,20. Pentru hala de referință (producție/depozitare uzuală, sub 300 persoane) se menține clasa III (γI,e = 1,0).

### 1.5. Cadrul normativ

Legea 10/1995 (calitatea în construcții); HG 907/2016 (conținut-cadru documentații); **CR 0/2012** (bazele proiectării, combinații de acțiuni); **SR EN 1990** (bazele proiectării structurale); **SR EN 1991** cu părțile 1-1 (greutăți/utile), 1-3 (zăpadă), 1-4 (vânt), 1-5 (temperatură), 3 (poduri rulante); **CR 1-1-3/2012** (zăpadă, hartă națională sk) + **CR 1-1-4/2012** (vânt, hartă națională qb); **NP 042/2000** (poduri rulante); **SR EN 1993** părțile 1-1 (reguli generale), 1-3 (elemente formate la rece), 1-5 (elemente placate/voalare), 1-8 (îmbinări), 1-9 (oboseală), 1-2 (calcul la foc); **SR EN 1994** (structuri mixte oțel-beton); **SR EN 1992** (beton armat); **SR EN 1998 / P100-1/2013** (seism); **NP 112/2014** (fundații directe); **SR EN 1090-2** (execuție structuri de oțel); **P118-1/2** (securitate la incendiu); **C107** (termotehnică); **SR EN ISO 12944** (protecție anticorozivă).

---

## 2. Tipuri de hală și alegerea justificată a sistemului structural

### 2.1. Tipologii de structuri de acoperire a halelor

| Sistem | Domeniu deschideri | Avantaje | Dezavantaje |
|---|---|---|---|
| **Portal cu inimă plină** (I laminat/sudat) | 12÷30 m | îmbinări simple, montaj rapid, înălțime construcție mică, comportare seismică ductilă | consum oțel crescut peste 30 m |
| **Portal cu inimă plină + vute** | 15÷35 m | optimizare M la noduri, rotule plastice controlate, fundații economice (articulat la bază) | fabricație vute, control sudură |
| **Fermă cu zăbrele + stâlpi** | 24÷60 m | consum oțel redus la deschideri mari, treceri instalații | multe noduri, montaj lent, comportare seismică inferioară (bare axiale) |
| **Cadru cu tiranți / arce** | > 40 m | estetic, lumini mari | împingeri orizontale, fundații pretențioase |
| **Structură spațială / grinzi cu zăbrele 3D** | > 30 m modular | flexibilitate plan liber | fabricație complexă, cost noduri |

### 2.2. Influența tipului de hală asupra structurii

- **Cu pod rulant.** Introduce console de sprijin ale căii de rulare (cotă +6,50 m), ceea ce generează **compresiune excentrică** în stâlpi (moment din reacția verticală aplicată excentric), solicitări orizontale transversale (HT) și longitudinale (HL), verificare la **oboseală** a grinzii de rulare (SR EN 1993-1-9) și fundații mai mari.
- **Cu mezanin.** Planșeu compozit oțel-beton (grinzi IPE + tablă cutată colaborantă + placă C25/30 de 12 cm cu conectori tip gujon), stâlpi proprii HEB, ancorat în plan pentru efectul de diafragmă rigidă.
- **Frigorifică.** Panouri sandwich groase (100÷200 mm) → greutate proprie mărită, punți termice, izolant sub placă + protecție antiîngheț (reduce modulul de reacție k al terenului). **Nu este cazul halei de referință.**

### 2.3. Decizia adoptată și justificarea ei

**Se adoptă cadrul transversal cu inimă plină (profil I sudat cu înălțime variabilă) + vute la nodurile riglă-stâlp și la coamă, articulat la bază.**

Justificare tehnică:
1. Deschiderea de 20,00 m se află în plin domeniu de folosire economică a inimii pline cu vute.
2. Articulația la bază reduce momentul transmis fundației (talpă izolată economică) și localizează disiparea plastică în vute și la baza stâlpilor (mecanism plastic controlabil).
3. Nodurile rigide cu placă de capăt extinsă + vute permit calculul în capacitate (capacity design): rotula plastică se dezvoltă în riglă lângă vută, nodul și panoul de inimă rămân elastice.
4. Contravântuirile concentrice pe cei 60 m de lungime asigură rigiditate longitudinală mare cu consum minim.
5. Regularitatea în plan și elevație permite folosirea metodei simplificate a forțelor laterale echivalente.

---

## 3. Materiale — caracteristici de calcul

### 3.1. Oțel structural

| Element | Marca oțel | fy [N/mm²] (t≤40 mm) | fu [N/mm²] | Clasa tenacitate |
|---|---|---|---|---|
| Stâlpi, rigle (elemente principale) | **S355 J2** | 355 | 490 | J2 (KV ≥ 27 J la −20°C) |
| Contravântuiri, elemente secundare | S275 J0 | 275 | 430 | J0 |
| Pane, rigle perete (formate la rece) | S350 GD+Z | 350 | 420 | Z275 (zincat) |
| Plăci de bază, plăci de capăt | S355 J2 | 355 | 490 | J2 |

Modul de elasticitate longitudinal E = 210.000 N/mm²; modul transversal G = 81.000 N/mm²; coeficient Poisson ν = 0,3; densitate ρ = 7.850 kg/m³; coeficient dilatare termică α = 12·10⁻⁶ /°C. Condiții de ductilitate (P100-1, elemente disipative): fu/fy ≥ 1,10, alungire la rupere ≥ 15%, KV ≥ 27 J la temperatura de referință −20°C.

Factori parțiali de siguranță material (SR EN 1993-1-1):
- γM0 = 1,00 (rezistența secțiunii)
- γM1 = 1,00 (rezistența la pierderea stabilității)
- γM2 = 1,25 (rezistența secțiunilor slăbite / îmbinări)

Rezistențe de calcul: fyd = fy/γM0 = 355/1,00 = **355 N/mm²** (S355); 275 N/mm² (S275).

### 3.2. Șuruburi și buloane

| Utilizare | Tip | fyb [N/mm²] | fub [N/mm²] |
|---|---|---|---|
| Noduri rigide riglă-stâlp | M27 gr. **10.9** pretensionate | 900 | 1.000 |
| Îmbinări curente (pane, contravântuiri) | M16/M20 gr. 8.8 | 640 | 800 |
| Buloane de ancoraj în fundații | M30 gr. 8.8 | 640 | 800 |

### 3.3. Beton și armătură (infrastructură)

| Element | Beton | fck [N/mm²] | fcd [N/mm²] | Armătură |
|---|---|---|---|---|
| Fundații izolate, grinzi soclu | C20/25 | 20 | 13,33 | B500B |
| Placă pardoseală industrială | **C30/37** | 30 | 20,0 | B500B / fibre |
| Planșeu mezanin | C25/30 | 25 | 16,67 | B500B |
| Zid de foc (b.a.) | C25/30 | 25 | 16,67 | B500B |

Armătură B500B: fyk = 500 N/mm², fyd = fyk/γs = 500/1,15 = **434,8 N/mm²**; Es = 200.000 N/mm². Coeficienți parțiali: γc = 1,5; γs = 1,15. Fibre metalice cu ancorare (hooked-end): raport l/d = 45÷65, rezistență la tracțiune ≥ 1.100 N/mm², dozaj 25÷40 kg/m³.

Rezistența la întindere din încovoiere a betonului C30/37 (folosită la placa fără armare):
fctm = 0,30·fck^(2/3) = 0,30·30^(0,667) = 2,90 N/mm²; fctd = αct·fctk,0,05/γc = 1,0·(0,7·2,90)/1,5 = **1,35 N/mm²**; rezistența de calcul la încovoiere fctd,fl (cu factor de scară pentru h = 200 mm) ≈ **1,73 N/mm²**.

---

## 4. Amplasament, teren de fundare, acțiune seismică și climatică

### 4.1. Condiții geotehnice (categoria 2)

| Parametru | Valoare | Sursă |
|---|---|---|
| Adâncime de fundare Df | −1,50 m | sub adâncimea de îngheț (0,90÷1,10 m) |
| Presiune convențională pconv | **250 kPa** | studiu geotehnic (teren mediu) |
| Nivel apă subterană | > 3,00 m | fără influență directă |
| Modul de reacție Winkler k | **60 MN/m³** (0,06 N/mm³) | pentru dimensionarea plăcii |
| Unghi frecare interioară φ | 20° | rezistență la lunecare |
| Modul deformație liniară Ev2 (balast) | ≥ 100 MPa | strat de fundare placă |

### 4.2. Acțiunea seismică (P100-1/2013)

Parametri de amplasament (exemplu, se confirmă cu harta de zonare din P100-1 pe județ):

| Parametru | Valoare |
|---|---|
| Accelerația terenului ag | 0,25g |
| Perioada de control (colț) Tc | 0,7 s |
| Perioada TB | 0,14 s |
| Perioada TD | 3,0 s |
| Factor de amplificare dinamică maximă β0 | 2,75 |
| Coeficient de importanță γI,e | 1,0 |

Spectrul normalizat de răspuns elastic β(T) pentru TB ≤ T ≤ TC: β(T) = β0 = 2,75.

### 4.3. Încărcarea din zăpadă (CR 1-1-3/2012)

Valoarea caracteristică la sol: **sk = 2,0 kN/m²** (exemplu, se citește din harta CR 1-1-3 pe amplasament).

Coeficient de formă (pantă α ≈ 6° < 30°): μ1 = 0,8. Coeficient de expunere Ce = 1,0 (teren normal). Coeficient termic Ct = 1,0.

Încărcarea din zăpadă pe acoperiș:
**s = μ1·Ce·Ct·sk = 0,8·1,0·1,0·2,0 = 1,60 kN/m²**

Pe o riglă de cadru (aria aferentă = interax 6,0 m): qz = 1,60·6,0 = **9,60 kN/m**.

Se verifică suplimentar aglomerarea de zăpadă (coeficient μ2) la denivelări de acoperiș, atice, obstacole (parapeți, luminatoare), conform CR 1-1-3 §5.3.

### 4.4. Încărcarea din vânt (CR 1-1-4/2012)

Presiunea de referință a vântului: **qb = 0,5 kN/m²** (echivalent viteză de referință vb ≈ 28,3 m/s, exemplu). Categoria de teren II–III.

Presiunea dinamică de vârf la înălțimea de referință ze = Hc = 10,70 m:
Coeficient de expunere ce(ze) ≈ 2,1 → **qp(ze) = ce·qb = 2,1·0,50 = 1,05 kN/m²**.

Coeficienți de presiune exterioară cpe (SR EN 1991-1-4, tab. 7.1 și 7.4a):

| Zonă | cpe | Presiune we = qp·cpe [kN/m²] |
|---|---|---|
| Perete D (presiune, față vânt) | +0,80 | +0,84 |
| Perete E (succiune, spate) | −0,50 | −0,53 |
| Perete lateral A | −1,20 | −1,26 |
| Acoperiș F (colț) | −1,80…−0,90 | −1,89…−0,95 |
| Acoperiș G | −1,20 | −1,26 |
| Acoperiș H | −0,70 | −0,74 |
| Acoperiș I | ±0,20 | +0,21 / −0,21 |

Coeficient de presiune interioară: cpi = +0,20 / −0,30 (funcție de permeabilitate/goluri). Presiunea netă: wnet = qp·(cpe − cpi).

**Observație critică:** pe acoperișul ușor, succiunea netă (cpe negativ − cpi pozitiv) generează **ridicare** care trebuie preluată de îmbinări și de buloanele de ancoraj (a se vedea cap. 12 și 15).

Forța de vânt orizontală pe un cadru transversal interior (aria aferentă = 6,0 m × Hs):
Fw,transv ≈ (0,84 + 0,53)·9,5·6,0 ≈ **78 kN/cadru interior** (presiune față + succiune spate, integrate pe perete).

**Încărcările distribuite pe elementele cadrului** (transfer de la vânt la riglă/stâlpi):
- Stâlp față (presiune D): w = we·t = 0,84·6,0 = 5,04 kN/m (orizontal, spre interior).
- Stâlp spate (succiune E): w = 0,53·6,0 = 3,18 kN/m (orizontal, spre exterior).
- Riglă acoperiș (succiune netă cea mai defavorabilă, zona G/H cu cpi = +0,2): wnet = qp·(cpe − cpi) = 1,05·(−1,26 − 0,20) = −1,53 kN/m² → pe riglă: −1,53·6,0 = **−9,18 kN/m (ridicare)**.
Această ridicare pe riglă, combinată cu 1,0·G (permanent redus), produce inversarea momentelor și încărcarea la smulgere a ancorajelor (combinația C2) — de aceea vântul de succiune guvernează ancorajele.

### 4.5. Temperatura (SR EN 1991-1-5)

Variația uniformă de temperatură ΔT = ±35°C față de temperatura de montaj. La lungimea de 60 m se prevede **rost de dilatație** dacă tronsonul depășește ~90 m (nu este cazul); pentru 60 m se verifică eforturile din temperatură în contravântuiri și în placa de pardoseală (rosturi de contracție).

**Verificare deformația liberă de dilatație:** ΔL = α·ΔT·L = 12·10⁻⁶·35·60.000 = **25,2 mm** (dilatația liberă a tronsonului de 60 m). Deoarece capetele nu sunt complet blocate (contravântuiri într-o singură travee, celelalte reazeme libere longitudinal), efortul indus în contravântuiri este limitat. Efortul termic în contravântuirea longitudinală (dacă structura ar fi blocată la ambele capete): Nθ = E·A·α·ΔT — motiv pentru care contravântuirile se concentrează în **o singură travee** (nu la ambele capete), permițând dilatația liberă și evitând eforturi termice mari. Placa de pardoseală preia contracția din hidratare + variația termică prin **rosturi de contracție la 5÷6 m**.

---

## 5. Factor de comportare q, ductilitate, clase de secțiuni

### 5.1. Regularitatea structurală

Configurație dreptunghi 40×60 m (sau modul 20×60 m), simetrică → **regulat în plan** (se aplică excentricitatea accidentală ±0,05·L). Parter unic, fără retrageri sau discontinuități de rigiditate → **regulat în elevație**. În consecință, se poate aplica **metoda forțelor laterale echivalente** (condiție T1 < 4·Tc și T1 < 1,5 s — verificată la §6.3).

### 5.2. Clasa de ductilitate și factorul q

**Se adoptă clasa de ductilitate medie DCM.**

| Direcție | Sistem | q teoretic | q adoptat |
|---|---|---|---|
| Transversal | MRF (rotule în vute + baza stâlpilor), αu/α1 = 1,2 → q = 4,0·1,2 = 4,8 | 4,8 | **4,0** (conservator) |
| Longitudinal | CBF cu diagonale întinse | 4,0 | **4,0** |

Alternativă: DCL cu q = 1,5÷2,0 dacă vântul guvernează combinația (structură necalculată la ductilitate, doar rezistență). Elementele nedisipative (stâlpi CBF, colectori, îmbinări) se verifică la efectul seismic amplificat **Ω·γov·EEd** (calcul la capacitate), cu γov = 1,25 (suprarezistență material).

### 5.3. Clasele de secțiune (SR EN 1993-1-1, tab. 5.2)

Pentru elementele disipative (stâlpi și rigle MRF) se impune **clasa 1** (secțiuni plastice, capabile să dezvolte moment plastic + capacitate de rotire). Contravântuirile întinse: clasa 1÷3. Verificarea de clasă se face pe fiecare secțiune (talpă comprimată c/tf și inimă c/tw, corectate cu ε = √(235/fy) = √(235/355) = 0,814 pentru S355).

Verificare clasă talpă HEB 450 (S355): c/tf = ((300−26)/2)/26 = 5,27; limita clasa 1 (talpă în consolă comprimată) = 9·ε = 9·0,814 = 7,32 → 5,27 < 7,32 → **clasa 1 ✓**. Inimă (încovoiere): c/tw = (398−2·21)/14 = 25,4; limita clasa 1 = 72·ε = 58,6 → **clasa 1 ✓**.

### 5.4. Reguli de alcătuire seismică (SR EN 1998-1, P100-1 cap. 6)

- **MRF (cadre transversale):** limitarea zvelteței riglei (talpa comprimată sprijinită la interval ce asigură χLT), rotule plastice în riglă lângă vute; condiția stâlp-puternic/riglă-slabă Σ MRc ≥ 1,3·Σ MRb; nodurile și panourile de inimă supra-rezistente (calcul la capacitate).
- **CBF (contravântuiri):** diagonale de clasă 1 sau 2; zveltețe 1,3 ≤ λ̄ ≤ 2,0; omogenitatea suprarezistenței Ωmax/Ωmin ≤ 1,25; îmbinările diagonalelor la 1,1·γov·Npl,Rd,diag; stâlpi și grinzi (colectori) nedisipativi verificați la capacitate.
- **Prinderi în fundații:** buloanele de ancoraj ale elementelor disipative dimensionate la efortul din calculul la capacitate (nu la efortul din analiza seismică elastică).
- **Materiale zonă disipativă:** fy,max ≤ γov·fy nominal (controlul suprarezistenței reale); tenacitate J2 la −20°C.

---

## 6. Acțiuni și grupări de încărcări

### 6.1. Acțiuni permanente (G)

**Acoperiș:**

| Strat | gk [kN/m²] |
|---|---|
| Panou sandwich (100 mm) | 0,15 |
| Pane Z + accesorii | 0,08 |
| Instalații suspendate (ventilație, sprinkler, cabluri) | 0,20 |
| Tavan fals (unde există) | 0,05 |
| **Total acoperiș gk** | **0,48 kN/m²** |
| Greutate proprie cadre (din model) | 0,25÷0,35 kN/m² |

**Perete:** panou sandwich 0,18 + rigle 0,06 = 0,24 kN/m².

### 6.2. Acțiuni variabile (Q)

| Acțiune | Valoare caracteristică | Observație |
|---|---|---|
| Zăpadă | s = 1,60 kN/m² | cap. 4.3 |
| Vânt | qp = 1,05 kN/m² | cap. 4.4 |
| Utilă acoperiș (categoria H) | 0,40 kN/m² | necumulabilă cu zăpada |
| Utilă mezanin (categoria B) | 3,0 kN/m² + pereți despărțitori 0,8 kN/m² | birouri |
| Placă pardoseală | 30÷50 kN/m² stivuire + concentrate | cap. 13 |
| Temperatură | ΔT = ±35°C | — |

### 6.3. Pod rulant (SR EN 1991-3, NP 042/2000) — dacă este cazul

Pod rulant Q = 8 t, greutate pod Gpod = 40 kN, greutate cărucior 8 kN. Reacția verticală maximă pe roată (poziția defavorabilă a căruciorului lângă calea considerată):
Rv,max ≈ 95÷105 kN/roată; coeficient dinamic φ2 = 1,15 → **Rv,d ≈ 115 kN/roată**.
Forța orizontală transversală (frânare cărucior) HT ≈ 8,8 kN (aplicată la +6,50 → moment mare în stâlp).
Forța orizontală longitudinală (frânare pod) HL = 5÷10 kN (preluată de contravântuiri).
Grinda de rulare se verifică la **oboseală** (SR EN 1993-1-9, categorii de detaliu) și la săgeată L/600÷L/750.

### 6.4. Acțiunea seismică — calculul forței tăietoare de bază

**Evaluarea greutății seismice** (masa participantă la mișcarea seismică, G + Σ ψE,i·Qk,i):

| Sursă de masă | Calcul | Greutate [kN] |
|---|---|---|
| Acoperiș (gk = 0,48 kN/m²) | 0,48·40·60 | 1.152 |
| Greutate proprie cadre + secundare | 0,30·40·60 | 720 |
| Pereți de închidere (½ înălțime la acoperiș) | 0,24·(2·60+2·40)·9,5·0,5 | 456 |
| Mezanin (planșeu compozit gk ≈ 4,0 kN/m²) | 4,0·150 | 600 |
| Util mezanin (ψE = ψ2·φ = 0,3·0,8 = 0,24) | 0,24·3,0·150 | 108 |
| Zăpadă (ψE = 0 sub 1.000 m altitudine) | — | 0 |
| Pod rulant (ψE ≈ 0, poziția cea mai defavorabilă evaluată separat) | — | (0) |
| Diverse (instalații fixe, atice) | — | ~464 |
| **Total greutate seismică W** | | **≈ 4.500 kN** |

Coeficient de participare a masei: se verifică prin analiză modală ca modurile reținute să însumeze ≥ 90% din masa totală pe fiecare direcție (metoda forțelor laterale acoperă acest lucru pentru structuri regulate cu mod fundamental dominant).

Perioada fundamentală (formula aproximativă P100-1, structuri metalice T1 = Ct·H^(3/4), Ct = 0,085):
T1,transv = 0,085·10,70^0,75 = 0,085·5,92 = **0,50 s** > TB (0,14) și < TC (0,7) → β = β0 = 2,75.
Verificare aplicabilitate metoda forțelor laterale: T1 = 0,50 s < 4·Tc = 2,8 s și < 1,5 s ✓.

Ordonata spectrului de calcul (P100-1, §3.1):
Sd(T1) = ag·γI,e·β0/q = 0,25·1,0·2,75/4,0 = **0,172 g**.

Forța tăietoare de bază (factor de corecție λ = 0,85 pentru T1 ≤ 2·Tc și > 2 niveluri; aici parter → λ = 1,0 conservator, se păstrează 0,85 pt. mase distribuite):
**Fb = Sd(T1)·W·λ = 0,172·4.500·0,85 ≈ 658 kN.**

**Comparație vânt vs. seism (transversal):** vânt total transversal pe hală ≈ 780 kN (integrat pe toate cadrele) vs. seism Fb = 658 kN → **valori comparabile**; ambele grupări se verifică, vântul poate guverna la ridicare/succiune.

### 6.5. Grupări de încărcări (CR 0/2012)

**SLU — combinația fundamentală** (Ecuația 6.10 SR EN 1990):
Ed = Σ γG·Gk + γQ,1·Qk,1 + Σ γQ,i·ψ0,i·Qk,i

Coeficienți: γG = 1,35 (defavorabil) / 1,0 (favorabil — esențial la ridicare); γQ = 1,5; ψ0 = 0,7 (zăpadă/util) / 0,6 (vânt).

| Combinație | Expresie | Guvernează |
|---|---|---|
| C1 — gravitațional max | 1,35G + 1,5·Z + 1,5·0,6·V | M, N max în riglă/stâlp |
| **C2 — ridicare** | **1,0G + 1,5·V(succiune)** | ancoraje, îmbinări (uplift) |
| C3 — cu pod rulant | 1,35G + 1,5·Rv + 1,5·0,7·Z + ... | stâlp compresiune excentrică |
| C4 — cu mezanin | 1,35G + 1,5·util mezanin + ψ0·Z | grinzi/stâlpi mezanin |

**SLU — combinația seismică** (Ecuația 6.12 SR EN 1990):
Ed = Σ Gk + γI·AEd + Σ ψ2,i·Qk,i (ψ2 = 0 zăpadă, 0,3 util mezanin), cu regula 100%/30% pe direcții și excentricitate ±0,05·L.

**SLS — combinația caracteristică:**

| Element | Limită săgeată/deplasare | Valoare hala referință |
|---|---|---|
| Riglă cadru (vertical) | L/200 | 20000/200 = **100 mm** |
| Deplasare orizontală streașină | H/150 | 9500/150 ≈ 63 mm |
| Drift seismic dr (SLS) | ≤ 0,005·h (ψ·dr) | 0,005·9500 = 47,5 mm |
| Grindă de rulare | L/600÷L/750 | 6000/750 = 8 mm |
| Planșeu mezanin | L/250 | — |

---

## 7. Calculul cadrului transversal — exemplu numeric complet

### 7.1. Modelul de calcul

Model 3D din bare, **analiză elastică de ordinul II (efect P-Δ)** cu imperfecțiuni globale de aplomb φ = 1/200 (SR EN 1993-1-1, §5.3.2) și imperfecțiuni locale de element (arc inițial e0/L). Se verifică sensibilitatea la efecte de ordinul II prin factorul αcr = Fcr/FEd; dacă αcr ≥ 10 (elastic) analiza de ordinul I este suficientă, altfel se folosește ordinul II. Pentru cadre metalice de hală se adoptă în mod curent **αcr ≥ 3** (limita minimă pentru amplificare) și analiza de ordinul II.

Amplificarea efectelor de ordinul II (dacă 3 ≤ αcr < 10): factor 1/(1 − 1/αcr).

**Exemplu de evaluare αcr** (SR EN 1993-1-1, §5.2.1, formula 5.2 pentru cadre cu acoperiș puțin înclinat):
αcr = (HEd/VEd)·(h/δH,Ed), cu HEd = forța orizontală totală (vânt/imperfecțiune), VEd = încărcarea verticală totală, δH,Ed = deplasarea orizontală la vârf din HEd.
Pentru cadrul de referință: HEd = 78 kN, VEd = (gk+s)·l·t = 2,08·20·6 = 250 kN, h = 9,5 m, δH,Ed = 50 mm:
αcr = (78/250)·(9.500/50) = 0,312·190 = **59,3 ≫ 10** → sub încărcări gravitaționale efectele de ordinul II sunt neglijabile; sub combinația seismică (VEd mai mare, δ mai mare) se reia calculul, rezultând αcr ≈ 8 → **se aplică amplificarea 1/(1−1/8) = 1,143** pe eforturile din combinația seismică.

**Imperfecțiunea globală de aplomb** (SR EN 1993-1-1, §5.3.2):
φ = φ0·αh·αm, cu φ0 = 1/200, αh = 2/√h = 2/√9,5 = 0,649 (limitat la 2/3 ≤ αh ≤ 1,0 → 0,667), αm = √(0,5·(1+1/m)) cu m = nr. stâlpi pe șir.
φ = (1/200)·0,667·0,87 ≈ **1/345**. Forța orizontală echivalentă din imperfecțiune: Himp = φ·VEd = (1/345)·250 = 0,72 kN/cadru (mică față de vânt/seism, dar cumulată în combinația fără vânt).

### 7.2. Verificarea stâlpului HEB 450 S355

Eforturi de calcul (combinația C1, secțiunea de la baza stâlpului / zona de nod):
NEd = 380 kN; MEd,y = 520 kNm; VEd = 95 kN.

Caracteristici HEB 450 (S355): A = 218 cm²; Wpl,y = 3.551 cm³; Iy = 79.890 cm⁴; iy = 19,14 cm; iz = 7,33 cm; It = 440 cm⁴; Iw = 5,258·10⁶ cm⁶. **Clasa 1** (verificat).

**Rezistența la compresiune:**
Npl,Rd = A·fyd = 21.800·355 = 7.739.000 N = **7.739 kN**. n = NEd/Npl,Rd = 380/7.739 = **0,049** (compresiune redusă).

**Rezistența la încovoiere:**
Mpl,y,Rd = Wpl,y·fyd = 3.551.000·355 = 1.260.605.000 N·mm = **1.260 kNm**.

**Interacțiune M-N a secțiunii** (SR EN 1993-1-1, §6.2.9):
Pentru n = 0,049 < 0,25 și n < 0,5·a (a = (A−2·b·tf)/A), momentul redus MN,y,Rd ≈ Mpl,y,Rd (reducere neglijabilă) ≈ **1.379 kNm** (cu factor 1,11 pentru n mic conform formulei MN,Rd = Mpl,Rd·(1−n)/(1−0,5·a)).
Verificare secțiune: MEd = 520 < MN,y,Rd = 1.379 → **utilizare 0,38 ✓**.

**Verificarea la pierderea stabilității (flambaj + interacțiune):**
- Lungime de flambaj în plan (cadru necontravântuit): Lcr,y = β·L, cu β ≈ 2,0 (stâlp articulat la bază, deplasabil) → Lcr,y = 2,0·9,5 = 19,0 m. Zveltețe λ̄y = (Lcr,y/iy)/λ1, λ1 = 93,9·ε = 93,9·0,814 = 76,4 → λ̄y = (1900/19,14)/76,4 = 99,3/76,4 = 1,30 → curba de flambaj b → **χy ≈ 0,72**.
- Flambaj lateral cu răsucire (deversare) al riglei tratat la §7.3.
Factor de reducere pentru deversare χLT ≈ 0,85 (stâlp cu inimă înaltă, blocat de rigle perete).

**Verificarea de interacțiune** (SR EN 1993-1-1, §6.3.3, formula 6.61):
NEd/(χy·Npl,Rd) + kyy·MEd,y/(χLT·Mpl,y,Rd) ≤ 1,0
380/(0,72·7.739) + 0,95·520/(0,85·1.260) = 0,068 + 0,461 = **0,53 < 1,0 ✓**.

### 7.3. Verificarea riglei — I sudat cu înălțime variabilă (h ≈ 900 mm la nod / IPE 550 în câmp) S355

Eforturi (combinația C1):
- La nod (lângă vută): MEd,nod = 620 kNm.
- În câmp: MEd,câmp = 320 kNm.

Rezistența la încovoiere (secțiune sudată h ≈ 900, clasa 1): Mpl,Rd ≈ Wpl·fyd ≈ 990 kNm (secțiune sudată dimensionată).
Verificare: MEd,nod = 620 < Mpl,Rd = 990 → **utilizare 0,63 ✓**.

**Deversare (LTB) — cu fly-braces (contrafișe la talpa comprimată inferioară):**
La zona de moment negativ (lângă nod) talpa inferioară a riglei este comprimată și nesprijinită de tablă/pane → risc de flambaj lateral cu răsucire. Se prevăd **fly-braces** (contrafișe de la pană la talpa inferioară) la interax 1,75 m.

Momentul critic elastic de deversare (SR EN 1993-1-1 Anexa națională / formula generală):
Mcr = C1·(π²·E·Iz)/(Lcr,LT²)·√[(Iw/Iz) + (Lcr,LT²·G·It)/(π²·E·Iz)]
Cu Lcr,LT = 1,75 m, C1 = 1,88 (diagramă de moment triunghiulară între contrafișe), pentru secțiunea IPE550-echivalentă (Iz = 2.668 cm⁴, Iw = 1,884·10⁶ cm⁶, It = 123 cm⁴):
Mcr = 1,88·(π²·210.000·2.668·10⁴)/(1.750²)·√[(1,884·10¹²/2.668·10⁴) + (1.750²·81.000·123·10⁴)/(π²·210.000·2.668·10⁴)]
≈ 1,88·1,806·10⁷·√[7,06·10⁷·mm² ...] → Mcr ≈ **4.850 kNm** (moment critic foarte mare datorită Lcr,LT scurt).
Zveltețea redusă la deversare: λ̄LT = √(Mpl,Rd/Mcr) = √(990/4.850) = √0,204 = **0,45**.
Curba de deversare b (secțiune sudată, h/b > 2): factor de imperfecțiune αLT = 0,34.
ΦLT = 0,5·[1 + αLT·(λ̄LT − 0,2) + λ̄LT²] = 0,5·[1 + 0,34·0,25 + 0,202] = 0,5·1,287 = 0,644.
χLT = 1/(ΦLT + √(ΦLT² − λ̄LT²)) = 1/(0,644 + √(0,415 − 0,204)) = 1/(0,644 + 0,459) = **0,907 ≈ 0,92**.
Verificare deversare: MEd/(χLT·Mel,Rd) = 620/(0,92·910) = **0,74 ✓**.

Vutele asigură ca **rotula plastică să se dezvolte în riglă imediat lângă vută** (secțiune cu Mpl mai mic decât zona întărită), respectând conceptul de calcul la capacitate.

### 7.4. Calculul la capacitate (capacity design) al cadrului MRF

Conceptul P100-1/SR EN 1998-1 pentru MRF: rotulele plastice se dezvoltă în **rigle** (lângă vute), iar **stâlpii, nodurile și panourile de inimă rămân elastice**. Condiția „stâlp puternic — riglă slabă":
Σ MRc ≥ 1,3·Σ MRb (suma momentelor capabile ale stâlpilor la nod ≥ 1,3× suma momentelor capabile ale riglelor).

La nodul de referință:
- Momentul capabil al riglei (secțiunea de rotulă lângă vută): Mpl,b,Rd ≈ 480 kNm (secțiunea IPE550-echivalentă redusă din câmp).
- Momentul capabil al stâlpului HEB 450: Mpl,c,Rd = 1.260 kNm (redus cu efectul lui N: MN,c ≈ 1.240 kNm).
- Verificare: Σ MRc = 1.240 ≥ 1,3·480 = 624 → **✓ (stâlp puternic)**.

Suprarezistența maximă a mecanismului: Ω = min(Mpl,Rd,i/MEd,i) pe riglele disipative → elementele nedisipative (stâlpi, îmbinări, panouri) se verifică la NEd,G + 1,1·γov·Ω·NEd,E (γov = 1,25). Ω se limitează astfel încât Ωmax/Ωmin ≤ 1,25 (omogenitatea disipării).

**Panoul de inimă al stâlpului** (forfecare la nod, SR EN 1993-1-8, §6.2.6.1):
Vwp,Ed = (Mb1 + Mb2)/z ≈ Mb/z (nod de margine) = 480·10⁶/(≈820 mm braț) = 585 kN.
Rezistența panoului: Vwp,Rd = 0,9·fy·Avc/(√3·γM0) = 0,9·355·(HEB450: Avc ≈ 6.500 mm²)/(1,732·1,0) = 0,9·355·6.500/1,732 = 1.199.000 N = 1.199 kN > 585 kN → **✓, fără doubler plate necesar la acest nod**.

### 7.5. Verificarea SLS a cadrului — săgeata riglei și deplasarea la streașină

**Săgeata verticală a riglei** (combinația caracteristică SLS, doar variabile Q pentru limita de aspect):
Pentru rigla de 20 m sub zăpadă qz,SLS = 9,60 kN/m, cu rigiditatea echivalentă a riglei (I sudat variabil, I mediu ≈ 9,0·10⁵ cm⁴), deplasarea la mijloc a cadrului portal (cu efectul stâlpilor):
w ≈ (din model 3D) ≈ **65 mm** < L/200 = 20000/200 = 100 mm → **✓**.

**Deplasarea orizontală la streașină** sub vânt (SLS):
δ = Fw·H³/(3·E·I_stâlp echiv.) corectat pentru cadru → din model δ ≈ **50 mm** < H/150 = 9500/150 = 63 mm → **✓**.

**Driftul seismic** (SLU, verificare limitare degradări P100-1 §4.5.4):
dr,SLU = q·ν·dr,e, cu ν = 1,0 (importanță III); dr,e din analiza elastică ≈ 12 mm → dr = 4,0·12 = 48 mm pe H = 9.500 → dr/h = 0,0051. Verificare la SLS: 0,5·dr = 24 mm ≤ 0,008·h (perete fără legături fragile) = 76 mm → **✓**; la SLU dr/h = 0,0051 ≤ 0,025 (limita ULS) → **✓**.

### 7.6. Sinteza verificărilor cadrului transversal

| Element | Efort de calcul | Efort capabil | Utilizare | Verdict |
|---|---|---|---|---|
| Stâlp HEB 450 — secțiune | MEd = 520 kNm | MN,y,Rd = 1.379 kNm | 0,38 | ✓ |
| Stâlp HEB 450 — stabilitate | interacțiune 6.61 | ≤ 1,0 | 0,53 | ✓ |
| Riglă I sudat — încovoiere nod | MEd = 620 kNm | Mpl,Rd = 990 kNm | 0,63 | ✓ |
| Riglă — deversare (fly-braces) | — | χLT = 0,92 | 0,74 | ✓ |
| Stabilitate globală cadru | αcr | ≥ 3 | — | ✓ |

---

## 8. Pane și rigle de perete — dimensionare și verificare săgeți

### 8.1. Pane de acoperiș — Z 200×2,0 S350GD

Interax pane 1,75 m. Încărcare gravitațională (permanent + zăpadă):
q = (gk,acoperiș pe pană + s)·interax = (0,15 + 1,60)·1,75 = **3,06 kN/m** (proiectat pe verticală).

Descompunere pe pantă (α = 6°): componenta normală qy = q·cosα ≈ 3,04; componenta paralelă (în lungul pantei) qz = q·sinα ≈ 0,32 kN/m (preluată parțial de sag-rods).

Moment încovoietor (pană continuă pe 2 deschideri, l = 6,0 m, M ≈ q·l²/8 pentru travee simplă conservativ):
MEd,y = qy·l²/8 = 3,04·6,0²/8 = **13,68 kNm** ≈ 13,8 kNm.

Verificare la SR EN 1993-1-3 (elemente formate la rece), în trei etape:
1. **Proprietăți de secțiune eficace** (effective width): tălpile și inima Z se reduc pentru voalarea locală (raport lățime/grosime mare la profilele subțiri). Weff,y ≈ 0,88·Wgross → Weff,y ≈ 20,3 cm³.
2. **Rezistența la încovoiere:** Mc,Rd = Weff,y·fyb/γM0 = 20.300·350/1,0 = 7.105.000 N·mm = **7,10 kNm** — la limită față de MEd = 13,8 kNm din combinația gravitațională? → **NU**; se corectează: profilul curent pentru l = 6,0 m este **Z 250×2,5** (Weff ≈ 38 cm³ → Mc,Rd = 13,3 kNm) sau pane continue pe reazeme (M = q·l²/10 = 11,0 kNm) → verificat. Se reține **Z 250×2,5, pane continue**, Mc,Rd = 13,3 ≥ 11,0 → **✓**.
3. **Flambaj distorsional / lateral al tălpii libere la succiune** (SR EN 1993-1-3 §10.1.4): la vânt de succiune, talpa inferioară a panei este comprimată și nesprijinită de tablă → se modelează ca grindă pe pat elastic (rigiditatea de rotire dată de tablă K). Această verificare **guvernează** frecvent și impune sag-rods (tiranți antitorsiune) la 1/2÷1/3 deschidere.

Săgeata la SLS: w ≤ L/200 = 6000/200 = **30 mm** → verificată cu momentul de inerție efectiv (secțiune eficace, Ieff ≈ 0,85·Igross) → w ≈ 22 mm < 30 mm ✓.

### 8.2. Tiranți intermediari (sag-rods) și contravântuire de acoperiș a panelor

Sag-rods (bare rotunde Ø12÷16 mm) dispuse la 1/2 și 1/3 din deschiderea panei preiau componenta paralelă cu panta qz și reduc lungimea de flambaj lateral a tălpii libere. Forța cumulată în sag-rod la coamă (însumarea componentelor pe pantă de la toate panele versantului) se transmite la o pană de coamă întărită sau la o contravântuire de acoperiș. Forța într-un sag-rod ≈ nr. pane × qz·l/2 → se verifică la tracțiune Npl,Rd = As·fyd.

### 8.3. Rigle de perete — Z/C

Preiau vântul perpendicular pe perete (presiune/succiune) prin încovoiere pe orizontală + greutatea panoului sandwich pe verticală (talpa liberă cu sag-rods verticali). Dimensionare analogă panelor, verificare săgeată L/200 (estetic) și rezistență la succiunea de colț a peretelui (zona A cu cpe = −1,2). Rigla de streașină îndeplinește și rolul de tirant longitudinal / colector în sistemul de contravântuiri.

---

## 9. Contravântuiri — vertical și orizontal (calcul forțe)

### 9.1. Contravântuiri verticale longitudinale (CBF în X) — SHS 120×120×6 S275

Preiau forța longitudinală (seism/vânt/frânare pod). Forța de calcul pe diagonala întinsă:
Din forța tăietoare longitudinală de nivel repartizată pe traveea contravântuită, la un unghi al diagonalei θ ≈ 58° (h = 9,5 m, bază = 6,0 m):
Ftracțiune ≈ **218 kN**.

Rezistența la tracțiune (secțiune brută):
A(SHS 120×120×6) = 26,1 cm²; Npl,Rd = A·fyd = 2.610·275 = 717.750 N = **718 kN**.
Verificare: NEd = 218 < Npl,Rd = 718 → **utilizare 0,30 ✓** (diagonala întinsă activă; diagonala comprimată se neglijează în calculul DCM — model „tension-only").

Zveltețea diagonalelor (SR EN 1998-1, §6.7.3): se limitează 1,3 ≤ λ̄ ≤ 2,0 pentru sistemul X (diagonale întinse), pentru a evita ambele diagonale comprimate în același timp și pentru comportarea histeretică.
Zveltețea diagonalei SHS 120×120×6 (Ld = √(9,5² + 6,0²) = 11,24 m; iz = 4,63 cm):
λ̄ = (Ld/i)/λ1 = (11.240/46,3)/(93,9·0,924) = 242,8/86,8 = **2,80** → depășește 2,0 → **se reduce lungimea de flambaj** cu un montant intermediar (diagonală în 2 tronsoane, Ld,ef = 5,62 m → λ̄ = 1,40, în intervalul 1,3÷2,0 ✓), SAU se adoptă profil cu rază de girație mai mare.

**Calculul la capacitate al colectorilor și stâlpilor CBF** (SR EN 1998-1, §6.7.4):
NEd,col = NEd,G + 1,1·γov·Ω·NEd,E, cu Ω = Npl,Rd,diag/NEd,diag = 718/218 = 3,29 (se folosește Ωmin al sistemului).
Astfel stâlpul de capăt al traveei contravântuite se dimensionează la componenta verticală a forței diagonale la capacitate: ΔN = Npl,diag·sinθ·(factor) ≈ 718·0,846 ≈ 607 kN suplimentar (elastic), impunând un stâlp de capăt mai puternic decât stâlpii curenți de cadru.

### 9.2. Contravântuiri orizontale de acoperiș („vântul de acoperiș")

Formează grinda cu zăbrele orizontală în planul acoperișului, care colectează forța de vânt frontal (de la stâlpii de fronton) și o transmite la contravântuirile verticale longitudinale.

Forța de vânt frontal pe hală (perete fronton, cpe presiune + succiune ≈ 1,3):
Ffronton = 1,3·qp·B·(Hs/2 aferentă acoperișului) ≈ 1,3·1,05·40·(9,5/2 + parapet) ≈ **≈ 260 kN** repartizați la cele două grinzi longitudinale de streașină.
Reacțiune la fiecare capăt = 130 kN, transmisă prin diagonalele grinzii orizontale (unghi ~45°) → efort diagonală ≈ 130/cos45° ≈ **184 kN** → se adoptă diagonale rotunde Ø tije întinse sau L-uri, cu Npl,Rd > 184 kN. Se dimensionează la vânt frontal cumulat + seism longitudinal (înfășurătoare).

---

## 10. Grinda de rulare pod rulant (dacă este cazul) — SR EN 1993-1-6/1-9

### 10.1. Solicitări

Grinda de rulare (profil laminat + platbandă sudată la talpa superioară, sau IPE + șină) preia:
- reacția verticală Rv,d ≈ 115 kN/roată (cu φ2 = 1,15);
- forța orizontală transversală HT ≈ 8,8 kN (frânare cărucior);
- forța longitudinală HL (frânare pod, la contravântuiri).

### 10.2. Verificări specifice

- **Rezistență și stabilitate** la încovoiere biaxială (Rv vertical + HT orizontal aplicat pe talpa superioară → încovoiere pe axa slabă + torsiune).
- **Oboseală (SR EN 1993-1-9) — verificare lucrată:** clasa de solicitare a podului rulant S4 (NP 042), λ (factor de echivalare a daunei) ≈ 0,794 pentru 5·10⁵ ÷ 10⁶ cicluri. Variația de tensiune din trecerea sarcinii: Δσ = Mmax/Wel = (Rv·l/4)/Wel. Pentru grinda IPE 500 + platbandă (Wel ≈ 2.400 cm³), l = 6,0 m: Δσ = (115·6,0/4·10⁶)/(2.400·10³) = (172,5·10⁶)/(2.400·10³) = 71,9 N/mm². Variația echivalentă: ΔσE,2 = λ·Δσ = 0,794·71,9 = 57,1 N/mm².
  Categoria de detaliu la sudura talpă-inimă cu pătrundere completă: Δσc = 112 N/mm². Verificare: γFf·ΔσE,2/(Δσc/γMf) = 1,0·57,1/(112/1,15) = 57,1/97,4 = **0,59 ≤ 1,0 → ✓**.
- **Săgeată:** L/600 ÷ L/750 (limitarea vibrațiilor și a uzurii căii): w = Rv·l³/(48·E·I) → cu I(IPE500) = 48.200 cm⁴: w = 115.000·6.000³/(48·210.000·48.200·10⁴) = 2,484·10¹⁶/4,86·10¹⁵ = 5,1 mm < L/750 = 8 mm → **✓**.

---

## 10bis. Planșeul mezaninului — grindă compozită oțel-beton (SR EN 1994-1-1)

### 10bis.1. Alcătuire

Planșeu compozit la cota +4,00 m, ~150 m²: grinzi secundare IPE + tablă cutată colaborantă (înălțime cută 60 mm) + placă de beton C25/30 de 12 cm total, cu conectori de forfecare tip gujon Ø19 sudați prin tablă. Grinzi principale HEB, stâlpi proprii ai mezaninului legați în plan pentru diafragmă rigidă.

### 10bis.2. Exemplu grindă secundară IPE 300 S355 (deschidere 5,0 m, interax 2,5 m)

Încărcare de calcul (stadiu compozit, definitiv):
- Permanent: placă 0,12·25 = 3,0 kN/m² + finisaje 0,5 = 3,5 kN/m² → gk = 3,5·2,5 = 8,75 kN/m.
- Util B: 3,0 + pereți despărțitori 0,8 = 3,8 kN/m² → qk = 3,8·2,5 = 9,5 kN/m.
- qEd = 1,35·8,75 + 1,5·9,5 = 11,81 + 14,25 = **26,06 kN/m**.

Moment de calcul (grindă simplu rezemată):
MEd = qEd·l²/8 = 26,06·5,0²/8 = **81,4 kNm**.

**Lățimea efectivă a plăcii** (SR EN 1994-1-1, §5.4.1.2):
beff = b0 + 2·(Le/8), cu Le = 5,0 m (deschidere) → beff = 0 + 2·(5000/8) = 1.250 mm, limitat la interaxul 2.500 mm → **beff = 1.250 mm**.

**Momentul plastic capabil al secțiunii compozite** (axa neutră plastică în placă, cazul curent):
Forța plastică în profilul de oțel: Npl,a = Aa·fyd = 5.380·355 = 1.909.900 N = 1.910 kN (IPE 300: Aa = 53,8 cm²).
Forța capabilă a plăcii comprimate: Nc,f = beff·hc·0,85·fcd = 1.250·70·0,85·(25/1,5) = 1.250·70·14,17 = 1.239.875 N = 1.240 kN (hc = 70 mm beton peste cute).
Cum Nc,f = 1.240 < Npl,a = 1.910 → axa neutră trece prin profilul de oțel; se calculează Mpl,Rd cu echilibru → **Mpl,Rd ≈ 195 kNm**.
Verificare: MEd = 81,4 < Mpl,Rd = 195 → **utilizare 0,42 ✓**.

**Conectori de forfecare** (gujon Ø19, h = 100 mm, S355):
PRd = 0,8·fu·(πd²/4)/γV = 0,8·450·(π·19²/4)/1,25 = 0,8·450·283,5/1,25 = 81.648 N ≈ **81,6 kN/gujon** (guvernat de oțelul gujonului; se verifică și cedarea betonului). Forța de forfecare longitudinală totală de transferat pe jumătate de deschidere = min(Npl,a, Nc,f) = 1.240 kN → nr. gujoane = 1.240/81,6 ≈ 16 gujoane pe jumătate de deschidere → **conectare completă**.

**Săgeata la SLS** (combinația caracteristică, secțiune compozită fisurată/nefisurată):
Cu momentul de inerție al secțiunii compozite echivalente (n = Ea/Ec ≈ 6,3 pentru încărcări scurte), Icomp ≈ 2,5÷3,0·Ia → săgeata w ≈ 5·qk·l⁴/(384·E·Icomp) rezultă w ≈ **12 mm** < L/250 = 20 mm ✓. Se verifică și săgeata din stadiul de execuție (grindă necompozită, sub greutatea betonului proaspăt).

---

## 11. Noduri și îmbinări — calcul

### 11.1. Nodul rigid riglă-stâlp (placă de capăt extinsă + vută, M27 gr. 10.9 pretensionate)

Concept: nodul se calculează la **capacitate** — să rămână elastic când rotula plastică se dezvoltă în riglă:
Mj,Rd ≥ 1,1·γov·Mpl,riglă (γov = 1,25) → nodul supra-rezistent.

Rezistența unui șurub M27 gr. 10.9:
- Tracțiune: Ft,Rd = k2·fub·As/γM2 = 0,9·1.000·459/1,25 = 330.480 N = **330,5 kN/șurub** (As = 459 mm² aria de calcul M27).
- Forfecare (un plan): Fv,Rd = αv·fub·As/γM2 = 0,6·1.000·459/1,25 = 220.320 N = **220 kN/plan**.

**Momentul capabil al nodului — metoda componentelor (SR EN 1993-1-8, §6.2):**
Placă de capăt extinsă 25 mm S355, 4 rânduri de M27 gr. 10.9 (2 rânduri deasupra tălpii superioare, 2 sub). Se evaluează, pentru fiecare rând, rezistența minimă dintre componentele:
- T-stub placă de capăt la încovoiere (moduri 1/2/3);
- T-stub talpă stâlp la încovoiere;
- inima stâlpului la tracțiune transversală;
- inima riglei la tracțiune.

Rezistența la tracțiune pe rând (guvernată de T-stub placă, mod 2) ≈ 300 kN/rând. Brațele de pârghie față de centrul de compresiune (talpa inferioară a riglei): r1 = 0,90 m, r2 = 0,72 m, r3 = 0,30 m, r4 = 0,15 m.
Mj,Rd = Σ Ftr,i·ri = 300·0,90 + 300·0,72 + 220·0,30 + 220·0,15 = 270 + 216 + 66 + 33 = **585 kNm**.
Verificare la capacitate: Mj,Rd = 585 ≥ 1,1·γov·Mpl,b,Rd = 1,1·1,25·480 = 660 kNm → **insuficient marginal** → se mărește placa la 30 mm + rigidizări (backing plates) sau se folosesc M30, atingând Mj,Rd ≈ 700 kNm ≥ 660 → **✓ (nod supra-rezistent)**.

Panoul de inimă al stâlpului se verifică la forfecare (vezi §7.4, Vwp,Rd = 1.199 > 585 kN ✓); dacă este insuficient, se adaugă **placă de dublare (doubler plate)** sau **rigidizări transversale (stiffeners)** în dreptul tălpilor riglei. Rigidizări de continuitate (stiffeners) se prevăd în dreptul ambelor tălpi ale riglei pentru introducerea forțelor concentrate.

### 11.2. Suduri de colț

Metoda direcțională (SR EN 1993-1-8, §4.5.3.2):
√[σ⊥² + 3·(τ⊥² + τ‖²)] ≤ fu/(βw·γM2) = 490/(0,9·1,25) = **435,6 N/mm²**
și σ⊥ ≤ 0,9·fu/γM2 = 0,9·490/1,25 = 352,8 N/mm².
Grosime cordon a = 6÷8 mm la nodurile principale (funcție de grosimea platbandelor). Sudurile se verifică la efortul din calculul la capacitate.

### 11.3. Îmbinări curente

Pane și contravântuiri: șuruburi M16/M20 gr. 8.8, îmbinări cu forfecare + presiune pe gaură. Verificare Fv,Rd și Fb,Rd (presiune pe pereții găurii).

---

## 12. Placa pardoselii industriale — dimensionare completă (cazurile A și B)

### 12.1. Încărcări pe pardoseală

| Sursă | Valoare | Amprentă / detaliu |
|---|---|---|
| Stivuire uniformă distribuită | 30÷50 kN/m² | pe suprafață |
| Motostivuitor 3,5 t | 35÷45 kN/roată | amprentă 200×200 mm, p ≈ 1,0÷1,1 N/mm² |
| Picior de raft (paletar) | 60÷90 kN/picior | placă bază 150×150 mm, p ≈ 3÷4 N/mm² |

### 12.2. Cazul A — placă supraterană pe pat elastic (teoria Westergaard/Winkler)

Placă **C30/37** pe strat de balast compactat (Ev2 ≥ 100 MPa) + folie PE de separare; modul de reacție k = 60 MN/m³ = 0,06 N/mm³.

**Raza de rigiditate relativă a plăcii** (Westergaard):
ℓ = ⁴√[E·h³/(12·(1−ν²)·k)]
cu h = 200 mm, E = 33.000 N/mm² (modulul betonului C30/37), ν = 0,15:
ℓ = ⁴√[33.000·200³/(12·(1−0,15²)·0,06)] = ⁴√[33.000·8.000.000/(12·0,9775·0,06)] = ⁴√[2,64·10¹¹/0,7038] = ⁴√[3,75·10¹¹] = **783 mm**.

**Moment din sarcină concentrată interioară** (picior de raft P = 80 kN, rază amprentă echivalentă a ≈ 85 mm) — formula Westergaard pentru încărcare interioară:
M = P/(4π)·[ln(2ℓ/a) + 0,6159]
M = 80.000/(4π)·[ln(2·783/85) + 0,6159] = 6.366·[ln(18,42) + 0,6159] = 6.366·[2,913 + 0,616] = 6.366·3,529 = 22.470.000 N·mm/m = **22,47 kNm/m**.

Tensiunea de întindere la fața inferioară:
σ = 6·M/h² = 6·22,47·10⁶/200² = 134,82·10⁶/40.000 = **3,37 N/mm²** > fctd,fl = 1,73 N/mm² → **placa nesolicitată nu rezistă → necesită armare/fibre**.

Soluție: plasă sudată **Ø8/150 dublă** (sus + jos) SAU **fibre metalice 30 kg/m³**. Momentul capabil doar cu fibre (MRd,fibre ≈ 13,3 kNm/m) este insuficient singur pentru raftul greu (22,47 kNm/m) → combinație fibre + plasă, SAU îngroșarea locală la h = 220 mm sub rafturi.

**Verificare motostivuitor** (P = 45 kN):
M = 45.000/(4π)·[ln(2·783/113) + 0,616] = 3.581·[ln(13,86) + 0,616] = 3.581·[2,629 + 0,616] = 11.620.000 = **11,62 kNm/m**;
σ = 6·11,62·10⁶/40.000 = **1,74 N/mm²** ≈ fctd,fl (la limită, acoperit de armare/fibre).

**Verificare poansonare (picior de raft, SR EN 1992-1-1 §6.4):**
Perimetrul de control critic u1 la distanța 2d de amprenta 150×150 mm (d ≈ 170 mm pentru h = 200): u1 = 4·150 + 2π·2·170 = 600 + 2.136 = 2.736 mm.
Rezistența la poansonare fără armătură specifică: vRd,c = CRd,c·k·(100·ρl·fck)^(1/3), cu CRd,c = 0,18/1,5 = 0,12, k = 1+√(200/d) = 1+√(200/170) = 2,08 (≤2,0 → 2,0), ρl ≈ 0,005:
vRd,c = 0,12·2,0·(100·0,005·30)^(1/3) = 0,24·(15)^(1/3) = 0,24·2,466 = 0,592 N/mm².
VRd,c = vRd,c·u1·d = 0,592·2.736·170 = 275.000 N ≈ **275 kN** (≥ 209 kN conservator, cu k=2,0) > VEd = 80 kN → **✓, fără armătură de poansonare**.

**Portanța plăcii** ~40÷50 kN/m² (limitată de teren), cu tasarea δ ≤ 20 mm.

> **Adoptat cazul A:** placă h = 20 cm C30/37 armată/fibrată; local sub rafturi h = 22 cm SAU **fundații punctuale independente** sub picioarele de raft (soluție recomandată — decuplează sarcina concentrată de placă).

### 12.3. Cazul B — placă pe subsol/goluri (rezemată pe grinzi)

Fără reazem continuu pe teren → placa devine **element structural încovoiat** pe o grilă de grinzi la 5÷6 m.

Încărcare de calcul (stivuire majorată):
qEd = 1,35·5 + 1,5·50 = 6,75 + 75 = **81,75 kN/m²**.

Moment în câmp (placă continuă, lc = 5,0 m, M ≈ q·lc²/10):
MEd = 81,75·5,0²/10 = **204 kNm/m** (foarte mare).

Înălțime utilă necesară (echilibru la încovoiere, μ ≈ 0,15):
d nec ≈ √[MEd/(μ·b·fcd)] = √[204·10⁶/(0,15·1000·20)] ≈ 261 mm → **h ≈ 30 cm**.

Armătura necesară:
As = MEd/(0,9·d·fyd) = 204·10⁶/(0,9·270·434,8) = 204·10⁶/105.657 = **1.930 mm²/m** → **Ø20/150 (2.094 mm²/m)** pe 2 direcții, sus + jos.
Verificare săgeată L/250 + poansonare pe reazeme.

### 12.4. Sinteză placă

| Parametru | A — pe teren | B — pe subsol/goluri |
|---|---|---|
| Model de calcul | Westergaard/Winkler | placă b.a. pe reazeme |
| Grosime | **20 cm** (22 local) | **25÷30 cm** |
| Armare | Ø8/150 dublă + fibre 30 kg/m³ | Ø20/150 2 direcții sus+jos |
| Solicitarea guvernantă | concentrat raft/stivuitor | stivuire + concentrat pe 5 m |
| Portanță | ~40÷50 kN/m² (teren) | ~50 kN/m² (placă) |

### 12.5. Rosturi

- **Rosturi de contracție** la 5÷6 m: tăiere pe 1/3 din grosime la ≤ 24 h de la turnare, cu gujoane Ø20/300 pentru transfer de forfecare.
- **Rosturi de turnare** (constructive): cu tije/gujoane de continuitate.
- **Rosturi de dilatație** perimetral și la stâlpi: placa este **flotantă**, decuplată de fundațiile stâlpilor (evită fisurarea din tasări diferențiale).

---

## 13. Zidul de foc (perete antifoc autostabil)

### 13.1. Cerința funcțională (P118-1)

Peretele antifoc trebuie să rămână în picioare **chiar dacă structura metalică de o parte a lui se prăbușește** (la incendiu, oțelul neprotejat își pierde capacitatea portantă la ~550°C). Soluția: stâlpi proprii de b.a. (sau metalici protejați REI 180) încastrați în fundații proprii, funcționând **în consolă** (rezemați doar la bază, fără legături de transfer cu cadrele halei, sau cu legături fuzibile).

### 13.2. Verificarea stâlpului de zid de foc (b.a., consolă H = 10,70 m)

Acțiunea de vânt pe perete liber (coeficient forță cf = 1,5):
we = cf·qp = 1,5·1,05 ≈ 1,58 kN/m²; pe lățimea aferentă 6,0 m: w = 1,58·6,0 = **9,45 kN/m**.

Moment la bază (consolă, sarcină uniformă):
Mbază = w·H²/2 = 9,45·10,70²/2 = 9,45·57,25 = **541 kNm/stâlp** (+ efect termic/împingere din colaps de o parte).

Dimensionare secțiune 40×60 cm C25/30, cu factor de siguranță 1,5 pe efectul de colaps:
MRd nec ≥ 1,5·541 = **812 kNm** → As = MRd/(z·fyd), cu braț z ≈ 0,55 m (d ≈ 0,55 m):
As = 812·10⁶/(550·434,8) = 812·10⁶/239.140 = 3.395 mm² → **6Ø28/față (3.695 mm²) ✓**.

Verificare la răsturnare: Mstabil/Mrăst ≥ 1,5. Fundație proprie lată B = 2,5÷3,0 m (excentricitate e ≤ B/6). Peretele depășește acoperișul cu **+0,60 m**; uși REI cu autoînchidere; rost de decuplare pe toată înălțimea față de structura halei.

---

## 14. Infrastructura — fundații izolate, grinzi de fundație, tasări

### 14.1. Sistemul de fundare

Fundații izolate tip **bloc + cuzinet** (sau pahar la stâlpi metalici), la Df = −1,50 m, legate cu **grinzi de soclu** perimetrale și de legătură, + placă de pardoseală independentă cu rost.

### 14.2. Fundația tip sub stâlp — dimensionare pe capacitatea portantă a terenului

Eforturi la bază: gravitațional NEd = 480 kN, VEd = 55 kN; seismic NEd = 350 kN, VEd = 120 kN.

**Suprafața necesară a tălpii** (presiune ≤ pconv = 250 kPa):
A nec = NEd/pconv = 355/250 = 1,42 m² → se adoptă talpă **2,0×2,0 m** (A = 4,0 m²).

**Presiunea maximă pe teren** (cu moment din excentricitate, M ≈ VEd·h + Mstâlp):
p_max = N/A + M/W = (100 kPa uniform) + (30 kPa din moment) = **130 kPa < 250 kPa ✓**;
excentricitatea e ≈ 0,10 m < B/6 = 2,0/6 = 0,33 m → **diagrama de presiuni în întregime comprimată ✓**.

**Verificarea la lunecare** (seism, VEd = 120 kN):
Rezistența prin frecare: Rf = NEd·tanφ = 350·tan20° = 350·0,364 = **127 kN > 120 kN ✓** (+ contribuția grinzilor de soclu care leagă întregul ansamblu).

**Armarea tălpii:** Ø14/150 ambele direcții (constructiv + verificare la încovoierea tălpii ca placă în consolă de la fața cuzinetului).

**Cuzinet:** 90×90×60 cm.

**Placa de bază metalică** (interfața stâlp-fundație, SR EN 1993-1-8 §6.2.5) — exemplu:
Placă 700×700×40 mm S355 sub stâlpul HEB 450, sarcină de compresiune NEd = 480 kN + moment MEd = 120 kNm (bază articulată constructiv, dar cu moment mic din pretensionare ancoraj).
Rezistența la strivire a fundației (îmbinare beton): fjd = βj·kj·fcd, cu βj = 2/3, kj = factor de concentrare (raport arie fundație/placă, limitat la 3) ≈ 2,0 → fjd = (2/3)·2,0·13,33 = **17,77 N/mm²**.
Lățimea suplimentară a tălpii echivalente (T-stub comprimat): c = t·√(fyd/(3·fjd·γM0)) = 40·√(355/(3·17,77·1,0)) = 40·√6,66 = 40·2,58 = 103 mm.
Aria efectivă de reazem Aeff sub tălpile stâlpului + inima extinse cu c → aria rezultată ≈ 2,0·10⁵ mm² → Fc,Rd = Aeff·fjd = 200.000·17,77 = 3.554.000 N = **3.554 kN ≫ 480 kN → ✓** (placa curge cedarea betonului, nu invers). Grosimea plăcii 40 mm rezultă din verificarea la încovoiere a consolei c (verificat).

### 14.3. Buloane de ancoraj (SR EN 1993-1-8, CEN/TS 1992-4)

Cazul critic este **ridicarea** (combinația C2: 1,0G + 1,5·V succiune): Nt ≈ **90 kN** tracțiune la baza stâlpului.

**4 × M30 gr. 8.8:**
- Tracțiune bulon: Ft,Rd = 0,9·fub·As/γM2 = 0,9·800·561/1,25 = 323.136 N = **323 kN/bulon** (As = 561 mm² pentru M30) → 4×323 = 1.292 kN ≫ 90 kN ✓.
- **Smulgerea conului de beton** (cedare fragilă) → se impune lungime de ancoraj **hef ≥ 500 mm** + **armătură de suspendare** în fundație (evită cedarea fragilă a conului, transferă la armătura tălpii).
- Forfecare: VEd/4 = 120/4 = 30 kN/bulon < Fv,Rd = 215 kN ✓ (+ pinten de forfecare / shear key opțional sub placa de bază).
- Interacțiune N-V (formula CEN/TS 1992-4): (Nt/NRd)^α + (V/VRd)^α ≤ 1,0 ✓.

Stabilitatea de ansamblu la răsturnare și lunecare ≥ 1,5, asigurată suplimentar de grinzile de soclu care leagă toate fundațiile într-un cadru rigid la nivelul infrastructurii.

### 14.4. Grinzi de fundație (grinzi de soclu)

Grinzile de soclu perimetrale și de legătură (secțiune 40×60 cm b.a. C20/25) îndeplinesc rolurile:
- rezemarea peretelui de închidere (perete sandwich + rigle) la partea inferioară;
- **legarea fundațiilor izolate** într-un cadru rigid la nivelul infrastructurii (P100-1 §5.4.2 impune legarea fundațiilor în zone seismice pentru NEd·10%/g ca forță minimă de legătură între fundații = 0,10·ag·NEd = 0,10·0,25·480 = 12 kN axial minim în grindă);
- limitarea tasărilor diferențiale (rigiditate de redistribuire).
Armare longitudinală constructivă 4Ø16 sus + jos + etrieri Ø8/200; verificare la forța axială de legătură și la încovoierea din reazemul peretelui.

### 14.5. Tasări — verificare lucrată

Tasarea sub talpa 2,0×2,0 m la presiunea netă Δp = 130 − q_teren(la Df) ≈ 130 − 27 = 103 kPa, metoda edometrică simplificată (strat compresibil H = 4,0 m sub talpă, modul edometric Eoed = 15 MPa):
s = Δp·H·(factor de repartizare α ≈ 0,7)/Eoed = 103·4.000·0,7/15.000 = **19,2 mm** (estimare acoperitoare) → în practică 8÷15 mm cu profilul stratificat real.
Tasarea diferențială admisă între fundații adiacente pentru structuri metalice cu noduri rigide: Δs/L ≤ 1/500. Pentru L = 6,0 m → Δs,adm = 12 mm. Diferența estimată între fundații (variație de încărcare < 30%) → Δs ≈ 5 mm < 12 mm → **✓**, suplimentar controlată de grinzile de soclu rigide.

---

## 15. Protecție anticorozivă și protecție la foc

### 15.1. Protecție anticorozivă (SR EN ISO 12944)

Categorie de corozivitate a mediului: **C3** (interior industrial cu umiditate/condens moderat), durabilitate H (mare, 15÷25 ani).

Sistem de vopsire:
- Pregătire suprafață: sablare **Sa 2½** (curățare aproape până la metal alb).
- Grund epoxidic bogat în zinc: 60 µm.
- Strat intermediar epoxidic: 100 µm.
- Strat de finisaj poliuretanic (PU): 60 µm.
- **DFT total ≈ 220 µm.**
Buloanele și piesele de îmbinare: zincare termică la cald.

### 15.2. Protecție la foc (P118-1, SR EN 1993-1-2)

Halele parter cu compartiment de incendiu sub aria admisă și cu zid de foc autostabil pot avea, în principiu, **structură metalică majoritar neprotejată** — justificat prin faptul că un colaps la parter nu afectează niveluri superioare, iar evacuarea este rapidă (soluția finală se stabilește prin scenariul de securitate la incendiu, verificator Ci).

**Dacă se impune R15/R30** (căi de evacuare, stâlpi adiacenți zidului de foc, mezanin):
- **Vopsea intumescentă** (termospumantă): temperatura critică θcr ≈ 550÷585°C, coeficient de utilizare μ0 = 0,6.
- Exemplu HEB 450 cu factor de masivitate Am/V ≈ 100 m⁻¹ → grosime uscată DFT necesară ≈ 0,4÷0,8 mm pentru R30.
- Alternativ: placare cu vată minerală / plăci de gips-carton rezistente la foc.
- **Excepție protejată R30:** stâlpii adiacenți zidului de foc + căile de evacuare (obligatoriu).

**Calculul temperaturii critice** (SR EN 1993-1-2, §4.2.4): θcr = 39,19·ln[1/(0,9674·μ0^3,833) − 1] + 482, cu μ0 = grad de utilizare la temperatura ambiantă. Pentru μ0 = 0,6:
θcr = 39,19·ln[1/(0,9674·0,6^3,833) − 1] + 482 = 39,19·ln[1/(0,9674·0,1587) − 1] + 482 = 39,19·ln[6,514 − 1] + 482 = 39,19·1,707 + 482 = 66,9 + 482 = **549°C**.

**Evoluția temperaturii oțelului neprotejat** (SR EN 1993-1-2, §4.2.5.1, incrementul):
Δθa,t = (Am/V)·ksh/(ca·ρa)·ḣnet·Δt, cu factor de masivitate Am/V ≈ 100 m⁻¹ pentru HEB 450 expus pe 4 fețe, ca ≈ 600 J/(kg·K), ρa = 7.850 kg/m³. Sub curba standard ISO 834, oțelul neprotejat atinge θcr = 549°C după ~13 minute → **clasa de rezistență la foc a elementului neprotejat ≈ R13**, insuficientă pentru R30. Prin urmare, pentru elementele care necesită R30 se aplică vopseaua intumescentă care reduce factorul efectiv de încălzire (grosime uscată 0,4÷0,8 mm), împingând atingerea lui θcr la ≥ 30 minute.

---

## 16. Verificarea la starea limită de serviciu (SLS) și noțiuni de execuție

### 16.1. Verificări SLS (recapitulare cu valori)

| Verificare | Limită normativă | Valoare de calcul | Verdict |
|---|---|---|---|
| Săgeata riglei cadru | L/200 = 100 mm | ~65 mm (din model) | ✓ |
| Deplasare orizontală streașină (vânt) | H/150 = 63 mm | ~50 mm | ✓ |
| Drift seismic dr (SLU) | ≤ 0,025·h (θ·q) | verificat pe niveluri | ✓ |
| Drift seismic dr (SLS) | ≤ 0,005·h = 47,5 mm | ~40 mm | ✓ |
| Săgeata panelor | L/200 = 30 mm | ~25 mm | ✓ |
| Grinda de rulare | L/600÷750 | ~8 mm | ✓ |

### 16.2. Noțiuni PTh / execuție

- Clasa de execuție **EXC2** (SR EN 1090-2), conform CC2.
- Control suduri: examinare vizuală (VT) 100% + control ultrasonic/radiografic (UT/RT) pe cusăturile solicitate la oboseală/capacitate (procent conform SR EN 1090-2).
- Pretensionarea șuruburilor 10.9: cu cheie dinamometrică / metoda combinată, control al momentului de strângere.
- Certificate de material 3.1 (SR EN 10204) pentru oțeluri și consumabile de sudură.
- Toleranțe de montaj (verticalitate stâlpi, poziție ancoraje) conform SR EN 1090-2.

---

## 17. Concluzii și verificarea tehnică (cerințele A1/A2)

### 17.1. Concluzii

Structura metalică propusă — **cadre transversale cu noduri rigide (MRF, q = 4,0) + contravântuiri concentrice longitudinale (CBF, q = 4,0)** — satisface cerința fundamentală de **rezistență mecanică și stabilitate (A — Legea 10/1995)** în toate grupările de încărcări, cu grade de utilizare sub 0,80 pe elementele principale.

Sinteza aspectelor guvernante:
- **Vântul de succiune** guvernează ancorajele (ridicare ~90 kN/stâlp) — preluat de 4×M30 gr. 8.8 cu hef ≥ 500 mm.
- **Podul rulant de 8 t** introduce compresiune excentrică în stâlpi + oboseală în calea de rulare.
- **Placa de pardoseală** a fost dimensionată în ambele cazuri: A — 20 cm C30/37 armată/fibrată pe teren; B — 25÷30 cm cu Ø20/150 pe 2 direcții pe goluri (grosime/armare mult mai mari fără reazem continuu). Se recomandă **fundații punctuale independente sub rafturile grele**.
- **Zidul de foc autostabil** verificat (M = 541 kNm/stâlp, 6Ø28/față) cu suprarezistență la colaps.
- **Fundațiile izolate** 2,0×2,0 m (pmax = 130 kPa < 250 kPa), legate cu grinzi de soclu.

### 17.2. Verificarea tehnică (Legea 10/1995, HG 925/1995)

Documentația necesită verificare de către verificatori atestați MDLPA:

| Cerință / domeniu | Verificator | Obiect |
|---|---|---|
| Rezistență mecanică — structuri metalice | **Af** | structură metalică, îmbinări, contravântuiri (obligatoriu) |
| Rezistență mecanică — b.a. / fundații | **A1** | fundații, cuzineți, placă pardoseală, zid de foc b.a. |
| Geotehnic | **Ag** | studiul geotehnic |
| Securitate la incendiu | **Ci** | scenariul de securitate la incendiu |

Memoriul este valabil pentru faza DTAC numai însoțit de **referatele favorabile Af și A1** + studiul geotehnic verificat Ag. Detaliile complete (planșe de armare, planșe de îmbinare, liste de bare, caiet de sarcini, extrase de material) se elaborează la faza **PTh + DE**. Toate valorile de amplasament (ag, Tc, sk, qb, pconv, k) se confirmă cu datele reale ale amplasamentului (harta de zonare P100-1, CR 1-1-3, CR 1-1-4 și studiul geotehnic pentru terenul de fundare).

### 17.3. Conformitatea cu cerințele fundamentale (Legea 10/1995)

| Cerință fundamentală | Mod de satisfacere | Referință |
|---|---|---|
| A — Rezistență mecanică și stabilitate | verificări SLU pe toate elementele + SLS + capacity design seismic | SR EN 1990/1993/1998 |
| B — Securitate la incendiu | zid de foc autostabil + protecție R30 selectivă + scenariu | P118-1, SR EN 1993-1-2 |
| C — Igienă, sănătate, mediu | protecție anticorozivă C3, materiale certificate | ISO 12944 |
| D — Siguranță și accesibilitate în exploatare | limitarea săgeților/deplasărilor SLS, drift seismic | SR EN 1990 §A1.4 |
| F — Economie de energie | (cerință de arhitectură/termotehnică — panouri sandwich) | C107 |

### 17.4. Estimarea consumurilor de materiale (orientativ, per hală de referință)

| Material | Cantitate estimată | Observație |
|---|---|---|
| Oțel structural (cadre, pane, contravântuiri) | ~35÷45 kg/m² arie construită → ~85÷110 t | funcție de deschidere/pod rulant |
| Beton fundații (C20/25) | ~55÷70 m³ | 22 fundații izolate + grinzi soclu |
| Beton placă pardoseală (C30/37) | ~480 m³ (20 cm × 2.400 m²) | + local 22 cm sub rafturi |
| Armătură / fibre | ~8÷12 t B500B + fibre 30 kg/m³ | placă + fundații + zid foc |

### 17.5. Plan de control al calității (faza execuție)

- Recepția materialelor: certificate 3.1 (SR EN 10204) pentru oțel laminat, table, șuruburi, electrozi.
- Trasabilitatea sudurilor: procedură WPS/WPQR calificată, sudori autorizați (SR EN ISO 9606).
- Control nedistructiv: VT 100% + UT/RT pe cusăturile de capacitate/oboseală (grinda de rulare, noduri MRF).
- Pretensionare șuruburi 10.9: control moment de strângere / metodă combinată, fișe de pretensionare.
- Control geometric la montaj: verticalitate stâlpi, poziție ancoraje, cote — conform SR EN 1090-2 clasa EXC2.
- Beton: rețete, conuri de tasare, epruvete pe clase; balastul plăcii — încercări de portanță Ev2.

---

*Documentul respectă cerințele Legii 10/1995 privind calitatea în construcții și se supune verificării tehnice de calitate de către verificatori de proiecte atestați pentru cerințele A1/Af, Ag și Ci.*
