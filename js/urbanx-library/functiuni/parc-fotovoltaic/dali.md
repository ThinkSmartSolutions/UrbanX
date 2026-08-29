# DOCUMENTAȚIE DE AVIZARE A LUCRĂRILOR DE INTERVENȚII (D.A.L.I.)
## Repowering / Retehnologizare și Extindere de Capacitate — Parc Fotovoltaic (Centrală Electrică Fotovoltaică existentă)

*Întocmită conform HG nr. 907/2016 (conținut-cadru DALI, Anexa nr. 5), Legii nr. 10/1995 (rep.), Legii nr. 123/2012 a energiei electrice, Ordinului ANRE nr. 59/2013 (rep.) — regulamentul de racordare, SR EN 1990/1991-1-3/1991-1-4, P100-1/2013. Aplicabilă unei **centrale electrice fotovoltaice (CEF) existente, aflate în funcțiune**, pentru care se analizează oportunitatea unor lucrări de intervenție: reabilitare/înlocuire echipamente uzate moral și fizic (repowering), extindere de capacitate pe terenul existent sau pe suprafață adiacentă, și upgrade al soluției de racordare.*

> **NOTĂ METODOLOGICĂ — DOCUMENT PARAMETRIC.** Ca și memoriul tehnic general (DTAC) și DTOE ale acestei funcțiuni, prezentul DALI este redactat **parametric** în raport cu puterea instalată existentă **P_DC,exist** [kWp] și cu puterea instalată propusă după intervenție **P_DC,prop** [kWp] — ambele variabile de proiect, stabilite de la caz la caz prin releveul instalației existente și, respectiv, prin studiul de fezabilitate a repowering-ului. Exemplele numerice sunt etichetate explicit **„Exemplu de calcul"** pentru o centrală de referință **P_DC,exist = 2 MWp, în funcțiune de 12 ani**, repowered la **P_DC,prop = 3,2 MWp**; formulele permit recalcularea pentru orice pereche de puteri.

---

## 1. Date generale

### 1.1. Denumirea obiectivului de investiții

**„Reabilitare, retehnologizare (repowering) și extindere de capacitate a centralei electrice fotovoltaice existente [denumire], prin înlocuirea modulelor și invertoarelor uzate, upgrade-ul instalațiilor de medie tensiune și extinderea câmpului fotovoltaic pe suprafața de teren adiacentă disponibilă"**

### 1.2. Beneficiarul / titularul investiției

| Element | Date |
|---|---|
| Titular / investitor | [Denumire societate] S.R.L./S.A., CUI [_______], titular al licenței de producere ANRE nr. [_______] |
| Calitatea față de teren | Proprietar / titular drept de superficie, conform titlului de proprietate existent |
| Sursa de finanțare | Fonduri proprii + credit bancar / leasing echipamente +, după caz, finanțare nerambursabilă (Fondul de Modernizare, PNRR — componenta energie) |
| Statut existent | Centrală în exploatare comercială, cu licență ANRE de exploatare validă, racordată la rețeaua de distribuție |

### 1.3. Amplasamentul

Centrala este amplasată pe un teren extravilan/agricol scos din circuitul agricol la momentul autorizării inițiale, în UAT [localitate], județul [județ]. Documentația actuală (CF, contract de racordare, PIF) este disponibilă în cartea tehnică a instalației existente.

| Indicator amplasament | Situație existentă | Situație propusă (după extindere) |
|---|---|---|
| Suprafață teren ocupată de CEF | S_exist (rezultată din P_DC,exist, cf. formulei S_teren ≈ P_DC / 0,9 MWp/ha) | S_prop = S_exist + S_extindere |
| Categorie de folosință | Curți-construcții / neproductiv (post scoatere din circuit agricol) | Neschimbată pe zona extinsă (nouă scoatere din circuit agricol dacă e cazul) |
| Regim juridic | Proprietate/superficie a titularului | Neschimbat, sau extins pe parcelă adiacentă achiziționată/concesionată |
| Zonă seismică (P100-1/2013) | ag conform hărții de zonare a amplasamentului | Neschimbată |
| Zonă de vânt/zăpadă (CR 1-1-3/1-1-4) | conform hărților de zonare | Neschimbată |

