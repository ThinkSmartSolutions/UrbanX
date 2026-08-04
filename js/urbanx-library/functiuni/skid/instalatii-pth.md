# SUPLIMENT DE FAZĂ P.Th. — INSTALAȚII — SKID GPL (STAȚIE DE DISTRIBUȚIE GPL AUTO)

## PTh-I.1. Obiectul și structura suplimentului de fază P.Th.

Prezentul document constituie **suplimentul de fază P.Th.** (Proiect Tehnic de execuție, conform HG nr. 907/2016, Anexa nr. 8, coroborat cu conținutul-cadru de la Legea 50/1991 pentru fazele ulterioare autorizării) pentru memoriul de instalații al obiectivului **stație de distribuție GPL auto de tip SKID** — rezervor suprateran pe skid, grup de pompare antiex, dispenser de alimentare auto, punct de descărcare a autocisternei și instalațiile conexe electrice, de detecție-alarmare, de stingere-răcire, sanitare și de curenți slabi — dezvoltat la faza D.T.A.C. în `instalatii.md` și corelat cu `general.md` (fizica riscului GPL, zonarea ATEX ca logică transversală, tipurile de skid, distanțele de siguranță). Documentul de față **nu repetă** conținutul fazei D.T.A.C. — fluxul tehnologic de principiu, cele patru proprietăți fizice determinante ale GPL (densitatea vaporilor, raportul de expansiune 1:250, limitele de explozie, presiunea de vapori dependentă de temperatură), încadrarea în categoria de pericol P118 „mare" și cadrul normativ general — ci adaugă exclusiv **nivelul de detaliere necesar execuției**: detalii de montaj la scară de echipament și de tronson, breviare de calcul extinse la fiecare circuit real al instalației, fișe tehnice complete de echipament, caiet de sarcini de montaj, tabele de probe cu praguri numerice, protocoale de PIF, regimul ISCIR aplicabil recipientului sub presiune și planul de control al calității.

Pentru coerența cifrelor cu faza D.T.A.C., suplimentul este dezvoltat pe **exemplul numeric de referință deja stabilit**: rezervor GPL suprateran monobloc de **4,85 mc geometric** (util ~4,12 mc la grad de umplere 85%), presiune de calcul **PS = 17,65 bar**, verificat prin probă hidraulică la **1,43×PS ≈ 25,2 bar**, echipat cu grup de pompare antiex de **40-60 l/min** și dispenser cu breakaway. Dimensiunile geometrice exacte ale recipientului (diametru, lungime totală, forma capacelor) rămân, conform delimitării stabilite deja la D.T.A.C. §2.2, **responsabilitatea producătorului certificat ISCIR** al rezervorului — prezentul supliment nu recalculează rezistența mantalei sau geometria internă a recipientului, ci dimensionează la nivel de execuție **tot ceea ce este conex** recipientului: conductele, armăturile de sectorizare, instalația electrică antiex, priza de pământ și egalizarea de potențial, instalația de detecție și de oprire de urgență, instalația de răcire/stingere și rețeaua sanitară-pluvială. Oriunde breviarul de mai jos are nevoie de o valoare geometrică sau de o caracteristică de catalog neconfirmată încă de furnizorul contractat (de exemplu, forța exactă de separare a cuplajului breakaway sau NPSH-ul necesar al pompei selectate), acest fapt este semnalat explicit, cu metodologia de verificare la faza de execuție, și nu se substituie printr-o cifră inventată — fișa tehnică a echipamentului efectiv contractat confirmă sau ajustează valoarea de lucru, fără a modifica metodologia de calcul prezentată.

### PTh-I.1.1. Nivelul de detaliere suplimentar față de D.T.A.C.

| Element | Nivel D.T.A.C. | Nivel P.Th. (suplimentar, acest document) |
|---|---|---|
| Scheme | fluxul tehnologic de principiu (aprovizionare/stocare/distribuție), tabel orientativ de diametre pe tronsoane | schemă tehnologică de execuție (P&ID simplificat) cu identificatori pe fiecare armătură (V-01…V-nn, PSV-01/02, FE-01…), plan de amplasament cotat al platformei |
| Detalii de montaj | — | 20 detalii de execuție numerotate (D01…D20), scări 1:5…1:20, tabel poziții + text de execuție/toleranțe |
| Breviar | tabel orientativ diametre/viteze (§2.11), tabel zonare ATEX orientativ (§3.3), dimensionare deluge de principiu (§7.3) | dimensionarea completă a tuturor tronsoanelor reale (aspirație pompă, refulare, descărcare autocisternă, recuperare vapori, rețea deluge, rețea hidranți), calculul complet al prizei de pământ, al paratrăsnetului, verificarea NPSH a grupului de pompare tehnologic și a grupului PSI, bilanțul hidraulic total și confirmarea razelor de zonare ATEX cu parametrii reali de execuție |
| Echipamente | tipuri și parametri de referință (pompă antiex, dispenser certificat, detectoare Ex) | fișe tehnice complete per echipament major (rezervor, multivalvă, supape de siguranță, pompă, dispenser/breakaway, detectoare de gaz, detectoare de flacără/termocuple, PLC de oprire de urgență, tablou electric general, grup de pompare PSI, separator de hidrocarburi) |
| Probe | enumerare normativă (proba hidraulică, verificare priză de pământ, test ESD) | tabel complet parametru/valoare/durată/criteriu de admisie, pe toate instalațiile, inclusiv protocoale specifice de calibrare a detectoarelor și de testare „la gol" a lanțului deluge/ESD |
| Montaj | principii generale (materiale compatibile GPL, îmbinări sudate) | succesiune tehnologică de montaj pe activitate, calificarea sudorilor, controlul nedistructiv, tratamentul termic, protecția anticorozivă, control de calitate pe fază |
| PIF | succesiune de operații enumerată (§15 D.T.A.C.) | protocoale complete de măsurare pe fiecare instalație, cu praguri numerice și criterii de admisie, regimul ISCIR pentru recipientul sub presiune |
| Calitate | — | Plan de Control al Calității (PCC) cu faze determinante și capitolul „instalații" al cărții tehnice a construcției |

### PTh-I.1.2. Cadru normativ de detaliere (adăugat față de D.T.A.C. §1.3)

Cadrul normativ complet al obiectivului este cel enumerat la D.T.A.C. §1.3 (NTPEE-2018, ISCIR PT C7/PT C4, HG 245/2016, HG 1058/2006, SR EN 60079, I7/2011, I20/2000, SR EN 62305, I5/2010, P118-2/P118-3, OUG 195/2005, SR EN 12542/13341, Legea 10/1995). La acestea, faza P.Th. adaugă normele de **detaliere a execuției**:

| Normativ | Domeniu de detaliere P.Th. |
|---|---|
| **SR EN 13445** | proiectarea recipientelor sub presiune nesupuse la flacără — referință pentru verificarea documentației producătorului rezervorului la faza de recepție a echipamentului |
| **SR EN 13480** | conducte industriale metalice — proiectare, materiale, îmbinare, control, încercare — aplicabilă rețelei de conducte tehnologice GPL |
| **SR EN ISO 3834** | cerințe de calitate pentru sudarea prin fuziune a materialelor metalice — calificarea procedurilor de sudare (PQR/WPS) și a sudorilor pentru conductele și racordurile din oțel fără sudură ale instalației |
| **SR EN 10204** | tipuri de documente de inspecție pentru materiale metalice (certificate 3.1/3.2) — obligatorii pentru toate materialele în contact cu GPL (conducte, armături, flanșe) |
| **ISCIR PT CR4/2022** | prescripție tehnică pentru autorizarea și verificarea periodică a operatorilor RSVTI și a personalului de deservire a instalațiilor sub presiune |
| **HG 1029/2008** | echipamente sub presiune (transpunere PED 2014/68/UE) — aplicabilă modulelor de evaluare a conformității ale recipientului, ale supapelor de siguranță și ale armăturilor de securitate |
| **NTE 007/08/00** | adâncimi de pozare, distanțe între cabluri, moduri de pozare (îngropat, tub, jgheab) și factori de corecție pentru cablurile electrice antiex ale stației |
| **PE 107 (NTE 006/06/00)** | execuția rețelelor de cabluri electrice — tehnologie de tragere, raze de curbură |
| **PE 116/1994** | metodologia completă a încercărilor și măsurătorilor electrice la PIF |
| **1.RE-Ip 30/2004** | execuția prizelor de pământ — geometrie, materiale, adâncimi |
| **NP 004/2003** | proiectarea, execuția și exploatarea instalațiilor de protecție la trăsnet |
| **SR EN 62305-2** | metodologia de calcul a riscului (R vs. R_T) pentru alegerea nivelului de protecție la trăsnet |
| **SR EN 60079-14** | proiectarea, alegerea și montarea instalațiilor electrice în arii clasificate |
| **SR EN 60079-17** | verificarea și întreținerea instalațiilor electrice în arii clasificate |
| **SR EN 60079-25** | sisteme de securitate intrinsecă — proiectarea și verificarea buclelor de instrumentație Ex ia/ib (detectoare de gaz) |
| **SR EN 12845** | instalații fixe de luptă împotriva incendiului — sisteme sprinkler/drencer — referință de execuție pentru rețeaua deluge |
| **C56-2002** | verificarea calității execuției lucrărilor de construcții-montaj (platformă betonată, cuvă de retenție, fundații) |
| **PT R1-2010 (ISCIR)** | autorizarea utilajului de ridicare folosit la manevrarea rezervorului la montaj |
| **Legea nr. 64/2008** | funcționarea în siguranță a echipamentelor sub presiune |

---

## PTh-I.2. Detalii de execuție (D01–D20)

Detaliile de mai jos completează planșele de execuție ale proiectului tehnic. Fiecare detaliu este redactat la scara indicată, cu tabel de poziții și cu textul cerințelor de execuție și al toleranțelor admise. Numerotarea D01…D20 urmează fluxul fizic al instalației — de la fundație și rezervor, prin rețeaua de conducte și armături, prin instalația electrică antiex și de egalizare, către instalațiile de detecție, ESD, PSI și, în final, sanitare/pluviale și de curenți slabi.

### D01 — Detaliu fundație și ancorare rezervor pe șei — scara 1:20 (plan) / 1:10 (secțiune ancoraj)

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Radier/fundații locale sub șei | suport structural al rezervorului, conform memoriul de structură (verificare la ancorare seismică — clasa de importanță II-III) | beton C25/30, conform breviarul structurii |
| 2 | Șa de reazem (2 buc.) | element de contact rezervor-fundație, integrat pe skid | oțel, conform fișa constructivă a producătorului rezervorului |
| 3 | Buloane de ancorare | fixare șa-fundație, dimensionate la forța de răsturnare/glisare seismică | oțel, clasă conform breviarul structurii, ancoraj chimic sau prin manșoane înglobate |
| 4 | Placă de nivelare/element elastic sub șa | compensează denivelările fundației și, la unele soluții, permite dilatarea termică longitudinală a rezervorului | oțel/neopren dur, grosime conform toleranță nivelare |
| 5 | Bornă de legare la priza de pământ | continuitate electrică manta rezervor–conductor de contur | Cu 25 mm², sudură exotermică sau clemă bimetalică, conform D09 |

**Cerințe de execuție și toleranțe.** Poziționarea rezervorului pe fundație se realizează cu utilaj de ridicare autorizat ISCIR (PT R1-2010), respectând strict planul de manevră al furnizorului (puncte de prindere certificate pe skid, unghiuri de ridicare admise — interdicția de a suspenda rezervorul de racorduri, armături sau de elemente care nu sunt puncte de ridicare declarate). Nivelarea fundației sub fiecare șă: toleranță **≤ 3 mm/m**, verificată înainte de fixarea definitivă a buloanelor de ancorare — o denivelare necorectată introduce solicitări de torsiune neuniforme în manta, cu risc de afectare a integrității sudurilor longitudinale ale recipientului sub presiune. Una dintre cele două șei se execută, conform practicii curente pentru recipiente cilindrice orizontale, cu **libertate de deplasare longitudinală limitată** (gaură ovalizată la bulon sau reazem culisant), pentru a permite dilatarea termică a mantalei fără a introduce eforturi parazite în ancoraj — cealaltă șă rămâne fixă, punct de referință al poziției rezervorului. Cuplul de strângere al buloanelor se verifică cu cheie dinamometrică și se consemnează în fișa de montaj — fază determinantă, dat fiind rolul dublu al ancorajului (rezistență seismică, conform memoriul de structură, și prevenirea deplasării accidentale a recipientului sub presiune). Legarea la priza de pământ (poz. 5) se execută direct pe manta, la un punct curățat de vopsea, independent de continuitatea mecanică prin șei/buloane.

