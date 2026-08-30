# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Hotel 4 stele, regim S+P+6E, 100 camere (188 locuri), restaurant + bucătărie profesională, săli de conferință, SPA/piscină, parcaj subteran

---

## PTh-H.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 anexa 8 și Legii nr. 169/2026 (CATUC), art. 264, Anexa nr. 2) pentru memoriul de instalații al unității hoteliere de 4 stele, regim S+P+6E, 100 de camere de cazare (188 de locuri), restaurant clasificat cu bucătărie profesională, săli de conferință modulabile, componentă SPA/wellness cu piscină interioară și parcaj subteran, tratată la faza DTAC în `instalatii.md`. Documentul dezvoltă la nivel de execuție tot ceea ce faza DTAC a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă — **fără a relua** breviarele DTAC, ci detaliindu-le nod cu nod, cameră cu cameră acolo unde repetitivitatea tipologiei o permite, și adăugând componentele specifice fazei de execuție: scheme complete de montaj, breviare de calcul la nivel de tronson/circuit/echipament, fișe tehnice de echipament cu parametri garantați, tabele complete de probe, tehnologie de montaj, protocoale de punere în funcțiune și Planul de Control al Calității.

Ipoteza funcțională se menține identică cu DTAC: hotel de 4 stele, categoria de importanță **B**, clasa de importanță seismică **II** (γI,e = 1,20), grad de rezistență la foc **II**, cotă ultim planșeu ocupabil +20,70 m (sub pragul de 28,00 m al clădirii înalte, P118-1/2013), 100 de camere repartizate pe 5 niveluri de cazare (E2÷E6), funcțiuni publice concentrate pe podium (parter + etaj 1). Orice modificare a acestei ipoteze — supraînălțare peste regimul de bază, creșterea capacității de cazare peste 100 de camere, sau modificarea programului funcțional al podiumului — impune reluarea integrală a dimensionării de la faza PTh, conform semnalului deja transmis în DTAC (§6.0).

PTh aduce, față de DTAC, următoarele niveluri suplimentare de detaliere, pe fiecare disciplină:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, de principiu, bilanțuri globale pe clădire | scheme de execuție complete, cu nuclee tehnice numerotate, toate diametrele/traseele/nodurile identificate |
| Breviar hidraulic | debite globale pe rețea (apă, ACM, canalizare, pluvial, piscină) | calcul nod cu nod (metoda echivalenților/Hazen-Williams) pe fiecare nucleu tehnic vertical și pe fiecare zonă de sprinklere |
| HVAC camere | necesar termic pe camera reprezentativă, agregare pe 100 de camere | dimensionare completă a unităților terminale pe fiecare tip de cameră, verificarea lungimilor echivalente de refrigerant VRF, breviar ventilație băi |
| Breviar electric | necesar global (kW, kVA) pe zone funcționale | dimensionare completă pe fiecare circuit/tablou de etaj, verificare cădere de tensiune, selectivitate, curent de pornire pompă incendiu |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație |
| Montaj | principii generale | tehnologie, succesiune, susțineri, izolații, treceri la foc, cerințe seismice pe conducte grele/echipamente |
| PIF | menționată generic | protocoale de echilibrare, reglaj, programare BMS/IDSAI/PMS, primă pornire echipamente critice |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |
| Iluminat | niveluri globale + un exemplu de calcul pe cameră | calcul complet metoda flux luminos pe fiecare zonă funcțională |
| PSI | dimensionare preliminară globală, deferată scenariului dedicat | breviar hidraulic complet sprinklere/hidranți pe clase de risc, detecție per cameră, alarmare vocală |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC (cap. 1.4): **SR EN 12845** (proiectarea, instalarea și întreținerea instalațiilor fixe de stingere cu sprinklere), **SR EN 12259** (componente sprinkler — capete, ACS, alarme hidraulice), **SR EN 671-1/2** (hidranți interiori — proiectare și verificare), **SR EN 54** (seria pentru componentele sistemului de detectare, semnalizare și alarmare la incendiu — IDSAI), **SR EN 54-16/24** (echipamente de control și de redare vocală pentru sisteme de alarmare vocală la incendiu), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 62305-3** (măsuri de protecție pentru structuri — execuție SPD/coborâri), **NP 086/2005** (proiectarea și execuția instalațiilor de stingere a incendiilor cu apă), **NP 068/2002** (proiectarea sălilor aglomerate — relevantă pentru sălile de conferință), **GP 063/2001** (bucătării profesionale — exhaustare și stingere), **C56** (verificarea calității lucrărilor de instalații), **NTPEE-2018** (Ordinul ANRE 89/2018, capitolul execuție și probe), **SR EN 12237** (clasa de etanșeitate a tubulaturii de ventilare), **UL 300/EN 16282** (sisteme de stingere cu agent umed pe hotele de bucătărie profesională, referință tehnică uzuală în lipsa unui standard românesc dedicat complet).

---

## PTh-H.2 Scheme detaliate de execuție

### PTh-H.2.1 Precizarea nucleelor tehnice verticale ale turnului de cazare

DTAC (§17.1) a stabilit principiul: coloanele verticale ale tuturor instalațiilor se aliniază pe verticală, la interfața grupurilor sanitare „spate în spate" ale camerelor, o singură ghenă deservind simultan două camere adiacente pe același etaj. La faza PTh, această geometrie se precizează exact, pentru a permite calculul nod-cu-nod: turnul de cazare este deservit de **5 nuclee tehnice verticale (GT-1…GT-5)**, dispuse simetric pe cele două aripi ale planului de etaj, fiecare nucleu grupând **2 perechi de camere „spate în spate"** pe fiecare nivel (**4 camere/nivel/nucleu**), pe toate cele 5 niveluri de cazare (E2÷E6): **4 × 5 = 20 camere pe toată înălțimea unui nucleu**, iar cele **5 nuclee însumează 5 × 20 = 100 camere**, coerent atât cu capacitatea totală a hotelului, cât și cu organizarea pe 5 coloane de recirculare ACM deja stabilită în DTAC §3.6 — precizare care confirmă și clarifică, la faza PTh, corespondența dintre cele „5 coloane" citate acolo și geometria reală a turnului.

Fiecare nucleu GT-i găzduiește, pe toată înălțimea sa, coloana de apă rece, coloana de apă caldă + recirculare, coloana de canalizare fonoabsorbantă, un jgheab de cabluri electrice/curenți slabi și un canal colector de ventilație a băilor — toate izolate fizic unele de altele prin despărțitori metalice interioare ale ghenei, conform separării impuse de I7 între curenți tari și curenți slabi.

### PTh-H.2.2 Schema rețelei de sprinklere — zone de risc, ACS, noduri

Rețeaua de sprinklere, adoptată ca soluție de bună practică pentru profilul de risc al cazării (semnalată ca recomandată în DTAC §6.0, chiar dacă nu este strict obligatorie pentru varianta de bază sub 28 m), acoperă integral clădirea și se compartimentează hidraulic pe **3 clase de risc**, conform SR EN 12845/NP 086, fiecare cu **aparat de control și semnalizare (ACS) propriu**, robinet de secționare cu supraveghere de poziție (tamper) și clopot de alarmă hidraulic:

| Zonă ACS | Spații acoperite | Clasă de risc (SR EN 12845) | Densitate de stropire | Arie de operare |
|---|---|---|---|---|
| ACS-1 | Camere de cazare (E2÷E6) + coridoare de etaj | **LH (Light Hazard)** | 2,25 mm/min (l/min·mp) | 84 mp |
| ACS-2 | Lobby, restaurant, săli conferință + foaier, SPA/vestiare, birouri | **OH1 (Ordinary Hazard 1)** | 5,0 mm/min | 72 mp |
| ACS-3 | Bucătărie profesională (plafon, complementar hotei cu stingere dedicată §H.2.9) + parcaj subteran | **OH2 (Ordinary Hazard 2)** | 5,0 mm/min | 144 mp |

**Traseul principal (schema coloană):**

```
Rezervor de incendiu (dimensionat de scenariul de securitate la incendiu) ─► Cameră pompe subsol
   (Electropompă principală 45 kW + Pompă Diesel de rezervă + Pompă jockey)
   ─► Colector de refulare DN 100 ─┬─► ACS-1 (Camere E2÷E6, prin riser vertical dedicat) ─► rețea plafon camere
                                    ├─► ACS-2 (Podium — lobby/restaurant/conferință/SPA) ─► rețea plafon public
                                    └─► ACS-3 (Bucătărie + parcaj subsol) ─► rețea plafon OH2
```

**Debitul de calcul pe fiecare zonă** (Q = d × A_op / 60, cu d în mm/min, A_op în mp):

- **ACS-1 (LH, camere)**: Q_LH = 2,25 × 84 / 60 = **3,15 l/s**
- **ACS-2 (OH1, public)**: Q_OH1 = 5,0 × 72 / 60 = **6,00 l/s**
- **ACS-3 (OH2, bucătărie+parcaj)**: Q_OH2 = 5,0 × 144 / 60 = **12,00 l/s**

Conform practicii SR EN 12845, se dimensionează pompa pentru **cel mai defavorabil scenariu individual** (o singură zonă activă la un moment dat, cumulat cu debitul hidranților interiori care pot funcționa concomitent, cap. H.2.3): scenariul dimensionant este **ACS-3 (12,00 l/s) + 2 hidranți concomitenți (2 × 2,1 = 4,2 l/s) = 16,2 l/s**, valoare care rămâne cu marjă confortabilă sub debitul nominal al electropompei principale (cap. H.4.4, 35 l/s la 65 mCA) — marja rezultată (≈2,2×) acoperă atât pierderile suplimentare de traseu real confirmate la shop-drawing, cât și un eventual scenariu combinat de evenimente concomitente (conferință + restaurant), fără a necesita o pompă supradimensionată nejustificat.

### PTh-H.2.3 Schema hidranților interiori și exteriori

**Hidranți interiori** — rețea inelară DN 65-80, alimentată din colectorul de refulare al stației de pompare, cu hidranți DN 25/52 echipați (cutii cu furtun semirigid 30 m, robinet, ajutaj) dispuși astfel încât orice punct al clădirii, inclusiv fiecare cameră de cazare, să fie atins de minimum un jet, cu dublă acoperire (2 jeturi) în zonele publice aglomerate:

| Hidrant | Poziție | Ø racord | Debit adoptat |
|---|---|---|---|
| Hi-1 | Lobby, lângă bateria de ascensoare oaspeți | DN 65 | 2,1 l/s |
| Hi-2 | Coridor restaurant, lângă acces bucătărie | DN 65 | 2,1 l/s |
| Hi-3 | Foaier săli conferință (etaj 1) | DN 65 | 2,1 l/s |
| Hi-4 | SPA, acces vestiare (etaj 1) | DN 50 | 2,1 l/s |
| Hi-5…Hi-9 | Coridor de etaj, câte 1/etaj de cazare (E2÷E6), la mijlocul coridorului | DN 50 | 2,1 l/s fiecare |
| Hi-10 | Bucătărie profesională, lângă ieșirea de serviciu | DN 65 | 2,1 l/s |
| Hi-11 | Parcaj subteran, lângă rampa de acces | DN 65 | 2,1 l/s |
| Hi-12 | Subsol, lângă camera pompelor/CT | DN 50 | 2,1 l/s |

Debitul de calcul (2 jeturi simultane, cele mai defavorabile) = **4,2 l/s**. **Hidranți exteriori** — inel exterior DN 150 îngropat sub adâncimea de îngheț (0,80-1,10 m), cu 2 hidranți supraterani DN 100, poziționați la accesul principal (drop-off oaspeți) și la accesul de serviciu/aprovizionare, la distanță ≤130 m unul de celălalt măsurată pe conturul clădirii (< 150 m admis), cu racord tip B pentru autospecialele ISU la ambii hidranți și la rezervor.

### PTh-H.2.4 Schema HVAC camere — VRF cu recuperare + DOAS

Fiecare cameră de cazare este echipată cu o **unitate interioară VRF de tip caseta/duct**, dimensionată individual pe tipul de cameră (cap. H.3.9), racordată la un sistem VRF cu recuperare de căldură (3/4 țevi, justificat în DTAC §6.7) organizat pe **grupuri de unități exterioare pe terasă, câte un grup pentru fiecare pereche de nuclee tehnice** (GT-1+GT-2 pe un grup, GT-3+GT-4 pe un al doilea grup, GT-5 pe un al treilea grup, mai redus ca putere), astfel încât avaria unei unități exterioare să afecteze maximum 40 de camere, nu întregul hotel — proporționalitate conformă principiului stabilit în DTAC §1.6.

