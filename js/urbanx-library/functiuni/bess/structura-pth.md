## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență (`structura.md`) al instalației de stocare a energiei electrice în baterii (BESS), elaborat în conformitate cu **HG nr. 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice. El aprofundează faza DTAC deja redactată — soluția de fundare directă prin platforme/radiere independente sub fiecare container, PCS și transformator (cap. 2, 6 DTAC), metodologia de ancorare antiseismică conform P100-1/2013 și SR EN 1992-4 (cap. 7 DTAC), fundația transformatorului cu cuva de retenție a uleiului (cap. 9 DTAC), bazinul de retenție a apelor de stingere (cap. 10 DTAC), platforma rutieră (cap. 12 DTAC) și rețeaua de trenchuri (cap. 13 DTAC) — aducând infrastructura civilă la nivelul de detaliere necesar **EXECUȚIEI PE ȘANTIER**: recalcularea completă pe toate cele 10 containere, pe toate cele 10 unități PCS și pe transformatorul de 12,5 MVA (cu masa reală, nu valoarea medie generică a intervalului din DTAC), verificarea integrală a tuturor modurilor de cedare ale ancorajului conform SR EN 1992-4 (oțel + beton), caietul de armare cu extrase de cantități pe fiecare tip de element, tehnologia de execuție a lucrărilor de beton (terasamente, cofrare, armare, turnare, compactare, tratare), planul de control al calității, fazele determinante, coordonarea cu instalațiile electrice și programul de urmărire în timp.

Obiectivul de investiție tratat ca exemplu de calcul complet: instalație BESS **25 MW / 50 MWh**, realizată din **10 containere** tip ISO 20 picioare (2 rânduri × 5 containere, interax conform memoriului de arhitectură), fiecare cu masă proprie plină **m = 30.000 kg (G = 294,3 kN)**, echipate individual cu unitate **PCS** proprie (masă medie adoptată **m = 12.000 kg, G = 118 kN**), un **transformator ridicător de 12,5 MVA** (masă recalculată la puterea reală a proiectului, cap. PTh-R.5) și o **cabină tehnică EMS** ușoară (masă adoptată **m = 3.500 kg, G = 34,3 kN**). Categoria de importanță **C** (HG 766/1997), clasa de importanță și expunere seismică **III** (γI,e = 1,0, P100-1/2013), clasa de consecințe **CC2** (SR EN 1990 anexa B).

Documentul NU repetă breviarul de predimensionare din DTAC (`structura.md`, cap. 1-17 și anexele A-C) și NU se suprapune cu memoriul general, cu memoriul de arhitectură/amenajare, cu memoriul de instalații electrice + PSI și cu scenariul/raportul de securitate la incendiu (SSI) ale aceleiași documentații — documente care tratează, respectiv, descrierea tehnologică generală, zonarea funcțională, dimensionarea electrică și scenariul complet de securitate la incendiu, și care nu se dublează aici. Structura capitolelor prezentului supliment:

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Breviar de calcul complet — toate platformele individuale (containere, PCS, transformator, cabină EMS), acțiuni și verificări SLU/SLS |
| PTh-R.3 | Ancorajul antiseismic — verificare completă conform SR EN 1992-4 (toate modurile de cedare), pe fiecare tip de echipament |
| PTh-R.4 | Caietul de armare — extras de armătură pe fiecare tip de element structural |
| PTh-R.5 | Fundația transformatorului și cuva de retenție a uleiului — recalcul la puterea reală de 12,5 MVA |
| PTh-R.6 | Bazinul de retenție a apelor de stingere — proiectare structurală detaliată + verificare UPL completă |
| PTh-R.7 | Platforma rutieră și culoarele de intervenție — dimensionare portantă detaliată |
| PTh-R.8 | Tehnologia de execuție a lucrărilor de beton — terasamente, cofraje, armare, turnare, compactare, tratare |
| PTh-R.9 | Controlul calității materialelor și al execuției |
| PTh-R.10 | Execuția și controlul ancorajelor post-instalate — procedură detaliată de montaj |
| PTh-R.11 | Coordonarea cu instalațiile electrice și cu tehnologia furnizorului de echipament |
| PTh-R.12 | Fazele determinante ale execuției |
| PTh-R.13 | Programul de probe și încercări |
| PTh-R.14 | Programul de urmărire specială a comportării în timp (P130) |
| PTh-R.15 | Extrasul de materiale (bill of quantities pe reper/element) |
| PTh-R.16 | Sinteza verificărilor SLU/SLS și concluziile fazei PTh |

### PTh-R.1.1. Date generale de proiectare (recapitulare parametri, preluați identic din DTAC)

| Parametru | Valoare | Sursă |
|---|---|---|
| Beton platforme/radiere containere, PCS | C25/30, XC2+XF1/XF3 | cap. 3.1 DTAC |
| Beton cuvă ulei / bazin retenție ape | C30/37, XA1(/XA2) | cap. 3.1 DTAC |
| Oțel-beton | B500C, fyd = 434,8 N/mm² | cap. 3.2 DTAC |
| Buloane de ancoraj containere | M24 gr. 8.8 (adoptat, standardizat — v. PTh-R.3) | cap. 3.3, 7.5 DTAC |
| Buloane de ancoraj transformator | M20 gr. 8.8 | cap. 9.1 DTAC |
| Buloane de ancoraj PCS | M16 gr. 8.8 | PTh-R.3.4 |
| Clasa de importanță/expunere | III (γI,e = 1,0) | P100-1/2013 |
| ag / β0 (amplasament de bază) | 0,20g / 2,5 | cap. 4.1 DTAC |
| ag / β0 (amplasament sever, exemplu complet) | 0,30g / 2,75 | cap. 4.1, 7.2 DTAC |
| q (factor de comportare, element ancorat rigid) | 1,5 | cap. 4.1 DTAC |
| pconv teren | 200 kPa | cap. 4.4 DTAC |
| E teren | 15 MPa | cap. 4.4 DTAC |
| Categoria geotehnică | 2 | cap. 4.4 DTAC |
| Clasa de execuție ancoraje | conform ETA produs contractat | cap. 3.4 DTAC |
| Protecție anticorozivă ancoraje | zincare SR EN ISO 1461 ≥ 85 μm sau A4-70/80 | cap. 3.3 DTAC |

Cadrul normativ complet este cel enunțat în DTAC (cap. 1.4 din `structura.md`): Legea 10/1995, Legea nr. 169/2026 (CATUC), HG 766/1997, HG 907/2016, SR EN 1990/NA, CR 0/2012, SR EN 1991 (părțile 1-1, 1-3, 1-4), SR EN 1992-1-1/NA, SR EN 1992-1-2, **SR EN 1992-4**, SR EN 1993-1-1, SR EN 1997-1/NA + NP 074/2014, NP 112/2014, SR EN 1998-1/NA + P100-1/2013, SR EN 1998-4, NE 012-1/2007 și NE 012-2/2010, STAS 6054/77, P118-1/2/3, Ordin MAI 129/2016, NFPA 855, UL 9540A, SR EN 10080/SR 438, SR EN ISO 1461, SR EN ISO 12944, ETAG 001/EAD. Suplimentar, prezentul document citează explicit și dezvoltă aplicarea: **EAD 330499** (agrement tehnic european pentru ancore chimice cu tijă filetată, referință de principiu pentru metodologia de calcul, produsul exact contractat urmând a avea propriul ETA), **SR EN 1997-1 §2.4.7.4** (verificarea la subpresiune UPL), **P130/1999** (programul de urmărire a comportării construcțiilor în timp) și **SR EN 206/NE 012** (control de producție a betonului, clase de expunere, rapoarte A/C).

### PTh-R.1.2. Geometria de referință adoptată pentru breviarul complet

Pentru a permite recalcularea integrală, nu doar pe cadrul-tip, prezentul supliment fixează o geometrie de referință completă a platformelor individuale, cu un sistem de marcare unic pe reper, utilizat consecvent în PTh-R.2 (breviar), PTh-R.4 (caiet de armare) și PTh-R.15 (extras de materiale):

| Marcă | Element | Dimensiuni în plan | Grosime | Nr. bucăți |
|---|---|---|---|---|
| PC-01…PC-10 | Platformă container 20ft | 7,00 × 3,40 m (A ≈ 23,0 mp) | 300 mm | 10 |
| PP-01…PP-10 | Platformă PCS | 3,00 × 2,70 m (A ≈ 8,0 mp) | 300 mm | 10 |
| PT-01 | Fundație transformator | 3,20 × 2,80 m (A ≈ 9,0 mp) | 350 mm | 1 |
| CE-01 | Cabină tehnică EMS | 4,00 × 2,50 m (A ≈ 10,0 mp) | 300 mm | 1 |
| CU-01 | Cuvă retenție ulei transformator | 4,00 × 3,00 m plan interior, H = 1,00 m | pereți 250 mm, radier 350 mm | 1 |
| BZ-01 | Bazin retenție ape de stingere | 10,00 × 8,00 m plan interior, H = 2,00 m | pereți 300 mm, radier 500 mm | 1 |
| DR-01 | Platformă rutieră/culoar intervenție (rigid, traseu principal) | variabil, ≈ 900 mp total | 200 mm | — |
| TR-01 | Trench cabluri MT | variabil, conform traseului | pereți 200 mm | — |

Containerele **PC-01, PC-05, PC-06 și PC-10** ocupă pozițiile de capăt de șir (extremitățile celor două rânduri de câte 5 containere), fiind expuse suplimentar la vântul frontal pe latura scurtă a incintei (verificat la PTh-R.2.9) — restul de 6 platforme (PC-02, PC-03, PC-04, PC-07, PC-08, PC-09) sunt platforme curente, protejate parțial de efectul de ecranare al containerelor vecine. Această geometrie de referință este cea care se recalculează, în întregime, dacă masa reală/gabaritul echipamentului contractat definitiv diferă de valorile adoptate aici (regula de recalculare completă este dată în Anexa B).

---

## PTh-R.2 — BREVIAR DE CALCUL COMPLET (TOATE PLATFORMELE INDIVIDUALE)

### PTh-R.2.1. Convenții și metodologie

Toate verificările de mai jos se dezvoltă în paralel pentru cele **două amplasamente de referință** deja introduse în DTAC (cap. 4.1, 7.2): **amplasamentul de bază** (`ag = 0,20g`, `β0 = 2,5` → `Sd(T1) = 3,269 m/s²`) și **amplasamentul sever** (`ag = 0,30g`, `β0 = 2,75` → `Sd(T1) = 5,395 m/s²`), ambele cu `q = 1,5`, `γI,e = 1,0`, `λ = 1,0`. Spre deosebire de DTAC — care a dezvoltat integral exemplul doar pentru un container generic de 40ft (masă 40.000 kg, tratat ca variantă de extindere) — prezentul breviar recalculează **fiecare tip de echipament al configurației reale de proiect** (10× container 20ft, 10× PCS, 1× transformator, 1× cabină EMS), cu masa proprie specifică fiecăruia, întrucât forța seismică `Fb = γI,e·Sd(T1)·m·λ` este direct proporțională cu masa și nu poate fi transferată, prin analogie simplă, de la un tip de echipament la altul.

Toate verificările de stabilitate a corpului rigid (răsturnare, lunecare) și de rezistență a ancorajului (PTh-R.3) se raportează la **gruparea specială seismică** (`Σ Gk,j + γI,e·AEk + Σ ψ2,i·Qk,i`, cap. 5.4 DTAC); verificările de presiune pe teren, poansonare și tasare se raportează la **gruparea fundamentală** (`γG = 1,35`, `γQ = 1,50`) pentru componenta gravitațională, majorată punctual cu contribuția verticală a acțiunii seismice acolo unde aceasta este defavorabilă (poansonare, cap. PTh-R.2.4).

### PTh-R.2.2. Platforma-container (PC-01…PC-10) — recalcul complet pe masa reală de proiect (m = 30.000 kg)

**Forța seismică orizontală de bază:**

Amplasament de bază: `Fb = 1,0·3,269·30.000 = 98.070 N ≈ 98,1 kN`.
Amplasament sever: `Fb = 1,0·5,395·30.000 = 161.850 N ≈ 161,9 kN`.

Aceste valori confirmă, recalculate pe masa reală a configurației de proiect (container 20ft, nu cea de 40ft folosită ca exemplu în DTAC), un raport `Fb/G` identic celui din DTAC — `Fb,sever/G = 161,9/294,3 = 0,55` — întrucât acest raport nu depinde de masa echipamentului, ci exclusiv de `Sd(T1)/g`, `β0` și `q`; masa intervine liniar la numărător (`Fb`) și la numitor (`G = m·g`), motiv pentru care coeficientul seismic echivalent (55% din greutate la amplasamentul sever) rămâne o constantă de configurație, indiferent dacă echipamentul cântărește 30 sau 40 de tone — observație metodologică utilă pentru orice recalculare viitoare (Anexa B).

**Componenta verticală a acțiunii seismice:**

Amplasament de bază: `Fv = (2/3)·0,20·9,81·30.000 = 39.240 N ≈ 39,2 kN`.
Amplasament sever: `Fv = (2/3)·0,30·9,81·30.000 = 58.860 N ≈ 58,9 kN`.

**Verificarea la răsturnare** (`h_cg ≈ 1,45 m`, `b/2 ≈ 1,22 m`, cf. cap. 7.3 DTAC):

| Amplasament | M_r = Fb·h_cg [kNm] | M_stab = (G−Fv)·(b/2) [kNm] | γ_răsturnare |
|---|---|---|---|
| Bază (0,20g) | 98,1·1,45 = **142,2** | (294,3−39,2)·1,22 = **311,2** | **2,19** ✓ |
| Sever (0,30g) | 161,9·1,45 = **234,8** | (294,3−58,9)·1,22 = **287,2** | **1,22** ✓ (marjă redusă) |

Coeficientul de siguranță la răsturnare fără ancoraj rămâne, la amplasamentul sever, la aceeași valoare marginală (`γ = 1,22`) obținută în DTAC pentru containerul de 40ft — coincidență explicabilă riguros (nu întâmplătoare): raportul `γ_răsturnare = Sd(T1)·h_cg / [(g − av)·(b/2)]` este independent de masa echipamentului (masa se simplifică între numărător și numitor), depinzând exclusiv de geometria containerului (raportul `h_cg/b`, identic pentru toate variantele standard ISO, indiferent de lungime) și de parametrii seismici ai amplasamentului. **Concluzia rămâne, prin urmare, valabilă identic pentru configurația reală de proiect (10× container 20ft): fără ancorare, marja de siguranță la răsturnare la un amplasament sever este insuficientă pentru o exploatare sigură pe termen lung, iar la amplasamentul de bază, deși γ = 2,19 pare confortabil, absența ancorajului rămâne exclusă de verificarea la lunecare (mai jos) și de cerința normativă explicită a P100-1 pentru echipamente rigide ancorate.**

**Verificarea la lunecare** (`μ = 0,35`, cap. 7.4 DTAC):

| Amplasament | F_frecare = μ·(G−Fv) [kN] | Fb [kN] | F_frecare/Fb |
|---|---|---|---|
| Bază | 0,35·255,1 = **89,3** | 98,1 | **0,91** ✗ (insuficient) |
| Sever | 0,35·235,4 = **82,4** | 161,9 | **0,51** ✗ (insuficient) |

