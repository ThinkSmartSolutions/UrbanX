# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Locuință individuală izolată P+1E (zidărie confinată) — proiect Cătămărăști

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

### PTh-I.1.1 Ce aduce nou faza PTh față de DTAC

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 anexa 8 și Legii nr. 169/2026 — CATUC, art. 264) pentru memoriul de instalații al **locuinței individuale unifamiliale cu regim de înălțime P+1E**, elaborat pentru ipoteza funcțională și dimensionarea preliminară deja stabilite în DTAC (`instalatii.md`): familie de referință de **5 persoane**, suprafață utilă de calcul **Su ≈ 150 mp**, arie construită desfășurată **Acd ≈ 180 mp**, 13 obiecte sanitare, 3 dormitoare, 2 grupuri sanitare complete + 1 GS de serviciu, sursă termică **pompă de căldură aer-apă 10…12 kW** cu distribuție mixtă (pardoseală radiantă la parter, radiatoare la etaj), **VMC dublu flux cu recuperare de căldură**, branșament electric trifazat cu **putere aprobată ≈ 15 kW** și instalație fotovoltaică de **~4,5…5 kWp**. Documentul de față **nu reia** breviarele de dimensionare preliminară din DTAC (debite globale, necesar termic global, bilanț electric global) — le detaliază, le duce la nivel de tronson/nod/element și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare nod-cu-nod, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, protocoale de punere în funcțiune (PIF) și Planul de Control al Calității (PCC).

Ipoteza funcțională se menține **identică** cu DTAC, inclusiv cele două variante alternative deja documentate acolo și reluate aici la nivel de execuție: **Varianta A** (rețele publice disponibile — apă, canalizare) și **Varianta B** (sursă/evacuare proprie — puț forat + hidrofor, respectiv microstație/fosă septică), precum și opțiunea de **instalație de gaze naturale** ca sursă alternativă/de rezervă la pompa de căldură (cap. 10 DTAC). Orice modificare a acestor ipoteze (schimbarea sursei termice, renunțarea la fotovoltaic, trecerea definitivă la varianta cu sursă proprie de apă) impune reluarea dimensionării de la faza PTh pentru capitolele afectate.

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, de principiu, bilanțuri globale | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate |
| Breviar hidraulic | debite globale, un singur nod critic (cel mai defavorabil) | calcul nod cu nod pe toate tronsoanele — apă rece/caldă, canalizare, pluvial, bucle pardoseală radiantă |
| Breviar termic | necesar global pe zone (Φ_înc ≈ 9,1 kW) | verificare pe fiecare buclă/radiator, dimensionare pompe de circulație, echilibrare hidraulică |
| Breviar electric | bilanț de puteri global (Pc ≈ 12,5 kW) | dimensionare completă pe fiecare circuit, verificare cădere de tensiune, selectivitate, curent de scurtcircuit |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate (tabel cap. 16 DTAC) | tabel complet presiune/durată/criteriu de admisie per instalație, cu metodă de verificare |
| Montaj | principii generale (cap. 15 DTAC) | tehnologie, succesiune, susțineri, izolații, treceri, interfață cu arhitectura (detaliile D01…D16) |
| PIF | menționată (cap. 16 DTAC) | protocoale de echilibrare, reglaj, antilegionella, configurare pompă de căldură, PIF fotovoltaic |
| Calitate | — | Plan de Control al Calității + puncte de verificare pe lucrări ascunse (PVLA) explicite |
| Iluminat | niveluri globale + un exemplu de calcul (cap. 8 DTAC) | calcul complet metoda flux luminos pe fiecare cameră/zonă |
| Coordonare arhitectură-structură | principii generale (cap. 15 DTAC) | breviar explicit de goluri de trecere, cu poziție și dimensiune, corelat cu detaliile D01…D16 (`arhitectura-pth.md`) |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC: **SR EN 806-4** (montaj și probe la instalațiile interioare de apă), **SR EN 12056-2** (verificare pe tronson a canalizării), **SR EN 1264-1…4** (proiectarea și execuția pardoselii radiante — verificare higrotermică și mecanică a stratului suport), **Regulamentul UE 813/2013 și 811/2013** (etichetare energetică a pompelor de căldură și boilerelor — SCOP/eticheta energetică declarată de furnizor), **EN 14511** (condiții de testare COP pompă de căldură), **SR EN 60364-7-701** (verificarea zonelor 0/1/2 din băi la recepție), **NP 068/2002** (verificat deja la arhitectură — reluat aici doar pentru interfața cu iluminatul de pe scară), **Normativul C56** și **HG 273/1994** (verificarea calității și recepția lucrărilor de instalații), **Legea 10/1995** (cerințe fundamentale, verificare tehnică de proiect), **NTPEE (Ordinul ANRE 89/2018), cap. execuție și probe** (dacă se adoptă varianta cu gaze naturale), **SR EN 62305-3** (execuția prizei de pământ și verificarea continuității), **SR EN 14604** (verificare funcțională la recepție a detectoarelor de fum).

### PTh-I.1.2 Principii transversale aplicate în toate breviarele și detaliile de execuție

1. **Continuitatea traseelor** — orice traseu de instalație (coloană, buclă, circuit) se verifică nod cu nod, nu doar la debitul/puterea globală de vârf; abaterile locale (subdimensionare pe un tronson izolat, dezechilibru hidraulic pe o buclă) nu se compensează prin marja globală calculată în DTAC.
2. **Interfața cu structura și arhitectura precede execuția instalațiilor** — golurile de trecere prin elementele de beton armat (centuri, planșee, fundație) se stabilesc din faza de proiect și se toarnă odată cu structura (v. `structura.md`, `arhitectura-pth.md` D01…D03), nu se sparg ulterior.
3. **Interfața cu finisajele** — traseele electrice și sanitare încastrate se montează și se probează **înainte** de aplicarea tencuielilor finale și a șapelor (v. `arhitectura-pth.md` PTh-A.6.3), pentru a evita desfacerea unor finisaje deja executate.
4. **Simplitate proporțională cu scara clădirii** — spre deosebire de clădirile publice/industriale, breviarele de execuție de mai jos nu introduc redundanțe de tip 2+1 sau surse duble (cu excepția grupului de pompare la sursa proprie de apă și a sursei termice de rezervă/completare deja adoptate în DTAC), păstrând principiul de proiectare stabilit la DTAC cap. 1.5.
5. **Verificarea de coerență cu DTAC** — fiecare breviar de execuție (PTh) reconfirmă valoarea globală calculată în DTAC prin însumarea valorilor pe tronsoane/circuite/bucle, semnalând explicit orice diferență și motivul ei (v. Anexa B).

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema izometrică apă rece — de la branșament/puț la fiecare obiect sanitar

**Traseul principal (varianta A — rețea publică):**

```
Rețea publică ─► Teu de branșare + robinet de concesie ─► Branșament PEHD PE100 De 32
   ─► Cămin de apometru (contor Dn 20 + robinete izolare + clapetă de sens)
   ─► [booster domestic, dacă presiunea < 3,5 bar] ─► Distribuitor general (colector-distribuitor)
        ├─► Coloană AR-P (parter): bucătărie, GS serviciu, cămară, spălătorie/cameră tehnică
        └─► Coloană AR-E (etaj, PP-R/PEX De 25): baie principală + baie secundară
```

**Traseul principal (varianta B — puț propriu):**

```
Puț forat 40…60 m ─► Pompă submersibilă 3…4 mc/h / 45…60 mCA ─► Grup hidrofor (vas 100 l + presostat)
   ─► Lanț de tratare (filtru mecanic 50 μm → cărbune activ → dedurizator → [UV opțional])
   ─► Distribuitor general ─► (identic cu varianta A în aval)
```

**Tabelul coloanelor și racordurilor (ambele variante, în aval de distribuitorul general):**

| Coloană/tronson | Zonă deservită | ΣE tronson | q_c (l/s) | Ø adoptat | v (m/s) |
|---|---|---|---|---|---|
| Distribuitor → Coloană AR-E (etaj) | 2 băi complete (lavoare 2×0,30 + WC 2×0,50 + cadă 0,30 + duș 0,30) | 4,00 | 0,32 | PP-R/PEX De 25 | 0,90 |
| Coloană AR-E → racord baie principală | lavoar + WC + cadă | 1,10 | 0,17 | PP-R/PEX De 20 | 0,68 |
| Coloană AR-E → racord baie etaj/secundară | lavoar + WC + duș | 1,10 | 0,17 | PP-R/PEX De 20 | 0,68 |
| Distribuitor → Coloană AR-P (bucătărie, GS, cămară, spălătorie) | chiuvetă (0,50) + WC GS (0,50) + lavoar GS (0,30) + MS rufe (1,00) + MS vase (0,80) + robinet serviciu (1,00) | 4,10 | 0,32 | PP-R/PEX De 25 | 0,90 |
| Racord robinet exterior grădină | robinet cu furtun | 1,00 | 0,15 | PP-R/PEX De 20 | 0,60 |

**Verificare de coerență**: debitul cumulat pe cele două coloane principale (AR-E + AR-P, ΣE = 8,10) recalculat cu relația I9/SR 1478 — qc = 0,15×√8,10+0,004×8,10 = 0,15×2,846+0,032 = 0,427+0,032 = **0,46 l/s**, valoare coerentă cu debitul de calcul global adoptat în DTAC (qc = 0,50 l/s), diferența fiind acoperită de marja de proiectare deja semnalată la DTAC cap. 2.2 (rezervă pentru grup sanitar suplimentar/robinet de udare suplimentar).

### PTh-I.2.2 Schema izometrică apă caldă de consum (ACM) și recirculare

```
Boiler bivalent 200 l (serpentină solară + serpentină PDC/rezistență 2 kW)
   ─► Coloană ACC-E (PP-R/PEX De 20, cf. DTAC §2.6) ─► baie principală + baie etaj
   ─► Racord ACC-P ─► bucătărie (chiuvetă) + GS serviciu (dacă echipat cu apă caldă)
   ◄─ Buclă de recirculare (dacă distanța la punctul cel mai îndepărtat > 8 m) ─ pompă de recirculare mică (0,05…0,10 l/s, H ≈ 1…2 mCA), comandă pe temporizator/prezență
```

Traseul serpentinei solare (tur/retur) leagă boilerul de cele **2 panouri solare termice** montate pe versantul de acoperiș cu expunere favorabilă (v. DTAC §2.4 și `arhitectura-pth.md` cap. de montaj șarpantă D05/D06 pentru coordonarea cu structura acoperișului): conductă de cupru izolată Ø18…22 mm, cu vas de expansiune dedicat circuitului solar (glicol, ~18…25 litri, funcție de lungimea traseului și volumul serpentinei) și grup de pompare solar cu regulator diferențial de temperatură (pornire pompă la ΔT panou-boiler ≥ 6…8 K, oprire la ΔT ≤ 2…3 K).

### PTh-I.2.3 Schema canalizării menajere

```
Coloană verticală PP fonoabsorbant Dn 110 (etaj: baie principală + baie secundară)
   ─► aerisire peste acoperiș (sau valvă de aerisire admisă la case joase, I9)
   ─► continuare la parter ─► colector orizontal Dn 110, panta 2%
        ├─► racord GS serviciu (Dn 50/75)
        ├─► racord bucătărie (Dn 50)
        ├─► racord spălătorie/cameră tehnică — MS rufe + MS vase + sifon pardoseală (Dn 50…75)
        └─► piese de curățire la bază + la fiecare schimbare de direcție (interval ≤ 10…12 m)
   ─► racord Dn 160 la rețeaua publică (varianta A) sau la instalația proprie de epurare (varianta B)
```

### PTh-I.2.4 Schema canalizării pluviale

```
Jgheaburi semicirculare Dn 125 (ambele versante) ─► 2…3 burlane Dn 90…100 (cu sorb parafrunze)
   ─► conductă PVC Dn 110, pantă ≥1% ─► rezervor de acumulare pluvială 2.000…3.000 l
        ├─► pompă submersibilă mică ─► udare grădină/spălare curte
        └─► preaplin ─► puț absorbant sau rigolă de suprafață (funcție de studiul geotehnic)
```

### PTh-I.2.5 Schema instalației termice — sursă, distribuție, terminale

```
Pompă de căldură aer-apă 10…12 kW (unitate exterioară, soclu antivibrant, curte)
   ─► Puffer/vas tampon 100…200 l (interior, spălătorie/cameră tehnică)
        ├─► Boiler bivalent 200 l (serpentină PDC, prioritate ACM programabilă)
        ├─► Grup de amestec 3 căi (limitare tur 35 °C) + pompă turație variabilă
        │      ─► Colector cu debitmetre (5 bucle pardoseală radiantă, parter, cf. DTAC §5.6)
        └─► Circuit radiatoare (regim 45/40 °C) ─► 3 radiatoare cu robinete termostatice (etaj)
   [Back-up]: rezistență electrică 2 kW integrată puffer/boiler, SAU centrală în condensație 24 kW
   [Rezervă]: vas de expansiune 12…18 litri pe circuitul principal
```

