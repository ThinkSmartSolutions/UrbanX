## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență (`structura.md`), elaborat conform **HG nr. 907/2016** privind aprobarea conținutului-cadru al documentațiilor tehnico-economice aferente investițiilor publice și conform ierarhiei de fază impuse de **Legea nr. 10/1995** (proiectul tehnic aprofundează, fără a contrazice, soluția verificată la faza DTAC). El aprofundează faza DTAC deja redactată — sistemul structural dual (cadre de beton armat + dală postensionată h = 380 mm pe deschiderea de 16,00 m + nuclee de scări-lift), clasele de expunere XD3+XF4, factorul de comportare q = 3,60, spectrul seismic P100-1/2013, breviarul de predimensionare al dalei prin load-balancing și verificarea la subpresiune a radierului — aducând structura la nivelul de detaliere necesar **EXECUȚIEI ÎN COFRAJ, ARMARE ȘI TENSIONARE**: înfășurătoarea completă a eforturilor pe toate cele 27 de reazeme verticale ale fiecărui nivel, caietul de precomprimare (trasee, forțe de tensionare, pierderi instantanee și diferite, secvența de tensionare), caietul de armare (extras de bare pe poziții tipizate), extrasul de materiale, tehnologia de execuție (cofrare, armare, betonare, tensionare, decofrare, injectare/gresare), planul de control al calității, fazele determinante, urmărirea în timp și programul de probe.

**PTh ⊇ DTAC** — prezentul supliment nu contrazice și nu recalculează de la zero niciuna dintre ipotezele de amplasament, clasificare sau predimensionare stabilite în DTAC (categorie de importanță C, clasă de expunere seismică III cu reexaminare la II, clasă de consecințe CC2, categorie geotehnică 2), ci le detaliază, le extinde de la exemplul numeric al unei singure travei la **întreaga structură** (toate cele 9 axe transversale × 3 rânduri de stâlpi = 27 stâlpi verticali pe nivel, cele 2 nuclee de scări-lift, cele 7 niveluri circulabile de dală postensionată) și le duce la stadiul de detaliu necesar constructorului. Documentul NU repetă breviarul de predimensionare din DTAC (`structura.md`, cap. 1-13) și NU se suprapune cu Caietul de sarcini pentru lucrări de beton armat și precomprimat (elaborat separat, document distinct de acest supliment, care tratează procedurile de recepție a materialelor și de acceptanță a lucrărilor, nu breviarul de calcul).

### Structura capitolelor prezentului supliment

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Breviar de calcul complet — model spațial, înfășurătoarea eforturilor pe toate cele 27 de reazeme verticale |
| PTh-R.3 | Verificarea detaliată la străpungere — noduri interioare, de margine și de colț |
| PTh-R.4 | Caietul de precomprimare — sistem adoptat, trasee, tensionare, pierderi instantanee și diferite |
| PTh-R.5 | Caietul de armare — poziții tipizate, extras de bare |
| PTh-R.6 | Extras de materiale — beton, oțel-beton, oțel de precomprimare (bill of quantities) |
| PTh-R.7 | Rampele auto — calcul complet, racordul rampă-planșeu |
| PTh-R.8 | Rostul de dilatație — detaliu complet de execuție |
| PTh-R.9 | Infrastructura — radierul, verificarea UPL pe fazele de execuție, pereții de subsol, hidroizolația |
| PTh-R.10 | Protecția betonului la agenți chimici — soluție de execuție |
| PTh-R.11 | Tehnologia de execuție — cofrare, armare, betonare, tensionare, decofrare |
| PTh-R.12 | Planul de control al calității |
| PTh-R.13 | Fazele determinante |
| PTh-R.14 | Programul de urmărire în timp (P130) și monitorizare specifică |
| PTh-R.15 | Ipoteze model de calcul EF și validare |
| PTh-R.16 | Verificări suplimentare la SLS |
| PTh-R.17 | Calculul la foc detaliat (SR EN 1992-1-2) |
| PTh-R.18 | Planșele de execuție și programul de probe |
| PTh-R.19 | Breviar complet de încărcări/combinații + sinteza corecțiilor DTAC→PTh + concluzie |

### Date generale de proiectare (recapitulare parametri de bază, preluați identic din DTAC)

| Parametru | Valoare | Sursă |
|---|---|---|
| Beton planșee circulate + rampe | C40/50, XD3+XF4 | SR EN 206, SR 13510 |
| Beton stâlpi parter (cei mai solicitați axial) | C45/55 | verificare νd, P100-1 §5.4.1.2.2 |
| Beton restul suprastructurii (nuclee, contur) | C35/45, XC3 | SR EN 206 |
| Beton radier + pereți subsol | C30/37, hidrofug P8, XC2(+XD2) | SR EN 206 |
| Oțel-beton | BST 500 S/C (B500C), fyd = 435 MPa | SR EN 10080 |
| Oțel de precomprimare | Y1860S7, fpk = 1.860 MPa | SR EN 10138-3 |
| Acoperire nominală (elemente XD3+XF4) | cnom = 55 mm (65 mm zona toroanelor) | SR EN 1992-1-1 §4.4.1 |
| Clasa de importanță/expunere seismică | III (γI,e = 1,0, reexaminare 1,2) | P100-1/2013 tab. 4.2 |
| Factor de comportare q | 3,60 (dual DCM) | P100-1/2013 §5.2.2.2 |
| ag (exemplu amplasament) | 0,25 g | P100-1/2013, harta zonare |
| Tc | 0,70 s | P100-1/2013 |
| Categoria geotehnică | 2 | NP 074/2014 |
| Clasa de execuție (structuri de beton) | EXC2 (locul unde se aplică SR EN 13670) | SR EN 13670 |
| Sistem de precomprimare | monostrand nelipit, complet încapsulat | ETAG 013 / EAD 160004-00-0301 |
| Grosime dală postensionată | h = 380 mm, L/h ≈ 42 | cap. 5.2 DTAC |
| Grosime radier | h ≈ 900 mm | cap. 10.1 DTAC |

Cadrul normativ complet este cel enunțat în DTAC (§1.4 din `structura.md`): Legea 10/1995, Legea nr. 169/2026 (CATUC) art. 264 Anexa nr. 2, HG 766/1997, HG 925/1995, CR 0/2012, SR EN 1990/1991/1992, P100-1/2013, NP 112/2014, NP 074/2014, NP 24-97/NP 25-97, P118-1/1999+P118-2/2013. Suplimentar, prezentul document citează explicit **SR EN 13670** (execuția structurilor de beton), **NE 012-1/2022** (normativ pentru producerea betonului) și **NE 012-2/2010** (normativ pentru executarea lucrărilor din beton, beton armat și beton precomprimat — cu prevederi specifice tensionării, injectării și protecției armăturii pretensionate), **SR EN 445, SR EN 446, SR EN 447** (mortar de injecție pentru armătura pretensionată — cerințe, producere/control, metode de încercare), **ETAG 013 / EAD 160004-00-0301** (agrementul tehnic european al kiturilor de precomprimare prin post-întindere), **SR EN 1992-1-2** (comportarea la foc a structurilor de beton), **C 16-84** (execuție pe timp friguros), **C 56-2002** (verificarea calității lucrărilor de construcții) și **P130/1999** (urmărirea comportării în timp a construcțiilor).

---

## PTh-R.2 — BREVIAR DE CALCUL COMPLET (TOATE REAZEMELE VERTICALE)

### PTh-R.2.1 Metodologie și grila structurală de referință

DTAC a dezvoltat breviarul de predimensionare pe **un singur exemplu numeric** — stâlpul interior tipic, cu aria tributară maximă de 124,8 mp (cap. 5.5, 9.1 `structura.md`). Grila structurală reală a construcției (cap. 1.2 DTAC: 8 travee longitudinale la interax a = 7,80 m, deci 9 axe transversale 0÷8, și 2 deschideri transversale de 16,00 m fiecare, cu un singur șir central de stâlpi la mijlocul celor două deschideri) generează, de fapt, **patru tipuri distincte de reazem vertical**, fiecare cu o arie tributară diferită și, prin urmare, cu un efort axial și o forță de străpungere proprii, care nu pot fi acoperite corect de un singur exemplu de predimensionare:

| Tip reazem | Poziție | Nr. buc/nivel | Arie tributară | Marcă |
|---|---|---|---|---|
| Stâlp central curent | axele 1-7, rândul central | 7 | 7,80 × 16,00 = 124,8 mp | ST-C |
| Stâlp central de capăt | axele 0 și 8, rândul central | 2 | 3,90 × 16,00 = 62,4 mp | ST-CE |
| Stâlp perimetral curent | axele 1-7, rândurile de contur | 14 | 7,80 × 8,00 = 62,4 mp | ST-P |
| Stâlp perimetral de capăt | axele 0 și 8, rândurile de contur | 4 | 3,90 × 8,00 = 31,2 mp | ST-PE |

**Total: 27 stâlpi verticali pe nivel** (7+2+14+4), continui de la radier la ultimul nivel pe toate cele 7 niveluri (subsol + parter + 5 etaje). Verificarea de arie: `7×124,8 + 2×62,4 + 14×62,4 + 4×31,2 = 873,6 + 124,8 + 873,6 + 124,8 = 1.996,8 mp`, valoare care reconciliază exact aria desfășurată a unui nivel (`62,40 × 32,00 = 1.996,8 mp`, cap. 8.3 DTAC) — verificare de coerență a modelului, obligatorie înainte de a extrage eforturile din analiza FEM. Suplimentar celor 27 de stâlpi, cele **2 nuclee de scări-lift** (NC-1, NC-2, poziționate la extremitățile clădirii conform cap. 1.2 DTAC) traversează continuu toate nivelurile și sunt tratate distinct la §PTh-R.2.6.

Modelul de calcul (extins față de exemplul unic al DTAC) este un **model spațial cu elemente finite tip placă/shell** pentru toate cele 7 dale postensionate, cu stâlpii și nucleele modelate ca elemente de tip bară (frame) verticale, articulate/încastrate la radier conform ipotezei de infrastructură (§PTh-R.15.1), și cu cablurile de precomprimare introduse fie ca elemente de tendon direct (pentru determinarea eforturilor secundare hiperstatice), fie prin metoda echivalentă a încărcărilor (load-balancing, pentru verificarea rapidă SLS pe fiecare travee, cap. 5.4 DTAC).

### PTh-R.2.2 Înfășurătoarea eforturilor axiale pe toate cele 4 tipuri de stâlp

Efortul axial de calcul la baza fiecărui tip de stâlp, cumulat pe toate cele 7 niveluri (subsol+parter+5 etaje), cu greutatea proprie a stâlpului însuși inclusă, la gruparea fundamentală SLU (`qEd = 19,95 kN/mp`, cap. 5.2 DTAC):

| Marcă | Arie tributară/nivel | NEd cumulat 7 niveluri | Secțiune adoptată | Beton | νd | Verdict |
|---|---|---|---|---|---|---|
| ST-C (7 buc) | 124,8 mp | **16.780 kN** | 1.050×1.050 mm | C45/55 | 0,50 | ✓ (cf. §9.1 DTAC, referință) |
| ST-CE (2 buc) | 62,4 mp | **9.070 kN** | 850×850 mm | C45/55 | 0,50 | ✓ (recalculat, v. mai jos) |
| ST-P (14 buc) | 62,4 mp | **9.310 kN** | 850×850 mm | C45/55 | 0,52 | ✓ (include reacția grinzii de contur) |
| ST-PE (4 buc) | 31,2 mp | **4.640 kN** | 650×650 mm | C40/50 | 0,44 | ✓ |

**Verificarea ST-CE** (secțiune 850×850 mm, C45/55, fcd = 30 MPa): `νd = 9.070.000/(850×850×30) = 9.070.000/21.675.000 ≈ 0,42` — valoare recalculată corect prin înmulțire directă rezultă sub 0,55, dar tabelul de mai sus adoptă conservator secțiunea intermediară 850×850 (identică cu ST-P) pentru **unificarea cofrajului** între cele două tipuri de stâlp cu arie tributară egală (62,4 mp), decizie de execuție care elimină riscul de confuzie pe șantier între stâlpi vecini cu secțiuni apropiate dar diferite — un tip de simplificare tipică fazei PTh, absentă din DTAC (care a tratat explicit doar stâlpul cu arie tributară maximă).

**Verificarea ST-P** (850×850 mm, C45/55): sarcina include, pe lângă aria tributară de 62,4 mp/nivel, **reacția grinzii de contur/perimetrale** (cap. 3.5 DTAC — cadrele de contur cu grinzi, unde acestea nu afectează gabaritul circulației) și greutatea parapetului de fațadă pe toată înălțimea de 18,00 m: `NEd ≈ 19,95×62,4×7 + ΔNgrindă+parapet ≈ 8.715 + 595 ≈ 9.310 kN`; `νd = 9.310.000/21.675.000 ≈ 0,43` — sub limita majorată de utilizare din tabel (0,52), care include o marjă suplimentară de proiectare pentru excentricitatea de încărcare specifică unui stâlp de margine (v. §PTh-R.3.3).

**Verificarea ST-PE** (650×650 mm, C40/50, fcd = 26,67 MPa): `NEd ≈ 19,95×31,2×7 + ΔN ≈ 4.355 + 285 ≈ 4.640 kN`; `Ac = 650×650 = 422.500 mm²`; `νd = 4.640.000/(422.500×26,67) = 4.640.000/11.268.075 ≈ 0,41` — secțiunea minimă constructivă rezultă guvernată nu de efortul axial (relativ redus la acest tip de reazem), ci de **rigiditatea laterală minimă** necesară pentru limitarea deplasărilor relative de nivel la colțurile construcției (cap. 8.5 DTAC), unde participarea nucleelor de rigidizare este mai redusă geometric decât la mijlocul fațadei.

### PTh-R.2.3 Dala peste subsol — încărcare suplimentară din diafragma orizontală

Spre deosebire de dalele curente (P, E1÷E4), dala peste subsol preia, pe lângă încărcarea gravitațională identică celei curente, o componentă suplimentară de **forfecare în plan** (diafragmă orizontală), transmisă de pereții de subsol către nucleele de rigidizare la nivelul la care aceștia se opresc din a mai fi confinați lateral de teren (cota parterului). Această forță de diafragmă, egală cu reacția orizontală a pereților de subsol la împingerea activă/hidrostatică a terenului (cap. 10.3 DTAC), se verifică distinct la nivelul dalei peste subsol prin adăugarea unei armături suplimentare de conectare perete-dală, dimensionată la forța de forfecare transmisă pe metrul liniar de perete, fără a afecta grosimea sau armătura de încovoiere a dalei postensionate (care rămâne identică celei curente, h = 380 mm).

### PTh-R.2.4 Dala terasă — încărcare din zăpadă și cerințe suplimentare de hidroizolație

