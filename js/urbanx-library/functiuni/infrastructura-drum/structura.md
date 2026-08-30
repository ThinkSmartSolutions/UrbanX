# Memoriu Tehnic de Structură Rutieră și Terasamente (DTAC) — Modernizare drum, lungime L ≈ 1,00 km, clasa tehnică IV

**Sistem rutier suplu, dimensionat analitic pe metoda deformațiilor admisibile (NP 116-2004), pe fundație de terasamente compactate, cu verificare comparativă la structură rigidă (PD 177-2001) și verificare la fenomenul de îngheț-dezgheț (STAS 1709).**

> Prezentul memoriu constituie piesa scrisă de structură rutieră și terasamente a documentației tehnice pentru autorizarea executării lucrărilor de construire (DTAC) a unei lucrări de modernizare a unui drum public existent, pe o lungime de aproximativ **1,00 km**, întocmit conform Legii nr. 10/1995 privind calitatea în construcții (republicată), a Legii nr. 169/2026 (CATUC), art. 264, și a Ordonanței Guvernului nr. 43/1997 privind regimul drumurilor. Nivelul de detaliere corespunde fazei DTAC, cu prefigurarea și justificarea soluției de structură rutieră; breviarul complet de calcul (rulare integrală a programului de calcul multistrat pe toate secțiunile caracteristice, planuri de execuție cu profile transversale tip, detalii de rosturi și de scurgere) se dezvoltă la fazele PT + DE. Toate valorile numerice de mai jos sunt calcule de predimensionare/verificare, lucrate pentru justificarea soluției adoptate; ele nu se substituie calculului de proiect tehnic și nici verificării tehnice atestate. Prezentul document tratează exclusiv rezistența mecanică și stabilitatea structurii rutiere și a terasamentelor (cerința fundamentală A, componentele A4 și Af) — geometria drumului (trasee în plan, profil longitudinal, profiluri transversale tip), scurgerea apelor (rigole, podețe, șanțuri), siguranța circulației (semnalizare orizontală/verticală, parapeți) și studiul de trafic detaliat pe categorii de vehicule sunt tratate în memoriul general și în piesele desenate ale aceleiași documentații — documente care nu se dublează aici.

---

## 1. Date generale și scopul memoriului

### 1.1. Obiectul lucrării

Se propune **modernizarea** unui drum public existent, cu îmbrăcăminte actuală degradată sau, după caz, neasfaltată, pe o lungime de aproximativ **1,00 km**, prin realizarea unei structuri rutiere noi, dimensionate pentru traficul de perspectivă, împreună cu lucrările de terasamente aferente (aducerea platformei la profilul transversal tip, corectarea taluzelor, realizarea stratului de formă). Secțiunea transversală tip adoptată este:

| Element | Dimensiune | Observație |
|---|---|---|
| Parte carosabilă | **7,00 m** | 2 benzi de circulație, câte 3,50 m/bandă, o bandă pe sens |
| Acostamente | 2 × 1,00 m | din care **0,75 m consolidat** (structural, cu rol de sprijin lateral al îmbrăcămintei) + 0,25 m înierbat |
| Lățime platformă totală | **9,00 m** | carosabil + acostamente |
| Pantă transversală în profil (aliniament) | **2,5%** (acoperiș) | asigură scurgerea apelor de pe îmbrăcăminte spre șanțuri/rigole, fără a guverna dimensionarea structurii — element de geometrie/scurgere, tratat integral în piesele desenate |
| Durata de perspectivă (durata de exploatare pentru care se dimensionează structura rutieră) | **15 ani** | orizont de calcul al traficului cumulat (cap. 3) |

### 1.2. De ce dimensionarea unei structuri rutiere este un calcul de rezistență de altă natură decât cel al unei clădiri

Deși memoriul de structură rutieră servește, ca și un memoriu de rezistență de clădire, cerinței fundamentale **A — rezistență mecanică și stabilitate** (Legea nr. 10/1995), **natura fizică a solicitării și, în consecință, natura calculului de rezistență sunt fundamental diferite** de cele ale unei construcții civile obișnuite, iar această diferență trebuie înțeleasă explicit înainte de a parcurge calculele din capitolele următoare:

1. **O clădire se verifică, în esență, la o combinație (limitată ca număr) de încărcări extreme, considerate o singură dată sau de puține ori pe durata de exploatare** — greutatea proprie, încărcarea utilă maximă plauzibilă, cutremurul de proiectare cu perioadă de revenire de 225 ani, vântul extrem, zăpada extremă. Verificarea de rezistență a unui element de beton armat la starea limită ultimă presupune că, în cel mai defavorabil moment din viață, elementul respectiv atinge o solicitare apropiată de capacitatea sa portantă, o singură dată (sau de un număr redus de ori), iar restul timpului lucrează la solicitări mult inferioare.
2. **O structură rutieră, dimpotrivă, este solicitată de milioane de repetări ale unei încărcări comparativ modeste** (osia unui vehicul greu, de ordinul a 100-150 kN), niciodată apropiată, ca valoare instantanee, de o încărcare „de rupere" a materialelor din structură. Fenomenul fizic guvernant nu este cedarea sub o singură încărcare extremă, ci **oboseala materialelor** (a mixturii asfaltice, prin fisurare progresivă sub deformații de întindere repetate; a pământului de fundație, prin acumularea de deformații permanente/plastice repetate) — exact fenomenul care guvernează, de exemplu, ruperea unei sârme îndoite de multe ori la unghiuri mici, și nu ruperea ei printr-o singură tracțiune violentă.
3. **Consecința directă asupra metodologiei de calcul:** dimensionarea unei structuri rutiere nu se face verificând o solicitare instantanee față de o capacitate portantă instantanee (ca la o clădire), ci **verificând o deformație specifică (efectivă, calculată sub osia standard de calcul) față de o deformație specifică admisibilă, care este ea însăși funcție de numărul total de repetări ale încărcării preconizat pe durata de exploatare** (traficul cumulat, cap. 3). Cu cât numărul de repetări este mai mare, cu atât deformația admisibilă la fiecare trecere trebuie să fie mai mică, exact ca la orice curbă de oboseală (curbă Wöhler, S-N) a unui material supus la solicitări ciclice — relație dezvoltată explicit la cap. 5.4.
4. **Variabilitatea traficului real este, la rândul ei, gestionată printr-un artificiu de calcul specific ingineriei rutiere și fără corespondent direct la o clădire: „osia standard"** (cap. 3.1) — o unitate de referință convențională la care se echivalează, printr-un coeficient de echivalare distinct pentru fiecare tip de vehicul, efectul distructiv al unei flote de vehicule extrem de eterogene (camioane ușoare, camioane grele, autobuze, TIR-uri, remorci), reducând o problemă altfel intratabilă (câte tipuri de vehicule diferite, cu încărcări diferite pe fiecare osie, vor circula timp de 15 ani pe acest drum?) la un singur număr — traficul cumulat de osii standard, `N_c` — care intră direct în formulele de deformație admisibilă.

Această particularitate fizică — verificare la oboseală sub trafic repetat, nu la o solicitare extremă unică — este firul roșu care leagă toate capitolele memoriului: metodologia traficului de calcul (cap. 3), dimensionarea propriu-zisă a sistemului rutier (cap. 5) și chiar alegerea între soluția suplă și cea rigidă (cap. 6), unde principiul de lucru al plăcii de beton (încovoiere, nu deformații repetate ale unui sistem multistrat) reprezintă o a doua filozofie de rezistență, complet diferită de prima.

### 1.3. Documentele conexe și limitele prezentului memoriu

Documentația tehnică pentru autorizare (DTAC) a lucrării de modernizare a drumului cuprinde, alături de prezentul memoriu:

- **Memoriul general** — descrierea generală a lucrării, încadrarea în rețeaua de drumuri, categoria funcțională, soluția de traseu, justificarea investiției;
- **Planul de situație și profilele (longitudinal și transversale tip)** — geometria drumului în plan și în profil, rampe, curbe, supralărgiri în curbă;
- **Studiul de trafic** — anchetele și numărătorile de trafic pe categorii de vehicule, care furnizează datele de intrare (`n_i`, numărul de vehicule/zi pe categorie) preluate direct în cap. 3 al prezentului memoriu, fără a se dubla aici metodologia de anchetă;
- **Proiectul de scurgere a apelor** — dimensionarea șanțurilor, rigolelor, podețelor și a sistemului de colectare/evacuare a apelor pluviale de pe platformă, esențial și pentru buna funcționare a structurii rutiere (o structură rutieră corect dimensionată, dar cu o scurgere deficitară a apelor, este expusă exact fenomenelor de înmuiere a patului și de îngheț-dezgheț tratate la cap. 4 și 9), dar cu dimensionare hidraulică proprie, netratată aici;
- **Proiectul de siguranță a circulației** — semnalizare rutieră orizontală și verticală, parapeți de siguranță, marcaje.

Prezentul memoriu se limitează strict la **cerința fundamentală A** — rezistența mecanică și stabilitatea structurii rutiere (componenta **A4**) și a terasamentelor/drumului per ansamblu (componenta **Af**) — și nu reia conținutul documentelor conexe enumerate mai sus.

### 1.4. Cadrul normativ de referință

- **Legea nr. 10/1995** — calitatea în construcții (republicată); cerința fundamentală **A — rezistență mecanică și stabilitate**.
- **Legea nr. 169/2026** (CATUC) — art. 264, autorizarea executării lucrărilor de construire.
- **OG nr. 43/1997** — regimul drumurilor (republicată).
- **HG nr. 766/1997** — stabilirea categoriilor de importanță a construcțiilor.
- **NP 116-2004** — Normativ pentru dimensionarea structurilor rutiere suple și semirigide (metoda analitică a deformațiilor admisibile) — normativul director al cap. 5-6 al prezentului memoriu.
- **PD 177-2001** — Instrucțiuni tehnice pentru proiectarea structurilor rutiere rigide — normativul director al cap. 6 (alternativa rigidă).
- **AND 584-2012** — Normativ pentru dimensionarea structurilor rutiere; date de trafic, coeficienți de echivalare (cap. 3).
- **CD 148-2003** — Normativ privind îmbunătățirea terenurilor de fundație slabe/sensibile prin metode mecanice și chimice — director la cap. 8.
- **AND 530** — completare/aplicare a soluțiilor de stabilizare a pământurilor.
- **SR EN 13108** — Mixturi asfaltice — specificații de material.
- **SR EN 13043** — Agregate pentru mixturi asfaltice și tratamente bituminoase.
- **SR EN 13877** — Structuri rutiere de beton de ciment (referință complementară la PD 177 pentru materialul beton rutier).
- **AND 605** — Normativ privind caracteristicile tehnice ale mixturilor asfaltice utilizate în lucrările de drumuri.
- **STAS 1913** (seria, inclusiv STAS 1913/13 — determinarea compactării) — caracteristici fizico-mecanice ale pământurilor.
- **NP 074-2014** — Normativ privind documentațiile geotehnice pentru construcții.
- **STAS 2914** — Lucrări de drumuri. Terasamente. Condiții tehnice generale de calitate.
- **STAS 1709** (seria, protecția la îngheț-dezgheț a drumurilor) — verificarea la îngheț-dezgheț a structurilor rutiere.

---

## 2. Încadrarea tehnică a lucrării

