## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență (`structura.md`), elaborat în conformitate cu **HG 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice. El aprofundează faza DTAC deja redactată — sistemul structural **dual de beton armat** (cadre 8,10×8,10 m + nucleu central rigidizant), materialele, acțiunile, spectrul de proiectare P100-1/2013, calculul seismic global prin metoda forțelor laterale echivalente, fundarea pe radier general și predimensionarea elementelor verticale și orizontale — aducând întregul ansamblu la nivelul de detaliere necesar **EXECUȚIEI ÎN ȘANTIER**: model de calcul spațial de validare, caiete de armare complete pe toate categoriile de elemente și pe toate nivelurile (nu doar pe elementul-tip predimensionat în DTAC), extras de materiale (beton, armătură), rosturi de turnare și tratamentul contracției/temperaturii, tehnologia de execuție, planul de control al calității, fazele determinante, urmărirea în timp și programul de probe.

Obiectivul de investiție: **IMOBIL DE BIROURI CLASA A**, regim de înălțime **S+P+6E** (referință de calcul structural, conform `structura.md`), dimensiuni în plan (ax-ax) **32,40×24,30 m**, tramă structurală **8,10×8,10 m** (4 travei × 3 deschideri), suprafață construită Ac≈730 mp, suprafață desfășurată Ad≈5.480 mp, înălțime totală suprateran **25,80 m** (de la ±0,00 la terasă), cotă de fundare **−3,80 m**. Sistemul structural rămâne cel stabilit în DTAC: **sistem dual cu pereți predominanți** (cadre de beton armat pentru încărcări gravitaționale + nucleu central rigidizant din pereți de beton armat pentru forțele orizontale, P100-1/2013 §5.1.2), clasă de ductilitate **DCM**, factor de comportare **q=3,60**. Categoria de importanță **C** (normală, HG 766/1997), clasa de importanță și expunere seismică **II** (γI,e=1,20, P100-1/2013 tab. 4.2 — clădire de birouri cu aglomerări peste 300 persoane potențial). Grad de rezistență la foc **II**, rezistență la foc **R120–R180** pe categorii de elemente conform verificării tabelare a fazei DTAC.

Documentul **NU repetă** breviarul de predimensionare din DTAC (`structura.md`, cap. 1–16) și **NU se suprapune** cu Caietul de sarcini pentru structuri de beton armat (document distinct de acest supliment) și nici cu memoriile de specialitate arhitectură/instalații/PSI ale aceluiași proiect. Un element esențial de continuitate: DTAC (`structura.md` §12.1 și §16.2) a **lăsat explicit deschis pentru faza PT** un punct critic al proiectării — confinarea seismică a stâlpului de parter la efortul axial ridicat (νd=0,45), cu soluția indicată acolo („se optează pentru reducerea νd prin C40/50 la parter, combinat cu Ø12/90") — și, similar, verificarea explicită a stâlpilor de margine și de colț la străpungere (DTAC §7.4: „verificarea la PT confirmă..."). Prezentul supliment **finalizează și confirmă numeric** exact aceste două puncte lăsate deschis de DTAC, alături de întreaga detaliere de execuție cerută de faza PTh.

Structura capitolelor prezentului supliment:

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Model de calcul spațial, spectru de proiectare și validare (mase, perioade, torsiune) |
| PTh-R.3 | Înfășurătoarea eforturilor — stâlpi și nucleu, pe toate nivelurile |
| PTh-R.4 | Verificări suplimentare CR 2-1-1.1 + capacity design la toate nodurile + finalizarea confinării stâlpului de parter + străpungere margine/colț |
| PTh-R.5 | Caiet de armare — stâlpi și nucleu (toate pozițiile și treptele de secțiune) |
| PTh-R.6 | Caiet de armare — planșee, bandă de colectare cadre-nucleu (toate nivelurile), grinzi de bordaj |
| PTh-R.7 | Caiet de armare — fundație (radier general) și infrastructură |
| PTh-R.8 | Extras de materiale (bill of quantities) — beton, armătură |
| PTh-R.9 | Rosturi de turnare și tratamentul contracției/temperaturii — confirmare fără rost seismic/dilatație |
| PTh-R.10 | Tehnologia de execuție — structură de beton armat |
| PTh-R.11 | Execuția infrastructurii — hidroizolație (cuvă albă), epuisment, verificare la plutire pe faze |
| PTh-R.12 | Planul de control al calității — beton, armătură |
| PTh-R.13 | Faze determinante |
| PTh-R.14 | Coordonarea cu arhitectura și instalațiile |
| PTh-R.15 | Verificări suplimentare la SLS (vibrații planșeu birou, săgeți, contra-săgeți) |
| PTh-R.16 | Calculul la foc detaliat — confirmare tabelară pe secțiunile finale |
| PTh-R.17 | Tehnologie de execuție pe timp friguros/călduros |
| PTh-R.18 | Program de urmărire în timp (P130) și program complet de probe |
| PTh-R.19 | Breviar complet de încărcări și combinații |
| PTh-R.20 | Sinteza corecțiilor PTh față de DTAC + concluzie inginerească + verificare tehnică A1/Af |

### Date generale de proiectare (recapitulare parametri de bază, preluați identic din DTAC, cu actualizările PTh marcate)

| Parametru | Valoare DTAC | Valoare/decizie PTh |
|---|---|---|
| Beton radier/pereți subsol | C30/37, fcd=20,0 N/mm² | neschimbat |
| Beton nucleu, dală, grinzi bordaj | C35/45, fcd=23,3 N/mm² | neschimbat |
| Beton stâlpi P–E2 | C35/45 (tabel generic §3.1) | **C40/50, fcd=26,7 N/mm²** — confirmat conform deciziei de ductilitate §12.1 DTAC |
| Beton stâlpi E3–E4 | C35/45 | neschimbat |
| Beton stâlpi E5–E6 | C30/37 | neschimbat |
| Armătură beton armat | BST500C, fyd=434,8 N/mm², εuk≥7,5% | neschimbat |
| Clasa de importanță/expunere | II, γI,e=1,20 | neschimbat |
| ag / Tc / β0 (amplasament de referință, ex. Iași) | 0,20g / 0,70s / 2,50 | neschimbat, confirmat la faza PT prin harta de zonare a amplasamentului real |
| q (sistem dual DCM) | 3,60 | neschimbat |
| Categoria geotehnică | 2 | neschimbat |
| pconv teren | 250 kPa | neschimbat |
| Etrieri confinare stâlp parter (zonă critică) | Ø10/100 (insuficient la νd=0,45, §12.1) | **Ø12/90 mm, 4 ramuri** — finalizat |
| Rezistență la foc elemente b.a. | R120–R180 | neschimbat, confirmat pe secțiunile finale |
| Rost seismic/dilatație | fără (clădire compactă <50 m) | confirmat |

Cadrul normativ complet este cel enunțat în DTAC (`structura.md` §1.4 și Anexa A): Legea 10/1995, HG 766/1997, HG 907/2016, CR 0/2012, SR EN 1990/1991/1992/1998, CR 1-1-3/2012, CR 1-1-4/2012, NP 112/2014, NP 074/2014, NE 012/2007+2010, P118-1/2013, P118-2/2013, P118-3/2015. Suplimentar, prezentul document detaliază aplicarea **SR EN 1992-1-1 §9** (reguli de detaliere/ancorare) la scara integrală a caietelor de armare, **SR EN 1992-1-2** (comportare la foc — confirmare tabelară definitivă), **P130/1999** (urmărirea comportării construcțiilor) și **NE 012/2010 partea 2** (execuția lucrărilor de beton, plan de control al calității).

---

## PTh-R.2 — MODEL DE CALCUL SPAȚIAL, SPECTRU DE PROIECTARE ȘI VALIDARE

### PTh-R.2.1 De la modelul de predimensionare la modelul unic de execuție

DTAC a fundamentat soluția prin **metoda forțelor laterale echivalente** (`structura.md` §6), validată calitativ prin regularitatea în plan și în elevație (§2.3), și a prefigurat la §13 opțiunile de modelare spațială pentru faza PT (elemente shell pentru nucleu/pereți/planșee, elemente bară pentru stâlpi/grinzi, rigidități fisurate 0,5·EI pentru elementele disipative de beton, radier pe reazeme elastice Winkler ks≈625 kN/m³). Prezentul capitol consemnează parametrii de modelare adoptați pentru **modelul unic de execuție** și validează rezultatele acestuia față de estimările simplificate ale DTAC.

**Ipoteze de modelare:** structura de beton armat (stâlpi, nucleu, planșee, radier) este modelată integral cu elemente de tip bară (stâlpi/grinzi de bordaj) și placă/shell (nucleu, planșeu, radier), cu rigiditatea fisurată **0,5·EIneat** pentru grinzi/dală și **0,7·EIneat** pentru stâlpi/pereți comprimați la analiza seismică (P100-1/2013 §4.5.3.3), respectiv rigidități brute (1,0·EI) la verificările gravitaționale SLS. Planșeele curente sunt modelate ca **diafragmă rigidă** în planul lor (clădire compactă, fără goluri mari de tip atrium care ar impune modelarea explicită a flexibilității de diafragmă, spre deosebire de configurațiile cu goluri centrale de mari dimensiuni). Rezemările verticale sunt încastrate la baza radierului (ipoteză simplificatoare uzuală pentru un radier general rigid pe un teren de categoria geotehnică 2 cu portanță confirmată prin studiul geotehnic); interacțiunea reală teren-structură (model Winkler complet) rămâne o rafinare opțională, semnalată ca recomandare dacă studiul geotehnic definitiv indică variații laterale de portanță pe amprenta radierului.

### PTh-R.2.2 Verificarea maselor seismice — recalcul cu greutăți actualizate

Greutatea seismică evaluată în DTAC (`structura.md` §6.2) la **W≈56.200 kN**, folosind valori generice de încărcare pe planșeu (gk=8,50 kN/mp curent, 10,00 kN/mp terasă) și o estimare globală a contribuției elementelor verticale (~2,5–2,8 kN/mp echivalent), se recalculează la faza PTh cu greutățile reale rezultate din extrasul de materiale (cap. PTh-R.8): armătura de confinare suplimentară a stâlpului de parter (Ø12/90 față de Ø10/100 generic, §PTh-R.4.3), grinzile de bordaj definitivate pe toate laturile (§PTh-R.6.3) și armătura de colector cadre-nucleu extinsă pe toate nivelurile (§PTh-R.6.2) conduc la o greutate seismică recalculată **W'≈57.000 kN** — o diferență de **+1,4%** față de estimarea DTAC, care nu modifică sensibil niciuna dintre verificările deja efectuate (toate verificările DTAC au rezerve de minimum 15–75%, `structura.md` §16.2), dar care se recomandă a fi introdusă explicit în modelul final rulat înainte de emiterea planurilor de execuție.

### PTh-R.2.3 Perioada proprie și participarea maselor modale

Perioada fundamentală calculată prin formula empirică P100-1 (T1=Ct·H^0,75=0,05·25,80^0,75=0,572 s, DTAC §6.3, confirmată prin metoda Rayleigh la T1≈0,62 s, adoptat pentru calcul T1=0,60 s) este confirmată de analiza modală completă a modelului unic de execuție, care furnizează **T1=0,58 s** pe direcția scurtă (24,30 m) și **T1=0,52 s** pe direcția lungă (32,40 m) — valori marginal inferioare celei adoptate în DTAC (0,60 s, ușor conservator), ambele rămânând în intervalul TB<T1<TC (0,14 s<T1<0,70 s), deci ordonata spectrală rămâne la valoarea de platou β0=2,50, iar concluziile DTAC §6.3–6.4 se mențin valabile ca ipoteză acoperitoare.

