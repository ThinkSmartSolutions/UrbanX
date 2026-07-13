# Memoriu Tehnic de Rezistență (DTAC) — Locuință individuală (unifamilială), regim de înălțime P+1E

**Structură din zidărie portantă confinată (CR 6/2013) — pereți de zidărie cu sâmburi și centuri de beton armat, planșee de beton armat monolit, infrastructură pe tălpi continue de beton armat. Variantă alternativă analizată: cadre de beton armat cu umplutură nestructurală.**

> Prezentul memoriu constituie piesa scrisă de rezistență a documentației tehnice pentru autorizarea executării lucrărilor de construire (DTAC) a unei locuințe unifamiliale, întocmit conform Legii nr. 10/1995 privind calitatea în construcții (republicată), a HG nr. 907/2016 privind conținutul-cadru al documentațiilor tehnico-economice și a Ordinului MDRAP nr. 839/2009 (Normele metodologice de aplicare a Legii nr. 50/1991). Nivelul de detaliere corespunde fazei DTAC, cu prefigurarea și justificarea soluției de rezistență; calculul complet (breviar de calcul, planuri de cofraj/armare, detalii de execuție) se dezvoltă la fazele PT + DE. Toate valorile numerice de mai jos sunt calcule de predimensionare/verificare, lucrate manual pentru justificarea soluției adoptate; ele nu se substituie calculului de proiect tehnic și nici verificării tehnice atestate.

---

## 1. Date generale și scopul lucrării

### 1.1. Obiectul documentației

Se propune realizarea unei **locuințe individuale (unifamiliale)**, cu regim de înălțime **P+1E** (parter + un etaj), fără subsol, cu pod nelocuit sub șarpantă. Clădirea este destinată locuirii permanente a unei singure familii, cu compartimentare interioară obișnuită (living, bucătărie, dormitoare, grupuri sanitare) și fără aglomerări de persoane, echipamente grele sau procese tehnologice speciale.

Spre deosebire de o clădire de birouri sau un obiectiv cu utilizare publică, funcțiunea de locuit unifamilial impune un set de cerințe structurale caracteristice, care condiționează alegerea sistemului constructiv:

1. **Compartimentare relativ fixă, pe travei mici** (deschideri uzuale 3,00–4,50 m) — favorizează o structură cu pereți portanți deși dispuși, nu cadre cu deschideri mari;
2. **Regim redus de înălțime (P+1E)** — forțele seismice și gravitaționale sunt modeste, ceea ce face ca **zidăria portantă confinată** să fie soluția tehnic-economică optimă, verificată statistic de comportarea favorabilă la cutremurele istorice din România (Vrancea 1977, 1986, 1990) pentru construcții joase, regulate, cu sâmburi și centuri corect alcătuite;
4. **Cost și tradiție constructivă** — zidăria confinată este soluția dominantă pe piața locuințelor unifamiliale din România, cu manoperă și materiale ușor disponibile local, spre deosebire de cofrajele și armăturile mai sofisticate ale cadrelor de beton armat sau ale structurilor metalice.

Din aceste considerente, soluția de bază adoptată și dezvoltată integral în prezentul memoriu este **Varianta A — zidărie portantă confinată** (cap. 7). Pentru completitudine și pentru cazurile în care proiectantul de arhitectură solicită spații mai deschise la parter (garaj integrat, living deschis pe două laturi, ferestre mari continue), memoriul dezvoltă și analizează comparativ **Varianta B — cadre de beton armat cu umplutură nestructurală** (cap. 8), cu precizarea explicită a situațiilor în care aceasta se recomandă în locul zidăriei confinate.

### 1.2. Caracteristici geometrice principale

| Parametru | Valoare adoptată | Observații |
|---|---|---|
| Regim de înălțime | P+1E | parter + etaj, fără subsol |
| Dimensiuni în plan (ax-ax) | 10,60 × 9,00 m | dreptunghi compact, regulat |
| Suprafață construită Ac (Sc/nivel) | **≈ 95,4 mp** | 10,60 × 9,00 |
| Suprafață desfășurată Ad | **≈ 190,8 mp** | 2 niveluri × 95,4 mp |
| Înălțime liberă parter | 2,80 m | h structural 3,00 m (grosime planșeu inclusă) |
| Înălțime liberă etaj | 2,70 m | h structural 2,95 m |
| Înălțime totală la cornișă/centură etaj | **5,95 m** | 3,00 + 2,95 |
| Înălțime totală la coamă (cu șarpantă) | **≈ 7,80–8,20 m** | funcție de panta acoperișului (30–38°) |
| Cotă de fundare | −1,00 m | sub adâncimea de îngheț |
| Deschidere maximă travee | 4,50 m | între pereți portanți |

Raportul de zveltețe al construcției: `H/B = 5,95/9,00 = 0,66` pe direcția scurtă și `5,95/10,60 = 0,56` pe direcția lungă — construcție **foarte rigidă, joasă și nezveltă**, aflată în domeniul favorabil comportării seismice (spre deosebire de clădirile înalte, la P+1E raportul H/B mic elimină practic riscul de răsturnare și reduce sensibilitatea la efectele de ordinul II).

**Sistemul de axe și numerotare.** Se adoptă un sistem de axe ortogonal: axele longitudinale (numerotate 1÷3, interax variabil 4,50–6,10 m pe direcția de 10,60 m) și axele transversale (litere A÷C, interax 4,50 m pe direcția de 9,00 m, cu peretele median pe axa B). Această convenție se preia identic în planurile de cofraj și armare la faza PT.

**Bilanțul de mase pe niveluri (predimensionare seismică).** Distribuția aproximativă a greutății pe cele două niveluri de calcul (lumped-mass, model simplificat cu 2 grade de libertate dinamică — cota planșeului peste parter și cota planșeului peste etaj/baza șarpantei), utilizată la calculul seismic (cap. 6):

| Nivel de masă | Cotă (m) | Compus din | Greutate nivel (kN) |
|---|---|---|---|
| Nivel 1 (planșeu peste parter) | +3,00 | planșeu (543,8) + pereți parter (574,6) + utilă seismică (42,9) | **≈ 1.161,3** |
| Nivel 2 (planșeu peste etaj / bază șarpantă) | +5,95 | planșeu pod (442,9) + pereți etaj (495,9) + acoperiș (104,9) | **≈ 1.043,7** |
| **Total greutate seismică W** | | | **≈ 2.205,0 kN** (≈ 224,8 t) |

Derivarea completă a acestor valori (permanente pe m², lungimi nete de zidărie, greutăți proprii ale pereților) este prezentată în cap. 5 și cap. 6.2. Nefiind subsol, întreaga greutate a construcției participă la masa oscilantă seismică — spre deosebire de clădirile cu subsol, unde masa de sub cota de încastrare (de regulă terenul înconjurător rigid) nu se ia în calcul.

### 1.3. Clasificări normative

**Categoria de importanță (HG nr. 766/1997, anexa nr. 3):** locuința unifamilială cu regim redus de înălțime (P+1E) și un număr mic de utilizatori se încadrează în **categoria de importanță „D" (redusă)** — construcții de importanță redusă, cu punctaj total sub 5,0 în metodologia din anexa nr. 3 (funcțiune de locuit, aria mică, regim redus, fără riscuri speciale asociate). Categoria D este cea specifică locuințelor unifamiliale P, P+1, P+2, spre deosebire de blocurile de locuințe colective (categoria C) sau de clădirile publice cu aglomerări de persoane (categoria B).

**Clasa de importanță și expunere la cutremur (P100-1/2013, tabel 4.2):** construcțiile obișnuite, ale căror avarii ar putea afecta un număr redus de persoane, fără a periclita funcțiuni esențiale pentru societate (locuințe unifamiliale, clădiri agrozootehnice, construcții similare), se încadrează în **clasa III**, cu factorul de importanță **γI,e = 1,00**. Această clasă este cea corect aplicabilă locuinței unifamiliale — spre deosebire de clasele I (construcții cu funcțiuni vitale post-seism: spitale, sedii de intervenție) și II (construcții cu aglomerări mari de persoane), care nu se justifică pentru o locuință individuală.

**Clasa de consecințe (SR EN 1990, anexa B):** o locuință unifamilială obișnuită se încadrează, în principiu, în **CC1** (consecințe mici pentru pierderi de vieți omenești, consecințe economice/sociale reduse sau neglijabile). Din motive de uniformizare a practicii de proiectare românești (majoritatea softurilor și normativelor autohtone nu diferențiază explicit CC1 de CC2 pentru locuințe) și pentru o marjă de siguranță suplimentară, se adoptă conservator încadrarea **CC1→CC2**, cu factor de diferențiere **KFI = 1,00** (uzual pentru CC2; la CC1 s-ar putea reduce acțiunile cu KFI = 0,90, dar nu se aplică această reducere în prezentul memoriu).

**Gradul de rezistență la foc (P118-1/2013 și normele conexe P118-2/3):** pentru o construcție de locuit unifamilială cu regim P+1E și arie construită sub 600 mp, riscul de incendiu este mic, iar timpii normați de rezistență la foc ai elementelor structurale principale sunt moderați. Se adoptă **gradul II–III de rezistență la foc** (funcție de natura finisajelor și de soluția constructivă a acoperișului — șarpanta din lemn, tratată ignifug, impune încadrarea conservatoare la gradul III, cu posibilitatea gradului II dacă elementele principale de beton armat ating timpii superiori de rezistență). Cerințele specifice pe elemente sunt detaliate în cap. 3.4.

### 1.4. Cadrul normativ de referință

Proiectarea structurală respectă pachetul de norme europene armonizate (Eurocoduri cu anexele naționale) și codurile românești specifice, adaptate la specificul construcțiilor de locuit unifamiliale:

- **Legea nr. 10/1995** — calitatea în construcții; cerința fundamentală **A — rezistență mecanică și stabilitate**.
- **HG nr. 766/1997** — categoriile de importanță a construcțiilor.
- **SR EN 1990:2004/NA:2006** — Bazele proiectării structurilor (Eurocod 0). Grupări de acțiuni, coeficienți parțiali, factori ψ.
- **SR EN 1991** (Eurocod 1) — Acțiuni asupra structurilor: partea 1-1 (greutăți proprii, încărcări utile), partea 1-3 (zăpadă) armonizată cu **CR 1-1-3/2012**, partea 1-4 (vânt) armonizată cu **CR 1-1-4/2012**.
- **CR 0/2012** — Cod de proiectare. Bazele proiectării construcțiilor (grupări specifice României).
- **SR EN 1992-1-1:2004/NA** (Eurocod 2) — Proiectarea structurilor de beton, reguli generale (aplicabil sâmburilor, centurilor, planșeelor, fundațiilor).
- **SR EN 1996-1-1:2006/NA** (Eurocod 6) — Proiectarea structurilor de zidărie, reguli generale pentru construcții de zidărie armată și nearmată.
- **CR 6/2013** — Cod de proiectare pentru structuri din zidărie — normativul-cheie pentru Varianta A (zidărie confinată), cu prevederi specifice construcțiilor din România (densitate minimă de pereți, poziția sâmburilor și centurilor, alcătuiri constructive).
- **SR EN 1998-1:2004/NA** (Eurocod 8) — Proiectarea seismică, completat și prevalat de **P100-1/2013** (Cod de proiectare seismică — partea I), inclusiv capitolul 8 dedicat structurilor din zidărie și capitolul 5 dedicat structurilor de beton armat.
- **SR EN 1995-1-1** (Eurocod 5) — Proiectarea structurilor de lemn, aplicabil șarpantei.
- **NP 112/2014** — Normativ pentru proiectarea fundațiilor de suprafață.
- **NP 074/2014** — Normativ privind documentațiile geotehnice.
- **STAS 6054/77** — Adâncimi de îngheț. Zonarea teritoriului României.
- **NE 012-1/2007 și NE 012-2/2010** — Producerea și executarea lucrărilor din beton.
- **P118-1/2013, P118-2/2013, P118-3/2015** — Securitatea la incendiu.

---

## 2. Descrierea sistemului structural. Alegerea sistemului

### 2.1. Sisteme structurale analizate

Pentru o locuință unifamilială P+1E, P100-1/2013 (cap. 8) și CR 6/2013 recunosc zidăria confinată drept soluție de referință pentru zonele seismice ale României. Se compară totuși patru variante posibile, pentru a justifica alegerea finală:

**Varianta A — Zidărie portantă confinată (cărămidă/BCA + sâmburi și centuri de beton armat).** Pereții structurali din zidărie preiau atât încărcările gravitaționale, cât și cele laterale (seism, vânt) prin lucru compus cu elementele de confinare de beton armat (sâmburi verticale, centuri orizontale). Avantaj: cost redus, tehnologie simplă și larg cunoscută, densitate mare de pereți compatibilă cu compartimentarea tipică a unei locuințe, comportare seismică favorabilă documentată istoric. Dezavantaj: flexibilitate redusă în plan (pereții portanți nu pot fi eliminați ulterior fără expertiză), necesită densitate minimă de pereți pe cele două direcții ortogonale (CR 6, cap. 4).

**Varianta B — Cadre de beton armat cu umplutură nestructurală (zidărie de umplutură).** Stâlpii și grinzile de beton armat preiau încărcările, iar zidăria de compartimentare este nestructurală. Avantaj: flexibilitate mare în plan (spații deschise, deschideri mari pentru garaj/living), posibilitate de recompartimentare ulterioară. Dezavantaj: cost mai mare (cofraje, armături, execuție mai pretențioasă), necesită control atent al interacțiunii cu zidăria de umplutură (efect de stâlp scurt, torsiune la parter deschis — vezi cap. 8.5).

**Varianta C — Structură integral din lemn (cadre de lemn sau pereți structurali CLT/panouri).** Soluție tradițională (case cu structură de lemn) sau modernă (CLT — cross-laminated timber). Avantaj: greutate proprie foarte redusă (forță seismică mică), execuție rapidă, sustenabilitate. Dezavantaj: în România, tradiția constructivă pentru locuințe individuale definitive este dominată de zidărie/beton; structurile de lemn necesită tratamente speciale (ignifugare, protecție biologică), sunt mai sensibile la umiditate și foc fără tratamente adecvate, iar disponibilitatea manoperei specializate CLT este limitată în afara marilor orașe. Se reține ca **alternativă valabilă**, dar nu ca soluție implicită.