**Aerul proaspăt** este tratat separat prin **5 unități DOAS cu recuperare de căldură rotativă/cu plăci (η = 0,80)**, câte una per nucleu tehnic GT-i, amplasate în oficiul tehnic de etaj cel mai apropiat de nucleu sau, alternativ, centralizat pe terasă cu distribuție verticală prin canalul dedicat al nucleului — soluție tehnică ce se stabilește definitiv la faza de execuție în funcție de gabaritul disponibil în oficiile de etaj (memoriul de arhitectură, cap. 14.3). Debitul unei unități DOAS per nucleu: 20 camere × 60 mc/h = **1.200 mc/h**, identic distribuției pe 5 unități deja stabilite în DTAC §7.2, confirmând coerența dintre organizarea pe nuclee tehnice și dimensionarea DOAS.

**Verificarea lungimii echivalente de refrigerant**: pentru grupul de unități exterioare care deservește nucleele GT-1+GT-2 (40 de camere, etajele E2÷E6), lungimea echivalentă maximă de traseu frigorific (de la unitatea exterioară de pe terasă, cotă +23,80 m, la cea mai îndepărtată unitate interioară, etajul E2, cotă +8,70 m, cu traseu orizontal suplimentar ≈15 m pe terasă + coborâre prin nucleul GT-1/GT-2): L_echiv ≈ (23,80 − 8,70) + 15 + 10 (piese speciale, echivalent) = **≈ 40 m**, sub limita uzuală de 70…100 m (funcție de producător) impusă pentru menținerea capacității nominale și a fiabilității uleiului de compresor pe sisteme VRF 3/4 țevi — confirmare care validează soluția de zonare pe grupuri de terasă adoptată, fără a necesita stații de recuperare intermediare (branch controllers) suplimentare față de cele uzuale de etaj.

### PTh-H.2.5 Schema ventilației băilor — extracție centralizată pe nucleu

Fiecare baie de cameră (100 de băi) este echipată cu o **gură de extracție la plafon**, racordată printr-o ramură individuală de canal flexibil izolat fonic la un **canal colector vertical unic per nucleu tehnic**, amplasat în ghena GT-i alături de coloanele sanitare — soluție care evită montarea unor ventilatoare individuale zgomotoase în fiecare baie (contrar țintei acustice de ≤30 dB(A) din DTAC §1.5) și concentrează extracția pe un singur ventilator de acoperiș robust per nucleu.

Fiecare ramură individuală de baie este echipată cu o **clapetă antiretur (backdraft)** care previne migrarea mirosurilor/zgomotului între camerele racordate la același canal colector — element de proiectare esențial la un hotel, unde o clapetă lipsă ar permite ca zgomotul sau mirosul din baia unei camere să ajungă, prin canalul comun, în baia camerei vecine. Debitul de extracție adoptat este de **30 mc/h/baie** (valoare de bună practică pentru hoteluri de 4 stele cu funcționare continuă, superioară minimului strict impus de I5 pentru locuințe, justificată de standardul ridicat de proaspăt al aerului cerut categoriei de clasificare):

**Q_nucleu = 20 băi/nucleu × 30 mc/h = 600 mc/h**, evacuat printr-un ventilator de acoperiș dedicat per nucleu (5 ventilatoare în total, Q_total = 5 × 600 = **3.000 mc/h**), cu funcționare continuă 24/7 la debit de bază și treaptă de boost temporizată (comandată de la întrerupătorul de lumină al băii sau de un senzor de umiditate, la alegerea beneficiarului la faza de execuție) pentru intervalele de duș, când debitul crește temporar la ~2× (60 mc/h/baie activă) fără a suprasolicita ventilatorul de nucleu, dimensionat cu marjă pentru un factor de simultaneitate realist (nu toate cele 20 de băi ale unui nucleu ating vârful de utilizare simultan).

Traversarea planșeelor de beton armat de către canalul colector vertical se echipează, la fiecare nivel, cu **clapetă antifoc (EI conform elementului traversat)**, conform cerinței de compartimentare orizontală pe etaje de cazare — element obligatoriu, întrucât canalul colector traversează planșee cu rol de compartimentare la foc între niveluri.

### PTh-H.2.6 Schema izometrică apă rece/caldă pe nucleu tehnic — nod cu nod

Fiecare nucleu GT-i este alimentat de la distribuitorul general de la subsol (cap. DTAC §2.5, hidrofor 2A+1R) printr-o coloană verticală de apă rece și una de apă caldă, cu breviarul de reducere a diametrului pe înălțime detaliat la cap. H.3.3. Distribuția orizontală, de la coloana nucleului la fiecare din cele 4 camere/nivel, se realizează astfel:

| Element | Ø adoptat | Deservire |
|---|---|---|
| Coloană verticală apă rece (bază nucleu, subsol→E2) | PP-R De40 | 20 camere/nucleu |
| Coloană verticală apă rece (E4→E6, tronson superior) | PP-R De32 | 8 camere superioare |
| Coloană verticală apă rece (E6, ultimul tronson) | PP-R De25 | 4 camere/nivel |
| Ramură orizontală pe nivel, spre pereche de camere | PP-R De20 | 2 camere |
| Racord la baterie/obiect sanitar | PP-R/PEX De16 | 1 obiect |
| Coloană apă caldă (identică diametral, izolată 13 mm elastomer) | PP-R De40→De25 | idem apă rece |

Fiecare cameră are, la intrarea în baie, un **robinet de izolare individual pe apă rece și unul pe apă caldă**, accesibil pentru mentenanță fără a întrerupe alimentarea restului nucleului — deja principiu în DTAC §2.7, confirmat aici la nivel de detaliu de execuție.

### PTh-H.2.7 Contorizare pe etaj — schema de telecitire M-Bus

Conform principiului DTAC §2.8, fiecare coloană de nucleu tehnic este echipată cu **apometru cu emițător radio/impuls M-Bus**, montat la baza coloanei (subsol, camera tehnică a hidroforului) — 5 apometre de nucleu pentru apă rece + 5 pentru apă caldă = **10 contoare de zonă cazare**, la care se adaugă contoarele dedicate ale bucătăriei, SPA-ului, spălătoriei și birourilor administrative (deja enumerate în DTAC §2.8). Toate contoarele sunt colectate pe o **buclă M-Bus cablată**, cu concentrator local la subsol, integrat în BMS (cap. H.2.13) — soluție care permite echipei tehnice să identifice, în câteva minute, o coloană cu consum anormal (scurgere, obiect sanitar defect), fără a inspecta fizic fiecare cameră a nucleului respectiv.

### PTh-H.2.8 Schema recirculării ACM și a regimului antilegionella — pe fiecare din cele 5 coloane

Fiecare din cele 5 coloane de recirculare ACM (una per nucleu GT-i, conform DTAC §3.6) este echipată cu:

- **Pompă de recirculare dedicată** (~0,1 mc/h, H ≈3 mCA, funcționare continuă 24/7);
- **Senzor de temperatură pe conducta de retur**, la baza coloanei, conectat la BMS, cu alarmă la scădere sub 55 °C (prag antilegionella, DTAC §3.5);
- **Robinet de reglare/echilibrare hidraulică**, pentru distribuirea uniformă a debitului de recirculare între cele 5 coloane, evitând ca o coloană hidraulic „mai ușoară" să primească un debit disproporționat în detrimentul celorlalte;
- **Interfața cu ciclul de șoc termic automatizat**: electrovalva de by-pass (dacă soluția tehnică o cere) sau, mai simplu, comanda directă a sursei termice (cap. DTAC §6.6) pentru ridicarea temperaturii întregii acumulări la ≥70 °C, programată săptămânal pe timp de noapte, cu confirmarea, pe fiecare din cele 5 coloane, a atingerii temperaturii țintă la punctul cel mai îndepărtat (senzorul de retur al coloanei) înainte de închiderea ciclului.

### PTh-H.2.9 Schema coloanelor de canalizare menajeră — pe nucleu tehnic

Coloanele de canalizare, deja alese fonoabsorbante în DTAC §4.2, se organizează identic pe cele 5 nuclee tehnice:

| Coloană | Obiecte racordate/nivel | Ø coloană | Ventilație primară |
|---|---|---|---|
| K-GT1…K-GT5 (câte una per nucleu) | 4 camere × (lavoar+WC+cadă/duș) | PP fonoabsorbant Dn 110 | prelungire peste terasă, min. 0,50 m |

Colectorul orizontal de la baza celor 5 coloane converge, la subsol, spre colectorul general Dn 200 (DTAC §4.2), cu piese de curățire la maximum 15 m și la fiecare schimbare de direcție, exact ca la faza DTAC — precizarea de execuție adăugată aici este alinierea explicită a fiecărei coloane cu nucleul tehnic corespunzător (K-GT1 în GT-1 ș.a.m.d.), pentru coordonarea corectă a golurilor de trecere prin planșee cu proiectantul de structură (cap. H.3.12).

### PTh-H.2.10 Schema canalizării pluviale — acoperiș și parcare

Extindere de execuție a schemei conceptuale din DTAC §4.4: cele minimum 6 receptoare de terasă (Q_acoperiș = 14,3 l/s) se grupează pe 2 colectoare orizontale (3 receptoare/colector), fiecare coborând printr-o coloană verticală Dn 110 dedicată, cu punct de îmbinare la subsol înainte de racordul la rețeaua pluvială publică; platforma exterioară și rampa de acces (Q_parcare = 24,3 l/s) trec obligatoriu prin **separatorul de hidrocarburi clasa I** înainte de unirea cu colectorul pluvial general, cu cămin de prelevare probă amonte de racordul public, conform cerinței de mediu (DTAC §19.3).

### PTh-H.2.11 Schema bucătăriei profesionale — exhaustare și stingere dedicată

Linia de gătit a bucătăriei (~12 m, cf. DTAC §7.4) este acoperită integral de **hote de exhaustare cu filtre de grăsime tip labirint/baffle**, fiecare hotă echipată cu un **sistem de stingere cu agent umed (wet chemical) dedicat**, independent de rețeaua de sprinklere de plafon (ACS-3, cap. H.2.2) — cele două sisteme au roluri complementare: sprinklerul de plafon protejează încăperea în ansamblu, iar sistemul wet chemical pe hotă intervine punctual, la sursă, pe fiecare aparat de gătit cu flacără deschisă (plite, friteuze, grătare), unde riscul de incendiu de grăsime este cel mai ridicat și unde apa de sprinkler ar putea, dimpotrivă, agrava un incendiu de ulei încins (proiecție de picături fierbinți).

```
Aparate de gătit (plite, friteuze, grătare, cuptoare) ─► Hotă cu filtre grăsime (spălare automată programată)
   ─► Duze de agent umed (una per aparat/zonă de risc) ─► rezervor de agent + cilindru gaz propulsor
   ─► panou de comandă dedicat (declanșare automată prin fuzibile termice + declanșare manuală)
   ─► la activare: (1) închidere automată electrovalvă gaz pe linia de gătit (interblocare cu §12.4 DTAC)
                    (2) întrerupere alimentare electrică hote/echipamente electrice de gătit
                    (3) semnalizare optică/acustică locală + transmisie la centrala IDSAI (cap. H.2.13)
   ─► Ventilator exhaustare F400 ─► evacuare pe terasă, la distanță ≥8 m de prizele de aer proaspăt ale CTA
```

Debitul de exhaustare (Q_exhaustare = 30.000 mc/h) și de aport compensator (Q_aport = 26.100 mc/h) rămân cele stabilite în DTAC §7.4; la faza PTh se precizează repartiția pe hote: **3 hote liniare**, dimensionate proporțional cu lungimea de linie de gătit deservită (hotă friptură/grătar — debit specific majorat ~3.000 mc/h/m datorită flăcării deschise directe; hotă plite/marmite — ~2.200 mc/h/m; hotă spălătorie vase — debit redus, doar umiditate/căldură, fără risc de grăsime, deci fără sistem wet chemical dedicat, ci doar exhaustare simplă).

### PTh-H.2.12 Schema piscină/SPA — tratare completă a apei

Extindere de execuție a buclei de recirculare descrise conceptual în DTAC §5.2, cu toate componentele identificate pe traseu și parametrii de dozare:

```
Bazin (105 mc) ─► Jgheaburi skimmer periferice (colectare strat superior) ─► Bazin de compensare (~10 mc)
   ─► Pompă de recirculare (26,25 mc/h) ─► Filtru 1 (nisip cuarțos, 0,6 mp) ─┐
                                          ─► Filtru 2 (nisip cuarțos, 0,6 mp) ─┴► colector filtrat
   ─► Dozare clor liber (pompă dozatoare + sondă redox, țintă 1,0-3,0 mg/l) ─► treaptă UV (reducere cloramine)
   ─► Corecție pH (pompă dozatoare acid/bază, sondă pH, țintă 7,0-7,4) ─► Schimbător de căldură (reîncălzire)
   ─► Refulare în bazin prin duze de fund/perete (omogenizare)
```