**Numerotarea buclelor de pardoseală radiantă (parter, 5 bucle, cf. DTAC §5.6, suprafață totală radiantă ≈75 mp):**

| Buclă | Zonă deservită | Suprafață (mp) | Lungime buclă (m) | Debit unitar (l/s) |
|---|---|---|---|---|
| B1 | Living — zonă canapea/perete vitrat | 16 | ≈107 | 0,013 |
| B2 | Living — zonă acces/circulație | 14 | ≈93 | 0,011 |
| B3 | Bucătărie | 15 | ≈100 | 0,012 |
| B4 | Hol parter + vestibul | 15 | ≈100 | 0,012 |
| B5 | GS parter + rezervă (cămară/spălătorie, zonă adiacentă) | 15 | ≈100 | 0,012 |
| **TOTAL** | | **75** | — | **≈0,060 (216 l/h)** |

### PTh-I.2.6 Schema VMC dublu flux — trasee introducere/extracție

```
Priză aer proaspăt (exterior, protejată de intemperii) ─► Unitate VMC (pod/debara, cu atenuator de zgomot)
   ├─► Introducere Ø160 magistrală ─► derivații Ø75…90 ─► living, dormitor matrimonial, dormitor copil 1/2
   └─► Extracție Ø75…90 ─► bucătărie (grilă dedicată, independent de hotă), băi (2), GS parter
        ─► recuperator de căldură (η ≥ 85%) ─► evacuare aer viciat la exterior
[Local, independent de VMC]: Hotă bucătărie 300…600 mc/h ─► refulare directă exterior, clapetă antiretur
[Local]: extracție punctuală GS fără fereastră, 30…90 mc/h, comandă pe întrerupător/senzor umiditate
```

### PTh-I.2.7 Schema monofilară — tablou electric general și circuite

```
BMPT (bloc măsură+protecție trifazat, contor bidirecțional) ─► Coloană 4×10 mm² Cu, L≈15 m
   ─► Tablou electric general (3P+N, întrerupător general 40 A, SPD tip 2)
        ├─► Iluminat interior+exterior (RCD 30 mA) ................. 3×1,5 mm², MCB C10
        ├─► Prize uz general, 3 circuite distincte (RCD 30 mA) ..... 3×2,5 mm², MCB C16
        ├─► Bucătărie — plită inducție trifazată (RCD 30 mA) ....... 5×6 mm², MCB C32
        ├─► Cuptor electric (RCD 30 mA) ............................ 3×2,5 mm², MCB C16
        ├─► Pompă de căldură, circuit dedicat trifazat (RCD 30 mA) . 5×4 mm², MCB C20
        ├─► Boiler/rezistență electrică backup (RCD 30 mA) ......... 3×2,5 mm², MCB C16
        ├─► VMC, circuit dedicat (RCD 30 mA) ........................ 3×1,5 mm², MCB C10
        ├─► Mașină spălat rufe / mașină spălat vase (RCD 30 mA, fiecare) 3×2,5 mm², MCB C16
        ├─► Circuite exterior IP44/65 — iluminat + priză grădină (RCD 30 mA) 3×2,5 mm², MCB C16
        ├─► Priză EV-ready, rezervă trifazată (RCD tip A/B) ......... 5×6 mm², MCB C32
        ├─► Circuit fotovoltaic (invertor bidirecțional) ............ conform proiect FV, MCB dedicat AC + SPD
        └─► Rezervă (minimum 2 module libere, cf. DTAC §1.5) ........ —
```

### PTh-I.2.8 Schema instalației de gaze naturale (variantă alternativă, condiționată de disponibilitatea rețelei)

```
Rețea de distribuție stradală ─► Firidă branșament (regulator presiune → 50 mbar) ─► Contor G4 (6 mc/h)
   ─► Coloană Dn 20…25 (oțel/cupru) ─► Robinet general
        ├─► Centrală termică în condensație 24 kW (cameră etanșă C13/C33) — sursă backup/alternativă la PDC
        └─► Plită/aragaz 8 kW (dacă gătitul e pe gaz)
   [Siguranță]: detector CH₄ (montaj sus) + electrovalvă de siguranță + robinete manuale la fiecare aparat
```

### PTh-I.2.9 Schema curenților slabi

```
Rack tehnic mic (patch-panel + switch + router), dulap/nișă hol
   ├─► Cablare Cat.6/6A ─► prize RJ45 duble: living, birou/studiu, fiecare dormitor
   ├─► Wi-Fi 6 — punct central + [opțional] punct suplimentar etaj
   ├─► Coaxial RG6 (TV) ─► living, dormitoare
   ├─► Videointerfon: post exterior (poartă) ↔ post(uri) interior(oare) (bucătărie/living) + comandă poartă/garaj
   └─► Alarmă antiefracție: centrală + PIR (circulații parter) + contacte magnetice (uși/ferestre la sol)
        ─► sirenă int./ext. + comunicator GSM/IP (aplicație mobilă / firmă de monitorizare, opțional)
```

### PTh-I.2.10 Schema instalației fotovoltaice

```
Module FV (~10…12 buc. × 400…450 Wp, ≈4,5…5 kWp) ─► cutie conexiuni DC (siguranțe + SPD DC)
   ─► Invertor hibrid 5 kW ─► [opțional: baterie de stocare 5…10 kWh]
   ─► Tablou general AC (protecție anti-islanding + contorizare producție)
   ─► Tablou electric general (racord prosumator, contor bidirecțional)
```

### PTh-I.2.11 Schema priză de pământ, echipotențializare și protecție la supratensiuni

```
Priză de pământ de fundație — platbandă OL-Zn 40×4 mm, în talpa de fundație (D01, arhitectura-pth)
   [+ electrozi verticali, dacă R_p > 4 Ω la măsurătoare]
   ─► Bară de egalizare a potențialelor (BEP), lângă tabloul electric general
        ├─► PE instalație electrică
        ├─► conducte metalice (apă; gaz — prin flanșă izolantă)
        └─► echipotențializare suplimentară băi (cadă/duș metalice, țevi, elemente accesibile zone 0/1/2)
   [SPD tip 2] la tabloul electric general — protecție supratensiuni induse (fără LPS dedicat, cf. DTAC §9.2)
```

### PTh-I.2.12 Schema lanțului de tratare a apei (varianta B — sursă proprie)

```
Pompă submersibilă ─► Hidrofor (vas 100 l) ─► Filtru mecanic 50 μm ─► Filtru cărbune activ
   ─► Dedurizator (schimb ionic, regenerare cu sare) ─► [Stație UV, opțional] ─► Distribuitor general
[Fiecare treaptă]: manometru Δp (colmatare) + by-pass pentru izolare individuală la service
```

---

## PTh-I.3 Breviar complet de calcul (execuție, nod-cu-nod)

### PTh-I.3.1 Calcul hidraulic apă rece — verificare pe tronsonul cel mai defavorabil

Traseul cel mai lung și mai defavorabil hidraulic este cel de la branșament/distribuitor la bateria de duș de la etaj (cf. DTAC §2.5, unde s-a stabilit H_nec ≈ 35 mCA ≈ 3,5 bar). Breviarul PTh detaliază pierderile pe fiecare tronson al acestui traseu:

| Tronson | L (m) | Q (l/s) | Ø adoptat | v (m/s) | Δp liniar (mCA) | Δp local (+30%, coturi/robinete) |
|---|---|---|---|---|---|---|
| Branșament → cămin apometru | 8 | 0,50 | PEHD 32 (De) | 1,02 | 0,42 | 0,55 |
| Cămin → distribuitor general | 6 | 0,50 | PP-R 32 | 0,95 | 0,30 | 0,39 |
| Distribuitor → coloană AR-E | 4 (+3,0 m cotă etaj) | 0,32 | PP-R/PEX 25 | 0,90 | 0,18 | 0,23 |
| Coloană AR-E → racord baie etaj | 5 | 0,17 | PP-R/PEX 20 | 0,68 | 0,22 | 0,29 |
| Racord → baterie duș | 2 | 0,10 | PP-R/PEX 16 | 0,55 | 0,10 | 0,13 |
| **Total pierderi traseu** (fără cotă geodezică) | | | | | | **≈1,59 mCA** |

Pierderea totală pe traseu (≈1,59 mCA ≈ 0,16 bar) confirmă marja amplă folosită la DTAC §2.5 (H_pierderi adoptat acoperitor 4,0 mCA), diferența fiind rezerva pentru pierderi suplimentare pe traseele reale (coturi neplanificate, robinete de izolare pe fiecare coloană, filtrul de la intrare) confirmate la shop-drawing.

### PTh-I.3.2 Calcul hidraulic apă caldă — verificare buclă recirculare

Reluând breviarul DTAC §2.6 (coloană ACM De 20, v=0,73 m/s, h_f=0,95 mCA pe traseul tur), se detaliază bucla completă de recirculare (dacă distanța de la boiler la punctul cel mai îndepărtat depășește 8 m, cf. DTAC §2.4):

| Tronson buclă recirculare | L (m) | Q (l/s) | Ø | v (m/s) | Δp (mCA) |
|---|---|---|---|---|---|
| Boiler → punct de retur cel mai îndepărtat (tur, deja calculat DTAC §2.6) | 25 | 0,23 | PP-R/PEX 20 | 0,73 | 0,95 |
| Retur recirculare (De 16, debit redus 0,05…0,10 l/s) | 25 | 0,08 | PP-R/PEX 16 | 0,40 | ≈0,35 |
| **Total buclă închisă** | 50 | | | | **≈1,30 mCA** |

Pompa de recirculare se alege pentru Q ≈ 0,08 l/s (≈290 l/h) și H ≈ 1,5…2,0 mCA (cu marjă pentru robinetul de reglaj/echilibrare de pe retur), clasă energetică A, comandată pe temporizator (funcționare orară limitată la intervalele de consum probabil) sau pe termostat de retur (pornire doar când temperatura returului scade sub un prag, de exemplu 40 °C).

### PTh-I.3.3 Calcul hidraulic canalizare — verificare pe fiecare coloană și pe colectorul orizontal

Verificare grad de umplere h/D și viteză de autocurățare (v ≥ 0,7 m/s), conform SR EN 12056-2, pe fiecare tronson identificat la PTh-I.2.3:

| Tronson | ΣDU | Q_ww (l/s) | Ø adoptat | Capacitate la h/D=0,33 (l/s) | Verificare |
|---|---|---|---|---|---|
| Coloană verticală etaj (2 băi: 2×WC+2×lavoar+cadă+duș) | 2,0+2,0+0,5+0,5+0,8+0,6 = 6,4 | 0,5×√6,4 = 1,26 | PP fonoabsorbant Dn 110 | ≈2,5…4,0 | conform, marjă amplă |
| Racord GS serviciu (WC+lavoar) | 2,0+0,5 = 2,5 | 0,79 | Dn 75…110 | ≈1,5 | conform |
| Racord bucătărie (chiuvetă) | 0,8 | 0,45 | Dn 50 | ≈0,8 | conform, la limită — verificat cu MS vase pe același racord (ΣDU 1,6, Q=0,63 l/s), se adoptă Dn 75 pentru marjă |
| Racord spălătorie (MS rufe + sifon pardoseală) | 0,8+0,8 = 1,6 | 0,63 | Dn 75 | ≈1,2 | conform |
| Colector orizontal principal (toate tronsoanele însumate, ΣDU≈12,1) | 12,1 | 1,74 | Dn 110, pantă 2% | ≈2,5…3,5 (la 2% pantă) | conform, v≈0,9…1,0 m/s (autocurățire asigurată) |

Verificarea confirmă valoarea globală de la DTAC §3.2 (Q_ww ≈ 1,74 l/s, adoptat 1,8 l/s) și concluzia de dimensionare a coloanei Dn 110 cu marjă amplă (cap. DTAC §3.3).

### PTh-I.3.4 Calcul hidraulic pluvial — breviar pe fiecare versant și burlan

Reluând ipoteza DTAC §4.1 (i = 150 l/s·ha, ψ = 0,90, A totală ≈ 110 mp), repartiția pe cele două versante ale acoperișului (simetrice, ≈55 mp fiecare):

| Versant | A (mp) | Q_versant (l/s) | Nr. burlane | Q/burlan (l/s) | Ø burlan | Capacitate burlan Ø100 (l/s) |
|---|---|---|---|---|---|---|
| Versant 1 | 55 | 0,74 | 1…2 | 0,37…0,74 | Ø90…100 | ≈3…4 |
| Versant 2 | 55 | 0,74 | 1 | 0,74 | Ø100 | ≈3…4 |

Ambele configurații sunt confirmate acoperitoare (marjă de peste 4× față de debitul de calcul), coerent cu concluzia DTAC §4.3. Jgheaburile Dn 125 (capacitate 2,0…3,0 l/s la panta adoptată 0,3…0,5%) acoperă debitul cumulat pe fiecare versant (0,74 l/s) cu marjă suficientă pentru colmatare parțială cu frunze.

