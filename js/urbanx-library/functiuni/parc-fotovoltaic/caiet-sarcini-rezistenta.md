# CAIET DE SARCINI — STRUCTURI ȘI FUNDAȚII — PARC FOTOVOLTAIC 2.000 kWp (FAZA PTh)

## 0. Preambul, obiect și mod de utilizare a caietului

Prezentul **caiet de sarcini** definește, la nivelul fazei **Proiect Tehnic de execuție (PTh) + Detalii de Execuție (DE)**, condițiile tehnice de **execuție, control al calității, verificare și recepție** a lucrărilor de **structuri de rezistență și fundații** pentru un **parc fotovoltaic** (centrală electrică fotovoltaică — CEF). Documentul este complementar și subordonat **Memoriului tehnic de rezistență și stabilitate** (faza DTAC și dezvoltarea acestuia la PTh), planșelor de rezistență (plan de fundații, detalii mese, detalii piloți, detalii radiere PT) și breviarului de calcul. În caz de neconcordanță aparentă, prevalează planșele de execuție cotate și, în ordine, breviarul de calcul, prezentul caiet de sarcini, standardele și normativele invocate.

Caietul de sarcini **nu repetă** dimensionarea (aceasta aparține memoriului și breviarului de calcul); el stabilește **CUM se execută**, **CU CE materiale**, **CE se verifică**, **CINE verifică**, **CÂND** și **CU CE criterii de acceptare/respingere**. Toate valorile numerice de dimensionare (secțiuni, adâncimi, clase de beton, armări) sunt preluate din proiect; caietul fixează **procedurile și pragurile de conformitate**.

> **PRINCIPIU PARAMETRIC — INDEPENDENT DE PUTERE.** Un parc fotovoltaic se compune din **elemente unitare repetitive** (masa tip, pilotul tip, fundația tip pentru PT/skid). Acțiunile determinante — **vântul (uplift/smulgere)** și **zăpada** — se exercită **pe unitatea de suprafață captatoare (kN/m²)** și, deci, **pe structura unitară**, fiind **independente de puterea totală** a parcului. În consecință, prezentul caiet de sarcini definește condițiile de execuție și recepție **pentru elementul unitar**, iar **numărul total** de mese, piloți, teste de smulgere și fundații de PT **scalează liniar cu puterea instalată P_DC** (v. §1.4 — Relații de scalare). Valoarea **P = 2.000 kWp (2 MWp)** este folosită în text **exclusiv ca exemplu** pentru cuantificarea numărului total de elemente și a numărului de teste, **nu** ca ipoteză de dimensionare. Un parc de 500 kWp și unul de 50 MWp folosesc **aceeași masă tip și același pilot tip** (pentru același amplasament, aceeași înclinare, același modul) — diferă doar numărul lor și, proporțional, numărul de probe de control.

Prezentul caiet acoperă strict **cerința fundamentală A — Rezistență mecanică și stabilitate** (Legea 10/1995). Cerințele privind securitatea la incendiu, igiena/sănătatea, siguranța în exploatare, protecția la zgomot, economia de energie și utilizarea sustenabilă a resurselor sunt tratate în caietele de sarcini pe specialitățile respective (arhitectură, instalații, scenariu de securitate la incendiu) și nu se reiau aici.

### 0.1. Cadru normativ aplicabil (versiune la zi)

| Domeniu | Normativ / standard de referință |
|---|---|
| Calitatea în construcții / autorizare | Legea 10/1995 (rep.); Legea 50/1991 (rep.); HG 766/1997; HG 907/2016 |
| Bazele proiectării structurale | SR EN 1990:2004/A1:2006 + NA (Eurocod 0); **CR 0-2012** |
| Acțiuni permanente și utile | SR EN 1991-1-1 + NA |
| Acțiuni din zăpadă | SR EN 1991-1-3 + NA; **CR 1-1-3/2012** |
| Acțiuni din vânt | SR EN 1991-1-4 + NA; **CR 1-1-4/2012** |
| Acțiuni termice | SR EN 1991-1-5 + NA |
| Acțiuni seismice | **P100-1/2013** |
| Oțel — reguli generale | SR EN 1993-1-1 + NA |
| Oțel — elemente formate la rece | **SR EN 1993-1-3** + NA |
| Oțel — îmbinări | SR EN 1993-1-8 + NA |
| Oțel — table subțiri (buckling) | SR EN 1993-1-5 |
| Beton armat | SR EN 1992-1-1 + NA |
| Geotehnică — general (Eurocod 7) | SR EN 1997-1; SR EN 1997-2; **NP 074/2014** (documentații geotehnice); NP 122-2010 (fundare pământuri sensibile la umezire, unde e cazul) |
| Piloți / fundații pe piloți | **NP 123-2010** |
| Fundații directe | NP 112-2014 |
| Execuție lucrări din oțel | **SR EN 1090-2** (clasă de execuție **EXC2**) — cerințe generale SR EN 1090-1 |
| Module fotovoltaice — încercare / calificare | **SR EN IEC 61215-1/-2** (calificare tip cristaline); **SR EN IEC 61730-1/-2** (siguranță); încărcare mecanică (±2400/5400 Pa), PID, hot-spot |
| Trackere solare — calificare / fiabilitate | **IEC 62817** (calificare de proiectare trackere); IEC TS 62727 (specificații de urmărire) |
| Zincare termică (galvanizare la cald) | **SR EN ISO 1461** (pentru piese imersate); **SR EN 10346** (tablă bandă acoperită Z275/Z600, pentru profile formate la rece) |
| Protecție anticorozivă prin vopsire | SR EN ISO 12944-1…9 |
| Materiale de bază — oțel structural | SR EN 10025-1…6 (laminate la cald); SR EN 10346, SR EN 10143, SR EN 10162 (produse plate/profile formate la rece) |
| Șuruburi de înaltă rezistență | SR EN 14399-1…10 (HV/HR); SR EN 15048 (îmbinări nepretensionate SB) |
| Șuruburi obișnuite / grupe | SR EN ISO 898-1 (grupe 4.6…10.9); piulițe SR EN ISO 898-2 |
| Sudare — cerințe de calitate | SR EN ISO 3834-2/-3; specificații WPS/pWPS SR EN ISO 15609; calificare WPQR SR EN ISO 15614-1; calificare sudori SR EN ISO 9606-1 |
| Sudare — niveluri de calitate / imperfecțiuni | SR EN ISO 5817 (niveluri B/C/D) |
| Examinări nedistructive suduri | SR EN ISO 17635 (alegere metode); VT SR EN ISO 17637; PT SR EN ISO 3452; MT SR EN ISO 17638; UT SR EN ISO 17640; niveluri de acceptare SR EN ISO 5817 / SR EN ISO 11666 (UT) |
| Toleranțe geometrice de execuție | SR EN 1090-2 (anexele D); SR EN ISO 13920 (toleranțe generale ale construcțiilor sudate) |
| Betoane — specificare, performanță, conformitate | SR EN 206 + SR 13510 (anexa națională) |
| Execuția structurilor de beton | SR EN 13670; NE 012/2-2010 (punere în operă); NE 012/1 (producere) |
| Oțel-beton pentru armare | SR EN 1992-1-1 anexa C; SR 438-1 (OB37); STAS/ST BST500S — mărci **B500A / B500B / B500C** conform SR EN 10080 |
| Încercări beton întărit — rezistență la compresiune | SR EN 12390-1…8; prelevare probe SR EN 12350-1 |
| Trasare, topografie | Legea 7/1996; norme ANCPI; sistem de referință **Stereo 70**, cote **Marea Neagră 1975** |
| Împământare / protecție la trăsnet (interfață structură) | I7-2011; SR EN 62305-1…4 |
| Sănătate și securitate în muncă pe șantier | Legea 319/2006; HG 1425/2006; HG 300/2006 (șantiere temporare/mobile) |

### 0.2. Definiții și abrevieri

- **CEF** — Centrală Electrică Fotovoltaică (parc fotovoltaic).
- **Masă (table) tip** — cadru metalic repetitiv care susține un grup de module fotovoltaice, sprijinit pe un rând de piloți/stâlpi.
- **Pilot tip / stâlp de fundare** — element vertical înfipt în teren (metalic bătut, șurub elicoidal) sau bloc de beton, care preia reacțiunile mesei, inclusiv **smulgerea (uplift)**.
- **Uplift / smulgere** — solicitarea de **tracțiune (forță de extragere)** exercitată de vânt asupra fundației, dată de sucțiunea pe suprafața modulelor; **acțiunea determinantă** pentru parcuri FV (greutate proprie mică, suprafață mare).
- **Pull-out test / test de smulgere** — încercare de teren prin care se măsoară **rezistența la extragere** a unui pilot/șurub, prin aplicarea unei forțe axiale de tracțiune crescătoare.
- **PT** — Post(uri) de Transformare; **skid invertoare** — platformă/container echipamente de conversie AC/DC și invertoare de string/central.
- **EXC2** — clasă de execuție (SR EN 1090-2) adoptată pentru structurile metalice ale CEF.
- **P_DC** — putere instalată în curent continuu (kWp/MWp), mărimea de scalare a cantităților.
- **RTE** — Responsabil Tehnic cu Execuția (atestat); **CQ** — Control de Calitate (executant); **dirig.** — diriginte de șantier autorizat (investitor); **ISC** — Inspectoratul de Stat în Construcții.
- **PCCVI** — Plan de Control al Calității, Verificări și Încercări (test/inspection plan).
- **FTP** — fază tehnologică determinantă (punct de control obligatoriu, cu convocare, în programul de control avizat ISC).

---

## 1. DATE GENERALE, CONFIGURAȚIE, SCALARE

### 1.1. Descrierea sistemului structural și tipurile de suporți

Parcul fotovoltaic susține modulele fotovoltaice pe **structuri suport metalice** ancorate în teren prin fundații (v. §3–§4). Prezentul caiet acoperă **exhaustiv** cele **trei tipuri de suporți** admise, cu condiții de execuție și recepție **specifice fiecăruia** (detaliate în §2.8–§2.10):

- **Tip S1 — mese FIXE (fixed-tilt)** — cadre metalice statice, orientate sud, la înclinare fixă β (v. mai jos). Fără piese în mișcare; recepția vizează geometria, zincarea, cuplurile.
- **Tip S2 — TRACKERE cu 1 AXĂ (single-axis, motorizate)** — module montate pe o **axă orizontală N–S** care se rotește E–V urmărind soarele (unghi de rotire tipic ±55…±60°), acționată de **motor/actuator** cu **controller**, **senzori** și algoritm de **backtracking** (anti-umbrire) și **stow** (poziție de siguranță la vânt/zăpadă). Recepția adaugă **probe funcționale** (mișcare, poziționare, urmărire, stow) — v. §2.9.
- **Tip S3 — TRACKERE cu 2 AXE (dual-axis, motorizate)** — module pe suport cu **două grade de libertate** (azimut + elevație), urmărire completă a soarelui, acționate de **doi actuatori/motoare** cu controller și senzori. Recepția adaugă probele funcționale pe **ambele axe** + stow — v. §2.10.

**Sistemul fix (S1) de referință** este alcătuit din **mese** orientate sud, la înclinare **β = 25°** (valoare de proiect; poate varia 20–35° după optimizarea energie/structură), cu modulele dispuse în configurație **2V** (două module pe verticala planului înclinat). Fiecare masă se sprijină pe un **rând de piloți/stâlpi** de fundare la interax **e ≈ 3,0 m**. Sistemul static al mesei este un **cadru** cu stâlpi verticali (piloții/prelungirile lor deasupra terenului) și **traverse/pane** înclinate din **profile formate la rece** (Sigma/C/Z/Ω) pe care se fixează modulele prin cleme.