La ambele amplasamente, frecarea disponibilă la interfața container-platformă este **inferioară forței seismice de calcul** — chiar și la amplasamentul de bază, unde raportul 0,91 pare apropiat de 1,0, marja reziduală (9%) este prea mică pentru a fi considerată o rezervă de siguranță acceptabilă, dat fiind caracterul incert al coeficientului de frecare real (variabilitatea suprafeței de contact metal-beton, posibila prezență a unei folii de separație sau a unui strat de uzură). **Ancorarea mecanică este, prin urmare, obligatorie la orice amplasament relevant pentru un BESS din România, nu doar la amplasamentele severe** — confirmare cantitativă, pe configurația reală de proiect, a concluziei calitative deja formulate în DTAC cap. 7.3-7.4.

**Verificarea la vânt** (`Fw ≈ 23,2 kN`, față lungă container 20ft, `A ≈ 17,6 mp`, cf. cap. 4.3 DTAC):

`M_w = 23,2·1,45 = 33,6 kNm`; comparativ cu `M_stab` (sever) `= 287,2 kNm` → `γ_w = 8,55`, verificare amplu satisfăcută. Raportul `Fb/Fw` este **6,98 la amplasamentul sever** și **4,23 la amplasamentul de bază** — de fiecare dată acțiunea seismică guvernează cu o marjă confortabilă față de vânt, chiar mai clară decât la containerul de 40ft din DTAC (unde raportul era 4,63 la amplasamentul sever), întrucât la un container mai mic (20ft) atât masa, cât și suprafața expusă la vânt scad, dar masa scade proporțional mai puțin relevant pentru forța seismică decât aria pentru forța de vânt (efect de scară: masa unui container ISO variază aproximativ proporțional cu volumul/lungimea, iar aria expusă la vânt pe fața lungă variază, de asemenea, aproximativ proporțional cu lungimea — coeficienții rămân, totuși, ușor diferiți din cauza contribuției constante a lățimii/înălțimii la ambele mărimi).

**Verificarea la poansonare** (`h = 300 mm`, `d = 250 mm`, `ρl = 0,5%`, C25/30):

`V_Ed,colț` (gruparea fundamentală) `= 1,35·294,3/4 = 99,3 kN`; `V_Ed,colț,seismic` (sever) `≈ 99,3/1,35 + 58,9/4 = 73,6 + 14,7 = 88,3 kN` — verificarea fundamentală guvernează (99,3 > 88,3 kN), analog raportului identificat în DTAC pentru containerul de 40ft. Se adoptă, acoperitor (aceeași marjă procentuală de 18% aplicată în DTAC pentru neuniformitatea reală de distribuție a maselor interne ale echipamentului): `V_Ed ≈ 99,3·1,18 ≈ 117,2 kN`, rotunjit **`V_Ed = 117 kN`**.

`k = 1 + √(200/250) = 1 + 0,894 = 1,894`; `v_Rd,c = 0,12·1,894·(100·0,005·25)^(1/3) = 0,12·1,894·2,321 = 0,5275 MPa`.

Perimetrul critic la `2d = 500 mm` de la corner casting (≈ 178×162 mm): `u1 ≈ 2·(178+1.000) + 2·(162+1.000) = 2.356 + 2.324 = 4.680 mm`.

`V_Rd,c = 0,5275·4.680·250 = 617.190 N ≈ 617,2 kN`.

`V_Ed/V_Rd,c = 117/617,2 = 0,19` ✓ — utilizare **19%**, rezervă amplă chiar și cu grosimea de platformă redusă la 300 mm (față de cei 350 mm folosiți în DTAC pentru containerul de 40ft, mai greu) — confirmă că platforma de 300 mm este suficient de robustă pentru configurația reală de proiect (20ft, 294 kN), fără a fi nevoie de majorarea grosimii adoptate generic în DTAC pentru varianta de extindere la 40ft.

**Verificarea la presiune pe teren și la tasare:**

`p_ef = (294,3 + 201,3)/23,0 = 495,6/23,0 = 21,5 kPa` (G_platformă calculat la rata 8,75 kN/mp × 23,0 mp = 201,3 kN, cf. cap. 5.1 DTAC); `p_ef/pconv = 21,5/200 = 0,11` ✓ (11%), identic valorii de referință deja indicate în DTAC cap. 6.2 pentru configurația de 20ft.

`s ≈ 21,5·2,44/15.000·0,8 = 52,46/15.000·0,8 ≈ 0,0028 m ≈ 2,8 mm` ≪ 40 mm admis ✓.

### PTh-R.2.3. Platforma unității PCS (PP-01…PP-10) — calcul complet

Masă adoptată `m = 12.000 kg` (`G = 118 kN`, medie a intervalului 8-15 t, cap. 5.1 DTAC), platformă `PP- 3,00 × 2,70 m` (A ≈ 8,0 mp), grosime 300 mm, dimensiuni de echipament asimilate unui volum paralelipipedic mai mic (`h_cg ≈ 1,10 m`, `b/2 ≈ 1,00 m` — jumătate din lățimea aproximativă a unei unități PCS containerizate).

`Fb` (bază) `= 1,0·3,269·12.000 = 39.228 N ≈ 39,2 kN`; `Fb` (sever) `= 1,0·5,395·12.000 = 64.740 N ≈ 64,7 kN`.

`Fv` (sever) `= (2/3)·0,30·9,81·12.000 = 23.544 N ≈ 23,5 kN`.

`M_r` (sever) `= 64,7·1,10 = 71,2 kNm`; `M_stab = (118 − 23,5)·1,00 = 94,5 kNm`; `γ_răsturnare = 94,5/71,2 = 1,33` ✓ — marjă puțin superioară celei de la containere (raportul `h_cg/b` mai favorabil la un echipament mai jos și mai lat, tipic unei unități PCS), dar **tot insuficientă pentru a elimina necesitatea ancorării**: `F_frecare = 0,35·94,5 = 33,1 kN < Fb = 64,7 kN` la amplasamentul sever → **ancorare obligatorie**, identic concluziei de la containere.

`p_ef = (118 + 70,0)/8,0 = 188,0/8,0 = 23,5 kPa` (`G_platformă = 8,75·8,0 = 70,0 kN`); `p_ef/pconv = 23,5/200 = 0,12` ✓ (12%).

### PTh-R.2.4. Fundația transformatorului (PT-01) — trimitere la PTh-R.5

Fundația transformatorului, recalculată la puterea reală de proiect de **12,5 MVA** (nu la valoarea medie generică de 20 t/196 kN folosită orientativ în DTAC pentru intervalul 10-30 t), se dezvoltă integral la capitolul PTh-R.5, împreună cu recalcularea volumului cuvei de retenție a uleiului la aceeași putere reală — cele două elemente fiind indisolubil legate tehnic (masa transformatorului determină atât încărcarea platformei proprii, cât și, indirect, prin volumul de ulei conținut, dimensiunea cuvei adiacente).

### PTh-R.2.5. Cabina tehnică EMS (CE-01) — verificare completă, cu confirmarea cantitativă a guvernării de către vânt

DTAC (cap. 8) afirmă calitativ că, la cabina tehnică EMS, „verificarea seismică rămâne, de regulă, neguvernantă la o masă proprie mult mai mică decât cea a unui container de baterii plin" — afirmație pe care prezentul supliment o **verifică prin calcul explicit**, nu o preia ca atare. Se adoptă masa cabinei EMS `m = 3.500 kg` (`G = 34,3 kN`), platformă `CE-01, 4,00×2,50 m` (A ≈ 10,0 mp), geometrie asimilată containerului standard la scară redusă (`h_cg ≈ 1,45 m`, `b/2 ≈ 1,22 m`, aceleași proporții).

`Fb` (sever) `= 1,0·5,395·3.500 = 18.883 N ≈ 18,9 kN` — pentru prima dată în acest breviar, **`Fb` este inferioară forței de vânt** `Fw ≈ 23,2 kN` (calculată conservator pe aceeași arie de referință a feței lungi a unui container, ca ipoteză acoperitoare pentru o cabină de gabarit comparabil): `Fb/Fw = 18,9/23,2 = 0,81 < 1,0` → **vântul guvernează stabilitatea cabinei EMS**, confirmând cantitativ afirmația calitativă a DTAC. Pragul de masă sub care vântul devine guvernant, la amplasamentul sever, rezultă direct din egalitatea `Sd(T1)·m = Fw` → `m = Fw/Sd(T1) = 23.200/5,395 ≈ 4.300 kg` — orice echipament ancorat cu masă proprie sub acest prag (la acest amplasament) este, prin urmare, guvernat de vânt, nu de seism, criteriu util pentru clasificarea rapidă a oricărui echipament auxiliar viitor al platformei BESS.

`Fv` (sever, din seism, pentru completitudine) `= (2/3)·0,30·9,81·3.500 = 6.867 N ≈ 6,9 kN`.

**Verificare la răsturnare din vânt** (guvernantă): `M_w = 23,2·1,45 = 33,6 kNm`; `M_stab = (34,3 − 0)·1,22 = 41,9 kNm` (fără reducere din `Fv` seismic, întrucât verificarea de vânt nu include componenta verticală seismică) → `γ_w = 41,9/33,6 = 1,25` ✓ — marjă comparabilă celei seismice a containerelor grele, dar obținută printr-un mecanism fizic diferit (raport masă/suprafață expusă mult mai defavorabil la un echipament ușor). **Verificare la lunecare din vânt:** `F_frecare = 0,35·34,3 = 12,0 kN < Fw = 23,2 kN` → **insuficient, ancorare obligatorie și la cabina EMS**, deși guvernată de o acțiune diferită (vânt, nu seism) — concluzie tehnică importantă: **toate echipamentele ancorate ale platformei BESS necesită ancorare mecanică, indiferent de masa proprie**, doar acțiunea laterală guvernantă diferă (seism la echipamentele grele, vânt la cele ușoare).

### PTh-R.2.6. Verificare seismică suplimentară — componenta verticală izolată (situație de proiectare separată)

Conform P100-1/2013, se verifică suplimentar situația în care componenta verticală a acțiunii seismice acționează defavorabil, izolat de componenta orizontală (combinație `EVd` fără `EHd` semnificativ, relevantă pentru elementele sensibile la reducerea încărcării gravitaționale stabilizatoare, precum verificarea la subpresiune a bazinului de retenție, PTh-R.6, sau la desprinderea locală a unui colț de container pe rezemare directă, înainte de mobilizarea completă a ancorajului): la amplasamentul sever, `Fv,max = 58,9 kN` (container) reprezintă `Fv/G = 58,9/294,3 = 0,20` din greutatea proprie — reducere care, aplicată separat greutății stabilizatoare a oricărui element de contenție a lichidelor (cuvă, bazin), este integrată explicit în verificarea UPL de la PTh-R.6.3.

### PTh-R.2.7. Sinteza recalculării — utilizarea grafelor pe toate echipamentele (amplasamentul sever)

| Echipament | m [kg] | G [kN] | Fb [kN] | γ_răsturnare (fără ancoraj) | F_frecare/Fb (lunecare) | Acțiune laterală guvernantă |
|---|---|---|---|---|---|---|
| Container 20ft (PC-01…PC-10) | 30.000 | 294,3 | 161,9 | 1,22 | 0,51 | **seism** |
| PCS (PP-01…PP-10) | 12.000 | 118,0 | 64,7 | 1,33 | 0,51 | **seism** |
| Transformator (v. PTh-R.5) | ~18.000 | ~176,6 | 97,1 | — (v. PTh-R.5) | — | **seism** |
| Cabină EMS (CE-01) | 3.500 | 34,3 | 18,9 (< Fw = 23,2) | 1,25 (din vânt) | 0,52 (din vânt) | **vânt** |

Concluzia unitară a acestei recalculări complete, pe toată configurația reală a proiectului, este identică celei formulate calitativ în DTAC, dar acum **confirmată numeric pe fiecare echipament**: niciunul dintre elementele rezemate ale instalației BESS nu poate fi lăsat neancorat — indiferent dacă acțiunea laterală guvernantă este seismul (echipamentele grele) sau vântul (cabina tehnică ușoară), marja de siguranță la răsturnare și la lunecare, calculată exclusiv din greutatea proprie, este sistematic insuficientă pentru o exploatare sigură. Ancorarea antiseismică/la vânt (PTh-R.3) este, prin urmare, o cerință structurală universală a acestei tipologii de instalație, nu o măsură opțională aplicată selectiv unor echipamente considerate „mai grele" sau „mai expuse".

### PTh-R.2.8. Verificare la extindere — a doua rând de containere / etapizare

Dacă instalarea containerelor se realizează etapizat (conform posibilității semnalate în DTAC cap. 2.3 pct. 1 — instalare eșalonată, eventual în etape succesive de extindere a capacității), platformele individuale deja executate și neîncărcate temporar (container neinstalat încă) se verifică suplimentar la o **situație de proiectare tranzitorie**: platformă goală, expusă direct acțiunii climatice (vânt, precipitații, eventual încărcare de zăpadă dacă rămâne neacoperită o perioadă îndelungată), fără stabilizarea suplimentară oferită de greutatea containerului. Această verificare este, în esență, favorabilă (platforma goală are o presiune pe teren nulă și nu este supusă răsturnării, fiind un element static rezemat direct pe teren), dar impune o atenție de execuție: **ancorajele post-instalate nu se montează decât după poziționarea definitivă a containerului** (cap. 7.6 DTAC), astfel încât o platformă finalizată, dar neîncărcată pentru o perioadă de așteptare (depozitare temporară înainte de instalarea echipamentului), rămâne cu găurile de ancorare neexecutate — aspect de programare a execuției, nu de verificare structurală suplimentară.

---

## PTh-R.3 — ANCORAJUL ANTISEISMIC — VERIFICARE COMPLETĂ CONFORM SR EN 1992-4

### PTh-R.3.1. Configurația finală adoptată — decizie de standardizare

DTAC (cap. 7.5) a dezvoltat exemplul de dimensionare a ancorajului pentru configurația generică de container 40ft, cu buloane **M24 gr. 8.8**. Recalculând strict pe masa reală a configurației de proiect (container 20ft, 294 kN — PTh-R.2.2), forța pe ancoraj rezultă sensibil mai redusă decât la exemplul DTAC, ceea ce ar permite, la o primă analiză, adoptarea unui diametru inferior (M20 ar fi, prin calcul strict, suficient — verificare la PTh-R.3.6). **Decizia de proiectare PTh este, totuși, de a menține M24 gr. 8.8 pentru toate cele 10 platforme-container (PC-01…PC-10)**, pentru trei motive tehnice și economice convergente:

1. **Compatibilitate cu o eventuală extindere/repowering viitor** — conform memoriului general (cap. 5.5, 8.4), bateriile litiu-ion au o durată de viață tehnologică (15-25 ani) inferioară duratei de viață a infrastructurii civile (50 de ani), fapt care implică un ciclu probabil de înlocuire a containerelor la orizont de 15-20 de ani, posibil cu echipamente de generație viitoare, de gabarit sau masă diferite (containere 40ft cu densitate energetică superioară, spre exemplu). Ancorajele M24, deja verificate la o forță superioară strict necesară configurației actuale, oferă o marjă de recalculare favorabilă pentru un asemenea scenariu, fără a impune reforarea/reancorarea platformei existente.
2. **Unificarea execuției** — un singur diametru de bulon, un singur șablon de foraj, o singură fișă tehnologică de instalare pentru toate cele 10 platforme de container reduce riscul de eroare de șantier (confuzie între diametre) și simplifică aprovizionarea și controlul calității (cap. PTh-R.9, PTh-R.10).
3. **Diferența de cost marginal** — diferența de cost material între M20 și M24 (buloane + adezivi chimici) este nesemnificativă la scara bugetului total al proiectului, în timp ce beneficiul de robustețe pe termen lung (pct. 1) și de simplitate a execuției (pct. 2) sunt substanțiale.

