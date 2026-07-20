# MEMORIU TEHNIC DE INSTALAȚII ELECTRICE + PSI — DTAC

## SISTEM DE STOCARE A ENERGIEI ÎN BATERII (BESS) — CAPACITATE INSTALATĂ PARAMETRICĂ 10–50 MWh (EXEMPLU DE REFERINȚĂ: 20 MWh / 10 MW)

*Prezentul memoriu tratează, la faza documentației tehnice pentru autorizarea executării lucrărilor de construire (D.T.A.C.), componenta de instalații a unui obiectiv de tip **BESS (Battery Energy Storage System) — stație de stocare a energiei electrice în baterii**, cu capacitate energetică instalată parametrică în intervalul 10–50 MWh și putere de descărcare/încărcare dimensionată funcție de C-rate de proiect. Datele de identificare a investiției, încadrarea urbanistică, regimul juridic al terenului și lista avizelor solicitate se tratează în memoriul tehnic general; amplasarea containerelor pe platformă, accesele, împrejmuirea și sistematizarea pe verticală se tratează în memoriul de arhitectură; fundațiile containerelor, ale postului de transformare și ale structurilor auxiliare, precum și ancorarea seismică a echipamentelor, se tratează în memoriul de structură. Prezentul memoriu nu reproduce conținutul acelor piese, ci le presupune cunoscute și se concentrează exclusiv pe dimensionarea și justificarea soluțiilor de instalații electrice, termice și de securitate la incendiu, cu breviarele de calcul aferente fiecărei componente. Spre diferență de o clădire obișnuită, la un BESS **instalațiile nu sunt un accesoriu al construcției, ci constituie obiectul de investiție însuși** — containerele de baterii, sistemul de conversie a puterii, transformatorul, celulele de medie tensiune și sistemele de management/siguranță sunt, împreună, tehnologia a cărei funcționare corectă și sigură reprezintă scopul întregii documentații. Din acest motiv, prezentul memoriu este dezvoltat cu un nivel de detaliu tehnic superior celui obișnuit pentru instalațiile unei clădiri civile, incluzând raționamentul electrochimic, termic și de securitate care fundamentează fiecare soluție adoptată. Exemplul numeric dezvoltat pe parcursul memoriului corespunde unei configurații de referință de **20 MWh energie instalată, DoD de proiect 90% (18 MWh utili), putere de descărcare 10 MW la C-rate 0,5C (autonomie 2h)** — toate formulele rămân însă parametrice și recalculabile la orice capacitate din intervalul 10–50 MWh prin relațiile prezentate la fiecare capitol.*

---

## 0. CUPRINS

1. Date generale, cadru normativ și ipoteze de calcul
2. Arhitectura electrică generală — de la celula electrochimică la SEN
3. Breviar de calcul — capacitate, putere, randament, dimensionarea conductoarelor
4. Sistemul de management al bateriei (BMS) — arhitectură pe patru niveluri
5. Power Conversion System (PCS) — invertoarele bidirecționale
6. Tabloul de medie tensiune, transformatorul ridicător și racordarea la SEN
7. Protecții electrice — DC, joasă tensiune, medie tensiune
8. Priza de pământ și protecția la trăsnet
9. Sistemul de climatizare (HVAC) și managementul termic al bateriilor
10. Detecția de gaze și fum — sisteme de detecție timpurie a ambalării termice
11. Stingerea incendiului — strategie, agenți și dimensionare
12. Ventilația de deflagrație (explosion venting)
13. Compartimentare, distanțe de siguranță și autorizarea ISU
14. EMS și SCADA — dispecerizare, telemetrie, comunicații, securitate cibernetică
15. Alimentări auxiliare — UPS, alimentare de black-start, generator de rezervă
16. Instalații sanitare și canalizare — clădirea/containerul de control
17. Iluminat — interior, siguranță, exterior de securitate, CCTV
18. Curenți slabi — comunicații, control acces, integrare cu PSI
19. Coordonarea interdisciplinară
20. Recepția, probele și punerea în funcțiune
21. Concluzii, sinteză de indicatori, verificare tehnică și avize

---

## 1. Date generale, cadru normativ și ipoteze de calcul

### 1.1. Obiectul memoriului și particularitățile instalațiilor unui BESS

Un sistem de stocare a energiei în baterii de tip utility-scale nu este, funcțional, o clădire deservită de instalații, ci un **ansamblu tehnologic industrial** compus din containere prefabricate de baterii litiu-ion, un sistem de conversie a puterii, un post de transformare ridicător și infrastructura de racordare la Sistemul Energetic Național (SEN), amplasate pe o platformă betonată, împrejmuită și supravegheată. Particularitatea centrală care guvernează întreaga proiectare, spre diferență de orice altă funcțiune tratată în prezenta bibliotecă (locuință, birou, unitate medicală, hotel), este faptul că **riscul dominant nu este cel structural sau cel de utilizare curentă a unei clădiri, ci riscul electrochimic specific bateriilor litiu-ion — ambalarea termică (thermal runaway)** — un fenomen care, odată declanșat la nivelul unei singure celule, poate propaga în cascadă la nivelul întregului rack și, în absența unor măsuri de compartimentare adecvate, la containerele adiacente. Această particularitate explică de ce capitolele de securitate la incendiu (10–13) ocupă, în prezentul memoriu, o pondere comparabilă cu cea a capitolelor pur electrice — la un BESS, protecția la incendiu nu este o cerință reglementară adăugată ulterior proiectării electrice, ci este **integrată organic în arhitectura electrică** (BMS-ul este, simultan, un sistem de măsurare, de protecție electrică și de prevenire a incendiului).

A doua particularitate este natura **bidirecțională** a fluxului de energie: spre diferență de o centrală de producție (parc fotovoltaic, eolian), care produce energie într-un singur sens (de la sursă către SEN), un BESS **absoarbe energie din rețea (încărcare) și o restituie rețelei (descărcare)**, la momente de timp alese de operator sau de un algoritm de dispecerizare, în funcție de semnalul de preț, de necesarul de servicii de sistem (reglaj de frecvență, rezervă) sau de un contract de furnizare a unui serviciu de flexibilitate. Această bidirecționalitate impune un sistem de conversie a puterii (PCS) capabil să funcționeze atât ca invertor (DC→AC, la descărcare), cât și ca redresor comandat (AC→DC, la încărcare), cu reglaj continuu al puterii active și reactive în ambele sensuri — o cerință tehnică fără echivalent la o instalație electrică obișnuită de curenți tari.

A treia particularitate este faptul că sursa de energie a instalației (bateria însăși) este, simultan, **cea mai mare masă de energie stocată de pe amplasament** și, potențial, sursa unui eveniment de incendiu de amploare — spre diferență de o clădire civilă, unde sursele de energie (rețeaua electrică, gazul natural) sunt externe clădirii și pot fi izolate la un punct unic de intrare, la un BESS energia stocată în celule **nu poate fi „oprită" instantaneu** printr-o simplă deconectare a alimentării externe; ea rămâne prezentă în celule, sub formă chimică, indiferent de starea întreruptoarelor. Această realitate fizică fundamentează cerința de detecție timpurie (capitolul 10) și de strategie de stingere prin răcire, nu prin înăbușire (capitolul 11).

### 1.2. Parametrii de referință ai instalației

| Element | Valoare de referință | Observație |
|---|---|---|
| Capacitate energetică instalată (E_inst) | **20 MWh** (parametric 10–50 MWh) | valoare nominală, la începutul vieții (BOL), DC-side |
| Adâncimea de descărcare de proiect (DoD) | **90%** | rezervă 10% pentru protecția SOH, cap. 4.5 |
| Capacitate utilă (E_util) | **18 MWh** | E_inst × DoD |
| Putere de descărcare/încărcare (P) | **10 MW** la C-rate 0,5C (autonomie 2h) | recalculabil parametric, cap. 3.2 |
| Chimie celulă | **LFP (LiFePO4)** | stabilitate termică superioară NMC, cap. 1.3 |
| Tensiune celulă | 3,2 V nominal (2,5–3,65 V ferestre alarmă) | cap. 4.1 |
| Capacitate celulă | 280–314 Ah | format prismatic, uzual industrie |
| Tensiune modul | ~48–52 V | pachet serie de celule |
| Energie modul | ~5 kWh | N_module = E_inst/E_modul = 4.000 |
| Tensiune rack (DC bus) | 1.000–1.500 V DC | cap. 2.3 |
| Energie rack | 200–400 kWh | funcție de nr. module/rack |
| Energie container | 2–5 MWh | 20 MWh ⇒ 4–10 containere |
| Tensiune AC ieșire PCS | 0,4/0,69 kV | cap. 5.1 |
| Tensiune transformator ridicător | 0,69/20 kV | cap. 6.1 |
| Punct de racordare SEN | 20 kV (medie tensiune), cu treaptă superioară eventuală 110 kV la substația OD | cap. 6.3 |
| Randament round-trip (η_RT) | **88,5%** | cap. 3.3 |
| Categoria de importanță (HG 766/1997) | de regulă **C** (obiectiv energetic, fără aglomerări de persoane), risc mare de incendiu | memoriul general |

### 1.3. De ce chimia LFP și de ce riscul rămâne totuși relevant

Alegerea chimiei **litiu-fero-fosfat (LiFePO₄, LFP)** în locul altor chimii litiu-ion (NMC — nichel-mangan-cobalt, NCA — nichel-cobalt-aluminiu) pentru aplicații staționare de tip BESS este justificată de o **stabilitate termică intrinsec superioară**: temperatura de descompunere a catodului LFP (peste ~270 °C, cu degajare de oxigen mult mai limitată) este semnificativ mai ridicată decât cea a catozilor NMC/NCA (~150–210 °C), iar entalpia reacției de descompunere este mai mică, ceea ce reduce probabilitatea și viteza de propagare a unei ambalări termice odată inițiate. Această proprietate electrochimică este motivul pentru care marea majoritate a instalațiilor BESS de tip utility-scale construite după 2020 folosesc LFP, iar prezentul memoriu adoptă această chimie ca ipoteză de proiectare.

Stabilitatea superioară a LFP **nu elimină** riscul de ambalare termică, ci îl reduce ca probabilitate și îi întârzie evoluția — motiv pentru care standardele de referință (**UL 9540, UL 9540A, NFPA 855, IEC 62933-5-2**) nu fac excepție de la cerințele de detecție, compartimentare și ventilație de deflagrație pentru instalațiile pe bază de LFP, ci impun, pentru orice chimie litiu-ion, un test de propagare la scară de unitate/rack/container (UL 9540A) care fundamentează, cu date experimentale specifice produsului efectiv instalat, distanțele de siguranță și necesitatea (sau nu) a pereților rezistenți la foc între unități — aspect detaliat la capitolul 13.1. Prezentul memoriu adoptă, în lipsa unui raport de testare UL 9540A specific echipamentului contractat la faza PT, **ipoteza conservatoare a propagării posibile între unități**, cu toate măsurile de compartimentare aferente; raportul de testare al producătorului, odată disponibil, poate justifica o relaxare a distanțelor, dar nu poate justifica eliminarea sistemelor de detecție/stingere/ventilație descrise la capitolele 10–12.

### 1.4. Cadrul normativ aplicabil

**Instalații electrice de joasă și medie tensiune:**
- I7-2011 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor electrice cu tensiuni până la 1.000 V c.a. și 1.500 V c.c.
- PE 155 — Normativ pentru proiectarea și executarea rețelelor de cabluri electrice
- NTE 001/007 — normative tehnice de execuție a rețelelor electrice
- PE 116, PE 124, PE 132 — normative de încercări, exploatare și proiectare a instalațiilor electroenergetice
- SR EN 61439-1/2 — ansambluri de aparataj de joasă tensiune
- SR EN 62271 (seria) — aparataj de comutație de medie tensiune
- SR EN 60076 — transformatoare de putere

**Standarde specifice bateriilor și stocării de energie:**
- **IEC 62933-1, -2, -3, -5-1, -5-2** — sisteme electrice și electronice de stocare a energiei (EES): terminologie, cerințe de planificare, cerințe de mediu și, în special, **IEC 62933-5-2 — cerințe de siguranță pentru sistemele bazate pe baterii**
- **IEC 62619** — cerințe de siguranță pentru bateriile litiu-ion utilizate în aplicații industriale staționare
- **IEC 63056** — specificații de performanță și încercări pentru sistemele de stocare cu baterii litiu-ion conectate la rețea
- **UL 9540** — standard de siguranță pentru sistemele de stocare a energiei și echipamentele asociate (Energy Storage Systems and Equipment)
- **UL 9540A** — metoda de încercare pentru evaluarea propagării termice în sistemele de stocare cu baterii (Test Method for Evaluating Thermal Runaway Fire Propagation)
- **NFPA 855** — Standard for the Installation of Stationary Energy Storage Systems (distanțe de siguranță, compartimentare, ventilație)
- **NFPA 68 / NFPA 69** — venting of deflagrations / explosion prevention systems
- **EN 14994** — sisteme de protecție la explozie prin ventilare (gas explosion venting protective systems)
- **SR EN 62305-1…4** — protecția structurilor împotriva trăsnetului

**Securitate la incendiu (interfață, fără a substitui scenariul dedicat):**
- P118-1/2013, P118-2/2013, P118-3/2015 — securitatea la incendiu a construcțiilor
- Ordinul MAI 129/2016 — norme metodologice privind avizarea/autorizarea de securitate la incendiu
- HG 571/2016 — categoriile de construcții/amenajări care se supun avizării/autorizării ISU

**Racordare la rețeaua electrică:**
- Codul Tehnic al Rețelei Electrice de Transport (Cod RET) / Codul Tehnic al Rețelei Electrice de Distribuție (Cod RED), aprobate prin ordine ANRE
- **Regulamentul (UE) 2016/631 (RfG — Requirements for Generators)** — cerințe tehnice de racordare la rețea pentru modulele de generare, aplicabile prin analogie și modulelor de stocare
- Ordinele ANRE privind avizul tehnic de racordare (ATR), certificarea de conformitate și metodologia de racordare

Această listă normativă, deja consemnată sintetic în varianta anterioară a memoriului, este dezvoltată și aplicată, cu trimitere explicită la articol/capitol, în cadrul fiecăreia dintre secțiunile tehnice care urmează.

### 1.5. Parametrii climatici și ipotezele de calcul termic

| Parametru | Valoare | Observație |
|---|---|---|
| Temperatura exterioară de calcul iarnă | −15…−18 °C | funcție de zona climatică a amplasamentului |
| Temperatura exterioară de calcul vară | +32…+37 °C | vârf estival, relevant pentru dimensionarea HVAC (cap. 9) |
| Fereastra țintă de temperatură internă container (setpoint HVAC) | **20–25 °C** | optimizare cicluri de viață, cap. 9.2 |
| Fereastra de operare tolerată a celulelor (limite producător) | ~ −20…+55 °C (descărcare) / 0…+45 °C (încărcare), cu degradare accelerată peste ~35 °C susținut | fișa tehnică a celulei; HVAC-ul se proiectează pe setpoint-ul de longevitate (20–25 °C), nu pe limitele de supraviețuire |
| Umiditate relativă interior container | ≤ 60% (fără condens pe busbar-uri) | protecție anticoroziune și electrică |
| Grad de protecție containere | IP54 minim (exterior), NEMA 3R/4 echivalent | mediu exterior, praf, ploaie |