**Trackerele (S2/S3)** se sprijină de asemenea pe un **rând de piloți/stâlpi** (S2: adesea un singur rând central sub axa de rotire; S3: unul sau mai mulți stâlpi masivi), dar diferă structural: fundația și pilotul central preiau **momente și forțe orizontale sporite** (masa panoului se rotește, iar în poziția de stow expunerea la uplift este maximă), iar **jocurile mecanice și alinierea axei** devin criterii de recepție. Alegerea S1/S2/S3 aparține proiectului (energie/CAPEX/teren); prezentul caiet le tratează pe toate, parametric în raport cu puterea (§1.4).

Echipamentele tehnologice — **posturile de transformare (PT)** și **skid-urile de invertoare** — reazemă pe **fundații de beton armat** (radiere sau cuzineți/blocuri), dimensionate separat (v. §5).

Sistemul structural este **necontravântuit longitudinal prin cadre proprii** decât în măsura necesară pentru stabilitatea de montaj și preluarea forțelor orizontale din vânt paralel cu rândul; contravântuirile (dacă sunt prevăzute în proiect) și diagonalele se execută conform planșelor DE.

### 1.2. Configurația de referință a mesei tip (pentru exemplificare)

| Parametru | Valoare de referință | Observație |
|---|---|---|
| Înclinare module β | 25° | poate varia după proiect (20–35°) |
| Configurație | 2V (2 module pe verticală) | latura lungă orizontală |
| Modul de referință | 2384 × 1303 × 35 mm; ~30 kg; 555 Wp | tip mono-PERC/TOPCon |
| Lungime plan înclinat L | ~4,30 m | 2 module + rosturi + console |
| Clearance (gardă la sol) h₁ | 0,80 m | min. 0,50 m; recomandat 0,80–1,00 m |
| Cotă superioară expunere h₂ | ~2,80 m | h₁ + L·sinβ, rotunjit acoperitor |
| Lungime masă L_masă | 24 m | tipic 20–30 m |
| Interax stâlpi/piloți e | 3,0 m | → 9 stâlpi/masă |
| Module/masă | ~42 | 2 × 21 |
| Putere/masă P_masă | ~23,3 kWp | 42 × 0,555 |
| Suprafață captatoare/masă | ~103 m² | 24 × 4,30 |

### 1.3. Tipurile de fundare admise (alegere după geotehnică — NP 074/2014)

Alegerea tipului de fundare a suporților se face **exclusiv** pe baza **studiului geotehnic** (documentație geotehnică conform **NP 074/2014**, categoria geotehnică rezultată din riscul geotehnic) și a rezultatelor **testelor de smulgere pe amplasament** (v. §4.5). Se admit **cinci tipuri** de fundare, detaliate în §3–§4:

- **Tip A — piloți metalici înfipți** (bătuți/vibrați), profile laminate la cald sau formate la rece (IPE / U / C / Ω ranforsate), zincate termic — soluția preferată pe **terenuri necoezive/coezive normal consolidate**, fără obstacole/roci de suprafață; execuție rapidă, fără beton, reversibilă.
- **Tip B — blocuri/cuzineți de beton armat turnat pe loc** — soluția pentru **terenuri cu capacitate portantă mică, umpluturi, roci de suprafață, pânză freatică ridicată**, sau unde smulgerea depășește capacitatea piloților înfipți; fundare directă cu greutate proprie mobilizată contra upliftului.
- **Tip C — șuruburi elicoidale (ground screws)** — soluția pentru **terenuri unde baterea nu e posibilă** (pietriș grosier, execuție cu vibrații interzise) sau unde se cere capacitate mare la smulgere cu instalare rapidă; înșurubare cu **cuplu controlat** (moment de instalare corelat cu momentul rezistent la smulgere).
- **Tip D — contragreutăți / balast (fundații gravitaționale)** — **blocuri sau dale prefabricate de beton** așezate pe suprafața terenului, folosite când **nu se poate înfige/fora** (rocă de suprafață, halde/depozite, terenuri contaminate, membrane de etanșare care nu pot fi perforate — depozite de deșeuri închise, batale). Rezistă la uplift/vânt **exclusiv prin greutate proprie**, verificate la **răsturnare și alunecare** (v. §4.6).
- **Tip E — micropiloți** (Ø ≤ 300 mm, forați și injectați/betonați, cu armătură centrală țeavă/bară) — soluția pentru **capacitate mare la smulgere în terenuri dificile** (roci alterate, terenuri coezive tari, obstacole), unde piloții bătuți refuză iar balastul nu e fezabil (uplift mare, spațiu limitat). Execuție prin forare + injectare (v. §4.7).

Pe același amplasament pot coexista mai multe tipuri (zonare geotehnică). Zonarea și tipul aplicat pe fiecare tronson se stabilesc prin proiect, pe baza forajelor și a **testelor de probă preliminare** (§4.5).

### 1.4. Relații de scalare cu puterea instalată (parametric)

Numărul total de elemente și de probe de control **scalează liniar** cu P_DC. Formulele de bază (module de 555 Wp, masă tip de ~42 module ≈ 23,3 kWp, 9 piloți/masă):

- **Nr. module:** N_mod = P_DC / P_modul = P_DC / 0,555 kWp
- **Nr. mese:** N_mese = N_mod / 42 = P_DC / 23,3 kWp
- **Nr. piloți/stâlpi:** N_piloți ≈ 9 × N_mese = 9 × P_DC / 23,3 ≈ **0,386 piloți/kWp** (≈ 386 piloți/MWp)
- **Nr. teste de smulgere (pull-out):** conform §4.5 — **preliminare** (minim 3–5 per tip de teren / per zonă geotehnică, indiferent de putere) + **de control în producție**: minim **0,5 % din numărul total de piloți**, dar nu mai puțin de **10 buc.** per parc și nu mai puțin de **3 buc.** per tronson/zonă geotehnică.
- **Nr. PT / skid-uri:** funcție de raportul kVA/PT (tipic 1.600–3.150 kVA/PT).

**Tabel de scalare (exemplu — valori orientative, se recalculează în proiect):**

| P_DC | N_module | N_mese (~42/masă) | N_piloți (~9/masă) | Teste smulgere control (min. 0,5%) | N_PT (ex. 1,6 MVA) |
|---|---|---|---|---|---|
| 0,5 MWp | ~900 | ~22 | ~198 | 10 (prag minim) | 1 |
| 1 MWp | ~1.800 | ~43 | ~387 | 10 (prag minim) | 1 |
| **2 MWp (exemplu)** | **~3.600** | **~86** | **~774** | **10 (prag minim) → recom. 12** | **1–2** |
| 5 MWp | ~9.000 | ~215 | ~1.935 | ~10 | 2–3 |
| 10 MWp | ~18.000 | ~430 | ~3.870 | ~20 | 4–6 |
| 50 MWp | ~90.100 | ~2.145 | ~19.305 | ~97 | 16–30 |

> Pentru **exemplul de 2 MWp**: ~774 piloți → **0,5 % = 4 teste** rezultate din procent, dar **se aplică pragul minim de 10** teste de control (recomandat 12, distribuite pe zone geotehnice), plus **testele preliminare** (minim 3–5/tip teren) executate înainte de aprovizionarea în serie. Restul cantităților (mese, module, PT) se preiau din tabel.

**Ajustarea scalării în funcție de tipul de suport:**
- **S1 (fix):** ~9 piloți/masă (valorile de mai sus);
- **S2 (tracker 1 axă):** structura unui rând de tracker înlocuiește mai multe mese fixe; numărul de **piloți/stâlpi** poate fi mai mic pe kWp (un rând lung pe piloți la interax mai mare), dar apare **1 actuator + 1 controller / rând (sau grup de rânduri)** și **lagăre pe fiecare stâlp**. N_actuatori și N_controllere se cuantifică per rând conform proiect;
- **S3 (tracker 2 axe):** fiecare unitate = **1 pilon masiv + 2 actuatori + controller**; N_unități = N_module / (module/unitate);
- **Nr. probe funcționale trackere (recepție):** minim **100 % probe P1–P2 (rotire/calibrare) pe fiecare tracker** + **test de urmărire/stow (P3–P8) pe eșantion min. 10 % din trackere, dar min. 5 buc./parc**, plus **verificarea funcțională globală a comenzii de stow pe TOATE trackerele** (stow e critic structural — v. §2.9.4).
- **Nr. blocuri balast (Tip D):** = nr. reazeme (≈ nr. piloți echivalent); la recepție se cântărește eșantion min. **5 %**.

---

## 2. STRUCTURI METALICE SUPORT — CONDIȚII DE EXECUȚIE ȘI CALITATE

### 2.1. Materiale — oțeluri, mărci, certificate

**2.1.1. Profile formate la rece (mese, pane, cleme-suport).** Profilele portante (Sigma/C/Z/Ω, guseuri) se execută din **tablă/bandă de oțel structural formată la rece**, marca minimă **S250GD** … **S350GD** (SR EN 10346) sau **S235 … S355** pentru table conform SR EN 10025, în funcție de proiect. Grosimea de bază a tablei (fără acoperire) t_min conform proiect, **de regulă t ≥ 2,0 mm** pentru elementele portante principale; sub 3 mm se aplică integral regulile SR EN 1993-1-3 (elemente cu pereți subțiri). Limita de curgere caracteristică f_y și rezistența la rupere f_u se preiau din marcă și se **certifică prin certificat de inspecție tip 3.1 (SR EN 10204)** pentru fiecare lot.

**2.1.2. Profile laminate la cald (stâlpi/piloți metalici tip A, guseuri groase).** Marca minimă **S235JR / S275JR / S355JR** (SR EN 10025-2), grad de calitate ales în funcție de temperatura minimă de exploatare și de riscul de rupere fragilă (SR EN 1993-1-10). Pentru **piloții bătuți**, care suportă solicitări de impact la batere, se recomandă gradul minim **J2** (energie de rupere KV garantată la −20 °C).

**2.1.3. Elemente de asamblare.** Șuruburi grupă **8.8** (uzual) sau **10.9** (îmbinări solicitate/pretensionate), cu piulițe și șaibe compatibile, **integral zincate termic sau electrochimic** (compatibilitate cu profilele Z275/Z600), certificate SR EN 15048 (SB) / SR EN 14399 (HV/HR). Se **interzice** amestecul de metale incompatibile care generează cuplu galvanic (v. §2.4). Cleme de fixare module din **aluminiu anodizat/EN AW-6005A** sau **inox A2/A4**.

**2.1.4. Documente de conformitate obligatorii la aprovizionare (pentru fiecare lot):**
- Declarație de performanță (DoP) + marcaj CE (unde aplicabil) — SR EN 1090-1;
- Certificat de inspecție **tip 3.1** (SR EN 10204) pentru oțelul de bază (compoziție chimică, f_y, f_u, alungire, KV);
- Certificat de acoperire (grosime strat Zn — Z275/Z600 sau masa de zinc pentru zincare la cald), conform SR EN 10346 / SR EN ISO 1461;
- Certificat de conformitate pentru elementele de asamblare (grupă, clasă, acoperire).

Materialele fără certificate valabile, sau cu neconcordanțe marcă/document, se **resping** și se **izolează** în zona de carantină a șantierului până la clarificare/evacuare.

### 2.2. Fabricație în uzină — toleranțe de debitare, găurire, formare