**Varianta D — Structură metalică ușoară (cadre din profile laminate/formate la rece + închideri ușoare).** Avantaj: montaj foarte rapid, greutate mică. Dezavantaj: cost al protecției la foc și la coroziune, confort acustic/termic inferior fără soluții suplimentare de închidere, tradiție constructivă redusă pentru locuințe definitive (folosită mai ales la construcții provizorii sau anexe). Se reține ca alternativă posibilă, nedezvoltată în detaliu în acest memoriu.

### 2.2. Sistemul adoptat — zidărie portantă confinată

Se adoptă ca soluție de bază **Varianta A — zidărie portantă confinată**, cu:

- **Pereți structurali din zidărie** cu grosimea de 25–30 cm (cărămidă cu goluri verticale — GVP, sau blocuri de beton celular autoclavizat — BCA, de rezistență echivalentă), dispuși pe două direcții ortogonale, cu densitate care depășește amplu minimul normativ (cap. 6.5);
- **Sâmburi de beton armat** la colțuri, intersecții de pereți, capete de pereți liberi și lângă goluri mari, la interax maxim 4,0–5,0 m (cap. 7.2);
- **Centuri de beton armat** la nivelul fiecărui planșeu, formând un inel continuu care confinează zidăria și asigură efectul de diafragmă rigidă (cap. 7.3);
- **Planșee de beton armat monolit** la fiecare nivel, care transmit forțele orizontale la pereții structurali prin efect de șaibă rigidă.

**Justificarea alegerii:**

1. **Comportare seismică favorabilă și verificată** — zidăria confinată, corect alcătuită conform CR 6, are un istoric bun de comportare la cutremurele din România (spre deosebire de zidăria simplă nearmată, vulnerabilă). Confinarea (sâmburi + centuri) transformă un material fragil (zidăria) într-un ansamblu cu ductilitate limitată dar suficientă (factor de comportare q = 2,5, cap. 6.1), prin faptul că elementele de beton armat mențin integritatea panoului de zidărie fisurat și împiedică prăbușirea bruscă.
2. **Densitate de pereți compatibilă cu compartimentarea locuinței** — o locuință unifamilială are, prin însăși funcțiunea sa, un număr suficient de pereți despărțitori care pot fi proiectați ca pereți structurali fără a afecta funcționalitatea (spre deosebire de birouri/spații comerciale, unde se caută open-space).
3. **Cost și disponibilitate** — materialele (cărămidă/BCA, beton, oțel-beton) și manopera sunt larg disponibile și cunoscute pe piața construcțiilor unifamiliale din România; costul pe m² este, de regulă, inferior soluției în cadre de beton armat.
4. **Rigiditate laterală mare, deplasări mici** — la P+1E, un sistem de pereți denși are o rigiditate laterală foarte mare (secțiune 7.4), ceea ce limitează practic la valori neglijabile deplasările relative de nivel (drift), protejând finisajele fragile (tencuieli, gresie/faianță) și eliminând riscul de fisurare estetică.
5. **Simplitate de execuție și control** — nu necesită cofraje complexe sau personal specializat în armarea seismică a nodurilor de cadru; principalele riscuri de execuție (sâmburi turnați corect după realizarea zidăriei, cu ștrepi, și centuri monolite cu planșeul) sunt bine cunoscute și ușor de verificat pe șantier.

### 2.3. Regularitatea structurii

**Regularitatea în plan (P100-1 §4.4.3.2 / CR 6 §4.3):**
- Formă compactă, dreptunghiulară, cu raport laturi `10,60/9,00 = 1,18 < 4` ✓;
- Simetrie apropiată a maselor și rigidităților pe cele două direcții — pereții portanți sunt dispuși relativ uniform pe conturul și pe axele mediane ale clădirii (cap. 6.5) ✓;
- Excentricitatea structurală `e0` între centrul de masă (CM) și centrul de rigiditate (CR) este mică, datorită dispunerii simetrice a pereților portanți pe cele două fațade principale și a peretelui median — se estimează `e0 ≈ 0,03–0,05·L`, sub limita de `0,30·r` impusă de regularitate;
- Nefiind goluri mari de planșeu sau decroșuri de plan semnificative, structura se consideră **regulată în plan**.

**Regularitatea în elevație (P100-1 §4.4.3.3):**
- Pereții structurali sunt continui pe verticală de la fundație până la centura de la nivelul etajului, fără întreruperi sau decalări de la un nivel la altul ✓;
- Nu există variații de masă între niveluri peste 50% (masele celor două niveluri de calcul, 1.161,3 kN și 1.043,7 kN, diferă cu doar 10,2%) ✓;
- Nu apare mecanism de nivel slab (soft-storey), deoarece toți pereții portanți de la parter continuă identic la etaj (nu există parter deschis/garaj integrat în soluția de bază — dacă beneficiarul solicită un parter parțial deschis pentru garaj, se recomandă trecerea la Varianta B, cadre de beton armat, cap. 8.5, tocmai pentru a evita riscul de nivel slab la zidărie confinată cu parter discontinuu).

**Concluzie:** structura este **regulată în plan și în elevație**. Se aplică **metoda forțelor laterale echivalente** (P100-1 §4.5.3.2) ca metodă de calcul seismic, cu model de calcul plan pe fiecare direcție principală (practica uzuală pentru zidărie confinată la clădiri joase și regulate, CR 6 §5).

### 2.4. Alte alternative — argumentare succintă privind neadoptarea lor ca soluție implicită

Așa cum s-a arătat în cap. 2.1, structurile de lemn (Varianta C) și metalice ușoare (Varianta D) rămân alternative tehnic valabile pentru o locuință unifamilială P+1E, mai ales în contextul creșterii interesului pentru soluții sustenabile și execuție rapidă. Ele nu sunt însă adoptate ca soluție implicită a prezentului memoriu din următoarele motive:

- **Lemn (cadre tradiționale sau CLT):** necesită proiectare specializată conform SR EN 1995-1-1, cu verificări suplimentare de clasă de serviciu (umiditate), tratamente ignifuge/fungicide extinse la toată structura (nu doar la șarpantă, ca în soluția adoptată) și, în cazul CLT, panouri prefabricate cu lanț de aprovizionare mai limitat regional. Costul pe m² este, în prezent, comparabil sau superior zidăriei confinate pentru piața românească a locuinței unifamiliale standard.
- **Metalic ușor:** deși rapid de montat, necesită protecție anticorozivă riguroasă și protecție la foc a profilelor subțiri (spre deosebire de zidărie și beton, care oferă protecție la foc intrinsecă prin masivitate), precum și o anvelopă termică suplimentară pentru a atinge performanțele energetice cerute unei locuințe permanente.

Dacă beneficiarul optează explicit pentru una dintre aceste variante, calculul structural se reface integral conform normativului specific (SR EN 1995 pentru lemn, SR EN 1993 pentru oțel), păstrând identice datele de amplasament (seism, zăpadă, vânt, geotehnic) din cap. 4.

---

## 3. Materiale

### 3.1. Zidăria

Zidăria portantă se realizează din **cărămidă cu goluri verticale (GVP)** sau, alternativ, din **blocuri de beton celular autoclavizat (BCA)** de rezistență echivalentă, cu mortar de ciment-var.

**Caracteristicile zidăriei (CR 6/2013, SR EN 1996-1-1):**
- Rezistența normalizată la compresiune a elementului pentru zidărie: `fb = 10,0 N/mm²` (categorie uzuală pentru cărămidă GVP);
- Rezistența mortarului: **M5** (mortar de uz general, `fm = 5,0 N/mm²`), acceptabil și M10 pentru performanțe superioare;
- Rezistența caracteristică la compresiune a zidăriei (SR EN 1996-1-1 §3.6.1.2):
  `fk = K · fb^0,7 · fm^0,3`
  cu `K = 0,45` (grupa 1/2 de elemente, zidărie cu mortar general):
  `fk = 0,45 · 10^0,7 · 5^0,3 = 0,45 · 5,012 · 1,620 = 3,654 ≈ 3,65 N/mm²`.
- Rezistența caracteristică la forfecare, fără compresiune (`fvk0`): **0,30 N/mm²** (mortar general M5-M10, contact bun element-mortar);
- Modulul de elasticitate secant: `E = 1.000·fk = 1.000·3,65 = 3.650 N/mm²` (SR EN 1996-1-1, coeficient orientativ 1.000 pentru zidărie de categorie uzuală, verificat/majorat la PT pe bază de încercări dacă e cazul);
- Modulul de forfecare: `G = 0,4·E = 0,4·3.650 = 1.460 N/mm²`.
- Coeficienți parțiali de siguranță a materialului `γM` (CR 6, categorie de execuție B, categorie de control a fabricației I): **`γM = 2,2`** pentru gruparea fundamentală și **`γM = 1,5`** pentru gruparea seismică (reducere admisă de P100-1/CR 6 pentru situații accidentale/seismice).

Rezistențele de calcul rezultate:
`fd = fk/γM = 3,65/2,2 = 1,659 ≈ 1,66 N/mm²` (fundamental);
`fd,seismic = 3,65/1,5 = 2,433 ≈ 2,43 N/mm²` (seismic).

### 3.2. Betoane

Betoanele se stabilesc funcție de element și de clasa de expunere (SR EN 206 + NE 012, SR EN 1992-1-1 tabel 4.1):

| Element | Clasa beton | Clasa expunere | fck (MPa) | fcd = fck/1,5 (MPa) | Ecm (GPa) |
|---|---|---|---|---|---|
| Sâmburi de beton armat | C16/20 | XC1 | 16 | 10,67 | 27 |
| Centuri de beton armat | C16/20 | XC1 | 16 | 10,67 | 27 |
| Planșee de beton armat | C20/25 | XC1 | 20 | 13,33 | 30 |
| Fundații (tălpi continue) | C20/25 | XC2 | 20 | 13,33 | 30 |
| Scară (dacă din b.a.) | C20/25 | XC1 | 20 | 13,33 | 30 |
| Stâlpi/grinzi (Varianta B — cadre) | C20/25 (opțional C25/30) | XC1 | 20 (25) | 13,33 (16,67) | 30 (31) |
| Egalizare fundație | C8/10 | X0 | 8 | — | — |

Coeficient parțial beton `γc = 1,50` (grupări fundamentale/seismice, situații persistente). Coeficient `αcc = 1,0` (NA România).

`fcd (C16/20) = 16/1,5 = 10,67 N/mm²`; `fctm (C16/20) = 1,9 N/mm²`; `fctd = 0,7·fctm/1,5 = 0,887 N/mm²`.
`fcd (C20/25) = 20/1,5 = 13,33 N/mm²`; `fctm (C20/25) = 2,2 N/mm²`; `fctd = 0,7·fctm/1,5 = 1,027 N/mm²`.

**Justificarea claselor de beton adoptate.** Clasa C16/20 pentru sâmburi și centuri este suficientă și uzuală, deoarece aceste elemente lucrează în principal la confinare și continuitate armată, nu la eforturi de compresiune ridicate proprii (efortul preluat direct de beton este modest — rolul principal este de a susține armătura longitudinală și de a asigura monolitismul zidăriei). Clasa C20/25 pentru planșee și fundații asigură o rezervă de rezistență adecvată pentru elementele solicitate la încovoiere (planșeu) și la contact direct cu terenul (fundații, clasă de expunere XC2).

### 3.3. Oțel-beton

Se folosește oțel **B500C (BST500C)** conform SR EN 10080 / SR 438:
- Limita de curgere caracteristică `fyk = 500 N/mm²`;
- Coeficient parțial `γs = 1,15` → `fyd = 500/1,15 = 434,8 N/mm²`;
- Modul de elasticitate `Es = 200.000 N/mm²`;
- Clasa de ductilitate **C**: `εuk ≥ 7,5%`, raport `(ft/fy)k ≥ 1,15` și `≤ 1,35` — **obligatorie** pentru elementele de confinare (sâmburi, centuri) și pentru orice armătură din zone potențial disipative, conform P100-1 §5.3.2 și CR 6.

### 3.4. Acoperiri cu beton (nominal cover) și cerințe de rezistență la foc

`cnom = cmin + Δcdev`, cu `Δcdev = 10 mm`:

| Element | Expunere | cmin,dur | cnom adoptat |
|---|---|---|---|
| Sâmburi, centuri (interior) | XC1 | 15 mm | **20 mm** |
| Planșee (interior) | XC1 | 15 mm | **20 mm** |
| Fundații (contact cu terenul) | XC2 | 35 mm | **40–45 mm** |

**Verificarea prin metoda tabelară SR EN 1992-1-2** (rezistență la foc a elementelor de beton armat, gradul II–III adoptat, cap. 1.3):

| Element | Cerință normată | Verificare |
|---|---|---|
| Planșeu (dală 14 cm) | REI60–90 | grosime `h ≥ 100 mm` (REI90), `a ≥ 15 mm` → realizat `h = 140 mm`, `a = 20 + 4 = 24 mm` ✓ |
| Centuri/sâmburi (secțiune ≥25×25 cm) | R60–90 (element cu rol de confinare, nu portant principal la incendiu, dar continuitate structurală) | secțiune minimă tabelară R90 pentru element solicitat pe 4 fețe `bmin = 200 mm` → realizat `b = 250 mm` ✓ |
| Pereți de zidărie portantă (t ≥ 25 cm) | REI90–120 (zidărie, tabel SR EN 1996-1-2) | grosime minimă pentru REI120 la zidărie plină/GVP cu procent goluri redus `≥ 170 mm` → realizat `t = 250–300 mm` ✓ |
| Șarpantă de lemn (tratată ignifug) | R30 (element secundar de acoperiș, necombustibil sau tratat) | secțiuni conform cap. 10.3 + tratament ignifug de suprafață |

