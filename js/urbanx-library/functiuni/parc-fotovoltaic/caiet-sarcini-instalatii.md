# CAIET DE SARCINI — INSTALAȚII ELECTRICE

## Centrală electrică fotovoltaică (CEF / parc fotovoltaic) — faza PROIECT TEHNIC DE EXECUȚIE (P.Th. + D.E.)

## Putere instalată PARAMETRICĂ (P_DC, mărime de temă) — exemplu numeric etichetat la P_DC = 2,0 MWp

---

## 0. OBIECTUL, DOMENIUL ȘI CADRUL CAIETULUI DE SARCINI

### 0.1. Obiectul caietului de sarcini

Prezentul **caiet de sarcini** (CS) stabilește **condițiile tehnice de execuție, condițiile de calitate a materialelor și echipamentelor, prescripțiile de montaj, probele, verificările și condițiile de recepție** pentru instalațiile electrice ale unei centrale electrice fotovoltaice (CEF) racordate la Sistemul Electroenergetic Național (SEN). Caietul de sarcini este piesa scrisă a Proiectului Tehnic de execuție (P.Th./D.E.) care **completează și explicitează** planșele și breviarele de calcul, transformând soluția de proiectare în **cerințe verificabile și recepționabile** pe categorii de lucrări.

Caietul de sarcini **NU repetă** memoriul tehnic (care justifică soluția și dimensionarea) și **NU repetă** proiectul de racordare avizat de operatorul de distribuție (OD); el se adresează **executantului** (antreprenor general și subantreprenori de specialitate) și **dirigintelui de șantier / responsabilului tehnic cu execuția (RTE)**, definind *ce* trebuie livrat, *cu ce caracteristici garantate*, *cum* se pune în operă și *cum se dovedește* conformitatea la recepție.

> **PRINCIPIUL PARAMETRIC.** Caietul de sarcini este redactat **parametric în raport cu puterea instalată c.c., P_DC** (singura mărime impusă de temă, stabilită de utilizator/beneficiar). **Specificațiile de calitate** ale unei unități elementare (modul, string, invertor, celulă MT, colac de cablu) sunt **independente de puterea totală** — un modul de 555 Wp are aceleași cerințe de calitate fie că parcul are 0,5 MWp sau 50 MWp. **Cantitățile** (număr de module, stringuri, invertoare, transformatoare, lungimi de cablu, număr de prize de pământ) se exprimă prin **formule scalate cu P_DC**. Un **exemplu numeric complet la P_DC = 2,0 MWp** este dezvoltat și **etichetat explicit ca atare** — el ilustrează aplicarea formulelor, nu fixează puterea. Toate tabelele conțin **coloane-formulă** pentru recalcularea la orice putere aleasă.

### 0.2. Categoriile de lucrări acoperite

Caietul de sarcini tratează, pe categorii distincte de lucrări (fiecare cu specificație, montaj, verificare și recepție proprii):

1. Module fotovoltaice (echipamentul generator DC).
2. Structuri suport metalice și montajul modulelor.
3. Cablaje de curent continuu (DC) — cablu solar, pozare, marcare.
4. Cutii de string / combiner box, siguranțe, sectionare DC, SPD DC.
5. Invertoare (recepție, parametrizare, protecții).
6. Cablaje de curent alternativ (AC de joasă tensiune) și tablouri.
7. Post/posturi de transformare 0,4/20 kV — transformator, celule MT, protecții.
8. Racordul de medie tensiune (LES 20 kV) și contorizarea decontantă.
9. Priza de pământ, protecția împotriva trăsnetului, echipotențializarea.
10. Sistemul de monitorizare și control (SCADA, PPC, stație meteo).
11. Probele, verificările și recepțiile pe faze.

### 0.3. Documente de referință (norme, standarde, reglementări în vigoare la data execuției)

| Referință | Domeniu / aplicare în CS |
|---|---|
| **I7/2011** | Instalații electrice de joasă tensiune ≤ 1000 V c.a. / 1500 V c.c. |
| **NTE 007/08/00 (ex PE 107)** | Proiectarea și execuția rețelelor de cabluri electrice |
| **NTE 003/04/00 (PE 104)** | Construcția liniilor electrice aeriene cu U > 1 kV (dacă racord LEA) |
| **PE 116/1994** | Normativ de încercări și măsurători la echipamente și instalații electrice |
| **PE 118 (NTI)** | Regulament general de manevre în instalațiile electrice |
| **NP 004/2003** | Protecția construcțiilor împotriva trăsnetului |
| **NTE 001/03/00** | Norme de dimensionare a instalațiilor de legare la pământ |
| **1.RE-Ip 30/2004** | Îndreptar proiectare/execuție instalații de legare la pământ |
| **SR EN IEC 61215-1/-2** | Calificarea de proiectare și omologarea modulelor FV (cristaline) |
| **SR EN IEC 61730-1/-2** | Calificarea de securitate a modulelor FV |
| **SR EN IEC 62804-1** | Metodă de testare a susceptibilității la PID (degradare indusă de potențial) |
| **SR EN IEC 61701** | Rezistența modulelor la coroziunea salină (ceață salină) |
| **SR EN IEC 62716** | Rezistența modulelor la coroziunea cu amoniac |
| **SR EN IEC 62790** | Cutii de joncțiune pentru module FV |
| **SR EN IEC 62852** | Conectori (cuplaje) DC pentru sisteme FV |
| **SR EN 50618 / IEC 62930** | Cabluri electrice pentru sisteme FV (cablu solar H1Z2Z2-K) |
| **SR EN IEC 62548** | Cerințe de proiectare pentru câmpurile FV (siguranțe, sectionare, SPD) |
| **SR EN IEC 62109-1/-2** | Securitatea invertoarelor FV |
| **SR EN 50530** | Randamentul global (MPPT + conversie) al invertoarelor FV |
| **SR EN IEC 61439-1/-2** | Ansambluri de aparataj de joasă tensiune (tablouri) |
| **SR EN IEC 62271-100/-102/-200** | Aparataj MT: întreruptoare, separatoare, celule în anvelopă metalică 24 kV |
| **SR EN 60076-1…11** | Transformatoare de putere (inclusiv uscate — partea 11) |
| **SR EN 60255 / IEC 60255-151** | Relee de măsură și dispozitive de protecție |
| **SR EN 62446-1:2016** | Sisteme FV — cerințe pentru încercări, documentație, PIF și inspecție periodică |
| **SR EN 62446-3** | Inspecție prin termografie a sistemelor FV |
| **SR EN IEC 62305-1…4** | Protecția împotriva trăsnetului (LPS + SPM) |
| **SR EN IEC 60364** (serie) | Instalații electrice de joasă tensiune (pentru partea AC) |
| **STAS 12604-4/5-89** | Protecția împotriva electrocutărilor — instalații de legare la pământ |
| **Reg. (UE) 2016/631 (NC RfG)** | Cod de rețea — racordarea generatoarelor |
| **Ord. ANRE 208/2018** | Norma tehnică națională de aplicare a RfG |
| **Ord. ANRE 59/2013 + 235/2019** | Regulament de racordare + norma tehnică; **contorizare/măsurare** |
| **Codul de măsurare a energiei electrice (ANRE)** | Grupuri de măsurare, clase de exactitate |
| **Legea 10/1995** | Calitatea în construcții — recepția lucrărilor |
| **HG 273/1994** | Regulament de recepție a lucrărilor de construcții și instalații aferente |
| **Legea 50/1991, Legea 123/2012** | Autorizarea construirii; Legea energiei electrice |

Ori de câte ori un standard este citat, se aplică **ediția în vigoare la data execuției**, inclusiv amendamentele. În caz de contradicție între documente, ordinea de prevalență este: (1) legislație și reglementări ANRE/ISC obligatorii; (2) avize și condiții din ATR/contract de racordare al OD; (3) prezentul caiet de sarcini; (4) planșele; (5) standardele de produs. Executantul semnalează în scris orice neconcordanță **înainte** de punerea în operă.

### 0.4. Obligații generale ale executantului

Executantul asigură: personal calificat și **autorizat ANRE** (electricieni autorizați gradul corespunzător lucrărilor de JT și MT), RTE atestat pentru domeniul instalații electrice, sculele și AMC-urile etalonate (cu certificate de etalonare valabile), materialele și echipamentele **însoțite de declarații de performanță / conformitate (DoC/DoP)**, agremente tehnice acolo unde e cazul, și **planul de control al calității, verificări și încercări (PCCVI)** aprobat de proiectant și diriginte. Nicio categorie de lucrare nu se acoperă (nu devine ascunsă) fără **proces-verbal de lucrări ascunse** semnat. Trasabilitatea materialelor (loturi, serii, certificate) se menține în **cartea tehnică a construcției**.

---

## 1. MĂRIMILE DE TEMĂ ȘI FORMULELE DE SCALARE (CANTITĂȚI PARAMETRICE)

### 1.1. Parametrul de intrare unic și mărimile derivate

Singura mărime **impusă** este puterea instalată c.c. **P_DC** [kWp]. Toate cantitățile de execuție se derivă prin relații fixe. Se notează: P_mod = puterea unitară a modulului [Wp]; N_s = numărul de module în serie pe string (rezultat din fereastra de tensiune a invertorului și temperaturile de calcul — vezi memoriul); P_inv = puterea unitară a invertorului [kW]; ILR = raportul de supradimensionare DC/AC (tipic 1,20–1,30); P_T = puterea unitară a transformatorului [kVA].

| Mărimea de execuție | Simbol | **Formulă de scalare cu P_DC** | Observație |
|---|---|---|---|
| Nr. module (aprox.) | N_mod | **N_mod = P_DC·1000 / P_mod** | rotunjit prin nr. întreg de stringuri |
| Nr. stringuri | N_str | **N_str = N_mod / N_s** | N_s din fereastra de tensiune |
| Putere AC nominală | P_AC | **P_AC = P_DC / ILR** | ILR ≈ 1,25 |
| Nr. invertoare | N_inv | **N_inv = ⌈ P_AC / P_inv ⌉** | rotunjire în sus |
| Stringuri / invertor | n_str,inv | **n_str,inv = ⌈ N_str / N_inv ⌉** | intrări MPPT ocupate |
| Nr. cutii combiner | N_cb | **N_cb = ⌈ N_str / k_cb ⌉** | k_cb = intrări/combiner (ex. 12–24) |
| Putere trafo instalată | S_T | **S_T ≈ P_AC** (×1,05 marjă) | acoperă Q reactiv de RfG |
| Nr. posturi transformare | N_PT | **N_PT = ⌈ S_T / P_T ⌉** | P_T unitar ales |
| Lungime cablu DC (aprox.) | L_DC | **L_DC ≈ N_str × 2 × ℓ_med,str** | ℓ_med,str = drum mediu string→combiner |
| Nr. SPD DC (T1+2) | N_spd,dc | **≈ 2 × N_cb + 2 × N_inv** | intrare/ieșire combiner + intrare invertor |
| Prize de pământ locale | N_pe | **≈ N_PT + N_inv/grup** | rețea generală + local echip. |