Fabricația se realizează în **regim EXC2** (SR EN 1090-2). Condiții:
- **Debitare** prin ștanțare/forfecare/tăiere laser — fără fisuri de margine, fără crestături; muchiile prelucrate să nu deterioreze zincarea ulterioară;
- **Găurire** — găuri pentru șuruburi executate prin ștanțare sau burghiere; **jocul nominal** gaură-șurub conform SR EN 1090-2 tabel 11 (uzual +1 mm pentru M12–M14, +2 mm pentru M16–M24); alungirile (găuri ovalizate) admise numai unde le prevede proiectul (compensare toleranțe montaj);
- **Toleranțe de fabricație (esențiale)** conform SR EN 1090-2 anexa D: lungime element ±(2…3) mm pe barele scurte; rectilinitate; poziția găurilor în grup ±2 mm; distanța dintre grupurile de găuri ±2 mm;
- Marcarea pieselor: fiecare reper marcat durabil (poanson pe zona neportantă/etichetă), corelat cu lista de piese și planșele DE, astfel încât zincarea și trasabilitatea să nu se piardă.

### 2.3. Zincare termică la cald — Z275/Z600 și galvanizare la cald

Protecția anticorozivă este **esențială** (durata de viață a CEF 25–30 ani în mediu de exterior, categorie de corozivitate uzuală **C3–C4** SR EN ISO 12944-2, agrivoltaic sau litoral **C4–C5**). Se aplică una dintre soluții, conform proiect:

**2.3.1. Profile din bandă preacoperită (Z275 / Z600 — SR EN 10346).** Profilele formate la rece din bandă galvanizată continuu (procedeu Sendzimir), cu masa de zinc pe ambele fețe:
- **Z275** = 275 g/m² (ambele fețe) ≈ ~20 µm/față — pentru medii C2–C3;
- **Z450 / Z600** = 450 / 600 g/m² ≈ ~30 / ~42 µm/față — pentru medii C4–C5 (recomandat pentru CEF cu durată ≥ 25 ani, litoral, agrivoltaic).
- **Regulă:** marginile tăiate după galvanizare (secțiuni de debitare) rămân neacoperite; se admite protecție locală prin **vopsire cu zinc bogat (zinc-rich, min. 92 % Zn în film uscat)** pe marginile de debitare și pe zonele deteriorate, ca reparație — dar **nu** ca înlocuire a zincării de bandă pe suprafețele mari.

**2.3.2. Galvanizare la cald prin imersie (SR EN ISO 1461)** — pentru piesele masive (piloți laminați tip A, guseuri groase, plăci de bază), imersate integral în zinc topit:
- **Grosimea minimă medie a stratului** conform SR EN ISO 1461 tabel, funcție de grosimea piesei de oțel:
  - oțel ≥ 6 mm: strat mediu **≥ 85 µm** (min. local 70 µm);
  - oțel 3…6 mm: strat mediu **≥ 70 µm** (min. local 55 µm);
  - oțel 1,5…3 mm: strat mediu **≥ 55 µm** (min. local 45 µm).
- Aderență, aspect (fără porțiuni neacoperite, băloșaje ascuțite, incluziuni de flux/cenușă), uniformitate — conform SR EN ISO 1461.
- **Reparațiile locale** ale zonelor neacoperite/deteriorate la manipulare: max. **0,5 % din suprafața totală a piesei** și fiecare zonă ≤ 10 cm², prin metalizare cu zinc (pulverizare) sau vopsea zinc-rich, cu grosime ≥ 100 µm și ≥ 30 µm peste grosimea zincării de bază.

**2.3.3. Verificarea zincării.** Măsurarea grosimii stratului cu **grosimetru magnetic/curenți turbionari** (SR EN ISO 2178/2360), minim 5 puncte de măsurare per zonă de referință; media pe piesă și minimul local trebuie să respecte pragurile de mai sus. Se întocmește **registru de zincare** cu buletine per lot.

### 2.4. Compatibilitate galvanică și detalii anticorozive

- **Se interzice** contactul direct oțel zincat – aluminiu în prezența umezelii persistente fără separare (garnituri EPDM, șaibe izolatoare) — risc de cuplu galvanic;
- **Inox – oțel zincat:** admis, dar inoxul este catodic; se limitează suprafața anodică (zinc) mică față de catod mare; se folosesc elemente de asamblare compatibile;
- Contactul cu **betonul/mortarul proaspăt** (medii alcaline) atacă zincul — se protejează zonele de trecere a stâlpilor/piloților prin beton cu **bandă bituminoasă / manșon PVC** pe min. 50 mm deasupra și sub fața betonului.

### 2.5. Montaj — toleranțe geometrice și cupluri de strângere

**2.5.1. Toleranțe de montaj (esențiale, SR EN 1090-2 + proiect).** Se verifică topografic (Stereo 70) și cu instrumente de montaj:

| Parametru geometric | Toleranță admisă (referință) |
|---|---|
| Poziția în plan a capului pilotului/stâlpului (E, N) | ± 25 mm |
| Cota de refuz/cap pilot (elevație) | ± 20 mm |
| Verticalitatea stâlpului/pilotului | ≤ **1 % din lungimea liberă** (≤ H/100), max. 25 mm |
| Aliniamentul rândului de stâlpi (rectilinitate) | ± 15 mm pe 20 m |
| Coplanaritatea planului modulelor | abateri locale ≤ ± 10 mm / 3 m |
| Interax stâlpi (pas) | ± 10 mm |
| Cota superioară masă vs. proiect | ± 20 mm |
| Unghiul de înclinare β | ± 1,0° |

**2.5.2. Cupluri de strângere (îmbinări cu șuruburi).** Se aplică conform fișei tehnice a furnizorului sistemului de mese; în lipsa acesteia, ca **referință orientativă** pentru șuruburi zincate lubrifiate, grupă 8.8 (a se recalibra la torsiometru pe amplasament):

| Filet | Grupa | Cuplu nominal orientativ (Nm) |
|---|---|---|
| M8 | 8.8 | 20–25 |
| M10 | 8.8 | 40–50 |
| M12 | 8.8 | 70–85 |
| M12 | 10.9 | 100–120 |
| M16 | 8.8 | 170–210 |
| M16 | 10.9 | 240–290 |
| M20 | 8.8 | 340–410 |

> **NOTĂ:** cuplurile depind puternic de coeficientul de frecare (stare acoperire, lubrifiere) — valorile de mai sus sunt **orientative**; **cuplul de proiect este cel din fișa sistemului**, calibrat pe amplasament cu **chei dinamometrice verificate metrologic** (certificat de etalonare valabil). Îmbinările pretensionate (HV/HR) se execută prin metoda cuplului sau a rotației controlate (SR EN 1090-2, cap. 8), cu control statistic 10 % (min. 2/îmbinare) și reverificare la orice depășire.

### 2.6. Sudarea (unde apare — guseuri, plăci de bază, prelungiri piloți)

Deși mesele sunt predominant **asamblate cu șuruburi**, unele componente (plăci de bază, guseuri, prelungiri/înnădiri de piloți metalici) implică **suduri de uzină și, excepțional, de șantier**.

- **Sistem de calitate în sudare:** producătorul deține certificare **SR EN ISO 3834-3** (cerințe standard) minim, **-2** pentru elemente principale;
- **Proceduri:** fiecare tip de îmbinare sudată se execută pe baza unei **WPS** aprobate, susținută de **WPQR** (SR EN ISO 15614-1);
- **Sudori:** calificați și autorizați (SR EN ISO 9606-1), cu certificate valabile;
- **Nivel de calitate:** minim **nivel C** (SR EN ISO 5817) pentru suduri portante, **nivel B** unde impune proiectul (îmbinări dinamic solicitate);
- **Sudura pe piese zincate:** se **înlătură zincul** din zona de sudare (min. 25 mm de-o parte și de alta) înainte de sudare; se **reface protecția** local după sudare (metalizare/zinc-rich) — sudura pe zinc este interzisă (porozitate, fum toxic);
- **Controlul sudurilor** — v. §6.3.

### 2.7. Livrare, manipulare, depozitare

- Transport și manipulare astfel încât să nu se deterioreze zincarea (chingi textile, nu lanțuri; distanțiere); piesele deformate/rănite grav se resping;
- Depozitare pe suporți, ferite de contact cu solul și apa stagnantă (risc „rugină albă” pe zinc proaspăt); ventilație între piese;
- Modulele fotovoltaice se manipulează conform instrucțiunilor producătorului (fără presiune pe sticlă/celule), cu trasabilitate serie (relevantă la garanție, nu la rezistență).

### 2.8. Tip S1 — mese FIXE (fixed-tilt) — condiții specifice de execuție și recepție

Mesele fixe sunt tratate integral în §2.1–§2.7 (materiale, fabricație, zincare, montaj, toleranțe, cupluri). **La recepție** se verifică specific:
- unghiul de înclinare β realizat: **± 1,0°** față de proiect (inclinometru pe planul de module);
- coplanaritatea și aliniamentul modulelor (§2.5.1);
- inexistența pieselor în mișcare → **nu** se aplică probe funcționale.

### 2.9. Tip S2 — TRACKERE cu 1 AXĂ (single-axis) — execuție, echipare, probe funcționale, recepție

**2.9.1. Componente specifice (dincolo de structura metalică §2.1–§2.7):**
- **axă de rotire (torque tube / tub de torsiune)** — țeavă/profil zincat care poartă modulele și transmite momentul de la actuator; înnădiri cu manșoane/flanșe cuplate cu cuplu controlat;
- **lagăre/bearing-uri** pe fiecare stâlp (piloți) — ghidează rotirea axei; joc radial/axial în toleranța producătorului;
- **actuator/motor** — motor electric (DC/AC) cu reductor sau **actuator liniar**, care rotește axa; un actuator poate acționa **un rând (row)** de mai multe mese cuplate (system „multi-row” prin bară de legătură) sau fiecare rând independent;
- **controller (NCU/tracker control unit)** — unitate de comandă care primește poziția solară (algoritm astronomic + ceas + coordonate GPS) și comandă unghiul;
- **senzori** — de poziție/unghi (encoder/inclinometru), de vânt (anemometru), opțional iradiere; declanșează **backtracking** și **stow**;
- **alimentare** — de la rețeaua parcului sau **autonomă** (panou dedicat + acumulator per tracker), pentru a permite stow chiar la pană de rețea.

**2.9.2. Cerințe de execuție/montaj specifice trackerelor 1 axă:**
- **alinierea axei de rotire** — rectilinitatea tubului de torsiune pe toată lungimea rândului: abatere ≤ **± 5 mm / 10 m** și cumulat ≤ ± 20 mm; abateri mari induc frecare în lagăre și suprasolicitarea actuatorului;
- **orizontalitatea/panta axei** — conform proiect (uzual urmărește panta terenului, dar în limita admisă de producător, tipic ≤ 5–15 % pantă N–S);
- **coaxialitatea lagărelor** — toate lagărele unui rând coaxiale în toleranța producătorului (aliniere cu laser/fir); un lagăr descentrat blochează rotirea;
- **cuplarea actuatorului** — montaj fără forțare, cu jocurile prescrise; verificarea sensului de rotire;
- **cablarea și protecția** — cabluri de comandă/alimentare fixate, cu bucle de mișcare (cablu se mișcă la rotire — se prevede lungime + protecție anti-uzură la trecerea prin puncte mobile);
- **echipotențializarea** părților mobile — legare la pământ prin **conductor flexibil (braid) / lagăr conductiv**, întrucât lagărul poate întrerupe continuitatea electrică (v. §12 — împământare rame).

**2.9.3. PROBE FUNCȚIONALE OBLIGATORII (recepție tracker 1 axă):**

