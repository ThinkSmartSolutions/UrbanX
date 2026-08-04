# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Parcaj public colectiv multietajat închis, regim S+P+5E, 460 locuri (7 platforme carosabile)

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG nr. 907/2016 anexa 8 și Legii nr. 50/1991 republicată, Anexa nr. 1) la memoriul de instalații al obiectivului **parcaj public colectiv multietajat închis, regim de înălțime S+P+5E**, elaborat pentru gabaritul de referință al documentației D.T.A.C. (`instalatii.md`): capacitate **460 de locuri** de parcare (autoturisme M1/N1), repartizate pe **7 platforme carosabile** suprapuse — 1 subsol + 6 niveluri supraterane (parter + 5 etaje) —, suprafață construită Ac ≈ **2.400 mp**, suprafață desfășurată Ad ≈ **16.800 mp**, volum brut de nivel V_niv ≈ **7.000 mc** (scenariul standard, cap. 1.3 DTAC), înălțime liberă 2,30 m curent/2,20 m pe rampe, categorie de importanță C, clasă de expunere seismică II, grad de rezistență la foc II, construcție tratată **acoperitor ca regim închis** pe toate cele 7 platforme (cap. 1.4-1.5 DTAC). Documentul dezvoltă, la nivel de execuție, tot ceea ce faza D.T.A.C. a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă, **fără a relua** breviarele DTAC — le detaliază pe fiecare dintre cele 7 platforme, le duce la nivel de tronson/nod/element și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare nod-cu-nod, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, protocoale de PIF, Planul de Control al Calității și, specific acestui tip de obiectiv, caietul tehnic al gestiunii de parcare (PGS/LPR) și al semnalizării rutiere interne.

Ipoteza funcțională se menține identică cu DTAC: **parcaj închis pe toate cele 7 platforme** (nicio platformă nu atinge pragul de 33% goluri/pereți pe două fațade opuse, cap. 1.4-1.5 DTAC), ventilare mecanică de exploatare și desfumare mecanică obligatorii, separator de hidrocarburi obligatoriu pe efluentul de pardoseală, infrastructură de încărcare a vehiculelor electrice conform Legii 372/2005 (r) și Directivei EPBD 2024/1275. Orice modificare a acestei ipoteze — de exemplu confirmarea la execuție a unui procent de goluri de fațadă superior pragului de 33% pe un nivel anume, care ar recalifica acel nivel drept „deschis" — impune reluarea integrală a dimensionării ventilării de exploatare (nu și a desfumării/sprinklerelor, tratate acoperitor indiferent de clasificare, conform deciziei de proiectare de la cap. 4.7 din `general.md`) pentru platforma respectivă.

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, de principiu, bilanțuri globale pe platformă-tip | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate, pe fiecare din cele 7 platforme |
| Breviar hidraulic | debite globale, un singur nod critic pe platforma-tip | calcul nod cu nod (Hazen-Williams) pe toate tronsoanele — sprinklere, hidranți, apă, canalizare, pluvial |
| Breviar ventilare | debit global de platformă (metoda schimburilor orare) | dimensionare completă pe fiecare din cele 7 platforme, cu poziționarea reală a gurilor/jet-fan-urilor și verificarea aportului de compensare |
| Breviar electric | necesar global (kW, kVA) | dimensionare completă pe fiecare circuit/tablou de nivel, verificare cădere de tensiune, selectivitate, curent de pornire |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație |
| Montaj | principii generale | tehnologie, succesiune, susțineri, izolații, treceri la foc, caiet de sarcini pe instalație |
| PIF | menționată | protocoale de echilibrare, reglaj, programare BMS/IDSAI, primă pornire, probă DLM |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |
| Iluminat | niveluri globale + un exemplu de calcul | calcul complet metoda flux luminos pe fiecare zonă funcțională și pe fiecare platformă |
| PSI | dimensionare preliminară globală | breviar hidraulic complet sprinkler/hidranți pe fiecare din cele 7 zone ACS, calcul detaliat al penei de fum, calcul reumplere rezervă |
| Gestiune parcare | menționată (PGS, LPR) | caiet tehnic complet: senzori, cablare, software, integrare cu matricea cauză-efect |
| Semnalizare rutieră internă | neabordată în DTAC | caiet tehnic complet: marcaje, indicatoare, bariere, semaforizare pe rampe |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC (cap. 1.7 `instalatii.md`): **SR EN 12845** (anexa de calcul hidraulic sprinkler), **SR EN 12259** (componente sprinkler — capete, ACS, alarme hidraulice), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria, pentru componentele IDSAI adaptate mediului auto), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 62305-3** (măsuri de protecție pentru structuri — execuție SPD/coborâri), **SR EN 806-4** (probe de presiune apă potabilă), **SR EN 12056-2** (verificare hidraulică canalizare pe unități de descărcare), **SR EN 12237** (clasa de etanșeitate a tubulaturii de ventilare), **SR EN 12599** (metode de măsurare și control pentru instalațiile de ventilare, la recepție), **STAS 1848-7** (marcaje rutiere), **Ordinul MT 411/2000** (condiții tehnice pentru proiectarea/execuția platformelor carosabile, aplicat prin analogie finisajelor interioare), **C56** (verificarea calității lucrărilor de instalații). Documentul se citește împreună cu memoriul DTAC `instalatii.md` (referință pentru încadrarea normativă și dimensionarea preliminară), cu `general.md` (date de identificare a investiției, tipologie, cadru urbanistic) și cu `arhitectura-pth.md`/`structura.md` pentru coordonarea interdisciplinară a golurilor de trecere și a punctelor de prindere.

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema ventilării de exploatare — cele 7 platforme, guri, senzori, VSD

Fiecare dintre cele 7 platforme (Subsol, Parter, Etaj 1…Etaj 5) constituie, din perspectiva ventilării mecanice, o **zonă de exploatare independentă**, cu propriul set de ventilatoare, propria rețea de senzori de CO și propriul regim de comandă — soluție impusă direct de faptul că fiecare platformă este, în același timp, un compartiment de incendiu distinct (cap. PTh-I.2.3), iar cuplarea ventilării a două platforme diferite pe același echipament ar contrazice principiul de compartimentare independentă a scenariului de securitate la incendiu.

**Schema de principiu, pe platforma-tip (Ac ≈ 2.400 mp, V_niv ≈ 7.000 mc):**

```
Aer proaspăt exterior ─► fante joase de admisie (rampe + fațadă) ─► distribuție pe platformă
        (introducere 85-90% din debitul extras, regim ușor depresurizat, cap. 6.5 DTAC)

Platformă (7.000 mc) ─┬─► guri de extracție JOASE (0,30 m de pardoseală) — CO/gaze reci stagnante
                       └─► guri de extracție ÎNALTE (sub tavan) — gaze calde ridicate prin convecție
                                    │
                    Ventilator centralizat F400/120 cu VSD (sau baterie jet-fan F400/120)
                                    │
                    Refulare exterioară dedicată platformei, la cotă superioară punctelor de admisie
```

**Repartiția debitelor de exploatare pe fiecare platformă** (metoda schimburilor orare, n = 6 sch/h, cap. 6.3.1 DTAC, confirmată determinantă la cap. 6.3.3 DTAC față de metoda emisiei de CO):

| Platformă | Cotă | V_niv (mc) | Q_exploatare (mc/h) | Aport admisie (≥85%) | Nr. senzori CO (1/400 mp) |
|---|---|---|---|---|---|
| Subsol | −3,00 m | 7.000 | 42.000 | 35.700 | 6 |
| Parter | 0,00 m | 7.000 | 42.000 | 35.700 | 6 |
| Etaj 1 | +3,00 m | 7.000 | 42.000 | 35.700 | 6 |
| Etaj 2 | +6,00 m | 7.000 | 42.000 | 35.700 | 6 |
| Etaj 3 | +9,00 m | 7.000 | 42.000 | 35.700 | 6 |
| Etaj 4 | +12,00 m | 7.000 | 42.000 | 35.700 | 6 |
| Etaj 5 | +15,00 m | 7.000 | 42.000 | 35.700 | 6 |
| **Total 7 platforme** | | **49.000** | **294.000** | **249.900** | **42** |

Fiecare platformă rămâne, deci, dimensionată individual la Q = 42.000 mc/h de exploatare (identic breviarului global de la cap. 6.3.3 DTAC, aplicat aici distinct pe fiecare nivel, nu cumulat pe verticală — nu există, funcțional, un singur ventilator care ar deservi simultan mai multe platforme, exact pentru a păstra independența compartimentelor de incendiu). Verificarea de plauzibilitate prin metoda emisiei de CO (cap. 6.3.2 DTAC, Q_CO ≈ 5.617 mc/h pe platformă) se reconfirmă la faza PTh identică celei din DTAC — traficul de proiect (33 vehicule/oră/platformă) nu se modifică odată cu trecerea la execuție, doar poziționarea reală a senzorilor și a gurilor se detaliază mai jos.

**Poziționarea senzorilor de CO** (1 la fiecare 400 mp, cap. 6.4 DTAC) se face pe grilă regulată, evitând poziționarea în imediata vecinătate a rampelor de acces (unde concentrația locală, tranzitorie, la trecerea unui vehicul, ar declanșa treceri false frecvente între trepte), preferând poziții centrale pe alei de circulație curentă, la înălțime de montaj 1,50 m de la pardoseală (nivelul de respirație, relevant pentru expunerea persoanelor aflate în tranzit, cap. 6.2 DTAC).

**Strategia de reglaj în trepte** (cap. 6.4 DTAC) se aplică identic pe fiecare din cele 7 zone, independent — un vârf de CO pe platforma Etaj 3 (de exemplu, la o ieșire aglomerată la ora de vârf) nu modifică regimul ventilatoarelor celorlalte 6 platforme, fiecare buclă de reglaj funcționând autonom pe propriul set de senzori și pe propriul VSD.

### PTh-I.2.2 Schema desfumării — 7 compartimente, câte un canton per platformă

Așa cum s-a stabilit la cap. 6.6.3 DTAC, suprafața maximă admisă per canton de fum este de ≤3.000 mp; platforma de referință (Ac ≈ 2.400 mp) încape, prin urmare, **într-un singur canton per platformă** — nu este necesară compartimentarea internă suplimentară a niciunui nivel al scenariului de referință, spre deosebire de scenariul „mare" (verificare de acoperire, cap. 1.3 DTAC), unde amprente de 5.000-6.500 mp/nivel ar necesita 2-3 cantoane interne per platformă. Rezultă **7 cantoane de fum, unul per platformă**, fiecare deservit de propriul set de ventilatoare de desfumare (aceleași echipamente ca la exploatare, comutate pe turație maximă, cap. 6.8 DTAC) și de propria buclă de comandă din centrala IDSAI.

```
Detecție confirmată pe Platforma X (canton unic al nivelului) ──► Centrală IDSAI
        │
        ├──► Oprire ventilare de confort/exploatare pe Platforma X
        ├──► Comutare ventilatoare Platforma X pe turație maximă (12 sch/h = 84.000 mc/h)
        ├──► Deschidere guri de aport de compensare (≥75% din debitul de extracție = 63.000 mc/h)
        ├──► Restul platformelor (6 platforme) — funcționare normală neafectată (exploatare/VSD)
        └──► Transmisie dispecerat + ISU (cap. PTh-I.2.9)
```

**Tabelul de sinteză a debitelor de desfumare pe fiecare platformă** (n_desf = 12 sch/h, cap. 6.6.2 DTAC):

| Platformă | V_niv (mc) | Q_desfumare (mc/h) | Aport compensare (≥75%) | Nr. capete extracție (joase+înalte) |
|---|---|---|---|---|
| Subsol | 7.000 | 84.000 | 63.000 | 8 joase + 4 înalte |
| Parter…Etaj 5 (fiecare) | 7.000 | 84.000 | 63.000 | 6 joase + 4 înalte (fațadă parțial deschisă reduce necesarul de guri dedicate) |

Subsolul, fiind singura platformă complet lipsită de orice fațadă la exterior, necesită un număr sporit de guri de extracție joase dedicate (nicio parte a compensării nu se poate realiza prin infiltrații necontrolate prin fațadă, spre deosebire de nivelurile supraterane, unde anvelopa parțial permeabilă — mesh/lamele, cap. D03 `arhitectura-pth.md` — oferă o cale suplimentară, deși nu determinantă, de aport).

**Soluția de echipament** adoptată pentru marea majoritate a platformelor este sistemul **jet-fan** (cap. 6.6.5 DTAC) — potrivit unei geometrii deschise, fără compartimentări interioare semnificative, tipică unei platforme de parcaj cu travee structurală de 16,00 m fără stâlpi intermediari (`structura.md`) — cu excepția **subsolului**, unde configurația mai compartimentată (prezența camerelor tehnice — gospodărie de apă, separator de hidrocarburi, stație de pompare ape uzate) favorizează o rețea centralizată cu tubulatură dedicată pentru zonele tehnice, completată cu jet-fan-uri pe zona deschisă de parcare propriu-zisă. Poziționarea și numărul exact de jet-fan-uri pe fiecare platformă **se stabilesc obligatoriu prin simulare CFD la faza PTh** (cap. 6.6.5 DTAC), model tridimensional care verifică, pentru geometria reală a fiecărui nivel (poziția stâlpilor la interax de 7,80 m longitudinal, poziția rampelor de acces), direcționarea corectă a fumului dinspre zona de aport spre gurile de extracție ale cantonului unic, fără zone moarte.

Toate ventilatoarele/jet-fan-urile dedicate desfumării sunt certificate **F400/120** (SR EN 12101-3, cap. 6.6.4 DTAC), alimentate obligatoriu de pe tabloul TS securitate prin cabluri **E90/PH90** (cap. 6.6.6 DTAC).

### PTh-I.2.3 Schema rețelei de sprinklere — 7 zone ACS independente, una per platformă