### 1.4. Situația existentă a instalației

Centrala a fost pusă în funcțiune în anul **[an PIF]**, cu o putere instalată inițială **P_DC,exist = 2.000 kWp** (exemplu de referință), realizată cu module monocristaline de generație mai veche (putere unitară 300–330 Wp, tehnologie Al-BSF/PERC de primă generație), invertoare centrale/string de generație corespunzătoare epocii, structuri de susținere fixe pe piloți bătuți și un post de transformare 0,4/20 kV de 1.600 kVA racordat prin LES 20 kV la rețeaua operatorului de distribuție.

Instalația funcționează de **12 ani** (exemplu), aflându-se în a doua jumătate a duratei de viață proiectate (25–30 ani), cu o degradare cumulată a puterii de ieșire estimată prin curba de degradare garantată (cap. 2).

### 1.5. Categoria și clasa de importanță

| Criteriu | Încadrare | Temei |
|---|---|---|
| Categorie de importanță | **C — construcție de importanță normală** (structuri suport, PT) | HG nr. 766/1997 |
| Clasă de importanță seismică | **III** (γI,e = 1,0) | P100-1/2013, tab. 4.2 |
| Grad de protecție la incendiu | Conform scenariului PSI existent, actualizat dacă se modifică sarcina termică (baterii/containere noi) | P118/1999 |

Repowering-ul nu modifică, de regulă, categoria/clasa de importanță — regimul de exploatare rămâne nesupravegheat permanent, fără personal rezident.

---

## 2. Situația existentă — evaluare tehnică a instalației (echivalent expertiză tehnică)

### 2.1. Metodologia de evaluare

Evaluarea situației existente s-a realizat prin: (a) analiza jurnalului de exploatare și a rapoartelor SCADA (producție lunară/anuală, disponibilitate, alarme), (b) inspecție termografică (IEC 62446-3) a câmpului fotovoltaic pentru identificarea hot-spot-urilor și a modulelor defecte, (c) măsurători electrice de curbă I-V pe un eșantion reprezentativ de stringuri, (d) inspecție vizuală și test de smulgere (pull-out) pe un eșantion de piloți pentru verificarea integrității ancorajului, (e) analiza rapoartelor de mentenanță ale invertoarelor și PT, (f) analiza contractului și a avizului de racordare existent (capacitate rezervată vs. capacitate disponibilă în punctul de racordare).

### 2.2. Performanța energetică constatată — curba de degradare reală vs. garantată

| An de exploatare | Producție realizată (MWh, normalizată la iradiație) | Producție teoretică (garanție 0,55%/an) | Abatere |
|---|---|---|---|
| An 1 | 2.378 | 2.378 | referință |
| An 6 | 2.297 | 2.309 | −0,5% (în limite) |
| An 12 (actual) | 2.198 | 2.235 | **−1,7%** (degradare ușor accelerată) |

**Interpretare (formula de degradare, coerentă cu cap. 4 din memoriul tehnic general):** E_k = E_1 × (1 − d)^(k−1). Abaterea de −1,7% față de curba garantată la anul 12 este atribuită parțial degradării induse de potențial (PID) pe un lot de module cu împământare deficitară a cadrelor (constatat termografic) și parțial murdăririi/soilingului acumulat peste valorile de proiectare inițiale. Deficitul este **recuperabil parțial** prin mentenanță corectivă (re-echipotențializare, curățare) și **integral compensat** prin repowering (înlocuire cu module noi la puterea nominală certificată).

### 2.3. Starea tehnică constatată pe subsisteme

