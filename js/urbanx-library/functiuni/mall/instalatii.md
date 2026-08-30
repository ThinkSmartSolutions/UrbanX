# Memoriu tehnic de instalații — Centru comercial regional (MALL), S+P+2E, GLA ~22.000 mp (DTAC)

> **Precizare de fază și responsabilitate.** Prezentul memoriu este redactat la nivel de **Documentație Tehnică pentru Autorizarea Construirii (DTAC)**, conform Legii nr. 169/2026 (CATUC), art. 264, Anexa 2, și Legii 10/1995 privind calitatea în construcții. Dimensionările, debitele, puterile și volumele prezentate sunt **calcule de fundamentare acoperitoare**, bazate pe normativele în vigoare și pe ipoteze de proiectare uzuale pentru tipologia „centru comercial regional cu galerie, hipermarket, cinema multiplex și food-court". Ele stabilesc **capacitatea instalațiilor, tipul de sistem și ordinul de mărime al investiției**, necesare pentru avizare (ISU, utilități, mediu, PUZ) și pentru emiterea autorizației de construire. La fazele următoare — **Proiect Tehnic (PT) și Detalii de Execuție (DDE)** — aceste calcule se dezvoltă în breviare complete, cu note de calcul semnate de proiectanții de specialitate, cu selecția definitivă a echipamentelor (fișe tehnice, curbe de funcționare) și cu avizarea/verificarea prin verificatori atestați MDLPA (Is, It, Ie, Ig) și prin scenariul de securitate la incendiu avizat de ISU. Toate cifrele, formulele și concluziile din varianta inițială a acestui memoriu sunt păstrate identic; textul de mai jos le dezvoltă în proză explicativă, cu justificarea normativă și fizică a fiecărei soluții.

## Cuprins

1. Date generale, cadru normativ și ipoteze de calcul
2. Instalații sanitare — alimentare cu apă rece și caldă (I9)
3. Canalizare menajeră, pluvială și separatoare de grăsimi/hidrocarburi
4. Instalații termice — sursă și distribuție
5. Ventilare și climatizare — HVAC eterogen pe funcțiuni (galerie, hipermarket, food-court, cinema)
6. Ventilarea și desfumarea parcajului subteran — principiul jet-fan (NP 127/2009)
7. Desfumarea atriumului — sistem SHEVS (SR EN 12101)
8. Instalații de frig — confort și frig alimentar
9. Instalații electrice — curenți tari, posturi de transformare MT/JT
10. Grupul electrogen de siguranță — consumatori vitali și scenariul de accident
11. Iluminat interior și de siguranță (NP 061)
12. Priză de pământ și paratrăsnet (I7, SR EN 62305)
13. Instalații de stingere a incendiilor — sprinklere generalizate, hidranți, rezervă de apă
14. Detecție, semnalizare și alarmare vocală EVAC (P118-3, SR EN 54-16)
15. Curenți slabi și BMS la scară de mall
16. Eficiență energetică nZEB (Legea 372/2005)
17. Managementul deșeurilor — colectare selectivă, compactoare, camere frigorifice deșeuri alimentare
18. Rețeaua de date și telecomunicații pentru chiriași
19. Mentenanța și managementul facilităților (FM)
20. Concluzii, sinteză indicatori și verificare tehnică

---

## 1. Date generale, cadru normativ și ipoteze de calcul

### 1.1 Descrierea obiectivului

Prezentul memoriu tratează instalațiile aferente unui **centru comercial regional (mall)**, cu regim de înălțime **S+P+2E**, structurat pe o galerie comercială cu **atrium central pe 3 niveluri** și luminator zenital, ancorată de trei generatoare majore de trafic: un **hipermarket**, un **cinema multiplex** (6-8 săli) și o zonă de **food-court**, completate de 90-110 unități de dimensiuni variabile și de un **parcaj subteran** de mari dimensiuni. Suprafața construită desfășurată (SCD) a obiectivului este de ordinul **~52.000 mp**, cu o Suprafață utilă (Su) repartizată astfel:

| Componentă | Su (mp) |
|---|---|
| Galerie + atrium | 6.500 |
| Unități (90-110) | 9.000 |
| Hipermarket | 4.000 |
| Food-court (12-16 module) | 2.200 |
| Cinema (6-8 săli, 1.400-1.700 locuri) | 2.500 |
| Tehnic/BOH (back-of-house) | 3.800 |
| Parcaj subteran | 22.000 |

Această repartiție nu este una arbitrară: fiecare linie din tabel corespunde unei rețele de instalații cu **regim de funcționare propriu** — de la sarcina termică ridicată a hipermarketului (frig alimentar, vitrine deschise), la cerințele acustice și de calitate a aerului ale sălilor de cinema cu public dens, la producția de fum de gătit a food-court-ului, la volumul mare, slab compartimentat, al parcajului subteran. Diferența esențială față de o clădire de birouri sau o clădire rezidențială constă tocmai în **eterogenitatea funcțională concentrată pe același amplasament, cu fluxuri de public foarte mari și simultane** — motiv pentru care instalațiile mall-ului nu pot fi tratate ca o simplă multiplicare a soluțiilor unei clădiri obișnuite, ci ca un sistem integrat, coordonat prin BMS și printr-un scenariu de securitate la incendiu unitar.

### 1.2 Calculul aglomerării de persoane — baza tuturor dimensionărilor

Toate instalațiile unui mall — sanitare, ventilare, evacuare, stingere incendiu, alarmare — pornesc de la un singur parametru fundamental: **numărul de persoane prezente simultan**. Calculul aglomerării (conform P118-2, NP 068-2002 pentru sălile aglomerate și metodologiei uzuale pentru centre comerciale) însumează contribuția fiecărei zone funcționale, aplicând un indice specific de ocupare (mp utili/persoană sau persoane/loc):

- **Galerie**: 6.500 mp / 2,0 mp/pers = **3.250 pers**
- **Unități comerciale**: 9.000 mp / 3,0 mp/pers = **3.000 pers**
- **Hipermarket**: 3.000 mp (suprafață de vânzare, distinctă de suprafața totală de 4.000 mp care include și depozitele/BOH-ul propriu) / 2,0 mp/pers = **1.500 pers**
- **Food-court**: 1.400 mp (zona de mese) / 1,2 mp/pers = **1.170 pers**
- **Cinema**: capacitate nominală **1.600 locuri** (1 pers/loc, ocupare 100 % la o proiecție de succes)

**Total la vârf teoretic (simultaneitate 100 %):** 3.250 + 3.000 + 1.500 + 1.170 + 1.600 ≈ **~10.500 persoane**.

În realitate, probabilitatea ca toate zonele să atingă simultan ocuparea maximă (de exemplu, cinema plin în aceeași oră cu food-court-ul la capacitate și galeria la afluența de weekend) este redusă — de aceea se aplică un **coeficient de simultaneitate** de **0,55-0,65**, rezultând populația de calcul pentru dimensionarea instalațiilor curente (sanitare, ventilare, HVAC):

**~10.500 × 0,55...0,65 ≈ 6.500-7.000 persoane de calcul**

Este esențial de subliniat că **cele două valori nu se substituie una pe alta, ci se folosesc în momente diferite ale proiectării**: populația de vârf (~10.500) rămâne baza scenariului de **evacuare** (unde nu ne permitem să presupunem o simultaneitate redusă — un incendiu poate avea loc exact în ziua de vârf maxim, de sărbători), iar populația de calcul cu simultaneitate (~6.500-7.000) este cea corectă pentru dimensionarea consumurilor curente (apă, aer proaspăt, energie), unde supradimensionarea la vârful teoretic ar conduce la echipamente inutil de mari și ineficiente energetic.

### 1.3 Încadrări de importanță, seismice și de risc de incendiu

| Parametru | Încadrare | Justificare |
|---|---|---|
| Categoria de importanță (HG 766/1997) | **B — deosebită** | Aglomerare mare de persoane, funcțiuni publice multiple |
| Clasa de importanță seismică (P100-1) | **II** (γ_I,e = 1,20) | Aglomerări mari de persoane, peste pragurile de clasă III doar la sub-ansambluri foarte mari |
| Gradul de rezistență la foc | **I-II** | Structură cu protecție ridicată, deschideri mari |
| Risc de incendiu | mijlociu-mare | Sarcină termică ridicată din mărfuri, ambalaje, mobilier comercial |
| Categoria B, clasa II (γI 1,2) | — | Coroborat cu aglomerarea de calcul |

Clasificarea de **categorie B** nu este formală — ea reflectă combinația de factori de risc specifici unui mall: **densitate mare de public necunoscut cu clădirea** (spre deosebire de o clădire de birouri, unde ocupanții cunosc traseele de evacuare), **sarcină termică ridicată și variabilă** (rafturi de mărfuri, ambalaje din carton/plastic, textile, mobilier comercial care ard rapid și degajă fum toxic), **volume mari necompartimentate** (galeria și atriumul), și **funcțiuni cu public captiv** (sălile de cinema, unde publicul stă în întuneric, cu vizibilitate redusă a ieșirilor). Toate aceste elemente converg către soluțiile de instalații descrise în capitolele următoare — în special sprinklerarea generalizată (cap. 13) și alarmarea vocală (cap. 14).

### 1.4 Cadrul normativ aplicabil

Proiectarea instalațiilor se realizează cu respectarea următorului cadru normativ:

**Instalații sanitare, canalizare și gaze:**
- **I9-2022** — Normativ pentru proiectarea, execuția și exploatarea instalațiilor sanitare
- **I6** — Normativ pentru proiectarea și executarea sistemelor de alimentare cu gaze naturale
- **STAS 1478** — Alimentarea cu apă la construcții civile și industriale
- **STAS 1795** — Canalizarea interioară
- **STAS 1846** — Determinarea debitelor de calcul pentru canalizarea pluvială
- **STAS 1343** — Determinarea cantităților de apă potabilă pentru localități
- **OMS 119/2014** — Norme de igienă privind mediul de viață
- **Reg. CE 852/2004** — Igiena produselor alimentare (aplicabilă zonelor de food-court și hipermarket)

**Instalații termice, ventilare, climatizare și frig:**
- **I13/2015** — Normativ pentru instalațiile de încălzire centrală
- **I5-2022** — Normativ pentru instalațiile de ventilare și climatizare
- **C107** — Normativ privind calculul termotehnic al elementelor de construcție
- **SR EN 16798-1** — Performanța energetică a clădirilor, parametri interiori
- **Ord. 2641/2017** — Metodologia de calcul al performanței energetice a clădirilor

**Instalații electrice:**
- **I7-2011** — Normativ pentru instalațiile electrice cu tensiuni până la 1000 V c.a.
- **SR HD 60364** — Instalații electrice de joasă tensiune
- **SR EN 62305** — Protecția împotriva trăsnetului
- **NP 061/2002** — Proiectarea și executarea sistemelor de iluminat artificial

**Securitate la incendiu:**
- **P118-1/2/3** — Securitatea la incendiu a construcțiilor (construcții/instalații de stingere/detecție-alarmare)
- **NP 068-2002** — Proiectarea clădirilor cu săli aglomerate (aplicabil direct cinema, food-court, atrium)
- **NP 127/2009** — Normativ pentru proiectarea parcajelor de autoturisme
- **Legea 307/2006** — Apărarea împotriva incendiilor
- **HG 571/2016** — Avizarea și autorizarea privind securitatea la incendiu

**Eficiență energetică:**
- **Legea 372/2005** (republicată) + **Mc001** — performanța energetică a clădirilor

### 1.5 Principii generale de proiectare specifice unui mall

Spre deosebire de o clădire monofuncțională, proiectarea instalațiilor unui mall trebuie să răspundă la o serie de principii suplimentare:

- **Zonarea pe generatori de trafic**: fiecare ancoră majoră (hipermarket, cinema, food-court) are propriul regim de instalații (frig alimentar, acustică, evacuare fum de gătit) care nu poate fi tratat cu soluția „standard" a galeriei comerciale.
- **Contorizarea individuală pe chiriași**: fiecare unitate comercială este un contract de închiriere distinct — energia termică, frigul, electricitatea și apa se contorizează separat pentru fiecare chiriaș, cu transmisie automată către BMS pentru facturare și pentru managementul costurilor comune (CAM).
- **Continuitate a serviciilor critice indiferent de sursă**: un mall funcționează cu mii de persoane prezente simultan — o cădere a alimentării electrice nu poate lăsa fără iluminat de evacuare, fără pompe de sprinklere sau fără desfumare a atriumului nici măcar pentru câteva secunde (cap. 10).
- **Separarea fluxurilor**: public, marfă și evacuare sunt trei circuite fizic distincte, care influențează direct traseele instalațiilor (rampă marfă cu ventilare proprie, culoar tehnic de serviciu cu instalații dedicate).
- **Rezervă de capacitate pentru remodelare comercială**: un mall se „remodelează" comercial la fiecare 5-10 ani (schimbare de chiriași, reconfigurare unități) — instalațiile terminale (electric, HVAC, apă) se proiectează modular, cu rezervă de minimum 15-20 %, pentru a permite reconfigurări fără afectarea rețelelor principale.

### 1.6 Baze de calcul sintetice

| Bază de calcul | Valoare | Utilizare principală |
|---|---|---|
| Populație de vârf (evacuare) | ~10.500 pers | Scenariu de securitate la incendiu, lățime căi evacuare |
| Populație de calcul (simultaneitate 0,55-0,65) | ~6.500-7.000 pers | Sanitare, aer proaspăt, HVAC curent |
| SCD | ~52.000 mp | Bilanț general |
| Suprafață acoperiș/terasă utilă | ~13.000 mp | Pluvial, desfumare atrium, fotovoltaic |
| Volum parcaj subteran | 22.000 mp Su × ~2,7 m | Ventilare/desfumare parcaj |
| Volum atrium | ~35.000 mc | Desfumare SHEVS |

---

## 2. Instalații sanitare — alimentare cu apă rece și caldă (I9)

### 2.1 Determinarea necesarului zilnic de apă

Necesarul de apă al unui mall regional cumulează consumuri de natură foarte diferită — public tranzitoriu, personal angajat, activități de alimentație publică, curățenie industrială și spații verzi — fiecare cu norma sa specifică de consum conform I9/STAS 1343:

- **Public** (norma pentru vizitatori de centru comercial, consum redus per persoană — vizite scurte, toalete, spălare mâini): 6.500 pers × 10 l/pers·zi = 65.000 l/zi
- **Personal angajat** (norma pentru personal cu program complet, incl. igienă și oficii): 900 pers × 40 l/pers·zi = 36.000 l/zi
- **Food-court** (norma pentru preparare/spălare vase per masă servită): 3.000 mese/zi × 25 l/masă = 75.000 l/zi
- **Hipermarket** (curățenie, vitrine, procesare alimentară proprie): 40.000 l/zi (valoare de bloc, specifică activității de hipermarket)
- **Curățenie generală galerie/spații comune**: 15.000 l/zi
- **Udare spații verzi**: 6.000 l/zi

**Total necesar mediu zilnic ≈ 237 mc/zi**

Suma acestor șase componente reflectă structura reală de consum a unui mall: peste jumătate din necesar (140 mc/zi din 237, adică ~59 %) provine din activitatea de alimentație publică (food-court + hipermarket), nu din vizitatorii galeriei propriu-zise — o particularitate esențială față de o clădire comercială fără componentă de restaurație, unde consumul specific ar fi de câteva ori mai mic.

### 2.2 Debitul de calcul (metoda echivalenților de debit)

Necesarul zilnic mediu nu este suficient pentru dimensionarea branșamentului și a rețelei interioare — este necesar **debitul de vârf instantaneu**, determinat prin metoda echivalenților de debit (E) ai obiectelor sanitare instalate, conform relației I9/STAS 1478 pentru clădiri publice cu utilizare intermitentă intensă:

**qc = a·√ΣE + 0,004·ΣE**

Pentru dotarea sanitară estimată a mall-ului (178 obiecte sanitare distribuite pe grupurile sanitare publice ale galeriei, pe fiecare nivel, cu asigurarea accesibilității PMR), suma echivalenților de debit rezultă **ΣE ≈ 3.200**:

qc = 0,20 × √3.200 + 0,004 × 3.200 = 0,20 × 56,57 + 12,80 = **11,3 + 12,8 = 24,1 l/s (86,4 mc/h)**