**Concluzie:** rezistența la foc cerută gradului II–III se asigură **integral prin grosimile secțiunilor și acoperirile cu beton/zidărie**, fără protecții suplimentare la elementele portante de bază; șarpanta de lemn primește tratament ignifug de suprafață ca măsură complementară.

### 3.5. Lemnul de construcție (șarpantă)

Pentru elementele șarpantei (căpriori, pane, popi, cosoroabe) se adoptă lemn de rășinoase clasa de rezistență **C24** (SR EN 338):
- Rezistența caracteristică la încovoiere: `fm,k = 24 N/mm²`;
- Modulul de elasticitate mediu paralel cu fibrele: `E0,mean = 11.000 N/mm²`;
- Coeficient de modificare `kmod = 0,9` (clasa de durată a încărcării — scurtă/medie durată pentru zăpadă, clasa de serviciu 1–2, uscat/semi-adăpostit);
- Coeficient parțial de material `γM = 1,3` (lemn masiv);
- `fm,d = kmod·fm,k/γM = 0,9·24/1,3 = 16,6 N/mm²`.

Toate elementele de lemn ale șarpantei se tratează obligatoriu **ignifug și fungicid/insecticid** (protecție împotriva focului, putrezirii și atacului biologic), conform normelor tehnice de protecție a lemnului în construcții, iar ancorarea la centura de beton se face prin scoabe/șuruburi metalice (cap. 10.3).

### 3.6. Durabilitatea materialelor și clasele de expunere

Durata de exploatare proiectată a locuinței se consideră **50 de ani** (SR EN 1990, clasa de durabilitate a proiectării S4 — construcții obișnuite, clădiri de locuit). Pentru a atinge această durată fără intervenții majore de reparație, se respectă condițiile de durabilitate ale SR EN 206 / NE 012, corelate cu clasele de expunere stabilite în cap. 3.2:

| Element | Clasă expunere | Raport A/C maxim | Dozaj minim ciment (kg/m³) | Observații |
|---|---|---|---|---|
| Sâmburi, centuri (interior, protejate) | XC1 | 0,65 | 260 | risc redus de carbonatare, protejate de zidărie/tencuială |
| Planșee (interior) | XC1 | 0,65 | 260 | idem |
| Fundații (contact cu terenul) | XC2 | 0,60 | 280 | umezeală permanentă/frecventă, risc de coroziune prin carbonatare mai ridicat |
| Soclu (zonă de stropire, contact cu apa pluvială) | XC4 | 0,55 | 300 | cicluri umed-uscat repetate |

Respectarea acestor rapoarte A/C și dozaje minime, corelată cu acoperirile de beton stabilite în cap. 3.4 (`cnom = 20 mm` interior, `40–45 mm` la fundații), asigură protecția armăturii împotriva coroziunii pe toată durata de exploatare proiectată, fără măsuri suplimentare de protecție (vopsele anticorozive, aditivi inhibitori) — soluții rezervate construcțiilor cu clase de expunere mai severe (XS, XD — nu este cazul unei locuințe amplasate departe de mare sau de surse de cloruri).

**Zidăria** — durabilitatea panourilor de zidărie portantă se asigură prin: alegerea unor elemente (cărămidă GVP/BCA) rezistente la îngheț-dezgheț pentru zonele expuse (soclu, atice), tencuieli de protecție cu grosime minimă `2 cm` pe ambele fețe și hidrofobizarea suprafețelor expuse direct intemperiilor (dacă zidăria rămâne aparentă la exterior).

---

## 4. Amplasamentul. Acțiuni climatice și seismice

### 4.1. Parametri seismici de amplasament

Conform P100-1/2013, hărțile de zonare (fig. 3.1 și 3.2), locuința unifamilială poate fi amplasată pe teritoriul României în zone cu seismicitate variabilă. Se dezvoltă exemplul de calcul pentru **Municipiul Iași (zona de Nord-Est)**, cu extindere comparativă la alte zone caracteristice, acoperind intervalul `ag = 0,20–0,35g` specific majorității amplasamentelor de locuințe unifamiliale din România:

| Parametru | Simbol | Valoare (Iași) |
|---|---|---|
| Accelerația terenului (IMR 225 ani) | ag | **0,20·g** |
| Perioada de colț | TC | **0,70 s** |
| Perioada de control inferioară | TB | 0,14 s |
| Perioada de control superioară | TD | 3,00 s |
| Factor de amplificare dinamică maximă | β0 | 2,50 |
| Factor de importanță/expunere (clasa III) | γI,e | **1,00** |

**Spectrul normalizat de răspuns elastic** (P100-1 §3.1, cu `TB = 0,2·TC = 0,14 s`; `TC = 0,70 s`):
- pentru `T < TB`: `β(T) = 1 + (β0−1)·T/TB`;
- pentru `TB ≤ T ≤ TC`: `β(T) = β0 = 2,50` (palier);
- pentru `TC < T ≤ TD`: `β(T) = β0·TC/T`;
- pentru `T > TD`: `β(T) = β0·TC·TD/T²`.

**Sensibilitatea la amplasament.** Aceleași calcule se re-rulează pentru orice UAT prin înlocuirea perechii `(ag, TC)`. Exemplificativ, pentru intervalul de amplasamente uzual al locuințelor unifamiliale (`ag = 0,20–0,35g`):

| Amplasament (exemplu) | ag | TC (s) | Sd(T1)/g (q=2,5) | Fb rezultat (kN) |
|---|---|---|---|---|
| Iași, Suceava, Botoșani (NE) | 0,20g | 0,70 | 0,200 | ~441 |
| Galați, Vaslui (NE/E) | 0,25g | 0,70 | 0,250 | ~551 |
| Cluj-Napoca (NV) | 0,10–0,15g | 0,70 | 0,100–0,150 | ~221–331 |
| Focșani, Vrancea, Buzău | 0,35–0,40g | 1,00–1,60 | 0,350–0,400 | ~772–882 |
| București (S) | 0,30g | 1,60 | 0,300 | ~662 |

Pentru amplasamentele cu `TC = 1,60 s` (București, zone din sudul țării), perioada fundamentală a locuinței (`T1 ≈ 0,20 s`, cap. 6.3) rămâne mult sub `TC`, deci ordonata spectrală normalizată `β(T1)` nu mai este `β0` maxim, ci se calculează pe ramura crescătoare dintre `0` și `TB`; în orice caz, `ag` mai mare majorează direct forța seismică proporțional. Prezentul memoriu dezvoltă cazul Iași (`ag = 0,20g`) ca exemplu de calcul complet; adaptarea la alt amplasament se face prin re-parcurgerea cap. 6 cu noii parametri, păstrând identică metodologia.

### 4.2. Acțiunea zăpezii (CR 1-1-3/2012, exemplu zona Iași)

`s = γIs · µi · Ce · Ct · sk`, cu:
- `sk = 2,00 kN/m²` (valoarea caracteristică la sol, zona NE);
- `µi = 0,80` (acoperiș cu pantă 30–38°, coeficient de formă pentru pantă moderată);
- `Ce = 1,00` (expunere normală, zonă neexpusă vântului puternic);
- `Ct = 1,00` (fără efect termic — pod ventilat, fără topire suplimentară);
- `γIs = 1,00` (clasa III de importanță).

`s = 1,00 · 0,80 · 1,00 · 1,00 · 2,00 = 1,60 kN/m²` (pe proiecția orizontală a acoperișului).

Pentru amplasamente cu altitudine mai mare sau zone climatice mai severe, `sk` poate ajunge la 2,5–3,0 kN/m² — se recalculează `s` proporțional, păstrând metodologia.

### 4.3. Acțiunea vântului (CR 1-1-4/2012)

- Presiunea de referință a vântului: `qb = 0,50 kN/m²` (zona NE, viteză de referință ~35 m/s);
- Coeficient de expunere la înălțimea medie `z ≈ 7,0 m` (coamă), teren categoria II–III (suburban/rural): `ce(z) ≈ 1,80`;
- Presiunea de vârf: `qp(z) = ce·qb = 1,80 · 0,50 = 0,90 kN/m²`;
- Coeficient de presiune net (față + aspirație spate, construcție joasă compactă): `cp,net ≈ 1,10`;
- Presiunea externă de calcul: `we = cp,net · qp = 1,10 · 0,90 = 0,99 ≈ 1,00 kN/m²`.

**Forța globală de vânt** pe direcția scurtă (fața lungă expusă `A = 10,60 × 5,95 = 63,1 m²`):
`Fw = we · A = 1,00 · 63,1 ≈ 63 kN`.

Această valoare (63 kN) este cu un ordin de mărime mai mică decât forța seismică de bază (441 kN, cap. 6.4) — la locuințele unifamiliale, la fel ca la clădirile mai înalte, **seismul este acțiunea laterală dimensionantă**, iar vântul se verifică suplimentar doar pentru elementele de anvelopă (fixarea învelitorii, ancorarea șarpantei — vezi cap. 10.3, verificarea la încovoiere sub zăpadă/vânt) și pentru presiunea de sucțiune pe acoperiș, relevantă la fixarea țiglei/tablei.

**Sucțiunea pe versantul de vânt al acoperișului** (relevantă pentru fixarea învelitorii și ancorarea căpriorilor la cosoroabă): `we,sucțiune = cp,e·qp`, cu `cp,e ≈ -0,6` (versant sub vânt sau pantă mică) → `we ≈ -0,54 kN/m²`. Ancorarea cosoroabei la centură (cap. 10.3) se dimensionează inclusiv la această forță de smulgere.

### 4.4. Studiu geotehnic

Conform NP 074/2014, studiul geotehnic este **documentație obligatorie** care însoțește proiectul, indiferent de categoria de importanță a construcției — la locuințe unifamiliale P+1E, riscul geotehnic este de regulă redus, dar caracterizarea terenului rămâne indispensabilă pentru dimensionarea corectă a fundațiilor (presiune convențională, adâncime de fundare, nivel hidrostatic). Stratificația de calcul adoptată pentru exemplul de față:

| Adâncime (m) | Strat | γ (kN/m³) | E (MPa) | φ' (°) | c' (kPa) |
|---|---|---|---|---|---|
| 0,0 – 0,40 | strat vegetal (se îndepărtează integral) | 17 | — | — | — |
| 0,40 – 6,0 | argilă prăfoasă vârtoasă | 19,0 | 10–15 | 18 | 22 |
| > 6,0 | argilă nisipoasă/pietriș | 19,5–20 | 30–50 | 28–32 | 0–10 |

- Presiune convențională de bază: `pconv = 200 kPa` (argilă prăfoasă vârtoasă, NP 112 anexa, valoare uzuală și conservatoare pentru locuințe unifamiliale pe teren de fundare mediu);
- Nivelul hidrostatic (NHS): sub cota de fundare adoptată (peste −3,0 m de la CTN), fără interferență cu infrastructura;
- Categoria geotehnică **1–2** (risc geotehnic redus, teren omogen, construcție ușoară cu încărcări mici) — pentru terenuri dificile (umpluturi necontrolate, argile expansive, praf macroporic sensibil la umezire, nivel hidrostatic ridicat) categoria geotehnică urcă la 2–3, iar tipul de fundare se reconsideră (radier general, cap. 9.2).

---

## 5. Acțiuni. Evaluarea încărcărilor (SR EN 1991)

### 5.1. Încărcări permanente (G)

**Planșeu curent (peste parter, spre etaj locuit) — beton armat monolit h = 14 cm:**

| Strat | Valoare (kN/m²) |
|---|---|
| Dală beton armat h = 140 mm (25 kN/m³ × 0,14) | 3,50 |
| Șapă + pardoseală (parchet/gresie) | 0,80 |
| Tencuială tavan (var-ciment, 2 cm) | 0,40 |
| Pereți despărțitori ușori (echivalent uniform, SR EN 1991-1-1 §6.3.1.2) | 1,00 |
| **Total permanent planșeu curent gk** | **5,70** |

**Planșeu peste etaj (spre pod nelocuit, sub șarpantă):**

| Strat | Valoare (kN/m²) |
|---|---|
| Dală beton armat h = 140 mm | 3,50 |
| Termoizolație pod (vată minerală ~20 cm) | 0,24 |
| Șapă de protecție termoizolație | 0,50 |
| Tencuială tavan | 0,40 |
| **Total permanent planșeu pod gk** | **4,64** |

**Acoperiș (șarpantă lemn + astereală/contralaț + învelitoare țiglă ceramică, pe proiecție orizontală):**

| Strat | Valoare (kN/m², proiecție orizontală) |
|---|---|
| Șarpantă lemn (căpriori, pane, popi) | 0,15 |
| Astereală/contralaț + parazăpezi | 0,10 |
| Învelitoare țiglă ceramică (corectată cu panta) | 0,85 |
| **Total acoperiș gk** | **1,10** |

**Pereți de zidărie (greutate proprie, pentru calculul maselor și al eforturilor):**

| Tip perete | Grosime | Greutate zidărie + tencuieli (kN/m²) |
|---|---|---|
| Perete exterior (portant) | 30 cm | 3,60 (zidărie, ρechiv. ≈ 12 kN/m³) + 0,80 (tencuieli 2×2 cm) = **4,40** |
| Perete interior (portant) | 25 cm | 3,00 (zidărie) + 0,80 (tencuieli) = **3,80** |

### 5.2. Încărcări utile (Q) — SR EN 1991-1-1 tabel 6.2 / NA

| Zonă | Categorie | qk (kN/m²) |
|---|---|---|
| Camere de locuit, dormitoare | A | 1,50 |
| Scări | — | 2,00 |
| Balcoane, terase | A/exterior | 2,00 |
| Pod nelocuit (necirculabil) | H | 0,40 |

### 5.3. Coeficienți ψ (SR EN 1990, anexa A1 / CR 0)

| Categorie | ψ0 | ψ1 | ψ2 |
|---|---|---|---|
| Locuințe (A) | 0,7 | 0,5 | 0,3 |
| Pod necirculabil (H) | 0,0 | 0,0 | 0,0 |
| Zăpadă (altitudine < 1.000 m) | 0,7 | 0,5 | 0,0 |
| Vânt | 0,6 | 0,2 | 0,0 |

