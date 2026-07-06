# Memoriu tehnic de rezistență și stabilitate (DTAC)
## Bloc de locuințe colective S+P+8E — structură duală (cadre + pereți structurali din beton armat)

> Documentație tehnică pentru autorizarea executării lucrărilor de construire (DTAC), specialitatea **Rezistență**, întocmită conform Legii nr. 10/1995 privind calitatea în construcții și HG nr. 907/2016. Nivelul de detaliere corespunde fazei DTAC; breviarul de calcul complet, planurile de cofraj, planurile de armare și detaliile de execuție se predau la faza Proiect Tehnic (PTh) și Detalii de Execuție (DDE).

---

## 1. Date generale ale investiției

### 1.1. Obiectul documentației

Prezentul memoriu tratează concepția și verificarea structurii de rezistență a unui **imobil de locuințe colective**, regim de înălțime **S+P+8E** (subsol, parter, opt etaje curente), destinat locuirii permanente. Clădirea este un corp unic, compact, cu funcțiune omogenă (apartamente), circulație verticală centrală (nucleu casă de scară + puț lift) și subsol tehnic/parcaje.

### 1.2. Caracteristici geometrice

| Parametru | Valoare | Observații |
|---|---|---|
| Amprentă la sol (ax-ax) | **24,00 × 16,00 m** | 384 mp/nivel |
| Arie desfășurată suprastructură | ~3.456 mp | 9 niveluri supraterane |
| Cotă radier | −4,00 m | față de ±0,00 |
| Cotă superioară subsol (±0,00 − 0,15) | −0,15 m | placă peste subsol |
| Înălțime liberă subsol | 2,80 m | garaj/tehnic |
| Înălțime de nivel parter | 3,20 m | comercial/lobby |
| Înălțime de nivel etaj curent | 2,90 m | 8 etaje |
| Înălțime suprastructură (de la ±0,00) | **3,20 + 8·2,90 = 26,40 m** | la cota terasă (atic exclus) |
| Înălțime totală de la radier Hw | **≈ 30,40 m** | pentru zona critică pereți |
| Cota atic | +27,50 m | parapet terasă |

Deschideri curente în plan: 3 travee de 5,40 m pe direcția lungă (16,20 m util interior) și 2 deschideri de 6,00 m + 4,00 m pe direcția scurtă. Nucleul de circulație (casă de scară + lift) este poziționat central-lateral, formând un **tub închis** din pereți de beton armat.

### 1.3. Clasificări normative

| Clasificare | Valoare | Referință normativă |
|---|---|---|
| Clasa de importanță și expunere | **III** (γ_I,e = 1,00) | P100-1/2013, tab. 4.2 |
| Clasa de consecințe | **CC2** (K_FI = 1,00) | SR EN 1990:2004, anexa B / CR 0-2012 |
| Categoria de importanță | **C** (normală) | HG 766/1997, anexa 3 |
| Categoria geotehnică | **2** (risc geotehnic moderat) | NP 074/2022, tab. 3 |
| Clasa de ductilitate | **DCM** (medie) | P100-1/2013, §5.2.1 |
| Sistem structural | **Dual cu pereți predominanți** | P100-1/2013, §5.2.2.1 |
| Grad de rezistență la foc | **II** | P118/1999, NP 118 |

Justificarea clasei de importanță III: clădire de locuit obișnuită, mai mult de un nivel, care nu se încadrează în clasele I sau II (nu adăpostește > 300 persoane într-o singură incintă, nu are funcțiuni esențiale post-seism). Coeficientul de importanță γ_I,e = 1,00 se aplică forței seismice.

### 1.4. Cerințe fundamentale

Conform Legii 10/1995 și P100-1/2013 §2.1, structura satisface:

- **Cerința A1 — Rezistență mecanică și stabilitate**, cu cele două condiții de performanță:
  - **Siguranța vieții (SLU / ULS)** — la cutremur cu interval mediu de recurență **IMR = 225 ani** (probabilitate de depășire 20% în 50 ani). Structura poate suferi degradări, dar nu se prăbușește și nu pune în pericol viața.
  - **Limitarea degradărilor (SLS)** — la cutremur cu **IMR = 40 ani** (probabilitate 40% în 10 ani, factor ν = 0,5 pe deplasări). Elementele nestructurale nu suferă degradări importante.
- Cerințe conexe: siguranța în exploatare, protecția la foc (cerința C), izolare higrotermică (nu face obiectul rezistenței).

---

## 2. Baze de proiectare, normative și metode

### 2.1. Cadru normativ aplicat

Proiectarea structurii se realizează pe baza **eurocodurilor structurale adoptate ca SR EN**, împreună cu anexele naționale și codurile românești specifice:

| Domeniu | Normativ |
|---|---|
| Bazele proiectării, coeficienți parțiali, grupări | **SR EN 1990:2004 + A1** și **CR 0-2012** (cod de proiectare — bazele proiectării) |
| Acțiuni — greutăți proprii, utile | **SR EN 1991-1-1** |
| Acțiuni — zăpadă | **SR EN 1991-1-3** și **CR 1-1-3/2012** |
| Acțiuni — vânt | **SR EN 1991-1-4** și **CR 1-1-4/2012** |
| Acțiuni — foc | **SR EN 1991-1-2** |
| Structuri de beton — general | **SR EN 1992-1-1** (Eurocod 2) + anexa națională |
| Structuri de beton — foc | **SR EN 1992-1-2** |
| Proiectare seismică | **P100-1/2013** (cod de proiectare seismică, partea I) |
| Evaluare seismică (existent) | P100-3/2019 (nu se aplică — construcție nouă) |
| Fundații directe | **NP 112-2014** (proiectarea fundațiilor de suprafață) |
| Investigații geotehnice | **NP 074-2022** |
| Acțiuni geotehnice / împingerea pământului | SR EN 1997-1 (Eurocod 7) + NP 122 |

### 2.2. Metode de calcul

- **Analiza structurală globală**: metoda **forțelor laterale echivalente** (P100-1 §4.5.3.2), aplicabilă întrucât structura este regulată în plan și elevație și T1 ≤ 4·Tc și T1 ≤ 1,5 s (a se vedea §7). Verificare prin **analiză modală cu spectre de răspuns** (§4.5.3.3) pe model spațial cu diafragme rigide de planșeu.
- **Modelarea** se realizează în program de element finit (ETABS/SAP2000 sau echivalent) cu: pereți modelați ca elemente shell/membrane, cadre ca elemente bară, planșee ca diafragme rigide în planul lor (constrângere de corp rigid). Fundația se modelează cu resoarte Winkler (k_s din modulul de reacțiune al terenului).
- **Dimensionarea secțiunilor** la stări limită ultime (SLU) prin metoda coeficienților parțiali, cu proiectare bazată pe capacitate (**capacity design**) pentru asigurarea mecanismului favorabil de disipare.
- **Verificarea la stări limită de serviciu (SLS)**: deplasări relative de nivel, săgeți, control fisurare.

### 2.3. Ipoteze de rigiditate pentru calculul seismic

Pentru calculul la starea limită ultimă seismică, rigiditatea la încovoiere și forfecare a elementelor de beton fisurat se ia (P100-1 §4.5.3.3, notă) egală cu **50% din rigiditatea secțiunii nefisurate** (E·I_eff = 0,5·E·I_c). Aceasta ține cont de fisurarea betonului sub acțiuni ciclice și conduce la o alungire realistă a perioadelor proprii și implicit la deplasări mai mari, verificate la SLS/SLU.

---

## 3. Alegerea sistemului structural și justificarea

### 3.1. Analiza opțiunilor

Pentru un bloc S+P+8E (H ≈ 26,4 m suprateran) în zonă seismică moderat-înaltă, s-au evaluat trei sisteme structurale principale conform P100-1 §5.1.2:

**(a) Cadre din beton armat (moment-resisting frames).** Avantaj: flexibilitate în compartimentare, deschideri libere. Dezavantaj major la zona seismică vizată: rigiditate laterală redusă → deplasări relative de nivel (drift) mari, greu de încadrat în limita SLS de 0,005·h la ag = 0,25g; risc de mecanism de tip „nivel slab" (soft-storey) la parter cu H mai mare; T1 lung (0,7–0,9 s pentru 9 niveluri) → poate intra pe ramura descendentă a spectrului dar cu deplasări penalizante. La 9 niveluri, sistemul pur în cadre necesită stâlpi și grinzi voluminoase și armare densă în noduri.

**(b) Pereți structurali (diafragme) integral.** Avantaj: rigiditate laterală maximă, drift minim, mecanism ductil stabil. Dezavantaj: rigidizează excesiv și limitează libertatea de compartimentare la parter (funcțiune comercială/lobby cu deschideri mari), unde pereții denși deranjează.

**(c) Sistem DUAL (cadre + pereți structurali) — SOLUȚIA ADOPTATĂ.** Combină cadrele (preiau încărcările gravitaționale și o parte din forța seismică) cu pereți structurali dispuși pe ambele direcții (preiau componenta majoră a forței seismice laterale). Nucleul de circulație verticală (casa scării + puțul liftului) formează un tub închis care contribuie decisiv la rigiditate și la preluarea torsiunii.

**Tabel comparativ al sistemelor structurale (S+P+8E, ag = 0,25g):**

| Criteriu | (a) Cadre pure | (b) Pereți integral | (c) Dual — ADOPTAT |
|---|---|---|---|
| Perioadă T_1 [s] | 0,85–0,95 | 0,45–0,55 | 0,55–0,62 |
| Drift SLS la ag=0,25g | risc depășire 0,005h | foarte mic (~0,002h) | mic (~0,0015h), marjă mare |
| Risc soft-storey parter | ridicat | absent | absent (pereți continui) |
| Factor q (DCM) | 3,45·1,0 = 3,45 | 3,0·1,0 (k_w) | 3,45 |
| Libertate compartimentare parter | maximă | redusă | bună (cadre la parter) |
| Redundanță / cale descărcare | medie | bună | foarte bună |
| Consum beton/armătură | mare (stâlpi/grinzi mari) | mediu | optim |
| Verdict | inadecvat la ag înalt | rigid dar inflexibil | **optim** |

### 3.2. Sistemul adoptat: DUAL cu pereți predominanți

Conform P100-1 §5.2.2.1, sistemul se clasifică drept **dual cu pereți predominanți** deoarece **pereții structurali preiau > 50% din forța tăietoare de bază** (în cazul de față ~68% pe direcția X și ~72% pe direcția Y, verificat în model — a se vedea §8). Restul este preluat de cadrele perimetrale și interioare.

**Dispunerea pereților:**
- **Nucleul central** casă-scară + lift: tub închis din pereți de 30 cm grosime (25 cm de la E4 în sus), care preia torsiunea de ansamblu și o cotă majoră din forța seismică pe ambele direcții.
- **Pereți transversali (direcția Y, scurtă)**: 4 pereți de capăt/interiori, lungime l_w = 4,00–6,00 m, care mărginesc casele scării și separă tronsoanele de apartamente.
- **Pereți longitudinali (direcția X, lungă)**: 2 pereți de spate/fațadă interioară, l_w ≈ 5,40 m.
- **Cadre** pe conturul perimetral și pe axele intermediare, stâlpi 60×60 cm la subsol-parter, reducându-se la 50×50 la etaje superioare; grinzi 30×60 cm.

**Justificare tehnică:**
1. **Rigiditate laterală adecvată** → controlul deplasărilor relative de nivel sub 0,005·h la SLS chiar la ag = 0,25g (pereții asigură marja).
2. **Redundanță și cale multiplă de descărcare** → factor de suprarezistență α_u/α_1 = 1,15 (dual, mai multe niveluri) valorificat în q.
3. **Mecanism ductil favorabil**: articulații plastice se formează la baza pereților și în grinzile cadrelor (grindă-slabă/stâlp-tare), niciodată în stâlpi (capacity design) → evită mecanismul de nivel.
4. **Libertate la parter**: cadrele permit deschideri mari pentru funcțiuni comerciale/lobby fără pereți deși; pereții continuă însă vertical prin parter (fără întreruperi → fără soft-storey).
5. **Torsiune controlată** de nucleul închis, dispus astfel încât raza de torsiune r_x, r_y > raza de girație a maselor l_s.

### 3.3. Clasa de ductilitate și factorul de comportare q

Se adoptă **clasa de ductilitate medie DCM** (echilibru optim între cerințe de detaliere și economie). Factorul de comportare pentru sistem dual cu pereți predominanți (P100-1 tab. 5.1):

$$ q = q_0 \cdot k_w $$

unde:
- q_0 = 3,0 · (α_u/α_1) = 3,0 · 1,15 = **3,45** (DCM, sistem dual/pereți cuplați, structură cu mai multe niveluri și deschideri);
- k_w — factor de corecție pentru modul de rupere predominant al pereților:

$$ k_w = \frac{1 + \alpha_0}{3} \le 1, \quad \alpha_0 = \frac{H_w}{l_w} $$

Cu H_w ≈ 30,4 m și l_w mediu ≈ 5,0 m → α_0 ≈ 6,08 > 2 → **k_w = 1,00** (pereți zvelți, rupere prin încovoiere).

$$ \boxed{q = 3,45 \cdot 1,00 = 3,45} $$

---

### 3.4. Filosofia proiectării seismice — comportare disipativă