### 1.2. EXEMPLU NUMERIC ETICHETAT — P_DC = 2,0 MWp (2.000 kWp)

> **ATENȚIE — VALORI EXEMPLU.** Cifrele de mai jos sunt **strict ilustrative pentru P_DC = 2.000 kWp**; pentru orice altă putere se reaplică formulele din § 1.1.

Ipoteze de exemplu: P_mod = 555 Wp (modul monocristalin bifacial, 144 semi-celule); N_s = 27 module/string; ILR = 1,25 → P_AC = 1.600 kW; invertor de string P_inv = 200 kW (8 intrări MPPT); transformator P_T = 2.500 kVA (0,4/20 kV); k_cb = 24 intrări/combiner.

| Mărime | Formulă | Rezultat exemplu (2 MWp) |
|---|---|---|
| N_mod | 2.000.000 / 555 | ≈ 3.604 → **3.618** (=134×27) |
| N_str | N_mod / 27 | **≈ 134 stringuri** |
| P_AC | 2.000 / 1,25 | **1.600 kW** |
| N_inv | ⌈1.600/200⌉ | **8 invertoare de 200 kW** |
| n_str,inv | ⌈134/8⌉ | **16–17 stringuri/invertor** |
| N_cb | ⌈134/24⌉ | **6 combinere** (sau invertoare cu combiner integrat) |
| S_T | 1,05 × 1.600 | **≈ 1.680 kVA → 1×2.500 kVA** |
| N_PT | ⌈1.680/2.500⌉ | **1 post de transformare** |
| L_DC | 134 × 2 × ~60 m | **≈ 16.000 m cablu solar** (orientativ) |
| Racord | P_AC > 1 MW | **LES 20 kV** la stație/PT OD |

Aceste valori-exemplu sunt reluate ca **cantități de referință** în capitolele următoare, întotdeauna marcate „(exemplu 2 MWp)". Antreprenorul verifică toate cantitățile pe listele de cantități (antemăsurătoare) ale proiectului, care sunt calculate pentru **P_DC efectiv contractat**.

---

## 2. CATEGORIA A — MODULE FOTOVOLTAICE

### 2.1. Specificația de calitate a modulului (caracteristici garantate)

Modulele fotovoltaice constituie echipamentul generator DC. Se acceptă exclusiv module **calificate de proiectare și de securitate** conform:

- **SR EN IEC 61215-1/-2** — calificarea de proiectare (thermal cycling 200 cicluri, humidity-freeze, damp-heat 1000 h, mechanical load, hot-spot, UV preconditioning etc.);
- **SR EN IEC 61730-1/-2** — calificarea de securitate (clasa de aplicare A, izolație, rezistență la foc, curenți inverși).

Module fără marcaj și fără rapoarte de testare de la laborator acreditat (ex. TÜV, VDE, UL, INTERTEK) **se resping la recepția cantitativă**.

**Tabel — caracteristici garantate ale modulului (verificabile la recepție):**

| Caracteristică | Cerință de acceptare | Standard / metodă |
|---|---|---|
| Putere nominală P_max (STC) | ≥ valoarea de temă P_mod (ex. 555 Wp) | flash-test STC, IEC 61215 |
| **Toleranță de putere** | **0 / +5 W (sau 0 / +3 %)** — fără toleranță negativă | fișă tehnică + flash-test |
| Tensiune circuit deschis V_oc (STC) | conform fișă (±5 %) | flash-test |
| Curent scurtcircuit I_sc (STC) | conform fișă (±5 %) | flash-test |
| Coeficient temperatură P_max | ≤ −0,35 %/°C (target ≤ −0,30 la TOPCon/HJT) | fișă / cert. |
| **PID** (degradare indusă de potențial) | **PID-free**: pierdere < 5 % după test | **SR EN IEC 62804-1** (−1500 V, 96 h) |
| **LID + LeTID** (degradare inițială + termică) | ≤ 2 % cumulat, stabilizat | rapoarte producător |
| **Degradare liniară garantată** | ≤ 0,55 %/an; **≥ 84,8 % P_max la 25 ani** (an 1 ≤ 1 %) | garanție de performanță scrisă |
| Clasă de securitate / izolație | Clasa II; V_sistem max ≥ 1500 V DC | IEC 61730 |
| Rezistență ceață salină (litoral) | Clasa 6 (nivel maxim) — dacă amplasament < 3 km de mare | **SR EN IEC 61701** |
| Rezistență amoniac (zone agrozootehnice) | conform test | **SR EN IEC 62716** |
| Rezistență la grindină | bilă Ø 25 mm @ 23 m/s (min.) | IEC 61215 |
| Sarcină mecanică (vânt/zăpadă) | ≥ +5400 Pa presiune / ≥ −2400 Pa depresiune | IEC 61215; declarat de producător |
| Cutie de joncțiune | IP68, ≥ 3 diode by-pass | **SR EN IEC 62790** |
| Conectori | compatibili/certificați, IP68, curent nominal ≥ I_string | **SR EN IEC 62852** |
| Coeficient bifacialitate (module bifaciale) | declarat (≥ 70 % tipic) | fișă tehnică |

### 2.2. Flash-test și trasabilitate la livrare

La livrare, fiecare **palet/lot** de module este însoțit de:

1. **Raportul de flash-test** individual (fișier .csv/.pdf) cu P_max, V_oc, I_sc, V_mpp, I_mpp, factor de umplere (FF) pentru **fiecare modul** identificat prin **serie unică (S/N) și cod de bare**. Rapoartele se corelează cu S/N-urile fizice.
2. **Certificatul de conformitate / DoP** al producătorului.
3. Certificatele de calificare IEC 61215/61730 și PID (62804) valabile.

Se efectuează, la recepția cantitativă, un **flash-test de control prin sondaj** pe minimum **2 % din module** (dar cel puțin 10 module) cu simulator solar clasă A+A+A+ etalonat. Criteriu de acceptare: abaterea P_max măsurată față de raportul de fabrică ≤ **±3 %** (incluzând incertitudinea de măsură). Dacă un modul din eșantion depășește toleranța, eșantionul se dublează; la o a doua nereușită se **respinge lotul**. Se verifică de asemenea **absența toleranței negative de putere** (niciun modul sub P_mod nominal).

**Verificare vizuală obligatorie (100 % la descărcare):** sticlă fără fisuri/spargeri; ramă fără deformări; absența microfisurilor vizibile, a bulelor/delaminării, a decolorării (browning); backsheet/sticlă spate integru; cutie de joncțiune fixată, conectori intacți. Se recomandă **electroluminescență (EL) prin sondaj** (≥ 1 %) pentru depistarea microfisurilor invizibile — obligatoriu dacă transportul a suferit șocuri.

### 2.3. Depozitare și manipulare pe șantier

