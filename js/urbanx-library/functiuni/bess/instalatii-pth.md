# SUPLIMENT DE FAZĂ P.Th. — INSTALAȚII ELECTRICE — BESS (SISTEM DE STOCARE A ENERGIEI ÎN BATERII)

## PTh-I.1. Obiectul și structura suplimentului de fază P.Th.

Prezentul document constituie **suplimentul de fază P.Th.** (Proiect Tehnic de execuție, conform HG nr. 907/2016, Anexa nr. 8) pentru memoriul de instalații electrice al obiectivului **BESS (Battery Energy Storage System) — stație de stocare a energiei electrice în baterii**, cu capacitate energetică instalată parametrică **10–50 MWh**, dezvoltat la faza DTAC în `instalatii.md`. Documentul de față **nu repetă** conținutul DTAC (arhitectura electrică de principiu celulă→modul→rack→container→PCS→transformator→SEN, formulele de scalare, fizico-chimia ambalării termice, alegerea chimiei LFP, justificările tehnico-economice) — acestea rămân valabile prin trimitere directă — ci adaugă exclusiv **nivelul de detaliere necesar execuției**: detalii de montaj la scară de container/rack, breviare de calcul extinse la toate tronsoanele reale ale unei configurații complete, fișe tehnice complete de echipament, tabele de probe cu praguri numerice, tehnologia de montaj, protocoale de PIF/reglaj, regimul ISCIR aplicabil componentelor sub presiune și planul de control al calității.

Pentru coerența cifrelor cu faza DTAC, suplimentul este dezvoltat pe un **exemplu numeric de execuție**, coerent cu intervalul parametric 10–50 MWh și cu exemplul de referință de 20 MWh/10 MW deja etichetat în `instalatii.md`, dar rafinat la un nivel de granularitate pe care faza DTAC nu îl tratează: instalația este organizată în **10 containere a câte 2 MWh fiecare (20 MWh total)**, fiecare container conținând **8 rack-uri a 250 kWh** (2 șiruri de 25 module în serie, 1.250 V DC bus, câte 50 module/rack), rezultând **400 module/container** și **4.000 module în total** — cifră identică celei calculate parametric în DTAC §3.1 (N_module = E_inst/E_modul = 20.000/5 = 4.000), confirmând coerența exemplului de execuție cu breviarul de fază DTAC. Topologia adoptată este cea **distribuită** (recomandarea DTAC §2.4): fiecare container are propriul **PCS de 1 MW**, rezultând 10 PCS × 1 MW = **10 MW instalați**, C-rate 0,5C (autonomie 2h), identic exemplului DTAC. Transformatorul ridicător adoptat este de **12,5 MVA, 0,69/20 kV, Dyn11** (varianta unică din DTAC §3.4); varianta redundantă 2×6,3 MVA se tratează, unde aleasă de beneficiar, prin duplicarea directă a calculelor din §PTh-I.4.4/I.4.6 la jumătate de putere pe fiecare unitate. **Toate formulele rămân parametrice** (recalculabile la orice combinație de capacitate/număr de containere din intervalul 10–50 MWh, prin relațiile din DTAC §1, §3 și din prezentul §PTh-I.4); exemplul de 10 containere × 2 MWh servește la a produce cifre concrete, verificabile, pentru detaliile de execuție — exact rolul unui proiect tehnic față de un memoriu de fază DTAC.

### PTh-I.1.1. Nivelul de detaliere suplimentar față de DTAC

| Element | Nivel DTAC | Nivel P.Th. (suplimentar, acest document) |
|---|---|---|
| Scheme | arhitectura electrică de principiu (bloc), formule de scalare | scheme de execuție complete: fiecare container, fiecare rack, fiecare PCS, cu identificatori (CNT-01…10, PCS-01…10, RK-01…08/container) |
| Detalii de montaj | — | 20 detalii de execuție numerotate (D01…D20), scări 1:5…1:20, tabel poziții + text de execuție/toleranțe |
| Breviar | exemplu numeric de principiu (20 MWh/10 MW) la nivel de sistem | dimensionarea **tuturor** tronsoanelor DC/AC/MT reale ale exemplului (rack→bus, bus→PCS, PCS→trafo, trafo→PMD), calculul complet al prizei de pământ, al protecției la trăsnet, al sarcinii termice HVAC, al rezervei de apă de stingere/răcire, al suprafeței de decompresie și verificarea la scurtcircuit/selectivitate pe toată cascada |
| Echipamente | tipuri și parametri de referință | fișe tehnice complete per echipament major (celulă, modul, rack/RBMS, container, PCS, transformator, celule MT, SCADA/EMS/BMS Master, detecție gaz+VESDA, stingere, HVAC, SPD) |
| Probe | enumerare normativă | tabel complet parametru/valoare/durată/criteriu de admisie, pe toate instalațiile, inclusiv protocoale specifice BMS și PSI (simulare praguri fără declanșare reală a agentului) |
| Montaj | principii generale | succesiune tehnologică, susțineri, adâncimi de pozare, treceri la foc, control de calitate pe fază, manevrare/ancorare containere (~35 t/unitate) |
| PIF | menționată | protocoale complete de măsurare per rack/container, parametrizare RfG, sincronizare cu OD, regimul ISCIR pentru componentele sub presiune |
| Calitate | — | Plan de Control al Calității (PCC) cu faze determinante și cartea tehnică — capitol instalații |

### PTh-I.1.2. Cadru normativ de detaliere (adăugat față de DTAC §1.4)

Cadrul normativ complet al obiectivului este cel enumerat la DTAC §1.4 (I7-2011, PE 155, NTE 001/007, PE 116/124/132, SR EN 61439-1/2, SR EN 62271, SR EN 60076, IEC 62933, IEC 62619, IEC 63056, UL 9540/9540A, NFPA 855, NFPA 68/69, EN 14994, SR EN 62305-1…4, P118-1/2/3, Ordinul MAI 129/2016, HG 571/2016, Cod RET/RED, Regulamentul (UE) 2016/631). La acestea, faza P.Th. adaugă normele de **detaliere a execuției**, inclusiv cele specifice unei instalații cu atmosferă potențial explozivă în interiorul containerelor (faza de degazare, DTAC §10.1):

| Normativ | Domeniu de detaliere P.Th. |
|---|---|
| **NTE 007/08/00** | adâncimi de pozare, distanțe între cabluri, moduri de pozare (îngropat, tub, jgheab) și factori de corecție |
| **PE 107 (NTE 006/06/00)** | execuția rețelelor de cabluri electrice — tehnologie de tragere, raze de curbură |
| **PE 116/1994** | metodologia completă a încercărilor și măsurătorilor la PIF |
| **PE 118/1992** | verificarea și încercarea instalațiilor electrice |
| **1.RE-Ip 30/2004** | execuția prizelor de pământ — geometrie, materiale, adâncimi |
| **NP 004/2003** | normativ pentru proiectarea, execuția și exploatarea instalațiilor de protecție la trăsnet |
| **SR EN 62305-2** | metodologia de calcul a riscului (analiza cantitativă R vs. R_T) pentru clasa de protecție la trăsnet |
| **SR EN 62305-3/-4** | execuția sistemului de captare/coborâre și coordonarea SPD-urilor |
| **IEC 60909** | calculul curenților de scurtcircuit în rețele trifazate AC — aplicat pe partea MT/JT a instalației |
| **SR EN IEC 61439-1/-2** | verificarea la recepție a ansamblurilor de aparataj JT (tablouri PCS, TGJT) |
| **SR EN IEC 62271-200** | recepția celulelor de medie tensiune, verificarea interlock-ului mecanic |
| **Directiva 2014/34/UE (ATEX)** | echipamente și sisteme protectoare destinate utilizării în atmosfere potențial explozive — aplicabilă zonelor din interiorul containerului expuse fazei de degazare (hidrogen), transpusă în legislația națională |
| **SR EN 60079-10-1** | clasificarea zonelor cu pericol de explozie de gaz (metodologia de zonare 0/1/2) — aplicată interiorului containerului la partea superioară a incintei |
| **SR EN 60079-14** | proiectarea, alegerea și montarea instalațiilor electrice în zone clasificate |
| **Legea nr. 64/2008** și **colecția PT C ISCIR** | funcționarea în siguranță a recipientelor sub presiune — aplicabilă cilindrilor de agent de stingere gazos/aerosol, dacă produsul presiune×volum depășește pragul de exceptare |
| **PT R1-2010 (ISCIR)** | autorizarea macaralei/utilajului de ridicare folosit la manevrarea containerelor (~35 t/unitate) |
| **C56-2002** | verificarea calității execuției lucrărilor de construcții-montaj (aplicabil platformelor/fundațiilor containerelor și PT) |
| **Legea nr. 50/1991, Anexa nr. 1** | conținutul-cadru al documentației tehnice, aplicabil deopotrivă fazelor DTAC și P.Th. |

---

## PTh-I.2. Detalii de execuție (D01–D20)

Detaliile de mai jos completează planșele de execuție ale proiectului tehnic. Fiecare detaliu este redactat la scara indicată, cu tabel de poziții (element/descriere/material-dimensiune) și cu textul cerințelor de execuție și al toleranțelor admise. Numerotarea D01…D20 este cea adoptată în lista de planșe a proiectului; ordinea urmează fluxul de execuție (de la platforma-container spre punctul de racord, cu detaliile specifice de securitate la incendiu intercalate la locul lor firesc în succesiunea de montaj).

### D01 — Detaliu ancorare container pe platforma de beton armat — scara 1:20 (plan) / 1:10 (secțiune ancoraj)

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Platformă de beton armat | suport container, dimensionată conform memoriul de structură (forța de ancorare F_b ≈ 114 kN/container, cf. metodologiei P100-1) | beton C25/30, conform breviarul structurii |
| 2 | Bulon de ancorare chimică | fixare picior container–platformă | oțel M20-M24, ancoraj chimic conform SR EN 1992-4 |
| 3 | Consolă/picior container | punct de reazem structural al containerului (colțare ISO) | oțel, conform fișa constructivă a producătorului de container |
| 4 | Placă de nivelare | compensează denivelările platformei sub piciorul containerului | oțel/neopren dur, grosime conform toleranță nivelare |
| 5 | Bornă de legare la priza de pământ | continuitate electrică carcasă container–conductor de contur | Cu 25 mm², sudură exotermică sau clemă bimetalică |

**Cerințe de execuție și toleranțe.** Așezarea containerului pe platformă se realizează cu utilaj de ridicare dimensionat la greutatea reală a unității echipate (≈ 30–36 t pentru un container de 2 MWh, cf. fișa tehnică a producătorului — valoare care se confirmă înainte de comandarea utilajului de ridicare/macaralei, cap. PTh-I.8.3), respectând strict planul de manevră al furnizorului (puncte de prindere pe colțarele ISO, unghiuri de ridicare admise, interdicția de a suspenda containerul de alte puncte decât cele certificate). Nivelarea platformei sub fiecare picior de container: toleranță **≤ 3 mm/m**, verificată înainte de fixarea buloanelor de ancorare — o denivelare necorectată transmite eforturi de torsiune neuniforme carcasei containerului, cu risc de deteriorare a etanșeității anvelopei. Buloanele de ancorare chimică se montează conform fișei tehnice a producătorului de ancoraj (adâncime de înglobare, timp de întărire a rășinii înainte de aplicarea sarcinii), cu cuplu de strângere final verificat cu cheie dinamometrică și consemnat în fișa de montaj — fază determinantă, dat fiind rolul dublu al ancorajului (rezistență seismică conform memoriul de structură și protecție mecanică împotriva deteriorării celulelor prin abuz mecanic, DTAC §1.1). Legarea la priza de pământ (poz. 5) se execută la fiecare container individual, indiferent de continuitatea mecanică prin platformă.

### D02 — Detaliu montaj rack și cablare bus DC interior container — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Rack de baterii | 50 module (2 șiruri × 25 module serie), fixat pe șina de bază a containerului | conform fișa constructivă a producătorului, ≈ 250 kWh/rack, bus 1.250 V DC |
| 2 | Contactor/întreruptor DC de rack | comandat de RBMS, izolare individuală a rack-ului | conform curent nominal + curent de scurtcircuit declarat de producătorul celulei |
| 3 | Fuzibil DC rapid de rack | protecție la scurtcircuit intern | calibru ≥ 1,25×I_nominal rack (§PTh-I.4.2), caracteristică ultrarapidă |
| 4 | Cablu de legătură rack–bus comun | conductor de polaritate + și − | Cu 95 mm² (§PTh-I.4.2), izolație 1.500 V DC |
| 5 | Bară de bus DC comun container | colectează toate rack-urile spre PCS | Cu, secțiune conform §PTh-I.4.2 |
| 6 | CMU/RBMS — cablare de instrumentație | vezi D03 | cablu ecranat, separat fizic de circuitul de forță |

**Cerințe de execuție și toleranțe.** Rack-urile se fixează pe șina de bază a containerului conform planului de poziții al producătorului (numerotare RK-01…08 per container, coerentă cu schema monofilară de execuție), cu verificarea cuplului de strângere al fiecărui punct de fixare mecanică. Conectarea electrică rack–bus comun se face **numai** după verificarea polarității și a tensiunii de mers în gol a fiecărui rack (măsurată cu multimetru DC de categorie adecvată, tensiune de test 1.250 V DC nominal), înainte de închiderea contactorului de rack — o inversare de polaritate netratată la acest stadiu poate deteriora ireversibil electronica de putere a PCS-ului la prima punere sub tensiune. Cablul de legătură (poz. 4) se pozează cu rază minimă de curbură conform fișei producătorului de cablu (uzual ≥ 8× diametrul exterior pentru cabluri DC de secțiune mare), fără solicitări de tracțiune la borne. Fiecare rack se etichetează individual (RK-xx, container CNT-xx) la ambele capete ale cablului, coerent cu D20.

### D03 — Detaliu cablare instrumentație CMU/RBMS — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Cell Monitoring Unit (CMU) | placă de monitorizare tensiune/temperatură per modul | montată pe fiecare modul, conform fișa producătorului |
| 2 | Cablu de instrumentație CMU–RBMS | bus de comunicație intern rack | cablu ecranat torsadat, conform protocol producător (CAN/RS485 propietar) |
| 3 | RBMS (Rack Battery Management System) | agregă datele CMU, comandă contactorul de rack | montat la capătul rack-ului, conform fișa producătorului |
| 4 | Traseu de cablare instrumentație | separat fizic de cablurile de forță DC | canal dedicat, distanță minimă recomandată ≥ 100 mm față de cablul de forță, sau ecranare suplimentară |
| 5 | Monitor de izolație (IMD) | măsoară rezistența de izolație bus DC–masă | montat la nivelul rack-ului/containerului, conform DTAC §4.7 |

**Cerințe de execuție și toleranțe.** Separarea fizică a cablării de instrumentație (semnal de ordinul milivolți la nivel de celulă) de cablurile de forță DC (curenți de ordinul sutelor de amperi) este o cerință de execuție critică, nu doar de bună practică — cuplajul electromagnetic indus de comutația de putere poate perturba citirile CMU-urilor, generând alarme false sau, mai grav, mascând o citire reală de temperatură/tensiune anormală. Toate conexiunile de instrumentație se execută cu conectori pre-asamblați/certificați de producătorul sistemului (nu se admit înnădiri improvizate pe șantier ale cablurilor de comunicație internă a bateriei). Fiecare rack se verifică, la finalul cablării, prin citirea individuală a tensiunii tuturor celulelor la nivelul interfeței RBMS, comparată cu limitele de fereastră declarate (2,5–3,65 V/celulă, DTAC §4.1) — o citire lipsă sau aberantă indică un defect de cablare a instrumentației, remediat înainte de trecerea la proba următoare.

