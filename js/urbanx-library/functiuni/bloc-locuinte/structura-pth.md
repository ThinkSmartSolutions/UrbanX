## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență (`structura.md`), elaborat conform **HG nr. 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice și **Legii nr. 10/1995** privind calitatea în construcții. El aprofundează faza DTAC deja redactată — sistem structural dual (cadre + pereți structurali predominanți din beton armat, DCM, q = 3,45), materialele, acțiunile (permanente, utile, zăpadă, vânt, seism), spectrul de proiectare P100-1/2013, grupările de încărcări, calculul de capacitate al elementelor de bază, fundarea pe radier general, predimensionarea secțiunilor și comportarea la foc — și îl aduce la nivelul de detaliere necesar EXECUȚIEI PE ȘANTIER: înfășurătoarea completă de eforturi (forță tăietoare și moment încovoietor) pe fiecare din cele 10 niveluri ale clădirii, caietul de armare complet (pereți, planșee, radier, infrastructură), extrasul de materiale, rosturile de tasare/dilatație/seism cu detalii de execuție, tehnologia de execuție a betonului armat (cofraje, turnare, tratare, control), execuția infrastructurii sub nivelul hidrostatic, planul de control al calității, fazele determinante, programul de urmărire în timp și coordonarea cu arhitectura și instalațiile.

Obiectivul de investiție: **BLOC DE LOCUINȚE COLECTIVE**, regim de înălțime **S+P+8E**, amprentă la sol **24,00 × 16,00 m** (384 mp/nivel), **40 apartamente**, **~112 locuitori estimați** (a se vedea `general.md`, cap. 6.4), sistem structural **dual cu pereți predominanți din beton armat** (nucleu casă-scară + lift ca tub închis, 2 pereți transversali de capăt l_w = 6,00 m, 2 pereți transversali interiori l_w = 4,00 m, 2 pereți longitudinali l_w = 5,40 m, cadre perimetrale și interioare cu stâlpi 60×60 cm reduși la 50×50 cm la etajele superioare și grinzi 30×60 cm), fundat pe **radier general din beton armat** peste un subsol de tip cuvă etanșă (parcaj, boxe, spații tehnice, adăpost ALA). Amplasament caracterizat prin **a_g = 0,25g**, **T_C = 0,70 s**, clasă de ductilitate **DCM**, factor de comportare **q = 3,45**, clasa de importanță-expunere **III** (γ_I,e = 1,0), clasa de consecințe **CC2**, categoria geotehnică **2**, grad de rezistență la foc **II**.

Documentul **NU repetă** breviarul de predimensionare din DTAC (`structura.md`, cap. 1-17) și **NU se suprapune** cu Caietul de sarcini pentru lucrări de beton armat (document distinct, elaborat separat). Structura capitolelor prezentului supliment:

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Spectrul de proiectare P100-1 și analiza modală — detaliere completă și validare încrucișată |
| PTh-R.3 | Înfășurătoarea forței tăietoare și a momentului încovoietor pe toate cele 10 niveluri |
| PTh-R.4 | Verificări suplimentare CR 2-1-1.1/2013 (Cod de proiectare a pereților structurali de beton armat) |
| PTh-R.5 | Caiet de armare — pereți structurali (nucleu, pereți transversali, pereți longitudinali) |
| PTh-R.6 | Caiet de armare — planșee (dală curentă, zone de goluri, centuri-colectori, balcoane) |
| PTh-R.7 | Caiet de armare — fundație (radier general) și infrastructură (pereți subsol, placă peste subsol) |
| PTh-R.8 | Extras de materiale (bill of quantities pe poziții/repere) |
| PTh-R.9 | Rosturi — seismic, tasare, contracție/dilatație tehnologică — detaliu de execuție |
| PTh-R.10 | Tehnologia de execuție a structurii de beton armat (cofraje, turnare, tratare, decofrare) |
| PTh-R.11 | Execuția infrastructurii — hidroizolație, epuizment, apă freatică, cuvă etanșă |
| PTh-R.12 | Planul de control al calității — beton (probe cilindri/ultrasonic) și armătură |
| PTh-R.13 | Faze determinante — detaliere completă |
| PTh-R.14 | Coordonarea cu arhitectura și instalațiile |
| PTh-R.15 | Verificări suplimentare la SLS (vibrații planșee, contrasăgeți, fisurare) |
| PTh-R.16 | Program de urmărire în timp (P130) și monitorizare specifică |
| PTh-R.17 | Sinteza corecțiilor PTh față de DTAC + concluzie inginerească |

### Date generale de proiectare (recapitulare parametri de bază, preluați identic din DTAC)

| Parametru | Valoare | Sursă |
|---|---|---|
| Amprentă la sol | 24,00 × 16,00 m | `structura.md` §1.2 |
| Regim de înălțime | S+P+8E | `general.md` §1.1 |
| Accelerația terenului a_g | 0,25·g | P100-1/2013, fig. 3.1 |
| Perioada de colț T_C | 0,70 s | P100-1/2013, fig. 3.2 |
| Clasa de ductilitate / factor q | DCM / q = 3,45 | P100-1/2013 tab. 5.1 |
| Perioadă proprie T_1 | 0,55–0,62 s | model EF, `structura.md` §7.2 |
| Forța seismică de bază F_b | ≈ 7.083 kN/direcție | `structura.md` §7.3 |
| Beton radier/pereți subsol | C30/37, XC2+XA1, W8/P8 | `structura.md` §4.1 |
| Beton stâlpi S-P/pereți S-E2/nucleu | C35/45, XC1 | `structura.md` §4.1 |
| Beton stâlpi E3-E8/pereți E3-E8 | C30/37, XC1 | `structura.md` §4.1 |
| Beton grinzi/planșee | C25/30, XC1 | `structura.md` §4.1 |
| Oțel | B500C (clasa C, DCM) | SR EN 10080 |
| Cotă radier | −4,00 m | `structura.md` §1.2 |
| Nivel hidrostatic maxim | −2,50 m | `structura.md` §11.1 |
| Grad de rezistență la foc | II | P118/1999 |
| Categoria geotehnică | 2 | NP 074-2022 |

Cadrul normativ complet este cel enunțat în DTAC (`structura.md` cap. 2 și cap. 17): Legea 10/1995, Legea 50/1991 + Anexa 1, HG 907/2016, HG 766/1997, P100-1/2013, CR 0-2012, CR 1-1-3/2012, CR 1-1-4/2012, NP 112-2014, NP 074-2022, SR EN 1990–1998, SR EN 206, SR EN 10080. Suplimentar, prezentul document citează explicit **CR 2-1-1.1/2013** (Cod de proiectare a pereților structurali de beton armat — completează P100-1 §5.4.3 cu prevederi de detaliere pentru pereți, cuplaje și zone critice), **SR EN 1992-1-1 cap. 6-8-11** (verificări detaliate SLU/SLS și dispoziții constructive), **SR EN 12390** (încercarea betonului întărit — cuburi și cilindri), **SR EN 12504-2** (încercarea nedistructivă — determinarea indicelui de recul; se corelează, unde este cazul, cu metoda ultrasonică conform SR EN 12504-4), **SR EN ISO 6892-1** (încercarea la tracțiune a materialelor metalice — oțel-beton), **C 56/2002** (normativ pentru verificarea calității lucrărilor de construcții), **C 16-1984** (normativ pentru realizarea pe timp friguros a lucrărilor de construcții) și **P130/1999** (normativ privind urmărirea comportării în timp a construcțiilor).

---

## PTh-R.2 — SPECTRUL DE PROIECTARE ȘI ANALIZA MODALĂ — DETALIERE ȘI VALIDARE

### PTh-R.2.1 Convenții și metodologie

Toate eforturile din prezentul supliment provin din analiza spațială în element finit (model 3D — pereți shell, cadre bară, planșee diafragmă rigidă, fundație pe resoarte Winkler; ipotezele complete sunt cele din `structura.md` §2.3-2.4), rulată cu **rigiditate fisurată 0,5·E·I** pentru gruparea seismică (P100-1 §4.5.3.3) și rigiditate nefisurată corectată cu fluaj pentru gruparea gravitațională de serviciu. Dimensionarea la **SLU** urmează metoda coeficienților parțiali (γ_c, γ_s din `structura.md` §4.3); verificările la **SLS** (deplasări relative de nivel, săgeți, fisurare) conform §10 DTAC. Elementele disipative (bazele pereților, grinzile de cadru, buiandrugii de cuplare) se dimensionează la capacitatea reală de rotire plastică; elementele nedisipative (stâlpii, nodurile de cadru, infrastructura) se verifică la **efortul de proiectare bazat pe capacitate**, cu factor de suprarezistență γ_Rd = 1,20 (pereți) și condiția Σ M_Rc ≥ 1,3·Σ M_Rb (stâlpi/grinzi, capacity design).

Prezentul breviar extinde exemplul numeric din DTAC (peretele Y de capăt, peretele X longitudinal, stâlpul curent, grinda tip și placa curentă, toate verificate la nivelul bazei/nivelului tip) la **întreaga înfășurătoare pe toate cele 10 niveluri** (subsol, parter, E1-E8, plus terasa ca ultim nivel de masă), la fiecare element vertical principal (nucleu, 2 pereți Y, 2 pereți X, stâlpi curenți și stâlpi de colț) și la variația secțiunilor și a claselor de beton pe înălțime (materiale mai rezistente la bază, reduse gradual spre vârf, conform §4.1 DTAC).

### PTh-R.2.2 Spectrul de proiectare — reconfirmare pe toate ordonatele relevante

Spectrul de proiectare (accelerații) folosit la calculul forței de bază și la distribuția pe verticală este cel redat integral în `structura.md` §5.2 și §5.2 bis (tabelul ordonatelor β(T), S_ae, S_d, S_De pentru T de la 0 la 3,0 s). Faza PTh reconfirmă acest spectru pe amplasamentul definitiv, cu obligația proiectantului de a verifica — la punerea în temă a studiului geotehnic definitiv — dacă valorile a_g, T_C și clasa de teren din harta de zonare rămân neschimbate față de ipoteza DTAC. Dacă amplasamentul real prezintă condiții de teren mai moi (V_s,30 < 180 m/s), se impune un studiu de răspuns seismic specific de amplasament (site-specific), care poate modifica local forma spectrului pe palierul de perioade lungi — situație care NU se presupune aici, dar se semnalează ca ipoteză de verificat.

Perioadele proprii validate în model (T_1,X ≈ 0,62 s, T_1,Y ≈ 0,55 s, T_torsiune ≈ 0,48 s) cad, ambele, pe palierul de amplificare maximă β = β_0 = 2,50, ceea ce înseamnă că orice mică variație a rigidității reale a structurii (rezultată din execuție — de exemplu, clase de beton efective ușor diferite de cele nominale, sau conlucrarea reală a zidăriei de compartimentare cu structura) **nu modifică ordonata spectrală de proiectare** S_d = 0,181g, atâta timp cât T_1 rămâne sub T_C = 0,70 s. Aceasta este o marjă de robustețe utilă la faza de execuție: mici abateri de rigiditate față de model nu invalidează dimensionarea.

### PTh-R.2.3 Analiza modală — completare la tabelul din DTAC §11bis

Tabelul modurilor proprii și al maselor modale efective din `structura.md` §11bis.2 (94,7% cumulat pe X, 95,7% pe Y la 8 moduri) se completează, la faza PTh, cu **distribuția de eforturi mod cu mod** pentru primele 3 moduri pe fiecare direcție, necesară pentru combinarea CQC (§11bis.3 DTAC) și pentru identificarea contribuției modurilor superioare la eforturile din pereți la nivelurile intermediare (unde efectul modurilor 2 și 3 este proporțional mai important decât la bază, din cauza formei modale cu semn schimbat pe înălțime).

| Mod | T [s] | Direcție | Forma modală (semnificație calitativă) | Contribuție relevantă |
|---|---|---|---|---|
| 1 | 0,62 | translație X | monotonă, maxim la vârf | domină M_bază și V_bază |
| 2 | 0,17 | translație X (mod 2) | schimbare de semn la ≈ 0,7H | crește V la niveluri intermediare (E4-E6) peste valoarea din modul 1 singur |
| 3 | 0,082 | translație X (mod 3) | 2 schimbări de semn | contribuție redusă, dar neneglijabilă la V din partea superioară |
| 1 | 0,55 | translație Y | monotonă | domină M_bază și V_bază pe Y |
| 2 | 0,15 | translație Y (mod 2) | schimbare de semn la ≈ 0,65H | analog modului 2 pe X |

Consecința practică pentru caietul de armare (§PTh-R.5): **forța tăietoare de proiectare a pereților la nivelurile mediane (E3-E6) NU se reduce liniar** față de valoarea de la bază, ci rămâne pe un palier apropiat de V_bază/2 până spre 2/3 din înălțime — exact prevederea din `structura.md` §8.1 bis (diagrama înfășurătoare acoperitoare), reconfirmată aici prin analiza modală. Armătura orizontală a pereților (etrieri de inimă) **nu se reduce proporțional cu M** pe înălțime, ci urmărește înfășurătoarea de forță tăietoare, mai plată.

### PTh-R.2.4 Combinarea componentelor seismice și a excentricităților — reconfirmare

Se mențin cele 16 grupări seismice din `structura.md` §6.5/§11bis.5 (regula 100%+30% pe cele două direcții, × 2 semne de excentricitate accidentală). La faza PTh se adaugă o verificare suplimentară: **excentricitatea accidentală se aplică independent la fiecare nivel** (nu doar la nivelul de referință), cu e_1,i = ±0,05·L_i (L_i = dimensiunea în plan la nivelul i, constantă pe toată înălțimea — 24 m pe X, 16 m pe Y, structura fiind prismatică fără retrageri, conform regularității în elevație verificate la `structura.md` §15bis.2). Momentul de torsiune de nivel rezultat M_t,i = e_1,i·F_i este maxim la nivelurile cu forță de nivel mare (E7-E8, unde F_i ≈ 1.150-1.310 kN) și se preia, ca și la bază, predominant de nucleul central închis (§8.8 DTAC), a cărui rigiditate la torsiune (modulul Bredt, A_m = 21,09 m²) este constantă pe înălțime (nucleul nu-și schimbă secțiunea decât o dată, la E4, prin reducerea grosimii de la 30 la 25 cm).

---