### PTh-I.3.5 Breviar hidraulic complet pe fiecare buclă de pardoseală radiantă

Extinderea calculului DTAC §5.6 (buclă-tip 100 m, q=43 kg/h) pe cele 5 bucle reale identificate la PTh-I.2.5, cu Δt=5K pe fiecare buclă (regim 35/30 °C):

| Buclă | Φ_buclă (W) | q_buclă (kg/h) | L buclă (m) | Δp buclă (mbar) | Presetare debitmetru (l/h) |
|---|---|---|---|---|---|
| B1 (Living A) | 960 (16 mp × 60 W/mp) | 41,3 | 107 | ≈165 | 41 |
| B2 (Living B) | 840 (14 mp × 60 W/mp) | 36,1 | 93 | ≈140 | 36 |
| B3 (Bucătărie) | 900 (15 mp × 60 W/mp) | 38,7 | 100 | ≈150 | 39 |
| B4 (Hol parter + vestibul) | 675 (15 mp × 45 W/mp, necesar redus zonă circulație) | 29,0 | 100 | ≈150 | 29 |
| B5 (GS parter + rezervă) | 1.125 (15 mp × 75 W/mp, necesar sporit zonă umedă) | 48,4 | 100 | ≈150 | 48 |
| **TOTAL parter radiant** | **4.500** | **≈193** | — | — | — |

Toate buclele se încadrează în lungimea maximă admisă (≤100…120 m) și în plaja de pierdere de sarcină uzuală pentru PEX 16×2 mm (150…200 mbar), confirmând concluzia DTAC §5.6. Fiecare buclă se echilibrează la colector prin debitmetrul cu presetare (valorile din ultima coloană), verificat la PIF (PTh-I.7.1). Pompa de circulație a grupului de amestec se alege pentru Q_total = ΣQ_bucle ≈ 193 kg/h ≈ 0,054 l/s (rotunjit la 0,06 l/s, coerent cu debitul global calculat la DTAC §5.6: 0,06 l/s) și H ≈ 2,5…3,0 mCA (cu marjă pentru robinetele de echilibrare de pe colector și pentru pierderea suplimentară a grupului de amestec pe 3 căi).

### PTh-I.3.6 Breviar de dimensionare a radiatoarelor de etaj cu presetare Kv

Extinderea tabelului DTAC §5.6 (necesar 900+700+650 W pentru cele 3 dormitoare) cu presetarea robinetelor termostatice, la regim de temperatură 45/40 °C (Δt=5K pe circuitul radiatoarelor):

| Cameră | Φ (W) | Debit necesar (kg/h) | Kv necesar (robinet termostatic) | Presetare (trepte) |
|---|---|---|---|---|
| Dormitor matrimonial | 900 | 154,6 | Kv ≈ 0,25…0,30 | treapta 3…4 (funcție de model) |
| Dormitor copil 1 | 700 | 120,3 | Kv ≈ 0,20…0,25 | treapta 2…3 |
| Dormitor copil 2 | 650 | 111,7 | Kv ≈ 0,20…0,25 | treapta 2…3 |
| **TOTAL circuit radiatoare** | **2.250** | **≈386,6** | — | — |

Debitul total pe circuitul de radiatoare (≈387 kg/h ≈ 0,107 l/s) se verifică la pompa de circulație dedicată sau la un al doilea grup de amestec (dacă circuitul de radiatoare funcționează la regim de temperatură diferit de pardoseală, cf. DTAC §5.4) — pierderea de sarcină pe traseul cel mai defavorabil (radiatorul cel mai îndepărtat de puffer, dormitor copil 2) se estimează la **Δp ≈ 250…350 mbar** (conductă PEX 16×2 mm de la puffer la etaj + robinete termostatice + coturi), valoare acoperită de pompa cu turație variabilă a grupului de amestec aferent circuitului de radiatoare. Presetarea Kv exactă se stabilește la execuție, funcție de modelul de robinet termostatic adoptat (fișa producătorului), tabelul de mai sus fiind un breviar orientativ de pre-dimensionare.

### PTh-I.3.7 Calcul electric complet — toate circuitele cu verificarea căderii de tensiune

Extinderea tabelului DTAC §7.4 cu lungimile orientative de traseu și căderea de tensiune pe fiecare circuit (limite admise I7: 3% pe iluminat, 5% pe forță, calculate de la tabloul electric general):

| Circuit | Secțiune (Cu) | I calc. (A) | L (m) | Δu (%) | Verificare |
|---|---|---|---|---|---|
| Iluminat general (interior) | 3×1,5 mm² | ≈3,9 (0,90 kW/230V) | 20 | 1,1 | conform (≤3%) |
| Iluminat exterior | 3×1,5 mm² | ≈1,0 | 25 | 0,4 | conform |
| Prize uz general, circuit 1 (living/hol) | 3×2,5 mm² | ≤16 | 18 | 1,3 | conform (≤5%) |
| Prize uz general, circuit 2 (dormitoare) | 3×2,5 mm² | ≤16 | 25 | 1,8 | conform |
| Prize uz general, circuit 3 (birou/studiu) | 3×2,5 mm² | ≤16 | 15 | 1,1 | conform |
| Bucătărie — plită inducție (trifazat) | 5×6 mm² | 15,2 (7 kW/√3·400·0,92) | 8 | 0,6 | conform |
| Cuptor electric | 3×2,5 mm² | ≤16 | 8 | 0,6 | conform |
| Pompă de căldură (trifazat, dedicat) | 5×4 mm² | 6,8 (v. DTAC §7.6) | 12 | 0,7 | conform |
| Boiler/rezistență electrică backup | 3×2,5 mm² | 8,7 (2 kW/230V) | 6 | 0,7 | conform |
| VMC (dedicat) | 3×1,5 mm² | ≈2,6 (0,6 kW/230V) | 22 | 1,0 | conform |
| Mașină spălat rufe | 3×2,5 mm² | ≤16 | 10 | 0,7 | conform |
| Mașină spălat vase | 3×2,5 mm² | ≤16 | 10 | 0,7 | conform |
| Circuite exterior IP44/65 | 3×2,5 mm² | ≤16 | 30 | 2,2 | conform |
| Priză EV-ready (trifazat, rezervă) | 5×6 mm² | ≤32 (rezervat) | 15 | 1,1 (la sarcină maximă ipotetică) | conform |
| Circuit fotovoltaic (invertor bidirecțional) | conform proiect FV | ≤22 (invertor 5 kW) | 8 | 0,8 | conform |

Toate circuitele se încadrează cu marjă în limitele I7 (3%/5%), confirmând dimensionarea aleasă la DTAC §7.4 pentru secțiunile de cablu; coloana de branșament (verificată deja la DTAC §7.5, Δu≈0,22%) rămâne, de asemenea, cu marjă amplă. Selectivitatea între întrerupătorul general (40 A) și disjunctoarele de circuit (10…32 A) se menține conform DTAC §7.6.

### PTh-I.3.8 Verificarea suplimentară a pornirii pompei de căldură (compresor invertor)

Spre deosebire de motoarele electrice clasice (pornire directă cu curent de 6…7× I_nominal, tratate la scara unei hale la PTh-I.3.12 din documentul similar de hală industrială), **pompele de căldură rezidențiale moderne utilizează compresoare cu variator de frecvență (inverter)**, la care pornirea este graduală (rampă de turație), fără vârf de curent semnificativ. Verificarea de la DTAC §7.6 (I_n ≈ 6,8 A/fază, protecție MCB C20 trifazat) rămâne valabilă, cu următoarea precizare de execuție: se solicită la achiziția echipamentului **fișa tehnică a curentului de pornire (LRA — Locked Rotor Amps sau curba de pornire a variatorului)**, pentru confirmarea faptului că protecția C20 (caracteristică de declanșare tip C, care admite un vârf tranzitoriu de până la 10× I_n pentru câteva ms) acoperă și eventualele vârfuri reziduale ale variatorului la pornirea la rece (temperatură exterioară foarte scăzută, ulei de compresor mai vâscos) — verificare de rutină la PIF (PTh-I.7.3), nu un calcul suplimentar de breviar.

### PTh-I.3.9 Breviar de dimensionare a rețelei de ventilare (VMC) pe fiecare gură

Extinderea calculului DTAC §6.4 (magistrală Ø160, 3,5 m/s) cu repartiția pe camere individuale, la debitul total de proiectare Q_VMC = 225 mc/h:

| Cameră/zonă | Tip | Debit unitar (mc/h) | Ø derivație | v (m/s) |
|---|---|---|---|---|
| Living | introducere | 45 | Ø90 | 2,0 |
| Dormitor matrimonial | introducere | 35 | Ø80 | 1,9 |
| Dormitor copil 1 | introducere | 30 | Ø75 | 1,9 |
| Dormitor copil 2 | introducere | 30 | Ø75 | 1,9 |
| Birou/studiu (rezervă) | introducere | 25 | Ø75 | 1,6 |
| **Total introducere** | | **165** | | |
| Bucătărie (extracție dedicată VMC, distinctă de hotă) | extracție | 45 | Ø90 | 2,0 |
| Baie principală | extracție | 40 | Ø80 | 2,2 |
| Baie etaj/secundară | extracție | 35 | Ø80 | 1,9 |
| GS parter | extracție | 25 | Ø75 | 1,6 |
| **Total extracție** | | **145** | | |

Notă: suma debitelor per-cameră (165 introducere / 145 extracție) nu este perfect simetrică — diferența se echilibrează prin infiltrația/transferul controlat pe sub ușile interioare (fantă de aerisire de 1…1,5 cm sub ușile dormitoarelor/băilor, soluție uzuală la case cu VMC) și prin reglajul fin al claperelor de la fiecare gură, în limita debitului total de proiectare al unității (200…250 mc/h). Reglajul final pe fiecare gură se realizează la PIF (PTh-I.7.2), cu anemometru/balometru, urmărind valorile din tabel ±15%.

### PTh-I.3.10 Breviar de verificare a căderii de presiune pe instalația de gaze (variantă alternativă)

Extinderea calculului DTAC §10.4 (traseu unic, contor→centrală, Δp≈20,9 Pa) cu tronsonul complet, dacă se adoptă și plita pe gaz:

| Tronson | L (m) | Q (mc/h) | Ø | v (m/s) | Δp (Pa) |
|---|---|---|---|---|---|
| Contor → derivație centrală/plită | 4 | 3,39 (total) | Cu Dn 25 | 2,15 | ≈12 |
| Derivație → centrală termică | 12 | 2,54 | Cu Dn 22 | 1,87 | ≈21 (deja calculat DTAC §10.4) |
| Derivație → plită bucătărie | 6 | 0,85 | Cu Dn 15 | 1,60 | ≈9 |
| **Total pe traseul cel mai defavorabil (centrală)** | | | | | **≈33 Pa ≈ 0,33 mbar** |

Valoare mult sub pragul admis (~1…2 mbar pe instalația interioară de utilizare, presiune joasă 50 mbar) → **conform**, confirmând concluzia DTAC §10.4.

### PTh-I.3.11 Breviar producție fotovoltaică lunară estimată

Distribuția lunară a producției anuale de ~5.600 kWh/an (DTAC §13.3), pe baza profilului tipic de radiație solară pentru zona climatică a amplasamentului (NE România), pe același model de fracții lunare folosit și la scara unei clădiri mai mari (coerent cu profilul climatic regional):

| Lună | Fracție din producția anuală | Producție estimată (kWh) |
|---|---|---|
| Ianuarie | 3,5% | 196 |
| Februarie | 5,0% | 280 |
| Martie | 8,0% | 448 |
| Aprilie | 10,5% | 588 |
| Mai | 12,0% | 672 |
| Iunie | 12,5% | 700 |
| Iulie | 13,0% | 728 |
| August | 12,0% | 672 |
| Septembrie | 9,5% | 532 |
| Octombrie | 6,5% | 364 |
| Noiembrie | 4,0% | 224 |
| Decembrie | 3,5% | 196 |
| **Total** | **100%** | **≈5.600** |

Valorile lunare sunt **orientative** (calibrate să însumeze exact producția anuală confirmată în DTAC), producția reală variind ±15…20% funcție de anul solar real — se confirmă prin monitorizarea portalului invertorului după PIF (PTh-I.7.4), conform aceleiași rezerve metodologice semnalate și la scara clădirilor mai mari.

### PTh-I.3.12 Recalcularea rezistenței prizei de pământ și a evaluării riscului de trăsnet