### D04 — Detaliu întreruptor/contactor DC principal container și buton de oprire de urgență (E-stop) — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Contactor/întreruptor DC principal container | izolare bus DC comun–PCS, comandat de Container Controller | conform curent nominal container (§PTh-I.4.2), certificare DC |
| 2 | Buton E-stop exterior | acționare manuală, vizibil și accesibil fără intrare în incintă | montat pe fiecare față de acces a containerului, IP65 |
| 3 | Cablare E-stop către Container Controller/BMS Master | circuit de siguranță, redundant (dublă cale) | cablu de securitate, categorie funcțională conform SIL/PL cerut |
| 4 | Etichetă „E-STOP — OPRIRE DE URGENȚĂ CONTAINER" | identificare rapidă în situație de urgență | gravată/fotoluminiscentă |
| 5 | Contact auxiliar de semnalizare stare | raportare stare (normal/E-stop activ) către SCADA | conform DTAC §14.3 |

**Cerințe de execuție și toleranțe.** Butonul de E-stop se montează pe **fiecare** față de acces a containerului (minimum 2 puncte per unitate), la o înălțime accesibilă fără scară (0,80–1,20 m), fără obstrucții. Circuitul de E-stop se cablează pe o cale independentă de rețeaua de comunicație standard BMS/SCADA (principiul de redundanță din DTAC §1.6), astfel încât o defecțiune a rețelei de date să nu compromită funcția de oprire de urgență. Testarea funcțională a E-stop-ului (verificarea că acționarea comandă simultan deconectarea PCS-ului și deschiderea tuturor contactoarelor DC de rack ale containerului respectiv, conform DTAC §13.4) se execută obligatoriu la PIF, prin simulare controlată, și se repetă periodic conform programului de mentenanță (§PTh-I.12).

### D05 — Detaliu șanț cablu DC/AC de joasă tensiune între containere/PCS/PT — secțiune tip — scara 1:20

| Poz. | Element | Descriere | Dimensiune |
|---|---|---|---|
| 1 | Adâncime de pozare | de la cota terenului amenajat la generatoarea superioară a cablului | 0,80 m (conform NTE 007/08/00, trafic pieton/utilaj ușor) |
| 2 | Pat de nisip inferior | strat de protecție mecanică sub cablu | 0,10 m, nisip cernut fără corpuri dure |
| 3 | Cablu(ri) DC/AC | 1…n cabluri paralele, distanță între ele | ≥ 1× diametru cablu (evitarea încălzirii reciproce) |
| 4 | Pat de nisip superior | acoperire directă a cablului | 0,10 m |
| 5 | Bandă de semnalizare | avertizare la săpături ulterioare | PVC galben „ATENȚIE CABLU ELECTRIC", la 0,30 m deasupra cablului |
| 6 | Umplutură compactată | strat de pământ excavat, compactat pe straturi | 0,95–1,00 m rest până la cotă, compactare 95 % Proctor |
| 7 | Lățime șanț | funcție de numărul de cabluri | 0,50 m (2–4 cabluri DC/container) … 1,00 m (fascicule multiple, traseu de colectare) |

**Cerințe de execuție și toleranțe.** Adâncimea minimă de 0,80 m se majorează la 1,00 m la traversarea drumurilor de incintă (trafic utilaje grele, inclusiv utilajul de manevră a containerelor la montaj) și se reduce la 0,60 m doar pe trasee interioare protejate suplimentar prin tub rigid — abateri se admit doar cu acordul proiectantului. Cablurile DC ale fiecărui container se pozează în șanț dedicat sau grupate cu marcaj individual de identificare (CNT-xx), pentru a permite izolarea rapidă a unui container la o eventuală intervenție viitoare. Compactarea umpluturii se verifică prin încercare Proctor la fiecare 200 m liniari sau la schimbarea tipului de sol; abaterea admisă a gradului de compactare: ≥ 95 % din Proctor normal. Traseul se relevă topografic (as-built) înainte de acoperire — fază determinantă.

### D06 — Detaliu șanț cablu MT 20 kV — secțiune tip — scara 1:20

| Poz. | Element | Descriere | Dimensiune |
|---|---|---|---|
| 1 | Adâncime de pozare | generatoarea superioară a cablului MT | 1,00 m (teren agricol/tehnologic), 1,20 m sub drumuri |
| 2 | Pat de nisip inferior | protecție mecanică | 0,10 m |
| 3 | Cablu MT A2XS(F)2Y 12/20 kV | 1 circuit trifazat (3 cabluri unipolare, trefoil) | secțiune conform breviar (§PTh-I.4.4) |
| 4 | Distanță între faze | evitarea încălzirii reciproce și a forțelor electrodinamice | ≥ 1× diametrul cablului, în trefoil |
| 5 | Pat de nisip superior | acoperire | 0,10 m |
| 6 | Dală de protecție mecanică | protecție suplimentară obligatorie la MT | dale prefabricate din beton, lățime ≥ lățimea șanțului + 0,10 m fiecare parte |
| 7 | Bandă de semnalizare MT | avertizare specifică medie tensiune | PVC roșu „ATENȚIE CABLU MEDIE TENSIUNE", la 0,30 m deasupra dalei |
| 8 | Umplutură compactată | pământ excavat compactat pe straturi de 20 cm | rest până la cotă, compactare ≥ 95 % Proctor |

**Cerințe de execuție și toleranțe.** Dala de protecție mecanică din beton este **obligatorie** pe toată lungimea cablului MT, protejând împotriva perforării accidentale la săpături ulterioare, cu risc letal la MT. Raza minimă de curbură a cablului MT la pozare: **15× diametrul exterior**; nerespectarea produce microfisuri în izolație, cauză de defect întârziat. Tragerea cablului se face cu efort de tragere sub limita admisă de producător, fără torsionare. La joncțiuni și terminale se respectă strict tehnologia și timpii de întărire a rășinii/mansonului termocontractabil, executați exclusiv de personal atestat pentru cabluri MT.

### D07 — Detaliu subtraversare drum tehnologic — cablu în tub de protecție — scara 1:20

| Poz. | Element | Descriere | Dimensiune |
|---|---|---|---|
| 1 | Tub de protecție | PVC/PEHD rigid, pentru trecerea cablului sub drum | Ø 160–200 mm, funcție de nr. cabluri |
| 2 | Adâncime sub drum | de la cota căii de rulare la generatoarea superioară a tubului | ≥ 1,00 m (JT) / ≥ 1,20 m (MT) |
| 3 | Cămin de capăt | acces la fiecare cap al subtraversării, pentru tragere/verificare | beton prefabricat, cu capac carosabil dacă e în zona de trafic al utilajelor de montaj |
| 4 | Fir de tragere de rezervă | rămâne în tub după pozarea cablului, pentru intervenții viitoare | poliamidă, capăt la ambele camine |

**Cerințe de execuție și toleranțe.** Numărul și diametrul tuburilor se dimensionează cu o rezervă de minimum 30 % față de necesarul imediat, pentru extinderi ulterioare (cablu suplimentar, fibră optică SCADA/PSI). Tuburile se pozează cu pantă continuă și se etanșează la capete după tragerea cablului, pentru a împiedica pătrunderea rozătoarelor și a apei — relevant suplimentar la un amplasament cu cablare extinsă de instrumentație de siguranță (detecție de gaz, cap. D16).

### D08 — Detaliu cămin de tragere/vizitare cablu MT — scara 1:20

| Poz. | Element | Descriere | Dimensiune |
|---|---|---|---|
| 1 | Corp cămin | beton prefabricat sau turnat monolit, cu ramă și capac | interior util ≥ 1,00×1,00×1,20 m |
| 2 | Capac | carosabil (dacă e în zona de circulație) sau necarosabil, cu inscripția „ELECTRIC MT" | fontă/beton, clasă de rezistență conform amplasare |
| 3 | Console de sprijin cablu | susțin bucla de rezervă de cablu în interiorul căminului | oțel zincat sau plastic, interax 0,50 m |
| 4 | Sistem de drenaj | evacuarea infiltrațiilor | strat drenant 0,20 m |
| 5 | Bornă de împământare | continuitatea ecranului cablului, legată la priza de pământ | Cu 25 mm² |

**Cerințe de execuție și toleranțe.** Căminele se amplasează la maximum 80–100 m distanță pe traseul MT dintre transformator și punctul de racordare (PMD/OD) și obligatoriu la fiecare schimbare de direcție cu unghi > 30° și la fiecare joncțiune/terminal. Bucla de rezervă de cablu lăsată în cămin: minimum 1,5 m per cap.

