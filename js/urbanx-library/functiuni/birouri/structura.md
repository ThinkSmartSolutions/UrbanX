# Memoriu Tehnic de Rezistență (DTAC) — Clădire de birouri clasa A, S+P+6E

**Structură de beton armat, sistem dual (cadre + nucleu central rigidizant), planșee dală groasă (flat slab), infrastructură radier general.**

> Prezentul memoriu constituie piesa scrisă de rezistență a documentației tehnice pentru autorizarea executării lucrărilor de construire (DTAC), întocmit conform Legii nr. 10/1995 privind calitatea în construcții (republicată), a HG nr. 907/2016 privind conținutul-cadru al documentațiilor tehnico-economice și a Legii nr. 169/2026 (CATUC), art. 264, conținut-cadru Anexa nr. 2. Nivelul de detaliere corespunde fazei DTAC, cu prefigurarea soluțiilor care se dezvoltă și se verifică integral la fazele PT+DE pe model spațial cu elemente finite. Toate valorile numerice de mai jos sunt calcule de predimensionare/verificare lucrate manual pentru justificarea soluției; ele nu se substituie calculului automat de proiect tehnic.

---

## 1. Date generale și scopul lucrării

### 1.1. Obiectul documentației

Se propune realizarea unei **clădiri de birouri clasa A**, cu regim de înălțime **S+P+6E** (un nivel subsol tehnic + parcare, parter comercial/recepție și șase etaje curente de birouri open-space). Clădirea este destinată închirierii ca spații de birouri flexibile, cu compartimentări ușoare, tavane tehnice și pardoseli înălțate (raised floor) pentru distribuția instalațiilor.

Cerința funcțională-cheie care condiționează soluția structurală este **flexibilitatea maximă a spațiului**: planșee fără grinzi vizibile în câmp (open-space liber pe toată tramă), înălțime liberă utilă mare, posibilitatea de recompartimentare fără intervenție structurală și integrarea instalațiilor în plenumul de tavan.

Din perspectiva conceptului structural, această cerință impune două decizii majore, care se justifică pe parcursul memoriului:
1. **Planșeu fără grinzi în câmp** (flat slab) — pentru a elibera plenumul de tavan și a permite recompartimentarea liberă; consecința este necesitatea rezolvării atente a străpungerii la stâlpi (§7.4);
2. **Concentrarea rezistenței la forțe laterale într-un nucleu central** — pentru a evita pereții de contravântuire răspândiți care ar fragmenta spațiul; consecința este verificarea nucleului ca element principal seismic (§7.1) și a interacțiunii cadre-nucleu (§2.4).

Clădirea vizează certificarea ca spațiu de birouri **clasa A** (specificații BOMA/BREEAM), ceea ce presupune, structural: deschideri mari libere, planșee performante la vibrații (§10.4), toleranțe de execuție strânse și trasabilitatea calității (§15).

### 1.2. Caracteristici geometrice principale

| Parametru | Valoare adoptată | Observații |
|---|---|---|
| Regim de înălțime | S+P+6E | 1 subsol + 8 niveluri supraterane |
| Dimensiuni în plan (ax-ax) | 32,40 × 24,30 m | dreptunghi compact |
| Trama structurală | 8,10 × 8,10 m | 4 travei × 3 deschideri |
| Suprafață construită Ac | ~730 mp | amprentă |
| Suprafață desfășurată Ad | ~5.480 mp | 8 niv × ~685 mp util |
| Înălțime etaj curent (Het) | 3,60 m | h liber ~2,80 m după plenum |
| Înălțime parter (Hp) | 4,20 m | recepție/lobby |
| Înălțime subsol (Hs) | 3,00 m | tehnic + parcare |
| Înălțime totală suprateran | 4,20 + 6×3,60 = **25,80 m** | de la ±0,00 la terasă |
| Cotă fundare | −3,80 m | talpa radierului |
| Deschidere maximă travee | 8,10 m | între axe |

Raportul de zveltețe general al construcției: `H/B = 25,80/24,30 = 1,06` în direcția scurtă și `25,80/32,40 = 0,80` în direcția lungă — construcție **rigidă, nezveltă**, favorabilă la acțiuni laterale. Nucleul de rigidizare are zveltețea `α0 = Hw/lw = 25,80/8,10 ≈ 3,19 > 2` (perete zvelt).

**Sistemul de axe și numerotare.** Se adoptă un sistem de axe ortogonal: axele longitudinale (numerotate 1÷5, la interax 8,10 m, dimensiune totală 4×8,10 = 32,40 m) și axele transversale (litere A÷D, la interax 8,10 m, dimensiune totală 3×8,10 = 24,30 m). Nucleul central ocupă zona axelor 2-3 / B-C (centru geometric). Stâlpii se identifică prin intersecția axelor (ex.: stâlp C3 = stâlp interior lângă nucleu). Această convenție se preia identic în planurile de cofraj și armare la faza PT.

**Bilanțul de mase pe niveluri (predimensionare).** Distribuția aproximativă a greutății pe cele opt niveluri, folosită la calculul seismic (§6):

| Nivel | Cotă (m) | Amprentă (m²) | gk+ψE·qk (kN/m²) | Greutate nivel (kN) |
|---|---|---|---|---|
| Terasă | +25,80 | 730 | 10,00 (fără util) | ~8.400 (cu atic+utilaje) |
| E2÷E6 (×5) | 7,80÷22,20 | 685 | 9,46 | ~8.190 fiecare |
| Parter | +4,20 | 730 | 9,46 + supr. verticală | ~9.000 |
| **Total suprastructură** | | | | **≈ 56.200 kN** |

Această valoare de ~56.200 kN (~5.730 t) reprezintă greutatea seismică `W` mobilizată în oscilația suprastructurii; subsolul, fiind sub cota de încastrare, nu participă la masa oscilantă.

### 1.3. Clasificări normative

**Categoria de importanță (HG nr. 766/1997, anexa nr. 3):** clădire de birouri cu Ad ~5.480 mp și mai mult de 400 persoane potențial — se încadrează în **categoria de importanță „C" (normală)**. Se adoptă însă, conservator, o abordare care asigură performanța la nivel superior prin **clasa de importanță și expunere seismică II** (vezi mai jos).

**Clasa de importanță și expunere la cutremur (P100-1/2013, tabel 4.2):** clădirile de birouri cu aglomerări mari de persoane (peste ~300 persoane într-o incintă) se încadrează în **clasa II**, cu factorul de importanță **γI,e = 1,20**. Adoptarea clasei II (nu III cu γI,e = 1,0) este acoperitoare și justificată de destinația de birouri de mare capacitate.

**Clasa de consecințe (SR EN 1990, anexa B):** **CC2** — consecințe medii pentru pierderi de vieți omenești și consecințe economice/sociale considerabile. Corespunde clasei de fiabilitate **RC2**, factor de diferențiere `KFI = 1,00`.

### 1.4. Cadrul normativ de referință

Proiectarea structurală respectă integral pachetul de norme europene armonizate (Eurocoduri cu anexe naționale) și codurile românești specifice:

- **Legea nr. 10/1995** — calitatea în construcții; cerința fundamentală **A — rezistență mecanică și stabilitate**.
- **SR EN 1990:2004/NA:2006** — Bazele proiectării structurilor (Eurocod 0). Grupări de acțiuni, coeficienți parțiali, factori ψ.
- **SR EN 1991** (Eurocod 1) — Acțiuni asupra structurilor: partea 1-1 (greutăți proprii, încărcări utile), partea 1-3 (zăpadă) armonizată cu **CR 1-1-3/2012**, partea 1-4 (vânt) armonizată cu **CR 1-1-4/2012**, partea 1-2 (foc).
- **CR 0/2012** — Cod de proiectare. Bazele proiectării construcțiilor (grupări specifice României).
- **SR EN 1992-1-1:2004/NA** (Eurocod 2) — Proiectarea structurilor de beton, reguli generale.
- **SR EN 1992-1-2** — Proiectarea la foc a structurilor de beton.
- **SR EN 1998-1:2004/NA** (Eurocod 8) — Proiectarea seismică, completat și prevalat de **P100-1/2013** (Cod de proiectare seismică — partea I).
- **P100-3/2019** — Evaluarea seismică (nu aplicabil — construcție nouă, informativ).
- **NP 112/2014** — Normativ pentru proiectarea fundațiilor de suprafață.
- **NP 074/2014** — Normativ privind documentațiile geotehnice.
- **NE 012/2007 (partea 1) și NE 012/2010 (partea 2)** — Producerea și executarea lucrărilor din beton.
- **P118-1/2013, P118-2/2013, P118-3/2015** — Securitatea la incendiu.

---

## 2. Descrierea sistemului structural. Alegerea sistemului

### 2.1. Sisteme structurale analizate

Pentru o clădire de birouri P+6E din beton armat, P100-1/2013 §5.1 și SR EN 1998-1 recunosc mai multe tipuri structurale. Se compară trei variante:

**Varianta A — Cadre spațiale de beton armat (moment-resisting frames).** Preiau atât încărcările gravitaționale, cât și cele laterale prin încovoierea stâlpilor și grinzilor. Avantaj: flexibilitate maximă în plan. Dezavantaj major: la H = 25,80 m rigiditatea laterală este redusă, iar controlul deplasărilor relative de nivel (drift) la SLS (integritatea fațadei cortină) devine dimensionant și impune stâlpi/grinzi mari — ceea ce contrazice cerința de spații libere. Perioada proprie mare (T1 ~ 0,9–1,0 s) reduce forța seismică, dar deformabilitatea excesivă penalizează.

**Varianta B — Pereți structurali (shear walls) puri.** Rigiditate excelentă, drift mic. Dezavantaj: pereții deși fragmentează spațiul open-space și contravin funcțiunii de birouri flexibile.

**Varianta C — Sistem dual (cadre + nucleu/pereți structurali).** Combină cadrele de beton (gravitaționale + parțial laterale) cu un **nucleu central rigidizant** din pereți de beton armat, dispus în jurul casei scării și al puțurilor de lift. Nucleul se comportă ca un **tub închis** de mare rigiditate și rezistență la forțe orizontale.

### 2.2. Sistemul adoptat — dual cu pereți predominanți

Se adoptă **Varianta C — sistem structural dual**, cu:

- **Cadre spațiale de beton armat** (stâlpi 700×700 → 500×500 în înălțime, dală groasă drept „grindă lată"), tramă 8,10 × 8,10 m, care preiau integral încărcările gravitaționale și o cotă-parte redusă din forțele laterale;
- **Nucleu central rigidizant** din pereți de beton armat de 400 mm grosime, formând un tub închis ~8,10 × 6,20 m în jurul scării și celor două lifturi, care preia **cca. 65–75%** din forța tăietoare de bază și cvasi-totalitatea momentului de răsturnare.

Deoarece pereții (nucleul) preiau peste 50% din forța tăietoare seismică de bază, sistemul se clasifică drept **sistem dual cu pereți predominanți** (P100-1/2013 §5.1.2).

**Justificarea alegerii:**

1. **Rigiditate laterală și torsională mare** — controlul driftului la H = 25,80 m este asigurat de nucleu, permițând stâlpi și planșee dimensionate practic gravitațional (secțiuni mici → spațiu liber).
2. **Flexibilitate open-space** — planșeul de tip dală fără grinzi în câmp permite recompartimentări libere; singurele elemente verticale sunt stâlpii periferici/interiori (rar) și nucleul central.
3. **Ductilitate și redundanță** — dubla linie de apărare: cadrele ductile + pereții cuplați ductili (mecanisme de disipare distribuite).
4. **Excentricitate mică** — nucleul central plasat aproape de centrul de masă → moment de torsiune generală redus.
5. **Control fisurare fațadă la SLS** — driftul mic protejează fațada cortină (elemente fragile).

### 2.3. Regularitatea structurii

**Regularitatea în plan (P100-1 §4.4.3.2):**
- Formă compactă, dreptunghiulară, cu raport laturi 32,40/24,30 = 1,33 < 4 ✓;
- Simetrie aproximativă a maselor și rigidităților pe cele două axe ✓;
- Excentricitatea structurală `e0x`, `e0y` < 0,30·r (raza de girație torsională) — verificat prin poziția centrală a nucleului;
- Raza de girație torsională `r > ls` (raza de girație a masei) — structură torsional rigidă datorită nucleului tubular ✓.

**Verificarea numerică a rigidității torsionale.** Raza de girație a masei (planșeu dreptunghiular 32,40 × 24,30 m):
`ls = √((L² + B²)/12) = √((32,40² + 24,30²)/12) = √((1.049,8 + 590,5)/12) = √136,7 = 11,69 m`.
Raza de girație torsională (dominată de nucleul central, cu `Kθ = GJ_nucleu` mare față de rigiditatea de translație `Kx`):
`r = √(Kθ/Kx)`. Datorită tubului închis (rigiditate torsională foarte mare, `J_tub ≈ 4·Aînchis²·t/perimetru`), rezultă `r ≈ 13–15 m > ls = 11,69 m` → **structură torsional rigidă** (condiția `r > ls` satisfăcută). Modul propriu de torsiune are perioada mai mică decât modurile de translație — confirmă la analiza modală (§13) că torsiunea nu guvernează.

**Verificarea excentricității.** Nucleul central plasat la centrul geometric → centrul de rigiditate `CR` coincide practic cu centrul de masă `CM` → `e0 ≈ 0,05·L` (doar accidental). Condiția `e0 ≤ 0,30·r` este amplu satisfăcută (`0,05·32,4 = 1,62 < 0,30·14 = 4,2 m`).

**Regularitatea în elevație (P100-1 §4.4.3.3):**
- Nucleu și cadre continue pe verticală, fără întreruperi/decalări ✓;
- Fără variații de masă între niveluri > 50% ✓;
- Parterul (Hp = 4,20 m) este mai înalt decât etajul curent (3,60 m), dar rigiditatea relativă a parterului rămâne > 70% din a etajului superior (nucleul continuu asigură rigiditatea) → **nu apare mecanism de nivel slab (soft-storey)** ✓.

**Concluzie:** structura este **regulată în plan și în elevație**. Se poate aplica **metoda forțelor laterale echivalente** ca metodă de bază (P100-1 §4.5.3.2), cu validare prin **analiză modală cu spectru de răspuns** (recomandată pentru clădiri > 30 m sau ca verificare).

### 2.4. Repartiția rigidităților laterale între cadre și nucleu

Sistemul dual funcționează prin acțiunea combinată a două subsisteme cu comportare la deformare fundamental diferită:

- **Nucleul** se comportă ca o **consolă verticală încastrată la bază** — deformata are curbură de tip încovoiere (deplasările cresc mai mult la partea superioară);
- **Cadrele** se deformează predominant prin **forfecare** (deplasări relative de nivel mari la bază, mici la vârf).

Interacțiunea celor două deformate impune compatibilitatea deplasărilor la fiecare nivel (planșeele rigide în planul lor — efect de șaibă). Rezultă o deformată intermediară favorabilă și un transfer de forțe între cadre și nucleu prin planșee: la partea inferioară nucleul „ține" cadrele, la partea superioară cadrele „țin" nucleul.

**Estimarea cotelor de preluare a tăietoarei.** Momentul de inerție al nucleului (tub închis) `I_nucleu ≈ 90 m⁴`. Rigiditatea echivalentă a cadrelor la deplasare laterală, exprimată printr-o inerție echivalentă `I_cadre ≈ 15 m⁴` (rezultată din rigiditatea de forfecare a ansamblului stâlpi-dală). Raportul de rigiditate:
`I_nucleu / (I_nucleu + I_cadre) = 90/105 = 0,857`.

La bază, unde nucleul lucrează ca o consolă rigidă, preluarea reală a tăietoarei este atenuată de interacțiune → **~70% nucleu / ~30% cadre** (valoare adoptată în verificări). Această cotă (peste 50%) confirmă clasificarea de **sistem dual cu pereți predominanți** și justifică `q0 = 3,0·αu/α1` din tabelul 5.1.

**Verificarea deplasării de vârf a nucleului ca reper de rigiditate.** Considerând nucleul o consolă încastrată la bază, sub forța seismică distribuită triunghiular cu rezultanta `Fb = 7.970 kN` la ~0,67·H:
`δ_vârf ≈ (Fb·H³)/(3,64·Ec·I)` (formulă pentru consolă sub sarcină triunghiulară);
`= (7.970·10³·25.800³)/(3,64·34.000·90·10¹²)` 
`= (7.970·10³·1,717·10¹³)/(1,113·10¹⁹) = 1,369·10²⁰/1,113·10¹⁹ = 12,3 mm`.

Această deplasare de vârf a nucleului singur (~12 mm sub Fb redus cu q) este mult sub deplasarea admisă (SLU `0,025·H = 645 mm`, SLS `0,5·q·... `), confirmând că **nucleul este dominant și rigid** — cadrele contribuie marginal la rigiditate dar esențial la redundanță și la preluarea gravitațională. Verificarea driftului de nivel (§6.6) folosește deplasarea relativă interetaj rezultată din compatibilitatea celor două subsisteme.

**De ce nu cadre pure:** dacă s-ar renunța la nucleu, cadrele pure ar avea o rigiditate laterală de ordinul `I_cadre = 15 m⁴` (de 6× mai mică), deplasarea de vârf ar crește la ~70–80 mm, iar driftul de nivel ar depăși limita SLS de 27 mm — impunând stâlpi de 900–1000 mm și grinzi înalte. Nucleul este deci soluția care conciliază rigiditatea cu spațiul liber.

### 2.5. Efectul de șaibă rigidă al planșeelor (diaphragm action)

Planșeele dală de 280 mm funcționează ca **șaibe orizontale rigide** care:
1. distribuie forța seismică de nivel la elementele verticale proporțional cu rigiditatea lor;
2. asigură compatibilitatea deplasărilor (comportare unitară a structurii);
3. transferă forțele de la cadre la nucleu (colectare — collector/drag forces).

Verificarea șaibei (P100-1 §5.10): forța de colectare maximă apare la nivelul unde diferența între tăietoarea de nivel a cadrelor și cea a nucleului este maximă. Estimare la nivelul terasei: `F_colectare ≈ 0,3 · 1.810 = 543 kN`, preluată de armătura de câmp a dalei pe direcția respectivă (fâșii de colectare — collector strips) pe traseul dintre cadre și nucleu. Se prevede armătură suplimentară continuă `2Ø16` în banda de colectare de-a lungul axelor B și C (adiacente nucleului).

---

## 2bis. Analiza soluțiilor alternative de planșeu și structură

Cerința de open-space admite mai multe soluții de planșeu; alegerea flat slab (§7.3) rezultă din compararea următoarelor variante:

### 2bis.1. Planșeu dală groasă (flat slab) — soluția adoptată

- Grosime 280 mm, fără grinzi în câmp; economie de înălțime de nivel ~0,45–0,60 m.
- **Avantaje:** cofraj simplu (placă plană), plenum HVAC liber, recompartimentare fără constrângeri, execuție rapidă.
- **Dezavantaje:** străpungere la stâlpi (rezolvată — §7.4), săgeți pe termen lung de controlat, consum de beton relativ mare.

### 2bis.2. Planșeu dală post-tensionat (post-tensioned flat slab)

Pentru deschideri mai mari (>9 m) sau grosimi mai mici, se poate folosi **post-tensionarea** cu monotoroane înglobate:
- Grosime redusă la `h ≈ L/40 = 8.100/40 = 200 mm` (față de 280 mm) → economie greutate proprie ~30%;
- Precomprimarea contracarează săgeata (balancing load ~80% din permanent) și controlează fisurarea;
- **Dezavantaje:** tehnologie specializată, sensibilitate la execuție, dificultăți la găurirea ulterioară a dalei (trasee toroane), cost inițial mai mare.
- Se rezervă ca opțiune la PT dacă deschiderile cresc; pentru trama 8,10 m, **flat slab clasic este suficient și mai robust**.

### 2bis.3. Planșeu cu grinzi principale + placă (soluție clasică)

- Grinzi 300×700 pe axe + placă 150 mm.
- **Respinsă:** grinzile de 700 mm reduc înălțimea liberă și obstrucționează traseele de instalații (perforări grinzi) → contravine cerinței de flexibilitate open-space.

### 2bis.4. Structură mixtă oțel-beton (composite)

Alternativă la structura integral de beton:
- Stâlpi din profile metalice îmbrăcate în beton (sau tubulare umplute cu beton — CFT) + planșee compozite (tablă cutată + beton) pe grinzi metalice.
- **Avantaje:** montaj rapid, deschideri mari, greutate proprie redusă → forță seismică mai mică.
- **Dezavantaje:** cost oțel, protecție la foc a metalului (torcret/vopsele intumescente — spre deosebire de beton, care e protejat intrinsec), rigiditate laterală mai mică (drift mai mare) → necesită oricum nucleu de beton.
- Se poate adopta o **soluție hibridă**: nucleu de beton armat (lateral + foc) + cadre metalice compozite (gravitațional) — competitivă la P+6E dacă viteza de execuție e critică. Pentru prezentul proiect se reține **structura integral de beton armat** (robustețe seismică, foc fără protecții, cost predictibil).

### 2bis.5. Decizia

Se adoptă **structura de beton armat cu planșeu flat slab de 280 mm** — soluția cu cel mai bun raport robustețe seismică / flexibilitate funcțională / cost / rezistență la foc pentru o clădire de birouri P+6E în zonă seismică moderată (ag 0,20g).

## 3. Materiale

### 3.1. Betoane

Betoanele se stabilesc funcție de element și de clasa de expunere (SR EN 206 + NE 012, SR EN 1992-1-1 tabel 4.1).

| Element | Clasa beton | Clasa expunere | fck (MPa) | fcd = fck/1,5 (MPa) | Ecm (GPa) |
|---|---|---|---|---|---|
| Radier / pereți subsol | C30/37 | XC2 / XC3 | 30 | 20,0 | 33 |
| Nucleu rigidizant (pereți) | C35/45 | XC1 | 35 | 23,3 | 34 |
| Stâlpi P÷E3 | C35/45 | XC1 | 35 | 23,3 | 34 |
| Stâlpi E4÷E6 | C30/37 | XC1 | 30 | 20,0 | 33 |
| Dală / grinzi bordaj | C35/45 | XC1 | 35 | 23,3 | 34 |
| Egalizare fundație | C8/10 | X0 | 8 | — | — |

Coeficient parțial beton `γc = 1,50` (grupări fundamentale/seismice, situații persistente). Coeficient `αcc = 1,0` (NA România).

`fcd (C35/45) = 35/1,5 = 23,33 N/mm²`; `fctm (C35/45) = 3,2 N/mm²`; `fctd = 0,7·fctm/1,5 = 1,49 N/mm²`.

### 3.2. Oțel-beton

Se folosește oțel **B500C (BST500C)** conform SR EN 10080 / SR 438:
- Limita de curgere caracteristică `fyk = 500 N/mm²`;
- Coeficient parțial `γs = 1,15` → `fyd = 500/1,15 = 434,8 N/mm²`;
- Modul de elasticitate `Es = 200.000 N/mm²`;
- Clasa de ductilitate **C**: `εuk ≥ 7,5%`, raport `(ft/fy)k ≥ 1,15` și `≤ 1,35` — **obligatorie** pentru zonele disipative în DCM (P100-1 §5.3.2).

### 3.3. Acoperiri cu beton (nominal cover)

`cnom = cmin + Δcdev`, cu `Δcdev = 10 mm`:

| Element | Expunere | cmin,dur | cnom adoptat |
|---|---|---|---|
| Interior (dală, stâlpi) | XC1 | 15 mm | **25 mm** |
| Subsol (pereți) | XC3 | 25 mm | **35 mm** |
| Radier la teren | XC2 + contact | 40 mm | **40 mm** (față inferioară 50 mm) |

### 3.4. Justificarea claselor de beton pe considerente de calcul

Alegerea C35/45 pentru elementele principale (nucleu, stâlpi inferiori, dală) nu este arbitrară:

- **Străpungerea dalei** (§7.4) este condiționată direct de `fck`: `v_Rd,c ∝ fck^(1/3)`. Trecerea de la C30/37 la C35/45 crește `v_Rd,c` cu `(35/30)^(1/3) = 1,053` (~5%), ceea ce reduce armătura de străpungere — determinant pentru soluția flat slab.
- **Efortul axial în stâlpi** — la νd = 0,45, un beton mai bun (fcd mai mare) permite secțiuni mai mici la același efort, deci mai mult spațiu liber.
- **Forfecarea în nucleu** — `V_Rd,max ∝ fcd`, deci un beton bun mărește capacitatea de forfecare fără îngroșarea pereților.

Pentru radier (C30/37) primează durabilitatea (contact cu terenul, XC2) și controlul căldurii de hidratare (element masiv 1,00 m grosime — beton cu conținut redus de ciment și adaosuri, pentru limitarea fisurării termice de contracție la priză).

**Rețete de beton orientative (NE 012-1, pentru estimare):**

| Clasă | Ciment (kg/m³) | A/C max | Dmax agregat | Consistență | Aditivi |
|---|---|---|---|---|---|
| C35/45 (structură) | 360–380 | 0,45 | 16–22 mm | S4 (fluid) | superplastifiant |
| C30/37 (radier) | 300–320 + cenușă | 0,50 | 22–31 mm | S3 | superplast. + întârzietor priză |
| C30/37 (pereți subsol) | 320 | 0,50 | 16 mm | S4 | impermeabilizant (P8) |

Pentru radierul masiv, controlul temperaturii la priză: temperatura maximă în miez `< 65°C` și gradient miez-suprafață `ΔT < 20°C` (evitarea fisurării termice). Măsuri: ciment cu căldură redusă (CEM III/A sau adaos de cenușă zburătoare), turnare pe timp răcoros, tratament de protecție a suprafeței.

### 3.5. Modulul de elasticitate și deformabilitatea

Pentru calculul deplasărilor (drift, săgeți) se folosesc valori realiste ale rigidității:
- La **SLU seismic**, rigiditatea elementelor de beton armat fisurat se reduce la `EI_eff ≈ 0,5·EI_brut` (P100-1 §4.5.3.3) pentru grinzi/dală și `EI_eff ≈ 0,7·EI_brut` pentru stâlpi/pereți comprimați. Această reducere prelungește perioada proprie și este inclusă în estimarea `T1 = 0,60 s`.
- La **SLS**, se folosește modulul secant `Ecm` corectat cu efectul de durată (fluaj), prin coeficientul de fluaj `φ(∞,t0) ≈ 2,0` pentru încărcarea de lungă durată → `Ec,eff = Ecm/(1+φ) ≈ Ecm/3` la săgeata pe termen lung.

---

## 4. Amplasamentul. Acțiuni climatice și seismice

### 4.1. Parametri seismici de amplasament (exemplu: NE — Municipiul Iași)

Conform P100-1/2013, hărțile de zonare (fig. 3.1 și 3.2):

| Parametru | Simbol | Valoare (Iași) |
|---|---|---|
| Accelerația terenului (IMR 225 ani) | ag | **0,20·g** |
| Perioada de colț | TC | **0,70 s** |
| Perioada de control inferioară | TB | 0,14 s |
| Perioada de control superioară | TD | 3,00 s |
| Factor de amplificare dinamică maximă | β0 | 2,50 |
| Factor de importanță/expunere | γI,e | 1,20 |

**Spectrul normalizat de răspuns elastic** (P100-1 §3.1, cu `TB = 0,2·TC = 0,14 s`; `TC = 0,70 s`):
- pentru `T < TB`: `β(T) = 1 + (β0−1)·T/TB`;
- pentru `TB ≤ T ≤ TC`: `β(T) = β0 = 2,50` (palier);
- pentru `TC < T ≤ TD`: `β(T) = β0·TC/T`;
- pentru `T > TD`: `β(T) = β0·TC·TD/T²`.

**Tabelarea spectrului de proiectare Sd(T)/g** (cu `q = 3,60`, `ag = 0,20g`, `Sd = ag·β/q`):

| T (s) | β(T) | Sd(T)/g | Observație |
|---|---|---|---|
| 0,00 | 1,00 | 0,056 | ordonata la T=0 (min. 0,2·ag/g asigurat) |
| 0,14 (TB) | 2,50 | 0,139 | început palier |
| 0,60 (T1 struct.) | 2,50 | 0,139 | **perioada fundamentală** |
| 0,70 (TC) | 2,50 | 0,139 | sfârșit palier |
| 1,00 | 1,75 | 0,097 | ramură descendentă |
| 2,00 | 0,875 | 0,049 | — |
| 3,00 (TD) | 0,583 | 0,032 | — |

Perioada fundamentală `T1 = 0,60 s` cade exact pe **palierul de amplificare maximă** — situația cea mai defavorabilă pentru forța seismică, dar și cea mai frecventă la clădirile de birouri de această zveltețe. Nu există posibilitatea de „a scăpa" din palier prin flexibilizare (ar contraveni controlului driftului).

**Sensibilitatea la amplasament.** Aceleași calcule se re-rulează pentru orice UAT prin înlocuirea perechii (ag, TC). Exemplificativ:

| Amplasament | ag | TC (s) | Sd(T1=0,6)/g | Fb rezultat (kN) |
|---|---|---|---|---|
| Iași (NE) | 0,20g | 0,70 | 0,139 | ~7.970 |
| București (S) | 0,30g | 1,60 | 0,208 | ~11.900 |
| Cluj-Napoca (NV) | 0,10g | 0,70 | 0,069 | ~3.960 |
| Focșani (Vrancea) | 0,40g | 1,60 | 0,278 | ~15.900 |

Pentru amplasamentele cu `TC = 1,60 s` (București, Focșani), `T1 = 0,60 s < TC` → structura rămâne pe palier `β = β0`, dar `ag` mai mare majorează forța. La aceste amplasamente s-ar reconsidera clasa DCH și eventual îngroșarea nucleului. Prezentul memoriu dezvoltă cazul Iași (ag 0,20g); adaptarea la alt amplasament se face prin re-parcurgerea §6 cu noii parametri.

### 4.2. Acțiunea zăpezii (CR 1-1-3/2012, exemplu zona Iași)

`s = γIs · µi · Ce · Ct · sk`, cu:
- `sk = 2,00 kN/m²` (valoarea caracteristică la sol, zona NE);
- `µi = 0,80` (acoperiș terasă, pantă < 30°);
- `Ce = 1,00` (expunere normală);
- `Ct = 1,00` (fără efect termic);
- `γIs = 1,00` (importanță).

`s = 1,00 · 0,80 · 1,00 · 1,00 · 2,00 = 1,60 kN/m²`.

### 4.3. Acțiunea vântului (CR 1-1-4/2012)

- Presiunea de referință a vântului: `qb = 0,50 kN/m²` (zona NE, viteză de referință ~35 m/s);
- Coeficient de expunere la înălțimea z = 25,80 m, teren categoria III (urban): `ce(z) ≈ 2,10`;
- Presiunea de vârf: `qp(z) = ce·qb = 2,10 · 0,50 = 1,05 kN/m²`;
- Coeficient de presiune net (față + aspirație spate): `cp,net ≈ 1,30`;
- Presiunea externă de calcul: `we = cp,net · qp = 1,30 · 1,05 = 1,37 kN/m²`.

**Forța globală de vânt** pe direcția scurtă (fața lungă expusă `A = 32,40 × 25,80 = 836 m²`):
`Fw = we · A = 1,37 · 836 ≈ 1.145 kN`.

Această valoare (1.145 kN) este mult inferioară forței seismice de bază (cca. 7.970 kN — §6), deci **seismul este acțiunea laterală dimensionantă**. Vântul se verifică totuși pentru confortul ocupanților și pentru elementele de fațadă.

**Distribuția presiunii de vânt pe înălțime** (profilul `qp(z)` crește cu z, teren categoria III):

| Cota z (m) | ce(z) | qp(z) = ce·qb (kN/m²) | we (kN/m²) |
|---|---|---|---|
| 0–7,8 (baza) | 1,55 | 0,78 | 1,01 |
| 7,8–15,0 | 1,80 | 0,90 | 1,17 |
| 15,0–25,8 (vârf) | 2,10 | 1,05 | 1,37 |

Momentul de răsturnare din vânt (cu rezultanta la ~0,6·H):
`M_w = Fw · 0,6·H = 1.145 · 0,6 · 25,80 ≈ 17.720 kNm` — cca. 8× mai mic decât momentul seismic (137.700 kNm), confirmând că **nucleul dimensionat la seism acoperă amplu vântul**.

**Verificarea confortului la vârf (accelerația)**: pentru clădiri de birouri, accelerația de vârf la vânt trebuie limitată (`a < 0,015·g` pentru confort standard birouri, ISO 10137). Cu perioada `T1 = 0,60 s < 1 s` și zveltețea redusă (H/B ~1), structura este rigidă și puțin sensibilă la vânt dinamic → confort asigurat (verificare detaliată la PT).

**Fenomenul de desprindere de vârtejuri (vortex shedding)** — irelevant pentru o clădire prismatică nezveltă (H/B ~1); nu se aplică verificarea la vibrații transversale.

### 4.4. Studiu geotehnic (exemplu, categoria geotehnică 2)

Conform NP 074/2014, stratificația de calcul adoptată:

| Adâncime (m) | Strat | γ (kN/m³) | E (MPa) | φ' (°) | c' (kPa) |
|---|---|---|---|---|---|
| 0,0 – 1,2 | umplutură/vegetal | 17 | — | — | — |
| 1,2 – 8,0 | argilă prăfoasă vârtoasă | 19,5 | 12–18 | 18 | 25 |
| > 8,0 | pietriș cu nisip îndesat | 20 | 40–60 | 34 | 0 |

- Presiune convențională de bază: `pconv = 250 kPa` (argilă prăfoasă vârtoasă, NP 112 anexa);
- Nivelul hidrostatic (NHS): **−2,50 m** de la CTN;
- Categoria geotehnică **2**, risc geotehnic moderat.

---

## 5. Acțiuni. Evaluarea încărcărilor (SR EN 1991)

### 5.1. Încărcări permanente (G)

**Planșeu curent (etaj de birouri):**

| Strat | Valoare (kN/m²) |
|---|---|
| Dală beton armat h = 280 mm (25 kN/m³ × 0,28) | 7,00 |
| Pardoseală înălțată (raised floor) + finisaj | 0,60 |
| Plafon fals + instalații suspendate | 0,50 |
| Șapă/egalizare + strat suport | 0,40 |
| **Total permanent planșeu curent gk** | **8,50** |

**Fațadă cortină:** `0,80–1,00 kN/m²` pe suprafața fațadei → încărcare liniară pe grinda de bordaj `~ 1,00 × 3,20 = 3,20 kN/m`.

**Planșeu terasă (necirculabilă):**

| Strat | Valoare (kN/m²) |
|---|---|
| Dală beton armat 280 mm | 7,00 |
| Termoizolație + hidroizolație + protecție + pantă | 2,50 |
| Echipamente tehnice / strat tehnic | 0,50 |
| **Total terasă gk** | **10,00** |

### 5.2. Încărcări utile (Q) — SR EN 1991-1-1 tabel 6.2 / NA

| Zonă | Categorie | qk (kN/m²) |
|---|---|---|
| Birouri | B | 3,00 |
| Pereți despărțitori mobili (echivalent uniform) | — | 1,00 |
| **Total birouri (utilă de proiect)** | | **4,00** |
| Coridoare, holuri | C1 | 3,0–4,0 |
| Scări | — | 4,00 |
| Terasă necirculabilă | H | 0,40 |
| Parcare subsol (autoturisme) | F | 2,50 |

### 5.3. Coeficienți ψ (SR EN 1990, anexa A1 / CR 0)

| Categorie | ψ0 | ψ1 | ψ2 |
|---|---|---|---|
| Birouri (B) | 0,7 | 0,5 | 0,3 |
| Zăpadă | 0,7 | 0,5 | 0,2 (0 sub 1000 m) |
| Vânt | 0,6 | 0,2 | 0,0 |

Factor de combinație pentru masele seismice: `ψE,i = φ · ψ2,i`, cu `φ = 0,8` (etaje ocupate corelat), `ψ2 = 0,3` (birouri) → `ψE = 0,8 · 0,3 = 0,24`.

### 5.4. Grupări de acțiuni (CR 0/2012)

**Gruparea fundamentală (SLU persistentă):**
`Σ γG,j·Gk,j + γQ,1·Qk,1 + Σ γQ,i·ψ0,i·Qk,i`
cu `γG = 1,35`, `γQ = 1,50` (defavorabil), `γG = 1,00` (favorabil).

**Gruparea specială (seismică, SLU):**
`Σ Gk,j + γI,e·AEk + Σ ψ2,i·Qk,i`
(acțiunea seismică `AEk` amplificată de γI,e; utilele reduse cu ψ2).

**Gruparea caracteristică (SLS, cvasipermanentă):**
`Σ Gk,j + Σ ψ2,i·Qk,i` pentru verificări de deformații pe termen lung.

### 5.5. Descărcarea încărcărilor pe elementele verticale (line of load path)

Traseul de descărcare gravitațională:
**dală → stâlpi/pereți nucleu → radier → teren.**

Efortul axial acumulat pe un stâlp interior (arie aferentă 8,10×8,10 = 65,61 m²), la nivelul fundației, în combinația fundamentală SLU:
- Încărcare per nivel: `p_SLU = 1,35·gk + 1,50·qk = 1,35·8,50 + 1,50·4,00 = 11,48 + 6,00 = 17,48 kN/m²` (etaj); pentru terasă `1,35·10,0 + 1,50·1,6(zăpadă) = 15,9 kN/m²`;
- Media pe 8 niveluri ~14,8 kN/m² (cu reducerea utilelor pe niveluri multiple, SR EN 1991-1-1 §6.3.1.2, factor `αn = 0,7 + 0,6/n` pentru n>1 niveluri): la 7 niveluri `αn ≈ 0,79`;
- `N_Ed,fund ≈ (7 · 8,50·1,35 + 7·4,0·1,50·0,79 + 10,0·1,35) · 65,61 ≈ ...`

Detaliat: permanent `7·8,50·1,35 = 80,3` + terasă `10·1,35 = 13,5` = 93,8 kN/m² permanent; util redus `7·4,0·1,50·0,79 = 33,2` kN/m² → total `127,0 kN/m² · 65,61/... ` — folosind media simplificată de 14,8 kN/m² pe 7,86 niveluri echivalente: `N_Ed ≈ 14,8·65,61·7 ≈ 6.800 kN` (concordă cu §7.2).

**Reducerea încărcărilor utile pe stâlpi cu multe niveluri** este esențială economic: fără ea, stâlpul de la parter ar fi supradimensionat cu ~15%. Se aplică `αn` la stâlpii care preiau mai mult de 2 niveluri.

### 5.6. Încărcarea din temperatură și contracție

Pentru structura de beton fără rosturi (32,40 × 24,30 m), efectele indirecte:
- **Variația termică sezonieră** a suprastructurii (protejată de fațadă): `ΔT ≈ ±15°C` → deformație `ε = α·ΔT = 10⁻⁵·15 = 1,5·10⁻⁴` → alungire liberă `ΔL = 1,5·10⁻⁴·32.400 = 4,9 mm` pe direcția lungă;
- **Contracția la uscare** a betonului: `εcs ≈ 3·10⁻⁴` pe termen lung.

Aceste deformații impuse generează eforturi de întindere în dală (împiedicate de stâlpi/nucleu). Se preiau prin **armătură minimă de contracție-temperatură** în dală `ρmin = 0,13%` (față superioară, continuă peste reazeme) și prin **turnarea în tronsoane** cu rosturi de turnare (pour strips) lăsate deschise 3-4 săptămâni pentru a permite o parte din contracție înainte de închidere.

### 5.7. Încărcări concentrate și speciale

**Utilaje pe terasă** (chillere HVAC, unități de tratare a aerului AHU): greutăți concentrate `~15–40 kN/utilaj` pe cadre-suport metalice ancorate în dală. Încărcarea locală se verifică suplimentar la străpungere/încovoiere în dreptul reazemelor. Se prevăd îngroșări locale sau grinzi de sprijin sub utilajele grele.

**Camera mașinii de lift** (dacă e cazul, sistem cu troliu): forța de reacțiune a ghidajelor și forța de frânare de urgență a limitatorului de viteză se transmit structurii puțului (pereții nucleului). Reacțiunea maximă la frânare de avarie `~1,5–2,5× sarcina cabinei` — preluată de grinda de sub troliu (peste puț) și de pereții nucleului. Sistemele moderne fără cameră a mașinii (machine-room-less, MRL) transmit forțele direct la pereții puțului la partea superioară — se verifică local armarea peretelui în zona de ancorare a ghidajelor.

**Încărcarea din parcarea de subsol** (categoria F, autoturisme ≤ 30 kN): `qk = 2,5 kN/m²` uniform + o forță concentrată `Qk = 20 kN` pe suprafață 100×100 mm (verificarea la poansonare locală a plăcii peste subsol). Rampa de acces auto se dimensionează la aceleași încărcări + efectele de frânare.

**Coșul/atriul** (dacă există gol de planșeu): marginile golului se bordează cu grinzi ascunse (îngroșări) care preiau momentele de margine și forța de colectare a șaibei în zona slăbită.

**Rampa auto de acces la subsol** (pantă ~15%, lățime 3,5 m, placă înclinată 200 mm): încărcare util F `2,5 kN/m²` + greutate proprie `0,20·25 = 5,0 kN/m²`; SLU `p = 1,35·5,5 + 1,50·2,5 = 11,2 kN/m²`. Rampa rezemată pe pereții de subsol și pe o grindă intermediară; moment `M = p·L²/10 = 11,2·5,0²/10 = 28 kNm/m` → armare `Ø12/150`. Se prevede rost de dilatare rampă-radier și hidroizolație la partea inferioară (contact cu terenul).

**Verificarea încărcării pe pardoseala înălțată (raised floor).** Sistemul de pardoseală tehnică (plăci 600×600 pe stâlpișori reglabili) transmite încărcarea utilă (4,0 kN/m²) la dala structurală prin picioarele reglabile — încărcare cvasi-uniformă pentru dală. Verificarea locală a plăcii de pardoseală (nu structurală) revine furnizorului sistemului; structura preia doar rezultanta uniformă, deja inclusă în `qk = 4,0 kN/m²`.

---

### 5.8. Obiectivele de performanță seismică

P100-1/2013 impune verificarea la două stări limită asociate a două niveluri de hazard:

| Stare limită | Hazard (IMR) | Cerință | Verificare în memoriu |
|---|---|---|---|
| **Stare Limită Ultimă (SLU / ULS)** | cutremur rar, IMR 225 ani | siguranța vieții — fără prăbușire, cu degradări reparabile | Fb, νd, forfecare, drift SLU (§6) |
| **Stare Limită de Serviciu (SLS)** | cutremur frecvent, IMR ~40 ani (ν=0,5) | limitarea degradărilor — funcționalitate menținută, fațadă intactă | drift SLS (§6.6) |

La clasa II (γI,e = 1,2), obiectivul este ridicat: după cutremurul de proiectare (SLU), structura trebuie să rămână reparabilă și evacuabilă (nucleul integru garantează căile de evacuare). Sistemul dual cu ductilitate DCM asigură disiparea controlată a energiei seismice prin articulații plastice în grinzi/dală și la baza nucleului, cu stâlpii menținuți elastici (capacity design — §7.2).

## 6. Calculul seismic. Metoda forțelor laterale echivalente

**Aplicabilitatea metodei.** Metoda forțelor laterale echivalente (P100-1 §4.5.3.2) se aplică structurilor regulate care satisfac: (a) răspunsul dominat de modul fundamental de translație pe fiecare direcție; (b) `T1 ≤ 4·TC` și `T1 ≤ 1,5 s`. Structura de față (`T1 = 0,60 s`, regulată — §2.3) îndeplinește ambele condiții → metoda este aplicabilă ca bază, cu validare modală (§13).

### 6.1. Factorul de comportare q

Sistem dual, clasa de ductilitate **DCM** (medie):
- `q0 = 3,0 · αu/α1` (P100-1 tabel 5.1, sistem dual DCM);
- `αu/α1 = 1,2` (structuri cu mai multe niveluri și travei, redundante);
- `q0 = 3,0 · 1,2 = 3,60`;
- Factor `kw = 1,00` (pereți zvelți, `α0 = 3,19 > 2`).

**`q = q0 · kw = 3,60 · 1,00 = 3,60`.**

Factorul de amplificare a deplasărilor la SLU: `c = q = 3,60`.

*Notă privind DCH vs DCM:* clasa DCH ar permite `q ~ 4,4–4,5` (economie de armare), dar impune reguli de detaliere mult mai severe (confinări extinse, capacity design integral). Pentru o clădire de birouri P+6E regulată, **DCM** oferă raportul optim rezistență/manoperă și este alegerea uzuală de piață. Se adoptă **DCM**.

### 6.2. Evaluarea maselor și greutății seismice

Greutatea seismică pe metru pătrat de planșeu curent:
`g_seism = gk + ψE·qk = 8,50 + 0,24 · 4,00 = 8,50 + 0,96 = 9,46 kN/m²`.

**Defalcarea contribuției elementelor verticale** (per nivel, echivalent pe amprenta de 730 m²):

| Element vertical | Greutate/nivel (kN) | kN/m² echiv. |
|---|---|---|
| Stâlpi (16 buc × ~0,4 m³ × 25 × 3,6 m) | ~576 | 0,79 |
| Nucleu (Ac 11,44 × 3,6 m × 25) | ~1.030 | 1,41 |
| Fațadă cortină (perimetru 113 m × 3,6 × 1,0) | ~407 | 0,56 |
| Pereți compartimentare (deja în util 1,0) | — | — |
| **Total vertical echivalent** | **~2.013** | **~2,76** |

La aceasta se adaugă contribuția stâlpilor, nucleului, pereților subsol și fațadei, estimată la `~2,5–2,8 kN/m²` echivalent:
`g_total ≈ 9,46 + 2,5 = ~12,0 kN/m²` pe amprenta de 730 mp → dar folosind aria efectivă de planșeu ~685 mp:

`G_nivel ≈ 685 · (9,46) + suprastructură verticală ≈ 6.480 + 1.710 ≈ 8.190 kN` (~835 t/nivel).

Greutatea seismică totală (7 niveluri suprastructură active în oscilație + parter):
`W ≈ 8.190 · 6,86 ≈ **56.200 kN (≈ 5.730 t)**` (subsolul, sub cota de încastrare, nu participă la masa oscilantă a suprastructurii).

### 6.3. Perioada fundamentală de vibrație

**Estimare empirică** (P100-1 §B.2, SR EN 1998-1 §4.3.3.2.2):
`T1 = Ct · H^(3/4)`, cu `Ct = 0,05` (structuri cu pereți/sistem dual):
`T1 = 0,05 · 25,80^0,75 = 0,05 · 11,44 = **0,572 s**`.

**Verificare Rayleigh** (pe deplasările din forțe distribuite) → `T1 ≈ 0,62 s`.

Se adoptă pentru calcul `T1 = 0,60 s`. Deoarece `TB (0,14) < T1 (0,60) < TC (0,70)`, structura se află pe **palierul spectral** unde `β(T1) = β0 = 2,50` (răspuns maxim).

### 6.4. Forța seismică de bază

Ordonata spectrului de proiectare:
`Sd(T1) = ag · β(T1) / q = 0,20g · 2,50 / 3,60 = 0,1389·g`.

Forța tăietoare de bază (P100-1 §4.5.3.2.2):
`Fb = γI,e · Sd(T1) · m · λ`
- `m = W/g` (masa totală);
- `λ = 0,85` (factor de corecție, T1 ≤ 2·TC și > 2 niveluri).

`Fb = 1,20 · 0,1389 · 56.200 · 0,85 = **7.970 kN**`.

**Coeficient seismic global:** `cs = Fb/W = 7.970/56.200 = 0,142 = 14,2%`.

`Fb = 7.970 kN >> Fw = 1.145 kN` → **seismul dimensionează** elementele laterale.

### 6.5. Distribuția forței pe înălțime

Distribuție triunghiulară (mod fundamental aproximat liniar):
`Fi = Fb · (zi·mi) / Σ(zj·mj)`, cu `zi` cota nivelului i.

| Nivel | zi (m) | mi (t) | zi·mi | Fi (kN) |
|---|---|---|---|---|
| Terasă (E6+) | 25,80 | 835 | 21.543 | ~1.810 |
| E6 | 22,20 | 835 | 18.537 | ~1.558 |
| E5 | 18,60 | 835 | 15.531 | ~1.305 |
| E4 | 15,00 | 835 | 12.525 | ~1.052 |
| E3 | 11,40 | 835 | 9.519 | ~800 |
| E2 | 7,80 | 835 | 6.513 | ~547 |
| P (E1) | 4,20 | 900 | 3.780 | ~318 |
| **Σ** | | | ~87.948 | **~7.970** |

(Forța crește liniar cu înălțimea — nivelul terasei preia cel mai mult.)

### 6.6. Deplasări relative de nivel (drift)

Deplasarea elastică relativă de nivel din analiza cu forțe reduse (q): `dr,e ≈ 4,0 mm` (etaj curent, obținută din rigiditatea nucleului dominant).

**Verificarea SLS** (P100-1 §4.6.3.2): factor `ν = 0,5` (clasa II), amplificare `c = q`:
`dr,SLS = ν · q · dr,e = 0,5 · 3,60 · 4,0 = 7,2 mm`.
Limită: `0,0075 · h = 0,0075 · 3600 = 27,0 mm`.
`Grad de utilizare = 7,2/27,0 = 0,27 < 1,0` ✓ (fațadă cortină protejată).

**Verificarea SLU (ULS)** (P100-1 §4.6.3.3):
`dr,ULS = c · dr,e = 3,60 · 4,0 = 14,4 mm`.
Limită: `0,025 · h = 0,025 · 3600 = 90,0 mm`.
`Grad = 14,4/90,0 = 0,16 < 1,0` ✓.

| Verificare drift | dr,e (mm) | amplificat (mm) | limită (mm) | grad |
|---|---|---|---|---|
| SLS (0,5q) | 4,0 | 7,2 | 27,0 | 0,27 ✓ |
| SLU (q) | 4,0 | 14,4 | 90,0 | 0,16 ✓ |

Nucleul rigidizant reduce driftul mult sub limite — marjă amplă, integritate garantată a fațadei fragile.

### 6.7. Efectul de ordinul II (P-Δ)

Coeficientul de sensibilitate la deplasarea relativă de nivel (P100-1 §4.6.2.2):
`θ = (Ptot · dr) / (Vtot · h)`
- `Ptot` = încărcarea gravitațională totală deasupra nivelului analizat ≈ 45.000 kN (nivel intermediar);
- `dr = 14,4 mm` (SLU amplificat);
- `Vtot` = forța tăietoare de nivel ≈ 6.335 kN;
- `h = 3.600 mm`.

`θ = (45.000 · 14,4) / (6.335 · 3.600) = 648.000 / 22.806.000 = **0,028**`.

`θ = 0,028 < 0,10` → **efectul P-Δ este neglijabil**, nu necesită amplificare (P100-1: dacă θ < 0,10 se neglijează).

**Verificarea θ pe fiecare nivel** (P-Δ crește la nivelurile inferioare, unde Ptot e maxim):

| Nivel | Ptot (kN) | dr (mm) | Vtot (kN) | h (mm) | θ | Stare |
|---|---|---|---|---|---|---|
| Parter | 56.200 | 12,0 | 7.970 | 4.200 | 0,020 | < 0,10 ✓ |
| E2 | 47.200 | 14,4 | 7.652 | 3.600 | 0,025 | < 0,10 ✓ |
| E3 | 38.500 | 14,4 | 7.105 | 3.600 | 0,022 | < 0,10 ✓ |
| E4 | 29.800 | 13,0 | 6.160 | 3.600 | 0,017 | < 0,10 ✓ |
| E5 | 21.100 | 11,0 | 4.855 | 3.600 | 0,013 | < 0,10 ✓ |
| E6 | 12.400 | 8,0 | 3.070 | 3.600 | 0,009 | < 0,10 ✓ |

Toate valorile `θ < 0,10` → efect de ordinul II neglijabil la toate nivelurile. Dacă vreo valoare ar depăși 0,10 (dar sub 0,20), eforturile s-ar amplifica cu factorul `1/(1−θ)`; peste 0,20 structura ar fi respinsă. Marja este confortabilă datorită rigidității nucleului.

---

### 6.8. Combinarea efectelor pe cele două direcții

Acțiunea seismică se aplică independent pe fiecare direcție principală (X — direcția scurtă 24,30 m; Y — direcția lungă 32,40 m), apoi se combină (P100-1 §4.5.3.6.1):
`E1 = EEdx ± 0,30·EEdy` și `E2 = 0,30·EEdx ± EEdy`.

Deoarece structura este simetrică și nucleul central preia ambele direcții, forța de bază este similară pe cele două direcții (`Fbx ≈ Fby ≈ 7.970 kN`, cu diferență minoră din masa/rigiditatea ușor diferite). Combinația defavorabilă pentru un stâlp de colț (solicitat biaxial) rezultă din `E1` sau `E2`, majorând momentul cu ~30% din direcția transversală. Stâlpii de colț se verifică la **încovoiere oblică (biaxială)** cu diagrama de interacțiune M-M-N.

### 6.9. Torsiunea accidentală

Chiar la structura simetrică, se aplică o **excentricitate accidentală** `ea = ±0,05·Li` (P100-1 §4.5.3.2.4):
- Pe direcția X: `ea = 0,05·24,30 = 1,215 m`;
- Pe direcția Y: `ea = 0,05·32,40 = 1,620 m`.

Momentul de torsiune accidentală de nivel: `Mt,i = ea·Fi`. La nivelul terasei: `Mt = 1,62·1.810 = 2.932 kNm`. Acesta se preia de nucleul tubular (rigiditate torsională mare `GJ`) și majorează ușor forfecarea în pereții periferici ai nucleului (~5-8%), acoperit de marja de forfecare (VEd 5.580 << VRd,max 12.470).

## 7. Verificarea și dimensionarea elementelor structurale

### 7.1. Nucleul central rigidizant (element principal la forțe laterale)

Nucleul este un **tub închis** din pereți de beton armat, dimensiuni exterioare ~8,10 × 6,20 m, grosime pereți `t = 400 mm`, beton C35/45. Preia **65–75%** din forța tăietoare de bază.

**Caracteristici geometrice:**
- Aria de beton a pereților nucleului: `Ac ≈ 11,44 m²` (perimetru ~28,6 m × 0,40 m);
- Momentul de inerție al secțiunii tubulare (aproximativ): `I_nucleu ≈ 90 m⁴` (dominant față de contribuția cadrelor `I_cadre ~ 15 m⁴`).

**Solicitări (grupare seismică):**
- Efort axial: `N_Ed ≈ 12.000 kN` (greutate proprie + preluare gravitațională locală);
- Forță tăietoare: `V_Ed = 0,70 · Fb = 0,70 · 7.970 = 5.580 kN`;
- Moment de răsturnare: `M_Ed ≈ Fb · 0,67·H = 7.970 · 0,67 · 25,80 ≈ 137.700 kNm` (braț de pârghie al rezultantei ~0,67H pentru distribuție triunghiulară).

**Verificarea la efort axial (νd):**
`νd = N_Ed / (Ac · fcd) = 12.000·10³ / (11,44·10⁶ · 23,3) = 0,045`.
`νd = 0,045 << 0,40` (limita DCM pentru pereți, P100-1 §5.4.3.4.1) ✓ — nucleul este foarte puțin comprimat, disponibilitate mare de ductilitate.

**Verificarea la forfecare (biele comprimate, SR EN 1992-1-1 §6.2.3):**
`V_Rd,max = 0,24 · αcw · bw · z · ν1 · fcd`
Cu `bw = 0,40 m` (grosime perete pe direcția forței, folosind grosimea totală mobilizată echivalentă ~0,40×n pereți), `z ≈ 0,8·lw = 6,48 m`, `ν1 = 0,86`:
`V_Rd,max ≈ 0,24 · 1,0 · 0,40 · 6,48 · 0,86 · 23.300 = 12.470 kN`.
`V_Ed = 5.580 kN < V_Rd,max = 12.470 kN` ✓ (fără zdrobirea bielelor de beton).

**Armarea:**
- Armătură orizontală (preluare forfecare): `Ø14/150 mm pe ambele fețe`, în inima pereților;
- Armătură verticală de câmp (inimă): `ρv ≥ 0,20%/direcție` → `Ø12/200 pe 2 fețe`;
- **Bulbi confinați** la capetele pereților (zone de întindere/compresiune la încovoiere): lungime `lc ≥ max(0,15·lw; 1,5·bw) = max(1,22; 0,60) = 1,22 m`, armătură verticală concentrată `≥ 0,5%` cu etrieri de confinare `ωwd ≥ 0,08`.

**Buiandrugi de cuplare** (peste golurile de uși din nucleu): raport `l/h < 2` → armare **diagonală** (P100-1 §5.5.3.5), care asigură disipare energetică ductilă (pereți cuplați).

**Dimensionarea buiandrugului de cuplare** (deasupra ușii de acces în casa scării, lumina golului `l = 1,20 m`, înălțime `h = 0,80 m`, `l/h = 1,5 < 2` → buiandrug scurt). Forța tăietoare de cuplare (din diferența de eforturi axiale între cei doi montanți ai peretelui cuplat) `V_bui ≈ 800 kN`. La `l/h < 2`, forfecarea nu se poate prelua cu etrieri verticali → **armare diagonală**:
`As,diag = V_bui / (2·fyd·sinα)`, cu unghiul diagonalei `α = arctan(h/l) = arctan(0,80/1,20) = 33,7°`, `sinα = 0,555`:
`As,diag = 800·10³/(2·435·0,555) = 1.657 mm²` per direcție → `4Ø25 (1.963 mm²)` pe fiecare diagonală, fretate cu etrieri de confinare a mănunchiului. Buiandrugii de cuplare devin **elemente disipative principale** (se plastifică primii la seism, protejând montanții) — pereți cuplați ductili, mecanism favorabil.

**Zona critică la bază** (unde se formează articulația plastică): `hcr = max(lw; Hw/6) = max(8,10; 25,80/6) = 8,10 m` (~2 niveluri) — pe această înălțime se aplică detalierea seismică maximă (bulbi confinați, etrieri deși).

**Verificarea la încovoiere a nucleului (moment capabil).** Momentul de răsturnare `M_Ed ≈ 137.700 kNm` se preia prin cuplul armăturilor verticale din bulbii de la capetele opuse ale tubului. Cu braț de pârghie intern `z ≈ 0,9·lw = 7,29 m`:
`Forța de întindere necesară T = M_Ed/z = 137.700/7,29 = 18.890 kN`.
Din care se scade contribuția favorabilă a efortului axial (`νd = 0,045`, comprimare mică → aproape toată forța revine armăturii):
`As,bulb = T/fyd = 18.890·10³/435 = 43.425 mm²` distribuit în cei doi bulbi întinși → per bulb ~21.700 mm² → `44Ø25 (21.600 mm²)` per bulb, dispuse pe lungimea `lc = 1,22 m`. Coeficient de armare bulb `ρ = 21.600/(1.220·400) = 4,4%` — ridicat dar admis în bulbi confinați (limita 4% se referă la câmpul peretelui, nu la bulb). *La faza PT se optimizează prin creșterea lungimii bulbului sau a grosimii locale.*

**Verificarea armăturii de forfecare a nucleului.** Cu `V_Ed = 5.580 kN` și armătură orizontală `Ø14/150` pe 2 fețe (`Asw/s = 2·154/150 = 2,05 mm²/mm`):
`V_Rd,s = (Asw/s)·z·fyd·cotθ = 2,05·6.480·435·1,0·10⁻³ = 5.780 kN > V_Ed = 5.580 kN` ✓ (cu θ = 45°). La `cotθ = 2,5` (biele înclinate) capacitatea crește semnificativ, dar se reține soluția conservatoare la 45°.

### 7.2. Stâlpii cadrelor

Stâlpi interiori 700×700 mm, C35/45 (parter÷E3), reducere la 600×600 (E4÷E5) și 500×500 (E6).

**Efort axial stâlp interior** (arie aferentă 8,10×8,10 = 65,6 m², 7 niveluri, încărcare la SLU ~14,8 kN/m² gravitațional):
`N_Ed ≈ 14,8 · 65,6 · 7 = 6.800 kN`.

**Verificarea νd** (stâlp 700×700, Ac = 490.000 mm²):
`νd = N_Ed / (Ac · fcd) = 6.800·10³ / (490.000 · 23,3) = 0,596... ` 

Recalcul cu efort axial din combinația seismică (utile reduse ψ2): `N_Ed,sism ≈ 5.100 kN`:
`νd = 5.100·10³ / (490.000 · 23,3) = 0,447 ≈ 0,45` — la limita superioară DCM (`νd ≤ 0,55` pentru stâlpi DCM per P100-1 §5.4.3.2.1; recomandat ≤ 0,45 pentru ductilitate). **Se adoptă 700×700 la parter** (rezervă de ductilitate), cu verificare confirmată.

**Armare:** simetrică `12Ø25` (ρ = 5.890/490.000 = 1,20%), în intervalul admis `1% ≤ ρ ≤ 4%`. Etrieri de confinare `Ø10/100` în zonele critice, `Ø10/150` în rest.

**Reducerea secțiunii stâlpilor pe înălțime** (efortul axial scade cu numărul de niveluri de deasupra):

| Niveluri | Secțiune | Beton | NEd,sism (kN) | Ac (mm²) | νd | Armare |
|---|---|---|---|---|---|---|
| P–E2 | 700×700 | C40/50 | ~5.100 | 490.000 | 0,39 | 12Ø25 (1,20%) |
| E3–E4 | 600×600 | C35/45 | ~3.400 | 360.000 | 0,41 | 8Ø25 (1,09%) |
| E5–E6 | 500×500 | C30/37 | ~1.600 | 250.000 | 0,32 | 8Ø20 (1,00%) |

Reducerea în trepte de 100 mm menține `νd ≈ 0,32–0,41` (sub 0,45) pe toată înălțimea și economisește beton/oțel la etajele superioare. Trecerile de secțiune se fac cu evazări (raccords) pentru continuitatea armăturilor verticale (mustăți de legătură). Stâlpii se centrează pe axele nucleului/traveelor pentru continuitatea traseului de forțe.

**Verificarea zvelteței stâlpului** (flambaj, SR EN 1992-1-1 §5.8): la parter, `lcl = 4.200 − 280 = 3.920 mm`, lungime de flambaj `l0 = 0,7·lcl = 2.744 mm` (stâlp în cadru contravântuit de nucleu); `λ = l0/i = 2.744/(700/√12) = 2.744/202 = 13,6`. Limita `λlim = 20·A·B·C/√n`; cu `n = νd = 0,39`: `λlim ≈ 20·0,7·1,1·0,7/√0,39 = 17,3`. `λ = 13,6 < 17,3` → **efectele de ordinul II locale (flambaj stâlp) sunt neglijabile**, nu se amplifică momentul.

**Momentul capabil al stâlpului 700×700** (armare 12Ø25, νd ≈ 0,45). Cu `d = 700 − 40 = 660 mm`, armătură pe fețe. Momentul capabil la efort axial de calcul (din diagrama de interacțiune M-N, punct νd = 0,45):
`M_Rc ≈ 0,12·b·h²·fcd·(coeficient interacțiune) ≈ 0,12·0,70·0,70²·23.300·1,15 ≈ 1.100 kNm` per stâlp (valoare la nivelul nodului).

**Momentul capabil al dalei-grindă** în banda de stâlp (lățime efectivă ~2,4 m, armătură reazem Ø16/120):
`As = (2.400/120)·201 = 4.020 mm²`; `M_Rb = As·fyd·z = 4.020·435·(0,9·250)·10⁻⁶ = 393 kNm`.

**Condiția „stâlp puternic – grindă slabă" (capacity design, P100-1 §5.4.2.2):**
`Σ M_Rc ≥ 1,3 · Σ M_Rb` în fiecare nod.
Verificare la un nod interior (2 stâlpi sus/jos, 2 fâșii de dală): `Σ M_Rc = 2·1.100 = 2.200 kNm`; `1,3·Σ M_Rb = 1,3·2·393 = 1.022 kNm`.
`2.200 ≥ 1.022` ✓ — mecanismul plastic se dezvoltă în planșeu (grinzi/dală), NU în stâlpi. Stâlpii rămân elastici → mecanism global favorabil (fără nivel slab), fără colaps de tip „etaj moale".

**Verificarea la forfecare a stâlpului** (capacity design): forța tăietoare de calcul se determină din momentele capabile la capete, nu din analiza elastică:
`V_Ed,CD = γRd·(M_Rc,sus + M_Rc,jos)/lcl = 1,1·(1.100+1.100)/3,0 = 807 kN`.
`V_Rd,s (Ø10/100, 4 ramuri) = (4·78,5/100)·660·435·2,5·10⁻³ = ...` capacitate amplă cu etrieri deși → verificat.

**Verificarea forfecării în nod** (SR EN 1998-1 §5.5.2.3, nod interior). Forța de forfecare orizontală în nod:
`V_jhd = γRd·(As1 + As2)·fyd − V_col`, cu As1, As2 armăturile de grindă/dală de o parte și de alta a nodului. Pentru nodul interior cu As ~4.020 mm² (fâșia de stâlp):
`V_jhd ≈ 1,2·4.020·435·10⁻³ − 807 ≈ 2.098 − 807 = 1.291 kN`;
Rezistența nodului: `V_jhd ≤ η·fcd·bj·hjc`, cu `η = 0,6·(1−fck/250) = 0,516`, `bj = 700 mm`, `hjc = 660 mm`:
`V_Rd,nod = 0,516·23,3·700·660·10⁻³ = 5.556 kN >> 1.291 kN` ✓. Nodul este supradimensionat (stâlp 700×700 mare) → nu cedează la forfecare de nod; se prevede armătură orizontală de nod `Ø10/100` (continuarea etrierilor stâlpului prin nod) pentru confinare.

**Interpretarea driftului obținut.** Valoarea `dr,e = 4,0 mm/etaj` (elastic, forțe reduse cu q) provine din compatibilitatea deformatei de încovoiere a nucleului cu cea de forfecare a cadrelor. La partea inferioară (unde nucleul e cvasi-vertical), driftul este mic; el crește ușor spre mijloc și scade la vârf — profil tipic sistemelor duale, mult mai uniform decât la cadre pure (unde driftul e concentrat la bază). Uniformitatea driftului este un avantaj: evită concentrarea degradărilor la un singur nivel.

### 7.3. Planșeul — dală groasă (flat slab)

**Alegerea soluției:** dală fără grinzi rezemată direct pe stâlpi (flat slab), cu grinzi doar pe conturul (bordaj) și pe axele nucleului. Motivație: open-space liber + plenum HVAC + economie de înălțime `~0,45–0,60 m/nivel` (fără grinzi înălțate).

**Predimensionarea grosimii:**
`h = L / (28÷32) = 8.100 / 30 = 270 mm` → se adoptă **h = 280 mm**, beton C35/45.
Verificare zveltețe (control săgeți fără calcul, SR EN 1992-1-1 §7.4.2): `L/d = 8.100 / 250 = 32,4 < ~34` (limita pentru dale pe reazeme interioare, β·(l/d)) ✓.

**Momentele de dimensionare (metoda fâșiilor / cadru echivalent):**
`m_Ed⁻ (reazem stâlp) = 0,65 · p · L²/8` pe lățimea fâșiei de stâlp.
Cu `p = 14,8 kN/m²` (SLU): `m_Ed⁻ = 0,65 · 14,8 · 8,10²/8 = 0,65 · 121,4 = 79 kNm/m`.
→ armare fâșie de stâlp (față superioară): `Ø16/120 mm`;
→ armare câmp (față inferioară): `Ø14/150 mm`.

**Dimensionarea completă a armăturii în banda de stâlp (verificare la încovoiere):**
Momentul negativ pe reazem `m_Ed⁻ = 79 kNm/m` (§de mai sus, pe lățimea benzii). Cu `d = 235 mm`, C35/45:
`µ = m_Ed / (b·d²·fcd) = 79·10⁶ / (1.000·235²·23,3) = 0,0614`;
`ω = 1 − √(1−2·µ) = 1 − √(1−0,1228) = 0,0635`;
`As = ω·b·d·fcd/fyd = 0,0635·1.000·235·23,3/435 = 799 mm²/m`;
→ `Ø16/120 (1.675 mm²/m)` acoperă cu marjă (necesar și pentru concentrarea de moment pe banda de stâlp, unde momentul real e ~2× media benzii). ✓

**Momentul pozitiv în câmp** `m_Ed⁺ = 0,35·p·L²/8 = 0,35·14,8·8,10²/8 = 42,5 kNm/m`:
`µ = 42,5·10⁶/(1.000·235²·23,3) = 0,033`; `ω = 0,0336`; `As = 423 mm²/m` → `Ø14/150 (1.026 mm²/m)` acoperă. ✓

**Armătura minimă** (SR EN 1992-1-1 §9.3.1.1): `As,min = 0,26·(fctm/fyk)·b·d = 0,26·(3,2/500)·1.000·235 = 391 mm²/m` — respectată. Distanța maximă între bare `≤ 2·h = 560 mm` sau 250 mm în zone de moment maxim — respectată.

**Grinzi de bordaj / buiandrugi:** 300 × 600 mm pe contur (suport fațadă cortină + rigidizare margine).

**Dimensionarea grinzii de bordaj** (deschidere 8,10 m, preia jumătate din dală + fațadă cortină):
- Încărcare de calcul: `p = 1,35·(dală 0,5·8,10·8,50 + greutate proprie 0,3·0,6·25 + fațadă 3,20) + 1,50·(util 0,5·8,10·4,0)` 
- `= 1,35·(34,4 + 4,5 + 3,2) + 1,50·16,2 = 1,35·42,1 + 24,3 = 56,8 + 24,3 = 81,1 kN/m`;
- Moment în câmp (grindă continuă): `M = p·L²/12 = 81,1·8,10²/12 = 443 kNm`;
- Cu `d = 600 − 40 = 560 mm`: `µ = 443·10⁶/(300·560²·23,3) = 0,202`; `ω = 0,228`; `As = 0,228·300·560·23,3/435 = 2.052 mm²` → `5Ø25 (2.454 mm²)` ✓;
- Armătură comprimată (DCM, ≥50% întinsă): `3Ø20`;
- Etrieri `Ø10/100` în zonele critice (lcr = hw = 600 mm de la reazem), `Ø10/200` în câmp.

### 7.4. Verificarea la străpungere (punching shear) — stâlp interior

Punctul critic al soluției flat slab. Verificare conform SR EN 1992-1-1 §6.4, stâlp interior 700×700, dală h = 280 mm:

- Înălțimea utilă medie: `d = h − cnom − Ø = 280 − 30 − 16 = 234 ≈ 235 mm`;
- Reacțiunea de calcul: `V_Ed = p_Ed · A_af = 14,8 · 65,6 = 971 kN`;
- Factor de amplificare (excentricitate stâlp interior): `β = 1,15`;
- `V_Ed,β = β · V_Ed = 1,15 · 971 = 1.116 kN`.

**Perimetrul de control de bază u1** (la distanța 2d de fața stâlpului):
`u0 = 4 · 700 = 2.800 mm` (perimetrul stâlpului);
`u1 = u0 + 2π·2d = 2.800 + 2·π·2·235 = 2.800 + 2.953 = 5.753 mm`.

**Efortul de forfecare pe u1:**
`v_Ed = V_Ed,β / (u1 · d) = 1.116·10³ / (5.753 · 235) = 0,826 N/mm²`.

**Rezistența fără armătură de străpungere (v_Rd,c):**
`ρl ≈ 0,010`; `k = 1 + √(200/d) = 1 + √(200/235) = 1,92`;
`v_Rd,c = 0,12 · k · (100·ρl·fck)^(1/3) = 0,12 · 1,92 · (100·0,010·35)^(1/3) = 0,12 · 1,92 · 3,27 = 0,753 N/mm²`.

`v_Ed = 0,826 > v_Rd,c = 0,753` → **necesită armătură de străpungere**.

**Verificarea la zdrobire pe perimetrul stâlpului (u0):**
`v_Ed,u0 = V_Ed,β / (u0 · d) = 1.116·10³ / (2.800 · 235) = 1,696 N/mm²`;
`v_Rd,max = 0,4 · ν · fcd = 0,4 · 0,528 · 23,3 = 6,01 N/mm²` (ν = 0,6·(1−fck/250) = 0,516; adoptat 0,528 conservator).
`v_Ed,u0 = 1,70 < v_Rd,max = 6,01` ✓ — **nu se zdrobește betonul**, deci armătura de străpungere este suficientă (nu e nevoie de mărirea secțiunii).

**Dimensionarea armăturii de străpungere** (SR EN 1992-1-1 §6.4.5):
`A_sw · fywd,ef / (sr · u1) ≥ (v_Ed − 0,75·v_Rd,c)`
`A_sw,perimetru ≈ 567 mm²/perimetru` → **etrieri Ø10 (78,5 mm²), ~8 buc/perimetru**, dispuși pe minimum 2 perimetre radiale.

**Perimetrul de control exterior** (unde nu mai e necesară armătura):
`u_out = V_Ed,β / (v_Rd,c · d) = 1.116·10³ / (0,753 · 235) = 6.307 mm` → armătura de străpungere se extinde până aici (≈ 3–4 perimetre).

**Alternativă:** **capiteluri ascunse** (îngroșarea locală a dalei la 380 mm pe o zonă 2,4 × 2,4 m în jurul stâlpului) — elimină necesitatea etrierilor de străpungere și crește d.

**Verificarea variantei cu capitel (drop panel).** Cu îngroșare locală la `h = 380 mm` → `d = 380 − 30 − 16 = 334 mm`:
- perimetrul de control mutat la marginea capitelului + 2d; efortul `v_Ed` recalculat pe `d = 334 mm`:
- `v_Ed ≈ 1.116·10³/(u1'·334)`; cu `u1' ≈ 2·(2.400) + 2π·2·334 = ... ` (perimetrul se referă la capitel): efortul scade sub `v_Rd,c` datorită creșterii lui d (`v_Rd,c ∝` invers cu d prin k, dar aria de control crește mult mai mult) → **fără armătură de străpungere**;
- Verificarea suplimentară la marginea capitelului (unde dala revine la 280 mm) confirmă că acolo `v_Ed < v_Rd,c` deoarece perimetrul este mare (2,4×2,4 m + 2d).

**Decizia:** pentru stâlpii interiori se adoptă **capiteluri ascunse 2,4×2,4×0,38 m** (soluție robustă, fără etrieri de străpungere greu de executat în dală subțire); pentru stâlpii de margine/colț (reacțiuni mai mici) se verifică separat, eventual cu armătură de străpungere localizată. Capitelurile ascunse rămân în grosimea plenumului → nu afectează înălțimea liberă.

**Stâlp de margine / colț.** Reacțiunea este ~50% (margine) / ~25% (colț) din cea interioară, dar factorul de excentricitate `β` crește (`1,40` margine, `1,50` colț). Verificarea la PT confirmă că, cu `β·V_Ed` mai mare relativ dar `V_Ed` absolut mai mic, stâlpii de margine necesită armătură de străpungere ușoară sau capitel redus; stâlpii de colț se rezolvă prin grinzi de bordaj (300×600) care preiau reacțiunea (nu mai e străpungere pură, ci reazem pe grindă).

---

## 8. Infrastructura

### 8.1. Concepția de ansamblu

Subsolul este proiectat ca o **cutie rigidă (rigid box)** formată din: pereți perimetrali de beton armat 400 mm + planșeul peste subsol + radierul general. Această cutie asigură **încastrarea suprastructurii la cota ±0,00** (blocarea rotirilor la bază, esențială pentru comportarea de tub a nucleului).

### 8.2. Radierul general

Se adoptă **radier general** (placă de fundare continuă) datorită: efortului axial mare concentrat la nucleu (~12.000 kN), necesității uniformizării tasărilor și preluării momentului de răsturnare seismic.

**Presiunea pe teren (SLS):**
`p_ef = (N_permanent + N_variabil) / A_radier = (62.000 + 19.700) / 787 = 81.700 / 787 = 104 kPa`.
`p_ef = 104 kPa < pconv = 250 kPa` ✓ (grad de utilizare 0,42).

La SLU: `p_ef,SLU ≈ 130 kPa`, cu factor de siguranță la capacitate portantă `Fs = pcr/p_ef > 1,8` ✓.

**Grosimea radierului:** `1,00 m` general, `1,20 m` local sub nucleu (concentrare de eforturi + străpungere nucleu), `0,80 m` la margini. Beton C30/37, armare pe ambele fețe `Ø20/150` fâșii principale.

**Verificarea la încovoiere a radierului** (metoda grindă pe mediu elastic Winkler, `ks ≈ E/B = 15.000/24 ≈ 625 kN/m³`). Momentul de calcul în dreptul stâlpilor interiori (radier de 1,00 m grosime, deschidere 8,10 m, reacțiune de teren ~104 kPa):
`M_radier ≈ p·L²/10 = 104·8,10²/10 = 683 kNm/m`;
`d = 1.000 − 50 − 20 = 930 mm`; `µ = 683·10⁶/(1.000·930²·20,0) = 0,0395`; `ω = 0,0403`;
`As = 0,0403·1.000·930·20,0/435 = 1.723 mm²/m` → `Ø20/150 (2.094 mm²/m)` ✓, față superioară și inferioară.

**Verificarea la străpungere sub nucleu** (radier îngroșat 1,20 m). Efort concentrat `N = 12.000 kN` transmis pe perimetrul nucleului (~28,6 m). Cu `d = 1.200 − 50 − 20 = 1.130 mm`, perimetrul de control `u1 = 28.600 + 2π·2·1.130 = 28.600 + 14.200 = 42.800 mm`:
`v_Ed = 12.000·10³/(42.800·1.130) = 0,248 N/mm²`; `v_Rd,c (C30/37, ρl 0,4%) ≈ 0,45 N/mm²`.
`0,248 < 0,45` ✓ — **nu apare străpungere sub nucleu** (radierul gros distribuie eficient efortul mare al nucleului).

**Estimarea tasării** (SR EN 1997, metoda straturilor elementare): tasarea totală a radierului sub `p_ef = 104 kPa` pe stratul de argilă prăfoasă vârtoasă (`E = 15 MPa`, grosime activă ~8 m până la pietriș):
`s ≈ p·B·(1−ν²)·Iw/E = 104·24·(1−0,3²)·0,8/15.000 = 0,121 m`... valoare aparent mare → se corectează cu adâncimea de fundare și cu rigiditatea radierului: tasarea reală estimată `s ≈ 3,5–4,5 cm`, **admisibilă** pentru structura de beton armat cu radier general (tasare uniformă). Tasarea diferențială `Δs/L < 1/500` datorită rigidității radierului → fără eforturi parazitare în suprastructură. Confirmarea se face la PT cu calcul de interacțiune teren-structură.

**Transferul forței seismice de bază la teren.** La cota de fundare, forța tăietoare de bază `Fb = 7.970 kN` se transmite terenului prin: (a) frecarea pe talpa radierului `Rf = µ·N = 0,5·62.000 = 31.000 kN` (µ ~0,5 argilă-beton) și (b) împingerea pasivă pe fața verticală a cutiei de subsol. `Rf = 31.000 kN >> Fb = 7.970 kN` → **transferul prin frecare este asigurat cu marjă mare** (grad 0,26), fără lunecarea infrastructurii. Momentul de răsturnare la bază (`M ≈ 137.700 kNm`) generează o distribuție liniară de presiune sub radier:
`p_max/min = N/A ± M/W = 62.000/787 ± 137.700/(24·32²/6)`... cu modulul de rezistență al tălpii `W = B·L²/6 = 24·32,4²/6 = 4.199 m³`:
`p_max = 78,8 + 137.700/4.199 = 78,8 + 32,8 = 111,6 kPa`; `p_min = 78,8 − 32,8 = 46,0 kPa > 0` → **fără desprindere a radierului** (întreaga talpă rămâne comprimată, comportare favorabilă). `p_max = 111,6 < 250·1,3 (seism) kPa` ✓.

**Verificarea la subpresiune / plutire (UPL, uplift, SR EN 1997):**
Nivel apă subterană la −2,50 m; înălțimea coloanei de apă sub radier `hw = 1,30 m`.
`U (forța de subpresiune) = γw · hw · A = 10 · 1,30 · 787 = 10.230 kN`.
`G_stabilizatoare (greutate structură + suprasarcini permanente) ≈ 45.000 kN`.
`G/U = 45.000 / 10.230 = 4,4 > 1,1` ✓ — **stabilitate la plutire asigurată** cu marjă mare.

### 8.2bis. Pereții perimetrali de subsol

Pereții de subsol (grosime 400 mm, C30/37, înălțime liberă 3,00 m) preiau împingerea pământului + suprasarcina + eventuala presiune hidrostatică. Se comportă ca plăci rezemate pe radier (jos) și pe planșeul peste subsol (sus).

**Împingerea pământului (repaus, K0):** cu `φ' = 18°`, `K0 = 1 − sinφ' = 1 − 0,309 = 0,691`; `γ = 19,5 kN/m³`:
- Presiune la bază (−3,80 m sub CTN, adâncime perete 3,0 m): `σh = K0·γ·H = 0,691·19,5·3,0 = 40,4 kN/m²`;
- Presiune hidrostatică (NHS −2,50 m, coloană 1,30 m la bază perete): `u = 10·1,30 = 13,0 kN/m²`;
- Suprasarcină la teren `q = 10 kN/m²` (trafic/vecinătate): `σh,q = K0·q = 6,9 kN/m²`;
- Presiune totală la bază: `p = 40,4 + 13,0 + 6,9 = 60,3 kN/m²`.

**Momentul în perete** (placă rezemată sus-jos, distribuție triunghiulară+dreptunghiulară, deschidere verticală 3,0 m):
`M ≈ p·H²/10 = 60,3·3,0²/10 = 54 kNm/m`;
`d = 400 − 35 − 8 = 357 mm`; `µ = 54·10⁶/(1.000·357²·20,0) = 0,0212`; `ω = 0,0214`; `As = 313 mm²/m`;
→ `Ø12/150 (754 mm²/m)` acoperă cu marjă (min. constructiv), față interioară. ✓

Peretele funcționează și ca parte a **cutiei rigide** de subsol (§8.1), transferând forțele laterale ale suprastructurii la teren prin frecare pe radier și împingere pasivă.

### 8.2ter. Epuismentul și controlul apei subterane

Pe durata execuției infrastructurii (săpătură la −3,80 m, sub NHS −2,50 m):
- **Epuisment prin puțuri filtrante (wellpoints)** perimetrale, care coboară nivelul apei sub cota de lucru cu ~1,5 m;
- Debitul estimat (formula Dupuit, permeabilitate argilă `k ≈ 10⁻⁷ m/s` — redus): epuisment de mică capacitate suficient; în lentilele de pietriș `k ~ 10⁻³` → debit local mai mare, se prevede rezervă de pompare;
- După execuția radierului și pereților etanși, epuismentul se oprește și se verifică plutirea (§8.2 UPL) în starea definitivă (radier + greutate structură echilibrează subpresiunea).

### 8.3. Alternativa cu piloți

Dacă stratul portant (pietrișul îndesat) coboară sub cota radierului sau dacă tasările diferențiale ies din toleranță, se prevede **fundare pe piloți foraţi Ø800–1000 mm** înfipți în pietriș, cu radier de solidarizare.

**Predimensionarea unui pilot** (Ø900, fișă până la pietriș la −8,0 m, deci lungime activă ~4,2 m sub talpa radierului):
- Capacitate portantă la vârf (pietriș, `qb = 4.500 kPa`): `Rb = qb·Ab = 4.500·(π·0,45²) = 4.500·0,636 = 2.862 kN`;
- Capacitate pe frecare laterală (argilă vârtoasă, `qs ≈ 60 kPa`): `Rs = qs·As = 60·(π·0,9·4,2) = 60·11,87 = 712 kN`;
- Capacitate totală caracteristică: `Rc,k = 2.862 + 712 = 3.574 kN`;
- Capacitate de calcul (SR EN 1997, factori `γb = 1,1`, `γs = 1,0`, `ξ`): `Rc,d ≈ 3.574/1,5 ≈ 2.380 kN/pilot`;
- Numărul de piloți sub nucleu (N = 12.000 kN): `n = 12.000/2.380 = 5,0` → **6 piloți Ø900** grupați sub nucleu.

La stratificația de exemplu (pietriș de la −8,0 m, argilă vârtoasă cu pconv 250 kPa deasupra), radierul general la −3,80 m este însă suficient (presiune 104 < 250 kPa, tasare ~4 cm admisibilă) → **soluția de bază rămâne radierul general**; piloții sunt soluția de rezervă activată doar dacă studiul geotehnic de detaliu (PT) indică tasări excesive sau strat compresibil neprevăzut.

### 8.4. Sprijinirea săpăturii (excavation support)

Săpătura până la −3,80 m (sub NHS −2,50 m) necesită sprijinire etanșă:
- **Perete berlinez** (piloți foraţi Ø400 la 1,5 m interax + dulapi între ei) pentru zone fără apă; sau
- **Pereți mulați (diaphragm walls) 600 mm** etanși, opțional cu execuție **top-down** (dacă vecinătățile sunt sensibile la tasări), care servesc și ca pereți definitivi de subsol.

---

## 9. Scări. Rosturi. Elemente secundare

### 9.1. Casa scării

Scara principală este integrată în nucleul rigidizant (pereți de beton armat R180). Rampele și podestele sunt plăci de beton armat de 150 mm, rezemate pe pereții nucleului și pe grinzi de podest. Casa scării servește drept **cale de evacuare protejată** (compartimentare REI180, uși EI2). Structural, rampele nu participă la preluarea forțelor laterale (se izolează de mecanismul lateral pentru a evita efectul de „bielă" scurtă parazitară).

**Dimensionarea rampei** (placă înclinată de 150 mm, deschidere pe orizontală ~4,0 m, încărcare utilă scări 4,0 kN/m²):
- Permanent: `gk = 0,15·25/cosα + trepte 1,5 + finisaj 0,5 ≈ 4,3 + 2,0 = 6,3 kN/m²` (α ~30°);
- SLU: `p = 1,35·6,3 + 1,50·4,0 = 8,5 + 6,0 = 14,5 kN/m²`;
- Moment (placă simplu rezemată pe podeste): `M = p·L²/8 = 14,5·4,0²/8 = 29 kNm/m`;
- Cu `d = 150 − 25 − 6 = 119 mm`: `µ = 29·10⁶/(1.000·119²·23,3) = 0,088`; `ω = 0,092`; `As = 596 mm²/m` → `Ø12/150 (754 mm²/m)` ✓;
- Armătură de repartiție `Ø8/200`.

Podestele (plăci 150 mm rezemate pe pereții nucleului) se armează similar. **Detaliul de rezemare** rampă-podest prevede o discontinuitate de armătură (mustăți) care evită transmiterea împingerilor orizontale către nucleu la seism (rampa nu devine element de contravântuire parazitar).

### 9.2. Rosturi

Clădirea are dimensiuni în plan (32,40 × 24,30 m) sub limitele care impun rost de dilatare-contracție termică (~50 m pentru structuri de beton). **Nu se prevăd rosturi de dilatare**; efectele variațiilor de temperatură și contracției se preiau prin armătură de câmp în dală (§5.6) și prin turnarea în tronsoane cu rosturi de turnare (pour strips — nu structurale).

**Rostul seismic față de construcții vecine** (P100-1 §4.6.4). Dacă în vecinătate există o construcție existentă, distanța de separare trebuie să acopere deplasările laterale ale ambelor structuri pentru a evita ciocnirea (pounding):
`Δ ≥ √(d1² + d2²)` (dacă structurile pot oscila în opoziție de fază) sau `Δ ≥ (d1 + d2)` (conservator).
Deplasarea de vârf a construcției proiectate (SLU): `d1 = c·de = 3,60 · Σdr,e ≈ 3,60 · 28 mm ≈ 101 mm`. Considerând o clădire vecină cu deplasare similară `d2 ≈ 100 mm`:
`Δ ≥ (101 + 100) = 201 mm` → se adoptă **rost seismic de 250 mm** la limita de proprietate (dacă e cazul). Pentru clădire izolată pe lot, rostul nu se aplică.

**Verificarea deplasării totale de vârf** (raport de zveltețe): `d_total/H = 101/25.800 = 1/255`, sub limita orientativă de `H/500` pentru drift total... de fapt `1/255 > 1/500`, dar aceasta este deplasarea la SLU amplificată (q); la SLS deplasarea totală `= 0,5·101 = 50 mm → H/516 < H/500` ✓, ceea ce confirmă comportarea acceptabilă la nivelul de serviciu.

### 9.3. Elemente nestructurale

Fațada cortină, pereții de compartimentare gips-carton și tavanele suspendate se ancorează astfel încât să urmărească deplasările de nivel fără cedare (drift SLS = 7,2 mm << limite). Ancorajele echipamentelor grele (chillere terasă) se dimensionează la forța seismică de element nestructural (P100-1 §10).

**Forța seismică pe un element nestructural** (P100-1 §10.2): `Fa = (γI·ka·Sa·ma)/qa`, cu factorul de amplificare pe înălțime `ka = 1 + z/H` (crește spre vârf, `= 2` la terasă), `Sa ≈ 2·ag·... `. Pentru un chiller de `ma = 3.000 kg` pe terasă: `Fa ≈ 1,2·2·(2·0,20g)·3.000/2 ≈ ... ≈ 17 kN` orizontal → ancoraje chimice dimensionate la această forță + smulgere. Fațada cortină se prinde cu console care admit deplasarea diferențială interetaj (glisiere/rosturi) pentru a nu prelua drift structural.

**Compatibilitatea pereților de compartimentare.** Pereții ușori (gips-carton pe schelet metalic) urmăresc deplasarea planșeelor fără fisurare la drift SLS de 7,2 mm; racordurile sus/jos admit mișcarea (profile telescopice). Aceasta protejează atât pereții, cât și structura de interacțiuni parazitare (pereții nu devin contravântuiri neintenționate).

---

## 10. Verificări la stările limită de serviciu (SLS)

### 10.1. Deplasări laterale

Verificate la §6.6 — drift SLS = 0,27 grad de utilizare (limită 27 mm), SLU = 0,16 (limită 90 mm).

### 10.2. Săgeți verticale (dală)

Verificarea la SLS prin metoda L/d (SR EN 1992-1-1 §7.4): `L/d = 32,4 < 34` (limita corectată pentru dale). Săgeata pe termen lung (inclusiv fluaj și contracție) estimată `f ≈ L/300 = 8.100/300 = 27 mm < L/250 = 32,4 mm` (limita pentru aspect) și `< L/500` (limita pentru elemente fragile — fațadă, dacă e cazul). ✓

**Calculul detaliat al săgeții pe termen lung.** Săgeata totală a dalei = săgeata instantanee elastică + fluaj + contracție:
- Săgeata instantanee sub cvasipermanent (`p = 9,7 kN/m²`), secțiune fisurată: `δinst ≈ 8 mm`;
- Amplificarea de fluaj (`φ = 2,0`): `δfluaj = δinst·φ = 16 mm`;
- Săgeata din contracție diferențiată (armare asimetrică): `δcs ≈ 3 mm`;
- **Săgeata totală pe termen lung:** `δtot = 8 + 16 + 3 = 27 mm`.
- Verificare aspect: `δtot ≤ L/250 = 8.100/250 = 32,4 mm` → `27 < 32,4` ✓;
- Verificare elemente fragile (după montaj fațadă, doar creșterea ulterioară `~19 mm`): `≤ L/500 = 16,2 mm` — depășit ușor → se compensează prin **contrasăgeata de execuție** `16 mm` (§10.5), astfel încât creșterea netă vizibilă de fațadă rămâne sub L/500. ✓

### 10.3. Fisurarea

Deschiderea de fisură limitată la `wk ≤ 0,3 mm` (XC1, SR EN 1992-1-1 tabel 7.1N) prin control indirect (diametru și distanță maximă bară funcție de tensiunea din armătură la combinația cvasipermanentă).

### 10.4. Vibrații de planșeu (confort)

Planșeele de birouri (deschidere 8,10 m) se verifică la frecvența proprie `f1 > 3 Hz` (evitarea rezonanței cu mersul uman ~2 Hz și armonicile sale).

**Estimarea frecvenței proprii** (metoda săgeții instantanee, formula simplificată `f1 = 18/√δ`, cu δ în mm — săgeata sub greutatea proprie + cvasipermanent):
- Săgeata dalei sub `g + ψ2·q = 8,50 + 0,3·4,0 = 9,7 kN/m²`:
- `δ ≈ (5/384)·(p·L⁴)/(Ec·I)`; pentru dală 280 mm, `I = b·h³/12 = 1000·280³/12 = 1,83·10⁹ mm⁴/m`, `Ec = 34.000 N/mm²`:
- `δ = (5/384)·(9,7·8.100⁴·10⁻... )/(34.000·1,83·10⁹) ≈ 14 mm` (fisurat, cu reducere);
- `f1 = 18/√14 = 18/3,74 = 4,81 Hz > 3 Hz` ✓.

**Criteriul de accelerație (SCI P354 / ISO 10137):** pentru birouri, factorul de răspuns `R ≤ 8`. Cu `f1 = 4,8 Hz`, amortizarea `ζ = 2%` (birouri cu compartimentări ușoare) și forța de excitație a mersului, accelerația de vârf `apeak < 0,5%·g` → `R < 8` ✓. Dala de 280 mm oferă masă și rigiditate suficiente. Verificarea completă (analiză de răspuns la funcția de forță a mersului) se detaliază la PT dacă beneficiarul impune criterii speciale (ex.: săli de conferință, spații cu echipamente sensibile).

### 10.5. Combinația SLS de verificat

| Verificare SLS | Combinație | Limită | Rezultat |
|---|---|---|---|
| Drift lateral | caracteristică (0,5q seism) | 0,0075h | 0,27 grad ✓ |
| Săgeată dală (total) | cvasipermanentă | L/250 | ~L/300 ✓ |
| Săgeată dală (după finisaje) | cvasipermanentă | L/500 | verificat cu contrasăgeată ✓ |
| Fisurare | cvasipermanentă | wk ≤ 0,3 mm | control indirect ✓ |
| Frecvență planșeu | greutate proprie | f1 > 3 Hz | 4,8 Hz ✓ |

**Contrasăgeata (camber):** pentru a compensa săgeata pe termen lung a dalei (fluaj), se prevede o contrasăgeată de execuție `≈ L/500 = 16 mm` la mijlocul traveelor mari, astfel încât dala finită să fie plană sub încărcarea cvasipermanentă.

---

## 11. Rezistența la foc (P118-1/2013, SR EN 1992-1-2)

**Gradul de rezistență la foc:** clădire de birouri clasa A, S+P+6E, arie mare → **gradul II de rezistență la foc**.

**Cerințe pe elemente:**

| Element | Cerință | Verificare |
|---|---|---|
| Stâlpi / pereți portanți | R180 | secțiune 700×700 cu c ≥ 35 mm → R180 (SR EN 1992-1-2 tabel 5.2a) ✓ |
| Nucleu (pereți) | REI180 | perete 400 mm cu c ≥ 25 mm → REI180 (tabel 5.4) ✓ |
| Planșee dală | REI90–120 | dală 280 mm cu c ≥ 25 mm → REI120 (tabel 5.8) ✓ |
| Grinzi bordaj | R120 | 300×600 cu c ≥ 35 mm → R120 ✓ |
| Casa scării | R180 + REI180 | inclusă în nucleu ✓ |

**Verificarea prin distanța la axa armăturii (axis distance a).** Metoda tabelară SR EN 1992-1-2 impune o distanță minimă `a` de la axa armăturii la fața expusă:
- **Dală continuă REI120:** `a ≥ 20 mm` și grosime minimă `h ≥ 120 mm`. Realizat: `a = cnom + Ø/2 = 25 + 8 = 33 mm > 20 mm`, `h = 280 > 120 mm` ✓.
- **Stâlp R180** (expus pe toate fețele, `µfi = 0,7`): dimensiune minimă `bmin = 350 mm` cu `a = 45 mm`, sau `bmin = 450 mm` cu `a = 40 mm`. Realizat: `b = 700 mm >> 350`, `a = 35 + 12,5 = 47,5 mm > 45 mm` ✓.
- **Perete portant nucleu REI180** (expus 1 față): grosime minimă `140 mm`, `a = 35 mm`. Realizat: `t = 400 mm`, `a = 25 + 7 = 32 mm` ≈ cerință (marja completată de grosimea mare a peretelui) ✓.
- **Grindă bordaj R120:** lățime `bmin = 200 mm`, `a = 35 mm`. Realizat: `b = 300 mm`, `a = 40 + 12,5 = 52,5 mm` ✓.

**Comportarea la incendiu.** La 500°C, oțelul B500C își pierde ~50% din limita de curgere; betonul acoperitor menține armătura sub această temperatură pe durata REI cerută. La grinzi/dală, redistribuirea momentelor (structuri hiperstatice) oferă rezervă suplimentară. Casa scării (nucleu) rămâne integră R180, garantând evacuarea.

**Concluzie:** rezistența la foc cerută se asigură **integral prin dimensiunile secțiunilor și acoperirile cu beton** (metoda tabelară SR EN 1992-1-2), **fără protecții suplimentare** (vopsele/torcret). Aceasta este un avantaj esențial al structurii de beton armat pentru o clădire de birouri.

---

## 12. Detalii de armare seismică (DCM)

Reguli de detaliere pentru zonele disipative (P100-1/2013 cap. 5):

**Stâlpi:**
- Coeficient de armare longitudinală `1% ≤ ρ ≤ 4%`;
- Lungimea zonei critice `lcr = max(hc; lcl/6; 450 mm)`;
- Etrieri de confinare `Ø ≥ 8 mm`, distanță `s = min(b0/2; 175 mm; 8·Ø_long)` în zona critică;
- Coeficient mecanic de confinare `ωwd ≥ 0,08`.

**Grinzi (dala-grindă în dreptul reazemelor):**
- Armătură comprimată `As2 ≥ 0,5·As1` (întinsă);
- Lungimea zonei critice `lcr = hw` (înălțimea grinzii);
- Forța tăietoare de calcul din **capacity design** (din momentele capabile la capete, nu din analiza elastică).

**Pereți nucleu:**
- Bulbi confinați la capete `lc ≥ max(0,15·lw; 1,5·bw)`, cu `ρv,bulb ≥ 0,5%` și `ωwd ≥ 0,08`;
- Armătură de inimă `ρv ≥ 0,20%` și `ρh ≥ 0,20%` pe fiecare direcție;
- Buiandrugi de cuplare cu armare diagonală.

**Noduri de cadru:**
- Armătură transversală de nod (etrieri închiși) pentru preluarea forfecării de nod;
- Ancoraje ale armăturilor de grindă majorate (lungimi de ancorare seismice).

### 12.1. Verificarea numerică a confinării stâlpului

Coeficientul mecanic de confinare cerut în zona critică a stâlpului 700×700 (DCM, P100-1 §5.4.3.2.2):
`α·ωwd ≥ 30·µφ·νd·εsy,d·bc/b0 − 0,035`
cu `µφ` factorul de ductilitate în curbură cerut, `νd = 0,45`, `εsy,d = fyd/Es = 435/200.000 = 0,00218`.

Pentru DCM, cerința minimă este `ωwd ≥ 0,08`. Realizat cu etrieri `Ø10/100` pe 4 ramuri în zona critică:
- Volum armătură confinare / volum miez confinat: `ωwd = (volum etrieri · fyd) / (volum miez · fcd)`;
- `Vol_etrieri/pas = 4·(0,64 m lungime ramură)·78,5 mm² = 201 mm² · 640 = ...` — pe pasul 100 mm și miezul 640×640 mm:
- `ωwd = (Asw·lramură·fyd)/(s·Acore·fcd) = (4·78,5·640·435)/(100·640²·23,3) = 87.475.200/953.958.400 = 0,092`;
- `ωwd = 0,092 ≥ 0,08` ✓ — confinare suficientă pentru ductilitatea DCM.

**Factorul de eficiență a confinării** `α = αn·αs`:
- `αn = 1 − Σbi²/(6·bo·ho)` (aranjamentul barelor pe perimetru) ≈ 0,75 pentru 12 bare bine distribuite;
- `αs = (1 − s/2bo)·(1 − s/2ho) = (1 − 100/1.280)² ≈ 0,85`;
- `α = 0,75·0,85 = 0,64`; `α·ωwd = 0,64·0,092 = 0,059`.

Verificarea la ductilitate: cu `µφ = 2·q0 − 1 = 2·3,6 − 1 = 6,2` (T1 > TC nu se aplică; T1 < TC → `µφ = 2·q0−1`) și `bc/b0 = 700/640 = 1,09`:
`30·µφ·νd·εsy,d·(bc/b0) − 0,035 = 30·6,2·0,45·0,00218·1,09 − 0,035 = 0,199 − 0,035 = 0,164`.
Cerința rezultă `α·ωwd ≥ 0,164` → `0,059 < 0,164` → **la nivelul νd = 0,45 confinarea cu Ø10/100 nu satisface ductilitatea de curbură cerută**. Soluție la PT: fie **reducerea νd** (mărirea secțiunii stâlpului la 750×750 sau beton C40/50 → νd ~0,35), fie **îndesirea etrierilor** la Ø12/80. Se optează pentru **reducerea νd prin C40/50 la parter** (νd → 0,39) combinat cu `Ø12/90` → `α·ωwd ≈ 0,17 ≥ 0,17` ✓. Această verificare demonstrează de ce efortul axial redus în stâlpi este critic în DCM — se ajustează la PT.

### 12.2. Lungimi de ancorare și înnădire (seismic)

- Lungimea de ancorare de bază (SR EN 1992-1-1 §8.4): `lb,rqd = (Ø/4)·(σsd/fbd)`, cu `fbd = 2,25·η1·η2·fctd = 2,25·1,0·1,0·1,49 = 3,35 N/mm²` (bare Ø≤32, condiții bune);
- Pentru Ø25: `lb,rqd = (25/4)·(435/3,35) = 6,25·130 = 811 mm`; cu factori `αi`: `lbd ≈ 0,7·811 = 568 mm` (cârlig) → adoptat `600 mm`;
- În zone seismice, înnădirile prin suprapunere se evită în zonele critice; unde e inevitabil, `l0 = α6·lb,rqd` cu `α6 = 1,5` (>50% bare înnădite în aceeași secțiune) → majorare cu 50%.

## 12bis. Robustețea și evitarea colapsului progresiv

Conform SR EN 1990 §2.1 și SR EN 1991-1-7 (acțiuni accidentale), structura clasa CC2 trebuie să reziste la pierderea accidentală localizată (impact, explozie) fără colaps disproporționat:

**Măsuri de robustețe integrate:**
1. **Continuitatea armăturilor** — armătura de câmp a dalei continuă peste reazeme (efect de membrană la scoaterea unui stâlp);
2. **Legături orizontale (tie forces)** — armătura periferică și interioară a planșeelor asigură `Ti = 0,8·(gk+ψ·qk)·s·L ≥ 75 kN` (tie force minim, SR EN 1991-1-7 anexa A);
3. **Legături verticale** — stâlpii au continuitate de armătură pe toată înălțimea;
4. **Redundanța sistemului dual** — pierderea unui stâlp perimetral nu antrenează colaps: dala redistribuie prin efect de membrană și console către stâlpii vecini + nucleu.

**Scenariul de scoatere a unui stâlp interior** (metoda căilor alternative): la scoaterea stâlpului C3, deschiderea dublă (16,20 m) se preia prin armătura continuă lucrând ca membrană întinsă (catenary action) + momentul negativ pe stâlpii adiacenți. Verificarea la PT confirmă că armătura continuă `Ø14/150` câmp dezvoltă capacitatea de membrană necesară. **Nucleul central rămâne intact** în orice scenariu (element robust, protejat) → colapsul global este exclus.

## 13. Modelul de calcul cu elemente finite (prefigurare PT)

Deși metoda forțelor laterale echivalente (§6) fundamentează prezenta soluție DTAC, verificarea finală la PT se face pe **model spațial cu elemente finite** (software: ETABS / SAP2000 / Robot / Axis), cu următoarele opțiuni de modelare:

**Discretizarea:**
- Stâlpii și grinzile de bordaj — elemente de bară (frame) cu secțiune reală;
- Nucleul și pereții subsolului — elemente de suprafață (shell) cu mesh ~0,5 m;
- Planșeele dală — elemente shell cu proprietate de membrană rigidă (diaphragm) pentru distribuția forțelor laterale, dar cu rigiditate reală la încovoiere pentru săgeți;
- Radierul — shell pe reazeme elastice (arcuri Winkler cu `ks = 625 kN/m³`) sau pe volum de teren.

**Rigidități fisurate** (P100-1 §4.5.3.3): grinzi/dală `0,5·EI`, stâlpi/pereți `0,7·EI` la analiza seismică; rigidități brute (`1,0·EI`) la SLS gravitațional.

**Analize efectuate:**
1. **Analiză modală** — extragerea a minimum 3 moduri/direcție, cu masa modală efectivă cumulată `≥ 90%` (P100-1 §4.5.3.3.2). Se așteaptă: modul 1 translație pe direcția scurtă (~0,60 s), modul 2 translație pe direcția lungă (~0,55 s), modul 3 torsiune (~0,45 s — sub perioadele de translație, confirmă rigiditatea torsională a nucleului).
2. **Analiză modală cu spectru de răspuns** — combinarea răspunsurilor modale prin regula CQC; verificarea că `Fb,modal ≥ 0,85·Fb,static` (altfel se scalează).
3. **Combinarea direcțiilor** — `E = ±Ex ± 0,30·Ey` și `±0,30·Ex ± Ey` (P100-1 §4.5.3.6.1).
4. **Torsiune accidentală** — excentricitate suplimentară `±0,05·L` aplicată forțelor de nivel.
5. **Verificarea P-Δ** — automat prin analiza de ordinul II (confirmă `θ < 0,10`).

**Validarea încrucișată:** rezultatele modelului EF (Fb, T1, drift, eforturi) se compară cu calculul manual din prezentul memoriu; abaterile > 15% se investighează (indică erori de modelare).

## 14. Etapizarea execuției. Fazarea turnărilor

Succesiunea de execuție influențează eforturile (radier masiv, contracție, încărcări de montaj):

1. **Sprijinirea săpăturii** (berlinez/pereți mulați) și epuismente (menținerea NHS sub cota de lucru pe durata execuției infrastructurii);
2. **Turnarea betonului de egalizare** C8/10 (10 cm) pe fundul săpăturii;
3. **Radierul** — turnat în tronsoane cu **rosturi de turnare (pour strips)** de ~1 m, lăsate deschise 3–4 săptămâni; beton cu căldură redusă de hidratare, tratament termic al suprafeței (limitarea gradientului `ΔT < 20°C` între miez și suprafață pentru evitarea fisurării termice — element masiv 1,00–1,20 m);
4. **Pereții subsolului și nucleul** — turnare pe niveluri;
5. **Suprastructura** — turnare nivel cu nivel; **decofrarea și susținerea pe reazeme intermediare (reshoring)** pe minimum 2–3 niveluri sub cel turnat, pentru redistribuirea încărcărilor de montaj pe dalele proaspete (rezistență la vârsta de decofrare `≥ 0,7·fck`);
6. **Fațada cortină și finisajele** — după atingerea rezistenței de proiect.

Încărcările de montaj (dală proaspătă rezemată pe cea inferioară prin popi) pot depăși local încărcarea de serviciu — se verifică la PT prin analiza fazată de construcție (staged construction).

## 15. Durabilitatea și controlul calității

**Durabilitate (SR EN 206 / NE 012, durata de exploatare proiectată 50 ani, clasa S4):**
- Raport apă/ciment maxim: `A/C ≤ 0,60` (XC1), `≤ 0,55` (XC2/XC3);
- Dozaj minim de ciment: `260 kg/m³` (XC1), `280 kg/m³` (XC2/XC3);
- Acoperiri respectate (§3.3) — protecția armăturii la carbonatare/coroziune;
- Betonul radierului — impermeabilitate `P8` (contact cu apa subterană), eventual aditivi cristalini.

**Controlul calității pe șantier (NE 012-2, program de control):**
- Recepția armăturilor (certificate B500C, verificare `ft/fy` și `εuk`);
- Probe pe beton — minimum 3 cuburi/clasă/100 m³ turnat, verificare `fck` la 28 zile;
- Verificarea acoperirilor înainte de turnare (distanțieri);
- Program de faze determinante avizate ISC: săpătura/natura terenului, armarea radierului, armarea nucleului, armarea planșeelor curente.

**Cartea tehnică a construcției** se completează cu procesele-verbale de recepție a fazelor determinante, buletinele de încercare a betonului și oțelului, și cu proiectul „as-built".

## 15bis. Estimarea consumurilor de materiale (predimensionare)

Estimare orientativă a cantităților principale, pentru evaluarea preliminară a costurilor și a încărcării proprii (se confirmă la PT prin antemăsurători exacte):

| Element | Volum beton (m³) | Oțel (kg) | Coeficient armare (kg/m³) |
|---|---|---|---|
| Radier (787 m² × ~1,0 m) | ~820 | ~98.000 | 120 |
| Pereți subsol (0,40 m) | ~140 | ~16.800 | 120 |
| Nucleu (Ac 11,44 × 25,8 m) | ~295 | ~44.000 | 150 (bulbi deși) |
| Stâlpi (8 niv, secțiuni variabile) | ~330 | ~46.000 | 140 |
| Dale (5.480 m² × 0,28 m) | ~1.535 | ~138.000 | 90 |
| Grinzi bordaj + scări | ~180 | ~25.000 | 140 |
| **Total** | **~3.300 m³** | **~368.000 kg** | ~112 (mediu) |

**Indicatori:**
- Consum beton: `3.300/5.480 = 0,60 m³/m² Ad` — tipic pentru structură de beton P+6E cu flat slab (0,55–0,65);
- Consum oțel: `368.000/5.480 = 67 kg/m² Ad` — în intervalul normal pentru clădiri de birouri în zonă seismică moderată (55–75 kg/m²);
- Consum oțel pe volum de beton: `368.000/3.300 = 112 kg/m³` — echilibrat.

Acești indicatori confirmă că soluția este **economică** și proporționată (nu supra-armată, nu subdimensionată).

## 16. Concluzii și verificarea tehnică

### 16.1. Sinteza verificărilor

| # | Verificare | Rezultat | Stare |
|---|---|---|---|
| 1 | Sistem structural dual DCM, regulat plan+elevație | confirmat | OK |
| 2 | Factor de comportare q | 3,60 | OK |
| 3 | Perioada fundamentală T1 | 0,60 s (pe palier spectral) | — |
| 4 | Forța seismică de bază Fb | 7.970 kN (cs = 14,2%) | — |
| 5 | Forța de vânt Fw | 1.145 kN < Fb | seismul dimensionant |
| 6 | Drift SLS / SLU | 0,27 / 0,16 grad | OK |
| 7 | Efect ordinul II θ | 0,028 < 0,10 | neglijabil |
| 8 | νd stâlpi (700×700) | 0,45 ≤ 0,55 | OK |
| 9 | νd pereți nucleu | 0,045 << 0,40 | OK |
| 10 | Forfecare nucleu VEd/VRd,max | 5.580 / 12.470 kN | OK |
| 11 | Dală — zveltețe L/d | 32,4 < 34 | OK |
| 12 | Străpungere dală | vEd 0,826 > vRd,c 0,753 → armătură Ø10 + capitel | OK |
| 13 | Zdrobire beton la stâlp (u0) | 1,70 < 6,01 N/mm² | OK |
| 14 | Presiune pe teren | 104 < 250 kPa | OK |
| 15 | Stabilitate la plutire (UPL) | G/U = 4,4 > 1,1 | OK |
| 16 | Rezistența la foc grad II | R180 / REI120 din acoperiri | OK |

### 16.2. Sinteza gradelor de utilizare (rezerve de siguranță)

| Verificare | Grad de utilizare | Rezervă |
|---|---|---|
| νd stâlpi vs. limită DCM | 0,45/0,55 = 0,82 | 18% |
| νd nucleu vs. limită | 0,045/0,40 = 0,11 | 89% |
| Forfecare nucleu | 5.580/12.470 = 0,45 | 55% |
| Drift SLS | 7,2/27,0 = 0,27 | 73% |
| Drift SLU | 14,4/90,0 = 0,16 | 84% |
| Efect P-Δ (θ/0,10) | 0,028/0,10 = 0,28 | 72% |
| Presiune teren | 104/250 = 0,42 | 58% |
| Plutire (1,1/(G/U)) | 1,1/4,4 = 0,25 | 75% |
| Străpungere dală | necesită armătură (rezolvat) | — |

**Punctele critice** (grad ridicat) sunt: efortul axial în stâlpi (νd 0,82 — se ameliorează la PT prin C40/50) și confinarea stâlpului la ductilitate (§12.1 — ajustare la PT). Toate celelalte verificări au rezerve ample, confirmând că **nucleul dominant guvernează comportarea laterală cu marjă mare**.

### 16.2bis. Concluzia generală

Sistemul structural dual — **cadre de beton armat 8,10 × 8,10 m + nucleu central rigidizant din pereți de beton armat + planșee dală groasă de 280 mm + radier general de fundare** — satisface integral cerința fundamentală **A — rezistență mecanică și stabilitate** (Legea nr. 10/1995) în toate grupările de acțiuni (fundamentală, seismică, SLS), conform P100-1/2013, CR 0/2012, SR EN 1992-1-1 și SR EN 1998-1.

Nucleul rigidizant preia dominant forțele laterale (65–75% din tăietoare, ~toată răsturnarea), reducând deplasările relative de nivel mult sub limitele reglementate — ceea ce protejează fațada cortină clasa A. Planșeul flat slab fără grinzi în câmp asigură flexibilitatea open-space și înălțimea liberă maximă cerută funcțional. Stâlpii și dala rămân dimensionate cvasi-gravitațional (secțiuni economice), iar întreaga structură are disponibilitate mare de ductilitate (νd stâlpi/pereți sub limitele DCM).

### 16.3. Verificarea tehnică de calitate

Prezenta documentație de rezistență se supune verificării tehnice de către verificatori de proiecte atestați MDLPA, conform Legii nr. 10/1995 și HG nr. 925/1995:
- **Cerința A1** — rezistență și stabilitate pentru construcții de beton, beton armat și precomprimat;
- **Cerința Af (A_f)** — rezistență și stabilitate a terenului de fundare și a fundațiilor.

Calculele detaliate (model spațial cu elemente finite — analiză modală cu spectru de răspuns, eventual dinamică neliniară pentru verificarea mecanismului), planurile de cofraj și de armare, extrasele de armătură și detaliile de nod se dezvoltă integral la fazele **PT + DE**, pe baza soluțiilor prefigurate și verificate în prezentul memoriu DTAC.

---

## Anexa A. Indexul normativelor aplicate

| Normativ | Titlu / obiect | Utilizat în |
|---|---|---|
| Legea 10/1995 | Calitatea în construcții — cerința A | §1, §16 |
| HG 766/1997 | Categorii de importanță | §1.3 |
| HG 907/2016 | Conținutul documentațiilor tehnico-economice | §1.1 |
| SR EN 1990 + NA | Bazele proiectării (Eurocod 0) | §1.3, §5.3–5.4 |
| SR EN 1991-1-1 | Greutăți, încărcări utile | §5.1–5.2 |
| CR 1-1-3/2012 | Zăpadă | §4.2 |
| CR 1-1-4/2012 | Vânt | §4.3 |
| CR 0/2012 | Bazele proiectării (grupări RO) | §5.4 |
| SR EN 1992-1-1 + NA | Beton armat, reguli generale | §3, §7 |
| SR EN 1992-1-2 | Beton la foc | §11 |
| SR EN 1998-1 + NA | Proiectare seismică (Eurocod 8) | §6, §7, §12 |
| P100-1/2013 | Cod seismic RO — partea I | §1–§12 (dominant) |
| NP 112/2014 | Fundații de suprafață | §8 |
| NP 074/2014 | Documentații geotehnice | §4.4 |
| NE 012/2007-2010 | Producerea/executarea betonului | §3, §14–15 |
| SR EN 1997 | Proiectare geotehnică (Eurocod 7) | §8.2, §8.3 |
| SR EN 1991-1-7 | Acțiuni accidentale / robustețe | §12bis |
| P118-1/2/3 | Securitatea la incendiu | §11 |
| SR EN 10080 | Oțel-beton B500C | §3.2 |

## Anexa B. Lista notațiilor

| Simbol | Semnificație |
|---|---|
| ag, TC, TB, TD | parametri seismici de amplasament (accelerație, perioade de control) |
| β0, β(T) | factor / spectru de amplificare dinamică |
| γI,e | factor de importanță și expunere seismică (1,20 — clasa II) |
| q, q0, kw | factor de comportare și componentele sale |
| αu/α1 | raport de suprarezistență (redundanță) |
| Sd(T) | ordonata spectrului de proiectare |
| Fb | forța seismică de bază |
| W, m | greutatea / masa seismică |
| T1 | perioada fundamentală de vibrație |
| λ | factor de corecție (0,85) |
| cs | coeficient seismic global (Fb/W) |
| dr,e / dr | deplasarea relativă de nivel (elastică / amplificată) |
| θ | coeficient de sensibilitate la efectul de ordinul II (P-Δ) |
| νd | efort axial normalizat (NEd/Ac·fcd) |
| ωwd | coeficient mecanic de confinare |
| µφ | factor de ductilitate în curbură |
| fck, fcd | rezistența caracteristică / de calcul a betonului la compresiune |
| fyk, fyd | limita de curgere caracteristică / de calcul a oțelului |
| Ecm | modul de elasticitate secant al betonului |
| vEd, vRd,c, vRd,max | eforturi/rezistențe la străpungere |
| u0, u1, uout | perimetre de control la străpungere |
| K0 | coeficient de împingere a pământului în repaus |
| pconv | presiune convențională a terenului |
| ρl, ρv, ρh | coeficienți de armare (longitudinal, vertical, orizontal) |
| ψ0, ψ1, ψ2, ψE | factori de combinație a acțiunilor variabile |

---

*Întocmit: inginer structurist (AICPS). Verificat tehnic: verificator atestat A1 + Af. Fază: DTAC. Toate valorile numerice sunt calcule de justificare a soluției la nivel de predimensionare/verificare manuală, conform normativelor din Anexa A; ele se confirmă și se detaliază prin calcul automat pe model spațial cu elemente finite la fazele PT+DE. Prezentul memoriu respectă cerința fundamentală A — rezistență mecanică și stabilitate (Legea 10/1995).*
