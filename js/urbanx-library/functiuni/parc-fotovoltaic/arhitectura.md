# Memoriu tehnic de arhitectură / amenajarea teritoriului — DTAC
## Centrală electrică fotovoltaică (parc FV) — mese fixe 2V, racord LES/PT medie tensiune
### Metodologie PARAMETRICĂ (P_DC variabil 500 kWp … 50 MWp) — exemplu numeric ilustrativ 2.000 kWp (2 MWp)

---

## 0. Preambul, obiectul documentației și metodologia parametrică a memoriului

Prezentul memoriu tehnic de arhitectură constituie piesa scrisă principală a proiectului pentru autorizarea executării lucrărilor de construire (faza **DTAC**), întocmit în conformitate cu **Legea nr. 50/1991** privind autorizarea executării lucrărilor de construcții, republicată, cu modificările și completările ulterioare, și cu **Anexa nr. 1** la aceasta, care stabilește conținutul-cadru al documentației tehnice. Obiectul documentației îl constituie o **centrală electrică fotovoltaică (CEF / parc FV) la sol**, realizată din **module fotovoltaice montate pe structuri fixe de tip „mesă" în configurație 2V (două module pe verticală, portret)**, orientate spre sud, cu racordare la Sistemul Energetic Național (SEN) printr-un **post/stație de transformare de medie tensiune (0,4/20 kV sau 0,4/MT)** și o **linie electrică de racord**.

**Caracterul PARAMETRIC al memoriului.** Puterea instalată a centralei **NU este o valoare fixă**, ci un **parametru de intrare variabil**, stabilit de utilizator/beneficiar în funcție de tema de proiectare, de suprafața de teren disponibilă și de avizul tehnic de racordare (ATR) emis de operatorul de distribuție. Biblioteca UrbanX tratează întreg spectrul de puteri uzuale — de la **P_DC = 500 kWp** (proiecte mici, autoconsum industrial, comunitate energetică) până la **P_DC = 50 MWp** (parcuri utilitare mari). În consecință, **toate mărimile care depind de putere se exprimă prin FORMULE parametrice** funcție de P_DC (numărul de module, numărul de mese, suprafața de teren necesară, numărul de rânduri, densitatea de putere, producția), iar **mărimile geometrice independente de putere** (unghiul de înclinare β, distanța anti-umbrire pitch, GCR, garda la sol, înălțimea structurii) se determină o singură dată, din latitudine și din geometria mesei, și rămân **invariante la scalarea puterii**.

Această separare este esențială: **geometria câmpului (β, pitch, GCR) se dimensionează din fizica solară și din structura mesei, NU din putere**; **dimensiunea câmpului (câte module, câte mese, câte hectare) se scalează cu puterea**. Un parc de 500 kWp și unul de 50 MWp au **aceeași secțiune caracteristică** (aceeași mesă, același unghi, același pitch), dar diferă prin **numărul de repetiții** ale acestei unități în plan. Consecință de proiectare: se dimensionează o **„celulă-tip" invariantă** (mesa 2V + coridorul de pitch) și se **replică** parametric până se atinge P_DC cerut.

Pentru claritate și verificabilitate numerică, memoriul folosește pe tot parcursul un **exemplu numeric ilustrativ, etichetat explicit „EXEMPLU 2 MWp"**, cu următoarele ipoteze de dimensionare (a se vedea §0.2). Toate valorile numerice ale exemplului sunt derivate prin substituirea P_DC = 2.000 kWp în formulele parametrice; **pentru orice altă putere, aceleași formule produc rezultatul corespunzător**.

Particularitatea proiectării arhitecturale a unei centrale fotovoltaice este că **„arhitectura" nu se rezumă la clădiri** — parcul FV are foarte puține construcții propriu-zise (postul/stația de transformare în anvelopă prefabricată și, eventual, o cabină de comandă/pază), iar substanța actului arhitectural este **organizarea sitului**: dispunerea geometrică a câmpului de module, definirea tramei de mese și a coridoarelor, calculul distanței între rânduri pentru evitarea umbririi, trasarea drumurilor de incintă și a platformelor tehnice, împrejmuirea și integrarea peisagistică, gestiunea apelor pluviale și amenajarea covorului vegetal. Din acest motiv, memoriul se intitulează **„memoriu tehnic de arhitectură / amenajarea teritoriului"** și tratează cu prioritate **organizarea generală a incintei** ca operă de proiectare, iar clădirile ca elemente punctuale integrate în această organizare.

### 0.1. Corelarea cu celelalte piese (fără duplicare)

Memoriul se corelează obligatoriu cu celelalte piese scrise și desenate ale proiectului, dar **nu le duplică** conținutul: memoriul de rezistență (dimensionarea structurilor de susținere a meselor — piloți/șuruburi de fundare, profile, verificări la vânt și seism — piesă distinctă), memoriile de instalații electrice (parte DC — stringuri, invertoare; parte AC — tablouri, PT/stație, LES MT; SCADA, protecții, împământare, protecție la trăsnet), scenariul de securitate la incendiu (piesă distinctă întocmită de specialist atestat IGSU acolo unde este cazul), studiul geotehnic, studiul de radiație solară/producție energetică (PVsyst sau echivalent), studiul de evaluare a impactului asupra mediului sau memoriul de prezentare pentru procedura de mediu (după caz), și planurile de situație și detaliile. Prezentul memoriu descrie **concepția de organizare a sitului și soluția arhitecturală a clădirilor**, trimițând la piesele de specialitate acolo unde competența aparține altei discipline.

Metodologic, memoriul urmează logica **celor șapte cerințe fundamentale** aplicabile ale **Legii nr. 10/1995** privind calitatea în construcții, republicată — adaptate la specificul unei construcții energetice/instalație tehnologică — și demonstrează, capitol cu capitol, conformitatea soluției.

### 0.2. Parametrii de intrare și exemplul numeric ilustrativ

Convenția de notație a memoriului separă net **parametrii de intrare** (aleși de utilizator/impuși de sit) de **mărimile derivate** (calculate prin formule).

**Parametri de intrare (variabili):**

| Simbol | Parametru | Domeniu uzual | Valoare în EXEMPLUL 2 MWp |
|---|---|---|---|
| P_DC | putere instalată DC | **500 kWp … 50 MWp** | **2.000 kWp** |
| P_mod | putere unitară modul | 400 … 700 Wp | 555 Wp |
| φ | latitudinea amplasamentului | 43,5° … 48,3° (RO) | 46° |
| GCR_ț | Ground Coverage Ratio țintă | 0,30 … 0,45 | 0,38 |
| DC/AC | raport supradimensionare DC/AC | 1,05 … 1,25 | ~1,15 |
| L_mod | latura lungă a modulului | ~2,10 … 2,40 m | 2,278 m |
| l_mod | latura scurtă a modulului | ~1,05 … 1,30 m | 1,134 m |

**Mărimi derivate (prin formule parametrice) — valorile din coloana „EXEMPLU" rezultă prin substituție:**

| Simbol | Mărime | Formulă parametrică | EXEMPLU 2 MWp |
|---|---|---|---|
| N_mod | număr module | **N_mod = P_DC / P_mod** | 2.000.000 / 555 = **3.604** |
| L | coarda mesei 2V | **L = 2·L_mod + rost** | 2·2,278 + 0,02 = **4,58 m** |
| β | unghi de înclinare | **β ≈ φ − (5…10°)** (independent de P) | **30°** |
| D_pitch | distanță între rânduri | din anti-umbrire + GCR (indep. de P) | **12,0 m** |
| GCR | grad de acoperire | **GCR = L / D_pitch** (indep. de P) | 4,58/12,0 = **0,38** |
| S_teren | suprafață teren necesară | **S_teren ≈ N_mod·A_mod / GCR + S_servicii** | **~2,0–2,5 ha** |
| P_AC | putere AC (racord) | **P_AC = P_DC / (DC/AC)** | 2.000/1,15 ≈ **1.740 kVA** |

Numărul de module este relația fundamentală de scalare: **N_mod = P_DC / P_mod**. Toate celelalte mărimi extensive (mese, rânduri, teren, lungime de cablu, producție) se exprimă în funcție de N_mod, deci indirect de P_DC. Rezultă tabelul de scalare de referință (P_mod = 555 Wp):

| P_DC | N_mod = P_DC/P_mod | Teren orientativ (GCR 0,38, mese fixe) | P_AC (DC/AC 1,15) |
|---|---|---|---|
| 500 kWp | ~901 | ~0,55–0,7 ha | ~435 kVA |
| 1 MWp | ~1.802 | ~1,1–1,3 ha | ~870 kVA |
| **2 MWp (exemplu)** | **~3.604** | **~2,0–2,5 ha** | **~1.740 kVA** |
| 5 MWp | ~9.010 | ~5,5–6,5 ha | ~4,35 MVA |
| 10 MWp | ~18.019 | ~11–13 ha | ~8,7 MVA |
| 20 MWp | ~36.037 | ~22–26 ha | ~17,4 MVA |
| 50 MWp | ~90.090 | ~55–65 ha | ~43,5 MVA |

Valorile de teren rezultă din formula parametrică S_teren (§3.9); ele confirmă **densitatea de putere ~0,8–1,0 MWp/ha** invariantă (proprie meselor fixe la GCR ~0,38), independent de scara parcului. Racordul (PT pentru puteri mici → stație de conexiuni MT/AT pentru puteri mari) se dimensionează după P_AC — a se vedea memoriul de instalații electrice.

### 0.3. Structura documentului

Memoriul este structurat pe secvența logică a proiectării parametrice a unui parc FV: (1) date generale, temă, încadrare, cadru normativ; (2) amplasament, situația existentă, analiza terenului; (3) concepția parametrică de organizare a câmpului — geometria invariantă (β, pitch, GCR) și scalarea cu puterea; (4) trama, coridoarele, drumurile, platformele; (5) clădirea de comandă/control și PT/stația în anvelopă; (6) împrejmuirea, antiefracția, CCTV, integrarea peisagistică; (7) amenajările exterioare, apele pluviale, covorul vegetal, biodiversitatea; (8) semnalistica și avertizările de pericol electric; (9) piesele desenate; (10) bilanțul parametric de suprafețe; (11) dezafectarea și reversibilitatea; (12) sinteza de formule parametrice; (13) concluziile pe cerințe fundamentale și cele trei componente. Fiecare capitol este autonom, corelat prin trimiteri interne.

---

## 1. Date generale, tema de proiectare, categoria și clasa de importanță

### 1.1. Identificarea investiției

| Element | Descriere |
|---|---|
| Denumire obiectiv | Centrală electrică fotovoltaică P_DC (variabil), cu racord la MT |
| Tip construcție | instalație de producere a energiei din surse regenerabile (parc FV la sol) |
| Putere instalată DC | **P_DC = parametru** (500 kWp … 50 MWp); exemplu ilustrativ: **2,0 MWp** |
| Putere AC (racord) | **P_AC = P_DC / (DC/AC)**; exemplu: ~1,74 MVA |
| Amplasament | teren extravilan/intravilan cu destinație compatibilă, acces din drum public |
| Suprafață teren (St) | **f(P_DC, GCR)** — a se vedea §3.9; exemplu 2 MWp: ~2,2 ha |
| Regim de înălțime al construcțiilor | structuri metalice H ≤ ~3,0 m; PT/cabină: parter, H ≤ ~3,5 m |
| Beneficiar | dezvoltator/producător de energie / investitor SPV / comunitate energetică |
| Faza de proiectare | DTAC (+ PT pe specialități) |
| Durată de exploatare estimată | 25–30 ani (reversibil la dezafectare) |

### 1.2. Categoria și clasa de importanță

| Parametru | Valoare | Referință |
|---|---|---|
| Categoria de importanță a construcției | **„C" — normală** (structuri de montaj; PT/stație poate fi „C") | HG nr. 766/1997, Anexa 3 |
| Clasa de importanță și de expunere seismică | **III** (γ_I,e = 1,0) — construcții obișnuite | P100-1/2013, tabel 4.2 |
| Grad de rezistență la foc — PT/cabină | **II** (anvelope incombustibile) | P118-1/2013 |
| Risc de incendiu | redus la câmp; specific electric la PT/invertoare | P118-1/2013 + scenariu SU |
| Clădire înaltă? | NU (parter) | P118-1/2013 |

Această încadrare este **independentă de putere** — un parc de 500 kWp și unul de 50 MWp au aceeași categorie „C" și aceeași clasă seismică III; ceea ce se scalează cu puterea este **numărul și dimensiunea echipamentelor electrice** (PT unic → stație cu mai multe transformatoare/celule), nu categoria de importanță a structurilor.

Câmpul de module și structurile de montaj sunt tratate ca **instalații/construcții provizorii-reversibile fundate fără beton masiv** (piloți bătuți sau șuruburi de fundare), fapt cu implicații importante asupra bilanțului de impermeabilizare (cap. 10) și asupra dezafectării (cap. 11). Postul/stația de transformare în anvelopă prefabricată și eventuala cabină de comandă sunt construcții definitive fundate pe platformă/radier local.

### 1.3. Cadrul normativ aplicat