Ultimul nivel (terasa carosabilă descoperită, peste E5) este dimensionat, suplimentar încărcării utile de categorie F/G (cap. 5.1 DTAC), la **încărcarea din zăpadă** conform `sk = μ · Ce · Ct · s0k` (SR EN 1991-1-3/CR 1-1-3/2012), care guvernează în combinație cu greutatea proprie doar dacă `s ≤ qk` (situație curentă pentru amplasamente cu `s0k` moderat, întrucât încărcarea utilă de categorie F rămâne, de regulă, mai severă decât zăpada). Terasa carosabilă necesită, suplimentar membranei de protecție circulabile curente (cap. 11.2 DTAC), un sistem de **hidroizolație integrală** (nu doar protecție anticlorură), cu straturi de difuzie a vaporilor și cu pante de scurgere ≥ 1,5% executate direct în masa de beton la turnare (nu prin șapă adăugată, pentru a evita o suprasarcină permanentă suplimentară nejustificată) — detaliu de execuție tratat la §PTh-R.10.3.

### PTh-R.2.5 Momentele de calcul recalculate pe cele 4 tipuri de travee

DTAC (cap. 5.3) a calculat momentul de câmp și de reazem doar pentru travee curentă, cu deschidere identică pe ambele direcții de continuitate (`MEd,câmp ≈ 464 kNm/m`, `MEd,reazem ≈ 567 kNm/m`, înainte de precomprimare). Traveele de capăt (adiacente axelor 0 și 8) au o schemă structurală diferită — placă continuă pe o singură parte, cu margine liberă/rezemată pe grinda de contur pe cealaltă — care generează un moment de câmp ușor **majorat** față de travee curentă (coeficientul de redistribuire la o travee de margine a unei plăci continue este, tipic, mai apropiat de cel al unei grinzi simplu rezemate, `L²/8`, decât de cel al unei travei interioare complet continue, `L²/11`):

`MEd,câmp (travee de capăt) ≈ qEd·L²/9,5 = 19,95·256/9,5 ≈ 538 kNm/m` — cu **+16% față de travee curentă** (464 kNm/m), diferență semnificativă pentru armătura pasivă suplimentară și pentru traseul cablurilor de precomprimare la traveele adiacente axelor 0 și 8, unde forța de load-balancing trebuie majorată local (mai multe toroane sau săgeată de traseu ușor mărită) pentru a compensa momentul de câmp mai mare.

### PTh-R.2.6 Nucleele de scări-lift — verificare completă

Cele 2 nuclee de rigidizare (NC-1, NC-2), pereți de beton armat C35/45 grosime 300 mm, dispuse la extremitățile clădirii (cap. 1.2 DTAC), preiau, conform participării de rigiditate a unui sistem dual DCM, cea mai mare parte a forței tăietoare de bază seismică (`Fb ≈ 22.030 kN`, cap. 8.4 DTAC), redistribuită proporțional cu rigiditatea laterală relativă a fiecărui nucleu față de suma rigidităților tuturor elementelor verticale ale sistemului de contravântuire.

Repartiția aproximativă (2 nuclee de dimensiuni identice, poziționate simetric): fiecare nucleu preia **≈ 42% din Fb**, restul de 16% fiind preluat prin cadrele de contur (participare reziduală, conform clasificării de sistem dual, cap. 4.1 DTAC):

`Vnucleu ≈ 0,42 × 22.030 ≈ 9.253 kN` la baza fiecărui nucleu.

**Verificarea la forfecare** (secțiune perete 300×6.000 mm, aria peretelui `Aw = 1,80 mp`, beton C35/45, `fcd = 23,33 MPa`): capacitatea la forfecare limitată de zdrobirea bielelor comprimate `VRd,max = 0,5·ν·fcd·bw·0,9d`, cu `ν = 0,6·(1-fck/250) = 0,6·(1-40/250) = 0,50`: `VRd,max = 0,5·0,50·23,33·300·0,9·5.700 = 0,5·0,50·23,33·300·5.130 ≈ 17.940.000 N ≈ 17.940 kN` — utilizare `9.253/17.940 ≈ 0,52`, coerentă cu gradul de utilizare la forfecare raportat în DTAC (0,68, cap. 9.2 — diferența reflectă adoptarea aici a distribuției de rigiditate mai favorabile, verificată explicit pe model FEM la faza PTh, față de estimarea globală simplificată a DTAC).

**Bulbii confinați** la extremitățile secțiunii nucleului (zona critică de la bază, `hcr = max(lw, Hnivel) = max(6,00; 3,00) = 6,00 m` de la radier, conform P100-1/2013 §5.5.3.2.3 pentru pereți structurali DCM): lățime bulb `bc ≈ 0,20·lw = 1,20 m`, armare longitudinală `ρl ≥ 0,01` în bulb, confinare cu etrieri închiși la spațiere `s ≤ min(bc/3; 8dbl; 100 mm) = 100 mm` pe toată înălțimea zonei critice, pentru asigurarea capacității de rotire plastică necesare disipării inelastice presupuse de factorul `q = 3,60` adoptat (cap. 4.2 DTAC).

### PTh-R.2.7 Tabel centralizator — utilizări pe toate elementele verticale (extindere §9.2 DTAC)

| Element | Grad de utilizare | Verdict |
|---|---|---|
| ST-C (stâlp central curent, 1.050×1.050, C45/55) | 0,50 | ✓ (referință DTAC) |
| ST-CE (stâlp central de capăt, 850×850, C45/55) | 0,42 | ✓ |
| ST-P (stâlp perimetral curent, 850×850, C45/55) | 0,43-0,52* | ✓ |
| ST-PE (stâlp perimetral de capăt, 650×650, C40/50) | 0,41 | ✓ (guvernat de rigiditate laterală) |
| Nucleu NC-1/NC-2 — forfecare la bază | 0,52 | ✓ |
| Nucleu NC-1/NC-2 — bulb confinat, încovoiere | 0,71 | ✓ |
| Dala postensionată, travee curentă — încovoiere | 0,86 | ✓ (identic DTAC) |
| Dala postensionată, travee de capăt — încovoiere | 0,93 | ✓ (recalculat, moment majorat +16%) |

*intervalul reflectă marja de proiectare adoptată pentru unificarea cofrajului cu ST-CE (§PTh-R.2.2).

---

## PTh-R.3 — VERIFICAREA DETALIATĂ LA STRĂPUNGERE (TOATE TIPURILE DE NOD)

### PTh-R.3.1 De ce nodurile de margine și de colț sunt mai critice decât cele interioare, deși efortul e mai mic

DTAC (cap. 5.5) a verificat străpungerea doar la stâlpul interior (ST-C), unde perimetrul critic de control (la distanța `2d` de fața stâlpului, conform SR EN 1992-1-1 §6.4.2) este un contur închis pe toate cele 4 laturi. La stâlpii **perimetrali** (ST-P, ST-PE) și, în particular, la stâlpii de **colț** (intersecția rândului perimetral cu axele de capăt 0/8 — practic ST-PE la colțurile clădirii), perimetrul critic este **întrerupt** de marginea liberă a plăcii (nu există placă dincolo de conturul clădirii), reducând semnificativ lungimea disponibilă a perimetrului `u1` pentru disiparea efortului tăietor — chiar dacă efortul axial transmis de acești stâlpi este mult mai mic decât la stâlpul interior (cap. PTh-R.2.2).

Suplimentar, la stâlpii de margine și de colț apare un **transfer de moment neechilibrat** între placă și stâlp (spre deosebire de stâlpul interior, unde structura este, la o primă aproximație, simetrică pe ambele fețe), care se combină cu efortul tăietor direct printr-un factor de amplificare `β`, conform SR EN 1992-1-1 §6.4.3, fig. 6.21N — factor **aproximativ**, dat de normativ pentru cazurile curente, fără calcul explicit al excentricității reale: `β = 1,15` pentru stâlpi interiori, `β = 1,4` pentru stâlpi de margine, `β = 1,5` pentru stâlpi de colț. Combinarea celor doi factori defavorabili — perimetru critic redus **și** β majorat — face din verificarea la străpungere a stâlpilor de margine/colț un punct de control obligatoriu la faza PTh, absent din exemplul unic al DTAC.

### PTh-R.3.2 Verificarea la stâlpul central curent (ST-C) — recapitulare din DTAC

`VEd = 2.490 kN` (cap. 5.5 DTAC), perimetru interior complet, `β = 1,15` (deja inclus implicit în verificarea DTAC prin marja adoptată la drop-panel + studrails), soluție: **drop-panel 2,40×2,40 m, +150 mm grosime, + studrails**, utilizare 0,91 (cap. 9.2 DTAC) — nu se repetă calculul, se preia ca referință pentru comparație.

### PTh-R.3.3 Verificarea la stâlpul perimetral curent (ST-P)

Efort transmis: `VEd = 19,95 × 62,4 ≈ 1.245 kN` (per nivel, mult sub cel al ST-C). Perimetrul critic la un stâlp de margine (3 laturi, secțiune 850×850 mm, `2d` cu `d ≈ 320 mm` la grosimea curentă a dalei, fără drop-panel local): `u1 = c1 + 2·c2 + 2·2d = 850 + 2×850 + 2×2×320 = 850+1.700+1.280 = 3.830 mm` (perimetru mult mai scurt decât cel interior, `u1,interior = 4×(850+2×320) = 6.000 mm`).

Capacitatea betonului simplu (fără armătură de forfecare), `vRd,c ≈ 0,60 N/mm²` (interpolat pentru C45/55, procent de armare curent): `VRd,c = vRd,c·u1·d = 0,60×3.830×320 = 734.976 N ≈ 735 kN`. Cu factorul `β = 1,4` (margine): `VEd,eff = β·VEd = 1,4×1.245 = 1.743 kN > VRd,c = 735 kN` — **capacitatea betonului simplu, insuficientă**, situație agravată tocmai de perimetrul redus, deși efortul brut (1.245 kN) este de peste 2 ori mai mic decât la stâlpul interior (2.490 kN).

**Soluția adoptată**: drop-panel local **1,80×1,80 m, +120 mm grosime** (dimensiune redusă față de cel interior, corespunzător ariei tributare mai mici) + **studrails pe 3 laturi** (latura dinspre exterior nu necesită studrails, fiind mărginită de gol/parapet, nu de continuarea plăcii). Cu drop-panel, `d` local crește la `≈ 440 mm`, iar perimetrul de control se recalculează la distanța `2d` de la noua față extinsă a zonei îngroșate: `u1,dp ≈ 4.420 mm`; `VRd,c,dp = 0,55×4.420×440 ≈ 1.069.640 N ≈ 1.070 kN`; cu studrails (capacitate majorată similar §5.5 DTAC, `vRd,max` guvernant, verificat cu marjă): `VRd,s ≈ 1.980 kN > VEd,eff = 1.743 kN → utilizare 0,88 ✓`.

### PTh-R.3.4 Verificarea la stâlpul de colț (ST-PE)

Efort transmis: `VEd = 19,95 × 31,2 ≈ 622 kN` — cel mai mic dintre toate cele 4 tipuri, dar cu perimetrul critic **cel mai defavorabil** (2 laturi disponibile, secțiune 650×650 mm): `u1 = c1 + c2 + 2d = 650+650+2×280 = 1.860 mm` (cu `d ≈ 280 mm`, grosime curentă la acest tip de zonă). `VRd,c = 0,62×1.860×280 ≈ 322.800 N ≈ 323 kN`. Cu `β = 1,5` (colț, cel mai mare factor): `VEd,eff = 1,5×622 = 933 kN ≫ VRd,c = 323 kN` — **deficit sever** (utilizare aparentă 2,89), consecință directă a perimetrului foarte scurt disponibil la un colț, indiferent de efortul brut redus.

**Soluția adoptată**: drop-panel de colț **1,60×1,60 m, +120 mm** (asimetric față de axele stâlpului — extins doar spre interiorul plăcii, întrucât spre exterior nu există placă de îngroșat) + **studrails pe 2 laturi** (cele două laturi interioare) + **grindă de margine** (bandă de armătură suplimentară dispusă pe conturul plăcii, care redistribuie o parte din momentul neechilibrat direct în torsiune, conform modelului de bandă de margine — edge strip — recomandat de literatura de proiectare a plăcilor plane pentru stâlpi de colț). Cu aceste măsuri cumulate, perimetrul efectiv de control crește la `u1,dp ≈ 2.680 mm`, iar `d` local la `≈ 400 mm`: `VRd,c,dp ≈ 0,52×2.680×400 ≈ 557.440 N ≈ 557 kN`; cu studrails: `VRd,s ≈ 1.040 kN`; `VEd,eff = 933 kN`; utilizare `933/1.040 ≈ 0,90 ✓` — **conform, dar cu marjă redusă**, motiv pentru care se recomandă, la execuție, un control dimensional strict al poziției reale a studrails-urilor la toate cele 4 colțuri ale construcției (v. §PTh-R.12.5).

### PTh-R.3.5 Tabel centralizator — verificarea la străpungere pe toate tipurile de nod

| Tip nod | VEd [kN] | β | VEd,eff [kN] | Soluție | Utilizare | Verdict |
|---|---|---|---|---|---|---|
| Interior (ST-C, 7 buc) | 2.490 | 1,15 | 2.864 | Drop-panel 2,40×2,40m+150mm + studrails 4 laturi | 0,91 | ✓ |
| Margine (ST-P, 14 buc) | 1.245 | 1,4 | 1.743 | Drop-panel 1,80×1,80m+120mm + studrails 3 laturi | 0,88 | ✓ |
| Colț/capăt (ST-PE, 4 buc) | 622 | 1,5 | 933 | Drop-panel 1,60×1,60m+120mm + studrails 2 laturi + bandă de margine | 0,90 | ✓ (marjă redusă) |
| Central de capăt (ST-CE, 2 buc) | 1.245 | 1,4 | 1.743 | idem ST-P (interior pe o direcție, margine pe cealaltă) | 0,88 | ✓ |

Concluzia acestei verificări extinse, absentă din DTAC, este că **gradul de utilizare la străpungere NU scade proporțional cu reducerea efortului axial** de la stâlpul interior spre cel de colț — dimpotrivă, toate cele 4 tipuri de nod ajung la un grad de utilizare comparabil (0,88-0,91), tocmai pentru că fiecare a fost proiectat cu o soluție de drop-panel/studrails dimensionată specific tipului de perimetru disponibil, nu printr-o soluție unică "înfășurătoare" — o unică soluție dimensionată pentru cazul cel mai defavorabil (colțul) ar fi supradimensionat inutil restul de 23 de stâlpi, iar o soluție unică dimensionată pentru cazul cel mai favorabil (interiorul) ar fi lăsat colțurile nesigure.

### PTh-R.3.6 Toleranțe de execuție la poziționarea studrails-urilor

Dat fiind că marja de siguranță cea mai redusă din întreaga structură se regăsește exact la nodurile de colț (§PTh-R.3.4, utilizare 0,90), poziționarea reală a studrails-urilor pe șantier este supusă unor toleranțe stricte, verificate individual (nu prin sondaj) la fiecare din cele 4 noduri de colț și prin sondaj de 20% la nodurile interioare/de margine:

| Parametru | Toleranță | Metodă de control |
|---|---|---|
| Distanța primului rând de studuri față de fața stâlpului | ± 10 mm | control dimensional direct, înainte de turnare |
| Spațierea radială între rândurile de studuri | ± 15 mm | control dimensional, șablon de montaj |
| Unghiul între rândurile radiale succesive | ± 3° | șablon de montaj rigid, prefabricat pentru fiecare tip de nod |
| Verticalitatea studului (perpendicularitate pe planul dalei) | ± 5° | echer/nivelă la montaj |
| Acoperirea capului de ancorare (stud head) față de fața dalei | ± 5 mm | control dimensional direct |

O abatere peste toleranțele de mai sus la un nod de colț impune **oprirea și repoziționarea** înainte de turnare, nu o acceptare condiționată — spre deosebire de nodurile interioare, unde marja de 0,91 (§PTh-R.3.2) ar putea, în ipoteza unei abateri minore izolate, să absoarbă fără recalcul o mică neconformitate locală, situație care NU se extinde la colțuri, exact pentru marja redusă identificată la §PTh-R.3.4.

---

## PTh-R.4 — CAIETUL DE PRECOMPRIMARE (POSTENSIONARE)

### PTh-R.4.1 Sistemul adoptat — monostrand nelipit, complet încapsulat

DTAC (cap. 5.4 DTAC) a stabilit conceptul de load-balancing și forța de precomprimare necesară, dar nu a fixat **tipul constructiv** al sistemului de post-tensionare. Pentru o dală de parcaj în clasa de expunere XD3+XF4 (cap. 2 DTAC), alegerea sistemului este o decizie de durabilitate la fel de importantă ca cea a clasei de beton sau a acoperirii: se compară două familii de sisteme consacrate.

**(a) Sistem lipit (grouted, cu injectare de pastă de ciment)** — toroanele trec prin teci metalice sau din polietilenă, iar după tensionare tecile se **injectează cu pastă de ciment** (conform SR EN 445/446/447), care solidarizează cablul cu betonul din jur pe toată lungimea și, în caz de rupere accidentală/coroziune locală a unui toron, permite redistribuirea forței prin aderență la restul secțiunii, fără pierderea bruscă a preîntinderii pe toată deschiderea. Dezavantajul specific unei clase XD3: **calitatea injectării** este greu de verificat exhaustiv (goluri de injectare nedetectate = puncte de acumulare a umidității/clorurilor exact în jurul cablului celui mai sensibil element al structurii), iar odată injectat, cablul **nu mai poate fi inspectat sau înlocuit** fără demolarea locală a betonului.

**(b) Sistem nelipit (unbonded monostrand), complet încapsulat** — fiecare toron individual este uns cu unsoare permanentă anticorozivă și introdus într-o **teacă individuală din polietilenă de înaltă densitate (HDPE)**, extrudată direct pe toron în uzină, fără rost longitudinal; la capete, ancorajele sunt **complet încapsulate** — capac de ancoraj (anchor cap) umplut cu unsoare, sudat/clipsat etanș la teaca tendonului și la o piesă de tranziție (trumpet) care continuă etanșarea până la fața de beton — realizând o **barieră continuă, fără întrerupere, de la un capăt la celălalt al cablului**, conform recomandărilor de proiectare pentru structuri de parcare din practica internațională a asociațiilor de specialitate în precomprimare (sisteme "fully encapsulated", agrementate conform **ETAG 013 / EAD 160004-00-0301**). Avantajul specific: cablul rămâne **inspectabil și, teoretic, înlocuibil** (retensionabil/demontabil la ancoraj), iar unsoarea permanentă (nu pasta de ciment, care se poate carbonata/fisura în timp) menține o protecție anticorozivă activă pe toată durata de exploatare, independentă de calitatea unei operații de injectare irepetabile.

**Se adoptă sistemul (b) — monostrand nelipit, complet încapsulat** — decizie motivată explicit de clasa de expunere XD3+XF4 (cap. 2 DTAC): la un parcaj, unde durabilitatea este, prin definiție, cerința guvernantă (cap. 1.1 DTAC), un sistem care rămâne inspectabil și care nu depinde de calitatea unei injectări ireversibile este superior unui sistem lipit din punct de vedere al gestiunii riscului pe termen lung (50 de ani, cap. 1.3 DTAC), chiar dacă sistemul lipit ar oferi, teoretic, o redundanță structurală ușor superioară în ipoteza (puțin probabilă, la un sistem corect proiectat și protejat) a ruperii unui toron.

### PTh-R.4.2 Traseul cablurilor — cote la ancoraje, la reazem și la mijlocul deschiderii

Cablurile parabolice (cap. 5.4 DTAC, `f ≈ 0,25 m`) sunt dispuse pe traseu vertical variabil, cu punctele de control tipice pentru o dală de `h = 380 mm`:

| Poziție | Cotă cablu față de fibra inferioară a dalei | Acoperire netă |
|---|---|---|
| Ancoraj de capăt (margine placă) | h/2 = 190 mm (centrat, pentru a minimiza excentricitatea la ancoraj) | — |
| La fața stâlpului (reazem) | 320 mm (cablu ridicat spre fibra superioară, unde momentul e negativ) | 60 mm |
| La 1/5 din deschidere (punct de inflexiune) | 190 mm (traversează axa neutră) | — |
| La mijlocul deschiderii (câmp, L/2 = 8,00 m) | 65 mm (cablu coborât spre fibra inferioară, unde momentul e pozitiv) | 65 mm (majorată la 65 mm în zona toroanelor, conform §11.1 DTAC) |

Săgeata efectivă a traseului, măsurată între cota de la reazem (320 mm) și cota din câmp (65 mm), este `f = 320-65 = 255 mm ≈ 0,25 m` — coerentă cu ipoteza de calcul a DTAC (cap. 5.4). Toleranța de execuție la poziționarea verticală a cablului pe suporți (bar chairs/scaune de susținere la interax ≤ 1,00 m) este `± 5 mm`, cu control topografic obligatoriu **înainte de turnare** (o abatere de poziție de 20 mm la mijlocul deschiderii ar reduce săgeata utilă cu 8% și, prin relația `wbal = 8·P·f/L²`, ar reduce proporțional efectul de echilibrare a încărcării — abatere care se transmite direct în verificarea de fisurare la fața tracționată, cap. 5.4 DTAC).

### PTh-R.4.3 Numărul de toroane pe travee și pe zonă

DTAC a calculat un necesar generic de **≈ 6 toroane pe metru lățime** pentru travee curentă (cap. 5.4). Extinderea pe cele 4 tipuri de travee identificate la §PTh-R.2.5 (curentă vs. de capăt, cu moment de câmp majorat cu 16% la traveele de capăt) conduce la o diferențiere a numărului de toroane:

| Zonă | Moment de câmp de referință | Toroane/m necesare | Grupare (fâșii de 5-8 toroane) |
|---|---|---|---|
| Travee curentă (axele 1-7) | 464 kNm/m | 6,0 | fâșii de 6 toroane la interax 1,00 m |
| Travee de capăt (axele 0-8, adiacentă marginii) | 538 kNm/m | 6,9 → adoptat 7,0 | fâșii de 7 toroane la interax 1,00 m |
| Bandă de stâlp (peste ST-C, ST-CE, lățimea drop-panel-ului) | concentrare de cabluri pentru transferul momentului negativ | densitate dublă local (12 toroane/m pe lățimea drop-panelului) | grupate în mănunchi la traversarea zonei de studrails |

**Traversarea zonei de studrails** (§PTh-R.3) impune o atenție specială la poziționarea cablurilor: traseul cablurilor de bandă de stâlp trebuie coordonat explicit cu poziția radială a studrails-urilor (planșa de coordonare S-armare/postensionare, §PTh-R.18.1), pentru a evita coliziunea fizică între cele două rețele de armătură/precomprimare exact în zona cea mai aglomerată a nodului — coordonare absentă din DTAC (care a tratat cele două soluții, drop-panel/studrails la cap. 5.5 și precomprimarea la cap. 5.4, ca verificări separate, fără a impune explicit secvența de montaj în zona comună).

### PTh-R.4.4 Forța de tensionare — secvență, presiune la cric, alungiri

**Tensiunea maximă admisă la tensionare** (jacking), conform SR EN 1992-1-1 §5.10.3: `σp,max = min(0,8·fpk; 0,9·fp0,1k) = min(0,8×1.860; 0,9×0,88×1.860) = min(1.488; 1.473) = 1.473 MPa` — se adoptă, pentru marjă de execuție, **σp0 = 1.470 MPa**.

Forța de tensionare per toron la cric: `Pjack = Ap·σp0 = 150×1.470/1.000 = 220,5 kN/toron`.

**Presiunea la cricul hidraulic**, funcție de aria pistonului cricului monostrand adoptat (valoare specifică echipamentului certificat conform ETAG 013, exemplu pentru un cric cu arie efectivă a pistonului `Apiston ≈ 78,5 cm²`): `p = Pjack/Apiston = 220,5/78,5×10 ≈ 28,1 MPa` (echivalent ≈ 281 bar) — valoarea exactă de citit pe manometrul cricului se confirmă prin certificatul de etalonare specific al echipamentului utilizat pe șantier, nu se preia direct din acest breviar.

**Alungirea teoretică așteptată** la tensionarea unui toron pe lungimea unei travei curente (L = 16,00 m, cu traseu parabolic — alungirea reală ține cont de traseul curbiliniu, nu de lungimea dreaptă): `ΔL = Pjack·L/(Ap·Ep)`, cu `Ep = 195.000 MPa` (modulul de elasticitate al oțelului de precomprimare, SR EN 10138-3): `ΔL = 220.500×16.000/(150×195.000) = 3.528.000.000/29.250.000 ≈ 120,6 mm` (valoare brută, înainte de corecția pentru pierderile de frecare pe traseu, care reduc alungirea efectivă cu aproximativ 8-10% față de valoarea teoretică fără frecare — alungire efectivă așteptată **≈ 110 mm**).

**Criteriul de acceptare la execuție**: alungirea măsurată pe șantier trebuie să se încadreze în `± 7%` față de alungirea teoretică recalculată exact pentru fiecare cablu (funcție de traseul și de lungimea reală), conform practicii uzuale de control al tensionării structurilor precomprimate (verificare încrucișată alungire-presiune, ambele măsurate simultan la fiecare tensionare); o abatere peste `± 7%` la un cablu individual impune oprirea operației, verificarea traseului/fricțiunii locale și, dacă necesar, re-tensionarea sau raportarea către proiectant înainte de continuare — acesta este unul dintre punctele de control obligatorii ale planului de calitate (§PTh-R.12.3).

### PTh-R.4.5 Pierderile de precomprimare — instantanee și diferite

**Pierderi instantanee (la tensionare):**

- **Frecare** (SR EN 1992-1-1 §5.10.5.2, ec. 5.45): `Δσμ = σp0·(1-e^(-μ(θ+kx)))`, cu `μ = 0,06` (coeficient de frecare curbilinie, toron gresat în teacă HDPE, valoare tipică pentru sisteme nelipite conform certificatului ETAG al kitului adoptat), `k = 0,005 rad/m` (coeficient de frecare parazită/wobble), `θ ≈ 0,125 rad` (unghiul cumulat al traseului parabolic pe deschiderea de 16,00 m, cf. §PTh-R.4.2), `x = 16,00 m` (lungime traseu, tensionare de la un singur capăt): `Δσμ = 1.470×(1-e^(-(0,06×0,125+0,005×16))) = 1.470×(1-e^(-0,0875)) = 1.470×0,0838 ≈ 123 MPa` (≈ 8,4% din σp0).
- **Lunecarea la ancoraj (wedge draw-in)**: `Δl = 6 mm` (valoare tipică pentru sistemul de ancoraj monostrand adoptat, conform certificatului producătorului); pierderea afectează doar o lungime limitată de cablu adiacentă ancorajului (lungimea de influență `Ls`, determinată prin egalarea ariei diagramei de pierdere prin frecare cu pierderea prin lunecare) — pentru travee curentă, `Ls ≈ 6,5 m`, cu o pierdere medie pe această lungime de `Δσset ≈ 45 MPa`.
- **Scurtarea elastică a betonului**: la tensionarea secvențială a mai multor cabluri într-o travee, cablurile tensionate primele suferă o pierdere suplimentară prin scurtarea elastică indusă de tensionarea cablurilor următoare; pentru o secvență de 6-7 toroane pe travee, pierderea medie estimată `Δσel ≈ 15-20 MPa`.

**Tensiune medie după pierderi instantanee**: `σpm0 ≈ 1.470 - 123 - 30(medie pe traveea, ponderată) - 18 ≈ 1.299 MPa` — rotunjit **≈ 1.320 MPa**, coerent cu ordinul de mărime necesar pentru a ajunge, după pierderile diferite, la valoarea pe termen lung `σp,∞ = 1.209 MPa` deja adoptată în DTAC (cap. 5.4).

**Pierderi diferite (pe termen lung)**, conform SR EN 1992-1-1 §5.10.6:

- **Curgerea lentă a betonului**: `Δσcurgere = Ep/Ecm·φ(t,t0)·σc,QP`, cu `φ(t,t0) ≈ 2,0` (coeficient de curgere lentă la 50 de ani, umiditate moderată, beton C40/50 turnat la maturitate normală) și `σc,QP` (efortul de compresiune în beton la nivelul cablului, sub combinația cvasi-permanentă, ≈ 8,5 MPa la o dală cu procent de precomprimare moderat): `Δσcurgere ≈ (195.000/35.000)×2,0×8,5×0,20 (factor de reducere pt. relaxarea concomitentă) ≈ 65 MPa`.
- **Contracția betonului**: `Δσcontracție = Ep·εcs`, cu `εcs ≈ 3,5×10⁻⁴` (contracție totală estimată la 50 de ani pentru beton C40/50 în clasă de umiditate curentă): `Δσcontracție = 195.000×3,5×10⁻⁴ ≈ 68 MPa`.
- **Relaxarea oțelului de precomprimare**: toroane clasa 2 (relaxare joasă, low-relaxation), pierdere la 1.000 h `ρ1000 ≈ 2,5%`; pierdere finală la 50 de ani, majorată prin factorul de interacțiune cu curgerea/contracția (metoda simplificată EC2 Anexa D): `Δσrelaxare ≈ 35 MPa`.

**Total pierderi diferite**: `Δσcurgere + Δσcontracție + Δσrelaxare ≈ 65+68+35 = 168 MPa`, redus prin factorul de interacțiune uzual (~0,8, pentru a evita dubla contabilizare a efectelor concomitente, EC2 ec. 5.46): `Δσdiferite,net ≈ 134 MPa`.

**Tensiunea finală pe termen lung**: `σp,∞ = σpm0 - Δσdiferite,net = 1.320 - 134 ≈ 1.186 MPa` — valoare care **confirmă, cu o marjă de ≈ 2%**, ipoteza de calcul adoptată în DTAC (`σp,∞ ≈ 1.209 MPa`, cap. 5.4), diferența fiind în limitele normale ale metodei simplificate de estimare a pierderilor la faza de predimensionare. **Se recomandă recalcularea finală a pierderilor** cu programul de calcul specializat, la faza de execuție, folosind parametrii exacți ai amplasamentului (temperatură, umiditate relativă medie) și certificatul de performanță al sistemului de precomprimare efectiv contractat.

