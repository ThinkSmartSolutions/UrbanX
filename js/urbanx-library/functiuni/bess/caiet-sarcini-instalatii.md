---

# CAIET DE SARCINI — INSTALAȚII ELECTRICE, SCADA ȘI SISTEME DE DETECȚIE/RĂCIRE
## BESS 25 MW / 50 MWh
### Faza: Proiect Tehnic de execuție (PTh) — HG 907/2016

---

### PREVEDERI GENERALE APLICABILE TUTUROR CATEGORIILOR

**Cadru legal general de referință:**

| Act normativ | Obiect |
|---|---|
| Legea 10/1995 (rep.) | Calitatea în construcții |
| I7/2011 | Instalații electrice |
| Legea 123/2012, reglementări ANRE (Cod RET/RED) | Racordarea la rețea |
| IEC 62933, IEC 62619, IEC 63056 | Standarde tehnice sisteme de stocare — performanță și siguranță |
| NFPA 855, UL 9540A | Distanțe de siguranță, testare propagare termică |
| P118-1/2/3 | Securitate la incendiu |
| HG 343/2017 | Recepția lucrărilor de construcții |

**Cerință transversală specifică:** toate echipamentele electrice și de automatizare se pun în operă STRICT conform documentația tehnică a producătorului containerelor — instalația BESS este un sistem integrat certificat, nu o compunere liberă de componente.

---

## 1. RACORD ELECTRIC ȘI CELULE DE MEDIE TENSIUNE

### 1.1 Obiectul

Execuția racordului electric de la containere la stația de conexiune proprie și la punctul de evacuare în SEN, conform Avizul Tehnic de Racordare (ATR).

### 1.2 Materiale

| Material | Caracteristică impusă |
|---|---|
| Cablu MT | conform proiect, dimensionat la curentul nominal și verificat la scurtcircuit |
| Celule MT | conform Codul Tehnic al RED/RET, cu protecții de linie |
| Transformator (dacă e cazul, ridicare de tensiune) | conform ATR, cu cuvă de retenție a uleiului |

### 1.3 Execuția lucrărilor

Cablarea MT se pune în operă conform planul de traseu, cu respectarea razelor minime de curbură ale cablului. Celulele MT se instalează conform schema monofilară de proiect, cu protecțiile de linie reglate la valorile din studiul de selectivitate.

### 1.4 Verificări, controlul calității și probe

| Probă | Cerință |
|---|---|
| Rezistența de izolație a cablurilor MT | conform normativ, măsurare pe fiecare tronson |
| Funcționarea protecțiilor de linie | test de declanșare la valorile reglate |
| Continuitatea împământării | pe toate elementele metalice |

### 1.5 Recepția lucrărilor

**Lucrări ascunse:** cablurile îngropate — PVLA obligatoriu. **Fază determinantă:** testele electrice complete, ÎNAINTE de energizare.

### 1.6 Măsurarea și decontarea

La **metru liniar (ml)** de cablu, **set** pentru celule/transformator.

---

## 2. SISTEMUL DE MANAGEMENT AL BATERIEI (BMS) ȘI SCADA/EMS

### 2.1 Obiectul

Integrarea sistemului de monitorizare și comandă (BMS la nivel de modul/container, EMS la nivel de instalație), cu interconectare la sistemul de detecție a thermal runaway.

### 2.2 Standarde de referință

| Referință | Titlu |
|---|---|
| IEC 62933-5 | Cerințe de siguranță funcțională a sistemului integrat (BMS, PCS, protecție la incendiu) |

### 2.3 Execuția lucrărilor

BMS-ul se configurează conform parametrii producătorului (praguri de tensiune/temperatură/curent pentru izolarea automată a modulelor anormale). EMS-ul (Energy Management System) se integrează cu SCADA-ul general al instalației, cu telecomandă/telemăsură către dispecerul operatorului de rețea, conform cerințele ATR.

### 2.4 Verificări și recepția

Test funcțional al izolării automate a unui modul la simularea unei anomalii, verificarea telecomenzii/telemăsurii către dispecer. **Fază determinantă:** integrarea completă BMS-EMS-SCADA.

### 2.5 Măsurarea și decontarea

La **set** pentru sistemul BMS/EMS/SCADA complet configurat.

---

## 3. SISTEMUL DE DETECȚIE A THERMAL RUNAWAY ȘI RĂCIRE/LIMITARE A PROPAGĂRII

### 3.1 Obiectul

Execuția sistemului dedicat de detecție a gazelor specifice fazei incipiente de thermal runaway și a sistemului de răcire/limitare a propagării, conform scenariul de securitate la incendiu al acestei funcțiuni și raportul UL 9540A.

### 3.2 Execuția lucrărilor

Senzorii de gaze (hidrogen, CO, compuși organici volatili) se instalează în interiorul fiecărui container, la pozițiile conform proiect, interconectați cu BMS (pentru izolare electrică automată) și cu centrala de detecție incendiu (pentru alarmare). Sistemul de răcire/limitare a propagării se instalează conform specificația producătorului containerului, cu testarea funcțională a activării automate la detectarea unei anomalii.

### 3.3 Verificări, controlul calității și probe

| Probă | Cerință |
|---|---|
| Funcționarea senzorilor de gaze (test la concentrație simulată) | detectare corectă, la fiecare container |
| Activarea automată a sistemului de răcire/limitare | test conform specificația producătorului |
| Interconectarea cu BMS (izolare automată) | test funcțional integral |

### 3.4 Recepția lucrărilor

**Fază determinantă:** testul funcțional complet al sistemului de detecție-izolare-răcire, la fiecare container, obligatoriu pentru avizul ISU.

### 3.5 Măsurarea și decontarea

La **bucată (buc.)/set** per container.

---

## 4. INSTALAȚII DE VENTILARE A CONTAINERELOR

### 4.1 Obiectul

Execuția ventilării/climatizării fiecărui container, pentru menținerea temperaturii optime de funcționare a bateriilor (element determinant pentru durata de viață și performanța acestora).

### 4.2 Execuția lucrărilor

Unitățile de climatizare dedicate fiecărui container se montează conform specificația producătorului, cu redundanță (N+1) recomandată pentru continuitatea răcirii — o pană prelungită de climatizare la sarcină termică mare poate accelera degradarea bateriilor sau, în cazuri extreme, contribui la declanșarea unei anomalii termice.

### 4.3 Verificări și recepția

Funcționarea climatizării la debitul/temperatura de proiect, testul de redundanță (comutare pe unitatea de rezervă). **Finală:** verificare integrală.

### 4.4 Măsurarea și decontarea

La **bucată (buc.)** de unitate de climatizare per container.

---

## 5. RECEPȚIA FINALĂ A LUCRĂRILOR DE INSTALAȚII

Recepția la terminarea lucrărilor de instalații se efectuează conform HG nr. 343/2017. Se verifică suplimentar, specific acestei funcțiuni: **testele electrice complete** (izolație, protecții, la fiecare container/celulă), **funcționarea integrală a sistemului de detecție-izolare-răcire a thermal runaway**, **integrarea BMS-EMS-SCADA** cu telecomandă/telemăsură conform ATR, și **avizul ISU**, condiții obligatorii pentru punerea sub tensiune comercială și licențierea ANRE.
