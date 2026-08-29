# SCENARIU DE SECURITATE LA INCENDIU
## Sistem de stocare a energiei în baterii (BESS), 25 MW / 50 MWh, soluție containerizată

*Întocmit conform P118-1/2013, P118-2/2013, P118-3/2015, Ordinul MAI nr. 129/2016 (instalații tehnice cu risc mare), NFPA 855 (Standard for the Installation of Stationary Energy Storage Systems), UL 9540A (Test Method for Evaluating Thermal Runaway Fire Propagation). Elaborat de expert atestat IGSU, cu tratarea specifică a fenomenului „thermal runaway".*

## 1. Date generale

### 1.1. Identificarea obiectivului

| Element | Date |
|---|---|
| Denumire | BESS 25 MW / 50 MWh, 10 containere ISO 20 picioare (~5 MWh/container) |
| Categoria de importanță | C (normală) |
| Nivelul de risc de incendiu | **MARE**, generat de fenomenul de thermal runaway la nivel de celulă litiu-ion |
| Ocupare umană | Sporadică (mentenanță programată, intervenții punctuale) — nu permanentă |

### 1.2. Particularitatea riscului — thermal runaway

Spre deosebire de un incendiu convențional, riscul specific unei instalații BESS litiu-ion este fenomenul de **thermal runaway** (fugă termică): o defecțiune la nivel de celulă (supraîncărcare, scurtcircuit intern, defect de fabricație, deteriorare mecanică) declanșează o reacție chimică exotermă auto-întreținută, care generează gaze inflamabile/toxice și poate propaga căldura la celulele adiacente, extinzând fenomenul la nivelul întregului modul/rack și, în absența unor măsuri de limitare, la containerele vecine. Reacția nu poate fi, de regulă, stinsă prin mijloacele convenționale de stingere (apă/spumă/gaz) odată declanșată la nivelul unei celule individuale — obiectivul măsurilor de securitate NU este stingerea reacției chimice interne, ci **limitarea propagării** către celulele/modulele/containerele adiacente și **răcirea** pentru prevenirea reaprinderii gazelor emise.

## 2. Raportul de testare UL 9540A — fundamentul distanțelor de siguranță

### 2.1. Rolul testului

Distanțele de siguranță între containere, între containere și limitele de proprietate, și soluțiile de detecție/ventilare/stingere NU se stabilesc pe o valoare convențională generică, ci pe baza **raportului de testare UL 9540A** al configurației SPECIFICE de celulă/modul/rack/container contractate pentru acest proiect. Testul evaluează propagarea termică la patru niveluri succesive (celulă → modul → unitate → instalație), determinând dacă și cum se propagă fenomenul între niveluri și ce cantitate/compoziție de gaze este generată.

### 2.2. Consecința asupra proiectării

Un raport UL 9540A care demonstrează **absența propagării** între module/unități permite distanțe de siguranță reduse; un raport care demonstrează propagare permite fie măsuri suplimentare de limitare (bariere termice între module, sisteme de răcire dedicate), fie distanțe de siguranță mărite. Proiectul reține explicit că **un test generic, efectuat pe un alt model de container, nu poate fundamenta juridic distanțele de siguranță ale proiectului curent** — raportul UL 9540A specific configurației contractate este piesă obligatorie a documentației, anexată prezentului scenariu.

## 3. Distanțe de siguranță (conform NFPA 855 și raportul UL 9540A)

### 3.1. Distanțe între containere

Conform NFPA 855, distanța minimă între containere adiacente (dacă raportul UL 9540A nu demonstrează absența propagării) este stabilită astfel încât un eveniment de thermal runaway într-un container să nu afecteze termic (prin radiație) containerul vecin peste pragul critic. Distanța exactă rezultă din raportul de testare; în absența unei distanțe suficiente, se prevăd bariere termice (pereți rezistenți la foc între containere).

### 3.2. Distanțe față de limitele de proprietate și construcții învecinate

Distanța minimă față de limitele de proprietate și față de orice construcție/funcțiune învecinată (inclusiv stația de conexiune proprie și eventuale clădiri civile din vecinătate) se dimensionează conform NFPA 855, cu marjă suplimentară dacă amplasamentul este adiacent unor zone cu prezență umană regulată.

## 4. Detecție și alarmare

### 4.1. Detecția specifică gazelor de thermal runaway

Instalarea, în interiorul fiecărui container, a unor senzori dedicați de detectare a gazelor specifice fazei incipiente de thermal runaway (hidrogen, monoxid de carbon, compuși organici volatili din electrolit), care oferă o alertă TIMPURIE, înainte de apariția flăcării vizibile — element de detecție superior unui detector de fum/temperatură convențional, insuficient de rapid pentru acest fenomen specific.

### 4.2. Interconectarea cu sistemul de management al bateriei (BMS)

Sistemul de detecție se interconectează cu BMS-ul (Battery Management System), care poate izola electric modulul/rack-ul afectat la primele semne de anomalie (temperatură, tensiune, curent anormal), prevenind escaladarea înainte ca fenomenul termic să se declanșeze complet.

## 5. Măsuri de limitare a propagării și de răcire

### 5.1. Sistemul de răcire/stingere

Fiecare container este echipat cu un sistem dedicat (funcție de tehnologia adoptată — sistem de răcire cu apă pulverizată, agent de stingere specific pentru baterii litiu-ion, sau sistem pasiv de barieră termică), conform recomandarea producătorului și rezultatele raportului UL 9540A. Obiectivul sistemului este **răcirea containerului afectat și prevenirea propagării către containerele adiacente**, NU stingerea reacției chimice interne a celulei.

### 5.2. Ventilarea gazelor de explozie

Fiecare container se echipează cu un sistem de ventilare/decompresie care direcționează gazele generate de thermal runaway (potențial inflamabile/toxice) către o zonă sigură, evitând acumularea internă care ar putea genera o explozie de gaz.

## 6. Organizarea intervenției ISU

### 6.1. Procedura de intervenție specifică

Se elaborează, împreună cu ISU teritorial, o procedură de intervenție specifică instalațiilor BESS, care recunoaște particularitatea fenomenului (imposibilitatea stingerii convenționale a reacției interne, riscul de reaprindere, riscul electric al bateriilor sub tensiune chiar în timpul incendiului). Personalul ISU este informat, prin fișa de siguranță anexată, asupra riscurilor specifice (electrocutare, gaze toxice, reaprindere) și asupra strategiei corecte de intervenție (răcire perimetrală, evacuare a zonei, fără tentativa de stingere directă a containerului afectat).

### 6.2. Accesul autospecialelor

Se prevede o platformă de intervenție pentru autospecialele de pompieri, cu acces la fiecare container, conform planul de situație, și un drum perimetral care permite abordarea din orice direcție.

## 7. Concluzii

Scenariul de securitate la incendiu al instalației BESS tratează cu prioritate riscul specific de **thermal runaway**, fundamentat pe raportul de testare UL 9540A al configurației contractate (nu pe valori generice), cu distanțe de siguranță conforme NFPA 855, detecție timpurie a gazelor specifice, izolare electrică automată prin BMS, sisteme de răcire/limitare a propagării și o procedură de intervenție ISU adaptată particularității fenomenului.