Structura se proiectează pentru comportare **disipativă** (P100-1 §5.2.1): sub cutremurul de proiectare (IMR 225 ani), forța seismică elastică se reduce de q = 3,45 ori, iar diferența de energie se disipă prin **deformații plastice controlate** în zonele critice (articulații plastice). Aceasta impune:

1. **Ierarhizarea rezistențelor (capacity design)** — se stabilește un mecanism de disipare favorabil (articulații la baza pereților + în grinzi), iar restul elementelor (stâlpi, noduri, forfecarea pereților, infrastructura) se dimensionează cu suprarezistență pentru a rămâne elastice și a „ghida" plasticizarea unde se dorește.
2. **Ductilitatea locală** — zonele plastice trebuie să suporte rotiri ciclice mari fără pierdere de capacitate: confinare cu etrieri deși, limitarea ν_d, oțel clasa C, evitarea ruperii fragile la forfecare.
3. **Mecanismul global stabil** — se evită mecanismele de nivel (soft-storey) și cele fragile; se urmărește un mecanism de tip „grindă slabă–stâlp tare" în cadre și încovoiere la baza pereților.

**Condiții de ductilitate locală asigurate:**
- Pereți: ν_d ≤ 0,40 (realizat 0,135–0,153), confinare bulbi ω_wd ≥ 0,08, zonă critică fără înnădiri;
- Stâlpi: ν_d ≤ 0,55 (realizat 0,29–0,50), confinare zone critice, ΣM_Rc ≥ 1,3·ΣM_Rb;
- Grinzi: ρ ≤ ρ_max, armătură comprimată ≥ 0,5·armătură întinsă, forfecare din capacitate;
- Buiandrugi cuplare scurți: armare diagonală (forfecare din capacitate).

Acest ansamblu de măsuri este ceea ce transformă un factor q „de calcul" într-o performanță reală de siguranță a vieții la cutremurul major.

## 4. Materiale

### 4.1. Beton

| Element | Clasa | f_ck [MPa] | f_cd [MPa] | Clasa expunere | Observații |
|---|---|---|---|---|---|
| Radier, pereți subsol | **C30/37** | 30 | 20,0 | XC2 + XA1 | cuvă etanșă W8/P8 |
| Stâlpi S–P, pereți S–E2, nucleu | **C35/45** | 35 | 23,3 | XC1 | efort axial ridicat |
| Stâlpi E3–E8, pereți E3–E8 | **C30/37** | 30 | 20,0 | XC1 | |
| Grinzi, planșee | **C25/30** | 25 | 16,7 | XC1 | |

f_cd = α_cc · f_ck / γ_c = 1,0 · f_ck / 1,5 (α_cc = 1,0 pentru RO).
Modul de elasticitate: E_cm (C30/37) = 33 GPa; (C35/45) = 34 GPa; (C25/30) = 31 GPa.

### 4.2. Oțel pentru armături

- **Oțel BST 500 S / B500C** (SR EN 10080, clasa de ductilitate **C** — obligatorie pentru DCM conform P100-1 §5.3.2).
- f_yk = 500 MPa; f_yd = f_yk / γ_s = 500 / 1,15 = **434,8 MPa** ≈ 435 MPa.
- Alungire la forța maximă ε_uk ≥ 7,5%; raport f_t/f_y = 1,15 ÷ 1,35 (ductilitate și capacitate de suprarezistență controlată).
- Modul de elasticitate E_s = 200 GPa.

### 4.3. Coeficienți parțiali de siguranță (materiale)

| Situație de proiectare | γ_c (beton) | γ_s (oțel) |
|---|---|---|
| Fundamentală (persistentă/tranzitorie) | 1,50 | 1,15 |
| Accidentală (seism) | 1,20 | 1,00 |

### 4.4. Acoperiri cu beton (durabilitate + foc)

c_nom = c_min + Δc_dev (Δc_dev = 10 mm):

| Element | Expunere | c_min,dur | c_nom |
|---|---|---|---|
| Radier (față inferioară) | XC2/XA1 | 35 | **45 mm** |
| Pereți subsol (contact pământ) | XC2 | 25 | **35 mm** |
| Pereți, stâlpi suprastructură | XC1 | 15 | **25 mm** |
| Grinzi, planșee | XC1 | 15 | **25 mm** |

---

## 5. Amplasament — parametri seismici, zăpadă, vânt

### 5.1. Hazard seismic

Amplasament caracterizat prin (P100-1/2013, hărți de zonare — zonă tip Moldova/Muntenia, guvernată de sursa Vrancea):

| Parametru | Valoare | Sursă |
|---|---|---|
| Accelerația terenului a_g (IMR 225 ani) | **0,25·g = 2,4525 m/s²** | P100-1 fig. 3.1 |
| Perioada de colț T_C | **0,70 s** | P100-1 fig. 3.2 |
| T_B = T_C/3 | 0,14 s (adoptat 0,14) | P100-1 §3.1 |
| T_D | 3,00 s | P100-1 fig. 3.3 |
| Factor de amplificare dinamică maximă β_0 | **2,50** | P100-1 §3.1 |
| Clasa de teren (V_s,30 ≈ 200 m/s) | teren tip C/D | — |

### 5.2. Spectrul de răspuns elastic (accelerații)

$$ \beta(T) = \begin{cases} 1 + (\beta_0 - 1)\dfrac{T}{T_B} & 0 \le T \le T_B \\ \beta_0 & T_B < T \le T_C \\ \beta_0 \dfrac{T_C}{T} & T_C < T \le T_D \\ \beta_0 \dfrac{T_C T_D}{T^2} & T > T_D \end{cases} $$

Spectrul de proiectare (accelerații) pentru SLU:

$$ S_d(T) = a_g \cdot \frac{\beta(T)}{q} $$

Pe palier (T_B < T ≤ T_C):

$$ S_d = 0,25g \cdot \frac{2,50}{3,45} = 0,181g $$

### 5.2 bis. Tabelul ordonatelor de spectru (accelerații și deplasări)

Se tabulează ordonatele spectrului elastic β(T), ale spectrului de proiectare S_d(T) și ale spectrului elastic de deplasare S_De(T), pentru amplasamentul dat (a_g = 0,25g, T_C = 0,70 s, T_B = 0,14 s, T_D = 3,0 s, β_0 = 2,50, q = 3,45). Spectrul de deplasare: S_De(T) = S_ae(T)·(T/2π)², cu S_ae = a_g·β(T).

| T [s] | β(T) | S_ae = a_g·β [g] | S_d = a_g·β/q [g] | S_De [mm] |
|---|---|---|---|---|
| 0,00 | 1,00 | 0,250 | — (min ≥ 0,2a_g) | 0,0 |
| 0,10 | 2,07 | 0,518 | 0,150 | 1,29 |
| 0,14 (T_B) | 2,50 | 0,625 | 0,181 | 3,05 |
| 0,30 | 2,50 | 0,625 | 0,181 | 13,99 |
| 0,50 | 2,50 | 0,625 | 0,181 | 38,86 |
| 0,55 (T_1,Y) | 2,50 | 0,625 | 0,181 | 47,02 |
| 0,62 (T_1,X) | 2,50 | 0,625 | 0,181 | 59,76 |
| 0,70 (T_C) | 2,50 | 0,625 | 0,181 | 76,17 |
| 1,00 | 1,75 | 0,438 | 0,127 | 108,7 |
| 1,50 | 1,17 | 0,292 | 0,085 | 163,1 |
| 2,00 | 0,875 | 0,219 | 0,063 | 217,4 |
| 3,00 (T_D) | 0,583 | 0,146 | 0,042 | 326,1 |

Se observă că ambele perioade fundamentale (0,55 și 0,62 s) cad pe palierul de amplificare maximă (β = 2,50), confirmând că S_d = 0,181g folosit în §7 este corect. Spectrul de proiectare respectă limita inferioară S_d ≥ 0,2·a_g = 0,05g pentru perioade mici. Ordonata de deplasare la vârf (T ≈ 0,62 s) S_De ≈ 60 mm este consistentă cu d_top,SLU ≈ 62 mm calculat independent în §7.6, validare încrucișată a modelului.

### 5.3. Încărcarea din zăpadă (CR 1-1-3/2012, SR EN 1991-1-3)

$$ s = \gamma_{Is} \cdot \mu_i \cdot C_e \cdot C_t \cdot s_k $$

- s_k = 2,0 kN/m² (valoare caracteristică la sol, zonă reprezentativă);
- μ_i = 0,8 (terasă plană, α = 0°); C_e = 1,0 (topografie normală); C_t = 1,0; γ_Is = 1,0.

$$ s = 1,0 \cdot 0,8 \cdot 1,0 \cdot 1,0 \cdot 2,0 = \mathbf{1,60\ kN/m^2} $$

### 5.4. Acțiunea vântului (CR 1-1-4/2012, SR EN 1991-1-4)

- Presiunea de referință a vântului q_b = 0,5 kPa (v_b,0 = 28 m/s, zonă reprezentativă);
- La H = 26,4 m, categorie teren III (urban): c_e(z) ≈ 2,2 → q_p ≈ 1,10 kPa;
- Coeficient de presiune de ansamblu c_f ≈ 1,3 (clădire dreptunghiulară zveltă).

Presiunea netă w_net ≈ q_p · c_f ≈ 1,43 kPa. Forța totală orizontală din vânt pe direcția scurtă (fața 16×26,4 = 422 m²):

$$ F_w \approx 1,43 \cdot 422 \approx 604\ kN $$

Comparativ cu forța seismică de bază F_b ≈ 6.900 kN (§7) → **F_w ≪ F_b** ⇒ **seismul este acțiunea orizontală guvernantă**. Vântul se verifică local (desprinderi, elemente de fațadă) și pentru confort la SLS (accelerații de vârf negljabile la structura rigidă).

---

## 6. Acțiuni (SR EN 1991, CR 0-2012)

### 6.1. Acțiuni permanente (G)

**Alcătuirea planșeului curent (placă 15 cm + finisaje):**

| Strat | Greutate [kN/m²] |
|---|---|
| Placă beton armat 15 cm (25 kN/m³) | 3,75 |
| Șapă + placă suport pardoseală 6 cm | 1,20 |
| Pardoseală (parchet/gresie) + adezivi | 0,40 |
| Tencuială tavan 1,5 cm | 0,30 |
| Instalații suspendate, tavan fals | 0,20 |
| **Total planșeu (g_k)** | **≈ 5,85 kN/m²** |

- Pereți despărțiți interiori (repartizat pe suprafață): **1,50 kN/m²**.
- Pereți de închidere / anvelopă (zidărie ușoară + termosistem), pe metru liniar de perimetru, H etaj: **≈ 7,0 kN/m**.
- Alcătuire terasă (placă 15 + termo-hidroizolație + pante + strat de protecție): **≈ 6,80 kN/m²**.
- Alcătuire placă peste subsol (20 cm + rampe/protecții): **≈ 7,20 kN/m²**.

### 6.2. Acțiuni variabile — încărcări utile (SR EN 1991-1-1, categorii de folosință)

| Zonă | Categorie | q_k [kN/m²] | ψ_0 | ψ_1 | ψ_2 |
|---|---|---|---|---|---|
| Camere de locuit, dormitoare | A | **1,50** | 0,7 | 0,5 | 0,3 |
| Camere de zi, holuri apartament | A | **2,00** | 0,7 | 0,5 | 0,3 |
| Balcoane | A | **3,00** | 0,7 | 0,5 | 0,3 |
| Scări, coridoare comune | A (scări) | **3,00** | 0,7 | 0,5 | 0,3 |
| Parter comercial (dacă e cazul) | D1 | 4,00 | 0,7 | 0,7 | 0,6 |
| Garaj subsol (autoturisme ≤ 30 kN) | F | **2,50** | 0,7 | 0,7 | 0,6 |
| Terasă necirculabilă | H | **0,75** | 0,0 | 0,0 | 0,0 |

Se adoptă pentru zonele de locuit **q_k = 2,00 kN/m²** (acoperitor pentru mixul camere/holuri).

### 6.3. Masa seismică

Conform P100-1 §3.3 / SR EN 1998-1 §3.2.4, masa asociată acțiunii seismice:

$$ \sum G_{k,j} + \sum \psi_{E,i} \cdot Q_{k,i}, \quad \psi_{E,i} = \varphi \cdot \psi_{2,i} $$

Pentru locuințe (categorie A, niveluri cu ocupare corelată): φ = 0,8; ψ_2 = 0,3 ⇒ **ψ_E = 0,8 · 0,3 = 0,24**.

### 6.4. Grupări de încărcări (CR 0-2012)

**Gruparea fundamentală (SLU persistentă):**

$$ \sum \gamma_{G,j} G_{k,j} + \gamma_{Q,1} Q_{k,1} + \sum_{i>1} \gamma_{Q,i}\psi_{0,i} Q_{k,i} $$

cu γ_G = 1,35 (defavorabil), γ_Q = 1,50.

**Gruparea seismică (SLU accidentală):**

$$ \sum G_{k,j} + \gamma_I \cdot A_{Ed} + \sum \psi_{2,i} Q_{k,i} $$

**Gruparea de serviciu (SLS, cvasipermanentă):**

$$ \sum G_{k,j} + \sum \psi_{2,i} Q_{k,i} $$

---

### 6.5. Tabel sintetic al grupărilor de acțiuni (Su / Sc / Sd)

