## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență (`structura.md`), elaborat conform **HG nr. 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice. El aprofundează faza DTAC deja redactată — concepția structurală (structură metalică, cadre transversale portal cu inimă plină și vute, deschidere 20,00 m, contravântuiri centrice CBF longitudinale, mezanin parțial compozit oțel-beton, placă de pardoseală pe pat elastic, fundații izolate cu grinzi de echilibrare), materialele, acțiunile, spectrul de proiectare P100-1/2013, calculul seismic global și verificarea de predimensionare a elementelor-tip — aducând întregul ansamblu la nivelul de detaliere necesar **EXECUȚIEI ÎN ȘANTIER ȘI ÎN ATELIER**: breviarul de calcul complet pe toate cele 12 cadre transversale și pe elementele particulare (cadrul de fronton cu vitrina comercială principală, stâlpii de capăt CBF, panele diferențiate pe zone de succiune), extrasul de materiale (profile laminate, șuruburi, sudură, protecție anticorozivă și la foc, beton, armătură), detaliile de îmbinare prin metoda componentelor (SR EN 1993-1-8), caietul de armare al elementelor de beton (placă pardoseală, fundații, mezanin compozit), tehnologia de execuție (atelier + montaj + lucrări de beton), planul de control al calității, fazele determinante, coordonarea cu arhitectura (vitrinele mari) și cu instalațiile, verificările suplimentare la SLS, calculul la foc detaliat și programul de urmărire în timp și de probe.

Geometria de referință este preluată **identic** din DTAC: arie construită **Ac = 2.100 mp** (sală de vânzare 1.480 mp, depozit marfă 380 mp, mezanin parțial 240 mp), regim **P + 1 parțial**, deschidere cadru transversal **20,00 m**, interax travee longitudinală **6,00 m**, **12 travee**, lungime totală hală **72,00 m**, înălțime liberă sală de vânzare **5,50 m**, cotă streașină **+6,50 m**, cotă coamă **+7,20 m**, cotă planșeu mezanin **+3,50 m**. **Decizie de proiectare PTh** (tranșând opțiunea lăsată deschisă la DTAC §2.1): se adoptă, pentru execuție, varianta cu **travee unică de 20,00 m** (fără stâlp median), soluție coerentă cu breviarul de predimensionare deja dezvoltat la DTAC cap. 7 (stâlp HEB 400, riglă sudată cu vute h = 900 mm) — varianta cu stâlp median rămâne, la acest amplasament, nejustificată economic, dat fiind că deschiderea unică de 20 m nu împinge secțiunile dincolo de un grad de utilizare confortabil (cap. PTh-R.2 de mai jos), iar stâlpul median ar fi, în plus, incompatibil cu vizibilitatea integrală a sălii de vânzare cerută de arhitectură.

Documentul **NU repetă** breviarul de predimensionare din DTAC (`structura.md`, cap. 1-12) și **NU se suprapune** cu memoriul general (`general.md`), cu memoriul de arhitectură, cu scenariul de securitate la incendiu (SSI) sau cu memoriul de instalații ale aceleiași documentații. Structura capitolelor prezentului supliment:

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Breviar de calcul complet (toate cele 12 cadre + cadrul cu vitrina principală) |
| PTh-R.3 | Extras de materiale (bill of quantities pe reper) — oțel + beton |
| PTh-R.4 | Detalii de îmbinare (metoda componentelor SR EN 1993-1-8) + interfața cu vitrina |
| PTh-R.5 | Caiet de armare — placă pardoseală, fundații, mezanin compozit |
| PTh-R.6 | Tehnologia de execuție a structurii metalice |
| PTh-R.7 | Tehnologia de execuție a elementelor de beton |
| PTh-R.8 | Planul de control al calității |
| PTh-R.9 | Faze determinante |
| PTh-R.10 | Coordonarea cu arhitectura (vitrine) și cu instalațiile |
| PTh-R.11 | Verificări suplimentare la SLS |
| PTh-R.12 | Calculul la foc detaliat |
| PTh-R.13 | Program de urmărire în timp (P130) și program complet de probe |
| PTh-R.14 | Breviar complet de încărcări și combinații — toate cadrele |
| PTh-R.15 | Sinteza corecțiilor PTh față de DTAC + concluzie inginerească |

### Date generale de proiectare (recapitulare parametri de bază, preluați identic din DTAC)

| Parametru | Valoare | Sursă |
|---|---|---|
| Categoria de importanță | C (normală) | HG 766/1997, anexa 3 |
| Clasa de importanță/expunere seismică | III, γI,e = 1,00 | P100-1/2013 tabel 4.2 |
| ag / TC / β0 | 0,30 g / 0,70 s / 2,50 | P100-1/2013, DTAC §1.4 |
| sk / qb / categoria de teren | 2,50 kN/mp / 0,60 kN/mp / III | CR 1-1-3/2012, CR 1-1-4/2012 |
| Clasa de ductilitate / q adoptat | DCM / q = 3,0 | P100-1 tabel 6.3, DTAC §3.4 |
| Categoria geotehnică | 2 | NP 074/2014 |
| Grad de rezistență la foc | II | P118, SSI dedicat |
| Oțel structural principal / secundar | S355 JR/J0 / S235 JR | SR EN 10025-2 |
| Beton fundații/grinzi de soclu | C25/30 XC2 | SR EN 1992-1-1 |
| Beton placă pardoseală/mezanin | C30/37 XC1 | SR EN 1992-1-1 |
| Armătură | BST500C | ST 009 |
| γM0 / γM1 / γM2 | 1,00 / 1,00 / 1,25 | SR EN 1993-1-1 |
| Șuruburi îmbinări structurale | 8.8 / 10.9 | SR EN 14399 |
| Clasa de execuție oțel | EXC2 (EXC3 la diagonale CBF + îmbinări critice) | SR EN 1090-2 |
| Categoria de corozivitate | C3 (sală vânzare) / C4 (depozit-frigorifice) | SR EN ISO 12944 |
| Rezistență la foc cerută | R60 stâlpi, R30-60 rigle, REI60 planșeu mezanin, R30 contravântuiri | P118, SSI |

Cadrul normativ complet este cel enunțat în DTAC (§1.4 din `structura.md`): Legea 10/1995, HG 766/1997, HG 907/2016, CR 0/2012, SR EN 1990/1991/1992/1993/1994/1998, CR 1-1-3, CR 1-1-4, NP 112/2014, NP 074/2014, P118, SR EN 1090-2. Prezentul document citează suplimentar explicit **SR EN 1993-1-8** (îmbinări metalice, metoda componentelor), **SR EN 1993-1-2** (comportare la foc a structurilor de oțel), **SR EN 1994-1-1** (structuri compozite oțel-beton, mezaninul), **SR EN ISO 5817** (calitatea sudurilor), **SR EN ISO 9606-1** și **SR EN ISO 15614-1** (calificarea sudorilor și a procedeelor — WPQR), **SR EN 13670** (execuția structurilor de beton), **NE 012/1-2022** (calitatea betonului), **P130/1999** (urmărirea comportării construcțiilor) și **SR EN 13830** (fațade vitrate ușoare, componenta de coordonare la interfața structură-tâmplărie, cap. PTh-R.10.1).

---

## PTh-R.2 — BREVIAR DE CALCUL COMPLET (TOATE CELE 12 CADRE + CADRUL CU VITRINA PRINCIPALĂ)

### PTh-R.2.1 Convenții și metodologie

DTAC (§2.3, §6, §7) a calculat integral, prin metoda forțelor laterale echivalente, **un singur cadru-tip** (interior, curent, fără mezanin), declarat explicit „calcul preliminar de ordin de mărime". Prezentul breviar extinde acest calcul, prin **analiză modală cu spectre de răspuns pe model spațial 3D** (conform DTAC §2.3, obligatorie dat fiind caracterul neregulat al structurii — mezanin parțial), la toate cele **12 cadre transversale** ale halei și la particularitățile lor: cadrele curente (fără mezanin, majoritate — 8 din 12), cadrele care mărginesc mezaninul (2 cadre, la interfața dintre zona cu și fără planșeu compozit, unde apare concentrarea de eforturi semnalată la DTAC §2.3), cadrele de capăt/fronton (2 cadre, la axele 1 și 13, care preiau, în plus, reacțiunile contravântuirilor CBF longitudinale) și, în particular, **cadrul de fronton al vitrinei comerciale principale** (axa 1, fațada de acces public), unde golul structural mare al vitrinei impune o reconfigurare locală a elementelor de perete (cap. PTh-R.2.9). Modelul spațial include explicit masa și rigiditatea mezaninului la poziția lui reală în plan (cap. DTAC §2.3), cu un număr de moduri care mobilizează **92%** din masa modală activă pe direcția transversală și **94%** pe direcția longitudinală, satisfăcând cu marjă pragul de 90% impus de P100-1 §4.5.3.5.4.

Rigiditatea elementelor este modelată cu secțiune brută (nefisurată), practica uzuală pentru structuri metalice; conlucrarea compozită a mezaninului (cap. DTAC §7.5) este introdusă explicit prin secțiune transformată oțel-beton pe zona respectivă a modelului, cu rigiditatea la forfecare a plăcii compozite verificată suficientă pentru a funcționa ca diafragmă (analog verificării de la structurile cu planșeu mixt). Contravântuirile de acoperiș (diafragmă orizontală, DTAC §2.2) sunt modelate ca element de shell echivalent, care distribuie forțele orizontale de la fiecare cadru transversal către axele de contravântuire verticală longitudinală.

### PTh-R.2.2 Înfășurătoarea eforturilor pe toate cele 12 cadre transversale

| Cadru | Poziție | NEd stâlp [kN] | MEd stâlp [kNm] | VEd stâlp [kN] | Observație |
|---|---|---|---|---|---|
| Curent (8 din 12) | interior | 620 | 385 | 92 | valoarea din DTAC §7.1, reconfirmată |
| Cadru marginal mezanin (2) | la interfața cu mezaninul | 705 | 430 | 104 | + reacțiune locală planșeu compozit |
| Cadru de capăt/fronton (2) | axele 1 și 13 | 540 | 310 | 210 | NEd redus (arie tributară la jumătate), VEd majorat (ancorare CBF) |
| Cadru fronton cu vitrină (axa 1) | stâlpi de margine vitrină | 560 | 345 | 225 | reconfigurare locală, cap. PTh-R.2.9 |

Cadrele marginale ale mezaninului (2 poziții) primesc un moment încovoietor de calcul cu **12% mai mare** decât cadrul curent (430 kNm față de 385 kNm), consecință directă a concentrării locale de rigiditate și de masă introdusă de mezanin (neregularitatea în plan discutată la DTAC §2.3) — verificarea la interacțiune N-M a acestor stâlpi (secțiune identică HEB 400, S355): `N_Ed/Nb,Rd + M_Ed/Mc,Rd = 705/3.862 + 430/1.147 = 0,183 + 0,375 = **0,56 < 1,0** ✅`, grad de utilizare superior cadrului curent (0,48), dar cu rezervă suficientă fără a impune o secțiune majorată. Cadrele de capăt/fronton primesc o forță tăietoare de calcul semnificativ mai mare (210 kN față de 92 kN la cadrul curent) — consecință a rolului lor de a colecta și de a transmite către fundație reacțiunea orizontală a contravântuirilor CBF longitudinale (cap. PTh-R.2.7) — verificare tratată separat, ca element cu funcție structurală dublă (cadru necontravântuit + reazem al sistemului CBF).

### PTh-R.2.3 Cadrul curent (referință DTAC) — recapitulare succintă

Stâlp HEB 400 S355, riglă sudată cu vute h = 900 mm, verificate integral la DTAC §7.1-7.2 (Nb,Rd = 3.862 kN, Mc,Rd = 1.147 kNm, interacțiune N-M = 0,48; riglă Mc,Rd câmp = 1.413 kNm, vută = 2.166 kNm, forfecare Vpl,Rd = 1.762 kN, săgeată 65 mm < L/250 = 80 mm). Prezentul supliment reconfirmă aceste valori ca fiind cele care guvernează dimensionarea a **8 din cele 12 cadre** (67% din structură), fără modificare față de DTAC — decizie de proiectare care păstrează, la faza PTh, uniformitatea de marcă și de secțiune pe majoritatea structurii, exact soluția care minimizează numărul de repere diferite de atelier (cap. PTh-R.3.1) și, prin urmare, costul și riscul de eroare de montaj.

### PTh-R.2.4 Cadrul marginal al mezaninului — extindere completă

Stâlpul cadrului marginal (poziția care primește reacțiunea locală a planșeului compozit al mezaninului, DTAC §7.5): secțiune păstrată **HEB 400 S355** (aceeași marcă, fără majorare de secțiune), verificată la solicitările majorate din §PTh-R.2.2: `N_Ed/Nb,Rd + M_Ed/Mc,Rd = 0,56 < 1,0` ✅. Rigla acestui cadru, pe deschiderea dinspre mezanin, primește o reacțiune verticală suplimentară de la grinzile IPE 270 ale planșeului compozit (reacțiune de capăt `R = 42 kN` pe grindă, la interax 2,5 m, cap. DTAC §7.5), introdusă local prin **consolă scurtă sudată** pe talpa inferioară a stâlpului, la cota +3,50 m — detaliu care evită perforarea/decuparea inimii stâlpului principal și transferă reacțiunea direct prin contact, verificat la forfecare locală a sudurii de prindere a consolei: `V_Ed,consolă = 42 kN`, cordon de sudură de colț `a = 8 mm`, lungime utilă `l = 350 mm`, capacitate `F_w,Rd = 0,9·a·l·fu/(√3·βw·γM2) ≈ 205 kN ≫ 42 kN` ✅.

### PTh-R.2.5 Stâlpi de fronton — verificare completă

Stâlpii cadrelor de capăt (axele 1 și 13) primesc, spre deosebire de stâlpii curenți, o forță axială redusă (arie tributară de acoperiș la jumătate, `6,00/2 = 3,00 m` din fiecare parte) dar o forță tăietoare majorată, dat fiind rolul lor de reazem al contravântuirilor CBF longitudinale (cap. PTh-R.2.7): `N_Ed = 540 kN`, `M_Ed = 310 kNm`, `V_Ed = 210 kN`. Secțiune adoptată: **HEB 360 S355** (redusă față de HEB 400 al cadrelor curente, justificată de efortul axial și de momentul mai mici) — verificare: `Nb,Rd ≈ 3.180 kN` (`A = 18.060 mm²`, χz = 0,52) → `540/3.180 = 0,170`; `Mc,Rd = Wpl·fy = 2.683·10³·355 = 953 kNm` → `310/953 = 0,325`; interacțiune `0,170 + 0,325 = **0,495 < 1,0** ✅`. Verificarea la forfecare, guvernată aici de rolul de reazem CBF (nu de încovoierea din cadru): `Vpl,Rd = Av·fy/√3 = (A_talpă+inimă echivalent)·fy/√3 ≈ 1.520 kN` → `210/1.520 = **0,138 < 1,0** ✅`.

### PTh-R.2.6 Cadrul de fronton al vitrinei principale — stâlpi de margine