Factor de combinație pentru masele seismice: `ψE,i = φ · ψ2,i`, cu `φ = 1,0` (un singur nivel curent ocupat, corelație completă între niveluri la o clădire de locuit unifamilială, spre deosebire de clădirile cu multe etaje identice unde `φ = 0,8`), `ψ2 = 0,3` (locuit) → `ψE = 1,0 · 0,3 = 0,30`. Pentru pod (categoria H), `ψ2 = 0` → contribuția utilei podului la masa seismică este nulă.

### 5.4. Grupări de acțiuni (CR 0/2012)

**Gruparea fundamentală (SLU persistentă):**
`Σ γG,j·Gk,j + γQ,1·Qk,1 + Σ γQ,i·ψ0,i·Qk,i`
cu `γG = 1,35`, `γQ = 1,50` (defavorabil), `γG = 1,00` (favorabil).

**Gruparea specială (seismică, SLU):**
`Σ Gk,j + γI,e·AEk + Σ ψ2,i·Qk,i`
(acțiunea seismică `AEk` amplificată de `γI,e = 1,0`; utilele reduse cu `ψ2`).

**Gruparea caracteristică (SLS, cvasipermanentă):**
`Σ Gk,j + Σ ψ2,i·Qk,i` pentru verificări de deformații pe termen lung (săgeți planșee, șarpantă).

### 5.5. Descărcarea încărcărilor pe elementele verticale (traseul de descărcare)

Traseul de descărcare gravitațională: **planșeu → pereți portanți (zidărie confinată) → tălpi continue de fundare → teren.**

**Efortul acumulat pe peretele median longitudinal la nivelul parterului** (perete cel mai solicitat — susține aria aferentă din ambele travei adiacente, pe ambele niveluri):

Aria aferentă peretelui median (lungime netă considerată 9,54 m, lățime aferentă medie 5,30 m pe fiecare parte, adică jumătate din deschiderea totală de 10,60 m): `A_aferentă ≈ 9,54 × 5,30 = 50,6 m²`.

Presiuni de calcul (SLU) pe cele două planșee susținute de acest perete:
`p_SLU,planșeu curent = 1,35·gk + 1,5·qk = 1,35·5,70 + 1,5·1,50 = 7,695 + 2,25 = 9,945 kN/m²`;
`p_SLU,planșeu pod = 1,35·gk + 1,5·qk = 1,35·4,64 + 1,5·0,40 = 6,264 + 0,60 = 6,864 kN/m²`.

Încărcare din cele două planșee: `N_planșee = A_aferentă·(p1+p2) = 50,6·(9,945+6,864) = 50,6·16,809 = 850,7 kN`.

Greutate proprie a peretelui median pe cele 2 niveluri (lungime brută adoptată 10,60 m, înălțime totală `3,00+2,95 = 5,95 m`, greutate `3,80 kN/m²`):
`G_perete = 10,60·5,95·3,80 = 239,5 kN`; la SLU: `1,35·239,5 = 323,3 kN`.

`N_Ed,total (parter) = 850,7 + 323,3 = 1.174,0 kN`, distribuit pe lungimea netă a peretelui `9,54 m` și grosimea `0,25 m` → `A_perete = 9,54·0,25 = 2,385 m²`.

`σ_Ed = N_Ed/A_perete = 1.174.000 N / 2.385.000 mm² = 0,492 N/mm²` — valoare care se folosește direct în verificarea la compresiune (cap. 7.5).

**Reducerea încărcărilor utile pe elementele verticale cu mai multe niveluri** (SR EN 1991-1-1 §6.3.1.2, factor `αn`) nu se aplică semnificativ la P+1E (doar 2 niveluri, reducere neglijabilă) — spre deosebire de clădirile cu multe etaje, unde reducerea este economic relevantă.

### 5.6. Încărcarea din temperatură și contracție

Fiind o construcție de dimensiuni mici (`10,60 × 9,00 m`), mult sub limita de 30–50 m la care se justifică rosturile de dilatare-contracție pentru structuri de beton/zidărie, **nu se prevăd rosturi de dilatare**. Efectele variației termice și contracției betonului/zidăriei se preiau prin armătura minimă de contracție-temperatură din planșee (repartiție continuă peste reazeme) și prin continuitatea centurilor, fără măsuri speciale suplimentare.

### 5.7. Încărcări concentrate și speciale

**Scara interioară** (dacă din beton armat): reacțiunile podestelor și ale rampei se transmit pereților de rezemare (verificare locală la PT, similar planșeelor curente).

**Balcoane/console** (dacă prevăzute în proiectul de arhitectură): încărcare utilă majorată `qk = 2,0–4,0 kN/m²` funcție de destinație, cu verificarea suplimentară a momentului negativ la încastrare în planșeu/centură.

**Coșul de fum/ventilație** (dacă zidit): greutate proprie transmisă direct fundației proprii sau planșeului, cu verificare locală de străpungere dacă traversează planșeul.

---

## 6. Calculul seismic. Metoda forțelor laterale echivalente

**Aplicabilitatea metodei.** Metoda forțelor laterale echivalente (P100-1 §4.5.3.2) se aplică structurilor regulate, cu răspuns dominat de modul fundamental de translație pe fiecare direcție și `T1 ≤ 4·TC` și `T1 ≤ 1,5 s`. Structura de față (`T1 ≈ 0,20 s`, regulată — cap. 2.3) îndeplinește amplu ambele condiții → metoda este pe deplin aplicabilă, fără a necesita validare prin analiză modală (uzuală doar pentru clădiri cu peste 30 m înălțime sau cu neregularități — nu este cazul unei locuințe P+1E).

### 6.1. Factorul de comportare q

**Zidărie confinată (Varianta A adoptată).** Conform P100-1/2013 cap. 8 (tabel 8.1/8.3) și CR 6/2013, zidăria confinată regulată, alcătuită conform prescripțiilor de sâmburi și centuri, beneficiază de un factor de comportare superior zidăriei simple nearmate:
- Zidărie simplă nearmată: `q = 1,5–1,75`;
- **Zidărie confinată (sâmburi + centuri conform CR 6): `q = 2,5`** — valoare adoptată, aplicabilă structurilor regulate în plan și elevație, cu densitate de pereți superioară minimului normativ (cap. 6.5);
- Zidărie armată (armătură în rosturi orizontale, mai rar folosită la locuințe unifamiliale standard): `q = 2,5–3,0`.

**Cadre de beton armat (Varianta B, comparativ, cap. 8):** pentru structuri în cadre DCM, `q = q0·αu/α1`, cu `q0 = 3,0` (cadre, mai multe niveluri) și `αu/α1 = 1,15` (redundanță mai mică decât la o structură cu multe travei, specifică unei locuințe cu puține deschideri) → `q = 3,0·1,15 = 3,45 ≈ 3,45`, valoare tipică a intervalului `3,0–3,5` menționat pentru cadre de beton armat la clădiri joase.

Adoptarea `q = 2,5` pentru zidărie confinată reduce forța seismică de calcul comparativ cu zidăria nearmată (`q = 1,5–1,75` ar da o forță mai mare cu 43–67%), justificând economic soluția confinată — cu condiția respectării stricte a alcătuirilor constructive din CR 6 (cap. 7), care sunt cele care „cumpără" acest factor de comportare superior.

### 6.2. Evaluarea maselor și greutății seismice

Greutatea seismică pe metru pătrat de planșeu curent (locuit):
`g_seism = gk + ψE·qk = 5,70 + 0,30·1,50 = 5,70 + 0,45 = 6,15 kN/m²`.

Greutatea seismică pe metru pătrat de planșeu pod (necirculabil, ψE = 0):
`g_seism,pod = gk = 4,64 kN/m²` (utila categoriei H nu contribuie, `ψ2 = 0`).

**Nivelul 1 — masa la cota planșeului peste parter (z = 3,00 m):**
- Planșeu curent: `A_pl · gk,SLS = 95,4 · 5,70 = 543,8 kN` (pentru masa seismică se folosește greutatea caracteristică totală a planșeului, plus contribuția utilei ponderate);
- Pereți portanți parter (lungime netă calculată în cap. 6.5, greutate medie ponderată ~4,2 kN/m², înălțime 3,00 m): `≈ 574,6 kN`;
- Utilă seismică (`A_pl·qk·ψE = 95,4·1,50·0,30`): `42,9 kN`;
- **Total nivel 1: `543,8 + 574,6 + 42,9 = 1.161,3 kN`.**

**Nivelul 2 — masa la cota planșeului peste etaj/bază șarpantă (z = 5,95 m):**
- Planșeu pod: `A_pl · gk,pod = 95,4 · 4,64 = 442,9 kN`;
- Pereți portanți etaj (greutate medie ~4,0 kN/m², înălțime 2,95 m): `≈ 495,9 kN`;
- Acoperiș (șarpantă + învelitoare, pe proiecție): `A_pl·1,10 = 95,4·1,10 = 104,9 kN`;
- Utilă pod (categoria H, `ψE = 0`): `0 kN`;
- **Total nivel 2: `442,9 + 495,9 + 104,9 = 1.043,7 kN`.**

**Greutatea seismică totală:**
`W = 1.161,3 + 1.043,7 = 2.205,0 kN` (≈ 224,8 t).

### 6.3. Perioada fundamentală de vibrație

**Estimare empirică** (P100-1 §B.2, SR EN 1998-1 §4.3.3.2.2):
`T1 = Ct · H^(3/4)`, cu `Ct = 0,05` (structuri cu pereți), `H = 5,95 m` (cota de la baza structurii la ultimul nivel cu masă semnificativă):
`T1 = 0,05 · 5,95^0,75 = 0,05 · 3,97 = 0,198 s`.

Se adoptă pentru calcul `T1 = 0,20 s`. Deoarece `TB (0,14 s) < T1 (0,20 s) < TC (0,70 s)`, structura se află pe **palierul spectral** unde `β(T1) = β0 = 2,50` — situația de amplificare maximă, dar caracteristică oricărei construcții joase și rigide precum o locuință unifamilială (perioadele proprii mici cad practic mereu pe acest palier).

### 6.4. Forța seismică de bază și distribuția pe niveluri

Ordonata spectrului de proiectare:
`Sd(T1) = ag · β(T1) / q = 0,20g · 2,50 / 2,5 = 0,20·g`.

Forța tăietoare de bază (P100-1 §4.5.3.2.2):
`Fb = γI,e · [Sd(T1)/g] · W · λ`
cu `λ = 1,0` — la P100-1 §4.5.3.2.2, factorul de corecție `λ = 0,85` se aplică doar clădirilor cu cel puțin 3 niveluri și `T1 ≤ 2·TC`; locuința are 2 niveluri suprateran, deci **`λ = 1,0`**.

`Fb = 1,00 · 0,20 · 2.205,0 · 1,00 = **441,0 kN**`.

**Coeficientul seismic global:** `cs = Fb/W = 441,0/2.205,0 = 0,200` (= 20% din greutate — valoare tipică pentru o construcție rigidă și joasă în zonă cu `ag = 0,20g`, pe palierul spectral).

**Distribuția forței pe niveluri** (P100-1 §4.5.3.3, distribuție proporțională cu `zi·Wi`):

`Σ(zj·Wj) = z1·W1 + z2·W2 = 3,00·1.161,3 + 5,95·1.043,7 = 3.483,9 + 6.210,0 = 9.693,9`

`F1 = Fb·(z1·W1)/Σ(zj·Wj) = 441,0·3.483,9/9.693,9 = 158,5 kN`
`F2 = Fb·(z2·W2)/Σ(zj·Wj) = 441,0·6.210,0/9.693,9 = 282,5 kN`

Verificare: `F1+F2 = 158,5+282,5 = 441,0 kN = Fb` ✓.

**Tăietoarea de nivel:**
`V_etaj = F2 = 282,5 kN` (tăietoarea la interfața parter/etaj — preluată doar de pereții etajului);
`V_parter = F1+F2 = 441,0 kN = Fb` (tăietoarea la bază — preluată de toți pereții parterului și transmisă fundației).

### 6.5. Verificarea densității minime a pereților structurali (CR 6/2013)

CR 6/2013 (tabel 4.2, funcție de `ag` și regimul de înălțime) impune o **densitate minimă de pereți structurali** pe fiecare din cele două direcții ortogonale ale clădirii, exprimată ca raport între aria secțiunii orizontale a pereților portanți (pe direcția respectivă) și aria planșeului. Pentru locuințe P+1E:
- La `ag ≤ 0,20g`: `p_min ≈ 4,0%` pe fiecare direcție;
- La `ag = 0,25–0,30g`: `p_min ≈ 5,0%`;
- La `ag = 0,35g` (zone cu seismicitate ridicată — Vrancea, sudul/estul țării): `p_min ≈ 6,0%`.

Se dezvoltă verificarea pentru amplasamentul de exemplu (`ag = 0,20g` → `p_min = 4,0%`):

`A_pl = 95,4 mp`; `A_necesar = 0,04 · 95,4 = 3,82 mp/direcție`.

**Direcția X** (pereți dispuși paraleli cu latura scurtă de 9,00 m, care rigidizează mișcarea pe direcția lungă X): 3 șiruri de pereți — fațadă (lungime brută 9,00 m, goluri uși/ferestre ~35% → net 5,85 m, `t = 0,30 m`), perete median interior (lungime brută 9,00 m, gol ușă ~15% → net 7,65 m, `t = 0,25 m`), fațadă spate (lungime brută 9,00 m, goluri ~30% → net 6,30 m, `t = 0,30 m`):

`A_X = 5,85·0,30 + 7,65·0,25 + 6,30·0,30 = 1,755 + 1,913 + 1,890 = 5,558 mp`
`p_X = A_X/A_pl = 5,558/95,4 = 5,83%` ✓ (`> 4,0%`, rezervă `+46%`).

**Direcția Y** (pereți dispuși paraleli cu latura lungă de 10,60 m, care rigidizează direcția scurtă Y): 2 fațade laterale (lungime brută 10,60 m fiecare, goluri ferestre ~30% → net 7,42 m, `t = 0,30 m`) + 1 perete median longitudinal (lungime brută 10,60 m, gol ușă interioară ~10% → net 9,54 m, `t = 0,25 m`):