### D02 — Detaliu montaj multivalvă și armături pe capacul rezervorului — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Multivalvă (corp integrat) | integrează robinetul de fază lichidă cu supapă de exces de debit, robinetul de fază gazoasă, robinetul de purjare, indicatorul de nivel cu limitator la 85% | conform fișa tehnică a producătorului, certificată ISCIR PT C7 |
| 2 | Manometru | indicare presiune internă | scală conform PS = 17,65 bar, montat cu robinet de izolare pentru înlocuire fără golirea rezervorului |
| 3 | Termometru | temperatura fazei lichide | montat pe teacă, în contact termic cu faza lichidă |
| 4 | Garnitură de etanșare flanșă capac-multivalvă | etanșare compatibilă chimic cu GPL | NBR sau FKM/Viton, conform D.T.A.C. §2.10 |
| 5 | Punte de egalizare (jumper) peste flanșă | continuitate electrică peste discontinuitatea mecanică a flanșei | Cu, secțiune minimă conform D10 |

**Cerințe de execuție și toleranțe.** Montajul multivalvei se execută **exclusiv** conform instrucțiunilor producătorului certificat — nu se admite nicio modificare a configurației interne a multivalvei pe șantier (aceasta fiind un ansamblu testat și certificat integral în fabrică, componentă a dosarului tehnic ISCIR al recipientului). Garniturile (poz. 4) se verifică la recepție pentru compatibilitatea chimică declarată de producător (certificat de conformitate material, corelat cu SR EN 10204 pentru componentele metalice adiacente); se interzice înlocuirea cu garnituri de catalog generic fără verificarea compatibilității cu hidrocarburile lichefiate. Puntea de egalizare (poz. 5) se montează la fiecare flanșă a ansamblului multivalvă-capac, chiar dacă flanșa este metal-pe-metal (garnitura, fiind nemetalică, întrerupe continuitatea electrică directă) — verificarea continuității se execută conform D10, înainte de proba de presiune.