La axa 1 (fațada de acces public, unde arhitectura amplasează vitrina comercială principală, cap. PTh-R.2.9), cei doi stâlpi de fronton nu mai preiau doar reacțiunea cadrului transversal, ci și reacțiunea locală a linteului vitrinei (cap. PTh-R.2.9): `N_Ed = 560 kN`, `M_Ed = 345 kNm`, `V_Ed = 225 kN` (§PTh-R.2.2). Secțiune adoptată: **HEB 360 S355**, identică stâlpilor de fronton curenți (§PTh-R.2.5), cu o verificare suplimentară a interacțiunii, care include explicit reacțiunea locală a linteului aplicată excentric (brațul dintre axa stâlpului și punctul de rezemare al linteului, `e = 0,15 m`, generat de detaliul de prindere laterală, cap. PTh-R.4.7): `M_Ed,total = 345 + R_linteu·e = 345 + 62·0,15 ≈ 354 kNm` → `Nb,Rd: 560/3.180 = 0,176`; `Mc,Rd: 354/953 = 0,371`; interacțiune `**0,547 < 1,0** ✅`, cu o rezervă mai redusă decât la stâlpul curent de fronton (0,495), dar satisfăcută confortabil, fără a impune o secțiune diferită de restul cadrului de capăt — soluție care păstrează unitatea de marcă a cadrului 1.

### PTh-R.2.7 Calculul de capacitate al contravântuirilor CBF — verificare completă

Contravântuirea SHS 150×150×8, S235, verificată la DTAC §7.3 (`Npl,Rd = 1.053 kN`, `N_Ed = 340 kN`, utilizare 0,32; zveltețe `λ̄ = 1,6`, în intervalul normativ 1,3-2,0). Prezentul supliment adaugă verificarea de **proiectare capacitivă** a stâlpilor de fronton (cap. PTh-R.2.5-2.6), care trebuie să rămână elastici chiar dacă diagonala întinsă atinge suprarezistența ei reală (principiul de la DTAC §7.4): `N_pl,Rd,diagonală·1,1·γov`, cu `γov = 1,25` (factorul de suprarezistență de material pentru S235, conform P100-1 tabel 6.2): `1.053·1,1·1,25 = **1.448 kN**` — forța de calcul pentru care stâlpul/fundația de reazem al diagonalei trebuie verificați, sensibil superioară forței nominale de proiectare seismică (`N_Ed = 340 kN`) — verificare care confirmă necesitatea explicită a suprarezistenței la stâlpii de capăt, deja acoperită de secțiunea HEB 360 adoptată (`Nb,Rd = 3.180 kN ≫ 1.448 kN` ✅, cu rezervă amplă, dat fiind că forța axială suplimentară din suprarezistența diagonalei se combină, nu se însumează direct, cu efortul gravitațional existent — verificare de detaliu reluată integral la modelul final).

### PTh-R.2.8 Pane Z/C pe zone de acoperiș diferențiate (succiune variabilă cpe)

DTAC (§5.4) a calculat coeficienți aerodinamici diferențiați pe zone ale acoperișului (zona D — perete, presiune pozitivă; zona F — colț, succiune maximă `cpe ≈ -1,8...-2,4`). Panele de acoperiș, elementul care transmite direct această succiune diferențiată către rigle, se dimensionează, prin urmare, **pe trei zone distincte**, nu uniform pe toată aria:

| Zonă | Lățime tributară de la margine | cpe adoptat | Secțiune pană Z | Interax fixare pe pană |
|---|---|---|---|---|
| Curentă (interior acoperiș) | > 4,0 m de la orice margine | −0,7 | **Z200×2,5 mm, S235** | 1 șurub/0,60 m |
| Margine (fâșie perimetrală) | 0-4,0 m de la streașină/fronton | −1,4 | **Z200×3,0 mm, S235** | 1 șurub/0,40 m |
| Colț (zona F, cea mai severă) | 0-4,0 m de la colțurile acoperișului, pe ambele direcții | −2,4 (DTAC §5.4) | **Z250×3,0 mm, S235** | 1 șurub/0,25 m |

Diferențierea grosimii panei (2,5 → 3,0 mm) și, mai important, a densității de fixare pe pană (interax 0,60 m → 0,40 m → 0,25 m) reflectă direct concluzia DTAC §5.4 despre fenomenul de smulgere: la zona de colț, succiunea netă de calcul (`p_uplift = +3,75 kN/mp`, DTAC §5.4) impune o densitate de fixare aproape triplă față de zona curentă, exact acolo unde riscul de dezvelire a panourilor sandwich este maxim. Verificarea panei Z250×3,0 la zona de colț: încărcare de calcul `q_Ed = p_uplift·1,80 (interax pane) = 3,75·1,80 = 6,75 kN/m`, moment pe deschiderea de 6,00 m (interax cadre) cu 2 rezemări intermediare de tirant (sisteme anti-smulgere, uzuale la pane Z pe deschideri de 6 m): `M_Ed ≈ q·l²/12 ≈ 6,75·6,0²/12 = 20,3 kNm`, `Mc,Rd(Z250×3,0) ≈ 24,8 kNm` → utilizare `20,3/24,8 = **0,82 < 1,0** ✅`, cu o rezervă mai redusă decât panele curente (justificat de severitatea locală a solicitării), dar satisfăcută.

### PTh-R.2.9 Cadrul de fronton al vitrinei comerciale principale — geometrie și linteu

**Amplasare și geometrie.** Arhitectura amplasează, la axa 1 (fațada de acces public către sala de vânzare), o **vitrină comercială principală** de lățime **18,00 m** și înălțime **4,20 m** (de la cota ±0,00 la cota +4,20 m), integrată în panoul de fronton al cadrului de capăt (deschidere totală a cadrului 20,00 m — vitrina ocupă 18,00 m, cu o fâșie de 1,00 m pe fiecare latură, la interfața cu stâlpii de fronton, cap. PTh-R.2.6). Deasupra vitrinei, între cota +4,20 m și cota streașinii/coamei (+6,50/+7,20 m, funcție de poziția pe fronton), panoul de închidere rămâne din tablă sandwich obișnuită (DTAC §2.2), susținută de o **grindă orizontală — linteul vitrinei** — care marchează limita superioară a golului structural și transferă, către stâlpii de margine, atât greutatea proprie a panoului superior, cât și acțiunea vântului pe această zonă a frontonului.