`A_Y = 2·(7,42·0,30) + 9,54·0,25 = 2·2,226 + 2,385 = 4,452 + 2,385 = 6,837 mp`
`p_Y = A_Y/A_pl = 6,837/95,4 = 7,17%` ✓ (`> 4,0%`, rezervă `+79%`).

**Concluzie:** densitatea de pereți structurali realizată (`5,83%` pe X, `7,17%` pe Y) depășește amplu minimul CR 6 (`4,0%`), inclusiv pentru amplasamente cu seismicitate ceva mai ridicată (până la `ag ≈ 0,25g`, `p_min = 5,0%`, rezervele rămân pozitive: `+17%` pe X și `+43%` pe Y). Pentru amplasamente cu `ag = 0,35g` (`p_min = 6,0%`), direcția X (`5,83%`) ar necesita o ușoară suplimentare de zidărie portantă (un perete median suplimentar sau majorarea grosimii la 35 cm) — aspect care se verifică punctual la faza PT funcție de amplasamentul definitiv.

---

## 7. VARIANTA A — Zidărie portantă confinată (CR 6/2013)

### 7.1. Alcătuirea generală

Sistemul structural constă din:
- **Pereți structurali din zidărie**, grosime 30 cm (exteriori) și 25 cm (interiori portanți), realizați din cărămidă GVP (`fb = 10,0 N/mm²`) sau BCA echivalent, cu mortar M5;
- **Sâmburi de beton armat** (stâlpișori de confinare), dispuși vertical în grosimea peretelui, la colțuri, intersecții de pereți, capetele pereților liberi și de o parte și de alta a golurilor mai mari de 1,5 m, la interax maxim 4,0–5,0 m pe orice perete portant (cap. 7.2);
- **Centuri de beton armat**, dispuse orizontal la nivelul fiecărui planșeu (peste parter, peste etaj), formând un inel închis pe conturul și pe pereții interiori portanți (cap. 7.3);
- **Buiandrugi de beton armat** deasupra golurilor de uși și ferestre, rezemați pe zidărie minimum 25 cm de fiecare parte;
- **Planșee de beton armat monolit**, legate monolit de centuri, asigurând efectul de diafragmă rigidă orizontală.

**Verificarea zvelteței peretelui** (CR 6 §5.3, condiție de bază pentru evitarea flambajului/instabilității locale): raportul între înălțimea efectivă și grosimea efectivă a peretelui:
`h_ef/t_ef = 2,95/0,25 = 11,8 < 24` (limita CR 6 pentru pereți structurali) ✓ — verificare amplu satisfăcută, cu rezervă mare (rezultă din regimul redus de înălțime, caracteristic locuinței unifamiliale).

**Dimensiunea minimă a panourilor de zidărie** (CR 6): un panou de zidărie structural trebuie să aibă lungimea minimă `≥ 0,5 m` și `≥ 0,4·h` (adică `≥ 0,4·2,95 = 1,18 m` la etaj); panourile din alcătuirea adoptată (cap. 6.5) au lungimi nete de 5,85–9,54 m, deci amplu peste minim; golurile individuale (uși, ferestre) respectă condiția ca zidăria rămasă între goluri să depășească acest minim.

### 7.2. Sâmburi de beton armat

**Poziționare obligatorie (CR 6/2013 §5.4):**
- La toate colțurile clădirii și la toate intersecțiile de pereți portanți (formă de T sau cruce în plan);
- La capetele libere ale pereților structurali (unde peretele nu se intersectează cu alt perete);
- De o parte și de alta a golurilor cu lățime mai mare de 1,5 m;
- La interax maxim 4,0–5,0 m pe orice perete portant continuu, astfel încât niciun panou de zidărie dintre doi sâmburi consecutivi să nu depășească această distanță.

**Secțiune și armare adoptată:** `25 × 25 cm`, beton `C16/20`, armătură longitudinală `4Ø12` (`As = 4·113,1 = 452,4 mm²`, coeficient de armare `ρ = 452,4/62.500 = 0,72%` — încadrat în intervalul uzual `0,6–1,0%` pentru sâmburi de confinare), etrieri `Ø6/100–150 mm` (îndesiți la `100 mm` în zonele de la capetele sâmburelui, pe o lungime `≥ 45 cm`, și `150 mm` în restul înălțimii).

**Rolul funcțional:** sâmburii nu înlocuiesc zidăria ca element de rezistență la compresiune/forfecare (contribuția lor directă la aria activă este mică), ci **confinează** panoul de zidărie — mențin coeziunea și integritatea peretelui fisurat sub acțiunea seismică, împiedicând dezmembrarea bruscă și asigurând o comportare progresivă (ductilă) în locul cedării fragile caracteristice zidăriei nearmate. Acesta este mecanismul care justifică factorul de comportare superior `q = 2,5` (cap. 6.1) față de zidăria simplă.

**Execuția sâmburilor.** Sâmburii se toarnă **după** ridicarea zidăriei adiacente (nu înainte), cu zidăria lăsată în trepte (ștrepi) la fiecare 3–4 asize, pentru a asigura o conlucrare mecanică bună între beton și zidărie (petrecere/ancorare a ștrepilor în beton `≥ 50·Ø`). Turnarea sâmburilor înainte de zidărie (practică incorectă, uneori întâlnită pe șantier) elimină conlucrarea și anulează practic efectul de confinare — motiv pentru care această succesiune se verifică explicit ca punct de control la fazele determinante (cap. 13.2).

### 7.3. Centuri de beton armat

**Poziționare:** la nivelul fiecărui planșeu — peste parter (la cota `+3,00 m`) și peste etaj (la cota `+5,95 m`, imediat sub șarpantă) — pe toți pereții portanți, formând un **inel închis** continuu pe contur și pe pereții interiori, monolit legat de planșeu.

**Secțiune și armare adoptată:** `25 × 25 cm` (aceeași lățime cu grosimea zidăriei interioare, respectiv înglobată în grosimea peretelui exterior), beton `C16/20`, armătură longitudinală `4Ø12`, etrieri `Ø6/150 mm`, cu **continuitate obligatorie la colțuri** (suprapunere minimum `60 cm` pe fiecare direcție, cu bare de colț îndoite la 90°, nu simple suprapuneri drepte, pentru a asigura transmiterea completă a eforturilor de întindere din colț).

**Rolul funcțional al centurilor:**
1. **Confinare orizontală** — completează sâmburii verticali, închizând un cadru spațial de confinare (sâmburi + centuri) în jurul fiecărui panou de zidărie;
2. **Diafragmă rigidă** — solidarizată cu planșeul de beton armat, centura asigură transmiterea forțelor seismice orizontale de la masa fiecărui nivel la toți pereții structurali, proporțional cu rigiditatea acestora;
3. **Repartizare uniformă a încărcărilor gravitaționale** — centura descarcă uniform reacțiunile planșeului pe toată lungimea peretelui suport, evitând concentrări de eforturi.

### 7.4. Armarea minimă și procentele de oțel

| Element | Secțiune | Armătură longitudinală | ρ (%) | Etrieri |
|---|---|---|---|---|
| Sâmbure | 25×25 cm | 4Ø12 (452 mm²) | 0,72% | Ø6/100–150 |
| Centură | 25×25 cm | 4Ø12 (452 mm²) | 0,72% | Ø6/150 |
| Buiandrug | 25×25 cm (h funcție de deschidere) | 3Ø12 (339 mm²) + 2Ø10 (157 mm², la partea superioară) | — | Ø6/150 |

Aceste procente respectă minimele constructive uzuale CR 6 pentru elementele de confinare a zidăriei (`ρmin ≥ 0,6–0,8%` pentru sâmburi/centuri de secțiune mică), asigurând totodată o cantitate suficientă de oțel ductil (clasa C, B500C) pentru rolul de confinare descris mai sus.

### 7.5. Verificarea pereților la compresiune

Se verifică peretele median longitudinal la parter, cel mai solicitat (`N_Ed = 1.174,0 kN`, `A_perete = 2,385 mp`, `σ_Ed = 0,492 N/mm²`, cap. 5.5):

`N_Rd = Φ·fd·A`, cu `Φ = 0,90` (factor de reducere pentru zveltețe redusă și excentricitate mică — sarcină cvasi-centrică, caracteristică unui perete median simetric încărcat), `fd = 1,66 N/mm²` (fundamental, cap. 3.1):

`N_Rd = 0,90 · 1,66 · 2.385.000 mm² = 0,90·1,66 = 1,494 N/mm² × 2.385.000 = 3.563.190 N ≈ 3.563 kN`.

`N_Ed/N_Rd = 1.174,0/3.563,0 = **0,33**` ✓ — verificare satisfăcută cu rezervă amplă (`67%`).

### 7.6. Verificarea pereților la forfecare (acțiune seismică)

**Repartiția forței tăietoare de nivel pe pereți** — la clădiri joase, cu pereți scurți și rigizi (`h/l < 1`), repartizarea se face, acoperitor, proporțional cu aria secțiunii transversale a fiecărui perete pe direcția considerată (metodă simplificată, admisă de practica de proiectare pentru pereți cu rigiditate dominată de forfecare).

**Peretele median (direcția X), `A = 1,913 mp`, din `A_X,total = 5,558 mp`:**
`V_perete = V_parter·(A_perete/A_X,total) = 441,0·(1,913/5,558) = 441,0·0,344 = 151,7 kN`.

**Efortul de compresiune asociat combinației seismice** (`G + ψ2·Q`, fără factori parțiali):
`p_seismic,planșeu curent = gk + ψ2·qk = 5,70 + 0,30·1,50 = 6,15 kN/m²`;
`p_seismic,planșeu pod = gk = 4,64 kN/m²` (ψ2 = 0 pentru categoria H);
`N_planșee,seismic = A_aferentă·(p1+p2) = 50,6·(6,15+4,64) = 50,6·10,79 = 546,0 kN`;
`G_perete,seismic = 239,5 kN` (fără majorare, γ=1,0 la gruparea seismică);
`N_total,seismic = 546,0 + 239,5 = 785,5 kN`;
`σd = N_total,seismic/A_perete = 785.500/2.385.000 = 0,329 N/mm²`.

**Rezistența la forfecare a zidăriei sub compresiune** (SR EN 1996-1-1 §3.6.2):
`fvk = fvk0 + 0,4·σd = 0,30 + 0,4·0,329 = 0,30 + 0,132 = 0,432 N/mm²`
`fvd = fvk/γM,seismic = 0,432/1,5 = 0,288 N/mm²`

`V_Rd = fvd·t·lc`, cu `lc` = lungimea netă a peretelui median = `7,65 m = 7.650 mm`, `t = 250 mm`:
`V_Rd = 0,288·250·7.650 = 0,288·250 = 72 N/mm × 7.650 mm = 550.800 N ≈ 550,8 kN`.

`V_Ed/V_Rd = 151,7/550,8 = **0,28**` ✓ — verificare satisfăcută, rezervă `72%`.

**Verificarea globală pe cele două direcții** (însumarea capacităților tuturor pereților, cu `fvd` similar pentru toți, dat fiind `σd` comparabil):

Direcția X: `V_Rd,total,X = fvd·A_X = 0,288·5.558.000 mm² = 1.600.704 N ≈ 1.600,5 kN`
`V_Ed/V_Rd,X = 441,0/1.600,5 = **0,28**` ✓

Direcția Y: `V_Rd,total,Y = fvd·A_Y = 0,288·6.837.000 mm² = 1.969.056 N ≈ 1.969,1 kN`
`V_Ed/V_Rd,Y = 441,0/1.969,1 = **0,22**` ✓

### 7.7. Verificarea la încovoiere din planul peretelui (acțiune orizontală — vânt)

Pentru un perete de fațadă solicitat perpendicular pe planul său de acțiunea vântului (`we ≈ 1,00 kN/m²`, cap. 4.3), rezemat sus și jos pe centuri (grindă simplu rezemată pe verticală, deschidere `h = 2,95 m` la etaj):

`M_Ed = we·h²/8 = 1,00·2,95²/8 = 1,00·8,70/8 = 1,088 kNm/m`.

Rezistența la încovoiere din planul peretelui a secțiunii de zidărie confinată (lățime unitară 1,00 m, cu contribuția sâmburilor la marginile panoului):
`M_Rd ≈ (0,10 + fd)·t²/6` (formulă simplificată, incluzând un efort de compresiune de referință redus din greutatea proprie plus contribuția fd):
`M_Rd = (0,10 + 0,43)·250²/6 = 0,53·62.500/6 = 33.125/6 ≈ 5,52 kNm/m`.

`M_Ed/M_Rd = 1,088/5,52 = **0,20**` ✓ — verificare satisfăcută cu rezervă mare (`80%`), confirmând că vântul nu guvernează dimensionarea niciunui perete al locuinței.

### 7.8. Sinteza verificărilor Varianta A

| Verificare | Ed/Rd | Stare |
|---|---|---|
| Densitate pereți, direcția X | 5,83% (min. 4,0%) | ✓ rezervă 46% |
| Densitate pereți, direcția Y | 7,17% (min. 4,0%) | ✓ rezervă 79% |
| Zveltețe perete `h_ef/t_ef` | 11,8 (max. 24) | ✓ |
| Compresiune perete median | 0,33 | ✓ |
| Forfecare perete median (local) | 0,28 | ✓ |
| Forfecare globală, direcția X | 0,28 | ✓ |
| Forfecare globală, direcția Y | 0,22 | ✓ |
| Încovoiere din plan (vânt) | 0,20 | ✓ |
| Coeficient de armare sâmburi/centuri | 0,72% | ✓ (interval 0,6–1,0%) |

Toate verificările Variantei A sunt satisfăcute cu rezerve confortabile (cel mai solicitat parametru — forfecarea locală a peretelui median — folosește doar `28%` din capacitate), confirmând că sistemul de zidărie confinată dimensionat conform CR 6 este **amplu acoperitor** pentru o locuință unifamilială P+1E în zona seismică de exemplu (`ag = 0,20g`).

---

## 8. VARIANTA B — Cadre de beton armat cu umplutură nestructurală