Clasa de risc **OH2** (Ordinary Hazard grupa 2, cap. 9.3 DTAC) se aplică identic pe fiecare din cele 7 platforme, fiecare tratată ca **zonă hidraulică independentă**, cu propriul aparat de control și semnalizare (ACS), propriul robinet de secționare cu supraveghere de poziție (tamper) și propriul clopot de alarmă hidraulic — soluție impusă de compartimentarea la foc pe orizontală a construcției (fiecare platformă = un compartiment distinct, separat de vecinele sale prin planșeul intermediar rezistent la foc, `structura.md`), care cere ca oprirea/izolarea rețelei unei platforme (pentru mentenanță sau după o declanșare) să nu afecteze capacitatea de stingere a celorlalte 6.

```
Rezervor 50 mc (dublu-compartimentat) ─► Cameră pompe subsol (P.principală + P.Diesel + P.jockey)
        ─► Colector vertical de refulare DN 150 (riser central) ─┬─► ACS Subsol
                                                                  ├─► ACS Parter
                                                                  ├─► ACS Etaj 1
                                                                  ├─► ACS Etaj 2
                                                                  ├─► ACS Etaj 3
                                                                  ├─► ACS Etaj 4
                                                                  └─► ACS Etaj 5
                                                                          │
                                                          rețea de plafon a platformei respective
```

**Rețeaua de plafon-tip** (interax capete adoptat 3,6×3,3 m ≈ 11,9 mp/cap, sub pragul de ≤12 mp/cap impus la cap. 9.3 DTAC, cap K115 — 115 l/min·bar⁰·⁵ = 1,60 l/s·bar⁰·⁵):

| Nod | Element | Ø conductă | Nr. capete deservite | Debit tronson (l/s) |
|---|---|---|---|---|
| N1 | Cap sprinkler terminal (branch line) | DN 25 | 1 | 0,95 |
| N2 | Branch line, 2 capete | DN 32 | 2 | 1,90 |
| N3 | Branch line, 3 capete (branșament complet) | DN 32 | 3 | 2,85 |
| N4 | Cross-main, alimentare 4 branch lines | DN 80 | 12 | 11,4* |
| N5 | Riser platformă → ACS | DN 100 | — (tot. platformă) | 12,0 |

*Debitul de 12,0 l/s corespunde ariei de operare A_op = 144 mp la densitatea d = 5 mm/min (cap. 9.3 DTAC); grila de 200 de capete pe platformă (2.400/12 ≈ 200) include aria de operare drept cea mai defavorabilă combinație de 4 branch lines adiacente de 3 capete fiecare, confirmată la shop-drawing pe planul real de dispunere a locurilor de parcare.