Se adoptă, prin urmare, configurația unificată: **4 ancore chimice M24 gr. 8.8 per platformă-container** (câte una la fiecare corner casting), **hef = 200 mm**, în platforma de beton **C25/30**, cu agrement tehnic european (ETA) conform EAD relevant (cap. 3.4 DTAC).

### PTh-R.3.2. Forțele de calcul pe ancoraj — recalculate pe configurația reală

| Amplasament | Fb container [kN] | V_Ed = Fb/4 [kN] | T_Ed (adoptat ≈ 1,02·V_Ed) [kN] |
|---|---|---|---|
| Bază (0,20g) | 98,1 | 24,5 | 25,0 |
| Sever (0,30g) | 161,9 | 40,5 | 41,0 |

### PTh-R.3.3. Verificarea la cedare în oțel (forfecare și tracțiune) — M24 gr. 8.8

`As = 353 mm²` (M24); `fub = 800 N/mm²`; `γM2 = 1,25`.

`F_v,Rd = 0,6·800·353/1,25 = 169.440/1,25 = 135.552 N ≈ 135,55 kN`.
`F_t,Rd = 0,9·800·353/1,25 = 254.160/1,25 = 203.328 N ≈ 203,3 kN`.

| Amplasament | V_Ed/F_v,Rd | T_Ed/F_t,Rd | Interacțiune liniară | Interacțiune pătratică (1,5) |
|---|---|---|---|---|
| Bază | 24,5/135,55 = **0,18** | 25,0/203,3 = **0,12** | 0,30 | 0,18^1,5+0,12^1,5 = 0,076+0,043 = **0,12** |
| Sever | 40,5/135,55 = **0,30** | 41,0/203,3 = **0,20** | 0,50 | 0,30^1,5+0,20^1,5 = 0,164+0,089 = **0,25** |

Ambele forme de verificare confirmă o marjă amplă la cedarea în oțel a bulonului însuși, la ambele amplasamente — rezultat consecvent cu cel din DTAC (unde interacțiunea era 0,59/0,39, calculată însă pe forța mai mare a containerului de 40ft; pe configurația reală de 20ft, cu același diametru M24, marja este net superioară, confirmând caracterul conservator/standardizat al deciziei de la PTh-R.3.1).

### PTh-R.3.4. Verificarea la smulgere conică a betonului (concrete cone failure) — modul de cedare adesea determinant la ancorele post-instalate

Spre deosebire de cedarea în oțel a bulonului (verificată mai sus, cu marje ample), **smulgerea conică a betonului de bază este, la ancorele post-instalate, un mod de cedare frecvent mai restrictiv**, guvernat de rezistența betonului, de adâncimea efectivă de ancorare și de distanța la marginea liberă a platformei — motiv pentru care SR EN 1992-4 impune verificarea sa explicită, distinctă de cea a oțelului.

`N0_Rk,c = k1·√fck·hef^1,5`, cu `hef = 200 mm` (`hef^1,5 = 200·√200 = 200·14,142 = 2.828,4`), `fck = 25 MPa` (`√25 = 5`). Coeficientul `k1` este, prin natura sa, **specific produsului de ancorare certificat** (ETA-ul fiecărui sistem chimic/mecanic indică valorile proprii `k_ucr,N`/`k_cr,N`, tipic în intervalul 7-12 pentru ancore chimice cu tijă filetată, funcție de rășina/adezivul folosit și de starea betonului — fisurat sau nefisurat). **Pentru ilustrarea metodologiei de verificare la faza PTh**, se adoptă, ca valoare reprezentativă (NU definitivă — valoarea exactă se preia obligatoriu din ETA-ul produsului contractat efectiv, conform recomandării ferme reluate din DTAC cap. 7.5), `k1 = 11` (ipoteză de beton nefisurat, rezonabilă pentru platforma slab solicitată la încovoiere generală, departe de zona de moment maxim):

`N0_Rk,c = 11·5·2.828,4 = 155.562 N ≈ 155,6 kN`.

`γMc` (coeficient parțial de siguranță pentru cedarea în beton, combinând `γc` și un factor de instalare) se adoptă, conservator, **`γMc = 1,8`** (valoare tipică pentru ancore post-instalate cu control de instalare normal, conform practicii EAD/ETA — valoarea exactă, din nou, se preia din documentul ETA al produsului contractat):

`N0_Rd,c = 155,6/1,8 = 86,4 kN`.

**Verificarea distanței la margine și a efectului de grup:** distanța critică `c_cr,N = 1,5·hef = 300 mm`; bordura perimetrală adoptată a platformei-container (300-500 mm, cap. 6.2 DTAC) satisface această condiție (`c ≥ c_cr,N`), motiv pentru care `ψs,N = 1,0` (fără reducere de margine). Distanța critică între ancoraje `s_cr,N = 3·hef = 600 mm`; distanța reală între cele 4 corner castings ale unui container 20ft (≈ 6,06 × 2,44 m) este mult superioară acestei valori, deci fiecare ancoraj se comportă, din punctul de vedere al smulgerii conice, **ca ancoraj izolat, fără efect de grup** (`Ac,N/Ac,N0 = 1,0`, `ψec,N = 1,0`).

Rezultă `N_Rd,c = N0_Rd,c = 86,4 kN`, valoare aplicabilă neschimbată la orice colț al platformei-container.

| Amplasament | T_Ed [kN] | T_Ed/N_Rd,c |
|---|---|---|
| Bază | 25,0 | 25,0/86,4 = **0,29** |
| Sever | 41,0 | 41,0/86,4 = **0,47** |

**Verificarea la smulgere conică a betonului rezultă, la amplasamentul sever, cu o utilizare de 47% — sensibil superioară utilizării la cedarea în oțel a bulonului (20%, PTh-R.3.3), confirmând că, la această configurație, modul de cedare guvernant al ancorajului este cel al betonului, nu al oțelului bulonului.** Această constatare este de importanță practică directă pentru execuție (PTh-R.10): calitatea forajului (curățare completă, absența prafului rezidual care ar reduce aderența), respectarea strictă a adâncimii efective de ancorare (`hef = 200 mm`, nu mai puțin) și respectarea distanței minime la margine (≥ 300 mm) sunt, la această instalație, mai critice pentru siguranța ancorajului decât calitatea metalurgică a bulonului însuși.

### PTh-R.3.5. Verificarea la ruperea prin desprindere (pull-out) și la despicare (splitting)

**Pull-out (desprindere prin depășirea aderenței rășină-beton sau rășină-oțel):** relevantă la ancorele chimice ca mod de cedare complementar smulgerii conice a betonului, guvernată de rezistența la aderență (`τ_Rk`) a sistemului rășină-oțel/rășină-beton, valoare disponibilă **exclusiv din ETA-ul produsului contractat** (variază semnificativ între producători și tipuri de rășină — epoxidică, vinilester, hibridă). Prezentul supliment **nu poate și nu trebuie să estimeze o valoare generică de aderență** fără a induce o falsă precizie — verificarea completă la pull-out se realizează, la faza de execuție, prin raportul de calcul software dedicat al producătorului de ancore (Hilti PROFIS, fischer FIXperience sau echivalent), introducând `hef = 200 mm` și diametrul `M24` pentru produsul chimic contractat efectiv. Recomandarea de proiectare este ca antreprenorul general să solicite, de la furnizorul de ancore, raportul de calcul semnat pentru configurația exactă adoptată (4 ancore M24, `hef = 200 mm`, beton C25/30 nefisurat/fisurat conform stării reale a platformei), **înainte** de faza determinantă de instalare a ancorajelor (cap. PTh-R.12).

**Despicare (splitting failure):** relevantă la platforme de grosime redusă relativ la adâncimea de ancorare. Raportul `hef/h_platformă = 200/300 = 0,667`, sub pragul de atenție (0,85-0,90) semnalat în DTAC — marjă **mai favorabilă** decât la exemplul DTAC (unde raportul era 200/250 = 0,80, pentru o platformă mai subțire dimensionată pentru containerul de 40ft), confirmând că grosimea de 300 mm adoptată pentru platforma-container reală a proiectului (PC-01…PC-10) exclude practic riscul de despicare, fără a necesita armătură suplimentară de control al despicării dincolo de plasele curente (cap. PTh-R.4).

### PTh-R.3.6. Ruperea prin lunecare a betonului la forfecare cu efect de margine (concrete edge breakout)

Acest mod de cedare devine relevant atunci când ancorajul este solicitat la forfecare orientată spre o muchie liberă apropiată a platformei. Distanța la margine adoptată (300-500 mm) satisface simultan condiția `c1 ≥ 10·dnom` (`10·24 = 240 mm`) și `c1 ≥ hef` (`200 mm`), ambele criterii uzuale de bună practică pentru a limita sensibilitatea la acest mod de cedare; totuși, verificarea cantitativă exactă (formula CCD pentru forfecare, cu coeficienți `k5`, exponenți dependenți de raportul `lf/c1` și `c1/dnom`) este, la fel ca la pull-out, **puternic dependentă de parametrii specifici ai produsului certificat ETA** și se determină definitiv prin software-ul de calcul al producătorului de ancore, la faza de execuție (aceeași recomandare fermă de la PTh-R.3.5). Ca verificare de ordin de mărime, orientativă: componenta de forfecare pe ancorajul cel mai solicitat (`V_Ed ≈ 40,5 kN` la amplasamentul sever) este semnificativ inferioară capacității de smulgere conică deja verificate la tracțiune (`N_Rd,c = 86,4 kN`), iar la o distanță la margine `c1 = 300-500 mm` (superioară adâncimii de ancorare), practica de proiectare curentă indică o capacitate la forfecare cu efect de margine de același ordin de mărime sau superioară capacității la smulgere conică pură — motiv pentru care acest mod de cedare nu este, la configurația geometrică adoptată, cel mai restrictiv, dar **rămâne obligatoriu de confirmat prin raportul software specific ETA** înainte de execuție.

### PTh-R.3.7. Ancorajul unității PCS și al transformatorului — configurații diferențiate

**PCS (PP-01…PP-10):** se adoptă **4 ancore M16 gr. 8.8, hef = 150 mm**, diametru redus proporțional cu forța de calcul mai mică a acestui echipament.

`As(M16) = 157 mm²`. `F_v,Rd = 0,6·800·157/1,25 = 60.288 N ≈ 60,3 kN`; `F_t,Rd = 0,9·800·157/1,25 = 90.432 N ≈ 90,4 kN`.

Forțe de calcul (sever): `V_Ed = Fb/4 = 64,7/4 = 16,2 kN`; `T_Ed ≈ 16,5 kN`.

`V_Ed/F_v,Rd = 16,2/60,3 = 0,27`; `T_Ed/F_t,Rd = 16,5/90,4 = 0,18` — margini ample la cedarea în oțel.

Smulgere conică (`hef = 150 mm`, `hef^1,5 = 150·√150 = 150·12,247 = 1.837,1`): `N0_Rk,c = 11·5·1.837,1 = 101.041 N ≈ 101,0 kN`; `N_Rd,c = 101,0/1,8 = 56,1 kN`; `T_Ed/N_Rd,c = 16,5/56,1 = 0,29` — utilizare confortabilă (29%), semnificativ sub cea a containerelor (47%), consecință directă a masei mai reduse a unității PCS.

**Transformator (PT-01):** configurația de ancorare (**4× M20 gr. 8.8, hef = 180 mm**) se dezvoltă integral la PTh-R.5, împreună cu recalcularea masei la puterea reală de 12,5 MVA.

**Cabina EMS (CE-01):** ancorată similar, la scară redusă, cu **4× M16 gr. 8.8, hef = 150 mm**, verificată la forța de calcul guvernată de vânt (`Fw ≈ 23,2 kN`, `V_Ed = Fw/4 ≈ 5,8 kN`, `T_Ed ≈ 6,0 kN`) — utilizări sub 10% la toate modurile de cedare, dat fiind gabaritul redus al forței guvernante.

### PTh-R.3.8. Sinteza modurilor de cedare — tabel unic pe toate tipurile de ancoraj (amplasamentul sever)

| Echipament | Diametru/hef | V_Ed/F_v,Rd (oțel) | T_Ed/F_t,Rd (oțel) | T_Ed/N_Rd,c (con beton) | Mod guvernant |
|---|---|---|---|---|---|
| Container (PC-01…PC-10) | M24, hef=200mm | 0,30 | 0,20 | **0,47** | smulgere conică beton |
| PCS (PP-01…PP-10) | M16, hef=150mm | 0,27 | 0,18 | 0,29 | smulgere conică beton |
| Transformator (PT-01) | M20, hef=180mm | v. PTh-R.5 | v. PTh-R.5 | v. PTh-R.5 | v. PTh-R.5 |
| Cabină EMS (CE-01) | M16, hef=150mm | < 0,10 | < 0,10 | < 0,10 | oțel (marje foarte ample) |

**Concluzie unitară:** la toate echipamentele cu masă semnificativă (containere, PCS, transformator), modul de cedare guvernant al ancorajului este **smulgerea conică a betonului**, nu cedarea metalurgică a bulonului — aspect cu implicații directe asupra priorităților controlului de calitate la execuție (PTh-R.9, PTh-R.10): calitatea forajului, curățarea completă a găurii, respectarea adâncimii efective de ancorare și a distanței minime la margine sunt, la această tipologie de instalație, cel puțin la fel de importante ca certificarea metalurgică a buloanelor.

### PTh-R.3.9. Detalii constructive suplimentare de execuție

**Șabloane de foraj:** poziția exactă a celor 4 (sau 8) puncte de ancorare se stabilește pe baza planului de amplasare a corner castings furnizat de producătorul de echipament (fișa tehnică/desenul de fundație al containerului contractat), transpus pe un **șablon metalic rigid** (template), fixat provizoriu pe platforma turnată înainte de foraj, pentru a garanta simultan poziția relativă corectă a celor 4 puncte și distanța minimă la margine (≥ 300 mm) verificată la PTh-R.3.4.

**Foraj și curățare:** foraj rotopercutant sau prin percuție, cu diametru conform prescripției producătorului de ancore chimice (tipic `dnom + 4-6 mm` pentru sisteme cu tijă filetată și rășină injectată), urmat de **curățare obligatorie în 4 etape** (suflare cu aer comprimat uscat, periere cu perie metalică de diametrul găurii, suflare secundară, verificare vizuală a absenței prafului rezidual) — etapă critică dat fiind că verificarea la smulgere conică/pull-out (PTh-R.3.4-3.5) presupune o aderență completă rășină-beton pe toată adâncimea efectivă, compromisă de prezența prafului de foraj rezidual.

**Injectare și timp de întărire:** conform fișei tehnice a produsului contractat (temperatură minimă de aplicare, timp de gel, timp de întărire completă înainte de solicitare — tipic 20 min. până la câteva ore, funcție de temperatura ambiantă), cu interdicție explicită de solicitare a ancorajului (montarea/încărcarea containerului) înainte de atingerea rezistenței de proiectare complete.

**Moment de strângere final:** conform specificației producătorului sistemului de ancorare, verificat prin cheie dinamometrică calibrată, cu proces-verbal de recepție (PTh-R.10.3). Șaibe de repartiție și piuliță autoblocantă/contrapiuliță se prevăd sistematic, dat fiind caracterul dinamic al solicitării posibile (evenimente seismice, vibrații de operare ale echipamentului electric).

---