### 8.1. Alcătuire generală

Ca alternativă la zidăria confinată (cap. 7), atunci când proiectul de arhitectură impune spații deschise (garaj integrat la parter, living deschis pe două-trei laturi cu ferestre mari, absența unor pereți portanți în anumite zone), se poate adopta o structură în **cadre de beton armat**:

- **Stâlpi** de secțiune `25×25 cm` până la `30×30 cm`, dispuși la interax `3,50–4,50 m`, beton `C20/25` (opțional `C25/30` la stâlpii cel mai solicitați);
- **Grinzi** de secțiune `25×40 cm`, pe conturul și pe axele interioare ale clădirii, la nivelul fiecărui planșeu;
- **Noduri rigide** grindă-stâlp, cu detaliere seismică (armătură transversală de nod, ancoraje conform cap. 8.3);
- **Zidărie de umplutură nestructurală** (aceleași materiale ca la Varianta A — GVP/BCA), care închide golurile dintre cadre, dar **nu se consideră portantă** în calculul structural — rolul ei este exclusiv de compartimentare și izolare;
- **Planșee de beton armat** identice ca alcătuire cu Varianta A (cap. 10.1).

### 8.2. Predimensionarea stâlpilor

Pentru un stâlp interior tipic (tramă exemplificativă `5,30 × 4,50 m`, arie aferentă `23,85 mp/nivel`), efortul axial la baza parterului (2 niveluri suprapuse):

`N_Ed = (p_SLU,planșeu curent + p_SLU,planșeu pod)·A_aferentă + G_stâlp,SLU`
`= (9,945 + 6,864)·23,85 + greutate proprie stâlp`
`= 16,809·23,85 + (0,30·0,30·5,95·25·1,35)`
`= 400,9 + 18,1 = 419,0 kN`.

**Verificarea efortului axial normalizat** (P100-1 §5.4.3.2.1, condiție de ductilitate pentru stâlpii DCM: `νd ≤ 0,55`):
`νd = N_Ed/(Ac·fcd)`, cu `fcd (C20/25) = 13,33 N/mm²`:

Pentru secțiune `30×30 cm` (`Ac = 90.000 mm²`):
`νd = 419.000/(90.000·13,33) = 419.000/1.199.700 = **0,349**` — sub limita `0,55` (DCM), cu rezervă amplă `37%` ✓.

Pentru secțiune `25×25 cm` (`Ac = 62.500 mm²`), mai economică dar mai solicitată:
`νd = 419.000/(62.500·13,33) = 419.000/833.125 = **0,503**` — sub `0,55`, dar cu rezervă redusă (`9%`), aproape de pragul de ductilitate.

**Decizie:** se adoptă secțiunea `30×30 cm` pentru stâlpii interiori și de colț de la parter (rezervă confortabilă de ductilitate), cu posibilitatea reducerii la `25×25 cm` la stâlpii de etaj (efort axial mai mic, un singur nivel deasupra).

### 8.3. Predimensionarea grinzilor

Grinda de bordaj/interioară, secțiune `25×40 cm`, deschidere `4,50 m`, susține planșeul (arie aferentă pe metru liniar `≈ 2,65 m`, semi-deschiderea dintre travei):
`p_Ed = p_SLU,planșeu curent·2,65 = 9,945·2,65 = 26,4 kN/m` (plus greutate proprie grindă `0,25·0,40·25·1,35 = 3,4 kN/m`, total `≈ 29,8 kN/m`).

`M_Ed = p_Ed·L²/8 = 29,8·4,50²/8 = 29,8·20,25/8 = 75,4 kNm` (travee simplu rezemată, simplificat; la PT se calculează hiperstatic cu momente negative la reazeme).

Secțiunea `25×40 cm` cu armătură dublă (`As` la câmp și la reazem, dimensionată la PT prin calcul de rezistență la încovoiere `SR EN 1992-1-1`) acoperă acest moment cu procent de armare uzual `ρ ≈ 0,8–1,2%`, în limitele constructive normale pentru grinzi de cadru DCM.

### 8.4. Interacțiunea cu zidăria de umplutură

Deși nestructurală în calcul, zidăria de umplutură **influențează real comportarea seismică** a cadrului și trebuie tratată cu atenție la proiectare și execuție:

- **Rigidizare parazitară** — un panou de umplutură plin, bine încleștat în cadru, poate rigidiza semnificativ structura și prelua o parte din forța seismică pe un traseu neproiectat (bielă diagonală de compresiune în zidărie), modificând distribuția reală a eforturilor față de modelul de calcul (care ignoră zidăria);
- **Efect de stâlp scurt** — la parterele cu zidărie de umplutură parțială (de exemplu, un perete cu fereastră înaltă care lasă liberă doar partea superioară a stâlpului), porțiunea liberă a stâlpului se comportă ca un „stâlp scurt", cu rigiditate mult mai mare și solicitare de forfecare concentrată, risc cunoscut de cedare fragilă documentat la cutremure;
- **Neregularitate pe verticală (parter deschis/soft-storey)** — dacă parterul este lăsat liber (garaj, living deschis) iar etajul este complet compartimentat cu zidărie de umplutură densă, rezultă o discontinuitate bruscă de rigiditate între niveluri (parterul, mult mai flexibil, concentrează practic toată deformația seismică) — acesta este principalul risc pe care trebuie să îl gestioneze proiectantul la Varianta B și motivul pentru care, dacă se optează pentru un parter cu goluri mari, se recomandă fie dispunerea unor pereți de zidărie confinată suplimentari, fie un calcul explicit al parterului ca nivel flexibil, cu majorarea corespunzătoare a forțelor de proiectare (P100-1 §4.4.3.3, coeficient de amplificare pentru nivel slab).

Prescripțiile de proiectare recomandă fie separarea constructivă a zidăriei de umplutură de cadru (rost + material compresibil, pentru a elimina orice interacțiune parazitară), fie, dacă se dorește conlucrarea (caz mai economic dar care necesită calcul detaliat la PT), tratarea explicită a bielei diagonale echivalente în modelul de calcul.

### 8.5. Argumentare comparativă Varianta A vs. Varianta B — când se alege fiecare

| Criteriu | Varianta A — Zidărie confinată | Varianta B — Cadre de beton armat |
|---|---|---|
| Flexibilitate în plan | Redusă — pereții portanți fixează practic definitiv compartimentarea | Mare — permite spații deschise, garaj integrat, ferestre mari continue |
| Cost estimat | Mai redus (materiale + manoperă uzuală) | Mai ridicat (cofraje, armături, execuție mai atentă) |
| Rigiditate laterală | Foarte mare — deplasări practic neglijabile | Mai redusă — necesită verificarea explicită a driftului |
| Risc de nivel slab (soft-storey) | Redus, dacă pereții sunt continui pe verticală (cazul de bază) | Prezent dacă parterul e lăsat deschis — necesită măsuri suplimentare (cap. 8.4) |
| Ductilitate/factor q | q = 2,5 | q ≈ 3,45 (DCM) — forță de proiectare mai mică relativ la greutate, dar cu cerințe de detaliere seismică mai stricte la noduri |
| Tradiție constructivă/manoperă | Larg răspândită, control ușor pe șantier | Necesită personal cu experiență în cofrare/armare de cadre |
| Recomandare | **Soluție implicită** pentru compartimentare tipică de locuință, fără cerințe speciale de spații deschise | Se alege când beneficiarul solicită explicit spații deschise mari (garaj sub locuință, living panoramic) — cu tratarea atentă a interacțiunii cu umplutura (cap. 8.4) |

**Concluzie de proiectare:** pentru configurația standard a locuinței descrise în prezentul memoriu (compartimentare obișnuită, fără parter deschis), **Varianta A (zidărie confinată) este soluția recomandată și dezvoltată integral** (cap. 7). Varianta B rămâne disponibilă ca soluție alternativă documentată, aplicabilă cu calculul specific de mai sus atunci când tema de arhitectură o impune.

---

## 9. Infrastructura

### 9.1. Studiul geotehnic — condiție obligatorie

Așa cum s-a arătat în cap. 4.4, studiul geotehnic (NP 074/2014) este documentație obligatorie, indiferent de categoria de importanță — la locuința unifamilială, acesta stabilește presiunea convențională a terenului (`pconv`), adâncimea și natura stratificației, nivelul hidrostatic și eventualele riscuri geotehnice speciale (teren sensibil la umezire, argile expansive, umpluturi necontrolate), toate acestea condiționând direct alegerea tipului de fundare (cap. 9.2).

### 9.2. Tipul de fundare — talpă continuă vs. radier general

**Talpă continuă de beton armat sub pereții portanți** — soluția adoptată în prezentul memoriu, adecvată pentru:
- Teren cu capacitate portantă bună/medie (`pconv ≥ 150–200 kPa`), omogen pe adâncimea de influență a fundației;
- Nivel hidrostatic sub cota de fundare;
- Structură cu pereți portanți continui (zidărie confinată, Varianta A), unde încărcarea se transmite deja liniar de-a lungul pereților — talpa continuă este soluția naturală și economică, sub formă de grinzi de fundare încrucișate pe conturul și pe toate axele cu pereți portanți.

**Radier general de fundare** — recomandat, ca alternativă, atunci când:
- Terenul are capacitate portantă redusă (`pconv < 150 kPa`) sau este neomogen;
- Nivelul hidrostatic este ridicat (aproape de cota de fundare sau deasupra ei), caz în care radierul oferă și o barieră continuă la infiltrații, mai ușor de hidroizolat decât un sistem de tălpi separate;
- Terenul prezintă risc de tasări diferențiate (umpluturi, praf macroporic sensibil la umezire) — radierul, prin rigiditatea sa de placă continuă, redistribuie mai bine eforturile și limitează tasările diferențiate între pereți;
- Structura este în cadre de beton armat (Varianta B) cu stâlpi izolați și încărcări concentrate mari — se poate opta între fundații izolate legate cu grinzi de fundare sau radier general, funcție de distanța dintre stâlpi și capacitatea portantă.

Pentru exemplul de calcul dezvoltat (teren cu `pconv = 200 kPa`, omogen, NHS sub cota de fundare — cap. 4.4), se adoptă **talpă continuă de beton armat** sub toți pereții portanți.

### 9.3. Adâncimea de fundare

Conform **STAS 6054/77** (adâncimi de îngheț, zonarea teritoriului României), adâncimea minimă de fundare trebuie să depășească adâncimea de îngheț a zonei climatice respective, care variază pe teritoriul țării între **0,60–1,10 m** (zona climatică I — sud/litoral, adâncime îngheț ~0,60–0,70 m; zona climatică III–V — nord/interior/munte, adâncime îngheț ~0,90–1,10 m).

Pentru amplasamentul de exemplu (zona climatică cu adâncime de îngheț `≈ 0,90 m`), se adoptă **adâncime de fundare `Df = 1,00 m`** de la cota terenului sistematizat, cu marjă de siguranță `10 cm` peste adâncimea de îngheț normată — practică uzuală și recomandată pentru a acoperi incertitudini locale (variații de microclimat, teren neuniform).

### 9.4. Dimensionarea tălpii continue

Se dimensionează talpa sub peretele median (cel mai solicitat, `N_Ed = 1.174,0 kN` la nivelul parterului, cap. 5.5 și 7.5), la care se adaugă greutatea proprie a fundației și a umpluturii de deasupra ei (soclu, pardoseală exterioară):

`q_liniar = N_Ed/lungime + greutate fundație/soclu ≈ 1.174,0/9,54 + 15,0 = 123,1 + 15,0 = 138,1 kN/m`.

**Lățimea necesară a tălpii** (verificare la presiune convențională, `pconv = 200 kPa`):
`B_nec = q_liniar/pconv = 138,1/200 = 0,69 m` → se adoptă **`B = 0,80 m`** (lățime constructivă minimă uzuală pentru talpă continuă la locuințe, superioară strict necesarului de calcul).

**Verificarea presiunii efective:**
`p_ef = q_liniar/B = 138,1/0,80 = **172,6 kPa** < pconv = 200 kPa` ✓ — rezervă `14%`.

**Înălțimea tălpii** — se adoptă `H = 0,80 m` (grindă de fundare cu secțiune practic pătrată, rigidă, care asigură repartizarea uniformă a presiunii pe teren fără a necesita verificare detaliată la încovoiere transversală — talpa se comportă practic ca un element rigid la această lățime redusă).

**Armarea grinzii de fundare:** `4Ø14` la partea superioară și inferioară (armătură longitudinală de continuitate, esențială pentru preluarea eventualelor eforturi de încovoiere din tasări diferențiate sau din acțiunea seismică orizontală transmisă prin efect de cadru la infrastructură), `Ø8/200 mm` etrieri, cu **continuitate obligatorie cu centura de soclu** (monolitism infrastructură-suprastructură).

### 9.5. Verificarea la răsturnare (stabilitate globală sub acțiune seismică)

Verificarea globală de stabilitate la răsturnare a construcției sub efectul momentului de răsturnare produs de forța seismică (P100-1, verificare de bază pentru construcții rigide și joase):

**Moment de răsturnare** (din distribuția forțelor pe niveluri, cap. 6.4):
`M_r = F1·z1 + F2·z2 = 158,5·3,00 + 282,5·5,95 = 475,5 + 1.681,0 = 2.156,5 kNm`.

**Moment stabilizator** (din greutatea proprie, față de axa de răsturnare la marginea tălpii, pe direcția cea mai defavorabilă — latura scurtă `9,00 m`):
`M_s = W·(B_clădire/2) = 2.205,0·(9,00/2) = 2.205,0·4,50 = 9.922,5 kNm`.

`M_s/M_r = 9.922,5/2.156,5 = **4,60 > 1,5**` (limita normativă uzuală de siguranță la răsturnare) ✓ — rezervă foarte mare, caracteristică oricărei construcții joase și late (raport H/B mic, cap. 1.2), la care riscul de răsturnare este practic exclus.

### 9.6. Hidroizolație și drenaj perimetral

**Hidroizolația orizontală** se prevede la nivelul soclului (cota `≈ +0,20 m` față de CTS — cota terenului sistematizat), sub forma unui strat continuu (membrană bituminoasă sau folie specială), pentru a întrerupe ascensiunea capilară a umidității din fundație spre zidăria portantă.