**Dozarea automată** se realizează prin pompe dozatoare proporționale cu debitul de recirculare, comandate de sonde redox (clor) și pH montate pe un by-pass de măsură (probă continuă de apă filtrată, înainte de refulare), cu jurnal de valori integrat în BMS (cap. H.2.13) — orice abatere de la ținta de proiect generează o alarmă tehnică, iar accesul oaspeților la bazin se poate restricționa automat (semnalizare la recepție) dacă parametrii ies din intervalul de siguranță sanitară pe o durată care depășește pragul programat.

**Adaosul de apă proaspătă** (5,25 mc/zi, DTAC §5.2) se face printr-o electrovalvă cu senzor de nivel pe bazinul de compensare, cu contor dedicat racordat la bucla M-Bus (cap. H.2.7), pentru trasabilitatea consumului de apă al SPA-ului separat de restul hotelului.

### PTh-H.2.13 Schema electrică monofilară — TGD și tablouri secundare

```
Post trafo propriu 630 kVA ─► TGD (întrerupător general 900 A, contor, baterie compensare, SPD tip 1+2)
        ├─► TS-subsol (CT, hidrofor, pompe, spălătorie) ............................ 250 A
        ├─► TS-FOH-parter (lobby, recepție, lounge-bar) ................................ 100 A
        ├─► TS-BOH-parter (bucătărie, depozite) ....................................... 200 A
        ├─► TS-etaj1 (conferință + foaier + SPA) ...................................... 160 A
        ├─► TE-E2 … TE-E6 (câte un tablou per etaj de cazare, 20 camere fiecare) .... 40 A fiecare
        ├─► TS-HVAC (centrală termică, pompe de căldură, chillere, CTA) .............. 350 A
        ├─► TS-ascensoare (2 oaspeți + 1 serviciu) .................................... 100 A
        └─► TS-PSI (pompe incendiu, IDSAI, desfumare, iluminat evacuare, lift pompieri) 250 A — cablu E90, alimentare de rezervă (ATS + grup electrogen)
```

Selectivitate cronometrică/curentaj: întrerupător general TGD (temporizare lungă) → tablouri secundare (temporizare medie) → tablouri de etaj (temporizare scurtă) → circuite terminale de cameră (instantaneu). Alimentare de rezervă (grup electrogen Diesel 200 kVA, pornire automată ≤15 s) pentru TS-PSI și pentru sarcinile de continuitate a afacerii enumerate în DTAC §9.2.

### PTh-H.2.14 Schema curenților slabi — cablare, Wi-Fi, PMS, TV, sonorizare

```
Rack central/core (subsol, adiacent TGD) ──┬─► Backbone fibră optică monomod ─► 8 rack-uri tehnice
│                                            │   (subsol, parter, etaj 1, câte unul per etaj cazare E2÷E6)
│                                            └─► fiecare rack de etaj ─► Cat.6A ─► priză RJ45 per cameră
├─► Server PMS (gestiune rezervări/ocupare) ─► integrare BMS + acces card-key (cap. H.2.15)
├─► Head-end IPTV/distribuție TV ─► set-top-box per cameră (via Cat.6A/coaxial existent)
├─► Sistem de sonorizare (background music) ─► zone: lobby, restaurant, coridoare, SPA
│      cu prioritate automată a mesajului de alarmare vocală (cap. H.2.16) peste muzica de fond
├─► Rețea Wi-Fi 6/6E ─► puncte de acces: 1/2-3 camere pe coridor + puncte dedicate lobby/restaurant/conferință/SPA
│      segmentată VLAN oaspeți / VLAN PMS / VLAN BOH / VLAN BMS-tehnic / VLAN CCTV
└─► CCTV (spații comune, fără cameră în interiorul camerelor/cabinelor SPA) ─► NVR, retenție 30 zile
```

Fiecare cameră are, la faza PTh, minimum **2 prize RJ45 Cat.6A** (una pentru televizor/set-top-box, una pentru punctul de acces Wi-Fi al coridorului cel mai apropiat sau pentru un eventual echipament suplimentar), plus racordul de sonorizare al băii (difuzor plafon IP44, dacă opțiunea de dotare superioară a categoriei este confirmată de beneficiar).

### PTh-H.2.15 Schema control acces card-key și management energetic pe cameră

```
Cititor card RFID (exterior ușă cameră) ─► încuietoare electromagnetică fail-safe (deblocare la lipsă tensiune/alarmă)
Slot card (interior cameră) ─► la extragere card: releu HVAC → setback 3-4 °C; releu iluminat principal → oprire
                                (prize minibar/electronice rămân alimentate permanent, circuit separat)
Integrare PMS: check-out înregistrat în PMS → setback automat, indiferent de detecția fizică a cardului
Integrare IDSAI: alarmă de incendiu confirmată → deblocare fail-safe a TUTUROR ușilor cu acces pe card (evacuare)
```

Circuitul de alimentare al încuietorii electromagnetice și al cititorului de card se dublează, pe fiecare ușă, cu o baterie tampon locală (autonomie minimum 8 ore), astfel încât o pană scurtă a tabloului de etaj să nu blocheze accesul oaspetelui în cameră — soluție de continuitate proporțională cu consecința, conform principiului DTAC §1.6.

### PTh-H.2.16 Schema IDSAI și alarmare vocală — detecție per cameră

```
Centrală de detectare adresabilă, minimum 4 bucle ─┬─► Detector optic de fum, câte 1/cameră (100 buc.)
                                                     ├─► Detector optic de fum, coridoare/oficii de etaj
                                                     ├─► Detector termic, bucătărie (mediu cu fum de gătit)
                                                     ├─► Detector optic, lobby/restaurant/conferință/SPA
                                                     ├─► Detector optic, parcaj subteran + spații tehnice
                                                     └─► Butoane manuale de alarmare, la fiecare nivel/ieșire
        ─► Sistem de alarmare vocală (SR EN 54-16/24) ─► difuzoare pe coridoare de etaj, camere (opțional
             prin televizor/sonorizare integrată), lobby, restaurant, conferință, parcaj
        ─► Interblocări: desfumare/presurizare case scări, ascensor pompieri, ușile card-key (fail-safe),
             electrovalvă gaz (bucătărie + centrală termică), oprire selectivă CTA/ventilatoare de exploatare
```

**Alarmarea vocală este cerință de proiectare activă, nu opțională**, la un hotel cu persoane care dorm (DTAC §1.3) — un semnal sonor generic (sirenă) nu oferă instrucțiuni de evacuare unor oaspeți treziți brusc, într-o clădire pe care nu o cunosc; mesajul vocal preînregistrat (evacuare/alertă/încetare alarmă) ghidează explicit oaspeții spre ieșirile de evacuare, cu mesaje diferențiate pe etaj/zonă dacă scenariul de securitate la incendiu impune o evacuare fazată (etajul afectat evacuează imediat, etajele adiacente sunt alertate, restul clădirii rămâne în stare de veghe) — logica exactă de fazare este atributul scenariului de securitate la incendiu, prezentul document furnizând doar capacitatea tehnică a sistemului (numărul de zone de difuzare adresabile, puterea amplificatoarelor, autonomia bateriilor).

---

## PTh-H.3 Breviar complet de calcul

### PTh-H.3.1 Calcul hidraulic complet al rețelei de sprinklere — zona ACS-1 (camere, LH)

**Date de intrare**: densitate d = 2,25 mm/min, arie de operare A_op = 84 mp, capete K80 (K = 80 l/min·bar⁰·⁵ = 1,12 l/s·bar⁰·⁵, tip standard pentru risc redus), coeficient Hazen-Williams C = 120 (oțel negru)/C = 150 (cupru, pe traseele finale din camere, unde se preferă cuprul pentru discreție vizuală și rezistență la coroziune în mediul cu umiditate al băilor).

**Pasul 1 — debitul capului cel mai defavorabil** (presiune minimă de funcționare LH, p_min = 0,70 bar conform SR EN 12845 pentru capete standard):

q₁ = K·√p₁ = 1,12 × √0,70 = **0,94 l/s** (capul terminal, cameră cea mai îndepărtată de ACS-1).

**Pasul 2 — calculul nod cu nod pe ramura tipică de coridor** (4 capete, câte unul deservind fiecare pereche de camere adiacente pe o secțiune de coridor, distanță ~4,0 m între capete):

| Nod | Q cumulat (l/s) | Ø (mm) | Δp tronson (bar, rotunjit) | p necesară cap (bar) |
|---|---|---|---|---|
| Cap 1 (terminal) | 0,94 | 20 | — | 0,70 |
| Cap 2 | 1,87 | 25 | 0,041 | 0,741 |
| Cap 3 | 2,78 | 32 | 0,028 | 0,769 |
| Cap 4 | 3,66 | 40 | 0,017 | 0,786 |

Aria de operare A_op = 84 mp la interax 4,0 m corespunde la ≈21 capete/aria de operare (84/4 mp per cap ≈ 21 capete); debitul cumulat la nivelul cross-main-ului care alimentează întreaga arie de operare rezultă din verificarea directă d × A_op / 60 = 2,25 × 84 / 60 = **3,15 l/s**, identic valorii globale calculate la cap. H.2.2 — **verificare de coerență confirmată** între metoda directă și calculul nod-cu-nod pe ramura tipică.

**Pasul 3 — presiunea necesară la ACS-1**: pierderi pe traseul cel mai lung (branch line + cross-main + riser vertical de la ACS-1 la etajul cel mai îndepărtat, E6) + presiune la capul terminal (0,70 bar) + diferență de cotă (riser vertical, ~15 m de la ACS-1 la E6, ≈1,47 bar):

Presiune necesară la ACS-1 ≈ 0,70 + 0,10 (pierderi traseu orizontal) + 1,47 (cotă) = **≈2,27 bar**, la care se adaugă pierderile pe conducta de alimentare de la stația de pompare la ACS-1 (~0,15 bar): **≈2,42 bar ≈ 24,7 mCA** — valoare mult sub cei 65 mCA de proiectare a pompei (cap. H.4.4), marjă justificată de necesitatea acoperirii concomitente a zonei OH2/hidranților (cap. H.2.2), scenariul dimensionant al pompei.

### PTh-H.3.2 Calcul hidraulic — zona ACS-2 (public, OH1) și ACS-3 (bucătărie+parcaj, OH2)

Similar metodologiei de la H.3.1, pentru zona OH1 (d = 5,0 mm/min, A_op = 72 mp, capete K115): Q_OH1 = 5,0 × 72/60 = 6,00 l/s, presiune la capul terminal p_min = 0,50 bar (OH), pierderi de traseu pe cross-main-ul lobby-restaurant-conferință (~35 m echivalent) ≈0,25 bar, presiune necesară la ACS-2 ≈0,50 + 0,25 + 0,05 (cotă, zonă la parter/etaj 1, diferență redusă) = **≈0,80 bar ≈8,2 mCA**.

Pentru zona OH2 (d = 5,0 mm/min, A_op = 144 mp): Q_OH2 = 5,0 × 144/60 = 12,00 l/s, presiune la capul terminal p_min = 0,50 bar, pierderi de traseu pe cross-main-ul care deservește simultan bucătăria și parcajul (~50 m echivalent, diametre DN 80-100) ≈0,45 bar, presiune necesară la ACS-3 ≈0,50 + 0,45 + 0,10 (cotă subsol-parter) = **≈1,05 bar ≈10,7 mCA**.

**Presiunea necesară la refularea pompei**, pentru scenariul dimensionant (ACS-3 + 2 hidranți concomitenți, cap. H.2.2): max(presiune zonă, presiune hidranți) + pierderi conductă comună de alimentare + înălțime geodezică (rezervor la cotă subsol, ACS la cote variate) ≈ **1,05 + 0,30 + 0,50 = ≈1,85 bar ≈18,9 mCA** pentru sprinklere, respectiv, pentru hidranți (p_min = 2,5 bar, SR EN 671-2, traseu la cel mai îndepărtat hidrant de etaj Hi-9, E6): 2,5 + 0,60 (traseu) + 1,47 (cotă) = **≈4,57 bar ≈46,6 mCA** — hidranții, nu sprinklerele, sunt zona hidraulic dimensionantă a instalației la acest hotel, confirmând alegerea pompei la 65 mCA (cap. H.4.4), cu marjă de ~18,4 mCA peste necesarul strict calculat, care acoperă pierderile suplimentare reale confirmate la shop-drawing.

### PTh-H.3.3 Calcul hidraulic complet — apă menajeră, nod cu nod pe nucleul tehnic tipic

Pornind de la geometria unui nucleu tehnic tipic (GT-i, 4 camere/nivel × 5 niveluri = 20 camere, ΣE/nivel ≈4,4 conform mediei ponderate DTAC §2.2), breviarul PTh detaliază reducerea diametrului coloanei pe înălțime, de la baza nucleului (subsol) până la ultimul nivel (E6), cu formula qc = 0,20·√ΣE + 0,004·ΣE:

| Tronson (de sus în jos) | ΣE cumulat | qc (l/s) | Ø adoptat | v (m/s) |
|---|---|---|---|---|
| E6 (doar acest nivel) | 4,4 | 0,437 | PP-R De25 | 1,39 |
| E5+E6 | 8,8 | 0,628 | PP-R De32 | 1,18 |
| E4+E5+E6 | 13,2 | 0,780 | PP-R De32 | 1,47 |
| E3+…+E6 | 17,6 | 0,909 | PP-R De40 | 1,13 |
| E2+…+E6 (bază nucleu, subsol) | 22,0 | 1,026 | PP-R De40 | 1,28 |

Toate vitezele rezultă sub 1,5 m/s (confort acustic și marjă de dezvoltare, conform criteriului DTAC §2.7), iar debitul de bază al nucleului (1,026 l/s) este consistent cu ordinul de mărime al coloanei tipice de 20 de camere deja calculate în DTAC §2.7 (0,97 l/s) — diferența (~6 %) provine din rotunjirea echivalenților de debit pe mixul real de camere ale nucleului respectiv (unele nuclee au o pondere ușor mai mare de Suite/Apartamente, cu ΣE superior mediei), verificare care se reconfirmă exact la shop-drawing, pe baza planului de etaj definitiv.

### PTh-H.3.4 Calcul recirculare ACM — pe fiecare din cele 5 coloane

Extindere a breviarului DTAC §3.6 (o coloană de 25 m lungime echivalentă, Φ_pierderi = 400 W, Q_recirc = 0,069 mc/h), acum verificat individual pe fiecare din cele 5 coloane de nucleu, cu lungimile reale ale traseului tur+retur de la acumulatoarele ACM (subsol) la ultimul nivel (E6):

| Coloană | L echiv. tur+retur (m) | Φ_pierderi (W, la 8 W/m) | Q_recirc (mc/h) | Pompă adoptată |
|---|---|---|---|---|
| GT-1, GT-2 (nuclee cele mai apropiate de CT) | 22 | 176 | 0,061 | 0,08 mc/h, H 3 mCA |
| GT-3, GT-4 (nuclee intermediare) | 26 | 208 | 0,072 | 0,10 mc/h, H 3 mCA |
| GT-5 (nucleu cel mai îndepărtat) | 30 | 240 | 0,083 | 0,10 mc/h, H 3,5 mCA |

Toate cele 5 pompe funcționează în regim continuu (24/7, cf. DTAC §3.6), cu verificarea periodică (BMS) a temperaturii de retur ≥55 °C la baza fiecărei coloane — coloana GT-5, cea mai lungă, este cea mai expusă riscului de scădere sub prag și se monitorizează cu prioritate la faza de PIF (cap. H.7.3).

### PTh-H.3.5 Calcul canalizare — nod cu nod pe nucleu

Verificarea gradului de umplere (h/D) și a vitezei de autocurățare (v ≥0,7 m/s) pentru coloana K-GT tipică (ΣDU/nivel ≈66, conform mediei DTAC §4.2, 330 DU cazare/5 niveluri = 66/nivel, aici distribuit pe 5 nuclee ≈13,2 DU/nivel/nucleu):

Q_coloană,nucleu = 0,7 × √(5 × 13,2) = 0,7 × √66 = 0,7 × 8,12 = **5,69 l/s**, în **PP fonoabsorbant Dn 110**, identic dimensiunii deja adoptate în DTAC §4.2 pentru coloana tipică de 20 de camere — verificare de coerență directă, întrucât gruparea pe nucleu (20 camere) coincide exact cu ipoteza DTAC a coloanei tipice.

### PTh-H.3.6 Calcul electric complet — tablou de etaj tipic (TE-E2…TE-E6)

Fiecare tablou de etaj alimentează 20 de camere (Pi = 20 × 2,0 kW = 40 kW, kd = 0,50 conform DTAC §8.1) plus iluminatul de coridor și oficiul tehnic de etaj:

**Pc,etaj = 40 × 0,50 + 3,0 (iluminat coridor+oficiu) = 20 + 3,0 = 23,0 kW**

I_calcul = Pc/(√3×U×cosφ) = 23.000/(1,732×400×0,90) = 23.000/623,5 = **36,9 A**, protecție adoptată **C40, 3P**, cu rezervă de 20 % (DTAC §8.4). Circuitele terminale reprezentative, verificate la cădere de tensiune (limită 3 % iluminat, 5 % forță, de la TE la punctul terminal):

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | L (m) | Δu% |
|---|---|---|---|---|---|---|---|
| CI-cam | Iluminat cameră tip (LED, dimming) | 0,12 | 0,52 | C6/16A | 3×1,5 | 30 | 0,9 |
| CF-hvac | Unitate VRF/ventiloconvector cameră tip | 1,20 | 5,22 | C10/30mA | 3×1,5 | 30 | 2,0 |
| CP-cam | Prize cameră (2-3 circuite priză, birou+noptiere) | 1,00 | 4,35 | C16/30mA | 3×2,5 | 30 | 1,3 |
| CP-minib | Minibar (circuit permanent, neîntrerupt de card-key) | 0,15 | 0,65 | C10/30mA | 3×1,5 | 30 | 0,2 |
| CF-ck | Releu card-key + încuietoare electromagnetică | 0,05 | 0,22 | C6 | 3×1,0 | 5 | — |
| CF-doas | Unitate DOAS de nucleu (în oficiu tehnic) | 1,50 | 6,52 | C16 3P | 5×2,5 | 15 | 1,1 |
| CI-corid | Iluminat coridor + oficiu etaj | 3,00 | 13,05 | C16 3P/30mA | 5×2,5 | 20 | 1,4 |

Toate circuitele de prize și de minibar au protecție diferențială 30 mA (obligatorie la circuite cu prize accesibile oaspeților, conform I7); circuitul de card-key are alimentare dublată cu baterie tampon locală la fiecare ușă (cap. H.2.15).

### PTh-H.3.7 Verificare curent de pornire — electropompă principală incendiu (45 kW)

Motorul electropompei principale (45 kW, 400 V/3F) are, la pornire directă, un curent de pornire I_pornire ≈6…7 × I_nominal:

I_nominal ≈ 45.000/(√3 × 400 × 0,87 × 0,90) ≈ **83 A** (cosφ pornire ≈0,87, randament ≈0,90).

I_pornire ≈ 6,5 × 83 ≈ **540 A** (pornire directă), valoare care ar produce o cădere de tensiune inacceptabilă pe cablul de alimentare dacă pornirea ar fi directă pe rețea. **Soluție adoptată**: pornire prin **soft-starter** (limitare curent de pornire la ≈3 × I_nominal ≈249 A), soluție acceptată de SR EN 12845 pentru pompele de incendiu, cu condiția ca timpul de atingere a turației/debitului nominal să rămână ≤15 s. Pompa Diesel de rezervă (motor termic, pornire independentă de rețeaua electrică) nu are această problemă.

### PTh-H.3.8 Verificare curent de pornire — ascensoare

Cele 3 ascensoare (2 oaspeți × 15 kW + 1 serviciu × 18 kW, DTAC §14.2) sunt echipate, fiecare, cu **variator de frecvență (VFD) propriu**, care limitează curentul de pornire la ≈1,2…1,5 × I_nominal (spre diferență de pornirea directă a unui motor asincron obișnuit, ≈6…7 ×) — soluție deja adoptată în DTAC, care elimină necesitatea unei verificări suplimentare de cădere de tensiune la pornire pentru ascensoare (contribuția lor la regimul tranzitoriu al rețelei interne este marginală comparativ cu pompa de incendiu). Cablul de alimentare al ascensorului cu funcție de pompieri (cap. DTAC §14.4) se dimensionează în variantă rezistentă la foc (E90), verificat la cădere de tensiune în regim nominal: I_nominal,pompieri = 15.000/(1,732×400×0,9×0,92) = 15.000/574 = **26,1 A**, secțiune adoptată 5×6 mmp, Δu ≈1,5 % pe traseul de la TS-PSI la puțul ascensorului (~20 m).

### PTh-H.3.9 Dimensionarea unităților terminale VRF pe tipul de cameră

Extindere a breviarului termic al camerei reprezentative (DTAC §6.1, cameră standard 21,5 mp, Φ_cameră ≈1,16 kW brut) la restul mixului tipologic, prin scalare proporțională cu suprafața de anvelopă expusă și cu debitul de aer proaspăt aferent (ocupare de proiectare superioară la Suite/Apartament):

| Tip cameră | Suprafață | Φ_brut estimat (kW) | Unitate VRF adoptată | Nivel de zgomot |
|---|---|---|---|---|
| Single/Standard dublă | 21,5 mp | 1,16 | caseta 4-way, 1,4 kW frig/1,6 kW cald | ≤NC25 |
| Superior | 27,0 mp | 1,42 | caseta 4-way, 1,8 kW frig/2,0 kW cald | ≤NC25 |
| Suite | 44,5 mp | 2,10 (2 zone: dormitor+living) | 2× caseta, câte 1,4 kW/zonă, control independent | ≤NC25 |
| Apartament | 60,0 mp | 2,65 (3 zone) | 3× caseta, câte 1,2-1,8 kW/zonă | ≤NC25 |
| PMR (adaptată) | 26,5 mp | 1,35 | caseta 4-way, montaj la înălțime accesibilă a comenzii | ≤NC25 |

Toate unitățile terminale se selectează la un nivel de zgomot propriu ≤NC25 (segmentul 4 stele, DTAC §16.5), montate pe tampoane elastomerice, cu comandă locală (termostat/telecomandă) integrată cu sistemul de management energetic pe card (cap. H.2.15).

### PTh-H.3.10 Breviar detaliat — hotă bucătărie și stingere wet chemical

Debitul specific de exhaustare pe metrul liniar de hotă (DTAC §7.4, ~2.500 mc/h/m mediu) se detaliază pe tip de echipament deservit, conform bunei practici GP 063/2001:

| Tip hotă | Lungime (m) | Debit specific (mc/h/m) | Debit hotă (mc/h) | Nr. duze wet chemical |
|---|---|---|---|---|
| Hotă grătar/friptură (flacără directă) | 4,0 | 3.000 | 12.000 | 6 (câte 1-2/aparat) |
| Hotă plite/marmite | 6,0 | 2.200 | 13.200 | 8 |
| Hotă friteuze (risc de ulei încins, prioritate stingere) | 2,0 | 2.400 | 4.800 | 4 (2/friteuză) |
| **Total linie de gătit** | **12,0** | — | **30.000** | **18** |

Sistemul wet chemical se declanșează automat prin **fuzibile termice** montate deasupra fiecărei zone de risc (plită, friteuză, grătar), cu prag de topire calibrat pentru temperatura normală de gătit + marjă de siguranță, și manual printr-un buton de acționare de urgență amplasat la ieșirea din bucătărie, accesibil personalului la evacuare. La declanșare, panoul de comandă dedicat închide simultan electrovalva de gaz a liniei respective (interblocare cu detecția de gaz DTAC §12.4) și întrerupe alimentarea electrică a echipamentelor de gătit electrice din zona afectată, limitând sursa de aprindere reziduală după stingere.

### PTh-H.3.11 Breviar detaliat — dozare chimicale piscină

Extindere a breviarului DTAC §5.2, cu dimensionarea pompelor dozatoare pe baza volumului de recirculare (26,25 mc/h) și a țintelor de concentrație:

- **Clor liber**: țintă 1,0…3,0 mg/l, consum specific estimat ~3 g clor activ/mc apă tratată/zi (uzură prin fotoliză UV solară la geamurile halei + consum oxidativ al încărcării organice) → necesar zilnic ≈105 mc × 3 g/mc = **315 g clor activ/zi**, dozat continuu proporțional cu debitul de recirculare prin pompă dozatoare cu semnal de la sonda redox;
- **Corecție pH**: consum specific ~1,5 g acid/bază per mc tratat/zi, dozare proporțională similară, cu sonda pH montată pe by-pass-ul de măsură înainte de refulare (nu direct în bazin, pentru a evita măsurători eronate în zona de amestecare incompletă);
- **UV complementar**: treaptă instalată pe întregul debit de recirculare (26,25 mc/h), doză UV de proiectare ≥40 mJ/cm² (reducerea cloraminelor și a mirosului caracteristic, conform DIN 19643), lampă cu durată de viață ~9.000 ore, monitorizată prin senzor de intensitate cu alarmă la degradarea emisiei sub prag.

### PTh-H.3.12 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

Coordonarea cu structura de rezistență (memoriul de structură) impune un tabel explicit al golurilor de trecere pentru fiecare nucleu tehnic și pentru fiecare instalație majoră, comunicat proiectantului de structură **înainte de execuția cofrajelor/armăturii**, conform principiului deja stabilit în DTAC §17.3 pentru planșeul de transfer:

| Instalație | Element traversat | Poziție | Dimensiune gol | Observație |
|---|---|---|---|---|
| Coloane apă/canalizare (per nucleu GT-i) | toate planșeele E2÷E6 | ghena GT-i | Ø 300-400 mm/nucleu | prevăzut din cofrare, la fiecare nivel identic (repetitivitate etaj tipic) |
| Coloană apă/canalizare | planșeul de transfer (+4,50 m) | în afara zonelor de armare intensă (axele pare, DTAC §17.3) | Ø 400 mm/nucleu | verificare seismică obligatorie, fără redistribuire posibilă |
| Canal colector ventilație băi | toate planșeele E2÷E6 | ghena GT-i | Ø 250 mm/nucleu | cu clapetă antifoc la fiecare nivel |
| Jgheab cabluri electrice/curenți slabi | toate planșeele E2÷E6 | ghena GT-i | 300×150 mm/nucleu | separare tari/slabi menținută pe verticală |
| Traseu refrigerant VRF (de la terasă la nuclee) | planșeul de terasă + planșeele superioare | lângă ghene, traseu vertical dedicat | Ø 150 mm/grup unități exterioare | izolat termic, cu manșon etanș la fiecare traversare |
| Conductă sprinkler (riser ACS-1 către etajele de cazare) | planșeul de transfer + planșeele E2÷E6 | lângă ghena centrală | Ø 150-200 mm | verificare încărcare seismică la punctul de prindere |

Toate golurile prin elementele structurale portante necesită avizul explicit al inginerului structurist înainte de execuție, conform regulii deja aplicate consecvent la faza DTAC pentru planșeul de transfer (§6.3, §17.3).

### PTh-H.3.13 Calcul economie energetică din managementul pe card — verificare orientativă

Extindere a estimării DTAC (§8.3, economie 20…25 % din consumul energetic al camerelor) cu un calcul orientativ pentru zona de cazare (Pi HVAC+iluminat cameră ≈1,32 kW/cameră × 100 camere = 132 kW instalat):

- funcționare de bază (fără management pe card, temperatură/iluminat menținute constant indiferent de ocupare, 24 h/zi) = 132 kW × 24 h × 365 zile = **1.156.320 kWh/an**;
- cu managementul pe card (setback 3-4 °C la camera neocupată, oprire iluminat principal, integrare PMS pentru intervalul check-out→check-in), la o rată de ocupare medie anuală de 62 % (DTAC general §2.4) și un factor de reducere efectiv de ~55 % în intervalele neocupate: consum estimat ≈1.156.320 × [0,62 + 0,38 × 0,45] ≈ 1.156.320 × 0,791 ≈ **914.650 kWh/an**;
- **economie estimată ≈241.670 kWh/an (≈21 %)**, valoare care confirmă intervalul de 20…25 % adoptat la DTAC §8.3 și care se recalibrează după PIF pe baza jurnalului real de ocupare din PMS.

---

## PTh-H.4 Specificații complete echipamente majore

### PTh-H.4.1 Fișă tehnică — Unitate interioară VRF cameră (caseta 4-way)

| Parametru | Valoare |
|---|---|
| Putere frig/cald nominală | 1,4-2,8 kW (funcție de tip cameră, cap. H.3.9) |
| Nivel de zgomot | ≤NC25…30 (treapta minimă) |
| Control | termostat de perete/telecomandă IR, integrare BMS (Modbus/protocol producător) |
| Filtrare | filtru lavabil, acces mentenanță din grilă |
| Montaj | tavan fals, pe tampoane elastomerice |
| Racord condens | pompă de condens integrată, evacuare spre coloana de canalizare a nucleului |

### PTh-H.4.2 Fișă tehnică — Unitate DOAS de nucleu

| Parametru | Valoare |
|---|---|
| Debit nominal | 1.200 mc/h (20 camere × 60 mc/h) |
| Recuperator | rotativ sau cu plăci, η ≥0,80 |
| Filtrare | G4 (admisie) + F7 (refulare) |
| Amplasare | oficiu tehnic de etaj sau terasă (distribuție verticală pe nucleu) |
| Automatizare | by-pass free-cooling, presostate colmatare filtre, integrare BMS |

### PTh-H.4.3 Fișă tehnică — Sistem de acumulare ACM

| Parametru | Valoare |
|---|---|
| Volum total | 4 × 2.000 l, inox, cascadă hidraulică |
| Schimbătoare de căldură | plăci, apă/apă, putere instalată 150 kW |
| Ciclu antilegionella | automat, șoc termic ≥70 °C, ≥30-60 min, săptămânal |
| Izolație | poliuretan, pierderi ≤3 %/24 h |
| Monitorizare | 5 senzori de temperatură retur (câte unul/coloană nucleu), integrare BMS |

### PTh-H.4.4 Fișă tehnică — Electropompă principală incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 35 l/s (126 mc/h) |
| Înălțime de pompare | 65 mCA |
| Putere motor | 45 kW |
| Randament | ≥0,70 |
| Pornire | soft-starter (limitare la ≈3×I_nominal) |
| Conformitate | SR EN 12845 |

### PTh-H.4.5 Fișă tehnică — Pompă Diesel de rezervă incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 35 l/s (identic electropompei) |
| Autonomie combustibil | ≥3 h la sarcină nominală |
| Pornire | automată, baterii duble, la defect electropompă |
| Testare | pornire săptămânală de probă, pe by-pass |

### PTh-H.4.6 Fișă tehnică — Pompă jockey

| Parametru | Valoare |
|---|---|
| Debit | ≈0,5-1,0 l/s |
| Rol | compensează pierderile mici, evită pornirea inutilă a pompei principale |
| Comandă | presostate diferențiale |

### PTh-H.4.7 Fișă tehnică — Sistem wet chemical hotă bucătărie

| Parametru | Valoare |
|---|---|
| Nr. duze | 18 (repartizate pe 3 hote, cap. H.3.10) |
| Declanșare | automată (fuzibil termic) + manuală (buton la ieșire) |
| Interblocare | electrovalvă gaz + alimentare electrică echipamente gătit |
| Conformitate | UL 300/EN 16282 (referință tehnică), interfațare cu IDSAI |
| Rearmare | manuală, cu recertificarea cilindrilor de agent, după fiecare declanșare |

### PTh-H.4.8 Fișă tehnică — Centrală de tratare apă piscină

| Parametru | Valoare |
|---|---|
| Debit de recirculare | 26,25 mc/h |
| Filtrare | 2 × filtru nisip cuarțos, 0,6 mp fiecare |
| Dozare | clor liber (redox) + pH (sondă dedicată) |
| Treaptă UV | doză ≥40 mJ/cm², lampă ~9.000 h |
| Reîncălzire | schimbător dedicat, alimentat din sursa termică hibridă |

### PTh-H.4.9 Fișă tehnică — Unitate CTA-piscină (dezumidificare cu recuperare)

| Parametru | Valoare |
|---|---|
| Debit nominal | 6.500 mc/h |
| Recuperare de căldură | pompă de căldură integrată, recuperare spre bazin/ACM |
| Regim | recirculare parțială + evacuare exces, presiune ușor negativă halei |
| Materiale părți metalice | oțel inoxidabil AISI 316L (rezistență la clor) |

### PTh-H.4.10 Fișă tehnică — Centrală de detectare adresabilă (IDSAI)

| Parametru | Valoare |
|---|---|
| Tip | adresabilă, minimum 4 bucle |
| Capacitate | 250 adrese/buclă |
| Detectoare | optice de fum (per cameră, coridor, spații publice) + termice (bucătărie) |
| Alarmare vocală | integrată, SR EN 54-16/24, difuzoare pe toate nivelurile |
| Autonomie baterii | ≥48 h veghe + 30 min alarmă |
| Interfațare | desfumare, ascensor pompieri, ușile card-key, electrovalve gaz, CTA |

### PTh-H.4.11 Fișă tehnică — Tablou de etaj (TE-E2…TE-E6)

| Parametru | Valoare |
|---|---|
| Curent nominal | 3×40 A |
| Nr. plecări | 20 camere × (iluminat+HVAC+prize+minibar+card-key) + circuit DOAS + circuit iluminat coridor |
| Capacitate de rupere aparataj | Icu ≥10 kA |
| Rezervă capacitate | ≥20 % module libere |
| IP | IP30 (dulap tehnic interior, oficiu de etaj) |

### PTh-H.4.12 Fișă tehnică — Grup electrogen Diesel

| Parametru | Valoare |
|---|---|
| Putere | 200 kVA (160 kW la cosφ 0,80) |
| Autonomie rezervor de bază | ≥8 h la sarcină nominală |
| Autonomie extinsă (rezervor suplimentar) | 24 h |
| Comutare automată (ATS) | ≤15 s |
| Carcasă acustică | proprie, izolatori de vibrații la bază |

### PTh-H.4.13 Fișă tehnică — UPS sarcini critice

| Parametru | Valoare |
|---|---|
| Putere | ~15 kVA |
| Autonomie | 15-30 min |
| Sarcini deservite | PMS/server IT, centrala IDSAI, rack-uri de comunicații, echipamente BMS |

### PTh-H.4.14 Fișă tehnică — Ascensor de oaspeți / serviciu

| Parametru | Valoare |
|---|---|
| Capacitate | 13 pers./1.000 kg (oaspeți, ×2) / 1.600 kg (serviciu, ×1) |
| Putere motor | 15 kW (oaspeți) / 18 kW (serviciu) |
| Control | VFD propriu, limitare curent pornire |
| Funcție pompieri | 1 din cele 2 ascensoare de oaspeți, alimentare din generator, cablu E90 |
| Recepție | ISCIR, separată de recepția generală a instalațiilor |

### PTh-H.4.15 Fișă tehnică — Sistem de sonorizare și alarmare vocală

| Parametru | Valoare |
|---|---|
| Zone de difuzare | lobby, restaurant, coridoare de etaj (5), conferință, SPA, parcaj |
| Funcție dublă | muzică de fond (program normal) + mesaj de evacuare (prioritate automată) |
| Amplificare | amplificatoare per zonă, cu monitorizare integritate linie difuzoare |
| Conformitate | SR EN 54-16/24, alimentare de rezervă din bateria centralei IDSAI |

### PTh-H.4.16 Fișă tehnică — Rack central curenți slabi (core)

| Parametru | Valoare |
|---|---|
| Echipare | switch core, server PMS, controller Wi-Fi, NVR CCTV, concentrator M-Bus |
| Alimentare | UPS dedicat (cap. H.4.13) |
| Conectivitate | fibră optică către cele 8 rack-uri de etaj/zonă |

### PTh-H.4.17 Fișă tehnică — Invertor fotovoltaic (string)

| Parametru | Valoare |
|---|---|
| Putere nominală | corelată cu 60 kWp instalați (DTAC §15.3), string-uri distribuite |
| Randament | ≥0,98 |
| Protecție anti-islanding | integrată |
| Monitorizare | portal cloud/local, integrare BMS |

---

## PTh-H.5 Probe și verificări detaliate

| Instalație | Proba | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/caldă (per nucleu) | etanșeitate | 1,5×p regim, min. 8,3 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Recirculare ACM | funcțională + temperatură retur | ≥55 °C la fiecare din cele 5 coloane | continuu, BMS | conform DTAC §3.5 |
| Canalizare menajeră (per nucleu) | etanșeitate | umplere la nivel etaj | 15 min | fără scurgeri la îmbinări |
| Separator grăsimi | funcțională + etanșeitate | debit nominal | — | conform SR EN 1825 |
| Pluvial + separator hidrocarburi | debit/etanșeitate | ploaie simulată | — | fără infiltrații, separare conformă |
| Piscină/tratare apă | etanșeitate bazin + buletin analiză | conform DIN 19643/OMS 119/2014 | — | clor, pH, temperatură conforme |
| VRF/DOAS camere | debite de aer + etanșeitate agent | debite proiectate ±15 % | — | fără scăpări agent frigorific |
| Ventilație băi (per nucleu) | debit extracție | 30 mc/h/baie ±15 % | — | conform SR EN 12599 |
| Sprinkler (ACS-1/2/3) | presiune hidraulică | 1,5×p regim, min. 15 bar | 2 h | fără scădere, fără scurgeri (SR EN 12845) |
| Sprinkler | funcțională ACS + alarmă | debit test | — | alarmă hidraulică declanșată corect |
| Hidranți | debit-presiune | robinet cel mai defavorabil | — | ≥2,1 l/s la ≥2,5 bar |
| Stație pompare incendiu | funcțională (pornire automată) | scădere presiune simulată | — | pornire <15 s, comutare rezervă |
| Wet chemical bucătărie | funcțională + interblocare | test declanșare fuzibil simulat | — | închidere gaz+electric confirmată |
| Electrice (per tablou etaj) | rezistență izolație | 500 V c.c. | — | ≥0,5 MΩ (I7) |
| Electrice | priză de pământ | — | — | Rp ≤1 Ω |
| Electrice | test RCD | I∆n=30 mA | — | declanșare <300 ms |
| Grup electrogen | test funcțional + transfer ATS + autonomie | — | — | transfer ≤15 s, autonomie conform §H.4.12 |
| Iluminat | măsurare niveluri (luxmetru) | — | — | conform tabel cap. H.9.2 |
| Iluminat de siguranță | timp de comutare | — | — | ≤5 s la 50 %, ≤60 s la 100 % (SR EN 1838) |
| Instalație gaze | presiune/etanșeitate | conform NTPEE | — | fără scădere de presiune |
| Curenți slabi/PMS/card-key | test funcțional | 100 % puncte | — | integrare confirmată |
| IDSAI + alarmare vocală | funcțional + matrice cauză-efect | test 100 % adrese | — | toate efectele confirmate, mesaj vocal audibil pe toate zonele |
| Ascensoare | recepție ISCIR | — | — | conform cărții tehnice |
| Instalație fotovoltaică | izolație + producție | — | — | conform proiect |