## PTh-R.3 — ÎNFĂȘURĂTOAREA FORȚEI TĂIETOARE ȘI A MOMENTULUI ÎNCOVOIETOR PE TOATE CELE 10 NIVELURI

### PTh-R.3.1 Metodologie de construcție a înfășurătorii

DTAC (`structura.md` §7.4) a stabilit forțele de nivel F_i din distribuția pe verticală (metoda forțelor laterale echivalente, formă modală aproximată triunghiular) și forța de bază normalizată F_b = 7.083 kN. Prezentul supliment reia acel calcul, **normalizează explicit** fiecare forță de nivel la suma 7.083 kN (DTAC semnala normalizarea ca operație de model, fără a tabela rezultatul normalizat) și construiește, pentru fiecare interfață de nivel, **forța tăietoare cumulată** (V_i = suma forțelor de nivel situate deasupra interfeței) și **momentul încovoietor cumulat** (M_i = suma produselor F_j·(z_j − z_i), pentru toate nivelurile j situate deasupra interfeței i).

**Forțele de nivel normalizate** (factor de normalizare 7.083/7.798 ≈ 0,908, aplicat șirului din `structura.md` §7.4):

| Nivel | z_i [m] | F_i pre-normalizare [kN] | F_i normalizat [kN] |
|---|---|---|---|
| Terasă | 26,40 | 1.226 | 1.113 |
| E8 | 23,50 | 1.446 | 1.313 |
| E7 | 20,60 | 1.268 | 1.152 |
| E6 | 17,70 | 1.089 | 989 |
| E5 | 14,80 | 911 | 827 |
| E4 | 11,90 | 732 | 665 |
| E3 | 9,00 | 554 | 503 |
| E2 | 6,10 | 375 | 341 |
| E1 | 3,20 | 197 | 179 |
| Parter | 0,00 | 0 | 0 |
| **Σ** | | **7.798** | **≈ 7.083** |

### PTh-R.3.2 Tabelul complet al forței tăietoare și al momentului încovoietor pe interfețele de nivel

Forța tăietoare la interfața de sub un nivel dat este suma cumulată a forțelor de nivel de deasupra; momentul încovoietor la aceeași interfață este suma produselor forță×braț, cu brațul măsurat de la interfața respectivă la fiecare nivel de deasupra. Rezultatele (metoda forțelor laterale echivalente, valori de proiectare la SLU seismic, direcția X — analog și pe Y cu F_b = 7.083 kN, tabel comparabil întrucât distribuția pe verticală este identică, diferind doar rigiditatea de repartiție pereți/cadre):

| Interfață (sub nivelul) | z interfață [m] | V_Ed [kN] | M_Ed [kNm] |
|---|---|---|---|
| Terasă → E8 | 23,50 | 1.113 | 3.228 |
| E8 → E7 | 20,60 | 2.426 | 10.263 |
| E7 → E6 | 17,70 | 3.578 | 20.639 |
| E6 → E5 | 14,80 | 4.567 | 33.884 |
| E5 → E4 | 11,90 | 5.394 | 49.526 |
| E4 → E3 | 9,00 | 6.059 | 67.098 |
| E3 → E2 | 6,10 | 6.562 | 86.127 |
| E2 → E1 | 3,20 | 6.903 | 106.147 |
| E1 → Parter | 0,00 | 7.082 | 128.809* |
| Parter → Subsol (baza suprastructurii) | −0,15 | 7.082 (+F_parter=0) | ≈ 129.870 (interpolat) |

*Notă: valoarea de 128.809 kNm rezultată din însumarea detaliată pe niveluri este cu ≈ 1% mai mare decât aproximarea M_rast ≈ 127.500 kNm din `structura.md` §7.4 (care folosea un braț efectiv z_eff ≈ 0,68H simplificat); diferența este atribuibilă rotunjirilor succesive și este acoperitoare pentru dimensionare — se reține valoarea mai mare (128.800 kNm) ca moment de răsturnare de proiectare la baza suprastructurii, transmis apoi la infrastructură amplificat cu γ_Rd conform §PTh-R.3.5.

Se confirmă astfel: (a) forța tăietoare la baza suprastructurii V_Ed,bază = F_b = 7.083 kN (identic cu §7.3 DTAC); (b) momentul de răsturnare M_rast la bază ≈ 128.800 kNm (consistent, cu marjă de acoperire, cu §7.4 DTAC); (c) creșterea aproape liniară a lui V pe primele niveluri de sus (efect al maselor egale pe etaje) și accelerarea creșterii lui M spre bază (produsul forță×braț se acumulează pătratic pe înălțime).

### PTh-R.3.3 Repartiția pereți/cadre pe fiecare nivel

Repartiția globală la bază (§8.1 DTAC: pereți 68% pe X, 72% pe Y) nu este constantă pe înălțime — cadrele contribuie proporțional mai mult la nivelurile superioare (unde pereții, mai zvelți relativ la deschiderea de moment, cedează o parte din rigiditatea relativă cadrelor), fenomen tipic sistemelor duale. Se prezintă repartiția estimată pe niveluri caracteristice (interpolare pe baza rigidităților relative din model, validată prin verificarea sumei V_pereți + V_cadre = V_Ed total):

| Nivel (interfață) | V_Ed total [kN] (dir. X) | V_pereți [kN] | V_cadre [kN] | % pereți |
|---|---|---|---|---|
| E1 → Parter (bază) | 7.082 | 4.816 | 2.267 | 68,0% |
| E3 → E2 | 6.562 | 4.267 | 2.295 | 65,0% |
| E5 → E4 | 5.394 | 3.343 | 2.051 | 62,0% |
| E7 → E6 | 3.578 | 2.111 | 1.467 | 59,0% |
| Terasă → E8 | 1.113 | 622 | 491 | 55,9% |

La toate nivelurile, pereții rămân majoritari (> 50%) ⇒ clasificarea de sistem **dual cu pereți predominanți** (P100-1 §5.2.2.1) se menține pe toată înălțimea, nu doar la bază — condiție verificată explicit la faza PTh, întrucât P100-1 nu impune verificarea procentuală decât la bază, dar buna practică (și robustețea mecanismului disipativ) cer confirmarea pe toată înălțimea. Cadrele se dimensionează, la fiecare nivel, pentru minimum 25% din forța de nivel (cerința de redundanță, §8.1 DTAC), condiție satisfăcută cu marjă la toate nivelurile din tabel (minim 32% la bază, până la 44,1% la ultimul nivel).

### PTh-R.3.4 Înfășurătoarea pe peretele Y de capăt (l_w = 6,00 m) — toate nivelurile

Aplicând coeficientul de repartiție pereți (interpolat liniar între valorile din §PTh-R.3.3) la forța preluată de cei 2 pereți Y + componenta nucleului pe Y (§8.1 pre DTAC: 2,50% densitate pe Y, din care nucleul contribuie ≈ 37,5%), se obține pentru **peretele Y de capăt cel mai solicitat** (care preia, conservator, ~45% din V_pereți,Y, restul revenind celuilalt perete de capăt și nucleului):

| Nivel (bază perete) | N_Ed [kN] (grup. seismic) | M_Ed [kNm] | V_Ed [kN] | ν_d | Clasă beton |
|---|---|---|---|---|---|
| Parter (baza, z=0) | 6.400 | 21.000 | 1.700 | 0,153 | C35/45, b=30cm |
| E1 (z=3,20) | 5.780 | 17.900 | 1.660 | 0,138 | C35/45, b=30cm |
| E2 (z=6,10) | 5.160 | 14.850 | 1.590 | 0,124 | C35/45, b=30cm |
| E3 (z=9,00) | 4.540 | 11.950 | 1.480 | 0,109 | C30/37, b=30cm |
| E4 (z=11,90) | 3.920 | 9.250 | 1.330 | 0,131* | C30/37, b=25cm |
| E5 (z=14,80) | 3.300 | 6.850 | 1.130 | 0,110 | C30/37, b=25cm |
| E6 (z=17,70) | 2.680 | 4.750 | 890 | 0,089 | C30/37, b=25cm |
| E7 (z=20,60) | 2.060 | 2.950 | 620 | 0,069 | C30/37, b=25cm |
| E8 (z=23,50) | 1.440 | 1.500 | 350 | 0,048 | C30/37, b=25cm |

*La E4, ν_d crește ușor față de E3 în ciuda scăderii N_Ed, din cauza reducerii grosimii peretelui de la 30 la 25 cm (aria secțiunii scade mai repede decât efortul axial) — verificat totuși cu marjă mare față de limita DCM ν_d ≤ 0,40.

Toate valorile ν_d sunt cu marjă confortabilă sub limita DCM (0,40), confirmând comportarea ductilă la încovoiere pe toată înălțimea. Armătura bulbilor (§PTh-R.5) se reduce în trepte, nu continuu, pentru raționalizarea execuției (repetabilitatea cofrajelor și a carcaselor de armătură pe grupuri de 2-3 niveluri).

### PTh-R.3.5 Transmiterea eforturilor la infrastructură — reconfirmare la nivelul detaliat

Conform `structura.md` §8.1 ter, momentul transmis la infrastructură se ia egal cu momentul capabil al peretelui (nu cel de proiectare elastic), amplificat cu γ_Rd = 1,2: M_infra = 1,2 × M_Rd,bază = 1,2 × 24.580 = **29.500 kNm** pentru peretele Y de capăt. La faza PTh, această valoare **rămâne guvernantă** pentru dimensionarea radierului și a pereților de subsol (§PTh-R.7), fiind mai mare decât cea rezultată din analiza detaliată pe niveluri (21.000 kNm la parter) — confirmă principiul proiectării bazate pe capacitate: infrastructura se dimensionează la suprarezistență, nu la efortul elastic de analiză.

### PTh-R.3.6 Stâlpi de cadru — înfășurătoare pe toate nivelurile

| Nivel | Secțiune | N_Ed [kN] | M_Ed [kNm] | ν_d | Armare longitudinală |
|---|---|---|---|---|---|
| Subsol/Parter | 60×60, C35/45 | 4.200 | 520 | 0,50 | 12 Ø25 |
| E1 | 60×60, C35/45 | 3.680 | 495 | 0,44 | 12 Ø25 |
| E2 | 60×60, C35/45 | 3.160 | 460 | 0,38 | 10 Ø25 |
| E3 | 50×50, C30/37 | 2.640 | 400 | 0,53 | 10 Ø22 |
| E4 | 50×50, C30/37 | 2.170 | 355 | 0,43 | 8 Ø22 |
| E5 | 50×50, C30/37 | 1.450 | 405** | 0,29 | 8 Ø20 |
| E6 | 50×50, C30/37 | 1.120 | 300 | 0,22 | 8 Ø18 |
| E7 | 50×50, C30/37 | 790 | 220 | 0,16 | 8 Ø18 |
| E8 | 50×50, C30/37 | 460 | 150 | 0,09 | 8 Ø16 |

**Valoarea M_Ed de la E5 din DTAC §8.4/§8.10 (405 kNm, notată acolo pentru un stâlp perimetral tip) este reținută aici ca înfășurătoare acoperitoare, deși interpolarea liniară pe N_Ed ar sugera o valoare puțin mai mică; se păstrează conservator valoarea din breviarul DTAC verificat la interacțiune 6.61, §8.10.

Toate valorile ν_d sunt sub limita DCM ν_d ≤ 0,55 (P100-1 §5.4.3.2.1), cu marjă crescândă spre vârf, confirmând corectitudinea reducerii secțiunii de la 60×60 la 50×50 la nivelul E3 (adoptată în DTAC și reconfirmată aici pe toată înfășurătoarea).

### PTh-R.3.7 Grinzi de cadru — variație pe niveluri și pe travee

Grinzile 30×60 cm (deschidere 5,40 m, travee curentă) și cele de pe deschiderile de 6,00 m/4,00 m (direcția scurtă) prezintă momente diferite funcție de deschidere și de nivel:

| Poziție | Deschidere [m] | M_Ed reazem [kNm] | M_Ed câmp [kNm] | Armare reazem | Armare câmp |
|---|---|---|---|---|---|
| Travee curentă 5,40 m, parter-E2 | 5,40 | 225 | 150 | 5 Ø16 | 4 Ø14 |
| Travee curentă 5,40 m, E3-E5 | 5,40 | 210 | 140 | 5 Ø16 | 4 Ø14 |
| Travee curentă 5,40 m, E6-E8 | 5,40 | 175 | 115 | 4 Ø16 | 3 Ø14 |
| Deschidere 6,00 m (dir. scurtă, parter-E2) | 6,00 | 260 | 175 | 6 Ø16 | 4 Ø16 |
| Deschidere 4,00 m (dir. scurtă, parter-E2) | 4,00 | 140 | 95 | 4 Ø14 | 3 Ø12 |

Forța tăietoare de proiectare a grinzilor se determină, ca și în DTAC §8.9, din echilibrul la capacitate (momentele capabile la capete + încărcarea gravitațională), nu din analiza elastică (P100-1 §5.4.2.2); tabelul de mai sus servește la dimensionarea armăturii longitudinale, iar armătura transversală (etrieri) se calculează separat pe fiecare poziție conform metodologiei §8.9 DTAC, cu valori tipice Ø8/100 în zona critică (l_cr = 2h = 1,20 m de la reazem) și Ø8/200 în câmp, pentru toate traveele.

---

## PTh-R.4 — VERIFICĂRI SUPLIMENTARE CR 2-1-1.1/2013 (PEREȚI STRUCTURALI DE BETON ARMAT)

### PTh-R.4.1 Rolul codului CR 2-1-1.1/2013 în completarea P100-1

**CR 2-1-1.1/2013** (Cod de proiectare a pereților structurali de beton armat) detaliază, pentru pereții din clădirile situate în zone seismice, prevederi complementare celor din P100-1 §5.4.3: clasificarea pereților după zveltețe (h_w/l_w), condițiile de calcul simplificat versus calcul neliniar, dispozițiile constructive pentru zonele de capăt (bulbi), pentru inima peretelui și pentru zonele de cuplare, precum și criteriile de verificare a stabilității locale (flambaj în afara planului) la pereții zvelți cu grosime redusă. Prezentul capitol aplică aceste prevederi suplimentare peste verificările deja făcute în DTAC conform P100-1.

### PTh-R.4.2 Clasificarea pereților după zveltețe (CR 2-1-1.1/2013)

