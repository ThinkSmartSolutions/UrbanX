# PTh-S.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ) — ȘCOALĂ GIMNAZIALĂ, 300 ELEVI/12 CLASE, CORP A (P+2E) + CORP B (SALĂ DE SPORT, L=21,00 m)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență de fază DTAC (`structura.md`), elaborat în conformitate cu **HG 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice. El aprofundează faza DTAC deja redactată — concepția de ansamblu pe două corpuri structural independente, sistemul dual de beton armat DCM al Corpului A, sistemul stâlpi de beton armat + ferme metalice cu zăbrele al Corpului B, rostul antiseismic de 12 cm dintre ele, acțiunile, spectrul seismic P100-1/2013, combinațiile de încărcări, calculul de predimensionare al elementelor și comportarea la foc — aducând structura la nivelul de detaliere necesar **EXECUȚIEI PE ȘANTIER ȘI ÎN ATELIER**: grila structurală definitivă cu eforturi pe toate axele, caietul de armare complet al Corpului A (liste de bare, extrase cantitative), extrasul de materiale și detaliile de îmbinare ale structurii metalice a Corpului B, detaliul de execuție integral al rostului seismic, tehnologia de execuție (cofraje/armare/betonare la Corp A; atelier/montaj la Corp B), planul de control al calității, fazele determinante, urmărirea în timp și programul de probe.

Documentul **NU repetă** breviarul de predimensionare din DTAC (`structura.md`, cap. 1-12) și **NU se suprapune** cu memoriul general (`general.md`, tema-program, indicatorii urbanistici, finanțarea) nici cu memoriul de arhitectură (`arhitectura.md`, compartimentare, finisaje, accesibilitate) nici cu cel de instalații (`instalatii.md`, scenariul de securitate la incendiu, evacuarea). Fiecare valoare numerică din DTAC (secțiuni, procente de armare, forțe seismice, deplasări) se preia ca **dată de intrare confirmată** și se extinde aici la nivelul de detaliere cerut de execuție; unde faza PTh introduce o corecție față de predimensionare (de exemplu, majorarea locală a unei secțiuni sau reconfigurarea unui detaliu de îmbinare), corecția este semnalată explicit și motivată tehnic, nu ascunsă sub o reluare tacită a valorii inițiale.

## Recapitulare parametri de bază (preluați identic din DTAC)

| Parametru | Corp A | Corp B |
|---|---|---|
| Regim de înălțime | P+2E (H=11,40 m) | Parter înalt (streașină +8,50 m / coamă +9,80 m) |
| Dimensiuni în axe | 51,60 × 15,60 m | 33,00 × 21,00 m |
| Sistem structural | Cadre b.a. DCM + pereți structurali (dual) | Stâlpi b.a. + ferme metalice cu zăbrele |
| Deschidere/travee curentă | 6,00 m / 7,20 m | 21,00 m liberă (fermă), interax 6,00 m |
| Beton | C25/30 | C25/30 (stâlpi + fundații) |
| Oțel-beton | BST500 clasa C (obligatoriu în zone disipative) | BST500 clasa C (stâlpi) |
| Oțel structural | — | S355 (ferme, pane, contravântuiri) |
| Clasă de importanță/expunere seismică | II (γI,e = 1,20) | II (γI,e = 1,20) |
| Categoria de importanță | C (HG 766/1997) | C (HG 766/1997) |
| Clasă de ductilitate / q | DCM / q = 3,50 | contravântuiri concentrice / q = 3,0 |
| ag / Tc (amplasament exemplu) | 0,25 g / 0,70 s | idem |
| Grad de rezistență la foc | II (P118-1/2013) | II (P118-1/2013) |
| Rost antiseismic dintre corpuri | 12 cm, continuu pe toată înălțimea și adâncimea de fundare | idem |

Cadrul normativ complet este cel enunțat în DTAC (`structura.md`, cap. 1.7): Legea 10/1995, HG 766/1997, HG 907/2016, SR EN 1990/NA, CR 0/2012, SR EN 1991-1-1, CR 1-1-3/2012, CR 1-1-4/2012, SR EN 1992-1-1/NA, SR EN 1992-1-2, SR EN 1993-1-1, SR EN 1993-1-8, SR EN 1993-1-2, SR EN 1998-1/NA, P100-1/2013, SR EN 1997-1/NA + NP 074/2014, NP 112/2014, NE 012-1/2007, NE 012-2/2010, SR EN 1090-2, SR EN ISO 12944, STAS 6054/77, SR EN 10080/SR 438, SR EN 10025, P118-1/2/3. Prezentul supliment citează suplimentar, pentru operațiile specifice fazei de execuție: **SR EN ISO 5817** (calitatea sudurilor), **SR EN ISO 9606-1** (calificare sudori), **SR EN ISO 15614-1** (calificare procedee de sudare — WPQR), **SR EN ISO 17659** (terminologie îmbinări), **SR EN 1993-1-9** (oboseală), **CEN/TS 1992-4** (ancoraje în beton, la reazemele fermelor pe stâlpii de beton), **C 56/2002** (verificarea calității lucrărilor de construcții), **C 16** (execuție pe timp friguros), **P130/1999** (urmărirea comportării construcțiilor) și **Ordinul MDLPA privind conținutul-cadru al proiectului tehnic** (structura pieselor scrise/desenate de fază PTh).

## Structura capitolelor prezentului supliment

| Capitol | Conținut |
|---|---|
| PTh-S.2 | Grila structurală definitivă a Corpului A + breviar de calcul pe toate axele |
| PTh-S.3 | Breviar de calcul complet al Corpului B — toate cele 7 ferme metalice |
| PTh-S.4 | Rostul antiseismic — detaliul de execuție integral |
| PTh-S.5 | Fundațiile — detaliere completă, decizia grătar/radier, tasări, hidroizolații |
| PTh-S.6 | Caietul de armare al Corpului A — liste de bare, extras cantitativ |
| PTh-S.7 | Extrasul de materiale al structurii metalice a Corpului B |
| PTh-S.8 | Detaliile de îmbinare ale structurii metalice — metoda componentelor |
| PTh-S.9 | Tehnologia de execuție a structurii de beton armat (Corp A + infrastructura Corpului B) |
| PTh-S.10 | Tehnologia de execuție și montajul structurii metalice a Corpului B |
| PTh-S.11 | Planul de control al calității |
| PTh-S.12 | Fazele determinante |
| PTh-S.13 | Programul de urmărire în timp + monitorizarea specifică a rostului seismic |
| PTh-S.14 | Ipotezele modelului de calcul cu elemente finite + validare |
| PTh-S.15 | Verificări suplimentare la SLS |
| PTh-S.16 | Calculul la foc detaliat, pe toate elementele |
| PTh-S.17 | Coordonarea cu arhitectura și instalațiile |
| PTh-S.18 | Programul complet de probe și încercări |
| PTh-S.19 | Sinteza corecțiilor PTh față de DTAC și concluzia inginerească |

---

# PTh-S.2 — GRILA STRUCTURALĂ DEFINITIVĂ A CORPULUI A + BREVIAR DE CALCUL PE TOATE AXELE

## PTh-S.2.1 Grila de axe adoptată la faza PTh

DTAC a lucrat cu valori de predimensionare la nivel de „deschideri curente de 6,00 m și 7,20 m", suficiente pentru justificarea conceptului dual și pentru verificarea globală de regularitate (cap. 3.1-3.2 DTAC). Faza PTh fixează **grila de axe definitivă**, corelată cu proiectul de arhitectură finalizat (`arhitectura.md`), pe care se dezvoltă în continuare toate calculele de element, listele de armare și planurile de cofraj:

**Axe transversale (perpendiculare pe lungimea de 51,60 m), notate 1…11:**

| Interax | 1-2 | 2-3 | 3-4 | 4-5 | 5-6 | 6-7 | 7-8 | 8-9 | 9-10 | 10-11 |
|---|---|---|---|---|---|---|---|---|---|---|
| Deschidere [m] | 1,80 | 6,00 | 6,00 | 6,00 | 6,00 | 6,00 | 6,00 | 6,00 | 6,00 | 1,80 |

Total: 1,80 + 8×6,00 + 1,80 = **51,60 m** — confirmă geometria DTAC. Travei de capăt (1-2 și 10-11), de 1,80 m, corespund zonei ocupate de pereții structurali de capăt (cap. 2.2 DTAC); cele 8 travei curente, de 6,00 m, corespund modulului structural asociat lățimii unei săli de clasă (`arhitectura.md`, cap. 3).

**Axe longitudinale (perpendiculare pe lățimea de 15,60 m), notate A…D:**

| Interax | A-B | B-C | C-D |
|---|---|---|---|
| Deschidere [m] | 7,20 | 6,00 | 2,40 |

Total: 7,20 + 6,00 + 2,40 = **15,60 m**. Axa A-B (7,20 m) corespunde deschiderii sălilor de clasă orientate favorabil (S/SE/E, `arhitectura.md` cap. 3); axa B-C (6,00 m) corespunde benzii centrale de circulație (coridor + casă de scări + cabinete tehnice); axa C-D (2,40 m), mai îngustă, corespunde fâșiei de grupuri sanitare/depozitare de pe latura opusă. Grinda principală de pe deschiderea A-B are secțiune **30×60 cm** (deschidere mare, moment mare); grinda de pe deschiderea B-C, tot **30×60 cm** (deschidere comparabilă); grinda de pe deschiderea C-D, redusă la **30×45 cm** (deschidere mică, moment redus — secțiune nouă, introdusă la PTh, absentă din predimensionarea DTAC care a tratat generic doar grinzile principale de 6,00/7,20 m).

## PTh-S.2.2 Elementele verticale pe grilă — poziționare și tipizare

| Marcă | Poziție pe grilă | Secțiune | Nr. buc (pe nivel) | Observație |
|---|---|---|---|---|
| ST-C | Axele 2-5, 7-10 × liniile A, D | 50×50 cm | 8×2 = 16 | stâlpi curenți de fațadă |
| ST-M | Axele 2-5, 7-10 × liniile B, C | 50×50 cm | 8×2 = 16 | stâlpi curenți interiori (coridor) |
| ST-CO | Axa 6 × liniile A, D | 50×50 cm | 2 | stâlpi la nucleul central, pe fațade |
| ST-55 | Colțuri exterioare adiacente pereților de capăt (axele 2 și 10 × liniile A, D) | 55×55 cm | 4 | deschidere 7,20 m + moment de torsiune de colț majorat |
| PS-CAP | Axele 1-2 și 10-11, integral pe lățime (A-D) | 20 cm | 2 pereți (câte 1/capăt) | pereți structurali de capăt |
| PS-NUC | Axa 6, pe deschiderea B-C | 20 cm | 2 pereți (casa scării, în formă de U/C) | nucleu central de circulație |

Total elemente verticale portante pe nivel: **34 stâlpi** (16 ST-C + 16 ST-M + 2 ST-CO) + **4 stâlpi de colț** (ST-55) + **6 tronsoane de perete structural** (2 PS-CAP + 4 tronsoane PS-NUC, casa scării fiind delimitată de 3-4 panouri de perete conectate în plan). Configurația se repetă identic pe toate cele 3 niveluri (parter, etaj 1, etaj 2), confirmând regularitatea în elevație verificată în DTAC (cap. 3.2): nu există nicio reducere de secțiune sau reconfigurare a grilei între niveluri, alegere deliberată care simplifică execuția (cofraje repetitive, un singur set de șabloane de armare pe toată înălțimea) și elimină riscul de discontinuitate de rigiditate.

## PTh-S.2.3 Înfășurătoarea eforturilor pe toate cele 11 axe transversale

Eforturile provin din analiza spațială cu elemente finite (model bare pentru stâlpi/grinzi, elemente placă pentru planșee și pereți — v. PTh-S.14), rulată pe grila definitivă de la PTh-S.2.1, cu forța tăietoare de bază confirmată din DTAC (Fb ≈ 3.625 kN, cap. 7.4 DTAC) distribuită pe cele 11 axe proporțional cu rigiditatea laterală a fiecăreia. Pereții structurali de capăt și de nucleu preiau, așa cum s-a justificat în DTAC (cap. 2.2), fracțiunea disproporționat de mare a forței seismice:

| Axă | Element vertical guvernant | NEd (grupare fundamentală) [kN] | MEd bază (grupare seismică) [kNm] | Vseismic la bază [kN] | Observație |
|---|---|---|---|---|---|
| 1-2 (perete capăt) | PS-CAP | 1.850 | 3.180 | 780 | preia ≈ 21,5% din Fb, brațul de pârghie maxim |
| 2 (ST-55 colț) | ST-55 | 640 | 195 | 42 | moment biaxial, deschidere 7,20 m |
| 3-5 (ST-C/ST-M) | ST-C, ST-M | 1.150 | 218 | 58 | valoare de referință, confirmă §4.3/§5.1 DTAC |
| 6 (nucleu) | PS-NUC | 2.100 | 3.640 | 865 | preia ≈ 23,9% din Fb, cel mai solicitat element vertical |
| 6 (ST-CO) | ST-CO | 985 | 196 | 51 | stâlp adiacent nucleului, descărcat lateral de acesta |
| 7-9 (ST-C/ST-M) | ST-C, ST-M | 1.150 | 212 | 56 | simetric cu axele 3-5 |
| 10 (ST-55 colț) | ST-55 | 640 | 198 | 43 | simetric cu axa 2 |
| 10-11 (perete capăt) | PS-CAP | 1.850 | 3.155 | 775 | simetric cu axa 1-2 |

Suma forțelor tăietoare la bază preluate de cele 2 perete de capăt + nucleu: 780+865+775 = **2.420 kN**, respectiv **66,8% din Fb** — confirmă cantitativ afirmația de principiu din DTAC (cap. 2.2) potrivit căreia pereții structurali „preiau o fracțiune disproporționat de mare din forța seismică totală". Cadrele (stâlpii curenți) preiau diferența (33,2% din Fb), în principal ca eforturi de forfecare/încovoiere locală, nu ca mecanism principal de rigidizare laterală — exact configurația de „sistem dual" descrisă normativ (P100-1/2013 §4.4.3, tabel 5.1), cu ponderea de rezistență seismică orizontală preluată majoritar de pereți (peste 50%, conform limitei care distinge sistemul „dual" de sistemul „cadre" propriu-zis), dar cu cadrele rămase capabile să preia integral încărcările gravitaționale în ipoteza (verificată separat, redundanță structurală) unei avarii locale a unui perete.

## PTh-S.2.4 Verificarea stâlpului curent ST-C/ST-M (50×50 cm) — extindere a calculului DTAC

DTAC a verificat efortul axial redus la stâlpul central (νd = 0,276 ≤ 0,45, cap. 5.1/8.3 DTAC). Faza PTh completează verificarea cu **interacțiunea N-M biaxială**, obligatorie pentru un stâlp de cadru spațial supus simultan la moment pe cele două direcții (seism X și seism Y, plus excentricitatea accidentală de ±5% conform §4.4.2 P100-1/2013):

`MEd,x = 218 kNm; MEd,y = 95 kNm (din combinația seismică pe direcția transversală, redusă la 0,436×MEd,x, tipic pentru un stâlp de cadru cu rigiditate diferită pe cele două direcții)`

Verificarea la interacțiune biaxială (metoda simplificată, exponent an=1,20 pentru secțiune pătrată cu νd=0,276, conform SR EN 1992-1-1 §5.8.9):

`(MEd,x/MRd,x)^an + (MEd,y/MRd,y)^an ≤ 1,0`

Cu MRd,x = MRd,y = 285 kNm (capacitate calculată din armătura adoptată 12Ø18, As=3.054 mm², dispusă uniform pe contur, la efortul axial νd=0,276):

`(218/285)^1,20 + (95/285)^1,20 = 0,765^1,20 + 0,333^1,20 = 0,720 + 0,268 = 0,988 ≤ 1,0` → **verificat, la limita superioară a marjei acceptabile (utilizare 98,8%)**.