| Domeniu | Act normativ / standard |
|---|---|
| Autorizare, calitate | Legea nr. 50/1991 (+ Anexa 1), Legea nr. 10/1995, Legea nr. 350/2001 (amenajarea teritoriului și urbanism) |
| Urbanism | HG nr. 525/1996 (RGU), PUZ/PUG local, certificat de urbanism, avize |
| Energie (regenerabile) | Legea nr. 220/2008 (E-SRE), Legea nr. 123/2012 (energiei electrice), Ord. ANRE |
| Racordare la rețea | Ord. ANRE nr. 59/2013 (regulament racordare), ATR operator distribuție, norme tehnice de racordare |
| Structuri metalice / acțiuni | CR 0/2012 (bazele proiectării), CR 1-1-4/2012 (vânt), CR 1-1-3/2012 (zăpadă), P100-1/2013 (seism), SR EN 1993 (oțel) |
| Instalații electrice | I7/2011 (instalații electrice), NTE 007/08/00 (LES), PE 116, PE 118, norme ANRE |
| Protecție la trăsnet | I7/2011, SR EN 62305 |
| Securitate la incendiu | P118-1/2013, P118-2/2013, P118-3/2015 + scenariu SU (după caz) |
| Accesibilitate PMR | NP 051/2012 (revizuit), Legea nr. 448/2006 |
| Igienă, mediu, zgomot | OMS nr. 119/2014 (Norme de igienă), OUG nr. 195/2005 (mediu), Legea nr. 292/2018 (EIM), STAS 10009 |
| Deșeuri (dezafectare) | OUG nr. 5/2015 (DEEE — transpune Dir. 2012/19/UE), Legea nr. 211/2011 (deșeuri) |
| Ape pluviale | HG nr. 930/2005 (zone de protecție), NP 133, norme gospodărire ape |
| Topografie/cadastru | Legea nr. 7/1996 (cadastru), Ord. ANCPI |

### 1.4. Tema de proiectare (parametrică)

Tema-program stabilește **puterea țintă P_DC** (ca funcție de suprafața de teren disponibilă și/sau de puterea de racordare aprobată prin ATR) și solicită:

- **maximizarea producției energetice specifice** (kWh/kWp/an) prin orientare sud, înclinare optimă și minimizarea pierderilor prin umbrire între rânduri (<1–2%/an) și de la orizont — cerință **independentă de scară**;
- **utilizarea eficientă a terenului** printr-un GCR echilibrat (0,30–0,45) care să încadreze P_DC pe suprafața disponibilă fără penalizare majoră de umbrire;
- **reversibilitate maximă** — fundare fără beton masiv, astfel încât la finalul ciclului terenul să revină la categoria de folosință inițială;
- **accesibilitate completă pentru mentenanță** (drumuri, coridoare, gardă la sol);
- **securitate a incintei** și **integrare peisagistică**;
- **impact minim asupra mediului și solului** (permeabilitate ridicată, covor vegetal întreținut, biodiversitate).

Verificarea de fezabilitate a temei este directă: dacă suprafața disponibilă S_disp este dată, puterea maximă instalabilă rezultă din inversarea formulei de teren (§3.9): **P_DC,max ≈ (S_activ · GCR / A_mod) · P_mod**, unde S_activ este suprafața activă (după retrageri și servicii) și A_mod = L_mod · l_mod. Reciproc, dacă P_DC este impus, se verifică încadrarea în S_disp.

### 1.5. Obiectivele de performanță (parametric)

Performanța se exprimă prin **producția specifică** (invariantă la scară) și prin producția anuală totală (scalabilă cu P_DC):

> **E_an = P_DC × PSH_POA × PR**

unde PSH_POA (ore echivalente la putere de vârf) = iradiere pe planul modulelor (POA) / 1.000 W/m², iar PR = Performance Ratio. Pentru un amplasament RO cu POA ≈ 1.450 kWh/m²/an și PR = 0,82:

- **producția specifică** = PSH_POA × PR ≈ 1.450 × 0,82 ≈ **1.190 kWh/kWp/an** — **aceeași pentru orice putere** (proprietate a amplasamentului și a soluției, nu a mărimii);
- **producția anuală** scalează liniar: **E_an ≈ 1.190 × P_DC[kWp] kWh/an**. Pentru exemplul 2 MWp: E_an ≈ 1.190 × 2.000 = **2.380 MWh/an**. Pentru 10 MWp: ~11.900 MWh/an; pentru 50 MWp: ~59.500 MWh/an.

Producția se confirmă prin studiul dedicat (PVsyst) — nu se detaliază aici — și se reține ca țintă care justifică deciziile de organizare a câmpului.

Un al doilea indicator util, tot **invariant la putere**, este **factorul de capacitate** (capacity factor):

> **CF = E_an / (P_AC × 8.760 h)**

Pentru exemplul 2 MWp cu E_an ≈ 2.380 MWh și P_AC ≈ 1,74 MW: CF ≈ 2.380.000 / (1.740 × 8.760) ≈ **15,6%** — valoare tipică pentru FV fix în RO (13–17%). CF-ul este proprietate a amplasamentului și a soluției, nu a scării — un parc de 500 kWp și unul de 50 MWp la același amplasament au **același CF**. Aceasta confirmă din nou principiul parametric: **indicatorii de performanță specifici (kWh/kWp, PR, CF) sunt invarianți; producția totală scalează cu puterea**. Deciziile de arhitectură a sitului (β, pitch, gardă la sol) urmăresc **maximizarea acestor indicatori invarianți**, iar dimensionarea parcului (câte module, cât teren) urmărește **atingerea puterii țintă P_DC**.

Din perspectiva **temei de proiectare**, cele două întrebări-cheie ale fezabilității sunt: (1) *„câtă putere pot instala pe terenul disponibil?"* — răspuns prin P_DC,max = (S_activ·GCR/A_mod)·P_mod (§3.9); (2) *„cât teren îmi trebuie pentru puterea dorită?"* — răspuns prin S_teren = N_mod·A_mod/GCR + servicii + retrageri (§3.9). Ambele relații sunt reciproce și derivă din aceeași geometrie invariantă — motiv pentru care memoriul se poate aplica identic pe orice temă din intervalul 500 kWp … 50 MWp, fără reproiectarea conceptului, ci doar prin substituirea parametrilor de intrare.

---

## 2. Amplasamentul, situația existentă și analiza terenului

### 2.1. Localizare, acces, vecinătăți

Amplasamentul este o parcelă a cărei **suprafață trebuie să fie ≥ S_teren(P_DC)** (formula §3.9), cu acces dintr-un drum public (drum comunal, județean sau de exploatare consolidat), situată de regulă în extravilan pe teren cu categorie de folosință compatibilă (arabil, pășune degradată, teren neproductiv) sau în intravilan cu destinație admisă prin documentațiile de urbanism aprobate. Vecinătățile tipice sunt terenuri agricole, drumuri de exploatare, eventual alte parcele energetice; se verifică distanțele față de locuințe, obiective sensibile (școli, spitale), zone protejate (situri Natura 2000, arii naturale, zone de protecție ape/infrastructură).

**Criteriul de racordare** este determinant și **se accentuează cu puterea**: pentru parcuri mici (sub ~1–2 MWp) racordul se face la o linie de MT existentă printr-un PT; pentru parcuri medii-mari, distanța și capacitatea rețelei devin criterii cheie de amplasare, uneori impunând o **stație de conexiuni proprie** și o LES/LEA de racord de lungime considerabilă. Traseul de racord trebuie minimizat pentru reducerea pierderilor și a costului, influențând poziția PT/stației în incintă (cap. 4).

### 2.2. Situația juridică și categoria de folosință

Terenul se identifică prin **număr cadastral și carte funciară** (Legea nr. 7/1996), cu regim juridic clarificat (proprietate/concesiune/superficie/arendă pe durata investiției). Categoria de folosință inițială (de regulă **arabil** sau **pășune**) se menține din punct de vedere al reversibilității: câmpul FV pe piloți/șuruburi **nu impermeabilizează** solul și nu presupune scoaterea definitivă din circuitul agricol a întregii suprafețe — se aplică regimul de „construire cu caracter reversibil", cu obligația de refacere la dezafectare (cap. 11). Scoaterea din circuitul agricol, când e cerută, se limitează la suprafețele efectiv construite (platforme PT/stație, drumuri, cabină) — o fracție care, procentual, **scade odată cu creșterea puterii** (economia de scară a serviciilor).

### 2.3. Topografia și relieful

Analiza topografică se bazează pe **ridicare topografică actualizată** (plan de amplasament și delimitare, curbe de nivel la echidistanță 0,5–1,0 m, în sistem Stereo70 și cote Marea Neagră 1975). Parametrii relevanți pentru organizarea câmpului:

- **Panta terenului**: pantele line sub ~3–5% sunt ideale pentru mese fixe standard. Pante mai mari (5–15%) sunt admise, dar impun ajustarea distanței între rânduri (pitch-ul crește pe pantă nordică descendentă și scade pe pantă sudică — corecția din §3.6) și pot necesita platforme/terasări locale. Pe parcuri mari, variabilitatea topografică pe suprafață extinsă (zeci de hectare) impune **zonarea câmpului** în subzone cu pitch recalculat per pantă.
- **Expoziția (orientarea versantului)**: expoziția **sudică** este favorabilă (câștig de producție, pitch mai mic admis); expoziția nordică penalizează (pitch mai mare, umbrire mai severă la solstițiul de iarnă).
- **Riscurile geo**: zone inundabile, exces de umiditate, alunecări, tasări — verificate prin studiul geotehnic; câmpul se organizează pentru a evita zonele cu risc (culoare de scurgere, zone de retenție naturală).

Ridicarea topografică se predă atât ca **plan** (curbe de nivel + rețea de puncte cotate), cât și ca **model digital al terenului (DEM)**, care alimentează: (a) calculul zonal al pitch-ului corectat cu panta (§3.6); (b) analiza de umbrire de orizont (§2.4); (c) analiza de vizibilitate viewshed (§6.4); (d) calculul volumelor de terasamente (dacă sunt necesare platforme locale). Pe amplasamente mari, DEM-ul permite **zonarea automată a câmpului** în subzone omogene ca pantă/expoziție, fiecare cu pitch și eventual β propriu — o rafinare care crește producția fără a modifica principiul geometric. Precizia altimetrică cerută (±5–10 cm pe puncte, echidistanță curbe 0,5 m) este suficientă pentru dimensionarea meselor și a drenajului.

### 2.4. Analiza de umbrire a orizontului (far shading)

Distinctă de umbrirea între rânduri (near shading, tratată în cap. 3), **umbrirea de orizont** provine din relieful înconjurător, din construcții/vegetație înaltă la limita amplasamentului sau din obiective îndepărtate. Se determină prin **profilul de orizont** (unghiul de mascare al orizontului pe azimut, măsurat cu solarimetru/aplicație de horizon sau extras din model digital al terenului). Regula de proiectare: **primul rând de mese se retrage de vegetația/relieful de la sud** astfel încât la solstițiul de iarnă (α_s minim) umbra proiectată să nu atingă modulele în intervalul util (ora 9–15). Perdeaua vegetală perimetrală (cap. 6) se plantează **preferențial pe laturile est, vest și nord**, evitând umbrirea dinspre sud; unde perdeaua sudică e necesară, se folosesc specii de talie mică menținute la înălțime controlată. Acest criteriu este **independent de putere** — se aplică identic la orice scară, doar lungimea perimetrului analizat crescând cu suprafața.

### 2.5. Analiza resursei solare și microclimatul

Se documentează sintetic (fără a dubla studiul de producție): iradiere globală orizontală (GHI) și pe plan înclinat (POA) din baze de date (PVGIS/Meteonorm), regimul de vânt (determinant pentru dimensionarea structurilor — CR 1-1-4), regimul de zăpadă (CR 1-1-3), temperaturile extreme (influențează randamentul modulelor și dimensionarea invertoarelor), regimul de brumă/gheață și frecvența depunerilor de praf (influențează programul de curățare). Aceste date fundamentează deciziile de organizare (înclinare, gardă la sol, drenaj) și se transmit specialităților. Parametrii climatici sunt proprii **amplasamentului**, nu puterii — dar la parcuri mari trebuie verificată eventuala **variabilitate spațială** a expunerii la vânt (efecte de margine, rafale) pe suprafața extinsă.

### 2.6. Încadrarea urbanistică și documentațiile prealabile

Realizarea unui parc FV la sol presupune, ca regulă, o **documentație de urbanism aprobată** care să reglementeze funcțiunea de „producere de energie" pe teren. Cadrul:

- **Legea nr. 350/2001** privind amenajarea teritoriului și urbanismul — **art. 32** impune elaborarea și aprobarea unui **Plan Urbanistic Zonal (PUZ)** atunci când PUG-ul în vigoare **nu prevede** funcțiunea de producere a energiei pe teren, când se solicită introducerea în intravilan a unor terenuri sau când sunt necesare modificări ale reglementărilor urbanistice (POT/CUT, funcțiuni admise, retrageri). Pentru terenuri extravilane agricole, PUZ-ul reglementează schimbarea de destinație și condițiile de amplasare.
- **Ord. MDRAP nr. 233/2016** — norme de aplicare a Legii nr. 350/2001, stabilind **conținutul-cadru al PUZ**: piese scrise (memoriu general, regulament local aferent PUZ) și piese desenate la scări reglementate — **1:25.000** (încadrare în teritoriu), **1:5.000** (situația existentă/analiza), **1:2.000** (reglementări urbanistice, mobilare). Memoriul de arhitectură DTAC se corelează cu reglementările stabilite prin PUZ-ul aprobat.
- **Scoaterea din circuitul agricol** (pentru suprafețele efectiv construite/afectate, când e cerută): **Legea nr. 18/1991** (fondul funciar), **art. 92** — procedura de scoatere din circuitul agricol; **Legea nr. 17/2014** — condiții pentru terenuri agricole extravilane. Necesită **studiu pedologic (OSPA)** de încadrare pe clase de calitate (I–V) și plata **taxei de scoatere din circuitul agricol** conform **HG nr. 1132/2008** (Anexa cu tarife pe clase de calitate — clasele superioare I–II sunt taxate/protejate mai sever, orientând amplasarea spre terenuri de clasă inferioară/neproductive). Caracterul reversibil al fundării (piloți) limitează suprafața efectiv scoasă din circuit la platforme/drumuri/PT.