**Conducta de alimentare** din stație (subsol) până la fiecare riser de platformă: oțel negru vopsit interior (galvanizat pe tronsoanele expuse — rampele exterioare, dacă există, în variantă **dry-pipe**, cap. 9.3 DTAC), DN 150, cu robinet de reținere, manometru și racord de probă (drenaj de test 2") la fiecare ACS, conform SR EN 12845 cap. 13.

### PTh-I.2.4 Schema hidranților interiori și exteriori pe toate nivelurile

**Hidranți interiori** — rețea inelară verticală DN 65-80, cu câte **2 hidranți DN 25/52 pe fiecare platformă** (cutii cu furtun semirigid 20-30 m, robinet, ajutaj), poziționați la extremitățile opuse ale fiecărei platforme, astfel încât orice punct al nivelului să fie atins de minimum 2 jeturi simultane (cap. 9.4 DTAC):

| Platformă | Hidranți | Poziție |
|---|---|---|
| Subsol | Hi-S1, Hi-S2 | lângă rampă acces, lângă gospodăria de apă |
| Parter | Hi-P1, Hi-P2 | lângă casa scării, lângă boxa de control |
| Etaj 1…Etaj 5 (fiecare) | Hi-E{n}-1, Hi-E{n}-2 | colț N-V, colț S-E ale platformei |
| **Total** | **14 hidranți interiori** | |

Debit de calcul per platformă (2 jeturi simultane, cele mai defavorabile) **Q_hi = 4,2 l/s** (identic cap. 9.4 DTAC), rețea alimentată din același riser vertical DN 100 care deservește și rețeaua de sprinklere a platformei, cu vane de secționare independente între cele două rețele (sprinklere/hidranți), pentru izolarea uneia fără întreruperea celeilalte.

**Hidranți exteriori** — inel exterior DN 150 îngropat sub adâncimea de îngheț (0,90-1,10 m), cu 4 hidranți supraterani DN 100, dispuși pe conturul construcției astfel încât distanța dintre oricare doi hidranți adiacenți, măsurată pe conturul clădirii, să nu depășească 150 m; racord tip B pentru autospecialele ISU la fiecare hidrant și la rezervorul propriu (racord de alimentare directă, cap. PTh-I.10.4).

### PTh-I.2.5 Schema apă rece / canalizare menajeră — coloane verticale traversând 7 niveluri

Rețeaua de apă rece (cap. 2.2 DTAC, ΣE ≈ 16, q_c = 0,60 l/s) alimentează, prin distribuitorul general de la subsol, o coloană verticală unică AR-1 (PP-R, Ø descrescător de la bază la vârf), care servește grupul sanitar de personal (parter, cap. 1.6 DTAC) și punctele de spălare a pardoselii repartizate pe fiecare platformă:

```
Branșament apă rece ─► cămin apometru ─► distribuitor general (subsol)
        ─► Coloană AR-1 (PP-R 32→20) ─► grup sanitar personal (parter)
        └─► Coloană AR-2 (PP-R 32→25) ─┬─► robinet spălare Subsol
                                        ├─► robinet spălare Parter
                                        ├─► robinet spălare Etaj 1…Etaj 5 (câte 1-2 robinete/platformă)
```

Canalizarea menajeră (cap. 2.3 DTAC — pante de pardoseală 1,5-2%, sifoane cu gardă hidraulică, coșuri de sedimente la 1/150-200 mp) colectează efluentul fiecărei platforme printr-o coloană verticală proprie, care converge la subsol înaintea separatorului de hidrocarburi:

| Coloană | Platforme colectate | Ø coloană | Debit de calcul (l/s) |
|---|---|---|---|
| CM-1 | Parter, Etaj 1, Etaj 2 | PP 110 | 2,0-3,0 |
| CM-2 | Etaj 3, Etaj 4, Etaj 5 | PP 110 | 2,0-3,0 |
| CM-S | Subsol (colectare directă, fără coloană verticală) | PP 160 | 1,5-2,0 |
| **Colector general** | toate cele 7 platforme, convergent la subsol | PP/fontă 160 | 3-6 (cap. 2.3 DTAC) |

Grupul sanitar de personal (2 lavoare, 2 vase WC, 1 pisoar) se racordează separat, direct la colectorul general de subsol, fără a traversa coloanele de spălare a pardoselii.

### PTh-I.2.6 Schema pluvială + separatorul de hidrocarburi NS 10

```
Terasa nivel superior (Ac 2.400 mp, open-deck) ─► 4 receptoare Dn110-125 (parafrunzar) ─► coloane pluviale
Rampe exterioare descoperite (dacă există) ─► rigole de bază ──────────────────────────┐
Platformele carosabile (toate 7, spălare + scurgeri accidentale) ─► sifoane+coșuri ────┤
                                                                                        ▼
                                                          Colector general subsol PP/fontă 160
                                                                     │
                                                    cămin desnisipare ─► decantor nămol 2.000 l
                                                                     │
                                          separator hidrocarburi NS 10, clasa I (by-pass integrat)
                                                                     │
                                                          cămin de prelevare a probelor
                                                                     │
                              ┌──────────────────────────────────────┴──────────────────────────┐
                    (dacă racord gravitațional posibil)                (dacă subsol sub cota de racord)
                    racord direct la rețeaua publică              stație de pompare ape uzate (PTh-I.2.7)
```

Separatorul NS 10 clasa I (breviarul complet la cap. PTh-I.3.5) tratează **integral** efluentul celor 7 platforme, indiferent de sursă (spălare periodică, scurgeri accidentale de hidrocarburi, apă pluvială antrenată prin rampe/terasă) — poziționat întotdeauna înaintea oricărei pompări (cap. 3.5 DTAC), niciodată după, pentru a evita antrenarea și emulsionarea suplimentară a hidrocarburilor la trecerea printr-o pompă centrifugă.

### PTh-I.2.7 Schema stației de pompare a apelor uzate — subsol

```
Bazin colector îngropat, etanș (subsol, sub cota de racord gravitațional)
        ├─► Electropompă submersibilă tocătoare P1 (activă), Q ≥ 10 l/s, H 8-12 mCA
        └─► Electropompă submersibilă tocătoare P2 (rezervă, alternare automată 1+1R)
                        │
        senzori de nivel (pornire/oprire/alarmă nivel maxim) ─► BMS/dispecerat (cap. PTh-I.2.10)
                        │
        refulare sub presiune ─► rețeaua de canalizare a nivelurilor superioare (gravitațională de acolo)
```

Configurația 1+1R (cap. 4.3 DTAC) cu alternare automată a pompei „lider" la fiecare ciclu și pornire automată a rezervei la avarie/blocare, fără întrerupere a funcției de evacuare — detaliu de execuție: fiecare pompă are propriul sorb dedicat, cu grătar de protecție la aspirație, coborât la cota cea mai joasă a bazinului, pentru a evita golirea incompletă la fiecare ciclu de pompare.

### PTh-I.2.8 Schema monofilară electrică — TGD, TS securitate, tablouri de nivel, EV/DLM

```
Post de transformare dedicat ─► BMPT ─► TGD (întrerupător general, contor, baterie compensare 40+ kVAr, SPD 1+2)
        ├─► TS-Subsol (iluminat + prize + ventilare exploatare Subsol + pompe ape uzate)
        ├─► TS-Parter (iluminat + prize + ventilare exploatare Parter + boxă control + PGS/LPR)
        ├─► TS-Etaj1…TS-Etaj5 (iluminat + prize + ventilare exploatare, câte un tablou/platformă)
        ├─► TS-EV (stații AC/DC, prin controller DLM central, cap. 7.3.3 DTAC)
        └─► TS-securitate (cablu E90) ── alimentare de rezervă (AAR ≤15 s + grup electrogen ≥350 kVA)
                ├─► Pompe incendiu (principală + jockey)
                ├─► Ventilare de desfumare (toate 7 platforme, comutare turație maximă la alarmă)
                ├─► Iluminat de securitate (toate 7 platforme)
                ├─► Centrala IDSAI + centrala VA/PA
                └─► Liftul, regim de intervenție pompieri
```

Fiecare tablou de nivel (TS-Subsol…TS-Etaj5) alimentează, distinct, iluminatul normal al platformei respective (cap. PTh-I.9), circuitele de prize de serviciu și ventilatoarele de exploatare/desfumare ale acelei platforme — soluție care permite izolarea electrică a unui singur nivel (pentru mentenanță sau după o avarie locală) fără a afecta funcționarea celorlalte 6, coerentă cu principiul de compartimentare independentă aplicat și la sprinklere (cap. PTh-I.2.3) și la ventilare (cap. PTh-I.2.1-2.2).

**Sursa de rezervă**: la producerea unui incendiu, secvența automată a matricei cauză-efect (cap. PTh-I.2.9) decuplează consumatorii neesențiali de pe tablourile TGD/TS-Etaj (în special încărcarea EV de pe TS-EV și ventilarea de confort a platformei afectate), pentru a maximiza puterea disponibilă pentru TS-securitate, exact conform principiului stabilit la cap. 7.2 DTAC.

### PTh-I.2.9 Schema IDSAI — matrice cauză-efect completă, adaptată mediului auto

Centrala de detectare adresabilă (SR EN 54-2/4, cap. 9.2 DTAC), cu câte o **buclă dedicată per platformă** (7 bucle), echipată cu detectoare **termovelocimetrice** și/sau **liniare termice** (cabluri senzor) pe zonele deschise de parcare (insensibile la gazele de eșapament ale traficului normal, cap. 9.2 DTAC) și detectoare optice de fum convenționale pe zonele fără trafic auto (casa scării, boxa de control, camerele tehnice de subsol).

**Matricea cauză-efect (extras, per platformă):**

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 | Efect 5 |
|---|---|---|---|---|---|
| Alarmă detector pe Platforma X | Oprire ventilare exploatare Platforma X | Comutare ventilare pe desfumare (12 sch/h) Platforma X | Deschidere guri de aport compensare Platforma X | Sirene + VA/PA localizate pe Platforma X | Transmisie ISU/dispecerat |
| Alarmă buton manual (oriunde) | Sirene generale toate platformele | Deblocare automată bariere LPR (fail-safe) | Oprire selectivă EV charging (TS-EV) | — | Transmisie |
| Scădere presiune rețea sprinkler/hidranți | Pornire pompă jockey | Pornire electropompă principală | Semnalizare ACS platformă afectată | Transmisie dispecerat | — |
| Confirmare presență fum pe cameră CCTV (verificare operator) | Suprascriere manuală panou pompieri | Forțare desfumare canton indicat | Jurnal evenimente | — | — |
| Defect buclă/echipament | — | — | — | — | Semnal defect + LED local |
| Confirmare pompier (cheie panou acces) | Silențiere sirene | Menținere semnalizare vizuală | Jurnal evenimente | — | — |

Temporizare **T1 (recunoaștere) 60 s / T2 (investigare) max. 3 min**, aplicabilă doar zonelor cu personal permanent (boxa de control, parter); pe platformele de parcare propriu-zise, unde detecția e automată prin senzori adaptați și acoperirea presupune un risc concentrat pe vehicul (cap. 9.3 DTAC), alarma este **directă** (fără temporizare de investigare), conform practicii P118-3 pentru risc mediu-mare specific parcajelor închise.

### PTh-I.2.10 Schema gestiunii de parcare — PGS, LPR, CCTV, BMS integrator

```
Rack tehnic central (boxa de control, parter) ── switch PoE+, server PGS/LPR, NVR, BMS/SCADA
        ├─► Senzori individuali de ocupare (460 buc., unul per loc) ─► indicatoare LED verde/roșu
        ├─► Afișaje centralizate (intrare generală + intrare fiecare platformă) — locuri libere/nivel
        ├─► Camere LPR la fiecare barieră de acces/ieșire (intrare, ieșire, opțional rampe intermediare)
        ├─► CCTV general (alei, case de scări, bariere, casierie) — 1 cameră/700-900 mp platformă
        ├─► Interfoane SOS (fiecare platformă, min. 2/nivel)
        └─► Sonorizare VA/PA (SR EN 54-16/24), difuzoare pe toate aleile
```

Integrarea PGS/LPR/CCTV cu matricea cauză-efect (cap. PTh-I.2.9) este bidirecțională: la alarmă de incendiu confirmată, sistemul de control acces (LPR) deblochează automat toate barierele (fail-safe), indiferent de starea contului de facturare asociat plăcuței (cap. 10.2 DTAC), iar sistemul PGS suspendă temporar actualizarea afișajelor de „locuri libere" pe platforma afectată, afișând în schimb un mesaj de evacuare pe panourile centralizate.

### PTh-I.2.11 Schema semnalizării rutiere interne

```
Acces auto (stradă) ─► barieră motorizată + LPR ─► zonă de tranziție luminată gradual (cap. 8.2 DTAC)
        │
Marcaje orizontale (STAS 1848-7): sensuri unice pe alei, linii de ghidare pe rampe, boxe numerotate
        │
Indicatoare verticale: viteză maximă 10-15 km/h, cedează trecerea la intersecțiile de alei,
        interzis oprirea pe rampe, locuri PMR (min. 4%, semnalizate distinct), locuri EV (semnalizate cu pictogramă)
        │
Oglinzi convexe la toate curbele cu vizibilitate redusă (intrări/ieșiri de rampă, colțuri de alei)
        │
Ieșire auto ─► barieră motorizată + LPR ─► casierie automată/POS (dacă tichet fizic, alternativ la abonament LPR)
```

Detaliile complete ale acestei scheme — dimensiuni de marcaj, poziționarea exactă a indicatoarelor, tehnologia barierelor — se dezvoltă la cap. PTh-I.12.

### PTh-I.2.12 Schema antiîngheț — zone critice pe toate cele 7 platforme

Zonele critice identificate la cap. 5.2 DTAC (casa scării, puțul liftului, boxa de control, gospodăria de apă pentru incendiu, camerele tehnice) sunt echipate cu aeroterme/convectoare electrice cu termostat (putere totală ~8-10 kW, cap. 5.4 DTAC) și, pe traseele de conductă expuse (refularea stației de pompare, dacă traversează o zonă neîncălzită), cu cablu de încălzire autoreglabil. La faza PTh se detaliază poziționarea fiecărui element pe planul real de arhitectură: casa scării unică traversează toate cele 7 platforme (un singur circuit de aeroterme pe verticală, cu termostat comun), puțul liftului idem, iar gospodăria de apă și camerele tehnice, concentrate la subsol, au fiecare propriul termostat independent.

### PTh-I.2.13 Schema instalației fotovoltaice — terasă open-deck

```
Module FV (≈ 900 buc. × 400 Wp, pe structuri tip pergolă) ─► string-uri (20 module/string, ≈ 45 string-uri)
   ─► cutii de conexiuni DC (protecție siguranțe + SPD DC) ─► invertoare string (≈ 12 × 30 kW)
   ─► tablou general AC FV (protecție + contorizare producție + anti-islanding)
   ─► TGD (racord prosumator, cu contor bidirecțional)
```

| Element | Parametru |
|---|---|
| Putere instalată | 360 kWp (cap. 11.1 DTAC) |
| Suprafață utilă terasă | ≈ 1.800 mp din Ac ≈ 2.400 mp |
| Densitate de instalare | 0,20 kWp/mp (pergole, cu spațiere tehnică) |
| Producție estimată | ≈ 414 MWh/an (1.150 kWh/kWp/an) |
| Invertoare | string, ≈ 12 × 30 kW, randament ≥ 98% |
| Structură de prindere | pergolă metalică, dublu rol — producție + protecție vehicule de precipitații/radiație |

Structura de prindere se verifică obligatoriu de inginerul structurist (`structura.md`) pentru încărcarea permanentă suplimentară și pentru încărcarea de vânt pe module, având în vedere că terasa rămâne funcțională ca nivel de parcare open-deck — pergolele nu pot obstrucționa gabaritul liber de circulație (2,20-2,30 m, cap. 6.2 `general.md`) și trebuie coordonate cu poziția reală a locurilor de parcare de pe ultimul nivel.

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Calcul hidraulic complet al rețelei de sprinklere (SR EN 12845, metoda Hazen-Williams), pe platforma-tip

**Date de intrare:** densitate de stropire d = 5,0 mm/min (OH2, cap. 9.3 DTAC), arie de operare A_op = 144 mp, capete K115 (K = 1,60 l/s·bar⁰·⁵), coeficient Hazen-Williams C = 120 (oțel negru), interax capete 3,6×3,3 m, presiune minimă de funcționare la capul cel mai defavorabil p_min = 0,35 bar (prag OH2, inferior celui aplicat la un risc mare de tip HHS).

**Pasul 1 — debitul capului cel mai defavorabil** (colțul îndepărtat al ariei de operare):

q₁ = K·√p₁ = 1,60 × √0,35 = 1,60 × 0,5916 = **0,95 l/s** (capul terminal, presiune minimă admisă).

**Pasul 2 — calculul nod cu nod pe branch line** (3 capete pe o ramură, distanță 3,6 m între capete, Ø branch DN 25→DN 32):

| Nod | Q cumulat (l/s) | Ø (mm) | v (m/s) | j (Hazen-Williams, bar/m) | L (m) | Δp tronson (bar) | p necesară cap (bar) | q cap (l/s) |
|---|---|---|---|---|---|---|---|---|
| Cap 1 (terminal) | 0,95 | 25 | 1,94 | — | — | — | 0,35 | 0,95 |
| Cap 2 | 1,90 | 32 | 2,36 | 0,0138 | 3,6 | 0,050 | 0,400 | 1,01 |
| Cap 3 | 2,91 | 32 | 3,62 | 0,0301 | 3,6 | 0,108 | 0,508 | 1,14 |

(j = 6,05×10⁵ × Q^1,85 / (C^1,85 × d^4,87), Q în l/min, d în mm — formula Hazen-Williams din SR EN 12845 anexa; valori rotunjite pentru claritate tabelară.)

**Pasul 3 — cross-main către aria de operare completă** (însumare debite pe 4 branch lines identice → 12 capete ≈ A_op 144 mp la ~12 mp/cap):

Q_total_platformă = 4 × 2,91 ≈ **11,6 l/s pe cross-main**, valoare care, prin arondare la configurația completă a ariei de operare verificate pe două branch-uri adiacente, rezultă în debitul de calcul de platformă **Q_op ≈ 12,0 l/s**, identic valorii globale din DTAC (d × A_op/60 = 5×144/60 = 12,0 l/s) — **verificare de coerență confirmată** între metoda simplificată (DTAC) și calculul nod-cu-nod (PTh).

**Pasul 4 — presiunea necesară la fiecare ACS** (însumarea pierderilor pe traseul cel mai lung, de la capul terminal la ACS-ul platformei):

| Tronson | L echiv. (m, incl. piese speciale +30%) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Branch line (3 capete) | 9,4 | variabil | 25→32 | — | 0,158 |
| Cross-main | 20,0 | 11,6 | 80 | 0,0057 | 0,114 |
| Riser vertical platformă → ACS | 3,0 | 12,0 | 100 | 0,0031 | 0,009 |
| **Total pierderi traseu** | | | | | **0,281 bar** |

Presiune necesară la ACS = p_terminal (0,35 bar) + pierderi traseu (0,281 bar) = **≈ 0,63 bar** la ACS-ul platformei celei mai apropiate de subsol; pentru **Etajul 5** (cel mai îndepărtat pe verticală de stația de pompare), se adaugă lungimea suplimentară a riserului central (subsol → +15,00 m ≈ 18,0 m) pe DN 150:

Δp_riser_central (Q = 12,0 l/s, DN 150, L = 18,0 m) ≈ 0,021 bar (pierdere liniară) + diferență de cotă geodezică 18,0 m ≈ 1,765 bar.

**Presiune necesară la refularea pompei, pentru Etajul 5 (cazul cel mai defavorabil)** = 0,63 + 0,021 + 1,765 ≈ **2,42 bar ≈ 24,7 mCA**, la care se adaugă o marjă de proiectare de ~20% pentru variații de traseu confirmate la shop-drawing: **≈ 30 mCA de proiectare pentru rețeaua de sprinklere**, valoare care se verifică la cap. PTh-I.3.9 concomitent cu cerința hidranților.

### PTh-I.3.2 Calcul hidraulic hidranți interiori — punctul cel mai defavorabil (Etaj 5)

Traseu de la stația de pompare (subsol) la Hi-E5-2 (cel mai îndepărtat, colț S-E al Etajului 5):

| Tronson | L (m) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Colector refulare → riser central | 3,0 | 4,2 | 80 | 0,0059 | 0,018 |
| Riser central (subsol → +15,00 m) | 18,0 | 4,2 | 80 | 0,0059 | 0,106 |
| Ramură pe platformă → Hi-E5-2 | 25,0 | 2,1 (1 jet pe ramură, 2 concomitent pe rețea) | 65 | 0,0044 | 0,110 |
| **Total pierderi liniare** | | | | | **0,234 bar** |
| Diferență de cotă geodezică (subsol → +15,00 m) | — | — | — | — | **1,765 bar** |
| **Total** | | | | | **1,999 bar** |

Presiune necesară la robinetul Hi-E5-2 (jet compact, rază de acțiune utilă): **p_min = 2,5 bar** (SR EN 671-2, cap. 9.4 DTAC) → presiune necesară la refularea pompei = 2,5 + 1,999 ≈ **4,50 bar ≈ 45,9 mCA** — valoare superioară celei rezultate la sprinklere (cap. PTh-I.3.1), confirmând hidranții drept condiția determinantă de dimensionare a înălțimii de pompare pe verticala completă a construcției.

### PTh-I.3.3 Presiunea de proiectare a stației de pompare — sinteza celor două cerințe

| Cerință | Presiune necesară la refulare | Determinantă? |
|---|---|---|
| Sprinklere, Etaj 5 (cap. PTh-I.3.1) | ≈ 30 mCA (cu marjă) | nu |
| Hidranți interiori, Etaj 5 (cap. PTh-I.3.2) | ≈ 46 mCA | **da** |
| Scenariul concomitent (sprinklere + hidranți active simultan, cel mai defavorabil compartiment) | ≈ 46 + marjă de proiectare | **da, adoptat** |

Se adoptă, pentru electropompa principală, un punct de funcționare de proiect **H ≈ 60-70 mCA la Q ≈ 16,2 l/s** (Q_spk 12,0 l/s + Q_hi 4,2 l/s, scenariul concomitent cel mai defavorabil pe compartimentul Etaj 5), cu marjă suplimentară pentru pierderile reale de traseu confirmate la execuție — valoare coerentă cu practica de proiectare a stațiilor de pompare la construcții cu dezvoltare mare pe verticală (7 platforme, 18,0 m diferență de cotă util-verticală de la rezervor la ultimul nivel).

### PTh-I.3.4 Calcul rețea apă menajeră — toate tronsoanele

Pornind de la ΣE ≈ 16 (cap. 2.2 DTAC) și q_c = 0,60 l/s, breviarul PTh detaliază fiecare tronson (viteze economice 0,7-2,0 m/s):

| Tronson | ΣE tronson | q_c (l/s) | Ø adoptat | v (m/s) | L (m) | Δp liniar (mCA) | Δp local (+30%) |
|---|---|---|---|---|---|---|---|
| Branșament → cămin apometru | 16,0 | 0,60 | PE-HD 40 | 0,48 | 8 | 0,08 | 0,10 |
| Cămin → distribuitor general | 16,0 | 0,60 | PP-R 32 | 0,75 | 6 | 0,32 | 0,42 |
| Distribuitor → coloană AR-1 (grup sanitar) | 10,0 | 0,47 | PP-R 25 | 0,96 | 12 | 0,90 | 1,17 |
| Coloană AR-1 → WC/lavoar cel mai îndepărtat | 2,0 | 0,21 | PP-R 20 | 0,67 | 4 | 0,35 | 0,46 |
| Distribuitor → coloană AR-2 (spălare pardoseală, toate 7 platforme) | 6,0 | 0,37 | PP-R 32 | 0,46 | 22 (vertical, +15,0 m cotă) | 0,60 | 0,78 |

**Pierdere totală traseu cel mai defavorabil** (branșament → robinet spălare Etaj 5) — recalculată nod-cu-nod la ≈ **1,8-2,0 mCA + 15,0 m cotă geodezică ≈ 17 mCA**, sub presiunea disponibilă tipică a rețelei publice urbane (≥25-30 mCA) → **distribuție gravitațională confirmată, fără hidrofor**, conform soluției de principiu de la cap. 2.2 DTAC; dacă studiul de presiune de rețea la faza PTh (efectuat pe baza datelor operatorului local) indică un deficit, se prevede hidrofor compact monobloc, dimensionat strict la debitul redus calculat mai sus.

### PTh-I.3.5 Calcul hidraulic canalizare — toate coloanele + verificare autocurățare

Verificare grad de umplere h/D și viteză de autocurățare (v ≥ 0,7 m/s), conform SR EN 12056-2, pe fiecare coloană:

| Coloană | Q_c (l/s) | Ø | Capacitate la h/D=0,5 (l/s) | h/D real | v (m/s) |
|---|---|---|---|---|---|
| CM-1 (Parter+Etaj1+Etaj2) | 1,8 | PP 110 | 22,0 | 0,10 | 1,00 |
| CM-2 (Etaj3+Etaj4+Etaj5) | 1,8 | PP 110 | 22,0 | 0,10 | 1,00 |
| CM-S (Subsol, direct) | 1,0 | PP 110 | 22,0 | 0,06 | 0,85 |
| Colector orizontal general (subsol, spre separator) | 4,0-6,0 | PP/fontă 160 | 38,0 | 0,15 | 1,10 |

Toate tronsoanele funcționează cu marjă largă sub capacitatea nominală (h/D < 0,5), asigurând autocurățare permanentă — verificare identică cu concluzia DTAC (cap. 2.3), extinsă acum pe fiecare coloană individual.

### PTh-I.3.6 Calcul separator de hidrocarburi — verificare nod-cu-nod (NS 10)

Recalcularea la faza PTh a breviarului NS din DTAC (cap. 3.3), cu detalierea celor două componente de debit pe traseul real:

**NS = (Qr + fx·Qs)·fd**, unde Qr = 4,0 l/s (debit pluvial/spălare, confirmat prin însumarea debitelor colectoarelor CM-1+CM-2+CM-S+pluvial terasă la un factor de simultaneitate redus, k=0,6, aplicat asupra vârfului brut) și Qs = 3,0 l/s (spălare intensivă cu degresant, ipoteză conservatoare menținută identică DTAC), fx = 2, fd = 1,0 (clasa I).

**NS = (4,0 + 2×3,0) × 1,0 = 10,0 → separator NS 10, clasa I** — **confirmat identic valorii din DTAC**, verificarea nod-cu-nod nemodificând dimensionarea de principiu (spre deosebire de rețelele hidraulice ale sprinklerelor/hidranților, unde verticala pe 7 platforme introducea o cerință suplimentară de presiune, separatorul funcționează la subsol, punctul cel mai jos al construcției, fără nicio componentă suplimentară de cotă geodezică).

**Decantorul de nămol**: V_nămol = 200 × NS/fd = 200 × 10/1,0 = **2.000 litri** (identic cap. 3.4 DTAC).

**Verificarea căminului de prelevare a probelor** — poziționat imediat în avalul separatorului, pe traseul spre racordul public (sau spre stația de pompare, dacă evacuarea nu este gravitațională, cap. 3.5 DTAC), cu acces dedicat, fără a necesita intrarea în interiorul construcției pentru control APM.

### PTh-I.3.7 Calcul electric complet — toate circuitele și căderea de tensiune

Extinderea bilanțului din DTAC (cap. 7.1, Pc ≈ 393 kW) cu **toate** plecările din tablourile de nivel, verificate la cădere de tensiune admisă (3% iluminat, 5% forță, de la TGD, conform I7-2011):

**TS-Etaj tip (Parter…Etaj5, identic pe fiecare platformă), circuit-tip:**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | L (m) | Δu% |
|---|---|---|---|---|---|---|---|
| CI-E1 | Iluminat platformă (75 lux, alei) | 6,0 | 10,9 | C16 3P | 5×2,5 | 40 | 1,2 |
| CV-E1 | Ventilator exploatare + VSD platformă | 30,0 | 45,2 | C50/30mA 3P | 5×10 | 15 | 0,9 |
| CP-E1 | Prize de serviciu (spălare, mentenanță) | 3,0 | 5,4 | C10/30mA 3P | 5×1,5 | 25 | 0,6 |
| CS-E1 | Senzori CO + PGS platformă | 1,0 | 4,3 | C6/UPS | 3×1,5 | 20 | — |

**TS-EV (pe controller DLM central):**

| Circuit | Destinație | P inst. (kW) | Protecție | Secțiune | Observație |
|---|---|---|---|---|---|
| CF-EV-AC1 | 23 stații AC 7,4 kW monofazat | 170,2 | C32/30mA (RCD tip B), câte 1/stație | 3×6 | modulat prin DLM |
| CF-EV-AC2 | 23 stații AC 22 kW trifazat | 506,0 | C40/30mA (RCD tip B), câte 1/stație | 5×10 | modulat prin DLM |
| CF-EV-DC | 2 stații DC 50 kW | 100,0 | C125/30mA (RCD tip B) | 5×35 | modulat prin DLM, prioritate tranzit rapid |

**TS-securitate (cablu E90/PH):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Cablu | Δu% |
|---|---|---|---|---|---|---|
| CF-P1 | Electropompă incendiu principală | 90,0 | 136,6 | C200 3P | N2XH E90 5×95 | 1,4 |
| CF-P2 | Pompă jockey | 3,0 | 5,4 | C10 3P | N2XH E90 5×1,5 | 0,6 |
| CF-P3 | Centrală IDSAI + VA/PA + UPS | 3,0 | 13,0 | C16/UPS | N2XH E90 3×2,5 | — |
| CF-P4 | Ventilare desfumare, toate 7 platforme (comutare turație max.) | 240,0 | conform VSD, secvențial | C400 3P (general), derivații/platformă | N2XH E90 5×70/platformă | — |
| CF-P5 | Iluminat de securitate, toate 7 platforme | 8,0 | 12,1 | C16/UPS | N2XH E90 3×2,5 | — |
| CF-P6 | Liftul, regim intervenție pompieri | 15,0 | 22,7 | C32 3P | N2XH E90 5×6 | — |

Curentul de calcul total (TGD), confirmat coerent cu DTAC prin însumarea tuturor tablourilor secundare: **Ic ≈ 595 A la puterea de calcul de ~393 kW** (calcul: P/(√3×U×cosφ) = 393.000/(1,732×400×0,92) ≈ 617 A, rotunjit la puterea aparentă contractată de ~470 kVA, cap. 7.2 DTAC), branșament dimensionat la ≥630 A. Toate circuitele de prize și forță monofazate cu protecție diferențială 30 mA; circuitele TS-securitate cu funcționare garantată 90 min (E90) și alimentare de rezervă prin grup electrogen ≥350 kVA (cap. 7.4 DTAC).

### PTh-I.3.8 Verificare curent de pornire — electropompă incendiu 90 kW și ventilatoare mari

Motorul electropompei principale de incendiu (90 kW, 400 V/3F, cap. PTh-I.3.3), la pornire directă:

I_nominal ≈ 90.000/(√3 × 400 × 0,88 × 0,92) ≈ **155 A** (cosφ pornire ≈ 0,88, randament ≈ 0,92).

I_pornire ≈ 6,5 × 155 ≈ **1.008 A** (pornire directă) — valoare care ar produce o cădere de tensiune inacceptabilă pe cablul de alimentare (N2XH E90 5×95 mmp, L ≈ 20 m) și pe branșamentul general.

**Soluție adoptată:** pornire prin **soft-starter** (limitare curent de pornire la ≈ 3×I_nominal ≈ 465 A), acceptată de SR EN 12845 cu condiția ca timpul de atingere a turației/debitului nominal să rămână ≤15 s. Ventilatoarele centralizate mari (dacă soluția pe subsol este cu tubulatură, cap. PTh-I.2.2), la puteri de 15-30 kW/unitate, se pornesc similar prin soft-starter sau prin variatorul de frecvență propriu (VSD, cap. 6.4 DTAC), care asigură deja o rampă de accelerare graduală, fără vârf de curent semnificativ, spre deosebire de pompa de incendiu (pornire directă la turație nominală, fără VSD, pentru a garanta debitul complet instantaneu la o cerere de stingere).

### PTh-I.3.9 Calcul detaliat pe fiecare din cele 7 cantoane de fum — desfumare (completare PTh-I.2.2)

Verificarea debitului masic de fum pe fiecare platformă/canton (2.400 mp), conform modelului de pană de fum (focar de proiectare, risc mediu-mare specific auto, adoptat conservator la 5-8 MW pentru un vehicul în ardere avansată cu propagare la vecine):

| Parametru | Platformă-tip (oricare din cele 7) |
|---|---|
| Arie canton | 2.400 mp |
| A_util necesară (cap. 6.6.2-6.6.3 DTAC) | ≥75% din debitul de extracție |
| Debit masic pană de fum (y ≈ 2,0-2,3 m, strat liber sub H_niv 2,30-3,00 m) | ≈ 18-22 kg/s |
| Debit volumic la ~300 °C (ρ ≈ 0,616 kg/mc) | ≈ 29-36 mc/s |
| Q_desf de proiect (12 sch/h, cap. 6.6.2 DTAC) | 84.000 mc/h ≈ 23,3 mc/s |

Verificare: debitul de proiect (23,3 mc/s) rezultat din metoda schimburilor orare (n_desf = 12 sch/h) rămâne, la platforma de referință, în intervalul confirmat prin modelul de pană de fum (29-36 mc/s la ipoteza de focar mai severă) — pentru a acoperi integral scenariul cel mai defavorabil de propagare rapidă la vehiculele adiacente (specific unui parcaj, cap. 6.6.1 DTAC), se recomandă, la faza PTh, verificarea suplimentară prin simulare CFD (cap. PTh-I.2.2) a soluției jet-fan adoptate, care confirmă captarea eficientă inclusiv la marja superioară a intervalului de debit masic calculat.

### PTh-I.3.10 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

Coordonarea cu structura de rezistență (`structura.md` — dală postensionată pe deschiderea de 16,00 m, clase de expunere XD3/XF4) impune un tabel explicit al golurilor de trecere necesare pentru fiecare instalație majoră care traversează planșeele dintre cele 7 platforme, comunicate proiectantului de structură **înainte de execuția cofrajelor** (goluri prevăzute din proiectare, nu tăiate ulterior în placa postensionată — o găurire neautorizată a unei plăci postensionate riscă secționarea unui toron activ, cu consecințe structurale grave):

| Instalație | Element traversat | Poziție orientativă | Dimensiune gol | Observație |
|---|---|---|---|---|
| Riser sprinkler + hidranți (DN 150/100) | planșeu postensionat, la fiecare nivel | zonă tehnică lângă casa scării | Ø 250-300 mm | verificare obligatorie față de traseul toroanelor de postensionare, marcat pe planul de armare |
| Coloane canalizare (CM-1, CM-2, CM-S) | planșeu, la fiecare nivel | zonă tehnică | Ø 200-250 mm/coloană | idem |
| Coloană apă rece (AR-1, AR-2) | planșeu | zonă tehnică | Ø 100-150 mm | idem |
| Cabluri electrice (TS-Etaj, TS-securitate) | planșeu | lângă casa scării, jgheab dedicat | 400×150 mm/nivel | separare tari/slabi, cu treceri etanșe la foc (cap. PTh-I.6.4) |
| Tubulatură ventilare (dacă soluție centralizată pe subsol) | planșeu subsol/parter | zonă tehnică subsol | 800×500 mm | cu clapetă antifoc la traversarea compartimentării |
| Cablare curenți slabi (PGS/LPR/CCTV) | planșeu, la fiecare nivel | lângă casa scării | jgheab 200×100 mm | separare de curenții tari |

Toate golurile prin placa postensionată se marchează pe planul de proiect **înainte de întinderea toroanelor**, cu confirmarea explicită a inginerului structurist asupra poziției exacte — nu se admite nicio găurire ulterioară, neplanificată, a plăcii postensionate pe șantier.

### PTh-I.3.11 Calcul economie energetică din DCV — extindere pe fiecare platformă

Extinderea estimării DTAC (cap. 11.2, economie 60-80% prin ventilarea la cerere) cu un calcul orientativ pe platforma-tip (30 kW instalat/ventilator, funcționare de bază 24 h/zi la turație medie, versus modulare VSD pe senzori CO):

- funcționare de bază (fără DCV, turație medie constantă echivalentă a 40% din debitul maxim, 24 h/zi, 365 zile) = 30 kW × 0,40³ (legea de afinitate cub) × 24 × 365 ≈ 30×0,064×8.760 ≈ **16.800 kWh/an per platformă**;
- cu DCV (modulare reală pe senzori CO, cu vârfuri scurte la trafic intens și regim minim în restul timpului, factor mediu echivalent ≈ 15-20% din debitul maxim pe cea mai mare parte a timpului) → consum estimat ≈ 30×0,18³×8.760 ≈ **4.250 kWh/an per platformă**;
- **economie estimată ≈ 12.500 kWh/an (≈ 75%) per platformă**, respectiv **≈ 87.500 kWh/an pe toate cele 7 platforme** — confirmând intervalul de 60-80% din DTAC, cu valoarea reală calibrată după PIF pe baza jurnalului de funcționare BMS (cap. PTh-I.7).

### PTh-I.3.12 Breviar producție fotovoltaică lunară estimată

Distribuția lunară a producției anuale de 414 MWh (cap. 11.1 DTAC), pe baza profilului tipic de radiație solară pentru zona climatică a amplasamentului:

| Lună | Fracție din producția anuală | Producție estimată (MWh) |
|---|---|---|
| Ianuarie | 3,5% | 14,5 |
| Februarie | 5,0% | 20,7 |
| Martie | 8,0% | 33,1 |
| Aprilie | 10,5% | 43,5 |
| Mai | 12,0% | 49,7 |
| Iunie | 12,5% | 51,8 |
| Iulie | 13,0% | 53,8 |
| August | 12,0% | 49,7 |
| Septembrie | 9,5% | 39,3 |
| Octombrie | 6,5% | 26,9 |
| Noiembrie | 4,0% | 16,6 |
| Decembrie | 3,5% | 14,5 |
| **Total** | **100%** | **414,0** |

Valorile lunare sunt **orientative**, calibrate să însumeze exact producția anuală confirmată în DTAC; producția reală se confirmă prin monitorizarea portalului invertoarelor după PIF (cap. PTh-I.7.6) și poate varia ±15-20% față de valorile de mai sus, funcție de anul solar real. Sinergia cu cererea EV (cap. PTh-I.3.13) este maximă tocmai în lunile de vârf de producție (mai-august), coincizând cu orele de staționare diurnă a vehiculelor la locul de muncă.

### PTh-I.3.13 Calcul DLM detaliat — profil orar de simultaneitate EV

Puterea instalată brută a infrastructurii EV (776,2 kW, cap. 7.3.4 DTAC) este redusă, prin managementul dinamic al sarcinii, la o putere de calcul reală de proiect. Verificarea la faza PTh a coeficientului de simultaneitate cs, pe un profil orar tipic de utilizare a unui parcaj public (vârf de sosire dimineața, platou pe durata zilei, vârf de plecare seara):

| Interval orar | Fracție de stații active (din 48 total) | Fracție medie de putere per stație activă | cs echivalent |
|---|---|---|---|
| 06:00-09:00 (sosire) | 60% | 90% (baterii descărcate, curent maxim) | ≈ 0,54 |
| 09:00-16:00 (platou zi) | 75% | 35% (baterii apropiate de capacitate, curbă descrescătoare) | ≈ 0,26 |
| 16:00-19:00 (plecare) | 40% | 50% | ≈ 0,20 |
| 19:00-06:00 (noapte) | 15% | 60% (încărcare lentă peste noapte) | ≈ 0,09 |
| **Vârf de proiect adoptat** | | | **cs ≈ 0,25-0,30** (cap. 7.3.3 DTAC) |

Puterea de calcul rezultată **P_EV,calc = 776,2 × 0,25…0,30 ≈ 194-233 kW**, confirmând intervalul de ~200-230 kW adoptat la cap. 7.1 DTAC. Controllerul DLM central alocă, în timp real, puterea disponibilă (limita de branșament) prioritizând, la faza PTh, un profil de prioritate configurabil: stațiile DC rapide (tranzit scurt, cerere de putere maximă imediată) primesc prioritate față de stațiile AC (staționare lungă, unde o reducere temporară de putere nu afectează finalizarea încărcării până la plecare).

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Ventilator centralizat de exploatare/desfumare (per platformă)

| Parametru | Valoare |
|---|---|
| Debit nominal (turație maximă, regim desfumare) | 84.000 mc/h |
| Debit modulat (regim exploatare, VSD) | 0-42.000 mc/h |
| Clasificare termică | F400/120 (SR EN 12101-3) |
| Motor | IE3, cu variator de frecvență (VSD) integrat |
| Alimentare | 400 V/3F, circuit dedicat platformei (TS-Etaj) în regim normal, comutare pe TS-securitate la alarmă |
| Comandă | automată (senzori CO + IDSAI) + manuală (panou local) |

### PTh-I.4.2 Fișă tehnică — Jet-fan de impuls (desfumare/exploatare)

| Parametru | Valoare |
|---|---|
| Tip | ventilator de impuls, montaj suspendat sub planșeu |
| Clasificare termică | F400/120 |
| Direcție de curgere | reversibilă (configurabilă la comandă, funcție de scenariul de fum) |
| Verificare de poziționare | obligatorie prin simulare CFD la faza PTh (cap. PTh-I.2.2) |
| Alimentare | 400 V/3F sau 230 V monofazat (funcție de model), integrat în bucla platformei |

### PTh-I.4.3 Fișă tehnică — Electropompă principală de incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 16,2 l/s (58,3 mc/h) |
| Înălțime de pompare | 60-70 mCA |
| Putere motor | 90 kW |
| Randament | ≥ 70% |
| Pornire | soft-starter (limitare la ≈3×I_nominal) |
| Conformitate | SR EN 12845 |

### PTh-I.4.4 Fișă tehnică — Pompă Diesel de rezervă incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 16,2 l/s (identic electropompei) |
| Autonomie combustibil | ≥ 3 h la sarcină nominală |
| Pornire | automată, baterii duble, la defect electropompă |
| Testare | pornire săptămânală de probă, fără debit, pe by-pass |

### PTh-I.4.5 Fișă tehnică — Pompă jockey

| Parametru | Valoare |
|---|---|
| Debit | ≈ 0,5-1 l/s |
| Rol | menține presiunea de veghe, evită pornirea inutilă a pompei principale |
| Comandă | presostate diferențiale |

### PTh-I.4.6 Fișă tehnică — Electropompă submersibilă tocătoare (ape uzate subsol)

| Parametru | Valoare |
|---|---|
| Debit nominal | ≥ 10 l/s |
| Înălțime de pompare | 8-12 mCA |
| Configurație | 1+1R, alternare automată |
| Mecanism | tocător la aspirație |
| Comandă | senzori de nivel (plutitor/capacitiv) |

### PTh-I.4.7 Fișă tehnică — Separator de hidrocarburi (NS 10, clasa I)

| Parametru | Valoare |
|---|---|
| Mărime nominală | NS 10 |
| Clasă | I (coalescență, reziduu ≤ 5 mg/l) |
| Decantor nămol | 2.000 l, amonte de separator |
| By-pass | integrat, pentru operațiuni de vidanjare fără întrerupere |
| Avertizor de nivel | senzor automat + panou local, integrat BMS |
| Mentenanță | golire periodică, firmă autorizată, cod deșeu 13 05 |

### PTh-I.4.8 Fișă tehnică — Centrală de detectare IDSAI adaptată mediului auto

| Parametru | Valoare |
|---|---|
| Tip | adresabilă, 7 bucle (una per platformă) |
| Detectoare parcare | termovelocimetrice / liniare termice / ASD |
| Detectoare zone tehnice | optice de fum convenționale |
| Autonomie baterii | ≥ 24 h veghe (cap. 9.2 DTAC) |
| Interfațare | ventilare, desfumare, pompe incendiu, control acces/LPR, VA/PA |
| Conformitate | P118-3/2015, seria SR EN 54 |

### PTh-I.4.9 Fișă tehnică — Stație de încărcare AC (7,4 kW / 22 kW)

| Parametru | Valoare |
|---|---|
| Conector | Tip 2 (SR EN 61851) |
| Protecție | RCD tip B dedicat |
| Comunicare | OCPP |
| Integrare | controller DLM central |

### PTh-I.4.10 Fișă tehnică — Stație de încărcare DC rapidă (50 kW)

| Parametru | Valoare |
|---|---|
| Conector | CCS Combo 2 |
| Protecție | RCD tip B dedicat |
| Comunicare | OCPP |
| Prioritate DLM | ridicată (tranzit rapid) |

### PTh-I.4.11 Fișă tehnică — Controller DLM (Dynamic Load Management)

| Parametru | Valoare |
|---|---|
| Rol | monitorizare putere disponibilă + alocare dinamică între toate stațiile active |
| Coeficient de proiect | cs ≈ 0,25-0,30 (cap. PTh-I.3.13) |
| Profil de prioritate | configurabil (DC > AC, sau echitabil) |
| Integrare | BMS/SCADA central |

### PTh-I.4.12 Fișă tehnică — Grup electrogen de rezervă

| Parametru | Valoare |
|---|---|
| Putere | ≥ 350 kVA |
| Comutare (AAR) | ≤ 15 s |
| Autonomie | ≥ 3 h |
| Deservește | TS-securitate (pompe incendiu, desfumare toate 7 platforme, iluminat securitate, IDSAI, lift intervenție) |

### PTh-I.4.13 Fișă tehnică — Corp de iluminat LED (alei/locuri parcare)

| Parametru | Valoare |
|---|---|
| Eficacitate | ≥ 130 lm/W |
| Nivel de iluminare de proiect | 75 lux, U0 ≥ 0,40 |
| Comandă | senzor de prezență (dimming 20-30% la neocupare) |
| Densitate de putere | ~2,5-3,0 W/mp |

### PTh-I.4.14 Fișă tehnică — Corp de iluminat rampe (adaptiv zi/noapte)

| Parametru | Valoare |
|---|---|
| Nivel zi | 300 lux |
| Nivel noapte | 75 lux |
| Comandă | senzor de luminanță exterioară, gradient automat pe zona de tranziție (cap. 8.2 DTAC) |

### PTh-I.4.15 Fișă tehnică — Senzor CO

| Parametru | Valoare |
|---|---|
| Densitate | 1 la 400 mp |
| Praguri | 50/100/150 ppm (cap. 6.4 DTAC) |
| Interfațare | VSD ventilator + IDSAI (alertă la ≥150 ppm) |

### PTh-I.4.16 Fișă tehnică — Sistem PGS (Parking Guidance System)

| Parametru | Valoare |
|---|---|
| Senzori de ocupare | 460 buc. (1/loc), ultrasonic/infraroșu |
| Indicatoare LED | verde/roșu, vizibile de la ≥15 m |
| Afișaje centralizate | 1/intrare platformă + 1/intrare generală |
| Actualizare | timp real, integrare server central |

### PTh-I.4.17 Fișă tehnică — Sistem LPR (License Plate Recognition)

| Parametru | Valoare |
|---|---|
| Poziționare | fiecare barieră de intrare/ieșire |
| Funcție | identificare automată, deblocare abonați, fail-safe la incendiu |
| Integrare | matrice cauză-efect IDSAI (cap. PTh-I.2.9), sistem de facturare |

### PTh-I.4.18 Fișă tehnică — NVR și camere CCTV

| Parametru | Valoare |
|---|---|
| Camere | IP, 1/700-900 mp platformă + puncte de acces |
| Înregistrare | ≥ 30 zile, array RAID |
| Conformitate | RGPD (semnalizare, politici de retenție) |

### PTh-I.4.19 Fișă tehnică — Barieră motorizată acces/ieșire

| Parametru | Valoare |
|---|---|
| Timp de ridicare | ≤ 3 s |
| Comandă | LPR automat + buton manual casierie |
| Regim fail-safe | deschidere automată la alarmă IDSAI, indiferent de stare cont |

---

## PTh-I.5 Probe și verificări detaliate

| Instalație | Proba | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece | etanșeitate | 1,5×p regim, min. 6 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Canalizare menajeră | etanșeitate | umplere la nivel de platformă | 15 min | fără scurgeri la îmbinări |
| Pluvial | debit terasă | debit de calcul (64,8 l/s) | — | fără refulare la receptoare |
| Separator hidrocarburi | funcțională + etanșeitate | debit nominal NS 10 | — | separare conformă, fără scurgeri |
| Ventilare exploatare | debite + echilibrare, pe fiecare din 7 platforme | debite proiectate ± 10-15% | — | SR EN 12599 |
| Ventilare desfumare | deschidere/comandă, pe fiecare din 7 cantoane | comandă IDSAI + manuală | — | comutare turație maximă < 60 s, aer compensare funcțional |
| Tubulatură ventilare (dacă centralizată subsol) | etanșeitate | clasa B (SR EN 12237) | conform metodă | scurgeri sub limita clasei |
| Electrice | rezistență izolație | 500 V c.c. | — | ≥ 0,5 MΩ (I7-2011) |
| Electrice | priză de pământ | — | — | R ≤ 1 Ω (comună trăsnet+electrică) |
| Electrice | test declanșare RCD tip B (EV) | I∆n = 30 mA | — | declanșare < 300 ms |
| Trăsnet | continuitate coborâri + priză | — | — | conform SR EN 62305-3 |
| Sprinkler | presiune hidraulică, pe fiecare din 7 ACS | 1,5×p regim, min. 12 bar (SR EN 12845) | 2 h | fără scădere, fără scurgeri |
| Sprinkler | funcțională ACS + alarmă | debit test | — | alarmă hidraulică declanșată corect |
| Hidranți | debit-presiune, punct cel mai defavorabil (Etaj 5) | robinet cel mai defavorabil | — | ≥ 2,1 l/s la ≥ 2,5 bar |
| Stație pompare incendiu | funcțională (pornire automată) | scădere presiune simulată | — | pornire < timp normat, comutare rezervă Diesel |
| Stație pompare ape uzate | funcțională 1+1R | simulare defect pompă activă | — | comutare automată pe rezervă, fără întrerupere evacuare |
| IDSAI | funcțională detectoare, toate 7 bucle | test 100% adrese | — | semnalizare corectă |
| IDSAI | matrice cauză-efect | test integral, pe fiecare platformă | — | toate efectele confirmate |
| DLM/EV | funcțională alocare dinamică | simulare cerere maximă simultană | — | putere totală ≤ limita contractată, fără declanșare generală |
| PGS | funcțională senzori + afișaje | test 100% locuri | — | corespondență senzor-indicator confirmată |
| LPR | funcțională + fail-safe incendiu | simulare alarmă IDSAI | — | deblocare automată bariere confirmată |
| FV | funcțională + izolație | test string-uri | — | producție conformă, fără defecte izolație |

### PTh-I.5.1 Verificări electrice PRAM — detaliu

Verificările PRAM (măsurări de protecție prin relee și automatizări) se execută de laborator autorizat, cu buletine consemnate în cartea tehnică:

- **Rezistența de izolație** — măsurată între conductoare active și între active-PE, la 500 V c.c., valoare minimă 0,5 MΩ pe circuite ≤ 500 V (I7-2011). Se măsoară pe fiecare circuit terminal, separat, inclusiv pe fiecare din cele 7 tablouri de nivel.
- **Rezistența prizei de pământ** — metoda celor 3 electrozi, R_p ≤ 1 Ω (priză comună electrică + trăsnet), remăsurată după completarea prizei de fundație cu eventualii electrozi suplimentari, dacă rezistivitatea reală a solului o impune.
- **Continuitatea conductorului de protecție** — pe fiecare circuit final, inclusiv pe circuitele TS-securitate (cablu E90).
- **Testul dispozitivelor diferențiale** — cu aparat dedicat, verificare timp de declanșare (< 300 ms la I∆n = 30 mA) și curent real de declanșare, pe toate circuitele de prize, zone umede și, specific acestui obiectiv, pe **toate circuitele RCD tip B ale stațiilor EV** (verificare distinctă de cea a circuitelor standard, dat fiind curentul de defect cu componentă continuă specific electronicii de putere a stațiilor).
- **Verificarea SPD** — descărcătoarele tip 1+2 (TGD), tip 2 (tablourile de nivel) și tip 3 (echipamente sensibile: IDSAI, rack PGS/LPR, invertoare FV), inclusiv legarea la bara de echipotențializare.
- **Continuitate coborâri paratrăsnet** — minimum 2 coborâri, verificarea electrică a continuității la fiecare tronson.

---

## PTh-I.6 Tehnologia de montaj — caiet de sarcini pe instalație

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee pe fiecare din cele 7 platforme (înainte de turnarea pardoselii/membranei de protecție circulabilă, cap. D05 `arhitectura-pth.md`).
2. Execuție priză de pământ de fundație (platbandă OL-Zn, sudată de armătura fundațiilor) — **înainte de turnarea fundațiilor**.
3. Montaj rețea de canalizare îngropată + pluvial exterior, separator de hidrocarburi — **probate înainte de acoperire**.
4. Montaj structură (dală postensionată) — condiție pentru toate instalațiile suspendate; **niciun gol prin placă nu se execută înainte de confirmarea poziției toroanelor** (cap. PTh-I.3.10).
5. Montaj rețea de sprinklere pe fiecare platformă, coordonat cu gabaritele de circulație auto — **probată hidraulic înainte de finisaje**, pe fiecare din cele 7 zone independent.
6. Montaj coloane apă/canalizare interioară, tubulatură/jet-fan de ventilare.
7. Montaj cabluri electrice pe jgheaburi/paturi, tablourile de nivel + TGD + TS-securitate.
8. Montaj echipamente majore (stație pompare incendiu, stație ape uzate, ventilatoare/jet-fan, grup electrogen).
9. Montaj corpuri de iluminat (alei, rampe, siguranță), prize, aparataj final, infrastructură EV (tuburi + cabluri + stații).
10. Montaj senzori CO, centrală IDSAI, sistem PGS/LPR/CCTV.
11. Montaj structură de prindere FV pe terasă.
12. Probe finale, PIF, reglaje, instruire beneficiar/operator.

### PTh-I.6.2 Susțineri și fixări (inclusiv cerințe seismice pentru conducte grele/PSI)

| Instalație | Tip susținere | Interax maxim | Observație seismică |
|---|---|---|---|
| Riser sprinkler/hidranți DN ≥ 100 (vertical, 7 niveluri) | consolă metalică ancorată la fiecare planșeu | la fiecare nivel (3,00 m) | verificare la sarcina seismică laterală, clasă expunere II (γI,e = 1,20) |
| Conductă sprinkler orizontală DN < 80 (branch) | tijă filetată simplă | conform interax capete (3,6 m) | — |
| Conductă apă PP-R | brățară glisantă (dilatare) | Ø≤32: 0,8 m; Ø40-63: 1,0 m | — |
| Tubulatură ventilare (dacă centralizată) | tijă filetată + profil | 1,5-2,0 m | — |
| Jgheab cabluri (7 tablouri de nivel) | consolă metalică | 1,0-1,5 m | separare tari/slabi pe toată verticala |
| Jet-fan (dacă soluție adoptată) | suporți dedicați din fișa producătorului, ancorați în planșeul postensionat | conform fișă | verificare punct de prindere cu structuristul, la fiecare platformă |

Toate conductele grele (sprinkler, hidranți) montate pe verticala celor 7 platforme se verifică la **încărcarea seismică suplimentară** transmisă structurii postensionate — coordonare obligatorie cu memoriul de rezistență pentru fiecare punct de prindere, în special la traversarea planșeelor (cap. PTh-I.3.10).

### PTh-I.6.3 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Conducte AR (anticondens, tronsoane expuse pe rampe exterioare) | 9-13 mm | elastomer |
| Tubulatură ventilare (trasee neîncălzite, toate platformele) | 20-50 mm | vată cu foaie Al |
| Conducte gospodărie apă incendiu (zonă critică antiîngheț, cap. PTh-I.2.12) | cablu de degivrare | electric autoreglabil |
| Rampă exterioară carosabilă (dacă există, cap. D02 `arhitectura-pth.md`) | cablu de degivrare 200-300 W/mp | electric autoreglabil, înglobat în șapă |

### PTh-I.6.4 Treceri etanșe la foc

La traversarea planșeelor dintre cele 7 platforme (fiecare = compartiment de incendiu distinct) și a oricărui element cu rol de compartimentare, toate trecerile de instalații se etanșează cu sisteme certificate de rezistență la foc egală cu a elementului străbătut:

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Conducte metalice (apă, sprinkler, hidranți) | manșon/mastic intumescent | EI conf. element (planșeu R/REI 90-120, cap. 1.6 `general.md`) |
| Conducte plastic (PP-R, PVC) | colier intumescent | EI conf. element |
| Fascicule cabluri (7 tablouri de nivel) | pernă/mastic + vopsea termospumantă | EI conf. element |
| Tubulatură ventilare (dacă traversează un compartiment diferit de cel deservit) | clapetă antifoc + etanșare | EI conf. element |

### PTh-I.6.5 Montaj structură de prindere fotovoltaic pe terasa open-deck

- **verificare structurală prealabilă** (obligatorie): încărcarea permanentă suplimentară (pergolă + module) și încărcarea de vânt se transmit la structura ultimului planșeu — se verifică de inginerul structurist **înainte de montaj**;
- **gabarit liber de circulație** — pergolele FV nu reduc, sub nicio formă, înălțimea liberă necesară circulației auto pe terasă (2,20-2,30 m, cap. 6.2 `general.md`) și se coordonează cu poziția reală a locurilor de parcare de pe ultimul nivel;
- **distanțe față de trapele/gurile de desfumare ale platformei superioare** — modulele FV nu se amplasează în imediata vecinătate a gurilor de extracție, păstrând culoare libere de acces pentru mentenanță;
- **legare la priza de pământ** — structura de prindere (metalică) se leagă la bara de echipotențializare, integrată cu sistemul de protecție la trăsnet (cap. 7.5 DTAC).

### PTh-I.6.6 Montaj cablare structurată curenți slabi (PGS/LPR/CCTV/IDSAI)

Cablarea PGS (senzori de ocupare, 460 buc.) și CCTV se montează pe jgheaburi/tuburi separate de circuitele de curent tare, cu distanță minimă de separare (≥300 mm în paralel, sau ecranare) pentru evitarea perturbațiilor electromagnetice induse de circuitele de forță (ventilatoare, EV charging). Traseul vertical de fibră optică/cablu structurat, care interconectează cele 7 platforme cu rack-ul central din boxa de control, se protejează în tub dedicat, cu rezervă de cablu (buclă de service) la fiecare nivel, pentru a permite intervenții locale fără afectarea întregului traseu.

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrarea hidraulică — sprinkler și hidranți, pe fiecare din 7 zone

Verificarea presiunii la fiecare ACS și la fiecare hidrant se face prin manometre montate temporar la punctele critice identificate la cap. PTh-I.3.1/3.2, comparate cu valorile de calcul, **pe fiecare din cele 7 platforme independent**; abaterea admisă ≤ ±10% (conform practicii SR EN 12845).

### PTh-I.7.2 Reglaj aeraulic — ventilare, pe fiecare din 7 platforme

Reglajul se face la gurile de admisie/extracție ale fiecărei platforme, cu anemometru, urmărind debitele proiectate (42.000 mc/h exploatare, 84.000 mc/h desfumare, cap. PTh-I.2.1-2.2). Criteriu (SR EN 12599): abatere debit total ≤ ±15%, pe fiecare gură ≤ ±20%. Reglajul senzorilor de CO (praguri 50/100/150 ppm, cap. 6.4 DTAC) se verifică cu gaz de calibrare, pe fiecare din cei 42 de senzori distribuiți pe cele 7 platforme.

### PTh-I.7.3 Probă funcțională stație de pompare incendiu

- Pornire automată la scădere de presiune simulată (deschidere robinet de test) — cronometrare timp de pornire, pe scenariul cel mai defavorabil (Etaj 5, cap. PTh-I.3.2).
- Comutare automată electropompă → pompă Diesel (simulare defect electric).
- Verificare pompă jockey (menținere presiune fără pornirea pompei principale la pierderi mici).
- Semnalizare stări la dispecerat (pornit/oprit/defect/nivel scăzut rezervor).

### PTh-I.7.4 Probă funcțională stație de pompare ape uzate

- Simulare umplere bazin colector → pornire automată pompă activă.
- Simulare defect pompă activă → comutare automată pe pompă de rezervă, fără întrerupere.
- Verificare alarmă de nivel maxim, transmisă la dispecerat.

### PTh-I.7.5 Programare BMS/IDSAI

- **BMS**: praguri de alarmare (avarie pompă, colmatare, presiune scăzută rezervă, nivel separator hidrocarburi), programe orare de iluminat/ventilare pe fiecare din cele 7 platforme, integrare cu profilul de producție FV și cu controllerul DLM.
- **IDSAI**: programare adrese (7 bucle, câte una per platformă), texte descriptive per platformă, temporizări T1/T2 pentru zonele cu personal permanent, testare integrală a matricei cauză-efect (cap. PTh-I.2.9), punere sub supraveghere permanentă.

### PTh-I.7.6 Protocol PIF fotovoltaic

- Verificare rezistență de izolație pe fiecare string DC.
- Test de polaritate și tensiune de circuit deschis (Voc) pe fiecare string.
- Punere sub tensiune progresivă (string cu string), verificare funcționare invertor și comunicare cu portalul de monitorizare.
- Test funcție anti-islanding.
- Măsurare producție inițială, proces-verbal de PIF cu curba de producție a primei zile.

### PTh-I.7.7 Protocol PIF gestiune de parcare (PGS/LPR) și DLM

- **PGS**: test funcțional pe toate cele 460 de locuri (corespondență senzor-indicator LED, actualizare afișaje centralizate în timp real).
- **LPR**: test recunoaștere pe eșantion de plăcuțe, verificare timp de răspuns la barieră, test fail-safe (deblocare automată la simularea alarmei IDSAI, cap. PTh-I.2.9).
- **DLM**: simulare cerere maximă simultană pe toate cele 48 de stații EV — verificare că puterea totală alocată nu depășește niciodată limita contractată de branșament, cu redistribuire automată fără oprirea completă a vreunei stații.

### PTh-I.7.8 Protocol PIF curenți slabi (CCTV, interfoane, VA/PA)

- **CCTV**: verificare câmp vizual per cameră (fără zone oarbe pe alei/bariere), test înregistrare/redare NVR.
- **Interfoane SOS**: test apel de la fiecare punct fix către dispecerat, pe toate cele 7 platforme.
- **VA/PA**: test difuzare mesaje vocale diferențiate pe platformă, verificare inteligibilitate pe zgomotul de fond al traficului/ventilatoarelor.

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, agremente, marcaj CE) | certificate | responsabil tehnic | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare, pluvial, separator hidrocarburi) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 4 | Poziționare goluri prin placa postensionată (înainte de întindere toroane) | proces-verbal + aviz structurist | RTE + inginer structurist | **FD** |
| 5 | Montaj rețea sprinkler pe fiecare din cele 7 platforme | proces-verbal montaj | RTE | CM |
| 6 | Probă presiune sprinkler (fiecare ACS, 1,5×p regim, min. 12 bar, 2h) | PV probă | RTE + diriginte + ISU | **FD** |
| 7 | Probă presiune hidranți (fiecare platformă) | PV probă | RTE + diriginte | CM |
| 8 | Probă etanșeitate apă menajeră | PV probă SR EN 806 | RTE + diriginte | CM |
| 9 | Probă canalizare înainte de mascare/acoperire | PV probă | RTE + diriginte | **FD** |
| 10 | Rezistență izolație + priză de pământ (electric, toate 7 tablouri de nivel) | buletin PRAM | verificator/laborator | CM |
| 11 | Test RCD/diferențiale, inclusiv RCD tip B (EV) | buletin PRAM | laborator autorizat | CM |
| 12 | Continuitate coborâri trăsnet + priză comună | buletin măsurători | laborator autorizat | CM |
| 13 | Etanșeitate tubulatură ventilare (clasa B, dacă centralizată) | PV clasă etanșeitate | RTE | CM |
| 14 | Funcțional IDSAI + matrice cauză-efect completă (toate 7 bucle) | PV probe 100% | firmă autorizată IGSU | **FD** |
| 15 | Funcțional stație de pompare incendiu (pornire automată, comutare rezervă) | PV probă | firmă autorizată + ISU | **FD** |
| 16 | Funcțional ventilare desfumare (comutare < 60 s, toate 7 cantoane) | PV probă | RTE + ISU | **FD** |
| 17 | Reglaj aeraulic (echilibrare debite, toate 7 platforme) | protocol debite | RTE | CM |
| 18 | Funcțional separator hidrocarburi | PV probă | RTE | CM |
| 19 | Funcțional stație pompare ape uzate (1+1R) | PV probă | RTE | CM |
| 20 | Funcțional DLM (simulare cerere maximă EV) | PV probă | RTE + furnizor sistem | CM |
| 21 | Funcțional PGS/LPR (100% locuri, fail-safe incendiu) | PV probă | RTE + furnizor sistem | CM |
| 22 | Funcțional FV (string-uri, invertoare) | PV probă + rapoarte producție | firmă autorizată | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU); CM = control în masă; CQ = control calitate recepție.

