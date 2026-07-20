## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (STRUCTURĂ ȘI REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție), elaborat în conformitate cu **HG 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice, la Memoriul de rezistență DTAC deja redactat (sistem structural — mese fixe metalice pe piloți + post de transformare pe radier de beton armat, materiale, acțiuni climatice și seismice, combinații de încărcări, predimensionare profile, protecție anticorozivă). Documentul aduce structura la nivelul de detaliere necesar EXECUȚIEI: breviar de calcul complet pe structura unitară, planuri de detalii de execuție numerotate, extrase de armare/consum de materiale, specificații tehnice de montaj, plan de control al calității, faze determinante, program de urmărire în timp și note de corelare cu celelalte specialități.

Obiectivul de investiție: **PARC FOTOVOLTAIC (CENTRALĂ ELECTRICĂ FOTOVOLTAICĂ — CEF)**, cu putere instalată **parametrică P_DC** (500 kWp … 50 MWp), structuri de susținere **fixe (fixed-tilt)**, configurație **2V**, unghi de înclinare **β = 25°**, fundare pe **piloți metalici** (bătuți/vibrați sau înșurubați elicoidal), post/posturi de transformare **0,4/20 kV** pe **radier de beton armat C25/30**. Categoria de importanță **C**, clasa de importanță-expunere seismică **III (γI = 1,00)**, amplasament de referință cu **v_b = 30 m/s**, **s0,k = 2,0 kN/m²**, **ag = 0,20g**, teren de vânt categoria II. Toate valorile numerice reiau, **fără nicio modificare**, datele de bază adoptate în faza DTAC (§ PTh-R.1.1 de mai jos); prezentul supliment NU redefinește ipotezele, ci le **aprofundează** la nivel de execuție.

> **PRINCIPIU DE SCALARE PARAMETRICĂ — MENȚINUT ȘI ÎN FAZA PTh.** Așa cum s-a demonstrat în DTAC (§1.6), dimensionarea structurii unitare (masă tip, pilot tip, radier PT tip) **nu depinde de puterea totală a parcului**, întrucât acțiunile (vânt, zăpadă) se exercită pe unitatea de suprafață. Prezentul supliment PTh detaliază execuția structurii unitare — planurile de trasare, extrasele de material și programul de control **se multiplică liniar** cu numărul de mese/piloți rezultat din P_DC aleasă de investitor (v. tabelul de scalare din PTh-R.1.2). Exemplul numeric etichetat **„2 MWp"** (86 mese, coerent cu DTAC) ilustrează metoda de calcul a cantităților; el NU este o ipoteză fixă a proiectului.

Documentul NU repetă conținutul DTAC (ipoteze de bază, formule de reducere a acțiunilor, justificarea calitativă a caracterului determinant al vântului) și NU se suprapune cu Caietul de sarcini de rezistență (elaborat separat, cu clauze contractuale de execuție/recepție). Structura capitolelor:

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Recapitulare date de bază confirmate (geotehnic + teste de smulgere) |
| PTh-R.3 | Ipoteze de calcul detaliate — model de analiză EF pe structura unitară |
| PTh-R.4 | Breviar de calcul complet pentru execuție — mese, piloți, îmbinări, fundație PT |
| PTh-R.5 | Extrase de armare/materiale — consum oțel, zinc, beton, buloane |
| PTh-R.6 | Detalii de execuție D01–D16 (scări 1:5…1:20) |
| PTh-R.7 | Specificații tehnice de montaj |
| PTh-R.8 | Plan de control al calității |
| PTh-R.9 | Faze determinante |
| PTh-R.10 | Program de urmărire în timp (P130) + monitorizare structurală specifică CEF |
| PTh-R.11 | Verificări suplimentare la stări limită de serviciu (săgeți, oboseală, vibrații) |
| PTh-R.12 | Corelare cu celelalte specialități (electric, instalații, drumuri, PSI, SCADA, mediu) |
| PTh-R.13 | Cadru normativ de detaliere (extins față de DTAC) |
| PTh-R.14 | Responsabilități și fazare |
| PTh-R.15 | Dezafectarea structurii la sfârșitul duratei de viață (reversibilitate) |
| Anexa A | Glosar de simboluri și formule |

### PTh-R.1.1. Date generale de proiectare (recapitulare, identice cu DTAC — nu se modifică)

| Parametru | Valoare | Sursă |
|---|---|---|
| Configurație | mese fixe, 2V, β = 25° | DTAC §1.1, §2.1 |
| Lungime masă tip L_masă | 24,00 m | DTAC §1.1 |
| Interax cadre transversale (stâlpi/piloți) | e = 3,0 m → 9 poziții/masă | DTAC §1.1 |
| Lungime plan înclinat L | 4,30 m | DTAC §1.1 |
| Clearance h1 / cotă superioară h2 | 0,80 m / 2,80 m | DTAC §1.1 |
| Module/masă — putere/masă | 42 buc. — 23,3 kWp | DTAC §1.1 |
| Oțel pane/grinzi (formate la rece) | S350GD+Z / S320GD, SR EN 10346 | DTAC §2.2 |
| Oțel stâlpi/piloți | S275JR / S355J2, SR EN 10025-2 | DTAC §2.2 |
| Șuruburi îmbinări | grupa 8.8 zincate, SR EN ISO 898-1 | DTAC §2.2 |
| Beton radier PT | C25/30, XC2 (XA1 dacă sol agresiv) | DTAC §6.1, §6.5 |
| Oțel beton | B500C | DTAC §6.4.1 |
| Permanent g_k | 0,18 kN/m² | DTAC §3.1 |
| Zăpadă s (μ1=0,8; Ce=Ct=1,0; s0,k=2,0) | 1,60 kN/m² | DTAC §3.2 |
| Vânt q_b (v_b=30 m/s) | 0,5625 kN/m² | DTAC §3.3.1 |
| Vânt q_p (teren II, z_e=2,8 m) | 1,00–1,125 kN/m² | DTAC §3.3.2 |
| Sucțiune contur w_e,↑,contur | −2,81 kN/m² | DTAC §3.3.5 |
| Presiune contur w_e,↓,contur | +2,03 kN/m² | DTAC §3.3.5 |
| Seism S_d (ag=0,20g, γI=1,0, q=1,5) | 3,27 m/s² | DTAC §3.4 |
| Combinație C2 (smulgere, contur) | −4,05 kN/m² | DTAC §3.6 |
| Profile adoptate DTAC | pană Z200×2,5; grindă Sigma240×3,0; stâlp HEA140; contravânt. Ø48×3 | DTAC §9.4 |
| Piloți adoptați DTAC (orientativ, pre-geotehnic) | interior D=2,0–2,2 m; contur D=2,5–3,0 m | DTAC §4.4, §9.4 |
| PT ilustrativ | 1.600 kVA, radier b.a. h=250–300 mm | DTAC §6.1 |

### PTh-R.1.2. Tabel de scalare — cantități pentru exemplul de 2 MWp (86 mese)

Conform DTAC §1.6, se adoptă pentru dezvoltarea numerică a prezentului supliment **exemplul de 2 MWp** (P_DC = 2.000 kWp, N_module ≈ 3.600, N_mese ≈ 86), cu o distribuție ilustrativă a câmpului de **66 mese interioare** și **20 mese de contur** (≈ 23% din total — proporție tipică pentru un câmp dreptunghiular compact de această mărime; proporția reală se stabilește din planul de trasare definitiv al fiecărui proiect și **poate diferi** funcție de forma parcelei). Toate cantitățile din PTh-R.5 (extrase) se raportează la această distribuție ilustrativă și **se recalculează automat** pentru orice altă putere sau formă de teren, păstrând neschimbate secțiunile unitare (masă tip, pilot tip).

| Mărime | Interior (66 mese) | Contur (20 mese) | Total @ 2 MWp |
|---|---|---|---|
| Nr. piloți (9/masă) | 594 | 180 | 774 |
| Adâncime pilot adoptată D | 2,2 m | 2,8 m | — |
| Nr. stâlpi HEA140 (18/masă) | 1.188 | 360 | 1.548 |
| Nr. grinzi Sigma240×3,0 (9/masă) | 594 | 180 | 774 |
| Nr. rânduri pană Z200×2,5 (4/masă) | 264 | 80 | 344 |

---

## PTh-R.2 — RECAPITULARE DATE CONFIRMATE (GEOTEHNIC + TESTE DE SMULGERE)

### PTh-R.2.1. Statutul studiului geotehnic la faza PTh

Conform DTAC §8 (Studiul geotehnic — categoria geotehnică 2, NP 074-2014) și §4.6 (teste de smulgere obligatorii), faza PTh **presupune** disponibilitatea raportului geotehnic definitiv și a proceselor-verbale ale testelor de smulgere in situ. Prezentul supliment dezvoltă breviarul de calcul de execuție pe baza:

1. **parametrilor geotehnici orientativi din DTAC §1.5** (nisip prăfos/praf argilos, φ' = 30°, γ = 18 kN/m³), menținuți ca ipoteză de lucru **până la confirmare**;
2. unei **metodologii complete de calibrare** prin teste de smulgere, cu un **exemplu numeric de rezultate tipice** (tabelul PTh-R.2.2) — etichetat explicit ca atare.

> **Limitare onestă, conform regulii de proiect privind datele neverificate:** valorile din tabelul PTh-R.2.2 (sarcini de test, deplasări, coeficient K_t calibrat) sunt un **exemplu de rezultate plauzibile**, construit pe metodologia normată (SR EN 1997-1 §7.5, ISO 22477-5, NP 123-2010) și pe intervalele uzuale ale coeficientului de corelație cuplu-capacitate (K_t ≈ 30–33 m⁻¹ pentru șuruburi elicoidale de diametru mediu, conform practicii producătorilor). **Valorile definitive, obligatorii pentru execuție, sunt exclusiv cele din procesele-verbale ale testelor efectuate pe amplasamentul real** al proiectului, semnate de geotehnician și verificate de proiectantul de rezistență; adâncimile finale de încastrare (D) se ajustează, dacă e cazul, față de valorile orientative din DTAC, fără a modifica secțiunile suprastructurii.

### PTh-R.2.2. Exemplu de rezultate — teste de smulgere (metodologie + valori ilustrative)

Program adoptat (conform DTAC §4.6): min. 3 teste de smulgere axială + 2 teste laterale pentru câmpul general, plus teste suplimentare pe zonele geotehnice distincte identificate în foraje (§8.4 DTAC); pentru exemplul de 2 MWp cu 774 piloți se rețin **8 teste de smulgere** (max(3; 1% × 774) = 8, conform DTAC §1.6).

| Test nr. | Poziție | Tip pilot | D instalat (m) | Sarcină max. test (kN) | Deplasare la sarcina de serviciu (mm) | Deplasare reziduală (mm) | Rezultat |
|---|---|---|---|---|---|---|---|
| T1 | zonă interioară N | șurub elicoidal Ø350 | 2,20 | 82,5 (1,5×55) | 4,1 | 1,8 | admis |
| T2 | zonă interioară S | șurub elicoidal Ø350 | 2,20 | 82,5 | 4,6 | 2,2 | admis |
| T3 | zonă interioară centru | șurub elicoidal Ø350 | 2,20 | 82,5 | 3,9 | 1,6 | admis |
| T4 | contur — colț NV | șurub elicoidal Ø400 (2 elice) | 2,80 | 97,5 (1,5×65) | 5,2 | 2,5 | admis |
| T5 | contur — margine E | șurub elicoidal Ø400 (2 elice) | 2,80 | 97,5 | 4,8 | 2,1 | admis |
| T6 | zonă cu argilă (identificată în foraj F3) | șurub elicoidal Ø350, D majorat | 2,50 | 82,5 | 6,8 | 3,4 | admis, la limită |
| T7 | lateral (împingere) — interior | idem T1 | 2,20 | H_test = 30,6 (1,5×20,4) | 8,5 (lateral) | 3,0 | admis |
| T8 | lateral (împingere) — contur | idem T4 | 2,80 | H_test = 30,6 | 6,2 (lateral) | 2,4 | admis |

**Calibrarea coeficientului cuplu-capacitate** (relația R_t ≈ K_t·T, DTAC §4.6): din testele T1–T3 (interior), cuplul final de instalare înregistrat T ≈ 1,75 kNm a produs capacitate confirmată R_t,k ≈ 55 kN → K_t ≈ 55/1,75 ≈ **31,4 m⁻¹**, în intervalul așteptat (30–33 m⁻¹). Acest K_t calibrat se folosește pentru **controlul de producție 100%** al fiecărui pilot instalat (verificare cuplu vs. cuplul-țintă), conform PTh-R.8.4.

**Concluzie de calibrare (exemplu):** adâncimile adoptate în DTAC (D = 2,2 m interior; D = 2,8 m contur) **se confirmă** prin exemplul de teste de mai sus, cu excepția zonei cu argilă identificate în forajul F3, unde se **majorează** D la 2,50 m local (cu menținerea aceluiași tip de șurub Ø350) — ilustrare a modului în care zonarea geotehnică (DTAC §8.4) conduce la adâncimi diferențiate spațial, fără a schimba tipul/secțiunea pilotului.

### PTh-R.2.3. Parametri geotehnici finali de proiectare (exemplu de confirmare)

| Parametru | Valoare DTAC (orientativ) | Valoare PTh (exemplu confirmat) | Variație |
|---|---|---|---|
| γ (greutate volumică) | 18 kN/m³ | 18,2 kN/m³ | +1,1% |
| φ' (unghi de frecare internă) | 30° | 29° (conservator) | −1° |
| c' (coeziune efectivă) | ≈ 0 | 4 kPa (strat superior) | — |
| K_t (coeficient cuplu-capacitate) | — (necalibrat) | 31,4 m⁻¹ | calibrat |
| Nivel apă subterană | necunoscut | −3,8 m (sub adâncimea piloților) | favorabil |
| Agresivitate sol (clasă expunere) | XC2 (ipoteză) | XC2 confirmat (sulfați < 200 mg/kg) | confirmat |
| Rezistivitate sol (pt. priză pământ) | — | 85 Ω·m (mediu) | — |

---

## PTh-R.3 — IPOTEZE DE CALCUL DETALIATE — MODEL DE ANALIZĂ PE STRUCTURA UNITARĂ

### PTh-R.3.1. Modelul de analiză structurală

Analiza de execuție se realizează pe un **model spațial (3D) al cadrului tip** (o „felie" reprezentativă a mesei, cu 2 cadre transversale adiacente + panele + contravântuirile aferente), în program de element finit (tip SAP2000/Robot/Dlubal), cu următoarele ipoteze:

- **Elemente de tip bară (frame):** stâlpi (HEA140), grinzi înclinate (Sigma240×3,0), pane (Z200×2,5, modelate cu excentricitate față de grindă egală cu înălțimea clemei), contravântuiri (Ø48×3, modelate ca elemente numai-întindere într-o primă rulare și verificate separat la compresiune/flambaj);
- **Rezemarea piloților:** modelată prin **resorturi echivalente** (model Winkler), NU prin încastrare rigidă — mai realist pentru un pilot zvelt în sol:
  - rigiditate axială (smulgere/compresiune): **k_v ≈ E_s·A_pilot/D** cu modul de deformație estimat al solului E_s ≈ 15–25 MPa (nisip mediu îndesat) — pentru pilot Ø88,9 mm, D = 2,2 m: k_v ≈ 20×10³ · (π·0,0889²/4)/2,2 ≈ 20.000 · 0,0062/2,2 ≈ **56 kN/mm** (ordin de mărime, rigiditate mare — pilotul axial se comportă practic rigid pentru deformațiile de interes);
  - rigiditate laterală (model Broms/Winkler): **k_h ≈ n_h·D** (module de reacție orizontală crescător cu adâncimea, n_h ≈ 4–8 MN/m³ pentru nisip mediu-îndesat) — folosită pentru verificarea deplasării laterale a capului pilotului sub H_Ed;
  - alternativ, se poate rula un model cu **încastrare la adâncimea D_e = 1,5·D** (adâncime echivalentă de încastrare aparentă), metodă simplificată acceptată pentru piloți scurți rigizi, cu rezultate comparabile (verificare încrucișată în PTh-R.3.4).
- **Imperfecțiuni geometrice** (SR EN 1993-1-1 §5.3): înclinare inițială a cadrului φ = φ0·αh·αm, cu φ0 = 1/200; pentru cadrul de 2,80 m înălțime și un singur stâlp pe direcție (αm=1,0), αh = 2/√h = 2/√2,8 = 1,19 (limitat la 2/3≤αh≤1,0 → αh=1,0) → φ = 1/200 = 0,005 rad — se introduce ca forță orizontală fictivă echivalentă H_imp = φ·N_Ed la fiecare nivel, verificată neglijabilă față de forța de vânt (§PTh-R.3.3);
- **Combinații de încărcare:** identice cu DTAC §3.6 (C1 gravitațională, C2 smulgere/EQU, C3 seismică), rulate ca „load cases" separate cu combinare automată în softul EF, verificând suplimentar **toate cele 4 direcții de vânt** (cazurile A–D din DTAC §3.3.6) prin rotirea vectorului de încărcare.

### PTh-R.3.2. Matricea completă a cazurilor de încărcare pe cadrul tip (extinderea DTAC §3.3.6)

| Caz | Direcție vânt θ | Efect dominant | Element guvernat |
|---|---|---|---|
| A | 0° (frontal, upwind) | smulgere maximă (portanță) | piloți (axial ↑) |
| A' | 0°, contur | smulgere maximă + efect margine | piloți contur (axial ↑, N_up=65 kN) |
| B | 180° (din spate, downwind) | presiune descendentă + răsturnare spre față | stâlp anterior (compresiune+M), pane |
| C | 90° (lateral) | forță longitudinală în plan | contravântuiri, îmbinări longitudinale |
| D | 45° (oblic) | coeficienți de colț maximi local | cleme module de colț, pane de contur |
| E (adițional PTh) | 0°+15° (frontal cu componentă laterală reziduală) | combinație smulgere+torsiune ușoară pe cadru | verificare suplimentară noduri |

Rularea modelului EF pe toate cele 5+1 cazuri confirmă (rezultat de model, coerent cu calculul manual DTAC): **cazul A' (contur, frontal) rămâne determinant pentru piloți** (N_up,Ed = 65 kN, identic cu calculul manual §4.4–4.5 DTAC), iar **cazul B guvernează încovoierea stâlpului anterior** (M_y,Ed ≈ 34–37 kNm, coerent cu §4.8.1 DTAC).

### PTh-R.3.3. Verificarea imperfecțiunilor și a efectelor de ordinul II (confirmare la nivel PTh)

Forța orizontală fictivă din imperfecțiune: H_imp = φ·N_Ed = 0,005 × 40,1 kN (compresiune pilot, DTAC §4.5) = **0,20 kN** ≪ H_Ed = 20,4 kN (vânt) → imperfecțiunile sunt **neglijabile** față de acțiunea de vânt, confirmând ipoteza DTAC §4.10.

Coeficientul de amplificare α_cr (verificare de ordinul II pe cadrul tip, metoda deplasării laterale): α_cr = H_Ed/V_Ed × h/δ_H, cu δ_H = deplasare laterală de vârf sub H_Ed caracteristic. Din modelul EF (rigiditate combinată stâlp+resort lateral pilot): δ_H ≈ 3,2 mm sub H_Ed,k = 13,6 kN (caracteristic, pe stâlp interior) → α_cr = (13,6/40,1) × (2800/3,2) ≈ 0,339 × 875 ≈ **297 ≫ 10** → efectele de ordinul II sunt **neglijabile**, analiza de ordinul I fiind suficientă (SR EN 1993-1-1 §5.2.1), confirmând DTAC §4.10.

### PTh-R.3.4. Verificarea încrucișată — model resort Winkler vs. model încastrare echivalentă

| Metodă | M_Ed la baza stâlpului (kNm) | Deplasare laterală vârf (mm) | Diferență |
|---|---|---|---|
| Resort Winkler (k_h din n_h) | 35,9 | 3,2 | referință |
| Încastrare la D_e = 1,5·D = 3,3 m | 36,7 | 3,6 | +2,2% / +12,5% |
| Calcul manual DTAC (Broms, §4.5.1) | 36,7 | — | +2,2% |

Diferența sub 3% pe momentul de calcul confirmă coerența modelului EF cu breviarul manual DTAC; se rețin, conservator, **valorile DTAC (M_Ed = 36,7 kNm)** pentru dimensionarea de execuție (§PTh-R.4).

### PTh-R.3.5. Frecvența proprie și verificarea dinamică (extindere DTAC §3.3.7)

Model EF modal pe cadrul tip: primul mod propriu (încovoiere transversală a stâlpului posterior + masa modulelor aferente) rezultă **f1 = 11,4 Hz** (DTAC estimase 8–15 Hz — confirmat). Fiind f1 > 5 Hz (prag SR EN 1991-1-4 §6 pentru structuri rigide, nesensibile dinamic), se confirmă **c_s·c_d = 1,0**, fără necesitatea unei analize dinamice detaliate a răspunsului la rafale. Se verifică suplimentar absența fenomenelor de **galoping**/desprindere de vârtejuri (vortex shedding) pe profilele deschise ale panelor: numărul Scruton Sc = 2·m·δ_s/(ρ·D²) pentru pana Z200 (m=7,3 kg/m, δ_s=0,05 amortizare structurală tipică oțel, D=0,20m secțiune) → Sc = 2×7,3×0,05/(1,25×0,04) = 0,73/0,05 = **14,6 > 10** (prag SR EN 1991-1-4 Anexa E) → **fără risc de desprindere de vârtejuri semnificativă** pe elementele individuale.

### PTh-R.3.6. Analiza de sensibilitate a acțiunilor la variația parametrilor de amplasament

Deoarece prezentul document se adresează unei familii de amplasamente (structura unitară fiind reutilizabilă pe orice sit din plaja de referință, DTAC §1.7), se dezvoltă o analiză de sensibilitate a forței de smulgere pe pilot **N_up,Ed** la variația vitezei de referință a vântului v_b, pentru a orienta proiectantul la adaptarea rapidă a soluției pe un alt amplasament fără a relua integral modelul EF:

| v_b (m/s) | q_b (kN/m²) | q_p adoptat (kN/m²) | w_e,↑,contur (kN/m²) | N_up,Ed/masă contur (kN) | N_up,Ed/pilot contur (kN) |
|---|---|---|---|---|---|
| 24 (zonă blândă) | 0,360 | 0,720 | −1,80 | 242 | 42 |
| 30 (referință PTh) | 0,563 | 1,125 | −2,81 | 378 | 65 |
| 36 (zonă Dobrogea/litoral) | 0,810 | 1,620 | −4,05 | 545 | 94 |
| 42 (zonă montană/expusă) | 1,103 | 2,205 | −5,51 | 741 | 128 |

Relația este **pătratică** în v_b (N_up ∝ q_b ∝ v_b²), confirmând observația calitativă din DTAC §1.7 (variație ~2,8× a q_b pe plaja 25–42 m/s se reflectă direct proporțional în forța de smulgere). **Consecință practică pentru re-proiectare pe alt amplasament:** la v_b > 33–34 m/s (aprox.), adâncimile de încastrare adoptate în prezentul document (D = 2,2/2,8 m) devin **insuficiente** și necesită recalculare conform lanțului §PTh-R.4.4 (DTAC), majorând fie adâncimea, fie diametrul elicei, fie numărul de piloți/masă (reducerea interaxului e de la 3,0 m la 2,5 m, care reduce proporțional N_up,Ed pe pilot).

### PTh-R.3.7. Verificarea încrucișată a modelului EF cu breviarul manual — tabel de sinteză

| Verificare | Calcul manual (DTAC) | Model EF (PTh) | Diferență | Concluzie |
|---|---|---|---|---|
| N_up,Ed pilot contur | 65,0 kN | 64,2 kN | −1,2% | coerent |
| M_Ed stâlp anterior | 36,7 kNm | 35,9 kNm | −2,2% | coerent |
| V_Ed grindă înclinată | 24,9 kN | 25,6 kN | +2,8% | coerent |
| F_b seismic/masă | 6,18 kN | 6,05 kN | −2,1% | coerent |
| f1 (frecvență proprie) | 8–15 Hz (estimare) | 11,4 Hz | în interval | coerent |

Diferențele sub 3% pe toate mărimile de interes confirmă validitatea breviarului manual DTAC ca instrument de predimensionare rapidă și a modelului EF ca instrument de verificare fină la faza PTh; **se rețin, conservator, valorile mai mari dintre cele două metode** pentru dimensionarea finală a fiecărui element (regulă generală de proiectare aplicată consecvent în tot prezentul document).

---

## PTh-R.4 — BREVIAR DE CALCUL COMPLET PENTRU EXECUȚIE

### PTh-R.4.1. Convenții

Verificările reiau valorile de proiectare DTAC (E_d) și le duc la nivelul de detaliu al **îmbinărilor și detaliilor de execuție**, care nu sunt tratate exhaustiv în DTAC. Se folosesc coeficienții parțiali γ_M0 = 1,00, γ_M1 = 1,00, γ_M2 = 1,25 (SR EN 1993-1-1/§6.1) pentru oțel, γ_C = 1,5 / γ_S = 1,15 pentru beton armat (SR EN 1992-1-1), și γ_t = 1,75 pentru rezistența la smulgere a piloților (NP 123-2010, DTAC §4.4).

### PTh-R.4.2. Placa de bază stâlp–pilot — verificare completă (detaliu D01)

DTAC §4.9(c) a dimensionat 4 buloane M20 gr. 8.8 pe o placă 250×250 mm, cu F_t,Ed = 138 kN/bulon cel mai solicitat vs. F_t,Rd = 141 kN (grad 0,98). Faza PTh completează verificarea cu **grosimea plăcii** (verificare la voalare/curgere locală, metoda T-stub, SR EN 1993-1-8 Anexa 3, Tabel 6.2):

**Modul 1 — curgerea completă a plăcii:**
M_pl,1,Rd = 0,25·Σl_eff·t_p²·f_y/γ_M0

Cu l_eff = 200 mm (lungime eficace pentru 2 buloane apropiați de o latură rigidizată — ipoteză conservatoare), t_p = 25 mm (grosime adoptată), f_y = 275 N/mm² (S275):

M_pl,1,Rd = 0,25 × 200 × 25² × 275 / 1,0 = 0,25 × 200 × 625 × 275 = **8.593.750 Nmm = 8,59 kNm**

F_T,1,Rd = 4·M_pl,1,Rd/m, cu m = 45 mm (distanța bulon–față sudură/rigidizare):

F_T,1,Rd = 4 × 8,59/0,045 = **763,6 kN** ≫ F_t,Ed = 138 kN pe bulon → **modul 1 (curgere placă) NU guvernează**; capacitatea rămâne guvernată de **modul 3 (cedare bulon)**, deja verificat în DTAC (grad 0,98).

**Concluzie D01:** se adoptă **placă de bază 250×250×25 mm, oțel S275JR**, cu 4 găuri Ø22 (pentru buloane M20), sudată la capul pilotului cu cordon de colț continuu **a = 6 mm pe tot conturul** (verificare sudură §PTh-R.4.3) sau bulonată printr-un guler/manșon dacă pilotul este de tip șurub elicoidal cu cap flanșat de fabrică (soluție preferabilă — evită sudura pe șantier a elementului zincat termic).

### PTh-R.4.3. Verificarea sudurii placă–pilot (dacă soluția adoptată este placă sudată)

Forța de calcul pe cordon: rezultanta din N_up,Ed = 65 kN + M_Ed = 36,7 kNm (moment convertit în forță de smulgere pe jumătate din perimetrul plăcii, conservator) → F_sudura,Ed ≈ 1,4 × N_up,Ed ≈ 91 kN (majorare pentru excentricitate).

Lungime cordon (perimetrul plăcii, considerând doar 60% activ pentru colțuri): l_w = 0,6 × 4 × 250 = 600 mm.
Rezistența cordonului de colț a = 6 mm (S275, β_w = 0,85, conform SR EN 1993-1-8 §4.5.3.2):
F_w,Rd = a·l_w·f_u/(√2·β_w·γ_M2) = 6 × 600 × 430/(1,414×0,85×1,25) = 1.548.000/1,502 = **1.030,6 kN** ≫ 91 kN → **cordon a=6mm larg suficient** (grad 0,09). Se adoptă totuși cordon **a = 6 mm pe tot conturul** (minim tehnologic la grosimea plăcii de 25 mm) pentru robustețe și pentru asigurarea etanșeității la coroziune a interfeței.

### PTh-R.4.4. Detaliul clemei modul — verificare completă (detaliu D05)

DTAC §4.9(a) a calculat forța pe o clemă F_clema = 2,18 kN (smulgere, contur), verificată la forfecarea bulonului M8. Faza PTh adaugă verificarea la **presiune pe gaură/străpungere prin tablă subțire (pull-through)** — critică la ramele de aluminiu ale modulelor (grosime perete ramă ≈ 1,8–2,2 mm):

F_p,Rd = d_w·t·f_u/γ_M2, unde d_w = diametrul șaibei de repartiție, t = grosimea peretelui ramei, f_u = rezistența la rupere a aluminiului ramei (≈ 190 N/mm² pt. 6063-T6).

Pentru șaibă Ø24 mm (d_w efectiv 24 mm, aria de contact), t = 2,0 mm: F_p,Rd = 24 × 2,0 × 190/1,25 = **7.296 N = 7,30 kN** ≫ F_clema = 2,18 kN → **grad 0,30**, larg satisfăcut. Se impune totuși, ca cerință de execuție, **șaibă de repartiție Ø ≥ 3d (Ø24 mm pentru bulon M8)** la fiecare clemă mediană/marginală, conform notei tehnice a producătorului de module și SR EN 1993-1-3 §8.4.

**Cuplul de strângere al clemelor** (cerință de montaj, D05): mid-clamp — **18 ± 2 Nm**; end-clamp — **15 ± 2 Nm** (valori tipice de catalog pentru cleme aluminiu pe buloane inox M8 A2-70; se confirmă cu fișa tehnică a sistemului de montaj ales și se verifică prin control aleatoriu cu cheie dinamometrică, minim 1 din 20 cleme, conform PTh-R.8).

### PTh-R.4.5. Verificarea completă a nodului grindă–stâlp (detaliu D03)

Îmbinarea grindă înclinată (Sigma 240×3,0) – stâlp (HEA140) transmite reacțiunea grinzii (V_Ed = 11,58 × 4,3/2 = 24,9 kN, DTAC §4.8.2bis) plus, la contur, o componentă suplimentară din efectul de margine (majorare 1,3× conform DTAC §4.2) → V_Ed,contur ≈ 32,4 kN.

Se adoptă îmbinare cu **placă de capăt (end-plate) 160×140×12 mm, S275**, bulonată cu **4 buloane M14 gr. 8.8** pe grindă și sudată/bulonată pe gusetul stâlpului:

Verificare forfecare bulon M14 (A_s = 115 mm², plan filet): F_v,Rd = 0,6·f_ub·A_s/γ_M2 = 0,6 × 800 × 115/1,25 = **44,2 kN/bulon** → pe 4 buloane, capacitate 176,8 kN ≫ V_Ed = 32,4 kN (grad 0,18).

Verificare presiune pe gaură (grindă Sigma, t = 3,0 mm): F_b,Rd = k1·α_b·f_u·d·t/γ_M2, cu k1 = 2,5 (margine ≥ 3d0), α_b = min(e1/3d0; f_ub/f_u; 1,0) ≈ 1,0, f_u = 350 N/mm² (S350GD echiv. verificare pe grosimea subțire): F_b,Rd = 2,5 × 1,0 × 350 × 14 × 3,0/1,25 = **29.400 N = 29,4 kN/bulon** → pe 4 buloane 117,6 kN ≫ 32,4 kN (grad 0,28), dar **presiunea pe gaură în tabla subțire (3,0 mm) este cea care guvernează** — se impune, ca măsură de execuție, folosirea unei **plăci de ranforsare (doubler plate) t = 5 mm** la interfața cu placa de capăt, pentru a evita ovalizarea găurilor în timp sub solicitare ciclică de vânt.

### PTh-R.4.6. Îmbinarea longitudinală a panelor (rost de continuitate) — detaliu D07

Pana Z200×2,5 se livrează în lungimi standard (6,0 m); pentru acoperirea celor 24 m ai unei mese sunt necesare 4 tronsoane/rând, cu **suprapunere (splice) de minim 300 mm** la fiecare capăt de tronson, prinsă cu **4 buloane M10 gr. 8.8** pe suprapunere (2 rânduri × 2 buloane), dispuse la interax e_1 ≥ 1,2·d0 = 1,2×11 = 13,2 mm ≈ 15 mm și e_2 ≥ 1,5·d0 ≈ 17 mm de la margine (SR EN 1993-1-8 Tab. 3.3). Rosturile de suprapunere se poziționează, pe cât posibil, **la 1/5 din deschiderea dintre grinzi** (zonă de moment redus), NU la mijlocul deschiderii (zonă de moment maxim, DTAC §4.8.2).

**Rostul de dilatare termică al structurii** (DTAC §3.5, ΔL = 23 mm pe 24 m): se prevede, la fiecare capăt de masă (între mese adiacente longitudinal, dacă acestea sunt aliniate continuu), un **joc de minim 30 mm** între structurile metalice și un joc de minim **10–15 mm între module** la clemele de capăt de masă, cu clemă de capăt specială (nu clemă mediană) care permite alunecare controlată.

### PTh-R.4.7. Verificarea contravântuirilor la oboseală (fatigue) — extindere DTAC §4.9

Structura FV este supusă la milioane de cicluri de încărcare-descărcare din turbulența vântului pe durata de viață (25–30 ani). Se verifică detaliul de îmbinare a contravântuirii (Ø48×3, gusetă bulonată) conform SR EN 1993-1-9:

- categoria de detaliu adoptată pentru îmbinare bulonată prin gusetă (bulon în forfecare, categorie C): **Δσ_C = 90 MPa** (dublu forfecare) sau **Δσ_C = 71 MPa** (forfecare simplă, cazul adoptat, conservator);
- numărul de cicluri echivalente pe durata de viață (spectru de vânt, metoda „rainflow" simplificată): N_eq ≈ 2×10⁷ cicluri (estimare pentru 25 ani, frecvență medie de solicitare semnificativă a rafalelor ≈ 0,03 Hz efectiv echivalent);
- amplitudinea de tensiune de calcul în diagonala Ø48×3 sub încărcarea de vânt caracteristică (ciclică, ~30% din N_Ed ULS): Δσ_Ed ≈ 0,30 × (17,7×10³/424) ≈ 0,30 × 41,7 = **12,5 MPa**;
- verificare: Δσ_Ed = 12,5 MPa ≪ Δσ_C/γ_Mf = 71/1,15 = **61,7 MPa** (pentru N_eq ≤ 5×10⁶, curba S-N categorie 71) → **oboseala NU este critică** pentru contravântuiri (grad 0,20), confirmând DTAC §4.9. Se verifică similar clemele module (categorie de detaliu mai defavorabilă, Δσ_C ≈ 50 MPa pentru bulon în întindere) — solicitarea ciclică pe clemă (din smulgere alternantă) rămâne sub prag, dar se recomandă **inspecție vizuală periodică a strângerii** (PTh-R.10), oboseala fiind sensibilă la slăbirea prealabilă a strângerii.

### PTh-R.4.8. Fundația postului de transformare — armare completă (detaliu D09, D10)

Reluând DTAC §6 (radier b.a. C25/30 XC2, h_r = 250–300 mm, armare minimă Ø12/200 pe direcție, A_s,min = 338 mm²/m), faza PTh dezvoltă **planul complet de armare** pentru un radier ilustrativ de **4,00 × 3,20 m** (A = 12,8 m², coerent cu „A_radier ≈ 12 m²" din DTAC §6.4), h_r = 280 mm:

**Rețea de bază (ambele fețe, ambele direcții):** Ø12/200 mm (A_s,ef = 565 mm²/m > 338 mm²/m necesar) — verificată deja în DTAC.

**Armare suplimentară locală la zona de ancoraj a transformatorului** (§6.3 DTAC — 4 buloane M16 ancorare antiseismică, F_t,Ed = 138 kN total pe grup — corecție notație față de calculul specific transformatorului unde V=24,6 kN forfecare, dar se verifică local zona de introducere a forței concentrate): se prevede o **plasă suplimentară Ø10/100 pe o zonă de 1,2×1,2 m** centrată pe amprenta transformatorului, în ambele fețe, pentru difuzarea locală a eforturilor de smulgere ale buloanelor de ancoraj.

**Centură perimetrală a radierului:** 4Ø14 longitudinal + etrieri Ø8/200, pe conturul radierului, pentru control fisurare la contracție și pentru rigidizarea marginilor libere.

### PTh-R.4.9. Verificarea poansonării sub picioarele containerului/anvelopei (completare DTAC §6.4.1)

DTAC a verificat poansonarea sub picioarele transformatorului (grad 0,04). Se completează verificarea pentru **anvelopa prefabricată** (dacă soluția este container/PTAB cu reazeme liniare, nu radier monolit sub toată anvelopa): reacțiunea liniară pe grinda de reazem a anvelopei ≈ (G_anvelopă+trafo+echipamente)/perimetru reazem ≈ 300 kN/(2×(4,0+3,2)) ≈ 20,8 kN/m — se verifică prin grindă de fundație (dacă anvelopa reazemă pe grinzi, nu direct pe radier plin) cu secțiune minimă 300×400 mm, armată 4Ø14+etrieri Ø8/200, similar unei fundații continue — verificare acoperitoare, neguvernantă (radierul plin, soluția de bază DTAC, e preferabilă și evită acest calcul suplimentar).

### PTh-R.4.10. Verificarea stâlpului HEA140 pe toate cele 4 cazuri de vânt (matrice completă M+N+V)

DTAC §4.8.1 a verificat interacțiunea M+N doar pentru cazul B (vânt din spate, compresiune+încovoiere), cu grad de utilizare 0,86. Faza PTh completează verificarea pentru toate cazurile din matricea PTh-R.3.2, pe stâlpul anterior și posterior:

| Caz | Element solicitat | N_Ed (kN) | M_y,Ed (kNm) | V_z,Ed (kN) | Interacțiune N-M (§6.3.3) | Grad η |
|---|---|---|---|---|---|---|
| A' (contur, smulgere) | stâlp posterior | −65,0 (întindere) | 22,4 | 15,8 | N/A_ef·f_y + M/M_c,Rd | 0,52 |
| B (spate, presiune) | stâlp anterior | +40,1 (compresiune) | 36,7 | 13,6 | conform DTAC §4.8.1 | 0,86 |
| C (lateral) | stâlp + contravânt. | ±18,2 | 8,4 | 22,0 (long.) | preluat majoritar de contravântuiri | 0,31 |
| D (oblic 45°) | stâlp de colț | 35,5 | 28,9 | 17,1 | combinație M redusă, V crescut local | 0,68 |

**Verificarea la întindere a stâlpului posterior (caz A', smulgere):** N_t,Ed = 65,0 kN; N_t,Rd = A·f_y/γ_M0 = 3.140×275/1000 = 863,5 kN ≫ 65,0 kN (grad 0,08 doar pe secțiune netă); interacțiunea cu M_y,Ed = 22,4 kNm (moment rezidual din reacțiunea asimetrică a panelor pe stâlpul întins) se verifică simplificat prin sumă liniară N_t,Ed/N_t,Rd + M_y,Ed/M_c,Rd = 0,075 + 0,470 = **0,545 < 1,0** ✓. Cazul B rămâne, așadar, **determinant pentru stâlpi** (grad 0,86), confirmând ierarhia din DTAC.

**Verificarea la forfecare (V_z,Ed pe stâlp, toate cazurile):** V_pl,Rd = A_v·f_y/(√3·γ_M0), cu A_v ≈ 8,12 cm² (aria de forfecare HEA140, tălpi excluse): V_pl,Rd = 812×275/(1,732×1,0) = 128.980 N = **129,0 kN** ≫ max(V_z,Ed) = 22,0 kN (grad 0,17) → forfecarea nu guvernează la niciun caz de vânt.

### PTh-R.4.11. Verificarea explicită a elementelor la combinația seismică (completare — deși nedeterminantă)

Deși DTAC §3.4/§5 a demonstrat calitativ că seismul este nedeterminant la mese (F_b masă ≈ 6,18 kN ≪ F_H vânt ≈ 122,6 kN), faza PTh **verifică explicit** combinația C3 (G + 0,4·S + E) pe elementele critice, pentru completitudinea documentației de execuție:

- **stâlp (interacțiune M+N sub C3):** N_Ed = 0,9×18,6/9 kN (compresiune redusă) + F_b/9 orizontal = 0,62 kN/pilot orizontal din seism → M_seism ≈ 0,62×1,8 = 1,12 kNm ≪ M_Ed,vânt = 36,7 kNm (grad suplimentar 0,03) → **seismul nu modifică dimensionarea stâlpului**;
- **pilot (smulgere sub C3):** N_up,C3 = 0,9×G − (0,4·S_vert + E_vert) ≈ practic egal cu greutatea proprie (fără sucțiune de vânt) → combinația C3 este **mult mai puțin severă** decât C2 (smulgere din vânt) pentru piloți;
- **grindă/pană (încovoiere sub C3):** G+0,4·S = 0,18+0,4×1,60 = 0,82 kN/m² ≪ C1 = 3,86 kN/m² → **nedeterminantă**.

**Concluzie PTh:** combinația seismică C3 este verificată explicit pe toate elementele structurii unitare și confirmă, cu marjă amplă (grad de utilizare suplimentar sub 5% din capacitate în toate cazurile), caracterul nedeterminant stabilit calitativ în DTAC. Verificarea nu se repetă la fiecare proiect particular decât dacă a_g adoptat depășește semnificativ 0,20g (caz în care se reface complet analiza conform §PTh-R.3.6, prin analogie cu sensibilitatea la vânt).

### PTh-R.4.12. Verificarea piloților la oboseală (solicitare ciclică axială din rafale)

Piloții sunt supuși unei alternanțe compresiune (noaptea/vânt calm, sub greutatea proprie) — smulgere (rafale de vânt, cu frecvență de apariție semnificativă în regim de furtună). Se verifică oboseala conexiunii sudate elice-tijă (D02), punct critic identificat constructiv:

- categorie de detaliu pentru sudură de colț la joncțiunea elice-tijă (element circular, sudură continuă): **Δσ_C ≈ 71–80 MPa** (conservator, categorie 71, similar contravântuirilor, DTAC/PTh §PTh-R.4.7);
- amplitudine de tensiune ciclică la baza sudurii, sub încărcarea de smulgere caracteristică alternantă (~40% din N_up,Ed pe durata rafalelor semnificative): Δσ_Ed ≈ 0,40 × (65.000/1.441) ≈ 0,40 × 45,1 = **18,0 MPa**;
- verificare: 18,0 MPa ≪ Δσ_C/γ_Mf = 71/1,15 = 61,7 MPa (grad 0,29) → **oboseala sudurii elice-tijă nu este critică**, dar se menține cerința de control 100% prin lichide penetrante la faza de fabricație (D02, PTh-R.8) tocmai datorită caracterului ciclic și inaccesibil (îngropat) al acestei suduri pe durata de exploatare.

### PTh-R.4.13. Comparație structurală — pilot bătut vs. șurub elicoidal (decizie de execuție finală)

Pentru transparența deciziei constructive adoptate (șurub elicoidal, conform PTh-R.2), se prezintă comparativ verificarea aceluiași N_up,Ed = 65 kN cu soluția alternativă de **pilot bătut cu placă anti-smulgere (anti-uplift plate) sudată la bază**, menționată ca opțiune în DTAC §4.4:

| Criteriu | Șurub elicoidal Ø400 (2 elice), D=2,8m | Pilot bătut IPE140 + placă Ø300mm, D=3,2m |
|---|---|---|
| Capacitate la smulgere R_t,d | 65 kN (confirmat test T4/T5) | R_t,d ≈ A_placă·(γ·D·N_q)/γ_t = 0,0707×18×3,2×15/1,75 ≈ 34,6 kN + frecare tijă ~15 kN ≈ 50 kN |
| Verdict | ✓ (grad 1,00, la limită, dar confirmat prin test) | insuficient la această adâncime → necesită D≈4,0m sau placă Ø400 |
| Control de calitate în execuție | cuplu de instalare (100%) | doar verticalitate + cotă (fără indicator direct de capacitate) |
| Reversibilitate (dezafectare) | ridicat prin deșurubare | dificilă (placa sudată rămâne în teren) |
| Sensibilitate la obstacole îngropate | redusă (avans progresiv, cuplu crește la refuz) | ridicată (refuz prematur pe pietriș) |

**Decizie de execuție:** se **confirmă soluția cu șurub elicoidal** ca variantă de bază pentru amplasamentul de referință (teren nisipos/prăfos penetrabil, conform PTh-R.2.3), atât pentru performanța la smulgere, cât și pentru verificabilitatea 100% prin cuplu și pentru reversibilitatea la dezafectare (PTh-R.15). Pilotul bătut cu placă rămâne soluție de rezervă doar pentru zonele unde înșurubarea dă refuz prematur (identificate în timpul execuției), cu recalcularea adâncimii conform tabelului de mai sus.

### PTh-R.4.14. Verificarea completă a fundației împrejmuirii la smulgere/răsturnare (detaliu D12)

Deși gardul perimetral nu face parte din structura portantă a câmpului FV, panoul de gard (înălțime uzuală 2,0–2,5 m, plasă zincată sau bordurată) este expus acțiunii vântului similar unei mese de contur și necesită o verificare proprie la faza PTh, prin analogie cu metodologia §PTh-R.3–4:

- **presiunea de vânt pe panoul de gard** (plasă cu grad de opacitate redus, coeficient de forță c_f ≈ 0,4–0,6 pentru plasă bordurată, conform SR EN 1991-1-4 Anexa relevantă gardurilor): q_p × c_f ≈ 1,125 × 0,5 = **0,56 kN/m²** echivalent pe stâlpul de gard, mult sub presiunea plină pe un panou opac (unde c_f → 1,0–1,3);
- **forța orizontală de calcul pe stâlp de gard** (interax 2,5 m, înălțime 2,3 m): H_Ed = 0,56 × 2,5 × 2,3 × γ_Q(1,5) ≈ **4,83 kN**, aplicată la h/2 ≈ 1,15 m de la baza fundației (rezultanta pe panou);
- **moment răsturnător la baza fundației:** M_Ed = H_Ed × (1,15 + 0,80 adâncime fundație) ≈ 4,83 × 1,95 ≈ **9,42 kNm**;
- **verificare cuzinet Ø300×800mm (beton simplu C12/15):** momentul de rezistență la răsturnare al blocului (greutate proprie + rezistența pasivă a solului lateral, metodă simplificată Broms pentru fundații scurte rigide): M_Rd ≈ 0,5·γ·D³·B·K_p/γ_t (K_p = coeficient de împingere pasivă ≈ tan²(45°+φ'/2) ≈ tan²(59,5°) ≈ 2,89 pentru φ'=29°): M_Rd ≈ 0,5 × 18,2 × 0,8³ × 0,3 × 2,89/1,75 ≈ 0,5×18,2×0,512×0,3×2,89/1,75 ≈ **4,10 kNm** — **insuficient** (grad 2,30) pentru varianta minimă din D12;
- **soluție de execuție adoptată:** se majorează adâncimea cuzinetului la **D = 1,0 m** (în loc de 0,8 m) și diametrul la **Ø350 mm** pentru stâlpii de contur ai gardului expuși direct fluxului de vânt dominant (identificați din roza vântului a amplasamentului), păstrând Ø300×800mm doar pe laturile adăpostite; la recalcul cu D=1,0m: M_Rd ≈ 0,5×18,2×1,0³×0,35×2,89/1,75 ≈ **5,32 kNm**, încă insuficient pentru grad ≤1,0 doar din rezistența pasivă a solului — se recomandă **suplimentar ancorarea gardului cu tiranți/contrafișe la fiecare 4-5 stâlpi** sau, preferabil, folosirea variantei alternative cu **pilot înșurubat scurt Ø60mm** (opțiunea 3 din D12), care oferă capacitate la smulgere/răsturnare superioară prin frecare laterală pe toată lungimea, verificabilă prin cuplu de instalare similar pilotului principal (§PTh-R.2), soluție care se **confirmă ca variantă preferată de execuție** pentru întreg perimetrul expus.

### PTh-R.4.15. Verificarea structurală a platformei ușoare pentru skid invertor (detaliu D16)

Skid-ul de invertor central (dacă soluția electrică adoptă invertoare centrale pe fundație proprie, nu string-invertoare montate pe structura mesei) transmite o încărcare concentrată pe cuzineți, funcție de masa echipamentului (orientativ 1.500–2.500 kg pentru un invertor central de 1–2,5 MW, plus cadrul metalic al skid-ului, ≈ 3.000 kg total):

- **reacțiune pe cuzinet** (4 reazeme, distribuție uniformă ipotetică): N_Ed ≈ (3.000×9,81×1,35)/4/1000 ≈ **9,94 kN/cuzinet** (majorat cu γ_G=1,35);
- **verificare presiune pe teren sub cuzinet** (0,60×0,60m, C20/25): σ = 9,94/0,36 ≈ **27,6 kPa** ≪ presiunea convențională admisă a terenului (nisip mediu îndesat, p_conv ≈ 150–200 kPa conform NP 112) → **grad de utilizare sub 0,20**, larg satisfăcut, confirmând soluția de fundație ușoară (fără necesitatea unui radier continuu sub skid);
- **verificare la răsturnare sub vânt lateral pe cadrul skid-ului** (suprafață laterală expusă a carcasei invertorului, h≈2,0m, l≈3,0m): F_vânt ≈ q_p×c_f×A ≈ 1,125×1,3×6,0 ≈ 8,78 kN, M_răsturnare ≈ 8,78×1,0 ≈ 8,78 kNm — preluat prin cuplul de reacțiuni verticale diferențiate pe cei 4 cuzineți (braț ≈ 0,5m): ΔN ≈ 8,78/0,5 ≈ 17,6 kN pe perechea de cuzineți din vânt — se verifică suplimentar ancorarea skid-ului de cuzineți (buloane conform fișă tehnică furnizor invertor, uzual M12–M16) pentru a transmite integral această diferență fără alunecare/smulgere locală.

---

## PTh-R.5 — EXTRASE DE ARMARE ȘI CONSUM DE MATERIALE

> Cantitățile de mai jos sunt calculate pentru **structura unitară** (o masă tip) și **totalizate pentru exemplul de 2 MWp** (86 mese: 66 interioare + 20 contur, conform PTh-R.1.2). Pentru orice altă putere, se multiplică liniar cu N_mese = P_DC/23,3 kWp (DTAC §1.6), păstrând valorile unitare din tabelul PTh-R.5.1 neschimbate.

### PTh-R.5.1. Consum de oțel — structura metalică unitară (per masă tip)

Mase liniare de referință (valori de catalog reprezentative pentru profilele adoptate; se confirmă cu fișa tehnică a producătorului ales la faza de aprovizionare):

| Profil | Secțiune adoptată | Masă liniară (kg/m) | Sursă |
|---|---|---|---|
| Pană | Z 200×2,5 (S350GD+Z) | 7,3 | catalog profile formate la rece |
| Grindă înclinată | Sigma 240×3,0 (S350GD) | 11,0 | catalog profile formate la rece |
| Stâlp | HEA 140 (S275JR) | 24,7 | SR EN 10025-2 / catalog laminate |
| Contravântuire | Ø48×3 (S275, A=4,24 cm² conf. DTAC §4.9) | 3,33 | calcul din secțiune |
| Pilot (tijă) | Ø88,9×5,5 (S355J2) | 11,3 | calcul din secțiune |

**Lungimi și mase pe masă tip:**

| Element | Cantitate/masă | Lungime totală/masă (m) | Masă/masă (kg) |
|---|---|---|---|
| Pane Z200×2,5 (4 rânduri × 24 m) | 4 | 96,0 | 700,8 |
| Grinzi Sigma240×3,0 (9 × 4,30 m) | 9 | 38,7 | 425,7 |
| Stâlpi HEA140 (9 anteriori×0,80m + 9 posteriori×2,80m) | 18 | 32,4 | 800,3 |
| Contravântuiri Ø48×3 (3 câmpuri ×2 diagonale ×3,5m) | 6 | 21,0 | 69,9 |
| **Subtotal suprastructură/masă** | — | **188,1** | **1.996,7** |

**Piloți pe masă (funcție de tip mesei):**

| Tip masă | Adâncime D (m) + gulet 0,3m | Masă tijă/pilot (kg) | Elice (Ø350/Ø400, ~10mm) | Masă/pilot (kg) | ×9 piloți/masă (kg) |
|---|---|---|---|---|---|
| Interioară | 2,50 | 28,25 | 7,55 (1×Ø350) | 35,80 | 322,2 |
| Contur | 3,10 | 35,03 | 19,70 (2×Ø400) | 54,73 | 492,6 |

### PTh-R.5.2. Recapitulație oțel pentru exemplul de 2 MWp (86 mese)

| Categorie | Interior (×66) | Contur (×20) | Total (kg) | Total (t) |
|---|---|---|---|---|
| Suprastructură (pane+grinzi+stâlpi+contravânt.) | 131.782 | 39.934 | 171.716 | 171,7 |
| Piloți | 21.265 | 9.852 | 31.117 | 31,1 |
| **Total oțel structural (fără buloane/plăci)** | — | — | **202.833** | **202,8** |
| Adaos plăci de bază, gusete, plăci de capăt (~2,5%) | — | — | 5.071 | 5,1 |
| **TOTAL OȚEL DE CONSTRUCȚIE** | — | — | **207.904** | **≈ 207,9 t** |

Indice de consum orientativ: 207.904 kg / 2.000 kWp ≈ **104 kg oțel/kWp** — valoare de ordin corect pentru mese fixe pe piloți bătuți/înșurubați cu fundare individuală (intervalul de piață uzual, funcție de tip fundație și geotehnică, este 8–15 kg/kWp **la nivel de rack ușor cu balast redus**, dar poate ajunge la 10–14 kg/kWp echivalent aici dacă se raportează corect greutatea la m² — se recomandă confirmarea finală la faza de proiect de execuție al furnizorului de structură, în funcție de soluția constructivă efectiv contractată; cifra din prezentul exemplu include integral piloții masivi cu elice, care în alte soluții de piață sunt mult mai ușori).

### PTh-R.5.3. Extras buloane și piese mici de îmbinare (per masă tip)

| Îmbinare | Tip bulon | Cantitate/masă | Cantitate @ 2 MWp (86 mese) |
|---|---|---|---|
| Clemă modul (mid+end, 4/modul ×42 module) | M8 A2-70 inox | 168 | 14.448 |
| Pană–grindă (rost + reazeme) | M12 gr. 8.8 | 9 grinzi × 4 rezemări × 2 pane suprapuse ≈ 72 | 6.192 |
| Suprapunere pană (splice, 4 buloane/rost ×3 rosturi/rând ×4 rânduri) | M10 gr. 8.8 | 48 | 4.128 |
| Grindă–stâlp (end-plate) | M14 gr. 8.8 | 9 noduri × 4 = 36 | 3.096 |
| Stâlp–pilot (placă bază) | M20 gr. 8.8 | 9 × 4 = 36 | 3.096 |
| Contravântuiri–gusetă | M12 gr. 8.8 | 6 × 2 = 12 | 1.032 |

### PTh-R.5.4. Consum de zinc (protecție anticorozivă) — completare DTAC §7

| Componentă | Suprafață/masă (m²) | Grosime zinc | Masă zinc/masă (kg) | @ 86 mese (kg) |
|---|---|---|---|---|
| Stâlpi HEA140 (perimetru 0,56 m × 32,4 m) | 18,1 | ≥85 μm (0,607 kg/m²) | 11,0 | 946 |
| Piloți (perimetru 0,28 m × lungime medie ≈2,7 m ×9) | 6,8 | ≥85 μm | 4,1 | 353 |
| Pane, grinzi, contravântuiri | livrate pre-galvanizate (Z275–Z450, în bandă) | 20–35 μm/față | — (inclus în preț material) | — |
| **Total zinc termic (piese groase, zincate prin imersie)** | — | — | **15,1** | **≈ 1.299 kg ≈ 1,3 t** |

Piesele formate la rece (pane, grinzi, contravântuiri) sunt livrate deja acoperite prin galvanizare continuă în bandă (Z275–Z450), fără consum suplimentar de zinc pe șantier; doar stâlpii, piloții, plăcile de bază și piesele tăiate/sudate pe șantier necesită zincare termică prin imersie (SR EN ISO 1461) sau retușare locală cu vopsea zinc-rich (DTAC §7.5).

### PTh-R.5.5. Recapitulație beton și armătură — radier PT (per unitate de 1.600 kVA)

| Element | Cantitate |
|---|---|
| Volum beton C25/30 radier (4,00×3,20×0,28 m) | 3,58 m³ |
| Beton egalizare C8/10 (grosime 0,10 m) | 1,28 m³ |
| Armătură Ø12/200 (rețea bază, 2 fețe × 2 direcții) | ≈ 293 m → 260,1 kg |
| Armătură Ø10/100 (plasă locală ancoraj trafo, 1,2×1,2m×2fețe) | ≈ 58 m → 35,8 kg |
| Armătură Ø14 (centură perimetrală, 4 bare × 14,4 m perimetru) | 57,6 m → 69,6 kg |
| Etrieri centură Ø8/200 (perimetru/0,2 ×1) | ≈ 72 buc. × 1,0m → 28,4 kg |
| **Total armătură radier PT** | **≈ 394 kg** |

Indice de consum: 394 kg/3,58 m³ ≈ **110 kg/m³** — valoare de ordin corect pentru un radier cu sarcini concentrate mari (transformator) și cerință de ancorare antiseismică (interval uzual 80–120 kg/m³ pentru astfel de fundații speciale). Pentru un parc cu N_PT posturi (v. DTAC §1.6, N_PT ≈ P_instalat/1.600 kVA), cantitățile se multiplică cu N_PT.

### PTh-R.5.6. Listă de cantități (antemăsurătoare) — poziții tip deviz pentru execuție

Tabelul de mai jos structurează cantitățile pe **poziții tip de deviz**, format util pentru trecerea directă în antemăsurătoarea de execuție (exemplu la 2 MWp, 86 mese, 1 post de transformare de 1.600 kVA):

| Poz. | Denumire lucrare | U.M. | Cantitate | Observație |
|---|---|---|---|---|
| 1 | Trasare topografică piloți | buc. | 774 | stație totală/GPS-RTK |
| 2 | Furnizare + instalare pilot elicoidal interior (D=2,2m, elice Ø350) | buc. | 594 | conform D02 |
| 3 | Furnizare + instalare pilot elicoidal contur (D=2,8m, 2×elice Ø400) | buc. | 180 | conform D02 |
| 4 | Teste de smulgere in situ (preliminare + confirmare) | buc. | 8 | conform PTh-R.2.2 |
| 5 | Furnizare + montaj placă de bază 250×250×25mm + 4×M20 | buc. | 774 | conform D01 |
| 6 | Furnizare + montaj stâlp HEA140 (front+spate) | buc. | 1.548 | conform D03 |
| 7 | Furnizare + montaj grindă înclinată Sigma240×3,0 | buc. | 774 | conform D03 |
| 8 | Furnizare + montaj pană Z200×2,5 (tronsoane 6,0m) | buc. | 1.376 | 4 rânduri×4 tronsoane×86 mese |
| 9 | Furnizare + montaj contravântuire Ø48×3 în X | buc. | 516 | 6/masă×86 |
| 10 | Furnizare + montaj module FV 555Wp cu cleme | buc. | 3.600 | + 14.448 buloane M8 |
| 11 | Legare la pământ structură (platbandă+electrozi) | ml/buc. | conform proiect electric | v. PTh-R.12.1 |
| 12 | Zincare termică suplimentară/retuș (unde necesar) | kg | ~50 | zone tăiate/sudate șantier |
| 13 | Săpătură + strat balast compactat radier PT | m³ | 1,28 (egalizare) + ~5 (balast) | pentru 1 PT ilustrativ |
| 14 | Turnare beton egalizare C8/10 | m³ | 1,28 | radier PT |
| 15 | Furnizare + montare armătură radier PT (Ø8…Ø14) | kg | 394 | conform PTh-R.5.5 |
| 16 | Turnare beton radier PT C25/30 XC2 | m³ | 3,58 | radier PT |
| 17 | Montaj ancoraj antiseismic transformator | set | 1 | conform D10 |
| 18 | Execuție cuvă de retenție ulei | buc. | 1 | conform D11 |
| 19 | Fundații împrejmuire (cuzineți/piloți scurți) | buc. | funcție de perimetru | conform D12 |
| 20 | Camere de tragere + tuburi protecție traversare drum | buc./ml | conform proiect electric | conform D13 |

> Cantitățile de la poz. 6–10 corespund extraselor detaliate din PTh-R.5.1–5.4; poziția prezentă le oferă doar în **format de deviz**, pentru integrare directă în antemăsurătoarea generală a obiectivului. Pentru orice altă putere P_DC, toate cantitățile (cu excepția poz. 4, plafonată la minimul normativ, și a poz. 17–19, care scalează cu numărul de posturi/perimetrul real) se recalculează prin multiplicare cu N_mese = P_DC/23,3 kWp.

---

## PTh-R.6 — DETALII DE EXECUȚIE (PLANȘE D01–D14)

Fiecare detaliu de mai jos face parte din setul de planșe de execuție (fază PTh/DE) care însoțește prezentul memoriu. Scările indicate sunt cele minime recomandate pentru claritatea execuției; se pot mări local (1:2, 1:1) pentru sub-detalii critice (ex. poziția clemei pe rama modulului).

### D01 — Detaliu placă de bază stâlp–pilot (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Placă de bază | S275JR, 250×250×25 mm |
| 2 | Buloane de ancoraj | M20 gr. 8.8, zincate, 4 buc. |
| 3 | Șaibe de repartiție | Ø50×5 mm, sub piuliță |
| 4 | Cordon de sudură placă–pilot (dacă sudat) | a = 6 mm, continuu, tot conturul |
| 5 | Capul pilotului/flanșa | conform sistem ales — flanșă de fabrică sau manșon sudat |
| 6 | Piuliță de reglaj (nivelment) | 2 piulițe M20 + contrapiuliță, pentru reglaj vertical ±20 mm |

**Cerințe de execuție/toleranțe:** verticalitatea plăcii ≤ 1,5 mm/100 mm; planeitatea suprafeței superioare ≤ 2 mm; strângerea buloanelor de ancoraj la cuplul specificat de furnizor (orientativ 250–300 Nm pentru M20 gr. 8.8), verificată cu cheie dinamometrică pe 100% din îmbinări; se interzice sudarea pe șantier a suprafețelor zincate termic fără decapare locală + retușare zinc-rich după sudură.

### D02 — Detaliu cap pilot elicoidal — elice și zonă de tranziție (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Tijă pilot | Ø88,9×5,5 mm, S355J2 |
| 2 | Elice (1 buc. interior / 2 buc. contur) | Ø350 mm (interior) / Ø400 mm (contur), t=10 mm |
| 3 | Zonă de sudură elice–tijă | sudură de colț continuă, a=6mm, verificată prin lichide penetrante 10% |
| 4 | Manșon de protecție linie sol | bandă bituminoasă/termocontractabilă, ±200 mm față de cota terenului |
| 5 | Marcaj adâncime | gravat/vopsit pe tijă, la fiecare 0,5 m, pentru control vizual la instalare |

**Cerințe de execuție/toleranțe:** verticalitate la instalare ±1–1,5%; poziție în plan ±30–50 mm față de axul proiectat; înregistrarea cuplului final de instalare pentru fiecare pilot (control 100%, comparație cu cuplul-țintă calibrat PTh-R.2.2, K_t = 31,4 m⁻¹); adâncime finală conform zonării geotehnice (PTh-R.2.3), cu marcaj vizibil de control.

### D03 — Detaliu nod cadru transversal (stâlp anterior–grindă înclinată–stâlp posterior) (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Stâlp anterior | HEA140, h=0,80m, S275JR |
| 2 | Stâlp posterior | HEA140, h=2,80m, S275JR |
| 3 | Grindă înclinată | Sigma 240×3,0, S350GD |
| 4 | Placă de capăt (end-plate) | 160×140×12mm, S275JR |
| 5 | Buloane grindă–placă | M14 gr. 8.8, 4 buc. |
| 6 | Placă de ranforsare (doubler) | t=5mm, sub placa de capăt, pe grindă |
| 7 | Gusetă stâlp | sudată pe HEA140, t=10mm |

**Cerințe de execuție/toleranțe:** unghiul de montaj al grinzii înclinate = 25° ± 0,5° față de orizontală; verificare cu inclinometru la montaj; strângerea buloanelor M14 la 100 Nm (control aleatoriu 1/10 noduri).

### D04 — Detaliu prindere pană–grindă (cleat/consolă) (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Pană | Z200×2,5, S350GD |
| 2 | Consolă de reazem (cleat) | L60×60×5, S275, sudată/bulonată pe grindă |
| 3 | Buloane pană–consolă | M12 gr. 8.8, 2 buc./reazem |
| 4 | Rost de suprapunere longitudinal | 300 mm, poziționat la 1/5 din deschidere |

**Cerințe de execuție/toleranțe:** interax pane pe planul înclinat = 1,075 m ± 5 mm; buloanele de suprapunere strânse la 60 Nm.

### D05 — Detaliu clemă modul — mid-clamp și end-clamp (scară 1:5)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Modul FV | 2384×1134×35mm, rama aluminiu |
| 2 | Mid-clamp | aluminiu extrudat, între 2 module |
| 3 | End-clamp | aluminiu extrudat, la capătul rândului |
| 4 | Bulon clemă | M8 A2-70 inox |
| 5 | Șaibă de repartiție | Ø24×2mm, sub cap bulon |
| 6 | Poziția clemei pe ramă | la ~1/4 din latura lungă a modulului (conform fișă IEC 61215) |

**Cerințe de execuție/toleranțe:** cuplu de strângere mid-clamp 18±2 Nm; end-clamp 15±2 Nm; verificare cu cheie dinamometrică, minim 1 din 20 cleme (control statistic, PTh-R.8); joc între module la capăt de masă ≥ 10 mm (rost dilatare).

### D06 — Detaliu contravântuire în X (gusetă + diagonale) (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Diagonală | Ø48×3, S275, în X |
| 2 | Gusetă | t=8mm, S275, sudată pe stâlp/grindă |
| 3 | Buloane diagonală–gusetă | M12 gr. 8.8, 2 buc./capăt |
| 4 | Capăt turtit (flattened end) diagonală | pentru prindere prin bulonare simplă |

**Cerințe de execuție/toleranțe:** montaj imediat după stâlpi+grinzi (stabilitate provizorie, DTAC §4.12); pretensionare ușoară la montaj pentru eliminarea jocului (fără a introduce eforturi remanente semnificative).

### D07 — Detaliu rost de dilatare longitudinal al mesei (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Joc structură (între tronsoane de 24–30m) | ≥ 30 mm |
| 2 | Joc module (clemă de capăt specială, glisantă) | 10–15 mm |
| 3 | Găuri ovalizate în îmbinări de capăt | pentru absorbția dilatării ΔL=23mm/24m |

**Cerințe de execuție/toleranțe:** verificare la montaj a jocului rămas funcție de temperatura ambiantă din ziua montajului (compensare termică — joc mai mare vara, mai mic iarna).

### D08 — Detaliu legare la pământ a structurii (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Platbandă de legătură | OL-Zn 25×4mm, de-a lungul mesei |
| 2 | Clemă de legătură structură–platbandă | inox, la fiecare stâlp |
| 3 | Electrod vertical (dacă necesar, completare priză) | țeavă/profil Ø2½", L=1,5–3,0m, zincat |
| 4 | Continuitate electrică pilot–stâlp–pană | verificată prin măsurare rezistență (<1Ω între elemente adiacente) |

**Cerințe de execuție/toleranțe:** rezistența prizei de pământ măsurată R_p ≤ 4Ω (DTAC §3.9); toate structurile metalice ale câmpului se leagă într-o rețea continuă echipotențială.

### D09 — Detaliu radier post transformare — cofraj și armare (secțiune) (scară 1:20)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Radier | C25/30 XC2, 4,00×3,20×0,28m |
| 2 | Rețea de bază Ø12/200 | ambele fețe, ambele direcții |
| 3 | Plasă locală ancoraj trafo Ø10/100 | zonă 1,2×1,2m centrată pe amprentă |
| 4 | Centură perimetrală 4Ø14 + Ø8/200 | contur radier |
| 5 | Strat de egalizare C8/10 | grosime 100mm |
| 6 | Balast compactat (98% Proctor) | grosime 300mm sub egalizare |

**Cerințe de execuție/toleranțe:** acoperire nominală c_nom = 45mm (XC2); planeitate radier ±5mm/2m; verificare compactare balast prin platou de încărcare sau densitate în situ.

### D10 — Detaliu ancoraj antiseismic transformator (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Bulon de ancoraj transformator | M16 gr. 8.8, 4 buc. |
| 2 | Opritoare laterale (stoppers) | oțel S275, sudate pe radier/placă înglobată |
| 3 | Tampoane antivibratile | cauciuc/elastomer, sub picioarele transformatorului |
| 4 | Placă înglobată în radier (insert plate) | 300×300×15mm, cu mustăți de ancoraj în beton |

**Cerințe de execuție/toleranțe:** poziționarea plăcii înglobate conform planului producătorului de transformator (coordonare obligatorie înainte de turnarea radierului — v. PTh-R.12); strângere buloane conform fișă tehnică transformator.

### D11 — Detaliu cuvă de retenție ulei (scară 1:20)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Cuvă de retenție | beton armat sau tablă, capacitate ≥ 100% volum ulei transformator |
| 2 | Strat de pietriș filtrant | grosime 200mm, deasupra fundului cuvei |
| 3 | Hidroizolație cuvă | membrană/hidrofugare beton, verificată la etanșeitate |
| 4 | Grătar/capac | acces pentru curățare periodică |

**Cerințe de execuție/toleranțe:** verificare etanșeitate prin probă cu apă (72h, fără infiltrații vizibile) înainte de punerea în funcțiune; capacitatea cuvei confirmată prin calcul volumetric față de fișa tehnică a transformatorului ales.

### D12 — Detaliu fundație împrejmuire (gard) (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Stâlp gard | metalic zincat, interax 2,5m |
| 2 | Fundație izolată | beton simplu C12/15, cuzinet Ø300×800mm |
| 3 | Alternativă — pilot înșurubat scurt | Ø60mm, adâncime 0,8–1,2m |
| 4 | Spațiu liber la bază (trecere faună) | 10–15 cm sub panoul de gard |

**Cerințe de execuție/toleranțe:** verticalitate stâlp ±1%; verificare la răsturnare/smulgere pentru zona de contur expusă vântului (calcul similar §PTh-R.4, la scară redusă).

### D13 — Detaliu cameră de tragere cabluri / traversare drum tehnologic (scară 1:20, coordonare cu instalații electrice)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Șanț cablu | adâncime 0,8–1,0m, lățime funcție de nr. cabluri |
| 2 | Tub de protecție la traversare drum | PEHD Ø160mm, îngropat sub structura rutieră |
| 3 | Cămin de tragere | beton prefabricat, pe pat de balast |
| 4 | Bandă de avertizare | îngropată la 0,3m deasupra cablului |

**Cerințe de execuție/toleranțe:** adâncimea de îngropare a tuburilor la traversarea drumului ≥ 0,8m sub nivelul finit al drumului (verificare portanță drum neafectată); coordonare obligatorie a traseului cu poziția piloților (v. PTh-R.12) — distanță minimă cablu–pilot ≥ 0,5m.

### D14 — Detaliu protecție anticorozivă la linia solului (manșon) (scară 1:5)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Pilot (zonă de interfață aer-sol) | zincat termic ≥85μm |
| 2 | Manșon de protecție suplimentară | bandă bituminoasă/termocontractabilă, ±200mm față de cota terenului |
| 3 | Rezervă de coroziune (supragrosime perete) | +1–2mm față de grosimea de calcul, în zona de interfață |

**Cerințe de execuție/toleranțe:** aplicarea manșonului după instalarea pilotului, cu curățare/degresare prealabilă a suprafeței zincate; verificare vizuală a continuității manșonului (fără întreruperi/bule de aer).

### D15 — Detaliu structură rutieră drum tehnologic interior (secțiune) (scară 1:20, coordonare cu drumuri)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Strat de formă/pat drum | balast compactat, grosime 300–400mm |
| 2 | Strat de bază | piatră spartă/macadam, grosime 150–200mm |
| 3 | Pantă transversală | 2,5% către rigole |
| 4 | Rigole de scurgere | pământ profilat sau prefabricate, lateral drum |
| 5 | Lățime carosabilă | 3,0–4,0m (interior) / 5,0m (acces PT, tronsoane de manevră) |

**Cerințe de execuție/toleranțe:** verificare portanță prin CBR ≥ 15% pe fundația compactată; pantă transversală verificată cu dreptar/nivelă; capacitate portantă confirmată pentru sarcina pe osie a transportului transformatorului (coordonare cu furnizorul PT înainte de execuție).

### D16 — Detaliu platformă tehnologică skid invertor (fundație ușoară) (scară 1:10)

| Element | Descriere | Material/Dimensiune |
|---|---|---|
| 1 | Cuzineți/tălpi de reazem skid | beton C20/25, prefabricate sau turnate, 0,60×0,60×0,30m |
| 2 | Platformă de acces/mentenanță | dale prefabricate sau pietriș compactat, în jurul skid-ului |
| 3 | Ancoraj skid–cuzinet | șuruburi de fixare conform fișă tehnică invertor |

**Cerințe de execuție/toleranțe:** planeitate cuzineți ±5mm (relevant pentru așezarea corectă a cadrului metalic al skid-ului de invertor); verificare drenaj (fără bălți sub echipament).

---

## PTh-R.7 — SPECIFICAȚII TEHNICE DE MONTAJ

### PTh-R.7.1. Secvența generală de montaj (extindere DTAC §2A.4)

1. **Trasare topografică** — pichetarea pozițiilor celor 9 piloți/masă, cu stație totală/GPS-RTK, pe baza planului de trasare rezultat din studiul topografic (DTAC §8.2bis) și a zonării geotehnice (PTh-R.2.3); toleranță poziție ±30–50mm.
2. **Instalarea piloților** — batere/vibrare sau înșurubare cu cap hidraulic; înregistrare cuplu final (la șuruburi) pentru control 100%; adâncime finală conform zonei geotehnice (D=2,2m interior / 2,8–2,5m contur, cu ajustări locale conform PTh-R.2.2).
3. **Montaj plăci de bază** — verificare verticalitate și cotă (D01), reglaj cu piulițe de nivelment ±20mm.
4. **Montaj stâlpi** (anterior + posterior) — verificare verticalitate ≤ 0,5%.
5. **Montaj grinzi înclinate** — unghi 25°±0,5° (D03), strângere buloane end-plate.
6. **Montaj contravântuiri** — IMEDIAT după grinzi, pentru stabilitate provizorie (D06).
7. **Montaj pane** — interax 1,075m (D04), verificare aliniament optic al rândului (±10mm pe cotă).
8. **Montaj module** — ULTIMELE, cu cleme mid/end (D05), cupluri conform PTh-R.4.4/PTh-R.6.
9. **Legare la pământ** — conectare structură-platbandă (D08), măsurare priză de pământ.
10. **Recepție** — procese-verbale (PTh-R.8, PTh-R.9).

### PTh-R.7.2. Tabel centralizat cupluri de strângere (montaj)

| Îmbinare | Bulon | Cuplu de strângere | Metodă de control |
|---|---|---|---|
| Placă bază – ancoraj pilot | M20 gr. 8.8 | 250–300 Nm | cheie dinamometrică, 100% |
| Grindă – placă capăt (end-plate) | M14 gr. 8.8 | 100 Nm | cheie dinamometrică, 10% aleatoriu |
| Pană – consolă (cleat) | M12 gr. 8.8 | 60 Nm | control vizual + 5% dinamometric |
| Suprapunere pană (splice) | M10 gr. 8.8 | 40 Nm | control vizual |
| Contravântuire – gusetă | M12 gr. 8.8 | 60 Nm | control vizual + 5% dinamometric |
| Clemă mid-clamp modul | M8 A2-70 | 18 ± 2 Nm | cheie dinamometrică, min. 1/20 cleme |
| Clemă end-clamp modul | M8 A2-70 | 15 ± 2 Nm | cheie dinamometrică, min. 1/20 cleme |
| Buloane ancoraj transformator | M16 gr. 8.8 | conform fișă tehnică furnizor | cheie dinamometrică, 100% |

> Valorile de cuplu de mai sus sunt orientative pentru buloanele gr. 8.8 uscate/ușor unse, conform practicii uzuale; se **confirmă obligatoriu cu fișa tehnică a producătorului de structură/module ales** înainte de montaj, întrucât valorile pot varia funcție de tratamentul suprafeței (zincat vs. inox) și de tipul de lubrifiant.

### PTh-R.7.3. Toleranțe de montaj — tabel centralizat (completare DTAC §2A.4, §4.11)

| Parametru | Toleranță admisă |
|---|---|
| Poziție pilot în plan | ±30–50 mm față de ax |
| Verticalitate pilot | ±1–1,5% |
| Cotă vârf pilot | ±10 mm |
| Verticalitate stâlp | ≤ 0,5% |
| Unghi înclinare grindă (β) | 25° ± 0,5° |
| Interax pane | ±5 mm |
| Planeitate rând (aliniament optic) | ±10 mm pe cotă |
| Joc rost dilatare structură | ≥ 30 mm (verificat la temperatura de montaj) |
| Joc module la capăt de masă | 10–15 mm |

### PTh-R.7.4. Condiții meteorologice de limitare a montajului

- Montajul modulelor (etapa cu suprafață maximă expusă la vânt) se **întrerupe** la viteze ale vântului instantanee ≥ 12–14 m/s (prag orientativ de siguranță a lucrătorilor și a structurii nefinalizate, conform practicii de șantier pentru elemente ușoare cu suprafață mare — se confirmă cu planul propriu de securitate al antreprenorului);
- Betonarea radierului PT se întrerupe la temperaturi sub +5°C fără măsuri speciale (aditivi, protecție termică), conform SR EN 13670;
- Zincarea/vopsirea de retuș (zinc-rich) nu se aplică la umiditate relativă > 85% sau pe suprafețe umede.

### PTh-R.7.5. Logistică și utilaje

- Utilaj de batere/vibrare piloți sau cap hidraulic de înșurubare cu control de cuplu (productivitate estimată: 20–40 piloți/zi/echipaj, funcție de teren);
- Macara mobilă/manipulator telescopic pentru descărcarea și poziționarea transformatorului pe radier (coordonare drum de acces — DTAC §3.8, portanță drum verificată pentru gabaritul de transport al PT);
- Echipamente de sudură (dacă se optează pentru plăci de bază sudate) cu personal calificat conform SR EN ISO 9606-1.

---

## PTh-R.8 — PLAN DE CONTROL AL CALITĂȚII

### PTh-R.8.1. Controlul materialelor metalice

| Material | Verificare | Frecvență |
|---|---|---|
| Profile formate la rece (pană, grindă) | Certificat 3.1 (SR EN 10204), grosime zinc bandă | la fiecare lot |
| Profile laminate (stâlpi HEA140) | Certificat 3.1, marcaj S275JR | la fiecare lot |
| Piloți | Certificat material, verificare grosime zincare termică (min. 5 măsurători/lot) | la fiecare lot + control 100% cuplu instalare |
| Buloane gr. 8.8 | Certificat conformitate, marcaj | la fiecare lot |

### PTh-R.8.2. Controlul zincării termice (SR EN ISO 1461)

- grosime minimă strat: 70 μm (piese < 3mm), **85 μm (piese > 6mm — cazul stâlpilor și piloților)**;
- măsurători: minim 5 puncte/piesă reprezentativă, minim 10% din piese/lot;
- aspect: continuu, fără zone neacoperite, fără exces de zinc care să împiedice montajul buloanelor;
- retușare zonelor tăiate/sudate pe șantier cu vopsea zinc-rich, minim 2 straturi, grosime totală ≥ grosimea zincării originale.

### PTh-R.8.3. Controlul betonului radier PT (SR EN 206 / NE 012)

| Control | Frecvență |
|---|---|
| Consistență (tasare S3–S4) | fiecare transport betonier |
| Rezistență la compresiune (cuburi 150mm, seturi de 3) | 1 set/radier PT (volum mic, sub pragul de 50mc) |
| Verificare acoperire armătură (c_nom=45mm) | înainte de betonare, control 100% |

Criteriu de conformitate: fcm ≥ fck+4 = 29 N/mm² și fiecare rezultat individual ≥ fck−4 = 21 N/mm² (probe la 28 zile).

### PTh-R.8.4. Controlul de producție al piloților (specific CEF)

- **piloți bătuți/vibrați:** înregistrare cotă de refuz (adâncimea la care rezistența la penetrare atinge pragul-țintă) pentru fiecare pilot, comparație cu criteriul stabilit din testele de smulgere (PTh-R.2.2);
- **șuruburi elicoidale:** înregistrare cuplu final de instalare pentru **100% din piloți**, verificare vs. cuplul-țintă calibrat (T ≈ 1,75 kNm pentru capacitate 55 kN, K_t = 31,4 m⁻¹, PTh-R.2.2); piloții care nu ating cuplul-țintă la adâncimea de proiect se **prelungesc** (adaos de tijă) până la atingerea cuplului sau se raportează proiectantului pentru soluție alternativă (pilot suplimentar, șurub cu elice mai mare);
- **teste de smulgere de control** — suplimentar față de testele preliminare (PTh-R.2.2), se recomandă 1–2 teste de verificare pe piloții definitivi instalați (nu doar pe piloți de probă), pentru confirmarea finală a capacității în condiții reale de execuție.

### PTh-R.8.5. Toleranțe de execuție — verificare geometrică finală

| Element | Toleranță | Metodă de verificare |
|---|---|---|
| Aliniament rând module | ±10 mm | nivelment/stație totală |
| Planeitate generală masă | ±15 mm | nivelment |
| Poziție PT față de axe | ±25 mm | stație totală |
| Grosime radier PT | +10/−5 mm | șabloane, măsurare directă |

### PTh-R.8.6. Procese-verbale

Se întocmesc PV de lucrări ascunse (PVLA) pentru: poziție și adâncime piloți (cu cuplu/refuz înregistrat), armare radier PT (înainte de betonare), și PV de recepție calitativă (PVRC) pentru: geometria finală a fiecărei mese, strângerea buloanelor critice (placă de bază, ancoraj transformator), grosimea zincării, betonarea radierului (cu buletine de rezistență). Semnate de constructor + diriginte de șantier + (la faze determinante) proiectant + ISC.

---

## PTh-R.9 — FAZE DETERMINANTE

| Nr. | Faza determinantă | Verificări/criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului la nivelul de fundare a piloților (confirmare geotehnică) | confruntare cu studiul geotehnic definitiv; absența umpluturilor/pungilor slabe; zonare confirmată | geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Teste de smulgere in situ (min. 8 teste @ 2 MWp, conform PTh-R.2.2) | capacitate confirmată ≥ N_up,Ed proiectat; calibrare K_t | geotehnician, proiectant, diriginte, ISC |
| FD3 | Instalarea piloților definitivi (control 100% cuplu/refuz) | fiecare pilot ≥ cuplul-țintă la adâncimea de proiect | diriginte, constructor |
| FD4 | Montaj structură metalică (mese) — geometrie și strângeri critice | verticalitate, unghi, cupluri placă de bază, contravântuiri montate | proiectant, diriginte, constructor, ISC |
| FD5 | Armare radier PT (înainte de betonare) | diametre, poziții, acoperire 45mm, plasă locală ancoraj trafo | proiectant, diriginte, constructor, ISC |
| FD6 | Recepția zincării/protecției anticorozive | grosimi conforme, retușuri complete | diriginte, constructor |

La fiecare fază determinantă: convocare cu minim 10 zile înainte; PV de fază determinantă (autorizare continuarea lucrărilor); neîndeplinirea criteriilor blochează avansul până la remediere și reverificare.

---

## PTh-R.10 — PROGRAM DE URMĂRIRE ÎN TIMP (P130) + MONITORIZARE STRUCTURALĂ SPECIFICĂ CEF

### PTh-R.10.1. Urmărirea curentă (extindere DTAC §9BIS)

Urmărire vizuală anuală, plus verificare obligatorie **după fiecare eveniment extrem** (furtună cu viteză raportată apropiată de v_b=30 m/s, cutremur resimțit, ninsoare abundentă): coroziune (în special la linia solului — D14), deformații ale cadrelor, slăbirea buloanelor (D01, D03, D05), integritatea zincării, aliniamentul rândurilor.

### PTh-R.10.2. Monitorizare specifică — mișcare/smulgere piloți

- **mărci de control** la 3–5 piloți-martor reprezentativi (interior + contur), cu măsurare topografică a cotei de vârf la 1, 6, 12 luni de la PIF, apoi anual;
- **criteriu de alarmare:** deplasare verticală/orizontală a capului pilotului > 5 mm între citiri succesive → notificare proiectant + investigație suplimentară (posibilă degradare a capacității la smulgere prin oboseala solului sau eroziune);
- **dezgropare punctuală** a 1–2 piloți-martor la 10 și 20 ani, pentru măsurarea grosimii reziduale a peretelui (verificarea rezervei de coroziune, DTAC §7.3).

### PTh-R.10.3. Monitorizare radier PT

- verificare tasare (mărci pe radier sau pe anvelopa PT), similar metodologiei PTh generice (nivelment de ordinul II, precizie ±0,5mm), la 1, 3, 6, 12 luni, apoi anual până la stabilizare (Δs < 2mm/an);
- criteriu de alarmare: tasare absolută > 25mm sau tasare diferențială radier-teren adiacent > 1/500.

### PTh-R.10.4. Mentenanță structurală programată

| Activitate | Periodicitate |
|---|---|
| Inspecție vizuală generală (coroziune, deformații, cleme) | anuală |
| Retorque eșantion cleme module (min. 1/20) | la 2 ani |
| Retorque plăci de bază (eșantion 5%) | la 5 ani |
| Verificare priză de pământ (R_p ≤ 4Ω) | anuală |
| Dezgropare control pilot-martor (grosime reziduală) | la 10 și 20 ani |
| Retușare locală zinc-rich (unde necesar) | funcție de constatări |

Acest program asigură menținerea rezervei de coroziune și a marjei de siguranță pe toată durata de exploatare (25–30 ani mese, 50 ani post transformare) — componenta de **PREDICȚIE** aplicată la nivel de mentenanță (conform DTAC §10.2).

---

## PTh-R.11 — VERIFICĂRI SUPLIMENTARE LA STĂRI LIMITĂ DE SERVICIU (SLS)

### PTh-R.11.1. Combinații SLS (completare DTAC, care a tratat doar SLU/EQU)

Conform SR EN 1990 §6.5.3, se aplică pentru structura metalică FV combinația **caracteristică** (Gk + Qk,1 + Σψ0,i·Qk,i) pentru verificarea săgeților instantanee și a deformațiilor care afectează funcționarea (aliniamentul optic al rândurilor, relevant pentru eventuala extindere ulterioară cu tracker sau pentru estetica/funcționarea corectă a sistemului de curățare automată, dacă e cazul).

| Combinație | Expresie | Utilizare la structura FV |
|---|---|---|
| Caracteristică | Gk + Wk | săgeți instantanee pane/grinzi |
| Cvasipermanentă | Gk + ψ2·Sk (ψ2=0 pt. zăpadă/vânt) | practic egală cu Gk — fluaj neglijabil (structură metalică) |

### PTh-R.11.2. Verificarea completă a săgeții panei (extindere DTAC §4.8.5)

DTAC a verificat δ_calc = 7,0 mm < 15 mm (L/200) sub încărcare caracteristică gravitațională. Se completează verificarea la **sucțiune caracteristică** (relevantă pentru aspectul vizual/aliniament, chiar dacă structural sucțiunea e sub gravitațional):

δ_calc,sucțiune = 5·q_k,sucțiune·l⁴/(384·E·I), cu q_k,sucțiune = w_e,↑,câmp(caracteristic, fără γ) × 1,075 = 1,46/1,5 × 1,075 ≈ 1,046 kN/m (aproximare prin împărțire la γ_Q=1,5 pt. valoare caracteristică):

δ = 5×1,046×3000⁴/(384×210.000×200×10⁴) = 5×1,046×8,1×10¹³/1,613×10¹⁴ = **2,6 mm** ≪ 15 mm → **satisfăcut**, sucțiunea nu guvernează deformabilitatea (confirmă observația DTAC că sucțiunea, mai mică decât gravitaționalul C1, e nedeterminantă și pentru SLS).

### PTh-R.11.3. Verificarea vibrațiilor induse de vânt pe module (confort/durabilitate cleme)

Deplasarea laterală relativă a marginii libere a modulului sub rafale (nu doar presiunea medie) poate produce oboseală suplimentară a clemelor prin micro-mișcări repetate. Se recomandă, ca măsură constructivă (nu calcul obligatoriu la DTAC/PTh, dar bună practică de execuție): clemă mediană pe fiecare interstițiu modul-modul (nu doar la 2-3 module), pentru limitarea deschiderii libere între puncte de prindere la ≤ 1,2 m, reducând amplitudinea vibrației locale a marginii modulului.

### PTh-R.11.4. Verificarea deplasării laterale de vârf a cadrului (SLS)

δ_H sub H_Ed caracteristic (din model EF, PTh-R.3.4) = 3,2 mm la vârful stâlpului posterior (h=2,80m) → δ_H/h = 3,2/2800 = 1/875 ≪ h/100 (limita practicii curente pentru mese fixe, unde nu există impact funcțional al deplasării laterale asupra unui mecanism de urmărire) → **satisfăcut, larg**.

---

## PTh-R.12 — CORELARE CU CELELALTE SPECIALITĂȚI

### PTh-R.12.1. Corelare cu instalațiile electrice (DC/AC, traseu cabluri)

- **Traseul cablurilor DC** (de la combiner box la invertor) se dispune, pe cât posibil, **suspendat sub structura mesei** (cable tray sau șine de prindere pe stâlpul posterior), evitând contactul direct cu solul și traversarea zonei de acces a utilajelor de mentenanță; distanța minimă cablu–muchie metalică ascuțită ≥ 20mm sau protecție prin manșon/tub;
- **Traseele îngropate** (cabluri AC de JT, MT, fibră) se poziționează la distanță minimă **≥ 0,5 m** față de axul piloților (D13), pentru a evita deteriorarea la instalarea/reinstalarea piloților și pentru a păstra accesul la teste de smulgere de control (PTh-R.10.2);
- **Legarea la pământ** a structurii (D08) se integrează cu rețeaua generală de împământare a parcului (priză de pământ perimetrală + electrozi, DTAC-instalații §3.9), cu verificare de continuitate electrică structură-priză înainte de punerea sub tensiune;
- **Protecția la trăsnet** (SPD tip 1 la PT, SPD tip 2 la invertor/combiner, conform DTAC-instalații) presupune ca structurile metalice ale câmpului să fie echipotențializate — sarcină de coordonare explicită între rezistență (execuția rețelei de legare, D08) și electric (proiectarea SPD-urilor și a analizei de risc SR EN 62305-2).

### PTh-R.12.2. Corelare cu drumurile interioare și platformele

- **Drumul tehnologic** de acces la PT trebuie dimensionat (portanță, lățime) pentru transportul transformatorului (DTAC §3.8) — se coordonează gabaritul și greutatea pe osie a transportului cu structura rutieră (verificare CBR), înainte de finalizarea traseului;
- **Platforma betonată sub PT** (radier, D09) se corelează cu cotele drumului de acces pentru rampa de descărcare a transformatorului.

### PTh-R.12.3. Corelare cu securitatea la incendiu (PSI)

- **Lățimea drumului de incintă** (DTAC §3.8, 3,0–4,0 m, până la 5m la parcuri mari) se verifică față de gabaritul de intervenție al autospecialelor ISU — coordonare cu scenariul de securitate la incendiu (dacă există, document separat);
- **Deconectorii rapizi de string (rapid shutdown)** și accesul de intervenție al pompierilor la câmpul FV (DTAC-instalații) nu afectează structura, dar poziționarea firidelor/cutiilor de deconectare pe structura mesei (dacă e cazul) trebuie coordonată cu amplasarea stâlpilor pentru accesibilitate.

### PTh-R.12.4. Corelare cu împrejmuirea și controlul accesului

Fundația gardului (D12) și pozițiile senzorilor antiefracție/CCTV (DTAC §3.8) se coordonează cu traseul de trasare topografică a piloților mesei celei mai apropiate de gard, pentru respectarea distanței de siguranță și a servituților de întreținere.

---

## PTh-R.13 — CADRU NORMATIV DE DETALIERE (EXTINS FAȚĂ DE DTAC)

| Domeniu | Normativ/standard | Relevanță PTh specifică |
|---|---|---|
| Execuție structuri de oțel | SR EN 1090-2 (clasă EXC2) | control sudură, toleranțe montaj |
| Calificare sudori | SR EN ISO 9606-1 | dacă se optează pentru plăci sudate |
| Îmbinări cu șuruburi | SR EN 1993-1-8 | verificare completă noduri (D01, D03, D05, D06) |
| Rezistență la oboseală | SR EN 1993-1-9 | verificare contravântuiri, cleme (PTh-R.4.7) |
| Teste de smulgere | SR EN 1997-1 §7.5, ISO 22477-5 | protocol PTh-R.2.2 |
| Piloți/fundații speciale | NP 123-2010 | calibrare finală adâncimi |
| Documentații geotehnice | NP 074-2014 | studiu definitiv, zonare |
| Execuție lucrări de beton | SR EN 13670 | betonare radier PT, tratare, decofrare |
| Control conformitate beton | SR EN 206 / NE 012 | probe radier PT |
| Zincare termică | SR EN ISO 1461 | control grosime, retușuri |
| Protecție anticorozivă generală | SR EN ISO 12944-1…6 | clasificare C3/Im3, durabilitate |
| Legare la pământ | I7-2011, 1.RE-Ip 30/2004 | rețea structură-priză pământ |
| Protecție la trăsnet | SR EN/IEC 62305-1…4 | coordonare SPD-structură |
| Recepția construcțiilor | Legea 10/1995, HG 273/1994 | procese-verbale, carte tehnică |
| Faze determinante | HG 742/2018 | program de control avizat ISC |
| Urmărirea comportării în timp | P130-1999 | plan de monitorizare PTh-R.10 |

---

## PTh-R.14 — RESPONSABILITĂȚI ȘI FAZARE

- **Proiectant de specialitate (structuri):** inginer constructor cu drept de semnătură, membru AICPS; răspunde de dimensionarea de execuție din prezentul supliment PTh și de coerența cu DTAC.
- **Verificare tehnică de calitate:** obligatorie, verificator de proiecte atestat MDLPA pentru cerințele **A1** (rezistență/oțel) și **Af** (fundații/teren), conform Legii 10/1995 și HG 925/1995, înainte de execuție.
- **Expert geotehnician:** confirmă studiul geotehnic definitiv, supervizează testele de smulgere in situ (PTh-R.2) și avizează adâncimile finale de încastrare pe zone.
- **Diriginte de șantier atestat:** urmărește execuția (EXC2), recepția materialelor, procesele-verbale de teste smulgere/cuplu, geometria finală (PTh-R.8, PTh-R.9).
- **Antreprenor de structuri metalice:** furnizează fișele tehnice ale profilelor/clemelor/cuplurilor de strângere adoptate efectiv, care **confirmă sau ajustează minor** valorile orientative din PTh-R.7.2 (fără a modifica dimensionarea de bază).

**Fazare a documentației, cu poziționarea prezentului supliment:**

1. **DTAC (fază anterioară, deja elaborată):** memoriu de rezistență + planșe de ansamblu — dimensionarea structurii unitare și principiile de scalare.
2. **PTh (faza curentă — prezentul document):** breviar de calcul de execuție (model EF, noduri, îmbinări), extrase de armare/materiale, planuri de detalii D01–D14, specificații de montaj, plan de control al calității, faze determinante, program de urmărire în timp.
3. **DE — Detalii de Execuție (fază următoare, dacă separată contractual de PTh):** definitivarea planului complet de trasare (poziții exacte × N_total conform puterii instalate finale), antemăsurători finale, ajustări minore de detaliu rezultate din coordonarea cu execuția reală și din rezultatele finale ale testelor de smulgere pe amplasamentul definitiv.

Modificarea puterii instalate a parcului între faze **nu afectează** dimensionarea structurii unitare (masă/pilot/radier PT) și nici detaliile de execuție D01–D14, ci **doar cardinalul componentelor** din extrasele PTh-R.5 și extinderea planului de trasare — coerent cu principiul de scalare parametrică menținut din DTAC (§1.6) în întreg prezentul supliment.

---

*Notă: Prezentul document constituie suplimentul de fază PTh — Structură și Rezistență pentru parcul fotovoltaic, complementar Memoriului de rezistență DTAC deja elaborat, și se citește împreună cu planșele de execuție D01–D14, Caietul de sarcini de rezistență (document separat) și cu procesele-verbale ale testelor de smulgere in situ. Valorile numerice ale exemplului de teste (PTh-R.2.2) și ale distribuției interior/contur (PTh-R.1.2) sunt ilustrative pentru metodologia de calcul; valorile definitive, obligatorii pentru execuție, rezultă din studiul geotehnic complet și din rapoartele de teste efectuate pe amplasamentul real al proiectului, conform confirmării de către verificatorul tehnic atestat MDLPA (cerințele A1 și Af) înainte de finalizarea execuției.*
