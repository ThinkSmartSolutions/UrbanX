# Memoriu Tehnic de Rezistență (DTAC) — Școală gimnazială, 300 elevi/12 clase, Corp A (clase) P+2E + Corp B (sală de sport, deschidere 21 m), separate prin rost seismic

**Corp A: cadre spațiale din beton armat monolit, sistem dual (cadre + pereți structurali), clasa de ductilitate medie (DCM). Corp B: stâlpi din beton armat + acoperiș cu ferme metalice cu zăbrele din oțel S355, deschidere liberă 21,00 m. Verificare tehnică duală A1 (beton) + A2 (structură metalică).**

> Prezentul memoriu constituie piesa scrisă de rezistență a documentației tehnice pentru autorizarea executării lucrărilor de construire (D.T.A.C.) a obiectivului „Construire școală gimnazială cu 12 săli de clasă, capacitate 300 elevi, regim P+2E, sală de sport și amenajări exterioare", întocmit conform Legii nr. 10/1995 privind calitatea în construcții (republicată) și a Legii nr. 169/2026 (Codul amenajării teritoriului, urbanismului și construcțiilor — CATUC), art. 264, Anexa nr. 2 și, acolo unde investiția este finanțată din fonduri publice (buget local, PNRR — Componenta C15 Educație, PNDL, POR/POR Regional), a HG nr. 907/2016 privind conținutul-cadru al documentațiilor tehnico-economice. Nivelul de detaliere corespunde fazei D.T.A.C.: se justifică soluția de rezistență adoptată pentru fiecare din cele două corpuri ale clădirii și se prezintă un calcul de predimensionare complet, coerent și verificabil; calculul definitiv (model spațial de calcul, analiză modală spectrală tridimensională, breviar de calcul integral, planuri de cofraj și de armare la scară 1:50/1:25, detalii de execuție la scară 1:20/1:10, proiectul de îmbinări metalice cu liste de bare și caiet de sarcini de montaj) se dezvoltă la fazele P.Th. și D.E., într-un document propriu de tip `structura-pth.md`, care nu se dublează aici. Toate valorile numerice de mai jos sunt calcule de predimensionare/verificare, menite să justifice soluția structurală adoptată la faza de autorizare; ele nu se substituie proiectului tehnic și nici verificării tehnice atestate obligatorii pe cerințele A (rezistență) și, corelat, B (securitate la incendiu) și D (siguranță în exploatare). Prezentul document tratează **exclusiv** rezistența mecanică și stabilitatea structurii (cerința fundamentală A, Legea 10/1995): tema de proiectare, programul funcțional, indicatorii urbanistici, avizele obligatorii (I.S.J., I.S.U., D.S.P.) și încadrarea generală a investiției sunt tratate în `general.md`; distribuția spațiilor (săli de clasă, laboratoare, sală de sport, bloc alimentar, grupuri sanitare), finisajele, tâmplăria și accesibilitatea PMR la nivel de detaliu arhitectural sunt tratate în `arhitectura.md`; instalațiile sanitare, termice, de ventilare-climatizare, electrice și de securitate la incendiu (detecție, semnalizare, hidranți, iluminat de siguranță) constituie obiectul documentului `instalatii.md` și nu se reiau aici decât în măsura strict necesară justificării cerințelor structurale de rezistență la foc (cap. 11). Fiecare dintre aceste documente are un scop distinct și un conținut propriu — nu există suprapunere de conținut între ele, ci trimiteri reciproce prin referință.

---

## 1. Date generale și încadrarea construcției

### 1.1. Obiectul memoriului și particularitatea clădirii — două corpuri, o singură investiție

Prezentul memoriu tehnic de rezistență tratează structura de rezistență a unei clădiri de învățământ gimnazial cu o capacitate de proiectare de **300 de elevi, organizați în 12 clase** (medie 25 elevi/clasă), realizată — spre deosebire de majoritatea funcțiunilor tratate în biblioteca de memorii tip a acestei platforme — **nu ca un singur corp de clădire, ci ca un ansamblu de două corpuri distincte, legate funcțional printr-un hol de distribuție, dar separate structural printr-un rost antiseismic pe toată înălțimea și pe toată adâncimea de fundare**. Această alcătuire nu este o opțiune arhitecturală arbitrară, ci consecința directă a coexistenței, în cadrul aceleiași investiții, a două programe funcționale cu cerințe structurale ireconciliabile într-un sistem unitar:

- **Corp A — corpul de clase și administrativ**, cu regim de înălțime **parter + 2 etaje (P+2E)**, plan dreptunghiular alungit cu coridor central sau lateral, deschideri structurale curente de 6,00 m și 7,20 m, dimensiuni în axe de aproximativ **51,60 m (lungime) × 15,60 m (lățime)** — o clădire „obișnuită" din punctul de vedere al ingineriei structurale, comparabilă ca principii de proiectare cu orice clădire de birouri sau de locuințe cu regim mediu de înălțime, dar cu cerințe de siguranță majorate impuse de prezența elevilor (cap. 1.3).
- **Corp B — sala de sport**, un volum de tip **parter înalt**, cu dimensiuni în axe de aproximativ **33,00 m (lungime) × 21,00 m (lățime)**, caracterizat printr-o **deschidere structurală liberă de 21,00 m, fără niciun stâlp intermediar** — o cerință funcțională (teren de joc reglementat, conform `arhitectura.md` cap. 5, de 15,00 × 27,00 m plus zone de siguranță) care nu poate fi satisfăcută de sistemul structural în cadre de beton armat al Corpului A și care impune, prin urmare, un sistem structural complet diferit.

Alăturarea acestor două tipologii sub un singur acoperiș funcțional — frecventă la orice unitate de învățământ modernă cu sală de sport proprie — ridică, dincolo de proiectarea individuală a fiecărui corp, o problemă structurală specifică și adesea tratată superficial în practica de proiectare curentă: **modul în care cele două corpuri interacționează (sau, mai corect, modul în care se împiedică interacțiunea lor) sub acțiunea seismică**. Această problemă — tratată pe larg în cap. 2.1 — este motivul pentru care prezentul memoriu dedică o secțiune distinctă justificării rostului antiseismic, înainte de a intra în detalierea fiecărui corp în parte.

### 1.2. Date generale ale construcției

| Parametru | Corp A (corp de clase) | Corp B (sală de sport) |
|---|---|---|
| Regim de înălțime | P+2E | Parter înalt |
| Lungime (ax) | cca. 51,60 m | cca. 33,00 m |
| Lățime (ax) | cca. 15,60 m | cca. 21,00 m |
| Raport laturi în plan | 3,3 : 1 (alungit) | 1,57 : 1 |
| Înălțime nivel curent | 3,60 m (înălțime liberă utilă ≈ 3,00 m) | — (volum unic) |
| Înălțime totală la coamă/atic | +11,40 m față de CTS | +8,50 m la streașină / +9,80 m la coamă |
| Suprafață construită la sol (Ac) | cca. 805 m² | cca. 693 m² |
| Deschidere structurală curentă | 6,00 m și 7,20 m (travei de cadru) | 21,00 m liberă, fără reazeme intermediare |
| Sistem structural | Cadre din beton armat monolit + pereți structurali (sistem dual) | Stâlpi din beton armat + acoperiș cu ferme metalice cu zăbrele |
| Element de separație | **Rost antiseismic, lățime 12 cm, pe toată înălțimea și fundația** | idem |

Cele două valori de suprafață construită (805 m² pentru Corp A și 693 m² pentru Corp B) însumează o amprentă totală la sol de aproximativ 1.498 m², coerentă cu bilanțul de suprafețe din `arhitectura.md` (Ac cca. 1.750 m² pe ansamblul incintei, incluzând și circulațiile exterioare acoperite dintre cele două corpuri și eventuale copertine de legătură, care nu fac obiectul calculului de rezistență al celor două corpuri principale). Diferența de regim de înălțime — trei niveluri suprapuse la Corp A față de un singur volum, dar cu înălțime liberă de peste 7,00 m (conform cerinței NP 010-1997/`arhitectura.md` cap. 5), la Corp B — ilustrează deja, înainte de orice calcul, de ce cele două structuri nu pot avea aceeași "personalitate dinamică": Corp A este o structură relativ zveltă pe verticală, cu mai multe niveluri de masă distribuită; Corp B este, structural, mai apropiat de o structură parter cu masă concentrată aproape integral la cota acoperișului. Consecințele acestei diferențe se cuantifică riguros în cap. 2.1 și 2.4.

**Categoria de importanță:** C — normală (HG 766/1997), atât pentru Corp A cât și pentru Corp B, ansamblul fiind tratat unitar din perspectiva HG 766/1997 ca o singură investiție de tip „unitate de învățământ". **Clasa de importanță seismică: II, γI,e = 1,20** (P100-1/2013, tabelul 4.2 — construcții pentru învățământ, cu aglomerări de elevi și capacitate de autoevacuare parțial redusă — cap. 1.3 dezvoltă pe larg justificarea acestei încadrări, inclusiv nuanța specifică vârstei gimnaziale). Această clasă de importanță se aplică **ambelor corpuri**, întrucât ambele adăpostesc, la momente diferite ale zilei, aceiași elevi — Corp B nu este o anexă secundară cu ocupare redusă, ci un spațiu în care se pot afla simultan una sau mai multe clase întregi, plus, la evenimente școlare, un număr de spectatori. **Clasa de ductilitate:** DCM (medie) pentru Corp A (beton armat); pentru Corp B, elementele metalice disipative (contravântuirile) se proiectează, de asemenea, pe principiul disipării controlate, conform P100-1/2013 cap. 6 (structuri metalice), tratat distinct în cap. 2.3 și 7.7.

**Parametrii seismici de amplasament** (exemplu de calcul dezvoltat integral în prezentul memoriu, reprezentativ pentru numeroase municipii reședință de județ din zona de est/nord-est a țării — pentru orice alt amplasament concret, calculul se re-rulează cu perechea `(ag, Tc)` specifică localității, preluată din harta de zonare seismică a P100-1/2013): **ag = 0,25 g; Tc = 0,70 s; TB = 0,14 s; TD = 3,0 s; factorul de amplificare dinamică maximă β0 = 2,50; factorul de importanță și expunere γI,e = 1,20**.

### 1.3. Clasa de importanță și de expunere la cutremur — de ce elevii gimnaziali impun aceeași marjă de siguranță ca preșcolarii, deși argumentul e diferit

Această încadrare este, dintre toate clasificările normative ale clădirii, cea cu impactul cel mai direct asupra dimensionării structurii — ea intervine multiplicativ în forța seismică de calcul (cap. 7.4) și influențează întreaga filozofie de proiectare, motiv pentru care se dezvoltă pe larg mai jos, înainte de a trece la concepția propriu-zisă a sistemului structural.

**Textul normativ.** Conform **P100-1/2013, tabelul 4.2**, construcțiile pentru învățământ — inclusiv școlile gimnaziale — se încadrează în **clasa de importanță și expunere II**, căreia îi corespunde factorul de importanță **γI,e = 1,2**. Formularea normativă vizează construcțiile „a căror rezistență seismică este importantă având în vedere consecințele asociate unei prăbușiri sau avarieri grave", categorie ce include explicit clădirile pentru învățământ, alături de spitale fără componentă de urgență, săli aglomerate și clădiri cu peste 300 de persoane.

**Argumentul specific vârstei gimnaziale — nuanța față de creșă/grădiniță.** Este esențial să se distingă riguros de ce o școală gimnazială primește aceeași încadrare (clasa II, γI,e = 1,2) ca o creșă sau o grădiniță, deși argumentul concret al vulnerabilității utilizatorilor este calitativ diferit între cele două funcțiuni. La o creșă/grădiniță, argumentul dominant este **incapacitatea fizică și cognitivă de autoevacuare** — un copil de câteva luni sau de 2-3 ani nu poate, prin definiție, să interpreteze o alarmă, să se deplaseze singur sau să coboare o scară fără ajutor direct, indiferent de nivelul de organizare al personalului. La o școală gimnazială, elevii au vârste între aproximativ 10 și 15 ani (clasele V-VIII) — vârste la care capacitatea fizică de deplasare autonomă, de interpretare a unei alarme și de parcurgere a unui traseu de evacuare este, în principiu, comparabilă cu a unui adult tânăr. Argumentul care justifică totuși încadrarea în clasa II nu mai este, așadar, incapacitatea de autoevacuare individuală, ci **combinația dintre aglomerarea mare de persoane pe o suprafață relativ compactă și timpul de reacție colectivă necesar unei evacuări ordonate și complete**:

| Criteriu comparat | Creșă/grădiniță (0-6 ani) | Școală gimnazială (10-15 ani) |
|---|---|---|
| Capacitate individuală de autoevacuare | Absentă/foarte redusă — depinde integral de personal | Prezentă — elevul se poate deplasa singur, interpreta o comandă, folosi o scară |
| Argumentul normativ dominant pentru clasa II | Incapacitatea fizică/cognitivă de reacție proprie | Aglomerarea mare (300 elevi + personal) pe fluxuri de evacuare limitate, cu timp de reacție colectivă alungit față de o clădire cu ocupare redusă |
| Comportament de grup la panică | Necesită preluare fizică individuală (personal 1:8-1:10) | Necesită organizare/disciplină de grup (evacuare pe clase, sub coordonarea cadrului didactic) — risc de aglomerare la casele de scări, nu de blocaj individual |
| Consecința asupra timpului de evacuare | Foarte lung, dependent de numărul de adulți disponibili | Moderat-lung, dependent de lățimea fluxurilor de evacuare (`arhitectura.md` cap. 11: capacitate ~50 pers./flux, 2-3 fluxuri/nivel la 100 elevi) |
| Consecința asupra proiectării structurale | γI,e = 1,2, plus rigoare suplimentară privind componentele nestructurale ce ar putea bloca fizic un copil neajutorat | γI,e = 1,2, plus rigoare privind menținerea practicabilă a coridoarelor și caselor de scări (fără fisurare gravă a pereților, fără blocarea ușilor de evacuare prin deformarea cadrelor) pe durata unei evacuări organizate de sute de elevi |