## PTh-R.4 — CAIETUL DE ARMARE (EXTRAS PE FIECARE TIP DE ELEMENT)

### PTh-R.4.1. Sistemul de marcare a barelor de armătură

Fiecare tip de element primește un cod de poziție unic, corelat cu marca elementului (PTh-R.1.2) și cu planurile de cofraj-armare de execuție:

| Prefix poziție | Element | Rol în armătură |
|---|---|---|
| PC-A1/A2 | Platformă container — plasă superioară/inferioară, zonă curentă | armătură principală de încovoiere |
| PC-A3 | Platformă container — plasă majorată sub reazeme de colț | armătură de poansonare |
| PC-A4 | Platformă container — centură perimetrală | rigidizare margine + ancorare plase |
| PP-A1/A2/A3/A4 | Platformă PCS — analog PC-, la scară redusă | idem |
| PT-A1/A2/A3 | Fundație transformator — plase + majorare locală | idem |
| CU-A1/A2 | Cuvă retenție ulei — pereți/radier | armătură de etanșeitate (control fisurare) |
| BZ-A1/A2 | Bazin retenție ape — pereți/radier | armătură de etanșeitate + presiune hidrostatică/teren |
| DR-A1 | Platformă rutieră — plasă unică | armătură de control al fisurării la contracție/trafic |

### PTh-R.4.2. Caietul de armare — platforma-container (PC-01…PC-10), tip

Platformă 7,00 × 3,40 m, grosime 300 mm, acoperire 45 mm (generoasă, compatibilă XF3, cap. 3.1 DTAC).

| Poziție | Diametru/pas | Zonă | Lungime bară | Nr. bare/platformă | Nr. bare/10 platforme |
|---|---|---|---|---|---|
| PC-A1 (plasă inf., dir. lungă) | Ø14/150 | curentă | 6,80 m | 23 | 230 |
| PC-A1 (plasă inf., dir. scurtă) | Ø14/150 | curentă | 3,20 m | 47 | 470 |
| PC-A2 (plasă sup., dir. lungă) | Ø14/150 | curentă | 6,80 m | 23 | 230 |
| PC-A2 (plasă sup., dir. scurtă) | Ø14/150 | curentă | 3,20 m | 47 | 470 |
| PC-A3 (majorare sub reazeme, ambele plase) | Ø16/125 | 1,20×1,20 m sub fiecare colț (4 zone) | 1,20 m | 32/platformă (8/colț × 4) | 320 |
| PC-A4 (centură perimetrală) | 4Ø16 continuu + etrieri Ø8/200 | perimetru (2×7,00+2×3,40=20,80 m) | 20,80 m (4 fire) | 4 fire + 104 etrieri | 40 fire + 1.040 etrieri |

**Masa de armătură per platformă:** PC-A1+A2 (Ø14, 1.400 m total lungime pe platformă, 1,21 kg/m) ≈ 1.694 kg; PC-A3 (Ø16, 32×1,20=38,4 m, 1,58 kg/m) ≈ 61 kg; PC-A4 (4Ø16×20,80=83,2 m, 1,58 kg/m ≈ 131 kg + etrieri Ø8, 104×1,20 m dezvoltat ≈ 125 m × 0,395 kg/m ≈ 49 kg) ≈ 180 kg. **Total per platformă ≈ 1.935 kg; total 10 platforme ≈ 19.350 kg.**

*(Notă de corecție PTh: valoarea recalculată aici pe geometria fină și pe alcătuirea de armare detaliată — 19,35 t pentru cele 10 platforme-container — se folosește ca referință pentru extrasul de materiale de la PTh-R.15, în locul estimării rapide de ordin de mărime din DTAC cap. 16.4.)*

### PTh-R.4.3. Caietul de armare — platforma PCS (PP-01…PP-10), tip

Platformă 3,00 × 2,70 m, grosime 300 mm, acoperire 40 mm.

| Poziție | Diametru/pas | Zonă | Lungime bară | Nr. bare/platformă |
|---|---|---|---|---|
| PP-A1 (plasă inf., ambele direcții) | Ø12/150 | curentă | 2,60-2,90 m | ≈ 38 |
| PP-A2 (plasă sup., ambele direcții) | Ø12/150 | curentă | 2,60-2,90 m | ≈ 38 |
| PP-A3 (majorare sub reazeme) | Ø14/125 | 0,80×0,80 m sub fiecare colț | 0,80 m | 24/platformă |
| PP-A4 (centură perimetrală) | 4Ø14 + etrieri Ø8/200 | perimetru (2×3,00+2×2,70=11,40 m) | 11,40 m | 4 fire + 57 etrieri |

**Masa de armătură per platformă PCS ≈ 640 kg; total 10 platforme ≈ 6.400 kg.**

### PTh-R.4.4. Caietul de armare — fundația transformatorului (PT-01)

Fundație 3,20 × 2,80 m, grosime 350 mm (majorată față de platformele containerelor/PCS, dat fiind punctul de rezemare mai concentrat al unui echipament greu pe o suprafață mai mică, cap. 9.1 DTAC), acoperire 45 mm.

| Poziție | Diametru/pas | Zonă | Observație |
|---|---|---|---|
| PT-A1 (plasă inf.) | Ø16/150 | curentă | ambele direcții |
| PT-A2 (plasă sup.) | Ø16/150 | curentă | ambele direcții |
| PT-A3 (majorare sub reazeme transformator) | Ø18/125 | zonă centrală de rezemare | conform poziției reale a picioarelor cuvei transformatorului, confirmată la execuție |
| PT-A4 (centură perimetrală) | 4Ø18 + etrieri Ø10/200 | perimetru | rigidizare margine |

**Masa de armătură ≈ 950 kg** (fundație unică, 12,6 mp).

### PTh-R.4.5. Caietul de armare — cuva de retenție a uleiului (CU-01)

Structură de tip rezervor îngropat, pereți 250 mm, radier 350 mm (cap. 9.2 DTAC), beton C30/37 XA1, cu cerință severă de limitare a deschiderii fisurilor (≤ 0,2 mm, cap. 15.2 DTAC) — armătură dublă pe toată suprafața pereților și radierului, fără zone slab armate.

| Poziție | Diametru/pas | Element | Observație |
|---|---|---|---|
| CU-A1 (armătură orizontală pereți, ambele fețe) | Ø12/125 | pereți | control fisurare la presiune hidrostatică |
| CU-A2 (armătură verticală pereți, ambele fețe) | Ø12/150 | pereți | încovoiere pereți încastrați la radier |
| CU-A3 (plasă radier, ambele fețe) | Ø14/150 | radier | presiune teren + greutate proprie |
| CU-A4 (bară de continuitate rost radier-pereți, cu waterstop) | Ø12/150 | rost de lucru | etanșare + continuitate structurală |

**Masa de armătură ≈ 920 kg** (volum beton ≈ 7,7 mc — v. PTh-R.5.4).

### PTh-R.4.6. Caietul de armare — bazinul de retenție a apelor de stingere (BZ-01)

Structură de rezervor îngropat, pereți 300 mm, radier 500 mm (dimensionat pentru verificarea UPL, PTh-R.6.3), beton C30/37 XA1/XA2, cu aceeași cerință de limitare a fisurării (≤ 0,2 mm).

| Poziție | Diametru/pas | Element | Observație |
|---|---|---|---|
| BZ-A1 (armătură orizontală pereți, ambele fețe) | Ø14/125 | pereți (H = 2,00 m) | presiune hidrostatică + presiune teren (bazin gol) |
| BZ-A2 (armătură verticală pereți, ambele fețe) | Ø14/150 | pereți | încastrare la radier |
| BZ-A3 (plasă radier, ambele fețe) | Ø16/150 | radier (500 mm) | presiune teren + subpresiune (UPL) |
| BZ-A4 (bară de continuitate rosturi, cu waterstop) | Ø14/150 | rosturi de lucru | etanșare |

**Masa de armătură ≈ 6.780 kg** (volum beton ≈ 61,6 mc — v. PTh-R.6.4).

### PTh-R.4.7. Detalii constructive comune tuturor plaselor de armătură a platformelor de echipament

**Poziționarea la interfața cu ancorajele post-instalate** (cap. 7.6 DTAC, PTh-R.3.9): plasele PC-A1/A2/A3 se dispun astfel încât **niciun capăt de bară să nu intersecteze zona de rezervare a punctelor de ancorare** (marcate prin șabloane, PTh-R.3.9), lăsând un spațiu liber suficient pentru forajul post-instalat fără a secționa armătura existentă — verificare de coordonare obligatorie la faza de armare-turnare (fază determinantă, PTh-R.12.2).

**Ancorarea barelor de centură (PC-A4/PP-A4/PT-A4) la colțuri:** înnădire prin suprapunere conform SR EN 1992-1-1 §8.7, lungime de ancorare `lbd` calculată pentru B500C în beton C25/30/C30/37, cu crampon la 90° la colțurile centurii perimetrale.

**Distanțieri:** distanțieri din material plastic (nu metalici, pentru a evita punți de coroziune la elementele expuse XF3/XA1/XA2) sau din beton de aceeași compoziție ca elementul, la o densitate de minimum 4 buc/mp pentru plasele orizontale și 3 buc/ml pentru armătura verticală a pereților cuvei/bazinului.

---

## PTh-R.5 — FUNDAȚIA TRANSFORMATORULUI ȘI CUVA DE RETENȚIE A ULEIULUI — RECALCUL LA PUTEREA REALĂ (12,5 MVA)

### PTh-R.5.1. Recalcularea masei transformatorului

DTAC (cap. 5.1, 9.1) a folosit, pentru dimensionarea de principiu a fundației, o **valoare medie generică de 20 t (196 kN)**, reprezentativă pentru intervalul larg 10-30 t indicat la cap. 1.2. Memoriul general (cap. 1.1) precizează însă puterea reală a transformatorului ridicător al proiectului: **12,5 MVA**, tensiune 0,8/20 kV. Pentru un transformator trifazat cu ulei mineral de această putere aparentă, masa totală tipică (cuvă + ulei + miez magnetic + înfășurări + radiatoare) se situează, conform practicii curente a producătorilor de echipament electric de medie tensiune, în intervalul **16-20 t** — **se adoptă, pentru recalcularea prezentului capitol, `m = 18.000 kg` (`G = 176,6 kN`)**, valoare ușor sub media generică a intervalului larg din DTAC, dar care se confirmă obligatoriu prin fișa tehnică definitivă a echipamentului contractat, conform recomandării deja formulate în DTAC cap. 17.

### PTh-R.5.2. Recalcularea platformei de rezemare

Platformă `PT-01, 3,20 × 2,80 m` (A ≈ 9,0 mp), grosime 350 mm.

`G_platformă = 8,75 kN/mp · 9,0 mp` (rată identică celei de la containere, majorată proporțional cu grosimea 350 mm față de 300 mm) `≈ 10,2 kN/mp · 9,0 = 91,8 kN` (recalculat la grosimea reală 350 mm: `25 kN/mc · 0,35 m = 8,75 kN/mp`, identic ratei standard, dat fiind că rata de 8,75 kN/mp din DTAC corespundea deja unei grosimi medii de 30 cm — la 35 cm rata devine `25·0,35 = 8,75 kN/mp`... verificare: `25 kN/mc·0,30m=7,5kN/mp` era rata la 30cm; la 35cm rata reală este `25·0,35=8,75kN/mp` — se adoptă, prin urmare, corect **8,75 kN/mp pentru grosimea de 350 mm**, iar platformele containerelor/PCS de 300 mm au, de fapt, o rată proprie de `7,5 kN/mp`, ușor inferioară celei folosite generic în DTAC — corecție minoră de consecvență, fără impact semnificativ asupra verificărilor deja ample de la PTh-R.2).

`G_platformă,PT = 8,75 · 9,0 = 78,75 kN`.

`p_ef = (176,6 + 78,75)/9,0 = 255,35/9,0 = 28,4 kPa`; `p_ef/pconv = 28,4/200 = 0,14` ✓ (14%) — verificare amplu satisfăcută, cu utilizare puțin superioară celei de la containere (11%), consecință firească a unei arii de rezemare mai reduse pentru o încărcare de aceeași ordine de mărime.

### PTh-R.5.3. Recalcularea forței seismice și a ancorajului

`Fb` (bază) `= 1,0·3,269·18.000 = 58.842 N ≈ 58,8 kN`.
`Fb` (sever) `= 1,0·5,395·18.000 = 97.110 N ≈ 97,1 kN`.

`Fv` (sever) `= (2/3)·0,30·9,81·18.000 = 35.316 N ≈ 35,3 kN`.

**Ancoraj adoptat: 4× M20 gr. 8.8, hef = 180 mm** (cap. PTh-R.3.7). Forțe de calcul pe ancoraj (sever): `V_Ed = 97,1/4 = 24,3 kN`; `T_Ed ≈ 24,8 kN`.

`F_v,Rd(M20) = 60,3 kN` → `V_Ed/F_v,Rd = 24,3/60,3 = 0,40`.
`F_t,Rd(M20) = 90,4 kN` → `T_Ed/F_t,Rd = 24,8/90,4 = 0,27`.

Smulgere conică (`hef = 180 mm`, `hef^1,5 = 180·√180 = 180·13,416 = 2.414,9`): `N0_Rk,c = 11·5·2.414,9 = 132.820 N ≈ 132,8 kN`; `N_Rd,c = 132,8/1,8 = 73,8 kN`; `T_Ed/N_Rd,c = 24,8/73,8 = 0,34` — utilizare confortabilă (34%), inferioară celei de la containere (47%), consecvent cu forța de calcul mai redusă și cu adâncimea de ancorare intermediară adoptată pentru acest echipament.

### PTh-R.5.4. Recalcularea volumului cuvei de retenție a uleiului la puterea reală

DTAC (cap. 9.2) a dezvoltat exemplul de calcul al volumului cuvei pentru un transformator de referință de **1.000 kVA** (`V_cuvă ≥ 0,44 mc per 1.000 kVA`, adoptat generic 0,5-1,0 mc/1.000 kVA), semnalând explicit necesitatea recalculării proporționale la puterea reală de 12,5 MVA. Prezentul supliment realizează această recalculare:

`V_ulei ≈ 400 litri/1.000 kVA · 12.500 kVA/1.000 = 5.000 litri = 5,0 mc` (volum de ulei orientativ, la rata medie din DTAC).

`V_cuvă ≥ V_ulei · 1,10 = 5,0 · 1,10 = 5,5 mc` (regulă minimă, 100% ulei + 10% rezervă).

Adoptând, pentru siguranță și pentru variabilitatea reală între producători (raport putere/volum de ulei diferit funcție de tehnologia constructivă — răcire ONAN/ONAF, tip de radiatoare), un coeficient de proiectare **0,7-0,9 mc per 1.000 kVA** (median al intervalului 0,5-1,0 din DTAC): `V_cuvă,proiectare ≈ 0,8 · 12,5 = 10,0 mc`.

**Se adoptă, pentru dimensionarea structurală a cuvei (PT-01/CU-01), un volum interior util de 10,0 mc**, realizat prin geometria de referință `CU-01: 4,00 × 3,00 m plan interior, H = 1,00 m` → volum brut `12,0 mc`, din care volumul util (sub cota de preaplin, cu o rezervă de 0,20 m liber la partea superioară pentru precipitații acumulate înainte de golire) `≈ 10,0 mc` — geometrie confirmată ca satisfăcând cerința recalculată. **Valoarea de 10,0 mc înlocuiește, ca recalculare PTh la puterea reală a proiectului, exemplul ilustrativ de 1.000 kVA din DTAC** — se confirmă obligatoriu, la comanda definitivă a echipamentului, prin fișa tehnică a producătorului (volum de ulei exact al transformatorului de 12,5 MVA contractat), cu ajustare a geometriei cuvei dacă diferența este semnificativă.