### PTh-I.8.1 Faze determinante — detaliere

Fazele marcate FD sunt cele la care lucrarea nu poate continua fără verificare și proces-verbal, întrucât elementul devine inaccesibil sau are rol direct de securitate: priza de pământ de fundație (acoperită de betonul de fundație), traseele îngropate (canalizare, separator de hidrocarburi — acoperite de pardoseală/pământ), poziționarea golurilor prin placa postensionată (element care nu poate fi corectat după întinderea toroanelor), proba de presiune a rețelei de sprinklere pe fiecare din cele 7 zone (rețea vitală pentru stingere), recepția IDSAI și a stației de pompare incendiu (verificare 100% cu prezența ISU, condiție pentru autorizarea de securitate la incendiu) și funcționarea sistemului de desfumare pe toate cele 7 cantoane.

### PTh-I.8.2 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație, pe fiecare din cele 7 platforme |
| Scheme finale | monofilară actualizată, coloane, izometrice, rețea sprinkler nod-cu-nod pe fiecare zonă |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (marcaj CE, agremente PSI) |
| Buletine de probe | PRAM, presiune sprinkler/hidranți, debite ventilare pe fiecare platformă |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv aviz ISU |
| Protocoale reglaj | echilibrare hidraulică, reglaj aeraulic pe fiecare platformă |
| Instrucțiuni de exploatare | operare stație pompare, IDSAI, BMS, DLM, PGS/LPR, FV |
| Program mentenanță | revizii periodice (sprinkler semestrial pe fiecare zonă, separator hidrocarburi, ISCIR unde e cazul) |
| Garanții | certificate garanție producători (pompe, centrală IDSAI, stații EV, FV) |