Aceste proceduri sunt **anterioare/concomitente DTAC** și condiționează certificatul de urbanism; memoriul de arhitectură le menționează ca temei, dezvoltarea lor aparținând documentației de urbanism și celei funciare.

### 2.7. Distanțe minime de amplasare față de rețele, infrastructuri și zone protejate

Amplasarea parcului FV și a construcțiilor sale (câmp, PT, cabină, drumuri, împrejmuire) respectă **distanțele minime și zonele de protecție/siguranță** impuse de legislația infrastructurilor și de regimul zonelor protejate. Acestea condiționează **poziția gardului, retragerile și forma incintei** (interfață arhitecturală directă) și impun **avize** de la administratorii rețelelor/obiectivelor. Distanțele sunt **independente de puterea parcului** — se aplică identic la orice P_DC — dar suprafața afectată de retrageri crește cu perimetrul.

| Vecinătate / infrastructură | Distanță minimă / zonă de protecție | Temei legal | Aviz necesar |
|---|---|---|---|
| **Drum național** | 22 m de la ax (extravilan) / 13 m (intravilan) | OG nr. 43/1997, art. 17 | CNAIR / administrator |
| **Drum județean** | 20 m de la ax | OG nr. 43/1997, art. 17 | CJ / administrator |
| **Drum comunal** | 18 m de la ax | OG nr. 43/1997, art. 17 | administrator |
| **Autostradă** | 50 m protecție / 26 m siguranță | OG nr. 43/1997, art. 17 | CNAIR |
| **Cale ferată (CFR)** | zonă protecție 100 m de la ax; zonă siguranță 20 m (extravilan) | Legea nr. 202/2016, OG nr. 12/1998 | CFR / CNCF |
| **LEA 110 kV** | culoar 20 m de o parte și de alta a axului | Legea nr. 351/2004, norme tehnice | operator transport (Transelectrica/OD) |
| **Stație electrică 110 kV** | zonă de protecție 20 m față de împrejmuire | norme tehnice energetice | operator |
| **Conductă gaze transport (>6 bar)** | 20 m culoar de protecție | Legea nr. 351/2004, NTPEE | Transgaz |
| **Gaze medie presiune (MP)** | 5 m | NTPEE | operator distribuție gaze |
| **Gaze joasă presiune (JP)** | 1 m | NTPEE | operator distribuție gaze |
| **Cursuri de apă / mal** | min. 5 m de la mal; zonă inundabilă 1% (100 ani) interzisă fără aviz | Legea nr. 107/1996 (apelor) | ANAR (Apele Române) |
| **Fond forestier (pădure)** | 50 m de la limita fondului forestier | Legea nr. 46/2008 (Codul Silvic) | ocol silvic / autoritate |
| **Obiective militare** | ~1 km de obiectiv / ~5 km de radar (după caz) | reglementări MApN | aviz MApN / SRI |
| **Aeroport / aerodrom** | aviz obligatoriu dacă H > 15 m sau în zona de protecție | RACR-OA (reglementări aeronautice) | AACR (Autoritatea Aeronautică) |
| **Zonă arheologică / sit** | zonă de protecție 50–100 m; descărcare de sarcină arheologică | Legea nr. 422/2001, OG nr. 43/2000 | Direcția de Cultură / MC |

**Implicații arhitecturale**: gardul și primul rând de mese se retrag astfel încât să respecte **cea mai restrictivă** distanță aplicabilă amplasamentului; culoarele de protecție ale LEA/gazelor traversând incinta rămân **libere de mese** (fâșii tehnice fără module, folosite ca coridoare/spații verzi); zonele inundabile 1% se exclud din câmp sau se avizează ANAR. Studiul de **glare** și avizul AACR sunt relevante lângă aeroporturi (reflexia solară nu trebuie să afecteze piloții/turnul de control). Toate retragerile se cotează pe planul de situație A-02 și se listează în borderoul de avize.

### 2.8. Parametrii-cheie de amplasare (sinteză, parametric)

Sinteza parametrilor care guvernează dispunerea câmpului (dezvoltați cantitativ în cap. 3), în raport cu bunele practici și cu criteriul anti-umbrire:

| Parametru | Valoare de proiectare | Observație |
|---|---|---|
| **Pitch (distanță între rânduri)** | **2,5–3,0 × înălțimea rândului** (h) | evită umbrirea la solstițiul de iarnă; ex.: h=2,29 m → pitch 5,7–6,9 m minim geometric la β mic, 10–12 m la β=30° |
| **Clearance (gardă la sol)** | min. **0,5 m**; recomandat **0,8–1,0 m** | vegetație, ventilație, mentenanță, zăpadă |
| **Înclinare (β)** | optim **30–35°**; compromis **20–25°** pentru zone de vânt sever | multi-criterial energie/vânt/pitch |
| **Orientare (azimut)** | **Sud ± 15°** | penalizare <1% în interval |
| **Densitate — teren ocupat efectiv** | **80–120 Wp/m²** | pe zona activă de câmp (GCR 0,35–0,45) |
| **Densitate — suprafață totală** | **40–60 Wp/m²** | pe St, incluzând servicii/retrageri |

Nota asupra pitch-ului: regula practică „pitch = 2,5–3× înălțimea panoului" este o **aproximare rapidă** consacrată; calculul riguros (formula anti-umbrire din §3.4) o rafinează funcție de latitudine și de coarda reală a mesei 2V. Pentru β = 30° și mesă 2V (h = 2,29 m), regula 2,5–3× ar da 5,7–6,9 m raportat la înălțime, dar raportat la **coarda mesei** și la criteriul „neumbrit 9–15" rezultă pitch-ul de 10–12 m adoptat — de aceea calculul geometric (§3.4) prevalează asupra regulii aproximative. Densitatea rezultată (~0,82–0,91 MWp/ha = 82–91 Wp/m² pe zona activă, ~40–60 Wp/m² pe St) confirmă încadrarea în intervalele de bună practică. **Impactul vizual** se gestionează prin perdele vegetale, culori absorbante nereflectorizante ale construcțiilor și, la parcuri mari, prin **analiză de vizibilitate (viewshed) GIS** — determinarea zonelor din care parcul este vizibil și amplasarea perdelelor vegetale în consecință (cap. 6). Toți acești parametri **rămân invarianți la putere**; ceea ce scalează este suprafața pe care se aplică.

---

## 3. Concepția parametrică de organizare a câmpului fotovoltaic

Organizarea câmpului este **actul arhitectural central** al proiectului. Ea se construiește în două etaje logice: (A) **geometria invariantă** a celulei-tip — orientare, unghi β, geometria mesei, pitch anti-umbrire, GCR — care **NU depinde de putere**; (B) **scalarea extensivă** — număr de module, mese, rânduri, teren — care **derivă din P_DC**. Distincția A/B este cheia caracterului parametric: se proiectează A o dată, se replică B până la P_DC.

### 3.1. Orientarea câmpului (invariant)

Pentru emisfera nordică, orientarea optimă a modulelor fixe este **spre sud geografic (azimut 180°)**, care maximizează captarea anuală. Abaterea de la sud (azimut sud-est/sud-vest) este admisă tehnic cu penalizare mică (până la ±15° produce pierderi <1%), fiind uneori impusă de forma parcelei sau de orientarea versantului. **Se adoptă azimut 180° (sud)** ca soluție de bază. Rândurile de mese se dispun cu axa lungă **est–vest**, modulele privind spre sud. Orientarea este **aceeași pentru orice putere**.

### 3.2. Configurația mesei — celula-tip (invariant)

Structura de montaj este o **masă fixă** care susține modulele în **configurație 2V** — două module dispuse pe verticală (portret, latura lungă verticală), unul peste altul, formând înălțimea captatoare a mesei. Dimensiunea determinantă pentru toate calculele geometrice este **coarda mesei L** (lățimea captatoare, măsurată în planul modulelor):

> **L = 2 · L_mod + rost_montaj**

EXEMPLU 2 MWp (L_mod = 2,278 m, rost ≈ 0,02 m): **L = 2 × 2,278 + 0,02 = 4,58 m**.

Această coardă este **aceeași indiferent de puterea parcului** — depinde doar de dimensiunea modulului și de configurația 2V. Numărul de module **pe lungimea** unei mese (direcția E–V) se stabilește după configurarea electrică a stringurilor și după modularea structurii; se definește un parametru **n_masă = module pe o masă** (uzual 20–40, ex. 2V × 14 coloane = 28, sau 2V × 20 = 40). Numărul de mese al parcului este atunci pur parametric:

> **N_mese = N_mod / n_masă = (P_DC / P_mod) / n_masă**

EXEMPLU 2 MWp (n_masă = 40): N_mese = 3.604 / 40 ≈ **90 mese**. Pentru 10 MWp: ~450 mese; pentru 50 MWp: ~2.250 mese. **Numărul de mese scalează liniar cu puterea**, geometria fiecărei mese rămânând identică.

### 3.3. Unghiul de înclinare optim β (invariant, funcție de latitudine)

Unghiul de înclinare care maximizează energia anuală captată de o suprafață fixă în emisfera nordică se apropie de o valoare ușor sub latitudinea locului:

> **β_opt ≈ φ − (5…10°)**

Pentru România (φ ≈ 44°…48°): β_opt ≈ 34°…38° la sud și 30°…34° la nord. În practica parcurilor moderne se adoptă unghiuri **mai mici decât optimul strict energetic anual** (25°–35°), din trei motive: (a) reducerea încărcării din vânt pe structuri (CR 1-1-4) — un unghi mai mic scade forța aerodinamică; (b) reducerea distanței între rânduri (pitch) necesare anti-umbririi, deci creșterea densității de putere pe teren (GCR mai mare); (c) reducerea auto-umbririi la ore extreme. **β depinde de latitudine, NU de putere** — un parc de 500 kWp și unul de 50 MWp la aceeași latitudine au același β. EXEMPLU 2 MWp la φ ≈ 46°: **β = 30°** (pierdere <1% față de optimul de ~34°, câștig semnificativ la pitch și vânt).

| Latitudine φ | β_opt teoretic (φ−10) | β adoptat (practic) |
|---|---|---|
| 44° (sud RO) | 34° | 32° |
| 46° (centru RO) | 36° | 30° |
| 48° (nord RO) | 38° | 28° |

### 3.4. Calculul distanței între rânduri (pitch) anti-umbrire (invariant)

Criteriul dimensionant al distanței între rânduri este **evitarea umbririi reciproce a rândurilor la solstițiul de iarnă (21 decembrie)**, când soarele are cea mai mică altitudine la amiază și umbra proiectată de un rând asupra celui din spate este maximă. Se dimensionează astfel încât rândul din spate să fie **neumbrit între orele solare 9:00 și 15:00** la solstițiul de iarnă, criteriu standard în industrie. **Pitch-ul este independent de putere** — este o proprietate a celulei-tip (mesa + β + latitudine).

**Pas 1 — altitudinea solară la amiază, solstițiu de iarnă:**

> **α_s = 90° − φ − 23,45°**

(23,45° = înclinarea axei terestre; declinația la solstițiul de iarnă = −23,45°). EXEMPLU φ = 46°: **α_s = 90 − 46 − 23,45 = 20,55°**.

**Pas 2 — înălțimea rândului (proiecția verticală a mesei):**

> **h = L · sin β**

EXEMPLU (L = 4,58 m, β = 30°): **h = 4,58 × sin 30° = 4,58 × 0,500 = 2,29 m**.

**Pas 3 — baza (proiecția orizontală a mesei pe sol):**

> **b = L · cos β**

EXEMPLU (L = 4,58 m, β = 30°): **b = 4,58 × cos 30° = 4,58 × 0,866 = 3,97 m**.

**Pas 4 — lungimea umbrei proiectate pe orizontală la amiază** (soarele pe direcția sud, azimut solar γ_s = 180°, umbra pe direcția nord, colineară cu axa de calcul):

> **D_umbra = h / tan(α_s)**

EXEMPLU (h = 2,29 m, α_s = 20,55°, tan 20,55° = 0,3748): **D_umbra = 2,29 / 0,3748 = 6,11 m**.

**Pas 5 — pitch-ul (distanța între marginile omoloage a două rânduri succesive):**

> **D_pitch = b + D_umbra = L·cos β + (L·sin β)/tan(α_s)**

EXEMPLU: **D_pitch = 3,97 + 6,11 = 10,08 m** (dimensionat la amiază, cazul cel mai sever).

**Corecția pentru fereastra orară 9–15 (proiecția azimutală).** La amiază umbra este cea mai lungă; pentru orele 9 și 15 (soarele lateralizat) componenta relevantă de umbrire se corectează cu factorul azimutal. Lungimea umbrei proiectate pe direcția nord–sud (axa dintre rânduri) la un moment oarecare:

> **D_umbra(t) = h · cos(γ_s − 180°) / tan(α_s)**

unde γ_s este azimutul solar. La amiază γ_s = 180° → cos(0) = 1 (umbra maximă). La orele 9/15, componenta cos(γ_s−180°) < 1, astfel încât **dimensionarea la amiază (γ_s=180°) este acoperitoare**. Industria folosește frecvent criteriul „neumbrit între 9 și 15", care conduce la un pitch **puțin mai mic** decât cel dimensionat strict la amiază; se adoptă valoarea optimizată economic în intervalul rezultat.

**Pitch adoptat:** pentru a atinge GCR-ul țintă (§3.5) se adoptă **D_pitch ≈ 11,5–13,0 m** (mai relaxat decât minimul anti-umbrire de 10,08 m, garantând umbrire reziduală <1%/an). EXEMPLU 2 MWp: **D_pitch = 12,0 m**. Acest pitch se aplică **identic la orice putere** — la 50 MWp câmpul are exact aceleași distanțe între rânduri, doar mai multe rânduri.

### 3.5. Ground Coverage Ratio (GCR) — invariant

**GCR** măsoară fracția din suprafața terenului acoperită de proiecția captatoare (raportul dintre coarda mesei și pitch):

> **GCR = L / D_pitch**

EXEMPLU (L = 4,58 m):

| D_pitch (m) | GCR = L/D | Umbrire anuală estimată | Densitate |
|---|---|---|---|
| 13,0 | 0,35 | <0,5% | mică |
| 12,0 | 0,38 | ~0,7% | echilibrată (adoptat) |
| 11,5 | 0,40 | ~1,0% | ridicată |
| 10,1 | 0,45 | ~1,5–2% | maximă (criteriu amiază) |
| 9,0 | 0,51 | >3% | excesivă |

**Se adoptă GCR = 0,38 (pitch ≈ 12,0 m)** — încadrat în plaja țintă 0,30–0,45, cu umbrire reziduală <1%/an. GCR este **invariant la putere**: definește densitatea de acoperire a câmpului, care este identică la 500 kWp și la 50 MWp.

### 3.6. Corecția pitch pe teren înclinat (invariant local)

Pe teren cu pantă în planul nord–sud, pitch-ul se corectează. Pentru **pantă descendentă spre nord** (rândul din spate mai jos) pitch-ul necesar **crește**; pentru **pantă ascendentă spre nord**, pitch-ul necesar **scade**. Formula corectată introduce unghiul pantei ψ (pozitiv pentru urcare spre nord):

> **D_pitch,teren = (L·sin β) / tan(α_s + ψ) + L·cos β·cos ψ** (aproximare de proiectare)

Pe pante line (<5%, ψ < ~3°) corecția este mică și se acoperă prin marja adoptată; pe pante mai mari se recalculează per subzonă. La parcuri mari, această corecție se aplică **zonal** (câmpul se împarte în subzone cu pitch propriu). Se recomandă orientarea rândurilor **paralel cu curbele de nivel** pe pante transversale.

### 3.7. Verificarea de umbrire reziduală și pierderi

Umbrirea reziduală (chiar la pitch corect dimensionat există umbrire la orele extreme din iarnă) se cuantifică prin studiul de producție (PVsyst) ca **pierdere de umbrire near-shading**, țintă <1–2%/an la GCR 0,38. Această pierdere este **procentuală și invariantă la putere** (aceeași geometrie → aceeași pierdere relativă), scalând absolut cu producția.

### 3.8. Numărul de rânduri — parametric

Pe adâncimea utilă N–S a zonei active (L_util,N–S), numărul de rânduri se calculează:

> **N_rânduri = (L_util,N–S − b) / D_pitch + 1**

EXEMPLU 2 MWp (L_util,N–S ≈ 140 m, b = 3,97, D_pitch = 12,0): N_rânduri = (140 − 3,97)/12 + 1 = 11,3 + 1 ≈ **12 rânduri**. La un parc mai mare, fie zona activă crește (mai multe rânduri), fie câmpul se organizează în mai multe „blocuri" cu aceeași structură de rânduri — **geometria rândului rămâne identică**. Numărul total de mese verifică: **N_mese = N_rânduri × mese_pe_rând**, egal cu N_mod / n_masă (§3.2).

### 3.9. Suprafața de teren necesară — formula parametrică cheie

Suprafața de teren scalează direct cu puterea, prin lanțul: putere → module → suprafață de module → suprafață de câmp (prin GCR) → + servicii și retrageri:

> **S_teren = S_câmp + S_servicii + S_retrageri**
> unde **S_câmp = (N_mod · A_mod) / GCR** și **A_mod = L_mod · l_mod**

EXEMPLU 2 MWp:
- A_mod = 2,278 × 1,134 = **2,583 mp/modul**;
- suprafață captatoare totală = N_mod × A_mod = 3.604 × 2,583 = **9.310 mp**;
- S_câmp = 9.310 / 0,38 = **24.500 mp ≈ 2,45 ha** zona câmpului (mese + coridoare pitch);
- + servicii (drumuri, PT, platforme, cabină) ~5% + retrageri/perdea ~5% → **S_teren ≈ 2,7 ha** brut, sau ~2,2–2,5 ha la o compactare bună a tramei.

Formula permite **dimensionarea directă la orice putere**. Tabelul de teren (§0.2) rezultă din această formulă. Reciproc, **puterea maximă instalabilă** pe un teren dat:

> **P_DC,max = (S_activ · GCR / A_mod) · P_mod**

unde S_activ = suprafața rămasă după retrageri și servicii. Aceasta este verificarea de fezabilitate a temei (§1.4).

### 3.10. Gardă la sol și înălțimea structurii (invariant)

Marginea inferioară a modulelor se ridică de sol cu o **gardă minimă de 0,6–0,8 m** (uzual 0,7–1,0 m), pentru: (a) creșterea și cosirea vegetației / pășunat; (b) evitarea umbririi de la iarbă și a acoperirii cu zăpadă a rândului inferior; (c) ventilarea/răcirea modulelor (randament); (d) mentenanță și inspecție. Înălțimea maximă a structurii:

> **h_sus = gardă + L · sin β**

EXEMPLU (gardă 0,8 m, β = 30°): h_sus = 0,8 + 2,29 = **~3,1 m** — sub pragul construcțiilor înalte, impact vizual redus (cap. 6). **Invariant la putere.**

### 3.11. Densitatea de putere — invariant de proiectare

> **δ_P = P_DC / S_teren** (MWp/ha)

Deoarece atât P_DC cât și S_teren scalează liniar cu N_mod, **densitatea de putere este constantă** (proprie soluției geometrice, nu scării):

> **δ_P = P_mod / (A_mod / GCR + servicii/N_mod) ≈ GCR · P_mod / A_mod** (limita marilor parcuri)

EXEMPLU: δ_P ≈ 0,38 × 555 / 2,583 = 81,6 Wp/mp ≈ **0,82 MWp/ha** (pură câmp), sau ~0,73–0,91 MWp/ha cu servicii. Valoare tipică pentru mese fixe la GCR 0,38 (trackerele: 0,6–0,8 MWp/ha datorită pitch-ului mai mare). La parcurile mari densitatea crește ușor (economia de scară a serviciilor: fracția de drumuri/PT scade), tinzând spre limita GCR·P_mod/A_mod.

### 3.12. Structura de montaj și interfața arhitectură–rezistență (invariant)

Deși dimensionarea structurii aparține memoriului de rezistență, alcătuirea ei condiționează direct geometria câmpului (secțiunea caracteristică A-03) și, prin urmare, se descrie aici la nivel de interfață arhitecturală. **Masa fixă 2V** se compune din: (a) **piloți/stâlpi de fundare** bătuți sau înșurubați în sol, din profile de oțel zincat la cald (C, U, sigma) sau șuruburi de fundare (ground screws) — soluția reversibilă, fără beton; (b) **stâlpi verticali (posts)** care preiau piloții și dau înclinarea; (c) **pane/rigle (purlins)** transversale pe care se prind modulele cu cleme; (d) **contravântuiri** longitudinale/transversale care asigură stabilitatea la vânt și seism. Materialul standard este **oțelul zincat la cald** (protecție anticorozivă ≥ 25 ani, conformă duratei de exploatare) sau **aluminiul** pentru panele/clemele expuse. Alegerea fundării — piloți bătuți vs. șuruburi vs. (rar) blocuri prefabricate așezate — se face funcție de studiul geotehnic: pe soluri coezive normal consolidate se preferă piloți bătuți; pe soluri cu pietriș/rezistență ridicată sau unde baterea nu e posibilă — șuruburi de fundare; pe soluri foarte slabe sau roci de suprafață — soluții speciale. Adâncimea de fundare (uzual **1,5–2,0 m**) este dimensionată de **efortul de smulgere** (uplift) din vânt — vântul care „ridică" modulele solicită piloții la extracție, criteriu adesea determinant. Această alcătuire este **identică la orice putere** — se dimensionează o mesă-tip și se multiplică; parametric, numărul de piloți al parcului = N_mese × piloți/masă.

### 3.13. Considerații aerodinamice ale unghiului de înclinare (invariant)