Distincția dintre **fereastra de operare tolerată** (limitele fizice ale celulei, în afara cărora BMS-ul întrerupe funcționarea, cap. 4.1) și **setpoint-ul HVAC de proiectare** (banda țintă în care sistemul de climatizare menține activ containerul, cap. 9.2) este esențială pentru înțelegerea corectă a dimensionării termice: HVAC-ul nu este dimensionat să evite o eventuală depășire catastrofală a limitelor de supraviețuire (aceasta este funcția BMS-ului și a sistemelor de detecție/stingere, cap. 4 și 10–12), ci să mențină celulele într-o bandă îngustă, optimă pentru **viața utilă (cycle life) și pentru randamentul energetic**, aspect dezvoltat integral la capitolul 9.

### 1.6. Principii de proiectare specifice unui BESS

- **Redundanță proporțională cu consecința** — sistemele de detecție de gaz/fum, BMS-ul și E-stop-ul sunt integral redundante (surse duble de alimentare, comunicație pe două căi), în timp ce sistemele de confort (HVAC de menținere a temperaturii în afara ferestrei critice) sunt proiectate cu redundanță N+1 la nivel de container, nu la nivelul întregii instalații.
- **Detecția precede întotdeauna stingerea** — arhitectura de securitate la incendiu (cap. 10–12) este construită pe principiul că cea mai eficientă intervenție este **prevenirea propagării printr-o detecție cât mai timpurie** (gaze de degazare înainte de flacără), nu stingerea unui incendiu deja declanșat.
- **Compartimentarea fizică este linia de apărare finală** — distanțele și pereții rezistenți la foc dintre containere (cap. 13) sunt proiectați să limiteze consecința unui eveniment de propagare necontrolată la o singură unitate, indiferent de performanța sistemelor active de detecție/stingere.
- **Fiecare subsistem electric are o funcție dublă** (control funcțional + siguranță) — BMS-ul, PCS-ul și SCADA-ul nu sunt doar instrumente de operare, ci constituie, împreună, prima linie de protecție împotriva ambalării termice, prin oprirea automată a încărcării/descărcării la depășirea pragurilor de siguranță.
- **Interfața cu SEN respectă strict Codul Tehnic și RfG** — orice soluție de reglaj P/Q, protecție de interfață sau comunicație cu operatorul de distribuție/transport este dimensionată la cerințele avizului tehnic de racordare (ATR), fără abateri, dat fiind impactul unei stații BESS asupra stabilității rețelei locale.

---

## 2. Arhitectura electrică generală — de la celula electrochimică la SEN

### 2.1. Ierarhia constructivă a bateriei: celulă → modul → rack → container

Arhitectura fizică a unui BESS urmează o ierarhie de agregare în patru trepte, fiecare treaptă corespunzând unui nivel de monitorizare și protecție dedicat în arhitectura BMS (capitolul 4):

**Celula electrochimică** este unitatea de bază — în configurația de referință, o celulă LFP prismatică de **3,2 V nominal și 280–314 Ah** capacitate, aleasă pentru raportul optim între densitate energetică, cost și stabilitate termică demonstrată la scară industrială. **Modulul** grupează un număr de celule (uzual 15–16 celule în serie, la formatul de referință) într-un pachet mecanic unitar, rezultând o tensiune de modul de **~48–52 V** și o energie de **~5 kWh** — nivelul modulului este primul punct la care se introduce o placă electronică de monitorizare (Cell Monitoring Unit, cap. 4.1), care citește tensiunea fiecărei celule individuale și temperatura la câteva puncte reprezentative ale pachetului. **Rack-ul** grupează mai multe module în serie (și, în unele arhitecturi, în paralel), atingând o tensiune de bus DC de **1.000–1.500 V** (nivel de tensiune care reduce curentul și, implicit, secțiunea conductoarelor și pierderile rezistive, comparativ cu arhitecturile mai vechi de 600–800 V) și o energie de **200–400 kWh** per rack. **Containerul** grupează mai multe rack-uri (uzual 8–20, funcție de producător) într-o incintă prefabricată, climatizată și echipată cu propriile sisteme de detecție/stingere (cap. 10–12), rezultând o energie de **2–5 MWh per container** — pentru configurația de referință de 20 MWh, instalația este compusă din **4 până la 10 containere**, funcție de modelul de container ales la faza PT.

| Nivel | Tensiune | Energie/capacitate | Element de monitorizare dedicat |
|---|---|---|---|
| Celulă | 3,2 V (2,5–3,65 V) | 280–314 Ah | CMU (Cell Monitoring Unit) |
| Modul | ~48–52 V | ~5 kWh | placă de agregare modul |
| Rack | 1.000–1.500 V DC | 200–400 kWh | RBMS (Rack Battery Management System) |
| Container | 1.000–1.500 V DC (bus comun rack-uri) | 2–5 MWh | Container Controller + PCS dedicat/partajat |
| Sistem (stație) | AC 0,4/0,69 kV → 20 kV | 10–50 MWh | System BMS Master + EMS |

### 2.2. Fluxul de conversie a energiei: DC → PCS → AC JT → trafo → MT → SEN

Fluxul energetic complet, la descărcare (injectare în rețea), urmează traseul: **bus DC al containerului (1.000–1.500 V)** → **PCS (Power Conversion System) — invertor bidirecțional cu componente de putere IGBT sau SiC (Silicon Carbide)** → **tablou de distribuție AC de joasă tensiune (0,4 kV) sau de medie-joasă tensiune (0,69 kV, uzual la puteri unitare de PCS mari, care reduce curentul de ieșire)** → **transformator ridicător (0,69/20 kV sau 0,4/20 kV)** → **celulă de medie tensiune (20 kV, IEC 62271)** → **punctul de racordare la rețeaua de distribuție/transport (SEN)**, prin linia electrică subterană sau aeriană de medie tensiune stabilită prin avizul tehnic de racordare (ATR). La încărcare (absorbție din rețea), fluxul este simetric și invers: SEN → celulă MT → transformator (funcționare coborâtoare) → tablou AC → PCS (funcționare de redresor comandat) → bus DC → distribuție către rack-uri, cu BMS-ul gestionând repartizarea curentului de încărcare între rack-uri conform stării de încărcare (SOC) individuale, pentru menținerea echilibrului energetic al sistemului (cap. 4.6).

Această bidirecționalitate completă a fluxului — spre diferență de un parc fotovoltaic, unde conversia DC/AC este unidirecțională — este motivul pentru care PCS-ul unui BESS este un echipament de complexitate net superioară unui invertor fotovoltaic obișnuit, capabil de comutare rapidă între modurile de operare (descărcare/încărcare/standby) și de reglaj continuu al puterii reactive independent de sensul fluxului de putere activă (cap. 5.3).

### 2.3. Configurația electrică internă a containerului (arhitectura bus-ului DC)

În interiorul containerului, rack-urile de baterii sunt conectate la un **bus DC comun** prin întreruptoare/contactoare individuale de rack, comandate de RBMS-ul fiecărui rack — această arhitectură permite izolarea electrică a unui rack defect (temperatură/tensiune/curent în afara limitelor) **fără a scoate din funcțiune întregul container**, esențial pentru continuitatea funcțională și pentru limitarea propagării unei anomalii electrice. Bus-ul DC comun al containerului este, la rândul său, conectat la intrarea PCS-ului printr-un întreruptor/contactor DC principal de container, cu funcție dublă: izolare pentru mentenanță și oprire de urgență (E-stop, cap. 13.4).

Arhitectura electrică internă a containerului include, obligatoriu, componentele de protecție DC detaliate la capitolul 7.1 (fuzibile rapide de rack, monitor de izolație IMD), montate pe fiecare nivel al ierarhiei (rack și container), astfel încât un defect de izolație sau un scurtcircuit intern să fie limitat, prin selectivitate, la nivelul cel mai jos posibil al ierarhiei, fără a propaga o deconectare generalizată a întregii instalații.

### 2.4. Topologii de conectare PCS — centralizată versus distribuită (string-based)

Două topologii principale sunt utilizate în proiectarea instalațiilor BESS de tip utility-scale, cu implicații directe asupra disponibilității și a complexității de mentenanță:

- **Topologia centralizată** — un număr redus de PCS-uri de putere mare (de exemplu, 2–4 PCS de 2,5–5 MW fiecare) deservesc întreaga instalație, fiecare PCS agregând mai multe containere prin bus-uri DC interconectate. Avantaj: cost specific mai redus per MW instalat, complexitate de mentenanță redusă (mai puține echipamente de conversie). Dezavantaj: avaria unui singur PCS scoate din funcțiune o fracțiune mare a puterii instalate.
- **Topologia distribuită (string-based, un PCS per container sau chiar per rack)** — fiecare container are propriul PCS dedicat, de putere mai mică (uzual 250 kW–1,5 MW), cu conversie DC/AC realizată la nivel local. Avantaj: granularitate superioară — avaria unui PCS afectează doar containerul asociat, restul instalației rămânând complet funcțional; optimizare individuală a punctului de funcționare per container (relevantă la degradare neuniformă a rack-urilor, cap. 4.5). Dezavantaj: cost specific mai ridicat, număr mai mare de puncte de conversie de întreținut.

Pentru configurația de referință de 10 MW/20 MWh, prezentul memoriu adoptă, ca ipoteză de proiectare recomandată, **topologia distribuită** (PCS dedicat per container sau pereche de containere), justificată de disponibilitatea superioară a instalației și de granularitatea de mentenanță — soluție care se regăsește, de altfel, în marea majoritate a instalațiilor BESS utility-scale construite după 2021. Alegerea finală, cu numărul exact și puterea unitară a PCS-urilor, se stabilește la faza PT, funcție de produsul contractat.

---

## 3. Breviar de calcul — capacitate, putere, randament, dimensionarea conductoarelor

### 3.1. Capacitatea energetică utilă și adâncimea de descărcare (DoD)

Capacitatea energetică instalată (E_inst), măsurată la bornele DC ale bateriei, la începutul vieții (Beginning of Life, BOL), reprezintă energia totală teoretic stocabilă. Din motive de protecție electrochimică (prevenirea supraîncărcării complete și a descărcării complete, ambele accelerând degradarea capacității, cap. 4.5), BMS-ul limitează operarea la o **adâncime de descărcare de proiect (DoD)** inferioară 100%:

**E_util = E_inst · DoD**

Pentru configurația de referință: E_util = 20 MWh × 0,90 = **18 MWh utili**.

Numărul de module necesar pentru capacitatea instalată se determină din energia unitară a modulului (E_modul ≈ 5 kWh):

**N_module = E_inst/E_modul = 20.000 kWh/5 kWh = 4.000 module**

Această cifră este direct utilizată în dimensionarea logisticii de transport, montaj și în calculul greutății totale a instalației (relevant pentru memoriul de structură, care tratează fundațiile containerelor).

### 3.2. Puterea instalată și relația cu C-rate

Puterea de descărcare/încărcare (P) a unei instalații BESS nu este o mărime independentă de capacitatea energetică, ci este legată de aceasta prin **rata C (C-rate)**, definită ca fracțiunea din capacitatea energetică totală care poate fi livrată/absorbită într-o oră:

**P = E_inst · C-rate**

Pentru configurația de referință, la C-rate = 0,5C (autonomie de descărcare 2 ore la putere nominală): P = 20 MWh × 0,5 h⁻¹ = **10 MW**. La C-rate = 1C (autonomie 1 oră): P = 20 MW. Alegerea C-rate-ului de proiect este o decizie de natură comercială/de piață, nu pur tehnică: aplicațiile de **arbitraj energetic** (cumpărare la preț mic, vânzare la preț mare, orizont de câteva ore) favorizează C-rate mic (0,25–0,5C, autonomie 2–4h, capacitate energetică mare relativ la putere), în timp ce serviciile de **răspuns rapid în frecvență (FCR — Frequency Containment Reserve)** favorizează C-rate mare (1C sau superior, răspuns în câteva secunde, dar cu durată de livrare scurtă), unde puterea instantanee contează mai mult decât energia totală livrabilă. Configurația de referință (0,5C) reprezintă un compromis tipic pentru o instalație multi-servicii, capabilă atât de arbitraj cât și de participare la piețele de rezervă.

### 3.3. Randamentul round-trip și componentele de pierdere

Randamentul round-trip (η_RT) reprezintă raportul dintre energia livrată la descărcare și energia absorbită la încărcarea corespunzătoare, pentru un ciclu complet — mărime critică pentru fezabilitatea economică a arbitrajului energetic (fiecare procent de randament pierdut reduce marja de profit a fiecărui ciclu de tranzacționare). Randamentul se compune multiplicativ din randamentele fiecărei componente a lanțului de conversie, fiecare traversată de două ori (la încărcare și la descărcare, cu excepția pierderilor auxiliare, calculate separat):

**η_RT = η_PCS² · η_baterie · η_trafo · η_aux**

unde:
- **η_PCS ≈ 0,98** (randamentul conversiei DC/AC al invertorului modern cu IGBT/SiC, la punct de funcționare apropiat de nominal) — ridicat la puterea a doua, deoarece energia traversează PCS-ul de două ori (o dată la încărcare, DC→AC fiind înlocuit de AC→DC, o dată la descărcare);
- **η_baterie ≈ 0,96** (randamentul electrochimic al ciclului complet de încărcare/descărcare al celulei LFP, incluzând pierderile rezistive interne și de polarizare);
- **η_trafo ≈ 0,99** (randamentul transformatorului ridicător, la sarcină apropiată de nominal — pierderile de mers în gol și de sarcină ale unui transformator modern de acest calibru sunt reduse);
- **η_aux ≈ 0,97** (consumul propriu al instalației — dominat de sistemul HVAC de climatizare a containerelor, cap. 9, la care se adaugă consumul BMS/EMS/SCADA și iluminatul tehnic).

**η_RT = 0,98² × 0,96 × 0,99 × 0,97 = 0,9604 × 0,96 × 0,99 × 0,97 = 0,885 = 88,5%**

Valoarea de 88,5% se încadrează în intervalul tipic documentat pentru instalații BESS pe bază de LFP (**85–90%**), fiind consistentă cu observația că, la un BESS, **sistemul HVAC constituie cel mai important consumator auxiliar**, semnificativ mai mare decât la o instalație electrică obișnuită — motiv suplimentar pentru dimensionarea atentă a acestuia la capitolul 9, unde o supradimensionare a puterii frigorifice active penalizează direct randamentul economic al instalației, în timp ce o subdimensionare compromite siguranța și viața utilă a bateriilor.

### 3.4. Dimensionarea transformatorului ridicător