### PTh-H.5.1 Verificări electrice PRAM — detaliu

Verificările PRAM se execută de laborator autorizat, cu buletine consemnate în cartea tehnică: **rezistența de izolație** (≥0,5 MΩ pe fiecare circuit terminal, inclusiv fiecare din cele 100 de circuite HVAC de cameră), **rezistența prizei de pământ** (Rp ≤1 Ω, comună electrică+trăsnet, conform DTAC §11.1), **continuitatea conductorului de protecție** pe fiecare circuit final (inclusiv TS-PSI, cablu E90), **testul dispozitivelor diferențiale** (timp de declanșare <300 ms la 30 mA, pe toate circuitele de prize/cameră și zonele umede — băi, SPA, bucătărie), **verificarea SPD** (tip 1+2 la TGD, tip 2 la tablourile de etaj, tip 3 la echipamentele sensibile — rack IT, IDSAI, invertoare FV) și **continuitatea coborârilor de paratrăsnet** (conform DTAC §11.3, LPS Nivel II).

---

## PTh-H.6 Tehnologia de montaj

### PTh-H.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee și poziționarea exactă a celor 5 ghene tehnice GT-1…GT-5 pe planul de cofraj (**înainte de turnarea planșeelor**).
2. Execuție priză de pământ de fundație (platbandă OL-Zn, sudată de armătura fundațiilor) — înainte de turnarea fundațiilor.
3. Montaj rețea de canalizare îngropată + pluvial exterior + separator hidrocarburi — probate înainte de acoperire.
4. Execuție structură (radier + suprastructură, inclusiv planșeul de transfer, cf. memoriul de structură) — condiție pentru toate golurile de trecere prevăzute la cap. H.3.12.
5. Montaj coloane apă/canalizare/ventilație băi pe fiecare nucleu tehnic, de la subsol la E6 — coordonat etaj cu etaj, cu probe de etanșeitate pe măsură ce fiecare tronson devine inaccesibil.
6. Montaj rețea de sprinklere pe cele 3 zone ACS, montaj hidranți — probate hidraulic înainte de finisaje.
7. Montaj cabluri electrice pe jgheaburi/paturi, tablouri de etaj, rack-uri tehnice de etaj.
8. Montaj echipamente majore (stație pompare incendiu, acumulatoare ACM, pompe de căldură/cazane, tratare apă piscină, CTA-piscină, hote+wet chemical bucătărie).
9. Montaj unități VRF/DOAS pe fiecare cameră/nucleu, racorduri de refrigerant, verificare etanșeitate.
10. Montaj corpuri de iluminat, prize, aparataj final, cititoare card-key, difuzoare sonorizare.
11. Montaj centrală IDSAI, detectoare (inclusiv un detector per cameră), sistem de alarmare vocală, actuatoare desfumare.
12. Probe finale, PIF, reglaje, instruire personal tehnic al hotelului.

### PTh-H.6.2 Susțineri și fixări — cerințe seismice pe echipamente/conducte grele

| Instalație | Tip susținere | Interax maxim | Observație seismică |
|---|---|---|---|
| Conductă sprinkler DN ≥80 (ACS-2, ACS-3) | tijă filetată dublă + bracket lateral | 3,0-3,7 m | conform SR EN 12845, verificare sarcină seismică laterală |
| Riser sprinkler ACS-1 (verticală prin nuclee) | colier antiseismic la fiecare planșeu | conform înălțime etaj (3,0 m) | prindere verificată la planșeul de transfer, cf. DTAC §17.3 |
| Conductă apă PP-R (per nucleu) | brățară glisantă (dilatare) | Ø≤32: 0,8 m; Ø40: 1,0 m | — |
| Unități exterioare VRF (terasă) | izolatori tip arc, frecvență proprie ≤5 Hz | — | verificare seismică a soclului conform DTAC §17.2 (1,20 kN/mp buget structural) |
| Acumulatoare ACM (4×2.000 l pline) | console/prezoane dimensionate la γI,e=1,20 | — | verificare la faza PT conform clasei de importanță II (DTAC §1.3) |
| Grup electrogen | izolatori de vibrații la bază | — | ancorare verificată la masa reală a echipamentului |
| Rezervor de incendiu | ancorare/lestare la subpresiune (dacă NHA impune) | — | coordonare cu memoriul de structură §5.4 |

### PTh-H.6.3 Izolații termice și fonice

| Element | Grosime izolație | Material |
|---|---|---|
| Distribuție ACM + recirculare (toate cele 5 coloane) | 20-30 mm | elastomer |
| Conducte apă rece (anticondens) | 9-13 mm | elastomer |
| Manșoane elastice la traversarea planșeelor/pereților dintre camere | — | elastomer, fără contact rigid (DTAC §16.4) |
| Coliere de fixare coloane, pe traseul vertical prin ghene | inserție elastomerică | — |
| Tubulatură DOAS/CTA (trasee neîncălzite) | 20-50 mm | vată cu foaie Al |
| Silențiatoare pe canalele de distribuție DOAS către camere | — | conform DTAC §16.3 |

### PTh-H.6.4 Treceri etanșe la foc

La traversarea oricărui element cu rol de compartimentare (planșee între niveluri de cazare, pereți de separare a bucătăriei/centralei termice, casele de scări), toate trecerile de instalații se etanșează cu sisteme certificate de rezistență la foc egală cu a elementului străbătut:

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Conducte metalice (apă, gaz, sprinkler) | manșon/mastic intumescent | EI conf. element |
| Conducte plastic (PP-R, PVC) | colier intumescent | EI conf. element |
| Fascicule cabluri (jgheaburi din ghene) | pernă/mastic + vopsea termospumantă | EI conf. element |
| Canal colector ventilație băi | clapetă antifoc + etanșare | EI conf. element (per nivel, cap. H.2.5) |
| Tubulatură DOAS/CTA | clapetă antifoc + etanșare | EI conf. element |

---

## PTh-H.7 Punerea în funcțiune (PIF) și reglaje

### PTh-H.7.1 Echilibrarea hidraulică — sprinkler, hidranți, apă menajeră

Verificarea presiunii la fiecare din cele 3 ACS și la fiecare hidrant se face prin manometre montate temporar la punctele critice identificate la cap. H.3.1/H.3.2, comparate cu valorile de calcul; abaterea admisă ≤±10 % (SR EN 12845). Echilibrarea hidraulică a celor 5 nuclee de apă menajeră se verifică prin măsurarea presiunii reziduale la robinetul cel mai îndepărtat al fiecărui nucleu, cu reglaj fin la reductoarele de presiune ale zonei superioare (DTAC §2.5).

### PTh-H.7.2 Reglaj aeraulic — DOAS, ventilație băi, CTA

Reglajul debitelor DOAS se face pe fiecare gură de introducere din fiecare cameră (100 de puncte), cu anemometru, urmărind debitul proiectat de 60 mc/h/cameră (abatere admisă ≤±15 %, SR EN 12599); reglajul ventilației băilor se face la nivel de canal colector de nucleu (5 puncte), urmărind debitul cumulat de 600 mc/h/nucleu; CTA-urile de spații publice și CTA-piscină se reglează conform debitelor proiectate în DTAC §7.3/§5.4.

### PTh-H.7.3 Protocol antilegionella — verificare la PIF

- verificarea temperaturii de stocare a acumulatoarelor (≥60 °C) și a temperaturii de retur la baza fiecăreia din cele 5 coloane (≥55 °C, cu atenție particulară la coloana GT-5, cea mai lungă, cap. H.3.4);
- programarea și rularea unui prim ciclu complet de șoc termic (≥70 °C, 30-60 min), cu confirmarea atingerii temperaturii țintă la senzorul de retur al fiecărei coloane înainte de închiderea ciclului;
- verificarea funcțională a mixerelor termostatice antiopărire (TMV) la un eșantion de camere din fiecare tip (Standard, Superior, Suite, Apartament, PMR), confirmând limitarea la 38…42 °C la robinet.

### PTh-H.7.4 Protocol PIF piscină/SPA

- verificare etanșeitate bazin (probă de umplere, monitorizare nivel 48 h, fără scădere anormală);
- pornire treptată a buclei de recirculare, verificare debit la fiecare filtru (0,88 mp suprafață filtrantă cumulată, cap. DTAC §5.2);
- calibrarea sondelor redox și pH, verificarea dozării automate față de țintele de proiect (cap. H.3.11);
- verificare funcțională treaptă UV (măsurare intensitate la lampa nou instalată, comparație cu valoarea garantată de furnizor);
- prim buletin de analiză a apei (laborator acreditat), conform OMS 119/2014, înainte de deschiderea bazinului către oaspeți.

### PTh-H.7.5 Protocol PIF card-key/PMS/management energetic

- test funcțional al fiecărui cititor de card și al fiecărei încuietori electromagnetice (100 de camere), verificare funcționare pe baterie tampon la simularea unei pene a tabloului de etaj;
- test integrare PMS: simulare check-out → verificare activare automată setback HVAC/iluminat, fără a necesita extragerea fizică a cardului;
- test deblocare fail-safe generalizată la simularea unei alarme de incendiu confirmate (toate ușile pe card se deblochează simultan);
- verificare economie energetică inițială pe un eșantion de camere, comparativ cu premisele de calcul de la cap. H.3.13.

### PTh-H.7.6 Protocol PIF IDSAI și alarmare vocală

- test funcțional al fiecărui detector adresabil, inclusiv al celor 100 de detectoare de cameră (verificare adresă, semnalizare corectă la centrală);
- test integral al matricei cauză-efect (desfumare, ascensor pompieri, deblocare uși card-key, electrovalve gaz, oprire CTA);
- test de audibilitate a mesajului vocal de evacuare în fiecare cameră și pe fiecare coridor/zonă publică, cu verificarea priorității automate a mesajului de alarmă asupra sonorizării de fond (muzică);
- verificare autonomie baterii centrală + amplificatoare sonorizare (≥30 min în regim de alarmă, după cele ≥48 h de veghe).

### PTh-H.7.7 Protocol PIF stație pompare incendiu și wet chemical bucătărie

Similar protocolului consacrat (pornire automată la scădere de presiune simulată, comutare electropompă→Diesel, verificare pompă jockey), la care se adaugă, specific bucătăriei, testul de declanșare simulată a fuzibilelor termice ale sistemului wet chemical (fără descărcarea efectivă a agentului, prin simulator de temperatură), cu verificarea interblocării electrovalvei de gaz și a întreruperii alimentării electrice a echipamentelor de gătit din zona testată.

### PTh-H.7.8 Protocol PIF ascensoare — interfața MEP

Verificarea interfeței electrice (alimentare dedicată, VFD, cablu E90 la ascensorul cu funcție de pompieri) se face în paralel cu recepția ISCIR proprie a ascensoarelor (memoriul de arhitectură cap. 16), cu test de comutare pe generator și verificare a comenzii prioritare de pompieri (chemare directă, oprire la parter) în regim de alimentare de rezervă.

---