Cu alte cuvinte: la creșă/grădiniță, riscul dominant este ca un singur copil, lăsat fără sprijin, să nu poată ieși din clădire. La școala gimnazială, riscul dominant este ca **fluxul colectiv** de 300 de elevi plus personal, evacuat pe un număr limitat de case de scări (`arhitectura.md` cap. 11: minimum 2 case de scări la extremități opuse), să rămână blocat sau încetinit de o structură care s-a deformat excesiv sau ale cărei elemente nestructurale (tencuieli, tavane, corpuri de iluminat) au căzut pe traseul de evacuare. În ambele cazuri, consecința normativă este identică — γI,e = 1,2 — dar mecanismul fizic prin care riscul devine relevant este diferit: la creșă, e vorba de incapacitate individuală; la școală, de **timp de expunere colectivă prelungit**, generat de volumul mare de persoane care trebuie să părăsească organizat clădirea prin fluxuri de capacitate finită.

**Comparație cu clasele I și III.** Școala gimnazială nu se încadrează în clasa I (γI,e = 1,4, rezervată construcțiilor a căror funcționalitate imediată post-seism este vitală pentru intervenția în comunitate — spitale de urgență, sedii ISU) — o școală nu are rol de infrastructură critică pentru restul comunității; obiectivul normativ este protecția vieții propriilor ocupanți, nu menținerea funcționalității pentru terți. Nu se încadrează nici în clasa III (γI,e = 1,0, tipică locuințelor și birourilor cu utilizatori adulți, ocupare moderată, fără aglomerări speciale) — tocmai din cauza combinației aglomerare mare + timp de evacuare colectivă prelungit, discutată mai sus, care nu se regăsește la o clădire de birouri cu ocupare comparabilă distribuită pe suprafețe mai mari și cu fluxuri de evacuare dimensionate diferit.

**Consecința practică.** Factorul γI,e = 1,20 intervine multiplicativ în calculul forței seismice de bază atât pentru Corp A (cap. 7.4: Fb = γI,e·(Sd/g)·G·λ), majorând cu 20% toate eforturile seismice de calcul față de o clădire identică de clasă III, cât și, corelat, în dimensionarea Corpului B (cap. 7.7), unde majorarea afectează atât stâlpii de susținere ai fermelor, cât și verificarea contravântuirilor. În plus, întreaga filozofie de proiectare — limitarea deplasărilor relative de nivel la stările limită de serviciu (cap. 7.6), detaliile de armare/îmbinare care asigură o cedare ductilă și nu fragilă (cap. 9), și rezistența la foc superioară minimului absolut (cap. 11) — este calibrată pe premisa unei evacuări colective, organizate, de amploare.

### 1.4. Categoria de importanță (HG nr. 766/1997)

Conform **HG nr. 766/1997**, anexa nr. 3 (criterii de stabilire a categoriei de importanță a construcțiilor), ansamblul (Corp A + Corp B) se încadrează în **categoria de importanță „C" — construcții de importanță normală**. Punctajul rezultat din criteriile anexei (funcțiune cu aglomerări de persoane care nu ating pragurile ce ar impune categoria „B" — construcții de importanță deosebită, rezervată, de regulă, clădirilor de învățământ de mari dimensiuni, cu peste 1.000 de utilizatori simultan sau cu funcțiuni speciale, ori clădirilor cu funcțiuni multiple de mare aglomerare) plasează consecvent o școală gimnazială de 300 de elevi pe un singur amplasament în categoria C, tipică pentru majoritatea unităților de învățământ preuniversitar de dimensiuni mici-medii din România. Corelarea celor două sisteme de clasificare — categoria de importanță „C" (Legea 10/1995, prin HG 766/1997) și clasa de importanță și expunere seismică II (P100-1/2013, γI,e = 1,20) — este consistentă și nu trebuie confundată: categoria „C" răspunde la întrebarea "cât de importantă e construcția în ansamblu, din perspectiva consecințelor economice și sociale ale unei defectări", în timp ce clasa seismică II răspunde la întrebarea specifică "cât de sensibilă e comportarea la cutremur, dat fiind profilul utilizatorilor și gradul de aglomerare".

### 1.5. Cerințele fundamentale (Legea nr. 10/1995)

Legea nr. 10/1995 privind calitatea în construcții stabilește șase cerințe fundamentale pe care orice construcție trebuie să le satisfacă pe toată durata de existență: **A** — rezistență mecanică și stabilitate; **B** — securitate la incendiu; **C** — igienă, sănătate și mediu înconjurător; **D** — siguranță și accesibilitate în exploatare; **E** — protecție împotriva zgomotului; **F** — economie de energie și izolare termică. Structura de rezistență descrisă în prezentul memoriu răspunde direct cerinței **A — rezistență mecanică și stabilitate**, verificată la nivelurile A1 (verificarea la calcul, realizată de proiectant) și A2 (verificarea tehnică de proiect, obligatorie prin verificatori atestați MDLPA, independentă de proiectant, condiție de recepție și de obținere a autorizației de construire). Particularitatea structurii duale a acestei clădiri (beton armat la Corp A, structură metalică la acoperișul Corpului B) impune, așa cum se detaliază în cap. 12, **verificarea tehnică pe două specialități distincte, A1 și A2, dar și pe atestarea corespunzătoare — verificator de beton armat pentru Corp A și verificator de structuri metalice pentru Corp B** — o particularitate rar întâlnită la funcțiunile de dimensiuni comparabile din biblioteca de memorii tip a acestei platforme, unde, de regulă, întreaga structură aparține unei singure specialități predominante.

În mod complementar, structura condiționează direct și cerința **B — securitate la incendiu** (prin clasele de rezistență la foc ale elementelor structurale ale ambelor corpuri, dezvoltate în cap. 11, tratată în ansamblu, împreună cu scenariul de evacuare și dotările PSI, în `instalatii.md` cap. 7) și cerința **D — siguranță și accesibilitate în exploatare** (prin limitarea deplasărilor laterale care ar putea bloca ușile de evacuare sau fisura pereții de compartimentare a caselor de scări, cap. 7.6, precum și, indirect, prin ancorarea seismică a elementelor nestructurale grele — tribune mobile, panouri de baschet suspendate, coșuri de baschet reglabile, în Corpul B). Cerințele C (igienă/sănătate), E (zgomot) și F (energie), deși relevante pentru calitatea globală a investiției, nu intră în sfera prezentului memoriu de rezistență și sunt tratate, după caz, în `arhitectura.md` și `instalatii.md`.

### 1.6. Nivelul de asigurare (P100-1/2013)

Proiectarea seismică se face pentru două stări limită distincte, cu cerințe de performanță calitativ diferite, aplicabile, mutatis mutandis, ambelor corpuri ale clădirii:

- **Starea limită ultimă (SLU/ULS)** — corespunzătoare unui cutremur de proiectare cu intervalul mediu de recurență **IMR = 225 ani** (probabilitate de depășire de 20% în 50 de ani). Cerința de performanță: siguranța vieții — structura poate suferi avarii semnificative, inclusiv incursiuni în domeniul plastic al elementelor ductile (grinzile de la Corp A, contravântuirile metalice de la Corp B), dar **fără prăbușire**, asigurând timpul necesar evacuării organizate a elevilor.
- **Starea limită de serviciu (SLS/DLS)** — corespunzătoare unui cutremur mult mai frecvent, cu **IMR = 40 ani** (probabilitate de depășire de 20% în 10 ani). Cerința de performanță: limitarea degradărilor la un nivel care să nu afecteze funcționalitatea imediată a clădirii — la o școală, aceasta înseamnă în mod concret ca, după un cutremur moderat, cursurile să poată continua fără o inspecție de urgență care să constate avarii structurale, iar ușile și geamurile să rămână funcționale.

La Corp A, verificarea SLS (cap. 7.6: drift 7,9 mm față de limita de 18 mm, marjă de aproximativ 2,3×) capătă o importanță practică sporită tocmai datorită clasei de importanță II: un cutremur cu IMR = 40 ani are o probabilitate semnificativă de a se produce chiar în timpul celor 50 de ani de exploatare proiectată a clădirii, iar cerința ca funcționalitatea să rămână neafectată este exact ceea ce protejează procesul educațional de întreruperi și elevii de expuneri repetate la evenimente traumatizante (fisurarea vizibilă a pereților, blocarea ușilor claselor). La Corp B, aceeași logică se aplică deplasărilor relative ale stâlpilor de susținere a fermelor și, indirect, integrității învelitorii și a sistemelor de prindere a acesteia (cap. 7.7).

### 1.7. Cadrul normativ de referință

Proiectarea structurală respectă pachetul de norme europene armonizate (Eurocoduri cu anexele naționale de aplicare) și codurile românești specifice, aplicabile diferențiat celor două materiale structurale prezente în ansamblu:

- **Legea nr. 10/1995** — calitatea în construcții; cerința fundamentală **A — rezistență mecanică și stabilitate**.
- **HG nr. 766/1997** — categoriile de importanță a construcțiilor.
- **HG nr. 907/2016** — conținutul-cadru al documentațiilor tehnico-economice (aplicabil investițiilor din fonduri publice, cazul curent la unitățile de învățământ).
- **SR EN 1990:2004/NA:2006** (Eurocod 0) — bazele proiectării structurilor; grupări de acțiuni, coeficienți parțiali, factori ψ.
- **CR 0/2012** — Cod de proiectare, bazele proiectării construcțiilor (adaptarea națională a grupărilor de acțiuni).
- **SR EN 1991-1-1** (Eurocod 1, partea 1-1) — greutăți proprii și încărcări utile, pe categorii de destinație (relevantă, în special, distincția între categoria C1 — săli de clasă și categoria C4/C5 — sală de sport cu activitate fizică, cap. 6.2).
- **CR 1-1-3/2012** — evaluarea acțiunii zăpezii asupra construcțiilor (relevantă în special pentru acoperișul cu deschidere mare al Corpului B, cap. 6.3).
- **CR 1-1-4/2012** — evaluarea acțiunii vântului asupra construcțiilor (relevantă în special pentru fenomenul de sucțiune pe acoperișul ușor al Corpului B, cap. 6.4).
- **SR EN 1992-1-1:2004/NA** (Eurocod 2) — proiectarea structurilor de beton, reguli generale și reguli pentru clădiri (Corp A, integral, plus stâlpii de beton ai Corpului B).
- **SR EN 1992-1-2** — proiectarea structurilor de beton la acțiunea focului (metoda tabelară, cap. 11).
- **SR EN 1993-1-1** (Eurocod 3, partea 1-1) — proiectarea structurilor de oțel, reguli generale și reguli pentru clădiri (ferme metalice, contravântuiri, Corp B).
- **SR EN 1993-1-8** — proiectarea îmbinărilor structurilor de oțel (noduri de fermă, cap. 9.6).
- **SR EN 1993-1-2** — proiectarea structurilor de oțel la acțiunea focului (cap. 11).
- **SR EN 1998-1:2004/NA** (Eurocod 8) — proiectarea structurilor pentru rezistența la cutremur, prevalat pe teritoriul României de:
- **P100-1/2013** (cu completările ulterioare) — Cod de proiectare seismică, partea I — prevederi de proiectare pentru clădiri: clase de importanță (cap. 4.2), regularitate structurală (cap. 4.4), metode de calcul (cap. 4.5), proiectarea structurilor de beton armat și principiile de ductilitate (cap. 5), proiectarea structurilor metalice și principiile de disipare (cap. 6), rosturi seismice și structuri adiacente (cap. 4.6/4.7 și §4.4.4), proiectarea componentelor nestructurale (cap. 10).
- **SR EN 1997-1/NA + NP 074/2014** — proiectarea geotehnică; conținutul-cadru al studiilor geotehnice; categorii geotehnice.
- **NP 112/2014** — normativ pentru proiectarea structurilor de fundare directă (determinarea presiunii convenționale de bază pconv și a corecțiilor CB/CD/CDu, cap. 4).
- **NE 012-1/2007, NE 012-2/2010** — producerea, transportul, punerea în operă și controlul betonului și al lucrărilor de beton armat.
- **SR EN 1090-2** — execuția structurilor de oțel; cerințe de calitate pentru clasele de execuție EXC (relevantă pentru fermele Corpului B).
- **SR EN ISO 12944** — protecția anticorozivă a structurilor de oțel prin sisteme de vopsire.
- **STAS 6054/77** — adâncimi de îngheț.
- **SR EN 10080 / SR 438** — oțel-beton BST500/B500C.
- **SR EN 10025** — produse laminate la cald din oțeluri de construcție (S355).
- **P118-1/2013, P118-2/2013, P118-3/2015** — securitatea la incendiu a construcțiilor (referință pentru clasele de rezistență la foc ale elementelor structurale, cap. 11; scenariul complet de securitate la incendiu se tratează în `instalatii.md`, cap. 7).

Normativele specifice funcțiunii de învățământ gimnazial — NP 010-1997 (proiectarea clădirilor de învățământ), HG 1534/2008 (standarde de dotare), OMS nr. 119/2014 (norme de igienă pentru colectivități), Legea 198/2023 (rețeaua școlară) — sunt tratate în `general.md` și `arhitectura.md`, în măsura în care privesc dimensionarea funcțională, suprafețele pe elev și dotările; ele nu condiționează, ca atare, dimensiunile elementelor structurale, motiv pentru care nu se reiau în acest memoriu decât acolo unde intersectează direct rezistența (de exemplu, categoria de încărcare utilă corespunzătoare sălilor de clasă și sălii de sport, cap. 6.2, sau dimensiunile terenului de joc care condiționează deschiderea structurală a Corpului B, cap. 2.3).

---

## 2. Sistemul structural — două structuri distincte, un singur rost antiseismic

### 2.1. Principiul de bază — de ce Corp A și Corp B nu pot fi solidarizate structural, deși sunt legate funcțional

Aceasta este decizia conceptuală cea mai importantă a întregului proiect de rezistență și, în același timp, cea mai des greșit înțeleasă în practica de proiectare curentă atunci când o clădire de învățământ include o sală de sport atașată: tentația de a trata ansamblul ca pe o singură clădire, cu o singură structură continuă de la un capăt la altul, doar pentru că cele două volume sunt alăturate și legate printr-un hol comun. Această tentație trebuie respinsă ferm, iar motivul are o bază fizică precisă, care se dezvoltă în continuare.