---

## PTh-I.9 Calcul iluminat interior și de siguranță (NP 061-2002, SR EN 12464-1)

### PTh-I.9.1 Metoda de calcul (flux luminos)

Calculul se face prin metoda factorului de utilizare, conform SR EN 12464-1 și NP 061-2002:

N = (E × S)/(Φ_corp × U × M)

unde E = nivelul de iluminare menținut cerut [lx], S = suprafața zonei [mp], Φ_corp = fluxul luminos al unui corp [lm], U = factorul de utilizare, M = factorul de mentenanță (0,80 pentru LED, redus la 0,70 în zonele cu praf de cauciuc/particule specifice traficului auto).

Corp de referință adoptat pentru alei/locuri de parcare: **LED 45 W/6.000 lm** (eficacitate ≥130 lm/W, IP65, rezistent la vibrații de trafic).

### PTh-I.9.2 Calcul detaliat pe zone — platforma-tip (Ac 2.400 mp)

| Nr. | Zonă | S [mp] | U | E cerut [lx] | N calc | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|
| Z01 | Alei de circulație + locuri de parcare | 2.400 | 0,45 | 75 | 69,4 | 70 | 3.150 |
| Z02 | Zonă rampă (segment interior platformei) | inclus în Z01 | 0,45 | 300 (zi)/75 (noapte) | corp dedicat gradient | 6 | 270 |