| Subsistem | Constatare | Cauză | Acțiune necesară |
|---|---|---|---|
| Module fotovoltaice (generație inițială) | Randament unitar scăzut (η ≈ 16,5% vs. 21,3–21,5% la modulele actuale), P_modul 300–330 Wp, câteva procente module defecte (diode bypass arse, delaminări) | Uzură fizică + tehnologie depășită moral (10+ ani decalaj tehnologic) | **Înlocuire integrală** cu module bifaciale de generație nouă (555 Wp, PERC/TOPCon) |
| Structuri de susținere (piloți + mese metalice) | Coroziune incipientă locală la joncțiuni (strat de zinc parțial consumat, categorie corozivitate C3), integritate structurală generală bună la testul de smulgere | Îmbătrânire normală a galvanizării la 12 ani din durata de viață proiectată de 25 ani | **Reabilitare selectivă** (retușare anticorozivă) + verificare structurală la noua configurație de montaj (module mai mari/mai grele) |
| Invertoare | Randament sub cel al generației actuale (η ≈ 96,5% vs. 98,0–98,6%), funcții de rețea (grid support) sub cerințele actuale RfG, disponibilitate în scădere (avarii tot mai frecvente, componente greu de aprovizionat) | Uzură + tehnologie depășită moral | **Înlocuire integrală** cu invertoare noi, conforme Regulamentului (UE) 2016/631 |
| Cabluri DC/AC | Stare bună generală, izolație conformă la testele periodice de rezistență de izolație | — | Reutilizare parțială (cablurile DC de string se înlocuiesc odată cu modulele; cablurile AC/PT se păstrează dacă secțiunea acoperă noua putere) |
| Post de transformare | Funcțional, randament bun, dar capacitate insuficientă pentru puterea AC rezultată din repowering | Creșterea P_AC odată cu extinderea | **Upgrade/suplimentare** capacitate PT |
| Racord MT / ATR | Contract de racordare existent pentru P_DC,exist; capacitate rezervată insuficientă pentru P_DC,prop | Extinderea de capacitate depășește ATR-ul inițial | **Solicitare ATR suplimentar/modificat** de la OD |
| Împrejmuire, drumuri, SCADA, CCTV | Stare tehnică bună, funcționale | — | Menținere, extindere pe suprafața nouă |

### 2.4. Concluzia evaluării tehnice

Instalația existentă este **funcțională și în exploatare comercială**, dar prezintă un decalaj tehnologic semnificativ față de generația actuală de echipamente (randament modul +5 puncte procentuale, randament invertor +1,5–2 puncte procentuale, funcții de rețea sub cerințele curente), precum și semne incipiente de îmbătrânire a structurii de susținere și o capacitate de racordare epuizată pentru orice extindere. Situația **justifică tehnic și economic** o intervenție de repowering și extindere, tratată în variantele de la cap. 6.

---

## 3. Soluția tehnică propusă — repowering și extindere

### 3.1. Componenta de repowering (înlocuire echipamente pe amprenta existentă)

| Element | Situație existentă | Soluție propusă |
|---|---|---|
| Module | N_exist = P_DC,exist / P_modul,exist ≈ 2.000.000/310 ≈ **6.452 module** (310 Wp) | N_nou = P_DC,exist,repowered / P_modul,nou ≈ 2.900.000/555 ≈ **5.225 module** (555 Wp bifacial) — **putere DC crescută pe aceeași amprentă** prin randament superior/m² |
| Invertoare | generație veche, η ≈ 96,5%, fără funcții avansate RfG | invertoare noi, η ≥ 98,3%, conforme RfG tip B, cu funcții Q(U)/LVRT |
| Structuri suport | reutilizate după reabilitare anticorozivă locală și verificare la noua greutate/dimensiune a modulelor (SR EN 1993-1-1/-1-3) | reutilizare parțială + completare cu structuri noi pe zona de extindere |
| Cabluri DC | înlocuite odată cu modulele (conectori/secțiune adaptați la noii parametri electrici) | H1Z2Z2-K noi, conform IEC 62548 |

**Justificarea creșterii de putere DC pe aceeași suprafață (repowering densificator):** randamentul modulului crește de la η_exist ≈ 16,5% (310 Wp/1,88 m²) la η_nou ≈ 21,4% (555 Wp/2,58 m²); la aceeași amprentă orizontală ocupată de mese (GCR neschimbat), puterea instalabilă crește proporțional cu raportul randamentelor: **P_DC,densificat ≈ P_DC,exist × (η_nou/η_exist) ≈ 2.000 × 1,297 ≈ 2.594 kWp**, doar din înlocuirea modulelor pe amprenta veche, fără a ocupa teren suplimentar.

### 3.2. Componenta de extindere (capacitate suplimentară pe teren adiacent)