**Frecvența proprie ca "amprentă dinamică" a unei structuri.** Orice structură, supusă unei mișcări seismice a terenului, nu răspunde instantaneu și uniform, ci vibrează la propria sa **perioadă fundamentală de vibrație T1** — un parametru determinat de raportul dintre masa structurii (M) și rigiditatea ei laterală (K), conform relației generale T1 ∝ 2π√(M/K). Structurile "grele și flexibile" (mase mari, rigiditate laterală relativ redusă) au perioade proprii mai lungi; structurile "ușoare și rigide" au perioade proprii mai scurte. Corp A — o structură pe trei niveluri, cu masă distribuită pe fiecare planșeu, dar rigidizată de sistemul dual cadre+pereți (cap. 2.2) — are, conform calculului din cap. 7.3, o perioadă proprie **T1 ≈ 0,31 s**. Corp B — un volum parter, cu masă concentrată aproape integral la cota fermelor de acoperiș (masa proprie a fermelor + a învelitorii + o fracțiune a încărcării utile de zăpadă, cf. cap. 6), susținut de stâlpi relativ rigizi pe o înălțime mult mai mică — are o perioadă proprie fundamentală semnificativ diferită, tipic mai scurtă pentru direcția rigidizată de contravântuiri și, pe direcția cadrelor de portal, potențial comparabilă ca ordin de mărime, dar cu o distribuție de masă și rigiditate complet diferită pe înălțime.

**Fenomenul de "pounding" (ciocnirea seismică între structuri adiacente).** Dacă două structuri cu perioade proprii diferite ar fi rigidizate împreună sau amplasate suficient de aproape una de cealaltă fără un rost de separație corect dimensionat, ele ar vibra **defazat** sub aceeași mișcare a terenului: în orice moment al cutremurului, deplasarea laterală instantanee a Corpului A (la cota de contact cu Corp B) și deplasarea laterală instantanee a Corpului B nu ar fi nici egale ca valoare, nici sincrone ca fază. Consecința fizică directă este că cele două structuri "se apropie și se depărtează" ciclic una de cealaltă, cu o amplitudine relativă egală cu **suma vectorială (practic, suma algebrică în cazul cel mai defavorabil de opoziție de fază) a deplasărilor absolute ale fiecărei structuri**. Dacă distanța inițială dintre cele două volume este mai mică decât această sumă de deplasări, structurile intră în **coliziune** — fenomenul cunoscut internațional ca **"pounding"** (impact seismic structural) — la fiecare oscilație în care deplasările relative depășesc jocul disponibil.

Impactul rezultat din pounding nu este un fenomen benign: energia cinetică a fiecărei structuri, aflată în mișcare relativă unele față de altele, se disipă brusc prin șoc mecanic direct între elemente structurale (de regulă, planșee sau grinzi de margine ale unui corp lovind stâlpii sau pereții celuilalt corp, la cote care nu coincid neapărat cu cele ale planșeelor omoloage, dat fiind că Corp A are planșee la fiecare 3,60 m, iar Corp B este un volum unic de aproape 8,50-9,80 m). Acest șoc:

1. **Introduce forțe locale de impact de amplitudine mult mai mare decât forțele seismice de calcul obișnuite** — un impact structural generează, pe durate foarte scurte (fracțiuni de secundă), accelerații locale de vârf semnificativ superioare celor rezultate din răspunsul dinamic "lin" al fiecărei structuri considerate separat, exact fiindcă energia cinetică relativă se disipă pe o distanță de deformare foarte mică (grosimea elementelor care intră în contact), rezultând forțe de vârf foarte ridicate (F ≈ Δ(mv)/Δt, cu Δt extrem de mic la un impact rigid-rigid beton pe beton).
2. **Concentrează aceste forțe în puncte care nu au fost dimensionate pentru a le prelua** — un stâlp de colț al Corpului A, proiectat să reziste la momentele și forțele tăietoare rezultate din propriul răspuns seismic (cap. 8.3), nu este dimensionat pentru un impact lateral suplimentar, aplicat brusc, dintr-o direcție și la o cotă care pot fi nefavorabile (de exemplu, la mijlocul unui stâlp, între două planșee, generând un moment de încovoiere local necalculat, similar unui "stâlp scurt" accidental).
3. **Poate declanșa o cedare fragilă locală** (strivirea betonului de acoperire, forfecarea unui stâlp la o cotă neconfinată) care, spre deosebire de mecanismul ductil urmărit prin proiectarea la capacitate a fiecărei structuri în parte (cap. 8.1), nu disipă energie în mod controlat, ci se manifestă ca o cedare bruscă, exact genul de comportare pe care întreaga filozofie a proiectării seismice moderne (P100-1/2013, Eurocod 8) urmărește să o evite.

**De ce rostul de separare rezolvă problema, iar solidarizarea nu.** Soluția normativă la acest fenomen nu este creșterea rezistenței locale a elementelor din zona de contact (o abordare costisitoare și, oricum, incertă, dat fiind că poziția exactă și direcția impactului depind de răspunsul seismic real, greu de predictibil cu precizie la faza de proiectare), ci **eliminarea posibilității fizice de contact**, prin interpunerea unui **rost de dimensiune suficientă încât cele două structuri să poată vibra liber, independent, fără ca deplasările lor relative maxime, însumate, să depășească niciodată lățimea rostului** (calculul de dimensionare a acestei lățimi se dezvoltă în cap. 2.4). Alternativa — solidarizarea rigidă a celor două corpuri printr-o structură continuă — ar elimina, e adevărat, riscul de impact, dar ar introduce o problemă și mai gravă: o structură unică, cu o distribuție de masă și rigiditate extrem de neregulată pe verticală și în plan (o "aripă" de trei niveluri legată rigid de un volum parter cu deschidere de 21 m), ar dezvolta, sub acțiune seismică, torsiuni de ansamblu necontrolabile, concentrări de eforturi exact la interfața dintre cele două tipologii structurale și, practic, ar readuce problema fenomenului de "etaj flexibil"/discontinuitate de rigiditate discutată în alte memorii ale acestei biblioteci (de exemplu, planșeul de transfer al clădirilor hoteliere de tip podium+turn), dar într-o formă și mai greu de calculat, fiindcă discontinuitatea nu ar fi doar verticală, ci și în plan, la joncțiunea dintre cele două amprente diferite.

**Concluzia adoptată.** Cele două corpuri se proiectează ca **structuri complet independente, cu fundații proprii, nesolidarizate nici la infrastructură, nici la suprastructură**, separate pe toată înălțimea și pe toată adâncimea de fundare printr-un **rost antiseismic continuu de 12 cm** (calculul de dimensionare, cap. 2.4), fără nicio punte rigidă între ele (grinzi de legătură rigide, planșee comune, ziduri comune). Legătura funcțională dintre cele două corpuri (holul de acces comun, menționat în `general.md` și `arhitectura.md`) se realizează printr-un element de construcție special conceput pentru a traversa rostul fără a-l anula structural — tipic, o copertină sau o pasarelă de legătură rezemată pe console independente de fiecare corp, cu reazeme care permit deplasarea relativă (reazem fix pe un corp, reazem culisant/pe neopren pe celălalt), sau, în varianta cea mai simplă și mai robustă, un simplu acces exterior acoperit, fără elemente structurale care traversează rostul. Detaliul constructiv exact al acestei legături se stabilește la faza P.Th., în corelare cu proiectul de arhitectură, dar principiul este stabilit definitiv aici: **niciun element structural nu traversează rostul antiseismic fără o soluție explicită de decuplare a deplasărilor relative**.

### 2.2. Corp A — sistemul dual (cadre + pereți structurali) — necesitatea impusă de geometria alungită

**Descrierea sistemului adoptat.** Corp A se realizează în **cadre spațiale din beton armat monolit, clasa de ductilitate medie (DCM)** (conform NP 007 și P100-1/2013): stâlpi de secțiune **50×50 cm** (mărită la **55×55 cm** la stâlpii de colț și la cei aflați pe direcția deschiderii mai mari, de 7,20 m, unde momentele încovoietoare din grinzile principale sunt mai mari); grinzi principale **30×60 cm** (pe deschiderile de 6,00 și 7,20 m); grinzi longitudinale (secundare, pe direcția coridorului) **30×55 cm**; planșee de beton armat monolit, placă de **15 cm grosime**, cu rol dublu de preluare a încărcărilor gravitaționale și de șaibă rigidă orizontală (diafragmă) care redistribuie forțele seismice către elementele verticale proporțional cu rigiditatea lor. Suplimentar față de acest schelet de cadre, **la capetele clădirii și la nucleul de circulație verticală (casele de scări/ascensor) se introduc pereți structurali (diafragme) de 20 cm grosime**, rezultând, per ansamblu, un **sistem dual** (cadre + pereți), conform clasificării P100-1/2013 §4.4.3/tabel 5.1.

**De ce nu este suficientă soluția „doar cadre".** Pentru a înțelege necesitatea pereților structurali, este util să se analizeze explicit ce s-ar întâmpla dacă Corp A ar fi proiectat exclusiv în cadre de beton armat, fără nicio diafragmă, soluție tehnic posibilă și frecvent adoptată la clădiri de dimensiuni și proporții mai favorabile:

1. **Geometria alungită (raport laturi 51,60/15,60 ≈ 3,3:1) amplifică sensibilitatea la torsiune.** Într-o structură pur în cadre, rigiditatea laterală pe direcția lungă (X) este distribuită pe o lungime de peste 50 m, în timp ce rigiditatea pe direcția scurtă (Y) este concentrată pe o lățime de sub 16 m. Chiar și cu o dispunere perfect simetrică a stâlpilor, o astfel de geometrie face ca orice mică asimetrie funcțională (de exemplu, o concentrare de goluri mai mari pe o fațadă pentru iluminatul natural al sălilor de clasă orientate favorabil, conform `arhitectura.md` cap. 3 — iluminat pe latura S/SE/E, cu implicații asupra distribuției rigidității pereților de fațadă nestructurali și, indirect, asupra maselor) să genereze o excentricitate relativă mult mai vizibilă în efectele ei (rotația de ansamblu a planșeului rigid) decât la o clădire compactă, aproape pătrată, unde brațul de pârghie al oricărei excentricități este mult mai scurt.
2. **Un cadru pur, la o clădire alungită, are o rigiditate laterală globală relativ redusă pe direcția transversală**, ceea ce conduce fie la deplasări laterale (drift) prea mari pentru a respecta limitele de la starea limită de serviciu (cap. 7.6), fie la necesitatea unor secțiuni de stâlpi disproporționat de mari doar pentru a controla rigiditatea, cu consecințe negative asupra suprafeței utile a sălilor de clasă și a costului global.
3. **Controlul torsiunii de ansamblu este mult mai eficient realizat prin elemente rigide poziționate la capetele clădirii** (unde brațul de pârghie față de centrul de masă este maxim, deci eficiența lor de a contracara rotația este maximă) **decât prin mărirea uniformă a secțiunii tuturor stâlpilor**. Pereții structurali de 20 cm, amplasați la cele două capete ale corpului alungit și la nucleul central de circulație (care, oricum, din motive funcționale, adăpostește casele de scări și necesită pereți despărțitori robuști), preiau o fracțiune disproporționat de mare din forța seismică totală (proporțional cu rigiditatea lor la încovoiere, mult superioară celei a unui stâlp de cadru), rezultând o structură cu **centrul de rigiditate (CR) foarte apropiat de centrul de masă (CM)** și o excentricitate structurală mică (cap. 3.1), exact condiția care permite calificarea drept "regulată în plan" și, implicit, aplicarea metodei simplificate a forțelor laterale echivalente (cap. 7).

**Comparație cantitativă sistem dual vs. cadre pure — sinteză.**

| Criteriu | Cadre pure (fără pereți) | Sistem dual (adoptat) |
|---|---|---|
| Controlul torsiunii la clădire alungită (3,3:1) | Slab — rigiditatea distribuită uniform nu contracarează eficient excentricitățile funcționale | Foarte bun — pereții de capăt/nucleu concentrează rigiditate exact acolo unde brațul de pârghie e maxim |
| Deplasări laterale (drift) | Mari — necesită secțiuni de stâlpi mult mai generoase pentru a respecta limita SLS | Mult reduse — pereții preiau majoritatea forței seismice, cadrele rămân relativ descărcate lateral |
| Factor de comportare q admisibil | Comparabil sau ușor superior teoretic, dar irelevant dacă structura nu e regulată (posibilă penalizare) | q = 3,50 (adoptat, cap. 7.1), cu structură regulată confirmată |
| Flexibilitate a compartimentării interioare (relevantă pentru eventuale reconfigurări ulterioare ale sălilor de clasă) | Maximă | Foarte bună — doar zonele de capăt/nucleu sunt rigide, restul plan liber |
| Cost/consum de materiale | Potențial mai mare (secțiuni de stâlpi supradimensionate doar pentru rigiditate) | Optim — pereții sunt eficienți estetic-funcțional (case de scări/capete de clădire, oricum necesare) |

**Concluzia adoptată.** Sistemul dual — cadre din beton armat pentru preluarea încărcărilor gravitaționale pe toată suprafața și pentru o parte a forței seismice, completate de pereți structurali de capăt și de nucleu pentru controlul torsiunii și al deplasărilor laterale — reprezintă soluția tehnic și economic optimă pentru geometria specifică a Corpului A, exact motivul pentru care regularitatea în plan (cap. 3.1) se obține fără artificii suplimentare de proiectare.

### 2.3. Corp B — sala de sport, deschiderea liberă de 21,00 m — beton precomprimat versus ferme metalice cu zăbrele

**Cerința funcțională de la care pornește proiectarea structurală.** Terenul de joc reglementat (conform `arhitectura.md` cap. 5, 15,00 × 27,00 m plus zone de siguranță de minimum 1-2 m pe latură) impune, pe direcția transversală a sălii (21,00 m în axe), **o deschidere structurală liberă, fără niciun stâlp intermediar** — orice reazem la mijlocul deschiderii ar intersecta fizic zona de joc sau zona de siguranță reglementată, făcând spațiul inutilizabil funcțional. Această cerință este cea care determină, de fapt, întreaga arhitectură structurală a Corpului B: pereții și stâlpii perimetrali preiau reacțiunile unei structuri de acoperiș care traversează cei 21,00 m dintr-o singură deschidere.

**Cele două soluții tehnic viabile pentru o deschidere de 21 m.** În domeniul deschiderilor de 20-25 m, practica de proiectare oferă, în esență, două alternative structurale competitive pentru elementul de acoperire principal: **grinzile de beton precomprimat** (prefabricate sau turnate monolit cu precomprimare post-întindere) și **fermele metalice cu zăbrele din oțel**. Comparația detaliată a acestor două soluții, pe criteriile relevante pentru funcțiunea de sală de sport școlară, se prezintă în continuare:

| Criteriu | Grinzi de beton precomprimat | Ferme metalice cu zăbrele (adoptat) |
|---|---|---|
| **Masă proprie pe metru liniar** | Foarte mare — o grindă de beton precomprimat cu înălțime tipică L/15÷L/18 (≈1,20-1,40 m pentru L=21 m) cântărește, pentru o lățime aferentă de 6,00 m interax, câteva tone pe metru liniar de grindă | Mult redusă — o fermă metalică cu zăbrele, de aceeași deschidere, are o masă de ordinul a 10-20% din cea a unei grinzi de beton echivalente, datorită raportului rezistență/greutate superior al oțelului și al configurației cu zăbrele (materialul se concentrează în tălpi și diagonale, nu într-o inimă plină) |
| **Consecința asupra masei seismice (cap. 6.5, 7.7)** | Masa mare a acoperișului, concentrată la partea superioară a stâlpilor de susținere, generează o forță seismică orizontală proporțional mare (Fb ∝ G), agravată de brațul de pârghie mare (H de la bază la cota acoperișului) | Masa seismică redusă a acoperișului reduce direct și proporțional forța seismică orizontală transmisă stâlpilor — avantaj direct și cuantificabil la clasa de importanță II, unde forța seismică e deja majorată cu 20% |
| **Montaj și execuție** | Necesită fie turnare monolit cu precomprimare pe șantier (organizare de șantier complexă, timp de întărire și de întindere a cablurilor), fie prefabricare în uzină + transport special (gabarit excepțional pentru o grindă de 21 m) + montaj cu macara de mare capacitate | Montaj rapid — fermele se pot livra în tronsoane (îmbinate prin șuruburi de înaltă rezistență la fața locului, conform SR EN 1993-1-8 și SR EN 1090-2) sau, la deschideri de acest ordin, integral asamblate la sol și ridicate cu macaraua, reducând semnificativ timpul de execuție pe șantier |
| **Cost** | Superior — consum mare de beton de clasă superioară, oțel de precomprimare, cofraje speciale, manoperă de întindere/injectare a cablurilor, transport special dacă e prefabricată | Inferior la deschideri de acest ordin — consumul de oțel, deși cu preț unitar mai mare pe kilogram decât betonul, este mult mai redus în masă totală, iar montajul rapid reduce costurile indirecte de organizare de șantier |
| **Comportare la acțiunea vântului (sucțiune pe acoperiș ușor)** | Masa proprie mare a acoperișului de beton contracarează parțial efectul de sucțiune (uplift) al vântului — greutatea proprie "ajută" la stabilitate | **Masa proprie redusă a acoperișului metalic + panouri sandwich ușoare face ca sucțiunea vântului să poată deveni, în combinația de încărcări, o acțiune critică (potențial favorabilă net negativă, adică ridicare, nu apăsare) — aspect care necesită verificare explicită și ancorare corespunzătoare (cap. 6.4, 7.7)** |
| **Comportare seismică (ductilitate/factor de comportare)** | Structura de acoperiș propriu-zisă (grinda) nu participă, de regulă, la disiparea seismică — rolul disipativ revine stâlpilor de susținere; masa mare, însă, penalizează forța seismică totală | Structura metalică (contravântuiri) poate fi proiectată explicit ca element disipativ, cu factor de comportare q corespunzător (cap. 7.7); masa redusă reduce forța seismică de la sursă |
| **Flexibilitate arhitecturală (pante de acoperiș, integrare instalații)** | Mai rigidă — profilul secțiunii e determinat de calculul de precomprimare | Flexibilă — panele intermediare, contravântuirile și tălpile permit trecerea facilă a instalațiilor (ventilație, electrice) prin golurile zăbrelelor, avantaj funcțional pentru o sală de sport cu cerințe de iluminat/ventilare (`instalatii.md`) |

**Concluzia adoptată și justificarea ei.** Se adoptă soluția cu **ferme metalice cu zăbrele din oțel S355, deschidere L = 21,00 m, interax 6,00 m, înălțime a fermei h ≈ 1,50 m** (raport h/L ≈ 1/14, în domeniul uzual 1/10÷1/15 pentru ferme cu zăbrele la această deschidere), rezemate pe **stâlpi din beton armat 60×60 cm** (soluție preferată variantei cu stâlpi metalici, pentru continuitatea materialului cu restul infrastructurii și pentru o rezistență la foc naturală superioară a stâlpilor, cap. 11), cu **contravântuiri metalice verticale** (dispuse în planul pereților longitudinali, pentru stabilitatea în lungul sălii) și **contravântuiri de acoperiș** (în planul orizontal al fermelor, pentru transmiterea forțelor longitudinale și pentru stabilizarea la flambaj lateral a tălpilor comprimate), completate de **învelitoare din panouri sandwich** (soluție ușoară, coerentă cu strategia de reducere a masei seismice). Reazemele fermelor se concep, conform practicii curente pentru structuri metalice pe reazeme de beton, cu **un reazem articulat fix** (transmite reacțiunea verticală și orizontală, blochează deplasarea) și **un reazem articulat mobil** (permite dilatarea termică liberă a fermei pe lungimea ei, esențială pentru o structură metalică expusă la variații termice mai mari decât o structură de beton masivă, conform coeficientului de dilatare termică al oțelului, α ≈ 12×10⁻⁶/°C).

Justificarea deciziei rezultă din suprapunerea a patru factori, convergenți:

1. **Reducerea masei seismice** — argumentul cel mai important la clasa de importanță II, unde orice reducere a maselor se traduce direct și proporțional în reducerea forței seismice de calcul (cap. 7.7), reducere care se regăsește apoi în economia de secțiune a stâlpilor de susținere și a fundațiilor acestora.
2. **Compatibilitatea cu montajul rapid**, relevant pentru investițiile publice cu termene de execuție impuse contractual (finanțare PNRR/PNDL/POR, cu jaloane de execuție stricte).
3. **Cost total inferior** la această deschidere specifică — pragul economic de trecere de la soluțiile cu inimă plină (portale/grinzi, eficiente până la 25-30 m) către soluțiile cu zăbrele (eficiente peste acest prag) este, conform practicii curente de proiectare a structurilor metalice (cf. și memoriul-tip `hala-industriala/structura.md`, cap. 2.1, unde se detaliază pragurile economice pe tipuri de sisteme), situat chiar în vecinătatea celor 21,00 m analizați aici, iar pentru o deschidere liberă fără posibilitate de reazem intermediar, soluția cu zăbrele rămâne competitivă chiar și sub acest prag teoretic, datorită economiei nete de masă față de betonul precomprimat.
4. **Flexibilitatea de integrare a instalațiilor** — o sală de sport necesită iluminat artificial uniform, ventilare mecanică și, eventual, sisteme de sonorizare suspendate; zăbrelele fermei oferă trasee naturale pentru aceste rețele, fără a necesita străpungeri suplimentare într-o inimă plină de beton sau oțel.

Alternativa beton precomprimat rămâne, teoretic, fezabilă și se menționează explicit pentru completitudinea analizei, dar se **respinge** pentru acest proiect din motivele de mai sus — în special masa seismică suplimentară (nefavorabilă la clasa de importanță II) și costul de execuție (transport special/organizare de șantier complexă pentru o grindă de 21 m, indiferent dacă prefabricată sau turnată monolit).

### 2.4. Rostul seismic — dimensionarea lățimii de separare

Lățimea rostului antiseismic dintre Corp A și Corp B se dimensionează astfel încât, la starea limită ultimă (cutremurul de proiectare, IMR = 225 ani), **suma deplasărilor laterale absolute ale celor două structuri, calculate independent, să nu depășească niciodată jocul disponibil** — condiție impusă explicit de P100-1/2013 §4.4.4, care tratează exact acest caz al structurilor adiacente cu comportare dinamică diferită.

Deplasarea laterală absolută de calcul la cota superioară a fiecărei structuri se estimează, conform practicii de predimensionare (deplasarea elastică amplificată cu factorul de comportare q și cu factorul de reducere ν corespunzător stării limită considerate, conform metodologiei detaliate la cap. 7.6), rezultând:

- **dr,A ≈ 6,0 cm** — deplasarea laterală de vârf a Corpului A la cota superioară (structură pe trei niveluri, mai flexibilă în valoare absolută, deși rigidizată relativ de sistemul dual — deplasarea absolută cumulează contribuția tuturor celor trei niveluri).
- **dr,B ≈ 5,0 cm** — deplasarea laterală de vârf a Corpului B la cota fermelor (structură parter, dar cu stâlpi de înălțime liberă mare, sub 8,50-9,80 m, și cu masă concentrată la partea superioară, ceea ce generează, chiar și la o structură parter, o deplasare absolută semnificativă).

Lățimea minimă necesară a rostului rezultă din suma acestor două deplasări (ipoteza cea mai defavorabilă, de opoziție de fază completă între cele două structuri, conform aceluiași §4.4.4): dmin = dr,A + dr,B = 6,0 + 5,0 = **11,0 cm**. Pentru a acoperi și o marjă de siguranță suplimentară (incertitudinile inerente ale unei predimensionări, care se va confirma prin calculul definitiv la faza P.Th., precum și eventualele imperfecțiuni de execuție ale rostului), se adoptă o **lățime de rost de 12 cm**, ușor superioară minimului calculat.

Rostul se realizează **continuu pe toată înălțimea celor două corpuri și pe toată adâncimea infrastructurii** (inclusiv la nivelul fundațiilor, care sunt complet independente pentru cele două corpuri, cap. 4.2), umplut cu un material compresibil care nu transmite forțe între structuri (polistiren expandat de densitate redusă sau vată minerală necompactată, protejat la partea vizibilă printr-un profil de dilatație/tablă de acoperire flexibilă, care asigură etanșarea la apă și aer fără a rigidiza rostul), fără nicio punte rigidă (fără grinzi de legătură, fără planșee comune, fără ziduri de compartimentare care traversează rostul fără decuplare). Detaliul de execuție al profilului de dilatație vizibil (la fațadă, la pardoseală, la acoperiș) se dezvoltă la faza P.Th., în corelare cu proiectul de arhitectură și cu cerințele de etanșeitate la apă și izolare fonică/termică ale rostului.

---

## 3. Regularitatea structurală

### 3.1. Corp A — regularitatea în plan

**Cadrul normativ.** P100-1/2013 (§4.4.3.2) cere, pentru ca o structură să fie considerată regulată în plan: (a) o formă compactă, apropiată de dreptunghi; (b) o distribuție a maselor și a rigidităților astfel încât centrul de rigiditate (CR) să fie apropiat de centrul de masă (CM) pe fiecare nivel, limitând excentricitatea structurală; (c) un raport rezonabil al laturilor planului (de regulă λ = Lmax/Lmin ≤ 4); (d) absența unor goluri mari sau neregulate în planșee, care ar compromite rolul acestora de șaibă rigidă.

**Verificarea la Corp A.** Cu o amprentă dreptunghiulară de 51,60 × 15,60 m, raportul laturilor este λ = 51,60/15,60 ≈ **3,3**, situat sub limita de 4 impusă de normativ, deși aproape de aceasta — motiv suplimentar (pe lângă cel discutat în cap. 2.2) pentru care sistemul dual, cu pereți dispuși simetric la cele două capete și la nucleul central, este preferat cadrelor pure: dispunerea simetrică a pereților structurali menține **centrul de rigiditate practic suprapus peste centrul de masă (CR ≈ CM)**, cu o excentricitate structurală rezultantă e ≤ 0,10·L, sub limita de alertă normativă. Planșeul de 15 cm grosime, fără goluri mari (scările sunt concentrate la nucleul central, într-o zonă deja rigidizată de pereții structurali, iar golurile de instalații sunt punctuale) își păstrează integral rolul de diafragmă rigidă indeformabilă în planul ei, ipoteză de bază a metodei forțelor laterale echivalente. Concluzia verificării: **Corp A este regulat în plan**.

### 3.2. Corp A — regularitatea în elevație

P100-1/2013 (§4.4.3.3) cere: continuitatea sistemului structural de la fundații până la ultimul nivel; absența retragerilor bruște ale planului între niveluri; absența mecanismului de "nivel flexibil" (soft-storey), adică rigiditatea laterală a fiecărui nivel trebuie să rămână comparabilă cu a nivelurilor adiacente; evitarea stâlpilor scurți accidentali. La Corp A, cele trei niveluri (parter, etaj 1, etaj 2) au **înălțimi egale (3,60 m interax)**, aceeași configurație structurală (cadre + pereți continui de la bază la ultimul nivel) și mase apropiate (planșeele au aceeași grosime și, funcțional, aceeași densitate de compartimentare pe toate cele trei niveluri — săli de clasă și spații conexe, conform `arhitectura.md` cap. 2). Nu există, la niciun nivel, un "parter deschis" de tip comercial sau o retragere bruscă a planului. Singurul punct de atenție specifică, comun tuturor clădirilor de învățământ cu ferestre mari pentru iluminat natural (`arhitectura.md` cap. 10 — raport geam/pardoseală 1/4-1/5), este decuplarea corectă a parapeților și a eventualelor alei de zidărie de umplutură parțială de partea superioară a stâlpilor, pentru a evita apariția accidentală a fenomenului de "stâlp scurt" acolo unde o fereastră înaltă lasă liberă doar o porțiune redusă din înălțimea unui stâlp — detaliu care se tratează constructiv (decuplare cu rost sau prindere flexibilă a parapetului) la faza P.Th., în corelare cu tâmplăria exterioară. Concluzia verificării: **Corp A este regulat în elevație**.

### 3.3. Corp B — regularitatea structurii parter

Fiind o structură cu un singur nivel (parter înalt), Corp B nu ridică probleme de regularitate pe verticală în sensul clasic (nu există niveluri suprapuse care să difere ca rigiditate). Regularitatea în plan se verifică la nivelul dispunerii stâlpilor perimetrali (grilă regulată, interax 6,00 m pe direcția lungă) și a contravântuirilor verticale, dispuse **simetric** pe cele două fațade longitudinale, astfel încât centrul de rigiditate al ansamblului de stâlpi+contravântuiri să rămână apropiat de centrul de masă al acoperișului (masa dominantă a structurii). Concluzia verificării: **Corp B este regulat**.