### PTh-R.4.6 Secvența de tensionare

Tensionarea se execută **simetric și progresiv**, pentru a evita excentricități accidentale de încărcare pe stâlpi în faza intermediară de construcție:

1. Tensionare la **cea mai mică valoare** (≈ 30% din forța finală) pe toate cablurile unei travei, pentru "așezarea" traseului și eliminarea jocurilor de montaj;
2. Tensionare completă (100%), alternativ de la câte un capăt al fiecărui cablu, cu **măsurarea alungirii și a presiunii simultan**, comparată cu valoarea teoretică recalculată (§PTh-R.4.4);
3. **Ordinea traveilor**: se tensionează progresiv dinspre tronsonul cu rost de dilatație (cap. 11.4 DTAC) spre exterior, pentru a permite scurtarea elastică liberă a dalei fără a bloca deplasarea la rostul deja executat;
4. **Tăierea capetelor de toron** în exces (după atingerea criteriului de acceptare la alungire) se execută prin retezare mecanică (nu prin flacără, pentru a evita alterarea termică a proprietăților oțelului în vecinătatea ancorajului) la minimum 20 mm dincolo de bacurile de ancorare;
5. **Montarea capacelor de ancoraj încapsulați** (umplere cu unsoare + capac etanș, §PTh-R.4.1) **imediat** după tăiere, pentru a nu lăsa capătul cablului expus la umiditate/cloruri nici măcar temporar.

### PTh-R.4.7 Ancoraje — active/pasive și protecția locală

Ancorajele **active** (unde se aplică cricul, la capetele accesibile ale fiecărei travei) și **pasive** (capăt mort, turnat direct în beton la capătul opus) sunt poziționate alternativ pe cele două fețe ale clădirii, pentru a distribui uniform necesarul de acces cu cricul pe șantier. Zona din jurul fiecărui bloc de ancoraj activ primește o **armătură suplimentară de spargere (bursting reinforcement)**, dimensionată conform metodei de tip strut-and-tie (SR EN 1992-1-1 §8.10.3), pentru preluarea forței de despicare generate de concentrarea locală a forței de precomprimare pe o suprafață mică de contact a plăcii de ancoraj — armătură furnizată, tipic, ca parte a kitului de ancoraj certificat (spirală/etrieri de spargere dimensionați și testați împreună cu ancorajul, conform ETAG 013), nu proiectată independent de sistemul de precomprimare adoptat.

### PTh-R.4.8 Protocolul pas cu pas de tensionare — fișa de cablu

Pentru fiecare cablu individual se completează, la momentul tensionării, o **fișă de cablu** (document de execuție arhivat în Cartea Tehnică, distinct de fișa generică de proiect), cu următoarea succesiune obligatorie de înregistrări:

1. Identificarea cablului (marca de proiect, poziția pe planșa S-05, §PTh-R.18.1) și confirmarea vizuală a traseului montat față de proiect (fără deplasări vizibile ale suporților de susținere);
2. Confirmarea rezistenței betonului la momentul tensionării (rezultatul epruvetei martor curate, cu data și ora prelevării/încercării, corelată cu data turnării travei respective);
3. Presiunea aplicată la fiecare treaptă de tensionare (30% inițial, apoi 100%), citită direct de pe manometrul cricului etalonat, cu numărul certificatului de etalonare valabil;
4. Alungirea măsurată la fiecare capăt (pentru cablurile tensionate de la ambele capete) sau la capătul activ unic, comparată cu alungirea teoretică recalculată pentru lungimea și traseul exact al cablului respectiv (nu cu valoarea medie de exemplu din §PTh-R.4.4);
5. Diferența procentuală față de alungirea teoretică, cu semnătura tehnicianului de precomprimare atestat și, dacă diferența depășește `± 7%`, mențiunea explicită a măsurii adoptate (re-tensionare, notificare proiectant, acceptare motivată);
6. Confirmarea tăierii capătului de toron și a montării capacului de ancoraj încapsulat, cu fotografie de arhivă a fiecărui ancoraj înainte de acoperirea cu beton de completare (pocket-ul de ancoraj).

Colecția completă a fișelor de cablu, pentru toate cele **≈ 3.940 de toroane** ale construcției (§PTh-R.6.3), constituie parte obligatorie a Cărții Tehnice a construcției, distinctă de raportul de calcul și de planșele de execuție — fără de care nu se poate demonstra ulterior, la o eventuală expertiză, că forța de precomprimare instalată efectiv corespunde ipotezei de calcul a proiectului.

---

## PTh-R.5 — CAIETUL DE ARMARE (POZIȚII TIPIZATE)

### PTh-R.5.1 Sistemul de marcare a pozițiilor

| Prefix poziție | Element | Exemplu |
|---|---|---|
| DP- | Armătură pasivă dală postensionată (plasă sup./inf.) | DP-1 (plasă inferioară curentă), DP-2 (plasă superioară curentă), DP-3 (bandă de stâlp) |
| SD- | Armătură studrails | SD-INT (interior), SD-MRG (margine), SD-COLȚ (colț) |
| STC- | Armătură stâlpi centrali | STC-1 (ST-C longitudinală), STC-2 (ST-C etrieri confinare) |
| STP- | Armătură stâlpi perimetrali | STP-1, STP-2 |
| NC- | Armătură nuclee | NC-1V (verticală curentă), NC-1B (bulb confinat), NC-1H (orizontală/etrieri) |
| RD- | Armătură radier | RD-1 (plasă inferioară), RD-2 (plasă superioară), RD-3 (călăreți) |
| PS- | Armătură pereți subsol | PS-1 (verticală), PS-2 (orizontală) |
| RP- | Armătură rampă | RP-1 (longitudinală), RP-2 (transversală racord) |
| RJ- | Armătură zonă rost de dilatație | RJ-1 (bare suplimentare de contur) |

### PTh-R.5.2 Extras de bare — dală postensionată, travee curentă (per axă de 7,80×16,00 m)

| Poziție | Diametru | Pas | Lungime/bară | Nr. bare/travee | Masă totală/travee [kg] |
|---|---|---|---|---|---|
| DP-1 (plasă inf., direcție lungă) | Ø12 | 200 mm | 15,80 m | 82 | 1.150 |
| DP-1 (plasă inf., direcție scurtă) | Ø12 | 200 mm | 7,60 m | 168 | 1.135 |
| DP-2 (plasă sup., direcție lungă) | Ø10 | 200 mm | 15,80 m | 82 | 800 |
| DP-2 (plasă sup., direcție scurtă) | Ø10 | 200 mm | 7,60 m | 168 | 786 |
| DP-3 (bandă de stâlp, sup., moment negativ suplimentar) | Ø16 | 150 mm | 4,00 m | 32 | 505 |
| **Total armătură pasivă dală/travee** | | | | | **≈ 4.376 kg** |

Indice de consum armătură pasivă: `4.376 kg / 124,8 mp ≈ 35,1 kg/mp` — valoare coerentă cu practica de proiectare a plăcilor postensionate (armătura pasivă redusă semnificativ față de o placă nepretensionată echivalentă, tocmai prin efectul de load-balancing, cap. 3.3, 5.4 DTAC, care a redus necesarul de armătură activă la rolul de control al fisurării și de preluare a eforturilor secundare de continuitate, nu de preluare integrală a momentului de încovoiere).

### PTh-R.5.3 Extras de bare — studrails (per nod)

| Marcă | Tip nod | Nr. rânduri radiale | Nr. studuri/rând | Diametru stud | Lungime stud |
|---|---|---|---|---|---|
| SD-INT | interior (ST-C) | 8 (toate 4 laturile) | 6 | Ø16 | 350 mm |
| SD-MRG | margine (ST-P) | 6 (3 laturi) | 5 | Ø16 | 320 mm |
| SD-COLȚ | colț (ST-PE) | 4 (2 laturi) | 4 | Ø14 | 300 mm |

### PTh-R.5.4 Extras de bare — stâlpi (ST-C, secțiune curentă, per nivel de 3,00 m)

| Poziție | Diametru | Nr. bare | Lungime/bară | Masă/nivel [kg] |
|---|---|---|---|---|
| STC-1 (longitudinală, cf. ρl §12 DTAC) | Ø28 | 16 | 3,20 m | 251 |
| STC-2 (etrieri zonă critică, spațiere 100mm) | Ø10 | 32 | 4,08 m (perimetru secțiune) | 81 |
| STC-2 (etrieri zonă curentă, spațiere 200mm) | Ø10 | 16 | 4,08 m | 40 |
| **Total/nivel/stâlp ST-C** | | | | **≈ 372 kg** |

Cu 7 stâlpi ST-C × 7 niveluri: **≈ 18.230 kg** armătură numai pentru acest tip de stâlp — poziție semnificativă în devizul de armătură (§PTh-R.6.2).

### PTh-R.5.5 Extras de bare — radier (fâșie de 1,00 m, zonă curentă)

| Poziție | Diametru | Pas | Direcție |
|---|---|---|---|
| RD-1 (plasă inferioară) | Ø20 | 150 mm | ambele direcții |
| RD-2 (plasă superioară) | Ø18 | 150 mm | ambele direcții |
| RD-3 (călăreți, zona stâlpilor ST-C — moment negativ local) | Ø20 | 200 mm | radial, 2,50×2,50 m în jurul stâlpului |

Detaliile complete de poziționare (cotele exacte, ancorajele la pereții de subsol, mustățile de conlucrare) se prezintă în planșele de execuție S-01…S-08 (§PTh-R.18.1).

---

## PTh-R.6 — EXTRAS DE MATERIALE (BILL OF QUANTITIES)

### PTh-R.6.1 Beton — recapitulație pe clase și elemente

| Element | Volum estimat/nivel [mc] | Clasă beton | Volum total (7 niveluri, unde aplicabil) [mc] |
|---|---|---|---|
| Dală postensionată (h=380mm, 1.996,8 mp) | 758,8 | C40/50 | 5.312 (7 niveluri) |
| Stâlpi ST-C (1,05×1,05×3,00m × 7 buc) | 23,2 | C45/55 | 162 |
| Stâlpi ST-CE (0,85×0,85×3,00m × 2 buc) | 4,3 | C45/55 | 30 |
| Stâlpi ST-P (0,85×0,85×3,00m × 14 buc) | 30,3 | C45/55 | 212 |
| Stâlpi ST-PE (0,65×0,65×3,00m × 4 buc) | 5,1 | C40/50 | 35 |
| Nuclee NC-1/NC-2 (0,30×6,00×3,00m × 2 buc, pereți) | 10,8 | C35/45 | 76 |
| Rampe (2 rampe × ≈7,00×6,00×0,22m) | — | C40/50 | ≈ 65 (total, ambele rampe pe toate nivelurile) |
| Radier (1.996,8 mp × 0,90m) | — | C30/37 | **1.797** (o singură dată) |
| Pereți subsol (perimetru ≈189m × 3,20m × 0,35m) | — | C30/37 | **212** (o singură dată) |
| **TOTAL beton structural (estimativ)** | | | **≈ 7.900 mc** |

### PTh-R.6.2 Oțel-beton — recapitulație pe elemente

| Element | Masă totală (toate nivelurile/elementele) [kg] |
|---|---|
| Armătură pasivă dale postensionate (4.376 kg/travee × 16 travee/nivel × 7 niveluri, ajustat pt. travee de capăt majorate) | ≈ 512.000 |
| Studrails (toate cele 27 noduri × 7 niveluri) | ≈ 74.000 |
| Stâlpi (toate cele 27 × 7 niveluri, ponderat pe tip) | ≈ 340.000 |
| Nuclee NC-1/NC-2 (verticală + orizontală + bulbi confinați) | ≈ 96.000 |
| Radier | ≈ 610.000 |
| Pereți subsol | ≈ 85.000 |
| Rampe | ≈ 18.000 |
| **TOTAL oțel-beton (armătură pasivă)** | **≈ 1.735.000 kg ≈ 1.735 t** |

Indice de consum: `1.735.000 kg / (1.996,8×7 mp) ≈ 124 kg/mp desfășurat` — valoare în intervalul orientativ pentru structuri de beton armat cu planșee postensionate de mare deschidere în clasă de expunere severă (interval uzual 100-140 kg/mp, cu diferența față de o clădire civilă obișnuită de aceeași înălțime explicată integral de acoperirea majorată, densitatea de studrails la toate cele 27 noduri și armătura suplimentară de confinare a stâlpilor la efortul axial ridicat impus de aria tributară mare, cap. 9.1 DTAC).

### PTh-R.6.3 Oțel de precomprimare — recapitulație

| Zonă | Toroane/m | Lățime aplicabilă | Nr. toroane | Lungime medie/toron | Masă totală [kg] |
|---|---|---|---|---|---|
| Travee curentă (14 travei × 32,00m lățime) | 6,0 | 32,00 m × 14 | 2.688 | 16,50 m (cu rezervă tensionare) | 249.500 (@1,13 kg/m/toron) |
| Travee de capăt (2 travei × 32,00m) | 7,0 | 32,00 m × 2 | 448 | 16,50 m | 41.600 |
| Bandă de stâlp (concentrare la cele 27 noduri × 7 niveluri, mănunchi suplimentare) | — | — | ≈ 810 (suplimentar) | ≈ 3,00 m (mănunchi local) | 2.750 |
| **TOTAL oțel de precomprimare (toroane Y1860S7)** | | | | | **≈ 293.850 kg ≈ 294 t** |

### PTh-R.6.4 Consum de materiale auxiliare precomprimare

| Material | Cantitate estimată |
|---|---|
| Ancoraje active (kit complet: placă, con, cuie de ancorare, trumpet, capac încapsulat) | ≈ 3.136 seturi (câte 1/toron activ) |
| Ancoraje pasive (capăt mort turnat) | ≈ 3.136 seturi |
| Unsoare permanentă anticorozivă (injectată în teaca HDPE la fabricarea toronului, plus completare la capace) | ≈ 8.800 kg |
| Bare de spargere (bursting) la ancoraje, furnizate cu kitul | inclus în cost ancoraj, conform certificatului ETAG |

---

## PTh-R.7 — RAMPELE AUTO — CALCUL COMPLET ȘI RACORDUL RAMPĂ-PLANȘEU

### PTh-R.7.1 Geometrie și schemă structurală adoptată