Reluarea verificării DTAC §9.1 (R_p ≤4Ω, estimat 2…4Ω pentru un contur de fundație L≈45…50 m) și §9.3 (Nd≈0,0055 desc./an, sub pragul Nc) — la faza PTh nu se introduc modificări de breviar, ci se stabilește **procedura de confirmare la execuție**: platbanda de impământare OL-Zn 40×4 mm se montează în talpa de fundație (v. D01, `arhitectura-pth.md` — talpă 0,80×0,80 m) și se sudează la armătura tălpii (4Ø14) la interax ≤2 m, pentru o priză combinată electrod-armătură care reduce practic rezistența de dispersie sub valoarea orientativă calculată (armătura de fundație contribuie suplimentar la disipare). **Măsurătoarea efectivă (metoda celor 3 puncte, 62%) se efectuează obligatoriu la recepție** (PTh-I.5.1), iar dacă rezultatul depășește 4Ω, se completează cu electrozi verticali suplimentari (țăruși OL-Zn/cupru, 1,5…2,0 m), legați în paralel — soluție deja prevăzută ca rezervă la DTAC §9.1.

### PTh-I.3.13 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

Coordonarea cu structura de rezistență (`structura.md`, zidărie confinată CR 6/2013) și cu detaliile de execuție ale arhitecturii (`arhitectura-pth.md`, D01…D16) impune un tabel explicit al golurilor de trecere, comunicat proiectantului de structură **înainte** de execuția centurilor/planșeelor (goluri prevăzute din fabricație, nu tăiate ulterior):

| Instalație | Element traversat | Poziție orientativă | Dimensiune gol | Referință detaliu arhitectură |
|---|---|---|---|---|
| Coloană canalizare (Dn 110) etaj→parter | Planșeu peste parter (h=14 cm, cf. D03) | ghenă sanitară, băi suprapuse parter-etaj | Ø 160…200 mm | D03 (centură-planșeu) |
| Coloane apă rece/caldă (De 25) | Planșeu peste parter | lângă coloana de canalizare, ghenă comună | Ø 80…100 mm (fascicul) | D03 |
| Tubulatură VMC (Ø75…160 mm) | Planșeu peste parter / plafon fals | trasee spre dormitoare, prin hol | Ø conform traseu, cu manșon | D03, D06 (ventilare pod) |
| Coloană electrică + curenți slabi | Planșeu peste parter | lângă tabloul electric (hol) | jgheab/tub 100×50 mm | D03 |
| Platbandă priză de pământ | Fundație (talpă 0,80×0,80 m) | contur perimetral, sudată la armătură | — (înglobată la turnare) | D01 |
| Coloană gaz (dacă e cazul, Dn 20…25) | Perete exterior (firidă → interior) | camera tehnică/spălătorie | Ø 50…75 mm, manșon etanș | D01, D16 (coș evacuare) |
| Cablu DC fotovoltaic (de la acoperiș la invertor) | Planșeu peste etaj / pod ventilat | traseu dedicat, coordonat cu D06 (ventilare pod) | tub protecție Ø25…32 mm | D06 |
| Coș/tubulatură evacuare centrală gaz (variantă) | Planșeu peste etaj + acoperiș | camera tehnică → ieșire prin șarpantă | conform fișă centrală, manșon termoizolant | D06, D16 |

Toate golurile prin elementele structurale portante (centuri, sâmburi) necesită **avizul explicit al inginerului structurist** înainte de execuție, conform principiului transversal PTh-I.1.2.2 și D03 (`arhitectura-pth.md`) — nu se admit găuriri neautorizate în șantier.

### PTh-I.3.14 Calcul orientativ al economiei din comanda inteligentă a iluminatului și instalațiilor

Extindere a estimării DTAC (cap. 8.3, 12.4) cu un calcul orientativ, pentru iluminatul interior (P ≈ 0,90 kW instalat, cf. DTAC §8.2):

- funcționare de bază (fără senzori, iluminat pornit manual, estimare 4…5 h/zi echivalent plin, 365 zile) = 0,90 kW × 4,5 h × 365 = **1.478 kWh/an**;
- cu senzori de prezență pe hol/casa scării/acces exterior + dimmere în living/dormitoare (reducere estimată 25…35% prin evitarea uitării aprinse și reglaj de intensitate) → consum estimat ≈ 1.478 × 0,70 ≈ **1.035 kWh/an**;
- **economie estimată ≈ 440 kWh/an (≈30%)**, valoare modestă în bilanțul energetic global al casei (comparativ cu economiile mari posibile la o hală cu iluminat highbay de mare putere), dar consistentă cu principiul nZEB de eficientizare pe toate componentele (DTAC §13.2).

Economia reală depinde de obiceiurile de utilizare ale familiei și se poate verifica după PIF prin contorizarea/monitorizarea de energie pe circuitul de iluminat (opțiune menționată la DTAC §7.3).

### PTh-I.3.15 Breviar de dimensionare a regenerării dedurizatorului (varianta B, sursă proprie)

Reluând lanțul de tratare a apei stabilit la DTAC §2.7 (filtru mecanic → cărbune activ → dedurizator → UV opțional), se detaliază la faza PTh ciclul de regenerare al dedurizatorului cu schimb ionic, pe baza consumului zilnic de apă stabilit la DTAC §2.2 (Q_zi,med ≈ 0,55 mc/zi) și a unei durități orientative de intrare (valoare tipică pentru apă subterană din zona de amplasament, **confirmată obligatoriu prin buletinul de analiză**, nu presupusă):

- duritate totală orientativă de intrare: **~15…25 °dH** (grade germane, valoare tipică pentru foraje de mică adâncime în zona continentală NE, de confirmat prin buletin);
- capacitate de schimb a rășinii (dedurizator rezidențial uzual, cilindru ~25…35 litri rășină): **~2.000…3.000 °dH·mc** între două regenerări;
- volum de apă tratabil între regenerări, la duritatea de intrare de 20 °dH: V_regenerare = Capacitate / Duritate = 2.500 / 20 = **≈125 mc**;
- interval orientativ între regenerări automate: t = V_regenerare / Q_zi,med = 125 / 0,55 ≈ **227 zile** (la consumul mediu al familiei de referință), rotunjit practic la un ciclu automat programat de **7…14 zile** (funcție de setarea contorului volumetric al dedurizatorului, care regenerează mai des, cu marjă de siguranță, decât intervalul teoretic maxim calculat mai sus, pentru a evita scăparea apei nededurizate în perioadele de vârf de consum).

**Consum de sare pentru regenerare**: orientativ 3…4 kg sare/regenerare pentru un dedurizator de această capacitate, rezultând un consum anual estimat de ordinul **~100…150 kg sare/an** la ciclul practic adoptat (7…14 zile) — valoare de confirmat cu fișa tehnică a echipamentului definitiv selectat, menționată aici ca reper pentru dimensionarea rezervorului de sare (uzual 25…50 litri, autonomie de câteva luni fără completare).

### PTh-I.3.16 Recalcularea vasului de expansiune pe baza volumelor reale ale buclelor și radiatoarelor

DTAC §5.5 a estimat volumul total de agent termic al instalației la V_inst ≈ 150 litri (sursă + puffer + distribuție), adoptând un vas de expansiune de 12…18 litri. Breviarul PTh detaliază compunerea acestui volum pe baza elementelor efectiv dimensionate la PTh-I.2.5/PTh-I.3.5/PTh-I.3.6:

| Component | Volum unitar | Cantitate | Volum total (l) |
|---|---|---|---|
| Puffer/vas tampon | 100…200 l | 1 | 150 (valoare medie adoptată) |
| Boiler — serpentină PDC (volum de agent, nu de ACM) | ~3…5 l | 1 | 4 |
| Cele 5 bucle pardoseală radiantă (PEX 16×2 mm, ~0,145 l/m) | 0,145 l/m × 500 m total (Σ lungimi PTh-I.2.5) | — | ≈73 |
| Circuit radiatoare (PEX 16×2 mm, traseu puffer→etaj→3 radiatoare, ~60 m) | 0,145 l/m × 60 m | — | ≈9 |
| Conducte de legătură PDC-puffer-grup de amestec | estimare | — | ≈10 |
| **TOTAL recalculat** | | | **≈246 litri** |

Valoarea recalculată (≈246 l) este superioară estimării globale acoperitoare din DTAC (150 l), diferența provenind din detalierea reală a lungimii celor 5 bucle de pardoseală (Σ≈500 m, cf. PTh-I.2.5) fapt necunoscut la faza DTAC (unde s-a lucrat cu o estimare generică). Recalcularea vasului de expansiune la ΔV = 246 × 0,0088 = **2,16 litri** (dilatare la 45 °C) și V_vas = 2,16 / 0,50 = **~4,3 litri** teoretic — **rămâne acoperit cu marjă amplă** de vasul de 12…18 litri deja adoptat la DTAC §5.5 (marjă de peste 3×), fără a fi necesară o modificare a echipamentului ales; recalcularea este semnalată aici doar ca verificare de coerență la faza de execuție, conform principiului transversal PTh-I.1.2.5.

### PTh-I.3.17 Breviar verificare debit de refolosire a rezervorului de acumulare pluvială

Extinderea calculului DTAC §4.4/§4.5 (rezervor 2.000…3.000 l, volum de retenție necesar ≈1,1 mc) cu un breviar orientativ al autonomiei de udare oferite de rezervor, util la execuție pentru dimensionarea pompei submersibile de udare:

- necesar orientativ de udare grădină (suprafață verde estimată ~200…300 mp, normă de udare ~3…5 l/mp/udare în sezonul cald, 2…3 udări/săptămână): V_udare/săptămână ≈ 250 mp × 4 l/mp × 2,5 udări ≈ **2.500 litri/săptămână**;
- volumul rezervorului adoptat (2.000…3.000 l) acoperă aproximativ **o săptămână de udare** din rezerva acumulată, cu completare naturală din precipitații (variabilă) sau, în lipsa ploii, din rețeaua de apă potabilă (robinet exterior grădină, DTAC §2.2, ca sursă de completare, nu ca sursă principală de udare);
- pompa submersibilă de udare se dimensionează la debitul unui furtun/aspersor uzual rezidențial, **~0,3…0,5 l/s (1,1…1,8 mc/h)**, cu presiune de refulare **~2,0…2,5 bar**, mult sub cerințele hidraulice ale instalației principale de apă (nu necesită breviar de rețea dedicat, fiind un consumator punctual pe furtun).

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Pompă de căldură aer-apă

| Parametru | Valoare |
|---|---|
| Putere calorică nominală (A7/W35) | 10…12 kW |
| COP nominal (EN 14511) | ≥ 4,0 |
| SCOP sezonier (Regulament UE 813/2013, climat mediu) | ≥ 3,3 |
| Regim de distribuție | 35/30 °C (pardoseală) / 45/40 °C (radiatoare) |
| Agent frigorific | R32 (GWP redus, cf. DTAC §13.7) |
| Funcționare | reversibilă (răcire pasivă/activă opțională vara) |
| Compresor | inverter (variator de frecvență, pornire graduală) |
| Alimentare | trifazat 400V, circuit dedicat 5×4 mm², MCB C20 |
| Amplasare unitate exterioară | soclu antivibrant, ≥3 m de ferestrele dormitoarelor (DTAC §14.1) |
| Nivel de putere acustică | 45…55 dB(A) la 1 m (mod silențios nocturn) |
| Etichetă energetică | conform Regulamentului UE 811/2013 (declarată de furnizor la achiziție) |

### PTh-I.4.2 Fișă tehnică — Boiler bivalent ACM

| Parametru | Valoare |
|---|---|
| Volum | 200 litri |
| Configurație | dublă serpentină (solar termic + PDC/rezistență) |
| Rezistență electrică integrată | 2 kW, backup |
| Ciclu antilegionella | automat, șoc termic 60 °C, săptămânal, ≥30 min |
| Izolație | poliuretan injectat, pierdere termică ≤2,0 kWh/24h |
| Presiune maximă de lucru | 6…10 bar (conform fișă producător) |
| Ancorare seismică | console + prezoane dimensionate la greutate plin (≈220 kg), cf. DTAC §14.2 |

### PTh-I.4.3 Fișă tehnică — Panouri solare termice

| Parametru | Valoare |
|---|---|
| Tip | plane, selective |
| Suprafață | 2 buc. × ~2,5 mp = 5 mp total |
| Orientare/înclinare | S/SE-SV, 30…35° |
| Randament optic | ≥ 0,75 (conform certificare Solar Keymark) |
| Fluid purtător | glicol-apă (protecție îngheț) |
| Vas expansiune circuit solar | 18…25 litri |
| Regulator | diferențial de temperatură (ΔT pornire 6…8K, oprire 2…3K) |
| Contribuție anuală la ACM | ≈60…70% (cf. DTAC §2.4) |

### PTh-I.4.4 Fișă tehnică — Unitate VMC dublu flux

