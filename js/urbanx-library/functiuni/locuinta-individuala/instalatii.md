# Memoriu tehnic de instalații — Locuință individuală unifamilială (P+1E)

## Cuprins

1. Date generale, cadru normativ și ipoteze de calcul
2. Instalații sanitare — alimentare cu apă rece și caldă (I9)
3. Canalizare menajeră (I9, SR EN 12056)
4. Canalizare pluvială — acoperiș și curte (calcul de debit)
5. Instalații termice — necesar, sursă și distribuție (I13, SR EN 12831)
6. Ventilare — VMC dublu flux cu recuperare de căldură (I5)
7. Instalații electrice — curenți tari (I7)
8. Iluminat interior și exterior (NP 061)
9. Priză de pământ și evaluarea protecției la trăsnet (I20, SR EN 62305)
10. Instalație de utilizare a gazelor naturale (Ordinul ANRE 89/2018)
11. Măsuri de apărare împotriva incendiilor (risc mic — locuință unifamilială)
12. Curenți slabi (voce-date, TV, videointerfon, alarmă, smart home)
13. Performanța energetică nZEB (Legea 372/2005) — fotovoltaic, solar termic, CPE
14. Acustică, antivibrații și protecția seismică a echipamentelor
15. Corelarea instalațiilor cu arhitectura și structura
16. Recepția, probele și punerea în funcțiune
17. Concluzii, sinteză de indicatori și verificare tehnică

---

## 1. Date generale, cadru normativ și ipoteze de calcul

### 1.1 Descrierea obiectivului

Prezentul memoriu tehnic de specialitate tratează instalațiile aferente unei **locuințe individuale unifamiliale**, cu regim de înălțime **P+1E** (parter + etaj, regim redus), destinată unei familii de referință de **5 persoane**. Construcția cuprinde la parter zona de zi (living, bucătărie deschisă/închisă, hol, grup sanitar de serviciu, eventual garaj/spălătorie) și la etaj zona de noapte (3 dormitoare, 2 băi, hol de distribuție). Caracteristicile geometrice și funcționale de referință adoptate în calculele din prezentul memoriu sunt:

| Element | Valoare | Observații |
|---|---|---|
| Regim de înălțime | P+1E | Regim redus, fără subsol de locuit |
| Suprafață utilă (Su) | ~150 mp | Bază de calcul termic/electric/sanitar |
| Arie construită desfășurată (Acd) | ~180 mp | Include garaj, terase, casa scării |
| Amprentă la sol / proiecție acoperiș | ~100…110 mp | Bază de calcul pluvial și fotovoltaic |
| Înălțime liberă interioară | 2,70 m | Ambele niveluri |
| Număr de persoane (familie de referință) | 5 | Bază de calcul debite apă/ACM/aer |
| Număr de dormitoare | 3 | 1 la parter (opțional) + 2 la etaj, sau toate la etaj |
| Număr de grupuri sanitare complete | 2 + 1 GS service | Baie principală + baie etaj + GS parter |

### 1.2 Încadrări de importanță și de incendiu

| Parametru | Încadrare | Justificare |
|---|---|---|
| Categoria de importanță (HG 766/1997) | **D — redusă** | Locuință unifamilială, construcție curentă |
| Clasa de importanță seismică (P100-1/2013+2019) | **IV** (γ_I,e = 1,00) | Construcții obișnuite, locuințe unifamiliale P+1E |
| Gradul de rezistență la foc | **II** | Structură zidărie confinată/beton armat, planșee necombustibile |
| Risc de incendiu | **mic** | Locuință unifamilială, densitate sarcină termică redusă |
| Aria de aplicare P118 | **nu se aplică** | Locuințele unifamiliale sunt exceptate de la scenariul de securitate la incendiu obligatoriu; se rețin doar măsurile minime de la cap. 11 |

Regimul de înălțime P+1E (cotă ultim nivel finit ≈ +3,00…3,30 m) situează construcția mult sub pragurile de „clădire înaltă" sau „clădire cu risc mare", motiv pentru care instalațiile de siguranță specifice clădirilor publice mari (sprinklere, desfumare mecanizată, avertizare vocală, coloane uscate) **nu sunt aplicabile** — se rețin exclusiv măsurile proporționale cu riscul mic al unei locuințe unifamiliale (detectoare autonome de fum, detector de CO, stingător portabil), tratate la capitolul 11.

### 1.3 Cadru normativ aplicabil

**Instalații sanitare și canalizare:**
- I9/2022 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor sanitare
- SR 1478 — Alimentarea cu apă la construcții civile și industriale
- SR EN 806-1…5 — Specificații pentru instalații de distribuție apă potabilă
- SR EN 1717 — Protecția împotriva poluării apei potabile (dispozitive antiretur)
- SR EN 12056-1…5 — Canalizare gravitațională în interiorul clădirilor
- STAS 1795, STAS 1846 — Canalizări (debite de calcul, ploi de calcul)
- Legea 458/2002 (r) — Calitatea apei potabile
- OMS 119/2014 — Norme de igienă privind mediul de viață (distanțe fose septice/puțuri/limite de proprietate)

**Instalații termice și ventilare:**
- I13/2015 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor de încălzire centrală
- I5/2022 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor de ventilare și climatizare
- C107/1…5 — Normativ privind calculul termotehnic al elementelor de construcție
- SR 1907-1/2 — Necesar de căldură (temperaturi de calcul, zonare climatică)
- SR EN 12831 — Metoda de calcul a sarcinii termice de proiectare

**Instalații electrice:**
- I7/2011 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor electrice cu tensiuni până la 1000 V c.a.
- NP 061/2002 — Normativ pentru proiectarea și executarea sistemelor de iluminat artificial
- I20/2000 — Instalații de protecție împotriva trăsnetului
- SR EN 62305-1…4 — Protecția împotriva trăsnetului
- SR EN 60364 (HD 60364), inclusiv partea 7-701 — Instalații electrice în încăperi cu cadă/duș
- Legea 123/2012 (energie electrică), Ordinul ANRE relevant privind branșamentele electrice
- Legea 184/2021 — Statutul de prosumator (fotovoltaic)

**Instalație de gaze (dacă există rețea disponibilă):**
- Ordinul ANRE 89/2018 — Normele tehnice pentru proiectarea, execuția și exploatarea sistemelor de alimentare cu gaze naturale (NTPEE)
- SR EN 1775 — Alimentarea cu gaz — conducte pentru clădiri

**Eficiență energetică:**
- Legea 372/2005 (r) — Performanța energetică a clădirilor
- Mc 001/2006 (actualizat 2022) — Metodologie de calcul al performanței energetice a clădirilor
- HG 1/2023 — cerințe minime de eficiență energetică pentru clădiri noi (obligativitate nZEB)

**Securitate la incendiu (măsuri minime, riscul mic):**
- P118-1/2013 — Securitatea la incendiu a construcțiilor. Partea I — construcții (arie de aplicabilitate)
- SR EN 14604 — Detectoare autonome de fum

### 1.4 Parametri climatici și de confort de calcul

Locuința de referință este amplasată în zona climatică continentală de nord-est a României (climat cu ierni friguroase și veri calde), parametrii de calcul fiind:

| Parametru | Valoare | Sursă |
|---|---|---|
| Temperatura exterioară de calcul iarnă (θe) | **−18 °C** | SR 1907-1, zona climatică II/III NE |
| Temperatura exterioară de calcul vară | +32 °C (t. uscat) / +23 °C (t. umed) | SR 6648 |
| Temperatura interioară de calcul — camere de zi/dormitoare | **+20…22 °C** | SR 1907-2 |
| Temperatura interioară de calcul — băi | **+24 °C** | SR 1907-2 |
| Grade-zile de încălzire (bază 20/12) | **≈ 3.100…3.400 °C·zi** | Climă continentală NE |
| Umiditate relativă interioară de proiectare | 40…60 % | Confort |
| Temperatura apei reci la intrare | +10 °C | SR 1478 |
| Temperatura apei calde de consum (ACM) | 55…60 °C | I9, cu șoc termic 60 °C antilegionella |

### 1.5 Principii generale de proiectare a instalațiilor pentru locuința unifamilială

Spre deosebire de o clădire publică de mari dimensiuni, proiectarea instalațiilor pentru o locuință unifamilială urmărește un set de principii adaptate scării reduse și exploatării de către un singur beneficiar:

- **Simplitate și fiabilitate**: soluțiile se aleg pentru robustețe și mentenanță ușoară de către beneficiar/service local, evitând sisteme supradimensionate sau redundanțe specifice clădirilor publice (nu se prevăd surse duble, grupuri electrogene sau pompe în configurație 2+1, cu excepția hidroforului la sursă proprie).
- **Eficiență energetică nativă (nZEB)**: alegerea sursei termice (pompă de căldură), a ventilării (VMC cu recuperare) și a producției proprii de energie (fotovoltaic, solar termic) se face din start pentru a îndeplini cerința legală de clădire cu consum de energie aproape egal cu zero, obligatorie pentru orice locuință nouă (Legea 372/2005, HG 1/2023).
- **Zonare pe destinație**: distribuția termică diferențiază parterul (pardoseală radiantă, sarcini termice mari — living, bucătărie) de etaj (radiatoare cu reglaj individual pe cameră, sarcini mai mici — dormitoare), pentru confort optimizat pe fiecare zonă de utilizare.
- **Integrare cu structura și arhitectura**: traseele verticale (ghenă sanitară, coloane electrice, tubulatură VMC) se stabilesc din faza de proiect, cu grupurile sanitare suprapuse pe verticală parter–etaj, pentru a minimiza lungimea traseelor și golurile prin planșeu.
- **Pregătire pentru evoluție** (EV-ready, smart home): tablourile electrice și traseele curenților slabi se dimensionează cu rezervă (minimum 2 module libere în tabloul electric, tub gol pentru viitoare extindere fotovoltaică/baterie/priză de încărcare vehicul electric).
- **Confort și igienă**: soluțiile de instalații termice/sanitare includ măsuri explicite anti-legionella (ACM), echilibrare hidraulică pe circuitele de încălzire și filtrare/tratare a aerului introdus prin VMC.

### 1.6 Bilanțul de suprafețe și bazele de calcul sintetice

| Bază de calcul | Valoare | Utilizare |
|---|---|---|
| Suprafață utilă (Su) | 150 mp | Termic, electric, ventilare |
| Volum interior încălzit (Su × H) | ≈ 405 mc | Ventilare, schimburi de aer |
| Populație de proiectare | 5 persoane | Apă, ACM, canalizare, aer proaspăt |
| Suprafață de acoperiș (proiecție orizontală) | ≈ 110 mp | Pluvial, fotovoltaic, solar termic |
| Număr obiecte sanitare | 13 | Debit apă rece/caldă |
| Suprafață disponibilă acoperiș pentru FV (versant însorit) | ≈ 40…50 mp | Dimensionare fotovoltaic |

---

## 2. Instalații sanitare — alimentare cu apă rece și caldă (I9)

### 2.1 Sursa de alimentare cu apă — cele două variante posibile

**Varianta A — Branșament la rețeaua publică de distribuție** (soluția implicită, acolo unde rețeaua publică este disponibilă la limita de proprietate):
- Branșament din conductă publică prin **teu de branșare + robinet de concesie**, conductă de branșament **PEHD PE100, De 32 mm (Dn 25)**;
- **Cămin de apometru** la limita de proprietate, cu **contor de apă rece Dn 20**, robinete de izolare amonte/aval și **clapetă de sens**;
- Dacă presiunea din rețeaua publică este insuficientă pentru alimentarea etajului (< 1,5…2,0 bar la robinetul cel mai defavorabil de la etaj), se prevede **grup de hidrofor/booster domestic monofazat** (pompă + vas hidrofor 24…50 l + presostat), amplasat în debara/spălătorie.

**Varianta B — Sursă proprie (puț forat/foraj)**, acolo unde nu există rețea publică de distribuție:
- **Puț forat cu adâncime orientativă 40…60 m** (funcție de nivelul hidrostatic local, stabilit prin studiu hidrogeologic/foraj de probă);
- **Pompă submersibilă** cu debit **3…4 mc/h** și înălțime de pompare **45…60 mCA** (funcție de adâncimea puțului și presiunea necesară la utilizare);
- **Grup hidrofor** cu vas de expansiune de **100 l** și presostat/convertizor de frecvență pentru menținerea presiunii constante;
- **Filtrare și tratare a apei**: filtru mecanic **50 μm** (particule în suspensie), filtru cu **cărbune activ** (miros, gust, eventuali compuși organici), **dedurizator** (protecția instalației și a echipamentelor termice împotriva depunerilor de calcar) și, dacă analiza de laborator o impune, **stație UV de dezinfecție** (protecție bacteriologică, în special coliformi);
- **Obligatoriu buletin de analiză a potabilității apei** (laborator acreditat, conform Legii 458/2002 r), repetat periodic (recomandat anual), care să confirme încadrarea în parametrii de potabilitate înainte de punerea în funcțiune și pe durata exploatării.

