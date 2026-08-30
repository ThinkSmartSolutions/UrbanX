## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic + Detalii de Execuție) la Memoriul de rezistență DTAC (`structura.md`), elaborat conform **HG nr. 907/2016** privind conținutul-cadru al documentațiilor tehnico-economice. El aprofundează faza DTAC deja redactată — sistem structural (Varianta A, zidărie portantă confinată CR 6/2013, cu Varianta B alternativă în cadre de beton armat), materiale, acțiuni (seism, zăpadă, vânt), studiu geotehnic, calculul seismic prin metoda forțelor laterale echivalente, verificările de compresiune/forfecare/încovoiere ale pereților structurali, infrastructura pe tălpi continue și suprastructura (planșee, scară, șarpantă) — aducând structura la nivelul de detaliere necesar **EXECUȚIEI PE ȘANTIER**: planuri de armare cotate pentru toate elementele de beton armat (fundații, sâmburi, centuri, buiandrugi, planșee), extras de materiale (beton, oțel-beton, cofraje, zidărie), tehnologia de execuție (succesiune zidărie→confinare→planșeu, condiții de mediu, timpi de așteptare), planul de control al calității pe faze determinante și puncte de verificare a lucrărilor ascunse (PVLA — cu accent explicit pe armarea stâlpișorilor/centurilor și pe betonare, conform cerinței de proiectare), toleranțele de execuție SR EN și procedura de recepție.

Obiectivul de investiție: **locuință individuală (unifamilială)**, regim de înălțime **P+1E**, fără subsol, pod nelocuit ventilat sub șarpantă, dimensiuni în plan (ax-ax) **10,60 × 9,00 m**, suprafață construită **Sc ≈ 95,4 mp/nivel**, suprafață construită desfășurată **Scd ≈ 190,8 mp**, amplasament de referință **Iași/NE România** (`ag = 0,20g`, `TC = 0,70 s` — P100-1/2013; `sk = 2,00 kN/mp` — CR 1-1-3/2012; adâncime de îngheț `≈ 0,90 m` — STAS 6054/77; `pconv = 200 kPa` — studiu geotehnic exemplu), categoria de importanță **D** (redusă, HG 766/1997), clasa de importanță și expunere seismică **III** (`γI,e = 1,00`, P100-1/2013), clasa de consecințe **CC1→CC2** (`KFI = 1,00`, SR EN 1990 Anexa B), grad de rezistență la foc **II–III**. Structura de rezistență adoptată la faza DTAC și dezvoltată integral aici este **Varianta A — zidărie portantă confinată** (pereți din cărămidă GVP/BCA cu sâmburi și centuri de beton armat conform CR 6/2013), cu **Varianta B — cadre de beton armat cu umplutură nestructurală** păstrată ca alternativă documentată pentru situația în care beneficiarul solicită explicit un parter parțial deschis (garaj integrat, living panoramic).

Documentul de față **nu reia** justificarea alegerii sistemului structural, comparația celor patru variante analizate, predimensionarea seismică pas cu pas sau breviarul de calcul de principiu (permanente pe m², forța seismică de bază, densitatea minimă de pereți) — toate acestea sunt tratate integral în memoriul DTAC (`structura.md`, cap. 1–14) și se presupun cunoscute; trimiterile de tipul „conform structura.md, cap. X" indică unde se găsește soluția de principiu corespunzătoare, fără reproducerea ei. De asemenea, nu se reiau alcătuirile de arhitectură (finisaje, ETICS, tâmplărie, hidroizolații de anvelopă), tratate integral în `arhitectura-pth.md`, la care prezentul document face trimitere pentru toate interfețele structură-arhitectură (poziția centurilor față de ETICS, ancorarea cosoroabei, compartimentarea garaj-locuință). Ceea ce urmează este exclusiv **nivelul de execuție al structurii de rezistență**: planuri de armare cotate poziție cu poziție, extras de materiale, tehnologie de punere în operă, toleranțe admise și plan de control al calității pe faze determinante.

Structura capitolelor prezentului supliment:

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Breviar de calcul extins — verificări pe toate pozițiile de sâmburi, centuri și buiandrugi (nu doar elementul-tip din DTAC), pe toate cele patru laturi ale conturului și pe pereții interiori |
| PTh-R.3 | Extras de materiale — beton, oțel-beton, cofraje, zidărie, pe fiecare categorie de element (bill of quantities) |
| PTh-R.4 | Planuri de armare cotate — fundație, sâmburi, centuri, buiandrugi, planșee, scară, ancoraje șarpantă |
| PTh-R.5 | Tehnologia de execuție — succesiunea zidărie→ștrepi→sâmburi→centură→planșeu, cofrare, armare, betonare, condiții de mediu |
| PTh-R.6 | Plan de control al calității — armarea și betonarea sâmburilor/centurilor (PVLA obligatoriu), controlul betonului, zidăriei, oțelului |
| PTh-R.7 | Faze determinante |
| PTh-R.8 | Toleranțe de execuție (SR EN 13670, SR EN 1996-2, cofraje, verticalitate, planeitate) |
| PTh-R.9 | Calculul cofrajelor și al susținerilor provizorii (popi de planșeu, cofraj sâmburi/centuri, presiuni pe cofraj) |
| PTh-R.10 | Tehnologia de execuție pe timp friguros și pe timp călduros — zidărie și beton |
| PTh-R.11 | Programul complet de probe și încercări (beton, oțel-beton, zidărie, teren de fundare) |
| PTh-R.12 | Verificări suplimentare la starea limită de serviciu — controlul fisurării, vibrațiile planșeului, contrasăgeți |
| PTh-R.13 | Program de urmărire în timp, recepția lucrărilor de structură și cartea tehnică |
| PTh-R.14 | Sinteza corecțiilor de proiectare PTh față de predimensionarea DTAC + concluzie inginerească |

### PTh-R.1.1 Date generale de proiectare (recapitulare parametri de bază, preluați identic din DTAC)

| Parametru | Valoare | Sursă |
|---|---|---|
| Regim de înălțime | P+1E, fără subsol | structura.md §1.2 |
| Dimensiuni în plan (ax-ax) | 10,60 × 9,00 m | structura.md §1.2 |
| Sistem structural adoptat | Zidărie portantă confinată (Varianta A) | structura.md §2.2, §7 |
| Zidărie exterioară / interioară | GVP/BCA, `fb = 10,0 N/mm²`, mortar M5, `t = 30 cm` / `t = 25 cm` | structura.md §3.1 |
| `fk` zidărie / `fd` (fundamental) / `fd` (seismic) | 3,65 / 1,66 / 2,43 N/mm² | structura.md §3.1 |
| Beton sâmburi/centuri | C16/20, `fcd = 10,67 N/mm²` | structura.md §3.2 |
| Beton planșee/fundații | C20/25, `fcd = 13,33 N/mm²` | structura.md §3.2 |
| Oțel-beton | B500C, clasa de ductilitate C, `fyd = 434,8 N/mm²` | structura.md §3.3 |
| Sâmburi | 25×25 cm, `4Ø12`, etrieri `Ø6/100–150` | structura.md §7.2 |
| Centuri | 25×25 cm, `4Ø12`, etrieri `Ø6/150` | structura.md §7.3 |
| Buiandrugi | 25×25 cm (h variabil), `3Ø12+2Ø10`, etrieri `Ø6/150` | structura.md §7.4 |
| Planșee | h = 14 cm, C20/25, `Ø8/150` ambele direcții | structura.md §10.1 |
| Fundație (talpă continuă) | `B×H = 0,80×0,80 m`, `Df = 1,00 m`, `4Ø14` + `Ø8/200` | structura.md §9.3–9.4 |
| Factor de comportare `q` | 2,5 (zidărie confinată) | structura.md §6.1 |
| `ag` / `TC` (amplasament exemplu) | 0,20g / 0,70 s | P100-1/2013 |
| `sk` (zăpadă la sol, exemplu) | 2,00 kN/m² | CR 1-1-3/2012 |
| `pconv` teren | 200 kPa | studiu geotehnic exemplu, NP 112 |
| Densitate pereți realizată X / Y | 5,83% / 7,17% (min. 4,0%) | structura.md §6.5 |
| Categoria de importanță | D (redusă) | HG 766/1997 |
| Clasa de importanță/expunere | III (`γI,e = 1,00`) | P100-1/2013 |
| Clasa de execuție zidărie | Categorie de execuție B, control fabricație I | CR 6/2013 |
| Clasa de execuție beton armat | EXC1/EXC2 (element curent/critic) | SR EN 1090 (analog, prin SR EN 13670) |

### PTh-R.1.2 Cadrul normativ de execuție (suplimentar față de cadrul de reglementare DTAC)

| Domeniu | Act normativ | Rol la faza PTh |
|---|---|---|
| Calitate în construcții | Legea 10/1995 | Cerințe fundamentale — se detaliază prin proceduri de control (PTh-R.6) |
| Conținut documentații tehnico-economice | HG 907/2016 | Structura pieselor scrise/desenate PTh |
| Autorizare | Legea nr. 169/2026 (CATUC) | Conformitatea PTh cu autorizația emisă pe baza DTAC |
| Execuția construcțiilor din beton, beton armat și beton precomprimat | SR EN 13670 + CP 012/1-2007 | Toleranțe, cofrare, armare, betonare, decofrare |
| Producerea și executarea lucrărilor din beton | NE 012-1/2007, NE 012-2/2010 | Compoziție beton, transport, punere în operă, tratare |
| Proiectarea structurilor de beton | SR EN 1992-1-1/NA | Ancoraje, înnădiri, acoperiri, procente minime de armare |
| Proiectarea structurilor de zidărie | SR EN 1996-1-1/NA, SR EN 1996-2 | Execuția zidăriei, toleranțe, control |
| Cod de proiectare pentru structuri din zidărie | CR 6/2013 | Alcătuirea și execuția sâmburilor/centurilor de confinare |
| Proiectare seismică | P100-1/2013 | Interfața zidărie-confinare la faza de execuție |
| Documentații geotehnice | NP 074/2014 | Confruntarea execuției fundației cu studiul geotehnic |
| Fundații de suprafață | NP 112/2014 | Verificarea la execuție a cotei și dimensiunilor tălpii |
| Adâncimi de îngheț | STAS 6054/77 | Confirmarea cotei de fundare la trasare |
| Armătură pentru beton — mărci și clase | SR EN 10080, SR 438/1-3 | Recepția și marcarea oțelului-beton |
| Cimenturi | SR EN 197-1 | Recepția cimentului la stația de betoane/șantier |
| Beton — specificație, performanță, producție, conformitate | SR EN 206 + CP 012 | Clase de expunere, dozaje, buletine de încercare |
| Beton — recepția pe șantier | NE 012-2/2010 cap. 12-14 | Prelevare probe, condiții de întărire, decofrare |
| Securitatea la incendiu | P118-1/2013, P118-2/2013, P118-3/2015 | Acoperiri de beton și grosimi minime verificate la execuție |
| Recepția lucrărilor de construcții | HG 273/1994, Normativ C56/2002 | Recepția pe faze și la terminarea lucrărilor |
| Urmărirea comportării în timp a construcțiilor | P130/1999, Legea 10/1995 | Programul de urmărire curentă (PTh-R.13) |
| Cerințe de proiectare seismică a lemnului | SR EN 1995-1-1 | Ancorarea și execuția șarpantei (interfață cu structura) |
| Sudarea armăturilor | SR EN ISO 17660-1/-2 | Dacă se folosesc înnădiri sudate (excepțional, nu soluția de bază) |
| Verificarea tehnică a proiectelor | Legea 10/1995, HG 925/1995 | Cerințele A1/Af, verificatori atestați MDLPA |

### PTh-R.1.3 Principii transversale aplicate în toate detaliile de rezistență

1. **Succesiunea zidărie→sâmbure este obligatorie și ireversibilă la execuție** — sâmburii se toarnă întotdeauna după ridicarea zidăriei adiacente pe toată înălțimea nivelului (structura.md §7.2), niciodată invers; această succesiune, deja stabilită ca principiu la DTAC, este dezvoltată aici ca punct de control explicit (PTh-R.6, PTh-R.7) și ca etapă distinctă în graficul de execuție (PTh-R.5).
2. **Continuitatea centurii ca inel închis** se verifică la fiecare colț și la fiecare intersecție cu pereții interiori portanți — orice întrerupere a inelului compromite efectul de diafragmă rigidă (structura.md §7.3); planurile de armare (PTh-R.4) cotă cu cotă indică explicit suprapunerile la colțuri.
3. **Interfața cu instalațiile precede finisarea, dar NU precede structura** — traseele verticale de instalații care traversează sâmburi/centuri/planșee se rezolvă exclusiv prin manșoane/piese de trecere prevăzute la cofrare (coordonare cu `instalatii.md`), niciodată prin spargere ulterioară a betonului armat.
4. **Toate lucrările care devin ascunse la turnare** (armătură, poziția manșoanelor, ștrepii zidăriei) se fotografiază și se consemnează în PVLA înainte de acoperire (PTh-R.6), condiție obligatorie pentru cartea tehnică a construcției.

---

## PTh-R.2 — BREVIAR DE CALCUL EXTINS (TOATE POZIȚIILE DE SÂMBURI, CENTURI ȘI BUIANDRUGI)

### PTh-R.2.1 Convenții și metodologie

DTAC (`structura.md` §7) a verificat elementul reprezentativ al fiecărei categorii — peretele median cel mai solicitat la compresiune și forfecare (§7.5, §7.6), sâmburele-tip și centura-tip (§7.2, §7.3) — pe baza cărora s-a stabilit soluția constructivă unică (secțiune 25×25 cm, `4Ø12`, pentru toți sâmburii și toate centurile). Prezentul breviar extinde verificarea la **toate pozițiile efective** ale sâmburilor și buiandrugilor rezultate din planul de arhitectură (`arhitectura.md`, tablourile de tâmplărie F1…F14 și U1…U10 din `arhitectura-pth.md` §PTh-A.3), pentru a stabili definitiv armarea fiecărei poziții individuale, nu doar a elementului înfășurătoare.

