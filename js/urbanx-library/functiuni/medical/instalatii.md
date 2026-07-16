# MEMORIU TEHNIC DE INSTALAȚII — DTAC

## UNITATE MEDICALĂ (SPITAL/CLINICĂ MULTIFUNCȚIONALĂ) — REGIM S+P+4E, 90 PATURI + 8 ATI + 3 SĂLI OPERAȚIE + AMBULATORIU

*Prezentul memoriu tratează, la faza documentației tehnice pentru autorizarea executării lucrărilor de construire (D.T.A.C.), componenta de instalații (sanitare, gaze medicale, termice, electrice, ventilare-climatizare cu clase de puritate și curenți slabi) a unei unități medicale multifuncționale, cu regim de înălțime S+P+4E, 90 de paturi de spitalizare, 8 posturi de terapie intensivă (ATI), 3 săli de operație și componentă de ambulatoriu integrat. Datele de identificare a investiției, încadrarea urbanistică și lista avizelor se tratează în memoriul tehnic general; compartimentarea, fluxurile funcționale separate (septic/aseptic, pacient/personal/vizitator/marfă), dimensionarea încăperilor și accesibilitatea se tratează în memoriul de arhitectură; sistemul de rezistență, ancorarea seismică a echipamentelor grele și acțiunile seismice se tratează în memoriul de structură. Prezentul memoriu nu reproduce conținutul acelor piese, ci le presupune cunoscute și se concentrează exclusiv pe dimensionarea și justificarea soluțiilor de instalații, cu breviarele de calcul aferente fiecărei discipline. Scenariul de securitate la incendiu, elaborat de specialist atestat și avizat de Inspectoratul pentru Situații de Urgență, este piesă separată a documentației — prezentul memoriu se limitează, la punctele de interfață (sprinklere versus gaz inert, desfumare, alimentarea electrică a sarcinilor de siguranță), la dimensionarea capacității/sursei cerute, fără a relua logica de detecție, alarmare sau evacuare.*

---

## 0. CUPRINS

1. Date generale, cadru normativ și ipoteze de calcul
2. Instalații sanitare — alimentare cu apă rece
3. Prepararea și distribuția apei calde de consum (ACM) — regimul antilegionella
4. Apă tratată pentru utilizări medicale speciale
5. Canalizare — sisteme separate și tratare specifică
6. Gaze medicale (SR EN ISO 7396-1) — capitolul cel mai critic
7. Instalații termice și instalația de utilizare a gazelor naturale
8. Ventilare-climatizare cu clase de puritate (SR EN ISO 14644)
9. Instalații electrice — redundanță, bilanț de putere, IT medical
10. Iluminat
11. Priză de pământ și protecție la trăsnet
12. PSI — sprinklere, excepții, hidranți, detecție, desfumare
13. Curenți slabi și sisteme medicale — nurse call, RIS/PACS, BMS
14. Ascensoare — interfața cu instalațiile
15. nZEB adaptat unității medicale — fiabilitate și igienă înaintea eficienței
16. Acustică și confortul sonor al pacientului
17. Coordonarea interdisciplinară
18. Recepția, probele și punerea în funcțiune
19. Concluzii, sinteză de indicatori, verificare tehnică și avize

---

## 1. Date generale, cadru normativ și ipoteze de calcul

### 1.1. Obiectul memoriului și particularitățile instalațiilor unei clădiri medicale

Memoriul de față tratează instalațiile aferente unei **unități medicale multifuncționale, regim S+P+4E, cu arie desfășurată construită (ADC) de ~6.000 mp (~1.000 mp/nivel)**, care reunește **90 de paturi de spitalizare, 8 posturi de terapie intensivă (ATI), 3 săli de operație și un ambulatoriu** cu imagistică (RX/CT/RMN), laborator și farmacie, deservind un flux de proiectare de **220 de persoane pe schimb** (personal medical, auxiliar și administrativ, fără a include pacienții și vizitatorii, al căror flux este tratat în memoriul de arhitectură). Spre diferență de o clădire hotelieră, de birouri sau de locuit, ale căror instalații deservesc un regim de ocupare relativ omogen, o unitate medicală de această complexitate reunește, pe același amprentă construită, **patru regimuri funcționale cu cerințe tehnice radical diferite**, sintetizate în tabelul de la capitolul 1.2 și tratate individual pe parcursul memoriului: (a) zona tehnică de subsol, care găzduiește sursele și rezervele critice ale întregii clădiri (centrala termică, stațiile de gaze medicale, hidroforul, gospodăria de apă pentru incendiu, transformatorul general și grupul electrogen), alături de morgă și de sterilizarea centrală; (b) parterul de ambulatoriu, triaj/UPU și imagistică, cu flux de pacienți ambulanți intens și echipamente de mare putere electrică (CT, RMN); (c) blocul operator și ATI de la etajul 1, cu cea mai severă cerință de instalații din întreaga clădire (**grupă medicală 2** conform SR HD 60364-7-710, tratată explicit la capitolul 1.3); și (d) etajele de spitalizare, cu o cerință de continuitate ridicată, dar de complexitate tehnică mai redusă decât blocul operator.

O clădire medicală nu poate fi proiectată, din perspectiva instalațiilor, prin extrapolarea unor indici generici de consum pe metru pătrat sau pe persoană, așa cum s-ar putea proceda, cu rezerve, la o clădire de birouri — fiecare dintre cele patru regimuri funcționale enumerate mai sus generează un profil de consum, o cerință de calitate a aerului și o cerință de redundanță electrică proprii, care trebuie sumate și justificate disciplină cu disciplină, exact procedeul urmat consecvent în capitolele următoare ale prezentului memoriu.

**Caracteristica definitorie a proiectării, care guvernează fiecare decizie tehnică din acest memoriu, este funcționarea continuă 24 de ore din 24, 365 de zile pe an, combinată cu redundanța totală a utilităților vitale.** Spre diferență de o clădire hotelieră (unde o pană scurtă de curent produce disconfort, dar nu pune viața în pericol) sau de o clădire de birouri (unde activitatea se poate întrerupe temporar fără consecințe ireversibile), la o unitate medicală cu bloc operator și terapie intensivă, **o întrerupere de fracțiuni de secundă a alimentării electrice a unui ventilator mecanic, a unei pompe de perfuzie sau a unui monitor de anestezie poate avea consecințe ireversibile asupra unui pacient aflat sub anestezie generală, paralizat farmacologic și incapabil să respire spontan**. Această realitate fiziologică — nu o preferință de proiectare — este cea care justifică nivelul de redundanță (dublă rețea electrică + grup electrogen + UPS, oxigen cu triplă sursă, aer și vacuum în configurație N+1, rezervă de apă de peste 24 de ore) adoptat sistematic în prezentul memoriu și dezvoltat, cu raționamentul cantitativ complet, la capitolul 1.4.

Clădirea se încadrează, conform memoriului general, în **categoria de importanță A** (construcție cu funcțiuni vitale pentru siguranța populației) și în **clasa I de importanță și expunere seismică** (γI = 1,40, coeficientul de majorare cel mai ridicat din grila P100-1, aplicat exact clădirilor care trebuie să rămână funcționale imediat după un cutremur major — spitalele sunt, alături de stațiile de pompieri și centrele de comandă, structurile pe care societatea se bazează să funcționeze *după* dezastru, nu doar să nu se prăbușească). Această încadrare are, pentru instalații, consecințe similare celor discutate pentru clădirea hotelieră (ancorarea seismică a echipamentelor grele, tratată de memoriul de structură), dar amplificate de coeficientul γI = 1,40 (superior valorii 1,20 a unei clădiri de importanță B) — verificarea de detaliu a ancorării boilerelor, cazanelor, rezervoarelor de gaze și a tablourilor electrice grele la forța orizontală seismică majorată se face la faza PT, în corelare cu memoriul de structură.

### 1.2. Parametrii de referință ai clădirii

| Element | Valoare | Sursă |
|---|---|---|
| Regim de înălțime | S+P+4E | memoriul general |
| ADC totală / pe nivel | ~6.000 mp / ~1.000 mp | memoriul general/arhitectură |
| Categoria de importanță (HG 766/1997) | **A — excepțională** | memoriul general |
| Clasa de importanță seismică (P100-1) | **I** (γI = 1,40) | memoriul general |
| Paturi de spitalizare | **90** | memoriul de arhitectură |
| Posturi ATI | **8** | memoriul de arhitectură |
| Săli de operație | **3** | memoriul de arhitectură |
| Ambulatoriu, imagistică, laborator, farmacie | conform program funcțional | memoriul de arhitectură |
| Personal pe schimb (flux de proiectare) | **220 persoane** | memoriul general |

**Zonarea pe niveluri și grupele medicale corespunzătoare (SR HD 60364-7-710):**

| Nivel | Funcțiune | Grupă medicală |
|---|---|---|
| Subsol | tehnic (centrală termică, stații gaze medicale, hidrofor, gospodărie apă incendiu, transformator general, grup electrogen), depozite, morgă, sterilizare centrală | 0/1 |
| Parter | ambulatoriu, UPU/triaj, imagistică (RX/CT/RMN), laborator, farmacie | 1 |
| Etaj 1 | bloc operator (3 săli), ATI (8 posturi), sterilizare de etaj | **2** |
| Etaje 2-4 | spitalizare (chirurgie/medicină internă/obstetrică-neonatologie) | 1-2 |

Nu se reia aici compartimentarea funcțională detaliată, fluxurile de circulație (pacient/personal/marfă murdară-curată) sau dimensionarea încăperilor — toate acestea sunt tratate exhaustiv în memoriul de arhitectură și se citează, unde relevant pentru interfața cu instalațiile, prin trimitere explicită.

### 1.3. Grupele medicale conform SR HD 60364-7-710 — semnificația tehnică

Standardul **SR HD 60364-7-710** (parte a seriei HD 60364, adoptare română a IEC 60364-7-710) clasifică fiecare încăpere cu destinație medicală într-una din trei **grupe medicale**, în funcție de tipul de contact electric posibil cu pacientul și de consecința unei întreruperi a alimentării electrice — clasificare care nu este o formalitate administrativă, ci determină direct arhitectura electrică a fiecărei încăperi (tratată complet la capitolul 9):

- **Grupa 0** — încăperi în care echipamentul electric nu vine în contact cu pacientul și în care o întrerupere a alimentării nu pune în pericol pacientul (de exemplu, spații tehnice, depozite) — nu necesită măsuri speciale, alimentare normală.
- **Grupa 1** — încăperi în care părțile aplicate ale echipamentului electric sunt destinate utilizării exterior, interior sau intracavitar (cu excepția cazurilor din Grupa 2), iar o întrerupere a alimentării poate cauza vătămare a pacientului, dar **nu pune imediat în pericol viața** — de exemplu, cabinete de examinare, saloane de spitalizare standard, laborator. Cerință: continuitate restabilită în timp scurt (adoptat ≤15 s prin generator), fără cerință de comutare instantanee.
- **Grupa 2** — încăperi în care părțile aplicate sunt destinate unor proceduri **intracardiace sau vitale** (bloc operator, terapie intensivă, sală de naștere, angiografie), unde o întrerupere a alimentării, chiar de durată foarte scurtă, **pune viața pacientului în pericol imediat**. Cerință: continuitate **fără întrerupere perceptibilă** (adoptat ≤0,5 s, prin sursă neîntreruptibilă on-line), plus un sistem electric **IT medical** dedicat (transformator de separare + monitor de izolație, tratat complet la capitolul 9.4), care menține echipamentul în funcțiune chiar și la un prim defect de izolație.

Clasificarea pe niveluri de la capitolul 1.2 (subsol/parter Grupa 0-1, bloc operator/ATI Grupa 2, etaje de spitalizare Grupa 1-2 în funcție de tipul de salon) rezultă direct din aplicarea acestei grile funcțiune cu funcțiune, conform programului medico-tehnologic stabilit de beneficiar și de medicul coordonator al proiectului.

### 1.4. Redundanța ca principiu transversal — raționamentul cantitativ

Redundanța utilităților vitale nu este, la o unitate medicală cu bloc operator și ATI, o măsură de prudență opțională, ci o cerință derivată direct din fiziologia pacientului critic și din durata de toleranță la întreruperea fiecărei utilități. Tabelul de mai jos sintetizează soluția adoptată pentru fiecare utilitate; raționamentul din spatele fiecărei cifre este dezvoltat, pe rând, imediat după tabel și reluat, cu detaliu tehnic complet, în capitolele de specialitate.

| Utilitate | Redundanță adoptată | Întrerupere admisă |
|---|---|---|
| Electric Grupa 2 (bloc operator/ATI) | dublă rețea + grup electrogen + UPS on-line | **≤0,5 s** (HD 60364-7-710) |
| Electric Grupa 1 | dublă rețea + grup electrogen | ≤15 s |
| Oxigen | sursă + rezervă + avarie (**N+2**) | 0 s |
| Aer medical/vacuum | duplex-triplex (N+1) | 0 s |
| Termic | 2 cazane × 60% (N+1) | 0 s |
| Apă | rezervă ≥24 h | 0 s |

**De ce 0,5 secunde poate fi fatal.** Un pacient aflat sub anestezie generală, în timpul unei intervenții pe blocul operator, este de regulă **paralizat farmacologic** (relaxante musculare administrate pentru a permite intubarea și a preveni mișcarea involuntară în timpul intervenției) și **incapabil să respire spontan** — funcția respiratorie este preluată integral de ventilatorul mecanic. O întrerupere a alimentării electrice a acestui ventilator, chiar de ordinul secundelor, oprește admisia de oxigen și evacuarea de CO₂ a pacientului; la o rezervă funcțională de oxigen în sânge limitată, hipoxia cerebrală devine ireversibilă în câteva minute, iar chiar întreruperi mai scurte pot compromite monitorizarea (ECG, saturație de oxigen, presiune arterială invazivă) exact în momentul critic al unei manevre chirurgicale (clampare vasculară, hemostază, deschiderea unei cavități). În plus, echipamentele electrochirurgicale (bisturiul electric, care taie și coagulează prin curent de înaltă frecvență) și pompele de circulație extracorporeală (la intervențiile cardiace) nu tolerează nicio întrerupere fără riscul unei complicații intraoperatorii grave. Din acest motiv, pragul de **≤0,5 secunde** adoptat de HD 60364-7-710 pentru Grupa 2 nu este arbitrar: este intervalul maxim în care o sursă neîntreruptibilă on-line (UPS, care alimentează permanent sarcina din bateria proprie, fără comutare mecanică) poate prelua sarcina fără nicio întrerupere percepută de echipamentul medical, spre diferență de comutarea automată pe generator (AAR), care necesită pornirea motorului termic și stabilizarea tensiunii/frecvenței — un proces care durează, fizic, cel puțin câteva secunde și care este acceptabil doar pentru Grupa 1 (unde o întrerupere de ordinul secundelor nu pune viața în pericol imediat).

**De ce oxigenul cere N+2, nu N+1.** Toate celelalte utilități critice ale clădirii (aer medical, vacuum, termic) sunt proiectate în configurație **N+1** — o sursă activă plus o rezervă identică, suficientă pentru a acoperi scenariul cel mai frecvent de avarie: defectarea unui singur echipament activ. Oxigenul este singura utilitate pentru care s-a adoptat o **triplă redundanță (N+2)** — sursă principală + rezervă automată + rezervă de avarie manuală — pentru două motive cumulate, dezvoltate integral la capitolul 6.3: (1) oxigenul este singurul gaz medical a cărui întrerupere provoacă, în câteva minute, moartea unui pacient ventilat mecanic, fără nicio alternativă manuală imediată (spre diferență de vacuum, unde o pompă portabilă manuală poate prelua temporar aspirația chirurgicală, sau de aerul medical, unde un ventilator poate, în scenariul cel mai defavorabil, funcționa temporar pe rezervorul propriu integrat); (2) o defecțiune la sursa criogenică principală (VIE) coincide statistic, în cazurile documentate de avarie majoră a instalațiilor de gaze medicale, cu întreruperi ale alimentării electrice generale (care alimentează și vaporizatoarele/compresoarele VIE) — motiv pentru care rezerva de avarie (rampa de butelii manuale + prizele NIST de urgență, cap. 6.3) este proiectată explicit să funcționeze **independent de sursa electrică**, ca ultimă linie de apărare atunci când atât sursa principală, cât și cea automată de rezervă sunt indisponibile simultan.

### 1.5. Cadrul normativ aplicabil

**Instalații sanitare, canalizare și gaze medicale:**
- I9/2015 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor sanitare
- STAS 1478, STAS 1795, STAS 1846 — alimentare cu apă, canalizări, debite/ploi de calcul
- **SR EN ISO 7396-1** — sisteme de conducte pentru gaze medicale comprimate și vacuum
- **SR EN 13348** — tuburi de cupru pentru gaze medicale sau vid
- **SR EN ISO 14644-1** — clase de puritate a aerului în încăperi curate
- **Ordinul MS 914/2006** (cu modificările din Ordinele MS 1096/2016 și 961/2016) — condiții pe care trebuie să le îndeplinească un spital pentru autorizarea sanitară de funcționare, inclusiv circuitele funcționale, ventilația, apa și sterilizarea
- **NP 015-1997** — normativ privind proiectarea și verificarea construcțiilor spitalicești

**Instalații termice și ventilare:**
- I13/2015 — instalații de încălzire centrală
- I5/2022 — instalații de ventilare și climatizare
- SR EN 16798-1/3, DIN 1946-4 — performanța energetică și calitatea aerului interior în clădiri de sănătate
- SR 1907-1/2 — necesar de căldură, zonare climatică
- C107/1…6 — calcul termotehnic al elementelor de construcție

**Instalații electrice și curenți slabi:**
- I7/2011 — instalații electrice cu tensiuni până la 1.000 V c.a.
- **SR HD 60364-7-710** — instalații electrice în locații cu destinație medicală
- I6/2021, Legea 123/2012 — branșamente și instalații de gaze naturale/energie
- NP 061/2002, SR EN 12464-1 — iluminatul artificial
- I20-2000, SR EN 62305-1…4 — protecția la trăsnet

**Securitate la incendiu:**
- P118-1/2013, P118-2/2013, P118-3/2015; NP 061