Această valoare, mult mai apropiată de limită decât verificarea uniaxială din DTAC (care nu combinase cele două direcții), este exact motivul pentru care faza PTh reface verificarea la nivel biaxial pentru toți stâlpii curenți — **decizie de proiectare PTh**: se majorează local armătura longitudinală a stâlpilor curenți de pe axele adiacente pereților structurali (axele 3 și 9, cele mai expuse interacțiunii biaxiale din cauza proximității față de zona rigidă) de la 12Ø18 la **12Ø20** (As = 3.770 mm²), ridicând MRd la ≈ 345 kNm și reducând utilizarea combinată la 0,750^1,20+0,275^1,20 ≈ 0,700+0,213 = **0,913 ≤ 1,0**, cu marjă confortabilă. Pentru stâlpii curenți aflați la distanță de pereții structurali (axele 4, 5, 7, 8), unde componenta MEd,y este mai redusă (stâlpi mai puțin afectați de torsiunea reziduală locală), se menține armătura de 12Ø18 din DTAC, verificarea biaxială rezultând, pentru aceștia, sub 0,90.

## PTh-S.2.5 Verificarea stâlpului de colț ST-55 (55×55 cm)

Stâlpul de colț, la intersecția axei 2 (sau 10) cu linia A (sau D), este supus simultan la momentul din deschiderea de 7,20 m (grinda principală A-B) și la momentul din deschiderea transversală de 6,00 m (grinda dintre axele 1-2/2-3), plus componenta de torsiune de colț rezultată din asimetria de rigiditate a celor două grinzi convergente:

`NEd = 640 kN; MEd,x = 195 kNm; MEd,y = 168 kNm` (moment sensibil mai echilibrat pe cele două direcții decât la stâlpul curent, exact consecința geometrică a poziției de colț).

Efortul axial redus: `νd = NEd/(Ac·fcd) = 640.000/(302.500×16,67) = 0,127` — valoare redusă (stâlp de colț mai puțin încărcat gravitațional decât stâlpul central, cap. 4.3 DTAC), care lasă o marjă amplă pentru dezvoltarea ductilității cerute de interacțiunea biaxială mai severă. Cu armătura adoptată **16Ø20** (As = 5.026 mm², procent ρl = 5.026/302.500 = 1,66%, în intervalul DCM 1-4%), MRd,x = MRd,y ≈ 410 kNm:

`(195/410)^1,15 + (168/410)^1,15 = 0,476^1,15 + 0,410^1,15 = 0,441 + 0,367 = 0,808 ≤ 1,0` → **verificat**, cu marjă de aproape 20%, justificată de rolul de colț al acestui stâlp (element cu rol structural sporit, care nu trebuie să fie cel mai solicitat procentual din structură).

## PTh-S.2.6 Verificarea peretelui structural de capăt (PS-CAP, 20 cm) — completare la nivel de secțiune întreagă

DTAC a stabilit principiul de armare (bulbi confinați + armătură distribuită minimă 0,20%, cap. 8.4/9.4 DTAC). Faza PTh dezvoltă verificarea completă a secțiunii, pe lungimea reală a peretelui de capăt, `lw = 6,00 m` (deschiderea B-C, unde este amplasat, conform arhitecturii definitive — peretele de capăt ocupă toată lățimea benzii centrale, nu întreaga lățime a clădirii, lăsând liberă deschiderea A-B pentru accesul la sala de clasă de colț):

`NEd = 1.850 kN; MEd = 3.180 kNm (bază, grupare seismică)`

Excentricitatea efortului axial față de centrul secțiunii: `e = MEd/NEd = 3.180/1.850 = 1,72 m`, mai mică decât `lw/2 = 3,00 m` → secțiunea rămâne integral comprimată sau parțial comprimată/parțial întinsă, fără desprindere completă de la fundație (condiție favorabilă, care evită necesitatea unor ancoraje de tracțiune suplimentare la baza peretelui).

**Bulbii de la cele două extremități** (elemente de margine confinate) au lungime `lc = max(0,15·lw; 1,5·bw) = max(0,90 m; 0,30 m) = 0,90 m`, cu armătură verticală concentrată **8Ø25** per bulb (As,bulb = 3.928 mm², procent local ρ = 3.928/(900×200) = 2,18%, în intervalul admis pentru elemente de margine DCM). Etrierii de confinare ai bulbului: **Ø10/80 mm**, cu agrafe transversale care limitează distanța maximă între bare longitudinale confinate la 200 mm. Armătura distribuită pe inima peretelui (zona centrală, `lw - 2·lc = 6,00 - 1,80 = 4,20 m`): verticală și orizontală, `2×Ø12/200 mm` pe fiecare direcție (procent 2×113/(200×200) = 0,565% — peste minimul de 0,20% cerut, majorat pentru a asigura un comportament distribuit al fisurării sub încărcări repetate ciclice).

**Verificarea la moment încovoietor** (metoda simplificată pentru secțiune dreptunghiulară cu bulbi, brațul de pârghie interior aproximat la 0,80·lw):

`MRd ≈ As,bulb·fyd·0,80·lw = 3.928×434,8×0,80×6,00×10⁻³ = 8.194 kNm ≥ MEd = 3.180 kNm` → **verificat**, cu marjă amplă (utilizare 39%), rezervă care confirmă adoptarea corectă a configurației cu bulbi masivi la un perete cu lungime importantă (6,00 m).

**Verificarea la forță tăietoare**: `VEd = 780 kN` (din tabelul PTh-S.2.3). Rezistența la forfecare a peretelui (mecanism combinat beton + armătură orizontală, conform SR EN 1992-1-1 §6.2 și P100-1/2013 §5.5.3):

`VRd = 0,18·k·(100·ρl·fck)^(1/3)·bw·d + armătura orizontală activă ≈ 620 + 340 = 960 kN ≥ VEd = 780 kN` → **verificat**, utilizare 81% — cea mai solicitată verificare a peretelui de capăt, motiv pentru care armătura orizontală distribuită (2×Ø12/200) nu se poate reduce fără a compromite marja la forfecare.

## PTh-S.2.7 Verificarea peretelui structural de nucleu (PS-NUC) — configurație în U/C

Nucleul central de circulație (casa scării), aflat la axa 6, este delimitat de pereți structurali dispuși în formă de U sau C (conform arhitecturii — o casă de scări închisă pe 3 laturi, cu latura a patra spre coridor, tratată ca deschidere/perete nestructural cu ușă rezistentă la foc, `arhitectura.md` cap. 10). Rigiditatea acestei configurații compuse este superioară unui perete plan simplu de aceeași lungime dezvoltată, motiv pentru care preia cea mai mare fracțiune din forța seismică totală (23,9%, PTh-S.2.3), dar necesită o verificare specifică la **torsiune de secțiune deschisă/semi-închisă** (efectul de "warping" al unei secțiuni în U supuse la încărcări laterale asimetrice față de centrul ei de forfecare, care nu coincide cu centrul geometric al secțiunii U):

Centrul de forfecare al secțiunii în U (calculat din geometria pereților componenți, 3 tronsoane de 20 cm, lungimi 3,00/6,00/3,00 m) se situează la o distanță `es ≈ 1,40 m` în afara secțiunii (spre exteriorul U-ului, comportament tipic al profilelor deschise) — o excentricitate suplimentară care se adaugă, conservator, la excentricitatea accidentală normativă la calculul torsiunii de ansamblu a planșeului rigid (cap. 3.4 DTAC), fiind deja inclusă în modelul spațial cu elemente finite (PTh-S.14), care tratează nucleul ca ansamblu de elemente placă/perete conectate rigid, nu ca element de bară simplificat. Verificarea de rezistență a fiecărui tronson de perete component (bulbi la colțurile interioare ale U-ului, armătură distribuită pe inimi) urmează identic metodologia de la PTh-S.2.6, cu eforturile individuale rezultate din model (nedetaliate numeric aici pentru a evita repetarea calculului, dar arhivate în raportul de calcul EF, PTh-S.14).

## PTh-S.2.8 Verificarea grinzilor principale — toate cele trei tipuri de deschidere

DTAC a verificat grinda de 30×60 cm pe deschiderea de 7,20 m (MEd ≈ 245 kNm, 4Ø20, cap. 8.2 DTAC). Faza PTh extinde la celelalte două tipuri de grindă introduse de grila definitivă:

**Grinda B-C (30×60 cm, deschidere 6,00 m, pe axele curente):** `MEd ≈ 195 kNm` (moment mai mic decât la deschiderea de 7,20 m, proporțional cu L², dar cu o reducere suplimentară dată de rigiditatea mai mare a reazemelor interioare — coridorul are stâlpi pe ambele linii B și C, spre diferență de deschiderea A-B care se reazemă pe fațadă și pe linia B):

`As = MEd/(z·fyd) = 195×10⁶/(504×434,8) = 890 mm²` → se adoptă **4Ø18** (As = 1.018 mm²), ρ = 1.018/(300×504) = 0,673%, în intervalul admis DCM — **verificat**.

**Grinda C-D (30×45 cm, deschidere 2,40 m, fâșia de grupuri sanitare/depozitare):** element nou, introdus la PTh, absent din predimensionarea generică DTAC. Moment redus, tipic unei deschideri mici: `MEd ≈ 42 kNm` (din încărcări gravitaționale, componenta seismică fiind neglijabilă la o deschidere atât de mică, rigidizată practic de stâlpii adiacenți deja verificați la interacțiune biaxială):

`As = 42×10⁶/(378×434,8) = 256 mm²` → se adoptă **3Ø14** (As = 462 mm², minim constructiv pentru o grindă disipativă DCM, ρmin = 0,26%, verificat: 462/(300×378) = 0,407% ≥ 0,26%) → **verificat**, cu marjă amplă (secțiunea e guvernată de armătura minimă constructivă, nu de moment).

## PTh-S.2.9 Verificarea nodurilor grindă-stâlp — forța tăietoare de nod pe toate configurațiile

Conform proiectării la capacitate (cap. 8.1 DTAC), forța tăietoare de nod se determină din momentele capabile ale grinzilor adiacente, nu din analiza elastică directă. Pentru **nodul interior curent** (stâlp 50×50, două grinzi de 30×60 convergente pe direcții ortogonale — deschiderile A-B și B-C, deci un nod la intersecția axelor curente cu linia B):

`Vj,Ed = (MRb1 + MRb2)/hb - VEd,stâlp ≈ (280+280)/0,60 - 210 = 933 - 210 = 723 kN`

Verificarea panoului de inimă al stâlpului (mecanism combinat beton confinat prin etrieri + biele de compresiune diagonale, conform P100-1/2013 §5.5.3.2): `Vj,Rd ≈ 0,20·fcd·bj·hj·(1 - νd) = 0,20×16,67×500×500×(1-0,276)×10⁻³ = 604 kN` — **insuficient** (723 > 604) → se impune **majorarea etrierilor de nod** de la Ø10/100 (curent, cap. 9.3 DTAC) la **Ø12/80 mm** pe toată zona nodului, ceea ce ridică rezistența panoului de inimă (prin componenta de confinare suplimentară a mecanismului de bielă-tirant) la `Vj,Rd ≈ 745 kN ≥ 723 kN` → **verificat, decizie de proiectare PTh**: la nodurile interioare curente ale Corpului A, unde converg simultan grinzi pe două direcții ortogonale de deschidere comparabilă (6,00/7,20 m), etrierii de nod se majorează de la Ø10/100 (predimensionare DTAC, valabilă pentru un nod cu o singură grindă principală convergentă) la **Ø12/80 mm**, cu agrafe suplimentare pentru confinarea biaxială a miezului de beton.

Pentru **nodurile marginale** (stâlp de fațadă, o singură grindă principală convergentă pe direcția A-B sau grinda transversală pe direcția axelor), forța tăietoare de nod este sensibil mai mică (`Vj,Ed ≈ 420 kN`), iar etrierii Ø10/100 din predimensionarea DTAC rămân **verificați** fără corecție.

---

# PTh-S.3 — BREVIAR DE CALCUL COMPLET AL CORPULUI B — TOATE CELE 7 FERME METALICE

## PTh-S.3.1 Grila de ferme adoptată la faza PTh

DTAC a dezvoltat integral calculul unei singure ferme, reprezentativă pentru interaxul curent de 6,00 m (cap. 8.6-8.7 DTAC). Faza PTh fixează grila completă pe lungimea de 33,00 m a Corpului B și extinde verificarea la **înfășurătoarea tuturor fermelor**, ținând cont de variația ariei tributare de la o fermă la alta:

| Interax | 1-2 | 2-3 | 3-4 | 4-5 | 5-6 | 6-7 |
|---|---|---|---|---|---|---|
| Deschidere [m] | 4,50 | 6,00 | 6,00 | 6,00 | 6,00 | 4,50 |

Total: 4,50 + 4×6,00 + 4,50 = **33,00 m** — confirmă geometria DTAC. Cele două travei de capăt (1-2 și 6-7), de 4,50 m, corespund zonei de fronton, unde fermele de capăt (axele 1 și 7) sunt integrate în structura peretelui pignon și preiau, suplimentar, reacțiunea contravântuirilor orizontale de acoperiș (cap. PTh-S.3.6); cele 4 travei curente, de 6,00 m, corespund modulului adoptat în DTAC.

## PTh-S.3.2 Aria tributară și încărcarea liniară pe fiecare fermă

Fiecare fermă colectează încărcarea de pe o fâșie de acoperiș egală cu media interaxelor adiacente (jumătate din fiecare travee vecină):

| Axă fermă | Poziție | Aria tributară pe lungimea fermei [m] | Raport față de axa curentă (6,00 m) | q calculat [kN/m] (din q,curent=18,5 kN/m, cap. 8.6 DTAC) |
|---|---|---|---|---|
| 1 | fronton | 2,25 (½ din 4,50) | 0,375 | 6,94 |
| 2 | curentă adiacentă frontonului | 5,25 (½×4,50+½×6,00) | 0,875 | 16,19 |
| 3 | curentă | 6,00 | 1,000 | 18,50 |
| 4 | curentă (mijloc) | 6,00 | 1,000 | 18,50 |
| 5 | curentă | 6,00 | 1,000 | 18,50 |
| 6 | curentă adiacentă frontonului opus | 5,25 | 0,875 | 16,19 |
| 7 | fronton opus | 2,25 | 0,375 | 6,94 |

## PTh-S.3.3 Înfășurătoarea eforturilor în tălpile fermei — toate cele 7 axe

Pentru fiecare fermă, momentul echivalent de calcul (tratând ferma ca grindă simplu rezemată pe deschiderea de 21,00 m) și efortul axial rezultat în tălpi (h = 1,50 m, cf. cap. 8.6 DTAC) se recalculează proporțional cu q:

| Axă | q [kN/m] | M = q·L²/8 [kNm] | N,talpă = M/h [kN] | A,nec = N/fyd [mm²] | Profil tălpi | Utilizare (A,nec/A,adoptat) |
|---|---|---|---|---|---|---|
| 1 | 6,94 | 382,6 | 255,1 | 719 | 200×100×8 (A=4.400) | 0,163 |
| 2 | 16,19 | 892,5 | 595,0 | 1.676 | 200×100×8 | 0,381 |
| 3 | 18,50 | 1.020,0 | 680,0 | 1.915 | 200×100×8 | 0,435 |
| 4 | 18,50 | 1.020,0 | 680,0 | 1.915 | 200×100×8 | 0,435 |
| 5 | 18,50 | 1.020,0 | 680,0 | 1.915 | 200×100×8 | 0,435 |
| 6 | 16,19 | 892,5 | 595,0 | 1.676 | 200×100×8 | 0,381 |
| 7 | 6,94 | 382,6 | 255,1 | 719 | 200×100×8 | 0,163 |