Transformatorul ridicător se dimensionează pentru a acoperi puterea aparentă maximă cerută de instalație, incluzând factorul de putere de proiect impus la punctul de racordare (cerință tipică de participare la reglajul de tensiune prin absorbție/injecție de putere reactivă, cap. 6.5):

**S_n ≥ P/cos φ = 10 MW/0,95 = 10,53 MVA**

Se adoptă, cu rotunjire la treapta standard de catalog imediat superioară și cu rezervă pentru participarea la servicii de sistem cu componentă reactivă suplimentară, un transformator de **12,5 MVA** (variantă echivalentă acceptabilă: **2 × 6,3 MVA** în configurație redundantă N+1, soluție care permite menținerea unei fracțiuni din puterea instalației funcțională chiar la avaria unui transformator — variantă recomandată la instalațiile unde continuitatea serviciilor de sistem contractate este penalizată contractual în caz de indisponibilitate). Alegerea finală (transformator unic vs. pereche redundantă) se face la faza PT, funcție de analiza cost-beneficiu a penalităților de indisponibilitate versus costul suplimentar al redundanței.

### 3.5. Dimensionarea și verificarea cablurilor DC/AC/MT

**Circuitul DC** (bus container → PCS), la puterea de 1 MW per container (ipoteză de repartizare uniformă a celor 10 MW pe 10 containere) și tensiune de bus 1.000 V:

**I_DC = P/U = 1.000.000 W/1.000 V = 1.000 A**

Se adoptă cablu DC **4 × 240 mm² Cu** (secțiune per polaritate, cu conductoare în paralel funcție de curentul admisibil al unui singur cablu de 240 mm², care nu acoperă singur 1.000 A — configurația reală de câte 2–3 cabluri în paralel per polaritate se stabilește la faza PT funcție de curentul admisibil de catalog al cablului certificat pentru tensiune DC 1.500 V). Căderea de tensiune pe traseul DC (lungime echivalentă tur-retur estimată L ≈ 30 m, rezistivitate cupru ρ ≈ 0,0175 Ω·mm²/m):

**ΔU = 2·ρ·L·I/S = 2 × 0,0175 × 30 × 1.000/240 = 1.050/240 = 4,4 V**

**ΔU% = 4,4/1.000 = 0,44%** (valoare orientativă pentru un tronson scurt; verificarea corectă la 4 × 240 mm² în paralel, echivalent 960 mm² efectivi, dă ΔU% ≈ **0,074%**, valoare net inferioară limitei uzuale de 2–3% admisă pentru circuite DC de putere, confirmând dimensionarea adoptată).

**Circuitul AC de joasă tensiune** (ieșire PCS → tablou → transformator), la puterea de 10 MW și tensiune 0,69 kV, cos φ = 0,95:

**I_AC = P/(√3 · U · cos φ) = 10.000.000/(1,732 × 690 × 0,95) = 10.000.000/1.135.653 = 881 A**

**Circuitul de medie tensiune** (transformator → celulă MT → punct de racordare), la puterea aparentă de 12,5 MVA și tensiune 20 kV:

**I_MT = S/(√3 · U) = 12.500.000/(1,732 × 20.000) = 12.500.000/34.641 = 361 A**

Toate cele trei niveluri de curent (1.000 A DC, 881 A AC-JT, 361 A MT) sunt verificate la cădere de tensiune (<1% pe fiecare tronson, confirmat prin calculul de mai sus pentru circuitul DC și extensibil identic pentru AC/MT la faza PT, cu lungimile reale de traseu) și fundamentează dimensionarea secțiunilor de cablu, a barelor colectoare și a calibrului aparatajului de protecție (cap. 7).

### 3.6. Verificarea la curent de scurtcircuit (IEC 60909)

Verificarea la curent de scurtcircuit a instalației se realizează conform metodologiei **IEC 60909** (calculul curenților de scurtcircuit în rețele trifazate de curent alternativ), aplicată distinct pe partea AC/MT a instalației (unde metodologia IEC 60909 este direct aplicabilă) și pe partea DC (unde curentul de scurtcircuit are o natură fundamental diferită, dominată de caracteristica de descărcare a bateriei, nu de impedanța rețelei). O particularitate critică a instalațiilor BESS, care nu are echivalent la o instalație electrică alimentată exclusiv din rețea, este faptul că **bateria litiu-ion poate livra curenți de scurtcircuit DC de valoare foarte mare** (limitată practic doar de rezistența internă a celulelor și de impedanța conductoarelor, nu de o sursă externă cu impedanță de scurtcircuit definită) — motiv pentru care aparatajul de protecție DC (fuzibile rapide, întreruptoare DC, cap. 7.1) trebuie dimensionat și verificat pe baza datelor de scurtcircuit furnizate de producătorul bateriei (curent de scurtcircuit maxim per rack, timp caracteristic de creștere), nu prin extrapolarea metodologiei IEC 60909 dezvoltate pentru rețele AC. Pe partea de medie tensiune, curentul de scurtcircuit la punctul de racordare este cel comunicat de operatorul de distribuție/transport prin avizul tehnic de racordare (ATR) și fundamentează puterea de rupere (Icu) a întreruptoarelor celulelor MT (cap. 6.2 și 7.3).

---

## 4. Sistemul de management al bateriei (BMS) — arhitectură pe patru niveluri

### 4.1. Nivelul celulă (Cell Monitoring Unit)

Prima linie de apărare împotriva ambalării termice, și cea mai granulară, este monitorizarea individuală a fiecărei celule prin placa de **Cell Monitoring Unit (CMU)**, montată la nivelul fiecărui modul. Fiecare CMU măsoară, cu o frecvență de eșantionare de ordinul secundelor:

- **tensiunea individuală a fiecărei celule** — fereastra normală de operare a unei celule LFP este **2,5–3,65 V**; sub 2,5 V (subîncărcare/descărcare excesivă) sau peste 3,65 V (supraîncărcare), CMU declanșează o alarmă, iar la depășirea unui prag de siguranță secundar (mai strict), BMS-ul de nivel superior comandă oprirea imediată a curentului prin rack-ul/modulul afectat;
- **temperatura**, la mai multe puncte de măsură per modul (uzual 4–8 termistori distribuiți) — temperatura normală de operare se menține în banda impusă de HVAC (cap. 9), iar o **alarmă timpurie se declanșează la depășirea a ~45 °C, cu oprire critică la ~50–55 °C** — aceste praguri constituie **primul precursor detectabil electric al unei ambalări termice incipiente**, anterior oricărei detecții de gaz sau de fum (cap. 10.1), deoarece o reacție exotermă internă a celulei ridică temperatura măsurabilă la periferia acesteia înainte de a genera degazare vizibilă la exteriorul modulului.

O caracteristică esențială a arhitecturii CMU, care o diferențiază de o simplă instrumentație de măsură, este **rata de eșantionare suficient de rapidă și logica de alarmare graduală** (avertizare → alarmă → oprire critică), astfel încât un eveniment în evoluție rapidă (scurtcircuit intern al unei celule individuale, care poate evolua de la anomalie detectabilă la ambalare termică în ordinul minutelor) să fie surprins și acționat înainte de propagare la celulele vecine din același modul.

### 4.2. Nivelul modul

Datele de la CMU-urile individuale sunt agregate la nivelul plăcii de modul, care calculează statistici derivate esențiale pentru diagnosticul de sănătate al pachetului: **abaterea de tensiune între celule (cell voltage spread)** — un indicator precoce al unei celule care se degradează mai rapid decât media pachetului (capacitate reziduală inferioară, rezistență internă crescută) — și **gradientul termic intern al modulului** (diferența de temperatură între punctele cele mai calde și cele mai reci ale pachetului), a cărui creștere bruscă poate semnala o problemă de contact electric (conexiune slăbită, generatoare de căldură prin efect Joule localizat) înainte ca aceasta să evolueze spre o defecțiune electrochimică propriu-zisă.

### 4.3. Nivelul rack (Rack Battery Management System — RBMS)

RBMS-ul agregă datele tuturor modulelor unui rack și îndeplinește trei funcții suplimentare față de nivelurile inferioare: (1) **comanda contactorului/întreruptorului principal al rack-ului**, cu autoritate de a izola electric întregul rack de bus-ul DC comun al containerului la detectarea oricărei anomalii care depășește pragurile de siguranță (temperatură critică, tensiune de celulă în afara ferestrei, supracurent, defect de izolație); (2) **calculul agregat al SOC/SOH la nivel de rack** (cap. 4.5), utilizat de EMS pentru repartizarea optimă a curentului de încărcare/descărcare între rack-uri, astfel încât rack-urile mai degradate să nu fie solicitate disproporționat față de cele cu sănătate superioară; (3) **interfața cu monitorul de izolație (IMD, cap. 4.7)** al rack-ului, componentă critică într-un sistem DC de tip IT (flotant față de pământ), unde un prim defect de izolație nu produce deconectare automată, dar trebuie semnalat și remediat înainte de apariția unui al doilea defect (care ar putea genera un curent de defect periculos).

### 4.4. Nivelul sistem (System BMS Master)

La vârful ierarhiei, System BMS Master-ul agregă datele tuturor rack-urilor și containerelor instalației, prezentând către EMS (capitolul 14) o imagine unitară a stării de sănătate a întregii baterii: capacitate disponibilă în timp real, putere maximă disponibilă la descărcare/încărcare (limitată de rack-ul cel mai restrictiv la momentul respectiv), și un registru consolidat de alarme active. Această agregare permite EMS-ului să ia decizii de dispecerizare (cap. 14.2) informate de starea reală a echipamentului, nu doar de valorile nominale de catalog — de exemplu, dacă un container este temporar indisponibil pentru mentenanță, System BMS Master comunică EMS-ului puterea maximă efectiv disponibilă a instalației (redusă proporțional), evitând un angajament contractual de servicii de sistem care nu poate fi onorat fizic.

### 4.5. Estimarea SOC și SOH