Această relație combină doi termeni cu semnificație fizică distinctă: termenul **0,20·√ΣE** reflectă probabilitatea statistică de funcționare simultană a unui număr mare de obiecte sanitare independente (crește doar cu rădăcina numărului de obiecte, nu liniar — pentru că este puțin probabil ca toate cele 178 de obiecte să funcționeze exact în aceeași secundă), în timp ce termenul **0,004·ΣE** adaugă o componentă proporțională cu numărul total de obiecte, corespunzătoare unui „fond" minim de consum continuu (spălări, robinete de serviciu). La un mall cu trafic intens și concentrat (ore de vârf seara și în weekend), acest debit de 24,1 l/s reprezintă vârful pe care rețeaua interioară și branșamentul trebuie să îl susțină fără cădere de presiune la obiectele cele mai defavorizate.

### 2.3 Branșamentul și protecția rețelei publice

Debitul de calcul de 86,4 mc/h, combinat cu necesitatea de **redundanță** (un mall nu își poate permite întreruperea alimentării cu apă pe durata unei intervenții la branșament, având în vedere impactul asupra grupurilor sanitare publice, a food-court-ului și a instalației de stingere care se completează din aceeași sursă), conduce la adoptarea unui **branșament dublu Dn 200**, fiecare linie dimensionată să preia integral debitul de calcul în caz de avarie/mentenanță a celeilalte. Pe fiecare linie se montează contor general, filtru și **dispozitiv de protecție antiretur tip BA** (disconnector cu zonă de presiune redusă controlabilă, conform SR EN 1717), obligatoriu la clădirile publice de mari dimensiuni unde rețeaua interioară include atât consumuri menajere cât și instalații tehnice (adaos la rezervorul de incendiu, hidrofor) care ar putea, în absența protecției, contamina prin refulare rețeaua publică.

### 2.4 Dotarea sanitară și repartiția pe niveluri

Cele **178 de obiecte sanitare** se distribuie pe grupurile sanitare publice ale galeriei (parter și fiecare etaj), pe zona food-court (grupuri dedicate, cu frecvență de utilizare mult mai mare decât media galeriei), pe zona cinema (grupuri la foaier, dimensionate pentru vârful de public dintre proiecții), pe zona de personal (grupuri BOH separate de cele publice) și pe grupurile PMR obligatorii la fiecare nivel, conform OMS 119/2014 și cerințelor de accesibilitate. Dimensionarea numărului de obiecte per grup respectă norma de 1 vas WC / 1 lavoar la un anumit număr de vizitatori pe oră de vârf (OMS 119), cu majorare pentru zona food-court (frecvență de utilizare mult mai mare, spălare mâini înainte de masă) și diferențiere pe sexe + grup unisex/familie + grup PMR, conform standardului actual pentru mall-uri regionale.

### 2.5 Apa caldă de consum (ACM)

Spre deosebire de o clădire de birouri sau rezidențială, unde prepararea ACM se face centralizat, la un mall regional soluția tehnic-economic optimă este **prepararea descentralizată**, corespunzătoare structurii de proprietate/chirie a spațiilor:

- **Food-court**: boilere proprii sau instalație de concesiune a operatorului de food-court (activitate cu consum ACM ridicat și program de funcționare diferit de restul galeriei);
- **Hipermarket**: sursă proprie de preparare ACM (integrată în instalația tehnică proprie a hipermarketului, care are propriul contract de utilități separat de restul mall-ului);
- **Grupurile sanitare ale galeriei**: boilere electrice locale, dimensionate pe fiecare grup sanitar, evitând astfel rețele lungi de recirculare ACM prin toată clădirea pentru un consum relativ mic și dispersat (spălare mâini).

**Necesarul total de ACM ≈ 40 mc/zi la 60 °C.**

Debitul de vârf de preparare, la un consum orar de vârf de 8 mc/h și un salt de temperatură ΔT = 50 K (de la 10 °C apă rece la 60 °C acumulare):

**Q_ACM = 8 mc/h × 1000 × 4,186 × 50 / 3600 = 465 kW**

Această putere de 465 kW reprezintă capacitatea instalată **cumulată** pe toate sursele descentralizate de preparare ACM (boilere food-court + boilere hipermarket + boilere locale GS), nu o singură centrală — coerent cu principiul descentralizării adoptat. Recircularea ACM se menține **≥ 55 °C** pe fiecare buclă locală (anti-Legionella), cu ciclu periodic de dezinfecție termică pentru boilerele cu regim intermitent (grupurile sanitare cu trafic redus în anumite ore).

### 2.6 Grupul de pompare (hidrofor) și presiunea de serviciu

Presiunea din rețeaua publică nu poate garanta, la clădiri de această înălțime și complexitate (S+P+2E, cu rezervele tehnice și instalațiile de incendiu la subsol), presiunea de serviciu necesară la obiectele sanitare cele mai defavorizate (etajul superior, punctele cele mai îndepărtate de branșament). Se adoptă un **grup de pompare (hidrofor) cu variator de turație (VSD)**, în configurație **3+1** (trei pompe active, una de rezervă — redundanță N+1 la nivelul fiecărei pompe active, esențială la un debit de vârf ridicat), cu parametri:

- **Debit**: 90 mc/h (peste debitul de calcul de 86,4 mc/h, cu marjă)
- **Presiune de refulare**: 55 mCA

Turația variabilă menține presiunea constantă la robinet indiferent de debitul instantaneu (de la un singur robinet deschis până la vârful de 90 mc/h), reducând totodată consumul electric la debite parțiale (conform legii afinității pompelor, puterea absorbită variază cu cubul turației) — soluție standard pentru clădiri comerciale mari, unde variația orară a consumului este foarte pronunțată (vârf seara/weekend, minim noaptea).

### 2.7 Contorizarea individuală a chiriașilor — arhitectura sistemului

La un mall cu 130-160 de unități comerciale, fiecare unitate reprezintă un contract de închiriere de sine stătător, cu chiriaș propriu, activitate proprie și, implicit, un profil de consum de apă complet diferit de vecinii săi — de la un chioșc de bijuterii cu consum de apă aproape nul, la un restaurant din food-court cu consum de zeci de ori mai mare. Repartizarea costurilor comune de apă pe cotă-parte din suprafața închiriată (soluție uzuală la clădirile de birouri cu profil de consum relativ omogen) ar fi, la un mall, profund inechitabilă și ar elimina orice stimulent economic pentru chiriași de a reduce risipa. De aceea, contorizarea individuală a consumului de apă rece și, acolo unde chiriașul are sursă proprie de ACM (cap. 2.5), a energiei termice aferente preparării ei, este o cerință de proiectare obligatorie, nu opțională, coerentă cu principiul general de la cap. 1.5.

Arhitectura sistemului de contorizare cuprinde trei niveluri: (1) **contorul general de branșament** (cap. 2.3), care măsoară consumul total al clădirii și se reconciliază periodic cu suma contoarelor individuale — o diferență sistematică între cele două valori (pierderi pe rețeaua comună, consum necontorizat la curățenie/udare spații verzi) este semnalul care declanșează verificarea etanșeității rețelei; (2) **contoare de branșament pe zone mari** (galerie, hipermarket, food-court, cinema), care permit izolarea rapidă a unei creșteri anormale de consum la nivelul unei singure zone funcționale, fără a aștepta agregarea din contoarele individuale; (3) **contorul individual al fiecărei unități comerciale**, montat obligatoriu **în exteriorul unității**, într-un cămin/nișă tehnică amplasată pe circulația comună (culoar tehnic de serviciu, cap. 1.5) — poziționare esențială, care permite citirea, verificarea metrologică periodică și eventuala intervenție de mentenanță **fără a fi necesar accesul în interiorul spațiului chiriașului** și fără a perturba activitatea comercială a acestuia.

Fiecare contor individual este de tip **cu emițător radio sau ieșire de impulsuri**, colectat de **concentratoare de etaj/zonă**, care agregă datele și le transmit, pe rețeaua de curenți slabi a clădirii (cap. 15.1/cap. 18), către **serverul central BMS** (cap. 15.2). Această transmisie automată elimină citirea manuală (impracticabilă la 130-160 de puncte de măsură, distribuite pe o suprafață de zeci de mii de metri pătrați) și permite generarea automată a facturii de cheltuieli comune (CAM) pentru fiecare chiriaș, precum și — element de valoare adăugată pentru administrația mall-ului — raportarea de consum în timp aproape real, utilă atât pentru chiriaș (care își poate monitoriza propriul consum și identifica scurgeri sau echipamente defecte), cât și pentru proprietar (care poate raporta indicatori de sustenabilitate — consum de apă per mp GLA — către investitori, cerință tot mai frecventă în certificarea de mediu a activelor comerciale).

Contoarele individuale se verifică metrologic la intervalele impuse de legislația metrologică în vigoare, iar înlocuirea/etalonarea se programează prin CMMS-ul FM (cap. 19.2), fără a necesita niciodată o oprire a alimentării întregii clădiri — fiecare cămin de contorizare este echipat cu **robineți de izolare amonte/aval**, care permit demontarea contorului individual fără a afecta alimentarea celorlalte unități. Același principiu de contorizare individuală, cu aceeași arhitectură de concentratoare/BMS, se aplică simetric și pe partea electrică (cap. 9.4) și pe partea de energie termică/frig (cap. 4.3), astfel încât fiecare chiriaș primește o factură de utilități transparentă, bazată integral pe consum măsurat, pe toate cele trei fluide (apă, energie termică/frig, energie electrică).

---

## 3. Canalizare menajeră, pluvială și separatoare de grăsimi/hidrocarburi

### 3.1 Canalizarea menajeră

Debitul de calcul al apelor uzate menajere se determină adăugând la debitul de apă rece de consum (24,1 l/s) un aport suplimentar de 2 l/s pentru descărcările specifice bucătăriilor food-court și proceselor de curățenie ale hipermarketului, rezultând:

**q = 24 + 2 = 26 l/s**

Coloanele verticale de canalizare menajeră sunt executate din **PP fonoabsorbant** (reducerea zgomotului de curgere, cerință importantă în vecinătatea unităților comerciale și a spațiilor publice unde zgomotul de instalații ar afecta experiența clienților), cu **ventilare primară și secundară** conform SR EN 12056, pentru menținerea gărzii hidraulice la toate obiectele sanitare, indiferent de simultaneitatea foarte ridicată a descărcărilor caracteristică orelor de vârf.

### 3.2 Separatoarele de grăsimi — rațiunea tehnică și de mediu

Zona de food-court a unui mall regional generează un volum semnificativ de ape uzate încărcate cu grăsimi și uleiuri de gătit, provenite din spălarea veselei, a echipamentelor de bucătărie și din procesele de preparare (fripturi, prăjeli, grill). Descărcarea directă a acestor ape în rețeaua publică de canalizare este interzisă din două motive convergente: (1) **motiv de mediu** — grăsimile saponifică și se depun pe pereții canalizării publice, provocând colmatări, mirosuri și, la vărsare în emisar, un film de suprafață care blochează reoxigenarea apei și afectează fauna acvatică; (2) **motiv tehnic-operațional** — depunerile de grăsime în rețeaua proprie a clădirii ar reduce secțiunea utilă a conductelor și ar necesita curățări frecvente, cu risc de refulare în spațiile de alimentație publică.

Dimensionarea separatorului de grăsimi se face conform **SR EN 1825**, pe baza relației:

**NS = Q_ape uzate · f_densitate · f_temperatură · f_detergent**

Pentru zona de food-court (debit specific de proces 12 l/s, cu factori de corecție 1,3 pentru densitatea grăsimilor animale/vegetale, 1,0 pentru temperatura normală de evacuare, și 1,3 pentru prezența detergenților care ar putea emulsiona grăsimea):

NS = 12 × 1,3 × 1,0 × 1,3 ≈ **20**

Se adoptă **2 separatoare NS 10** (redundanță și posibilitatea de mentenanță/vidanjare pe rând, fără întreruperea activității food-court-ului), la care se adaugă un **separator NS 7 dedicat hipermarketului** (bucătăria proprie de procesare — patiserie, rotiserie, secție carmangerie). Toate separatoarele sunt amplasate **subteran**, cu **alarmă de nivel transmisă la BMS** (semnalarea necesității de vidanjare înainte ca stratul de grăsime acumulat să reducă eficiența de separare sau să provoace refulări).

### 3.3 Canalizarea pluvială

Suprafața de acoperiș/terasă colectoare este de **~13.000 mp**. Cu o intensitate de calcul a ploii i = 300 l/s·ha (echivalent 0,03 l/s·mp, valoare uzuală conform STAS 1846 pentru o ploaie de scurtă durată/frecvență redusă) și un coeficient de scurgere φ = 1,0 (acoperiș/terasă impermeabilă):

**Q_p = 300 l/s·ha × 1,3 ha ≈ 390 l/s**

(unde 1,3 ha reprezintă suprafața de 13.000 mp exprimată în hectare, iar φ = 1,0 confirmă natura impermeabilă a terasei).

Un debit de 390 l/s pe o rețea gravitațională clasică ar necesita coloane de diametru foarte mare și pante importante, greu de integrat în plenumurile tehnice ale unei clădiri comerciale de suprafață mare cu multiple funcțiuni la fiecare nivel. Se adoptă de aceea un **sistem de canalizare pluvială sifonic** (funcționare în plin, fără aer, cu autoamorsare), care valorifică energia geodezică disponibilă (de la cota terasei la subsol) pentru a transporta debitul mare prin conducte de diametru relativ redus, montate fără pantă — soluție standard pentru acoperișurile mari ale centrelor comerciale.

**Bazinul de retenție și limitarea debitului evacuat:** avizul de gospodărire a apelor limitează uzual debitul descărcat în rețeaua publică/emisar la o valoare mult sub debitul de calcul instantaneu (< 100 l/s pentru amplasamentul dat), pentru a nu supraîncărca rețeaua publică de canalizare pluvială în timpul ploilor intense. Se prevede astfel un **bazin de retenție (atenuare) de ~250 mc**, echipat cu regulator de debit (orificiu calibrat/vortex), care stochează temporar diferența dintre debitul de calcul (390 l/s) și debitul admis la evacuare (< 100 l/s), eliberând-o lent după încetarea ploii.

### 3.4 Separatorul de hidrocarburi al platformelor exterioare

Apele pluviale colectate de pe platformele carosabile exterioare (parcaj suprateran, drumuri de incintă, rampa de marfă) conțin urme de hidrocarburi (scurgeri de ulei, combustibil, particule din frânare/anvelope) provenite din traficul auto intens al unui mall cu 1.750 de locuri de parcare. Aceste ape **nu pot fi descărcate direct** în rețeaua pluvială/emisar fără tratare, fiind necesară trecerea printr-un **separator de hidrocarburi cu decantor, clasa I (cu filtru coalescent), dimensionat NS 65**, care reține produsele petroliere sub limita admisă de reglementările de mediu (< 5 mg/l la evacuare) — cerință obligatorie pentru avizul ANAR/APM și pentru protecția emisarului final.

### 3.5 Grupul de pompare pentru canalizarea de la cotele inferioare

Zonele tehnice și de servicii amplasate sub cota de refulare gravitațională a rețelei publice (spații tehnice de la cota cea mai joasă a subsolului) necesită **pompare** — stație de pompare ape uzate cu tocător, în configurație redundantă (minimum 2 pompe, funcționare alternantă cu cuplare simultană la debit mare), cu alarmă de nivel maxim transmisă către BMS, integrată în sistemul general de monitorizare tehnică al mall-ului (cap. 15).

### 3.6 Aprofundare — managementul apelor pluviale pe suprafețe extinse și strategii complementare de atenuare

Volumul de 250 mc al bazinului de retenție (cap. 3.3) rezultă dintr-un calcul al diferenței dintre debitul de calcul instantaneu (390 l/s) și debitul admis la evacuare (< 100 l/s), pe durata ploii de proiectare — însă dimensionarea completă, la faza de Proiect Tehnic, trebuie să integreze și efectele schimbărilor climatice asupra intensității ploilor de scurtă durată. Observațiile hidrologice recente pentru regiunile climatice ale României indică o creștere a intensității ploilor de proiectare cu frecvență redusă de ordinul 15-20 % față de seriile istorice utilizate la elaborarea STAS 1846 — motiv pentru care se recomandă, la faza de PT, aplicarea unui **coeficient de siguranță climatică de 1,2** asupra debitului de calcul (390 l/s × 1,2 ≈ 468 l/s), majorând corespunzător volumul necesar al bazinului de retenție și dimensiunea regulatorului de debit, pentru a evita subdimensionarea sistemului pe durata de viață a clădirii.