Deși ferma de capăt (axa 1/7) are un necesar de secțiune de sub 4 ori mai mic decât ferma curentă (719 mm² vs. 1.915 mm²), **se adoptă un profil unic 200×100×8 pentru tălpile tuturor celor 7 ferme** — decizie de proiectare PTh motivată de trei considerente convergente: (a) verificarea la flambaj al tălpii superioare comprimate (PTh-S.3.4) este guvernantă, nu rezistența secțiunii, și rămâne guvernantă indiferent de fermă, la aceeași lungime de flambaj între pane; (b) unificarea secțiunii pe toate cele 7 ferme reduce numărul de repere de atelier distincte, simplificând debitarea, sudarea și, mai important, **evită confuzia de montaj** la o structură ușoară unde o eroare de poziționare a unei ferme sub-dimensionate ar fi dificil de detectat vizual; (c) diferența de cost a supradimensionării fermelor de capăt este mică în valoare absolută (2 din cele 7 ferme, cu o lungime totală de tălpi de sub 10% din total oțel al Corpului B), în timp ce riscul de eroare de execuție la un profil unic dispare complet.

## PTh-S.3.4 Verificarea la flambaj a tălpii superioare comprimate — toate fermele

Talpa superioară, comprimată sub încărcări gravitaționale, este rezemată lateral de pane la interax `Lcr = 1,75 m` (interax adoptat pentru panele de acoperiș, coerent cu practica de proiectare pentru table sandwich, cf. și `hala-industriala/structura-pth.md` §PTh-R.2.8, unde se detaliază pe larg rațiunea acestui interax). Profil 200×100×8 (secțiune casetă sudată, oțel S355): arie A = 4.400 mm², moment de inerție pe axa slabă (perpendiculară pe planul fermei, cea care guvernează flambajul lateral între punctele de rezemare ale panelor) `Iz ≈ 896 cm⁴`, raza de inerție `iz = √(Iz/A) = √(896/44,0) = 4,52 cm = 45,2 mm`.

`λ = Lcr/iz = 1.750/45,2 = 38,7`

`ε = √(235/fy) = √(235/355) = 0,813`; `λ1 = 93,9·ε = 93,9×0,813 = 76,3`

`λ̄ = λ/λ1 = 38,7/76,3 = 0,507`

Pentru profil casetat sudat, curba de flambaj **b** (α = 0,34, conform SR EN 1993-1-1 tab. 6.2, pentru secțiuni sudate cu h/b ≤ 1,2):

`Φ = 0,5·[1 + α·(λ̄-0,2) + λ̄²] = 0,5×[1 + 0,34×0,307 + 0,257] = 0,5×1,361 = 0,680`

`χ = 1/(Φ+√(Φ²-λ̄²)) = 1/(0,680+√(0,462-0,257)) = 1/(0,680+0,454) = 1/1,134 = 0,882`

`Nb,Rd = χ·A·fy/γM1 = 0,882×4.400×355/1,00×10⁻³ = 1.379 kN`

| Axă | N,talpă [kN] | Nb,Rd [kN] | Utilizare N/Nb,Rd |
|---|---|---|---|
| 1/7 | 255,1 | 1.379 | 0,185 |
| 2/6 | 595,0 | 1.379 | 0,431 |
| 3/4/5 | 680,0 | 1.379 | 0,493 |

Toate cele 7 ferme **verificate**, cu marjă amplă pentru ferma curentă (utilizare 49,3%) — confirmă cantitativ observația de principiu din DTAC (cap. 8.6) că profilul adoptat este dimensionat de flambaj, nu de rezistență axială pură, iar rezerva de peste 2× este necesară și suficientă simultan pentru toate cele 7 ferme, indiferent de aria tributară individuală.

## PTh-S.3.5 Diagonalele și montanții zăbrelei — verificare pe eforturi caracteristice

Analiza zăbrelei ca grindă static determinată (noduri articulate convenționale, conform practicii curente pentru ferme cu zăbrele, cap. 5.3 DTAC) produce, pentru ferma curentă, o distribuție de eforturi axiale în diagonale și montanți care descrește de la reazeme (unde forța tăietoare a grinzii echivalente este maximă) spre mijlocul deschiderii (unde forța tăietoare se anulează):

| Panou (de la reazem spre mijloc) | Diagonală — efort caracteristic | Montant — efort caracteristic |
|---|---|---|
| 1 (lângă reazem) | -312 kN (compresiune) | -45 kN (compresiune) |
| 2 | +268 kN (întindere) | -38 kN |
| 3 | -215 kN | -30 kN |
| 4 (mijloc, ultimul panou simetric) | +178 kN | -22 kN |

Diagonalele întinse (impare) se dimensionează la rezistența secțiunii nete (profil adoptat: țeavă rectangulară SHS 90×90×5, A = 1.660 mm², Anet ≈ 1.500 mm² la capătul aplatizat cu găuri): `Nt,Rd = Anet·fu/γM2 = 1.500×490/1,25×10⁻³ = 588 kN ≥ 268 kN` → **verificat**, utilizare 46%. Diagonalele comprimate (pare) se verifică la flambaj, cu lungime de flambaj egală cu lungimea geometrică a panoului (≈ 2,50 m, noduri articulate, fără rezemare intermediară): `λ = 2.500/iz(SHS90×90×5=34,3mm) = 72,9`; `λ̄ = 72,9/76,3 = 0,955`; curba **a** pentru SHS laminat la cald (α=0,21): `Φ=0,5×[1+0,21×0,755+0,912]=0,5×1,991=0,996`; `χ=1/(0,996+√(0,992-0,912))=1/(0,996+0,283)=0,782`; `Nb,Rd=0,782×1.660×355/1,0×10⁻³=461 kN ≥ 312 kN` → **verificat**, utilizare 68%.

## PTh-S.3.6 Fermele de capăt (axele 1 și 7) — reacțiunea contravântuirilor orizontale

Fermele de capăt, integrate structural în peretele pignon, preiau suplimentar componenta orizontală a contravântuirii de acoperiș, care transmite forța de vânt frontală (perpendiculară pe fronton) de la stâlpii de fronton (analog §PTh-R.2.6 din memoriul-tip `hala-industriala/structura-pth.md`, unde se detaliază integral acest mecanism) către contravântuirile verticale ale pereților longitudinali. Verificarea acestei componente suplimentare, aplicată tălpii inferioare a fermei de capăt (care acționează, pe acest tronson, ca element de coardă a contravântuirii orizontale de acoperiș, nu doar ca talpă de fermă):

`N,vânt = qvânt,fronton·L/2 ≈ 5,04×21,0/2 = 52,9 kN` (adăugat algebric la efortul din încovoiere gravitațională al tălpii, N,talpă=255,1 kN, în funcție de sensul vântului) → `N,total,max ≈ 255,1+52,9 = 308 kN ≪ Nb,Rd = 1.379 kN` → **verificat**, marjă amplă, componenta de vânt fiind mică în raport cu rezerva de flambaj deja constatată la PTh-S.3.4.

## PTh-S.3.7 Stâlpii de susținere (60×60 cm) — verificare pe toate cele 14 poziții

Fiecare fermă se reazemă pe 2 stâlpi de beton armat (unul pe fiecare fațadă longitudinală a Corpului B), rezultând **14 stâlpi** (7 ferme × 2 reazeme). Reacțiunea verticală gravitațională la fiecare reazem: `R = q·L/2`:

| Axă fermă | q [kN/m] | R (per reazem, gravitațional) [kN] | NEd total (incl. greutate proprie stâlp + acoperire seismică) [kN] | MEd bază (încastrare, seismic) [kNm] |
|---|---|---|---|---|
| 1/7 | 6,94 | 72,9 | 165 | 178 |
| 2/6 | 16,19 | 170,0 | 285 | 245 |
| 3/4/5 | 18,50 | 194,3 | 320 | 262 |

Verificarea stâlpului curent (60×60 cm, C25/30, încastrat la bază — configurație confirmată din DTAC cap. 4.2/5.3, unde încastrarea este mecanismul principal de rigidizare laterală pe direcția transversală a fermelor): efort axial redus `νd = 320.000/(360.000×16,67) = 0,053` — valoare foarte redusă (stâlp guvernat de moment, nu de compresiune, tipic unei structuri parter cu masă redusă la acoperiș, cap. 2.3 DTAC). Cu armătura adoptată **8Ø20** (As = 2.513 mm², ρl=2.513/360.000=0,70%): `MRd ≈ 385 kNm ≥ MEd = 262 kNm` → **verificat**, utilizare 68%, marjă necesară pentru a acoperi și componenta suplimentară din sucțiunea vântului (cap. 6.4/8.7 DTAC), care poate inversa parțial solicitarea la reazemul mobil.

---

# PTh-S.4 — ROSTUL ANTISEISMIC — DETALIUL DE EXECUȚIE INTEGRAL

## PTh-S.4.1 Recapitularea dimensionării (DTAC) și confirmarea la faza PTh

DTAC a dimensionat rostul la 12 cm, din suma deplasărilor absolute de vârf ale celor două corpuri (dr,A ≈ 6,0 cm + dr,B ≈ 5,0 cm = 11,0 cm, majorat la 12 cm pentru marjă de siguranță, cap. 2.4 DTAC). Modelul spațial de calcul definitiv (PTh-S.14), rulat separat pentru Corp A (pe grila de axe de la PTh-S.2.1) și Corp B (pe grila de la PTh-S.3.1), confirmă:

`dr,A (deplasare absolută de vârf, etaj 2, la starea limită ultimă) = 5,8 cm`
`dr,B (deplasare absolută de vârf, cota fermelor, la starea limită ultimă) = 4,9 cm`
`dmin = 5,8+4,9 = 10,7 cm ≤ 12,0 cm adoptat` → **confirmat, fără necesitatea majorării rostului**.

Marja rămasă (12,0 - 10,7 = 1,3 cm) se reține ca rezervă de execuție, acoperind toleranțele normale de trasare și de montaj ale elementelor care mărginesc rostul (cofraje, pereți de compartimentare, tâmplărie), nu ca rezervă de calcul suplimentară — orice modificare ulterioară a modelului (de exemplu, la confirmarea definitivă a parametrilor seismici de amplasament, dacă amplasamentul real diferă de exemplul de calcul din DTAC) impune re-verificarea acestei marje înainte de trasarea finală a rostului pe șantier.

## PTh-S.4.2 Alcătuirea constructivă a rostului — de la fundație la acoperiș

Rostul se realizează **continuu**, cu lățime constantă de 12 cm, pe toată suprafața de contact potențial dintre cele două corpuri, tratat diferențiat pe zone, conform tabelului următor:

| Zonă | Alcătuire | Rol |
|---|---|---|
| Infrastructură (sub cota terenului sistematizat) | Element compresibil (polistiren expandat, densitate ≤ 20 kg/m³, sau vată minerală necompactată), pe toată adâncimea de fundare (Df = -1,50 m) | Absoarbe eventuala deplasare relativă a infrastructurilor la un cutremur major, fără a transmite forțe |
| Elevații/pereți/stâlpi (suprastructură) | Element compresibil identic, protejat pe cele două fețe (dinspre Corp A și dinspre Corp B) cu un strat de hidroizolație flexibilă (membrană bituminoasă armată sau folie EPDM), lipit continuu pe fiecare parte, fără a traversa rostul | Etanșare la apă/aer, fără rigidizare a rostului |
| Pardoseală (interior, la nivelul parterului) | Profil de dilatație metalic cu inserție elastomerică, montat cu o singură parte fixă (pe unul dintre corpuri) și cealaltă parte glisantă (pe celălalt corp), acoperind rostul vizibil | Continuitate vizuală/funcțională a pardoselii, fără blocarea deplasării relative |
| Fațadă (exterior) | Profil de dilatație vertical, cu bandă de etanșare flexibilă (siliconică sau EPDM), fixat similar pardoselii — o parte fixă, o parte glisantă | Etanșare la intemperii, permite deplasarea relativă a celor două fațade |
| Acoperiș/streașină (la interfața dintre acoperișul Corpului A și cel al Corpului B, dacă cotele sunt apropiate) | Tablă de acoperire flexibilă (tablă zincată cu falduri de dilatație, susținută pe console independente de fiecare corp) | Etanșare la apă pluvială, fără punte rigidă între structuri |

## PTh-S.4.3 Elementul de legătură funcțională dintre corpuri — decizia de execuție

DTAC a menționat principiul (cap. 2.1 DTAC): legătura funcțională (holul comun de acces) traversează rostul fără a-l anula structural. Faza PTh fixează soluția definitivă, în corelare cu `arhitectura.md`: **copertină de legătură pe console independente**, cu structură proprie ușoară (metalică, fermă/grindă cu zăbrele de dimensiuni reduse, secțiune dimensionată separat, cap. PTh-S.17), rezemată:

- pe **Corp A**, printr-un reazem fix (consolă încastrată în peretele de capăt PS-CAP sau în structura de cadre adiacentă, transmițând integral reacțiunea copertinei la Corp A);
- pe **Corp B**, printr-un reazem mobil (glisant pe neopren armat sau pe un sistem de role/glisiere metalice, care permite deplasarea relativă calculată la PTh-S.4.1, ±5,4 cm pe fiecare direcție, fără a transmite reacțiune orizontală structurii Corpului B).

Această configurație asigură că **niciun element structural nu traversează rostul fără decuplare explicită a deplasărilor relative** (principiul stabilit definitiv în DTAC), copertina fiind, la rândul ei, un element independent de ambele structuri principale, nu o punte rigidă între ele. Dimensiunile copertinei (deschidere ≈ 3,00-4,00 m, lățime egală cu lățimea holului de acces, conform `arhitectura.md`) rezultă din proiectul de arhitectură definitivat și se detaliază separat, într-un breviar de calcul dedicat elementului de legătură (element secundar, cu implicații structurale minore asupra celor două corpuri principale, dat fiind mecanismul de reazeme fix/mobil descris mai sus).

## PTh-S.4.4 Trasarea și execuția rostului — secvența de șantier

1. **Trasarea axei rostului** pe planul de fundații, cu toleranță ±10 mm, confirmată prin control topografic înainte de execuția cofrajelor de fundație ale ambelor corpuri.
2. **Cofrarea separată** a fundațiilor celor două corpuri, cu un panou de separație rigid temporar (placă OSL/polistiren dur, îndepărtat sau lăsat parțial ca suport pentru elementul compresibil definitiv) la interfața dintre cele două fundații — se interzice explicit betonarea continuă a celor două infrastructuri într-o singură operație fără separator, greșeală de execuție frecventă care ar anula complet rațiunea rostului.
3. **Montarea elementului compresibil definitiv** pe toată înălțimea elevației, pe măsura avansării betonării fiecărui corp (fiecare corp se betonează separat, cu elementul compresibil rămas atașat, prin lipire/fixare mecanică ușoară, de fața cofrajului unui corp, înainte de betonarea acestuia; celălalt corp se betonează separat, cu propriul cofraj, aplicat direct pe fața elementului compresibil deja fixat).
4. **Verificarea lățimii rostului** (control cu șabloane calibrate la 12 cm ±5 mm) la fiecare etapă de betonare, cu consemnare în procesul-verbal de fază determinantă (PTh-S.12).
5. **Montarea profilelor de dilatație** vizibile (pardoseală, fațadă) la faza de finisaje, după finalizarea structurii ambelor corpuri și după stabilizarea eventualelor tasări diferențiale inițiale (verificate prin monitorizarea de la PTh-S.13).

---

# PTh-S.5 — FUNDAȚIILE — DETALIERE COMPLETĂ

## PTh-S.5.1 Decizia definitivă: grătar de grinzi de fundare (Corp A) — confirmare față de alternativa radier general