Unghiul β nu este o decizie pur energetică, ci și **aerodinamică și economică**. Forța din vânt pe o suprafață înclinată crește cu unghiul și cu expunerea; conform **CR 1-1-4/2012**, presiunea de referință a vântului q_b (funcție de zona de vânt a amplasamentului) se amplifică prin coeficienți aerodinamici de presiune care depind de unghiul modulelor și de poziția în câmp (rândul din față — „margine de atac" — este cel mai solicitat; rândurile interioare sunt ecranate). Reducerea lui β de la ~34° (optim energetic) la 30° (adoptat) scade sensibil forța și, implicit, dimensiunea profilelor și adâncimea piloților — o economie de material și fundare care, la parcuri mari (mii de mese), devine substanțială. Reciproc, un β prea mic reduce producția și crește depunerea de praf/zăpadă (autocurățarea prin ploaie e mai slabă la unghi mic). **Adoptarea β = 30° este optimul multi-criterial** (energie − vânt − pitch − autocurățare) pentru latitudinile RO, invariant la scară. Rândurile perimetrale (mai expuse la vânt) pot primi contravântuire suplimentară — o rafinare de proiectare structurală care nu modifică geometria arhitecturală a câmpului.

### 3.14. Interfața cu organizarea electrică (parametric)

Organizarea geometrică a câmpului trebuie să fie **compatibilă cu configurarea electrică** — o coordonare arhitectură–instalații care influențează trama. Lanțul electric este: **module → stringuri** (module în serie, uzual 20–30/string, dimensionate de tensiunea maximă a invertorului) **→ cutii de joncțiune (combiner boxes) → invertoare → PT/stație**. Consecințe pentru plan: (a) mesele se grupează în **blocuri electrice** deservite de un invertor/o cutie de joncțiune, ceea ce sugerează dimensiunea blocului de tramă; (b) invertoarele se poziționează în **centrul de greutate electric** al blocului (minimizarea lungimii DC, care are pierderi ohmice mai mari — I²R pe secțiune DC); (c) traseele de cablu (DC în câmp, AC de la invertoare la PT) se pozează în coridoarele de mentenanță (îngropate în șanțuri sau pe estacade joase), deci **coridoarele servesc dublu — mentenanță și cabluri**. Numărul de stringuri = N_mod / (module/string); numărul de invertoare ≈ P_AC / (putere unitară invertor). Aceste mărimi **scalează cu puterea** și se detaliază în memoriul de instalații electrice; arhitectura reține doar **implicația de plan** (blocuri, poziții skid, coridoare-culoare de cablu).

### 3.15. Verificarea parametrică pe trepte de putere (exemplu comparativ)

Pentru a demonstra concret **invarianța geometriei** și **scalarea dimensiunilor**, se aplică formulele pe trei trepte de putere reprezentative (P_mod = 555 Wp, φ = 46°, β = 30°, L = 4,58 m, GCR = 0,38, A_mod = 2,583 mp — toate identice; variază doar P_DC):

| Mărime | Formulă | 500 kWp | 2 MWp (exemplu) | 20 MWp |
|---|---|---|---|---|
| Număr module | P_DC/P_mod | 901 | 3.604 | 36.037 |
| Coarda mesei L | 2·L_mod+rost | 4,58 m | 4,58 m | 4,58 m |
| Unghi β | φ−(5..10°) | 30° | 30° | 30° |
| Pitch | (invariant) | 12,0 m | 12,0 m | 12,0 m |
| GCR | L/D_pitch | 0,38 | 0,38 | 0,38 |
| Nr. mese (n_masă=40) | N_mod/40 | ~23 | ~90 | ~901 |
| Supraf. captatoare | N_mod·A_mod | 2.327 mp | 9.310 mp | 93.104 mp |
| Supraf. câmp | S_capt/GCR | 6.124 mp | 24.500 mp | 245.010 mp |
| Teren estimat | +servicii/retrageri | ~0,7 ha | ~2,2–2,7 ha | ~28–30 ha |
| Densitate | P_DC/St | ~0,71 MWp/ha | ~0,91 MWp/ha | ~0,70 MWp/ha* |
| Producție anuală | P_DC·PSH·PR | ~595 MWh | ~2.380 MWh | ~23.800 MWh |
| PT/stație | ∝ P_AC | 1 PT | 1 PT | stație + multiple PT |
| Sc definitiv | trepte cu P | ~50 mp | ~130 mp | ~500 mp |
| POT (Sc/St) | — | ~0,7% | ~0,6% | ~0,17% |

*Notă: densitatea variază ușor între exemple din cauza modului diferit de estimare a serviciilor/retragerilor la fiecare treaptă și a compactării tramei; valoarea de referință a **soluției** (limita §3.11, δ_P ≈ GCR·P_mod/A_mod ≈ 0,82 MWp/ha pe câmp pur) rămâne invariantă. Se observă:*

- **coloanele geometrice (L, β, pitch, GCR) sunt identice** pe toate treptele — confirmă că secțiunea caracteristică A-03 este universală;
- **coloanele extensive (module, mese, teren, producție) scalează liniar** cu P_DC;
- **POT-ul scade cu puterea** (economia de scară a construcțiilor definitive) — de la ~0,7% la 500 kWp la ~0,17% la 20 MWp;
- proiectarea unui parc de orice putere se reduce la: (1) dimensionarea **o dată** a celulei-tip; (2) **replicarea** ei până la P_DC; (3) adăugarea serviciilor (drumuri, PT/stație, cabină) scalate. Aceasta este esența metodologiei parametrice.

### 3.16. Analiza pierderilor prin umbrire și randamentul de captare (parametric procentual)

Umbrirea între rânduri, chiar la pitch corect dimensionat, produce o **pierdere reziduală** concentrată în lunile de iarnă și la orele extreme (dimineața/seara), când soarele este jos și rândul din spate este parțial umbrit de cel din față. Această pierdere se cuantifică prin studiul de producție (PVsyst) ca **factor de pierdere near-shading** și este **procentuală, invariantă la putere** (aceeași geometrie → aceeași pierdere relativă):

| GCR | Pitch (m) | Pierdere near-shading (%/an) | Compromis |
|---|---|---|---|
| 0,30 | 15,3 | <0,3% | teren risipit, producție max |
| 0,35 | 13,1 | ~0,5% | echilibru pe teren generos |
| 0,38 | 12,0 | ~0,7% | **adoptat** — optim teren/producție |
| 0,40 | 11,5 | ~1,0% | teren restrâns |
| 0,45 | 10,2 | ~1,5–2% | densitate maximă, penalizare |

Alegerea GCR este o **optimizare economică**: un GCR mai mare (pitch mai mic) instalează mai multă putere pe hectar (cost de teren mai mic pe MWp), dar crește pierderea de umbrire (mai puțină energie pe MWp). Optimul depinde de raportul cost-teren / valoare-energie al proiectului. **La toate treptele de putere optimul este același procentual** — de aceea GCR = 0,38 se adoptă invariabil, indiferent de scară. Pierderea totală de sistem (PR = ~0,82) însumează, dincolo de umbrire: pierderi de temperatură (modulele calde produc mai puțin — ~5–8%), pierderi ohmice DC/AC (~1–2%), pierderi la invertor (~2%), murdărire/soiling (~1–3%), reflexie/IAM (~2–3%), degradare/mismatch. Toate sunt **procentuale și invariante la scară**; arhitectura sitului influențează direct doar componentele de **umbrire** (prin pitch/GCR) și **temperatură** (prin garda la sol și ventilație).

---

## 4. Trama, coridoarele de mentenanță, drumurile de incintă și platformele tehnice

### 4.1. Principiul tramei (scalabil)

Câmpul FV se organizează într-o **tramă ortogonală** de rânduri de mese (aliniate E–V) separate de pitch pe direcția N–S, și de **coridoare de mentenanță transversale** (N–S) care segmentează câmpul în blocuri. Trama asigură: circulația personalului și a echipamentelor de mentenanță, accesul la fiecare bloc de mese și la stațiile de invertoare, compartimentarea în „câmpuri" pentru configurarea electrică (stringuri → cutii de joncțiune → invertoare → PT), și culoare pentru pozarea cablurilor DC/AC. La parcuri mici trama poate fi un singur bloc; **la parcuri mari trama se ierarhizează** (drum principal → drumuri secundare de bloc → coridoare de mese), replicând modular aceeași unitate de bloc — un principiu de scalare tipic proiectării de rețea.

### 4.2. Coridoarele de mentenanță

- **Coridorul dintre rânduri (spațiul de pitch)**: distanța liberă = D_pitch − b. EXEMPLU: 12,0 − 3,97 ≈ **8,0 m** liber — suficient pentru accesul personalului, al utilajelor mici de cosire și pentru curățare. Fâșie înierbată permeabilă, nu drum carosabil greu. **Invariant la putere.**
- **Coridoare transversale (N–S)**: lățime **3,0–4,0 m**, la fiecare 2–4 blocuri de mese, pentru acces și legătura la drumul perimetral; înierbate sau pietruite ușor. Numărul lor **crește cu numărul de blocuri**, deci cu puterea.

### 4.3. Drumurile de incintă

- **Drum de acces din drumul public**: lățime **4,0–5,0 m**, îmbrăcăminte pietruită (balast/piatră spartă) sau semi-rigidă; racord la drumul public cu rază de viraj adecvată și, la parcuri mari, benzi de accelerare/decelerare conform normelor rutiere; asigură accesul autovehiculelor de transport (inclusiv transportul transformatorului pe platformă la montaj) și al autospecialelor de intervenție ISU.
- **Drum perimetral interior (buclă)**: lățime **4,0 m**, pietruit, pe conturul câmpului între gard și primul rând, pentru patrulare/mentenanță, acces la fiecare bloc, culoar CCTV, intervenție. Buclă închisă (fără fund de sac) pentru manevrarea utilajelor. **Lungimea buclei = perimetrul câmpului**, care crește cu √(suprafață) — deci cu √(P_DC): parcurile mari au proporțional mai puțin perimetru pe MWp (economie de scară).
- **Raze de viraj**: dimensionate pentru **autovehicul greu / transport transformator și macara** — rază interioară **≥ 8–10 m** la intersecții și la platforma PT/stație (macaraua de descărcare a transformatorului are nevoie de spațiu de manevră și de platformă de sprijin stabilă); pentru autospeciale ISU se respectă gabaritul ≥ 3,5 m lățime și rază ≥ 12 m conform normelor ISU. **Invariant la putere** (dictat de gabaritul vehiculului, nu de mărimea parcului).

### 4.4. Platforma postului/stației de transformare

- **Amplasare**: cât mai aproape de punctul de racord la rețeaua MT (minimizarea traseului LES MT și a pierderilor AC), de regulă lângă drumul de acces, pentru facilitarea descărcării/montajului anvelopei prefabricate și a transformatorului.
- **Scalarea cu puterea**: pentru **puteri mici (sub ~1–2 MWp)** — un **PT unic în anvelopă prefabricată** (0,4/20 kV, gabarit ~5–7 × 2,5–3,0 m). Pentru **puteri medii-mari** — mai multe PT-uri distribuite și/sau o **stație de conexiuni MT** proprie, cu suprafață și număr de celule crescute proporțional cu P_AC. Numărul de transformatoare ≈ P_AC / puterea unitară a transformatorului (ex. 1.000–1.600 kVA/unitate).
- **Platformă**: dală/radier de beton armat local (nu impermeabilizare de câmp), plus **cuvă de retenție a uleiului** transformatorului (obligatorie — reține integral volumul de ulei în caz de avarie, protejând solul). Se dimensionează pentru accesul mentenanței și pentru manevrele de exploatare (spații de lucru în fața celulelor MT).
- Priza de pământ și centura de împământare se coordonează cu memoriul de instalații electrice (I7/2011, PE 116).

### 4.5. Platformele stațiilor de invertoare (skid)

Invertoarele (de string sau centrale) se dispun **distribuit** în câmp, pe **platforme pietruite/dale prefabricate**, apropiate de centrele de greutate electrice ale blocurilor de mese (minimizarea traseelor DC, cu pierderi mai mari). Numărul de invertoare/skiduri **scalează cu puterea** (≈ P_AC / puterea unitară a invertorului). Fiecare platformă suportă invertorul (ventilat, ferit de umbrire), este accesibilă din coridorul de mentenanță și respectă degajările de ventilație/mentenanță impuse de producător. Numărul și amplasarea aparțin memoriului de instalații electrice; **arhitectura sitului rezervă platformele și accesul**, replicându-le parametric.

---

## 5. Clădirea de comandă/control și postul/stația de transformare în anvelopă

### 5.1. Necesitatea și tipul clădirilor (scalabil)

Programul construit al unui parc FV este **minimal și scalează slab cu puterea** (economie de scară — de aici creșterea densității de putere pe parcurile mari). Elementele construite:

1. **Postul/stația de transformare** în **anvelopă prefabricată**, conținând celulele de MT, transformatorul (transformatoarele) și tabloul de JT. Pentru puteri mici — o cabină PT unică; pentru puteri mari — o **stație de conexiuni** cu mai multe celule, eventual clădire tehnologică proprie. Construcție tehnologică fără prezență umană permanentă.
2. **Cabina de comandă/pază** (opțională la parcuri mici, recomandată; obligatorie de facto la parcuri mari) — pentru echipamentul SCADA/monitorizare, tabloul de servicii proprii, birou de exploatare/pază, grup sanitar și depozit de scule/piese. La parcuri mici funcțiile pot fi integrate în anvelopa PT sau într-un **modul/container** dedicat; la parcuri mari, o clădire de exploatare mai amplă (cameră de comandă, vestiare, depozit, birou), dar oricum de dimensiuni modeste raportat la putere.

### 5.2. Cabina de comandă/pază — funcțiuni și dimensionare parametrică

Program funcțional (parter). Suprafața **crește lent, în trepte, cu puterea** — nu liniar:

| Spațiu | Su parc mic (~≤2 MWp) | Su parc mare (~≥10 MWp) | Observații |
|---|---|---|---|
| Cameră comandă/SCADA + pază | 10–14 mp | 18–30 mp | post monitorizare, dulapuri tablouri |
| Grup sanitar (accesibil PMR) | 4–5 mp | 5–8 mp (posibil 2 GS) | WC + lavoar, NP 051 |
| Depozit scule / vestiar | 4–6 mp | 10–20 mp | EIP, piese de schimb |
| Circulație/hol | 2–4 mp | 4–8 mp | acces, degajament |
| **Total Su** | **~20–29 mp** | **~40–70 mp** | parter |
| **Sc (amprentă)** | **~26–35 mp** | **~50–85 mp** | cu pereți |

Înălțime liberă interioară ≥ 2,50 m (2,70 m recomandat pentru camera de lucru). Realizată din **zidărie ușoară incombustibilă (grad II RF)** sau **modul prefabricat/container** amenajat, ambele acceptabile; se preferă anvelopă cu comportare la foc adecvată dat fiind mediul electric. **Sc rămâne o fracție mică din St, descrescând procentual cu puterea.**

### 5.3. Accesibilitatea PMR (NP 051/2012)

Cabina de comandă/pază — ca spațiu de muncă — se proiectează **accesibil**, indiferent de puterea parcului: acces la parter fără prag (sau rampă la pantă maximă **8%** la diferență de nivel), **ușă cu lățime liberă ≥ 0,90 m**, **grup sanitar adaptat PMR** (spațiu de manevră pentru scaun rulant, cerc Ø 1,50 m, bare de sprijin, lavoar și WC la cote accesibile), traseu accesibil de la parcarea de incintă la cabină pe suprafață stabilă și antiderapantă. Cerințele NP 051 se aplică proporțional cu funcțiunea, asigurând nediscriminarea (Legea nr. 448/2006).

### 5.4. Sanitar și utilități ale cabinei

- **Apă/canalizare**: la lipsa rețelei publice — branșament din sursă proprie (put forat autorizat) și **evacuare în bazin vidanjabil etanș** (fosă) sau microstație de epurare; dimensionare pentru personalul ocazional (1–3 persoane la parc mic, până la o mică echipă la parc mare).
- **Electric**: alimentare din tabloul de servicii proprii al centralei; iluminat, prize, încălzire electrică punctuală, ventilație.
- **Ventilație/climatizare**: ventilare naturală + climatizare split pentru încăperea SCADA (echipamentele electronice au cerințe de temperatură).

### 5.5. Finisaje

Finisaje **durabile, cu întreținere minimă**, adecvate mediului tehnic și expunerii exterioare:

- **Exterior**: tencuială decorativă/structurată în culori neutre integrate peisagistic (tonuri de gri/verde-oliv/bej mat, evitând suprafețe reflectante), sau placare metalică prevopsită; învelitoare din tablă/panou termoizolant cu pantă mică.
- **Interior**: pardoseli din gresie tehnică antiderapantă (R10–R11) sau covor PVC electroizolant în camera de comandă; pereți zugrăviți lavabil; tavan casetat/tencuit.
- **Anvelopa termică** a cabinei (spațiu încălzit) respectă principiile Legii nr. 372/2005 — izolare termică a pereților și acoperișului corespunzătoare clădirilor mici, tâmplărie performantă.

---

## 6. Împrejmuirea, sistemul antiefracție, CCTV și integrarea peisagistică

### 6.1. Împrejmuirea perimetrală (scalabilă cu perimetrul)

Incinta se împrejmuiește integral pentru securitate (protecția echipamentelor de valoare și a personalului, prevenirea accesului neautorizat în mediu cu pericol electric):

- **Gard perimetral**: panouri de plasă bordurată zincată/plastifiată sau plasă de sârmă zincată pe stâlpi metalici, **înălțime H = 2,0 m** (uzual 2,0–2,2 m) — **invariant la putere**. Fără soclu continuu de beton (permeabilitate, permite trecerea faunei mici la baza gardului acolo unde e cerut ecologic); stâlpi fundați punctual. **Lungimea gardului = perimetrul incintei**, care scalează cu √(P_DC).
- **Retragere a gardului** de la limitele de proprietate conform regulamentului local; **bandă liberă interioară ≥ 3,0–5,0 m** între gard și primul rând (drum perimetral + culoar CCTV + mentenanță + retragere anti-umbrire de la perdeaua vegetală).
- **Porți**: **poartă carosabilă glisantă/batantă ≥ 4,0 m** lățime liberă (vehicule mentenanță, transport transformator, autospeciale ISU) + **acces pietonal** separat (portiță ≥ 0,90 m); poartă motorizată cu control acces. La parcuri mari — eventual porți multiple.

### 6.2. Sistemul antiefracție și CCTV

- **Detecție perimetrală**: senzori pe gard (fibră optică / senzori de vibrație) sau bariere infraroșu, integrate în sistemul de alarmă antiefracție (Legea nr. 333/2003 privind paza obiectivelor). Densitatea de senzori pe metru de gard este constantă → numărul total scalează cu perimetrul.
- **CCTV**: camere cu vedere pe timp de noapte (IR), pe stâlpi la colțuri și de-a lungul perimetrului, cu acoperire completă a gardului și a zonei PT/stație; înregistrare locală + transmisie la dispecerat/pază.
- **Iluminat de securitate**: corpuri cu senzor de mișcare la porți și PT, LED cu consum redus, orientat spre interior (evitarea poluării luminoase spre vecinătăți).

Implicația arhitecturală: **stâlpii CCTV și cei de iluminat se poziționează pe banda liberă perimetrală**, fără a umbri modulele; culoarul de patrulare (drumul perimetral) servește simultan mentenanței și securității.

### 6.3. Integrarea peisagistică și impactul vizual

Parcul FV, deși de înălțime redusă (~3 m), are un impact vizual pe suprafață mare — **impact care crește cu suprafața, deci cu puterea**, cerând măsuri de integrare proporționale:

- **Perdea vegetală perimetrală**: gard viu / plantație de arbuști și arbori de talie mică-medie pe banda de retragere (≥ 3–5 m), din **specii autohtone** (păducel, corn, sânger, salcâm mic, arțar de câmp, cătină pentru soluri sărace), care mascheaza gardul și rândurile de la nivelul privitorului de la distanță, integrând incinta în peisaj. Perdeaua se dispune **preferențial pe laturile est, vest și nord** (evitând umbrirea dinspre sud); pe latura sudică — specii joase menținute sub înălțimea de umbrire (§2.4). La parcuri mari, perdeaua devine element esențial de reducere a impactului cumulat.
- **Reducerea reflexiilor (glare)**: modulele moderne au **sticlă antireflex texturată** cu reflectivitate redusă; se verifică absența glare-ului spre **receptori sensibili** (locuințe, drumuri importante, aeroporturi/căi de rulare — studiu de glare unde e cazul), înclinarea sudică orientând reflexiile în sus.
- **Culori neutre** ale construcțiilor (PT, cabină) și ale gardului.
- **Refacerea/menținerea covorului vegetal** sub și între module (cap. 7) menține caracterul verde al sitului.

### 6.4. Analiza de vizibilitate (viewshed) și studiul de glare

La parcuri de dimensiuni semnificative sau în vecinătatea unor receptori sensibili (localități, drumuri turistice, situri, aeroporturi), impactul vizual se evaluează riguros prin două instrumente:

- **Analiza de vizibilitate (viewshed GIS)**: pe baza modelului digital al terenului (DEM) și a înălțimii structurilor (~3 m), se determină **din ce zone ale teritoriului parcul este vizibil**. Rezultatul este o hartă de vizibilitate care fundamentează amplasarea și densitatea **perdelei vegetale** — aceasta se plantează prioritar pe direcțiile din care parcul este cel mai expus vizual (spre localități, drumuri principale, puncte de belvedere). Perdeaua vegetală, la maturitate, mascheaza gardul și primele rânduri de la nivelul observatorului la sol, „coborând" înălțimea aparentă a incintei. Densitatea, înălțimea la maturitate și specia perdelei se aleg funcție de rezultatul viewshed — o soluție **scalată cu vizibilitatea**, nu uniformă.
- **Studiul de glare (reflexie orbitoare)**: modulele FV au suprafață de sticlă care poate reflecta lumina solară. Deși sticla antireflex texturată reduce reflectivitatea la valori mici (module moderne — reflexie difuză, nu speculară), în vecinătatea **aeroporturilor/aerodromurilor** (protecția piloților și a turnului de control) și a **drumurilor/căilor ferate importante** (protecția conducătorilor auto) se poate impune un **studiu de glare** care simulează, pentru fiecare oră/zi a anului, dacă și când reflexia atinge un receptor și cu ce intensitate. Rezultatul poate condiționa orientarea/înclinarea locală sau adoptarea de module cu tratament antireflex superior. Avizul **AACR** (Autoritatea Aeronautică Civilă Română, conform RACR-OA) este obligatoriu în zonele de protecție aeroportuară. Orientarea sudică și înclinarea de ~30° dirijează, în general, reflexiile **în sus** (spre cer), reducând riscul de glare spre observatori la sol — un argument suplimentar al soluției geometrice adoptate.

Ambele analize sunt **proporționale cu scara și cu contextul** — un parc mic izolat poate să nu le necesite, în timp ce un parc mare lângă o localitate/un aeroport le impune. Ele nu modifică geometria invariantă a câmpului, ci **calibrează măsurile de integrare** (perdea, tratament sticlă, avize).

---

## 7. Amenajările exterioare, gestiunea apelor pluviale, covorul vegetal și biodiversitatea

### 7.1. Permeabilitatea ridicată și gestiunea apelor pluviale

Trăsătura definitorie a unui parc FV bine proiectat este **permeabilitatea foarte ridicată a solului** — proprietate **invariantă la putere** (procentual identică la 500 kWp și la 50 MWp): câmpul de module fundat pe piloți/șuruburi **nu impermeabilizează** terenul; apa de ploaie se infiltrează în sol între și sub module. Suprafețele efectiv impermeabilizate (platforme PT/stație, cabină, drumuri pietruite semi-permeabile) reprezintă **sub ~1% din teren** și, procentual, **scad cu creșterea puterii** (economia de scară a serviciilor).

- **Scurgerea de pe module**: apa colectată de suprafața modulelor picură pe fâșia de sol de sub marginea inferioară a mesei. Pentru a evita **eroziunea liniară** sub picurătorul rândurilor, se menține **covor vegetal dens** (rădăcinile fixează solul) și, la nevoie, o fâșie de piatră/pietriș sub picurător pe soluri erodabile.
- **Managementul apelor de suprafață**: pe amplasamente cu exces de apă sau pantă se prevăd **canale/rigole înierbate de infiltrare (swale)** pe direcția drumurilor și șanțuri perimetrale care conduc apa spre zone de infiltrare/retenție, evitând băltirea la mese și la platforma PT. Se respectă principiul **gestiunii apelor pe amplasament** (infiltrare, nu descărcare rapidă în emisar), reducând vârful de scurgere. La parcuri mari, dimensionarea rigolelor și a bazinelor de retenție se face pentru debitul cumulat al întregii suprafețe (calcul hidrologic pe suprafață scalată).
- **Platforma PT/stație**: dală betonată cu pantă de scurgere ferind cuva de retenție de apa pluvială și dirijând apa curată în teren.

### 7.2. Covorul vegetal întreținut

Sub și între module se menține **covor ierbos permanent**:

- **Amestec de semințe** cu graminee rezistente la umbră parțială și secetă, plus **specii melifere/flori de câmp** (favorizează polenizatorii) — o „pajiște semi-naturală" cu întreținere redusă.
- **Managementul vegetației** — două opțiuni principale, ambele evitând erbicidele:
  - **Cosire mecanică** periodică (2–4 ori/an) cu utilaje ușoare, menținând iarba sub garda de sol (0,6–0,8 m) pentru a nu umbri rândul inferior;
  - **Pășunat controlat cu ovine** (oi) — soluție eco-economică frecventă la parcurile FV („solar grazing"): oile pasc iarba, fertilizează natural, nu deteriorează structurile (spre deosebire de animale mari); gardul de 2 m și garda la sol suficientă permit pășunatul în siguranță. Menține dublul folos agricol/energetic (agrivoltaic parțial) — deosebit de valoros la parcurile mari, care ocupă suprafețe agricole însemnate.
- **Fără erbicide/pesticide** — protecția solului și a apei freatice (OUG nr. 195/2005).

### 7.3. Biodiversitatea

Parcul FV corect gestionat devine un **refugiu de biodiversitate** în peisajul agricol intensiv:

- pajiștea neierbicidată și înflorită susține **insecte polenizatoare** și avifaună;
- gardul permeabil la bază și perdeaua vegetală creează **coridoare/habitate** pentru fauna mică;
- absența lucrărilor agricole intensive pe durata exploatării permite **refacerea solului și a microfaunei**;
- se pot instala **hoteluri de insecte / căsuțe pentru păsări** pe perimetru ca măsuri de compensare/ameliorare ecologică (uneori cerute prin acordul de mediu). La parcuri mari, aceste măsuri devin condiții frecvente ale procedurii de mediu (Legea nr. 292/2018).

### 7.4. Amenajări exterioare punctuale

- **Parcaj de incintă**: 1–2 locuri lângă cabină/poartă (mai multe la parcuri mari), pe platformă pietruită, inclusiv un loc accesibil PMR dacă e cazul.
- **Spații de depozitare temporară** pe timpul execuției (organizare de șantier reversibilă).
- **Trotuar/alee de acces** accesibilă la cabină (§5.3).

---

## 8. Semnalistica, marcajele și avertizările de pericol electric

Semnalistica de securitate este **obligatorie** într-un obiectiv cu instalații electrice de MT și JT, indiferent de putere (densitatea plăcilor pe gard este constantă → numărul total scalează cu perimetrul):

- **La împrejmuire/poartă**: plăci de avertizare „**PERICOL DE ELECTROCUTARE — INTRAREA INTERZISĂ PERSOANELOR NEAUTORIZATE**", „ACCESUL INTERZIS", cu pictograme standardizate (fulger pe fond galben, triunghi negru — SR EN ISO 7010), la interval regulat pe gard și la fiecare poartă.
- **La PT/stație și platformele de invertoare**: marcaje „**ÎNALTĂ TENSIUNE — PERICOL DE MOARTE**", indicatoare de securitate, schema electrică afișată, EIP obligatoriu, plan de intervenție.
- **La stringuri/cutii de joncțiune**: etichetare „**TENSIUNE CONTINUĂ PERICULOASĂ — MODULELE SUNT SUB TENSIUNE LA LUMINĂ**" — particularitate FV critică: modulele produc tensiune DC cât timp există lumină, chiar cu invertoarele oprite (avertisment esențial pentru intervenția ISU și mentenanță).
- **Marcaje de circulație**: sensuri și limite pe drumurile de incintă, marcaj poziții PT/invertoare, **numerotarea blocurilor de mese** (esențială la parcuri mari pentru localizarea defectelor în mentenanță).
- **Semnalistică de urgență**: puncte de prim-ajutor, stingătoare (la PT și cabină), plan de evacuare, indicatoare ISU.
- **Panou de identificare a obiectivului** la intrare (denumire, beneficiar, proiectant, autorizație de construire), conform Legii nr. 50/1991.

Toate marcajele și avertizările se detaliază pe **planul de situație** și pe planurile electrice (memoriul de instalații).

---

## 9. Piesele desenate aferente memoriului de arhitectură/amenajare

Memoriul se corelează cu următoarele piese desenate (faza DTAC), care ilustrează grafic soluția (componenta grafică — cap. 13). **Piesele sunt aceleași la orice putere**; ceea ce se scalează este întinderea planului de situație și numărul de repetiții ale tramei:

| Nr. | Planșă | Scară uzuală | Conținut |
|---|---|---|---|
| A-01 | **Plan de încadrare în zonă / teritoriu** | 1:5.000 / 1:10.000 | poziția amplasamentului, accesul din drumul public, racordul la rețeaua MT, vecinătăți |
| A-02 | **Plan de situație** | 1:500 / 1:1.000 (parcuri mari: 1:2.000) | limita de proprietate, retrageri, **trama meselor** (rânduri + pitch), drumuri de incintă, platforma PT/stație, cabina, împrejmuire, perdea vegetală, cote generale, bilanț suprafețe |
| A-03 | **Secțiune caracteristică prin mese** | 1:50 / 1:100 | mesa 2V, unghiul β, garda la sol, înălțimea structurii, **pitch-ul** între rânduri, geometria anti-umbrire (h, b, D_umbra) — **piesa care exprimă celula-tip invariantă** |
| A-04 | **Plan + secțiuni cabină comandă/pază** | 1:50 | compartimentare, cote, accesibilitate PMR, finisaje |
| A-05 | **Plan amplasare / platformă PT/stație** | 1:50 / 1:100 | anvelopa PT/stație, cuva de retenție ulei, platforma, accesul, priza de pământ (coord. cu electrice) |
| A-06 | **Plan împrejmuire + detalii gard/poartă** | 1:100 / 1:20 | traseul gardului, porțile, stâlpii CCTV/iluminat, detaliul de gard 2 m, fundarea punctuală a stâlpilor |
| A-07 | **Plan amenajare peisagistică / covor vegetal** | 1:500 | perdeaua vegetală, speciile, zonele de covor vegetal, swale-uri, gestiunea apelor pluviale |
| A-08 | **Detalii de fundare structuri (piloți/șuruburi)** | 1:10 / 1:20 | (coord. cu memoriul de rezistență) tipul fundației reversibile, adâncimea, profilul |

Detaliile de structură (D-xx) și cele de instalații electrice (E-xx) aparțin memoriilor de specialitate corelate.

---

## 10. Bilanțul de suprafețe (parametric)

Bilanțul teritorial se exprimă parametric, ca funcție de P_DC (prin N_mod), demonstrând încadrarea și permeabilitatea ridicată. Coloana „formulă" arată dependența de putere; coloana „EXEMPLU 2 MWp" rezultă prin substituție (N_mod = 3.604, A_mod = 2,583 mp, GCR = 0,38, St ≈ 22.000 mp).

| Categorie | Formulă parametrică | EXEMPLU 2 MWp (mp) | % din St |
|---|---|---|---|
| **Teren total (St)** | St = S_câmp + S_servicii + S_retrageri | **22.000** | 100 |
| Suprafață captatoare (module) | N_mod · A_mod | 3.604 × 2,583 = **9.310** | ~42 |
| Proiecție module pe sol (câmp) | N_mod · A_mod · cos β ≈ captatoare | ~8.060 | ~37 |
| Zona activă a câmpului (mese + pitch) | (N_mod · A_mod)/GCR | 9.310/0,38 = **24.500*** | *(>St → tramă compactată)* |
| Drumuri de incintă + platforme (semi-perm.) | ∝ perimetru + n_blocuri | ~1.000 | ~4,5 |
| Platformă PT/stație (betonată) | ∝ P_AC (nr. transformatoare) | ~40 | ~0,2 |
| Cabină comandă/pază (Sc) + parcaj | trepte cu P (economie de scară) | ~90 | ~0,4 |
| Platforme invertoare (skid, pietruite) | ∝ nr. invertoare ∝ P_AC | ~60 | ~0,3 |
| Perdea vegetală + retrageri + spații verzi | ∝ perimetru | ~1.150 | ~5,2 |
| **Suprafață efectiv impermeabilizată** | (PT + cabină + platforme betonate)/St | **~130** | **~0,6** |
| **Suprafață permeabilă** | St − impermeabilizat | **~21.870** | **~99,4** |

*Nota tramei: valoarea „zona activă = (N_mod·A_mod)/GCR" (24.500 mp) reflectă suprafața teoretică de câmp la GCR 0,38; într-un teren real de 2,2 ha aceasta se compactează prin optimizarea tramei (mese mai lungi, coridoare minime) și/sau se acceptă un teren ușor mai mare (2,45 ha) — a se vedea §3.9. Discrepanța ilustrează exact rolul optimizării de plan.*

Note de bilanț:

- **Sc (suprafață construită definitivă)** = PT/stație + cabină ≈ **130 mp** în exemplu, deci **POT ≈ 0,6%** — nesemnificativ; parcul FV **nu se dimensionează prin POT/CUT clasice**, ci prin **GCR și indicatorii specifici de amenajare CEF** din regulamentul local. POT-ul procentual **scade cu creșterea puterii** (Sc crește în trepte, St crește liniar).
- **Distincția critică**: „proiecția modulelor" (GCR) ≠ „impermeabilizare". Solul de sub module rămâne **permeabil** (piloți) — impermeabilizarea efectivă < 1% la orice scară.
- Drumurile pietruite sunt **semi-permeabile** (infiltrează parțial); dacă se cere strict, se contorizează separat.
- **Densitatea de putere** (§3.11): δ_P = P_DC/St ≈ 2.000/22.000 = **0,91 MWp/ha** în exemplu — valoare tipică pentru mese fixe la GCR 0,38, **invariantă la scară** (proprie soluției). Bilanțul se recalculează pe parcela reală și se sintetizează pe planul A-02.

---

## 11. Dezafectarea și reversibilitatea

Reversibilitatea este o cerință de proiectare, de mediu și adesea o condiție a autorizării/acordului de mediu — **cu atât mai importantă cu cât parcul este mai mare** (impact potențial pe suprafață agricolă întinsă):

- **Durata de exploatare**: 25–30 ani (garanția modulelor 25–30 ani, a invertoarelor 10–15 ani cu înlocuire).
- **La încetarea exploatării** — planul de dezafectare (adesea cu **garanție financiară** constituită la autorizare, dimensionată proporțional cu puterea/suprafața):
  1. **Demontarea modulelor** → reciclare conform **DEEE (OUG nr. 5/2015, Dir. 2012/19/UE)** — sticlă, aluminiu, siliciu, cupru recuperate în procent ridicat;
  2. **Demontarea structurilor metalice** → reciclare oțel/aluminiu (integral reciclabile);
  3. **Extragerea piloților/șuruburilor de fundare** — reversibilă, fără resturi de beton în sol;
  4. **Demolarea platformelor betonate (PT/stație, cabină)** și reciclarea betonului/metalelor;
  5. **Refacerea solului vegetal** și **readucerea terenului la categoria de folosință inițială** (de regulă agricolă) — decompactare, reînsămânțare.
- Alegerea fundării **fără beton masiv** (piloți bătuți / șuruburi) este decizia arhitectural-structurală care garantează reversibilitatea la orice scară și minimizează amprenta permanentă asupra solului.

### 11.1. Bilanțul reversibilității pe categorii

| Element | Reversibilitate | Tratament la dezafectare |
|---|---|---|
| Module FV | totală (demontabile) | reciclare DEEE (sticlă, Al, Si, Cu) |
| Structuri metalice | totală | reciclare oțel/aluminiu (topire) |
| Piloți/șuruburi de fundare | totală (extractibile) | extragere mecanică, sol intact |
| Cabluri DC/AC (îngropate) | totală | extragere, reciclare Cu/Al |
| Platformă PT/stație (beton) | parțială (demolabilă) | demolare, reciclare agregate + metale |
| Cabină comandă | parțială | demolare/dezasamblare (dacă modular — reutilizare) |
| Drumuri pietruite | totală (balastul se recuperează) | îndepărtare balast, decompactare |
| Sol vegetal de sub câmp | păstrat intact | decompactare + reînsămânțare |

Ponderea materialelor **integral reciclabile/reversibile** depășește ~95% din masa instalației, ceea ce fundamentează cerința fundamentală (7) — utilizarea sustenabilă a resurselor — și justifică încadrarea câmpului FV drept **construcție cu caracter reversibil** (nu impermeabilizare/ocupare permanentă a solului).

---

## 12. Organizarea de execuție, regimul de exploatare și mentenanța (interfețe arhitecturale)

### 12.1. Organizarea de șantier (reversibilă)

Deși execuția aparține proiectului de organizare de șantier, arhitectura sitului **rezervă spațiile și accesele** aferente: platformă de descărcare/depozitare temporară a modulelor și structurilor (module livrate paletizat — necesită suprafață de manipulare cu stivuitor/telehandler), zonă de asamblare a meselor, culoar de acces pentru utilajul de batere a piloților (pile-driver) care parcurge rândurile, spațiu de manevră pentru macaraua de descărcare a transformatorului și a anvelopei PT. Ordinea logică de execuție — care structurează și trama de drumuri — este: (1) trasare topografică și drumuri de incintă; (2) baterea piloților pe rânduri; (3) montaj structuri; (4) montaj module; (5) pozare cabluri în coridoare; (6) montaj invertoare și PT/stație; (7) împrejmuire, CCTV, semnalistică; (8) amenajare peisagistică și covor vegetal. **Organizarea de șantier este ea însăși reversibilă** (nu betonează, nu ocupă definitiv), coerentă cu principiul de proiectare al întregului parc. Durata și amploarea execuției scalează cu puterea (număr de piloți, mese, module), dar succesiunea rămâne identică.

### 12.2. Regimul de exploatare și mentenanța (O&M)

Interfața arhitecturală cu regimul de exploatare (Operation & Maintenance) constă în **accesibilitatea permanentă** proiectată: drumurile de incintă și coridoarele de mentenanță (cap. 4), garda la sol (§3.10), platformele de invertoare accesibile. Activitățile O&M pe care le deservește geometria sitului:

- **Mentenanța preventivă**: inspecție vizuală periodică a modulelor și structurilor, verificare conexiuni, strângeri (torque check) — necesită acces pe coridoare la fiecare rând;
- **Curățarea modulelor**: îndepărtarea prafului/depunerilor (ploaia asigură autocurățarea la β ≥ 25–30°; curățare manuală/mecanizată la nevoie) — coridorul de pitch (~8 m liber) permite accesul utilajului de curățare;
- **Termografia** (inspecție IR / dronă) pentru detectarea celulelor defecte/punctelor fierbinți — necesită acces vizual la câmp (drona survolează, dar validarea la sol cere coridoare);
- **Înlocuirea componentelor**: module defecte, invertoare (la 10–15 ani), transformator — necesită acces cu vehicul până la punctul de intervenție (drumuri + coridoare + raze de viraj — cap. 4);
- **Managementul vegetației**: cosire/pășunat (§7.2) — folosește coridoarele și garda la sol.

Numerotarea blocurilor de mese (cap. 8) și planul de situație (A-02) servesc **localizarea rapidă a defectelor** — critică la parcuri mari, unde un defect trebuie găsit între mii de mese. Arhitectura sitului este, astfel, un instrument de exploatare, nu doar o dispunere estetică.

### 12.3. Monitorizarea (SCADA) — interfața de plan

Sistemul de monitorizare (SCADA) — găzduit în cabina de comandă (cap. 5) — colectează date de la invertoare, contoare, stația meteo de referință (piranometru pe planul modulelor, senzor de temperatură celulă, anemometru). **Stația meteo de referință** se amplasează într-o poziție **neumbrită și reprezentativă** a câmpului (implicație de plan: se rezervă un amplasament liber, ferit de umbrire, pentru senzorul de iradiere). SCADA permite calculul PR în timp real și detectarea abaterilor de producție. Detaliile aparțin memoriului de instalații; arhitectura rezervă poziția senzorilor și traseul de semnal.

---

## 13. Registrul normativ detaliat și terminologia

### 13.1. Registrul normativ aplicabil (extins)

| Cod | Titlu | Aplicare în memoriu |
|---|---|---|
| Legea nr. 50/1991 | Autorizarea executării lucrărilor de construcții | conținut DTAC, panou identificare, autorizare |
| Legea nr. 10/1995 | Calitatea în construcții | cele 7 cerințe fundamentale (cap. 13.1 concluzii) |
| Legea nr. 350/2001 | Amenajarea teritoriului și urbanismul (art. 32 — PUZ) | încadrare urbanistică, PUZ/PUG |
| Ord. MDRAP nr. 233/2016 | Norme aplicare L350 — conținut PUZ (scări 1:25000/1:5000/1:2000) | documentație de urbanism |
| Legea nr. 18/1991 | Fondul funciar (art. 92 — scoatere din circuit agricol) | schimbare destinație teren |
| Legea nr. 17/2014 | Vânzare/circulație terenuri agricole extravilane | condiții amplasare extravilan |
| HG nr. 1132/2008 | Taxe de scoatere din circuitul agricol (clase I–V) | studiu pedologic OSPA, taxă |
| OG nr. 43/1997 | Regimul drumurilor (art. 17 — zone de protecție) | distanțe față de drumuri |
| Legea nr. 202/2016, OG nr. 12/1998 | Transportul feroviar — zone de protecție/siguranță | distanță CFR, aviz |
| Legea nr. 351/2004 | Energia — culoare LEA / conducte | distanțe LEA 110 kV, gaze |
| Legea nr. 107/1996 | Legea apelor — zone de protecție maluri/inundabile | distanță mal, aviz ANAR |
| Legea nr. 46/2008 | Codul Silvic — limita fondului forestier | retragere 50 m pădure |
| Legea nr. 422/2001, OG nr. 43/2000 | Patrimoniul cultural / protecția arheologică | zonă protecție, descărcare de sarcină |
| RACR-OA | Reglementări aeronautice — zone protecție aeroport | aviz AACR (glare, înălțime) |
| HG nr. 525/1996 | Regulamentul general de urbanism (RGU) | indicatori, retrageri, amplasare |
| HG nr. 766/1997 | Categorii de importanță a construcțiilor | categoria „C" |
| Legea nr. 220/2008 | Regimul E-SRE | cadrul energiei regenerabile |
| Legea nr. 123/2012 | Energia electrică și gazele naturale | producerea de energie |
| Ord. ANRE nr. 59/2013 | Regulament de racordare la rețea | ATR, racord MT, P_AC |
| CR 0/2012 | Bazele proiectării structurilor | combinații de acțiuni |
| CR 1-1-3/2012 | Acțiunea zăpezii | încărcare structuri (indirect) |
| CR 1-1-4/2012 | Acțiunea vântului | determinant pt structuri și β |
| P100-1/2013 | Cod seismic | clasa III, γ_I,e = 1,0 |
| SR EN 1993 | Eurocod 3 — structuri de oțel | dimensionare mese (indirect) |
| I7/2011 | Instalații electrice de joasă tensiune | protecție, împământare, trăsnet |
| NTE 007/08/00 | Proiectarea LES | linia de racord (indirect) |
| SR EN 62305 | Protecția la trăsnet | paratrăsnet parc |
| P118-1/2013 | Securitatea la incendiu — construcții | grad RF, acces ISU |
| P118-2/2013 | Instalații de stingere | (dacă e cazul la PT) |
| P118-3/2015 | Detecție și semnalizare | (dacă e cazul) |
| NP 051/2012 | Accesibilitatea PMR | cabina de comandă |
| Legea nr. 448/2006 | Protecția persoanelor cu handicap | nediscriminare |
| Legea nr. 333/2003 | Paza obiectivelor | antiefracție, CCTV |
| OMS nr. 119/2014 | Norme de igienă | zgomot, mediu de muncă |
| OUG nr. 195/2005 | Protecția mediului | sol, ape, biodiversitate |
| Legea nr. 292/2018 | Evaluarea impactului asupra mediului | procedură EIM (parcuri mari) |
| OUG nr. 5/2015 | Deșeuri de echipamente electrice (DEEE) | reciclare module la dezafectare |
| Legea nr. 211/2011 | Regimul deșeurilor | gestiune deșeuri șantier/dezafectare |
| Legea nr. 7/1996 | Cadastrul și publicitatea imobiliară | identificare teren |
| Legea nr. 184/2001 | Exercitarea profesiei de arhitect | semnătura |
| SR EN ISO 7010 | Semne grafice de securitate | pictograme avertizare |
| STAS 10009 | Acustica în mediul urban — limite | zgomot la limita proprietății |

### 13.2. Terminologia specifică (glosar)

- **CEF / parc FV** — centrală electrică fotovoltaică la sol.
- **P_DC** — puterea instalată în curent continuu (suma puterilor nominale ale modulelor); **P_AC** — puterea în curent alternativ la ieșirea invertoarelor/la racord.
- **DC/AC (raport de supradimensionare)** — raportul dintre puterea DC a modulelor și puterea AC a invertoarelor (uzual 1,05–1,25); un DC/AC > 1 „taie" vârfurile rare de producție (clipping), crescând factorul de utilizare.
- **Mesă (table)** — unitatea structurală care susține un grup de module; **2V** = 2 module dispuse pe verticală (portret).
- **Coarda mesei (L)** — lățimea captatoare a mesei, în planul modulelor.
- **β (tilt)** — unghiul de înclinare al modulelor față de orizontală.
- **Azimut** — orientarea în plan orizontal (180° = sud).
- **Pitch** — distanța între rânduri succesive de mese (marginile omoloage).
- **GCR (Ground Coverage Ratio)** — raportul dintre coarda mesei și pitch; densitatea de acoperire.
- **Gardă la sol** — înălțimea marginii inferioare a modulelor deasupra solului.
- **α_s (altitudine solară)** — unghiul soarelui deasupra orizontului.
- **γ_s (azimut solar)** — direcția soarelui în plan orizontal.
- **Near shading / far shading** — umbrire între rânduri / umbrire de la orizont (relief, vegetație).
- **PSH (Peak Sun Hours)** — orele echivalente la putere de vârf (iradiere/1000 W/m²).
- **PR (Performance Ratio)** — raportul dintre producția reală și cea teoretică; măsura calității instalației.
- **Producție specifică** — kWh produși per kWp instalat pe an (indicator de amplasament/soluție).
- **String** — grup de module conectate în serie; **combiner box** — cutie de joncțiune a stringurilor.
- **Skid** — platformă/ansamblu de invertor.
- **PT / stație de transformare** — post de transformare (mic) / stație (mare) 0,4/MT.
- **Cuvă de retenție** — bazin etanș sub transformator care reține uleiul în caz de avarie.
- **Piloți bătuți (ram-piles) / șuruburi de fundare (ground screws)** — fundații reversibile fără beton.
- **Solar grazing (pășunat solar)** — întreținerea vegetației prin pășunat ovin.
- **Agrivoltaic** — folosirea dublă a terenului (energie + agricultură/pășunat).
- **Glare** — reflexie orbitoare a soarelui pe suprafața modulelor.
- **DEEE** — deșeuri de echipamente electrice și electronice (reciclare module).

---

## 14. Sinteza formulelor de proiectare parametrică

Tabelul distinge net mărimile **invariante la putere** (geometria celulei-tip) de cele **scalabile cu puterea** (dimensiunile extensive ale câmpului).

**A. Mărimi INVARIANTE la putere (geometria celulei-tip — se calculează o singură dată):**

| Mărime | Formulă | EXEMPLU (φ=46°, β=30°, L=4,58 m) |
|---|---|---|
| Coarda mesei 2V | L = 2·L_mod + rost | 2×2,278 + 0,02 = **4,58 m** |
| Unghi de înclinare optim | β_opt ≈ φ − (5…10°) | ~36° → **30° adoptat** |
| Altitudine solară amiază, solstițiu iarnă | α_s = 90° − φ − 23,45° | **20,55°** |
| Înălțimea rândului | h = L·sin β | **2,29 m** |
| Baza (proiecție orizontală) | b = L·cos β | **3,97 m** |
| Lungimea umbrei (amiază) | D_umbra = h / tan α_s | **6,11 m** |
| Umbră (moment oarecare) | D_umbra(t) = h·cos(γ_s−180°)/tan α_s | ≤ 6,11 m |
| Pitch anti-umbrire (minim) | D_pitch = b + D_umbra | **10,08 m** |
| Pitch adoptat (GCR țintă) | — | **12,0 m** |
| Pitch pe teren înclinat | D = L·sin β/tan(α_s+ψ) + L·cos β·cos ψ | corecție zonală |
| Ground Coverage Ratio | GCR = L / D_pitch | 4,58/12,0 = **0,38** |
| Înălțime maximă structură | h_sus = gardă + L·sin β | 0,8+2,29 = **3,1 m** |
| Densitate de putere (limită) | δ_P ≈ GCR·P_mod/A_mod | ~**0,82–0,91 MWp/ha** |
| Producție specifică | E/P_DC = PSH_POA·PR | ~**1.190 kWh/kWp/an** |

**B. Mărimi SCALABILE cu puterea (dimensiuni extensive — funcție de P_DC):**

| Mărime | Formulă parametrică | EXEMPLU 2 MWp |
|---|---|---|
| Număr module | N_mod = P_DC / P_mod | 2.000.000/555 = **3.604** |
| Număr mese | N_mese = N_mod / n_masă | 3.604/40 ≈ **90** |
| Suprafață captatoare | S_capt = N_mod · A_mod | 3.604×2,583 = **9.310 mp** |
| Suprafață câmp | S_câmp = S_capt / GCR | 9.310/0,38 = **24.500 mp** |
| Suprafață teren | S_teren = S_câmp + S_servicii + S_retrageri | **~2,2–2,7 ha** |
| Putere maximă pe teren dat | P_DC,max = (S_activ·GCR/A_mod)·P_mod | verificare fezabilitate |
| Număr rânduri (pe adâncime) | N_r = (L_util,N–S − b)/D_pitch + 1 | ~**12** |
| Putere AC (racord) | P_AC = P_DC / (DC/AC) | 2.000/1,15 ≈ **1.740 kVA** |
| Nr. transformatoare | ≈ P_AC / P_trafo,unitar | 1 PT (parc mic) |
| Nr. invertoare | ≈ P_AC / P_inv,unitar | (coord. electrice) |
| Producție anuală | E_an = P_DC · PSH_POA · PR | 2×1.450×0,82 ≈ **2.380 MWh/an** |
| Lungime gard | ∝ perimetru ∝ √(S_teren) | (din plan A-02) |
| Sc construcții definitive | PT/stație + cabină (trepte cu P) | ~**130 mp** (POT ~0,6%) |
| CO₂ evitat/an | E_an · f_emisie_SEN | E_an × f_SEN (kg/MWh) |

---

## 13. Concluzii — conformitatea pe cerințe fundamentale și cele trei componente

### 13.1. Conformitatea pe cerințele fundamentale (Legea nr. 10/1995)

- **(1) Rezistență mecanică și stabilitate** — structurile de montaj (mese fixe) se verifică la vânt (**CR 1-1-4/2012**, acțiune determinantă la unghi 30°), zăpadă (CR 1-1-3), seism (**P100-1/2013**, clasa III, γ_I,e = 1,0) și la smulgerea piloților (fundare reversibilă); detaliile în memoriul de rezistență. Verificarea este pe **celula-tip** (o mesă) și se aplică identic tuturor celor N_mese — proiectarea structurală este ea însăși parametrică. Unghiul β = 30° a fost ales inclusiv pentru reducerea încărcării din vânt.
- **(2) Securitate la incendiu** — risc redus la câmp; risc specific electric la PT/invertoare (arc DC/AC). Anvelope incombustibile (grad II RF), acces autospeciale ISU pe drumul perimetral (gabarit ≥ 3,5 m, raze ≥ 12 m), semnalistică de pericol (inclusiv avertismentul „module sub tensiune la lumină"), scenariu SU unde impus (obligatoriu de la anumite praguri de putere/echipamente). Detalii în piesele SU/instalații.
- **(3) Igienă, sănătate, mediu** — impact minim asupra solului (permeabilitate ~99% **la orice scară**, fără impermeabilizare de câmp, fără erbicide), gestiunea apelor pluviale prin infiltrare pe amplasament, cuvă de retenție ulei la PT, reciclare DEEE la dezafectare, favorizarea biodiversității (pajiște meliferă, pășunat ovin), reversibilitate. La parcuri mari — procedură de mediu (Legea nr. 292/2018) cu măsuri de compensare.
- **(4) Siguranță și accesibilitate în exploatare** — drumuri și coridoare de mentenanță dimensionate (invariant la gabaritul vehiculului), gardă la sol pentru acces, împrejmuire 2 m + antiefracție + CCTV, cabină accesibilă PMR (NP 051/2012), marcaje și semnalistică de securitate electrică.
- **(5) Protecție împotriva zgomotului** — surse reduse (invertoare, transformator — zumzet); se verifică încadrarea în limitele de zgomot la limita proprietății (STAS 10009 / OMS 119/2014); numărul de surse scalează cu puterea, dar amplasarea distribuită și retrasă + perdeaua vegetală mențin nivelul în limite.
- **(6) Economie de energie** — obiectivul **produce** energie curată (E_an ∝ P_DC): exemplu 2 MWp ≈ 2.380 MWh/an, până la ~59.500 MWh/an la 50 MWp; cabina de comandă respectă principiile Legii nr. 372/2005. Bilanț net puternic pozitiv la orice scară.
- **(7) Utilizare sustenabilă a resurselor** — teren neimpermeabilizat și reversibil, materiale reciclabile (oțel, aluminiu, sticlă), dublă folosință posibilă (agrivoltaic prin pășunat), refacerea solului la finalul ciclului.

### 13.2. Cele trei componente (regula UrbanX)

- **ANALITICĂ** — memoriul fundamentează **parametric**, prin formule și temei normativ, fiecare decizie: N_mod = P_DC/P_mod (3.604 în exemplu), β = 30° (β_opt ≈ φ−(5–10°)), α_s = 20,55° (formula solstițiului), pitch = 12,0 m (formula anti-umbrire b + h/tan α_s), GCR = 0,38 (L/D_pitch), S_teren = N_mod·A_mod/GCR + servicii, densitate ~0,91 MWp/ha, producție E_an = P_DC·PSH_POA·PR. Sursele: CR 0/1-1-3/1-1-4, P100-1/2013, I7/2011, NP 051, OMS 119/2014, OUG 5/2015, Legea 50/1991 și 10/1995.
- **GRAFICĂ** — soluția este integral **reprezentată pe planșe** (cap. 9): plan de încadrare, plan de situație cu trama meselor (scalat la putere), **secțiune caracteristică cu geometria anti-umbrire — piesa care exprimă celula-tip invariantă** (β, h, b, D_umbra, pitch), planuri PT/cabină/împrejmuire/peisaj. Trama și bilanțul se citesc grafic pe A-02.
- **PREDICTIVĂ** — memoriul proiectează **orizontul de exploatare** (25–30 ani) cu producție anuală (scalată cu P_DC) și degradare a modulelor (~0,5%/an), scenariul de mentenanță (cosire/pășunat, curățare, înlocuire invertoare la 10–15 ani), și **planul de dezafectare cu refacerea terenului** — o proiecție cu strategie, nu declin pasiv: la finalul ciclului terenul revine reversibil la folosința agricolă, cu sol refăcut și biodiversitate ameliorată.

Metodologia parametrică asigură că **aceeași soluție de arhitectură/amenajare este validă și corect dimensionată pentru orice putere din intervalul 500 kWp … 50 MWp** — geometria celulei-tip (β, pitch, GCR, secțiunea caracteristică) rămâne invariantă, iar dimensiunile câmpului (module, mese, rânduri, teren, producție) se scalează prin formulele de mai sus. Soluția respectă cadrul normativ, documentațiile de urbanism aprobate (PUZ/PUG + certificat de urbanism), avizul tehnic de racordare, principiul reversibilității și cerințele de integrare peisagistică și de protecție a mediului.

*Întocmit: arhitect cu drept de semnătură (Legea nr. 184/2001, OAR), în coordonare cu specialiștii de rezistență, instalații electrice, securitate la incendiu și mediu. Puterea instalată P_DC este parametru de intrare al proiectului; exemplul numeric de 2 MWp are rol strict ilustrativ pentru verificarea formulelor.*