### PTh-R.5.5. Verificarea structurală a cuvei — pereți și radier

**Pereți** (250 mm, C30/37 XA1, H = 1,00 m util + 0,20 m gardă): presiune hidrostatică maximă la baza peretelui (ulei, densitate similară apei pentru dimensionare conservativă, `γ ≈ 9,0-10,0 kN/mc`): `p_max = 10,0 · 1,20 = 12,0 kPa`; presiune activă a terenului (bazin gol, exterior): `σ_teren = K0·γ·H = 0,5·19,0·1,20 = 11,4 kPa` — ambele valori moderate, verificate ca plăci verticale încastrate la radier, cu armătura orizontală Ø12/125 (PTh-R.4.5) — moment de încovoiere la încastrare, pentru o placă verticală în consolă cu încărcare triunghiulară: `M_Ed ≈ p_max·H²/6 = 12,0·1,20²/6 = 2,88 kNm/ml` — verificare amplu satisfăcută pentru grosimea de 250 mm cu armătura adoptată (moment capabil al secțiunii, `M_Rd`, net superior acestei valori reduse, calculul detaliat de secțiune fiind o verificare de rutină, fără marje critice).

**Radier** (350 mm): presiune pe teren rezultată din greutatea proprie a cuvei goale + ulei + eventuală apă pluvială acumulată: `p_ef ≈ (G_pereți+G_radier+G_ulei)/A_radier`, valoare mult sub `pconv = 200 kPa`, dat fiind caracterul de element cu încărcare gravitațională moderată (analog constatării din DTAC cap. 9.2), fără riscuri de poansonare sau concentrare punctuală.

**Proba de etanșeitate** — obligatorie, umplere cu apă minimum 24 ore, fără pierdere vizibilă de nivel (cap. PTh-R.13.2).

---

## PTh-R.6 — BAZINUL DE RETENȚIE A APELOR DE STINGERE — PROIECTARE STRUCTURALĂ DETALIATĂ

### PTh-R.6.1. Volumul de proiectare — ipoteză ilustrativă, cu recomandare fermă de confirmare prin SSI

Conform DTAC (cap. 10.1), volumul necesar al bazinului de retenție rezultă exclusiv din scenariul de incendiu de proiectare stabilit de studiul de siguranță la incendiu (SSI) — debit de răcire/stingere adoptat × durata de intervenție de proiectare — și **nu poate fi recalculat generic** de prezentul memoriu de rezistență, sub riscul unei valori inventate, fără fundament tehnic verificabil. Pentru a permite, totuși, dezvoltarea completă a proiectării structurale a bazinului la faza PTh (dimensionare pereți/radier, verificare UPL, armătură), se adoptă, **strict ca ipoteză de lucru ilustrativă pentru metodologia de calcul, clar identificată ca atare și NU ca valoare normativă sau ca substitut al scenariului SSI**, un volum de proiectare `V = 150 mc` (compatibil, orientativ, cu un debit combinat de răcire/stingere de ordinul a 250 mc/oră susținut timp de aproximativ 36 de minute, sau cu orice altă combinație debit-durată care ar rezulta din scenariul real al SSI). **Valoarea definitivă, obligatorie pentru execuție, se preia fără nicio abatere din scenariul de incendiu finalizat de SSI** — dacă acesta rezultă într-un volum diferit, geometria bazinului de la PTh-R.1.2/PTh-R.6.2 se recalculează proporțional, păstrând metodologia de verificare identică.

### PTh-R.6.2. Geometria adoptată și verificarea capacității

`BZ-01: 10,00 × 8,00 m plan interior, H = 2,00 m` → volum brut `160,0 mc`, din care volum util (sub cota de preaplin, cu gardă de 0,20 m) `≈ 144,0 mc` — apropiat de ipoteza de proiectare de 150 mc (marjă de -4%, acceptabilă la nivel de PTh, cu ajustare fină a înălțimii utile la +0,05 m dacă volumul de proiectare SSI confirmă exact 150 mc, sau recalculare completă a geometriei dacă SSI indică un volum sensibil diferit).

### PTh-R.6.3. Verificarea la subpresiune (UPL) — calcul complet, fază critică de execuție

Verificare conform SR EN 1997-1 §2.4.7.4, în faza critică (bazin gol, imediat după finalizarea structurii, înainte de umplerea cu apă — cap. 10.3 DTAC):

**Greutatea stabilizatoare** (structură goală): radier `80,0 mp · 0,50 m · 25 kN/mc = 1.000 kN`; pereți (perimetru `2·(10,00+8,00) = 36,0 m`, înălțime 2,00 m, grosime 0,30 m): `36,0·2,00·0,30·25 = 540 kN`. `G_stab = 1.000 + 540 = 1.540 kN`.

**Forța de subpresiune** `U = γ_apă·hw·A_bazin`, cu `A_bazin = 80,0 mp`:

| Nivel hidrostatic ipotetic (hw) | U [kN] | G_stab·γG,stab/(U·γG,dst), cu γG,stab=0,9, γG,dst=1,0 | Rezultat |
|---|---|---|---|
| 1,0 m (amplasament tipic, NH moderat-adânc) | 10·1,0·80 = **800** | 1.540·0,9/800 = 1.386/800 = **1,73** | ✓ marjă amplă |
| 2,0 m (submersie completă a radierului, amplasament cu NH ridicat) | 10·2,0·80 = **1.600** | 1.386/1.600 = **0,87** | ✗ insuficient |

**Rezultat și decizie de proiectare:** la un amplasament cu nivel hidrostatic tipic, moderat-adânc (situația uzuală pentru amplasamentele extravilane ale instalațiilor BESS, cap. 4.4 DTAC), verificarea UPL este **amplu satisfăcută (γ = 1,73)** cu radierul de 500 mm adoptat generic. **La un amplasament cu nivel hidrostatic ridicat, confirmat explicit de studiul geotehnic de detaliu**, verificarea UPL **nu este satisfăcută** cu grosimea de radier standard, impunând, la faza PT/execuție, una din următoarele soluții alternative (decizie care revine proiectantului, pe baza nivelului hidrostatic real): **(a)** majorarea grosimii radierului (fiecare 100 mm suplimentari adaugă aproximativ 200 kN greutate stabilizatoare, la aria de 80 mp); **(b)** prevederea de ancore de tracțiune în teren (micropiloți/ancore injectate, dimensionate la diferența de forță netă); **(c)** un sistem de drenaj/epuisment permanent care să mențină nivelul hidrostatic sub cota critică pe toată durata de exploatare (soluție cu mentenanță pe termen lung, mai puțin robustă decât primele două). **Recomandarea fermă a prezentului supliment este verificarea explicită a nivelului hidrostatic real, prin foraje dedicate în zona bazinului, înainte de finalizarea proiectului tehnic al acestui element** — o eventuală subestimare a nivelului hidrostatic ar conduce la un risc real de plutire a bazinului gol, cu consecințe grave asupra integrității structurii chiar înainte de punerea în funcțiune.

### PTh-R.6.4. Estimarea volumului de beton și armătură (geometria adoptată)

Radier: `80,0 mp · 0,50 m = 40,0 mc`. Pereți: `36,0 m · 2,00 m · 0,30 m = 21,6 mc`. **Total beton bazin ≈ 61,6 mc** (C30/37, XA1/XA2), cu armătură estimată la **≈ 6.780 kg** (PTh-R.4.6), rată de armare `≈ 110 kg/mc`, majorată față de o structură obișnuită de beton armat, dat fiind criteriul sever de limitare a deschiderii fisurilor (≤ 0,2 mm) impus de rolul de contenție a lichidelor.

### PTh-R.6.5. Interfața cu separatorul de hidrocarburi și cu instalațiile (trimitere)

Interfața structurală cu separatorul de hidrocarburi (cameră de vizitare, conductă de legătură) și cu instalațiile de detecție/pompare aferente sistemului de stingere se coordonează integral la capitolul PTh-R.11 (coordonare cu instalațiile electrice și, prin extensie, cu instalațiile sanitare/PSI ale proiectului).

---

## PTh-R.7 — PLATFORMA RUTIERĂ ȘI CULOARELE DE INTERVENȚIE — DIMENSIONARE PORTANTĂ DETALIATĂ

### PTh-R.7.1. Alcătuirea adoptată

**Sistem rutier rigid**, pe traseul principal de intervenție ISU (culoarul de 6,0 m dintre rândurile de containere și drumul perimetral inelar): **dală de beton armat C25/30, grosime 200 mm**, pe fundație de balast compactat 250 mm (`≥ 98% Proctor normal`, identic cerinței de la platformele de echipament, cap. 6.1 DTAC), cu plasă unică de armătură **Ø10/200 mm, ambele direcții, la mijlocul secțiunii** (armătură de control al fisurării din contracție/variație termică și din solicitarea de trafic, nu armătură principală de rezistență — grosimea de 200 mm, verificată mai jos, lucrează în principal ca placă pe mediu elastic, nu ca element încovoiat clasic).

### PTh-R.7.2. Verificarea portanței — metoda distribuției simplificate a presiunii (Boussinesq/45°)

Se verifică transmiterea presiunii de contact a roții celei mai defavorabile a autospecialei ISU (masă totală ≥ 26 t, osie ≥ 10 t, cap. 5.2 DTAC) prin grosimea dalei rutiere, până la terenul de fundare — metodologie de distribuție simplificată identică celei folosite deja în DTAC cap. 13.2 pentru protecția mecanică a trenchurilor de cabluri.

**Încărcare de calcul pe roată:** osie `100 kN` (10 t) → sarcină pe roată (jumătate de osie, configurație dublă) `≈ 50 kN`, majorată cu factorul de impact dinamic pentru trafic pe pavaj rigid `1,15` → `P = 57,5 kN`.

**Suprafața de contact a pneului:** la o presiune tipică de umflare a pneurilor grele `≈ 700 kPa`, aria de contact necesară `A = P/presiune = 57.500/700.000 = 0,0821 mp`, echivalentă unei suprafețe circulare de rază `a = √(A/π) = √(0,0821/3,1416) = 0,162 m ≈ 162 mm`.

**Distribuție la 45° prin grosimea dalei** (`h = 200 mm`): raza efectivă la fața inferioară a dalei `a_ef = a + h = 162 + 200 = 362 mm`; aria efectivă `A_ef = π·0,362² = 0,412 mp`.

**Presiune transmisă la nivelul terenului de fundare (sub stratul de balast):** `p = P/A_ef = 57.500/0,412 = 139.600 Pa ≈ 139,6 kPa`.

`p/pconv = 139,6/200 = 0,70` ✓ — verificare satisfăcută, cu o utilizare de **70%**, marjă mai restrânsă decât la platformele de echipament (11-19%), dar acceptabilă pentru un element cu solicitare tranzitorie/ocazională (trecerea autospecialei ISU, nu o încărcare permanentă) — grosimea de 200 mm este, prin urmare, **minimul recomandat** pentru traseul principal de intervenție; o eventuală reducere sub această valoare nu se recomandă, dat fiind marja deja restrânsă.

### PTh-R.7.3. Zona de manevră/întoarcere a autospecialelor

Platformă de manevră (12×12 m sau buclă echivalentă, cf. memoriului de arhitectură), cu aceeași alcătuire (dală rigidă 200 mm), dar cu o **atenție suplimentară la oboseala de suprafață** dată de manevrele repetate (viraje, frânări), care introduc forțe orizontale tangențiale la suprafața de rulare, nepreluate de verificarea de portanță verticală de mai sus — se recomandă, pentru această zonă specifică, o **armătură de suprafață dublă** (plasă la partea superioară, în plus față de plasa de la mijlocul secțiunii, cf. PTh-R.7.1), pentru controlul fisurării de suprafață indusă de eforturile tangențiale repetate.

### PTh-R.7.4. Traseele secundare de mentenanță curentă

Pe traseele secundare (acces de mentenanță ușoară, nu expuse traficului ISU), se poate adopta un **sistem rutier flexibil** (fundație de balast + strat de bază + îmbrăcăminte asfaltică ușoară), cu grosimi reduse proporțional cu solicitarea de trafic mult inferioară — decizie de optimizare economică, fără implicații asupra siguranței, dat fiind că accesul de intervenție ISU rămâne garantat exclusiv de traseul principal rigid (PTh-R.7.1-7.2).

### PTh-R.7.5. Interfața cu platformele de echipament și cu trenchurile

**Rosturi la interfața cu platformele individuale** (cap. 12 DTAC): rost constructiv complet (fără conexiune structurală), cu bandă de etanșare la partea superioară pentru a preveni infiltrarea apei la interfața celor două sisteme cu comportare la tasare diferită. **Traversările trenchurilor de cabluri** (cap. 13.3 DTAC) sub această dală se protejează suplimentar prin placa de repartiție deja prevăzută în DTAC, verificată acum la sarcina de calcul recalculată de mai sus (`P = 57,5 kN`, majorată cu factor de impact) — verificare de compatibilitate confirmată, dat fiind că placa de repartiție distribuie sarcina pe o suprafață și mai mare înainte de a ajunge la elementul de protecție a cablurilor.

---

## PTh-R.8 — TEHNOLOGIA DE EXECUȚIE A LUCRĂRILOR DE BETON

### PTh-R.8.1. Terasamente și pregătirea terenului de fundare

**Decapare strat vegetal** pe toată suprafața platformelor, până la stratul de argilă prăfoasă/nisip argilos consistent (adâncime ≈ 0,40 m, cap. 4.4 DTAC), cu evacuarea integrală a pământului vegetal în afara amprentei construite (interzisă reutilizarea sub platforme, chiar compactat, dat fiind conținutul organic care compromite pe termen lung capacitatea portantă). **Verificarea naturii terenului** la cota de fundare (`Df = 0,80-1,10 m`), prin confruntare directă, la fața locului, cu profilul din studiul geotehnic (cap. 4.4 DTAC) — condiție de fază determinantă (PTh-R.12.1).

**Așternerea și compactarea stratului de balast/piatră spartă** (grosime 300-500 mm, funcție de element, cap. 6.1 DTAC): așternere în straturi succesive de maximum 200-250 mm grosime înainte de compactare (grosimea maximă compactabilă eficient cu utilaje de șantier uzuale — compactor cu rulou vibrator sau placă vibrantă pentru zonele restrânse de lângă marginile cofrajului), cu verificarea gradului de compactare **≥ 98% Proctor normal** prin încercări de placă (modul de deformație `Ev2`) sau prin metode echivalente (densitate în situ), la fiecare strat, nu doar la stratul final — condiție critică pentru limitarea tasărilor diferențiale (cap. 6.4 DTAC), verificată explicit la faza determinantă FD2 (PTh-R.12.2).

**Geotextil de separație**, prevăzut sub stratul de balast acolo unde natura terenului (conținut fin, risc de migrare a particulelor fine în stratul granular sub trafic/vibrație repetată) o impune, conform recomandării studiului geotehnic definitiv.

**Stratul de egalizare din beton simplu C8/10** (grosime 50-100 mm), turnat direct pe stratul de balast compactat, cu rol de suprafață de lucru curată și plană pentru trasarea și cofrarea ulterioară — nu are rol structural, ci exclusiv de execuție.

### PTh-R.8.2. Cofrarea