DTAC a menționat, ca alternativă explicit analizată pentru Corp A, un radier general de 40-50 cm, recomandând confirmarea soluției finale prin studiul geotehnic definitiv (cap. 4.2 DTAC). Studiul geotehnic definitiv al amplasamentului (document distinct, ale cărui concluzii se preiau aici) confirmă un teren de fundare **relativ omogen pe toată lungimea de 51,60 m** a Corpului A, fără variații locale semnificative ale modulului de deformație Es între forajele executate la cele două extremități și la mijlocul amprentei — condiție care, conform practicii de proiectare geotehnică, nu impune soluția mai costisitoare a radierului general. **Se adoptă definitiv soluția cu grătar de fundații (izolate sub stâlpi + continue sub pereți, legate prin grinzi de fundare pe două direcții ortogonale)**, confirmată ca fiind suficientă pentru uniformizarea tasărilor la omogenitatea de teren constatată, cu o economie de material estimată la 30-40% față de radierul general (grosime medie echivalentă comparabilă, dar suprafață activă mult redusă — grătarul ocupă doar amprenta reală a elementelor structurale plus grinzile de legătură, nu întreaga suprafață construită).

## PTh-S.5.2 Fundațiile izolate sub stâlpii curenți (ST-C/ST-M, 50×50 cm)

Verificarea de la stâlpul central (NEd ≈ 1.150 kN, cap. 4.3 DTAC) se extinde la toate cele 34 de poziții de stâlp curent (PTh-S.2.2), cu diferențierea între stâlpii de fațadă (arie tributară mai mică, o singură deschidere gravitațională de o parte) și stâlpii interiori (arie tributară dublă, deschideri gravitaționale de ambele părți):

| Poziție | NEd [kN] | Dimensiune talpă adoptată | Af [m²] | pef [kPa] | pconv,corectat [kPa] | Verificare |
|---|---|---|---|---|---|---|
| ST-C (fațadă, axe curente) | 890 | 1,90×1,90 | 3,61 | 246 | 250 | ✓ (utilizare 0,984) |
| ST-M (interior, axe curente) | 1.150 | 2,20×2,20 | 4,84 | 238 | 250 | ✓ (confirmă §4.3 DTAC) |
| ST-CO (adiacent nucleu) | 985 | 2,00×2,00 | 4,00 | 246 | 250 | ✓ (utilizare 0,984) |

Fundațiile ST-C, la utilizare 98,4%, ating o marjă minimă acceptabilă (sub 2% rezervă) — decizie de proiectare PTh: se majorează, din prudență și pentru a evita orice sensibilitate la variații locale minore ale terenului identificate punctual de studiul geotehnic (foraje la extremitățile clădirii, unde stâlpii de fațadă sunt amplasați), talpa fundațiilor ST-C la **2,00×2,00 m** (Af=4,00 m², pef=890/4,00=222,5 kPa, utilizare 0,890), unificând practic dimensiunea cu cea a fundațiilor ST-CO, cu avantaj suplimentar de simplificare a execuției (un singur șablon de cofraj pentru cele două tipuri).

## PTh-S.5.3 Fundațiile stâlpilor de colț (ST-55, 55×55 cm)

`NEd = 640 kN` (PTh-S.2.5). Talpă adoptată **1,80×1,80 m** (Af=3,24 m²): `pef = 640/3,24 = 198 kPa ≤ 250 kPa` → **verificat**, utilizare 79%, marjă justificată de necesitatea acoperirii momentului de răsturnare local suplimentar (stâlp de colț, supus la interacțiune biaxială mai severă, PTh-S.2.5), care generează o distribuție de presiuni neuniformă pe talpă, nu doar o presiune medie.

## PTh-S.5.4 Fundațiile continue sub pereții structurali (PS-CAP, PS-NUC)

Pentru peretele de capăt (`NEd = 1.850 kN, MEd = 3.180 kNm`, PTh-S.2.6), fundația continuă se dimensionează pentru a converti momentul de răsturnare într-o distribuție de presiuni excentrică pe teren, fără desprindere completă (confirmat la PTh-S.2.6, e=1,72 m < lw/2=3,00 m):

Lățimea tălpii continue adoptată: `B = 2,80 m`, pe toată lungimea peretelui plus o extindere de 0,50 m la fiecare extremitate (pentru a acoperi excentricitatea maximă fără a depăși marginea tălpii — condiție de bază a proiectării fundațiilor excentric încărcate): `L,talpă = 6,00+2×0,50 = 7,00 m`.

`Af = 2,80×7,00 = 19,60 m²`

Presiunea medie: `pmed = NEd/Af = 1.850/19,60 = 94,4 kPa`. Presiunea maximă la marginea comprimată (distribuție trapezoidală/triunghiulară, conform excentricității e=1,72 m față de o semilățime a tălpii de 3,50 m — e/L=0,246, sub limita e/L≤1/6=0,167... **verificare**: e/L=1,72/7,00=0,246 > 0,167 → secțiunea tălpii este parțial necomprimată la capătul opus momentului, situație admisă la gruparea seismică, cu redistribuire pe zona efectiv comprimată):

`pmax = 2·NEd/(3·B·(L/2-e)) = 2×1.850/(3×2,80×(3,50-1,72))×1000 = 3.700/(3×2,80×1,78) = 3.700/14,95 = 247,5 kPa ≤ pconv,corectat majorat 1,3× = 325 kPa` → **verificat**, utilizare 76%, cu marja necesară acoperind și distribuția neuniformă reală (metoda simplificată de calcul a presiunii de vârf la fundații excentric încărcate, conform practicii geotehnice curente, coerentă cu NP 112/2014).

Pentru fundația nucleului central (`NEd=2.100 kN, MEd=3.640 kNm`), configurația fiind în plan U/C (PTh-S.2.7), fundația continuă urmează amprenta pereților componenți, cu o talpă lățită similar (`B=2,80 m`) pe toate cele 3 tronsoane, verificarea presiunii pe teren realizându-se, la această configurație plană complexă, direct din modelul de calcul cu elemente finite (interacțiune sol-structură simplificată prin arcuri Winkler, PTh-S.14), rezultatul (`pmax ≈ 260 kPa`) fiind consistent cu marja constatată la peretele de capăt.

## PTh-S.5.5 Grinzile de fundare — dimensionare și rol dublu

Grinzile de fundare, dispuse pe cele două direcții ale grilei (transversal, pe axele 1-11; longitudinal, pe liniile A-D), au secțiune **40×70 cm**, dimensionată din două cerințe simultane, ambele obligatorii pentru funcționarea corectă a grătarului:

1. **Cerința de rigiditate** — grinzile trebuie să fie suficient de rigide pentru a redistribui eficient încărcările între fundațiile izolate/continue vecine, limitând tasarea diferențială sub toleranța structurii de beton armat monolit de deasupra (fisurare admisibilă). Verificarea de rigiditate relativă (raportul între rigiditatea grinzii de fundare și rigiditatea terenului, criteriul de "viga rigidă" vs. "viga elastică pe mediu Winkler") confirmă un comportament suficient de rigid la secțiunea adoptată, pentru modulul de reacție al terenului determinat din studiul geotehnic (`k ≈ 45 MN/m³`, valoare tipică pentru argila prăfoasă plastic vârtoasă identificată la cap. 4.1 DTAC).
2. **Cerința de preluare a momentelor de bază** transmise de stâlpi/pereți la infrastructură — grinzile de fundare participă la echilibrarea locală a momentelor de încastrare, în special la stâlpii de colț (ST-55) și la peretele de nucleu, unde geometria fundației izolate/continue nu poate, singură, echilibra integral momentul fără concursul grinzii adiacente.

Armătura grinzilor de fundare: **4Ø20 la partea superioară + 4Ø20 la partea inferioară** (armare simetrică, condiție uzuală pentru elemente care pot fi solicitate la moment pozitiv sau negativ, funcție de configurația reală de încărcare/descărcare a fundațiilor adiacente sub diverse combinații), etrieri **Ø10/200 mm** pe zona curentă, majorați la **Ø10/100 mm** pe o lungime de 2×h=1,40 m de la fiecare nod cu o fundație izolată/continuă (zonă cu forță tăietoare majorată local).

## PTh-S.5.6 Fundațiile Corpului B — cele 14 fundații izolate sub stâlpii de 60×60 cm

Din valorile de la PTh-S.3.7 (NEd = 165÷320 kN, MEd = 178÷262 kNm, funcție de poziția fermei):

| Grup axă | NEd [kN] | MEd [kNm] | Talpă adoptată | Af [m²] | pmax [kPa] | Verificare |
|---|---|---|---|---|---|---|
| 1/7 (fronton) | 165 | 178 | 1,60×1,60 | 2,56 | 172 | ✓ |
| 2/6 | 285 | 245 | 1,90×1,90 | 3,61 | 213 | ✓ |
| 3/4/5 (curente) | 320 | 262 | 2,00×2,00 | 4,00 | 218 | ✓ |

Toate fundațiile se leagă între ele prin **grinzi de legătură perimetrale**, secțiune 30×50 cm (dimensiune redusă față de grinzile de fundare ale Corpului A, coerent cu momentele mai mici transmise de o structură parter cu masă redusă la acoperiș, cap. 2.3 DTAC), armate **3Ø16 sus + 3Ø16 jos**, etrieri Ø8/200 mm.

## PTh-S.5.7 Verificarea tasărilor diferențiale și hidroizolații — confirmare definitivă

Tasarea absolută estimată la stâlpul cel mai încărcat al Corpului A (ST-M, NEd=1.150 kN), calculată cu modulul de deformație Es=25 MPa identificat de studiul geotehnic (cap. 4.1 DTAC), prin metoda straturilor elementare: `s ≈ 18 mm`. Tasarea la peretele de capăt (fundație mai lată, presiune medie mai mică): `s ≈ 14 mm`. Tasarea diferențială între cele două puncte, pe o distanță de 6,00 m (interax curent): `Δs = 4 mm`, raport `Δs/L = 4/6.000 = 1/1.500`, sub limita de alertă uzuală de 1/500 pentru structuri de beton armat monolit → **verificat**, tasările diferențiale fiind compatibile cu grătarul de grinzi de fundare adoptat, fără a necesita rosturi de tasare suplimentare în interiorul Corpului A (rostul antiseismic dintre Corp A și Corp B rămâne singurul rost al ansamblului, cap. PTh-S.4).

Hidroizolația orizontală la nivelul soclului (membrană bituminoasă lipită, dublu strat) se aplică pe toate elevațiile de fundație ale ambelor corpuri, sub zidăria de umplutură a parterului; hidroizolația verticală a elevațiilor (protecție suplimentară față de umiditatea terenului superficial, confirmată necesară de studiul geotehnic definitiv la stratul de sol vegetal/umplutură din primii 0,80 m, cap. 4.1 DTAC) se aplică prin badijonare bituminoasă dublu strat pe toată suprafața elevațiilor expuse contactului cu terenul, până la cota terenului sistematizat.

---

# PTh-S.6 — CAIETUL DE ARMARE AL CORPULUI A — LISTE DE BARE, EXTRAS CANTITATIV

## PTh-S.6.1 Sistemul de marcare a barelor și pozițiilor de armare

Fiecare tip de bară primește o **poziție unică** (numerotare secvențială pe planul de armare al fiecărui element), regăsită simultan în lista de bare (planul de fier) și în planurile de cofraj/armare la scară 1:50/1:25 (cap. PTh-S.9.4):

| Prefix poziție | Categorie | Exemplu |
|---|---|---|
| P- | Armătură longitudinală stâlpi | P1…P4 (stâlpi curenți ST-C/ST-M), P5…P6 (stâlpi colț ST-55) |
| G- | Armătură longitudinală grinzi | G1…G3 (grinzi 30×60), G4 (grindă 30×45) |
| E- | Etrieri (toate elementele) | E1 (stâlp curent Ø10/100), E2 (nod majorat Ø12/80), E3 (grindă Ø10/100 zonă critică) |
| Z- | Armătură bulbi pereți structurali | Z1 (bulb PS-CAP Ø25), Z2 (bulb PS-NUC) |
| D- | Armătură distribuită pereți/planșee | D1 (inimă perete Ø12/200), D2 (planșeu Ø10/150) |
| F- | Armătură fundații/grinzi de fundare | F1 (talpă izolată), F2 (grindă de fundare) |

## PTh-S.6.2 Lista de bare — stâlpi curenți (ST-C/ST-M, 50×50 cm)

| Poziție | Bară | Lungime/buc [m] | Nr. buc/stâlp/nivel | Nr. stâlpi | Nr. niveluri | Nr. total buc | Masă unitară [kg/m] | Masă totală [kg] |
|---|---|---|---|---|---|---|---|---|
| P1 | Ø18 (longitudinal, 12 buc/stâlp) | 4,20 (incl. suprapunere 0,60m) | 12 | 30 (excl. cele 4 majorate la Ø20, PTh-S.2.4) | 3 | 1.080 | 2,00 | 9.072 |
| P2 | Ø20 (longitudinal, stâlpi majorați axele 3/9, 12 buc/stâlp) | 4,20 | 12 | 4 | 3 | 144 | 2,47 | 1.494 |
| P3 | Ø18 (stâlp ST-CO, 12 buc/stâlp) | 4,20 | 12 | 2 | 3 | 72 | 2,00 | 605 |
| E1 | Ø10 etrier curent 500×500 (dezvoltat ≈ 2,08 m/buc) | 2,08 | 24 (interax 150mm pe 3,60m) | 34 | 3 | 2.448 | 0,617 | 3.145 |
| E2 | Ø12 etrier zonă nod 500×500 (dezvoltat ≈ 2,10 m/buc) | 2,10 | 8 (interax 80mm pe 0,60m zonă critică nod) | 34 | 3×2 (nod la fiecare capăt) | 1.632 | 0,888 | 3.048 |

**Subtotal stâlpi curenți: ≈ 17.364 kg**

## PTh-S.6.3 Lista de bare — stâlpi de colț (ST-55, 55×55 cm)

| Poziție | Bară | Lungime/buc [m] | Nr. buc/stâlp/nivel | Nr. stâlpi | Nr. niveluri | Nr. total buc | Masă unitară [kg/m] | Masă totală [kg] |
|---|---|---|---|---|---|---|---|---|
| P5 | Ø20 (longitudinal, 16 buc/stâlp) | 4,20 | 16 | 4 | 3 | 192 | 2,47 | 1.994 |
| E1 (55×55) | Ø10 etrier 550×550 (dezvoltat ≈ 2,28 m/buc) | 2,28 | 24 | 4 | 3 | 288 | 0,617 | 411 |

**Subtotal stâlpi de colț: ≈ 2.405 kg**

## PTh-S.6.4 Lista de bare — grinzi principale (toate cele trei tipuri)

| Poziție | Element | Bară | Lungime/buc [m] | Nr. buc/grindă | Nr. grinzi | Nr. niveluri | Masă unitară [kg/m] | Masă totală [kg] |
|---|---|---|---|---|---|---|---|---|
| G1 | Grinda A-B (30×60, L=7,20m) | 4Ø20 (2 sus+2 jos, continue) | 7,60 (incl. ancorare) | 4 | 22 (11 axe transversale × 2 pe deschidere, redus la poziții fără perete) | 3 | 2,47 | 18.581 |
| G2 | Grinda B-C (30×60, L=6,00m) | 4Ø18 | 6,40 | 4 | 22 | 3 | 2,00 | 13.517 |
| G4 | Grinda C-D (30×45, L=2,40m) | 3Ø14 | 2,80 | 3 | 22 | 3 | 1,21 | 1.677 |
| E3 | Etrieri grinzi 30×60, zonă critică Ø10/100 (dezvoltat ≈ 1,72 m/buc) | 1,72 | 18 (interax 100mm pe 1,80m zonă critică, 2 zone/grindă) | 22×2 grinzi tip (G1+G2) | 3 | 0,617 | 8.062 |
| E4 | Etrieri grinzi 30×60, zonă curentă Ø10/150 (dezvoltat ≈ 1,72 m/buc) | 1,72 | 20 (rest deschidere) | 22×2 | 3 | 0,617 | 8.958 |

**Subtotal grinzi principale: ≈ 50.795 kg**

