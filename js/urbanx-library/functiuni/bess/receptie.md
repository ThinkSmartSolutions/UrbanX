# RECEPȚIA LUCRĂRILOR DE CONSTRUCȚII
## Sistem de stocare a energiei în baterii (BESS), 25 MW / 50 MWh

*Întocmit conform HG nr. 273/1994 (modificat prin HG nr. 343/2017), Legii nr. 10/1995, Legii nr. 50/1991, Legii nr. 123/2012, reglementărilor ANRE, P130/1999. Cuprinde: recepția la terminarea lucrărilor + recepția finală + cartea tehnică + urmărirea comportării în timp.*

## 1. Cadru legal și obiectul recepției

### 1.1. Definiția și scopul recepției

Recepția lucrărilor de construcții reprezintă actul prin care investitorul declară că acceptă și preia lucrarea executată. Pentru o instalație BESS, recepția construcției (platforme, structură, racord electric) este distinctă și anterioară **punerii sub tensiune comerciale**, care este condiționată suplimentar de obținerea **avizului ISU** (risc mare de incendiu, thermal runaway), a confirmării Avizului Tehnic de Racordare (ATR) de către operatorul de rețea și a **licenței ANRE de stocare a energiei electrice**.

### 1.2. Actele normative aplicabile

| Nr. | Act normativ | Obiect de reglementare | Relevanță pentru obiectiv |
|----|--------------|------------------------|---------------------------|
| 1 | Legea nr. 10/1995 (rep.) | Calitatea în construcții | Cadru general |
| 2 | HG nr. 273/1994 + HG nr. 343/2017 | Procedura de recepție | Reglementare de bază |
| 3 | Legea nr. 50/1991 (rep.) | Autorizația de construire | Conformitatea execuției |
| 4 | Legea nr. 307/2006 + Ordinul MAI nr. 129/2016 | Autorizarea ISU pentru instalații cu risc mare | BESS — risc mare, thermal runaway |
| 5 | Legea nr. 123/2012, reglementări ANRE | Racordarea la rețea, licențierea stocării | ATR, licența de stocare — condiții de PIF comercial |
| 6 | NFPA 855, UL 9540A | Distanțe de siguranță, testare propagare termică | Verificare la recepție |

### 1.3. Cele două faze ale recepției

**Faza I — Recepția la terminarea lucrărilor.** Verifică realizarea integrală conform proiectului, cu accent pe conformitatea platformelor de fundare (greutate reală vs. proiectată), pe distanțele de siguranță efective între containere și pe testele electrice complete.

**Faza a II-a — Recepția finală.** Se efectuează după expirarea perioadei de garanție.

### 1.4. Obiectul recepției pentru prezentul obiectiv

Obiectul recepției îl constituie: **structura** (platformele de fundare a containerelor, fundațiile stației de conexiune), **instalațiile electrice** (racord MT, celule, transformator, cabluri, protecții, SCADA/EMS), **instalațiile de detecție a gazelor de thermal runaway și sistemele de răcire/limitare a propagării**, **bazinul de retenție a apelor de stingere**, **împrejmuirea și distanțele de siguranță efective**.

## 2. Programul de urmărire a recepției

### 2.1. Etapele procesului de recepție

| Etapa | Denumire | Responsabil | Termen orientativ |
|-------|----------|-------------|-------------------|
| E1 | Comunicarea terminării lucrărilor | Executant → Investitor | La finalizarea lucrărilor |
| E2 | Verificarea preliminară a stadiului fizic și a documentelor (inclusiv raportul UL 9540A) | Diriginte de șantier | 3-5 zile de la E1 |
| E3 | Numirea comisiei de recepție | Investitor | max. 15 zile de la E1 |
| E4 | Convocarea membrilor și invitaților | Investitor | min. 5 zile înainte |
| E5 | Întrunirea comisiei, testele electrice complete, verificarea distanțelor de siguranță | Comisia de recepție | Data din convocare |
| E6 | Redactarea și semnarea procesului-verbal | Secretar comisie | În ziua recepției |
| E7 | Comunicarea hotărârii către părți | Investitor | 3 zile de la semnare |
| E8 | Remedierea obiecțiilor (dacă e cazul) | Executant | Conform termenelor din anexă |
| E9 | Obținerea avizului ISU și a licenței ANRE de stocare | Investitor | Ulterior recepției, condiție pentru punerea sub tensiune comercială |
| E10 | Recepția finală (după garanție) | Comisia de recepție finală | La expirarea garanției |

