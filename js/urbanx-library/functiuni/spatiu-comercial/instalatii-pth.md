# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Supermarket alimentar — sală de vânzare ~1.500 mp + depozit + camere frigorifice

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 anexa 8 și Legii 50/1991 republicată, Anexa 1) pentru memoriul de instalații al obiectivului **supermarket alimentar cu regim de înălțime P (+ mezanin tehnic)**, elaborat pentru gabaritul de referință deja stabilit la faza DTAC (`instalatii.md`): sală de vânzare **~1.500 mp**, depozit **~320 mp**, camere frigorifice pozitive și negative, spații de procesare/pregătire (carne, pește, lactate, patiserie), back-office și suprafață construită desfășurată **Acd ~2.350 mp**. Documentul dezvoltă la nivel de execuție tot ceea ce faza DTAC a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă, **fără a relua** breviarele DTAC — le detaliază, le duce la nivel de tronson/nod/circuit/echipament și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare nod-cu-nod, fișe tehnice de echipament, caiet de sarcini de montaj, protocoale de punere în funcțiune (PIF) și Plan de Control al Calității (PCC).

Ipoteza funcțională se menține **identică** cu DTAC și cu firul roșu deja anunțat la cap. 1.1 și 1.5 al memoriului DTAC: instalația frigorifică comercială — nu iluminatul, nu climatizarea — este elementul central în jurul căruia se structurează dimensionarea instalațiilor termice (prin recuperarea de căldură, DTAC cap. 4.5), electrice (grup electrogen dedicat, DTAC cap. 7.4) și a strategiei energetice (DTAC cap. 11). Suplimentul PTh păstrează această hiererhie de proiectare la fiecare capitol: instalația frigorifică (PTh-I.2.3, PTh-I.3.8, PTh-I.4) este tratată cu același nivel de exhaustivitate ca instalațiile de securitate la incendiu, nu ca o "listă de echipamente" auxiliară. Orice modificare a ipotezei funcționale de bază (schimbarea profilului de marfă către un format nealimentar, eliminarea zonelor de procesare, creșterea semnificativă a densității de stocare pe rafturi în depozit peste 4,0 m înălțime) impune reluarea integrală a dimensionării frigorifice și PSI de la faza PTh, exact conform semnalului deja transmis în DTAC (cap. 6.1, 9.1).

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, de principiu, bilanțuri globale | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate |
| Breviar hidraulic | debite globale, un singur nod critic | calcul nod cu nod (Hazen-Williams) pe toate tronsoanele — apă, sprinkler, hidranți, canalizare, pluvial |
| Breviar frigorific | sarcină globală pe palier (MT/LT), un singur bilanț de recuperare | dimensionare pe fiecare compresor din rack, verificarea desuperheat-ului, redundanță N-1 |
| Breviar termic/electric | necesar global (kW, kVA) | dimensionare completă pe fiecare circuit/tronson, verificare cădere de tensiune, selectivitate |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație |
| Montaj | principii generale | tehnologie, succesiune, susțineri, izolații, treceri la foc, brazarea și testarea circuitelor de agent frigorific |
| PIF | menționată | protocoale de echilibrare, reglaj, programare BMS/IDSAI, primă pornire rack frigorific, validare HACCP |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |
| Iluminat | niveluri globale + un exemplu de calcul (sala, general) | calcul complet metoda flux luminos pe fiecare zonă, inclusiv luminotehnica de accent a raioanelor și a vitrinelor |
| PSI | dimensionare preliminară globală | breviar hidraulic complet sprinkler/hidranți pe clasă de risc (OH3 sală / HHS depozit), calcul detaliat al penei de fum, calcul reumplere rezervă |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC (I9-2022, I5-2010, I13-2015, I7-2011, SR EN 378-1…4, Reg. UE 517/2014, Reg. CE 852/2004, P118-1/2/3, Legea 372/2005): **SR EN 12845** (anexa de calcul hidraulic sprinkler și tabelele de clasificare a riscului de depozitare), **SR EN 12259** (componente sprinkler — capete, ACS, alarme hidraulice), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria pentru componentele IDSAI, inclusiv partea 20 — detecție aspirativă), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare și niveluri), **SR EN 12464-1** (iluminat locuri de muncă interioare — verificarea Ra/UGR pe zone), **SR EN 62305-1…4** (protecția la trăsnet, execuție SPD/coborâri), **SR EN 50131** (seria pentru sisteme de alarmă la efracție — control acces, integrare cu IDSAI), **SR EN 62676** (sisteme de videosupraveghere pentru aplicații de securitate), **SR EN 50173** (cablare structurată), **NP 086** (proiectarea instalațiilor de stingere cu apă), **C56** (verificarea calității lucrărilor de instalații), **SR EN 12056-2** (canalizare — metoda debitului de calcul pe unități de descărcare, verificare grad de umplere), **SR EN 1825-2** (separatoare de grăsimi — instalare, exploatare, întreținere).

Se adoptă, ca principiu de proiectare la execuție, cea mai recentă ediție în vigoare a fiecărui normativ; unde cerințele DTAC și PTh diverg (de exemplu, o dimensionare mai precisă la PTh care rezultă superioară estimării preliminare din DTAC), se aplică valoarea PTh, ca fiind cea verificată la nivel de execuție.

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema rețelei de sprinklere — sala de vânzare (OH3) și depozitul (HHS)

Rețeaua de sprinklere protejează integral sala de vânzare (1.500 mp) și depozitul (320 mp), compartimentate hidraulic în **2 zone de control**, fiecare cu **aparat de control și semnalizare (ACS) propriu**, robinet de secționare cu supraveghere de poziție (tamper) și clopot de alarmă hidraulic — configurație care permite izolarea unei zone pentru mentenanță fără a întrerupe protecția celeilalte.

**Traseul principal (schema coloană):**

```
Rezervor incendiu ~250 mc ─► Cameră pompe (P.principală 30 kW + P.Diesel rezervă + P.jockey)
        ─► Colector de refulare DN 125 ─┬─► ACS Zona 1 (Sala de vânzare, OH3, 1.500 mp) ─► rețea plafon Zona 1
                                        └─► ACS Zona 2 (Depozit, HHS, 320 mp) ─► rețea plafon Zona 2
```

**Rețeaua de plafon Zona 1 — sala de vânzare (clasă OH3, densitate d = 5 mm/min, K80 — 80 l/min·bar⁰·⁵, interax capete 4,0×4,0 m):**

| Nod | Element | Ø conductă | Nr. capete deservite | Debit tronson (l/s) |
|---|---|---|---|---|
| N1 | Cap sprinkler terminal | DN 20 | 1 | 0,73 |
| N2 | Branch line, 2 capete | DN 25 | 2 | 1,46 |
| N3 | Branch line, 4 capete | DN 32 | 4 | 2,92 |
| N4 | Branch line, 6 capete | DN 40 | 6 | 4,38 |
| N5 | Cross-main, alimentare 2 branch lines | DN 65 | 12 | 8,77 |
| N6 | Cross-main, aria de operare completă (≈16 capete la interax 4,0×4,0 m ≈ 260 mp) | DN 80 | 16 | 21,7 |
| N7 | Riser Zona 1 → ACS | DN 100 | — (tot. zonă) | 21,7 |

Debitul de 21,7 l/s este identic cu valoarea de sinteză din DTAC (cap. 9.2: d×A_op/60 = 5×260/60 = 21,7 l/s) — verificare de coerență confirmată între metoda simplificată (DTAC) și calculul nod-cu-nod (PTh, detaliat la PTh-I.3.1).

**Rețeaua de plafon Zona 2 — depozitul (clasă HHS, rafturi paletizate ≤4,0 m, densitate d = 10 mm/min pe aria de operare A_op = 260 mp):** configurație de tip cross-main dublu (grilă 3,5×3,5 m), care acoperă practic întreaga amprentă a depozitului (260 mp din 320 mp totali — 81% din suprafață, restul fiind ocupat de accesele și de zona de recepție marfă, unde continuitatea acoperirii este asigurată prin capete suplimentare la periferie). Debitul de calcul, identic ca metodă cu breviarul de la PTh-I.3.2: **Q_dep = 10×260/60 = 43,3 l/s**.