Bazinul de retenție nu este un simplu rezervor pasiv — el integrează un **bazin decantor (forebay) amonte**, care reține sedimentele grosiere (frunze, nisip antrenat de pe terasă și platformele exterioare) înainte ca apa să ajungă la regulatorul de debit calibrat, prevenind colmatarea acestuia; un **preaplin de siguranță**, dimensionat pentru o ploaie cu frecvență de depășire a capacității de proiectare (eveniment extrem, peste perioada de recurență avizată de gospodărirea apelor), care deversează controlat către un traseu de evacuare de urgență, fără a inunda parcajul subteran sau spațiile tehnice; și **telemetrie de nivel**, transmisă la BMS (cap. 15.2), care alertează echipa FM (cap. 19) cu suficient timp înainte pentru verificarea regulatorului de debit sau pentru golirea programată înaintea unei prognoze de precipitații abundente.

Complementar bazinului de retenție subteran, proiectul integrează măsuri de tip **SUDS (Sustainable Urban Drainage Systems)** la nivelul amenajărilor exterioare: **pavaje permeabile** pe o parte a platformelor de parcare suprateran (acolo unde sarcina de trafic o permite), care reduc scurgerea directă și favorizează infiltrarea parțială în sol, descărcând astfel bazinul de retenție de un volum suplimentar; **rigole vegetate (bioswale)** de-a lungul aleilor pietonale exterioare, care asigură o primă treaptă de filtrare naturală a apei pluviale colectate de pe suprafețele pietonale (mai puțin încărcate cu hidrocarburi decât platforma carosabilă, dar totuși cu sediment fin); și, acolo unde arhitectura terasei o permite, o suprafață limitată de **acoperiș verde extensiv**, care reține o parte din precipitațiile de intensitate mică-medie direct la sursă, reducând vârful de debit transmis către sistemul sifonic (cap. 3.3) și oferind, suplimentar, un beneficiu de reducere a efectului de insulă de căldură urbană pe suprafața mare de terasă a mall-ului (~13.000 mp).

Separatorul de hidrocarburi al platformelor exterioare (cap. 3.4) se integrează, la rândul lui, în lanțul de tratare **înaintea** intrării apei în bazinul de retenție — ordinea este esențială: dacă apa cu urme de hidrocarburi ar intra netratată în bazinul de retenție, orice peliculă reziduală s-ar acumula pe suprafața de retenție, cu risc de descărcare necontrolată la evacuarea lentă a bazinului. Mentenanța separatorului (verificarea grosimii peliculei acumulate, vidanjarea) se programează prin CMMS (cap. 19.2), pe baza senzorului de nivel al peliculei de hidrocarburi montat în interiorul separatorului, coerent cu principiul de alarmă automată aplicat și separatoarelor de grăsimi (cap. 3.2).

---

## 4. Instalații termice — sursă și distribuție

### 4.1 Necesarul de căldură

Necesarul termic total al mall-ului rezultă din însumarea a cinci componente, fiecare cu o pondere semnificativă în bilanțul global:

- **Preîncălzirea aerului proaspăt** (CTA-urile care tratează aerul de ventilare al galeriei, unităților, food-court-ului și cinema): **3.200 kW**
- **Galerie/atrium** (compensarea pierderilor prin anvelopa vitrată de mari dimensiuni și prin volumul necompartimentat al atriumului): **850 kW**
- **Spații tehnice/BOH**: **450 kW**
- **ACM** (vezi cap. 2.5): **465 kW**
- **Rezervă** (marjă de proiectare pentru condiții climatice extreme și pentru extinderi viitoare): **335 kW**

**Total necesar ≈ 5,3 MW**

Ponderea dominantă a preîncălzirii aerului proaspăt (3.200 kW din 5.300 kW, adică ~60 %) confirmă faptul că, la un mall cu populație mare și cerințe ridicate de calitate a aerului interior, sarcina termică este guvernată în principal de necesarul de ventilare (cap. 5), nu de pierderile prin anvelopă — spre deosebire de o clădire rezidențială, unde raportul este invers.

### 4.2 Sursa termică mixtă

Se adoptă o **sursă mixtă**, care combină avantajele complementare a două tehnologii:

- **Pompe de căldură aer-apă/apă-apă, ~2,8 MW** — sursă cu eficiență ridicată (COP 3,4), care poate funcționa **reversibil** (producând și frig, vezi cap. 8), valorificând complementaritatea sezonieră a cererii de energie termică și frigorifică a unui mall;
- **Cazane de condensație pe gaz, 2×1.400 kW ≈ 2,8 MW** — sursă de vârf/rezervă, care preia sarcina în perioadele de ger extrem (când COP-ul pompelor de căldură scade sub pragul economic) și asigură **redundanța** necesară pentru continuitatea încălzirii unei clădiri publice de mari dimensiuni.

Suma celor două surse (2,8 + 2,8 = 5,6 MW) acoperă necesarul de 5,3 MW cu o marjă de redundanță — configurația permite funcționarea la capacitate integrală chiar și cu una dintre surse indisponibilă (mentenanță/avarie), ceea ce este esențial pentru o clădire care nu își poate permite întreruperea încălzirii/climatizării pe durata orelor de funcționare.

### 4.3 Distribuția termică

Sursele sunt cuplate hidraulic printr-o **butelie de egalizare** (decuplaj hidraulic între circuitul primar al surselor și circuitele secundare de consum) și un **distribuitor multi-circuit**, de la care pleacă circuitele secundare, fiecare echipat cu **pompe de circulație cu turație variabilă (VSD)**:

- Regim **70/55 °C** pe circuitul alimentat de cazanele de condensație (regim clasic de temperatură medie);
- Regim **45/40 °C** pe circuitul pompelor de căldură/CTA (temperatură joasă, optimă pentru COP-ul ridicat al pompelor de căldură și pentru bateriile CTA cu suprafață mare de schimb).

Fiecare unitate comercială din galerie primește un **racord propriu** din rețeaua de distribuție, echipat cu **contorizare individuală a energiei termice** (esențială pentru repartizarea costurilor comune între chiriași — vezi principiul de la cap. 1.5), cu **vană de reglaj pe 2 căi** și **compensare după temperatura exterioară** (curba de reglaj adaptează temperatura de tur în funcție de temperatura exterioară măsurată, optimizând consumul).

Galeria propriu-zisă (spațiul comun, nu unitățile închiriate) este încălzită prin **aer cald livrat din CTA**, completat de **cortine de aer** la toate intrările principale — o măsură obligatorie fizic: fără cortine de aer, deschiderea permanentă a ușilor de acces (trafic pietonal intens, continuu) ar crea un flux necontrolat de aer rece/cald care ar anula eficiența întregii instalații de climatizare a galeriei și ar crea disconfort (curenți de aer) în zona de intrare.

---

## 5. Ventilare și climatizare — HVAC eterogen pe funcțiuni

### 5.1 Necesarul de aer proaspăt

Conform SR EN 16798-1 (categoria II), pentru spațiile de galerie cu ocupare densă se aplică un debit specific de **12,5 l/s·persoană**. Aplicat la populația de calcul (cap. 1.2):

**Q = 7.000 pers × 45 (l/s·pers... convertit) = 315.000 mc/h**

(mai precis: 7.000 pers × 12,5 l/s·pers = 87.500 l/s = 315.000 mc/h — debitul minim de aer proaspăt cerut de normă pentru asigurarea calității aerului la populația de calcul).

La acest debit minim de aer proaspăt se adaugă debitul de recirculare necesar pentru climatizare (tratarea sarcinii termice sensibile — cap. 5.4), rezultând un **debit total de aer tratat de ~550.000-600.000 mc/h**, distribuit prin cele **18 centrale de tratare a aerului (CTA)** descrise mai jos.

### 5.2 Configurația celor 18 CTA

Fiecare zonă funcțională a mall-ului are cerințe de aer complet diferite — nu doar ca debit, ci și ca regim de filtrare, umiditate, recuperare de căldură și program orar de funcționare — motiv pentru care soluția tehnică corectă este **zonarea completă a tratării aerului pe funcțiuni**, cu CTA dedicate:

| Zonă | Configurație | Debit total |
|---|---|---|
| Galerie | 6 × 45.000 mc/h | 270.000 mc/h |
| Hipermarket | 3 × 30.000 mc/h | 90.000 mc/h |
| Food-court | 2 × 25.000 mc/h | 50.000 mc/h |
| Cinema | 3 × 20.000 mc/h | 60.000 mc/h |
| Tehnic/BOH | 4 × 8.000 mc/h | 32.000 mc/h |
| **Total** | **18 CTA** | **≈ 502.000 mc/h** |

Toate CTA-urile sunt echipate cu **recuperatoare de căldură cu roți entalpice** (recuperare atât sensibilă cât și latentă — umiditate), cu eficiență **η ≥ 73 %** conform pragului minim impus de Regulamentul EU 1253/2014 pentru unitățile de ventilare de această capacitate. Componentele comune ale fiecărei CTA includ **ventilatoare de tip EC** (cu comutație electronică, eficiență energetică superioară motoarelor asincrone clasice și posibilitate de reglaj fin al turației — putere specifică SFP ≤ 1,6 kW/(mc/s)), **filtrare ePM1 55-60 %** (reținerea particulelor fine, relevantă în special pentru galeria cu trafic pietonal intens care aduce praf din exterior), **baterii de încălzire/răcire** și **atenuatoare de zgomot** (pentru menținerea unui nivel de zgomot compatibil cu experiența comercială).

### 5.3 Unitățile comerciale (galerie)

Fiecare unitate din galerie primește **aer proaspăt tratat din CTA-urile galeriei**, distribuit prin rețea **VAV (Variable Air Volume) cu contorizare individuală** — soluție care permite chiriașului să regleze debitul de aer proaspăt în funcție de ocuparea reală a spațiului său (magazin gol vs. magazin la vârf de trafic), reducând consumul global. Climatizarea proprie a fiecărei unități (tratarea sarcinii termice interne — vitrine, iluminat, echipamente, public) se face independent, prin **VCV (volum constant de aer, tratat local) central** pentru unitățile mici/medii sau prin **VRF (Volum Refrigerant Variabil) de capacitate mare** pentru unitățile ancoră/mari. Ambele componente (aer proaspăt + climatizare proprie) sunt **contorizate individual**, coerent cu principiul de la cap. 1.5.

### 5.4 Food-court — evacuarea fumului de gătit

Zona de food-court are cerințe HVAC radical diferite de restul galeriei, dictate de procesul de preparare a hranei: fiecare modul de restaurație generează **fum de gătit** (particule de grăsime în suspensie, vapori, mirosuri), care trebuie captat la sursă și evacuat, fără a se propaga către zonele publice ale mall-ului. Soluția adoptată:

- **Hote profesionale** deasupra fiecărei linii de gătit, echipate cu **filtre + tratament UV/electrostatic** (descompunerea moleculelor de grăsime din fum, reducerea mirosului evacuat la exterior — cerință tot mai frecventă în avizele de mediu urban);
- **Canal de evacuare a grăsimilor din inox** (rezistent la depuneri de grăsime și ușor de curățat/inspectat — cerință de siguranță la incendiu, întrucât canalele de grăsime necurățate sunt o cauză frecventă de incendii în zonele de food-court);
- **Ventilator de evacuare F400** (rezistent la 400 °C timp de 2 ore) — dacă grăsimea acumulată în canal ia foc, ventilatorul trebuie să continue să funcționeze suficient timp pentru a evacua controlat gazele fierbinți, fără a alimenta însă focul cu aer suplimentar necontrolat;
- **Aport de aer proaspăt (make-up air) de 85 % din debitul evacuat**, încălzit iarna — proiectat pentru a menține o **depresiune ușoară** în zona de gătit față de galeria adiacentă, împiedicând astfel migrarea mirosurilor de gătit către spațiile comerciale învecinate (efect de „barieră aeraulică" prin diferența de presiune).

**Debitul total de exhaustare food-court ≈ 90.000 mc/h.**

### 5.5 Cinema — calitatea aerului la sală plină

Sălile de cinema reprezintă cea mai exigentă cerință de calitate a aerului din întregul mall: **public dens, imobil, pe durată lungă (90-150 minute), în întuneric**, unde disconfortul termic sau acumularea de CO₂ ar fi resimțit imediat și ar afecta experiența vizionării. Soluția tehnică adoptată:

- **Ventilare de tip displacement** (introducere de aer proaspăt la partea inferioară a sălii, la viteză redusă și temperatură ușor sub cea a aerului ambiant, cu evacuare la partea superioară) — sistemul valorifică convecția naturală generată de căldura corpului uman pentru a ridica aerul viciat, cu eficiență de ventilare superioară amestecului clasic;
- **Debit specific de 8,5 l/s·loc**;
- **Reglaj VAV pe senzor de CO₂** — debitul se modulează în funcție de gradul real de ocupare al sălii (o proiecție cu 30 % ocupare nu necesită același debit ca o proiecție „sold-out"), cu economie de energie semnificativă în afara orelor de vârf.

La capacitatea nominală de 1.600 locuri:

**Q = 1.600 loc × 8,5 l/s·loc × 3,6 = 48.960 mc/h**

### 5.6 Zonarea termică și controlul de confort

Fiecare zonă funcțională (galerie, hipermarket, food-court, cinema, unități) constituie o **zonă termică independentă**, cu senzori proprii de temperatură/CO₂/umiditate conectați la BMS, permițând reglaje diferențiate: galeria funcționează pe un program continuu (orele de deschidere ale mall-ului), sălile de cinema pornesc ventilarea intensivă doar în intervalul dintre proiecții succesive (pre-ventilare pentru eliminarea CO₂ acumulat de la proiecția anterioară), iar food-court-ul menține exhaustarea hotelor active doar pe durata programului de gătit activ.

### 5.7 Modelul de climatizare al unităților — sistem central inclus în chirie versus VRF propriu al chiriașului

Dimensionarea CTA-urilor și repartiția pe zone descrisă la cap. 5.2-5.3 tratează tratarea aerului proaspăt — o componentă comună tuturor unităților, asigurată integral din centralele galeriei. Climatizarea propriu-zisă a fiecărei unități comerciale (tratarea sarcinii termice interne — vitrine luminate, echipamente electronice, public), însă, se poate realiza, la un mall regional, prin **două modele contractuale distincte**, iar decizia asupra modelului aplicat fiecărei unități se ia de regulă la momentul negocierii contractului de închiriere, nu la faza de DTAC — motiv pentru care proiectul de instalații trebuie să **rezerve fizic capacitatea pentru ambele modele**, fără a bloca opțiunea comercială a mall-ului.

**Modelul A — climatizare centralizată, inclusă în serviciile comune (chirie/service charge).** Fiecare unitate primește, la limita de proprietate (lot line), un **racord de agent termic (apă rece/apă caldă)** din rețeaua secundară a chillerelor (cap. 8.2) și a pompelor de căldură (cap. 4.2), cu **contorizare individuală de energie** (cap. 2.7/4.3), pe care chiriașul montează propriile **baterii de ventiloconvectoare (fan-coil)** în interiorul spațiului închiriat. Avantajele acestui model sunt: **cost de capital mai redus per unitate** (chiriașul nu investește într-un sistem complet de producere a frigului/căldurii, ci doar în unitățile terminale), **omogenitate termică la nivelul întregii galerii** (temperatura de tur/retur este controlată central, cu variații mici între unități), și **eficiență globală superioară** (chillerele centrale, de capacitate mare, funcționează la randamente EER/COP superioare unor echipamente individuale mici, iar diversitatea de sarcină între unități — unele goale, altele la vârf — se compensează la nivelul întregii instalații centrale). Dezavantajul principal este o **flexibilitate redusă** pentru chiriașul cu un profil de sarcină atipic (de exemplu, o unitate cu echipamente electronice generatoare de căldură foarte mare, care ar solicita o capacitate disproporționată din rețeaua secundară comună).

**Modelul B — climatizare individuală prin sistem VRF propriu al chiriașului.** Unitatea este echipată cu **unități exterioare VRF proprii**, amplasate pe terasă, într-o **zonă tehnică rezervată la faza de DTAC** (cu structura dimensionată pentru încărcarea suplimentară a echipamentelor și cu circuit electric separat, contorizat individual — cap. 9.4), conectate prin conducte de agent frigorific la unitățile interioare din spațiul comercial. Avantajele modelului sunt **controlul complet și independent** al chiriașului asupra propriului regim de climatizare (program orar propriu, temperatură de consemn proprie, fără a depinde de reglajul central), **facturare directă și transparentă a propriului consum electric** (contorizat separat, fără a trece prin costurile comune) și **flexibilitate mai mare la reconfigurarea comercială a unității** (un chiriaș nou poate înlocui/redimensiona propriul sistem VRF fără a interveni pe rețeaua secundară comună a mall-ului). Dezavantajele sunt **aglomerarea vizuală și tehnică a terasei** (zeci de unități exterioare individuale, cu impact asupra esteticii terasei și asupra amplasării panourilor fotovoltaice, cap. 16.2, care trebuie coordonată la faza de PT), **zgomotul cumulat** al multiplelor unități exterioare (necesită verificare acustică la limita de proprietate și, eventual, ecrane fonoabsorbante) și **complexitatea rețelei de condens**, care trebuie colectată de la fiecare unitate interioară și dirijată către canalizarea pluvială sau menajeră (cap. 3), evitând scurgerile necontrolate pe tavanele galeriei.

În practica de proiectare a mall-urilor regionale, cele două ancore majore care ies din discuție de la bun început sunt **hipermarketul** și **cinematograful**: ambele au sisteme dedicate, tratate integral la cap. 5.4-5.5 și cap. 8, complet independente de oricare dintre cele două modele de mai sus, dat fiind caracterul lor de proces (frig alimentar) sau de exigență acustică/confort ridicată (săli de proiecție). Pentru restul galeriei, alegerea între Modelul A și Modelul B se face de regulă în funcție de suprafața unității: **unitățile mici și medii (sub ~150 mp)** optează în mod uzual pentru Modelul A (climatizare inclusă, simplitate a fit-out-ului, cost de capital redus pentru un chiriaș cu suprafață mică), iar **unitățile mari, ancorele secundare de galerie (peste ~150-200 mp)**, cu profil de sarcină propriu și putere de negociere contractuală mai mare, optează frecvent pentru Modelul B (VRF propriu, control independent). Proiectul de instalații de la faza de DTAC prevede, prin urmare, **atât rețeaua secundară de agent termic cu racorduri la fiecare lot line, cât și rezerva de spațiu/structură/electrică pe terasă pentru unitățile exterioare VRF**, lăsând decizia finală, unitate cu unitate, la faza de comercializare (leasing) a mall-ului.

---

## 6. Ventilarea și desfumarea parcajului subteran — principiul jet-fan (NP 127/2009)

### 6.1 De ce jet-fan și nu tubulatură clasică

Parcajele subterane de mari dimensiuni (22.000 mp Su, în cazul de față) ridică o problemă geometrică fundamentală pentru ventilarea clasică prin tubulatură: distribuirea uniformă a aerului pe o suprafață atât de mare, cu o rețea de conducte rectangulare/circulare de dimensiuni mari, ar necesita **înălțime de plafon suplimentară substanțială** (tubulatura principală pentru un debit de zeci de mii de mc/h are secțiuni de ordinul a 1 mp), incompatibilă cu înălțimea liberă necesară pentru circulația autovehiculelor și cu economia de construcție a parcajului subteran.

**Principiul jet-fan** rezolvă această problemă printr-o abordare complet diferită: în locul unei rețele de conducte care transportă aerul de la o sursă centrală la fiecare punct al parcajului, se montează **ventilatoare axiale de mici dimensiuni (jet-fans), suspendate direct de plafonul parcajului**, dispuse în șiruri de-a lungul culoarelor de circulație. Fiecare jet-fan **nu introduce sau evacuează aer dintr-o sursă externă** — el pur și simplu **accelerează și direcționează masa de aer deja existentă în parcaj**, „împingând-o" de-a lungul culoarului, ca o serie de relee, către **puțurile de evacuare** amplasate la capetele zonelor de parcare. Aerul proaspăt intră pasiv (prin rampe, guri de introducere joase) acolo unde presiunea scade, iar aerul viciat/fumul este condus activ, prin efectul cumulat al șirurilor de jet-fans, către punctele de evacuare mecanică. Avantajele acestei soluții față de tubulatura clasică sunt: **eliminarea completă a canalelor de aer** (economie de înălțime liberă și de cost de execuție), **flexibilitate la reconfigurarea parcajului** (jet-fans se pot repoziționa relativ ușor dacă se schimbă traseele de circulație) și **eficiență energetică superioară** la distanțe mari (fiecare jet-fan lucrează pe o distanță scurtă, nu pe toată lungimea parcajului).

### 6.2 Regimul de exploatare curentă

Ventilarea de exploatare (curentă, non-incendiu) funcționează la **6 schimburi/oră**, comandată automat de **senzori de CO** distribuiți pe suprafața parcajului:

- **Prag de alarmă/pornire ventilare**: 30 ppm CO;
- **Prag de evacuare/ventilare maximă**: 100 ppm CO;
- Se adaugă supraveghere **NO₂** (indicator specific pentru motoarele diesel, tot mai relevante odată cu creșterea ponderii vehiculelor diesel/hibride în parc).

Această comandă pe senzori (nu pe program orar fix) permite parcajului să funcționeze cu ventilare minimă/oprită în orele de trafic redus (noaptea) și să intensifice ventilarea automat doar când concentrația reală de monoxid de carbon (rezultată din traficul auto efectiv prezent) o cere — soluție esențială pentru economia de energie a unei suprafețe de parcare de 22.000 mp, unde o ventilare permanentă la debit maxim ar fi risipitoare.

### 6.3 Regimul de desfumare (incendiu)

La detecția unui incendiu, jet-fans-urile (cele care sunt certificate **F400**, rezistente la 400 °C) comută la **regimul de desfumare**, cu rol dublu: evacuarea fumului din compartimentul afectat și, simultan, **menținerea vizibilității și a unui strat de aer respirabil** pe traseele de evacuare ale persoanelor și de intervenție ale pompierilor. Compartimentarea de fum a parcajului respectă limita de **≤ 2.600 mp/compartiment**, cu un regim de desfumare de **3-6 volume/oră** pe compartimentul afectat — valori care asigură evacuarea fumului generat de un incendiu de amploare tipică unui autoturism sau a câtorva locuri de parcare adiacente, în timp util pentru evacuarea persoanelor și intervenția ISU.

---

## 7. Desfumarea atriumului — sistem SHEVS (SR EN 12101)

### 7.1 Atriumul ca „rezervor de fum" — problema fizică

Atriumul central pe 3 niveluri, cu luminator zenital, este elementul arhitectural definitoriu al galeriei — dar reprezintă și **cel mai mare risc de propagare a fumului** din întreaga clădire. Fizic, un incendiu izbucnit la orice nivel adiacent atriumului (o unitate comercială, un stand din galerie) va genera un **jet de fum ascendent (plume)** care, în absența unui compartimentări etanșe, se ridică liber prin golul atriumului și se acumulează sub luminatorul zenital, formând un **strat de fum cald** care coboară progresiv pe măsură ce volumul de fum generat crește. Dacă acest strat de fum ar coborî sub cota ultimului nivel ocupat, ar bloca simultan **vizibilitatea căilor de evacuare de pe toate cele 3 niveluri** (nu doar de la nivelul incendiat) — motiv pentru care desfumarea atriumului este calificată drept elementul **cel mai critic** al întregii securități la incendiu a mall-ului.

Volumul atriumului (~35.000 mc) trebuie menținut cu un **strat de aer liber (curat) de minimum 2,5 m deasupra ultimului nivel ocupat** — condiție care impune evacuarea mecanică a fumului acumulat cu un debit suficient pentru a compensa producția continuă de fum a incendiului de proiectare.

### 7.2 Focul de proiectare și breviarul de calcul al debitului de desfumare

Conform metodologiei consacrate pentru atriumuri (derivată din NFPA 92/BS 7346 și adoptată în proiectarea românească curentă în lipsa unei metode naționale complete pentru volume atât de mari), se adoptă un **foc de proiectare cu puterea calorimetrică (HRR) de 5 MW**, din care componenta convectivă (căldura care generează efectiv ridicarea plumei de fum, restul fiind radiație) este **Qc = 3.500 kW**, la o **înălțime de ridicare a plumei Y = 12 m** (distanța de la focarul de la nivelul parterului până la stratul de fum acumulat sub luminator).

Debitul masic de fum generat prin antrenarea aerului în plumă se calculează cu relația consacrată:

**ṁ = 0,071 · Qc^(1/3) · Y^(5/3) + 0,0018 · Qc**

ṁ = 0,071 × 3.500^(1/3) × 12^(5/3) + 0,0018 × 3.500

Calculând termen cu termen: 3.500^(1/3) ≈ 15,18; 12^(5/3) ≈ 62,9; primul termen = 0,071 × 15,18 × 62,9 ≈ **67,9 kg/s**; al doilea termen = 0,0018 × 3.500 = **6,3 kg/s**.

**ṁ = 67,9 + 6,3 ≈ 74 kg/s**

Această valoare reprezintă masa de fum (aer antrenat + produse de ardere) care trebuie evacuată în fiecare secundă pentru a stabiliza stratul de fum la înălțimea de proiectare. Pentru a converti debitul masic în debit volumic (necesar pentru dimensionarea ventilatoarelor), se ia în calcul **densitatea fumului la temperatura sa de proiectare, 300 °C** (ρ ≈ 0,62 kg/mc, mult mai redusă decât densitatea aerului la temperatura ambiantă, ca urmare a dilatării termice):

**V̇ = ṁ / ρ = 74 / 0,62 ≈ 119 mc/s = 428.000 mc/h**

### 7.3 Configurația echipamentelor de desfumare

Un debit de 428.000 mc/h este extrem de mare pentru un singur echipament — se adoptă de aceea **4 ventilatoare de desfumare F400 amplasate pe terasă** (deasupra luminatorului zenital, poziție care valorifică natural tendința de ridicare a fumului cald), fiecare cu capacitate de **110.000 mc/h**, dintre care **unul este de rezervă** (redundanță N+1 — pierderea unui ventilator din cele 4 active nu compromite capacitatea totală de desfumare sub pragul critic). Compensarea aerului evacuat se face prin **aer proaspăt introdus la parter** (guri joase, uși/grile de compensare), dimensionat astfel încât **viteza aerului de compensare să rămână sub 5 m/s** — un prag esențial: viteze mai mari ar perturba stratul de fum stabil de deasupra, antrenând fum suplimentar în zona ocupată de persoanele aflate în evacuare, anulând astfel eficiența desfumării.

Suplimentar, se prevăd **cortine de fum (drencere/ecrane de fum) DH60** pe fiecare nivel, la marginea golurilor atriumului — acestea limitează fizic extinderea laterală a plumei de fum, împiedicând-o să se răspândească necontrolat pe suprafața fiecărui etaj înainte de a ajunge la ventilatoarele de evacuare de pe terasă, și mențin astfel coerența modelului de calcul (plumă concentrată, nu difuză).

### 7.4 Comanda și verificarea sistemului

Sistemul de desfumare a atriumului se comandă **automat**, de la sistemul de detecție a incendiului (declanșare imediată la confirmarea alarmei din zona atriumului sau din unitățile adiacente), cu posibilitate de **comandă manuală de la panoul pompierilor** (control complet al echipei de intervenție asupra desfumării, inclusiv oprire/pornire manuală în funcție de evoluția reală a incendiului). Alimentarea electrică a celor 4 ventilatoare se face din **sursa de siguranță** (grup electrogen, cap. 10) — o cădere a rețelei publice de energie nu poate întrerupe niciodată desfumarea atriumului. Dat fiind caracterul critic și complexitatea geometrică a atriumului (volum mare, luminator zenital, interacțiune cu galeriile adiacente), soluția de desfumare adoptată la nivel de DTAC se **verifică obligatoriu prin simulare CFD (Computational Fluid Dynamics)** la fazele de Proiect Tehnic și Detalii de Execuție, confirmând menținerea stratului liber de 2,5 m și absența recirculării fumului către zonele ocupate, pentru geometria reală (finală) a atriumului și a galeriilor adiacente.

---

## 8. Instalații de frig — confort și frig alimentar

### 8.1 Frigul de confort

Necesarul de frig pentru climatizarea de confort a mall-ului însumează contribuția fiecărei zone funcționale, reflectând densitatea de ocupare și sarcina termică specifică:

| Zonă | Frig (kW) |
|---|---|
| Galerie/atrium | 2.100 |
| Hipermarket (climatizare, nu frig alimentar) | 700 |
| Food-court | 900 |
| Cinema | 650 |
| Unități | 1.500 |
| **Total frig confort** | **≈ 5,85 MW** |

### 8.2 Sursa de frig de confort

Se adoptă **3 chillere de 1.400 kW** fiecare, funcționând cu **agenți frigorifici cu GWP redus (R1234ze sau R513A)** — alegere impusă de tendința de eliminare treptată a agenților frigorifici cu potențial ridicat de încălzire globală (F-Gas Regulation), cu performanțe:

- **EER ≥ 3,2** (eficiență în regim de răcire);
- **SEER ≥ 5,5** (eficiență sezonieră, care include beneficiul funcționării la sarcină parțială în afara vârfurilor de vară);
- Capacitate de **free-cooling** — utilizarea aerului exterior rece (nopți de vară, semisezon) pentru asistarea/înlocuirea parțială a compresoarelor.

Suplimentar, **pompele de căldură reversibile (cap. 4.2), ~1.500 kW** în regim de răcire, contribuie la acoperirea sarcinii de frig — aceeași sursă care asigură încălzirea iarna produce frig vara, valorificând investiția în echipament pe tot parcursul anului. Respingerea de căldură se face prin **dry-coolere/turnuri de răcire**, echipate cu tratament **anti-Legionella** (biocid + monitorizare periodică, obligatoriu la turnurile evaporative din clădirile publice).

### 8.3 Frigul alimentar al hipermarketului — un sistem complet distinct

Frigul alimentar al hipermarketului **nu este climatizare** — este un sistem de proces, dedicat conservării mărfurilor perisabile în vitrine frigorifice și camere frigorifice, cu cerințe de temperatură mult mai severe și cu regim de funcționare continuu (24/24, indiferent de programul de deschidere al mall-ului). Necesarul este de **~1,2 MW**, defalcat pe două nivele de temperatură:

- **Medie temperatură (MT), +2/+4 °C**: 750 kW (produse lactate, mezeluri, băuturi, legume-fructe);
- **Joasă temperatură (LT), −22 °C**: 450 kW (produse congelate).

Soluția adoptată este un sistem **CO₂ transcritic (R744)** — o tehnologie cu agent frigorific natural (dioxid de carbon), din ce în ce mai răspândită la hipermarketuri europene ca răspuns la restricțiile privind agenții frigorifici de sinteză cu GWP ridicat (istoric utilizați în frigul comercial). Sistemul CO₂ transcritic prezintă un avantaj suplimentar esențial pentru bilanțul energetic al mall-ului: **recuperarea de căldură** din procesul de compresie — „gazul cald" rezultat din comprimarea CO₂ la ieșirea din compresoare are o temperatură suficient de ridicată pentru a fi valorificat direct în prepararea ACM sau în încălzirea unor spații (60-70 °C), reducând corespunzător sarcina cerută de la sursa termică principală (cap. 4). Această recuperare este posibilă tocmai pentru că un hipermarket are nevoie simultană și continuă de frig (pentru conservare) și de căldură (pentru încălzire/ACM) — o sinergie termodinamică pe care instalația de frig alimentar o valorifică activ, nu doar pasiv.

**Vitrinele cu uși** (față de vitrinele deschise clasice) reduc suplimentar consumul de frig alimentar cu **30-40 %** — prin eliminarea schimbului convectiv permanent cu aerul cald al galeriei, o sursă majoră de pierdere de frig la vitrinele deschise tradiționale.

---

## 9. Instalații electrice — curenți tari, posturi de transformare MT/JT

### 9.1 De ce este necesară alimentare proprie în medie tensiune

Un consum electric instalat de ordinul **8,0 MW** depășește cu mult capacitatea unui branșament de joasă tensiune obișnuit (limitat practic la câteva sute de kW, corespunzător unei clădiri comerciale mici sau unui bloc rezidențial). La această scară de putere, singura soluție tehnic-economică viabilă este **alimentarea în medie tensiune (MT, 20 kV) proprie**, cu **posturi de transformare (PT) în interiorul incintei**, care coboară tensiunea la 0,4 kV imediat lângă punctele de consum. Motivele fizice ale acestei alegeri sunt duble: (1) transportul unei puteri de 8 MW în joasă tensiune ar necesita **curenți de ordinul a 12.000 A**, imposibil de vehiculat prin cabluri de dimensiuni rezonabile fără pierderi și căderi de tensiune inacceptabile; transportul aceleiași puteri în MT (20 kV) reduce curentul cu factorul raportului tensiunilor (~50×), permițând cabluri de secțiune rezonabilă; (2) **distribuirea punctelor de transformare** aproape de centrele de consum (frig, galerie, hipermarket/parcaj) reduce lungimea rețelelor de joasă tensiune, minimizând căderile de tensiune și pierderile de distribuție într-o clădire cu suprafață desfășurată de ~96.000 mp.

### 9.2 Bilanțul de puteri

Bilanțul electric al mall-ului cumulează consumatorii pe categorii funcționale:

| Consumator | Putere (kW) |
|---|---|
| Chillere + pompe de căldură (frig confort) | 2.320 |
| Frig alimentar (hipermarket) | 468 |
| CTA/ventilare/desfumare | 1.015 |
| Iluminat | 1.080 |
| Scări rulante/lifturi | 372 |
| Prize chiriași | 1.440 |
| Hipermarket (propriu, excl. frig alimentar) | 630 |
| Cinema | 312 |
| Pompe/curenți slabi | 330 |
| **Total puteri instalate (Pi)** | **≈ 12.000 kW** |
| **Total puteri cerute (Pc, cu simultaneitate)** | **≈ 7.970 kW ≈ 8,0 MW** |

Cu un factor de putere de proiectare **cos φ = 0,95** (asigurat prin baterii de condensatoare automate cu compensare a factorului de putere), puterea aparentă cerută rezultă:

**S = Pc / cos φ = 7.970 / 0,95 ≈ 8.390 kVA**

### 9.3 Configurația celor 3 posturi de transformare

Distribuirea puterii pe 3 posturi de transformare nu este arbitrară — fiecare post deservește un **cluster de consumatori omogen din punct de vedere geografic și funcțional**, minimizând lungimea cablurilor de joasă tensiune de la transformator la consumator:

- **PT1 — frig**: 2 × 1.600 kVA, amplasat lângă centrala de frig/termică, deservind chillerele și pompele de căldură;
- **PT2 — galerie**: 2 × 1.600 kVA, amplasat central, deservind iluminatul, prizele chiriașilor, CTA-urile galeriei, scările rulante;
- **PT3 — hipermarket/parcaj**: 2 × 1.250 kVA, amplasat lângă zona hipermarketului, deservind frigul alimentar, iluminatul și ventilarea parcajului.

**Total instalat: ~8.900 kVA** (peste puterea cerută de 8.390 kVA, cu marjă de proiectare).

Fiecare post are **2 transformatoare** (configurație redundantă N-1 pe fiecare post — pierderea unui transformator lasă postul respectiv funcțional la putere redusă, dar nu întrerupe alimentarea clusterului deservit), alimentate din **rețeaua MT de 20 kV configurată în buclă** (inel) — topologie care permite alimentarea fiecărui post din două direcții, asigurând continuitatea serviciului chiar și la o defecțiune pe un segment al rețelei MT.

### 9.4 Distribuția de joasă tensiune

De la fiecare post de transformare pleacă **tabloul general de joasă tensiune (TGJT)**, echipat cu **întrerupătoare debroșabile (withdrawable)** — soluție care permite scoaterea din exploatare a unui întrerupător pentru mentenanță fără întreruperea alimentării celorlalte circuite ale tabloului. Selectivitatea protecțiilor se asigură prin **schema ZSI (Zone Selective Interlocking)** — o metodă de coordonare a protecțiilor care, la un defect, declanșează în mod selectiv doar întrerupătorul cel mai apropiat de defect, nu întregul lanț ierarhic de protecții, minimizând astfel zona afectată de o eventuală avarie.

**Tablourile chiriașilor** sunt echipate cu **contorizare individuală (comunicație Modbus)** — fiecare unitate comercială are propriul contor de energie, cu transmisie automată către BMS pentru facturare (coerent cu principiul de la cap. 1.5). Distribuția verticală principală se face prin **busbar (bară capsulată) vertical**, iar cablurile sunt de tip **LSZH (Low Smoke Zero Halogen — fără halogeni, cu fum redus)**, pentru limitarea toxicității fumului degajat în caz de incendiu al instalației electrice într-un spațiu cu public numeros. Circuitele de siguranță la incendiu (pompe, desfumare, iluminat de securitate) folosesc cabluri **rezistente la foc E90/PH90** (menținerea funcționării electrice minimum 90 de minute în condiții de incendiu), pozate pe trasee separate de instalația curentă.

---

## 10. Grupul electrogen de siguranță — consumatori vitali și scenariul de accident

### 10.1 Lista completă a consumatorilor care nu se pot opri niciodată

Grupul electrogen de siguranță al mall-ului nu este un simplu „back-up general" — el este dimensionat și cablat pentru a alimenta, la o cădere a rețelei publice de energie, **exclusiv consumatorii a căror întrerupere ar transforma imediat un incident controlabil într-o urgență cu potențial de victime multiple**. Această listă cuprinde:

- **Desfumarea atriumului** (4 ventilatoare F400, cap. 7) — fără alimentare, stratul de fum acumulat sub luminatorul zenital ar coborî necontrolat, blocând vizibilitatea căilor de evacuare pe toate cele 3 niveluri simultan;
- **Pompele de sprinklere** (grupul de pompare al instalației de stingere, cap. 13) — fără presiune în rețeaua de sprinklere, incendiul s-ar propaga liber prin sarcina termică ridicată a mărfurilor (cap. 13.1), depășind rapid capacitatea de intervenție a pompierilor sosiți la fața locului;
- **Iluminatul de evacuare** — într-o clădire cu public necunoscut cu traseele (spre deosebire de angajați într-un birou), pierderea completă a iluminatului într-un spațiu aglomerat, plin de fum, ar transforma evacuarea ordonată într-o busculadă necontrolată;
- **Ascensorul de pompieri** — echipele de intervenție trebuie să poată accesa rapid nivelurile superioare afectate, indiferent de starea rețelei electrice publice;
- **Sistemul de alarmare vocală EVAC** (cap. 14) — comunicarea instrucțiunilor de evacuare către mii de persoane depinde integral de funcționarea acestui sistem;
- **BMS-ul de siguranță și detecția de incendiu** — coordonarea automată a tuturor secvențelor de răspuns (desfumare, oprire CTA, deblocare acces) depinde de continuitatea alimentării centralei de detecție și a controlerelor BMS aferente funcțiilor de siguranță.

### 10.2 Scenariul de accident în absența grupului electrogen

Pentru a înțelege de ce acest grup electrogen nu este o opțiune de proiectare, ci o condiție de siguranță absolută, este util să se descrie explicit scenariul contrafactual: să presupunem un incendiu declanșat într-o unitate comercială din galerie, la o oră de vârf de weekend, cu **mii de persoane prezente** în clădire (populația de vârf ~10.500, cap. 1.2), în același moment cu o **cădere a rețelei publice de energie** (eveniment posibil independent de incendiu, sau chiar cauzat de același eveniment — un defect electric care declanșează atât incendiul cât și căderea de tensiune). Fără grup electrogen: (1) pompele de sprinklere s-ar opri, iar incendiul, alimentat de sarcina termică mare a mărfurilor din galerie și din depozitele hipermarketului, s-ar propaga necontrolat; (2) ventilatoarele de desfumare a atriumului s-ar opri, iar fumul generat s-ar acumula rapid, coborând sub cei 2,5 m de strat liber necesari, invadând galeriile de la toate cele 3 niveluri; (3) iluminatul artificial (singura sursă de lumină în interiorul unei clădiri comerciale fără ferestre pe pereții exteriori ai galeriei) ar dispărea complet, lăsând mii de persoane într-un spațiu plin de fum, fără vizibilitate; (4) sistemul de alarmare vocală, care ar trebui să ghideze evacuarea, ar tăcea exact în momentul în care este cel mai necesar. Rezultatul combinat al acestor patru pierderi simultane este scenariul pe care întreaga proiectare a securității la incendiu a unui mall urmărește să îl excludă categoric: **panică generalizată într-un spațiu plin de fum și fără lumină, cu mii de persoane care nu găsesc ieșirile**. Acesta este motivul pentru care alimentarea consumatorilor de siguranță se proiectează cu **redundanță totală de sursă** (rețea + grup electrogen, cu comutare automată), nu doar cu echipamente redundante alimentate din aceeași sursă unică.

### 10.3 Dimensionarea grupului electrogen

Se adoptă **2 grupuri electrogene de 1.000 kVA fiecare** (redundanță N+1 — chiar și pierderea unuia dintre grupuri lasă disponibilă capacitatea integrală de siguranță din celălalt), cu:

- **AAR (comutare automată)** în **< 15 secunde** de la căderea rețelei — interval calculat pentru a acoperi timpul de detectare a căderii, pornirea motoarelor Diesel, stabilizarea turației/tensiunii și comutarea sarcinii, fără a compromite funcționarea pompelor de sprinklere sau a desfumării dincolo de un interval acceptabil;
- **Autonomie de 8 ore** — suficientă pentru evacuarea completă a clădirii, intervenția ISU și restabilirea alimentării publice sau, în cazuri extreme, pentru alimentarea prelungită a instalațiilor de siguranță pe durata unei intervenții complexe.

Grupurile alimentează, prin **AAR (Automatic Amenajare/Anclanșare Rezervă)**, tabloul dedicat consumatorilor de siguranță (pompe incendiu, desfumare, iluminat de securitate, lift pompieri, BMS/detecție) — un tablou fizic și electric **separat** de tablourile de exploatare curentă, coerent cu principiul de separare de la cap. 1.5.

### 10.4 Sursa neîntreruptibilă (UPS)

Pentru consumatorii la care nici măcar intervalul de comutare de sub 15 secunde al grupului electrogen nu este acceptabil (echipamente care s-ar opri/reseta la o întrerupere de câteva secunde, cu pierdere de date sau de imagine), se prevede **UPS 2×200 kVA**, alimentând: **centrala de detecție** (continuitate absolută), **sistemul de alarmare vocală EVAC** (nicio pauză în comunicarea instrucțiunilor), **CCTV** (înregistrarea nu se poate întrerupe exact în momentul unui incident), **serverele** (sistemele informatice ale mall-ului, inclusiv BMS-ul central) și **casieriile** (continuitatea tranzacțională a hipermarketului și a unităților comerciale, unde o resetare bruscă ar afecta tranzacții în curs).

---

## 11. Iluminat interior și de siguranță (NP 061)

### 11.1 Niveluri de iluminare pe zone funcționale

| Spațiu | Nivel (lx) | Observații |
|---|---|---|
| Galerie | 200-300 | UGR ≤ 22, 6-8 W/mp |
| Atrium | 300+ | Iluminat scenografic suplimentar |
| Unități | 300-500 | 10-15 W/mp |
| Food-court | 200 | — |
| Cinema — foaier | 150 | — |
| Cinema — săli | 50-100, dimming | Reglaj în funcție de faza proiecției |
| Parcaj | 75 (exploatare) / 20 (veghe) | — |
| Tehnic/BOH | 300-500 | — |

Sursele adoptate sunt **LED cu eficacitate ≥ 130 lm/W**, cu comandă **DALI** (protocol adresabil, integrat BMS) și **senzori** — inclusiv **daylight dimming** la nivelul atriumului, unde luminatorul zenital furnizează un aport de lumină naturală semnificativ pe parcursul zilei, reglajul automat reducând proporțional puterea corpurilor artificiale.

### 11.2 Iluminatul de siguranță

Autonomia sursei de iluminat de siguranță este de **minimum 1 oră**, alimentată din grupul electrogen (cap. 10) prin comutare **< 5 secunde** (interval de risc redus, 0,5 s pentru comutări la echipamente de risc ridicat), cu următoarele niveluri:

- **Evacuare**: ≥ 1 lx pe axul căilor de evacuare (majorat la **5 lx** în zonele critice — intersecții de fluxuri, schimbări de direcție, atrium);
- **Antipanică**: ≥ 0,5 lx, aplicat obligatoriu în spațiile de suprafață mare fără compartimentare vizuală clară (galerie, atrium, food-court) — spații unde absența unui iluminat minim de referință ar dezorienta rapid publicul aflat în evacuare;
- **Continuarea lucrului**: nivel menținut la casierii și în dispeceratul tehnic, pentru personalul care rămâne activ pe durata evacuării publicului (coordonare, informații);
- **Marcarea PSI**: indicatoare de ieșire luminate permanent, la fiecare schimbare de direcție și la fiecare ieșire.

---

## 12. Priză de pământ și paratrăsnet (I7, SR EN 62305)

### 12.1 Priza de pământ

Se realizează o **priză de pământ unică**, comună pentru instalația electrică, paratrăsnet și echipotențializare, dimensionată pentru o rezistență de dispersie **R ≤ 1 Ω** — valoare impusă de complexitatea și de sensibilitatea echipamentelor electronice ale unui mall de această scară (BMS, CDSAI, servere, casierii, echipamente de sunet/imagine cinema), unde o priză de pământ ineficientă ar amplifica riscul de perturbații și avarii la supratensiuni.

### 12.2 Paratrăsnetul — nivel II

Se adoptă un sistem de protecție împotriva trăsnetului **nivel II** (conform SR EN 62305, evaluarea de risc pentru o clădire publică de mari dimensiuni, cu suprafață de acoperiș extinsă și echipamente sensibile), cu:

- **Dispozitiv de captare** de tip **PDA (paratrăsnet cu dispozitiv de amorsare) sau rețea Faraday** pe acoperiș/terasă;
- **Coborâri la distanțe ≤ 20 m** una de alta pe perimetrul clădirii;
- **Protecție la supratensiuni coordonată SPD 1+2/2+3** — descărcătoare de tip 1+2 la intrarea în tablourile generale (protecția la lovitura directă/indirectă) și tip 2+3 la tablourile terminale/echipamentele sensibile (protecție fină, coordonată în cascadă cu treapta anterioară).

---

## 13. Instalații de stingere a incendiilor — sprinklere generalizate, hidranți, rezervă de apă

### 13.1 De ce sprinklerarea generalizată este obligatorie fizic, nu doar normativ

Compartimentarea pasivă (pereți și planșee rezistente la foc, uși antifoc) este suficientă ca măsură unică de protecție doar în clădirile cu **sarcină termică redusă și compartimentare clară în celule mici** — de exemplu, un ansamblu de birouri celulare, unde un incendiu rămâne, statistic, confinat într-o singură încăpere suficient timp pentru intervenția pompierilor. Un mall regional se află la polul opus pe ambele criterii: (1) **sarcina termică este foarte ridicată și concentrată** — rafturile de mărfuri, ambalajele de carton și plastic, textilele expuse, mobilierul comercial din materiale combustibile constituie o încărcătură de foc pe metru pătrat semnificativ mai mare decât cea a unui spațiu de birou, cu o **viteză de propagare a incendiului** corespunzător mai mare (arderea unui raft de mărfuri ambalate poate atinge flashover-ul în câteva minute); (2) **compartimentarea este, prin natura funcțională a galeriei, parțială** — vitrinele deschise spre galerie, atriumul necompartimentat, golurile scărilor rulante creează căi de propagare a fumului și, potențial, a flăcării, dincolo de limitele fiecărei unități comerciale. În aceste condiții, compartimentarea pasivă **singură** nu poate garanta timpul de rezistență necesar evacuării complete a mii de persoane și intervenției pompierilor — este necesară o măsură **activă**, care intervine automat, în câteva zeci de secunde de la declanșarea incendiului, direct asupra focarului, indiferent de momentul sosirii echipelor de intervenție. Această măsură este **sprinklerarea generalizată**: acoperirea cu capete de stropire automate a **întregii clădiri**, cu o singură excepție justificată tehnic — **camerele electrice** (posturile de transformare, tablourile generale), unde apa ar reprezenta ea însăși un pericol (contact cu echipamente sub tensiune, scurtcircuite suplimentare), motiv pentru care aceste spații sunt protejate cu **stingere cu gaz inert**, un agent care stinge prin dilarea concentrației de oxigen, fără a afecta echipamentele electrice.

### 13.2 Configurația pe clase de pericol (SR EN 12845)

Sprinklerarea se dimensionează diferențiat, pe clase de pericol, în funcție de natura reală a sarcinii combustibile din fiecare zonă:

- **OH3 (Ordinary Hazard grupa 3)** — galerie și unități comerciale, densitate de stropire **5 mm/min pe o arie de calcul de 260 mp**: Q = 5 l/min·mp × 260 mp = 1.300 l/min = **21,7 l/s** (debit teoretic), majorat la un **debit real de proiectare de ~35 l/s**, pentru acoperirea pierderilor de presiune și a marjei de siguranță hidraulică pe rețeaua extinsă a galeriei;
- **HHS (High Hazard Storage) / ESFR (Early Suppression Fast Response)** — depozitul propriu al hipermarketului, unde stivuirea mărfurilor pe rafturi înalte creează o sarcină termică concentrată vertical, necesitând capete ESFR cu răspuns rapid și presiune ridicată, capabile să suprime incendiul înainte ca acesta să se extindă pe verticală prin rafturi;
- **OH2 (Ordinary Hazard grupa 2)** — parcaj subteran, unde sarcina combustibilă (autovehicule, combustibil rezidual) este moderată dar prezentă pe suprafață mare.

### 13.3 Grupul de pompare al instalației de sprinklere

Conform SR EN 12845, grupul de pompare este configurat cu **redundanță de sursă de energie, nu doar de echipament**: **pompă principală electrică** (alimentată, la rândul ei, din sursa de siguranță — cap. 10), **pompă pilot** (menține presiunea constantă pe rețea în absența unei solicitări majore, evitând pornirile inutile ale pompei principale la fluctuații minore) și **pompă de rezervă cu motor Diesel** — complet independentă de alimentarea electrică, ultima linie de apărare dacă atât rețeaua publică, cât și grupul electrogen ar fi, ipotetic, indisponibile simultan.

### 13.4 Hidranții

**Hidranții interiori** asigură **2 jeturi simultane** de **2,1 l/s fiecare**, cu rază de acțiune de până la 30 m — dimensionare care garantează accesul echipei de intervenție la orice punct al galeriei cu două jeturi de apă convergente, standard pentru clădirile publice de mari dimensiuni. **Hidranții exteriori**, dispuși inelar pe perimetrul incintei, asigură un debit de **40 l/s** — rezerva de intervenție a pompierilor sosiți din exterior, independentă de instalația de sprinklere interioară.

### 13.5 Rezerva de apă de incendiu — breviarul de calcul

Volumul rezervei de apă de incendiu se determină prin scenariul cel mai defavorabil, care presupune funcționarea **simultană** a sprinklerelor, a hidranților interiori și a hidranților exteriori, fiecare pe durata sa normată de funcționare:

| Componentă | Debit (l/s) | Durată (min) | Volum (mc) |
|---|---|---|---|
| Sprinklere | 35 | 60 | 126,0 |
| Hidranți interiori | 4,2 | 10 | 2,5 |
| Hidranți exteriori | 40 | 180 | 432,0 |

**Debitul total instantaneu: Q_inc = 35 + 4,2 + 40 = 79,2 l/s.**

Volumul rezultă din suma produselor debit×durată, convertite din litri în metri cubi (factorul 0,06 convertește l/s×min în mc, respectiv 1 l/s timp de 1 minut = 0,06 mc):

**V = (35×60 + 4,2×10 + 40×180) × 0,06 = (2.100 + 42 + 7.200) × 0,06 = 9.342 × 0,06 ≈ 560,5 mc**

**Se adoptă un rezervor de 650 mc** (marjă peste calculul teoretic de 560 mc), **compartimentat** (minimum două compartimente independente, permițând mentenanța/curățarea unuia fără a compromite rezerva de incendiu disponibilă în celălalt), cu **timp de completare (refacere a rezervei) sub 24 de ore** de la epuizare, prin racord de umplere din rețeaua publică de apă.

---

## 14. Detecție, semnalizare și alarmare vocală EVAC (P118-3, SR EN 54-16)

### 14.1 Detecția adresabilă redundantă

Sistemul de detectare a incendiului acoperă **integral** clădirea, cu redundanță de tehnologie adaptată fiecărei zone: **detectoare optice de fum** în galerie, unități și circulații (zone fără surse normale de fum/aerosoli, unde detectorul optic oferă cel mai bun raport sensibilitate/false alarme); **detectoare termice** în bucătăriile food-court (unde fumul de gătit ar declanșa alarme false la detectoarele optice); **detecție prin aspirație VESDA (Very Early Smoke Detection Apparatus)** în atrium (zona cea mai critică, unde detecția trebuie să preceadă cu marjă suficientă acumularea vizibilă de fum, dat fiind volumul mare care trebuie desfumat — cap. 7); și **butoane manuale de semnalizare**, distribuite pe toate căile de evacuare.

### 14.2 De ce sirena simplă nu este suficientă la o aglomerare mare — alarmarea vocală zonată

Într-o clădire de dimensiuni și complexitate reduse, unde ocupanții cunosc bine traseele (o clădire de birouri cu personal fix, de exemplu), o **sirenă simplă** este suficientă: semnalul sonor confirmă existența unei urgențe, iar ocupanții, familiarizați cu clădirea, se îndreaptă spontan către ieșirile cunoscute. Într-un mall, această premisă **nu este valabilă**: marea majoritate a celor ~10.500 de persoane prezente la vârf sunt **vizitatori ocazionali, care nu cunosc planul clădirii**, aflați într-un spațiu comercial conceput tocmai pentru a fi labirintic și captivant (o galerie comercială este proiectată să încurajeze explorarea, nu orientarea directă). O sirenă care doar semnalează „există un pericol", fără a indica **încotro** trebuie să se îndrepte publicul, ar avea un efect contrar celui dorit: ar genera **panică nedirecționată** — persoanele s-ar îndrepta instinctiv spre intrarea pe care au folosit-o la venire (posibil aflată exact în zona incendiată sau saturată de trafic), în loc să folosească ieșirea de urgență cea mai apropiată și cea mai sigură.

De aceea, P118-3 impune la aglomerările de această mărime un **sistem de alarmare vocală (Voice Alarm) conform SR EN 54-16**, care rezolvă exact această problemă prin **mesaje vocale ghidate**, nu doar semnal sonor generic: mesajele preînregistrate (și, la nevoie, anunțuri live de la dispecerat) comunică explicit publicului **ce se întâmplă și ce trebuie să facă** — de exemplu, direcționarea către o ieșire specifică, în funcție de zona reală afectată de incendiu. Sistemul este **zonat pe niveluri și pe sectoare ale galeriei** (nu un mesaj unic difuzat identic în toată clădirea), permițând o **evacuare fazată**: publicul din zona direct afectată de incendiu primește instrucțiunea de evacuare imediată, în timp ce publicul din zonele îndepărtate, neafectate încă, poate primi întâi un mesaj de alertă/pregătire, evitând astfel o aglomerare simultană și necontrolată a tuturor căilor de evacuare de către toate cele ~10.500 de persoane în același interval de câteva zeci de secunde (fenomen care ar crea el însuși blocaje și risc de busculadă la ieșiri).

Inteligibilitatea mesajului vocal se verifică prin indicele **STI (Speech Transmission Index) ≥ 0,5**, parametru care garantează că mesajul, difuzat printr-un spațiu cu reverberație și zgomot de fond (specific unei galerii comerciale cu suprafețe dure, tavane înalte), rămâne **efectiv inteligibil** pentru publicul aflat sub stres, nu doar audibil.

### 14.3 Comenzile automate declanșate de alarmare

La confirmarea alarmei, centrala de detecție (interfațată cu BMS) execută automat o secvență coordonată de comenzi: **desfumarea atriumului** (cap. 7) și a zonelor afectate pornesc automat; **CTA-urile de climatizare curentă se opresc** (evitarea propagării fumului prin rețeaua de ventilare, care altfel ar acționa ca un canal de distribuție a fumului către zone neafectate); **sistemele de control acces se deblochează** pe toate căile de evacuare (ușile fail-safe se deschid automat, indiferent de starea lor normală de securizare); **ascensoarele publice sunt rechemate la parter** și scoase din uz (excepție ascensorul de pompieri, care rămâne operațional pentru echipele de intervenție); **scările rulante se opresc** (previne accidentările în condiții de evacuare grăbită a publicului, unde treptele în mișcare ar constitui un risc suplimentar).

---

## 15. Curenți slabi și BMS la scară de mall

### 15.1 Rețelele de curenți slabi

Un mall de această complexitate integrează un ansamblu extins de sisteme de curenți slabi, dimensionate la scara suprafeței comerciale și a fluxului de public:

- **CCTV**: **350-450 camere IP**, cu înregistrare **NVR de minimum 30 de zile** (cerință standard pentru investigarea incidentelor — furturi, dispute comerciale, incidente de siguranță), completată de **analitică video** și de **recunoaștere a numerelor de înmatriculare (LPR)** la accesele parcajului (gestionarea capacității, tarifare, securitate);
- **Control acces**, cu **deblocare automată la incendiu** (coerent cu comenzile de la cap. 14.3) — securitatea zilnică (control acces la zonele tehnice, BOH) nu poate niciodată să intre în conflict cu libertatea de evacuare în caz de urgență;
- **Efracție** — protecția unităților comerciale în afara programului și a zonelor tehnice;
- **Rețea de fibră optică redundantă** — coloana vertebrală a comunicațiilor digitale ale mall-ului (date, voce, CCTV, BMS), cu rute duale pentru a evita un punct unic de defecțiune;
- **WiFi de acoperire integrală** și **telefonie IP**;
- **Sonorizare PA (Public Address)** — sistemul de sonorizare comercială/muzică de fundal, **integrat cu prioritate absolută a mesajelor de alarmare vocală EVAC** (cap. 14.2): în caz de alarmă, orice program muzical/comercial în curs este întrerupt automat și instantaneu de mesajul de evacuare, indiferent de zonă;
- **Signage digital** — ecrane de informare/publicitate, integrate în rețeaua de date a mall-ului;
- **Ghidarea parcării (PGS — Parking Guidance System)** — senzori de ocupare pe fiecare loc de parcare, cu afișaje de nivel/culoar indicând numărul de locuri libere, reducând timpul de căutare a unui loc și, implicit, congestia și emisiile în interiorul parcajului subteran.

### 15.2 BMS — necesitatea unui sistem centralizat la scara a mii de puncte de date

Un mall regional cu 90-110 unități comerciale, hipermarket, cinema și food-court reprezintă, din punctul de vedere al managementului tehnic, o structură fundamental diferită de o clădire monofuncțională: **fiecare chiriaș are propriul echipament de climatizare, propriul contor, propriul program orar de funcționare**, iar suma acestor mii de puncte de date individuale trebuie totuși gestionată **coerent, la nivel de întreagă clădire**, pentru a asigura atât confortul fiecărui chiriaș cât și eficiența energetică globală și siguranța comună. Această necesitate justifică un **BMS (Building Management System) centralizat**, integrat pe protocoale standard (**BACnet/IP** ca magistrală principală, **Modbus** pentru echipamente termice/electrice individuale), monitorizat dintr-un **dispecerat tehnic 24/7**, care preia:

- **HVAC**: comanda și monitorizarea celor 18 CTA, a chillerelor, a pompelor de căldură, a VAV-urilor pe unități, a strategiilor de free-cooling;
- **Contorizarea energiei pe chiriași** — electric, termic, frig, apă — transmisă automat pentru facturarea costurilor comune (CAM) și pentru raportarea de consum către fiecare chiriaș;
- **Pompele, rezervoarele și separatoarele** (grăsimi, hidrocarburi) — cu alarme automate de nivel/colmatare, transmise dispeceratului pentru programarea vidanjării/mentenanței înainte de apariția unui incident;
- **Iluminatul DALI** — scenarii, program orar, daylight dimming;
- **Managementul comercial al mall-ului (CMMS — Computerized Maintenance Management System, KPI de performanță tehnică)** — o funcție specifică unui mall, absentă la o clădire monofuncțională: administrația mall-ului are nevoie de indicatori agregați (consum per mp GLA, timp mediu de intervenție la defecte, rata de disponibilitate a echipamentelor) pentru gestiunea operațională curentă și pentru raportarea către proprietar/investitori;
- **Interfața cu sistemul de detecție a incendiului** — strict în regim de **monitorizare** (BMS afișează starea și alarmele sistemului de detecție dispeceratului tehnic), fără a controla comenzile de siguranță la incendiu, care rămân **independente** pe centrala dedicată CDSAI — separare de principiu esențială: un defect sau o resetare a BMS-ului (sistem de confort/eficiență) nu poate niciodată afecta lanțul de comandă al siguranței la incendiu (sistem critic, cu propria sursă de rezervă și propria logică de comandă, cap. 14).

### 15.3 Sonorizarea comercială (muzică ambientală zonată) versus alarmarea vocală EVAC — două sisteme distincte, o singură prioritate

Sistemul de sonorizare PA menționat la cap. 15.1 îndeplinește, în exploatarea curentă a mall-ului, o funcție complet diferită de sistemul de alarmare vocală EVAC descris la cap. 14.2 — și tocmai pentru că cele două sisteme deservesc scopuri atât de diferite, proiectul trebuie să le trateze **ca sisteme fizic și logic distincte**, care coexistă pe aceeași infrastructură de difuzoare, dar niciodată pe același canal de comandă activ simultan.

**Sonorizarea comercială** are ca scop crearea unei atmosfere adecvate experienței de cumpărare — muzică ambientală, adaptată zonei și momentului zilei: un ritm mai energic dimineața și la prânz în galerie, o atmosferă mai relaxată seara, un program muzical diferit (și, de regulă, un nivel de volum mai redus) în food-court față de galeria principală, unde conversația la masă trebuie să rămână posibilă, și o **absență totală a sonorizării comerciale** în foaierul cinematografului în intervalul imediat anterior începerii proiecțiilor (pentru a nu intra în conflict cu anunțurile proprii ale operatorului de cinema). Sistemul este **zonat pe minimum 6-8 zone de amplificare independente** (câte una pentru fiecare nivel de galerie, una pentru food-court, una pentru zona de acces cinema, una pentru zonele exterioare/terase, acolo unde există), fiecare cu propriul reglaj de volum și playlist, gestionat fie direct de administrația mall-ului, fie printr-un serviciu externalizat de muzică comercială licențiată (cu obligațiile de drepturi de autor aferente difuzării publice).

**Alarmarea vocală EVAC**, pe de altă parte, nu are nicio legătură cu experiența comercială — este un sistem de siguranță a vieții, certificat conform SR EN 54-16 (cap. 14.2), cu o singură funcție: transmiterea, în caz de incendiu confirmat, a unor mesaje clare, inteligibile (STI ≥ 0,5) și corect zonate, care ghidează publicul spre ieșirile sigure.

Problema tehnică pe care proiectul trebuie să o rezolve explicit este următoarea: **cele două sisteme partajează, de regulă, aceeași rețea fizică de difuzoare** montate în tavanul galeriei (din rațiuni economice și de coerență acustică — nu este fezabil, nici necesar, să se monteze două seturi complet separate de difuzoare pe fiecare metru pătrat de tavan), dar **amplificatoarele, sursele de semnal și logica de comandă rămân complet separate și independente**. Amplificatoarele și centrala EVAC (cap. 14) sunt alimentate din sursa de siguranță (grup electrogen, cap. 10, și UPS, cap. 10.4), în timp ce amplificatoarele sonorizării comerciale sunt alimentate din circuitul electric curent, **necritic** — o cădere de tensiune pe circuitul comercial nu afectează niciodată capacitatea EVAC de a transmite mesajul de evacuare.

Interfața dintre cele două sisteme se realizează printr-un **releu de prioritate hardware (nu doar software)**, integrat în centrala EVAC: la declanșarea alarmei, acest releu **întrerupe fizic** semnalul sonorizării comerciale de pe fiecare zonă de difuzoare afectată și comută instantaneu intrarea pe semnalul de la centrala EVAC — o soluție hardware, nu o simplă prioritizare software, tocmai pentru a elimina orice risc ca o defecțiune sau o blocare a sistemului de sonorizare comercială (de exemplu, un playlist blocat, un amplificator supraîncărcat) să poată, în vreun fel, întârzia sau distorsiona mesajul de evacuare. Această comutare se **auto-testează periodic** (test funcțional săptămânal, conform practicii curente pentru sistemele EN 54-16), cu jurnal automat al testelor păstrat pentru verificarea ISU și pentru evidența FM (cap. 19).

Un aspect suplimentar, adesea neglijat la proiectarea sonorizării comerciale a mall-urilor, este **coordonarea nivelului de zgomot de fond cu inteligibilitatea mesajului EVAC**: dacă sonorizarea comercială funcționează, în exploatare curentă, la un nivel de presiune sonoră prea ridicat, măsurătoarea STI (cap. 14.2), care se efectuează în condiții de zgomot de fond reprezentativ pentru exploatarea reală a galeriei (nu în liniște absolută), ar putea fi compromisă. De aceea, nivelul maxim de operare al sonorizării comerciale se limitează prin proiect (tipic sub 65-70 dB(A) în galerie, cu valori diferențiate pe zone), iar verificarea STI la comisionare (cap. 14.2) se realizează **cu sonorizarea comercială pornită, la nivelul ei maxim admis**, nu cu galeria în tăcere — singurul mod de a garanta că mesajul de evacuare rămâne inteligibil în condițiile reale, cele mai defavorabile, de exploatare a mall-ului.

---

## 16. Eficiență energetică nZEB (Legea 372/2005)

### 16.1 Strategia nZEB pentru o clădire cu consum mare

Un mall regional, cu un consum electric instalat de ordinul 8,0 MW și un necesar termic de 5,3 MW, pare la prima vedere incompatibil cu standardul **nZEB (clădire cu consum de energie aproape egal cu zero)**. Realitatea este însă că marimea absolută a consumului nu este criteriul relevant — criteriul este **consumul specific per metru pătrat** și **ponderea surselor regenerabile/recuperate** din bilanțul total. Strategia nZEB a mall-ului se construiește pe **cumularea a opt măsuri complementare**, fiecare atacând o componentă distinctă a consumului:

1. **Recuperarea de căldură din CTA** (roți entalpice η ≥ 73 %) — reduce cu **~60 %** energia necesară tratării aerului proaspăt, cea mai mare componentă individuală a necesarului termic (cap. 4.1);
2. **Recuperarea de căldură din frigul alimentar** (gazul cald al sistemului CO₂ transcritic, valorificat pentru ACM/încălzire, cap. 8.3) — transformă un flux de căldură reziduală, altfel disipat inutil prin dry-coolere, într-o sursă termică utilă;
3. **Pompele de căldură reversibile** (SCOP 3,4/SEER 5,5, cap. 4.2/8.2) — o singură investiție de echipament acoperă atât încălzirea cât și răcirea, cu eficiență superioară arderii clasice;
4. **Free-cooling** — reduce cu **15-20 %** consumul de răcire, valorificând gratuit aerul exterior rece în semisezon și pe timp de noapte;
5. **Iluminat LED cu comandă DALI** — reduce cu **~55 %** consumul de iluminat față de soluțiile clasice;
6. **Vitrinele cu uși la frigul alimentar** — reduc cu **30-40 %** consumul specific de frig alimentar (cap. 8.3);
7. **BMS de optimizare** — reduce cu **8-12 %** consumul global prin reglaj fin, secvențiere optimă a surselor și mentenanță predictivă (cap. 15.2);
8. **Cortinele de aer** la intrările principale — elimină pierderile necontrolate prin traficul continuu de deschidere a ușilor (cap. 4.3), completate de o **anvelopă performantă conform C107**.

### 16.2 Instalația fotovoltaică

Suprafața de acoperiș/terasă disponibilă pentru panouri fotovoltaice (după deducerea echipamentelor tehnice, a zonelor de circulație pentru mentenanță și a umbririlor) este de **~7.500 mp**. La o densitate de putere instalată de **0,21 kWp/mp** (valoare uzuală pentru module de generație curentă, incluzând spațierea necesară pentru evitarea auto-umbririi la panouri înclinate):

**P = 7.500 mp × 0,21 kWp/mp ≈ 1.575 kWp**

Producția anuală, la o valoare specifică de radiație utilă de **~1.150 kWh/kWp·an** (valoare tipică pentru amplasamentul de referință, incluzând randamentul global al sistemului):

**E = 1.575 × 1.150 ≈ 1,81 GWh/an**

Această producție acoperă **10-14 % din consumul electric total** al mall-ului — o pondere care, deși nu apropie clădirea de autonomie energetică completă (fizic imposibil la un consum de 8 MW pe o suprafață de acoperiș limitată), reprezintă o contribuție semnificativă și, mai important, **coincide sezonier și orar cu vârful de consum de răcire** (producție solară maximă vara, la prânz — exact intervalul de vârf al chillerelor), maximizând astfel autoconsumul direct al energiei produse, fără a depinde de injecție/reachiziție din rețea.

Complementar, se prevăd **stații de încărcare pentru vehicule electrice (EV) la minimum 10 % din locurile de parcare** — cerință aliniată la reglementările EPBD (Energy Performance of Buildings Directive) pentru clădirile comerciale de mari dimensiuni, care anticipează creșterea ponderii vehiculelor electrice în rândul vizitatorilor și oferă totodată un argument comercial suplimentar pentru atragerea clientelei.

---

## 17. Managementul deșeurilor — colectare selectivă, compactoare, camere frigorifice deșeuri alimentare

### 17.1 Cadrul legal și particularitatea unui mall ca generator de deșeuri

Un centru comercial regional cu 130-160 de unități, hipermarket, food-court și cinema este, din perspectiva legislației de mediu, un **generator unic de deșeuri cu fluxuri multiple și eterogene** — fiecare chiriaș produce propriul flux de deșeuri (ambalaje de desfacere a mărfii, deșeuri de birou, resturi alimentare), dar responsabilitatea organizării colectării, depozitării temporare și predării către operatorii autorizați revine, la nivelul întregii clădiri, **administrației mall-ului**, conform Legii 211/2011 privind regimul deșeurilor (republicată, cu modificările OUG 92/2021) și HG 856/2002 (Catalogul European al Deșeurilor). Obligația legală de **colectare selectivă pe minimum 5 fracții** (hârtie-carton, plastic-metal, sticlă, biodegradabile, reziduale) — extinsă, la nivelul spațiilor tehnice și al chiriașilor cu activitate de birou, cu fluxul de **deșeuri periculoase** (baterii, tuburi fluorescente/becuri LED defecte, cartușe de toner, deșeuri electrice și electronice — DEEE) — impune proiectarea unui **spațiu tehnic dedicat gestionării deșeurilor**, amplasat obligatoriu la BOH (back-of-house), cu **acces separat pentru autovehiculele de colectare**, distinct fizic de fluxul de public și de rampa de aprovizionare cu marfă (coerent cu principiul de separare a fluxurilor de la cap. 1.5) — vehiculele de gunoi nu traversează niciodată zonele de acces public, iar programul lor de operare se stabilește, prin regulamentul intern al mall-ului, în afara orelor de vârf comercial.

### 17.2 Presa de balotat carton — fluxul dominant cantitativ

Ambalajele de carton reprezintă, cantitativ, cel mai mare flux de deșeuri generat de un mall regional — fiecare livrare de marfă către cele 130-160 de unități și către hipermarket este însoțită de cutii, paleți de carton și folie de protecție, care ar ocupa, netratate, un volum imposibil de gestionat prin containere standard. Soluția adoptată este o **presă de balotat carton (baler)**, amplasată într-o **încăpere dedicată la BOH, cu compartimentare rezistentă la foc** (baloturile de carton constituie, prin natura lor, o sarcină combustibilă concentrată, motiv pentru care încăperea este tratată, din perspectiva securității la incendiu, similar unui depozit de risc ridicat, cu acoperire de sprinklere dedicată — coerent cu principiul de la cap. 13.1, care nu admite excepții de la sprinklerarea generalizată în afara camerelor electrice). Presa reduce volumul cartonului colectat cu un raport de compactare de ordinul **8:1 până la 10:1**, transformând un flux voluminos și greu de manipulat într-un flux de baloturi standardizate, ușor de stivuit temporar și de încărcat în camioane de reciclare la un interval de câteva zile, nu zilnic — reducând corespunzător numărul de curse ale operatorului de salubritate/reciclare și, implicit, traficul greu generat de mall în zona rampei de marfă.

### 17.3 Compactoarele de deșeuri reziduale și fluxul de plastic-metal

Deșeurile reziduale (nereciclabile) și fluxul de plastic-metal se gestionează prin **compactoare staționare cu container**, amplasate similar la BOH, în vecinătatea rampei de marfă. Compactorul, acționat electro-hidraulic, reduce volumul deșeurilor cu un raport tipic de **4:1 până la 6:1**, cu **senzor de nivel de umplere** (celulă de sarcină sau senzor ultrasonic), care transmite starea de umplere către BMS (cap. 15.2) — semnalul de container plin declanșează automat solicitarea de ridicare către operatorul de salubritate contractat, evitând atât golirea prematură (curse inutile, cost suplimentar), cât și depășirea capacității (deșeuri acumulate necontrolat în afara containerului, risc igienico-sanitar și de incendiu). Fluxul de sticlă, cu volum semnificativ mai redus dar prezent constant (băuturi din food-court și din unitățile de tip bar/cafenea), se colectează separat, în containere dedicate, fără compactare (sticla spartă în compactor ar contamina fluxul și ar crea risc de accidentare la manipulare).

### 17.4 Camerele frigorifice pentru deșeuri alimentare — food-court și hipermarket

Resturile alimentare biodegradabile provenite din cele 12-16 module de food-court (proces zilnic de preparare a ~3.000 de mese, cap. 2.1) și din secțiile proprii ale hipermarketului (carmangerie, patiserie, produse expirate/deteriorate) constituie un flux cu o particularitate esențială față de toate celelalte: **descompunerea rapidă la temperatură ambiantă**, cu generare de mirosuri, atragere de dăunători (insecte, rozătoare) și risc igienico-sanitar direct, într-o clădire care găzduiește simultan mii de vizitatori și activități de alimentație publică aflate sub controlul DSVSA (Reg. CE 852/2004, menționat și la cap. 2.1 pentru dimensionarea sanitară).

Soluția tehnică obligatorie este o **cameră frigorifică dedicată deșeurilor alimentare**, menținută la **+4...+8 °C** (temperatură care oprește practic multiplicarea bacteriană fără a necesita regimul de congelare, inutil de costisitor pentru un flux care se evacuează zilnic), separată fizic de camerele frigorifice de depozitare a mărfii proaspete (cap. 8.3) — nu se admite niciodată amestecarea circuitului de marfă cu circuitul de deșeu, nici măcar temporar, din rațiuni sanitare elementare. Camera este echipată cu: **pardoseală și pereți lavabili, cu pantă de scurgere** către o rigolă conectată la rețeaua de canalizare menajeră **prin intermediul separatorului de grăsimi** (cap. 3.2) — apa de spălare a camerei și a containerelor de deșeu alimentar conține grăsimi și resturi organice, exact fluxul pe care separatorul este proiectat să îl trateze înainte de evacuare; **senzor de temperatură cu alarmă la BMS** (depășirea pragului de +8 °C, de exemplu la o defecțiune a agregatului frigorific, trebuie semnalată imediat echipei FM, cap. 19, pentru a evita acumularea necontrolată de mirosuri și dezvoltarea bacteriană înainte de următoarea rundă de colectare); și **ventilare proprie, în depresiune** față de circulațiile tehnice adiacente, cu evacuare directă la exterior, prevenind migrarea mirosurilor către zonele de food-court sau către galeria comercială.

### 17.5 Indicatori orientativi de generare și logistica de colectare

Pentru dimensionarea preliminară a spațiilor de gestionare a deșeurilor (suprafața camerei de depozitare, numărul și capacitatea compactoarelor, frecvența curselor de colectare), se utilizează rate specifice de generare, orientative la faza de DTAC:

- **Deșeuri comerciale generale (galerie + unități), ~0,04 kg/mp GLA·zi**: 22.000 mp × 0,04 ≈ **880 kg/zi** (≈ 26,4 t/lună);
- **Deșeuri biodegradabile food-court, ~0,15 kg/masă servită**: 3.000 mese/zi × 0,15 ≈ **450 kg/zi** (≈ 13,5 t/lună);
- **Deșeuri hipermarket (ambalaje + biodegradabile proprii)**: valoare de bloc, estimată la **~600 kg/zi** (≈ 18 t/lună), specifică activității proprii de procesare alimentară.

**Total orientativ ≈ 1.930 kg/zi, respectiv ~58 t/lună**, din care ponderea cartonului de ambalaj (cap. 17.2) reprezintă, uzual, **35-45 %** din masa totală — de unde și importanța economică și operațională a presei de balotat carton în reducerea volumului transportat.

Programarea curselor de colectare (carton, reziduale, biodegradabile alimentare, sticlă) se coordonează prin CMMS-ul FM (cap. 19.2), cu **acces dedicat al autovehiculelor de salubritate**, în afara orelor de vârf comercial, iar cântărirea deșeurilor la ridicare (staționar, prin platformă de cântărire la rampă, sau prin raportarea operatorului contractat) alimentează un **indicator de sustenabilitate** (kg deșeu/mp GLA/an, rata de valorificare/reciclare) tot mai frecvent solicitat în certificările de mediu ale activelor comerciale și în raportarea ESG către investitori — un aspect care, la un mall regional de această dimensiune, depășește simpla conformare legală și devine un argument de poziționare comercială a activului.

---

## 18. Rețeaua de date și telecomunicații pentru chiriași

### 18.1 De ce fiecare unitate are nevoie de racord independent voce-date-CATV

Spre deosebire de instalațiile de utilități tratate până acum (apă, energie termică, electricitate — cap. 2-9), unde soluția tehnică este, de regulă, o singură rețea unitară a cărei sursă este controlată integral de administrația mall-ului, telecomunicațiile ridică o problemă structural diferită: **fiecare chiriaș are propriul contract cu propriul furnizor de servicii de telecomunicații** (internet, telefonie, uneori televiziune prin cablu pentru zona de food-court/cinema), ales independent, în funcție de necesitățile proprii de business — un chiriaș de tip lanț internațional poate avea un contract centralizat, la nivel de rețea națională de magazine, cu un operator specific, complet diferit de operatorul ales de vecinul său. Sistemul de puncte de vânzare (POS), esențial pentru toate cele 130-160 de unități, hipermarket și cinema, **depinde integral de conectivitate** — o întrerupere a rețelei de date ar bloca simultan încasările tuturor chiriașilor, un risc operațional și comercial pe care mall-ul nu și-l poate asuma. De aceea, proiectul de instalații de curenți slabi tratează rețeaua de telecomunicații ca infrastructură **critică pentru continuitatea afacerii** (business continuity), la un nivel de redundanță comparabil, ca principiu, cu cel aplicat instalațiilor de siguranță a vieții (cap. 10), deși cu consecințe de natură comercială, nu de siguranță fizică.

### 18.2 Arhitectura carrier-neutră și infrastructura pasivă a mall-ului

Rolul mall-ului, din perspectivă tehnică, nu este acela de a furniza el însuși servicii de telecomunicații, ci de a asigura o **infrastructură pasivă carrier-neutră**, accesibilă tuturor operatorilor de telecomunicații pe care chiriașii îi pot alege — model impus, de altfel, și de cadrul legal european/național privind infrastructura fizică pentru rețele de comunicații electronice (Legea 159/2016, transpunere a Directivei 2014/61/UE), care obligă proprietarii de clădiri de anvergură să asigure accesul nediscriminatoriu al operatorilor la infrastructura de conducte/tuburi de protecție. Arhitectura constă dintr-o **cameră tehnică de telecomunicații centrală (MDF — Main Distribution Frame/Meet-Me Room)**, amplasată tipic lângă posturile de transformare (cap. 9.3, pentru alimentare electrică redundantă și proximitate de utilități), în care **operatorii de telecomunicații își instalează propriile echipamente active**, pe rack-uri închiriate sau proprii, cu interconectare la rețeaua publică prin **minimum două trasee de fibră optică de intrare, din direcții diferite** ale incintei (diversitate de traseu, care elimină un punct unic de defecțiune la nivelul accesului extern al întregii clădiri).

Din camera centrală, o **rețea de fibră optică verticală/orizontală**, dublată pe trasee redundante (coerent cu principiul enunțat deja pentru coloana vertebrală de curenți slabi la cap. 15.1), coboară către **camere tehnice intermediare (IDF)**, amplasate pe fiecare nivel/zonă a galeriei, de la care pleacă cablarea structurată finală, în cupru (cat. 6A) sau fibră, către **fiecare unitate comercială**. Fiecare lot de închiriere primește, la limita de proprietate, o **cutie de demarcație (demarc box)**, în care operatorul ales de chiriaș își termină propriul circuit — infrastructura pasivă (tub de protecție, cutie de tragere, panou de conexiuni) este furnizată și întreținută de mall, în timp ce echipamentul activ (modem, router, centrala telefonică) aparține operatorului/chiriașului. Această separare clară de responsabilități — pasiv furnizat de proprietar, activ furnizat de operator/chiriaș — este soluția standard pentru clădirile comerciale multi-chiriaș de mari dimensiuni, și permite mall-ului să găzduiască, simultan, mai mulți operatori concurenți, fără a favoriza sau bloca vreunul dintre ei.

### 18.3 Segregarea rețelelor — separarea rețelei chiriașilor de rețeaua operațională a mall-ului

O clădire cu zeci de rețele independente ale chiriașilor, coexistând pe aceeași infrastructură fizică de fibră/cupru cu rețeaua proprie a mall-ului (BMS — cap. 15.2, CCTV — cap. 15.1, sisteme de siguranță la incendiu — cap. 14), ridică o cerință de **securitate cibernetică** ce trebuie tratată explicit la proiectare: rețeaua de date a unui chiriaș, mai puțin controlată din punct de vedere al securității informatice decât sistemele critice ale mall-ului, nu trebuie, în niciun caz, să poată deveni un **vector de acces neautorizat** către sistemele operaționale/de siguranță ale clădirii. Soluția este **segregarea logică completă** a rețelelor, prin **VLAN-uri dedicate** (fiecare chiriaș, fiecare sistem tehnic al mall-ului — BMS, CCTV, control acces, EVAC — pe propriul VLAN izolat) și prin **firewall-uri** la punctele de interconectare, care permit strict traficul necesar (de exemplu, transmiterea datelor de contorizare individuală, cap. 2.7/9.4, de la contorul unei unități către serverul BMS central, dar nimic altceva în sens invers). Această segregare este, la un mall regional, o cerință de proiectare la fel de fermă precum separarea fizică a circuitelor electrice de siguranță de cele curente (cap. 9.4) — principiul este identic: sistemele critice ale clădirii nu pot depinde, în niciun fel, de integritatea sau de securitatea rețelelor gestionate de terți (chiriași, operatori de telecomunicații externi).

### 18.4 WiFi public, semnalistica digitală și redundanța conexiunii externe

Rețeaua **WiFi de acoperire integrală** (menționată la cap. 15.1) și rețeaua de **semnalistică digitală (signage)** se conectează pe aceeași infrastructură de cablare structurată/fibră optică descrisă mai sus, dar pe **VLAN-uri proprii, separate atât de rețelele chiriașilor cât și de sistemele operaționale critice**. Punctele de acces WiFi, alimentate **PoE (Power over Ethernet)** direct din cablarea de date (eliminând necesitatea unei alimentări electrice separate la fiecare punct de acces), se dimensionează la o densitate care asigură acoperire și capacitate de trafic corespunzătoare afluenței de public din galerie, cu o concentrare superioară în zonele de food-court și în foaierul cinematografului (zone de așteptare, unde utilizarea telefonului mobil/tabletei este intensă).

Conectivitatea externă a întregii clădiri — esențială nu doar pentru WiFi și semnalistică, ci pentru **funcționarea simultană a POS-urilor tuturor celor 130-160 de unități, a caselor de marcat ale hipermarketului și a sistemului de emitere a biletelor de cinema** — se asigură prin **minimum doi furnizori de servicii de internet, pe trasee de fibră fizic distincte**, cu comutare automată (failover) în cazul întreruperii unuia dintre circuite. Această redundanță, deși nu are miza de siguranță a vieții pe care o au sistemele tratate la cap. 10 (grup electrogen) sau cap. 14 (EVAC), are o **miză comercială și operațională majoră** pentru un mall regional: o întrerupere prelungită a conectivității ar bloca simultan tranzacțiile de plată ale sutelor de unități comerciale, cu impact financiar direct și imediat asupra tuturor chiriașilor și, implicit, asupra reputației mall-ului ca amplasament comercial.

---

## 19. Mentenanța și managementul facilităților (FM)

### 19.1 De ce un mall are nevoie de o echipă tehnică permanentă, distinctă de administrația comercială

Toate instalațiile descrise în capitolele anterioare — cele 18 centrale de tratare a aerului (cap. 5.2), cele 3 posturi de transformare MT/JT (cap. 9.3), cele 2 grupuri electrogene (cap. 10.3), grupul de pompare al sprinklerelor (cap. 13.3), sistemul de desfumare a atriumului (cap. 7), separatoarele de grăsimi/hidrocarburi (cap. 3.2/3.4), compactoarele și camerele frigorifice de deșeuri (cap. 17) — formează un ansamblu tehnic de complexitate comparabilă cu cea a unei mici platforme industriale, nu cu cea a unei clădiri comerciale obișnuite. Funcționarea corectă, sigură și eficientă a acestui ansamblu, pe durata a 12-16 ore/zi de exploatare comercială (adesea extinsă, la evenimente speciale sau la programul de sărbători), 7 zile din 7, nu se poate baza pe intervenții punctuale, la apariția unei defecțiuni — este necesară o **echipă tehnică permanentă**, prezentă fizic în clădire, complet distinctă de administrația comercială a mall-ului (leasing, marketing, relația cu chiriașii) și cu responsabilitate exclusivă asupra instalațiilor și a securității la incendiu.

Echipa tehnică (Facility Management — FM) tipică pentru un mall de această dimensiune cuprinde, orientativ: un **facility manager**, responsabil de coordonarea generală și de bugetul de mentenanță; **ingineri de tură/dispeceri tehnici**, care asigură **acoperire 24/7 în 2-3 schimburi** (dispeceratul tehnic menționat la cap. 15.2 nu este o cameră de monitorizare automată nesupravegheată, ci un post de lucru permanent ocupat, capabil să reacționeze imediat la orice alarmă tehnică sau de siguranță); **tehnicieni specializați pe domenii** — electric (posturi de transformare, tablouri, grup electrogen), HVAC/frigotehniști (chillere, CTA, frig alimentar), instalatori sanitari (pompe, separatoare, rezerva de incendiu) — organizați fie ca angajați direcți ai mall-ului, fie printr-un contract de facility management externalizat cu un operator specializat; și personal de **curățenie și securitate/CCTV**, de regulă subcontractat, dar coordonat operațional prin același dispecerat tehnic. Pentru un mall de ~52.000 mp SCD, dimensiunea uzuală a acestei echipe (incluzând subcontractanții de curățenie/securitate) este de ordinul a **25-35 de persoane prezente permanent pe durata programului de funcționare**, cu o echipă tehnică restrânsă de gardă pe timpul nopții.

### 19.2 CMMS — de la registrul de mentenanță la managementul predictiv

Managementul unui volum atât de mare de echipamente, cu programe de mentenanță preventivă diferite pentru fiecare (curățarea filtrelor CTA la interval de câteva săptămâni, verificarea anuală a prizei de pământ — cap. 12.1, vidanjarea separatoarelor de grăsimi la semnal de alarmă — cap. 3.2, revizia periodică ISCIR a ascensoarelor/scărilor rulante), nu mai poate fi ținut evidența manual, pe hârtie sau în foi de calcul disparate — funcția de **CMMS (Computerized Maintenance Management System)**, menționată deja la cap. 15.2 ca parte a integrării BMS, este, din perspectiva echipei FM, instrumentul central de lucru zilnic: fiecare echipament din clădire este înregistrat cu fișa sa tehnică, cu programul de mentenanță preventivă recomandat de producător, cu istoricul intervențiilor și cu stocul de piese de schimb critice asociate.

CMMS generează automat **ordine de lucru (work orders)** la scadența fiecărei operații de mentenanță preventivă, urmărește **timpul de răspuns și timpul de remediere** pentru fiecare intervenție (indicator **MTTR — Mean Time To Repair**), și calculează **rata de disponibilitate** a echipamentelor critice (**MTBF — Mean Time Between Failures**) — indicatori raportați periodic către administrația mall-ului și, dacă este cazul, către proprietarul/investitorul activului. Contractele de service cu producătorii/furnizorii echipamentelor majore (chillere, ascensoare, scări rulante, grup electrogen, centrala de detecție incendiu) includ **niveluri de serviciu garantate (SLA)** — timp maxim de intervenție la o defecțiune critică, tipic sub 4 ore pentru echipamentele de siguranță (grup electrogen, pompe sprinklere) și sub 24 de ore pentru echipamente de confort (CTA, chillere neredundante) — coordonate și urmărite tot prin CMMS.

### 19.3 Calendarul verificărilor periodice legale — o hartă a obligațiilor, nu o listă opțională

Spre deosebire de mentenanța preventivă „de bune practici" (recomandată de producător, dar negociabilă ca frecvență), o parte semnificativă a calendarului de mentenanță al unui mall este **impusă direct de lege**, cu sancțiuni pentru neconformare și cu risc de suspendare a autorizației de funcționare în cazurile grave:

- **ISCIR** — verificarea tehnică periodică a ascensoarelor (public + lift pompieri, cap. 10.1) și a scărilor rulante, la intervalele impuse de prescripțiile tehnice ISCIR în vigoare, cu revizie tehnică obligatorie și autorizare de repunere în funcțiune după orice reparație majoră;
- **ISU** — verificarea periodică a instalațiilor de stingere (sprinklere, hidranți — testarea anuală a pompelor și a debitului real conform SR EN 12845, cap. 13.3), a sistemului de detecție-alarmare (cap. 14) și a sistemului de desfumare (cap. 6-7), cu documentarea rezultatelor pentru controalele ISU periodice și pentru menținerea autorizației de securitate la incendiu obținute la PIF;
- **ANRE/verificări electrice** — verificarea anuală a prizei de pământ (R ≤ 1 Ω, cap. 12.1) și a instalației de paratrăsnet (cap. 12.2), termografierea periodică a tablourilor electrice (detectarea punctelor de supraîncălzire înainte de a deveni surse de incendiu) și verificarea periodică a echipamentelor posturilor de transformare;
- **Metrologie** — verificarea/etalonarea periodică a contoarelor individuale ale chiriașilor (cap. 2.7) și a contoarelor de energie electrică/termică, conform legislației metrologice naționale;
- **F-Gas (agenți frigorifici)** — verificarea periodică a etanșeității circuitelor de agent frigorific la chillere și la sistemul de frig alimentar (cap. 8), cu frecvență dependentă de cantitatea de agent frigorific încărcată în fiecare circuit, conform Regulamentului UE F-Gas, și cu ținerea unui registru de intervenții/completări obligatoriu;
- **Sanitar-veterinar** — controale periodice DSVSA ale zonelor de procesare alimentară (food-court, secțiile proprii ale hipermarketului), coordonate de FM împreună cu operatorii acestor spații, inclusiv verificarea funcționării corecte a camerelor frigorifice de deșeuri alimentare (cap. 17.4).

Toate aceste verificări sunt programate, urmărite și documentate prin CMMS (cap. 19.2), cu alertare automată înainte de scadență — o defecțiune sistemică frecventă la clădirile mari fără un FM riguros este tocmai **omiterea unei verificări legale obligatorii**, cu consecințe care variază de la amenzi la, în cazurile de neconformare privind securitatea la incendiu, suspendarea autorizației de funcționare a spațiilor comerciale.

### 19.4 Managementul energetic continuu

Echipa FM are, suplimentar rolului de mentenanță corectivă/preventivă, o responsabilitate directă asupra **performanței energetice curente** a clădirii — strategia nZEB descrisă la cap. 16 stabilește soluțiile tehnice de proiectare, dar **eficiența reală, pe durata de exploatare**, depinde de reglajul fin și de monitorizarea continuă realizate de FM prin BMS (cap. 15.2). Indicatorul central urmărit este **consumul specific de energie (kWh/mp GLA/an)**, comparat periodic cu **valori de referință (benchmark)** specifice tipologiei de centru comercial regional cu galerie, hipermarket, cinema și food-court — o abatere semnificativă de la trend (creștere neexplicată a consumului specific) declanșează o investigație tehnică (echipament cu randament degradat, derivă a reglajelor BMS, infiltrații de aer necontrolate) înainte ca abaterea să se reflecte, la scară anuală, într-un cost de exploatare semnificativ mai mare decât cel proiectat. Acest management energetic continuu, alături de indicatorii de sustenabilitate ai deșeurilor (cap. 17.5), constituie baza rapoartelor de sustenabilitate (ESG) pe care proprietarii de active comerciale de mari dimensiuni le furnizează tot mai frecvent investitorilor și instituțiilor de finanțare.

---

## 20. Concluzii, sinteză indicatori și verificare tehnică

### 20.1 Sinteza indicatorilor de dimensionare

| Indicator | Valoare |
|---|---|
| Necesar apă mediu zilnic / debit de calcul | 237 mc/zi / 24,1 l/s (86,4 mc/h) |
| Debit incendiu de calcul / rezervă de apă | 79,2 l/s / 650 mc |
| Necesar termic / frig confort / frig alimentar | 5,3 MW / 5,85 MW / 1,2 MW |
| Aer proaspăt de vârf | 315.000 mc/h (total tratat CTA ~502.000 mc/h) |
| Desfumare atrium | 428.000 mc/h (4 ventilatoare F400, unul rezervă) |
| Putere electrică cerută | ~8,0 MW (S ≈ 8.390 kVA) |
| Posturi de transformare / grup electrogen | 3 posturi (~8.900 kVA total) / 2×1.000 kVA |
| Instalație fotovoltaică | ~1,575 MWp (~1,81 GWh/an) |

Instalațiile mall-ului tratat (populație de vârf ~10.500 persoane, populație de calcul ~6.500-7.000 persoane) sunt proiectate pe principiul **surselor sinergetice** — pompele de căldură reversibile care produc simultan încălzire și frig, recuperarea de căldură din frigul alimentar, instalația fotovoltaică ale cărei vârfuri de producție coincid cu vârfurile de consum de răcire, free-cooling-ul care valorifică gratuit resursele climatice ale amplasamentului — un ansamblu de măsuri care conduce, cumulat, la încadrarea în standardul **nZEB clasa A**, în ciuda amplorii absolute a consumului specific unei clădiri comerciale de această mărime.

### 20.2 Coordonarea interdisciplinară

Instalațiile descrise se coordonează obligatoriu cu proiectul de arhitectură (geometria și volumul atriumului, plenumurile tehnice, poziționarea celor 3 posturi de transformare și a camerei grupurilor electrogene, culoarul tehnic de serviciu din spatele unităților comerciale), cu structura (goluri pentru tubulatura de desfumare de mare secțiune, încărcările echipamentelor de pe terasă — inclusiv panourile fotovoltaice și ventilatoarele de desfumare, fundațiile posturilor de transformare) și cu securitatea la incendiu (compartimentarea, clapetele antifoc, rezistența la foc a traseelor electrice de siguranță, matricea de cauză-efect care leagă detecția de toate comenzile automate descrise la cap. 14.3).

### 20.3 Verificarea tehnică (Legea 10/1995)

Documentația de instalații se supune verificării de către **verificatori de proiecte atestați MDLPA**, pe cerințele fundamentale:

- **Is** — instalații sanitare, canalizare, gaze (dacă e cazul);
- **It** — instalații termice, ventilare, climatizare, frig;
- **Ie** — instalații electrice, paratrăsnet, iluminat de securitate;
- **Cerința C (securitate la incendiu)** — verificarea corectitudinii soluțiilor de instalații de stingere, detecție, desfumare și alarmare vocală în raport cu **scenariul de securitate la incendiu**, elaborat conform Ordinului MAI 129/2016.

### 20.4 Avize necesare

- **ISU** — **obligatoriu**, în două etape distincte: **avizul la faza de proiectare** (verificarea conformității soluțiilor cu scenariul de securitate) și **autorizația de securitate la incendiu la punerea în funcțiune (PIF)** (verificarea execuției conforme cu proiectul avizat), ambele conform HG 571/2016;
- **Energie MT** — aviz de racordare la rețeaua de medie tensiune pentru cele 3 posturi de transformare;
- **Gaze naturale** — aviz de racordare (dacă soluția finală de sursă termică include componenta pe gaz, cap. 4.2);
- **Apă-canal** — aviz de racordare la branșamentul dublu Dn200 și la rețeaua de canalizare menajeră/pluvială, incluzând debitul evacuat după atenuare;
- **Mediu/ANAR** — aviz de gospodărire a apelor pentru sistemul de canalizare pluvială (bazinul de retenție, limita de debit evacuat) și pentru separatoarele de hidrocarburi/grăsimi;
- **DSVSA** (Direcția Sanitară Veterinară și pentru Siguranța Alimentelor) — aviz specific pentru zonele de procesare alimentară (food-court, secțiile proprii ale hipermarketului), conform Reg. CE 852/2004.

### 20.5 Notă privind stadiul documentației

Dimensionările prezentate în acest memoriu au caracter **preliminar, la nivel de DTAC**, fundamentate pe ipoteze de calcul acoperitoare, pe valorile normate din I5/I7/I9/I13, P118-1/2/3, NP 068-2002 și NP 127/2009, și pe metodologia consacrată de calcul a desfumării atriumurilor mari. La faza de **Proiect Tehnic (PT)** se elaborează breviarele de calcul complete pe fiecare instalație (bilanț termic și electric definitiv pe circuite și pe chiriași, calcul hidraulic detaliat al rețelelor de sprinklere pe fiecare zonă de calcul, dimensionarea finală a jet-fans-urilor parcajului pe planul definitiv de circulație), iar la faza de **Detalii de Execuție (DDE)** se realizează **verificarea prin simulare CFD a desfumării atriumului** (cap. 7.4) pe geometria finală, împreună cu schemele funcționale complete, planurile de execuție și specificațiile tehnice ale echipamentelor selectate, avizate de verificatorii atestați și de ISU pe baza scenariului de securitate la incendiu definitiv.