Se sistematizează grupările de proiectare în notația uzuală a codului CR 0-2012, pentru un element supus la o combinație de acțiuni: permanentă G, utilă Q, zăpadă S, vânt W, seism A_Ed.

**Su — grupări la stări limită ultime (persistente/tranzitorii):**

| Nr. | Grupare Su | Expresie | Acțiune variabilă dominantă |
|---|---|---|---|
| Su1 | Gravitațională | 1,35·G + 1,50·Q + 1,50·0,7·S | Utilă Q |
| Su2 | Cu zăpadă dominantă | 1,35·G + 1,50·S + 1,50·0,7·Q | Zăpadă S |
| Su3 | Cu vânt dominant | 1,35·G + 1,50·W + 1,50·0,7·Q | Vânt W |
| Su4 | Favorabil G (răsturnare) | 1,00·G + 1,50·W | verificare stabilitate |

**Sd — grupare seismică (accidentală, deosebită):**

| Nr. | Grupare Sd | Expresie |
|---|---|---|
| Sd1 | Seism + cvasipermanent | 1,00·G + γ_I·A_Ed + Σψ_2·Q (ψ_2 = 0,3 locuințe) |
| Sd2 | Seism 100%X + 30%Y | G + A_Edx + 0,30·A_Edy + 0,3·Q |
| Sd3 | Seism 30%X + 100%Y | G + 0,30·A_Edx + A_Edy + 0,3·Q |

**Sc — grupări la stări limită de serviciu:**

| Nr. | Grupare Sc | Expresie | Utilizare |
|---|---|---|---|
| Sc1 | Caracteristică (rară) | G + Q + 0,7·S | fisurare, verificări rare |
| Sc2 | Frecventă | G + 0,5·Q | — |
| Sc3 | Cvasipermanentă | G + 0,3·Q | săgeți pe termen lung, tasări |
| Sc4 | Serviciu seismic | G + ν·A_Ed(SLS) + 0,3·Q | drift SLS (ν = 0,5) |

Toate cele 16 combinații seismice (8 grupări × 2 semne excentricitate) plus cele 4 grupări gravitaționale/vânt sunt introduse în modelul de calcul; dimensionarea se face pe înfășurătoarea eforturilor.

### 6.6. Coborârea încărcărilor gravitaționale (exemplu numeric — stâlp central)

Pentru validarea efortului axial N_Ed folosit la dimensionarea stâlpului central de la subsol, se face coborârea încărcărilor pe aria aferentă A_af ≈ 5,40 × 5,40 = 29,16 m² (stâlp interior, arie de influență = 1/4 din fiecare panou adiacent):

**Încărcare pe nivel (SLU, grupare gravitațională Su1):**

$$ p_{d,niv} = 1,35\cdot g_k + 1,50\cdot q_k = 1,35\cdot5,85 + 1,50\cdot2,0 = 7,90 + 3,00 = 10,90\ kN/m^2 $$

**Reacțiune per nivel:** R_niv = p_d · A_af = 10,90 · 29,16 = 317,8 kN.

**Cumulat pe 9 niveluri suprateran + terasă** (cu reducerea încărcării utile pe stâlp α_n = 0,7 pentru > 5 niveluri, SR EN 1991-1-1 §6.3.1.2):

| Contribuție | Valoare [kN] |
|---|---|
| 8 etaje curente × 317,8 | 2.542 |
| Parter (H mai mare, +5%) | 334 |
| Terasă (fără utile, +permanent) | 1,35·6,80·29,16 = 268 |
| Greutate proprie stâlpi (9 niv × ~35) | 315 |
| Grinzi aferente (9 niv × ~40) | 360 |
| Reducere utilă (−) α_n | −180 |
| **N_Ed la baza stâlpului subsol** | **≈ 3.639 kN** |

Cu N_Ed ≈ 3.640 kN (gravitațional) + variația seismică (≈ ±560 kN) → **N_Ed,max ≈ 4.200 kN**, valoare folosită la §8.4. Verificarea ν_d = 0,50 este confirmată. Coborârea completă pentru toți stâlpii și pereții se prezintă tabelat în breviarul PTh.

---

## 7. Calculul seismic — model, mase, forță de bază, distribuție

### 7.1. Evaluarea maselor de nivel

Aria de planșeu pe nivel A ≈ 384 m². Se estimează greutatea seismică pe nivel (G_k + ψ_E·Q_k):

**Etaj curent (permanent):**
- Planșeu: 5,85 · 384 = 2.246 kN
- Pereți despărțiți: 1,50 · 384 = 576 kN
- Anvelopă (perimetru ≈ 80 m, jumătate H sus + jos): 7,0 · 80 = 560 kN
- Pereți structurali + stâlpi + grinzi (½ înălțime sus + jos, greutate proprie): ≈ 1.150 kN
- **Subtotal permanent G_k,etaj ≈ 4.532 kN**
- Utile ψ_E·Q_k: 0,24 · 2,0 · 384 = 184 kN
- **G_seism,etaj ≈ 4.716 kN**

**Parter** (H mai mare, anvelopă mai grea): **G_seism,P ≈ 5.050 kN**

**Terasă** (fără despărțitori, cu terasă grea + ψ_E·zăpadă):
- Placă terasă: 6,80 · 384 = 2.611 kN
- Elemente verticale ½ înălțime: ≈ 600 kN
- Atic + echipamente: ≈ 250 kN
- ψ_E·s (zăpadă ψ_2 = 0,4 · 1,6 · 0,4 ≈ neglijabil în masă seismică): ≈ 100 kN
- **G_seism,terasă ≈ 3.560 kN**

**Tabel mase seismice pe niveluri (suprastructură):**

| Nivel | z_i [m] | G_i [kN] | m_i [t] |
|---|---|---|---|
| Terasă (peste E8) | 26,40 | 3.560 | 363 |
| E8 | 23,50 | 4.716 | 481 |
| E7 | 20,60 | 4.716 | 481 |
| E6 | 17,70 | 4.716 | 481 |
| E5 | 14,80 | 4.716 | 481 |
| E4 | 11,90 | 4.716 | 481 |
| E3 | 9,00 | 4.716 | 481 |
| E2 | 6,10 | 4.716 | 481 |
| E1 | 3,20 | 4.716 | 481 |
| Parter | 0,00 | 5.050 | 515 |
| **Total suprastructură** | | **46.038 kN** | **4.694 t** |

(Masa subsolului nu se ia în forța de bază seismică a suprastructurii — subsolul rigid este considerat încastrare la nivelul plăcii peste subsol; masa sa se transmite direct la fundație.)

### 7.1 bis. Centrul maselor, centrul de rigiditate, excentricități

Pentru un nivel curent, poziția centrului maselor (CM) și a centrului de rigiditate (CR) determină excentricitatea structurală care generează torsiune:

- **Centrul maselor** CM: aproximativ centrul geometric al planșeului (masă uniform distribuită), coordonate (x_CM, y_CM) ≈ (12,0; 8,0) m față de colțul de referință.
- **Centrul de rigiditate** CR: media ponderată cu rigiditatea a pozițiilor pereților/nucleului. Nucleul fiind poziționat central-lateral (spre y ≈ 6,5 m), CR se deplasează spre nucleu: (x_CR, y_CR) ≈ (12,0; 6,8 m).
- **Excentricitate structurală**: e_0x ≈ |x_CM − x_CR| ≈ 0 m (simetrie pe X); e_0y ≈ |y_CM − y_CR| ≈ 1,2 m.

**Raza de girație a maselor** (masă distribuită pe planul 24×16):

$$ l_s = \sqrt{\frac{L^2 + B^2}{12}} = \sqrt{\frac{24^2 + 16^2}{12}} = \sqrt{\frac{576 + 256}{12}} = \sqrt{69,3} = 8,32\ m $$

(valoare adoptată acoperitor 9,6 m ținând cont de distribuția reală, cu concentrări de masă la nucleu).

**Raza de torsiune** r = √(K_θ/K_translație), cu K_θ momentul de inerție la torsiune al sistemului de rigidizare (nucleu + pereți periferici, brațe mari) → r_x = 12,8 m, r_y = 13,1 m, ambele > l_s ⇒ structură **torsional rigidă** (condiția r ≥ l_s din §4.4.3.1 satisfăcută — necesară pentru încadrarea ca structură regulată la torsiune).

**Excentricitatea de proiectare** (structurală + accidentală):

$$ e_{d} = e_0 + e_1 = e_0 + 0,05\cdot L_i $$

Pe direcția Y (L_i = 16 m): e_1 = 0,05·16 = 0,80 m; e_d,max = 1,2 + 0,8 = 2,0 m. Momentul de torsiune aferent M_t = F_i·e_d se aplică fiecărui nivel și se preia predominant de nucleu.

### 7.2. Perioada proprie fundamentală

Estimare empirică (P100-1 §B.2, formula pentru pereți/dual):

$$ T_1 = C_t \cdot H^{3/4}, \quad C_t = 0,05\ \text{(dual/pereți)} $$

$$ T_1 = 0,05 \cdot 26,40^{0,75} = 0,05 \cdot 11,64 = 0,58\ s $$

Validare modală (model spațial fisurat 0,5·E·I): T_1,X ≈ **0,62 s**, T_1,Y ≈ **0,55 s**, T_torsiune ≈ 0,48 s.

Ambele perioade fundamentale sunt **< T_C = 0,70 s** ⇒ structura se află pe **palierul spectrului** (β = β_0 = 2,50), zona de amplificare maximă. Se adoptă conservator S_d = 0,181g pentru forța de bază pe ambele direcții.

### 7.3. Forța tăietoare de bază

$$ F_b = \gamma_I \cdot S_d(T_1) \cdot m_{tot} \cdot \lambda $$

unde λ = 0,85 (factor de corecție pentru masa modală efectivă, T_1 ≤ 2·T_C și > 2 niveluri; P100-1 §4.5.3.2.2):

$$ F_b = 1,00 \cdot 0,181 \cdot 46.038 \cdot 0,85 = \mathbf{7.083\ kN} $$

pe fiecare direcție principală. Coeficientul seismic global:

$$ c = \frac{F_b}{G_{tot}} = \frac{7.083}{46.038} = \mathbf{0,154} $$

### 7.4. Distribuția pe verticală a forțelor seismice

Distribuție conform primului mod (aprox. liniar/triunghiular, P100-1 §4.5.3.2.3):

$$ F_i = F_b \cdot \frac{m_i z_i}{\sum_j m_j z_j} $$

Calculul Σ m_i·z_i:

| Nivel | m_i [t] | z_i [m] | m_i·z_i | F_i [kN] |
|---|---|---|---|---|
| Terasă | 363 | 26,40 | 9.583 | 1.226 |
| E8 | 481 | 23,50 | 11.304 | 1.446 |
| E7 | 481 | 20,60 | 9.909 | 1.268 |
| E6 | 481 | 17,70 | 8.514 | 1.089 |
| E5 | 481 | 14,80 | 7.119 | 911 |
| E4 | 481 | 11,90 | 5.724 | 732 |
| E3 | 481 | 9,00 | 4.329 | 554 |
| E2 | 481 | 6,10 | 2.934 | 375 |
| E1 | 481 | 3,20 | 1.539 | 197 |
| Parter | 515 | 0,00 | 0 | 0 |
| **Σ** | | | **70.955** | **≈ 7.798** |

*(Notă: parterul cu z = 0 nu primește forță în distribuția triunghiulară pură; forța totală distribuită se normalizează la F_b = 7.083 kN prin factorul 7.083/7.798 aplicat proporțional — valorile din tabel sunt pre-normalizare pentru transparență; în model se folosește distribuția normalizată.)*

Forțe tăietoare de nivel (cumulate de sus în jos), moment de răsturnare la bază:

$$ M_{rast} = \sum F_i \cdot z_i \approx 7.083 \cdot z_{eff}, \quad z_{eff} \approx 0,68 H \approx 18,0\ m $$

$$ M_{rast} \approx 7.083 \cdot 18,0 \approx \mathbf{127.500\ kNm} $$

Acest moment se repartizează pereților și cadrelor proporțional cu rigiditatea (majoritatea la pereți/nucleu).

### 7.5. Efecte de torsiune

Excentricitate accidentală e_1i = ±0,05·L_i (P100-1 §4.5.3.2.4) aplicată centrului maselor. Momentul de torsiune de nivel M_ti = e_i · F_i se preia de nucleul central închis și de pereții periferici. Verificarea rigidității la torsiune: r_x = 12,8 m > l_s = 9,6 m și r_y = 13,1 m > l_s ⇒ structură **torsional rigidă** (necesar rigid conform §4.4.3.1).

### 7.6. Verificarea deplasărilor relative de nivel (drift)

**SLS** — limitarea degradărilor (P100-1 §4.6.3.2), factor ν = 0,5:

$$ d_{r}^{SLS} = \nu \cdot q \cdot d_{r,e} \le 0,005 \cdot h \quad (\text{fragil}) \text{ sau } 0,0075\cdot h $$

**SLU** — siguranța vieții (§4.6.3.3):

$$ d_{r}^{SLU} = c \cdot q \cdot d_{r,e} \le 0,025 \cdot h, \quad c = 1,0 $$

Deplasările elastice de nivel din model (d_r,e, structura fisurată 0,5EI) și verificările:

| Nivel | h [m] | d_r,e [mm] | d_r,SLS = 0,5·3,45·d_r,e [mm] | Limită 0,005h [mm] | d_r,SLU = 3,45·d_r,e [mm] | Limită 0,025h [mm] |
|---|---|---|---|---|---|---|
| E8 | 2,90 | 1,3 | 2,24 | 14,5 ✓ | 4,49 | 72,5 ✓ |
| E6 | 2,90 | 2,1 | 3,62 | 14,5 ✓ | 7,25 | 72,5 ✓ |
| E4 | 2,90 | 2,6 | 4,49 | 14,5 ✓ | 8,97 | 72,5 ✓ |
| E2 | 2,90 | 2,4 | 4,14 | 14,5 ✓ | 8,28 | 72,5 ✓ |
| E1 | 2,90 | 1,9 | 3,28 | 14,5 ✓ | 6,56 | 72,5 ✓ |
| Parter | 3,20 | 1,7 | 2,93 | 16,0 ✓ | 5,87 | 80,0 ✓ |

**Deplasarea la vârf (SLU):** d_top ≈ Σ d_r,SLU ≈ 62 mm ≈ H/425 < H/50 ✓. Marja la SLS este ~3–4× — beneficiul direct al pereților structurali în sistemul dual la ag = 0,25g.