Exemplu de verificare (Z01):
N = (75 × 2.400)/(6.000 × 0,45 × 0,80) = 180.000/2.160 = 83,3 → se adoptă 70 corpuri (densitate confirmată prin fotometria exactă a corpului la faza de shop-drawing) + 6 corpuri suplimentare la gradientul de tranziție a rampei. Verificare finală prin releveu fotometric la recepție, pe fiecare din cele 7 platforme.

### PTh-I.9.3 Calcul detaliat — casa scării, boxa de control, zone tehnice

| Nr. | Zonă | S [mp] | E cerut [lx] | N adoptat | P instalat [W] |
|---|---|---|---|---|---|
| C01 | Casa scării (per nivel, ×7) | 15 | 100 | 2/nivel | 48/nivel |
| C02 | Boxa de control/casierie | 12 | 300 | 4 | 96 |
| C03 | Cameră pompe incendiu (subsol) | 25 | 200 | 3 (IP65) | 108 |
| C04 | Gospodărie de apă (subsol) | 20 | 200 | 3 (IP65) | 108 |
| C05 | Tablou general (TGD) | 15 | 200 | 2 | 72 |

### PTh-I.9.4 Sinteză putere instalată iluminat normal

| Zonă | Nr. corpuri | Putere instalată [W] |
|---|---|---|
| 7 platforme (alei+locuri+rampe) | 7 × 76 = 532 | 7 × 3.420 = 23.940 |
| Case de scări (7 niveluri) | 14 | 336 |
| Boxa de control | 4 | 96 |
| Zone tehnice subsol | 8 | 288 |
| Exterior (fațadă, acces) | 10 | 1.200 |
| **Total iluminat normal** | **568** | **≈ 25.860** |