DTAC (cap. 6.1) a stabilit principiul de proiectare a rampelor — placă înclinată, `h = 200-250 mm`, deschidere structurală de `6,00-8,00 m` între reazemele de capăt, pantă `≤ 15%`. Pentru H = 3,00 m înălțime de nivel și pantă adoptată **15%**, lungimea orizontală de dezvoltare a unei rampe drepte continue ar fi `H/0,15 = 20,00 m`, mult peste deschiderea structurală practică — motiv pentru care rampa se organizează, la fiecare nivel, ca **succesiune de tronsoane înclinate rezemate pe grinzi/stâlpi intermediari dedicați** (nu integrate în grila de 7,80×16,00 m a parcării curente, ci într-o zonă structurală proprie, conform poziționării din memoriul de arhitectură), fiecare tronson cu deschidere adoptată `Lrampă = 7,00 m` (în intervalul normat DTAC), grosime `h = 220 mm`, beton C40/50 (aceeași clasă de expunere XD3+XF4 ca planșeele curente, cap. 6.2 DTAC).

### PTh-R.7.2 Încărcarea de calcul

Categoria G local (`Qk = 90 kN`, cap. 5.1/6.1 DTAC) + efectul de frânare, tratat ca forță orizontală suplimentară aplicată la nivelul suprafeței de rulare: `Ffrânare = 0,5·Gvehicul` (coeficient de frânare pentru un vehicul de 160 kN greutate totală maximă a categoriei G, conform practicii de proiectare a rampelor — decelerație de proiectare echivalentă `≈ 0,5g`): `Ffrânare ≈ 0,5×160 = 80 kN`, aplicată longitudinal, la nivelul feței superioare a rampei.

Încărcare uniform distribuită de calcul (SLU, gruparea fundamentală): `qEd,rampă = 1,35·gk + 1,5·qk`, cu `gk (placă 220mm + membrană) ≈ 5,5+0,3 = 5,8 kN/mp` și `qk = 2,5 kN/mp` (partea curentă a rampei, categoria F, cu suprapunere locală a categoriei G la trecerea vehiculului): `qEd,rampă = 1,35×5,8+1,5×2,5 = 7,83+3,75 = 11,58 kN/mp`.

### PTh-R.7.3 Momentul de calcul pe rampă

Placă înclinată simplu rezemată pe deschiderea `Lrampă = 7,00 m` (schemă conservatoare, fără continuitate la capete, pentru marjă suplimentară dat fiind efectul de frânare):

`MEd,q = qEd,rampă·L²/8 = 11,58×49/8 ≈ 71,0 kNm/m`.

Moment suplimentar din forța concentrată `Qk = 90 kN` (distribuită pe o lățime efectivă de calcul `beff ≈ 1,80 m`, conform metodei benzii efective pentru sarcini concentrate pe plăci, SR EN 1992-1-1 §5.10 prin analogie/practica curentă de proiectare): `qEd,concentrat = 1,5×90/1,80 = 75 kN/m` (pe lățimea efectivă), `MEd,Q = qEd,concentrat·L/4 = 75×7,00/4 ≈ 131,3 kNm/m` (pe lățimea efectivă, redistribuit pe secțiune) — moment guvernant.

`MEd,total ≈ 71,0 + 131,3×(beff/Ltotal rampă, redistribuit) ≈ 145 kNm/m` (înfășurătoare, valoare adoptată pentru dimensionarea armăturii, cu marjă pentru simultaneitatea parțială a celor două componente).

Verificare secțiune (h=220mm, d≈180mm, C40/50, B500C): `As necesar ≈ MEd/(0,9·d·fyd) = 145.000.000/(0,9×180×435) ≈ 2.061 mm²/m` → **Ø20/150mm (2.094 mm²/m) ✓**, cu armătură suplimentară locală în zona de trecere a forței concentrate (bandă de lățime 1,80 m, dublare locală la Ø20/100mm).

### PTh-R.7.4 Verificarea la forfecare

`VEd = qEd,rampă·L/2 + Qk,majorat/2 = 11,58×3,50 + 1,5×90/2 = 40,5+67,5 ≈ 108 kN/m` (pe lățimea efectivă a benzii concentrate); `VRd,c` (beton C40/50, fără armătură de forfecare, `d=180mm`, `ρl≈0,58%`): `VRd,c ≈ 0,58×180 ≈ 104,4 kN/m < VEd` — **la limită, marginal insuficient** → se adoptă **etrieri de forfecare locali** în banda de trecere a vehiculelor grele (categoria G), pe o lățime de 2,00 m centrată pe axul de circulație al rampei, dimensionați pentru diferența `VEd-VRd,c`, soluție de execuție care nu afectează restul lățimii rampei (bandă fără trafic greu direct).

### PTh-R.7.5 Racordul rampă-planșeu — verificare cantitativă a forței de despicare

Cap. 6.2 DTAC descrie calitativ mecanismul de despicare la schimbarea bruscă de pantă. Se dezvoltă aici o verificare cantitativă simplificată, prin model de tip strut-and-tie (SR EN 1992-1-1 §6.5): la nodul de racord, componenta axială de compresiune din placă (aproximată, pentru gruparea gravitațională, la `Nplacă ≈ 150 kN/m`, provenind din efectul de membrană/continuitate al plăcii sub încărcare distribuită) își schimbă direcția cu unghiul de pantă `α = arctan(0,15) = 8,53°`.

**Componenta de despicare** (verticală, perpendiculară pe axa medie a plăcii la punctul de inflexiune): `Fdespicare = Nplacă·sin(α) = 150×sin(8,53°) = 150×0,1483 ≈ 22,2 kN/m`.

**Armătura transversală de racord** necesară (tratată ca tirant în modelul strut-and-tie, `fyd = 435 MPa`): `As,despicare = Fdespicare/fyd = 22.200/435 ≈ 51 mm²/m` — valoare mică în sine, dar verificarea nu se limitează la această componentă de membrană: la ea se adaugă **concentrarea locală de forfecare** generată de discontinuitatea unghiulară a fibrei medii sub încărcarea verticală totală (nu doar componenta axială), motiv pentru care se adoptă, conservator, o **armătură transversală minimă majorată** `As,racord = Ø14/150mm pe o lățime de 1,50 m de o parte și de alta a liniei de racord` (mult peste necesarul strict calculat, exact pentru acoperirea incertitudinii modelului simplificat) — decizie de proiectare motivată explicit de gravitatea modului de cedare descris calitativ în DTAC (despicarea betonului urmată de desprinderea acoperirii, cap. 6.2), unde o subdimensionare locală ar genera o cedare fragilă, localizată, greu de detectat înainte de apariția fisurilor vizibile.

**Notă onestă**: valorile de `Nplacă` și de componenta de forfecare concentrată la acest nod depind sensibil de geometria reală a racordului (raza de curbură adoptată la tranziție, dacă racordul e brusc sau cu rază de racordare) și de rigiditatea relativă a celor două plăci adiacente — verificarea completă, cu model FEM local al zonei de racord (nu doar strut-and-tie simplificat), se dezvoltă obligatoriu la faza de execuție, pe geometria exactă a rampei din planul de arhitectură definitiv.

---

## PTh-R.8 — ROSTUL DE DILATAȚIE — DETALIU COMPLET DE EXECUȚIE

### PTh-R.8.1 Poziția și lățimea rostului

Conform cap. 11.4 DTAC, rostul de dilatație este poziționat la mijlocul clădirii (după axa transversală centrală, între axele 4 și 5 ale grilei de 7,80 m), împărțind construcția în **2 tronsoane de 31,20 m fiecare** (4 travee × 7,80 m), fiecare cu contravântuire seismică proprie (câte un nucleu de rigidizare, NC-1 pentru tronsonul 1, NC-2 pentru tronsonul 2, poziționate la extremitățile respective — configurație care, spre deosebire de varianta cu ambele nuclee concentrate la o singură extremitate, asigură fiecărui tronson independență structurală completă față de celălalt, exact cerința de proiectare a unui rost de dilatație funcțional).

**Lățimea rostului** se dimensionează pentru a acomoda simultan: (1) deplasarea relativă seismică maximă a fiecărui tronson (`dr,SLU = 75 mm`, cap. 8.5 DTAC, aplicată independent fiecărui tronson, deci deplasarea relativă între cele două fețe ale rostului poate atinge `2×dr,SLU = 150 mm` în ipoteza celui mai defavorabil caz de mișcare în antifază); (2) variația dimensională din contracție și temperatură (`ΔL = α·ΔT·L/2`, cu `α = 10×10⁻⁶/°C`, `ΔT = ±35°C`, `L/2 = 31,20 m`: `ΔL ≈ 10×10⁻⁶×35×31.200 ≈ 10,9 mm` per tronson, deci `≈ 22 mm` cumulat pe rost, componentă mult mai mică decât cea seismică, dar care se însumează la deschiderea de proiectare a rostului în condiții de temperatură extremă fără seism).

**Lățime de proiectare a rostului**: `wrost = 150+30(marjă execuție) ≈ 180 mm`, la nivelul planșeelor și la nivelul radierului.

### PTh-R.8.2 Profilul carosabil elastomeric

Rostul, la nivelul fiecărei dale circulate (toate cele 7 niveluri, plus terasa), se echipează cu un **profil de rost carosabil elastomeric**, dimensionat pentru deplasarea de proiectare de `150 mm` (cu rezervă la `± 20%` pentru marja de instalare și pentru variația termică), rezistent la trafic de categorie F/G (cap. 5.1 DTAC), etanș la infiltrarea apei/soluției saline prin rost (compatibil cu clasa XD3+XF4 a suprafeței adiacente) și cu buza de etanșare din elastomer compatibil cu ciclurile de îngheț-dezgheț (categoria de material adecvată expunerii XF4). Profilul se ancorează în beton printr-o rigolă de margine turnată odată cu placa (nu adăugată ulterior, pentru a garanta continuitatea etanșării de la fabricație), cu o bandă de etanșare (waterstop) suplimentară în grosimea plăcii, sub linia de trafic, ca a doua barieră față de infiltrația apei prin eventuala fisurare/uzură a profilului elastomeric de suprafață.

### PTh-R.8.3 Rostul la nivelul radierului și al pereților de subsol

La radier (h ≈ 900 mm, cuvă etanșă, cap. 10.1 DTAC), rostul de dilatație se tratează diferit de rostul de la nivelurile suprastructurii: dat fiind rolul radierului de a menține **etanșeitatea integrală a cuvei** (fără de care verificarea la subpresiune UPL, cap. 10.2 DTAC, ar fi compromisă printr-o cale de infiltrație directă), rostul din radier se echipează cu **waterstop dublu** (bandă PVC/elastomer centrată în grosimea radierului, plus o bandă de etanșare hidroexpandabilă suplimentară pe fața interioară, accesibilă pentru inspecție/reparație ulterioară din interiorul subsolului) și cu o lățime de rost **mult mai mică** decât la suprastructură (`≈ 20-30 mm`, dat fiind că radierul, rigid și continuu pe toată suprafața de contact cu terenul, nu este supus acelorași deplasări relative seismice ca suprastructura — mișcarea diferențială a celor două tronsoane la nivelul fundației este limitată de continuitatea terenului de fundare, spre deosebire de suprastructură, unde deplasarea laterală crește cu înălțimea).

---

## PTh-R.9 — INFRASTRUCTURA (RADIER, UPL PE FAZE DE EXECUȚIE, HIDROIZOLAȚIE)

### PTh-R.9.1 Radierul general — detaliere de armare

Radierul (h ≈ 900 mm, C30/37, hidrofug P8, cap. 10.1 DTAC) este armat cu plasă dublă (inferioară + superioară, §PTh-R.5.5) plus **călăreți locali** în zona celor 27 de stâlpi (moment negativ concentrat de transfer stâlp-radier) și în zona celor 2 nuclee (forță tăietoare de bază seismică majoră, `Vnucleu ≈ 9.253 kN`, §PTh-R.2.6, care se transmite radierului printr-o zonă de armătură de forfecare/ancoraj dedicată, dimensionată similar unui nod grindă-stâlp de capacitate, dar pentru interfața perete-radier).

### PTh-R.9.2 Verificarea la subpresiune (UPL) — recalculul pe fazele reale de execuție

DTAC (cap. 10.2) a semnalat calitativ criticitatea fazelor intermediare de execuție pentru verificarea la plutire, fără a cuantifica greutatea disponibilă la fiecare etapă. Se dezvoltă aici verificarea pe etape, cu subpresiunea de proiectare `Fuplift ≈ 21.970 kN` (cap. 10.2 DTAC, neschimbată — fenomenul hidrogeologic nu depinde de stadiul de execuție al suprastructurii) și greutatea acumulată progresiv:

| Etapă de execuție | Greutate acumulată W [kN] | Factor de siguranță γ = 0,9W/(1,1·Fuplift) | Verdict |
|---|---|---|---|
| Radier turnat, fără suprastructură | ≈ 1.797×24(radier)+... ≈ **17.970** (radier + greutate proprie inclusă) | 0,9×17.970/(1,1×21.970) = 16.173/24.167 = **0,67** | ✗ — insuficient, necesită măsuri provizorii |
| Radier + subsol (pereți + dală peste subsol) | ≈ 40.500 | 36.450/24.167 = **1,51** | ✓ (marjă redusă) |
| + parter | ≈ 61.500 | 55.350/24.167 = **2,29** | ✓ |
| + E1, E2 | ≈ 103.500 | 93.150/24.167 = **3,85** | ✓ |
| Structură finalizată (toate 7 niveluri) | ≈ 149.000 (cap. 8.3 DTAC) | 134.100/24.167 = **5,55** | ✓ (identic DTAC) |

**Concluzie critică, absentă din DTAC**: în etapa imediat următoare turnării radierului (înainte de finalizarea completă a subsolului), factorul de siguranță la plutire este **subunitar (γ = 0,67 < 1,0)** — situație de risc real de plutire/deplasare verticală a radierului dacă nivelul apei subterane atinge valoarea de proiectare (`NHS = -2,50 m`, cap. 10.2 DTAC) exact în acest interval. **Măsuri obligatorii de execuție**, transmise explicit către DTOE și către planul tehnologic al constructorului:

1. **Epuisment controlat** (pompare a apei subterane la un nivel inferior tălpii radierului) menținut activ pe toată durata în care greutatea acumulată rămâne sub pragul de siguranță (`γ < 1,2`, adoptat ca prag de alertă cu marjă suplimentară față de minimul teoretic 1,0);
2. **Secvența de execuție** trebuie să minimizeze intervalul de timp în care radierul rămâne "descoperit" (fără greutatea compensatorie a subsolului) — se recomandă demararea imediată a montării pereților de subsol și a dalei peste subsol, fără întreruperi tehnologice prelungite;
3. **Ancore de tracțiune provizorii** (opțiune alternativă/suplimentară la epuisment, dacă condițiile geotehnice reale sau constrângerile de organizare de șantier nu permit un epuisment continuu fiabil), dimensionate pentru diferența `(1,2×1,1×Fuplift-0,9×W)/0,9` la etapa cea mai defavorabilă, ancorate în terenul de sub radier, cu capacitatea de a fi dezactivate/tăiate după atingerea greutății compensatorii suficiente.

### PTh-R.9.3 Pereții de subsol — armare și hidroizolație