### 2.2 Determinarea echivalenților de debit și a debitului de calcul (SR 1478/I9)

Dotarea sanitară de proiectare a locuinței (13 obiecte sanitare, repartizate pe cele 2 băi complete + GS service + bucătărie + spălătorie + exterior):

| Obiect sanitar | Buc. | Echivalent E unitar | ΣE |
|---|---|---|---|
| Lavoar (baterie stativă) — baie principală, baie etaj, GS parter | 3 | 0,30 | 0,90 |
| Vas WC (rezervor cu robinet flotor) | 3 | 0,50 | 1,50 |
| Cadă de baie | 1 | 0,30 | 0,30 |
| Cabină de duș | 1 | 0,30 | 0,30 |
| Chiuvetă bucătărie (baterie cu dublu jet) | 1 | 0,50 | 0,50 |
| Mașină de spălat rufe | 1 | 1,00 | 1,00 |
| Mașină de spălat vase | 1 | 0,80 | 0,80 |
| Robinet de serviciu (spălătorie/centrală termică) | 1 | 1,00 | 1,00 |
| Robinet exterior grădină (cu furtun) | 1 | 1,00 | 1,00 |
| **TOTAL** | **13** | — | **≈ 7,30** |

Debitul de calcul al apei reci se determină conform I9/SR 1478, cu relația specifică clădirilor de locuit (coeficient a = 0,15, regim de utilizare cu simultaneitate redusă, specific locuințelor unifamiliale — spre deosebire de a = 0,20…0,30 utilizat la clădirile publice cu utilizare intensă):

**qc = a·√ΣE + 0,004·ΣE** (l/s)

qc = 0,15 × √7,30 + 0,004 × 7,30 = 0,15 × 2,702 + 0,029 = 0,405 + 0,029 = **0,43 l/s**

Se adoptă acoperitor, cu marjă pentru dezvoltări viitoare (eventual grup sanitar suplimentar, robinet de udare suplimentar), un debit de calcul **qc = 0,50 l/s** (≈ 1,8 mc/h).

**Verificarea prin consum zilnic** (normă de consum specific locuință cu instalații complete ≈ 110…150 l/pers·zi conform SR 1478, se adoptă 110 l/pers·zi):

Q_zi,med = 5 × 110 = **550 l/zi ≈ 0,55 mc/zi**

Q_zi,max = 1,3 × 0,55 = 0,715 mc/zi (coeficient de neuniformitate zilnică 1,3, uzual pentru locuințe). Se observă că debitul orar de vârf este guvernat de **simultaneitatea obiectelor sanitare (qc = 0,50 l/s)**, nu de consumul mediu zilnic — acesta din urmă servește doar la verificarea capacității surselor (rezervor hidrofor/puț) și, în varianta cu sursă proprie, la dimensionarea debitului pompei submersibile (3…4 mc/h acoperă amplu 0,715 mc/zi cu marjă pentru vârfuri orare).

Branșamentul se dimensionează la **De 32 (Dn 25)**; viteza în branșament la debitul de calcul: v = qc/A = 0,50·10⁻³ / (π·0,025²/4) = 0,50·10⁻³ / 4,91·10⁻⁴ = **1,02 m/s** (< 2 m/s admis, confort acustic și evitarea loviturii de berbec).

### 2.3 Distribuția interioară — materiale și configurație

Distribuția interioară de la contor/hidrofor la coloana verticală se realizează cu conducte **PP-R (polipropilenă random) sau PEX (polietilenă reticulată)**, în sistem colector-distribuitor (fiecare obiect sanitar are racord individual la un colector centralizat, montat de regulă în debaraua/casa scării sau în plafonul fals al parterului), soluție care elimină joncțiunile ascunse sub șapă și facilitează intervenția.

- **Coloană verticală parter→etaj**: **PP-R/PEX De 25** (acoperă debitul cumulat al obiectelor de la etaj, qc,etaj ≈ 0,35 l/s pentru ΣE_etaj ≈ 4,0: 0,15√4,0+0,004×4,0 = 0,30+0,016 = 0,32 l/s → De 25 confortabil, v ≈ 0,9 m/s);
- **Distribuție orizontală pe nivel**: PP-R/PEX **De 20**;
- **Racorduri la obiecte**: PP-R/PEX **De 16…20**, cu robinete de izolare individuale (colț) la fiecare obiect pentru intervenție fără oprirea întregii instalații;
- **Robinete de izolare generale**: pe branșament (înainte și după contor), pe fiecare coloană (parter/etaj) și pe circuitul de apă caldă, pentru sectorizare la intervenții.
- **Vitezele de proiectare** se limitează la 1,0…1,5 m/s pe distribuția principală și ≤ 1,0 m/s pe racordurile la obiecte (confort acustic, evitarea eroziunii și a zgomotului hidraulic).

### 2.4 Prepararea apei calde de consum (ACM)

Necesarul de ACM (normă locuință ≈ 60 l/pers·zi la 55…60 °C, conform I9):

Q_ACM,zi = 5 × 60 = **300 l/zi = 0,30 mc/zi**

**Necesarul termic zilnic pentru încălzirea apei** (de la temperatura de intrare 10 °C la 55 °C, Δt = 45 K):

Φ_ACM,zi = m · c · Δt = (300 kg × 4,186 kJ/kg·K × 45 K) / 3.600 s/h = 56.511 / 3.600 = **15,7 kWh/zi**

Această valoare reprezintă energia termică zilnică necesară preparării ACM, independent de puterea instantanee a echipamentului (care depinde de regimul de acumulare/preparare adoptat).

**Soluția adoptată — regim hibrid, aliniat cerinței nZEB:**
- **Boiler bivalent de 200 litri**, cu două serpentine: serpentina inferioară alimentată de la **panourile solare termice** (prioritate, energie gratuită) și serpentina superioară (sau rezistență electrică integrată) alimentată de la **pompa de căldură** sau, în lipsa acesteia, direct electric;
- **2 panouri solare termice plane, ~2,5 mp fiecare (5 mp total)**, montate pe versantul de acoperiș cu expunere favorabilă (S/SE-SV, înclinare 30…35°), care acoperă orientativ **60…70 % din necesarul anual de ACM** (contribuție variabilă sezonier: aproape 100 % vara, redusă iarna);
- **Rezistență electrică de completare, 2 kW**, integrată în boiler, pentru acoperirea deficitului solar și ca sursă de rezervă în caz de avarie a pompei de căldură;
- **Ciclu antilegionella**: ridicare programată (săptămânal, prin termostatul boilerului sau printr-un modul de automatizare) a temperaturii acumulării la **60 °C**, menținută minimum 30 de minute, conform bunelor practici de igienă a instalațiilor de ACM;
- **Recirculare ACM** pe traseul către grupurile sanitare mai îndepărtate de boiler (dacă distanța depășește ~8 m), cu pompă de recirculare mică, comandată pe temporizator/prezență, pentru reducerea timpului de așteptare a apei calde la robinet;
- **Mixere termostatice** la punctele de consum din băile copiilor, pentru limitarea temperaturii de ieșire la ~43 °C (protecție antiopărire).

### 2.5 Necesarul de presiune și echiparea de pompare

Presiunea necesară la cel mai defavorabil consumator (baterie duș, etaj):

H_nec = H_geodezic + H_pierderi + H_utilizare

- H_geodezic (de la branșament/puț la etaj) ≈ 6,0 mCA (cotă etaj + înălțime robinet față de pardoseală)
- H_pierderi (liniare + locale, contor, filtre) ≈ 4,0 mCA
- H_utilizare la robinet/duș (presiune de serviciu confortabilă) = 2,0…3,0 bar = 20…30 mCA

**H_nec ≈ 6,0 + 4,0 + 25,0 = ~35 mCA ≈ 3,5 bar**

În **varianta A** (rețea publică), dacă presiunea garantată de operator la limita de proprietate este ≥ 3,5 bar, alimentarea se face direct, fără echipament de pompare. Dacă presiunea disponibilă este mai mică (situație frecventă la extremitățile rețelelor rurale/periurbane), se prevede un **booster domestic monofazat cu vas hidrofor de 24…50 l**, cu pornire/oprire pe presostat, dimensionat la debitul de calcul qc = 0,50 l/s (1,8 mc/h) și presiune de refulare reglată la ~3,5…4,0 bar.

În **varianta B** (puț propriu), grupul de pompare descris la 2.1 (pompă submersibilă 3…4 mc/h / 45…60 mCA + hidrofor 100 l) acoperă integral necesarul, cu marjă confortabilă (debitul pompei fiind de ~2× debitul de calcul al instalației interioare).

### 2.6 Breviar de dimensionare a coloanei ACM și verificarea pierderilor de sarcină

Pentru coloana de apă caldă care alimentează cele două băi de la etaj (lavoare + cadă/duș, obiecte care consumă apă caldă), echivalentul de debit aferent se estimează la ΣE_ACM ≈ 2,20 (lavoare 2×0,30 + cadă 0,30 + duș 0,30 + majorare 0,60 pentru simultaneitate redusă), rezultând:

qc,ACM = 0,15 × √2,20 + 0,004 × 2,20 = 0,15 × 1,483 + 0,0088 = 0,222 + 0,009 = **0,23 l/s**

Se adoptă coloană ACM **PP-R/PEX De 20** (viteza v = qc/A = 0,23·10⁻³ / (π·0,020²/4) = 0,23·10⁻³ / 3,14·10⁻⁴ = **0,73 m/s** < 1,0 m/s admis pentru circuitele de ACM, unde viteza se limitează suplimentar față de apa rece pentru reducerea zgomotului și a solicitării termice a materialului la variații rapide de temperatură).

Pierderea de sarcină pe circuitul ACM (tur de la boiler la etaj + eventuala buclă de recirculare) se estimează cu relația Darcy-Weisbach h_f = λ·(L/D)·(v²/2g), cu λ ≈ 0,028 (regim turbulent, PP-R/PEX), L_echivalent ≈ 25 m (tur + coturi + robinete echivalente):

h_f = 0,028 × (25 / 0,020) × (0,73² / (2 × 9,81)) = 0,028 × 1.250 × 0,0272 = **0,95 mCA**

Valoare redusă, care confirmă că, la scara unei locuințe unifamiliale, presiunea disponibilă din rețea (sau din grupul de pompare de la cap. 2.5) acoperă cu marjă amplă și circuitul de apă caldă, fără a fi necesară o pompă de circulație dedicată de mare capacitate — pompa de recirculare ACM (dacă se adoptă, cap. 2.4) este dimensionată strict pentru debitul mic de recirculare (≈ 0,05…0,10 l/s) și H ≈ 1…2 mCA, cu comandă pe temporizator sau pe termostat de retur.

### 2.7 Detalii privind tratarea apei în varianta cu sursă proprie

Acolo unde alimentarea se face din puț propriu (varianta B, cap. 2.1), lanțul de tratare a apei se dimensionează în următoarea succesiune, pe traseul dintre hidrofor și distribuția interioară:

1. **Filtru mecanic (sediment) 50 μm**, cu cartuș spălabil/înlocuibil, pentru reținerea particulelor în suspensie (nisip fin, precipitate de fier/mangan) — protejează echipamentele din aval;
2. **Filtru cu cărbune activ granular**, pentru îmbunătățirea gustului/mirosului și reducerea eventualelor urme de compuși organici;
3. **Dedurizator cu schimb ionic** (regenerare cu sare), dimensionat funcție de duritatea totală a apei (determinată prin buletinul de analiză) — protejează boilerul, pompa de căldură și mașinile de spălat împotriva depunerilor de calcar, care ar reduce randamentul termic și ar scurta durata de viață a echipamentelor;
4. **Stație de dezinfecție UV** (opțională, recomandată dacă buletinul de analiză indică prezența bacteriologică sau dacă puțul este expus riscului de infiltrații de suprafață) — dezinfecție fără reziduu chimic, cu lampă UV-C dimensionată la debitul de calcul al instalației (0,50 l/s).

Fiecare treaptă de tratare este prevăzută cu **manometre de Δp** (indicarea colmatării filtrelor) și cu **by-pass** pentru posibilitatea izolării unei trepte în caz de service, fără întreruperea totală a alimentării cu apă a locuinței. Se recomandă repetarea buletinului de analiză a potabilității la un interval de maximum 12 luni, precum și după orice intervenție majoră asupra forajului sau a instalației de tratare.

### 2.8 Materiale, izolații și protecții sanitare