| Parametru | Valoare |
|---|---|
| Debit nominal | 200…250 mc/h |
| Recuperator de căldură | contracurent (plăci), η ≥ 85% |
| Filtrare aer introdus | F7 (ePM1) |
| Filtrare aer evacuat | G4 |
| Bypass de vară | automat (free-cooling) |
| Protecție antiîngheț recuperator | rezistență electrică mică / bypass parțial |
| Alimentare | monofazat, circuit dedicat 3×1,5 mm², MCB C10 |
| Nivel de zgomot (la unitate) | conform amplasare în spațiu tehnic izolat (DTAC §6.4) |
| Silențiatoare | montate imediat după unitate, pe magistrala principală |

### PTh-I.4.5 Fișă tehnică — Puffer/vas tampon

| Parametru | Valoare |
|---|---|
| Volum | 100…200 litri |
| Rol | decuplaj hidraulic pompă de căldură — circuite de distribuție |
| Presiune maximă | conform fișă producător (uzual 3 bar) |
| Izolație | poliuretan/vată minerală, minim 50 mm |
| Ancorare | console + prezoane, cf. DTAC §14.2 |

### PTh-I.4.6 Fișă tehnică — Grup de amestec pe 3 căi + pompă de circulație

| Parametru | Valoare |
|---|---|
| Rol | limitare temperatură tur buclă pardoseală la 35 °C |
| Pompă | turație variabilă, clasă EEI ≤ 0,20 (Regulament ErP) |
| Debit de proiectare | ≈216 l/h (cf. PTh-I.3.5) |
| Înălțime de pompare | 2,5…3,0 mCA |
| Reglaj climatic | sondă exterioară + curbă de încălzire |

### PTh-I.4.7 Fișă tehnică — Colector cu debitmetre (pardoseală radiantă)

| Parametru | Valoare |
|---|---|
| Nr. circuite | 5 (cf. PTh-I.2.5) |
| Debitmetre | cu presetare pe fiecare circuit (v. tabel PTh-I.3.5) |
| Robinete de izolare | pe fiecare buclă (tur+retur) |
| Purjor automat | la partea superioară a colectorului |
| Amplasare | spălătorie/cameră tehnică sau nișă dedicată în hol parter |

### PTh-I.4.8 Fișă tehnică — Radiatoare oțel/aluminiu (etaj)

| Parametru | Valoare |
|---|---|
| Tip | panou oțel sau elemenți aluminiu |
| Regim de temperatură | 45/40 °C |
| Robinet termostatic | cap sensibil 6…28 °C, presetabil (Kv, v. PTh-I.3.6) |
| Robinet de reglaj/golire | pe retur, fiecare radiator |
| Fixare | console ancorate în zidărie/perete, verificate la sarcină |

### PTh-I.4.9 Fișă tehnică — Tablou electric general

| Parametru | Valoare |
|---|---|
| Tip | 3P+N |
| Întrerupător general | 40 A, capacitate de rupere Icu ≥ 6 kA |
| RCD | 30 mA (minimum 2 circuite distincte) + 300 mA selectiv pe general |
| SPD | tip 2 |
| Nr. module | dimensionat cu rezervă (minimum 2 module libere) |
| Monitorizare energie | opțională, pe circuitele majore (PDC, FV) |

### PTh-I.4.10 Fișă tehnică — Invertor fotovoltaic hibrid

| Parametru | Valoare |
|---|---|
| Putere | 5 kW |
| Compatibilitate baterie | da, opțional 5…10 kWh |
| Randament european | ≥ 97% |
| Protecție anti-islanding | integrată |
| Monitorizare | aplicație mobilă/portal, integrabilă cu smart home |
| Contor | bidirecțional (statut prosumator, Legea 184/2021) |

### PTh-I.4.11 Fișă tehnică — Module fotovoltaice

| Parametru | Valoare |
|---|---|
| Putere unitară | 400…450 Wp |
| Nr. module | 10…12 buc. (4,5…5 kWp total) |
| Suprafață unitară | ≈1,95 mp/modul |
| Structură de montaj | cârlige/șine dedicate învelitorii, verificate la vânt/zăpadă (sk=2,00 kN/mp) |
| Garanție producție | ≥25 ani la ≥80% putere nominală (uzual de piață) |

### PTh-I.4.12 Fișă tehnică — Centrală termică în condensație (variantă backup/alternativă pe gaz)

| Parametru | Valoare |
|---|---|
| Putere | 24 kW |
| Tip cameră de ardere | etanșă, C13/C33 |
| Evacuare | coaxială, conform D16 (`arhitectura-pth.md`) |
| Randament | conform condensație (declarat producător) |
| Alimentare gaz | Dn 22 cupru, presiune 50 mbar |

### PTh-I.4.13 Fișă tehnică — Grup hidrofor (varianta B, sursă proprie)

| Parametru | Valoare |
|---|---|
| Pompă submersibilă | debit 3…4 mc/h, H 45…60 mCA |
| Vas hidrofor | 100 litri |
| Presostat/convertizor frecvență | menținere presiune constantă |
| Adâncime puț | orientativ 40…60 m (confirmat prin foraj de probă) |

### PTh-I.4.14 Fișă tehnică — Lanț de tratare a apei (varianta B)

| Parametru | Valoare |
|---|---|
| Filtru mecanic | 50 μm, cartuș spălabil/înlocuibil |
| Filtru cărbune activ | granular |
| Dedurizator | schimb ionic, regenerare cu sare, dimensionat pe buletinul de analiză |
| Stație UV (opțională) | dimensionată la debitul de calcul 0,50 l/s |
| Verificare | buletin de analiză a potabilității, anual (Legea 458/2002) |

### PTh-I.4.15 Fișă tehnică — Microstație de epurare / fosă septică (varianta B)

| Parametru | Valoare |
|---|---|
| Tip 1 | microstație biologică SBR, 5…6 locuitori echivalenți |
| Efluent | NTPA 002 (sau NTPA 001 la descărcare în emisar) |
| Tip 2 (alternativ) | fosă septică vidanjabilă etanșă, 3 compartimente, 3…4 mc |
| Distanțe minime | ≥10 m față de puțul propriu/vecin (OMS 119/2014) |

### PTh-I.4.16 Fișă tehnică — Rezervor de retenție/acumulare pluvială

| Parametru | Valoare |
|---|---|
| Volum | 2.000…3.000 litri |
| Configurație | îngropat sau suprateran, cu pompă submersibilă de udare |
| Preaplin | conectat la puț absorbant/rigolă de suprafață |
| Rol dublu | rezervă de apă de udare + laminare debit de vârf (v. DTAC §4.5) |

### PTh-I.4.17 Fișă tehnică — Detectoare fum/CO

| Parametru | Valoare |
|---|---|
| Detector fum | SR EN 14604, alimentare baterie ≥10 ani sau 230V+backup |
| Interconectare | radio sau prin fir, alarmă comună |
| Detector CO | montat lângă centrală/sursă de ardere și în garaj |
| Poziții minime | hol etaj, fiecare dormitor (recomandat), hol parter |

### PTh-I.4.18 Fișă tehnică — Centrală de alarmă antiefracție

| Parametru | Valoare |
|---|---|
| Detectoare | PIR (circulații parter) + contacte magnetice (uși/ferestre la sol) |
| Sirenă | interior + exterior |
| Comunicare | GSM/IP, aplicație mobilă (opțional monitorizare externă) |
| Armare/dezarmare | tastatură, cartelă proximitate, aplicație mobilă |

### PTh-I.4.19 Fișă tehnică — Robinete termostatice radiatoare (etaj)

| Parametru | Valoare |
|---|---|
| Tip | cap termostatic sensibil, plajă reglaj 6…28 °C |
| Presetare Kv | reglabilă, conform breviarul PTh-I.3.6 |
| Poziție antiîngheț | prevăzută (protecție minimă în absența ocupanților) |
| Compatibilitate | corp radiator conform DTAC §5.4 |

### PTh-I.4.20 Fișă tehnică — Automatizare VMC (senzor CO2/umiditate, dacă adoptată ca opțiune de eficientizare)

| Parametru | Valoare |
|---|---|
| Senzor | CO2 și/sau umiditate relativă, montat în zona de living/dormitoare |
| Funcție | modulare debit VMC (40…100%) funcție de ocupare reală |
| Interfață | integrabilă cu automatizarea smart home (DTAC §12.4) |
| Beneficiu | reduce consumul electric al ventilatoarelor în afara orelor de ocupare intensă, fără a compromite calitatea aerului interior |

### PTh-I.4.21 Fișă tehnică — Pompă de recirculare ACM

| Parametru | Valoare |
|---|---|
| Debit | 0,05…0,10 l/s (≈180…360 l/h) |
| Înălțime de pompare | 1…2 mCA |
| Comandă | temporizator orar sau termostat de retur |
| Clasă energetică | A (turație variabilă) |

### PTh-I.4.22 Fișă tehnică — Structură de prindere panouri solare termice/module fotovoltaice pe șarpantă

| Parametru | Valoare |
|---|---|
| Tip | cârlige/console dedicate țiglei, cu penetrare punctuală etanșată |
| Verificare | încărcare permanentă suplimentară + vânt/zăpadă (sk=2,00 kN/mp), avizată de structurist |
| Etanșare | manșon/garnitură compatibilă cu învelitoarea (D07) |
| Legare la pământ | structura metalică conectată la BEP |

### PTh-I.4.23 Fișă tehnică — Contor de apă bidirecțional/apometru

| Parametru | Valoare |
|---|---|
| Tip | contor volumetric Dn 20, clasă metrologică conform SR EN 14154 |
| Amplasare | cămin de apometru, limita de proprietate |
| Verificare metrologică | periodică, conform reglementărilor ANRSC/operator |

### PTh-I.4.24 Fișă tehnică — Dispozitiv antiretur (clapetă/supapă, SR EN 1717)

| Parametru | Valoare |
|---|---|
| Poziție 1 | branșament public, imediat după contor — protecția rețelei publice |
| Poziție 2 | racord de adaos al instalației de încălzire — separarea circuitului închis de apă potabilă |
| Tip | clapetă de sens/supapă antiretur controlabilă, verificabilă la recepție |

---

## PTh-I.5 Probe și verificări detaliate

| Instalație | Probă | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/caldă | etanșeitate/presiune | 1,5×p regim, min. 6 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Canalizare menajeră | etanșeitate | umplere la nivel etaj | 15 min | fără scurgeri la îmbinări, gardă hidraulică menținută |
| Canalizare pluvială | verificare debit/scurgere | debit de calcul simulat | — | fără infiltrații/refulări |
| Instalație termică (bucle radiante) | probă la rece + probă la cald | 1,5×p regim | 24 h la rece + funcțională la cald | fără scădere presiune; echilibrare debite ±10% |
| Instalație termică (radiatoare) | probă de presiune | 1,5×p regim | 1 h | fără scurgeri la racorduri |
| Ventilare (VMC) | măsurare debite pe fiecare gură | debite proiectate | — | ±15% (v. PTh-I.3.9) |
| Instalație electrică | rezistență izolație | 500 V c.c. | — | ≥0,5 MΩ (I7) |
| Instalație electrică | continuitate PE | — | — | pe fiecare circuit |
| Instalație electrică | rezistență priză de pământ | — | — | ≤4 Ω (I7) |
| Instalație electrică | test declanșare RCD | I∆n=30 mA | — | declanșare <300 ms |
| Iluminat | măsurare niveluri (luxmetru) | — | — | conform PTh-I.9 |
| Instalație fotovoltaică | verificare polaritate/izolație DC | test string | — | conform proiect |
| Instalație fotovoltaică | test producție inițială | — | — | comparație cu producție teoretică la iradianța momentului |
| Instalație de gaze (dacă există) | probă presiune/etanșeitate | conform NTPEE | conform normativ | fără scădere presiune |
| Instalație de gaze | funcțională detector CH₄ + electrovalvă | prag simulat | — | închidere automată confirmată |
| Detectoare fum/CO | test funcțional individual | — | — | 100% puncte funcționale |
| Panouri solare termice | funcțională (pompă solară, regulator diferențial) | — | — | pornire/oprire la ΔT proiectat |
| Boiler ACM | ciclu antilegionella | 60 °C, 30 min | — | confirmat programat/executat |
| Microstație/fosă septică (varianta B) | funcțională + etanșeitate | debit nominal | — | conform proiect, fără scurgeri |
| Puț + hidrofor (varianta B) | funcțională + buletin potabilitate | — | — | conform Legea 458/2002 |
| Alarmă antiefracție | test fiecare zonă | — | — | detecție confirmată |
| Videointerfon | test funcțional | — | — | comunicare bidirecțională confirmată |

### PTh-I.5.1 Verificări electrice PRAM — detaliu