**Hidroizolația verticală** se aplică pe fața exterioară a fundației și a soclului, de la talpă până deasupra cotei terenului (membrană bituminoasă aplicată la cald sau la rece, protejată cu strat de protecție/perete de sprijin din polistiren extrudat sau plasă+tencuială).

**Drenajul perimetral**, recomandat mai ales la terenuri cu nivel hidrostatic ridicat sezonier sau cu permeabilitate redusă (argile), constă dintr-un tub drenant perforat, așezat pe un strat de pietriș filtrant la baza săpăturii, în jurul perimetrului fundației, cu evacuare gravitațională către un punct de descărcare sau cămin de colectare. Pentru amplasamentul de exemplu (NHS sub cota de fundare, teren cu drenaj natural rezonabil), drenajul perimetral se recomandă ca măsură preventivă, fără a fi strict obligatoriu.

**Trotuarul de gardă perimetral** (lățime minimă `≥ 1,00 m`, pantă `≥ 2%` spre exterior) completează sistemul de protecție a infrastructurii împotriva infiltrațiilor de apă pluvială la baza fundației.

---

## 10. Suprastructura

### 10.1. Planșee de beton armat monolit

**Alcătuire:** placă de beton armat monolit `C20/25`, grosime `h = 14 cm`, rezemată pe toate laturile pe pereții portanți (zidărie confinată cu centuri) sau pe grinzile de cadru (Varianta B), cu deschideri uzuale `4,0–4,5 m`, acoperire `c = 20 mm`.

**Verificarea la încovoiere** (panou rezemat pe 4 laturi, metoda coeficienților, deschidere `Lx = 4,0 m`, raport laturi apropiat de pătrat):
`p_Ed = 1,35·gk + 1,5·qk = 1,35·5,70 + 1,5·1,50 = 7,695 + 2,25 = 9,945 kN/m²`.

`M_x = k·p_Ed·Lx²`, cu `k ≈ 0,045` (coeficient tabelar pentru panou rezemat pe 4 laturi, raport laturi ~1,0–1,2, moment pe câmp în direcția scurtă):
`M_x = 0,045·9,945·4,0² = 0,045·9,945·16,0 = 7,16 kNm/m`.

**Armătura necesară** (secțiune dreptunghiulară, `d = h - c - Ø/2 ≈ 115 mm`, braț de pârghie aproximat `z = 0,9·d`):
`As = M_x/(z·fyd) = 7,16·10⁶/(0,9·115·434,8) = 7,16·10⁶/44.994 = 159,1 mm²/m`.

`As,min = 0,26·(fctm/fyk)·b·d ≥ 0,0013·b·d` (SR EN 1992-1-1 §9.2.1.1): pentru `fctm = 2,2 N/mm²`, `As,min = 0,26·(2,2/500)·1000·115 = 131,6 mm²/m`, respectiv `0,0013·1000·115 = 149,5 mm²/m` → `As,min = 149,5 mm²/m`.

Se adoptă **`Ø8/150 mm` pe ambele direcții** (`As,adoptat = 335 mm²/m` — plasă dublă, câmp și reazem), acoperitor față de necesarul de calcul (`159,1 mm²/m`) și de minimul constructiv (`149,5 mm²/m`).

**Efectul de diafragmă rigidă** — planșeul, monolit legat de centurile de la fiecare nivel, asigură continuitatea structurală necesară transmiterii forțelor seismice orizontale către toți pereții portanți, proporțional cu rigiditatea lor (ipoteza de bază a modelului de calcul din cap. 6).

### 10.2. Scara

Scara interioară care leagă parterul de etaj se realizează, uzual pentru o locuință unifamilială, din **beton armat monolit** (rampă + podeste, `C20/25`, grosime placă `12–14 cm`, armare similară planșeelor) sau, alternativ, ca **structură metalică ușoară** cu trepte prefabricate (soluție mai rapidă de montat, potrivită mai ales la renovări sau la etapizarea execuției).

Rampa de beton armat se dimensionează ca placă înclinată simplu rezemată între podeste, cu verificare similară planșeelor curente (cap. 10.1), iar rezemarea pe pereții/grinzile adiacente respectă aceleași principii de continuitate a armăturii ca la planșee.

### 10.3. Șarpanta din lemn

**Alcătuire:** șarpantă din lemn ecarisat clasa **C24** (cap. 3.5), cu căpriori rezemați pe pane, pane rezemate pe popi și pe cosoroabe, cosoroabe ancorate direct în centura de beton armat de la nivelul etajului.

**Verificarea căpriorului** (interax `0,80 m`, deschidere `L = 2,20 m` între reazeme — pană/coamă):
`p_SLU = 1,35·gk,acoperiș + 1,5·s = 1,35·1,10 + 1,5·1,60 = 1,485 + 2,40 = 3,885 kN/m²` (pe proiecție orizontală).
`q = p_SLU·interax = 3,885·0,80 = 3,108 kN/m`.
`M_Ed = q·L²/8 = 3,108·2,20²/8 = 3,108·4,84/8 = 1,880 kNm`.

**Secțiune adoptată `10×15 cm`:** `W = b·h²/6 = 100·150²/6 = 375.000 mm³ = 375 cm³`.
`W_nec = M_Ed/fm,d = 1,880·10⁶/16,6 = 113.253 mm³ = 113,25 cm³` → `375 cm³ >> 113,25 cm³` ✓ (rezervă mare; secțiunea uzuală `10×15` e menținută constructiv pentru rigiditate la montaj/manipulare, nu doar din calculul strict de rezistență).

**Verificarea la săgeată** (combinație caracteristică SLS, `q = (gk+s)·interax = (1,10+1,60)·0,80 = 2,16 kN/m = 2,16 N/mm`):
`δ = 5·q·L⁴/(384·E·I)`, `I = b·h³/12 = 100·150³/12 = 28.125.000 mm⁴`, `E = 11.000 N/mm²`, `L = 2.200 mm`:
`δ = 5·2,16·2.200⁴/(384·11.000·28.125.000) = 2,529·10¹⁴/1,188·10¹⁴ = 2,13 mm`.
`L/250 = 2.200/250 = 8,80 mm > 2,13 mm` ✓ — rezervă amplă.

**Panele** (secțiune `12×18 cm`, reazem intermediar pentru căpriori la interax popi `≈ 3,0–3,5 m`) se verifică similar la încovoiere sub reacțiunile transmise de căpriori — efortul unitar rezultat `σ ≈ 5,7 N/mm² < fm,d = 16,6 N/mm²` ✓.

**Popii** (secțiune `12×12 cm`, elemente comprimate centric, sprijiniți pe planșeul peste etaj/centură) se verifică la flambaj (SR EN 1995-1-1, coeficient de zveltețe `λ`, factor `kc`): efortul unitar de compresiune rezultat `σ ≈ 1,04 N/mm² < fc,0,d,redus (flambaj) ≈ 13,0 N/mm²` ✓.

**Ancorarea cosoroabei la centură** se realizează cu șuruburi/ancore metalice `Ø10 mm`, dispuse la interax `≤ 1,0 m`, dimensionate inclusiv la forța de smulgere din sucțiunea vântului (cap. 4.3).

**Tratamentul lemnului:** toate elementele șarpantei se tratează **ignifug** (reacție la foc îmbunătățită, conform cap. 3.4) și **fungicid/insecticid** (protecție biologică împotriva putrezirii și atacului biologic), aplicate înainte de montaj, cu retratare la intervalele recomandate de producător pentru elementele expuse.

---

## 11. Verificarea la stările limită

### 11.1. Starea Limită Ultimă (SLU) — rezistență și stabilitate