*(Notă metodologică: numărul de 22 de grinzi pe tip corespunde celor 11 axe transversale × 2 grinzi longitudinale convergente per axă pe fiecare deschidere tipică, aproximare rezonabilă pentru o structură cu grilă regulată; numărul exact se confirmă pe planul de cofraj definitiv la predarea documentației de execuție, planurile S01-S08, cap. PTh-S.9.4.)*

## PTh-S.6.5 Lista de bare — pereți structurali (PS-CAP + PS-NUC)

| Poziție | Element | Bară | Cantitate | Masă totală [kg] |
|---|---|---|---|---|
| Z1 | Bulbi PS-CAP (8Ø25/bulb × 2 bulbi × 2 pereți × 3 niveluri) | Ø25, L=4,20m/buc | 96 buc | 3.108 |
| Z2 | Bulbi PS-NUC (8Ø25/bulb × 6 bulbi colț U × 3 niveluri) | Ø25, L=4,20m/buc | 144 buc | 4.662 |
| D1 | Armătură distribuită inimă (2×Ø12/200 pe H+V, toți pereții, dezvoltat pe suprafața totală ≈ 6×20×3,60×2 fețe = 259 m² echivalent) | Ø12, densitate 2×(1/0,20)×2 = 20 m/m² | ≈ 5.180 m total | 4.594 |
| E-Z | Etrieri confinare bulbi Ø10/80 (dezvoltat ≈ 3,20 m/buc, secțiune bulb 0,90×0,20) | 45 buc/bulb (0,90m/0,08m/nivel×3,6/0,90) | 8 bulbi × 3 niveluri × 45 | 6.660 |

**Subtotal pereți structurali: ≈ 19.024 kg**

## PTh-S.6.6 Armătura planșeelor (15 cm, toate cele 3 niveluri)

Planșeul se armează pe două direcții, cu bară curentă **Ø10/150 mm** pe câmp și majorare la **Ø10/100 mm** pe fâșiile de rezemare (lățime ≈ 1,20 m de fiecare parte a grinzilor și pereților, zonă de moment negativ la reazem):

Suprafața desfășurată a planșeelor Corpului A: `Sd,planșeu ≈ 51,60×15,60×3 = 2.415 m²` (aproximând suprafața utilă la amprenta totală, redusă cu ≈5% pentru goluri de scări/instalații → `≈ 2.294 m²`). Densitate medie de armare (câmp + fâșii de rezemare, ambele direcții, ambele fețe superioară/inferioară): `≈ 9,2 kg/m²` (valoare tipică pentru o placă de 15 cm armată pe două direcții la momentele rezultate din încărcările Corpului A, cap. 6.1-6.2 DTAC).

`Masă totală armătură planșee ≈ 2.294×9,2 = 21.105 kg`

## PTh-S.6.7 Armătura fundațiilor (izolate, continue, grinzi de fundare)

| Element | Cantitate | Densitate de armare | Masă totală [kg] |
|---|---|---|---|
| Fundații izolate ST-C/ST-M/ST-CO (34 buc, talpă 2,00×2,00×0,60) | 34 buc | plasă Ø14/150 pe două direcții, ≈ 45 kg/buc | 1.530 |
| Fundații izolate ST-55 (4 buc, talpă 1,80×1,80×0,60) | 4 buc | plasă Ø14/150, ≈ 36 kg/buc | 144 |
| Fundații continue PS-CAP/PS-NUC (3 tronsoane echivalente, 2,80×7,00×0,70) | 3 buc | plasă Ø16/150 pe două direcții + armătură longitudinală de continuitate, ≈ 620 kg/buc | 1.860 |
| Grinzi de fundare (rețea completă pe grilă, lungime totală ≈ 11×15,60+4×51,60 ≈ 378 m) | 378 m | 4Ø20 sus+jos + Ø10/150 etrieri, ≈ 42 kg/m | 15.876 |

**Subtotal fundații Corp A: ≈ 19.410 kg**

## PTh-S.6.8 Extras cantitativ centralizator — Corp A

| Categorie | Masă [kg] |
|---|---|
| Stâlpi curenți (ST-C/ST-M/ST-CO) | 17.364 |
| Stâlpi de colț (ST-55) | 2.405 |
| Grinzi principale (toate tipurile) | 50.795 |
| Pereți structurali (PS-CAP + PS-NUC) | 19.024 |
| Planșee (3 niveluri) | 21.105 |
| Fundații + grinzi de fundare | 19.410 |
| **TOTAL oțel-beton BST500C, Corp A** | **≈ 130.103 kg ≈ 130,1 t** |

Indice de consum: `130.103 kg / (Sd,Corp A ≈ 2.415 m²) = 53,9 kg/m²` — valoare coerentă cu practica curentă pentru o structură duală (cadre + pereți) de beton armat DCM la clasă de importanță seismică II (intervalul orientativ pentru clădiri publice similare, cu regim P+2E și seismicitate ridicată, este de 45-60 kg/m² desfășurat; valoarea calculată aici se situează confortabil în acest interval, confirmând coerența dimensionării globale față de practica de proiectare).

---

# PTh-S.7 — EXTRASUL DE MATERIALE AL STRUCTURII METALICE A CORPULUI B

## PTh-S.7.1 Sistemul de marcare a reperelor de atelier

| Prefix marcă | Categorie element | Exemplu |
|---|---|---|
| FR- | Ferme metalice complete | FR-01…FR-07 (7 ferme, tălpi unificate 200×100×8, PTh-S.3.3) |
| ST-B- | Stâlpi de beton armat Corp B | ST-B-01…ST-B-14 (14 poziții, PTh-S.3.7) — apar aici doar ca reper de coordonare cu reazemele fermelor, armarea fiind tratată la beton |
| PN- | Pane de acoperiș | PN-F/G (zone marginale), PN-H/I (zone curente) |
| GP- | Rigle de perete (girts) | GP-A (zonă colț), GP-B/D/E (curent) |
| CV- | Contravântuiri verticale (pereți longitudinali) | CV-01…CV-04 |
| CO- | Contravântuiri orizontale de acoperiș | CO-01…CO-06 |
| SR- | Sag-rods (pane) | SR-01… |
| PB-B | Plăci de bază/reazem fermă pe stâlp | PB-F (reazem fix), PB-M (reazem mobil) |

## PTh-S.7.2 Extras profile — recapitulație pe marcă

| Marcă | Profil | Lungime/buc [m] | Nr. buc | Lungime totală [m] | Masă unitară [kg/m] | Masă totală [kg] |
|---|---|---|---|---|---|---|
| Tălpi FR- (200×100×8) | RHS 200×100×8 | 21,80 (2 tălpi/fermă, cu supralungire de montaj) | 14 (2×7 ferme) | 305,2 | 34,5 | 10.529 |
| Diagonale FR- întinse | SHS 90×90×5 | 2,50 (medie) | 56 (4 panouri×2 diagonale×7 ferme) | 140,0 | 13,0 | 1.820 |
| Diagonale FR- comprimate | SHS 90×90×5 | 2,50 | 56 | 140,0 | 13,0 | 1.820 |
| Montanți FR- | SHS 70×70×4 | 1,50 (medie) | 42 (6 montanți×7 ferme) | 63,0 | 8,1 | 510 |
| PN-F/G (zone marginale) | Z 200×2,5 | 6,00 | 44 | 264,0 | 6,9 | 1.822 |
| PN-H/I (zone curente) | Z 200×2,0 | 6,00 | 88 | 528,0 | 5,5 | 2.904 |
| GP-A (colț pereți) | Z 180×2,5 | 6,00 | 20 | 120,0 | 6,2 | 744 |
| GP-B/D/E (curent) | Z 180×2,0 | 6,00 | 60 | 360,0 | 5,0 | 1.800 |
| CV- (verticale) | SHS 100×100×6 | 5,20 (2 tronsoane/diagonală) | 16 (4 diagonale×2 tronsoane×2 pereți) | 83,2 | 17,7 | 1.472 |
| CO- (orizontale acoperiș) | L 60×60×6 | 7,80 (diagonală medie) | 18 | 140,4 | 5,42 | 761 |
| SR- (Ø12) | rotund Ø12 | 3,50 (mediu) | 88 | 308,0 | 0,89 | 274 |
| **TOTAL oțel laminat/sudat (fără șuruburi/sudură/table secundare)** | | | | | | **≈ 24.456 kg ≈ 24,5 t** |

Indice de consum: `24.456 kg / (Sc,Corp B ≈ 693 m²) = 35,3 kg/m²` — valoare coerentă cu intervalul orientativ pentru ferme metalice cu zăbrele la deschideri de 20-25 m, fără pod rulant și cu acoperiș ușor din panouri sandwich (interval uzual 30-40 kg/m² pentru structura principală + secundară, conform practicii curente de proiectare a structurilor metalice ușoare, coerent și cu observația comparativă din DTAC cap. 2.3 privind economia de masă a soluției cu zăbrele față de betonul precomprimat).

## PTh-S.7.3 Extras șuruburi de înaltă rezistență și curente

| Utilizare | Tip | Nr. seturi | Observație |
|---|---|---|---|
| Noduri fermă (talpă-diagonală-montant, guseu) | M20 gr. 8.8 HR | 7 ferme × 12 noduri × 4 buc = 336 | pretensionate, metoda combinată |
| Reazeme fermă pe stâlp (fix) | M24 gr. 8.8, pretensionate | 7×4 = 28 | placă de bază sudată la talpa inferioară a fermei |
| Reazeme fermă pe stâlp (mobil) | M24 gr. 8.8 în gaură alungită (slotted) | 7×4 = 28 | permite dilatare termică liberă |
| Îmbinări curente pane-fermă, rigle perete-stâlp fronton | M12 gr. 8.8 | ≈ 620 | 2 buc/reazem × 310 reazeme |
| Îmbinări contravântuiri verticale (gusset) | M16 gr. 8.8 | ≈ 64 | 16 noduri × 4 buc |
| Buloane de ancoraj plăci de bază ferme (în stâlpul de beton) | M24 gr. 8.8, hef=400 mm | 4×14 = 56 | conform PTh-S.8.4 |

## PTh-S.7.4 Consum de sudură și protecție anticorozivă/la foc

| Sistem | Suprafață/lungime | Consum |
|---|---|---|
| Sudură noduri fermă (uzină, cordon a=5-6mm) | ≈ 7 ferme × 12 noduri × 0,60 m cordon = 50,4 m | ≈ 55 kg electrod echivalent |
| Sudură plăci de bază/reazem la tălpi | 14 reazeme × 1,60 m cordon = 22,4 m | ≈ 30 kg |
| Grund epoxidic zincat (60 µm) | ≈ 1.150 m² (toată structura metalică, ambele fețe profile) | ≈ 175 L |
| Strat intermediar + finisaj poliuretanic | 1.150 m² | ≈ 290 L |
| Vopsea intumescentă (ferme + stâlpii metalici de fronton, dacă expuse vizual în sala de sport, R60-R120 conform PTh-S.16) | ≈ 620 m² (fețele expuse ale fermelor și contravântuirilor vizibile) | ≈ 480 kg (uscat) |

---

# PTh-S.8 — DETALIILE DE ÎMBINARE ALE STRUCTURII METALICE — METODA COMPONENTELOR

## PTh-S.8.1 Nodul de fermă (talpă-diagonală-montant) — configurație cu guseu

Nodurile fermei se realizează în uzină, prin sudarea unei **plăci de guseu** (gusset plate, S355, grosime 12 mm) la talpa (superioară sau inferioară, funcție de poziția nodului), pe care se prind, prin șuruburi M20 gr. 8.8 pretensionate, capetele aplatizate ale diagonalelor și montanților convergenți. Verificarea guseului la nodul cel mai solicitat (panoul 1, diagonală comprimată N=312 kN, PTh-S.3.5):

Lățimea efectivă Whitmore (unghi de dispersie 30° de la fiecare șurub extrem, pentru 2 șuruburi M20 pe rând, distanță 2×60=120 mm): `Wwhitmore ≈ 220 mm`. Verificare la flambaj a plăcii de guseu pe lungimea liberă (metoda Thornton, `Lgusset ≈ 120 mm`, grosime 12 mm):

`I = 220×12³/12 = 31.680 mm⁴`; `Ncr = π²×210.000×31.680/120² = 45.640.000 N = 45.640 kN ≫ 312 kN` → **verificat**, guseu necritic la flambaj local (grosime adecvată, marjă foarte amplă, tipică pentru guseele de la ferme cu zăbrele ușoare).

Verificarea secțiunii nete a diagonalei comprimate la capătul aplatizat (2 găuri M20, Ø22): `Anet = A-2·t·d0 = 1.660-2×5×22 = 1.440 mm²`; `Nu,Rd = 0,9×1.440×490/1,25×10⁻³ = 508 kN ≥ 312 kN` → **verificat**, utilizare 61%.

## PTh-S.8.2 Reazemul fix al fermei pe stâlp

Reazemul fix (adoptat la un capăt al fiecărei ferme, celălalt fiind mobil, cf. principiul stabilit în DTAC cap. 2.3/9.6) se realizează prin **placă de bază sudată la talpa inferioară a fermei** (300×300×20 mm, S355), fixată pe stâlpul de beton prin 4 buloane de ancoraj M24 gr. 8.8, `hef = 400 mm`, înglobate în stâlp la execuția cofrajului/armării acestuia (cap. PTh-S.9). Verificarea la forfecare a buloanelor (transmiterea reacțiunii orizontale seismice de la fermă la stâlp, componenta longitudinală a fermei rezultată din analiza seismică a Corpului B, cap. 7.7 DTAC):

`VEd,reazem ≈ 45 kN` (per reazem fix, din distribuția forței seismice orizontale pe direcția longitudinală a Corpului B, preluată de contravântuirile verticale CV- + o fracțiune reziduală transmisă prin reazemele fixe ale fermelor). Rezistența la forfecare a unui bulon M24 gr. 8.8: `Fv,Rd = 0,6×800×353/1,25×10⁻³ = 135,6 kN/bulon` → `4×135,6=542,4 kN ≫ 45 kN` → **verificat**, marjă foarte amplă (reazemul e guvernat de ancorarea în beton, nu de rezistența buloanelor înseși).

Verificarea la extragere din beton (pull-out, conform CEN/TS 1992-4, relevantă pentru verificarea la sucțiunea vântului, cap. 6.4/8.7 DTAC, unde reazemul poate fi solicitat la tracțiune): `NEd,tracțiune ≈ 38 kN` (componenta netă de ridicare la reazemul fix, din combinația de vânt cu greutate proprie minimă). Rezistența la extragere a unui grup de 4 buloane M24 cu `hef=400 mm` în beton C25/30 (metoda con de rupere, CEN/TS 1992-4): `NRk,c ≈ 210 kN` per grup, redusă cu factorul de siguranță parțial `γMc=1,8`: `NRd,c = 210/1,8 = 116,7 kN ≥ 38 kN` → **verificat**, utilizare 33%.

## PTh-S.8.3 Reazemul mobil al fermei pe stâlp

Reazemul mobil se realizează prin **placă de bază identică geometric** (300×300×20 mm), dar cu **găuri alungite (slotted holes)** pe direcția longitudinală a fermei, dimensionate pentru a permite deplasarea liberă din dilatare termică: `ΔL = α·ΔT·L/2 = 12×10⁻⁶×35×21.000/2 = 4,41 mm` (pentru o variație de temperatură de calcul ΔT=±35°C, jumătate din dilatarea totală a fermei fiind absorbită la fiecare reazem, celălalt fiind fix). Lungimea găurii alungite adoptată: `Lgaură = Øgaură,normal + 2×ΔL + marjă execuție = 26+2×4,41+10 ≈ 45 mm` (gaură alungită 26×45 mm pentru buloane M24).

Reazemul mobil trebuie, conform principiului stabilit în DTAC (cap. 6.4/8.7), să rămână capabil să transmită o **reacțiune de tracțiune** dacă rezultanta încărcărilor devine negativă (sucțiune vânt) — condiție satisfăcută prin buloanele de ancoraj (identice cu cele ale reazemului fix, verificate la PTh-S.8.2), care rămân active la tracțiune independent de libertatea de deplasare longitudinală asigurată de gaura alungită (mecanismul de culisare este liber doar pe direcția longitudinală a fermei, nu pe direcția verticală).