Zveltețea globală a peretelui α_0 = H_w/l_w a fost deja calculată în `structura.md` §3.3 (α_0 ≈ 6,08 pentru pereții mediu, k_w = 1,00, comportare prin încovoiere). CR 2-1-1.1/2013 clasifică pereții astfel:

| Categorie | Criteriu | Comportare | Metodă de calcul admisă |
|---|---|---|---|
| Perete zvelt | H_w/l_w > 2 | dominată de încovoiere | model de grindă-consolă, articulație plastică la bază |
| Perete scurt | H_w/l_w ≤ 2 | dominată de forfecare | model de tip biela-tirant (strut-and-tie), verificare explicită la lunecare |
| Perete cuplat scurt | l/h ≤ 2,5 (deschidere de cuplare) | forfecare guvernantă în buiandrug | armare diagonală obligatorie |

Cu H_w ≈ 30,4 m, toți pereții principali (Y: l_w = 6,00/4,00 m; X: l_w = 5,40 m) au H_w/l_w între 5,07 și 7,60 ⇒ **toți se clasifică drept pereți zvelți**, verificați corect prin modelul de grindă-consolă cu articulație plastică la bază, conform metodologiei deja aplicate în DTAC. Buiandrugii de cuplare ai nucleului (l = 1,20 m, h = 0,70 m, l/h = 1,71 < 2,5) se clasifică drept **cuplaje scurte**, confirmând armarea diagonală adoptată în §8.3 DTAC.

### PTh-R.4.3 Verificarea la flambaj lateral al pereților zvelți subțiri (grosime 25 cm la E4-E8)

CR 2-1-1.1/2013 impune verificarea stabilității locale (flambaj în afara planului) pentru pereții cu raport l_w/b_w mare și zonă critică la compresiune ridicată. Pentru peretele Y la E4-E8 (b_w = 25 cm, l_w = 6,00 m, l_w/b_w = 24):

$$ \lambda_w = \frac{l_{0,w}}{b_w}, \quad l_{0,w} \approx 0,75 \cdot h_{et} \text{ (perete rezemat sus și jos de planșee)} $$

Cu h_et = 2,90 m: l_0,w ≈ 0,75 × 2.900 = 2.175 mm; λ_w = 2.175/250 = **8,7**, mult sub limita de zveltețe critică pentru pereți din beton armat cu confinare la bulbi (limită uzuală λ_w ≤ 15-17 fără măsuri suplimentare, conform CR 2-1-1.1/2013 §6.3). ⇒ **nu este necesară verificare suplimentară la flambaj în afara planului**; grosimea de 25 cm este adecvată pe toată zona E4-E8.

### PTh-R.4.4 Verificarea lungimii elementului de margine (bulb) conform CR 2-1-1.1/2013

CR 2-1-1.1/2013 completează P100-1 §5.4.3.4.2 cu o formulă alternativă de verificare a necesității și a lungimii elementului confinat, bazată pe adâncimea axei neutre x_u la starea limită ultimă de încovoiere-compresiune:

$$ l_c \ge \max(0,15 \cdot x_u;\ 1,5 \cdot b_w) $$

Pentru peretele Y la bază (N_Ed = 6.400 kN, M_Ed = 21.000 kNm, b_w = 30 cm), adâncimea axei neutre estimată din echilibrul de secțiune (aproximare cu bloc rectangular de compresiune, β_1 = 0,80): x_u ≈ 1,35 m ⇒ 0,15·x_u = 202 mm < 1,5·b_w = 450 mm ⇒ **guvernează 1,5·b_w = 450 mm**, mai mic decât lungimea deja adoptată în DTAC (l_c = 900 mm, guvernată de condiția 0,15·l_w = 900 mm) — confirmă că dimensionarea DTAC este acoperitoare și pentru acest criteriu alternativ.

### PTh-R.4.5 Verificarea la lunecare pe rosturile de turnare orizontale (shear-friction)

CR 2-1-1.1/2013 și SR EN 1992-1-1 §6.2.5 impun verificarea forfecării la interfața rosturilor orizontale de turnare (unde betonul vechi-nou creează un plan de lunecare potențial). Rezistența la lunecare (metoda shear-friction):

$$ V_{Rdi} = c \cdot f_{ctd} \cdot A_i + \mu(\rho \cdot f_{yd} + \sigma_n) \cdot A_i \le 0,5 \cdot \nu \cdot f_{cd} \cdot A_i $$

Pentru un rost de turnare rugos (c = 0,40, μ = 0,7, conform §6.2.5(2) EN 1992-1-1), la peretele Y de bază (A_i = 300 × 6.000 = 1.800.000 mm², f_ctd(C35/45) ≈ 1,54 MPa, σ_n = N_Ed/A_i = 6.400.000/1.800.000 = 3,56 MPa, ρ (armătură verticală traversând rostul) ≈ 0,26%):

$$ V_{Rdi} = 0,40\cdot1,54\cdot1,8\cdot10^6 + 0,7\cdot(0,0026\cdot435 + 3,56)\cdot1,8\cdot10^6 $$
$$ = 1.109\ kN + 0,7\cdot(1,131+3,56)\cdot1.800 = 1.109 + 5.912 = 7.021\ kN \gg V_{Ed} = 1.700\ kN \ \checkmark $$

Rostul de turnare orizontal (la fiecare cotă de nivel, conform tehnologiei de execuție §PTh-R.10) are rezistență la lunecare cu marjă foarte mare, confirmând că **nu sunt necesare conectori suplimentari** la rosturile de turnare curente ale pereților (dincolo de armătura verticală deja prevăzută), condiție cu atât mai favorabilă la nivelurile superioare unde V_Ed scade.

### PTh-R.4.6 Verificarea la forfecare a zonei de cuplare a nucleului — completare

Peste verificarea buiandrugilor de cuplare din DTAC §8.3 (armare diagonală 4 Ø16, V_Rd = 317 kN > V_Ed = 280 kN), CR 2-1-1.1/2013 impune verificarea suplimentară a **lungimii de ancoraj a diagonalelor în pereții adiacenți**: l_anc ≥ 1,5 × l_b,rqd(Ø16) = 1,5 × 580 = 870 mm, prelungit efectiv pe toată lățimea peretelui adiacent (≥ l_w/2 pătrundere în perete, pentru transferul complet al forței diagonale prin compresiune diagonală în peretele receptor) — se adoptă ancorare pe adâncime completă în bulbul peretelui adiacent, cu cârlig la capăt dacă spațiul disponibil nu permite lungimea dreaptă.

---

## PTh-R.5 — CAIET DE ARMARE — PEREȚI STRUCTURALI

### PTh-R.5.1 Sistemul de marcare a pereților

Fiecare perete structural primește o **marcă unică** regăsită în planurile de armare și în listele de fasonare:

| Marcă | Element | Poziție | Grosime |
|---|---|---|---|
| PW-N1…PW-N4 | Pereți nucleu (tub închis) | central-lateral | 30 cm (S-E3), 25 cm (E4-E8) |
| PW-Y1, PW-Y2 | Pereți transversali de capăt | capete clădire | 30 cm (S-E3), 25 cm (E4-E8) |
| PW-Y3, PW-Y4 | Pereți transversali interiori | separare tronsoane | 30 cm (S-E3), 25 cm (E4-E8) |
| PW-X1, PW-X2 | Pereți longitudinali | fațadă interioară | 30 cm (S-E3), 25 cm (E4-E8) |
| CPL-1…CPL-8 | Buiandrugi de cuplare nucleu | goluri uși nucleu, fiecare nivel | 30/25 cm × 700 mm |

### PTh-R.5.2 Caiet de armare — perete PW-Y1 (perete transversal de capăt, cel mai solicitat)

**Zona critică (parter + E1, h_cr = 6,00 m conform `structura.md` §9.1):**

| Poziție armătură | Diametru/interax | Observație |
|---|---|---|
| Bulbi (2 capete, l_c = 900 mm) | 8 Ø25 (3.927 mm²/bulb) | fără înnădire prin suprapunere în h_cr |
| Etrieri de confinare bulb | Ø10/100 + agrafe la fiecare bară de colț, max. 200 mm interax | ω_wd ≥ 0,08 |
| Armătură verticală inimă | Ø10/200, 2 rețele | ρ_v = 0,26% > 0,25% min |
| Armătură orizontală inimă (etrieri) | Ø12/150, 2 rețele | din verificare forfecare, §8.2 DTAC |
| Bare de legătură (agrafe) inimă | Ø8/500 | ambele rețele |

**Zona curentă (E2-E3, tranziție la grosime 25 cm de la E4):**

| Poziție armătură | Diametru/interax |
|---|---|
| Bulbi (2 capete, l_c = 900 mm) | 6 Ø25 (2.945 mm²/bulb) |
| Etrieri de confinare bulb | Ø10/125 |
| Armătură verticală inimă | Ø10/200, 2 rețele |
| Armătură orizontală inimă | Ø10/175, 2 rețele |

**Zona superioară (E4-E6, grosime 25 cm, C30/37):**

| Poziție armătură | Diametru/interax |
|---|---|
| Bulbi (2 capete, l_c = 750 mm — recalculat 1,5·b_w = 375 mm, guvernat de 0,15·l_w = 900mm → se menține 900mm pentru continuitate cofraj) | 6 Ø22 (2.281 mm²/bulb) |
| Etrieri de confinare bulb | Ø8/125 |
| Armătură verticală inimă | Ø10/200, 2 rețele |
| Armătură orizontală inimă | Ø10/200, 2 rețele |

**Zona superioară finală (E7-E8, terasă, grosime 25 cm, constructiv):**

| Poziție armătură | Diametru/interax |
|---|---|
| Bulbi (2 capete) | 4 Ø18 (1.018 mm²/bulb), minim constructiv armare margine |
| Etrieri de confinare bulb | Ø8/150 |
| Armătură verticală/orizontală inimă | Ø10/200, 2 rețele, ambele direcții |

**Regula de continuitate pe verticală:** armătura verticală a bulbilor și a inimii **nu se întrerupe brusc** la trecerea de la o zonă la alta — reducerea de diametru/număr de bare se face prin **înnădire prin suprapunere în afara zonei critice** (deasupra cotei h_cr) sau prin manșoane mecanice dacă reducerea cade în interiorul unei zone care rămâne critică la nivelul respectiv (verificare individuală pe fiecare interfață de nivel, conform §9.1 DTAC — fără înnădiri prin suprapunere în h_cr = 6,00 m de la fiecare bază de nivel unde se reia articulația plastică, aplicabil strict la parter/E1; la nivelurile superioare, unde nu se mai formează articulații plastice semnificative, înnădirea prin suprapunere uzuală este admisă).

### PTh-R.5.3 Caiet de armare — perete PW-X1 (perete longitudinal, l_w = 5,40 m)

Analog metodologiei de la PW-Y1, cu valorile de bază din `structura.md` §8.7 (N_Ed = 5.100 kN, M_Ed = 15.800 kNm, bulbi 6 Ø25):

| Zonă | Bulbi | Etrieri confinare | Inimă verticală | Inimă orizontală |
|---|---|---|---|---|
| Critică (Parter-E1) | 6 Ø25 | Ø10/100 | Ø10/200 | Ø10/175 |
| Curentă (E2-E3) | 5 Ø22 | Ø8/125 | Ø10/200 | Ø10/200 |
| Superioară (E4-E6) | 4 Ø20 | Ø8/125 | Ø10/200 | Ø10/200 |
| Finală (E7-E8) | 4 Ø16 | Ø8/150 | Ø10/200 | Ø10/200 |

### PTh-R.5.3 bis Caiet de armare — pereții PW-Y3, PW-Y4 (transversali interiori, l_w = 4,00 m)

Pereții transversali interiori (separare tronsoane de apartamente, `structura.md` §3.2), cu deschidere mai mică (l_w = 4,00 m) decât pereții de capăt, preiau o cotă mai redusă din forța seismică pe direcția Y (aria aferentă de planșeu mai mică, poziție mai apropiată de centrul de rigiditate). Estimare la bază (proporțional cu densitatea de perete din `structura.md` §8.1 pre — 2 pereți × 4,0×0,30 = 2,40 m² din totalul de 9,60 m² pe Y, adică ≈ 25% din V_pereți,Y și o cotă comparabilă din M):

| Nivel | N_Ed [kN] | M_Ed [kNm] | V_Ed [kN] | ν_d |
|---|---|---|---|---|
| Parter (bază) | 3.900 | 11.400 | 920 | 0,145 |
| E1 | 3.520 | 9.700 | 890 | 0,131 |
| E2 | 3.140 | 8.050 | 850 | 0,116 |
| E3 | 2.760 | 6.480 | 790 | 0,102 |
| E4 (grosime 25cm) | 2.380 | 5.010 | 710 | 0,127 |
| E5 | 2.000 | 3.720 | 600 | 0,107 |
| E6 | 1.620 | 2.580 | 470 | 0,086 |
| E7 | 1.240 | 1.610 | 320 | 0,066 |
| E8 | 860 | 810 | 170 | 0,046 |

**Caiet de armare (analog metodologiei PW-Y1, adaptat la l_w = 4,00 m):**

| Zonă | Bulbi (l_c ≥ max(1,5·b_w; 0,15·l_w) = 600 mm) | Etrieri confinare | Inimă verticală | Inimă orizontală |
|---|---|---|---|---|
| Critică (Parter-E1) | 6 Ø22 (2.281 mm²/bulb) | Ø10/100 | Ø10/200 | Ø12/150 |
| Curentă (E2-E3) | 5 Ø20 | Ø8/125 | Ø10/200 | Ø10/175 |
| Superioară (E4-E6) | 4 Ø18 | Ø8/125 | Ø10/200 | Ø10/200 |
| Finală (E7-E8) | 4 Ø14 | Ø8/150 | Ø10/200 | Ø10/200 |

Toate valorile ν_d rămân sub limita DCM (0,40) cu marjă superioară celei de la pereții de capăt, confirmând că pereții interiori — deși mai puțin solicitați — nu pot fi subdimensionați sub cerințele constructive minime (ρ_v ≥ 0,25%, ρ_h ≥ 0,20%, l_c minim), care guvernează armarea la nivelurile superioare (E6-E8) unde efortul de calcul este mic.

### PTh-R.5.4 Caiet de armare — pereții nucleului (tub închis, torsiune + translație)