| Nr. | Probă | Procedură | Criteriu de acceptare |
|---|---|---|---|
| P1 | **Verificare la gol (fără module) — rotire liberă** | rotire manuală/motorizată pe tot domeniul | fără frecare/blocaj; efort în limita producătorului |
| P2 | **Calibrarea unghiurilor (zero + capete de cursă)** | poziționare la 0° (orizontal) și la limitele ±α_max; verificare cu inclinometru | eroare unghi **≤ ± 1,0°** față de comandă; capete de cursă (limit switch) funcționale |
| P3 | **Test de urmărire (tracking)** | comandă parcurgerea profilului diurn (răsărit→apus) | poziția reală urmează comanda cu **eroare ≤ ± 1,0°**; mișcare lină, fără trepte/vibrații |
| P4 | **Test backtracking** | simulare unghi solar mic (dimineață/seară) cu rânduri vecine | trackerul reduce unghiul pentru a evita umbrirea rândului vecin, conform algoritm; verificare geometrică |
| P5 | **Test STOW (poziție de siguranță la vânt)** | comandă stow (uzual orizontal 0° sau unghi de siguranță) la depășirea pragului anemometru | atinge poziția de stow în **timpul prescris** (tipic < 5–10 min de la alarmă); rămâne blocat în stow |
| P6 | **Stow la pană de rețea** | întrerupere alimentare | trackerul merge în stow pe alimentare autonomă / se blochează mecanic în poziție sigură |
| P7 | **Test anemometru / prag vânt** | injectare semnal peste prag | declanșează stow automat |
| P8 | **Zgomot/vibrații/etanșare motor** | inspecție la funcționare | fără zgomot anormal; carcasă motor/reductor etanșă (IP conform proiect) |

Toate probele se consemnează în **protocol de probe funcționale tracker**, semnat de furnizorul sistemului + executant + diriginte. **Neconformitatea** (ex. eroare unghi > 1°, stow neatins în timp) → **remediere** (recalibrare, reglaj lagăre, înlocuire actuator/controller) + **re-testare integrală** a probei afectate.

**2.9.4. Verificarea poziției de STOW — critică structural.** Poziția de stow **reduce expunerea la vânt** (uplift) prin aducerea panoului aproape de orizontală / la unghi minim de rezistență. Structura trackerului este dimensionată în proiect la vânt **în poziția de stow** (nu la poziția de urmărire, care apare la vânt redus). De aceea funcționarea corectă a stow (P5–P7) este **condiție de siguranță structurală**, nu doar de producție — un tracker care nu intră în stow la vânt puternic poate ceda. Se verifică la recepție **pragul de vânt de stow** din proiect vs. cel setat în controller (concordanță).

### 2.10. Tip S3 — TRACKERE cu 2 AXE (dual-axis) — execuție, echipare, probe funcționale, recepție

**2.10.1. Componente specifice.** Suportul are **două grade de libertate**: rotire **azimut** (în jurul axei verticale — pilon central masiv) și **elevație** (înclinarea panoului). Fiecare axă are propriul **actuator/motor + reductor** (adesea reductor melcat autoblocant sau actuator liniar), controller comun cu doi drivere, și senzori de poziție pe ambele axe. Structura este mai masivă (pilon + suport rotativ + cadru de module) și transmite fundației **momente mari** (brațul de pârghie al panoului rotit).

**2.10.2. Execuție/montaj specific 2 axe:**
- **verticalitatea pilonului central** — critică (definește axa de azimut): abatere ≤ **1 % (H/100)**, verificată topografic;
- **fundația pilonului** — de regulă **bloc/pahar de beton armat masiv** sau pilot/micropilot de mare capacitate (moment mare) — v. §4; **niciodată** balast simplu decât cu verificare specială la răsturnare;
- **rulmentul/coroana de azimut** — montaj curat, lubrifiat, cuplu de strângere buloane conform producător; verificarea planeității suprafeței de rezemare;
- **cuplarea celor doi actuatori** — sens de rotire, capete de cursă pe ambele axe;
- **echipotențializare** ambele articulații (braiduri).

**2.10.3. PROBE FUNCȚIONALE OBLIGATORII (recepție tracker 2 axe):**

| Nr. | Probă | Criteriu de acceptare |
|---|---|---|
| P1 | Rotire liberă azimut (fără forțare) | fără blocaj; efort în limită |
| P2 | Rotire liberă elevație | idem |
| P3 | Calibrare zero + capete de cursă **azimut** | eroare ≤ ± 1,0°; limit switch OK |
| P4 | Calibrare zero + capete de cursă **elevație** | eroare ≤ ± 1,0°; limit switch OK |
| P5 | Test urmărire combinată (azimut + elevație pe traiectorie diurnă) | eroare poziționare ≤ ± 1,0° pe fiecare axă; sincronizare corectă |
| P6 | Test STOW pe ambele axe (vânt/zăpadă) | atinge poziția sigură (uzual panou orizontal, „față în vânt minim”) în timp prescris |
| P7 | Stow la pană de rețea | poziție sigură pe alimentare autonomă / blocare autoblocantă a reductoarelor |
| P8 | Test anemometru/prag vânt + prag zăpadă (dacă e prevăzut) | declanșare stow automat |

Ca și la S2 (§2.9.4), funcționarea **stow** este **condiție de siguranță structurală** (dimensionarea la vânt se face în stow). Protocolul de probe se semnează de furnizor + executant + diriginte; neconformitatea → remediere + re-testare.

### 2.11. Datele panoului fotovoltaic — tabel de recepție

Deși modulul FV nu este element de rezistență al structurii suport, **caracteristicile lui (masă, arie, clasă de încărcare mecanică) sunt date de intrare directe** în calculul de rezistență (greutate proprie, suprafață expusă la vânt/zăpadă, presiune admisibilă pe modul). Prin urmare, la recepția aprovizionării modulelor se verifică și consemnează:

| Caracteristică | Valoare de referință (exemplu) | Standard / verificare | Relevanță structurală |
|---|---|---|---|
| Dimensiuni (L×l×g) | ~**2384 × 1134 × 35 mm** | fișă tehnică / măsurare | arie expusă, geometrie masă |
| Arie modul | ~**2,58 m²** (2,384 × 1,134 wafer 182mm) — sau ~3,1 m² la formate 2,3×1,3 | calcul | suprafață captatoare/expusă |
| Masă | ~**28–32 kg/buc** | cântărire eșantion / fișă | greutate proprie G |
| **Clasă de încărcare mecanică** | **± 2400 Pa** (față/spate min.) … **+ 5400 Pa** (zăpadă) / **− 2400 Pa** (vânt sucțiune) | **SR EN IEC 61215-2** (test încărcare mecanică statică) | **prag de presiune admisibilă pe modul** — verificat vs. w și s de proiect |
| Calificare tip | conform | **SR EN IEC 61215-1** | validitate producător |
| Siguranță | conform | **SR EN IEC 61730-1/-2** | — |
| Flash-test (STC) | fișă test individual (P_max, I_sc, V_oc, FF) | raport flash-test/modul sau lot | trasabilitate putere → N_module |
| Toleranță putere | ex. **0 / +5 W** (pozitivă) | fișă / flash-test | scalare N_module la P_DC |
| Rezistență PID | modul **PID-free/rezistent** | **IEC TS 62804** | durabilitate (nu structural) |
| Sarcină de grindină/impact | conform 61215 | test grindină | integritate sticlă |

> **Verificare structurală obligatorie:** presiunea de proiect (vânt + zăpadă, valorile SLU) pe modul **≤ clasa de încărcare mecanică certificată** a modulului (ex.: dacă zăpada dă +3,0 kN/m² = 3000 Pa, modulul trebuie să fie clasat **+5400 Pa**; dacă upliftul dă −2,0 kN/m² = 2000 Pa, modulul trebuie clasat min. **−2400 Pa**). **Sistemul de prindere (cleme, poziția lor)** trebuie să respecte **schema de clemare validată de producătorul modulului** pentru clasa de încărcare declarată — orice altă poziție a clemelor **anulează** clasa (v. §2.12).

### 2.12. Montaj module pe structură — cleme, cupluri, rosturi, echipotențializare

**2.12.1. Cleme de fixare.**
- **Cleme intermediare (mid-clamp)** — între două module adiacente; **cleme de capăt (end-clamp)** — la capetele rândului de module pe masă;
- material: **aluminiu (EN AW-6005A/6063 anodizat)** sau **inox A2/A4**; șuruburi inox/oțel zincat compatibil;
- **poziția clemelor** — **obligatoriu** în zonele indicate de producătorul modulului (fișa de montaj: distanța de la colț, de regulă la ~1/4 din lungime, în zona ramei perforate) — aceasta este condiția de validitate a clasei de încărcare mecanică (§2.11);
- **numărul minim** de cleme/modul conform fișă (uzual 4, câte 2 pe fiecare latură portantă).

**2.12.2. Cupluri de strângere cleme (orientative — se aplică valorile din fișa clemei):**

| Element | Filet uzual | Cuplu orientativ (Nm) |
|---|---|---|
| Clemă mid/end pe profil (aluminiu) | M8 | 14–18 |
| Clemă pe profil (inox/oțel) | M8 | 16–20 |
| Prindere profil-suport pe masă | M10 | 40–50 |

> Cuplu **prea mic** → modul slăbit (risc de smulgere la vânt); cuplu **prea mare** → deteriorarea ramei/anodizării/sticlei. Se folosesc **chei dinamometrice etalonate**; se verifică pe eșantion min. 10 % din cleme + toate clemele de capăt.

**2.12.3. Rosturi de dilatație.** Între module și în lungul rândului se lasă **rosturi de dilatație** conform fișei sistemului (uzual **10–20 mm** între rame de module; rosturi mai mari la rânduri lungi de tracker) — pentru a permite dilatarea termică (ΔL = α·L·ΔT; α_Al ≈ 23·10⁻⁶/°C, α_oțel ≈ 12·10⁻⁶/°C; la ΔT ≈ 70 °C și rând de 24 m → ΔL_Al ≈ 39 mm) fără a induce eforturi în module/rame. Rosturile se verifică la recepție (șubler/lere).

**2.12.4. Echipotențializarea ramelor (legare la pământ — interfață structurală).** Toate ramele metalice ale modulelor și structura metalică se leagă la pământ (echipotențializare — I7-2011, SR EN 62305):
- prin **cleme cu dinți de străpungere a anodizării (WEEB / bonding jumpers)** sau conductor de echipotențializare (Cu min. 6 mm² / conform proiect electric) care asigură **continuitate electrică** peste stratul izolator de anodizare/vopsea;
- **continuitatea** se verifică la recepție prin **măsurarea rezistenței de continuitate** (≤ prag proiect, uzual ≤ 0,1 Ω între ramă și structura de pământare) — probă comună cu specialitatea electrică;
- la **trackere**, articulațiile mobile (lagăre) se ocolesc cu **conductor flexibil (braid)** — lagărul nu garantează continuitate (§2.9.2).

**2.12.5. Ordinea de montaj a modulelor.**
1. Recepția și verificarea geometrică a structurii suport (mese/trackere) — toleranțe OK (§2.5, §2.9, §2.10);
2. Montarea primului modul la un capăt, cu clemă de capăt (end-clamp), aliniat la reper;
3. Adăugarea modulelor succesive, cu **cleme intermediare (mid-clamp)**, respectând **rostul de dilatație** între rame;
4. Montarea clemelor de capăt la celălalt capăt;
5. Strângerea la **cuplu** a tuturor clemelor (dinspre centru spre capete, pentru distribuirea rosturilor);
6. **Echipotențializarea** ramelor pe măsura montajului;
7. Verificarea finală: coplanaritate, rosturi, cupluri (eșantion), continuitate pământare.

Ordinea și cantitățile (nr. module, cleme, jumpers) **scalează cu puterea** (§1.4): N_cleme ≈ (2 × N_module pe fiecare latură) + cleme de capăt per rând.

---

## 3. FUNDAȚII SUPORȚI — CONDIȚII COMUNE ȘI TIP B (BLOCURI/CUZINEȚI BETON)

### 3.1. Condiții comune tuturor tipurilor de fundare