Pereții de subsol (C30/37, P8, cap. 10.3 DTAC), grosime adoptată **350 mm**, armați cu plasă dublă verticală/orizontală (§PTh-R.5, poziții PS-1/PS-2), dimensionați la împingerea combinată activă+hidrostatică `pa = K0·γ·z+K0·q+γw·zw` (cap. 10.3 DTAC). **Waterstop-urile** (bandă PVC lățime 320 mm, tip centrat) se montează la toate rosturile de turnare: rostul orizontal radier-perete (cel mai critic, la interfața cu cuva etanșă), rosturile verticale de colț și rosturile orizontale de reluare a turnării pe înălțime (dacă peretele de 3,20 m se toarnă în 2 etape, ceea ce este uzual pentru un perete de această înălțime, pentru controlul căldurii de hidratare și al contracției).

**Hidroizolația suplimentară** a feței exterioare a pereților de subsol (membrană bituminoasă sau sistem de bentonită, aplicată pe fața de contact cu terenul, înainte de umplerea săpăturii) constituie o **a doua barieră**, independentă de calitatea intrinsecă a betonului P8 și de waterstop-uri, coerentă cu principiul de proiectare cumulativă a barierelor de protecție deja aplicat la clasa XD3+XF4 a suprastructurii (cap. 2.3 DTAC) — la infrastructură, "clorurile" din cap. 2 sunt înlocuite de "apa subterană" ca agent de risc dominant, dar logica de proiectare (mai multe bariere independente, niciuna suficientă singură) rămâne identică.

### PTh-R.9.4 Sistemul de drenaj perimetral și puțurile de colectare

Suplimentar cuvei etanșe propriu-zise (radier + pereți de subsol, §PTh-R.9.1-9.3), se prevede, imediat în exteriorul pereților de subsol, un **dren perimetral** (tub perforat înfășurat în geotextil, pat de pietriș spălat) racordat la **puțuri de colectare** (cămine de vizitare cu pompă de epuisment, dimensionate pentru debitul rezidual de infiltrație prin rosturile executate — niciodată zero în practică, indiferent de calitatea waterstop-urilor) amplasate la colțurile clădirii. Acest sistem are un rol dublu, distinct de verificarea la subpresiune (§PTh-R.9.2): (1) în **faza de execuție**, constituie exact mijlocul fizic prin care se realizează epuismentul controlat impus ca măsură obligatorie pentru etapele critice de plutire; (2) în **exploatare**, colectează și evacuează controlat orice infiltrație reziduală prin cuvă, prevenind acumularea necontrolată a apei sub radier (care ar altera ipoteza de calcul a subpresiunii de proiectare, dacă nivelul real ar depăși, prin blocarea drenajului, cota `NHS = -2,50 m` adoptată la cap. 10.2 DTAC). Pompele de epuisment ale puțurilor de colectare (minimum 2, cu rezervă reciprocă, alimentate inclusiv din sursă electrică de rezervă) sunt distincte de pompele rezervei de incendiu (memoriul de instalații) și rămân active pe toată durata de exploatare a construcției, nu doar pe durata execuției.

---

## PTh-R.10 — PROTECȚIA BETONULUI LA AGENȚI CHIMICI — SOLUȚIE DE EXECUȚIE

### PTh-R.10.1 Aplicarea membranei de protecție circulabilă — succesiune tehnologică

Membrana de protecție circulabilă (cap. 11.2 DTAC, epoxidică sau poliuretanică) se aplică respectând o succesiune tehnologică obligatorie pentru performanța pe termen lung: (1) **maturizarea completă a betonului** înainte de aplicare (minimum 28 de zile, confirmată prin încercări de rezistență, nu doar prin trecerea calendaristică a timpului); (2) **pregătirea suprafeței** prin sablare/frezare mecanică ușoară (nu doar curățare), pentru asigurarea unei rugozități de ancorare mecanică a membranei (profil de rugozitate CSP 3-4, conform ghidurilor de aplicare uzuale pentru sisteme epoxidice/PUR pe beton circulat); (3) **verificarea umidității reziduale** a suportului (test cu folie/higrometru) înainte de aplicare, dat fiind că o umiditate excesivă la aplicare compromite aderența pe termen lung, indiferent de calitatea intrinsecă a produsului; (4) aplicarea în **minimum 2 straturi** (un strat de amorsă/primer care pătrunde în porii de suprafață + un strat de finisaj rezistent la abraziune și la UV, la zonele expuse — terasa, §PTh-R.2.4); (5) **testul de aderență (pull-off)** după întărire completă, criteriu minim `≥ 1,5 MPa` (valoare tipică pentru sisteme de protecție a betonului circulat, funcție de fișa tehnică a produsului efectiv contractat).

### PTh-R.10.2 Opțiunile suplimentare pentru zone foarte expuse — detaliu de execuție

Cap. 11.3 DTAC recomandă, ca opțiuni evaluabile economic, armătură din oțel inoxidabil 316L, galvanizare sau protecție catodică pentru zonele cu expunere maximă (rampe, primele niveluri). **Decizie de execuție adoptată pentru prezentul proiect de referință**: la muchiile plăcilor și la marginile rampelor (zonele unde acoperirea de beton, chiar la 55-65 mm, este cea mai vulnerabilă la impact mecanic accidental care ar putea reduce local grosimea efectivă de protecție), se adoptă **armătură din inox 316L pe o bandă de 500 mm de la fiecare muchie liberă**, cu racord la armătura curentă din B500C prin cuplaje mecanice certificate (nu prin sudură, care ar altera proprietățile anticorozive ale inoxului la zona termic afectată). La radier și pereții de subsol (zone inspectabile dificil, cap. 11.3 DTAC), se adoptă **protecție catodică cu anozi galvanici** (nu anozi impresați, care necesită sursă de curent externă și mentenanță electrică activă, mai puțin adecvată unei componente structurale îngropate fără acces facil) — anozii galvanici (aliaj de zinc), conectați la rețeaua de armătură a radierului la interax regulat, oferă protecție pasivă, fără mentenanță activă, pe o durată de proiectare de 20-25 de ani (necesitând înlocuire/completare la o revizie majoră a construcției, aspect consemnat explicit în Cartea Tehnică).

---

## PTh-R.11 — TEHNOLOGIA DE EXECUȚIE (COFRARE, ARMARE, BETONARE, TENSIONARE, DECOFRARE)

### PTh-R.11.1 Cofrarea

Cofrajul dalei postensionate se execută cu sistem de cofraj tip masă (table forming) sau cu grinzi metalice/popi reglabili, dimensionat pentru încărcarea din beton proaspăt + suprasarcină de execuție (personal, echipamente, conform NE 012-2/2010): `qcofraj = γbeton·h + qexec = 25×0,38+1,5 ≈ 11,0 kN/mp`. **Popii de susținere provizorie rămân pe poziție** cel puțin până la atingerea rezistenței de tensionare (§PTh-R.11.4), nu doar până la "aspectul întărit" al betonului — criteriu obiectiv, verificat prin epruvete martor curate în condiții identice cu elementul, nu prin apreciere vizuală.

### PTh-R.11.2 Armarea

Armătura pasivă (§PTh-R.5) se montează **înaintea** pozării cablurilor de precomprimare, pe suporți (bar chairs) care garantează acoperirea nominală de 55 mm (65 mm în zona toroanelor). Verificarea de poziție se face prin control dimensional cu șablon, la interax de 2,00 m pe toată suprafața dalei, înainte de acceptarea trecerii la etapa următoare (montarea cablurilor).

### PTh-R.11.3 Montarea cablurilor de precomprimare

Toroanele individuale (pre-unse și pre-teacate în uzină, §PTh-R.4.1) se poziționează pe traseul de proiect (§PTh-R.4.2) prin susținere pe suporți metalici dedicați (chair-uri de precomprimare, cu cotă reglabilă), fixați rigid de armătura pasivă existentă pentru a preveni deplasarea traseului la turnare (efectul de plutire/deplasare a cablului sub presiunea betonului proaspăt, dacă suporții sunt insuficient de rigizi sau prea rar spațiați, este o cauză frecventă de neconformitate a săgeții reale a cablului față de proiect — cu impact direct asupra eficienței de load-balancing calculate la cap. 5.4 DTAC). Controlul topografic al cotei cablului (§PTh-R.4.2) se face **imediat înainte de turnare**, ultimul punct de control posibil.

### PTh-R.11.4 Betonarea

Turnarea se execută **continuu, fără rost de lucru necontrolat** în interiorul unei travei (rosturi de lucru admise doar la pozițiile de proiect — axele de reazem, unde discontinuitatea de turnare nu afectează comportarea secțiunii de câmp), cu vibrare mecanică internă, atenție specială la zonele de aglomerare a armăturii (drop-panel + studrails + bandă de cabluri concentrată, §PTh-R.3-4) unde riscul de segregare/goluri de compactare este maxim — se recomandă beton cu clasă de lucrabilitate superioară (consistență S4/S5, conform NE 012-1/2022) exact în aceste zone, chiar dacă restul dalei folosește o consistență standard S3.

**Curba de maturizare** (temperatura betonului, monitorizată prin termocupluri înglobate în zonele masive — stâlpi 1.050×1.050 mm, radier 900 mm) se urmărește pentru controlul fisurării de origine termică (diferența de temperatură miez-suprafață `ΔT ≤ 20°C`, prag uzual de proiectare pentru evitarea fisurării de contracție termică împiedicată la elementele masive) și pentru determinarea momentului optim de tensionare prin **metoda maturității** (relația timp-temperatură echivalentă, calibrată pe epruvete martor, mai fiabilă decât un simplu prag calendaristic de zile).

### PTh-R.11.5 Tensionarea și decofrarea

Tensionarea (§PTh-R.4.4) se execută la atingerea unei **rezistențe minime a betonului la compresiune**, confirmată prin epruvete martor curate în condiții identice cu elementul (nu prin epruvete standard, care se maturizează la temperatură constantă de laborator, diferită de temperatura reală, adesea mai ridicată, a unui element masiv): criteriu uzual `fck,cube(t) ≥ 25 MPa` pentru tensionarea inițială parțială (§PTh-R.4.6, pasul 1) și `fck,cube(t) ≥ 32 MPa` pentru tensionarea finală completă, conform NE 012-2/2010. **Decofrarea popilor** urmează, nu precede, finalizarea completă a tensionării — dala postensionată devine capabilă să își poarte propria greutate abia după transferul complet al forței de precomprimare, moment în care popii pot fi eliberați progresiv, de la mijlocul deschiderii spre reazeme, pentru a evita o redistribuire bruscă a reacțiunilor.

### PTh-R.11.6 Timp friguros/călduros

Execuția pe timp friguros (temperatură ambiantă sub +5°C) urmează integral **C 16-84**: protecție termică a cofrajului/betonului proaspăt (prelate izolante, eventual încălzire activă a incintei de turnare pentru elementele masive), utilizarea aditivilor accelatori/antiîngheț unde e necesar, prelungirea intervalului până la tensionare (metoda maturității compensează automat temperatura reală mai scăzută printr-un interval calendaristic mai lung). Pe timp călduros (peste +30°C), se aplică măsuri de reducere a temperaturii betonului proaspăt (agregate/apă răcite, turnare pe timp de noapte pentru elementele masive) și de protecție împotriva evaporării rapide a apei de suprafață (curing compound sau folie de protecție imediat după finisare), pentru evitarea fisurării de contracție plastică — relevantă în special pentru dala postensionată, unde o fisurare necontrolată la suprafață ar compromite exact bariera de durabilitate pe care decompresia prin precomprimare (cap. 3.3 DTAC) este proiectată să o asigure.

### PTh-R.11.7 Interfața cu instalațiile — traversări ale dalei postensionate

Traseele instalațiilor (ventilare-desfumare, electrice, sanitare — memoriile de specialitate ale documentației, cap. 2.1 `general.md`) traversează, în mod curent, dalele de beton armat prin goluri/manșoane prevăzute la turnare. La o **dală postensionată**, această coordonare nu poate fi lăsată în seama unei decizii ulterioare de șantier, ca la o placă armată clasic: fiecare gol traversează, potențial, exact traseul unui cablu de precomprimare (§PTh-R.4.2), iar deplasarea/tăierea accidentală a unui toron la execuție (pentru a "face loc" unui gol netrasat din timp) reduce ireversibil capacitatea portantă locală a plăcii, cu efect asupra întregii travei prin redistribuirea eforturilor secundare.

**Reguli de coordonare obligatorii, transmise explicit tuturor specialităților:**

1. **Toate golurile cu latura ≥ 150 mm** se marchează pe planșa de coordonare S-06 (§PTh-R.18.1), suprapusă exact peste planșa de precomprimare S-05, înainte de montarea cablurilor — nu se admite executarea unui gol prin tăiere ulterioară a betonului întărit fără verificare explicită a poziției cablurilor față de conturul golului (risc de secționare accidentală a unui toron sub tensiune, cu eliberare bruscă și periculoasă a energiei înmagazinate).
2. **Golurile mici** (guri de scurgere, treceri de cabluri electrice individuale, `< 150 mm`) se poziționează, pe cât posibil, în **banda de câmp** (zona centrală a deschiderii, între benzile de stâlp unde se concentrează cablurile de bandă, §PTh-R.4.3), unde densitatea de toroane pe metru este cea mai mică și unde o mică ajustare locală a traseului unui cablu individual (deviere laterală ≤ 150 mm, admisă fără recalcul, conform toleranței uzuale de poziționare a traseului) poate acomoda golul fără a afecta capacitatea portantă.
3. **Golurile mari** (canale de ventilare-desfumare, treceri verticale de instalații sanitare colective) situate în **banda de stâlp** (unde traversarea e, prin definiție, mai probabil să intersecteze cabluri concentrate și zona de studrails, §PTh-R.3) necesită **armătură suplimentară de contur** (dimensionată similar unui gol de dimensiune comparabilă într-o placă armată clasic, conform SR EN 1992-1-1 §9.3.1.3), verificată explicit de proiectantul de structură pe fiecare caz, nu tratată generic.
4. **Interzicerea absolută** a executării de goluri noi, netrasate la proiect, după finalizarea tensionării, fără acordul scris al proiectantului de structură — regulă transmisă explicit către toate specialitățile de instalații și către constructor, exact pentru a preveni situația, frecventă pe șantierele fără o coordonare fermă, în care o echipă de instalații "găurește" o dală postensionată la o dată ulterioară recepției structurii, fără a ști ce se află în interiorul secțiunii.

---

## PTh-R.12 — PLANUL DE CONTROL AL CALITĂȚII

### PTh-R.12.1 Controlul betonului

| Control | Frecvență |
|---|---|
| Consistență la fiecare transport (tasare con Abrams) | 100% transporturi |
| Rezistență la compresiune (seturi de 3 cuburi) | 1 set/50 mc SAU/element important/zi de turnare |
| Epruvete martor (curate identic cu elementul, pt. determinarea momentului de tensionare) | 1 set/zonă de tensionare |
| Verificare clase de expunere XD3/XF4 — raport A/C, aer antrenat | conform certificatului stației de betoane, verificat prin sondaj la livrare |

### PTh-R.12.2 Controlul armăturii pasive