### 3.4. Consecința regularității asupra metodei de calcul

Fiind ambele structuri regulate atât în plan cât și în elevație, cu perioade proprii de vibrație care nu impun o analiză modală obligatorie la faza de predimensionare (T1,A ≈ 0,31 s, situat sub perioada de colț Tc = 0,70 s, în palierul de amplificare maximă a spectrului — cap. 7.2), P100-1/2013 (§4.5.3.2) permite utilizarea **metodei forțelor laterale echivalente** ca metodă principală de calcul seismic pentru fiecare corp, tratat separat — metodă dezvoltată integral în cap. 7. La faza de proiect tehnic, calculul static echivalent se completează, pentru fiecare corp, cu un **model spațial de calcul cu elemente finite** (bare pentru stâlpi/grinzi/zăbrele, elemente de placă pentru planșeele Corpului A), în care forțele determinate conform cap. 7 se aplică la nivelul fiecărui planșeu/al cotei fermelor, distribuite proporțional cu masele, cu o excentricitate accidentală suplimentară de ±5% din dimensiunea planului, conform §4.4.2 din P100-1/2013. Cele două modele (Corp A și Corp B) rămân **independente**, exact reflectând absența oricărei legături structurale rigide între ele (cap. 2.1).

---

## 4. Infrastructura — geotehnic și fundații

### 4.1. Ipotezele asupra terenului de fundare

Dimensionarea infrastructurii se bazează pe rezultatele Studiului Geotehnic, elaborat conform **NP 074/2014** (documentații geotehnice pentru construcții) și **NP 112/2014** (proiectarea fundațiilor de suprafață), documentație obligatorie și distinctă de prezentul memoriu, ale cărei concluzii se preiau și se aplică aici, pentru un amplasament ipotetic reprezentativ pentru zona de est/nord-est a țării, cu următoarea stratificație (**categoria geotehnică 2**, conform NP 074/2014 — teren relativ omogen, încărcări moderate, fără complicații deosebite, dar suficient de complexă pentru a necesita un studiu geotehnic complet, cu foraje și încercări de laborator):

| Strat | Adâncime aproximativă | Descriere |
|---|---|---|
| 1 | 0,00-0,80 m | Sol vegetal/umplutură — se îndepărtează integral înainte de fundare |
| 2 | sub 0,80 m | Argilă prăfoasă plastic vârtoasă, φ ≈ 16°, c ≈ 25 kPa |
| 3 | intermediar | Praf argilos plastic consistent |
| 4 | mai adânc | Nisip argilos îndesat, Es ≈ 25 MPa |

Adâncimea de îngheț conform **STAS 6054/77** este de **0,90-1,10 m** pentru zona amplasamentului analizat. Nivelul hidrostatic se situează la aproximativ **NH ≈ −3,50 m** față de cota terenului natural — sub cota de fundare adoptată pentru ambele corpuri (cap. 4.3), fapt ce simplifică sensibil proiectarea infrastructurii: nu este necesară o cuvă etanșă la subpresiune, iar execuția fundațiilor nu necesită epuismente permanente. Din straturile portante relevante la adâncimea de fundare adoptată, corectate prin metodologia NP 112/2014 (coeficienți CB, CD, CDu funcție de dimensiunile reale ale fundațiilor), se determină **presiunea convențională de bază pconv ≈ 220 kPa** — valoare care se aplică unitar la ambele corpuri, întrucât întreaga amprentă a clădirii se află pe același amplasament, cu aceeași stratificație.

### 4.2. Alegerea sistemului de fundare pentru fiecare corp

**Corp A.** La o structură duală (cadre + pereți), primele elemente de fundare care se dimensionează diferit sunt cele de sub pereții structurali, care transmit terenului nu doar o încărcare axială, ci și un moment de răsturnare important (pereții de capăt/nucleu preiau o fracțiune disproporționat de mare din forța seismică, cap. 2.2, ceea ce se traduce la baza lor într-un cuplu de răsturnare semnificativ). Pentru aceste elemente se adoptă **fundații continue sub pereți**, dimensionate explicit pentru a converti momentul de răsturnare într-o distribuție de presiuni pe teren (crescută la o margine, redusă/eventual nulă la cealaltă, dar fără desprindere completă la gruparea seismică). Sub stâlpii de cadru se adoptă **fundații izolate**, dimensionate în principal pentru încărcarea axială și pentru un moment de încovoiere moderat. Toate aceste fundații — continue și izolate — se **leagă între ele cu grinzi de fundare pe două direcții ortogonale**, formând un grătar continuu, din aceleași rațiuni discutate și la alte funcțiuni ale bibliotecii (uniformizarea deplasărilor diferențiale la un cutremur major, preluarea corectă a momentelor de la baza stâlpilor/pereților, tratarea infrastructurii ca reazem cvasi-rigid pentru ipotezele de calcul ale suprastructurii). Ca **alternativă**, explicit menționată și recomandată pentru corpul alungit de clasă de importanță II, se analizează un **radier general de 40-50 cm grosime** sub toată amprenta Corpului A — soluție care uniformizează suplimentar tasările (relevantă la o clădire cu o lungime de peste 50 m, unde variații locale ale terenului, chiar minore, ar putea genera tasări diferențiale vizibile pe o structură continuă de asemenea lungime) și oferă o marjă de siguranță suplimentară justificată de importanța funcțiunii. Decizia finală între grătarul de grinzi de fundare și radierul general se confirmă prin studiul geotehnic definitiv (dacă presiunile efective calculate se apropie de presiunea convențională admisă sau dacă se constată neomogenități locale ale terenului pe lungimea corpului, radierul general devine soluția preferată).

**Corp B.** Structura fiind mai simplă (stâlpi perimetrali, fără pereți structurali), se adoptă **fundații izolate sub fiecare stâlp**, dimensionate pentru încărcarea axială (inclusiv componenta verticală transmisă de reazemele fermelor) și pentru momentul de încastrare la baza stâlpului (Corp B fiind o structură parter, cu stâlpi încastrați la bază pentru asigurarea rigidității laterale necesare, spre deosebire de soluția articulată la bază tipică halelor industriale cu cadre — aici, absența unui sistem de cadre transversale complete pe toată deschiderea face ca încastrarea stâlpilor de beton armat să fie mecanismul principal de rigidizare laterală pe direcția fermelor). Fundațiile izolate se **leagă între ele cu grinzi de legătură** perimetrale, cu același rol de uniformizare și de contracarare a deplasărilor diferențiale descris mai sus.

Cota de fundare adoptată pentru ambele corpuri este **Df = −1,50 m** de la cota terenului sistematizat, respectând simultan adâncimea de îngheț (STAS 6054/77) și încadrarea în stratul portant identificat de studiul geotehnic.

### 4.3. Verificarea presiunii pe teren — stâlpul central al Corpului A

Verificarea geotehnică fundamentală constă în compararea presiunii efective transmise de fundație terenului cu presiunea convențională admisă. Se dezvoltă calculul pentru stâlpul interior cel mai solicitat al Corpului A, reprezentativ pentru fundațiile izolate ale cadrelor:

Încărcarea axială de calcul la stâlpul central, rezultată din combinația fundamentală de acțiuni (permanente + utile, pe cele trei niveluri suprapuse și pe suprafața aferentă a stâlpului, interax 6,00-7,20 m pe cele două direcții), se estimează la **N ≈ 1.150 kN**. Pentru această încărcare se adoptă o talpă de fundație izolată de dimensiuni **2,20 × 2,20 m**, cu suprafața:

`Af = 2,20 × 2,20 = 4,84 m²`

Presiunea efectivă pe teren, la gruparea fundamentală, rezultă din raportul dintre încărcarea axială și suprafața tălpii:

`pef = N/Af = 1.150/4,84 = 238 kPa`

Această valoare se compară cu presiunea convențională de bază pconv ≈ 220 kPa, corectată conform NP 112/2014 cu coeficienții CB (funcție de lățimea reală a fundației, B = 2,20 m, superioară lățimii de referință de 1,0 m) și CD (funcție de adâncimea reală de fundare, D = 1,50 m). Pentru o talpă de această dimensiune, presiunea convențională corectată se ridică la aproximativ **250 kPa**, valoare față de care rezultă:

`pef = 238 kPa ≤ pconv,corectat = 250 kPa` → **verificat**, cu o marjă de siguranță de aproximativ 5%.

La **gruparea seismică** (unde încărcarea utilă se reduce conform coeficienților ψ2, cap. 6.5, dar se adaugă efectul momentului de răsturnare seismic, ceea ce, la un stâlp interior fără moment mare de răsturnare, se traduce printr-o creștere moderată a presiunii de vârf), presiunea maximă rezultă de ordinul **pmax ≈ 300 kPa**, comparată cu majorarea admisă la gruparea seismică (practica de proiectare admite depășirea presiunii convenționale de bază cu un factor de până la 1,3-1,5 la gruparea seismică, dat fiind caracterul temporar și excepțional al acțiunii): `1,3 × 250 = 325 kPa ≥ pmax ≈ 300 kPa` → **verificat**.

### 4.4. Verificarea orientativă a tasărilor și hidroizolații

Diferența de rigiditate dintre fundațiile continue de sub pereți și fundațiile izolate de sub stâlpi (Corp A) este exact motivul pentru care legarea acestora printr-un grătar de grinzi de fundare (sau, alternativ, radierul general) este preferată unei soluții de fundații complet independente — grătarul redistribuie parțial încărcările și limitează tasările diferențiale la valori compatibile cu toleranțele structurii de beton armat monolit de deasupra (fisurare admisibilă, fără afectarea funcționalității). La faza de proiect tehnic, tasarea absolută și diferențială se verifică riguros prin calcul, folosind modulul de deformație Es al straturilor identificate de studiul geotehnic definitiv.

Infrastructura (fundații, grinzi de fundare/radier, socluri) se protejează printr-un sistem de hidroizolație orizontală (la nivelul soclului, sub zidăria de umplutură a parterului) și, dacă studiul geotehnic definitiv confirmă condiții de umiditate ridicată a terenului superficial, printr-o hidroizolație verticală a elevațiilor de fundație, coerentă cu cota nivelului hidrostatic estimat (NH ≈ −3,50 m, sub cota de fundare, ceea ce limitează riscul la infiltrații de suprafață, nu la presiune hidrostatică ridicată).

---

## 5. Suprastructura — elemente structurale

### 5.1. Corp A — elemente verticale

**Stâlpii** cadrelor de beton armat monolit au secțiune **50×50 cm** pe majoritatea amprentei, mărită la **55×55 cm** la stâlpii de colț și la cei situați pe deschiderea de 7,20 m (unde momentele de la grinzile principale sunt mai mari), realizați din beton **C25/30**. Efortul axial redus la stâlpul central (verificarea ductilității impuse de DCM, cap. 8.3) se calculează raportând forța axială de calcul la produsul dintre aria secțiunii și rezistența de calcul a betonului:

`νd = NEd/(Ac·fcd) = 1.150.000/(250.000×16,67) = 0,276`

Această valoare, comparată cu limita maximă admisă pentru elemente disipative în clasa DCM (νd ≤ 0,45, conform P100-1/2013 §5.4.3.1), rezultă **0,276 ≤ 0,45 → verificat**, cu o marjă confortabilă care confirmă capacitatea de dezvoltare a ductilității necesare mecanismului de disipare la nivelul grinzilor (principiul "stâlp puternic-grindă slabă", cap. 8.1).

**Pereții structurali (diafragmele)** de capăt și de nucleu au grosime **20 cm**, realizați din același beton **C25/30**, dimensionați ca elemente console verticale, solicitate simultan la încovoiere (moment maxim la baza etajului 1/parterului) și la forță axială (compresiune din încărcările gravitaționale aferente + variația de compresiune/întindere din momentul de răsturnare seismic), cu bulbi confinați la cele două extremități (elemente de margine, cap. 9.4) și armătură distribuită minimă pe inimă.

### 5.2. Corp A — elemente orizontale

**Grinzile principale**, de secțiune **30×60 cm**, susțin planșeele pe deschiderile de 6,00 m și 7,20 m; **grinzile longitudinale** (secundare, pe direcția coridorului) au secțiune **30×55 cm**. **Planșeele**, placă de beton armat monolit de **15 cm grosime**, armate pe două direcții, îndeplinesc simultan rolul de element de preluare a încărcărilor gravitaționale și de diafragmă orizontală rigidă (colector al forțelor seismice către elementele verticale). **Scările** interioare, necesare pentru cele două case de scări la extremitățile opuse ale Corpului A (`arhitectura.md` cap. 10-11), se realizează din **rampe de beton armat monolit tip placă înclinată, grosime 15 cm**, armate corespunzător, cu podeste intermediare integrate în structura planșeelor curente.

### 5.3. Corp B — elemente structurale

**Stâlpii** perimetrali, de beton armat **60×60 cm**, susțin reazemele fermelor la cota de streașină (+8,50 m) și preiau, prin încastrare la bază, rigiditatea laterală necesară structurii pe direcția fermelor. **Acoperișul** este alcătuit din **ferme metalice cu zăbrele, deschidere L = 21,00 m, interax 6,00 m, înălțime h ≈ 1,50 m**, cu tălpi realizate din profile compuse (dimensionate la cap. 8.6), diagonale și montanți din profile mai subțiri (dimensionate la eforturile axiale rezultate din analiza zăbrelei ca grindă cu zăbrele static determinată sau ușor nedeterminată, cu noduri articulate convenționale), **pane metalice** (dispuse perpendicular pe ferme, la interax coordonat cu modulul panourilor de învelitoare), **contravântuiri metalice verticale** (în planul pereților longitudinali) și **contravântuiri de acoperiș** (în planul fermelor, pentru stabilizarea la flambaj lateral a tălpilor superioare comprimate și pentru transmiterea forțelor longitudinale către contravântuirile verticale), completate de **învelitoare din panouri sandwich** ușoare.

---

## 6. Acțiuni și combinații (SR EN 1990/1991, CR 0/2012)

### 6.1. Încărcări permanente