Pe suprafața de teren adiacentă disponibilă (deja identificată/în curs de achiziție-concesionare), se propune extinderea câmpului fotovoltaic cu module de aceeași generație nouă, aplicând integral soluția tehnică descrisă în memoriul tehnic general (DTAC) al acestei funcțiuni — structuri fixe, stringuri, invertoare, racordare la PT-urile noi.

**Formula de dimensionare a extinderii:** P_DC,extindere = P_DC,prop − P_DC,densificat. *Exemplu de calcul:* pentru P_DC,prop țintă = 3.200 kWp, rezultă P_DC,extindere = 3.200 − 2.594 ≈ **606 kWp**, necesitând S_extindere ≈ 606/900 ≈ **0,67 ha** (formula S_teren ≈ P_DC[kWp]/0,9 MWp/ha din memoriul tehnic general, cap. 5).

### 3.3. Upgrade al postului/posturilor de transformare și al racordului

| Indicator | Existent | Propus |
|---|---|---|
| Putere AC rezultată (P_AC = P_DC,prop/ILR, ILR 1,25) | 1.600 kVA (P_AC,exist) | P_AC,prop = 3.200/1,25 = **2.560 kVA** |
| Capacitate PT | 1×1.600 kVA | **1×1.600 kVA existent + 1×1.000 kVA nou** (sau upgrade la 2×1.600 kVA) |
| ATR/contract racordare | pentru 1.600 kVA | **ATR modificat/suplimentar** pentru 2.560 kVA, solicitat la OD conform Ord. ANRE nr. 59/2013 |
| Cablu MT existent | dimensionat pentru I_n ≈ 46 A (1.600 kVA) | verificare/înlocuire pe tronsonul supraîncărcat; I_n,prop ≈ 2.560.000/(1,732×20.000) ≈ **74 A** |

Solicitarea unui **ATR suplimentar/modificat** este pasul procedural determinant al întregii investiții de extindere: capacitatea de evacuare disponibilă în punctul de racordare, confirmată de operatorul de distribuție, condiționează fezabilitatea tehnică a variantei maximale (cap. 6).

### 3.4. Verificarea structurală a reutilizării (structuri suport existente)

Verificarea la SLU/SLS a structurilor metalice existente reutilizate se reface conform SR EN 1990/1991-1-3/1991-1-4 și SR EN 1993-1-1/-1-3, considerând: (a) noua greutate/dimensiune a modulelor (module mai mari, posibil mai grele per unitate de suprafață dacă se trece la sticlă-sticlă), (b) reducerea secțiunii utile a elementelor metalice prin coroziunea constatată (cap. 2.3), (c) actualizarea coeficienților din hărțile de zonare vânt/zăpadă în vigoare, dacă normativele au fost revizuite de la proiectarea inițială. Rezultatul verificării condiționează decizia de reutilizare integrală, reutilizare cu reabilitare anticorozivă, sau înlocuire a structurii pe zonele cu deficit de capacitate.

---

## 4. Impact asupra racordării la rețea și a licențierii ANRE

### 4.1. Regimul procedural al extinderii de capacitate

Extinderea puterii instalate a unei CEF existente peste puterea aprobată prin licența de exploatare comercială impune reluarea unui ciclu procedural similar unei investiții noi, dar limitat la delta de putere:

1. **Solicitare ATR modificat/suplimentar** la operatorul de distribuție, cu depunerea unui nou studiu de soluție dacă delta de putere depășește pragurile din regulamentul de racordare.
2. **Actualizarea autorizației de înființare ANRE** (dacă puterea totală depășește pragurile de la care este necesară) sau notificare, după caz.
3. **Autorizație de construire** pentru lucrările de extindere/repowering (DTAC), obiectul distinct al fazei următoare de proiectare.
4. **PIF suplimentar** pentru capacitatea nou-adăugată și **actualizarea licenței de exploatare comercială ANRE** la puterea totală rezultată.

### 4.2. Compatibilitatea cu Codul Tehnic al Rețelei Electrice de Distribuție