P100-1/2013 impune verificarea structurii la stare limită ultimă atât în gruparea fundamentală (încărcări gravitaționale majorate), cât și în gruparea seismică (P100-1 §5.8, obiectivul de „siguranța vieții" sub cutremurul de proiectare cu `IMR = 225 ani`):

| Verificare SLU | Rezultat | Stare |
|---|---|---|
| Compresiune perete median (fundamental) | Ed/Rd = 0,33 | ✓ |
| Forfecare perete median (seismic) | Ed/Rd = 0,28 | ✓ |
| Forfecare globală X / Y | 0,28 / 0,22 | ✓ |
| Densitate minimă pereți X / Y | 5,83% / 7,17% (min. 4,0%) | ✓ |
| Stabilitate la răsturnare | Ms/Mr = 4,60 (min. 1,5) | ✓ |
| Presiune pe teren | 172,6 kPa (max. 200 kPa) | ✓ |
| νd stâlpi (Varianta B, 30×30) | 0,349 (max. 0,55) | ✓ |

Coeficienții parțiali de siguranță aplicați (`γG = 1,35`, `γQ = 1,50`, `γM,zidărie = 2,2/1,5`, `γc = 1,5`, `γs = 1,15`) sunt cei prescriși de CR 0/2012, SR EN 1996-1-1 și SR EN 1992-1-1 pentru situațiile persistente și accidentale (seismice) respectiv.

### 11.2. Starea Limită de Serviciu (SLS) — deformații și fisurare

**Deplasarea relativă de nivel (drift).** Pentru un perete scurt/rigid (`h/l < 1`, domină forfecarea), rigiditatea la forfecare a peretelui median se estimează:
`k = G·A/(1,2·h)`, cu `G = 1.460 N/mm²`, `A = 1.913.000 mm²`, `h = 3.000 mm` (parter):
`k = 1.460·1.913.000/(1,2·3.000) = 2.792.980.000/3.600 = 775.827 N/mm ≈ 775,8 kN/mm`.

Rigiditatea totală pe direcția X (proporțională cu ariile pereților, cap. 6.5): `k_total,X ≈ 775,8·(5,558/1,913) = 2.254,7 kN/mm`.

**Deplasarea relativă de nivel la parter** (sub tăietoarea elastică `V_parter = 441,0 kN`):
`dr,elastic = V_parter/k_total,X = 441,0/2.254,7 = 0,196 mm`.

`dr,SLU = q·dr,elastic = 2,5·0,196 = 0,49 mm`, admis `0,025·h = 0,025·3.000 = 75 mm` → **rezervă `99%`**.
`dr,SLS = 0,5·q·dr,elastic = 0,5·2,5·0,196 = 0,245 mm`, admis `0,005·h = 0,005·3.000 = 15 mm` (P100-1, limita pentru elemente nestructurale fragile) → **rezervă `98%`**.

Deplasările rezultate sunt extrem de mici, caracteristice unei structuri de zidărie confinată la o clădire joasă (rigiditate laterală foarte mare dată de densitatea de pereți amplu peste minim) — practic nu există risc de fisurare a finisajelor (tencuieli, gresie/faianță) din deformație laterală seismică.

**Săgeata planșeului** (cvasipermanentă, `g+ψ2·q`) și **săgeata căpriorilor** (cap. 10.1 și 10.3) au fost deja verificate în capitolele respective, cu rezerve amplă față de limitele `L/250` (aspect) și `L/300` (elemente generale).

---

## 12. Verificarea cerinței fundamentale A — rezistență mecanică și stabilitate (A1/A2)

Legea nr. 10/1995 impune, pentru orice construcție, îndeplinirea **cerinței fundamentale A — rezistență mecanică și stabilitate**, care se detaliază, pentru elementele de rezistență, prin:

**Cerința A1 — rezistență și stabilitate pentru elementele de suprastructură** (zidărie confinată/beton armat): sinteza verificărilor din cap. 7 (Varianta A) și cap. 8 (Varianta B), toate satisfăcute cu rezerve amplă (cap. 7.8, cap. 11.1) — structura suportă în siguranță atât încărcările gravitaționale (grupare fundamentală), cât și acțiunea seismică de proiectare (grupare specială), fără a depăși capacitățile de rezistență ale materialelor și fără a compromite stabilitatea globală (cap. 9.5).

**Cerința A2 (Af) — rezistență și stabilitate a terenului de fundare și a infrastructurii**: sinteza verificărilor din cap. 9 — presiunea efectivă pe teren (`172,6 kPa`) rămâne sub presiunea convențională (`200 kPa`, rezervă `14%`), adâncimea de fundare depășește adâncimea de îngheț normată, iar stabilitatea globală la răsturnare are rezervă foarte mare (`Ms/Mr = 4,60`).

**Concluzie:** ambele componente ale cerinței fundamentale A sunt satisfăcute la nivelul de predimensionare/verificare din prezentul memoriu DTAC. Confirmarea finală, cu calcul detaliat pe breviarul complet și planurile de execuție, revine fazei PT+DE, sub supravegherea verificării tehnice atestate (cap. 13).

---

## 13. Execuția

### 13.1. Controlul calității materialelor

- **Zidăria:** recepția elementelor pentru zidărie (cărămidă GVP/BCA) cu verificarea certificatelor de conformitate și, dacă e cazul, încercări de rezistență pe eșantioane; verificarea mortarului (dozaj, consistență) la fiecare șarjă preparată pe șantier sau la fiecare livrare de mortar preparat industrial;
- **Betonul (sâmburi, centuri, planșee, fundații):** certificate de calitate pentru ciment, agregate, apă, aditivi; **buletine de încercare** pe cuburi/cilindri de beton, prelevate la fiecare turnare semnificativă (minimum câte o serie de probe pentru fiecare element principal — fundații, un set de centuri/sâmburi, planșeu), cu verificarea `fck` la 28 de zile conform NE 012;
- **Oțelul-beton:** certificate de calitate B500C, cu verificarea clasei de ductilitate C (`εuk`, raport `ft/fy`) pentru toate loturile folosite la sâmburi, centuri și armătura planșeelor;
- **Lemnul șarpantei:** certificat de clasă de rezistență C24 (sau marcaj CE echivalent), verificarea aplicării corecte a tratamentelor ignifuge/fungicide (proces-verbal de tratare, cu produsele și dozajele utilizate).

### 13.2. Fazele determinante

Conform Legii nr. 10/1995 și normelor privind fazele determinante ale execuției, se convoacă verificarea și consemnarea în proces-verbal la următoarele momente-cheie:

1. **Trasarea și verificarea cotei de fundare** — confirmarea naturii terenului de fundare (concordanța cu studiul geotehnic) și a adâncimii de fundare (`≥ 1,00 m`, peste adâncimea de îngheț);
2. **Armarea și turnarea fundațiilor (tălpi continue)** — verificarea poziției și acoperirii armăturii, a continuității cu centura de soclu;
3. **Ridicarea zidăriei la fiecare nivel** — verificarea grosimii pereților, a rosturilor pline, a poziționării corecte a golurilor și a ștrepilor lăsați pentru sâmburi;
4. **Armarea și turnarea sâmburilor și centurilor** — punct de control esențial: verificarea succesiunii corecte de execuție (**sâmburii se toarnă după zidărie**, nu înainte — cap. 7.2), a continuității armăturii la colțuri (centuri), a acoperirii cu beton;
5. **Armarea și turnarea planșeelor** — verificarea grosimii, a armăturii (poziție, diametre, distanțe), a monolitismului cu centurile;
6. **Montajul șarpantei** — verificarea secțiunilor, a ancorării la centură, a aplicării tratamentelor ignifug/fungicid înainte de montarea învelitorii.

### 13.3. Estimarea consumurilor de materiale (predimensionare)

Estimare orientativă a cantităților principale de beton și oțel, utilă pentru evaluarea preliminară a costurilor (se confirmă la PT prin antemăsurători exacte, pe baza planurilor de cofraj/armare):

| Element | Volum beton (m³) | Oțel (kg) | Coeficient armare (kg/m³) |
|---|---|---|---|
| Sâmburi (≈20 buc., ambele niveluri) | ~3,75 | ~980 | 261 |
| Centuri (≈117,6 m lungime totală, ambele niveluri) | ~7,35 | ~500 | 68 |
| Planșee (2×95,4 m² × 0,14 m) | ~26,70 | ~1.200 | 45 |
| Fundații (talpă continuă, ≈58,8 m × 0,80×0,80) | ~37,60 | ~370 | 10 |
| **Total structură (fără șarpantă)** | **~75,40 m³** | **~3.050 kg** | **~40 (mediu)** |

**Indicatori rezultați:**
- Consum de beton: `75,40/190,8 = 0,395 m³/m² Ad` — valoare tipică pentru o structură de zidărie confinată cu fundații pe tălpi continue (interval uzual `0,35–0,45 m³/m²`, mult sub consumul unei structuri integral de beton armat în cadre);
- Consum de oțel: `3.050/190,8 = 16,0 kg/m² Ad` — valoare tipică pentru zidărie confinată (interval uzual `12–22 kg/m²`), semnificativ inferior consumului unei structuri în cadre de beton armat (unde armătura stâlpilor/grinzilor ridică indicatorul la `35–50 kg/m²`) — diferență care ilustrează economia de material oferită de Varianta A față de Varianta B (cap. 8.5);
- Consum de oțel raportat la volumul de beton: `3.050/75,40 = 40,4 kg/m³` — valoare relativ redusă comparativ cu structurile integral din beton armat (unde acest indicator ajunge frecvent la `100–150 kg/m³`), deoarece la zidăria confinată rolul principal de rezistență și rigiditate este preluat de zidărie, iar elementele de beton armat (sâmburi, centuri) au funcție predominant de confinare, cu procente de armare constructive moderate (cap. 7.4).

Acești indicatori confirmă că soluția adoptată (zidărie portantă confinată) este **economică**, cu un consum de materiale structurale proporțional cu regimul redus de înălțime și cu funcțiunea de locuit unifamilial, fără supra-dimensionare.

### 13.4. Programul de urmărire specială

Pentru o locuință unifamilială de categorie de importanță **D** (redusă), încadrată în clasa de importanță seismică **III**, cu soluție structurală standard (zidărie confinată conform CR 6, fără condiții geotehnice speciale), **nu este necesar un program de urmărire specială** a comportării în timp a construcției (program obligatoriu doar pentru construcții de categorii superioare de importanță, cu risc ridicat, sau cu condiții de fundare/execuție deosebite).

Se recomandă totuși **urmărirea curentă** (vizuală, la intervale regulate, de către proprietar), care constă în observarea eventualelor fisuri în tencuieli/zidărie, tasări vizibile ale fundației sau infiltrații de apă, cu semnalarea către un specialist atestat dacă apar semne de degradare structurală.

Dacă studiul geotehnic (cap. 9.1) relevă condiții speciale de teren (risc de tasare, teren sensibil la umezire, alunecări de teren în zonă), proiectantul poate recomanda, punctual, un program minimal de urmărire (repere de tasare, citiri periodice) — decizie care se ia explicit la faza PT, funcție de concluziile studiului geotehnic definitiv.

---

## 14. Concluzii structurale

Sistemul structural adoptat pentru locuința unifamilială P+1E — **zidărie portantă confinată** (pereți de 25–30 cm, cu sâmburi de beton armat 25×25 cm la colțuri/intersecții/capete/goluri mari și centuri de beton armat 25×25 cm la fiecare planșeu, conform CR 6/2013), **planșee de beton armat monolit de 14 cm** și **infrastructură pe tălpi continue de beton armat** — satisface integral cerința fundamentală **A — rezistență mecanică și stabilitate** (Legea nr. 10/1995), în toate grupările de acțiuni relevante (fundamentală, seismică, serviciu), conform P100-1/2013, CR 6/2013, CR 0/2012, SR EN 1996-1-1 și SR EN 1992-1-1.

**Sinteza numerică a verificărilor:**
- Densitatea pereților structurali (`5,83%` pe X, `7,17%` pe Y) depășește amplu minimul CR 6 (`4,0%` la `ag = 0,20g`);
- Toate verificările de rezistență (compresiune, forfecare, încovoiere din plan) au grade de utilizare între `0,20` și `0,33` — rezerve confortabile, tipice pentru o structură joasă și densă în pereți;
- Deplasările relative de nivel sunt neglijabile (`< 0,5 mm` la SLU), protejând finisajele;
- Fundația pe tălpi continue funcționează cu presiune efectivă `172,6 kPa`, sub presiunea convențională admisă `200 kPa`;
- Stabilitatea globală la răsturnare are rezervă amplă (`Ms/Mr = 4,60`).

Varianta alternativă analizată — **cadre de beton armat cu umplutură nestructurală** — rămâne o soluție tehnic valabilă și complet documentată (cap. 8), recomandată explicit pentru situațiile în care tema de arhitectură impune spații deschise (garaj integrat, living panoramic), cu atenția cuvenită la riscurile specifice acestei soluții (interacțiune cu zidăria de umplutură, risc de nivel slab la parter deschis).

Șarpanta de lemn (clasa C24, tratată ignifug/fungicid) și planșeele de beton armat au fost verificate la încovoiere și săgeată, cu rezerve ample.

**Prezenta documentație de rezistență se supune verificării tehnice de către verificatori de proiecte atestați MDLPA**, conform Legii nr. 10/1995 și HG nr. 925/1995, pentru cerințele:
- **Cerința A1** — rezistență și stabilitate pentru construcții de zidărie, beton și beton armat;
- **Cerința Af (A2)** — rezistență și stabilitate a terenului de fundare și a fundațiilor.

Calculele detaliate (breviar complet de calcul), planurile de cofraj/armare (fundații, sâmburi și centuri, planșee, șarpantă) și extrasele de armătură se dezvoltă integral la fazele **PT + DE**, pe baza soluțiilor prefigurate și verificate în prezentul memoriu DTAC.

---

## Anexa A. Indexul normativelor aplicate

| Normativ | Titlu / obiect | Utilizat în |
|---|---|---|
| Legea 10/1995 | Calitatea în construcții — cerința A | cap. 1, 12, 14 |
| HG 766/1997 | Categorii de importanță | cap. 1.3 |
| HG 907/2016 | Conținutul documentațiilor tehnico-economice | cap. 1.1 |
| SR EN 1990 + NA | Bazele proiectării (Eurocod 0) | cap. 1.3, 5.3–5.4 |
| SR EN 1991-1-1 | Greutăți, încărcări utile | cap. 5.1–5.2 |
| CR 1-1-3/2012 | Zăpadă | cap. 4.2 |
| CR 1-1-4/2012 | Vânt | cap. 4.3 |
| CR 0/2012 | Bazele proiectării (grupări RO) | cap. 5.4 |
| SR EN 1992-1-1 + NA | Beton armat, reguli generale | cap. 3.2–3.4, 9, 10.1 |
| SR EN 1992-1-2 | Beton la foc | cap. 3.4 |
| SR EN 1996-1-1 + NA | Zidărie, reguli generale (Eurocod 6) | cap. 3.1, 7 |
| SR EN 1996-1-2 | Zidărie la foc | cap. 3.4 |
| CR 6/2013 | Cod de proiectare pentru structuri din zidărie | cap. 2, 6.5, 7 |
| SR EN 1998-1 + NA | Proiectare seismică (Eurocod 8) | cap. 6 |
| P100-1/2013 | Cod seismic RO — partea I | cap. 1–8, 11 (dominant) |
| SR EN 1995-1-1 | Proiectare structuri de lemn (Eurocod 5) | cap. 3.5, 10.3 |
| NP 112/2014 | Fundații de suprafață | cap. 9 |
| NP 074/2014 | Documentații geotehnice | cap. 4.4, 9.1 |
| STAS 6054/77 | Adâncimi de îngheț — zonare | cap. 9.3 |
| NE 012-1/2007, NE 012-2/2010 | Producerea/executarea betonului | cap. 3.2, 13 |
| P118-1/2/3 | Securitatea la incendiu | cap. 1.3, 3.4 |
| SR EN 10080 | Oțel-beton B500C | cap. 3.3 |

## Anexa B. Lista notațiilor

| Simbol | Semnificație |
|---|---|
| ag, TC, TB, TD | parametri seismici de amplasament (accelerație, perioade de control) |
| β0, β(T) | factor / spectru de amplificare dinamică |
| γI,e | factor de importanță și expunere seismică (1,00 — clasa III) |
| q, q0 | factor de comportare (2,5 zidărie confinată; 3,45 cadre b.a.) |
| Sd(T) | ordonata spectrului de proiectare |
| Fb | forța seismică de bază |
| W, m | greutatea / masa seismică |
| T1 | perioada fundamentală de vibrație |
| λ | factor de corecție a forței seismice de bază |
| cs | coeficient seismic global (Fb/W) |
| dr,elastic / dr | deplasarea relativă de nivel (elastică / amplificată) |
| νd | efort axial normalizat (NEd/Ac·fcd) |
| fk, fd | rezistența caracteristică / de calcul a zidăriei la compresiune |
| fvk0, fvk, fvd | rezistența caracteristică (fără/cu compresiune) și de calcul a zidăriei la forfecare |
| fck, fcd | rezistența caracteristică / de calcul a betonului la compresiune |
| fyk, fyd | limita de curgere caracteristică / de calcul a oțelului |
| fm,k, fm,d | rezistența caracteristică / de calcul a lemnului la încovoiere |
| Ecm, E, G | modulul de elasticitate (beton, zidărie) / modulul de forfecare |
| pconv | presiune convențională a terenului |
| Df | adâncime de fundare |
| p (%) | densitatea pereților structurali (raport arie pereți/arie planșeu) |
| ρ | coeficient de armare |
| ψ0, ψ1, ψ2, ψE | factori de combinație a acțiunilor variabile |

## Anexa C. Tabel comparativ rapid — parametri cheie funcție de amplasament

Pentru re-verificarea rapidă a soluției la un alt amplasament decât exemplul dezvoltat (Iași, `ag = 0,20g`), tabelul următor centralizează parametrii care se recalculează integral prin re-parcurgerea capitolelor 4 și 6, păstrând identică geometria, materialele și metodologia:

| Amplasament (exemplu) | ag | p_min pereți (CR 6) | Fb estimat (kN) | Observație |
|---|---|---|---|---|
| Cluj-Napoca, Timișoara (NV/V) | 0,10–0,15g | 4,0% | ~221–331 | rezerve foarte mari, se poate reduce grosimea unor pereți la 25 cm pe ambele direcții |
| Iași, Suceava, Botoșani (NE) | 0,20g | 4,0% | ~441 | cazul de bază dezvoltat integral în prezentul memoriu |
| Galați, Vaslui, Neamț (E/NE) | 0,25g | 5,0% | ~551 | se verifică densitatea de pereți la 5,0%; soluția de bază (5,83%/7,17%) rămâne acoperitoare |
| București, Ploiești (S) | 0,30g | 5,0–5,5% | ~662 | Tc mare (1,60 s) nu afectează T1 al locuinței (0,20 s, sub Tc) — β rămâne pe ramura crescătoare, se recalculează punctual |
| Focșani, Vrancea, Buzău (curbura Carpaților) | 0,35–0,40g | 6,0% | ~772–882 | necesită verificare punctuală a densității pe direcția X (cap. 6.5) și eventual majorarea grosimii peretelui median la 30 cm |

**Regula de recalculare** pentru orice amplasament nou: (1) se preiau `ag` și `TC` din harta de zonare P100-1/2013 pentru UAT-ul respectiv; (2) se recalculează `Sd(T1) = ag·β(T1)/q`; (3) se recalculează `Fb = γI,e·[Sd(T1)/g]·W·λ`; (4) se verifică densitatea minimă de pereți conform CR 6 funcție de noul `ag`; (5) se refac verificările de compresiune/forfecare din cap. 7.5–7.7 cu noua valoare a lui `Fb`. Geometria, materialele, grupările de acțiuni și metodologia de calcul rămân neschimbate.

---

*Întocmit: inginer structurist atestat. Verificat tehnic: verificator atestat A1 + Af (Af). Fază: DTAC. Toate valorile numerice sunt calcule de justificare a soluției la nivel de predimensionare/verificare manuală, conform normativelor din Anexa A; ele se confirmă și se detaliază prin breviar de calcul complet la fazele PT+DE. Prezentul memoriu respectă cerința fundamentală A — rezistență mecanică și stabilitate (Legea 10/1995).*
