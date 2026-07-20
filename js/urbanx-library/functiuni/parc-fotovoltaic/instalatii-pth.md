# SUPLIMENT DE FAZĂ P.Th. — INSTALAȚII ELECTRICE — PARC FOTOVOLTAIC

## PTh-I.1. Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază P.Th.** (Proiect Tehnic de execuție, conform HG nr. 907/2016, Anexa nr. 8) pentru memoriul de instalații electrice al obiectivului **Centrală Electrică Fotovoltaică (CEF) — parc fotovoltaic**, cu putere instalată în curent continuu parametrică **P_DC ∈ 500 kWp … 50 MWp**, dezvoltat la faza DTAC în `instalatii.md`. Documentul de față **nu repetă** conținutul DTAC (arhitectura electrică generală, formulele de scalare, alegerea nivelului de tensiune, justificările tehnico-economice) — acestea rămân valabile prin trimitere directă — ci adaugă exclusiv **nivelul de detaliere necesar execuției**: detalii de montaj la scară mare, breviare de calcul extinse la *toate* tronsoanele reale, fișe tehnice complete de echipament, tabele de probe cu praguri numerice, tehnologia de montaj, protocoale de PIF/reglaj și planul de control al calității.

Pentru coerența cifrelor cu faza DTAC, suplimentul este dezvoltat pe **exemplul numeric de referință P_DC = 2.000 kWp** deja etichetat ca atare în `instalatii.md` (§4.3): 134 stringuri de 27 module (3.618 module × 555 Wp = 2.007,99 kWp instalat), 8 invertoare de string de 200 kW (P_AC ≈ 1.600 kW, ILR 1,25), 1 post de transformare 1.600 kVA, 0,4/20 kV, Dyn11, racord LES 20 kV la 46,2 A, energie anuală ≈ 2.635 MWh/an. **Toate formulele rămân parametrice** (recalculabile la orice P_DC prin relațiile din DTAC §1, §4); exemplul servește la a produce cifre concrete, verificabile, pentru detaliile de execuție — exact rolul unui proiect tehnic față de un memoriu de fază DTAC.

### PTh-I.1.1. Nivelul de detaliere suplimentar față de DTAC

| Element | Nivel DTAC | Nivel P.Th. (suplimentar, acest document) |
|---|---|---|
| Scheme | arhitectura electrică de principiu (bloc), formule de scalare | scheme de execuție complete: fiecare combiner, fiecare invertor, traseele reale de cablu, cu identificatori (INV-01…08, CB-01…16) |
| Detalii de montaj | — | 16 detalii de execuție numerotate (D01…D16), scări 1:5…1:20, tabel poziții + text de execuție/toleranțe |
| Breviar | string-tip + un exemplu numeric complet | dimensionarea **tuturor** tronsoanelor DC/AC/MT reale ale exemplului, calculul complet al prizei de pământ și al protecției la trăsnet, verificarea la scurtcircuit și selectivitatea protecțiilor |
| Echipamente | tipuri și parametri de referință | fișe tehnice complete per echipament major (invertor, combiner, trafo, celule MT, SCADA/PPC, SPD) |
| Probe | enumerare normativă | tabel complet parametru/valoare/durată/criteriu de admisie, pe toate instalațiile |
| Montaj | principii generale | succesiune tehnologică, susțineri, adâncimi de pozare, treceri la foc, control de calitate pe fază |
| PIF | menționată | protocoale complete de măsurare per string/combiner, parametrizare RfG, sincronizare cu OD |
| Calitate | — | Plan de Control al Calității (PCC) cu faze determinante și cartea tehnică — capitol instalații |

### PTh-I.1.2. Cadru normativ de detaliere (adăugat față de DTAC §0.1)

Cadrul normativ complet al obiectivului este cel enumerat la DTAC §0.1 (I7/2011, NTE 007/401/003/006, PE 101A/132/116/118, NP004/2003, IEC 62305, SR EN 62446-1, IEC 62548, IEC 61730/61215, IEC 62109, IEC 61439, IEC 62271-200, SR EN 60076, SR EN 50618, Reg. UE 2016/631, Ord. ANRE 59/2013+235/2019+11/2023+208/2018, P118). La acestea, faza P.Th. adaugă normele de **detaliere a execuției**:

| Normativ | Domeniu de detaliere P.Th. |
|---|---|
| **NTE 007/08/00** | adâncimi de pozare, distanțe între cabluri, moduri de pozare (îngropat, tub, jgheab) și factori de corecție |
| **PE 107 (NTE 006/06/00)** | execuția rețelelor de cabluri electrice — tehnologie de tragere, raze de curbură |
| **PE 116/1994** | metodologia completă a încercărilor și măsurătorilor la PIF |
| **1.RE-Ip 30/2004** | execuția prizelor de pământ — geometrie, materiale, adâncimi |
| **SR EN 62305-2** | metodologia de calcul a riscului (analiza cantitativă R vs. R_T) pentru clasa de protecție la trăsnet |
| **SR EN 62446-1** | protocolul complet de PIF categoria 2 (sistem conectat la rețea): teste, documentație, formulare |
| **SR EN 61537 / SR EN 50085** | sisteme de jgheaburi și tuburi de protecție pentru cabluri |
| **SR EN 60529** | grade de protecție IP ale echipamentelor (combinere, cutii, tablouri) |
| **C56-2002** | verificarea calității execuției lucrărilor de construcții-montaj (aplicabil platformelor/fundațiilor PT) |

---

## PTh-I.2. Detalii de execuție (D01–D16)

Detaliile de mai jos completează planșele de execuție ale proiectului tehnic. Fiecare detaliu este redactat la scara indicată, cu tabel de poziții (element/descriere/material-dimensiune) și cu textul cerințelor de execuție și al toleranțelor admise. Numerotarea D01…D16 este cea adoptată în lista de planșe a proiectului; ordinea urmează fluxul de execuție (de la câmpul DC spre punctul de racord).

### D01 — Detaliu montaj cutie de conexiuni DC (combiner box) pe structura mesei — scara 1:10

Combinerul se montează pe stâlpul median al mesei fotovoltaice, la o înălțime care asigură accesul de mentenanță fără scară (recomandat 0,80–1,20 m deasupra cotei terenului amenajat) și ferit de proiecția de umbră a rândului din spate.

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Consolă de fixare | profil L sau U sudat/șurubat pe stâlpul mesei | oțel zincat 4 mm, 2 buc./cutie |
| 2 | Cutie combiner | corp + capac cu garnitură | policarbonat/poliester armat, IP65, 400×500×200 mm |
| 3 | Presetupe cablu intrare | 9 (pentru combiner de 9 stringuri) sau 8 | PG16, cu inel de etanșare, cuplu strângere 3–4 Nm |
| 4 | Presetupă cablu ieșire | 1 (magistrala DC spre invertor) | PG29/PG36 funcție de secțiune |
| 5 | Șină DIN interioară | susține siguranțele gPV și SPD | oțel zincat, lățime 35 mm |
| 6 | Bornă echipotențializare | legătură la conductorul de contur | Cu 16 mm², clemă cu șaibă dințată |
| 7 | Etichetă identificare | cod combiner + polaritate + avertisment | gravată/rezistentă UV, „CB-xx — PERICOL TENSIUNE DC" |

**Cerințe de execuție și toleranțe.** Cutia se montează cu presetupele orientate în jos (evitarea infiltrării apei), la o înclinare a corpului ≤ 5° față de verticală. Cablurile de intrare (string) se introduc cu o buclă de descărcare a tracțiunii minimă de 150 mm în interiorul cutiei, înainte de conectarea la borne. Cuplul de strângere al bornelor se respectă strict conform fișei producătorului (indicativ 1,5–2,5 Nm la borne de 6 mm² string, 6–8 Nm la ieșirea magistralei), verificat cu cheie dinamometrică și consemnat în fișa de montaj — o bornă necorect strânsă este cea mai frecventă cauză de hot-spot rezistiv. Toleranța de poziționare pe stâlp: ±50 mm față de cota de proiect. Se interzice montarea combinerului direct pe fața inferioară a modulelor (supraîncălzire prin radiație reflectată).