Invertoarele noi trebuie certificate conform clasificării RfG aplicabile puterii **totale** rezultate la punctul de conectare (nu doar componentei nou-adăugate), ceea ce poate schimba încadrarea de tip (A/B/C/D) și cerințele funcționale (reglaj de frecvență, capabilitate reactivă, LVRT) — aspect verificat explicit la faza de proiectare tehnică (P.Th.), pe baza puterii finale confirmate prin ATR.

---

## 5. Impact de mediu al intervenției

Repowering-ul propriu-zis (înlocuire echipamente pe amprenta existentă) **nu implică ocupare de teren suplimentară** și nu modifică regimul juridic/categoria de folosință a terenului deja scos din circuitul agricol. Extinderea pe suprafața adiacentă necesită parcurgerea procedurii de evaluare a impactului asupra mediului (Legea nr. 292/2018) pentru suprafața nou-ocupată și, dacă e cazul, o nouă scoatere din circuitul agricol (Legea nr. 18/1991) proporțională cu S_extindere.

Componentele electrice/electronice înlocuite (module vechi, invertoare vechi) intră sub incidența **Legii nr. 249/2015** privind gestionarea deșeurilor de echipamente electrice și electronice (DEEE) — se prevede un plan de dezmembrare/reciclare prin operator autorizat, cu trasabilitate documentată, inclusă în devizul de organizare a lucrărilor (DTOE, cap. „gestionarea deșeurilor").

---

## 6. Scenarii / variante de intervenție

### 6.1. Varianta 1 — REPOWERING MINIMAL (fără extindere de teren)

Înlocuirea integrală a modulelor și invertoarelor pe amprenta existentă (densificare la P_DC,densificat ≈ 2.594 kWp, cf. cap. 3.1), cu reabilitare selectivă a structurilor de susținere (retușare anticorozivă) și fără upgrade major al PT (capacitatea existentă de 1.600 kVA acoperă P_AC = 2.594/1,25 ≈ 2.075 kVA doar parțial — necesită totuși o mărire moderată a PT).

### 6.2. Varianta 2 — REPOWERING + EXTINDERE MAXIMALĂ

Repowering integral (ca la Varianta 1) **plus** extinderea de capacitate pe terenul adiacent (P_DC,extindere ≈ 606 kWp), cu upgrade complet al postului de transformare (PT suplimentar) și solicitarea unui ATR nou pentru puterea totală de 3.200 kWp.

### 6.3. Analiză comparativă

| Criteriu | Var. 1 — Repowering minimal | Var. 2 — Repowering + extindere |
|---|---|---|
| Putere instalată finală (P_DC) | 2.594 kWp | **3.200 kWp** |
| Suprafață de teren suplimentară | 0 ha | ~0,67 ha |
| Energie anuală estimată (E = P_DC × PSH × PR, PSH 1.450, PR 0,84 — repowering crește PR prin echipamente noi) | ≈ 3.153 MWh/an | **≈ 3.891 MWh/an** |
| Creștere producție față de situația actuală (2.198 MWh/an) | +43,5% | **+77,0%** |
| Necesită ATR nou | Parțial (upgrade PT moderat) | **Da, integral** |
| Valoare investiție (fără TVA, estimativ) | ~980.000 EUR | **~1.520.000 EUR** |
| Durată execuție | ~4 luni | **~7 luni** |
| Recuperare investiție (din creșterea de producție + reducerea O&M) | ~7,2 ani | **~6,4 ani** |

### 6.4. Varianta recomandată

Se recomandă **Varianta 2 — Repowering + extindere maximală**, motivat prin: (a) valorificarea integrală a capacității de racordare suplimentare disponibile în zonă (confirmată prin studiu de soluție preliminar), care altfel s-ar pierde ca oportunitate; (b) economia de scară a lucrărilor de organizare de șantier (o singură mobilizare pentru ambele componente); (c) rata de recuperare mai favorabilă (6,4 ani vs. 7,2 ani) datorită creșterii proporțional mai mari a producției față de costul marginal al extinderii (infrastructura de incintă, drumuri, împrejmuire, SCADA fiind deja amortizată de instalația existentă).

---

## 7. Indicatori tehnico-economici + eșalonare

### 7.1. Indicatori tehnico-economici (Varianta recomandată)

| Indicator | Valoare |
|---|---|
| Putere instalată finală (P_DC) | 3.200 kWp |
| Valoare totală investiție (inclusiv TVA) | ~1.809.000 EUR |
| din care C+M (inclusiv TVA) | ~1.520.000 EUR |
| Energie anuală estimată an 1 | 3.891 MWh/an |
| Creștere producție vs. situație actuală | +77,0% |
| CO₂ evitat suplimentar (f_emisie SEN) | proporțional cu delta de energie, cf. formulei din memoriul tehnic general cap. 4 |
| Durata de execuție | 7 luni |
| Durata de recuperare a investiției (simplu, din creșterea de venit) | 6,4 ani |
| Durata de viață reziduală proiectată după repowering | 25–30 ani (echipamente noi) |

### 7.2. Eșalonarea investiției

| Etapă | Interval | Pondere |
|---|---|---|
| Proiectare + avize (ATR modificat, DTAC, PT) | Luni 1–3 | 15% |
| Demontare echipamente vechi + gestionare DEEE | Luna 4 | 10% |
| Montaj module/invertoare noi + extindere câmp FV | Lunile 4–6 | 55% |
| Upgrade PT + racord + SCADA | Lunile 5–6 | 12% |
| Punere sub tensiune, teste, PIF, actualizare licență ANRE | Luna 7 | 8% |

---

## 8. Avize și acorduri necesare + concluzii

### 8.1. Avize și acorduri necesare

| Aviz / acord | Emitent | Temei |
|---|---|---|
| Certificat de urbanism (pentru zona de extindere) | Primărie/Consiliu Județean | Legea nr. 50/1991 |
| ATR modificat/suplimentar | Operator de Distribuție (OD) | Ord. ANRE nr. 59/2013 |
| Actualizare autorizație de înființare / licență exploatare | ANRE | Legea nr. 123/2012 |
| Decizia etapei de încadrare (pentru suprafața de extindere) | APM | Legea nr. 292/2018 |
| Scoatere din circuit agricol (suprafața de extindere) | Direcția Agricolă | Legea nr. 18/1991 |
| Verificare proiect cerința A1 (structuri reutilizate/noi) | Verificator tehnic atestat | Legea nr. 10/1995 |
| Autorizație de construire | Autoritatea emitentă CU | Legea nr. 50/1991 |
| Plan de gestionare DEEE (echipamente înlocuite) | Operator autorizat de reciclare | Legea nr. 249/2015 |

### 8.2. Concluzii

Documentația de Avizare a Lucrărilor de Intervenții demonstrează **fezabilitatea tehnică și oportunitatea economică** a repowering-ului centralei electrice fotovoltaice existente, motivată de decalajul tehnologic constatat (randament modul și invertor sub generația actuală) și de o degradare a producției ușor peste curba garantată, precum și oportunitatea extinderii de capacitate pe terenul adiacent disponibil, condiționată de obținerea unui ATR modificat/suplimentar de la operatorul de distribuție.

Se recomandă aprobarea **Variantei 2 — Repowering + extindere maximală** (P_DC final 3.200 kWp, creștere de producție +77%) și trecerea la fazele următoare de proiectare (DTAC, PT, DE), cu respectarea integrală a normativelor: HG nr. 907/2016, Legea nr. 123/2012, Ordinul ANRE nr. 59/2013, Legea nr. 10/1995, P100-1/2013, SR EN 1990/1991-1-3/1991-1-4, Legea nr. 292/2018, Legea nr. 18/1991 și Legea nr. 249/2015.

> **Notă asupra caracterului parametric al documentului:** valorile numerice de mai sus ilustrează exemplul de referință (P_DC,exist = 2 MWp → P_DC,prop = 3,2 MWp). Pentru orice altă centrală existentă, se recalculează folosind aceleași formule: P_DC,densificat = P_DC,exist × (η_nou/η_exist); P_DC,extindere = P_DC,prop − P_DC,densificat; S_extindere ≈ P_DC,extindere[kWp]/900; E = P_DC × PSH_POA × PR — toate preluate din memoriul tehnic general (DTAC) al acestei funcțiuni, cap. 4–5.