Pereții nucleului (PW-N1…N4) sunt solicitați suplimentar la **torsiune de ansamblu** (§8.8 DTAC, τ_t = 0,356 MPa la parter), motiv pentru care armătura orizontală (care preia atât forfecarea din translație cât și cea din torsiune) se menține la Ø12/150 pe o înălțime mai mare decât la pereții periferici (până la E3 inclusiv, nu doar în h_cr):

| Zonă | Bulbi la colțuri tub | Etrieri confinare colț | Inimă verticală | Inimă orizontală |
|---|---|---|---|---|
| Critică (Parter-E1) | 8 Ø22 (la fiecare din cele 4 colțuri interioare ale tubului) | Ø10/100 | Ø10/175 | Ø12/150 |
| Curentă (E2-E3) | 6 Ø20 | Ø8/125 | Ø10/175 | Ø12/150 |
| Superioară (E4-E6, grosime 25cm) | 5 Ø18 | Ø8/125 | Ø10/200 | Ø10/175 |
| Finală (E7-E8) | 4 Ø16 | Ø8/150 | Ø10/200 | Ø10/200 |

**Golurile de ușă din nucleu** (acces casă scară + acces lift, la fiecare nivel) se bordează cu bare verticale suplimentare pe ambele fețe ale golului (2 × 2 Ø16, ancorate cu lungime completă deasupra și sub gol) și cu o bară orizontală continuă la buiandrug (a se vedea §PTh-R.5.5).

### PTh-R.5.5 Caiet de armare — buiandrugi de cuplare CPL-1…CPL-8

Conform `structura.md` §8.3, buiandrugul scurt (l = 1,20 m, h = 0,70 m, l/h = 1,71 < 2) se armează diagonal la fiecare nivel unde apare golul de ușă al nucleului:

| Poziție | Armătură | Observație |
|---|---|---|
| Diagonale principale | 2 carcase × 4 Ø16, înclinare α ≈ 27° | ancorate min. 900 mm în bulbii pereților adiacenți |
| Etrieri de confinare pe diagonală | Ø8/100 | pe toată lungimea diagonalei, în jurul grupului de 4 bare |
| Armătură orizontală suplimentară (constructivă, pe toată înălțimea buiandrugului) | 2 Ø12 sus + 2 Ø12 jos | control fisurare |
| Etrieri verticali curenți (în afara diagonalelor) | Ø8/150 | constructiv |

Se repetă identic la fiecare din cele 8 niveluri cu gol de ușă a nucleului (parter-E7; la E8 golul poate lipsi dacă accesul la terasă se face doar prin casa scării, verificat pe planul de arhitectură — se coordonează la §PTh-R.14).

### PTh-R.5.6 Detalii de execuție a armării pereților

- **Poziționarea bulbilor** se face cu șabloane de armare (template) care fixează distanța exactă a etrierilor de confinare (Ø10/100 sau Ø8/125, conform zonei) — abaterea admisă la interax ≤ ±10 mm;
- **Distanțierii (puricii)** de acoperire (25 mm suprastructură, 35 mm subsol) se dispun la maxim 1,0 m pe orizontală și la fiecare 0,5 m pe verticală, din material plastic rezistent la coroziune (nu metal, pentru a evita punctele de start de coroziune la suprafață);
- **Rosturile de lucru orizontale** (la fiecare cotă de turnare, uzual la cota de nivel) se poziționează astfel încât să nu coincidă cu zona critică de la baza fiecărui etaj (h_cr locală ≈ 1/6 din înălțimea de nivel de la fiecare bază de perete între planșee, pentru controlul suplimentar al lunecării în zonele de eforturi mari) — se tratează conform §PTh-R.4.5;
- **Verificarea poziției armăturii înainte de turnare** este obligatorie la fiecare fază determinantă de armare (§PTh-R.13), cu control al: diametrelor, numărului de bare, interaxului etrierilor de confinare, acoperirii cu beton și absenței contactului direct armătură-cofraj.

---

## PTh-R.6 — CAIET DE ARMARE — PLANȘEE

### PTh-R.6.1 Placa dală curentă (15 cm, deschidere maximă 5,40 m)

Din `structura.md` §8.6: p_d = 10,90 kN/m², M_câmp ≈ 28,9 kNm/m, armare de câmp Ø10/125 (628 mm²/m). Caietul de armare detaliază distribuția pe toată suprafața plăcii, pe zone (câmp central, reazeme pe pereți/grinzi, colțuri, console de balcon):

| Zonă placă | Moment de calcul [kNm/m] | Armare inferioară (câmp) | Armare superioară (reazem) |
|---|---|---|---|
| Câmp central, deschidere scurtă (5,40 m) | 28,9 | Ø10/125 (628 mm²/m) | — |
| Câmp central, deschidere lungă (6,00 m/4,00 m) | 24,5/12,8 | Ø10/150 / Ø8/150 | — |
| Reazem pe pereți structurali/nucleu | 32,5 | — | Ø10/100 (785 mm²/m) |
| Reazem pe grinzi de cadru | 26,0 | — | Ø10/125 |
| Colț placă (moment de torsiune, 2 direcții) | ≈ 0,75×M_câmp | Ø8/200 suplimentar la 45°, ambele fețe | idem |
| Console balcon (l ≤ 1,50 m) | 12,0 (spor dinamic acoperitor) | — | Ø10/125, prelungit în placă min. 1,5×l_consolă |

**Placă mărită local la 16 cm** (conform recomandării §8.6 DTAC pentru deschideri critice L/d la limită) se prevede în deschiderile de 5,40 m ale traveelor fără pereți structurali direct adiacente, unde săgeata calculată era la limita admisă (§10.2 DTAC).

### PTh-R.6.2 Armătura centurilor-colectori (rol de diafragmă orizontală)

Conform `structura.md` §8.6 și §8.12, se prevăd centuri-colectori perimetrale și în jurul golurilor de planșeu (casă scară + lift), dimensionate la efortul de întindere calculat la §8.12 DTAC (T = 440,6 kN, A_s = 1.013 mm² → 6 Ø16):

| Poziție centură-colector | Armătură | Lungime de ancoraj la capete |
|---|---|---|
| Perimetrală (pe conturul exterior al planșeului, toate nivelurile) | 6 Ø16 continuu | ancorare completă în pereții/stâlpii de colț |
| În jurul golului scară+lift | 4 Ø14 continuu, pe tot conturul golului | suprapunere ≥ l_0(Ø14) = 870 mm la colțuri, cu bare de colț înclinate 45° suplimentare |
| Pe axele intermediare (colectare spre pereții X/Y) | 4 Ø14 | ancorare în bulbii pereților |

**Armătura de legătură (tie forces) pentru robustețe** (§15 ter DTAC): T_i = 0,8·(g_k + ψ·q_k)·s·L, calculată pe fiecare travee — pentru traveea curentă (s = interax stâlpi 5,40 m, L = 6,00 m, g_k = 5,85, ψ·q_k = 0,3×2,0 = 0,6): T_i = 0,8×6,45×5,40×6,00/1000... (formula se aplică pe lățime de bandă, rezultând necesar de armătură continuă, deja acoperit de centurile-colectori de mai sus și de armătura curentă a plăcii, verificat ca ≥ 4 Ø14 continuu pe orice secțiune orizontală a planșeului).

### PTh-R.6.3 Predală prefabricată — variantă de execuție (opțională, conform §14bis.2 DTAC)

Dacă se adoptă varianta cu predală prefabricată (placă suport 5-6 cm + suprabetonare 9-10 cm), caietul de armare distinge:

| Componentă | Armătură |
|---|---|
| Predală (armată pentru faza de montaj, înainte de suprabetonare) | plasă sudată Ø6/150×150, verificată la încărcarea de montaj (greutate proprie suprabetonare umedă + încărcare de execuție 1,5 kN/m²) cu grinzi provizorii de sprijin la interax ≤ 2,0 m |
| Conectori de forfecare la interfața predală-suprabetonare | bucle/agrafe Ø8 la interax 400 mm, ieșind din predală, pentru conlucrare monolitică |
| Armătura de rezistență finală (câmp/reazem) | identică cu tabelul §PTh-R.6.1, poziționată parțial în predală (partea inferioară) și parțial în suprabetonare (partea superioară, negativă la reazeme) |

### PTh-R.6.4 Placa peste subsol (20 cm) — armare specifică

Placa peste subsol (funcție de diafragmă de bază + preluare încărcare garaj, categorie F, 2,5 kN/m²) se armează mai dens decât planșeele curente, din cauza încărcării utile mai mari și a rolului de încastrare a suprastructurii:

| Zonă | Moment [kNm/m] | Armare |
|---|---|---|
| Câmp curent (travee 5,40 m) | 34,5 | Ø12/150 (754 mm²/m) |
| Reazem pe pereți subsol/nucleu | 41,0 | Ø12/125 (905 mm²/m) |
| Contur gol rampă auto | — | centură Ø14×4 + etrieri Ø8/100 pe toată bordura golului |
| Zonă sub roți/manevră (local, sarcină concentrată) | verificare la punching local (roată 10 kN pe 200×200mm) | armare curentă suficientă, verificat conform SR EN 1992-1-1 §6.4 |

### PTh-R.6.5 Verificarea săgeților și fisurării planșeelor la faza PTh — completare

Peste verificarea generică din §10.2 DTAC (L/250 total, L/500 după finisaje), la faza PTh se recomandă **contrasăgeata de execuție** de 8-10 mm la deschiderile critice de 5,40 m (menționată ca recomandare în DTAC, confirmată aici ca obligatorie pentru planșeele turnate monolit pe cofraj, prin reglarea popilor de sprijin la o contra-pantă corespunzătoare înainte de turnare). Deschiderea fisurilor se controlează prin diametrul și distanța barelor conform tabelelor 7.2N/7.3N SR EN 1992-1-1, satisfăcute automat de armătura Ø10/125-150 adoptată.

---

## PTh-R.7 — CAIET DE ARMARE — FUNDAȚIE (RADIER GENERAL) ȘI INFRASTRUCTURĂ

### PTh-R.7.1 Radierul general — geometrie și zonare de armare

Radierul (grosime 80 cm curent, 100 cm sub nucleu și pereții cei mai încărcați, conform `structura.md` §11.2) se armează diferențiat pe zone, funcție de momentul de proiectare (§11.7 DTAC: M_Ed ≈ 420 kNm/m la reazem, Ø20/200) și de eforturile locale de străpungere sub stâlpi/pereți puternic încărcați:

| Zonă radier | Grosime | Moment [kNm/m] | Armare rețea inferioară | Armare rețea superioară |
|---|---|---|---|---|
| Curent (câmp, între reazeme) | 80 cm | 280 (pozitiv) | Ø20/200 (1.571 mm²/m) | Ø16/200 (constructiv, 1.005 mm²/m) |
| Sub pereți structurali/nucleu (reazem, moment negativ) | 100 cm | 420 | Ø16/150 (constructiv sus) | Ø20/200 (1.571 mm²/m) |
| Capitel/îngroșare locală sub stâlpi centrali | 100 cm (local, pe 2,0×2,0 m) | — (verificare punching) | rețea suplimentară Ø16/150, ambele fețe | idem |
| Perimetral (consolă radier 0,5 m dincolo de pereții subsolului) | 80 cm | moment de consolă, ≈ 60 | Ø14/200 sus | Ø12/200 jos |

**Rețeaua principală** se completează cu **rețea secundară perpendiculară** (aceleași diametre, decalată), asigurând armare bidirecțională pe toată suprafața radierului — obligatoriu pentru un element de tip placă groasă pe mediu elastic, unde direcția momentelor principale variază punctual funcție de poziția reazemelor concentrate.

### PTh-R.7.2 Armare la străpungere (punching) — capitel sub stâlpi și pereți

Conform §11.7 DTAC (v_Ed = 0,571 MPa la limita v_Rd,c = 0,55 MPa), se prevede **îngroșare locală tip capitel** la 100 cm sub toți stâlpii de 60×60 cm și sub bazele pereților structurali/nucleu, pe o rază de minim 2d de la fața elementului vertical (perimetrul de control conform SR EN 1992-1-1 §6.4.2). În zona capitelului se dispune, suplimentar față de rețeaua curentă:

| Poziție | Armătură de străpungere |
|---|---|
| Prima linie de control (la d/2 de fața stâlpului) | etrieri verticali/agrafe Ø10, dispuse radial, 4 rânduri la interax ≤ 0,75d |
| A doua linie de control (la 1,5d) | etrieri Ø10, interax ≤ 0,75d, densitate redusă la 75% |
| Armătură radială suplimentară (bare "pop-up", opțional dacă etrierii nu ating v_Rd,cs necesar) | 8 Ø16 radiale suplimentare la fiecare stâlp central, ancorate pe toată grosimea capitelului |

### PTh-R.7.3 Zona de radier sub rampa auto (gol în placa peste subsol, coordonat cu radierul)

Deși golul rampei este în placa peste subsol (nu în radier), radierul de sub proiecția rampei se verifică la o distribuție diferită de reacțiune (fără reazem de perete pe acea zonă) — se prevede **grindă de fundație** suplimentară (lățime 1,0 m, aceeași grosime 80 cm ca radierul, armată ca o grindă continuă pe resoarte Winkler) care colectează reacțiunile din cadrul adiacent rampei și le distribuie uniform, evitând concentrări de presiune la marginea golului rampei.

### PTh-R.7.4 Pereții subsolului — armare completă

Din `structura.md` §11.6: M_Ed ≈ 35,3 kNm/m, armare verticală Ø12/200. Caietul de armare complet:

| Poziție | Armătură | Observație |
|---|---|---|
| Verticală, față dinspre pământ (întindere din împingere) | Ø12/200 (565 mm²/m) | acoperire 35 mm, w_max ≤ 0,2 mm (etanșeitate) |
| Verticală, față interioară (dinspre subsol) | Ø10/200 (constructiv, verificat la moment redus) | acoperire 25 mm |
| Orizontală (ambele fețe) | Ø10/200 | rol de repartiție + control fisurare pe orizontală |
| Mustăți de legătură la radier | Ø12, lungime ancoraj l_0 ≈ 650 mm | continuitate cu armătura verticală a peretelui |
| Mustăți de legătură la placa peste subsol | Ø12, lungime ancoraj completă în placă | asigură încastrarea sus |
| Zonă de colț (întâlnire perete subsol-perete subsol) | bare suplimentare de colț Ø12, ambele direcții | evitare fisurare la colțurile cuvei etanșe |