Se păstrează identic sistemul de axe din DTAC (axele 1÷3 longitudinale, interax variabil 4,50–6,10 m; axele A÷C transversale, interax 4,50 m, perete median pe axa B — structura.md §1.2).

### PTh-R.2.2 Inventarul complet al sâmburilor de beton armat

Poziționarea obligatorie conform CR 6/2013 §5.4 (structura.md §7.2) — colțuri, intersecții de pereți, capete libere, goluri > 1,50 m, interax maxim 4,0–5,0 m — se aplică punctual pe conturul și pereții interiori ai locuinței, rezultând **16 poziții de sâmburi** pe cele două niveluri (parter + etaj, secțiune identică pe verticală, continuă de la fundație la centura superioară):

| Poz. | Amplasare | Motiv de poziționare (CR 6 §5.4) | Secțiune | Armătură | Observație |
|---|---|---|---|---|---|
| S1 | Colț 1-A (colț SV) | Colț de clădire | 25×25 | 4Ø12 | etrieri Ø6/100 pe 45 cm capete |
| S2 | Colț 1-C (colț NV) | Colț de clădire | 25×25 | 4Ø12 | idem |
| S3 | Colț 3-A (colț SE) | Colț de clădire | 25×25 | 4Ø12 | idem |
| S4 | Colț 3-C (colț NE) | Colț de clădire | 25×25 | 4Ø12 | idem |
| S5 | Intersecție 2-A (perete median ax 2 cu fațada A) | Intersecție de pereți (formă T) | 25×25 | 4Ø12 | — |
| S6 | Intersecție 2-C (perete median ax 2 cu fațada C) | Intersecție de pereți (formă T) | 25×25 | 4Ø12 | — |
| S7 | Intersecție B-1 (perete median ax B cu fațada 1) | Intersecție de pereți (formă T) | 25×25 | 4Ø12 | — |
| S8 | Intersecție B-3 (perete median ax B cu fațada 3) | Intersecție de pereți (formă T) | 25×25 | 4Ø12 | — |
| S9 | Intersecție B-2 (cruce, cele 2 pereți mediani) | Intersecție de pereți (formă de cruce) | 25×25 | 4Ø12 | armătură suplimentară de conexiune Ø6 la 2-3 rânduri, ambele direcții |
| S10 | Capăt liber perete compartimentare garaj (dacă varianta cu garaj e adoptată, D12 arhitectura-pth) | Capăt liber de perete | 25×25 | 4Ø12 | coordonat cu ușa EI 30 (U4) |
| S11/S12 | De o parte și de alta a golului ferestrei F1+F2 (fațada sud, lățime cumulată gol > 1,5 m) | Gol mare | 25×25 | 4Ø12 | interax față de S1/S5 verificat ≤ 5,0 m |
| S13/S14 | De o parte și de alta a golului ușii glisante HS (U2, 3,00 m, fațada sud/vest) | Gol mare | 25×25 | 4Ø12 | interax verificat, gol critic — vezi PTh-R.2.5 |
| S15/S16 | De o parte și de alta a golului ușii secționale garaj (U3, 2,50 m, dacă varianta cu garaj) | Gol mare | 25×25 | 4Ø12 | armătură buiandrug/centură majorată local — PTh-R.2.5 |

**Verificarea interax-ului maxim între sâmburi consecutivi** (CR 6, limita 4,0–5,0 m, structura.md §7.2): pe fațada sud (cea mai încărcată de goluri, cu F1, F2, F3 și eventual U2), distanța S11→S13 (dacă ambele guri de fereastră/ușă HS sunt pe aceeași fațadă) se verifică explicit la faza PT pe planul de arhitectură definitiv; dacă interax-ul rezultat depășește 5,0 m, se introduce un sâmbure suplimentar intermediar (poziție S11bis), decizie care se ia pe planul de execuție finalizat, nu generic în acest memoriu. Pe pereții median și pe fațadele nord/est/vest, cu goluri mai mici și mai rare (F4…F14 din tabloul PTh-A.3), interax-ul rezultat din pozițiile S1…S9 este sub 4,50 m (egal cu interax-ul axelor de bază), deci **nu sunt necesari sâmburi suplimentari** pe aceste laturi.

### PTh-R.2.3 Inventarul complet al centurilor de beton armat

Centurile formează un inel închis pe conturul și pe pereții interiori portanți, la fiecare nivel (cota `+3,00 m` peste parter, cota `+5,95 m` peste etaj — structura.md §7.3):

| Tronson | Traseu | Lungime brută (m) | Observație |
|---|---|---|---|
| C-ext-1 | Fațadă A (sud), axa A, între colțurile 1-A și 3-A | 10,60 | continuă cu C-ext-2 și C-ext-4 la colțuri |
| C-ext-2 | Fațadă 3 (est), axa 3, între colțurile 3-A și 3-C | 9,00 | idem |
| C-ext-3 | Fațadă C (nord), axa C, între colțurile 3-C și 1-C | 10,60 | idem |
| C-ext-4 | Fațadă 1 (vest), axa 1, între colțurile 1-C și 1-A | 9,00 | idem |
| C-int-1 | Perete median longitudinal, axa B, între fațada 1 și fațada 3 | 10,60 | monolit cu C-ext-2 și C-ext-4, trece prin S9 |
| C-int-2 | Perete median transversal, axa 2, între fațada A și fațada C | 9,00 | monolit cu C-ext-1 și C-ext-3, trece prin S9 |
| **Total lungime centură/nivel** | | **≈ 58,8 m** | ×2 niveluri = 117,6 m total (structura.md §13.3) |

**Continuitatea la colțuri** (structura.md §7.3): suprapunere minimă 60 cm pe fiecare direcție, cu bare de colț îndoite la 90° (nu simple suprapuneri drepte), la toate cele 4 colțuri exterioare și la ambele intersecții cu pereții mediani (poziția S9, nod de cruce — armătura celor 4 tronsoane care converg în acest punct se detaliază explicit la PTh-R.4.3, cu bare continue pe direcția principală și bare de conexiune ancorate `≥ 50·Ø` pe direcția secundară).

### PTh-R.2.4 Inventarul buiandrugilor pe fiecare gol din tabloul de tâmplărie

DTAC (structura.md §7.4) a stabilit secțiunea și armarea de principiu pentru buiandrugii curenți (25×25 cm, `3Ø12+2Ø10`, pentru goluri până la 1,50–1,80 m). Se detaliază aici, pe baza tabloului de tâmplărie complet din `arhitectura-pth.md` §PTh-A.3.1–3.2, dimensionarea individuală a fiecărui gol:

| Poz. tâmplărie | Deschidere gol liberă (m) | Categorie buiandrug | Secțiune adoptată | Armătură | Rezemare pe zidărie |
|---|---|---|---|---|---|
| F1 (2,40 m) | 2,40 | majorat (>1,80 m) | 25×35 cm | 3Ø14+2Ø12 | ≥ 25 cm fiecare parte |
| F2, F3 (1,80 m) | 1,80 | curent (limită superioară) | 25×25 cm | 3Ø12+2Ø10 | ≥ 25 cm |
| F4, F7, F10, F13 (1,20–1,50 m) | 1,20–1,50 | curent | 25×25 cm | 3Ø12+2Ø10 | ≥ 25 cm |
| F5, F6, F9, F12, F14 (0,50–0,90 m) | ≤ 0,90 | redus (gol mic) | 25×20 cm | 2Ø12+2Ø10 | ≥ 25 cm |
| F8, F11 (0,80–0,90 m) | 0,80–0,90 | redus | 25×20 cm | 2Ø12+2Ø10 | ≥ 25 cm |
| U1 (1,00 m) | 1,00 | curent | 25×25 cm | 3Ø12+2Ø10 | ≥ 25 cm |
| U2 — ușă glisantă HS (3,00 m, 2 canate) | 3,00 | **majorat, calcul individual** | 30×40 cm | 4Ø16+2Ø14 | ≥ 30 cm (majorat față de minimul de 25 cm) |
| U3 — ușă secțională garaj (2,50 m) | 2,50 | **majorat, calcul individual** | 30×35 cm | 4Ø16+2Ø12 | ≥ 30 cm |
| U4…U10 (0,70–0,90 m) | ≤ 0,90 | redus | 25×20 cm | 2Ø12+2Ø10 | ≥ 25 cm |