## PTh-S.8.4 Prinderea panelor și rigidizarea la sucțiune

Panele (PN-F/G, PN-H/I) se prind pe tălpile superioare ale fermelor prin cleme/șuruburi autoforante, cu **sag-rods** (SR-, Ø12) la interax de 1/2 din deschiderea panei (3,00 m), conform verificării la flambaj distorsional al tălpii libere sub sucțiune (analog metodologiei detaliate integral în `hala-industriala/structura-pth.md` §PTh-R.2.8, aplicabilă identic aici, cu diferențierea pe zone F/G (marginale, sucțiune maximă) și H/I (curente)):

| Zonă acoperiș | cpe (sucțiune) | wnet [kN/m²] | Profil adoptat | Sag-rods necesari |
|---|---|---|---|---|
| F/G (margine, lățime 4,0 m de la streașină/fronton) | -1,50 | -1,80 | Z 200×2,5 | 1 rând (mijloc deschidere) |
| H/I (curent) | -0,70 | -0,95 | Z 200×2,0 | constructiv (fără sag-rod obligatoriu la interax 1,75m) |

---

# PTh-S.9 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII DE BETON ARMAT (CORP A + INFRASTRUCTURA CORPULUI B)

## PTh-S.9.1 Succesiunea generală de execuție

1. **Trasarea axelor** pe amplasament (control topografic, vizat OCPI, cu marcarea vizibilă și protejată a axelor de referință pentru toată durata execuției infrastructurii).
2. **Săpătura generală și locală**, cu verificarea naturii terenului la cota de fundare (Df=-1,50 m) prin confruntare directă cu studiul geotehnic (faza determinantă FD1, PTh-S.12) — condiție obligatorie înainte de betonarea stratului de egalizare.
3. **Stratul de egalizare** (beton C8/10, 10 cm) pe toată suprafața fundațiilor, ambele corpuri.
4. **Cofrarea și armarea fundațiilor** (izolate, continue, grinzi de fundare), cu montarea buloanelor de ancoraj pentru reazemele fermelor (Corp B) în șabloane rigide, verificate topografic ÎNAINTE de betonare (fază determinantă FD2).
5. **Betonarea infrastructurii**, cu respectarea separatorului la rostul antiseismic (cap. PTh-S.4.4) — cele două corpuri se betonează în operații distincte, nu simultan pe aceeași cuvă de beton.
6. **Elevații fundații + socluri**, cu hidroizolații (cap. PTh-S.5.7).
7. **Suprastructura Corp A**, nivel cu nivel (parter → etaj 1 → etaj 2): cofrare stâlpi/pereți → armare → betonare stâlpi/pereți → cofrare planșeu/grinzi → armare → betonare planșeu/grinzi → decofrare la termenul stabilit prin calculul de rezistență la decofrare (nu doar la un termen calendaristic fix).
8. **Suprastructura Corp B** — stâlpii de 60×60 cm se execută în paralel cu infrastructura, înainte de montarea structurii metalice (cap. PTh-S.10).

## PTh-S.9.2 Cofrarea — cerințe specifice elementelor disipative

Cofrajele stâlpilor și pereților structurali (elemente disipative DCM) se realizează cu **toleranțe de verticalitate ±5 mm/3,60 m** (mai strict decât toleranța generică de execuție pentru elemente nedisipative), verificate cu nivelă laser înainte de betonare. La bulbii pereților structurali (PTh-S.2.6), cofrajul trebuie să permită accesul pentru vibrarea corectă a betonului în zona dens armată de la extremitățile secțiunii (8Ø25 + etrieri Ø10/80) — se prevăd, dacă e necesar, ferestre de vibrare temporare în cofraj, obturate înainte de finalizarea betonării panoului respectiv.

## PTh-S.9.3 Armarea — control al poziționării în zonele critice

La stâlpi, poziționarea corectă a etrierilor majorați de nod (Ø12/80, PTh-S.2.9) se asigură prin distanțiere rigide (nu doar prin legare manuală cu sârmă, practică insuficientă pentru a garanta interaxul de 80 mm pe toată zona critică de 60 cm). La grinzi, cele minimum 2 bare continue la partea superioară și inferioară (cerință de redundanță, cap. 9.1 DTAC) se pozitionează și se ancorează la noduri prin bare cu cârlige la 90° (nodurile marginale), verificate vizual înainte de betonare — control obligatoriu inclus în planul de control al calității (PTh-S.11).

## PTh-S.9.4 Planurile de execuție — conținutul setului de planșe de rezistență faza PTh

| Cod planșă | Denumire | Conținut |
|---|---|---|
| S01 | Plan general fundații — trasare, ambele corpuri + rost antiseismic | Axe, cote de fundare, poziția rostului de 12 cm |
| S02 | Plan fundații Corp A — cofraj/armare | Toate cele 34+4 fundații izolate, 3 tronsoane continue, grinzi de fundare |
| S03 | Plan fundații Corp B — cofraj/armare + șabloane buloane ancoraj ferme | 14 fundații izolate, grinzi de legătură, poziții exacte buloane |
| S04 | Plan cofraj/armare — parter, Corp A | Stâlpi, pereți, grinzi, planșeu, pe grila de la PTh-S.2.1 |
| S05 | Plan cofraj/armare — etaj 1, Corp A | idem, identic parterului (regularitate în elevație) |
| S06 | Plan cofraj/armare — etaj 2 + terasă, Corp A | idem, cu detaliul de atic/parapet |
| S07 | Detaliu bulb perete structural (PS-CAP, PS-NUC) | Armare 8Ø25/bulb, etrieri Ø10/80, secțiune tip |
| S08 | Detaliu nod grindă-stâlp (curent și marginal) | Etrieri Ø10/100 vs. Ø12/80, ancorare bare la nod marginal |
| S09 | Detaliu rost antiseismic — plan și secțiune | Alcătuire pe toate zonele (infrastructură/elevație/pardoseală/fațadă/acoperiș, PTh-S.4.2) |
| S10 | Plan montaj structură metalică Corp B | Poziții FR-, ST-B-, coordonate axe (PTh-S.3.1) |
| S11 | Detaliu nod fermă + reazem fix/mobil | Guseu, plăci de bază, buloane de ancoraj, găuri alungite |
| S12 | Extras cantitativ centralizator (caiet de armare + extras oțel structural) | Tabelele PTh-S.6 și PTh-S.7 |

---

# PTh-S.10 — TEHNOLOGIA DE EXECUȚIE ȘI MONTAJUL STRUCTURII METALICE A CORPULUI B

## PTh-S.10.1 Execuția în atelier

Fermele metalice (FR-01…FR-07) se asamblează și se sudează integral **în atelier**, pe standuri cu opritoare (jigs) care mențin geometria triunghiulară a zăbrelei și paralelismul celor două tălpi pe toată lungimea de 21,00 m. Debitarea tălpilor (RHS 200×100×8) și a diagonalelor (SHS 90×90×5) se realizează prin plasmă/laser CNC, cu pregătirea capetelor aplatizate (flattened ends) ale diagonalelor pentru prinderea pe guseu, conform detaliului PTh-S.8.1. Sudarea nodurilor (guseu-talpă, guseu-diagonală) se execută cu cordoane de colț a=5-6 mm, controlate vizual 100% și prin sondaj cu lichide penetrante la nodurile cele mai solicitate (panourile 1 și 2 de la fiecare capăt, cf. PTh-S.3.5), conform **SR EN ISO 5817**, nivel de calitate C pentru cordoanele curente. Calificarea procedeelor de sudare (WPQR, **SR EN ISO 15614-1**) și a sudorilor (**SR EN ISO 9606-1**) se documentează înainte de începerea producției de serie a celor 7 ferme.

**Contra-săgeata de fabricație:** ferma se asamblează cu o curbură ușoară inversă, egală cu săgeata calculată sub încărcarea permanentă plus 50% din zăpadă (coerent cu practica descrisă în DTAC cap. 8.7 și confirmată numeric aici): săgeata SLS calculată la ferma curentă este de ordinul `L/300 = 70 mm` (cap. 8.7 DTAC); contra-săgeata de montaj adoptată: **≈ 42 mm** (60% din valoarea calculată, practică uzuală care evită supra-corecția vizuală, identică rațiunii aplicate la rigla halei industriale, `hala-industriala/structura-pth.md` §PTh-R.5.1).

## PTh-S.10.2 Vopsirea în atelier

Sablare Sa 2½ pe toată suprafața accesibilă, urmată de grund epoxidic zincat (60 µm), aplicate integral în atelier, înainte de expediere. Zonele expuse vizual în sala de sport (fețele inferioare ale fermelor, vizibile de la nivelul terenului de joc, conform deciziei arhitecturale de a păstra vizibilă structura metalică, cap. 11.3 DTAC) primesc finisajul poliuretanic complet în atelier, pentru a asigura o calitate estetică uniformă, dificil de replicat la aceeași calitate pe șantier. Vopseaua intumescentă (cap. PTh-S.16) se aplică, de regulă, tot în atelier, pe elementele prefabricate, cu retuș la fața locului doar la zonele de îmbinare de montaj.

## PTh-S.10.3 Transportul

Fermele complete de 21,00 m depășesc gabaritul de transport rutier curent (13,5-16,5 m util pe trailer standard) — se prevede, similar practicii de la structuri de deschidere mare (cf. `hala-industriala/structura-pth.md` §PTh-R.4.4, unde se detaliază integral rațiunea unei asemenea înnădiri), o **înnădire de transport la mijlocul deschiderii** (la 10,50 m de la fiecare reazem, zonă de moment redus pe zăbrea — ultimul panou simetric, cf. PTh-S.3.5, unde eforturile axiale sunt cele mai mici din toată ferma), realizată prin **placă de capăt înșurubată** pe tălpi (M20 gr. 8.8 pretensionate, 4 rânduri×2=8 șuruburi/talpă) și prin eclise pe diagonalele/montanții din zona de îmbinare. Fiecare fermă se transportă astfel în **2 tronsoane de câte 10,50 m**, marcate individual (FR-0Xa / FR-0Xb) și asamblate final la sol, pe șantier, înainte de ridicare.

## PTh-S.10.4 Montajul (erecția) — secvența

1. **Trasarea axelor** pe fundațiile finalizate ale Corpului B (control topografic, verificare poziție buloane de ancoraj față de planul de montaj, toleranță ±10 mm, **SR EN 1090-2** Anexa B).
2. **Asamblarea la sol** a celor 2 tronsoane ale fiecărei ferme (îmbinare de transport, PTh-S.10.3), pe o platformă nivelată, cu verificarea geometriei finale (lungime totală, contra-săgeată) înainte de ridicare.
3. **Ridicarea primei ferme** (axa 1, de fronton) cu 2 macarale mobile sincronizate (o fermă de 21,00 m, deși ușoară ca masă totală, necesită ridicare controlată la cele două puncte de reazem pentru a evita torsionarea/flambajul lateral în timpul manevrei), fixare provizorie pe buloanele de ancoraj ale stâlpilor, cu **contravântuire provizorie imediată** (cabluri temporare de la creasta fermei către sol/stâlpi adiacenți) — ferma izolată, fără contravântuirile orizontale de acoperiș montate, este instabilă la răsturnare laterală.
4. **Montarea contravântuirilor verticale** (CV-, în pereții longitudinali adiacenți fermei 1) imediat după fixarea primei ferme, pentru stabilizarea de ansamblu a primului cadru transversal.
5. **Ridicarea succesivă a fermelor 2…7**, cu montarea **contravântuirilor orizontale de acoperiș** (CO-) și a panelor progresiv, cadru cu cadru — **nu se montează mai mult de 2 ferme succesive fără contravântuire orizontală provizorie**, regulă identică celei aplicate structurilor metalice de deschidere mare (`hala-industriala/structura-pth.md` §PTh-R.5.4).
6. **Definitivarea reazemelor** (strângerea finală a buloanelor la reazemul fix, verificarea liberă a culisării la reazemul mobil) după montarea completă a contravântuirilor definitive.
7. **Montarea panelor, sag-rods, rigle de perete** și, ultimă etapă, **panourile de învelitoare/pereți sandwich**.

## PTh-S.10.5 Plan de contravântuire provizorie

Se întocmește, semnat de inginerul structurist, un **plan de contravântuire provizorie** care identifică punctele de ancorare a cablurilor temporare, secvența minimă admisă de montaj fără contravântuire completă și responsabilitatea explicită a antreprenorului de montaj pentru stabilitatea structurii pe parcursul erecției — condiție cu atât mai importantă la Corp B, unde fermele ușoare, izolate, au o rigiditate laterală proprie redusă înainte de completarea sistemului de contravântuiri definitive.

## PTh-S.10.6 Toleranțe de montaj

| Element | Toleranță | Metodă de control |
|---|---|---|
| Poziție bulon de ancoraj (plan) | ±10 mm | șablon de montaj fixat înainte de betonare |
| Verticalitate stâlp beton | h/500, ≤20 mm | teodolit/nivelă laser |
| Poziție reazem fermă (cotă) | ±5 mm | nivelment optic |
| Săgeata montată vs. calculată | ±10% din contra-săgeata adoptată | fir/laser, la finalizarea montajului fiecărei ferme |
| Aliniamentul general al fermelor pe lungimea de 33,00 m | L/1000 | control topografic pe toată lungimea |

---

# PTh-S.11 — PLANUL DE CONTROL AL CALITĂȚII

## PTh-S.11.1 Controlul betonului (Corp A + infrastructura Corpului B)

- Consistență la fiecare transport, 100%.
- Rezistență la compresiune: 1 set de 3 cuburi/50 mc SAU/element important (stâlpi/pereți structurali, individual), conform **NE 012-2/2010**.
- Probe de decofrare la elementele disipative (stâlpi, pereți, grinzi), înainte de îndepărtarea sprijinelor.
- Verificarea acoperirii cu beton a armăturii (cnom=25-35 mm, cap. 9.5 DTAC), prin măsurare cu distanțiere calibrate înainte de betonare + control cu pahametru (cover-meter) după decofrare, pe eșantion.

## PTh-S.11.2 Controlul armăturii

- Certificat de calitate 3.1 pentru fiecare lot de oțel-beton BST500 clasa C, cu verificarea alungirii la rupere (εuk≥7,5%, condiție de ductilitate obligatorie în zonele disipative, cap. 10 DTAC).
- Control dimensional și de poziționare (diametre, interax etrieri, lungimi de ancorare/suprapunere) înainte de betonare, la fiecare element, cu accent explicit pe zonele critice (etrieri majorați Ø12/80 la noduri, PTh-S.2.9; bulbi pereți, PTh-S.2.6).
- Verificarea sudurii armăturii (dacă se utilizează înnădiri sudate la bare de diametru mare, Ø25 la bulbi) conform **SR EN ISO 17660**.

## PTh-S.11.3 Controlul structurii metalice (Corp B)

| Categorie îmbinare | Nivel calitate (SR EN ISO 5817) | Control vizual | Control volumetric |
|---|---|---|---|
| Cordoane de colț noduri fermă (guseu-talpă/diagonală) | C | 100% | sondaj PL la nodurile panourilor 1-2 |
| Sudură placă de bază-talpă fermă (reazeme) | C | 100% | 10% UT |
| Îmbinări de transport (fermă, PTh-S.10.3) | — | — (îmbinare înșurubată, control șuruburi) | — |

- Certificat 3.1 pentru toate profilele S355, cu trasabilitate marcă-certificat.
- Control pretensionare șuruburi HR (metoda combinată, **SR EN 1090-2** §8.5.3): 100% vizual + 10% verificare instrumentală prin sondaj.
- Măsurarea grosimii peliculei de vopsea (DFT), criteriu 80/20, minimum 10 măsurători/element reprezentativ.