### PTh-R.7.5 Rosturi de turnare cu waterstop — poziționare pe radier și pereți subsol

Conform `structura.md` §14bis.1, cuva etanșă necesită waterstop-uri la toate rosturile de turnare. Pentru geometria radierului (425 m², 25,0 × 17,0 m amprentă), turnarea completă într-o singură zi este posibilă tehnic dar necesită capacitate mare de pompare/betonieră continuă; caietul de armare prevede, pentru varianta cu 2 loturi de turnare (dacă necesar din motive tehnologice):

| Rost | Poziție | Waterstop | Armătură de continuitate |
|---|---|---|---|
| Rost radier (dacă turnare în 2 etape) | la 1/5 din deschiderea dintre reazeme (zonă de moment minim), perpendicular pe latura lungă | bandă PVC hidroexpansivă/waterstop clasic, lățime 300 mm, centrată pe rost | toate barele orizontale traversează rostul continuu, fără întrerupere |
| Rosturi verticale pereți subsol (la colțuri și la interval ≤ 15 m pe lungime dacă necesar tehnologic) | colțuri cuvă + intervale regulate | waterstop vertical, continuitate cu cel orizontal la intersecție (piesă specială de colț) | armătură orizontală continuă traversând rostul |
| Rost radier-perete subsol (orizontal, la baza peretelui) | pe tot conturul cuvei | waterstop orizontal, continuu cu cel din radier | mustăți de armătură verticală care traversează, fără întrerupere de etanșeitate |

Toate rosturile se tratează, înainte de turnarea betonului nou, prin **spălare cu jet de apă sub presiune** (îndepărtarea laptelui de ciment și a impurităților) și aplicarea unei **amorse de aderență** (slurry de ciment sau produs specific), conform tehnologiei detaliate la §PTh-R.10.

---

## PTh-R.8 — EXTRAS DE MATERIALE (BILL OF QUANTITIES PE POZIȚII)

### PTh-R.8.1 Extras armătură — pereți structurali (recapitulare pe toate nivelurile)

| Element | Poziție armătură | Diametru | Masă totală estimată [kg] |
|---|---|---|---|
| PW-Y1, PW-Y2 (2 pereți capăt) | bulbi (toate zonele) | Ø25/Ø22/Ø18 | 8.900 |
| PW-Y1, PW-Y2 | inimă verticală+orizontală | Ø10/Ø12 | 14.200 |
| PW-Y3, PW-Y4 (2 pereți interiori, l_w=4,0m) | bulbi + inimă | Ø22/Ø20/Ø10 | 11.400 |
| PW-X1, PW-X2 (2 pereți longitudinali) | bulbi + inimă | Ø25/Ø22/Ø20/Ø10 | 15.600 |
| PW-N1…N4 (nucleu, 4 laturi tub) | bulbi colț + inimă | Ø22/Ø20/Ø18/Ø10/Ø12 | 22.300 |
| CPL-1…8 (buiandrugi cuplare) | diagonale + etrieri | Ø16/Ø12/Ø8 | 2.100 |
| **Total armătură pereți structurali** | | | **≈ 74.500 kg** |

### PTh-R.8.2 Extras armătură — cadre (stâlpi + grinzi, toate nivelurile)

| Element | Masă totală estimată [kg] |
|---|---|
| Stâlpi 60×60 (subsol-E2) | 18.600 |
| Stâlpi 50×50 (E3-E8) | 16.800 |
| Grinzi 30×60 (toate nivelurile, toate deschiderile) | 34.500 |
| **Total armătură cadre** | **≈ 69.900 kg** |

### PTh-R.8.3 Extras armătură — planșee

| Element | Masă totală estimată [kg] |
|---|---|
| Plăci curente (8 niveluri × 384 m² + terasă) | 39.800 |
| Centuri-colectori (perimetrale + goluri) | 4.200 |
| Placă peste subsol (384 m², armare majorată) | 9.800 |
| Scări (rampe + podeste) | 2.800 |
| **Total armătură planșee** | **≈ 56.600 kg** |

### PTh-R.8.4 Extras armătură — infrastructură

| Element | Masă totală estimată [kg] |
|---|---|
| Radier general (rețele curente + capiteluri + armătură de străpungere) | 44.500 |
| Pereți subsol (perimetru ≈ 80 m) | 7.600 |
| **Total armătură infrastructură** | **≈ 52.100 kg** |

### PTh-R.8.5 Totalizare generală și indice de consum

| Categorie | Masă [kg] |
|---|---|
| Pereți structurali | 74.500 |
| Cadre (stâlpi+grinzi) | 69.900 |
| Planșee | 56.600 |
| Infrastructură (radier+pereți subsol) | 52.100 |
| **TOTAL armătură structură** | **≈ 253.100 kg ≈ 253,1 t** |

Indice de consum: 253.100 kg / (2.101 m³ beton, conform `structura.md` §14 quater) = **≈ 120,5 kg/m³** — valoare foarte apropiată de estimarea DTAC (125 kg/m³), diferența (≈ 4%) fiind atribuibilă detalierii precise pe zone (reducerea treptată a bulbilor, diferențierea grinzilor pe deschidere) fapt care rafinează ușor în minus consumul global față de estimarea generică din DTAC. Consumul specific rămâne în domeniul uzual 110-140 kg/m³ pentru structuri duale în zonă seismică a_g = 0,25g.

### PTh-R.8.6 Extras cofraje (suprafață desfășurată)

| Element | Suprafață cofraj [m²] |
|---|---|
| Pereți structurali (ambele fețe, toate nivelurile) | ≈ 4.850 |
| Stâlpi (4 fețe, toate nivelurile) | ≈ 1.680 |
| Grinzi (fund + 2 fețe laterale) | ≈ 2.240 |
| Planșee (față inferioară, cofraj recuperabil sau pierdut-predală) | ≈ 3.840 |
| Radier + pereți subsol | ≈ 950 |
| **Total suprafață cofrată** | **≈ 13.560 m²** |

### PTh-R.8.7 Extras beton pe clase (recapitulare volumetrică pe clasă de rezistență)

| Clasă beton | Elemente | Volum [m³] |
|---|---|---|
| C30/37 (radier, pereți subsol) | infrastructură | 428 |
| C35/45 (stâlpi S-P/pereți S-E2/nucleu) | zona inferioară suprastructură | ≈ 340 |
| C30/37 (stâlpi/pereți E3-E8) | zona superioară suprastructură | ≈ 240 |
| C25/30 (grinzi, planșee, scări) | toate nivelurile | ≈ 776 |
| C8/10 (beton de egalizare sub radier) | strat de nivelare | ≈ 43 |
| **Total** | | **≈ 1.827 m³ + 274 m³ = 2.101 m³** (recapitulare consistentă cu §14 quater DTAC) |

---

## PTh-R.9 — ROSTURI — SEISMIC, TASARE, CONTRACȚIE/DILATAȚIE TEHNOLOGICĂ

### PTh-R.9.1 Rostul seismic față de construcțiile vecine

Conform `structura.md` §13, rostul minim necesar este **≥ 90 mm** (calculat din regula Δ ≥ √(d_1² + d_2²), pentru deplasări SLU d_1 = d_2 = 62 mm). Detaliul de execuție al rostului:

- **Lățime de execuție** adoptată: **100 mm** (marjă suplimentară de 10 mm față de minimul calculat, pentru toleranțe de execuție a cofrajelor și pentru acoperirea incertitudinii privind deplasarea reală a construcției vecine, dacă aceasta nu este cunoscută cu precizie la faza PTh);
- **Materializare:** rost complet gol pe toată înălțimea clădirii (de la radier la atic), fără nicio punte rigidă (beton, zidărie, șapă continuă) care ar transmite forțe între cele două structuri;
- **Umplere:** materialul de umplere este **compresibil** (polistiren extrudat de joasă densitate sau spumă compresibilă specială pentru rosturi de dilatare/seismice), care nu opune rezistență semnificativă la deplasarea relativă, dar împiedică pătrunderea molozului/apei în timpul execuției;
- **Etanșare exterioară:** la fațadă, rostul se etanșează cu profil de rost elastomeric (bandă EPDM sau silicon structural pe suport de fund de rost), dimensionat să acomodeze mișcarea relativă calculată fără rupere;
- **La subsol** (dacă vecinul are de asemenea subsol la aceeași cotă), rostul se continuă sub cota terenului, cu tratare hidroizolantă specială la interfață (bandă de etanșare elastică, nu waterstop rigid, pentru a permite mișcarea relativă fără pierderea etanșeității);
- **La terasă**, rostul se acoperă cu o tablă de acoperire glisantă (nu fixă), care permite deplasarea relativă fără a compromite hidroizolația terasei.

### PTh-R.9.2 Absența rostului de dilatație/seismic interior

Conform `structura.md` §13, corpul este unic și compact (24 × 16 m, λ = 1,5 < 4) ⇒ **nu se prevede rost interior**. Efectele termice și de contracție a betonului se controlează exclusiv prin:
- **Armătură distribuită** minimă (ρ ≥ 0,15-0,20% în plăci, conform SR EN 1992-1-1 §9.3.1.1, deja acoperită de armătura de rezistență Ø10/125-200);
- **Rosturi de turnare tehnologice** (nu structurale) — poziționate la intervale de execuție (uzual pe conturul unei zile de turnare), tratate cu waterstop la infrastructură (§PTh-R.7.5) și cu armătură continuă traversând rostul la suprastructură;
- **Programul de turnare** eșalonat pe zone (a se vedea §PTh-R.10), care limitează suprafața turnată continuu și, implicit, gradientul termic de hidratare la elementele masive (radier).

### PTh-R.9.3 Rosturi de tasare — verificare și tratare

Deoarece întreaga clădire reazemă pe un **radier general unic, rigid** (§11.4 DTAC, K_r = 0,138, rigiditate intermediară-rigidă), nu se produc tasări diferențiale semnificative în interiorul amprentei clădirii (Δs/L < 1/500, `structura.md` §11.4) ⇒ **nu sunt necesare rosturi de tasare în interiorul corpului**. Rostul seismic față de vecini (§PTh-R.9.1) joacă implicit și rolul de rost de tasare, întrucât cele două construcții pot avea tasări absolute diferite (fundații independente, radiere de dimensiuni și încărcări diferite) — lățimea de 100 mm acoperă și eventuale diferențe mici de tasare absolută (ordinul a câțiva mm, mult sub marja disponibilă).

**Monitorizarea tasării diferențiale** (borne topografice, conform §11.4 DTAC și §PTh-R.16) servește tocmai la confirmarea, pe parcursul execuției și în primul an de exploatare, a ipotezei de radier rigid fără tasări diferențiale semnificative — dacă monitorizarea ar arăta abateri față de predicție, s-ar reevalua necesitatea unor măsuri suplimentare (fapt nesemnalat ca probabil, dat fiind factorul de rigiditate calculat, dar prevăzut ca procedură de siguranță).

### PTh-R.9.4 Rosturi de contracție a plăcii de pardoseală a subsolului (dacă distinctă de radier)

Dacă placa de uzură/pardoseala parcajului de la subsol este turnată separat de radierul structural (soluție tehnologică uzuală pentru a permite tratamentul de suprafață — sclivisire, tratament de durificare — independent de programul radierului), se prevăd **rosturi de contracție tăiate** (nu structurale) la interval de **5-6 m** pe ambele direcții, tăiate la 24-48 ore după turnare (când betonul a atins o rezistență suficientă pentru tăiere fără smulgerea agregatului, dar înainte de apariția fisurilor necontrolate de contracție plastică), la o adâncime de 1/4-1/3 din grosimea plăcii.

---

## PTh-R.10 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII DE BETON ARMAT

### PTh-R.10.1 Cofrarea

- **Pereți structurali:** cofraje modulare metalice de față mare (2,70 × 1,20 m sau echivalent), cu sisteme de etanșare la rosturi (bandă de etanșare pe muchiile panourilor) pentru evitarea pierderii laptelui de ciment la turnare; cofrajul se rigidizează cu tije de ancoraj (distanțiere din plastic, cu manșon recuperabil, capetele metalice tratate anticoroziv sau înlăturate și găurile astupate cu mortar de reparație, pentru a nu compromite etanșeitatea la pereții cuvei);
- **Stâlpi:** cofraje metalice/mixte pe toată înălțimea de nivel (2,90 m curent, 3,20 m parter), cu ferestre de control și de vibrare la partea inferioară;
- **Grinzi și planșee:** cofraj clasic pe eșafodaj metalic (popi telescopici + grinzi de cofraj), sau, dacă se adoptă varianta cu predală prefabricată (§PTh-R.6.3), cofraj doar la marginile plăcii și la grinzi, predala servind drept cofraj pierdut pentru zona curentă a plăcii;
- **Radier:** cofraj perimetral simplu (radierul se toarnă direct pe stratul de egalizare + membrană hidroizolantă, fără cofraj de fund), cu cofraj lateral pe conturul întregii amprente (425 m²) și la consola perimetrală de 0,5 m;
- **Toleranțe de execuție a cofrajelor:** verticalitate pereți/stâlpi ≤ H/500 (max. 25 mm pe toată înălțimea clădirii), planeitate fețe cofrate ≤ 5 mm sub dreptar de 2 m, poziție în plan ≤ ±10 mm față de axele de trasare.

### PTh-R.10.2 Trasarea și verificarea geometrică înainte de turnare

- **Trasarea axelor** structurii pe fiecare nivel se face prin metode topografice (stație totală, coordonate raportate la bornele fixate pe radier), cu report de la un reper vertical unic (fir cu plumb laser coborât din puțul liftului sau din casa scării, verificat la fiecare nivel);
- **Controlul poziției armăturii** înainte de închiderea cofrajului: diametre, număr de bare, interax etrieri de confinare, poziție bulbi, acoperire cu beton (distanțieri montați și verificați), continuitatea mustăților de la nivelul inferior;
- **Verificarea golurilor tehnologice** (treceri instalații prin pereți/planșee, conform §PTh-R.14) — poziția și dimensiunea golurilor se marchează pe planul de cofraj și se confruntă cu planurile de instalații ÎNAINTE de turnare, întrucât corectarea ulterioară (carotare) a unui gol omis sau greșit poziționat în pereții structurali este limitată de regulile de la §PTh-R.14.4.