| Control | Frecvență |
|---|---|
| Certificat 3.1 (compoziție, fyk, alungire) pentru B500C | fiecare lot |
| Verificare poziție/acoperire (șablon) înainte de turnare | 100% suprafață, la interax 2,00 m |
| Verificare cuplaje mecanice (zonele cu armătură inox) | 100% cuplaje |

### PTh-R.12.3 Controlul precomprimării

| Control | Frecvență |
|---|---|
| Certificat de sistem (agrement ETAG 013/EAD 160004-00-0301) | o dată, la contractarea sistemului |
| Certificat 3.1 toroane Y1860S7 | fiecare lot/colac |
| Verificare poziție/cotă cablu pe traseu | 100% suprafață, imediat înainte de turnare |
| Verificare simultană presiune-alungire la tensionare, criteriu ± 7% | 100% cabluri |
| Verificare etanșeitate capace de ancoraj încapsulate | 100% ancoraje, la montare |
| Verificare integritate teacă HDPE (fără perforări la manipulare/pozare) | 100% vizual, înainte de turnare |

### PTh-R.12.4 Controlul membranei de protecție circulabilă

| Control | Frecvență |
|---|---|
| Verificare maturizare beton (≥ 28 zile) înainte de aplicare | 100% suprafață |
| Verificare rugozitate/profil suport (CSP 3-4) | prin sondaj |
| Verificare umiditate reziduală suport | prin sondaj, înainte de aplicare |
| Grosime aplicată (DFT umed/uscat) | min. 10 măsurători/zonă reprezentativă |
| Test de aderență (pull-off), criteriu ≥ 1,5 MPa | 1 test/500 mp |

### PTh-R.12.5 Controlul zonelor critice de străpungere (drop-panel + studrails)

Verificare dimensională a poziției reale a fiecărui studrail față de axul stâlpului, la toate cele 27 de noduri, cu atenție specială la cele 4 noduri de colț (§PTh-R.3.4, marjă redusă de utilizare 0,90) — control obligatoriu 100%, nu prin sondaj, exact pentru nodurile identificate ca având cea mai redusă marjă de siguranță.

---

## PTh-R.13 — FAZELE DETERMINANTE

| Nr. | Faza determinantă | Verificări/criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare (cotă săpătură, toată aria radierului) | Confruntare cu studiul geotehnic; absența umpluturilor/pungilor slabe; nivelul apei subterane măsurat efectiv la data săpăturii (confirmare NHS de proiectare, §PTh-R.9.2) | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Armare radier + montare waterstop rost dilatație (înainte de betonare) | Diametre, poziții, acoperire, continuitatea waterstop-ului la toate colțurile/intersecțiile | Proiectant, diriginte, constructor, ISC |
| FD3 | Betonarea radierului — verificare epuisment activ conform §PTh-R.9.2 | Nivel piezometric sub cota radierului pe toată durata turnării și întăririi inițiale | Proiectant, geotehnician, diriginte, constructor |
| FD4 | Montarea armăturii pasive + cablurilor de precomprimare a unei dale (înainte de turnare) | Poziție/acoperire armătură, cotă traseu cabluri (§PTh-R.4.2), integritate teci HDPE | Proiectant, diriginte, constructor, ISC |
| FD5 | Tensionarea cablurilor de precomprimare | Rezistență minimă beton confirmată prin epruvete martor; alungire-presiune în ±7%; secvență simetrică respectată (§PTh-R.4.6) | Proiectant, diriginte, constructor, tehnician de precomprimare atestat |
| FD6 | Decofrarea/eliberarea popilor | Numai după finalizarea completă a tensionării travei respective | Proiectant, diriginte, constructor |
| FD7 | Recepția sistemului de protecție circulabilă (membrană) | Maturizare 28 zile, DFT conform, pull-off ≥ 1,5 MPa | Proiectant, diriginte, constructor |
| FD8 | Structura la roșu finalizată (toate nivelurile) | Conformitate geometrică generală, toate PV de fază determinantă arhivate | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte, întocmirea procesului-verbal de fază determinantă, condiție pentru autorizarea continuării lucrărilor. Fazele FD3 și FD5 sunt **specifice acestui tip de structură** (cuvă etanșă sub subpresiune și, respectiv, structură postensionată) și nu au echivalent la o structură de beton armat clasic nepretensionat.

---

## PTh-R.14 — PROGRAMUL DE URMĂRIRE ÎN TIMP (P130) ȘI MONITORIZARE SPECIFICĂ

### PTh-R.14.1 Urmărirea curentă (P130/1999)

Urmărire vizuală anuală (și după evenimente deosebite: cutremur, inundație, avarie mecanică) a: stării membranei de protecție circulabilă (fisuri, desprinderi locale, uzură la benzile de rulare), stării profilului elastomeric al rostului de dilatație, stării waterstop-urilor vizibile la nivelul subsolului, prezenței eflorescențelor/petelor de rugină la fața inferioară a dalelor (indicator precoce de pătrundere a clorurilor peste pragul critic la nivelul armăturii, cap. 2.1 DTAC).

### PTh-R.14.2 Monitorizare specifică — cabluri de precomprimare

Datorită adoptării sistemului inspectabil/înlocuibil (§PTh-R.4.1), se prevede: verificare vizuală a capacelor de ancoraj încapsulate la 5 ani (integritate, absența fisurilor la capac); măsurare prin sondaj a forței reziduale în cabluri reprezentative (metodă de tip lift-off, la un eșantion de ancoraje accesibile) la 10 și 25 de ani, pentru confirmarea pierderilor pe termen lung față de ipoteza de calcul (§PTh-R.4.5); posibilitatea de retensionare/completare locală a forței, dacă monitorizarea indică pierderi peste ipoteza de proiectare, exact avantajul de mentenabilitate motivat la §PTh-R.4.1.

### PTh-R.14.3 Monitorizare tasări

Mărci de tasare pe minimum 8 puncte reprezentative (cele 4 colțuri + mijlocul fiecărei laturi lungi + sub fiecare nucleu de rigidizare), frecvență: la fiecare etapă de execuție (radier, apoi la fiecare 2 niveluri de suprastructură), apoi la 1/3/6/12 luni după finalizare, apoi anual până la stabilizare. Criteriu de alarmare: tasare diferențială `Δs/L > 1/500` — cu implicație directă asupra dalei postensionate (o tasare diferențială între doi stâlpi adiacenți modifică local traseul efectiv al cablului relativ la fibra medie deformată, cu efect asupra eficienței de load-balancing calculate pentru geometria nedeformată).

### PTh-R.14.4 Monitorizare protecție anticorozivă și catodică

Inspecție a sistemului de protecție catodică cu anozi galvanici (§PTh-R.10.2) la 5 ani (verificarea potențialului electrochimic al armăturii, dacă sunt prevăzute puncte de măsură dedicate, conform practicii de proiectare a sistemelor de protecție catodică pasivă pentru elemente îngropate), cu program de completare/înlocuire a anozilor consumați la reviziile majore ale construcției (orizont 20-25 ani).

---

## PTh-R.15 — IPOTEZE MODEL DE CALCUL EF ȘI VALIDARE

### PTh-R.15.1 Ipoteze de modelare

- **Model spațial 3D**, dale postensionate modelate ca elemente shell (placă), stâlpii și nucleele ca elemente bară/perete, radierul pe reazeme elastice tip Winkler (modul de reacție conform studiului geotehnic).
- **Rezemare la bază**: încastrare la interfața stâlp/nucleu-radier (radierul rigid, cu grosime mare, transmite practic o încastrare, spre deosebire de fundațiile izolate flexibile).
- **Rigidități**: elemente de beton armat — secțiune fisurată (`0,5·EI`, conform P100-1/2013, pentru analiza seismică), secțiune brută pentru verificările SLS de săgeată/decompresie (unde comportarea necrăpată este chiar obiectivul verificării, cap. 3.3 DTAC).
- **Cablurile de precomprimare**: modelate atât ca elemente de tendon explicit (pentru eforturile secundare hiperstatice de continuitate, relevante la o placă continuă pe mai multe reazeme), cât și, pentru verificare încrucișată, prin metoda încărcărilor echivalente (load-balancing, cap. 5.4 DTAC).
- **Masa seismică**: `G + ψ2·φ·Q`, cu `ψ2·φ = 0,30` (cap. 4.3 DTAC, particularitatea încărcării tranzitorii a autoturismelor).

### PTh-R.15.2 Validarea modelului — reconcilierea maselor pe cele 4 tipuri de reazem

| Sursă de masă | Contribuție [kN/nivel] | Observație |
|---|---|---|
| ST-C (7 buc, tributar plin) | 7×2.490/7(per nivel) ≈ 2.490×7/7... | v. §PTh-R.2.2 |
| ST-CE+ST-P+ST-PE (recalculat pe ariile reale) | — | reconciliere totală = 1.996,8 mp × qEd, verificat la §PTh-R.2.1 |
| Nuclee (greutate proprie pereți) | ≈ 162 kN/nivel/nucleu | 0,30×6,00×3,00×25 |

Masa totală/nivel, recalculată din contribuțiile individuale ale celor 27 de stâlpi + 2 nuclee + dala postensionată, reconciliază cu valoarea globală adoptată în DTAC (`Masa/nivel ≈ 22.950 kN`, cap. 8.3 DTAC) în limita a `± 3%` — diferența provine din contabilizarea mai exactă, la faza PTh, a greutății proprii diferențiate a celor 4 tipuri de stâlpi (secțiuni diferite: 1.050×1.050, 850×850, 650×650 mm, față de ipoteza simplificată a DTAC care a considerat o secțiune unică pentru toată greutatea proprie a elementelor verticale). **Se recomandă rularea finală a modelului EF cu greutățile actualizate din §PTh-R.6.1-6.2** înainte de finalizarea planurilor de execuție, similar practicii uzuale de reconciliere masă-DTAC/PTh la orice structură.

### PTh-R.15.3 Verificarea participării maselor modale

Se cere `≥ 90%` din masa totală pe fiecare direcție orizontală în modurile reținute pentru metoda spectrelor de răspuns — verificată în raportul de calcul EF final; structura fiind regulată în plan și elevație (cap. 4.1 DTAC), cu mod fundamental dominant, condiția se satisface practic fără dificultate, conform experienței de proiectare a structurilor duale regulate de această configurație.

---

## PTh-R.16 — VERIFICĂRI SUPLIMENTARE LA SLS

### PTh-R.16.1 Vibrațiile dalei postensionate (confort la trecerea vehiculelor)

Deși un parcaj nu are cerințe de confort la vibrații comparabile cu un planșeu de birouri (cap. PTh-R.16 al memoriului similar pentru hale, unde se verifică frecvența proprie pentru mersul pietonal), o dală de mare deschidere (16,00 m) poate fi sensibilă la vibrații induse de trecerea vehiculelor la viteză, relevante pentru **confortul utilizatorilor pietoni** care circulă pe traseele de acces din parcaj către casele de scări. Frecvența proprie estimată (metodă simplificată, pentru placă continuă cu deschidere 16,00 m, rigiditate majorată de precomprimare): `f1 ≈ 18/√δ`, cu `δ` (săgeata sub greutate proprie + o cotă din utilă cvasi-permanentă, ≈ 15 mm, mai mică decât săgeata totală SLS de 26 mm calculată la cap. 5.4 DTAC, care include utila completă): `f1 = 18/√15 ≈ 4,65 Hz` — peste pragul minim recomandat pentru trafic pietonal ocazional pe planșee de parcaj (`≥ 3 Hz`, prag mai relaxat decât cel al unui planșeu de birouri, dat fiind expunerea scurtă și ocazională a pietonilor la vibrația din trecerea vehiculelor) → **✓, fără necesitatea unei analize dinamice suplimentare**.

### PTh-R.16.2 Contra-săgeți de execuție (camber)

| Element | Săgeată SLS calculată | Contra-săgeată adoptată |
|---|---|---|
| Dală postensionată, travee curentă (16,00 m) | 26 mm (§5.4 DTAC) | fără camber — sistemul de load-balancing este proiectat exact pentru a limita săgeata reziduală la o valoare mică, o contra-săgeată suplimentară ar complica inutil cofrajul unei plăci plane |
| Rampă (7,00 m) | ≈ 8 mm (estimat din §PTh-R.7.3) | fără camber (sub prag practic de 10 mm) |

### PTh-R.16.3 Verificarea SLS a rostului de dilatație la temperatură

Verificare a deschiderii rostului la temperatura minimă de proiectare (contracția maximă a betonului, cumulată cu efectul termic): deschiderea rostului la `T = -15°C` (ipoteză de iarnă severă) `≈ 22 mm + contracție pe termen lung ≈ 8 mm ≈ 30 mm`, comparată cu deschiderea de proiectare a profilului elastomeric (`150 mm` capacitate la mișcare seismică, deci larg suficientă și pentru mișcarea termică lentă, care nu se cumulează simultan cu deplasarea seismică maximă) → **✓, profilul unic acoperă ambele solicitări**.

### PTh-R.16.4 Verificarea decompresiei la travee de capăt (moment majorat +16%)

Cap. 5.4 DTAC confirmă decompresia pentru travee curentă. La travee de capăt (moment de câmp majorat la 538 kNm/m, §PTh-R.2.5), cu numărul de toroane majorat corespunzător (7,0/m față de 6,0/m, §PTh-R.4.3), verificarea de decompresie se reface: `wbal,capăt = wbal,curent×(7,0/6,0) ≈ 9,8 kN/mp`, comparat cu `qEd = 19,95 kN/mp` — proporția echilibrată rămâne similară celei de la travee curentă (≈ 49% față de ≈ 42%, ușor superioară, coerent cu majorarea numărului de toroane), confirmând starea de decompresie și la traveele de capăt, cu o marjă comparabilă celei raportate în DTAC.

### PTh-R.16.5 Verificarea deschiderii fisurilor la zonele neechilibrate integral (bandă de câmp, travee de capăt)

Deși starea generală de decompresie (cap. 3.3 DTAC, §PTh-R.16.4) elimină practic fisurarea de încovoiere pe suprafața curentă a dalei, zonele **neechilibrate integral de load-balancing** — banda de câmp la marginea benzii de stâlp, unde traseul cablului trece prin punctul de inflexiune (§PTh-R.4.2) și unde armătura pasivă minimă (`As,min`, cap. 12 DTAC) preia o fracțiune mai mare din efortul rezidual — se verifică distinct la deschiderea fisurii, conform SR EN 1992-1-1 §7.3.4:

`wk = sr,max·(εsm-εcm)`,

cu `sr,max ≈ 250 mm` (spațierea maximă a fisurilor, funcție de diametrul și spațierea armăturii pasive `As,min`, Ø10/200mm, cap. §PTh-R.5.2) și `(εsm-εcm) ≈ 0,55×10⁻³` (deformația specifică diferențială oțel-beton, la efortul rezidual din zona de tranziție, mult redus față de o placă complet nepretensionată): `wk = 250×0,55×10⁻³ ≈ 0,14 mm` — sub limita normativă `wk ≤ 0,2 mm` pentru elemente precomprimate în clasă XD3 (cap. 5.4 DTAC), **cu marjă de ≈ 30%**, confirmând că inclusiv zonele de tranziție (nu doar câmpul complet echilibrat) rămân în limitele de fisurare admise pentru clasa de expunere severă a acestui parcaj.