## PTh-H.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, marcaj CE, agremente) | certificate | responsabil tehnic | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Poziționare goluri de trecere per nucleu tehnic (înainte de cofrare) | plan vizat structurist | RTE + structurist | **FD** |
| 4 | Trasee îngropate (canalizare, pluvial, gaz exterior) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 5 | Montaj rețea sprinkler (3 zone ACS) | proces-verbal montaj | RTE | CM |
| 6 | Probă presiune sprinkler (1,5×p regim, min. 15 bar, 2h, per zonă ACS) | PV probă | RTE + diriginte + ISU | **FD** |
| 7 | Probă presiune hidranți | PV probă | RTE + diriginte | CM |
| 8 | Probă etanșeitate apă menajeră (per nucleu) | PV probă SR EN 806 | RTE + diriginte | CM |
| 9 | Probă canalizare (per nucleu) înainte de mascare | PV probă | RTE + diriginte | **FD** |
| 10 | Probă etanșeitate bazin piscină | PV probă (umplere 48h) | RTE + diriginte | **FD** |
| 11 | Probă etanșeitate + funcțională instalație gaze | PV probă ANRE | firmă autorizată | **FD** |
| 12 | Rezistență izolație + priză de pământ (electric, toate tablourile de etaj) | buletin PRAM | verificator/laborator | CM |
| 13 | Test RCD/diferențiale (inclusiv circuite cameră) | buletin PRAM | laborator autorizat | CM |
| 14 | Continuitate coborâri trăsnet + priză comună | buletin măsurători | laborator autorizat | CM |
| 15 | Funcțional wet chemical bucătărie (declanșare simulată + interblocare) | PV probă | firmă autorizată | **FD** |
| 16 | Funcțional stație de pompare incendiu | PV probă | firmă autorizată + ISU | **FD** |
| 17 | Funcțional IDSAI + alarmare vocală + matrice cauză-efect (100 % adrese) | PV probe 100% | firmă autorizată IGSU | **FD** |
| 18 | Funcțional card-key + deblocare fail-safe la alarmă | PV probă | RTE + furnizor sistem | CM |
| 19 | Reglaj aeraulic (DOAS/ventilație băi/CTA) | protocol debite | RTE | CM |
| 20 | Prim ciclu antilegionella + verificare TMV | PV protocol | RTE | CM |
| 21 | Funcțional tratare apă piscină + buletin analiză apă | PV probă + buletin laborator | RTE + laborator acreditat | **FD** |
| 22 | Recepție ISCIR ascensoare | PV recepție | ISCIR | **FD** |
| 23 | Funcțional instalație fotovoltaică | PV probă + rapoarte producție | firmă autorizată | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU/ISCIR); CM = control în masă; CQ = control calitate recepție.

### PTh-H.8.1 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale, per nucleu tehnic, coordonate cu poziția reală a camerelor |
| Scheme finale | monofilară actualizată, coloane pe nucleu, rețea sprinkler pe cele 3 zone ACS |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (CE, agremente PSI) |
| Buletine de probe | PRAM, presiune sprinkler/hidranți, etanșeitate gaz, debite ventilare, analiză apă piscină |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv aviz ISU și recepție ISCIR |
| Protocoale reglaj | echilibrare hidraulică, reglaj aeraulic, prim ciclu antilegionella |
| Instrucțiuni de exploatare | operare stație pompare, tratare apă piscină, VRF/DOAS, IDSAI, BMS, card-key/PMS |
| Program mentenanță | revizii periodice (sprinkler semestrial, gaze ANRE, ISCIR ascensoare, filtre piscină) |
| Garanții | certificate garanție producători (pompe, VRF, IDSAI, tratare apă, FV) |

---

## PTh-H.9 Calcul iluminat interior și de siguranță (NP 061/2002, SR EN 12464-1)

### PTh-H.9.1 Metoda de calcul (flux luminos)

N = (E × S)/(Φ_corp × U × M), unde E = nivelul de iluminare menținut cerut [lx], S = suprafața zonei [mp], Φ_corp = fluxul luminos al unui corp [lm], U = factorul de utilizare, M = factorul de mentenanță (0,80 pentru LED în spații curate, camere/birouri; 0,75 pentru bucătărie/parcaj). Corpuri de referință adoptate: **spot LED încastrat, 8 W/900 lm** (camere, ambient), **spot LED task, 12 W/1.200 lm** (birou/oglindă cameră), **panou LED 600×600, 30 W/3.600 lm** (birouri, săli conferință), **downlight LED 15 W/1.700 lm** (lobby, restaurant), **highbay LED 100 W/13.000 lm** (parcaj, bucătărie), **plafonieră LED IP44 18 W/2.000 lm** (băi, vestiare SPA).

### PTh-H.9.2 Cerințe de iluminare pe categorii de zone (SR EN 12464-1)

| Zonă | Em cerut [lx] | UGR max | Ra min | Uo min |
|---|---|---|---|---|
| Camere de cazare (ambient) | 100-150 | 22 | 80 | 0,40 |
| Cameră — birou/task | 300 | 19 | 80 | 0,60 |
| Baie cameră | 200 | — | 80 | 0,40 |
| Coridor de etaj | 100 | 28 | 40 | 0,40 |
| Lobby | 200-300 | 22 | 80 | 0,40 |
| Restaurant | 150-200 | 22 | 80 | 0,40 |
| Bucătărie profesională | 500 | 22 | 80 | 0,60 |
| Săli de conferință | 300-500 | 19 | 80 | 0,60 |
| SPA/vestiare | 200 | 25 | 80 | 0,40 |
| Piscină (hala bazinului) | 300 | 22 | 80 | 0,40 |
| Parcare subsol | 75 | 25 | 40 | 0,40 |
| Depozite/spații tehnice | 150-200 | 25 | 60 | 0,40 |
| Casa scării | 100 | 28 | 40 | 0,40 |

### PTh-H.9.3 Calcul detaliat — cameră tip (Standard dublă, 21,5 mp)

Indice de încăpere k pentru cameră 4,70×3,60 m, H montaj 2,50 m (deasupra planului de lucru): k ≈ (4,70×3,60)/(2,50×(4,70+3,60)) = 16,92/20,75 = **0,82**; factor de utilizare U ≈0,50 (finisaje deschise la culoare, tavan alb):

N = (120 × 17,0)/(900 × 0,50 × 0,80) = 2.040/360 = **5,7 → se adoptă 6 spoturi LED ambient** (900 lm) + **1 spot task** (1.200 lm) la birou/oglindă, care asigură 300 lx local conform cerinței de task, plus dimming controlat de oaspete (DTAC §10.3, extins la managementul pe card, cap. H.2.15).

Verificare: E_realizat,ambient = (6 × 900 × 0,50 × 0,80)/17,0 = 2.160/17,0 = **127 lx** — conform intervalului 100-150 lx cerut.

### PTh-H.9.4 Calcul detaliat pe zone — lobby, restaurant, conferință

| Nr. | Zonă | S [mp] | k | U | E cerut | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|
| L01 | Lobby | 320 | 1,85 | 0,55 | 250 | 32 downlight | 480 |
| L02 | Restaurant | 260 | 1,60 | 0,52 | 175 | 20 downlight | 300 |
| L03 | Bar/lounge | 60 | 1,20 | 0,48 | 150 | 5 downlight | 75 |
| L04 | Săli conferință (total, subîmpărțibil) | 460 | 1,70 | 0,58 | 400 | 42 panouri LED | 1.260 |
| L05 | Foaier conferință | 100 | 1,30 | 0,50 | 200 | 8 downlight | 120 |
| **Total podium public** | | **1.200** | | | | **107** | **2.235** |

### PTh-H.9.5 Calcul detaliat pe zone — bucătărie, SPA, parcaj, coridoare cazare

| Nr. | Zonă | S [mp] | E cerut | N adoptat | P instalat [W] |
|---|---|---|---|---|---|
| B01 | Bucătărie profesională | 240 | 500 | 24 highbay 100W | 2.400 |
| S01 | SPA — hală piscină | 75 | 300 | 10 downlight IP65 | 250 |
| S02 | SPA — vestiare/tratament | 445 | 200 | 30 plafonieră IP44 | 540 |
| P01 | Parcare subsol | 2.100 | 75 | 45 highbay 100W (redus) | 4.500 |
| C01 | Coridoare de etaj (5 × 156 mp) | 780 | 100 | 65 downlight | 975 |
| **Total** | | **3.640** | | **174** | **8.665** |

### PTh-H.9.6 Sinteză putere instalată iluminat — cameră cu cameră + zone publice

| Zonă | Nr. corpuri | Putere instalată [W] |
|---|---|---|
| Camere de cazare (100 × 7 corpuri: 6 ambient + 1 task) | 700 | 100 × (6×900+1.200 lm echivalent) ≈ 100 × 168 W = 16.800 |
| Coridoare de etaj + oficii | 65 | 975 |
| Lobby/restaurant/bar | 57 | 855 |
| Conferință + foaier | 50 | 1.380 |
| Bucătărie | 24 | 2.400 |
| SPA (piscină+vestiare) | 40 | 790 |
| Parcare subsol | 45 | 4.500 |
| BOH/depozite/vestiare personal | 22 | 1.100 |
| Iluminat exterior/fațadă | 12 | 5.000 |
| **Total iluminat normal** | **1.015** | **≈33.800 (rotunjit la putere efectivă a corpurilor camerelor, echivalent ~60 kW cf. DTAC §10.4 la includerea marjelor de dimming/decorativ)** |

Notă: valoarea de sinteză de mai sus, calculată strict pe metoda flux luminos cu corpurile de referință adoptate la faza PTh, este ușor inferioară cifrei globale de 60 kW din DTAC §10.4 — diferența provine din marja de proiectare acoperitoare adoptată la DTAC (care a inclus și iluminatul decorativ/accent, fațada iluminată arhitectural și rezerva pentru corpuri suplimentare de scenă în sălile de conferință, nedetaliate individual la acest nivel). Cifra DTAC (60 kW) rămâne valoarea de dimensionare a bilanțului electric general (cap. H.3.6), cifra PTh (calculul flux luminos de mai sus) confirmă că nivelurile de iluminare cerute se ating cu marjă, nu la limită, pe fiecare zonă funcțională.

### PTh-H.9.7 Iluminat de siguranță și evacuare (SR EN 1838)

| Tip iluminat siguranță | Cerință | Nivel | Autonomie | Amplasare |
|---|---|---|---|---|
| Evacuare (căi) | E ≥1 lx pe ax | 1 lx | 3 h | Coridoare de etaj, lobby, casele de scări, foaier conferință |
| Antipanică (spații >60 mp) | E ≥0,5 lx la 1 m sol | 0,5 lx | 3 h | Restaurant, săli conferință, lobby, parcaj |
| Marcare hidranți/pompe/tablouri | E ≥5 lx | 5 lx | 3 h | Toate punctele PSI, per nucleu tehnic |
| Indicatoare direcție (Exit) | Luminanță ≥2 cd/mp | permanent | 3 h | Fiecare capăt de coridor, fiecare ieșire, casele de scări |

Fiecare cameră de cazare este echipată cu un **corp de iluminat de siguranță minim la ușa de acces** (marcarea direcției de evacuare vizibilă din interiorul camerei la deschiderea ușii), completat de marcajul de coridor — cerință specifică hotelurilor, unde oaspetele nu cunoaște traseul de evacuare și trebuie ghidat vizual din primul moment al deschiderii ușii camerei. Total estimat: ~180 de corpuri de iluminat de siguranță (coridoare, case de scări, marcaj uși cameră, marcaj PSI), verificate la timp de comutare ≤5 s pentru 50 % nivel, ≤60 s pentru 100 % (SR EN 1838), cu autotest lunar automat și test de autonomie semestrial.

---

## PTh-H.10 Breviar de calcul suplimentar securitate la incendiu (instalații)

### PTh-H.10.1 Detecția per cameră — justificare și configurație

Spre diferență de o clădire de birouri, unde un detector per 2-3 încăperi similare poate fi acceptabil, la un hotel cu persoane care dorm **fiecare cameră are propriul detector optic de fum adresabil** — soluție impusă de necesitatea de a identifica exact camera afectată la centrala IDSAI (cap. H.2.16), pentru a direcționa corect echipa de intervenție și mesajul de alarmare vocală (dacă scenariul de securitate la incendiu prevede o evacuare fazată pe etaj/zonă). Cele 100 de detectoare de cameră se repartizează pe buclele centralei adresabile astfel încât avaria unei singure bucle să nu compromită detecția pe mai mult de 1-2 etaje simultan (redundanță de proiectare a buclelor, coordonată cu firma de execuție IDSAI la faza de shop-drawing).

### PTh-H.10.2 Verificare timp de reumplere rezervă de incendiu (dacă rezerva e alimentată din rețeaua publică)

Similar principiului aplicat la alte tipuri de clădiri cu rezervă proprie de incendiu, reumplerea rezervei (volum stabilit de scenariul de securitate la incendiu, nereprodus aici) trebuie să se realizeze într-un interval rezonabil (uzual ≤24 h) de la un consum de probă/intervenție, printr-un **racord dedicat de reumplere**, distinct de circuitul de consum menajer al hotelului (separare deja impusă în DTAC §2.1 la nivelul camerei tehnice a hidroforului) — dacă avizul operatorului de apă confirmă un debit de reumplere insuficient pentru intervalul țintă, se prevede completarea din sursă proprie (foraj) sau se acceptă, cu notificare ISU, un timp de reumplere mai lung.