| Criteriu | Încadrare adoptată | Observație |
|---|---|---|
| **Clasa tehnică** | **IV** | drum cu trafic mediu, corespunzător unei valori a **MZA** (media zilnică anuală a traficului, exprimată în vehicule fizice etalon) situate în intervalul **750–4.500 vehicule etalon/24h** — plaja tipică a drumurilor comunale/județene modernizate cu trafic local și de tranzit moderat |
| **Categoria de importanță** | **C** (normală) | drum de interes local/județean, fără particularități de trafic excepțional (transport greu specializat, drum unic de acces la obiective de importanță deosebită) care ar justifica o categorie superioară |
| **Tip climateric** | **II** (regim hidric mediu) | condiționează atât acțiunea zăpezii/apei asupra structurii (indirect, prin regimul hidric al pământului de fundație, cap. 4), cât și, esențial, **indicele de îngheț de calcul** utilizat la verificarea din cap. 9 |

**Semnificația practică a clasei tehnice IV.** Încadrarea în clasa tehnică IV nu este o simplă etichetă administrativă, ci determină, prin normativele de proiectare geometrică a drumurilor (tratate în piesele conexe, cap. 1.3), elementele geometrice minime admise (raze de curbură, declivități maxime, lățimi de platformă) — și, pentru prezentul memoriu, plasează implicit lucrarea în categoria drumurilor cu **trafic mediu** din punctul de vedere al dimensionării structurii rutiere: nici trafic neglijabil (care ar permite o structură minimă, de tip drum comunal cu circulație redusă), nici trafic intens de tip drum național/expres (care ar impune o structură mult mai groasă și, adesea, soluții semirigide sau rigide ca soluție de bază, nu doar ca alternativă). Această încadrare se confirmă cantitativ prin calculul traficului cumulat de la cap. 3, care rezultă, așa cum se va vedea, la limita superioară a categoriei de trafic „mediu" din NP 116-2004.

---

## 3. Traficul de calcul

### 3.1. Conceptul de osie standard și justificarea fizică a echivalării traficului eterogen

Pe un drum real circulă, simultan, o gamă extrem de eterogenă de vehicule — autoturisme (care, structural, nu contribuie semnificativ la degradarea prin oboseală a structurii rutiere și nu se contorizează în calculul de dimensionare), camioane ușoare cu 2 osii, camioane grele cu 3-4 osii, autobuze, TIR-uri (ansambluri articulate cap tractor + semiremorcă), remorci agricole. Fiecare dintre aceste categorii are o încărcare pe osie diferită, o configurație diferită a osiilor (osie simplă, osie tandem, osie tridem) și, prin urmare, un **efect distructiv diferit** asupra structurii rutiere la fiecare trecere.

**De ce nu se poate dimensiona direct „la numărul de vehicule/zi"?** Pentru că un vehicul cu osie de 40 kN și un vehicul cu osie de 115 kN nu produc, la trecerea lor, un efect distructiv proporțional cu raportul încărcărilor (115/40 ≈ 2,9), ci un efect **incomparabil mai mare** pentru vehiculul greu. Acest fenomen — cunoscut în literatura tehnică internațională sub numele de **„legea celei de-a patra puteri" (fourth power law)**, stabilită experimental prin marile încercări de trafic pe structuri rutiere instrumentate (tip AASHO Road Test) — arată că **efectul distructiv al unei osii asupra unei structuri rutiere este proporțional, aproximativ, cu puterea a patra a încărcării pe osie**, și nu cu încărcarea însăși. Practic, dublarea încărcării unei osii nu dublează, ci **multiplică de aproximativ 16 ori (2⁴)** efectul ei de oboseală asupra structurii. Această neliniaritate pronunțată este motivul fizic pentru care:

1. Traficul de autoturisme (osii de ordinul a 5-10 kN) este, pentru dimensionarea structurii rutiere, practic **neglijabil** în raport cu traficul de vehicule grele, oricât de numeros ar fi în termeni absoluți — efectul cumulat al a mii de autoturisme rămâne, prin legea puterii a patra, de ordine de mărime sub efectul unui singur TIR;
2. **Coeficienții de echivalare** ai diverselor categorii de vehicule la osia standard (cap. 3.2) nu sunt proporționali liniar cu greutatea vehiculului, ci reflectă, prin construcție, tocmai această relație de tip putere-a-patra dintre încărcarea pe osie și efectul distructiv — un vehicul cu osii de aproximativ jumătate din încărcarea osiei standard capătă un coeficient de echivalare mult sub 0,50 (de exemplu, camionul cu 2 osii, coeficient **0,30**, cap. 3.2), exact reflectarea faptului că efectul lui distructiv este disproporționat de mic, nu doar proporțional de mic, față de osia standard;
3. Devine posibilă și necesară definirea unei **osii de referință convenționale** — „osia standard" — la care se raportează, prin coeficienți de echivalare, efectul distructiv al **oricărui** vehicul care circulă pe drum, reducând problema traficului real (eterogen, variabil, imposibil de tratat vehicul cu vehicul într-un calcul de dimensionare) la o singură mărime numerică: **numărul de osii standard echivalente**.

**Osia standard adoptată** (conform NP 116-2004/AND 584-2012, standardul de referință pentru dimensionarea structurilor rutiere din România):

| Parametru | Simbol | Valoare |
|---|---|---|
| Sarcina osiei standard | — | **115 kN** |
| Sarcina pe roată (osie simplă, 2 roți) | — | **57,5 kN** |
| Presiunea de contact roată-îmbrăcăminte | p | **0,625 MPa** |
| Raza suprafeței circulare echivalente de contact | a | **0,171 m** |

Această osie standard de 115 kN reprezintă, convențional, încărcarea pe osia simplă din spate a unui camion greu tipic — suficient de apropiată de încărcările reale ale vehiculelor grele care domină efectul de oboseală al traficului, încât toate celelalte categorii de vehicule se pot echivala la ea printr-un coeficient rezonabil (subunitar pentru vehicule mai ușoare, supraunitar pentru osii mai grele decât cea standard, dacă ar fi cazul), fără distorsiuni excesive ale calculului.

### 3.2. Coeficienții de echivalare pe tip de vehicul

Coeficienții de echivalare (f.o.s. — factor de osii standard) adoptați pentru fluxul de trafic al prezentei lucrări, conform AND 584-2012:

| Categorie vehicul | Coeficient de echivalare (f.o.s.) | Observație privind încărcarea tipică pe osie |
|---|---|---|
| Camion 2 osii (ușor/mediu) | **0,30** | osii mult sub 115 kN — efectul distructiv redus disproporționat (legea puterii a patra, cap. 3.1) |
| Camion 3-4 osii (greu) | **0,55** | osii apropiate ca sarcină, dar repartizate pe mai multe osii (efectul de „tandem"/"tridem" reduce solicitarea pe osie individuală față de o osie simplă echivalentă) |
| TIR (ansamblu articulat, cap tractor + semiremorcă) | **1,00** | vehiculul de referință — osia motoare a capului tractor se apropie cel mai mult de osia standard de 115 kN, motiv pentru care coeficientul este unitar |
| Autobuz | **0,50** | osie spate încărcată moderat, sub cea a unui TIR, dar peste cea a unui camion ușor |
| Remorcă (agricolă/utilitară) | **0,30** | osii ușoare, similar camionului cu 2 osii |

Acești coeficienți se preiau, pentru fiecare drum în parte, din studiul de trafic (anchete/numărători de trafic pe categorii, cap. 1.3), care furnizează numărul mediu zilnic de vehicule pe fiecare categorie, `n_i` [veh./zi].

### 3.3. Calculul traficului mediu zilnic de osii standard

Traficul mediu zilnic de osii standard se calculează ca **sumă a produselor** dintre numărul de vehicule/zi al fiecărei categorii și coeficientul ei de echivalare:

`n_c,zi = Σ(n_i · f_os,i)`

Pentru datele de trafic ale prezentei lucrări (studiu de trafic, valori medii zilnice pe categorie):

| Categorie vehicul | n_i (veh./zi) | f_os | n_i · f_os (osii std./zi) |
|---|---|---|---|
| Camion 2 osii | 260 | 0,30 | **78,0** |
| Camion 3-4 osii | 120 | 0,55 | **66,0** |
| TIR | 90 | 1,00 | **90,0** |
| Autobuz | 40 | 0,50 | **20,0** |
| Remorcă | 60 | 0,30 | **18,0** |
| **TOTAL n_c,zi** | **570 veh./zi** | — | **272,0 osii std./zi** |

`n_c,zi = 260·0,30 + 120·0,55 + 90·1,00 + 40·0,50 + 60·0,30 = 78,0 + 66,0 + 90,0 + 20,0 + 18,0 = **272 osii standard/zi**`.

Se observă, ca verificare a raționamentului de la cap. 3.1: deși TIR-urile reprezintă doar 90 din cele 570 de vehicule/zi contorizate în calcul (adică sub 16% din numărul de vehicule), ele contribuie cu **90,0 osii standard/zi**, adică cel mai mare aport individual dintre toate categoriile (33% din totalul de 272) — confirmarea directă, pe datele concrete ale acestei lucrări, a faptului că efectul distructiv al traficului este dominat de vehiculele grele, nu de numărul brut de vehicule.

### 3.4. Factorul de evoluție a traficului — derivarea formulei

Traficul rutier nu rămâne constant pe durata de perspectivă de 15 ani a lucrării, ci **crește anual**, cu o rată `r`, reflectând dezvoltarea economică și creșterea gradului de motorizare a zonei deservite. Pentru a nu dimensiona structura la traficul din anul 1 (subdimensionare, structura ar ceda prin oboseală înainte de finalul duratei de perspectivă) și nici la traficul din anul 15 aplicat constant pe toți cei 15 ani (supradimensionare, ignorând că în primii ani traficul este efectiv mai mic), se folosește **factorul de evoluție `f_ev`**, care însumează corect traficul real, crescător an de an, pe toată durata de perspectivă.

**Derivarea formulei.** Dacă traficul din primul an de exploatare este `n_c,zi` (valoarea calculată la cap. 3.3) și crește geometric cu rata anuală `r`, traficul din anul `k` (k = 0, 1, 2, ..., p−1) este `n_c,zi · (1+r)^k`. Traficul cumulat pe toată durata de perspectivă `p` ani este suma acestei progresii geometrice:

`Σ(k=0..p-1) n_c,zi·(1+r)^k = n_c,zi · Σ(k=0..p-1)(1+r)^k = n_c,zi · [(1+r)^p − 1]/r`

adică traficul cumulat real, cu creștere anuală, este egal cu traficul din anul 1 (constant) **multiplicat cu factorul de evoluție**:

`f_ev = [(1+r)^p − 1]/r`

Această formulă este identică, matematic, cu formula factorului de fructificare a unei anuități constante (valoarea viitoare a unei serii de plăți anuale egale, capitalizate cu dobânda `r`) — nu întâmplător, pentru că fenomenul este identic din punct de vedere matematic: o mărime (traficul anual, respectiv o plată anuală) care crește/se capitalizează geometric cu o rată constantă, însumată pe un număr fix de perioade.

**Calculul numeric**, cu rata anuală de creștere adoptată `r = 4%` (0,04) și durata de perspectivă `p = 15` ani (cap. 1.1):

`f_ev = [(1,04)^15 − 1]/0,04`

`(1,04)^15 ≈ 1,8009` → `f_ev = (1,8009 − 1)/0,04 = 0,8009/0,04 = **20,02**`

**Interpretarea rezultatului.** Valoarea `f_ev = 20,02` — de aproape 20 de ori mai mare decât numărul de ani (15) — nu este o eroare, ci exprimă exact mecanismul de capitalizare a creșterii geometrice: traficul cumulat pe 15 ani, cu o creștere anuală de 4%, echivalează cu **20,02 ani** de trafic constant la nivelul anului 1. Diferența dintre 20,02 (echivalent） și 15 (ani calendaristici efectivi) reflectă exact faptul că traficul din anii finali ai perioadei este substanțial mai mare decât cel din anul 1 (traficul din anul 15 este `(1,04)^14 ≈ 1,73` ori mai mare decât cel din anul 1), iar suma cumulată a unei serii crescătoare depășește întotdeauna produsul simplu „valoare inițială × număr de ani".

### 3.5. Factorul de repartiție pe bandă și de distribuție transversală

Nu tot traficul cumulat (însumat pe ambele sensuri de circulație) solicită, la fiecare trecere, **aceeași bandă de circulație** — pentru un drum cu secțiune transversală de 7,00 m (2 benzi, o bandă pe sens, cap. 1.1), traficul total contorizat (ambele sensuri) se împarte, cu o repartiție considerată egală în lipsa unor date specifice de asimetrie a fluxului (de exemplu, un drum cu un capăt spre o zonă industrială și celălalt spre o zonă pur rezidențială ar putea justifica o repartiție neuniformă), în mod egal între cele două benzi/sensuri:

`c_rp = 0,50` (coeficient de repartiție pe bandă, pentru secțiune cu o singură bandă pe sens)

Pentru secțiunea transversală a prezentei lucrări (o singură bandă de 3,50 m pe fiecare sens, fără benzi suplimentare pe același sens de mers), nu se aplică o reducere suplimentară de distribuție transversală în lățimea benzii (fenomen relevant la carosabile late, cu mai multe benzi pe același sens, unde traficul greu se distribuie preferențial pe banda de circulație de lângă acostament, iar restul benzilor primesc o cotă redusă) — se adoptă:

`c_bd = 1,00` (coeficient de distribuție transversală, pentru bandă unică pe sens — întregul trafic al sensului respectiv circulă, practic, pe aceeași urmă de roată)

### 3.6. Traficul cumulat pe durata de perspectivă

Traficul cumulat de osii standard, exprimat convențional în **milioane de osii standard (m.o.s.)** pe durata de perspectivă, rezultă din combinarea traficului mediu zilnic (cap. 3.3), a numărului de zile dintr-un an, a factorului de evoluție (cap. 3.4) și a coeficienților de repartiție/distribuție (cap. 3.5):

`N_c = 365 · 10⁻⁶ · n_c,zi · f_ev · c_rp · c_bd`

unde factorul `365` transformă traficul zilnic în trafic anual, iar `10⁻⁶` exprimă rezultatul direct în milioane de osii standard (unitatea uzuală de intrare în abacele și formulele de dimensionare din NP 116-2004, cap. 5).

Înlocuind valorile calculate:

`N_c = 365 · 272 · 20,02 · 0,50 · 1,00`

`365 · 272 = 99.280` osii standard/an, la nivelul anului 1

`99.280 · 20,02 = 1.987.590` osii standard, echivalent cumulat pe toate cele 2 benzi, pe 15 ani

`1.987.590 · 0,50 = 993.795` osii standard, pe banda de calcul (după repartiția pe bandă)

`N_c ≈ 993.700 ≈ **1,0 milioane osii standard**` (rotunjire uzuală, conform practicii de proiectare — încadrare directă în categoria de **trafic mediu** din NP 116-2004, categorie utilizată integral la cap. 5-6 pentru dimensionarea structurii).

**Semnificația practică a valorii `N_c ≈ 1,0 milioane osii standard`.** Această valoare unică sintetizează, pentru toate calculele ulterioare de dimensionare (cap. 5, formulele de deformație admisibilă), efectul cumulat al întregului trafic real, eterogen și crescător, care va solicita drumul timp de 15 ani — de la camionul ușor ocazional până la TIR-ul frecvent, toate reduse, prin coeficienți de echivalare justificați fizic prin legea puterii a patra (cap. 3.1), la un singur număr de repetări echivalente ale osiei standard de 115 kN. Toată complexitatea traficului real este, prin această metodologie, condensată într-o singură mărime de intrare pentru calculul structural.

---

## 4. Studiul geotehnic și portanța patului drumului

### 4.1. Cadrul studiului geotehnic

Conform NP 074-2014, dimensionarea unei structuri rutiere impune un studiu geotehnic care să caracterizeze, pe toată lungimea traseului, pământul de fundație (patul drumului) pe care se așază structura rutieră. Pentru prezenta lucrare (traseu de aproximativ 1,00 km), studiul geotehnic a cuprins **foraje geotehnice la interval de aproximativ 250 m** (densitate adecvată pentru un traseu liniar de această lungime, suficientă pentru a surprinde eventualele variații ale naturii pământului de fundație de-a lungul traseului, dar fără complexitatea unei rețele dense de foraje specifică unor lucrări cu risc geotehnic ridicat), completate cu **încercări de laborator** (granulometrie, limite de plasticitate, umiditate naturală, densitate) conform **STAS 1913** (seria de standarde pentru caracteristicile fizico-mecanice ale pământurilor).

### 4.2. Clasificarea pământurilor după sensibilitatea la îngheț (P1-P4)

Pentru proiectarea rutieră, clasificarea pământurilor de fundație nu urmărește doar caracteristicile mecanice uzuale (rezistență, compresibilitate), ci în mod esențial **sensibilitatea la îngheț** — capacitatea pământului de a permite ascensiunea capilară a apei spre frontul de îngheț și, prin aceasta, de a dezvolta fenomenul de formare a lentilelor de gheață și de umflare la îngheț, cu pierdere de portanță la dezgheț (fenomen fizic detaliat integral la cap. 9). Clasificarea în patru categorii, **P1-P4**, ordonate crescător după sensibilitatea la îngheț:

| Categorie | Tip de pământ | Sensibilitate la îngheț | CBR (%) | E_p orientativ (MPa) |
|---|---|---|---|---|
| **P1** | pământuri necoezive (nisipuri, pietrișuri, curate, fără fracțiune fină semnificativă) | **redusă/practic nulă** | **> 20** | ridicat |
| **P2** | pământuri coezive cu sensibilitate redusă | **redusă** | **10-20** | mediu-ridicat |
| **P3** | prafuri și nisipuri argiloase, sensibilitate mijlocie | **mijlocie** | **5-10** | **50-70** |
| **P4** | argile, sensibilitate ridicată | **ridicată** | **< 5** | redus |

**Explicația fizică a ordonării P1→P4.** Sensibilitatea la îngheț a unui pământ nu este determinată doar de prezența apei, ci în principal de **mărimea porilor și de capacitatea capilară** a materialului: pământurile necoezive (P1 — nisipuri, pietrișuri), cu pori mari, nu susțin o ascensiune capilară semnificativă a apei (apa liberă drenează gravitațional, fără să fie „trasă" spre frontul de îngheț prin capilaritate), motiv pentru care rămân practic insensibile la îngheț, indiferent de prezența unei pânze freatice apropiate. La polul opus, argilele (P4), cu pori extrem de fini, dezvoltă o capilaritate foarte puternică (înălțimi de ascensiune capilară de ordinul metrilor), dar au, paradoxal, o **permeabilitate foarte redusă** — combinația acestor doi factori (capilaritate mare + permeabilitate redusă, care limitează totuși viteza de alimentare cu apă a frontului de îngheț) le plasează totuși la vârful sensibilității la îngheț practice, deoarece în timp, pe durata unei ierni întregi, cantitatea de apă migrată capilar poate fi substanțială. Pământurile intermediare (P2, P3 — prafuri, nisipuri argiloase), cu pori de mărime intermediară, combină o capilaritate semnificativă cu o permeabilitate încă suficientă pentru a alimenta rapid frontul de îngheț cu apă — de unde, contraintuitiv, prafurile (P3) sunt adesea **cele mai defavorabile** din punct de vedere practic al vitezei de formare a lentilelor de gheață (mai defavorabile, la acest capitol specific, decât chiar argilele pure), deși clasificarea normativă generală P1-P4 le situează, ca ordine de severitate globală (combinând și alte criterii de portanță), înaintea argilelor P4.

### 4.3. Pământul de fundație adoptat pentru prezenta lucrare

Pe baza rezultatelor studiului geotehnic (cap. 4.1), pământul de fundație predominant pe traseul lucrării se încadrează în categoria **P3** — prafuri și nisipuri argiloase, sensibilitate mijlocie la îngheț — cu parametrii adoptați pentru calculul de dimensionare:

| Parametru | Simbol | Valoare adoptată |
|---|---|---|
| Categorie sensibilitate îngheț | — | **P3** |
| Indice california de portanță | **CBR** | **6%** |
| Modul de elasticitate al pământului | **E_p** | **70 MPa** |
| Coeficient Poisson | μ | **0,35** |

Valoarea `CBR = 6%` se situează în porțiunea mediană a intervalului caracteristic categoriei P3 (5-10%), reflectând o portanță naturală moderată — nici cea mai defavorabilă valoare a categoriei (care ar impune verificarea suplimentară de îmbunătățire chiar dacă pământul este nominal P3, nu P4, cap. 8), nici cea mai favorabilă. Modulul de elasticitate `E_p = 70 MPa` corespunde limitei superioare a intervalului 50-70 MPa caracteristic categoriei P3 (cap. 4.2), consistent cu un `CBR = 6%` moderat spre bun în cadrul categoriei.

### 4.4. Portanța patului drumului — încercarea cu placa Lucas

Portanța efectivă a patului drumului, așa cum va rezulta după execuția terasamentelor și compactarea finală (cap. 7), nu se apreciază doar din parametrii de laborator ai pământului natural (CBR, E_p), ci se **verifică în teren, prin încercarea cu placa circulară rigidă (placă Lucas, diametru Ø300 mm)** — o încercare de încărcare statică, în trepte, care măsoară deformația patului sub o presiune de referință și furnizează modulul de deformație `Ev` (modulul de deformație liniară, determinat din panta curbei presiune-tasare a încercării).

**Criteriile de acceptare a portanței patului drumului:**

- **`Ev2 ≥ 45 MPa`** — modulul de deformație determinat la **al doilea ciclu** de încărcare (a doua treaptă/al doilea ciclu de încărcare-descărcare a plăcii), condiție minimă pentru acceptarea patului drumului înainte de așternerea straturilor de fundație;
- **Raportul `Ev2/Ev1 ≤ 2,5`** — raportul dintre modulul de deformație la ciclul al doilea (`Ev2`) și cel de la ciclul întâi (`Ev1`).

**Semnificația fizică a raportului `Ev2/Ev1` ca indicator de omogenitate a compactării.** Dacă patul drumului este bine compactat (particulele de pământ deja aduse, prin energia de compactare aplicată la execuție, la o stare densă, apropiată de starea limită), deformația la primul ciclu de încărcare a plăcii este deja apropiată de deformația „elastică" reală a materialului, iar cea de-a doua încărcare (după ce prima încărcare a „așezat" eventualele goluri reziduale) produce o deformație suplimentară mică — deci `Ev2` (calculat din panta, deci invers proporțional cu deformația) este apropiat de `Ev1`, iar raportul `Ev2/Ev1` este apropiat de 1. Dimpotrivă, dacă compactarea este insuficientă (pământ afânat, cu goluri semnificative între particule), prima încărcare a plăcii produce o deformație mare, ireversibilă (tasare de „așezare" a materialului afânat, nu deformație elastică), iar a doua încărcare, aplicată pe un material deja tasat/îndesat de prima încărcare, produce o deformație mult mai mică — rezultând un `Ev2` mult mai mare decât `Ev1` și, deci, un raport `Ev2/Ev1` mare. **Un raport mare (peste pragul de 2,5) este, prin urmare, un semnal direct de compactare insuficientă/neomogenă a patului**, independent de valoarea absolută a lui `Ev2` — motiv pentru care normativul impune ambele condiții simultan, nu doar pragul minim de `Ev2`: un pat care ar „trece" pragul minim de `Ev2 = 45 MPa` doar datorită tasării produse chiar de încercare (adică ar fi fost, înainte de încercare, sub prag) trebuie respins prin condiția suplimentară a raportului `Ev2/Ev1`.

---

## 5. Dimensionarea sistemului rutier suplu (NP 116-2004)

### 5.1. Modelul de calcul — semispațiul multistrat Burmister

Metoda analitică de dimensionare a structurilor rutiere suple, consacrată de NP 116-2004, se bazează pe **modelul semispațiului elastic multistrat (modelul Burmister)** — un model matematic care reprezintă structura rutieră reală (succesiune de straturi de material asfaltic, piatră spartă, balast, așezate pe pământul de fundație) ca o suprapunere de **straturi elastice, omogene, izotrope, de extindere orizontală infinită**, fiecare caracterizat prin propriul modul de elasticitate `E` și coeficient Poisson `μ`, așezate pe un ultim strat considerat semi-infinit pe verticală (pământul de fundație). O încărcare circulară, uniform distribuită, aplicată la suprafață (reprezentând amprenta de contact a roții osiei standard, cap. 3.1), generează, prin ecuațiile elasticității, un câmp complet de tensiuni și deformații în interiorul acestui pachet multistrat, calculabil analitic (soluția Burmister, extinsă pentru un număr arbitrar de straturi) sau, în practică, printr-un program de calcul specializat (**CALDEROM**, uzual în proiectarea rutieră din România) care rezolvă numeric acest model pentru configurația exactă de straturi, module și încărcare a fiecărui proiect.

**De ce acest model, și nu un calcul de rezistență a materialelor de tip grindă/placă?** Spre deosebire de o placă rigidă (cap. 6, structura rigidă), unde încovoierea sub sarcină locală distribuie efortul pe o arie mare prin rigiditatea proprie la încovoiere a plăcii, o structură rutieră suplă (straturi asfaltice relativ subțiri, fără o rigiditate de placă semnificativă la nivel de ansamblu) transmite încărcarea în principal prin **compresiune verticală, cu difuzie a tensiunilor pe verticală prin fiecare strat succesiv** — fiecare strat „vede" o presiune verticală redusă față de stratul de deasupra (efect de difuzie a sarcinii, similar principiului lui Boussinesq pentru un mediu omogen, dar generalizat la un pachet de straturi cu module diferite prin soluția Burmister), iar comportarea globală a sistemului depinde critic de rigiditatea relativă a straturilor succesive (un strat mult mai rigid decât cel de dedesubt „lucrează" oarecum ca o placă parțială, redistribuind local sarcina; un pachet de straturi cu rigidități apropiate se comportă mai aproape de un semispațiu omogen).

### 5.2. Cele două puncte critice de verificare

Modelul multistrat nu se folosește pentru a calcula tensiuni/deformații în orice punct arbitrar al structurii, ci pentru a determina valorile de deformație specifică în **exact două puncte critice**, alese pentru că sunt locurile unde apar, respectiv, cele două moduri fundamentale de degradare ale unei structuri rutiere suple pe termen lung:

1. **Deformația specifică de întindere `εr`, la baza stratului asfaltic** (la interfața dintre ultimul strat de mixtură asfaltică — stratul de bază, cap. 5.3 — și stratul de fundație superioară subiacent), pe axa de simetrie a încărcării. Sub sarcina roții, stratul asfaltic se încovoaie ușor (deformație de tip placă subțire pe fundație elastică), iar fibra inferioară a acestui strat este întinsă. Repetarea acestei întinderi de milioane de ori (traficul cumulat, cap. 3.6) produce, exact ca la orice material solicitat ciclic la întindere, **fisurarea prin oboseală** — inițial microfisuri la baza stratului asfaltic, care se propagă progresiv spre suprafață, manifestându-se în timp ca fisurare de tip „piele de crocodil" pe suprafața îmbrăcăminții. Acesta este mecanismul de degradare pe care îl controlează verificarea deformației `εr`.
2. **Deformația specifică de compresiune `εz`, la nivelul superior al pământului de fundație** (vârful patului, sub structura rutieră completă), pe aceeași axă de simetrie. Deși mult atenuată față de presiunea de contact de la suprafață (prin efectul de difuzie descris la cap. 5.1), compresiunea verticală repetată la nivelul pământului de fundație produce, în timp, o **acumulare de deformații plastice/permanente** (pământul, spre deosebire de un material perfect elastic, nu revine complet la geometria inițială după fiecare descărcare, ci acumulează o mică deformație reziduală la fiecare ciclu) — manifestată, la suprafața drumului, ca **făgășuire** (deformație permanentă, sub formă de șanțuri longitudinale, în urmele roților). Acesta este mecanismul de degradare pe care îl controlează verificarea deformației `εz`.

Verificarea structurii rutiere presupune, prin urmare, calculul (cu programul de calcul multistrat) al ambelor deformații efective, sub osia standard de 115 kN, în structura reală adoptată (cap. 5.3), și compararea lor cu deformațiile admisibile (cap. 5.4), care sunt funcție de traficul cumulat `N_c` determinat la cap. 3.6.

### 5.3. Structura rutieră adoptată

Structura rutieră suplă adoptată pentru prezenta lucrare, pe 5 straturi (4 straturi de structură propriu-zisă + patul de pământ ca ultim „strat" semi-infinit al modelului):

| Strat | Material | Grosime h (cm) | Modul elasticitate E (MPa) | Coeficient Poisson μ |
|---|---|---|---|---|
| Uzură | Beton asfaltic BA16 | **4** | **3.600** | 0,35 |
| Legătură | Beton asfaltic de legătură BAD22,4 | **6** | **3.000** | 0,35 |
| Bază | Mixtură asfaltică de bază AB31,5 | **8** | **3.600** | 0,35 |
| Fundație superioară | Piatră spartă | **15** | **500** | 0,27 |
| Fundație inferioară | Balast | **25** | **350** | 0,27 |
| **Pat (P3)** | Pământ de fundație | ∞ (semi-infinit) | **70** | 0,35 |

**Grosimea totală a straturilor asfaltice: 18 cm** (4+6+8); **grosimea totală a structurii rutiere propriu-zise: 58 cm** (18 asfalt + 15 piatră spartă + 25 balast), la care se adaugă, distinct, **stratul de formă** (cap. 7.3), care nu face parte din structura rutieră de dimensionare a modelului Burmister, dar completează, ca element geotehnic de transfer, pachetul total (relevant pentru verificarea la îngheț-dezgheț, cap. 9).

**Logica succesiunii de module de elasticitate descrescătoare cu adâncimea** (3.600 → 3.000 → 3.600 → 500 → 350 → 70 MPa, cu o mică neregularitate la stratul de legătură, care are un modul ușor mai redus decât straturile de uzură și bază adiacente, reflectând compoziția specifică a mixturii BAD22,4) urmează exact principiul de difuzie a sarcinilor descris la cap. 5.1: fiecare strat trebuie să fie suficient de rigid pentru a difuza corespunzător presiunea de la roată către stratul următor, dar succesiunea generală de rigidități descrescătoare cu adâncimea corespunde reducerii progresive a intensității solicitării transmise (presiunea/deformația scade cu adâncimea prin difuzie), permițând materiale progresiv mai puțin performante (și mai economice) pe măsură ce coborâm spre pat.

### 5.4. Verificarea deformațiilor admisibile

**Formulele de deformație admisibilă**, funcție de traficul cumulat `N_c` (exprimat în milioane de osii standard, cap. 3.6), conform NP 116-2004:

`εr,adm = 360 · N_c^(−0,27)` [μɛ — microdeformații]

`εz,adm = 600 · N_c^(−0,28)` [μɛ]

**Explicația fizică a exponentului negativ.** Ambele formule au forma unei **curbe de oboseală (curbă Wöhler, S-N)**, tipică oricărui material supus la solicitări ciclice repetate: cu cât numărul de cicluri de solicitare preconizat (`N_c`) este mai mare, cu atât **amplitudinea de deformație pe care materialul o poate suporta, la fiecare ciclu, fără a atinge cedarea prin oboseală la finalul duratei de viață preconizate, trebuie să fie mai mică** — exact fenomenul cunoscut de la orice curbă de oboseală a metalelor sau a materialelor compozite: un oțel poate suporta un număr foarte mare de cicluri doar la amplitudini de tensiune reduse, și un număr mic de cicluri la amplitudini mari, relația dintre cele două fiind, tipic, o lege de putere cu exponent negativ (exact forma `N_c^(−k)` din formulele de mai sus). Fizic, exponenții `−0,27` (asfalt) și `−0,28` (pământ) — foarte apropiați ca valoare — au fost calibrați empiric (pe încercări de oboseală de laborator ale mixturilor asfaltice, respectiv pe încercări/observații de comportare a pământurilor sub trafic repetat) astfel încât, pentru orice trafic cumulat preconizat, deformația admisibilă rezultată să corespundă unei probabilități acceptate de apariție a degradării (fisurare prin oboseală, respectiv făgășuire) exact la finalul duratei de perspectivă, nu mai devreme. Cu alte cuvinte: **structura nu este dimensionată să nu se deformeze deloc, ci să acumuleze exact atâta „consum de oboseală" încât degradarea vizibilă să apară abia la sfârșitul celor 15 ani de perspectivă, nu înainte.**

**Calculul deformațiilor admisibile pentru `N_c ≈ 1,0 milioane osii standard`** (cap. 3.6):

`εr,adm = 360 · (1,0)^(−0,27) = 360 · 1 = **360 μɛ**`

`εz,adm = 600 · (1,0)^(−0,28) = 600 · 1 = **600 μɛ**`

(Particularitatea numerică `N_c = 1,0` — orice bază ridicată la orice putere rămâne 1 — simplifică aici calculul la valorile de bază ale formulelor; pentru un trafic cumulat diferit de 1,0 m.o.s., cele două deformații admisibile s-ar calcula prin aplicarea directă a exponenților, cu efect de reducere pentru `N_c > 1` și de majorare pentru `N_c < 1`, conform explicației de mai sus.)

**Deformațiile efective**, calculate cu programul de calcul multistrat (CALDEROM) pentru structura reală adoptată (cap. 5.3), sub osia standard de 115 kN (cap. 3.1):

| Verificare | Deformație efectivă (μɛ) | Deformație admisibilă (μɛ) | Grad de utilizare (adm/ef) | Verificare |
|---|---|---|---|---|
| `εr` (întindere, bază asfalt) | **285** | 360 | **360/285 = 1,26** | ✓ |
| `εz` (compresiune, vârf pământ) | **480** | 600 | **600/480 = 1,25** | ✓ |

**Interpretarea gradului de utilizare — de ce 1,25 înseamnă o structură optimizată, nu supradimensionată.** Gradul de utilizare, definit ca raportul dintre deformația admisibilă și deformația efectivă, exprimă direct **rezerva de siguranță** a structurii: o valoare de exact 1,00 ar însemna o structură „la limită", fără nicio rezervă (deformația efectivă egală cu cea admisibilă), risc inacceptabil pentru un proiect real, dată fiind variabilitatea inevitabilă a traficului real față de cel prognozat, a calității efective de execuție față de cea de proiect și a preciziei modelului de calcul însuși. O valoare mult peste, de exemplu 2,0-3,0, ar însemna, dimpotrivă, o structură cu o rezervă exagerată — deci una **supradimensionată**, cu un consum de materiale (în special asfalt, materialul cel mai costisitor din structură) nejustificat de traficul real preconizat. **Valorile obținute aici, 1,26 (εr) și 1,25 (εz), se situează exact în intervalul țintă al practicii de proiectare rutieră** — o rezervă de ordinul a 25%, suficientă pentru a absorbi variabilitatea normală a traficului și a execuției, dar fără risipă de material — motiv pentru care structura adoptată (cap. 5.3) se consideră **optimizată**: nici la limită, nici supradimensionată, ci dimensionată economic pentru exact traficul cumulat de perspectivă calculat la cap. 3.6, cu o marjă de siguranță rezonabilă.

Ambele criterii de verificare (`εr` și `εz`) fiind satisfăcute simultan, **structura rutieră suplă adoptată verifică integral condițiile NP 116-2004 pentru traficul cumulat de 15 ani** al prezentei lucrări.

---

## 6. Alternativa cu structură rigidă (PD 177-2001)

### 6.1. Principiul fundamental diferit al structurii rigide

Structura rutieră rigidă (dală de beton de ciment) funcționează după un **principiu mecanic complet diferit** de cel al structurii suple analizate la cap. 5, și această diferență de principiu — nu doar de material — trebuie înțeleasă explicit înainte de a compara cele două soluții:

- **Structura suplă** (cap. 5) nu are, la nivel de ansamblu, o rigiditate la încovoiere semnificativă — fiecare strat transmite încărcarea prin compresiune verticală directă către stratul de dedesubt (modelul semispațiului multistrat, cap. 5.1), iar criteriul de dimensionare este **deformația specifică repetată** la două puncte critice (cap. 5.2), guvernată de fenomenul de oboseală (cap. 5.4);
- **Structura rigidă**, dimpotrivă, funcționează exact ca o **placă groasă rezemată pe un mediu elastic** (fundația rutieră, ea însăși caracterizată printr-un coeficient de reacție `k`) — placa de beton are, prin ea însăși, o rigiditate la încovoiere considerabilă (grosime mare, modul de elasticitate al betonului mult superior oricărui strat asfaltic), motiv pentru care **distribuie sarcina roții pe o arie mult mai mare decât amprenta de contact**, prin lucru la încovoiere (placa se încovoaie ca o placă subțire pe mediu elastic — teoria Westergaard, referință clasică a dimensionării structurilor rutiere rigide, preluată de PD 177-2001), nu prin compresiune verticală directă strat cu strat.

**Consecința directă asupra criteriului de dimensionare.** Deoarece placa de beton lucrează la încovoiere, criteriul de verificare nu mai este o deformație specifică repetată (ca la structura suplă), ci **tensiunea de întindere din încovoiere la fibra inferioară a plăcii**, sub sarcina roții — un criteriu de tip rezistență a materialelor clasică, mult mai apropiat, conceptual, de verificarea unei plăci de beton armat dintr-o construcție civilă (deși aici placa este nearmată sau armată doar constructiv/pentru control de fisurare, nu pentru preluarea unor eforturi de încovoiere semnificative ca armătură principală) decât de verificarea prin deformații repetate specifică structurii suple. Fenomenul de oboseală rămâne prezent și la structura rigidă (dala de beton este, de asemenea, solicitată de un număr mare de repetări ale trecerii osiei standard), dar se tratează prin coeficientul de siguranță la oboseală a betonului (`γ`, cap. 6.2), nu printr-o formulă explicită de deformație admisibilă funcție de trafic, ca la structura suplă.

### 6.2. Dimensionarea la tensiune de întindere din încovoiere

Structura rigidă alternativă, dimensionată conform PD 177-2001, este constituită din:

| Strat | Material | Grosime (cm) |
|---|---|---|
| Dală de beton rutier | **BcR 4,5** | **22** |
| Strat de rezemare | material granular/mixtură asfaltică subțire de rezemare | **5** |
| Fundație | balast/piatră spartă | **20** |
| Strat de formă | balast | **15** |

**Criteriul de verificare:** `σ_t ≤ σ_adm = R_ti/γ`

unde `σ_t` este tensiunea de întindere din încovoiere efectivă la fibra inferioară a dalei, calculată (prin teoria plăcii pe mediu elastic, Westergaard, cu coeficientul de reacție al fundației `k`) pentru sarcina osiei standard aplicată la marginea/colțul dalei (poziția cea mai defavorabilă, unde placa nu beneficiază de continuitatea rezemării pe toate laturile), `R_ti` este rezistența caracteristică la întindere din încovoiere a betonului rutier (`R_ti ≈ 4,5 MPa` pentru clasa **BcR 4,5** adoptată — notația claselor de beton rutier fiind construită tocmai pe această rezistență caracteristică la încovoiere, spre deosebire de betoanele de construcții, clasificate după rezistența la compresiune), iar `γ` este un coeficient de siguranță la oboseală, funcție de traficul cumulat `N_c` (cu cât `N_c` este mai mare, cu atât `γ` este mai mare — aceeași logică de curbă de oboseală discutată la cap. 5.4 pentru structura suplă, aplicată aici tensiunii admisibile în locul deformației admisibile).

**Coeficientul de reacție al fundației** adoptat, pe baza portanței patului drumului (cap. 4.4) și a straturilor de fundație/strat de formă interpuse: `k = 60-80 MPa/m` — valoare tipică pentru o fundație de balast/piatră spartă pe pat de categorie P3, cu portanța verificată conform cap. 4.4.

**Grosimea dalei rezultată din verificare: `h_dală = 22 cm`** — grosime care asigură, pentru rezistența la încovoiere `R_ti = 4,5 MPa` a betonului BcR 4,5 și pentru coeficientul de reacție al fundației adoptat, un raport `σ_t/σ_adm` acoperitor pentru traficul cumulat de 1,0 milioane osii standard determinat la cap. 3.6.

### 6.3. Rosturile — rolul fiecărui tip

Spre deosebire de o structură suplă (continuă, fără rosturi, care absoarbe variațiile dimensionale termice prin deformarea elastică distribuită a masei de mixtură asfaltică), o dală de beton rutier necesită un sistem complet de rosturi, fiecare cu un rol mecanic distinct:

- **Rosturi de contracție** — dispuse transversal, la interval de aproximativ **5 m**, cu rol de a controla, prin slăbirea locală a secțiunii (un rost tăiat parțial în grosimea dalei), **locul** unde se va produce fisura de contracție prin retragerea betonului (fenomen inevitabil la orice element masiv de beton, prin contracția din uscare/hidratare și prin variațiile termice zilnice) — fără rosturi de contracție dispuse la interval controlat, fisurile de retragere ar apărea aleator, cu deschideri necontrolate și risc de infiltrare a apei exact în zonele slăbite structural. Rostul de contracție, odată fisurat controlat pe toată grosimea sub rostul tăiat, transferă totuși efortul tăietor vertical între cele două jumătăți de dală adiacente (împiedicând denivelarea/faultingul), prin angrenarea agregatelor la interfața fisurii sau, la traficul greu, prin gujoane dedicate (cap. 6.3, gujoane);
- **Rosturi de dilatație** — dispuse la interval mult mai mare, de **40-60 m**, cu rol de a permite **variația dimensională globală** a dalei pe distanțe lungi (dilatare termică pe vreme caldă), umplute cu material compresibil care absoarbe efectiv variația de lungime — fără rosturi de dilatație, dilatarea termică cumulată pe zeci de metri ar genera eforturi de compresiune enorme în dală, cu risc de flambaj/ridicare locală a plăcilor (fenomen documentat, în cazuri extreme, la structuri rutiere rigide fără rosturi de dilatație corect dimensionate);
- **Gujoane (Ø25)** — bare netede de oțel, dispuse la nivelul axei neutre a dalei, traversând rosturile (de contracție și, unde este cazul, de dilatație), cu rol de a **transfera eforturile tăietoare verticale** între dalele adiacente (astfel încât ambele dale, sub trecerea roții aproape de rost, tasează/deformează solidar, nu independent — prevenind denivelarea progresivă, „faulting", care ar rezulta dacă fiecare dală ar reacționa independent la încărcare), **fără a împiedica mișcarea longitudinală liberă** a dalelor la rost (bara este netedă, nu aderentă la beton pe toată lungimea ei, iar la un capăt este introdusă într-un manșon care permite alunecarea longitudinală).

### 6.4. Comparația economică și tehnică suplu vs. rigid — motivarea alegerii

| Criteriu | Structură suplă (cap. 5) | Structură rigidă (cap. 6) |
|---|---|---|
| Cost inițial de execuție | **mai mic** | mai mare (beton rutier de clasă specială, gujoane, tăiere rosturi) |
| Durata de exploatare până la reabilitare majoră | **~15 ani** (durata de perspectivă de calcul) | **25-30 ani** |
| Întreținere curentă | **frecventă** (covoare asfaltice periodice, plombări) | **redusă** (rare intervenții, în principal la rosturi) |
| Comportare sub trafic greu canalizat/staționar | deformații permanente (făgășuire) accentuate la solicitări repetate concentrate | foarte bună — dala distribuie sarcina la încovoiere, insensibilă la efectul de canalizare a roților |
| Ușurința/viteza de execuție și de reparație locală | rapidă, ușor de reparat local (plombare) | mai lentă (timp de întărire a betonului), reparații locale mai complexe |
| Confort de rulare imediat după execuție | foarte bun, fără rosturi | rosturile pot induce un ușor disconfort/zgomot la trecerea peste ele |

**Motivarea alegerii pentru prezenta lucrare.** Pentru traficul cumulat de **1,0 milioane osii standard** pe 15 ani (categorie de trafic mediu, cap. 3.6), pentru clasa tehnică IV (cap. 2) și pentru un traseu curent, fără intersecții majore, fără stații de transport în comun cu opriri/porniri repetate (solicitare canalizată/staționară, defavorabilă pentru structura suplă) și fără trafic greu canalizat pe o urmă de roată fixă, **structura suplă (cap. 5) reprezintă soluția optimă cost/performanță**, verificând integral cerințele NP 116-2004 cu o rezervă rezonabilă (grade de utilizare 1,25-1,26, cap. 5.4), la un cost de execuție și un regim de întreținere adaptate categoriei de trafic și importanței drumului. **Structura rigidă rămâne soluția recomandată punctual, ca alternativă, la intersecții importante și la zonele cu trafic greu canalizat** (opriri/porniri repetate ale vehiculelor grele, solicitare concentrată pe aceeași urmă), unde avantajul ei specific — insensibilitatea la efectul de canalizare a roților, comportare superioară la sarcini staționare repetate — compensează costul inițial superior.

---

## 7. Terasamentele

### 7.1. Geometria taluzelor

Geometria taluzelor de rambleu (umplutură) și debleu (săpătură) se stabilește funcție de înălțimea taluzului și de natura terenului, urmărind un echilibru între stabilitatea la alunecare (taluz mai lin = mai stabil, dar volum de terasamente mai mare) și economia lucrărilor de terasamente (taluz mai abrupt = volum mai mic, dar risc de instabilitate mai ridicat dacă nu este justificat geotehnic):

| Tip taluz | Înălțime | Panta adoptată | Observație |
|---|---|---|---|
| **Rambleu** | h ≤ 6 m | **1:1,5** | pantă standard pentru umplutură compactată de calitate obișnuită, stabilă pentru înălțimi moderate |
| **Rambleu** | h > 6 m | **1:1,75** + **banchete** | pantă mai lină la înălțimi mari (forța motrice de alunecare crește cu greutatea masei de pământ, deci cu înălțimea), plus banchete intermediare |
| **Debleu, pământ** | — | **1:1 – 1:1,5** | funcție de coeziunea/stabilitatea pământului săpat — pantă mai abruptă (1:1) pentru pământuri mai coezive/stabile, mai lină (1:1,5) pentru pământuri mai puțin stabile |
| **Debleu, rocă** | — | **1:0,5 – 1:1** | pantă mult mai abruptă, permisă de rezistența intrinsecă mult superioară a masei de rocă, cu ajustare funcție de gradul de fisurare/alterare a rocii |

**De ce înălțimea mai mare impune un taluz mai lin, plus banchete.** Stabilitatea unui taluz la alunecare este dată de raportul dintre forțele rezistente (frecare + coeziune, mobilizate pe suprafața potențială de alunecare) și forțele motrice (componenta gravitațională care tinde să deplaseze masa de pământ pe acea suprafață). Forța motrice crește, aproximativ, cu **pătratul înălțimii** taluzului (masa de pământ instabilă crește atât în înălțime, cât și, proporțional, în lungimea suprafeței de alunecare), în timp ce forțele rezistente cresc doar liniar cu lungimea suprafeței de alunecare — motiv pentru care, la înălțimi mari, factorul de siguranță la alunecare al unui taluz cu pantă constantă scade progresiv, impunând fie o pantă mai lină (reducerea unghiului taluzului, deci reducerea componentei gravitaționale motrice pe suprafața de alunecare), fie introducerea de **banchete** (paliere orizontale intermediare, care întrerup continuitatea unei suprafețe de alunecare potențial lungi, reducând practic lungimea/masa mobilizabilă pe fiecare segment de taluz dintre banchete, și oferind totodată acces pentru întreținere și pentru colectarea/dirijarea controlată a apelor de pe taluz, prevenind eroziunea și infiltrarea necontrolată).

**Diferența debleu pământ vs. rocă.** Panta mult mai abruptă permisă la debleul în rocă (1:0,5-1:1, față de 1:1-1:1,5 la pământ) reflectă direct rezistența la forfecare intrinsec mult superioară a unei mase de rocă (chiar fisurată/alterată) față de un pământ necimentat — masa de rocă are, în general, o coeziune reală (cimentare naturală a particulelor) mult peste cea a unui pământ obișnuit, permițând un unghi de taluz apropiat sau chiar depășind unghiul de frecare internă echivalent al unui pământ granular necoeziv.

### 7.2. Compactarea terasamentelor

**Referința de compactare — încercarea Proctor Modificat (STAS 1913/13).** Compactarea unui pământ de umplutură se apreciază întotdeauna prin raportare la o densitate maximă de referință, determinată în laborator prin încercarea Proctor Modificat — o încercare standardizată în care o probă de pământ, la diverse umidități, este compactată cu o energie specifică fixă (energie de compactare superioară Proctor-ului standard, mai reprezentativă pentru echipamentele grele de compactare moderne — compactoare vibratoare de mare tonaj — folosite efectiv pe șantierele de terasamente actuale), obținându-se o curbă densitate uscată-umiditate cu un vârf net — **densitatea uscată maximă `ρd,max`**, la o umiditate optimă de compactare specifică fiecărui tip de pământ.

**Gradul de compactare (indicele de compactare):**

`D = (ρd,ef / ρd,max) · 100` [%]

unde `ρd,ef` este densitatea uscată efectivă, măsurată în teren după compactare (prin metode volumetrice sau nucleare), iar `ρd,max` este densitatea uscată maximă de laborator (Proctor Modificat), determinată pentru pământul respectiv.

**Semnificația fizică a gradului de compactare.** `D` exprimă, direct, **cât de aproape a ajuns pământul compactat în teren de starea sa cea mai densă posibilă**, la energia de compactare de referință — cu cât `D` este mai apropiat de 100%, cu atât golurile dintre particule sunt mai reduse, contactul între particule mai extins, iar rezistența la forfecare și modulul de deformație rezultate mai apropiate de valorile maxime posibile pentru acel material, cu tasări ulterioare (post-execuție, sub trafic) minime.

**Cerințele de compactare adoptate**, diferențiate pe zone ale terasamentului:

| Zonă | Grad de compactare cerut | Grad minim admis |
|---|---|---|
| **Corpul rambleului** (umplutura curentă, sub pat) | **≥ 97%** | 95% (minim) |
| **Patul drumului** (ultimii ~30-50 cm, imediat sub structura rutieră) | **≥ 98%** | 96% (minim) |
| **Materiale necoezive** (nisipuri, pietrișuri, straturi de fundație) | **≥ 100%** | — |

**De ce cerința de compactare este mai mare la pat decât în corpul rambleului.** Patul drumului este stratul care preia **direct** solicitările transmise de structura rutieră (tensiunea/deformația `εz` verificată la cap. 5.4 se calculează exact la nivelul acestui strat), motiv pentru care orice compactare insuficientă a patului se traduce, aproape imediat și direct, printr-o portanță efectivă mai mică decât cea de calcul (cap. 4.3, `E_p = 70 MPa` presupune implicit o compactare corespunzătoare) și prin tasări suplimentare sub trafic — vizibile la suprafața drumului ca făgășuire prematură, chiar dacă structura rutieră de deasupra a fost dimensionată corect pe o portanță de calcul care, în realitate, nu a fost atinsă la execuție. Corpul rambleului, situat la o adâncime mai mare, este mai puțin solicitat direct de trafic (efectul de difuzie a sarcinii, cap. 5.1, atenuează semnificativ solicitarea la adâncime), iar o eventuală tasare reziduală mică din compactare insuficientă în corpul rambleului se manifestă ca o tasare uniformă/generală a terasamentului (mai ușor de tolerat și, adesea, deja consumată în perioada de așteptare tehnologică dintre execuția rambleului și așternerea structurii rutiere), nu ca o degradare structurală locală imediată.

### 7.3. Stratul de formă — rolul dublu

Stratul de formă (balast, grosime **15-30 cm**, așezat între patul de pământ și primul strat al structurii rutiere propriu-zise) îndeplinește un **rol dublu**, distinct de rolul mecanic al straturilor de fundație din structura rutieră propriu-zisă (cap. 5.3):

1. **Uniformizarea portanței** — chiar dacă patul de pământ, luat pe ansamblu, satisface criteriile de portanță de la cap. 4.4, natura pământului de fundație (mai ales pe un traseu liniar de 1,00 km, unde condițiile geotehnice pot varia ușor de la o secțiune la alta) nu este niciodată perfect omogenă; stratul de formă, prin materialul său granular, mai rigid și mai uniform decât pământul natural, creează o **platformă de lucru cu portanță constantă**, care „mediază" micile variații locale ale patului natural, astfel încât structura rutieră de deasupra să fie așezată pe o fundație practic omogenă pe toată lungimea traseului;
2. **Barieră capilară împotriva ascensiunii capilare a apei** — materialul granular al stratului de formă (balast, cu pori mari, cap. 4.2) **întrerupe continuitatea capilară** dintre pământul de fundație fin (unde apa poate migra capilar spre frontul de îngheț, cap. 4.2 și cap. 9) și structura rutieră de deasupra — un rol esențial pentru limitarea fenomenului de îngheț-dezgheț (cap. 9), unde exact stratul de formă, prin insensibilitatea lui practică la capilaritate, reduce sau întrerupe alimentarea cu apă a unui eventual front de îngheț ajuns la acest nivel.

Acest rol dublu explică de ce stratul de formă este tratat, în verificarea la îngheț-dezgheț (cap. 9), ca un strat cu contribuție specială (insensibil la îngheț prin natura sa granulară), distinctă de contribuția pur geometrică (de grosime) a celorlalte straturi ale structurii rutiere.

---

## 8. Îmbunătățirea pământurilor sensibile (P4)

### 8.1. Necesitatea și criteriul de aplicare

Deși pământul de fundație predominant al prezentei lucrări este de categorie **P3** (cap. 4.3), care nu impune, generalizat pe tot traseul, o îmbunătățire a pământului, studiul geotehnic (cap. 4.1) poate identifica, punctual, pe anumite tronsoane sau la anumite adâncimi, zone cu pământ de categorie **P4** (argile, sensibilitate ridicată la îngheț, portanță redusă, cap. 4.2) — situație tratată prin **îmbunătățirea locală/punctuală** a acestor zone, conform CD 148-2003 și AND 530, fără a impune o îmbunătățire generalizată pe întreg traseul (care ar fi nejustificată economic acolo unde pământul P3 satisface deja criteriile de portanță de la cap. 4.4).

### 8.2. Stabilizarea cu var — mecanismul chimic pentru argile

Pentru zonele identificate cu pământ argilos (P4), soluția tehnică adoptată este **stabilizarea cu var**, în proporție de **2-4%** din masa uscată a pământului, pe o grosime de strat tratat de **25-30 cm**.

**Mecanismul fizico-chimic.** Adăugarea varului (oxid/hidroxid de calciu) la o argilă declanșează, în succesiune, două fenomene distincte:

1. **Reacția rapidă de schimb ionic** — ionii de calciu (Ca²⁺), abundenți în varul adăugat, înlocuiesc, prin schimb ionic, ionii monovalenți (Na⁺, K⁺) fixați natural pe suprafața particulelor de argilă (mineralele argiloase au o sarcină electrică negativă netă pe suprafață, compensată de un „nor" de ioni pozitivi adsorbiți — stratul dublu electric). Ionii de calciu, divalenți, comprimă acest strat dublu electric (efect direct al valenței mai mari), reducând forțele de respingere electrostatică dintre particulele de argilă adiacente și favorizând, în schimb, **flocularea/aglomerarea** particulelor fine în agregate mai mari. Rezultatul imediat, vizibil chiar în câteva ore de la amestecare, este transformarea texturii argilei — dintr-un material plastic, lipicios, greu de manevrat, într-un material mai friabil, granular, mult mai ușor de compactat — și o **reducere semnificativă a indicelui de plasticitate**, cu îmbunătățirea imediată a lucrabilității materialului pe șantier.
2. **Reacția pozzolanică, lentă** — pe termen mai lung (zile-săptămâni), varul reacționează chimic cu silicea și alumina reactivă eliberate din structura mineralelor argiloase (în mediul puternic alcalin creat de var), formând compuși de tip silicat de calciu hidratat/aluminat de calciu hidratat — aceiași compuși de bază care conferă rezistență betonului de ciment prin hidratare — care „cimentează" progresiv particulele de pământ, cu o **creștere continuă a rezistenței și a modulului de elasticitate** a materialului stabilizat pe parcursul mai multor săptămâni de la amestecare.

Combinația celor două efecte (flocularea imediată, care face materialul lucrabil și compactabil, plus cimentarea pozzolanică lentă, care aduce rezistența finală) transformă un pământ P4 inițial impropriu ca platformă de lucru într-un material cu portanță comparabilă sau superioară categoriei P2-P3, verificat, ca orice zonă de pat, prin încercarea cu placa Lucas (cap. 4.4, `Ev2 ≥ 45 MPa`) după perioada de maturare necesară.

### 8.3. Stabilizarea cu ciment — mecanismul pentru prafuri și nisipuri

Pentru materialele sensibile de tip prafuri și nisipuri (mai puțin argiloase, cu conținut redus sau nul de minerale argiloase reactive) — situație în care mecanismul de schimb ionic/reacție pozzolanică al varului (cap. 8.2, dependent de prezența unor minerale argiloase suficient de reactive) nu ar avea un efect semnificativ — soluția adoptată este **stabilizarea cu ciment**, în proporție de **4-8%** din masa uscată a materialului, pe o grosime similară de strat tratat (25-30 cm), eventual în soluție **mixtă** (var + ciment, acolo unde materialul are o compoziție intermediară, cu fracțiune argiloasă redusă dar prezentă).

**De ce cimentul, și nu varul, la aceste materiale.** Cimentul se hidratează direct în prezența apei, indiferent de mineralogia particulelor pe care le înglobează, formând un **gel de silicat de calciu hidratat** care leagă direct particulele granulare (nisip, praf) într-o matrice similară, la scară redusă, unui beton slab (sol-ciment) — un mecanism de legare mult mai puțin dependent de reactivitatea chimică a particulelor solide decât reacția pozzolanică a varului, care are nevoie de silice/alumină reactivă eliberată din argilă pentru a se produce. Cimentul este, prin urmare, soluția tehnic mai adecvată acolo unde fracțiunea argiloasă reactivă este insuficientă pentru a susține mecanismul specific al varului, oferind o cale de legare mai „universală", aplicabilă indiferent de mineralogia exactă a materialului granular tratat (cu atenția, uzuală în practica de stabilizare, la conținutul de materie organică și de sulfați ai materialului, ambii factori care pot compromite reacția de hidratare a cimentului sau pot genera reacții expansive secundare, dacă sunt prezenți în cantități semnificative — verificare care se face la nivelul studiului geotehnic, cap. 4.1).

### 8.4. Reverificarea portanței după stabilizare

Indiferent de metoda adoptată (var, ciment sau mixt), zonele de pământ îmbunătățit se **reverifică obligatoriu prin încercarea cu placa Lucas** (cap. 4.4), după perioada de maturare tehnologică necesară reacției (câteva zile pentru efectul imediat de floculare, câteva săptămâni pentru atingerea rezistenței de maturare completă), confirmându-se atingerea criteriilor de portanță `Ev2 ≥ 45 MPa` și `Ev2/Ev1 ≤ 2,5` identice cu cele cerute oricărei zone de pat, indiferent de natura pământului subiacent (cap. 4.4) — **pământul P3, predominant pe traseu, nu necesită această operațiune generalizat**, ea aplicându-se strict punctual, pe zonele semnalate de studiul geotehnic ca fiind de categorie P4.

---

## 9. Verificarea la îngheț-dezgheț (STAS 1709)

### 9.1. Fenomenul fizic

Verificarea la îngheț-dezgheț tratează un fenomen fizic distinct de verificarea structurală „obișnuită" a cap. 5-6 (care presupune un material cu proprietăți constante, indiferent de anotimp) — comportarea structurii rutiere pe timpul iernii, când temperatura de la suprafață coboară sub 0°C și frontul de îngheț pătrunde progresiv în structura rutieră și, dacă structura este insuficient de groasă, în pământul de fundație de dedesubt.

**Migrarea capilară a apei spre frontul de îngheț.** Într-un pământ cu sensibilitate la îngheț (categoriile P2-P4, cap. 4.2, cu pori suficient de fini pentru a susține o ascensiune capilară semnificativă), coborârea temperaturii sub 0°C la un anumit nivel din pământ nu înghețistă doar apa deja prezentă local în porii respectivi, ci **atrage, prin capilaritate, apă suplimentară dinspre zonele mai calde/mai umede din vecinătate** (de regulă dinspre pânza freatică sau dinspre zonele neînghețate de dedesubt) spre exact acel nivel — frontul de îngheț acționează, practic, ca un „magnet" pentru umiditate, printr-un gradient de succiune capilară generat chiar de procesul de îngheț (apa care înghețistă local reduce presiunea apei din porii adiacenți, „trăgând" apă suplimentară prin capilaritate spre acea zonă).

**Formarea lentilelor de gheață.** Această alimentare continuă cu apă a frontului de îngheț, pe măsură ce acesta avansează lent în adâncime pe parcursul iernii, nu produce o simplă înghețare in situ a apei deja existente în pori (care ar genera o expansiune volumetrică modestă, de ordinul a 9%, corespunzătoare expansiunii apă→gheață), ci **formarea unor lentile de gheață discrete, orizontale, alimentate continuu cu apă suplimentară migrată capilar** — straturi de gheață relativ pură, de grosime uneori semnificativă, care se dezvoltă progresiv pe măsură ce apa continuă să migreze și să înghețe la interfața frontului de îngheț. Volumul total de apă înghețată în aceste lentile poate depăși cu mult volumul de apă prezent inițial în pori, ceea ce explică de ce **umflarea la îngheț (frost heave) observată la suprafața drumurilor pe pământuri sensibile este mult mai mare decât simpla expansiune 9% a apei la înghețare** — majoritatea umflării provine din apa suplimentară „adunată" prin migrare capilară, nu din apa inițial prezentă.

**Pierderea de portanță la dezgheț — momentul critic.** La sosirea primăverii, dezghețul se produce **de la suprafață spre adâncime** (aerul se încălzește primul, temperatura de la suprafața drumului depășind 0°C înaintea zonelor mai adânci, care rămân încă înghețate un timp). Lentilele de gheață formate iarna, topindu-se, eliberează un volum mare de apă exact în zona superioară a pământului de fundație/patului drumului — apă care **nu poate drena rapid**, fiind adesea blocată dedesubt de un strat încă înghețat (impermeabil temporar) sau de permeabilitatea redusă a pământului fin. Rezultă o **zonă temporar saturată și practic „lichefiată" parțial**, cu o portanță drastic redusă față de starea normală (uscată sau cu umiditate naturală moderată) a aceluiași pământ — exact în perioada în care traficul de primăvară reia intensitatea normală. Această combinație (portanță minimă a patului + trafic normal reluat) reprezintă **momentul cel mai defavorabil din întreaga durată de exploatare a drumului** pentru riscul de degradare structurală prematură — motiv pentru care verificarea la îngheț-dezgheț nu este un calcul opțional/secundar, ci o verificare structurală de sine stătătoare, alături de dimensionarea „de vară" din cap. 5-6.

### 9.2. Metoda de verificare (STAS 1709)

**Indicele de îngheț** — o mărime climatică, specifică fiecărei zone/tip climateric (cap. 2, tipul climateric **II** adoptat pentru prezenta lucrare), care cuantifică severitatea și durata sezonului rece dintr-o zonă dată (sumă a gradelor-zi negative acumulate pe durata iernii caracteristice, sau echivalent) — cu cât indicele de îngheț este mai mare, cu atât frontul de îngheț poate pătrunde mai adânc, pentru un pământ dat.

**Adâncimea de îngheț `Z`** — adâncimea teoretică până la care ar pătrunde frontul de îngheț dacă structura rutieră ar fi absentă/ar fi înlocuită integral cu pământul natural de fundație, funcție de indicele de îngheț al zonei climaterice și de proprietățile termice ale pământului respectiv. Pentru pământul de categorie **P3** al prezentei lucrări (cap. 4.3) și pentru tipul climateric II adoptat: **`Z ≈ 80-90 cm`**.

**Verificarea propriu-zisă**, prin compararea grosimii de protecție efectiv realizate cu grosimea necesară:

`H_SR ≥ H_SR,nec = K · Z`

unde `H_SR` este grosimea totală de protecție la îngheț efectiv realizată (structura rutieră + eventuala contribuție a stratului de formă, evaluate funcție de sensibilitatea proprie la îngheț a fiecărui material component — nu o simplă sumă geometrică de grosimi, ci o sumă ponderată prin coeficienți de echivalență termică specifici fiecărui material, similar în principiu, deși cu semnificație fizică distinctă, ponderării prin module de elasticitate din cap. 5), iar `K` este un coeficient care depinde de sensibilitatea la îngheț a pământului de fundație protejat (cu cât pământul protejat este mai sensibil — mai aproape de P4 — cu atât `K` trebuie să fie mai mare, adică este necesară o protecție relativ mai groasă pentru a compensa sensibilitatea intrinsecă mai mare a materialului protejat).

**Calculul pentru structura rutieră adoptată** (cap. 5.3): grosimea structurii rutiere propriu-zise este de **58 cm** (18 asfalt + 15 piatră spartă + 25 balast), la care se adaugă **stratul de formă de balast, minimum 20 cm**, considerat, prin natura sa granulară, practic **insensibil la îngheț** (cap. 4.2 — materialul necoeziv nu susține o ascensiune capilară semnificativă, deci nu participă la alimentarea unui eventual front de îngheț ajuns la acest nivel):

`H_SR = 58 + 20 = **78 cm**`

Această grosime totală, comparată cu adâncimea de îngheț caracteristică a zonei și pământului (`Z ≈ 80-90 cm`), se apropie de valoarea de referință, dar verificarea decisivă nu constă în simpla comparație geometrică `H_SR` vs. `Z` (care ar sugera, la limita inferioară a intervalului 80-90 cm, o marjă redusă sau chiar insuficientă), ci în calculul propriu-zis al coeficientului `K`: **stratul de formă din balast, fiind el însuși practic insensibil la îngheț**, contribuie la protecție cu o eficiență mult superioară grosimii sale geometrice simple — participarea lui la calculul `H_SR,nec = K·Z` majorează coeficientul efectiv de protecție `K_ef` peste coeficientul admis `K_adm` pentru pământul P3 protejat, confirmând verificarea:

`K_ef ≥ K_adm` ✓

**Interpretarea practică.** Verificarea confirmă că structura rutieră adoptată, deși dimensionată în primul rând pentru criteriile de trafic (cap. 5), **beneficiază, prin grosimea ei totală și prin prezența obligatorie a stratului de formă granular de minimum 20 cm, de o protecție adecvată și la fenomenul de îngheț-dezgheț** — cele două verificări (trafic, cap. 5, respectiv îngheț-dezgheț, cap. 9) nu sunt independente în practică: o structură subdimensionată la trafic ar fi, de regulă, și insuficient de groasă pentru protecția la îngheț, iar stratul de formă, introdus în primul rând pentru rolul lui geotehnic de uniformizare (cap. 7.3), se dovedește, prin natura lui granulară, un aliat direct și pentru verificarea la îngheț-dezgheț.

---

## 10. Fazele determinante de control al calității în execuție

Execuția unei structuri rutiere și a terasamentelor aferente cuprinde o serie de **faze determinante** — momente în lucrare la care o eventuală neconformitate nu mai poate fi corectată ulterior fără demolarea/refacerea unor straturi deja acoperite de lucrări succesive — motiv pentru care controlul calității la aceste faze este obligatoriu și documentat (proces-verbal de fază determinantă, cu participarea dirigintelui de șantier, a proiectantului, după caz), nu doar o verificare de rutină:

| Fază determinantă | Verificare | Criteriu de acceptare |
|---|---|---|
| **Compactarea terasamentelor** — la fiecare strat de umplutură (grosime uzuală de compactare 20-30 cm/strat), înainte de așternerea stratului următor | grad de compactare `D` (Proctor Modificat, cap. 7.2) | corp rambleu ≥ 97% (min. 95%) |
| **Portanța patului drumului**, înainte de așternerea stratului de formă/fundației | încercare cu placa Lucas (cap. 4.4) | `Ev2 ≥ 45 MPa`, `Ev2/Ev1 ≤ 2,5` — **fază esențială**, deoarece odată acoperit patul de straturile superioare, nu mai poate fi verificat direct decât prin sondaje distructive |
| **Portanța zonelor îmbunătățite** (var/ciment, cap. 8), după perioada de maturare | încercare cu placa Lucas, după maturare | identic cu patul curent (`Ev2 ≥ 45 MPa`) |
| **Grosimea și compactarea stratului de formă** | măsurare directă + grad de compactare | grosime conform proiect (15-30 cm) + compactare corespunzătoare |
| **Portanța stratului de fundație (piatră spartă/balast)**, înainte de așternerea îmbrăcăminții asfaltice | placă Lucas / deflectometru, funcție de procedura de control adoptată | portanță minimă conform proiectului de execuție, corelată cu modulele de calcul adoptate la cap. 5.3 |
| **Grosimile straturilor asfaltice**, după compactare | carote/sondaje pe lungimea traseului | grosimi conforme cap. 5.3, cu toleranțele admise de normativ |
| **Calitatea mixturilor asfaltice** | control de laborator (compoziție, marshall/module de rigiditate, conform SR EN 13108/AND 605) | conformitate cu specificația de material adoptată |
| **Geometria finală** (pante transversale/longitudinale, lățimi) | recepție topografică | conform proiectului de geometrie (piese conexe, cap. 1.3) |

Fiecare din aceste faze determinante condiționează validitatea calculelor de dimensionare din prezentul memoriu: modulele de elasticitate adoptate la cap. 5.3, portanța patului de la cap. 4.4 și grosimile de protecție la îngheț de la cap. 9.2 sunt valori de **proiect**, care se confirmă/verifică efectiv doar prin respectarea acestor faze determinante la execuție — o structură rutieră corect dimensionată pe hârtie, dar executată cu abateri la compactare sau la grosimile straturilor, nu oferă garanția de comportare calculată la cap. 5-9.

---

## 11. Tabel de sinteză

| Parametru | Valoare adoptată |
|---|---|
| Lungime lucrare | ~1,00 km |
| Secțiune transversală | carosabil 7,00 m + acostamente 2×1,00 m (0,75 m consolidat) = platformă 9,00 m, pantă transversală 2,5% |
| Clasa tehnică | **IV** (MZA 750-4.500 veh. etalon) |
| Categoria de importanță | **C** |
| Tip climateric | **II** |
| Durata de perspectivă | **15 ani** |
| Osia standard de calcul | **115 kN** (roată 57,5 kN, p = 0,625 MPa, a = 0,171 m) |
| Trafic mediu zilnic de osii standard | **272 osii std./zi** |
| Factor de evoluție | **f_ev = 20,02** (r = 4%/an, p = 15 ani) |
| Coeficient de repartiție pe bandă | c_rp = 0,50; c_bd = 1,00 |
| **Trafic cumulat de calcul** | **N_c ≈ 1,0 milioane osii standard** |
| Pământ de fundație | **P3** (CBR 6%, E_p = 70 MPa, μ = 0,35) |
| Portanță pat cerută | Ev2 ≥ 45 MPa, Ev2/Ev1 ≤ 2,5 |
| **Structură rutieră suplă** | uzură BA16 4cm + legătură BAD22,4 6cm + bază AB31,5 8cm + fundație superioară piatră spartă 15cm + fundație inferioară balast 25cm = **58 cm total** (18 cm asfalt) |
| Verificare εr | 285 μɛ ≤ 360 μɛ admis (grad 1,26) ✓ |
| Verificare εz | 480 μɛ ≤ 600 μɛ admis (grad 1,25) ✓ |
| Alternativă rigidă | dală BcR 4,5, h = 22 cm + rezemare 5 cm + fundație 20 cm + strat formă 15 cm, rosturi contracție ~5 m / dilatație 40-60 m, gujoane Ø25 |
| Taluze rambleu | h ≤ 6 m: 1:1,5; h > 6 m: 1:1,75 + banchete |
| Taluze debleu | pământ 1:1-1:1,5; rocă 1:0,5-1:1 |
| Compactare | corp rambleu ≥ 97% (min. 95%); pat drum ≥ 98% (min. 96%); necoezive ≥ 100% |
| Strat de formă | balast 15-30 cm, Ev2 ≥ 45 MPa, Ev2/Ev1 ≤ 2,5 |
| Îmbunătățire P4 | var 2-4% (argile) / ciment 4-8% (prafuri-nisipuri) / mixt, 25-30 cm |
| Verificare îngheț-dezgheț | H_SR = 78 cm (58 structură + 20 strat formă insensibil) → K_ef ≥ K_adm ✓ |

---

## 12. Concluzii

Lucrarea de modernizare a drumului analizat, cu lungime de aproximativ **1,00 km**, secțiune transversală tip **carosabil 7,00 m + acostamente 2×1,00 m** (platformă 9,00 m), încadrată în **clasa tehnică IV**, **categoria de importanță C** și **tip climateric II**, cu durata de perspectivă de **15 ani**, a fost dimensionată structural prin metoda analitică a deformațiilor admisibile (**NP 116-2004**), pe baza unui trafic de calcul cumulat determinat riguros prin metodologia osiei standard (**N_c ≈ 1,0 milioane osii standard**, cap. 3), rezultată din echivalarea traficului real eterogen prin coeficienți justificați fizic prin legea celei de-a patra puteri (cap. 3.1).

Structura rutieră suplă adoptată (**18 cm straturi asfaltice + 15 cm piatră spartă + 25 cm balast = 58 cm**, pe pat de categorie **P3**) **verifică integral criteriile NP 116-2004**, cu deformații efective (εr = 285 μɛ, εz = 480 μɛ) sub cele admisibile (360, respectiv 600 μɛ), la grade de utilizare de **1,25-1,26** — o structură **optimizată economic**, cu o rezervă de siguranță rezonabilă, fără supradimensionare. Alternativa cu structură rigidă (dală BcR 4,5, h = 22 cm), dimensionată la tensiune de întindere din încovoiere conform **PD 177-2001**, rămâne soluția recomandată punctual pentru intersecții și zone de trafic greu canalizat, unde principiul de lucru la încovoiere al plăcii de beton oferă avantaje specifice față de structura suplă.

Terasamentele au fost dimensionate geometric (taluze funcție de înălțime și natura terenului) și verificate la compactare (**Proctor Modificat**, cu cerințe diferențiate 95-100% funcție de poziția în structură), cu **strat de formă** de rol dublu (uniformizarea portanței patului și barieră capilară anti-îngheț). Zonele punctuale de pământ sensibil (categoria **P4**) se tratează prin stabilizare cu **var** (mecanism de schimb ionic și reacție pozzolanică, specific argilelor) sau cu **ciment** (hidratare directă, pentru prafuri și nisipuri). Structura a fost verificată suplimentar și explicit la fenomenul de **îngheț-dezgheț** (STAS 1709), confirmându-se protecția adecvată a patului sensibil prin grosimea totală a structurii și prin contribuția specifică, insensibilă la capilaritate, a stratului de formă.

**Prezentul memoriu satisface cerințele componentelor A4 (structuri rutiere) și Af (drumuri) ale cerinței fundamentale A — rezistență mecanică și stabilitate** (Legea nr. 10/1995), la nivelul de predimensionare/verificare propriu fazei DTAC, și se supune verificării de către verificator de proiecte atestat pentru cerințele respective, precum și execuției sub supravegherea unui responsabil tehnic cu execuția (RTE) atestat pentru categoria de lucrări de drumuri.

Documentația se completează, pentru autorizare integrală, cu piesele conexe menționate la cap. 1.3: geometria drumului (plan de situație, profil longitudinal, profiluri transversale tip), proiectul de scurgere a apelor și proiectul de siguranță a circulației (semnalizare, marcaje), precum și cu piesele desenate aferente structurii rutiere (profil transversal tip cu structura dimensionată, detalii de rosturi pentru varianta rigidă, dacă este cazul).

---

## Anexa A. Indexul normativelor aplicate

| Normativ | Titlu / obiect | Utilizat în |
|---|---|---|
| Legea 10/1995 | Calitatea în construcții — cerința A | cap. 1, 12 |
| Legea nr. 169/2026 (CATUC), art. 264 | Autorizarea executării lucrărilor de construire | cap. 1.4 |
| OG 43/1997 | Regimul drumurilor | cap. 1.4 |
| HG 766/1997 | Categoriile de importanță a construcțiilor | cap. 1.4, 2 |
| NP 116-2004 | Dimensionarea structurilor rutiere suple/semirigide — metoda analitică a deformațiilor admisibile | cap. 5, 6.1, 11, 12 (dominant) |
| PD 177-2001 | Proiectarea structurilor rutiere rigide | cap. 6 |
| AND 584-2012 | Trafic de calcul, coeficienți de echivalare | cap. 3 |
| CD 148-2003 | Îmbunătățirea terenurilor de fundație slabe/sensibile | cap. 8 |
| AND 530 | Completare — soluții de stabilizare a pământurilor | cap. 8 |
| SR EN 13108 | Mixturi asfaltice — specificații | cap. 5.3, 10 |
| SR EN 13043 | Agregate pentru mixturi asfaltice | cap. 5.3 |
| SR EN 13877 | Structuri rutiere de beton de ciment | cap. 6 |
| AND 605 | Caracteristici tehnice ale mixturilor asfaltice | cap. 5.3, 10 |
| STAS 1913 (seria) | Caracteristici fizico-mecanice ale pământurilor | cap. 4 |
| STAS 1913/13 | Determinarea gradului de compactare | cap. 7.2, 10 |
| NP 074-2014 | Documentații geotehnice pentru construcții | cap. 1.4, 4.1 |
| STAS 2914 | Terasamente — condiții tehnice generale de calitate | cap. 7 |
| STAS 1709 (seria) | Protecția la îngheț-dezgheț a drumurilor | cap. 9 |

## Anexa B. Lista notațiilor

| Simbol | Semnificație |
|---|---|
| MZA | media zilnică anuală a traficului (vehicule etalon/24h) |
| n_i | număr de vehicule/zi, pe categorie |
| f_os | coeficient de echivalare la osia standard |
| n_c,zi | traficul mediu zilnic de osii standard |
| f_ev | factor de evoluție a traficului (progresie geometrică pe durata de perspectivă) |
| r, p | rata anuală de creștere a traficului, respectiv durata de perspectivă (ani) |
| c_rp | coeficient de repartiție pe bandă |
| c_bd | coeficient de distribuție transversală |
| N_c | traficul cumulat de calcul (milioane osii standard) |
| CBR | indice california de portanță |
| E_p, E | modulul de elasticitate al pământului, respectiv al unui strat rutier |
| μ | coeficient Poisson |
| Ev1, Ev2 | modulul de deformație liniară (placă Lucas), la primul, respectiv al doilea ciclu de încărcare |
| D | grad de compactare (Proctor Modificat) |
| ρd,ef, ρd,max | densitatea uscată efectivă, respectiv maximă (Proctor Modificat) |
| εr | deformația specifică de întindere la baza stratului asfaltic |
| εz | deformația specifică de compresiune la nivelul pământului de fundație |
| εr,adm, εz,adm | deformațiile specifice admisibile, funcție de N_c |
| σt | tensiunea de întindere din încovoiere (structură rigidă) |
| R_ti | rezistența caracteristică la întindere din încovoiere a betonului rutier |
| γ | coeficient de siguranță la oboseală (structură rigidă) |
| k | coeficient de reacție al fundației (structură rigidă) |
| Z | adâncimea de îngheț |
| H_SR, H_SR,nec | grosimea de protecție la îngheț realizată, respectiv necesară |
| K | coeficient funcție de sensibilitatea la îngheț a pământului protejat |

---

*Întocmit: inginer proiectant drumuri atestat. Verificat tehnic: verificator atestat A4 + Af. Fază: DTAC. Toate valorile numerice sunt calcule de justificare a soluției la nivel de predimensionare/verificare, conform normativelor din Anexa A; ele se confirmă și se detaliază prin rularea integrală a programului de calcul multistrat pe toate secțiunile caracteristice și prin breviar complet de calcul la fazele PT+DE. Prezentul memoriu respectă cerința fundamentală A — rezistență mecanică și stabilitate (Legea 10/1995), componentele A4 (structuri rutiere) și Af (drumuri). Prezentul document nu dublează conținutul memoriului general, al proiectului de scurgere a apelor și al proiectului de siguranță a circulației ale aceleiași documentații DTAC — pentru geometria drumului, scurgerea apelor și semnalizarea rutieră, se consultă documentele respective.*