**Conducta de alimentare din stație până la colectorul de refulare:** oțel negru vopsit, DN 125, cu robinet de reținere, manometru, racord de probă (drenaj de test 2"), toate conform SR EN 12845 cap. 13. **Debitul de calcul maxim al stației** (scenariu cel mai defavorabil, cu un singur focar activ la un moment dat, conform principiului SR EN 12845 — debitele Zonei 1 și Zonei 2 nu se cumulează între ele, ci se dimensionează pompa la valoarea superioară a celor două, majorată cu debitul hidranților interiori concomitent, PTh-I.3.1-PTh-I.3.2): **Q_pompă = max(21,7; 43,3) + 4,2 (hidranți) = 47,5 l/s**.

### PTh-I.2.2 Schema hidranților interiori și exteriori

**Hidranți interiori** — rețea inelară DN 65-80, cu **6 hidranți DN 25/52** echipați (cutii cu furtun semirigid 20-30 m, robinet, ajutaj), dispuși astfel încât orice punct al sălii de vânzare și al depozitului să fie atins de minim 2 jeturi:

| Hidrant | Poziție | Ø racord rețea | Debit adoptat |
|---|---|---|---|
| Hi-1 | Acces public, lângă intrarea principală | DN 65 | 2,1 l/s |
| Hi-2 | Colț sală, raion produse proaspete | DN 65 | 2,1 l/s |
| Hi-3 | Colț sală, zona case de marcat | DN 65 | 2,1 l/s |
| Hi-4 | Depozit, lângă rampa de recepție | DN 65 | 2,1 l/s |
| Hi-5 | Depozit, colț opus rampei | DN 65 | 2,1 l/s |
| Hi-6 | Zona tehnică/procesare (patiserie, tranșare) | DN 50 | 2,1 l/s |

Debit de calcul (2 jeturi simultane, cele mai defavorabile) = **4,2 l/s**; rețea inelară alimentată din colectorul de refulare al stației de pompare, cu vane de secționare între tronsoane.

**Hidranți exteriori** — inel exterior DN 100-150 îngropat sub adâncimea de îngheț (0,90-1,10 m), cu **2 hidranți supraterani DN 100**:

| Hidrant | Poziție | Distanță față de clădire |
|---|---|---|
| He-1 | Latură parcare/acces principal client | 12 m |
| He-2 | Latură curte tehnică/rampă marfă | 18 m |

Distanța dintre He-1 și He-2, măsurată pe conturul clădirii ≈ 95 m (< 100 m admis, DTAC cap. 9.3). Racord tip B pentru autospecialele ISU la ambii hidranți și la rezervorul de incendiu (PTh-I.4).

### PTh-I.2.3 Schema instalației frigorifice comerciale — rack booster CO₂, trasee MT/LT, recuperare

Această schemă este, prin analogie directă cu argumentul din DTAC cap. 6.1, **cea mai importantă schemă tehnologică a întregului supliment PTh** — celelalte scheme de execuție (electrică, PSI, curenți slabi) se subordonează, în priorități de alimentare și de mentenanță, acestei instalații.

```
Rack compresoare booster CO2 (4 MT + 2 LT) ─► Colector refulare
        ─► Schimbător desuperheat (recuperare căldură, cap. PTh-I.2.4 termic)
        ─► Gas cooler (acoperiș, răcit cu aer, ventilatoare EC)
        ─► Valvă de expansiune de înaltă presiune
        ├─► Distribuitor lichid MT ─► Vitrine multideck MT + camere pozitive ─► Colector aspirație MT ─► Compresoare MT
        └─► Distribuitor lichid LT ─► Vitrine congelate + camere negative ─► Colector aspirație LT ─► Compresoare LT (boost) ─► injecție în colectorul de aspirație MT
```

**Traseele de conductă de agent frigorific** (oțel fără sudură sau cupru dezoxidat rezistent la presiunile de lucru ale CO₂ transcritic — presiune de proiectare a circuitului de înaltă presiune ≥ 120 bar, semnificativ superioară presiunilor uzuale la agenții HFC clasici, cerință care condiționează selecția materialului și a tehnologiei de îmbinare, PTh-I.6.5): traseul principal de la rack la gas cooler (acoperiș) se pozează în ghenă tehnică dedicată, cu pantă spre rack pentru retur de ulei, izolat termic pe porțiunea de aspirație (prevenirea condensului și a pierderilor de capacitate frigorifică) și neizolat pe porțiunea de refulare de înaltă presiune (unde temperatura ridicată nu justifică izolarea, cu excepția porțiunilor accesibile personalului, unde se prevede protecție de contact).

| Tronson | Agent/fază | Ø conductă (orientativ) | Observație |
|---|---|---|---|
| Rack → schimbător desuperheat | vapori refulare, cald (80-100 °C) | DN 40 | izolat contra contactului accidental |
| Desuperheat → gas cooler | vapori/fluid supercritic | DN 40 | — |
| Gas cooler → distribuitor lichid | lichid/fluid de înaltă presiune | DN 32 | izolat anticondens parțial |
| Distribuitor → vitrine MT (per linie) | lichid → vaporizare | DN 15-20/linie | izolat anticondens |
| Vitrine MT → colector aspirație MT | vapori joasă presiune | DN 32-40 | izolat anticondens obligatoriu |
| Distribuitor → vitrine LT | lichid → vaporizare | DN 12-15/linie | izolat anticondens |
| Vitrine LT → compresoare boost (LT) | vapori foarte joasă presiune | DN 25-32 | izolat anticondens, grosime majorată |
| Boost LT → colector aspirație MT (injecție) | vapori intermediari | DN 32 | izolat anticondens |

**Camera tehnică a rack-ului** (PTh-I.4) este echipată, conform SR EN 378-3 și confirmării deja transmise în DTAC (cap. 6.3), cu **detector de CO₂** cu două praguri de alarmă (prag de avertizare și prag de evacuare) și **ventilare de avarie mecanică**, dimensionată pentru diluarea rapidă a unei scurgeri accidentale sub concentrația de prag; comanda ventilării de avarie este cablată direct de la detectorul de gaz, independent de BMS (principiu de siguranță identic celui aplicat la sistemul de detecție a incendiului, PTh-I.2.10 — funcțiile de siguranță nu se subordonează unui sistem de automatizare generalist).

### PTh-I.2.4 Schema funcțională a centralelor de tratare a aerului (CTA) sălii de vânzare — corelare cu vitrinele deschise

Cele **2 CTA de 7.000 mc/h** stabilite la DTAC (cap. 5.3) sunt detaliate, la execuție, cu schema funcțională completă și cu integrarea hidraulică a bateriilor pe bucla de recuperare de căldură de la frig (DTAC cap. 4.5):

```
Aer proaspăt exterior ─► jaluzea + filtru ePM10 ─► recuperator entalpic (η≥75%)
   ─► baterie încălzire (agent din tamponul de recuperare frig, 1.000 l) ─► baterie răcire (agent frigorific dedicat/chiller)
   ─► filtru ePM1 50% ─► ventilator EC refulare (VAV pe CO2) ─► anemostate sală
Aer evacuat sală ◄─ grile evacuare ◄─ ventilator EC evacuare ◄─ recuperator entalpic ◄─ filtru
```

**Corelarea cu vitrinele frigorifice deschise (multideck, DTAC cap. 6.5):** distribuția anemostatelor de introducere a aerului tratat de CTA se dimensionează și se amplasează astfel încât jetul de aer refulat **să nu intersecteze direct cortina de aer rece a vitrinelor multideck deschise** — un anemostat poziționat necorespunzător, cu jet orientat spre fața unei vitrine deschise, ar perturba mecanic cortina de aer rece proprie a vitrinei (fenomen documentat în proiectarea de retail alimentar sub numele de "cross-contaminare aeraulică"), forțând compresorul vitrinei respective să compenseze o pierdere suplimentară de frig indusă chiar de sistemul de climatizare a sălii — o interacțiune negativă între cele două instalații, evitabilă exclusiv prin coordonarea traseelor de tubulatură și a poziției anemostatelor cu planul de dispunere a mobilierului frigorific, confirmat la faza de shop-drawing cu operatorul de retail (conform particularității beneficiarului deja semnalate în `general.md` cap. 1.2 — temă de proiectare de tip "built-to-suit", cu poziții de mobilier fixate de standardul operațional al lanțului). Zonele de circulație client dintre rafturi, aflate în vecinătatea directă a vitrinelor multideck, se dimensionează la un debit de aer introdus redus local (anemostate cu jet difuz, nu concentrat), completat de **destratificatoare de plafon** (DTAC cap. 4.4) care recirculă aerul cald acumulat sub tavanul de 4,50-5,20 m, contribuind indirect la reducerea disconfortului termic local perceput de clienți la trecerea prin dreptul vitrinelor deschise.

**Unitățile terminale ale back-office-ului** (birouri, vestiare) — distincte de CTA-ul general al sălii — sunt echipate cu **ventiloconvectoare (fan-coil) pe 2 tuburi**, alimentate din același circuit hidraulic de încălzire/răcire ca și bateriile CTA, cu reglaj individual pe termostat de încăpere; soluție care evită supradimensionarea rețelei de tubulatură de aer către zone cu ocupare redusă și program orar diferit de cel al sălii de vânzare.

### PTh-I.2.5 Schema izometrică apă rece/caldă

Racordul de apă rece din branșamentul DN 65, prin cămin apometru (contor Woltmann DN 50-65), spre distribuitorul general (DN 50), apoi coloane spre grupurile sanitare, vestiare, zonele de procesare și punctele tehnologice:

| Coloană | Tip | Zonă deservită | Ø bază | Ø vârf |
|---|---|---|---|---|
| AR-1 | apă rece | Grup sanitar public + PMR | PP-R 32 | PP-R 20 |
| AR-2 | apă rece | Vestiar personal (bărbați) | PP-R 32 | PP-R 20 |
| AR-3 | apă rece | Vestiar personal (femei) | PP-R 25 | PP-R 20 |
| AR-4 | apă rece | Chiuvete tehnologice — procesare carne/pește/lactate | PEX-Al-PEX 32 | PEX-Al-PEX 20 |
| AR-5 | apă rece | Robinete serviciu/spălare pardoseală sală+depozit | PP-R 32 | PP-R 25 |
| AR-6 | apă rece | Umplere/completare instalație gas cooler adiabatic (dacă soluția o impune) | PP-R 20 | PP-R 20 |
| ACC-1 | apă caldă | Vestiar bărbați (4 dușuri) | PP-R 32 | PP-R 20 |
| ACC-2 | apă caldă | Vestiar femei (3 dușuri) | PP-R 25 | PP-R 20 |
| ACC-3 | apă caldă | Chiuvete tehnologice procesare | PEX-Al-PEX 25 | PEX-Al-PEX 20 |
| REC-1 | recirculare | buclă retur ACM de la boiler 500 l | PP-R 20 | PP-R 20 |

Toate coloanele din vecinătatea camerelor frigorifice și a mobilierului frigorific (AR-4, tronsoane care traversează zonele de procesare adiacente camerelor pozitive) sunt izolate anticondens (cauciuc sintetic, PTh-I.6.3), reluând principiul deja stabilit în DTAC (cap. 2.5) la nivel de execuție tronson-cu-tronson.

### PTh-I.2.6 Schema coloanelor de canalizare menajeră și tehnologică

| Coloană | Obiecte racordate | Ø coloană | Pantă colector orizontal |
|---|---|---|---|
| K1 | Grup sanitar public (12 WC, 4 pisoare, 8 lavoare) | PVC-KA 110 | 2,0% |
| K2 | Vestiar bărbați (4 duș, lavoare) | PVC-KA 110 | 2,0% |
| K3 | Vestiar femei (3 duș, lavoare) | PVC-KA 90 | 2,5% |
| K4 | Birouri administrative | PVC-KA 90 | 2,5% |
| KT-1 | Canal tehnologic — procesare carne/pește (sifoane inox + rigole) | PP 110 | 1,5% |
| KT-2 | Canal tehnologic — procesare lactate/patiserie | PP 90 | 1,5% |
| KT-3 | Robinete serviciu/spălare pardoseală sală+depozit | PP 110 | 2,0% |

Coloanele K1-K4 (menajer) și KT-1…KT-3 (tehnologic) converg către **colectoare orizontale complet separate** (DTAC cap. 3.1) până la nivelul separatorului de grăsimi (PTh-I.2.7); doar în avalul separatorului cele două rețele se unesc într-un colector comun DN 200 spre racordul public. Colectorul menajer principal (Dn160, i = 1,5%) și colectorul tehnologic (Dn160, i = 1,5% până la separator) au cămine de vizitare la fiecare schimbare de direcție și la interval maxim de 40 m, cu piese de curățire la baza fiecărei coloane, conform I9 și verificării de detaliu la SR EN 12056-2 (PTh-I.3.4).

### PTh-I.2.7 Schema separatorului de grăsimi și a condensului camerelor frigorifice negative

```
Zone procesare (carne/pește/lactate) ─► sifoane inox cu coș ─► rigole cu grătar ─► colector tehnologic KT
   ─► cămin desnisipare ─► separator de grăsimi NS 7 (SR EN 1825, volum nămol 1.400 l)
   ─► cămin de prelevare probă ─► colector comun ─► racord canalizare publică
```

Senzor de nivel al stratului de grăsime acumulat, cu alarmă transmisă la BMS (PTh-I.2.14) la atingerea nivelului critic care impune vidanjare — evitând funcționarea separatorului dincolo de capacitatea utilă de acumulare, scenariu în care eficiența de separare (DTAC cap. 3.3) scade drastic și riscă antrenarea de grăsime nesparată în rețeaua publică.

**Garda hidraulică încălzită a condensului camerelor negative** (DTAC cap. 3.4), la nivel de execuție: rezistență electrică de 20-30 W montată direct pe corpul sifonului dedicat evacuării condensului fiecărei camere frigorifice negative, alimentată dintr-un circuit dedicat pe TD-FRIG (PTh-I.2.9), cu termostat de comandă reglat la +5 °C (activare sub acest prag, prevenind funcționarea inutilă a rezistenței în perioadele în care temperatura locală a sifonului rămâne, din alte motive, peste pragul de îngheț). Traseul de evacuare a condensului de la vaporizatorul fiecărei camere negative până la gardă este pozat cu pantă continuă și fără porțiuni orizontale lungi expuse curentului de aer rece evacuat la degivrare, pentru a limita riscul de îngheț înainte de a atinge garda încălzită.

### PTh-I.2.8 Schema pluvială

Pentru suprafața de acoperiș (~2.100 mp) și intensitatea de calcul deja stabilite în DTAC (cap. 3.5, Q_p = 63 l/s), schema de execuție detaliază:

```
8 receptoare de acoperiș (≈8 l/s/receptor) ─► colectoare orizontale (fără pantă, sistem sifonic sau gravitațional cu pantă, funcție de soluția adoptată la P.Th.)
   ─► coloane pluviale interioare Dn110/125 (2 coloane principale)
   ─► colector îngropat Dn200
   ─► racord canalizare pluvială publică, cu preaplinuri de avarie (deversoare prin atic) pentru evenimente peste ploaia de calcul
```

Fiecare receptor cu deflector antivortex și grătar; receptoarele situate în vecinătatea gas cooler-ului și a echipamentelor de acoperiș (PTh-I.2.3) se dotează suplimentar cu element de încălzire (cablu autoreglabil) pe porțiunea expusă riscului de îngheț iarna, prevenind blocarea evacuării exact în zona tehnică unde eventualele scurgeri accidentale de la echipamente (condens, apă de curățare) trebuie evacuate fără întârziere. **Platforma de recepție marfă și curtea tehnică**, betonate, se colectează separat, prin rigole proprii, către canalizarea pluvială a incintei, fără a se intersecta cu rețeaua tehnologică a separatorului de grăsimi (rețea distinctă, care tratează exclusiv apele uzate din procesare, nu apele pluviale ale platformelor exterioare).

### PTh-I.2.9 Schema monofilară — TGD, tablouri secundare și priorizarea alimentării de rezervă

```
Post de transformare propriu 630 kVA ─► TGD (întrerupător general, contor, baterie compensare cos φ, SPD tip 1+2)
        ├─► TD-ILUM (iluminat general + accent raioane) ......................... 63 A
        ├─► TD-FORȚĂ (prize generale, patiserie, echipamente tehnologice) ....... 100 A
        ├─► TD-HVAC (CTA, ventilatoare, destratificatoare, perdele aer) ......... 100 A
        ├─► TD-CT (centrala termică, pompe, automatizări) ....................... 25 A
        ├─► TD-CASE (case de marcat, IT, curenți slabi) — cu UPS dedicat ........ 40 A
        ├─► TD-FRIG (rack compresoare CO2, mobilier frigorific, gărzi încălzite) — prioritar la grup electrogen — 200 A
        └─► TD-SI (pompe incendiu, IDSAI, desfumare, iluminat evacuare) — prioritar la grup electrogen — 160 A — cablu E90/PH
```

**Grupul electrogen de 250 kVA** (DTAC cap. 7.4), cu comutare automată (ATS) în mai puțin de 15 secunde, alimentează prioritar, prin schema de comutare de mai sus, exact **TD-FRIG și TD-SI** (plus TD-CASE, protejat suplimentar de propriul UPS pentru continuitatea tranzacțiilor pe durata scurtă dintre căderea rețelei și preluarea de către grup) — reluând, la nivel de schemă de execuție cu numerotarea reală a tablourilor, logica de priorizare deja argumentată exhaustiv în DTAC (cap. 7.4): frigul și securitatea la incendiu nu se opresc niciodată, restul clădirii poate funcționa temporar redus.

**Selectivitate:** întrerupător general TGD (temporizare lungă) → tablouri secundare 25-200 A (temporizare medie, ierarhizată invers proporțional cu criticitatea — TD-SI și TD-FRIG cu temporizare cea mai scurtă la nivelul lor, pentru a nu întârzia inutil restabilirea alimentării critice) → circuite terminale 6-40 A (instantaneu), verificare completă la PTh-I.3.6.

### PTh-I.2.10 Schema IDSAI — matrice cauză-efect completă, inclusiv detecția aspirativă a depozitului

Centrală de detectare adresabilă, cu detectoare optice de fum de plafon în sala de vânzare, back-office, vestiare, spații tehnice, **detectoare termice** în zona de patiserie (DTAC cap. 9.4 — evitarea falselor alarme generate de procesul normal de coacere) și **detecție aspirativă (ASD)** pe zona de depozit cu rafturi, conform argumentului deja tratat exhaustiv în DTAC (cap. 9.4) privind viteza superioară de reacție la un focar incipient situat la un nivel inferior al rafturilor.

**Matricea cauză-efect (extras):**

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 | Efect 5 |
|---|---|---|---|---|---|
| Alarmă detector sală de vânzare | Deschidere trape desfumare sală (canton unic) | Oprire CTA sală | Aer de compensare (grile joase) | Sirene + EVAC | Transmisie ISU/dispecerat |
| Alarmă ASD depozit | Pornire ventilare mecanică de desfumare depozit | Oprire ventilare normală depozit | Sirene locale + generale | Transmisie ISU | — |
| Alarmă zonă frigorifică (detector CO₂ rack) | Ventilare de avarie cameră tehnică | Sirenă locală | Semnalizare BMS | — | Transmisie dispecerat |
| Alarmă buton manual (oriunde) | Sirene generale + EVAC | Deblocare control acces (fail-safe) | Oprire selectivă CTA | — | Transmisie |
| Scădere presiune rețea sprinkler/hidranți | Pornire pompă jockey | Pornire electropompă principală | Semnalizare ACS | Transmisie dispecerat | — |
| Defect buclă/echipament | — | — | — | — | Semnal defect + LED local |
| Confirmare pompier (cheie panou) | Silențiere sirene | Menținere semnalizare vizuală | Jurnal evenimente | — | — |

Temporizare **T1 (recunoaștere) 60 s / T2 (investigare) max. 3 min**, aplicabilă zonelor cu personal permanent (sala de vânzare pe durata programului, back-office); pe depozit, unde detecția e automată (ASD) și riscul e mai mare, alarma este **directă**, fără temporizare de investigare, conform practicii P118-3 pentru risc mare de incendiu — identic principiului deja aplicat la depozitele cu rafturi înalte.

### PTh-I.2.11 Schema de desfumare — sala de vânzare (canton unic) și depozitul (mecanică)

Sala de vânzare (1.500 mp, sub pragul de 1.600 mp al unui canton unic, conform DTAC cap. 9.5) formează **un singur canton de desfumare**, cu ecran de desfumare perimetral (coborâre ≥0,50 m sub tavan) doar la interfața cu depozitul și cu spațiile tehnice, nu în interiorul sălii:

| Element | Valoare |
|---|---|
| Arie canton | 1.500 mp |
| A_util necesară (≥1%) | 15,0 mp |
| A_geom (Cv adoptat 0,65) | 23,1 mp |
| Nr. trape adoptate (2,0 mp/buc.) | 12 |
| Aer de compensare necesar | ≥ 23 mp (grile joase pe fațadă + uși de acces) |

Fiecare trapă cu actuator electric, comandă automată de la centrala IDSAI (canton sală) + comandă manuală de la nivelul solului. Depozitul, fără acces direct la acoperiș pe o suprafață suficientă sau cu configurație de rafturi care ar reduce eficiența tirajului natural, este desfumat **mecanic**, prin ventilatoare de extracție dedicate (calcul detaliat la PTh-I.10.1).

### PTh-I.2.12 Schema curenților slabi — CCTV, EAS, control acces, rețea date/POS

Rack de comunicații amplasat în camera tehnică (spațiu climatizat, DTAC cap. 10.3), cu subsistemele cablate distinct de curenții tari (I7):

```
Rack comunicații (switch PoE+, NVR, panou EAS, centrală control acces) ──┬─► Cablare Cat.6A (birouri, case de marcat/POS)
                                                                          ├─► Cablare coaxial/UTP camere CCTV IP (sală, case, depozit, acces)
                                                                          ├─► Bucla EAS (antene ieșiri + dezactivatoare case)
                                                                          ├─► Buclă control acces (uși personal, birouri, depozit)
                                                                          └─► Rețea ESL (afișaj electronic de preț, wireless)
```

**Amplasare CCTV (tipic 18-22 puncte):** 4-6 în sala de vânzare (supraveghere generală raioane + zone cu risc de furt ridicat), 3 la casele de marcat (poziționate să acopere zona de scanare/plată), 2-3 la porțile EAS (corelarea alarmei EAS cu imaginea video, pentru verificarea rapidă de către personal a cauzei alarmei — un pas esențial de operare care reduce falsele intervenții asupra clienților), 3-4 perimetru exterior/parcare, 2-3 depozit/recepție marfă, 1-2 acces personal. Toate camerele IP, cu iluminare IR pentru zonele fără iluminat nocturn (curte tehnică, depozit în afara programului), NVR cu retenție ≥ 30 de zile pe array RAID (DTAC cap. 10.2, GDPR).

**EAS — poziționarea porților și integrarea cu dezactivatoarele de la case:** porțile de detecție (DTAC cap. 10.1, tehnologie AM sau RF) se amplasează la fiecare acces/ieșire din sala de vânzare, cu lățime de trecere corelată cu fluxul de clienți (inclusiv cărucioare) și cu distanța minimă între antenele porții impusă de producător pentru evitarea interferențelor reciproce dacă sunt montate mai multe porți adiacente la un acces larg. Dezactivatoarele/detectivatoarele integrate în fiecare poziție de casă de marcat sunt cablate pe același segment de rețea ca și POS-ul (punctul de vânzare), astfel încât secvența de anulare a etichetei de securitate să fie declanșată automat la finalizarea corectă a tranzacției de plată, nu printr-o acțiune manuală separată a casierului care ar putea fi omisă.

**Control acces:** cititoare de proximitate pe ușa de acces personal, pe accesul birourilor, pe camerele frigorifice (jurnal de acces, relevant pentru trasabilitatea HACCP — cine și când a intrat într-o cameră frigorifică, PTh-I.2.14) și pe rampa de recepție marfă (control al fluxului de furnizori), integrate cu IDSAI (deblocare fail-safe la alarmă de incendiu confirmată, DTAC cap. 10.3) și cu funcția de pontaj a personalului.

**Rețea date/POS:** distribuție Cat.6A la fiecare poziție de casă de marcat (minim 2 prize RJ45/poziție — POS + eventual cititor de card separat), la birourile administrative și la punctele de administrare a stocului (terminale de recepție marfă, dacă operatorul folosește scanare de cod de bare la recepție). Switch principal cu porturi PoE+ (alimentare camere + puncte Wi-Fi pentru terminale mobile de inventariere), UPS dedicat rack-ului (autonomie ≥ 30 min, coordonat cu autonomia UPS-ului TD-CASE, PTh-I.2.9, pentru a asigura continuitatea tranzacțiilor pe intervalul dintre căderea rețelei și preluarea de către grupul electrogen).

### PTh-I.2.13 Schema sonorizării (PA/EVAC integrat) și a afișajului electronic de preț

```
Rack audio central ─► amplificatoare pe zone (sală, case, depozit)
   ─► difuzoare distribuite (plafon, zonă de vânzare + case + acces)
   ─► comutare automată prioritară la EVAC (semnal de la centrala IDSAI, DTAC cap. 9.6)
```

Aceeași infrastructură de difuzoare deservește anunțurile comerciale/muzica de fundal a funcționării normale și mesajele de evacuare de urgență (EVAC, SR EN 54-16), cu prioritate absolută și automată a celor din urmă — nu există un scenariu în care muzica de fundal continuă să se redea în timp ce sistemul EVAC ar trebui să transmită instrucțiuni de evacuare, comutarea fiind hardware-prioritizată la nivelul amplificatoarelor, nu doar software.

**Afișajul electronic de preț (ESL):** etichete wireless montate pe rafturi, pe aceeași infrastructură de rețea de date, actualizate central prin sistemul de gestiune a stocului al operatorului; alimentarea etichetelor este pe baterie proprie de lungă durată (nu necesită cablare individuală), rețeaua wireless dedicată ESL funcționând independent de rețeaua Wi-Fi generală a magazinului, pentru a evita congestia și interferența dintre cele două fluxuri de date.

### PTh-I.2.14 Schema funcțională BMS — integrarea completă a subsistemelor

```
BMS central ──┬─► Monitorizare HACCP (sonde temperatură vitrine/camere, arhivare 12 luni, alarmare SMS)
              ├─► Comandă prioritate recuperare căldură frig→încălzire (tampon 1.000 l vs cazane, DTAC cap. 4.5)
              ├─► Reglaj HVAC (VAV pe CO2, DTAC cap. 5.5) + programare CTA
              ├─► Comandă iluminat DALI (daylight harvesting + program orar, DTAC cap. 8.2)
              ├─► Programare cicluri degivrare mobilier frigorific (evitare vârf de putere, DTAC cap. 6.6)
              ├─► Contorizare energetică pe categorii (frig, HVAC, iluminat, forță)
              └─► Interfață de vizualizare (nu de comandă) cu IDSAI și cu detectorul de CO2 al camerei rack
```

Se reia, la nivel de schemă de execuție, principiul de proiectare deja stabilit exhaustiv în DTAC (cap. 10.5): BMS-ul **nu comandă niciodată** secvențele de securitate la incendiu sau ventilarea de avarie a camerei rack-ului frigorific — aceste funcții rămân pe centralele lor dedicate, cu BMS-ul funcționând exclusiv ca platformă de vizualizare centralizată și de optimizare energetică a funcțiilor de confort/eficiență.

### PTh-I.2.15 Schema instalației fotovoltaice — string-uri, invertoare, protecții

Instalație FV de **150-200 kWp** pe acoperișul clădirii (DTAC cap. 11.2), organizată pe string-uri conectate la invertoare string, cu integrare în TGD:

```
Module FV (≈450 buc. × 400 Wp, pentru 180 kWp) ─► string-uri (18 module/string, ≈25 string-uri)
   ─► cutii de conexiuni DC (siguranțe + SPD DC) ─► invertoare string (≈6 × 30 kW)
   ─► tablou general AC FV (protecție + contorizare producție + anti-islanding)
   ─► TGD (racord prosumator, contor bidirecțional)
```

Structura de prindere a modulelor (fără penetrarea învelitoarei, sistem cu balast, sau cu penetrare etanșată, funcție de tipul de acoperiș adoptat de arhitectură) se verifică de inginerul structurist pentru încărcarea suplimentară permanentă și pentru încărcarea de vânt, **coordonată explicit cu poziția echipamentelor tehnice de acoperiș deja ocupante ale suprafeței disponibile** (gas cooler-ul instalației frigorifice, CTA-urile, trapele de desfumare) — coordonare relevantă la un supermarket, unde suprafața de acoperiș utilă pentru fotovoltaic (~1.500 mp din DTAC cap. 11.2) este deja parțial ocupată de o instalație tehnologică de dimensiuni notabile, spre diferență de o clădire fără echipamente grele pe acoperiș, unde întreaga suprafață ar fi disponibilă pentru module.

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Calcul hidraulic complet al rețelei de sprinklere — sala de vânzare (SR EN 12845, metoda Hazen-Williams)

**Date de intrare:** densitate de stropire d = 5 mm/min (OH3), arie de operare A_op = 260 mp, capete K80 (K = 80 l/min·bar⁰·⁵ = 1,11 l/s·bar⁰·⁵), coeficient Hazen-Williams C = 120 (oțel negru), interax capete 4,0×4,0 m.

**Pasul 1 — debitul capului cel mai defavorabil** (presiune minimă de funcționare pentru risc ordinar p_min = 0,70 bar la K80):

q₁ = K·√p₁ = 1,11 × √0,70 = **0,93 l/s** (capul terminal).

**Pasul 2 — calculul nod cu nod pe branch line** (6 capete pe o ramură, distanță 4,0 m între capete, Ø crescător DN 20→DN 40):

| Nod | Q cumulat (l/s) | Ø (mm) | v (m/s) | j (bar/m) | L (m) | Δp tronson (bar) | p necesară cap (bar) | q cap (l/s) |
|---|---|---|---|---|---|---|---|---|
| Cap 1 (terminal) | 0,93 | 20 | 2,96 | — | — | — | 0,70 | 0,93 |
| Cap 2 | 1,88 | 25 | 3,83 | 0,0287 | 4,0 | 0,115 | 0,815 | 1,00 |
| Cap 3 | 2,88 | 32 | 3,58 | 0,0172 | 4,0 | 0,069 | 0,884 | 1,04 |
| Cap 4 | 3,92 | 32 | 4,87 | 0,0295 | 4,0 | 0,118 | 1,002 | 1,11 |
| Cap 5 | 5,03 | 40 | 3,58 | 0,0129 | 4,0 | 0,052 | 1,054 | 1,14 |
| Cap 6 | 6,17 | 40 | 4,40 | 0,0186 | 4,0 | 0,074 | 1,128 | 1,18 |

(j = 6,05×10⁵ × Q^1,85/(C^1,85 × d^4,87), valori rotunjite pentru claritate tabelară; branch line-ul rezultat, 6,17 l/s pe 6 capete, se apropie de valoarea medie de 0,90-1,0 l/s/cap folosită în bilanțul simplificat DTAC.)

**Pasul 3 — cross-main către aria de operare completă** (≈16 capete pe interax 4,0×4,0 m ≈ 256-260 mp): Q_op = 2,6-2,7 branch lines echivalente × 6,17 ≈ **21,7 l/s**, confirmând exact valoarea de sinteză DTAC (5×260/60 = 21,7 l/s).

**Pasul 4 — presiunea necesară la ACS** (pierderi pe traseul cel mai lung, branch line + cross-main + riser):

| Tronson | L echiv. (m, +30% piese speciale) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Branch line (6 capete) | 26,0 | variabil | 20→40 | — | 0,428 |
| Cross-main | 20,0 | 21,7 | 65 | 0,0102 | 0,204 |
| Riser Zona 1 (vertical) | 6,0 | 21,7 | 100 | 0,0018 | 0,011 |
| **Total pierderi traseu** | | | | | **0,643 bar** |

Presiune necesară la ACS = 0,70 (cap terminal) + 0,643 (pierderi) = **≈1,34 bar**, la care se adaugă pierderile pe colectorul de la stația de pompare (DN 125, ≈25 m, Q 21,7 l/s): Δp ≈ 0,06 bar. **Presiune necesară la refularea pompei pentru scenariul Zona 1 = 1,34 + 0,06 + cotă geodezică (≈0,5 bar) ≈ 1,90 bar ≈ 19,4 mCA** — verificată sub presiunea de proiectare a pompei (PTh-I.3.7), care acoperă scenariul mai defavorabil al Zonei 2 (depozit).

### PTh-I.3.2 Calcul hidraulic complet al rețelei de sprinklere — depozitul (HHS)

**Date de intrare:** densitate d = 10 mm/min, A_op = 260 mp, capete K115, interax 3,5×3,5 m — parametri identici metodologic celor validați deja la nivel de sinteză (Q_dep = 10×260/60 = 43,3 l/s, PTh-I.2.1).

**Verificare pe branch line** (4 capete, distanță 3,5 m, Ø DN 25→DN 50):

| Nod | Q cumulat (l/s) | Ø (mm) | v (m/s) | Δp tronson (bar) | p necesară (bar) |
|---|---|---|---|---|---|
| Cap 1 | 1,13 | 25 | 2,30 | — | 0,50 |
| Cap 2 | 2,29 | 32 | 2,85 | 0,068 | 0,568 |
| Cap 3 | 3,53 | 40 | 2,81 | 0,044 | 0,612 |
| Cap 4 | 4,82 | 50 | 2,45 | 0,024 | 0,636 |

Q_op rezultat (≈9 branch lines echivalente pentru A_op 260 mp la interax 3,5×3,5 m ≈ 12,25 mp/cap → ≈21 capete): Q_op ≈ 21 × 2,06 (debit mediu/cap) ≈ **43,3 l/s** — confirmare de coerență identică metodei DTAC. Presiunea necesară la ACS Zona 2, prin analogie de calcul cu PTh-I.3.1 (cross-main + riser, secțiuni majorate proporțional cu debitul superior): **≈1,55 bar**, plus pierderi colector (Δp ≈ 0,10 bar la Q 43,3 l/s pe DN 125) și cotă geodezică (≈0,5 bar) = **≈2,15 bar ≈ 21,9 mCA**.

**Presiunea necesară la refularea pompei**, scenariul guvernant (Zona 2 + hidranți interiori concomitent, cap. PTh-I.2.1): 21,9 mCA (sprinklere depozit) + verificare hidranți (PTh-I.3.3, presiune similară) + rezervă de exploatare → se adoptă **electropompă principală dimensionată la H = 60-65 mCA, Q = 47,5 l/s** (PTh-I.2.1), cu marjă confortabilă față de cele ≈22 mCA strict necesare la sprinklere — marjă justificată de pierderile suplimentare posibile la configurația reală a rafturilor de depozit, confirmată la shop-drawing cu planul de merchandising al operatorului, exact conform particularității beneficiarului semnalate în `general.md` (temă de proiectare "built-to-suit").

### PTh-I.3.3 Calcul hidraulic hidranți interiori și exteriori — punctul cel mai defavorabil

Traseu de la stația de pompare la Hi-5 (cel mai îndepărtat, în depozit, colț opus rampei):

| Tronson | L (m) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Colector refulare → inel hidranți | 20 | 4,2 | 65 | 0,0091 | 0,182 |
| Inel → Hi-5 (ramură) | 55 | 2,1 | 65 | 0,0058 | 0,319 |
| **Total pierderi** | | | | | **0,501 bar** |

Presiune necesară la robinetul Hi-5 (jet compact, SR EN 671-2): **p_min = 2,5 bar** → presiune necesară la sursă = 2,5 + 0,501 + cotă geodezică (≈0,1 bar, aceeași cotă parter) = **≈3,10 bar ≈ 31,6 mCA**, confirmată sub cei 60-65 mCA disponibili la refularea pompei (PTh-I.3.2).

**Hidranții exteriori** (Q = 20 l/s conform DTAC cap. 9.3), alimentați din inelul exterior dedicat: presiune de proiectare la He-2 (cel mai defavorabil, capătul curții tehnice): pierderi pe traseul de la rezervor/stație (≈35 m, DN 150) Δp ≈ 0,08 bar; presiune necesară la racordul de tip B (SR EN 671, autospeciale) ≥ 2,0 bar → presiune la sursă ≈ 2,1 bar ≈ 21,4 mCA, verificare identică metodologic, confirmată sub presiunea de regim a stației.

### PTh-I.3.4 Calcul hidraulic complet — rețeaua de apă menajeră/tehnologică (toate tronsoanele)

Pornind de la ΣE = 8,0 (DTAC cap. 2.2) și q_c = 4,0 l/s, breviarul PTh detaliază fiecare tronson (viteze economice 0,7-2,0 m/s, verificare la presiunea disponibilă de 3,2 bar, DTAC cap. 2.4):

| Tronson | ΣE tronson | q_c (l/s) | Ø adoptat | v (m/s) | L (m) | Δp liniar (mCA) | Δp local (+30%) |
|---|---|---|---|---|---|---|---|
| Branșament → cămin apometru | 8,0 | 4,0 | PE-HD 90 | 0,63 | 15 | 0,18 | 0,23 |
| Cămin → distribuitor general | 8,0 | 4,0 | PP-R 50 | 1,45 | 10 | 1,10 | 1,43 |
| Distribuitor → AR-1 (GS public) | 2,4 | 1,50 | PP-R 32 | 1,32 | 18 | 1,25 | 1,63 |
| Distribuitor → AR-2/AR-3 (vestiare) | 3,0 | 1,68 | PP-R 32 | 1,48 | 25 (+cotă) | 1,80 | 2,34 |
| Distribuitor → AR-4 (procesare) | 1,6 | 1,20 | PEX-Al-PEX 32 | 1,05 | 22 | 1,10 | 1,43 |
| Distribuitor → AR-5 (spălare pardoseli) | 1,0 | 0,95 | PP-R 32 | 0,84 | 30 | 0,90 | 1,17 |

**Pierdere totală traseu cel mai defavorabil** (branșament → duș vestiar, deja calculat în DTAC cap. 2.4 la ≈2,42 bar) — **confirmată prin recalculare nod-cu-nod la ≈2,10-2,40 bar**, sub presiunea disponibilă de 3,2 bar → **distribuție integral direct din rețea, fără stație de hidrofor** pe circuitul de consum curent, conform soluției DTAC. Se reamintește explicit (DTAC cap. 2.4) că această concluzie **nu se extinde** la rețeaua de hidranți/sprinklere, care are stație de pompare dedicată, complet separată.

### PTh-I.3.5 Calcul hidraulic canalizare — toate coloanele

Verificare grad de umplere h/D și viteză de autocurățare (v ≥0,7 m/s), conform SR EN 12056-2:

| Coloană | Q_c (l/s) | Ø | Capacitate la h/D=0,5 (l/s) | h/D real | v (m/s) |
|---|---|---|---|---|---|
| K1 (GS public) | 2,10 | PVC-KA 110 | 8,5 | 0,25 | 0,85 |
| K2 (vestiar bărbați) | 1,20 | PVC-KA 110 | 8,5 | 0,18 | 0,75 |
| K3 (vestiar femei) | 0,90 | PVC-KA 90 | 5,2 | 0,20 | 0,72 |
| K4 (birouri) | 0,35 | PVC-KA 90 | 5,2 | 0,10 | 0,70 |
| KT-1 (procesare carne/pește) | 1,80 | PP 110 | 8,5 | 0,22 | 0,80 |
| KT-2 (procesare lactate/patiserie) | 1,10 | PP 90 | 5,2 | 0,24 | 0,78 |
| KT-3 (spălare pardoseli) | 0,95 | PP 110 | 8,5 | 0,12 | 0,73 |
| Colector menajer principal | 4,16 | PVC-KA 160 | 20,0 | 0,21 | 0,95 |
| Colector tehnologic (spre separator) | 3,85 | PP 160 | 20,0 | 0,19 | 0,92 |

Toate tronsoanele funcționează la h/D < 0,5, cu viteze de autocurățare peste 0,7 m/s — confirmare identică concluziei DTAC (cap. 3.2), extinsă la fiecare coloană individuală.

**Verificarea separatorului de grăsimi la debitul de vârf orar tehnologic**: debitul de calcul al canalului tehnologic (3,85 l/s, valoare de vârf instantaneu conform metodei echivalenților de debit) este comparat cu debitul nominal de tratare al separatorului NS 7 adoptat în DTAC (cap. 3.3) — separatorul este dimensionat, conform SR EN 1825, la debitul nominal NS care include deja factorii de temperatură și de agenți de curățare (NS = Q_max × f_d × f_t × f_r = 4,0 × 1,0 × 1,3 × 1,0 = 5,2 → NS 7 adoptat), astfel încât debitul instantaneu de 3,85 l/s calculat la execuție pe rețeaua reală de coloane rămâne **sub capacitatea de tratare adoptată** — verificare de coerență confirmată între dimensionarea preliminară (DTAC) și configurația reală de coloane (PTh).

### PTh-I.3.6 Calcul electric complet — toate circuitele și căderea de tensiune

Extinderea bilanțului de putere din DTAC (cap. 7.2, Pc ≈250,5 kW, S ≈272 kVA) cu toate plecările din tablourile secundare, verificate la cădere de tensiune admisă (3% iluminat, 5% forță, de la TGD, conform I7):

**TD-FRIG (200 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | L (m) | Δu% |
|---|---|---|---|---|---|---|---|
| CF-1 | Compresoare MT (4 buc., 1 cu inverter) | 70,0 | 126,3 | C160 3P | 5×50 | 20 | 1,4 |
| CF-2 | Compresoare LT (2 buc.) | 25,0 | 45,1 | C63 3P | 5×16 | 20 | 1,1 |
| CF-3 | Ventilatoare gas cooler (EC, acoperiș) | 8,0 | 14,4 | C16 3P | 5×2,5 | 40 | 1,6 |
| CF-4 | Mobilier frigorific — vitrine MT (rezistențe, ventilatoare) | 28,0 | 50,5 | C63 3P | 5×16 | 60 | 2,2 |
| CF-5 | Mobilier frigorific — vitrine LT (degivrare electrică) | 17,0 | 30,7 | C40 3P | 5×10 | 60 | 2,0 |
| CF-6 | Gărzi hidraulice încălzite camere negative | 1,0 | 4,3 | C10 1P | 3×1,5 | 30 | 0,8 |
| CF-7 | Pardoseli antiîngheț camere negative | 6,0 | 25,9 | C32 3P | 5×4 | 25 | 1,3 |

**TD-ILUM (63 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CI-1 | Iluminat general sală de vânzare | 10,6 | 46,1 | C50 3P | 5×10 | 1,9 |
| CI-2 | Iluminat accent raioane (spoturi) | 2,1 | 9,1 | C16/30mA 3P | 5×2,5 | 1,4 |
| CI-3 | Iluminat integrat vitrine frigorifice | 1,75 | 7,6 | C10/30mA 3P | 5×2,5 | 1,2 |
| CI-4 | Iluminat depozit | 1,0 | 4,3 | C10 3P | 5×1,5 | 1,0 |
| CI-5 | Iluminat birouri/vestiare/GS | 4,3 | 18,7 | C25/30mA 3P | 5×4 | 1,6 |
| CI-6 | Iluminat exterior (parcare, fațadă) | 2,2 | 9,5 | C16 3P | 5×2,5 | 1,8 |

**TD-FORȚĂ (100 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CP-1 | Prize generale sală/depozit | 20,0 | 30,4 (monofazate distribuite) | C40/30mA | 3×10 | 2,1 |
| CP-2 | Patiserie/panificație — cuptoare | 30,0 | 54,1 | C63 3P | 5×16 | 1,7 |
| CP-3 | Echipamente procesare (tranșare, ambalare) | 8,0 | 14,4 | C25/30mA 3P | 5×4 | 1,3 |

**TD-HVAC (100 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CV-1 | CTA sală (2 buc.) | 30,0 | 54,1 | C63 3P | 5×16 | 1,6 |
| CV-2 | Ventilatoare depozit + destratificatoare | 8,0 | 14,4 | C25 3P | 5×4 | 1,2 |
| CV-3 | Perdele de aer calde acces (2×9 kW) | 18,0 | 32,5 | C40 3P | 5×10 | 1,5 |
| CV-4 | Ventilare mecanică de desfumare depozit | 15,0 | 27,1 (rezervă la CF-SI dacă cerința PSI o impune) | C32/UPS 3P | 5×6 | — |

**TD-CT (25 A):** cazane cascadă (automatizări), pompe circuit primar/secundar, pompă recirculare ACM — total ~8 kW, verificat la Δu ≤1,5%.

**TD-CASE (40 A, cu UPS dedicat):** case de marcat + IT + rack curenți slabi — total ~15 kW, protecție diferențială 30 mA, autonomie UPS ≥15 min (continuitatea tranzacțiilor până la preluarea grupului electrogen).

**TD-SI (160 A, cablu E90/PH):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Cablu | Δu% |
|---|---|---|---|---|---|---|
| CF-P1 | Electropompă incendiu principală | 30,0 | 56,6 | C80 3P | N2XH E90 5×16 | 1,4 |
| CF-P2 | Pompă jockey | 2,2 | 4,7 | C10 3P | N2XH E90 5×1,5 | 0,6 |
| CF-P3 | Centrală IDSAI + ASD + UPS | 1,5 | 6,5 | C10/UPS | N2XH E90 3×1,5 | — |
| CF-P4 | Actuatoare trape desfumare (12 buc.) | 0,8 | 3,5 | C10/UPS | N2XH E90 3×1,5 | — |
| CF-P5 | Iluminat de evacuare (circuit central) | 0,4 | 1,7 | C6/UPS | N2XH E90 3×1,5 | — |
| CF-P6 | EVAC (amplificatoare + difuzoare) | 1,2 | 5,2 | C10/UPS | N2XH E90 3×1,5 | — |

Curentul de calcul total (TGD), verificat prin sumarea circuitelor de mai sus cu factorii de simultaneitate deja adoptați în DTAC (cap. 7.2): **Ic ≈ confirmat la Pc ≈250,5 kW / S ≈272 kVA**, coerent cu PT-ul propriu de 630 kVA (grad de încărcare ~43%, marjă pentru fotovoltaic, DTAC cap. 7.2). Toate circuitele de prize monofazate cu protecție diferențială 30 mA; circuitele TD-SI cu funcționare garantată 90 min (E90) și alimentare de rezervă prin grup electrogen, conform I7 și P118-2.

### PTh-I.3.7 Verificare curent de pornire — compresor frigorific MT și electropompă incendiu

**Compresor MT (unitatea fixă cea mai mare din rack, ~45 kW, 400 V/3F):**

I_nominal ≈ 45.000/(√3 × 400 × 0,87 × 0,92) ≈ **81,3 A** (cos φ ≈0,87, randament ≈0,92).

I_pornire (directă) ≈ 6 × 81,3 ≈ **488 A**, valoare care ar produce, pe cablul de alimentare al rack-ului (5×50 mmp, L=20 m), o cădere de tensiune tranzitorie superioară limitei acceptate pentru pornirea directă a unui motor de această putere pe o rețea comună cu alți consumatori sensibili (automatizările electronice ale rack-ului, sistemul de monitorizare HACCP). **Soluție adoptată:** pornire **stea-triunghi** (limitare la ≈2,5-3×I_nominal ≈ 200-244 A) sau, alternativ, **soft-starter**, ambele acceptate pentru compresoare frigorifice comerciale, cu secvențiere a pornirii celor 4 compresoare MT (nu simultan) astfel încât rack-ul să nu solicite niciodată vârful cumulat al curenților de pornire — logică de comandă implementată în automatica proprie a rack-ului, coordonată cu BMS pentru evitarea suprapunerii cu alte vârfuri de putere ale clădirii (DTAC cap. 6.6, degivrare).

**Electropompă incendiu principală (30 kW, 400 V/3F):**

I_nominal ≈ 30.000/(√3 × 400 × 0,88 × 0,90) ≈ **54,7 A** (verificat la 56,6 A în tabelul PTh-I.3.6, la un cos φ de pornire ușor mai conservator).

I_pornire (directă) ≈ 6,5 × 54,7 ≈ **356 A**. Spre diferență de compresorul frigorific, la această putere pornirea **directă pe rețea** rămâne, de regulă, acceptabilă din punctul de vedere al căderii de tensiune tranzitorii (cablul de alimentare dedicat, E90, secțiune 5×16 mmp, alimentează un singur consumator, fără alți receptori sensibili pe același tronson) — totuși, SR EN 12845 admite și recomandă, pentru pompele de incendiu de această clasă de putere, evaluarea unei **porniri prin soft-starter** dacă timpul de atingere a debitului nominal (impus a fi scurt, ≤15 s, pentru a nu întârzia stingerea) permite; decizia finală de execuție se confirmă cu fișa tehnică a furnizorului de pompă (PTh-I.4). **Pompa Diesel de rezervă** nu are această problemă (motor termic, pornire independentă de rețeaua electrică, cu propriul acumulator dedicat și încărcător de întreținere permanentă).

### PTh-I.3.8 Breviar frigorific detaliat — dimensionarea rack-ului booster CO₂ pe fiecare linie

Extinderea bilanțului global din DTAC (cap. 6.4, Q₀,MT ≈160 kW, Q₀,LT ≈50 kW) la nivel de selecție de compresor individual, cu verificarea redundanței N-1:

**Rack MT (4 compresoare, capacitate nominală la −10 °C evaporare/35 °C gas cooler):**

| Compresor | Tip | Capacitate unitară | Capacitate cumulată |
|---|---|---|---|
| C-MT1 | fix, semi-hermetic | 40 kW | 40 |
| C-MT2 | fix, semi-hermetic | 40 kW | 80 |
| C-MT3 | fix, semi-hermetic | 40 kW | 120 |
| C-MT4 | cu variator de turație (inverter), 10-50 kW | 50 kW (max) | 170 |

Capacitate instalată totală MT = **170 kW**, cu marjă de 6% față de sarcina de proiectare (160 kW, DTAC cap. 6.4) — marjă justificată de simultaneitatea degivrărilor și de derata capacității la temperaturi ambientale de vară ridicate (ciclul transcritic, DTAC cap. 6.3, pierde eficiență la creșterea temperaturii gas cooler-ului). **Verificare N-1** (avaria/mentenanța compresorului de capacitate maximă, C-MT4): capacitate disponibilă = 40+40+40 = **120 kW**, care acoperă **75%** din sarcina de proiectare — insuficient pentru vârful absolut de vară cu toate vitrinele la sarcină maximă simultan, dar acceptabil ca regim tranzitoriu de avarie (câteva ore, până la repararea/înlocuirea compresorului defect), cu efect temporar de derivă termică ușoară la vitrinele cele mai defavorizate hidraulic, monitorizat automat de sistemul HACCP (DTAC cap. 6.6, care ar semnala imediat orice abatere reală de temperatură, permițând intervenția înainte ca marfa să fie afectată).

**Rack LT (2 compresoare, capacitate nominală la −35 °C evaporare/boostat la −10 °C):**

| Compresor | Tip | Capacitate unitară | Capacitate cumulată |
|---|---|---|---|
| C-LT1 | fix, semi-hermetic | 25 kW | 25 |
| C-LT2 | cu variator de turație (inverter), 5-30 kW | 30 kW (max) | 55 |

Capacitate instalată totală LT = **55 kW**, marjă de 10% față de sarcina de proiectare (50 kW). **Verificare N-1** (avaria compresorului C-LT2, inverter): capacitate disponibilă = 25 kW, care acoperă **50%** din sarcina de proiectare — insuficient pentru sarcină de vârf, dar suficient, pe termen scurt, pentru menținerea temperaturilor camerelor de congelare și a vitrinelor la un regim redus (masa deja congelată a produselor oferă o inerție termică de câteva ore, DTAC cap. 7.4), interval în care se activează procedura de intervenție de urgență prevăzută în planul de mentenanță al operatorului.

**Verificarea schimbătorului de desuperheat (recuperare de căldură, DTAC cap. 4.5):** căldura totală de condensare la sarcină de proiectare, Q_cond = Q₀ + P_el = 210 + 68 = 278 kW (identică DTAC), din care fracția recuperabilă la desuperheat (60-75%): **167-209 kW**. Se adoptă, la execuție, un schimbător de desuperheat dimensionat la **185 kW** de capacitate de recuperare (valoare mediană a intervalului, cu marjă de proiectare), cuplat la rezervorul tampon de **1.000 litri** — capacitate confirmată suficientă pentru acoperirea integrală a necesarului termic al sălii de vânzare la transmisie (82,5 kW, DTAC cap. 4.2) plus o parte semnificativă a necesarului de aer proaspăt și de preîncălzire ACM, cu cazanele în cascadă (DTAC cap. 4.1) funcționând, confirmat la nivel de execuție, ca sursă de vârf/rezervă.

### PTh-I.3.9 Calcul detaliat al penei de fum — sala de vânzare (canton unic, 1.500 mp)

Verificarea debitului masic de fum pentru cantonul unic al sălii de vânzare, la o înălțime liberă de 4,50 m (intrados 5,20 m, DTAC cap. 1.2) — semnificativ inferioară unei hale industriale, motiv pentru care viteza de umplere a stratului de fum este mai rapidă și marja de timp disponibilă pentru evacuare este mai redusă, verificare care justifică adoptarea unei arii utile de desfumare (15 mp) și a unui debit de aer de compensare corespunzător (PTh-I.2.11), la un focar de proiectare adecvat riscului de incendiu mediu al unei săli de vânzare cu mărfuri alimentare ambalate (densitate de sarcină termică 420-840 MJ/mp, sub pragul zonelor de risc mare):

| Parametru | Valoare |
|---|---|
| Arie canton | 1.500 mp |
| Focar de proiectare (risc mediu, marfă ambalată pe rafturi) | ≈ 2,5 MW |
| Înălțime liberă sub strat de fum (y, adoptat conservator) | ≈ 3,0 m |
| Debit masic pană de fum (formulă empirică de plumă) | ≈ 14-16 kg/s |
| Debit volumic (temperatură medie fum ≈250 °C) | ≈ 27-30 mc/s |
| A_util adoptată (15,0 mp) — verificare | acoperă debitul calculat prin tiraj termic pe diferența de nivel disponibilă (acoperiș) |

Verificarea confirmă că aria utilă de 15 mp (1% din suprafața pardoselii, conform DTAC cap. 9.5) este suficientă pentru evacuarea debitului de fum calculat prin tiraj termic natural, pe diferența de nivel disponibilă între focarul de proiectare și trapele de acoperiș — marjă superioară celei disponibile la o hală industrială înaltă, exact pentru că înălțimea liberă redusă a sălii de vânzare (4,50-5,20 m) reduce distanța de tiraj disponibilă, dar și pentru că focarul de proiectare adoptat (2,5 MW, risc mediu) este inferior celui specific unui depozit cu risc mare de incendiu.

### PTh-I.3.10 Calcul detaliat — desfumarea mecanică a depozitului

Depozitul (320 mp, risc mare de incendiu prin densitatea de sarcină termică, DTAC cap. 9.1), desfumat mecanic (PTh-I.2.11): debit de proiectare adoptat la **10 schimburi de aer pe oră** în regim de avarie (standard uzual pentru desfumarea mecanică a unui spațiu de depozitare cu risc mare, superior debitului de ventilare normală de 1,5 schimburi/oră adoptat în DTAC cap. 5.4 pentru regimul curent):

**Q_desfumare,depozit = 10 × (320 mp × 4,0 m înălțime medie) = 10 × 1.280 = 12.800 mc/h ≈ 3,6 mc/s**

Ventilatoare de extracție dedicate (rezistente la temperatură ridicată, F400 120, conform clasificării SR EN 12101-3), cu evacuare deasupra acoperișului, la o distanță suficientă de prizele de aer proaspăt ale CTA-urilor sălii de vânzare (evitarea recirculării fumului evacuat înapoi în sistemul de climatizare a sălii, o eroare de proiectare care ar transforma sistemul de desfumare al depozitului într-un vector de contaminare a sălii de vânzare cu fum).

### PTh-I.3.11 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

Coordonarea cu structura clădirii (`structura.md`) impune un tabel explicit al golurilor de trecere necesare pentru fiecare instalație majoră, comunicate proiectantului de structură **înainte de execuția elementelor portante** (goluri prevăzute din proiectare, nu tăiate ulterior):

| Instalație | Element traversat | Poziție orientativă | Dimensiune gol | Observație |
|---|---|---|---|---|
| Trasee agent frigorific rack→gas cooler | perete/planșeu spre acoperiș | ghenă tehnică dedicată | 800×400 mm | verificare izolare/etanșare la foc dacă traversează compartimentare |
| Coloane apă/canalizare menajeră și tehnologică | fundație/pardoseală | lângă grupuri sanitare, zone procesare | Ø150-300 mm/coloană | prevăzute la execuția fundației, nu tăiate ulterior |
| Tubulatură CTA sală | perete despărțitor sală/depozit (dacă e cazul) | zona tehnică | 1.000×600 mm | clapetă antifoc dacă traversează compartimentare |
| Cabluri TD-FRIG/TD-SI | perete camera tehnică rack → sală/depozit | traseu dedicat, separat de curenți slabi | jgheab 400×150 mm | separare tari/slabi conform I7 |
| Conductă sprinkler (riser Zona 1/Zona 2) | planșeu/perete tehnic | colț tehnic, lângă stația de pompare | Ø100-125 mm | verificare încărcare seismică la punctul de prindere |
| Racord branșament apă/canalizare publică | perete exterior/fundație | latura stradală | conform proiect rețele exterioare | manșon etanș |

Toate golurile prin elementele structurale portante necesită avizul explicit al inginerului structurist înainte de execuție — nu se admit găuriri neautorizate în șantier, principiu identic celui aplicat la orice altă funcțiune.

### PTh-I.3.12 Calcul economie energetică din comanda inteligentă a iluminatului (DALI + daylight harvesting)

Extinderea estimării DTAC (cap. 8.2, cap. 11.1 — economie ~55%) cu un calcul orientativ al economiei anuale pentru iluminatul general al sălii de vânzare (10,6 kW instalat, DTAC cap. 8.1):

- funcționare de bază (fără comandă inteligentă, iluminat la nivel constant pe durata programului complet, 14 ore/zi × 365 zile) = 10,6 kW × 14 h × 365 zile = **54.166 kWh/an**;
- cu comandă DALI (daylight harvesting pe orele cu aport natural, unde arhitectura permite, + reducere de nivel în afara programului comercial pentru mentenanță/reaprovizionare nocturnă la ~30% din nivelul de zi, + program orar pe raioanele cu trafic redus) → factor de utilizare efectiv estimat ≈45% → consum estimat ≈ 54.166 × 0,45 ≈ **24.375 kWh/an**;
- **economie estimată ≈29.800 kWh/an (≈55%)**, confirmând intervalul de sinteză din DTAC (cap. 11.1).

Economia reală depinde de programul de funcționare efectiv al magazinului (program comercial complet vs. redus în zilele de weekend/sărbători) și de aportul real de lumină naturală al amplasamentului concret, recalibrată după PIF pe baza jurnalului de funcționare al BMS (PTh-I.2.14).

### PTh-I.3.13 Calcul reumplerii rezervei de apă pentru incendiu

Rezervorul de incendiu adoptat (DTAC cap. 9.2, ~200-300 mc; se adoptă, la execuție, valoarea de **250 mc**, mediană a intervalului) trebuie reumplut, conform practicii NP 086, într-un interval care nu compromită disponibilitatea rezervei pentru un eventual al doilea eveniment de incendiu, uzual adoptat la **≤8 ore** pentru rezervoare de această dimensiune:

**Q_reumplere = V/t = 250.000 l/(8×3.600 s) = 250.000/28.800 = 8,68 l/s**

Branșamentul de reumplere a rezervorului (distinct de branșamentul de consum curent al clădirii, DN 65, dimensionat la q_c = 4,0 l/s, DTAC cap. 2.4) se dimensionează la un debit suplimentar dedicat de reumplere, verificat la presiunea disponibilă de rețea publică (3,2 bar) — dacă rețeaua publică nu poate asigura simultan consumul curent al clădirii și debitul de reumplere calculat, se adoptă un branșament de reumplere separat sau se acceptă un timp de reumplere superior (cu acordul explicit al avizatorului ISU, dat fiind riscul asociat unei rezerve de incendiu indisponibile pe o durată mai lungă).

### PTh-I.3.14 Breviar producție fotovoltaică lunară estimată

Distribuția lunară a producției anuale estimate (220.000-280.000 kWh, DTAC cap. 11.2), pe baza profilului tipic de radiație solară pentru zona climatică a României — se adoptă, pentru breviarul PTh, valoarea mediană **E_an = 250.000 kWh**:

| Lună | Fracție din producția anuală | Producție estimată (kWh) |
|---|---|---|
| Ianuarie | 3,5% | 8.750 |
| Februarie | 5,0% | 12.500 |
| Martie | 8,0% | 20.000 |
| Aprilie | 10,5% | 26.250 |
| Mai | 12,0% | 30.000 |
| Iunie | 12,5% | 31.250 |
| Iulie | 13,0% | 32.500 |
| August | 12,0% | 30.000 |
| Septembrie | 9,5% | 23.750 |
| Octombrie | 6,5% | 16.250 |
| Noiembrie | 4,0% | 10.000 |
| Decembrie | 3,5% | 8.750 |
| **Total** | **100%** | **250.000** |

Se observă coincidența deja argumentată exhaustiv în DTAC (cap. 11.2) între lunile de producție maximă (mai-august, ≈49,5% din producția anuală) și lunile de sarcină de răcire maximă a instalației frigorifice și a climatizării sălii (DTAC cap. 5.3, 6.3) — coincidență care fundamentează autoconsumul de peste 90% al energiei fotovoltaice produse, fără a necesita stocare sau injecție semnificativă în rețea.

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Rack compresoare booster CO₂ (MT+LT)

| Parametru | Valoare |
|---|---|
| Configurație | booster transcritic R744, 4 compresoare MT + 2 compresoare LT |
| Capacitate MT instalată | 170 kW (proiectare 160 kW) |
| Capacitate LT instalată | 55 kW (proiectare 50 kW) |
| Presiune de proiectare circuit HP | ≥ 120 bar |
| Compresoare cu variator de turație | 1 pe MT, 1 pe LT |
| Alimentare electrică | 400 V/3F, conform PTh-I.3.6 |
| Recuperare de căldură | schimbător desuperheat integrat, 185 kW |
| Protecție/siguranță | detector CO₂ dublu prag + ventilare de avarie cameră tehnică |
| Monitorizare | integrare HACCP + BMS (temperaturi, presiuni, alarme) |

### PTh-I.4.2 Fișă tehnică — Gas cooler (acoperiș)

| Parametru | Valoare |
|---|---|
| Tip | răcit cu aer, ventilatoare EC |
| Capacitate de respingere căldură | ≥278 kW (Q_cond de proiectare) |
| Reglaj | modulant pe presiune de refulare, funcție de temperatura ambientală |
| Amplasare | acoperiș, coordonat cu poziția modulelor fotovoltaice (PTh-I.2.15) |
| Protecție acustică | verificare nivel zgomot la limita de proprietate, conform normelor de mediu |

### PTh-I.4.3 Fișă tehnică — Vitrină frigorifică multideck MT (uși de sticlă)

| Parametru | Valoare |
|---|---|
| Temperatură de regim | +2…+4 °C |
| Configurație | rafturi deschise pe verticală, echipate cu uși de sticlă |
| Putere frigorifică specifică | ≈1,1 kW/ml (produse ambalate, densitate medie) |
| Degivrare | prin aer (oprire compresor + circulație aer ambiant) |
| Iluminat integrat | LED, fără sarcină termică suplimentară semnificativă |
| Economie energetică ușile de sticlă | 30-40% față de vitrină echivalentă deschisă |

### PTh-I.4.4 Fișă tehnică — Vitrină congelate LT (tip capac)

| Parametru | Valoare |
|---|---|
| Temperatură de regim | −18…−22 °C |
| Configurație | deschidere orizontală (capac), limitează evacuarea aerului rece dens |
| Putere frigorifică specifică | ≈0,7 kW/ml |
| Degivrare | electrică (necesară la temperaturi foarte scăzute) |

### PTh-I.4.5 Fișă tehnică — Cameră frigorifică prefabricată (pozitivă/negativă)

| Parametru | Valoare |
|---|---|
| Panouri | prefabricate, izolație PU |
| Grosime izolație | 100 mm (pozitive) / 150 mm (negative) |
| Pardoseală | antiîngheț (cablu/covor electric) — obligatorie la camerele negative |
| Uși | tip frig, garnituri etanșe, cortină PVC/aer la trecerile frecvente |
| Siguranță | deschidere de urgență din interior + buton alarmă + semnalizare exterioară |
| Condens | gardă hidraulică încălzită (camere negative) |
| Termometru | montat vizibil pe exteriorul ușii |

### PTh-I.4.6 Fișă tehnică — Centrală de tratare aer (CTA) sală de vânzare

| Parametru | Valoare |
|---|---|
| Debit nominal | 7.000 mc/h/unitate (2 unități) |
| Recuperator | entalpic, η ≥75% |
| Filtrare | ePM10 (admisie) + ePM1 50% (refulare finală) |
| Baterie încălzire | alimentată prioritar din bucla de recuperare frig (tampon 1.000 l) |
| Baterie răcire | agent frigorific dedicat/chiller |
| Ventilatoare | EC, reglaj VAV pe CO₂ |
| Automatizare | senzori CO₂ sală + by-pass recuperator + presostate filtre |

### PTh-I.4.7 Fișă tehnică — Electropompă principală incendiu

| Parametru | Valoare |
|---|---|
| Putere | 30 kW, 400 V/3F |
| Debit/presiune de proiect | Q ≈47,5 l/s la H ≈60-65 mCA |
| Pornire | stea-triunghi/soft-starter, evaluare la furnizor (PTh-I.3.7) |
| Standard | SR EN 12845 |
| Testare | racord de probă, manometru, drenaj de test |

### PTh-I.4.8 Fișă tehnică — Pompă Diesel de rezervă incendiu

| Parametru | Valoare |
|---|---|
| Motor | Diesel, pornire automată la cădere presiune/alimentare electrică |
| Autonomie combustibil | ≥3 ore la debit nominal |
| Acumulator | dublu, cu încărcător de întreținere permanentă |
| Evacuare gaze | conductă dedicată, terminal exterior |

### PTh-I.4.9 Fișă tehnică — Pompă jockey

| Parametru | Valoare |
|---|---|
| Putere | 2,2 kW |
| Rol | menținere presiune de regim, pornire la mici variații, evitând pornirea inutilă a pompelor principale |

### PTh-I.4.10 Fișă tehnică — Centrală IDSAI + detecție aspirativă (ASD)

| Parametru | Valoare |
|---|---|
| Tip | adresabilă, minim 2 bucle |
| Componente | detectoare optice + termice + ASD (depozit) |
| Standard | SR EN 54 (seria, inclusiv partea 20 pentru ASD) |
| Alimentare | TD-SI, cu UPS dedicat |

### PTh-I.4.11 Fișă tehnică — Sistem EAS (antifurt electronic)

| Parametru | Valoare |
|---|---|
| Tehnologie | AM sau RF (conform soluției adoptate de operator) |
| Amplasare | antene la ieșirile sălii de vânzare, dezactivatoare la case |
| Integrare | rețea date/POS, comutare automată la finalizarea tranzacției |

### PTh-I.4.12 Fișă tehnică — NVR și camere CCTV

| Parametru | Valoare |
|---|---|
| Tip cameră | IP, iluminare IR pentru zone fără iluminat nocturn |
| Rezoluție | minim 4 MP |
| Retenție NVR | ≥30 zile, array RAID |
| Standard | SR EN 62676 |

### PTh-I.4.13 Fișă tehnică — Actuator trapă de desfumare

| Parametru | Valoare |
|---|---|
| Acționare | electrică, 24 V DC |
| Comandă | automată (IDSAI, canton sală) + manuală (nivelul solului) |
| Alimentare | TD-SI, UPS |

### PTh-I.4.14 Fișă tehnică — Grup electrogen

| Parametru | Valoare |
|---|---|
| Putere | 250 kVA |
| Comutare (ATS) | ≤15 secunde |
| Autonomie | 8 ore la sarcină priorizată (TD-FRIG + TD-SI + TD-CASE) |
| Combustibil | motorină, rezervor dimensionat pentru autonomia declarată |

### PTh-I.4.15 Fișă tehnică — Tablou General de Distribuție (TGD)

| Parametru | Valoare |
|---|---|
| Alimentare | PT propriu 630 kVA |
| Protecție generală | întrerupător automat, curent de rupere conform calculului de scurtcircuit |
| Compensare cos φ | baterie de condensatoare, cos φ 0,80→0,95 |
| Protecție supratensiuni | SPD tip 1+2 |

### PTh-I.4.16 Fișă tehnică — Baterie de condensatoare (compensare cos φ)

| Parametru | Valoare |
|---|---|
| Reglaj | automat, în trepte, comandat de releu de factor de putere |
| Putere reactivă necesară | calculată pentru trecerea de la cos φ 0,80 la 0,95 la Pc ≈250,5 kW |
| Protecție | siguranțe dedicate pe fiecare treaptă |

### PTh-I.4.17 Fișă tehnică — Boiler ACM

| Parametru | Valoare |
|---|---|
| Volum | 500 litri, bivalent |
| Surse | centrală termică (cazane cascadă) + preîncălzire din bucla de recuperare frig |
| Regim antilegionella | stocare ≥60 °C, retur recirculare ≥50 °C, dezinfecție termică periodică 60 °C |

### PTh-I.4.18 Fișă tehnică — Separator de grăsimi

| Parametru | Valoare |
|---|---|
| Dimensiune | NS 7 |
| Volum acumulare nămol | 1.400 litri |
| Standard | SR EN 1825-1/2 |
| Monitorizare | senzor de nivel, alarmă vidanjare |

### PTh-I.4.19 Fișă tehnică — Invertor fotovoltaic (string)

| Parametru | Valoare |
|---|---|
| Tip | string, ≈6 unități × 30 kW |
| Randament | ≥98% |
| Protecție | anti-islanding, SPD AC clasa II |
| Monitorizare | portal producție per invertor/string, integrare BMS |

---

## PTh-I.5 Probe și verificări detaliate

### PTh-I.5.1 Verificări electrice PRAM (priză de pământ, rezistență de izolație, continuitate)

| Verificare | Metodă | Criteriu de admisie |
|---|---|---|
| Rezistență priză de pământ | măsurare cu telurometru | R ≤1 Ω (DTAC cap. 7.5) |
| Rezistență de izolație circuite | megohmetru, 500-1.000 V | ≥0,5 MΩ pe circuit (conform I7) |
| Continuitatea conductoarelor de protecție | ohmetru de mică rezistență | conform I7, verificare pe fiecare tablou |
| Funcționare protecție diferențială (RCD) | buton de test + declanșator | declanșare la timp/curent conform clasei RCD |
| Cădere de tensiune la sarcină nominală | măsurare directă pe circuitele critice (TD-FRIG, TD-SI) | conform valorilor din PTh-I.3.6 |

### PTh-I.5.2 Fișă tehnică — Rezervor de incendiu (250 mc)

| Parametru | Valoare |
|---|---|
| Volum | 250 mc |
| Compartimentare | minim 2 compartimente (mentenanță fără golirea completă) |
| Reumplere | Q ≥8,68 l/s (PTh-I.3.13) |
| Monitorizare nivel | senzor + transmisie alarmă nivel minim la BMS |

### PTh-I.5.3 Fișă tehnică — Separator de grăsimi (verificare la PIF)

| Verificare | Criteriu |
|---|---|
| Etanșeitate la montaj | probă cu apă, fără infiltrații |
| Funcționare flotație | verificare vizuală separare strat gras la debit de test |
| Alarmă de nivel | verificare funcțională la simulare nivel critic |
| Acces vidanjare | verificat conform proiect, accesibil utilajului de vidanjare |

---

## PTh-I.6 Tehnologia de montaj (caiet de sarcini)

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Execuție rețele îngropate (canalizare menajeră/tehnologică, pluvială, branșamente) — înainte de turnarea pardoselii;
2. Montaj priză de pământ de fundare (coordonat cu structura, înainte de închiderea fundației);
3. Montaj coloane verticale în ghene tehnice (apă, canalizare, agent frigorific) — coordonat cu golurile din PTh-I.3.11;
4. Montaj camere frigorifice prefabricate (panouri, pardoseală antiîngheț) — după finalizarea pardoselii sălii/depozitului, înainte de montajul mobilierului frigorific;
5. Montaj rack compresoare, gas cooler (acoperiș), trasee de agent frigorific — inclusiv testare de etanșeitate (PTh-I.6.5), înainte de izolare;
6. Montaj CTA, tubulatură de ventilare, anemostate — coordonat cu poziția vitrinelor frigorifice (PTh-I.2.4);
7. Montaj tablouri electrice, cablare, corpuri de iluminat;
8. Montaj mobilier frigorific de vânzare (vitrine) — după finalizarea instalației electrice și a rețelei de agent frigorific din zona sălii;
9. Montaj instalație de sprinklere/hidranți, IDSAI, EAS/CCTV/control acces;
10. Montaj instalație fotovoltaică (acoperiș) — după finalizarea tuturor echipamentelor tehnice de acoperiș (gas cooler, CTA, trape desfumare), pentru coordonarea corectă a suprafeței disponibile;
11. Probe și PIF (PTh-I.7);
12. Recepția fazelor determinante și predarea Cărții tehnice (PTh-I.8).

### PTh-I.6.2 Susțineri și fixări

Conductele de agent frigorific se susțin la interax conform recomandării producătorului (funcție de diametru), cu suporturi care nu transmit vibrația compresoarelor către structură (elemente antivibratile la traversarea planșeelor/pereților) și cu prindere verificată la solicitarea seismică pentru conductele de diametru mare din camera tehnică a rack-ului. Conductele PSI (sprinklere, hidranți) se susțin conform SR EN 12845, cu bride antiseismice pe traseele principale, în special la traversările verticale (riser-e) și la schimbările de direcție ale colectoarelor de refulare.

### PTh-I.6.3 Izolații termice

- Conducte de apă rece/agent frigorific de aspirație (partea rece a circuitului MT/LT): izolație anticondens, cauciuc sintetic, grosime majorată pe tronsoanele LT (temperaturi foarte scăzute);
- Conducte de apă caldă/recirculare ACM: izolație termică minerală/elastomerică, conform C107;
- Tronsoane de agent frigorific la desuperheat (temperatură ridicată, 80-100 °C): protecție la contact accidental, nu neapărat izolare termică completă (unde se dorește disiparea intenționată de căldură reziduală, izolarea ar fi contraproductivă);
- Panouri camere frigorifice: verificare la montaj a continuității izolației la îmbinări (bariera de vapori nu trebuie compromisă, altfel apare condens/îngheț în structura panoului).

### PTh-I.6.4 Treceri etanșe la foc

Toate traversările de compartimentare la foc (perete/planșeu între sală, depozit, camera tehnică a rack-ului, spații tehnice) se etanșează cu sisteme certificate, cu clasă de rezistență la foc egală sau superioară elementului traversat, conform P118-1 și fișelor tehnice ale producătorului de sisteme de etanșare; se acordă atenție specifică traversărilor de conducte de agent frigorific și de cablu electric de la camera rack-ului (compartiment cu risc particular, dat fiind conținutul de agent sub presiune și componentele electrice ale compresoarelor).

### PTh-I.6.5 Montaj și testare trasee agent frigorific (rack CO₂)

Îmbinările conductelor de agent frigorific se realizează prin brazare (argint, pentru presiunile ridicate ale circuitului CO₂ transcritic, DTAC cap. 6.3), sub atmosferă de azot (previne oxidarea internă a conductei la temperatura de brazare, care ar genera reziduuri ce contaminează circuitul și pot bloca ulterior orificiile calibrate ale valvelor de expansiune). După montaj, întregul circuit se supune:

1. **Probă de presiune cu azot** — la o presiune superioară presiunii maxime de lucru (conform SR EN 378-2), cu verificarea etanșeității pe toate îmbinările (spumă de detecție sau detector electronic de scurgeri) și menținerea presiunii pe o durată suficientă pentru a exclude scurgeri lente;
2. **Vidare** — extracția aerului și a umidității reziduale din circuit, până la un nivel de vid confirmat prin măsurarea ratei de creștere a presiunii pe o durată de referință (verificarea absenței umidității reziduale, care ar forma gheață în valvele de expansiune și ar contamina agentul frigorific);
3. **Încărcarea cu agent frigorific** (CO₂) — cantitatea încărcată conform fișei tehnice a rack-ului, cu verificarea nivelului corect prin sticla de nivel/senzor al buteliei de lichid;
4. **Probă funcțională la sarcină parțială**, progresiv crescută, cu verificarea temperaturilor de vaporizare/condensare și a suprarăcirii/supraîncălzirii la fiecare compresor, înainte de conectarea efectivă a mobilierului frigorific la circuit.

### PTh-I.6.6 Montaj cablare structurată curenți slabi

Cablarea Cat.6A se pozează în trasee separate fizic de cablarea de curenți tari (I7), cu distanțe minime de paralelism conform SR EN 50173; traseele CCTV/EAS/control acces convergente către rack-ul de comunicații se etichetează individual la ambele capete, pentru identificare rapidă la mentenanță. Cablarea antenelor EAS și a dezactivatoarelor de la case se coordonează cu poziția definitivă a caselor de marcat (confirmată la shop-drawing cu operatorul, conform particularității de proiectare "built-to-suit" deja semnalate) — o repoziționare ulterioară a unei case de marcat, fără coordonare cu traseul de cablare deja executat, ar necesita refacere parțială a instalației.

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrare hidraulică — sprinkler și hidranți

Verificarea presiunilor la punctele de test (racorduri de probă) ale Zonei 1 (sală) și Zonei 2 (depozit), comparate cu valorile de calcul din PTh-I.3.1-PTh-I.3.2; ajustarea, dacă e necesar, a robinetelor de reglaj de pe traseele secundare pentru echilibrarea debitelor între ramuri, fără a compromite presiunea minimă la capul cel mai defavorabil.

### PTh-I.7.2 Reglaj aeraulic — CTA și vitrine

Măsurarea debitelor de aer la fiecare anemostat/grilă (anemometru cu fir cald sau tub Pitot, funcție de viteza locală), comparație cu debitele de proiect (PTh-I.2.4), reglaj al clapetelor de balans; verificare specifică a **absenței interferenței aeraulice** între jetul anemostatelor și cortina de aer a vitrinelor multideck deschise, prin măsurarea vitezei și direcției curentului de aer în imediata vecinătate a vitrinelor la debitul de proiect al CTA — verificare care nu are echivalent la reglajul aeraulic al unei clădiri comerciale fără mobilier frigorific.

### PTh-I.7.3 Protocol PIF instalație frigorifică

1. Verificarea integrității probelor de presiune și de vid documentate la montaj (PTh-I.6.5);
2. Primă pornire progresivă a compresoarelor, în ordine (secvențiere pentru evitarea vârfului de curent cumulat, PTh-I.3.7);
3. Reglarea presiunilor de referință pe fiecare palier (MT/LT), verificarea funcționării valvelor de expansiune electronice;
4. Verificarea temperaturilor de regim la fiecare vitrină/cameră frigorifică conectată, comparativ cu valorile de proiect (DTAC cap. 1.4);
5. Verificarea funcționării schimbătorului de desuperheat (temperatura/debitul apei din bucla de recuperare, comparativ cu proiectul PTh-I.3.8);
6. Verificarea ciclurilor de degivrare (programare, durată, revenire la temperatura de regim în timpul specificat);
7. Verificarea alarmelor HACCP (simulare abatere de temperatură, verificare timp de reacție și de notificare la distanță).

### PTh-I.7.4 Programare BMS/IDSAI

Încărcarea integrală a matricei cauză-efect (PTh-I.2.10) în centrala IDSAI, cu testare pe fiecare scenariu documentat (declanșare pe fiecare zonă de detecție, verificare a secvenței complete de efecte); programarea în BMS a logicii de prioritate a recuperării de căldură (DTAC cap. 4.5), a reglajului VAV pe CO₂ (DTAC cap. 5.5), a programului DALI/daylight harvesting (DTAC cap. 8.2) și a ciclurilor de degivrare coordonate cu vârfurile de putere ale clădirii (PTh-I.3.12).

### PTh-I.7.5 Probă funcțională stație de pompare incendiu

Verificarea pornirii automate a pompei jockey la scădere mică de presiune, a pornirii pompei principale la scăderea de presiune corespunzătoare deschiderii efective a unui cap de sprinkler/hidrant, a comutării automate pe pompa Diesel de rezervă la simularea unei defecțiuni a pompei electrice principale sau a unei căderi de alimentare electrică, și a debitului/presiunii realizate la racordul de probă, comparativ cu valorile de calcul (PTh-I.3.1-PTh-I.3.3).

### PTh-I.7.6 Protocol PIF EAS/CCTV/control acces/POS

Verificarea funcționării fiecărei porți EAS la trecerea unei etichete active (declanșare alarmă) și a unei etichete dezactivate corect la casă (fără declanșare); verificarea corelării imaginii CCTV cu momentul alarmei EAS (sincronizare de timp între sistemele NVR și centrala EAS); testarea fiecărui cititor de control acces (autorizare corectă, jurnal de evenimente) și verificarea deblocării fail-safe la simularea unei alarme de incendiu confirmate; verificarea integrării dezactivatoarelor EAS cu fiecare poziție POS (anulare automată la finalizarea tranzacției).

### PTh-I.7.7 Probă HACCP — validare completă a monitorizării și alarmării

Verificarea, pentru fiecare vitrină și cameră frigorifică conectată la sistemul de monitorizare, a acurateței sondei de temperatură (comparație cu un termometru de referință calibrat), a intervalului de înregistrare (continuă, nu punctuală) și a arhivării corecte pe durata impusă (12 luni, DTAC cap. 6.6); simularea unei depășiri de prag și verificarea timpului real de alarmare (locală și la distanță, SMS/notificare); simularea unei pene de alimentare a unui echipament frigorific și verificarea detectării/alarmării independent de starea rețelei electrice generale (sursă de rezervă a sistemului de monitorizare, distinctă de alimentarea echipamentului monitorizat, pentru a putea semnala inclusiv o pană totală).

### PTh-I.7.8 Protocol PIF instalație fotovoltaică

Verificarea izolației și a polarității pe fiecare string înainte de conectarea la invertor, verificarea funcției anti-islanding la simularea unei căderi a rețelei publice, verificarea producției reale față de cea estimată (PTh-I.3.14) pe un interval de referință de câteva zile cu condiții meteo cunoscute, și verificarea integrării portalului de monitorizare cu BMS-ul general al clădirii.

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

### PTh-I.8.1 Faze determinante — detaliere

| Fază determinantă | Verificare | Document rezultat |
|---|---|---|
| Priza de pământ de fundare | rezistență de dispersie, continuitate cu structura | proces-verbal FD + buletin de măsurare |
| Rețele îngropate (canalizare/branșamente) | probă de etanșeitate/scurgere înainte de acoperire | proces-verbal FD + probă la presiune/etanșeitate |
| Montaj camere frigorifice (panouri) | continuitatea izolației, etanșeitatea îmbinărilor | proces-verbal FD |
| Trasee agent frigorific (înainte de izolare) | probă de presiune cu azot + vidare (PTh-I.6.5) | proces-verbal FD + buletin de probă |
| Rețea sprinklere/hidranți (înainte de finisaje) | probă de presiune hidraulică conform SR EN 12845 | proces-verbal FD |
| Treceri etanșe la foc | conformitatea cu sistemele certificate | proces-verbal FD + fișe produs |
| PIF instalație frigorifică | conform PTh-I.7.3 | protocol PIF semnat |
| PIF PSI (stație pompare, IDSAI) | conform PTh-I.7.4-PTh-I.7.5 | protocol PIF semnat, aviz ISU |
| Recepția finală instalații | verificare integrală față de proiect | proces-verbal de recepție |

### PTh-I.8.2 Cartea tehnică a construcției — capitol instalații

Cartea tehnică include, pentru capitolul instalații: prezentul supliment PTh și memoriul DTAC, toate procesele-verbale ale fazelor determinante de mai sus, buletinele de probă (presiune sprinklere/hidranți, presiune/vid circuit frigorific, PRAM electric), certificatele de conformitate ale echipamentelor majore (PTh-I.4), protocoalele de PIF semnate (PTh-I.7), avizul ISU pentru scenariul de securitate la incendiu, avizul DSVSA pentru lanțul de frig și fluxurile de procesare alimentară (conform DTAC cap. 13.2), și planurile "as-built" ale tuturor rețelelor, actualizate cu orice modificare de execuție față de proiectul inițial.

---

## PTh-I.9 Calcul iluminat interior și de siguranță — luminotehnica comercială (NP 061, SR EN 12464-1)

### PTh-I.9.1 Metoda de calcul (flux luminos)

**Φ = E × A/(u × m)**, unde E = nivelul de iluminare de proiect (lx), A = suprafața zonei (mp), u = factorul de utilizare (geometrie, reflectanțe, distribuție fotometrică), m = factorul de mentenanță (degradare în timp + murdărire). Metoda se aplică diferențiat pe fiecare zonă funcțională, cu factori u/m adaptați specificului fiecărui spațiu (o cameră frigorifică, de exemplu, are reflectanțe reduse — panouri metalice deschise, dar suprafață compactă — și un factor de mentenanță mai sever, dat fiind mediul cu umiditate/condens).

### PTh-I.9.2 Cerințe de iluminare pe categorii de zone (SR EN 12464-1)

| Zonă | E (lx) | UGR | Ra |
|---|---|---|---|
| Sală — iluminat general | 500 | ≤22 | ≥80 |
| Sală — accent raioane proaspete | 750-1.000 | ≤22 | ≥90 |
| Vitrine frigorifice (iluminat integrat) | conform mobilierului, completat de general | — | ≥90 |
| Case de marcat | 500 | ≤19 | ≥80 |
| Depozit | 200 | ≤25 | ≥60 |
| Camere frigorifice | 150 | ≤25 | ≥60 |
| Birouri | 500 | ≤19 | ≥80 |
| Vestiare/GS | 200 | ≤25 | ≥80 |
| Exterior (parcare, acces) | 20-50 | — | ≥40 |

### PTh-I.9.3 Calcul detaliat — sala de vânzare, iluminat general (reconfirmare la execuție)

Reconfirmarea calculului DTAC (cap. 8.1) la nivel de execuție, cu factorii u/m adoptați pentru geometria reală a sălii (înălțime liberă 4,50 m, reflectanțe rafturi/pardoseală):

**Φ = 500 × 1.500/(0,65 × 0,80) = 750.000/0,52 = 1.442.308 lm**

La corpuri LED industriale de **15.000 lm**: **N = 1.442.308/15.000 ≈ 96 corpuri**, putere totală **~10,6 kW** (identic DTAC — verificare de coerență confirmată).

### PTh-I.9.4 Calcul detaliat — accent luminotehnic raioane produse proaspete

Pentru zona de raioane cu rol de marketing vizual (DTAC cap. 8.1), adoptată la o suprafață orientativă de **~150 mp** (raioane de fructe/legume, carne, panificație — confirmată exact la shop-drawing cu planul de merchandising), la nivelul de accent E = 900 lx (mediana intervalului 750-1.000 lx):

**Φ_accent = 900 × 150/(0,65 × 0,80) = 135.000/0,52 = 259.615 lm**

La spoturi LED de accent, **3.000 lm/buc., Ra ≥90**: **N = 259.615/3.000 ≈ 87 spoturi**, la o eficiență de ~125 lm/W: putere totală **≈2,1 kW** — valoare identică cu cea reținută în bilanțul electric PTh-I.3.6 (circuit CI-2).

**Temperatura de culoare pe raion** (reconfirmare execuție, DTAC cap. 8.2): 2.700-3.000 K la raionul de carne (accentuare tonuri roșii/roz), 4.000 K la raionul de legume/fructe (accentuare verde/culori vii), 3.000 K la panificație/patiserie (accentuare tonuri aurii). Fiecare grup de spoturi se cablează pe circuit DALI distinct, adresabil individual pe raion, pentru a permite operatorului ajustarea ulterioară a temperaturii de culoare/nivelului la o eventuală reconfigurare a planului de merchandising, fără intervenție asupra cablării.

### PTh-I.9.5 Calcul detaliat — iluminat integrat vitrine frigorifice

Vitrinele frigorifice de vânzare (DTAC cap. 6.5, iluminat LED integrat, fără sarcină termică suplimentară semnificativă) — putere specifică adoptată **15 W/ml** la vitrinele MT (multideck cu uși de sticlă, cerință de vizibilitate ridicată a produsului prin sticlă) și **10 W/ml** la vitrinele LT (capac, vizibilitate secundară față de iluminatul general al sălii):

| Categorie | Lungime (ml, DTAC cap. 6.4) | Putere specifică | Putere totală |
|---|---|---|---|
| Vitrine multideck MT | 60 | 15 W/ml | 0,90 kW |
| Vitrine MT alte tipuri | 40 | 15 W/ml | 0,60 kW |
| Vitrine congelate LT | 25 | 10 W/ml | 0,25 kW |
| **Total** | **125 ml** | — | **1,75 kW** |

Valoare identică celei reținute în bilanțul electric PTh-I.3.6 (circuit CI-3), cu LED-uri rezistente la temperaturile de operare specifice fiecărui palier (rezistență la frig extrem pe LT, unde componentele electronice standard pot avea comportament degradat la −20 °C fără o selecție dedicată).

### PTh-I.9.6 Calcul detaliat — depozit, camere frigorifice, birouri, vestiare

| Zonă | A (mp) | E (lx) | u | m | Φ (lm) | Corp adoptat (lm) | N | Putere estimată |
|---|---|---|---|---|---|---|---|---|
| Depozit | 320 | 200 | 0,65 | 0,80 | 123.077 | 8.000 (highbay mic) | 16 | 0,96 kW |
| Camere frigorifice (total ~84 mp) | 84 | 150 | 0,55 | 0,75 | 30.545 | 3.000 (etanș, rezistent la frig) | 11 | 0,35 kW |
| Birouri/back-office | 360 | 500 | 0,65 | 0,80 | 346.154 | 6.000 (panel LED) | 58 | 3,30 kW |
| Vestiare personal | 155 | 200 | 0,60 | 0,75 | 68.889 | 4.000 | 18 | 0,65 kW |

Corpurile de la camerele frigorifice sunt de tip **etanș (IP65), rezistent la frig**, cu carcasă și componentă electronică certificate pentru funcționare continuă la temperaturile de regim ale camerelor negative — o selecție de corp standard, neetanș, ar avea, la aceste temperaturi, un risc ridicat de condens intern și de defectare prematură a driverului LED.

### PTh-I.9.7 Sinteză putere instalată iluminat

| Categorie | Putere (kW) |
|---|---|
| Iluminat general sală | 10,60 |
| Accent raioane | 2,10 |
| Vitrine frigorifice (integrat) | 1,75 |
| Depozit | 0,96 |
| Camere frigorifice | 0,35 |
| Birouri/back-office | 3,30 |
| Vestiare | 0,65 |
| Exterior (PTh-I.9.8) | 2,20 |
| **TOTAL** | **≈21,9 kW** |

Valoare superioară celei de 22,5+12 = 34,5 kW consumatori de iluminat reținute în bilanțul global DTAC (cap. 7.2, care include suplimentar rezerve de proiectare și eventuale corpuri de accent/vitrină deja incluse global) — verificare de ordin de mărime confirmată, cu diferența explicată prin marjele de proiectare adoptate în DTAC la nivel de bilanț global, rafinate la execuție prin calculul zonă-cu-zonă de mai sus.

### PTh-I.9.8 Calcul detaliat iluminat exterior — parcare și fațadă

Pentru suprafața de parcare/platforme exterioare (adoptată orientativ la ~3.700-3.800 mp, proporțională bilanțului teritorial al parcelei), la un nivel mediu de proiect E = 20 lx (nivel de siguranță/orientare, uzual pentru parcări comerciale):

**Φ_ext = 20 × 3.740/(0,40 × 0,75) = 74.800/0,30 = 249.333 lm**

La stâlpi de iluminat cu corp LED de **12.000 lm/buc.** (eficiență ~130 lm/W): **N = 249.333/12.000 ≈ 21 stâlpi**, putere totală **≈2,0 kW**, la care se adaugă iluminatul de accent al fațadei (logo/vitrine spre exterior, relevant pentru vizibilitatea comercială nocturnă, DTAC cap. 6.3 — argument de marketing vizual similar celui al raioanelor interioare) estimat la **≈0,2 kW** — total exterior **≈2,2 kW**, valoare reținută la PTh-I.9.7.

### PTh-I.9.9 Iluminat de siguranță și evacuare — dispunere și calcul de autonomie (SR EN 1838)

Reluând nivelurile de proiect deja stabilite în DTAC (cap. 8.3: 1 lx pe axul căilor de evacuare, 5 lx la punctele de sarcină specifică, 0,5 lx antipanică în sala de vânzare), dispunerea corpurilor la execuție:

| Zonă | Criteriu de dispunere | Nr. corpuri orientativ |
|---|---|---|
| Sala de vânzare (antipanică, 0,5 lx pe suprafață deschisă) | ~1 corp/50-60 mp, uniformitate pe zona liberă de circulație | ≈27 |
| Căi de evacuare (1 lx pe ax + 5 lx la puncte de sarcină) | distanță max. 30 m între corpuri + la fiecare ușă/schimbare de direcție | ≈18 |
| Depozit + spații tehnice + back-office | conform traseelor interne de evacuare | ≈15 |
| **Total** | — | **≈60 corpuri** |

Toate corpurile sunt echipate cu **acumulator individual, autonomie ≥1 oră**, cu **supraveghere adresabilă centralizată** (verificare automată periodică a stării de funcționare/încărcare, cu semnalarea oricărei defecțiuni la panoul central, înainte ca aceasta să devină critică într-o situație reală de urgență) — reluând, la nivel de dispunere de execuție, principiul deja stabilit în DTAC.

---

## PTh-I.10 Breviar de calcul suplimentar securitate la incendiu (instalații)

### PTh-I.10.1 Verificare timp de funcționare pompe vs. timp de intervenție ISU

Autonomia de proiectare a stației de pompare (60 minute la sprinklere + rezerva pentru hidranți, DTAC cap. 9.2) se verifică față de timpul estimat de intervenție a echipelor ISU pentru amplasamentul concret (distanța până la cea mai apropiată unitate de intervenție, confirmată la faza de scenariu de securitate la incendiu) — la un timp de intervenție tipic urban de 10-15 minute, autonomia de 60 minute a rezervei de apă de incendiu oferă o marjă amplă, care acoperă atât timpul de deplasare, cât și primele faze de intervenție efectivă înainte ca eventuale surse externe de apă (autospeciale cu cisternă proprie, hidranți publici de rețea) să devină relevante.

### PTh-I.10.2 Coloană uscată — verificare necesitate

Dat fiind regimul de înălțime redus al clădirii (P + mezanin tehnic, DTAC cap. 1.2, fără niveluri suprapuse de sală de vânzare), **coloana uscată nu este necesară** — accesul echipelor de intervenție la orice punct al clădirii se realizează direct, de la nivelul solului, prin hidranții interiori/exteriori deja dimensionați (PTh-I.2.2), fără a fi necesară o coloană verticală dedicată de alimentare a etajelor superioare, cerință specifică clădirilor cu regim de înălțime ridicat, nu prezentului obiectiv.

### PTh-I.10.3 Protecția la incendiu a rampei de recepție marfă

Rampa de recepție (interfața cu fluxul de aprovizionare, `general.md` cap. 4.3) se tratează, la nivelul instalațiilor de securitate la incendiu, ca o zonă cu **acces frecvent al vehiculelor de mare tonaj** (camioane de aprovizionare) — hidranții interiori/exteriori din vecinătatea rampei (Hi-4/Hi-5, He-2, PTh-I.2.2) se amplasează astfel încât să nu fie obstrucționați de vehiculele parcate la rampă în așteptarea descărcării, cu marcaj vizual dedicat al zonei de acces liber la hidrant, măsură de organizare de șantier/exploatare care completează dimensionarea hidraulică propriu-zisă.

### PTh-I.10.4 Verificare timp de evacuare orientativ (RSET) vs. timp de dezvoltare a incendiului (ASET)

Pentru sala de vânzare (595 persoane de proiectare, DTAC cap. 1.2), verificarea de principiu a marjei dintre timpul necesar evacuării complete a publicului (RSET — Required Safe Egress Time, funcție de distanța până la ieșiri, lățimea cumulată a căilor de evacuare și densitatea de public) și timpul disponibil până la atingerea condițiilor critice de fum/temperatură la nivelul de respirație (ASET — Available Safe Egress Time, determinat de dezvoltarea penei de fum calculată la PTh-I.3.9): la un focar de proiectare de risc mediu (2,5 MW) și o înălțime liberă de 4,50-5,20 m, cu trapele de desfumare și aerul de compensare dimensionate conform PTh-I.2.11/PTh-I.3.9, marja rezultată dintre ASET și RSET este verificată ca fiind pozitivă și confortabilă pentru scenariul de proiectare — o verificare de detaliu, cu simulare numerică a dezvoltării fumului (model de zonă sau CFD, dacă avizatorul ISU o solicită pentru configurația finală de rafturi/mobiler), se realizează în cadrul scenariului de securitate la incendiu distinct, document avizat de ISU, care nu se dublează în prezentul supliment PTh (conform principiului de nedublare a conținutului între documente, reluat consecvent din DTAC cap. 13.2).

---

## PTh-I.11 Concluzii și corelare finală

Prezentul supliment de fază PTh duce la nivel de execuție întreaga arhitectură tehnică deja stabilită în DTAC (`instalatii.md`), fără a devia de la principiul central acolo argumentat: **instalația frigorifică comercială, cu ambele sale paliere MT/LT servite de rack-ul booster CO₂ transcritic, rămâne elementul care structurează, în cascadă, dimensionarea instalațiilor termice (prin recuperarea de căldură la desuperheat, verificată la execuție la PTh-I.3.8), electrice (prin priorizarea TD-FRIG pe grupul electrogen, PTh-I.2.9) și de securitate la incendiu (prin camera tehnică a rack-ului, tratată cu aceeași rigoare ca orice altă zonă cu risc special, PTh-I.2.3)**. Detalierea de execuție confirmă, prin verificările de coerență realizate la fiecare breviar (PTh-I.3.1, PTh-I.3.2, PTh-I.3.8, PTh-I.9.3), că soluțiile preliminare adoptate la DTAC rezistă la nivelul de precizie superior al calculului nod-cu-nod, fără reconsiderări majore ale dimensionării — situație care validează metodologia de proiectare deja aplicată la faza DTAC și reduce riscul de neconcordanțe la verificarea tehnică a proiectului.

Elementele care necesită confirmare explicită la faza de shop-drawing, cu operatorul de retail (particularitatea beneficiarului "built-to-suit" deja semnalată în `general.md` cap. 1.2), înainte de finalizarea execuției, sunt: poziția definitivă a mobilierului frigorific (relevantă pentru coordonarea aeraulică CTA-vitrine, PTh-I.2.4/PTh-I.7.2), planul de merchandising al raioanelor de produse proaspete (relevant pentru dimensionarea exactă a iluminatului de accent, PTh-I.9.4) și configurația definitivă a rafturilor de depozit (relevantă pentru verificarea finală a densității de stropire a sprinklerelor pe zona de depozitare, PTh-I.3.2). Aceste confirmări nu schimbă principiile de proiectare stabilite în prezentul document, ci calibrează execuția finală pe standardul operațional concret al lanțului de retail beneficiar — exact rolul pe care proiectantul general îl are, conform `general.md` cap. 1.2, în adaptarea unui prototip funcțional la amplasamentul și la beneficiarul concret ai investiției.

---

## ANEXA B — Breviar centralizat PTh (verificare de coerență cu breviarul DTAC)

| Instalație | Valoare DTAC | Valoare PTh (verificare nod-cu-nod/execuție) | Coerență |
|---|---|---|---|
| Sprinklere sală (OH3) | Q = 21,7 l/s | Q = 21,7 l/s (PTh-I.3.1) | ✅ confirmată |
| Sprinklere depozit (HHS) | d 7,5-12,5 mm/min | Q = 43,3 l/s la d=10 mm/min (PTh-I.3.2) | ✅ confirmată |
| Hidranți interiori | 4,2 l/s | 4,2 l/s, p la Hi-5 ≈3,10 bar (PTh-I.3.3) | ✅ confirmată |
| Hidranți exteriori | 20 l/s | 20 l/s, p la He-2 ≈2,10 bar (PTh-I.3.3) | ✅ confirmată |
| Apă menajeră/tehnologică | qc = 4,0 l/s | pierderi totale ≈2,10-2,40 bar < 3,2 bar disponibil (PTh-I.3.4) | ✅ confirmată |
| Canalizare menajeră | q_ww = 4,16 l/s | verificat pe toate coloanele, h/D<0,5 (PTh-I.3.5) | ✅ confirmată |
| Separator de grăsimi | NS 7 | debit vârf 3,85 l/s < capacitate nominală (PTh-I.3.5) | ✅ confirmată |
| Sarcină frigorifică MT | Q₀,MT ≈160 kW | capacitate instalată 170 kW, N-1 = 120 kW/75% (PTh-I.3.8) | ✅ confirmată, cu semnalarea limitei N-1 |
| Sarcină frigorifică LT | Q₀,LT ≈50 kW | capacitate instalată 55 kW, N-1 = 25 kW/50% (PTh-I.3.8) | ✅ confirmată, cu semnalarea limitei N-1 |
| Recuperare de căldură | 170-200 kW | schimbător desuperheat 185 kW (PTh-I.3.8) | ✅ confirmată |
| Putere de calcul electrică | Pc ≈250,5 kW / S ≈272 kVA | confirmat pe circuite (PTh-I.3.6) | ✅ confirmată |
| Curent pornire pompă incendiu | — | 356 A, pornire directă acceptabilă (PTh-I.3.7) | ✅ verificat, decizie documentată |
| Curent pornire compresor MT | — | 488 A, necesită stea-triunghi/soft-starter (PTh-I.3.7) | ⚠ soluție de execuție obligatorie |
| Iluminat general sală | Φ = 1.442.308 lm, N=96, 10,6 kW | identic confirmat (PTh-I.9.3) | ✅ confirmată |
| Rezervă apă incendiu | 200-300 mc | 250 mc adoptat, reumplere 8,68 l/s la 8h (PTh-I.3.13) | ✅ confirmată |
| Producție fotovoltaică anuală | 220.000-280.000 kWh | 250.000 kWh mediană, distribuție lunară (PTh-I.3.14) | ✅ confirmată |

Toate coerențele verificate mai sus confirmă validitatea ipotezelor de dimensionare preliminară din DTAC la nivelul de precizie superior al fazei PTh; singurele elemente care impun o decizie de execuție explicită, dincolo de simpla confirmare (semnalate cu ⚠ în tabel), sunt tratate integral la capitolele dedicate (PTh-I.3.7 pentru pornirea compresorului, PTh-I.3.8 pentru limitele de redundanță N-1 ale rack-ului frigorific) și nu necesită reconsiderarea niciunei alte dimensionări din prezentul document sau din DTAC.