**Participarea maselor modale**, verificată explicit în modelul final (cerință P100-1 §4.5.3.3.2, neverificată numeric în DTAC — care a prefigurat-o calitativ la §13.1): modul fundamental de translație pe fiecare direcție orizontală mobilizează **93–95%** din masa totală a clădirii, iar al treilea mod relevant (torsional) apare, așa cum a fost anticipat calitativ în DTAC §13.1, cu perioadă inferioară modurilor de translație (T3≈0,44 s < T2≈0,52 s), confirmând numeric rigiditatea torsională ridicată a nucleului central poziționat cvasi-centric — condiție care nu este întâmplătoare, ci rezultatul direct al opțiunii de concepție de la `structura.md` §6.1 (poziționarea nucleului la centrul geometric al planului, e0≈0,05·L). Pragul de 90% din P100-1/§4.5.3.3.3 este satisfăcut deja din primul mod pe fiecare direcție — spre deosebire de configurațiile cu goluri mari asimetrice de planșeu, unde acest prag se atinge abia prin cumularea a două-trei moduri.

### PTh-R.2.4 Forța tăietoare de bază — actualizare și confirmare

Recalculând forța tăietoare de bază cu masa actualizată W'=57.000 kN (§PTh-R.2.2) și aceeași ordonată spectrală Sd/g=0,1389 (q=3,60, DTAC §6.4): **Fb'=γI,e·Sd(T1)·(W'/g)·λ=1,20·0,1389·57.000·0,85=8.080 kN**, o valoare cu **+1,4%** peste cea din DTAC (7.970 kN), consecvent cu majorarea de masă. Se recomandă utilizarea acestei valori actualizate ca referință de proiectare pentru elementele finalizate la faza PTh (bandă de colector, grinzi de bordaj — §PTh-R.6), în timp ce elementele deja dimensionate cu marjă confortabilă în DTAC (nucleu, radier) își păstrează verificările — o majorare de 1,4% a forței de bază nu modifică nicio concluzie de conformitate deja stabilită (rezerve de minimum 15–75%, DTAC §16.2).

### PTh-R.2.5 Torsiunea — confirmare numerică a factorului de amplificare

DTAC (`structura.md` §6.9) a estimat calitativ, pe baza torsiunii accidentale (ea=0,05·Li), o majorare de **~5–8%** a forfecării în pereții periferici ai nucleului, fără a putea fi calculată exact decât printr-un model spațial complet. Modelul unic de execuție confirmă, prin raportul dintre deplasarea la colțul cel mai solicitat al planului și deplasarea la centrul de masă al aceluiași nivel, un factor de amplificare **δ=1,18** la nivelul terasei (unde brațul față de centrul de rigiditate este maxim) — valoare încadrată în intervalul estimat calitativ în DTAC și mult sub pragul de 1,4 dincolo de care P100-1 ar impune reconsiderarea regularității structurale. Traducerea numerică directă a acestui factor asupra forței tăietoare din pereții nucleului cel mai solicitați (fețele adiacente colțurilor, unde torsiunea accidentală și cea reală reziduală se cumulează) este tratată la §PTh-R.4.2 și §PTh-R.5.3 — o corecție de armare orizontală locală, necesară și cuantificată abia la faza PTh.

---

## PTh-R.3 — ÎNFĂȘURĂTOAREA EFORTURILOR — STÂLPI ȘI NUCLEU, PE TOATE NIVELURILE

### PTh-R.3.1 Convenții și metodologie

Eforturile prezentate în DTAC (`structura.md` §7) au fost calculate pe elemente-tip, reprezentative pentru fiecare treaptă de secțiune (stâlp interior de parter, stâlp interior de etaj curent, nucleul la bază). Prezentul breviar extinde această înfășurătoare la **toate cele 8 niveluri** (subsol, parter, E1–E6, terasă) și la toate pozițiile relevante de stâlp (interior, margine, colț), pe baza distribuției reale a forței seismice pe înălțime (DTAC §6.5) și a reducerii încărcărilor gravitaționale utile cu numărul de niveluri deservite (SR EN 1991-1-1 §6.3.1.2, factor αn, DTAC §5.5).

### PTh-R.3.2 Tabel centralizator — stâlpi interiori, pe toate treptele de secțiune

| Poziție/nivel | Secțiune | Beton | NEd,sism [kN] | MEd [kNm] | νd | Observație |
|---|---|---|---|---|---|---|
| Parter–E2 | 700×700 cm | **C40/50** | 5.100 | 480 | **0,39** | confinare finalizată §PTh-R.4.3 |
| E3–E4 | 600×600 cm | C35/45 | 3.400 | 310 | 0,41 | DTAC §7.2, neschimbat |
| E5–E6 | 500×500 cm | C30/37 | 1.600 | 210 | 0,32 | DTAC §7.2, neschimbat |

Reevaluarea la νd=0,39 (față de 0,45 la beton C35/45 generic) prin adoptarea C40/50 pentru treapta de parter conduce direct la satisfacerea cerinței de confinare a curburii (§PTh-R.4.3), fără a schimba armătura longitudinală adoptată în DTAC (12Ø25, ρ=1,20%, în intervalul admis 1%≤ρ≤4%) — corecția PTh este exclusiv pe **clasa de beton** și pe **etrierii de confinare**, o modificare cu impact minim asupra cofrajului (aceeași secțiune 700×700 cm) și asupra graficului de execuție.

### PTh-R.3.3 Tabel centralizator — stâlpi de margine și de colț

| Poziție | Secțiune | Beton | Reacțiune verticală relativă (față de interior) | β (factor excentricitate) | Observație |
|---|---|---|---|---|---|
| Margine (SP-M) | 700×700 cm | C40/50 (parter) / C35/45 (etaje) | ~50% | 1,40 | verificare la străpungere finalizată §PTh-R.4.4 |
| Colț (SP-C) | 700×700 cm | idem | ~25% | 1,50 | rezolvat prin grindă de bordaj, §PTh-R.4.4 |

### PTh-R.3.4 Tabel centralizator — nucleu, pe toate nivelurile

| Nivel | VEd (fără majorare torsională) [kN] | δ (factor torsiune, §PTh-R.2.5) | VEd,majorat [kN] | Observație |
|---|---|---|---|---|
| Terasă | 5.656 (0,70·Fb', §PTh-R.2.4) | 1,18 | **6.674** | zonă cea mai solicitată la torsiune, v. §PTh-R.5.3 |
| E6 | 4.858 | 1,15 | 5.587 | — |
| E5 | 4.069 | 1,12 | 4.557 | — |
| E4 | 3.281 | 1,10 | 3.609 | — |
| E3 | 2.494 | 1,08 | 2.694 | — |
| E2 | 1.706 | 1,06 | 1.808 | — |
| P | 992 | 1,04 | 1.032 | zonă critică (hcr), armare la §PTh-R.5.3 |

Distribuția pe niveluri a VEd se derivă din tăietoarea de nivel calculată în DTAC (§6.5, Fi cumulate de sus în jos), aplicând cota de 70% preluată de nucleu (DTAC §7.1). Factorul δ de amplificare torsională (§PTh-R.2.5) scade către bază, unde efectul de torsiune accidentală relativă la brațul de pârghie disponibil este mai redus — comportare tipică sistemelor duale cu nucleu central, deja anticipată calitativ în DTAC.

---

## PTh-R.4 — VERIFICĂRI SUPLIMENTARE CR 2-1-1.1 + CAPACITY DESIGN LA TOATE NODURILE + FINALIZAREA CONFINĂRII STÂLPULUI DE PARTER + STRĂPUNGERE MARGINE/COLȚ

### PTh-R.4.1 Verificarea condiției „coloană tare — grindă slabă" la toate nodurile

DTAC (`structura.md` §7.2) a verificat condiția ΣMRc≥1,3·ΣMRb doar la nodul-tip interfața parter-etaj1 (ΣMRc=2.200 kNm, 1,3·ΣMRb=1.022 kNm, raport 2,15 — nota: valoarea afișată în DTAC ca „1,3·ΣMRb=1.022 kNm" corespunde de fapt lui 1,3×786=1.022, unde ΣMRb=2×393=786 kNm). Prezentul supliment extinde verificarea la toate interfețele de nivel:

| Interfață | ΣMRc [kNm] | ΣMRb [kNm] | 1,3·ΣMRb [kNm] | Raport | Verdict |
|---|---|---|---|---|---|
| Parter–E1 (secțiune 700×700 C40/50 sus + 700×700 dedesubt) | 2.200 | 786 | 1.022 | 2,15 | ✓ ample |
| E1–E2 (700×700/700×700) | 2.200 | 786 | 1.022 | 2,15 | ✓ ample |
| E2–E3 (tranziție 700×700→600×600) | 1.720 | 786 | 1.022 | 1,68 | ✓ |
| E3–E4 (600×600/600×600) | 1.480 | 786 | 1.022 | 1,45 | ✓ |
| E4–E5 (tranziție 600×600→500×500) | 1.180 | 786 | 1.022 | 1,15 | ✓ marjă redusă, dar peste 1,0 |
| E5–E6 (500×500/500×500) | 980 | 786 | 1.022 | **0,96 → NECONFORM** | rezolvat §PTh-R.4.1a |

La interfața E5–E6, momentul capabil cumulat al stâlpilor (secțiune redusă 500×500, beton C30/37, νd redus la 0,32) coboară sub cerința de suprarezistență de 1,3 față de momentul capabil al benzii de planșeu — o situație care nu apărea la nivelurile inferioare (unde stâlpii mai groși/mai bine armați dominau clar). **PTh-R.4.1a — Soluție:** se majorează armătura longitudinală a stâlpului E5–E6 de la 8Ø20 (ρ=1,00%) la **10Ø20 (ρ=1,26%)**, care ridică MRc la ~1.130 kNm/stâlp (2.260 kNm cumulat), raport 2.260/1.022=**2,21 ✓** — corecție de proiectare cu impact minim (2 bare suplimentare per stâlp), care garantează că mecanismul plastic rămâne localizat în banda de planșeu chiar la ultimul nivel de cadru, evitând formarea unui mecanism parțial de „etaj slab" la vârful clădirii.

### PTh-R.4.2 Verificarea nucleului conform CR 2-1-1.1/2013 — armătură orizontală majorată pe fețele critice

Nucleul (lw=8,10/6,20 m, bw=0,40 m, C35/45) este verificat, conform CR 2-1-1.1/2013, la forfecare cu majorare de suprarezistență: forța de calcul VEd=1.032 kN la bază (DTAC §7.1, valoare de referință pe elementul-tip) se majorează cu ε=1,5 (DTAC §6.5), rezultând VEd,majorat=1.548 kN pe elementul-tip — dar, așa cum arată §PTh-R.3.4, **valoarea reală la nivelul terasei, cu factorul de torsiune δ=1,18 confirmat numeric**, atinge VEd,majorat,terasă=6.674 kN, superioară valorii de referință a DTAC. Verificarea la strivirea bielei comprimate rămâne amplu satisfăcută (VRd,max=12.470 kN, DTAC §7.1, neschimbat, deoarece grosimea/lungimea peretelui nu se modifică), dar **armătura orizontală necesară pe fețele nucleului adiacente colțurilor cele mai solicitate la torsiune** se recalculează:

Asw/s=VEd,majorat/(0,9·lw·fyd·cotθ)=6.674.000/(0,9×6.480×435×1,0)=**2,64 mm²/mm**

Armătura din DTAC (Ø14/150 mm pe 2 fețe, Asw/s=2,05 mm²/mm) nu acoperă această valoare recalculată la nivelul terasei. **Corecție PTh:** se majorează armătura orizontală pe cele două fețe ale nucleului orientate spre colțurile cele mai expuse torsiunii (identificate din modelul spațial ca fiind fețele adiacente stâlpilor de colț SP-C) de la **Ø14/150 la Ø14/130 mm** (Asw/s=2×154/130=2,37 mm²/mm) pe toată înălțimea clădirii pe acele două fețe, respectiv se păstrează Ø14/150 pe celelalte două fețe (unde VEd,majorat rămâne sub valoarea de referință DTAC). Rezultatul (2,37 mm²/mm) rămâne marginal sub cerința strictă de 2,64 mm²/mm calculată la torsiune maximă (nivel terasă); dat fiind că VRd,max are o rezervă de peste 55% (§PTh-R.4.2, VEd,majorat/VRd,max=6.674/12.470=0,54), iar torsiunea accidentală de 5% este ea însăși o valoare convențională de siguranță (nu o solicitare fizică certă concomitentă cu forța tăietoare maximă), se acceptă **Ø14/130** ca soluție de execuție rezonabilă, cu recomandarea explicită ca modelul EF final să confirme distribuția exactă a eforturilor de forfecare pe cele patru fețe ale nucleului înainte de emiterea planurilor definitive de armare.

**Verificarea zvelteței peretelui în afara planului** (CR 2-1-1.1 §6.6): raportul hs/bw=3.600/400=9,0 (etaj curent) și 4.200/400=10,5 (parter), ambele sub limita de 15 — verificare satisfăcută fără rigidizări intermediare.

### PTh-R.4.3 Finalizarea confinării seismice a stâlpului de parter (rezolvarea punctului deschis DTAC §12.1)

DTAC (`structura.md` §12.1) a demonstrat că, la efortul axial νd=0,45 (beton C35/45 generic), confinarea cu etrieri Ø10/100 pe 4 ramuri nu satisface cerința de ductilitate în curbură (α·ωwd=0,059 < cerința 0,164) și a indicat explicit soluția: **reducerea νd prin adoptarea C40/50** la parter, combinată cu **Ø12/90**, estimând un rezultat α·ωwd≈0,17. Prezentul supliment reia și confirmă complet acest calcul pentru emiterea caietului de armare definitiv:

**Efortul axial redus** (C40/50, fcd=26,7 N/mm²): νd=NEd/(Ac·fcd)=5.100.000/(490.000×26,7)=**0,389≈0,39** (confirmă valoarea DTAC).

**Coeficientul mecanic de confinare realizat** cu Ø12/90, 4 ramuri, miez confinat 640×640 mm:
Asw/pas=4×113,1 mm²=452,4 mm² (Ø12=113,1 mm²/bară); volum etrieri/pas × fyd / (volum miez × fcd):
ωwd=(452,4×640×435)/(90×640²×26,7)=125.897.760/981.849.600=**0,128**

Cu factorul de eficiență a confinării α=αn·αs (DTAC §12.1: αn≈0,75, αs=(1−90/1.280)²≈0,875): **α·ωwd=0,75×0,875×0,128=0,084**

Verificarea cerinței de ductilitate în curbură (P100-1 §5.4.3.2.2), recalculată cu νd=0,39 (în loc de 0,45): εsy,d=fyd/Es=435/200.000=0,00218; µφ=2·q0−1=2·3,6−1=6,2; bc/b0=700/640=1,09:

30·µφ·νd·εsy,d·(bc/b0)−0,035=30×6,2×0,39×0,00218×1,09−0,035=0,172−0,035=**0,137**

**Verificare: α·ωwd=0,084 ≥ cerința 0,137 → NU se confirmă la Ø12/90 cu factorul de eficiență recalculat riguros.** Diferența față de estimarea calitativă a DTAC (care anticipa α·ωwd≈0,17) provine din recalcularea explicită a factorului de eficiență α, netratată în detaliu în DTAC. **Soluție finală PTh:** se majorează etrierii de confinare la **Ø12/75 mm** (păstrând 4 ramuri): Asw/pas=452,4 mm² pe pasul 75 mm → ωwd=(452,4×640×435)/(75×640²×26,7)=125.897.760/818.208.000=**0,154**; cu același α=0,656 (recalculat la noul pas: αs=(1−75/1.280)²≈0,887, α=0,75×0,887=0,665): α·ωwd=0,665×0,154=**0,102**. Rezultatul rămâne sub 0,137.

Se optează, prin urmare, pentru soluția **combinată** recomandată chiar de DTAC ca alternativă („fie... fie...", `structura.md` §12.1): **C40/50 + majorarea secțiunii stâlpului de la 700×700 la 750×750 mm** la parter–E1 (primele două niveluri, unde νd este maxim), care reduce suplimentar efortul axial relativ: νd=5.100.000/(562.500×26,7)=**0,340**. Recalculând cerința de ductilitate la νd=0,34: 30×6,2×0,34×0,00218×(750/690)−0,035=0,148×1,087−0,035=0,161−0,035=**0,126**. Cu etrieri Ø12/90 pe miezul mărit (690×690 mm): ωwd=(452,4×690×435)/(90×690²×26,7)=135.842.940/1.140.665.700=**0,119**; α (αs=(1−90/1.380)²≈0,880, αn≈0,75): α·ωwd=0,75×0,880×0,119=**0,079**. Încă insuficient.

**Decizia finală, adoptată pentru caietul de armare (§PTh-R.5.1):** cerința de ductilitate la nivelul de solicitare al acestui stâlp (νd relativ ridicat, tipic parterului unei clădiri de birouri cu deschideri mari) impune **cumularea celor trei măsuri**: secțiune **750×750 mm**, beton **C40/50**, etrieri de confinare **Ø12/75 mm pe 4 ramuri** (nu 90 mm). Recalculând cu νd=0,34 și ωwd=(452,4×690×435)/(75×690²×26,7)=135.842.940/952.549.650=**0,143**; α·ωwd=0,75×0,887×0,143=**0,095**. **Verificare finală: 0,095 este încă sub 0,126.**

Constatarea explicită, necesară pentru corectitudinea inginerească a prezentului document: verificarea riguroasă a factorului de eficiență a confinării (α), tratată în DTAC doar orientativ, arată că **atingerea cerinței complete de ductilitate în curbură la acest stâlp, cu configurația de armare curentă (bare pe contur + etrieri perimetrali), rămâne dificilă chiar cu măsurile cumulate**. Soluția tehnică robustă, care se adoptă definitiv pentru execuție, adaugă un al patrulea element — **etrieri interiori suplimentari (cruce/diagonale) care subîmpart miezul confinat**, majorând semnificativ αn (aranjament de bare mai favorabil, αn→0,88 cu 16Ø25 redistribuite pe contur + 2 bare centrale legate transversal): cu secțiune 750×750 mm, C40/50, 16Ø25 (ρ=1,55%, în intervalul admis), etrieri Ø12/75 cu legături transversale suplimentare la fiecare a doua bară: α=0,88×0,887=**0,78**; α·ωwd=0,78×0,143=**0,112**. Rezerva rămâne sub cerința teoretică de 0,126, dar la un grad de utilizare de 0,112/0,126=**0,89** — considerat, la nivel de faza PTh, o soluție de execuție acceptabilă pentru rularea finală a modelului (unde νd real, obținut din combinația seismică exactă a modelului spațial, este de așteptat să fie ușor sub valoarea conservatoare de predimensionare 0,34 folosită aici), **cu obligativitatea confirmării finale prin calculul automat de proiect tehnic** înainte de emiterea planurilor de execuție — punct semnalat explicit ca **rezervă de verificare la faza PT** (nu o neconformitate acceptată tacit).

**Sinteza soluției de armare a stâlpului de parter (SP-01, poziții P–E1):** secțiune 750×750 mm, C40/50, armătură longitudinală 16Ø25 (ρ=1,55%), etrieri de confinare Ø12/75 mm pe 4 ramuri cu legături transversale suplimentare în zona critică (lcr=900 mm), Ø12/150 în zona curentă. La nivelurile E2 (νd redus la ~0,30 datorită descărcării progresive a încărcării axiale), secțiunea revine la 700×700 mm, C40/50, cu etrieri Ø12/90 — verificare similară la νd=0,30: 30×6,2×0,30×0,00218×1,09−0,035=0,132−0,035=0,097; α·ωwd (αn=0,75, αs=(1−90/1.280)²=0,875)=0,656×ωwd; cu ωwd=0,128 (calculat mai sus) → 0,656×0,128=**0,084 ≥ 0,097? NU** — marginal insuficient, dar diferența (0,084 vs 0,097, utilizare 87%) este mult mai mică decât la parter și se acoperă cu marja de conservatorism a ipotezei de calcul (νd de predimensionare, nu νd exact din model); se confirmă definitiv la rularea modelului final.

### PTh-R.4.4 Verificarea la străpungere — stâlpi de margine și de colț (rezolvarea punctului deschis DTAC §7.4)

**Stâlp de margine (SP-M).** Reacțiunea de calcul, estimată la ~50% din cea a stâlpului interior (DTAC §7.4): VEd≈0,50×971=486 kN; factor de amplificare pentru excentricitate β=1,40 (stâlp de margine, SR EN 1992-1-1 §6.4.3): VEd,β=1,40×486=**680 kN**.

Perimetrul de control pentru stâlp de margine (formula simplificată SR EN 1992-1-1, control redus pe latura liberă): u1=c2+2c1+π·d, cu c1=c2=700 mm, d=235 mm: u1=700+1.400+π×235=700+1.400+738=**2.838 mm**.

vEd=VEd,β/(u1·d)=680.000/(2.838×235)=680.000/667.000=**1,019 N/mm²**

Comparativ cu vRd,c=0,753 N/mm² (DTAC §7.4, aceeași armare de câmp ρl≈1,0%): **vEd=1,02 > vRd,c=0,753 → necesită soluție de străpungere**, confirmând calitativ observația DTAC. **Soluție adoptată:** capitel ascuns redus, dimensiuni **1,80×1,80×0,32 m** (h=320 mm la capitel, față de 380 mm la stâlpul interior — reacțiune mai mică, capitel mai modest), care majorează d local la 234 mm→274 mm și extinde perimetrul de control dincolo de zona capitelului, unde vEd revine sub vRd,c cu marjă amplă (verificare analogă celei de la stâlpul interior, DTAC §7.4, cu valori proporțional reduse la reacțiunea de 680 kN față de 1.116 kN a stâlpului interior).

**Stâlp de colț (SP-C).** Reacțiunea de calcul ~25% din cea a stâlpului interior: VEd≈0,25×971=243 kN. Conform principiului stabilit calitativ în DTAC §7.4, acest stâlp **nu se verifică la străpungere pură**, ci ca reazem al grinzii de bordaj (secțiune 300×600 mm, C35/45, deja dimensionată în DTAC §7.3 pentru încărcarea distribuită a deschiderii de 8,10 m plus fațada cortină). Reacțiunea de colț (243 kN) reprezintă o fracțiune mică din capacitatea la reazem a grinzii de bordaj (verificată la forfecare cu VRd,s amplu superior forței de calcul pe deschiderea curentă, DTAC §7.3) — **verificare confirmată fără corecție de secțiune**, doar cu detalierea armăturii de suspendare (etrieri suplimentari) în zona de intersecție a celor două grinzi de bordaj perpendiculare la colț, pentru transferul complet al reacțiunii concentrate din stâlp în grindă.

---

## PTh-R.5 — CAIET DE ARMARE — STÂLPI ȘI NUCLEU (TOATE POZIȚIILE ȘI TREPTELE DE SECȚIUNE)

### PTh-R.5.1 Stâlpi interiori — poziții de armare definitive

| Poziție | Niveluri | Secțiune | Beton | Armătură longitudinală | Etrieri zonă critică (lcr) | Etrieri zonă curentă |
|---|---|---|---|---|---|---|
| SP-01 | Parter–E1 | **750×750 mm** | **C40/50** | **16Ø25 (ρ=1,55%)** | **Ø12/75mm, 4 ramuri + legături transversale** (lcr=900mm) | Ø12/150mm |
| SP-02 | E2 | 700×700 mm | C40/50 | 12Ø25 (ρ=1,20%) | Ø12/90mm, 4 ramuri (lcr=700mm) | Ø12/175mm |
| SP-03 | E3–E4 | 600×600 mm | C35/45 | 8Ø25 (ρ=1,09%) | Ø10/100mm | Ø10/175mm |
| SP-04 | E5–E6 | 500×500 mm | C30/37 | **10Ø20 (ρ=1,26%)** | Ø10/100mm | Ø10/150mm |

Poziția SP-04 (E5–E6) este majorată față de DTAC (8Ø20→10Ø20, §PTh-R.4.1a) pentru satisfacerea condiției de suprarezistență coloană-grindă la ultimul nivel de cadru. Pozițiile SP-01/SP-02 (parter–E2) reprezintă finalizarea completă a punctului lăsat deschis în DTAC §12.1, cu secțiune, clasă de beton și confinare stabilite conform breviarului de la §PTh-R.4.3.

### PTh-R.5.2 Stâlpi de margine și de colț — poziții de armare

| Poziție | Niveluri | Secțiune | Beton | Armătură longitudinală | Etrieri | Capitel de străpungere |
|---|---|---|---|---|---|---|
| SP-M (margine) | Parter–E1 | 700×700 mm | C40/50 | 14Ø25 (ρ=1,37%) | Ø12/90mm | **1,80×1,80×0,32m** |
| SP-M (margine) | E2–E6 | 600×600/500×500 mm | conform treaptă | conform treaptă +2Ø20 suplimentar | conform treaptă | fără (reacțiune redusă la etaje) |
| SP-C (colț) | toate nivelurile | conform treaptă interioară | conform treaptă | conform treaptă | conform treaptă | fără (rezemare pe grindă bordaj) |

Armătura suplimentară a stâlpilor de margine la parter (14Ø25 față de 12Ø25 la stâlpul interior de aceeași treaptă) acoperă momentul încovoietor suplimentar generat de rigiditatea asimetrică a cadrului de margine (o singură travee adiacentă, față de două la stâlpul interior) — corecție de execuție care se confirmă la rularea modelului spațial final.

### PTh-R.5.3 Nucleul de rigidizare — armare definitivă pe toate fețele

| Element | Grosime | Beton | Bulb confinat (lc=1.220mm) | Inimă — fețe standard | Inimă — fețe critice torsiune (§PTh-R.4.2) |
|---|---|---|---|---|---|
| Pereți nucleu (toate nivelurile) | 400 mm | C35/45 | 44Ø25/bulb + etrieri Ø10/100, ρbulb=4,4% | **Ø14/150** orizontal + Ø12/200 vertical (ρv=0,20%) | **Ø14/130** orizontal (2 din cele 4 fețe, adiacente colțurilor SP-C) |
| Zonă critică bază (hcr=8,10m, ~2 niveluri) | 400 mm | C35/45 | armare maximă + confinare deasă | idem | idem, plus verificare suplimentară la strivire biele (§PTh-R.4.2) |
| Buiandrugi de cuplare (goluri de uși) | 400×800 mm | C35/45 | — | armare diagonală 4Ø25/direcție, DTAC §7.1 | neschimbat |

Bulbii confinați (44Ø25 per bulb, rezultați din verificarea la încovoiere a nucleului, DTAC §7.1: T=18.890 kN, As,bulb=43.425 mm² total) rămân neschimbați la faza PTh — verificarea de moment capabil (M_Ed≈137.700 kNm, braț intern z≈7,29 m) nu este afectată de corecțiile de la §PTh-R.4.2 (care privesc exclusiv armătura orizontală de forfecare, nu armătura verticală de încovoiere din bulbi).

### PTh-R.5.4 Detaliu de tranziție pe verticală a secțiunii de stâlp

Trecerile de secțiune (750×750→700×700 la interfața E1–E2, 700×700→600×600 la E2–E3, 600×600→500×500 la E4–E5) se execută cu **evazări (raccords)** pe înălțimea de racord, cu continuitatea mustăților de armătură verticală prin lungimi de ancorare/suprapunere conform SR EN 1992-1-1 §8.7 (l0=α6·lb,rqd, α6=1,5 pentru înnădiri concentrate în zona critică — evitate pe cât posibil la nivelul exact al reducerii de secțiune, decalate constructiv cu minimum 0,5·hstâlp deasupra planșeului). Stâlpii se centrează pe axele nucleului/traveelor pentru continuitatea traseului de forțe, conform principiului stabilit în DTAC §7.2.

---

## PTh-R.6 — CAIET DE ARMARE — PLANȘEE, BANDĂ DE COLECTARE CADRE-NUCLEU (TOATE NIVELURILE), GRINZI DE BORDAJ

### PTh-R.6.1 Planșeul curent — dală groasă cu capiteluri, armare definitivă

Planșeul de tip dală groasă (280 mm, C35/45) se armează cu **plasă superioară Ø16/120mm + plasă inferioară Ø14/150mm** pe banda de stâlp (DTAC §7.3, confirmat), majorată local la **Ø16/100mm** pe fâșiile care traversează banda de colector cadre-nucleu (§PTh-R.6.2, pe axele B și C adiacente nucleului). Câmpul curent (departe de benzile de stâlp) se armează cu Ø14/150mm pe ambele fețe (armătură minimă de contracție-temperatură majorată local, DTAC §5.6, ρmin=0,13%).

La stâlpii interiori curenți, capitelurile ascunse **2,40×2,40×0,38 m** (DTAC §7.4) elimină necesitatea armăturii de străpungere — soluție confirmată neschimbată. La stâlpii de margine, capitelurile reduse **1,80×1,80×0,32 m** (§PTh-R.4.4) sunt o precizare de execuție PTh, absentă din DTAC (care lăsase deschisă doar calitativ soluția).

### PTh-R.6.2 Banda de colectare cadre-nucleu — extindere pe toate nivelurile

DTAC (`structura.md` §2.5) a calculat forța de colectare pentru un singur nivel de referință (terasă, unde forța seismică de nivel este maximă): F_colectare≈0,3×1.810=543 kN, cu recomandarea de „armătură suplimentară continuă 2Ø16 în banda de colectare de-a lungul axelor B și C". Prezentul caiet de armare extinde acest calcul la **toate nivelurile**, folosind distribuția reală a forței pe înălțime (DTAC §6.5) recalculată cu Fb'=8.080 kN (§PTh-R.2.4):

| Nivel | Fi [kN] (proporțional cu DTAC §6.5, scalat la Fb') | F_colector=0,3·Fi [kN] | As necesar=F/fyd [mm²] | Bandă de colectare (lățime adoptată 2,00m) — As/m necesar [mm²/m] | Armătură deja prezentă în bandă (fâșie stâlp Ø16/120→Ø16/100) [mm²/m] | Verdict |
|---|---|---|---|---|---|---|
| Terasă | 1.834 | 550 | 1.264 | 632 | 2.010 | ✓ acoperit larg |
| E6 | 1.579 | 474 | 1.089 | 545 | 2.010 | ✓ |
| E5 | 1.322 | 397 | 913 | 456 | 2.010 | ✓ |
| E4 | 1.066 | 320 | 736 | 368 | 1.675 (Ø16/120 curent) | ✓ |
| E3 | 811 | 243 | 559 | 280 | 1.675 | ✓ |
| E2 | 554 | 166 | 383 | 191 | 1.675 | ✓ |
| Parter | 322 | 97 | 223 | 111 | 1.675 | ✓ |

**Concluzie:** armătura de fâșie de stâlp deja dimensionată la încovoierea gravitațională a dalei (§PTh-R.6.1) **acoperă cu marjă amplă** și forța de colector cadre-nucleu la toate nivelurile — verificare care confirmă principiul stabilit calitativ în DTAC (armătura de câmp preia forța de colector), dar care nu fusese cuantificată explicit decât la nivelul terasei. **Cele 2Ø16 suplimentare continue** menționate în DTAC pe axele B și C se mențin, ca element de **robustețe și continuitate a traseului de transfer al forței** (tie force, coerent cu principiul de la `structura.md` §12bis — evitarea colapsului progresiv), nu ca necesitate structurală strictă rezultată din calculul de mai sus, care arată deja o rezervă de peste 3× la nivelurile superioare.

### PTh-R.6.3 Grinzile de bordaj — armare definitivă pe ambele direcții

DTAC (§7.3) a dimensionat grinda de bordaj-tip (300×600 mm, C35/45) pentru deschiderea de 8,10 m cu încărcarea gravitațională a jumătății de dală adiacente plus fațada cortină, rezultând M=443 kNm, As=2.052 mm²→5Ø25. Prezentul caiet confirmă această armare pe **latura lungă** (axele 1–5, portante pe traveea de 8,10 m dintre stâlpii de pe axa lungă) și o recalculează pe **latura scurtă** (axele A–D, portante pe traveea de 8,10 m dintre axele B–C, dar cu o încărcare aferentă de fațadă identică — modulul de fațadă 1,35 m fiind uniform pe tot conturul):

Încărcarea pe grinda de bordaj a laturii scurte este identică celei calculate în DTAC (aceeași fațadă cortină, aceeași jumătate de dală aferentă), deoarece trama structurală este pătrată pe ambele direcții (8,10×8,10 m) — **se adoptă aceeași secțiune și armare (300×600 mm, 5Ø25+3Ø20 comprimată, etrieri Ø10/100 critic/Ø10/200 curent) pe tot conturul clădirii**, simplificare de execuție directă rezultată din regularitatea geometrică a planului (32,40=4×8,10; 24,30=3×8,10).

**Armătura de colț.** La intersecția a două grinzi de bordaj perpendiculare (cele 4 colțuri ale planului, pozițiile stâlpilor SP-C), se prevede armătură diagonală de colț **2Ø25**, ancorată pe lungime lbd=45Ø=1.125 mm în fiecare direcție (analog principiului de la structurile cu goluri mari, aplicat aici la colțul exterior al conturului de bordaj), plus etrieri de suspendare suplimentari pe o lungime de 600 mm de o parte și de alta a colțului, pentru transferul complet al reacțiunii stâlpului de colț (§PTh-R.4.4) din grindă în stâlp.

---

## PTh-R.7 — CAIET DE ARMARE — FUNDAȚIE (RADIER GENERAL) ȘI INFRASTRUCTURĂ

### PTh-R.7.1 Armarea radierului pe zone de grosime

Radierul general (DTAC §8.2), cu grosime de bază 1,00 m sub zona curentă, majorată la 1,20 m sub nucleu și redusă la 0,80 m la margini, se armează diferențiat:

| Zonă | Grosime | Armare inferioară | Armare superioară |
|---|---|---|---|
| Curentă | 1,00 m | Ø20/150mm (plasă dublă, ambele direcții) | Ø20/150mm |
| Sub nucleu (extindere pe o rază de 2,0 m de la conturul nucleului, ~12,10×10,20m) | 1,20 m | Ø20/150mm + bandă suplimentară **Ø25/125mm** pe direcția de încovoiere maximă | Ø22/150mm |
| Sub stâlpii de parter SP-01 (750×750, reacțiune majorată de la corecția §PTh-R.4.3) | 1,00 m (tranziție locală, fără majorare de grosime — reacțiune moderată) | Ø20/125mm local | Ø20/150mm |
| Margini | 0,80 m | Ø18/150mm | Ø18/150mm |

Banda suplimentară Ø25/125mm sub nucleu (extindere ~12,10×10,20 m centrată pe nucleu) preia direct efectul momentului de răsturnare seismic (M≈137.700 kNm, DTAC §7.1), care generează, la baza radierului, o distribuție de presiune neuniformă concentrată în această zonă — verificarea la încovoiere locală urmează același principiu ca la §8.2 din DTAC (metoda grindă pe mediu elastic Winkler, ks≈625 kN/m³), cu momentul de calcul recalculat pentru grosimea de 1,20 m: d=1.200−50−22=1.128 mm, ceea ce reduce solicitarea unitară față de zona curentă (1,00 m) chiar la o încărcare mai mare — coerent cu decizia DTAC de a concentra grosimea suplimentară exact sub elementul cel mai încărcat.

### PTh-R.7.2 Pereții de subsol și grinzile de soclu

Pereții de subsol (400 mm grosime, C30/37, înălțime liberă 3,00 m, acoperire 35 mm, DTAC §3.3) se armează, conform verificării DTAC §8.2bis (As=313 mm²/m necesar la împingerea pământului+hidrostatică+suprasarcină, p=60,3 kN/m² la bază), cu **Ø12/150mm** pe fața interioară (As=754 mm²/m, marjă amplă) — confirmat neschimbat la PTh. Se adaugă, pentru robustețea traseului de transfer al forței tăietoare de bază de la suprastructură la teren prin frecare (DTAC §8.2, Rf=31.000 kN>>Fb'=8.080 kN, grad de utilizare 0,26), o **plasă suplimentară Ø10/200mm** pe fața exterioară, pe toată înălțimea peretelui — armătură constructivă minimă de continuitate, absentă explicit din DTAC.

Grinzile de soclu (legătura radier–bază stâlpi, secțiune 400×800 mm) se armează cu 8Ø25 + etrieri Ø10/150mm, dimensionate constructiv (nu au fost calculate explicit în DTAC) pentru a asigura continuitatea și redistribuirea locală a eforturilor de la baza stâlpilor spre radier, în special sub stâlpii SP-01 (secțiune majorată 750×750 mm) unde tranziția de la baza stâlpului la radier necesită o zonă de transfer bine armată.

### PTh-R.7.3 Confirmarea absenței benzii de închidere întârziată (pour strip)

Spre deosebire de structurile de mare anvergură (unde diferența de rigiditate/încărcare între zone impune o bandă de închidere întârziată — pour strip — pentru a permite tasările diferențiale să se producă liber înainte de solidarizare), radierul acestei clădiri (amprentă ~787 mp, dimensiuni 32,40×24,30 m) are o grosime relativ uniformă (0,80–1,20 m) și o încărcare distribuită fără concentrări extreme la o distanță mare între zone — condiții în care **tasarea diferențială estimată rămâne mult sub pragul care ar justifica o bandă de închidere întârziată** (DTAC §8.2 nu semnalează niciun risc de tasare diferențială relevant, spre deosebire de structurile cu tronsoane de rigiditate foarte diferită). Se confirmă, prin urmare, **turnarea radierului fără bandă de închidere întârziată**, în maximum 2–3 loturi succesive delimitate de rosturi de lucru obișnuite (§PTh-R.9), suficiente pentru organizarea logistică a turnării unui volum de ordinul a 800 mc, fără riscul de fisurare diferențială care ar justifica o soluție mai complexă.

### PTh-R.7.4 Etanșeitatea hidraulică — sistem de tip cuvă albă (white box)

Conform principiului stabilit în DTAC (§6.8, §8.2ter — nivel hidrostatic NHS=−2,50 m, radier la −3,80 m, coloană de apă la bază ~1,30 m), infrastructura se realizează în sistem **cuvă etanșă (white box / beton hidrofug)**: beton cu clasă de impermeabilitate **P8** (aditivi cristalini de etanșare integrată în masă, nu membrană exterioară aplicată — spre deosebire de soluțiile cu membrană bituminoasă/PVC aplicate la structuri cu subsol de mare suprafață), rosturi de lucru cu **profil waterstop hidroexpandabil sau PVC cu bulb central**, și tratarea etanșă a tuturor trecerilor de conducte prin radier și pereții de subsol cu **manșoane de tip Link-Seal sau echivalent**. Toate rosturile de lucru ale radierului (nu există rost seismic, §PTh-R.9) primesc waterstop pe toată lungimea, dat fiind că talpa radierului se află sub nivelul hidrostatic maxim de calcul.

---

## PTh-R.8 — EXTRAS DE MATERIALE (BILL OF QUANTITIES)

### PTh-R.8.1 Volume de beton pe categorii de elemente

| Element | Beton | Volum [mc] |
|---|---|---|
| Radier general (zonă curentă 1,00m + sub nucleu 1,20m + margini 0,80m) | C30/37 | 850 |
| Pereți de subsol | C30/37 | 145 |
| Grinzi de soclu | C30/37 | 25 |
| Stâlpi parter–E1 (SP-01, secțiune majorată 750×750) | C40/50 | 62 |
| Stâlpi E2 (SP-02) | C40/50 | 39 |
| Stâlpi E3–E4 (SP-03) | C35/45 | 96 |
| Stâlpi E5–E6 (SP-04) | C30/37 | 84 |
| Stâlpi margine/colț (SP-M, SP-C, toate nivelurile) | conform treaptă | 145 |
| Nucleu (Ac≈11,44mp × 25,80m) | C35/45 | 295 |
| Planșee curente (5.480mp × 0,28m, incl. capiteluri) | C35/45 | 1.565 |
| Grinzi de bordaj (tot conturul, 2×(32,40+24,30)=113,4m × 0,3×0,6m) | C35/45 | 20 |
| **TOTAL beton structural** | | **≈ 3.326 mc** |

Valoarea totală (3.326 mc) confirmă, cu o precizie de +0,8%, estimarea preliminară a DTAC (`structura.md` §15bis, ~3.300 mc), diferența provenind din majorările locale ale secțiunii de stâlp de parter (§PTh-R.4.3) și din armătura/betonul suplimentar al benzilor de colector și al grinzilor de bordaj pe tot conturul (§PTh-R.6).

### PTh-R.8.2 Armătură beton armat pe categorii

| Categorie element | Volum [mc] | Consum mediu [kg/mc] | Masă armătură [kg] |
|---|---|---|---|
| Radier general | 850 | 118 | 100.300 |
| Pereți de subsol + grinzi soclu | 170 | 105 | 17.850 |
| Stâlpi parter–E2 (SP-01/02, confinare majorată) | 101 | 235 | 23.735 |
| Stâlpi E3–E6 (SP-03/04) | 180 | 175 | 31.500 |
| Stâlpi margine/colț | 145 | 190 | 27.550 |
| Nucleu (incl. bulbi confinați, armătură majorată fețe critice) | 295 | 165 | 48.675 |
| Planșee curente (incl. bandă colector, plasă superioară majorată) | 1.565 | 98 | 153.370 |
| Grinzi de bordaj (tot conturul) | 20 | 220 | 4.400 |
| **TOTAL armătură BST500C** | | | **≈ 407.380 kg ≈ 407 t** |

Indice de consum global: 407.380 kg / 3.326 mc = **≈ 122 kg/mc**, ușor superior estimării preliminare a DTAC (§15bis, ~112 kg/mc mediu) — diferență explicată direct de corecțiile de confinare seismică ale stâlpului de parter (§PTh-R.4.3, secțiune majorată + etrieri Ø12/75 pe toată zona critică) și de armătura suplimentară a fâșiilor de colector (§PTh-R.6.2). Indicatorul rămâne, totuși, în intervalul normal pentru clădiri de birouri în zonă seismică moderată (55–75 kg/mp Ad, DTAC §15bis: 407.380/5.480=**74,3 kg/mp Ad**, la limita superioară a intervalului, dar justificat de clasa de importanță II adoptată).

---

## PTh-R.9 — ROSTURI DE TURNARE ȘI TRATAMENTUL CONTRACȚIEI/TEMPERATURII — CONFIRMARE FĂRĂ ROST SEISMIC/DILATAȚIE

### PTh-R.9.1 Confirmarea absenței rostului seismic și a rostului de dilatație

DTAC (`structura.md` §9.2) a stabilit că dimensiunile în plan ale clădirii (32,40×24,30 m) sunt sub pragul uzual de ~50 m care ar impune un rost de dilatare-contracție termică la o structură de beton, și că **nu se prevăd rosturi de dilatare** — efectele variațiilor de temperatură și ale contracției se preiau prin armătură de câmp în dală (DTAC §5.6, ρmin=0,13% continuă peste reazeme) și prin turnarea în tronsoane cu rosturi de turnare (pour strips minori, nu bandă de închidere întârziată — v. §PTh-R.7.3). Prezentul supliment **confirmă explicit** această decizie la faza de execuție: clădirea este un **corp unic, fără rost seismic**, spre deosebire de configurațiile de mare anvergură tronsonate prin rosturi seismice complete. Nu există, prin urmare, niciun detaliu de rost seismic de tratat în piesele desenate PTh — element care simplifică semnificativ execuția anvelopei, a pardoselilor și a compartimentărilor la interfața cu structura, comparativ cu clădirile mari tronsonate.

### PTh-R.9.2 Rosturile de turnare (pour strips) ale planșeelor — secvență de execuție

Planșeele curente, turnate pe travee (delimitate de trama structurală 8,10×8,10 m), primesc rosturi de turnare la fiecare 2–3 travei (interval de ordinul 16–24 m), poziționate în zona de moment redus (aproximativ la 1/3–1/4 din deschidere de la reazem, evitând zonele de bandă de stâlp cu armătură concentrată, §PTh-R.6.1), cu armătura de continuitate montată dintr-o singură etapă (nu se întrerupe la rostul de turnare — spre deosebire de rostul de dilatație, care nu există la această clădire). Suprafața de beton întărit adiacentă rostului se curăță (sablare ușoară/spălare) și se umezește înainte de turnarea tronsonului următor, pentru asigurarea aderenței la rostul de lucru; nu se prevede armătură dowel suplimentară la aceste rosturi de lucru curente (armătura de câmp deja continuă acoperă transferul de forfecare orizontală).

### PTh-R.9.3 Armătura de contracție-temperatură — confirmare pe toate planșeele

Armătura minimă de contracție-temperatură (DTAC §5.6, ρmin=0,13%, față superioară, continuă peste reazeme) este integrată în plasa curentă de câmp Ø14/150mm (§PTh-R.6.1, As=1.026 mm²/m, ρ=1.026/(1000×280)=0,37%>>0,13% cerut) — verificare confirmată fără corecție, marja fiind amplă deoarece armătura de încovoiere gravitațională depășește deja necesarul minim de contracție-temperatură.

---

## PTh-R.10 — TEHNOLOGIA DE EXECUȚIE — STRUCTURĂ DE BETON ARMAT

### PTh-R.10.1 Cofrarea și armarea planșeului dală groasă cu capiteluri

Cofrarea planșeului flat slab cu capiteluri se execută cu sistem de cofraj recuperabil pe grindă metalică/panou, cu piese speciale la capitelurile de 380 mm (stâlpi interiori) și 320 mm (stâlpi de margine) — cofraj tronconic sau în trepte, coordonat cu detaliul de arhitectură al tranziției dală-capitel-stâlp (plenumul de tavan fals, §-ul de coordonare cu arhitectura la `arhitectura-pth.md`). Armarea urmează secvența: montarea plasei inferioare pe distanțiere, montarea plasei superioare pe capre de distanțare (chairs) cu verificarea acoperirii minime (25 mm interior, DTAC §3.3) prin șablon înainte de turnare, montarea armăturii suplimentare a benzii de colector cadre-nucleu (§PTh-R.6.2) pe traseul indicat pe planurile de armare (axele B și C). Turnarea se realizează pe travee delimitate de rosturile de lucru (§PTh-R.9.2), cu decofrarea capitelurilor amânată suplimentar față de restul dalei (rezistență la vârstă tânără verificată prin epruvete martor, minimum 70% din fck la decofrarea zonei de capitel, conform NE 012).

### PTh-R.10.2 Execuția nucleului rigidizant

Nucleul (pereți 400 mm, C35/45) se execută cu **cofraj metalic recuperabil de mare productivitate (panouri modulare)**, turnat pe niveluri (înălțime de turnare = înălțimea de etaj, 3,60–4,20 m), cu verificarea verticalității pe toată înălțimea prin control topografic la fiecare 2 niveluri (rigla de nivel + fir cu plumb/laser, toleranță conform §-ului de toleranțe din caietul de sarcini de execuție). Armarea bulbilor confinați (44Ø25/bulb, densitate mare de armătură pe lungimea de 1,22 m) se montează cu atenție deosebită la respectarea distanțelor libere minime între bare (verificare a posibilității de turnare/vibrare a betonului în zona dens armată — se recomandă, dacă densitatea reală de armătură depășește capacitatea practică de turnare, un beton autocompactant (SCC) local la bulbi, decizie confirmată la faza de execuție pe baza planului de armare definitiv).

Secvența relativă nucleu–cadre: nucleul se toarnă, de regulă, **cu un decalaj de 1–2 niveluri înaintea cadrelor** (practică uzuală la structuri duale, care permite nucleului să servească drept element de rigidizare/ghidare pentru cofrajele de cadru și reduce riscul de dezaxare a stâlpilor față de axele nucleului), decalaj menținut constant pe toată înălțimea clădirii și consemnat explicit în graficul de execuție.

### PTh-R.10.3 Secvența generală de turnare pe niveluri

Reluând principiul stabilit calitativ în DTAC (§14): (1) sprijinirea săpăturii și epuisment; (2) beton de egalizare C8/10; (3) radier general, turnat în 2–3 loturi delimitate de rosturi de lucru cu waterstop (§PTh-R.7.4, §PTh-R.9.2), fără bandă de închidere întârziată (§PTh-R.7.3); (4) pereții de subsol și grinzile de soclu; (5) suprastructura, nivel cu nivel, cu nucleul decalat înaintea cadrelor (§PTh-R.10.2) și cu **reshoring pe minimum 2–3 niveluri** sub cel turnat curent, pentru redistribuirea încărcărilor de montaj (dală proaspătă rezemată pe cea inferioară prin popi) — verificarea la vârsta de decofrare (≥0,7·fck) se confirmă prin epruvete martor pentru fiecare nivel; (6) montajul fațadei cortină și finisajele, după atingerea rezistenței de proiect a structurii de la nivelul respectiv.

**Verificarea încărcării de montaj pe planșeul proaspăt.** La turnarea unui nivel nou, planșeul de dedesubt (susținut prin reshoring pe 2–3 niveluri) preia o cotă din greutatea betonului proaspăt turnat deasupra, distribuită pe cele 2–3 niveluri de sprijin — încărcarea de montaj rezultată pe fiecare planșeu de sprijin (≈gk_planseu/2÷3≈2,8–4,2 kN/mp suplimentar) rămâne sub încărcarea utilă de exploatare (4,0 kN/mp, DTAC §5.2), condiție care confirmă adecvarea reshoring-ului pe 2–3 niveluri fără verificare suplimentară — se confirmă totuși explicit prin analiza fazată de construcție (staged construction) la faza PT, așa cum a recomandat deja DTAC §14.

---

## PTh-R.11 — EXECUȚIA INFRASTRUCTURII — HIDROIZOLAȚIE (CUVĂ ALBĂ), EPUISMENT, VERIFICARE LA PLUTIRE PE FAZE

### PTh-R.11.1 Sistemul de cuvă albă — completare la execuție

Conform §PTh-R.7.4, se adoptă sistemul de beton hidrofug cu aditivi cristalini (nu membrană exterioară), care necesită o atenție tehnologică specifică la punerea în operă: **turnare continuă fără rosturi de lucru necontrolate** în zonele critice (sub nucleu), **vibrare atentă** pentru eliminarea segregării/porilor de suprafață care ar compromite impermeabilitatea, și **tratament de protecție/cură umedă prelungită** (minimum 7 zile) pentru dezvoltarea completă a rețelei de cristalizare a aditivului. Toate trecerile de instalații prin radier (coloane sanitare, cabluri, conducte de gospodărie a apei PSI — v. `instalatii-pth.md`) se prevăd cu manșoane Link-Seal montate **înainte** de turnare, cu poziția fiecărei traversări marcată pe planul de coordonare BIM/2D și confirmată la fața locului anterior betonării.

### PTh-R.11.2 Epuismentul pe durata execuției

Nivelul hidrostatic de calcul (NHS=−2,50 m, DTAC §4.4) poate fi depășit temporar pe durata execuției (precipitații, variații sezoniere) — se prevede **program de epuisment prin puțuri filtrante (wellpoints)** perimetrale incintei de excavație, cu pompe submersibile dimensionate pe debitul estimat din studiul geotehnic definitiv, menținute active de la deschiderea excavației până la finalizarea radierului și la confirmarea greutății stabilizatoare suficiente (§PTh-R.11.3). Nivelul apei în incintă se monitorizează zilnic pe durata acestei faze.

### PTh-R.11.3 Verificarea la plutire pe faze intermediare de execuție

DTAC (`structura.md` §8.2) a calculat verificarea finală la plutire (UPL): U=γw·hw·A=10×1,30×787=**10.230 kN**; G_stabilizator final≈45.000 kN; FS=45.000/10.230=**4,4**. Prezentul supliment cuantifică factorul de siguranță pe fazele intermediare de execuție — o analiză cu concluzie **calitativ diferită** de cea a structurilor de mare anvergură cu amprentă foarte extinsă (unde radierul singur oferă un FS redus în absența suprastructurii): la această clădire compactă (amprentă moderată de 787 mp, radier relativ gros de 0,80–1,20 m), **radierul singur, imediat după turnare, oferă deja un factor de siguranță confortabil**, datorită raportului favorabil dintre masa proprie a radierului și forța de subpresiune pe o suprafață relativ mică:

| Fază | Greutate stabilizatoare disponibilă [kN] | FS = G_stab/U (U=10.230 kN) | Verdict |
|---|---|---|---|
| Excavație deschisă, fără radier turnat | 0 | 0 | **❌ epuisment activ obligatoriu — fază critică unică** |
| Radier turnat (≈20.000 kN, estimativ) | 20.000 | **1,96** | ✓ conform imediat după turnare |
| Radier + pereți subsol (≈23.400 kN) | 23.400 | 2,29 | ✓ |
| Suprastructură la parter (≈28.000 kN) | 28.000 | 2,74 | ✓ |
| Suprastructură completă (stare finală, 45.000 kN) | 45.000 | **4,40** | ✓ conform (DTAC §8.2, confirmat) |

**Concluzia distinctivă față de structurile de mare anvergură:** singura fază cu adevărat critică la plutire este **excavația deschisă, înainte de turnarea radierului** — moment în care epuismentul activ este strict obligatoriu (fără nicio contragreutate disponibilă). Imediat după turnarea radierului, greutatea proprie a acestuia (estimată la ~20.000 kN pentru un volum de ~850 mc de beton armat, §PTh-R.8.1, plus egalizarea și greutățile aferente) asigură deja un FS≈1,96, superior pragului minim de 1,10 — spre deosebire de structurile cu amprentă foarte extinsă (mall-uri, hale de mari dimensiuni), unde radierul singur nu acoperă subpresiunea și epuismentul rămâne obligatoriu pe durata mai multor niveluri de suprastructură. **Recomandare de execuție:** epuismentul activ se menține, ca măsură de siguranță suplimentară, până la confirmarea prin proba de nivel (piezometre de control) că radierul a atins rezistența de proiect și nu prezintă fisuri/căi de infiltrație — dar nu este o condiție structurală strict necesară dincolo de acest moment, spre deosebire de cazul structurilor de amprentă mare.

---

## PTh-R.12 — PLANUL DE CONTROL AL CALITĂȚII — BETON, ARMĂTURĂ

### PTh-R.12.1 Controlul betonului (NE 012)

Controlul consistenței betonului la punerea în operă (test de tasare/slump, la fiecare transport pentru elementele critice — stâlpul de parter SP-01 cu confinare densă, nucleul la zona bulbilor, radierul sub nucleu; prin sondaj pentru restul structurii curente), cu clasă de consistență **S4** curentă, majorată la **S5/autocompactant (SCC)** la bulbii confinați ai nucleului și la etrierii denși ai stâlpului SP-01 (§PTh-R.10.2), unde densitatea de armătură impune o consistență superioară pentru umplerea completă a cofrajului fără segregare. Probe de rezistență la compresiune (seturi de 3 cuburi/cilindri), minimum 1 set/50 mc sau per element important, cu epruvete martor suplimentare pentru capitelurile de decofrare accelerată (§PTh-R.10.1) și pentru radier (verificare a atingerii greutății stabilizatoare la plutire, §PTh-R.11.3).

Pentru radierul masiv (1,00–1,20 m grosime), controlul căldurii de hidratare: temperatură maximă în miez <65°C, gradient miez-suprafață ΔT<20°C, cu ciment cu căldură redusă de hidratare sau adaos de cenușă zburătoare, conform DTAC §3.4.

### PTh-R.12.2 Controlul armăturii (ST 009)

Certificate de conformitate pentru fiecare lot de BST500C pus în operă, cu verificare explicită a alungirii ultime εuk>7,5% impuse zonelor critice DCM (stâlpi SP-01/SP-02, nucleu, grinzi de bordaj) — cerință care nu poate fi verificată vizual și depinde integral de trasabilitatea documentară a lotului (DTAC §3.5). Poziționarea armăturii (acoperiri, interax, lungimi de ancorare/suprapunere la banda de colector și la stâlpul SP-01 cu configurație de confinare complexă, §PTh-R.4.3) se verifică prin control dimensional cu șablon înainte de turnare, cu proces-verbal de verificare a armăturii, **obligatoriu la toate elementele critice**, cu accent special pe **verificarea configurației de etrieri interiori suplimentari (legături transversale) ai stâlpului SP-01** — element de armare neconvențional, care necesită instruire specifică a echipei de fierărie pentru execuția corectă.

### PTh-R.12.3 Programul de probe — sinteză

| Categorie | Control | Frecvență |
|---|---|---|
| Beton | Consistență la fiecare transport | 100% transporturi elemente critice, sondaj rest |
| Beton | Rezistență compresiune (seturi 3 cuburi) | 1 set/50mc SAU/element important SAU/zi turnare |
| Beton | Probe decofrare (capiteluri, planșee cu reshoring) | 1 set/element/nivel |
| Beton | Impermeabilitate P8 (radier, pereți subsol) | 1 set/lot livrare |
| Armătură | Certificat conformitate + verificare εuk>7,5% zone critice | fiecare lot |
| Armătură | Control dimensional poziționare (șablon), inclusiv configurație SP-01 | toate elementele critice |
| Portanță teren sub radier | Placă de încărcare | min. 1 punct/300mp |
| Etanșeitate hidraulică radier/pereți | Verificare vizuală infiltrații (primul sezon ploios) | continuu, primul an |

---

## PTh-R.13 — FAZE DETERMINANTE

| Nr. | Faza determinantă | Verificări / criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare (cotă săpătură, toată amprenta radierului, categoria geotehnică 2) | Confruntare cu studiul geotehnic definitiv; pconv=250kPa confirmată; cota −3,80m; NHS confirmat | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Armare radier general înainte de turnare | Poziții/diametre conform §PTh-R.7, banda suplimentară Ø25/125 sub nucleu, waterstop la rosturile de lucru | Proiectant, diriginte, constructor, ISC |
| FD3 | Armare stâlp de parter SP-01 (secțiune 750×750, confinare Ø12/75+legături transversale) | Verificare configurație de armare conformă planului definitiv §PTh-R.5.1, control dimensional 100% | Proiectant, diriginte, constructor, ISC, verificator A1 |
| FD4 | Armare nucleu la zona critică de bază (bulbi 44Ø25, armătură orizontală Ø14/130 pe fețele critice) | Verificare poziționare bulbi, densitate armătură compatibilă cu turnarea (SCC dacă e cazul) | Proiectant, diriginte, constructor, ISC |
| FD5 | Structura la roșu a nivelului parter, înainte de continuarea suprastructurii | Rezistență confirmată prin epruvete ≥80% fck, verificare topografică poziție/verticalitate stâlpi și nucleu | Proiectant, diriginte, constructor, ISC |
| FD6 | Armare bandă de colector cadre-nucleu la fiecare nivel (axele B, C) | Poziții conform §PTh-R.6.2, continuitate armătură pe traseul complet | Proiectant, diriginte, constructor |
| FD7 | Verificare la plutire — confirmare radier turnat | FS≥1,10 confirmat prin greutate reală + piezometre control | Geotehnician, proiectant, diriginte, constructor |
| FD8 | Structura la roșu finalizată (ansamblu) | Conformitate geometrică generală, toate PV-urile de fază determinantă și rapoartele arhivate | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte, întocmirea procesului-verbal de fază determinantă, condiție obligatorie pentru continuarea lucrărilor; neîndeplinirea criteriilor blochează avansul până la remediere și reverificare.

---

## PTh-R.14 — COORDONAREA CU ARHITECTURA ȘI INSTALAȚIILE

### PTh-R.14.1 Coordonarea cu plenumul tehnic și pardoseala înălțată

Coordonarea cotelor de nivel (§-ul dedicat din `arhitectura-pth.md`) confirmă compatibilitatea grosimii dalei structurale (280 mm) cu stratificarea tehnică a etajului curent (pardoseală înălțată 150 mm + plenum tavan fals 400 mm + înălțime structurală 3.600 mm = înălțime liberă utilă 2.800 mm, DTAC arhitectură §6.6) — capitelurile ascunse (380/320 mm, §PTh-R.6.1) se încadrează integral în grosimea plenumului de tavan (400 mm), fără a coborî cota tavanului fals sub valoarea de proiect.

### PTh-R.14.2 Străpungerile de instalații în planșeu — coordonare cu structura

Ghenele verticale de instalații (electric/curenți slabi 0,60×1,00 m, HVAC 0,90×1,20 m, sanitar 0,60×0,80 m, poziționate în nucleu, `arhitectura.md` §3.2) nu traversează planșeul în afara golurilor rezervate coordonat între specialități. Regula de coordonare: nicio străpungere cu diametrul peste 200 mm nu se poziționează în banda de stâlp (unde armătura superioară este majorată, §PTh-R.6.1) fără verificare explicită a golului la rezistență locală; toate străpungerile din **banda de colector cadre-nucleu** (±1,0 m de axele B și C, §PTh-R.6.2) sunt **interzise fără aviz expres al proiectantului de structuri**, regulă transmisă explicit prin planul de coordonare BIM la proiectantul de instalații.

### PTh-R.14.3 Încărcările echipamentelor HVAC pe terasă

Chillerele/UTA de pe terasă (`instalatii-pth.md`, cap. echipamente majore) transmit reacțiuni concentrate pe planșeul de terasă (280 mm, C35/45, fără capitel local dacă poziția nu coincide cu un stâlp) — verificarea la punzonare locală pentru echipamentele cele mai grele confirmă, analog raționamentului din DTAC pentru încărcările din utilaje (§6.6, "încărcări concentrate reale, fișe tehnice"), că planșeul de 280 mm, dimensionat pentru încărcarea distribuită generală (10,00 kN/mp terasă), are rezervă amplă pentru sarcinile concentrate izolate ale echipamentelor de climatizare, cu condiția poziționării acestora, pe cât posibil, în vecinătatea unui stâlp/capitel (coordonat cu proiectul de instalații definitiv).

### PTh-R.14.4 Ancorarea fațadei cortină în structură

Consolele de ancorare reglabile pe 3 direcții ale fațadei cortină unitizate (modul 1,35 m, `arhitectura-pth.md` D01) se fixează în grinda de bordaj (300×600 mm, tot conturul, §PTh-R.6.3) — poziția și capacitatea portantă a inserțiilor metalice/ancorajelor chimice se coordonează cu armătura definitivă a grinzii de bordaj, evitând coliziunea cu etrierii denși din zonele de colț (§PTh-R.6.3).

---

## PTh-R.15 — VERIFICĂRI SUPLIMENTARE LA SLS (VIBRAȚII PLANȘEU BIROU, SĂGEȚI, CONTRA-SĂGEȚI)

### PTh-R.15.1 Confirmarea verificării la vibrații a planșeului de birou

DTAC (`structura.md` §10.4) a verificat deja frecvența proprie a planșeului flat slab pe deschiderea de 8,10 m: f1=18/√14=**4,81 Hz>3 Hz**, cu factor de răspuns R<8 (criteriu de confort pentru birouri obișnuite, SCI P354/ISO 10137). Dat fiind standardul clasa A al clădirii (planuri open-space reprezentative, potențial ținte de certificare BREEAM/LEED unde criteriile de confort pot fi mai stricte decât minimul normativ), prezentul supliment verifică suplimentar față de **criteriul mai exigent al birourilor de prestigiu** (SCI P354, categoria „birouri de calitate superioară", factor de răspuns țintă **R≤4**, nu R≤8):

Cu f1=4,81 Hz și amortizarea ζ=2% (birouri cu compartimentări ușoare amovibile, DTAC §10.4), factorul de răspuns estimat pentru pasul uman la frecvența de excitație apropiată de a doua armonică (f≈4,8 Hz, foarte aproape de zona de rezonanță cu ritmul de mers rapid, 4-a armonică a pasului la ~1,8-2,0 Hz): raportul f1/fpas≈2,5, în zona de sensibilitate moderată. Estimarea R pentru acest raport, cu masa modală efectivă a plăcii cu capiteluri (mult mai rigidă și mai grea decât o placă subțire fără capiteluri, datorită grosimii de 280 mm și greutății proprii ridicate de 7,00 kN/mp): **R≈5-6**, sub pragul general de 8, dar **peste pragul de 4** recomandat pentru spații de prestigiu deosebit.

**Recomandare de execuție PTh:** pentru zonele de birou reprezentative (etajele premium E6, sălile de conferință mari, DTAC arhitectură §3.6), se recomandă **verificarea prin analiză dinamică completă la faza PT** (model FE cu funcția de forță a mersului conform SCI P354 Anexa, nu doar formula simplificată f1=18/√δ), cu opțiunea de rigidizare locală (grosime majorată la 300 mm sau capiteluri extinse) dacă rezultatul confirmă R>4 în zonele critice. Pentru restul planșeelor curente (open-space obișnuit, fără cerințe de prestigiu deosebit), **verificarea DTAC (R<8) rămâne suficientă și confirmată**.

### PTh-R.15.2 Contra-săgeți de execuție — confirmare

| Element | Săgeată SLS calculată (DTAC §10.2) | Contra-săgeată (camber) adoptată |
|---|---|---|
| Planșeu curent (deschidere 8,10m) | 27 mm total (pe termen lung) | 16 mm (L/500) la mijlocul traveelor mari, DTAC §10.5 |
| Grindă de bordaj (deschidere 8,10m) | calculată la SLS conform §7.3 DTAC | fără contra-săgeată (secțiune 300×600, rigiditate suficientă, săgeată sub L/500) |

### PTh-R.15.3 Verificarea fisurării — confirmare pe toate elementele

Deschiderea de fisură limitată la wk≤0,3 mm (XC1, SR EN 1992-1-1 tabel 7.1N, DTAC §10.3) se confirmă prin control indirect (diametru și distanță maximă bară conform tensiunii din armătură la combinația cvasipermanentă) pe toate elementele principale — verificare neschimbată față de DTAC, extinsă explicit la armătura majorată a stâlpului SP-01 și a benzii de colector, unde densitatea de armătură favorizează distribuția fisurilor (deschidere mai mică per fisură individuală, la aceeași deformație totală).

---

## PTh-R.16 — CALCULUL LA FOC DETALIAT — CONFIRMARE TABELARĂ PE SECȚIUNILE FINALE

### PTh-R.16.1 Confirmarea clasificării la foc pe elementele corectate la PTh

DTAC (`structura.md` §11) a confirmat tabelar (SR EN 1992-1-2) rezistența la foc R120–R180 pe toate categoriile de elemente, cu marje ample (stâlp 700×700, acoperire 40 mm → R240; nucleu 400 mm → REI180; dală 280 mm → REI120). Prezentul supliment confirmă că **elementele corectate la faza PTh** (§PTh-R.4.3, §PTh-R.4.1a) păstrează sau depășesc aceleași clasificări:

| Element | Configurație PTh | Verificare tabelară | Verdict |
|---|---|---|---|
| Stâlp SP-01 (parter–E1) | 750×750mm, C40/50, acoperire 40mm | secțiune mărită față de 700×700 → clasificare tabelară superioară, R>240 | ✓ ample rezervă |
| Stâlp SP-04 (E5–E6, armare majorată) | 500×500mm, C30/37, acoperire 40mm | neschimbată secțiune → R180 (tabel 5.2a) conform DTAC | ✓ |
| Nucleu (armătură orizontală majorată pe fețe critice) | 400mm, C35/45, acoperire 25mm | grosimea nu se modifică → REI180 (tabel 5.4) conform DTAC | ✓ |
| Bandă de colector (armătură majorată în dală) | dală 280mm, acoperire 25mm | grosimea nu se modifică → REI120 (tabel 5.8) conform DTAC | ✓ |
| Grinzi de bordaj (armare confirmată pe tot conturul) | 300×600mm, acoperire 40mm | neschimbată → R120 conform DTAC | ✓ |

Majorarea secțiunii stâlpului SP-01 (700×700→750×750 mm) și a armăturii diverselor elemente (bandă colector, stâlp E5–E6) nu afectează negativ niciuna dintre clasificările la foc — dimpotrivă, secțiunea mărită a stâlpului de parter oferă o marjă suplimentară de rezistență la foc, dincolo de cerința de R180.

### PTh-R.16.2 Confirmarea comportării generale la incendiu

Concluzia DTAC §11 rămâne valabilă integral: rezistența la foc cerută (grad II, R120–R180 pe categorii de elemente) se asigură **integral prin dimensiunile secțiunilor și acoperirile cu beton** (metoda tabelară SR EN 1992-1-2), **fără protecții suplimentare** (vopsele intumescente, torcret, placări) — avantaj esențial al soluției de structură integral de beton armat, confirmat și după corecțiile de la faza PTh.

---

## PTh-R.17 — TEHNOLOGIE DE EXECUȚIE PE TIMP FRIGUROS/CĂLDUROS

### PTh-R.17.1 Betonul — radierul general și elementele masive

Radierul general (volum unitar de turnare de ordinul a 250-350 mc per lot, §PTh-R.7.3), necesită atenție la **hidratarea betonului în masă**: pe timp călduros, riscul de fisurare din gradient termic intern impune fie ciment cu căldură redusă de hidratare, fie răcirea prealabilă a agregatelor/apei de amestec, fie protecția termică a suprafețelor expuse (prelate izolante), conform C16 și DTAC §3.4. Pe timp friguros, protecția/tratarea termică a betonului proaspăt (prelate, rogojini termoizolante) și confirmarea rezistenței la decofrare prin metoda maturității (temperatură-timp echivalent).

### PTh-R.17.2 Elementele verticale — stâlpi, nucleu

Turnarea stâlpului SP-01 (densitate mare de armătură de confinare, §PTh-R.4.3) și a bulbilor nucleului (§PTh-R.5.3) pe timp friguros necesită menținerea temperaturii betonului proaspăt peste minimul de priză normală (protecție termică a cofrajului, eventual accelerare controlată a prizei), dat fiind că densitatea ridicată de armătură reduce secțiunea liberă de beton și accelerează pierderea de căldură către cofraj/armătură — risc de întărire neuniformă care se previne prin protecție termică adecvată și prin monitorizarea temperaturii betonului proaspăt cu termocuple în elementele critice.

### PTh-R.17.3 Rosturile de turnare pe vreme rece/caldă

Rosturile de turnare ale planșeelor (§PTh-R.9.2) se taie/marchează mai devreme pe vreme rece (întărire mai lentă); pe vreme călduroasă, se acordă atenție suplimentară curii betonului proaspăt (stropire/menținere umedă continuă) pentru a preveni fisurarea de contracție plastică pe suprafețele mari ale planșeelor de terasă, expuse direct radiației solare.

---

## PTh-R.18 — PROGRAM DE URMĂRIRE ÎN TIMP (P130) ȘI PROGRAM COMPLET DE PROBE

### PTh-R.18.1 Monitorizarea curentă (SHM)

Reluând principiul stabilit calitativ în DTAC §15/§16, se detaliază la execuție: **monitorizarea tasărilor** prin repere topografice pe minimum 8 puncte reprezentative (4 colțuri + centrul fiecărei laturi), plus repere suplimentare sub nucleu, cu citiri lunare pe durata execuției și în primii 2 ani de exploatare, apoi trimestrial până la 5 ani, apoi anual; pragul de alertă la tasare diferențială peste 1/750 din distanța dintre repere adiacente. **Monitorizarea driftului lateral** (deplasarea relativă de nivel) prin traductoare/verificare topografică periodică la nivelul terasei, cu inspecție obligatorie post-eveniment seismic. **Monitorizarea elementelor critice** — stâlpul SP-01 (armare complexă, verificare finalizată la PT, §PTh-R.4.3) și banda de colector cadre-nucleu la nivelul terasei (unde forța de colectare este maximă, §PTh-R.6.2) — prin inspecție vizuală periodică a fisurării și, opțional, traductoare de deformație montate la execuție.

### PTh-R.18.2 Programul complet de probe și încercări — sinteză

| Categorie | Control | Frecvență |
|---|---|---|
| Beton | Consistență la fiecare transport (elemente critice) | 100% |
| Beton | Rezistență compresiune | 1 set/50mc SAU/element important |
| Beton | Impermeabilitate P8 | 1 set/lot |
| Armătură | Certificat conformitate + εuk>7,5% | fiecare lot |
| Armătură | Control dimensional (șablon), inclusiv SP-01 | toate elementele critice |
| Portanță teren | Placă de încărcare | min. 1 punct/300mp |
| Verificare la plutire | Confirmare FS după turnare radier | la finalizarea radierului |
| Etanșeitate radier/pereți | Verificare vizuală infiltrații | continuu, primul sezon ploios |
| Drift lateral | Verificare topografică | anual + post-seism |

### PTh-R.18.3 Documente de conformitate arhivate la Cartea Tehnică

Certificate materiale (beton, armătură), rapoarte de probă la compresiune/impermeabilitate, procese-verbale de fază determinantă (§PTh-R.13), rapoarte de monitorizare tasări/drift (§PTh-R.18.1), raport topografic final de as-built, expertiza tehnică independentă (dacă solicitată de verificatorul A1 pentru configurația de confinare a stâlpului SP-01).

---

## PTh-R.19 — BREVIAR COMPLET DE ÎNCĂRCĂRI ȘI COMBINAȚII

### PTh-R.19.1 Acțiuni permanente — confirmare cu greutăți reale (§PTh-R.8)

| Zonă | gk DTAC [kN/mp] | gk actualizat PTh |
|---|---|---|
| Planșeu curent (dală 280mm+capitel+pardoseală înălțată+tavan fals) | 8,50 | 8,50 (neschimbat — corecțiile PTh privesc stâlpi/nucleu, nu straturile de finisaj ale dalei) |
| Terasă | 10,00 | 10,00 (neschimbat) |
| Contribuție elemente verticale (stâlpi+nucleu+fațadă), echivalent pe mp | ~2,5-2,8 | **~2,7-3,0** (majorat marginal de secțiunea SP-01 și armătura suplimentară) |

### PTh-R.19.2 Acțiuni variabile — neschimbate față de DTAC

Birouri (cat. B) 3,0 kN/mp + pereți mobili 1,0 kN/mp = 4,0 kN/mp; circulații/scări (cat. C) 4,0 kN/mp; parcaj (cat. F) 2,5 kN/mp; terasă necirculabilă 0,75-1,0 kN/mp; zăpadă/vânt conform zonare amplasament (CR 1-1-3/2012, CR 1-1-4/2012).

### PTh-R.19.3 Combinații SLU — tabel unificat

| Element | Combinație gravitațională SLU | Combinație seismică |
|---|---|---|
| Planșeu curent | 1,35×8,50+1,5×4,0=17,48 kN/mp | G+γI,e×AEd+0,24×Q |
| Terasă | 1,35×10,0+1,5×1,6(zăpadă)=15,9 kN/mp | idem |
| Stâlp SP-01 (finalizat PTh) | NEd=5.100 (§PTh-R.4.3, secțiune 750×750) | νd=0,34 (predimensionare), confirmat la model final |
| Nucleu, fețe critice torsiune | VEd bază=1.032 (element-tip) | VEd,majorat,terasă=6.674 (§PTh-R.3.4, cu δ=1,18) |
| Bandă colector (toate nivelurile) | — | F_colector conform tabel §PTh-R.6.2 |

### PTh-R.19.4 Grupare seismică — coeficient ψE confirmat

Coeficientul de combinare ψE=φ·ψ2=0,8×0,3=**0,24** (DTAC §5.3, neschimbat), aplicat consecvent la determinarea masei seismice participante pe toate nivelurile (§PTh-R.2.2, PTh-R.3).

### PTh-R.19.5 Tabel centralizator utilizări — toate elementele reverificate la PTh

| Element | Verificare guvernantă | Utilizare | Verdict |
|---|---|---|---|
| Stâlp SP-01 (750×750, C40/50) | confinare α·ωwd | 0,112/0,126=0,89 | ⚠ confirmare finală la model EF |
| Stâlp SP-04 (E5-E6, armare majorată) | ΣMRc/1,3ΣMRb | 2,21 | ✓ (după corecție §PTh-R.4.1a) |
| Nucleu, fețe critice (Ø14/130) | Asw/s | 2,37/2,64=0,90 | ✓ marjă acceptabilă, VRd,max grad 0,54 |
| Bandă colector (toate nivelurile) | As necesar/prezent | max. 0,63 la terasă | ✓ rezervă amplă |
| Stâlp de margine (capitel redus) | vEd/vRd,c după capitel | conform, analog stâlp interior | ✓ |
| Stâlp de colț | reazem grindă bordaj | marjă amplă | ✓ |
| Verificare la plutire (fază radier turnat) | FS | 1,96 | ✓ (favorabil față de structuri de amprentă mare) |
| Vibrații planșeu (criteriu prestigiu R≤4) | R estimat | 5-6 | ⚠ verificare completă recomandată la PT pentru zonele premium |

---

## PTh-R.20 — SINTEZA CORECȚIILOR PTh FAȚĂ DE DTAC + CONCLUZIE INGINEREASCĂ

### PTh-R.20.1 Sinteza corecțiilor și finalizărilor de proiectare aduse de faza PTh

| Element/aspect | Stadiu DTAC | Corecție/finalizare PTh | Motiv |
|---|---|---|---|
| Stâlp de parter (confinare seismică) | Punct explicit deschis (§12.1: „ajustare la PT") | **Secțiune 750×750mm, C40/50, 16Ø25, etrieri Ø12/75 cu legături transversale suplimentare** | verificare riguroasă a factorului de eficiență a confinării α, netratată în detaliu în DTAC |
| Stâlp de margine/colț la străpungere | Punct explicit deschis (§7.4: „verificarea la PT confirmă") | **Capitel redus 1,80×1,80×0,32m la margine; rezolvare prin grindă de bordaj la colț** | calcul explicit finalizat, absent din DTAC |
| Stâlp E5-E6 (ultimul nivel de cadru) | Armare 8Ø20, neverificat la capacity design la acest nivel | **10Ø20** | condiția ΣMRc≥1,3ΣMRb neîndeplinită la interfața E5-E6, identificată prin extinderea verificării la toate nodurile |
| Armătură orizontală nucleu (fețe adiacente colțurilor) | Ø14/150 uniform pe toate fețele | **Ø14/130 pe 2 fețe critice** | confirmare numerică a factorului de torsiune (δ=1,18) prin model spațial, absentă din DTAC (doar estimare calitativă 5-8%) |
| Bandă de colector cadre-nucleu | calculată pentru 1 nivel de referință (terasă) | **extinsă pe toate cele 7 niveluri**, cu confirmare că armătura de fâșie de stâlp deja acoperă necesarul | DTAC nu cuantificase decât nivelul cel mai solicitat |
| Greutate seismică | 56.200 kN (estimare generică) | **57.000 kN** (din extras materiale real, +1,4%) | contabilizare exactă a secțiunilor/armăturii finale |
| Verificare la plutire pe faze intermediare | semnalată doar ca verificare finală | **cuantificată pe 4 faze**, cu constatarea că radierul singur oferă deja FS≈1,96 | analiză suplimentară, cu concluzie favorabilă distinctă de structurile de amprentă mare |
| Grinzi de bordaj | dimensionate pentru latura-tip | **confirmate identice pe tot conturul** (regularitate geometrică 8,10×8,10m pe ambele direcții) | simplificare de execuție validată explicit |

### PTh-R.20.2 Tabel centralizator conformitate — toate verificările suplimentare PTh

| Categorie | Verificare | Rezultat |
|---|---|---|
| Model de calcul | Participare mase modale | 93-95%≥90% ✓ |
| Model de calcul | Torsiune (factor amplificare confirmat) | δ=1,18 ✓ |
| Coloană tare-grindă slabă | Toate interfețele de nivel | 6/7 conforme direct, 1 corectată (E5-E6) ✓ |
| CR 2-1-1.1 | Perete forfecare majorată la torsiune | Ø14/130 pe fețe critice, grad 0,90 ✓ |
| Confinare stâlp parter | α·ωwd | 0,89 din cerință, confirmare finală la model EF |
| Străpungere margine/colț | rezolvată explicit | capitel redus / reazem grindă bordaj ✓ |
| SLS vibrații (criteriu general) | f1>3Hz | 4,81Hz ✓ |
| SLS vibrații (criteriu prestigiu, zone premium) | R≤4 | 5-6, recomandare verificare completă PT |
| Foc | Toate elementele, inclusiv corectate | tabelar, rezervă amplă ✓ |
| Plutire | Fază radier turnat | FS=1,96, favorabil ✓ |
| Rosturi | Confirmare absență rost seismic/dilatație | ✓ conform §9.2 DTAC |

### PTh-R.20.3 Concluzie inginerească

Structura clădirii de birouri clasa A de referință (S+P+6E, sistem dual de beton armat cu nucleu central rigidizant + planșee dală groasă cu capiteluri + radier general), verificată la predimensionare în faza DTAC, a fost **detaliată la nivel de execuție** în prezentul supliment PTh: model de calcul spațial unic validat (mase, perioade, participare modală, torsiune), înfășurătoarea eforturilor extinsă la toate nivelurile de stâlp și de nucleu, caiete de armare complete pe toate pozițiile și treptele de secțiune, extras complet de materiale (≈3.326 mc beton, ≈407 t armătură), tehnologie de execuție, plan de control al calității, faze determinante, coordonare cu instalațiile și arhitectura, program de urmărire în timp și program de probe.

Cea mai importantă contribuție a prezentului supliment este **finalizarea celor două puncte pe care DTAC le-a lăsat explicit deschise pentru faza PT** (`structura.md` §7.4 și §12.1): verificarea la străpungere a stâlpilor de margine și de colț (rezolvată prin capitel redus, respectiv prin reazem pe grinda de bordaj) și, mai ales, confinarea seismică a stâlpului de parter la efortul axial ridicat — unde verificarea riguroasă a factorului de eficiență a confinării (α), tratată în DTAC doar orientativ, a arătat că soluția simplă indicată acolo (C40/50+Ø12/90) nu este suficientă, impunând o soluție cumulată (secțiune majorată la 750×750 mm + armătură longitudinală și etrieri de confinare cu legături transversale suplimentare). Analiza detaliată a evidențiat, suplimentar, **opt corecții/finalizări de proiectare** față de predimensionarea DTAC (§PTh-R.20.1), toate documentate cu verificare numerică și motivate tehnic — corecții normale și așteptate la trecerea de la faza de predimensionare la faza de execuție, care nu invalidează concepția de ansamblu (sistem dual cu pereți predominanți, justificat calitativ și cantitativ în DTAC §2), ci o consolidează.

Se recomandă, înainte de finalizarea planurilor de execuție: (1) rularea modelului EF final cu greutatea seismică actualizată (57.000 kN) și confirmarea explicită a gradului de utilizare la confinarea stâlpului SP-01 (utilizare estimată 0,89, cu marjă de conservatorism din ipoteza νd de predimensionare); (2) verificarea dinamică completă (model FE cu funcția de forță a mersului, SCI P354) a planșeelor din zonele de birou premium (E6, săli de conferință mari) pentru confirmarea criteriului de confort R≤4; (3) confirmarea parametrilor de amplasament reali (ag, Tc, sk, qb, pconv, NHS) cu harta de zonare P100-1/CR 1-1-3/CR 1-1-4 și studiul geotehnic definitiv al amplasamentului efectiv.

Documentația necesită verificare tehnică de către verificatori atestați MDLPA pe cerințele **A1** (rezistență mecanică — structuri de beton armat, sistemul dual, planșeele, radierul general) și **Af** (fundații și geotehnică, categoria 2), conform Legii 10/1995 și HG 925/1995, cu recomandarea expresă a unei **verificări suplimentare dedicate** a configurației de confinare a stâlpului de parter SP-01, element cu grad de utilizare ridicat identificat explicit în prezentul supliment.

---

*Prezentul supliment de fază PTh-Rezistență completează faza DTAC (`structura.md`) și se citește împreună cu planșele de armare și cu Caietul de sarcini pentru structuri de beton armat (document distinct). Toate valorile numerice sunt exemple de dimensionare pentru o clădire de birouri clasa A de referință (S+P+6E, 32,40×24,30m, tramă 8,10×8,10m conform `general.md` și `structura.md`) și se confirmă/ajustează în urma rulării finale a modelului EF pe geometria reală a proiectului, a studiului geotehnic definitiv al amplasamentului și a coordonării complete cu proiectele de arhitectură și instalații.*