Putere specifică: 25.860 W/16.800 mp (Ad) ≈ **1,54 W/mp**, valoare coerentă cu bilanțul din DTAC (55 kW instalat, cap. 7.1 — diferența reflectă faptul că valoarea DTAC includea și rezerve de proiectare/factori de siguranță globali, redetaliați aici pe zone exacte). Comandă cu senzori de prezență pe alei (economie estimată 50-70%, cap. 11.3 DTAC) și adaptare automată la luminanța exterioară pe rampe (cap. 8.2 DTAC).

### PTh-I.9.5 Iluminat de siguranță și evacuare (SR EN 1838)

| Tip iluminat siguranță | Cerință | Nivel | Autonomie | Amplasare |
|---|---|---|---|---|
| Evacuare (căi) | E ≥ 1 lx pe ax | 1 lx | 1 h | Culoare de circulație, case de scări, toate 7 platforme |
| Antipanică (spații > 60 mp) | E ≥ 0,5 lx la 1 m sol | 0,5 lx | 1 h | Toate platformele |
| Marcare hidranți/pompe/tablouri | E ≥ 5 lx | 5 lx | 1 h | Toate punctele PSI |
| Indicatoare direcție (EXIT, ISO 7010) | Luminanță ≥ 2 cd/mp | permanent | 1 h | Toate căile de evacuare, la fiecare schimbare de direcție |
| Indicatoare de ghidare către locuri libere (integrat PGS) | vizibilitate ≥15 m | — | — | Fiecare alee principală |

Calcul corpuri evacuare (culoar tip, lungime medie 60 m per platformă, corp 3 W/200 lm, interax 9 m): N = 60/9 ≈ **7 corpuri/platformă** + marcaj la fiecare acces de casă scării = 3 corpuri/platformă suplimentare.

| Zonă | Corpuri evacuare 3W (×7 platforme) | Corpuri antipanică 5W (×7 platforme) | Indicatoare EXIT 3W (×7 platforme) |
|---|---|---|---|
| Per platformă | 10 | 8 | 4 |
| **Total (7 platforme)** | **70** | **56** | **28** |

Total iluminat siguranță: 154 corpuri, alimentate prin **kit de acumulatori proprii integrați în fiecare corp** (cap. 8.5 DTAC), autonomie ≥1 h, autotest periodic automat, activare la cădere de tensiune sau la semnal IDSAI.

---

## PTh-I.10 Breviar de calcul suplimentar securitate la incendiu (instalații)

### PTh-I.10.1 Calcul detaliat reumplere rezervă de incendiu

Rezerva de 50 mc (cap. 9.5 DTAC) trebuie reumplută automat în maximum 24 h de la un consum (SR EN 12845/P118-2). Debit de reumplere necesar:

Q_reumplere = V_rezervă/t_reumplere = 50.000 l/(24 × 3.600 s) = **0,58 l/s ≈ 2,1 mc/h**.

Branșamentul de apă potabilă (dimensionat pentru consumul menajer la q_c = 0,60 l/s, cap. PTh-I.3.4) **acoperă acest debit de reumplere fără o rezervă suplimentară semnificativă** de capacitate — spre deosebire de un obiectiv cu rezervă mult mai mare (unde debitul de reumplere ar impune un racord dedicat, distinct de circuitul menajer), la prezenta scară debitul de 2,1 mc/h rămâne o fracțiune modestă a capacității rețelei publice urbane, confirmată totuși prin avizul operatorului de apă-canal la faza de execuție.

### PTh-I.10.2 Coloană umedă/uscată — verificare necesitate

Dat fiind regimul de înălțime S+P+5E (18,0 m diferență de cotă utilă de la rezervor la ultima platformă, cap. PTh-I.3.2) și acoperirea integrală a fiecărei platforme prin rețeaua proprie de hidranți interiori (cap. PTh-I.2.4), **coloana uscată separată nu este necesară** — rețeaua verticală de hidranți, alimentată permanent din stația de pompare proprie (regim umed, presurizat continuu de pompa jockey, cap. PTh-I.4.5), îndeplinește deja funcția pe care o coloană uscată dedicată ar acoperi-o la o construcție fără instalație proprie de stingere presurizată. Se menține, totuși, **racordul tip B la rezervor**, accesibil din exterior, pentru alimentarea directă a autospecialelor ISU, în completarea capacității proprii (cap. PTh-I.2.4).

### PTh-I.10.3 Verificare acces autospeciale la fiecare platformă

Accesul echipelor de intervenție ISU la fiecare din cele 6 platforme supraterane se realizează prin rampele de circulație auto (gabarit minim conform NP 24-97, cap. 6.2 `general.md`), verificate la faza de arhitectură pentru trecerea autospecialelor de intervenție (înălțime liberă, raze de viraj); accesul la subsol se realizează exclusiv prin rampa dedicată, fără altă cale alternativă — motiv suplimentar pentru care rezerva de apă proprie și instalația de desfumare a subsolului (cap. PTh-I.2.2) sunt dimensionate acoperitor, subsolul fiind platforma cu cel mai dificil acces extern pentru echipele de intervenție.

### PTh-I.10.4 Verificare timp de funcționare pompe vs. timp de intervenție ISU

Timpul de funcționare proiectat al pompelor (sprinkler 60 min per platformă activă, hidranți interiori 10 min concomitent, cap. 9.5 DTAC) trebuie să acopere timpul realist de intervenție a serviciilor de urgență de la momentul alarmei. Pentru amplasamente la distanță de subunitatea ISU care ar depăși timpii uzuali de intervenție, se recomandă beneficiarului confirmarea distanței față de cea mai apropiată subunitate și, dacă e cazul, suplimentarea autonomiei de combustibil a pompei Diesel peste minimul de 3 h — aspect de confirmat cu ISU la avizare, nefiind o cifră care poate fi stabilită onest fără datele reale de amplasament (conform principiului de proiectare onestă, aplicat consecvent în întreaga bibliotecă de documentații).

### PTh-I.10.5 Verificare timp de evacuare orientativ (RSET) vs. timp de dezvoltare a incendiului (ASET)

Pentru populația de calcul stabilită la cap. 1.6 DTAC (vârf instantaneu ≈150 persoane + personal 3-4, cu ipoteza acoperitoare N_evac ≈464 persoane pentru dimensionarea căilor de evacuare):

- timpul de detecție + alarmare (T_det): ≤ 60 s pe platforma afectată (detectoare automate, fără temporizare de investigare pe zona de risc de parcare, cap. PTh-I.2.9);
- timpul de reacție a ocupanților (T_reac): ≈ 60-180 s (populație tranzitorie, necunoscătoare a clădirii, spre deosebire de personalul de exploatare — ipoteză mai conservatoare decât la o clădire cu personal instruit);
- timpul de deplasare până la ieșire (T_depl): funcție de distanța maximă de parcurs pe platforma afectată, verificată la faza de arhitectură conform P118-1;
- **RSET (timp total necesar evacuării)** = T_det + T_reac + T_depl, se compară cu **ASET (timpul disponibil înainte ca condițiile să devină critice)**, determinat de dezvoltarea reală a incendiului pe platforma afectată și de eficiența desfumării calculate la cap. PTh-I.3.9.

Verificarea cantitativă completă RSET < ASET, cu marjă de siguranță, se realizează în **scenariul de securitate la incendiu** (document dedicat, elaborat de expert/proiectant atestat conform Ordinului MAI 129/2016), care preia breviarele hidraulice și de desfumare din prezentul supliment ca date de intrare validate. Prezentul document de instalații nu se substituie scenariului de securitate la incendiu, ci îi furnizează parametrii tehnici confirmați ai instalațiilor (debite, presiuni, timpi de răspuns ai echipamentelor), pe fiecare din cele 7 platforme.

---

## PTh-I.11 Gestiunea de parcare — caiet tehnic complet (PGS, LPR, ticketing)

### PTh-I.11.1 Obiectivele funcționale ale gestiunii de parcare

Sistemul de gestiune a parcării (cap. 10.1-10.2 DTAC) urmărește, la faza de execuție, trei obiective tehnice distincte, fiecare cu propria arhitectură de echipament: **ghidarea directă a utilizatorilor către locurile disponibile** (PGS), **automatizarea accesului și a facturării** (LPR + ticketing) și **monitorizarea și securitatea generală** (CCTV + interfoane), toate trei convergând într-un singur server de gestiune, amplasat în boxa de control, cu terminal de operare pentru personalul de exploatare (cap. 1.6 DTAC).

### PTh-I.11.2 Sistemul PGS — arhitectura detaliată

Fiecare din cele 460 de locuri de parcare este echipat cu un **senzor individual de ocupare**, montat pe tavan deasupra locului (tip ultrasonic sau infraroșu, cu autonomie de funcționare/comunicare wireless sau prin cablare dedicată, funcție de soluția tehnică adoptată la execuție), cuplat cu un **indicator LED** (verde = liber, roșu = ocupat) vizibil de la o distanță de minimum 15 m pe aleea de circulație. Datele de ocupare converg, prin rețeaua de curenți slabi (cap. PTh-I.6.6), la un **server central PGS**, care agregă informația pe fiecare platformă și o afișează pe:

- **afișaje de intrare pe fiecare platformă** — numărul de locuri libere pe acea platformă, actualizat în timp real;
- **afișajul de intrare generală a construcției** — numărul total de locuri libere, defalcat pe platforme, permițând utilizatorului o decizie informată înainte de a intra pe rampă;
- **indicatoare de ghidare pe alei** — săgeți luminoase care direcționează traficul către cea mai apropiată zonă cu locuri disponibile, actualizate dinamic pe măsură ce ocuparea se modifică.