- **Rezistența de izolație** — măsurată între conductoare active și între active-PE, la 500 V c.c., pe fiecare circuit terminal, cu receptoarele deconectate; valoare minimă 0,5 MΩ (I7).
- **Rezistența prizei de pământ** — metoda celor 3 electrozi (voltmetru-ampermetru sau 62%), R_p ≤4 Ω. Dacă rezultatul depășește 4Ω (posibil pe soluri cu rezistivitate mai mare decât ipoteza de calcul ρ≈100…150 Ω·m), se completează cu electrozi verticali suplimentari (v. PTh-I.3.12).
- **Continuitatea conductorului de protecție** — pe fiecare circuit final.
- **Testul dispozitivelor diferențiale** — cu aparat dedicat, verificare timp de declanșare (<300 ms la 30 mA) pe toate circuitele de prize și pe circuitele din băi.
- **Verificarea SPD** — descărcătorul tip 2 de la tabloul general, inclusiv indicatorul de stare (fereastră de verificare/declanșare) și legarea la BEP.

### PTh-I.5.2 Verificarea de recepție a hidroizolațiilor zonelor umede (interfață cu D13, `arhitectura-pth.md`)

Deși execuția hidroizolației este lucrare de arhitectură (D13), interfața cu instalațiile sanitare (poziția sifonului de pardoseală, penetrarea coloanei de canalizare prin placă) se verifică **împreună**, la aceeași fază determinantă: banda de etanșare circulară la flanșa sifonului de pardoseală se lipește etanș **înainte** de turnarea membranei generale, iar poziția exactă a sifonului se confirmă din proiectul de instalații sanitare înainte de execuția hidroizolației — coordonare obligatorie, semnalată deja la `arhitectura-pth.md` D13.

---

## PTh-I.6 Tehnologia de montaj

### PTh-I.6.1 Succesiunea generală a lucrărilor de instalații (coordonată cu succesiunea de arhitectură PTh-A.6.1)

1. Trasare trasee — coordonat cu trasarea axelor de arhitectură/structură.
2. Execuție priză de pământ de fundație (platbandă OL-Zn, sudată la armătura tălpii) — **înainte de turnarea fundațiilor** (identic cu succesiunea PTh-A.6.1 pas 2).
3. Montaj rețea de canalizare exterioară + racord pluvial exterior — **probate înainte de acoperire** cu trotuarul de gardă/aleile.
4. Execuție goluri de trecere prin centuri/planșee (cf. PTh-I.3.13) — coordonat cu turnarea structurii, nu ulterior.
5. Montaj coloane apă rece/caldă/canalizare interioară, în ghena sanitară comună parter-etaj.
6. Montaj tubulatură VMC (magistrală + derivații), coordonat cu poziția plafonului fals/podului ventilat (D06).
7. Montaj cabluri electrice și curenți slabi în șlițuri/tuburi, tablou electric.
8. Montaj sursă termică (unitate exterioară PDC pe soclu antivibrant, puffer, boiler, grup de amestec, colector cu debitmetre) — în camera tehnică/spălătorie.
9. Montaj bucle de pardoseală radiantă (fixare pe grătar/plasă, conform pasul de pozare, **înainte de turnarea șapei**, v. `arhitectura-pth.md` PTh-A.5.2) și montaj radiatoare la etaj.
10. Probă de presiune pe circuitele hidraulice (apă, încălzire) **înainte** de tencuiala finală și de turnarea șapei (fază determinantă, cf. PTh-I.8).
11. Montaj panouri solare termice și module fotovoltaice pe acoperiș, coordonat cu montarea învelitorii (D05, D06) — verificare structurală prealabilă a șarpantei (`structura.md`).
12. Montaj corpuri de iluminat, prize, aparataj final — după tencuieli/șape (conform PTh-A.6.1 pas 17).
13. Montaj obiecte sanitare, robinete de colț, sifoane.
14. Probe finale, PIF, reglaje, instruire beneficiar (PTh-I.7).

### PTh-I.6.2 Susțineri și fixări

| Instalație | Tip susținere | Interax maxim | Observație |
|---|---|---|---|
| Coloană canalizare Dn 110 | brățară fixă la fiecare etaj + colier antivibrant | conform înălțime etaj | izolare fonică la traversarea planșeului |
| Conductă apă PP-R/PEX | brățară glisantă (dilatare) | Ø≤25: 0,8 m; Ø32: 1,0 m | — |
| Bucle pardoseală radiantă | clemă pe grătar/plasă port-conductă | conform pas de pozare (10…15 cm) | fixare fermă, evitarea deplasării la turnarea șapei |
| Tubulatură VMC | colier + suport | 1,0…1,5 m | izolație fonică/termică pe traseele din pod |
| Cabluri electrice | tub de protecție îngropat / jgheab în plafon fals | conform traseu | separare de conductele de apă/încălzire ≥10…30 cm (I7/I18) |
| Panouri solare/module FV | cârlige/șine dedicate învelitorii | conform fișă producător | verificare structurală prealabilă (sarcină permanentă + vânt/zăpadă) |
| Unitate exterioară PDC | soclu antivibrant/console de perete | — | tampoane cauciuc, distanță ≥3 m de dormitoare |

### PTh-I.6.3 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Coloane apă rece (anticondens) | 9…13 mm | manșon elastomeric |
| Distribuție ACM + recirculare | 13…19 mm | manșon elastomeric |
| Conductă circuit solar termic (exterior/pod) | 20…30 mm, rezistent UV | elastomer/vată cu manta Al |
| Tubulatură VMC (trasee neîncălzite, pod) | 20…50 mm | vată cu folie Al |
| Conducte încălzire (puffer→colector, exterior traseului radiant) | 13…19 mm | elastomer |

### PTh-I.6.4 Treceri etanșe la foc (interfață cu D12, compartimentare garaj-locuință)

La traversarea peretelui/planșeului de compartimentare garaj-locuință (EI 60…90, cf. D12 `arhitectura-pth.md`), orice trecere de instalație (cablu electric pentru priza EV-ready din garaj, eventuală tubulatură de ventilație a garajului) se etanșează cu sisteme certificate de rezistență la foc egală cu a elementului străbătut:

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Cablu electric (priză EV-ready garaj) | mastic/manșon intumescent | EI conform element (60…90) |
| Eventuală tubulatură ventilație garaj | clapetă antifoc + etanșare | EI conform element |

### PTh-I.6.5 Montaj structură de prindere fotovoltaic/solar termic pe acoperiș

Structura de prindere a panourilor (module FV + colectoare solare termice, ambele pe același versant favorabil, cf. DTAC §15) se montează pe șarpanta din lemn C24 (D05, D06 `arhitectura-pth.md`), cu respectarea următoarelor cerințe:

- **verificare structurală prealabilă** — încărcarea permanentă suplimentară a panourilor și structurii de prindere, precum și încărcarea de vânt pe module, se transmit șarpantei; se verifică de inginerul structurist (`structura.md`) **înainte de montaj**, ținând cont de secțiunea căpriorilor deja dimensionată la faza PT pentru încărcările din zăpadă (sk=2,00 kN/mp, CR 1-1-3/2012) și vânt;
- **etanșeitate** — la fiecare punct de penetrare a învelitorii (cârlige de fixare), se aplică manșon/garnitură compatibilă cu țigla/învelitoarea (D07, D04 arhitectura-pth), verificată la probă de ploaie;
- **distanțe față de coamă/streașină** — se păstrează culoarul de ventilație a podului (D06) neobturat de structura de prindere sau de cablurile modulelor;
- **legare la priza de pământ** — structura metalică de prindere se leagă la BEP, integrată cu protecția la supratensiuni (PTh-I.2.11).

### PTh-I.6.6 Montaj cablare structurată și curenți slabi

Cablarea Cat.6/6A se montează în tuburi separate de circuitele de curent tare, cu distanța minimă de separare conform I7/I18 (10…30 cm, funcție de tip de pozare), pentru evitarea perturbațiilor electromagnetice. Rack-ul tehnic (patch-panel + switch + router) se amplasează într-un dulap/nișă din hol, cu alimentare electrică dedicată și, dacă se optează pentru monitorizare video/videointerfon extins, cu UPS mic pentru continuitate în caz de întrerupere scurtă a alimentării.

### PTh-I.6.7 Toleranțe de execuție a instalațiilor

Completare la tabelul de toleranțe de arhitectură (`arhitectura-pth.md` PTh-A.8), cu toleranțele specifice lucrărilor de instalații:

| Element/operație | Toleranță admisă | Metodă de verificare |
|---|---|---|
| Pantă colector orizontal canalizare (proiectat 2%) | ±0,2% | nivelă laser pe tronson |
| Pas de pozare buclă pardoseală radiantă (proiectat 10…15 cm) | ±1 cm local, fără abateri sistematice pe toată bucla | verificare vizuală + as-built |
| Adâncime de pozare a electrodului orizontal al prizei de pământ | conform proiect, minim sub adâncimea de îngheț (0,90 m, `arhitectura-pth.md`) | măsurare directă înainte de acoperire |
| Poziție doze/prize/întrerupători față de cotele din proiect | ±20 mm | metru, șablon |
| Poziție puncte sanitare (axe robinete/scurgeri) față de proiect | ±15 mm | metru, șablon |
| Presiune reziduală la robinetul cel mai defavorabil (proiectat ≥2,0…3,0 bar) | −0,2 bar admis tranzitoriu la vârf de consum | manometru la PIF |
| Abatere debit VMC pe fiecare gură față de proiect | ±20% (±15% pe debitul total) | anemometru/balometru la PIF |
| Abatere temperatură ambientală față de proiect, cameră cu cameră, la echilibrare | ±1…1,5 °C | termometru calibrat, condiții stabilizate |
| Distanța dintre cabluri electrice și conducte de apă/încălzire în paralel | minimum 10…30 cm (funcție de pozare), fără abateri în minus | verificare la montaj, înainte de mascare |

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrarea hidraulică a buclelor de pardoseală radiantă și a radiatoarelor

Verificarea debitelor pe fiecare buclă (v. tabel PTh-I.3.5), cu ajustarea presetării debitmetrelor de la colector până la atingerea abaterii admise ±10% față de debitul de calcul; pentru radiatoare, presetarea robinetelor termostatice (v. PTh-I.3.6) se ajustează astfel încât toate cele 3 camere să atingă temperatura de proiectare simultan, fără supraalimentarea radiatorului celui mai apropiat de puffer.

### PTh-I.7.2 Reglaj aeraulic — ventilare

Reglajul se face la fiecare gură de introducere/extracție (v. tabel PTh-I.3.9), cu anemometru/balometru, urmărind debitele proiectate; criteriu de admisie: abatere debit total ≤±15%, pe fiecare gură ≤±20% (coerent cu practica uzuală pentru instalații rezidențiale). Se verifică funcționarea bypass-ului de vară (free-cooling) și a protecției antiîngheț a recuperatorului la simularea unei temperaturi exterioare scăzute.

### PTh-I.7.3 Protocol PIF pompă de căldură

- Verificare presiune agent frigorific și etanșeitate circuit frigorific (efectuată de tehnician autorizat F-gas).
- Configurare curbă de încălzire (funcție de temperatura exterioară), pe baza necesarului termic calculat (DTAC §5.2).
- Configurare parametri ACM (temperatură țintă boiler, prioritate ACM vs. încălzire, ciclu antilegionella săptămânal).
- Test funcțional regim reversibil (răcire pasivă/activă, dacă adoptat), verificare temperatură tur peste punctul de rouă (evitare condens pe pardoseală).
- Verificare curent de pornire (v. PTh-I.3.8) și funcționare normală a variatorului de frecvență.
- Proces-verbal de primă pornire, semnat de executant, furnizor echipament și beneficiar.

### PTh-I.7.4 Protocol PIF instalație fotovoltaică

- Verificare rezistență de izolație pe fiecare string DC (înainte de conectarea la invertor).
- Test de polaritate și tensiune de circuit deschis, comparat cu valoarea de catalog.
- Punere sub tensiune progresivă, verificare funcționare invertor și comunicare cu portalul de monitorizare.
- Test funcție anti-islanding (deconectare simulată a rețelei publice).
- Măsurare producție inițială, comparație cu producția teoretică instantanee — proces-verbal de PIF.
- Obținerea acordului de racordare ca prosumator (Legea 184/2021).

### PTh-I.7.5 Protocol PIF instalație de gaze (dacă se adoptă varianta alternativă)

- Probă de presiune/etanșeitate pe toată instalația interioară, conform NTPEE, **înainte** de punerea sub presiune de utilizare.
- Verificare funcțională detector CH₄ + electrovalvă de siguranță (simulare prag de alarmă).
- Aprindere și reglaj centrală termică — verificare ardere corectă, tiraj coș coaxial (D16).
- Autorizarea instalației de către operatorul de distribuție/ANRE, cu obținerea acordului de furnizare.

### PTh-I.7.6 Protocol antilegionella — prima punere în funcțiune a boilerului

La prima umplere a boilerului, se execută un ciclu inițial de ridicare a temperaturii la 60 °C, menținut minimum 30 de minute, **înainte** de darea în exploatare curentă (regim normal de temperatură 55…60 °C conform DTAC §2.4), pentru eliminarea oricărei contaminări reziduale din faza de montaj/depozitare a echipamentului.

### PTh-I.7.7 Protocol PIF curenți slabi și smart home