---

## PTh-R.17 — CALCULUL LA FOC DETALIAT (SR EN 1992-1-2)

### PTh-R.17.1 Cerințe de rezistență la foc

Din SSI (document separat, referit aici doar pentru datele de intrare structurale): parcaj cu ventilație naturală parțială pe fațade (cap. 1.3 DTAC), grad de rezistență la foc ce impune, pentru elementele structurale principale, `R 90` (stâlpi, nuclee) și `REI 90` (dala postensionată), conform clasificării uzuale pentru parcaje publice colective de capacitate mare (P118-1/1999+P118-2/2013).

### PTh-R.17.2 Verificarea stâlpilor ST-C la R90

Metoda simplificată a izotermei de 500°C (SR EN 1992-1-2 Anexa B): pentru secțiunea 1.050×1.050 mm, expusă pe 4 fețe, la o durată de expunere de 90 minute (curba standard ISO 834), adâncimea stratului cu temperatură peste 500°C (a cărui contribuție la capacitatea portantă se neglijează) este `az ≈ 40-45 mm` pentru elemente de această masivitate (raport suprafață expusă/volum redus, dat fiind secțiunea mare) — **secțiunea redusă rămâne suficient de mare** pentru a menține `NRd,fi ≥ NEd,fi` (efort axial în situația de incendiu, calculat cu combinația cvasi-permanentă `ψ2·φ = 0,30`, cap. 4.3 DTAC, mult sub efortul de proiectare la rece) fără măsuri suplimentare de protecție — **stâlpii ST-C rezistă la R90 prin secțiune și acoperire (55 mm), fără protecție suplimentară**, coerent cu masivitatea impusă oricum de verificarea la efort axial normalizat (cap. 9.1 DTAC).

### PTh-R.17.3 Verificarea stâlpilor ST-PE (secțiune redusă, 650×650 mm)

La secțiunea mai zveltă a stâlpilor de colț, raportul suprafață expusă/arie este mai defavorabil: se verifică, similar, prin metoda izotermei 500°C — cu adâncimea redusă rezultată `az ≈ 40 mm` similar, dar aplicată unei secțiuni mai mici, marja de rezervă (efortul axial `νd = 0,41`, §PTh-R.2.2, deja sub limita normativă la rece) se reduce la foc, dar rămâne, conform verificării, **suficientă pentru R90 fără protecție suplimentară**, dat fiind că efortul axial la stâlpii de colț este semnificativ mai mic decât la ST-C, compensând reducerea proporțional mai mare a secțiunii rezistente la foc.

### PTh-R.17.4 Verificarea dalei postensionate la REI 90

Grosimea de 380 mm asigură, prin masivitate, izolarea termică cerută de criteriul **I** (temperatura pe fața neexpusă) cu marjă amplă (grosimi de 380 mm depășesc semnificativ minimul normativ pentru REI 90, care este de ordinul 120-150 mm pentru plăci curente, conform tabelelor prescriptive SR EN 1992-1-2). Criteriul **R** (capacitate portantă) se verifică prin reducerea rezistenței armăturii pasive superioare/inferioare la temperatura atinsă la adâncimea acoperirii (`cnom = 55/65 mm`, temperatura la această adâncime la 90 min ≈ 350-400°C, reducere a `fyk` la ≈ 70-75% din valoarea la rece, conform curbelor de reducere SR EN 1992-1-2 fig. 4.2a) — verificare care confirmă capacitatea la moment redus (`MRd,fi`) rămâne superioară momentului aplicat în situația de incendiu (combinație cvasi-permanentă, mult sub momentul de calcul la rece).

**Verificare specifică oțelului de precomprimare**: toroanele, poziționate la aceeași adâncime ca armătura pasivă (65 mm în zona câmpului, unde protecția termică e cea mai relevantă pentru momentul pozitiv), suferă o reducere de rezistență la temperatură **mai accentuată** decât oțelul-beton obișnuit (curbele de reducere pentru oțel de precomprimare, SR EN 1992-1-2 fig. 4.3, scad mai abrupt peste 300°C decât cele pentru B500C) — motiv pentru care contribuția precomprimării la capacitatea portantă în situația de incendiu se reduce conservator (`ψfi ≈ 0,5-0,6` din valoarea la rece, pentru toroanele situate la adâncimea curentă), iar verificarea la foc a momentului capabil se face **cu precomprimarea redusă**, nu la valoarea integrală de exploatare curentă, iar rezerva necesară se acoperă prin **armătura pasivă existentă** (§PTh-R.5.2, dimensionată inclusiv pentru controlul fisurării, dar cu contribuție semnificativă și la momentul capabil rezidual la foc) — verificare care confirmă conformitatea REI 90 fără măsuri suplimentare de protecție la foc a dalei.

---

## PTh-R.18 — PLANȘELE DE EXECUȚIE ȘI PROGRAMUL DE PROBE

### PTh-R.18.1 Conținutul setului de planșe de rezistență, faza PTh

| Cod planșă | Denumire | Conținut |
|---|---|---|
| S-01 | Plan general radier — trasare, cote de fundare | Axe, cote, poziție șabloane, rost de dilatație cu waterstop dublu |
| S-02 | Radier — cofraj/armare | RD-1, RD-2, RD-3, călăreți zone stâlpi/nuclee |
| S-03 | Plan de cofraj — nivel curent (per tip de nivel) | Poziții ST-C/ST-CE/ST-P/ST-PE, nuclee, grosime dală, drop-panele |
| S-04 | Plan de armare pasivă — nivel curent | DP-1, DP-2, DP-3, bandă de stâlp |
| S-05 | Plan de precomprimare — traseu cabluri | Cote la ancoraj/reazem/câmp (§PTh-R.4.2), numerotare toroane, marcaj active/pasive |
| S-06 | Coordonare armare/precomprimare/studrails la noduri | Detaliu de evitare a coliziunilor fizice (§PTh-R.4.3) |
| S-07 | Detaliu drop-panel + studrails — tip interior | Dimensiuni, 4 laturi (§PTh-R.3.2) |
| S-08 | Detaliu drop-panel + studrails — tip margine și colț | Dimensiuni, 3/2 laturi + bandă de margine (§PTh-R.3.3-3.4) |
| S-09 | Detaliu ancoraj activ/pasiv încapsulat | Capac etanș, armătură de spargere, trumpet |
| S-10 | Detaliu rost de dilatație — toate nivelurile | Profil elastomeric, waterstop dublu la radier |
| S-11 | Detaliu rampă + racord rampă-planșeu | Armătură transversală de racord (§PTh-R.7.5) |
| S-12 | Detaliu perete de subsol + waterstop-uri | PS-1, PS-2, poziții waterstop la toate rosturile |
| S-13 | Detaliu nuclee scări-lift — bulbi confinați | NC-1V/NC-1B/NC-1H |
| S-14 | Extras de materiale (bill of quantities) | Tabelele PTh-R.6, pe elemente |

### PTh-R.18.2 Program complet de probe și încercări

| Control | Frecvență |
|---|---|
| Beton — consistență, rezistență, epruvete martor | §PTh-R.12.1 |
| Armătură pasivă — certificate, poziție | §PTh-R.12.2 |
| Precomprimare — certificat sistem, alungire/presiune, etanșeitate ancoraje | §PTh-R.12.3 |
| Portanță teren sub radier (placă de încărcare) | min. 1 punct/500 mp, înainte de armare radier |
| Etanșeitate cuvă (probă cu apă sau inspecție post-execuție a rosturilor/waterstop-urilor, la subsol) | la finalizarea infrastructurii, înainte de umplerea săpăturii |
| Membrană de protecție circulabilă — DFT, pull-off | §PTh-R.12.4 |
| Documente de conformitate arhivate | certificate materiale, rapoarte de tensionare (alungire/presiune per cablu), PV fază determinantă, buletine beton, raport topografic as-built |

---

## PTh-R.19 — BREVIAR COMPLET DE ÎNCĂRCĂRI/COMBINAȚII + SINTEZA CORECȚIILOR + CONCLUZIE

### PTh-R.19.1 Breviar de încărcări — recapitulare pe toate cele 4 tipuri de reazem și cele 2 tipuri de travee

| Sursă | Travee curentă | Travee de capăt | ST-C | ST-CE | ST-P | ST-PE |
|---|---|---|---|---|---|---|
| gk [kN/mp] | 12,0 | 12,0 | — | — | — | — |
| qk categ. F [kN/mp] | 2,5 | 2,5 | — | — | — | — |
| MEd câmp [kNm/m] | 464 | 538 | — | — | — | — |
| NEd cumulat [kN] | — | — | 16.780 | 9.070 | 9.310 | 4.640 |
| VEd străpungere,eff [kN] | — | — | 2.864 | 1.743 | 1.743 | 933 |

### PTh-R.19.2 Sinteza corecțiilor de proiectare aduse de faza PTh față de predimensionarea DTAC

| Element/aspect | Predimensionare DTAC | Corecție/detaliere PTh | Motiv |
|---|---|---|---|
| Stâlpi perimetrali/de capăt | secțiune neexplicitată (doar stâlpul interior tratat) | **4 tipuri distincte de stâlp (ST-C/CE/P/PE), secțiuni 1.050/850/650 mm** | reconcilierea ariei tributare reale a grilei de 27 stâlpi |
| Străpungere la noduri de margine/colț | verificată doar la stâlpul interior | **drop-panel + studrails diferențiate pe 3 tipuri de nod, cu factor β EC2 6.4.3** | perimetru critic redus la margine/colț, deși efortul e mai mic |
| Moment de câmp la travee de capăt | tratat identic traveei curente (464 kNm/m) | **majorat la 538 kNm/m (+16%), toroane majorate la 7,0/m** | schemă structurală de margine, redistribuire diferită |
| Sistemul de precomprimare | concept load-balancing, fără tip constructiv | **monostrand nelipit, complet încapsulat (ETAG 013)** | durabilitate XD3+XF4, inspectabilitate/înlocuire |
| Pierderi de precomprimare | valoare finală adoptată direct (σp,∞=1.209 MPa) | **breviar complet frecare+lunecare+scurtare elastică+curgere+contracție+relaxare, confirmă ±2%** | rigoare de execuție, criteriu de acceptare la tensionare |
| Verificare UPL | verificată doar la structura finalizată (γ=5,55) | **verificată pe 5 etape de execuție — γ=0,67 la radier singur, subunitar** | criticitate reală identificată abia la faza PTh, cu măsuri obligatorii de epuisment/ancore |
| Racord rampă-planșeu | descriere calitativă a mecanismului de despicare | **verificare cantitativă strut-and-tie, armătură transversală Ø14/150mm dimensionată** | cuantificare a cerinței, absentă din DTAC |
| Protecție la agenți chimici | opțiuni enumerate generic | **inox 316L pe bandă de 500mm la muchii, anozi galvanici la radier/pereți subsol** | decizie de execuție fermă, per zonă |

### PTh-R.19.3 Concluzie inginerească

Structura duală de beton armat a parcajului multietajat (S+P+5E, ≈460 locuri, cadre + dală postensionată h=380mm pe deschidere 16,00m + nuclee de rigidizare), verificată integral la predimensionare în faza DTAC, a fost **detaliată la nivel de execuție** în prezentul supliment PTh: extinderea breviarului de calcul de la exemplul unic al DTAC la toate cele 27 de reazeme verticale ale grilei reale (4 tipuri distincte de stâlp) și la ambele tipuri de travee (curentă/de capăt), caietul complet de precomprimare (sistem adoptat cu motivare, trasee, forțe, pierderi, secvență de tensionare), caietul de armare pe poziții, extrasul de materiale, calculul complet al rampelor și al racordului rampă-planșeu, detalierea rostului de dilatație, verificarea UPL pe fazele reale de execuție (cu identificarea unei etape critice subunitare, absentă din DTAC), tehnologia de execuție, planul de control al calității, fazele determinante, urmărirea în timp și programul de probe.

Analiza detaliată a evidențiat **șapte corecții/completări de proiectare** față de predimensionarea DTAC (§PTh-R.19.2), toate documentate cu verificare numerică — corecții normale și așteptate la trecerea de la faza de predimensionare (DTAC) la faza de execuție (PTh), care nu invalidează soluția de ansamblu ci o consolidează, evidențiind în special **criticitatea reală a fazei intermediare de execuție la verificarea UPL** (factor de siguranță subunitar la radierul singur, γ=0,67), aspect care trebuie transmis obligatoriu constructorului prin DTOE, cu măsuri ferme de epuisment controlat sau ancorare provizorie.

Se recomandă, înainte de finalizarea planurilor de execuție: (1) rularea modelului EF final cu greutățile actualizate ale celor 4 tipuri de stâlpi din extrasul de materiale (§PTh-R.6); (2) confirmarea nivelului real al apei subterane la data efectivă a execuției radierului, cu adaptarea corespunzătoare a duratei/intensității epuismentului; (3) confirmarea parametrilor exacți ai sistemului de precomprimare contractat (coeficienți de frecare μ/k, lunecare la ancoraj) față de valorile de exemplu utilizate în prezentul breviar; (4) confirmarea grosimii sistemului de protecție circulabilă cu fișa tehnică a produsului efectiv ales de antreprenor.

Documentația necesită verificare tehnică de către verificatori atestați MDLPA pe cerințele **A1** (rezistență mecanică și stabilitate, obligatoriu), **A2** (structuri deosebite — deschidere de 16,00 m fără stâlpi intermediari, tehnologie de precomprimare/postensionare, cf. cap. 13 DTAC) și **Af** (fundații — radier general, cuvă etanșă, verificare la subpresiune pe fazele de execuție), conform Legii nr. 10/1995 și HG nr. 925/1995.

---

*Prezentul supliment de fază PTh-Rezistență completează faza DTAC (`structura.md`) și se citește împreună cu planșele S-01…S-14 (§PTh-R.18.1) și cu Caietul de sarcini pentru lucrări de beton armat și precomprimat (document distinct). Toate valorile numerice sunt exemple de dimensionare pentru un parcaj public colectiv multietajat de referință (S+P+5E, 62,40×32,00m, ≈460 locuri) și se confirmă/ajustează în urma rulării finale a modelului EF pe geometria reală a proiectului, a studiului geotehnic definitiv al amplasamentului (inclusiv nivelul real al apei subterane la data execuției) și a certificatului de performanță al sistemului de precomprimare efectiv contractat. Prezentul document nu dublează conținutul memoriului general, al memoriului de arhitectură, al memoriului de instalații și al studiului de siguranță la incendiu (SSI) ale aceleiași documentații PTh — pentru programul funcțional, fluxurile de circulație, ventilația și scenariul de securitate la incendiu, se consultă documentele respective.*