### D02 — Detaliu traseu cablu solar DC pe structura mesei (jgheab, cleme, protecție UV) — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Clemă de fixare cablu solar | prindere pe rama/purlina structurii, la interval regulat | plastic UV-stabil sau inox, interax ≤ 0,5 m orizontal / 0,3 m vertical |
| 2 | Jgheab tehnic (opțional pe traseele comune) | canal perforat pentru fascicule de cabluri multiple | oțel zincat perforat, lățime 100–150 mm |
| 3 | Cablu solar H1Z2Z2-K | conductor de la modul la combiner | 1×6 mm² Cu, izolație EN 50618, 1.500 V DC |
| 4 | Manșon de protecție la trecerea prin muchii metalice | evită tăierea izolației | manșon spiralat sau bandă antiabraziune |
| 5 | Rezervă de cablu (buclă „S") la fiecare conector | permite dilatarea termică fără tensionarea conectorului | rază minimă de curbură ≥ 4× diametrul cablului |

**Cerințe de execuție și toleranțe.** Cablul solar circulă exclusiv pe structura metalică sau în jgheab dedicat, niciodată direct pe sol sau prin contact cu muchii ascuțite fără protecție. Fixarea cu cleme respectă interaxul din tabel; o fixare prea rară permite oscilația cablului sub vânt și abraziunea izolației prin frecare de structură. Raza minimă de curbură admisă: 4× diametrul exterior al cablului (uzual ~30 mm pentru 1×6 mm²) — nerespectarea acesteia crește câmpul electric local și grăbește îmbătrânirea izolației. Toate joncțiunile string-la-string se fac exclusiv prin conectori MC4 sertizați (D03), fără lipire sau răsucire. Traseul se marchează pe planul as-built cu identificatorul stringului (ex. „INV-03/CB-06/STR-114").

### D03 — Detaliu conector MC4 — sertizare, mufare, etanșare — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Mufă tată/mamă | corp conector polaritate +/− | policarbonat, IP68 cuplat |
| 2 | Contact metalic sertizat | conductor–contact, sertizare cu sculă dedicată | Cu cositorit, secțiune conform cablu (6 mm²) |
| 3 | Garnitură de etanșare | inel O-ring pe fiecare jumătate | EPDM/silicon |
| 4 | Piuliță de blocare | fixează cablul în corpul conectorului, previne smulgerea | plastic, cuplu strângere conform fișă (indicativ 2–3 Nm) |

**Cerințe de execuție și toleranțe.** Sertizarea se execută **exclusiv** cu scula dedicată tipului de conector și de secțiune (nicio sertizare cu clește universal) — o sertizare incorectă are rezistență de contact mărită, sursă de hot-spot și de arc DC. Se folosesc **numai conectori de la același producător cu cablul** (compatibilitate garantată de etanșeitate și de contact); mixarea mărcilor este interzisă explicit, fiind cea mai frecventă cauză de incendii DC documentată în parcurile fotovoltaice. Fiecare conector asamblat se verifică prin tragere manuală (test de smulgere) și, statistic, pe un eșantion de minimum 5 % din conectori, prin măsurarea rezistenței de contact (< 1 mΩ). Cuplarea finală se face „până la clic" (blocare mecanică audibilă); cuplarea incompletă lasă un joc care generează arc la vibrație.

### D04 — Detaliu șanț cablu DC/AC de joasă tensiune — secțiune tip — scara 1:20

| Poz. | Element | Descriere | Dimensiune |
|---|---|---|---|
| 1 | Adâncime de pozare | de la cota terenului amenajat la generatoarea superioară a cablului | 0,80 m (conform NTE 007/08/00, trafic pieton/utilaj ușor) |
| 2 | Pat de nisip inferior | strat de protecție mecanică sub cablu | 0,10 m, nisip cernut fără corpuri dure |
| 3 | Cablu(ri) | 1…n cabluri JT paralele, distanță între ele | ≥ 1× diametru cablu (evitarea încălzirii reciproce) |
| 4 | Pat de nisip superior | acoperire directă a cablului | 0,10 m |
| 5 | Bandă de semnalizare | avertizare la săpături ulterioare | PVC galben „ATENȚIE CABLU ELECTRIC", la 0,30 m deasupra cablului |
| 6 | Umplutură compactată | strat de pământ excavat, compactat pe straturi | 0,95–1,00 m rest până la cotă, compactare 95 % Proctor |
| 7 | Lățime șanț | funcție de numărul de cabluri | 0,40 m (1–3 cabluri) … 0,80 m (fascicule multiple) |

**Cerințe de execuție și toleranțe.** Adâncimea minimă de 0,80 m se majorează la 1,00 m la traversarea drumurilor de incintă (trafic utilaje grele) și se reduce la 0,60 m doar pe trasee interioare protejate suplimentar prin tub rigid — abateri se admit doar cu acordul proiectantului. Distanța minimă față de alte rețele îngropate (apă, dacă există): 0,50 m pe orizontală, 0,25 m pe verticală la intersecție (cu tub de protecție dacă distanța nu se poate respecta). Compactarea umpluturii se verifică prin încercare Proctor la fiecare 200 m liniari sau la schimbarea tipului de sol; abaterea admisă a gradului de compactare: ≥ 95 % din Proctor normal. Traseul se relevă topografic (as-built) înainte de acoperire — fază determinantă.

### D05 — Detaliu șanț cablu MT 20 kV — secțiune tip — scara 1:20

| Poz. | Element | Descriere | Dimensiune |
|---|---|---|---|
| 1 | Adâncime de pozare | generatoarea superioară a cablului MT | 1,00 m (teren agricol/pieton), 1,20 m sub drumuri |
| 2 | Pat de nisip inferior | protecție mecanică | 0,10 m |
| 3 | Cablu MT A2XS(F)2Y 12/20 kV | 1 circuit trifazat (3 cabluri unipolare sau 1 tripolar) | secțiune conform breviar (§PTh-I.4.3) |
| 4 | Distanță între faze (dacă unipolare) | evitarea încălzirii reciproce și a forțelor electrodinamice | ≥ 1× diametrul cablului, în trefoil sau plan |
| 5 | Pat de nisip superior | acoperire | 0,10 m |
| 6 | Dală de protecție mecanică | protecție suplimentară obligatorie la MT | dale prefabricate din beton, lățime ≥ lățimea șanțului + 0,10 m fiecare parte |
| 7 | Bandă de semnalizare MT | avertizare specifică medie tensiune | PVC roșu „ATENȚIE CABLU ÎNALTĂ/MEDIE TENSIUNE", la 0,30 m deasupra dalei |
| 8 | Umplutură compactată | pământ excavat compactat pe straturi de 20 cm | rest până la cotă, compactare ≥ 95 % Proctor |

**Cerințe de execuție și toleranțe.** Dala de protecție mecanică din beton este **obligatorie** pe toată lungimea cablului MT (spre deosebire de JT, unde e opțională) — protejează împotriva perforării accidentale la săpături ulterioare, cu risc letal la MT. Raza minimă de curbură a cablului MT la pozare: **15× diametrul exterior** (mult mai mare decât la JT, din cauza rigidității izolației XLPE și a ecranului); nerespectarea produce microfisuri în izolație, cauză de defect întârziat (luni/ani după PIF). Tragerea cablului se face cu efort de tragere sub limita admisă de producător (dinamometru pe capul de tragere), fără torsionare. La joncțiuni și terminale se respectă strict tehnologia și timpii de întărire a rășinii/mansonului termocontractabil, executați exclusiv de personal atestat pentru cabluri MT.

### D06 — Detaliu subtraversare drum tehnologic — cablu în tub de protecție — scara 1:20

| Poz. | Element | Descriere | Dimensiune |
|---|---|---|---|
| 1 | Tub de protecție | PVC/PEHD rigid, pentru trecerea cablului sub drum | Ø 160–200 mm, funcție de nr. cabluri |
| 2 | Adâncime sub drum | de la cota căii de rulare la generatoarea superioară a tubului | ≥ 1,00 m (JT) / ≥ 1,20 m (MT) |
| 3 | Cămin de capăt | acces la fiecare cap al subtraversării, pentru tragere/verificare | beton prefabricat sau zidărie, cu capac carosabil dacă e în zona de trafic |
| 4 | Fir de tragere de rezervă | rămâne în tub după pozarea cablului, pentru intervenții viitoare | poliamidă, capăt la ambele camine |
| 5 | Metoda de execuție | foraj orizontal dirijat (fără decopertarea drumului) sau șanț deschis cu refacere structură rutieră | funcție de trafic și de structura drumului existent |

**Cerințe de execuție și toleranțe.** Numărul și diametrul tuburilor se dimensionează cu o rezervă de minimum 30 % față de necesarul imediat, pentru extinderi ulterioare (cablu suplimentar, fibră optică SCADA). Tuburile se pozează cu pantă continuă (fără puncte joase care ar colecta apă) și se etanșează la capete cu manșoane spumante după tragerea cablului, pentru a împiedica pătrunderea rozătoarelor și a apei. La foraj orizontal dirijat, adâncimea reală se verifică prin sondă de localizare pe toată lungimea, iar abaterea de traiectorie admisă față de proiect este ≤ 0,30 m pe orizontală și ≤ 0,20 m pe verticală.

### D07 — Detaliu cămin de tragere/vizitare cablu MT — scara 1:20

| Poz. | Element | Descriere | Dimensiune |
|---|---|---|---|
| 1 | Corp cămin | beton prefabricat sau turnat monolit, cu ramă și capac | interior util ≥ 1,00×1,00×1,20 m (adâncime funcție de cablu) |
| 2 | Capac | carosabil (dacă e în zona de circulație) sau necarosabil, cu inscripția „ELECTRIC MT" | fontă/beton, clasă de rezistență conform amplasare |
| 3 | Console de sprijin cablu | susțin bucla de rezervă de cablu în interiorul căminului | oțel zincat sau plastic, interax 0,50 m |
| 4 | Sistem de drenaj | evacuarea infiltrațiilor (strat de piatră spartă la bază) | strat drenant 0,20 m |
| 5 | Bornă de împământare | continuitatea ecranului cablului, legată la priza de pământ | Cu 25 mm² |

**Cerințe de execuție și toleranțe.** Căminele se amplasează la maximum 80–100 m distanță pe traseele lungi (pentru facilitarea tragerii cablului MT, care are efort de tragere limitat) și obligatoriu la fiecare schimbare de direcție cu unghi > 30° și la fiecare joncțiune/terminal. Bucla de rezervă de cablu lăsată în cămin: minimum 1,5 m per cap, pentru a permite o eventuală refacere de joncțiune fără tensionarea traseului. Verificarea etanșeității la infiltrații se face vizual la 6 luni de la execuție, în perioada de garanție.

### D08 — Detaliu priză de pământ — electrod vertical și conductor de contur — scara 1:10 (secțiune) / 1:20 (plan)

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Electrod vertical (țăruș) | electrod de dispersie, baterie la fiecare ~12 m pe conturul câmpului | oțel-cupru (Cu-bonded steel) sau OL-Zn, Ø 17,2 mm (⅝"), lungime 3,0 m |
| 2 | Conductor de contur (orizontal) | leagă toți electrozii și fiecare rând de structuri | platbandă OL-Zn 40×4 mm sau conductor Cu funie 50 mm², la −0,8 m |
| 3 | Piesă de legătură electrod–conductor | îmbinare mecanică cu strat anticoroziv | clemă bimetalică sau sudură exotermică (preferată la MT/PT) |
| 4 | Priză de măsură | punct demontabil pentru măsurarea R_p fără deconectarea instalației | cutie de vizitare, cu bornă de separare |
| 5 | Legătură la structura metalică | fiecare rând de mese se leagă la conductorul de contur | Cu 16–25 mm², la fiecare al doilea/al treilea stâlp |

**Cerințe de execuție și toleranțe.** Conform breviarului DTAC §11.1: la rezistivitate de calcul ρ = 100 Ω·m, un electrod de 3 m dă R_e ≈ 34,7 Ω; pentru ținta R_p ≤ 1 Ω (cu factor de utilizare η ≈ 0,7 la interax ≥ 1× lungimea electrodului) rezultă necesarul de **≈ 50 electrozi** legați în paralel prin conductorul de contur. Pentru exemplul de referință (teren util ≈ 200 × 110 m, perimetru ≈ 620 m), spațierea rezultată este de **~12 m/electrod pe contur (≈ 52 electrozi)**, valoare care acoperă necesarul calculat. **Valoarea rezistivității solului (ρ) este o ipoteză de calcul preliminară — se confirmă obligatoriu prin măsurare Wenner pe amplasament** (studiu geotehnic, DTAC §1.2 pct. 4); dacă rezistivitatea reală diferă semnificativ, numărul de electrozi/spațierea se recalculează înainte de execuție, nu doar la PIF. Adâncimea de batere a electrodului: minimum 2,5 m sub cota terenului finit (electrod de 3 m cu capul la −0,5 m), pentru a atinge straturi cu umiditate mai stabilă. Sudura exotermică (obligatorie la priza PT/MT, recomandată pe contur) se execută doar de personal instruit, cu formă/încărcătură conform diametrului conductoarelor; clemele mecanice se strâng la cuplul din fișa producătorului și se protejează anticoroziv (vopsea bituminoasă) după montaj.

### D09 — Detaliu legare echipotențială structură–cadru modul–conductor de contur — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Cadru modul (aluminiu) | punct de legare la structură, prin șurub de împământare dedicat sau clemă perforantă | șurub M6 inox + șaibă dințată, sau clemă tip „lay-in lug" |
| 2 | Conductor de legare cadru–structură | continuitate electrică modul–masă | Cu 6 mm² sau bandă flexibilă echivalentă |
| 3 | Structură metalică (masă) | legată la conductorul de contur la fiecare rând | vezi D08 poz. 5 |
| 4 | Punct de măsură continuitate | acces pentru verificarea R < 0,1 Ω conform IEC 62446-1 | pe fiecare al 10-lea modul (eșantion), sau conform protocol PIF |

**Cerințe de execuție și toleranțe.** Fiecare modul se leagă electric la cadrul mesei printr-un punct dedicat de legare la pământ (nu se admite continuitate „prin frecare" a șuruburilor de prindere mecanică — acestea nu garantează contact electric pe termen lung din cauza coroziunii/vibrației). Legătura cadru-structură se verifică prin măsurarea rezistenței de continuitate: valoare admisă **< 0,1 Ω** (conform IEC 62446-1) între cadrul oricărui modul și punctul de legare la priza de pământ. Se interzice folosirea vopselei/lacului de protecție a structurii ca strat izolator sub punctele de legare — acestea se curăță local (răzuire) înainte de montarea clemei.

### D10 — Detaliu montaj paratrăsnet (tijă de captare + coborâre) pe postul de transformare — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Tijă de captare | dispozitiv de captare, poziționat conform metodei sferei rotative/unghiului de protecție | oțel inox sau OL-Zn, înălțime 1,0–3,0 m peste cota acoperișului PT |
| 2 | Suport tijă | fixare rigidă pe structura/acoperișul PT | consolă metalică, ancorată în structura de rezistență (nu doar în învelitoare) |
| 3 | Conductor de coborâre | traseu vertical cel mai scurt, minimum 2 coborâri pentru redundanță | platbandă OL-Zn 25×4 mm sau conductor rotund Ø 8 mm, fixat la interax ≤ 1,0 m |
| 4 | Piesă de separație (întrerupător de măsură) | permite deconectarea coborârii de priza de pământ pentru măsurarea R_p | la înălțime accesibilă (≈ 1,5–2,0 m), cu capac de protecție |
| 5 | Legătură la priza de pământ | conectare la conductorul de contur/priza PT | conform D08, sudură exotermică preferată |

**Cerințe de execuție și toleranțe.** Poziția tijei se stabilește prin metoda sferei rotative (raza funcție de nivelul de protecție LPL adoptat în urma analizei de risc, §PTh-I.4.5) astfel încât întregul volum al PT și al echipamentelor exterioare adiacente să fie în zona protejată — nu se admite amplasarea „la estimare". Coborârea urmează traseul cel mai scurt și cel mai direct posibil (fără bucle, fără unghiuri ascuțite < 90°, rază de curbură minimă 0,20 m), pentru a minimiza inductanța și supratensiunea indusă la lovitură. Se prevăd minimum două coborâri distincte pe fețe opuse ale construcției, pentru redundanță. Piesa de separație se montează accesibil, la înălțime care exclude atingerea accidentală, dar permite măsurarea periodică a rezistenței de dispersie fără afectarea continuității în restul timpului. **Structurile mesei fotovoltaice și modulele NU se folosesc drept dispozitiv de captare** — protecția la trăsnet a câmpului DC se realizează exclusiv prin SPD-uri coordonate (D12) și prin echipotențializare, nu prin captare directă pe module.

### D11 — Detaliu fundație/platformă post de transformare + cuvă de retenție ulei — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Radier de fundație | placă din beton armat sub anvelopa PT | beton C25/30, armare conform breviarul de structură (§ structura.md cap. 6) |
| 2 | Platformă tehnologică | zonă betonată perimetrală, acces manevră/mentenanță | beton C20/25, pantă de scurgere 1,5 % spre rigolă |
| 3 | Cuvă de retenție ulei | volum ≥ 100 % din volumul de ulei al transformatorului (dacă tip ulei) | beton impermeabilizat sau tavă metalică, capacitate ≥ volum ulei trafo |
| 4 | Strat de pietriș în cuvă | stingerea eventualei aprinderi a uleiului scurs, disipare termică | piatră spartă, granulație 40–60 mm, grosime 0,20 m |
| 5 | Rigolă perimetrală | colectarea apelor pluviale de pe platformă, separator de hidrocarburi înainte de descărcare | beton prefabricat, cu separator dacă e cazul reglementărilor de mediu |
| 6 | Priză de fundare | electrozi înglobați în radier, integrați în priza de pământ generală | conform D08, legați la armătura radierului |

**Cerințe de execuție și toleranțe.** Cuva de retenție a uleiului este obligatorie la transformatoarele în ulei (nu și la cele uscate în rășină, care nu prezintă acest risc) și se dimensionează la minimum 100 % din volumul total de ulei declarat de producător, plus o rezervă pentru precipitații dacă cuva este descoperită. Impermeabilizarea cuvei se verifică prin probă cu apă (umplere și menținere 24 h, fără scădere de nivel) înainte de punerea în funcțiune — fază determinantă. Toleranța de planeitate a radierului: ± 5 mm/m; abaterea de la cota de nivel general: ± 10 mm. Priza de fundare (electrozi în radier) se conectează la armătura structurală prin puncte de sudură dedicate, înainte de turnare, și se continuă vizibil printr-un capăt de test la suprafață.

### D12 — Detaliu montaj SPD DC — în combiner și la intrarea invertorului — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | SPD DC tip 2 (în combiner) | montaj pe șină DIN, conexiune „în Y" (pol+ și pol− la PE, prin varistoare separate) | U_c ≥ 1.500 V DC clasă, I_n(8/20) ≥ 20 kA |
| 2 | SPD DC tip 1+2 (la intrarea invertorului, dacă traseul > 10 m) | protecție suplimentară pentru cascadare | I_imp(10/350) ≥ 12,5 kA |
| 3 | Conductor de legătură SPD–PE | cât mai scurt posibil (< 0,5 m recomandat) | Cu 6 mm², fără bucle |
| 4 | Contact de semnalizare defect | conectat la SCADA, indică epuizarea SPD | contact auxiliar N.C./N.O. conform producător |
| 5 | Siguranță de backup (dacă cerută de producător SPD) | protejează în caz de defect franc al varistorului | conform fișă SPD |

**Cerințe de execuție și toleranțe.** Lungimea conductoarelor de legătură ale SPD-ului la bornele protejate și la PE se menține cât mai scurtă (recomandat < 0,5 m total), deoarece orice lungime suplimentară introduce o inductanță care ridică tensiunea reziduală efectiv văzută de echipamentul protejat, anulând parțial rolul SPD-ului — aceasta este o cerință de execuție, nu doar de proiectare. Montajul „în Y" descris în DTAC §7.3 se respectă strict (fiecare pol la PE prin propriul varistor, cu punct comun spre priza de pământ), pentru a evita curenți de fugă permanenți care ar declanșa fals monitorul de izolație al sistemului IT flotant. Contactul de semnalizare a defectului SPD se cablează obligatoriu la SCADA — un SPD epuizat (varistor degradat după o lovitură absorbită) nu mai protejează, dar rămâne fizic montat, motiv pentru care semnalizarea de la distanță este singura modalitate practică de a-l detecta pe un parc cu sute de combinere.

### D13 — Detaliu montaj celule MT în anvelopa postului de transformare — plan de echipare — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Celulă de sosire/racord | separator de sarcină + cuțit de legare la pământ (CLP) | 24 kV, 630 A, conform DTAC §8.2 |
| 2 | Celulă de măsură | TT + TC clasă 0,2S/0,5S, sigilată de OR | conform ATR |
| 3 | Celulă de protecție trafo | întreruptor în vid + releu | 24 kV, 630 A, 16 kA·1s |
| 4 | Bară colectoare MT (dacă mai multe PT-uri) | interconectare celule | Cu, dimensionată la I_MT total al parcului |
| 5 | Covor electroizolant | protecția personalului la manevre | cauciuc electroizolant, clasă conform tensiune |
| 6 | Interlock mecanic celulă–ușă anvelopă | previne accesul cu celula sub tensiune | conform sistemul de blocare al producătorului |

**Cerințe de execuție și toleranțe.** Ordinea și dispunerea celulelor respectă schema monofilară aprobată prin proiectul de racordare (avizat OD); orice modificare de dispunere față de proiect necesită re-aviz. Distanțele minime de izolație în aer și liniile de fugă respectă clasa de tensiune 24 kV (BIL 125 kV) conform SR EN IEC 62271-200, verificate la recepția anvelopei de la producător (nu se execută pe șantier — celulele sunt module prefabricate testate în fabrică, montate „la cheie"). Interlock-ul mecanic celulă–ușă se testează funcțional la PIF (imposibilitatea deschiderii ușii anvelopei cu separatorul închis, respectiv imposibilitatea închiderii separatorului cu ușa deschisă).

### D14 — Detaliu etichetare, marcaj cabluri și tablouri, pancarte de securitate — scara 1:5/1:10

| Poz. | Element | Descriere | Standard / format |
|---|---|---|---|
| 1 | Etichetă cablu DC | cod string/combiner/invertor la ambele capete | rezistentă UV, inscripție permanentă |
| 2 | Etichetă cablu MT | cod tronson + tensiune + an execuție | plăcuță metalică/plastic dur, la fiecare cămin și capăt |
| 3 | Pancartă „PERICOL — TENSIUNE DC PREZENTĂ CHIAR CU INVERTORUL DECONECTAT" | pe fiecare combiner și la intrarea DC a invertorului | conform marcaj normalizat de securitate |
| 4 | Pancartă „PERICOL DE ELECTROCUTARE — MEDIE TENSIUNE" | pe anvelopa PT și pe împrejmuirea din jur | conform PE 118, vizibilă de la distanță |
| 5 | Schema monofilară actualizată | afișată în interiorul PT | ramă rezistentă, actualizată la fiecare modificare |

**Cerințe de execuție și toleranțe.** Etichetarea se execută înainte de PIF și se verifică 100 % în cadrul recepției — fiecare cablu, fiecare combiner și fiecare celulă poartă un identificator unic, coerent cu schema as-built și cu baza de date SCADA. Pancartele de securitate se montează în puncte vizibile de la distanța de citire normată (minimum 3 m) și se mențin lizibile pe toată durata de viață a instalației (materiale rezistente UV, fără decolorare în 10 ani).

### D15 — Detaliu montaj stâlp CCTV / iluminat perimetral + fundație — scara 1:10 (stâlp) / 1:20 (fundație)

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Stâlp metalic | susține corp iluminat + cameră CCTV | oțel zincat, înălțime 4–6 m, Ø conform calcul la vânt |
| 2 | Fundație stâlp | bloc de beton pentru încastrare | beton C16/20, dimensiuni conform calcul (funcție de moment încovoietor din vânt) |
| 3 | Cutie de conexiuni la bază | joncțiune cablu alimentare + date | IP65, cu ușă de acces și broască |
| 4 | Priză de pământ locală | legată la rețeaua generală de împământare a incintei | conform D08, electrod local + legătură la contur |
| 5 | Cablu alimentare + date | din serviciile proprii, îngropat conform D04 | conform breviar (§PTh-I.4.4) |

**Cerințe de execuție și toleranțe.** Stâlpul se verifică la răsturnare sub acțiunea vântului (conform SR EN 1991-1-4, la fel ca structurile de câmp), cu factor de siguranță minim conform normativelor de structuri metalice ușoare. Fundația se toarnă cu verificarea verticalității stâlpului (toleranță ≤ 0,5 % din înălțime) și cu timp de întărire minim 7 zile înainte de montarea echipamentelor. Fiecare stâlp se leagă individual la priza de pământ generală a incintei (nu se admit stâlpi „flotanți").

### D16 — Detaliu traversare împrejmuire — legătură echipotențială gard metalic — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Panou/plasă gard metalic | element de împrejmuire, potențial „sub tensiune" indus la trăsnet apropiat | oțel zincat, înălțime ≥ 2,0 m |
| 2 | Legătură echipotențială | fiecare secțiune de gard (la stâlpii de susținere) se leagă la priza de pământ | Cu 16 mm², la interax ≤ 20 m de-a lungul gardului |
| 3 | Poartă de acces (auto/pietonal) | continuitate electrică asigurată și peste elementul mobil (balamale) | șuntare flexibilă Cu peste balama, dacă balamaua nu garantează continuitate |
| 4 | Spațiu liber la bază gard | pentru fauna mică (cerință de mediu) | 10–15 cm liber sub panou, fără a compromite securitatea antiefracție |

**Cerințe de execuție și toleranțe.** Fiecare secțiune de gard se echipotențializează la priza generală, indiferent de distanța până la cel mai apropiat combiner/PT — un gard metalic izolat electric, aflat lângă câmpul DC sau lângă LES MT, poate prelua potențial periculos prin inducție sau prin defect la pământ apropiat. Porțile mobile (balamale, care nu garantează întotdeauna continuitate electrică bună pe termen lung din cauza coroziunii) primesc o șuntare flexibilă dedicată. Spațiul liber la baza gardului se menține fără a crea o breșă de securitate fizică (grilaj fin sau plasă suplimentară îngropată, dacă antiefracția o cere).

### D17 — Detaliu fundație și racord electric actuator tracker (variantă montaj cu urmărire solară) — scara 1:10/1:20

Detaliu aplicabil exclusiv variantei constructive cu **structuri tracker mono-axial** (DTAC §13.4); la varianta cu mese fixe acest detaliu nu se execută.

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Fundație stâlp central de tracker | încastrare pilot/fundație pentru arborele de rotație al rândului | conform calcul structural specific (moment din vânt + greutate rând) |
| 2 | Motoreductor/actuator | montat pe stâlpul central, cuplat la arborele de rotație | motor c.c. 24/48 V sau c.a., conform fișă furnizor tracker |
| 3 | Cutie de conexiuni actuator | racord alimentare + comunicație NCU | IP65, montată sub actuator, ferită de stropire directă |
| 4 | Cablu alimentare + comunicație | de la tabloul de distribuție de câmp la fiecare rând/grup de rânduri | conform breviar servicii proprii (§PTh-I.4.4), secțiune redusă (consum mic, intermitent) |
| 5 | Senzor anemometru | montat pe structură înaltă, fără umbrire, cu cablu de semnal la NCU | conform fișă furnizor, IP65 |
| 6 | Legătură echipotențială actuator–conductor de contur | continuitate electrică a arborelui/structurii mobile | Cu 6–10 mm², cu punct de legare pe partea fixă (nu pe elementul rotitor) |

**Cerințe de execuție și toleranțe.** Legătura echipotențială se realizează pe elementul **fix** al ansamblului tracker (stâlpul central, nu arborele rotitor), pentru a nu solicita mecanic conductorul de legare la fiecare ciclu de rotație zilnic; continuitatea electrică a arborelui rotitor spre partea fixă se asigură prin lagărele metalice ale rulmentului, verificată la PIF prin măsurare de continuitate în poziția extremă a cursei. Cablul de alimentare/comunicație la fiecare rând se lasă cu o **buclă de rezervă** suficientă pentru a nu fi tensionat la cursa maximă de rotație a structurii (±50…60° față de orizontală, funcție de sistem). Poziția de siguranță „stow" (DTAC §13.4) se testează obligatoriu la PIF prin comandă manuală și prin simularea pragului de viteză a vântului, verificând timpul de reacție de la comandă la atingerea poziției de siguranță.

### D18 — Detaliu borne de marcare a traseelor subterane la suprafață — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Bornă de marcare | reper vizibil la suprafață, deasupra traseului de cablu MT și la fiecare schimbare de direcție | beton prefabricat sau plastic rezistent UV, înălțime 0,30–0,40 m deasupra terenului |
| 2 | Inscripție | tip rețea + tensiune + sens | gravată/turnată, „CABLU MT 20 kV" |
| 3 | Fundație bornă | ancorare minimă pentru a rezista la lucrările agricole/de întreținere din jur | beton, 0,20×0,20×0,30 m |
| 4 | Coordonate GPS relevate | fiecare bornă se relevă topografic și se include în planul as-built | conform sistem de proiecție al proiectului (Stereo 70) |

**Cerințe de execuție și toleranțe.** Bornele de marcare se amplasează la fiecare schimbare de direcție a traseului MT, la subtraversări (D06) și la cămine (D07), precum și la interval regulat pe traseele lungi rectilinii (recomandat ≤ 50 m), pentru a permite localizarea rapidă a traseului înainte de orice lucrare ulterioară de săpătură în incintă sau în vecinătate. Poziția fiecărei borne se relevă topografic cu precizie ≤ 0,10 m și se transpune în planul as-built (obligatoriu, condiție de recepție a traseului MT).

---

## PTh-I.3. Specificații tehnice de montaj (fișe pe activitate)

### PTh-I.3.1. Montajul modulelor fotovoltaice

Modulele se montează pe structura deja recepționată (verificare geometrică prealabilă: aliniament rânduri, ecartament pane, verticalitate stâlpi). Fixarea se face cu cleme de capăt și cleme intermediare specifice grosimii cadrului modulului (conform fișa clemelor, compatibilă cu cadrul de 30–35 mm uzual la modulele 555 Wp), cu cuplul de strângere prescris de producătorul de cleme (indicativ 8–12 Nm, verificat cu cheie dinamometrică pe un eșantion de minimum 10 % din puncte de prindere). Ordinea de montaj: de la un capăt al rândului spre celălalt, fără sărituri, pentru menținerea coplanarității șirului. Toleranța de coplanaritate a suprafeței active a unui rând de module: ≤ 5 mm/m. Nu se calcă pe suprafața modulelor în timpul montajului (risc de microfisuri ale celulelor, nedetectabile vizual, dar vizibile ulterior la termografie/electroluminescență).

### PTh-I.3.2. Montajul cablurilor solare (DC) și al conectorilor

Cablarea urmează strict traseul din D02: fixare pe structură cu cleme UV-stabile, la interax conform detaliu, cu rezerve de dilatare la fiecare conector. Conectorii se sertizează conform D03. Fiecare string finalizat se verifică imediat, înainte de conectarea la combiner, prin măsurarea tensiunii de mers în gol (V_oc) cu un multimetru DC de categorie adecvată — o citire anormală (mult sub valoarea calculată pentru numărul de module și temperatura momentului) indică o eroare de montaj (modul lipsă, polaritate inversată, conexiune întreruptă) și se remediază **înainte** de a continua cu stringurile următoare, nu la finalul întregului câmp.

### PTh-I.3.3. Montajul combinerelor și tablourilor

Combinerele se montează conform D01. Toate tablourile (combiner DC, TGJT, tablou servicii proprii) se livrează pre-echipate din fabrică (aparataj montat și cablat intern de producător, testat electric) — pe șantier se execută exclusiv racordurile de intrare/ieșire și legăturile de echipotențializare, reducând riscul de eroare de cablare internă. Fiecare tablou se recepționează la livrare cu verificarea integrității (transport), a etanșeității ușii/capacului și a concordanței cu schema comandată.

### PTh-I.3.4. Montajul invertoarelor

Invertoarele (200 kW, referință) se montează pe suport dedicat (piedestal metalic sau in interiorul stației compacte invertor-transformator), la o cotă care exclude inundarea locală și cu spațiu de disipare termică conform fișei producătorului (distanțe minime față de pereți/alte echipamente pentru circulația aerului de răcire). Racordurile DC și AC se execută cu cuplu conform fișă; separatorul DC integrat se testează funcțional (deschidere/închidere sub sarcină zero) înainte de prima punere sub tensiune. Configurarea parametrilor RfG (§PTh-I.8.2) se face de personal atestat, cu acces protejat prin parolă, iar setările finale se listează și se atașează la cartea tehnică.

### PTh-I.3.5. Montajul cablurilor de joasă tensiune (AC) și medie tensiune (MT)

Cablurile JT se pozează conform D04, cu tragere manuală sau cu troliu la efort controlat, fără depășirea razei minime de curbură. Cablurile MT se pozează conform D05, exclusiv de echipă cu personal atestat pentru cabluri de medie tensiune; joncțiunile și terminalele MT (la intrarea în celule și la eventualele înnădiri) se execută cu kit-uri certificate compatibile cu tipul de cablu, respectând timpii și temperaturile din procedura producătorului (termocontractare sau rășină la rece, funcție de tehnologie). Fiecare joncțiune/terminal MT se înregistrează individual (lot kit, dată, executant) în dosarul de calitate — element de trasabilitate obligatorie la MT.

### PTh-I.3.6. Montajul postului de transformare

Anvelopa PT (prefabricată) se transportă și se așează pe fundația recepționată (D11) cu utilaj de ridicare adecvat greutății (transformator 1.600 kVA în ulei: cca. 3,5–4,5 t; anvelopă de beton: câteva tone suplimentare) — se respectă strict planul de manevră al furnizorului (puncte de prindere, unghiuri de ridicare admise). Nivelarea anvelopei pe fundație: toleranță ≤ 2 mm/m. Racordurile MT și JT se execută prin treceri etanșe prevăzute în anvelopă; etanșarea finală (mansoane, chit) se verifică vizual și, dacă e cazul, prin testul de etanșeitate al producătorului anvelopei.

### PTh-I.3.7. Montajul prizei de pământ și al paratrăsnetului

Execuția urmează D08 (priză) și D10 (paratrăsnet). Bararea/înfigerea electrozilor se face mecanic (ciocan hidraulic/vibrator), fără forțare care ar putea îndoi electrodul — un electrod îndoit sub 3 m efectiv bătuți reduce artificial adâncimea utilă și crește R_e. Toate îmbinările electrod-conductor și conductor-conductor din priza generală (nu doar la PT) se execută prin cleme mecanice de calitate sau sudură exotermică, cu protecție anticorozivă ulterioară. Continuitatea întregii rețele de împământare (contur + toate legăturile la structuri) se verifică prin măsurare punct-cu-punct înainte de acoperirea conductorului de contur — fază determinantă (D04/D08).

### PTh-I.3.8. Montajul SCADA, PPC și al sistemelor de securitate

Cablarea de comunicație (Modbus RS485/fibră optică) se pozează separat de circuitele de forță (distanță minimă recomandată 0,30 m paralel, sau ecranare/separare fizică în jgheab dedicat), pentru a evita interferența electromagnetică indusă de comutația invertoarelor. Configurarea SCADA/PPC (adrese, praguri de alarmare, buclă de reglaj P/Q) se execută de personal atestat, cu test de comunicație pe fiecare echipament (invertor, combiner cu monitorizare, releu MT, contor) înainte de PIF general.

---

## PTh-I.4. Breviar complet de calcul (execuție) — toate tronsoanele reale

Breviarul de mai jos dimensionează **integral** exemplul de referință P_DC = 2.000 kWp (134 stringuri, 3.618 module, 8 invertoare, 16 combinere, 1 PT, racord LES 20 kV), extinzând tabelele-formulă din DTAC (§4, §6, §14) la fiecare tronson real, nu doar la valorile generice de referință.

### PTh-I.4.1. Repartiția câmpului DC pe invertoare și combinere

| Invertor | Nr. stringuri | P_DC alocat (kWp) | Combiner CB | Stringuri/combiner | I_dim combiner (A) | Secțiune magistrală DC |
|---|---|---|---|---|---|---|
| INV-01 | 17 | 254,7 | CB-01 / CB-02 | 9 / 8 | 158,1 / 140,5 | 1×70 mm² / 1×50 mm² |
| INV-02 | 17 | 254,7 | CB-03 / CB-04 | 9 / 8 | 158,1 / 140,5 | 1×70 mm² / 1×50 mm² |
| INV-03 | 17 | 254,7 | CB-05 / CB-06 | 9 / 8 | 158,1 / 140,5 | 1×70 mm² / 1×50 mm² |
| INV-04 | 17 | 254,7 | CB-07 / CB-08 | 9 / 8 | 158,1 / 140,5 | 1×70 mm² / 1×50 mm² |
| INV-05 | 17 | 254,7 | CB-09 / CB-10 | 9 / 8 | 158,1 / 140,5 | 1×70 mm² / 1×50 mm² |
| INV-06 | 17 | 254,7 | CB-11 / CB-12 | 9 / 8 | 158,1 / 140,5 | 1×70 mm² / 1×50 mm² |
| INV-07 | 16 | 239,8 | CB-13 / CB-14 | 8 / 8 | 140,5 / 140,5 | 1×50 mm² / 1×50 mm² |
| INV-08 | 16 | 239,8 | CB-15 / CB-16 | 8 / 8 | 140,5 / 140,5 | 1×50 mm² / 1×50 mm² |
| **TOTAL** | **134** | **2.007,99** | **16 combinere** | — | — | — |

**Formulele aplicate:** I_dim(combiner) = 1,25 × k × I_sc = 1,25 × k × 14,05 A, cu k = numărul de stringuri conectate în combinerul respectiv (identic formulei generale din DTAC §6.2, aplicată aici la fiecare k real din tabel, nu doar la exemplul k = 4). Secțiunea se alege astfel încât I_z (curent admisibil la modul de pozare adoptat — cablu în jgheab ventilat/aer liber, temperatură de calcul 60 °C) să depășească I_dim cu marjă: la k = 9 (I_dim = 158,1 A) se adoptă 1×70 mm² Cu (I_z indicativ ≈ 185 A la 60 °C, conform tabelelor de ampacitate NTE 007/08/00 pentru modul de pozare specific proiectului); la k = 8 (I_dim = 140,5 A) se adoptă 1×50 mm² Cu (I_z indicativ ≈ 150–160 A). **Valorile exacte de I_z se confirmă din tabelele de ampacitate ale producătorului de cablu, corectate cu factorii de temperatură/grupare specifici traseului real (NTE 007/08/00, PE 107)** — cifrele de mai sus sunt dimensionante la nivel de proiect tehnic, urmând confirmare finală în caietul de cabluri.

### PTh-I.4.2. Cădere de tensiune pe magistralele DC (verificare, toate combinerele)

Cădere de tensiune admisă pe orice tronson DC (combiner → invertor): **< 1 %** din tensiunea de lucru a câmpului (≈ 1.134 V la STC, § DTAC 3.4). Pentru lungimea medie estimată combiner–invertor (≈ 60 m dus-întors în arhitectura de referință, invertoare centrale în capătul câmpului):

> ΔU (CB de 9 stringuri, 1×70 mm², I = k×I_mpp = 9×13,22 = 119,0 A): ΔU = (ρ×L×I)/S = (0,0216×60×119,0)/70 = **2,20 V → 0,19 %** ✔
> ΔU (CB de 8 stringuri, 1×50 mm², I = 8×13,22 = 105,8 A): ΔU = (0,0216×60×105,8)/50 = **2,74 V → 0,24 %** ✔

Ambele valori se situează cu marjă confortabilă sub pragul de 1 %, confirmând secțiunile adoptate. Pe traseele individuale care depășesc 100 m dus-întors (combinere din capătul îndepărtat al câmpului), se recalculează punctual și, dacă este depășit pragul, se majorează secțiunea la treapta următoare (95 mm²).

### PTh-I.4.3. Cabluri AC de joasă tensiune (invertor → PT) și cablul MT de racord

| Tronson | Tip cablu | Secțiune | I calcul (A) | Lungime estimată (m) | ΔU (%) |
|---|---|---|---|---|---|
| INV-01…08 → cutie colectare AC (800 V) | N2XY 0,6/1 kV | 3×95 mm² Cu | 144,3 | 40–120 (funcție de poziția invertorului) | 0,3–0,8 |
| Cutie colectare AC → PT (bară JT 0,4/0,8 kV) | N2XY 0,6/1 kV | 3×185+95 mm² Cu | ≈ 1.155 (însumat 8 inv.) | 20 | 0,4 |
| PT → celulă de sosire OD (LES 20 kV) | A2XS(F)2Y 12/20 kV | 3×(1×95 mm²) Al | 46,2 | 500 (ipoteză distanță până la PMD, se confirmă prin ATR) | 0,3 |

**Verificarea secțiunii MT la scurtcircuit** (reluarea formulei DTAC §6.4 cu datele reale ale amplasamentului, ipoteză de calcul până la confirmarea prin studiul de soluție OD): S_min = I_scc × √t_d / k. Cu I_scc = 8 kA (ipoteză conservatoare pentru o rețea de distribuție 20 kV, **de confirmat prin studiul de scurtcircuit al OD** — DTAC §9.1 pct. 2), t_d = 0,5 s, k = 94 (Al/XLPE): S_min = 8.000×√0,5/94 = **60,2 mm² < 95 mm² adoptat** ✔. Secțiunea de 95 mm² acoperă atât criteriul de curent nominal (46,2 A, mult sub I_z al cablului), cât și criteriul de scurtcircuit, criteriul dominant fiind cel de scurtcircuit conform explicației din DTAC.

### PTh-I.4.4. Servicii proprii — circuite și protecții (tablou TS-SP)

| Circuit | Destinație | P (W) | I (A) | Protecție | Secțiune | Observație |
|---|---|---|---|---|---|---|
| CSP-1 | Ventilație/climatizare cameră invertoare | 3.500 | 15,2 | C16 3P/30mA | 5×2,5 | funcție de nr. camere echipate |
| CSP-2 | Iluminat interior PT + camere tehnice | 800 | 3,5 | C10/30mA | 3×1,5 | 200–300 lx (NP 061) |
| CSP-3 | Iluminat perimetral (stâlpi CCTV, D15) | 2.400 | 10,4 | C16/30mA | 3×2,5 | comandă crepusculară |
| CSP-4 | SCADA / PPC / servere / comunicații | 1.500 | 6,5 | C10/UPS | 3×1,5 | alimentare garantată (UPS) |
| CSP-5 | CCTV + antiefracție + control acces | 900 | 3,9 | C6/UPS | 3×1,5 | alimentare garantată (UPS) |
| CSP-6 | Prize mentenanță (câmp + PT) | 3.000 | 13,0 | C16/30mA | 3×2,5 | distribuite pe traseu |
| CSP-7 | Încălzire anticondens celule MT | 1.200 | 5,2 | C10 | 3×1,5 | termostat |
| CSP-8 | Priză servicii bucătărie de șantier / birou pază (dacă există) | 2.000 | 8,7 | C16/30mA | 3×2,5 | opțional funcție de proiect |
| — | **TOTAL instalat servicii proprii** | **≈ 15.300** | — | — | — | în plaja 10–25 kW din DTAC §13.1 |

Toate circuitele de prize și de iluminat exterior sunt protejate diferențial 30 mA (I7/2011, protecție la atingere indirectă). Circuitele critice (SCADA/PPC, CCTV/antiefracție) sunt alimentate prin UPS cu autonomie minimă 1–2 ore, conform DTAC §13.1, pentru a menține protecțiile MT, comunicația cu OD și securitatea perimetrală și în absența tensiunii de rețea.

### PTh-I.4.5. Analiza de risc la trăsnet (metodologie SR EN 62305-2) — calcul ilustrativ

Analiza cantitativă de risc compară riscul de pierdere R (funcție de probabilitatea și frecvența loviturilor, de eficiența măsurilor de protecție și de consecințe) cu riscul tolerabil R_T (10⁻⁵/an pentru pierderi de vieți omenești — cazul relevant pentru un PT cu prezență ocazională de personal). Etapele de calcul, conform IEC 62305-2:

1. **Frecvența anuală de lovituri directe pe structura protejată (N_d):** N_d = N_g × A_d × C_d × 10⁻⁶, unde N_g = densitatea de lovituri la sol (fulgere/km²/an, din harta izokeraunică regională), A_d = aria de captare echivalentă a structurii (m²), C_d = factor de amplasare.
2. **Pentru exemplul de referință** (PT + câmp asociat, teren util ≈ 200×110 m): se adoptă, **ca ipoteză de calcul ilustrativă, de confirmat prin harta izokeraunică oficială a amplasamentului real**, N_g ≈ 2,0 fulgere/km²/an (valoare medie orientativă pentru zone de câmpie din România — **necesită confirmare din datele ANM/hărțile regionale specifice locației definitive**, aceasta fiind o mărime cu variație teritorială semnificativă). Aria de captare a câmpului deschis (structuri joase, dar suprafață mare): A_d ≈ (L+3H)×(l+3H) cu H ≈ 3 m (înălțime medie mese+combinere), rezultând, pentru un dreptunghi de 200×110 m, A_d ≈ 206×116 ≈ 23.900 m² = 0,0239 km².
3. **N_d ≈ 2,0 × 0,0239 × 1,0 × 10⁻⁶·10⁶ = 0,048 lovituri/an** pe suprafața totală a câmpului (ordinul de mărime: o lovitură directă la fiecare ~20 ani pe întreaga suprafață a parcului) — valoare tipică pentru instalații întinse, joase, în câmp deschis.
4. **Compararea cu R_T:** riscul rezidual R1 (pierdere de vieți omenești) se calculează prin componentele de risc (R_A pentru șoc electric prin tensiuni de pas/atingere, R_B pentru incendiu structural) ponderate cu probabilități de reducere ale măsurilor adoptate (LPS extern la PT, SPD coordonate DC/AC/MT, echipotențializare generală, D08–D12). **Concluzia finală privind nivelul de protecție necesar (LPL I–IV) rezultă din raportul complet de analiză de risc, întocmit cu software certificat la faza P.Th. definitivă**, folosind valoarea N_g confirmată local — prezentul calcul este o **ilustrare a metodologiei și a ordinului de mărime**, nu o concluzie de proiectare finală substitutivă analizei complete.

**Concluzie de proiectare adoptată (conservatoare, până la analiza definitivă):** se adoptă **LPL III** ca nivel de referință pentru dimensionarea captării, coborârilor și SPD-urilor (rază a sferei rotative 45 m, ochiuri de plasă 15×15 m unde aplicabil, curent de trăsnet de calcul 100 kA/10-350μs pentru componenta directă), valoare uzuală pentru instalații industriale de importanță normală fără risc special de explozie — **de confirmat/ajustat prin raportul de analiză de risc definitiv** înainte de execuția finală a LPS.

### PTh-I.4.6. Verificarea la scurtcircuit a aparatajului de joasă tensiune (secundarul transformatorului)

Dimensionarea puterii de rupere a disjunctoarelor de JT (invertor și general PT) impune cunoașterea curentului de scurtcircuit maxim la barele de 0,4/0,8 kV, determinat de impedanța transformatorului (limitativă la această treaptă, rețeaua MT amonte fiind mult mai „tare" relativ la puterea PT-ului).

> **Curentul de scurtcircuit trifazat la barele JT ale trafo (formula generală):** I_scc,JT = S_T / (√3 × U_JT × u_k), unde u_k este tensiunea de scurtcircuit relativă a transformatorului (exprimată ca fracție, 0,06 pentru u_k = 6 %).
> Pentru trafo de referință S_T = 1.600 kVA, U_JT = 0,4 kV, u_k = 6 %:
> I_scc,JT = 1.600.000 / (1,732 × 400 × 0,06) = 1.600.000 / 41,57 = **≈ 38,5 kA**

Această valoare reprezintă curentul de scurtcircuit trifazat simetric prezumtiv la bornele JT ale transformatorului (ipoteză de rețea MT amonte „infinit de tare" — conservatoare, majorează ușor rezultatul, acoperitor pentru dimensionare). Puterea de rupere a disjunctorului general al TGJT/PT trebuie să depășească această valoare cu marjă:

| Aparat | Curent nominal | Putere de rupere necesară (I_cu) | Aparat adoptat (ilustrativ) |
|---|---|---|---|
| Disjunctor general TGJT/PT | ≈ 1.600 A (S_T/U_JT/√3, la 0,4 kV) | ≥ 40 kA (marjă peste I_scc,JT calculat) | disjunctor aer 1.600 A, I_cu 50 kA |
| Disjunctor invertor (0,8 kV, 144 A) | ≈ 250 A | ≥ I_scc redus la 0,8 kV (≈ jumătate față de 0,4 kV, la aceeași putere de trafo, prin transformare) | disjunctor 250 A, I_cu 25 kA (verificare specifică arhitecturii cu trafo propriu per bloc invertor, dacă e cazul) |

**Verificarea solicitării termice a cablului AC de JT la scurtcircuit** (analog criteriului deja aplicat la MT, DTAC §6.4): S_min = I_scc × √t_d/k. Pentru cablul de colectare AC 3×185+95 mm² Cu (§PTh-I.4.3), la I_scc,JT ≈ 38,5 kA și un timp de eliminare a defectului t_d ≈ 0,1 s (disjunctor general, acțiune rapidă instantanee), cu k ≈ 143 (Cu/PVC-XLPE conform tabelele normativului):

> S_min = 38.500 × √0,1 / 143 = 38.500 × 0,316 / 143 = **≈ 85 mm² < 185 mm² adoptat** ✔ — secțiunea de colectare AC, deja dimensionată la curentul nominal însumat (§PTh-I.4.3), acoperă cu marjă și criteriul de scurtcircuit, datorită timpului scurt de acționare al disjunctorului general (protecție instantanee amonte de cablu).

**Observație privind coordonarea:** verificarea de mai sus confirmă principiul de proiectare consacrat — pe partea de JT curentul de scurtcircuit este ridicat, dar timpul de acționare al protecțiilor este foarte scurt (instantaneu, zeci de milisecunde), motiv pentru care secțiunile rezultate din criteriul de curent nominal (curent de sarcină + cădere de tensiune) rămân, de regulă, acoperitoare și pentru criteriul termic de scurtcircuit — spre deosebire de partea de MT (DTAC §6.4), unde temporizarea de coordonare cu OD (0,3–0,5 s) face din criteriul de scurtcircuit factorul dominant.

### PTh-I.4.7. Coordonarea izolației — niveluri de tensiune de ținere (sinteză)

Coordonarea izolației asigură că fiecare echipament din lanțul DC→MT suportă, cu marjă de siguranță, cea mai severă supratensiune la care poate fi expus (comutație sau trăsnet), fără a se recurge la o supradimensionare uniformă și costisitoare a întregului lanț:

| Nivel | Tensiune nominală | Tensiune de ținere la impuls (BIL) / nivel de protecție SPD | Componentă coordonată |
|---|---|---|---|
| DC (câmp) | 1.500 V | echipament cf. IEC 62109 (izolație clasa II); SPD DC U_p ≈ 1.800 V rezidual | module, combiner, intrare invertor |
| AC JT | 0,4/0,8 kV | BIL echipamente JT uzual 6–8 kV; SPD AC JT tip 1+2, U_p ≤ 2,5 kV | invertor (ieșire), TGJT |
| MT | 20 kV | BIL 125 kV (Um 24 kV); SPD MT (descărcător ZnO) U_p ≤ 90–95 kV | celule MT, borne trafo, cablu MT |

**Principiul coordonării:** nivelul de protecție al fiecărui SPD (tensiunea reziduală U_p pe care o lasă să treacă spre echipament) trebuie să rămână, cu marjă de securitate (uzual factor ≥ 1,2), sub tensiunea de ținere la impuls (BIL) a echipamentului protejat cel mai apropiat. Tabelul de mai sus confirmă coerența alegerilor din DTAC (§7.3, §8.2, §11.2): SPD-urile DC (U_p ≈ 1,8 kV) protejează un câmp cu izolație de 1.500 V clasă II, SPD-urile MT (U_p ≈ 90–95 kV) protejează un echipament cu BIL de 125 kV, marja fiind în ambele cazuri conform practicii consacrate (~ 1,3–1,4× U_p sub BIL).

### PTh-I.4.8. Selectivitatea protecțiilor — verificare pe cascada JT → MT

Verificarea selectivității urmărește ca, la un defect, doar protecția cea mai apropiată de acesta să acționeze:

| Nivel | Protecție | Curent de reglaj | Temporizare | Pas de selectivitate față de nivelul următor |
|---|---|---|---|---|
| Siguranță string (gPV) | 25 A / 1.500 V DC | 1,5–2,4×I_sc | instantaneu (fuzibil) | — (cel mai aval) |
| Disjunctor AC invertor | ≈ 200–250 A / 0,8 kV | curbă C/D | 0,02–0,1 s | acționează sub protecția din amonte |
| Disjunctor general TGJT/PT | ≈ 1.600 A (funcție de S_T) | curbă termomagnetică | 0,1–0,3 s | + 0,1–0,2 s față de nivelul invertor |
| Releu MT — funcția 50 (instantaneu) | I>> ≈ 8×I_n | 0,05 s | acoperă defecte france apropiate | — |
| Releu MT — funcția 51 (IDMT) | I> ≈ 1,2×I_n | ≈ 0,5 s | + 0,25–0,3 s față de protecția OD din amonte (coordonare la ATR) | — |
| Protecție de interfață (27/59/81U/81O) | conform ATR | conform ATR | decuplare la ieșirea din benzi | funcție distinctă (stare rețea, nu defect propriu) |

Reglajele finale ale funcțiilor MT (50/51/51N/67N) și ale protecției de interfață se stabilesc **obligatoriu de comun acord cu operatorul de distribuție**, în cadrul proiectului de racordare avizat (DTAC §9.1 pct. 5) — valorile din tabel sunt indicative, pentru dimensionarea aparatajului, nu reglaje finale de exploatare.

### PTh-I.4.9. Tabel de cantități de lucrări (material take-off) — exemplul de referință P_DC = 2.000 kWp

Cantitățile de mai jos rezultă direct din arhitectura electrică dimensionată în §PTh-I.4.1–I.4.4 și servesc drept bază pentru caietul de cantități/devizul de execuție. Lungimile de cablu sunt estimări de proiect pe un layout de câmp de referință (200×110 m util, dispunere PT central); lungimile finale se confirmă pe planul de implantare definitiv.

| Poz. | Material/echipament | U.M. | Cantitate | Bază de calcul |
|---|---|---|---|---|
| 1 | Modul fotovoltaic 555 Wp | buc. | 3.618 | 134 stringuri × 27 module |
| 2 | Cablu solar H1Z2Z2-K 1×6 mm² | m | ≈ 16.080 | 134 stringuri × ~120 m mediu/string (D02, dus-întors pe rând) |
| 3 | Conector MC4 (pereche) | buc. | ≈ 3.752 | 27 conexiuni/string × 134 stringuri + rezerve capete combiner |
| 4 | Cutie combiner DC (8/9 intrări) | buc. | 16 | conform §PTh-I.4.1 |
| 5 | Siguranță gPV 25 A/1.500 V | buc. | ≈ 268 | 2 polarități × 134 stringuri (unde aplicabil, > 3 stringuri/MPPT) |
| 6 | SPD DC tip 2 (în combiner) | buc. | 16 | 1/combiner |
| 7 | SPD DC tip 1+2 (la invertor) | buc. | 8 | 1/invertor |
| 8 | Cablu magistrală DC 1×70 mm² | m | ≈ 720 | 12 combinere (k=9) × 60 m |
| 9 | Cablu magistrală DC 1×50 mm² | m | ≈ 240 | 4 combinere (k=8, INV-07/08) × 60 m |
| 10 | Invertor de string 200 kW | buc. | 8 | conform DTAC §4.3 |
| 11 | Cablu AC 0,8 kV, 3×95 mm² | m | ≈ 640 | 8 invertoare × ~80 m mediu la cutia de colectare |
| 12 | Cablu AC colectare, 3×185+95 mm² | m | 20 | cutie colectare → PT |
| 13 | Transformator 1.600 kVA, 0,4/20 kV, Dyn11 | buc. | 1 | conform DTAC §8.1 |
| 14 | Celule MT 24 kV (set: sosire+măsură+protecție) | set | 1 | conform §PTh-I.5.5 |
| 15 | Cablu MT A2XS(F)2Y 12/20 kV, 95 mm² | m | ≈ 500 | ipoteză distanță PT–PMD (confirmă ATR) |
| 16 | Cămin de tragere MT | buc. | ≈ 6 | interval ~80–100 m pe traseul de 500 m |
| 17 | Tub de protecție subtraversare (dacă e cazul) | m | ≈ 20–40 | funcție de nr. traversări drum pe traseu |
| 18 | Electrod vertical priză de pământ (2–3 m) | buc. | ≈ 52 | perimetru ≈ 620 m / interax ~12 m (D08) |
| 19 | Conductor de contur priză de pământ, OL-Zn 40×4 mm | m | ≈ 620 (contur) + legături la rânduri | D08 |
| 20 | Tijă de captare paratrăsnet (PT) | buc. | 1–2 | D10, funcție de geometria PT |
| 21 | Stâlp CCTV/iluminat perimetral | buc. | ≈ 6–8 | funcție de perimetru și de acoperirea camerelor |
| 22 | Borne de marcare traseu MT | buc. | ≈ 10–12 | D18, interval ≤ 50 m + puncte singulare |
| 23 | Stație meteo (piranometru+senzori) | set | 1 | §PTh-I.5.7 |
| 24 | SCADA/PPC — dulap central | set | 1 | §PTh-I.5.6 |

**Observație asupra utilizării acestui tabel.** Cantitățile sunt derivate parametric din arhitectura de 2.000 kWp și **scalează proporțional cu numărul de stringuri/invertoare/combinere** la orice altă putere aleasă, conform tabelul de dimensionare din DTAC §4.2. Lungimile de cablu (poz. 2, 8-9, 11-12, 15) rămân dependente de layout-ul geometric real al amplasamentului (formă parcelă, poziția PT-ului față de câmp) și se recalculează pe planul de implantare topografic definitiv — valorile din tabel sunt estimări de proiect tehnic, suficiente pentru antemăsurătoare și comandă preliminară de material, dar caietul de cantități final se emite după finalizarea planului de execuție cotat.

---

## PTh-I.5. Fișe tehnice complete — echipamente majore

### PTh-I.5.1. Fișă tehnică — Modul fotovoltaic (referință proiect)

| Parametru | Valoare |
|---|---|
| Tehnologie | monocristalin PERC/TOPCon, half-cut, bifacial |
| Putere nominală STC | 555 Wp |
| Toleranță putere | 0…+5 W (pozitivă) |
| V_oc / I_sc (STC) | 50,2 V / 14,05 A |
| V_mpp / I_mpp (STC) | 42,0 V / 13,22 A |
| Randament modul | ≈ 21,3–21,5 % |
| Dimensiuni | ≈ 2.384×1.096×35 mm |
| Greutate | ≈ 27,5–28,5 kg |
| Sarcină mecanică (zăpadă/vânt) | ≥ 5.400 Pa / ≥ 2.400 Pa (IEC 61215) |
| Garanție produs | 12–15 ani |
| Garanție performanță liniară | ≥ 84,8 % la 25 ani (degradare 0,45–0,55 %/an) |
| Certificare | IEC 61215-1/-2, IEC 61730-1/-2 |

### PTh-I.5.2. Fișă tehnică — Invertor de string 200 kW (referință proiect)

Reluare și completare a tabelului DTAC §5.2, cu date suplimentare relevante pentru montaj și PIF:

| Parametru | Valoare |
|---|---|
| Putere activă nominală / aparentă max. | 200 kW / 220 kVA (cosφ 0,9) |
| Tensiune DC max. / fereastră MPPT | 1.500 V / 500…1.500 V |
| Nr. intrări MPPT | 6–12 |
| Curent DC max./intrare | conform fișă (verificat ≥ curent combiner adoptat) |
| Tensiune AC ieșire | 800 V (3~) — arhitectura de referință |
| Randament maxim / european | 99,0 % / 98,6 % |
| Grad de protecție | IP65 (montaj exterior) |
| Domeniu temperatură funcționare | −25…+60 °C (cu derating peste +45…50 °C) |
| Greutate | ≈ 60–90 kg (funcție de model) |
| Interfață comunicație | RS485/Modbus RTU sau Ethernet/Modbus TCP |
| Certificare | IEC 62109-1/-2, RfG (Tip C) |
| Funcții rețea implementate | LVRT/HVRT, Q(U), cosφ(P), P(f)/LFSM, ramp-rate |

### PTh-I.5.3. Fișă tehnică — Combiner DC (referință: variantă de 9 intrări)

| Parametru | Valoare |
|---|---|
| Nr. intrări string | 9 (variantă CB de 8 intrări analog, fără poziția a 9-a) |
| Curent max. per intrare | ≥ 20 A (marjă peste I_dim string 17,56 A) |
| Ieșire | 1× (magistrală spre invertor, secțiune conform §PTh-I.4.1) |
| Protecție | siguranțe gPV bipolare pe fiecare intrare (dacă k > 2/MPPT), SPD tip 2 |
| Grad de protecție | IP65 |
| Tensiune de izolație | 1.500 V DC |
| Monitorizare | curent per string (opțional, recomandat la parcuri > 1 MWp pentru detectarea rapidă a defectelor) |

### PTh-I.5.4. Fișă tehnică — Transformator 1.600 kVA, 0,4/20 kV, Dyn11

Reluare completă a datelor DTAC §8.1, referință pentru montaj și probe:

| Parametru | Valoare |
|---|---|
| Putere nominală | 1.600 kVA |
| Raport de transformare | 0,4/20 kV |
| Grupa de conexiuni | Dyn11 |
| Tensiune de scurtcircuit u_k | 6 % |
| Pierderi în gol P₀ | ≈ 1.700 W |
| Pierderi în sarcină P_k (75 °C) | ≈ 15.000 W |
| Reglaj priză MT | ±2×2,5 % |
| Nivel izolare MT (Um/BIL) | 24 kV / 125 kV |
| Tip constructiv | ulei ermetic sau uscat rășină (decizie de proiect, §DTAC 8.1) |
| Greutate aproximativă | 3,5–4,5 t (ulei) |

### PTh-I.5.5. Fișă tehnică — Celule MT 24 kV (set complet PT)

| Celulă | Funcție | Aparataj principal | Curent nominal |
|---|---|---|---|
| Celulă sosire/racord | interfață OD, izolare vizibilă | separator de sarcină + CLP | 630 A |
| Celulă măsură | contorizare decontare | TT+TC clasă 0,2S/0,5S | — |
| Celulă protecție trafo | protecție transformator | întreruptor vid + relee 50/51/51N | 630 A, 16 kA·1s |

### PTh-I.5.6. Fișă tehnică — SCADA / Power Plant Controller (PPC)

| Parametru | Valoare |
|---|---|
| Arhitectură | datalogger local redundant → server SCADA (local+cloud) → HMI |
| Puncte monitorizate | invertoare (P,Q,U,I,f,cosφ,T,erori,energie), combinere (curent string), trafo (T, Buchholz), relee MT, contor, stație meteo |
| Protocoale | Modbus TCP/RTU, IEC 61850 (relee MT) |
| Funcție PPC | măsoară P/Q/U/cosφ/f la punctul de racord, distribuie setpoint-uri către invertoare (buclă închisă) |
| Funcții implementate | Q(U), cosφ(P), FSM/LFSM, ramp-rate, telemăsură/telecomandă OD |
| Alimentare | din serviciile proprii, cu UPS (autonomie 1–2 h) |

### PTh-I.5.7. Fișă tehnică — Stație meteo

| Parametru | Valoare |
|---|---|
| Piranometru | măsoară iradiere POA (± opțional GHI) |
| Senzori temperatură modul | PT100, minimum 2 puncte pe câmp |
| Senzor temperatură ambiantă + anemometru | pentru corecție PR și pentru comanda de stow (dacă tracker) |
| Ieșire | integrată în SCADA, calcul PR în timp real: PR = E_măsurată/(P_DC×H_POA/G_STC) |

### PTh-I.5.8. Fișă tehnică — Cablu solar DC H1Z2Z2-K (montaj)

| Parametru | Valoare |
|---|---|
| Standard | SR EN 50618 / IEC 62930 |
| Construcție | conductor Cu cositorit, izolație + manta elastomer reticulat, fără halogen |
| Tensiune nominală Uo/U | 1.500/1.500 V DC |
| Domeniu de temperatură | −40…+90 °C regim continuu (vârf +120 °C) |
| Rezistență UV/ozon | da (montaj exterior permanent, neprotejat) |
| Durată de viață declarată | ≥ 25 ani exterior |
| Secțiuni utilizate în proiect | 1×6 mm² (string), 1×50/1×70 mm² (magistrală combiner) |
| Conector compatibil | MC4 sau echivalent, de la același producător (obligatoriu, D03) |

### PTh-I.5.9. Fișă tehnică — SPD-uri (sinteză pe niveluri de tensiune)

| Nivel | Tip | U_c (tensiune de lucru continuu) | I_n (8/20) | I_imp (10/350) | Amplasare |
|---|---|---|---|---|---|
| DC — combiner | tip 2 | ≥ 1.500 V DC | ≥ 20 kA | — | fiecare combiner (D12) |
| DC — invertor | tip 1+2 | ≥ 1.500 V DC | ≥ 20 kA | ≥ 12,5 kA | intrare DC invertor, dacă traseu > 10 m de combiner |
| AC JT | tip 1+2 | ≥ 1,1×U_n | ≥ 20 kA | ≥ 12,5 kA | ieșire invertor, TGJT |
| MT | descărcător ZnO | ≈ 24 kV | ≥ 10 kA | — | sosire LES, borne trafo |

---

## PTh-I.6. Probe și verificări detaliate

### PTh-I.6.1. Tabel complet probe/verificări per instalație

| Instalație | Probă | Parametru / valoare | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Câmp DC — string | polaritate + V_oc | comparație cu V_oc calculat corectat la T | instantaneu | abatere ≤ 3 % față de calcul |
| Câmp DC — string | I_sc / curent de funcționare | comparație între stringuri vecine | instantaneu | dispersie ≤ 5 % între stringuri similare |
| Câmp DC | rezistență de izolație | 1.000 V c.c. | conform IEC 62446-1 | ≥ 1 MΩ |
| Câmp DC | continuitate legături echipotențiale (cadru modul–structură) | — | — | R < 0,1 Ω |
| Câmp DC | termografie IR (sub sarcină, zi însorită) | — | — | fără hot-spot-uri > +20 °C față de vecinătate |
| Combiner | funcționare siguranțe gPV + SPD + separator | test funcțional | — | acționare/indicare corectă |
| Cablu AC JT | rezistență izolație | 500 V c.c. | — | ≥ 0,5 MΩ (I7) |
| Cablu MT | izolație (Megger) | conform clasă tensiune | — | fără scădere sub prag |
| Cablu MT | încercare de tensiune mărită | VLF 0,1 Hz sau f industrială, conform clasă | conform normativ | fără străpungere/descărcare |
| Transformator | raport de transformare, grupa de conexiuni | — | — | conform placă + toleranță ±0,5 % |
| Transformator | rezistență înfășurări | — | — | conform buletin fabrică ± 5 % |
| Transformator | rigiditate dielectrică ulei (dacă tip ulei) | — | — | conform SR EN 60156 |
| Celule MT | verificare protecții (injecție primară/secundară) | reglaje 50/51/51N/67N + temporizări | — | acționare la valorile reglate ± 5 % |
| Celule MT | interlock mecanic celulă-ușă | test funcțional | — | blocare corectă în ambele sensuri |
| Priză de pământ | rezistență de dispersie R_p | metoda căderii de potențial | — | ≤ 1 Ω (PT/MT), conform D08 |
| Priză de pământ | tensiuni de atingere/pas | conform timp de eliminare defect | — | ≤ 50 V (regim normal) / ≤ 125 V (scurtă durată) |
| LPS (paratrăsnet) | continuitate coborâri, rezistență de dispersie | — | — | conform SR EN 62305-3 |
| Contorizare | raport TC/TT, sensuri, sigilare | — | — | conform ATR, sigilat de OR |
| RfG | funcții de sistem (LVRT, Q(U), cosφ(P), LFSM-O/U, ramp-rate) | protocol supravegheat OD/TSO | — | conform curbele din ATR/certificare |
| Servicii proprii | test RCD/diferențiale | I∆n = 30 mA | — | declanșare < 300 ms |
| SCADA/PPC | comunicație pe fiecare echipament | test 100 % | — | date valide pe toate punctele |

### PTh-I.6.2. Verificări electrice PRAM — detaliu

- **Rezistența de izolație DC**, măsurată între cele două polarități și între fiecare polaritate și PE, la 1.000 V c.c. (tensiune de test superioară celei de la instalațiile de JT clasice, conform IEC 62446-1, dat fiind nivelul de tensiune de 1.500 V al sistemului); valoare minimă admisă **1 MΩ**.
- **Rezistența prizei de pământ**, măsurată prin metoda căderii de potențial (electrozi auxiliari la distanțe conform normativ, evitând zona de influență a electrodului testat); valoare țintă **≤ 1 Ω** la PT/celule MT.
- **Continuitatea conductorului de protecție/echipotențializare**, verificată pe fiecare circuit final și pe fiecare punct de legare structură–modul (eșantion reprezentativ minimum 10 % din puncte, plus toate punctele de la capetele de rând).
- **Testul dispozitivelor diferențiale** de pe circuitele de servicii proprii, cu aparat dedicat: timp de declanșare < 300 ms la I∆n, < 150 ms la 5×I∆n.
- **Verificarea SPD-urilor** (DC, AC, MT): integritate, indicator de stare, legare la bara de echipotențializare, contact de semnalizare funcțional către SCADA.

### PTh-I.6.3. Protocol de măsurare per string — formular tip

Pentru fiecare string se completează, la PIF: identificator (INV-xx/CB-yy/STR-zzz), nr. module, V_oc măsurat, V_oc calculat (corectat la temperatura din momentul măsurării conform formula DTAC §3.2), abatere procentuală, I_sc/I funcționare măsurat, observații (termografie, continuitate). Abaterea maximă admisă V_oc măsurat vs. calculat: **± 3 %** — peste acest prag se investighează (modul degradat, conexiune de rezistență mare, umbrire parțială neanticipată).

---

## PTh-I.7. Tehnologia de montaj — succesiune și tehnologie

### PTh-I.7.1. Succesiunea generală a lucrărilor

1. Trasarea axelor rândurilor de structuri și a traseelor de cablu/șanțuri (topografic, pe baza planului de implantare).
2. Execuția prizei de pământ generale (electrozi + conductor de contur), **înainte** de montarea structurilor — fază determinantă (nu se acoperă conductorul de contur fără proces-verbal).
3. Montarea structurilor metalice (piloți + profile) — obiectul specialității de rezistență, corelat (§PTh-I.10).
4. Montarea modulelor (§PTh-I.3.1).
5. Cablarea DC (§PTh-I.3.2) și montarea combinerelor (§PTh-I.3.3).
6. Execuția fundației/platformei PT (D11) și montarea anvelopei/echipamentelor (§PTh-I.3.6).
7. Montarea invertoarelor (§PTh-I.3.4) și cablarea AC (§PTh-I.3.5).
8. Execuția șanțurilor și pozarea cablurilor MT (D05–D07), probate înainte de acoperire — fază determinantă.
9. Montarea paratrăsnetului (D10) și finalizarea legăturilor echipotențiale (D09, D16).
10. Montarea sistemelor auxiliare (SCADA, CCTV, iluminat — D15).
11. Probe individuale pe instalație (§PTh-I.6), apoi probe integrate și PIF (§PTh-I.8).
12. Recepția la terminarea lucrărilor și predarea cărții tehnice (§PTh-I.12).

### PTh-I.7.2. Susțineri, adâncimi și tehnologii de pozare — sinteză

| Element | Tehnologie | Parametru |
|---|---|---|
| Cablu solar DC pe structură | cleme UV-stabile | interax ≤ 0,5 m orizontal / 0,3 m vertical |
| Cablu JT îngropat | șanț + pat de nisip | adâncime 0,80 m, bandă de semnalizare la 0,30 m deasupra |
| Cablu MT îngropat | șanț + pat de nisip + dală de protecție | adâncime 1,00–1,20 m, dală obligatorie |
| Subtraversare drum | tub de protecție + cămine de capăt | adâncime ≥ 1,00–1,20 m |
| Cablu în jgheab (traseu comun invertor–PT) | jgheab perforat, susținere pe console | interax console 1,0–1,5 m |

### PTh-I.7.3. Treceri etanșe la foc (interfață cu compartimentarea PT/camerelor tehnice)

La traversarea pereților/planșeelor PT cu rol de compartimentare la incendiu (conform scenariul de securitate la incendiu — vezi `scenariu-psi.md`, document dedicat, care **nu se dublează aici**), toate trecerile de cabluri se etanșează cu sisteme certificate de rezistență la foc egală cu a elementului străbătut: manșoane/mastic intumescent la cabluri, pernă/vopsea termospumantă la fascicule, conform tabelului de clase din scenariul PSI al obiectivului.

---

## PTh-I.8. Punerea în funcțiune (PIF) și reglaje

### PTh-I.8.1. Secvența generală de PIF

1. Verificări individuale complete pe fiecare instalație (§PTh-I.6), consemnate în buletine.
2. Punerea sub tensiune de probă a părții DC (energizare naturală prin lumină — verificare V_oc/I_sc per string, §PTh-I.6.3).
3. Punerea sub tensiune a părții JT (invertoare în regim „stand-by rețea", fără sincronizare încă).
4. Verificarea completă a instalației MT (izolație, protecții, interlock) — fără tensiune de rețea aplicată.
5. Solicitarea și obținerea acordului OD pentru punerea sub tensiune de probă a instalației de racordare.
6. Sincronizarea invertoarelor cu rețeaua (prima injecție de test, la putere redusă/limitată).
7. Testele RfG supravegheate (§PTh-I.8.2).
8. Creșterea treptată la putere nominală, cu monitorizare termică (termografie IR pe conexiuni sub sarcină) la fiecare treaptă.
9. PIF final, semnat de OD — Notificarea Operațională de Punere în Funcțiune (Operational Notification, conform RfG).
10. Recepția la terminarea lucrărilor.

### PTh-I.8.2. Protocol de parametrizare RfG (Tip C, ilustrativ)

| Funcție | Parametru de configurat | Valoare de referință (confirmă ATR) |
|---|---|---|
| LFSM-O | prag frecvență / statism | 50,2–50,5 Hz / 2–12 % |
| Q(U) | curba tensiune–reactiv | conform curba impusă de OD |
| cosφ(P) | curba putere–factor putere | conform curba impusă de OD |
| LVRT | curba U-t de menținere conectat | conform profilul RfG Tip C |
| Ramp-rate | limitare gradient putere | ex. 10 %/min (confirmă ATR) |
| Protecție interfață | praguri 27/59/81U/81O | conform ATR |

Toți parametrii se configurează în firmware-ul invertoarelor și în PPC, se testează prin protocol supravegheat de reprezentantul OD și se listează integral în dosarul de PIF (captură de ecran/export al configurației finale, semnat).

### PTh-I.8.3. Echilibrarea și verificarea producției — primele zile de funcționare

În primele zile de funcționare la putere plină se verifică: distribuția uniformă a curentului pe stringuri (dispersie ≤ 5 % între stringuri comparabile — abateri mai mari indică defect nedetectat la PIF), temperatura de funcționare a invertoarelor și a transformatorului (fără derating neașteptat), corelarea producției instantanee cu iradierea măsurată de stația meteo (PR calculat în timp real vs. PR de proiectare 0,82 — abateri mari indică erori de configurare MPPT sau defecte de câmp).

---

## PTh-I.9. Plan de Control al Calității (PCC) instalații

### PTh-I.9.1. Tabel PCC

| Nr. | Fază de lucrare | Document de verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție module, invertoare, cabluri, echipamente MT | certificate de conformitate, buletine fabrică | responsabil tehnic execuție (RTE) | CQ |
| 2 | Execuție priză de pământ — înainte de acoperirea conductorului de contur | proces-verbal + măsurătoare R_p preliminară | RTE + diriginte de șantier | **FD** |
| 3 | Montaj structuri (interfață cu specialitatea de rezistență) | proces-verbal verticalitate/aliniament | RTE + proiectant structură | CM |
| 4 | Cablare DC — verificare V_oc/I_sc per string, înainte de conectare la combiner | fișă de măsurare per string | RTE | CM |
| 5 | Șanț cablu JT/MT — înainte de acoperire | proces-verbal + relevare topografică as-built | RTE + diriginte de șantier | **FD** |
| 6 | Probă etanșeitate cuvă retenție ulei | PV probă cu apă, 24 h | RTE + diriginte | **FD** |
| 7 | Rezistență izolație DC/AC/MT | buletine PRAM | verificator/laborator atestat | CM |
| 8 | Rezistență priză de pământ + tensiuni atingere/pas | buletin PRAM | laborator autorizat | CM |
| 9 | Verificare protecții MT (injecție primar/secundar) | PV verificare + reglaje | firmă atestată | **FD** |
| 10 | Interlock celule MT | PV test funcțional | RTE + furnizor | CM |
| 11 | Sigilare grup de măsură | PV sigilare | operator de rețea (OD) | **FD** |
| 12 | Testare funcții RfG | PV protocol supravegheat | OD/TSO | **FD** |
| 13 | Termografie IR sub sarcină (combinere, conexiuni, celule) | raport termografic | firmă atestată | CM |
| 14 | Etichetare completă (100 %) | listă de verificare | RTE + beneficiar | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant/OD, după caz); CM = control în masă; CQ = control calitate recepție materiale.

### PTh-I.9.2. Faze determinante — detaliu

Fazele marcate FD condiționează continuarea lucrărilor și implică elemente care devin inaccesibile sau au rol critic de securitate/decontare:

- **Priza de pământ înainte de acoperire** — conductorul de contur devine inaccesibil odată îngropat; orice deficiență constatată ulterior necesită săpături costisitoare.
- **Șanțurile de cablu JT/MT înainte de acoperire** — relevarea topografică as-built este singura evidență a traseului real pentru mentenanța viitoare (localizarea unui defect sau a unei viitoare intervenții).
- **Proba cuvei de retenție ulei** — element de protecție a mediului, verificat obligatoriu înainte de umplerea cu ulei a transformatorului.
- **Verificarea protecțiilor MT** — securitatea întregii instalații de racordare depinde de reglajele corecte, verificate cu injecție de curent/tensiune primară sau secundară.
- **Sigilarea grupului de măsură** — act cu valoare contractuală/comercială, executat exclusiv de operatorul de rețea.
- **Testarea funcțiilor RfG** — condiționează Notificarea Operațională de Punere în Funcțiune și, ulterior, licența de exploatare comercială ANRE.

### PTh-I.9.3. Cartea tehnică a construcției — capitol instalații

(vezi §PTh-I.12, dezvoltare completă)

---

## PTh-I.10. Note de corelare cu alte specialități

Prezentul supliment de instalații se corelează obligatoriu cu celelalte specialități ale documentației, fără a le dubla conținutul (regula de aur nr. 8 a platformei — zero duplicare de conținut):

- **Cu specialitatea de rezistență (`structura.md` + suplimentul PTh de structură):** combinerele (D01) se ancorează pe stâlpul median al mesei — poziția și greutatea combinerului (≈ 5–10 kg) se comunică proiectantului de structură ca încărcare suplimentară punctuală, deja inclusă în ipotezele generale de calcul (marjă acoperită de coeficienții de siguranță ai structurii, `structura.md` cap. 3). Fundația și armarea radierului postului de transformare (D11 poz. 1, 6) sunt obiectul detaliat al `structura.md` cap. 6 — prezentul document tratează doar cuva de retenție, platforma și priza de fundare, fără a relua calculul structural.
- **Cu specialitatea de arhitectură (`arhitectura.md`):** amplasarea PT-ului, a stațiilor de invertoare și a stâlpilor de iluminat/CCTV (D15) respectă planul general de amplasare din piesele desenate de arhitectură; distanțele față de împrejmuire și lățimile drumurilor de incintă (D06) sunt cele stabilite în `arhitectura.md` §3.8/echivalent.
- **Cu securitatea la incendiu (`scenariu-psi.md`):** măsurile specifice de securitate la incendiu ale instalațiilor electrice (arc DC, compartimentarea PT, treceri etanșe — §PTh-I.7.3) sunt cele deja tratate integral în scenariul de securitate la incendiu dedicat — prezentul document face trimitere, **fără a relua** breviarul de calcul al scenariului PSI.
- **Cu proiectul de racordare avizat de OD:** reglajele finale ale protecțiilor MT, ale protecției de interfață și ale funcțiilor RfG (§PTh-I.4.6, §PTh-I.8.2), precum și secțiunea finală a cablului MT de racord și distanța reală până la PMD, se confirmă prin proiectul de racordare aprobat prin ATR — valorile din prezentul supliment sunt dimensionante, nu definitive până la avizare.
- **Cu studiul geotehnic:** rezistivitatea solului adoptată pentru dimensionarea prizei de pământ (D08, §PTh-I.4.5) și analiza de risc la trăsnet sunt ipoteze de calcul care se confirmă/ajustează prin măsurătorile geotehnice și izokeraunice specifice amplasamentului definitiv.

---

## PTh-I.11. Cadru normativ de detaliere — sinteză completă

Cadrul normativ aplicat cumulat de DTAC (§0.1, reluat integral) și de prezentul supliment P.Th. (§PTh-I.1.2):

| Categorie | Normative |
|---|---|
| Instalații electrice generale | I7/2011, NTE 007/08/00, PE 107 (NTE 006/06/00), NTE 401/2003 |
| Linii electrice | NTE 003/04/00 (PE 104), PE 101A, PE 132 |
| Verificări și PIF | PE 116/1994, PE 118/1992 |
| Legare la pământ și paratrăsnet | NP 004/2003, NTE 001/03/00, 1.RE-Ip 30/2004, SR EN/IEC 62305-1…4, STAS 12604-4/5-89 |
| Sisteme fotovoltaice | SR EN 62446-1, SR EN IEC 62548, SR EN IEC 61730-1/-2, SR EN IEC 61215-1/-2, SR EN IEC 62109-1/-2, SR EN 50618/IEC 62930 |
| Aparataj și echipamente | SR EN IEC 61439-1/-2, SR EN IEC 62271-200, SR EN 60076, SR EN 60529, SR EN 61537/50085 |
| Racordare la rețea | Reg. (UE) 2016/631, Ord. ANRE 208/2018, Ord. ANRE 59/2013+235/2019, Ord. ANRE 11/2023, Ord. ANRE 20/2004, Ord. ANRE 82/2022 |
| Securitate la incendiu | P118-1/1999, P118-3/2015 (detaliate în `scenariu-psi.md`) |
| Calitate în construcții | Legea 10/1995, HG 907/2016, C56-2002, Legea 50/1991 |

---

## PTh-I.12. Cartea tehnică a construcției — capitol instalații

La finalizarea execuției se predă beneficiarului capitolul de instalații electrice al cărții tehnice, cuprinzând:

| Document | Conținut |
|---|---|
| Planuri as-built | traseele reale ale tuturor cablurilor DC/AC/MT, poziția reală a fiecărui combiner/invertor, priza de pământ completă |
| Scheme finale | schema monofilară actualizată MT/JT, schema de conexiuni a fiecărui combiner și invertor |
| Fișe tehnice echipamente | toate echipamentele montate (module, invertoare, combinere, transformator, celule MT, SCADA/PPC) + certificate de conformitate |
| Buletine de probe | toate buletinele PRAM, de izolație, de rezistență priză de pământ, de termografie |
| Procese-verbale faze determinante | toate PV-urile FD semnate (§PTh-I.9.2) |
| Protocol de măsurare per string | fișa completă per string, per combiner (§PTh-I.6.3) |
| Protocol RfG | configurația finală a funcțiilor de sistem + PV testare supravegheată OD |
| Certificat/notificare OD | Notificarea Operațională de Punere în Funcțiune, sigilarea grupului de măsură |
| Instrucțiuni de exploatare | operare SCADA/PPC, proceduri de deconectare de urgență, plan de intervenție PSI (trimitere la `scenariu-psi.md`) |
| Program de mentenanță | verificări periodice priză de pământ, SPD, termografie, curățare module (soiling), revizie invertoare |
| Garanții | certificate de garanție module (25–30 ani performanță), invertoare, transformator, structuri |

Cartea tehnică se completează pe tot parcursul execuției și constituie baza recepției la terminarea lucrărilor, a punerii în funcțiune definitive avizate de operatorul de rețea și a exploatării ulterioare a centralei electrice fotovoltaice.

---

## PTh-I.13. Anexă — Tabel de corespondență planșe de detaliu D01–D18

| Cod | Titlu | Scară | Capitol asociat breviar/montaj |
|---|---|---|---|
| D01 | Montaj cutie combiner DC pe structură | 1:10 | §PTh-I.3.3, §PTh-I.4.1 |
| D02 | Traseu cablu solar DC pe structură | 1:10 | §PTh-I.3.2 |
| D03 | Conector MC4 — sertizare/etanșare | 1:5 | §PTh-I.3.2 |
| D04 | Șanț cablu DC/AC JT subteran | 1:20 | §PTh-I.3.5, §PTh-I.7.2 |
| D05 | Șanț cablu MT 20 kV subteran | 1:20 | §PTh-I.3.5, §PTh-I.7.2 |
| D06 | Subtraversare drum tehnologic | 1:20 | §PTh-I.3.5 |
| D07 | Cămin de tragere/vizitare MT | 1:20 | §PTh-I.3.5 |
| D08 | Priză de pământ — electrod + contur | 1:10/1:20 | §PTh-I.3.7, §PTh-I.4.5 |
| D09 | Legare echipotențială cadru modul–structură | 1:5 | §PTh-I.3.1 |
| D10 | Paratrăsnet PT — captare + coborâre | 1:20 | §PTh-I.3.7, §PTh-I.4.5 |
| D11 | Fundație/platformă PT + cuvă retenție ulei | 1:20 | §PTh-I.3.6, corelare structură |
| D12 | Montaj SPD DC — combiner și invertor | 1:5 | §PTh-I.4.7, §PTh-I.5.9 |
| D13 | Celule MT — plan de echipare | 1:20 | §PTh-I.3.5, §PTh-I.5.5 |
| D14 | Etichetare, marcaj, pancarte de securitate | 1:5/1:10 | §PTh-I.9.1 |
| D15 | Stâlp CCTV/iluminat perimetral + fundație | 1:10/1:20 | §PTh-I.4.4 |
| D16 | Traversare împrejmuire — echipotențializare gard | 1:10 | §PTh-I.3.7 |
| D17 | Fundație/racord actuator tracker (variantă) | 1:10/1:20 | §PTh-I.3.4, DTAC §13.4 |
| D18 | Borne de marcare traseu subteran | 1:10 | §PTh-I.3.5 |

---

*Supliment de fază P.Th. întocmit pentru exemplul numeric de referință P_DC = 2.000 kWp, în deplină coerență cu memoriul DTAC (`instalatii.md`) al aceleiași specialități. Toate formulele și detaliile rămân aplicabile parametric la orice putere din plaja 500 kWp – 50 MWp, prin recalcularea directă a cifrelor din §PTh-I.4, conform relațiilor de scalare din DTAC §1 și §4. Reglajele finale ale protecțiilor MT, ale protecției de interfață și ale funcțiilor RfG, precum și rezistivitatea solului și densitatea de lovituri de trăsnet folosite în analiza de risc, se confirmă la faza P.Th. definitivă prin studiul geotehnic, harta izokeraunică a amplasamentului real și proiectul de racordare aprobat de operatorul de distribuție.*