- **Videointerfon**: test comunicare bidirecțională post exterior ↔ post(uri) interior(oare), test deschidere de la distanță a porții/ușii de garaj.
- **Alarmă antiefracție**: test fiecare zonă de detecție (PIR, contacte magnetice), verificare comunicator GSM/IP (dacă e cazul, cu firma de monitorizare).
- **Smart home**: programare scenarii (plecare/sosire, „mod vacanță"), integrare termostate pe zone, monitorizare producție FV și consum, verificare optimizare autoconsum (pornirea electrocasnicelor în orele de producție solară).
- **Rețea date**: test conectivitate pe toate prizele RJ45, verificare acoperire Wi-Fi pe ambele niveluri.

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, marcaj CE) | certificate | responsabil tehnic execuție (RTE) | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare, pluvial exterior) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 4 | Goluri de trecere prin centuri/planșee (cf. PTh-I.3.13) | proces-verbal | RTE + diriginte + structurist | **FD** |
| 5 | Montaj bucle pardoseală radiantă, înainte de turnarea șapei | proces-verbal | RTE + diriginte | **FD** |
| 6 | Probă presiune circuit termic (bucle + radiatoare), înainte de mascare | PV probă | RTE + diriginte | **FD** |
| 7 | Probă etanșeitate apă rece/caldă | PV probă SR EN 806-4 | RTE + diriginte | CM |
| 8 | Probă canalizare, înainte de mascare/acoperire | PV probă | RTE + diriginte | **FD** |
| 9 | Trasee electrice/curenți slabi încastrate, înainte de tencuială/șapă | proces-verbal | RTE + diriginte | **FD** |
| 10 | Hidroizolație zone umede — coordonare cu poziția sifonului (interfață D13) | PV comun instalații+arhitectură | RTE + diriginte | **FD** |
| 11 | Rezistență izolație + priză de pământ (electric) | buletin PRAM | verificator/laborator autorizat | CM |
| 12 | Test RCD/diferențiale | buletin PRAM | laborator autorizat | CM |
| 13 | Reglaj aeraulic VMC (echilibrare debite) | protocol debite | RTE | CM |
| 14 | Echilibrare hidraulică bucle radiante + radiatoare | protocol debite/presetări | RTE | CM |
| 15 | Montaj structură prindere FV/solar termic pe șarpantă | proces-verbal + aviz structurist | RTE + structurist | **FD** |
| 16 | Primă pornire pompă de căldură | PV primă pornire | executant + furnizor + beneficiar | CM |
| 17 | Ciclu antilegionella — prima punere în funcțiune boiler | PV probă | RTE | CM |
| 18 | Funcțional FV (string-uri, invertor) | PV probă + raport producție | firmă autorizată | CM |
| 19 | Probă etanșeitate + funcțională instalație gaze (dacă e cazul) | PV probă ANRE | firmă autorizată | **FD** |
| 20 | Funcțional detectoare fum/CO | PV probă 100% | RTE | CM |
| 21 | Funcțional microstație/fosă septică sau puț+hidrofor (varianta B) | PV probă | RTE | CM |
| 22 | Funcțional alarmă antiefracție + videointerfon | PV probă | RTE | CM |

Legendă: **FD** = fază determinantă (lucrarea nu poate continua fără verificare și proces-verbal, elementul devenind inaccesibil sau având rol direct de securitate/etanșeitate); CM = control în masă; CQ = control calitate la recepția materialelor.

### PTh-I.8.1 Faze determinante — detaliere

Fazele marcate **FD** sunt cele la care lucrarea devine inaccesibilă imediat după execuție (acoperită de beton, de șapă, de tencuială) sau are rol direct de siguranță/etanșeitate: priza de pământ de fundație (acoperită de betonul de fundație), traseele îngropate (canalizare, pluvial exterior — acoperite de pământ), golurile de trecere prin centuri/planșee (toarnate odată cu structura), buclele de pardoseală radiantă și proba lor de presiune (acoperite de șapă — lucrare imposibil de reparat ulterior fără spargerea pardoselii finite), traseele electrice/curenți slabi încastrate (acoperite de tencuială/șapă), interfața hidroizolație-sifon de pardoseală (acoperită de placajul ceramic), structura de prindere fotovoltaic/solar pe șarpantă (verificare de rezistență obligatorie înainte de încărcare permanentă) și, dacă se adoptă, instalația de gaze (risc de explozie, autorizare ANRE obligatorie).

### PTh-I.8.2 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație (apă, canalizare, termic, electric, VMC, gaze) |
| Scheme finale | monofilară actualizată, izometrice apă/canalizare, schema termică cu bucle numerotate |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (marcaj CE) |
| Buletine de probe | PRAM, presiune apă/termic, etanșeitate gaz (dacă e cazul), debite VMC |
| Procese-verbale FD | toate fazele determinante semnate (v. PTh-I.8) |
| Protocoale reglaj | echilibrare hidraulică, reglaj aeraulic, PIF pompă de căldură, PIF FV |
| Instrucțiuni de exploatare | operare pompă de căldură, VMC (schimbare filtre), ciclu antilegionella, verificare periodică detectoare fum/CO |
| Program mentenanță | revizii periodice (VMC — filtre semestrial, PDC — anual, panouri solare/FV — curățare, priză de pământ — verificare periodică) |
| Garanții | certificate garanție producători (pompă de căldură, boiler, VMC, module FV, invertor) |

---

## PTh-I.9 Calcul iluminat interior și exterior (NP 061/2002, SR EN 12464-1)

### PTh-I.9.1 Metoda de calcul (flux luminos)

Calculul se face prin metoda factorului de utilizare, conform SR EN 12464-1 și NP 061:

**N = (E × S) / (Φ_corp × U × M)**

unde E = nivelul de iluminare menținut cerut [lx], S = suprafața zonei [mp], Φ_corp = fluxul luminos al unui corp [lm], U = factorul de utilizare, M = factorul de mentenanță (0,90 pentru LED în mediu rezidențial curat).

Corpuri de referință adoptate, coerente cu puterea specifică medie ~6 W/mp deja stabilită la DTAC §8.2: **spot/plafonieră LED 10 W/1.100 lm** (circulații, dormitoare), **panou LED 24 W/2.800 lm** (living, bucătărie, birou), **plafonieră LED IP44 12 W/1.300 lm** (băi, GS), **aplică/proiector LED exterior IP65 15 W/1.700 lm**.

### PTh-I.9.2 Cerințe de iluminare pe categorii de zone (reluare DTAC §8.1, cu adăugarea UGR/Ra)

| Zonă | Em cerut [lx] | UGR max | Ra min |
|---|---|---|---|
| Living/zonă de zi | 200 | 22 | 80 |
| Bucătărie (zona de lucru) | 300…500 | 22 | 80 |
| Birou/spațiu de studiu | 500 | 19 | 80 |
| Dormitoare | 100…200 | 22 | 80 |
| Băi | 200 (300 la oglindă) | 25 | 80 |
| Hol, casa scării | 100 | 25 | 60 |
| Garaj | 150 | 25 | 60 |
| Exterior (alei, intrare, curte) | 20…50 | — | 20 |

### PTh-I.9.3 Calcul detaliat pe zone — parter

Corp de referință panou LED 24 W/2.800 lm pentru zonele de zi, spot/plafonieră 10 W/1.100 lm pentru circulații:

| Zonă | S [mp] | k (indice încăpere) | U | E cerut | N calc | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|
| Living + bucătărie (zonă combinată de calcul termic DTAC, 45 mp) | 45 | 1,35 | 0,55 | 250 (medie ponderată living/bucătărie) | 8,4 | 9 (6 panou living + 3 zona lucru bucătărie) | 216 |
| Hol + GS parter (12 mp) | 12 | 0,80 | 0,45 | 130 (medie hol/GS) | 3,9 | 4 | 40 |
| Spălătorie/cameră tehnică (parter) | — (inclus în bilanț general) | — | 0,45 | 150 | 1 corp dedicat | 1 | 10 |
| Garaj (10 mp, cf. DTAC §5.2) | 10 | 0,70 | 0,42 | 150 | 4,0 | 4 (IP44) | 40 |

Exemplu de verificare (living+bucătărie): N = (250×45)/(2.800×0,55×0,90) = 11.250/1.386 = 8,1 → se adoptă 9 corpuri (repartizate proporțional pe zona de living, cu accent suplimentar de iluminat pe zona de lucru a bucătăriei, conform cerinței de 300…500 lx local acolo, cu corp suplimentar sub mobilierul suspendat).

### PTh-I.9.4 Calcul detaliat pe zone — etaj

| Zonă | S [mp] | k | U | E cerut | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|
| Dormitor matrimonial (18 mp) | 18 | 1,05 | 0,52 | 150 | 3 (+variator intensitate) | 30 |
| Dormitor copil 1 (14 mp) | 14 | 0,90 | 0,50 | 150 | 2 | 20 |
| Dormitor copil 2 (13 mp) | 13 | 0,88 | 0,50 | 150 | 2 | 20 |
| Baie principală (7 mp) | 7 | 0,65 | 0,42 | 200 (300 la oglindă) | 2 (+aplică oglindă) | 24+12 |
| Baie etaj/secundară (6 mp) | 6 | 0,60 | 0,40 | 200 | 2 (+aplică oglindă) | 24+12 |
| Hol etaj + casa scării (15 mp) | 15 | 0,85 | 0,45 | 100 | 4 (+iluminat treaptă cu treaptă, D10) | 40+benzi LED |

### PTh-I.9.4a Iluminat treaptă cu treaptă — interfața cu scara (D10, `arhitectura-pth.md`)

Scara interioară (18 trepte, h=16,7 cm, l=30 cm — verificată prin relația lui Blondel la arhitectură, D10) primește, suplimentar față de corpurile de circulație de la holul etaj/parter, un traseu dedicat de iluminat de orientare: bandă LED încastrată în contratreaptă (sau, alternativ, aplice de perete la interval de 3…4 trepte), alimentată pe un circuit separat de cel al holului, cu comandă pe senzor de mișcare/prezență la ambele capete ale rampei (parter și etaj), pentru siguranța deplasării nocturne fără căutarea întrerupătorului. Puterea specifică a benzii LED (uzual 3…5 W/ml pe lungimea rampei, ≈1,00 m lățime utilă × traseul de 18 trepte) se include în bilanțul de 40 W adoptat pentru zona holului etaj la PTh-I.9.4, ca rezervă acoperitoare. Interfața electrică (poziția dozelor în contratreaptă) se coordonează cu execuția rampei de beton armat (D10) **înainte** de turnare, dacă rampa este monolită — traseul electric încastrat nu se sparge ulterior în placa de beton a rampei.

### PTh-I.9.5 Sinteză putere instalată iluminat interior

| Nivel | Nr. corpuri | Putere instalată [W] |
|---|---|---|
| Parter | 18 | ≈306 |
| Etaj | 15 | ≈182 |
| **Total interior** | **33** | **≈488** |

Diferența față de puterea globală de 900 W adoptată la DTAC §8.2 (P_iluminat = 150 mp × 6 W/mp) se explică prin marja de proiectare a DTAC (calcul sumar la nivel de bilanț de puteri, care include și rezerva pentru iluminat de accent/decorativ suplimentar — plafoane casetate, iluminat indirect living cap. `arhitectura-pth.md` fișe de finisaje — necontorizat separat în breviarul flux luminos de mai sus, dar acoperit de marja globală DTAC).

### PTh-I.9.6 Calcul iluminat exterior

| Zonă exterioară | E cerut [lx] | Corp adoptat | Nr. corpuri | P instalat [W] |
|---|---|---|---|---|
| Alee acces principal (D11) | 20 | aplică LED IP65 15 W, pe stâlpi joși | 3 | 45 |
| Zonă curte/terasă | 30…50 | proiector LED IP65 20 W | 2 | 40 |
| Acces poartă (cu videointerfon) | 30 | aplică LED IP65 15 W | 1 | 15 |
| Fațadă (balizaj/accent) | — | proiector LED IP65 10 W | 2 | 20 |
| **Total exterior** | | | **8** | **≈120** |

Comandă prin senzor de crepuscul (pornire automată) + senzor de mișcare la accesul principal/poartă (v. DTAC §8.3), cu posibilitate de temporizare/dimming prin sistemul smart home (DTAC §12.4).

### PTh-I.9.7 Sinteză generală iluminat și corelare cu bilanțul electric