### 2.2. Condiția de declanșare

Declanșarea recepției la terminarea lucrărilor este condiționată cumulativ de: (1) terminarea integrală a lucrărilor; (2) rezultate favorabile ale testelor electrice (izolație, continuitate, protecții pe fiecare container/celulă MT); (3) verificarea distanțelor de siguranță efective față de valorile din raportul UL 9540A; (4) existența cărții tehnice complete, cu raportul UL 9540A anexat; (5) obținerea autorizației de securitate la incendiu (ISU).

## 3. Componența comisiei de recepție la terminarea lucrărilor

### 3.1. Componența comisiei

| Rol în comisie | Cine îl asigură | Calitate | Obligativitate |
|----------------|-----------------|----------|----------------|
| Președinte | Reprezentant al investitorului | Membru cu drept de vot | Obligatoriu |
| Membru | Specialist electric MT (racord, protecții) | Membru cu drept de vot | Obligatoriu |
| Membru | Specialist structură (platforme de fundare) | Membru cu drept de vot | Obligatoriu |
| Membru | Delegat al administrației publice (emitent AC) | Membru cu drept de vot | Obligatoriu |
| Secretar | Desemnat dintre membri sau din partea investitorului | Redactează PV | Obligatoriu |

## 4. Verificări specifice la recepția unei instalații BESS

### 4.1. Verificarea distanțelor de siguranță

Se măsoară efectiv distanțele între containere și față de limitele de proprietate/construcții învecinate, comparate cu valorile stabilite în scenariul de securitate la incendiu (fundamentate pe raportul UL 9540A) — verificare obligatorie, nu presupusă din proiect.

### 4.2. Verificarea sistemului de detecție a thermal runaway

| Element verificat | Cerință |
|---|---|
| Funcționarea senzorilor de gaze specifici (hidrogen, CO, COV) | test funcțional la fiecare container |
| Interconectarea cu BMS (izolare electrică automată) | test de simulare a unei anomalii |
| Funcționarea sistemului de răcire/limitare a propagării | test conform specificația producătorului |

### 4.3. Verificarea bazinului de retenție a apelor de stingere

Etanșeitatea și capacitatea de retenție, conform proiectul de mediu.

### 4.4. Teste electrice

Rezistența de izolație, continuitate, funcționarea protecțiilor de linie, pe fiecare container/celulă MT, ÎNAINTE de energizarea completă a instalației.

## 5. Cartea Tehnică a Construcției

### 5.1. Structura Cărții Tehnice

Conform HG nr. 273/1994: **Capitolul A** (proiect, avize — inclusiv raportul UL 9540A, ATR, PV-uri de lucrări ascunse); **Capitolul B** (jurnalul de șantier, rezultatele testelor electrice); **Capitolul C** (instrucțiuni de exploatare — inclusiv procedura de intervenție ISU specifică thermal runaway, planul de gestionare a bateriilor la finalul duratei de viață).

### 5.2. Predarea către operator

Cartea Tehnică se predă operatorului, cu obligația menținerii funcționale a sistemelor de detecție/răcire pe toată durata de exploatare.

## 6. Urmărirea comportării în timp (P130/1999)

Se instituie un program de urmărire curentă, cu verificare periodică a degradării capacității bateriilor (comparată cu curba de degradare garantată de producător) și a funcționării sistemelor de siguranță (detecție, răcire, BMS).

## 7. Recepția finală

Se efectuează la expirarea perioadei de garanție, verificând comportarea instalației și degradarea reală a capacității față de curba garantată.