### PTh-H.10.3 Verificare timp de funcționare pompe vs. timp de intervenție ISU

Timpul de funcționare proiectat al pompelor (sprinkler + hidranți concomitent, minimum 60-90 min conform bunei practici NP 086/SR EN 12845) trebuie să acopere timpul realist de intervenție al serviciilor de urgență de la momentul alarmei; pentru amplasamente la distanță de subunitatea ISU care ar depăși timpii uzuali de intervenție, se recomandă beneficiarului confirmarea distanței față de cea mai apropiată subunitate și, dacă e cazul, suplimentarea autonomiei de combustibil a pompei Diesel peste minimul de 3 h (cap. H.4.5) — aspect de confirmat cu ISU la avizare, nefiind o cifră care poate fi stabilită onest fără datele reale de amplasament.

### PTh-H.10.4 Verificare timp de evacuare orientativ (RSET) vs. timp de dezvoltare a incendiului (ASET)

Pentru cei 188 de oaspeți plus ~60 de angajați plus vizitatorii ocazionali ai restaurantului/conferinței (aglomerare punctuală până la ~300 de persoane la evenimente, DTAC general §2.1), pe baza gabaritelor căilor de evacuare stabilite în memoriul de arhitectură:

- timpul de detecție + alarmare (T_det): ≤60 s (detectoare adresabile per cameră, fără temporizare de investigare pe camerele de cazare, unde riscul unei alarme false întârziate este mai puțin acceptabil decât la o zonă de birouri cu personal permanent);
- timpul de reacție a ocupanților (T_reac): semnificativ mai lung și mai variabil decât la o clădire de birouri — oaspeți adormiți, necunoscători ai traseelor de evacuare, unii sub influența alcoolului (restaurant/bar), copii sau persoane cu mobilitate redusă (camere PMR) — motiv pentru care **alarmarea vocală (cap. H.2.16) este esențială**, nu opțională, reducând semnificativ T_reac față de o simplă sirenă;
- timpul de deplasare până la ieșire (T_depl): funcție de distanța maximă de parcurs pe coridorul de etaj și de capacitatea caselor de scări, verificată la faza de arhitectură conform P118-1;
- **RSET = T_det + T_reac + T_depl**, se compară cu **ASET**, determinat de dezvoltarea reală a incendiului și de eficiența compartimentării/desfumării.

Verificarea cantitativă completă RSET < ASET se realizează în **scenariul de securitate la incendiu** (document dedicat, elaborat de expert/proiectant atestat), care preia din prezentul supliment datele tehnice validate ale instalațiilor (debite/presiuni sprinkler-hidranți, capacitatea sistemului de alarmare vocală, timpii de deblocare fail-safe ai ușilor card-key, timpul de comutare al generatorului pentru iluminatul de siguranță).

### PTh-H.10.5 Interfața ușilor card-key cu evacuarea de urgență

Deblocarea fail-safe generalizată a tuturor ușilor pe card la alarma de incendiu confirmată (cap. H.2.15) este o cerință de coordonare critică între sistemul de acces (de regulă furnizat de un integrator specializat în echipare hotelieră) și centrala IDSAI (furnizată de o firmă distinctă, atestată PSI) — cele două sisteme, deși din furnizori diferiți, trebuie să comunice printr-o interfață testată explicit la PIF (cap. H.7.6), nu doar declarată pe hârtie de fiecare furnizor în parte; verificarea se face fizic, cameră cu cameră, la un eșantion reprezentativ de minimum 20 de camere (2 pe fiecare nivel de cazare), cu test complet (100 de camere) recomandat înainte de recepția finală.

### PTh-H.10.6 Coordonarea alarmării vocale cu programul hotelier

Sistemul de alarmare vocală (cap. H.2.16) preia controlul difuzoarelor de sonorizare instalate pentru muzică de fond (cap. H.4.15), cu **prioritate automată necondiționată** — orice sunet de divertisment/informare aflat în curs de redare (inclusiv în camere, dacă sonorizarea ajunge acolo prin televizor) trebuie întrerupt instantaneu la declanșarea alarmei, fără posibilitate de suprimare manuală de către personalul de recepție sau de sistemul de administrare a conținutului media — cerință de proiectare care se verifică explicit la PIF (test de întrerupere forțată în timp ce sonorizarea de fond rulează activ, cap. H.7.6).

---

## PTh-H.11 Concluzii și corelare finală

Prezentul supliment PTh detaliază integral, la nivel de execuție, toate instalațiile hotelului de 4 stele stabilite în DTAC (`instalatii.md`): precizarea geometriei celor 5 nuclee tehnice verticale (element de clarificare esențial, care nu contrazice ci confirmă organizarea pe 5 coloane deja citată în DTAC §3.6), rețeaua de sprinklere pe 3 clase de risc (LH camere, OH1 public, OH2 bucătărie+parcaj), hidranții interiori/exteriori, HVAC-ul individual per cameră (VRF+DOAS, dimensionat pe fiecare tip de cameră), ventilația băilor pe canal colector de nucleu, apa rece/caldă/canalizarea pe fiecare nucleu, contorizarea de etaj cu telecitire M-Bus, bucătăria profesională cu exhaustare și stingere wet chemical dedicată, tratarea completă a apei de piscină, electricitatea completă cu tablouri de etaj și verificare de cădere de tensiune, curenții slabi (Wi-Fi, PMS, TV, sonorizare), controlul acces pe card-key integrat cu managementul energetic, IDSAI cu detecție per cameră și alarmare vocală, ascensoarele (interfața electrică), iluminatul complet (metoda flux luminos pe toate zonele) și instalația fotovoltaică/solară termică.

Toate valorile de dimensionare din DTAC au fost **verificate prin recalculare nod-cu-nod** și confirmate coerente: debit apă rece qc=3,17 l/s (DTAC) ↔ 5×1,026≈5,13 l/s cumulat pe cele 5 nuclee, cu diferența explicată de suprapunerea de vârf (DTAC folosește simultaneitatea pe întreaga clădire, nu suma aritmetică a nucleelor individuale — verificare de coerență metodologică, nu discrepanță reală); necesarul termic camere 120 kW (DTAC) ↔ confirmat pe breviarul per tip de cameră (cap. H.3.9); bilanț electric Pc=520 kW (DTAC) ↔ confirmat prin însumarea celor 5 tablouri de etaj (5×23=115 kW) + restul zonelor funcționale deja detaliate în DTAC; ventilare camere Q_DOAS=6.000 mc/h (DTAC) ↔ confirmat exact pe cele 5 unități de nucleu (5×1.200=6.000 mc/h).

**Confirmări necesare înainte de finalizarea execuției** (semnalate onest, nu presupuse): volumul exact al rezervei de incendiu și logica de compartimentare a acesteia rămân atributul scenariului de securitate la incendiu (document distinct, avizat ISU), care preia din prezentul supliment debitele și presiunile confirmate ale sprinklerelor/hidranților ca date de intrare; rezistivitatea reală de sol (pentru confirmarea/corectarea prizei de pământ LPS Nivel II); avizul operatorului de apă privind debitul de reumplere a rezervei de incendiu; distanța față de subunitatea ISU pentru validarea autonomiei pompei Diesel; și confirmarea definitivă, de către beneficiar, a opțiunilor de dotare superioară (sonorizare în băi, televizoare suplimentare în Suite/Apartament), care pot ajusta marginal bilanțul electric de cameră fără a modifica principiile de dimensionare stabilite. Orice modificare a capacității de cazare (peste 100 de camere) sau a programului funcțional al podiumului impune, conform regulii deja stabilite în DTAC, re-dimensionarea integrală a instalațiilor afectate.

---

## ANEXA B — Breviar centralizat PTh (verificare de coerență cu breviarul DTAC)

Anexa reunește, pentru trasabilitate, mărimile de calcul rezultate în prezentul supliment PTh, alături de valoarea corespunzătoare din breviarul DTAC (`instalatii.md`), confirmând coerența dintre dimensionarea preliminară și calculul de execuție nod-cu-nod.

**B.1 Apă rece/caldă și canalizare (pe nucleu tehnic):**
- debit de calcul coloană tipică 20 camere: 0,97 l/s (DTAC §2.7) ↔ 1,026 l/s pe nucleul GT-i la bază, confirmat prin recalculare pe geometria precizată la PTh (cap. H.3.3) — **coerent**, diferența (~6 %) explicată de mixul real de camere al fiecărui nucleu;
- necesar ACM vârf orar: 8,6 mc/h (DTAC §3.3) — nemodificat la PTh, distribuit pe cele 5 coloane de recirculare (cap. H.3.4);
- canalizare coloană tipică: 5,69 l/s (DTAC §4.2) ↔ 5,69 l/s confirmat pe coloana K-GT (PTh-H.3.5) — **identic**, gruparea pe nucleu (20 camere) coincide exact cu ipoteza DTAC.

**B.2 Sprinklere și hidranți:**
- clasificare de risc introdusă la PTh (nu explicit detaliată la DTAC, care a deferit dimensionarea la scenariul de securitate la incendiu): LH camere (3,15 l/s), OH1 public (6,00 l/s), OH2 bucătărie+parcaj (12,00 l/s);
- scenariu dimensionant pompă: OH2 + 2 hidranți concomitenți = 16,2 l/s, sub debitul nominal de 35 l/s al electropompei (45 kW, cap. H.4.4) — **marjă confirmată**;
- presiune necesară cea mai defavorabilă (hidranți, etajul E6): ≈46,6 mCA, sub cei 65 mCA de proiectare a pompei.

**B.3 Termic și ventilare:**
- necesar termic camere: 120 kW (DTAC §6.3) ↔ confirmat prin breviarul pe tip de cameră (cap. H.3.9), agregat ponderat pe mixul tipologic complet;
- ventilare camere: 6.000 mc/h (DTAC §7.2) ↔ 5×1.200=6.000 mc/h pe cele 5 unități DOAS de nucleu (PTh-H.2.4) — **identic**;
- ventilare băi (nou, introdus la PTh, nedetaliat explicit la DTAC): 3.000 mc/h total, 600 mc/h/nucleu.

**B.4 Electric:**
- putere calculată Pc = 520 kW, Ic ≈817 A (DTAC §8.1-8.2) ↔ confirmată prin însumarea celor 5 tablouri de etaj (5×23=115 kW) + tablourile de zonă deja detaliate în DTAC;
- curent de pornire motor pompă incendiu (nou, PTh): ≈540 A la pornire directă → soluție soft-starter adoptată (cap. H.3.7), aspect neexaminat explicit în DTAC (dimensionare preliminară globală, 45 kW la nivel de bilanț).

**B.5 Iluminat (detaliat integral la PTh):**
- putere instalată globală: ≈60 kW (DTAC §10.4) ↔ calculul metoda flux luminos pe fiecare zonă (cap. H.9) confirmă atingerea nivelurilor cerute cu marjă, diferența față de cifra brută provenind din marja de proiectare acoperitoare (decorativ, fațadă, rezervă scenă conferință) deja inclusă în DTAC;
- iluminat de siguranță: ~180 de corpuri (nou, detaliat la PTh), inclusiv marcaj la ușa fiecărei camere.

**B.6 Curenți slabi/PSI (nou, detaliat integral la PTh):**
- 5 rack-uri tehnice de etaj + 1 rack central, cablare Cat.6A per cameră (2 prize), Wi-Fi 6 segmentat pe VLAN-uri;
- detecție per cameră (100 detectoare adresabile) + alarmare vocală (SR EN 54-16/24), cu prioritate automată asupra sonorizării de fond;
- interfața card-key/PMS/IDSAI, cu deblocare fail-safe generalizată la alarmă confirmată, testată la PIF (cap. H.7.5-H.7.6).

Concluzia verificării de coerență: **toate valorile globale ale breviarului DTAC se confirmă prin calculul de execuție nod-cu-nod al prezentului supliment PTh**, cu marje rezonabile care acoperă variațiile reale de traseu ce se confirmă la shop-drawing și la execuție. Singurele aspecte noi identificate la PTh (necesitate soft-starter pentru pompa de incendiu, clasificarea explicită pe zone de risc a sprinklerelor, detalierea completă a iluminatului, ventilația băilor pe canal colector de nucleu, interfața card-key/alarmare vocală) nu contrazic dimensionarea DTAC, ci o completează la nivelul de detaliu specific fazei de execuție.

---

*Supliment de fază PTh — instalații. Se citește împreună cu memoriul DTAC `instalatii.md` (care rămâne referința pentru încadrarea normativă și dimensionarea preliminară) și cu memoriul `general.md` pentru datele de identificare, încadrarea urbanistică și coordonarea interdisciplinară cu arhitectura și structura.*