- **Conducte apă rece/caldă**: PP-R sau PEX pentru distribuția interioară; PEHD pentru branșament/racord la puț;
- **Izolație termică**: manșoane elastomerice pe toate coloanele și distribuția de ACM (grosime minimă 13…19 mm conform I13/I9, funcție de diametru), pentru limitarea pierderilor termice și a fenomenului de condens pe apa rece;
- **Protecție antiretur (SR EN 1717)**: dispozitiv antiretur (clapetă/supapă) la branșamentul public (protejarea rețelei publice) și la racordul de adaos al instalației de încălzire (separarea circuitului închis de apă potabilă);
- **Robinete de izolare** pe fiecare coloană și pe fiecare obiect sanitar, pentru sectorizarea intervențiilor fără oprirea întregii case;
- **Sifoane** cu gardă hidraulică ≥ 50 mm la toate obiectele; sifon de pardoseală în băi, spălătorie și garaj.

---

## 3. Canalizare menajeră (I9, SR EN 12056)

### 3.1 Sistemul de canalizare

Canalizarea interioară este de tip **separativ** (menajeră separată de pluvială), gravitațională. Coloana verticală de canalizare colectează apele uzate de la grupurile sanitare de la etaj (baie principală + baie secundară) și se continuă la parter, unde se racordează la colectorul orizontal care preia și scurgerile de la GS service, bucătărie, spălătorie, evacuând gravitațional prin racordul de canalizare la limita de proprietate.

### 3.2 Determinarea debitului de calcul

Conform SR EN 12056-2, debitul apelor uzate se calculează cu:

**Q_ww = K · √(ΣDU)** (l/s)

unde K = 0,5 (coeficient de frecvență pentru clădiri cu utilizare intermitentă — locuință unifamilială) și DU = unitatea de descărcare pe obiect:

| Obiect | Buc. | DU unitar (l/s) | ΣDU |
|---|---|---|---|
| Vas WC (rezervor 6 l) | 3 | 2,0 | 6,0 |
| Lavoar | 3 | 0,5 | 1,5 |
| Cadă de baie | 1 | 0,8 | 0,8 |
| Cabină de duș | 1 | 0,6 | 0,6 |
| Chiuvetă bucătărie | 1 | 0,8 | 0,8 |
| Mașină de spălat rufe | 1 | 0,8 | 0,8 |
| Mașină de spălat vase | 1 | 0,8 | 0,8 |
| Robinet de serviciu/sifon pardoseală spălătorie | 1 | 0,8 | 0,8 |
| **TOTAL** | **12** | — | **≈ 12,1** |

Q_ww = 0,5 × √12,1 = 0,5 × 3,48 = **1,74 l/s**

Se adoptă acoperitor pentru dimensionare **Q_tot ≈ 1,8 l/s** (marjă pentru descărcări simultane la vârf — de exemplu, mașina de spălat rufe și cea de spălat vase pompând simultan pe fondul de fund).

### 3.3 Dimensionarea conductelor

- **Coloana verticală de canalizare** (deservind grupurile sanitare ale etajului): **PP fonoabsorbant, Dn 110**, cu **aerisire** (prelungire peste acoperiș sau valvă de aerisire admisă la case joase conform I9, unde nu este posibilă prelungirea peste învelitoare) pentru menținerea gărzii hidraulice a sifoanelor;
- **Racorduri individuale** de la obiecte la coloană: **Dn 50** (lavoare, duș), **Dn 75…110** (WC-uri, cadă);
- **Colector orizontal principal** (subsol tehnic/canal vizitabil sub pardoseala parterului): **Dn 110**, pantă **i = 2 %** (asigură viteza de autocurățire v ≥ 0,7 m/s la debitul de calcul);
- **Piese de curățire** (cot cu vizitare) la baza coloanei, la fiecare schimbare de direcție și la maximum 10…12 m pe colector, pentru posibilitatea de intervenție cu tija de desfundare.

**Verificarea coloanei Dn 110**: la un grad de umplere de 33 % (sistem cu ventilare primară, uz intermitent), capacitatea hidraulică a unei coloane Dn 110 este de ordinul 2,5…4,0 l/s, mult peste debitul propriu al coloanei (Q_coloană ≈ 0,5·√(ΣDU_etaj ≈ 3,4) = 0,5×1,84 = 0,92 l/s) → **conform, cu marjă amplă**.

### 3.4 Evacuarea — cele două variante posibile

**Varianta A — Racord la rețeaua publică de canalizare** (soluția implicită dacă rețeaua este disponibilă): racord **Dn 160** de la limita de proprietate la canalul public, prevăzut cu **cămin de racord** și, dacă cota canalului public o impune, **clapetă antiretur** (protecție împotriva refulării în caz de supraîncărcare a rețelei publice).

**Varianta B — Sursă proprie de epurare** (unde nu există rețea publică de canalizare), cu două soluții alternative:
- **Microstație de epurare biologică** (tip SBR — Sequencing Batch Reactor) dimensionată pentru **5…6 locuitori echivalenți (LE)**, cu efluent încadrat în limitele **NTPA 002** (sau NTPA 001 dacă se descarcă în emisar natural), infiltrare/descărcare controlată conform avizului de gospodărire a apelor;
- **Fosă septică vidanjabilă etanșă, 3 compartimente, ~3…4 mc**, cu vidanjare periodică, urmată de un câmp de infiltrare/dren dacă solul o permite (studiu geotehnic de permeabilitate).

În ambele situații din varianta B, amplasarea instalației de epurare proprii respectă cerințele **OMS 119/2014**: distanță **≥ 10 m** față de puțul propriu de alimentare cu apă (dacă există) și față de puțurile vecinilor, precum și distanțele minime față de limitele de proprietate și față de fundațiile clădirilor (conform reglementărilor locale de urbanism și igienă), pentru a preveni contaminarea sursei de apă potabilă subterane.

---

## 4. Canalizare pluvială — acoperiș și curte (calcul de debit)

### 4.1 Ipoteze de calcul

Suprafața de colectare pluvială (proiecția orizontală a acoperișului): **A ≈ 110 mp**. Se adoptă:
- **Intensitatea ploii de calcul**: i = 150 l/s·ha (echivalent 0,015 l/s·mp), corespunzătoare unei ploi de calcul uzuale pentru clădiri de locuit (frecvență 1/1 an, durată ~5…15 min), conform STAS 1846 și practicii curente pentru construcții mici;
- **Coeficientul de scurgere** ψ = 0,90 (învelitoare din țiglă ceramică/beton sau tablă, practic impermeabilă).

### 4.2 Debitul de calcul

**Q_pluvial = ψ · i · A = 0,90 × 0,015 l/s·mp × 110 mp = 1,49 l/s ≈ 1,5 l/s**

### 4.3 Dimensionarea jgheaburilor și burlanelor

- **Jgheaburi semicirculare Dn 125** montate pe toată lungimea streșinii, cu pantă ≥ 0,3…0,5 % spre burlane (capacitate hidraulică a unui jgheab Dn 125 la panta adoptată: cca. 2,0…3,0 l/s — acoperă amplu debitul de 1,5 l/s, cu marjă pentru frunze/înfundări parțiale);
- **2…3 burlane Dn 90…100** (PVC sau tablă zincată/cupru, funcție de finisajul arhitectural), repartizate pe cele 2 versante ale acoperișului, fiecare preluând Q ≈ 0,5…0,75 l/s (sub capacitatea unui burlan Dn 100, care este de ordinul 3…4 l/s);
- **Piese de colectare (cotitor + sorb parafrunze)** la fiecare burlan, pentru reducerea colmatării cu frunze/depuneri.

### 4.4 Colectarea, retenția și infiltrarea pe lot

Apele pluviale colectate de la burlane se conduc, prin conducte PVC Dn 110 pozate cu pantă minimă 1 %, către unul din următoarele sisteme (soluție recomandată, aliniată principiilor de gestiune sustenabilă a apelor pluviale — SUDS):

- **Rezervor de acumulare pluvială de 2.000…3.000 litri** (îngropat sau suprateran, în zona grădinii), din care apa se poate refolosi pentru **udatul grădinii/spălarea curții** prin pompă submersibilă mică — reduce consumul de apă potabilă pentru irigare și diminuează volumul evacuat pe lot;
- **Preaplinul rezervorului** se conduce către un **puț absorbant** (drenaj în stratul filtrant al solului, dacă permeabilitatea terenului o permite, conform studiului geotehnic) sau către o **rigolă de suprafață** amenajată pe lot, astfel încât apa să nu fie direcționată spre proprietățile vecine sau spre domeniul public fără acordul autorității administratoare a rețelei pluviale.

Sistemul de canalizare pluvială rămâne **strict separat** de canalizarea menajeră, atât la nivelul conductelor interioare cât și la nivelul evacuării — amestecarea celor două rețele este interzisă (I9, cerință de principiu a sistemelor separative) atât din motive hidraulice (subdimensionarea rețelei publice unitare) cât și din motive de igienă (contaminarea apei pluviale refolosite pentru irigare).

### 4.5 Breviar de dimensionare a rezervorului de retenție și verificarea descărcării controlate

Dacă avizul de racordare la rețeaua publică de canalizare pluvială (sau la emisarul de suprafață) impune o **limitare a debitului evacuat de pe amplasament** — cerință tot mai frecventă în reglementările locale de urbanism, pentru a nu suprasolicita rețeaua publică unitară/pluvială — soluția rezervorului de acumulare descrisă la 4.4 poate fi dimensionată explicit pentru laminarea debitului de vârf.

Ipoteze de calcul: debit generat la ploaia de calcul Q_pluvial = 1,5 l/s (cap. 4.2), debit maxim admis la descărcare (impus prin regulator de debit tip vortex sau orificiu calibrat) **Q_admis = 0,3 l/s** (valoare orientativă, uzuală pentru loturi rezidențiale mici), durată caracteristică a ploii de calcul t ≈ 15 minute:

**V_ret = (Q_pluvial − Q_admis) × t = (1,5 − 0,3) l/s × 15 × 60 s = 1,2 × 900 = 1.080 litri ≈ 1,1 mc**

Volumul de retenție rezultat (≈ 1,1 mc) este acoperit cu marjă amplă de rezervorul de 2.000…3.000 litri adoptat la 4.4 (dimensionat în primul rând pentru rezerva de apă de udare, nu doar pentru laminare), care asigură concomitent și funcția de atenuare a debitului de vârf. Regulatorul de debit (orificiu calibrat/vortex) se montează pe conducta de preaplin/evacuare a rezervorului, calibrat pentru a nu depăși Q_admis chiar și la umplerea completă a rezervorului. Timpul de golire lentă a volumului acumulat, după încetarea ploii: t_golire = V_ret / Q_admis = 1.080 / 0,3 = 3.600 s = **1 oră**, interval rezonabil care nu afectează funcționarea normală a lotului între evenimente pluviale succesive.

---

## 5. Instalații termice — necesar, sursă și distribuție (I13, SR EN 12831)

### 5.1 Caracteristicile termotehnice ale anvelopei (standard nZEB)

Anvelopa clădirii este proiectată la nivel de performanță **nZEB**, cu următorii coeficienți de transfer termic (conform C107 și cerințelor Mc001/HG 1-2023 pentru clădiri noi):

| Element de anvelopă | Coeficient U (W/mp·K) |
|---|---|
| Perete exterior (zidărie + termosistem 15…20 cm) | 0,20…0,25 |
| Acoperiș/pod (termoizolație 25…30 cm) | 0,13…0,17 |
| Placă pe sol (termoizolație perimetrală + sub placă) | 0,22…0,28 |
| Tâmplărie exterioară (triplu vitraj Low-E, argon, tâmplărie PVC/lemn 6 camere) | 0,90…1,10 |
| Factor solar tâmplărie (g) | 0,45…0,55 (fără supraîncălzire estivală relevantă la locuință mică) |
| Etanșeitate la aer (test Blower Door, n₅₀) | ≤ 1,5 h⁻¹ (cerință nZEB) |

### 5.2 Necesarul de căldură pentru încălzire — breviar pe zone

Necesarul de căldură se determină conform SR EN 12831, ca sumă a pierderilor prin transmisie și prin ventilare, aplicat pe zonele funcționale ale locuinței, la Δθ = θ_int − θ_ext = 22 − (−18) = **40 K** (camere de zi/dormitoare; băile se calculează la Δθ = 42 K, θ_int = 24 °C):

| Zonă/încăpere | Suprafață (mp) | Necesar specific (W/mp) | Φ (W) |
|---|---|---|---|
| Living + bucătărie (parter, fațadă vitrată extinsă) | 45 | 58 | 2.610 |
| Hol + GS parter | 12 | 45 | 540 |
| Dormitor matrimonial (etaj) | 18 | 50 | 900 |
| Dormitor copil 1 (etaj) | 14 | 50 | 700 |
| Dormitor copil 2 (etaj) | 13 | 50 | 650 |
| Baie principală (etaj) | 7 | 75 (Δθ 42K + ventilare) | 525 |
| Baie etaj/secundară | 6 | 75 | 450 |
| Hol etaj + casa scării | 15 | 40 | 600 |
| Spălătorie/depozitare parter | 10 | 45 | 450 |
| Garaj (dacă se încălzește parțial/antiîngheț) | 10 | 25 | 250 |
| **Subtotal transmisie + ventilare pe încăperi** | **150** | — | **≈ 7.675 W** |