Pentru Corp A: greutatea proprie a planșeului de 15 cm plus finisaje/pardoseală se estimează la **5,50 kN/m²**; pereții despărțitori (compartimentare interioară a sălilor de clasă, ușori/zidărie subțire) se echivalează unei încărcări uniform distribuite de **1,50 kN/m²**; închiderile perimetrale (zidărie de umplutură + termosistem) se estimează la **6,0 kN/m** liniar de fațadă. Pentru Corp B: greutatea proprie a acoperișului ușor (ferme metalice + pane + panouri sandwich) se estimează la **0,50 kN/m²** — valoare mult redusă față de un acoperiș de beton, exact consecința cuantificată a deciziei de la cap. 2.3.

### 6.2. Încărcări utile (SR EN 1991-1-1)

Distincția pe categorii de destinație, conform Eurocod 1, este esențială și diferă semnificativ între cele două corpuri: sălile de clasă (**categoria C1**, spații cu mese) se încarcă cu **3,0 kN/m²**; coridoarele și scările (**categoria C3**, spații cu posibilă aglomerare, fără obstacole) se încarcă cu **4,0-5,0 kN/m²**, valoare superioară sălilor de clasă tocmai datorită potențialului de aglomerare la evacuare; **sala de sport** (categoria **C4/C5** — activități fizice, posibile aglomerări mari la evenimente) se încarcă cu **5,0 kN/m²**, cea mai mare valoare din tot ansamblul, reflectând atât greutatea utilizatorilor în mișcare (efecte dinamice ale activității sportive, acoperite convențional prin valoarea statică echivalentă majorată) cât și posibilitatea de folosire ocazională a sălii pentru adunări/festivități cu public numeros (`arhitectura.md` cap. 6 — sala de festivități, tratată separat, dar sala de sport poate prelua funcțiuni similare la evenimente ample). Terasa (unde e cazul, la Corp A) se încarcă cu **H = 0,4 kN/m²** (categorie H — acoperișuri necirculabile, doar întreținere).

### 6.3. Acțiunea zăpezii (CR 1-1-3/2012)

Valoarea caracteristică de bază a încărcării din zăpadă pe sol, pentru amplasamentul de calcul, este **s0,k = 2,0 kN/m²**. Coeficientul de formă pentru un acoperiș cu pantă redusă (tipic acoperișurilor de tip fermă cu pantă mică, sub 30°) este **μ1 = 0,8**, rezultând încărcarea de calcul pe acoperiș:

`s = μ1·Ce·Ct·s0,k = 0,8×1,0×1,0×2,0 = 1,60 kN/m²`

Pentru Corp B, cu deschidere mare și acoperiș practic plat/cu pantă redusă, se verifică suplimentar și **ipoteza de aglomerare a zăpezii la denivelări** (de exemplu, dacă acoperișul Corpului B ar avea o cotă diferită de cea a unei eventuale construcții adiacente, sau la marginile aticului tehnic) — coeficienți de aglomerare superiori valorii uniforme de 0,8, conform CR 1-1-3/2012, aplicabili local la zonele de acumulare, verificare care se detaliază la faza P.Th. pe baza configurației definitive a acoperișului.

### 6.4. Acțiunea vântului (CR 1-1-4/2012) — sucțiunea pe acoperișul ușor al Corpului B

Presiunea de referință a vântului pentru amplasament este **qb = 0,50 kN/m²**, din care rezultă, prin aplicarea coeficienților de expunere și de rugozitate a terenului, o presiune dinamică de vârf **qp ≈ 0,9-1,1 kN/m²**. Această acțiune produce, pe fațadele expuse, presiuni pozitive (împingere spre interior), dar pe acoperiș — în special pe acoperișurile cu pantă redusă sau plate, cazul Corpului B — coeficienții aerodinamici Cpe devin, pe cea mai mare parte a suprafeței, **negativi** (sucțiune, adică o forță orientată spre exterior/în sus, de "ridicare" a învelitorii).

Fenomenul fizic este următorul: vântul care lovește o clădire cu acoperiș plat/ușor înclinat se separă la muchia de atac (aticul/streașina), formând o zonă de curgere turbulentă deasupra suprafeței acoperișului, în care presiunea statică locală scade sub presiunea atmosferică din jur — exact ca la un profil aerodinamic, unde curgerea accelerată pe extrados generează o presiune redusă (efect Bernoulli aplicat local). Consecința structurală directă este o forță netă orientată de jos în sus, care tinde să "smulgă" învelitoarea și, prin intermediul ei, panele și fermele pe care aceasta este fixată.

**De ce acest fenomen este critic tocmai la un acoperiș ușor, spre deosebire de unul greu.** La un acoperiș de beton (ipoteza respinsă la cap. 2.3), greutatea proprie mare a plăcii contracarează natural sucțiunea — forța de ridicare a vântului trebuie să depășească mai întâi greutatea proprie a acoperișului înainte ca vreun element să fie tras în sus, iar acest lucru, pentru un acoperiș de beton, este practic imposibil la vitezele de vânt de calcul relevante în România. La un acoperiș ușor din panouri sandwich pe ferme metalice (soluția adoptată), greutatea proprie (0,50 kN/m²) este de același ordin de mărime sau chiar inferioară presiunii de sucțiune de vârf (care poate atinge, în zonele de margine/colț ale acoperișului, valori de 1,5-2,0× presiunea de referință, conform coeficienților Cpe din CR 1-1-4/2012 pentru zonele marginale F/G/H ale acoperișurilor plate), ceea ce înseamnă că, în combinația de încărcări SLU cu vântul ca acțiune dominantă (γQ,vânt aplicat unei acțiuni **defavorabile**, care se combină cu γG **minim** = 1,0 pentru greutatea proprie, tocmai pentru a surprinde cazul cel mai defavorabil de smulgere), rezultanta netă pe o porțiune a acoperișului poate deveni o forță de ridicare, nu de apăsare.

**Consecința asupra proiectării.** Se impune, în mod expres:
1. Verificarea ancorării panourilor de învelitoare la pane (număr și rezistență a elementelor de fixare suficiente pentru a prelua forța de smulgere calculată în zonele marginale, mai solicitate).
2. Verificarea prinderii panelor la tălpile superioare ale fermelor (aceleași considerente).
3. Verificarea reazemelor fermelor pe stâlpii de beton — reazemul mobil (cap. 2.3) trebuie să permită dilatarea termică liberă, dar trebuie, în același timp, să fie capabil să transmită o reacțiune de tracțiune (ridicare) dacă rezultanta încărcărilor la acel reazem devine negativă (ceea ce implică o ancorare mecanică a plăcii de reazem în stâlpul de beton, nu doar un simplu așezat pe reazem de neopren, care nu ar prelua tracțiune).

Aceste verificări se dezvoltă cantitativ la faza P.Th., pe baza coeficienților Cpe definitivi pentru geometria exactă a acoperișului (pantă, formă a aticului, zone marginale), dar principiul de proiectare — **acoperișul ușor trebuie ancorat explicit împotriva smulgerii, nu doar dimensionat pentru încărcări gravitaționale** — este stabilit definitiv aici.

### 6.5. Combinații de acțiuni și masa seismică

**Gruparea fundamentală (SLU):** conform CR 0/2012, cu coeficienți parțiali γG = 1,35 (acțiuni permanente, în ipoteza defavorabilă) și γQ = 1,50 (acțiunea utilă de bază), plus coeficientul de combinație ψ0 = 0,7 pentru acțiunile utile secundare (de exemplu, zăpada atunci când acțiunea de bază este utila de exploatare, sau invers).

**Gruparea seismică:** ΣGk + γI,e·AEk + Σψ2·Qk, unde ψ2 = 0,6 pentru categoria de destinație C (săli aglomerate, coridoare, sală de sport), valoare superioară celei tipice unei locuințe (ψ2 ≈ 0,3), reflectând probabilitatea mult mai mare ca o școală să fie efectiv ocupată la capacitate apropiată de cea nominală în orice moment al zilei de funcționare. **Masa seismică efectivă**, rezultată din combinarea coeficientului de cvasipermanență cu factorul de reducere pe distribuția spațial-temporală a încărcării utile (φ = 0,8 pentru nivelurile ocupate simultan cu aceeași destinație, conform §4.2.4 P100-1/2013):

`ψE = φ·ψ2 = 0,8×0,6 = 0,48`

Această valoare este semnificativ superioară celei tipice unei clădiri de locuit (ψE ≈ 0,24), consecință directă a categoriei de destinație și a clasei de importanță — masa seismică efectivă (permanentă + fracțiunea din utilă considerată "mereu prezentă" la un cutremur) este, la o școală, aproape dublă față de o locuință echivalentă ca suprafață, cu efect direct asupra forței seismice de calcul (cap. 7.4).

---

## 7. Calculul seismic (P100-1/2013)

### 7.1. Factorul de comportare q

Pentru **Corp A** — sistem dual din beton armat, clasa de ductilitate DCM, structură regulată (cap. 3.1-3.2) — factorul de comportare de bază pentru un sistem dual DCM este qbază = 3,50, majorat teoretic cu factorul de regularitate în elevație (×1,20 conform P100-1/2013 pentru structuri regulate pe verticală), rezultând un factor teoretic q = 3,5×1,20 = **4,20**; se adoptă însă, acoperitor și conservator, **q = 3,50** (fără a exploata integral majorarea teoretică, marjă de siguranță suplimentară justificată de clasa de importanță II și de complexitatea suplimentară introdusă de coexistența celor două corpuri, chiar dacă structural independente).

Pentru **Corp B** — cadre metalice contravântuite (contravântuiri concentrice, disipare prin plastificarea diagonalelor întinse) — se adoptă **q = 3,0**, valoare tipică structurilor metalice contravântuite concentric de clasă de ductilitate medie, coerentă cu practica de proiectare a structurilor metalice similare (cf. și `hala-industriala/structura.md`, unde se discută pe larg gama factorilor de comportare pentru diverse tipologii de structuri metalice).

### 7.2. Spectrul de proiectare

Pentru palierul de perioade TB ≤ T ≤ TC (unde se situează perioada proprie a Corpului A, cap. 7.3), ordonata spectrului de proiectare se calculează:

`Sd = ag·β0/q = 0,25g×2,50/3,50 = 0,1786 g`

### 7.3. Perioada proprie de vibrație — Corp A

Perioada fundamentală se estimează cu formula empirică simplificată a P100-1/2013 pentru sisteme duale cu pereți:

`T1 = Ct·H^0,75 = 0,050×11,40^0,75 ≈ 0,31 s`

Această valoare, comparată cu perioada de control (colț) a spectrului Tc = 0,70 s, situează structura **în palierul de amplificare dinamică maximă** (TB = 0,14 s ≤ T1 = 0,31 s ≤ Tc = 0,70 s), unde ordonata spectrală este constantă și egală cu valoarea maximă calculată la cap. 7.2 — situație tipică pentru structuri relativ rigide (rigidizate de pereții structurali), la care marja de reducere a forței seismice prin flexibilizare (o structură mai flexibilă ar avea o perioadă mai lungă, potențial în palierul descrescător al spectrului, cu ordonate mai mici) nu este exploatabilă fără a compromite controlul deplasărilor laterale (cap. 7.6) — un argument suplimentar, indirect, în favoarea sistemului dual față de cadre pure, care ar fi condus la o structură mai flexibilă, cu perioadă mai lungă, dar cu deplasări laterale mai greu de controlat la starea limită de serviciu.

### 7.4. Forța tăietoare de bază — Corp A

Greutatea seismică totală a Corpului A, rezultată din însumarea încărcărilor permanente și a fracțiunii cvasipermanente a încărcărilor utile (ψE = 0,48, cap. 6.5) pe cele trei planșee (parter, etaj 1, etaj 2), se estimează la **G ≈ 19.900 kN**. Forța tăietoare de bază rezultă din:

`Fb = γI,e·(Sd/g)·G·λ = 1,20×0,1786×19.900×0,85 ≈ 3.625 kN`

unde factorul λ = 0,85 este factorul de corecție pentru masa modală efectivă (structuri cu mai mult de două niveluri, conform §4.5.3.2.4 P100-1/2013). Raportul dintre forța tăietoare de bază și greutatea seismică totală (coeficientul seismic global echivalent) este:

`Fb/G = 3.625/19.900 = 0,182 (18,2%)`

— o valoare substanțială, care reflectă cumulat efectul seismicității ridicate a amplasamentului (ag = 0,25g), al majorării de 20% impuse de clasa de importanță II și al masei seismice efective ridicate (ψE = 0,48, specifică destinației de învățământ).

### 7.5. Distribuția forței tăietoare pe niveluri — Corp A

Distribuția pe înălțime se face proporțional cu produsul dintre masa fiecărui nivel și cota lui față de bază (Fi = Fb·zi·Gi/Σzj·Gj), rezultând, pentru cele trei niveluri ale Corpului A: parter **~543-742 kN**, etajul 1 **~1.087 kN**, etajul 2 **~1.309 kN** — o distribuție crescătoare cu înălțimea, tipică metodei forțelor laterale echivalente, care concentrează cea mai mare fracțiune a forței la nivelul superior (unde brațul de pârghie față de bază e maxim), cu implicații directe asupra dimensionării elementelor de la etajele superioare (cap. 8).

### 7.6. Verificarea deplasărilor laterale (drift) — Corp A

**La starea limită de serviciu (SLS):** dr = ν·q·dre, unde ν = 0,5 este factorul de reducere pentru clădiri de importanță normală la IMR = 40 ani (P100-1/2013 §4.6.3.2) și dre este deplasarea relativă de nivel calculată elastic din analiza structurală:

`dr = 0,5×3,50×4,5 = 7,9 mm`

comparată cu limita admisă de 0,005×h (h = înălțimea de nivel, 3.600 mm):

`dr = 7,9 mm ≤ 0,005×3.600 = 18 mm` → **verificat**, cu o marjă de aproximativ 2,3× — marjă justificată de necesitatea menținerii funcționalității traseelor de evacuare (case de scări, coridoare) la cutremure frecvente, exact considerentul discutat la cap. 1.6.

**La starea limită ultimă (SLU):** dr = 1,0×q×dre (fără reducerea ν, factorul de reducere aplicându-se doar la SLS):

`dr = 1,0×3,50×4,5 = 15,8 mm`

comparată cu limita admisă de 0,025×h (limita mai permisivă de la SLU, care admite avarii ale elementelor nestructurale, dar nu compromiterea structurii):

`dr = 15,8 mm ≤ 0,025×3.600 = 90 mm` → **verificat**, marjă amplă (aproape 6×), rezultat direct al rigidizării introduse de sistemul dual — o structură în cadre pure ar consuma o fracțiune mult mai mare din această marjă, confirmând cantitativ justificarea de la cap. 2.2.