Cofraje metalice sau din lemn tratat, dimensionate la presiunea betonului proaspăt (funcție de viteza de turnare și de temperatura betonului, conform NE 012-2/2010), cu **etanșare riguroasă la rosturile de cofraj** (esențial la elementele cu cerință de aspect/etanșeitate ridicată — cuvă, bazin, unde scurgerile de lapte de ciment prin rosturile de cofraj ar compromite calitatea suprafeței de contact cu hidroizolația ulterioară). **Poziționarea șabloanelor de ancoraj** (PTh-R.3.9) se fixează rigid de cofraj sau de armătură, cu verificare topografică a poziției **înainte** de turnare — punct de control critic, dat fiind că orice eroare de poziție a rezervării/șablonului nu mai poate fi corectată economic după întărirea betonului (recomandare: dublă verificare, de către echipa de execuție și, independent, de reprezentantul dirigintelui de șantier, cu consemnare scrisă).

### PTh-R.8.3. Armarea

Montarea armăturii conform caietului de armare (PTh-R.4), cu **distanțieri** care garantează acoperirea minimă de proiectare (45 mm la elementele exterioare XF1/XF3, cap. 3.1 DTAC), verificată prin măsurare directă înainte de turnare (nu doar prin poziționarea vizuală a distanțierilor). **Legarea armăturii** cu sârmă de legat sau cu cleme, la toate intersecțiile plaselor din zona de poansonare (PC-A3, majorare sub reazeme) și la centura perimetrală (PC-A4), unde stabilitatea geometrică a armăturii în timpul turnării este mai critică. **Coordonarea cu ancorajele post-instalate** (PTh-R.4.7): verificare vizuală, înainte de turnare, a absenței oricărei intersecții între armătură și zona de rezervare a punctelor de ancorare, marcată prin șabloane.

### PTh-R.8.4. Turnarea betonului

**Condiții de turnare:** temperatura betonului proaspăt la punerea în operă între +5°C și +30°C (conform NE 012-2/2010), cu măsuri suplimentare de protecție pe timp friguros/călduros (PTh-R.8.6). **Timpul maxim de transport** de la stația de betoane la punctul de turnare, funcție de temperatura ambiantă și de aditivii de întârziere folosiți, verificat astfel încât betonul să nu depășească timpul de priză inițială înainte de compactare completă.

**Secvența de turnare:** la platformele individuale (container, PCS, transformator), turnare continuă într-o singură etapă (fără rosturi de lucru intermediare, dat fiind dimensiunea redusă a fiecărei platforme — cap. 6.5 DTAC), pentru a evita orice discontinuitate structurală care ar putea compromite comportarea de corp rigid necesară limitării tasării diferențiale. La elementele mai mari (cuvă, bazin, drum), turnarea se realizează pe tronsoane, cu **rosturi de lucru poziționate strategic** (nu în zonele de moment maxim), prevăzute cu bandă de etanșare (waterstop) la cuvă și bazin (cap. 9.2, 10.2 DTAC) și cu goujon-uri de transfer de sarcină la drumul rutier.

**Vibrarea/compactarea betonului proaspăt:** vibrare internă cu pervibrator, la o frecvență și un timp de aplicare care asigură eliminarea completă a aerului antrenat necontrolat (distinct de aerul antrenat controlat prin aditiv, 4-6%, prevăzut la elementele XF1/XF3, cap. 3.5 DTAC) și umplerea completă a cofrajului, inclusiv în zonele dens armate (majorare sub reazeme de colț, centură perimetrală). **Atenție specifică la zona de rezervare a ancorajelor** — se evită vibrarea excesivă/prelungită în imediata vecinătate a șabloanelor, care ar putea provoca deplasarea acestora.

### PTh-R.8.5. Tratarea (curing) betonului

**Protecția suprafeței proaspăt turnate** împotriva evaporării premature a apei de amestecare (esențială pentru atingerea rezistenței de proiectare și pentru limitarea fisurării de contracție plastică, în special la elementele masive cu suprafață mare expusă — platforme, drum, radier bazin): acoperire cu prelate/folie de polietilenă sau aplicare de produs de cură pe bază de rășină, imediat după finisarea suprafeței, menținută **minimum 7 zile** (sau conform curbei de dezvoltare a rezistenței, la temperaturi reduse, perioadă extinsă). **Stropirea periodică cu apă**, ca alternativă/completare, la elementele fără produs de cură aplicat, cu frecvență care evită atât uscarea, cât și șocul termic (apă la temperatură apropiată de cea a betonului).

### PTh-R.8.6. Execuție pe timp friguros/călduros

**Timp friguros** (temperatură ambiantă sub +5°C): utilizarea de ciment cu întărire rapidă sau aditivi acceleratori, protecție termică a cofrajului și a suprafeței expuse (izolație termică temporară, folii cu bule de aer sau echivalent), interzicerea turnării la temperaturi sub −5°C fără măsuri suplimentare de încălzire a componentelor betonului (apă, agregate) și a mediului de turnare, monitorizare a temperaturii betonului proaspăt pe toată durata de întărire critică (primele 72 de ore).

**Timp călduros** (temperatură ambiantă peste +30°C sau radiație solară directă intensă): răcirea componentelor betonului (apă cu gheață, agregate umbrite), turnare în orele mai răcoroase ale zilei, protecție imediată a suprafeței împotriva evaporării rapide (parasolare temporare, aplicare imediată a produsului de cură), atenție specifică la elementele cu suprafață mare expusă (platforme, drum, radier bazin), unde riscul de fisurare din contracție plastică este cel mai ridicat.

---

## PTh-R.9 — CONTROLUL CALITĂȚII MATERIALELOR ȘI AL EXECUȚIEI

### PTh-R.9.1. Controlul betonului

**Recepția materialelor componente:** certificate de calitate pentru ciment (conform SR EN 197-1), agregate (conform SR EN 12620, granulometrie și absența materiilor organice/argiloase), apă de amestecare (conform SR EN 1008) și aditivi (fluidizanți, întârzietori/acceleratori, antrenor de aer la elementele XF1/XF3), cu trasabilitate păstrată de la furnizor la punctul de turnare.

**Controlul betonului proaspăt, la fiecare transport:** consistență (tasare con Abrams, conform clasei de consistență de proiect, tipic S3-S4 pentru platforme cu armătură densă), temperatură (limite PTh-R.8.6), conținut de aer antrenat la elementele XF1/XF3 (4-6%, verificat cu aerometru), densitate.

**Prelevarea de epruvete:** minimum o serie de 3 cuburi/cilindri la fiecare 50 mc turnați sau la fiecare zi de turnare (oricare frecvență este mai deasă), prelevate separat pentru fiecare tip de element (platforme container/PCS, fundație transformator, cuvă, bazin, drum), cu încercare la 28 de zile conform NE 012-1/2007, criteriu de acceptare `fck` conform clasei de proiect (C25/30 sau C30/37, cap. 3.1 DTAC). La elementele XA1/XA2 (cuvă, bazin), verificare suplimentară a raportului A/C efectiv (`≤ 0,50`) și, dacă e cazul, a prezenței și dozajului aditivilor hidrofugi de masă.

**Controlul suplimentar la elementele de etanșare** (cuvă, bazin): verificare a absenței segregării la turnare (control vizual la decofrare), verificare a continuității benzilor de etanșare la rosturile de lucru (control vizual + fotografic, înainte de acoperirea cu straturi ulterioare de beton).

### PTh-R.9.2. Controlul armăturii

Certificate de calitate B500C pentru toate loturile, cu verificare a clasei de ductilitate C (`εuk ≥ 7,5%`) prin buletine de încercare. Control dimensional și de poziționare (diametre, pas, acoperire) conform caietului de armare (PTh-R.4), cu verificare **înainte de turnare** — punct de control obligatoriu, imposibil de remediat ulterior fără demolare.

### PTh-R.9.3. Controlul ancorajelor (trimitere)

Controlul complet al execuției ancorajelor post-instalate (foraj, curățare, injectare, moment de strângere) se detaliază la capitolul PTh-R.10, dedicat integral acestei operațiuni critice a documentației (cap. PTh-R.3.4, 3.8 — modul de cedare guvernant al ancorajului este smulgerea conică a betonului, ceea ce face din calitatea execuției forajului un factor determinant, nu doar o formalitate).

### PTh-R.9.4. Controlul hidroizolației

Certificat de conformitate al membranei/sistemului de hidroizolație adoptat pentru cuvă (CU-01) și bazin (BZ-01), verificarea aplicării corecte a benzilor de etanșare la toate rosturile de lucru înainte de acoperirea acestora cu straturi ulterioare (control fotografic obligatoriu, cu arhivare în cartea tehnică a construcției), verificare a continuității hidroizolației la traversările de conducte/tubulatură (interfața cu separatorul de hidrocarburi, PTh-R.6.5).

### PTh-R.9.5. Toleranțe geometrice de execuție

| Element | Toleranță | Metodă de control |
|---|---|---|
| Cotă de fundare (talpă platformă) | ±20 mm | nivelment topografic |
| Grosime platformă/radier | −0 / +20 mm (nu se admite subdimensionare) | măsurare la cofrare + verificare la decofrare |
| Poziție în plan a platformei | ±20 mm față de axele de trasare | control topografic |
| Planeitate suprafață finită platformă | ≤ 5 mm/2 m | dreptar + pană de măsurare |
| Poziție șablon de ancoraj (înainte de turnare) | ±5 mm | control topografic dublu (execuție + diriginte) |
| Grosime pereți cuvă/bazin | −0 / +15 mm | măsurare la cofrare |
| Panta de scurgere platformă (≥ 1%, cap. 2.3 DTAC) | ±0,2% | nivelment |

---

## PTh-R.10 — EXECUȚIA ȘI CONTROLUL ANCORAJELOR POST-INSTALATE — PROCEDURĂ DETALIATĂ

### PTh-R.10.1. Etapele procedurii de instalare

1. **Poziționarea containerului/echipamentului** pe platforma finalizată (turnată, decofrată, cu rezistență minimă atinsă conform buletinelor de încercare), în poziția definitivă stabilită de planul de amplasare.
2. **Marcarea găurilor de ancorare** prin șablonul furnizat de producătorul echipamentului (corner castings, conform poziției reale, nu doar teoretice — se admit, la ISO 1161, mici variații între furnizori, motiv pentru care marcarea se face DUPĂ poziționarea reală a echipamentului, nu pe baza planului generic).
3. **Forajul**, cu diametru și adâncime conform fișei tehnice a produsului de ancorare contractat (`hef = 200 mm` pentru containere, cap. PTh-R.3.1), verificat cu opritor de adâncime pe echipamentul de foraj.
4. **Curățarea găurii** — procedură în 4 etape (suflare, periere, suflare, verificare vizuală, cap. PTh-R.3.9), cu consemnare a fiecărei etape în fișa de execuție a fiecărui ancoraj (nu doar la nivel de platformă, ci per gaură individuală, dat fiind caracterul critic al acestei operațiuni pentru modul de cedare guvernant, PTh-R.3.4).
5. **Injectarea adezivului/rășinii chimice**, conform fișei tehnice (cantitate, timp de aplicare înainte de introducerea tijei filetate).
6. **Introducerea tijei filetate**, cu rotație controlată (fără vibrație excesivă, care ar putea introduce goluri de aer în rășină), și respectarea timpului de repaus înainte de orice solicitare.
7. **Așteptarea timpului de întărire completă** conform temperaturii ambiante și fișei tehnice a produsului — interdicție explicită de montare a piuliței cu strângere finală sau de aplicare a oricărei sarcini înainte de acest interval.
8. **Montarea șaibei de repartiție și a piuliței**, cu strângere la momentul de control specificat de producătorul sistemului de ancorare, verificată prin cheie dinamometrică calibrată.
9. **Marcarea vizuală de control** (vopsea/creion) pe piuliță și tijă, pentru verificarea ulterioară a absenței slăbirii (referință pentru inspecțiile din programul de urmărire în timp, PTh-R.14).

### PTh-R.10.2. Controlul calității la fiecare etapă

| Etapă | Control | Frecvență |
|---|---|---|
| Poziția găurilor forate | verificare față de șablon (±5 mm) | 100% |
| Adâncimea de foraj | măsurare directă cu opritor/tijă gradată | 100% |
| Curățarea găurii | verificare vizuală + fotografică | 100% |
| Lotul de adeziv chimic | certificat de conformitate + verificare dată expirare | fiecare lot |
| Temperatura la instalare | măsurare, comparație cu limitele fișei tehnice | fiecare zi de montaj |
| Timp de întărire respectat | consemnare oră injectare + oră prima solicitare | 100% |
| Moment de strângere final | cheie dinamometrică calibrată, cu certificat de etalonare valabil | 100% |
| Verificare vizuală finală (deteriorare filet, fisurare locală beton la montaj) | inspecție vizuală | 100% |

### PTh-R.10.3. Documentația de execuție

Pentru fiecare platformă, se întocmește o **fișă individuală de ancoraj** (4 sau 8 fișe/platformă, per punct de ancorare), semnată de executant și de reprezentantul dirigintelui de șantier, consemnând: poziția, adâncimea de foraj, ora curățării, lotul de adeziv folosit, ora injectării, ora montării tijei, ora strângerii finale, valoarea momentului de strângere aplicat. Aceste fișe se arhivează în **Cartea Tehnică a Construcției**, ca document de bază pentru orice inspecție ulterioară (PTh-R.14) sau pentru orice investigație post-eveniment (seismic sau termic, cap. 11.4 DTAC).

### PTh-R.10.4. Raportul de calcul software specific ETA — condiție prealabilă obligatorie

Așa cum s-a subliniat la PTh-R.3.5-3.6, **verificarea completă a tuturor modurilor de cedare guvernate de parametrii specifici ai produsului de ancorare** (pull-out, edge breakout la forfecare, coeficienți exacți `k1`/`γMc` pentru smulgerea conică) se realizează, obligatoriu, prin raportul de calcul software al producătorului de ancore, pentru configurația exactă contractată (diametru, adâncime, tip de rășină, stare a betonului — fisurat/nefisurat). **Acest raport constituie o condiție prealabilă obligatorie a fazei determinante de instalare a ancorajelor** (PTh-R.12.2, FD-04) — execuția nu poate începe fără acest raport, semnat de un tehnician calificat al furnizorului de ancore sau de proiectantul de structură pe baza software-ului licențiat al produsului contractat.

---

## PTh-R.11 — COORDONAREA CU INSTALAȚIILE ELECTRICE ȘI CU TEHNOLOGIA FURNIZORULUI DE ECHIPAMENT

### PTh-R.11.1. Poziționarea ancorajelor — coordonare obligatorie cu fișa tehnică a furnizorului

Așa cum s-a subliniat în DTAC (cap. 2.1) și reluat la PTh-R.3, poziția exactă a punctelor de ancorare (corner castings) este o dată de intrare furnizată de **producătorul echipamentului electric** (container, PCS, transformator), nu o decizie autonomă a proiectantului de structură. Coordonarea dintre specialitatea de structură și specialitatea electrică/tehnologică se realizează, la faza PTh, prin: **(a)** transmiterea, de la furnizorul de echipament (contractat sau în curs de selecție), a desenului de fundație/planului de rezemare cu poziția exactă a reazemelor, toleranțele admise și forța admisibilă pe fiecare reazem; **(b)** verificarea, de către proiectantul de structură, a compatibilității acestor date cu geometria de referință adoptată la PTh-R.1.2 (recalculare completă dacă masa sau poziția reazemelor diferă semnificativ, conform regulii de la Anexa B); **(c)** transmiterea către antreprenorul general a șabloanelor de foraj definitive, generate DUPĂ confirmarea contractuală a furnizorului de echipament, nu pe baza unor presupuneri generice.