La acest necesar brut se adaugă:
- **Rezerva de reîncălzire după regim redus** (funcționare pe timpul nopții cu temperatură redusă, majorare 5…8 %): ≈ 500 W;
- **Aportul pentru preparare ACM concurentă în perioadele de vârf** (dacă sursa termică servește simultan încălzirea și ACM, se dimensionează cu o rezervă suplimentară): ≈ 900 W.

**Necesar total instalat: Φ_înc ≈ 7.675 + 500 + 900 ≈ 9.075 W ≈ 9,1 kW**

Indicele specific rezultat: **9.100 / 150 = 60,7 ≈ 61 W/mp**, valoare tipică pentru o locuință nouă cu anvelopă nZEB (comparativ cu 90…120 W/mp la o locuință neizolată/anvelopă din anii '90).

### 5.3 Sursa termică adoptată

Se adoptă ca sursă principală o **pompă de căldură aer-apă, cu putere nominală 10…12 kW** (dimensionată cu marjă de ~15…30 % peste necesarul de 9,1 kW, pentru acoperirea vârfurilor de ACM concomitente cu încălzirea și pentru menținerea unui COP favorabil la sarcină parțială):

| Parametru | Valoare |
|---|---|
| Putere nominală (A7/W35) | 10…12 kW |
| Regim de distribuție (tur/retur) | **35/30 °C** (temperatură joasă, specifică pardoselii radiante) |
| COP nominal (A7/W35, conform EN 14511) | **~4,0** |
| SCOP sezonier (climat continental, conform Regulamentului UE 813/2013) | **~3,3…3,6** |
| Regim de funcționare | Reversibil (opțional răcire pasivă/activă vara prin aceleași bucle de pardoseală, la temperatură controlată peste punctul de rouă) |

**Sursă de rezervă/completare (back-up)**: pentru zilele cu temperaturi foarte scăzute (< −15…−18 °C), când randamentul pompei de căldură scade, se prevede **rezistență electrică de completare** integrată în pufferul de acumulare (regim bivalent), **SAU**, dacă există racord de gaze naturale în zonă, o **centrală termică în condensație de 24 kW** ca sursă alternativă/de rezervă (vezi și cap. 10). Alegerea între cele două variante de back-up se face funcție de disponibilitatea rețelei de gaze și de bilanțul nZEB (varianta 100 % electrică — pompă de căldură + rezistență — este preferabilă pentru încadrarea optimă în nZEB, deoarece elimină complet arderea locală).

**Justificarea alegerii pompei de căldură** ca sursă principală: la un necesar anual de încălzire estimat de ~12…14 MWh_termic (rezultat din grade-zile ≈ 3.200 °C·zi și necesarul specific de 61 W/mp), consumul electric al pompei de căldură la SCOP 3,4 este de **~3,5…4,1 MWh_electric/an**, semnificativ mai mic decât o sursă electrică directă (rezistență, SCOP=1) și fără emisii locale de ardere, comparativ cu o centrală pe gaz (η ≈ 1,05…1,08, dar cu ardere locală și emisii de CO₂ asociate consumului de gaz).

### 5.4 Distribuția termică și corpurile terminale

Distribuția se realizează diferențiat pe cele două niveluri, potrivit destinației și inerției termice dorite:

- **Parter (living, bucătărie, hol, GS)**: **încălzire în pardoseală radiantă** — conductă PEX/PE-RT **16×2 mm**, pas de pozare **10…15 cm** (mai des la fațade/colțuri, mai rar în zona centrală), temperatură de pardoseală limitată la **≤ 29 °C** în zonele de ședere continuă (confort termic, conform SR EN 1264) și **≤ 33 °C** în băi;
- **Etaj (dormitoare)**: **radiatoare din oțel/aluminiu cu robinete termostatice**, pentru reglaj individual rapid pe fiecare cameră și posibilitatea de închidere/reducere independentă în camerele neocupate;
- **Băi (parter și etaj)**: pardoseală radiantă + eventual **radiator portprosop** (element de finisaj, cu robinet cu 4 căi pentru funcționare vara pe circuit separat, alimentat electric în extrasezon).

Echipamente auxiliare ale circuitului de distribuție:
- **Puffer/vas tampon de acumulare, 100…200 litri** — decuplaj hidraulic între pompa de căldură (funcționare optimă la ciclare redusă) și consumul variabil al buclelor de distribuție;
- **Grup de amestec pe 3 căi** (pentru bucla de pardoseală radiantă, limitare temperatură tur la 35 °C) + **pompă de circulație cu turație variabilă (clasă EEI ≤ 0,20, conform Regulamentului ErP)**;
- **Robinete de echilibrare hidraulică** pe fiecare buclă de pardoseală radiantă (colector cu debitmetre) și pe circuitul radiatoarelor — asigură repartizarea corectă a debitului pe fiecare zonă, condiție esențială pentru atingerea confortului termic proiectat;
- **Reglaj climatic** (sondă de temperatură exterioară + curbă de încălzire) cuplat cu **termostate de cameră** (cel puțin unul pe zonă/etaj), pentru optimizarea funcționării pompei de căldură și evitarea supraîncălzirii.

### 5.5 Vasul de expansiune — breviar de dimensionare

Volumul total de agent termic din instalație (sursă + puffer + distribuție pardoseală radiantă + radiatoare) se estimează la **V_inst ≈ 150 litri**. Vasul de expansiune cu membrană se dimensionează pentru dilatarea apei la încălzirea de la temperatura de umplere (10 °C) la temperatura maximă de regim (45 °C, cu marjă de siguranță peste regimul curent de 35 °C), cu coeficient de dilatare e ≈ 0,0088 la 45 °C:

ΔV = V_inst × e = 150 × 0,0088 = **1,32 litri**

Volumul nominal al vasului, ținând cont de presiunea de preîncărcare (~1,0 bar) și presiunea maximă admisă (supapa de siguranță reglată la 3 bar pentru instalații de locuință):

V_vas = ΔV / [(p_max − p_pre)/(p_max + 1)] = 1,32 / [(3−1)/(3+1)] = 1,32 / 0,50 = **~2,6 litri** (teoretic)

Ținând cont de marja de siguranță normală (evitarea deschiderii frecvente a supapei de siguranță și acoperirea eventualelor extinderi ale instalației — radiator suplimentar, buclă suplimentară), se adoptă practic un **vas de expansiune de 12…18 litri**, valoare uzuală de catalog pentru instalații de locuință de această mărime, care oferă o marjă confortabilă de peste 5× necesarul teoretic minim calculat.

### 5.6 Breviar hidraulic al buclelor de pardoseală radiantă și dimensionarea radiatoarelor

**Pardoseala radiantă (parter):** la o densitate de flux termic mediu de proiectare de **≈ 60 W/mp** (compatibil cu necesarul specific de 58 W/mp calculat la living, cap. 5.2) și o suprafață utilă radiantă la parter de ~75 mp (living + bucătărie + hol + GS), sarcina termică acoperită prin pardoseală este:

Φ_pardoseală = 60 W/mp × 75 mp = **4.500 W ≈ 4,5 kW**

Numărul de bucle se determină din lungimea maximă admisă pe o buclă de PEX 16×2 mm (≈ 100…120 m, pentru a menține pierderea de sarcină și dezechilibrul termic în limite acceptabile) și din suprafața deservită de o buclă (la pas de pozare 15 cm, o buclă de 100 m deservește ≈ 15 mp): rezultă necesarul de **~5 bucle** pentru cei 75 mp de la parter, fiecare cu debit unitar:

q_buclă = Φ_buclă / (c · Δt) = (4.500/5) / (4,186 × 5) = 900 / 20,93 = **43 kg/h ≈ 0,012 l/s** (Δt = 5 K pe buclă, regim tur/retur 35/30 °C)

Pierderea de sarcină pe o buclă de 100 m (PEX 16×2 mm, viteză v ≈ 0,3…0,4 m/s) este de ordinul **150…200 mbar (1,5…2,0 mCA)**, valoare tipică pentru bucle de pardoseală radiantă bine dimensionate, acoperită de **pompa de circulație cu turație variabilă** a grupului de amestec (cap. 5.4), aleasă pentru un debit total Q_total = 5 × 0,012 = 0,06 l/s ≈ 216 l/h și înălțime de pompare H ≈ 2,5…3,0 mCA (cu marjă pentru robinetele de echilibrare de pe colector).

**Radiatoare (etaj):** pentru dormitoare, necesarul termic calculat la cap. 5.2 (900 + 700 + 650 = 2.250 W pentru cele 3 dormitoare) se acoperă cu radiatoare din oțel/aluminiu, dimensionate la regimul de temperatură redus (tur/retur 45/40 °C pe circuitul de radiatoare, majorat față de bucla de pardoseală pentru a compensa suprafața de schimb mai mică a corpului static față de pardoseală):

| Cameră | Necesar (W) | Randament corp la 45/40°C (raportat la ΔT nominal 50K) | Nr. elemente orientativ (75 W/element) |
|---|---|---|---|
| Dormitor matrimonial | 900 | ~0,80 | ~15 elemente (sau 2 corpuri de 7…8 el.) |
| Dormitor copil 1 | 700 | ~0,80 | ~12 elemente |
| Dormitor copil 2 | 650 | ~0,80 | ~11 elemente |

Fiecare radiator este echipat cu **robinet termostatic cu cap sensibil** (reglaj individual 6…28 °C) și robinet de reglaj/golire pe retur, iar echilibrarea hidraulică a circuitului de radiatoare se realizează prin presetarea robinetelor termostatice (valoare Kv) conform breviarului de calcul al debitelor pe fiecare corp, evitând supraalimentarea radiatoarelor apropiate de sursă în detrimentul celor mai îndepărtate.

---

## 6. Ventilare — VMC dublu flux cu recuperare de căldură (I5)

### 6.1 Necesarul de aer proaspăt

Necesarul de ventilare igienică pentru o locuință se determină prin metoda schimburilor de aer (I5), aplicată volumului interior încălzit:

V_interior = Su × H = 150 mp × 2,70 m = **405 mc**

La un necesar de **n = 0,5 schimburi/oră** (valoare de referință pentru locuințe cu etanșeitate la aer nZEB, unde infiltrațiile necontrolate sunt minime și ventilarea trebuie asigurată integral mecanic pentru calitatea aerului interior):

**Q_aer = n × V = 0,5 × 405 = 202,5 mc/h**

Se adoptă acoperitor un debit de proiectare **Q_VMC = 200…250 mc/h**, verificat și prin metoda per-încăpere (debite minime de introducere în camerele de zi/dormitoare și de extracție în bucătărie/băi, conform I5), care conduce la valori similare pentru o locuință de această configurație (3 dormitoare + living + 2 băi + bucătărie).

### 6.2 Soluția adoptată — VMC dublu flux cu recuperare de căldură

Pentru încadrarea nZEB, ventilarea naturală prin rosturi (specifică locuințelor vechi) este înlocuită integral cu un sistem de **ventilare mecanică controlată (VMC) dublu flux**, cu următoarele caracteristici:

| Componentă | Caracteristică |
|---|---|
| Debit nominal | 200…250 mc/h |
| Recuperator de căldură | **contracurent (plăci), randament η ≥ 85 %** |
| Filtrare aer introdus | **F7 (ePM1)** — reține polenul și particulele fine |
| Filtrare aer evacuat | G4 (prefiltru, protecție recuperator) |
| Bypass de vară (free-cooling) | Automat, la temperatura exterioară favorabilă |
| Protecție antiîngheț recuperator | Rezistență electrică mică sau bypass parțial |
| Distribuție | Introducere: living, dormitoare; Extracție: băi, bucătărie, GS |

**Puterea recuperată prin recuperatorul de căldură** (aer evacuat 20 °C → aer proaspăt de la −18 °C, Δt = 38 K):

Fără recuperare, încălzirea aerului proaspăt ar necesita: Φ = 0,34 × Q[mc/h] × Δt = 0,34 × 202,5 × 38 = **2.616 W**

Cu recuperator η = 85 %: **Φ_recuperat = 0,85 × 2.616 = 2.224 W ≈ 2,22 kW**

Sarcina termică reziduală rămasă pe seama sursei de încălzire pentru tratarea aerului proaspăt este de doar **≈ 0,39 kW** (2.616 − 2.224), demonstrând contribuția esențială a recuperării de căldură la reducerea necesarului total de energie (această sarcină reziduală este deja inclusă în necesarul termic global de la cap. 5, prin componenta de ventilare a calculului SR EN 12831).

### 6.3 Ventilarea locală suplimentară

- **Hotă de bucătărie**: evacuare proprie, independentă de VMC, debit **300…600 mc/h** (turație variabilă, funcție de intensitatea gătitului), refulare directă la exterior printr-un traseu scurt cu clapetă antiretur — **nu se conectează la sistemul de VMC** (evitarea contaminării cu mirosuri/grăsimi a recuperatorului);
- **Băi fără fereastră** (dacă e cazul, GS parter): extracție suplimentară punctuală **30…90 mc/h**, temporizată/comandată de întrerupătorul de lumină sau de senzor de umiditate, ca supliment local la debitul continuu al VMC.
- **Vara**, bypass-ul recuperatorului (funcție free-cooling) permite introducerea aerului exterior răcit nocturn fără trecere prin schimbătorul de căldură, reducând necesarul de răcire activă.

### 6.4 Breviar de dimensionare a tubulaturii și verificarea nivelului de zgomot

Debitul total de proiectare (Q_VMC = 225 mc/h, valoare medie a intervalului 200…250 mc/h adoptat la 6.1) se repartizează pe traseele de introducere (living, dormitoare) și extracție (bucătărie, băi, GS), cu secțiunea canalului determinată din viteza admisă:

**A_canal = Q / (3600 · v)** [mp]

Pentru magistrala principală (Q = 225 mc/h, v = 3,5 m/s — viteză redusă, specifică instalațiilor rezidențiale pentru confort acustic): A = 225 / (3.600 × 3,5) = 0,0179 mp → canal circular semirigid **Ø 160 mm** (secțiune 0,0201 mp, viteză efectivă ≈ 3,1 m/s). Pentru derivațiile către fiecare cameră (debit unitar orientativ 25…40 mc/h/cameră, v ≤ 2,5 m/s): A = 30 / (3.600 × 2,5) = 0,0033 mp → tub flexibil izolat **Ø 75…90 mm**.

Pierderea de sarcină pe traseul cel mai lung (≈ 20…25 m echivalent, incluzând recuperatorul, filtrele și grilele terminale) se estimează la **Δp ≈ 100…150 Pa**, valoare care determină presiunea statică necesară a ventilatoarelor unității VMC — acoperită confortabil de unitățile compacte rezidențiale uzuale (presiune disponibilă tipică 150…200 Pa la debitul nominal).

**Nivelul de zgomot**: unitatea VMC se amplasează, pe cât posibil, într-un spațiu tehnic (pod, debara) izolat fonic de camerele de odihnă, cu **atenuatoare de zgomot (silențiatoare)** montate pe traseul principal, imediat după unitate și înainte de prima ramificație către dormitoare, pentru limitarea zgomotului transmis la gurile de introducere la **≤ 25…30 dB(A)** în dormitoare (confort de odihnă). Tubulatura flexibilă izolată fonic/termic (dublu perete cu vată minerală) reduce suplimentar transmisia zgomotului și previne condensul pe traseele care trec prin spații neîncălzite (pod).

---

## 7. Instalații electrice — curenți tari (I7)

### 7.1 Alimentarea cu energie electrică

Alimentarea se realizează prin **branșament trifazat (3F+N)**, soluție impusă de dotarea completă a unei locuințe nZEB (pompă de căldură, eventual plită cu inducție de putere mare, pregătire pentru încărcare vehicul electric și instalație fotovoltaică cu injecție echilibrată pe cele 3 faze). Echipamentul de la limita de proprietate cuprinde **bloc de măsură și protecție trifazat (BMPT)** cu **contor electronic bidirecțional** (obligatoriu pentru statutul de prosumator — vezi cap. 13), montat în firidă/nișă la limita de proprietate, conform normelor operatorului de distribuție local.

### 7.2 Bilanțul de puteri

Bilanțul se stabilește pe receptoare, cu puterea instalată (Pi) și coeficientul de utilizare/cerere (ku):

| Nr. | Receptor / grup | Pi (kW) | ku | Pc = Pi·ku (kW) |
|---|---|---|---|---|
| 1 | Iluminat interior + exterior (LED) | 1,0 | 0,90 | 0,90 |
| 2 | Prize de uz general (toate încăperile) | 4,5 | 0,40 | 1,80 |
| 3 | Bucătărie (plită inducție + cuptor electric) | 7,0 | 0,50 | 3,50 |
| 4 | Pompă de căldură aer-apă | 4,0 | 0,80 | 3,20 |
| 5 | Rezistență electrică backup boiler/puffer | 2,0 | 0,30 | 0,60 |
| 6 | VMC + pompe de circulație | 0,6 | 0,80 | 0,48 |
| 7 | Mașină de spălat rufe + mașină de spălat vase | 4,0 | 0,30 | 1,20 |
| 8 | Exterior/garaj + priză pregătită pentru încărcare vehicul electric (EV-ready) | 3,7 | 0,50 | 1,85 |
| — | **Total instalat Pi** | **26,8** | — | — |
| — | **Total cerut ΣPc** | — | — | **≈ 13,5** |

Aplicând un **coeficient de simultaneitate global ks ≈ 0,90** (specific locuințelor unifamiliale, unde receptoarele majore — plită, mașini de spălat, pompă de căldură — rareori funcționează toate simultan la vârf maxim):

**Pc,total = 0,90 × 13,5 ≈ 12,2 kW → adoptat 12,5 kW** (valoare de proiectare pentru dimensionarea coloanei interioare și a tabloului general)

**Puterea aprobată la branșament**, solicitată operatorului de distribuție (rotunjită la o treaptă tarifară uzuală și cu marjă pentru dezvoltări ulterioare — de exemplu creșterea puterii stației de încărcare EV): se adoptă **P aprobată ≈ 15 kW**, valoare situată în intervalul uzual **8…15 kW** pentru o locuință unifamilială complet electrificată (fără racord de gaze pentru gătit/încălzire), la limita superioară a intervalului tocmai datorită cumulului pompă de căldură + plită inducție + rezervă EV.

Curentul de calcul pe branșamentul trifazat, la cos φ = 0,92 (compensare naturală prin invertoarele moderne ale pompei de căldură și, ulterior, ale invertorului fotovoltaic):

**Ic = Pc / (√3 · U · cos φ) = 12.500 / (1,732 × 400 × 0,92) = 12.500 / 637,2 = 19,6 A/fază**

### 7.3 Tabloul electric general și schema de protecții

- **Tablou electric general, 3P+N**, echipat cu **întrerupător general automat (disjunctor) 40 A** (marjă peste 19,6 A calculat, pentru acoperirea vârfurilor de pornire ale receptoarelor inductive — pompă de căldură, compresor);
- **Dispozitive diferențiale (RCD) 30 mA** pe toate circuitele de prize și pe circuitele din băi (obligatoriu conform I7 și SR EN 60364-7-701), repartizate pe minimum 2 circuite diferențiale distincte (pentru a nu întrerupe întreaga casă la un singur defect);
- **RCD 300 mA (selectiv)** pe circuitul general, dacă schema de protecție o impune, pentru selectivitate față de RCD-urile de 30 mA din aval;
- **Descărcător de supratensiuni (SPD) tip 2** la tabloul general — protecție a echipamentelor electronice sensibile (pompă de căldură, VMC, invertor fotovoltaic, electrocasnice) împotriva supratensiunilor tranzitorii de comutație sau induse;
- **Contorizare/monitorizare de energie** (opțional, dar recomandat pentru o casă nZEB) pe circuitele majore (pompă de căldură, fotovoltaic) — integrare cu sistemul smart home (cap. 12).

### 7.4 Circuite, secțiuni și protecții tipizate

| Circuit | Secțiune (Cu) | Protecție | RCD |
|---|---|---|---|
| Iluminat general | 3×1,5 mm² | MCB B/C10 | 30 mA (comun) |
| Prize monofazate uz general (16 A) | 3×2,5 mm² | MCB C16 | 30 mA |
| Circuit bucătărie (plită inducție, trifazat) | 5×6 mm² | MCB C32 (trifazat) | 30 mA |
| Circuit cuptor electric | 3×2,5 mm² | MCB C16 | 30 mA |
| Pompă de căldură (trifazat, dedicat) | 5×4 mm² | MCB C20 (trifazat) | 30 mA |
| Boiler/rezistență electrică (dedicat) | 3×2,5 mm² | MCB C16 | 30 mA |
| VMC (dedicat) | 3×1,5 mm² | MCB C10 | 30 mA |
| Mașină spălat rufe / mașină spălat vase | 3×2,5 mm² (fiecare) | MCB C16 | 30 mA |
| Circuite exterior (IP44/IP65) | 3×2,5 mm² | MCB C16 | 30 mA |
| Priză EV-ready (trifazat, rezervă) | 5×6 mm² | MCB C32 (trifazat) | 30 mA (tip A/B funcție de încărcător) |
| Circuit fotovoltaic (invertor, bidirecțional) | conform proiect FV | MCB dedicat AC + SPD | — |

Cablurile utilizate sunt din cupru, tip **N2XH sau H07V-U/H07V-R** în tub de protecție, pozate îngropat în pereți/planșee sau în pardoseală în tub riflat, cu respectarea distanțelor față de conductele de apă/încălzire și de traseele curenților slabi (minimum 10…30 cm, funcție de tipul de pozare, conform I7 și I18).

### 7.5 Verificarea căderii de tensiune pe coloana de branșament

Pentru coloana interioară de la BMPT la tabloul electric general (lungime orientativă L ≈ 15 m, cablu 4×10 mm² Cu, la I = 19,6 A):

Δu ≈ √3 · I · L · ρ / S = 1,732 × 19,6 × 15 × 0,0175 / 10 = 1,732 × 19,6 × 15 × 0,00175 = **0,89 V**

ε = 0,89 / 400 = **0,22 %**, mult sub limita admisă de I7 (3 % pe coloana principală, 5 % total tablou→receptor cel mai defavorabil) → **conform**, cu marjă amplă pentru extinderea traseelor către receptoarele cele mai îndepărtate (exterior/garaj).

### 7.6 Verificarea curentului de scurtcircuit și alegerea aparatajului de protecție

Curentul de scurtcircuit prezumat la bornele BMPT (branșament de joasă tensiune, alimentat dintr-un post de transformare de zonă tipic, cu impedanța rețelei publice în amonte) se estimează, pentru un branșament rezidențial trifazat de această putere, la o valoare orientativă **I_k ≈ 2…4 kA** la punctul de racord (funcție de distanța până la postul de transformare și de secțiunea rețelei publice de distribuție — valoarea exactă se obține din avizul de racordare al operatorului de distribuție).

Aparatajul de protecție de la tabloul general (întrerupător automat 40 A, cap. 7.3) se alege cu **capacitate de rupere I_cu ≥ 6 kA** (clasă uzuală pentru tablouri de locuință, conform I7), acoperitoare față de curentul de scurtcircuit estimat la acest nivel al instalației. Selectivitatea între întrerupătorul general și disjunctoarele de circuit (curent nominal 10…32 A, cap. 7.4) se asigură prin alegerea unor curbe de declanșare (B/C) și curenți nominali în progresie, astfel încât un defect pe un circuit terminal (de exemplu priza dintr-un dormitor) să declanșeze doar disjunctorul de circuit respectiv, nu întrerupătorul general — condiție de continuitate a alimentării pentru restul locuinței (în special pentru receptoarele critice precum pompa de căldură și congelatorul/frigiderul).

**Verificarea protecției liniei dedicate a pompei de căldură** (circuit trifazat, cablu 5×4 mm² Cu, MCB C20, cap. 7.4): curentul nominal al pompei de căldură (P ≈ 4 kW, cos φ ≈ 0,85) este I_n = 4.000 / (1,732 × 400 × 0,85) = **6,8 A/fază**, mult sub curentul nominal al protecției (20 A) — marjă justificată de curentul de pornire ridicat al compresorului (curent de pornire de 3…5× curentul nominal la compresoarele fără variator, redus semnificativ la echipamentele moderne cu compresor invertor, unde pornirea este graduală).

---

## 8. Iluminat interior și exterior (NP 061)

### 8.1 Niveluri de iluminare de calcul

| Spațiu | E_m (lx) | Observații |
|---|---|---|
| Living/zonă de zi | 200 | Completat cu iluminat de accent |
| Bucătărie (zona de lucru) | 300…500 | UGR < 22, Ra ≥ 80 |
| Birou/spațiu de studiu | 500 | Sarcină vizuală fină |
| Dormitoare | 100…200 | Temperatură de culoare caldă (2.700 K), cu variator de intensitate |
| Băi | 200 (300 la oglindă) | IP44 în zonele 1-2 conform SR EN 60364-7-701 |
| Hol, casa scării | 100 | Cu senzor de prezență |
| Exterior (alei, intrare, curte) | 20…50 | IP65, cu senzor de crepuscul/mișcare |
| Garaj | 150 | — |

### 8.2 Soluția de iluminat și puterea instalată

Se adoptă iluminat integral cu corpuri **LED de eficacitate ridicată (≥ 100 lm/W, Ra ≥ 80)**, cu o putere specifică medie estimată de **~6 W/mp** (valoare tipică pentru locuințe cu LED performant și control adecvat):

P_iluminat = 150 mp × 6 W/mp = **900 W ≈ 0,90 kW** (concordă cu poziția „iluminat" din bilanțul electric, cap. 7.2)

### 8.3 Controlul iluminatului

- **Senzori de prezență/mișcare** pe hol, casa scării și accesul exterior — economie de energie și confort (fără căutarea întrerupătorului);
- **Senzor de crepuscul** pentru iluminatul exterior (pornire automată la lăsarea întunericului);
- **Variatoare de intensitate (dimmere)** în dormitoare și living, pentru reglaj de confort și eficiență;
- Posibilitate de integrare în sistemul **smart home** (cap. 12) pentru scenarii de iluminat (plecare/sosire, „modul vacanță" — simulare prezență).

---

## 9. Priză de pământ și evaluarea protecției la trăsnet (I20, SR EN 62305)

### 9.1 Priza de pământ

Se realizează o **priză de pământ de fundație** — electrod orizontal din **platbandă OL-Zn 40×4 mm**, montată în fundație pe conturul clădirii, completată, dacă rezistivitatea solului o impune, cu **electrozi verticali** (țăruși OL-Zn sau cupru, lungime 1,5…2,0 m), până la atingerea rezistenței de dispersie cerute:

**R_p ≤ 4 Ω** (valoare admisă de I7 pentru priza comună a instalațiilor electrice la locuințe, mai puțin restrictivă decât la clădirile publice cu echipamente IT sensibile, unde se cere R ≤ 1 Ω)

Se prevede o **bară de egalizare a potențialelor (BEP)** principală, amplasată în apropierea tabloului electric general, la care se conectează: conductorul de protecție PE al instalației electrice, armătura structurii (dacă accesibilă), conductele metalice (apă, dacă e cazul, gaze — prin flanșă izolantă la intrare), și, local, **echipotențializarea suplimentară din băi** (conform SR EN 60364-7-701): cadă/duș metalice, țevi metalice de apă/încălzire, eventuale elemente metalice accesibile din zonele 0, 1 și 2.

**Verificarea orientativă a rezistenței de dispersie**: pentru un contur de fundație de lungime L ≈ 45…50 m (perimetrul unei case de ~110 mp amprentă), în sol de rezistivitate medie ρ ≈ 100…150 Ω·m, rezistența de dispersie a electrodului orizontal se estimează la valori de ordinul **2…4 Ω**, în plaja admisă de I7 pentru priza comună a locuinței. Dacă măsurătoarea la recepție (metoda celor 3 puncte, 62 %) indică o valoare peste 4 Ω, se completează cu electrozi verticali suplimentari legați în paralel la priza de fundație, până la atingerea valorii admise.

### 9.2 Evaluarea necesității protecției la trăsnet (LPS)

Conform SR EN 62305-2 (evaluarea riscului), pentru o **locuință unifamilială P+1E, de dimensiuni reduse, amplasată în țesut urban/periurban obișnuit** (fără poziție dominantă, fără expunere pe deal/coamă izolată, fără densitate mare de echipamente electronice critice), riscul calculat **R1 (pierderi de vieți omenești)** se situează, în marea majoritate a cazurilor, **sub pragul de risc tolerabil**, motiv pentru care **instalația de paratrăsnet (LPS) nu este, de regulă, necesară**.

Se rețin totuși următoarele **excepții care impun reevaluarea** și, eventual, adoptarea unui sistem LPS:
- Amplasarea locuinței pe un **teren înalt/deal, izolat, fără construcții/vegetație înaltă în vecinătate** (expunere sporită la descărcări atmosferice);
- Zonă cu **densitate de descărcări la sol (Ng) ridicată** peste media națională, conform hărții de izoceraunism;
- Prezența unor instalații speciale sensibile (ex. server/automatizare centralizată extinsă, panouri fotovoltaice de suprafață mare cu structuri metalice proeminente) care ar justifica o analiză suplimentară de protecție la supratensiuni induse.

Indiferent de decizia privind LPS-ul dedicat, se prevede în orice caz **protecție la supratensiuni (SPD tip 2)** la tabloul electric general (cap. 7.3), care oferă o protecție de bază a echipamentelor electronice sensibile (pompă de căldură, VMC, invertor fotovoltaic, electrocasnice) împotriva supratensiunilor induse de descărcări atmosferice din vecinătate sau de comutații pe rețeaua de distribuție.

### 9.3 Breviar orientativ de calcul al frecvenței anuale de descărcări directe (SR EN 62305-2)

Metoda simplificată de evaluare a riscului R1 pornește de la determinarea **frecvenței anuale așteptate de descărcări directe pe structură (Nd)**:

**Nd = Ng · Ad · Cd · 10⁻⁶**

unde:
- **Ng** — densitatea de descărcări la sol (descărcări/km²/an), pentru zonele de câmpie/deal din nord-estul României valori orientative de **1,5…2,5 desc./km²/an** (conform hărții de izoceraunism naționale);
- **Ad** — aria de captare echivalentă a structurii, funcție de dimensiunile în plan și de înălțime (pentru o casă P+1E de ~11×10 m și H ≈ 7 m, Ad ≈ (L + 6H)(W + 6H) · 10⁻⁶ km² ≈ (11+42)(10+42)·10⁻⁶ ≈ 53×52·10⁻⁶ ≈ **2.756 m² ≈ 0,00276 km²**);
- **Cd** — coeficient de amplasament (Cd = 0,5 pentru structură înconjurată de obiecte mai înalte, Cd = 1 pentru amplasament izolat obișnuit, Cd = 2 pentru amplasament complet izolat/expus).

Pentru amplasamentul tipic (Cd = 1, izolare obișnuită în țesut rezidențial): Nd = 2,0 × 0,00276 × 1 = **0,0055 descărcări/an**, echivalent unei descărcări directe așteptate la fiecare **~180 de ani**. Comparat cu **frecvența admisibilă de descărcări acceptate fără protecție (Nc)**, care pentru o locuință obișnuită (fără risc special de incendiu/explozie, fără aglomerări de persoane) este, conform tabelelor SR EN 62305-2, de ordinul **Nc ≈ 0,02…0,05**, rezultă **Nd < Nc** → **riscul este sub pragul care ar impune un LPS dedicat**, confirmând concluzia calitativă de la 9.2. Reevaluarea devine necesară doar dacă amplasamentul real diferă semnificativ de ipotezele de mai sus (Cd = 2 la izolare completă pe deal, sau Ng local mult peste 2,5).

---

## 10. Instalație de utilizare a gazelor naturale (Ordinul ANRE 89/2018)

### 10.1 Aplicabilitate — variantă condiționată

Instalația de gaze naturale se proiectează **doar dacă în zona amplasamentului există rețea de distribuție a gazelor naturale disponibilă pentru racordare**. Soluția de referință a prezentului memoriu (cap. 5) este **100 % electrică (pompă de căldură + rezistență de completare)**, aliniată optim cerinței nZEB și fără emisii locale de ardere. Instalația de gaze descrisă mai jos reprezintă **varianta alternativă**, aplicabilă atunci când beneficiarul optează pentru o centrală termică în condensație ca sursă principală/de rezervă și/sau pentru plită de gătit pe gaz.

### 10.2 Branșamentul și postul de reglare

- **Branșament PE100, De 32 mm**, de la conducta de distribuție stradală până la firida de branșament, amplasată la limita de proprietate;
- **Regulator de presiune** care reduce presiunea din rețeaua de distribuție la **presiune joasă de utilizare, ~0,05 bar (50 mbar)**, conform NTPEE (Ordinul ANRE 89/2018);
- **Contor de gaz tip G4** (debit nominal 6 mc/h, debit maxim 10 mc/h), montat în **firidă ventilată**, accesibilă pentru citire/verificare, la limita de proprietate sau pe fațada clădirii, conform cerințelor operatorului de distribuție.

### 10.3 Coloana și instalația interioară de utilizare

Conducta de la contor la consumatori se realizează din **oțel (OL) sudat sau țeavă de cupru**, cu diametre **Dn 20…25 mm**, montată aparent sau îngropată protejată în tub, cu robinete de închidere la baza coloanei și înaintea fiecărui aparat consumator.

**Consumatorii de gaz și debitul de calcul** (varianta cu centrală pe gaz ca sursă principală/backup și plită pe gaz):

| Consumator | Putere (kW) | Debit (mc/h) |
|---|---|---|
| Centrală termică în condensație | 24 | 2,54 |
| Plită/aragaz | 8 | 0,85 |
| **TOTAL** | **32** | **3,39** |

Debitul se calculează cu relația Q = P / H_i, unde H_i ≈ 9,45 kWh/mc este puterea calorifică inferioară a gazului natural distribuit:

Q_centrală = 24 / 9,45 = **2,54 mc/h**; Q_plită = 8 / 9,45 = **0,85 mc/h**; **Q_total = 3,39 mc/h** (< 6 mc/h, capacitatea nominală a contorului G4 → **conform**).

### 10.4 Breviar de verificare a căderii de presiune pe conducta interioară

Pentru conducta interioară de la contor la centrala termică (traseu orientativ L ≈ 12 m, țeavă de cupru **Dn 22**, debit de calcul Q_centrală = 2,54 mc/h = 0,00071 mc/s), viteza de curgere a gazului este:

v = Q / A = 0,00071 / (π × 0,022²/4) = 0,00071 / 3,80·10⁻⁴ = **1,87 m/s** (sub limita uzuală de 3…6 m/s admisă pentru conducte interioare de gaz la presiune joasă, conform NTPEE)

Pierderea de presiune pe traseu (regim laminar/turbulent tranzitoriu, λ ≈ 0,03, densitate gaz natural ρ ≈ 0,73 kg/mc): Δp = λ · (L/D) · (ρ·v²/2) = 0,03 × (12/0,022) × (0,73×1,87²/2) = 0,03 × 545 × 1,278 = **20,9 Pa ≈ 0,21 mbar**, valoare mult sub pragul admis (căderea totală de presiune pe instalația interioară de utilizare, de la contor la cel mai îndepărtat aparat, trebuie să rămână sub **~1…2 mbar** la presiune joasă de 50 mbar, pentru a nu afecta funcționarea corectă a arzătoarelor) → **conform**, cu marjă amplă.

### 10.5 Ventilarea încăperii cu consumatori de gaze (art. 128/129, Ordinul ANRE 89/2018)

Pentru încăperea în care este amplasată centrala termică (dacă aceasta este de tip **cu cameră de ardere deschisă**), Ordinul ANRE 89/2018 impune un **volum minim al încăperii** și **orificii de ventilare naturală permanentă** (admisie aer de ardere + evacuare), dimensionate funcție de puterea instalată a aparatului consumator, conform art. 128 și 129 din normativ.

**Soluția adoptată — centrală cu cameră de ardere etanșă (tip C13/C33), cu evacuare coaxială**, care preia aerul de ardere direct din exterior și evacuează gazele arse tot spre exterior, printr-un coș/tubulatură coaxială concentrică. Această soluție **elimină necesitatea orificiilor de ventilare naturală dedicate arderii** (aparatul nu consumă aerul din încăpere), fiind soluția uzuală și recomandată pentru centralele murale de apartament/casă, cu avantaje de siguranță superioare față de centralele cu cameră de ardere deschisă.

Se păstrează totuși o **ventilare generală minimă a încăperii tehnice** (centrala termică, dacă e amplasată în spălătorie/debara), pentru evacuarea eventualelor pierderi minore de căldură și pentru accesul de service.

### 10.6 Măsuri de siguranță specifice instalației de gaze

- **Detector de gaz metan** montat în încăperea centralei/bucătărie (la partea superioară, gazul natural fiind mai ușor decât aerul), cuplat cu **electrovalvă de siguranță** pe conducta de alimentare, care închide automat alimentarea la detectarea unei concentrații anormale;
- **Coș de evacuare a gazelor arse omologat**, cu tiraj verificat prin proiect (pentru centrala etanșă, tubulatura coaxială dedicată, cu lungime maximă admisă conform cărții tehnice a producătorului);
- **Robinete de siguranță (electrovalve) și robineți manuali** la baza coloanei și înaintea fiecărui aparat;
- **Verificarea și autorizarea instalației** de către operatorul de distribuție/ANRE înainte de punerea în funcțiune, inclusiv **proba de presiune/etanșeitate** a conductei interioare (conform NTPEE) și obținerea acordului de furnizare.

---

## 11. Măsuri de apărare împotriva incendiilor (risc mic — locuință unifamilială)

### 11.1 Încadrare

Locuințele unifamiliale cu regim de înălțime redus (P+1E) se situează **sub aria de aplicabilitate a scenariului de securitate la incendiu obligatoriu (P118)**, care vizează construcțiile cu risc mediu/mare, aglomerări de persoane sau clădiri înalte. Nu se impun, prin urmare, hidranți interiori, sprinklere, desfumare mecanizată sau avertizare vocală. Se rețin totuși, ca bună practică și pentru siguranța ocupanților, următoarele **măsuri minime, proporționale cu riscul mic**:

### 11.2 Detectoare autonome de fum (SR EN 14604)

Se montează **detectoare autonome de fum, cu alimentare din baterie (durată ≥ 10 ani) sau alimentate 230 V cu backup baterie**, în următoarele poziții minime:
- Pe holul/casa scării de la etaj (zona dormitoarelor), obligatoriu;
- În fiecare dormitor (recomandat, protecție sporită);
- La parter, pe holul de acces/circulația principală.

Detectoarele se recomandă **interconectate** (radio sau prin fir), astfel încât alarma unui singur detector să declanșeze semnalizarea acustică în toată casa, asigurând avertizarea ocupanților indiferent de locul unde se declanșează incendiul.

### 11.3 Detector de monoxid de carbon (CO)

Se montează un **detector de CO** în apropierea centralei termice (dacă există) sau a oricărei surse de ardere (șemineu, sobă), precum și în garaj (dacă acesta este direct comunicant cu spațiul locuit), pentru protecția împotriva intoxicației cu monoxid de carbon — risc relevant la orice sursă de ardere sau la funcționarea unui vehicul în garajul închis.

### 11.4 Mijloace de primă intervenție

- **Stingător portabil cu pulbere, tip ABC, 6 kg**, amplasat la parter, în zona de acces/hol, ușor accesibil;
- **Pătură antiincendiu** în bucătărie, pentru intervenția rapidă în caz de incendiu la aragaz/friteuză;
- **Robinetul exterior de grădină** (cap. 2) poate servi, în caz de necesitate, ca sursă improvizată de apă pentru o primă intervenție minoră, cu furtun de grădină.

### 11.5 Măsuri constructive

- **Distanțe de siguranță** față de vecinătăți, conform reglementărilor de urbanism (P.U.G./Cod civil) și gradului de rezistență la foc II al construcției;
- Ușile de acces și evacuare se deschid în sensul de evacuare (spre exterior) acolo unde configurația o permite;
- Coșul de fum/evacuare (dacă există centrală pe gaz sau șemineu) respectă distanțele de siguranță față de elementele combustibile ale acoperișului, conform cărții tehnice a aparatului și normativelor în vigoare.

---

## 12. Curenți slabi (voce-date, TV, videointerfon, alarmă, smart home)

### 12.1 Rețea structurată de date și voce

- **Cablare structurată Cat.6/Cat.6A** (suport 1…10 GbE), cu prize RJ45 duble în living, birou/spațiu de studiu și în fiecare dormitor;
- **Rack tehnic mic** (patch-panel + switch + router) amplasat într-un dulap/nișă tehnică din hol, cu alimentare electrică dedicată;
- **Acoperire Wi-Fi 6** prin punct(e) de acces central(e), completată dacă e necesar cu un al doilea punct de acces la etaj pentru acoperire uniformă;
- **Cablare TV coaxială RG6** (recepție satelit/cablu) cu prize în living și dormitoare.

### 12.2 Videointerfon și control acces poartă

- **Post exterior de videointerfon** la poarta/intrarea în curte, cu cameră video și microfon/difuzor;
- **Post(uri) interior(oare)** de videointerfon în bucătărie/living, cu funcție de deschidere la distanță a porții/ușii de acces;
- **Comandă automatizare poartă/ușă garaj** integrată cu videointerfonul și, opțional, cu telecomandă/aplicație mobilă.

### 12.3 Sistem de alarmă antiefracție

- **Centrală de alarmă** cu **detectoare de mișcare (PIR)** pe circulațiile parterului și **contacte magnetice** pe ușile și ferestrele accesibile de la sol;
- **Sirenă de interior și exterior**;
- **Comunicator GSM/IP** pentru transmiterea alarmei la beneficiar (aplicație mobilă) și, opțional, la o firmă de monitorizare/pază;
- Armare/dezarmare de la tastatură, cartelă de proximitate sau aplicație mobilă.

### 12.4 Automatizare „smart home"

Sistem de automatizare rezidențială (opțional, dar recomandat pentru o casă nZEB modernă), care integrează:
- **Termostate/actuatoare pe zone** pentru reglajul fin al pardoselii radiante/radiatoarelor, comandate individual pe cameră;
- **Comanda VMC** (trepte de debit, mod boost/dimineață-seară) și a pompei de căldură (moduri economic/confort);
- **Monitorizarea producției fotovoltaice și a consumului propriu** (dashboard energie, optimizarea autoconsumului — de exemplu pornirea mașinii de spălat sau încărcarea vehiculului electric în orele de producție solară maximă);
- **Automatizarea jaluzelelor/obloanelor** (control solar pasiv vara, izolare suplimentară noaptea iarna) și a iluminatului (scenarii, „modul vacanță" cu simulare de prezență).

Toate cablurile de curenți slabi se pozează în tuburi separate de cele ale circuitelor de forță (distanță minimă conform I18/I7), pentru evitarea perturbațiilor electromagnetice.

---

## 13. Performanța energetică nZEB (Legea 372/2005) — fotovoltaic, solar termic, CPE

### 13.1 Obligativitatea standardului nZEB

Conform **Legii 372/2005 (republicată)** și **HG 1/2023**, orice clădire nouă, inclusiv locuința unifamilială, trebuie proiectată la nivelul de performanță **nZEB (nearly Zero-Energy Building — clădire cu consum de energie aproape egal cu zero)**, ceea ce presupune cumulat: anvelopă performantă, instalații eficiente și un aport minim obligatoriu din **surse regenerabile de energie (RES)**.

### 13.2 Pachetul de măsuri nZEB adoptat

| Domeniu | Măsură adoptată | Efect |
|---|---|---|
| Anvelopă | Termosistem 15…20 cm + tâmplărie triplu vitraj Low-E, n₅₀ ≤ 1,5 h⁻¹ | Necesar termic ≈ 61 W/mp |
| Sursă termică | Pompă de căldură aer-apă, SCOP ~3,4 | Energie regenerabilă aerotermală |
| Preparare ACM | Panouri solare termice 5 mp (~60…70 % acoperire) + boiler bivalent | Energie regenerabilă solară |
| Ventilare | VMC dublu flux, recuperare η ≥ 85 % | −85 % pierderi prin ventilare |
| Iluminat | LED (~6 W/mp) + senzori de prezență/crepuscul | Consum minim de iluminat |
| Producție electrică proprie | Fotovoltaic ~4,5…5 kWp | Producție RES on-site |

### 13.3 Instalația fotovoltaică

Suprafața disponibilă de acoperiș pentru montarea panourilor fotovoltaice (versantul cu expunere favorabilă S/SE-SV, fără umbrire de la coșuri/antene/vegetație): **~40…50 mp**. Se adoptă o putere instalată **P_FV ≈ 4,5…5 kWp** (10…12 module de 400…450 Wp fiecare, ~1,95 mp/modul), dimensionată nu la maximul posibil al suprafeței, ci pentru **acoperirea consumului propriu anual al locuinței**, în logica prosumatorului:

**Producția anuală estimată** (iradiere specifică ≈ 1.250 kWh/kWp·an pentru zona de amplasament, performance ratio inclus):

**E_FV = 4,5 kWp × 1.250 kWh/kWp·an = 5.625 kWh/an ≈ 5.600 kWh/an**

Configurația adoptată:
- **Invertor hibrid, 5 kW**, cu posibilitate de conectare a unei **baterii de stocare (opțional, 5…10 kWh)**, pentru creșterea autoconsumului și autonomie parțială în caz de întrerupere a rețelei;
- **Contor bidirecțional** la branșament, statut de **prosumator conform Legii 184/2021**, cu contract de energie electrică ce reglementează compensarea cantitativă a energiei livrate în rețea;
- Structură de montaj pe acoperiș (cârlige/șine dedicate învelitorii), verificată la încărcarea din vânt și zăpadă specifică zonei;
- Monitorizare a producției (aplicație mobilă/portal), integrabilă cu sistemul smart home (cap. 12.4) pentru optimizarea autoconsumului.

Producția anuală estimată de 5.600 kWh, raportată la un consum electric anual estimat al locuinței (iluminat, prize, electrocasnice, pompă de căldură, VMC — excluzând eventualul consum al unei stații de încărcare EV utilizate intensiv) de ordinul **~4.500…5.500 kWh/an**, indică un **grad de acoperire apropiat de 100 %** pe bază anuală, cu variații sezoniere (surplus vara, deficit iarna, compensate prin schema de prosumator).

### 13.4 Bilanțul energetic și încadrarea nZEB

Consumul de energie primară estimat pentru locuință, după aplicarea pachetului de măsuri de la 13.2, se situează în intervalul **~60…90 kWh/mp·an**, în plaja de referință pentru locuințe unifamiliale nZEB din România. Aportul din surse regenerabile (energie aerotermală a pompei de căldură + solar termic + fotovoltaic) **depășește pragul minim de 30…40 %** din consumul total de energie primară, cerință specifică standardului nZEB.

### 13.5 Certificatul de performanță energetică (CPE)

La finalizarea lucrărilor și înainte de recepție, se întocmește **Certificatul de Performanță Energetică**, pe baza breviarului de calcul Mc001 detaliat (zone termice, echipamente selectate definitiv, măsurători/probe de etanșeitate). Se estimează încadrarea locuinței în **clasa energetică A**, ca urmare a cumulului anvelopă performantă + pompă de căldură + recuperare de căldură + producție fotovoltaică proprie.

### 13.6 Estimarea producției lunare și a autoconsumului

Profilul sezonier al producției fotovoltaice (4,5 kWp, zona de amplasament NE), pe baza iradierii lunare medii:

| Perioadă | Producție lunară estimată | Observații |
|---|---|---|
| Iarnă (dec–feb) | ~150…200 kWh/lună | Iradiere redusă + posibil acoperire cu zăpadă |
| Primăvară/toamnă (mar–mai, sep–nov) | ~400…500 kWh/lună | Producție echilibrată |
| Vară (iun–aug) | ~650…750 kWh/lună | Producție maximă |
| **Total anual** | **≈ 5.600 kWh/an** | Conform cap. 13.3 |

Autoconsumul propriu (energia produsă și consumată direct în casă, fără injecție în rețea) depinde de suprapunerea producției solare (maximă la prânz) cu profilul de consum al locuinței. Pentru o casă ocupată permanent (nu doar seara/weekend), cu pompa de căldură și electrocasnicele programate preferențial în orele de soare (prin sistemul smart home, cap. 12.4), autoconsumul estimat este de **~40…55 %** din producție, restul fiind injectat în rețea și compensat conform contractului de prosumator (Legea 184/2021). Adăugarea unei **baterii de stocare de 5…10 kWh** (opțiune menționată la cap. 13.3) poate crește autoconsumul la **~70…80 %**, prin deplasarea în timp a surplusului de producție de la prânz către seară.

### 13.7 Reducerea amprentei de carbon

- **Electrificarea completă a surselor termice** (pompă de căldură, fără ardere locală de combustibil fosil în varianta 100 % electrică) reduce emisiile directe de CO₂ la zero la nivelul locuinței, transferând amprenta către mixul energetic al rețelei (în scădere progresivă odată cu decarbonizarea producției naționale de energie electrică);
- **Agent frigorific cu GWP redus** (de exemplu R32) în pompa de căldură, față de agenții mai vechi cu potențial de încălzire globală ridicat;
- **Pregătire EV-ready** (cap. 7.2, 7.4) — reduce emisiile asociate mobilității, cu posibilitatea de a încărca vehiculul electric direct din surplusul fotovoltaic;
- **Materiale de instalații durabile** și, opțional, **rezervorul de apă pluvială** (cap. 4.4) pentru reducerea consumului de apă potabilă la irigarea grădinii.

---

## 14. Acustică, antivibrații și protecția seismică a echipamentelor

### 14.1 Controlul zgomotului și al vibrațiilor

Echipamentele generatoare de zgomot și vibrații ale unei locuințe unifamiliale — în principal **unitatea exterioară a pompei de căldură**, dar și pompele de circulație și unitatea VMC — se montează cu măsuri proporționale de atenuare:

- **Unitatea exterioară a pompei de căldură** se amplasează pe un **soclu antivibrant** (tampoane de cauciuc sau saltea elastomerică), la distanță de minimum 3 m de ferestrele dormitoarelor (proprii și, dacă e cazul, ale vecinilor) și orientată astfel încât fluxul de aer evacuat să nu fie direcționat spre spațiile de odihnă. Nivelul de putere acustică al unităților rezidențiale moderne (funcționare de noapte, „mod silențios") este de ordinul **45…55 dB(A) la 1 m**, care la distanța de amplasament recomandată se atenuează sub pragul de disconfort nocturn (conform recomandărilor OMS pentru zgomot rezidențial exterior, ≤ 45 dB(A) noaptea la fațada dormitoarelor);
- **Racordurile hidraulice** ale unității exterioare la circuitul interior se fac prin **compensatori/racorduri flexibile**, care evită transmiterea vibrațiilor de funcționare a compresorului către structura clădirii prin conductele îngropate;
- **Pompele de circulație** (circuit de încălzire, recirculare ACM) sunt de tip electronic, cu turație variabilă și nivel de zgomot redus (clasă energetică A, funcționare silențioasă), montate pe suporturi cu inserție elastomerică acolo unde sunt fixate direct pe elemente de structură;
- **Unitatea VMC** se amplasează, conform cap. 6.4, într-un spațiu tehnic separat de camerele de odihnă, cu tubulatură izolată fonic și atenuatoare pe traseul principal.

### 14.2 Protecția antiseismică a echipamentelor

Deși locuința unifamilială se încadrează în clasa de importanță seismică IV (γ_I,e = 1,00, cerințe mai reduse decât la construcțiile publice), se recomandă, ca bună practică de execuție, un set minim de măsuri de fixare seismică a echipamentelor, în special a celor amplasate în poziții înalte/suspendate:

- **Ancorarea boilerului/pufferului** (echipamente cu masă semnificativă când sunt pline cu apă — un boiler de 200 l plin cântărește peste 220 kg) la perete/pardoseală cu console și prezoane dimensionate pentru greutatea proprie plus o forță orizontală de siguranță;
- **Fixarea unității exterioare a pompei de căldură** pe un soclu de beton ancorat la teren sau pe console de perete cu prezoane antivibrante dimensionate corespunzător;
- **Contravântuirea/susținerea corespunzătoare a tubulaturii VMC și a traseelor de canalizare/apă** suspendate în pod sau în plafonul fals, cu bride și suporturi la intervale normate, pentru a evita desprinderea în cazul unei mișcări seismice;
- **Racorduri flexibile** la instalația de gaze (dacă există), care preiau eventualele deplasări relative mici între conductă și aparatul consumator fără a fisura racordul rigid.

---

## 15. Corelarea instalațiilor cu arhitectura și structura

Coordonarea instalațiilor cu proiectul de arhitectură și cu cel de structură este esențială pentru o execuție fără intervenții ulterioare (spargeri, carotaje neplanificate) și pentru funcționarea optimă a echipamentelor:

- **Poziția centralei/camerei tehnice**: unitatea interioară a pompei de căldură, pufferul, boilerul și grupurile de distribuție se amplasează, de regulă, în spălătorie/debara de la parter, cu acces facil pentru mentenanță și cu perete/planșeu pregătit pentru trecerea coloanelor spre etaj;
- **Poziția unității exterioare a pompei de căldură**: se amplasează în curte, pe un soclu antivibrant, la o distanță suficientă de dormitoare (evitarea transmiterii zgomotului de funcționare către camerele de odihnă) și cu spațiu liber de circulație a aerului conform cărții tehnice a producătorului (minimum 30…50 cm față de obstacole);
- **Trasee verticale (ghenă sanitară)**: grupurile sanitare de la parter (GS service) și etaj (baie principală, baie secundară) se poziționează, pe cât posibil, **suprapuse pe verticală**, pentru a minimiza lungimea coloanelor de apă/canalizare și numărul de goluri prin planșeu;
- **Goluri de trecere prin planșeu**: se prevăd din faza de proiectare a structurii (nu se sparg ulterior în plăcile din beton armat) pentru coloana de canalizare (Dn 110 + spațiu de manevră), coloanele de apă rece/caldă (De 25), tubulatura VMC (Ø 75…160 mm, funcție de traseu) și coloana electrică/curenți slabi;
- **Poziția tabloului electric general**: se amplasează, de regulă, în hol/zona de acces, aproape de branșament, pentru a minimiza lungimea coloanei principale și căderea de tensiune asociată;
- **Poziția invertorului fotovoltaic și a echipamentelor conexe**: se amplasează într-un spațiu tehnic ventilat (garaj/pod tehnic), cât mai aproape de tabloul electric general, pentru a reduce lungimea cablului DC de la panouri;
- **Orientarea și panta acoperișului**: se corelează din faza de arhitectură cu necesitatea unui versant orientat favorabil (S/SE-SV, înclinare 30…35°) și fără umbrire (coșuri, antene, vegetație înaltă), atât pentru panourile fotovoltaice cât și pentru cele solare termice;
- **Poziția firidei de branșament (apă, gaze, electric)**: se stabilește la limita de proprietate, accesibilă din domeniul public pentru citire/intervenție de către operatori, conform planului de situație avizat.

Coordonarea interdisciplinară se materializează prin planuri de instalații suprapuse peste planurile de arhitectură și structură (verificare de coliziuni), astfel încât traseele definitive să fie stabilite înainte de execuția structurii de rezistență și a șapelor.

---

## 16. Recepția, probele și punerea în funcțiune

Înainte de recepția lucrărilor, instalațiile se supun probelor și verificărilor reglementate:

| Instalație | Probă/verificare | Criteriu |
|---|---|---|
| Apă rece/caldă | Probă de presiune hidraulică | 1,5 × presiune de regim, minimum 6 bar, fără scădere timp de 1 h |
| Canalizare menajeră | Probă de etanșeitate și scurgere | Fără scurgeri; garda hidraulică a sifoanelor menținută |
| Canalizare pluvială | Verificare debit/scurgere la ploaie test sau simulată | Fără infiltrații/refulări |
| Instalație termică | Probă la rece + probă la cald + echilibrare hidraulică | Echilibrare debite pe bucle ± 10 % |
| Ventilare (VMC) | Măsurare debite de aer pe fiecare gură + reglaj | Debite proiectate ± 15 % |
| Instalație electrică | Măsurare rezistență de izolație + continuitate PE + rezistență priză de pământ | R_izolație ≥ 0,5 MΩ; R_priză ≤ 4 Ω |
| Iluminat | Măsurare niveluri de iluminare (luxmetru) | Conform tabelului cap. 8.1 |
| Instalație fotovoltaică | Verificare polaritate/izolație DC + test de producție | Conform proiect + aviz prosumator |
| Instalație de gaze (dacă există) | Probă de presiune/etanșeitate + autorizare | Conform NTPEE; fără scădere de presiune |
| Detectoare fum/CO | Test funcțional individual | 100 % puncte funcționale |

**Punerea în funcțiune** presupune parcurgerea, în ordine, a următoarelor etape: probe de presiune și etanșeitate pe circuitele hidraulice (apă, încălzire, gaze), reglajul și echilibrarea hidraulică a buclelor de pardoseală radiantă/radiatoare, reglajul debitelor de aer ale VMC pe fiecare gură de introducere/extracție, măsurătorile electrice (izolație, continuitate, priză de pământ), punerea în funcțiune și configurarea pompei de căldură (curbă de încălzire, parametri ACM), punerea în funcțiune a instalației fotovoltaice și obținerea acordului de racordare ca prosumator, respectiv, dacă e cazul, autorizarea instalației de gaze de către operatorul de distribuție. Se întocmesc procesele-verbale de probe și instrucțiunile de exploatare pentru beneficiar (întreținere filtre VMC, curățare recuperator, ciclu antilegionella, verificare periodică detectoare fum/CO).

---

## 17. Concluzii, sinteză de indicatori și verificare tehnică

### 17.1 Sinteza soluțiilor și a indicatorilor de dimensionare

| Instalație | Soluție adoptată | Parametru de calcul |
|---|---|---|
| Apă rece | Branșament public (sau puț + hidrofor) + distribuție PP-R/PEX colector-distribuitor | qc = 0,50 l/s; H_nec ≈ 3,5 bar |
| Apă caldă (ACM) | Boiler bivalent 200 l + solar termic 5 mp + rezistență 2 kW backup | 300 l/zi; Φ preparare ≈ 15,7 kWh/zi |
| Canalizare menajeră | Gravitațional, separativ + racord public (sau microstație 5…6 LE/fosă septică) | Q_ww ≈ 1,8 l/s; coloană Dn 110 |
| Canalizare pluvială | Jgheaburi Dn 125 + burlane Dn 90…100 + rezervor 2…3 mc + infiltrare pe lot | Q_pluvial ≈ 1,5 l/s |
| Sursă termică | Pompă de căldură aer-apă 10…12 kW + backup electric/gaz | Φ_înc ≈ 9,1 kW (61 W/mp); COP ~4,0 |
| Distribuție termică | Pardoseală radiantă (parter+băi) + radiatoare (dormitoare) | Regim 35/30 °C |
| Ventilare | VMC dublu flux, recuperare η ≥ 85 % | 200…250 mc/h; recuperat ≈ 2,2 kW |
| Electrice | Branșament trifazat, P aprobată ≈ 15 kW | Pi ≈ 26,8 kW; Pc ≈ 12,5 kW; Ic ≈ 19,6 A/fază |
| Iluminat | LED, ~6 W/mp, senzori de prezență/crepuscul | P ≈ 0,90 kW |
| Priză de pământ | Priză de fundație + BEP + echipotențializare băi | R_p ≤ 4 Ω |
| Protecție la trăsnet | Evaluare risc SR EN 62305-2 — de regulă neconcludentă pentru necesitate | SPD tip 2 la tabloul general |
| Gaze naturale (opțional) | Branșament PE + contor G4 + centrală etanșă C13/C33 | Q_total ≈ 3,39 mc/h |
| PSI | Detectoare fum interconectate + detector CO + stingător 6 kg | Sub praguri P118 |
| Curenți slabi | Cat.6/6A + Wi-Fi 6 + videointerfon + alarmă + smart home | — |
| Fotovoltaic (nZEB) | ~4,5…5 kWp, invertor hibrid, statut prosumator | E_FV ≈ 5.600 kWh/an |
| Performanță energetică | nZEB — clasa energetică țintă A | ~60…90 kWh/mp·an; RES > 30…40 % |

### 17.2 Coordonare interdisciplinară

Instalațiile prezentate se coordonează cu proiectul de arhitectură (poziția camerei tehnice, ghena sanitară, orientarea acoperișului pentru FV/solar termic) și cu proiectul de structură (goluri prin planșeu pentru coloane, sarcini ale echipamentelor de pe acoperiș/curte), conform detalierii de la capitolul 15. Traseele principale se prevăd cu o rezervă de capacitate de aproximativ 15…20 % pentru eventuale extinderi ulterioare (grup sanitar suplimentar, extindere fotovoltaică, stație de încărcare vehicul electric de putere mai mare).

### 17.3 Verificarea tehnică (Legea 10/1995, HG 925/1995)

Documentația se supune verificării tehnice de calitate de către **verificatori de proiecte atestați MDLPA**, pe specialitățile relevante:

| Cerință | Verificator | Domeniu acoperit |
|---|---|---|
| **Is** | Verificator instalații sanitare | Alimentare cu apă, ACM, canalizare menajeră/pluvială |
| **It** | Verificator instalații termice | Sursă termică, distribuție încălzire, ventilare |
| **Ie** | Verificator instalații electrice | Curenți tari, curenți slabi, iluminat, fotovoltaic, priză de pământ |
| **Ig** | Verificator instalații gaze (dacă se prevede racord/centrală pe gaz) | Instalația de utilizare a gazelor naturale |

### 17.4 Avize și acorduri necesare

- **Apă–canal**: aviz de racordare la rețeaua publică (sau, în variantă proprie, aviz de gospodărire a apelor pentru puț și pentru microstație/fosă septică);
- **Energie electrică**: aviz tehnic de racordare (ATR) de la operatorul de distribuție + aviz de prosumator pentru instalația fotovoltaică (conform Legii 184/2021);
- **Gaze naturale** (dacă se prevede racord): aviz de racordare + proiect de instalație de utilizare (conform NTPEE), cu detector de gaz și electrovalvă de siguranță, verificat de verificator atestat Ig;
- **Mediu** (dacă e cazul, variantă cu sursă/evacuare proprie): aviz de gospodărire a apelor pentru forajul de alimentare și pentru microstația de epurare/fosa septică.

### 17.5 Notă privind stadiul documentației

Dimensionările prezentate în acest memoriu au caracter **preliminar, la nivel de DTAC**, fiind fundamentate pe ipoteze de calcul acoperitoare, pe date orientative ale amplasamentului (climat, disponibilitate rețele publice) și pe soluții de principiu general acceptate pentru locuințe unifamiliale nZEB. La faza de **proiect tehnic (PT)** se elaborează **breviarele de calcul complete pe fiecare încăpere** (calcul termic detaliat SR EN 12831 pe fiecare cameră, calcul hidraulic al buclelor de pardoseală radiantă, bilanț electric definitiv pe circuite, dimensionarea finală a instalației fotovoltaice pe baza studiului de umbrire), **schemele funcționale**, **planurile de execuție** și **specificațiile tehnice ale echipamentelor**, cu selectarea concretă a produselor (pompă de căldură, module fotovoltaice, unitate VMC) și verificarea prin note de calcul semnate de proiectanții de specialitate și avizate de verificatorii atestați menționați la 17.3.