### D09 — Detaliu priză de pământ — electrod vertical și conductor de contur — scara 1:10 (secțiune) / 1:20 (plan)

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Electrod vertical (țăruș) | electrod de dispersie, baterie la interax ~8–9 m pe conturul incintei | oțel-cupru (Cu-bonded steel) sau OL-Zn, Ø 17,2 mm (⅝"), lungime 3,0 m |
| 2 | Conductor de contur (orizontal) | leagă toți electrozii și fiecare container/PT | platbandă OL-Zn 40×4 mm sau conductor Cu funie 50 mm², la −0,8 m |
| 3 | Piesă de legătură electrod–conductor | îmbinare mecanică cu strat anticoroziv | clemă bimetalică sau sudură exotermică (preferată la PT/MT) |
| 4 | Priză de măsură | punct demontabil pentru măsurarea R_p fără deconectarea instalației | cutie de vizitare, cu bornă de separare |
| 5 | Legătură la carcasa containerului | fiecare container se leagă individual la conductorul de contur | Cu 25 mm², conform D01 poz. 5 |

**Cerințe de execuție și toleranțe.** Conform breviarului §PTh-I.4.9: la rezistivitate de calcul ρ = 100 Ω·m, un electrod de 3 m dă R_e ≈ 34,7 Ω; pentru ținta **R_p ≤ 1 Ω** (cu factor de utilizare η ≈ 0,7) rezultă necesarul de **≈ 50 electrozi** legați în paralel prin conductorul de contur — valoare mai restrictivă decât la o instalație electrică obișnuită (unde 4–10 Ω pot fi acceptabile), justificată de nivelul de tensiune (MT, 20 kV) și de necesitatea unei referințe de pământ de calitate pentru electronica sensibilă a BMS/EMS/SCADA (DTAC §8.1). Pentru platforma tehnologică de referință (≈ 150×60 m util, containere + PT + drum tehnologic + împrejmuire, perimetru ≈ 420 m), spațierea rezultată este de **~8,4 m/electrod** — mai densă decât la un parc fotovoltaic de suprafață mare, unde spațierea uzuală este de ~12 m, tocmai din cauza suprafeței compacte pe care trebuie dispersați cei ~50 electrozi necesari. **Valoarea rezistivității solului (ρ) este o ipoteză de calcul preliminară — se confirmă obligatoriu prin măsurare Wenner pe amplasament**; dacă rezistivitatea reală diferă semnificativ, numărul de electrozi/spațierea se recalculează înainte de execuție. Adâncimea de batere a electrodului: minimum 2,5 m sub cota terenului finit. Sudura exotermică (obligatorie la priza PT/MT) se execută doar de personal instruit.

### D10 — Detaliu legare echipotențială container–structură–conductor de contur — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Carcasă/șasiu container | punct de legare la priza de pământ, prin șurub dedicat de împământare | șurub M10-M12 inox + șaibă dințată, sau clemă tip „lay-in lug" |
| 2 | Conductor de legare carcasă–contur | continuitate electrică container–masă generală | Cu 25 mm², conform D01/D09 |
| 3 | Punct de măsură continuitate | acces pentru verificarea R < 0,1 Ω | pe fiecare container, la baza carcasei |
| 4 | Legătură la anvelopa PT și la împrejmuirea metalică | continuitate integrală a tuturor maselor metalice ale amplasamentului | conform D09, la interax ≤ 20 m pe împrejmuire |

**Cerințe de execuție și toleranțe.** Fiecare container se leagă electric la priza de pământ printr-un punct dedicat (nu se admite continuitate „prin frecare" a buloanelor de ancorare — acestea nu garantează contact electric pe termen lung din cauza coroziunii/vibrației). Legătura se verifică prin măsurarea rezistenței de continuitate: valoare admisă **< 0,1 Ω** între carcasa oricărui container și punctul de legare la priza de pământ. Se interzice folosirea vopselei de protecție a carcasei ca strat izolator sub punctele de legare — acestea se curăță local (răzuire) înainte de montarea clemei.

### D11 — Detaliu montaj paratrăsnet (tijă de captare + coborâre) pe postul de transformare și pe containere — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Tijă de captare | dispozitiv de captare, poziționat conform metodei sferei rotative, funcție de LPL adoptat (§PTh-I.4.10) | oțel inox sau OL-Zn, înălțime 1,0–3,0 m peste cota structurii protejate |
| 2 | Suport tijă | fixare rigidă pe structura/acoperișul PT sau pe stâlpi dedicați care domină grupul de containere | consolă metalică, ancorată în structura de rezistență |
| 3 | Conductor de coborâre | traseu vertical cel mai scurt, minimum 2 coborâri pentru redundanță pe fiecare structură protejată | platbandă OL-Zn 25×4 mm sau conductor rotund Ø 8 mm, fixat la interax ≤ 1,0 m |
| 4 | Piesă de separație (întrerupător de măsură) | permite deconectarea coborârii de priza de pământ pentru măsurarea R_p | la înălțime accesibilă (≈ 1,5–2,0 m), cu capac de protecție |
| 5 | Legătură la priza de pământ | conectare la conductorul de contur/priza generală | conform D09, sudură exotermică preferată |

**Cerințe de execuție și toleranțe.** Nivelul de protecție adoptat pentru instalația BESS este **LPL II** (mai strict decât LPL III uzual la un parc fotovoltaic de suprafață, dat fiind riscul agravat de conținut energetic ridicat, DTAC §8.2 și §PTh-I.4.10), cu rază a sferei rotative de 30 m — poziția tijelor se stabilește prin această metodă astfel încât întregul volum al PT și al containerelor să fie în zona protejată, nu la estimare. Containerele metalice, dat fiind conductivitatea proprie a carcasei, pot participa la sistemul de captare/coborâre conform SR EN 62305-3, dacă grosimea tablei carcasei respectă pragul minim al standardului pentru a evita perforarea (verificare la faza PT cu fișa constructivă a producătorului) — în caz contrar, se prevăd tije de captare dedicate montate pe structuri independente care domină grupul de containere. **Modulele/rack-urile din interiorul containerului NU se folosesc ca element de captare** — protecția lor este asigurată exclusiv prin echipotențializare (D10) și prin cascada de SPD (D13), nu prin captare directă.

### D12 — Detaliu fundație/platformă post de transformare + cuvă de retenție ulei — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Radier de fundație | placă din beton armat sub anvelopa PT | beton C25/30, armare conform breviarul de structură |
| 2 | Platformă tehnologică | zonă betonată perimetrală, acces manevră/mentenanță | beton C20/25, pantă de scurgere 1,5 % spre rigolă |
| 3 | Cuvă de retenție ulei | volum ≥ 100 % din volumul de ulei al transformatorului (dacă variantă în ulei) | beton impermeabilizat sau tavă metalică |
| 4 | Strat de pietriș în cuvă | stingerea eventualei aprinderi a uleiului scurs | piatră spartă, granulație 40–60 mm, grosime 0,20 m |
| 5 | Rigolă perimetrală | colectarea apelor pluviale de pe platforma PT, către rețeaua separată (D19, distinctă de bazinul de retenție a apelor de stingere containere) | beton prefabricat, cu separator de hidrocarburi |
| 6 | Priză de fundare | electrozi înglobați în radier, integrați în priza de pământ generală | conform D09, legați la armătura radierului |

**Cerințe de execuție și toleranțe.** Cuva de retenție a uleiului este obligatorie la transformatoarele în ulei și se dimensionează la minimum 100 % din volumul total de ulei declarat de producător. Impermeabilizarea cuvei se verifică prin probă cu apă (umplere și menținere 24 h, fără scădere de nivel) — fază determinantă. Toleranța de planeitate a radierului: ± 5 mm/m.

### D13 — Detaliu montaj SPD — DC (container/PCS), AC (TGJT), MT (celule) — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | SPD DC tip 2 (la bus container, lângă intrarea PCS) | montaj pe șină DIN, conexiune „în Y" (pol+ și pol− la PE, prin varistoare separate) | U_c ≥ 1.500 V DC clasă, I_n(8/20) ≥ 20 kA |
| 2 | SPD AC tip 1+2 (ieșire PCS/TGJT) | protecție la supratensiuni de origine atmosferică indirectă și de comutație | conform §PTh-I.4.7 |
| 3 | SPD MT (descărcător ZnO, la sosirea LES și la bornele trafo) | protecție echipament MT | U_c ≈ 24 kV, I_n ≥ 10 kA |
| 4 | Conductor de legătură SPD–PE | cât mai scurt posibil (< 0,5 m recomandat) | Cu 6–16 mm² funcție de nivel, fără bucle |
| 5 | Contact de semnalizare defect | conectat la SCADA, indică epuizarea SPD | contact auxiliar N.C./N.O. conform producător |

**Cerințe de execuție și toleranțe.** Lungimea conductoarelor de legătură ale SPD-ului se menține cât mai scurtă, deoarece orice lungime suplimentară introduce o inductanță care ridică tensiunea reziduală efectiv văzută de echipamentul protejat. Montajul „în Y" pe partea DC respectă strict configurația impusă de arhitectura IT flotantă a bus-ului DC (DTAC §4.7), pentru a evita curenți de fugă permanenți care ar declanșa fals monitorul de izolație. Contactul de semnalizare a defectului fiecărui SPD se cablează obligatoriu la SCADA — un SPD epuizat rămâne fizic montat, dar nu mai protejează, motiv pentru care semnalizarea de la distanță este singura modalitate practică de a-l detecta pe o instalație cu zeci de puncte de protecție.

### D14 — Detaliu montaj celule MT în anvelopa postului de transformare — plan de echipare — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Celulă de sosire/racord | separator de sarcină + cuțit de legare la pământ (CLP) | 24 kV, conform curent nominal §PTh-I.4.4 |
| 2 | Celulă de măsură | TT + TC clasă 0,2S/0,5S, sigilată de OR | conform ATR |
| 3 | Celulă de protecție trafo | întreruptor în vid + relee numerice | 24 kV, conform §PTh-I.4.4/I.4.5 |
| 4 | Covor electroizolant | protecția personalului la manevre | cauciuc electroizolant, clasă conform tensiune |
| 5 | Interlock mecanic celulă–ușă anvelopă | previne accesul cu celula sub tensiune | conform sistemul de blocare al producătorului |

**Cerințe de execuție și toleranțe.** Ordinea și dispunerea celulelor respectă schema monofilară aprobată prin proiectul de racordare (avizat de OD); orice modificare de dispunere față de proiect necesită re-aviz. Celulele sunt module prefabricate testate în fabrică, montate „la cheie" — distanțele de izolație și liniile de fugă nu se execută pe șantier. Interlock-ul mecanic celulă–ușă se testează funcțional la PIF.

### D15 — Detaliu montaj panouri de decompresie (ventilație de deflagrație) pe anvelopa containerului — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Panou de decompresie | element de anvelopă proiectat să cedeze controlat la p_stat (§PTh-I.4.13) | panou certificat conform NFPA 68/EN 14994, dimensiune conform fișa producătorului de container |
| 2 | Cadru de fixare pe anvelopa containerului | rezistă la solicitările normale (vânt, presiune HVAC), cedează la p_stat calculat | conform fișa constructivă |
| 3 | Direcție de eliberare | orientată spre zonă sigură, departe de căile de circulație și de containerele adiacente | conform planul de situație, distanțe de siguranță (DTAC §13.2) |
| 4 | Etichetă „ATENȚIE — VENTILAȚIE DE DEFLAGRAȚIE — NU OBSTRUCȚIONAȚI" | avertizare a personalului de mentenanță/intervenție | gravată/rezistentă UV |

**Cerințe de execuție și toleranțe.** Numărul și amplasarea panourilor pe fiecare container se stabilesc conform fișei constructive a producătorului (containerele BESS certificate UL 9540/9540A au, de regulă, panouri de decompresie integrate din fabrică, pretestate pentru presiunea statică de deschidere adoptată) — pe șantier se verifică **exclusiv** integritatea la livrare, orientarea corectă a direcției de eliberare conform planului de situație și absența oricărei obstrucții (vegetație, alte structuri, echipamente montate ulterior) în raza de eliberare a suprapresiunii. Se interzice montarea oricărui echipament, cablu sau structură auxiliară în zona de eliberare proiectată a panoului. Verificarea absenței obstrucțiilor se repetă la fiecare intervenție de mentenanță care implică montaj de echipamente noi în vecinătatea containerului.

### D16 — Detaliu montaj sistem de detecție gaz H₂/CO și rețea aspirativă de fum (VESDA) — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Senzor de gaz H₂/CO | montat la partea superioară a incintei (hidrogenul se acumulează preferențial acolo, DTAC §10.2) | electrochimic/semiconductor, conform fișa producătorului, minimum 2 puncte/container |
| 2 | Rețea de conducte de eșantionare VESDA | aspiră continuu probe de aer către unitatea centrală de analiză | tub conform fișa producătorului, distribuit pe lungimea containerului |
| 3 | Unitate centrală de analiză (VESDA) | analiză optică prin dispersie laser, sensibilitate superioară detecției punctuale | montată în zonă accesibilă pentru mentenanță (schimbare filtru) |
| 4 | Cablu liniar de detecție termică (LHD) | montat deasupra rack-urilor, pe toată lungimea incintei | conform fișa producătorului, DTAC §10.4 |
| 5 | Cablare către centrala de semnalizare P118-3 | integrare cu logica de alarmare graduală | cablu rezistent la foc, conform categoria de sistem |

**Cerințe de execuție și toleranțe.** Amplasarea exactă a senzorilor de gaz și a rețelei de eșantionare respectă recomandările producătorului containerului, validate de regulă prin testarea UL 9540A specifică propriului design de rack (DTAC §10.2). Rețeaua de conducte de eșantionare se pozează cu pantă care evită acumularea de condens, iar lungimea totală a rețelei per unitate centrală nu depășește limita declarată de producător pentru timpul de transport al probei (parametru critic pentru viteza de detecție). Cablurile de detecție/alarmare se pozează pe trasee separate de cele de forță, conform D02 poz. 4/D03 poz. 4, și se protejează termic la traversarea eventualelor compartimentări (D19/§PTh-I.7.3). Toate senzorii se verifică individual, la PIF, prin injecție de gaz de test (concentrație cunoscută, sub pragul de acționare a sistemului de stingere) sau prin simularea electrică a semnalului de prag, conform protocolul producătorului — nu se testează prin generarea reală a unei condiții de ambalare termică.

### D17 — Detaliu montaj sistem de stingere cu agent aerosol condensat/gaz inert — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Cilindru/generator de agent (aerosol condensat sau gaz inert) | stocare presurizată a agentului, conform fișa producătorului | montat conform prevederile ISCIR aplicabile (§PTh-I.8.4), dacă p×V depășește pragul de exceptare |
| 2 | Rețea de conducte de distribuție | distribuie agentul către duzele de descărcare | conform fișa producătorului |
| 3 | Duze de descărcare | poziționate conform calculul de acoperire al producătorului | montate deasupra/lateral rack-urilor, conform plan de acoperire |
| 4 | Panou de comandă a stingerii | primește semnal de la centrala P118-3, comandă descărcarea automată | conform DTAC §11.2 |
| 5 | Contact de întrerupere alimentare la descărcare | izolează electric containerul înainte/simultan cu descărcarea agentului | interfață cu E-stop (D04) |

**Cerințe de execuție și toleranțe.** Montajul cilindrilor/generatorilor de agent respectă strict fișa producătorului privind poziția, fixarea antiseismică (relevantă suplimentar la un amplasament din clasa de importanță/expunere seismică III, DTAC/general §2.2) și accesul pentru verificare periodică. Rețeaua de conducte se dimensionează și se pozează conform calculul hidraulic/pneumatic al producătorului sistemului, fără modificări pe șantier ale traseului certificat. Sistemul se pune în funcțiune cu verificarea funcțională a lanțului de comandă (semnal detecție → panou de comandă → contact de descărcare) **fără declanșarea reală a agentului** (test „la gol", cu izolarea fizică a duzelor sau cu simulare electrică a comenzii finale, conform protocolul producătorului) — descărcarea reală a unui sistem cu unică folosință nu se testează la PIF.

### D18 — Detaliu montaj sistem exterior de răcire cu apă pulverizată (drencer) — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Rețea de conducte drencer | distribuie apa către duzele de pulverizare exterioare containerului | oțel zincat/inox, dimensionată conform §PTh-I.4.12 |
| 2 | Duze de pulverizare | acoperă suprafața exterioară a fiecărui container și a containerelor adiacente | conform debitul specific de proiect (l/min/m²) |
| 3 | Vană automată de sector | permite activarea selectivă doar a containerului afectat + adiacente, evitând golirea rezervei pe întreaga instalație | comandată de centrala P118-3 |
| 4 | Grup de pompare de incendiu | asigură presiunea și debitul necesar, alimentat din sursa electrică de siguranță (DTAC §15) | conform debit/presiune calculate §PTh-I.4.12 |
| 5 | Rezervor de apă tehnologică dedicat | rezervă separată de apa potabilă (DTAC §16.1) | volum conform §PTh-I.4.12 |

**Cerințe de execuție și toleranțe.** Rețeaua de conducte se pozează cu pantă de golire (evitarea înghețului pe timp de iarnă la porțiunile expuse), cu vane de sector care permit izolarea unei ramuri pentru mentenanță fără a compromite disponibilitatea restului sistemului. Duzele se orientează conform planul de acoperire al proiectantului PSI, verificat prin test hidraulic la debit nominal (fără activarea automată reală în timpul probei, ci prin comandă manuală de test) înainte de PIF final. Grupul de pompare se verifică la pornire automată pe semnal simulat de incendiu, cu cronometrarea timpului de la semnal la debitul nominal la duze.

### D19 — Detaliu bazin de retenție ape de stingere contaminate + rigolă platformă containere — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Platformă containere | pantă de scurgere dirijată către rigola perimetrală | beton, pantă ≥ 1,5 % spre rigolă |
| 2 | Rigolă perimetrală platformă containere | colectează apa de pe platformă (pluvială + eventual de stingere) | beton prefabricat, distinctă de rigola PT (D12 poz. 5) |
| 3 | Bazin de retenție dedicat | colectează integral apele de stingere/răcire contaminate | beton impermeabilizat, volum conform §PTh-I.4.12 |
| 4 | Vană de izolare | separă bazinul de orice rețea de canalizare publică/emisar, în regim normal închisă | conform DTAC §11.5/§16.3 |
| 5 | Punct de vidanjare/prelevare probă | golire controlată după evenimente, cu tratare/eliminare ca deșeu conform reglementărilor de mediu | conform DTAC §11.5 |

**Cerințe de execuție și toleranțe.** Impermeabilizarea bazinului de retenție se verifică prin probă cu apă (umplere și menținere 48 h, fără scădere de nivel) — fază determinantă, dat fiind riscul de mediu în cazul unei fisuri netratate. Vana de izolare (poz. 4) rămâne **permanent închisă** în regim normal de funcționare, deschiderea fiind o operațiune manuală controlată, exclusiv pentru vidanjare programată — se interzice explicit orice conexiune permanentă/automată între bazinul de retenție și rețeaua de canalizare menajeră sau pluvială generală a amplasamentului (DTAC §16.3). Panta platformei containerelor se verifică topografic înainte de recepție, confirmând dirijarea integrală a scurgerilor către rigola dedicată, fără puncte joase care ar reține apa contaminată pe platformă.

### D20 — Detaliu etichetare, marcaj, pancarte de securitate și stâlp CCTV/iluminat perimetral — scara 1:5/1:10

| Poz. | Element | Descriere | Standard / format |
|---|---|---|---|
| 1 | Etichetă container/rack/PCS | cod unic (CNT-xx/RK-xx/PCS-xx) la fiecare unitate și la ambele capete ale cablurilor | rezistentă UV, inscripție permanentă |
| 2 | Pancartă „PERICOL — RISC DE INCENDIU LI-ION — ACCES INTERZIS PERSONAL NEAUTORIZAT" | pe fiecare container | conform marcaj normalizat de securitate |
| 3 | Pancartă „PERICOL DE ELECTROCUTARE — MEDIE TENSIUNE" | pe anvelopa PT și pe împrejmuirea din jur | conform PE 118, vizibilă de la distanță |
| 4 | Stâlp CCTV/iluminat perimetral + fundație | susține corp iluminat + cameră, conform DTAC §17.3-17.4 | oțel zincat, înălțime 4–6 m, fundație beton |
| 5 | Schema monofilară actualizată | afișată în interiorul PT/camerei de comandă | ramă rezistentă, actualizată la fiecare modificare |

**Cerințe de execuție și toleranțe.** Etichetarea se execută înainte de PIF și se verifică 100 % la recepție — fiecare container, fiecare rack, fiecare cablu poartă un identificator unic, coerent cu schema as-built și cu baza de date SCADA/BMS. Pancartele de securitate specifice riscului Li-ion (poz. 2) se montează pe fiecare container, în puncte vizibile de la distanța de citire normată, cu materiale rezistente UV. Stâlpii de iluminat/CCTV se leagă individual la priza de pământ generală (D09), fără stâlpi „flotanți", și se verifică la răsturnare sub acțiunea vântului conform SR EN 1991-1-4.

---

## PTh-I.3. Specificații tehnice de montaj (fișe pe activitate)

### PTh-I.3.1. Montajul și ancorarea containerelor

Containerele se livrează complet echipate din fabrică (module, rack-uri, PCS dacă integrat, HVAC, sisteme de detecție/stingere, cablare internă) și testate electric la producător — pe șantier se execută exclusiv manevrarea, ancorarea (D01) și racordurile de interfață (DC/AC extern, comunicație, alimentare auxiliară). Manevrarea containerului (greutate echipată ≈ 30–36 t pentru unitatea de 2 MWh a exemplului de referință) se realizează cu macara/utilaj de ridicare autorizat ISCIR (PT R1-2010), cu personal deservent (macaragiu) și legători de sarcină autorizați, respectând planul de manevră al furnizorului (§PTh-I.8.4). Ordinea de amplasare pe platformă urmează planul de situație (distanțe de siguranță conform DTAC §13.2), cu verificarea nivelării fiecărui container înainte de fixarea definitivă a ancorajelor.

### PTh-I.3.2. Montajul rack-urilor și cablarea busului DC

Dacă rack-urile nu sunt pre-instalate din fabrică (variantă cu montaj final pe șantier, funcție de logistica de transport), montajul urmează D02–D03: fixare mecanică, verificare polaritate/tensiune per rack înainte de conectarea la bus, cablare de instrumentație pe traseu separat de cablarea de forță. Fiecare rack finalizat se verifică imediat, înainte de închiderea contactorului către bus-ul comun, prin măsurarea tensiunii de mers în gol — o citire anormală (abatere semnificativă față de valoarea calculată pentru numărul de module și configurația serie/paralel a rack-ului) indică o eroare de montaj (modul lipsă, polaritate inversată, conexiune întreruptă) și se remediază **înainte** de a continua cu rack-urile următoare.

### PTh-I.3.3. Montajul PCS

PCS-urile (1 MW/unitate, referință) se montează pe suport dedicat conform fișa producătorului (piedestal metalic în interiorul/adiacent containerului, funcție de arhitectura constructivă), la o cotă care exclude inundarea locală și cu spațiu de disipare termică conform fișei producătorului. Racordurile DC și AC se execută cu cuplu conform fișă; contactorul/separatorul DC de container (D04) se testează funcțional înainte de prima punere sub tensiune. Configurarea parametrilor de rețea (grid-following/grid-forming, curbele RfG, §PTh-I.8.2) se face de personal atestat, cu acces protejat prin parolă, iar setările finale se listează și se atașează la cartea tehnică.

### PTh-I.3.4. Montajul postului de transformare

Anvelopa PT (prefabricată) se transportă și se așează pe fundația recepționată (D12) cu utilaj de ridicare adecvat greutății (transformator 12,5 MVA în ulei: câteva zeci de tone; anvelopă de beton: greutate suplimentară semnificativă) — se respectă strict planul de manevră al furnizorului. Nivelarea anvelopei pe fundație: toleranță ≤ 2 mm/m. Racordurile MT și JT se execută prin treceri etanșe prevăzute în anvelopă; etanșarea finală se verifică vizual și, dacă e cazul, prin testul de etanșeitate al producătorului anvelopei.

### PTh-I.3.5. Montajul prizei de pământ și al paratrăsnetului

Execuția urmează D09 (priză) și D11 (paratrăsnet). Bararea/înfigerea electrozilor se face mecanic (ciocan hidraulic/vibrator), fără forțare care ar putea îndoi electrodul. Toate îmbinările electrod-conductor și conductor-conductor din priza generală se execută prin cleme mecanice de calitate sau sudură exotermică, cu protecție anticorozivă ulterioară. Continuitatea întregii rețele de împământare (contur + toate legăturile la containere/PT/structuri) se verifică prin măsurare punct-cu-punct înainte de acoperirea conductorului de contur — fază determinantă.

### PTh-I.3.6. Montajul sistemelor HVAC

Unitățile de climatizare (montate din fabrică pe container, în configurație N+1, DTAC §9.3) se verifică la recepție privind integritatea transportului și conformitatea agentului frigorific cu reglementarea F-gas (DTAC §9.4, cantitate încărcată documentată în fișa tehnică). Racordurile electrice ale unităților HVAC la tabloul de servicii proprii al containerului se execută conform schema producătorului, cu verificarea funcțională a fiecărei unități în regim de test (pornire, atingere setpoint, comutare între unitatea „lider" și cea de rezervă) înainte de PIF.

### PTh-I.3.7. Montajul sistemelor de detecție și de stingere

Execuția urmează D16 (detecție gaz/fum/termic) și D17–D18 (stingere aerosol/gaz inert + drencer exterior). Toate componentele de securitate la incendiu se montează exclusiv conform fișele constructive ale producătorului certificat (UL 9540/NFPA 855), fără modificări de poziționare a senzorilor/duzelor față de configurația validată, dat fiind că poziționarea este, de regulă, rezultatul direct al testării UL 9540A a producătorului (DTAC §13.1). Integrarea electrică a tuturor componentelor cu centrala de semnalizare P118-3 se verifică punct cu punct, cu test de comunicație pe fiecare senzor/actuator, înainte de PIF general.

### PTh-I.3.8. Montajul panourilor de decompresie

Verificarea conformă D15: integritatea la livrare, orientarea corectă a direcției de eliberare și absența oricărei obstrucții — nu se execută montaj/reglaj al pragului de deschidere pe șantier (parametru fixat din fabrică, conform certificarea producătorului).

### PTh-I.3.9. Montajul SCADA, BMS Master, EMS și al sistemelor de securitate fizică

Cablarea de comunicație (fibră optică backbone, DTAC §14.4) se pozează separat de circuitele de forță (distanță minimă recomandată 0,30 m paralel, sau ecranare/separare fizică în jgheab dedicat), pentru a evita interferența electromagnetică indusă de comutația PCS-urilor. Configurarea SCADA/EMS (adrese, praguri de alarmare, buclă de reglaj P/Q, algoritm de dispecerizare) se execută de personal atestat, cu test de comunicație pe fiecare echipament (container/PCS, celulă MT, contor, centrala PSI, control acces/CCTV) înainte de PIF general.

---

## PTh-I.4. Breviar complet de calcul (execuție) — toate tronsoanele reale

Breviarul de mai jos dimensionează **integral** exemplul de referință de execuție — 10 containere × 2 MWh (8 rack-uri/container × 50 module, 400 module/container, 4.000 module total), 10 PCS × 1 MW, transformator 12,5 MVA/0,69/20 kV — extinzând tabelele-formulă din DTAC (§3, §6) la fiecare tronson real, nu doar la valorile generice de referință ale sistemului agregat.

### PTh-I.4.1. Arhitectura de referință containere → rack-uri → module

| Nivel | Cantitate | Energie unitară | Energie de nivel | Tensiune |
|---|---|---|---|---|
| Modul | 4.000 total (400/container) | 5 kWh | 20.000 kWh | ~50 V |
| Rack (2 șiruri × 25 module serie) | 80 total (8/container) | 250 kWh | 20.000 kWh | 1.250 V DC |
| Container | 10 | 2.000 kWh (2 MWh) | 20.000 kWh (20 MWh) | bus 1.250 V DC / ieșire PCS 0,69 kV AC |
| PCS | 10 (1/container) | — | 1 MW/unitate → 10 MW total | 1.250 V DC → 0,69 kV AC |
| Transformator | 1 | — | 12,5 MVA | 0,69/20 kV, Dyn11 |

Configurația confirmă coerența cu breviarul DTAC §3.1 (N_module = 20.000 kWh/5 kWh = 4.000) și cu topologia distribuită recomandată la DTAC §2.4 (1 PCS/container).

### PTh-I.4.2. Dimensionarea circuitului DC — rack → bus comun container → PCS

**Curentul de rack** (la putere de container 1 MW repartizată uniform pe 8 rack-uri, bus 1.250 V):

**I_rack = P_container/(N_rack × U_bus) = 1.000.000/(8 × 1.250) = 100 A**

Se adoptă cablu **1×95 mm² Cu** per polaritate (ampacitate indicativă ≈ 200 A în jgheab interior container, conform tabelele de ampacitate NTE 007/08/00 corectate cu factorii de temperatură/grupare specifici containerului — confirmare finală cu producătorul de cablu). Fuzibilul DC de rack se dimensionează la **≥ 1,25 × 100 A = 125 A**, cu calibru adoptat 160 A (marjă suplimentară pentru vârfurile tranzitorii de încărcare/descărcare), caracteristică ultrarapidă, conform curentul de scurtcircuit declarat de producătorul celulei (§PTh-I.4.5).

**Curentul de bus comun container → PCS** (întreaga putere a containerului, 1 MW la 1.250 V):

**I_DC,container = P_container/U_bus = 1.000.000/1.250 = 800 A**

Se adoptă cablu de bus **3 × (1×240 mm²) Cu în paralel** per polaritate (secțiune efectivă 720 mm², ampacitate indicativă ≈ 350–400 A/cablu în jgheab → ≈ 1.050–1.200 A pentru cele 3 în paralel, cu marjă peste 800 A necesari). Verificarea căderii de tensiune, pentru o lungime estimată de traseu bus→PCS de 20 m (40 m dus-întors):

**ΔU = 2 × ρ × L × I/S = (2 × 0,0175 × 20 × 800)/720 = 560/720 = 0,78 V**

**ΔU% = 0,78/1.250 = 0,062 %** — valoare net inferioară pragului uzual de 1–2 % pentru circuite DC de putere, confirmând dimensionarea adoptată.

### PTh-I.4.3. Dimensionarea circuitului AC — PCS → cutie de colectare → transformator (toate cele 10 containere)

**Curentul de ieșire per PCS** (1 MW, 0,69 kV, cos φ = 0,95):

**I_AC,container = P/(√3 × U × cos φ) = 1.000.000/(1,732 × 690 × 0,95) = 1.000.000/1.135,2 = 881 A**

| Container | PCS | P (MW) | I_AC (A) | Cablu adoptat (per fază) | Lungime estimată (m) | ΔU (%) |
|---|---|---|---|---|---|---|
| CNT-01…10 | PCS-01…10 | 1,0 fiecare | 881 fiecare | 2×(1×300 mm²) Cu în paralel/fază | 15–45 (funcție de poziția în layout) | 0,10–0,29 |
| **Bară de colectare AC → transformator** | — | **10,0** | **8.810** (însumat) | busbar/cabluri multiple în paralel, dimensionate la I_scc și I_nominal (§PTh-I.4.6) | — | — |

**Formula aplicată la calculul indicativ al căderii de tensiune** (aproximare rezistivă, similară metodologiei aplicate la parcul fotovoltaic din aceeași bibliotecă, pentru un tronson reprezentativ de 15 m):

**ΔU = √3 × I × L × ρ/S = 1,732 × 881 × 15 × 0,0175/600 = 400,6/600 = 0,67 V → ΔU% = 0,67/690 = 0,097 %**

Valoare confortabil sub pragul de 1 %; pentru containerele mai îndepărtate de bara de colectare (lungime de traseu până la 45 m), căderea de tensiune se recalculează proporțional, rămânând sub prag cu secțiunea adoptată. **Curentul total la bara de colectare (≈ 8,81 kA, la funcționare simultană a tuturor celor 10 PCS la putere nominală) este dimensionant pentru arhitectura de bare/cabluri paralele a tabloului general de joasă tensiune al PT** — aspect tratat la §PTh-I.4.6.

### PTh-I.4.4. Dimensionarea circuitului de medie tensiune — transformator → celule MT → punct de racordare (PMD)

**Curentul de medie tensiune** (transformator 12,5 MVA, 20 kV):

**I_MT = S/(√3 × U) = 12.500.000/(1,732 × 20.000) = 12.500.000/34.641 = 361 A**

Pentru o distanță ipotetică transformator–punct de racordare (PMD, de confirmat prin avizul tehnic de racordare) de **400 m**, se adoptă cablu **A2XS(F)2Y 12/20 kV, 1×185 mm² Al** (3 cabluri unipolare, dispunere trefoil), cu ampacitate indicativă îngropată ≈ 360–395 A — marjă acoperitoare pentru cei 361 A calculați.

**Verificarea la scurtcircuit** (metodologie identică celei aplicate la parcul fotovoltaic al aceleiași biblioteci, S_min = I_scc × √t_d/k): cu **I_scc = 12,5 kA** (ipoteză conservatoare pentru o rețea de distribuție/stație de racordare dedicată de 20 kV, superioară ipotezei uzuale de 8 kA de la un racord obișnuit, dat fiind că un BESS de 10 MW poate necesita un punct de racordare de capacitate mai mare — **de confirmat obligatoriu prin studiul de scurtcircuit al operatorului de rețea**), t_d = 0,5 s, k = 94 (Al/XLPE):

**S_min = 12.500 × √0,5/94 = 12.500 × 0,7071/94 = 8.838,75/94 = 94,0 mm² < 185 mm² adoptat ✔**

Secțiunea de 185 mm² acoperă cu marjă atât criteriul de curent nominal, cât și criteriul de scurtcircuit.

**Căderea de tensiune pe traseul MT:**

**ΔU = √3 × I × L × ρ_Al/S = 1,732 × 361 × 400 × 0,0282/185 = 7.051,7/185 = 38,1 V**

**ΔU% = 38,1/20.000 = 0,19 %** — valoare net inferioară pragului admis.

### PTh-I.4.5. Verificarea la curent de scurtcircuit a circuitului DC — date de producător

Conform principiul stabilit la DTAC §3.6, curentul de scurtcircuit al circuitului DC **nu se calculează prin metodologia IEC 60909** (dezvoltată pentru rețele AC alimentate din surse cu impedanță de scurtcircuit definită extern), ci se preia din **datele de scurtcircuit declarate de producătorul celulei/rack-ului** (curent de scurtcircuit maxim per rack, timp caracteristic de creștere, impedanță internă echivalentă). Pentru dimensionarea de execuție a fuzibilelor DC de rack (§PTh-I.4.2) și a puterii de rupere a contactoarelor DC de rack/container (D02/D04), se adoptă, **ca ipoteză de proiect până la confirmarea prin fișa tehnică finală a echipamentului contractat**, un curent de scurtcircuit maxim de rack de **≈ 3.000–4.000 A** (valoare tipică documentată pentru rack-uri LFP de 250 kWh la impedanță internă redusă) — fuzibilul de 160 A adoptat (§PTh-I.4.2) trebuie să aibă o putere de rupere (I_cu) care depășește această valoare cu marjă, confirmată prin fișa tehnică a producătorului de fuzibil DC la faza de comandă a echipamentului. Contactorul/întreruptorul DC principal de container (D04) se dimensionează similar, la curentul de scurtcircuit agregat al bus-ului comun (însumarea contribuției tuturor celor 8 rack-uri, limitată selectiv de fuzibilele individuale de rack care acționează primele, conform principiul de selectivitate de la §PTh-I.4.8).

### PTh-I.4.6. Verificarea la scurtcircuit a aparatajului de joasă tensiune (secundarul transformatorului) și discuția arhitecturii de limitare

**Curentul de scurtcircuit trifazat prezumtiv la barele JT ale transformatorului** (formula generală IEC 60909 aplicată pe partea AC, unde este direct aplicabilă): I_scc,JT = S_T/(√3 × U_JT × u_k). Pentru trafo de referință S_T = 12,5 MVA, U_JT = 0,69 kV, cu o tensiune de scurtcircuit relativă **u_k = 8 %** (valoare mai ridicată decât uzualul 6 % al unui transformator de putere mai mică, adoptată deliberat la această putere pentru a limita curentul de scurtcircuit rezultat la un nivel gestionabil de aparatajul JT disponibil pe piață):

**I_scc,JT = 12.500.000/(1,732 × 690 × 0,08) = 12.500.000/95,58 = 130.780 A ≈ 130,8 kA**

Această valoare, deși calculată corect prin formula standard, se situează la limita superioară a aparatajului JT industrial curent disponibil (disjunctoare cu putere de rupere de ordinul a 100–150 kA, cu tehnologie limitatoare de curent) — este o consecință directă a combinației de putere ridicată (12,5 MVA) și tensiune secundară redusă (0,69 kV), specifică arhitecturii BESS de mare putere. **Soluția de proiect adoptată pentru a gestiona această magnitudine, decisă la faza P.Th. în dialog cu producătorul de echipament**, constă în una (sau o combinație) dintre următoarele: (a) specificarea unui transformator cu **înfășurare secundară dublă/multiplă** (de exemplu, 2×6,25 MVA pe două înfășurări LT separate, fiecare alimentând o jumătate din containere), care înjumătățește curentul de scurtcircuit văzut de fiecare secțiune de bară; (b) montarea unor **reactanțe de limitare a curentului de scurtcircuit** pe fiecare fider de container, la intrarea în bara de colectare comună; (c) alegerea unui aparataj JT cu tehnologie limitatoare de curent (disjunctoare cu limitare, care întrerup curentul de defect înainte ca acesta să atingă valoarea de vârf prezumtivă). Alegerea finală, cu verificarea completă prin studiu de coordonare realizat de producătorul de echipament, se documentează în cartea tehnică a instalației (§PTh-I.12) — prezentul breviar stabilește principiul de calcul, magnitudinea reală a fenomenului și cele trei căi tehnice de gestionare, fără a impune o soluție unică, aceasta fiind o decizie de specificație a echipamentului contractat.

**Verificarea solicitării termice a cablului de colectare AC la scurtcircuit** (analog criteriului aplicat la MT, §PTh-I.4.4), cu I_scc redus la valoarea per-fider prin oricare din soluțiile de mai sus (ipoteză de calcul I_scc,fider ≈ 20 kA, t_d ≈ 0,05 s, k ≈ 143 pentru Cu/XLPE): S_min = 20.000 × √0,05/143 = 20.000 × 0,2236/143 = 31,3 mm² — valoare net inferioară secțiunii de 600 mm²/fază adoptate la §PTh-I.4.3, confirmând marjă amplă odată aplicată o soluție de limitare a curentului de scurtcircuit la nivel de fider.

### PTh-I.4.7. Coordonarea izolației — niveluri de tensiune de ținere (sinteză)

| Nivel | Tensiune nominală | Tensiune de ținere la impuls (BIL) / nivel de protecție SPD | Componentă coordonată |
|---|---|---|---|
| DC (rack/container) | 1.250 V (bus) | echipament conform IEC 62619/63056 (izolație clasa II); SPD DC U_p ≈ 1.800 V rezidual | rack, bus comun, intrare PCS |
| AC JT | 0,69 kV | BIL echipamente JT uzual 8–12 kV; SPD AC JT tip 1+2, U_p ≤ 3,5 kV | PCS (ieșire), TGJT |
| MT | 20 kV | BIL 125 kV (Um 24 kV); SPD MT (descărcător ZnO) U_p ≤ 90–95 kV | celule MT, borne trafo, cablu MT |

**Principiul coordonării:** nivelul de protecție al fiecărui SPD (tensiunea reziduală U_p) trebuie să rămână, cu marjă de securitate (uzual factor ≥ 1,2), sub tensiunea de ținere la impuls (BIL) a echipamentului protejat cel mai apropiat. Tabelul de mai sus confirmă coerența alegerilor din DTAC (§7.2, §7.3, §8.3): SPD-urile DC protejează un bus cu izolație clasă II, SPD-urile MT protejează un echipament cu BIL de 125 kV, marja fiind conformă practicii consacrate.

### PTh-I.4.8. Selectivitatea protecțiilor — verificare pe cascada rack → container → PCS → MT

| Nivel | Protecție | Curent de reglaj | Temporizare | Pas de selectivitate față de nivelul următor |
|---|---|---|---|---|
| Fuzibil DC de rack | 160 A / 1.500 V DC | conform I_scc de rack (§PTh-I.4.5) | instantaneu (ultrarapid) | — (cel mai aval) |
| Contactor/întreruptor DC container | ≈ 800 A (I_DC,container) | comandat de BMS la depășirea pragurilor | 0,02–0,1 s (comandă electronică) | acționează sub protecția de rack |
| Disjunctor AC PCS | ≈ 900–1.000 A (marjă peste 881 A) | curbă termomagnetică/electronică | 0,1–0,3 s | + 0,1–0,2 s față de nivelul rack/container |
| Disjunctor general TGJT/PT | dimensionat la curentul agregat (§PTh-I.4.6) | curbă/protecție electronică, cu limitare | conform arhitectura adoptată la §PTh-I.4.6 | + 0,1–0,2 s față de nivelul PCS |
| Releu MT — funcția 50 (instantaneu) | I>> ≈ 8×I_n | 0,05 s | acoperă defecte france apropiate | — |
| Releu MT — funcția 51 (IDMT) | I> ≈ 1,2×I_n | ≈ 0,5 s | + 0,25–0,3 s față de protecția OD din amonte (coordonare la ATR) | — |
| Protecție de interfață (27/59/81U/81O) | conform ATR | conform ATR | decuplare la ieșirea din benzi | funcție distinctă (stare rețea, nu defect propriu) |

Reglajele finale ale funcțiilor MT (50/51/51N/67N, DTAC §7.3) și ale protecției de interfață se stabilesc **obligatoriu de comun acord cu operatorul de distribuție/transport**, în cadrul proiectului de racordare avizat — valorile din tabel sunt indicative, pentru dimensionarea aparatajului, nu reglaje finale de exploatare. Selectivitatea completă (defect de rack izolat exclusiv de fuzibilul de rack, fără declanșarea protecției de container sau de nivel superior) se verifică prin curbele timp-curent ale fiecărui dispozitiv, cu datele tehnice finale ale echipamentelor contractate, și se documentează într-un studiu de selectivitate dedicat, atașat cărții tehnice.

### PTh-I.4.9. Priza de pământ — calcul de dimensionare (detaliere D09)

La rezistivitate de calcul **ρ = 100 Ω·m** (ipoteză preliminară, de confirmat prin măsurare Wenner), un electrod vertical de 3 m dă o rezistență de dispersie individuală **R_e ≈ 34,7 Ω** (formulă standard R_e = ρ/(2πL)×[ln(8L/d)−1], evaluată pentru electrodul de referință). Pentru ținta **R_p ≤ 1 Ω**, cu factor de utilizare al grupului de electrozi **η ≈ 0,7** (interax comparabil cu lungimea electrodului):

**N = R_e/(R_p × η) = 34,7/(1 × 0,7) = 49,6 → 50 electrozi**

Pentru platforma tehnologică de referință (≈ 150×60 m util, containere + PT + drum tehnologic, perimetru ≈ 2×(150+60) = 420 m), spațierea rezultată este de **420/50 ≈ 8,4 m/electrod** — spațiere mai densă decât la un parc fotovoltaic de suprafață mare (unde spațierea uzuală este ~12 m pentru un necesar comparabil de electrozi, dat fiind perimetrul mult mai mare al unui câmp FV la putere echivalentă), reflectând amprenta la sol compactă a unei instalații BESS. **Valoarea rezistivității solului este o ipoteză preliminară — se confirmă obligatoriu prin măsurătoare pe amplasamentul real**; dacă rezistivitatea diferă semnificativ, numărul de electrozi/spațierea se recalculează înainte de execuție.

### PTh-I.4.10. Analiza de risc la trăsnet (metodologie SR EN 62305-2) — calcul ilustrativ

Analiza cantitativă de risc compară riscul de pierdere R cu riscul tolerabil R_T (10⁻⁵/an pentru pierderi de vieți omenești, cazul relevant pentru un amplasament cu prezență ocazională de personal de mentenanță).

**Frecvența anuală de lovituri directe (N_d):** N_d = N_g × A_d × C_d × 10⁻⁶, unde N_g = densitatea de lovituri la sol (fulgere/km²/an), A_d = aria de captare echivalentă (m²), C_d = factor de amplasare.

Pentru platforma de referință (150×60 m util, înălțime medie a structurilor protejate H ≈ 3 m — cota superioară a containerelor + eventuale panouri de decompresie/tije): **A_d ≈ (L+3H)×(l+3H) = (150+9)×(60+9) = 159×69 = 10.971 m² = 0,01097 km²**. Cu **N_g ≈ 2,0 fulgere/km²/an** (ipoteză de calcul ilustrativă, de confirmat prin harta izokeraunică oficială a amplasamentului real — necesită confirmare din datele ANM specifice locației definitive) și C_d = 1,0:

**N_d ≈ 2,0 × 0,01097 × 1,0 = 0,0219 lovituri/an** — o lovitură directă la aproximativ fiecare **46 de ani** pe suprafața compactă a instalației.

**Concluzie de proiectare adoptată (conservatoare, până la analiza definitivă):** dat fiind conținutul energetic ridicat concentrat pe o suprafață compactă (spre diferență de un parc fotovoltaic de suprafață mare, cu densitate energetică mult mai redusă pe unitatea de suprafață), se adoptă **LPL II** ca nivel de referință pentru dimensionarea captării, coborârilor și SPD-urilor (rază a sferei rotative 30 m, ochiuri de plasă 10×10 m unde aplicabil, curent de trăsnet de calcul 150 kA/10-350μs pentru componenta directă) — nivel mai strict decât LPL III, uzual la instalații industriale de risc obișnuit fără conținut energetic concentrat. **Concluzia finală privind nivelul de protecție necesar rezultă din raportul complet de analiză de risc, întocmit cu software certificat la faza P.Th. definitivă**, folosind valoarea N_g confirmată local — prezentul calcul este o ilustrare a metodologiei și a ordinului de mărime, nu o concluzie de proiectare finală substitutivă analizei complete.

### PTh-I.4.11. Dimensionarea sarcinii termice HVAC — breviar de execuție

Sarcina termică pe care sistemul HVAC al fiecărui container trebuie să o compenseze are două componente, conform principiul stabilit la DTAC §9.1–9.3:

**(a) Sarcina termică internă** (pierderi electrochimice/rezistive ale celulelor și conexiunilor, generate în timpul ciclurilor de încărcare/descărcare la puterea nominală a containerului): pornind de la randamentul electrochimic al bateriei (η_baterie ≈ 0,96, DTAC §3.3), pierderea internă la o descărcare de 1 MW pe durata de 2h (2 MWh procesați) este de aproximativ **(1−0,96) × 2 MWh = 0,08 MWh** pe ciclul de 2h, echivalent unei puteri termice medii disipate de:

**P_int ≈ 0,08 MWh/2h = 0,04 MW = 40 kW**

(b) **Sarcina termică externă** (transfer prin anvelopa containerului): pentru un container standard de referință (dimensiuni interioare aproximative 12×2,5×2,9 m, suprafață totală de anvelopă S_env ≈ 144 m²), la o diferență de temperatură de calcul vară ΔT = T_ext,calcul − T_setpoint = 35−25 = 10 °C (DTAC §1.5) și un coeficient de transfer termic al anvelopei izolate U ≈ 0,35 W/(m²·K):

**Q_ext = U × S_env × ΔT = 0,35 × 144 × 10 = 504 W ≈ 0,5 kW**

la care se adaugă un aport radiativ solar pe suprafața superioară expusă (estimat conservator la ≈ 2–3 kW pentru un container amplasat fără umbrire), rezultând o sarcină termică externă totală de ordinul **≈ 3 kW** — semnificativ inferioară sarcinii interne, confirmând observația DTAC §9.1 că principalul consumator/generator termic al unui container BESS este activitatea electrochimică internă, nu transferul prin anvelopă.

**Sarcina termică totală de proiect per container**: P_HVAC,total ≈ 40 + 3 ≈ **43–50 kW** (rotunjit conservator la 50 kW, incluzând marjă pentru condiții de funcționare la limita superioară a intervalului de temperatură exterioară și pentru degradarea treptată a randamentului bateriei pe durata de viață, DTAC §4.5). Configurația **N+1** adoptată (DTAC §9.3) prevede **2 unități de climatizare per container**, fiecare dimensionată la **≥ 35 kW** — o singură unitate acoperă sarcina de proiect cu marjă redusă (35 kW < 50 kW, insuficient singură la vârf absolut, dar suficient pentru menținerea temporară a temperaturii în bandă tolerată până la remedierea unității defecte, dat fiind că sarcina de 50 kW este un vârf conservator, nu valoarea medie de funcționare), în timp ce ambele unități funcționale asigură o capacitate totală de 70 kW, cu marjă confortabilă peste sarcina de proiect.

### PTh-I.4.12. Dimensionarea rezervei de apă de stingere/răcire și a bazinului de retenție

Conform strategia adoptată la DTAC §11.3 (răcire exterioară dominantă, nu stingere prin înăbușire), dimensionarea sursei de apă pentru sistemul drencer (D18) se realizează pe baza suprafeței exterioare expuse a containerului afectat și a containerelor adiacente (cele aflate la distanța minimă de 3 m, DTAC §13.2), pentru un debit specific de aplicare **ipotetic conservator de q = 10 l/min/m²** (valoare orientativă din practica documentată pentru răcirea containerelor BESS, **de confirmat obligatoriu prin recomandarea specifică a producătorului containerului, validată de regulă prin testarea UL 9540A, și prin scenariul de securitate la incendiu elaborat de specialistul atestat**):

Aria de calcul (container afectat, toate fețele expuse, plus fețele laterale ale celor 2 containere adiacente cele mai apropiate, dacă distanța este sub pragul de radiație periculoasă) este estimată, ca ipoteză de proiect, la **≈ 300 m²**:

**Q_necesar = q × A = 10 l/min/m² × 300 m² = 3.000 l/min = 3 m³/min = 180 m³/h**

Pentru o **durată minimă de funcționare continuă, ipoteză conservatoare de proiect, de 60 de minute** (până la confirmarea prin raportul UL 9540A specific echipamentului contractat, conform DTAC §11.4, care poate impune o durată diferită):

**V_rezervă = 180 m³/h × 1 h = 180 m³**, majorat cu o rezervă de 20 % pentru pierderi hidraulice și pentru eventuale precipitații concomitente, rezultând un **rezervor de apă tehnologică dedicat de ≈ 220 m³**, complet separat de rezerva de apă potabilă (DTAC §16.1) și alimentat, prin grupul de pompare de incendiu, din sursa electrică de siguranță a instalației (DTAC §15).

**Bazinul de retenție a apelor de stingere contaminate** (D19) se dimensionează la minimum volumul de apă efectiv utilizabil pe durata de proiect (≈ 180–220 m³), majorat cu o rezervă pentru precipitațiile concomitente pe suprafața platformei (calculată la intensitatea de calcul a ploii de proiect × suprafața platformei × coeficientul de scurgere), rezultând un **bazin de retenție dedicat de ≈ 250 m³**, complet separat de orice rețea de canalizare publică sau emisar natural (DTAC §11.5/§16.3).

### PTh-I.4.13. Dimensionarea suprafeței panourilor de decompresie — calcul ilustrativ

Conform metodologia NFPA 68/EN 14994 (DTAC §12.2), suprafața necesară a panourilor de decompresie (A_v) depinde de volumul incintei protejate (V), de presiunea maximă redusă acceptabilă (p_red,max), de presiunea statică de deschidere a panoului (p_stat) și de caracteristica de reactivitate a amestecului exploziv (K_G — parametru foarte ridicat pentru hidrogen, dominant în gazele de degazare ale unei celule LFP, DTAC §12.2). Pentru un container de referință cu volum liber interior estimat **V ≈ 74 m³** (85 % din volumul brut de ≈ 87 m³, corecție pentru volumul ocupat de rack-uri), o presiune maximă redusă acceptabilă **p_red,max ≈ 0,2 bar** (ipoteză conservatoare a limitei structurale a carcasei containerului, de confirmat prin fișa constructivă a producătorului) și o constantă empirică reprezentativă pentru hidrogen **C ≈ 0,26 (bar^0,5)** (valoare ilustrativă, derivată din nomogramele publicate pentru gaze cu reactivitate ridicată, net superioară constantei aplicabile gazelor combustibile uzuale de tip metan/propan):

**A_v ≈ C × V^(2/3)/√(p_red,max) = 0,26 × 74^(2/3)/√0,2 ≈ 0,26 × 17,6/0,447 ≈ 10,3 m²**

Rezultatul ilustrează, la nivel de ordin de mărime, **impactul direct al reactivității ridicate a hidrogenului asupra necesarului de suprafață de decompresie** — o suprafață de ordinul a 10 m² reprezintă o fracțiune semnificativă din suprafața laterală disponibilă a unui container standard, motiv pentru care proiectanții de containere BESS certificate integrează, de regulă din fabrică, un număr de panouri pretestate și distribuite pe mai multe fețe, dimensionate și poziționate pe baza datelor experimentale reale ale testului UL 9540A al configurației specifice (nu prin aplicarea directă, pe șantier, a formulei ilustrative de mai sus). **Calculul de mai sus este o ilustrare a metodologiei și a ordinului de mărime al fenomenului — valoarea finală, definitivă, a suprafeței de decompresie este cea certificată de producătorul containerului**, confirmată la faza P.Th. prin fișa tehnică a echipamentului contractat și, dacă disponibil, prin raportul de testare UL 9540A specific.

### PTh-I.4.14. Tabel de cantități de lucrări (material take-off) — exemplul de referință 10 containere × 2 MWh

| Poz. | Material/echipament | U.M. | Cantitate | Bază de calcul |
|---|---|---|---|---|
| 1 | Container BESS echipat (2 MWh, 8 rack-uri) | buc. | 10 | conform §PTh-I.4.1 |
| 2 | Modul baterie LFP (5 kWh) | buc. | 4.000 | 10 containere × 400 module |
| 3 | Rack (250 kWh, 50 module) | buc. | 80 | 10 containere × 8 rack-uri |
| 4 | Fuzibil DC rapid de rack (160 A) | buc. | 80 | 1/rack |
| 5 | Contactor/întreruptor DC de container | buc. | 10 | 1/container |
| 6 | Cablu DC bus 1×95 mm² (rack→bus) | m | ≈ 800 | 80 rack-uri × ~10 m mediu |
| 7 | Cablu DC bus 1×240 mm² (bus→PCS, 3 în paralel) | m | ≈ 1.800 | 10 containere × 3 cabluri × ~60 m mediu (dus-întors echivalent) |
| 8 | PCS 1 MW | buc. | 10 | conform §PTh-I.4.1 |
| 9 | SPD DC tip 2 (bus container) | buc. | 10 | 1/container |
| 10 | SPD AC tip 1+2 (ieșire PCS) | buc. | 10 | 1/PCS |
| 11 | Cablu AC colectare 2×(1×300 mm²)/fază | m | ≈ 900 | 10 containere × ~30 m mediu la bara de colectare |
| 12 | Transformator 12,5 MVA, 0,69/20 kV, Dyn11 | buc. | 1 | conform §PTh-I.4.1/DTAC §3.4 |
| 13 | Celule MT 24 kV (set: sosire+măsură+protecție) | set | 1 | conform D14 |
| 14 | Cablu MT A2XS(F)2Y 12/20 kV, 185 mm² | m | ≈ 1.200 | 3 cabluri unipolare × 400 m |
| 15 | Cămin de tragere MT | buc. | ≈ 5 | interval ~80–100 m pe traseul de 400 m |
| 16 | Electrod vertical priză de pământ (3 m) | buc. | ≈ 50 | perimetru ≈ 420 m/interax ~8,4 m (D09) |
| 17 | Conductor de contur priză de pământ, OL-Zn 40×4 mm | m | ≈ 420 (contur) + legături la containere | D09 |
| 18 | Tijă de captare paratrăsnet | buc. | 2–4 | D11, funcție de geometria amplasamentului |
| 19 | Senzor detecție gaz H₂/CO | buc. | ≈ 20 | 2/container (D16) |
| 20 | Unitate centrală VESDA | buc. | 10 | 1/container (sau partajată, funcție de arhitectură) |
| 21 | Sistem de stingere aerosol/gaz inert | set | 10 | 1/container (D17) |
| 22 | Rețea drencer exterior + duze | set | 1 (dimensionată global) | conform §PTh-I.4.12 (D18) |
| 23 | Rezervor apă tehnologică stingere/răcire | buc. | 1 | ≈ 220 m³ (§PTh-I.4.12) |
| 24 | Bazin de retenție ape de stingere contaminate | buc. | 1 | ≈ 250 m³ (D19) |
| 25 | Unități HVAC per container (N+1) | buc. | 20 | 2/container × 10 containere |
| 26 | Stâlp CCTV/iluminat perimetral | buc. | ≈ 6–8 | funcție de perimetru (D20) |

**Observație asupra utilizării acestui tabel.** Cantitățile sunt derivate parametric din arhitectura de 10 containere × 2 MWh și **scalează proporțional cu numărul de containere/rack-uri/PCS** la orice altă capacitate aleasă din intervalul 10–50 MWh, conform relațiile de scalare din DTAC §3 și din prezentul §PTh-I.4.1. Lungimile de cablu rămân dependente de layout-ul geometric real al amplasamentului și se recalculează pe planul de implantare topografic definitiv — valorile din tabel sunt estimări de proiect tehnic, suficiente pentru antemăsurătoare, dar caietul de cantități final se emite după finalizarea planului de execuție cotat.

---

## PTh-I.5. Fișe tehnice complete — echipamente majore

### PTh-I.5.1. Fișă tehnică — Celulă LFP (referință proiect)

| Parametru | Valoare |
|---|---|
| Chimie | litiu-fero-fosfat (LiFePO₄, LFP) |
| Format | prismatic |
| Tensiune nominală / fereastră de alarmă | 3,2 V / 2,5–3,65 V |
| Capacitate | 280–314 Ah |
| Ciclabilitate garantată (DoD 90%) | ≥ 6.000 cicluri |
| Temperatură de declanșare ambalare termică | ≈ 250–270 °C |
| Certificare | IEC 62619, UL 9540A (la nivel de celulă, prima treaptă a testului) |

### PTh-I.5.2. Fișă tehnică — Modul baterie (5 kWh, referință)

| Parametru | Valoare |
|---|---|
| Configurație | pachet serie de celule LFP |
| Tensiune nominală | ~48–52 V |
| Energie | ~5 kWh |
| Instrumentație integrată | CMU (Cell Monitoring Unit), câte 4–8 termistori/modul |
| Prag alarmă temperatură | ~45 °C (alarmă) / ~50–55 °C (oprire critică) |
| Grad de protecție | conform IEC 62619, integrare în rack IP-rated |

### PTh-I.5.3. Fișă tehnică — Rack (250 kWh, referință exemplu execuție)

| Parametru | Valoare |
|---|---|
| Configurație | 2 șiruri × 25 module serie |
| Tensiune bus | 1.250 V DC |
| Energie | 250 kWh |
| Curent nominal la P_container/8 (§PTh-I.4.2) | 100 A |
| RBMS | agregă CMU-urile, comandă contactor de rack, calculează SOC/SOH agregat |
| IMD (monitor de izolație) | integrat la nivel de rack/container, sistem IT flotant |
| Protecție | fuzibil DC rapid 160 A + contactor comandat de RBMS |

### PTh-I.5.4. Fișă tehnică — Container BESS complet (2 MWh, referință)

| Parametru | Valoare |
|---|---|
| Energie | 2 MWh (8 rack-uri × 250 kWh) |
| Greutate echipată (estimativă) | ≈ 30–36 t |
| Dimensiuni indicative | ≈ 12×2,5×2,9 m (tip ISO 40', high-cube) |
| Grad de protecție anvelopă | IP54 minim (exterior) |
| Rezistență la foc anvelopă | EI 120 (NFPA 855 §9) |
| Uși de acces | EI2 60-C (autoînchidere) |
| HVAC integrat | 2 unități N+1, ≥ 35 kW fiecare (§PTh-I.4.11) |
| Detecție integrată | gaz H₂/CO + VESDA + cablu termic liniar (D16) |
| Stingere integrată | aerosol condensat/gaz inert (D17) |
| Panouri de decompresie | conform certificare producător (§PTh-I.4.13) |
| Certificare | UL 9540, testare la propagare UL 9540A |

### PTh-I.5.5. Fișă tehnică — PCS (1 MW, referință)

| Parametru | Valoare |
|---|---|
| Putere activă nominală | 1 MW (bidirecțional) |
| Tensiune DC intrare/fereastră | 1.250 V nominal, fereastră conform bus rack (1.000–1.500 V) |
| Tensiune AC ieșire | 0,69 kV |
| Curent AC nominal (cos φ 0,95) | 881 A (§PTh-I.4.3) |
| Randament (η_PCS) | ≈ 0,98 (DTAC §3.3) |
| Mod de operare | grid-following (ipoteză minimă de proiect), upgrade grid-forming la cerința ATR |
| Tehnologie semiconductor | IGBT sau SiC, conform specificația echipamentului contractat |
| Protecții integrate | supra/subtensiune DC, supracurent AC, supratemperatură, anti-islanding |
| Certificare | IEC 62109, RfG |

### PTh-I.5.6. Fișă tehnică — Transformator 12,5 MVA, 0,69/20 kV, Dyn11

| Parametru | Valoare |
|---|---|
| Putere nominală | 12,5 MVA (variantă redundantă: 2×6,3 MVA) |
| Raport de transformare | 0,69/20 kV |
| Grupa de conexiuni | Dyn11 |
| Tensiune de scurtcircuit u_k | 8 % (adoptată pentru limitarea I_scc,JT, §PTh-I.4.6) |
| Tip constructiv | ulei sau uscat rășină (decizie de proiect, DTAC §6.1) |
| Nivel izolare MT (Um/BIL) | 24 kV/125 kV |

### PTh-I.5.7. Fișă tehnică — Celule MT 24 kV (set complet PT)

| Celulă | Funcție | Aparataj principal | Curent nominal |
|---|---|---|---|
| Celulă sosire/racord | interfață OD/OTS, izolare vizibilă | separator de sarcină + CLP | conform ATR |
| Celulă măsură | contorizare bidirecțională (DTAC §6.4) | TT+TC clasă 0,2S/0,5S | — |
| Celulă protecție trafo | protecție transformator | întreruptor vid + relee 50/51/51N/67N | conform I_scc ATR |

### PTh-I.5.8. Fișă tehnică — SCADA/EMS/BMS Master

| Parametru | Valoare |
|---|---|
| Arhitectură | System BMS Master (DTAC §4.4) → EMS (dispecerizare, DTAC §14.1) → SCADA (monitorizare unificată, DTAC §14.3) |
| Puncte monitorizate | fiecare celulă/modul (prin CMU), fiecare rack (RBMS), fiecare container/PCS, transformator, celule MT, HVAC, detecție/stingere PSI |
| Protocoale | CAN/RS485 (BMS intern), Modbus TCP/RTU, IEC 61850 (relee MT) |
| Backbone comunicații | fibră optică (DTAC §14.4) |
| Securitate cibernetică | segregare OT/IT, autentificare multi-factor, jurnalizare (DTAC §14.5) |

### PTh-I.5.9. Fișă tehnică — Sistem de detecție gaz H₂/CO + VESDA

| Parametru | Valoare |
|---|---|
| Senzor de gaz | electrochimic/semiconductor, amplasat la partea superioară a incintei |
| Prag de alarmă | fracțiune conservatoare din LEL hidrogen (DTAC §10.2) |
| Sistem aspirativ de fum | tip VESDA, analiză optică prin dispersie laser |
| Cablu de detecție termică liniară | montat deasupra rack-urilor, pe toată lungimea incintei |
| Integrare | centrală de semnalizare P118-3, alarmare graduală, transmisie SCADA 24/7 |

### PTh-I.5.10. Fișă tehnică — Sistem de stingere aerosol condensat/gaz inert

| Parametru | Valoare |
|---|---|
| Agent | aerosol condensat sau gaz inert (funcție de specificația echipamentului) |
| Rol | fază incipientă, complementar răcirii exterioare cu apă (DTAC §11.1-11.2) |
| Regim ISCIR | recipiente sub presiune — conform colecția PT C, dacă p×V depășește pragul de exceptare (§PTh-I.8.3) |
| Comandă | automată, de la centrala P118-3, cu interfață E-stop |

### PTh-I.5.11. Fișă tehnică — Unitate HVAC container

| Parametru | Valoare |
|---|---|
| Configurație | 2 unități/container, N+1 (DTAC §9.3) |
| Putere frigorifică unitară | ≥ 35 kW (§PTh-I.4.11) |
| Setpoint de proiectare | 20–25 °C (DTAC §9.2) |
| Agent frigorific | conform F-gas, GWP redus (DTAC §9.4) |
| Comandă | alternanță unitate lider, monitorizare BMS/EMS |

### PTh-I.5.12. Fișă tehnică — SPD-uri (sinteză pe niveluri de tensiune)

| Nivel | Tip | U_c | I_n (8/20) | I_imp (10/350) | Amplasare |
|---|---|---|---|---|---|
| DC — bus container | tip 2 | ≥ 1.500 V DC | ≥ 20 kA | — | fiecare container, lângă intrarea PCS (D13) |
| AC JT | tip 1+2 | ≥ 1,1×U_n | ≥ 20 kA | ≥ 12,5 kA | ieșire PCS, TGJT |
| MT | descărcător ZnO | ≈ 24 kV | ≥ 10 kA | — | sosire LES, borne trafo |

---

## PTh-I.6. Probe și verificări detaliate

### PTh-I.6.1. Tabel complet probe/verificări per instalație

| Instalație | Probă | Parametru/valoare | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Rack DC | tensiune de mers în gol per rack | comparație cu valoarea calculată la configurația serie/paralel | instantaneu | abatere ≤ 3 % față de calcul |
| Rack DC | tensiune individuală per celulă (via CMU) | comparație cu fereastra 2,5–3,65 V | — | toate celulele în fereastră |
| Bus DC container | rezistență de izolație | 1.500 V c.c. | conform IMD | ≥ 1 MΩ |
| Bus DC container | continuitate legături echipotențiale (carcasă–contur) | — | — | R < 0,1 Ω |
| Bus DC container | termografie IR (sub sarcină) | — | — | fără hot-spot-uri > +20 °C față de vecinătate |
| Contactor DC rack/container | test funcțional deschidere/închidere | comandă BMS simulată | — | acționare corectă, timp de răspuns conform fișă |
| PCS | funcționare bidirecțională (grid-following) | test la sarcină parțială și nominală | — | conform curbă de capabilitate P/Q |
| PCS | protecție anti-islanding | test conform standard | — | deconectare în timpul reglementat |
| Cablu AC JT/colectare | rezistență izolație | 1.000 V c.c. | — | ≥ 0,5 MΩ (I7) |
| Cablu MT | izolație (Megger) + încercare de tensiune mărită | conform clasă tensiune, VLF/f industrială | conform normativ | fără scădere/descărcare |
| Transformator | raport de transformare, grupa de conexiuni, rezistență înfășurări | — | — | conform placă + buletin fabrică ± 5 % |
| Celule MT | verificare protecții (injecție primară/secundară) | reglaje 50/51/51N/67N + temporizări | — | acționare la valorile reglate ± 5 % |
| Celule MT | interlock mecanic celulă-ușă | test funcțional | — | blocare corectă în ambele sensuri |
| Priză de pământ | rezistență de dispersie R_p | metoda căderii de potențial | — | ≤ 1 Ω, conform D09 |
| Priză de pământ | tensiuni de atingere/pas | conform timp de eliminare defect | — | ≤ 50 V (normal) / ≤ 125 V (scurtă durată) |
| LPS (paratrăsnet) | continuitate coborâri, rezistență de dispersie | — | — | conform SR EN 62305-3 |
| HVAC | test funcțional (pornire, atingere setpoint, comutare N+1) | 20–25 °C | — | menținere bandă ± 1 °C |
| Detecție gaz H₂/CO | injecție de test/simulare electrică | concentrație sub pragul de acționare a stingerii | — | acționare la pragul de proiect |
| VESDA | test de fum controlat/simulare | — | — | detecție conform sensibilitatea de proiect |
| Cablu termic liniar | test electric de simulare punct cald | — | — | acționare la pragul de proiect |
| Sistem de stingere aerosol/gaz inert | test „la gol" al lanțului de comandă | fără descărcare reală | — | comandă corectă, izolare electrică simultană |
| Sistem drencer | test hidraulic la debit nominal (comandă manuală) | conform §PTh-I.4.12 | — | debit/presiune conform proiect |
| Bazin de retenție | probă de etanșeitate | umplere + 48 h | — | fără scădere de nivel |
| E-stop | test funcțional | acționare manuală simulată | — | deconectare PCS + deschidere contactoare DC |
| RfG | funcții de sistem (LVRT, Q(U), cosφ(P), LFSM-O/U, ramp-rate) | protocol supravegheat OD/TSO | — | conform curbele din ATR |
| SCADA/EMS/BMS | comunicație pe fiecare echipament | test 100 % | — | date valide pe toate punctele |

### PTh-I.6.2. Verificări electrice PRAM — detaliu

- **Rezistența de izolație DC**, măsurată între cele două polarități și între fiecare polaritate și PE, la 1.500 V c.c. (tensiune de test superioară celei uzuale la instalațiile de JT, dat fiind nivelul de tensiune de 1.250 V al bus-ului); valoare minimă admisă **1 MΩ**.
- **Rezistența prizei de pământ**, măsurată prin metoda căderii de potențial; valoare țintă **≤ 1 Ω** la PT/celule MT.
- **Continuitatea conductorului de protecție/echipotențializare**, verificată pe fiecare container și pe fiecare punct de legare rack–bus.
- **Verificarea SPD-urilor** (DC, AC, MT): integritate, indicator de stare, legare la bara de echipotențializare, contact de semnalizare funcțional către SCADA.
- **Verificarea monitorului de izolație (IMD)**: simularea unui prim defect de izolație controlat (test de producător) și confirmarea semnalizării corecte fără declanșare intempestivă a deconectării (arhitectura IT flotantă, DTAC §4.7).

### PTh-I.6.3. Protocol de măsurare per rack — formular tip

Pentru fiecare rack se completează, la PIF: identificator (CNT-xx/RK-yy), număr de module, tensiune de mers în gol măsurată, tensiune calculată (corectată la temperatura din momentul măsurării), abatere procentuală, tensiune individuală minimă/maximă de celulă (via CMU), temperatura minimă/maximă înregistrată, rezultatul testului de continuitate a legăturii echipotențiale, observații (termografie, defecte constatate). **Abaterea maximă admisă tensiune măsurată vs. calculată: ± 3 %** — peste acest prag se investighează (modul degradat, conexiune de rezistență mare, celulă cu SOH redus).

### PTh-I.6.4. Protocol de probe pentru sistemele de detecție și stingere (fără declanșare reală a agentului)

Verificarea funcțională a lanțului complet detecție→alarmare→comandă de stingere se realizează **exclusiv prin simulare electrică sau prin injecție controlată de gaz de test la concentrație inferioară pragului de acționare a descărcării agentului**, conform protocolul specific al producătorului fiecărui sistem — pentru fiecare senzor de gaz, fiecare punct al rețelei VESDA și fiecare secțiune a cablului termic liniar se verifică: (a) transmiterea corectă a semnalului către centrala P118-3, (b) acționarea corectă a secvenței de alarmare graduală (pre-alarmă→alarmă→comandă), (c) comanda simultană/coordonată către E-stop (D04) și către ventilația mecanică de urgență (dacă prevăzută). Descărcarea reală a agentului de stingere cu unică folosință (aerosol condensat/gaz inert) **nu se testează la PIF** — verificarea se limitează la integritatea cilindrilor/generatorului (presiune de încărcare conformă fișei tehnice, verificată vizual/manometric) și la funcționalitatea completă a lanțului de comandă până la contactul final de descărcare (izolat electric pentru test).

### PTh-I.6.5. Protocol de probe pentru sistemul de oprire de urgență (E-stop) și izolarea electrică

Testul E-stop se execută la fiecare container individual: acționarea butonului exterior (D04) trebuie să comande, verificat prin măsurare/observare directă, (a) deconectarea imediată a PCS-ului aferent, (b) deschiderea tuturor contactoarelor DC de rack ale containerului respectiv, și (c) transmiterea semnalului de stare către SCADA. Se verifică, suplimentar, funcționarea E-stop-ului central (stația de comandă a amplasamentului), a cărui acționare trebuie să producă efectul de mai sus **simultan la toate containerele instalației**. Timpul de la acționare la izolarea electrică completă se cronometrează și se consemnează în buletinul de probă, comparat cu valoarea declarată de producătorul BMS/PCS.

---

## PTh-I.7. Tehnologia de montaj — succesiune și tehnologie

### PTh-I.7.1. Succesiunea generală a lucrărilor

1. Trasarea axelor platformelor de containere și a traseelor de cablu/șanțuri (topografic, pe baza planului de implantare).
2. Execuția prizei de pământ generale (electrozi + conductor de contur, D09), **înainte** de amplasarea containerelor — fază determinantă.
3. Execuția platformelor de beton armat pentru containere (obiectul specialității de rezistență, corelat cu ancorajele D01).
4. Manevrarea și ancorarea containerelor pe platformă (D01), cu personal și utilaj de ridicare autorizat ISCIR (§PTh-I.8.4).
5. Racordurile de interfață DC/AC/comunicație ale fiecărui container (§PTh-I.3.2-I.3.3), dacă rack-urile/PCS nu sunt integral pre-cablate din fabrică.
6. Execuția fundației/platformei PT (D12) și montarea anvelopei/transformatorului/celulelor MT (§PTh-I.3.4).
7. Execuția șanțurilor și pozarea cablurilor DC/AC între containere și către PT (D05), probate înainte de acoperire — fază determinantă.
8. Execuția șanțurilor și pozarea cablurilor MT (D06–D08), probate înainte de acoperire — fază determinantă.
9. Montarea paratrăsnetului (D11) și finalizarea legăturilor echipotențiale (D10).
10. Montarea/verificarea sistemelor de detecție și stingere (D16–D18), a panourilor de decompresie (D15) și a bazinului de retenție (D19).
11. Montarea sistemelor auxiliare (SCADA, CCTV, iluminat — D20).
12. Probe individuale pe instalație (§PTh-I.6), apoi probe integrate și PIF (§PTh-I.8).
13. Recepția la terminarea lucrărilor și predarea cărții tehnice (§PTh-I.12).

### PTh-I.7.2. Susțineri, adâncimi și tehnologii de pozare — sinteză

| Element | Tehnologie | Parametru |
|---|---|---|
| Cablu DC/instrumentație interior container | jgheab/canal dedicat, separat de circuitul de forță | distanță minimă ≥ 100 mm sau ecranare (D03) |
| Cablu DC/AC JT îngropat între containere/PT | șanț + pat de nisip | adâncime 0,80 m, bandă de semnalizare la 0,30 m deasupra |
| Cablu MT îngropat | șanț + pat de nisip + dală de protecție | adâncime 1,00–1,20 m, dală obligatorie |
| Subtraversare drum | tub de protecție + cămine de capăt | adâncime ≥ 1,00–1,20 m |
| Rețea drencer exterior | conducte pe suport dedicat/îngropate cu pantă de golire | conform proiectul PSI |

### PTh-I.7.3. Treceri etanșe la foc (interfață cu compartimentarea PT/camerelor tehnice)

La traversarea pereților/planșeelor PT sau ale eventualelor camere tehnice cu rol de compartimentare la incendiu (conform scenariul de securitate la incendiu — document dedicat, care **nu se dublează aici**), toate trecerile de cabluri (forță, comunicație, instrumentație de detecție) se etanșează cu sisteme certificate de rezistență la foc egală cu a elementului străbătut: manșoane/mastic intumescent la cabluri, pernă/vopsea termospumantă la fascicule, conform tabelul de clase din scenariul PSI al obiectivului. Aceeași cerință se aplică la traversarea anvelopei containerului de către cablurile externe de racord DC/AC/comunicație, unde etanșarea trebuie să mențină simultan clasa de rezistență la foc EI 120 a anvelopei (DTAC §13.3) și etanșeitatea IP a incintei.

---

## PTh-I.8. Punerea în funcțiune (PIF) și reglaje

### PTh-I.8.1. Secvența generală de PIF

1. Verificări individuale complete pe fiecare instalație (§PTh-I.6), consemnate în buletine.
2. Verificarea completă a fiecărui rack (tensiune, temperatură, continuitate, §PTh-I.6.3), **înainte** de conectarea la bus-ul comun al containerului.
3. Punerea sub tensiune a bus-ului DC comun al fiecărui container, cu verificarea funcțională a contactoarelor de rack și a IMD.
4. Testarea funcțională a sistemelor de detecție/stingere/E-stop (§PTh-I.6.4-I.6.5), **fără declanșarea reală a agentului de stingere**.
5. Punerea sub tensiune a părții AC (PCS în regim „stand-by rețea", fără sincronizare încă).
6. Verificarea completă a instalației MT (izolație, protecții, interlock) — fără tensiune de rețea aplicată.
7. Solicitarea și obținerea acordului OD/OTS pentru punerea sub tensiune de probă a instalației de racordare.
8. Sincronizarea PCS-urilor cu rețeaua (prima injecție de test, la putere redusă/limitată, container cu container).
9. Testele RfG supravegheate (§PTh-I.8.2).
10. Creșterea treptată la putere nominală (10 MW), cu monitorizare termică (termografie IR pe conexiuni sub sarcină) la fiecare treaptă.
11. Verificarea funcțională a HVAC-ului la sarcină reală (§PTh-I.4.11), cu monitorizarea temperaturii interioare a fiecărui container.
12. PIF final, semnat de OD/OTS — Notificarea Operațională de Punere în Funcțiune (conform RfG).
13. Obținerea avizului/autorizației de securitate la incendiu (condiționată de probele §PTh-I.6.4-I.6.5), conform DTAC §13.5.
14. Recepția la terminarea lucrărilor.

### PTh-I.8.2. Protocol de parametrizare RfG (ilustrativ)

| Funcție | Parametru de configurat | Valoare de referință (confirmă ATR) |
|---|---|---|
| LFSM-O | prag frecvență/statism | 50,2–50,5 Hz/2–12 % |
| Q(U) | curba tensiune–reactiv | conform curba impusă de OD/OTS |
| cosφ(P) | curba putere–factor putere | conform curba impusă de OD/OTS |
| LVRT/HVRT | curba U-t de menținere conectat | conform profilul RfG aplicabil |
| Ramp-rate | limitare gradient putere (încărcare și descărcare) | ex. 10 %/min (confirmă ATR) |
| Protecție interfață | praguri 27/59/81U/81O | conform ATR |
| Funcții specifice de stocare | limite SOC de operare, prioritate servicii de sistem vs. arbitraj | conform contract de servicii tehnologice (DTAC §6.5/14.2) |

Toți parametrii se configurează în firmware-ul PCS-urilor și în EMS, se testează prin protocol supravegheat de reprezentantul OD/OTS și se listează integral în dosarul de PIF.

### PTh-I.8.3. Regimul ISCIR aplicabil

Instalația BESS poate include două categorii de echipamente supuse regimului de autorizare/verificare ISCIR, care se identifică și se tratează explicit la faza P.Th., pe baza fișelor tehnice finale ale echipamentelor contractate:

- **Recipiente sub presiune ale sistemului de stingere** (cilindri de gaz inert sau generatori de aerosol condensat, D17) — conform **Legii nr. 64/2008** privind funcționarea în condiții de siguranță a instalațiilor sub presiune și **colecției PT C** a prescripțiilor tehnice ISCIR, aceste recipiente se supun regimului de autorizare/verificare ISCIR **dacă produsul presiune × volum depășește pragul de exceptare** stabilit de prescripția tehnică aplicabilă — verificare care se face echipament cu echipament, pe baza fișei tehnice a producătorului (presiune de încărcare, volum intern), la faza de comandă a sistemului de stingere. Dacă aplicabil, recipientele se înscriu în evidența ISCIR, se supun verificării tehnice periodice conform prescripției aplicabile și intră în cartea tehnică a instalației cu documentele de autorizare aferente.
- **Utilajul de ridicare (macara) folosit la manevrarea containerelor** — dat fiind greutatea unui container echipat (≈ 30–36 t), manevrarea se execută obligatoriu cu macara autorizată **PT R1-2010 (ISCIR)**, cu Responsabil cu Supravegherea și Verificarea Tehnică a Instalațiilor (RSVTI) desemnat, macaragiu și legători de sarcină autorizați, verificarea limitatoarelor și a cablurilor/lanțurilor de ridicare, calarea pe teren portant și verificarea vitezei vântului (interdicție de manevrare peste limita din cartea utilajului) — cerințe identice celor aplicate la montajul echipamentelor grele ale parcului fotovoltaic din aceeași bibliotecă (transformator, structuri), extinse aici la containerul BESS complet echipat.

Prezentul document semnalează cele două puncte de interfață cu regimul ISCIR și principiile aplicabile — dosarul complet de autorizare ISCIR (dacă aplicabil recipientelor sub presiune) se întocmește separat, de firma autorizată RSVTI, pe baza fișelor tehnice finale ale echipamentelor contractate.

### PTh-I.8.4. Echilibrarea și verificarea în primele zile de funcționare

În primele zile de funcționare la putere plină se verifică: distribuția uniformă a curentului între rack-urile fiecărui container (dispersie ≤ 5 % între rack-uri comparabile — abateri mai mari indică un defect nedetectat la PIF sau o degradare accelerată neuniformă, DTAC §4.5), temperatura de funcționare a fiecărui container (fără derating neașteptat al HVAC-ului, §PTh-I.4.11), corelarea randamentului round-trip măsurat cu valoarea de proiect (η_RT = 88,5 %, DTAC §3.3 — abateri semnificative indică erori de configurare a PCS-urilor sau un consum auxiliar HVAC peste proiect) și funcționarea corectă a algoritmului EMS de dispecerizare (prioritizarea corectă a obligațiilor contractuale de servicii de sistem față de arbitrajul liber, DTAC §14.2).

---

## PTh-I.9. Plan de Control al Calității (PCC) instalații

### PTh-I.9.1. Tabel PCC

| Nr. | Fază de lucrare | Document de verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție containere, module, PCS, transformator, celule MT | certificate de conformitate, buletine fabrică, raport UL 9540A (dacă disponibil) | responsabil tehnic execuție (RTE) | CQ |
| 2 | Execuție priză de pământ — înainte de acoperirea conductorului de contur | proces-verbal + măsurătoare R_p preliminară | RTE + diriginte de șantier | **FD** |
| 3 | Ancorare container pe platformă (D01) | proces-verbal nivelare + cuplu de strângere ancoraje | RTE + proiectant structură | **FD** |
| 4 | Verificare rack — tensiune/temperatură per celulă, înainte de conectare la bus | fișă de măsurare per rack (§PTh-I.6.3) | RTE | CM |
| 5 | Șanț cablu DC/AC/MT — înainte de acoperire | proces-verbal + relevare topografică as-built | RTE + diriginte de șantier | **FD** |
| 6 | Probă etanșeitate cuvă retenție ulei | PV probă cu apă, 24 h | RTE + diriginte | **FD** |
| 7 | Probă etanșeitate bazin de retenție ape de stingere | PV probă cu apă, 48 h | RTE + diriginte | **FD** |
| 8 | Rezistență izolație DC/AC/MT | buletine PRAM | verificator/laborator atestat | CM |
| 9 | Rezistență priză de pământ + tensiuni atingere/pas | buletin PRAM | laborator autorizat | CM |
| 10 | Verificare protecții MT (injecție primar/secundar) | PV verificare + reglaje | firmă atestată | **FD** |
| 11 | Testare funcțională sisteme detecție/stingere/E-stop (fără descărcare reală) | PV protocol producător | RTE + furnizor + specialist PSI atestat | **FD** |
| 12 | Sigilare grup de măsură | PV sigilare | operator de rețea (OD) | **FD** |
| 13 | Testare funcții RfG | PV protocol supravegheat | OD/OTS | **FD** |
| 14 | Termografie IR sub sarcină (bus DC, conexiuni, celule MT) | raport termografic | firmă atestată | CM |
| 15 | Verificare/autorizare ISCIR (recipiente sub presiune, dacă aplicabil) | dosar ISCIR, RSVTI | firmă autorizată RSVTI | **FD** |
| 16 | Etichetare completă (100 %) | listă de verificare | RTE + beneficiar | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant/OD/specialist PSI, după caz); CM = control în masă; CQ = control calitate recepție materiale.

### PTh-I.9.2. Faze determinante — detaliu

- **Priza de pământ înainte de acoperire** — conductorul de contur devine inaccesibil odată îngropat; orice deficiență constatată ulterior necesită săpături costisitoare.
- **Ancorarea containerelor** — element critic dublu (rezistență seismică conform memoriul de structură + prevenirea abuzului mecanic al celulelor, DTAC §3.2), verificat obligatoriu înainte de punerea sub tensiune.
- **Șanțurile de cablu DC/AC/MT înainte de acoperire** — relevarea topografică as-built este singura evidență a traseului real pentru mentenanța viitoare.
- **Proba cuvei de retenție ulei și a bazinului de retenție ape de stingere** — elemente de protecție a mediului, verificate obligatoriu înainte de punerea în funcțiune.
- **Verificarea protecțiilor MT** — securitatea întregii instalații de racordare depinde de reglajele corecte.
- **Testarea funcțională a sistemelor de detecție/stingere/E-stop** — condiționează avizul/autorizația de securitate la incendiu (DTAC §13.5); efectuată în prezența specialistului PSI atestat.
- **Sigilarea grupului de măsură** — act cu valoare contractuală/comercială, executat exclusiv de operatorul de rețea.
- **Testarea funcțiilor RfG** — condiționează Notificarea Operațională de Punere în Funcțiune și, ulterior, licența de exploatare comercială ANRE.
- **Verificarea/autorizarea ISCIR** — dacă recipientele sub presiune ale sistemului de stingere depășesc pragul de exceptare, punerea în funcțiune a acestora este condiționată de finalizarea dosarului RSVTI.

### PTh-I.9.3. Cartea tehnică a construcției — capitol instalații

(vezi §PTh-I.12, dezvoltare completă)

---

## PTh-I.10. Note de corelare cu alte specialități

Prezentul supliment de instalații se corelează obligatoriu cu celelalte specialități ale documentației, fără a le dubla conținutul (regula de aur nr. 8 a platformei — zero duplicare de conținut):

- **Cu specialitatea de rezistență (`structura.md` + suplimentul PTh de structură):** fundațiile/platformele containerelor (D01) și forța de ancorare seismică (F_b ≈ 114 kN/container, calculată la faza generală §2.3) sunt obiectul detaliat al memoriului de structură — prezentul document tratează doar interfața electrică (legarea la pământ, cablarea) și cerințele de nivelare/toleranță impuse de producătorul de container. Fundația și armarea radierului postului de transformare (D12 poz. 1, 6) sunt, similar, obiectul detaliat al specialității de rezistență.
- **Cu specialitatea de arhitectură (`arhitectura.md`):** amplasarea containerelor, a PT-ului și a stâlpilor de iluminat/CCTV (D20) respectă planul general de amplasare din piesele desenate de arhitectură; distanțele de siguranță între containere și față de împrejmuire (DTAC §13.2) sunt cele stabilite prin planul de situație, coroborat cu scenariul de securitate la incendiu.
- **Cu securitatea la incendiu (`scenariu-psi.md`):** măsurile specifice de securitate la incendiu ale instalațiilor electrice (compartimentarea PT/containerelor, distanțele de siguranță, treceri etanșe — §PTh-I.7.3) sunt cele tratate integral în scenariul de securitate la incendiu dedicat — prezentul document face trimitere, **fără a relua** breviarul de calcul al scenariului PSI, la dimensionarea sursei/rezervei de apă (§PTh-I.4.12), a suprafeței de decompresie (§PTh-I.4.13) și a distanțelor de compartimentare.
- **Cu proiectul de racordare avizat de OD/OTS:** reglajele finale ale protecțiilor MT, ale protecției de interfață și ale funcțiilor RfG (§PTh-I.4.8, §PTh-I.8.2), precum și secțiunea finală a cablului MT de racord și distanța reală până la PMD, se confirmă prin proiectul de racordare aprobat prin ATR — valorile din prezentul supliment sunt dimensionante, nu definitive până la avizare.
- **Cu studiul geotehnic:** rezistivitatea solului adoptată pentru dimensionarea prizei de pământ (D09, §PTh-I.4.9) și analiza de risc la trăsnet (§PTh-I.4.10) sunt ipoteze de calcul care se confirmă/ajustează prin măsurătorile geotehnice și izokeraunice specifice amplasamentului definitiv.
- **Cu raportul de testare UL 9540A al producătorului**, odată disponibil pentru echipamentul contractat: distanțele de siguranță între containere (DTAC §13.2), suprafața de decompresie (§PTh-I.4.13), debitul/durata sistemului de răcire cu apă (§PTh-I.4.12) și necesarul real de compartimentare fizică se recalculează pe baza datelor experimentale specifice, care prevalează asupra ipotezelor conservatoare adoptate în prezentul supliment.

---

## PTh-I.11. Cadru normativ de detaliere — sinteză completă

Cadrul normativ aplicat cumulat de DTAC (§1.4, reluat integral) și de prezentul supliment P.Th. (§PTh-I.1.2):

| Categorie | Normative |
|---|---|
| Instalații electrice generale | I7-2011, NTE 007/08/00, PE 107 (NTE 006/06/00), NTE 001/007 |
| Verificări și PIF | PE 116/1994, PE 118/1992, PE 124, PE 132 |
| Legare la pământ și paratrăsnet | NP 004/2003, 1.RE-Ip 30/2004, SR EN/IEC 62305-1…4 |
| Aparataj și echipamente electrice | SR EN IEC 61439-1/-2, SR EN IEC 62271-200, SR EN 60076 |
| Scurtcircuit | IEC 60909 (partea AC), date de producător (partea DC, §PTh-I.4.5) |
| Sisteme de stocare a energiei — siguranță | IEC 62933 (seria), IEC 62619, IEC 63056, UL 9540, UL 9540A |
| Securitate la incendiu specifică BESS | NFPA 855, NFPA 68/69, EN 14994 |
| Atmosfere explozive | Directiva 2014/34/UE (ATEX), SR EN 60079-10-1, SR EN 60079-14 |
| Securitate la incendiu — construcții | P118-1/1999, P118-2/2013, P118-3/2015, Ordinul MAI 129/2016, HG 571/2016 |
| Recipiente sub presiune | Legea nr. 64/2008, colecția PT C ISCIR |
| Utilaje de ridicare | PT R1-2010 (ISCIR) |
| Racordare la rețea | Reg. (UE) 2016/631 (RfG), Cod RET/Cod RED, ordine ANRE de racordare/licențiere |
| Calitate în construcții | Legea nr. 50/1991 Anexa 1, Legea nr. 10/1995, HG nr. 907/2016, C56-2002 |

---

## PTh-I.12. Cartea tehnică a construcției — capitol instalații

La finalizarea execuției se predă beneficiarului capitolul de instalații electrice al cărții tehnice, cuprinzând:

| Document | Conținut |
|---|---|
| Planuri as-built | traseele reale ale tuturor cablurilor DC/AC/MT, poziția reală a fiecărui container/PCS/rack, priza de pământ completă |
| Scheme finale | schema monofilară actualizată MT/JT/DC, schema de conexiuni a fiecărui container și rack |
| Fișe tehnice echipamente | toate echipamentele montate (celulă, modul, rack, container, PCS, transformator, celule MT, SCADA/EMS/BMS, detecție/stingere, HVAC, SPD) + certificate de conformitate + raport UL 9540A (dacă disponibil) |
| Buletine de probe | toate buletinele PRAM, de izolație, de rezistență priză de pământ, de termografie, protocoalele de probă per rack (§PTh-I.6.3) |
| Procese-verbale faze determinante | toate PV-urile FD semnate (§PTh-I.9.2) |
| Dosar ISCIR (dacă aplicabil) | autorizații/verificări tehnice ale recipientelor sub presiune, carte tehnică macara |
| Protocol RfG | configurația finală a funcțiilor de sistem + PV testare supravegheată OD/OTS |
| Certificat/notificare OD/OTS | Notificarea Operațională de Punere în Funcțiune, sigilarea grupului de măsură |
| Aviz/autorizație de securitate la incendiu | emis de ISU, pe baza scenariului de securitate la incendiu dedicat |
| Instrucțiuni de exploatare | operare SCADA/EMS/BMS, proceduri de deconectare de urgență, plan de intervenție PSI (trimitere la `scenariu-psi.md`) |
| Program de mentenanță | verificări periodice priză de pământ, SPD, termografie, revizie PCS/HVAC, calibrare senzori detecție gaz/fum, verificare periodică recipiente sub presiune (ISCIR) |
| Garanții | certificate de garanție module/rack-uri (cicluri/ani), PCS, transformator, container |

Cartea tehnică se completează pe tot parcursul execuției și constituie baza recepției la terminarea lucrărilor, a punerii în funcțiune definitive avizate de operatorul de rețea, a autorizării de securitate la incendiu și a exploatării ulterioare a instalației.

---

## PTh-I.13. Anexă — Tabel de corespondență planșe de detaliu D01–D20

| Cod | Titlu | Scară | Capitol asociat breviar/montaj |
|---|---|---|---|
| D01 | Ancorare container pe platforma de beton armat | 1:20/1:10 | §PTh-I.3.1, corelare structură |
| D02 | Montaj rack + cablare bus DC interior container | 1:10 | §PTh-I.3.2, §PTh-I.4.2 |
| D03 | Cablare instrumentație CMU/RBMS | 1:5 | §PTh-I.3.2 |
| D04 | Contactor DC principal container + E-stop | 1:10 | §PTh-I.3.3, §PTh-I.6.5 |
| D05 | Șanț cablu DC/AC JT între containere/PCS/PT | 1:20 | §PTh-I.7.2 |
| D06 | Șanț cablu MT 20 kV | 1:20 | §PTh-I.7.2 |
| D07 | Subtraversare drum tehnologic | 1:20 | §PTh-I.7.2 |
| D08 | Cămin de tragere/vizitare MT | 1:20 | §PTh-I.4.4 |
| D09 | Priză de pământ — electrod + contur | 1:10/1:20 | §PTh-I.3.5, §PTh-I.4.9 |
| D10 | Legare echipotențială container–structură | 1:5 | §PTh-I.3.5 |
| D11 | Paratrăsnet — captare + coborâre (PT + containere) | 1:20 | §PTh-I.3.5, §PTh-I.4.10 |
| D12 | Fundație/platformă PT + cuvă retenție ulei | 1:20 | §PTh-I.3.4, corelare structură |
| D13 | Montaj SPD — DC/AC/MT | 1:5 | §PTh-I.4.7, §PTh-I.5.12 |
| D14 | Celule MT — plan de echipare | 1:20 | §PTh-I.3.4, §PTh-I.5.7 |
| D15 | Panouri de decompresie pe anvelopa containerului | 1:10 | §PTh-I.3.8, §PTh-I.4.13 |
| D16 | Sistem detecție gaz H₂/CO + rețea VESDA | 1:10 | §PTh-I.3.7, §PTh-I.6.4 |
| D17 | Sistem de stingere aerosol condensat/gaz inert | 1:10 | §PTh-I.3.7, §PTh-I.8.3 |
| D18 | Sistem exterior de răcire cu apă (drencer) | 1:10 | §PTh-I.3.7, §PTh-I.4.12 |
| D19 | Bazin de retenție ape de stingere + rigolă platformă | 1:20 | §PTh-I.4.12 |
| D20 | Etichetare, marcaj, pancarte de securitate + stâlp CCTV/iluminat | 1:5/1:10 | §PTh-I.9.1 |

---

*Supliment de fază P.Th. întocmit pentru exemplul numeric de execuție de referință — 10 containere × 2 MWh (20 MWh total, 10 MW, 0,5C) — în deplină coerență cu memoriul DTAC (`instalatii.md`) al aceleiași specialități și cu memoriul general (`general.md`) al obiectivului BESS. Toate formulele și detaliile rămân aplicabile parametric la orice combinație de capacitate/număr de containere din plaja 10–50 MWh, prin recalcularea directă a cifrelor din §PTh-I.4, conform relațiilor de scalare din DTAC §1 și §3. Reglajele finale ale protecțiilor MT, ale protecției de interfață și ale funcțiilor RfG, precum și rezistivitatea solului, densitatea de lovituri de trăsnet, curentul de scurtcircuit disponibil la punctul de racordare și — element specific și critic acestei tehnologii — raportul de testare la propagarea termică UL 9540A al configurației exacte de celulă/modul/rack/container contractate, se confirmă la faza P.Th. definitivă prin studiul geotehnic, harta izokeraunică a amplasamentului real, proiectul de racordare aprobat de operatorul de distribuție/transport și fișa tehnică finală a producătorului de echipament BESS.*