### PTh-R.11.2. Trenchurile de cabluri — integrare cu armătura platformelor

Traseele de cabluri de medie tensiune și de curent continuu între containere, PCS și stația de racordare (cap. 13 DTAC) traversează, în anumite configurații de amplasare, zona periferică a platformelor de echipament — coordonarea cu specialitatea electrică impune: **(a)** stabilirea, înainte de armarea platformelor (PTh-R.4), a poziției exacte a oricărei penetrări/traversări prin platformă sau prin centura perimetrală, pentru a evita secționarea armăturii principale; **(b)** prevederea de goluri/manșoane de trecere pre-poziționate la turnare, dimensionate cu o marjă suficientă pentru numărul de cabluri proiectat plus o rezervă de extindere (conform memoriului de instalații electrice); **(c)** verificarea, prin calcul, a compensării locale de armătură în jurul oricărei penetrări cu diametru semnificativ (analog principiului de compensare a golurilor din plăci, SR EN 1992-1-1 §9.3), dacă traversarea intersectează zona de majorare a armăturii de poansonare (PC-A3).

### PTh-R.11.3. Prizele de legare la pământ — interfața cu structura de beton

Sistemul de legare la pământ al instalației (electrozi de suprafață/adâncime, rețea de echipotențializare între containere, PCS, transformator și stația de conexiune) interacționează cu infrastructura civilă prin: **(a)** eventuala înglobare a unor conductoare de echipotențializare în radierul platformelor (decizie a memoriului de instalații electrice, coordonată cu proiectantul de structură pentru a evita orice conflict cu armătura structurală sau cu ancorajele); **(b)** continuitatea electrică a armăturii platformelor, dacă proiectul de instalații electrice prevede folosirea armăturii ca electrod de fundație (Fundamenterder, practică uzuală la instalații electrice de medie tensiune) — soluție care impune, la execuție, legarea continuă (electric, nu doar structural) a tuturor plaselor de armătură ale fiecărei platforme și prevederea de puncte de racord accesibile (borne de test) la centura perimetrală, coordonate explicit cu memoriul de instalații electrice, care rămâne responsabil de dimensionarea completă a sistemului de legare la pământ.

### PTh-R.11.4. Secvențierea execuției structură-electric

Programul de execuție integrat (structură + electric) urmează secvența: **(1)** finalizarea completă a platformei de beton (turnare, decofrare, atingerea rezistenței minime necesare) → **(2)** pozarea trenchurilor/duct-bank-urilor și a rețelei de legare la pământ îngropate → **(3)** poziționarea definitivă a echipamentului (container/PCS/transformator) → **(4)** marcarea și execuția ancorajelor post-instalate (PTh-R.10) → **(5)** conectarea electrică a echipamentului (cabluri de putere, cabluri de semnal BMS/EMS, legare la pământ) → **(6)** probele electrice de punere în funcțiune, coordonate cu specialitatea electrică, care nu fac obiectul prezentului memoriu de rezistență. Această secvență minimizează riscul de conflict fizic între execuția civilă (care necesită acces neîngrădit pentru utilaje de turnare/compactare) și montajul electric (care necesită poziționarea finală, fixă, a echipamentului).

### PTh-R.11.5. Procedura de recalculare la schimbarea furnizorului de echipament

Dacă, între faza PTh și faza de execuție, se schimbă furnizorul de echipament contractat (situație posibilă, dat fiind ciclul de achiziție al unui proiect BESS), se impune, obligatoriu, **reverificarea integrală a capitolelor PTh-R.2 și PTh-R.3** pe baza noii fișe tehnice (masă reală, poziția reazemelor, forța admisibilă pe reazem a noului echipament) — procedură rapidă, dat fiind că metodologia de calcul (formulele, coeficienții, grupările de acțiuni) rămâne identică, doar valorile de intrare (masa `m`, geometria `h_cg`/`b/2`) se înlocuiesc, conform regulii complete de recalculare de la Anexa B. **Platformele deja turnate, dar cu ancorajele neinstalate încă**, rămân, în marea majoritate a cazurilor, compatibile cu un echipament de masă similară (aceeași clasă de container ISO 20ft, de exemplu), verificarea de la PTh-R.2.2 fiind, prin construcție, deja acoperitoare pentru variații moderate de masă (rezervele de 19-77% identificate la presiune teren/poansonare/tasare); **o schimbare de gabarit** (de exemplu, de la container 20ft la 40ft) impune, în schimb, o platformă complet nouă, de dimensiuni diferite (varianta alternativă tratată generic în DTAC cap. 1.2, 2.2).

---

## PTh-R.12 — FAZELE DETERMINANTE ALE EXECUȚIEI

| Nr. | Faza determinantă | Verificări/criterii | Participanți |
|---|---|---|---|
| FD-01 | Natura terenului de fundare (cotă săpătură, toate platformele + cuvă + bazin) | Confruntare cu studiul geotehnic; `pconv = 200 kPa` confirmată; absența umpluturilor/pungilor slabe; cota `Df` conform proiect | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD-02 | Compactarea stratului de balast sub fiecare platformă | Grad de compactare `≥ 98% Proctor normal`, verificat prin încercări de placă/densitate în situ, la fiecare strat | Proiectant, diriginte, constructor, ISC |
| FD-03 | Armarea și poziționarea șabloanelor de ancoraj, ÎNAINTE de turnare | Diametre, poziții, acoperire, poziția șabloanelor de ancoraj (±5 mm, control topografic dublu, PTh-R.10.2) | Proiectant, diriginte, constructor, ISC |
| FD-04 | Instalarea ancorajelor post-instalate — punct de control critic al întregii documentații | Diametru, adâncime efectivă, curățare conform procedurii, timp de întărire respectat, moment de strângere final, **raportul de calcul software ETA prezentat în prealabil** (PTh-R.10.4) | Proiectant, verificator tehnic atestat, diriginte, constructor |
| FD-05 | Armarea și turnarea cuvei de retenție a uleiului (înainte de turnare) | Continuitatea armăturii, benzi de etanșare la rosturi de lucru, poziția penetrărilor pentru separatorul de hidrocarburi | Proiectant, diriginte, constructor, ISC |
| FD-06 | Proba de etanșeitate a cuvei de ulei | Umplere cu apă, minimum 24 ore, fără pierdere vizibilă de nivel | Proiectant, diriginte, constructor |
| FD-07 | Armarea și turnarea bazinului de retenție a apelor de stingere (înainte de turnare) | Continuitatea armăturii, benzi de etanșare, verificare grosime radier (500 mm, cerință UPL, PTh-R.6.3) | Proiectant, diriginte, constructor, ISC |
| FD-08 | Proba de etanșeitate a bazinului de retenție a apelor de stingere | Umplere cu apă, minimum 24-48 ore, fără pierdere vizibilă de nivel | Proiectant, diriginte, constructor |
| FD-09 | Execuția structurii rutiere pe traseul de intervenție ISU | Portanța efectivă (probă de placă sau echivalent), grosime dală conform proiect (200 mm minim), toleranțe geometrice | Proiectant, diriginte, constructor, ISC |
| FD-10 | Recepția finală — inspecție a tuturor ancorajelor montate | Absența deteriorărilor de montaj, verificare marcaje de control (strângere), fișe individuale de ancoraj complete și arhivate | Proiectant, verificator tehnic, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte, întocmirea procesului-verbal de fază determinantă (condiție pentru autorizarea continuării lucrărilor, conform Legii nr. 10/1995). Neîndeplinirea criteriilor blochează avansul până la remediere și reverificare — în mod specific la FD-04 (ancoraje), dat fiind statutul de mod de cedare guvernant identificat la PTh-R.3.4/3.8, nicio abatere de la procedură nu se acceptă fără reverificare explicită a capacității rezultate.

---

## PTh-R.13 — PROGRAMUL DE PROBE ȘI ÎNCERCĂRI

### PTh-R.13.1. Probe de compactare

Încercare de placă (modul de deformație `Ev2`) sau metodă echivalentă (densitate în situ prin metoda nisipului/gamma-densimetru), la fiecare strat de balast compactat, sub fiecare platformă și sub drumul rutier, cu criteriu de acceptare `≥ 98% Proctor normal` (cap. 6.1 DTAC) — frecvență minimă: o încercare la fiecare 50-100 mp de platformă sau la fiecare tronson de drum de 50 ml.

### PTh-R.13.2. Probe de etanșeitate

**Cuva de retenție a uleiului (CU-01):** umplere completă cu apă, menținere minimum 24 ore, măsurare a nivelului la intervale regulate (la umplere, la 12 ore, la 24 ore), criteriu de acceptare: absența oricărei pierderi de nivel vizibile/măsurabile peste toleranța de evaporare normală (corectată pentru condițiile meteo din perioada probei).

**Bazinul de retenție a apelor de stingere (BZ-01):** procedură identică, cu durată extinsă la minimum 24-48 ore, dat fiind volumul superior (61,6 mc beton, 150 mc capacitate de proiectare) — criteriu identic de acceptare.

### PTh-R.13.3. Probe de portanță

Probă de placă pe structura rutieră finalizată (drum de intervenție, zona de manevră), înainte de darea în exploatare — condiție obligatorie pentru garantarea accesului real al autospecialelor ISU (verificare care confirmă, la nivel de execuție, ipotezele de calcul de la PTh-R.7.2).

### PTh-R.13.4. Probe de rezistență a betonului

Încercări pe cuburi/cilindri la 7 și 28 de zile, pentru fiecare tip de element (platforme, fundație transformator, cuvă, bazin, drum), conform frecvenței de prelevare de la PTh-R.9.1, cu criteriu de acceptare statistică conform NE 012-1/2007 (medie și valoare minimă individuală, nu doar media seriei).

### PTh-R.13.5. Verificarea ancorajelor la strângere

Control prin cheie dinamometrică pe 100% din ancoraje, la momentul de strângere final specificat de producătorul sistemului (PTh-R.10.2), cu proces-verbal individual per ancoraj (PTh-R.10.3) — probă obligatorie, nu opțională/prin sondaj, dat fiind rolul determinant al ancorajului în verificarea globală de stabilitate (PTh-R.2, PTh-R.3).

### PTh-R.13.6. Inspecția post-eveniment (condiționată)

Deși nu este o probă programată de rutină, se prevede, ca procedură obligatorie **condiționată de producerea unui eveniment**, o **inspecție vizuală și cu cheie dinamometrică a tuturor ancorajelor unui bay afectat**, după orice eveniment seismic resimțit la amplasament sau după orice eveniment termic local (thermal runaway, chiar minor, fără propagare), **înainte** de repunerea în funcțiune a acelui bay — recomandare reluată din DTAC cap. 11.4, 16.5, cu procedura de execuție detaliată aici: verificare a marcajelor de control (rotire vizibilă a piuliței față de marcaj), remontare la momentul specificat dacă se constată slăbire, și, dacă se constată fisurare vizibilă a betonului în jurul ancorajului, oprirea repunerii în funcțiune până la expertizarea tehnică a zonei afectate.

---

## PTh-R.14 — PROGRAMUL DE URMĂRIRE SPECIALĂ A COMPORTĂRII ÎN TIMP (P130)

### PTh-R.14.1. Urmărirea curentă

Conform P130/1999, se instituie un program de urmărire vizuală **anuală** (și, obligatoriu, **după orice eveniment deosebit**: cutremur resimțit, vânt excepțional, eveniment termic local, avarie mecanică la un echipament), care include: verificarea integrității tuturor ancorajelor (marcaje de control, absența slăbirii, absența coroziunii vizibile la porțiunea expusă a bulonului), verificarea stării betonului expus (fisurare, eroziune de suprafață, eflorescențe la elementele XF1/XF3), verificarea etanșeității cuvei de ulei și a bazinului de retenție (inspecție vizuală + probă de nivel periodică), verificarea stării drumului/platformei de intervenție (portanță, planeitate, absența denivelărilor care ar afecta accesul autospecialelor ISU).

### PTh-R.14.2. Repere de tasare

Repere de tasare montate la colțurile fiecărei platforme cu încărcare semnificativă (toate cele 10 platforme-container, platforma transformatorului, cuva de ulei, bazinul de retenție), cu citire de referință la finalizarea execuției și citiri periodice **anuale în primii 3-5 ani** de exploatare, apoi la o frecvență redusă (la 3-5 ani) dacă tasările înregistrate confirmă stabilizarea comportării, conform valorilor calculate la PTh-R.2 (`s ≈ 2,8 mm` la platforma-container, mult sub pragul admisibil de 40 mm).

### PTh-R.14.3. Monitorizare specifică — corozivitate și integritate ancoraje

Dat fiind caracterul integral exterior al platformelor (expunere continuă la intemperii, cap. 3.1, 3.5 DTAC) și rolul determinant al ancorajului (PTh-R.3.4, 3.8), se recomandă o **inspecție dedicată la 5 ani** a stării de coroziune a porțiunii expuse a buloanelor (măsurare a grosimii stratului de zincare rămas, comparativ cu grosimea inițială ≥ 85 μm, cap. 3.3 DTAC), cu remediere (recondiționare/înlocuire a protecției anticorozive) dacă se constată o degradare semnificativă înainte de finalul duratei de exploatare proiectate a infrastructurii (50 de ani, cap. 3.5 DTAC).

### PTh-R.14.4. Monitorizare la ciclul de repowering (specific BESS)

Conform memoriului general (cap. 5.5, 8.4), înlocuirea containerelor de baterii la un orizont estimat de 15-20 de ani (repowering) constituie o intervenție programată previzibilă, nu un eveniment excepțional — se recomandă, **înainte de orice operațiune de repowering**, o inspecție tehnică completă a fiecărei platforme afectate (integritate beton, integritate și capacitate reziduală a ancorajelor, verificare a compatibilității cu noul echipament conform procedurii de la PTh-R.11.5), consemnată într-un raport tehnic dedicat, anexat Cărții Tehnice a Construcției, înainte de emiterea oricărei autorizații de modificare/reautorizare necesare pentru noua configurație de echipament.

### PTh-R.14.5. Jurnalul evenimentelor

Toate observațiile de mai sus (PTh-R.14.1-14.4), precum și orice eveniment relevant (seismic, termic, mecanic) și orice intervenție de remediere, se consemnează în **Jurnalul evenimentelor** din Cartea Tehnică a Construcției, alături de fișele individuale de ancoraj (PTh-R.10.3) — documentație obligatorie pentru orice expertiză tehnică viitoare (recalificare seismică, extindere, repowering).

---

## PTh-R.15 — EXTRASUL DE MATERIALE (BILL OF QUANTITIES PE REPER/ELEMENT)

### PTh-R.15.1. Extras de beton, pe element (recalculat pe geometria fină a PTh, cf. PTh-R.1.2)

| Marcă | Element | Nr. buc | Volum/buc [mc] | Volum total [mc] |
|---|---|---|---|---|
| PC-01…PC-10 | Platformă container | 10 | 23,0·0,30 = 6,90 | **69,0** |
| PP-01…PP-10 | Platformă PCS | 10 | 8,0·0,30 = 2,40 | **24,0** |
| PT-01 | Fundație transformator | 1 | 9,0·0,35 = 3,15 | **3,15** |
| CE-01 | Cabină EMS | 1 | 10,0·0,30 = 3,00 | **3,0** |
| CU-01 | Cuvă retenție ulei (pereți+radier) | 1 | — | **≈ 7,7** |
| BZ-01 | Bazin retenție ape stingere (pereți+radier) | 1 | — | **≈ 61,6** |
| DR-01 | Platformă rutieră (traseu principal, ≈ 900 mp × 0,20 m) | — | — | **≈ 180,0** |
| TR-01 | Trench cabluri MT | — | — | **≈ 120,0** (nemodificat față de DTAC) |
| **TOTAL beton infrastructură civilă** | | | | **≈ 468,5 mc** |