### D03 — Detaliu montaj supape de siguranță duble și conductă de evacuare — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Supapă de siguranță nr. 1 (activă) | dimensionată la debitul integral de calcul (scenariu incendiu extern), racordată pe faza gazoasă | conform fișa tehnică a producătorului, certificată ISCIR |
| 2 | Supapă de siguranță nr. 2 (rezervă) | identică ca capacitate cu nr. 1, montată în paralel | idem poz. 1 |
| 3 | Robinet de izolare cu sistem de interblocare (dacă se prevede) | permite izolarea individuală a unei supape pentru verificare, fără a lăsa niciodată ambele izolate simultan | conform D.T.A.C. §2.3 — interblocare mecanică sau prin plombare a poziției |
| 4 | Conductă de evacuare | dirijată vertical în sus, deasupra rezervorului, la înălțime care exclude impactul jetului de evacuare asupra personalului/vecinătăților | oțel fără sudură, diametru conform capacitatea supapei |
| 5 | Element de protecție la intemperii (capac de ploaie tip „gooseneck") | previne pătrunderea apei/gheții în conducta de evacuare fără a restricționa secțiunea de curgere | conform fișa producătorului |

**Cerințe de execuție și toleranțe.** Montarea celor două supape se face astfel încât izolarea uneia (pentru verificarea/resetarea periodică conform D.T.A.C. §14) să nu afecteze niciodată disponibilitatea celei de-a doua — soluția de interblocare (poz. 3), dacă este prevăzută, se testează funcțional la PIF, confirmând că este mecanic impposibil să se izoleze simultan ambele supape. Conducta de evacuare (poz. 4) se pozează fără coturi inutile, cu susțineri care preiau reacția dinamică a jetului de evacuare (forța de reacție la deschiderea supapei, semnificativă la debitele de calcul pentru scenariul de incendiu) — punctele de susținere se verifică la faza de proiectare a structurii metalice suport. Se verifică, înainte de proba de presiune, că plăcuța de capacitate a fiecărei supape montate corespunde exact valorii din dosarul tehnic ISCIR al recipientului (presiune de deschidere calibrată, debit de evacuare certificat) — o supapă cu altă calibrare decât cea prevăzută în proiect, montată din eroare, anulează exact marja de siguranță calculată de producătorul recipientului.

### D04 — Detaliu montaj grup de pompare antiex — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Fundație/soclu pompă | suport nivelat, cu orificii de drenaj pentru eventuale scurgeri minore | beton, cu strat de protecție chimică la contact cu hidrocarburi |
| 2 | Pompă antiex certificată Ex d IIB T4 | conform D.T.A.C. §2.6, debit 40-60 l/min | conform fișa tehnică a producătorului |
| 3 | Cuplaj elastic pompă-motor | preia micile dezalinieri, reduce vibrația transmisă | conform fișa producătorului |
| 4 | Supapă de by-pass | recirculare internă la închiderea dispenserului | conform D.T.A.C. §2.6 |
| 5 | Protecție la mersul în gol (senzor de presiune diferențială/debit) | oprire automată la aspirație de vapori | conform D.T.A.C. §2.6, cablare Ex |
| 6 | Racord flexibil de compensare vibrații (aspirație/refulare) | absoarbe vibrațiile pompei, evită transmiterea de eforturi ciclice în conducta rigidă | compatibil GPL, certificat pentru presiunea de lucru |

**Cerințe de execuție și toleranțe.** Alinierea cuplajului pompă-motor (poz. 3) se verifică cu comparator sau cu metodă laser, în limitele toleranței declarate de producător — o dezaliniere necorectată generează vibrații susținute care, pe termen lung, oboseală mecanică la nivelul etanșărilor pompei (exact tipul de defect care ar putea genera o scurgere lentă, nedetectabilă vizual imediat). Racordurile flexibile (poz. 6) se montează conform orientarea indicată de producător (nu toate tipurile admit torsiune sau montaj în orice poziție) și se verifică vizual periodic pentru fisurare a stratului exterior. Punerea în funcțiune inițială a pompei se face cu rezervorul parțial umplut și cu robinetele de sectorizare aval închise, verificând mai întâi sensul de rotație (pentru pompele cu sens unic de funcționare) și absența vibrațiilor anormale, înainte de a permite debitare pe circuitul complet către dispenser.

### D05 — Detaliu montaj dispenser și cuplaj breakaway — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Fundație dispenser | soclu betonat, nivelat, cu treceri etanșe pentru conducta de refulare și cablarea electrică | beton, conform planul de fundații |
| 2 | Dispenser certificat ATEX integral | debitmetru volumetric, afișaj, comandă | conform fișa tehnică a producătorului |
| 3 | Furtun flexibil cu conductor de egalizare înglobat | continuitate electrică pistol-corp dispenser | conform D.T.A.C. §2.7, lungime conform planul de amplasament |
| 4 | Dispozitiv breakaway | cuplaj cu două valve autoetanșante interne, calibrat la o forță de separare care cedează controlat înainte de afectarea structurii | conform fișa tehnică a producătorului, poziționat la distanța de la carcasă indicată de furnizor |
| 5 | Pistol de alimentare etanș | interfață cu vehiculul | conform fișa tehnică a producătorului |
| 6 | Bornă de legare la conductorul de egalizare comun | continuitate electrică dispenser-priza de pământ generală | Cu, conform D10 |

**Cerințe de execuție și toleranțe.** Poziția breakaway-ului pe traseul furtunului (poz. 4) respectă strict distanța indicată de fișa tehnică a producătorului — o poziționare prea apropiată de carcasa dispenserului ar transmite tracțiunea direct asupra racordului fix al aparatului, în loc să cedeze ea însăși; o poziționare prea îndepărtată ar lăsa o lungime mare de furtun expusă tracțiunii înainte de separare, cu risc de deteriorare a furtunului însuși înainte ca breakaway-ul să acționeze. **Forța de separare** a cuplajului este calibrată din fabrică de producător (valoare tipică de catalog, care se confirmă și se consemnează din fișa tehnică a echipamentului efectiv contractat la execuție — nu se recalculează pe șantier) și este aleasă astfel încât să cedeze semnificativ sub sarcina care ar putea deteriora structura de fixare a dispenserului, dar suficient de mare încât manevrarea normală a furtunului de către operator sau clienți să nu producă separări accidentale. Testarea funcțională a breakaway-ului la PIF se face conform procedura producătorului (de regulă prin verificarea vizuală a integrității celor două valve autoetanșante și, dacă producătorul o prevede, printr-un test de separare controlată la banc, nu pe echipamentul montat definitiv). Conductorul de egalizare înglobat în furtun (poz. 3) se verifică prin măsurarea continuității electrice pistol-corp dispenser înainte de PIF, cu valoare admisă conform D.T.A.C. §4.4 (< 10⁶ Ω).

### D06 — Detaliu montaj punct de descărcare autocisternă — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Fundație/platformă punct de descărcare | betonată, cu pantă spre rigolă (evită acumularea de scurgeri minore) | beton, conform D19 |
| 2 | Cuplaj rapid cu supapă de reținere (fază lichidă) | previne refluxul la finalul transvazării | conform fișa tehnică a producătorului |
| 3 | Racord fază gazoasă (recuperare vapori) | conform D.T.A.C. §2.8 | conform fișa tehnică a producătorului |
| 4 | Bornă de egalizare dedicată + clemă antistatică | conform D.T.A.C. §5.2 | Cu, cu punct de măsură continuitate |
| 5 | Buton ESD local | accesibil imediat lângă punctul de cuplare, conform D04 din capitolul ESD (D-uri electrice) | Ex d, tip „ciupercă" roșie |
| 6 | Panou de instrucțiuni „secvență obligatorie de operare" | afișat vizibil la punctul de descărcare | conform D.T.A.C. §5.2, tabel secvență |

**Cerințe de execuție și toleranțe.** Borna de egalizare dedicată (poz. 4) se amplasează astfel încât clema antistatică să poată fi fixată pe șasiul autocisternei **înainte** de orice manevră de cuplare a furtunurilor, fără ca operatorul să fie obligat să treacă prin spatele sau sub vehicul — poziționarea greșită a bornei, care ar obliga la manevre incomode, este o cauză frecventă de nerespectare în practică a secvenței obligatorii de operare, motiv pentru care amplasarea ei se verifică explicit împreună cu beneficiarul înainte de finalizarea execuției. Dacă se adoptă soluția de **interblocare electrică** (D.T.A.C. §5.2, recomandată), senzorul de continuitate pe clema antistatică se cablează la sistemul de comandă a transvazării conform D19 (circuite electrice), cu testare funcțională la PIF: deschiderea robinetelor de transvazare trebuie să rămână blocată electric până la confirmarea legăturii de împământare.

### D07 — Detaliu traseu conducte fază lichidă — susțineri și compensare dilatare — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Conductă fază lichidă | oțel fără sudură, îmbinări sudate, conform D.T.A.C. §2.9 | dimensiuni conform §2.11 D.T.A.C. (DN 20-40, funcție de tronson) |
| 2 | Suport fix | punct de referință, absoarbe integral forțele axiale de la acel punct | oțel, ancorat în structura de rezistență/fundație |
| 3 | Suport de ghidare (culisant) | permite deplasarea axială liberă a conductei, previne deplasarea laterală | oțel, cu element de reazem cu frecare redusă |
| 4 | Buclă/compensator de dilatare (dacă lungimea tronsonului o impune) | absoarbe dilatarea termică longitudinală fără eforturi parazite pe armături/flanșe | conform breviarul de calcul, §PTh-I.4.2 |
| 5 | Robinet de sectorizare | izolare tronson pentru intervenție | conform D.T.A.C. §2.9, poziționat la rezervor, aspirație/refulare pompă, dispenser, punct de descărcare |
| 6 | Supapă hidraulică de descărcare (pe tronsoane izolabile la ambele capete) | previne capcana hidraulică pe lichid captiv | conform D.T.A.C. §2.9 |

**Cerințe de execuție și toleranțe.** Sudurile conductelor se execută exclusiv de sudori calificați conform SR EN ISO 3834 / proceduri WPS calificate prin PQR, cu control nedistructiv conform §PTh-I.6.2 — nu se admit îmbinări filetate pe niciun tronson din zonele ATEX (D.T.A.C. §2.9). Susținerile (poz. 2-3) se dimensionează și se poziționează conform breviarul de dilatare termică (§PTh-I.4.2): fiecare tronson rectiliniu de lungime semnificativă are minimum un suport fix și restul de tip ghidaj, astfel încât dilatarea termică a conductei (funcție de amplitudinea termică zilnică/sezonieră reală a amplasamentului) să fie absorbită controlat, fără a transmite eforturi la flanșele armăturilor sau la racordurile rezervorului/pompei/dispenserului — un racord rigid supus repetat la eforturi ciclice de dilatare necontrolată este un punct latent de oboseală a materialului și, în timp, de microfisurare. Panta de montaj a conductelor orizontale se execută cu o cădere ușoară (1:200…1:500) către punctele de purjare, evitând acumularea de lichid rezidual în porțiuni joase necontrolate ale traseului.

### D08 — Detaliu traseu conducte fază gazoasă și recuperare vapori — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Conductă fază gazoasă (echilibru/egalizare rezervor-multivalvă) | conform D.T.A.C. §2.9, §2.11 | DN 15-20 |
| 2 | Conductă recuperare vapori (descărcare autocisternă) | conform D.T.A.C. §2.8, §2.11 | DN 20-25 |
| 3 | Susțineri și pantă de montaj | evită acumularea de condens în punctele joase | conform poz. 2-3 D07, pantă spre punctele de purjare |
| 4 | Robinete de sectorizare fază gazoasă | izolare pentru intervenție | conform D.T.A.C. §2.9 |

**Cerințe de execuție și toleranțe.** Deși faza gazoasă nu prezintă riscul de „capcană hidraulică" descris la D07 (gazul, spre deosebire de lichid, este compresibil), traseul se pozează cu aceeași atenție la pantă și la eliminarea punctelor joase necontrolate, întrucât o mică proporție de lichid antrenat sau condensat se poate acumula altfel în conductă, cu risc de „ciocănire hidraulică" (hammering) la pornirea unui flux de gaz peste un dop de lichid acumulat. Verificarea vitezei de proiectare pe fază gazoasă (5-10 m/s, D.T.A.C. §2.11) se confirmă la faza de execuție cu debitele reale ale echipamentelor contractate.

### D09 — Detaliu priză de pământ — electrod vertical și conductor de contur — scara 1:10 (secțiune) / 1:20 (plan)

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Electrod vertical (țăruș) | electrod de dispersie, dispus pe conturul platformei tehnologice | oțel-cupru (Cu-bonded steel) sau OL-Zn, Ø 17,2 mm (⅝"), lungime 1,5-2,0 m |
| 2 | Conductor de contur (orizontal) | leagă toți electrozii și fiecare echipament metalic major | platbandă OL-Zn 40×4 mm sau conductor Cu funie 50 mm², la −0,8 m |
| 3 | Piesă de legătură electrod-conductor | îmbinare mecanică cu strat anticoroziv | clemă bimetalică sau sudură exotermică (preferată la punctele critice) |
| 4 | Priză de măsură | punct demontabil pentru măsurarea rezistenței de dispersie fără deconectarea instalației | cutie de vizitare, cu bornă de separare |
| 5 | Legături individuale la echipamente (rezervor, skid, pompă, dispenser, punct descărcare, cabină) | conform D01 poz. 5, D02 poz. 5, D10 | Cu 25 mm² fiecare |

**Cerințe de execuție și toleranțe.** Conform breviarului §PTh-I.4.7: la rezistivitate de calcul ipotetică ρ = 100 Ω·m, un electrod vertical de 2,0 m dă o rezistență individuală de dispersie de ordinul câteva zeci de ohmi; pentru ținta **R_p ≤ 4 Ω** (D.T.A.C. §4.4), rezultă necesarul unui număr de electrozi legați în paralel prin conductorul de contur, dispuși pe conturul platformei tehnologice (200-250 mp, D.T.A.C. §1.1) la o spațiere de ordinul 3-5 m, densitate justificată de suprafața compactă a instalației și de cerința de rezistență redusă, mai severă decât la o instalație electrică obișnuită, impusă de riscul de descărcare electrostatică (D.T.A.C. §4.4). **Valoarea rezistivității solului (ρ) este o ipoteză de calcul preliminară — se confirmă obligatoriu prin măsurare Wenner pe amplasament**, înainte de execuția finală; dacă rezistivitatea reală diferă semnificativ, numărul de electrozi/spațierea se recalculează. Adâncimea de batere a electrodului: minimum 2,0 m sub cota terenului finit, cu vârful electrodului situat, pe cât posibil, sub nivelul de îngheț și în stratul de sol cu umiditate mai stabilă. Sudura exotermică (obligatorie la punctele de legare a echipamentelor critice — rezervor, multivalvă, punct de descărcare) se execută doar de personal instruit specific.

### D10 — Detaliu egalizare de potențial (bonding) — punți peste flanșe și cuplaje — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Punte de egalizare (jumper) peste flanșă cu garnitură izolatoare | continuitate electrică peste discontinuitatea introdusă de garnitură | Cu, secțiune minimă 4-6 mm², cleme la ambele capete |
| 2 | Punte de egalizare peste cuplaj de furtun/racord filetat | idem, pe traseul furtunurilor dispenserului și ale punctului de descărcare | conform poz. 1 |
| 3 | Bară comună de egalizare (bus de bonding) | punct central de conectare a tuturor elementelor metalice majore | Cu, secțiune conform breviarul §PTh-I.4.9 |
| 4 | Legătură echipament-bară comună | fiecare echipament major (rezervor, skid, pompă, dispenser, punct descărcare, copertină/estacadă metalică, gard metalic din vecinătate) | Cu 25 mm², conform D09 poz. 5 |

**Cerințe de execuție și toleranțe.** Se verifică sistematic, prin măsurare punct-cu-punct cu miliohmetru dedicat, continuitatea electrică a **fiecărei** discontinuități mecanice potențiale identificate în proiect (flanșe cu garnitură nemetalică, racorduri filetate, cuplaje de furtun) — valoare admisă **< 10⁶ Ω** între cele două părți ale discontinuității, conform D.T.A.C. §4.4. Se interzice folosirea vopselei de protecție a elementelor metalice ca strat izolator sub punctele de fixare a puntelor de egalizare — zonele de contact se curăță local (răzuire) înainte de montarea clemei, iar după montaj se reface protecția anticorozivă în jurul punctului de contact, fără a acoperi clema însăși. Verificarea integrală a rețelei de egalizare (toate punțile + toate legăturile la bara comună + legătura bară comună-priză de pământ) se execută **înainte** de proba de presiune a instalației tehnologice și se repetă la PIF final.

### D11 — Detaliu montaj paratrăsnet — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Dispozitiv de captare (tijă sau catenar, funcție de configurația amplasamentului) | poziționat conform metoda sferei rotative pentru nivelul de protecție I | oțel inox sau OL-Zn, înălțime conform breviarul §PTh-I.4.8 |
| 2 | Suport dispozitiv de captare | pe structură dedicată (stâlp independent), care domină rezervorul și echipamentele — nu se folosește rezervorul însuși ca element de captare direct | conform fișa constructivă |
| 3 | Conductor de coborâre | traseu vertical cel mai scurt, minimum 2 coborâri pentru redundanță | platbandă OL-Zn 25×4 mm sau conductor rotund Ø 8 mm, fixat la interax ≤ 1,0 m |
| 4 | Piesă de separație (întrerupător de măsură) | permite deconectarea coborârii de priza de pământ pentru măsurarea rezistenței de dispersie | la înălțime accesibilă (≈ 1,5-2,0 m), cu capac de protecție |
| 5 | Legătură la priza de pământ dedicată | conform D.T.A.C. §4.5, interconectată electric cu priza de pământ generală | conform D09, sudură exotermică preferată |
| 6 | Descărcătoare de supratensiune (SPD) pe tabloul general | protecția echipamentelor electrice/electronice sensibile (centrală detecție gaz, PLC ESD) | conform D19, coordonate pe cascadă |

**Cerințe de execuție și toleranțe.** Nivelul de protecție la trăsnet adoptat este **nivelul I** (D.T.A.C. §4.5), justificat de riscul de explozie al obiectivului, nu de dimensiunile sale — poziția dispozitivelor de captare se stabilește prin **metoda sferei rotative** (raza corespunzătoare nivelului I, cea mai severă dintre cele patru niveluri standardizate), astfel încât întregul volum al rezervorului, al armăturilor și al echipamentelor tehnologice să rămână în zona protejată, nu la o estimare vizuală. Dispozitivul de captare **nu se montează direct pe manta rezervorului** — se prevede o structură independentă (stâlp dedicat), poziționată astfel încât raza de protecție să cuprindă întregul echipament fără a introduce puncte de fixare mecanică suplimentare pe recipientul sub presiune. Priza de pământ dedicată a paratrăsnetului (poz. 5), cu rezistență țintă ≤ 10 Ω conform D.T.A.C. §4.5, se interconectează electric cu priza de pământ generală a instalației (D09) — cele două prize nu rămân niciodată electric separate, pentru a evita apariția unei diferențe de potențial periculoase între ele în cazul unei descărcări.

### D12 — Detaliu cuvă de retenție și platformă betonată — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Cuvă de retenție sub rezervor | capacitate minimă egală cu volumul rezervorului protejat (D.T.A.C. §12) | beton impermeabilizat, cu strat de protecție chimică |
| 2 | Platformă tehnologică betonată | 200-250 mp, impermeabilizată, fără gropi/depresiuni necontrolate (D.T.A.C. §10) | beton, pantă de scurgere ≥ 1,5% spre rigole |
| 3 | Rigolă perimetrală | colectarea apelor pluviale/de stropire, dirijate spre separatorul de hidrocarburi | beton prefabricat, fără sifon de pardoseală în zona ATEX (D.T.A.C. §9.1) |
| 4 | Drenaj controlat al cuvei | evacuarea apelor pluviale normale din cuvă, prin separatorul de hidrocarburi | vană de izolare, în regim normal deschisă doar pentru golire controlată |
| 5 | Priză de fundare | electrozi/platbande înglobate în radier, integrate în priza de pământ generală | conform D09 |

**Cerințe de execuție și toleranțe.** Impermeabilizarea cuvei de retenție (poz. 1) se verifică prin probă cu apă (umplere și menținere minimum 24 h, fără scădere de nivel vizibilă) — fază determinantă, dat fiind rolul cuvei de a preveni infiltrarea unei eventuale scurgeri de produs în sol. Panta platformei (poz. 2) se verifică topografic înainte de recepție, confirmând dirijarea integrală a scurgerilor către rigolele exterioare zonei clasificate — orice punct jos rezidual, necontrolat, constituie un potențial loc de acumulare a vaporilor grei de GPL (D.T.A.C. §1.2a, §10). Se interzice explicit orice sifon de pardoseală fără gardă hidraulică permanent umplută în interiorul perimetrului tehnologic, conform principiul stabilit la D.T.A.C. §9.1.

### D13 — Detaliu zid de foc — treceri pentru conducte și cabluri — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Zid de foc | rezistență la foc REI 180-240, conform memoriile de arhitectură și de structură | beton armat/zidărie, conform breviarul de structură |
| 2 | Trecere protejată pentru conductă tehnologică | manșon etanș, cu etanșare rezistentă la foc echivalentă REI a zidului | manșon metalic + material de etanșare rezistent la foc, conform certificare |
| 3 | Trecere protejată pentru cablu electric | etanșare rezistentă la foc, fără a compromite continuitatea electrică a ecranelor/armăturilor cablurilor | conform sistemul certificat de etanșare la foc |
| 4 | Element de compensare a dilatării la traversarea zidului | previne transmiterea de eforturi structurale conductei prin peretele rigid | conform breviarul §PTh-I.4.2 |

**Cerințe de execuție și toleranțe.** Fiecare traversare a zidului de foc de către o conductă sau un cablu se execută cu un sistem de etanșare **certificat la o rezistență la foc cel puțin egală cu cea a zidului însuși** — o trecere necorespunzător etanșată anulează parțial funcția zidului, creând o cale de propagare a flăcării/gazelor fierbinți exact în punctul conceput ca barieră. Numărul de traversări se minimizează prin proiectare (rutare a conductelor/cablurilor cât mai concentrată), iar poziția fiecărei traversări se marchează pe planul as-built, pentru referință la orice intervenție ulterioară. Conductele care traversează zidul de foc se pozează cu joc suficient în manșon pentru a permite dilatarea termică (poz. 4), fără ca zidul să constituie, involuntar, un punct fix suplimentar neprevăzut în breviarul de dilatare.

### D14 — Detaliu montaj detectoare de gaz — poziționare la sol și cablare Ex — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Detector de gaz (infraroșu punctual NDIR, certificat Ex) | montat la 10-30 cm față de sol (D.T.A.C. §6.1), la fiecare sursă de risc identificată | conform fișa tehnică a producătorului, minim 3-4 puncte |
| 2 | Suport/consolă de montaj | fixare rigidă, orientare conform planul de detecție, protejată de impact mecanic accidental (utilaje, manevre) | oțel zincat sau suport certificat de producător |
| 3 | Cablu de instrumentație (securitate intrinsecă, dacă tipul de senzor o impune) | separat fizic de cablurile de forță, manta albastru-deschis pentru identificare | conform D.T.A.C. §4.2, SR EN 60079-25 |
| 4 | Presetupă Ex cu barieră de etanșare | intrarea cablului în carcasa detectorului | conform D.T.A.C. §4.2 |
| 5 | Etichetă de identificare | cod unic detector, coerent cu schema de detecție și cu centrala din cabină | rezistentă UV |

**Cerințe de execuție și toleranțe.** Poziționarea la 10-30 cm de sol (poz. 1) nu este negociabilă pe șantier prin considerații de „conveniență" de montaj (de exemplu, montarea mai sus pentru a evita zona expusă la stropire/spălare) — orice abatere de la această înălțime redă exact eroarea de proiectare pe care D.T.A.C. §6.1 o exclude explicit (un detector prea sus ar rata scurgerile de GPL, care se acumulează la sol). Fiecare detector se amplasează astfel încât să acopere efectiv sursa de risc alocată (rezervor, pompă, dispenser, punct de descărcare, cămine/canale din perimetrul de risc), conform planul de detecție întocmit la faza D.T.A.C. §3.3/§6.1 și confirmat la execuție cu poziția reală a echipamentelor montate. Cablarea de instrumentație (poz. 3) respectă separarea fizică față de cablurile de forță (motor pompă, iluminat) — traseu dedicat sau distanță minimă de separare, conform aceleași logici descrise la instalațiile electrice ale altor obiective din bibliotecă, pentru a evita interferența electromagnetică asupra semnalului de concentrație.

### D15 — Detaliu montaj detectoare de flacără UV/IR și termocuple pe manta — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Detector de flacără UV/IR combinat | poziționat cu linie optică liberă spre zonele de risc de jet fire (armături, punct de descărcare) | conform fișa tehnică a producătorului, certificat Ex |
| 2 | Termocuplu pe manta rezervorului | măsoară temperatura de suprafață a metalului, în punctele identificate ca cele mai expuse (partea superioară, neudată de lichid) | conform fișa tehnică a producătorului, montat pe suport dedicat, fără perforarea mantalei recipientului sub presiune |
| 3 | Cablu rezistent la foc | asigură transmisia semnalului pe durata inițială a unui incendiu, înainte de intervenția instalației de răcire | conform categoria de cablu certificată |
| 4 | Cablare către centrala de semnalizare P118-3 | integrare cu logica de alarmare și cu declanșarea automată a deluge-ului (D16) | conform D.T.A.C. §7.7 |

**Cerințe de execuție și toleranțe.** Termocuplele (poz. 2) se fixează pe manta prin sisteme de prindere care **nu perforează sau nu sudează direct** pe recipientul sub presiune fără avizul explicit al producătorului rezervorului și, unde este cazul, fără procedura ISCIR aplicabilă unei asemenea intervenții asupra unui echipament certificat — orice modificare neautorizată a mantalei recipientului (inclusiv o sudură de fixare a unui senzor) poate compromite garanția și certificarea ISCIR a acestuia. Poziționarea liniei optice a detectoarelor UV/IR (poz. 1) se verifică la montaj pentru absența oricărui obstacol (conducte, structuri, vegetație viitoare) care ar putea bloca vizibilitatea către zona de risc supravegheată. Testarea funcțională a lanțului complet (senzor → centrală → declanșare automată deluge/ESD, conform D.T.A.C. §7.7) se execută la PIF prin simulare a semnalului, conform protocolul din §PTh-I.7.

### D16 — Detaliu instalație deluge/drencer — rețea conducte și duze — scara 1:10

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Rețea de conducte deluge | distribuie apa de la vana de acționare la duzele de pe generatoarea superioară a rezervorului | oțel zincat/inox, dimensionată conform breviarul §PTh-I.4.10 |
| 2 | Duze de pulverizare (tip deschis) | acoperă întreaga suprafață de calcul a rezervorului (D.T.A.C. §7.3), montate pe generatoarea superioară | conform fișa tehnică a producătorului, debit unitar conform planul de acoperire |
| 3 | Vană de acționare deluge | acționare manuală locală ȘI automată (semnal de la termocuple/detectoare de flacără, D15) | conform D.T.A.C. §7.3, certificată pentru serviciu de incendiu |
| 4 | Conductă de alimentare de la grupul de pompare PSI | conform D17 | dimensionată conform breviarul §PTh-I.4.10 |

**Cerințe de execuție și toleranțe.** Duzele (poz. 2) se orientează și se distanțează conform planul de acoperire întocmit de proiectantul de specialitate PSI, astfel încât **întreaga suprafață de calcul** a rezervorului să primească intensitatea de stropire minimă de 10 l/min·mp (D.T.A.C. §7.3) — nu doar suprafața nominală teoretică, ci și marja adoptată conservator pentru elementele metalice adiacente aflate în raza de radiație termică directă (skid, suporți, multivalvă expusă). Testarea hidraulică a rețelei se face cu comandă manuală de test (deschiderea vanei de acționare, verificarea presiunii și a debitului la duzele cele mai îndepărtate hidraulic de grupul de pompare), fără declanșarea automată reală în timpul probei — declanșarea automată propriu-zisă se verifică separat, prin simularea electrică a semnalului de la termocuple/detectoare de flacără (D15), conform protocolul de PIF.

### D17 — Detaliu grup de pompare PSI (principal + jockey + rezervă) și rezervor de apă — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Rezervor de apă dedicat PSI | minim 25 mc + rezerva hidranților (D.T.A.C. §7.4) | beton/oțel, conform breviarul §PTh-I.4.11 |
| 2 | Pompa principală | dimensionată pentru debitul integral de proiectare (răcire + hidranți simultan) | conform breviarul §PTh-I.4.10, alimentare electrică prioritară (sursă de siguranță) |
| 3 | Pompa pilot (jockey) | menține presiunea în rețea, evită pornirea inutilă a pompei principale | debit redus, pornire/oprire automată pe presostat |
| 4 | Pompa de rezervă | identică ca și capacitate cu pompa principală, preluare automată la defect | conform D.T.A.C. §7.4 |
| 5 | Tablou de comandă grup pompare PSI | comandă automată/manuală, semnalizare stare, testare periodică programată | conform D19, alimentare din circuit dedicat de siguranță |

**Cerințe de execuție și toleranțe.** Rezervorul de apă (poz. 1) se dimensionează conform bilanțul hidraulic complet, dezvoltat la §PTh-I.4.12 — nu doar la valoarea minimă enunțată la D.T.A.C. §7.4, ci confirmată cu debitele reale ale duzelor deluge selectate și ale hidranților proiectați. Cele trei pompe (poz. 2-4) se testează individual la PIF, prin pornire pe rând, verificându-se debitul și presiunea realizate de fiecare la punctul de funcționare de proiect, precum și **preluarea automată** a sarcinii de către pompa de rezervă la simularea unui defect al pompei principale (test obligatoriu, întrucât redundanța descrisă la D.T.A.C. §7.4 nu este validată dacă comutarea automată nu funcționează efectiv). Alimentarea electrică a grupului de pompare PSI se realizează dintr-un circuit prioritar, cu sursă de rezervă (generator sau, minim, o schemă care nu depinde exclusiv de alimentarea generală a stației, D.T.A.C. §4.1).

### D18 — Detaliu hidranți exteriori și rețea de alimentare — scara 1:20

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Hidrant exterior suprateran DN100 | debit minim 5 l/s, racord tip B | conform D.T.A.C. §7.5, distanță maximă 50 m între hidranți |
| 2 | Rețea de conducte de alimentare hidranți | de la grupul de pompare PSI la fiecare hidrant | oțel zincat/PEHD conform presiune de serviciu, dimensionată la §PTh-I.4.11 |
| 3 | Robinet de sectorizare la fiecare hidrant | permite izolarea pentru mentenanță fără afectarea restului rețelei | conform planul de sectorizare |
| 4 | Fundație/soclu hidrant | protecție la impact accidental (bornă de protecție dacă amplasat în zonă de trafic) | beton, cu bornă metalică de protecție unde relevant |

**Cerințe de execuție și toleranțe.** Amplasarea hidranților respectă distanța maximă de 50 m (D.T.A.C. §7.5), verificată pe planul de situație astfel încât întregul perimetru al stației și zonele imediat învecinate relevante să fie acoperite fără zone moarte. Racordul tip B se verifică la compatibilitate cu echipamentul standard al autospecialelor ISU locale, printr-o probă de conectare la PIF. Rețeaua de alimentare se testează la presiunea de proiect, cu verificarea debitului real la hidrantul cel mai îndepărtat hidraulic — punct critic pentru confirmarea dimensionării conductelor și a grupului de pompare.

### D19 — Detaliu tablou electric general (TGD) și circuite dedicate ESD/detecție — scara 1:5

| Poz. | Element | Descriere | Material / dimensiune |
|---|---|---|---|
| 1 | Tabloul General de Distribuție (TGD) | amplasat în afara oricărei zone Ex, schemă TN-S | conform D.T.A.C. §4.1, breviarul §PTh-I.4.13 |
| 2 | Dispozitive diferențiale (RCD) 30 mA | protecția prizelor din cabină | conform D.T.A.C. §4.1 |
| 3 | Circuit dedicat ESD | separat fizic de restul instalației, alimentare neîntreruptibilă | conform D.T.A.C. §4.1, §6.3 |
| 4 | Circuit dedicat centrală detecție gaz/incendiu | sursă neîntreruptibilă, autonomie minimă 1 oră | conform D.T.A.C. §6.3 |
| 5 | Descărcătoare de supratensiune (SPD), cascadă | protecție echipamente sensibile la supratensiuni induse | conform D11 poz. 6 |
| 6 | Contoare/înregistratoare de energie (dacă prevăzute) | monitorizare consum | conform proiect |

**Cerințe de execuție și toleranțe.** Separarea fizică a circuitului ESD (poz. 3) de restul instalației electrice se verifică la execuție prin trasarea independentă a cablării, nu doar prin separarea logică pe tabloul electric — o defecțiune sau o deconectare pe circuitele generale nu trebuie, în niciun scenariu de defect unic, să compromită capacitatea de a acționa oprirea de urgență (D.T.A.C. §4.1). Sursele neîntreruptibile ale circuitelor de detecție (poz. 4) se testează la PIF prin simularea unei căderi a alimentării generale, verificând autonomia reală declarată (minim 1 oră, D.T.A.C. §6.3). Coordonarea SPD-urilor (poz. 5) pe cascadă (tip 1+2 la intrarea în TGD, tip 2/3 la echipamentele terminale sensibile) se verifică prin calculul tensiunilor reziduale la fiecare treaptă, conform breviarul §PTh-I.4.13.

### D20 — Detaliu etichetare, marcaj, pancarte de securitate și cabina de operator — scara 1:5/1:10

| Poz. | Element | Descriere | Standard / format |
|---|---|---|---|
| 1 | Etichetă echipament/armătură/detector | cod unic la fiecare componentă majoră, coerent cu schema tehnologică de execuție | rezistentă UV, inscripție permanentă |
| 2 | Pancartă „PERICOL EXPLOZIE — ARIE Ex — FUMATUL/FLACĂRA DESCHISĂ INTERZISE" | la toate punctele de acces în perimetrul tehnologic | conform marcaj normalizat de securitate |
| 3 | Pancartă „OPRIȚI MOTORUL — SECVENȚĂ OBLIGATORIE DE DESCĂRCARE" | la punctul de descărcare a autocisternei | conform D.T.A.C. §5.2 |
| 4 | Duș de urgență/spălător de ochi | amplasat la limita zonei Ex, accesibil imediat | conform D.T.A.C. §9, alimentare cu apă la temperatură moderată |
| 5 | Schema tehnologică și schema electrică actualizate | afișate în cabina de operator | ramă rezistentă, actualizată la fiecare modificare |

**Cerințe de execuție și toleranțe.** Etichetarea se execută înainte de PIF și se verifică 100% la recepție — fiecare armătură, fiecare detector, fiecare tronson de conductă poartă un identificator unic, coerent cu schema tehnologică as-built. Pancartele de securitate (poz. 2-3) se montează în puncte vizibile de la distanța de citire normată, cu materiale rezistente la intemperii. Dușul de urgență/spălătorul de ochi (poz. 4) se poziționează astfel încât să fie accesibil în câteva secunde din orice punct al zonei tehnologice cu risc de contact accidental cu produs lichid, fără a necesita deplasarea persoanei afectate pe o distanță semnificativă (D.T.A.C. §9).

---

## PTh-I.3. Specificații tehnice de montaj (fișe pe activitate)

### PTh-I.3.1. Montajul și ancorarea rezervorului

Rezervorul se livrează complet echipat din fabrică (manta, capace, multivalvă, supape de siguranță, indicator de nivel, manometru, termometru) și testat/certificat de producător conform ISCIR PT C7, cu placă de timbru și dosar tehnic atașat — pe șantier se execută exclusiv manevrarea, poziționarea pe fundație, ancorarea (D01) și racordurile de interfață (conducte, cablare de egalizare și de instrumentație). Manevrarea rezervorului se realizează cu utilaj de ridicare autorizat ISCIR (PT R1-2010), cu personal deservent (macaragiu) și legători de sarcină autorizați, respectând planul de manevră al furnizorului (puncte de prindere certificate). Se interzice sudarea, perforarea sau orice modificare a mantalei recipientului pe șantier, în afara celor expres prevăzute și autorizate în dosarul tehnic al echipamentului. Poziționarea finală respectă planul de situație (distanțe de siguranță conform D.T.A.C./`general.md`), cu verificarea nivelării înainte de fixarea definitivă a ancorajelor.

### PTh-I.3.2. Montajul conductelor și armăturilor

Execuția rețelei de conducte urmează D07-D08, cu respectarea strictă a materialelor compatibile GPL (oțel fără sudură pentru conducte, elastomeri NBR/FKM pentru garnituri, conform D.T.A.C. §2.10) și a interzicerii îmbinărilor filetate în zonele clasificate. Sudarea se execută de personal calificat conform proceduri WPS calificate prin PQR (SR EN ISO 3834), cu control nedistructiv al sudurilor conform §PTh-I.6.2 înainte de proba de presiune. Montarea armăturilor de sectorizare respectă poziționarea din proiect (rezervor, aspirație/refulare pompă, dispenser, punct de descărcare), permițând izolarea oricărui tronson fără golirea întregii instalații. Supapele hidraulice de descărcare (D.T.A.C. §2.9) se montează pe fiecare tronson identificat ca izolabil la ambele capete cu lichid captiv, conform lista de tronsoane din proiectul de execuție.

### PTh-I.3.3. Montajul grupului de pompare și al dispenserului

Grupul de pompare (D04) și dispenserul (D05) se montează pe fundațiile recepționate, cu verificarea alinierii cuplajului pompă-motor și cu testarea inițială la debit redus înainte de trecerea la regim normal. Breakaway-ul (D05, poz. 4) se montează strict la distanța și în orientarea indicate de fișa tehnică a producătorului, cu verificare vizuală a integrității celor două valve autoetanșante interne înainte de PIF. Furtunul cu conductor de egalizare înglobat se verifică pentru continuitate electrică pistol-corp dispenser imediat după montaj, înainte de conectarea la rețeaua de alimentare cu produs.

### PTh-I.3.4. Montajul instalației electrice antiex

Toate echipamentele electrice montate în zonele clasificate (D.T.A.C. §3, §4) se instalează strict cu certificatul Ex corespunzător zonei (verificare plăcuță de marcaj Ex vs. zonă la fiecare echipament, conform §PTh-I.7). Cablurile armate se pozează îngropat direct sau în tub etanș, cu presetupe Ex prevăzute cu barieră de etanșare la fiecare intrare în carcasă (D.T.A.C. §4.2) — montarea presetupei se verifică cu cuplu de strângere conform fișa producătorului, fază determinantă dat fiind rolul barierei de etanșare în prevenirea migrării gazului de-a lungul miezului cablului. Circuitele de securitate intrinsecă (buclele de instrumentație ale detectoarelor de gaz, SR EN 60079-25) se pozează fizic separat de circuitele de energie, cu manta de identificare albastru-deschis, pe tot traseul.

### PTh-I.3.5. Montajul prizei de pământ, al egalizării de potențial și al paratrăsnetului

Execuția urmează D09 (priză), D10 (egalizare) și D11 (paratrăsnet). Bararea electrozilor se face mecanic (ciocan hidraulic/vibrator), fără forțare care ar putea îndoi electrodul. Toate îmbinările electrod-conductor și conductor-conductor se execută prin cleme mecanice de calitate sau sudură exotermică, cu protecție anticorozivă ulterioară. Continuitatea întregii rețele de egalizare (toate punțile peste flanșe/cuplaje + toate legăturile echipament-bară comună-priza de pământ) se verifică prin măsurare punct-cu-punct **înainte** de proba de presiune a instalației tehnologice — fază determinantă, întrucât o discontinuitate electrică nedetectată la acest stadiu ar rămâne ascunsă până la o eventuală acumulare de sarcină electrostatică în exploatare.

### PTh-I.3.6. Montajul sistemelor de detecție gaz/incendiu și ESD

Execuția urmează D14 (detectoare de gaz), D15 (detectoare de flacără/termocuple) și D19 (circuite ESD). Poziționarea fiecărui detector de gaz respectă strict înălțimea de 10-30 cm de sol și amplasamentul din planul de detecție (D.T.A.C. §6.1) — nu se admit abateri de „conveniență" de montaj. Integrarea electrică a tuturor componentelor cu centrala de detecție și cu sistemul ESD se verifică punct cu punct, cu test de comunicație pe fiecare senzor/actuator, înainte de PIF general. Butoanele de oprire de urgență (D.T.A.C. §6.4) se montează la toate punctele prevăzute (dispenser, punct de descărcare, ieșirea din incintă, cabina de operator), cu verificarea accesibilității fizice fără traversarea zonei de risc.

### PTh-I.3.7. Montajul instalației PSI (deluge, hidranți, stingătoare)

Execuția urmează D16 (deluge), D17 (grup de pompare PSI) și D18 (hidranți). Rețeaua de conducte deluge se pozează cu pantă de golire pentru evitarea înghețului pe timp de iarnă la porțiunile expuse, cu vane de sector care permit izolarea pentru mentenanță fără compromiterea disponibilității restului sistemului. Duzele se orientează conform planul de acoperire al proiectantului PSI, verificat prin test hidraulic la debit nominal (comandă manuală de test, fără declanșare automată reală în timpul probei) înainte de PIF final. Stingătoarele portabile (D.T.A.C. §7.6) se amplasează diferențiat pe tip și pe amplasament, conform tabelul D.T.A.C., cu verificarea accesibilității și a datei de valabilitate la recepție.

### PTh-I.3.8. Montajul instalației sanitare, a cuvei de retenție și a separatorului de hidrocarburi

Execuția urmează D12 (cuvă/platformă) și D19-conexe pentru rețeaua pluvială. Impermeabilizarea cuvei de retenție și a platformei se verifică prin probă cu apă (D12), cu control al pantei de scurgere prin măsurare topografică. Separatorul de hidrocarburi de clasa I (D.T.A.C. §9, §12) se montează conform fișa tehnică a producătorului, cu verificarea etanșeității racordurilor și cu prima probă de funcționare la debitul de proiect al apelor pluviale colectate. Se verifică explicit absența oricărei legături directe, negândite, între pardoseala platformei tehnologice și rețeaua de canalizare (D.T.A.C. §9.1) — orice sifon de pardoseală rezidual din execuție se elimină sau se dotează cu gardă hidraulică permanent verificată.

---

## PTh-I.4. Breviar complet de calcul (execuție) — toate tronsoanele reale

Breviarul de mai jos dimensionează la nivel de execuție instalațiile conexe recipientului de 4,85 mc/PS 17,65 bar — deja stabilit la faza D.T.A.C. — extinzând tabelele orientative din D.T.A.C. (§2.11, §3.3, §7.3) la fiecare tronson real, la grupurile de pompare (tehnologic și PSI), la rețeaua de electrozi de împământare și la cascada de protecție la trăsnet.

### PTh-I.4.1. Recapitularea datelor de bază ale recipientului

| Parametru | Valoare |
|---|---|
| Volum geometric | 4,85 mc |
| Volum util (grad de umplere 85%) | ~4,12 mc |
| Presiune de calcul (PS) | 17,65 bar |
| Presiune de probă hidraulică | 1,43×PS ≈ 25,2 bar |
| Debit pompă (referință) | 40-60 l/min (adoptat pentru exemplul de calcul: 50 l/min) |
| Suprafață de calcul pentru instalația de răcire (conservator, D.T.A.C. §7.3) | 30-35 mp |

Valorile geometrice exacte ale recipientului (diametru, lungime, forma capacelor) rămân cele din fișa constructivă a producătorului certificat ISCIR selectat la execuție; breviarul de mai jos nu recalculează aceste valori, ci le utilizează ca date de intrare confirmate.

### PTh-I.4.2. Dimensionarea conductelor pe tronsoane reale și verificarea pierderii de sarcină

Pe baza vitezelor admisibile stabilite la D.T.A.C. §2.11 (fază lichidă 1,0-2,0 m/s, fază gazoasă 5-10 m/s), se confirmă și se detaliază diametrele pe tronsoanele reale ale exemplului de execuție (debit pompă adoptat 50 l/min = 0,833 l/s):

| Tronson | Fază | Debit | Diametru adoptat (DN) | Diametru interior aprox. | Viteză rezultată |
|---|---|---|---|---|---|
| Rezervor → pompă (aspirație) | lichidă | 0,833 l/s | DN 25 | ~27,3 mm | ≈ 1,42 m/s |
| Pompă → dispenser (refulare) | lichidă | 0,833 l/s | DN 20 | ~21,7 mm | ≈ 2,25 m/s (limită superioară — se recomandă DN25 pentru marjă) |
| Rezervor → multivalvă (gazoasă) | gazoasă | — | DN 15-20 | conform breviar producător | 5-8 m/s |
| Punct descărcare → rezervor (transvazare) | lichidă | conform debit autocisternă (30-60 mc/h uzual) | DN 32-40 | conform fișă producător | 1,0-1,5 m/s |

**Verificarea pierderii de sarcină pe tronsonul pompă-dispenser** (exemplu numeric, DN25, lungime estimată L = 15 m, viteză adoptată v = 1,75 m/s, densitate GPL lichid ρ ≈ 550 kg/mc, coeficient de frecare estimat f ≈ 0,025 pentru regim turbulent în conductă de oțel):

**ΔP = f × (L/D) × (ρ×v²/2) = 0,025 × (15/0,0273) × (550×1,75²/2) = 0,025 × 549,5 × 842,2 ≈ 11.570 Pa ≈ 0,116 bar**

Valoarea rezultată (sub 0,15 bar pe întregul tronson) este net inferioară presiunii disponibile de refulare a pompei (pompele antiex de acest tip livrează uzual presiuni utile de câțiva bar), confirmând dimensionarea DN25 adoptată — cu marja necesară pentru pierderile locale adiționale la coturi, robinete de sectorizare și breakaway, care se cumulează la faza de proiectare de detaliu cu lungimile echivalente declarate de producătorii armăturilor. Calculul se repetă analog pentru fiecare tronson real al proiectului de execuție, cu lungimile efective rezultate din planul de amplasament definitiv.

**Compensarea dilatării termice** (D07, poz. 4): pentru un tronson rectiliniu de oțel de lungime L (m), expus unei variații de temperatură ΔT (diferența dintre temperatura de montaj și temperatura extremă de exploatare, orientativ 50-60°C în climatul temperat), alungirea se calculează cu **ΔL = α × L × ΔT**, unde α ≈ 12×10⁻⁶ /°C pentru oțel carbon. Pentru un tronson de 15 m și ΔT = 55°C: ΔL = 12×10⁻⁶ × 15 × 55 ≈ 0,0099 m ≈ 10 mm — valoare care, deși modestă, trebuie absorbită prin combinația suport fix/suport de ghidare (D07) și, la tronsoanele mai lungi sau cu geometrie predominant rectilinie fără coturi naturale de compensare, printr-un compensator dedicat, pentru a nu transmite eforturi axiale susținute la flanșele armăturilor sau la racordurile rezervorului/pompei.

### PTh-I.4.3. Verificarea NPSH a grupului de pompare tehnologic

Particularitatea NPSH-ului la pomparea GPL lichid provine din faptul că **rezervorul este la propria presiune de saturație** a produsului la temperatura ambiantă (D.T.A.C. §1.2d) — spre deosebire de pomparea unui lichid convențional (apă), unde presiunea din rezervorul de aspirație este, de regulă, apropiată de presiunea atmosferică, iar marja NPSH provine în principal din diferența dintre această presiune și presiunea de vapori a lichidului. La GPL, presiunea din rezervor **este** aproximativ egală cu presiunea de vapori a produsului la temperatura respectivă, astfel încât termenul (P_rezervor − P_vapori)/(ρ×g) din formula NPSH disponibil tinde spre zero, iar marja reală de NPSH disponibil provine, practic, exclusiv din **înălțimea coloanei de lichid** aflată deasupra axului de aspirație al pompei, minus pierderile de sarcină pe conducta de aspirație:

**NPSH_disponibil ≈ z_lichid − h_f,aspirație**

unde z_lichid este diferența de cotă dintre nivelul lichidului în rezervor și axul de aspirație al pompei (pozitivă dacă lichidul este mai sus), iar h_f,aspirație este pierderea de sarcină pe traseul de aspirație (exprimată în metri coloană de lichid GPL). Această relație explică, la nivel fizic, de ce **pompele GPL se amplasează practic întotdeauna cu axul de aspirație sub generatoarea inferioară a rezervorului** (soluție uzuală în practica de proiectare a instalațiilor GPL, adoptată și la prezentul obiectiv) — o amplasare la nivelul rezervorului sau, cu atât mai puțin, deasupra lui, ar reduce sau ar anula complet marja NPSH disponibilă, cu risc de cavitație la pompă chiar în absența oricărei alte anomalii. Valoarea NPSH necesar (NPSHr), specifică pompei selectate, se confirmă din fișa tehnică a echipamentului efectiv contractat (ordinul de mărime tipic pentru pompe GPL de capacitatea 40-60 l/min este de câțiva metri coloană de lichid); la execuție se verifică, prin calculul de mai sus aplicat cu cota reală de amplasare rezultată din proiect, ca **NPSH_disponibil ≥ NPSH_necesar + marjă de siguranță** (uzual minimum 0,5-1,0 m), condiție care, alături de protecția la mersul în gol (D.T.A.C. §2.6), constituie a doua linie de apărare împotriva cavitației pompei.

### PTh-I.4.4. Confirmarea capacității supapelor de siguranță

Dimensionarea propriu-zisă a supapelor de siguranță ale rezervorului — debitul de evacuare necesar pentru scenariul de incendiu extern, calculat conform metodologia consacrată (aport termic proporțional cu suprafața udată de lichid, elevat la o putere sub-unitară, conform practica normativă preluată în SR EN 12542) — rămâne, conform delimitării stabilite la D.T.A.C. §2.2 și §2.3, **responsabilitatea producătorului certificat ISCIR** al recipientului, componentă a dosarului tehnic al acestuia. La faza P.Th., verificarea se limitează la **confirmarea de concordanță**: se compară presiunea de deschidere calibrată și debitul de evacuare certificat, înscrise pe plăcuța fiecărei supape montate, cu valorile prevăzute în dosarul tehnic ISCIR al rezervorului contractat, pentru ambele supape (activă și de rezervă, D.T.A.C. §2.3) — o supapă montată cu altă calibrare decât cea prevăzută în proiect constituie o neconformitate care se identifică și se corectează **înainte** de proba de presiune, nu la PIF final.

### PTh-I.4.5. Verificarea timpului de limitare a umplerii la 85%

Limitatorul de nivel (D.T.A.C. §2.4) blochează transvazarea la atingerea a 85% din volumul geometric — verificarea funcțională la PIF (§PTh-I.7) confirmă acționarea automată a acestui prag, indiferent de debitul de transvazare practicat. Nu se recalculează la faza P.Th. gradul de umplere însuși (fixat normativ la 85%, D.T.A.C. §2.4, conform SR EN 12542), ci se confirmă doar funcționarea mecanică/electrică a limitatorului montat, prin proba descrisă la §PTh-I.7.

### PTh-I.4.6. Cuplajul breakaway — verificare de coerență a forței de separare

Forța de separare a cuplajului breakaway (D05) este calibrată din fabrică de producător și se confirmă din fișa tehnică a echipamentului efectiv contractat la execuție. Verificarea de coerență la faza P.Th. constă în compararea acestei valori de catalog cu **rezistența la tracțiune a punctului de fixare a furtunului pe corpul dispenserului** (declarată de producătorul dispenserului) — condiția de proiectare este ca forța de separare a breakaway-ului să fie **sensibil inferioară** rezistenței punctului de fixare, astfel încât, la o tracțiune accidentală (situația „drive-away", D.T.A.C. §2.7), cedarea controlată să se producă întotdeauna la cuplaj, nu prin smulgerea racordului de la corpul dispenserului sau a furtunului însuși. Această verificare de coerență între cele două valori de catalog ale echipamentelor selectate se consemnează explicit în dosarul de execuție, ca element de compatibilitate a echipamentelor, fără a introduce o valoare numerică proprie neconfirmată de producători.

### PTh-I.4.7. Dimensionarea prizei de pământ

**Rezistența de dispersie a unui electrod vertical** de lungime L, diametru d, în sol de rezistivitate ρ, se calculează cu formula uzuală:

**R_e = ρ/(2×π×L) × [ln(4×L/d) − 1]**

Pentru electrodul adoptat (L = 2,0 m, d = 0,0172 m) și rezistivitatea de calcul preliminară ρ = 100 Ω·m:

**R_e = 100/(2×π×2,0) × [ln(4×2,0/0,0172) − 1] = 100/12,566 × [ln(465,1) − 1] = 7,96 × [6,142 − 1] = 7,96 × 5,142 ≈ 40,9 Ω**

Pentru un grup de n electrozi legați în paralel prin conductorul de contur, cu factor de utilizare η (care ține cont de interacțiunea câmpurilor de dispersie ale electrozilor vecini, funcție de spațierea adoptată), rezistența totală rezultă:

**R_p = R_e/(n × η)**

Pentru ținta **R_p ≤ 4 Ω** (D.T.A.C. §4.4) și un factor de utilizare estimat η ≈ 0,65 (spațiere relativ densă, justificată de suprafața compactă a platformei tehnologice de 200-250 mp):

**n = R_e/(R_p × η) = 40,9/(4 × 0,65) = 40,9/2,6 ≈ 15,7 → se adoptă n = 16 electrozi**

Pentru un perimetru orientativ al platformei tehnologice de ~60 m (platformă de ordinul 200-250 mp, geometrie aproximativ pătrată/rectangulară), spațierea rezultată este de **~3,75 m/electrod** — sensibil mai densă decât spațierea uzuală la instalații electrice obișnuite (unde 8-12 m poate fi suficient pentru ținte de 4-10 Ω), consecință directă a cerinței mai severe de rezistență redusă, impusă la această instalație de riscul de descărcare electrostatică (D.T.A.C. §4.4), nu de un considerent de protecție electrică generală. **Valoarea rezistivității solului (ρ = 100 Ω·m) este o ipoteză de calcul preliminară** — se confirmă obligatoriu prin măsurare Wenner pe amplasamentul real înainte de execuția finală a prizei de pământ; dacă rezistivitatea reală rezultă semnificativ mai mare (sol nisipos/pietros, secetă prelungită), numărul de electrozi și/sau lungimea lor se recalculează pe loc, conform aceeași metodologie, pentru a păstra ținta de 4 Ω.

### PTh-I.4.8. Nivelul de protecție la trăsnet și metoda sferei rotative

Nivelul de protecție adoptat este **LPL I** (D.T.A.C. §4.5), cel mai sever dintre cele patru niveluri standardizate de SR EN 62305, cu **raza sferei rotative de 20 m** (valoarea corespunzătoare nivelului I, mai restrictivă decât razele de 30/45/60 m corespunzătoare nivelurilor II/III/IV). Poziționarea dispozitivului de captare (D11) se stabilește astfel încât o sferă de 20 m rază, „rulată" teoretic pe toate direcțiile posibile în jurul instalației, să nu intersecteze niciun punct al rezervorului, al armăturilor expuse sau al echipamentelor tehnologice — condiție care, pentru un obiectiv de dimensiuni reduse pe verticală ca un skid GPL, se traduce practic într-un dispozitiv de captare montat pe o structură dedicată, cu înălțime suficientă (tipic 3-6 m peste cota rezervorului, confirmată prin verificarea geometrică efectivă la faza de proiectare de detaliu) pentru a „umbri" complet volumul protejat. Priza de pământ dedicată paratrăsnetului (D11, poz. 5), cu țintă **R ≤ 10 Ω**, se calculează cu aceeași formulă de la §PTh-I.4.7, adaptată la configurația specifică (electrozi la baza fiecărui conductor de coborâre, minimum 2 coborâri conform redundanța cerută la D11) — fiind o cerință mai puțin severă decât cea a prizei generale (4 Ω), numărul de electrozi dedicați rezultă, la aceeași rezistivitate de calcul, sensibil mai redus; interconectarea electrică cu priza de pământ generală (D.T.A.C. §4.5) rămâne, în orice caz, obligatorie.

### PTh-I.4.9. Egalizarea de potențial — dimensionarea barei comune și verificarea continuității

Bara comună de egalizare (D10, poz. 3) se dimensionează la o secțiune minimă care asigură atât capacitatea de conducere a curenților de scurgere statică (valori infime, de ordinul microamperilor-miliamperilor, fără cerință de secțiune mare din acest considerent), cât și, pentru elementele care ar putea fi implicate accidental într-un defect electric de rețea (de exemplu o punere la masă a unui echipament), o secțiune suficientă pentru a rezista termic curentului de defect pe durata de acționare a protecției — practic, se adoptă aceeași secțiune ca a conductorului principal de protecție (PE) al circuitului electric general al stației (Cu, secțiune conform breviarul electric §PTh-I.4.13), nu o secțiune minimă „de antistatic". Verificarea de continuitate a rețelei complete de egalizare (fiecare punte peste flanșă/cuplaj, fiecare legătură echipament-bară comună, legătura bară comună-priză de pământ) se execută prin măsurare punct-cu-punct, cu valoare admisă **< 10⁶ Ω** pe fiecare discontinuitate verificată individual (D.T.A.C. §4.4) — pragul ridicat (comparativ cu o cerință de continuitate electrică „de putere", unde s-ar cere sub 1 Ω) reflectă natura fenomenului contracarat: scurgerea sarcinilor electrostatice acumulate lent nu necesită o cale de rezistență foarte mică, ci doar o cale continuă, care să nu permită acumularea unei diferențe de potențial semnificative între elemente.

### PTh-I.4.10. Instalația deluge — debit, presiune, dimensionarea rețelei

Pe baza suprafeței de calcul adoptate conservator la D.T.A.C. §7.3 (30-35 mp) și a intensității de stropire minime (10 l/min·mp), debitul de proiectare al instalației de răcire rezultă, la limita superioară adoptată pentru dimensionare (35 mp):

**Q_deluge = 10 l/min·mp × 35 mp = 350 l/min ≈ 5,83 l/s ≈ 21 mc/h**

(valoare coerentă cu intervalul 350-420 l/min stabilit la D.T.A.C. §7.3, adoptată la limita inferioară a intervalului pentru breviarul de execuție, cu marjă de proiectare până la limita superioară confirmată de planul real de acoperire al duzelor selectate).

**Dimensionarea conductei principale de alimentare deluge** (viteză admisibilă apă 2-3 m/s pentru rețele de stingere, conform practica curentă SR EN 12845): pentru Q = 5,83 l/s și viteza adoptată v = 2,5 m/s, secțiunea necesară:

**A = Q/v = 0,00583/2,5 = 0,00233 m² → D = √(4×A/π) = √(4×0,00233/3,1416) ≈ 0,0545 m ≈ 54,5 mm**

Se adoptă conductă **DN65** (diametru interior orientativ ~68-70 mm, secțiune ~0,0037 m², viteză rezultată efectiv ≈ 1,58 m/s), cu marjă confortabilă sub limita de 3 m/s, pentru a limita pierderile de sarcină pe traseul de la grupul de pompare la duze. Presiunea necesară la duze se confirmă din fișa tehnică a producătorului duzelor (funcție de debitul unitar și de unghiul de pulverizare adoptat în planul de acoperire), la care se adaugă pierderile de sarcină pe rețea (calculate analog metodologiei de la §PTh-I.4.2) și diferența de cotă până la punctul cel mai înalt al rețelei (duzele montate pe generatoarea superioară a rezervorului) — suma acestor termeni constituie presiunea de refulare necesară la pompa principală PSI (D17).

### PTh-I.4.11. Bilanțul hidraulic total PSI și rezerva de apă

Debitul de vârf de proiectare al grupului de pompare PSI, pentru scenariul cel mai defavorabil (funcționare simultană a instalației de răcire și a unui hidrant activ, conform D.T.A.C. §7.8):

**Q_total = Q_deluge + Q_hidrant = 5,83 l/s + 5,0 l/s = 10,83 l/s ≈ 39 mc/h**

(coerent cu ordinul de mărime „11-12 l/s (≈40-43 mc/h)" stabilit la D.T.A.C. §7.8, ușor sub acesta datorită adoptării, la breviarul de execuție, a limitei inferioare a intervalului de debit deluge — pompa principală se selectează, în orice caz, la punctul de funcționare care acoperă valoarea superioară a intervalului D.T.A.C., pentru marjă de proiectare).

**Rezerva de apă necesară** pentru 60 minute de funcționare simultană (D.T.A.C. §7.3, §7.8):

**V_rezervă = Q_total × 60 min = 10,83 l/s × 3.600 s = 39.000 l ≈ 39 mc**

Valoare care confirmă și detaliază la nivel de execuție baza minimă de 25 mc + rezerva hidranților stabilită orientativ la D.T.A.C. §7.4 — rezervorul de apă dedicat PSI (D17, poz. 1) se dimensionează, la faza P.Th., la **minimum 39-40 mc**, cu marja de proiectare aplicabilă (evaporare, nivel mort al rezervorului, eventuală rezervă suplimentară cerută de avizatorul ISU pe baza scenariului de securitate la incendiu).

### PTh-I.4.12. Verificarea NPSH a grupului de pompare PSI

Similar metodologiei de la §PTh-I.4.3, dar aplicată apei (fluid convențional, fără particularitatea presiunii de saturație a GPL): NPSH disponibil al pompelor PSI (D17) se calculează cu formula standard **NPSH_disponibil = (P_atm − P_vapori,apă)/(ρ_apă×g) + z − h_f,aspirație**, unde P_atm este presiunea atmosferică, P_vapori,apă presiunea de vapori a apei la temperatura de exploatare (valoare mică la temperaturi uzuale, termen practic neglijabil), z diferența de cotă rezervor de apă-ax pompă, iar h_f,aspirație pierderea de sarcină pe conducta de aspirație. Rezervorul de apă dedicat (D17, poz. 1) se amplasează, conform practica uzuală de proiectare a stațiilor de pompare PSI, cu nivelul minim de apă suficient de ridicat față de axul pompelor pentru a asigura NPSH disponibil confortabil peste NPSH necesar declarat de producătorul pompelor selectate, verificare care se confirmă la execuție cu fișele tehnice efective ale echipamentelor contractate.

### PTh-I.4.13. Dimensionarea circuitelor electrice și verificarea căderii de tensiune

Secțiunea cablurilor de alimentare a receptoarelor din zona Ex (motor pompă tehnologică, iluminat platformă, detectoare, grup de pompare PSI) se stabilește din condiția de curent admisibil (funcție de puterea receptorului și de modul de pozare, NTE 007/08/00) și din condiția de **cădere de tensiune maximă admisă**, limitată uzual la 3% pentru circuite de forță și 5% pentru circuite de iluminat (I7/2011), conform D.T.A.C. §4.7. Pentru motorul pompei tehnologice (putere orientativă câțiva kW, funcție de debitul/presiunea pompei selectate), exemplul de verificare la o lungime de traseu de 25 m între TGD (amplasat în afara zonei Ex) și motorul pompei, cu secțiune adoptată de cablu conform tabelele de ampacitate, confirmă respectarea pragului de 3% — calculul se repetă analog pentru fiecare receptor major, cu lungimile reale rezultate din planul de amplasament definitiv. Circuitele critice de siguranță (detecție gaz/incendiu, ESD, iluminat de siguranță, grup de pompare PSI) se dimensionează cu marjă suplimentară și, unde normativul o cere, cu cablu rezistent la foc, pentru a asigura funcționarea acestor sisteme chiar pe durata inițială a unui eveniment de incendiu.

**Verificarea curentului de scurtcircuit** la tabloul general (TGD) se realizează conform metodologia IEC 60909, pe baza puterii de scurtcircuit disponibile la punctul de racordare la rețeaua de distribuție locală (valoare comunicată de operatorul de distribuție prin avizul tehnic de racordare) — protecțiile (întreruptoare/sigurante) de pe fiecare circuit se selectează cu putere de rupere superioară curentului de scurtcircuit maxim calculat în punctul respectiv, cu verificarea selectivității între protecția generală și protecțiile circuitelor terminale, astfel încât un defect pe un singur receptor (de exemplu motorul pompei) să declanșeze doar protecția dedicată a acelui circuit, fără a întrerupe alimentarea circuitelor critice de siguranță (ESD, detecție).

### PTh-I.4.14. Confirmarea zonării ATEX cu parametrii reali de execuție

Zonarea ATEX orientativă stabilită la D.T.A.C. §3.3 (raze pe surse de degajare, grad de ventilare VH cu disponibilitate bună) se **confirmă și, unde este necesar, se ajustează** la faza P.Th. pe baza configurației reale rezultate din proiectul de execuție: poziția efectivă a fiecărei armături, distanța reală față de limita de proprietate (D.T.A.C. §3.6), prezența sau absența unor obstacole la ventilarea naturală introduse ulterior stabilirii amplasamentului (garduri, copertine, construcții vecine, D.T.A.C. §3.7). Confirmarea se materializează prin actualizarea **Documentului privind Protecția la Explozie (DPE)**, elaborat/actualizat de specialistul atestat conform HG 1058/2006, care documentează la faza de execuție finală: zonele clasificate cu razele confirmate, lista completă a echipamentelor instalate cu certificarea Ex corespunzătoare fiecărei zone (verificare de concordanță plăcuță-zonă, conform §PTh-I.7), și măsurile organizatorice implementate efectiv pe șantier și în exploatare.

---

## PTh-I.5. Fișe tehnice complete de echipament

Fișele de mai jos sintetizează parametrii pe care caietul de sarcini de achiziție îi impune fiecărui echipament major, coerenți cu breviarul de calcul de la §PTh-I.4 și cu soluțiile de principiu stabilite la D.T.A.C.

### PTh-I.5.1. Rezervorul GPL

| Parametru | Cerință |
|---|---|
| Volum geometric | 4,85 mc |
| Material manta | oțel P265GH/P355GH sau echivalent, certificat SR EN 10204 tip 3.2 |
| Presiune de calcul (PS) | 17,65 bar |
| Presiune de probă hidraulică | 1,43×PS ≈ 25,2 bar, certificat de probă atașat |
| Certificare | ISCIR PT C7, placă de timbru, dosar tehnic complet |
| Grad de umplere maxim | 85%, cu limitator automat integrat |
| Armături incluse | multivalvă (robinet lichid + supapă exces debit, robinet gazos, purjare, indicator nivel), 2 supape de siguranță redundante, manometru, termometru |
| Finisaj exterior | vopsea reflectorizantă, sistem grund+intermediar+finisaj, compatibil mediu exterior |
| Documente la livrare | certificat ISCIR, certificate materiale (3.1/3.2), plan de manevră/ridicare, manual de exploatare |

### PTh-I.5.2. Grupul de pompare

| Parametru | Cerință |
|---|---|
| Tip | centrifugă sau cu palete, antiex |
| Certificare Ex | Ex db IIB T4, conform HG 245/2016 |
| Debit | 40-60 l/min |
| Protecții incluse | by-pass intern, protecție la mersul în gol |
| NPSH necesar | declarat de producător — confirmă condiția de la §PTh-I.4.3 |
| Materiale în contact cu GPL | compatibile conform D.T.A.C. §2.10 |
| Documente la livrare | fișă tehnică completă (curbe pompă, NPSHr), certificat Ex, manual de mentenanță |

### PTh-I.5.3. Dispenserul și cuplajul breakaway

| Parametru | Cerință |
|---|---|
| Certificare | ATEX integral (dispenser + debitmetru + toate componentele electrice) |
| Debitmetru | volumetric, clasă de precizie conformă cu metrologia legală pentru facturare |
| Furtun | cu conductor de egalizare înglobat, lungime conform plan de amplasament |
| Breakaway | forța de separare declarată de producător, cu două valve autoetanșante interne |
| Pistol | etanș, fără eliberare de produs la deconectare accidentală |
| Documente la livrare | certificat ATEX, fișă tehnică breakaway (forța de separare, procedura de verificare), certificat metrologic debitmetru |

### PTh-I.5.4. Detectoarele de gaz

| Parametru | Cerință |
|---|---|
| Tehnologie | infraroșu punctual (NDIR), certificat Ex ia/ib |
| Prag de avertizare | 10% LIE |
| Prag de alarmă/ESD | 20% LIE |
| Amplasare | 10-30 cm de sol, minim 3-4 puncte conform D.T.A.C. §6.1 |
| Calibrare | cu gaz etalon, semestrial |
| Comunicație | cablare de securitate intrinsecă, conform SR EN 60079-25 |
| Documente la livrare | certificat Ex, fișă de calibrare din fabrică, manual de calibrare periodică |

### PTh-I.5.5. Detectoarele de flacără și termocuplele

| Parametru | Cerință |
|---|---|
| Tip detector flacără | UV/IR combinat, logică de confirmare pe ambele spectre |
| Certificare | Ex, conform zona de montaj |
| Termocuple | montate pe manta, fără perforare fără avizul producătorului rezervorului |
| Legătură cu ESD/deluge | declanșare automată la prag critic de temperatură, conform D.T.A.C. §7.7 |
| Documente la livrare | certificat Ex, fișă tehnică prag de declanșare, protocol de testare funcțională |

### PTh-I.5.6. PLC/panoul de oprire de urgență (ESD)

| Parametru | Cerință |
|---|---|
| Principiu | fail-safe, toate elementele de acționare normal închise (NÎ) în lipsă de energie/comandă |
| Surse de declanșare | automat (gaz 20% LIE), automat (incendiu/temperatură critică), manual (butoane Ex d) |
| Acțiuni la declanșare | oprire pompă, închidere robinete de sectorizare, oprire dispenser, semnalizare, deconectare receptoare neesențiale din zona Ex |
| Repunere | exclusiv manuală, de la punct de comandă dedicat |
| Alimentare | circuit dedicat, sursă neîntreruptibilă cu autonomie minimă 1 oră |
| Documente la livrare | schema logică de acționare, protocol de testare funcțională, certificat Ex pentru componentele din zona clasificată |

### PTh-I.5.7. Tabloul electric general (TGD)

| Parametru | Cerință |
|---|---|
| Amplasare | în afara oricărei zone Ex |
| Schemă de legare la pământ | TN-S |
| Protecții | RCD 30 mA pe prizele din cabină, protecții de circuit selective conform §PTh-I.4.13 |
| Circuite dedicate | ESD, detecție gaz/incendiu, iluminat de siguranță, grup pompare PSI |
| SPD | cascadă coordonată tip 1+2/2/3, conform §PTh-I.4.13 |
| Documente la livrare | schema electrică de execuție, buletin de verificare SR EN 61439, certificat de conformitate ansamblu |

### PTh-I.5.8. Grupul de pompare PSI

| Parametru | Cerință |
|---|---|
| Componență | pompă principală, pompă pilot (jockey), pompă de rezervă |
| Debit/presiune principal | conform §PTh-I.4.10/I.4.11 (debit de vârf ≥ 10,83 l/s la presiunea de proiect confirmată) |
| Comutare automată | preluare automată a sarcinii de către pompa de rezervă la defect al pompei principale |
| Alimentare electrică | circuit prioritar, cu sursă de rezervă |
| Documente la livrare | curbele pompelor, protocol de testare a comutării automate, certificat de serviciu de incendiu (dacă aplicabil) |

### PTh-I.5.9. Separatorul de hidrocarburi

| Parametru | Cerință |
|---|---|
| Clasă | clasa I (coalescent) |
| Concentrație reziduală la ieșire | sub 5 mg/l |
| Debit de proiect | conform apele pluviale colectate de pe platforma tehnologică |
| Documente la livrare | certificat de conformitate, fișă tehnică debit/concentrație, manual de vidanjare periodică |

---

## PTh-I.6. Caiet de sarcini pentru montaj

### PTh-I.6.1. Materiale

Toate materialele metalice în contact direct sau indirect cu GPL (manta rezervor, conducte, armături, flanșe) se recepționează pe șantier **exclusiv** cu certificate de inspecție conform SR EN 10204 (tip 3.1 minim, 3.2 pentru componentele critice ale recipientului sub presiune), verificate de reprezentantul calității înainte de punerea în operă — un material fără certificat corespunzător se respinge, indiferent de aspectul vizual conform. Garniturile, membranele armăturilor și furtunurile se recepționează cu fișa tehnică a producătorului care confirmă compatibilitatea chimică declarată cu hidrocarburile lichefiate (NBR sau FKM/Viton, D.T.A.C. §2.10) — nu se admite substituirea cu elastomeri de catalog generic (cauciuc natural, EPDM) nici temporar, nici la piese de schimb ulterioare.

### PTh-I.6.2. Sudarea și controlul nedistructiv

Sudarea conductelor și a racordurilor se execută exclusiv de sudori calificați conform proceduri de sudare (WPS) calificate prin fișe de calificare a procedurii (PQR), conform SR EN ISO 3834, cu evidența calificărilor individuale a fiecărui sudor păstrată la dosarul de execuție. Toate sudurile de pe circuitele sub presiune GPL se supun controlului nedistructiv conform planul de control de calitate: **examinare vizuală 100%**, **radiografiere sau examinare cu ultrasunete** pe procentul de suduri stabilit prin proiectul de execuție (uzual 100% pe sudurile circulare/longitudinale critice ale tronsoanelor de fază lichidă la presiune ridicată, procent redus, dar nenul, pe restul rețelei, conform practica ISCIR pentru conducte de acest tip), cu buletine de examinare atașate la cartea construcției. Sudurile care nu întrunesc criteriile de acceptare se repară conform procedură calificată de reparare și se re-examinează integral, nu doar în zona reparată.

### PTh-I.6.3. Tratamentul termic și protecția anticorozivă

Dacă proiectul de execuție/fișa tehnologică a producătorului impune tratament termic de detensionare pe anumite suduri (funcție de grosimea peretelui și de calitatea oțelului, conform prevederile aplicabile recipientelor sub presiune și conductelor industriale), acesta se execută conform diagrama de tratament calificată, cu înregistrare continuă a temperaturii pe durata ciclului, atașată la dosarul de sudură. Protecția anticorozivă a elementelor metalice exterioare (skid, conducte exterioare, structuri suport, stâlpi de paratrăsnet/iluminat) se execută în sistem complet (grund + strat intermediar + strat de finisaj), cu verificarea grosimii uscate a filmului la fiecare strat, conform fișa tehnică a sistemului de vopsire adoptat — punctele de legare electrică (priza de pământ, egalizarea) se curăță local și se refac ulterior fără a acoperi cu vopsea zonele de contact electric.

### PTh-I.6.4. Montajul electric în zone Ex

Toate echipamentele electrice montate în zonele clasificate se instalează cu verificarea prealabilă, la recepția pe șantier, a plăcuței de marcaj Ex și a corespondenței acesteia cu zona de destinație din proiect (D.T.A.C. §3.5) — orice echipament fără marcaj corespunzător se respinge la recepție, nu se remediază pe șantier. Presetupele Ex cu barieră de etanșare se montează conform cuplul de strângere din fișa producătorului, verificat cu cheie dinamometrică; cablurile armate se pozează respectând razele minime de curbură declarate de producătorul de cablu. Circuitele de securitate intrinsecă se separă fizic de circuitele de energie pe tot traseul, inclusiv în interiorul cutiilor de joncțiune (compartimente separate sau cutii dedicate distincte).

### PTh-I.6.5. Controlul de calitate pe fază

Fiecare activitate de montaj majoră (fundații/ancorare rezervor, sudare conducte, montaj armături, instalație electrică Ex, priză de pământ/egalizare, instalație de detecție/ESD, instalație PSI, cuvă de retenție/impermeabilizări) se supune verificării de calitate pe fază, conform Planul de Control al Calității de la §PTh-I.9, cu consemnare în registrul de șantier și, la fazele determinante, cu convocarea proiectantului/beneficiarului/dirigintelui de șantier și, unde aplicabil, a inspectorului ISCIR.

---

## PTh-I.7. Probe și verificări la punerea în funcțiune (PIF)

Tabelul de mai jos sintetizează probele obligatorii, cu parametru, valoare/prag, durată și criteriu de admisie, completând succesiunea generală de PIF stabilită la D.T.A.C. §15.

| Instalație | Probă | Valoare/prag | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Recipient sub presiune | probă hidraulică | 1,43×PS ≈ 25,2 bar | conform procedură ISCIR (menținere + inspecție) | fără deformații permanente, fără scurgeri, fără scădere de presiune în afara toleranței |
| Rețea de conducte | probă de presiune pe tronson | conform presiunea de calcul a tronsonului (§PTh-I.4.2) | conform procedură | fără scăderi de presiune, fără scurgeri la îmbinări |
| Suduri | control nedistructiv | conform planul de control (§PTh-I.6.2) | — | conform criteriile de acceptare ale standardului aplicat |
| Priză de pământ generală | măsurare rezistență de dispersie | ≤ 4 Ω | instantaneu | valoare măsurată ≤ prag |
| Priză de pământ paratrăsnet | măsurare rezistență de dispersie | ≤ 10 Ω | instantaneu | valoare măsurată ≤ prag |
| Egalizare de potențial | continuitate pe fiecare discontinuitate | < 10⁶ Ω | instantaneu | fiecare punct verificat conform |
| Continuitate autocisternă-pământ (test simulat) | rezistență de contact | < 10 Ω | instantaneu | conform D.T.A.C. §5.2 |
| Instalație electrică generală | izolație cabluri, funcționare RCD | conform I7/2011 | conform procedură | fără defect de izolație, RCD declanșează la 30 mA |
| Certificare Ex | verificare plăcuță-zonă pe fiecare echipament din arie clasificată | 100% verificat | — | concordanță integrală, fără excepție |
| Detecție gaz | calibrare cu gaz etalon, verificare praguri | 10% LIE (avertizare), 20% LIE (alarmă+ESD) | pe fiecare detector | declanșare la pragurile calibrate, cu marjă acceptată |
| Detecție incendiu | test funcțional UV/IR + termocuple | simulare semnal | pe fiecare detector | declanșare corectă a lanțului detecție→centrală→acțiune |
| ESD | test complet secvență | simulare (gaz, incendiu, manual) | pe fiecare sursă de declanșare | oprire pompă+închidere robinete+oprire dispenser+semnalizare+deconectare receptoare neesențiale, toate confirmate |
| Limitator de nivel 85% | verificare funcțională oprire transvazare | 85% ± toleranța producătorului | pe durata unei transvazări de test | blocare automată confirmată |
| Supape de siguranță | verificare concordanță plăcuță-dosar ISCIR | conform §PTh-I.4.4 | — | concordanță integrală pe ambele supape |
| Breakaway | verificare vizuală integritate + procedură producător | conform fișă tehnică | — | fără deteriorare, valve autoetanșante funcționale |
| Instalație deluge | test hidraulic la debit nominal (comandă manuală) | ≥ 10 l/min·mp pe suprafața de calcul | conform procedură | debit/presiune confirmate la duzele cele mai îndepărtate |
| Declanșare automată deluge | simulare semnal termocuple/flacără | — | — | declanșare confirmată, fără descărcare reală de agent |
| Grup de pompare PSI | test individual + comutare automată pe defect | debit/presiune de proiect (§PTh-I.4.10/I.4.11) | conform procedură | fiecare pompă atinge punctul de funcționare, comutare automată confirmată |
| Hidranți | test de debit și racord | ≥ 5 l/s, racord tip B compatibil | conform procedură | debit confirmat, racord funcțional |
| Iluminat de siguranță | test autonomie | minim 1 oră | 1 oră continuă | funcționare pe toată durata testată |
| Cuvă de retenție/bazine | probă de etanșeitate cu apă | fără scădere de nivel | minimum 24 h | fără scădere vizibilă de nivel |
| Separator de hidrocarburi | probă de funcționare | debit de proiect | conform procedură | concentrație reziduală sub prag declarat |
| Instruire personal | verificare cunoștințe proceduri | conform planul de instruire | — | confirmare scrisă a instruirii, inclusiv secvența de descărcare autocisternă |

---

## PTh-I.8. Regimul ISCIR aplicabil

### PTh-I.8.1. Recipientul sub presiune — PT C7

Rezervorul, ca recipient de gaze petroliere lichefiate, se supune integral prescripției tehnice **ISCIR PT C7**: proiectare, construcție, montare, verificări la punerea în funcțiune și verificări tehnice periodice (VTP) pe toată durata de exploatare. Verificarea la punerea în funcțiune include proba de presiune hidraulică (§PTh-I.4.4, §PTh-I.7) și verificarea integrală a documentației tehnice (dosar tehnic al producătorului, certificate de material, buletine de examinare a sudurilor din fabrică), efectuată de personal autorizat ISCIR sau de organism abilitat, cu proces-verbal păstrat în cartea construcției.

### PTh-I.8.2. Autorizarea RSVTI și a personalului de deservire — PT CR4

Conform **ISCIR PT CR4**, deținătorul instalației desemnează un **Responsabil cu Supravegherea și Verificarea Tehnică a Instalațiilor (RSVTI)**, autorizat ISCIR, care ține evidența scadențelor de verificare periodică a recipientului și a celorlalte echipamente sub incidența ISCIR (dacă e cazul, cilindrii de agent al eventualelor sisteme auxiliare sub presiune) și organizează verificările la termen. Personalul de deservire a instalației (operatorii care efectuează manevre de transvazare, descărcare autocisternă) se autorizează conform cerințele PT CR4, cu instruire specifică și examinare periodică de reautorizare.

### PTh-I.8.3. Scadențarul verificărilor tehnice periodice

| Componentă | Tip verificare | Periodicitate orientativă |
|---|---|---|
| Recipient sub presiune | verificare exterioară | anuală |
| Recipient sub presiune | verificare interioară + probă de presiune | conform scadențar stabilit prin cartea recipientului (interval mai lung, funcție de prescripția tehnică și de starea constatată la verificările precedente) |
| Supape de siguranță | verificare/resetare/recalibrare | anuală sau conform specificația producătorului |
| Instalație electrică antiex | verificare completă (priză pământ, egalizare, integritate carcase Ex) | anuală |
| Senzori de detecție gaz | calibrare cu gaz etalon | semestrială |
| Detectoare de flacără/termocuple | test funcțional | conform planul de mentenanță |
| Sistem ESD | test funcțional complet | trimestrial sau conform planul de mentenanță |
| Grup de pompare PSI | test funcțional | conform planul de mentenanță (recomandat lunar pentru pornire de probă) |

### PTh-I.8.4. Autorizarea de funcționare și cartea recipientului

Punerea în funcțiune a rezervorului, ca ultimă etapă a regimului ISCIR, se finalizează prin **autorizarea de funcționare** emisă în urma verificărilor descrise mai sus, condiție obligatorie și necesară (alături de avizul/autorizația ISU și de eventuala autorizație de mediu, D.T.A.C. §11) pentru exploatarea comercială a stației. Cartea recipientului, actualizată cu toate procesele-verbale de verificare, se păstrează alături de cartea tehnică a construcției pe toată durata de exploatare, revizuită la fiecare verificare periodică.

---

## PTh-I.9. Plan de Control al Calității (PCC) — faze determinante

| Fază determinantă | Verificare | Convocare |
|---|---|---|
| Recepția materialelor (oțel conducte/armături, garnituri) | certificate SR EN 10204, fișe compatibilitate elastomeri | responsabil calitate/proiectant |
| Fundații și ancorare rezervor | nivelare, cuplu buloane, poziționare conform plan | proiectant/diriginte de șantier |
| Sudarea conductelor | calificare sudor/procedură, control nedistructiv | responsabil calitate, conform planul de control |
| Proba de presiune (recipient, rețea conducte) | conform §PTh-I.7 | ISCIR (recipient), proiectant/diriginte (rețea) |
| Rețeaua de egalizare de potențial | continuitate integrală, înainte de proba de presiune | proiectant electric |
| Priza de pământ (înainte de acoperire) | continuitate, rezistență de dispersie | proiectant electric/diriginte de șantier |
| Impermeabilizare cuvă de retenție/bazine | probă cu apă | proiectant/diriginte de șantier |
| Certificare Ex a echipamentelor montate | concordanță plăcuță-zonă, 100% | proiectant ATEX/specialist DPE |
| Testarea funcțională ESD/detecție/deluge | conform §PTh-I.7 | proiectant, beneficiar, ISU (dacă solicită) |
| PIF general | succesiunea completă D.T.A.C. §15 + probele P.Th. | toate părțile implicate + autorități avizatoare |

Fiecare fază determinantă se consemnează în registrul de șantier, cu procesul-verbal de fază semnat de toate părțile convocate; execuția nu avansează la faza următoare fără finalizarea conformă a fazei determinante precedente.

---

## PTh-I.10. Instruirea personalului, exploatarea și mentenanța post-PIF

Instruirea personalului de exploatare, deja menționată la succesiunea de PIF (D.T.A.C. §15, pas 7), se detaliază la faza P.Th. printr-un **program de instruire structurat**, care cuprinde: procedurile de operare normală (transvazare, alimentare auto), secvența obligatorie de descărcare a autocisternei (D.T.A.C. §5.2), procedurile de urgență (acționare ESD, utilizarea stingătoarelor diferențiate pe amplasament, planul de intervenție), și noțiunile de bază privind riscurile specifice GPL (D.T.A.C. §1.2) necesare pentru ca personalul să înțeleagă *de ce* fiecare procedură este structurată astfel, nu doar *cum* se execută mecanic. Instruirea se finalizează cu o verificare a cunoștințelor, consemnată în dosarul de PIF (§PTh-I.7).

Mentenanța post-PIF urmează scadențarul stabilit la §PTh-I.8.3 și la D.T.A.C. §14, cu toate rezultatele verificărilor periodice consemnate într-un **registru de exploatare/mentenanță**, păstrat alături de cartea construcției și revizuit la fiecare control ISU/ISCIR. Orice modificare a instalației tehnologice sau a modului de exploatare, ulterioară PIF, impune actualizarea corespunzătoare a Documentului privind Protecția la Explozie (DPE, §PTh-I.4.14) și, unde afectează recipientul sub presiune sau armăturile de siguranță ale acestuia, parcurgerea procedurii ISCIR de modificare/reparație aplicabile.

---

## PTh-I.11. Concluzii și verificare tehnică de proiect

Prezentul supliment de fază P.Th. detaliază la nivel de execuție toate instalațiile conexe rezervorului GPL de 4,85 mc/PS 17,65 bar stabilit la faza D.T.A.C.: **rețeaua de conducte și armături**, dimensionată pe fiecare tronson real cu verificarea vitezelor, a pierderilor de sarcină și a dilatării termice; **grupul de pompare**, cu verificarea NPSH specifică particularității GPL stocat la propria presiune de saturație; **instalația electrică antiex**, cu dimensionarea completă a prizei de pământ, a paratrăsnetului la nivel de protecție I și a cascadei de descărcătoare de supratensiune; **egalizarea de potențial și antistatică**, cu verificarea de continuitate pe fiecare discontinuitate mecanică identificată; **detecția de gaze și incendiu**, cu poziționarea confirmată la sol și pragurile de acționare calibrate; **sistemul de oprire de urgență (ESD)**, cu protocolul complet de testare a lanțului fail-safe; **instalația PSI**, cu bilanțul hidraulic complet al scenariului de răcire simultană cu funcționarea unui hidrant, rezerva de apă dimensionată corespunzător și testarea redundanței celor trei pompe; și **protecția mediului**, cu impermeabilizările verificate prin probă și separatorul de hidrocarburi confirmat funcțional.

**Verificarea tehnică de proiect** (Legea 10/1995) se efectuează, la faza P.Th., de aceiași verificatori atestați MDLPA menționați la faza D.T.A.C. — **Is** (instalații sanitare, alimentare cu apă de incendiu), **It** (instalații tehnologice GPL, ventilare, presiuni), **Ie** (instalații electrice, ATEX, priză de pământ, paratrăsnet, detecție, ESD) — la nivelul de detaliere corespunzător fazei de execuție, cu referatele de verificare actualizate pe baza breviarelor complete de la §PTh-I.4 și a fișelor tehnice de echipament de la §PTh-I.5. La dosarul de verificare se anexează: referatele de verificare pe fiecare specialitate; **scenariul de securitate la incendiu actualizat** cu parametrii de execuție confirmați; **Documentul privind Protecția la Explozie (DPE)** actualizat conform §PTh-I.4.14; și **dosarul tehnic ISCIR complet al recipientului sub presiune**, cu toate procesele-verbale de verificare la punerea în funcțiune. Este obligatorie **corelarea deplină** a prezentului supliment de instalații cu suplimentele P.Th. de arhitectură și de rezistență ale aceluiași obiectiv, precum și cu cartea tehnică a construcției, capitolul „instalații" — nicio piesă a documentației de execuție nu poate fi validată izolat, întrucât siguranța reală a stației, la fel ca la faza D.T.A.C., rezultă din funcționarea coerentă a tuturor specialităților ca un sistem unitar.