- **Predare-primire amplasament și trasare** (topografic, Stereo 70 / cote M.N. 1975), cu **proces-verbal de trasare** semnat de executant + diriginte; reperi de trasare protejați;
- **Verificarea naturii terenului de fundare** prin sondaje/foraje de control corelate cu studiul geotehnic; **discrepanțele** (strat mai slab, umpluturi, apă) se semnalează proiectantului — **NU se continuă** fundarea până la dispoziție scrisă (dispoziție de șantier / soluție de proiectant);
- Fundarea sub **adâncimea de îngheț** (H_îngheț conform STAS 6054, funcție de zonă — uzual 0,80–1,10 m în România) — aplicabil la Tip B (beton) și la cota de refuz a piloților;
- **Faze determinante (FTP)** minime la fundații (cu convocare beneficiar/proiectant/ISC): natura terenului de fundare; recepția armării înainte de betonare; recepția probei de smulgere pe piloți (v. §4.5).

### 3.2. Tip B — blocuri / cuzineți de beton armat

**3.2.1. Clase și rețete beton.** Betonul din fundații se specifică prin **clasă de rezistență + clase de expunere + Dmax + clasă de consistență** (SR EN 206 + SR 13510):
- **Clasa de rezistență:** minim **C16/20** pentru blocuri masive puțin armate, uzual **C20/25** pentru cuzineți armați (conform proiect);
- **Beton de egalizare/umplutură:** **C8/10**, strat 5–10 cm sub fundație;
- **Clase de expunere (uzual):** **XC2** (fundație în teren umed) și, unde există agresivitate sulfatică/îngheț-dezgheț, **XA1** / **XF1**; în zone cu săruri de dezgheț sau litoral, se ridică la XA2/XD; se stabilesc pe baza analizei apei/solului din geotehnie;
- **A/C max:** ≤ 0,60 (XC2), ≤ 0,55 (XA1); **dozaj minim ciment** ≥ 280–300 kg/m³ după expunere;
- **Dmax agregat:** 16 sau 22 mm; **consistență** S3 (uzual);
- **Ciment:** tip conform expunerii — la agresivitate sulfatică **ciment rezistent la sulfați (SR)**.

**3.2.2. Armare.** Oțel-beton marca **B500B** (uzual) sau B500C (zone seismice, ductilitate), SR EN 10080:
- Carcase/plase conform planșe DE; **acoperire cu beton (c_nom)** funcție de expunere: **XC2 → c_min = 25 mm + Δc_dev 10 mm = c_nom 35 mm**; se sporește la XA/XD;
- Distanțieri din material durabil (PVC/beton), interzise cele metalice la fața văzută;
- Ancoraje/înnădiri (l_bd) conform SR EN 1992-1-1; suprapuneri decalate;
- Piesele metalice înglobate (buloane de ancoraj, plăci de bază pentru stâlpi metalici) — poziționate cu **șabloane rigide**, verificate topografic **înainte** de betonare (poziție ± 5 mm față de proiect, verticalitate buloane ≤ 2 mm/100 mm).

**3.2.3. Cofraje.** Cofraje etanșe, rigide, curate, tratate cu decofrol compatibil; toleranțe fața văzută SR EN 13670 (clasă uzuală); nu se admit deformații care modifică secțiunea sub proiect.

**3.2.4. Betonare, compactare, tratare (curing).**
- Punerea în operă conform NE 012/2 și SR EN 13670: turnare continuă pe fundație, **vibrare** cu vibrator de interior (fără segregare), înălțime de cădere ≤ 1,5 m;
- **Tratarea betonului proaspăt** (curing) obligatorie min. **7 zile** (menținere umedă / membrană de curing / folie), cu prelungire pe timp cald/vânt;
- **Betonare pe timp friguros** (< +5 °C): măsuri speciale (NE 012/2) — încălzire componente, aditivi, protecție termică; **se interzice** betonarea sub 0 °C fără măsuri aprobate;
- **Betonare pe timp călduros** (> +30 °C): răcire, betonare noaptea, curing intensiv, prevenirea fisurării plastice.

**3.2.5. Preluarea upliftului la Tip B.** Blocul de beton preia smulgerea prin **greutate proprie (G_beton) + greutatea pământului antrenat pe frecare laterală / pe pana de smulgere**; verificarea (proiect) trebuie satisfăcută cu factorii EQU (v. §7). Executantul asigură **volumul și adâncimea de fundare din proiect** — orice reducere anulează siguranța la smulgere.

---

## 4. FUNDAȚII SUPORȚI — TIP A (PILOȚI METALICI ÎNFIPȚI) ȘI TIP C (ȘURUBURI ELICOIDALE)

### 4.1. Tip A — piloți metalici înfipți (bătuți / vibrați) — procedură de execuție

**4.1.1. Generalități.** Piloții metalici (profile IPE/HEA/U/C/Ω, cu vârf drept sau prevăzut cu papuc/vârf ascuțit, zincați termic) se introduc în teren prin **batere** (berbec/ciocan hidraulic) sau **vibroînfigere** (vibrator hidraulic), fără excavare și fără beton. Adâncimea de fișare (L_fișare) rezultă din proiect (breviar geotehnic) și se **confirmă** prin criteriul de refuz și prin testele de smulgere.

**4.1.2. Ordinea operațiilor:**
1. Trasarea poziției fiecărui pilot (topografic), marcare cu țăruș;
2. Poziționarea utilajului de batere/vibrare pe reper; ghidaj vertical (lonjeron/masă de ghidare);
3. Verificarea **verticalității inițiale** (nivele/fir cu plumb / senzor de înclinare al utilajului): abatere ≤ 1 %;
4. Baterea/vibrarea până la **cota de proiect** SAU până la **criteriul de refuz** (v. 4.1.3), oricare survine — cu monitorizarea penetrării pe ultimele lovituri/timp;
5. Măsurarea cotei finale a capului (elevație) și a poziției în plan;
6. Corecție/retragere: piloții cu refuz prematur (obstacol) sau deviație excesivă se **extrag și se reamplasează** conform dispoziției de proiectant (nu se lasă piloți deviați peste toleranță);
7. Debitarea capetelor la cotă (dacă e cazul) și **refacerea protecției** pe zona de tăiere (zinc-rich/metalizare);
8. Fixarea prelungirilor/consolelor de masă pe capul pilotului (șuruburi, cuplu conform §2.5.2).

**4.1.3. Criterii de refuz și adâncime.**
- Adâncime minimă de fișare **L_fișare ≥ valoarea de proiect** (uzual 1,5–2,5 m, funcție de teren și de smulgere);
- **Criteriu de refuz la batere:** penetrare pe ultimul set de lovituri sub o valoare-prag stabilită în proiect (ex.: < 10 mm / 10 lovituri la energia de batere specificată) — indicator de portanță atins;
- **La vibroînfigere:** viteza de penetrare sub prag + curentul/presiunea vibratorului la platou;
- **Refuz prematur** (înainte de adâncimea minimă) = suspiciune de obstacol/rocă → se raportează; nu se acceptă fișare sub minim fără soluție de proiectant (pre-forare pilot, schimbare tip fundare, reamplasare).

**4.1.4. Verticalitate — criteriu de acceptare.** Abatere de la verticală **≤ 1 % din lungimea liberă** (H/100), max. 25 mm la cap. Depășirea → extragere + reamplasare sau soluție de proiectant.

### 4.2. Tip C — șuruburi elicoidale (ground screws) — procedură de execuție

**4.2.1. Generalități.** Șuruburile de fundare (fus tubular/plin cu elice, zincate termic) se **înșurubează** în teren cu utilaj rotativ dotat cu **cap cu control de cuplu (torsiometru)**, fără excavare.

**4.2.2. Ordinea operațiilor:**
1. Trasarea poziției (topografic);
2. Poziționare utilaj, ghidaj vertical;
3. Înșurubare la turație/avans controlat, cu **înregistrarea continuă a cuplului de instalare** (M_instalare, Nm) în funcție de adâncime;
4. Oprire la **adâncimea de proiect** cu atingerea **cuplului-țintă de instalare** (corelat cu momentul rezistent la smulgere — v. 4.2.3);
5. Verificarea verticalității (≤ 1 %) și a cotei capului;
6. Fixarea structurii pe capul șurubului.

**4.2.3. Corelația cuplu ↔ capacitate la smulgere.** Pentru șuruburile elicoidale există o **corelație empirică** între cuplul final de instalare M_t (Nm) și capacitatea la smulgere/portanță:

> **R_smulgere ≈ K_t × M_t**, unde **K_t** este un factor de capacitate (1/m) specific tipului de șurub și terenului, stabilit **prin testele preliminare de smulgere pe amplasament** (§4.5) și validat de furnizor.

- **Criteriu de acceptare:** M_instalare final ≥ **M_țintă de proiect** (rezultat din R_smulgere,necesar / K_t, cu marja de siguranță). Șuruburile care **nu ating** M_țintă la adâncimea de proiect → adâncire suplimentară / șurub mai lung / soluție de proiectant;
- Se **înregistrează M_instalare pentru FIECARE șurub** (registru), fiind indicatorul de calitate primar la Tip C;
- **Se interzice** înșurubarea cu cuplu peste **M_max al fusului** (risc de forfecare/deformare a elicei) — dacă terenul e prea dur, se recurge la pre-forare pilot sau la Tip A/B.

### 4.3. Zincarea piloților și șuruburilor (Tip A și C)

Toți piloții și șuruburile îngropate se **zincează termic la cald** (SR EN ISO 1461), strat conform §2.3.2 (min. 85 µm pentru grosimi ≥ 6 mm). În **soluri agresive** (rezistivitate mică, cloruri, sulfați — determinate în geotehnie) se prevede prin proiect **spor de sacrificiu** (grosime pilot majorată — „corrosion allowance”) și/sau protecție suplimentară; caietul obligă executantul să respecte marca/grosimea sporită din proiect și **să nu substituie** profile.

### 4.4. Toleranțe geometrice finale (piloți / șuruburi)

| Parametru | Toleranță (referință) |
|---|---|
| Poziție în plan a capului | ± 25 mm |
| Cotă cap (elevație) | ± 20 mm |
| Verticalitate | ≤ 1 % (H/100), max. 25 mm |
| Rotire față de axa mesei | ± 2° |
| Adâncime de fișare vs. proiect | ≥ L_min proiect (nu se acceptă sub) |

### 4.5. TESTE DE SMULGERE (PULL-OUT) — OBLIGATORII — procedură și criterii de acceptare

Testele de smulgere sunt **obligatorii** pentru toate parcurile FV cu fundare tip A și C (și, unde upliftul e critic, pentru validarea tip B), fiind singura verificare directă a **capacității de ancoraj** — parametrul care guvernează siguranța structurii FV.

**4.5.1. Categorii de teste:**
- **A) Teste preliminare (de probă / calibrare)** — executate **înainte** de producția în serie, pe piloți/șuruburi de probă (identici cu cei de proiect), în **fiecare zonă geotehnică** distinctă. Scop: confirmarea/calibrarea capacității la smulgere, a adâncimii de fișare și, la Tip C, a factorului K_t (cuplu↔capacitate). Minim **3–5 teste per tip de teren/zonă**.
- **B) Teste de control în producție** — pe piloți/șuruburi de lucru, aleși aleatoriu, pe parcursul execuției. Cantitate: **min. 0,5 % din numărul total de piloți**, cu prag minim **10 buc./parc** și **3 buc./tronson/zonă** (v. §1.4). Scop: confirmarea menținerii capacității pe tot parcul.

**4.5.2. Echipament și montaj de încercare.** Cadru de reacțiune (grindă + reazeme la distanță ≥ 3–4 D de pilot ca să nu influențeze terenul), **cric hidraulic de tracțiune** cu manometru etalonat (certificat metrologic valabil), traductor de forță (celulă de sarcină), **comparatoare/traductoare de deplasare (min. 2, diametral opuse)** cu rezoluție 0,01 mm, fixate pe repere independente de zona influențată.