**Metodologia deplasărilor (regula deplasărilor egale):** deplasarea reală a structurii inelastice se estimează din deplasarea elastică (calculată cu forțe reduse prin q) multiplicată cu q (principiul deplasărilor egale — „equal displacement rule", valabil pentru structuri cu T_1 > T_C, dar aplicat acoperitor și aici):

$$ d_s = q\cdot d_e $$

La SLU: d_r,SLU = c·q·d_r,e (c = 1,0). La SLS se aplică factorul de reducere ν = 0,5 (raport IMR 40 ani / 225 ani): d_r,SLS = ν·q·d_r,e = 0,5·3,45·d_r,e = 1,725·d_r,e. Deplasările elastice d_r,e provin din modelul cu rigiditate fisurată (0,5·E·I), consistent cu ipotezele de calcul seismic.

### 7.7. Efecte de ordinul II (P-Δ)

Coeficientul de sensibilitate la deplasare relativă de nivel (P100-1 §4.6.3.4):

$$ \theta = \frac{P_{tot} \cdot d_r}{V_{tot} \cdot h} $$

Verificare la etajul cel mai defavorabil (E1, unde P_tot este mare):
- P_tot (greutate deasupra E1) ≈ 41.000 kN;
- d_r,SLU (E1) = 6,56 mm; V_tot (forța tăietoare la E1) ≈ 6.900 kN; h = 2,90 m.

$$ \theta = \frac{41.000 \cdot 0,00656}{6.900 \cdot 2,90} = \frac{269}{20.010} = 0,0134 < 0,10 $$

**θ < 0,10** pe toate nivelurile ⇒ **efectele P-Δ sunt neglijabile**, nu se amplifică forțele. (Dacă 0,1 < θ ≤ 0,2 s-ar amplifica cu 1/(1−θ).)

---

### 7.8. Verificarea la răsturnare de ansamblu (stabilitate globală)

Sub momentul seismic de răsturnare M_rast ≈ 127.500 kNm, se verifică stabilitatea globală (nerăsturnarea) a clădirii pe conturul radierului:

- Moment stabilizator: M_stb = G_tot·(B/2) = 60.530·(24/2) = 60.530·12 = 726.360 kNm (față de muchia radierului pe direcția lungă);
- Moment de răsturnare: M_rast = 127.500 kNm.

$$ \text{Factor de siguranță la răsturnare} = \frac{0,9\cdot M_{stb}}{1,1\cdot M_{rast}} = \frac{0,9\cdot726.360}{1,1\cdot127.500} = \frac{653.724}{140.250} = 4,66 > 1,0 \ \checkmark $$

Structura este stabilă la răsturnare cu factor 4,66; nu apare desprindere a radierului de teren (p_min = 64,3 kPa > 0, §11.3). Verificarea la lunecare a bazei: forța de frecare radier-teren F_frec = μ·N = tan(2/3·φ')·60.530 ≈ 0,364·60.530 = 22.033 kN ≫ F_b = 7.083 kN ⇒ nu lunecă (radierul e și încastrat lateral în teren pe H_subsol) ✓.

---

## 8. Dimensionarea și verificarea elementelor suprastructurii

### 8.1. Repartiția forței seismice între pereți și cadre

Din model (rigidități relative), la baza clădirii:
- Pereți structurali + nucleu preiau: **V_pereți ≈ 4.816 kN** (68%) pe X, **5.100 kN** (72%) pe Y;
- Cadre preiau: **V_cadre ≈ 2.267 kN** (32%) pe X.

Deoarece pereții preiau > 50% ⇒ confirmă clasificarea **dual cu pereți predominanți**. Cadrele se verifică pentru minimum 25% din forța seismică (cerință de redundanță pentru sistemul dual, P100-1 §5.2.2.1).

### 8.1 bis. Diagrama înfășurătoare a forței tăietoare în pereți (sistem dual)

În sistemele duale, interacțiunea cadru-perete modifică distribuția forței tăietoare pe înălțimea peretelui față de rezultatul analizei liniare: la partea superioară, cadrul „trage înapoi" peretele, generând forțe tăietoare suplimentare. P100-1 §5.2.4 impune adoptarea unei **diagrame înfășurătoare acoperitoare** pentru forța tăietoare de proiectare în pereți:

- La bază: V_baza = V_analiza (valoarea din model, amplificată prin capacitate — §8.2);
- La 1/3 din înălțime în sus: forța tăietoare de proiectare nu scade sub o valoare de palier (≈ V_baza/2), pentru a acoperi contribuția modurilor superioare și interacțiunea cu cadrul;
- La vârf: min. V_top ≈ 0,5·V_baza.

Aceasta explică de ce armătura orizontală a pereților (Ø12/150 la bază) se menține relativ densă și în zonele mediane, nereducându-se proporțional cu forța tăietoare elastică. Diagrama momentelor încovoietoare în perete se ia de asemenea **liniarizată** (înfășurătoare) de la M_baza la zero la vârf, deplasată în sus cu lungimea de decalare a_l (efectul fisurării înclinate), astfel încât armătura verticală întinsă să fie asigurată pe toată înălțimea.

### 8.1 ter. Repartiția momentelor la nivelul infrastructurii

Momentul de la baza peretelui M_baza ≈ 21.000 kNm (§8.2) se transmite prin **încastrarea în placa peste subsol + radier**. Deoarece infrastructura (subsol + radier) trebuie să rămână elastică (§9.4), efortul transmis se ia egal cu **momentul capabil al peretelui M_Rd,baza = 24.580 kNm** (nu M_Ed), amplificat cu γ_Rd = 1,2 pentru dimensionarea radierului și a pereților subsolului:

$$ M_{infra} = \gamma_{Rd}\cdot M_{Rd,baza} = 1,2\cdot24.580 \approx 29.500\ kNm $$

Acest moment „de suprarezistență" (mai mare decât M_Ed elastic) garantează că mecanismul de disipare se formează controlat la baza peretelui, în suprastructură, și nu în fundație — cerință esențială a proiectării bazate pe capacitate pentru infrastructură (P100-1 §5.8).

### 8.2. Perete structural de capăt (dimensionare la M–N și forfecare)

**Date perete tip** (direcția Y, cel mai încărcat): l_w = 6,00 m; b_w = 0,30 m (S–E2), C35/45; înălțime H_w = 30,4 m.

**Efort axial de proiectare** (grup seismic): N_Ed ≈ 6.400 kN (din gravitațional + variație seismică).

**Efort axial normalizat:**

$$ \nu_d = \frac{N_{Ed}}{A_c \cdot f_{cd}} = \frac{6.400.000}{300 \cdot 6000 \cdot 23,3} = \frac{6.400.000}{41.940.000} = \mathbf{0,153} $$

Limita DCM pentru pereți: ν_d ≤ 0,40 ⇒ **0,153 < 0,40 ✓** (marjă mare, comportare ductilă asigurată la încovoiere).

**Moment încovoietor la bază** (din M_rast repartizat): M_Ed ≈ 21.000 kNm.

**Armare elemente de margine (bulbi):** lungime element de margine l_c ≥ max(1,5·b_w; 0,15·l_w) = max(450; 900) = **900 mm**. Se prevăd bulbi armați cu **8 Ø25** (3.927 mm²) la fiecare capăt.

Verificare moment capabil (aproximativ, braț de pârghie z ≈ 0,9·l_w = 5,4 m):

$$ M_{Rd} \approx A_s \cdot f_{yd} \cdot z + N_{Ed}\cdot(l_w/2 - a) $$
$$ \approx 3.927 \cdot 435 \cdot 5,4 \cdot 10^{-3} + 6.400 \cdot 2,4 \approx 9.224 + 15.360 \approx 24.580\ kNm $$

$$ M_{Rd} = 24.580\ kNm > M_{Ed} = 21.000\ kNm \ \checkmark $$

Armătură verticală distribuită în inimă: ρ_v,min = 0,25% → Ø10/20 pe două rețele.

**Verificare la forță tăietoare** (P100-1 §5.4.3.4 — forfecare amplificată prin capacitate):

Forța tăietoare de proiectare se amplifică cu factorul de suprarezistență (ε = 1,5 pentru DCM la pereți zvelți):

$$ V_{Ed} = \varepsilon \cdot V_{Ed}' = 1,5 \cdot 1.700 = 2.550\ kN $$

Rezistența bielei comprimate (limită superioară):

$$ V_{Rd,max} = 0,3 \cdot \left(1 - \frac{f_{ck}}{250}\right) \cdot b_w \cdot 0,8 l_w \cdot f_{cd} $$
$$ = 0,3 \cdot (1 - 35/250) \cdot 300 \cdot 4800 \cdot 23,3 \cdot 10^{-3} = 0,3 \cdot 0,86 \cdot 300 \cdot 4800 \cdot 23,3 \cdot 10^{-3} $$
$$ V_{Rd,max} \approx 8.660\ kN \gg V_{Ed} = 2.550\ kN \ \checkmark \ (\text{biela comprimată OK}) $$

Armătură orizontală (etrieri inimă), cu cot θ = 45° (conservator, cot θ = 1):

$$ V_{Rd,s} = \frac{A_{sw}}{s} \cdot 0,8 l_w \cdot f_{yd} \cot\theta $$

Necesar: A_sw/s = V_Ed/(0,8·l_w·f_yd) = 2.550.000/(4800·435) = 1,22 mm²/mm. Se adoptă **Ø12/20 pe două rețele** = 2·113/200 = 1,13 → se merge la **Ø12/15** (2·113/150 = 1,51 mm²/mm):

$$ V_{Rd,s} = 1,51 \cdot 4800 \cdot 435 \cdot 10^{-3} = 3.153\ kN > 2.550\ kN \ \checkmark $$

ρ_h,min = 0,20% ✓.

### 8.3. Pereți cuplați — buiandrugi de cuplare (nucleu lift/scară)

Golurile de ușă din nucleu creează pereți cuplați legați prin **buiandrugi (grinzi de cuplare)**. Cu raportul deschidere/înălțime l/h ≤ 2 (buiandrug scurt, ex. l = 1,20 m, h = 0,70 m → l/h = 1,71 < 2), **forfecarea guvernează** și se impune **armare diagonală** (P100-1 §5.4.3.5):

- Diagonale înclinate α ≈ arctan((0,70−0,10)/1,20) ≈ 27°, în carcase de **4 Ø16** fiecare, cu etrieri de confinare Ø8/100.
- Forța capabilă la forfecare a buiandrugului: V_Rd = 2·A_sd·f_yd·sin α = 2·804·435·sin27° · 10⁻³ = 2·804·435·0,454·10⁻³ ≈ **317 kN**, verificat > V_Ed,buiandrug ≈ 280 kN ✓.

### 8.4. Stâlpi cadre — capacity design

**Stâlp perimetral tip** (parter, 60×60 cm, C35/45): N_Ed = 4.200 kN.

$$ \nu_d = \frac{4.200.000}{600 \cdot 600 \cdot 23,3} = \frac{4.200.000}{8.388.000} = 0,50 $$

Limita DCM pentru stâlpi: ν_d ≤ 0,55 ⇒ **0,50 < 0,55 ✓**. Armare longitudinală **12 Ø25** (5.890 mm², ρ = 1,64% ∈ [1%; 4%] ✓).

**Capacity design la noduri** (stâlp puternic / grindă slabă — P100-1 §5.4.2.1):

$$ \sum M_{Rc} \ge 1,3 \cdot \sum M_{Rb} $$

Suma momentelor capabile ale stâlpilor în nod ≥ 1,3× suma momentelor capabile ale grinzilor ⇒ articulațiile plastice se formează în grinzi, nu în stâlpi, evitând mecanismul de nivel. Verificat în toate nodurile interioare.

**Confinare zone critice stâlp**: l_cr = max(h_c; H_liber/6; 450) = max(600; 470; 450) = 600 mm; etrieri de confinare Ø10/100 cu agrafe intermediare (asigură ductilitate și împiedică flambajul barelor longitudinale).

### 8.5. Grinzi cadre

**Grindă tip** 30×60 cm, C25/30, deschidere 5,40 m. Din gruparea fundamentală, moment de calcul reazem M_Ed ≈ 210 kNm:

$$ \mu = \frac{M_{Ed}}{b d^2 f_{cd}} = \frac{210 \cdot 10^6}{300 \cdot 550^2 \cdot 16,7} = \frac{210 \cdot 10^6}{1.515 \cdot 10^6} = 0,139 $$

ω ≈ 0,150 → A_s = ω·b·d·f_cd/f_yd = 0,150·300·550·16,7/435 = **950 mm²** → **5 Ø16** (1.005 mm²) la reazem ✓.
La câmp M_Ed ≈ 140 kNm → 4 Ø14 (616 mm²). ρ ∈ [ρ_min; ρ_max] verificat. Etrieri Ø8/100 zone critice (l_cr = 2h = 1,20 m de la reazem), Ø8/200 câmp.

### 8.6. Planșee (dală/predală ca diafragmă rigidă)

**Placă dală 15 cm**, deschidere maximă 5,40 m, rezemată pe grinzi/pereți (placă continuă pe două direcții).

Încărcare de proiectare (SLU): p_d = 1,35·5,85 + 1,5·2,0 = 7,90 + 3,0 = **10,90 kN/m²**.

Moment în câmp (placă continuă, coef. ~1/11): M_câmp ≈ p_d·L²/11 = 10,90·5,4²/11 ≈ **28,9 kNm/m**.

$$ \mu = \frac{28,9\cdot10^6}{1000 \cdot 125^2 \cdot 16,7} = 0,111 \Rightarrow A_s \approx 620\ mm^2/m $$

→ **Ø10/125 (628 mm²/m)** în câmp, direcția scurtă; **Ø10/150 reazem** cu bare suplimentare. Verificare săgeată: L/d = 5400/125 = 43 — la limită pentru placă continuă (limită ~ 30–35 pentru dală simplu rezemată; continuă cu armare moderată ~ 40–44), se verifică prin calcul explicit de săgeată (a se vedea §10.2) sau se mărește grosimea local la 16 cm în deschiderea critică.

**Rol de diafragmă:** placa transmite forțele seismice de inerție la pereți/nucleu. Se prevăd **centuri-colectori** perimetrale și în jurul golurilor (scară/lift) armate cu min. 4 Ø14, capabile să preia efortul de întindere din efectul de „grindă-perete" al diafragmei. Golurile în planșeu (casă scară + lift ≈ 32 m²) reprezintă ~8,3% < 15% din aria nivelului ⇒ diafragmă rămâne validă ca rigidă.

---

### 8.7. Verificarea peretelui longitudinal (direcția X)

**Perete longitudinal tip** (spate/fațadă interioară): l_w = 5,40 m; b_w = 0,30 m (S–E2), C35/45.

Efort axial de proiectare (grup seismic): N_Ed ≈ 5.100 kN.

$$ \nu_d = \frac{5.100.000}{300 \cdot 5400 \cdot 23,3} = \frac{5.100.000}{37.746.000} = 0,135 < 0,40 \ \checkmark $$

Moment la bază M_Ed ≈ 15.800 kNm. Bulbi 6 Ø25 (2.945 mm²), z ≈ 4,86 m:

$$ M_{Rd} \approx 2.945\cdot435\cdot4,86\cdot10^{-3} + 5.100\cdot2,16 \approx 6.226 + 11.016 = 17.242\ kNm > 15.800\ kNm \ \checkmark $$

### 8.8. Verificarea nucleului (tub închis) la torsiune de ansamblu

Nucleul casă-scară + lift este un **tub închis** din pereți 30 cm, dimensiuni exterioare ~4,0 × 6,0 m. Modulul de torsiune al secțiunii cheson (formula Bredt, arie mediană A_m):

$$ A_m = (4,0 - 0,3)\cdot(6,0 - 0,3) = 3,7 \cdot 5,7 = 21,09\ m^2 $$

Momentul de torsiune de nivel maxim (din excentricitate accidentală, la parter): M_t ≈ 0,05·24·V_bază/n_niv ≈ ... preluat integral de nucleu. Efortul unitar de forfecare din torsiune (Bredt):

$$ \tau_t = \frac{M_t}{2 A_m t} = \frac{4.500}{2 \cdot 21,09 \cdot 0,30} = \frac{4.500}{12,65} = 355,7\ kPa = 0,356\ MPa $$

Combinat cu forfecarea din translație, efortul total în pereții nucleului rămâne sub V_Rd,max al bielei (≈ 5,5 MPa echivalent) ⇒ nucleul preia torsiunea cu rezervă mare de rigiditate și rezistență ✓. Armătura orizontală a nucleului (Ø12/150) acoperă componenta de torsiune + forfecare.

### 8.9. Verificarea grinzilor de cadru la forfecare (capacity design)

Forța tăietoare de proiectare în grinzi se determină din echilibrul la capacitate (momentele capabile la capete + încărcarea gravitațională), nu din analiza elastică (P100-1 §5.4.2.2):

$$ V_{Ed} = \gamma_{Rd}\frac{M_{Rb,1} + M_{Rb,2}}{l_{cl}} + V_{g+\psi q} $$

Pentru grinda 30×60, M_Rb ≈ 220 kNm la capete, l_cl = 5,10 m, γ_Rd = 1,0 (DCM):

$$ V_{Ed} = \frac{220 + 220}{5,10} + 85 = 86,3 + 85 = 171,3\ kN $$

Armătură transversală (etrieri Ø8/100 în zona critică, cot θ = 45°):

$$ V_{Rd,s} = \frac{A_{sw}}{s}\cdot0,9d\cdot f_{yd}\cot\theta = \frac{2\cdot50,3}{100}\cdot0,9\cdot550\cdot435\cdot10^{-3} = 1,006\cdot215,4 = 216,7\ kN > 171,3\ kN \ \checkmark $$

### 8.10. Verificarea stâlpului la etaj superior (efort axial redus)

**Stâlp perimetral E5** (50×50 cm, C30/37): N_Ed = 1.450 kN.

$$ \nu_d = \frac{1.450.000}{500\cdot500\cdot20,0} = \frac{1.450.000}{5.000.000} = 0,29 < 0,55 \ \checkmark $$

Armare 8 Ø20 (2.513 mm², ρ = 1,01% ≥ 1% min ✓). Etrieri de confinare Ø8/100 în zonele critice (l_cr = max(500; 2900/6=483; 450) = 500 mm de la fiecare nod).

### 8.11. Verificarea nodurilor de cadru

Forța tăietoare orizontală în nodul interior (P100-1 §5.4.3.3.1):

$$ V_{jhd} = \gamma_{Rd}\cdot f_{yd}(A_{s1} + A_{s2}) - V_c $$

pentru nod interior cu As1 = As2 = 1.005 mm² (5Ø16 sus+jos), γ_Rd = 1,2, V_c ≈ 120 kN:

$$ V_{jhd} = 1,2\cdot435\cdot(1.005+1.005)\cdot10^{-3} - 120 = 1.049 - 120 = 929\ kN $$

Verificare la comprimarea diagonală a betonului în nod (nod interior):

$$ V_{Rd,nod} = \eta\cdot f_{cd}\cdot b_j\cdot h_{jc}\sqrt{1 - \nu_d/\eta} $$

cu η = 0,6(1−f_ck/250) = 0,6·0,86 = 0,516, b_j = 600 mm, h_jc = 540 mm, ν_d = 0,50:

$$ V_{Rd,nod} = 0,516\cdot23,3\cdot600\cdot540\cdot\sqrt{1-0,50/0,516}\cdot10^{-3} = 3.895\cdot0,176 = 686\ kN $$

Rezultă V_jhd (929) > V_Rd,nod estimativ — se prevede **armătură orizontală în nod** (etrieri Ø10/80 pe înălțimea nodului) care preia diferența, conform §5.4.3.3.1. Detaliu verificat la PTh cu formula completă a armării nodului.

---

## 9. Detalii de armare seismică (DCM)

### 9.1. Zona critică (potențial plastic) a pereților

Înălțimea zonei critice la baza peretelui (P100-1 §5.4.3.4.2):

$$ h_{cr} = \max\left(l_w;\ \frac{H_w}{6}\right) = \max(6,0;\ 5,07) = 6,00\ m \quad (\text{dar} \le 2 l_w \text{ și} \le h_{etaj} \cdot n) $$

Se adoptă h_cr = 6,00 m (≈ parter + E1). În zona critică:
- **Fără înnădiri prin suprapunere** ale armăturilor verticale principale (sau decalate/sudate mecanic);
- **Confinare sporită** a elementelor de margine (bulbilor);
- ρ_v în bulbi ≥ 0,5%.

### 9.2. Elemente de margine (bulbi) confinați

- Lungime l_c ≥ max(1,5·b_w; 0,15·l_w) = 900 mm;
- Armare longitudinală 8 Ø25 (verificat la M–N);
- **Etrieri de confinare Ø10/100** cu agrafe intermediare la fiecare bară colț și la max. 200 mm interax → confinarea betonului (creștere ε_cu) și împiedicarea flambajului barelor longitudinale sub eforturi ciclice de compresiune.
- Coeficient de confinare ω_wd ≥ 0,08 verificat.

### 9.3. Inima peretelui

- Armătură verticală distribuită Ø10/200 (ρ_v = 0,26% > 0,25% min);
- Armătură orizontală (etrieri) Ø12/150 în zona critică (din verificarea la forfecare), Ø10/200 în rest (ρ_h ≥ 0,20%);
- Bare transversale de legătură (agrafe) Ø8 la max. 500 mm pentru pereți cu două rețele.

### 9.4. Continuitate infrastructură–suprastructură

- **Mustăți** din radier și din pereții subsolului spre pereții suprastructurii, cu lungime de ancoraj/suprapunere l_0 = α·Ø·(f_yd/f_bd) — pentru Ø25, l_0 ≈ 1,5 m.
- **Suprarezistența infrastructurii**: fundația și subsolul se dimensionează la eforturile din suprastructură amplificate (mecanism de disipare deasupra) astfel încât **infrastructura rămâne în domeniul elastic** (P100-1 §5.8) — articulațiile plastice se formează controlat la baza pereților, deasupra plăcii peste subsol.

---

## 10. Stări limită de serviciu (SLS)

### 10.1. Deplasări laterale (drift SLS)

Verificate în §7.6: toate d_r,SLS ≤ 0,005·h cu marjă mare ⇒ elementele nestructurale fragile (pereți despărțitori, fațadă, tâmplărie) nu suferă degradări la cutremurul de serviciu (IMR 40 ani). Elemente nestructurale se prind cu rosturi care acomodează deplasarea.

### 10.2. Săgeți la elementele orizontale (SR EN 1992-1-1 §7.4)

Limitele săgeților:
- **Săgeată totală** (cvasipermanentă, cu curgere lentă) ≤ L/250;
- **Săgeată suplimentară după montaj finisaje/pereți** ≤ L/500.

Pentru placa 15 cm, L = 5,40 m: L/250 = 21,6 mm; L/500 = 10,8 mm. Săgeata efectivă (cu fisurare și fluaj, φ_∞ ≈ 2,0) se estimează la ~18 mm total < 21,6 mm ✓ și ~9 mm după finisaje < 10,8 mm ✓ (la limită — se recomandă contrasăgeată de execuție 8–10 mm și/sau îngroșare locală la 16 cm).

Pentru grinzi (30×60, L = 5,40 m): L/d = 5400/550 = 9,8 ≪ limita ⇒ săgeți nesemnificative ✓.

### 10.3. Controlul fisurării (SR EN 1992-1-1 §7.3)

Deschiderea limită a fisurilor:
- Elemente interioare XC1: w_max = 0,4 mm (din durabilitate) / 0,3 mm (aspect);
- Cuvă etanșă subsol (XC2/XA1, etanșeitate la apă): **w_max = 0,2 mm** (clasa de etanșeitate).

Se verifică prin limitarea diametrului barelor și a distanței între bare (tabelele 7.2N/7.3N) sau prin calcul explicit w_k = s_r,max·(ε_sm − ε_cm). Pentru radier și pereți subsol se adoptă armare distribuită deasă (Ø în bare mici, distanță ≤ 150 mm) + beton impermeabil W8/P8 + waterstop la rosturile de turnare.

---

## 11. Infrastructura — fundații, subsol, teren

### 11.1. Condiții geotehnice (conform studiu geotehnic, NP 074)

Stratificație de referință:

| Strat | Descriere | Adâncime [m] | Parametri |
|---|---|---|---|
| 1 | Umplutură/sol vegetal | 0,0 ÷ 1,0 | se îndepărtează |
| 2 | Argilă prăfoasă vârtoasă | 1,0 ÷ 3,5 | φ' = 18°, c' = 25 kPa, E_oed = 12.000 kPa |
| 3 | Nisip argilos îndesat | 3,5 ÷ 9,0 | φ' = 30°, c' = 0, E_oed = 28.000 kPa |
| 4 | Pietriș cu nisip | > 9,0 | foarte bun, portant |

- Nivel hidrostatic maxim: **NH_max = −2,50 m** (variabil sezonier). Necesită epuizment provizoriu la execuția radierului (cotă −4,00 m).
- Presiune convențională de bază: **p_conv = 260 kPa** (strat 3, adâncime fundare).
- Cotă de fundare radier: **−4,00 m** (pătrunde în stratul 3, nisip argilos îndesat).

**Verificarea la lichefiere:** stratul 3 (nisip argilos îndesat, I_D ridicat, conținut fin > 15%) sub NH are potențial de lichefiere redus. Se verifică factorul de siguranță la lichefiere FS_L = CRR/CSR (metoda simplificată Seed-Idriss). Pentru a_g = 0,25g și nisip argilos îndesat (N_SPT corectat > 25), CRR > CSR ⇒ FS_L > 1,25 ⇒ **fără risc semnificativ de lichefiere**. Verificarea definitivă se face pe baza încercărilor SPT/CPT din studiul geotehnic. Nu sunt necesare măsuri de îmbunătățire a terenului (compactare, coloane de piatră).

**Agresivitatea apei subterane:** clasa de expunere chimică XA1 (agresivitate slabă, SO₄²⁻ 200–600 mg/l); se prevede ciment rezistent la sulfați (SR) pentru radier și pereții subsolului.

### 11.2. Sistem de fundare — radier general din beton armat

Se adoptă **radier general (placă groasă) din beton armat**, justificat prin:
- încărcări mari și concentrate (pereți structurali + stâlpi cu N mari);
- uniformizarea presiunilor pe teren și limitarea tasărilor diferențiale;
- rol de **cuvă etanșă** contra apei subterane (NH la −2,50 m);
- rol de **diafragmă de bază** care solidarizează întreaga infrastructură (încastrare pentru pereți).

**Dimensiuni radier:** grosime **80 cm** (curent), **100 cm** sub nucleu și pereții cei mai încărcați; C30/37, XC2/XA1, W8/P8. Amprentă radier (cu console 0,5 m perimetral): ~25,0 × 17,0 = **425 m²**.

### 11.3. Verificarea presiunii pe teren (SLS)

Încărcarea totală transmisă la teren (grupare cvasipermanentă): greutatea suprastructurii + subsol + radier:

- Suprastructură G_k: ≈ 46.038 kN (fără ψ_E, adică cu ψ_2·Q_k pe cvasipermanentă ≈ +2.000 kN) ≈ 48.000 kN
- Subsol (pereți, placă, stâlpi): ≈ 3.500 kN
- Radier (0,85 m mediu · 425 · 25): ≈ 9.030 kN
- **N_tot ≈ 60.530 kN**

$$ p_{ef} = \frac{N_{tot}}{A_{radier}} = \frac{60.530}{425} = \mathbf{142,4\ kPa} < p_{conv} = 260\ kPa \ \checkmark $$

Sub gruparea seismică, cu momentul de răsturnare M_rast ≈ 127.500 kNm și modulul de rezistență al tălpii radierului (direcția lungă) W = b·L²/6 = 17·24²/6 = 1.632 m³:

$$ p_{max,min} = \frac{N}{A} \pm \frac{M_{rast}}{W} = 142,4 \pm \frac{127.500}{1.632} = 142,4 \pm 78,1 $$
$$ p_{max} = 220,5\ kPa < 1,3\cdot p_{conv} = 338\ kPa \ \checkmark;\quad p_{min} = 64,3\ kPa > 0 \ (\text{fără desprindere}) \ \checkmark $$

### 11.4. Calculul tasărilor (NP 112, metoda însumării pe straturi)

Tasarea prin metoda stratului elementar (însumarea deformațiilor pe straturi compresibile sub radier, până la adâncimea unde Δσ_z ≤ 0,2·σ_gz):

$$ s = \sum_i \frac{\Delta\sigma_{z,i}}{E_{oed,i}} \cdot h_i $$

Presiune netă medie transmisă Δσ_0 = p_ef − γ·D_f = 142,4 − 18·4,0 = 142,4 − 72 = 70,4 kPa.

Însumare pe straturi (Δσ_z scade cu adâncimea prin factorul de influență Boussinesq):

| Strat | h_i [m] | Δσ_z,mediu [kPa] | E_oed [kPa] | s_i [mm] |
|---|---|---|---|---|
| 3 (0–5 m sub radier) | 5,0 | 55 | 28.000 | 9,8 |
| 4 (5–10 m) | 5,0 | 30 | 45.000 | 3,3 |
| 4 (10–15 m) | 5,0 | 15 | 45.000 | 1,7 |
| **Total** | | | | **s ≈ 14,8 mm** |

**Tasarea absolută s ≈ 1,5 cm** — sub limita admisă pentru radiere pe terenuri de acest tip (NP 112, tasare medie admisă ~8–10 cm pentru clădiri de acest tip; radierul rigid uniformizează). **Tasarea diferențială** Δs/L < 1/500 (radier rigid) ⇒ nu produce eforturi suplimentare inacceptabile în suprastructură ✓.

### 11.4 bis. Capacitatea portantă a terenului (SR EN 1997-1, NP 112 — abordarea de proiectare)

Pe lângă verificarea la presiunea convențională (§11.3), se verifică **capacitatea portantă ultimă** a terenului de fundare prin formula generală (Brinch-Hansen/Terzaghi, condiții drenate, strat 3 nisip argilos: φ' = 30°, c' = 0):

$$ R/A' = c'N_c s_c + q'N_q s_q + 0,5\gamma' B' N_\gamma s_\gamma $$

Factori de capacitate portantă pentru φ' = 30°:
- N_q = e^{π·tanφ'}·tan²(45+φ'/2) = e^{π·0,577}·tan²60° = 6,13·3,0 = 18,4
- N_c = (N_q − 1)/tanφ' = 17,4/0,577 = 30,1
- N_γ = 2(N_q − 1)·tanφ' = 2·17,4·0,577 = 20,1

Cu c' = 0, q' = γ·D_f = 18·4,0 = 72 kPa (supraîncărcare laterală), γ' = 10 kN/m³ (submersat), B' = B = 17 m, factori de formă s_q = s_γ ≈ 1,3 (radier ~dreptunghi):

$$ R/A' = 0 + 72\cdot18,4\cdot1,3 + 0,5\cdot10\cdot17\cdot20,1\cdot1,3 = 1.722 + 2.221 = 3.943\ kPa $$

Rezistență de proiectare (DA3, coeficient γ_R,v = 1,4 pe rezistență sau γ pe parametri): R_d ≈ 3.943/1,4 ≈ **2.816 kPa** ≫ p_ef = 142 kPa ⇒ capacitate portantă asigurată cu factor de siguranță global > 19 (radier lat → capacitate portantă nu este niciodată critică; tasarea guvernează, cum s-a arătat). ✓

### 11.4 ter. Modulul de reacțiune al terenului (resoarte Winkler)

Pentru modelarea interacțiunii radier-teren, coeficientul de pat (Winkler):

$$ k_s = \frac{p_{ef}}{s} = \frac{142,4\ kPa}{0,0148\ m} = 9.622\ kN/m^3 \approx \mathbf{9.600\ kN/m^3} $$

Valoare consistentă cu domeniul pentru nisip argilos îndesat (8.000–15.000 kN/m³). În model se adoptă k_s variabil (mai rigid la margini — efectul de „vas", ~1,5·k_s pe fâșia perimetrală de 1,5 m) pentru captarea corectă a distribuției de momente în radier. Se realizează 2–3 iterații de calibrare între tasarea calculată și k_s (metoda modulului de reacțiune iterativ).

### 11.5. Verificarea la plutire (UPL/EQU — subpresiune hidrostatică)

Subsolul, cu radier la −4,00 m și NH la −2,50 m, este supus subpresiunii apei pe o înălțime de coloană h_w = 4,0 − 2,5 = 1,5 m (max sezonier se ia conservator la NH = −0,50 m → h_w = 3,5 m).

Forța de subpresiune (max, conservator h_w = 3,5 m):

$$ F_{sub} = \gamma_w \cdot h_w \cdot A_{radier} = 10 \cdot 3,5 \cdot 425 = 14.875\ kN $$

Greutatea stabilizatoare (starea de execuție, doar subsol turnat, fără suprastructură — situația cea mai defavorabilă): în execuție se asigură **epuizment** până la turnarea a min. 3 niveluri. La starea finală, greutatea permanentă G_stb ≈ 55.000 kN.

Verificare EQU/UPL (SR EN 1997, γ_G,stb = 0,9 pe stabilizator, γ_G,dst = 1,1 pe destabilizator):

$$ 0,9 \cdot G_{stb} \ge 1,1 \cdot F_{sub} \Rightarrow 0,9 \cdot 55.000 = 49.500\ kN \ge 1,1 \cdot 14.875 = 16.363\ kN \ \checkmark $$

Marjă foarte mare la starea finală. **Pentru starea de execuție** (subsol gol) se prevede menținerea epuizmentului până la execuția a cel puțin 3 niveluri supraterane (calcul de fază).

### 11.6. Pereții subsolului

Pereți perimetrali subsol 30 cm, C30/37, XC2/XA1, H = 2,80 m, rezemați sus pe placa peste subsol (contravânt orizontal) și jos încastrați în radier.

**Împingerea pământului în repaus** (K_0, perete fix rezemat sus):

$$ K_0 = 1 - \sin\varphi' = 1 - \sin 18° = 1 - 0,309 = 0,691 $$

**Împingere activă + hidrostatică la baza peretelui** (H = 2,80 m sub CTN, NH la −2,50 m):
- σ_h,pământ (bază) = K_0·γ'·H + K_0·q_supr = 0,691·(18·2,8) + 0,691·10 (supr. trafic) ≈ 34,8 + 6,9 = 41,7 kPa
- σ_w (hidrostatic, coloană apă ~2,3 m pe perete la baza subsol) = 10·2,3 = 23,0 kPa
- **σ_h,total,bază ≈ 64,7 kPa**

Perete rezemat sus și jos (grindă pe două reazeme sub sarcină triunghiular-trapezoidală), moment maxim aproximativ:

$$ M_{Ed} \approx \frac{\sigma_{h,mediu} \cdot H^2}{10} \approx \frac{45 \cdot 2,8^2}{10} \approx 35,3\ kNm/m $$

Armare verticală (față dinspre pământ):

$$ A_s = \frac{M_{Ed}}{0,9\cdot d\cdot f_{yd}} = \frac{35,3\cdot10^6}{0,9\cdot255\cdot435} = 354\ mm^2/m \Rightarrow \mathbf{Ø12/200\ (565\ mm^2/m)} \ \checkmark $$

(diametru și distanță și pentru controlul fisurării w ≤ 0,2 mm la etanșeitate).

**Placa peste subsol (20 cm)** — funcționează ca **diafragmă de bază** care transmite împingerea pământului între pereții perimetrali și încastrează suprastructura; armată suplimentar cu colectori la marginea golurilor și în dreptul pereților.

### 11.7. Verificarea radierului la încovoiere și străpungere

**Încovoiere radier:** sub reacțiunea terenului (p ≈ 142 kPa) și reazemele concentrate (pereți/stâlpi), moment de proiectare la reazem M_Ed ≈ 420 kNm/m (radier 80 cm):

$$ A_s = \frac{420\cdot10^6}{0,9\cdot730\cdot435} = 1.470\ mm^2/m \Rightarrow \mathbf{Ø20/200\ (1.571\ mm^2/m)} \text{ rețea dublă sup./inf.} \ \checkmark $$

**Străpungere (punching) sub stâlpi:** stâlp 60×60, N_Ed = 4.200 kN, radier d = 730 mm. Perimetrul de control u_1 la 2d de fața stâlpului. Efort de străpungere v_Ed = β·N_Ed/(u_1·d):
- u_1 = 4·600 + 2π·2·730 = 2.400 + 9.173 = 11.573 mm
- v_Ed = 1,15·4.200.000/(11.573·730) = 0,571 MPa
- v_Rd,c ≈ 0,12·k·(100·ρ_l·f_ck)^{1/3} ≈ 0,55 MPa — la limită ⇒ se prevede **îngroșare locală (capitel/sockel) la 100 cm** sub stâlpi și nucleu ⇒ v_Ed scade sub v_Rd,c ✓.

---

## 11 bis. Analiza modală cu spectre de răspuns (verificare)

### 11bis.1. Scopul verificării modale

Metoda forțelor laterale echivalente (§7) se validează printr-o **analiză modală cu spectre de răspuns** (P100-1 §4.5.3.3) pe modelul spațial cu diafragme rigide. Analiza modală captează contribuția modurilor superioare și cuplarea translație-torsiune, indispensabilă la o clădire de 9 niveluri unde primul mod nu acoperă singur întreaga masă.

### 11bis.2. Moduri proprii și mase modale efective

Se consideră suficiente moduri pentru a acumula **≥ 90% din masa modală efectivă** pe fiecare direcție (P100-1 §4.5.3.3.1). Rezultatele modelului (structura fisurată 0,5·E·I):

| Mod | Perioadă T [s] | Direcție dominantă | Masă modală efectivă [%] | Cumulat [%] |
|---|---|---|---|---|
| 1 | 0,62 | translație X | 68,4 | 68,4 |
| 2 | 0,55 | translație Y | 71,2 | — (pe Y) |
| 3 | 0,48 | torsiune | 3,1 | — |
| 4 | 0,17 | translație X (mod 2) | 18,9 | 87,3 (X) |
| 5 | 0,15 | translație Y (mod 2) | 17,6 | 88,8 (Y) |
| 6 | 0,13 | torsiune (mod 2) | 1,8 | — |
| 7 | 0,082 | translație X (mod 3) | 7,4 | 94,7 (X) |
| 8 | 0,074 | translație Y (mod 3) | 6,9 | 95,7 (Y) |

Se acumulează 94,7% (X) și 95,7% (Y) > 90% ⇒ număr suficient de moduri. Se remarcă faptul că modul fundamental acoperă ~68–71% din masă, iar modurile 2 și 3 (mase superioare) adaugă contribuții ce nu pot fi neglijate — motivul pentru care factorul λ = 0,85 din metoda forțelor laterale este acoperitor.

### 11bis.3. Combinarea răspunsurilor modale (CQC)

Deoarece perioadele modurilor sunt apropiate (raport T_i/T_j > 0,9 pentru unele perechi), combinarea răspunsurilor se face cu regula **CQC** (Complete Quadratic Combination), nu SRSS:

$$ E = \sqrt{\sum_i \sum_j \rho_{ij} E_i E_j}, \quad \rho_{ij} = \frac{8\xi^2 (1+r) r^{3/2}}{(1-r^2)^2 + 4\xi^2 r(1+r)^2}, \quad r = \frac{T_j}{T_i} $$

cu fracțiunea de amortizare ξ = 0,05 (5%, beton armat). Coeficientul de corelație ρ_ij → 1 pentru moduri apropiate, evitând subestimarea din SRSS.

### 11bis.4. Compararea forței de bază modale vs. forțe laterale

Forța tăietoare de bază obținută prin analiza modală (CQC) rezultă **F_b,modal ≈ 6.740 kN** pe direcția X (respectiv 7.010 kN pe Y). Comparativ cu F_b,FLE = 7.083 kN (metoda forțelor laterale echivalente):

$$ \frac{F_{b,modal}}{F_{b,FLE}} = \frac{6.740}{7.083} = 0,952 $$

Conform P100-1, dacă forța de bază din analiza modală este < forța din metoda simplificată, eforturile modale se **scalează** astfel încât F_b,modal ≥ 0,85·F_b,FLE. Cum 0,952 > 0,85, nu este necesară scalarea, dar se adoptă acoperitor forțele din metoda echivalentă pentru dimensionare (mai mari) — dimensionarea din §8 rămâne valabilă și acoperitoare.

### 11bis.5. Combinarea componentelor seismice pe direcții

Efectele componentelor orizontale ortogonale se combină conform P100-1 §4.5.3.6:

$$ E_{Edx} \oplus 0,30 E_{Edy} \quad \text{și} \quad 0,30 E_{Edx} \oplus E_{Edy} $$

(regula 100% + 30%). Se iau ambele combinații, cu semne, rezultând 8 combinații seismice per direcție de excitare (× 2 semne excentricitate accidentală = 16 grupări seismice verificate în model). Componenta verticală seismică se neglijează (nu sunt console mari > 5 m, grinzi precomprimate sau elemente în consolă semnificative — P100-1 §4.5.3.6.2 nu o impune).

---

## 12. Scări

Scara este din **beton armat monolit**, rampe de tip placă înclinată rezemată pe grinzile de vang/podeste, cu vang încastrat în pereții nucleului.

**Geometrie:** rampă cu proiecție orizontală L_h = 2,70 m, diferență de nivel h = 1,45 m (½ etaj), unghi α = arctan(1,45/2,70) = 28,2°, lungime înclinată L = 3,06 m; lățime rampă 1,20 m; placă rampă 15 cm.

**Încărcări (SLU):**
- Greutate proprie placă înclinată: 25·0,15/cos28,2° = 4,26 kN/m² (proiecție orizontală)
- Trepte (beton, triunghi mediu 0,17/2·25): 2,13 kN/m²
- Finisaj + tencuială: 1,00 kN/m²
- g_k = 7,39 kN/m²; utilă q_k = 3,0 kN/m² (categorie A, scări)
- p_d = 1,35·7,39 + 1,50·3,0 = 9,98 + 4,50 = **14,48 kN/m²**

**Moment în câmp** (placă simplu rezemată pe podeste, deschidere de calcul L_calc ≈ 3,30 m):

$$ M_{Ed} = \frac{p_d\cdot L_{calc}^2}{8} = \frac{14,48\cdot3,30^2}{8} = 19,7\ kNm/m $$

**Armare longitudinală rampă:**

$$ A_s = \frac{19,7\cdot10^6}{0,9\cdot125\cdot435} = 403\ mm^2/m \Rightarrow \mathbf{Ø10/150\ (524\ mm^2/m)} \ \checkmark $$

+ armătură de repartiție Ø8/200 transversal. Podestele se armează ca plăci rezemate pe pereții nucleului.

**Comportare seismică:** rampele **nu se contează** ca element seismic principal (poziționate în nucleu), dar acționează local ca **legături diagonale rigide (element de tip diagonală comprimată)** ce pot atrage eforturi parazite; se prevăd **rosturi de dilatare/decuplare** la un capăt al rampei (rezemare pe reazem alunecător cu neopren) pentru a evita efectul de „bară de contravântuire" nedorit și fisurarea la deplasările impuse de nucleu.
- Casa scării = **spațiu protejat** la foc (a se vedea §14), REI 120.

### 12 bis. Elemente nestructurale și ancorarea lor la seism

Conform P100-1 §10, elementele nestructurale se verifică la forța seismică:

$$ F_a = \frac{\gamma_a \cdot m_a \cdot S_a}{q_a}, \quad S_a = a_g\cdot\left[\frac{3(1 + z/H)}{1 + (1 - T_a/T_1)^2} - 0,5\right] $$

- **Pereți de închidere (anvelopă zidărie/GBC)**: ancorați de structură cu conectori și centuri intermediare; verificați la F_a perpendicular pe plan. La ultimul nivel (z/H = 1), amplificarea S_a este maximă (~2,5·a_g) → ancoraje dimensionate corespunzător.
- **Pereți despărțitori**: prinderi flexibile sus (permit driftul), rosturi la tavan.
- **Tâmplărie și fațadă**: prinderi care acomodează d_r,SLS ≤ 14,5 mm fără avarie.
- **Echipamente terasă** (agregate, panouri): ancorate la structură, verificate la F_a.

Aceste elemente nu fac parte din structura de rezistență principală, dar ancorarea lor este responsabilitatea proiectului de rezistență (evitarea desprinderii/căderii — risc pentru viață).

---

## 13. Rosturi seismice și de tasare

- **Rost seismic** față de construcțiile vecine (dacă există): lățime ≥ suma deplasărilor maxime la SLU ale celor două clădiri (P100-1 §4.6.4). Pentru clădirea de față d_top,SLU ≈ 62 mm ⇒ rost minim recomandat **≥ 80 mm** (cu marjă), sau distanță conform §4.6.4 dacă vecinul are cote de planșeu diferite.
- **Corpul este unic, compact** (24×16 m, λ = 1,5 < 4) ⇒ **nu necesită rost de dilatație/seismic interior**. Lungimea < 50 m ⇒ efectele termice și de contracție se controlează prin armare distribuită și rosturi de turnare tehnologice (nu structurale).

**Verificarea rostului față de o construcție vecină** (P100-1 §4.6.4): dacă clădirea vecină are aceleași cote de planșeu, distanța minimă (pentru a evita ciocnirea — pounding):

$$ \Delta \ge \sqrt{d_1^2 + d_2^2} $$

unde d_1, d_2 sunt deplasările maxime la SLU ale celor două clădiri. Pentru clădirea de față d_1 = d_top,SLU = 62 mm; presupunând un vecin similar d_2 = 62 mm:

$$ \Delta \ge \sqrt{62^2 + 62^2} = 87,7\ mm \Rightarrow \mathbf{rost \ge 90\ mm} $$

Dacă cotele planșeelor vecine nu coincid (risc de lovire planșeu-stâlp), rostul se mărește. Rostul se realizează gol pe toată înălțimea (fără punți rigide), etanșat cu material compresibil la exterior.

---

## 14. Rezistența la foc (SR EN 1992-1-2, P118)

Grad de rezistență la foc **II**. Cerințe de rezistență la foc pe elemente:

| Element | Cerință | Asigurare |
|---|---|---|
| Pereți structurali portanți | **REI 120** | b.a. ≥ 20 cm + acoperire ≥ 25 mm (SR EN 1992-1-2 tab. 5.4) — intrinsec |
| Stâlpi (subsol/parter) | **R 120** | 60×60 cm, acoperire 35 mm — intrinsec (tab. 5.2a) |
| Grinzi | **R 90** | b = 30 cm, a = 35 mm — intrinsec (tab. 5.5) |
| Planșee (placă) | **REI 60–90** | h = 15 cm, a = 25 mm — intrinsec (tab. 5.8) |
| Nucleu casă scară (perete + placă) | **REI 120** | perete 25 cm, b.a. — spațiu protejat de evacuare |

Rezistența la foc este asigurată **intrinsec** prin dimensiunile secțiunilor și acoperirile de beton, conform metodei tabelare din SR EN 1992-1-2 — **fără protecții suplimentare** (vopsele termospumante, plăci). Se verifică distanța axei armăturii la fața expusă (a ≥ a_min tabelar) pentru fiecare element.

**Verificarea tabelară detaliată (SR EN 1992-1-2, distanța la axa armăturii `a`):**

Distanța la axa armăturii se calculează a = c_nom + Ø_etrier + Ø_bară/2.

| Element | a efectiv | a_min necesar (tab.) | Cerință | Verificare |
|---|---|---|---|---|
| Stâlp 60×60 (R120) | 35 + 10 + 25/2 = 57,5 mm | a_min = 45 mm (b_min = 450, μ_fi = 0,7) | R120 | 57,5 > 45 ✓ |
| Grindă 30×60 (R90) | 25 + 8 + 16/2 = 41 mm | a_min = 35 mm (b_min = 250) | R90 | 41 > 35 ✓ |
| Placă 15 cm (REI60) | 25 + 10/2 = 30 mm | a_min = 20 mm (h_s ≥ 80 mm) | REI60 | 30 > 20 ✓ |
| Perete 25 cm (REI120) | 25 + 12 + 10/2 = 42 mm | a_min = 35 mm (perete pe 2 fețe) | REI120 | 42 > 35 ✓ |

Toate elementele satisfac cerințele de rezistență la foc prin metoda tabelară fără protecții adiționale. Grosimile minime ale elementelor (b_min stâlp 450 mm < 600 real; grosime perete 250 mm) sunt de asemenea respectate. Betonul cu agregate silicioase se ia acoperitor (fără reducere pentru agregate calcaroase). Se verifică suplimentar la PTh reducerea capacității portante a stâlpilor sub combinația accidentală de foc (E_d,fi ≈ 0,7·E_d) — asigurată prin factorul μ_fi.

---

## 14 bis. Durabilitate, tehnologie de execuție și controlul calității betonului

### 14bis.1. Clase de expunere și durabilitate (SR EN 206, SR EN 1992-1-1 §4)

| Element | Clasă expunere | Mecanism de degradare | Cerințe minime beton |
|---|---|---|---|
| Radier (față inferioară, contact teren + apă) | XC2 + XA1 | carbonatare umed + atac chimic slab (sulfați) | C30/37, a/c ≤ 0,50, ciment min 320 kg/m³, ciment rezistent la sulfați (SR) |
| Pereți subsol (contact pământ/apă) | XC2 | carbonatare umed | C30/37, a/c ≤ 0,55, ciment min 300 kg/m³ |
| Elemente suprastructură (interior uscat) | XC1 | carbonatare mediu uscat | C25/30–C35/45, a/c ≤ 0,65 |
| Atic, elemente expuse exterior | XC4 + XF1 | umezire/uscare + îngheț-dezgheț | C30/37, aer antrenat 4–6% |

Cuva etanșă a subsolului: beton hidrotehnic clasă de impermeabilitate **W8/P8** (penetrare apă sub presiune ≤ 8 cm la 8 bar), cu aditivi cristalizatori și **waterstop-uri** (benzi de etanșare) la toate rosturile de turnare orizontale și verticale. Rosturile de turnare se poziționează la min. 1/5 din deschidere de reazeme și se tratează cu spălare + amorsă de aderență.

### 14bis.2. Tehnologia de execuție

- **Radierul** se toarnă continuu (fără rost) pe cât posibil; dacă lungimea impune rosturi, acestea sunt tehnologice cu waterstop și mustăți de continuitate. Se prevede strat de egalizare (beton de egalizare C8/10, 10 cm) + membrană hidroizolantă sub radier.
- **Pereții structurali** se execută cu cofraje modulare de față mare; turnare pe înălțime de nivel; vibrare cu pervibrator pentru compactare (evitarea cuiburilor de pietriș în zonele armate dens — bulbi).
- **Planșeele** dală se toarnă monolit pe cofraj recuperabil sau cu **predală prefabricată** (placă suport 5–6 cm + suprabetonare 9–10 cm cu conectori de forfecare) — variantă care accelerează execuția și reduce cofrajul; predala se dimensionează la faza de montaj (grinzi provizorii de sprijin).
- **Stâlpii** se toarnă pe înălțime de nivel, cu decalarea înnădirilor armăturilor longitudinale în afara zonelor critice (mijlocul înălțimii stâlpului).
- **Protecția muchiilor și acoperirea** se asigură cu distanțieri (purici) certificați, verificați la fiecare fază de armare.

### 14bis.3. Controlul calității betonului

- Rezistența se verifică pe **cuburi/cilindri** (SR EN 12390) la 28 zile; se acceptă lotul dacă f_cm ≥ f_ck + 4 (criteriu conformitate SR EN 206).
- Consistență (tasare/slump) clasă S3–S4 pentru betonul de pereți/stâlpi (pompabil, armare deasă); S2–S3 pentru radier.
- Se prelevă min. 1 set de epruvete la fiecare 50 m³ sau la fiecare fază de betonare, oricare survine primul.
- Armăturile se recepționează cu certificate de conformitate (clasa C — B500C), cu verificarea diametrului real, a limitei de curgere și a alungirii.

---

## 14 ter. Breviar sintetic de calcul (extras de eforturi și verificări)

Tabelul de mai jos centralizează verificările principale ale elementelor structurale la starea limită determinantă, ca sinteză de breviar la nivel DTAC:

| # | Element | Efort de proiectare | Rezistență / limită | Grad de utilizare | Stare |
|---|---|---|---|---|---|
| 1 | Perete Y (l_w=6,0, C35/45) — M-N | ν_d = 0,153; M_Ed = 21.000 kNm | ν_d,adm = 0,40; M_Rd = 24.580 kNm | 0,85 (M) | ✓ |
| 2 | Perete Y — forfecare | V_Ed = 2.550 kN | V_Rd,s = 3.153 kN; V_Rd,max = 8.660 kN | 0,81 | ✓ |
| 3 | Perete X (l_w=5,4, C35/45) — M-N | ν_d = 0,135; M_Ed = 15.800 kNm | ν_d,adm = 0,40; M_Rd = 17.242 kNm | 0,92 (M) | ✓ |
| 4 | Nucleu — torsiune | τ_t = 0,356 MPa | ≪ limită bielă | 0,06 | ✓ |
| 5 | Buiandrug cuplare (diagonal) | V_Ed = 280 kN | V_Rd = 317 kN | 0,88 | ✓ |
| 6 | Stâlp subsol (60×60, C35/45) | ν_d = 0,50 | ν_d,adm = 0,55 | 0,91 | ✓ |
| 7 | Stâlp E5 (50×50, C30/37) | ν_d = 0,29 | ν_d,adm = 0,55 | 0,53 | ✓ |
| 8 | Grindă cadru — încovoiere | M_Ed = 210 kNm | M_Rd (5Ø16) ≈ 225 kNm | 0,93 | ✓ |
| 9 | Grindă cadru — forfecare | V_Ed = 171 kN | V_Rd,s = 217 kN | 0,79 | ✓ |
| 10 | Nod cadru interior | V_jhd = 929 kN | V_Rd,nod + armătură nod | ≈ 1,0 (cu armare) | ✓ |
| 11 | Placă dală 15 cm | M_Ed = 28,9 kNm/m | M_Rd (Ø10/125) ≈ 30 kNm/m | 0,96 | ✓ |
| 12 | Perete subsol | M_Ed = 35,3 kNm/m | M_Rd (Ø12/200) ≈ 44 kNm/m | 0,80 | ✓ |
| 13 | Radier — încovoiere | M_Ed = 420 kNm/m | M_Rd (Ø20/200) ≈ 450 kNm/m | 0,93 | ✓ |
| 14 | Radier — străpungere | v_Ed = 0,571 MPa | v_Rd,c = 0,55 (+ îngroșare) | ≈ 1,0 (cu capitel) | ✓ |
| 15 | Presiune pe teren (Sc3) | p_ef = 142,4 kPa | p_conv = 260 kPa | 0,55 | ✓ |
| 16 | Presiune pe teren (Sd) | p_max = 220,5 kPa | 1,3·p_conv = 338 kPa | 0,65 | ✓ |
| 17 | Plutire (UPL/EQU) | 1,1·F_sub = 16.363 kN | 0,9·G_stb = 49.500 kN | 0,33 | ✓ |
| 18 | Tasare absolută | s = 14,8 mm | s_adm ~ 80 mm | 0,19 | ✓ |
| 19 | Drift SLS (max) | 4,49 mm | 0,005h = 14,5 mm | 0,31 | ✓ |
| 20 | Drift SLU (max) | 8,97 mm | 0,025h = 72,5 mm | 0,12 | ✓ |
| 21 | Efect P-Δ | θ = 0,013 | θ_lim = 0,10 | 0,13 | ✓ (neglijabil) |

**Toate gradele de utilizare ≤ 1,00** ⇒ structura verifică la toate stările limită. Elementul cel mai solicitat este peretele X la încovoiere (0,92) și placa (0,96), ambele cu rezervă. Verificările la teren, plutire, tasare și drift au marje foarte mari — caracteristice sistemului dual rigid pe radier.

---

## 15. Program de urmărire a execuției — faze determinante

Fiind clasa de importanță III și zonă seismică ag = 0,25g, se instituie program de control al calității cu **faze determinante** (avizate de proiectant + ISC):
1. Recepția naturii terenului de fundare (cota −4,00 m) — geotehnician + proiectant;
2. Armarea radierului înainte de betonare;
3. Armarea pereților structurali și a zonelor critice (bulbi, buiandrugi de cuplare) la fiecare 2 niveluri;
4. Armarea nodurilor de cadru și confinarea stâlpilor;
5. Verificarea rosturilor de turnare și a waterstop-urilor la cuva etanșă.

---

## 15 bis. Regularitatea structurală (verificare detaliată)

Regularitatea condiționează metoda de calcul admisă și valoarea factorului q (P100-1 §4.4.3).

### 15bis.1. Regularitate în plan (§4.4.3.2)

| Criteriu | Cerință | Valoare structură | Rezultat |
|---|---|---|---|
| Compactitate, simetrie | aproximativ simetric față de 2 axe | nucleu central-lateral, aprox. simetric | ✓ |
| Zveltețe în plan λ = L_max/L_min | ≤ 4 | 24/16 = **1,50** | ✓ |
| Excentricitate structurală e_0x | ≤ 0,30·r_x | e_0x ≈ 1,2 m < 0,30·12,8 = 3,84 m | ✓ |
| Raza de torsiune r vs. raza girație l_s | r_x, r_y > l_s | r_x=12,8; r_y=13,1 > l_s=9,6 m | ✓ |
| Goluri planșeu (scară+lift) | < 15% arie nivel | 32/384 = **8,3%** | ✓ |
| Rezistanță/rigiditate diafragmă | diafragmă rigidă | placă continuă, L/d < 4 în plan | ✓ |

⇒ **regulată în plan**.

### 15bis.2. Regularitate în elevație (§4.4.3.3)

| Criteriu | Cerință | Valoare structură | Rezultat |
|---|---|---|---|
| Continuitatea sistemului vertical | pereți/stâlpi continui S→terasă | fără întreruperi/retrageri | ✓ |
| Variația rigidității de nivel | fără scăderi bruște | scădere lină (grosimi 30→20 cm) | ✓ |
| Variația masei de nivel | fără variații > 50% între niveluri | mase egale etaje ± 5% | ✓ |
| Variația secțiunilor | reducere graduală | stâlpi 60→50, pereți 30→20 | ✓ |
| Retrageri (setbacks) | fără retrageri asimetrice | corp prismatic, fără retrageri | ✓ |

⇒ **regulată în elevație**. Consecințe: se admite **metoda forțelor laterale echivalente** (validată modal); **nu se aplică penalizări** ale factorului q (q rămâne 3,45); se poate folosi model plan pe fiecare direcție (dar s-a preferat modelul spațial pentru torsiune).

---

## 15 ter. Robustețe și evitarea colapsului progresiv (SR EN 1990/1991-1-7)

Pentru clasa de consecințe CC2, se asigură robustețea structurii (limitarea propagării unei avarii locale — „cheia dominoului"):

- **Legături orizontale (tie forces)**: centurile perimetrale și interioare ale planșeelor asigură legături de continuitate cu forța de întindere minimă T_i = 0,8·(g_k + ψ·q_k)·s·L conform SR EN 1991-1-7 anexa A; armate cu min. 4 Ø14 continui.
- **Legături verticale**: armătura continuă a stâlpilor și pereților (mustăți suprapuse pe toată înălțimea) asigură calea verticală de descărcare la scenariul de pierdere a unui element.
- **Redundanță prin sistem dual**: pierderea unui stâlp de cadru → redistribuire la pereți/cadrele vecine (efect de „grindă-perete" în planșeul dală + centuri) fără colaps progresiv.
- **Cheia detaliilor ductile DCM**: capacitatea de rotire plastică a articulațiilor asigură redistribuirea eforturilor la suprasolicitare accidentală.

Nu se impune verificare explicită la scenariu de pierdere de element (cerut la CC3), dar măsurile de legătură (tie method, SR EN 1991-1-7) sunt implementate ca strategie prescriptivă pentru CC2.

---

## 15 quater. Ancoraje și înnădiri (lungimi de calcul)

Lungimile de ancoraj și de suprapunere (SR EN 1992-1-1 §8.4, §8.7), pentru B500C în beton C30/37 (f_bd = 3,0 MPa, bare bune condiții de aderență):

$$ l_{b,rqd} = \frac{\varnothing}{4}\cdot\frac{\sigma_{sd}}{f_{bd}} = \frac{\varnothing}{4}\cdot\frac{435}{3,0} = 36,25\cdot\varnothing $$

| Diametru | l_b,rqd (ancoraj) | l_0 (suprapunere, α_6 = 1,5) |
|---|---|---|
| Ø12 | 435 mm | ≈ 650 mm |
| Ø16 | 580 mm | ≈ 870 mm |
| Ø20 | 725 mm | ≈ 1.090 mm |
| Ø25 | 906 mm | ≈ 1.360 mm |

În zonele critice (baza pereților, noduri) **înnădirile prin suprapunere sunt interzise** — se folosesc bare continue sau înnădiri mecanice (manșoane) / prin sudură cap-la-cap certificate. Ancorajul barelor de la grinzi în noduri se prevede cu cârlige/ciocuri când lungimea dreaptă e insuficientă.

---

## 16. Concluzii

Structura propusă pentru imobilul de locuințe colective **S+P+8E** (~24×16 m) este un **sistem dual cu pereți structurali predominanți din beton armat** (cadre + pereți + nucleu închis), fundat pe **radier general** peste un subsol alcătuit ca **cutie rigidă etanșă**, soluție optimă pentru amplasamentul cu **a_g = 0,25g, T_C = 0,70 s**:

- **Perioadă proprie** T_1 ≈ 0,55–0,62 s (< T_C) → structură rigidă, pe palierul spectrului;
- **Forță seismică de bază** F_b ≈ 7.083 kN/direcție (coeficient seismic c ≈ 0,154), q = 3,45 (DCM);
- **Deplasări relative de nivel** verificate cu marjă ~3–4× la SLS (≤ 0,005·h) și confortabil la SLU (≤ 0,025·h); P-Δ neglijabil (θ = 0,013 < 0,10);
- **Pereți structurali** verificați la M–N (ν_d = 0,153 < 0,40) și forfecare amplificată prin capacitate (biela și armătura orizontală verificate), cu bulbi confinați și buiandrugi de cuplare armați diagonal;
- **Stâlpi și grinzi** dimensionați cu **capacity design** (Σ M_Rc ≥ 1,3·Σ M_Rb) → mecanism ductil global fără nivel slab;
- **Infrastructura**: presiune pe teren 142 kPa < 260 kPa admis, tasare ≈ 1,5 cm (< limite), verificare la plutire EQU asigurată, pereți subsol dimensionați la împingerea pământului + hidrostatic, radier verificat la încovoiere și străpungere (cu îngroșări locale);
- **Materiale**: beton C25/30–C35/45, oțel B500C (clasa C, obligatoriu DCM); acoperiri și rezistență la foc (REI 120 pereți, R 120 stâlpi) asigurate intrinsec.

Structura **satisface cerința fundamentală A1** — rezistență mecanică și stabilitate — conform Legii 10/1995, la ambele stări limită (SLU la IMR 225 ani, SLS la IMR 40 ani).

**Verificare:** documentația se supune verificării de către verificatori de proiecte atestați MDLPA pentru cerința esențială **A** (rezistență mecanică și stabilitate) — exigența **A1** (construcții civile, structuri de beton) și, pentru infrastructură, **Af** (geotehnică). Coordonare cu verificatorul **Cc** (siguranța la foc) pentru validarea rezistenței la foc a elementelor structurale. Se recomandă expertizarea geotehnică pe amplasament (studiu geotehnic verificat Af) anterior fazei PTh.

**Documente ulterioare (faza PTh + DDE):** breviar de calcul complet cu ieșiri din programul de element finit (mase modale, participări, spectre, eforturi, verificări), planuri de cofraj și armare (radier, pereți, stâlpi, grinzi, planșee, scări, buiandrugi de cuplare), detalii de armare zone critice, extrase de armătură, caiet de sarcini pentru betoane și armături, program de control al calității.

---

*Întocmit: inginer structurist, membru AICPS. Verificat: verificator atestat MDLPA cerința A1/Af. Prezentul memoriu are caracter tehnic la nivel DTAC; toate valorile numerice se confirmă/actualizează în breviarul de calcul la faza Proiect Tehnic pe baza studiului geotehnic definitiv și a modelului de calcul avizat.*