Modulele se depozitează în ambalajul original, pe orizontală sau conform indicației producătorului (unele producători cer poziție verticală „short-edge"), protejate de intemperii, ferite de sarcini punctuale. **Se interzice** călcarea, așezarea de greutăți, ridicarea de conectori/cabluri, montajul modulelor umede sau murdare pe conectori. Colacii de conectori se protejează de praf/umezeală până la cuplare.

**Cantitate parametrică:** N_mod = P_DC·1000/P_mod (exemplu 2 MWp: 3.618 module).

---

## 3. CATEGORIA B — STRUCTURI SUPORT ȘI MONTAJUL MODULELOR

### 3.1. Specificația structurii metalice

Structurile suport (fixe înclinate sau tracker mono-axial) se execută din **oțel zincat termic la cald** (Z ≥ 275…600 g/m² după piesă, **SR EN ISO 1461**) și/sau **aluminiu** (profile EN AW-6005A/6063 T6) pentru profilele de prindere module; șuruburile, piulițele, șaibele — **inox A2/A4 (SR EN ISO 3506)** sau oțel zincat clasă de coroziune corespunzătoare mediului. Fundațiile (piloți bătuți/înșurubați, micropiloți sau fundații de beton) se execută conform proiectului de rezistență; toleranțele de poziție și verticalitate se preiau din caietul de sarcini de rezistență.

**Tabel — cerințe de calitate structură (verificabile):**

| Element | Cerință | Standard / verificare |
|---|---|---|
| Protecție anticorozivă oțel | zincare la cald ≥ conform categoriei de coroziune C3/C4/C5 (ISO 12944) | **SR EN ISO 1461**; măsurare grosime strat |
| Profile aluminiu | aliaj 6xxx T6, anodizat/eloxat unde e cazul | certificat material |
| Șuruburi/prinderi | inox A2/A4 sau zincat; clasă rezistență 8.8 min. | **SR EN ISO 3506 / 898** |
| Cuplu de strângere | conform tabel § 3.3, cheie dinamometrică etalonată | proces-verbal cupluri |
| Compatibilitate galvanică | evitarea cuplurilor galvanice (Al–oțel: șaibe izolante) | verificare vizuală/montaj |
| Continuitate electrică ramă | punți/cleme de echipotențializare (§ 9) | măsurare rezistență |

### 3.2. Montajul modulelor — reguli de execuție

- Modulele se prind exclusiv în **zonele de clemare admise** de producător (indicate pe fișă — de regulă la 1/4 din lungime), cu cleme mijloc și cleme capăt de tip și dimensiune specificate. **Se interzice** montajul în alte zone (invalidează garanția mecanică și crește riscul de microfisurare).
- Se respectă **orientarea (azimut) și înclinarea (tilt)** din proiect; abateri admise: azimut ±2°, tilt ±1°.
- Se respectă **distanțele între rânduri** (pitch) pentru evitarea umbririi și accesul de mentenanță (din proiect).
- **Sensul de montaj** (portrait/landscape) și numărul de module/masă conform planșelor.
- Conectorii DC se cuplează **complet** („click"), se verifică cuplarea corectă și **compatibilitatea de marcă** (se interzice amestecul de conectori de mărci diferite necertificați ca intercompatibili — sursă majoră de arc/incendiu).

### 3.2.1. Prevenirea microfisurilor la montaj (cerințe de manipulare)

Microfisurile celulelor (invizibile cu ochiul liber, detectabile prin electroluminescență) sunt principala cauză ascunsă de pierdere de putere și de puncte fierbinți în timp. Executantul respectă: transportul manual al modulelor de **doi operatori**, ținute pe muchia lungă, niciodată de cutia de joncțiune sau de cabluri; interdicția de a așeza module unele peste altele fără separatoare; interdicția de a **călca, sprijini scule sau lovi** suprafața modulului; montajul fără forțarea ramei în profile (fără îndoirea modulului la clemare); strângerea clemelor la cuplul specificat, **fără suprastrângere** (care induce tensiuni în laminat). Modulele care au suferit șoc de transport sau cădere se **carantinează** și se verifică prin EL înainte de acceptare. Se recomandă o **campanie EL prin sondaj** (≥ 1 %) după montaj, la parcurile mari, pentru a surprinde deteriorările de manipulare înainte de acoperirea garanției de execuție.

### 3.3. Cupluri de strângere și dilatații (tabel de execuție)

**Tabel — cupluri de strângere orientative (se aplică valorile din fișa producătorului dacă diferă):**

| Îmbinare | Filet | Cuplu de strângere | Observație |
|---|---|---|---|
| Clemă module – profil (Al) | M8 | 12–16 N·m | cheie dinamometrică |
| Prindere profil – suport (oțel) | M10 | 30–40 N·m | — |
| Prindere structură – fundație | M12 / M16 | 60–90 / 120–160 N·m | conform rezistență |
| Cleme echipotențializare | M6/M8 | 5–10 N·m | dinți de străpungere zinc |

**Dilatații:** se prevăd **rosturi de dilatație** în mesele lungi de module (fante ovalizate în profile, distanțieri între module de min. 3–5 mm conform producător) pentru compensarea variațiilor termice (ΔT până la ~80 °C între iarnă și vară, în modul); mesele metalice continue lungi (> 20–30 m) se secționează prin **rosturi de dilatație** conform proiectului de rezistență, cu **punți de echipotențializare flexibile** peste rost (continuitatea PE nu se întrerupe).

**Recepție categoria B:** proces-verbal cu verificarea prin sondaj a **cuplurilor** (≥ 5 % din îmbinări, dinamometric), a **alinierii/planeității** meselor (abatere ≤ ± L/500), a distanțelor între rânduri, a integrității zincării (fără zgârieturi până la oțel — se remediază cu vopsea bogată în zinc), a **continuității electrice a ramelor**.

---

## 4. CATEGORIA C — CABLAJE DE CURENT CONTINUU (DC)

### 4.1. Cablul solar DC — specificație

Cablurile DC de la string la combiner/invertor sunt **cabluri solare** tip **H1Z2Z2-K**, conform **SR EN 50618 / IEC 62930**, cu următoarele caracteristici garantate:

| Caracteristică | Cerință | Standard |
|---|---|---|
| Tip / marcaj | **H1Z2Z2-K**, un conductor, cupru multifilar (clasă 5) | SR EN 50618 |
| Tensiune nominală | **U₀/U = 1500 V DC** (1,5/1,5 kV DC) | SR EN 50618 |
| Izolație + manta | XLPO reticulat, fără halogen (LSZH) | — |
| Temperatură conductor | −40 °C … +90 °C (permanent), +120 °C scurt | SR EN 50618 |
| Durată de viață | 25 ani la 90 °C (test 20 000 h la 120 °C) | SR EN 50618 |
| Rezistență UV / ozon / intemperii | rezistent, montaj exterior | SR EN 50618 |
| **Secțiune minimă** | **4 mm² Cu** (string tipic); 6 mm² pentru drumuri lungi | verificare cădere de tensiune |
| Rezistență la foc / propagare flacără | reacție la foc conf. proiect | SR EN 60332 |

**Secțiunea** se alege astfel încât: (a) **capacitatea de curent** ≥ 1,25 × I_sc,string (factor IEC 62548 pentru curent invers și supracurent), cu factori de corecție pentru pozare grupată și temperatură; (b) **căderea de tensiune DC totală** (string → invertor) **≤ 1 %** din V_mpp (recomandat; max. tehnic 3 %). Verificarea căderii de tensiune este obligatorie în breviar; secțiunea minimă absolută este **4 mm² Cu** indiferent de calcul.

### 4.2. Cablurile de „coloană" DC (combiner → invertor) și AC de JT

Traseele DC de forță (combiner → invertor, unde există combinere separate) și traseele **AC de joasă tensiune** (invertor → tablou AC → transformator, 3F, 400/230 V sau 800 V) se realizează cu cabluri **Cu sau Al** cu izolație XLPE (ex. **N2XH / NA2XH LSZH**, sau CYY/CYAbY după caz), dimensionate la curentul nominal cu factorii de corecție NTE 007/08/00 și cu **verificare la cădere de tensiune (≤ 1 %) și la scurtcircuit** (solicitare termică, integrala Joule). Secțiunea PE/PEN se alege conform I7/2011.

Tablourile AC (de invertor, de grup, general de JT la PT) se execută conform **SR EN IEC 61439-1/-2**, cu **încercări de tip verificate** (TTA/PTTA), grad de protecție ≥ IP54 la exterior / IP31 în interior de PT, bare dimensionate la curentul nominal și la solicitarea dinamică de scurtcircuit, separarea funcțională a compartimentelor, ușor accesibile pentru mentenanță și dotate cu **schema de conexiuni în interior**. Aparatele de comutație și protecție (întreruptoare automate, separatoare de sarcină) se aleg cu capacitate de rupere ≥ I_k'' local (§ 6.2.1) și se etichetează individual. Fiecare tablou are **bară de nul (N)** și **bară de protecție (PE)** distincte, legate la instalația de echipotențializare, și **borne de rezervă** ≥ 20 %. Cablurile se introduc prin presetupe etanșe, cu **rezervă de lungime** pentru refacerea capetelor.

### 4.3. Pozarea cablurilor (NTE 007/08/00)

Pozarea respectă **NTE 007/08/00 (PE 107)**:

- **DC în câmp:** cablurile string se fixează de structura metalică cu **coliere/cleme rezistente UV** (poliamidă neagră stabilizată UV, oțel inox pentru cele expuse), **la interval ≤ 40–50 cm**, fără să atârne, fără contact cu solul, fără bucle care generează suprafață de captare inductivă (**se minimizează aria buclei** dus-întors pentru limitarea supratensiunilor de trăsnet induse — cablurile + și − ale aceluiași string se pozează **împreună**, alăturat).
- **Trasee îngropate:** în șanț la **adâncime ≥ 0,7 m** (0,8 m sub carosabil), pe **pat de nisip 10 cm**, cu **bandă avertizoare** la 30 cm deasupra, protejate în tub (PEHD) la subtraversări; distanțele față de alte rețele conform NTE 007. Umplutura compactată în straturi.
- **Poduri/jgheaburi de cabluri:** metalice zincate sau din PVC/poliester, cu grad de umplere ≤ 40 %, separarea traseelor DC / AC / MT / semnal conform NTE 007; **razele minime de curbură** ≥ (6…12)×D_ext conform tip cablu.
- **Trecerea prin PT / pereți:** prin tuburi de protecție etanșate (barieră la foc și rozătoare).

### 4.4. Marcarea cablurilor și a stringurilor

**Toate** cablurile și conductoarele se marchează durabil, rezistent UV, la ambele capete și la fiecare tragere/derivație:

| Element | Marcare | Cerință |
|---|---|---|
| Cablu DC string | etichetă cu nr. string, polaritate (+/−), invertor/MPPT țintă | inscripționare gravată/laser, UV-stabil |
| Polaritate | cod culori: **roșu = +, negru = −** (sau marcaj +/−) | consecvent în tot parcul |
| Combiner / cutii | etichetă „PERICOL — CURENT CONTINUU, NU SE DECONECTEAZĂ SUB SARCINĂ" | I7/2011, IEC 62548 |
| Cablu AC/MT | traseu, secțiune, tensiune, de la–la | plăcuțe metalice/gravate |
| Cabluri îngropate | marcaje de traseu la suprafață (borne/plăcuțe) | NTE 007 |

**Recepție categoria C:** procese-verbale de lucrări ascunse pentru trasee îngropate (adâncime, pat de nisip, bandă avertizoare, **fotografii cu ruletă** înainte de acoperire); **măsurarea continuității** fiecărui conductor; verificarea **polarității** înainte de energizare (o inversare de polaritate poate distruge invertorul); verificarea razelor de curbură, a fixării și a etichetării.

---

## 5. CATEGORIA D — CUTII DE STRING/COMBINER, SIGURANȚE, SECTIONARE ȘI SPD DC

### 5.1. Cutii de string / combiner box — specificație

Cutiile combiner colectează stringurile și le protejează, conform **SR EN IEC 62548** și **SR EN IEC 61439-2**:

| Caracteristică | Cerință | Standard |
|---|---|---|
| Anvelopă | material rezistent UV, **min. IP65** (exterior), clasă II | IEC 61439-2 / 60529 |
| Tensiune nominală | ≥ 1000/1500 V DC (conform sistem) | IEC 62548 |
| **Siguranțe string** | fuzibile **gPV** (10×38 / 14×51), U ≥ 1000/1500 V DC | **IEC 60269-6** |
| Curent nominal fuzibil | 1,5 × I_sc,string ≤ I_n ≤ I_mod max fuse rating (din fișa modulului) | IEC 62548 |
| Protecție ambele poli | siguranțe pe + și − (sisteme flotante/nelegate la pământ) | IEC 62548 |
| **Sectionare DC în sarcină** | separator de sarcină DC (load-break) integrat sau la invertor | IEC 60947-3 |
| **SPD DC** | descărcător **Tip 2** (sau **Tip 1+2** dacă LPS extern) | **§ 5.3** |
| Monitorizare (opțional) | măsurare curent/string pentru diagnoză | — |
| Presetupe / intrări | etanșe, cu descărcare presiune (respirator) | — |

**Nota — siguranțe gPV:** siguranța de string se prevede **numai** când numărul de stringuri paralele impune protecția la curent invers (conform IEC 62548, la ≥ 3 stringuri paralele fără protecție la curent invers în modul). La invertoare de string cu MPPT dedicat pe 1–2 stringuri, siguranța poate lipsi (curentul invers max este limitat) — decizia din breviar. Când se prevăd, se folosesc **exclusiv fuzibile gPV** dedicate DC (nu gG de AC — acestea nu sting arcul DC).

### 5.2. Sectionarea DC — cerințe de securitate

Trebuie asigurată posibilitatea de a **izola galvanic** fiecare string/grup pentru mentenanță: separator de sarcină DC la intrarea invertorului (obligatoriu pentru invertoarele fără sectionare integrată) și/sau în combiner. **Se interzice** deconectarea conectorilor DC sub sarcină (arc DC persistent). Toate elementele de sectionare se **etichetează** și se includ în **schema de manevre** (PE 118).

### 5.3. Dispozitive de protecție la supratensiuni (SPD)

Protecția la supratensiuni tranzitorii (trăsnet, comutații) se prevede conform **IEC 62548 / SR EN IEC 62305-4 / SR EN 50539-11**:

| Poziție | Tip SPD | Cerință |
|---|---|---|
| Intrare invertor DC | **Tip 2** (Tip 1+2 dacă LPS extern la ≤ 10 m) | U_cpv ≥ 1,2×V_oc,STC; I_n ≥ 20 kA (8/20) |
| Combiner DC (dacă distanță > 10 m) | Tip 2 | idem |
| Ieșire invertor AC | Tip 2 | U_c conform rețea JT |
| Tablou AC general / intrare PT | **Tip 1+2** | I_imp ≥ 12,5 kA (10/350) dacă LPS |
| Circuite de semnal/SCADA | SPD date | conform interfață |

**Cantitate parametrică:** N_spd,dc ≈ 2×N_cb + 2×N_inv (exemplu 2 MWp: ≈ 2×6 + 2×8 = **28 SPD DC**, orientativ). SPD-urile au **indicator de stare** (fereastră verde/roșu) și, unde e cazul, **contact de semnalizare la distanță** spre SCADA; cartușele se pot înlocui fără scoaterea din funcțiune. SPD-urile se montează cu **conductoare de legătură cât mai scurte (≤ 0,5 m total)** la bara PE/pământ.

**Recepție categoria D:** verificarea curenților nominali ai fuzibilelor față de I_sc,string; verificarea tensiunilor de lucru DC ale SPD; verificarea legăturilor la pământ ale SPD (scurte); IP-ul anvelopelor; etichetarea de securitate; test de funcționare a sectionării.

---

## 6. CATEGORIA E — INVERTOARE

### 6.1. Specificația invertorului (caracteristici și protecții garantate)

Invertoarele (de string sau centrale) convertesc DC în AC și asigură injecția conformă cu codul de rețea. Se acceptă exclusiv invertoare **certificate SR EN IEC 62109-1/-2** și **conforme RfG** (cu certificat de echipament / atestat de conformitate acceptat de OD):

| Caracteristică | Cerință de acceptare | Standard |
|---|---|---|
| Putere nominală AC | P_inv (conform temă, ex. 200 kW) la temperatura de referință | fișă |
| Tensiune DC MPPT | fereastra să cuprindă V_mpp string la −10…+70 °C | breviar |
| V_DC max | ≥ V_oc,string la −10 °C (nedepășire) | IEC 62548 |
| **Randament maxim** | ≥ 98,5 % | fișă / test |
| **Randament european / CEC ponderat** | **≥ 98,0 %** (garantat) | **SR EN 50530** |
| Nr. MPPT | conform proiect (granularitate) | — |
| Factor de putere | reglabil **cos φ 0,9 ind … 0,9 cap** (cerință RfG) | Ord. ANRE 208/2018 |
| THD curent injectat | **< 3 %** la putere nominală | SR EN 61000 / grid code |
| Grad de protecție | ≥ IP65 (montaj exterior) | IEC 60529 |
| Protecție de interfață integrată | relee U/f, LVRT/HVRT, anti-insularizare | RfG / § 6.3 |
| Monitorizare | comunicație Modbus TCP/RTU, SunSpec | § 10 |

### 6.2. Recepția, montajul și parametrizarea invertorului

**Recepție cantitativă:** verificarea seriei, a integrității, a certificatelor (62109, RfG, EMC). **Montaj:** conform manualului — distanțe de ventilație, orientare (evitarea expunerii directe pe fața de disipare acolo unde producătorul o cere), fixare pe structură/postament, cuplu prinderi. Racordurile DC se fac **cu invertorul deconectat** (separator DC deschis), cu **verificarea polarității și a tensiunii** înainte de energizare.

**Parametrizarea** (obligatorie, cu proces-verbal și export de fișier de configurare):

- Punctul de funcționare, limitele de putere activă/reactivă, curbele Q(U)/cos φ(P) impuse prin **avizul tehnic de racordare (ATR)**;
- Pragurile de **protecție de interfață** (U min/max, f min/max, timpi) conform normei RfG naționale;
- **Ramping** (viteza de creștere a puterii), gestiunea reconectării automate după deranjament;
- Limitarea puterii de injecție (dacă ATR impune P_max < P_AC), controlată de PPC (§ 10);
- Adresa Modbus/ID, ora (NTP/GPS), praguri de alarmare.

### 6.2.1. Breviar de verificare la scurtcircuit pe partea AC (control la recepție)

Executantul verifică că aparatajul AC de joasă tensiune (întreruptoare, tablouri, bare) are **capacitatea de rupere / rezistența dinamică** ≥ curentul de scurtcircuit prezumat în punctul respectiv. Curentul de scurtcircuit trifazat simetric se estimează cu I_k'' = c·U_n / (√3·Z_k), unde Z_k este impedanța de la sursă (rețea + transformator + cabluri) până la punctul de defect, iar c ≈ 1,05 (factor de tensiune). Contribuția invertoarelor la scurtcircuit este limitată (uzual ≤ 1,1…1,5·I_n al invertorului, prin firmware) și se adaugă la contribuția rețelei prin transformator. Solicitarea termică a cablurilor la scurtcircuit se verifică prin condiția (I_k'')²·t ≤ (k·S)² (integrala Joule ≤ capacitatea termică a conductorului), cu k funcție de material și izolație (Cu/XLPE: k ≈ 143). Executantul prezintă la recepție tabelul cu I_k'' pe fiecare tablou și confirmarea că I_cu (capacitatea de rupere) și I_cw (curentul de scurtă durată admisibil) ale aparatelor sunt acoperitoare, precum și **selectivitatea** dintre protecțiile în cascadă (invertor → tablou AC → protecția trafo pe JT).

### 6.3. Protecțiile invertorului și interfața RfG

Invertorul realizează, prin firmware certificat, funcțiile de protecție și susținere a rețelei impuse de **Reg. (UE) 2016/631** și **Ord. ANRE 208/2018**: traversarea golurilor de tensiune (**FRT / LVRT-HVRT**), răspuns în frecvență (**LFSM-O/U**), controlul puterii reactive (Q/U, cos φ), **anti-insularizare** (deconectare la insularizare a rețelei), reconectare temporizată. **Protecția de interfață** (dacă nu e acceptată cea integrată în invertor de către OD) se realizează prin **releu de protecție de interfață dedicat** (vezi § 7.3), setat conform normei RfG.

**Recepție categoria E:** proces-verbal de parametrizare cu export config; test funcțional de pornire/oprire; verificarea randamentului (declarat vs. măsurat prin sondaj la PIF, cu tolerantă); verificarea comunicației; **test de răspuns la comenzi PPC** (reducere putere, cos φ).

**Cantitate parametrică:** N_inv = ⌈P_AC/P_inv⌉ (exemplu 2 MWp: **8 invertoare de 200 kW**).

---

## 7. CATEGORIA F — POST DE TRANSFORMARE 0,4/20 kV (TRANSFORMATOR, CELULE MT, PROTECȚII)

### 7.1. Transformatorul de putere — specificație

Ridicarea tensiunii de la JT (0,4 kV sau tensiunea AC a invertoarelor) la MT (20 kV) se face prin transformator(e) trifazat(e) conform **SR EN 60076**:

| Caracteristică | Cerință | Standard |
|---|---|---|
| Putere nominală | S_T ≥ 1,05×P_AC/N_PT (ex. 2.500 kVA) | SR EN 60076-1 |
| Raport de transformare | 20 ± 2×2,5 % / 0,4 kV (ploturi pe MT, fără sarcină) | — |
| Grupa de conexiuni | **Dyn11** (uzual) | SR EN 60076-1 |
| Tip | ulei ermetic **sau uscat turnat în rășină (cast resin)** | 60076-1 / **-11** (uscat) |
| Tensiune de scurtcircuit u_k | 6 % (tipic la ≥ 1600 kVA) | fișă |
| Pierderi | clasă de eficiență conf. **Reg. (UE) 548/2014 (Ecodesign)** | obligatoriu |
| Nivel de izolație | Um = 24 kV; BIL 125 kV; 50 kV/1 min f.i. | SR EN 60076-3 |
| Protecții proprii | releu Buchholz (ulei) / termostat + sondă PT100 (uscat), DGPT2 | — |
| Nivel de zgomot | conform limite Ecodesign | 60076-10 |

Transformatoarele uscate (cast-resin, clasă F1/E2/C2) se preferă pentru **risc redus de incendiu** (fără ulei) în posturi anvelopate compacte; transformatoarele în ulei impun **cuvă de retenție** dimensionată la 100 % din volumul de ulei + rezerva de stins incendiu, conform normelor de mediu și PSI.

### 7.2. Celulele de medie tensiune (aparataj MT) — specificație

Celulele MT (în anvelopă metalică, izolate în aer sau **SF6/vid**) conform **SR EN IEC 62271-200**:

| Celulă | Funcție | Cerințe |
|---|---|---|
| Celulă de linie/sosire (2×, buclă) | separator de sarcină + CLP | 24 kV, I_n ≥ 630 A, I_scc ≥ 16 kA/1s |
| Celulă de măsură | TT + TC pentru contorizare/protecție | clasă exactitate § 8 |
| Celulă de protecție trafo | **întreruptor** + relee (nu doar separator+fuzibil la S mari) | 24 kV, I_scc ≥ 16 kA |
| CLP (cuțit de legare la pământ) | securitatea la mentenanță | interblocaje mecanice |

Toate celulele au **interblocaje** care împiedică manevre greșite (nu se deschide ușa cu CLP nefixat etc.), **indicatoare de prezență tensiune (VPIS)**, și se pun în operă conform schemei monofilare avizate de OD. Aparatajul MT se recepționează cu **certificate de încercări de tip** și încercări individuale.

### 7.3. Protecțiile de MT (relee) și protecția de interfață RfG

Releele de protecție (numerice, **SR EN 60255**) asigură funcțiile ANSI:

| Funcție ANSI | Denumire | Rol în CEF |
|---|---|---|
| **50/51** | Supracurent instantaneu / temporizat (faze) | scurtcircuit polifazat |
| **50N/51N** | Supracurent homopolar (nul) | punere la pământ / defect monofazat |
| **67N** | Direcțional de curent homopolar | selectivitate defect la pământ în rețea buclată |
| **27 / 59** | Minimă / maximă tensiune | protecție de interfață (U) |
| **81U / 81O** | Minimă / maximă frecvență | protecție de interfață (f) |
| **59N** | Supratensiune homopolară | punere la pământ pe MT |
| **ROCOF / vector shift** | Rata de variație a frecvenței / salt de fază | anti-insularizare (dacă cerută) |

**Protecția de interfață (PdI)** conform **RfG / Ord. ANRE 208/2018** deconectează generarea de la rețea la ieșirea parametrilor U/f din benzile admise; pragurile și temporizările se preiau **exact** din norma RfG și din ATR, și se **parametrizează și verifică** prin injecție secundară (test de releu) la PIF. Se coordonează **selectivitatea** protecțiilor (față de OD și între niveluri) prin studiu de coordonare a protecțiilor (parte a proiectului).

**Recepție categoria F:** încercări la transformator (raport transformare, rezistență izolație, rezistență înfășurări, u_k, verificare Buchholz/termostate); încercarea dielectrică a celulelor MT (dacă e cerută pe teren); **testul releelor prin injecție secundară** (verificarea pragurilor 50/51/51N/67N și a PdI) cu valise de injecție etalonate, cu **proces-verbal de reglaj protecții**; verificarea interblocajelor și a VPIS; verificarea legării la pământ a anvelopelor și a neutrului.

**Cantitate parametrică:** N_PT = ⌈1,05×P_AC / P_T⌉ (exemplu 2 MWp: **1 post de transformare 2.500 kVA**).

---

## 8. CATEGORIA G — RACORD LES 20 kV ȘI CONTORIZARE DECONTANTĂ

### 8.1. Linia electrică subterană (LES) 20 kV de racord

Racordul la punctul de delimitare (stația/PT al OD) se realizează, la puteri > ~1 MW, prin **LES 20 kV** cu cablu MT conform:

| Caracteristică | Cerință | Standard |
|---|---|---|
| Tip cablu MT | **A2XS(F)2Y / N2XS(F)2Y**, Al/Cu, izolație XLPE, ecran de Cu | SR EN / HD 620 |
| Tensiune nominală | **12/20 (24) kV** | — |
| Secțiune | din calcul de curent + scurtcircuit + cădere de tensiune (tipic 3×(1×150…240) mm² Al) | NTE 007 |
| Pozare | îngropat ≥ 0,8 m, pat de nisip, plăci/bandă avertizoare | NTE 007/08/00 |
| Terminale / manșoane | accesorii de MT certificate, montate de personal autorizat | — |
| Ecran/PE | legat la pământ la ambele capete (sau single-point conform calcul) | — |

Traseul, secțiunea și punctul de racord sunt **cele avizate de OD prin ATR**; execuția LES se face de operator economic **atestat ANRE** pentru lucrări MT, cu **încercări de PIF ale cablului MT**: rezistență de izolație, **încercare cu tensiune mărită DC/VLF (0,1 Hz)** conform normelor OD, măsurarea ecranului, verificarea manșoanelor/terminalelor. Racordul devine funcțional numai după **recepția OD** și **punerea sub tensiune** de către acesta.

### 8.2. Contorizarea (măsurarea decontantă)

Măsurarea energiei livrate/consumate se face conform **Ord. ANRE 59/2013 (Regulament de racordare)**, **Codul de măsurare a energiei electrice** și condițiile OD/OMEPA:

| Element | Cerință |
|---|---|
| Grup de măsurare | pe MT (la puteri mari) sau JT, în punctul de delimitare avizat |
| Contor | **bidirecțional**, clasă de exactitate **0,2S / 0,5S** (activă), 1,0 (reactivă) |
| Transformatoare de măsură | TC/TT clasă **0,2S / 0,2**, factor de securitate/putere conform |
| Curbă de sarcină / interval | înregistrare pe intervale, telecitire (AMR) |
| Sigilare | metrologică, de către OD/OMEPA |
| Verificare metrologică | contoare și TM cu verificare metrologică valabilă (BRML) |

Se prevede **grup de măsură de verificare/producție** (pentru certificate verzi/GO și monitorizarea proprie) distinct de cel decontant, dacă e cazul. Se asigură **sincronizarea de timp** și telecitirea. Recepția contorizării se face în prezența OD/OMEPA cu **proces-verbal de montare și sigilare**.

### 8.3. Conformitatea cu codul de rețea (RfG)

Anterior punerii în funcțiune comercială, centrala trece prin **procesul de conformare RfG** (Reg. UE 2016/631, Ord. ANRE 208/2018): notificare operațională de energizare (EON), notificare operațională intermediară (ION) și **notificare operațională finală (FON)**, cu **teste de conformitate** (răspuns P(f), Q(U)/cos φ, FRT dacă cerut, controlabilitate de la distanță). Documentația de conformitate (certificate de echipament + certificat de instalație / rapoarte de test) se depune la OD/OTS conform categoriei de putere (tip A/B/C/D). Executantul și proiectantul asigură datele și suportul pentru aceste teste.

---

## 9. CATEGORIA H — PRIZA DE PĂMÂNT, PROTECȚIA LA TRĂSNET, ECHIPOTENȚIALIZARE

### 9.1. Instalația de legare la pământ (priza de pământ)

Priza de pământ se execută conform **I7/2011, NTE 001/03/00, STAS 12604-4/5, PE 116, 1.RE-Ip 30/2004**, ca **rețea generală** (buclă/inel) care leagă: structurile metalice (rame module + suporți), carcasele invertoarelor, anvelopele PT, neutrul trafo JT, celulele MT, SPD-urile și instalația de paratrăsnet.

| Caracteristică | Cerință | Verificare |
|---|---|---|
| **Rezistența de dispersie** | **R_p < 1 Ω** (priză comună JT+MT+LPS, cf. PE 116) | măsurare metoda voltampermetrică / clește |
| Priză de fundație/orizontală | platbandă OL-Zn **40×4 mm** îngropată ≥ 0,8 m, inel perimetral | PV lucrări ascunse |
| Electrozi verticali | țăruși OL-Zn/Cu ≥ 2 m, în puncte de rezistivitate mare | — |
| Conductoare de coborâre/legătură | Cu ≥ 16/25 mm² sau OL-Zn echivalent | I7/2011 |
| Legături (sudură/cleme) | sudură cadmică/aluminotermică sau cleme certificate, protejate anticoroziv | verificare |
| Piese de separație / prize de măsură | cutii de vizitare pentru măsurarea periodică | — |

Dacă R_p măsurat > 1 Ω, se **completează** priza (electrozi suplimentari, tratare sol, inel extins) până la conformare; măsurarea se face în condiții de **sol uscat** (cazul defavorabil).

### 9.2. Protecția împotriva trăsnetului (paratrăsnet / LPS)

Necesitatea și nivelul de protecție (LPL I…IV) rezultă din **evaluarea riscului conform SR EN IEC 62305-2** (documentată în proiect), ținând cont de suprafața mare a parcului, de expunere și de valoarea instalației. Sistemul de protecție (LPS) conform **NP 004/2003 și SR EN IEC 62305-1…4** cuprinde:

- **Protecție externă:** dispozitive de captare (tije/PDA la PT, clădiri, structuri înalte; structurile metalice ale meselor pot fi „componente naturale" de captare/coborâre dacă îndeplinesc cerințele de continuitate și secțiune), **coborâri** și **priza de pământ** comună (§ 9.1).
- **Protecție internă (SPM):** **SPD** coordonate (Tip 1/2/3 — § 5.3), **echipotențializare de trăsnet** a tuturor maselor metalice și ecranelor, distanțe de separare (s) sau legături echipotențiale.

**Distanțele de separare** și amplasarea captatoarelor se verifică prin **metoda sferei fictive / unghiului de protecție** conform 62305-3, astfel încât echipamentele (invertoare, PT) să fie în zona protejată (LPZ). Se documentează în proiect nivelul LPL și rezultatul evaluării de risc.

### 9.3. Echipotențializarea

Toate masele metalice (rame, structuri, jgheaburi, anvelope, ecrane de cablu, canale, garduri metalice dacă intră în zona de pericol) se leagă la **bara principală de echipotențializare (BEP)** prin conductoare de secțiune conform I7/2011. **Continuitatea** ramelor de module se asigură prin **cleme dedicate cu dinți de străpungere** a stratului de zinc/anodizare (WEEB / cleme de împământare certificate), verificată prin **măsurarea rezistenței de continuitate PE** (< 0,1 Ω recomandate pe segment, criteriu I7/2011 pentru continuitate).

**Recepție categoria H:** măsurarea **R_p (< 1 Ω)** cu aparat etalonat și PV; măsurarea **continuității PE / echipotențializării** pe fiecare masă (sondaj extins); verificarea sudurilor/clemelor (rezistență mecanică + protecție anticorozivă); PV lucrări ascunse pentru priza îngropată (adâncime, traseu, fotografii); verificarea LPS (captatoare, coborâri, legături). **Cantitate parametrică:** rețeaua generală urmărește perimetrul câmpului + inel la fiecare PT; prizele locale N_pe ≈ N_PT + puncte de echip. per grup de invertoare.

---

## 10. CATEGORIA I — MONITORIZARE, CONTROL (SCADA / PPC) ȘI STAȚIE METEO

### 10.1. Sistemul SCADA / monitorizare

Sistemul de monitorizare colectează datele de la invertoare, contoare, PT (relee, temperaturi), combinere (curenți/string dacă echipate), stație meteo și le agregă local (data logger) și în cloud/portal:

| Element | Cerință |
|---|---|
| Protocoale | **Modbus TCP/RTU, SunSpec**, IEC 61850 (pt. relee MT), IEC 60870-5-104 (spre OD/OTS) |
| Logger local | industrial, memorie non-volatilă ≥ 1 an la interval 1–5 min, ceas NTP/GPS |
| Comunicație | fibră optică (backbone câmp) + 4G/LTE redundant spre cloud; VPN securizat |
| Mărimi monitorizate | P, Q, U, I, f, energie, temperaturi, stări invertoare/relee, alarme, iradiere, temp. modul/aer, PR calculat |
| Securitate cibernetică | segmentare rețea (OT/IT), firewall, acces autentificat, log |

### 10.2. Controlerul de centrală (Power Plant Controller — PPC)

**PPC** realizează controlul la nivel de centrală, în punctul de racord (POI), a **puterii active (limitare, ramping, P(f))** și a **puterii reactive (Q, cos φ, Q(U))**, executând **setpoint-urile de la OD/OTS** (telecontrol prin IEC 60870-5-104 sau interfața cerută) și impunând invertoarelor comenzi coordonate, cu **timp de răspuns conform RfG** (ordinul de mărime al secundelor). Reglajele (curbe, benzi moarte, priorități P/Q) se preiau din ATR și se **testează la PIF** (teste de conformitate RfG). PPC-ul se recepționează cu **teste de urmărire a setpoint-ului** (comandă vs. realizat, în POI).

### 10.3. Stația meteo (senzori)

Pentru calculul **Performance Ratio (PR)** și monitorizarea corectă (SR EN 61724 — monitorizarea performanței sistemelor FV) se prevede stație meteo cu:

| Senzor | Cerință |
|---|---|
| Piranometru (GHI) + în plan modul (POA/GTI) | clasă „secondary standard / clasa A" (ISO 9060) |
| Celulă de referință FV | calibrare spectrală corespunzătoare |
| Temperatură modul (backsheet) | senzori PT100 lipiți pe module reprezentative |
| Temperatură/umiditate aer | senzor ventilat |
| Viteză/direcție vânt | anemometru (pt. tracker: funcție de siguranță „stow") |

Datele meteo se corelează cu producția pentru **PR** și pentru **verificarea garanțiilor de performanță** (test de PR/producție la PIF și în anul de garanție). **Recepție categoria I:** PV de punere în funcțiune SCADA/PPC; test comunicație end-to-end; verificarea calibrării senzorilor (certificate); test PPC (limitare P, comandă Q); verificarea achiziției și arhivării datelor.

---

## 11. PROBE, VERIFICĂRI ȘI ÎNCERCĂRI LA PUNEREA ÎN FUNCȚIUNE (IEC 62446 / PE 116)

### 11.1. Principii și documentație

Probele și verificările electrice la punerea în funcțiune (PIF) se execută conform **SR EN 62446-1:2016** (sisteme FV — încercări, documentație, PIF) și **PE 116/1994** (încercări la echipamente și instalații), cu **AMC etalonate** și consemnate în **rapoarte de încercare** care intră în cartea tehnică. Verificările se fac **înainte de energizare** (verificări la zero tensiune / cu tester) și **după energizare**.

Documentația predată la PIF: schemele monofilare „as-built", listele de stringuri/invertoare, rapoartele de flash-test, PV-urile de lucrări ascunse, certificatele materialelor, manualele de exploatare și mentenanță, planul de mentenanță, cartea tehnică.

### 11.2. Verificări și încercări obligatorii pe partea DC (câmp FV)

**Tabel — verificări DC per string / matrice (IEC 62446-1, „categoria 1 și 2"):**

| Nr. | Verificare / încercare | Metodă | Criteriu de acceptare |
|---|---|---|---|
| 1 | Continuitatea conductoarelor de protecție și echipotențializare | ohmmetru / micro-ohm | R_PE mic, continuu (< 0,1 Ω/segment orientativ) |
| 2 | **Polaritatea** fiecărui string | voltmetru DC | +/− corecte pe fiecare intrare (înainte de invertor) |
| 3 | **Tensiunea de circuit deschis V_oc** / string | voltmetru DC | ≈ N_s × V_oc,mod corectat la temperatură (±5 %) |
| 4 | **Curentul de scurtcircuit I_sc** / string (sau I_op în sarcină) | clește/tester + iradiere | comparabil între stringuri identice; corelat cu iradierea |
| 5 | **Rezistența de izolație** DC (față de pământ) | megohmmetru la 1000 V DC (500 V la sisteme mici) | **≥ 1 MΩ** (sistem > 120 kW: ≥ 1 MΩ; ținta practică ≫ 40 MΩ) |
| 6 | Funcționarea sectionării/siguranțelor DC | inspecție + test | corect, etichetat |
| 7 | Prezența și starea SPD DC | inspecție | indicator verde, legături scurte |
| 8 | **Caracteristica I-V pe string** (curbă) | trasor I-V (curve tracer) | curbă „netedă", fără trepte; P_STC corectat ≥ 95 % din așteptat |

**Trasarea caracteristicii I-V pe string** (obligatorie, IEC 62446) se face cu trasor I-V și senzor de iradiere/temperatură, cu **corecție la STC**; se compară puterea măsurată corectată cu cea așteptată (toleranță tipică ±5 %, incluzând incertitudini) și **forma curbei** cu forma de referință (trepte = string cu module umbrite/defecte/diode arse/mismatch). Rezultatele se arhivează per string (fingerprint de referință pentru mentenanța ulterioară).

### 11.3. Termografia (inspecția în infraroșu)

Conform **SR EN 62446-3**, la putere ≥ 60 % din nominal și iradiere ≥ 600 W/m², se efectuează **termografie** (cameră IR, eventual dronă la parcuri mari) pe module, cutii, conectori, combinere, cabluri și borne:

| Constatare | Interpretare | Acțiune |
|---|---|---|
| Modul uniform cald | normal | acceptă |
| Celulă/segment „hot-spot" | microfisură / diodă / umbrire | verificare EL / înlocuire |
| Modul complet cald / rece | string deconectat / diodă defectă | remediere |
| Conector/bornă supraîncălzită (ΔT > 10–20 K) | contact defectuos / arc iminent | **remediere obligatorie** |

Diferențele de temperatură (ΔT) față de referință se cuantifică; anomaliile de clasă „periculoasă" (borne, conectori) se remediază **înainte de recepție**.

### 11.4. Verificări pe partea AC, MT și de rețea

| Verificare | Referință | Criteriu |
|---|---|---|
| Rezistența de izolație circuite AC JT | I7/2011 / IEC 60364-6 | conform tensiune (≥ 1 MΩ la 500 V) |
| Continuitate PE / echipotențializare AC | I7/2011 | continuu |
| Rezistența prizei de pământ | PE 116 / § 9 | **< 1 Ω** |
| Încercarea cablului MT (izolație + tensiune mărită VLF) | norme OD / PE 116 | fără străpungere; izolație conformă |
| Încercări transformator | SR EN 60076 | raport, izolație, u_k conform fișă |
| Reglaj și test relee MT (injecție secundară) | SR EN 60255 / § 7.3 | praguri 50/51/51N/67N și PdI conforme reglaj |
| Test protecție de interfață (RfG) | Ord. ANRE 208/2018 | deconectare la praguri U/f, timpi corecți |
| Verificarea rotației de fază / secvență | — | secvență directă corectă înainte de cuplare |
| Sincronizarea / cuplarea la rețea | procedura OD | conform |
| Contorizare (montaj + sigilare) | Ord. ANRE 59/2013 | PV OD/OMEPA |
| Teste de conformitate RfG (P(f), Q(U), controlabilitate) | Reg. UE 2016/631 | rapoarte pentru FON |

### 11.5. Proba de funcționare / punere în sarcină

După toate verificările de mai sus și energizarea aprobată de OD, se realizează **proba de funcționare** (test de anduranță) pe o durată stabilită (uzual **72 h continuu** sau conform contract), în care se verifică: stabilitatea injecției, absența declanșărilor nejustificate, corelarea producției cu iradierea (PR instantaneu), funcționarea SCADA/PPC și a alarmelor, temperaturile echipamentelor. Se calculează un **PR de referință** (test de performanță) care se compară cu garanția (PR de proiectare ≈ 0,80–0,83 în anul 1, corectat de disponibilitate și de condițiile meteo din perioada de test).

---

## 12. CONDIȚII DE RECEPȚIE PE FAZE — TOLERANȚE ȘI ABATERI ADMISIBILE

### 12.1. Fazele de recepție (Legea 10/1995, HG 273/1994)

| Fază | Moment | Conținut | Documente |
|---|---|---|---|
| **Recepții cantitative / materiale** | la livrare | verificare cantitate, certificate, flash-test, aspect | PV recepție materiale |
| **Recepții lucrări ascunse** | pe parcurs | trasee îngropate, prize, fundații, cabluri acoperite | PV lucrări ascunse + foto |
| **Recepții pe faze determinante** | conform program ISC | conform Programului de control (proiectant/ISC) | PV faze determinante |
| **PIF / probe electrice** | înainte de energizare | verificările § 11 | rapoarte de încercare |
| **Recepția la terminarea lucrărilor (RTL)** | final execuție | funcțional complet, probă 72 h, conformare RfG | PV RTL (comisie) |
| **Recepția finală** | după perioada de garanție | verificarea comportării în exploatare, remedieri | PV recepție finală |

Nicio fază nu se acceptă cu **neconformități majore** neremediate. Neconformitățile minore se consemnează în **anexa de remedieri** cu termen și responsabil.

### 12.2. Tabel sinoptic — toleranțe și abateri admisibile

| Mărime | Toleranță / abatere admisă |
|---|---|
| Putere modul (flash-test control vs. fabrică) | ± 3 % (incl. incertitudine) |
| Toleranță de putere modul (lot) | 0 / +5 W (fără negativ) |
| Orientare (azimut) mese | ± 2° |
| Înclinare (tilt) module | ± 1° |
| Planeitate/aliniere mese | ± L/500 |
| Cupluri de strângere | conform fișă ± 10 % |
| Cădere de tensiune DC string→invertor | ≤ 1 % (max. tehnic 3 %) |
| Cădere de tensiune AC | ≤ 1 % pe tronson |
| V_oc string măsurat vs. calculat (la temp.) | ± 5 % |
| Dispersia I_sc/I_op între stringuri identice | ± 5 % (corectat de iradiere) |
| P_STC corectată I-V vs. așteptat | ≥ 95 % |
| Rezistența de izolație DC | ≥ 1 MΩ (țintă ≫ 40 MΩ) |
| Rezistența prizei de pământ | < 1 Ω |
| Continuitate PE / segment | < 0,1 Ω (orientativ) |
| ΔT termografie borne/conectori | ≤ 10 K (peste = neconformitate) |
| Adâncime pozare cablu | ≥ 0,7 m (0,8 m sub carosabil / MT) |
| Randament invertor (măsurat vs. garantat) | în limita incertitudinii de măsură |
| THD curent injectat | < 3 % (la P_n) |
| Praguri relee / PdI | conform reglaj, ± toleranța releului |
| PR test (an 1) vs. garanție | ≥ valoarea garantată corectată |

### 12.3. Clasificarea neconformităților

**Majore (blocante pentru energizare/recepție):** inversare de polaritate; izolație DC < 1 MΩ; R_p > 1 Ω; fuzibile gG (AC) montate pe DC; SPD absente/defecte; relee de protecție nereglate sau PdI nefuncțională; hot-spot periculos la borne; module cu toleranță negativă; conectori de mărci incompatibile. **Minore (remediere cu termen):** etichetări incomplete, retușuri de zincare, abateri de aliniere sub prag, documentație incompletă neesențială.

---

## 13. LIVRABILE, GARANȚII ȘI CONDIȚII CONTRACTUALE DE CALITATE

### 13.1. Documentația „as-built" și cartea tehnică

La recepție, executantul predă (parte din cartea tehnică a construcției, Legea 10/1995): scheme monofilare și de conexiuni „as-built"; planurile de trasee (DC/AC/MT) actualizate; listele complete de stringuri, invertoare, combinere cu adresele și legăturile; rapoartele de flash-test și seriile modulelor pe poziții; **toate rapoartele de încercare** (I-V, izolație, continuitate PE, R_p, termografie, relee, cablu MT); certificatele/DoP ale echipamentelor; PV-urile de lucrări ascunse și faze determinante; fișierele de parametrizare invertoare/PPC/relee; manualele de exploatare și planul de mentenanță; documentația de conformare RfG (FON).

### 13.2. Garanții tehnice (verificabile)

| Element | Garanție uzuală de referință |
|---|---|
| Garanție de produs module | ≥ 12–15 ani |
| Garanție de performanță module | ≥ 25 ani (≥ 84,8 % P_max la 25 ani) |
| Garanție invertoare | ≥ 5–10 ani (extensibilă) |
| Garanție structuri (coroziune) | ≥ 10–25 ani (funcție de zincare) |
| Garanție lucrări de execuție (EPC) | ≥ 2 ani (legală) + garanție de bună execuție |
| Garanție de PR (performance guarantee) | conform contract EPC/O&M, verificată cu SCADA + meteo |

Garanțiile se probează cu **documente scrise** de la producători/executant; parametrii garantați (toleranță, degradare, randament, PR) sunt cei declarați în fișele care au stat la baza acceptării materialelor.

### 13.3. Măsuri de securitate a muncii și PSI în execuție

Execuția respectă legislația SSM (Legea 319/2006, HG 1146/2006) și PSI: lucrul la MT numai cu personal autorizat și cu **fișe de manevre / autorizații de lucru**, echipamente de protecție DC/MT (mănuși, unelte izolate, detectoare de tensiune), semnalizarea și îngrădirea zonelor sub tensiune, stingătoare adecvate incendiilor electrice (CO₂/pulbere) la PT și invertoare, și **procedura de securitate DC** (arc-flash, imposibilitatea deconectării stringurilor sub soare). Postul de transformare se dotează conform normelor PSI și de mediu (retenție ulei, ventilație).

---

## 14. SINTEZĂ PARAMETRICĂ (RECAPITULARE FORMULE PENTRU ORICE P_DC)

| Categorie de lucrare | Cantitate | Formulă (funcție de P_DC) | Exemplu 2 MWp |
|---|---|---|---|
| A — Module | N_mod | P_DC·1000 / P_mod | 3.618 |
| B — Structuri (mese) | funcție de nr. module/masă | N_mod / (module/masă) | conform layout |
| C — Cablu DC | L_DC | ≈ N_str × 2 × ℓ_med | ≈ 16 km |
| C — Cablu AC/MT | funcție de trasee | din planuri | din planuri |
| D — Combinere | N_cb | ⌈N_str / k_cb⌉ | 6 |
| D — Fuzibile gPV | ≈ 2×N_str (dacă protejate ambii poli) | 2×N_str | ~268 |
| D — SPD DC | N_spd,dc | 2×N_cb + 2×N_inv | ~28 |
| E — Invertoare | N_inv | ⌈P_AC / P_inv⌉ = ⌈(P_DC/ILR)/P_inv⌉ | 8 |
| F — Transformatoare | N_PT | ⌈1,05·(P_DC/ILR) / P_T⌉ | 1 |
| F — Celule MT | funcție de N_PT + schema OD | 3–4 / PT + sosiri | 4 |
| G — Racord | nivel de tensiune | LES 20 kV (P_AC > ~1 MW) | LES 20 kV |
| H — Prize de pământ | rețea generală + N_pe local | perimetru + N_PT + puncte grup | inel + local |
| I — SCADA/PPC/meteo | 1 sistem/parc | 1 (+ stație meteo/zonă) | 1 |

Prin aplicarea acestor formule, prezentul caiet de sarcini se **instanțiază la orice putere P_DC** aleasă de utilizator, păstrând neschimbate **specificațiile de calitate** (care nu depind de putere) și scalând doar **cantitățile**. Exemplul de 2,0 MWp are exclusiv rol ilustrativ.

---

## 15. TABEL RECAPITULATIV — PROBE ȘI VERIFICĂRI OBLIGATORII LA RECEPȚIE

| # | Probă / verificare | Categoria | Standard | Criteriu | Document |
|---|---|---|---|---|---|
| 1 | Flash-test control module | A | IEC 61215 | ±3 % vs. fabrică; 0 negativ | PV recepție |
| 2 | Inspecție vizuală / EL module | A | IEC 61215 | fără fisuri/delaminare | PV + rapoarte EL |
| 3 | Cupluri de strângere structură | B | fișă / ISO 898 | ± 10 % | PV cupluri |
| 4 | Aliniere / planeitate mese | B | proiect | ± L/500, azimut ±2°, tilt ±1° | PV |
| 5 | Continuitate echipotențializare rame | B/H | I7/2011 | < 0,1 Ω/segment | raport |
| 6 | Polaritate stringuri | C | IEC 62446 | corectă | raport PIF |
| 7 | V_oc / I_sc pe string | C | IEC 62446 | ±5 %; dispersie ≤5 % | raport PIF |
| 8 | Caracteristica I-V pe string | C | IEC 62446 | P_STC ≥95 %, curbă netedă | raport I-V |
| 9 | Izolație DC | C | IEC 62446 | ≥ 1 MΩ | raport |
| 10 | Fuzibile gPV / sectionare / SPD DC | D | IEC 62548 | conform proiect | PV |
| 11 | Parametrizare + randament invertor | E | 62109 / 50530 | config export; η garantat | PV parametrizare |
| 12 | Test protecție de interfață RfG | E/F | ANRE 208/2018 | praguri U/f, timpi | raport |
| 13 | Încercări transformator | F | SR EN 60076 | raport/izolație/u_k | buletin |
| 14 | Reglaj + injecție secundară relee | F | SR EN 60255 | 50/51/51N/67N conform | PV reglaj |
| 15 | Încercare cablu MT (VLF/izolație) | G | norme OD / PE 116 | fără străpungere | buletin |
| 16 | Contorizare (montaj + sigilare) | G | Ord. 59/2013 | PV OD/OMEPA | PV |
| 17 | Rezistența prizei de pământ | H | PE 116 | < 1 Ω | raport |
| 18 | LPS (captatoare/coborâri) | H | 62305 | conform LPL | PV |
| 19 | Termografie IR | toate | 62446-3 | fără hot-spot periculos | raport termo |
| 20 | Test SCADA / PPC (setpoint) | I | 61724 / RfG | comandă = realizat | PV |
| 21 | Probă de funcționare 72 h + PR | toate | contract | stabil; PR ≥ garanție | raport final |
| 22 | Conformare RfG (FON) | G | Reg. UE 2016/631 | notificare finală acceptată | dosar FON |

Toate rezultatele se centralizează într-un **dosar de PIF** care condiționează recepția la terminarea lucrărilor și punerea în funcțiune comercială.

---

## 16. PRESCRIPȚII DETALIATE DE EXECUȚIE PE OPERAȚIUNI (COMPLETĂRI)

Prezentul capitol detaliază, la nivel de **operațiune de șantier**, cerințele de punere în operă care condiționează calitatea și recepția, completând specificațiile de produs din capitolele 2–10.

### 16.1. Ordinea tehnologică de execuție (succesiune impusă)

Lucrările se execută într-o succesiune care garantează că nicio categorie nu compromite calitatea alteia și că verificările intermediare pot fi realizate:

1. Trasarea topografică a câmpului și a traseelor (repere materializate, verificate față de planul de amplasament).
2. Execuția prizei de pământ orizontale (inel/rețea) **înainte de umplerea șanțurilor** — condiție pentru PV lucrări ascunse și pentru legarea ulterioară a tuturor maselor.
3. Realizarea fundațiilor/piloților și montajul structurilor metalice, cu recepția cuplurilor și a alinierii.
4. Pozarea infrastructurii de cabluri (jgheaburi, tuburi, șanțuri) și tragerea magistralelor DC/AC/MT — cu marcaje de traseu.
5. Montajul modulelor pe structuri, cu echipotențializarea ramelor efectuată **concomitent** (nu ulterior — accesul devine dificil).
6. Cablarea stringurilor la combinere/invertoare, cu **verificarea polarității și V_oc pe fiecare string înainte** de cuplarea la invertor.
7. Montajul și racordarea invertoarelor, tablourilor AC și a postului de transformare (transformator, celule MT, relee).
8. Montajul echipamentelor de monitorizare (SCADA, PPC, stație meteo).
9. Verificările și probele fără tensiune (izolație, continuitate, polaritate, priză de pământ).
10. Energizarea etapizată (aprobată de OD), verificările sub tensiune, termografia, testele de protecție și de conformare RfG.
11. Proba de funcționare și recepția.

Abaterea de la această succesiune (ex. acoperirea prizei de pământ înainte de PV, cuplarea invertorului fără verificarea polarității) constituie **abatere de execuție** cu consecințe la recepție.

### 16.2. Execuția prizei de pământ — detalii de operațiune

Platbanda OL-Zn 40×4 mm se pozează pe **fundul șanțului**, pe pat de pământ vegetal fără pietre ascuțite (pentru contact bun cu solul), la adâncime ≥ 0,8 m. Îmbinările platbandelor se fac prin **suprapunere pe minimum 2× lățimea benzii** și **sudură pe toate laturile de contact**, protejată apoi anticoroziv (bandă bituminoasă / vopsea de zinc). Coborârile și legăturile la structuri se fac cu **cleme certificate** sau sudură aluminotermică (cadweld), inspectate vizual. Rezistivitatea solului se determină **înainte** de execuție (metoda Wenner cu 4 electrozi), pentru dimensionarea numărului de electrozi verticali; într-un sol de rezistivitate ρ, rezistența unui electrod vertical de lungime L și diametru d scade aproximativ ca R ≈ (ρ/2πL)·ln(4L/d), iar legarea în paralel/inel a mai multor electrozi reduce rezistența globală sub 1 Ω. Măsurarea finală se face după realizarea completă a rețelei, în condiții de sol uscat (caz defavorabil); dacă valoarea depășește 1 Ω, se adaugă electrozi și/sau se tratează solul (bentonită, săruri conductive ecologice) până la conformare, cu remăsurare.

### 16.3. Tragerea și confecționarea capetelor de cablu MT — detalii

Cablul MT 12/20 kV se trage cu **efort de tracțiune controlat** (cap de tragere pe conductor sau ciorap pe manta, cu limitare de forță) și **raze de curbură ≥ 15×D** în timpul tragerii; se evită torsionarea și strivirea. Confecționarea **terminalelor și manșoanelor** (kituri termocontractabile/cold-shrink certificate) se execută **exclusiv de electricieni autorizați ANRE MT**, în condiții de curățenie, umiditate controlată și temperatură conform instrucțiunii kitului, cu **respectarea distanțelor de dezizolare** și a tratării ecranului de câmp. Fiecare capăt se etichetează și se consemnează în fișa de montaj. Înainte de PIF se execută **încercarea cablului** (izolație + tensiune mărită VLF 0,1 Hz conform normelor OD); cablul se pune sub tensiune **numai** de către operatorul de distribuție.

### 16.4. Breviar de verificare a căderii de tensiune (control la recepția proiectului de execuție)

Executantul verifică, pe baza breviarelor, că secțiunile puse în operă respectă căderile de tensiune admise. Pentru un tronson DC de string, căderea de tensiune se calculează cu ΔU = 2·ρ_Cu·L·I_mpp / S, unde ρ_Cu ≈ 0,0178 Ω·mm²/m (la temperatura de lucru se majorează cu ~ (1+0,004·ΔT)), L = lungimea simplă a traseului, S = secțiunea. Criteriul: ΔU/V_mpp ≤ 1 %. Pe partea AC, în trifazat, ΔU = √3·L·I·(R·cos φ + X·sin φ). Dacă o secțiune pusă în operă nu satisface criteriul (de ex. la stringuri periferice cu drum lung), se **majorează secțiunea** (min. 6 mm² în loc de 4 mm²) — verificarea este obligatorie **înainte** de tragerea magistralelor.

### 16.5. Verificarea coordonării siguranțelor și a curentului invers al modulului

Fuzibilul gPV de string se alege astfel încât 1,5·I_sc,STC ≤ I_n,fuzibil ≤ I_R,modul (curentul maxim invers admis de modul, din fișa tehnică — de regulă 15…25 A). Se verifică pe fișa modulului valoarea „Maximum series fuse rating" și „Maximum reverse current"; fuzibilul ales nu trebuie să depășească această valoare (altfel modulul nu e protejat la curent invers). Numărul de stringuri care pot fi legate în paralel **fără** protecție la curent invers se limitează conform IEC 62548 (funcție de I_R al modulului). Executantul prezintă la recepție **tabelul de coordonare** (I_sc, fuzibil ales, I_R modul) pentru fiecare tip de string.

### 16.6. Condiții de mediu pentru execuție

Montajul modulelor și confecționarea manșoanelor MT nu se execută pe **ploaie, ninsoare, ceață densă sau vânt puternic** (risc pentru personal la lucrul în înălțime și pe structuri, risc de umiditate în conexiuni). Cuplarea conectorilor DC se face pe **conectori uscați și curați**; conectorii umezi/murdari se curăță și se usucă înainte. Lucrările la MT și energizările se planifică în ferestre meteo favorabile. Temperatura de lucru pentru manșoane/terminale MT respectă intervalul din instrucțiunea kitului (uzual > +5 °C sau cu preîncălzire).

---

## 17. ORGANIZAREA CONTROLULUI CALITĂȚII, MENTENANȚA ȘI GESTIONAREA DEȘEURILOR

### 17.1. Planul de control al calității, verificări și încercări (PCCVI)

Executantul întocmește și supune aprobării (proiectant + diriginte + RTE) un **PCCVI** care listează, pe fiecare categorie de lucrare: operațiunea, documentul de referință (normativ/standard), tipul de control (vizual/măsurare/încercare), momentul (înainte/în timpul/după), criteriul de acceptare, frecvența/eșantionul, aparatul folosit (cu etalonare), responsabilul și documentul rezultat (PV/raport). PCCVI-ul devine **matricea de recepție** — nicio operațiune nu se închide fără documentul aferent. Punctele de **oprire (hold points)** și de **martor (witness points)** se marchează explicit; la punctele de oprire lucrarea nu continuă fără avizul proiectantului/dirigintelui.

### 17.2. Etalonarea aparatelor de măsură și control (AMC)

Toate AMC-urile folosite la probe (megohmmetru, trasor I-V, telurometru/măsurător de priză, cameră IR, valiză de injecție relee, contor de referință, senzori de iradiere) au **certificate de etalonare valabile** de la laborator acreditat. Certificatele se anexează rapoartelor de încercare; incertitudinea de măsură se ia în calcul la aplicarea toleranțelor din § 12. Un rezultat obținut cu AMC neetalonat **nu este acceptat** la recepție.

### 17.3. Planul de mentenanță (predat la recepție)

Executantul predă un **plan de mentenanță** (parte a manualului de exploatare), diferențiat preventiv/predictiv/corectiv, cu cel puțin:

| Operațiune de mentenanță | Frecvență orientativă | Referință |
|---|---|---|
| Inspecție vizuală module/structuri | trimestrial | IEC 62446-2 |
| Spălare module (funcție de gradul de murdărire) | 1–2×/an sau la scădere PR | O&M |
| Termografie IR (câmp + PT + conexiuni) | anual | SR EN 62446-3 |
| Trasare I-V pe stringuri (verificare vs. amprentă PIF) | anual / la suspiciune | SR EN 62446-1 |
| Verificarea cuplurilor și a echipotențializării | anual | I7/2011 |
| Verificarea SPD (indicatoare, înlocuire cartușe) | anual | IEC 62305 |
| Măsurarea prizei de pământ | anual/2 ani | PE 116 |
| Revizia PT (trafo, celule, relee), test relee | conform normativ / anual | PE 116 / OD |
| Verificarea/curățarea filtrelor, ventilatoarelor invertoarelor | conform producător | manual |
| Verificarea grupului de măsură (sigilii) | conform OD | Ord. 59/2013 |
| Backup config SCADA/PPC/relee/invertoare | la orice modificare | procedură |

Planul include **piesele de schimb critice de rezervă** (fuzibile gPV, cartușe SPD, conectori, un modul de rezervă/tip, plăci invertoare dacă e cazul) și **procedura de securitate DC** pentru intervenții (imposibilitatea deconectării stringurilor sub soare — se lucrează dimineața/seara sau cu acoperirea modulelor).

### 17.4. Gestionarea deșeurilor și protecția mediului la execuție

Deșeurile de echipamente electrice și electronice (module defecte, invertoare, cabluri) sunt **DEEE** și se gestionează conform legislației (OUG 5/2015 / Directiva DEEE) prin operatori autorizați; **modulele fotovoltaice** intră în categoria DEEE cu obligație de colectare/reciclare de către producători (scheme EPR). Deșeurile de ambalaje (paleți, folii, cartoane) se colectează selectiv. Uleiul de transformator (dacă e cazul) și bateriile se predau la operatori autorizați. Se interzice deversarea/îngroparea deșeurilor pe amplasament. La finalul execuției, amplasamentul se aduce la starea din proiect (reînierbare între rânduri, refacerea căilor de acces).

---

## 18. DISPOZIȚII FINALE

Prezentul caiet de sarcini se aplică împreună cu planșele, breviarele de calcul, memoriul tehnic și proiectul de racordare avizat de OD; în caz de contradicție prevalează documentele obligatorii și avizele ANRE/OD. Orice modificare de soluție în șantier se face **numai cu dispoziție de șantier semnată de proiectant** și, când e cazul, cu acordul verificatorului de proiect și al OD. Materialele și echipamentele echivalente propuse de executant se acceptă numai dacă au **caracteristici garantate cel puțin egale** cu cele din prezentul caiet, dovedite documentar și aprobate în scris de proiectant. Recepția se consideră realizată numai la îndeplinirea **tuturor** criteriilor din tabelele § 12 și § 15 și la predarea completă a cărții tehnice.

---

*Caiet de sarcini — instalații electrice, faza P.Th./D.E., pentru centrală electrică fotovoltaică cu putere instalată parametrică P_DC (exemplu numeric etichetat la 2,0 MWp). Document redactat conform normativelor și standardelor în vigoare la data proiectării; se actualizează la edițiile curente ale reglementărilor citate.*