**4.5.3. Procedura de încărcare (în trepte).**
- Sarcina se aplică **în trepte** (uzual 8–10 trepte până la sarcina de probă), fiecare treaptă menținută până la stabilizarea deplasării (rata de deplasare < 0,05 mm/min sau timp min. impus);
- **Sarcina maximă de probă (R_test):** de regulă **R_test = γ_test × R_smulgere,proiect**, cu **γ_test = 1,5** (test de acceptare / proof load) sau până la **cedare** (test la rupere, doar pentru probele preliminare);
- Se înregistrează **curba forță–deplasare** (F–δ);
- **Descărcare** în trepte, cu măsurarea deplasării remanente.

**4.5.4. Criterii de acceptare (test de control / proof).** Testul este **CONFORM** dacă la sarcina de probă R_test = 1,5 × R_proiect:
- deplasarea totală la vârful pilotului **δ_total ≤ δ_admisibil** (uzual **δ_admisibil = 10–15 mm** la capul pilotului, sau valoarea din proiect); ȘI
- deplasarea remanentă la descărcare **δ_rem ≤ 4 mm** (sau ≤ 25 % din δ_total, prag din proiect); ȘI
- **nu se atinge cedarea** (creep necontrolat — creșterea deplasării fără stabilizare) sub R_test.

Testul este **NECONFORM** dacă oricare criteriu e depășit. Consecințe: **adâncire** suplimentară / **pilot mai lung** / **schimbare tip fundare** pe zona respectivă + **dublarea numărului de teste** pe tronsonul afectat (extindere eșantion), până la confirmarea capacității. Rezultatele se consemnează în **buletine de încercare** + **proces-verbal de fază determinantă**.

**4.5.5. Criteriu de acceptare — test preliminar la rupere (calibrare).** Se aplică sarcină crescătoare până la **cedare** (deplasare accelerată necontrolată). Rezistența ultimă măsurată R_u,măsurat trebuie să satisfacă **R_u,măsurat ≥ γ_g × R_smulgere,necesar**, unde γ_g este coeficientul geotehnic parțial din proiect (Eurocod 7 / NP 123). Se stabilesc astfel adâncimea de fișare și, la Tip C, factorul K_t.

### 4.6. Tip D — contragreutăți / balast (fundații gravitaționale) — execuție și acceptare

**4.6.1. Domeniu de utilizare.** Fundațiile-balast se folosesc **numai** când înfigerea/forarea este imposibilă sau interzisă:
- **rocă de suprafață** (baterea/forarea neeconomică);
- **halde/depozite, batale, depozite de deșeuri închise** cu **membrană de etanșare (geomembrană)** care **NU poate fi perforată** (perforarea ar compromite izolarea) — parcuri „pe capac”;
- terenuri contaminate unde nu se dorește excavare;
- zone cu utilități subterane care interzic penetrarea.

**4.6.2. Alcătuire.** Blocuri/dale prefabricate de beton (sau turnate pe loc pe pat pregătit), cu conector metalic înglobat pentru masă:
- **beton:** minim **C20/25** (dale prefabricate: uzual C25/30 pentru manipulare), expunere **XC4/XF1** (expuse la exterior, îngheț-dezgheț) → A/C ≤ 0,55, aer antrenat la XF;
- **armare:** B500B, minim constructivă + calculată pentru ridicare/manipulare (dale prefabricate) și pentru ancorarea conectorului;
- **dimensiuni/masă:** rezultă din **verificarea la răsturnare și alunecare din vânt** (v. 4.6.4) — masă tipică **0,5–2,5 t/reazem** (scalează cu upliftul, nu cu puterea);
- **conector** înglobat (bulon/placă) poziționat cu șablon, verificat înainte de betonare.

**4.6.3. Așezarea pe teren — pat și separare.**
- **pat de fundare** nivelat și compactat (balast/piatră spartă) sau, pe rocă, suprafață curățată/nivelată;
- **geotextil de separare** sub blocuri (evită contaminarea patului, migrarea finelor, protejează membrana la parcurile pe halde — balastul se așază **pe dală de repartizare + geotextil**, fără sarcini concentrate care să perforeze geomembrana);
- pe membrane: se interzice orice ancoraj penetrant; sarcina se **distribuie** pe dale de repartizare dimensionate la presiunea admisibilă a suportului haldei.

**4.6.4. Verificarea la răsturnare și alunecare (criterii de acceptare — proiect, confirmate la execuție).** Balastul rezistă la vânt **exclusiv prin greutate proprie**:

- **Răsturnare (EQU):** M_stabilizator ≥ γ · M_răsturnare → **G_bloc · b/2 ≥ γ_dst · F_uplift · h_braț**, cu G luat favorabil (0,9) și uplift 1,5;
- **Alunecare:** forța orizontală din vânt ≤ frecarea la bază → **H_vânt,d ≤ (G_d,fav · μ) / γ**, cu **μ = coeficient de frecare beton–pat** (uzual 0,4–0,5 beton/balast, 0,6 beton/rocă rugoasă) — se poate spori prin **cheie/prag antiforfecare** turnat sub bloc;
- **Capacitate portantă a patului** (presiune sub bloc ≤ p_adm din geotehnie / capacitatea haldei).

> **Execuția asigură MASA și DIMENSIUNILE din proiect** — orice bloc subdimensionat/subcântărit anulează stabilitatea. **La recepție se verifică prin cântărire/măsurare** dimensiunile și, pe eșantion, **masa reală** a blocurilor prefabricate (± 5 % față de proiect), plus poziționarea și frecarea patului. Testul de smulgere „pull-out” **nu se aplică** balastului (nu e ancorat); în schimb se poate face, unde proiectul cere, o **verificare la alunecare/deplasare** sub forță orizontală de probă.

### 4.7. Tip E — micropiloți — execuție și acceptare

**4.7.1. Domeniu.** Micropiloți (Ø ≤ 300 mm, NP 123-2010 / SR EN 14199) — pentru **uplift mare în terenuri dificile** (roci alterate, argile tari, obstacole) unde piloții bătuți refuză și balastul nu e fezabil.

**4.7.2. Procedură de execuție:**
1. **Forare** cu foreză (rotativ/rotopercutant), cu sau fără tubaj, la diametrul și adâncimea de proiect;
2. Introducerea **armăturii centrale** (țeavă de oțel / bară filetată — self-drilling anchor) — zincată sau cu protecție anticorozivă conform proiect (mediu agresiv → tub protector/spor de sacrificiu);
3. **Injectare** lapte de ciment / mortar (SR EN 445/447) sub gravitație sau presiune (IGU/IRS), asigurând **acoperirea armăturii** și **frecarea laterală** cu terenul (bulbul de ancoraj);
4. Curățarea capului, montarea conectorului/plăcii de rezemare a mesei;
5. Reface protecția anticorozivă pe cap.

**4.7.3. Materiale și control.**
- **Mortar/lapte injectare:** clasă și A/C conform proiect; probe (cuburi/cilindri) pentru rezistență;
- **Armătura:** marcă/secțiune certificată; protecție anticorozivă;
- **Trasabilitate:** registru micropiloți (poziție, Ø, adâncime, volum injectat, presiune injectare, verticalitate).

**4.7.4. Toleranțe** — poziție ± 25 mm, verticalitate ≤ 2 %, adâncime ≥ proiect.

**4.7.5. Testul de smulgere — OBLIGATORIU** ca la Tip A/C (§4.5): micropiloții se verifică prin **pull-out** la R_test = 1,5 × R_proiect, cu aceleași criterii de acceptare (δ ≤ 10–15 mm, δ_rem ≤ 4 mm, fără cedare). Micropiloții au capacitate mare la smulgere (frecare pe bulbul injectat) — motivul folosirii lor la uplift mare.

---

## 5. FUNDAȚII PENTRU PT / SKID INVERTOARE (BETON — SR EN 1997 / NP 112)

### 5.1. Sistemul de fundare al echipamentelor

Posturile de transformare (anvelopă prefabricată beton / container) și skid-urile de invertoare reazemă pe:
- **Radier general de beton armat** — soluția uzuală pentru anvelope prefabricate PT (radier plan armat pe două direcții), cu strat de balast/piatră spartă compactat dedesubt și beton de egalizare;
- **Cuzineți / grinzi de fundare** — pentru skid-uri liniare;
- Fundarea directă se dimensionează la **capacitatea portantă a terenului** (SR EN 1997-1 / NP 112-2014) și la **tasări admisibile** (uniforme și diferențiale — echipamentele electrice sunt sensibile la tasare diferențială: uzual **≤ 1/500** între reazeme, sau valoarea impusă de furnizorul PT).

### 5.2. Materiale și execuție

- **Beton radier:** minim **C20/25**, expunere **XC2 (+XF1 la exterior expus)**, A/C ≤ 0,55–0,60, Dmax 16–22, S3; **beton egalizare C8/10** (5–10 cm);
- **Armare:** B500B/B500C conform planșe DE; **acoperire c_nom** ≥ 40 mm la fața în contact cu terenul (radiere), 35 mm în rest (expunere XC2), sporită la XF/XD;
- **Piese înglobate:** buloane de ancorare a anvelopei/skidului, tuburi/goluri de trecere cabluri (etanșate ulterior), priză de pământ (platbandă/electrod) integrată — poziționate cu șabloane, verificate topografic înainte de betonare;
- **Trasare, cofraj, betonare, compactare, tratare (curing)** — identic §3.2.4 (min. 7 zile curing, măsuri timp friguros/călduros);
- **Platforma de fundare (patul):** strat de fundare (balast/piatră spartă) compactat la **grad de compactare ≥ 95–98 % Proctor modificat**, verificat prin încercări (v. §6.5);
- **Rosturi:** rosturile de lucru/turnare — tratate (curățare, spălare, punte de aderență) conform NE 012/2.

### 5.3. Cerințe specifice echipamentelor

- Suprafața radierului: planeitate ≤ ± 5 mm / 2 m (montaj anvelopă/skid); cota superioară ± 10 mm;
- Preluarea încărcărilor din transformator (greutate mare concentrată, ~4–15 t/PT după kVA) — verificată de proiectant; executantul respectă armarea și clasa din DE;
- Preluarea forței seismice a masei PT (P100-1) — buloanele de ancorare și radierul dimensionate de proiect; executantul respectă tipul/numărul buloanelor și cuplul lor.

---

## 6. CONTROLUL CALITĂȚII — MATERIALE, SUDURĂ, ZINCARE, BETOANE, TESTE, TOLERANȚE

Controlul calității se organizează prin **Plan de Control al Calității, Verificări și Încercări (PCCVI)**, cu **faze determinante (FTP)** incluse în programul de urmărire a execuției avizat de ISC. Fiecare fază se închide cu **proces-verbal** (de lucrări ascunse / de fază determinantă / de recepție calitativă).

### 6.1. Controlul materialelor (recepție la aprovizionare)

Pentru **fiecare lot** livrat se verifică (v. §2.1.4):
- concordanța marcă oțel ↔ certificat 3.1 (compoziție, f_y, f_u, KV);
- grosimea de bază a tablei/profilului (șubler/micrometru) vs. proiect;
- acoperirea Zn (bandă Z275/Z600 sau zincare la cald) — buletin + verificare grosimetru la recepție (eșantion);
- pentru betoane — v. §6.4; pentru oțel-beton — certificat + verificare marcaj/nervurare, probe de tracțiune/îndoire pe eșantion (SR EN ISO 15630) la loturi mari;
- pentru elemente de asamblare — certificat grupă/clasă/acoperire.
- **Trasabilitate:** fiecare lot primește nr. de identificare, corelat cu registrul de recepție și cu zonele de montaj (necesar la orice neconformitate ulterioară).

### 6.2. Controlul dimensional / geometric (toleranțe)