**Sistemul structural al vitrinei.** Pentru a evita o deschidere nerezemată de 18,00 m pentru linteu (care ar conduce la o secțiune excesiv de mare și antieconomică), se introduc **2 stâlpi intermediari de vitrină** (mulioni structurali), poziționați la interax **6,00 m** (identic cu interaxul travee al halei — soluție de coordonare geometrică deliberată, care simplifică execuția și evită o grilă suplimentară de axe), împărțind deschiderea de 18,00 m în **3 travei egale de 6,00 m**. Stâlpii de vitrină sunt secțiuni **RHS 200×200×8 mm, S235**, articulați la ambele capete (bază și linteu) — element structural secundar, **fără rol în sistemul seismic principal** al halei (analog stâlpilor perimetrali „gravitaționali" de la structurile mixte, DTAC nu îi menționează explicit pentru că sunt o dezvoltare de detaliu specifică fazei PTh), dimensionați exclusiv pentru: (a) greutatea proprie a tâmplăriei/geamului suspendat de ei (dacă arhitectura o cere) și (b) acțiunea vântului perpendiculară pe fronton, transmisă de linteu și de traversele orizontale ale tâmplăriei.

**Fundația proprie a stâlpilor de vitrină.** Fiecare stâlp de vitrină are o fundație izolată proprie, de dimensiuni reduse față de fundațiile cadrelor principale (`1,00×1,00×0,50 m`, C25/30), dat fiind că nu primește nicio reacțiune din cadrul portal principal — verificare la presiune pe teren: `N_Ed ≈ 45 kN` (greutate proprie tâmplărie + stâlp) → `p = 45/1,0 = 45 kPa ≪ 180 kPa` ✅, cu rezervă foarte amplă, coerentă cu rolul pur gravitațional/de rezistență la vânt al acestor elemente.

**Linteul — verificare la încovoiere orizontală din vânt.** Linteul, secțiune **HEA 300, S355**, rezemat pe cei 2 stâlpi de fronton (cap. PTh-R.2.6) și pe cei 2 stâlpi intermediari de vitrină, funcționează, sub acțiunea orizontală a vântului pe zona de fronton de deasupra golului, ca o grindă continuă pe 3 deschideri egale de 6,00 m. Presiunea de calcul (zona D, perete expus direct — DTAC §5.4, `we,D = +1,01 kN/mp`), aplicată pe înălțimea tributară dintre cota linteului și cota streașinii/coamei (`h_tributar ≈ 2,30 m`, luată la jumătate, dat fiind că panoul superior se reazemă atât pe linteu cât și pe cadrul de acoperiș, `h_trib/2 = 1,15 m`): `q_Ed = 1,01·1,15 = 1,16 kN/m`. Moment maxim pe grinda continuă (travee marginale, cazul dimensionant): `M_Ed ≈ 0,10·q·l² = 0,10·1,16·6,0² = **4,18 kNm**` — valoare mult sub capacitatea secțiunii HEA 300 (`Mc,Rd = Wpl·fy = 1.383·10³·355 = 491 kNm` → utilizare `4,18/491 ≈ 0,01`), rezultat care confirmă că **linteul este dimensionat, în realitate, nu de încovoierea orizontală din vânt** (foarte redusă la o hală parter, cf. DTAC §5.4, unde succiunea severă e pe acoperiș, nu pe perete), **ci de criteriul de rigiditate/săgeată** impus de coordonarea cu tâmplăria vitrată (paragraful următor) — motiv pentru care secțiunea HEA 300 este semnificativ „supradimensionată" față de necesarul strict de rezistență, decizie deliberată de proiectare, nu eroare de calcul.

**Verificarea la săgeată — criteriul de compatibilitate cu tâmplăria.** Practica de proiectare a fațadelor vitrate ușoare (coordonată cu producătorul de tâmplărie/geam termopan, cf. principiilor generale ale **SR EN 13830** — standardul european al fațadelor cortină, aplicabil ca reper de compatibilitate deformație-tâmplărie, nu ca normativ de calcul structural propriu-zis) limitează săgeata elementelor de rezemare a vitrajului la valori mult mai severe decât criteriul structural obișnuit (`L/250`, DTAC §7.2), tocmai pentru a evita fisurarea sigiliilor de etanșare și, în cazuri extreme, a geamului termopan însuși — se adoptă, pentru linteul vitrinei, limita **L/300** (`6.000/300 = 20 mm` pe deschiderea de 6,00 m) sub încărcarea de vânt: săgeata calculată a grinzii continue HEA 300 sub `q_Ed = 1,16 kN/m` este de **3,2 mm**, mult sub limita adoptată — verificare **✅**, cu o rezervă foarte amplă, care confirmă că secțiunea HEA 300, aleasă din considerente constructive (compatibilitate cu grosimea profilului de tâmplărie și cu detaliul de prindere, cap. PTh-R.4.7), oferă implicit o rigiditate net superioară minimului necesar.

**Rostul de compatibilitate structură-tâmplărie.** La interfața dintre structura metalică portantă (linteu, stâlpi de vitrină, cadru principal) și rama de tâmplărie a vitrinei, se prevede un **detaliu de prindere glisantă pe direcție verticală** (cap. PTh-R.4.7) — necesar pentru a decupla deformația structurii principale sub încărcare (săgeata riglei cadrului de capăt, guvernată de deschiderea de 20,00 m și verificată la DTAC §7.2, `65 mm` la mijlocul deschiderii) de rama rigidă a tâmplăriei, care nu ar tolera o asemenea deplasare relativă fără fisurarea geamului sau deteriorarea etanșărilor — soluție standard la interfața structură portantă/fațadă vitrată ușoară, tratată integral la cap. PTh-R.4.7 și PTh-R.10.1.

---

## PTh-R.3 — EXTRAS DE MATERIALE (BILL OF QUANTITIES PE REPER) — OȚEL + BETON

### PTh-R.3.1 Sistemul de marcare (repere de atelier)

Fiecare element primește o marcă unică de atelier (reper), poansonată pe piesă și regăsită atât în planurile de montaj cât și în planurile de detaliu (shop drawings):

| Prefix marcă | Categorie element | Profil/secțiune | Nr. buc |
|---|---|---|---|
| ST- | Stâlpi cadru curent (8 din 12 cadre) | HEB 400 S355 | 16 |
| ST-M | Stâlpi cadru marginal mezanin (2 cadre) | HEB 400 S355 | 4 |
| ST-F | Stâlpi de fronton/capăt, inclusiv cadrul cu vitrină (2 cadre, axele 1 și 13) | HEB 360 S355 | 4 |
| RG- | Rigle cadru (sudate, cu vută la nod) | I sudat, h variabil 500-900 mm, S355 | 12 |
| CV- | Contravântuiri verticale CBF (diagonale X, 2 travei de capăt) | SHS 150×150×8, S235 | 4 |
| PN- | Pane de acoperiș (3 zone diferențiate) | Z200×2,5 / Z200×3,0 / Z250×3,0, S235 | 146 |
| VT- | Stâlpi de vitrină (mulioni structurali) | RHS 200×200×8, S235 | 2 |
| LT- | Linteu vitrină (3 tronsoane, deschidere 3×6,00 m) | HEA 300, S355 | 3 |
| MZ-P | Grinda principală a mezaninului (linia intermediară, 3 travei de 6,67 m) | HEB 260, S235 | 1 (3 tronsoane transport) |
| MZ-S | Grinzi secundare mezanin | IPE 270, S235 | 16 |
| SM- | Stâlpi proprii mezanin (linia intermediară) | HEB 200, S235 | 2 |
| PB-01 | Plăci de bază stâlpi curenți (ST, ST-M) | 600×600×35 mm, S355 | 20 |
| PB-02 | Plăci de bază stâlpi fronton/capăt CBF (ST-F) | 650×650×40 mm, S355 | 4 |
| PB-VT | Plăci de bază stâlpi vitrină | 350×350×20 mm, S355 | 2 |

Sistemul de marcare este identic pe toată documentația de execuție (planuri de montaj S01-S15, cap. PTh-R.12.1 al mall-ului de referință ca standard de prezentare — aici integrat direct în listele de mai jos, dat fiind volumul mai redus al structurii) și se regăsește pe etichetele metalice ale fiecărui element la livrarea din atelier (cap. PTh-R.6.3).

### PTh-R.3.2 Extras profile laminate/sudate — oțel structural

| Marcă | Profil | Lungime/buc [m] | Nr. buc | Lungime totală [m] | Masă unitară [kg/m] | Masă totală [kg] |
|---|---|---|---|---|---|---|
| ST- (HEB400 curent) | HEB 400 | 7,00 | 16 | 112,0 | 155,0 | 17.360 |
| ST-M (HEB400 marginal mezanin) | HEB 400 | 7,00 | 4 | 28,0 | 155,0 | 4.340 |
| ST-F (HEB360 fronton/capăt) | HEB 360 | 7,00 | 4 | 28,0 | 142,0 | 3.976 |
| RG- (I sudat, h variabil) | I sudat 500-900 mm | 20,00 | 12 | 240,0 | ≈115 (mediu) | 27.600 |
| CV- (SHS 150×150×8) | SHS 150×150×8 | 8,85 | 4 | 35,4 | 35,3 | 1.250 |
| PN- curentă (Z200×2,5) | Z 200×2,5 | 6,00 | 90 | 540,0 | 6,9 | 3.726 |
| PN- margine (Z200×3,0) | Z 200×3,0 | 6,00 | 40 | 240,0 | 8,2 | 1.968 |
| PN- colț (Z250×3,0) | Z 250×3,0 | 6,00 | 16 | 96,0 | 10,3 | 989 |
| VT- (RHS 200×200×8) | RHS 200×200×8 | 4,20 | 2 | 8,4 | 48,1 | 404 |
| LT- (HEA300 linteu) | HEA 300 | 6,00 | 3 | 18,0 | 88,3 | 1.589 |
| MZ-P (HEB260) | HEB 260 | 20,00 (3 tronsoane) | 1 | 20,0 | 93,0 | 1.860 |
| MZ-S (IPE270) | IPE 270 | 6,00 | 16 | 96,0 | 36,1 | 3.466 |
| SM- (HEB200) | HEB 200 | 3,50 | 2 | 7,0 | 61,3 | 429 |
| **TOTAL profile brute (fără plăci/accesorii)** | | | | | | **≈ 68.972 kg ≈ 69,0 t** |

Cu adăugarea plăcilor de capăt, plăcilor de bază, guseurilor, rigidizărilor și splice-urilor (estimare +12% față de masa profilelor, practică uzuală pentru hale metalice cu noduri rigide și cadru de vitrină), masa totală de oțel structural ajunge la **≈ 77.250 kg ≈ 77,3 t**. Indicele de consum rezultat: `77.250/2.100 mp = **36,8 kg/mp**` — încadrat în intervalul orientativ 30-40 kg/mp pentru hale metalice ușoare fără pod rulant, cu deschidere 20,00 m, valoare coerentă cu absența oricărui echipament suspendat de mare greutate (spre deosebire, de exemplu, de o hală cu pod rulant, unde indicele urcă spre 45-50 kg/mp).

### PTh-R.3.3 Extras șuruburi de înaltă rezistență și curente

| Utilizare | Tip | Nr. seturi | Observație |
|---|---|---|---|
| Noduri rigide riglă-stâlp, cadre curente + marginale mezanin (10 cadre × 2 noduri = 20 noduri) | M27 gr. 10.9 HR, 8 buc/nod | 160 | pretensionate, metoda combinată (cap. PTh-R.4.1) |
| Noduri rigide fronton/vitrină (2 cadre × 2 noduri = 4 noduri) | M24 gr. 10.9 HR, 8 buc/nod | 32 | placă redusă, moment de calcul mai mic (cap. PTh-R.4.2) |
| Splice de transport riglă (12 rigle × 1 splice/riglă) | M27 gr. 10.9 HR, 12 buc/splice | 144 | la ≈5,00 m de nod, zonă de moment redus (cap. PTh-R.4.4) |
| Îmbinări pane-riglă, rigle de perete-stâlp fronton | M16 gr. 8.8 | ≈ 620 | 2 buc/reazem |
| Îmbinări gusset diagonale CBF (4 diagonale × 2 capete) | M20 gr. 8.8 | 32 | capăt aplatizat ranforsat (cap. PTh-R.4.5) |
| Buloane de ancoraj PB-01 (stâlpi curenți ST + ST-M) | M27 gr. 8.8, hef = 450 mm | 80 | 4/stâlp |
| Buloane de ancoraj PB-02 (stâlpi fronton/capăt CBF ST-F) | M30 gr. 8.8, hef = 500 mm | 16 | majorate, reacțiune orizontală CBF (cap. PTh-R.4.6) |
| Buloane de ancoraj PB-VT (stâlpi vitrină) | M20 gr. 8.8, hef = 300 mm | 8 | articulate |
| Îmbinare linteu-stâlpi fronton/vitrină | M20/M24 gr. 8.8 | 24 | 2 reazeme intermediare + 2 capete (cap. PTh-R.4.7) |

### PTh-R.3.4 Consum de sudură (materiale de adaos)

| Tip îmbinare sudată | Lungime totală cordon [m] | Secțiune | Consum electrod/sârmă [kg] |
|---|---|---|---|
| Rigle sudate (talpă-inimă-talpă, cordon dublu a=6mm) | 960 (240 m × 4 cordoane) | a=6mm | ≈ 676 |
| Vute (racord la talpa riglei, CJP) | 21,6 (12 vute × 1,80 m) | CJP | ≈ 56 |
| Plăci de capăt noduri rigide (CJP + colț) | 96 (24 noduri × 4 m perimetru) | CJP+a=8 | ≈ 458 |
| Plăci de bază (colț perimetral, a=8mm) | 96 (24 stâlpi × 4 m) | a=8mm | ≈ 273 |
| Guseuri diagonale CBF (a=6mm) | 3,2 (4 diagonale × 2 capete × 0,4 m) | a=6mm | ≈ 15 |
| **TOTAL consumabile sudură (electrod echivalent MMA/MAG)** | | | **≈ 1.480 kg** |

### PTh-R.3.5 Sistem de protecție anticorozivă și la foc — consum

Suprafața totală de protejat (scalată proporțional cu tonajul de oțel, ≈ 77,3 t față de referința de 106,1 t/3.200 mp a unei hale comparabile): **≈ 2.330 mp**.

| Sistem | Suprafață [mp] | Grosime (DFT) | Consum |
|---|---|---|---|
| Grund epoxidic zincat | 2.330 (toată structura) | 60 µm | ≈ 349 L |
| Strat intermediar epoxidic | 2.330 | 100 µm | ≈ 466 L |
| Finisaj poliuretanic | 2.330 | 60 µm | ≈ 233 L |
| Vopsea intumescentă (stâlpi R60 + rigle R30-60 + CBF R30, cap. PTh-R.12) | ≈ 803 (24 stâlpi + 12 rigle + 4 diagonale CBF) | 0,6-1,2 mm (variabil pe factor de masivitate, cap. PTh-R.12.2) | ≈ 1.560 kg (uscat) |
| Zincare termică (buloane, piese mici de prindere) | — | ≥ 55 µm | conform loturi, la zincator |

Spre deosebire de o hală cu compartiment unic la parter (unde vopseaua intumescentă e localizată doar lângă zidul de foc), cerința de rezistență la foc mai extinsă a acestei clădiri comerciale (R60 stâlpi/mezanin generalizat, cap. PTh-R.12) impune **protecție intumescentă pe majoritatea structurii metalice principale**, motiv pentru care suprafața protejată (803 mp) reprezintă aici o pondere mult mai mare din suprafața totală vopsită decât la o hală industrială obișnuită.

### PTh-R.3.6 Extras de materiale — beton și armătură

| Element | Dimensiuni | Nr. buc | Volum unitar [mc] | Volum total [mc] | Clasă beton |
|---|---|---|---|---|---|
| Fundație ST (stâlp curent) | 2,00×2,00×0,90 m | 16 | 3,60 | 57,60 | C25/30 XC2 |
| Fundație ST-M (marginal mezanin) | 2,10×2,10×1,00 m | 4 | 4,41 | 17,64 | C25/30 XC2 |
| Fundație ST-F (fronton/capăt CBF) | 2,00×2,10×1,00 m | 4 | 4,20 | 16,80 | C25/30 XC2 |
| Fundație VT (stâlp vitrină) | 1,00×1,00×0,50 m | 2 | 0,50 | 1,00 | C25/30 XC2 |
| Fundație SM (stâlp propriu mezanin) | 1,20×1,20×0,50 m | 2 | 0,72 | 1,44 | C25/30 XC2 |
| Grinzi de echilibrare (tiranți, 1 per cadru) | 0,40×0,60×20,00 m | 12 | 4,80 | 57,60 | C25/30 XC2 |
| **Subtotal fundații + grinzi de echilibrare** | | | | **152,08** | **C25/30 XC2** |
| Placă pardoseală — sală de vânzare | 1.480 mp × 0,15 m | — | — | 222,00 | C30/37 XC1 |
| Placă pardoseală — depozit marfă | 380 mp × 0,20 m | — | — | 76,00 | C30/37 XC1 |
| Planșeu compozit mezanin (capac beton peste tablă cutată) | 240 mp × 0,10 m | — | — | 24,00 | C30/37 XC1 |
| **Subtotal beton suprastructură** | | | | **322,00** | **C30/37 XC1** |
| **TOTAL BETON** | | | | **≈ 474 mc** | — |

| Element | Armătură (tip/consum) | Cantitate estimată [kg] |
|---|---|---|
| Fundații + grinzi de echilibrare (consum mediu 90 kg/mc, majorat de armarea de întindere a tiranților, cap. PTh-R.5.3) | BST500C | ≈ 13.690 |
| Placă pardoseală sală de vânzare (plasă STNB Ø8/150×150, strat unic, 25 kg/mc) | BST500C | ≈ 5.550 |
| Placă pardoseală depozit (plasă STNB Ø10/150×150, dublu strat, 35 kg/mc) | BST500C | ≈ 2.660 |
| Planșeu compozit mezanin (plasă + armătură în nervuri pentru REI60, 45 kg/mc) | BST500C | ≈ 1.080 |
| **TOTAL ARMĂTURĂ** | | **≈ 23.000 kg ≈ 23,0 t** |

Suplimentar, tabla cutată (steel deck) a planșeului mezaninului: 240 mp × ≈11 kg/mp ≈ **2.640 kg**, cu conectori tip stud (dacă se optează pentru conlucrare compozită a grinzilor, cap. PTh-R.5.4) sau fără (variantă adoptată, grinzi necompozite, doar placa lucrează compozit cu tabla cutată).

---

## PTh-R.4 — DETALII DE ÎMBINARE (METODA COMPONENTELOR — SR EN 1993-1-8) + INTERFAȚA CU VITRINA

### PTh-R.4.1 Nodul rigid riglă-stâlp — cadre curente și marginale de mezanin (stâlpi HEB400)

**Configurație adoptată:** placă de capăt extinsă **280×700×30 mm**, S355 J2, sudată CJP la riglă (ambele tălpi) + cordon de colț a=8mm la inimă; 4 rânduri de șuruburi **M27 gr. 10.9 HR** (2 rânduri deasupra tălpii superioare, 2 rânduri sub talpa inferioară), 2 șuruburi/rând → 8 șuruburi/nod; rigidizări de continuitate în stâlp, în dreptul ambelor tălpi ale riglei, grosime 18 mm (egală cu talpa riglei la nod), sudate CJP la tălpile stâlpului.

**Verificarea componentelor (metoda componentelor, SR EN 1993-1-8 §6.2):**

| Componentă | Rezistență [kN] pe rând critic | Mod de cedare guvernant |
|---|---|---|
| Placă de capăt la încovoiere (rândul 1, extensie) | 300 | mod 2 (mixt placă+șurub) |
| Placă de capăt la încovoiere (rândul 2, sub talpă) | 320 | mod 1 (curgere placă) |
| Talpa/inima stâlpului HEB400 la încovoiere (T-stub) | 310 | mod 1 |
| Inima stâlpului la tracțiune transversală (cu rigidizări) | 380 | curgere inimă |
| Inima stâlpului la compresiune transversală (cu rigidizări) | 450 | strivire locală |
| Inima stâlpului la forfecare (panou) | 1.050 | verificat separat |
| Șurub M27 gr.10.9 la tracțiune | 330,5/șurub | ruperea tijei |

Rezistența pe rând se ia egală cu minimul componentelor: rândul 1 → min(300, 310) = **300 kN**; rândul 2 → min(320, 310) = **310 kN**. Brațe de pârghie (față de centrul de compresiune la talpa inferioară): r1 = 0,85 m, r2 = 0,68 m.

**Mj,Rd = Σ Ftr,i·ri = 300·0,85 + 310·0,68 = 255,0 + 210,8 = 465,8 kNm.**

Verificare la efortul de calcul maxim al acestei categorii de nod (cadru marginal de mezanin, valoarea guvernantă din §PTh-R.2.2, MEd = 430 kNm): `430/465,8 = **0,92 ≤ 1,0 → ✓**`, cu o rezervă modestă dar suficientă. Pentru cadrele curente (MEd = 385 kNm): utilizare `385/465,8 = **0,83 < 1,0 → ✓**`, rezervă mai confortabilă. Verificarea inimii stâlpului la forfecare (panou de nod): `VEd,panou ≈ 520 kN < Vwp,Rd = 1.050 kN → **0,50 ✓**` — fără placă de dublare la aceste noduri.

### PTh-R.4.2 Nodul rigid riglă-stâlp — cadrele de fronton (stâlpi HEB360, inclusiv cadrul vitrinei)

Efortul de calcul la nodurile de fronton este mai redus decât la cadrele curente pe componenta de moment (MEd = 310 kNm cadru de capăt curent, 345-354 kNm cadru vitrină, cap. PTh-R.2.5-2.6), dar secțiunea stâlpului (HEB360) este și ea mai zveltă, motiv pentru care se adoptă o configurație de nod dedicată, mai economică: placă de capăt **250×620×25 mm**, S355, 4 rânduri × M24 gr. 10.9 HR (8 șuruburi/nod), rigidizări de continuitate grosime 16 mm.

Verificare simplificată (componentele scalează aproximativ liniar cu grosimea plăcii/tălpii): rândul 1 ≈ 240 kN, rândul 2 ≈ 255 kN; brațe r1 = 0,66 m, r2 = 0,52 m → **Mj,Rd = 240·0,66 + 255·0,52 = 158,4 + 132,6 = 291,0 kNm**.

Verificare la MEd maxim al acestei categorii (cadrul vitrinei, cu momentul majorat de excentricitatea linteului, MEd,total = 354 kNm, cap. PTh-R.2.6): `354/291,0 = **1,22 > 1,0 → nesatisfăcător**` cu configurația inițială → se **majorează placa la 280×700×30 mm + M27 gr. 10.9** (identică geometric cu nodul curent, cap. PTh-R.4.1, dar pe stâlp HEB360): rândul 1 ≈ 300 kN (guvernat tot de placă/talpă stâlp, similar analizei anterioare, dar talpa HEB360 e ceva mai subțire decât HEB400 → se reduce componenta "talpă stâlp" la ≈ 280 kN) → rândul 1 = rândul 2 = **280 kN**, brațe identice cu nodul curent (r1=0,85m, r2=0,68m, placă identică) → **Mj,Rd = 280·(0,85+0,68) = 428,4 kNm**.

Verificare finală: cadrul vitrinei (MEd = 354 kNm) → `354/428,4 = **0,83 ✓**`; cadrul de capăt curent (MEd = 310 kNm) → `310/428,4 = **0,72 ✓**`. **Se adoptă configurația unificată (placă 280×700×30 + M27 gr.10.9) pentru toate cele 4 noduri de fronton** (2 cadre de capăt curent + cadrul vitrinei), aceeași ca la nodurile curente — decizie care unifică execuția (un singur tip de placă de capăt pe toată structura) și elimină riscul de confuzie în atelier între cele două configurații inițial diferențiate.

*(Corecție de proiectare PTh: configurația inițial estimată la §PTh-R.3.3, cu M24/placă redusă la nodurile de fronton, s-a dovedit insuficientă la verificarea component cu component pentru cadrul vitrinei — extras de materiale PTh-R.3.3 se actualizează în consecință, unificând toate cele 24 de noduri rigide pe placa 280×700×30 + M27 gr.10.9; consumul suplimentar de oțel/șuruburi este marginal, sub 200 kg, și este deja inclus în marja de +12% pentru accesorii de la §PTh-R.3.2.)*

### PTh-R.4.3 Îmbinarea vutei — detaliu de execuție

Vuta (placă triunghiulară sudată la talpa inferioară a riglei, lungime ≈ 1,80 m, înălțime variabilă de la 0 la ≈ 350 mm, deja verificată la nivel de secțiune la DTAC §7.2 — Mc,Rd,vută = 2.166 kNm) se execută din platbandă S355 groasă 20 mm, tăiată la plasmă/laser, cu margini pregătite pentru sudură CJP. Racordul vută-talpă riglă: sudură cu pătrundere completă, inspectată **100% cu ultrasunete (UT)**, categorie EXC3 locală (SR EN 1090-2), corespunzător efortului de întindere din talpa riglei la nod. Raza de racordare la capătul ascuțit al vutei ≥ 150 mm, pentru a evita concentrarea de tensiune și punctele de inițiere a fisurii de oboseală (relevant în special la cadrele curente, cu ciclu repetat de încărcare din vânt/exploatare).

### PTh-R.4.4 Înnădirea de transport (splice) a riglei

Rigla cadrului are lungime totală **20,00 m**, care depășește gabaritul de transport rutier curent (13,5-16,5 m util pe trailer standard). Se prevede **o înnădire de transport (field splice) la fiecare din cele 12 rigle**, poziționată la **≈ 5,00 m de la stâlp** (aproximativ 1/4 din deschidere, în zona cu moment redus, MEd,splice ≈ 250 kNm, mult sub MEd,nod = 385-430 kNm), **NU** în zona de moment maxim (nod sau coamă).

**Configurație splice:** placă de capăt **280×850×28 mm**, S355, 6 rânduri × 2 = **12 șuruburi M27 gr. 10.9 HR** pretensionate. Verificare simplificată (T-stub placă 28mm, 3 rânduri active la tracțiune): Ft,rând ≈ 300 kN; brațe r1=0,42m, r2=0,32m, r3=0,22m → **Mj,Rd,splice = 300·(0,42+0,32+0,22) = 300·0,96 = 288 kNm** → utilizare `250/288 = **0,87 ✓**`.

Această înnădire **NU** apare explicit în memoriul DTAC (care a tratat rigla ca element continuu de calcul); este o cerință de EXECUȚIE specifică fazei PTh, esențială pentru planul de transport și montaj — cele 12 rigle rezultă astfel în **24 de tronsoane de transport**, fiecare de lungime ≈ 10,00 m (variabil ușor, funcție de poziția exactă a splice-ului, pentru a echilibra înălțimea secțiunii sudate transportate).

### PTh-R.4.5 Îmbinarea diagonalelor CBF (gusset) — verificare la capacitate

Diagonala CBF (SHS 150×150×8, S235, NEd = 340 kN elastic) se prinde la nodul cadru-stâlp printr-o **placă de guseu** sudată la stâlp și înșurubată la capătul aplatizat (flattened end) al tubului SHS.

Verificarea guseului se face la **efortul de capacitate**, nu la NEd elastic (conform principiului de proiectare capacitivă deja stabilit la DTAC §7.4 și reconfirmat la PTh-R.2.7): `NEd,guseu = 1,1·γov·Npl,Rd,diag = 1,1·1,25·1.053 = **1.448 kN**`.

Placă guseu S355, grosime **14 mm**, lățime efectivă Whitmore ≈ 220 mm (2 șuruburi/rând, unghi de dispersie 30°): `I = 220·14³/12 = 50.306 mm⁴`; verificare la flambaj local al guseului (lungime liberă Lgusset ≈ 130 mm): `Ncr = π²·E·I/Lgusset² = π²·210.000·50.306/130² ≈ 6.170 kN ≫ 1.448 kN → **✓**` (guseu gros, necritic la flambaj).

Verificarea secțiunii nete a tubului SHS la capătul aplatizat (2 găuri M20, Ø22): `Anet = A − 2·t·d0 = 4.490 − 2·8·22 = 4.138 mm²`; `Nu,Rd = 0,9·Anet·fu/γM2 = 0,9·4.138·360/1,25 = **1.073 kN < 1.448 kN → insuficient**` → se adoptă **capăt aplatizat ranforsat cu plăci doubler 6 mm pe fiecare față + 4×M20 gr. 8.8** (2 rânduri × 2), care mărește secțiunea utilă de prindere: `Nu,Rd,ranforsat ≈ 1.520 kN ≥ 1.448 kN → **✓ (utilizare 0,95)**`. **Se adoptă capăt aplatizat ranforsat + 4×M20 la toate cele 4 diagonale CBF** (2 travei de capăt × 2 diagonale în X).

### PTh-R.4.6 Placa de bază — stâlpi cadru principal și stâlpi de fronton

**PB-01 (stâlpi curenți ST, ST-M — HEB400):** placă **600×600×35 mm**, S355, 4 buloane de ancoraj **M27 gr. 8.8, hef=450mm**, sudură perimetrală de colț a=7mm (redusă la a=5mm pe zona tălpii întinse). Verificare presiune pe beton sub placă: `σ = NEd/A = 620.000/(600·600) = **1,72 N/mm² ≪ fcd(C25/30) = 0,85·25/1,5 = 14,2 N/mm² → ✓**`, rezervă foarte amplă (placa fiind guvernată, în realitate, de rigiditatea necesară nivelmentului, nu de rezistență). Pentru ST-M (NEd = 705 kN): `σ = 705.000/360.000 = 1,96 N/mm² ✓`, la fel de confortabil.

**PB-02 (stâlpi de fronton/capăt CBF ST-F — HEB360):** placă majorată **650×650×40 mm**, buloane **M30 gr. 8.8, hef=500mm** — majorare justificată de reacțiunea orizontală mare transmisă de contravântuiri (VEd = 210-225 kN, cap. PTh-R.2.5-2.6) și de verificarea la smulgere sub combinația de ridicare (vânt succiune + componentă seismică defavorabilă), care solicită suplimentar buloanele de ancoraj la tracțiune.

**PB-VT (stâlpi vitrină — RHS200×200×8):** placă mică, articulată, **350×350×20 mm**, 4 buloane **M20 gr. 8.8, hef=300mm** — dimensionată exclusiv pentru greutatea proprie și reacțiunea din vânt a tâmplăriei (cap. PTh-R.2.9), fără moment transmis la fundație.

Nivelmentul tuturor plăcilor de bază se realizează prin **piulițe de reglaj (leveling nuts) + subturnare cu mortar epoxidic fără contracție** (grosime rost 30-50 mm), executată după atingerea verticalității definitive și înainte de aplicarea încărcării structurii superioare.

### PTh-R.4.7 Interfața cu vitrina comercială principală — prinderea linteului, stâlpilor de vitrină și rostul glisant

**Prinderea linteului la stâlpii de fronton (axa 1):** placă laterală inserată **excentric** față de axa stâlpului de fronton (brațul e = 0,15 m menționat la DTAC §7.6 și cap. PTh-R.2.6), sudată pe fața interioară a tălpii stâlpului HEB360, cu 4 șuruburi **M24 gr. 8.8** care preiau reacțiunea de capăt a linteului (R ≈ 62 kN, cap. PTh-R.2.6) prin forfecare + moment local dat de excentricitate. Verificare la forfecare a grupului de șuruburi: `F_v,Rd/șurub (M24 gr.8.8, un plan de forfecare) = 0,6·353·800/(1,25·1.000) ≈ 135,5 kN` — cu 4 șuruburi, capacitate de grup `≈ 542 kN ≫ 62 kN → **✓**`, rezervă amplă (grup dimensionat, în realitate, de necesitatea constructivă de a asigura o prindere rigidă la nivelul excentricității, nu de rezistență strict necesară).

**Prinderea linteului la stâlpii de vitrină (mulioni intermediari):** placă de capăt simplă, articulată, 2 șuruburi **M20 gr. 8.8** — reazem intermediar al grinzii continue pe 3 deschideri (cap. PTh-R.2.9), fără moment transmis la stâlpul RHS200×200×8 (element secundar, fără rol în sistemul seismic principal).

**Rostul glisant vertical (interfața structură-tâmplărie):** la partea superioară a ramei de tâmplărie a vitrinei (interfața cu rigla cadrului de capăt, care se deformează sub încărcare cu o săgeată de 65 mm la mijlocul deschiderii de 20,00 m, DTAC §7.2), se prevede un **profil de prindere cu joc vertical** (glisieră metalică, tip „head channel" specific fațadelor vitrate ușoare, SR EN 13830), cu joc total prevăzut **≥ 90 mm** (65 mm săgeată de calcul + rezervă de 25 mm pentru toleranțe de execuție și pentru contracția termică diferențială structură metalică/tâmplărie aluminiu). Detaliul permite deplasarea liberă pe verticală a structurii principale fără a transmite forțe parazite tâmplăriei rigide, evitând fisurarea geamului termopan sau deteriorarea garniturilor de etanșare — soluție de coordonare tratată integral și din perspectiva arhitecturii/instalațiilor la cap. PTh-R.10.1.

### PTh-R.4.8 Sinteza toleranțelor de fabricație ale îmbinărilor (SR EN 1090-2)

Toleranțele geometrice de atelier, aplicabile tuturor pieselor prelucrate la cap. PTh-R.4.1-4.7, sunt cele din SR EN 1090-2, Anexa D (toleranțe funcționale), diferențiate pe tipul de piesă:

| Element | Toleranță | Observație |
|---|---|---|
| Lungime totală element (stâlp, tronson riglă) | ±3 mm (L ≤ 10 m) / ±5 mm (L > 10 m) | verificat înainte de vopsire |
| Poziția găurilor în grup (placă de capăt, placă de bază) | ±2 mm între găuri adiacente, ±4 mm față de marginea grupului | șablon de găurire (jig) unic pe toată seria |
| Planeitatea plăcii de capăt/plăcii de bază | ≤ 1 mm/m | control cu riglă metalică + cale |
| Perpendicularitatea plăcii de capăt pe axa riglei | ≤ 1:300 | critică pentru contactul uniform pe toată suprafața de compresiune a nodului |
| Torsiunea secțiunii sudate (twist) | ≤ 5 mm/m | control după fiecare etapă de sudare, cap. PTh-R.6.1 |
| Poziția capătului aplatizat pe diagonala CBF | ±3 mm față de axa teoretică a guseului | condiționează alinierea celor 4 șuruburi M20, cap. PTh-R.4.5 |

Abaterile constatate peste limitele de mai sus la controlul de recepție în atelier (cap. PTh-R.8.1) se tratează prin **neconformitate documentată** (formular de neconformitate, semnat de responsabilul CTC al atelierului), cu decizie de acceptare condiționată (dacă abaterea nu afectează capacitatea portantă sau montabilitatea, motivat printr-o notă de calcul suplimentară) sau de remediere/rebutare a piesei — nu se admite montarea pe șantier a unei piese cu abatere nedocumentată. Pentru nodurile rigide (cap. PTh-R.4.1-4.2), unde contactul plan-pe-plan al plăcii de capăt condiționează direct rigiditatea reală a nodului față de cea ipotetică din calcul, se acordă atenție specială perpendicularității și planeității — o abatere necontrolată aici ar putea reduce local rigiditatea nodului sub cea presupusă la §PTh-R.4.1, cu efect asupra distribuției reale a momentelor în cadru.

---

## PTh-R.5 — CAIET DE ARMARE — PLACĂ PARDOSEALĂ, FUNDAȚII, MEZANIN COMPOZIT

### PTh-R.5.1 Placa de pardoseală — zonare și armare

Placa de pardoseală (2.100 mp la nivelul parterului, din care 1.860 mp placă pe teren propriu-zisă — sală de vânzare 1.480 mp + depozit marfă 380 mp — restul de 240 mp fiind ocupat în plan de amprenta mezaninului, cu structură proprie descrisă la §PTh-R.5.4) se armează diferențiat pe zone funcționale, în funcție de încărcarea utilă de exploatare:

| Zonă | Grosime | Sarcină utilă adoptată | Armare | Rosturi de contracție |
|---|---|---|---|---|
| Sală de vânzare | 0,15 m | 5,0 kN/mp (comercial, circulație publică + rafturi ușoare) | plasă STNB Ø8/150×150mm, strat unic la 1/3 superior | interax 5,00-6,00 m |
| Depozit marfă | 0,20 m | 12,5 kN/mp (stivuire/rafturi paletizate) | plasă STNB Ø10/150×150mm, dublu strat (superior+inferior) | interax 5,00-6,00 m |

Structura de rezistență a plăcii se completează cu: **strat suport** din balast compactat 20 cm (Ev2 ≥ 40 MN/mp, verificat prin placă de încărcare, min. 1 punct/500 mp), geotextil de separare și folie de polietilenă (barieră de vapori); **rosturi de contracție** tăiate mecanic la 24-48 ore de la turnare, adâncime 1/4 din grosimea plăcii, poziționate pe axele cadrelor (interax 6,00 m, corespunzător travei) — evitând astfel fisurarea necontrolată pe suprafața mare a plăcii industriale/comerciale.

### PTh-R.5.2 Fundațiile izolate — poziții de armare

| Fundație | Dimensiuni | Armare talpă (ambele direcții) | Observație |
|---|---|---|---|
| ST (stâlp curent) | 2,00×2,00×0,90 m | Ø16/150mm, strat superior+inferior | mustăți de ancorare a plăcii de bază, integrate în șablonul de montaj (cap. PTh-R.6.4) |
| ST-M (marginal mezanin) | 2,10×2,10×1,00 m | Ø18/150mm, strat superior+inferior | armare majorată, efort mai mare (NEd=705kN) |
| ST-F (fronton/capăt CBF) | 2,00×2,10×1,00 m | Ø18/150mm, strat superior+inferior | + 4×Ø16 de ancorare continuă cu grinda de echilibrare (cap. PTh-R.5.3) |
| VT (stâlp vitrină) | 1,00×1,00×0,50 m | Ø12/150mm, strat unic | solicitare redusă (NEd≈45kN, cap. PTh-R.2.9) |
| SM (stâlp propriu mezanin) | 1,20×1,20×0,50 m | Ø12/150mm, strat unic | independentă de cadrele principale |

Acoperirea cu beton este de 50 mm la toate fundațiile (mediu XC2, expunere la umiditate a solului), cu distanțieri tip „scaun" din plastic sau beton pentru menținerea poziției armăturii inferioare pe folia de separare/egalizare.

### PTh-R.5.3 Grinzile de echilibrare (tiranți) — armare la întindere axială

Conform deciziei de proiectare enunțate la DTAC (fundații izolate + grinzi de echilibrare, cap. PTh-R.1) — necesare pentru a prelua împingerea orizontală a cadrelor cu bază articulată (VEd stâlp, tabel PTh-R.2.2), care nu este echilibrată de frecarea solului pe toată înălțimea, ci trebuie transmisă direct între fundațiile opuse ale fiecărui cadru (distanță 20,00 m).

Secțiune adoptată: **40×60 cm, C25/30**, la nivelul fundațiilor, pe toate cele 12 axe de cadru.

Armare la întindere axială pură (As = H/fyd, cu fyd = 500/1,15 = 434,8 N/mm²):

| Cadru | H = VEd [kN] | As necesar [mm²] | Armare adoptată | Utilizare |
|---|---|---|---|---|
| Curent (8) | 92 | 211,6 | 4Ø12 (452 mm²) | 0,47 |
| Marginal mezanin (2) | 104 | 239,2 | 4Ø12 (452 mm²) | 0,53 |
| Fronton/capăt CBF, inclusiv vitrină (2) | 225 (valoare maximă) | 517,5 | 4Ø14 (616 mm²) | 0,84 |

Armătura longitudinală se completează cu **etrieri constructivi Ø8/200mm** pe toată lungimea grinzii (fără rol structural la întinderea axială, ci pentru menținerea poziției barelor longitudinale în timpul betonării), acoperire 40 mm. *(Notă: secțiunile de armare adoptate depășesc, la cadrele curente și marginale de mezanin, necesarul strict de calcul — decizie deliberată de proiectare, care unifică diametrul minim de bară (Ø12) și asigură un control adecvat al fisurării la o piesă solicitată predominant la întindere axială, unde fisurarea necontrolată ar compromite funcția de tirant.)*

### PTh-R.5.4 Planșeul compozit al mezaninului — caiet de armare

Structura suport a planșeului compozit (240 mp, dimensiuni în plan 20,00×12,00 m, 2 travee longitudinale de 6,00 m): grinda principală intermediară **MZ-P (HEB260)**, dispusă pe linia de mijloc a mezaninului (la 6,00 m de fiecare cadru marginal), continuă pe 3 deschideri egale de 6,67 m, rezemată pe cei **2 stâlpi proprii SM- (HEB200)**; la capete (liniile L=0 și L=12,00 m), planșeul se reazemă direct pe riglele/consolele celor 2 cadre marginale ale mezaninului, prin console scurte sudate la cota +3,50 m (cap. PTh-R.2.4). Grinzile secundare **MZ-S (IPE270)**, dispuse perpendicular pe MZ-P (paralel cu lungimea halei), interax 2,50 m (8 linii pe deschiderea de 20,00 m), deschidere 6,00 m — configurație care confirmă exact reacțiunea deja stabilită la PTh-R.2.4 (R = 42 kN/grindă, interax 2,5 m).

Alcătuirea planșeului compozit propriu-zis: **tablă cutată (steel deck) grosime 0,75 mm, înălțime cută 58 mm**, peste care se toarnă **10 cm beton C30/37 XC1** (grosime totală placă compozită ≈ 15,8 cm), conform SR EN 1994-1-1.

| Poziție | Armare | Rol |
|---|---|---|
| Capac beton, plasă antifisurare | STNB Ø6/200×200mm | control fisurare din contracție + distribuție locală |
| Nervuri tablă cutată | 1×Ø10/nervură, poziționată la u=35mm de la fața inferioară | rezistență la foc REI60 (temperatura critică a armăturii, metodă simplificată SR EN 1994-1-2, principiu identic celui aplicat la alte funcțiuni ale platformei) |
| Zonă de reazem pe MZ-P/console (moment negativ) | plasă suplimentară Ø8/150×150mm, bandă de 1,00 m lățime | control fisurare la moment negativ pe reazem continuu |

**Decizie de proiectare privind conlucrarea compozită a grinzilor:** grinzile mezaninului (MZ-P, MZ-S) sunt proiectate ca elemente **necompozite** (fără conectori tip stud) — doar placa de beton lucrează compozit cu tabla cutată. Soluția simplifică execuția (fără necesitatea sudării conectorilor pe șantier înainte de turnare) și este acoperită cu rezervă de capacitate suficientă de secțiunile deja adoptate (grinda secundară IPE270, verificată la reacțiunea de 42 kN/DTAC §7.5, lucrează independent de placă). Dacă se optează ulterior pentru conlucrare compozită (variantă de optimizare, nu obligatorie), conectorii tip stud Ø19mm, h=100mm, interax 200mm s-ar aplica pe talpa superioară a grinzilor MZ-P/MZ-S, cu recalcularea capacității grinzii ca secțiune mixtă.

---

## PTh-R.6 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII METALICE

### PTh-R.6.1 Execuția în atelier

- **Debitare:** table și profile debitate prin plasmă/laser CNC (toleranță ±1 mm) pentru piese cu geometrie complexă (vute, plăci de capăt, guseuri, capete aplatizate CBF); debitare cu fierăstrău pentru profile drepte (HEB, HEA, IPE, RHS) la lungime ±2 mm.
- **Pregătirea marginilor pentru sudură:** teșire la 30-35° pentru CJP pe grosimi ≥ 12 mm (plăci de capăt de 25-40 mm, vute), conform WPS calificat pentru fiecare tip de îmbinare.
- **Asamblarea și sudarea riglelor** (h variabil 500-900 mm) pe standuri de asamblare cu opritoare (jigs), care mențin verticalitatea inimii și paralelismul tălpilor; **pre-îndoire (camber) de fabricație** ≈ **40 mm la mijlocul deschiderii de 20,00 m** (60% din săgeata SLS calculată de 65 mm, cap. PTh-R.11.2), pentru asigurarea pantei reziduale de scurgere la coamă și pentru un aspect vizual corect al planului de acoperiș.
- **Secvența de sudare:** alternantă (simetrică față de axa neutră), pentru minimizarea deformațiilor și tensiunilor reziduale; control dimensional (verticalitate inimă, planeitate tălpi) după fiecare etapă.
- **Calificarea procedeelor de sudare (WPQR)** conform SR EN ISO 15614-1, pentru fiecare combinație procedeu-material-grosime-poziție (MAG 135 pentru cordoane de colț curente, MAG/SAW pentru CJP la table groase — plăci de capăt, vute).
- **Calificarea sudorilor** conform SR EN ISO 9606-1, certificate valabile, re-testare periodică (la 2 ani sau la întreruperea activității > 6 luni).
- **Găurirea** pentru șuruburi se execută la șablon (template) sau CNC, diametru gaură = Ø șurub + 2 mm (șuruburi HR, conform SR EN 1090-2).

### PTh-R.6.2 Vopsirea în atelier

Pregătirea suprafeței (sablare Sa 2½) și aplicarea grundului epoxidic zincat se execută **în atelier, înainte de expediere**; stratul intermediar și finisajul se aplică fie tot în atelier (dacă transportul nu deteriorează stratul), fie parțial pe șantier (zonele de îmbinare sudate pe șantier, care se vopsesc după control). Vopseaua intumescentă (cap. PTh-R.3.5, PTh-R.12) se aplică **întotdeauna în atelier**, pe elementele care necesită protecție la foc (stâlpi, rigle, contravântuiri), pentru a asigura controlul de grosime (DFT) în condiții controlate. Zonele de contact ale îmbinărilor cu frecare (șuruburi HR pretensionate, clasa de frecare A) **NU se vopsesc** pe suprafețele de contact — rămân sablate sau se aplică vopsea certificată pentru coeficient de frecare µ ≥ 0,5.

### PTh-R.6.3 Transportul

Tronsoanele (stâlpi întregi 7,00 m, tronsoane de riglă ≈10,00 m rezultate din splice, pane/rigle de perete 6,00 m, tronsoane linteu vitrină 6,00 m) se transportă pe trailere standard/prelungite, cu etichetă metalică rezistentă la intemperii, corespondentă cu planul de montaj (marca de atelier, cap. PTh-R.3.1). Se verifică la recepția pe șantier: integritatea vopselei, absența deformațiilor de transport, corespondența reperelor cu planul de montaj.

### PTh-R.6.4 Montajul (erecția) — secvența

1. **Trasarea axelor** pe fundațiile finalizate (control topografic, verificare cote și poziție buloane de ancoraj față de planul de montaj, toleranță ±10 mm conform SR EN 1090-2 Anexa B) — inclusiv fundațiile proprii ale stâlpilor de vitrină (VT) și ale stâlpilor de mezanin (SM), poziționate cu aceeași precizie deși nu fac parte din sistemul seismic principal.
2. **Montarea stâlpilor cadrelor principale** — se începe cu o travee de capăt (cadrele de fronton, care includ contravântuirile CBF), ridicare cu macara mobilă, fixare provizorie pe buloane de ancoraj cu piulițe de nivelment, verificare verticalitate cu teodolit/nivelă laser înainte de strângerea definitivă și de subturnarea plăcii de bază.
3. **Montarea contravântuirilor verticale (CBF)** în traveele de capăt IMEDIAT după stâlpi — asigură stabilitatea provizorie a primelor cadre înainte de montarea riglei.
4. **Montarea riglelor** (în 2 tronsoane, îmbinate prin splice la sol sau la înălțime), cu fixare provizorie la nod cu minimum 50% din șuruburi înainte de eliberarea macaralei, apoi completarea și strângerea la cuplul final.
5. **Pane și rigle de perete**, apoi elementele secundare (sag-rods, eave struts).
6. **Structura mezaninului** (stâlpi proprii SM-, grindă principală MZ-P, grinzi secundare MZ-S, tablă cutată + turnare beton) — după stabilizarea completă a structurii principale a traveelor aferente.
7. **Cadrul vitrinei comerciale principale** (axa 1) — montat **ultimul dintre elementele structurale ale frontonului**, după ce structura principală a cadrului de capăt (stâlpi HEB360 + riglă) și-a atins deformația sub greutate proprie: se montează întâi cei 2 stâlpi de vitrină (VT-, RHS200×200×8) pe fundațiile proprii, apoi linteul (LT-, HEA300, în 3 tronsoane, cu splice la reazemele intermediare), **înainte** de montarea tâmplăriei — care se instalează abia după verificarea topografică a poziției finale a linteului și a rostului glisant prevăzut (cap. PTh-R.4.7, PTh-R.10.1).

### PTh-R.6.5 Contravântuiri provizorii de montaj

Se întocmește un **plan de contravântuire provizorie** (temporary bracing plan), semnat de inginerul structurist, care identifică elementele ce necesită sprijin lateral temporar înainte de finalizarea sistemului definitiv de contravântuire (în special traveele curente, aflate la distanță de cele 2 travei CBF de capăt), punctele de ancorare a cablurilor/țevilor provizorii și secvența minimă admisă de montaj fără contravântuire completă (**nu se montează mai mult de 2 cadre succesive** fără contravântuire orizontală provizorie de acoperiș). Responsabilitatea menținerii stabilității structurii pe parcursul montajului revine antreprenorului de montaj, pe baza acestui plan.

### PTh-R.6.6 Execuția pe timp friguros/călduros

- **Sudare sub +5°C:** îndepărtarea umezelii/gheții de pe suprafețele de sudat, protecție împotriva vântului pentru procedeele cu gaz de protecție (MAG), verificarea temperaturii materialului de bază (nu doar a aerului); pentru table groase (plăci de capăt ≥ 30mm, plăci de bază ≥ 35mm), preîncălzire locală la 50-100°C conform WPS, pentru reducerea riscului de fisurare la rece.
- **Depozitarea consumabililor** (electrozi bazici) în uscătoare/tubulare încălzite.
- **Montaj pe timp friguros:** se evită șocurile mecanice la manipulare/ajustare a găurilor la temperaturi < −10°C (risc de fisură fragilă la muchiile debitate termic netratate); oțelurile adoptate (S355 J2/JR, tenacitate confirmată la −20°C pentru piesele principale) sunt certificate pentru execuție la temperaturi scăzute.
- **Pe timp călduros (> 35°C):** protecția vopselelor proaspăt aplicate față de radiația solară directă; verificarea temperaturii interpas (interpass) la sudarea tablelor groase, cu pauze de răcire dacă e necesar.

### PTh-R.6.7 Toleranțe de montaj (SR EN 1090-2, Anexa B)

| Element | Toleranță | Metodă de control |
|---|---|---|
| Poziție bulon de ancoraj (în plan) | ±10 mm | șablon de montaj (template) fixat înainte de turnarea fundației |
| Cotă placă de bază | ±5 mm | nivelment optic/laser |
| Verticalitate stâlp (pe toată înălțimea, h≈7,00m) | h/500 și ≤ 14 mm | teodolit/fir cu plumb laser |
| Aliniamentul general al șirului de stâlpi | L/1000 pe lungimea halei (72 m → 72 mm) | control topografic |
| Rectilinitatea riglei montate | L/750 | inspecție vizuală + fir/laser |
| Poziția stâlpilor de vitrină și a linteului (interfața cu tâmplăria) | ±5 mm | control topografic de precizie, obligatoriu înainte de montarea tâmplăriei |

---

## PTh-R.7 — TEHNOLOGIA DE EXECUȚIE A ELEMENTELOR DE BETON

### PTh-R.7.1 Fundațiile izolate și grinzile de echilibrare

- **Săpătură** la cota de fundare prevăzută în studiul geotehnic, cu verificarea naturii terenului (faza determinantă FD1, cap. PTh-R.9) înainte de turnarea betonului de egalizare (10 cm, C12/15).
- **Cofrare** metalică/lemn, cu poziționarea prealabilă a **șablonului de buloane de ancoraj** (template rigid, fixat la cota și poziția din planul de montaj, toleranță ±10 mm) — element critic, verificat topografic ÎNAINTE de betonare, dat fiind că orice eroare de poziție a buloanelor este dificil/costisitor de corectat după întărirea betonului.
- **Armare** conform caietului de armare (cap. PTh-R.5.2-5.3), cu distanțieri corespunzători acoperirii de 50 mm.
- **Betonare** C25/30 XC2, cu vibrare mecanică, controlul consistenței la fiecare transport (tasare con Abrams, conform NE 012/1-2022); probe de rezistență (seturi 3 cuburi) la fiecare 50 mc sau la fiecare zi de turnare.
- **Grinzile de echilibrare** se toarnă monolit cu fundațiile (nu se admit rosturi de execuție pe traseul lor, dat fiind rolul de tirant continuu la întindere axială).

### PTh-R.7.2 Placa de pardoseală

- **Strat suport** (balast compactat 20 cm, geotextil, folie polietilenă) executat și verificat (Ev2 ≥ 40 MN/mp) înainte de turnare.
- **Turnare pe benzi/carouri**, delimitate de cofraje glisante sau șine de ghidaj laser (pentru planeitatea impusă de circulația comercială/depozitare), cu suprafață finisată prin elicopterizare (helicopter finish) în zona de depozit (rezistență sporită la abraziune) și finisaj periat/frecat în sala de vânzare (compatibil cu placarea finală a arhitecturii).
- **Rosturi de contracție** tăiate mecanic la 24-48 ore, interax 5,00-6,00 m (coincident cu axele cadrelor), adâncime 1/4 din grosimea plăcii; **rosturi de construcție** (la limita benzilor de turnare) cu bară de transfer (dowel) Ø20/500mm, interax 300mm, jumătate lubrifiată pentru a permite dilatarea liberă.

### PTh-R.7.3 Planșeul compozit al mezaninului

- **Montarea tablei cutate** pe grinzile MZ-P/MZ-S, fixată prin șuruburi autoforante sau puncte de sudură (funcție de sistemul ales), cu suprapunere minimă conform fișei tehnice a producătorului.
- **Sprijiniri provizorii** (popi metalici reglabili) sub tabla cutată, pe durata turnării betonului, dat fiind că grinzile sunt necompozite și tabla singură nu preia întreaga greutate a betonului proaspăt fără sprijin intermediar (interax popi ≈ 1,50-2,00 m, funcție de grosimea de 10 cm și de deschiderea tablei între grinzi).
- **Armare** conform caietului de armare (cap. PTh-R.5.4) — plasă antifisurare + armătură suplimentară în nervuri pentru REI60.
- **Turnare** C30/37 XC1, cu vibrare ușoară de suprafață (regletă vibrantă), finisaj drișcuit mecanic.
- **Decofrarea popilor provizorii** după atingerea a minimum 70% din rezistența de proiectare (verificată prin probe de decofrare sau metoda maturității), pentru a evita supraîncărcarea prematură a tablei cutate/grinzilor.

### PTh-R.7.4 Execuția betonului pe timp friguros/călduros

Pentru toate componentele de beton (fundații, grinzi de echilibrare, placă pardoseală, planșeu compozit) se aplică integral prevederile **C 16** privind execuția pe timp friguros (protecție/tratare termică, aditivi antiîngheț, metoda maturității pentru confirmarea rezistenței la decofrare/circulație). Atenție sporită la **fisurarea din contracție termică diferențială** pe suprafața mare a plăcii de pardoseală (2.100 mp) — pe vreme rece, tăierea rosturilor de contracție se execută mai devreme (12-18 ore) față de intervalul standard (24-48 ore), dat fiind că priza betonului e mai lentă dar riscul de fisurare necontrolată prin retragere termică rămâne activ. Pe timp călduros (>30°C), se aplică tratament de protecție a suprafeței proaspăt turnate (produse de cură sau folie), pentru a limita evaporarea rapidă a apei din beton și fisurarea plastică de suprafață, în special la placa de pardoseală de mare suprafață.

---

## PTh-R.8 — PLANUL DE CONTROL AL CALITĂȚII

### PTh-R.8.1 Controlul materialului de bază (oțel)

Certificat de inspecție tip **3.1** (SR EN 10204) pentru toate profilele/tablele S355/S235, cu trasabilitate marcă-certificat păstrată de la atelier la punerea în operă (marcaj heat number, verificat la recepția în atelier și corelat cu compoziția chimică/caracteristicile mecanice din certificat).

### PTh-R.8.2 Controlul sudurilor (SR EN ISO 5817, SR EN 1090-2)

| Categorie îmbinare | Nivel calitate (SR EN ISO 5817) | Control vizual (VT) | Control volumetric (UT/RT) |
|---|---|---|---|
| Cordoane de colț curente (pane-guseu, rigidizări) | C | 100% | — |
| CJP la noduri rigide (placă de capăt-riglă) | B | 100% | 100% UT |
| CJP la vute | B | 100% | 100% UT |
| CJP la capete aplatizate ranforsate CBF | B | 100% | 100% UT (prin sondaj RT 10%) |
| Cordoane placă de bază-stâlp | C | 100% | 10% UT prin sondaj |
| Splice riglă (înșurubat, fără sudură pe șantier) | — | control specific șuruburi (cap. PTh-R.8.3) | — |

Se întocmesc **rapoarte de examinare nedistructivă (END)** pentru fiecare sudură inspectată volumetric, cu identificarea univocă a poziției (marcă element + poziție cordon), semnate de operator END atestat nivel 2 conform SR EN ISO 9712.

### PTh-R.8.3 Controlul șuruburilor de înaltă rezistență pretensionate

- Certificat 3.1 pentru fiecare lot de șuruburi/piulițe/șaibe M20/M24/M27/M30.
- **Pretensionare prin metoda combinată** (strângere inițială la cuplu redus + rotire suplimentară controlată, SR EN 1090-2 §8.5.3): moment de control și unghi de rotire per diametru, specificate pe fișa tehnologică.
- Control: 100% verificare vizuală (marcaj de control cu vopsea/creion după strângere), min. 10% verificare instrumentală prin sondaj pe eșantion aleator din fiecare zi de montaj — cu prioritate la noduri rigide (cap. PTh-R.4.1-4.2) și la ancorajele stâlpilor de fronton (PB-02, majorate).

### PTh-R.8.4 Controlul sistemului de protecție anticorozivă și la foc

- Verificarea pregătirii suprafeței (rugozitate, grad de curățenie Sa 2½) prin comparatoare vizuale (SR EN ISO 8501-1).
- Măsurarea grosimii peliculei uscate (DFT), min. 10 măsurători/element reprezentativ, criteriu 80/20 (SR EN ISO 19840).
- Test de aderență (pull-off, SR EN ISO 4624): ≥ 5 MPa, min. 1 test/500 mp sau per element critic.
- Vopsea intumescentă: verificarea grosimii aplicate față de tabelul producătorului (funcție de factorul de masivitate Am/V al fiecărui profil și de clasa R cerută, cap. PTh-R.12), cu certificat de reacție la foc corespunzător profilului real montat.

### PTh-R.8.5 Controlul betonului și armăturii

Controlul betonului conform **NE 012/1-2022** (consistență la fiecare transport, seturi de probe 1/50mc/element/zi), controlul armăturii conform **ST 009** (certificate, verificare diametre/poziții înainte de betonare — corelat cu fazele determinante FD2/FD3, cap. PTh-R.9). Portanța stratului de balast sub placa de pardoseală (Ev2) se verifică prin placă de încărcare, minimum 1 punct/500 mp, cu accent pe zona de depozit marfă (sarcină utilă mai mare).

---

## PTh-R.9 — FAZE DETERMINANTE

| Nr. | Faza determinantă | Verificări/criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare (toate cele 28 de fundații — ST, ST-M, ST-F, VT, SM) | Confruntare cu studiul geotehnic; pconv = 180 kPa confirmată; absența umpluturilor/pungilor slabe | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Armare/betonare fundații + grinzi de echilibrare (înainte de betonare) | Diametre, poziții, acoperire; poziționarea șablonului de buloane de ancoraj, verificată topografic ÎNAINTE de betonare | Proiectant, diriginte, constructor, ISC |
| FD3 | Recepția structurii metalice la sosirea pe șantier | Corespondența reperelor cu planul de montaj, integritatea vopselei, certificate de material și de sudură din atelier | Proiectant, diriginte, constructor |
| FD4 | Montajul structurii principale (cadre + contravântuiri CBF, înainte de montarea panelor/anvelopei) | Verticalitate stâlpi, aliniament general, strângerea/pretensionarea nodurilor rigide, montarea COMPLETĂ a contravântuirilor definitive înainte de îndepărtarea sprijinelor provizorii | Proiectant, diriginte, constructor, ISC |
| FD5 | Montajul cadrului vitrinei comerciale principale (stâlpi VT + linteu LT), înainte de montarea tâmplăriei | Poziție finală conform planului, verificare topografică a rostului glisant prevăzut la interfața cu tâmplăria | Proiectant, diriginte, constructor, arhitect |
| FD6 | Montarea planșeului compozit al mezaninului (după armare, înainte de betonare) | Poziționarea tablei cutate, sprijinirile provizorii, armătura de nervură pentru REI60 | Proiectant, diriginte, constructor, ISC |
| FD7 | Recepția sistemului de protecție anticorozivă/la foc | DFT conform, aderență, certificate reacție la foc pentru vopseaua intumescentă aplicată pe elementele R30-R60 (cap. PTh-R.12) | Proiectant, diriginte, constructor |
| FD8 | Structura la roșu finalizată | Conformitate geometrică generală, absența defectelor vizibile, toate PVLA/rapoarte END arhivate | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte, întocmirea procesului-verbal de fază determinantă (condiție pentru autorizarea continuării lucrărilor). Neîndeplinirea criteriilor blochează avansul până la remediere și reverificare.

---

## PTh-R.10 — COORDONAREA CU ARHITECTURA (VITRINE) ȘI CU INSTALAȚIILE

### PTh-R.10.1 Coordonarea cu arhitectura — vitrina comercială principală

Montarea tâmplăriei vitrinei (rama de aluminiu + geam termopan, furnizor de fațade ușoare) se execută **numai după** finalizarea structurii metalice principale a cadrului de capăt (stâlpi HEB360 + riglă cu vute) și **după** stabilizarea acesteia sub greutatea proprie — practica de coordonare recomandată de **SR EN 13830** (fațade cortină/vitrate ușoare) pentru a minimiza deformația reziduală resimțită de tâmplărie. Rostul glisant vertical (cap. PTh-R.4.7, joc total ≥ 90 mm) se verifică topografic înainte de montarea ramei — dacă structura nu și-a atins încă deformația de lungă durată (fluaj/relaxare, deși structura metalică nu prezintă fluaj semnificativ, dar poate exista o mică așezare a fundațiilor, cap. PTh-R.13.3), se lasă o marjă suplimentară de 24-48 ore între finalizarea structurii cadrului de capăt și montarea tâmplăriei.

Toleranțele de montaj ale structurii la interfața cu tâmplăria (±5 mm, cap. PTh-R.6.7) sunt mai stricte decât toleranțele generale de montaj metalic (±10 mm), tocmai pentru a se încadra în capacitatea de reglaj a profilelor de tâmplărie ușoară, care nu tolerează abateri mari fără compromiterea etanșeității.

### PTh-R.10.2 Coordonarea cu instalațiile — străpungeri în structură

- **Planșeul compozit al mezaninului:** golurile pentru trecerea instalațiilor (electrice, HVAC, sanitare către nivelul superior) se prevăd în faza de proiectare a tablei cutate, cu ranforsare locală (bare suplimentare Ø10 în jurul golului, pentru goluri > 300×300 mm) — se evită tăierea golurilor pe șantier fără acordul proiectantului de rezistență, dat fiind rolul de diafragmă orizontală al planșeului compozit (cap. PTh-R.2.1).
- **Placa de pardoseală:** canalele/tranșeele pentru instalații (electrice, date) se execută înainte de turnare (pozare conducte în strat de nisip peste balast) sau, dacă ulterior, prin tăiere controlată respectând rosturile de contracție existente — nu se admite tăierea perpendiculară pe rosturi fără consultarea proiectantului.

### PTh-R.10.3 Coordonarea cu instalațiile — încărcări echipamente HVAC pe acoperiș

Greutatea echipamentelor HVAC suspendate de structura de acoperiș (unități de climatizare, tubulatură) este deja inclusă în încărcarea permanentă generică a acoperișului (gk = 0,48 kN/mp, DTAC §6.1, cap. PTh-R.14.1) — pentru echipamente concentrate cu greutate individuală > 2,0 kN, se prevede **verificare locală a panei/riglei** de rezemare, cu distribuție pe minimum 2 pane adiacente prin cadru metalic secundar (nu rezemare punctuală directă pe o singură pană), pentru a evita depășirea capacității locale la încovoiere transversală a profilului Z.

### PTh-R.10.4 Coordonarea cu instalațiile — rețeaua de sprinklere/hidranți

Conductele principale de sprinklere, agățate de talpa inferioară a riglelor cadrelor (cap. PTh-R.2.3), se prevăd cu console/cleme dimensionate pentru greutatea proprie a conductei pline cu apă + o cotă dinamică la declanșare — încărcare punctuală mică (< 1,0 kN/punct de prindere, interax uzual 3,00-4,00 m), neglijabilă față de capacitatea riglei (Vpl,Rd = 1.762 kN, DTAC §7.2), dar verificată local la strivirea tălpii inferioare la punctul de prindere prin clemă (nu se admite găurirea/perforarea tălpii riglei pentru prinderea instalațiilor, exclusiv console cu clemă sau sudură ușoară, la cerere expresă a proiectantului de rezistență).

---

## PTh-R.11 — VERIFICĂRI SUPLIMENTARE LA SLS

### PTh-R.11.1 Vibrațiile planșeului compozit al mezaninului (confort la utilizare)

Planșeele ușoare cu deschideri de 6,00-6,67 m pot fi sensibile la vibrații induse de mers (walking-induced vibration), verificare neimpusă explicit de DTAC (care a verificat doar rezistența și săgeata SLS a grinzii secundare IPE270, §7.5).

**Frecvența proprie a planșeului** (metodă simplificată, f1 = 18/√δ, cu δ săgeata instantanee sub G+ψ util, estimată la 9 mm pentru grinda secundară IPE270 pe deschiderea de 6,00 m): `f1 = 18/√9 = 18/3,0 = **6,0 Hz**`.

Verificare: pentru destinație „depozit/circulație personal" (cerință de confort mai relaxată decât birouri), limita minimă recomandată f1 ≥ 4,5 Hz → `6,0 > 4,5 → **✓, confort acceptabil fără analiză dinamică suplimentară**`.

### PTh-R.11.2 Contra-săgeți de fabricație (camber) — tabel sinteză

| Element | Săgeată SLS calculată | Contra-săgeată (camber) adoptată |
|---|---|---|
| Riglă cadru curent/marginal mezanin (20 m) | 65 mm (DTAC §7.2) | 40 mm (60% din săgeata sub G+zăpadă completă) |
| Linteu vitrină (deschidere 6,00 m) | 3,2 mm (cap. PTh-R.2.9) | fără camber (valoare mică, sub prag practic 10 mm) |
| Grindă principală mezanin MZ-P (deschidere 6,67 m) | ≈ 9 mm (estimat) | 6 mm |
| Grindă secundară mezanin MZ-S IPE270 (6,00 m) | ≈ 9 mm (§PTh-R.11.1) | fără camber (sub prag practic) |

### PTh-R.11.3 Reconfirmarea săgeții linteului vitrinei — criteriul de compatibilitate cu tâmplăria

Se reconfirmă la nivel de sinteză SLS verificarea deja detaliată la cap. PTh-R.2.9: săgeata linteului HEA300 (3,2 mm sub q_Ed = 1,16 kN/m, grindă continuă pe 3 deschideri de 6,00 m) rămâne sub limita adoptată **L/300 = 20 mm**, cu o rezervă foarte amplă (utilizare 0,16), care confirmă că secțiunea HEA300 — aleasă din considerente constructive (compatibilitate cu profilul de tâmplărie, cap. PTh-R.4.7) — oferă implicit o rigiditate net superioară minimului necesar pentru protecția geamului termopan și a garniturilor de etanșare.

### PTh-R.11.4 Verificarea deplasărilor laterale (drift) la nivelul mezaninului

Deplasarea relativă de nivel la cota mezaninului (+3,50 m) sub acțiunea seismică de proiectare, verificată conform P100-1/2013 §4.6.3.2 (limită dr·ν/h ≤ 0,010 pentru clădiri cu elemente neseismice fragile atașate structurii, ν=0,5 pentru clasa de importanță III): deplasarea relativă calculată dr ≈ 12 mm pe înălțimea de 3,50 m → `dr·ν/h = 12·0,5/3.500 = **0,0017 < 0,010 → ✓**`, cu rezervă amplă — structura fiind, pe direcția transversală, relativ rigidă datorită secțiunilor generoase ale stâlpilor HEB400/HEB360 și a nodurilor rigide dimensionate la §PTh-R.4.1-4.2.

---

## PTh-R.12 — CALCULUL LA FOC DETALIAT

### PTh-R.12.1 Cerințe de rezistență la foc, pe zone

Din scenariul de securitate la incendiu (document separat, referit aici doar pentru datele de intrare structurale) și din grad de rezistență la foc II (DTAC §1.4): stâlpii principali (ST, ST-M, ST-F) — **R60**; riglele cadrelor — **R30** în zona de câmp curent, **R60** în zona critică a nodului/vutei (adiacentă stâlpului, unde colapsul prematur ar compromite stabilitatea globală înainte de evacuare); planșeul compozit al mezaninului — **REI60** (zonă ocupată, cap. PTh-R.5.4); contravântuirile CBF — **R30** (element secundar de stabilizare, redundanță a sistemului longitudinal).

### PTh-R.12.2 Verificarea stâlpilor la R60 — necesitatea protecției

Din DTAC (principiu identic aplicat la alte funcțiuni ale platformei): pentru μ0 ≈ 0,58 (raport efort de calcul la foc/capacitate la temperatură normală), **θcr ≈ 554°C**. Oțelul neprotejat, la factorul de masivitate al stâlpilor HEB400/HEB360 (Am/V ≈ 90-105 m⁻¹, expunere pe 4 fețe), atinge θcr după **≈ 12-14 minute (R12-14)** — insuficient pentru R60 → se aplică **vopsea intumescentă**.

| Profil | Am/V [m⁻¹] | DFT necesar pt. R60 (µm, orientativ) |
|---|---|---|
| HEB 400 (ST, ST-M) | ≈ 100 | 900-1.200 |
| HEB 360 (ST-F) | ≈ 95 | 850-1.150 |

*(Notă onestă: grosimile exacte ale vopselei intumescente sunt specifice fiecărui produs certificat și se preiau din raportul de clasificare la foc al producătorului ales, pentru profilul și factorul de masivitate reale — tabelul de mai sus este orientativ, pe intervalul uzual pentru sisteme intumescente certificate R60 pe oțel S355; grosimea definitivă se confirmă printr-o notă de calcul separată anexată la cartea tehnică.)*

### PTh-R.12.3 Verificarea riglelor — R30 câmp / R60 zonă nod

Riglele (I sudat, h variabil 500-900mm), cu masivitate mai mare în zona vutei (secțiune mai groasă, Am/V mai redus, ≈ 85 m⁻¹) decât în câmpul curent (secțiune mai zveltă, Am/V ≈ 130 m⁻¹): în zona de câmp curent, cerința R30 se atinge cu o grosime redusă de vopsea intumescentă (≈ 400-600 µm); în zona nodului/vutei, cerința R60 impune grosime similară stâlpilor (≈ 900-1.100 µm, dat fiind Am/V comparabil). Diferențierea grosimii pe lungimea riglei (mai groasă spre nod, mai subțire spre coamă) este consemnată explicit în planurile de execuție pentru a evita supra-protejarea inutilă a zonei de câmp.

### PTh-R.12.4 Verificarea contravântuirilor CBF — R30

Diagonalele SHS150×150×8 (Am/V ≈ 140 m⁻¹, secțiune tubulară zveltă) ating θcr în ≈ 8-9 minute neprotejat — insuficient pentru R30 → se aplică vopsea intumescentă cu grosime mai redusă (≈ 500-700 µm pentru R30, cerință mai puțin severă decât stâlpii), inclusiv pe guseurile de prindere (cap. PTh-R.4.5), unde grosimea aplicată se ia egală cu cea a elementului cu masivitatea cea mai mare din nod (conservator).

### PTh-R.12.5 Verificarea planșeului compozit al mezaninului — REI60

Confirmată prin metoda temperaturii critice a armăturii suplimentare din nervuri (cap. PTh-R.5.4: bară Ø10/nervură, acoperire u=35mm, conform SR EN 1994-1-2) — principiu identic celui aplicat la alte planșee compozite ale platformei. **Extindere PTh — grinzile metalice ale mezaninului (MZ-P HEB260, MZ-S IPE270):** temperatura critică similară stâlpilor (θcr ≈ 550-560°C, μ0 comparabil pentru combinația de incendiu G+ψ1·Q), timp până la θcr neprotejat pentru IPE270 (Am/V ≈ 135 m⁻¹, expus pe 3 fețe) ≈ 10-11 minute — insuficient pentru R60 → se protejează cu **vopsea intumescentă** (grosime tipică 1,0-1,4 mm pentru Am/V≈135 la R60) sau, alternativ, cu **placare tip plăci de vermiculită/gips-carton rezistent la foc** (2 straturi × 15 mm) sub grinzile mezaninului, decizie de execuție care se coordonează cu eventualul tavan fals al zonei de depozitare/birou de la mezanin (cap. PTh-R.10.2).

### PTh-R.12.6 Tabel sinteză cerințe și soluții de protecție la foc

| Element/zonă | Cerință | Soluție adoptată | Verificare |
|---|---|---|---|
| Stâlpi ST, ST-M, ST-F | R60 | vopsea intumescentă (DFT conform PTh-R.12.2) | θcr=554°C atins la >60min |
| Rigle — câmp curent | R30 | vopsea intumescentă, grosime redusă | conform PTh-R.12.3 |
| Rigle — zonă nod/vută | R60 | vopsea intumescentă, grosime majorată | conform PTh-R.12.3 |
| Contravântuiri CBF + guseuri | R30 | vopsea intumescentă, grosime redusă | conform PTh-R.12.4 |
| Grinzi mezanin MZ-P/MZ-S | R60 | vopsea intumescentă groasă SAU placare 2×15mm | conform raport încercare sistem |
| Planșeu compozit mezanin | REI60 | armătură Ø10/nervură (u=35mm) | conform PTh-R.5.4 |
| Stâlpi/linteu vitrină (VT, LT) | neprotejat (element secundar, evacuare directă la parter) | — | justificat de scenariul PSI |

### PTh-R.12.7 Compartimentarea antifoc sală de vânzare/depozit marfă — interfața cu structura

Scenariul de securitate la incendiu (document separat) separă funcțional **sala de vânzare (1.480 mp)** de **depozitul de marfă (380 mp)** printr-un perete de compartimentare cu rezistență **REI 120** (cerință tipică pentru separarea unei zone cu public numeros de o zonă de depozitare cu risc de incendiu mai mare, densitate mai mare de materiale combustibile). Din perspectiva structurii de rezistență, prezentul supliment PTh tratează explicit interfața acestui perete cu cadrele metalice pe care le traversează:

- **Peretele de compartimentare** este un element de zidărie/beton armat, autoportant pe verticală (nu se reazemă pe structura metalică a halei), poziționat în dreptul unuia dintre cele 12 cadre transversale (ales din zona intermediară a halei, între sala de vânzare și depozit), cu fundație proprie continuă, independentă de fundațiile ST/ST-M ale cadrului metalic adiacent.
- **Rostul de decuplare** între peretele de compartimentare și stâlpii/rigla cadrului metalic adiacent (lățime rost ≈ 20-30 mm, umplut cu vată minerală + etanșare intumescentă) — identic principial cu soluția aplicată la zidurile de foc independente ale halelor industriale, asigură că deformația structurii metalice sub încărcare (săgeata riglei, deplasarea laterală sub seism, cap. PTh-R.11.4) **nu se transmite** ca solicitare parazită peretelui de compartimentare, care rămâne static determinat, verificat independent la acțiunea seismică proprie (perete de zidărie/beton, calcul separat, nefăcând obiectul prezentului supliment de rezistență a structurii metalice).
- **Stâlpii cadrului adiacent peretelui de compartimentare** (dacă traversează sau sunt tangenți peretelui) preiau, suplimentar față de cerința generală R60 (cap. PTh-R.12.2), o cerință de **R90** pe porțiunea aflată în imediata vecinătate a peretelui (± 1,0 m de o parte și de alta), pentru a evita un colaps local asimetric care ar solicita suplimentar peretele de compartimentare peste ipoteza lui proprie de calcul — grosimea de vopsea intumescentă pe această porțiune se majorează corespunzător (interval orientativ 1.100-1.400 µm pentru HEB400/HEB360 la R90, față de 900-1.200 µm la R60, cap. PTh-R.12.2), decizie de execuție consemnată explicit în planurile de protecție la foc pentru a evita aplicarea uniformă (și subdimensionată local) a aceleiași grosimi pe tot stâlpul.
- **Planșeul compozit al mezaninului**, dacă traversează sau este adiacent peretelui de compartimentare, respectă aceeași logică: golul de trecere (dacă există circulație între mezanin și ambele zone) se echipează cu ușă/oblon rezistent la foc EI60, coordonat cu proiectul de arhitectură și cu scenariul PSI, fără a compromite continuitatea diafragmei orizontale a planșeului (cap. PTh-R.2.1) în afara golului propriu-zis.

---

## PTh-R.13 — PROGRAM DE URMĂRIRE ÎN TIMP (P130) ȘI PROGRAM COMPLET DE PROBE

### PTh-R.13.1 Urmărirea curentă (P130/1999)

Urmărire vizuală anuală (și după evenimente deosebite: cutremur > V MSK, vânt excepțional, incendiu) a: integrității îmbinărilor înșurubate (lipsa slăbirii vizibile la nodurile rigide și la ancorajele buloanelor), stării vopselei anticorozive și intumescente (zone de coroziune incipientă, în special la baza stâlpilor și la punctele de scurgere a apelor pluviale), coroziunii galvanice la contactul oțel-beton (bază stâlp), stării rostului glisant de la interfața structură-tâmplărie a vitrinei (cap. PTh-R.4.7 — verificare specifică a jocului rezidual disponibil), comportării plăcii de pardoseală (fisuri, tasări la rosturi) și a planșeului compozit al mezaninului (fisuri, deformații vizibile). Se consemnează în **Jurnalul evenimentelor** din Cartea Tehnică a construcției.

### PTh-R.13.2 Monitorizare specifică — tasări diferențiate ale fundațiilor

Mărci de tasare pe minimum 6 fundații reprezentative (colțuri + mijlocul laturilor lungi), suplimentar pe fundațiile stâlpilor de fronton/capăt CBF (ST-F, încărcare orizontală mai mare) și pe fundațiile stâlpilor de vitrină (VT, sensibile la tasare diferențială datorită interfeței rigide cu tâmplăria). Frecvență: la fiecare etapă de montaj, apoi la 1/3/6/12 luni după finalizare, apoi anual până la stabilizare (Δs < 2 mm/an). Criteriu de alarmare: tasare diferențială Δs/L > 1/500 între fundații adiacente → notificare proiectant + expertiză, cu implicație directă asupra rostului glisant al vitrinei (o tasare diferențiată a fundației VT față de fundația ST-F ar putea consuma prematur jocul de 90 mm prevăzut, cap. PTh-R.4.7).

### PTh-R.13.3 Monitorizare specifică — rostul glisant al vitrinei și protecția anticorozivă

Verificare anuală a jocului rezidual disponibil în rostul glisant (cap. PTh-R.4.7), cu măsurare directă la interfața linteu-tâmplărie, comparată cu valoarea de la recepție (90 mm inițial). Inspecție vizuală a sistemului de vopsire (anticorozivă + intumescentă) la 5 ani, cu program de reparații locale (touch-up: sablare manuală/mecanică Sa 2½ P + refacerea integrală a sistemului pe zona reparată), în special la baza stâlpilor și la zonele de sub jgheaburi/scurgeri pluviale.

### PTh-R.13.4 Program complet de probe și încercări — materialul de bază și sudurile

| Control | Frecvență |
|---|---|
| Certificat 3.1 (compoziție, Re, Rm, alungire, KV) | fiecare lot/coladă, la recepția în atelier |
| Examinare vizuală (VT) toate sudurile | 100% |
| Ultrasunete (UT) — CJP noduri rigide, vute, capete aplatizate CBF ranforsate | 100% |
| Radiografie (RT) — prin sondaj la CJP critice | 10% |
| Calificare procedee (WPQR) și sudori (SR EN ISO 15614-1, SR EN ISO 9606-1) | înainte de producție/valabile la data execuției |

### PTh-R.13.5 Program complet de probe și încercări — șuruburi, protecție, beton

| Control | Frecvență |
|---|---|
| Certificat 3.1 lot șuruburi/piulițe/șaibe | fiecare lot |
| Control pretensionare (metoda combinată) | 100% vizual + 10% instrumental prin sondaj |
| DFT (grosime peliculă uscată) | min. 10 puncte/element, criteriu 80/20 |
| Aderență (pull-off) | 1/500 mp sau per element critic |
| Certificat reacție la foc vopsea intumescentă | per lot, corelat cu profilul/masivitatea reală |
| Consistență beton la fiecare transport | 100% transporturi |
| Rezistență compresiune (seturi 3 cuburi) | 1 set/50 mc sau/element sau/zi turnare |
| Portanță strat balast sub placa de pardoseală (Ev2) | placă de încărcare, min. 1 punct/500 mp |

### PTh-R.13.6 Probă de verificare a rostului glisant la punerea în funcțiune

Suplimentar față de programul curent de probe pentru structuri metalice (secțiunile precedente), se efectuează o **probă specifică de recepție a interfeței structură-tâmplărie**: verificare topografică a poziției finale a linteului vitrinei (după stabilizarea completă a structurii sub greutate proprie), măsurarea jocului disponibil în rostul glisant (trebuie să confirme cel puțin 65 mm din cei 90 mm proiectați, corespunzător săgeții de calcul a riglei — restul de 25 mm fiind marja de siguranță/toleranțe), consemnată în procesul-verbal de recepție a structurii metalice (cap. PTh-R.9, FD5).

### PTh-R.13.7 Documente de conformitate arhivate la Cartea Tehnică

Certificate materiale 3.1, rapoarte END (VT/UT/RT), fișe de pretensionare șuruburi, rapoarte DFT/aderență vopsea, procese-verbale de fază determinantă, buletine de încercare beton, raport topografic final de as-built (poziții reale vs. proiect, cu abateri consemnate), procesul-verbal al probei de verificare a rostului glisant (cap. PTh-R.13.6).

---

## PTh-R.14 — BREVIAR COMPLET DE ÎNCĂRCĂRI ȘI COMBINAȚII — TOATE CADRELE

### PTh-R.14.1 Acțiuni permanente (G) — recapitulare cu valori actualizate din PTh-R.3

| Element | gk |
|---|---|
| Acoperiș (panou sandwich + pane diferențiate pe zone + instalații suspendate) | 0,48 kN/mp (DTAC §6.1, neschimbat) |
| Perete (panou sandwich + rigle de perete) | 0,24 kN/mp (neschimbat) |
| Greutate proprie structură metalică (recalculată din extrasul de materiale, PTh-R.3.2: 77,3 t/2.100 mp) | 0,368 kN/mp *(vs. valoarea generică estimată la DTAC §6.1 — se recomandă utilizarea valorii PTh la rularea finală a modelului EF)* |
| Planșeu compozit mezanin (tablă cutată + 10 cm beton, cap. PTh-R.5.4) | 2,85 kN/mp |

### PTh-R.14.2 Acțiuni variabile (Q) — neschimbate față de DTAC

Zăpadă `sk = 2,50 kN/mp` (μ1=0,8, teren III); vânt `qb = 0,60 kN/mp` (cpe diferențiat pe zone, cap. PTh-R.2.8-2.9); utilă acoperiș 0,40 kN/mp; utilă sală de vânzare 5,0 kN/mp; utilă depozit marfă 12,5 kN/mp; utilă mezanin 3,0+0,8 kN/mp (birouri/depozitare ușoară + pereți despărțitori mobili); temperatură ΔT=±35°C.

### PTh-R.14.3 Combinații SLU — tabel unificat pe toate cadrele

| Combinație | Cadru curent (8) | Cadru marginal mezanin (2) | Cadru fronton/capăt (2) | Cadru vitrină (axa 1) |
|---|---|---|---|---|
| C1 gravitațional (1,35G+1,5Q) | NEd=620, MEd=385 | NEd=705, MEd=430 | NEd=540, MEd=310 | NEd=560, MEd=345 |
| C2 ridicare (vânt succiune, defavorabil) | NEd redus, MEd majorat local | idem, + verificare consolă mezanin | idem, + verificare ancoraj CBF | idem, + verificare linteu (PTh-R.2.9) |
| C3 seismică (G+ψ2Q±E) | NEd=350 (redus), MEd=480 | NEd=410, MEd=560 | NEd,capacitate CBF=987 (PTh-R.2.7) | NEd=560, MEd,total=354 (cu excentricitate linteu) |

### PTh-R.14.4 Exemplu numeric suplimentar — verificarea combinată a stâlpului de fronton (HEB360) la toate cele 3 combinații

Combinația gravitațională (C1): NEd=540, MEd=310 → interacțiune `0,170+0,325=0,495` (cap. PTh-R.2.5). Combinația seismică cu efort de capacitate CBF (C3): NEd=987 (efort majorat prin proiectare capacitivă, cap. PTh-R.2.7) → `Nb,Rd=3.180 kN → n=987/3.180=0,310`; MEd redus la această combinație (traveea contravântuită are rigiditate laterală suplimentară, MEd≈300 kNm estimat conservator) → interacțiune `0,310+kyy·300/(χLT·953)≈0,310+0,315=**0,63 ≤ 1,0 → ✓**`. Combinația guvernantă rămâne cea seismică cu efort de capacitate (0,63 > 0,495 gravitațional), confirmând necesitatea secțiunii HEB360 (nu ar fi suficientă o secțiune mai zveltă, chiar dacă efortul gravitațional singur ar permite-o).

### PTh-R.14.5 Tabel centralizator utilizări — toate elementele critice, reverificate la PTh

| Element | Verificare guvernantă | Utilizare | Verdict |
|---|---|---|---|
| Stâlp curent HEB400 | interacțiune N-M | 0,48 | ✓ |
| Stâlp marginal mezanin HEB400 | interacțiune N-M | 0,56 | ✓ |
| Stâlp fronton/capăt HEB360 | interacțiune N-M (seismic, capacitate CBF) | 0,63 | ✓ |
| Stâlp cadru vitrină HEB360 | interacțiune N-M (cu excentricitate linteu) | 0,55 | ✓ |
| Riglă (câmp/vută) | încovoiere+deversare | 0,74 (DTAC §7.2) | ✓ |
| Nod rigid curent (placă 280×700×30) | metoda componentelor | 0,92 (marginal mezanin) | ✓ |
| Nod rigid fronton/vitrină (placă unificată) | metoda componentelor | 0,83 | ✓ |
| Splice riglă | metoda componentelor | 0,87 | ✓ |
| Guseu diagonală CBF (ranforsat) | secțiune netă | 0,95 | ✓ (la limită, verificare suplimentară recomandată la execuție) |
| Pană Z250×3,0 (zonă colț) | încovoiere sub succiune | 0,82 | ✓ |
| Linteu vitrină HEA300 | săgeată (criteriu tâmplărie) | 0,16 | ✓ |
| Grindă de echilibrare (fronton/capăt) | întindere axială | 0,84 | ✓ |
| Planșeu compozit mezanin | REI60 | conform PTh-R.5.4/R.12.5 | ✓ |

### PTh-R.14.6 Exemplu numeric suplimentar — verificarea combinată a stâlpului marginal de mezanin (HEB400) la toate combinațiile relevante

Stâlpul cadrului marginal de mezanin (§PTh-R.2.4) este verificat, în cele ce urmează, la cele trei combinații din tabelul PTh-R.14.3, pentru a ilustra care dintre ele guvernează efectiv dimensionarea — exercițiu util pentru planul de verificare a modelului EF final (cap. PTh-R.15.3, recomandarea 1).

**C1 — gravitațională** (1,35G+1,5Q, inclusiv reacțiunea planșeului compozit prin consola de la +3,50 m, cap. PTh-R.2.4): `NEd=705 kN, MEd=430 kNm` → interacțiune `705/(0,72·3.862) + 0,95·430/(0,85·1.147) = 0,254 + 0,420 = **0,67**` *(valoare recalculată aici cu factorii de flambaj/deversare expliciți χ≈0,72 și χLT≈0,85, ușor diferită de valoarea de sinteză 0,56 raportată la §PTh-R.2.4, care folosea o formă simplificată a interacțiunii — ambele confirmă totuși satisfacerea criteriului, diferența provenind din nivelul de detaliere al formulei de interacțiune 6.61 aplicate, nu dintr-o eroare; se reține pentru execuție valoarea mai conservatoare, 0,67)*.

**C2 — ridicare** (vânt succiune pe zona de mezanin, combinație defavorabilă pentru ancorajele fundației ST-M): `NEd≈−95 kN` (ridicare netă, redusă de greutatea proprie a planșeului compozit care contrabalansează parțial succiunea) → verificare la smulgere a buloanelor de ancoraj PB-01 (M27 gr.8.8, cap. PTh-R.4.6): forța de smulgere pe grup `≈95/4=23,75 kN/bulon ≪ Ft,Rd(M27 gr.8.8)≈204 kN → **✓, rezervă foarte amplă**`.

**C3 — seismică** (G+ψ2Q±E, cu componenta seismică a reacțiunii mezaninului): `NEd=410 kN, MEd=560 kNm` → interacțiune `410/(0,72·3.862) + 0,95·560/(0,85·1.147) = 0,148 + 0,547 = **0,70**`.

**Concluzie locală:** combinația seismică (0,70) guvernează marginal față de cea gravitațională (0,67), diferență de doar 4%, ceea ce confirmă că stâlpul cadrului marginal de mezanin este dimensionat de o combinație aproape echilibrată între acțiunea gravitațională majorată de reacțiunea planșeului compozit și acțiunea seismică — motiv suplimentar pentru care secțiunea HEB400 (identică restului structurii, cap. PTh-R.2.3) rămâne alegerea corectă, fără a fi necesară o majorare de secțiune specifică acestor 2 cadre, spre deosebire de cadrele de fronton/capăt CBF (unde diferența dintre combinația seismică de capacitate și cea gravitațională era mult mai mare, cap. PTh-R.2.7, justificând acolo secțiunea HEB360 dedicată).

---

## PTh-R.15 — SINTEZA CORECȚIILOR PTh FAȚĂ DE DTAC + CONCLUZIE INGINEREASCĂ

### PTh-R.15.1 Sinteza corecțiilor de proiectare aduse de faza PTh față de predimensionarea DTAC

| Element/aspect | Predimensionare DTAC | Corecție/detaliere PTh | Motiv |
|---|---|---|---|
| Configurație generală deschidere | opțiune deschisă (travee unică sau cu stâlp median) | **travee unică 20,00 m, fără stâlp median** (cap. PTh-R.1) | breviarul de predimensionare confirmă utilizare confortabilă (0,48-0,56) fără stâlp median; incompatibil cu vizibilitatea sălii de vânzare |
| Nod rigid riglă-stâlp, cadre de fronton/vitrină | estimare inițială cu placă redusă M24 | **placă unificată 280×700×30 + M27, identică cadrelor curente** | verificare component cu component a arătat insuficiență la cadrul vitrinei (utilizare 1,22 cu configurația inițială) |
| Guseu diagonală CBF | tratat generic, la NEd elastic | **capăt aplatizat ranforsat cu doubler 6mm + 4×M20, verificat la efortul de capacitate (1.448 kN)** | calculul de capacitate al elementelor nedisipative (proiectare capacitivă) |
| Înnădire de transport a riglei | neexplicitat (riglă tratată continuu la DTAC) | **splice la ≈5,00m de nod, placă 280×850×28mm, 12×M27/tronson** | cerință de transport (deschidere 20m > gabarit rutier) |
| Greutate proprie structură metalică | estimare generică | **0,368 kN/mp (din extras de materiale real, PTh-R.3)** | contabilizare exactă — recomandată rerulare model la finalizarea planurilor de execuție |
| Grinzi de echilibrare (tiranți fundații) | menționate calitativ la DTAC | **secțiune 40×60cm, armare cuantificată pe cele 3 categorii de cadru (4Ø12/4Ø12/4Ø14)** | cerință de execuție, transferul efectiv al împingerii orizontale la baza articulată |
| Rostul glisant structură-tâmplărie vitrină | menționat calitativ (necesitate identificată la DTAC §7.2/§9.x) | **joc cuantificat ≥ 90mm (65mm săgeată + 25mm rezervă), detaliu de execuție complet (cap. PTh-R.4.7)** | coordonare cantitativă cu arhitectura/producătorul de tâmplărie |
| Rezistență la foc, extindere pe toate elementele | cerințe calitative (R60 stâlpi, R30-60 rigle, REI60 mezanin, R30 CBF) | **grosimi de vopsea intumescentă cuantificate pe fiecare categorie de profil (cap. PTh-R.12)** | trecere de la cerință normativă la soluție de execuție verificabilă |

### PTh-R.15.2 Tabel centralizator conformitate — toate verificările suplimentare PTh

| Categorie | Verificare | Rezultat |
|---|---|---|
| Îmbinări | Nod rigid curent/marginal mezanin, fronton/vitrină, splice, guseu CBF | ✓ (după corecțiile PTh-R.4) |
| SLS vibrații | Planșeu mezanin, f1=6,0Hz | ✓ (>4,5Hz) |
| SLS deplasări | Drift la cota mezaninului, 0,0017<0,010 | ✓ |
| SLS deformații | Săgeată linteu vitrină, 3,2mm<20mm | ✓ |
| Foc | Stâlpi R60, rigle R30-60, CBF R30, planșeu mezanin REI60 | ✓ (după soluțiile PTh-R.12) |
| Execuție | Toleranțe montaj, EXC2/EXC3 local, rost glisant vitrină | conform SR EN 1090-2 + detaliu PTh-R.4.7 |
| Faze determinante | 8 faze, inclusiv montaj vitrină și planșeu mezanin | conform PTh-R.9 |

### PTh-R.15.3 Concluzie inginerească

Structura metalică a spațiului comercial de referință (Ac=2.100 mp, deschidere unică 20,00 m, 12 travee de 6,00 m, mezanin parțial compozit 240 mp, vitrină comercială principală de 18,00 m), verificată integral la predimensionare în faza DTAC, a fost **detaliată la nivel de execuție** în prezentul supliment PTh: breviar de calcul extins la toate cele 12 cadre și la particularitățile lor (cadre curente, marginale de mezanin, de fronton, cadrul vitrinei), extras complet de materiale pe repere (≈77,3 t oțel structural + ≈474 mc beton + ≈23,0 t armătură), îmbinări dimensionate prin metoda componentelor (noduri rigide, splice de transport, guseu de contravântuire, placă de bază, interfața cu vitrina), caiet de armare pentru toate elementele de beton, tehnologie de execuție în atelier/montaj și pentru elementele de beton, plan de control al calității, faze determinante, coordonare cu arhitectura și instalațiile, verificări suplimentare la SLS, calcul la foc detaliat, program de urmărire în timp și de probe.

Analiza detaliată a evidențiat **patru corecții de proiectare** față de predimensionarea DTAC (unificarea nodului rigid la cadrele de fronton/vitrină, ranforsarea guseului CBF, introducerea explicită a înnădirii de transport a riglei, cuantificarea rostului glisant al vitrinei), toate documentate cu verificare numerică și motivate tehnic la §PTh-R.15.1 — corecții normale și așteptate la trecerea de la faza de predimensionare (DTAC) la faza de execuție (PTh), care nu invalidează soluția de ansamblu, ci o consolidează. Se recomandă, înainte de finalizarea planurilor de execuție: (1) rularea modelului EF final cu greutatea proprie actualizată a structurii metalice (0,368 kN/mp vs. valoarea generică estimată la DTAC), (2) confirmarea parametrilor de amplasament reali (ag, TC, sk, qb, pconv) cu harta de zonare P100-1/CR 1-1-3/CR 1-1-4 și studiul geotehnic definitiv al amplasamentului efectiv, (3) confirmarea grosimilor de vopsea intumescentă cu raportul de clasificare la foc al sistemului efectiv ales de antreprenor, (4) coordonarea finală a rostului glisant al vitrinei cu producătorul efectiv de tâmplărie, pentru a confirma compatibilitatea jocului de 90 mm cu sistemul de profile ales de arhitectură.

Documentația necesită verificare tehnică de către verificatori atestați MDLPA pe cerințele **Af** (rezistență mecanică — structuri metalice, obligatoriu), **A1** (rezistență mecanică — fundații/beton, placă pardoseală, mezanin compozit) și **Ci** (securitate la incendiu), conform Legii 10/1995 și HG 925/1995.

---

*Prezentul supliment de fază PTh-Rezistență (cap. PTh-R.1-PTh-R.15) completează faza DTAC (`structura.md`) și se citește împreună cu planurile de montaj și de atelier și cu Caietul de sarcini pentru structuri metalice și de beton armat (document distinct). Toate valorile numerice sunt exemple de dimensionare pentru un spațiu comercial de referință (Ac=2.100 mp, deschidere 20,00 m, mezanin parțial 240 mp, vitrină principală 18,00 m) și se confirmă/ajustează în urma rulării finale a modelului EF pe geometria reală a proiectului, a studiului geotehnic definitiv al amplasamentului și a alegerii efective a sistemelor de protecție (vopsire anticorozivă/intumescentă) și a tâmplăriei de fațadă de către antreprenorul de execuție și producătorul de vitrine.*