*(Notă de corecție PTh, reluată de la PTh-R.4.2: antemăsurătoarea generică din DTAC cap. 16.4 estima ~1.450 mc total, valoare de ordin de mărime rapidă; recalcularea pe geometria fină adoptată la faza PTh — cu platformele-container dimensionate exact la configurația reală de 20ft, nu la varianta generică de 40ft — rezultă într-un total de ~468,5 mc, sensibil inferior. Diferența provine, în principal, din supraestimarea generică a volumului platformelor-container în DTAC (700 mc acolo, față de 69 mc recalculat aici pe geometria de 23 mp × 0,30 m) — corecție de antemăsurătoare specifică fazei PTh, care nu afectează validitatea niciuneia dintre verificările structurale de rezistență, calculate independent pe presiuni și eforturi unitare, nu pe volumul total.)*

### PTh-R.15.2. Extras de oțel-beton, pe element

| Marcă | Element | Masă armătură [kg] |
|---|---|---|
| PC-01…PC-10 | Platforme container (10 buc.) | **19.350** |
| PP-01…PP-10 | Platforme PCS (10 buc.) | **6.400** |
| PT-01 | Fundație transformator | **950** |
| CU-01 | Cuvă retenție ulei | **920** |
| BZ-01 | Bazin retenție ape stingere | **6.780** |
| DR-01 | Platformă rutieră (plasă Ø10/200) | **≈ 5.400** (rată ≈ 30 kg/mc pe 180 mc) |
| TR-01 | Trench cabluri MT | **≈ 9.600** (nemodificat față de DTAC) |
| **TOTAL oțel-beton** | | **≈ 49.400 kg ≈ 49,4 t** |

### PTh-R.15.3. Extras de ancoraje (buloane/ancore chimice)

| Utilizare | Tip | Nr. seturi | Observație |
|---|---|---|---|
| Ancoraj platformă-container (10 buc. × 4) | M24 gr. 8.8, hef = 200 mm, chimic ETA | **40** | configurație unificată, PTh-R.3.1 |
| Ancoraj platformă-PCS (10 buc. × 4) | M16 gr. 8.8, hef = 150 mm, chimic ETA | **40** | — |
| Ancoraj fundație transformator (1 buc. × 4) | M20 gr. 8.8, hef = 180 mm, chimic ETA | **4** | — |
| Ancoraj cabină EMS (1 buc. × 4) | M16 gr. 8.8, hef = 150 mm, chimic ETA | **4** | guvernat de vânt, PTh-R.2.5 |
| **TOTAL ancoraje** | | **88 seturi** | + șaibe de repartiție, piulițe autoblocante, capace de protecție |

### PTh-R.15.4. Extras protecție anticorozivă și hidroizolație

| Sistem | Cantitate | Observație |
|---|---|---|
| Zincare termică ancoraje (SR EN ISO 1461, ≥ 85 μm) | 88 seturi | conform loturi, la zincator, sau oțel inox A4-70/80 la variante alternative |
| Hidroizolație cuvă retenție ulei (membrană + benzi de etanșare) | ≈ 34 mp pereți + 12 mp radier | cap. 9.2 DTAC |
| Hidroizolație bazin retenție ape (membrană + benzi de etanșare) | ≈ 72 mp pereți + 80 mp radier | cap. 10.2 DTAC |
| Aditiv antrenor de aer (elemente XF1/XF3) | conform dozaj producător | platforme + drum, 4-6% aer antrenat |

---

## PTh-R.16 — SINTEZA VERIFICĂRILOR SLU/SLS ȘI CONCLUZIILE FAZEI PTh

### PTh-R.16.1. Tabel unic de sinteză — toate verificările, toate echipamentele (amplasamentul sever, ag = 0,30g)

| Verificare | Container (PC) | PCS (PP) | Transformator (PT) | Cabină EMS (CE) |
|---|---|---|---|---|
| Presiune medie teren (util.) | 0,11 | 0,12 | 0,14 | — (necritic) |
| Poansonare reazem colț (util.) | 0,19 | — (nesolicitant, gabarit redus) | — | — |
| Tasare | 2,8 mm ≪ 40 mm | — | — | — |
| Răsturnare fără ancoraj (γ) | 1,22 (seism) | 1,33 (seism) | v. PTh-R.5 | 1,25 (**vânt**, nu seism) |
| Lunecare fără ancoraj (F_frecare/acțiune) | 0,51 | 0,51 | v. PTh-R.5 | 0,52 (din vânt) |
| Ancoraj — oțel, forfecare (util.) | 0,30 | 0,27 | 0,40 | < 0,10 |
| Ancoraj — oțel, tracțiune (util.) | 0,20 | 0,18 | 0,27 | < 0,10 |
| **Ancoraj — smulgere conică beton (util., mod guvernant)** | **0,47** | 0,29 | 0,34 | < 0,10 |
| Acțiune laterală guvernantă | seism | seism | seism | **vânt** |

### PTh-R.16.2. Verificări suplimentare specifice PTh

| Element | Verificare | Rezultat |
|---|---|---|
| Bazin retenție ape stingere | UPL, NH tipic (1,0 m) | γ = 1,73 ✓ |
| Bazin retenție ape stingere | UPL, NH ridicat (2,0 m, ipoteză conservativă) | γ = 0,87 ✗ — impune măsuri suplimentare (PTh-R.6.3), condiționat de studiul geotehnic real |
| Cuvă retenție ulei | Volum recalculat la 12,5 MVA | 10,0 mc adoptat, față de exemplul 1.000 kVA din DTAC |
| Platformă rutieră (traseu principal ISU) | Portanță sub roata autospecialei, distribuție 45° | 0,70 ✓ (marjă mai restrânsă, atenție la execuție) |
| Ancoraj — toate modurile de cedare specifice ETA (pull-out, edge breakout) | condiționată de raportul software al produsului contractat | obligatoriu înainte de FD-04 |

### PTh-R.16.3. Concluzii ale fazei PTh

Prezentul supliment de fază PTh confirmă, prin recalculare integrală pe configurația reală a proiectului (10× container 20ft de 294 kN, 10× PCS de 118 kN, transformator recalculat la 176,6 kN pentru puterea reală de 12,5 MVA, cabină EMS de 34,3 kN), **toate concluziile structurale ale DTAC**, aducându-le, suplimentar, la nivelul de detaliere necesar execuției:

1. **Modul de cedare guvernant al ancorajului este smulgerea conică a betonului** (utilizare 47% la containere, amplasamentul sever), nu cedarea metalurgică a bulonului (utilizare 20-30%) — constatare cu implicații directe asupra priorităților de control al calității la execuție (calitatea forajului și a curățării găurii, cap. PTh-R.9-R.10, contează cel puțin la fel de mult ca certificarea metalurgică a buloanelor).
2. **Ancorarea mecanică este universal obligatorie pe toată configurația** — inclusiv la echipamentul cel mai ușor (cabina EMS, 3,5 t), unde acțiunea laterală guvernantă nu este seismul, ci vântul, dar concluzia structurală (necesitatea ancorajului) rămâne identică.
3. **Decizia de standardizare a ancorajului containerelor la M24** (deși strict calculul pe configurația actuală ar permite M20) oferă o marjă de recalculare favorabilă pentru o eventuală extindere/repowering viitor, cu cost marginal nesemnificativ.
4. **Recalcularea antemăsurătorii de beton** (~468,5 mc, față de estimarea rapidă de ~1.450 mc din DTAC) reflectă geometria fină, corectă, a configurației reale de proiect — corecție tipică de fază PTh, fără impact asupra validității verificărilor de rezistență, calculate pe presiuni/eforturi unitare independente de antemăsurătoare.
5. **Verificarea UPL a bazinului de retenție a apelor de stingere rămâne condiționată de nivelul hidrostatic real al amplasamentului** — punct de atenție prioritar pentru studiul geotehnic de detaliu, cu soluții alternative deja identificate (majorare radier, ancore de tracțiune în teren) dacă nivelul hidrostatic confirmat este ridicat.
6. **Volumul cuvei de retenție a uleiului, recalculat la puterea reală de 12,5 MVA, este de ordinul a 10,0 mc** — valoare care înlocuiește exemplul ilustrativ de 1.000 kVA al DTAC și care se confirmă definitiv prin fișa tehnică a transformatorului contractat.

**Prezenta documentație de rezistență, fază PTh, se supune verificării tehnice de către verificatori de proiecte atestați MDLPA**, pentru cerințele A1 și Af, cu atenție specifică, reluată din DTAC și confirmată aici prin calcul complet, asupra soluției de ancorare antiseismică/la vânt a echipamentelor — inclusiv asupra obligativității raportului de calcul software specific ETA al produsului de ancorare contractat efectiv, condiție prealabilă a fazei determinante FD-04 (PTh-R.12), fără de care execuția ancorajelor nu poate fi autorizată în cunoștință de cauză.

Calculele detaliate pe suport software (breviar complet al ancorajelor cu ETA-ul definitiv, planurile de cofraj-armare la scară 1:20/1:50, extrasele finale de armătură confirmate pe planuri) se finalizează, pe baza soluțiilor prezentate în acest supliment, la predarea completă a proiectului tehnic către execuție, condiționat, așa cum s-a subliniat repetat, de confirmarea datelor definitive ale furnizorului de echipament BESS contractat (masă exactă, poziția reazemelor) și de rezultatele studiului geotehnic de detaliu pe amplasamentul real (nivel hidrostatic, presiune convențională confirmată).

---

## Anexa A. Index normative suplimentare aplicate în prezentul supliment PTh

| Normativ | Titlu/obiect | Utilizat în |
|---|---|---|
| **SR EN 1992-4** | Proiectarea ancorajelor pentru beton — toate modurile de cedare (oțel, smulgere conică, pull-out, edge breakout, splitting) | PTh-R.3 (determinant) |
| **EAD 330499** (referință de principiu) | Agrement tehnic european — ancore chimice cu tijă filetată | PTh-R.3.4-3.6 |
| ETAG 001 / EAD relevante | Cadrul de agrementare a ancorelor cu marcaj CE | PTh-R.3, PTh-R.10.4 |
| SR EN 1997-1 §2.4.7.4 | Verificarea la subpresiune (UPL) | PTh-R.6.3 |
| NP 074/2014 | Documentații geotehnice | PTh-R.6.3, PTh-R.8.1 |
| SR EN 206 / NE 012-1/2007, NE 012-2/2010 | Producerea și executarea lucrărilor din beton, control de producție | PTh-R.8, PTh-R.9 |
| SR EN 10080 / SR 438 | Oțel-beton B500C | PTh-R.4, PTh-R.9.2 |
| SR EN ISO 1461 | Zincare termică la cald a ancorajelor | PTh-R.3.9, PTh-R.14.3, PTh-R.15.4 |
| SR EN ISO 12944 | Protecție anticorozivă, clase de corozivitate | cap. 3.3 DTAC, PTh-R.14.3 |
| P130/1999 | Programul de urmărire a comportării construcțiilor în timp | PTh-R.14 |
| Legea nr. 10/1995 | Calitatea în construcții — cerințele A/Af | PTh-R.12, PTh-R.16.3 |
| HG nr. 907/2016 | Etapele de elaborare a documentațiilor tehnico-economice | PTh-R.1 |
| SR EN 1992-1-1 §9.3 | Compensarea armăturii la goluri/penetrări în placă | PTh-R.11.2 |

## Anexa B. Regula de recalculare completă la schimbarea echipamentului sau a amplasamentului

Pentru orice modificare a datelor de intrare (masă reală a echipamentului contractat, poziția reazemelor, parametri seismici ai amplasamentului real `ag`/`β0`), se reparcurge integral următoarea secvență, identică metodologic celei din DTAC Anexa C, dar extinsă aici la toate tipurile de echipament ale configurației:

1. Se preiau `ag` și `β0` din harta de zonare P100-1/2013 pentru UAT-ul amplasamentului real (dacă diferă de exemplele de bază/sever dezvoltate aici).
2. Se recalculează `Sd(T1) = ag·β0/q`, cu `q = 1,5` (element rigid ancorat, cap. 4.1 DTAC).
3. Se recalculează `Fb = γI,e·Sd(T1)·m·λ` pentru **masa reală a fiecărui tip de echipament** contractat (container, PCS, transformator, cabină EMS) — nu se extrapolează forța unui echipament la altul prin simplă proporție de gabarit, dat fiind că masa reală poate varia independent de dimensiunile exterioare (densitate energetică diferită între generații de baterii, de exemplu).
4. Se refac verificările de răsturnare (PTh-R.2), lunecare (PTh-R.2) și dimensionarea ancorajului, pe toate modurile de cedare (PTh-R.3), cu noua valoare a lui `Fb`.
5. Se verifică dacă geometria platformei adoptate (arie, grosime, cap. PTh-R.1.2) rămâne satisfăcătoare la presiune pe teren și la poansonare (PTh-R.2) sau impune o platformă redimensionată.
6. Se verifică dacă configurația de ancorare adoptată (diametru, adâncime efectivă, cap. PTh-R.3.1) rămâne satisfăcătoare sau impune majorarea diametrului, a numărului de puncte de ancorare sau a adâncimii efective — cu atenție specifică asupra modului de cedare guvernant identificat în prezentul supliment (smulgerea conică a betonului, nu cedarea oțelului), care poate deveni critic mai devreme decât cedarea bulonului la o majorare a forței de calcul.
7. Se reface, dacă este cazul, verificarea UPL a bazinului de retenție (PTh-R.6.3) pe baza nivelului hidrostatic real al noului amplasament.
8. Se recalculează volumul cuvei de retenție a uleiului (PTh-R.5.4) dacă puterea aparentă a transformatorului contractat diferă de 12,5 MVA.

Geometria de bază, materialele, grupările de acțiuni și metodologia de calcul rămân neschimbate pe tot parcursul acestei recalculări; doar datele de intrare specifice fiecărui proiect (masa reală a echipamentelor contractate, parametrii seismici ai amplasamentului real, nivelul hidrostatic confirmat) se introduc ca valori noi, conform procedurii de mai sus.

---

*Întocmit: inginer structurist atestat. Verificat tehnic: verificator atestat A1 + Af. Fază: PTh (Proiect Tehnic de execuție). Toate valorile numerice de recalculare sunt exemple complete de calcul, dezvoltate pe configurația de referință a proiectului (10 containere 20ft, 10 PCS, transformator 12,5 MVA); ele se confirmă definitiv, la execuție, prin fișa tehnică a furnizorului de echipament contractat efectiv și prin studiul geotehnic de detaliu pe amplasamentul real. Prezentul document respectă cerința fundamentală A — rezistență mecanică și stabilitate (Legea 10/1995) — și constituie supliment de fază PTh la memoriul de rezistență DTAC (`structura.md`) al aceleiași documentații. Nu dublează conținutul memoriului general, al memoriului de arhitectură/amenajare, al memoriului de instalații electrice + PSI și al scenariului de securitate la incendiu (SSI) ale aceleiași documentații — pentru descrierea tehnologică generală, zonarea funcțională, dimensionarea electrică completă și scenariul complet de securitate la incendiu (inclusiv raportul UL 9540A), se consultă documentele respective.*