| Componentă | Putere [W] |
|---|---|
| Iluminat interior | ≈488 |
| Iluminat exterior | ≈120 |
| Rezervă/accent (marjă DTAC) | ≈290 (diferență până la 900 W adoptat DTAC §8.2/§7.2) |
| **Total (coerent cu poziția „iluminat" din bilanțul electric DTAC §7.2)** | **≈900** |

---

## PTh-I.10 Breviar suplimentar — verificări specifice de execuție

### PTh-I.10.1 Verificarea acustică a unității exterioare a pompei de căldură (extindere DTAC §14.1)

Reluând nivelul de putere acustică declarat (45…55 dB(A) la 1 m, mod silențios nocturn), se verifică, la faza de proiectare a amplasamentului, atenuarea la distanța de montaj recomandată (≥3 m de ferestrele dormitoarelor):

Atenuare orientativă prin propagare în câmp liber (lege de atenuare cu distanța, aproximativ 6 dB la fiecare dublare a distanței, pentru sursă punctuală): la 3 m față de sursă (nivel de referință la 1 m = 50 dB(A) mediu), atenuarea este de aproximativ **20×log₁₀(3/1) ≈ 9,5 dB**, rezultând un nivel estimat la fereastra cea mai apropiată de **≈40…41 dB(A)**, sub pragul recomandat de OMS pentru zgomot rezidențial exterior nocturn (≤45 dB(A) la fațada dormitoarelor). Verificarea finală se face la PIF, cu sonometru, în condiții reale de funcționare (regim de vârf, seara).

### PTh-I.10.2 Verificarea protecției antiseismice a echipamentelor (extindere DTAC §14.2)

Deși clasa de importanță seismică IV (γ_I,e=1,00, cf. `arhitectura-pth.md` §PTh-A.1.1: ag=0,20g, TC=0,70s) presupune cerințe reduse față de clădirile publice, se confirmă la execuție ancorarea efectivă a echipamentelor grele (boiler plin ≈220 kg, puffer plin ≈120…200 kg funcție de volum), cu console și prezoane dimensionate pentru o forță orizontală de siguranță proporțională cu ag=0,20g — verificare de bun-simț ingineresc la montaj, nu un calcul seismic dedicat separat (locuința nu se încadrează în categoriile care necesită breviar seismic pentru echipamente nestructurale, conform P100-1/2013).

### PTh-I.10.3 Verificarea ventilației garajului și interfața cu detectorul de CO (extindere D12, `arhitectura-pth.md`)

Garajul (compartimentat EI 60…90 față de locuință, cf. D12) necesită ventilație naturală/mecanică proprie, **fără comunicare cu sistemul de VMC al locuinței** (DTAC §12, principiu deja stabilit): grile de ventilație naturală permanentă (admisie jos + evacuare sus, secțiune orientativă minimă conform bunei practici pentru un garaj de dimensiunea uneia mașini, ≥100 cm² fiecare) sau, dacă poziția garajului nu permite ventilație naturală eficientă, extractor mecanic temporizat, comandat manual sau de la detectorul de CO. Detectorul de CO (DTAC §11.3) se amplasează la interfața garaj-locuință (pe partea locuinței, lângă ușa EI 30 — D12), cu prag de alarmă calibrat pentru intoxicație precoce.

### PTh-I.10.4 Verificarea coordonării dintre priza EV-ready și compartimentarea garajului

Priza trifazată de rezervă pentru încărcare vehicul electric (EV-ready, DTAC §7.2/§7.4, 5×6 mm², MCB C32) se amplasează în garaj, cu grad de protecție IP44 minimum (mediu cu praf/umiditate ocazională de la vehicul) și cu propriul RCD tip A/B (funcție de tipul viitorului încărcător) — poziționată astfel încât cablul de încărcare să nu traverseze pragul ușii EI 30 de compartimentare (D12) în poziție deschisă permanent, pentru a nu compromite funcția de autoînchidere a acesteia.

### PTh-I.10.5 Verificarea echipotențializării suplimentare în băi (SR EN 60364-7-701)

Extindere a DTAC §9.1 (echipotențializare suplimentară băi) cu procedura de verificare la recepție: în fiecare baie, toate elementele metalice accesibile din zonele 0, 1 și 2 (cadă/duș metalic, țevi metalice de apă/încălzire, corpuri de radiator dacă sunt metalice și accesibile) se leagă printr-un conductor de echipotențializare dedicat (secțiune minimă conform I7) la bara de echipotențializare locală a băii, conectată la rândul ei la BEP principal (PTh-I.2.11). Verificarea la recepție se face prin măsurarea continuității electrice între fiecare element metalic accesibil și BEP — rezistență de legătură așteptată sub 0,5…1,0 Ω pe traseele scurte tipice unei băi de locuință. Corpurile de iluminat și prizele din zonele 1 și 2 respectă gradul de protecție IP impus (IPX4 minimum în zona 1, conform DTAC §8.1).

### PTh-I.10.6 Verificarea separării fizice și electromagnetice între trasee (interfață curenți tari/curenți slabi/instalații hidraulice)

La execuție, se confirmă vizual, pe toate traseele paralele identificate în proiect (ghenă sanitară, plafon fals, jgheab tehnic din hol), respectarea distanțelor minime dintre: (a) cabluri de curent tare și cabluri de curenți slabi — minimum 10…30 cm în paralel sau ecranare, conform I7/I18, pentru evitarea perturbațiilor induse asupra semnalului de date/CCTV/alarmă; (b) cabluri electrice și conducte de apă/încălzire — minimum 10…30 cm, conform I7, pentru evitarea condensului galvanic și a deteriorării izolației cablului în caz de condens/scurgere; (c) conducta de gaz (dacă există) și orice altă instalație — distanțe conform NTPEE, cu interzicerea traversării aceluiași șanț/tub de protecție cu alte rețele. Verificarea se consemnează fotografic înainte de mascare (PVLA, cf. PTh-I.8).

---

## PTh-I.11 Concluzii și corelare finală

Prezentul supliment PTh detaliază integral, la nivel de execuție, toate instalațiile locuinței unifamiliale P+1E stabilite în DTAC (`instalatii.md`): alimentarea cu apă (ambele variante, A și B) și distribuția interioară pe coloane, canalizarea menajeră și pluvială (verificate nod-cu-nod pe fiecare tronson/coloană), instalația termică (pompă de căldură + 5 bucle de pardoseală radiantă numerotate + 3 radiatoare cu presetare Kv), ventilarea mecanică controlată (debite pe fiecare gură), instalația electrică completă (toate circuitele cu verificare de cădere de tensiune), iluminatul (calcul flux luminos pe fiecare cameră), priza de pământ și protecția la supratensiuni, instalația de gaze (variantă alternativă) și instalația fotovoltaică cu producție lunară estimată.

Toate valorile de dimensionare din DTAC au fost **verificate prin recalculare pe tronsoane/circuite/bucle** și confirmate coerente: debitul de calcul apă (qc≈0,46 l/s recalculat vs. 0,50 l/s adoptat DTAC), debitul canalizare (Q_ww≈1,26…1,74 l/s pe diverse tronsoane, coerent cu 1,8 l/s adoptat), debitul buclelor de pardoseală radiantă (ΣQ≈193 kg/h ≈0,06 l/s, identic cu DTAC §5.6), bilanțul electric (Δu% conform pe toate cele 15 circuite detaliate), iluminatul (488+120=608 W calcul detaliat + rezervă de accent, coerent cu 900 W adoptat DTAC §8.2), și producția fotovoltaică (repartizată lunar, însumând exact 5.600 kWh/an confirmați în DTAC).

**Confirmări necesare înainte de finalizarea execuției** (semnalate onest, nu presupuse): disponibilitatea și presiunea reală a rețelei publice de apă/canalizare la limita de proprietate (condiționează alegerea definitivă între varianta A și B, cap. DTAC §2.1/§3.4), rezistivitatea de sol reală măsurată la execuție (ipoteza ρ≈100…150 Ω·m pentru priza de pământ se confirmă/corectează prin măsurătoare), disponibilitatea rețelei de gaze naturale în zonă (condiționează adoptarea instalației de gaze ca sursă alternativă/de rezervă, cap. DTAC §10.1) și fișa tehnică definitivă a pompei de căldură selectate (curba de pornire a variatorului, pentru confirmarea finală a protecției electrice, cap. PTh-I.3.8). Orice modificare a ipotezei funcționale de bază (sursă termică, capacitate fotovoltaică, variantă de alimentare cu apă) impune, conform regulii deja stabilite în DTAC, re-dimensionarea integrală a instalațiilor afectate.

---

## ANEXA B — Breviar centralizat PTh (verificare de coerență cu breviarul DTAC)

Anexa reunește, pentru trasabilitate, mărimile de calcul rezultate în prezentul supliment PTh, alături de valoarea corespunzătoare din breviarul DTAC (`instalatii.md`), confirmând coerența dintre dimensionarea preliminară și calculul de execuție nod-cu-nod.

**B.1 Apă și canalizare:**
- debit de calcul apă rece: 0,50 l/s (DTAC §2.2) ↔ 0,46 l/s recalculat pe coloanele AR-E+AR-P (PTh-I.2.1) — **coerent, în marja de proiectare**;
- pierdere de sarcină traseu cel mai defavorabil (apă rece la duș etaj): H_pierderi adoptat 4,0 mCA (DTAC §2.5) ↔ ≈1,59 mCA recalculat nod-cu-nod (PTh-I.3.1) — **marjă confirmată**;
- debit canalizare menajeră: 1,74 l/s / adoptat 1,8 l/s (DTAC §3.2) ↔ verificat pe fiecare coloană (PTh-I.3.3), h/D<0,5 pe toate tronsoanele — **coerent**;
- debit pluvial: 1,49 l/s / adoptat 1,5 l/s (DTAC §4.2) ↔ repartizat pe cele 2 versante, 0,74 l/s fiecare (PTh-I.3.4) — **coerent**.

**B.2 Termic:**
- necesar termic total: Φ_înc≈9,1 kW (DTAC §5.2) — nemodificat la PTh, repartizat pe 5 bucle pardoseală radiantă (Φ_parter=4,5 kW, PTh-I.3.5, identic cu DTAC §5.6) + circuit radiatoare 2.250 W (PTh-I.3.6, identic cu DTAC §5.6);
- debit total bucle pardoseală: 0,06 l/s (DTAC §5.6) ↔ ΣQ_bucle=193 kg/h≈0,054…0,06 l/s (PTh-I.3.5) — **coerent**.

**B.3 Electric:**
- putere cerută Pc≈12,5 kW, Ic≈19,6 A/fază (DTAC §7.2) ↔ confirmat prin însumarea celor 15 circuite detaliate cu verificare Δu% (PTh-I.3.7) — **coerent, toate circuitele sub limita 3%/5%**;
- verificare priză de pământ: R_p≤4Ω, estimat 2…4Ω (DTAC §9.1) ↔ procedură de execuție și măsurare confirmată la recepție (PTh-I.3.12/PTh-I.5.1).

**B.4 Ventilare:**
- debit VMC: 200…250 mc/h (DTAC §6.1) ↔ repartizat pe 9 guri de introducere/extracție (PTh-I.3.9): 165 mc/h introducere + 145 mc/h extracție, echilibrat prin transfer sub uși — **coerent, în limitele de reglaj**.

**B.5 Iluminat (nou, detaliat integral la PTh):**
- putere instalată iluminat: 900 W (DTAC §8.2) ↔ 488 W interior + 120 W exterior calculat detaliat pe cameră (PTh-I.9) + rezervă de accent ≈290 W — **coerent, suma egală cu valoarea DTAC**.

**B.6 Fotovoltaic (nou, repartizat lunar la PTh):**
- producție anuală: ≈5.600 kWh/an (DTAC §13.3) ↔ repartizată pe 12 luni (PTh-I.3.11), cu vârf iunie-august (≈12-13%/lună) și minim decembrie-ianuarie (≈3,5%/lună) — **coerent cu profilul climatic al zonei**.

**B.7 Gaze (variantă alternativă, dacă adoptată):**
- debit total: 3,39 mc/h (DTAC §10.3) ↔ verificat pe tronsoane, Δp≈33 Pa pe traseul cel mai defavorabil (PTh-I.3.10), sub pragul admis ~1…2 mbar — **coerent**.

Concluzia verificării de coerență: **toate valorile globale ale breviarului DTAC se confirmă prin calculul de execuție pe tronsoane/circuite/bucle al prezentului supliment PTh**, cu marje rezonabile care acoperă variațiile reale de traseu ce se confirmă la execuție. Singurele aspecte noi identificate la PTh (verificarea acustică la distanța reală de montaj a unității exterioare, repartiția lunară a producției fotovoltaice, detalierea completă a iluminatului pe cameră, breviarul de goluri de trecere coordonat cu structura) nu contrazic dimensionarea DTAC, ci o completează la nivelul de detaliu specific fazei de execuție.

---

*Supliment de fază PTh — instalații. Se citește împreună cu memoriul DTAC `instalatii.md` (care rămâne referința pentru încadrarea normativă și dimensionarea preliminară) și cu memoriile `general.md`, `arhitectura.md`, `structura.md` (DTAC) și `arhitectura-pth.md` (PTh, detaliile D01…D16) ale aceleiași funcțiuni de referință — locuință individuală izolată P+1E, zidărie confinată, proiect Cătămărăști —, cu care formează tripletul complet al fazei PTh.*