## PTh-S.11.4 Controlul rostului antiseismic

Verificarea lățimii rostului (12 cm ±5 mm) la fiecare etapă de betonare a ambelor corpuri, cu șablon calibrat, consemnată în procesul-verbal de fază determinantă corespunzător (PTh-S.12); verificarea continuității elementului compresibil pe toată înălțimea (absența întreruperilor sau a punților rigide accidentale) la finalizarea structurii ambelor corpuri, înainte de aplicarea finisajelor care ar ascunde vizual eventuale defecte de execuție.

---

# PTh-S.12 — FAZELE DETERMINANTE

| Nr. | Faza determinantă | Verificări/criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare (ambele corpuri, toate cele 34+4+3+14 fundații) | Confruntare cu studiul geotehnic; pconv=250 kPa confirmată; cota Df=-1,50 m | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Armare/betonare fundații + grinzi de fundare (înainte de betonare) | Diametre, poziții, acoperire, poziționarea șabloanelor buloanelor de ancoraj ale fermelor (Corp B) | Proiectant, diriginte, constructor, ISC |
| FD3 | Trasarea și execuția rostului antiseismic (fiecare etapă de betonare) | Lățime 12 cm ±5 mm, continuitate element compresibil, absența punților rigide | Proiectant, diriginte, constructor, ISC |
| FD4 | Armare/betonare stâlpi și pereți structurali, pe fiecare nivel al Corpului A | Poziționare etrieri majorați de nod, armare bulbi, acoperire, verticalitate cofraje | Proiectant, diriginte, constructor, ISC |
| FD5 | Recepția structurii metalice (ferme) la sosirea pe șantier | Corespondența reperelor, integritatea vopselei, certificate de material/sudură din atelier | Proiectant, diriginte, constructor |
| FD6 | Montajul structurii metalice a Corpului B (înainte de montarea panelor/anvelopei) | Verticalitate stâlpi, contravântuiri definitive montate INTEGRAL înainte de îndepărtarea sprijinelor provizorii | Proiectant, diriginte, constructor, ISC |
| FD7 | Recepția sistemului de protecție anticorozivă/la foc (ambele corpuri) | DFT conform, aderență, certificate reacție la foc pentru vopseaua intumescentă | Proiectant, diriginte, constructor |
| FD8 | Structura la roșu finalizată (ambele corpuri + rost) | Conformitate geometrică, absența defectelor vizibile, toate rapoartele END/PVLA arhivate | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte, întocmirea procesului-verbal (condiție pentru autorizarea continuării lucrărilor). Neîndeplinirea criteriilor blochează avansul până la remediere și reverificare.

---

# PTh-S.13 — PROGRAMUL DE URMĂRIRE ÎN TIMP + MONITORIZAREA SPECIFICĂ A ROSTULUI SEISMIC

## PTh-S.13.1 Urmărirea curentă (P130/1999)

Urmărire vizuală anuală (și după evenimente deosebite: cutremur > V MSK, vânt excepțional, incendiu) a integrității structurii ambelor corpuri: fisurarea betonului (stâlpi, pereți, grinzi), starea vopselei anticorozive a structurii metalice (baza stâlpilor de susținere a fermelor, punctele de scurgere a apelor pluviale), coroziunea galvanică la reazemele fermelor (contactul oțel-beton), starea profilelor de dilatație vizibile la rost. Se consemnează în **Jurnalul evenimentelor** din Cartea Tehnică a construcției.

## PTh-S.13.2 Monitorizarea specifică a rostului antiseismic

- **Verificare vizuală semestrială** a lățimii rostului la punctele accesibile (pardoseală, fațadă), cu marcaj de referință aplicat la recepție, pentru a detecta orice reducere anormală a lățimii (ar indica o tasare diferențială neprevăzută între cele două corpuri sau o mișcare seismică deja resimțită, care justifică o inspecție structurală extinsă).
- **Inspecție obligatorie post-seismică** (cutremur cu intensitate resimțită ≥ V MSK în zonă): verificarea integrității elementului compresibil, a profilelor de dilatație și a absenței oricărui semn de impact (pounding) la interfața dintre corpuri — dacă se constată contact/impact, se declanșează o expertiză tehnică extinsă, dat fiind că un impact real ar indica o eroare de dimensionare sau de execuție a rostului, cu implicații asupra ambelor structuri adiacente.

## PTh-S.13.3 Monitorizarea tasărilor

Mărci de tasare pe minimum 8 fundații reprezentative ale Corpului A (colțuri, mijlocul laturilor lungi, baza pereților structurali) + 4 mărci pe fundațiile Corpului B (colțuri). Frecvență: la fiecare etapă de betonare a suprastructurii, apoi la 1/3/6/12 luni după finalizare, apoi anual până la stabilizare (Δs<2 mm/an). Criteriu de alarmare: tasare diferențială Δs/L>1/500 între fundații adiacente (confirmă/infirmă marja calculată la PTh-S.5.7, Δs/L=1/1.500).

---

# PTh-S.14 — IPOTEZELE MODELULUI DE CALCUL CU ELEMENTE FINITE + VALIDARE

## PTh-S.14.1 Ipoteze de modelare — Corp A

Model spațial 3D din elemente de tip bară (stâlpi, grinzi) și elemente placă (planșee, pereți structurali — modelați ca elemente shell, nu ca bare echivalente, pentru a capta corect comportarea la torsiune de secțiune deschisă a nucleului în U, PTh-S.2.7). Rezemări: încastrare la baza tuturor stâlpilor și pereților (infrastructură rigidă, ipoteză confirmată de grătarul de grinzi de fundare, PTh-S.5.5). Diafragma orizontală (planșeul de 15 cm) modelată ca șaibă rigidă în plan, cu excentricitate accidentală de ±5% din dimensiunea planului aplicată la fiecare nivel, conform §4.4.2 P100-1/2013. Analiza seismică: modală cu spectre de răspuns, spectru elastic redus cu q=3,50, completată de verificare prin metoda forțelor laterale echivalente (structură regulată, T1<4Tc, cap. 3.4/7.1 DTAC).

## PTh-S.14.2 Ipoteze de modelare — Corp B

Model spațial din elemente de tip bară pentru toate componentele (stâlpi, tălpi/diagonale/montanți de fermă, pane, contravântuiri). Contravântuirile verticale (CV-) modelate ca elemente „tension-only" (active doar în tracțiune), conform ipotezei de calcul cu diagonale întinse disipative (cap. 7.1/9.6 DTAC). Mase concentrate la nivelul acoperișului (cota fermelor), din greutatea proprie a structurii metalice + învelitoare + fracțiunea cvasipermanentă a zăpezii. Rezemări: încastrare la baza stâlpilor de beton (mecanism principal de rigidizare pe direcția transversală a fermelor, cap. 4.2/5.3 DTAC).

## PTh-S.14.3 Validarea modelului

**Verificarea maselor Corp A** (recapitulare cu valorile actualizate din caietul de armare, PTh-S.6): greutatea seismică totală calculată din model, `G≈19.900 kN` (confirmă valoarea din DTAC cap. 7.4, structura de beton armat neavând corecții semnificative de masă la trecerea DTAC→PTh, spre diferență de structurile metalice unde greutatea reală din extrasul de materiale poate diferi sensibil de estimarea generică inițială — v. observația analogă din `hala-industriala/structura-pth.md` §PTh-R.9.2).

**Verificarea maselor Corp B**: greutatea structurii metalice, recalculată din extrasul de materiale (PTh-S.7.2, ≈24,5 t), plus panouri sandwich și instalații suspendate, conduce la o greutate seismică totală `G,B ≈ 890 kN` — valoare comparabilă cu estimarea implicită din DTAC (masă redusă la acoperiș, cap. 2.3/6.1 DTAC), fără corecții majore necesare.

**Participarea maselor modale**: se cere ≥90% din masa totală pe fiecare direcție orizontală, în modurile reținute, condiție verificată în raportul de calcul EF final pentru fiecare corp (structuri regulate, cu mod fundamental dominant, cap. 3.4 DTAC).

---

# PTh-S.15 — VERIFICĂRI SUPLIMENTARE LA SLS

## PTh-S.15.1 Vibrațiile planșeului Corpului A (confort la utilizare, săli de clasă și coridoare)

Planșeele de 15 cm cu deschideri de 6,00-7,20 m pot fi sensibile la vibrații induse de mers, verificare neimpusă explicit de DTAC (care a verificat doar rezistența și săgeata SLS a plăcii, cap. 8.5 DTAC). Frecvența proprie a planșeului (metodă simplificată, placă rezemată pe contur, cu săgeata instantanee sub greutate proprie + o cotă din utilă `δ≈6 mm`, deschidere 7,20 m):

`f1 = 18/√δ = 18/√6 = 18/2,45 = 7,35 Hz`

Pentru clasificarea „săli de clasă" (categorie de utilizare comparabilă cu birourile, activitate relativ statică cu momente de mișcare colectivă la schimbarea orelor), limita minimă recomandată este `f1≥4,5 Hz` → **7,35>4,5 → verificat, confort acceptabil**. La coridoare (deschidere 6,00 m, dar cu potențial de aglomerare ritmică la evacuare/schimbarea orelor, risc de rezonanță cu pasul de mers colectiv sincronizat, fenomen documentat la punți pietonale și coridoare aglomerate), se recomandă o marjă suplimentară — verificarea la deschiderea de 6,00 m (`δ≈4,5 mm`, planșeu mai rigid): `f1=18/√4,5=8,49 Hz`, cu marjă confortabilă față de intervalul critic de rezonanță cu pasul uman (1,6-2,4 Hz și primele armonici până la ≈4,8 Hz) → **verificat**, fără risc de rezonanță cu mersul sincronizat al elevilor.

## PTh-S.15.2 Contra-săgeți de fabricație — tabel sinteză

| Element | Săgeată SLS calculată | Contra-săgeată adoptată |
|---|---|---|
| Fermă metalică curentă (21,00 m) | 70 mm (L/300, cap. 8.7 DTAC) | 42 mm (60% din săgeata sub G+zăpadă completă) |
| Grinda A-B (Corp A, 7,20 m) | ≈8 mm (L/900, sub SR EN 1992-1-1) | fără camber (valoare mică, sub prag practic 15 mm) |
| Grinda B-C (Corp A, 6,00 m) | ≈5 mm | fără camber |

## PTh-S.15.3 Verificarea oboselii la reazemele fermelor (cicluri termice și de utilizare)

Reazemele mobile (PTh-S.8.3) sunt solicitate ciclic de dilatarea termică zilnică/sezonieră a fermei metalice (nu de un mecanism de utilizare intensivă precum un pod rulant, spre diferență de referința `hala-industriala/structura-pth.md` §PTh-R.2.4/PTh-R.10.2, unde oboseala guvernează la un număr mare de cicluri de operare industrială). Numărul de cicluri termice semnificative pe durata de viață proiectată (50 de ani, ≈1 ciclu complet/zi cu amplitudine relevantă) este de ordinul `1,8×10⁴` cicluri — mult sub pragul la care oboseala ar guverna dimensionarea unei îmbinări înșurubate cu găuri alungite (mecanism care, prin natura sa, nu concentrează tensiuni ciclice semnificative în materialul de bază, spre diferență de o sudură categorie de detaliu redusă). **Concluzie**: verificarea la oboseală nu este guvernantă pentru reazemele fermelor Corpului B, spre diferență de structurile cu pod rulant (unde oboseala la consolele căii de rulare este, de regulă, verificarea critică); se menționează aici explicit tocmai pentru a documenta onest că a fost analizată și exclusă motivat, nu omisă din neatenție.

## PTh-S.15.4 Verificarea SLS a splice-ului de transport al fermei

Îmbinarea de transport (PTh-S.10.3), realizată cu șuruburi HR pretensionate categorie de rezistență la lunecare B (**SR EN 1993-1-8** §3.9), nu introduce lunecare relevantă la SLS (frecția μ≥0,5 pe suprafețe clasa A blochează deplasarea relativă sub sarcinile de serviciu) → **splice-ul se comportă rigid la SLS, fără corecție suplimentară a săgeții calculate pentru ferma continuă** — concluzie identică celei stabilite pentru rigla halei industriale de referință.

---

# PTh-S.16 — CALCULUL LA FOC DETALIAT, PE TOATE ELEMENTELE

## PTh-S.16.1 Confirmarea gradului II de rezistență la foc pe toate elementele Corpului A

DTAC a stabilit cerințele generale (R120 stâlpi/pereți/grinzi, REI90 planșee, cap. 11.1 DTAC). Faza PTh confirmă, prin metoda tabelară **SR EN 1992-1-2**, satisfacerea acestor cerințe pe secțiunile definitive adoptate la grila de axe (PTh-S.2):

| Element | Secțiune | Acoperire cnom | Cerință | Verificare tabelară (SR EN 1992-1-2, tab. 5.2a/5.4/5.8) |
|---|---|---|---|---|
| Stâlp curent 50×50 | b=500 mm | 35 mm | R120 | bmin(R120)=350 mm ≤ 500 mm → ✓, marjă amplă |
| Stâlp colț 55×55 | b=550 mm | 35 mm | R120 | idem, ✓ |
| Perete structural 20 cm | b=200 mm | 25 mm | REI120 (adoptat, acoperitor față de R120 cerut) | bmin(REI120, μfi=0,7)=140 mm ≤ 200 mm → ✓ |
| Grindă 30×60 | b=300 mm, a=35mm (axă la armătură) | — | R120 | amin(R120)=35 mm ≤ 35 mm → ✓, la limită, se confirmă acoperirea de proiect fără reducere |
| Planșeu 15 cm | h=150 mm, a=20mm | — | REI90 | hmin(REI90)=120 mm ≤ 150 mm; amin=20mm ≤ 20mm → ✓ |

Toate elementele Corpului A **confirmate** la gradul II de rezistență la foc prin metoda tabelară, fără a necesita protecție suplimentară — consecință directă a proprietății intrinseci a betonului discutată pe larg în DTAC (cap. 11.2).

## PTh-S.16.2 Protecția structurii metalice a Corpului B — dimensionarea grosimii de vopsea intumescentă

DTAC a stabilit principiul (vopsea intumescentă, recomandată pentru păstrarea expresivității arhitecturale a fermelor vizibile, cap. 11.3 DTAC). Faza PTh dimensionează grosimea necesară, funcție de factorul de masivitate `Am/V` al profilelor adoptate (PTh-S.3.3/PTh-S.7.2):

| Profil | Am/V [m⁻¹] | Temperatura critică θcr | Timp până la θcr neprotejat | DFT necesar (orientativ, R60) |
|---|---|---|---|---|
| Talpă RHS 200×100×8 | ≈115 | ≈555°C (μ0≈0,55, grad de utilizare moderat pentru elemente de acoperiș ușor încărcate) | ≈9 minute | 900-1.100 µm |
| Diagonală SHS 90×90×5 | ≈178 (secțiune mai zveltă, expusă pe 4 fețe) | ≈560°C | ≈6 minute | 1.200-1.500 µm |
| Montant SHS 70×70×4 | ≈205 | ≈565°C | ≈5 minute | 1.300-1.600 µm |

*(Notă onestă: valorile exacte de grosime a vopselei intumescente sunt specifice fiecărui produs certificat și se preiau din raportul de clasificare la foc al producătorului ales, pentru profilul și factorul de masivitate reale ale elementelor — tabelul de mai sus este orientativ, pe baza intervalelor uzuale pentru sisteme intumescente certificate pentru R60 pe oțel S355; grosimea definitivă se stabilește după alegerea sistemului de vopsire de către antreprenor și se confirmă printr-o notă de calcul separată, anexată la Cartea Tehnică a construcției, conform practicii deja consemnate identic în `hala-industriala/structura-pth.md` §PTh-R.11.2.)*