**Fezabilitate, eficiență energetică, mediu:**
- Legea 372/2005, Mc 001/2006 — performanța energetică, nZEB
- HG 571/2016 — clasificarea nivelurilor de urgență
- HG 907/2016 — conținutul-cadru al documentațiilor tehnico-economice

### 1.6. Parametrii climatici și de confort de calcul

| Parametru | Valoare | Sursă/observație |
|---|---|---|
| Temperatura exterioară de calcul iarnă (θe) | **−18 °C** | SR 1907-1, amplasament climatic de referință |
| Temperatura interioară — săli de operație | 22…24 °C, reglabilă 18…26 °C pe procedură | I5, cerință specifică cap. 8.4 |
| Temperatura interioară — ATI | 24 °C | Ordinul MS 914 |
| Temperatura interioară — saloane | 22 °C | I13 |
| Temperatura interioară — sală de naștere/neonatologie | 24…26 °C | protecția termică a nou-născutului |
| Temperatura interioară — coridoare | 20 °C | I13 |
| Temperatura interioară — băi/grupuri sanitare | 24 °C | I13 |
| Temperatura interioară — spații tehnice | 15 °C | I13 |
| Umiditate relativă — săli de operație | 45…55 % | I5, controlul static și confort chirurgical |
| Nivel de zgomot de fond admis — saloane/ATI | ≤35 dB(A) zi / ≤30 dB(A) noapte | recomandare OMS pentru unități de sănătate, cap. 16 |
| Temperatura apei reci la intrare | +10 °C | STAS 1478 |
| Temperatura de stocare/livrare ACM | 60 °C, cu șoc termic ≥70 °C | I9, regim antilegionella, cap. 3 |

### 1.7. Principii de proiectare specifice instalațiilor medicale

Proiectarea instalațiilor urmează, consecvent în toate capitolele următoare, un set de principii adaptate specificului unei clădiri medicale, complementare celor de arhitectură și structură:

- **Nicio pană să nu pună în pericol un pacient critic** — principiul-cadru din care derivă toată arhitectura de redundanță a capitolelor 2-9, reluat explicit ori de câte ori se justifică o soluție cu cost/complexitate superioare celor uzuale.
- **Separarea fizică a fluxurilor septic/aseptic** — nu doar arhitectural (memoriul de arhitectură), ci și la nivelul instalațiilor: canalizare separată pe categorii de risc (cap. 5), ventilare fără recirculare între zone de puritate diferită (cap. 8), rețele de apă tratată fără brațe moarte (cap. 4).
- **Identitate neechivocă a fiecărui fluid/gaz la punctul de utilizare** — cod de culoare, profil mecanic unic al prizelor de gaze medicale (cap. 6.9), etichetare a tablourilor electrice pe categorie (vital/neîntreruptibil/normal, cap. 9.6) — orice eroare de identificare la patul unui pacient poate fi fatală, motiv pentru care sistemul este proiectat să facă eroarea de conectare *fizic imposibilă*, nu doar improbabilă prin instruire.
- **Monitorizare continuă (BMS) a parametrilor de siguranță a vieții** — presiuni de cascadă în zonele curate, alarme de gaze medicale, temperaturi ACM antilegionella, stare surse electrice — tratată transversal la capitolul 13.4, cu alarme redundante la nivel operațional, clinic și de urgență.
- **Proporționalitate a redundanței cu consecința avariei** — exact ca la orice clădire, dar cu pragul de consecință mult mai jos: chiar și consumatori aparent secundari (iluminatul unei săli de operație, ventilarea unei camere de izolare) sunt tratați ca sarcini de siguranță, nu ca sarcini de confort.

---

## 2. Instalații sanitare — alimentare cu apă rece

### 2.1. Sursa dublă și schema generală

Alimentarea cu apă rece a unității medicale se face printr-un **branșament dublu la rețeaua publică de distribuție** — două artere de alimentare distincte, racordate în cămine separate, la o presiune de regim de **2,5…3,5 bar**. Dublarea branșamentului, măsură care nu s-ar justifica la o clădire cu funcțiune obișnuită, este impusă exact de principiul stabilit la capitolul 1.4: apa este o utilitate care nu tolerează întrerupere la o unitate cu bloc operator (spălare chirurgicală, sterilizare) și cu paturi de spitalizare — o avarie la nivelul rețelei publice, pe o singură arteră, nu trebuie să întrerupă alimentarea clădirii. Măsurarea generală se face prin **apometru DN100 pe artera principală și DN40 pe artera secundară de rezervă**, cu vane de secționare care permit comutarea manuală/automată între cele două surse la camera tehnică a hidroforului, situată la subsol.

### 2.2. Determinarea necesarului de apă pe categorii de consumatori (ΣE și consum specific)

Necesarul de apă al unității medicale se determină, conform I9 și STAS 1478, prin sumarea consumului pe cele opt mari categorii funcționale identificate la capitolul 1.1, fiecare cu un consum specific normat propriu, radical diferit de la o categorie la alta:

| Categorie de consumatori | Compunere | Consum specific | Total (litri/zi) |
|---|---|---|---|
| Paturi de spitalizare | 90 paturi | 400 l/pat·zi | 36.000 |
| Posturi ATI | 8 posturi | 750 l/post·zi (igienă pacient imobilizat, dializă locală, spălare frecventă) | 6.000 |
| Personal medical/auxiliar | 220 persoane/schimb | 60 l/persoană·zi | 13.200 |
| Pacienți ambulatoriu | 300 pacienți/zi | 15 l/pacient | 4.500 |
| Săli de operație | 3 săli | 400 l/sală·zi (spălare chirurgicală, spălare sală între intervenții) | 1.200 |
| Bucătărie/oficii de etaj | 400 mese/zi | 25 l/masă | 10.000 |
| Spălătorie | — | — | 8.000 |
| Sterilizare centrală + laborator | — | — | 5.000 |
| **TOTAL** | — | — | **≈ 94.000 l/zi = 94 mc/zi** |

Suma acestor opt componente, care reflectă exact profilul de consum eterogen al unei clădiri medicale (de la igiena de bază a unui pacient ambulatoriu, cu 15 litri/zi, până la un post ATI, cu 750 litri/zi — un raport de 1 la 50 între cele două extreme funcționale), conduce la un **necesar zilnic de calcul de ~94 mc/zi**.

### 2.3. Debitul zilnic maxim și debitul orar maxim

Consumul zilnic mediu de 94 mc/zi nu este uniform distribuit pe cele 365 de zile ale anului (variații sezoniere de ocupare, campanii de intervenții programate) și nici pe cele 24 de ore ale zilei (vârfuri de dimineață la igiena pacienților, vârfuri de prânz la bucătărie, activitate chirurgicală concentrată în intervalul de dimineață-prânz). Se aplică, pentru trecerea de la consumul mediu zilnic la debitul de dimensionare:

**Debitul zilnic maxim**: Q_zi,max = k_zi × Q_zi,med = 1,15 × 94 = **108,1 mc/zi**

unde coeficientul de neuniformitate zilnică **k_zi = 1,15** reflectă variația moderată a activității medicale între zilele calendaristice (spre diferență de o clădire cu activitate puternic sezonieră, un spital funcționează cu o ocupare relativ constantă tot anul, motiv pentru care coeficientul adoptat este mai apropiat de unitate decât la o clădire de agrement).

**Debitul orar maxim**: Q_orar,max = k_orar × Q_zi,max/24 = 2,0 × 108,1/24 = **9,0 mc/h**

unde coeficientul de neuniformitate orară **k_orar = 2,0** reflectă concentrarea activității pe intervalul diurn (igienă de dimineață, activitate chirurgicală, vizite) față de activitatea redusă, dar niciodată nulă, din intervalul nocturn — un spital nu are, spre diferență de o clădire de birouri, un interval de consum practic zero, dat fiind că ATI, urgențele și îngrijirea de bază a pacienților spitalizați continuă neîntrerupt.

### 2.4. Debitul instantaneu de calcul (echivalenți de debit)

Pentru dimensionarea hidraulică a rețelei interioare (diametre de conductă, presiune necesară, dimensionare hidrofor) se folosește metoda echivalenților de debit (ΣE), care ține cont de simultaneitatea reală de utilizare a obiectelor sanitare — nu toate cele câteva sute de obiecte sanitare ale clădirii sunt folosite simultan, iar debitul de calcul reflectă probabilitatea statistică de utilizare concurentă. Pentru suma echivalenților de debit ai instalației (**ΣE ≈ 620**, valoare rezultată din însumarea echivalenților normați ai tuturor obiectelor sanitare ale celor 90 de paturi, 8 posturi ATI, 3 săli de operație, ambulatoriu, bucătărie, spălătorie și sterilizare), debitul instantaneu de calcul rezultă:

**qc = a·√ΣE + 0,004·ΣE (l/s)** ≈ **17,3 l/s**

Această valoare — mult superioară debitului orar mediu calculat mai sus (9,0 mc/h = 2,5 l/s) — reflectă exact rațiunea metodei echivalenților de debit: dimensionarea rețelei și a hidroforului trebuie să acopere vârful instantaneu de utilizare simultană (de exemplu, mai multe săli de operație spălate concomitent, dimineața, în timp ce sterilizarea centrală rulează cicluri de spălare și mai multe saloane își desfășoară igiena de dimineață), nu doar media orară — un debit dimensionat strict pe media orară ar produce cădere de presiune inacceptabilă exact în momentele de vârf real ale activității clinice.

### 2.5. Rezerva de apă — consum curent și rezerva de incendiu

Volumul rezervorului de apă al clădirii cumulează două componente distincte, care nu se pot amesteca funcțional (cap. 2.6), dar care se dimensionează, orientativ, ca sumă pentru determinarea capacității totale a gospodăriei de apă de la subsol:

- **Rezerva de consum curent**, dimensionată pentru autonomie de **24 de ore** la debitul zilnic maxim: 108 mc — cerință directă a principiului de redundanță de la capitolul 1.4 (Utilitate „Apă": rezervă ≥24 h, întrerupere admisă 0 secunde), care garantează funcționarea neîntreruptă a clădirii chiar în cazul unei avarii simultane a ambelor artere de branșament (scenariu rar, dar posibil la rețele publice vechi sau la lucrări planificate neanunțate), pe durata necesară intervenției de remediere sau a aprovizionării de urgență cu cisterne.
- **Rezerva de apă pentru incendiu**, compusă din trei componente dimensionate de scenariul de securitate la incendiu (nereluat aici în detaliu): hidranți interiori (90 mc), hidranți exteriori (54 mc) și sprinklere (108 mc), însumând **V_PSI = 90 + 54 + 108 = 252 mc**.

**Volumul total al rezervorului**: V_total = 108 + 252 = **360 mc**, executat în **două rezervoare a câte 180 mc**, soluție care nu este doar o măsură de redundanță (posibilitatea de a izola un rezervor pentru mentenanță/curățare fără a întrerupe alimentarea clădirii — apa stagnantă într-un rezervor unic, needivizat, ar ridica, de altfel, un risc suplimentar de proliferare bacteriană, relevant inclusiv pentru tema antilegionella tratată la capitolul 3), ci și o cerință practică de execuție (transportul și montarea unui rezervor unic de 360 mc ar fi disproporționat față de accesul disponibil la subsolul clădirii).

### 2.6. Hidroforul — configurația 2A+1R și calculul presiunii necesare

**Presiunea necesară** la cel mai defavorabil consumator (etajul 4, cel mai înalt punct de utilizare al clădirii) se determină din suma a patru componente:

H_nec = H_geodezic + H_pierderi_liniare + H_pierderi_locale + H_utilizare = 15,6 + 8,5 + 3,0 + 15,0 = **42,1 mCA (4,2 bar)**

unde H_geodezic ≈ 15,6 m reprezintă diferența de cotă până la etajul 4 (regim S+P+4E, ~3,90 m înălțime medie de nivel), H_pierderi_liniare ≈ 8,5 m acoperă pierderile de sarcină liniare pe traseul coloanei verticale principale, H_pierderi_locale ≈ 3,0 m acoperă pierderile locale (coturi, teuri, robineți, contor, filtre), iar H_utilizare = 15,0 m (1,5 bar) reprezintă presiunea minimă de serviciu necesară la robinetul/dușul cel mai defavorabil, valoare superioară presiunii de confort a unei locuințe obișnuite, dat fiind că anumite echipamente medicale (sisteme de spălare chirurgicală cu jet controlat, anumite echipamente de sterilizare cu alimentare directă) necesită o presiune minimă garantată pentru funcționare corectă.

Deoarece presiunea disponibilă din rețeaua publică (2,5…3,5 bar, cap. 2.1) este insuficientă pentru a asigura cei 4,2 bar necesari la etajul 4, alimentarea directă este exclusă și se adoptă un **grup de pompare (hidrofor) cu presiune variabilă (VSD)**:

| Parametru | Valoare |
|---|---|
| Configurație | **3 pompe centrifuge multietajate identice, 2 active + 1 rezervă (2A+1R)**, comandă prin convertizor de frecvență |
| Debit de calcul | Q = 17,5 l/s (acoperitor pentru qc = 17,3 l/s calculat la cap. 2.4) |
| Presiune de refulare (H) | 43 mCA |
| Vas de expansiune membrană | 500 litri |
| Regim de comandă | presiune constantă (senzor pe colectorul de refulare), rotație automată a pompei „lider" pentru uzură egală |
| Alimentare electrică | **tablou vital** (sursă redundantă rețea+generator, cap. 9) |

Configurația **2A+1R** — spre diferență de o soluție cu o singură pompă activă și una de rezervă (1A+1R), care ar fi suficientă la o clădire obișnuită — a fost adoptată aici pentru a acoperi două scenarii cumulate, tipice unei clădiri medicale cu activitate continuă: (a) vârful de debit instantaneu (17,3 l/s) necesită, funcție de curba de pompă adoptată, funcționarea simultană a două pompe pentru a asigura atât debitul, cât și presiunea de refulare la valorile de proiect, fără suprasolicitarea unei singure pompe la limita curbei sale de funcționare; (b) chiar și în regimul normal, cu o singură pompă activă (consum redus, de noapte), a doua pompă activă rămâne disponibilă instantaneu pentru comutare fără întrerupere de presiune, în timp ce a treia pompă (rezervă) acoperă scenariul de avarie a uneia dintre cele două pompe active — asigurând astfel că instalația nu depinde, în niciun moment al zilei, de funcționarea corectă a unui singur echipament.

### 2.7. Distribuția interioară — materiale, coloane, sectorizare

Distribuția orizontală de la camera tehnică a hidroforului la nucleele verticale se realizează în conducte de **oțel zincat sau PP-R armat**, dimensionate la presiunea de regim de 43 mCA, cu coloane verticale dedicate fiecărui nucleu funcțional al clădirii — o coloană separată pentru blocul operator/ATI (etajul 1, grupa medicală 2, cu cerință de continuitate maximă), coloane separate pentru fiecare etaj de spitalizare și o coloană dedicată zonei tehnice/sterilizării de la subsol. Această **sectorizare pe coloane independente**, dincolo de rațiunea hidraulică obișnuită, permite izolarea unei singure coloane pentru mentenanță (înlocuirea unui robinet, o reparație locală) fără a întrerupe alimentarea celorlalte zone ale clădirii — o cerință practică derivată direct din principiul de continuitate stabilit la capitolul 1.4: o intervenție de mentenanță programată la etajul 3 de spitalizare nu trebuie, niciodată, să întrerupă alimentarea cu apă a blocului operator de la etajul 1.

---

## 3. Prepararea și distribuția apei calde de consum (ACM) — regimul antilegionella

### 3.1. De ce ACM este, la un spital, o temă de siguranță sanitară, nu doar de confort

La o clădire obișnuită, prepararea apei calde de consum este o instalație de confort, dimensionată pe criterii pur termice și hidraulice. La o unitate medicală cu pacienți spitalizați, dintre care o parte semnificativă imunodeprimați (pacienți post-operatori, pacienți oncologici, pacienți vârstnici cu comorbidități, nou-născuți din secția de neonatologie, pacienți ATI cu apărare imunitară redusă de boala critică însăși), **rețeaua de ACM devine o potențială cale de transmitere a unei infecții cu consecințe grave — legioneloza** — motiv pentru care regimul termic al ACM este tratat, în prezentul memoriu, ca o cerință de siguranță sanitară de prim ordin, la același nivel de rigoare ca gazele medicale sau IT-ul medical, nu ca o notă administrativă anexă breviarului termic.

### 3.2. Biologia bacteriei Legionella pneumophila și vulnerabilitatea pacientului imunodeprimat

*Legionella pneumophila* este o bacterie gram-negativă, cu habitat natural în apele de suprafață și subterane, care colonizează frecvent rețelele de distribuție a apei calde din clădiri — în special porțiunile de rețea cu **stagnare** (brațe moarte, „dead-legs") și cu **temperatură în intervalul critic de proliferare, aproximativ 20…45 °C, cu un optim de multiplicare în jurul a 35…37 °C**. Bacteria nu se transmite prin ingestie, ci prin **inhalarea de aerosoli fini de apă contaminată** (produși tipic de dușuri, robinete cu jet pulverizat, sisteme de umidificare) care ajung direct în plămâni, unde provoacă fie o pneumonie severă (boala legionarilor, cu mortalitate semnificativă la pacienții vulnerabili), fie o formă mai ușoară, autolimitantă (febra Pontiac). La temperaturi **peste 60 °C, bacteria este distrusă rapid** (inactivare termică), motiv pentru care întregul regim de proiectare al ACM descris în continuare este construit în jurul menținerii temperaturii apei calde permanent în afara ferestrei critice de 20…45 °C, oriunde este posibil, și al eliminării stagnării.

Pacienții unei unități medicale de acest tip prezintă un risc de infecție mult superior populației generale: pacienții post-operatori (imunitate temporar redusă de trauma chirurgicală și de anestezie), pacienții oncologici sau transplantați aflați în tratament imunosupresor, pacienții vârstnici cu boli pulmonare cronice, nou-născuții (sistem imunitar imatur) și, mai ales, **pacienții din terapia intensivă, adesea ventilați mecanic**, la care o infecție pulmonară suplimentară, survenită pe fondul unei insuficiențe respiratorii deja existente, poate fi rapid fatală. Acesta este exact motivul pentru care ATI (Grupa medicală 2) primește, la fel ca la gazele medicale și la electricitate, cel mai riguros regim de tratare a apei calde din întreaga clădire.

### 3.3. Necesarul zilnic de ACM

Necesarul zilnic de ACM (la temperatura de stocare de 60 °C, Δt = 60 − 10 = 50 K) se determină prin aceeași metodă de sumare pe categorii funcționale folosită la apa rece (cap. 2.2), cu consumuri specifice de apă caldă corespunzătoare fiecărei categorii:

| Categorie | Compunere | Consum specific ACM | Total (litri/zi) |
|---|---|---|---|
| Paturi de spitalizare | 90 paturi | ~250 l/pat·zi | 22.500 |
| Posturi ATI | 8 posturi | ~300 l/post·zi | 2.400 |
| Personal medical/auxiliar | 220 persoane | ~40 l/persoană·zi | 8.800 |
| Pacienți ambulatoriu | 300 pacienți | ~10 l/pacient | 3.000 |
| Săli de operație | 3 săli | ~150 l/sală·zi | 450 |
| Sterilizare, bucătărie, rezervă | — | — | 4.850 |
| **TOTAL** | — | — | **≈ 42.000 l/zi = 42 mc/zi** |

**Necesarul termic zilnic**, la Δt = 50 K:

Φ_ACM,zi = m·c·Δt/(24·3.600) exprimat convenabil prin puterea medie: **Q_ACM = 42.000 l × 1,163 Wh/(l·K) × 50 K / (24 h × 1.000) = 101,8 kW mediu**

unde constanta **1,163 Wh/(kg·K)** reprezintă căldura specifică a apei exprimată în unități electrice (1 kWh = 860 kcal, iar căldura specifică a apei este 1 kcal/kg·K, deci 1/860 kWh/kg·K = 1,163 Wh/kg·K) — formă de calcul echivalentă, dar mai directă pentru verificarea puterii electrice/termice instalate, decât exprimarea în kilocalorii.

### 3.4. Factorul de vârf orar — de ce spitalul are un profil diferit de cel al unei clădiri hoteliere

Spre diferență de o clădire hotelieră, unde cererea de ACM are un vârf puternic concentrat în fereastra de check-out de dimineață (factor de vârf orar tipic k_peak ≈ 8, dat fiind că majoritatea oaspeților fac duș într-un interval scurs de 1-2 ore), o unitate medicală are un profil de cerere **mai distribuit pe parcursul zilei**: igiena pacienților spitalizați se eșalonează pe tot parcursul dimineții (nu toți cei 90 de pacienți fac duș simultan, ci pe rând, în funcție de programul de îngrijire al fiecărui etaj), bucătăria funcționează pe trei mese principale distribuite pe zi, iar sterilizarea centrală și blocul operator au un consum aproape continuu pe parcursul programului chirurgical. Din acest motiv, se adoptă pentru unitatea medicală un **factor de vârf orar k_peak = 3,0**, sensibil mai redus decât la o clădire hotelieră, dar superior celui al unei clădiri de birouri (unde consumul de ACM este marginal):

Q_ACM,orar,mediu = 42.000/24 = **1.750 l/h**

**Q_ACM,orar,vârf = k_peak × Q_ACM,orar,mediu = 3,0 × 1.750 = 5.250 l/h**

**Puterea instantanee de vârf**, dacă întreaga cerere ar trebui produsă fără nicio acumulare (preparare instant, caz de referință nefavorabil, echivalent celui folosit la dimensionarea buclei principale a instalației):

Φ_vârf,instant = Q_ACM,orar,vârf × 1,163 × 50 / 1.000 = 5.250 × 1,163 × 50/1.000 = **305,3 kW ≈ 305 kW**

Această valoare de vârf (~305 kW, de aproape trei ori puterea medie de 101,8 kW) confirmă exact concluzia stabilită și la clădirea hotelieră analizată separat: o sursă dedicată exclusiv preparării instant a ACM la puterea de vârf ar fi disproporționată față de necesarul termic al restului clădirii (cap. 7, ~895 kW total, din care doar o parte este ACM) și ar funcționa la o fracțiune redusă din capacitate în restul zilei — motiv pentru care soluția adoptată este **preparare cu acumulare tampon**, care nivelează vârful prin stocarea prealabilă a unei rezerve de apă caldă.

### 3.5. Soluția de acumulare — 2 boilere de 3.000 litri în redundanță

Se adoptă **2 boilere a câte 3.000 litri, execuție inox 316L** (rezistență superioară la coroziune și la agresivitatea chimică a tratamentelor periodice de dezinfecție, față de un oțel emailat obișnuit), montate în **configurație de redundanță N+1** — nu doar pentru capacitate termică suplimentară, ci pentru a garanta, exact ca la hidrofor (cap. 2.6), că o defecțiune sau o operațiune de mentenanță/dezinfecție programată la un boiler nu întrerupe alimentarea cu apă caldă a întregii clădiri: cele două boilere pot funcționa în paralel (regim normal, capacitate cumulată maximă) sau independent, unul preluând integral sarcina în timp ce celălalt este izolat pentru inspecție, curățare de depuneri sau intervenție tehnică. Volumul cumulat de 6.000 litri, la Δt = 50 K, stochează o energie de E_stoc = 6.000 × 1,163 × 50/1.000 = **349 kWh**, capacitate care, cumulată cu puterea de producție continuă a schimbătoarelor alimentate din sursa termică centrală (cap. 7), acoperă confortabil vârful orar de 305 kW calculat mai sus pe fereastra limitată în care acesta survine.

### 3.6. Regimul antilegionella — temperaturi, șoc termic, mitigatoare

Regimul de temperatură al ACM se stabilește, cumulat, pe patru paliere, fiecare cu rolul său specific în lanțul de prevenire a proliferării bacteriene descris la capitolul 3.2:

- **Temperatura de preparare și stocare în boilere: ≥60 °C** — peste pragul de inactivare termică rapidă a Legionellei (cap. 3.2), astfel încât rezerva de apă caldă acumulată nu constituie, în sine, un focar de proliferare.
- **Temperatura de retur a buclei de recirculare: ≥55 °C**, verificată la cel mai îndepărtat punct de retur al rețelei (etajul 4, coloana cea mai lungă) — sub acest prag, temperatura ar coborî, pe traseul lung de recirculare, în zona critică de proliferare (20…45 °C) înainte de a reveni la boiler, motiv pentru care se instalează un senzor de temperatură pe conducta de retur, cu **alarmă tehnică automată pe BMS** (cap. 13.4) dacă temperatura măsurată scade sub 55 °C.
- **Șocul termic periodic automatizat**: ridicarea temperaturii întregii acumulări la **≥70 °C, menținută minimum 3 minute**, comandată automat de BMS, de regulă pe timp de noapte (consum minim, fără disconfort la robinet pentru pacienți/personal), cu frecvență programată (recomandare săptămânală) și, obligatoriu, imediat după orice intervenție de mentenanță pe boilere sau după orice rezultat de laborator care indică o contaminare — procedura de șoc termic reprezintă „reset-ul" periodic al întregii rețele, care elimină o eventuală colonizare incipientă înainte ca aceasta să atingă un nivel clinic relevant.
- **Mitigatoare (regulatoare termostatice antiopărire) la punctul final de consum: 38…43 °C** — dat fiind că temperatura menținută pe toată bucla de distribuție (60…70 °C) este net superioară temperaturii sigure de contact cu pielea umană (o expunere la apă de peste 50 °C provoacă arsuri în câteva secunde, risc amplificat la pacienții cu sensibilitate cutanată redusă — vârstnici, diabetici, pacienți sub sedare), fiecare punct final de utilizare (baterie de duș/cadă în saloane, chiuvete de spălare chirurgicală) este echipat cu un mitigator care amestecă apa caldă de rețea cu apă rece, livrând la robinet o temperatură sigură de 38…43 °C, fără a compromite regimul termic ridicat menținut pe restul rețelei.

Combinația acestor patru măsuri — temperatură ridicată la sursă, temperatură de retur monitorizată, șoc termic periodic și protecție antiopărire locală — permite menținerea unui regim termic sever pe toată rețeaua (condiție necesară pentru siguranța sanitară) fără a expune niciun pacient sau membru al personalului la riscul de opărire, cele două cerințe fiind astfel satisfăcute simultan, nu prin compromis.

### 3.7. Bucla de recirculare — eliminarea brațelor moarte

Recircularea ACM pe cele patru niveluri de spitalizare se organizează pe câte o coloană de recirculare per nucleu de riseruri, cu **pompă de recirculare dedicată, funcționare continuă (nu pe temporizator)**, dat fiind regimul de funcționare 24/7 al clădirii — o întrerupere nocturnă a recirculării, acceptabilă la o clădire de birouri, ar permite exact răcirea rețelei în intervalul critic de proliferare descris la capitolul 3.2, motiv pentru care recircularea ACM la o unitate medicală rulează neîntrerupt, verificată permanent prin senzorii de temperatură de retur conectați la BMS. Toate ramurile de distribuție se proiectează cu recirculare activă cât mai aproape de ultimul punct de consum, iar orice ramură terminală neevitabilă (racordul de la coloana de recirculare la robinetul final) se limitează la un **volum de sub 3 litri** — prag general acceptat sub care riscul de stagnare termică relevantă pentru proliferarea bacteriană devine neglijabil, chiar și fără recirculare activă pe acel segment scurt.

---

## 4. Apă tratată pentru utilizări medicale speciale

### 4.1. Apa demineralizată pentru sterilizare

Sterilizarea centrală (cap. 1.2, situată la subsol, cu puncte secundare de etaj) necesită apă de proces **demineralizată, cu conductivitate electrică sub 5 µS/cm** — o exigență impusă nu de un standard estetic, ci de riscul depunerilor minerale (calcar, silice) pe instrumentarul chirurgical și în interiorul autoclavelor, care ar compromite atât calitatea sterilizării (formarea de pete și depuneri pe instrumentar, vizibile chiar și după un ciclu corect de sterilizare, sursă de neconformitate la controlul de calitate) cât și durata de viață a echipamentelor de sterilizare (depunerile calcaroase pe rezistențele electrice și pe schimbătoarele interne ale autoclavelor reduc eficiența termică și pot cauza defecțiuni premature). Tratarea se realizează printr-un lanț **osmoză inversă (RO) urmată de deionizare**, dimensionat la un debit de **1,5 mc/h**, suficient pentru a acoperi ciclurile concurente ale autoclavelor centralei de sterilizare la vârful de activitate al programului chirurgical.

### 4.2. Apa ultrapură pentru laborator

Laboratorul de analize medicale necesită, pentru o parte din determinările sale (în special testele analitice de înaltă precizie, unde chiar urme de ioni sau de contaminanți organici din apa de diluție ar denatura rezultatul), **apă ultrapură tip I, cu conductivitate sub 0,1 µS/cm** — un ordin de mărime mai pur decât apa demineralizată de sterilizare, obținut printr-un lanț de tratare mai complex: **osmoză inversă + electrodeionizare (EDI) + tratare UV** (pentru distrugerea eventualilor contaminanți biologici reziduali), dimensionat la un debit mai redus, de **0,3 mc/h**, corespunzător consumului punctual, nu continuu, al aparatelor de laborator.

### 4.3. Apa pentru dializă

Pentru pacienții care necesită hemodializă (fie ca serviciu dedicat, fie ca suport pentru pacienții cu insuficiență renală acută din ATI), apa de dializă trebuie tratată la un standard special, dat fiind că, spre diferență de orice altă utilizare a apei în clădire, **apa de dializă intră în contact direct cu sângele pacientului prin membrana semipermeabilă a dializorului** — orice contaminant chimic sau biologic din apă poate trece, la concentrații periculoase, direct în circulația sangvină a pacientului, un risc absent la utilizarea normală, orală sau de igienă, a apei. Se adoptă un lanț de tratare cu **osmoză inversă în două trepte**, dimensionat la **0,8 mc/h**, cu monitorizare continuă a conductivității și a parametrilor microbiologici, conform practicii consacrate pentru unitățile de dializă.

### 4.4. Apa pentru umidificarea aerului tratat

Unitățile de tratare a aerului (AHU) care deservesc zonele critice ale clădirii (bloc operator, ATI, cap. 8) necesită umidificare cu **abur igienic produs din apă tratată (RO + UV)**, nu din apă potabilă netratată — utilizarea apei netratate la umidificatoarele cu abur ar introduce în fluxul de aer distribuit direct în sala de operație exact tipul de contaminanți (minerale dizolvate, eventuali contaminanți biologici) pe care întregul sistem de filtrare HEPA (cap. 8.5) este proiectat să îi excludă, anulând parțial rațiunea filtrării de înaltă eficiență.

### 4.5. Bucla inox 316L continuă, fără brațe moarte

Toate cele patru circuite de apă tratată descrise mai sus (sterilizare, laborator, dializă, umidificare) sunt alimentate dintr-o **buclă de distribuție unică, în oțel inoxidabil austenitic AISI 316L, cu circulație continuă și fără brațe moarte** — soluție tehnică justificată de aceeași logică microbiologică discutată la capitolul 3.2 pentru ACM: apa tratată (demineralizată sau ultrapură), lipsită de clorul rezidual dezinfectant prezent în apa potabilă de rețea, este, paradoxal, **mai vulnerabilă la colonizare bacteriană și la formarea de biofilm** decât apa potabilă netratată, exact pentru că procesul de tratare (osmoză inversă, deionizare) elimină și dezinfectantul rezidual protector. O secțiune de rețea stagnantă (braț mort) în bucla de apă tratată ar deveni, în câteva zile, un focar de biofilm bacterian greu de eradicat prin dezinfecție ulterioară — motiv pentru care execuția impune circulație permanentă pe întreaga buclă, cu retur către instalația de tratare, fără segmente terminale needucate de la principiul de circulație continuă.

---

## 5. Canalizare — sisteme separate și tratare specifică

### 5.1. Principii generale — patru rețele distincte

Canalizarea interioară a unității medicale este organizată, spre diferență de o clădire obișnuită cu o singură rețea de canalizare menajeră, în **patru rețele fizic separate**, fiecare cu o destinație finală și un regim de tratare propriu, dictate de natura radical diferită a riscului asociat fiecărui tip de apă uzată:

1. **Canalizare menajeră** obișnuită (grupuri sanitare, bucătărie fără grăsimi) — evacuare directă la rețeaua publică, fără tratare specială.
2. **Canalizare infecțioasă/septică**, de la secțiile cu risc biologic ridicat (boli infecțioase, dacă există în programul funcțional, microbiologie de laborator, morgă) — tratată prin **decontaminare termică sau chimică înainte de deversare** în rețeaua publică, pentru a preveni evacuarea necontrolată de agenți patogeni în mediu.
3. **Canalizare radioactivă**, de la secția de medicină nucleară (dacă unitatea include imagistică cu izotopi radioactivi) — colectată în **bazine de decădere**, dimensionate și monitorizate conform principiului fizic detaliat la capitolul 5.3.
4. **Canalizare tehnologică grasă**, de la bucătărie — tratată printr-un **separator de grăsimi** dedicat (cap. 5.4).

La acestea se adaugă **canalizarea pluvială** (cap. 5.5), complet separată de cele patru rețele de mai sus, colectând exclusiv apa meteorică de pe acoperiș și platforme.

### 5.2. Canalizarea infecțioasă/septică — decontaminare înainte de deversare

Apele uzate provenite din secțiile/laboratoarele cu risc biologic ridicat — în principal microbiologia de laborator (culturi bacteriene, medii de cultură contaminate) și morga (fluide biologice cu risc infecțios necunoscut) — nu pot fi evacuate direct în rețeaua publică de canalizare, exact așa cum nu se poate evacua direct un deșeu medical solid fără tratare prealabilă. Se prevede, pe traseul acestor rețele dedicate, o **stație de decontaminare** — termică (autoclavare a efluentului la temperatură și presiune ridicată, similar principiului de sterilizare a instrumentarului, cap. 4.1) sau chimică (dozare de dezinfectant, cu timp de contact suficient pentru inactivarea agenților patogeni) — înainte de unirea cu colectorul general de canalizare menajeră. Alegerea între cele două tehnologii (termică versus chimică) se face la faza de proiect tehnic, în funcție de profilul microbiologic concret al secțiilor deservite, stabilit de medicul epidemiolog al unității.

### 5.3. Canalizarea radioactivă — fizica dezintegrării și dimensionarea bazinelor de decădere

Dacă programul funcțional al unității include o componentă de **medicină nucleară** (investigații/tratamente cu izotopi radioactivi administrați pacientului, care sunt ulterior excretați parțial prin urină), apele uzate provenite de la grupurile sanitare dedicate acestor pacienți conțin urme de radioactivitate care nu pot fi evacuate direct în rețeaua publică — nu pentru că nivelul de radioactivitate ar fi imediat periculos (dozele administrate în scop diagnostic sunt mici), ci pentru că reglementarea radioprotecției (sub autoritatea CNCAN, cap. 19.3) impune ca orice evacuare de material radioactiv în mediu să fie redusă, prin decădere naturală, sub un prag de exceptare reglementat, înainte de a părăsi incinta controlată a unității.

**Principiul fizic** care guvernează dimensionarea este cel al **dezintegrării radioactive exponențiale**, descris de relația:

**N(t) = N₀ · 2^(−t/T½)**

unde N₀ este activitatea inițială, N(t) activitatea rămasă după timpul t, iar T½ este **timpul de înjumătățire (perioada de semidezintegrare)** al izotopului — intervalul de timp după care jumătate din nucleele radioactive inițiale s-au dezintegrat. Pentru cel mai frecvent izotop utilizat în medicina nucleară cu risc de excreție urinară semnificativă, **Iod-131, cu T½ = 8 zile**, activitatea rămasă după un număr n de perioade de înjumătățire este:

| Număr de T½ | Timp (zile) | Fracție rămasă |
|---|---|---|
| 1 | 8 | 50 % |
| 3 | 24 | 12,5 % |
| 5 | 40 | 3,1 % |
| 10 | 80 | **≈0,098 % (1/1.024)** |

**De ce se adoptă exact 10 perioade de înjumătățire ca prag de stocare.** După 10 semiperioade, fracția de activitate rămasă din materialul inițial este de doar **(1/2)¹⁰ = 1/1.024 ≈ 0,098 %** — o reducere de peste trei ordine de mărime față de activitatea inițială, considerată, conform practicii internaționale de radioprotecție și ghidurilor AIEA preluate în reglementarea națională, drept nivel la care activitatea reziduală devine neglijabilă și evacuarea în rețeaua publică de canalizare nu mai constituie un risc radiologic relevant. Pentru I-131 (T½ = 8 zile), acest prag corespunde unei **perioade de stocare în bazinul de decădere de ≥10 × 8 = 80 de zile**. Bazinele de decădere se dimensionează, prin urmare, cu un volum util care asigură acest timp minim de rezidență hidraulică a efluentului (calculat din debitul zilnic estimat al secției de medicină nucleară și din perioada de 80 de zile), organizate în minimum două bazine alternante (unul se umple în timp ce celălalt este în așteptare de decădere, pentru a nu întrerupe fluxul de colectare), cu **monitorizare periodică a radioactivității reziduale** înainte de deversarea efectivă în rețeaua publică — deversarea se face doar după confirmarea, prin măsurătoare directă, că nivelul rezidual se situează sub pragul de exceptare reglementat, nu doar pe baza calculului teoretic de decădere.

### 5.4. Canalizarea tehnologică grasă — separatorul de grăsimi al bucătăriei

Bucătăria/oficiile de etaj ale unității, care deservesc un flux de ~400 de mese/zi (cap. 2.2), evacuează pe canalizare o încărcare de grăsimi și uleiuri alimentare care trebuie separată înainte de racordul la colectorul general, pentru a preveni colmatarea conductelor prin depunere și solidificare la răcire — exact problema tehnică discutată detaliat la bucătăria profesională a clădirii hoteliere de referință, aici cu un debit specific mai redus (bucătăria unui spital deservește hrana pacienților și a personalului, nu un restaurant public de mare capacitate). Dimensionarea urmează aceeași relație normată (SR EN 1825): **NS = Qs · ft · fd · fr**, cu factori adaptați profilului mai moderat al bucătăriei spitalicești, conducând la un **separator de grăsimi de capacitate corespunzătoare** (dimensionare de detaliu la faza PT, funcție de configurația finală a bucătăriei stabilită de arhitectură), amplasat la subsol, cu acces de vidanjare periodică și alarmă de nivel integrată în BMS.

### 5.5. Canalizarea pluvială

Debitul de calcul al canalizării menajere (fără componenta pluvială) rezultă din debitul instantaneu de apă rece calculat la capitolul 2.4, majorat cu un adaos pentru consumatorii tehnologici cu funcționare continuă (sterilizare, laborator, spălătorie) care nu au fost incluși integral în vârful instantaneu al apei reci, fiind debite relativ constante, nu de vârf:

**qc,canal = qc,apă_rece + q_tehnologic = 17,3 + 2,0 = 19,3 l/s**

**Canalizarea pluvială**, complet separată, colectează apa meteorică de pe acoperișul tehnic și platformele exterioare ale clădirii, cu o arie de calcul A ≈ 300 mp, la o intensitate a ploii de calcul i = 0,10 l/s·mp (echivalentul a 100 l/s·ha, valoare climatică de referință pentru amplasament), un coeficient de scurgere ψ = 0,90 (suprafețe impermeabile — terasă hidroizolată, platforme betonate) și un coeficient de neuniformitate/simultaneitate a colectării k_v = 0,80 (aplicat conform practicii STAS 1846 pentru suprafețe mixte de calcul):

**Qp = k_v · A · i · ψ = 0,80 × 300 × 0,10 × 0,90 = 21,6 l/s**

Colectarea pluvială se face prin receptoare de terasă cu parafrunze, repartizate redundant pe suprafața acoperișului tehnic (un receptor colmatat nu trebuie să provoace acumulare de apă pe terasa care adăpostește echipamente tehnice), racordate la coloane verticale de descărcare liberă, complet separate de rețeaua menajeră/infecțioasă/radioactivă descrisă mai sus.

---

## 6. Gaze medicale (SR EN ISO 7396-1) — capitolul cel mai critic

### 6.1. De ce gazele medicale sunt tratate ca instalație de siguranță a vieții

Dintre toate instalațiile unei clădiri medicale, sistemul de gaze medicale este cel cu cea mai directă și mai imediată legătură cu supraviețuirea pacientului: oxigenul livrat la patul unui pacient în insuficiență respiratorie, aerul medical care acționează ventilatorul mecanic al unui pacient din ATI sau vacuumul care asigură aspirația chirurgicală în timpul unei intervenții nu sunt utilități de confort, ci **suporturi vitale directe**, a căror întrerupere are, spre diferență de o pană electrică (care poate fi, teoretic, atenuată de un UPS pentru câteva minute), consecințe imediate și fără nicio marjă de timp de reacție. Din acest motiv, întregul capitol care urmează tratează gazele medicale cu rigoarea unei instalații de siguranță critică, nu ca o simplă rețea de distribuție a unui fluid.

### 6.2. Codul de culori și identitatea anti-încrucișare — de ce eroarea trebuie făcută imposibilă, nu doar improbabilă

Standardul **SR EN ISO 7396-1** impune un cod de culoare distinct pentru fiecare gaz medical, sintetizat în tabelul de mai jos, aplicat consecvent pe toate elementele vizibile ale instalației (conducte, etichete, prize, manometre):

| Gaz | Presiune de regim | Cod de culoare |
|---|---|---|
| Oxigen (O₂) | 4-5 bar | alb |
| Aer medical (AIR-4) | 4-5 bar | negru-alb |
| Aer motor chirurgical (AIR-8) | 7-8 bar | negru-alb |
| Vacuum | −0,6…−0,9 bar | galben |
| Protoxid de azot (N₂O) | 4-5 bar | albastru |
| Dioxid de carbon (CO₂) | 4-5 bar | gri |
| AGSS (evacuare gaze anestezice) | vacuum dedicat | violet |

Codul de culoare, singur, nu este însă suficient pentru a preveni o eroare fatală: sub presiunea unei situații clinice urgente, personalul medical nu are întotdeauna timpul sau vizibilitatea necesară pentru a verifica atent culoarea unei etichete înainte de a conecta un echipament la o priză de perete. Din acest motiv, standardul impune, suplimentar față de codul de culoare, un **profil mecanic unic pentru fiecare tip de priză de gaz** (sistem de tip „pin-index" sau echivalent, în care geometria fișei de conectare a fiecărui gaz este fizic incompatibilă cu prizele celorlalte gaze) — soluție care transformă eroarea de conectare dintr-o eroare *posibilă, dar improbabilă prin instruire și atenție* într-o eroare *fizic imposibilă*: un furtun de oxigen nu poate, din punct de vedere mecanic, fi introdus într-o priză de vacuum sau de aer medical, indiferent de graba sau de nivelul de atenție al personalului în momentul conectării. Această distincție — de la „improbabil" la „imposibil" — este exact principiul de proiectare enunțat generic la capitolul 1.7 și aplicat aici în forma sa cea mai strictă, dat fiind că o eroare de conectare a gazelor la patul unui pacient (de exemplu, livrarea de protoxid de azot sau de vacuum în locul oxigenului) ar putea fi rapid fatală și ar putea trece neobservată exact în intervalul critic al unei manevre medicale urgente.

### 6.3. Oxigenul — tripla redundanță (N+2) și calculul debitului

Conform raționamentului stabilit la capitolul 1.4, oxigenul este singurul gaz medical pentru care se adoptă o **redundanță de trei surse independente (N+2)**:

1. **Sursa principală — vaporizator de incintă (VIE) criogenic**, cu o capacitate de stocare de **5.000 litri de oxigen lichid**, echipat cu **vaporizatoare atmosferice duble** (oxigenul lichid, stocat la temperatură criogenică, este vaporizat la trecerea prin vaporizator înainte de a intra în rețeaua de distribuție gazoasă; dublarea vaporizatoarelor asigură continuitatea vaporizării chiar dacă unul dintre ele se blochează prin îngheț excesiv la debit de vârf prelungit).
2. **Sursa automată de rezervă — rampă de butelii de oxigen comprimat**, cu comutare automată (detecție a scăderii de presiune pe sursa principală și trecere fără întrerupere pe rampa de butelii), care preia sarcina în cazul unei avarii sau al epuizării sursei criogenice principale.
3. **Sursa de avarie — rampă backup manuală + prize NIST de urgență**, ultimă linie de apărare, proiectată explicit să funcționeze independent de orice sursă electrică (spre diferență de VIE și de compresoarele rampei automate, care necesită alimentare electrică pentru monitorizare/comutare), pentru scenariul, discutat la capitolul 1.4, în care o avarie electrică generală ar coincide cu o defecțiune a primelor două surse.

**Calculul debitului de oxigen** se face prin sumarea necesarului fiecărei categorii de utilizatori, la un factor de simultaneitate propriu fiecăreia:

- Săli de operație: 3 săli × 100 l/min/sală (debit maxim la o intervenție cu anestezie generală) = **300 l/min**;
- Posturi ATI: 8 posturi × 100 l/min/post × 0,75 (factor de simultaneitate — nu toate cele 8 posturi ATI funcționează simultan la debitul maxim de oxigen) = **600 l/min**;
- Saloane de spitalizare: 90 paturi × 20 l/min/pat (oxigenoterapie standard) × 0,5 (factor de simultaneitate — doar o parte din pacienți necesită, la un moment dat, oxigenoterapie activă) = **900 l/min**;
- Sală de naștere: 6 posturi × 40 l/min/post = **240 l/min**.

**Debitul total de calcul**: Q_O2 = 300 + 600 + 900 + 240 = **2.040 l/min ≈ 123 mc/h**

**Autonomia sursei principale (VIE)** la acest debit de vârf: rezerva de 5.000 litri de oxigen lichid, care la vaporizare eliberează un volum de gaz de aproximativ 860 de ori volumul său lichid (raportul de expansiune caracteristic oxigenului lichid la vaporizare), asigură o **autonomie de aproximativ 34 de ore la debitul de vârf calculat mai sus** — interval amplu suficient pentru a permite fie repunerea în funcțiune a sursei principale, fie o realimentare programată a rezervorului criogenic, fără a solicita niciodată, în condiții normale de exploatare, sursele de rezervă decât în situații de avarie reală.

### 6.4. Aerul medical — compresoare oil-free triplex

Aerul medical (AIR-4, presiune de regim 4-5 bar, utilizat pentru acționarea ventilatoarelor mecanice și pentru diluția amestecurilor gazoase anestezice) se produce printr-o stație de **compresoare oil-free, în configurație triplex (2 active + 1 rezervă, N+1)** — cerința „oil-free" (fără ulei de lubrifiere în contact cu aerul comprimat) nu este o preferință de calitate, ci o cerință de siguranță directă: aerul medical este respirat direct de pacient prin ventilatorul mecanic, iar orice urmă de vapori de ulei din compresor ar fi inhalată direct în plămânii unui pacient adesea deja compromis respirator. Aerul comprimat este tratat printr-un **uscător cu adsorbție** (care aduce punctul de rouă la valori sub −40 °C, prevenind formarea de condens în rețeaua de distribuție, care ar putea, la rândul său, deveni un focar de proliferare bacteriană similar celui discutat la capitolul 3.2 pentru ACM), urmat de o treaptă de **filtrare fină (0,01 µm) + filtru de carbon activ (pentru mirosuri/compuși organici volatili) + filtru bacteriologic terminal**, cu un **rezervor tampon de 2 × 1.000 litri** care nivelează variațiile de debit ale compresoarelor și asigură o rezervă instantanee la un vârf brusc de consum. Calitatea aerului produs este monitorizată continuu pentru **CO, CO₂ și conținut rezidual de ulei**, cu alarmă automată la depășirea pragurilor admise — parametri care, la o instalație obișnuită de aer comprimat industrial, nu ar necesita monitorizare continuă, dar care sunt aici verificați permanent exact pentru că aerul produs este respirat direct de pacienți.

### 6.5. Aerul motor chirurgical (AIR-8)

Distinct de aerul medical de respirație (AIR-4), sălile de operație necesită o rețea separată de **aer motor la presiune superioară (AIR-8, 7-8 bar)**, destinată acționării instrumentarului chirurgical pneumatic (motoare de tăiere/frezare osoasă în chirurgia ortopedică, instrumente de disecție pneumatică) — un consum de natură mecanică, nu respiratorie, motiv pentru care rețeaua este dimensionată și presurizată separat de AIR-4, deși produsă adesea din aceeași stație de compresoare oil-free, cu o treaptă suplimentară de suprapresiune dedicată acestui circuit.

### 6.6. Vacuumul medical

Rețeaua de vacuum (presiune de regim −0,6…−0,9 bar) alimentează aspirația chirurgicală (evacuarea sângelui și a fluidelor din câmpul operator), aspirația traheobronșică a pacienților ventilați și aspirația gastrică. Se adoptă o stație de **pompe de vacuum în configurație duplex-triplex (N+1)**, cu **filtre bacteriologice** montate pe traseul de aspirație (protecție dublă — atât pentru echipamentul de vacuum, împotriva contaminării cu fluide biologice aspirate, cât și pentru mediu, împotriva evacuării necontrolate de agenți biologici prin sistemul de vacuum), dimensionată la un debit de calcul de **~40 mc/h**. Redundanța N+1 (nu N+2, ca la oxigen) este justificată aici de existența unei alternative manuale imediate în caz de avarie totală — o seringă/pompă de aspirație portabilă, cu acționare manuală, poate prelua temporar, la nevoie, aspirația critică a unui singur pacient, marjă de siguranță absentă la oxigen (unde nu există echivalent manual al respirației asistate mecanic pe termen mediu).

### 6.7. Protoxidul de azot și dioxidul de carbon

**N₂O** (protoxid de azot, componentă a amestecurilor anestezice inhalatorii) și **CO₂** (utilizat pentru insuflație în chirurgia laparoscopică) sunt distribuite prin **rampe duble cu comutare automată** (aceeași logică de redundanță aplicată la scară mai mică decât la oxigen, justificată de faptul că ambele gaze au, spre diferență de oxigen, alternative sau pot tolera o întrerupere de ordinul minutelor fără consecință vitală imediată — o intervenție laparoscopică poate fi întreruptă temporar dacă insuflația de CO₂ se oprește, fără riscul de hipoxie asociat unei întreruperi de oxigen), echipate cu **detectoare de nivel/presiune** care semnalează din timp necesitatea înlocuirii buteliilor rampei epuizate.

### 6.8. AGSS — evacuarea gazelor anestezice reziduale și protecția cronică a personalului

**AGSS (Anaesthetic Gas Scavenging System)** este un sistem de **vacuum dedicat, complet separat de vacuumul chirurgical** (cap. 6.6), destinat exclusiv captării și evacuării în exterior a gazelor anestezice reziduale (N₂O, agenți inhalatori volatili) care nu sunt absorbite de pacient în timpul anesteziei și care, altfel, s-ar acumula în atmosfera sălii de operație. Rațiunea acestei rețele dedicate — separată fizic de vacuumul chirurgical, deși ambele operează prin depresiune — este protecția **cronică**, pe termen lung, a personalului din blocul operator, expus zilnic, ore în șir, la urme de gaze anestezice reziduale în absența AGSS. Expunerea cronică profesională la concentrații reziduale de gaze anestezice este documentată, în literatura de medicină ocupațională, ca fiind asociată cu un risc crescut de efecte adverse asupra sănătății personalului expus pe termen lung — inclusiv efecte hepatice, efecte asupra funcției reproductive (risc crescut de avort spontan documentat la personalul feminin expus cronic în sălile de operație fără scavenging adecvat) și efecte neurologice subtile (afectarea performanței cognitive/psihomotorii la expunere prelungită) — motiv pentru care standardele profesionale internaționale de medicina muncii (de tip NIOSH/organizații echivalente) recomandă limite stricte de expunere reziduală și impun sisteme de captare la sursă precum AGSS ca măsură primară de protecție, superioară ca eficiență ventilării generale a încăperii (care ar dilua, dar nu ar elimina la sursă, gazul rezidual). Evacuarea AGSS se face direct în exterior, printr-un traseu de vacuum dedicat, fără nicio interconectare cu vacuumul chirurgical sau cu ventilarea generală a sălii, exact pentru a garanta captarea la sursă, imediat la ieșirea gazului din circuitul de respirație al pacientului, înainte ca acesta să se disperseze în atmosfera încăperii.

### 6.9. Rețeaua de distribuție — materiale, cutii de zonă, prize

Rețeaua de conducte care distribuie gazele medicale de la sursele centrale (cap. 6.3-6.8) la punctele de utilizare se execută integral din **cupru medical degresat (conform SR EN 13348)** — un cupru special curățat de urme de ulei/grăsime rezidual de la procesul de tragere a țevii, dat fiind că orice urmă de hidrocarbură reziduală în interiorul conductei de oxigen constituie un risc de aprindere/explozie (oxigenul pur, în contact cu urme de ulei sau grăsime, poate iniția o combustie violentă la o presiune și o temperatură mult sub cele necesare pentru aprinderea normală a acelorași substanțe în aer). Îmbinările se execută prin **lipire (brazare) sub protecție de azot** (care previne oxidarea interioară a conductei în zona de lipire — o conductă de gaz medical nu poate prezenta depuneri de oxid interior, care s-ar putea desprinde ulterior și ar contamina fluxul de gaz respirat de pacient).

Pe traseul rețelei se instalează **cutii de zonă** — puncte de secționare cu vane și manometre, câte una pentru fiecare departament/secție a clădirii — care permit izolarea alimentării cu gaze medicale a unei singure zone (de exemplu, un singur etaj de spitalizare, în cazul unei intervenții de mentenanță sau al unei avarii locale) fără a întrerupe alimentarea restului clădirii, exact principiul de sectorizare aplicat consecvent și la apă (cap. 2.7) și la electricitate (cap. 9.6).

**Prizele terminale**, montate la patul pacientului/în sala de operație, respectă profilul mecanic unic descris la capitolul 6.2, cu o compunere diferențiată pe tip de încăpere, reflectând exact necesarul clinic al fiecărei destinații:

- **ATI**: O₂ + AIR + VAC, câte 2-3 prize din fiecare tip per post (redundanță locală — un pacient critic din ATI poate necesita simultan mai multe conexiuni ale aceluiași gaz, de exemplu oxigen pentru ventilator plus oxigen pentru un dispozitiv suplimentar de administrare);
- **Sălile de operație**: toate cele 7 tipuri de gaz/vacuum (O₂, AIR-4, AIR-8, VAC, N₂O, CO₂, AGSS) disponibile la fiecare post de anestezie;
- **Saloanele de spitalizare standard**: O₂ + VAC, suficiente pentru necesarul clinic obișnuit al unui pacient spitalizat non-critic.

### 6.10. Sistemul de alarmare pe trei niveluri

Standardul SR EN ISO 7396-1 impune un sistem de alarmare a stării instalației de gaze medicale structurat pe **trei niveluri**, fiecare cu o audiență și un scop distinct, proiectat astfel încât informația relevantă să ajungă întotdeauna la persoana care poate acționa asupra ei, în timpul potrivit:

1. **Alarme operaționale**, la stația sursă (camera tehnică a gazelor medicale, subsol) — monitorizează starea tehnică a echipamentelor (presiune pe rezervorul VIE, nivel de oxigen lichid, stare compresoare/pompe de vacuum, comutare automată activată) și sunt destinate personalului tehnic de mentenanță, responsabil de intervenția asupra echipamentelor propriu-zise.
2. **Alarme clinice**, la fiecare post de asistentă medicală (nurse station) al secției/etajului — semnalează starea de alimentare a rețelei care deservește direct acea zonă (de exemplu, o cădere de presiune pe rețeaua de oxigen a etajului respectiv), destinate personalului medical, care trebuie să știe imediat dacă alimentarea gazelor la patul pacienților pe care îi îngrijește este afectată, indiferent dacă problema tehnică se rezolvă automat prin comutarea pe sursa de rezervă.
3. **Alarme de urgență**, la sasul de acces al blocului operator — nivelul cel mai critic, semnalat direct echipei chirurgicale/de anestezie aflate în mijlocul unei intervenții, pentru orice defecțiune care ar putea afecta iminent siguranța pacientului aflat pe masa de operație, indiferent de starea comutării automate a surselor de rezervă.

Toate cele trei niveluri de alarmă sunt alimentate electric din **sursa neîntreruptibilă (UPS)**, conform aceluiași principiu de continuitate absolută discutat la capitolul 1.4/9 — o alarmă de gaze medicale care s-ar stinge exact în momentul unei pane electrice generale ar anula complet rațiunea sistemului de alarmare, exact în scenariul (pană electrică generalizată) în care informația despre starea gazelor medicale devine cea mai critică.

---

## 7. Instalații termice și instalația de utilizare a gazelor naturale

### 7.1. Sursa termică — configurația N+1

Sursa termică principală este constituită din **2 cazane de condensație, fiecare dimensionat la 60% din necesarul total** (configurație N+1, capacitate cumulată 120% din necesar la funcționare simultană a ambelor cazane, dar cu fiecare cazan individual capabil să acopere singur 60% din necesar în cazul indisponibilității celuilalt — suficient pentru a menține temperaturile minime de siguranță în toată clădirea, chiar dacă nu la parametrii de confort deplin, până la repunerea în funcțiune a cazanului avariat), alimentate cu **gaz natural**, cu **comutare automată pe motorină de rezervă** în caz de întrerupere a alimentării cu gaz — a doua linie de redundanță a sursei termice, care acoperă exact scenariul de avarie a rețelei publice de gaze, distinct de avaria unui echipament propriu (cazan), deja acoperită de configurația N+1 a celor două cazane.

### 7.2. Bilanțul termic — breviar pe zone funcționale

Necesarul termic se determină, la temperatura exterioară de calcul θe = −18 °C (SR 1907-1, cap. 1.6), prin însumarea a trei componente — transmisie prin anvelopă, ventilare și prepararea ACM — fiecare calculată pe baza temperaturilor interioare de proiect specifice fiecărei destinații funcționale a clădirii:

| Destinație | Temperatură interioară de calcul |
|---|---|
| Săli de operație | 22…24 °C |
| ATI | 24 °C |
| Saloane de spitalizare | 22 °C |
| Sală de naștere/neonatologie | 24…26 °C |
| Coridoare | 20 °C |
| Băi/grupuri sanitare | 24 °C |
| Spații tehnice | 15 °C |

Diferența de temperatură de calcul (Δθ = θint − θext) rezultă, pentru fiecare destinație, din tabelul de mai sus — cea mai severă fiind cea a sălii de naștere (Δθ = 26 − (−18) = 44 K), cea mai relaxată fiind cea a spațiilor tehnice (Δθ = 15 − (−18) = 33 K), o plajă de variație care reflectă direct sensibilitatea termică diferită a fiecărei categorii de ocupanți: nou-născutul din sala de naștere, cu capacitate limitată de termoreglare proprie, necesită o temperatură ambientală net superioară celei confortabile pentru un adult, exact așa cum echipamentele din spațiile tehnice tolerează o temperatură ambientală mai redusă decât un pacient.

**Bilanțul termic total**, sumat pe cele trei componente ale necesarului:

- **Pierderi prin transmisie** (anvelopa clădirii, calculată conform C107, pe ansamblul suprafețelor opace și vitrate ale celor 6 niveluri): **210 kW**;
- **Pierderi prin ventilare** (aerul proaspăt introdus în toate zonele clădirii, calculat din debitele de ventilare stabilite la capitolul 8, majorate de cerința de aer 100% proaspăt fără recirculare a zonelor medicale critice — o sarcină de ventilare net superioară celei a unei clădiri obișnuite de aceeași suprafață, exact din cauza interdicției de recirculare discutată la capitolul 8.1): **480 kW**;
- **Necesarul de vârf al ACM** (cap. 3.4, 305 kW calculat, aplicat cu un coeficient de neconcomitență 0,9 față de vârful de încălzire — vârful de ACM nu survine niciodată perfect simultan cu vârful absolut de încălzire al clădirii, motiv pentru care se aplică o reducere moderată la agregarea celor două sarcini): 305 × 0,9 ≈ **275 kW**.

**Q_total = 210 + 480 + 275 ≈ 895 kW**

La acest necesar total se aplică principiul de redundanță N+1 stabilit la capitolul 1.4: **2 cazane × 550 kW fiecare**, capacitate cumulată de 1.100 kW (superioară necesarului de 895 kW, cu o marjă care acoperă atât rezerva de capacitate pentru dezvoltări ulterioare, cât și posibilitatea de funcționare a unui singur cazan la sarcină parțială în afara vârfurilor sezoniere, fără ciclare excesivă) — fiecare cazan individual (550 kW) acoperind singur 61% din necesarul total (895 kW), suficient pentru menținerea temperaturilor de siguranță în întreaga clădire chiar în cazul indisponibilității celuilalt cazan.

### 7.3. Distribuția — circuite diferențiate și interdicția radiatoarelor în zonele aseptice

Distribuția agentului termic de la sursă către consumatori se face printr-o **butelie de egalizare** (care decuplează hidraulic sursa de circuitele de distribuție, reducând ciclarea cazanelor la sarcină parțială) și **pompe duble** pe fiecare circuit principal (redundanță la nivel de distribuție, nu doar la nivel de sursă), cu regimuri de temperatură diferențiate pe tip de consumator: circuitele care alimentează unitățile de tratare a aerului (AHU, cap. 8) funcționează în regim **75/60 °C** (temperatură mai ridicată, necesară pentru bateriile de încălzire ale debitelor mari de aer 100% proaspăt); radiatoarele și ventiloconvectoarele din zonele non-critice funcționează în regim **55/45 °C**; prepararea ACM are prioritate de alimentare (cap. 3); iar pardoseala radiantă este adoptată specific în secția de pediatrie (confort termic superior pentru copiii care petrec timp jucându-se direct pe pardoseală, cerință absentă la restul clădirii).

**Zonele aseptice ale clădirii — blocul operator și ATI — sunt climatizate integral prin aer, fără niciun corp de încălzire static (radiator/ventiloconvector) montat în încăpere.** Această restricție, care ar părea, la prima vedere, o complicație inutilă (un radiator suplimentar ar putea prelua o parte din sarcina termică, reducând debitul de aer necesar), este impusă strict de considerente de igienă: un radiator sau un ventiloconvector montat în interiorul unei săli de operație sau al unui post ATI reprezintă o **suprafață greu accesibilă pentru curățare și dezinfecție** (aripioarele radiatorului, bateria ventiloconvectorului), care acumulează praf și, potențial, contaminare microbiologică, exact în încăperea unde controlul microbiologic al aerului este cel mai strict (cap. 8.4) — un compromis inacceptabil între o economie marginală de energie și riscul infecțios. Întregul necesar termic al acestor zone este, prin urmare, preluat exclusiv de aerul introdus prin sistemul de ventilare (cap. 8), reîncălzit/răcit la nivelul unității de tratare a aerului dedicate fiecărei săli. În saloanele de spitalizare standard, unde acest risc este mai redus (aer parțial recirculat admis, cap. 8.1), se folosesc **radiatoare de oțel cu suprafață netedă, lavabilă** — nu radiatoare cu aripioare fine (care ar acumula praf mai greu de îndepărtat), soluție intermediară care păstrează un corp static de încălzire, dar minimizează riscul de acumulare de praf/contaminare.

### 7.4. Instalația de utilizare a gazelor naturale

Gazul natural alimentează, la această clădire, exclusiv **cazanele de condensație ale sursei termice** (cap. 7.1) — spre diferență de o clădire hotelieră cu bucătărie profesională pe gaz, bucătăria/oficiile de etaj ale unității medicale funcționează pe echipamente electrice, alegere care elimină un consumator suplimentar de gaz în interiorul clădirii și reduce riscul de incendiu/explozie asociat unei rețele de gaz extinse pe mai multe niveluri ocupate de pacienți imobilizați. Instalația de utilizare se rezumă, prin urmare, la **branșamentul dedicat centralei termice de la subsol**, cu **stație de reglare-măsurare (SRM)** proprie, regulator de presiune, filtru și contor, conform Ordinului ANRE 89/2018 (NTPEE), cu robinet de incendiu accesibil din exterior și **electrovalvă de siguranță interblocată cu sistemul de detecție și semnalizare a incendiului** (închidere automată a alimentării cu gaz la semnalul de incendiu confirmat, măsură de interfață cu scenariul de securitate la incendiu, tratată la capitolul 12).

---

## 8. Ventilare-climatizare cu clase de puritate (SR EN ISO 14644)

### 8.1. Principiile de proiectare a ventilării medicale

Ventilarea zonelor cu destinație medicală a clădirii urmează trei principii cumulate, fiecare tratat în detaliu în subcapitolele următoare:

1. **Aer 100% proaspăt filtrat în toate zonele medicale**, cu **recirculare complet interzisă** în zonele septice și în blocul operator — spre diferență de o clădire de birouri sau chiar de spațiile publice ale unei clădiri hoteliere, unde recircularea parțială a aerului (cu filtrare intermediară) este o soluție energetică acceptată, la o unitate medicală recircularea aerului dintr-o zonă cu risc infecțios (sală de operație, izolare, laborator) ar transporta, prin bucla de recirculare, exact agenții patogeni de la care sistemul de ventilare trebuie să protejeze restul clădirii.
2. **Cascadă de presiuni** — presiune pozitivă în zonele care trebuie protejate de contaminare din exterior (bloc operator, ATI, sterilizare curată, farmacie, neonatologie) și presiune negativă în zonele care trebuie izolate pentru a nu contamina restul clădirii (izolare TBC, microbiologie, morgă, sterilizare murdară) — principiu fizic detaliat la capitolul 8.2.
3. **Filtrare pe trepte succesive**, culminând, în zonele cele mai critice, cu filtre **HEPA H13/H14** de înaltă eficiență (cap. 8.5).

### 8.2. Fizica cascadei de presiuni — de ce funcționează

Principiul cascadei de presiuni se bazează pe o observație fizică simplă, dar cu implicații clinice majore: **aerul curge întotdeauna dinspre zona de presiune mai ridicată spre zona de presiune mai scăzută**, prin orice deschidere disponibilă — ușa unei săli de operație, rostul dintre canaturile unei uși, o eventuală neetanșeitate a compartimentării. Dacă sala de operație este menținută la o presiune **superioară** coridorului adiacent (cascadă pozitivă, +15 Pa, cap. 8.3), orice deschidere accidentală sau tranzitorie a ușii produce un **flux net de aer dinspre sala de operație spre coridor**, nu invers — aerul (și, odată cu el, eventualii contaminanți din coridor sau din zonele adiacente) nu poate pătrunde în sala de operație, indiferent de câte ori se deschide ușa în timpul intervenției, dat fiind că gradientul de presiune se opune activ oricărei tendințe de infiltrare dinspre exterior. Acesta este mecanismul fizic exact prin care presiunea pozitivă a sălii de operație menține un mediu protejat, chiar și în prezența traficului inevitabil de personal, instrumentar și pacient prin ușa sălii pe parcursul intervenției.

**Izolarea pentru tuberculoză (TBC) funcționează pe principiul opus, cu aceeași fizică, dar cu scopul inversat.** Un pacient cu tuberculoză pulmonară activă emite, prin tuse, aerosoli fini care conțin bacilul Koch, un agent patogen transmisibil pe cale aeriană la distanțe relativ mari și cu persistență semnificativă în aer. Camera de izolare TBC este menținută la o **presiune negativă** (−15 Pa, cap. 8.3) față de coridorul adiacent, astfel încât orice deschidere a ușii produce un flux net de aer **dinspre coridor înspre cameră**, nu invers — aerosolii infecțioși generați în interiorul camerei nu pot migra spre coridor și spre restul clădirii prin nicio deschidere accidentală a ușii; întregul aer al camerei este evacuat exclusiv prin sistemul dedicat de extracție, filtrat prin HEPA înainte de evacuare în exterior (cap. 8.5), niciodată recirculat și niciodată lăsat să se disperseze necontrolat prin ușă. Aceeași logică de presiune negativă se aplică microbiologiei de laborator, morgii și sterilizării murdare — toate zone unde riscul dominant este contaminarea restului clădirii dinspre interiorul încăperii, nu invers.

### 8.3. Parametrii de ventilare pe destinație — tabel complet

| Încăpere | Schimburi de aer/h | % aer proaspăt | Filtrare | Presiune relativă | Clasa de puritate |
|---|---|---|---|---|---|
| Sală de operație aseptică | **20-25** | 100% | F7+F9+**H14** laminar | **+15 Pa** | **ISO 5** (zona sterilă) / ISO 7 (restul sălii) |
| Sală de operație generală | 15-20 | 100% | F7+F9+H14 | +10 Pa | ISO 7 |
| ATI | 10-12 | 100% | F7+F9+H13 | +8 Pa | ISO 7-8 |
| Salon standard | 6 | ≥50% | F7+F9 | neutră | — |
| Salon imunodeprimați | 12 | 100% | F7+F9+H14 | +15 Pa | ISO 7 |
| Izolare TBC | 12 | 100% | evacuare prin HEPA | **−15 Pa** | — |
| Sterilizare curată | 15 | 100% | F7+F9+H13 | pozitivă | ISO 8 |
| Sterilizare murdară | 15 | 100% | — | negativă | — |
| RMN/CT | 8-10 | ≥50% | F7+F9 | neutră | umiditate relativă strict controlată |
| Naștere/neonatologie | 12 | 100% | F7+F9+H14 | pozitivă | ISO 7 |

Fiecare rând al acestui tabel este, de fapt, aplicarea concretă a celor trei principii enunțate la capitolul 8.1: numărul de schimburi de aer crește odată cu criticitatea încăperii (de la 6 vol/h într-un salon standard la 20-25 vol/h în sala de operație aseptică — de peste trei ori mai mult, reflectând necesitatea de a dilua/înlocui rapid orice contaminant potențial generat în timpul unei intervenții chirurgicale deschise); procentul de aer proaspăt crește odată cu riscul de recirculare a contaminanților (de la ≥50% în saloanele standard, unde o recirculare parțială filtrată este acceptabilă, la 100% în toate zonele cu risc infecțios ridicat); și presiunea relativă urmează exact logica pozitiv/negativ discutată la capitolul 8.2, funcție de direcția riscului dominant al fiecărei încăperi.

### 8.4. Sala de operație — sistemul de flux laminar (LAF)

Sala de operație aseptică — cea mai critică încăpere a întregii clădiri din perspectiva ventilării — este echipată cu un **plafon de flux laminar (LAF — Laminar Air Flow)**, un panou de filtrare HEPA H14 de dimensiuni mari (~3,2 × 3,2 m), montat direct deasupra mesei de operație, care introduce aer filtrat printr-un flux **unidirecțional descendent, la o viteză de 0,25…0,35 m/s**. Această viteză nu este arbitrară: este suficient de mare pentru a menține un flux laminar coerent (fără turbulență, care ar amesteca aerul curat cu aerul din restul încăperii) care „spală" continuu zona operatorie de sus în jos, împingând orice particulă generată local (de la instrumentar, de la mișcarea personalului, de la plaga chirurgicală deschisă) în afara zonei sterile, spre periferia încăperii și, de acolo, spre gurile de extracție montate la partea inferioară a pereților — dar suficient de mică pentru a nu produce curenți de aer perceptibili care ar răci excesiv câmpul operator deschis sau ar deranja echipa chirurgicală. Rezultatul este o **zonă de clasă ISO 5** (cea mai strictă clasă de puritate uzuală în mediul spitalicesc, echivalentă unei încăperi curate industriale de înaltă precizie) direct deasupra mesei de operație, în timp ce restul sălii, în afara conului de flux laminar, se menține la clasa ISO 7, mai relaxată, dar tot superioară oricărei alte încăperi a clădirii, cu excepția altor zone critice.

Fiecare sală de operație este deservită de o **unitate de tratare a aerului (AHU) dedicată exclusiv acelei săli**, nu partajată cu alte săli sau cu alte zone ale clădirii — soluție care garantează că o defecțiune sau o intervenție de mentenanță la AHU-ul unei săli nu afectează celelalte două săli de operație, permițând continuarea programului chirurgical în paralel. Umidificarea se face cu **abur igienic** (produs din apa tratată descrisă la capitolul 4.4), iar redundanța se extinde și la nivelul componentelor mecanice ale AHU (**ventilatoare duble** de introducere/extracție), astfel încât o defecțiune a unui singur ventilator să nu întrerupă complet fluxul de aer al sălii în timpul unei intervenții în curs.

### 8.5. Filtrarea HEPA H13/H14 — eficiență și validare prin testul DOP

Filtrele **HEPA (High Efficiency Particulate Air)** de clasă **H13/H14**, montate ca ultimă treaptă de filtrare pe toate zonele critice (după treptele preliminare F7 și F9, care rețin particulele mai mari și protejează filtrul HEPA de colmatare prematură), au o **eficiență de reținere de minimum 99,995% pentru particule de 0,3 micrometri** — dimensiunea de referință numită **„cea mai penetrantă mărime de particulă" (MPPS — Most Penetrating Particle Size)**, la care mecanismele fizice de captare ale unui filtru fibros (impact inerțial pentru particule mari, difuzie browniană pentru particule foarte mici) sunt, ambele, mai puțin eficiente decât la extremele spectrului de dimensiuni — motiv pentru care testarea eficienței unui filtru HEPA se face întotdeauna la această dimensiune critică, cea mai defavorabilă, nu la o dimensiune arbitrară.

**Validarea integrității filtrului și a montajului său se face prin testul DOP** (denumit după agentul de testare istoric, dioctil ftalat, adesea înlocuit în practica actuală de agenți echivalenți mai puțin toxici, precum poli-alfa-olefina — PAO): se generează, în amonte de filtru, un aerosol de test cu particule calibrate la dimensiunea critică de 0,3 µm, iar un fotometru de scanare este trecut sistematic pe toată suprafața filtrului și, esențial, **pe toată garnitura de etanșare a ramei filtrului față de plafonul/carcasa de montaj** — o eventuală neetanșeitate la nivelul garniturii (nu a mediului filtrant propriu-zis) ar permite trecerea nefiltrată a unui procent de aer exact prin acel punct, anulând local eficiența nominală a filtrului, indiferent cât de performantă este hârtia filtrantă în sine. Testul se consideră trecut doar dacă penetrarea măsurată, pe toată suprafața scanată, inclusiv garniturile, rămâne sub pragul de **0,01%** — o cerință de validare care se aplică nu doar la punerea în funcțiune inițială (cap. 18), ci și periodic pe parcursul exploatării clădirii, conform programului de mentenanță al sălilor de operație.

### 8.6. Recuperarea de căldură — limitată de imperativul igienic

Recuperarea de căldură din aerul evacuat, măsură altfel obligatorie pentru eficiența energetică la debitele mari de aer proaspăt vehiculate de o clădire medicală (cap. 15.2 dezvoltă complet tensiunea dintre eficiență și siguranță), este posibilă fără restricții doar în zonele non-critice ale clădirii (birouri administrative, coridoare publice ale ambulatoriului), unde se pot folosi recuperatoare rotative sau cu plăci, de randament ridicat (η = 70…85%). În zonele septice și în blocul operator, unde aerul extras este potențial contaminat, recuperarea se face exclusiv prin **circuit intermediar cu glicol** — o soluție cu randament mai redus (η = 45…55%), dar cu **separare fizică totală** între fluxul de aer evacuat (contaminat) și fluxul de aer proaspăt introdus, fără nicio posibilitate de transfer direct de aer între cele două circuite, spre diferență de un recuperator rotativ clasic, care lasă să treacă, prin imperfecțiunea inerentă a etanșării rotorului în mișcare, un mic procent rezidual de aer dintr-un flux în celălalt — inacceptabil quando fluxul evacuat provine dintr-o sală de operație sau dintr-o cameră de izolare.

---

## 9. Instalații electrice — redundanță, bilanț de putere, IT medical

### 9.1. Alimentarea multiplă — cele trei linii de apărare

Continuitatea alimentării electrice a zonelor critice ale clădirii se asigură printr-un lanț de **trei surse succesive**, fiecare acoperind un interval de timp diferit al aceleiași întreruperi:

1. **Dublă rețea de medie tensiune** — două racorduri independente de la rețeaua publică, fiecare cu transformator propriu, cu **comutare automată (AAR)** între cele două surse la nivelul postului de transformare — prima linie de apărare, care acoperă marea majoritate a avariilor locale ale rețelei publice (defect pe un singur racord/transformator) fără nicio implicare a surselor de rezervă de mai jos.
2. **Grup electrogen (GE)**, cu comutare automată în **≤15 secunde**, autonomie de combustiu de **24-48 de ore** și configurație **dublă (N+1)** — a doua linie de apărare, care preia sarcina în cazul indisponibilității ambelor surse de rețea publică (scenariu mai rar, dar posibil la o avarie extinsă a rețelei de distribuție locale).
3. **UPS on-line dedicat Grupei 2** (bloc operator, ATI), cu comutare **≤0,5 secunde** și autonomie de minimum **3 ore** — a treia linie, singura capabilă să satisfacă pragul de continuitate discutat la capitolul 1.4 pentru sarcinile care nu tolerează nicio întrerupere perceptibilă.

| Consumator | Alimentare normală | Sursă la cădere | Timp de comutare |
|---|---|---|---|
| Grupa 2 (vital, bloc operator/ATI) | rețea + UPS on-line permanent | UPS → generator | **≤0,5 s** |
| Grupa 1 | rețea | generator | ≤15 s |
| Iluminat de securitate | rețea | generator + acumulatori proprii | ≤5 s |

### 9.2. Bilanțul de putere

Puterea instalată totală (Pi) se determină prin sumarea consumatorilor pe categorii funcționale:

| Consumator | Putere instalată (kW) |
|---|---|
| Iluminat | 120 |
| Prize medicale (echipamente mobile, monitoare, pompe de perfuzie) | 200 |
| Imagistică (RX, CT, RMN) | 350 |
| Bloc operator + ATI | 180 |
| HVAC | 300 |
| Pompe (apă, recirculare, gaze medicale) | 90 |
| Ascensoare | 120 |
| Bucătărie/spălătorie | 200 |
| **TOTAL Pi** | **1.560 kW** |

Aplicând un factor de simultaneitate agregat rezultat din profilul de utilizare al fiecărei categorii (imagistica de mare putere — CT/RMN — funcționează intermitent, nu continuu la putere maximă; bucătăria are vârfuri concentrate pe mesele principale; iluminatul și HVAC-ul au un regim mai constant): **Pc ≈ 961 kW**, corespunzând unei puteri aparente, la un factor de putere estimat cosφ ≈ 0,85 (compensare capacitivă centralizată la tabloul general): **Sc ≈ 1.130 kVA**.

Se adoptă **2 transformatoare a câte 1.000 kVA** (configurație redundantă — fiecare transformator, individual, putând acoperi o mare parte din necesarul clădirii pe durata unei intervenții/avarii la celălalt, cu delestarea automată a consumatorilor neesențiali în acest scenariu degradat) și un **grup electrogen de minimum 800 kVA**, dimensionat pe sarcinile de siguranță și de continuitate a activității clinice esențiale — nu pe totalitatea bilanțului de 961 kW, printr-o **delestare automată a consumatorilor neesențiali** (o parte din iluminatul general, o parte din echipamentele de bucătărie/spălătorie, prizele generale ale birourilor administrative) la trecerea pe generator, exact principiul de proporționalitate a redundanței cu consecința avariei stabilit la capitolul 1.7 — sursa de rezervă nu trebuie să susțină confortul deplin al întregii clădiri, ci exclusiv sarcinile a căror întrerupere ar afecta siguranța pacienților sau continuitatea actului medical.

### 9.3. IT medical Grupa 2 — principiul transformatorului de separare

Sălile de operație și posturile ATI (Grupa medicală 2) sunt alimentate printr-un sistem electric special, numit **IT medical**, compus dintr-un **transformator de separare** dedicat fiecărei săli/zonă (5-8 kVA per sală) și un **monitor de izolație (IMD)**. Principiul de funcționare, care justifică întreaga arhitectură a acestui sistem, este următorul: secundarul transformatorului de separare **nu este legat la pământ** (spre diferență de o instalație electrică obișnuită, unde unul dintre conductori este legat direct la pământ) — rețeaua astfel obținută este „flotantă" față de pământ. Într-o instalație obișnuită legată la pământ, un **prim defect de izolație** (de exemplu, un cablu deteriorat care pune o carcasă metalică sub tensiune) creează o buclă de curent de defect prin pământ, suficient de mare pentru a declanșa instantaneu protecția (siguranța fuzibilă sau disjunctorul), întrerupând alimentarea acelui circuit — o soluție acceptabilă la o priză obișnuită, dar **inacceptabilă în mijlocul unei intervenții chirurgicale**, unde întreruperea bruscă a alimentării echipamentului (ventilator, monitor, aspirator chirurgical) la un prim defect minor ar fi exact scenariul catastrofal discutat la capitolul 1.4.

Într-o rețea IT flotantă, un prim defect de izolație **nu creează o astfel de buclă** — curentul care ar circula printr-un eventual prim defect este limitat la valori foarte mici (curent capacitiv rezidual al rețelei izolate), insuficient pentru a declanșa protecția de supracurent. **Echipamentul continuă să funcționeze normal, fără nicio întrerupere**, exact cerința fundamentală a Grupei 2. Monitorul de izolație (IMD) detectează însă acest prim defect (prin măsurarea continuă a rezistenței de izolație a rețelei față de pământ) și declanșează o **alarmă tehnică** (prag tipic de sub **50 kΩ**) — nu o întrerupere a alimentării, ci o semnalizare către personalul tehnic, care poate localiza și remedia defectul în timp util, **înainte ca un al doilea defect** (pe un alt conductor al aceleiași rețele izolate) să transforme situația într-un scurtcircuit real, cu declanșarea protecției și întreruperea efectivă a alimentării. Sistemul IT medical transformă, astfel, un prim defect de izolație — eveniment care ar întrerupe instantaneu alimentarea într-o rețea obișnuită — într-un simplu avertisment tehnic, fără nicio consecință asupra continuității actului medical în desfășurare, exact principiul care justifică includerea acestui sistem, mai complex și mai costisitor decât o instalație electrică obișnuită, exclusiv în zonele Grupa 2.

### 9.4. Egalizarea de potențial medicală suplimentară — microșocul și pragul de curent periculos

Dincolo de priza de pământ generală a clădirii (R ≤ 1 Ω, comună cu instalația de protecție la trăsnet, cap. 11), zonele Grupa 2 primesc o **egalizare de potențial medicală suplimentară** — o bară de echipotențializare locală (BEP local), la care se conectează toate masele metalice conductoare din încăpere (masa de operație, carcasele echipamentelor, patul ATI), cu **conductoare de rezistență ≤0,2 Ω** între oricare două puncte accesibile simultan pacientului.

Rațiunea acestei cerințe, mult mai severă decât cea a unei prize de pământ obișnuite, este fenomenul de **microșoc**: pielea umană intactă are o rezistență electrică relativ ridicată (de ordinul a 1.000…100.000 Ω, funcție de umiditate și de suprafața de contact), care limitează, în cazul unui contact electric accidental prin piele, curentul care poate circula prin corp la valori de ordinul miliamperilor — pragul de percepție este de aproximativ 1 mA, pragul de „nu mai poți da drumul" (let-go) este de aproximativ 10 mA, iar fibrilația ventriculară prin contact cutanat obișnuit necesită, de regulă, curenți de ordinul a 100 mA. Însă un pacient aflat sub anestezie, cu un **cateter intracardiac** (cateter venos central cu vârful poziționat în apropierea sau în interiorul cavităților inimii, o procedură frecventă în chirurgia cardiacă și în terapia intensivă) sau cu electrozi de stimulare cardiacă temporară, are o **cale conductoare directă către mușchiul cardiac, care ocolește complet rezistența protectoare a pielii**. În acest scenariu, curenți de ordinul a **doar 10…100 microamperi (µA) — de o mie de ori mai mici decât pragul de fibrilație prin piele intactă** — aplicați direct pe sau în apropierea miocardului, pot induce fibrilație ventriculară, exact pentru că densitatea de curent se concentrează direct pe țesutul cardiac, fără disiparea și atenuarea pe care le-ar produce trecerea prin întregul corp și prin rezistența cutanată. Această diferență de trei ordine de mărime între pragul de risc „obișnuit" (prin piele, ordinul a 100 mA) și pragul de risc „intracardiac" (ordinul a 100 µA) este exact motivul pentru care standardul HD 60364-7-710 impune, în zonele Grupa 2, o egalizare de potențial cu o rezistență reziduală de ordinul a 0,2 Ω între orice două puncte accesibile simultan pacientului — o diferență de potențial minimă indusă de curenți de scurgere reziduali ai echipamentelor conectate (chiar și în limitele normale de funcționare ale acestora, conform IEC 60601-1) trebuie menținută atât de mică încât, chiar aplicată direct pe o cale intracardiacă, să rămână sub pragul de risc de microșoc.

### 9.5. Structura tablourilor electrice

Distribuția electrică se organizează pe o ierarhie de tablouri care reflectă exact cele trei niveluri de continuitate discutate la capitolul 9.1: **TGD (tablou general de distribuție) cu dublă bară și cuplă** (permițând alimentarea de la oricare din cele două transformatoare, cu izolarea uneia dintre bare pentru mentenanță fără întreruperea celeilalte), din care se alimentează, în paralel, trei categorii de tablouri secundare: **tablouri vital** (marcate distinct, culoare roșie, alimentate rețea+generator, pentru toate sarcinile Grupa 1 și pentru sursele care alimentează, la rândul lor, UPS-urile Grupei 2), **tablouri neîntreruptibile** (ieșirea UPS-urilor dedicate Grupei 2) și **tablouri normale** (consumatori neesențiali, primii delestați la trecerea pe generator, cap. 9.2). Cablurile care alimentează sarcinile de siguranță (pompe de incendiu, ventilatoare de desfumare, iluminat de securitate) sunt de tip **rezistent la foc (E90/PH90)**, care își mențin funcționalitatea electrică timp de 90 de minute chiar în condiții de incendiu direct pe traseul cablului — cerință de interfață cu scenariul de securitate la incendiu (cap. 12), care garantează că sarcinile de evacuare rămân alimentate exact în intervalul critic al unui eveniment de incendiu real.

---

## 10. Iluminat

### 10.1. Nivelurile de iluminare de proiect

| Încăpere | Nivel de iluminare (Em, lx) | Indice de redare a culorilor (Ra) |
|---|---|---|
| Câmp operator (scialitică) | 10.000…100.000, reglabil | ≥95 |
| Sală de operație (general) | 1.000 | ≥90 |
| ATI | 100 (regim de repaus) / 1.000 (examinare) | ≥90 |
| Cabinet/examinare | 500…1.000 | ≥90 |
| Laborator | 500 | ≥80 |
| Salon | 100 (+300 pentru lectură) / 5 (veghe de noapte) | ≥80 |
| Coridoare (zi/noapte) | 200/50 | ≥80 |

Nivelul extrem de ridicat cerut la câmpul operator (până la 100.000 lx, reglabil în funcție de tipul de intervenție) și indicele de redare a culorilor foarte strict (Ra ≥95, superior chiar și celui cerut pentru laborator sau examinare) reflectă necesitatea chirurgului de a distinge, cu acuratețe cromatică maximă, nuanțele fine ale țesuturilor vii (diferența dintre un țesut sănătos și unul compromis, identificarea precisă a structurilor vasculare) — o eroare de percepție cromatică indusă de un iluminat de calitate insuficientă ar putea, în chirurgie, avea consecințe clinice directe, spre diferență de o eventuală eroare similară într-un birou sau într-un hol.

### 10.2. Sursele de iluminat și controlul flicker-ului

Se adoptă exclusiv corpuri de iluminat **LED cu driver de flicker redus** — cerință mai strictă decât la o clădire obișnuită, dat fiind că un flicker perceptibil (chiar subliminal, sub pragul de percepție conștientă) poate interfera cu percepția vizuală de precizie a chirurgului în timpul unei manevre fine sau poate provoca disconfort/cefalee personalului expus ore în șir sub iluminatul sălii de operație. Corpurile de iluminat din zonele umede și aseptice (săli de operație, zone de spălare chirurgicală) au grad de protecție **IP54…IP65** (etanșe, cu suprafață lavabilă, rezistente la protocoalele de dezinfecție prin ștergere/pulverizare aplicate zilnic), iar temperatura de culoare adoptată uniform este de **4.000 K** (alb neutru, echilibru între confortul vizual al personalului pe ture lungi și acuratețea cromatică necesară actului medical).

### 10.3. Iluminatul de securitate — continuarea lucrului chirurgical

Iluminatul de securitate al clădirii se dimensionează pe două cerințe distincte, cu regim de comutare diferit: **iluminatul de evacuare** al căilor de circulație publice (autonomie ≥3 ore, comutare ≤5 secunde, suficientă pentru evacuarea în siguranță a personalului și a pacienților ambulanți) și **continuarea lucrului în blocul operator/ATI** (autonomie ≥3 ore, dar comutare **≤0,5 secunde, pe UPS**, nu pe acumulatoarele proprii ale corpurilor de iluminat de securitate) — o distincție esențială: la o pană electrică generală survenită în timpul unei intervenții chirurgicale în desfășurare, echipa operatorie **nu evacuează sala**, ci continuă intervenția (adesea imposibil de întrerupt fără risc pentru pacient, de exemplu în mijlocul unei hemostaze active), motiv pentru care iluminatul câmpului operator trebuie să rămână la parametrii de proiect deplini, fără nicio scădere perceptibilă de intensitate, exact prin comutarea instantanee asigurată de UPS-ul Grupei 2 (cap. 9.1) — spre diferență de iluminatul de evacuare al coridoarelor, unde o comutare de câteva secunde pe acumulatorii proprii ai corpurilor de iluminat este suficientă pentru a ghida în siguranță evacuarea.

---

## 11. Priză de pământ și protecție la trăsnet

### 11.1. Priza de pământ

Se adoptă o **priză de pământ combinată** (electrozi verticali dispuși pe conturul clădirii, interconectați cu centura de împământare înglobată în fundație), cu rezistență de dispersie țintă **Rp ≤1 Ω** — o valoare superioară celei uzuale (4 Ω) pentru o clădire obișnuită, justificată de trei cerințe cumulate specifice acestei clădiri: prezența unui post de transformare propriu (cap. 9.2), prezența grupului electrogen (cap. 9.2) și cerința de egalizare de potențial medicală suplimentară a zonelor Grupa 2 (cap. 9.4), care depinde de calitatea prizei de pământ generale a clădirii ca referință. Priza de pământ generală este **comună** cu instalația de protecție la trăsnet (cap. 11.2), conform practicii curente, cu separarea funcțională asigurată la nivelul barei principale de echipotențializare.

### 11.2. Evaluarea riscului de trăsnet

O unitate medicală de această talie — cu o amprentă construită extinsă (~1.000 mp/nivel) și o înălțime de regim S+P+4E — necesită, ca orice clădire de gabarit comparabil, o evaluare cantitativă a riscului de trăsnet conform metodologiei SR EN 62305-2, ale cărei concluzii sunt însă amplificate aici de un factor de consecință mult mai sever decât la o clădire obișnuită de birouri sau de locuit: **ocupanții unei unități medicale includ, prin definiție, persoane cu mobilitate redusă sau nulă** — pacienți imobilizați la pat, pacienți sub anestezie sau sedare, nou-născuți — pentru care o eventuală evacuare de urgență generată de o descărcare de trăsnet ar fi mult mai dificilă și mai riscantă decât la o populație ambulantă obișnuită.

**Numărul anual acceptabil de descărcări (Ne)** se determină prin factorii de risc specifici clădirii, conform metodologiei simplificate consacrate (analogă celei aplicate, cu alt profil de ocupare, la clădirea hotelieră de referință):

- A (tip de construcție — structură de beton armat obișnuită): **A = 1,0**;
- B (conținutul clădirii — fără materiale periculoase/explozive, dar cu prezența buteliilor de gaze medicale comprimate la subsol, cap. 6, factor ușor majorat față de o clădire fără astfel de conținut): **B = 1,2**;
- C (ocuparea clădirii — factor **cel mai sever al evaluării**: pacienți imobilizați, sub anestezie/sedare, nou-născuți, incapabili de evacuare autonomă rapidă, o categorie de risc superioară chiar și celei a unui hotel cu oaspeți adormiți, dat fiind că mulți pacienți nu pot fi mobilizați deloc fără asistență medicală directă în timpul evacuării): **C = 5,0**;
- D (consecințele unei descărcări — posibile pierderi de vieți omenești la o populație vulnerabilă, plus întreruperea unor funcțiuni vitale de importanță socială majoră): **D = 2,0**;
- E (necesitatea continuității serviciului — spre diferență de un hotel, o unitate medicală **este** o infrastructură critică a cărei funcționare neîntreruptă este de interes public major): **E = 1,5**.

**C_total = A × B × C_ocupare × D × E = 1,0 × 1,2 × 5,0 × 2,0 × 1,5 = 18,0**

**Ne = 5,5×10⁻³/C_total = 5,5×10⁻³/18,0 ≈ 3,06×10⁻⁴ descărcări/an**

Raportat la numărul de descărcări directe estimat pentru o clădire de acest gabarit și amplasament (calcul similar celui detaliat la clădirea hotelieră de referință, funcție de aria de captare echivalentă a amprentei și înălțimii clădirii și de densitatea de descărcări la sol Ng specifică amplasamentului, de regulă Nd de ordinul a câteva sutimi de descărcări/an pentru un gabarit comparabil), diferența dintre Nd și acest Ne extrem de redus (rezultat direct din factorii de risc amplificați de profilul de ocupare vulnerabil) conduce, fără echivoc, la necesitatea unui **sistem de protecție la trăsnet de nivel ridicat — LPS I sau II**, dimensionarea exactă a nivelului de protecție și a eficienței necesare (E_necesar = 1 − Ne/Nd) urmând a fi calculată definitiv la faza de proiect tehnic, pe baza datelor geometrice finale ale amplasamentului (aria de captare echivalentă, coeficientul de mediu Cd funcție de vecinătățile construite, densitatea de descărcări la sol Ng specifică amplasamentului exact).

### 11.3. Componentele sistemului de protecție la trăsnet

Sistemul de protecție la trăsnet (SPT/LPS) adoptat cuprinde: instalație de captare (dispozitiv de captare cu tije active — PDA, menționat explicit ca soluție de principiu, alternativ unei rețele de conductoare pe terasă, funcție de configurația finală a acoperișului tehnic), coborâri interconectate la priza de pământ generală (cap. 11.1), inele de echipotențializare intermediare la fiecare 20 m de înălțime (relevant limitat la această clădire, de regim moderat, dar aplicat consecvent conform SR EN 62305-3) și **protecție la supratensiuni (SPD)**, aplicată în cascadă: SPD Tip 1 la tabloul general (protecție împotriva supratensiunilor de mod comun induse direct de o descărcare captată de LPS), SPD Tip 2 la tablourile secundare de etaj/zonă și **SPD dedicat pe liniile de date ale sistemelor medicale critice** (RIS/PACS, cap. 13.3, BMS) — o supratensiune indusă care ar afecta rețeaua de imagistică sau sistemul de monitorizare centralizată ar avea, la o unitate medicală, consecințe clinice directe, nu doar o pierdere de date administrative.

---

## 12. PSI — sprinklere, excepții, hidranți, detecție, desfumare

### 12.1. Sprinklerele — acoperire generală

Conform P118-2/3, cea mai mare parte a clădirii (saloane, coridoare, spații administrative, depozite) este protejată prin **instalație de sprinklere** — soluție impusă și de prezența, la această clădire, a unei aglomerări semnificative de persoane cu mobilitate redusă (pacienți imobilizați, incapabili să se autoevacueze rapid), pentru care stingerea automată la sursă a unui eventual incendiu incipient, înainte ca acesta să se extindă, este de o importanță superioară celei dintr-o clădire cu ocupanți pe deplin mobili. Densitatea de calcul adoptată este de **5 mm/min pe o suprafață de calcul de 216 mp**, corespunzând unui debit de proiectare de **~30 l/s**.

### 12.2. Excepțiile — de ce apa distruge echipamentele critice

În câteva zone bine delimitate ale clădirii, apa de sprinkler nu este soluția de stingere adoptată, pentru că **apa însăși ar produce, la declanșare, o pagubă comparabilă sau superioară celei pe care ar preveni-o, sau ar crea un pericol suplimentar**:

- **Sălile de operație** sunt protejate prin **detecție de incendiu asociată cu un sistem de gaz inert (IG-55)** — un amestec de gaze inerte (de regulă azot și argon) care stinge incendiul prin reducerea concentrației de oxigen sub pragul de combustie, fără a lăsa reziduu și, esențial, **fără a uda echipamentul electric aflat sub tensiune direct în câmpul operator** (masa de operație, aparatul de anestezie, monitoarele, bisturiul electric) — o declanșare de sprinkler exact deasupra unui pacient deschis chirurgical, cu echipament electric activ în imediata apropiere a plăgii, ar constitui, ea însăși, un pericol imediat pentru pacient (contaminare a câmpului steril, risc de electrocutare), independent de incendiul pe care ar trebui să îl stingă.
- **RMN-ul** este protejat prin **detecție de tip aspirativ, foarte sensibilă** (care sesizează un incendiu incipient înainte ca acesta să se dezvolte semnificativ) asociată cu un **sistem de quench de urgență** dedicat magnetului — un aparat RMN funcționează pe baza unui magnet supraconductor, răcit la temperaturi criogenice cu heliu lichid; apa de sprinkler, pe lângă distrugerea directă a componentelor electronice ale unui echipament în valoare de milioane de euro, ar constitui, în prezența unui câmp magnetic intens permanent activ, un risc suplimentar (obiecte metalice proiectate de câmpul magnetic, risc de electrocutare a personalului aflat în interacțiune cu apa în prezența echipamentului electric de mare putere al aparatului).
- **CT, RX și angiograful** sunt protejate prin **gaz FK-5-1-12 sau IG-55** — aceeași rațiune de protejare a echipamentelor electronice de foarte mare valoare și complexitate, pentru care o singură declanșare accidentală de sprinkler ar produce o pagubă echivalentă scoaterii din funcțiune a unui serviciu de imagistică esențial pentru diagnosticul zilnic al pacienților.
- **Serverele** (camera de date, cap. 13.4) sunt protejate prin **gaz + detecție aspirativă VESDA** — aici rațiunea este dublă: protecția fizică a echipamentului IT (la fel de sensibil la apă ca orice alt echipament electronic) și, mai important la o unitate medicală, **protecția continuității sistemului RIS/PACS** (cap. 13.3), a cărui indisponibilitate ar întrerupe accesul radiologilor și al medicilor la imaginile și la datele pacienților în timp real.
- **Tablourile electrice** sunt, de asemenea, protejate prin gaz, nu prin apă — o declanșare de sprinkler direct într-un tablou electric sub tensiune ar produce exact scenariul opus celui dorit: extinderea incendiului prin scurtcircuit generalizat și electrocutarea oricărei persoane aflate în contact cu instalația electrică udată.

### 12.3. Hidranții și grupul de pompare

Se prevăd **hidranți interiori** (2 jeturi simultane × 2,5 l/s pe nivel) și **hidranți exteriori** (3 × 5 l/s), alimentați de un **grup de pompare** compus dintr-o pompă electrică activă și o **pompă de rezervă cu motor Diesel independent** (redundanță de sursă de energie, nu doar de echipament — o avarie a alimentării electrice generale a clădirii nu trebuie, niciodată, să lase clădirea fără capacitate de stingere, exact principiul de proporționalitate a redundanței cu consecința aplicat consecvent în tot memoriul), plus o **pompă pilot** (menține presiunea de linie constantă în afara evenimentelor de incendiu, evitând pornirile inutile ale pompelor principale la mici variații de presiune). Pompa electrică principală este alimentată din **tabloul vital** (cap. 9.5), conform interfeței de continuitate discutate la capitolul 9.

### 12.4. Detecția adresabilă redundantă și evacuarea orizontală progresivă

Detecția de incendiu este organizată pe o **buclă adresabilă închisă** (redundantă — o întrerupere a buclei într-un singur punct nu elimină detecția restului clădirii, semnalul putând circula pe bucla închisă din ambele direcții), cu detectoare optice/multisenzor în saloane și coridoare, detectoare termice la bucătărie (unde detectoarele optice ar genera alarme false frecvente din cauza vaporilor de gătit) și **detecție aspirativă de tip VESDA** (foarte sensibilă, capabilă să detecteze un incendiu incipient înainte de apariția fumului vizibil) la imagistică, servere și arhivă — zone cu echipamente/documente de valoare ridicată, unde o detecție întârziată ar permite dezvoltarea incendiului până la un stadiu greu de stins fără pagube majore.

**Strategia de evacuare adoptată pentru clădirea medicală este evacuarea orizontală progresivă**, nu evacuarea verticală imediată tipică unei clădiri de birouri: un pacient imobilizat la pat sau conectat la echipamente de suport vital (ventilator, monitorizare, linii de perfuzie) nu poate fi, în practică, transportat rapid pe scări în cazul unui incendiu incipient la un etaj îndepărtat de cel afectat — soluția adoptată constă în **compartimentarea rezistentă la foc a fiecărui etaj în cel puțin două sectoare separate prin uși rezistente la foc (EI)**, astfel încât, în caz de incendiu confirmat într-un sector, pacienții sunt mutați, în prima fază, doar în sectorul alăturat al aceluiași nivel (o distanță scurtă, gestionabilă chiar pentru pacienți cu mobilitate redusă, cu paturile lor și cu echipamentul de suport vital portabil), câștigând timp pentru stingere sau pentru o eventuală evacuare verticală ulterioară, mai lentă și mai bine organizată, doar dacă situația o impune. Această strategie este completată de **ascensorul cu funcție de pompieri** (tratat la capitolul 14) și de **zone de refugiu** dedicate la fiecare nivel.

### 12.5. Desfumarea

Casele de scări de evacuare sunt **presurizate** (suprapresiune menținută prin ventilatoare dedicate, comandate de la centrala de detecție), iar coridoarele principale sunt echipate cu ventilatoare de desfumare de tip **F400** (rezistente la temperaturi ridicate pentru un interval minim garantat, suficient pentru desfășurarea completă a evacuării orizontale progresive descrise mai sus), alimentate, la fel ca pompele de incendiu, din **tabloul vital**.

---

## 13. Curenți slabi și sisteme medicale — nurse call, RIS/PACS, BMS

### 13.1. Nurse call — sistemul obligatoriu de apel al pacientului

Conform Ordinului MS 914/2006, fiecare pat de spitalizare este echipat cu un **buton de apel nurse call**, completat de o **pară de apel** (accesibilă pacientului chiar dacă acesta nu poate ajunge la butonul fix) și de un **cordon de apel în băile/grupurile sanitare ale pacienților** (esențial pentru scenariul unui pacient care cade în baie, situație în care un buton fix montat la pat ar fi complet inaccesibil). Fiecare apel este semnalizat simultan pe trei niveluri: un **terminal în cameră** (confirmare vizuală/sonoră pentru pacient, care știe că apelul a fost înregistrat), o **lampă deasupra ușii camerei pe hol** (orientare rapidă a personalului care trece pe coridor, fără a fi nevoie să verifice fiecare cameră individual) și un **afișaj centralizat la nurse station**, cu **prioritizare** a apelurilor (apel normal, apel de urgență, „cod albastru" — protocol de urgență pentru stop cardio-respirator, care necesită mobilizarea imediată a echipei de resuscitare, semnalizat distinct de un apel obișnuit de asistență). La posturile ATI, sistemul include **comunicare vocală bidirecțională** direct cu nurse station, dat fiind că pacientul critic poate necesita comunicare imediată, nu doar semnalizare printr-un buton. Întregul sistem nurse call este alimentat din **tabloul vital**, exact ca gazele medicale și pompele de incendiu — un apel de urgență care nu ar ajunge la personal exact în timpul unei pene electrice ar anula complet rațiunea sistemului.

### 13.2. Sistemele specifice unei unități medicale

| Sistem | Particularitate specifică unei unități medicale |
|---|---|
| Interfon | la sasul blocului operator (comunicare cu exteriorul fără a compromite sterilitatea zonei) |
| CCTV | holuri, farmacie, ATI, perimetru exterior — **exclus explicit din saloane**, cerință de protecție a confidențialității pacientului (GDPR) |
| Control acces | bloc operator, ATI, farmacie (stupefiante), laborator, camera de servere, stațiile de gaze medicale — cu **deblocare automată la alarmă de incendiu confirmată** (siguranța evacuării prevalează asupra restricției de acces) |
| Rețea de date RIS/PACS | tratată complet la capitolul 13.3 |
| Ceas-mamă | cronometru sincronizat în sălile de operație (durata anesteziei, durata intervenției — parametri clinici înregistrați în documentul medical al intervenției) |
| Evacuare voce-alarmare | integrată cu centrala de detecție (P118-3) |
| BMS | tratat complet la capitolul 13.4 |

### 13.3. RIS/PACS — infrastructura de date imagistice

Serviciul de imagistică (RX/CT/RMN, cap. 1.2) generează un volum de date semnificativ per examinare — o examinare CT completă poate atinge **200-500 MB**, iar o examinare RMN, cu multiple secvențe de achiziție, poate depăși **1 GB** — volume care, transmise prin rețeaua de date a clădirii către stațiile de diagnostic ale radiologilor și către arhiva **PACS (Picture Archiving and Communication System)**, necesită o infrastructură de rețea net superioară celei unei clădiri administrative obișnuite. Se adoptă un **backbone de fibră optică de minimum 10 Gbps, în configurație redundantă tip inel** (nu o topologie liniară simplă) — redundanța de topologie este esențială aici pentru un motiv clinic direct: **un radiolog nu poate pune un diagnostic fără acces la imaginea completă**, iar o întrerupere a rețelei de date, chiar temporară, ar întârzia diagnosticul și, implicit, inițierea tratamentului unui pacient, uneori într-un context de urgență unde minutele contează (accident vascular cerebral, politraumă); topologia de inel garantează că o defecțiune pe un singur segment de fibră nu izolează niciun punct al rețelei, traficul putând fi rutat automat pe calea alternativă a inelului. Distribuția orizontală se face pe cablare structurată **categorie 6A**, cu **VLAN medical** dedicat (segregare logică a traficului RIS/PACS de restul traficului administrativ al clădirii, atât din motive de securitate a datelor pacientului, cât și pentru a garanta lățimea de bandă necesară transferurilor de imagistică fără interferența traficului administrativ curent).

### 13.4. BMS — monitorizarea permanentă a parametrilor de siguranță a vieții

Sistemul de management al clădirii (BMS) al unei unități medicale are un rol care depășește cu mult managementul energetic obișnuit al unei clădiri comerciale: BMS-ul monitorizează **permanent presiunile de cascadă** ale zonelor critice (bloc operator, ATI, izolare, cap. 8.2-8.3), cu **alarmă automată la orice pierdere a presiunii de referință** (o cădere a presiunii pozitive dintr-o sală de operație sub pragul de proiect semnalează, imediat, o posibilă compromitere a protecției asepsiei, chiar dacă cauza tehnică — o ușă blocată deschisă, o defecțiune de ventilator — nu este vizibil evidentă din interiorul sălii), monitorizează stările HVAC, gazele medicale (integrat cu alarmele proprii de nivel 1 discutate la capitolul 6.10) și starea surselor electrice (rețea/generator/UPS), oferind personalului tehnic o imagine centralizată, în timp real, a tuturor parametrilor de siguranță ai clădirii — funcție care, la această clădire, nu este o comoditate operațională, ci o componentă activă a lanțului de siguranță a pacientului.

### 13.5. Centrul de date propriu

Clădirea găzduiește un **centru de date propriu**, organizat în **2 camere redundante** (separare fizică pentru continuitate — o avarie sau o intervenție de mentenanță într-o cameră nu afectează disponibilitatea sistemului RIS/PACS/BMS găzduit în cealaltă), cu răcire dedicată și protecție la incendiu prin gaz (cap. 12.2), alimentate atât din **UPS**, cât și din **generator** — aceeași dublă redundanță electrică aplicată sistemelor clinice esențiale, justificată de faptul că indisponibilitatea centrului de date ar întrerupe, simultan, accesul la imagistică, la istoricul medical electronic și la monitorizarea centralizată BMS a întregii clădiri.

---

## 14. Ascensoare — interfața cu instalațiile

Ascensoarele clădirii deservesc, pe lângă fluxul obișnuit de personal și vizitatori, transportul vertical al **pacienților pe targă/pat** între niveluri (de exemplu, transferul unui pacient de la UPU de la parter către blocul operator de la etajul 1, sau către secția de spitalizare de la etajele superioare) — o cerință dimensională (cabină cu adâncime suficientă pentru un pat/targă complet, ușă cu lățime de trecere adecvată) tratată de memoriul de arhitectură, dar cu o interfață electrică directă asupra prezentului memoriu: cel puțin unul dintre ascensoarele clădirii are **funcție de ascensor de pompieri** și este alimentat din **tabloul vital** (rețea + generator), pentru a rămâne disponibil atât pentru transportul de urgență al pacienților critici în timpul unei pene electrice generale, cât și pentru intervenția echipelor ISU în caz de incendiu (cap. 12.4), exact interfața discutată generic la capitolul 1.7 — alimentarea electrică a ascensorului critic nu este un detaliu administrativ, ci o condiție operațională pentru a menține funcțional un flux medical care nu poate fi întrerupt (transferul unui pacient critic către blocul operator).

---

## 15. nZEB adaptat unității medicale — fiabilitate și igienă înaintea eficienței

### 15.1. Măsurile adoptate

| Măsură | Aplicare | Limită impusă de specificul medical |
|---|---|---|
| Recuperare de căldură | obligatorie la debitele mari de aer proaspăt (cap. 8) | circuit intermediar cu glicol în zonele septice — fără niciun transfer direct de aer între fluxul evacuat și cel introdus |
| Anvelopă performantă (C107) | rezistențe termice ridicate pe pereți/ferestre | fără niciun compromis asupra debitelor de ventilare impuse de clasele de puritate (cap. 8) |
| Cogenerare (CHP) | recomandată — producție simultană de electricitate și căldură/ACM, utilă pe tot parcursul anului la o clădire cu funcționare 24/7 | pe gaz natural, cu factor de utilizare energetică țintă peste 85% |
| Solar termic | preîncălzire ACM | finisarea termică la 60°C se face obligatoriu pe sursa sigură din punct de vedere al regimului antilegionella (cap. 3.6), nu direct din câmpul solar |
| Fotovoltaic | montat pe terasa tehnică, consum diurn propriu | nu se conectează, sub nicio formă, la alimentarea sarcinilor vitale (Grupa 2) — un FV fără stocare dedicată nu oferă garanția de continuitate cerută de cap. 1.4 |
| LED + DALI | control automat integral | senzori de prezență/luminozitate **excluși explicit din ATI și blocul operator** — o eventuală stingere automată a iluminatului într-o sală de operație sau la un post ATI, indusă eronat de un senzor, ar fi inacceptabilă |

### 15.2. Tensiunea centrală — recuperarea de căldură versus interdicția de recirculare a aerului septic

Capitolul de față reia și dezvoltă, la nivelul de principiu al eficienței energetice a întregii clădiri, tensiunea deja semnalată punctual la capitolul 8.6: o unitate medicală vehiculează, prin cerința de aer 100% proaspăt fără recirculare în zonele critice (cap. 8.1), un debit de aer proaspăt de tratat (încălzit iarna, răcit și dezumidificat vara) mult superior celui al unei clădiri obișnuite de aceeași suprafață — exact componenta „ventilare" a bilanțului termic (480 kW din totalul de 895 kW calculat la capitolul 7.2, peste jumătate din necesarul total) este consecința directă a acestei cerințe igienice. Din perspectivă pur energetică, soluția evidentă ar fi recuperarea de căldură cu randament maxim (recuperator rotativ, η = 70-85%) pe toate aceste debite — dar un recuperator rotativ clasic, prin însăși construcția sa (un rotor care se rotește continuu între cele două fluxuri de aer, introducere și evacuare, transferând căldura acumulată pe suprafața sa dintr-un flux în celălalt), lasă întotdeauna să treacă, prin imperfecțiunea inerentă a etanșării dintre rotor și carcasă, **un mic procent rezidual de aer direct dintr-un flux în celălalt** — o „scurgere" (carry-over) de ordinul a câteva procente, complet acceptabilă într-o clădire de birouri, dar **inacceptabilă atunci când fluxul evacuat provine dintr-o sală de operație, dintr-o cameră de izolare sau din laboratorul de microbiologie**: acel procent rezidual de aer evacuat, potențial contaminat, ar fi transferat direct în aerul proaspăt introdus în aceeași sală sau, mai grav, într-o altă zonă a clădirii deservită de aceeași unitate de recuperare.

Soluția adoptată — **recuperare prin circuit intermediar cu glicol**, cu **separare fizică totală** între cele două fluxuri de aer (căldura este transferată printr-un lichid purtător care circulă între o baterie montată pe fluxul evacuat și o baterie montată pe fluxul introdus, cele două baterii nefiind niciodată în contact direct de aer) — reprezintă exact compromisul conștient discutat generic la capitolul 8.6: un randament de recuperare mai redus (45-55%, față de 70-85% al unui recuperator rotativ), acceptat deliberat în schimbul eliminării complete a riscului de contaminare încrucișată. Această alegere este un exemplu direct al principiului enunțat la capitolul 1.7 și reluat aici ca temă centrală a eficienței energetice a întregii clădiri: **la o unitate medicală, orice soluție de eficiență energetică este subordonată, fără excepție, siguranței pacientului** — o marjă de 20-30 de puncte procentuale de randament termic, deloc neglijabilă ca sumă absolută de energie pe parcursul unui an, este sacrificată conștient pentru a elimina un risc infecțios care, materializat, ar avea consecințe incomparabil mai grave decât costul energetic suplimentar.

### 15.3. Ținta energetică

Ținta de proiect este atingerea nivelului **nZEB adaptat specificului spitalicesc** (Mc 001), cu o pondere a surselor regenerabile de energie de minimum **30%** din consumul total, recuperare de căldură diferențiată pe zone (45-55% în zonele septice, conform limitării discutate mai sus; 70-85% în zonele non-critice, unde recuperarea rotativă/cu plăci clasică rămâne pe deplin aplicabilă) și un factor de utilizare energetică a cogenerării de peste 85% — indicatori care, spre diferență de o clădire obișnuită, nu sunt urmăriți ca obiectiv independent, ci întotdeauna verificați și, dacă necesar, subordonați cerințelor de fiabilitate și igienă tratate în capitolele precedente.

---

## 16. Acustică și confortul sonor al pacientului

Confortul acustic al unei unități medicale nu este doar o temă de confort, ci un factor documentat de recuperare a pacientului: zgomotul de fond ridicat în saloane și, mai ales, în terapia intensivă (unde pacienții sunt expuși continuu la alarme de echipamente, conversații ale personalului și zgomot mecanic al instalațiilor) este asociat cu perturbarea somnului, cu creșterea nivelului de stres fiziologic al pacientului și, la pacienții critici, cu o recuperare mai lentă — motiv pentru care organizația Mondială a Sănătății recomandă, pentru unitățile de sănătate, niveluri de zgomot de fond de ordinul **35 dB(A) ziua și 30 dB(A) noaptea** în saloane, valori adoptate ca țintă de proiect la capitolul 1.6.

Din perspectiva instalațiilor, această țintă impune o serie de măsuri tehnice concrete: **echipamentele de ventilare care deservesc saloanele și ATI** (unități de tratare a aerului, ventilatoare) sunt selectate și amplasate pentru un nivel de zgomot generat redus, cu atenuatoare de zgomot pe traseele de canale de aer în apropierea zonelor de repaus; **pompele de recirculare ACM și de circulație termică** (cap. 3.7, 7.3), care funcționează continuu 24/7, sunt montate pe suporturi antivibratile, cu racorduri flexibile care previn transmiterea vibrațiilor mecanice către structura clădirii și, de acolo, către saloanele adiacente; iar **coloanele de canalizare** care deservesc etajele de spitalizare (cap. 5), care traversează pe verticală zone imediat adiacente saloanelor, se execută, unde este posibil, din materiale cu proprietăți fonoabsorbante superioare unei conducte PVC standard, exact pentru a preveni perceperea zgomotului de scurgere în saloanele vecine, în special pe timp de noapte, când zgomotul de fond ambiental este cel mai redus și orice sursă suplimentară devine proporțional mai perceptibilă.

---

## 17. Coordonarea interdisciplinară

Complexitatea și densitatea instalațiilor unei unități medicale de această talie — șase rețele sanitare distincte (apă rece, ACM, patru tipuri de apă tratată, cap. 2-4), patru rețele de canalizare separate (cap. 5), șapte tipuri de gaze medicale (cap. 6), instalația termică, ventilarea diferențiată pe clase de puritate (cap. 7-8), instalația electrică pe trei niveluri de continuitate (cap. 9), curenții slabi medicali (cap. 13) — impune o **coordonare interdisciplinară riguroasă** încă din faza de proiectare, nu doar la execuție. Traseele verticale principale (ghene tehnice) trebuie dimensionate cu o rezervă de capacitate suficientă pentru toate aceste rețele, coordonate astfel încât gazele medicale (care nu tolerează nicio proximitate cu urme de ulei sau cu surse de aprindere, cap. 6.9) să nu partajeze traseul cu instalații electrice neprotejate corespunzător, iar coloanele de apă tratată (cap. 4.5, care nu tolerează brațe moarte) să nu fie compromise de intersectări forțate cu alte trasee. Coordonarea se extinde, la punctele de interfață explicit semnalate pe parcursul memoriului (capitolele 6.10, 9.5, 12.2-12.5), cu proiectantul de specialitate al scenariului de securitate la incendiu, ale cărui cerințe de detecție, alarmare, desfumare și compartimentare condiționează direct dimensionarea capacităților/surselor de instalații, fără ca logica de securitate la incendiu propriu-zisă să facă obiectul prezentului memoriu.

---

## 18. Recepția, probele și punerea în funcțiune

Punerea în funcțiune a instalațiilor unei unități medicale urmează o secvență riguroasă, superioară ca exigență celei unei clădiri obișnuite, exact dat fiind caracterul de siguranță a vieții al majorității instalațiilor descrise în acest memoriu: probe de presiune/etanșeitate pe toate circuitele hidraulice (apă rece, ACM, termic, apă tratată) → echilibrarea hidraulică a buclelor de distribuție termică pe fiecare zonă → reglajul debitelor de aer pe fiecare gură de introducere/extracție a tuturor unităților de tratare a aerului, cu **verificarea numărării de particule conform SR EN ISO 14644-1** în toate zonele cu clasă de puritate declarată (ISO 5/7/8) și **verificarea integrității filtrelor HEPA prin testul DOP** (cap. 8.5) pe toate filtrele terminale ale zonelor critice → verificarea și calibrarea sistemului de cascadă de presiuni (cap. 8.2-8.3), cu măsurători instrumentale ale diferenței de presiune la fiecare încăpere critică, nu doar verificare vizuală a sensului fluxului de aer → **probele complete ale instalației de gaze medicale**: etanșeitate pe toată rețeaua, verificarea **identității anti-încrucișare** a fiecărei prize terminale (verificare fizică, priză cu priză, că fiecare punct de utilizare livrează exact gazul etichetat — cea mai critică probă a întregii puneri în funcțiune, dat fiind riscul discutat la capitolul 6.2), verificarea debitelor și presiunilor de regim pe fiecare rețea de gaz, testarea completă a comutării automate a surselor de rezervă (oxigen, cap. 6.3) și verificarea funcțională a alarmelor pe toate cele trei niveluri (cap. 6.10) → probele electrice: verificarea izolației și funcționarea IMD pe sistemul IT medical (cap. 9.3), măsurarea rezistenței egalizării de potențial medicale (≤0,2 Ω, cap. 9.4), verificarea comutării UPS (≤0,5 s) și a comutării generatorului (≤15 s), măsurarea prizei de pământ (≤1 Ω, cap. 11.1) → probele sanitare: verificarea automatizării regimului de temperatură antilegionella (60/55/70 °C, cap. 3.6) și dezinfecția inițială a întregii rețele de apă înainte de darea în exploatare → probele PSI: hidranți, sprinklere, sistemele de gaz inert ale zonelor cu excepție (cap. 12.2), funcționarea integrată a detecției cu desfumarea și cu deblocarea controlului de acces → testul funcțional complet al RIS/PACS și al BMS pe toate punctele de măsură/comandă declarate. Se întocmesc procesele-verbale de probe pe fiecare disciplină, semnate de proiectanții de specialitate și verificate de verificatorii atestați (cap. 19.2), precum și instrucțiunile de exploatare pentru personalul tehnic al unității (frecvența șocului termic antilegionella, protocolul de verificare periodică a filtrelor HEPA și a alarmelor de gaze medicale, procedura de testare periodică a comutării automate a surselor electrice de rezervă).

---

## 19. Concluzii, sinteză de indicatori, verificare tehnică și avize

### 19.1. Sinteza soluțiilor și a indicatorilor de dimensionare

| Instalație | Soluție adoptată | Parametru de calcul |
|---|---|---|
| Apă rece | Branșament dublu + hidrofor 2A+1R | qc ≈ 17,3 l/s; H_nec ≈ 4,2 bar; Q_zi ≈ 94 mc/zi |
| Rezervă apă | Consum 24h + incendiu | 108 + 252 = 360 mc (2×180) |
| ACM | Boilere 2×3.000 l inox 316L + antilegionella automatizat | Q_ACM,mediu ≈ 101,8 kW; vârf ≈ 305 kW |
| Apă tratată | Sterilizare/laborator/dializă/umidificare, buclă inox continuă | <5 / <0,1 µS/cm |
| Canalizare separată | Menajeră/infecțioasă/radioactivă/tehnologică+pluvială | qc,canal ≈ 19,3 l/s; Qp ≈ 21,6 l/s |
| Gaze medicale | VIE 5.000 l + rampe duble + rețea cupru medical | O₂ ≈ 2.040 l/min (123 mc/h); autonomie VIE ≈ 34 h |
| Sursă termică | 2 cazane condensație × 60% (N+1) | Q_total ≈ 895 kW → 2×550 kW |
| Ventilare | Aer 100% proaspăt + cascadă presiuni + HEPA H13/H14 | ISO 5 (sală op.) … ISO 8 |
| Electrice | Dublă rețea + 2 trafo 1.000 kVA + GE | Pi ≈1.560 kW; Pc ≈961 kW; Sc≈1.130 kVA |
| IT medical Grupa 2 | Transformator separare + IMD | alarmă <50 kΩ; 5-8 kVA/sală |
| Iluminat | LED, scialitică reglabilă, iluminat siguranță pe UPS | Ra≥95 câmp operator |
| Priză de pământ/trăsnet | Priză combinată Rp≤1Ω + LPS | C_total ≈18,0 (risc amplificat de ocupare) |
| PSI | Sprinklere + excepții gaz inert (op./RMN/CT/servere) | ~30 l/s sprinklere |
| Curenți slabi | Nurse call + RIS/PACS 10 Gbps redundant inel + BMS | — |
| nZEB | Recuperare diferențiată (45-55% septic / 70-85% curat) | RES ≥30% |

### 19.2. Verificarea tehnică (Legea 10/1995, HG 925/1995)

| Cerință | Domeniu acoperit |
|---|---|
| **Is** | Instalații sanitare, gaze medicale, apă tratată, canalizare separată |
| **It** | Instalații termice, ventilare cu clase de puritate |
| **Ie** | Alimentare electrică redundantă, IT medical, iluminat, curenți slabi, paratrăsnet |
| **Ig** | Instalația de utilizare a gazelor naturale (centrala termică) |
| **C** | Securitate la incendiu (interfață) |

### 19.3. Avize și acorduri necesare

- **ISU** — aviz la scenariul de securitate la incendiu, cu verificarea interfețelor descrise la capitolele 6.10, 9.5, 12.2-12.5;
- **DSP** — autorizația sanitară de funcționare (Ordinul MS 914/2006), acoperind circuitele funcționale, ventilația zonelor critice, regimul apei (potabilă, tratată, antilegionella) și sterilizarea;
- **Apă-canal** — aviz de racordare, inclusiv acceptul pentru evacuarea apelor pretratate (decontaminare infecțioasă, bazine de decădere radioactivă, separator de grăsimi);
- **Energie electrică** — aviz tehnic de racordare, aviz pentru postul de transformare propriu;
- **Gaze naturale** — aviz de racordare pentru centrala termică, conform NTPEE;
- **CNCAN** — dacă unitatea include medicină nucleară sau echipamente radiologice de mare putere, autorizarea privind gestionarea materialelor radioactive, decăderea și ecranarea (cap. 5.3);
- **Mediu (APM)** — gestionarea deșeurilor medicale, a apelor pretratate și a eventualelor emisii.

### 19.4. Notă privind stadiul documentației

Dimensionările din prezentul memoriu au caracter **preliminar, la nivel de DTAC**, fundamentate pe ipoteze de calcul acoperitoare și pe soluții de principiu consacrate pentru unități medicale de această complexitate și capacitate. La faza de **proiect tehnic (PT)** se elaborează: breviarele de calcul complete pe fiecare zonă/circuit (calcul termic pe fiecare încăpere individuală, nu doar pe zonele reprezentative; calcul hidraulic definitiv al tuturor buclelor de distribuție, inclusiv al rețelei de gaze medicale priză cu priză; bilanț electric definitiv pe fiecare circuit, cu selecția concretă a echipamentelor de sursă și de distribuție); schemele funcționale și planurile de execuție pe toate disciplinele; specificațiile tehnice și fișele de echipamente (compresoare, VIE, cazane, unități de tratare a aerului dedicate fiecărei săli de operație, grup electrogen), verificate prin note de calcul semnate de proiectanții de specialitate și avizate de verificatorii atestați menționați la capitolul 19.2. Breviarele complete de coordonare cu scenariul de securitate la incendiu (dimensionarea desfumării, a presurizării, a alarmării vocale, a interblocării electrovalvei de gaz) se elaborează de specialistul atestat PSI, în paralel cu proiectul tehnic de instalații, cu verificarea reciprocă a interfețelor semnalate în prezentul memoriu — în special la punctele critice ale gazelor medicale (cap. 6), ale IT-ului medical (cap. 9.3-9.4) și ale ventilării cu clase de puritate (cap. 8), unde o eventuală neconcordanță între disciplinele de proiectare ar compromite exact acele funcțiuni pe care întregul memoriu le tratează ca prioritate absolută: siguranța pacientului și continuitatea actului medical.