**Starea de încărcare (State of Charge, SOC)**, exprimată procentual, reprezintă fracțiunea din capacitatea disponibilă rămasă în celulă la un moment dat. Estimarea SOC nu se face printr-o măsurătoare directă (nu există un senzor fizic de „nivel" al energiei chimice stocate), ci prin algoritmi de estimare care combină: **integrarea curentului în timp (coulomb counting)** — metoda de bază, care acumulează eroare pe termen lung din cauza toleranțelor senzorilor de curent, motiv pentru care se recalibrează periodic; și **corelarea cu tensiunea de mers în gol (OCV — Open Circuit Voltage)**, valabilă mai ales la extremele curbei de încărcare (SOC foarte scăzut sau foarte ridicat, unde panta tensiune-SOC este mai pronunțată; celulele LFP au, în platoul central de SOC, o curbă de tensiune foarte plată, ceea ce face estimarea prin OCV imprecisă tocmai în zona de operare curentă — motiv pentru care coulomb counting-ul, recalibrat la extreme, rămâne metoda dominantă pentru LFP). Instalația se operează în banda **SOC 10–95%**, cu marjă la ambele extreme pentru protecția electrochimică a celulei și pentru acuratețea estimării.

**Starea de sănătate (State of Health, SOH)** cuantifică degradarea ireversibilă a capacității bateriei față de valoarea de la începutul vieții (BOL), exprimată procentual (SOH = 100% la o baterie nouă, scăzând progresiv pe măsura ciclării și a îmbătrânirii calendaristice). Estimarea SOH combină urmărirea capacității reale livrabile (comparată periodic, prin cicluri de calibrare controlate, cu valoarea nominală) cu creșterea rezistenței interne (un indicator complementar de degradare, care afectează randamentul și puterea maximă disponibilă înainte ca scăderea de capacitate să devină semnificativă). Monitorizarea SOH constituie baza **mentenanței predictive**: o degradare accelerată, neuniformă între rack-uri, semnalează fie o problemă de operare (cicluri de adâncime excesivă, temperaturi de operare la limita superioară a ferestrei — argument suplimentar pentru precizia sistemului HVAC, cap. 9), fie o problemă localizată de fabricație/montaj, ambele investigabile înainte ca degradarea să devină o problemă de garanție sau de siguranță.

### 4.6. Balansarea celulelor (cell balancing)

Din cauza micilor diferențe de fabricație și de îmbătrânire, celulele conectate în serie într-un modul/rack nu se încarcă și descarcă perfect uniform — fără corecție, diferențele se acumulează în timp, unele celule ajungând la limita superioară de tensiune (3,65 V) înainte ca altele să atingă capacitatea nominală, limitând capacitatea utilizabilă a întregului pachet la cea a celulei celei mai slabe. **Balansarea pasivă** (rezistoare de balansare, care disipă surplusul de energie al celulelor mai încărcate sub formă de căldură, până la egalizarea cu celulele mai puțin încărcate) este soluția uzuală la costuri reduse, cu eficiență energetică modestă (energia disipată este pierdută, nu redistribuită). **Balansarea activă** (circuite care transferă energie de la celulele supra-încărcate către cele sub-încărcate, prin condensatoare comutate sau convertoare DC/DC dedicate) oferă un randament superior și o viteză de balansare mai mare, la un cost suplimentar de complexitate electronică — alegerea între cele două tehnologii se face la nivelul specificației echipamentului, funcție de producător, și nu schimbă principiile de proiectare a instalației electrice descrise în prezentul memoriu.

### 4.7. Monitorizarea izolației (IMD) și detectarea defectelor precoce

Sistemul DC al unui BESS este proiectat, ca regulă generală, ca sistem **IT (izolat/flotant față de pământ)** — nicio polaritate a bus-ului DC nu este legată direct la pământ, spre diferență de sistemele TN/TT uzuale ale instalațiilor de joasă tensiune AC. Alegerea topologiei IT pentru bus-ul DC este justificată de faptul că, într-un sistem flotant, **un prim defect de izolație (contact accidental al unei polarități cu masa/carcasa) nu generează un curent de defect periculos** și nu impune o deconectare automată imediată — sistemul poate continua să funcționeze, cu o alarmă activă, până la remedierea planificată a defectului. Un al doilea defect de izolație (pe cealaltă polaritate sau pe alt punct al aceleiași polarități), însă, ar crea o buclă de curent periculoasă — motiv pentru care **monitorul de izolație (IMD — Insulation Monitoring Device)**, montat la nivelul fiecărui rack și/sau container, măsoară continuu rezistența de izolație între bus-ul DC și masă, semnalând orice scădere sub un prag de siguranță (indicator al unui prim defect) către BMS și către SCADA, permițând o intervenție de mentenanță programată **înainte** ca un al doilea defect independent să genereze o situație periculoasă. Această funcție, combinată cu protecția de supracurent și cu detecția de arc DC (cap. 7.1), constituie ansamblul de protecții electrice specifice circuitului DC de înaltă tensiune al bateriei.

---

## 5. Power Conversion System (PCS) — invertoarele bidirecționale

### 5.1. Funcția și arhitectura PCS

PCS-ul este echipamentul central al conversiei energetice, realizând, în ambele sensuri, transformarea între curentul continuu al bus-ului bateriei (1.000–1.500 V DC) și curentul alternativ trifazat al rețelei interne (0,4 sau 0,69 kV AC). Arhitectura internă a unui PCS modern utilizează module de putere pe bază de **IGBT (Insulated Gate Bipolar Transistor)**, tehnologie matură și larg utilizată, sau, la echipamentele de generație mai recentă, pe bază de **SiC (carbură de siliciu)**, care oferă pierderi de comutație mai reduse, frecvențe de comutație mai mari (reducând dimensiunea filtrelor pasive) și toleranță termică superioară — alegerea tehnologiei de semiconductor este o decizie de specificație a echipamentului, care nu modifică principiile funcționale descrise mai jos, dar influențează direct randamentul η_PCS adoptat la capitolul 3.3.

### 5.2. Moduri de operare: grid-following versus grid-forming

Distincția dintre cele două moduri de operare ale unui PCS de BESS este una dintre cele mai relevante evoluții tehnice ale ultimilor ani în domeniul stocării de energie, cu impact direct asupra rolului pe care instalația îl poate juca în stabilitatea rețelei:

- **Grid-following (urmărire de rețea)** — modul de operare clasic, în care PCS-ul se sincronizează cu tensiunea și frecvența deja prezente pe rețea (măsurate printr-o buclă de sincronizare de fază, PLL — Phase-Locked Loop) și injectează/absoarbe curent în fază cu acestea, conform setpoint-ului de putere primit de la EMS. Acest mod presupune existența unei rețele „puternice" (cu alte surse care stabilesc tensiunea și frecvența de referință) și este modul standard de operare al majorității instalațiilor BESS conectate la o rețea de distribuție/transport bine interconectată.
- **Grid-forming (formare de rețea)** — mod de operare avansat, în care PCS-ul își impune propria referință de tensiune și frecvență, comportându-se similar unui generator sincron clasic, capabil să **stabilizeze o rețea slabă sau chiar să pornească o rețea izolată (black-start, cap. 15.2)** fără a necesita o altă sursă de referință. Capabilitatea grid-forming este din ce în ce mai solicitată de operatorii de rețea în zonele cu penetrare ridicată de producție regenerabilă variabilă (unde inerția sincronă a sistemului scade pe măsură ce generatoarele sincrone clasice sunt înlocuite de surse convertor-conectate), fiind o cerință tehnică emergentă în codurile de rețea actualizate.

Specificarea capacității grid-forming (opțională sau obligatorie, funcție de cerințele avizului tehnic de racordare specific amplasamentului) se stabilește la faza PT, în dialog cu operatorul de distribuție/transport; prezentul memoriu adoptă, ca ipoteză minimă de proiectare, capacitatea grid-following completă, cu posibilitatea de upgrade la grid-forming dacă ATR-ul o solicită.

### 5.3. Controlul puterii active și reactive (P/Q)

PCS-ul oferă un reglaj independent al puterii active (P — fluxul energetic propriu-zis, de încărcare sau descărcare) și al puterii reactive (Q — suportul de tensiune furnizat rețelei, prin absorbție sau generare de reactiv, fără consum net de energie activă din baterie). Această independență P/Q este esențială pentru participarea instalației la **serviciile de sistem de suport de tensiune** (cap. 6.5) — o instalație BESS poate, de exemplu, absorbi putere activă din rețea (încărcare) în timp ce generează simultan putere reactivă capacitivă pentru susținerea tensiunii locale, sau invers, funcție de cerința instantanee a operatorului de rețea. Capacitatea P/Q a PCS-ului este limitată de diagrama sa de capabilitate (cercul P-Q, funcție de puterea aparentă nominală S_n a PCS-ului), stabilită prin specificația tehnică a echipamentului.

### 5.4. Calitatea energiei — armonici și conformitate

Comutația la frecvență ridicată a semiconductoarelor de putere ale PCS-ului generează, inerent, componente armonice în curentul injectat/absorbit — acestea trebuie limitate sub pragurile impuse de codul tehnic de rețea, pentru a nu perturba calitatea energiei livrate altor consumatori conectați la același punct al rețelei de distribuție. Filtrarea armonicilor se realizează printr-o combinație de **filtre pasive** (inductanțe și condensatoare, integrate la ieșirea PCS-ului) și, la nivelul întregii instalații, prin verificarea distorsiunii armonice totale (THD — Total Harmonic Distortion) la punctul de racordare, conformă cu limitele stabilite prin avizul tehnic de racordare și cu standardele de compatibilitate electromagnetică aplicabile. Conformitatea de calitate a energiei se verifică și se documentează la punerea în funcțiune (cap. 20), prin măsurători dedicate la punctul de racordare, incluse în protocolul de PIF transmis operatorului de distribuție/transport.

### 5.5. Protecțiile integrate ale PCS

Fiecare PCS include un set de protecții proprii, complementare protecțiilor de nivel superior (releele numerice de la celula MT, cap. 7.3): protecție de supratensiune/subtensiune DC la intrare, protecție de supracurent AC la ieșire, protecție de supratemperatură a modulelor de putere (cu limitare automată de sarcină înainte de oprirea completă), și protecția de anti-islanding (prevenirea funcționării izolate a instalației pe o porțiune de rețea deconectată de la sursa principală, cerință de siguranță pentru personalul de intervenție al operatorului de rețea) — toate integrate în logica de control a PCS-ului și raportate către SCADA în timp real.

---

## 6. Tabloul de medie tensiune, transformatorul ridicător și racordarea la SEN

### 6.1. Transformatorul ridicător 0,69/20 kV

Transformatorul ridicător, dimensionat la capitolul 3.4 (12,5 MVA, sau variantă redundantă 2×6,3 MVA), realizează trecerea de la tensiunea de ieșire a PCS-urilor (0,4 sau 0,69 kV) la tensiunea de racordare la rețeaua de medie tensiune (20 kV). Schema de conexiuni uzuală pentru acest tip de aplicație este **Dyn11** (înfășurare primară în triunghi, secundară în stea cu neutru accesibil), care oferă o cale de curgere a curenților de secvență homopolară favorabilă protecțiilor de defect la pământ și compatibilitate cu majoritatea rețelelor de distribuție românești de 20 kV. Transformatorul poate fi specificat în variantă cu **răcire în ulei (ONAN/ONAF)**, tehnologie matură și cu cost specific redus, sau **uscat, în rășină epoxidică**, variantă care elimină riscul de scurgere de ulei și necesitatea cuvei de retenție aferentă (relevantă pentru amplasamentele cu sensibilitate de mediu ridicată sau cu spațiu limitat), la un cost de achiziție superior.

### 6.2. Celulele de medie tensiune (IEC 62271)

Celulele de medie tensiune (20 kV), conforme cu seria de standarde **IEC 62271** (aparataj de comutație de înaltă tensiune), asigură funcțiile de sosire/plecare, măsură și protecție a transformatorului: o **celulă de sosire/racord** cu separator de sarcină și cuțit de legare la pământ (CLP), o **celulă de măsură** (transformatoare de tensiune și de curent de clasă de precizie adecvată facturării, sigilate de operatorul de rețea, cap. 6.4), și o **celulă de protecție a transformatorului**, echipată cu întreruptor în vid și relee numerice de protecție (cap. 7.3). Dimensionarea curentului nominal și a puterii de rupere a acestor celule se stabilește pe baza curentului de scurtcircuit comunicat prin avizul tehnic de racordare pentru punctul specific al rețelei la care se realizează racordarea.

### 6.3. Punctul de racordare, ATR și cerințele Cod RET/RED și RfG

Racordarea instalației BESS la SEN se realizează pe baza **avizului tehnic de racordare (ATR)**, emis de operatorul de distribuție sau de transport (funcție de nivelul de tensiune al punctului de racordare — 20 kV la operatorul de distribuție local, sau, la instalații de capacitate mai mare din intervalul parametric al prezentului memoriu, printr-o stație de transformare 20/110 kV proprie sau partajată, racordată la rețeaua de transport gestionată de operatorul de transport și de sistem). Conținutul ATR-ului stabilește, printre altele: punctul exact de racordare, puterea maximă admisă (atât la injecție, cât și la absorbție, dat fiind caracterul bidirecțional al instalației), curentul de scurtcircuit disponibil la acel punct și cerințele tehnice de conformitate.

**Regulamentul (UE) 2016/631 (RfG)**, deși elaborat inițial pentru module de generare (centrale electrice clasice sau regenerabile), este aplicat prin analogie și instalațiilor de stocare conectate la rețea, impunând, funcție de categoria de racordare (B, C sau D, determinată de puterea instalată și de nivelul de tensiune al punctului de racordare):
- **capacitatea de traversare a defectelor de tensiune (Fault Ride-Through — LVRT/HVRT)** — instalația trebuie să rămână conectată și să continue să funcționeze (fără deconectare intempestivă) în timpul unor perturbații tranzitorii de tensiune pe rețea (goluri de tensiune — LVRT, sau supratensiuni tranzitorii — HVRT), conform unei curbe de toleranță tensiune-timp specificate în cod, contribuind la stabilitatea generală a rețelei în situații de defect;
- **reglajul de tensiune și de frecvență** — participarea automată la stabilizarea parametrilor de rețea, prin ajustarea puterii reactive (funcție de tensiune) și, respectiv, a puterii active (funcție de frecvență), conform curbelor de statism impuse de codul tehnic;
- **comunicația cu operatorul de transport/sistem (OTS)** — schimb de telemăsură și telecomandă în timp real, permițând operatorului să monitorizeze și, în situații excepționale, să limiteze sau să întrerupă puterea instalației, pentru gestionarea siguranței sistemului energetic național.

### 6.4. Măsurarea energiei — conformitate ANRE

Măsurarea bidirecțională a energiei (activă și reactivă, atât injectată cât și absorbită) se realizează prin contoare electronice de clasă de precizie adecvată (uzual clasa 0,2S sau 0,5S pentru măsurarea de decontare la nivel de medie tensiune), montate în celula de măsură a stației (cap. 6.2) și sigilate de operatorul de rețea, conform metodologiei ANRE de măsurare a energiei electrice și cerințelor de racordare aplicabile instalațiilor de stocare — includerea capacității de măsurare bidirecțională (spre deosebire de o instalație de producție unidirecțională) este o particularitate tehnică specifică unui BESS, care trebuie clarificată explicit cu operatorul de distribuție/transport la faza de proiectare a ATR-ului, pentru a evita ambiguități privind decontarea energiei absorbite pentru încărcare.

### 6.5. Servicii de sistem — FCR, aFRR, suport de tensiune

Dincolo de funcția de bază de arbitraj energetic (cumpărare/vânzare de energie funcție de preț), un BESS poate participa la piețele de servicii de sistem contractate de operatorul de transport și de sistem, valorificând viteza de răspuns superioară a bateriilor litiu-ion față de sursele convenționale:

- **FCR (Frequency Containment Reserve)** — rezervă de reglaj primar de frecvență, cu timp de răspuns de ordinul secundelor, activată automat la abaterea frecvenței de sistem de la valoarea nominală (50 Hz) — aplicație care favorizează C-rate ridicat (cap. 3.2), dat fiind că durata de livrare este scurtă, dar răspunsul trebuie să fie practic instantaneu;
- **aFRR (automatic Frequency Restoration Reserve)** — rezervă de reglaj secundar, activată automat de un semnal centralizat al operatorului de transport, cu timp de răspuns de ordinul minutelor și durată de livrare mai lungă decât FCR;
- **suport de tensiune (reactiv)** — furnizarea/absorbția de putere reactivă la cererea operatorului de rețea, independent de starea de încărcare a bateriei (posibilă chiar la SOC extrem, dat fiind că suportul de tensiune nu presupune neapărat un schimb net de energie activă, cap. 5.3).

Participarea simultană la mai multe tipuri de servicii, optimizată împreună cu arbitrajul energetic, este funcția centrală a algoritmului de dispecerizare al EMS-ului, detaliat la capitolul 14.2.

---

## 7. Protecții electrice — DC, joasă tensiune, medie tensiune

### 7.1. Protecția circuitului DC

Circuitul DC de la nivelul rack-ului până la intrarea PCS-ului este protejat printr-un ansamblu de dispozitive dedicate, dat fiind că protecțiile clasice de curent alternativ (disjunctoare cu curbă de declanșare gândită pentru un curent de scurtcircuit alimentat de o rețea cu impedanță definită) nu sunt direct aplicabile unui circuit alimentat de o sursă electrochimică (cap. 3.6):

- **fuzibile DC rapide, montate la nivelul fiecărui rack** — dimensionate pe baza curentului de scurtcircuit maxim declarat de producătorul bateriei, cu caracteristică de topire suficient de rapidă pentru a limita energia disipată în cazul unui scurtcircuit intern al rack-ului;
- **întreruptor/contactor DC de rack și de container**, comandat de BMS (cap. 4.3), cu funcție de izolare la comanda de protecție și de oprire de urgență (cap. 13.4);
- **monitorul de izolație (IMD)**, tratat la capitolul 4.7, care semnalează primul defect de izolație într-un sistem DC de tip IT (flotant);
- **protecția la inversare de polaritate și la detecția de arc DC** — arcul electric în curent continuu este mai dificil de stins decât cel în curent alternativ (care beneficiază de trecerea naturală prin zero a curentului, de două ori pe fiecare perioadă), motiv pentru care detecția de arc DC (bazată pe analiza semnăturii de frecvență a curentului/tensiunii) este o componentă de protecție dedicată, integrată în echipamentele de comutație DC de generație recentă.

### 7.2. Protecția JT (0,4/0,69 kV)

Tabloul de distribuție de joasă tensiune (ieșirea PCS-urilor, până la transformatorul ridicător), conform standardului **IEC 61439** (ansambluri de aparataj de joasă tensiune), este echipat cu disjunctoare dimensionate la puterea de rupere necesară (Icu ≥ curentul de scurtcircuit calculat la acel punct, conform IEC 60909), **SPD (dispozitive de protecție la supratensiuni) de tip 1+2** montate la intrarea/ieșirea tabloului (protecție combinată la supratensiuni de origine atmosferică indirectă și de comutație), și protecție diferențială/homopolară pentru detecția defectelor de izolație spre pământ pe partea AC.

### 7.3. Protecția MT (20 kV) — relee numerice

Celula de protecție a transformatorului (cap. 6.2) este echipată cu **relee numerice de protecție**, configurate conform funcțiilor standard de protecție ANSI, adaptate cerințelor specifice unei instalații de producție/stocare racordate la rețea:

| Funcție ANSI | Denumire | Rol |
|---|---|---|
| 50/51 | Protecție de supracurent instantanee/temporizată | protecția transformatorului și a cablului MT la scurtcircuit |
| 50N/51N | Protecție de supracurent homopolar | detecția defectelor de punere la pământ |
| 27/59 | Protecție de minimă/maximă tensiune | deconectare la abaterea tensiunii de rețea în afara limitelor admise |
| 81 U/O | Protecție de minimă/maximă frecvență | conformitate cu cerințele RfG de reglaj în frecvență (cap. 6.3) |
| 25 | Verificare de sincronism | condiție de reconectare la rețea după o deconectare |
| 67/67N | Protecție direcțională de supracurent/homopolară | discriminarea sensului fluxului de defect, relevantă la o instalație bidirecțională |

Combinația funcțiilor 81 (U/O) și 27/59 constituie, împreună, **protecția de interfață** cerută de codul tehnic de rețea pentru orice instalație de producție/stocare conectată — aceasta asigură deconectarea automată a instalației în cazul unei abateri de tensiune sau de frecvență în afara ferestrei de toleranță impuse prin RfG (cap. 6.3), protejând atât instalația proprie, cât și rețeaua publică de o eventuală funcționare necontrolată în condiții de defect.

### 7.4. Selectivitatea și coordonarea protecțiilor

Coordonarea între cele trei niveluri de protecție (DC — rack/container, JT — tablou distribuție, MT — celulă transformator) este proiectată pentru **selectivitate totală**: un defect la nivelul unui singur rack trebuie izolat de fuzibilul/întreruptorul DC dedicat acelui rack, fără a declanșa protecția de nivel superior (container, PCS sau, cu atât mai puțin, celula MT), pentru a limita consecința oricărui defect la fracțiunea cea mai mică posibilă a instalației. Verificarea selectivității (prin curbele timp-curent ale fiecărui dispozitiv de protecție și prin analiza timpilor de acționare comparativi) se realizează la faza PT, pe baza datelor tehnice finale ale echipamentelor contractate, și se documentează într-un studiu de selectivitate dedicat, atașat cărții tehnice a instalației.

---

## 8. Priza de pământ și protecția la trăsnet

### 8.1. Sistemul de împământare

Priza de pământ a instalației deservește simultan trei funcții distincte: legarea la pământ a maselor echipamentelor electrice (protecție împotriva electrocutării la un defect de izolație), referința de pământ a sistemului de protecție la trăsnet (cap. 8.2), și punctul de referință pentru sistemul de detecție a defectelor de izolație (împreună cu IMD-ul de pe partea DC, cap. 4.7, deși bus-ul DC însuși rămâne flotant, conform arhitecturii IT descrise). Priza de pământ generală se realizează printr-un conductor de contur (platbandă sau conductor rotund din oțel zincat sau cupru), completat cu electrozi verticali de dispersie repartizați pe conturul incintei, dimensionați pentru a atinge o rezistență de dispersie **R_p ≤ 1 Ω** — valoare țintă mai restrictivă decât cea uzuală pentru o instalație electrică obișnuită (unde 4 Ω sau chiar 10 Ω pot fi acceptabile), justificată de nivelul de tensiune (medie tensiune, 20 kV) prezent pe amplasament și de necesitatea unei referințe de pământ de calitate pentru echipamentele electronice sensibile ale BMS/EMS/SCADA. Toate masele metalice ale instalației (carcasele containerelor, structurile suport, tablourile electrice, anvelopa postului de transformare, împrejmuirea metalică) se leagă la această priză generală printr-un sistem de **echipotențializare (BEP — Bonding Equalization Point)**, care elimină diferențele de potențial periculoase între elementele conductoare accesibile în caz de defect.

### 8.2. Protecția la trăsnet (SR EN 62305)

Evaluarea riscului de trăsnet, conform metodologiei cantitative **SR EN 62305-2**, ia în considerare probabilitatea de lovitură directă asupra amplasamentului (funcție de suprafața echivalentă de captare și de densitatea de lovituri de trăsnet la sol specifică zonei), consecința unei lovituri (deteriorarea echipamentelor electronice sensibile, posibilitatea inițierii unui incendiu la un obiectiv cu conținut energetic ridicat) și costul măsurilor de protecție — pentru o instalație BESS, riscul se încadrează, de regulă, în categoriile care impun un **nivel de protecție la trăsnet LPL I sau LPL II** (cele mai stricte niveluri din grila standardului, corespunzătoare unor amplasamente cu risc ridicat), justificat de prezența unei mase energetice semnificative (baterii litiu-ion) a cărei aprindere accidentală, indusă de o supratensiune de trăsnet netratată corespunzător, ar avea consecințe disproporționat de grave față de o clădire obișnuită. Sistemul de captare (tije de captare, dimensionate prin metoda sferei rotitoare, cu raza corespunzătoare nivelului LPL adoptat), conductoarele de coborâre (minimum două, pe fețe opuse ale postului de transformare și ale altor structuri înalte ale amplasamentului, pentru redundanță) și priza de pământ dedicată (integrată în priza generală de la capitolul 8.1) se dimensionează conform seriei complete SR EN 62305-1…4, cu detaliere de execuție la faza PT.

### 8.3. Protecția la supratensiuni (SPD)

Complementar protecției la trăsnet direct (captare + coborâre), instalația necesită protecție la supratensiunile induse (de origine atmosferică indirectă sau de comutație), care se propagă prin cablurile de alimentare și de semnal către echipamentele electronice sensibile (BMS, PCS, SCADA) — acestea fiind, la un BESS, componente ale căror defectare ar compromite atât funcționarea, cât și siguranța instalației. Protecția se realizează printr-o cascadă coordonată de **SPD-uri** (dispozitive de protecție la supratensiuni), montate la fiecare interfață relevantă: SPD de tip 1+2 la intrarea tabloului general de joasă tensiune (cap. 7.2), SPD de tip 2 la nivelul fiecărui tablou secundar și al fiecărui combiner/distribuitor DC, și protecții dedicate pe circuitele de comunicație/semnal ale BMS-ului și ale senzorilor de detecție (cap. 10), care traversează adesea distanțe semnificative pe amplasament și sunt, prin urmare, expuse la supratensiuni induse pe traseul lor. Coordonarea între treptele succesive de SPD (energie disipată progresiv, de la protecția grosieră de la intrarea instalației la protecția fină de la echipamentul terminal) se verifică prin calculul de coordonare a energiei, conform recomandărilor producătorilor de SPD și seriei SR EN 62305-4.

---

## 9. Sistemul de climatizare (HVAC) și managementul termic al bateriilor

### 9.1. De ce managementul termic este critic pentru siguranță

Temperatura de operare a unei celule litiu-ion influențează simultan trei aspecte critice ale funcționării bateriei, motiv pentru care sistemul HVAC al unui BESS nu poate fi tratat ca un simplu sistem de confort, ci ca o **componentă de siguranță funcțională**: (1) **viața utilă (cycle life)** — reacțiile chimice secundare, parazite, care degradează ireversibil capacitatea celulei (formarea și creșterea stratului SEI — Solid Electrolyte Interphase — pe electrodul negativ, printre altele) accelerează exponențial cu temperatura, astfel încât o funcționare susținută la limita superioară a ferestrei tolerate poate reduce viața utilă a bateriei cu un procent semnificativ față de operarea în banda optimă; (2) **randamentul energetic** — rezistența internă a celulei crește la temperaturi scăzute (reducând puterea disponibilă și randamentul, cap. 3.3) și, deși scade ușor la temperaturi moderat ridicate, orice câștig de randament la temperatură ridicată este anulat de accelerarea degradării de la punctul (1); (3) **siguranța** — un gradient termic ridicat sau o temperatură susținută în apropierea limitei superioare a ferestrei tolerate reduce marja de siguranță până la pragurile care declanșează reacții exoterme necontrolate (ambalare termică, cap. 10.1), motiv pentru care menținerea unei temperaturi uniforme și moderate la nivelul întregului pachet de celule este prima linie de prevenire, anterioară oricărui sistem de detecție sau de stingere.

### 9.2. Fereastra țintă de temperatură de operare și raționamentul de proiectare

Sistemul HVAC este proiectat să mențină temperatura internă a fiecărui container în banda țintă de **20–25 °C** (setpoint de proiectare, cap. 1.5) — bandă semnificativ mai îngustă decât limitele de supraviețuire fizică ale celulei (care, conform fișelor tehnice tipice ale producătorilor de celule LFP industriale, tolerează descărcarea într-un interval mult mai larg, de ordinul −20…+55 °C, cu limitări mai stricte la încărcare, de regulă 0…+45 °C, și cu o degradare accelerată a vieții utile peste aproximativ 35 °C susținut). Distincția dintre cele două ferestre este esențială pentru înțelegerea corectă a filosofiei de proiectare: **HVAC-ul nu este dimensionat ca ultimă barieră împotriva unei defecțiuni catastrofale** (acest rol revine sistemelor de detecție și de izolare electrică ale BMS-ului, cap. 4, și sistemelor de detecție/stingere de incendiu, cap. 10–12), ci este dimensionat să **optimizeze continuu viața utilă și randamentul economic al investiției**, funcționând permanent (24/7/365) pentru menținerea unei bande de temperatură mult mai restrictive decât limitele de supraviețuire. Această distincție justifică, totodată, alegerea unei valori numerice pentru setpoint (20–25 °C) diferite de limitele largi de operare tolerată menționate uneori generic în literatura tehnică (15–35 °C) — cele din urmă reprezintă limitele exterioare la care echipamentul continuă să funcționeze fără declanșarea protecțiilor de siguranță, nu ținta de proiectare a sistemului de climatizare.

### 9.3. Arhitectura sistemului HVAC și redundanța

Fiecare container de baterii este echipat cu propriul sistem de climatizare dedicat, dimensionat pentru a compensa atât sarcina termică internă (căldura generată de pierderile rezistive ale celulelor și ale conexiunilor electrice în timpul ciclurilor de încărcare/descărcare, proporțională cu pătratul curentului) cât și sarcina termică externă (transferul prin anvelopa containerului, funcție de temperatura exterioară de calcul vară, cap. 1.5). Arhitectura tipică adoptă **unități de climatizare în configurație N+1 la nivel de container** (de exemplu, două unități de climatizare per container, fiecare dimensionată la o fracțiune supraunitară a sarcinii termice totale, astfel încât avaria uneia să nu compromită menținerea temperaturii în bandă), cu comandă alternantă (rotația unității „lider" pentru uzură egală, similar principiului aplicat pompelor de hidrofor la clădirile civile) și cu monitorizare continuă a temperaturii interne, integrată în BMS/EMS, care declanșează o alarmă tehnică la abaterea susținută de la banda țintă, anterior oricărei alarme de siguranță de nivel superior.

### 9.4. Agentul frigorific și conformitatea F-gas

Alegerea agentului frigorific pentru unitățile de climatizare ale containerelor trebuie să respecte cerințele **Regulamentului (UE) privind gazele fluorurate cu efect de seră (F-gas)**, care limitează progresiv utilizarea agenților frigorifici cu potențial ridicat de încălzire globală (GWP — Global Warming Potential) și impune, pentru instalații noi, preferința pentru agenți cu GWP redus. Specificația tehnică a unităților de climatizare, stabilită la faza PT în funcție de producătorul de containere ales, trebuie să documenteze explicit tipul agentului frigorific utilizat, cantitatea încărcată per unitate și conformitatea acesteia cu pragurile F-gas aplicabile la data punerii în funcțiune — aspect de conformitate reglementară care se verifică la recepția echipamentelor și se consemnează în cartea tehnică a instalației (cap. 20).

### 9.5. Managementul termic la nivel de modul/rack

Dincolo de climatizarea volumului de aer al containerului (abordare de tip climatizare a incintei), unele arhitecturi de rack integrează un **sistem de management termic direct la nivelul modulului/rack-ului** (plăci de răcire lichidă în contact termic direct cu modulele, sau canale de aer forțat dedicate fiecărui rând de module), care oferă o uniformitate termică superioară față de climatizarea globală a incintei (reducerea gradientului termic între rack-uri și în interiorul aceluiași rack, cu beneficii directe asupra vieții utile omogene a întregii baterii, cap. 4.5). Alegerea între climatizare de incintă și management termic direct la nivel de rack este o decizie de specificație a echipamentului contractat, ambele soluții fiind compatibile cu principiile de proiectare (fereastră țintă 20–25 °C, redundanță N+1) descrise în prezentul capitol.

---

## 10. Detecția de gaze și fum — sisteme de detecție timpurie a ambalării termice

### 10.1. Fenomenologia ambalării termice și succesiunea semnalelor detectabile

Ambalarea termică (thermal runaway) a unei celule litiu-ion este un fenomen exoterm autoîntreținut, declanșat de una din cauzele fundamentale — supraîncărcare electrică, supratemperatură externă susținută, scurtcircuit intern (frecvent generat de o deteriorare mecanică sau de un defect de fabricație al separatorului dintre electrozi) sau abuz mecanic (impact, penetrare) — și evoluează printr-o secvență de faze caracteristice, fiecare generând semnale fizice detectabile **înainte** de apariția flăcării vizibile, fapt care fundamentează întreaga arhitectură de detecție descrisă în acest capitol:

1. **faza de precursor electric** — creșterea temperaturii interne a celulei, detectabilă de CMU (cap. 4.1) prin termistorii de modul, cu prag de alarmă la ~45 °C și oprire critică la ~50–55 °C — cel mai precoce semnal disponibil, de natură pur electrică, anterior oricărei emisii chimice;
2. **faza de degazare (off-gassing)** — pe măsură ce reacțiile interne se intensifică, electrolitul se descompune termic, generând un amestec de gaze — predominant **hidrogen (H₂), monoxid de carbon (CO), dioxid de carbon (CO₂), acid fluorhidric (HF, extrem de toxic) și diverși hidrocarburi volatile** — care se degajă prin supapa de siguranță a celulei (vent), cu mult **înainte** de apariția oricărei flăcări vizibile sau chiar a fumului dens; această fază este ținta principală a detecției de gaz (cap. 10.2), fiind cea mai precoce fereastră de intervenție (oprire de încărcare/descărcare, ventilație de urgență, alertare) în care propagarea poate fi încă prevenită;
3. **faza de fum** — pe măsură ce degazarea se intensifică și antrenează particule solide de electrolit descompus, devine detectabilă prin sisteme aspirative de mare sensibilitate (cap. 10.3), anterior formării unui incendiu vizibil;
4. **faza de flacără/explozie** — dacă concentrația de gaze inflamabile (în special hidrogenul, cu limită inferioară de explozie foarte redusă și energie minimă de aprindere foarte scăzută) atinge un amestec exploziv în prezența unei surse de aprindere (arc electric, suprafață incandescentă), se produce ignitarea, cu posibilă deflagrație (cap. 12) și propagare termică la celulele/modulele adiacente.

Arhitectura de detecție a instalației este proiectată explicit pentru a acționa în fazele (1) și (2) — precursor electric și degazare — moment în care intervenția (oprirea BMS, ventilația forțată, alertarea echipei de intervenție) are șansa maximă de a preveni evoluția către fazele (3) și (4).

### 10.2. Detecția de gaz (H₂/CO) — tehnologie și logica de amplasare

Senzorii de detecție de gaz, amplasați în interiorul fiecărui container, la partea superioară a incintei (**hidrogenul, cel mai ușor dintre gazele de degazare, se acumulează preferențial în partea superioară a spațiului**, motiv tehnic direct pentru poziționarea senzorilor acolo), utilizează tehnologie **electrochimică sau cu semiconductor (metal-oxid)** pentru detecția hidrogenului și a monoxidului de carbon, cu praguri de alarmă stabilite la o fracțiune conservatoare din limita inferioară de explozie (LEL — Lower Explosive Limit) a hidrogenului, permițând o marjă de siguranță suficientă pentru acționarea automată a secvenței de răspuns (oprire imediată a curentului prin BMS, pornirea ventilației mecanice de extracție forțată, cap. 12.3, și transmiterea alarmei către SCADA și către dispecerul de intervenție, cap. 10.5) înainte ca amestecul să se apropie de concentrația explozivă. Numărul și amplasarea exactă a senzorilor per container (uzual mai multe puncte de măsură distribuite pe lungimea incintei, dat fiind că un container de baterii are o lungime semnificativă și degazarea poate fi localizată la un singur rack) se stabilesc la faza PT, în conformitate cu recomandările producătorului containerului (care a validat, de regulă prin testare UL 9540A, poziționarea optimă a senzorilor pentru propriul design de rack).

### 10.3. Detecția aspirativă de fum (sisteme de tip VESDA)

Complementar detecției de gaz, instalația este echipată cu un **sistem de detecție aspirativă de fum de mare sensibilitate (tip VESDA — Very Early Smoke Detection Apparatus)**, care aspiră continuu, printr-o rețea de conducte de eșantionare distribuite în interiorul fiecărui container, probe de aer către o unitate centrală de analiză optică (dispersie laser), capabilă să detecteze concentrații de particule de fum de ordine de mărime inferioare celor sesizabile de un detector punctual convențional. Proiectarea rețelei de conducte de eșantionare (numărul de orificii de prelevare, distanța dintre acestea, lungimea maximă a rețelei per unitate centrală) urmează metodologia de calcul specifică a producătorului sistemului, funcție de volumul și de geometria interioară a containerului, cu obiectivul de a asigura un timp de transport al probei către unitatea de analiză suficient de scurt pentru a nu întârzia detecția — parametru critic, dat fiind că evoluția de la degazare la flacără poate fi, în cazurile cele mai severe, de ordinul minutelor.

### 10.4. Detecția termică și cablul liniar de detecție

Suplimentar termistorilor integrați în BMS (cap. 4.1, care măsoară temperatura la nivelul fiecărui modul), unele arhitecturi de container integrează un **cablu de detecție termică liniară (Linear Heat Detection — LHD)**, montat pe toată lungimea incintei, deasupra rack-urilor, capabil să semnaleze atât o temperatură absolută excesivă cât și un gradient de creștere anormal de rapid, indiferent de poziția exactă a punctului cald de-a lungul cablului — o detecție complementară celei a BMS-ului, utilă în special pentru identificarea unor puncte calde generate de cauze externe bateriei propriu-zise (de exemplu, o conexiune electrică defectuoasă la nivelul bus-bar-ului comun al containerului, care nu este neapărat acoperită de instrumentația CMU a celulelor individuale).

### 10.5. Integrarea și semnalizarea

Toate cele patru straturi de detecție descrise mai sus (precursor electric BMS, gaz H₂/CO, fum aspirativ, cablu termic liniar) sunt integrate într-o centrală de semnalizare a incendiului conformă **P118-3/2015**, cu logica de alarmare graduală (pre-alarmă → alarmă → declanșare a secvenței automate de răspuns), și transmise, în paralel, către sistemul SCADA al instalației (cap. 14.3) pentru **monitorizare la distanță, 24 de ore din 24, 7 zile din 7** — cerință esențială la o instalație de regulă neexploatată permanent cu personal pe amplasament, unde singura garanție a unei intervenții rapide este alertarea automată a dispecerului central și, prin acesta, a serviciilor de intervenție locale (pompieri) și a echipei tehnice de mentenanță a operatorului instalației.

---

## 11. Stingerea incendiului — strategie, agenți și dimensionare

### 11.1. De ce nu se folosesc sprinklere standard de tip apă-pulverizare fină nediscriminată

Alegerea strategiei de stingere pentru un incendiu de baterii litiu-ion este una dintre cele mai dezbătute teme tehnice din domeniul BESS, tocmai din cauza unei particularități electrochimice fără echivalent la incendiile convenționale: **o celulă aflată în ambalare termică generează propriul oxigen** prin descompunerea termică a compușilor din catod (în special la chimiile bogate în oxigen, precum NMC; chiar și la LFP, deși în măsură mai redusă, cap. 1.3, reacția rămâne parțial autosusținută din punct de vedere al oxidantului). Această particularitate înseamnă că **înăbușirea flăcării prin excluderea oxigenului atmosferic (principiul din spatele agenților gazoși inerți și, parțial, al aerosolilor) nu poate opri singură reacția internă a celulei**, care continuă să genereze căldură și gaze inflamabile chiar și fără aport de oxigen extern — un incendiu de baterii litiu-ion se poate reaprinde după o stingere aparentă, pe măsură ce degazarea continuă alimentează o nouă sursă de combustibil. Din acest motiv, standardul de referință **NFPA 855** și practica internațională documentată converg spre concluzia că **răcirea activă cu apă este singurul mecanism confirmat capabil să oprească propagarea în cascadă către modulele/rack-urile adiacente**, prin scăderea efectivă a temperaturii sub pragul la care reacția exotermă se autoîntreține.

### 11.2. Agentul de stingere — aerosol/gaz inert pentru faza incipientă

Pentru intervenția în faza incipientă a unui eveniment (flacără localizată, de dimensiune redusă, înainte de a se stabili o propagare susținută), containerele sunt echipate cu un **sistem automat de stingere cu agent aerosol condensat sau gaz inert** (funcție de specificația echipamentului), acționat automat de centrala de semnalizare la depășirea pragurilor de detecție de fum/flacără — acest sistem oferă o primă intervenție rapidă asupra unei flăcări incipiente, dar, conform raționamentului de la capitolul 11.1, **nu este suficient, singur, pentru a garanta oprirea unei ambalări termice deja avansate la nivelul unui rack întreg** — motiv pentru care este întotdeauna combinat cu sistemul de răcire exterioară cu apă descris mai jos, iar niciodată prezentat, în proiectarea prezentei instalații, ca soluție unică sau suficientă.

### 11.3. Sistemul exterior de răcire cu apă (drencer)

Strategia adoptată, coerentă cu concluzia capitolului 11.1, prevede un **sistem de răcire cu apă pulverizată (drencer), aplicat pe suprafața exterioară a containerului afectat**, activat automat la confirmarea unui eveniment de incendiu susținut (semnal combinat de la detecția de gaz/fum/temperatură și, dacă disponibilă, de la un detector de flacără), cu rol de: (a) răcirea anvelopei containerului, limitând transferul termic către rack-urile neafectate din interior și, implicit, întârziind sau prevenind propagarea în cascadă; (b) răcirea containerelor **adiacente**, expuse la radiația termică a containerului afectat, prevenind un al doilea eveniment indus termic la o unitate vecină — funcție esențială într-o instalație cu mai multe containere amplasate la distanțe reduse (cap. 13.2). Debitul specific de aplicare a apei (l/min/m² de suprafață expusă) și durata minimă de funcționare continuă se stabilesc la faza PT pe baza recomandărilor producătorului containerului (validate, de regulă, prin testarea UL 9540A specifică produsului) și a cerințelor scenariului de securitate la incendiu, piesă elaborată de specialist atestat și avizată de Inspectoratul pentru Situații de Urgență — prezentul memoriu nu se substituie acelui document, ci dimensionează sursa și rezerva de apă necesară susținerii cerinței acestuia (cap. 11.4).

### 11.4. Rezerva de apă și dimensionarea

Dimensionarea rezervei de apă pentru stingere/răcire urmează principiile generale ale normativului **P118 (seria 1/2/3)** și ale **Ordinului MAI privind normele metodologice de avizare/autorizare de securitate la incendiu**, adaptate specificului particular al unui BESS — spre diferență de o clădire civilă, unde rezerva de incendiu este dimensionată pe baza debitului și a duratei standard de funcționare a hidranților/sprinklerelor conform categoriei de risc a clădirii, la un BESS rezerva trebuie să acopere explicit **durata de răcire continuă necesară** pentru containerul afectat și, simultan, pentru containerele adiacente expuse termic (cap. 11.3), pe intervalul de timp stabilit prin scenariul de securitate la incendiu specific amplasamentului — durată care, în absența unui raport de testare UL 9540A specific echipamentului contractat, **nu poate fi anticipată printr-o cifră general valabilă și se stabilește obligatoriu la faza PT**, pe baza datelor experimentale ale producătorului sau, în lipsa acestora, pe baza celei mai conservatoare ipoteze acceptate de proiectantul de specialitate PSI și de ISU. Rezervorul de apă tehnologică pentru stingere/răcire, dimensionat conform acestei durate și acestui debit, se amplasează separat de orice rezervă de apă potabilă a amplasamentului (cap. 16.1), cu alimentarea grupului de pompare de incendiu asigurată din sursa electrică de siguranță a instalației (cap. 15), pentru a garanta funcționarea sistemului de răcire chiar în condițiile unei eventuale afectări parțiale a alimentării electrice generale de pe amplasament.

### 11.5. Retenția apelor de stingere contaminate

Apa utilizată pentru răcirea unui container afectat de un eveniment de incendiu **nu este apă curată** — ea antrenează produși de descompunere ai electrolitului (potențial inclusiv compuși fluorurați, rezultați din descompunerea termică a sărurilor de litiu ale electrolitului, cu toxicitate și corozivitate ridicate) și trebuie **colectată și retenționată separat**, fără a fi permisă scurgerea necontrolată către canalizarea menajeră, către un emisar natural sau către sol. Platforma pe care sunt amplasate containerele se proiectează cu **pantă de scurgere dirijată către un bazin de retenție dedicat**, impermeabilizat, dimensionat pentru a colecta volumul maxim de apă de stingere utilizat pe durata unui eveniment (conform dimensionării de la capitolul 11.4) plus o rezervă pentru precipitațiile concomitente, cu golire ulterioară controlată (vidanjare și tratare/eliminare ca deșeu conform reglementărilor de mediu aplicabile), niciodată prin deversare directă în rețeaua de canalizare publică sau într-un curs de apă (cap. 16.3).

---

## 12. Ventilația de deflagrație (explosion venting)

### 12.1. Principiul și normativul aplicabil (NFPA 68/69, EN 14994)

Acumularea de gaze inflamabile (în special hidrogen, degajat în faza de degazare descrisă la capitolul 10.1) în interiorul unui spațiu închis, precum incinta unui container de baterii, creează riscul unei **deflagrații** — o explozie de joasă viteză de propagare a frontului de flacără, care generează o creștere rapidă a presiunii interne, capabilă să deterioreze sau să distrugă structura incintei dacă suprapresiunea nu este eliberată controlat. Standardele **NFPA 68 (Standard on Explosion Protection by Deflagration Venting)** și **NFPA 69 (Standard on Explosion Prevention Systems)**, alături de standardul european echivalent **EN 14994 (Gas explosion venting protective systems)**, stabilesc metodologia de proiectare a **panourilor de decompresie (explosion vents)** — elemente ale anvelopei containerului proiectate să cedeze controlat la o suprapresiune internă predeterminată, mult inferioară presiunii maxime pe care structura containerului o poate suporta, direcționând unda de suprapresiune și frontul de flacără către o direcție sigură (uzual în afara zonelor de circulație a personalului și departe de containerele adiacente).

### 12.2. Dimensionarea suprafeței de decompresie

Suprafața necesară a panourilor de decompresie (A_v) se determină, conform metodologiei EN 14994/NFPA 68, în funcție de: **volumul incintei protejate (V)**, **presiunea maximă redusă acceptabilă (p_red,max)** — presiunea internă maximă pe care structura containerului o poate suporta fără deteriorare structurală ireversibilă, valoare care trebuie să rămână inferioară limitei de rezistență declarate de producătorul containerului —, **presiunea statică de deschidere a panoului (p_stat)** — pragul de suprapresiune la care panoul cedează, ales suficient de scăzut pentru a permite eliberarea presiunii înainte ca aceasta să atingă p_red,max, dar suficient de ridicat pentru a evita deschideri false la fluctuații normale de presiune (de exemplu, la funcționarea sistemului HVAC) —, și **caracteristica de reactivitate a amestecului exploziv (K_G)**, un parametru specific fiecărui gaz, care cuantifică viteza de creștere a presiunii în timpul unei deflagrații:

**A_v = f(V, p_red,max, p_stat, K_G)**

Particularitatea critică pentru instalațiile BESS este că **hidrogenul are o valoare K_G foarte ridicată** (de ordinul câtorva sute de bar·m/s, semnificativ superioară majorității gazelor combustibile industriale uzuale precum metanul sau propanul), reflectând viteza sa de ardere foarte rapidă — această caracteristică impune, pentru o deflagrație dominată de hidrogen, o **suprafață de decompresie proporțional mai mare** decât ar rezulta din aplicarea formulei cu un K_G tipic de gaz natural, aspect pe care proiectantul de specialitate trebuie să îl considere explicit la alegerea parametrului K_G de calcul, pe baza compoziției gazelor de degazare așteptate pentru chimia specifică a bateriei instalate (documentată, ideal, prin testare UL 9540A a producătorului). Calculul numeric complet al suprafeței de decompresie necesare, cu valorile finale de V, p_red,max, p_stat și K_G specifice containerului contractat, se realizează la faza PT, pe baza fișei tehnice a echipamentului și, dacă disponibil, a raportului de testare al producătorului — prezentul memoriu nu poate anticipa, la faza DTAC, o cifră numerică specifică fără aceste date de intrare, dar stabilește principiul, metodologia și normativul de calcul aplicabil.

### 12.3. Ventilația mecanică de menținere sub LEL

Complementar panourilor de decompresie (măsură pasivă, activă doar la atingerea unui prag de suprapresiune), fiecare container este echipat cu un **sistem de ventilație mecanică de extracție forțată**, comandat automat de sistemul de detecție de gaz (cap. 10.2) la depășirea pragului de pre-alarmă, cu rol de a **dilua și evacua** amestecul de gaze de degazare înainte ca acesta să atingă concentrația corespunzătoare limitei inferioare de explozie (LEL) — o măsură preventivă, activă în faza incipientă a unui eveniment (faza 2, degazare, cap. 10.1), distinctă de panourile de decompresie (măsură reactivă, care intervine doar dacă deflagrația s-a produs deja). Debitul de ventilație necesar pentru menținerea concentrației sub un procent conservator din LEL se calculează pe baza ratei estimate de degazare a unui eveniment de referință (date de producător, dacă disponibile) și a volumului incintei, cu dimensionare finală la faza PT.

---

## 13. Compartimentare, distanțe de siguranță și autorizarea ISU

### 13.1. Testul de propagare UL 9540A — fundamentul distanțelor de siguranță

Standardul **UL 9540A (Test Method for Evaluating Thermal Runaway Fire Propagation in Battery Energy Storage Systems)** definește o metodologie de încercare experimentală, la scară progresivă (celulă → modul → unitate/rack → instalație), pentru determinarea comportamentului real de propagare a unei ambalări termice inițiate deliberat într-o celulă a echipamentului testat. Rezultatul acestui test — **propagare confirmată** (evenimentul se extinde la modulele/rack-urile adiacente în interiorul aceleiași unități) versus **non-propagare confirmată** (evenimentul rămâne izolat la celula/modulul de inițiere) — fundamentează, cu date experimentale specifice produsului efectiv instalat, decizia de proiectare privind distanțele de siguranță și necesitatea (sau nu) a compartimentării fizice suplimentare între unități. **În absența unui raport de testare UL 9540A specific echipamentului contractat la momentul elaborării prezentului memoriu**, se adoptă ipoteza conservatoare a propagării posibile (cap. 1.3), cu toate măsurile de compartimentare descrise mai jos; raportul de testare, odată obținut de la producător la faza PT, poate justifica o optimizare a distanțelor, dar aceasta rămâne o decizie ulterioară, fundamentată tehnic, nu o simplificare implicită.

### 13.2. Distanțele de siguranță (NFPA 855)

Standardul **NFPA 855** stabilește, pentru instalații de tip utility-scale, o matrice de distanțe minime de separare — între containere adiacente, între containere și limita de proprietate, și între containere și alte construcții de pe amplasament — funcție de rezultatul testului UL 9540A (cap. 13.1) și de prezența/absența unor măsuri compensatorii (pereți rezistenți la foc, sisteme de răcire exterioară cu apă, cap. 11.3). În ipoteza conservatoare adoptată (fără raport de testare specific care să demonstreze non-propagarea), se adoptă, ca principiu de proiectare, o **distanță minimă orientativă de cel puțin 3 m între containere adiacente**, coroborată cu sistemul de răcire exterioară cu apă descris la capitolul 11.3 (care asigură protecția termică suplimentară a unităților vecine în cazul unui eveniment) — valoarea exactă finală, care poate fi redusă printr-un raport de testare favorabil sau majorată de cerințele specifice ale scenariului de securitate la incendiu, se stabilește definitiv la faza PT, în avizarea căreia intervine, obligatoriu, specialistul atestat PSI și, ulterior, Inspectoratul pentru Situații de Urgență.

### 13.3. Compartimentarea constructivă

Dincolo de distanțele libere între containere, zonele tehnice ale instalației care nu sunt de tip container prefabricat (postul de transformare, camera de comandă/SCADA, eventualele spații de mentenanță) se separă de zona de baterii propriu-zisă prin **pereți/elemente de compartimentare cu rezistență la foc EI** (rezistență la foc și etanșeitate la fum), de valoare stabilită prin scenariul de securitate la incendiu, pe principiul de a limita propagarea unui eveniment din zona de baterii (risc dominant) către zonele cu echipamente electronice critice sau cu prezență ocazională de personal. Distanțele față de limitele de proprietate, față de drumurile publice și față de eventuale construcții învecinate se stabilesc conform prevederilor P118 aplicabile categoriei de risc a obiectivului, coroborate cu cerințele specifice de distanță ale NFPA 855 pentru instalații BESS.

### 13.4. Sistemul de oprire de urgență (E-stop)

Instalația este echipată cu un sistem de **oprire de urgență (E-stop)**, accesibil atât din exteriorul fiecărui container (buton de acționare manuală, vizibil și accesibil fără a necesita intrarea în incintă), cât și de la o stație centrală de comandă a amplasamentului, a cărui acționare (manuală sau automată, la comanda sistemelor de detecție descrise la capitolul 10) comandă simultan: **deconectarea PCS-ului** (întreruperea imediată a fluxului energetic dinspre/către rețea) și **deschiderea contactoarelor DC principale ale tuturor rack-urilor și containerelor** (izolarea electrică a bateriilor de orice circuit extern), reducând instalația la o stare pasivă de siguranță maximă disponibilă — este important de precizat că această acțiune **nu elimină energia stocată chimic în celule** (cap. 1.1), motiv pentru care E-stop-ul este complementar, nu substitutiv, sistemelor de detecție/răcire/ventilație descrise la capitolele 10–12, care rămân active și necesare chiar și după acționarea E-stop-ului.

### 13.5. Autorizarea ISU

Dat fiind riscul de incendiu asociat (de regulă încadrat la categoria de risc mare, dată fiind natura energetică a instalației și cantitatea semnificativă de material combustibil/exploziv potențial — electrolitul și gazele de degazare), instalația se supune avizării/autorizării de securitate la incendiu conform **Ordinului MAI 129/2016** (norme metodologice de avizare/autorizare) și **HG 571/2016** (categoriile de construcții/amenajări supuse acestei proceduri), pe baza unui **scenariu de securitate la incendiu** dedicat, elaborat de specialist atestat, care tratează exhaustiv logica de detecție/alarmare/stingere/evacuare (a personalului de mentenanță ocazional prezent pe amplasament) specifică instalației — document distinct de prezentul memoriu, cu care acesta se corelează la punctele de interfață descrise pe parcursul capitolelor 10–13 (dimensionarea sursei de apă, a suprafeței de decompresie, a distanțelor de compartimentare), fără a-i substitui conținutul.

---

## 14. EMS și SCADA — dispecerizare, telemetrie, comunicații, securitate cibernetică

### 14.1. Arhitectura EMS

**Sistemul de management al energiei (Energy Management System, EMS)** este stratul software de decizie al instalației, poziționat ierarhic deasupra BMS-ului (care gestionează siguranța și starea fizică a bateriei, cap. 4) și al PCS-ului (care execută comenzile de putere, cap. 5), cu rolul de a transforma o strategie de operare (comercială și de servicii de sistem) în setpoint-uri concrete de putere activă/reactivă transmise fiecărui PCS al instalației. EMS-ul primește, ca date de intrare, starea agregată de sănătate a bateriei de la System BMS Master (cap. 4.4), semnalele de preț de pe piața de energie (sau contractul de furnizare a unui serviciu de flexibilitate/sistem), și, dacă aplicabil, semnalul de activare al operatorului de transport pentru serviciile de reglaj (cap. 6.5), pe baza cărora calculează, în timp real, punctul optim de funcționare al fiecărui PCS.

### 14.2. Logica de dispecerizare (arbitraj, servicii de sistem)

Optimizarea dispecerizării unei instalații BESS multi-servicii — capabilă simultan de arbitraj energetic (cap. 3.2), de participare la FCR/aFRR și de suport de tensiune (cap. 6.5) — este o problemă de optimizare complexă, care trebuie să reconcilieze obiective potențial concurente: rezervarea unei fracțiuni din capacitate și din putere pentru servicii de sistem contractate (reducând capacitatea disponibilă pentru arbitraj liber) versus maximizarea profitului din arbitraj (care ar consuma întreaga capacitate disponibilă în ciclurile de preț cele mai favorabile), toate constrânse de starea reală de sănătate a bateriei (SOC/SOH, cap. 4.5) și de limitele termice ale sistemului HVAC (cap. 9). Algoritmul EMS implementează, tipic, o ierarhie de priorități (respectarea obligațiilor contractuale de servicii de sistem înaintea optimizării de arbitraj liber) și un model de degradare a bateriei (pentru a evita o strategie de operare pe termen scurt care maximizează profitul imediat cu prețul unei degradări accelerate și, implicit, al unui cost de înlocuire anticipat al bateriei) — detaliile algoritmice specifice sunt proprietatea furnizorului de EMS și nu fac obiectul prezentului memoriu de instalații, care se limitează la a descrie arhitectura funcțională și interfețele.

### 14.3. SCADA și telemetria către OD/OTS

Sistemul **SCADA (Supervisory Control and Data Acquisition)** al instalației agregă, într-o interfață unică de monitorizare și comandă, datele de la BMS, PCS, EMS, sistemele HVAC și sistemele de detecție/PSI (cap. 10), oferind operatorului instalației o imagine completă a stării funcționale și de siguranță, în timp real. Comunicația cu **operatorul de distribuție (OD)** sau, după caz, cu **operatorul de transport și de sistem (OTS/Transelectrica)**, conform cerințelor avizului tehnic de racordare (cap. 6.3), transmite telemăsura (putere activă/reactivă instantanee, tensiune, frecvență, stare de disponibilitate) necesară monitorizării de către operatorul de rețea a impactului instalației asupra rețelei locale, și, în sens invers, recepționează telecomenzi (limitare de putere, deconectare de urgență) pe care operatorul de rețea le poate emite în situații excepționale de siguranță a sistemului energetic național — canal de comunicație realizat, de regulă, conform protocoalelor standardizate ale sectorului energetic (**IEC 61850** pentru automatizarea stațiilor electrice, sau **Modbus TCP/DNP3** pentru telemetrie/telecomandă la echipamentele de nivel inferior), asigurând interoperabilitatea cu sistemele de dispecerizare ale operatorului de rețea.

### 14.4. Comunicații — backbone de fibră optică

Volumul de date generat de instrumentația de monitorizare a unei instalații BESS de această complexitate (mii de puncte de măsură de tensiune/temperatură la nivel de celulă/modul, agregate în timp real de la fiecare rack și container, cap. 4) impune o rețea de comunicații internă de capacitate și de fiabilitate ridicată — soluția adoptată este un **backbone de fibră optică**, care interconectează fiecare container, postul de transformare și camera de comandă/SCADA, oferind imunitate la interferențele electromagnetice (relevantă în proximitatea echipamentelor de putere — PCS, transformator — care generează perturbații electromagnetice semnificative) și o lățime de bandă suficientă pentru transmiterea în timp real a volumului mare de telemetrie generat de sistemul BMS. Traseul rețelei de fibră optică urmează, de regulă, aceleași șanțuri tehnice utilizate pentru cablurile de forță de joasă tensiune (cu separare fizică adecvată pentru evitarea diafoniei/interferenței), conform practicii uzuale de proiectare a infrastructurii de cabluri a unui parc energetic.

### 14.5. Securitatea cibernetică

Fiind o instalație de infrastructură energetică critică, cu capacitate de a influența, prin acțiune malițioasă, stabilitatea locală a rețelei electrice (o deconectare intempestivă coordonată sau o comandă falsă de încărcare/descărcare la putere maximă ar putea perturba echilibrul rețelei locale), sistemul SCADA/EMS al unui BESS trebuie proiectat cu măsuri de **securitate cibernetică** proporționale cu acest risc: segregarea rețelei de control (OT — Operational Technology) de rețeaua de date administrative (IT) prin firewall-uri dedicate și, ideal, prin diode de date unidirecționale pe traseele unde fluxul de informație necesar este exclusiv de ieșire (telemetrie către operatorul de rețea); autentificare multi-factor și control de acces bazat pe roluri pentru orice interfață de comandă a EMS/SCADA; jurnalizarea (logging) tuturor comenzilor de operare, cu trasabilitate completă; și un plan de răspuns la incidente cibernetice, coordonat cu politica de securitate cibernetică a operatorului de rețea la care instalația este racordată. Aceste măsuri, deși nu constituie obiectul unui calcul de instalații în sensul clasic al termenului, sunt parte integrantă a proiectului de instalații electrice și de automatizare al unui BESS modern și se detaliază complet într-un document dedicat de arhitectură de securitate cibernetică, la faza PT.

---

## 15. Alimentări auxiliare — UPS, alimentare de black-start, generator de rezervă

### 15.1. UPS pentru sarcini critice de control

Sarcinile electrice ale căror întrerupere, chiar și de fracțiuni de secundă, ar compromite integritatea datelor sau ar întrerupe funcțiile de siguranță ale instalației — serverele SCADA, sistemul de comunicații (cap. 14.4), centrala de semnalizare a incendiului (cap. 10.5) și circuitele de comandă ale BMS-ului — sunt alimentate printr-un **sistem UPS (Uninterruptible Power Supply) on-line**, dimensionat pentru a susține aceste sarcini critice pe durata de comutare către sursa de rezervă (dacă instalația dispune de o astfel de sursă, cap. 15.3) sau pe o autonomie suficientă pentru finalizarea în siguranță a unei secvențe de oprire controlată a instalației, în cazul unei întreruperi prelungite a alimentării externe.

### 15.2. Alimentarea DC auxiliară din sistemul de baterii (capacitate de black-start)

O particularitate tehnică specifică unui BESS, fără echivalent la o instalație electrică convențională alimentată exclusiv din rețea, este posibilitatea de a utiliza **energia stocată în propriile baterii ca sursă de alimentare auxiliară** pentru sarcinile de control ale instalației (BMS, comunicații, o parte din sistemul HVAC) în situația unei întreruperi a alimentării externe din rețea — o instalație BESS cu capacitate PCS grid-forming (cap. 5.2) poate, teoretic, alimenta propriile sarcini auxiliare critice și, în anumite configurații avansate, chiar contribui la **restaurarea alimentării unei porțiuni izolate de rețea (black-start)**, capacitate care este din ce în ce mai solicitată de operatorii de transport ca serviciu de sistem dedicat, distinct de arbitraj și de FCR/aFRR (cap. 6.5). Specificarea exactă a acestei capacități (opțională, la cererea beneficiarului/operatorului de rețea) se stabilește la faza PT.

### 15.3. Generatorul de rezervă

La instalațiile la care continuitatea sistemelor de siguranță (HVAC, detecție de gaz/fum, ventilație de urgență, cap. 9–12) nu poate fi garantată suficient de UPS-ul de la capitolul 15.1 (a cărui autonomie este, prin natura tehnologiei, limitată la ordinul zecilor de minute până la câteva ore, funcție de dimensionare), se poate prevedea un **generator de rezervă (diesel sau gaz)**, dimensionat pe sarcinile de siguranță reale ale instalației (HVAC-ul menținut la un regim redus dar suficient pentru evitarea depășirii ferestrei critice de temperatură, sistemele de detecție și de ventilație de urgență, iluminatul de siguranță, cap. 17.2) — necesitatea și dimensionarea exactă a acestui generator se stabilesc la faza PT, în funcție de durata maximă acceptabilă de întrerupere a alimentării externe fără a compromite siguranța bateriilor stocate (o durată care depinde, la rândul ei, de temperatura exterioară de proiect, cap. 1.5, și de inerția termică a containerelor), analiză care nu poate fi generalizată printr-o cifră unică valabilă la orice amplasament din intervalul parametric 10–50 MWh al prezentului memoriu.

---

## 16. Instalații sanitare și canalizare — clădirea/containerul de control

### 16.1. Alimentarea cu apă potabilă

Componenta sanitară a unei instalații BESS este, spre diferență de toate celelalte funcțiuni tratate în prezenta bibliotecă, minimă — se limitează, de regulă, la alimentarea cu apă potabilă a unui eventual container/clădire de control cu prezență ocazională de personal (grup sanitar, chiuvetă), branșată la rețeaua publică de distribuție (dacă disponibilă la amplasament) sau, la amplasamentele izolate, printr-un put propriu cu tratare corespunzătoare, cu debit de calcul neglijabil în raport cu complexitatea celorlalte instalații ale obiectivului. Această alimentare este complet **separată și independentă** de rezerva de apă tehnologică pentru stingere/răcire (cap. 11.4), fără nicio legătură care ar permite amestecarea celor două circuite.

### 16.2. Canalizarea menajeră

Apele uzate menajere generate de eventualul grup sanitar al containerului/clădirii de control se evacuează printr-o rețea de canalizare separativă, racordată la rețeaua publică de canalizare (dacă disponibilă) sau la o instalație de epurare individuală conformă reglementărilor de mediu aplicabile (la amplasamentele fără acces la rețeaua publică) — dimensionare uzuală, fără particularități specifice unui BESS, realizată conform SR EN 12056 la debitul redus generat de prezența ocazională de personal de mentenanță.

### 16.3. Apele de stingere contaminate — separare strictă de canalizarea menajeră/emisar

Elementul cu adevărat specific și critic al capitolului de canalizare al unui BESS este obligația de **separare totală** între cele două circuite: canalizarea menajeră (cap. 16.2), care poate fi racordată la rețeaua publică, și sistemul de colectare a apelor de stingere/răcire contaminate (cap. 11.5), care se colectează exclusiv într-un bazin de retenție dedicat, impermeabilizat, fără nicio conexiune către canalizarea menajeră, către rețeaua publică sau către un emisar natural — orice amestecare a celor două circuite ar contamina rețeaua publică de canalizare cu produși de descompunere toxici/corozivi ai electrolitului, o eroare de proiectare cu consecințe grave de mediu care trebuie exclusă explicit prin soluția constructivă (trasee complet separate, fără puncte comune, verificate la recepție).

---

## 17. Iluminat — interior, siguranță, exterior de securitate, CCTV

### 17.1. Iluminatul normal interior

Spațiile cu prezență ocazională de personal (postul de transformare, camera de comandă/SCADA, eventualele spații de mentenanță) sunt echipate cu iluminat artificial dimensionat conform **SR EN 12464-1** (iluminatul locurilor de muncă interioare), la niveluri de iluminare adecvate activității de mentenanță și de citire a instrumentației (uzual 200–500 lucși, funcție de zona specifică), cu corpuri de iluminat compatibile cu mediul industrial (grad de protecție IP adecvat prezenței de praf/umiditate). Interiorul containerelor de baterii propriu-zise este echipat, tipic, cu un iluminat tehnic minim, suficient pentru intervențiile ocazionale de mentenanță, comandat local și/sau prin sistemul de automatizare al containerului.

### 17.2. Iluminatul de siguranță

Căile de acces și de evacuare de pe amplasament, precum și zonele cu echipamente critice (postul de transformare, camera SCADA), sunt echipate cu **iluminat de siguranță** (pentru evacuare și pentru continuarea lucrului la echipamentele critice în caz de întrerupere a alimentării normale), alimentat din sursa de rezervă a instalației (UPS, cap. 15.1, sau generator, cap. 15.3), conform principiilor generale ale normativelor de iluminat de siguranță aplicabile construcțiilor industriale, adaptate la specificul unui amplasament cu prezență redusă și ocazională de personal.

### 17.3. Iluminatul exterior de securitate

Perimetrul amplasamentului, împrejmuirea și zonele de acces (porți, drumuri interioare de circulație) sunt echipate cu **iluminat exterior de securitate**, cu rol dublu: facilitarea intervenției echipelor de mentenanță/pompieri pe timp de noapte și descurajarea/detectarea unei eventuale efracții pe un amplasament nesupravegheat permanent de personal — corpurile de iluminat exterior sunt, tipic, comandate automat prin senzor crepuscular și/sau prin senzor de mișcare, coordonate cu sistemul CCTV (cap. 17.4) și cu sistemul de control acces/efracție (cap. 18.2).

### 17.4. Sistemul CCTV

Amplasamentul este echipat cu un sistem de **supraveghere video (CCTV)**, cu acoperire completă a perimetrului, a punctelor de acces și a zonelor cu echipamente critice (postul de transformare, intrările containerelor), înregistrat continuu și accesibil de la distanță prin rețeaua de comunicații a instalației (cap. 14.4), integrat funcțional cu sistemul de control acces (cap. 18.2) și cu sistemul SCADA — o alarmă de detecție de gaz/fum (cap. 10) sau o alarmă de efracție poate fi corelată automat cu imaginea video a zonei respective, facilitând evaluarea rapidă a situației de către dispecerul central înainte de mobilizarea unei intervenții fizice.

---

## 18. Curenți slabi — comunicații, control acces, integrare cu PSI

### 18.1. Rețeaua de date

Rețeaua de curenți slabi a instalației, suportată de backbone-ul de fibră optică descris la capitolul 14.4, interconectează toate sistemele de automatizare, monitorizare și securitate ale amplasamentului (BMS, EMS, SCADA, PSI, CCTV, control acces) într-o infrastructură unică de comunicații, proiectată conform principiilor de cablare structurată aplicabile (segregare fizică și logică a rețelei OT față de orice rețea IT administrativă, cap. 14.5).

### 18.2. Control acces și efracție

Accesul fizic la amplasament (poarta principală) și la fiecare container/spațiu tehnic este controlat printr-un sistem de **control acces** (cititor de card/cod, cu jurnalizarea completă a intrărilor/ieșirilor), completat de un sistem de **detecție a efracției** (contacte magnetice pe uși, detectoare de mișcare în spațiile tehnice), ambele integrate în platforma de securitate a amplasamentului și monitorizate 24/7 prin SCADA, corelat cu sistemul CCTV — un amplasament BESS, neexploatat permanent cu personal, are un profil de risc de intruziune specific (valoarea echipamentelor instalate, riscul de sabotaj asupra unei infrastructuri energetice critice), care justifică acest nivel de instrumentare a securității fizice.

### 18.3. Integrarea curenților slabi cu EMS/SCADA/PSI

Toate sistemele de curenți slabi descrise mai sus (control acces, CCTV, detecție efracție) sunt integrate, la nivel de platformă software, cu sistemul SCADA central al instalației (cap. 14.3) și cu centrala de semnalizare a incendiului (cap. 10.5), astfel încât dispecerul central să dispună de o interfață unică de monitorizare a stării complete a amplasamentului — funcționale, de siguranță și de securitate fizică — fără a fi necesară consultarea unor sisteme separate și necorelate. Această integrare este, la rândul ei, o cerință de proiectare specifică unei instalații industriale critice neexploatate permanent, unde viteza și calitatea informației disponibile dispecerului determină direct capacitatea de reacție la orice eveniment.

---

## 19. Coordonarea interdisciplinară

Proiectarea instalațiilor unui BESS necesită o coordonare strânsă cu celelalte discipline ale documentației, în puncte de interfață bine definite: **cu memoriul de structură**, pentru fundațiile containerelor (dimensionate la sarcina permanentă a echipamentului, incluzând greutatea celor 4.000 de module din exemplul de referință, cap. 3.1), fundația și cuva de retenție a transformatorului (cap. 6.1) și ancorarea seismică a echipamentelor grele; **cu memoriul de arhitectură**, pentru sistematizarea pe verticală a platformei (pantele de scurgere către bazinul de retenție, cap. 11.5, și către separatorul pluvial, dacă aplicabil), distanțele de siguranță dintre containere (cap. 13.2) și amplasarea împrejmuirii/porților de acces; **cu scenariul de securitate la incendiu**, elaborat separat de specialist atestat, la toate punctele de interfață tratate explicit pe parcursul capitolelor 10–13 (dimensionarea sursei/rezervei de apă, a suprafeței de decompresie, a distanțelor de compartimentare); și **cu proiectul de racordare la rețea**, avizat de operatorul de distribuție/transport, care fundamentează dimensionarea transformatorului, a celulelor MT și a protecțiilor de interfață (capitolele 6–7). Nicio decizie de dimensionare din prezentul memoriu nu este validă independent de aceste interfețe — recalcularea finală, cu datele definitive ale echipamentului contractat și ale amplasamentului specific, se realizează obligatoriu la faza de proiect tehnic (PT), conform structurii deja adoptate pentru alte funcțiuni ale platformei (a se vedea, ca precedent metodologic, suplimentul PTh al obiectivului de tip parc fotovoltaic din aceeași bibliotecă).

---

## 20. Recepția, probele și punerea în funcțiune

Punerea în funcțiune a unei instalații BESS urmează o secvență de probe ierarhizată, de la nivelul cel mai granular către cel mai agregat: **probe la nivel de modul/rack** (verificarea tensiunilor individuale de celulă, a continuității conexiunilor, a funcționării CMU/RBMS, cap. 4.1–4.3), **probe la nivel de container** (funcționarea coordonată a rack-urilor pe bus-ul DC comun, funcționarea PCS-ului în ambele sensuri de conversie la sarcină parțială și, ulterior, la sarcină nominală, cap. 5), **probe ale sistemelor de siguranță** (verificarea funcțională a fiecărui strat de detecție descris la capitolul 10, prin simulare controlată a pragurilor de alarmă, verificarea acționării E-stop-ului, cap. 13.4, și, dacă fezabil fără declanșarea reală a agentului, verificarea logicii de comandă a sistemului de răcire exterioară cu apă, cap. 11.3), **probe de racordare la rețea** (verificarea protecțiilor de interfață, cap. 7.3–7.4, măsurarea calității energiei la punctul de racordare conform cap. 5.4, și verificarea conformității cu curbele LVRT/HVRT impuse de RfG, cap. 6.3, în coordonare cu operatorul de distribuție/transport) și, în final, **probe de sistem integrat** (verificarea completă a lanțului de dispecerizare EMS→PCS→rețea, cap. 14, și a integrării SCADA cu toate subsistemele descrise pe parcursul memoriului). Fiecare fază de probă se documentează într-un protocol dedicat, cu valorile măsurate și criteriile de admisie aplicabile, atașat cărții tehnice a instalației, iar punerea în funcțiune definitivă este condiționată de obținerea avizului/autorizației de securitate la incendiu (cap. 13.5) și de certificatul de conformitate emis de operatorul de distribuție/transport în urma probelor de racordare.

---

## 21. Concluzii, sinteză de indicatori, verificare tehnică și avize

| Indicator | Valoare (exemplu de referință) |
|---|---|
| Energie instalată (E_inst) / utilă (DoD 90%) | 20 MWh / **18 MWh** |
| Număr module (5 kWh/modul) | **4.000** |
| Putere descărcare/încărcare (0,5C, 2h) | **10 MW** (20 MW la 1C) |
| Randament round-trip (η_RT) | **88,5%** (η_PCS² × η_baterie × η_trafo × η_aux) |
| Transformator ridicător | **12,5 MVA** (sau 2×6,3 MVA redundant), 0,69/20 kV, Dyn11 |
| Curent DC / AC-JT / MT | **1.000 A / 881 A / 361 A** (ΔU < 1% pe fiecare tronson) |
| Priză de pământ | **R_p ≤ 1 Ω** |
| Protecție la trăsnet | **LPL I–II** (risc ridicat, evaluare SR EN 62305-2) |
| Fereastră HVAC (setpoint proiectare) | **20–25 °C** (bandă tolerată producător ~15–35 °C, cu degradare peste ~35 °C) |
| Distanță minimă orientativă între containere | **≥ 3 m** (ipoteză conservatoare, fără raport UL 9540A specific) |
| Detecție | gaz H₂/CO + fum aspirativ (VESDA) + cablu termic liniar + BMS |
| Stingere | aerosol/gaz inert (fază incipientă) + răcire exterioară cu apă (NFPA 855, mecanism dominant) |
| Ventilație deflagrație | panouri decompresie EN 14994/NFPA 68-69 + ventilație mecanică sub LEL |

Prezentul memoriu a dezvoltat, plecând de la arhitectura de principiu celulă → modul → rack → container → PCS → transformator → celulă MT → SEN, ansamblul complet de instalații al unei stații BESS: **arhitectura electrică** (capitolele 2–3), cu breviarul de calcul complet al capacității, puterii, randamentului și dimensionării conductoarelor; **sistemul de management al bateriei (BMS)**, tratat pe cele patru niveluri ierarhice de monitorizare și protecție (capitolul 4), care constituie prima linie de apărare împotriva ambalării termice; **sistemul de conversie a puterii (PCS)** și modurile sale de operare (capitolul 5); **infrastructura de medie tensiune și racordarea la SEN**, cu cerințele Cod RET/RED și RfG (capitolul 6); **protecțiile electrice** pe cele trei niveluri de tensiune (capitolul 7) și **sistemul de împământare/protecție la trăsnet** (capitolul 8); **sistemul HVAC**, dimensionat pe raționamentul electrochimic al vieții utile și al siguranței (capitolul 9); **arhitectura completă de detecție și stingere a incendiului**, specifică riscului de ambalare termică al bateriilor litiu-ion — detecție timpurie multi-strat (capitolul 10), strategie de stingere prin răcire cu apă, nu prin înăbușire (capitolul 11), ventilație de deflagrație (capitolul 12) și compartimentare fizică fundamentată pe testarea UL 9540A (capitolul 13); **sistemele de dispecerizare și monitorizare** (EMS/SCADA, capitolul 14) și **alimentările auxiliare de siguranță** (capitolul 15); precum și componentele complementare de instalații sanitare, iluminat și curenți slabi (capitolele 16–18), toate coordonate interdisciplinar (capitolul 19) și verificate printr-o secvență completă de probe la punerea în funcțiune (capitolul 20).

Instalația se încadrează, din perspectiva cerințelor esențiale ale construcțiilor (Legea 10/1995), la **cerința B (siguranță și accesibilitate în exploatare)** — cu accent pe siguranța electrică a personalului de mentenanță și pe fiabilitatea operațională — și la **cerința E (siguranță la incendiu)** — tratată cu prioritate maximă, dat fiind riscul specific de ambalare termică a bateriilor litiu-ion, care nu are echivalent la o construcție civilă obișnuită. Verificarea proiectului se realizează prin **verificator atestat pe cerința Ci (siguranță și securitate la incendiu)** și prin **expertul/proiectantul de specialitate PSI**, iar avizarea/autorizarea de securitate la incendiu se obține de la Inspectoratul pentru Situații de Urgență, pe baza scenariului de securitate la incendiu dedicat (capitolul 13.5). Recalcularea integrală a breviarelor de calcul din prezentul memoriu, cu datele definitive ale echipamentului contractat (raport de testare UL 9540A specific, fișe tehnice complete ale celulei/modulului/PCS/transformatorului), precum și detalierea completă a schemelor monofilare, a scenariului de securitate la incendiu și a calculului final de dimensionare a suprafeței de decompresie și a distanțelor de siguranță, constituie obiectul fazei de proiect tehnic (PT), conform practicii deja adoptate pentru celelalte funcțiuni tehnice ale prezentei biblioteci.