### 7.7. Calculul seismic al Corpului B

Pentru Corp B, calculul seismic se conduce separat, cu propriul model de masă (dominat de masa acoperișului — ferme + pane + învelitoare + fracțiunea cvasipermanentă a zăpezii, cf. §4.2.4 P100-1/2013, care tratează zăpada ca acțiune variabilă cu propriul coeficient ψ2 redus la acoperișuri) și propriul factor de comportare (q = 3,0, cap. 7.1). Forța seismică orizontală rezultată se distribuie stâlpilor de beton armat perimetrali, proporțional cu rigiditatea laterală a fiecăruia (contribuția contravântuirilor metalice fiind dominantă pe direcția longitudinală, unde acestea sunt dispuse, iar rigiditatea la încovoiere a stâlpilor de 60×60 cm încastrați la bază fiind mecanismul principal pe direcția transversală, a fermelor). Reducerea masei seismice a acoperișului (cap. 2.3) se reflectă direct într-o forță tăietoare de bază proporțional mai mică decât ar rezulta dintr-un acoperiș de beton echivalent ca deschidere — beneficiu cuantificabil care confirmă, o dată în plus, justificarea economică și tehnică a soluției cu ferme metalice.

---

## 8. Verificarea elementelor structurale

### 8.1. Principiul proiectării la capacitate ("stâlp puternic-grindă slabă")

Proiectarea la capacitate (capacity design), principiul central al proiectării seismice ductile moderne, impune ca rezistența la încovoiere a stâlpilor, la fiecare nod, să depășească rezistența la încovoiere a grinzilor care converg în acel nod, cu un factor de suprarezistență:

`ΣMRc ≥ 1,3·ΣMRb`

Această condiție forțează mecanismul de plastificare să se dezvolte în grinzi (elemente mai ușor de proiectat ductil, cu articulații plastice controlate lângă noduri) și nu în stâlpi (a căror plastificare, mai ales dacă survine simultan la un nivel întreg, ar genera un mecanism de "etaj flexibil" cu potențial de prăbușire). Forțele tăietoare de calcul ale grinzilor și stâlpilor se determină, la rândul lor, din momentele capabile efective ale secțiunilor adiacente (nu din analiza elastică directă), asigurând că elementele nu cedează prin forfecare (mecanism fragil) înainte de a-și dezvolta capacitatea de încovoiere (mecanism ductil).

### 8.2. Verificarea grinzii principale (Corp A, 30×60 cm, L=7,20 m)

Momentul încovoietor de calcul la reazem, rezultat din combinația seismică (moment gravitațional + moment din redistribuirea seismică), se estimează la **MEd ≈ 245 kNm**. Aria de armătură necesară rezultă din echilibrul de forțe la secțiunea de beton armat, cu brațul de pârghie interior aproximat z ≈ 0,9d:

`As = MEd/(z·fyd) = 245×10⁶/(504×434,8) = 1.117 mm²`

Se adoptă **4Ø20** (As = 1.256 mm²), rezultând un procent de armare:

`ρ = As/(b·d) = 1.256/(300×504) ≈ 0,748%`

situat confortabil între limitele impuse de DCM (ρmin = 0,26%, calculat din fctm/fyk, și ρmax = 1,4% pentru zone disipative, P100-1/2013 §5.4.2.1) — **verificat**. Armătura transversală (etrieri) în zona critică (2h = 120 cm de la fața stâlpului) se dimensionează la **Ø10/100 mm**, conform criteriilor de confinare și de preluare a forței tăietoare din capacitate.

### 8.3. Verificarea stâlpului (Corp A, 50×50 cm, parter)

Efortul axial redus, calculat la cap. 5.1, este νd = 0,276 ≤ 0,45 — verificat pentru ductilitate. Armătura longitudinală adoptată, la un procent de 1,2% (situat confortabil în intervalul ρl = 1-4% impus de P100-1/2013 pentru stâlpi DCM), rezultă **12Ø18** (As = 3.054 mm²), dispuse uniform pe conturul secțiunii pentru o comportare simetrică la încovoiere biaxială. Armătura transversală (etrieri) în zona critică (lcr ≈ 60 cm de la fața planșeului) se dimensionează la **Ø10/100 mm**, cu agrafe suplimentare pentru confinarea miezului de beton și pentru susținerea laterală a barelor longitudinale împotriva flambajului local.

### 8.4. Verificarea peretelui structural (Corp A, 20 cm)

Peretele de capăt/nucleu se verifică ca element consolă verticală, solicitat la încovoiere compusă cu efort axial (moment maxim și forță axială variabilă între compresiune și, la gruparea seismică cea mai defavorabilă, posibilă întindere la o extremitate). Elementele de margine (bulbi) de la cele două capete ale secțiunii se confinare cu etrieri deși dispuși, dimensionați pentru a menține integritatea betonului comprimat chiar la deformații mari, dincolo de limita de curgere a armăturii. Armătura distribuită pe inima peretelui (verticală și orizontală) respectă minimul de **0,20%** pe fiecare direcție, iar zona critică de la baza peretelui (unde se concentrează cererea de ductilitate) se extinde pe o înălțime hcr = max(lw; Hw/6), unde lw este lungimea peretelui în plan și Hw înălțimea totală a acestuia.

### 8.5. Verificarea planșeului (Corp A, 15 cm)

Planșeul se verifică la încovoiere pe cele două direcții (placă rezemată pe grinzi pe contur), cu armătura dimensionată pentru momentele rezultate din încărcările gravitaționale de calcul (cap. 6.1-6.2), și, separat, la rolul de diafragmă orizontală/colector, verificând capacitatea plăcii de a transmite forțele seismice orizontale de la zonele cu masă mai mare (sau cu excentricitate locală) către elementele verticale rigide (pereții structurali). Săgeata la starea limită de serviciu se limitează la L/250, conform SR EN 1992-1-1.

### 8.6. Verificarea fermei metalice (Corp B, L=21 m, S355)

Fermă cu zăbrele, deschidere L = 21,00 m, sub încărcarea liniară de calcul (permanentă + zăpadă, gruparea fundamentală guvernantă pentru încovoiere), estimată la **q ≈ 18,5 kN/m**. Momentul încovoietor maxim la mijlocul deschiderii, tratând ferma ca o grindă echivalentă simplu rezemată:

`M = q·L²/8 = 18,5×21²/8 = 1.020 kNm`

Acest moment se echilibrează, la o fermă cu zăbrele, printr-un cuplu de forțe axiale în cele două tălpi (superioară comprimată, inferioară întinsă), separate de înălțimea fermei h ≈ 1,50 m:

`N = M/h = 1.020/1,50 = 680 kN`

Aria de secțiune necesară pentru talpa cea mai solicitată, la rezistența de calcul a oțelului S355 (fyd = 355 N/mm² la γM0 = 1,0):

`A,nec = N/fyd = 680.000/355 = 1.915 mm²`

Se adoptă un profil compus de tip **200×100×8** (secțiune dreptunghiulară/casetă sudată, cu aria efectivă A ≈ 4.400 mm²), rezultând o rezervă de secțiune de peste 2× față de necesarul strict de rezistență — rezervă justificată de necesitatea verificării suplimentare la **flambaj** a tălpii superioare comprimate (verificare guvernată nu doar de rezistența secțiunii, ci de lungimea de flambaj dintre punctele de rezemare laterală asigurate de pane și de contravântuirile de acoperiș, conform SR EN 1993-1-1 §6.3), verificare care, la deschideri și interax de pane de acest ordin, necesită frecvent o secțiune superioară minimului strict de rezistență axială.

### 8.7. Verificarea la sucțiune și săgeata fermei

**Verificarea la sucțiune.** Așa cum s-a arătat la cap. 6.4, în combinația de încărcări cu vântul ca acțiune dominantă și greutatea proprie minimă (γG = 1,0), talpa inferioară a fermei — întinsă sub încărcări gravitaționale — poate ajunge, local, în compresiune sub efectul sucțiunii vântului. Această inversare de solicitare se verifică explicit, iar talpa inferioară, deși dimensionată în principal pentru întindere, se contravântuiește (prin contravântuiri orizontale sau prin rigiditatea proprie la compresiune redusă a diagonalelor din zăbrea) pentru a preveni flambajul lateral în ipoteza de inversare a eforturilor.

**Verificarea săgeții.** Săgeata maximă la mijlocul deschiderii se limitează la **L/300 = 21.000/300 = 70 mm**, valoare comparabilă cu cea rezultată din analiza elastică a fermei sub încărcările de serviciu; pentru a compensa vizual și funcțional această deformație (relevantă pentru montajul corect al tâmplăriei/luminatoarelor din planul acoperișului, dacă e cazul), se prevede o **contrasăgeată de montaj** egală cu săgeata calculată sub încărcări cvasipermanente, realizată prin tăierea/asamblarea tălpilor cu o curbură ușoară inversă înainte de montaj.

---

## 9. Detalii de armare seismică (Corp A, DCM) și de îmbinare (Corp B, structură metalică)

### 9.1. Grinzi (Corp A)

Zona critică de la fața stâlpului se extinde pe o lungime **lcr = 1,5·h = 90 cm**; în această zonă, distanța maximă între etrieri se limitează la:

`s ≤ min(hg/4; 24Øe; 150 mm; 8Øbl) = 100 mm`

Se prevăd minimum 2 bare continue, atât la partea superioară cât și la partea inferioară a secțiunii, pe toată lungimea grinzii (cerință de redundanță, care asigură o rezervă de rezistență chiar dacă articulația plastică calculată se dezvoltă altfel decât în ipoteza teoretică). Ancorarea armăturii la nodurile marginale (unde grinda se întâlnește cu stâlpul de colț) se face prin bare cu cârlige la 90°, cu lungime de ancorare majorată conform cerințelor de ductilitate.

### 9.2. Stâlpi (Corp A)

Procentul de armare longitudinală se menține în intervalul **ρl = 1-4%**. Zona critică de la extremitățile stâlpului (bază și cap) se extinde pe o lungime:

`lcr = max(h; lcl/6; 450 mm) = 600 mm`

În zona critică, etrierii se dispun la **Ø10/100 mm**, cu agrafe suplimentare care "țin" barele longitudinale la o distanță maximă de 200 mm între ele, asigurând confinarea eficientă a miezului de beton pe toată secțiunea, nu doar la colțuri.

### 9.3. Noduri grindă-stâlp (Corp A)

Nodurile, zona cu solicitări de forfecare cele mai mari din întreaga structură (concentrarea forțelor tăietoare din grinzile și stâlpii adiacenți, la schimbarea bruscă de direcție a fluxului de eforturi), se armează transversal cu etrieri dimensionați explicit pentru forța tăietoare de nod (calculată din momentele capabile ale grinzilor adiacente, conform proiectării la capacitate), iar armătura longitudinală a stâlpilor se menține continuă prin nod, fără întreruperi sau înnădiri în această zonă critică.

### 9.4. Pereți structurali (Corp A)

Elementele de margine (bulbii) de la cele două capete ale secțiunii peretelui se confinare cu etrieri denși, dimensionați pentru a menține capacitatea de deformare a betonului comprimat dincolo de curgerea armăturii. Armătura distribuită pe direcțiile verticală și orizontală ale inimii respectă minimul de **0,20%**. Zona critică de la baza peretelui se extinde pe o înălțime **hcr = max(lw; Hw/6)**.

### 9.5. Acoperiri cu beton (Corp A)

Clasele de expunere adoptate sunt **XC1** (interior, mediu uscat) și **XC3** (exterior, umiditate moderată), cu acoperiri nominale **cnom = 25-35 mm**, funcție de elementul structural și de cerința suplimentară de rezistență la foc (cap. 11), care poate impune o acoperire majorată față de minimul strict de durabilitate.

### 9.6. Îmbinările structurii metalice (Corp B)

Nodurile fermei (intersecția tălpilor cu diagonalele și montanții) se realizează, conform practicii curente pentru ferme din profile compuse/casetate, prin **sudură în uzină** (pentru sub-ansamblurile prefabricate, controlate în condiții de atelier, cu control nedistructiv al cusăturilor conform SR EN 1090-2, clasa de execuție corespunzătoare structurilor disipative) și prin **îmbinări cu șuruburi de înaltă rezistență (grupa 8.8/10.9), pretensionate**, pentru joncțiunile de montaj la fața locului între tronsoanele de fermă transportate separat — soluție care evită sudura pe șantier (control de calitate mai dificil de asigurat în condiții de teren) și permite un montaj rapid, coerent cu justificarea de la cap. 2.3. Reazemele fermelor pe stâlpii de beton se realizează prin plăci de bază ancorate cu buloane înglobate în stâlp, dimensionate — la reazemul mobil — pentru a permite deplasarea longitudinală liberă din dilatare termică, dar capabile să transmită o eventuală reacțiune de tracțiune rezultată din sucțiunea vântului (cap. 6.4, 8.7).

---

## 10. Materiale

| Material | Clasă | Caracteristici | Utilizare |
|---|---|---|---|
| Beton structură | **C25/30** | fcd = 16,67 MPa | Corp A: stâlpi, grinzi, pereți, planșee, fundații; Corp B: stâlpi, fundații |
| Beton egalizare | C8/10 | — | Sub toate fundațiile (ambele corpuri) |
| Oțel-beton | **BST500 clasa C** | fyd = 434,8 MPa; εuk ≥ 7,5% | Armături Corp A (clasa C obligatorie în zonele disipative — grinzi, stâlpi, pereți) |
| Oțel structural | **S355** | fy = 355 N/mm² | Ferme, pane, contravântuiri — Corp B |
| Șuruburi de înaltă rezistență | grupa 8.8/10.9 | pretensionate | Îmbinări de montaj ale fermelor metalice, Corp B |

Proprietățile generale ale oțelului structural (E = 210.000 N/mm²; G = 81.000 N/mm²; ν = 0,3; α ≈ 12×10⁻⁶/°C) și condițiile de ductilitate impuse elementelor disipative ale contravântuirilor (fu/fy ≥ 1,10, alungire la rupere ≥ 15%) respectă integral SR EN 1993-1-1 și cerințele suplimentare P100-1/2013 cap. 6 pentru structuri metalice cu comportare disipativă.

---

## 11. Rezistența la foc a structurii

### 11.1. Gradul II de rezistență la foc — cerințe pentru elementele structurale