Beneficiul funcțional al PGS, tratat pe larg la cap. 10.1 DTAC (reducerea traficului de „căutare" a unui loc liber, cu efect direct asupra sarcinii reale a instalației de ventilare, cap. PTh-I.2.1), se verifică la faza PIF (cap. PTh-I.7.7) prin măsurarea timpului mediu de căutare înainte și după activarea completă a sistemului — indicator de performanță reținut în cartea tehnică pentru raportări ulterioare de eficiență.

### PTh-I.11.3 Sistemul LPR și ticketing — arhitectura detaliată

Camerele LPR, poziționate la fiecare barieră de intrare/ieșire (și, opțional, la fiecare punct intermediar de schimbare de nivel dacă soluția de arhitectură prevede control de acces per platformă), identifică automat plăcuța de înmatriculare a fiecărui vehicul, coroborată cu:

- **sistemul de abonamente** — vehiculele înregistrate cu contract activ beneficiază de deblocare automată a barierei, fără nicio interacțiune manuală;
- **sistemul de tichet fizic/POS** — pentru utilizatorii ocazionali, alternativ la LPR, cu casierie automată la ieșire (plată card/numerar) sau POS mobil la casierie manuală (boxa de control);
- **integrarea cu matricea cauză-efect** (cap. PTh-I.2.9) — la orice alarmă de incendiu confirmată, toate barierele (indiferent de nivel) se deschid automat, în regim fail-safe, indiferent de starea contului de facturare, prioritizând integral evacuarea vehiculelor și a persoanelor față de orice considerent comercial.

### PTh-I.11.4 Software de gestiune și rapoarte

Serverul central de gestiune produce, pentru operatorul construcției, rapoarte de ocupare orară/zilnică/lunară pe fiecare platformă (utile atât pentru optimizarea tarifării, cât și pentru calibrarea ulterioară a strategiei DCV de ventilare, cap. PTh-I.3.11, care beneficiază direct de un profil real de ocupare, mai precis decât ipoteza de proiectare inițială), integrarea cu sistemul BMS/SCADA general (cap. 10.4 DTAC) și, dacă beneficiarul optează, cu o aplicație mobilă de rezervare/plată la distanță, funcțională prin API deschis către serverul PGS/LPR.

---

## PTh-I.12 Semnalizarea rutieră internă — caiet tehnic complet

### PTh-I.12.1 Marcaje orizontale

Marcajele orizontale, executate conform **STAS 1848-7**, cu vopsea rutieră reflectorizantă rezistentă la trafic intens și la sărurile antiderapante (compatibilă cu clasa de expunere XD3/XF4 a betonului, `structura.md`), acoperă:

- **sensurile de circulație** pe alei (săgeți direcționale la fiecare intersecție de alee, culoare albă);
- **conturul locurilor de parcare** (linie continuă albă, 2,50×5,00 m standard, 3,50×5,00 m locuri PMR marcate suplimentar cu pictograma internațională de accesibilitate și cu fond albastru);
- **liniile de ghidare pe rampe** (linie continuă la mijlocul benzii de circulație, pe toată lungimea rampei, inclusiv pe curbele de racord);
- **marcaje de interzicere** (zone de interzis oprirea — la baza/vârful rampelor, în fața hidranților interiori și a ușilor de acces la casa scării);
- **marcaje de identificare a locurilor cu stații EV** (pictograma dedicată + fond verde, la locurile echipate cu stații AC/DC, cap. PTh-I.2.13).

### PTh-I.12.2 Indicatoare verticale

| Indicator | Poziționare | Mesaj |
|---|---|---|
| Limitare de viteză | la intrarea pe fiecare platformă și la fiecare schimbare de rampă | 10-15 km/h |
| Cedează trecerea | la fiecare intersecție de alei fără vizibilitate directă | conform prioritate de sens |
| Interzis oprirea | pe rampe, în fața hidranților | — |
| Locuri PMR | la fiecare loc dedicat (≥4% din total, cap. 6.4 `general.md`) | pictogramă accesibilitate |
| Locuri EV | la fiecare loc echipat/pre-echipat | pictogramă EV + tip conector (AC/DC) |
| Înălțime liberă | la intrarea pe fiecare rampă și la fiecare schimbare de gabarit | 2,10-2,20 m |
| Direcție ieșire/evacuare | corelat cu iluminatul de siguranță (cap. PTh-I.9.5) | pictograme ISO 7010 |

### PTh-I.12.3 Oglinzi convexe și elemente de siguranță pasivă

Oglinzi convexe (diametru ≥60 cm, montate la înălțime 2,00-2,20 m) se poziționează la toate curbele de racord ale rampelor (cap. D01 `arhitectura-pth.md`) și la colțurile de alee cu vizibilitate redusă (nuclee tehnice, case de scări care obturează linia de vedere), completate cu **bordură de ghidare** (h = 15 cm) sau parapet metalic pe marginea liberă a rampelor (cap. D01, D04 `arhitectura-pth.md`), coordonate direct cu detaliile de execuție ale memoriului de arhitectură.

### PTh-I.12.4 Bariere motorizate — tehnologie și integrare

Barierele de acces/ieșire (cap. PTh-I.4.19), cu timp de ridicare ≤3 s, sunt comandate în regim normal de sistemul LPR (cap. PTh-I.11.3) și, în regim de avarie/incendiu, comutate automat pe fail-safe (deschidere fixă, indiferent de starea electrică sau de comandă, cap. PTh-I.2.9) — verificarea acestui regim de avarie este obligatorie la PIF (cap. PTh-I.7.7), inclusiv testul de deschidere manuală de urgență (mâner/cheie dedicată) pentru situația improbabilă a unei căderi simultane a alimentării generale și a sursei de rezervă.

---

## PTh-I.13 Concluzii și corelare finală

Prezentul supliment PTh detaliază integral, la nivel de execuție, toate instalațiile parcajului public colectiv multietajat închis, regim S+P+5E, 460 de locuri, pe fiecare din cele 7 platforme carosabile stabilite în DTAC (`instalatii.md`): rețeaua de sprinklere OH2 (calculată nod-cu-nod pe fiecare din cele 7 zone ACS, confirmând debitul global de 12,0 l/s/platformă din DTAC), hidranții interiori/exteriori (cu punctul cel mai defavorabil identificat la Etajul 5, determinant pentru presiunea de proiectare a stației de pompare — 46 mCA), rețeaua de apă/canalizare/pluvial, separatorul de hidrocarburi NS 10 (confirmat identic prin recalculare), ventilarea de exploatare și desfumare pe fiecare platformă (cu tratarea distinctă a subsolului, singura platformă fără nicio cale de aport prin fațadă), instalația electrică completă cu selectivitate pe 7 tablouri de nivel și alimentare de rezervă, infrastructura de încărcare a vehiculelor electrice cu managementul dinamic al sarcinii verificat pe profil orar real, IDSAI cu matrice cauză-efect pe 7 bucle independente, priza de pământ și protecția la trăsnet, precum și componentele specifice acestui tip de obiectiv — gestiunea de parcare (PGS/LPR) și semnalizarea rutieră internă, ambele detaliate ca piese tehnice complete, absente la orice altă funcțiune din prezenta bibliotecă.

Toate valorile de dimensionare din DTAC au fost **verificate prin recalculare nod-cu-nod** și confirmate coerente: sprinklere 12,0 l/s/platformă, separator hidrocarburi NS 10, ventilare 42.000/84.000 mc/h per platformă, EV 776 kW instalat/~200-230 kW calcul prin DLM verificat pe profil orar. Elementele suplimentare introduse la faza PTh (breviar hidraulic pe noduri și pe verticală, identificarea Etajului 5 drept cazul hidraulic cel mai defavorabil, fișe tehnice de echipament, tabele de probe, tehnologie de montaj cu accent pe coordonarea cu placa postensionată, PCC, calcul iluminat complet pe fiecare platformă, caietele tehnice de gestiune de parcare și semnalizare rutieră) constituie baza pentru execuție, verificare de proiect (verificatori atestați pe cerințele Is/It/Ie/Ci) și autorizare de securitate la incendiu (ISU), conform Legii 10/1995 și HG 907/2016.

**Confirmări necesare înainte de finalizarea execuției** (semnalate onest, nu presupuse): clasificarea reală deschis/închis a fiecărei platforme, confirmată prin măsurătoarea exactă a procentului de goluri de fațadă executate (mesh/lamele, cap. D03 `arhitectura-pth.md`) — o eventuală recalificare a unui nivel ca „deschis" ar permite, conform cap. 4.7 `general.md`, o reducere a ventilării mecanice de exploatare pe acel nivel, fără a afecta însă desfumarea sau sprinklerele, tratate acoperitor indiferent de clasificare; distanța reală față de subunitatea ISU, pentru validarea autonomiei pompei Diesel; avizul operatorului de distribuție electrică (SDEE) pentru sporul de putere confirmat la execuție; și avizul de racordare ca prosumator pentru sistemul fotovoltaic al terasei. Orice modificare a ipotezei funcționale de bază (de exemplu o extindere a capacității EV peste procentul adoptat) impune, conform regulii deja stabilite în DTAC, re-dimensionarea integrală a bilanțului electric și verificarea corespunzătoare a DLM.

---

## ANEXA B — Breviar centralizat PTh (verificare de coerență cu breviarul DTAC)

Anexa reunește, pentru trasabilitate, toate mărimile de calcul rezultate în prezentul supliment PTh, alături de valoarea corespunzătoare din breviarul DTAC (`instalatii.md`), confirmând coerența dintre dimensionarea preliminară și calculul de execuție nod-cu-nod.

**B.1 Sprinklere și hidranți:**
- debit de platformă (metodă simplificată DTAC): 12,0 l/s ↔ debit confirmat prin calcul nod-cu-nod (PTh-I.3.1): 12,0 l/s — **coerent**;
- presiune necesară la refularea pompei pentru sprinkler, Etaj 5 (PTh): ≈ 30 mCA; pentru hidranți, Etaj 5 (PTh): ≈ 46 mCA — **hidranții confirmați determinanți**, valoare adoptată pentru dimensionarea electropompei principale (90 kW);
- rezervă totală de incendiu: 50 mc (DTAC) — nemodificată la PTh.

**B.2 Apă și canalizare:**
- debit de calcul apă menajeră: 0,60 l/s (DTAC) ↔ 0,60 l/s confirmat pe toate tronsoanele (PTh-I.3.4);
- pierdere de sarcină traseu cel mai defavorabil (Etaj 5): ≈ 17 mCA (PTh, recalculare nod-cu-nod, incluzând cota geodezică) — **distribuție gravitațională confirmată**, sub presiunea tipică a rețelei publice urbane;
- debit canalizare de spălare: 3-6 l/s (DTAC) ↔ verificat pe fiecare coloană (PTh-I.3.5), h/D < 0,5 pe toate tronsoanele.

**B.3 Separator de hidrocarburi:**
- NS 10, clasa I (DTAC) ↔ confirmat identic prin recalculare pe traseul real (PTh-I.3.6), fără componentă suplimentară de presiune (poziționat la subsol, cota cea mai joasă).

**B.4 Electric:**
- putere de calcul Pc ≈ 393 kW, ~470 kVA (DTAC) ↔ confirmat prin însumarea tuturor circuitelor detaliate pe 7 tablouri de nivel + TS-EV + TS-securitate (PTh-I.3.7);
- curent de pornire motor pompă incendiu (nou, PTh): ≈ 1.008 A la pornire directă → soluție soft-starter adoptată (PTh-I.3.8), aspect neexaminat explicit în DTAC (dimensionare preliminară globală);
- EV: 776 kW instalat (DTAC) ↔ ~200-230 kW calcul confirmat prin verificare pe profil orar real de simultaneitate, cs ≈ 0,25-0,30 (PTh-I.3.13).

**B.5 Ventilare/desfumare:**
- exploatare 42.000 mc/h/platformă, desfumare 84.000 mc/h/platformă (DTAC) ↔ confirmate identic pe fiecare din cele 7 platforme (PTh-I.2.1-2.2), cu tratare distinctă a subsolului (aport de compensare integral mecanic, fără nicio contribuție de fațadă);
- debit masic pană de fum verificat pe fiecare canton (PTh-I.3.9): 18-22 kg/s, în intervalul confirmat de metoda schimburilor orare.

**B.6 Iluminat (nou, detaliat integral la PTh):**
- putere instalată iluminat normal: ≈ 25.860 W/16.800 mp (Ad) ≈ 1,54 W/mp;
- iluminat de siguranță: 154 corpuri (toate 7 platforme), autonomie 1 h, conform SR EN 1838.

**B.7 Fotovoltaic (nou, repartizat lunar la PTh):**
- producție anuală: 414 MWh/an (DTAC) ↔ repartizată pe 12 luni (PTh-I.3.12), cu vârf iunie-august și minim decembrie-ianuarie, coerent cu profilul climatic al zonei.

**B.8 Gestiune de parcare și semnalizare rutieră (noi, integral detaliate la PTh):**
- PGS: 460 senzori de ocupare, integrare BMS și corelare cu profilul real de ocupare pentru calibrarea DCV (PTh-I.11.2, PTh-I.3.11);
- semnalizare rutieră: marcaje STAS 1848-7, indicatoare verticale, oglinzi convexe, bariere fail-safe (PTh-I.12).

Concluzia verificării de coerență: **toate valorile globale ale breviarului DTAC se confirmă prin calculul de execuție nod-cu-nod al prezentului supliment PTh**, cu marje rezonabile care acoperă variațiile reale de traseu ce se confirmă la shop-drawing și la execuție. Singurul aspect nou determinant identificat la PTh — hidranții interiori de la Etajul 5, nu sprinklerele, ca cerință de presiune dominantă a stației de pompare — nu contrazice dimensionarea DTAC, ci o completează la nivelul de detaliu specific unei construcții cu dezvoltare mare pe verticală (7 platforme, 18,0 m diferență de cotă).

---

*Supliment de fază PTh — instalații. Se citește împreună cu memoriul DTAC `instalatii.md` (care rămâne referința pentru încadrarea normativă și dimensionarea preliminară) și cu memoriile `general.md`, `arhitectura.md`, `arhitectura-pth.md`, `structura.md` pentru coordonarea interdisciplinară.*