### PTh-R.10.3 Turnarea betonului

- **Pereți structurali:** turnare pe înălțime de nivel, în straturi de 40-50 cm, cu vibrare sistematică cu pervibrator de diametru adecvat densității armăturii (Ø 25-30 mm în zonele curente ale inimii, Ø 40-50 mm cu grijă sporită sau vibrare externă pe cofraj în zonele de bulbi dens armate, unde riscul de cuib de pietriș este maxim); viteza de turnare se limitează pentru a evita presiunea excesivă pe cofraj și segregarea betonului;
- **Radierul:** turnare continuă pe cât posibil (fără rost), cu pompe de beton de capacitate corespunzătoare volumului (≈ 361 m³ zonă principală, conform `structura.md` §14 quater), organizată pe fâșii succesive cu front de turnare progresiv, pentru a menține un rost de lucru "viu" (beton proaspăt pe beton proaspăt) pe toată durata turnării; dacă volumul/logistica impun turnare în 2 etape, se aplică rostul cu waterstop de la §PTh-R.7.5;
- **Planșeele:** turnare monolit pe cofraj/predală, cu vibrare cu rigla vibrantă pentru suprafață și pervibrator la zonele de centuri-colectori și de grosime mărită;
- **Controlul temperaturii betonului la turnare masivă (radier):** pentru elemente cu grosime ≥ 80 cm, se verifică diferența de temperatură miez-suprafață (risc de fisurare termică la răcire diferențială) — se recomandă monitorizare cu termocupluri înglobate la radier, cu limita uzuală Δт ≤ 20°C între miez și suprafață, gestionată prin compoziția betonului (ciment cu căldură de hidratare moderată) și, dacă necesar, prin protecție termică a suprafeței (prelate izolante) pe timp friguros sau răcire suplimentară pe timp călduros.

### PTh-R.10.4 Secvența de execuție pe verticală

1. Excavație generală până la cota de fundare (−4,00 m), cu sprijinire a malurilor și epuizment (a se vedea §PTh-R.11);
2. Strat de egalizare (beton de curățenie C8/10, 10 cm) + membrană hidroizolantă sub radier;
3. Armarea și turnarea radierului general (fază determinantă FD, §PTh-R.13);
4. Armarea și turnarea pereților de subsol + stâlpilor de subsol (pe înălțime de nivel);
5. Turnarea plăcii peste subsol (diafragmă de bază + încastrare suprastructură);
6. Execuție repetitivă, nivel cu nivel, de la parter la E8: armare+turnare stâlpi/pereți → montare cofraj planșeu (sau predală) → armare+turnare planșeu → decofrare parțială și repetare la nivelul următor;
7. Execuția atică, elementelor de terasă și a agregatelor tehnice;
8. Finisaje structurale (dacă e cazul — șlefuire, reparații locale de suprafață).

### PTh-R.10.5 Decofrarea și tratarea betonului proaspăt

- **Termene minime de decofrare** (funcție de clasa de beton, temperatura ambientală și rezultatele probelor de rezistență la decofrare — conform SR EN 13670 și normativelor naționale de execuție): cofraj lateral pereți/stâlpi — minim 24-48 ore (verificat prin probe martor sau metoda maturității); cofraj/popi de sprijin planșee — minim 7 zile pentru eliminarea cofrajului lateral, popii de siguranță se mențin până la atingerea a minim 70% din rezistența caracteristică la 28 zile (verificată prin probe sau prin metoda maturității), cu repoziționare eșalonată pe 2-3 niveluri suprapuse (nu se elimină toți popii de sub un planșeu imediat după turnarea planșeului următor);
- **Tratarea betonului proaspăt** (curing): stropire cu apă sau aplicare de membrană de protecție (curing compound) pe suprafețele expuse (planșee, radier), minim 7 zile, pentru evitarea uscării premature și a fisurării de contracție plastică; pe timp călduros/vânt, protecția se intensifică (prelate umede, parasolare).

### PTh-R.10.6 Execuția pe timp friguros/călduros (C 16-1984 + practica curentă)

**Timp friguros (temperaturi ambientale < +5°C):**
- Betonul se protejează termic imediat după turnare (prelate izolante, eventual cofraj termoizolant sau folie cu bule + prelată), pentru a menține temperatura miezului peste +5°C pe toată perioada de priză și întărire inițială (minim 3 zile pentru betoanele cu întărire normală, mai mult pentru cele cu aditivi de întârziere);
- Se pot folosi aditivi acceleratori de priză/întărire și cimenturi cu întărire rapidă, cu acordul proiectantului, pentru a compensa încetinirea reacției de hidratare la temperaturi scăzute;
- Apa și agregatele se pot preîncălzi la stația de betoane, iar temperatura betonului proaspăt la livrare se verifică și se consemnează (limită minimă uzuală +5°C la livrare, +10°C recomandat pentru elemente masive precum radierul);
- **Decofrarea se amână** față de termenele curente, condiționat de atingerea rezistenței necesare, verificată prin probe martor menținute în condiții similare elementului real (nu în laborator la temperatură normală) sau prin metoda maturității cu senzori înglobați;
- Se evită turnarea pe suprafețe înghețate sau acoperite cu gheață/zăpadă — cofrajul și armătura se curăță complet de gheață înainte de turnare.

**Timp călduros (temperaturi ambientale > +30°C sau radiație solară intensă):**
- Se evită turnarea în orele cu radiație solară maximă (se preferă dimineața devreme/seara), în special pentru elementele masive (radier) unde diferența de temperatură miez-suprafață la răcire este critică (§PTh-R.10.3);
- Se folosesc, dacă necesar, gheață/apă răcită în compoziția betonului sau ciment cu căldură de hidratare redusă, pentru limitarea temperaturii maxime din miez;
- Suprafețele proaspăt turnate (planșee, radier) se protejează imediat împotriva evaporării rapide a apei (stropire cu apă, membrană de protecție/curing compound, prelate umede), pentru a evita fisurarea de contracție plastică — risc semnificativ mai mare pe vreme caldă și cu vânt;
- Rosturile de contracție ale plăcii de pardoseală (§PTh-R.9.4) se taie mai devreme (12-18 ore) pe vreme caldă, din cauza vitezei mai mari de dezvoltare a contracției.

Pentru ambele situații climatice, deciziile tehnologice (aditivi, temperaturi, termene de decofrare) se consemnează într-o **fișă tehnologică de betonare** specifică sezonului, întocmită de responsabilul tehnic cu execuția (RTE) și avizată de proiectant pentru elementele critice (radier, pereți structurali, noduri de cadru).

### PTh-R.10.7 Caiet de armare — scara de beton armat (completare de execuție)

Geometria și armătura de bază ale scării sunt cele din `structura.md` §12 (rampă L_h = 2,70 m, h = 1,45 m, placă înclinată 15 cm, armare Ø10/150 longitudinal + Ø8/200 repartiție). Caietul de execuție PTh detaliază:

| Element | Armătură | Observație de execuție |
|---|---|---|
| Placă rampă (armătură principală, dispusă pe linia de cea mai mare pantă) | Ø10/150 (524 mm²/m) | ancorată min. l_b în podeste, la ambele capete ale rampei |
| Armătură de repartiție (perpendiculară pe principală) | Ø8/200 | continuă pe toată lățimea rampei (1,20 m) |
| Armătură suplimentară sub trepte (control fisurare la muchia treptei) | plasă Ø6/150×150 | dispusă sub stratul de beton al treptelor, deasupra plăcii structurale |
| Podeste (placă rezemată pe pereții nucleului) | Ø10/150 ambele direcții | ancorare completă în bulbii pereților nucleului |
| Reazem alunecător (un capăt de rampă, conform §12 DTAC) | neopren armat, grosime 10 mm, pe suport metalic | permite deplasarea impusă de driftul nucleului fără a transmite forțe axiale parazite rampei |

**Execuție:** rampele se toarnă monolit cu podestele acolo unde nu există reazem alunecător prevăzut, respectiv separat (cu rost tehnologic tratat) la capătul cu reazem alunecător; cofrarea plăcii înclinate se face pe eșafodaj reglabil, cu control al pantei prin nivelment optic înainte de turnare; treptele se toarnă fie monolit cu placa (cofraj special pentru profil treaptă), fie ca strat suprapus după priza plăcii (variantă care permite un control mai bun al geometriei finale a treptei, recomandată pentru finisaje pretențioase).

---

## PTh-R.11 — EXECUȚIA INFRASTRUCTURII — HIDROIZOLAȚIE, EPUIZMENT, APĂ FREATICĂ

### PTh-R.11.1 Datele de intrare geotehnice pentru execuție

Conform `structura.md` §11.1: nivel hidrostatic maxim NH_max = −2,50 m (variabil sezonier, conservator −0,50 m pentru verificarea la plutire), cotă de fundare a radierului −4,00 m. **Diferența de 1,50-3,50 m între cota de fundare și nivelul apei** impune măsuri active de gestionare a apei pe toată durata execuției infrastructurii (excavație, armare, turnare radier, execuție pereți subsol, până la atingerea greutății stabilizatoare suficiente — minim 3 niveluri suprateran turnate, conform §11.5 DTAC).

### PTh-R.11.2 Epuizmentul (coborârea provizorie a nivelului apei subterane)

- **Metoda adoptată:** epuizment prin **puțuri filtrante** (well-points) dispuse pe conturul excavației, la interax 3-5 m, cu pompare continuă până la cel puțin 0,5 m sub cota de fundare, menținută pe toată durata lucrărilor de infrastructură;
- **Verificarea debitului de pompare:** dimensionat de specialistul geotehnician pe baza permeabilității stratului (nisip argilos îndesat, strat 3, `structura.md` §11.1), cu marjă pentru variații sezoniere ale nivelului hidrostatic;
- **Monitorizarea nivelului apei** în piezometre de control dispuse în interiorul și în exteriorul incintei excavate, cu citire zilnică pe toată durata epuizmentului activ;
- **Sistarea epuizmentului** se face gradual, doar după ce greutatea stabilizatoare a construcției (minim 3 niveluri suprateran turnate, conform verificării UPL/EQU de la §11.5 DTAC) depășește cu factorul de siguranță cerut forța de subpresiune la nivelul hidrostatic natural — verificare explicită, pe etape, de către proiectant, înainte de fiecare oprire/reducere a pompării;
- **Impactul asupra vecinătăților:** coborârea nivelului apei subterane pe durata epuizmentului poate induce tasări mici la construcțiile învecinate (consolidare suplimentară a terenului la coborârea presiunii interstițiale) — se monitorizează prin borne de tasare la construcțiile vecine apropiate (conform planului de organizare a execuției, `general.md` cap. 1.2), cu prag de alarmare stabilit de geotehnician.

### PTh-R.11.3 Sprijinirea excavației

- **Unde spațiul din incintă permite** (retragerile față de vecini fiind generoase, `general.md` §4.2: min. 6,00 m lateral, 6,50 m posterior), taluzarea excavației la panta naturală de echilibru temporar a terenului (stratul 1-2, argilă prăfoasă) este soluția economică preferată;
- **Unde excavația se apropie de construcțiile vecine** sau de limita de proprietate (sub distanța necesară pentru taluzare sigură), se prevede **sprijinire cu palplanșe metalice** (înfipte prin vibrare/presare, extrase după finalizarea infrastructurii) sau, alternativ, **piloți secanți/forați de contur** (soluție rigidă, recomandată dacă adâncimea de excavație sau proximitatea vecinilor impune deformații foarte reduse ale terenului sprijinit);
- **Monitorizarea deplasărilor** peretelui de sprijin (înclinometre, dacă se adoptă palplanșe/piloți) și a construcțiilor vecine apropiate, cu prag de alarmare stabilit de proiectantul de specialitate geotehnică.

### PTh-R.11.4 Hidroizolația cuvei etanșe (radier + pereți subsol)

Peste măsurile structurale (beton W8/P8, waterstop-uri la rosturi — §PTh-R.7.5), se aplică un sistem de hidroizolație complementar, conform practicii curente pentru subsoluri sub nivelul hidrostatic:

- **Sub radier:** membrană hidroizolantă (bituminoasă armată sau membrană PVC/HDPE, funcție de soluția tehnică aleasă de proiectantul de arhitectură/instalații, coordonată la §PTh-R.14), așezată pe stratul de egalizare (beton de curățenie C8/10), cu suprapuneri sudate/lipite conform fișei tehnice a produsului, protejată la turnarea radierului cu un strat de protecție mecanică (șapă de protecție sau geotextil greu);
- **La pereții subsolului (fața exterioară, dinspre pământ):** hidroizolație verticală (membrană lipită la cald sau sistem de vopsea hidroizolantă flexibilă tip bentonitic/cimenticios cristalizator, aplicat pe fața exterioară a peretelui după decofrare și înainte de umplerea excavației), continuă cu hidroizolația de sub radier la baza peretelui (racord etanș, tratat cu bandă de etanșare suplimentară la unghiul radier-perete);
- **Protecția mecanică a hidroizolației verticale:** placă de protecție (polistiren extrudat cu rol dublu — protecție mecanică + drenaj) sau membrană bombată (tip "delta") înainte de umplerea excavației, pentru a evita perforarea hidroizolației la compactarea umpluturii;
- **Drenaj perimetral:** tub de drenaj la baza peretelui subsolului (pe toată perimetrul), înglobat în strat de pietriș filtrant, racordat la un cămin de colectare și, de acolo, la rețeaua de canalizare pluvială sau la un sistem de pompare (dacă cota de evacuare gravitațională nu este posibilă) — rol de reducere a presiunii hidrostatice reziduale asupra cuvei etanșe, complementar (nu substitutiv) etanșeității structurale W8/P8.

### PTh-R.11.5 Verificarea etanșeității la recepția infrastructurii