- **La fabricație (uzină):** verificare pe eșantion a lungimilor, poziției găurilor, rectilinității (§2.2), conform SR EN 1090-2 anexa D;
- **La montaj:** verificare topografică 100 % a poziției capetelor de piloți și, pe eșantion (min. 10 %), a verticalității, interaxelor, coplanarității (§2.5.1, §4.4);
- Neconformitățile geometrice se tratează: acceptare cu recalcul (proiectant), corecție, sau înlocuire.

### 6.3. Controlul sudurilor

- **Control vizual (VT) — 100 %** din suduri (SR EN ISO 17637), de personal calificat;
- **Control NDT suplimentar pe eșantion**, funcție de nivelul de calitate cerut (SR EN ISO 17635), pentru EXC2:
  - suduri de colț portante: **VT 100 % + MT sau PT pe min. 5 %**;
  - suduri cap la cap solicitate la tracțiune (înnădiri piloți): **UT sau RT pe min. 10 %**;
- **Niveluri de acceptare:** SR EN ISO 5817 nivel **C** (uzual EXC2) / **B** unde cere proiectul;
- Sudurile respinse se **remediază** (polizare + resudare conform WPS) și **se reexaminează** integral; se extinde eșantionul NDT pe seria afectată.

**Tabel — plan de control sudură (EXC2, orientativ):**

| Tip îmbinare | VT | PT/MT | UT/RT | Nivel acceptare |
|---|---|---|---|---|
| Colț portant (guseu, placă bază) | 100 % | ≥ 5 % | — | C (SR EN ISO 5817) |
| Cap la cap tracțiune (înnădire pilot) | 100 % | — | ≥ 10 % | C (B dacă cere proiect) |
| Suduri secundare/nesolicitate | 100 % | pe suspiciune | — | D |

### 6.4. Controlul betoanelor

**6.4.1. Rețete și aprobare.** Fiecare rețetă de beton (per clasă+expunere) se **aprobă** înainte de turnare, pe baza fișei de dozaj a stației (compoziție, A/C, aditivi, ciment) și, la lucrări mari, a **probelor preliminare** de convingere. Betonul se comandă și se livrează cu **bon de transport** care confirmă clasa, expunerea, ora fabricației, aditivii (SR EN 206).

**6.4.2. Prelevare probe și încercări.**
- **Consistență (tasare/slump) la turnare** — SR EN 12350-2, per transport / la începutul turnării fiecărei fundații mari; abatere admisă față de clasa comandată conform SR EN 206;
- **Cuburi/cilindri de probă** — SR EN 12390-1: prelevare **min. 1 set (3 epruvete) la fiecare 20–50 m³** turnat SAU per zi de betonare / per element important; se testează la **28 zile** (compresiune — SR EN 12390-3); opțional 7 zile (informativ);
- **Criteriul de conformitate** (SR EN 206, control producție/identitate): rezistența caracteristică f_ck realizată ≥ clasa comandată (media pe familie ≥ f_ck + marjă; fiecare rezultat individual ≥ f_ck − 4 MPa);
- **Temperatura betonului** la turnare (timp friguros/călduros) — monitorizată;
- **Aer antrenat** — la clasele cu XF (îngheț-dezgheț), măsurat (SR EN 12350-7);
- Neconformitate rezistență → **încercări nedistructive/carotare** (SR EN 12504) pe elementul suspect + evaluare de proiectant; demolare/consolidare la nevoie.

**Tabel — plan de control beton (orientativ):**

| Verificare | Frecvență | Standard | Criteriu |
|---|---|---|---|
| Bon transport (clasă, expunere, oră) | fiecare transport | SR EN 206 | concordanță cu comanda |
| Consistență (slump) | fiecare transport / start turnare | SR EN 12350-2 | ± toleranță clasă |
| Set epruvete compresiune | 1 set/20–50 m³ sau /zi | SR EN 12390-3 | f_ck la 28 zile ≥ clasă |
| Temperatură beton | pe timp friguros/călduros | NE 012/2 | în limite |
| Aer antrenat (clase XF) | pe lot XF | SR EN 12350-7 | conform rețetă |
| Acoperire armătură (înainte betonare) | 100 % elemente | SR EN 1992-1-1 | c_nom proiect |

### 6.5. Controlul terenului de fundare și al compactărilor

- **Recepția naturii terenului de fundare** — FTP, cu proiectant/geotehnician: confirmarea stratului portant din geotehnie la cota de fundare;
- **Compactarea straturilor de fundare** (patul PT, platforme) — grad de compactare prin **Proctor modificat** (STAS 1913/13) + verificare pe teren (con de nisip / densimetru nuclear), prag **≥ 95–98 %**;
- **Testele de smulgere pe piloți** (§4.5) — FTP obligatorie, cu buletine.

### 6.6. Registre și evidențe obligatorii

Executantul ține la zi:
- **Registrul de recepție materiale** (loturi, certificate, trasabilitate);
- **Registrul de zincare** (buletine grosime strat);
- **Registrul de piloți/șuruburi** — per element: poziție, adâncime, criteriu refuz / cuplu instalare (Tip C), verticalitate, cotă cap;
- **Registrul de teste de smulgere** — buletine + curbe F–δ + verdict;
- **Registrul de betoane** — bonuri, probe, rezultate 28 zile;
- **Registrul de suduri** + rapoarte NDT;
- **Procesele-verbale** de lucrări ascunse / faze determinante / recepții pe faze.

---

## 7. ACȚIUNI DE PROIECTARE ȘI VERIFICĂRI (SINTEZĂ PENTRU CONTROLUL EXECUȚIEI)

Acțiunile sunt stabilite integral în memoriul/breviarul de rezistență; se rezumă aici **pentru ca executantul și dirigintele să înțeleagă ce garantează fiecare fază de control** (de ce upliftul e critic, de ce testele de smulgere sunt obligatorii).

### 7.1. Tabel sinoptic — acțiuni caracteristice

| Acțiune | Cod | Caracterizare / valoare de referință | Determinantă pentru |
|---|---|---|---|
| Greutate proprie module + masă | G | ~15–25 kg/m² suprafață captatoare | reazem gravitațional (mic!) |
| Zăpadă pe panou | S | CR 1-1-3: s = μ_i · C_e · C_t · s_k; s_k = 1,5–2,5 kN/m² (zona) | încovoiere pane, compresiune stâlpi |
| Vânt — presiune (față) | W_p | CR 1-1-4: w = c_pe · q_p(z_e); q_b din v_b (25–30 m/s IMR 50 ani) | încovoiere, compresiune |
| **Vânt — sucțiune (uplift)** | **W_s** | **c_pe negativ mare (până la −1,5…−2,5 pe zone de margine)** | **SMULGERE piloți — ACȚIUNEA CRITICĂ** |
| Seism | E | P100-1: a_g = 0,10–0,40 g (zona); masă mică → efect redus | ancoraj PT, stâlpi zvelți |
| Termic | T | SR EN 1991-1-5 (dilatații — rosturi montaj) | rosturi, alunecări |

> **Esența pentru execuție:** structura FV are **greutate proprie foarte mică** și **suprafață mare** → **vântul de sucțiune (uplift) produce tracțiune (smulgere) în piloți**. De aceea **ancorajul (piloți/șuruburi/blocuri/balast) și verificarea lui prin testele de smulgere** sunt punctul critic de calitate al întregii lucrări. Orice pilot sub adâncime, deviat peste toleranță sau care nu trece testul de smulgere **compromite direct siguranța**.

> **La TRACKERE (S2/S3):** vântul de proiect se ia **în poziția de STOW** (unghi de siguranță), nu în urmărire — trackerul este dimensionat presupunând că **intră în stow la vânt puternic**. Prin urmare, **funcționarea corectă a comenzii de stow (probele P5–P8, §2.9.3/§2.10.3) este parte din verificarea de rezistență**, nu doar funcțională: un tracker care nu ajunge în stow la vânt puternic este solicitat peste capacitate și poate ceda. Pragul de vânt de stow setat în controller trebuie să corespundă valorii din proiect.

### 7.2. Combinații de acțiuni (SR EN 1990)

| Stare limită | Combinație | Utilizare |
|---|---|---|
| **SLU (STR)** | 1,35·G + 1,5·S + 1,5·ψ₀·W | compresiune/încovoiere elemente |
| **SLU (STR) — uplift** | **1,0·G_fav + 1,5·W_s** (G cu coef. favorabil) | tracțiune în piloți (smulgere) |
| **EQU (echilibru)** | **0,9·G_stab + 1,5·W_dest** | răsturnare/smulgere fundație |
| **Seism** | G + ψ₂·S ± E | ancoraj PT, stâlpi |
| **SLS** | G + S + ψ₀·W (caracteristică) | săgeți, deplasări |

> La verificarea la smulgere, greutatea proprie se ia cu **coeficient favorabil (γ_G,inf = 1,0 sau 0,9)** — nu se poate „conta” pe greutate mai mare decât cea reală ca stabilizator; upliftul se majorează cu **γ_Q = 1,5**. Aceasta explică de ce marja testului de smulgere (§4.5) este **γ_test = 1,5 × R_proiect**.

---

## 8. EXEMPLU DE CALCUL — VERIFICAREA LA SMULGERE A UNUI PILOT (ILUSTRATIV)

> **AVERTISMENT: EXEMPLU ILUSTRATIV.** Calculul de mai jos are **caracter exemplificativ** și servește **exclusiv** înțelegerii criteriilor de acceptare a testelor de smulgere. Valorile (parametri geotehnici, presiuni de vânt, geometrie) sunt **ipoteze de exemplu** și **NU** înlocuiesc breviarul de calcul al proiectului, care se elaborează pe baza studiului geotehnic real și a amplasamentului. Rezultatul este valabil **pentru pilotul tip, independent de puterea parcului** (v. §1.4).

### 8.1. Date de intrare (exemplu)

- Amplasament (exemplu): v_b = 30 m/s (IMR 50 ani); teren categoria II; s_k = 2,0 kN/m²;
- Masă tip: L_masă = 24 m, L plan înclinat = 4,30 m, β = 25°, **9 piloți/masă la e = 3,0 m**;
- Suprafață captatoare aferentă unui pilot (interax): A_pil = 4,30 m × 3,0 m = **12,9 m²**;
- Pilot: profil metalic tip U/C zincat, adâncime de fișare **L_f = 2,0 m**, „lățime de fișare” echivalentă b ≈ 0,20 m;
- Teren (exemplu): nisip prăfos, unghi de frecare φ = 30°, greutate volumică γ = 18 kN/m³, coeziune neglijabilă.

### 8.2. Acțiunea de smulgere (uplift) pe pilot

Presiunea dinamică de referință (exemplu, simplificat):
- q_b = 0,5 · ρ · v_b² = 0,5 · 1,25 · 30² = **562,5 N/m² ≈ 0,56 kN/m²**;
- presiunea de vârf (cu factor de expunere c_e(z) ≈ 2,0 la înălțime mică): q_p ≈ 2,0 · 0,56 ≈ **1,12 kN/m²**;
- coeficient de presiune netă la sucțiune pe panou (exemplu, zonă curentă, acoperitor): **c_net ≈ −1,3** (pe zonele de margine/colț ale câmpului poate ajunge −2,0…−2,5 → tratate separat cu piloți de margine ranforsați);
- presiune netă de smulgere: w_s = c_net · q_p = 1,3 · 1,12 ≈ **1,46 kN/m²**.

Forța de smulgere caracteristică pe pilot:
- **F_uplift,k = w_s · A_pil = 1,46 · 12,9 = 18,8 kN**.

Forța de smulgere de proiect (combinația EQU/uplift, γ_Q = 1,5):
- **F_uplift,d = 1,5 · 18,8 = 28,3 kN**.