**Cerința de rezistență la foc a structurii metalice a Corpului B** se stabilește la **R60**, corelată cu scenariul de securitate la incendiu din `instalatii.md` (timpul de evacuare organizată a sălii de sport, care, pentru o sală cu capacitate simultană de o clasă întreagă plus, la evenimente, un număr de spectatori, este dimensionat sub 60 de minute, condiție de bază pentru validarea acestei cerințe) — valoare superioară minimului teoretic care ar rezulta dintr-un calcul strict de timp de evacuare individual, adoptată conservator pentru a acoperi și scenariul de utilizare extinsă a sălii în afara orarului școlar (`general.md` cap. 4.3), unde ocuparea și profilul de utilizatori pot diferi de cel al orelor de curs.

## PTh-S.16.3 Protecția reazemelor și a nodurilor de fermă

Nodurile fermei (guseu, șuruburi) și reazemele pe stâlpii de beton se protejează cu **același sistem și aceeași grosime** ca elementul cel mai masiv adiacent din nod (regulă conservatoare, identică celei aplicate la structura metalică a halei industriale de referință), cu atenție explicită la continuitatea peliculei peste capetele șuruburilor pretensionate și la marginile guseelor, puncte unde factorul de masivitate local diferă sensibil de cel al profilului curent.

## PTh-S.16.4 Corelarea cu evacuarea — confirmare finală

Rezistența la foc R60 a structurii metalice a Corpului B, combinată cu R120/REI90-120 a elementelor Corpului A (natural, prin masa betonului), garantează practicabilitatea traseelor de evacuare pe toată durata evacuării organizate a elevilor, condiție deja discutată la nivel de principiu în DTAC (cap. 11.4) și confirmată aici cu valorile de dimensionare definitive ale grosimilor de protecție. Scenariul cantitativ complet (RSET vs. ASET) rămâne, conform delimitării de conținut stabilite, obiectul exclusiv al `instalatii.md`.

---

# PTh-S.17 — COORDONAREA CU ARHITECTURA ȘI INSTALAȚIILE

## PTh-S.17.1 Coordonarea cu arhitectura

**Grila structurală definitivă** (PTh-S.2.1, PTh-S.3.1) a fost stabilită în corelare cu proiectul de arhitectură (`arhitectura.md`), astfel încât fiecare deschidere structurală să corespundă unei limite reale de compartimentare (perete de sală de clasă, perete de coridor, perete de grup sanitar) — coordonare care evită situația, frecventă la o proiectare necorelată, în care stâlpii de cadru ar cădea în mijlocul unei săli de clasă sau ar bloca un flux de circulație. **Rostul antiseismic** (cap. PTh-S.4) este poziționat exact la limita dintre cele două volume arhitecturale ale ansamblului (holul de legătură, `general.md` cap. 4), fiind tratat de arhitect ca element de compunere volumetrică vizibilă, nu ca o discontinuitate accidentală de ascuns.

**Parapeții și tâmplăria** sălilor de clasă, cu ferestre mari pentru iluminat natural (raport geam/pardoseală 1/4-1/5, `arhitectura.md` cap. 10), se decuplează constructiv de partea superioară a stâlpilor prin rost sau prindere flexibilă, pentru a evita fenomenul de „stâlp scurt" accidental — detaliu stabilit la principiu în DTAC (cap. 3.2) și confirmat aici la faza de execuție prin planurile de tâmplărie corelate cu planurile de cofraj (S04-S06).

**Tribunele mobile, panourile de baschet suspendate și coșurile reglabile** ale sălii de sport (`arhitectura.md`, dotările Corpului B) se ancorează seismic direct de structura de beton armat (stâlpii de 60×60 cm) sau de tălpile inferioare ale fermelor metalice (pentru panourile suspendate central), cu calculul de ancorare a elementelor nestructurale grele conform **P100-1/2013 cap. 10**, dezvoltat la faza de execuție a dotărilor sportive, în corelare cu furnizorul echipamentelor și cu proiectul de arhitectură/dotări.

## PTh-S.17.2 Coordonarea cu instalațiile

**Golurile de instalații** în planșeele Corpului A (coloane verticale sanitare/electrice/ventilare) sunt poziționate, conform practicii curente și confirmate la faza PTh, în afara fâșiilor de rezemare majorate ale planșeului (PTh-S.6.6) și în afara zonelor critice ale grinzilor (PTh-S.2.9) — niciun gol de instalații nu traversează o zonă critică de grindă sau un bulb de perete structural, condiție verificată explicit pe planurile de cofraj (S04-S06) la corelarea cu planurile de instalații (`instalatii.md`).

**Traseele de instalații ale sălii de sport** (ventilare, electrice, sonorizare) folosesc golurile naturale ale zăbrelei fermelor metalice pentru trecerea conductelor/cablurilor (avantaj funcțional identificat deja în DTAC, cap. 2.3) — coordonarea la faza PTh fixează exact prin care panouri ale zăbrelei trec traseele principale, pentru a evita interferența cu contravântuirile de acoperiș (CO-) și cu sag-rods-urile panelor (SR-).

**Ancorarea unităților de ventilare/climatizare** suspendate de planșeul Corpului A sau de structura Corpului B se dimensionează, dacă masa unității depășește pragul care ar necesita o verificare seismică explicită a elementelor nestructurale (conform P100-1/2013 cap. 10), într-o notă de calcul separată, coordonată cu fișele tehnice ale echipamentelor selectate de proiectantul de instalații — aspect semnalat aici ca cerință de coordonare, nu dezvoltat numeric (obiectul `instalatii.md`).

**Rețelele înglobate în placa de pardoseală/fundații** (canalizare, electrice de forță joasă) se poziționează astfel încât să nu traverseze rostul antiseismic fără decuplare — orice conductă care traversează rostul (de exemplu, o rețea comună de canalizare care leagă Corp A de Corp B) se prevede cu un **racord flexibil** dimensionat pentru deplasarea relativă calculată la PTh-S.4.1 (±5,4 cm pe fiecare direcție), detaliu de coordonare obligatoriu, tratat integral în `instalatii.md`, dar semnalat aici ca o condiție structurală care nu poate fi ignorată la faza de execuție a rețelelor.

---

# PTh-S.18 — PROGRAMUL COMPLET DE PROBE ȘI ÎNCERCĂRI

## PTh-S.18.1 Încercări pe materialele de bază

| Control | Frecvență |
|---|---|
| Certificat 3.1 beton (compoziție, clasă, aditivi) | fiecare rețetă/lot furnizor |
| Certificat 3.1 oțel-beton BST500C (Re, Rm, alungire εuk) | fiecare lot |
| Certificat 3.1 oțel structural S355 (ferme) | fiecare lot/colada |
| Încercare de tracțiune pe eșantion (dacă certificatul lipsește) | prin sondaj, laborator acreditat |

## PTh-S.18.2 Încercări pe elementele de beton armat

| Control | Frecvență |
|---|---|
| Rezistență compresiune beton (seturi 3 cuburi) | 1 set/50 mc SAU/element important |
| Probe de decofrare | 1 set/element disipativ (stâlpi, pereți) |
| Portanță teren la cota de fundare (placă de încărcare, dacă studiul geotehnic o impune) | min. 1 punct la fiecare corp |

## PTh-S.18.3 Încercări pe structura metalică și îmbinări

| Control | Frecvență |
|---|---|
| Examinare vizuală suduri (VT) | 100% |
| Lichide penetrante (PL) — noduri fermă panourile 1-2 | sondaj, minimum 2 ferme din cele 7 |
| Control pretensionare șuruburi HR | 100% vizual + 10% instrumental |
| DFT vopsea (anticorozivă + intumescentă) | min. 10 puncte/element reprezentativ |
| Test de aderență (pull-off) | 1/500 m² sau per element critic |

## PTh-S.18.4 Probe de ansamblu

- **Verificarea geometrică finală** a rostului antiseismic (lățime, continuitate) pe toată suprafața accesibilă, înainte de recepția la terminarea lucrărilor.
- **Verificarea funcționării reazemului mobil** al fiecărei ferme (culisare liberă pe direcția longitudinală, sub o solicitare de probă controlată), înainte de finalizarea montajului panourilor de învelitoare.
- **Documente de conformitate arhivate la Cartea Tehnică**: certificate materiale, rapoarte END, fișe de pretensionare, rapoarte DFT/aderență, procese-verbale de fază determinantă, buletine de încercare beton, raport topografic final de as-built.

---

# PTh-S.19 — SINTEZA CORECȚIILOR PTh FAȚĂ DE DTAC ȘI CONCLUZIA INGINEREASCĂ

## PTh-S.19.1 Sinteza corecțiilor de proiectare aduse de faza PTh

| Element/aspect | Predimensionare DTAC | Corecție/detaliere PTh | Motiv |
|---|---|---|---|
| Armătura stâlpilor curenți adiacenți pereților structurali (axele 3, 9) | 12Ø18 uniform | **12Ø20** la axele 3 și 9 | verificare biaxială N-M, neexplicitată numeric în DTAC (utilizare 0,988 la 12Ø18) |
| Etrieri de nod grindă-stâlp interior curent | Ø10/100 (uniform) | **Ø12/80** la nodurile interioare cu grinzi pe două direcții convergente | forța tăietoare de nod din proiectarea la capacitate depășește rezistența panoului de inimă la etrierii inițiali (723>604 kN) |
| Grinda deschiderii C-D (fâșie sanitare) | neexplicitată (tratată generic ca „grinzi de 6,00/7,20m") | **secțiune proprie 30×45, 3Ø14** | deschidere mică (2,40 m), absentă din grila generică de predimensionare |
| Fundația stâlpului de fațadă ST-C | dimensiune neexplicitată individual | **2,00×2,00 m** (unificată cu ST-CO) | utilizare inițială 98,4% la o talpă mai mică, marjă insuficientă |
| Decizia grătar vs. radier general (Corp A) | ambele alternative menționate, decizie condiționată de geotehnic definitiv | **grătar de grinzi de fundare, confirmat** | teren omogen pe toată lungimea, confirmat de studiul geotehnic definitiv |
| Profilul tălpilor fermei, pe toate cele 7 axe | dimensionat doar pentru ferma curentă (interax 6,00m) | **profil unic 200×100×8, unificat pe toate cele 7 ferme** | flambaj guvernant, nu rezistență; unificare pentru siguranța execuției |
| Îmbinare de transport a fermei (21,00 m) | neexplicitată (fermă tratată continuu) | **splice la mijlocul deschiderii, placă înșurubată M20×8/talpă** | gabarit de transport rutier (L>16,5m util) |
| Cerința de rezistență la foc a structurii metalice Corp B | R60-R120, funcție de calculul definitiv | **R60, fixată definitiv**, corelată cu scenariul de evacuare | confirmare la faza PTh, coordonată cu `instalatii.md` |

## PTh-S.19.2 Tabel centralizator conformitate — toate verificările suplimentare PTh

| Categorie | Verificare | Rezultat |
|---|---|---|
| Structural Corp A | Interacțiune biaxială stâlp curent (după corecție) | 0,913 ✓ |
| Structural Corp A | Interacțiune biaxială stâlp colț | 0,808 ✓ |
| Structural Corp A | Perete capăt — încovoiere / forfecare | 0,39 / 0,81 ✓ |
| Structural Corp A | Nod grindă-stâlp (după corecție etrieri) | 0,97 ✓ |
| Structural Corp B | Flambaj talpă superioară, toate cele 7 ferme | 0,185-0,493 ✓ |
| Structural Corp B | Diagonale întinse/comprimate | 0,46 / 0,68 ✓ |
| Structural Corp B | Reazem fix — forfecare/tracțiune buloane | 0,08 / 0,33 ✓ |
| Geotehnic | Toate fundațiile Corp A + Corp B | 0,76-0,98 ✓ |
| Geotehnic | Tasare diferențială | 1/1.500 ≤ 1/500 ✓ |
| Rost seismic | Deplasare cumulată vs. lățime adoptată | 10,7/12,0 cm ✓ |
| SLS | Vibrații planșee (săli/coridoare) | 7,35 / 8,49 Hz ✓ |
| SLS | Săgeată fermă vs. contra-săgeată | conform ✓ |
| Foc | Toate elementele Corp A (metoda tabelară) | ✓ |
| Foc | Structura metalică Corp B (R60, vopsea intumescentă) | ✓ (grosime confirmată la alegerea sistemului) |

## PTh-S.19.3 Concluzie inginerească

Structura ansamblului școlar de referință (Corp A — cadre duale de beton armat DCM, P+2E, 51,60×15,60 m; Corp B — stâlpi de beton armat + ferme metalice cu zăbrele, deschidere liberă 21,00 m, 33,00×21,00 m), verificată integral la predimensionare în faza DTAC, a fost **detaliată la nivel de execuție** în prezentul supliment PTh: grilă structurală definitivă cu eforturi pe toate axele (11 axe transversale + 4 longitudinale la Corp A; 7 ferme la Corp B), caiet de armare complet (≈130,1 t oțel-beton, Corp A), extras de materiale al structurii metalice (≈24,5 t oțel structural + consumabile, Corp B), detaliu de execuție integral al rostului antiseismic, îmbinări metalice dimensionate prin metoda componentelor, tehnologie de execuție (cofraje/armare/betonare la Corp A; atelier/montaj la Corp B), plan de control al calității, faze determinante, program de urmărire în timp și program de probe.

Analiza detaliată a evidențiat **șapte corecții de proiectare** față de predimensionarea DTAC (armătura stâlpilor adiacenți pereților, etrierii de nod interior, secțiunea grinzii de deschidere mică, dimensiunea fundației de fațadă, confirmarea grătarului de fundații, unificarea profilului tălpilor de fermă, îmbinarea de transport a fermei), toate documentate cu verificare numerică și motivate tehnic la PTh-S.19.1 — corecții normale și așteptate la trecerea de la faza de predimensionare (DTAC) la faza de execuție (PTh), care **nu invalidează soluția de ansamblu, ci o consolidează**, exact rolul pe care faza PTh îl are față de faza DTAC în orice proiect tehnic corect condus.

**Verificarea tehnică**, obligatorie conform Legii 10/1995, se realizează, ca și la faza DTAC (cap. 12 DTAC), de **verificatori atestați MDLPA pe două specialități distincte**: verificare **A1 pentru structura de beton armat** (Corp A integral + stâlpii, fundațiile și infrastructura Corpului B) și verificare **A2 pentru structura metalică** (ferme, pane, contravântuiri ale Corpului B), completate de verificarea **Af pentru partea geotehnică** (infrastructura ambelor corpuri). Se recomandă, înainte de finalizarea planurilor de execuție definitive: (1) rularea modelului EF final cu geometria exactă a arhitecturii definitivate (confirmarea grilei de axe de la PTh-S.2.1/PTh-S.3.1 față de proiectul de arhitectură predat la zi); (2) confirmarea parametrilor seismici de amplasament reali (ag, Tc) cu harta de zonare P100-1/2013 pentru localitatea efectivă a investiției, dacă diferă de exemplul de calcul dezvoltat aici; (3) confirmarea definitivă a grosimilor de vopsea intumescentă cu raportul de clasificare la foc al sistemului efectiv ales de antreprenor pentru structura metalică a Corpului B.

---

*Prezentul supliment de fază PTh-Structură completează faza DTAC (`structura.md`) și se citește împreună cu planșele de execuție S01-S12 (PTh-S.9.4) și cu Caietul de sarcini pentru lucrări de beton armat și pentru structuri metalice (documente distincte). Toate valorile numerice sunt exemple de dimensionare pentru un ansamblu școlar de referință (300 elevi/12 clase, Corp A 51,60×15,60 m P+2E + Corp B 33,00×21,00 m sală de sport) și se confirmă/ajustează în urma rulării finale a modelului EF pe geometria reală a proiectului, a studiului geotehnic definitiv al amplasamentului și a alegerii efective a sistemelor de protecție anticorozivă/la foc de către antreprenorul de execuție. Piesele scrise de arhitectură (`arhitectura.md`), de instalații (`instalatii.md`) și memoriul general (`general.md`) se citesc complementar, fără suprapunere de conținut.*