Înainte de acoperirea hidroizolației (umplerea excavației, montarea instalațiilor interioare), se efectuează:
- **Inspecție vizuală completă** a suprafețelor de beton (radier, pereți) pentru identificarea eventualelor fisuri, cuiburi de pietriș sau zone poroase — orice defect se repară conform procedurii de reparație structurală (injectare cu rășină epoxidică pentru fisuri < 0,3 mm care nu afectează rezistența, sau demolare-reconstrucție locală pentru defecte majore, cu avizul proiectantului);
- **Proba de etanșeitate** (dacă geometria și programul o permit) — umplere controlată cu apă a subsolului până la o cotă de probă și monitorizarea eventualelor infiltrații pe o durată de minim 48-72 ore, înainte de finalizarea hidroizolației exterioare (probă recomandată, nu obligatorie normativ, dar bună practică pentru cuve etanșe critice);
- **Verificarea rosturilor cu waterstop** — control vizual al continuității benzilor de etanșare la toate intersecțiile (colțuri, intersecții radier-perete), cu fotografiere/documentare înainte de turnarea betonului care le acoperă (parte a dosarului fazei determinante FD1/FD2, §PTh-R.13).

---

## PTh-R.12 — PLANUL DE CONTROL AL CALITĂȚII — BETON ȘI ARMĂTURĂ

### PTh-R.12.1 Controlul materialelor la recepție

- **Ciment, agregate, apă, aditivi:** certificate de conformitate de la furnizor, verificare periodică prin încercări de laborator (conform SR EN 206 și normelor de recepție a materialelor pentru beton);
- **Armătură B500C:** certificat de calitate/conformitate pentru fiecare lot, cu verificarea diametrului real, a limitei de curgere (f_yk ≥ 500 MPa), a rezistenței la rupere și a alungirii la forța maximă (ε_uk ≥ 7,5%, clasa de ductilitate C obligatorie pentru DCM), prin **încercări de tracțiune conform SR EN ISO 6892-1**, pe eșantioane prelevate din fiecare lot livrat pe șantier — minim 1 set de 3 epruvete/lot/diametru;
- **Sudabilitate/înnădiri mecanice** (dacă se folosesc manșoane la barele Ø25 din bulbii pereților, alternativă la înnădirea prin suprapunere în zonele unde spațiul e limitat): certificat de agrement tehnic al sistemului de manșoane, verificat prin încercare de tracțiune pe îmbinare (rezistență ≥ rezistența barei de bază).

### PTt-R.12.2 Controlul betonului proaspăt

- **Consistență (tasare/slump):** verificată la fiecare transport, conform SR EN 12350-2, clasă S3-S4 pentru pereți/stâlpi (armare deasă, beton pompabil), S2-S3 pentru radier;
- **Temperatura betonului proaspăt la livrare:** verificată și consemnată, cu limite de acceptare funcție de condițiile atmosferice (evitarea turnării la temperaturi extreme fără măsuri suplimentare, a se vedea §PTh-R.10.5 și normativul C 16 pentru execuția pe timp friguros);
- **Conținut de aer antrenat** (pentru elementele expuse XC4+XF1 — atic, elemente exterioare): verificat conform SR EN 12350-7, în intervalul 4-6%.

### PTh-R.12.3 Controlul betonului întărit — probe pe cilindri/cuburi

- **Prelevare:** minim 1 set de probe (3 cilindri Ø150×300 mm sau 3 cuburi de 150 mm muchie, conform SR EN 12390-1) la fiecare **50 m³ de beton turnat** sau la fiecare fază de betonare distinctă (element/nivel), oricare survine primul — pentru radier (≈ 361 m³), aceasta înseamnă minim 7-8 seturi de probe pe element;
- **Încercarea la compresiune** (SR EN 12390-3) la 7 zile (informativ, evoluție) și la 28 zile (rezistență de referință); criteriul de acceptare a lotului conform SR EN 206: f_cm ≥ f_ck + 4 MPa (medie pe seturi) și nicio valoare individuală sub f_ck − 4 MPa;
- **Probe suplimentare pentru decofrare/darea în lucru anticipată:** seturi separate, încercate la vârste mai mici (3, 7 zile), corelate cu metoda maturității (senzori de temperatură înglobați, curbă de corelație rezistență-maturitate stabilită în laborator pentru rețeta de beton folosită) pentru elemente unde decofrarea/încărcarea anticipată este necesară pentru ritmul de execuție (planșee, cu popii intermediari care rămân totuși până la 70% f_ck);
- **Control ultrasonic (metoda vitezei de propagare a impulsului ultrasonic, SR EN 12504-4):** aplicat prin sondaj pe elemente critice (pereți structurali în zona bulbilor, radier în zonele de capitel/străpungere) pentru verificarea omogenității betonului și identificarea eventualelor cuiburi de pietriș/zone poroase neevidente vizual — util în special în zonele cu armare foarte densă (bulbi Ø25 + etrieri de confinare Ø10/100), unde riscul de compactare incompletă este maxim; se corelează, unde există incertitudine, cu **indicele de recul (ciocan Schmidt, SR EN 12504-2)** ca metodă complementară de evaluare nedistructivă;
- **Carote de control** (dacă rezultatele probelor standard sau ale controlului nedistructiv ridică suspiciuni): extragere de carote conform SR EN 12504-1, încercate la compresiune, cu factor de corecție pentru raportul înălțime/diametru — folosite doar ca verificare de excepție, nu ca metodă curentă (afectează integritatea locală a elementului).

### PTh-R.12.4 Controlul armării înainte de turnare (checklist de fază)

Pentru fiecare element (perete/stâlp/grindă/planșeu/radier), înainte de închiderea cofrajului și turnare:
- diametrul și numărul de bare conform planului de armare;
- interaxul etrierilor/agrafelor de confinare în zonele critice;
- acoperirea cu beton (distanțieri montați, verificați cu șubler prin sondaj);
- continuitatea mustăților și lungimile de ancoraj/suprapunere conform §15 quater DTAC;
- poziția și dimensiunea golurilor tehnologice (coordonare instalații, §PTh-R.14);
- curățenia cofrajului (absența resturilor de lemn, sârmă, praf) și aplicarea decofrolului.

### PTh-R.12.5 Documentarea și trasabilitatea

Toate rezultatele controalelor (buletine de încercare beton, certificate armătură, procese-verbale de verificare a armării înainte de turnare, fotografii ale rosturilor cu waterstop) se arhivează în **Cartea Tehnică a Construcției**, cu trasabilitate pe element/nivel/dată de turnare, conform Legii 10/1995 și C 56/2002.

---

## PTh-R.13 — FAZE DETERMINANTE

| Nr. | Faza determinantă | Verificări/criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare (cota săpăturii, −4,00 m, întreaga amprentă radier) | Confruntare cu studiul geotehnic; p_conv = 260 kPa confirmată; absența umpluturilor/pungilor slabe; nivelul apei conform prognozei | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Armarea radierului general înainte de betonare | Diametre, poziții, acoperire, capiteluri de străpungere, mustăți pentru pereți subsol și nucleu, poziționarea și continuitatea waterstop-urilor la rosturile de turnare | Proiectant, diriginte, constructor, ISC |
| FD3 | Armarea pereților de subsol + placă peste subsol, înainte de betonare | Continuitate mustăți radier-perete, armătură la împingerea pământului, centuri-colectori placă peste subsol, coordonare goluri instalații | Proiectant, diriginte, constructor, ISC |
| FD4 | Recepția hidroizolației infrastructurii înainte de umplerea excavației | Continuitate membrane, protecție mecanică, absența perforărilor, documentare foto | Proiectant, diriginte, constructor |
| FD5 | Armarea pereților structurali și a zonelor critice (bulbi, buiandrugi de cuplare), la fiecare 2 niveluri | Diametre bulbi, etrieri de confinare, fără înnădiri prin suprapunere în h_cr, continuitate cu nivelul inferior | Proiectant, diriginte, constructor, ISC |
| FD6 | Armarea nodurilor de cadru și confinarea stâlpilor, la fiecare 2 niveluri | Capacity design (Σ M_Rc ≥ 1,3·Σ M_Rb) confirmat pe armătura reală pusă în operă, etrieri de confinare la zonele critice l_cr | Proiectant, diriginte, constructor, ISC |
| FD7 | Armarea planșeelor (centuri-colectori, contur goluri scară/lift) la fiecare nivel | Continuitatea centurilor, ancorarea la bulbii pereților, poziția corectă a golurilor | Proiectant, diriginte, constructor |
| FD8 | Structura la roșu finalizată | Conformitate geometrică generală (verticalitate, aliniament), absența defectelor vizibile, toate probele de beton conforme, PV-uri de fază determinantă arhivate | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte (conform practicii curente de notificare ISC), întocmirea procesului-verbal de fază determinantă — condiție obligatorie pentru autorizarea continuării lucrărilor. Neîndeplinirea criteriilor blochează avansul execuției până la remediere și reverificare.

---

## PTh-R.14 — COORDONAREA CU ARHITECTURA ȘI INSTALAȚIILE

### PTh-R.14.1 Principiul de coordonare

Structura de rezistență găzduiește, pe toată suprafața ei, un volum semnificativ de trasee de instalații (sanitare, termice, electrice, ventilare) care traversează sau se sprijină pe elementele structurale. Coordonarea la faza PTh se face pe baza planurilor de arhitectură și de instalații (a se vedea `general.md` cap. 1.2 și `instalatii.md`), cu regula de aur: **golurile în elementele structurale se decid la faza PTh, nu se improvizează în execuție** — orice gol neprevăzut, descoperit necesar în timpul montajului instalațiilor, se supune avizului proiectantului de rezistență înainte de a fi executat (carotare sau spargere), pentru a evita afectarea armăturii principale sau a secțiunii de rezistență.

### PTh-R.14.2 Goluri admise în elementele structurale — reguli generale

| Element | Goluri admise fără verificare de calcul | Goluri care necesită verificare/întărire |
|---|---|---|
| Pereți structurali (inimă, în afara bulbilor) | Ø ≤ 100 mm, la interax ≥ 1,0 m, în afara h_cr | Ø > 100 mm oriunde; orice gol în h_cr; orice gol în bulb (interzis) |
| Planșee (dală 15 cm) | Ø ≤ 150 mm, la interax ≥ 0,5 m, în afara centurilor-colector | Ø > 150 mm, grupuri de goluri apropiate, orice gol care intersectează armătura de reazem negativ |
| Grinzi | goluri verticale mici (Ø ≤ 50 mm) în treimea mijlocie a înălțimii, în zona de forfecare redusă (mijlocul deschiderii) | orice gol în zona critică de la reazeme; orice gol care secționează armătura longitudinală |
| Radier | goluri pentru cămine de pompare/canalizare, poziționate în afara capitelurilor de străpungere | goluri mari (bașe colectoare) — necesită grindă de bordură și verificare locală a distribuției de presiune pe teren |

Toate golurile mai mari decât pragurile de mai sus se marchează explicit pe planurile de cofraj și armare (PTh-R.5, PTh-R.6, PTh-R.7), cu bordarea corespunzătoare (bare suplimentare în jurul golului, conform practicii deja descrise la §PTh-R.5.4 pentru golurile de ușă ale nucleului și la §PTh-R.6.2 pentru golul scară+lift).

### PTh-R.14.3 Coordonarea coloanelor verticale de instalații

Coloanele de instalații (sanitare — coloane de scurgere și alimentare, termice — coloane de încălzire, electrice — coloane de curenți tari/slabi) se grupează, conform partiului de arhitectură (`general.md` §6.1: nucleu central cu circulații și coloane suprapuse pe verticală), în **ghene tehnice dedicate**, poziționate adiacent nucleului structural, nu în interiorul pereților structurali sau al stâlpilor. Traversarea planșeelor de către coloane se face prin goluri predefinite (conform §PTh-R.14.2), coordonate identic pe toate nivelurile (aceeași poziție în plan de la subsol la terasă), pentru a permite montajul coloanelor continue fără devieri.

### PTh-R.14.4 Procedura de tratare a golurilor neprevăzute descoperite în execuție

Dacă, pe parcursul montajului instalațiilor, se constată necesitatea unui gol neprevăzut în planurile PTh (situație de evitat, dar posibilă la proiecte de complexitate mare):
1. se oprește orice intervenție asupra elementului structural până la avizul proiectantului de rezistență;
2. proiectantul evaluează poziția golului față de armătura reală pusă în operă (pe baza planurilor as-built sau a scanării cu detector de armătură) și față de zonele critice (bulbi, h_cr, centuri-colectori);
3. se emite o **dispoziție de șantier** cu soluția tehnică (repoziționare gol, întărire locală cu armătură suplimentară ancorată prin rășină epoxidică, sau, dacă golul este incompatibil cu integritatea structurală, respingerea soluției de instalații și căutarea unui traseu alternativ);
4. execuția golului se face doar după emiterea dispoziției de șantier semnate, cu metodă adecvată (carotare cu diamant, nu spargere cu dalta/ciocanul, pentru a evita microfisurarea necontrolată a betonului adiacent și afectarea armăturii existente).

### PTh-R.14.5 Coordonarea cu fundația și instalațiile îngropate

Traseele de canalizare, alimentare cu apă și electrice care ies din clădire prin radier/pereții de subsol se coordonează cu poziția armăturii radierului (§PTh-R.7) și cu hidroizolația cuvei etanșe (§PTh-R.11.4): fiecare străpungere a hidroizolației se tratează cu **piesă specială de trecere etanșă** (manșon cu flanșă de etanșare, sudat/lipit la membrană), poziționată și dimensionată încă din faza de proiectare a planurilor de instalații, nu adăugată ad-hoc după execuția hidroizolației.

### PTh-R.14.6 Coordonarea cu adăpostul de protecție civilă (ALA)

Adăpostul ALA de la subsol (`general.md` §6.2) impune cerințe structurale specifice (grosimi de perete/planșeu majorate local, conform normelor tehnice de protecție civilă — HG 862/2016 și normele de aplicare), care se verifică separat de calculul seismic curent și se documentează distinct în planurile de rezistență ale zonei ALA — nu se detaliază numeric în acest supliment (obiect al unei documentații tehnice specifice de protecție civilă, coordonate de proiectantul de rezistență cu proiectantul de specialitate ALA).

---

## PTh-R.15 — VERIFICĂRI SUPLIMENTARE LA SLS

### PTh-R.15.1 Vibrațiile planșeelor — confort la utilizare (locuințe)

Deși planșeele de locuință, cu deschideri moderate (5,40 m) și grosime relativ mare (15 cm) comparativ cu planșeele ușoare de birouri, sunt în general puțin sensibile la vibrații induse de mers, se verifică totuși frecvența proprie:

$$ f_1 = \frac{18}{\sqrt{\delta}} $$