Contribuția stabilizatoare a greutății (favorabilă, γ_G,inf = 0,9) — greutate aferentă pilotului (module + masă ~20 kg/m² · 12,9 m² + pilot ~ 0,5 kN):
- G_k ≈ (0,20 kN/m² · 12,9) + 0,5 ≈ 2,6 + 0,5 ≈ **3,1 kN** → G_d,fav = 0,9 · 3,1 ≈ **2,8 kN**.
- Tracțiunea netă de proiect transmisă pilotului: **N_t,d = F_uplift,d − G_d,fav = 28,3 − 2,8 ≈ 25,5 kN**.

### 8.3. Rezistența la smulgere a pilotului (frecare laterală — exemplu)

Rezistența la smulgere se dezvoltă prin **frecare laterală** pe suprafața pilotului îngropat (metodă simplificată, nisip):
- Presiunea verticală medie pe fișă: σ_v,med = γ · L_f / 2 = 18 · 2,0 / 2 = **18 kN/m²**;
- Presiunea orizontală (coef. împingere K ≈ 1,0 pentru pilot înfipt, acoperitor K = 0,8): σ_h = K · σ_v,med = 0,8 · 18 = **14,4 kN/m²**;
- Frecarea unitară laterală: τ = σ_h · tan(δ), cu δ = 2/3·φ = 20° → tan δ = 0,364 → **τ = 14,4 · 0,364 = 5,24 kN/m²**;
- Perimetrul de fișare al profilului (exemplu profil U): u ≈ 0,60 m; suprafața laterală: A_lat = u · L_f = 0,60 · 2,0 = **1,20 m²**;
- **Rezistența caracteristică la smulgere: R_s,k = τ · A_lat = 5,24 · 1,20 = 6,3 kN**.

Rezistența de proiect (Eurocod 7 / NP 123, coef. parțial γ_s,t ≈ 1,4 pentru frecare la tracțiune, DA1/DA2 după NA):
- **R_s,d = R_s,k / γ_s,t = 6,3 / 1,4 = 4,5 kN**.

### 8.4. Verificare și concluzie a exemplului

- Condiție: **N_t,d ≤ R_s,d** → 25,5 kN ≤ 4,5 kN → **NU se verifică** cu L_f = 2,0 m în acest teren de exemplu.
- **Concluzie de proiectare:** pilotul de 2,0 m cu frecare laterală simplă **NU** preia upliftul; sunt necesare, alternativ/combinat: **(a)** mărirea adâncimii de fișare (R_s crește ~pătratic cu L_f prin σ_v și liniar prin A_lat → la L_f ≈ 4,5–5,0 m R_s,d ajunge ~25 kN), **(b)** profil cu perimetru mai mare / vârf lărgit, **(c)** șurub elicoidal (Tip C, capacitate la smulgere mult mai mare prin elice), sau **(d)** bloc de beton (Tip B, greutate proprie). Alegerea se face pe geotehnie + testul de smulgere.
- **Criteriul testului de smulgere (§4.5) rezultat din acest exemplu:** sarcina de probă = γ_test · R_proiect = 1,5 · N_t,d(neechilibrat de G) sau, practic, **R_test = 1,5 × F_uplift,k ≈ 1,5 × 18,8 = 28,2 kN**, la care **δ ≤ 10–15 mm** și **δ_rem ≤ 4 mm**. Pilotul care nu susține 28 kN cu deplasare sub prag este **respins** și se aplică soluțiile (a)–(d).

> **Lecția exemplului pentru execuție:** confirmă de ce **adâncimea de fișare din proiect este intangibilă** și de ce **testul de smulgere este obligatoriu** — o diferență de teren sau o fișare insuficientă transformă un pilot „aparent bătut” într-un ancoraj insuficient, invizibil fără test. Numărul de piloți și de teste **scalează cu puterea** (§1.4), dar **criteriul pe pilot rămâne același** la orice putere.

---

## 9. RECEPȚIA PE FAZE ȘI RECEPȚIA LA TERMINAREA LUCRĂRILOR

### 9.1. Faze determinante (FTP) — puncte de control cu convocare

Programul de control (avizat ISC) include, la minim, următoarele FTP pentru rezistență:

| Nr. | Fază determinantă | Se verifică | Documente |
|---|---|---|---|
| 1 | Trasarea generală + predare amplasament | poziții axe, reperi Stereo 70 | PV trasare |
| 2 | Natura terenului de fundare | strat portant vs. geotehnie | PV fază + geotehnician |
| 3 | **Teste de smulgere preliminare** (piloți probă) | capacitate/adâncime/K_t calibrat | buletine + PV fază |
| 4 | Armare + piese înglobate fundații PT (înainte betonare) | armare, acoperire, buloane, poziție | PV lucrări ascunse |
| 5 | **Teste de smulgere de control** (producție) | ≥ 0,5 %, prag min. 10/parc | buletine + PV fază |
| 6 | Montaj structuri metalice (geometrie, cupluri, zincare) | toleranțe, cupluri, reparații zinc; verificare masă/poziție balast Tip D | PV recepție calitativă |
| 7 | **Probe funcționale trackere (S2/S3)** | calibrare unghiuri, urmărire, backtracking, **STOW** | protocol probe + PV |
| 8 | Montaj module (cleme, cupluri, rosturi, echipotențializare) | poziție cleme, cupluri, continuitate pământare | PV recepție calitativă |
| 9 | Recepția rezistență la terminarea lucrărilor | conformitate globală | PV recepție |

### 9.2. Recepția structurilor metalice (S1/S2/S3) și a modulelor

Se verifică la recepție: certificatele materialelor și zincării; toleranțele geometrice de montaj (§2.5.1); cuplurile de strângere (registru + verificare eșantion cu cheie dinamometrică etalonată); integritatea zincării (fără zone neacoperite neremediate); rapoartele de sudură/NDT (unde e cazul); refacerea protecției pe zonele tăiate/sudate.

**Specific trackere (S2/S3):** alinierea axei/coaxialitatea lagărelor, verticalitatea pilonului (S3), **protocolul de probe funcționale** (P1–P8) cu verdict CONFORM — inclusiv calibrarea unghiurilor (≤ ± 1°), urmărirea, backtracking și **STOW** (critic structural, §2.9.4); concordanța pragului de vânt de stow cu proiectul.

**Specific module:** datele de recepție (§2.11 — masă, arie, **clasă de încărcare mecanică** ≥ presiunea de proiect); schema de clemare validată de producător; poziția clemelor, cuplurile, rosturile de dilatație; **continuitatea de echipotențializare** a ramelor (măsurată).

### 9.3. Recepția fundațiilor (piloți / șuruburi / balast / micropiloți / radiere PT)

Se verifică: registrul de piloți/șuruburi/micropiloți (adâncime, refuz/cuplu instalare, verticalitate, cotă, volum injectat la micropiloți); **buletinele testelor de smulgere** cu verdict CONFORM (toate testele de control trecute; neconformitățile remediate și retestate); pentru **balast (Tip D)** — cântărirea/măsurarea eșantion a blocurilor (masă ± 5 %), verificarea patului/geotextilului și a verificării la răsturnare/alunecare; rezultatele betoanelor la 28 zile (radiere PT/blocuri/dale) conforme; PV de fază determinantă pentru teren și armare.

### 9.4. Documente de predat la recepție (carte tehnică — partea de rezistență)

- Proiect PTh + DE „as-built” (cu modificările de execuție consemnate);
- Certificate materiale (oțel, zinc, beton, oțel-beton, elemente asamblare) + registrul de recepție;
- Registrul de piloți/șuruburi/micropiloți + buletine teste de smulgere (preliminare + control) + curbe F–δ; pentru balast — fișe masă/poziție blocuri + verificare stabilitate;
- **Protocoalele de probe funcționale trackere** (P1–P8) + fișe calibrare unghiuri + concordanță prag stow;
- Fișele de recepție module (masă, arie, clasă încărcare mecanică, flash-test) + registru echipotențializare rame;
- Rezultate încercări beton (28 zile) + bonuri livrare + rețete aprobate;
- Rapoarte control sudură (VT + NDT) + WPS/WPQR + certificate sudori (unde e cazul);
- Buletine zincare (grosimi strat);
- Procese-verbale: trasare, faze determinante, lucrări ascunse, recepții calitative;
- Referatul RTE și al proiectantului privind conformitatea execuției cu proiectul.

### 9.5. Criterii generale de respingere (rezumat)

Se **resping** și se remediază obligatoriu, înainte de recepție:
- orice pilot/șurub/micropilot care **nu trece testul de smulgere** la R_test = 1,5·R_proiect (sau depășește δ admisibil);
- piloți sub adâncimea minimă de fișare / deviați peste toleranță;
- **blocuri de balast subdimensionate/subcântărite** (masă < proiect) sau așezate fără patul/geotextilul prescris;
- **trackere care nu trec probele funcționale** — în special **STOW** (P5–P8) și calibrarea unghiurilor (eroare > ± 1°);
- **module** cu clasă de încărcare mecanică sub presiunea de proiect, sau clemate în afara schemei validate de producător; echipotențializare fără continuitate;
- betoane sub clasa comandată (fără evaluare de proiectant favorabilă);
- suduri sub nivelul de calitate cerut (neremediate);
- zincare sub grosimea minimă (neremediată);
- toleranțe geometrice depășite fără acceptare/recalcul de proiectant;
- lipsa certificatelor/trasabilității materialelor.

---

## 10. MĂSURI DE SĂNĂTATE ȘI SECURITATE SPECIFICE STRUCTURII

Fără a se substitui planului SSM al șantierului (HG 300/2006), execuția structurilor/fundațiilor FV impune:
- lucrul cu utilaje de batere/vibrare/înșurubare — zone de securitate, semnalizare, personal instruit;
- manipularea profilelor zincate lungi — dispozitive de ridicare adecvate, chingi textile;
- testele de smulgere — cadru de reacțiune verificat, zonă delimitată (risc de proiectare la cedare bruscă a ancorajului sub sarcină);
- lucrul lângă instalații electrice (după energizare parțială) — coordonare cu specialitatea electrică, LOTO;
- betonare — protecția muncii la manipularea betonului/cofrajelor.

---

## 11. DISPOZIȚII FINALE

- Orice **neconcordanță** între prezentul caiet, planșe și breviar se rezolvă prin **dispoziție de șantier** emisă de proiectant, consemnată în cartea tehnică;
- **Modificările de soluție** (schimbarea tipului de fundare pe o zonă, adâncimi, mărci) se fac **numai** cu acordul scris al proiectantului de rezistență și, unde e cazul, al verificatorului atestat (cerința A1/A2);
- Prezentul caiet este **parametric**: pentru orice putere P_DC, elementele unitare (masa tip, pilotul tip, fundația tip) și criteriile de acceptare rămân **identice**; se recalculează doar **numărul total** de elemente și **numărul de probe de control** conform §1.4;
- Toate valorile de dimensionare (secțiuni, adâncimi, clase, armări) prevalează din **proiectul de rezistență specific amplasamentului**, fundamentat pe **studiul geotehnic (NP 074/2014)** și pe **testele de smulgere pe amplasament**.

---

*Caiet de sarcini — Structuri și fundații (faza PTh) — Parc fotovoltaic. Acoperă exhaustiv cei trei tipuri de suporți (fix S1, tracker 1 axă S2, tracker 2 axe S3) și cele cinci tipuri de fundare (piloți bătuți/vibrați A, blocuri beton B, șuruburi elicoidale C, balast/contragreutăți D, micropiloți E), montajul modulelor și probele de recepție. Document parametric în raport cu puterea instalată (P = 2 MWp folosit exclusiv ca exemplu de cuantificare). Cerința fundamentală A — Rezistență mecanică și stabilitate (Legea 10/1995). A se corela obligatoriu cu memoriul/breviarul de rezistență, planșele PTh/DE și studiul geotehnic al amplasamentului.*