**Verificarea buiandrugului majorat U2 (ușă HS, deschidere 3,00 m)** — recalcul individual, cerut explicit de structura.md §7.4 („buiandrugul/centura de deasupra se recalculează la faza PT ca element cu deschidere mărită"):

Încărcare pe buiandrug: greutatea peretelui de deasupra pe înălțimea de o treime din deschidere (metoda arcului de descărcare, uzuală pentru pereți de zidărie cu deschidere moderată) plus reacția planșeului dacă golul se află direct sub centură fără perete intermediar deasupra — în cazul acestei locuințe, golul U2 se află la parter sub centura de la cota `+3,00 m`, deci buiandrugul preia efectiv reacția planșeului peste parter pe lățimea aferentă a golului:

`p_Ed = p_SLU,planșeu curent · l_aferentă = 9,945 · 1,50 = 14,92 kN/m` (lățime aferentă 1,50 m, jumătate din traveea adiacentă golului, structura.md §5.5 pentru presiunea de calcul a planșeului).

Greutate proprie perete deasupra golului (înălțime redusă la triunghiul de descărcare, `h_echiv ≈ 0,50 m`, `t = 0,30 m`, `γ_zidărie = 12 kN/m³`): `g_perete = 0,50·0,30·12 = 1,80 kN/m`; la SLU: `1,35·1,80 = 2,43 kN/m`.

`p_Ed,total = 14,92 + 2,43 = 17,35 kN/m`.

`M_Ed = p_Ed,total·L²/8`, cu `L = 3,00 + 2·0,30 (rezemare) = 3,60 m` (deschidere de calcul, distanță între axele de rezemare):

`M_Ed = 17,35·3,60²/8 = 17,35·12,96/8 = 28,11 kNm`.

Secțiune adoptată `30×40 cm`, `d ≈ 40 - 3 - 1,6/2 = 36,2 cm`, armătură `4Ø16` (`As = 804 mm²`) la partea întinsă:

`M_Rd ≈ As·fyd·0,9·d = 804·434,8·0,9·362 = 113.700.000 Nmm ≈ 113,7 kNm` (aproximare cu braț de pârghie `0,9d`, verificare acoperitoare pentru încovoiere simplă).

`M_Ed/M_Rd = 28,11/113,7 = **0,25**` ✓ — rezervă amplă, justificată de alegerea conservatoare a secțiunii majorate (necesară și pentru rigiditate/limitarea săgeții pe o deschidere de 3,60 m, nu doar din calculul strict la încovoiere).

**Verificare la forfecare** (etrieri `Ø8/150 mm` pe zonele de capăt, `1,0 m` de la fiecare reazem): `V_Ed = p_Ed,total·L/2 = 17,35·3,60/2 = 31,2 kN`; `V_Rd,c` (beton, fără armătură transversală, formulă simplificată SR EN 1992-1-1 §6.2.2) pentru secțiune `30×40`, `ρl ≈ 0,74%`: `V_Rd,c ≈ 0,12·(1+√(200/362))·(100·0,0074·20)^(1/3)·300·362 ≈ 0,12·1,74·1,80·108.600 ≈ 41,0 kN > V_Ed = 31,2 kN` — chiar și fără etrieri, betonul simplu ar acoperi forfecarea; **etrierii `Ø8/150` se mențin constructiv**, conform practicii curente pentru elemente de beton armat cu rol de rezemare directă a planșeului.

**Verificare buiandrug U3 (ușă garaj, 2,50 m)** — analog, cu `l_aferentă = 1,25 m` (jumătate din traveea garajului):
`p_Ed = 9,945·1,25 + 1,35·(0,45·0,30·12) = 12,43 + 2,19 = 14,62 kN/m`; `L = 2,50+0,60 = 3,10 m`;
`M_Ed = 14,62·3,10²/8 = 14,62·9,61/8 = 17,56 kNm`.
Secțiune `30×35 cm`, `4Ø16` (`As=804 mm²`, `d≈31,2 cm`): `M_Rd = 804·434,8·0,9·312 = 97.980.000 ≈ 98,0 kNm`; `M_Ed/M_Rd = 17,56/98,0 = **0,18**` ✓.

### PTh-R.2.5 Verificarea densității de pereți pe traveea cu goluri mari (U2, fațada sud/vest)

DTAC (structura.md §6.5) a verificat densitatea globală de pereți pe cele două direcții, cu rezerve de 46% (X) și 79% (Y). Prezentul supliment verifică suplimentar **traveea locală afectată de golul mare U2** (ușa HS de 3,00 m), pentru a confirma că introducerea acestui gol nu creează o slăbire locală critică:

Fațada sud (axa A, lungime brută 10,60 m) conține, conform tabloului de tâmplărie: F1 (2,40 m) + F2 (1,80 m) + eventual U2 (3,00 m, dacă poziționată pe fațada sud conform variantei de arhitectură cu ieșire spre terasă) → lungime goluri cumulată `≈ 7,20 m` din 10,60 m brut, lungime netă de zidărie rămasă `≈ 3,40 m`, distribuită în 3-4 segmente între goluri (fiecare cu sâmburi la capete, poziții S1, S11, S12, S13, S14, S3).

Verificarea locală a segmentului de zidărie cel mai scurt dintre doi sâmburi consecutivi (de exemplu, segmentul dintre F2 și U2, dacă adiacente): lungime netă minimă rezultată `≥ 0,90 m` — se verifică condiția CR 6 de lungime minimă a panoului (`≥ 0,5 m` și `≥ 0,4·h = 0,4·2,95 = 1,18 m` la etaj, structura.md §7.1): **dacă segmentul rezultat din poziționarea definitivă a golurilor pe planul de arhitectură este sub 1,18 m, acest panou nu se consideră activ structural** (se tratează ca zidărie de umplutură locală între doi sâmburi apropiați, cu sâmburii respectivi funcționând practic ca un singur element compus) — verificare care revine explicit proiectantului la finalizarea planului de arhitectură pe poziția reală a golurilor, cu recomandarea de a distanța F2 și U2 cu minimum 1,20 m de zidărie plină între ele pentru a păstra un panou structural activ.

**Concluzie PTh-R.2.5:** soluția de principiu (Varianta A) rămâne valabilă și pentru configurația cu ușă HS de 3,00 m pe fațada sud, cu condiția respectării distanței minime de zidărie activă între goluri consecutive (`≥ 1,18 m`) — condiție transmisă ca cerință de coordonare arhitectură-structură pentru planul de execuție final, nu doar ca observație generică.

### PTh-R.2.6 Verificarea suplimentară a nodului de cruce S9 (intersecția celor doi pereți mediani)

Poziția S9 este singurul punct din structură unde patru tronsoane de zidărie/centură converg (cruce în plan). Verificarea de principiu a sâmburelui izolat (structura.md §7.2, secțiune 25×25, `4Ø12`) rămâne valabilă pentru compresiune și confinare, dar nodul necesită o verificare suplimentară la faza PT privind **continuitatea armăturii de centură pe cele patru direcții**:

- Pe direcția axei B (longitudinală): bare de centură `4Ø12` continue, traversând nodul fără întrerupere;
- Pe direcția axei 2 (transversală): bare de centură `4Ø12` continue, traversând nodul fără întrerupere, la aceeași cotă;
- **Coliziunea geometrică a celor două seturi de bare la intersecție** se rezolvă prin decalarea pe verticală cu cel puțin diametrul unei bare (12 mm) între cele două direcții, în interiorul secțiunii de 25×25 cm a sâmburelui/centurii — soluție constructivă curentă, care nu afectează acoperirea minimă (`cnom = 20 mm`, structura.md §3.4) dacă decalajul se face simetric față de axa secțiunii;
- Etrierii sâmburelui S9 se dispun ca etrier compus (formă de cruce sau doi etrieri suprapuși perpendicular), pentru a confina zidăria pe toate cele patru panouri adiacente nodului.

Acest detaliu de coliziune armătură, tratat generic la nivel de principiu în DTAC, este cerința tipică de execuție PTh pentru orice nod de cruce la zidărie confinată — planul de armare (PTh-R.4.3) îl detaliază cotat.

### PTh-R.2.7 Verificarea individuală la compresiune a fiecărui tronson de perete portant (parter)

DTAC (structura.md §7.5) a verificat explicit doar peretele median longitudinal (cel mai solicitat, `N_Ed = 1.174,0 kN`, `σ_Ed = 0,492 N/mm²`, `N_Ed/N_Rd = 0,33`). Pentru completarea execuției, se verifică aici, prin același format de calcul, **toți cei șase tronsoane de perete portant identificați la structura.md §6.5** (2 fațade laterale, 2 fațade de capăt, 1 perete median longitudinal deja verificat în DTAC, 1 perete median transversal), la nivelul parterului, considerând aria aferentă proprie fiecărui tronson.

**Metodologie**: pentru fiecare tronson, aria aferentă gravitațională se stabilește ca jumătate din deschiderea traveelor adiacente (identic principiului aplicat la structura.md §5.5 pentru peretele median), iar greutatea proprie a peretelui se calculează cu lungimea brută și greutatea unitară adoptată la structura.md §5.1 (`4,40 kN/m²` exterior 30 cm, `3,80 kN/m²` interior 25 cm).

**Fațada A (sud), lungime netă 5,85 m, `t = 0,30 m`, arie aferentă (jumătate din traveea 1-2 și jumătate din traveea exterioară, lățime aferentă medie ≈ 2,25 m pe adâncimea de 9,00 m):**
`A_aferentă ≈ 5,85·2,25 = 13,16 m²` (aferență redusă, fiind perete de contur, nu median — încarcă doar planșeul dinspre interior, pe o singură parte).
`N_planșee = A_aferentă·(9,945+6,864) = 13,16·16,809 = 221,1 kN`.
`G_perete = 5,85·5,95·4,40 = 153,2 kN` (lungime netă, înălțime totală, greutate unitară fațadă); la SLU: `1,35·153,2 = 206,8 kN`.
`N_Ed = 221,1·1,35(majorare implicită deja în p_SLU) ... ` — se recalculează corect: `N_planșee` este deja la SLU (`p_SLU` include `γG, γQ`), deci `N_Ed,total = 221,1 + 206,8 = 427,9 kN`.
`A_perete = 5,85·0,30 = 1,755 m²`; `σ_Ed = 427.900/1.755.000 = 0,244 N/mm²`.
`N_Rd = Φ·fd·A = 0,90·1,66·1.755.000 = 2.622.000 N ≈ 2.622 kN`; `N_Ed/N_Rd = 427,9/2.622 = **0,16**` ✓.

**Fațada C (nord), lungime netă 6,30 m, `t = 0,30 m`, arie aferentă analoagă:**
`A_aferentă ≈ 6,30·2,25 = 14,18 m²`; `N_planșee = 14,18·16,809 = 238,3 kN`; `G_perete,SLU = 1,35·(6,30·5,95·4,40) = 1,35·165,0 = 222,8 kN`.
`N_Ed = 238,3 + 222,8 = 461,1 kN`; `A_perete = 6,30·0,30 = 1,89 m²`; `σ_Ed = 461.100/1.890.000 = 0,244 N/mm²`.
`N_Rd = 0,90·1,66·1.890.000 = 2.823.000 N ≈ 2.823 kN`; `N_Ed/N_Rd = 461,1/2.823 = **0,16**` ✓.

**Fațada 1 (vest), lungime netă 7,42 m, `t = 0,30 m` — perete de capăt, aferentă pe adâncimea 10,60 m/2:**
`A_aferentă ≈ 7,42·2,65 = 19,66 m²` (jumătate din traveea longitudinală de 5,30 m mediu); `N_planșee = 19,66·16,809 = 330,5 kN`; `G_perete,SLU = 1,35·(7,42·5,95·4,40) = 1,35·194,3 = 262,3 kN`.
`N_Ed = 330,5 + 262,3 = 592,8 kN`; `A_perete = 7,42·0,30 = 2,226 m²`; `σ_Ed = 592.800/2.226.000 = 0,266 N/mm²`.
`N_Rd = 0,90·1,66·2.226.000 = 3.325.700 N ≈ 3.326 kN`; `N_Ed/N_Rd = 592,8/3.326 = **0,18**` ✓.

**Fațada 3 (est) — identică ca lungime/grosime cu fațada 1 (simetrie de plan), verificare analogă:** `N_Ed/N_Rd ≈ **0,18**` ✓.

**Perete median transversal (axa 2), lungime netă 7,65 m, `t = 0,25 m` — perete interior, aferentă pe ambele părți (analog peretelui median longitudinal deja verificat la structura.md §7.5, dar pe direcția transversală):**
`A_aferentă ≈ 7,65·4,50 = 34,43 m²` (aferentă dublă, ambele travei adiacente pe direcția lungă); `N_planșee = 34,43·16,809 = 578,7 kN`; `G_perete,SLU = 1,35·(7,65·5,95·3,80) = 1,35·173,0 = 233,6 kN`.
`N_Ed = 578,7 + 233,6 = 812,3 kN`; `A_perete = 7,65·0,25 = 1,913 m²`; `σ_Ed = 812.300/1.913.000 = 0,425 N/mm²`.
`N_Rd = 0,90·1,66·1.913.000 = 2.858.600 N ≈ 2.859 kN`; `N_Ed/N_Rd = 812,3/2.859 = **0,28**` ✓.

**Sinteza compresiune, toate tronsoanele de perete la parter:**

| Tronson | `N_Ed` (kN) | `A_perete` (m²) | `σ_Ed` (N/mm²) | `N_Rd` (kN) | `N_Ed/N_Rd` |
|---|---|---|---|---|---|
| Fațadă A (sud) | 427,9 | 1,755 | 0,244 | 2.622 | 0,16 |
| Fațadă C (nord) | 461,1 | 1,890 | 0,244 | 2.823 | 0,16 |
| Fațadă 1 (vest) | 592,8 | 2,226 | 0,266 | 3.326 | 0,18 |
| Fațadă 3 (est) | ≈592,8 | 2,226 | 0,266 | 3.326 | 0,18 |
| Perete median longitudinal (axa B) — DTAC §7.5 | 1.174,0 | 2,385 | 0,492 | 3.563 | **0,33 (guvernant)** |
| Perete median transversal (axa 2) | 812,3 | 1,913 | 0,425 | 2.859 | 0,28 |

**Concluzie PTh-R.2.7:** peretele median longitudinal (axa B), deja verificat la faza DTAC, rămâne tronsonul cel mai solicitat la compresiune al întregii structuri (`0,33`, față de `0,16–0,28` la celelalte tronsoane) — confirmare că alegerea acestui element ca reprezentativ la DTAC a fost corectă și acoperitoare, nefiind necesară nicio majorare de secțiune la niciun alt tronson de perete.

### PTh-R.2.8 Verificarea individuală la forfecare a fiecărui tronson de perete portant (grupare seismică)

Analog PTh-R.2.7, se extinde verificarea la forfecare (structura.md §7.6, metodă proporțională cu aria secțiunii transversale pe direcția considerată) la toate tronsoanele, folosind `fvd = 0,288 N/mm²` (identic structura.md §7.6, pentru `σd` comparabil pe toate tronsoanele) și repartiția forței tăietoare proporțional cu aria fiecărui tronson din totalul direcției respective:

**Direcția X** (`V_parter = 441,0 kN`, `A_X,total = 5,558 m²` — structura.md §6.5): fațadă A (`A=1,755`): `V = 441,0·1,755/5,558 = 139,3 kN`; fațadă C (`A=1,890`): `V = 441,0·1,890/5,558 = 149,9 kN`; perete median longitudinal (`A=1,913`): `V = 151,7 kN` (identic structura.md §7.6).

| Tronson (direcția X) | `A_perete` (m²) | `V_Ed` (kN) | `V_Rd = fvd·t·lc` (kN) | `V_Ed/V_Rd` |
|---|---|---|---|---|
| Fațadă A (sud) | 1,755 | 139,3 | `0,288·300·5.850 = 505,7` | 0,28 |
| Fațadă C (nord) | 1,890 | 149,9 | `0,288·300·6.300 = 544,3` | 0,28 |
| Perete median (axa B) — DTAC §7.6 | 1,913 | 151,7 | 550,8 | **0,28** |

**Direcția Y** (`V_parter = 441,0 kN`, `A_Y,total = 6,837 m²`): fațadă 1 (`A=2,226`): `V = 441,0·2,226/6,837 = 143,6 kN`; fațadă 3 (`A=2,226`): idem `143,6 kN`; perete median transversal (`A=1,913`, notă: peretele median transversal face parte din inventarul direcției Y ca perete care rigidizează Y, conform structura.md §6.5 — de fapt peretele median transversal (axa 2) este orientat pe direcția scurtă și rigidizează direcția Y prin lucrul în planul său paralel cu axa Y... **verificare de consistență**: peretele pe axa 2 este paralel cu axa Y (traversează transversal clădirea), deci participă la `A_Y` — corect încadrat).

| Tronson (direcția Y) | `A_perete` (m²) | `V_Ed` (kN) | `V_Rd` (kN) | `V_Ed/V_Rd` |
|---|---|---|---|---|
| Fațadă 1 (vest) | 2,226 | 143,6 | `0,288·300·7.420 = 641,1` | 0,22 |
| Fațadă 3 (est) | 2,226 | 143,6 | 641,1 | 0,22 |
| Perete median transversal (axa 2) | 1,913 | 123,4 | `0,288·250·7.650 = 550,8` | 0,22 |

**Concluzie PTh-R.2.8:** toate tronsoanele individuale de perete au grade de utilizare la forfecare între `0,22` și `0,28`, confirmând omogenitatea distribuției de rigiditate stabilită la DTAC (structura.md §7.6, verificare globală `0,28` pe X și `0,22` pe Y) — nu apar tronsoane critice ascunse de verificarea globală pe direcție, iar peretele median longitudinal rămâne, ca și la compresiune, elementul cu gradul de utilizare cel mai apropiat de valoarea globală înfășurătoare.

---

## PTh-R.3 — EXTRAS DE MATERIALE (BILL OF QUANTITIES PE ELEMENT)

### PTh-R.3.1 Sistemul de marcare a elementelor de beton armat

| Prefix marcă | Categorie element | Exemplu |
|---|---|---|
| F- | Fundații (tălpi continue) | F-ext (contur), F-int (pereți mediani) |
| S- | Sâmburi de beton armat | S1…S16 (v. PTh-R.2.2) |
| C- | Centuri de beton armat | C-ext-1…4, C-int-1, C-int-2 (v. PTh-R.2.3) |
| B- | Buiandrugi | B-F1…B-F14, B-U1…B-U10 (v. PTh-R.2.4) |
| PL- | Planșee de beton armat | PL-parter, PL-etaj |
| SC- | Scară (rampă + podeste, dacă din beton armat) | SC-R1, SC-R2, SC-PD |
| A- | Ancoraje/mustăți cosoroabă în centura superioară | A-cosoroabă (interax ≤ 1,00 m, D05 arhitectura-pth) |

### PTh-R.3.2 Extras beton pe categorie de element (recapitulare cantitativă din structura.md §13.3, defalcat pe poziții individuale)

| Marcă | Element | Volum unitar (m³) | Nr. buc./lungime | Volum total (m³) | Clasă beton |
|---|---|---|---|---|---|
| F-ext | Talpă continuă contur (2×10,60 + 2×9,00 = 39,2 m) | 0,80×0,80×L | 39,2 m | 25,09 | C20/25 |
| F-int | Talpă continuă pereți mediani (10,60+9,00=19,6 m) | 0,80×0,80×L | 19,6 m | 12,54 | C20/25 |
| **Total fundații** | | | **58,8 m** | **≈ 37,63** | — (structura.md: 37,60, concordant) |
| S1…S16 | Sâmburi, ambele niveluri (16 poz. × 2 niv. × h medie 2,95–3,00 m) | 0,25×0,25×5,95 (h totală ambele niveluri) | 16 poziții | 3,72 | C16/20 |
| C-ext-1…4, C-int-1,2 | Centuri, ambele niveluri (58,8 m/nivel × 2) | 0,25×0,25×L | 117,6 m | 7,35 | C16/20 |
| **Total confinare (sâmburi+centuri)** | | | | **≈ 11,07** | — (structura.md: 3,75+7,35=11,10, concordant) |
| B-F1…F14 | Buiandrugi ferestre (14 poziții, secțiuni variabile PTh-R.2.4, lungime medie 2,0 m cu rezemare) | ~0,25×0,25×2,0 mediu (redus la goluri mici) | 14 poziții | ~0,50 | C16/20 |
| B-U1…U10 | Buiandrugi uși (10 poziții, inclusiv U2/U3 majorate) | variabil | 10 poziții | ~0,55 | C16/20 |
| **Total buiandrugi** | | | | **≈ 1,05** | — |
| PL-parter | Planșeu peste parter (95,4 m² × 0,14 m) | — | 1 | 13,36 | C20/25 |
| PL-etaj | Planșeu peste etaj/pod (95,4 m² × 0,14 m) | — | 1 | 13,36 | C20/25 |
| **Total planșee** | | | | **26,72** | — (structura.md: 26,70, concordant) |
| SC-R1/R2/PD | Rampă scară (dacă din b.a., 2 rampe × ~9 trepte, lățime 1,00 m, grosime placă 0,12 m) + podest | — | 1 set | ~2,20 | C20/25 |
| **TOTAL general beton structură (fără scară, indicativ structura.md)** | | | | **≈ 75,40 m³** | — |
| **TOTAL general beton structură (inclusiv scară din b.a.)** | | | | **≈ 77,60 m³** | — |

Notă privind mica diferență de rotunjire între suma pe poziții individuale (PTh, defalcată) și totalul global din DTAC (structura.md §13.3): DTAC a lucrat cu lungimi/volume medii înfășurătoare, iar prezentul supliment recalculează pe poziții efective — diferența (`≈ 0,2–0,3 m³`, sub 1%) este în limitele normale de rotunjire între cele două faze și **nu afectează concluziile de dimensionare**; se adoptă la execuție valorile defalcate din prezentul capitol pentru antemăsurătoarea de execuție.

### PTh-R.3.3 Extras oțel-beton pe categorie de element

| Element | Coeficient armare adoptat (kg/m³) | Volum beton (m³) | Masă oțel (kg) |
|---|---|---|---|
| Fundații | 10 | 37,63 | 376 |
| Sâmburi | 261 | 3,72 | 971 |
| Centuri | 68 | 7,35 | 500 |
| Buiandrugi (majorat, cf. armării individuale PTh-R.2.4) | ~95 | 1,05 | 100 |
| Planșee | 45 | 26,72 | 1.202 |
| Scară (dacă din b.a.) | 60 | 2,20 | 132 |
| **TOTAL oțel-beton structură** | | **≈ 78,67 m³** | **≈ 3.281 kg** |

Indicatori rezultați (analog structura.md §13.3, actualizați cu poziționarea individuală): consum oțel `3.281/190,8 = 17,2 kg/m² Ad` (interval uzual 12–22 kg/m² pentru zidărie confinată, ușor peste valoarea DTAC de 16,0 kg/m² datorită armării individuale majorate a buiandrugilor B-U2/B-U3 și scării din beton armat, ambele opționale/variante pe care DTAC le tratase generic) — **valoare care rămâne amplu în intervalul caracteristic al soluției economice de zidărie confinată**, confirmând concluzia DTAC.

### PTh-R.3.4 Extras cofraje

| Element | Suprafață de cofrat (m²) | Tip cofraj |
|---|---|---|
| Fundații (fețe laterale talpă) | 58,8 m × 2 fețe × 0,80 m = 94,1 | cofraj de lemn/panouri refolosibile, sprijinit pe pereții săpăturii sau liber |
| Sâmburi (2 fețe libere/sâmbure, restul contact cu ștrepii zidăriei) | 16 poz. × 2 niv. × 2 fețe × 0,25 m × h(medie 2,95) ≈ 47,2 | cofraj metalic/lemn demontabil, etanș la rosturi |
| Centuri (2 fețe laterale + fund, la partea neînglobată în planșeu) | 117,6 m × (2×0,25+0,25) = 88,2 | cofraj continuu, sprijinit pe zidărie/popi |
| Buiandrugi (fund + 2 fețe laterale, susținut pe popi până la priză) | 24 poz. × lungime medie 2,2 m × (0,25+2×0,30 mediu) ≈ 45,8 | cofraj cu popi de susținere, minimum 7 zile |
| Planșee (fund cofrat pe toată suprafața, popi de susținere) | 2×95,4 = 190,8 | cofraj de planșeu pe eșafodaj/popi metalici reglabili |
| **TOTAL suprafață de cofrat** | **≈ 466 m²** | — |

---

## PTh-R.4 — PLANURI DE ARMARE COTATE

### PTh-R.4.1 D-S01 — Fundație — plan de armare (sc. 1:20, secțiune 1:10)

Talpă continuă `B×H = 0,80×0,80 m`, C20/25, `Df = 1,00 m` (structura.md §9.3–9.4), armată conform structura.md §9.4:

| Element | Armătură | Poziționare |
|---|---|---|
| Armătură longitudinală superioară | 4Ø14 | continuă pe toată lungimea tălpii, înnădiri prin suprapunere `≥ 50·Ø = 700 mm`, decalate min. 20% din lungime între bare adiacente |
| Armătură longitudinală inferioară | 4Ø14 | idem, la `cnom = 40–45 mm` de la fața inferioară a tălpii (contact cu stratul de egalizare) |
| Etrieri | Ø8/200 mm | pe toată lungimea, cu cârlige la 135° |
| Continuitate cu centura de soclu | mustăți verticale la interax = poziția sâmburilor (S1…S16) | ancorate `≥ 50·Ø` în talpă, ieșind pentru continuitate în sâmburele de la parter |
| Strat de egalizare | beton C8/10, 5–10 cm | sub toată talpa, înainte de armare |

**Detaliu de colț fundație** (la pozițiile S1…S4): bare longitudinale îndoite la 90° cu suprapunere `≥ 60 cm` pe fiecare direcție, identic principiului aplicat la centuri (structura.md §7.3), pentru a asigura continuitatea de întindere la colțul infrastructurii sub eventuale eforturi de încovoiere din tasări diferențiate sau din acțiunea seismică transmisă prin infrastructură.

**Cotarea adâncimii de fundare** — `Df = 1,00 m` de la cota terenului sistematizat (CTS), verificată la trasare față de reperul topografic; cotă unică pe tot conturul, cu excepția zonelor cu pantă a terenului unde adâncimea se ajustează local (trepte de fundație, cu diferență de nivel maximă între trepte adiacente `≤ 0,50 m`, pantă rampă de racord `≤ 1:2`, conform practicii curente de fundare pe teren cu pantă — decizie de execuție pe planul de situație definitiv).

### PTh-R.4.2 D-S02 — Sâmbure tip curent (S1…S8, S10…S16) — plan de armare (sc. 1:10 / 1:5 secțiune)

Secțiune `25×25 cm`, C16/20, pe toată înălțimea de la fundație la centura superioară (`h_total = 1,00(înglobare fundație) + 3,00(parter) + 2,95(etaj) = 6,95 m` măsurat de la fundul tălpii, din care partea aparentă deasupra cotei ±0,00 este `5,95 m`):

| Armătură | Poziție/valoare | Observație |
|---|---|---|
| Longitudinală | 4Ø12 (`As = 452 mm²`, `ρ = 0,72%`) | continuă pe toată înălțimea, un singur tronson pe nivel (fără înnădire în câmp la P+1E, dat fiind că înălțimea de nivel `≤ 3,0 m` este sub lungimea comercială uzuală a barei de 12 m — o bară acoperă ambele niveluri cu o singură înnădire la centura intermediară) |
| Înnădire la centura intermediară (cotă `+3,00 m`) | suprapunere `≥ 50·Ø = 600 mm` | decalată, nu toate cele 4 bare înnădite în aceeași secțiune |
| Etrieri în zona critică (capete, `≥ 45 cm` de la fiecare centură) | Ø6/100 mm | zonă de disipare potențială, densificare conform P100-1 §8 |
| Etrieri în zona curentă | Ø6/150 mm | restul înălțimii |
| Ancorare în fundație | mustăți din F- ancorate `≥ 50·Ø` | continuitate armătură-fundație, v. PTh-R.4.1 |
| Acoperire cu beton | `cnom = 20 mm` (interior, XC1) | structura.md §3.4 |

**Secțiune transversală tip** (cotare): sâmbure pătrat 250×250 mm, 4 bare `Ø12` dispuse la colțurile secțiunii utile (colț la colț, distanță `≈ 190×190 mm` interax bare, acoperire `20 mm` pe fiecare față), etrier `Ø6` perimetral cu cârlige la 135° și lungime de ancorare a cârligului `≥ 6·Ø = 36 mm` plus prelungire dreaptă `≥ 5·Ø`.

### PTh-R.4.3 D-S03 — Sâmbure de colț (S1…S4) și nod de cruce (S9) — detaliu special de armare (sc. 1:5)

**Sâmbure de colț** — identic ca secțiune/armare cu sâmburele curent (PTh-R.4.2), dar cu **ștrepii zidăriei pe ambele fețe interioare** (nu doar una), conform D02 din `arhitectura-pth.md`: cofrarea se face pe cele două fețe exterioare libere ale colțului, cu ștrepii de zidărie vizibili pe celelalte două fețe înainte de turnare.

**Nod de cruce S9** (v. PTh-R.2.6) — detaliu de coliziune armătură:

- Bare de centură pe direcția axei B (`4Ø12`): poziționate la cota superioară a secțiunii de 250×250 mm (aproape de fața de sus);
- Bare de centură pe direcția axei 2 (`4Ø12`): poziționate la cota inferioară a secțiunii, decalate cu `≥ 15 mm` (peste diametrul barei de 12 mm) față de setul anterior, pentru a permite trecerea fizică fără coliziune;
- Etrier compus: doi etrieri `Ø6` suprapuși la 90° în plan (formă de cruce), confinând toate cele patru panouri de zidărie adiacente nodului;
- Sâmburele vertical S9 (dacă prevăzut la acest nod, pe lângă centuri) se armează identic PTh-R.4.2, cu bare longitudinale poziționate pentru a nu intersecta niciuna dintre cele două direcții de centură la nivelul planșeului.

### PTh-R.4.4 D-S04 — Centură — plan de armare tip și detaliu de colț/nod T (sc. 1:10 / 1:5)

Secțiune `25×25 cm`, C16/20, la cotele `+3,00 m` și `+5,95 m`, monolit cu planșeul (structura.md §7.3):

| Armătură | Poziție/valoare |
|---|---|
| Longitudinală | 4Ø12, continuă pe toată lungimea tronsonului |
| Etrieri | Ø6/150 mm, pe toată lungimea |
| Înnădire în câmp (dacă lungimea tronsonului depășește lungimea comercială a barei, 12 m) | suprapunere `≥ 50·Ø = 600 mm`, poziționată în zona de moment minim (mijlocul unei laturi, nu la colț/nod) |
| Colț exterior (poziții S1…S4) | bare îndoite la 90°, suprapunere `≥ 60 cm` pe fiecare direcție |
| Nod T (intersecție cu perete interior, poziții S5…S8) | bare de centură principale continue pe direcția pereților exteriori; bare de centură ale peretelui interior ancorate în grosimea centurii exterioare pe o lungime `≥ 50·Ø`, cu ancoraj în cârlig dacă spațiul disponibil (250 mm) nu permite lungimea dreaptă completă |

**Rost de turnare centură-planșeu**: se evită prin turnare simultană (cofrare unică pentru centură+planșeu, betonare continuă); dacă din motive de organizare de șantier turnarea se face în două etape (centură, apoi planșeu), se prevăd mustăți/bare de așteptare verticale la interax `≤ 50 cm` pe toată lungimea rostului, cu curățarea și umezirea suprafeței de beton întărit înainte de reluarea turnării (conform NE 012-2, tratarea rosturilor de lucru).

### PTh-R.4.5 D-S05 — Buiandrug tip curent (secțiune 25×25 cm) și buiandrug majorat (U2, U3) — plan de armare (sc. 1:10)

**Buiandrug curent** (goluri ≤ 1,80 m, secțiune `25×25 cm`, structura.md §7.4):

| Armătură | Poziție |
|---|---|
| 3Ø12 | partea inferioară (întinsă la încovoiere pozitivă) |
| 2Ø10 | partea superioară (armătură de montaj/compresiune) |
| Etrieri Ø6/150 mm | pe toată lungimea, inclusiv pe zona de rezemare |
| Rezemare pe zidărie | `≥ 25 cm` fiecare parte, pe zidărie plină (verificată vizual la execuție — nu pe cărămidă spartă/jumătate de cărămidă) |

**Buiandrug majorat U2** (secțiune `30×40 cm`, PTh-R.2.4): `4Ø16` inferior + `2Ø14` superior, etrieri `Ø8/150 mm` (densificate `Ø8/100` pe `1,0 m` de la fiecare reazem), rezemare `≥ 30 cm` fiecare parte.

**Buiandrug majorat U3** (secțiune `30×35 cm`): `4Ø16` inferior + `2Ø12` superior, etrieri `Ø8/150 mm`, rezemare `≥ 30 cm`.

**Cofrarea și decofrarea buiandrugilor**: cofraj cu popi de susținere menținuți până la atingerea rezistenței de decofrare (`≥ 70%` din `fck` la 28 zile, verificat prin probe pe epruvete/maturometrie sau, orientativ, minimum 7 zile la temperaturi normale `≥ 15°C`, prelungit proporțional la temperaturi mai scăzute conform NE 012-2) — condiție identică celei stabilite în `arhitectura-pth.md` D04, aici cu precizarea criteriului tehnic de decofrare (rezistență, nu doar termen calendaristic).

### PTh-R.4.6 D-S06 — Planșeu de beton armat — plan de armare (sc. 1:20, detaliu reazem 1:10)

Placă `h = 14 cm`, C20/25, armată `Ø8/150 mm` pe ambele direcții (structura.md §10.1), cu plasă dublă (câmp + reazem):

| Zonă | Armătură | Observație |
|---|---|---|
| Câmp (moment pozitiv) | Ø8/150 mm, ambele direcții, la partea inferioară | `As,adoptat = 335 mm²/m ≥ As,nec = 159,1 mm²/m` (structura.md §10.1) |
| Reazem pe pereți portanți (moment negativ, continuitate peste reazem) | Ø8/150 mm, la partea superioară, prelungire în câmpul adiacent `≥ L/4` de la fața reazemului | continuitate cu armătura similară a panoului vecin |
| Zonă de racord cu centura | bare de continuitate ancorate în centură `≥ 50·Ø` | monolitism placă-centură |
| Armătură de contracție-temperatură suplimentară (perimetrul plăcii, zone fără reazem continuu — console/balcoane dacă prevăzute) | Ø8/200 mm | conform SR EN 1992-1-1 §9.3.1.1 |

**Toleranța de grosime a plăcii** (verificare la faza de execuție): `h_nominal = 140 mm`, toleranță admisă `+10/-5 mm` (SR EN 13670), verificată prin șabloane de nivel pe cofraj înainte de turnare și prin carotaj de probă (opțional, pe eșantion) după decofrare.

### PTh-R.4.7 D-S07 — Scara din beton armat — plan de armare rampă și podest (sc. 1:10, dacă varianta din b.a. e adoptată)

Conform `arhitectura-pth.md` D10: `Hniv = 300 cm`, 18 trepte, `h = 16,7 cm`, `l = 30 cm`, lățime utilă rampă `1,00 m`, grosime placă rampă `≥ 12 cm`, C20/25.

| Element | Armătură |
|---|---|
| Placă rampă (înclinată) | Ø10/150 mm pe direcția pantei (principală, la partea inferioară — întindere), Ø8/200 mm transversal (repartiție) |
| Podest intermediar/de capăt | Ø10/150 mm ambele direcții, similar unui planșeu curent de deschidere mică |
| Ancorare în pereți/centură de rezemare | bare de continuitate ancorate `≥ 50·Ø` |
| Balustradă | ancorată mecanic în structura rampei/podestului (nu doar în finisaj — conform D10 arhitectura-pth), cu piese metalice înglobate la turnare sau montate ulterior pe bolțuri chimice, dimensionate la o forță orizontală de calcul `≥ 0,5 kN/m` aplicată pe mâna curentă (acțiune uzuală de proiectare pentru balustrade de locuință, conform practicii SR EN 1991-1-1 §6.4 pentru categoria A) |

**Toleranța dintre trepte succesive**: `≤ 3 mm` (identică cu cea specificată în `arhitectura-pth.md` §PTh-A.8), obținută prin cofrare pe forme dimensionate exact la `h = 16,7 cm` calculat, verificată cu metrul/comparatorul înainte de decofrare.

### PTh-R.4.8 D-S08 — Ancorarea cosoroabei la centura superioară (interfață structură-șarpantă, sc. 1:10)

Complementar detaliului D05 din `arhitectura-pth.md` (care tratează interfața de arhitectură — bariera hidrofugă, poziția cosoroabei), prezentul detaliu tratează exclusiv partea de rezistență a ancorajului:

| Element | Specificație |
|---|---|
| Mustăți/ancore înglobate în centură | Ø10 mm, oțel B500C, ancorate `≥ 15·Ø = 150 mm` în beton, la interax `≤ 1,00 m` pe tot conturul centurii superioare |
| Alternativă — ancore chimice pe beton întărit | Ø10 mm, adâncime de înglobare conform fișei tehnice a ancorei chimice utilizate, `≥ 90 mm` în beton C16/20 |
| Verificare la smulgere din sucțiunea vântului | forța de smulgere pe ancoraj (structura.md §4.3, `we,sucțiune ≈ -0,54 kN/m²`, arie aferentă/ancoraj `≈ 1,0 m × lățime streașină 0,60 m = 0,60 m²`): `N_Ed = 0,54·0,60 = 0,32 kN/ancoraj` — valoare mică, acoperită amplu de capacitatea la smulgere a unei mustăți `Ø10` ancorate `150 mm` în beton (`N_Rd` uzual `≥ 8–10 kN` pentru această configurație, conform CEN/TS 1992-4 sau fișei tehnice a ancorei chimice) → rezervă foarte mare, ancorajul fiind guvernat practic de cerința constructivă (interax `≤ 1,0 m`), nu de calculul la smulgere |

---

## PTh-R.5 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII

### PTh-R.5.1 Succesiunea generală a operațiilor structurale

1. **Trasarea axelor și a conturului fundației** — pe baza planului de situație și a planului de fundații (PTh-R.4.1), cu verificare topografică înainte de săpătură; verificarea concordanței naturii terenului deschis la săpătură cu studiul geotehnic (structura.md §4.4, §9.1) — condiție de fază determinantă (PTh-R.7, FD1).
2. **Săpătură, strat de egalizare (C8/10, 5–10 cm)** — nivelat, verificat cu nivela înainte de armare.
3. **Armarea și turnarea fundațiilor (tălpi continue)** — conform PTh-R.4.1, cu mustățile de continuitate pentru sâmburi lăsate în poziție corectă (verificate topografic pe planul de fundații); betonare continuă pe tot tronsonul, fără rosturi de lucru orizontale în corpul tălpii.
4. **Elevație/soclu, hidroizolație orizontală și verticală** (D01 arhitectura-pth) — execuție coordonată, structura fiind responsabilă de poziția corectă a mustăților ce ies din talpă/elevație pentru sâmburii de la parter.
5. **Zidărie parter în ștrepi** (conform structura.md §7.2 și D02 arhitectura-pth) — ridicată pe toată înălțimea nivelului, cu ștrepi lăsați regulat la fiecare 3–4 asize la toate cele 16 poziții de sâmburi (PTh-R.2.2), curățați de resturi de mortar înainte de cofrarea sâmburilor.
6. **Cofrarea, armarea și turnarea simultană a sâmburilor și buiandrugilor de la parter** — turnare **după** finalizarea zidăriei pe toată înălțimea nivelului (principiu obligatoriu, structura.md §7.2, PTh-R.1.3 pct. 1); beton vibrat intern, în straturi de `≤ 50 cm`, tasare S3.
7. **Cofrarea, armarea și turnarea centurii + planșeului peste parter** — turnare monolită (cofrare unică pentru ambele elemente, PTh-R.4.4); cofraj susținut pe popi până la decofrare (minimum 7 zile la `≥ 15°C`, verificat prin probe/maturometrie, conform NE 012-2).
8. **Repetarea pașilor 5–7 la nivelul etajului** — zidărie etaj în ștrepi, sâmburi+buiandrugi etaj, centură+planșeu peste etaj (bază șarpantă).
9. **Montajul șarpantei** (D05, D06 arhitectura-pth + PTh-R.4.8) — ancorarea cosoroabei imediat după decofrarea/atingerea rezistenței centurii superioare.
10. **Scara** (dacă din beton armat) — execuție coordonată cu planșeele, de regulă simultan cu planșeul de la nivelul respectiv sau imediat consecutiv, cu ancorarea balustradei conform PTh-R.4.7.
11. **Interfața cu instalațiile** — traseele verticale prin sâmburi/centuri/planșee (manșoane prevăzute la cofrare, conform `instalatii.md`) se rezolvă înainte de turnare, nu ulterior.

### PTh-R.5.2 Condiții de mediu admise pe categorii de lucrări structurale

| Categorie de lucrare | Temperatură admisă | Condiții suplimentare | Observații |
|---|---|---|---|
| Zidărie (ridicare, ștrepi) | `≥ 5°C` fără protecție specială; `0…5°C` cu aditivi antigel în mortar și protecție de noapte | fără precipitații directe pe rândul proaspăt așezat | mortarul proaspăt protejat de îngheț minimum 3 zile (conform practicii curente și SR EN 1996-2) |
| Turnare beton (fundații, sâmburi, centuri, planșee) | `≥ 5°C` fără măsuri speciale; sub `5°C` cu protecție termică (prelate, folii) și/sau aditivi accelератori/antigel, conform NE 012-2 cap. 7 | fără îngheț în primele 72 h de la turnare | maturare monitorizată prin probe pe epruvete; peste `30°C`, protecție împotriva evaporării rapide (stropire, folii de protecție) |
| Decofrare | condiționată de rezistența atinsă, nu de termen calendaristic fix | verificare prin probe pe epruvete/maturometrie | minimum 7 zile la `≥ 15°C` ca reper orientativ pentru elemente curente (buiandrugi, centuri); planșeele pot necesita menținerea popilor de siguranță (repropping) până la 28 zile, conform proiectului de organizare a execuției |
| Prelevarea și păstrarea probelor de beton | conform NE 012-2 | o serie de probe (minimum 3 epruvete) pentru fiecare element principal turnat (fiecare tronson de fundație, fiecare set de sâmburi/centuri turnat într-o zi, fiecare planșeu) | verificare `fck` la 28 zile, conform structura.md §13.1 |

### PTh-R.5.3 Punerea în operă a betonului — reguli specifice elementelor de confinare

- **Sâmburii și buiandrugii**, având secțiune redusă (25×25 cm) și armătură relativ densă la colțuri/noduri, necesită **vibrare internă atentă cu vibrator de dimensiune adecvată** (Ø25–30 mm), introdus vertical, cu evitarea contactului prelungit cu armătura sau cofrajul, pentru a preveni segregarea și formarea de goluri (nid de pietriș) la colțurile secțiunii.
- **Turnarea sâmburilor pe înălțime de nivel completă** (2,95–3,00 m) se face în straturi succesive de `≤ 50 cm`, cu vibrare la fiecare strat înainte de turnarea următorului, pentru a asigura monolitismul pe toată înălțimea.
- **Betonul pentru centuri și planșee**, turnat monolit, se pune în operă continuu pe tot tronsonul planificat pentru o zi de lucru, evitând rosturile de lucru necontrolate; dacă un rost de lucru este inevitabil (întrerupere de program, defecțiune utilaj), acesta se poziționează în zona de moment minim și se tratează conform NE 012-2 (curățare, umezire, eventual conector de armătură suplimentar dacă proiectantul o cere).
- **Cofrarea etanșă la rosturile cu zidăria** (la sâmburi) previne pierderea laptelui de ciment în rosturile zidăriei adiacente — verificată vizual înainte de turnare, cu etanșări suplimentare (bandă de burete, mortar de etanșare) unde ștrepii lasă interstiții mari.

---

## PTh-R.6 — PLAN DE CONTROL AL CALITĂȚII STRUCTURII

### PTh-R.6.1 Controlul materialelor de bază

Conform structura.md §13.1, dezvoltat aici cu frecvențele și criteriile de acceptare:

- **Zidăria** — certificate de conformitate pentru elementele de zidărie (GVP/BCA), la fiecare lot/livrare; verificarea vizuală a integrității elementelor (fisuri, sfărâmări la manipulare) la recepția pe șantier; verificarea rețetei/consistenței mortarului preparat pe șantier la fiecare șarjă (test de tasare/consistență la masa de răspândire, dacă se prepară pe șantier) sau verificarea fișei tehnice la fiecare livrare de mortar preparat industrial (uscat, în saci/silozuri).
- **Betonul** (fundații, sâmburi, centuri, buiandrugi, planșee) — certificate de calitate pentru ciment (SR EN 197-1), agregate (granulozitate, conținut de impurități), apă și eventuali aditivi; **buletine de încercare pe cuburi/cilindri**, minimum o serie de probe (3 epruvete) pentru fiecare element principal turnat distinct (structura.md §13.1): minimum 1 serie/tronson de fundație, minimum 1 serie/zi de turnare sâmburi+centuri pe fiecare nivel, minimum 1 serie/planșeu; verificarea `fck` la 28 zile față de clasa prescrisă (C16/20 pentru confinare, C20/25 pentru planșee/fundații).
- **Oțelul-beton** — certificate de calitate B500C pentru toate loturile, cu verificarea explicită a clasei de ductilitate C (`εuk ≥ 7,5%`, raport `(ft/fy)k` între 1,15 și 1,35) pentru toate barele folosite la sâmburi, centuri și buiandrugi (elemente cu rol de confinare/continuitate seismică, structura.md §3.3) — verificare obligatorie, nu doar pentru armătura curentă a planșeelor.
- **Lemnul șarpantei** — conform `arhitectura-pth.md` §PTh-A.9.2 (certificat clasă C24, tratament ignifug/fungicid) — interfața de rezistență constă în verificarea secțiunilor efectiv puse în operă față de cele calculate (structura.md §10.3).

### PTh-R.6.2 Plan de control al armării — puncte de verificare pe fiecare categorie de element

| Element | Verificare înainte de turnare | Criteriu de acceptare |
|---|---|---|
| Fundații (F-ext, F-int) | poziție, diametru, număr bare longitudinale, distanță etrieri, acoperire | conform PTh-R.4.1; acoperire `40–45 mm` (XC2) |
| Sâmburi (S1…S16) | poziție (concordanță cu planul de arhitectură definitiv), diametru/număr bare, densificare etrieri la capete (`Ø6/100` pe 45 cm), continuitate cu mustățile din fundație/nivelul inferior | conform PTh-R.4.2/4.3; acoperire `20 mm` (XC1) |
| **Succesiunea zidărie→sâmbure** | confirmare vizuală și fotografică a ștrepilor executați ÎNAINTE de cofrarea sâmburelui | zidărie ridicată pe toată înălțimea nivelului, ștrepi regulați, curați |
| Centuri (C-ext, C-int) | continuitate a inelului la colțuri (suprapunere `≥ 60 cm`, bare îndoite la 90°) și la nodurile T/cruce (PTh-R.4.4, PTh-R.4.3) | traseu neîntrerupt verificat pe tot perimetrul înainte de turnare |
| Buiandrugi curenți și majorați (U2, U3) | secțiune și armătură conform poziției individuale (PTh-R.2.4, PTh-R.4.5), rezemare `≥ 25/30 cm` pe zidărie plină | verificare poziție pe planul de arhitectură definitiv |
| Planșee (PL-parter, PL-etaj) | grosime cofraj (`140 mm ± toleranță`), poziție/distanță armătură câmp+reazem, continuitate cu centura | conform PTh-R.4.6 |
| Scară (dacă din b.a.) | armătură rampă/podest, ancoraje balustradă înglobate la turnare (dacă soluția o cere) | conform PTh-R.4.7 |
| Ancoraje cosoroabă | poziție mustăți/ancore, interax `≤ 1,00 m`, adâncime de ancorare | conform PTh-R.4.8, verificat înainte de turnarea centurii superioare |

### PTh-R.6.3 PVLA — Puncte de verificare a lucrărilor ascunse, specifice structurii

| Nr. | Lucrare ascunsă | Moment de verificare | Se consemnează |
|---|---|---|---|
| 1 | Natura terenului la cota de fundare | Înainte de turnarea stratului de egalizare | concordanță cu studiul geotehnic, absența zonelor slabe/umpluturilor necontrolate |
| 2 | Armătura fundațiilor (tălpi continue) | Înainte de turnarea betonului | poziție, diametre, acoperire, continuitate mustăți sâmburi |
| 3 | Ștrepii de legătură zidărie-sâmbure | Înainte de cofrarea fiecărui sâmbure | regularitate, curățenie, absența resturilor de mortar |
| 4 | **Armarea sâmburilor** (toate cele 16 poziții, ambele niveluri) | Înainte de turnarea betonului la fiecare nivel | poziție, diametre (`4Ø12`), etrieri (`Ø6/100` capete / `Ø6/150` curent), acoperire `20 mm` |
| 5 | **Armarea centurilor** (continuitate inel, colțuri, noduri T/cruce) | Înainte de turnarea betonului la fiecare nivel | traseu neîntrerupt, suprapuneri la colț `≥ 60 cm`, bare îndoite 90° |
| 6 | Armarea buiandrugilor (curenți și majorați U2/U3) | Înainte de turnare | secțiune/armătură conform poziției individuale, rezemare pe zidărie |
| 7 | **Betonarea sâmburilor, centurilor și buiandrugilor** | Pe parcursul turnării | tasare S3, vibrare internă pe straturi `≤ 50 cm`, absența segregării, prelevare probe (minimum 1 serie/zi de turnare) |
| 8 | Armătura planșeelor | Înainte de turnare | poziție, distanțe (`Ø8/150`), continuitate cu centura, grosime cofraj |
| 9 | **Betonarea planșeelor** | Pe parcursul turnării | continuitate cu centura (turnare simultană sau rost tratat), prelevare probe |
| 10 | Ancoraje cosoroabă în centura superioară | Înainte de turnarea centurii superioare | poziție, interax `≤ 1,00 m`, adâncime |
| 11 | Armătura scării (dacă din beton armat) | Înainte de turnare | poziție, ancoraje balustradă |

Niciuna dintre lucrările din lista PTh-R.6.3 nu se acoperă cu stratul următor (zidărie ulterioară, tencuială, planșeu următor) fără proces-verbal de lucrări ascunse (PVLA) semnat de executant, dirigintele de șantier și, după caz, proiectantul de structură — condiție obligatorie pentru includerea lucrării în cartea tehnică a construcției (conform Legii 10/1995 și Normativului C56/2002).

### PTh-R.6.4 Matrice de control pe categorii

| Categorie de lucrare | Verificare la recepția materialelor | Verificare pe parcursul execuției | Verificare la finalizare |
|---|---|---|---|
| Zidărie | certificat conformitate cărămidă/BCA, fișă mortar | verticalitate, orizontalitate rosturi, ștrepi regulați, grosime rosturi | rectiliniaritate, planeitate suport tencuială (interfață cu `arhitectura-pth.md` D07) |
| Beton (fundații/sâmburi/centuri/planșee/buiandrugi) | certificat clasă beton, bon de livrare, timp de la preparare la punere în operă (`≤ 90 min` uzual, funcție de temperatură și aditivi) | tasare la fiecare transport (con Abrams), vibrare, cofrare etanșă | rezistență pe epruvete la 28 zile, aspect suprafață (goluri, segregare) |
| Oțel-beton | certificat B500C, clasă ductilitate C | poziție, diametre, distanțe, acoperire (conform PTh-R.6.2) | — |
| Șarpantă lemn | certificat clasă rezistență C24, tratament ignifug/fungicid | montaj cosoroabă (ancoraje conform PTh-R.4.8), căpriori, contravântuiri | geometrie pante, aliniamente (interfață cu `arhitectura-pth.md`) |

---

## PTh-R.7 — FAZE DETERMINANTE

| Nr. | Faza determinantă | Verificări/criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare și cota de fundare | Confruntare cu studiul geotehnic (`pconv = 200 kPa` confirmată, structura.md §4.4); adâncime `Df = 1,00 m` `≥` adâncimea de îngheț normată (STAS 6054/77); absența zonelor slabe/umpluturilor necontrolate | Geotehnician, proiectant, diriginte, constructor |
| FD2 | Armarea și turnarea fundațiilor (tălpi continue) | Conform PTh-R.4.1 și PTh-R.6.2; poziționarea corectă a mustăților de continuitate pentru toate cele 16 poziții de sâmburi | Proiectant, diriginte, constructor |
| FD3 | Ridicarea zidăriei la fiecare nivel (parter, apoi etaj) | Grosime pereți, rosturi pline, poziționarea corectă a golurilor conform planului de arhitectură definitiv, ștrepi regulați la toate pozițiile de sâmburi | Proiectant (arhitectură+structură), diriginte, constructor |
| FD4 | **Armarea și turnarea sâmburilor și centurilor la fiecare nivel** | Verificarea explicită a succesiunii corecte de execuție (sâmburii se toarnă DUPĂ zidărie, nu înainte); continuitatea armăturii la colțuri și noduri (centuri); acoperirea cu beton; densificarea etrierilor în zonele critice ale sâmburilor | Proiectant, diriginte, constructor, (verificator tehnic atestat, dacă convocat) |
| FD5 | Armarea și turnarea planșeelor (peste parter, peste etaj) | Grosime, poziție armătură (câmp+reazem), monolitism cu centurile, prelevare probe | Proiectant, diriginte, constructor |
| FD6 | Montajul șarpantei | Verificarea ancorajelor cosoroabă-centură (poziție, interax, adâncime), secțiuni conform proiectului, tratamente ignifug/fungicid aplicate înainte de montaj | Proiectant, diriginte, constructor |
| FD7 | Structura la roșu finalizată | Conformitate geometrică generală (verticalitate, planeitate — toleranțele din PTh-R.8), absența defectelor vizibile (fisuri, segregări), toate PVLA arhivate | Proiectant, diriginte, constructor |

La fiecare fază determinantă: convocare cu preaviz rezonabil (recomandat minimum 5 zile lucrătoare pentru o construcție de această complexitate), întocmirea procesului-verbal de fază determinantă, condiție pentru autorizarea continuării lucrărilor. Neîndeplinirea criteriilor blochează avansul până la remediere și reverificare (conform Legii 10/1995 și practicii curente de urmărire a execuției).

---

## PTh-R.8 — TOLERANȚE DE EXECUȚIE

### PTh-R.8.1 Toleranțe geometrice — infrastructură și elemente de beton armat (SR EN 13670)

| Element/operație | Toleranță admisă | Metodă de verificare |
|---|---|---|
| Poziție în plan a fundației față de trasare | `± 20 mm` | control topografic |
| Cotă de fundare (adâncime) | `± 30 mm` (nu se admite reducere sub adâncimea de îngheț normată) | nivelment |
| Lățime/înălțime talpă de fundație | `± 20 mm` | metru/șablon |
| Verticalitate sâmburi (pe înălțimea unui nivel, `≈ 3,00 m`) | `± 10 mm` (`≤ h/300`) | fir cu plumb/nivelă laser |
| Poziție în plan a sâmburilor față de proiect | `± 15 mm` | control cu ruleta față de axele trasate |
| Secțiune sâmburi/centuri/buiandrugi (dimensiuni cofraj) | `+10/-5 mm` | șubler/metru pe cofraj înainte de turnare |
| Grosime planșeu (`h = 140 mm` nominal) | `+10/-5 mm` | șablon de nivel pe cofraj |
| Planeitate suprafață planșeu turnat (sub dreptar de 2 m) | `≤ 8 mm` (pentru planșeu ce urmează a primi șapă, mai relaxat decât finisajele finale — v. `arhitectura-pth.md` PTh-A.8 pentru toleranțele stratului suport final) | dreptar + pană de măsurare |
| Poziția armăturii față de cofraj (acoperire) | `± 5 mm` față de `cnom` prescris | distanțieri calibrați, verificare cu ruleta înainte de turnare |
| Poziția golurilor de tâmplărie în zidărie față de proiect | `± 10 mm` (identic cu D08 arhitectura-pth pentru interfața cu tâmplăria) | metru/laser |

### PTh-R.8.2 Toleranțe la execuția zidăriei portante (SR EN 1996-2)

| Operație | Toleranță admisă | Metodă de verificare |
|---|---|---|
| Verticalitate perete pe înălțimea unui nivel | `≤ 20 mm` (`≤ h/300`, mai relaxat decât sâmburii de beton, conform practicii curente pentru zidărie) | fir cu plumb/nivelă laser |
| Grosime rosturi orizontale de mortar | `10–15 mm` | șubler/riglă |
| Grosime rosturi verticale de mortar | `8–12 mm` | șubler/riglă |
| Planeitate față perete (sub dreptar de 2 m) | `≤ 10 mm` (suport brut, înainte de tencuială — v. `arhitectura-pth.md` PTh-A.8 pentru toleranța finală după tencuială) | dreptar |
| Grosime perete (nominal 25/30 cm) | `± 10 mm` | șubler |
| Regularitatea ștrepilor lăsați pentru sâmburi | ieșinduri `1/4–1/2 cărămidă`, la fiecare 2-3 rânduri, conform D02 arhitectura-pth | verificare vizuală înainte de cofrarea sâmburelui |

### PTh-R.8.3 Toleranțe la execuția șarpantei (interfață structură-arhitectură, complementar D05/D06 arhitectura-pth)

| Element | Toleranță admisă |
|---|---|
| Interax ancoraje cosoroabă | `± 50 mm` față de interax-ul proiectat (`≤ 1,00 m`) |
| Interax căpriori | `± 30 mm` față de interax proiectat (0,80–0,90 m) |
| Aliniament coamă (rectiliniaritate) | `L/500` |
| Săgeata reziduală vizibilă a șarpantei sub greutate proprie | conform verificărilor la săgeată din structura.md §10.3 (`L/250` limita admisă la elementele curente) |

---

## PTh-R.9 — CALCULUL COFRAJELOR ȘI AL SUSȚINERILOR PROVIZORII

### PTh-R.9.1 Principii generale de dimensionare a cofrajelor și eșafodajelor

Cofrajele și susținerile provizorii (popi, grinzi de susținere, eșafodaje) nu fac obiectul calculului de rezistență al construcției definitive, dar condiționează direct siguranța execuției și calitatea geometrică a elementelor turnate (planeitate, poziție, absența deformațiilor sub presiunea betonului proaspăt). Dimensionarea se face de către antreprenor/proiectantul de organizare a execuției pe baza principiilor din SR EN 12812 (cofraje — cerințe de performanță) și NE 012-2 (execuția lucrărilor din beton), cu datele de intrare furnizate mai jos, specifice elementelor prezentei structuri.

### PTh-R.9.2 Presiunea betonului proaspăt pe cofrajul vertical (sâmburi, centuri aparente)

Presiunea laterală maximă a betonului proaspăt asupra cofrajului vertical (formula uzuală CIRIA 108 / recomandare NE 012-2, pentru beton cu tasare S3, viteză de turnare `v ≈ 1,0–1,5 m/h`, temperatură `T ≈ 15–20°C`):

`p_max = γbéton · h_max`, cu `h_max` — înălțimea de la care presiunea hidrostatică devine constantă (aproximată prin timpul de priză inițială, uzual `h_max ≈ 1,0–1,5 m` pentru beton cu priză normală la temperatura de execuție).

Pentru sâmburii turnați pe toată înălțimea de nivel (`h = 2,95–3,00 m`) în straturi succesive de `≤ 0,50 m` cu vibrare (PTh-R.5.3), presiunea maximă pe cofraj rămâne limitată la valoarea corespunzătoare unei coloane de `≈ 1,2–1,5 m` beton proaspăt (restul stratului inferior fiind deja în curs de priză la momentul turnării stratului superior): `p_max ≈ 25·1,3 = 32,5 kN/m² ≈ 0,0325 N/mm²` — valoare mică, ușor preluată de cofraje metalice/lemn curente cu contravântuiri la interax `≤ 0,60 m` pe înălțime.

**Cofrajul sâmburilor** (secțiune 250×250 mm, două fețe libere, celelalte două fiind ștrepii zidăriei — D02 arhitectura-pth): panouri metalice/lemn cu grosime minimă recomandată `18–21 mm` (placaj fenolic) sau echivalent metalic, rigidizate cu montanți verticali la interax `≤ 400 mm` și pene de strângere/tiranți la interax vertical `≤ 600 mm`, dimensionate la presiunea de mai sus cu coeficient de siguranță uzual `≥ 1,5`.

### PTh-R.9.3 Cofrajul și susținerea planșeelor (popi de siguranță — shoring)

Placa de beton armat `h = 14 cm` (structura.md §10.1), deschidere uzuală `4,0–4,5 m`, se cofrează pe eșafodaj/popi metalici reglabili, dimensionați la:

`p_cofraj = γbeton·h + q_execuție = 25·0,14 + 1,50 = 3,50 + 1,50 = 5,00 kN/m²`

(`q_execuție = 1,50 kN/m²` — încărcare de execuție uzuală pentru personal, echipamente de vibrare, pubele de transport beton, conform practicii curente NE 012-2/SR EN 12812).

**Aria aferentă pe popă** (interax popi recomandat `0,90×0,90 m`, uzual pentru planșee de grosime redusă la clădiri de locuit): `A_aferentă = 0,81 m²`; `N_popă = 5,00·0,81 = 4,05 kN/popă` — valoare mică, acoperită amplu de capacitatea uzuală a unei popi metalice reglabile (`Rd ≥ 15–20 kN` la lungime de lucru `≤ 3,0 m`, conform fișei tehnice a producătorului), cu coeficient de siguranță rezultat `≥ 3,7`.

**Grinzi de repartiție sub popi** (dacă solul de sub eșafodaj — pardoseala parterului deja turnată sau terenul compactat — necesită repartizarea sarcinii): tălpi de lemn/dulapi `10×15 cm`, dispuse perpendicular pe direcția popilor, la baza fiecărui rând.

**Decofrarea și repropping**: se decofrează popii de bază numai după atingerea rezistenței minime de decofrare (uzual `≥ 70%` din `fck`, verificată prin probe/maturometrie), menținând obligatoriu **popi de siguranță (repropping) sub planșeul decofrat** până la atingerea rezistenței de 28 zile, dacă planșeul de deasupra urmează să fie încărcat cu zidărie/planșeu următor înainte de acest termen — situație tipică la execuția etajată a locuinței (planșeul peste parter susține imediat zidăria etajului). Numărul și dispunerea popilor de siguranță se stabilesc de antreprenor pe baza calculului de repropping, cu minimum 1 popă/2,0 m² de planșeu.

### PTh-R.9.4 Cofrajul buiandrugilor și grinzii de rulare a scării

Buiandrugii (secțiune curentă 25×25 cm, majorată 30×40/30×35 cm la U2/U3 — PTh-R.2.4) se cofrează cu popi de susținere sub cofrajul de fund, menținuți până la atingerea rezistenței de decofrare (identic principiului D04 din `arhitectura-pth.md`, aici cu precizarea criteriului tehnic — rezistență confirmată, nu doar termen calendaristic fix de 7 zile, acesta fiind doar un reper orientativ la temperaturi normale).

Rampa scării (dacă din beton armat, placă înclinată `≥ 12 cm`, PTh-R.4.7) se cofrează pe forme înclinate dimensionate exact la unghiul de pantă rezultat din `h=16,7 cm`/`l=30 cm` (structura.md/arhitectura-pth D10), cu popi de susținere pe toată lungimea rampei, la interax `≤ 1,0 m`, menținuți până la decofrare.

### PTh-R.9.5 Controlul cofrajelor înainte de turnare

Verificarea cofrajelor (element din PVLA implicit, integrat controlului de la PTh-R.6.2) cuprinde: etanșeitatea rosturilor (evitarea pierderii laptelui de ciment), curățenia interioară (absența resturilor de lemn/moloz), tratarea cu agent de decofrare, verificarea geometriei (dimensiuni, verticalitate/orizontalitate conform toleranțelor PTh-R.8.1), și stabilitatea/rigidizarea susținerilor provizorii sub sarcina de turnare și vibrare.

---

## PTh-R.10 — TEHNOLOGIA DE EXECUȚIE PE TIMP FRIGUROS ȘI PE TIMP CĂLDUROS

### PTh-R.10.1 Cadru normativ

Execuția pe timp friguros (temperaturi medii zilnice sub `+5°C` sau minime sub `0°C`) și pe timp călduros (peste `+30°C`) se conduce conform **NE 012-2/2010** (cap. 7 — betonarea pe timp friguros/călduros) și practicii curente pentru zidărie (SR EN 1996-2), cu măsuri suplimentare față de execuția în condiții normale de temperatură (PTh-R.5.2).

### PTh-R.10.2 Măsuri la betonare pe timp friguros (fundații, sâmburi, centuri, buiandrugi, planșee)

- **Temperatura betonului proaspăt la punerea în operă**: minimum `+5°C`, obținută prin încălzirea apei de amestecare și/sau a agregatelor (nu a cimentului, care nu se încălzește direct), conform NE 012-2.
- **Aditivi**: utilizarea de aditivi antigel/accelératori de priză (conform fișei tehnice, compatibili cu clasa de expunere a elementului), cu dozaj stabilit de laboratorul de betoane funcție de temperatura exterioară prognozată.
- **Protecția termică după turnare**: acoperirea imediată cu prelate termoizolante/folii cu bule, eventual cu încălzire suplimentară a incintei de lucru (rezistențe electrice, tunuri de aer cald) pentru elementele critice (sâmburi/centuri, unde secțiunea redusă `25×25 cm` pierde căldura mai rapid decât un element masiv) — obiectivul este menținerea temperaturii betonului `≥ +5°C` pe toată durata primelor 72 ore de la turnare (perioada critică pentru evitarea înghețului timpuriu, care ar compromite ireversibil rezistența finală).
- **Interzicerea turnării pe suport înghețat**: cofrajul, armătura și suprafața de beton întărit la rostul de lucru se verifică să fie libere de gheață/promoroacă înainte de turnare.
- **Prelevarea suplimentară de probe**: la turnările pe timp friguros se recomandă o serie suplimentară de probe menținută în condiții identice cu elementul real (nu în laborator încălzit), pentru a confirma rezistența efectivă atinsă pe șantier înainte de decofrare.

### PTh-R.10.3 Măsuri la ridicarea zidăriei pe timp friguros

- Mortar cu aditivi antigel, la temperaturi între `0°C` și `+5°C`; sub `0°C`, ridicarea zidăriei portante se **întrerupe** (excepție doar cu măsuri speciale de protecție termică a incintei de lucru, agreate explicit de proiectant, dat fiind riscul de compromitere a aderenței mortar-cărămidă la îngheț timpuriu).
- Protecția rândurilor proaspăt așezate cu prelate/materiale termoizolante pe timpul nopții, minimum 3 zile de la execuție (identic `arhitectura-pth.md` PTh-A.6.2, aici cu accent pe rolul structural al zidăriei portante — o aderență compromisă la interfața mortar-cărămidă afectează direct rezistența la compresiune/forfecare a peretelui structural, nu doar aspectul).

### PTh-R.10.4 Măsuri pe timp călduros (peste +30°C)

- **Betonare**: protejarea suprafețelor turnate împotriva evaporării rapide a apei de amestecare (stropire cu apă, folii de protecție, membrane de curing), pentru a evita fisurarea de contracție plastică la suprafața centurilor/planșeelor; turnarea în orele mai răcoroase ale zilei (dimineața devreme/seara), evitarea turnării în plină expunere solară directă pe elemente subțiri (buiandrugi, centuri).
- **Zidărie**: umezirea prealabilă a elementelor de zidărie (cărămidă GVP absoarbe apa din mortar dacă e prea uscată, compromițând priza mortarului) și protejarea rândurilor proaspăt așezate de uscarea forțată prin vânt/soare direct, conform practicii curente pentru execuție pe caniculă.
- **Tratarea betonului (curing)**: menținerea umidității suprafeței betonului minimum 7 zile (stropire periodică sau membrane de protecție), condiție esențială pentru atingerea rezistenței de proiect și pentru limitarea fisurării de contracție la elementele cu suprafață mare (planșee).

---

## PTh-R.11 — PROGRAMUL COMPLET DE PROBE ȘI ÎNCERCĂRI

### PTh-R.11.1 Încercări pe beton

| Element | Tip încercare | Frecvență | Criteriu de acceptare |
|---|---|---|---|
| Toate elementele (fundații, sâmburi, centuri, buiandrugi, planșee) | Tasare (con Abrams) | La fiecare transport de beton pus în operă | conform clasei de consistență prescrise (S3) |
| Toate elementele | Rezistență la compresiune pe cuburi/cilindri, la 28 zile | Minimum 1 serie (3 epruvete)/element principal turnat distinct (conform PTh-R.6.1) | `fck` conform clasei prescrise (C16/20 confinare, C20/25 planșee/fundații) |
| Elemente turnate pe timp friguros | Serie suplimentară de probe, conservate în condiții identice elementului real | La fiecare turnare pe timp friguros | confirmarea rezistenței de decofrare înainte de îndepărtarea susținerilor |
| Beton proaspăt (opțional, la volume mari) | Conținut de aer antrenat, densitate | La cererea proiectantului/dirigintelui, funcție de condiții de expunere | conform SR EN 206 |

### PTh-R.11.2 Încercări pe oțel-beton

| Verificare | Frecvență | Criteriu de acceptare |
|---|---|---|
| Certificat 3.1 (sau echivalent) pe lot | La fiecare lot/livrare | fyk=500, clasa de ductilitate C (`εuk≥7,5%`, `(ft/fy)k` 1,15–1,35) |
| Verificare marcaj/diametru la recepție | La fiecare livrare | concordanță cu comanda și cu planul de armare |
| Încercare de tracțiune pe eșantion (dacă solicitată de proiectant/dirigintele de șantier, la dubii asupra certificatului) | Prin sondaj | conform SR EN 10080 |

### PTh-R.11.3 Încercări pe zidărie și mortar

| Verificare | Frecvență | Criteriu de acceptare |
|---|---|---|
| Certificat de conformitate elemente de zidărie (GVP/BCA) | La fiecare lot | `fb = 10,0 N/mm²` (sau echivalent declarat) |
| Consistență mortar preparat pe șantier | La fiecare șarjă | conform rețetei aprobate (M5) |
| Rezistență mortar pe eprubete (dacă se prepară pe șantier, la cererea dirigintelui) | Prin sondaj, minimum 1 set/etapă majoră de execuție | `fm ≥ 5,0 N/mm²` |
| Rezistență caracteristică a zidăriei (calcul, nu încercare directă, conform SR EN 1996-1-1 §3.6.1.2) | — | `fk = 3,65 N/mm²` confirmat prin proprietățile componentelor (structura.md §3.1) |

### PTh-R.11.4 Încercări pe terenul de fundare

| Verificare | Moment | Criteriu de acceptare |
|---|---|---|
| Confruntare vizuală teren deschis vs. studiu geotehnic | La fiecare tronson de săpătură, înainte de turnarea stratului de egalizare | concordanță cu stratificația din structura.md §4.4 (`pconv = 200 kPa`) |
| Probă de placă (opțional, dacă apar dubii la deschiderea săpăturii) | La cererea geotehnicianului/proiectantului | confirmarea modulului de deformație/presiunii convenționale presupuse |

### PTh-R.11.5 Documente de conformitate arhivate la Cartea Tehnică

Toate buletinele de încercare, certificatele de calitate și rapoartele de mai sus se arhivează în dosarul as-built de structură (PTh-R.13.4), cu trasabilitate completă marcă element ↔ certificat ↔ buletin de încercare, condiție pentru recepția finală a lucrărilor.

---

## PTh-R.12 — VERIFICĂRI SUPLIMENTARE LA STAREA LIMITĂ DE SERVICIU

### PTh-R.12.1 Controlul fisurării la centuri și planșee (SR EN 1992-1-1 §7.3)

DTAC (structura.md §11.2) a verificat deplasările relative de nivel (drift) și săgețile planșeului/căpriorilor, cu rezerve ample. Se completează aici verificarea la **deschiderea fisurilor** pentru elementele de beton armat expuse (centuri aparente, dacă neacoperite de ETICS pe fețele interioare, și intradosul planșeelor):

Clasa de expunere `XC1` (interior) — deschiderea de calcul a fisurilor admisă `wmax = 0,4 mm` (SR EN 1992-1-1 tabel 7.1N, condiții de mediu uscat/interior). Cu procentul de armare adoptat la planșee (`Ø8/150`, `As = 335 mm²/m`, ρ ≈ 0,29% pentru `d=115mm`) și efortul de exploatare la SLS (combinația cvasipermanentă, `g+ψ2·q`), verificarea simplificată (metoda directă, fără calcul explicit al lățimii fisurii, conform SR EN 1992-1-1 §7.3.3, tabel 7.2N — diametrul maxim admis al barei funcție de efortul unitar în oțel): la `σs` estimat sub `280 N/mm²` (efort redus la SLS, dat fiind gradul de utilizare la SLU de doar `0,53×` pentru diametrul necesar), diametrul maxim admis pentru `wmax=0,4mm` este `≥ 25 mm` (tabel 7.2N) — **`Ø8` adoptat este amplu sub acest maxim** → control automat al fisurării satisfăcut fără verificare explicită suplimentară.

**Centurile aparente** (dacă rămân vizibile la interior, netencuite sau tencuite subțire): fiind elemente cu rol de confinare, nu de rezistență principală la încovoiere sub sarcini de exploatare directe, fisurarea de natură structurală este puțin probabilă; eventualele fisuri fine de contracție se tratează prin măsuri de finisaj (bandă de armare la interfața centură-zidărie, `arhitectura-pth.md` §PTh-A.5.1, principiul de continuitate a barierelor).

### PTh-R.12.2 Vibrațiile planșeului — verificare de confort (informativ)

Pentru un planșeu de beton armat monolit de grosime `14 cm` pe deschideri `4,0–4,5 m`, rezemat pe 4 laturi pe pereți de zidărie confinată (rigiditate mare la reazeme), frecvența proprie fundamentală estimată (formulă simplificată pentru placă rezemată pe contur, `f1 ≈ 18/√δ`, cu `δ` săgeata sub greutate proprie + utilă cvasipermanentă, în mm):

Din structura.md §10.1/§11.2, săgețile planșeului nu sunt explicit calculate (doar verificarea la încovoiere), dar pentru o placă de `14 cm` pe deschidere `4,0 m` cu procentul de armare adoptat, săgeata cvasipermanentă estimată este de ordinul `δ ≈ 3–5 mm` (valoare tipică pentru plăci de beton armat rezemate pe 4 laturi rigide, cu deschideri moderate și grosime relativ generoasă față de deschidere — raport `L/h = 4.000/140 ≈ 28,6`, sub limita uzuală `L/h ≤ 35` pentru plăci rezemate pe contur fără verificare explicită la săgeată, SR EN 1992-1-1 §7.4.2).

`f1 ≈ 18/√5 ≈ 8,0 Hz` — valoare peste pragul de percepție a vibrațiilor induse de activități umane normale (uzual critic sub `≈ 5 Hz` pentru clădiri de locuit, conform practicii curente de proiectare la vibrații de planșeu) → **confort la vibrații neproblematic**, caracteristic unei plăci rigide rezemate pe pereți denși de zidărie confinată (spre deosebire de planșeele suple pe cadre cu deschideri mari, unde acest calcul devine critic).

### PTh-R.12.3 Contra-săgeți de execuție (informativ, pentru cofrarea planșeelor)

Pentru planșeele curente (deschidere `≤ 4,5 m`, grosime `14 cm`), nu se recomandă contra-săgeată de cofrare (camber) — practică rezervată deschiderilor mari sau elementelor prefabricate/precomprimate, nu planșeelor monolite de deschidere mică pe reazeme rigide, unde săgeata absolută este oricum redusă (§PTh-R.12.2). Cofrajul se execută perfect orizontal (planeitate conform PTh-R.8.1), fără contra-săgeată intenționată.

---

## PTh-R.13 — PROGRAM DE URMĂRIRE ÎN TIMP, RECEPȚIA LUCRĂRILOR ȘI CARTEA TEHNICĂ

### PTh-R.13.1 Programul de urmărire a comportării în timp (P130/1999)

Conform structura.md §13.4, pentru o locuință de categorie de importanță **D** (redusă), clasa de importanță seismică **III**, cu soluție structurală standard (zidărie confinată conform CR 6, fără condiții geotehnice speciale), **nu este necesar un program de urmărire specială** instrumentată (program obligatoriu doar pentru construcții de categorii superioare de importanță sau cu condiții deosebite de fundare/execuție). Se recomandă **urmărirea curentă** (vizuală, de către proprietar, la intervale regulate — recomandat anual și după evenimente deosebite: cutremur resimțit, viscol/vânt excepțional, inundație locală):

- Observarea eventualelor fisuri în tencuieli/zidărie (poziție, orientare, evoluție în timp — fotografiere comparativă);
- Verificarea absenței tasărilor vizibile ale fundației/soclului (denivelări ale pardoselii exterioare, deschideri de rosturi la interfața fundație-teren);
- Verificarea absenței infiltrațiilor de apă la hidroizolațiile de fundație/soclu (D01 arhitectura-pth) și la zonele umede interioare (D13 arhitectura-pth);
- Semnalarea către un specialist atestat a oricărui semn de degradare structurală (fisuri înclinate la 45° în zidărie — indiciu de forfecare, fisuri orizontale la baza sâmburilor — indiciu de posibilă problemă de fundare).

Dacă studiul geotehnic definitiv relevă condiții speciale de teren (risc de tasare, teren sensibil la umezire), proiectantul poate recomanda punctual un program minimal de urmărire (repere de tasare, citiri periodice) — decizie luată explicit la faza PT, conform structura.md §13.4.

### PTh-R.13.2 Recepția pe faze de execuție a lucrărilor de structură

Conform Normativului C56/2002 și HG 273/1994, recepția lucrărilor de structură se realizează etapizat, prin procese-verbale de recepție calitativă (PVRC) și procese-verbale de lucrări ascunse (PVLA — lista completă PTh-R.6.3), încheiate între executant, dirigintele de șantier și, după caz, proiectantul de structură, la fiecare din punctele critice enumerate în PTh-R.7. Niciuna dintre lucrările din lista PTh-R.6.3 nu se acoperă fără proces-verbal semnat.

### PTh-R.13.3 Recepția la terminarea lucrărilor de structură

La finalizarea integrală a lucrărilor de structură (structura la roșu, FD7), comisia de recepție verifică, pe baza documentației PTh și a proceselor-verbale intermediare:
- conformitatea execuției cu proiectul autorizat (dimensiuni, poziții sâmburi/centuri/buiandrugi, grosimi elemente);
- respectarea toleranțelor din PTh-R.8 pe eșantioane reprezentative (verticalitate, planeitate, denivelări);
- rezultatele buletinelor de încercare pe beton (`fck` la 28 zile pentru toate elementele) și conformitatea certificatelor de calitate a oțelului-beton și zidăriei;
- absența defectelor vizibile (fisuri, segregări, nid de pietriș) la elementele de beton armat aparente.

### PTh-R.13.4 Conținutul dosarului as-built de structură

Dosarul as-built de structură, parte a cărții tehnice a construcției, cuprinde: planurile de armare actualizate cu modificările de șantier acceptate (dacă există, cu avizul proiectantului); toate procesele-verbale de lucrări ascunse (PTh-R.6.3); buletinele de încercare pe beton (toate elementele); certificatele de conformitate/calitate pentru zidărie, oțel-beton, ciment, agregate; procesele-verbale de fază determinantă (PTh-R.7); fotografiile lucrărilor ascunse înainte de acoperire (în special armarea sâmburilor/centurilor la fiecare nivel), atașate proceselor-verbale corespunzătoare; procesul-verbal de recepție la terminarea lucrărilor de structură.

**Prezenta documentație de execuție se supune verificării tehnice de către verificatori de proiecte atestați MDLPA**, conform Legii nr. 10/1995 și HG nr. 925/1995, pentru cerințele:
- **Cerința A1** — rezistență și stabilitate pentru construcții de zidărie, beton și beton armat;
- **Cerința Af (A2)** — rezistență și stabilitate a terenului de fundare și a fundațiilor.

---

## PTh-R.14 — SINTEZA CORECȚIILOR DE PROIECTARE PTH FAȚĂ DE DTAC ȘI CONCLUZIE INGINEREASCĂ

### PTh-R.14.1 Sinteza corecțiilor/completărilor aduse de faza PTh

| Aspect | DTAC (structura.md) | PTh (prezentul document) | Motivul completării |
|---|---|---|---|
| Sâmburi | Element-tip verificat (secțiune, armare, rol funcțional) | 16 poziții individuale inventariate și localizate pe planul de arhitectură definitiv (F1…F14, U1…U10) | Necesitatea planului de execuție cotat, poziție cu poziție |
| Buiandrugi | Secțiune curentă (25×25, `3Ø12+2Ø10`) pentru goluri ≤ 1,80 m, cu mențiunea explicită de recalculare la PT pentru golul garajului | Recalcul individual pentru fiecare poziție din tabloul de tâmplărie; buiandrugi majorați dimensionați explicit pentru U2 (ușă HS 3,00 m, secțiune 30×40, `4Ø16+2Ø14`) și U3 (ușă garaj 2,50 m, secțiune 30×35, `4Ø16+2Ø12`) | Cerință explicită DTAC §7.4, onorată aici cu calcul complet |
| Nod de cruce (perete median × perete median) | Menționat generic ca poziție de sâmbure (intersecție de pereți) | Detaliu explicit de coliziune armătură pe cele patru direcții convergente (PTh-R.2.6, PTh-R.4.3) | Necesitate de execuție, netratată la nivel de principiu în DTAC |
| Densitate de pereți pe traveea cu gol mare (ușă HS) | Verificare globală pe toată fațada/direcția | Verificare locală a lungimii minime de panou activ între goluri consecutive (PTh-R.2.5), cu recomandare de coordonare cu arhitectura | Rafinare necesară doar dacă poziția definitivă a golurilor pe fațada sud reunește F2+U2 apropiate |
| Extras de materiale | Estimare globală pe categorii mari (structura.md §13.3) | Defalcare pe poziții individuale de elemente (PTh-R.3), cu bill of quantities pe marcă | Necesitate de antemăsurătoare de execuție |
| Toleranțe | Nemenționate explicit (nivel DTAC) | Tabele complete SR EN 13670 (beton armat) și SR EN 1996-2 (zidărie) — PTh-R.8 | Cerință de fază PTh |
| PVLA | Fazele determinante enumerate generic (structura.md §13.2) | Listă completă de 11 puncte de control cu moment de verificare și criteriu de acceptare (PTh-R.6.3), inclusiv armarea și betonarea sâmburilor/centurilor ca puncte distincte | Cerință explicită de proiectare (plan de control al calității detaliat) |

### PTh-R.14.2 Tabel centralizator conformitate — toate verificările suplimentare PTh

| Verificare | Rezultat | Stare |
|---|---|---|
| Buiandrug U2 (HS 3,00 m) — încovoiere | `M_Ed/M_Rd = 0,25` | ✓ |
| Buiandrug U2 — forfecare | betonul simplu acoperă `V_Ed`, etrieri constructivi | ✓ |
| Buiandrug U3 (garaj 2,50 m) — încovoiere | `M_Ed/M_Rd = 0,18` | ✓ |
| Ancoraj cosoroabă — smulgere din sucțiune vânt | `N_Ed = 0,32 kN` vs. capacitate `≥ 8–10 kN` | ✓ (rezervă foarte mare) |
| Continuitate armătură nod de cruce S9 | rezolvată prin decalaj vertical `≥ 15 mm` între direcții | ✓ (soluție constructivă) |
| Densitate panou activ între goluri (F2-U2) | condiționată de poziția definitivă — recomandare `≥ 1,18 m` zidărie plină | ⚠ (verificare la faza PT finală, pe planul de arhitectură definitiv) |
| Consum oțel-beton (actualizat, cu buiandrugi majorați + scară b.a.) | `17,2 kg/m² Ad` (interval uzual 12–22 kg/m²) | ✓ |

### PTh-R.14.3 Concluzie inginerească

Sistemul structural de zidărie portantă confinată, dimensionat de principiu la faza DTAC (`structura.md`) și dus la nivel de execuție prin prezentul supliment PTh, rămâne **integral valabil și conform** la nivelul de detaliere cerut fazei de execuție. Extinderea verificărilor de la elementul-tip (DTAC) la toate cele 16 poziții efective de sâmburi, la toate cele 24 de poziții de buiandrugi (inclusiv cele două goluri mari — ușa HS de 3,00 m și ușa de garaj de 2,50 m, recalculate individual cu secțiuni majorate) și la nodul de cruce al pereților mediani confirmă că soluția constructivă de bază (secțiune 25×25 cm, `4Ø12` pentru sâmburi/centuri curente) este **acoperitoare pentru toate pozițiile curente**, cu **completări punctuale justificate prin calcul** doar la buiandrugii golurilor mari (secțiuni majorate 30×40 și 30×35 cm).

Planurile de armare cotate (PTh-R.4), extrasul de materiale pe element (PTh-R.3), tehnologia de execuție cu succesiunea obligatorie zidărie→sâmbure→centură→planșeu (PTh-R.5), planul de control al calității cu accent explicit pe armarea și betonarea elementelor de confinare (PTh-R.6) și toleranțele de execuție conform SR EN 13670/SR EN 1996-2 (PTh-R.8) constituie, împreună, baza tehnică suficientă pentru execuția pe șantier a structurii de rezistență, sub supravegherea dirigintelui de șantier și cu verificarea tehnică a proiectului de către verificatori atestați MDLPA pentru cerințele A1 și Af, conform Legii nr. 10/1995.

Varianta alternativă (Varianta B — cadre de beton armat, structura.md cap. 8) rămâne disponibilă ca soluție documentată la faza DTAC, aplicabilă cu propriul supliment PTh dacă beneficiarul optează explicit pentru configurația cu parter deschis (garaj integrat sub structură, nu doar compartimentare cu gol mare în zidărie confinată, cazul tratat în prezentul document).

---

*Prezentul supliment de fază PTh se citește împreună cu memoriul de rezistență DTAC (`structura.md`), memoriul de arhitectură DTAC și suplimentul PTh de arhitectură (`arhitectura.md`, `arhitectura-pth.md`) și memoriul de instalații (`instalatii.md`) ale aceleiași funcțiuni de referință — locuință individuală izolată P+1E, zidărie confinată, proiect Cătămărăști —, cu care formează tripletul complet al fazei PTh.*
</content>