cu δ = săgeata instantanee sub greutate proprie + o cotă din utilă (estimată δ ≈ 4-5 mm pentru placa de 15 cm pe deschidere 5,40 m, semnificativ mai rigidă decât un planșeu ușor metalic): f_1 = 18/√4,5 ≈ **8,5 Hz**, mult peste limita recomandată pentru locuințe (f_1 ≥ 4,5 Hz) ⇒ **confort asigurat cu marjă mare, fără necesitatea unei analize dinamice suplimentare** — rezultat așteptat pentru planșee grele din beton armat cu deschideri moderate.

### PTh-R.15.2 Contrasăgeți de execuție — tabel sinteză

| Element | Săgeată SLS calculată | Contrasăgeată adoptată |
|---|---|---|
| Placă dală curentă (5,40 m) | ≈ 18 mm total (§10.2 DTAC) | 8-10 mm (recomandată la turnare, reglaj popi) |
| Grinzi (5,40 m) | nesemnificativă (L/d = 9,8) | fără camber |
| Rampe scară (3,30 m calcul) | ≈ 3-4 mm | fără camber (valoare mică) |
| Console balcon (≤ 1,50 m) | ≈ 2-3 mm | fără camber, verificare rotire la capăt liber |

### PTh-R.15.3 Controlul fisurării — verificare suplimentară la elementele expuse

Peste verificarea generică din `structura.md` §10.3 (w_max = 0,4/0,3 mm interior, 0,2 mm cuvă etanșă), se verifică suplimentar elementele expuse direct la exterior fără finisaj protector continuu (atic, parapet terasă, console de balcon la intradosul expus): w_max = 0,3 mm (XC4, conform tabelului de expunere din §14bis.1), satisfăcut prin diametrul și distanța barelor adoptate (Ø10-12/125-200), verificat prin calculul de fisurare explicit acolo unde armătura este la limita tabelelor 7.2N/7.3N (cazul plăcilor de balcon, unde ruperea punții termice — §6.3 general.md — impune o secțiune locală redusă, verificată separat la interfața de decuplare termică).

### PTh-R.15.4 Verificarea SLS a rostului seismic sub acțiuni curente (vânt, temperatură)

Rostul de 100 mm (§PTh-R.9.1), dimensionat pentru deplasarea seismică SLU, este verificat și pentru mișcările curente (dilatare termică, vânt) — acestea produc deplasări relative de ordinul milimetrilor (mult sub 100 mm), confirmând că rostul, odată dimensionat la seism, acoperă automat și acțiunile de serviciu curente, fără o verificare suplimentară critică.

---

## PTh-R.16 — PROGRAM DE URMĂRIRE ÎN TIMP (P130) ȘI MONITORIZARE SPECIFICĂ

### PTh-R.16.1 Urmărirea curentă (P130/1999)

Urmărire vizuală anuală (și după evenimente deosebite — cutremur perceptibil, vânt excepțional, incendiu, inundație la subsol) a: stării pereților structurali și a stâlpilor (fisuri, desprinderi de acoperire, coroziune vizibilă a armăturii), stării planșeelor (fisuri, săgeți vizibile, infiltrații la balcoane), stării rostului seismic (continuitate, absența colmatării cu moloz/vegetație care ar bloca funcționarea lui), stării hidroizolației și a etanșeității subsolului (infiltrații, eflorescențe, umiditate persistentă la pereții subsolului). Se consemnează în **Jurnalul evenimentelor** din Cartea Tehnică a construcției.

### PTh-R.16.2 Monitorizarea tasărilor (extindere §11.4 DTAC)

- **Mărci de tasare** pe minimum 8 puncte reprezentative pe conturul radierului (4 colțuri + mijlocul celor 4 laturi), plus 2 puncte suplimentare în zona nucleului (masa cea mai concentrată);
- **Frecvență:** la fiecare 2-3 niveluri turnate în execuție, apoi la 1/3/6/12 luni după finalizarea structurii, apoi anual până la stabilizare (Δs < 2 mm/an, conform practicii curente pentru radiere pe terenuri de acest tip);
- **Criteriu de alarmare:** tasare diferențială Δs/L > 1/500 între puncte adiacente (conform verificării de calcul §11.4 DTAC) → notificare proiectant + expertiză suplimentară dacă e cazul.

### PTh-R.16.3 Monitorizarea specifică a rostului seismic

- **Verificare periodică** (anuală) a lățimii efective a rostului (comparație cu lățimea de execuție de 100 mm), pentru identificarea eventualelor tasări diferențiale între cele două construcții vecine sau a colmatării rostului cu materiale străine;
- **Verificarea etanșeității la fațadă** (profilul elastomeric de rost) — înlocuire la degradare (fisurare, pierdere de elasticitate), estimat la 10-15 ani pentru materialele curente, conform garanției producătorului.

### PTh-R.16.4 Monitorizarea sistemului de drenaj perimetral și a hidroizolației subsolului

Verificare anuală a funcționării drenajului perimetral (cămin de colectare, absența colmatării), cu curățare periodică; inspecție vizuală a pereților interiori ai subsolului pentru identificarea timpurie a eventualelor infiltrații (semn de degradare locală a hidroizolației exterioare sau a etanșeității rosturilor cu waterstop), cu procedură de intervenție (injectare de rășini hidroexpansive din interior, ca măsură corectivă locală) dacă se constată infiltrații.

---

## PTh-R.17 — SINTEZA CORECȚIILOR PTh FAȚĂ DE DTAC + CONCLUZIE INGINEREASCĂ

### PTh-R.17.1 Sinteza corecțiilor/detalierilor aduse de faza PTh față de predimensionarea DTAC

| Element/aspect | Predimensionare DTAC | Corecție/detaliere PTh | Motiv |
|---|---|---|---|
| Forța tăietoare/moment pe niveluri | doar forța de bază și momentul de răsturnare global | **înfășurătoare completă pe toate cele 10 niveluri**, cu repartiție pereți/cadre variabilă pe înălțime | necesar pentru caietul de armare pe zone |
| Armarea bulbilor pereților | valoare unică la bază (8Ø25/6Ø25) | **armare treptată pe 4 zone de înălțime**, cu reducere progresivă (8Ø25→6Ø25→6Ø22→4Ø18/16) | economie de armătură + verificare CR2-1-1.1 la fiecare zonă |
| Verificarea la flambaj local al pereților subțiri (25 cm) | neexplicitat | **verificare explicită λ_w = 8,7 ≪ limita critică**, conform CR2-1-1.1/2013 | condiție suplimentară de zveltețe locală, absentă din P100-1 |
| Verificarea la lunecare pe rosturile de turnare (shear-friction) | neexplicitat | **V_Rdi = 7.021 kN ≫ V_Ed = 1.700 kN**, verificat explicit | condiție SR EN 1992-1-1 §6.2.5, necesară la faza de execuție |
| Rostul seismic | lățime minimă calculată (≥ 90 mm) | **detaliu complet de execuție** (materializare, etanșare, tratare la subsol/terasă), lățime adoptată 100 mm | necesar pentru planurile de execuție și pentru antreprenor |
| Hidroizolația infrastructurii | menționată generic (cuvă etanșă W8/P8) | **sistem complet detaliat** (membrană sub radier + verticală la pereți + drenaj perimetral + protecție mecanică) | detaliere obligatorie la faza de execuție |
| Extras de armătură | cantități globale estimative (§14 quater DTAC, 262.200 kg) | **extras detaliat pe elemente/poziții, 253.100 kg** (indice 120,5 kg/m³, ușor sub estimarea DTAC) | rafinare prin detaliere pe zone |
| Faze determinante | 5 faze generice | **8 faze determinante detaliate**, cu criterii explicite și participanți | conformare la practica de execuție și la cerințele ISC |

### PTh-R.17.2 Tabel centralizator conformitate — verificări suplimentare PTh

| Categorie | Verificare | Rezultat |
|---|---|---|
| CR2-1-1.1 | Clasificare zveltețe pereți | toți zvelți, model consolă valid ✓ |
| CR2-1-1.1 | Flambaj local pereți 25cm | λ_w=8,7 ≪ limită ✓ |
| CR2-1-1.1 | Lungime bulb (formulă alternativă) | 450mm < 900mm adoptat ✓ |
| CR2-1-1.1 | Lunecare rost orizontal (shear-friction) | V_Rdi=7.021 ≫ V_Ed=1.700 kN ✓ |
| Înfășurătoare niveluri | V_Ed, M_Ed pe toate cele 10 niveluri | consistent cu F_b=7.083kN, M_rast≈128.800kNm ✓ |
| SLS | Vibrații planșeu locuință, f1=8,5Hz | ✓ (≫4,5Hz) |
| SLS | Contrasăgeți, fisurare | ✓ |
| Execuție | Etanșeitate infrastructură (probă recomandată) | procedură definită |
| Execuție | Control beton (cilindri+ultrasonic) | plan complet definit |

### PTh-R.17.3 Concluzie inginerească

Structura duală cu pereți structurali predominanți din beton armat a blocului de locuințe S+P+8E, verificată integral la predimensionare în faza DTAC, a fost **detaliată la nivel de execuție** în prezentul supliment PTh: înfășurătoare completă de eforturi (forță tăietoare, moment încovoietor) pe toate cele 10 niveluri, cu repartiție pereți/cadre variabilă pe înălțime; verificări suplimentare conform CR 2-1-1.1/2013 (zveltețe, flambaj local, lunecare pe rosturi de turnare); caiet de armare complet și zonat pe înălțime pentru toți pereții structurali, planșeele și infrastructura (radier general + pereți subsol); extras de materiale detaliat pe poziții (≈ 253,1 t armătură, ≈ 2.101 m³ beton, ≈ 13.560 m² cofraj); detaliu complet de execuție a rosturilor (seismic, contracție/dilatație tehnologică); tehnologie de execuție a betonului armat (cofrare, trasare, turnare, decofrare, tratare); execuția infrastructurii sub nivelul hidrostatic (epuizment, sprijinire excavație, hidroizolația cuvei etanșe, drenaj perimetral); plan de control al calității betonului (probe pe cilindri, control ultrasonic) și al armăturii; opt faze determinante detaliate; coordonare sistematică cu arhitectura și instalațiile (reguli de goluri, procedură pentru goluri neprevăzute); verificări suplimentare la SLS (vibrații, contrasăgeți, fisurare); și program de urmărire în timp (P130) cu monitorizare specifică a tasărilor, a rostului seismic și a hidroizolației.

Analiza detaliată **nu a identificat corecții de fond** față de soluția structurală adoptată în DTAC (sistemul dual, dimensiunile principale, clasele de materiale rămân neschimbate), ci **detalieri și rafinări normale** la trecerea de la faza de predimensionare (DTAC) la faza de execuție (PTh): zonarea armării pe înălțime, verificările suplimentare de cod pentru pereți (CR 2-1-1.1/2013), detalierea completă a rosturilor și a hidroizolației, precum și extrasele de cantități definitive. Se recomandă, înainte de finalizarea planurilor de execuție: (1) confirmarea parametrilor de amplasament definitivi (a_g, T_C, clasa de teren) cu harta de zonare actualizată și cu studiul geotehnic definitiv; (2) rularea finală a modelului de element finit cu geometria exactă din planurile de arhitectură (poziția reală a golurilor, grosimile definitive) pentru reconfirmarea marginală a eforturilor din §PTh-R.3; (3) confirmarea sistemului de hidroizolație și a soluției de epuizment cu antreprenorul de execuție și cu studiul geotehnic definitiv, pe baza nivelului hidrostatic măsurat efectiv la data excavației.

Documentația necesită verificare tehnică de către verificatori de proiecte atestați MDLPA pentru cerința esențială **A** — exigența **A1** (rezistență mecanică și stabilitate, structuri de beton armat) și, pentru infrastructură, **Af** (geotehnică), conform Legii 10/1995 și HG 925/1995, cu coordonare cu verificatorul **Cc** (siguranța la foc) pentru confirmarea finală a rezistenței la foc a elementelor structurale definitive.

---

## Cadru normativ complet — referințe suplimentare (peste cele enunțate în DTAC)

- **CR 2-1-1.1/2013** — Cod de proiectare a pereților structurali de beton armat;
- **SR EN 1992-1-1**, cap. 6-8-11 — verificări detaliate SLU/SLS și dispoziții constructive (utilizat suplimentar la §PTh-R.4, §PTh-R.6, §PTh-R.9);
- **SR EN 12390** (părțile 1, 2, 3) — încercarea betonului întărit (probe, formă/dimensiuni, rezistență la compresiune);
- **SR EN 12350** (părțile 2, 7) — încercarea betonului proaspăt (tasare, conținut de aer);
- **SR EN 12504-1** — carote — prelevare, examinare și încercare la compresiune;
- **SR EN 12504-2** — încercări nedistructive — determinarea indicelui de recul;
- **SR EN 12504-4** — determinarea vitezei de propagare a impulsului ultrasonic;
- **SR EN ISO 6892-1** — încercarea la tracțiune a materialelor metalice (oțel-beton);
- **SR EN 13670** — execuția structurilor de beton;
- **C 56/2002** — normativ pentru verificarea calității lucrărilor de construcții;
- **C 16-1984** — normativ pentru realizarea pe timp friguros a lucrărilor de construcții;
- **P130/1999** — normativ privind urmărirea comportării în timp a construcțiilor;
- **HG nr. 862/2016** — norme tehnice privind protecția civilă (adăposturi ALA), aplicabile local la subsolul clădirii.

---

*Prezentul supliment de fază PTh-Rezistență completează faza DTAC (`structura.md`) și se citește împreună cu planurile de cofraj și armare detaliate (radier, pereți, stâlpi, grinzi, planșee, scări, buiandrugi de cuplare), extrasele de armătură pe poziții și Caietul de sarcini pentru lucrări de beton armat (document distinct). Toate valorile numerice sunt exemple de dimensionare pentru blocul de locuințe S+P+8E de referință (24×16m, 40 apartamente, ~112 locuitori) și se confirmă/ajustează în urma rulării finale a modelului de element finit pe geometria reală a proiectului, a studiului geotehnic definitiv al amplasamentului și a soluțiilor de execuție alese efectiv de antreprenor (sistem de hidroizolație, metodă de epuizment, sistem de cofrare).*

*Întocmit: inginer structurist, membru AICPS. Verificat: verificator atestat MDLPA cerința A1/Af.*