Conform **P118-1/2013**, ansamblul (Corp A + Corp B) se încadrează în **gradul II de rezistență la foc**, corelat cu regimul de înălțime P+2E al Corpului A și cu destinația de învățământ (aglomerări de elevi, evacuare organizată — `instalatii.md` cap. 7 tratează scenariul complet, cu timpii de evacuare și dotările IDSAI/hidranți).

| Element | Cerință | Asigurare |
|---|---|---|
| Stâlpi/pereți portanți (Corp A, b.a.) | R 120 | Acoperire ≥ 35 mm, secțiuni masive (50×50/55×55 cm stâlpi, 20 cm pereți) |
| Grinzi (Corp A, b.a.) | R 120 | Acoperire ≥ 35 mm |
| Planșee (Corp A, b.a.) | REI 90 | Placă de 15 cm beton armat |
| **Stâlpi de beton (Corp B)** | R 120 | Acoperire ≥ 35 mm, secțiune 60×60 cm |
| **Structură metalică — ferme, pane, contravântuiri (Corp B)** | R 60-R 120 | **PROTECȚIE ACTIVĂ OBLIGATORIE** (vopsea intumescentă sau placare cu plăci de gips-carton rezistent la foc/vermiculit) |

### 11.2. Fizica pierderii rezistenței materialelor la temperatură — de ce betonul și oțelul se comportă complet diferit la foc

Diferența fundamentală de comportare la foc dintre Corp A (beton armat) și Corp B (structură metalică) nu este o simplă chestiune de reglementare, ci reflectă o diferență fizică de esență în modul în care fiecare material își pierde rezistența mecanică la temperatură ridicată — diferență care justifică, de altfel, de ce structura metalică necesită o intervenție de protecție activă pe care betonul o obține gratuit, prin propria sa alcătuire.

**Comportarea betonului armat.** Betonul este un material cu **conductivitate termică scăzută și masă termică (capacitate calorică) ridicată** — o secțiune masivă de beton (stâlp 50×50 cm, perete 20 cm) încălzește foarte lent dinspre suprafața expusă focului spre miez, datorită acestei combinații de proprietăți termice. Armătura de oțel-beton, înglobată în beton la o adâncime dată de acoperirea nominală (cnom = 25-35 mm), este astfel **protejată termic de propria masă de beton care o înconjoară** — la un incendiu standard (curba temperatură-timp ISO 834), stratul de acoperire menține temperatura armăturii sub pragul critic (cca. 500°C, unde oțelul de armătură își pierde o fracțiune semnificativă din limita de curgere) pentru o durată care, la acoperirile și secțiunile adoptate, depășește confortabil cele 120 de minute cerute (R120). Cu alte cuvinte, **betonul asigură rezistența la foc printr-o proprietate pasivă, intrinsecă alcătuirii sale** (masă + conductivitate redusă + acoperire), fără a necesita niciun tratament suplimentar de protecție.

**Comportarea oțelului structural.** Oțelul, spre deosebire de beton, are o **conductivitate termică ridicată** (transmite căldura foarte rapid prin toată masa elementului) și o **masă termică redusă pe unitatea de rezistență** — o secțiune de oțel (chiar și un profil "masiv" ca talpa de 200×100×8 mm a fermei) are un raport suprafață expusă/volum mult mai mare decât o secțiune de beton echivalentă structural, ceea ce înseamnă că se încălzește **rapid și uniform pe toată secțiunea**, fără gradientul termic protector pe care îl are betonul. Curba de degradare a rezistenței oțelului cu temperatura (conform SR EN 1993-1-2, factorul de reducere a limitei de curgere kY,θ) arată o pierdere progresivă începând de la aproximativ 400°C, care devine dramatică în intervalul **500-550°C** — la această temperatură, oțelul structural își pierde aproximativ jumătate din limita de curgere la temperatura ambiantă, ceea ce, pentru o structură dimensionată la limita de rezistență a materialului la temperatură normală, echivalează practic cu depășirea capacității portante. Un incendiu necontrolat, standard, atinge și depășește această temperatură critică în interiorul unei încăperi în doar **10-20 de minute** de la momentul de flash-over (generalizarea incendiului), mult sub durata de 60-120 de minute impusă de gradul de rezistență la foc necesar (R60-R120) — motiv pentru care o structură metalică **neprotejată** ar ceda cu mult înainte de a asigura timpul necesar evacuării complete a sălii de sport.

**Sinteza comparativă.**

| Aspect fizic | Beton armat | Oțel structural neprotejat |
|---|---|---|
| Conductivitate termică | Scăzută — gradient termic protector spre miez | Ridicată — încălzire rapidă și uniformă pe toată secțiunea |
| Masă termică relativă | Mare — inerție termică ridicată | Redusă — încălzire rapidă cu energie termică mică |
| Protecția armăturii/materialului portant | Naturală, prin acoperirea de beton | Absentă — materialul portant este direct expus |
| Temperatura critică de pierdere semnificativă a rezistenței | ~500°C, atinsă foarte lent în miezul secțiunii datorită acoperirii | ~500-550°C, atinsă rapid și uniform pe toată secțiunea neprotejată |
| Timp până la cedare într-un incendiu standard, fără protecție suplimentară | Depășește 120 minute la acoperirile/secțiunile adoptate | Poate fi sub 15-20 minute — insuficient pentru evacuare |
| Necesitate de protecție activă suplimentară | Nu — proprietate intrinsecă | **Da — obligatorie** |

### 11.3. Protecția structurii metalice a Corpului B — soluții și criterii de alegere

Pentru a atinge cerința R60-R120 impusă structurii metalice a acoperișului sălii de sport, se analizează două familii de soluții de protecție activă:

**Vopsele intumescente.** Un strat subțire de vopsea specială aplicat pe suprafața profilelor metalice care, expus la temperatură ridicată (declanșare tipică în jurul a 200-250°C), suferă o reacție chimică de expandare, formând un strat carbonizat, poros, cu grosime de zeci de ori mai mare decât grosimea inițială a peliculei — acest strat expandat are o conductivitate termică foarte scăzută (aerul prins în structura poroasă acționează ca izolant), întârziind semnificativ transferul de căldură către oțelul de dedesubt. Grosimea peliculei uscate necesare (măsurată în microni) se dimensionează funcție de factorul de masivitate al profilului (raportul perimetru expus/arie de secțiune — profilele subțiri, cu factor de masivitate mare, necesită o grosime de protecție mai mare pentru aceeași durată de rezistență) și de durata țintă (R60 sau R120). **Avantaje pentru o fermă cu zăbrele expusă vizual (arhitectural)**: păstrează aspectul și geometria elementelor metalice, greutate suplimentară neglijabilă, aplicabilă și în uzină (pe elementele prefabricate) și la fața locului (retuș la îmbinări).

**Placarea cu materiale rezistente la foc.** Alcătuiri de tip plăci de gips-carton rezistent la foc, vermiculit proiectat sau alte materiale de protecție pasivă rigidă, aplicate ca o "cutie" în jurul profilului metalic. **Avantaje**: performanță de protecție foarte ridicată și predictibilă, cost/m² adesea inferior vopselei intumescente la durate mari (R120+). **Dezavantaje pentru o fermă expusă vizual**: ascunde complet geometria zăbrelei (contrar, adesea, intenției arhitecturale de a expune structura metalică într-o sală de sport, unde aceasta face parte din expresivitatea spațiului), mai greu de aplicat pe noduri complexe (intersecțiile de zăbrea), adaugă greutate și necesită structuri suport suplimentare.

**Decizia recomandată** (confirmată definitiv la faza P.Th., în corelare cu proiectul de arhitectură și cu scenariul de securitate la incendiu din `instalatii.md`): **vopsea intumescentă**, soluție care păstrează expresivitatea arhitecturală a fermelor metalice vizibile în sala de sport (o alegere arhitecturală frecventă la acest tip de spații) și oferă flexibilitate de aplicare atât în uzină cât și la montaj, cu performanța dimensionată pentru gradul de rezistență la foc cerut (R60-R120, funcție de calculul definitiv de la P.Th., care corelează timpul de evacuare al sălii cu timpul de intervenție al ISU, conform `instalatii.md` cap. 7).

### 11.4. Corelarea rezistenței la foc cu evacuarea asistată a elevilor

Rezistența la foc a structurii nu este un scop în sine, ci un mijloc de a garanta că traseele de evacuare (case de scări, coridoare, ieșirile din sala de sport) rămân **practicabile pe toată durata evacuării organizate** a elevilor — o evacuare care, la o școală gimnazială (cap. 1.3), se desfășoară pe clase, sub coordonarea cadrelor didactice, prin fluxuri de capacitate limitată (`arhitectura.md` cap. 11: ~50 persoane/flux, 2-3 fluxuri/nivel la 100 elevi). Timpul necesar acestei evacuări organizate — mai lung decât o autoevacuare individuală liberă, dar mai scurt decât evacuarea asistată a unei creșe/grădinițe — trebuie să rămână, în orice scenariu, **inferior timpului până la pierderea capacității portante a structurii** (R60 minim pentru elementele Corpului B, R90-R120 pentru cele ale Corpului A). Corelarea cantitativă exactă a acestor timpi (RSET — timp necesar evacuării — versus ASET — timp disponibil înainte ca structura/mediul să devină impracticabile) face obiectul scenariului de securitate la incendiu din `instalatii.md`, care nu se reia aici; prezentul memoriu se limitează la a confirma că elementele structurale ale ambelor corpuri sunt dimensionate pentru gradul de rezistență la foc necesar, condiție preliminară obligatorie pentru ca respectivul scenariu de evacuare să fie valid.

---

## 12. Concluzii și verificarea tehnică

Structura ansamblului școlar analizat respectă cerința fundamentală A (rezistență mecanică și stabilitate, Legea 10/1995), pentru fiecare dintre cele două corpuri componente și pentru ansamblul lor:

- **Încadrare normativă:** categoria de importanță C (HG 766/1997); clasa de importanță seismică II, γI,e = 1,20 — justificată la Corp A (clasele de elevi) prin combinația aglomerare mare + timp de reacție colectivă la evacuare, iar la Corp B (sala de sport) prin aceleași argumente, aplicate unui spațiu cu potențial de aglomerare punctuală la evenimente (cap. 1.3).
- **Concepția generală:** două corpuri cu comportare dinamică diferită (perioade proprii, distribuții de masă și rigiditate diferite), separate printr-un **rost antiseismic de 12 cm**, dimensionat din suma deplasărilor absolute calculate ale celor două structuri (6,0 + 5,0 cm), care elimină riscul de "pounding" (impact seismic între structuri adiacente) fără a necesita solidarizarea lor structurală, incompatibilă cu diferența de comportare dinamică (cap. 2.1).
- **Corp A:** cadre din beton armat monolit DCM, sistem dual cu pereți structurali de capăt/nucleu, necesar pentru controlul torsiunii la geometria alungită (raport 3,3:1) și pentru limitarea deplasărilor laterale; regularitate confirmată în plan și în elevație.
- **Corp B:** stâlpi de beton armat 60×60 cm + acoperiș cu ferme metalice cu zăbrele S355, deschidere liberă 21,00 m, soluție preferată betonului precomprimat pentru reducerea masei seismice, montajul rapid și costul total inferior, cu verificare explicită a sucțiunii vântului pe acoperișul ușor.
- **Infrastructură:** verificată — presiune efectivă la stâlpul central al Corpului A, pef = 238 kPa ≤ 250 kPa (fundamentală) și pmax ≈ 300 ≤ 325 kPa (seismică).
- **Calcul seismic Corp A:** Sd = 0,1786g; T1 ≈ 0,31 s; Fb ≈ 3.625 kN (Fb/G = 18,2%); drift SLS 7,9 ≤ 18 mm; drift SLU 15,8 ≤ 90 mm — toate verificate cu marje confortabile.
- **Calcul seismic Corp B:** q = 3,0, cu masă seismică redusă datorită soluției cu ferme metalice.
- **Elemente structurale:** verificate la proiectarea la capacitate (stâlp puternic-grindă slabă) pentru Corp A, cu detalii de armare DCM complete (grinzi, stâlpi, noduri, pereți); fermă metalică a Corpului B verificată la încovoiere (N talpă = 680 kN, profil 200×100×8), flambaj, sucțiune și săgeată.
- **Rezistență la foc:** grad II — asigurată natural de beton (R120/REI90 prin secțiuni și acoperire), dar necesitând **protecție activă obligatorie a structurii metalice a Corpului B** (vopsea intumescentă recomandată), datorită pierderii rapide a rezistenței oțelului neprotejat la temperaturi de 500-550°C, incompatibilă cu timpul necesar evacuării organizate a elevilor.

**Verificarea tehnică**, obligatorie conform Legii 10/1995, se realizează de **verificatori atestați MDLPA pe două specialități distincte, corespunzătoare celor două materiale structurale prezente în ansamblu**: verificare **A1 pentru structura de beton armat** (Corp A integral + stâlpii și fundațiile Corpului B) și verificare **A2 pentru structura metalică** (ferme, pane, contravântuiri ale Corpului B), completate de verificarea **Af pentru partea geotehnică** (infrastructura ambelor corpuri). Această dualitate a verificării tehnice — neobișnuită la o clădire de dimensiuni comparabile realizată integral dintr-un singur material — este consecința directă a deciziei structurale fundamentale a proiectului: **două corpuri, cu două materiale și două sisteme structurale, unite funcțional dar separate structural**, fiecare optimizat pentru propria sa cerință dominantă (control al torsiunii pe o clădire alungită, la Corp A; deschidere liberă mare cu masă seismică minimă, la Corp B).

Reglementări aplicate: **P100-1/2013, SR EN 1990-1999 (Eurocodurile 0-8), CR 0/2012, CR 1-1-3/2012, CR 1-1-4/2012, NP 112/2014, NP 074/2014, NP 007, SR EN 1090-2, SR EN ISO 12944, P118-1/2/3, Legea 10/1995**. Valorile de predimensionare prezentate în acest memoriu se confirmă prin analiza modală spectrală tridimensională (model spațial cu elemente finite, pentru fiecare corp în parte) la faza P.Th./D.E., unde se dezvoltă și proiectul complet de îmbinări metalice al Corpului B (liste de bare, caiet de sarcini de montaj, control nedistructiv al sudurilor conform clasei de execuție EXC aplicabile).
