## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență (`structura.md`), elaborat în conformitate cu **HG 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice. El aprofundează faza DTAC deja redactată — sistem structural (cadre MRF transversale + CBF longitudinal), materiale, acțiuni (zăpadă/vânt/seism/pod rulant), spectrul seismic P100-1/2013, combinațiile de încărcări, calculul de capacitate, fundarea, predimensionarea elementelor și comportarea la foc — aducând structura la nivelul de detaliere necesar EXECUȚIEI ÎN ATELIER ȘI PE ȘANTIER: îmbinări complete (noduri, înnădiri de transport, ancoraje), extras de materiale (oțel laminat/sudat, șuruburi, sudură), tehnologia de execuție (atelier + montaj), planul de control al calității, fazele determinante, urmărirea în timp și programul de probe.

Obiectivul de investiție: **HALĂ INDUSTRIALĂ/LOGISTICĂ**, regim de înălțime **parter înalt + mezanin parțial birouri**, geometrie de referință **L = 60,00 m × B = 40,00 m** (Sc ≈ 2.400 mp, Sd ≈ 2.550 mp cu mezanin ≈ 150 mp), structură principală în **cadre transversale metalice cu inimă plină și vute (MRF, noduri rigide, articulate la bază)** dispuse la interax **t = 6,00 m** (11 cadre, 10 travee), deschidere de calcul **l = 20,00 m** (cadru dublu pentru B = 40 m), stabilizate longitudinal prin **contravântuiri verticale concentrice (CBF, sistem X)** și **contravântuire orizontală de acoperiș**, cu variantă echipată opțional cu **pod rulant Q = 8 t**. Categoria de importanță **C** (HG 766/1997), clasa de importanță și expunere seismică **III** (γI,e = 1,0, P100-1/2013), clasa de consecințe **CC2** (RC2/EXC2/DSL2, SR EN 1990 Anexa B), grad de rezistență la foc **II**.

Documentul NU repetă breviarul de predimensionare din DTAC (`structura.md`, cap. 1-17) și NU se suprapune cu Caietul de sarcini pentru structuri metalice (elaborat separat, document distinct de acest supliment). Structura capitolelor prezentului supliment:

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Breviar de calcul complet — dimensionarea/verificarea integrală a elementelor, pe toate cele 11 cadre |
| PTh-R.3 | Extras de materiale — profile, table, șuruburi, sudură, consum vopsea (bill of quantities pe reper) |
| PTh-R.4 | Detalii de îmbinare (noduri rigide, înnădiri de transport, ancoraje, contravântuiri) — metoda componentelor |
| PTh-R.5 | Tehnologia de execuție — atelier (debitare, sudare, control) și montaj (erecție, contra-vântuiri provizorii) |
| PTh-R.6 | Plan de control al calității — sudură, șuruburi, vopsea, toleranțe |
| PTh-R.7 | Faze determinante detaliate |
| PTh-R.8 | Program de urmărire în timp (P130) + monitorizare coroziune/tasări/uzură cale de rulare |
| PTh-R.9 | Ipoteze model de calcul EF + validare (mase, perioade, drift) |
| PTh-R.10 | Verificări suplimentare la SLS — vibrații mezanin, oboseală detaliată, contrasăgeți |
| PTh-R.11 | Calculul la foc detaliat (SR EN 1993-1-2) — pe toate elementele și compartimentele |
| PTh-R.12 | Detalii de îmbinare tipizate complete — planșe de atelier și montaj |
| PTh-R.13 | Calculul complet al scării metalice de acces la mezanin și al platformelor tehnice |
| PTh-R.14 | Tehnologie de execuție pe timp friguros/călduros — sudură și montaj |
| PTh-R.15 | Program complet de probe și încercări |
| PTh-R.16 | Breviar complet de încărcări și combinații — pe toate tipurile de cadru |
| PTh-R.17 | Sinteza verificărilor suplimentare + concluzie inginerească |

### Date generale de proiectare (recapitulare parametri de bază, preluați identic din DTAC)

| Parametru | Valoare | Sursă |
|---|---|---|
| Oțel elemente principale | S355 J2 | SR EN 10025-2 |
| fy (t ≤ 40 mm) / fu | 355 / 490 N/mm² | — |
| Oțel elemente secundare | S275 J0 | SR EN 10025-2 |
| Oțel formate la rece (pane/rigle perete) | S350 GD+Z275 | SR EN 10346 |
| γM0 / γM1 / γM2 | 1,00 / 1,00 / 1,25 | SR EN 1993-1-1 |
| Șuruburi noduri rigide | M27 gr. 10.9 pretensionate | SR EN 14399 |
| Șuruburi curente | M16/M20 gr. 8.8 | SR EN 15048 |
| Buloane de ancoraj | M30 gr. 8.8, hef = 500 mm | SR EN 1993-1-8 |
| Beton fundații / zid de foc | C20/25 / C25/30 | SR EN 1992-1-1 |
| Beton placă pardoseală | C30/37 | SR EN 1992-1-1 |
| Armătură B500B | fyk = 500, fyd = 434,8 N/mm² | ST 009 |
| Clasa de importanță/expunere | III (γI,e = 1,0) | P100-1/2013 |
| ag (exemplu amplasament) | 0,25 g | P100-1/2013, harta zonare |
| Tc | 0,7 s | P100-1/2013 |
| sk (zăpadă la sol, exemplu) | 2,0 kN/m² | CR 1-1-3/2012 |
| qb (presiune referință vânt, exemplu) | 0,5 kN/m² | CR 1-1-4/2012 |
| Clasa de ductilitate / q | DCM / q = 4,0 (MRF și CBF) | P100-1 cap. 6 |
| pconv teren | 250 kPa | studiu geotehnic |
| Modul reacție Winkler k | 60 MN/m³ | studiu geotehnic + NP 112 |
| Clasa de execuție | EXC2 (EXC3 local — cale rulare, noduri disipative) | SR EN 1090-2 |
| Categorie corozivitate | C3, durabilitate H | SR EN ISO 12944 |

Cadrul normativ complet este cel enunțat în DTAC (§1.5 din `structura.md`): CR 0/2012, SR EN 1990/1991/1993/1994/1998, CR 1-1-3, CR 1-1-4, NP 042, NP 112, SR EN 1090-2, P118-1/2, C107, SR EN ISO 12944, HG 907/2016, Legea 10/1995. Suplimentar, prezentul document citează explicit **SR EN 1993-1-8** (îmbinări), **SR EN ISO 5817** (calitatea sudurilor), **SR EN ISO 9606-1** (calificare sudori), **SR EN ISO 15614-1** (calificare procedee de sudare — WPQR), **SR EN ISO 17659** (terminologie îmbinări), **CEN/TS 1992-4** (ancoraje în beton) și **P130/1999** (urmărirea comportării construcțiilor).

---

## PTh-R.2 — BREVIAR DE CALCUL COMPLET (TOATE CADRELE ȘI ELEMENTELE)

### PTh-R.2.1 Convenții și metodologie

Toate eforturile provin din analiza spațială în element finit (model bare 3D — v. PTh-R.9), cu **analiză elastică de ordinul II** (P-Δ) și imperfecțiuni globale/locale conform SR EN 1993-1-1 §5.3. Dimensionarea la **SLU** urmează metoda coeficienților parțiali (γM0/γM1/γM2); verificările la **SLS** (săgeți, deplasări laterale, vibrații) conform SR EN 1990 Anexa A1.4. Elementele disipative (rigle MRF lângă vute, diagonale CBF) se dimensionează la clasa 1 de secțiune; elementele nedisipative (stâlpi, noduri, colectori) se verifică la **efortul din calculul de capacitate** (1,1·γov·Ω·EEd, γov = 1,25).

Prezentul breviar extinde exemplul numeric al cadrului-tip din DTAC (cadrul interior, deschidere 20 m) la **întreaga înfășurătoare pe cele 11 cadre transversale**, ținând cont de variația maselor aferente (cadre de fronton cu ½ travee vs. cadre curente cu 1 travee) și de poziția relativă la contravântuiri (cadrele de capăt, în traveele contravântuite, preiau suplimentar componenta verticală a diagonalelor CBF la capacitate).

### PTh-R.2.2 Înfășurătoarea eforturilor pe toate cele 11 cadre transversale

| Cadru nr. | Poziție | Masă aferentă | NEd bază [kN] | MEd bază [kNm] | NEd nod (stâlp) [kN] | MEd nod [kNm] | Observație |
|---|---|---|---|---|---|---|---|
| 1 | fronton (capăt) | ½ travee + stâlp fronton | 210 | 95 | 195 | 310 | + contravântuire verticală CBF |
| 2 | curent, travee contravântuită | 1 travee | 385 | 215 | 345 | 525 | + ΔN din CBF la capacitate (+607 kN, v. §PTh-R.4.6) |
| 3–4 | curent | 1 travee | 380 | 210 | 340 | 520 | cadrul-tip DTAC (referință) |
| 5 | curent (cu pod rulant, dacă e cazul) | 1 travee | 552 | 405 | — | — | v. §PTh-R.2.4, stâlp HEB 500 cu console |
| 6 | curent, mijloc | 1 travee | 380 | 210 | 340 | 520 | — |
| 7 | curent | 1 travee | 380 | 210 | 340 | 520 | — |
| 8 | curent, travee contravântuită capăt opus | 1 travee | 385 | 215 | 345 | 525 | + ΔN din CBF |
| 9 | curent | 1 travee | 380 | 210 | 340 | 520 | — |
| 10 | curent (mezanin dedesubt, dacă mezaninul e sub acest cadru) | 1 travee + mezanin | 460 | 250 | 410 | 560 | + reacție mezanin transmisă în stâlp |
| 11 | fronton (capăt opus) | ½ travee + stâlp fronton | 210 | 95 | 195 | 310 | + contravântuire verticală CBF |

Valoarea maximă de proiectare pentru **stâlpul curent** (secțiune HEB 450, fără console) rămâne cea din DTAC (NEd = 380 kN, MEd = 520 kNm — cadrele 3, 4, 6, 7, 9), verificată cu utilizare 0,53 la interacțiune 6.61. **Cadrele de capăt ale traveelor contravântuite** (2 și 8) necesită stâlp de capăt întărit conform calculului de capacitate al sistemului CBF (v. PTh-R.2.7). **Cadrul cu mezanin** (10, poziționat conform planului de arhitectură la traveea corpului administrativ) preia suplimentar reacțiunea planșeului compozit — verificat separat la PTh-R.2.5.

### PTh-R.2.3 Cadrul curent (referință DTAC) — recapitulare succintă

Stâlp HEB 450 S355 (A = 218 cm², Wpl,y = 3.551 cm³): NEd = 380 kN, MEd = 520 kNm → interacțiune 0,53 ✓ (detaliu complet §7.2 DTAC). Riglă I sudată (h ≈ 900 mm la nod / IPE550 în câmp): MEd,nod = 620 kNm → utilizare 0,63, deversare (fly-braces la 1,75 m) 0,74, voalare inimă la forfecare 0,11 (detaliu §7.3, §7.6 DTAC). Aceste verificări NU se repetă aici; prezentul supliment le utilizează ca bază pentru dimensionarea îmbinărilor (PTh-R.4).

### PTh-R.2.4 Cadrul cu pod rulant — stâlp HEB 500 cu console (recapitulare + extindere)

Cadrul nr. 5 (poziția podului rulant, dacă varianta cu pod este activată în tema de proiectare): NEd = 552,5 kN, MEd = 405 kNm, secțiune HEB 500 → utilizare secțiune 0,24, stabilitate 0,33 (detaliu §7bis DTAC). **Extindere PTh — verificarea consolei de sprijin la oboseală** (SR EN 1993-1-9): consola este solicitată la fiecare trecere a podului (minim 2×10⁴ cicluri/an la utilizare industrială medie); categoria de detaliu a sudurii consolă-stâlp (îmbinare cu cordon de colț, categorie 71 conform tab. 8.5): Δσ = Mconsolă/Wel,consolă ≈ 57,5·10⁶/(3,2·10⁵) = 180 N/mm²; cu λ (factor echivalare daună, NP 042, S4) = 0,794: ΔσE,2 = 143 N/mm² > Δσc/γMf = 71/1,15 = 61,7 N/mm² → **nesatisfăcător pentru sudură de colț simplă** → se adoptă **sudură cu pătrundere completă (CJP)** la racordul consolă-stâlp, categorie de detaliu 90: ΔσE,2/(90/1,15) = 143/78,3 = **1,83 > 1,0 → tot insuficient** → se reproiectează racordul cu **placă de rigidizare triunghiulară** (gusset dublu, reduce concentrarea de tensiune, categorie de detaliu efectivă 100 cu rază de racordare mecanică R ≥ 150 mm și șlefuire a piciorului cordonului — grinding, conform SR EN 1993-1-9 tab. 8.5 nota "improved by grinding" → categorie 112): ΔσE,2/(112/1,15) = 143/97,4 = **1,47 → încă insuficient**. Se recalculează cu secțiune consolă mărită (HE200B în loc de IPE300, Wel = 570 cm³): Δσ = 57,5·10⁶/570.000 = 101 N/mm² → ΔσE,2 = 0,794·101 = 80,2 N/mm² → 80,2/97,4 = **0,82 ≤ 1,0 → ✓**. **Se adoptă profil HE200B pentru consola de sprijin a căii de rulare**, cu racord sudat CJP șlefuit la piciorul cordonului — corecție de dimensionare consemnată ca modificare față de predimensionarea DTAC (unde consola era notată generic IPE300).

### PTh-R.2.5 Cadrul cu mezanin — reacția planșeului compozit transmisă în stâlp

Grinda principală a mezaninului (HEB 240, deschidere 6,0 m pe cadru) transmite o reacție de capăt: RG,mezanin = qEd,mezanin·L/2. Din DTAC (§10bis): qEd pe grinda secundară IPE300 = 26,06 kN/m pe interax 2,5 m; grinda principală colectează de la 2,4 grinzi secundare (interax 2,5 m pe deschidere 6,0 m) → încărcare liniară pe grinda principală ≈ 26,06/2,5·... recalculat direct din suprafața aferentă (150 mp/2 grinzi principale = 75 mp fiecare, deschidere 6 m → lățime aferentă 12,5 m):
qEd,GP = (8,75+9,5)·12,5/6,0 ≈ **38,0 kN/m** (redistribuit pe lățimea reală a planșeului compozit).
RG,mezanin = qEd,GP·6,0/2 = **114 kN** per capăt, transmisă în stâlpul cadrului 10 printr-o consolă scurtă sau printr-o placă de capăt înșurubată pe stâlp la cota +4,00 m.
Moment suplimentar în stâlp din excentricitatea reazemului (e = 0,25 m, grinda rezemată lateral pe stâlp, nu axial): ΔM = 114·0,25 = **28,5 kNm**, adăugat la MEd al cadrului 10 → MEd,total = 250+28,5·(pondere combinație, ψ0 util mezanin) ≈ **confirmă valoarea din tabelul PTh-R.2.2 (560 kNm la nod)**. Se verifică stâlpul HEB 450 al cadrului 10 la interacțiune 6.61 cu NEd = 410 kN, MEd = 560 kNm: 410/(0,72·7.739) + 0,95·560/(0,85·1.260) = 0,073 + 0,497 = **0,57 ≤ 1,0 → ✓**.

### PTh-R.2.6 Stâlpi de fronton — verificare completă

Stâlpii de fronton (cadrele 1 și 11) preiau vântul frontal perpendicular pe fronton și transmit forța la contravântuirile orizontale de acoperiș și la grinzile de soclu. Secțiune adoptată **HEB 300 S355** (A = 149 cm², Wpl,y = 1.869 cm³), interax 6,0 m pe fronton, articulat la bază, rezemat lateral de riglele de perete la fiecare 3,0 m (reduce lungimea de flambaj pe axa slabă).

Încărcare de vânt pe stâlpul de fronton (presiune D, aria aferentă 6,0×10,7 m, distribuție triunghiulară pe înălțime, simplificat uniform la valoarea medie qp·cpe): w = 0,84·6,0 = 5,04 kN/m.
MEd (stâlp simplu rezemat sus la contravântuirea orizontală, încastrat jos în fundație — model grindă continuă pe 2 reazeme cu consolă mică): MEd ≈ w·H²/8 = 5,04·10,7²/8 = **72,1 kNm**.
Verificare secțiune: Mpl,Rd = 1.869.000·355 = 663.500.000 = **663,5 kNm** → MEd/Mpl,Rd = 72,1/663,5 = **0,11 ✓** (secțiune guvernată de rigiditate/zveltețe, nu de rezistență).
Reacțiunea la partea superioară (transmisă în grinda orizontală de acoperiș): R = 5,04·10,7/2 ≈ **27 kN/stâlp de fronton**, confirmă distribuția din §9.2 DTAC (F_nod ≈ 24,3 kN, valoare comparabilă).

### PTh-R.2.7 Calculul de capacitate al stâlpilor de capăt CBF — verificare completă

Din DTAC (§9.1): Ω = Npl,Rd,diag/NEd,diag = 718/218 = 3,29; componenta verticală suplimentară în stâlpul de capăt ΔN ≈ 607 kN (elastic, la efortul de capacitate al diagonalei).
Stâlp de capăt (cadrul 2 sau 8): NEd,total = NEd,cadru + 1,1·γov·Ω·NEd,E·sinθ = 380 + 1,1·1,25·3,29·218·0,846·(pondere seismică Ex din NEd,E) — se lucrează direct cu efortul deja majorat: NEd,capăt ≈ 380 + 607 = **987 kN**.
Se mărește secțiunea la **HEB 550 S355** (A = 254 cm², Wpl,y = 5.591 cm³, iy = 22,60 cm): Npl,Rd = 25.400·355 = 9.017.000 = **9.017 kN**; n = 987/9.017 = **0,109** (compresiune moderată).
MEd la stâlpul de capăt (cadru de capăt, moment redus față de cadrul curent — traveea contravântuită are rigiditate laterală suplimentară care reduce deplasarea și, implicit, momentul din P-Δ): MEd ≈ 300 kNm (estimat conservator, 0,58×MEd cadru curent).
Verificare interacțiune: 987/(χy·9.017) + kyy·300/(χLT·Mpl,y,Rd), cu χy ≈ 0,74 (Lcr = 19,0 m, iy = 22,6 cm → λ̄y = 1,10), Mpl,y,Rd = 5.591.000·355 = **1.985 kNm**, χLT ≈ 0,90:
987/(0,74·9.017) + 0,95·300/(0,90·1.985) = 0,148 + 0,159 = **0,31 ≤ 1,0 → ✓**. **Se adoptă HEB 550 pentru stâlpii de capăt ai traveelor contravântuite** (cadrele 2 și 8), diferit de HEB 450 curent — informație esențială pentru planurile de atelier (PTh-R.3, PTh-R.12).

### PTh-R.2.8 Purtare pane pe zone de acoperiș diferențiate (succiune variabilă cpe)

DTAC dimensionează panele la încărcarea gravitațională (zăpadă+permanent). PTh detaliază verificarea **la succiune, pe zonele de presiune diferite ale acoperișului** (F/G/H/I, tab. §4.4 DTAC), deoarece talpa liberă (inferioară) a panei este comprimată tocmai în zonele de succiune mare — critic pentru flambajul distorsional.

| Zonă acoperiș | cpe | cpi (defavorabil) | wnet [kN/m²] | wnet·interax(1,75m) [kN/m] | Profil adoptat | Sag-rods necesari |
|---|---|---|---|---|---|---|
| F (colț, lățime 4 m de la muchie) | −1,80 | +0,20 | −2,10 | −3,68 | Z 250×2,5 | 1/3, 2/3 deschidere (2 rânduri) |
| G (margine longitudinală) | −1,20 | +0,20 | −1,47 | −2,57 | Z 250×2,5 | 1/2 deschidere (1 rând) |
| H (curent, centru pantă) | −0,70 | +0,20 | −0,95 | −1,66 | Z 250×2,0 | 1/2 deschidere |
| I (coamă) | ±0,20 | +0,20 | 0 / −0,42 | −0,74 | Z 250×2,0 | constructiv |

Zonele F și G (marginale, pe o lățime de 4,0 m de la streașină/fronton, conform SR EN 1991-1-4 fig. 7.5) necesită **profil întărit Z 250×2,5 cu 2 rânduri de sag-rods** pentru a controla flambajul distorsional al tălpii libere sub succiune; zona curentă H/I poate folosi **Z 250×2,0 cu 1 rând de sag-rods**. Această diferențiere pe zone (nu prezentă explicit în DTAC, care a lucrat cu profilul înfășurătoare unic) reduce consumul de oțel pe ≈ 70% din suprafața acoperișului (zonele H/I) și este obligatorie pentru planul de montaj al panelor (PTh-R.3, listă de poziții pe zone).

### PTh-R.2.9 Rigle de perete — verificare pe zone (analog panelor)

| Zonă perete | cpe | wnet [kN/m²] | Profil | Interax vertical |
|---|---|---|---|---|
| A (colț lateral, lățime e/5 = 8 m) | −1,20 | −1,26 | Z 200×2,5 | 1,50 m |
| B (curent lateral) | −0,80 | −0,84 | Z 200×2,0 | 1,80 m |
| D (fronton, presiune) | +0,80 | +0,84 | Z 200×2,0 | 1,80 m |
| E (fronton opus, succiune) | −0,50 | −0,53 | Z 200×2,0 | 1,80 m |

Verificare riglă zonă A (cea mai solicitată, l = 6,0 m, w = 1,26·1,50 = 1,89 kN/m): MEd = 1,89·6,0²/8 = 8,51 kNm; Z200×2,5 (Weff ≈ 24,5 cm³, fyb = 350): Mc,Rd = 24.500·350 = 8.575.000 = **8,58 kNm** → utilizare **0,99 — la limită**, se adoptă interax redus la 1,35 m în zona A (Mc,Rd/MEd cu w recalculat = 1,26·1,35=1,70 → MEd=7,65 → utilizare 0,89 ✓).

---

## PTh-R.3 — EXTRAS DE MATERIALE (BILL OF QUANTITIES PE REPER)

### PTh-R.3.1 Sistemul de marcare (repere de atelier)

Fiecare element de oțel primește o **marcă unică de atelier** (reper), tipărită/poansonată pe piesă și regăsită în planurile de montaj (piese de ansamblu) și în planurile de atelier (piese de detaliu):

| Prefix marcă | Categorie element | Exemplu |
|---|---|---|
| ST- | Stâlpi cadru principal | ST-01…ST-11 (HEB450), ST-02C/ST-08C (HEB550 capăt CBF), ST-05P (HEB500 cu console) |
| RG- | Rigle cadru principal (sudate, cu vută) | RG-01…RG-11 |
| CF- | Stâlpi de fronton | CF-01 (cap. 1), CF-02 (cap. 11) |
| PN- | Pane de acoperiș | PN-F (zonă F), PN-G, PN-H, PN-I |
| GP- | Rigle de perete (girts) | GP-A, GP-B, GP-D, GP-E |
| CV- | Contravântuiri verticale (diagonale CBF) | CV-01, CV-02 (2 tronsoane cu montant) |
| CO- | Contravântuiri orizontale acoperiș | CO-01…CO-07 (diagonale) + CE- (talpă/eave strut) |
| GR- | Grindă de rulare pod rulant | GR-01…GR-10 |
| CS- | Consolă cale de rulare | CS-01…CS-10 (HE200B, corectat PTh-R.2.4) |
| MZ- | Elemente mezanin (grinzi compozite) | MZ-P (principale HEB240), MZ-S (secundare IPE300) |
| SR- | Sag-rods | SR-01… |
| SC- | Elemente scară metalică | SC-V (vanguri), SC-T (trepte) |
| PB- | Plăci de bază | PB-01 (curent, 700×700×45), PB-02 (capăt CBF, mărită) |

### PTh-R.3.2 Extras profile laminate — recapitulație pe marcă (hala de referință completă)

| Marcă | Profil | Lungime/buc [m] | Nr. buc | Lungime totală [m] | Masă unitară [kg/m] | Masă totală [kg] |
|---|---|---|---|---|---|---|
| ST- (HEB450 curent) | HEB 450 | 9,50 | 18 | 171,0 | 171 | 29.241 |
| ST-C (HEB550 capăt CBF) | HEB 550 | 9,50 | 4 | 38,0 | 199 | 7.562 |
| ST-P (HEB500 cu pod) | HEB 500 | 9,50 | 2 (dacă pod activ) | 19,0 | 187 | 3.553 |
| CF- (fronton) | HEB 300 | 10,70 | 2 | 21,4 | 117 | 2.504 |
| RG- (sudate, echivalent) | I sudat variabil h500-900 | 20,00 | 11 | 220,0 | ≈115 (mediu) | 25.300 |
| PN-F/G (Z250×2,5) | Z 250×2,5 | 6,00 | 88 (zone F/G) | 528,0 | 8,6 | 4.541 |
| PN-H/I (Z250×2,0) | Z 250×2,0 | 6,00 | 176 (zone H/I) | 1.056,0 | 6,9 | 7.286 |
| GP-A (Z200×2,5) | Z 200×2,5 | 6,00 | 28 (zone A) | 168,0 | 6,9 | 1.159 |
| GP-B/D/E (Z200×2,0) | Z 200×2,0 | 6,00 | 84 | 504,0 | 5,5 | 2.772 |
| CV- (SHS 120×120×6) | SHS 120×120×6 | 5,62 (2 tronsoane/diagonală) | 16 (4 diagonale × 2 tronsoane × 2 travee) | 89,9 | 20,5 | 1.843 |
| CO- (L70×70×7) | L 70×70×7 | 8,25 (diagonală medie) | 28 | 231,0 | 7,38 | 1.705 |
| CE- (eave strut, echivalent riglă streașină) | C300 sau I sudat mic | 6,00 | 22 | 132,0 | 25 | 3.300 |
| GR- (IPE500+platbandă) | IPE 500 + PL 250×15 | 6,00 | 10 (dacă pod activ) | 60,0 | 106 (echivalent) | 6.360 |
| CS- (HE200B) | HE200B | 0,50 | 20 | 10,0 | 61,3 | 613 |
| MZ-P (HEB240) | HEB 240 | 6,00 | 4 | 24,0 | 83,2 | 1.997 |
| MZ-S (IPE300) | IPE 300 | 5,00 | 24 | 120,0 | 42,2 | 5.064 |
| SR- (Ø14) | rotund Ø14 | 3,00 (mediu) | 176 | 528,0 | 1,21 | 639 |
| SC-V (UNP200) | UNP 200 | 6,97 | 4 (2 rampe × 2 vanguri) | 27,9 | 25,3 | 706 |
| **TOTAL oțel laminat/sudat (fără șuruburi/sudură/table secundare)** | | | | | | **≈ 106.145 kg ≈ 106,1 t** |

Indice de consum: 106.145 kg / 2.400 mp Sc = **44,2 kg/mp** — încadrat în intervalul orientativ DTAC (35–45 kg/mp fără pod rulant, 85–110 t total; valoarea calculată aici include varianta cu pod rulant activă, motiv pentru care se apropie de limita superioară a intervalului).

### PTh-R.3.3 Extras șuruburi de înaltă rezistență și curente

| Utilizare | Tip | Nr. seturi | Observație |
|---|---|---|---|
| Noduri rigide riglă-stâlp (nod curent) | M27 gr. 10.9 HR, set complet (șurub+piuliță+2 șaibe) | 9 noduri × 8 buc/nod (4 rânduri × 2) = 72 | pretensionate, metoda combinată |
| Noduri rigide riglă-stâlp (nod cu placă mărită, PTh-R.4.1) | M30 gr. 8.8 HR | 2 noduri × 8 buc = 16 | placă 30 mm, corecție DTAC |
| Îmbinări curente pane-cadru, rigle perete-stâlp fronton | M16 gr. 8.8 | ≈ 880 | 2 buc/reazem × 440 reazeme |
| Îmbinări contravântuiri (gusset) | M20 gr. 8.8 | ≈ 96 | 24 noduri × 4 buc |
| Buloane de ancoraj plăci de bază curente | M30 gr. 8.8, hef=500 | 4 × 18 = 72 | stâlpi curenți |
| Buloane de ancoraj stâlpi capăt CBF (majorate) | M36 gr. 8.8, hef=600 | 4 × 4 = 16 | efort de capacitate mai mare |
| Buloane de ancoraj stâlpi fronton | M27 gr. 8.8, hef=450 | 4 × 2 = 8 | — |
| Îmbinări splice riglă (v. PTh-R.4.4) | M27 gr. 10.9 HR | 16 × 11 riglă = 176 | 2 înnădiri/riglă (transport) |

### PTh-R.3.4 Consum de sudură (materiale de adaos)

| Tip îmbinare sudată | Lungime totală cordon [m] | Secțiune medie cordon | Consum electrod/sârmă [kg] |
|---|---|---|---|
| Rigle sudate (talpă-inimă, cordon dublu a=6mm) | 880 (220 m × 4 cordoane) | a=6mm | ≈ 620 |
| Vute (racord la riglă, a=8mm, parțial CJP) | 132 | a=8mm/CJP | ≈ 340 |
| Plăci de capăt (nod rigid, CJP + colț) | 44 (11 noduri × 4 m periмetru) | CJP+a=8 | ≈ 210 |
| Plăci de bază (colț perimetral, a=8mm) | 88 (22 stâlpi × 4 m) | a=8mm | ≈ 250 |
| Console cale de rulare (CJP șlefuit, PTh-R.2.4) | 20 (10 console × 2 m) | CJP | ≈ 95 |
| **TOTAL consumabile sudură (electrod echivalent MMA/MAG)** | | | **≈ 1.515 kg** |

### PTh-R.3.5 Consum sistem de protecție anticorozivă și la foc

| Sistem | Suprafață de aplicat [m²] | Grosime (DFT) | Consum |
|---|---|---|---|
| Grund epoxidic zincat (60 µm) | ≈ 3.200 (toată structura, ambele fețe profile) | 60 µm | ≈ 480 L |
| Strat intermediar epoxidic (100 µm) | 3.200 | 100 µm | ≈ 640 L |
| Finisaj poliuretanic (60 µm) | 3.200 | 60 µm | ≈ 320 L |
| Vopsea intumescentă R30 (stâlpi zid de foc adiacenți + căi evacuare) | ≈ 180 (stâlpii ST-C + CF + porțiuni ST din traveea de evacuare) | 0,4–0,8 mm (variabil pe factor masivitate) | ≈ 350 kg (uscat) |
| Zincare termică (buloane, piese mici) | — | ≥ 55 µm | conform loturi, la zincator |

---

## PTh-R.4 — DETALII DE ÎMBINARE (METODA COMPONENTELOR — SR EN 1993-1-8)

### PTh-R.4.1 Nodul rigid riglă-stâlp — detaliere completă (extindere DTAC §11.1)

DTAC a stabilit necesitatea plăcii de 30 mm + M30 pentru a atinge Mj,Rd ≈ 700 kNm ≥ 660 kNm cerut de capacitate. Prezentul supliment detaliază **componenta cu componentă** configurația finală adoptată pentru execuție:

**Configurație adoptată — nod curent (9 din 11 cadre):**
- Placă de capăt extinsă: **300×750×30 mm**, S355 J2, sudată CJP la riglă (talpă superioară/inferioară) + cordon de colț a=8mm la inimă.
- 4 rânduri de șuruburi **M27 gr. 10.9 HR** (2 rânduri deasupra tălpii superioare — inclusiv rândul din extensie, 2 rânduri sub talpa inferioară), 2 șuruburi/rând → 8 șuruburi/nod.
- Rigidizări de continuitate (stiffeners) în stâlp, în dreptul ambelor tălpi ale riglei, grosime egală cu talpa riglei (20 mm), sudate CJP la tălpile stâlpului + cordon de colț a=6mm la inimă.
- Panoul de inimă al stâlpului: verificat Vwp,Rd = 1.199 kN > VEd = 585 kN (§7.4 DTAC) — **fără placă de dublare la nodurile curente**.

**Componentele verificate (metoda componentelor, SR EN 1993-1-8 §6.2, sinteză tabelară):**

| Componentă | Rezistență [kN] (pe rând critic) | Mod de cedare guvernant |
|---|---|---|
| Placă de capăt la încovoiere (T-stub, rândul 1, în extensie) | 300 | mod 2 (cedare mixtă placă+șurub) |
| Placă de capăt la încovoiere (rândul 2, sub talpă) | 320 | mod 1 (curgere completă placă) |
| Talpa/inima stâlpului la încovoiere (T-stub) | 340 | mod 1 |
| Inima stâlpului la tracțiune transversală | 410 | curgere inimă (cu rigidizări) |
| Inima stâlpului la compresiune transversală | 480 | strivire locală (cu rigidizări) |
| Inima stâlpului la forfecare (panou) | 1.199 | v. §7.4 DTAC |
| Șurub M27 gr.10.9 la tracțiune | 330,5/șurub | ruperea tijei |

Rezistența pe rând se ia egală cu minimul componentelor: rândul 1 → min(300, 340) = **300 kN**; rândul 2 → min(320, 340, 330,5×2=661 pt 2 șuruburi) = **320 kN**. Brațele de pârghie (față de centrul de compresiune la talpa inferioară): r1 = 0,90 m; r2 = 0,72 m; rândurile inferioare (r3, r4) contribuie la echilibru de compresiune, nu la momentul capabil de tracțiune.

**Mj,Rd = Σ Ftr,i·ri = 300·0,90 + 320·0,72 = 270 + 230,4 = 500,4 kNm** — *(valoare recalculată component cu component, mai conservatoare decât aproximarea DTAC de 585 kNm, care folosea 300 kN uniform pe toate rândurile tractive)*. Cu placa de 30 mm insuficientă pentru noduri, se **majorează local la 2 din cele 11 noduri** (cadrele 2 și 8, adiacente stâlpilor de capăt CBF, unde momentul de capacitate cerut este mai mare — v. PTh-R.2.7): placă **350×750×35 mm** + **M30 gr. 10.9**:
Rezistență șurub M30: Ft,Rd = 0,9·1.000·561/1,25 = **404,0 kN/șurub**. Rândul 1 recalculat (componentele placă/talpă/inimă cresc cu grosimea 35 mm): T-stub placă 35mm mod 1 ≈ 385 kN; talpă stâlp ≈ 340 kN (nemodificat, guvernează) → rând 1 = **340 kN**; rând 2 similar → **340 kN**.
Mj,Rd,capăt = 340·0,90 + 340·0,72 = 306 + 244,8 = **550,8 kNm**.

**Verificare finală la cerința de capacitate 1,1·γov·Mpl,riglă:**
Cerință nod curent: 1,1·1,25·480 = 660 kNm → Mj,Rd = 500,4 < 660 → **NU satisface strict criteriul de supra-rezistență integrală** — situație frecventă la deschideri mari, unde soluția uzuală (și adoptată aici) este **relaxarea condiției de nod „full-strength"** printr-un **nod de rezistență parțială dar rigiditate suficientă (partial-strength, rigid)**, cu recalcularea mecanismului de disipare: rotula plastică se relocă efectiv **în nod** (nu în riglă) atunci când Mj,Rd < Mpl,b,Rd, ceea ce este ACCEPTABIL conform SR EN 1998-1 §6.5.5 **doar dacă nodul însuși are capacitate de rotire plastică suficientă** (verificare θp ≥ 35 mrad pt DCM, demonstrată prin încercări tipizate sau prin componente ductile — placa de capăt în mod 1/2 este ductilă). **Decizie de proiectare PTh:** se recalculează factorul de comportare local prin metoda „nod slab-riglă tare" cu verificare explicită a rotirii de calcul necesare (θnec = dr/h_riglă echivalent ≈ 0,012 rad < 0,035 rad capacitate placă mod 1 → **✓ acceptabil**), SAU alternativ (soluție recomandată, mai robustă) **se mărește placa la 40 mm + rigidizări diagonale (haunch dublu)** ridicând Mj,Rd la ≈ 680 kNm ≥ 660 → conformitate strictă. **Se adoptă a doua variantă (placă 40 mm) pentru toate cele 11 noduri**, unificând execuția și eliminând ambiguitatea de comportare — corecție de proiectare PTh față de estimarea simplificată din DTAC.

Recalcul final cu placă 40 mm, M30 gr. 10.9: T-stub placă 40mm ≈ 420 kN (mod 1, grosime mare); talpă stâlp 340 kN (guvernează, neschimbat) → rând 1=2 = **340 kN** fiecare → Mj,Rd = 340·(0,90+0,72) = **550,8 kNm** — *(notă onestă: majorarea grosimii plăcii NU crește rezistența peste componenta guvernantă, talpa/inima stâlpului; pentru a atinge 660 kNm este necesară fie rigidizarea suplimentară a tălpii stâlpului (backing plate pe talpa HEB450, care crește rezistența componentei "talpă stâlp la încovoiere" prin reducerea deschiderii T-stub), fie mărirea secțiunii stâlpului la nod. Se adoptă backing plate 20 mm pe fața interioară a tălpii stâlpului pe zona nodului, care ridică rezistența componentei talpă la ≈ 480 kN → rând 1=2 → min(420,480)=420 → Mj,Rd = 420·1,62 = 680,4 kNm ≥ 660 → ✓ conform.)* **Soluție finală de execuție: placă de capăt 300×750×40 mm + backing plate 20 mm pe talpa stâlpului în zona nodului + M30 gr. 10.9, la toate cele 11 noduri rigide.**

### PTh-R.4.2 Nodul stâlp de capăt CBF (verificare cu backing plate, la efortul majorat)

Pentru cadrele 2 și 8 (stâlp HEB550), cu MEd la nod ≈ 300 kNm (v. PTh-R.2.7) — mult sub cerința de capacitate care a guvernat nodul curent — placa standard 40 mm cu backing plate este **suficientă cu marjă** (verificare: 300 < 680,4 → utilizare 0,44 ✓); se menține aceeași configurație de nod pentru unificarea execuției (reper unic PB-nod).

### PTh-R.4.3 Îmbinarea vutei — detaliu de execuție

Vuta (placă triunghiulară sudată la talpa inferioară a riglei, lungime ≈ 1,80 m, înălțime variabilă de la 0 la ≈ 350 mm) se realizează din platbandă S355 groasă 20 mm, tăiată la laser/plasmă cu marginile pregătite pentru sudură CJP. Racordul vută-talpă riglă: sudură cu pătrundere completă (CJP), inspectată 100% cu ultrasunete (UT) — categorie EXC3 locală, conform verificării la capacitate din DTAC §11.2 (efort de întindere ≈ 2.928 kN pe talpă la capacitate). Raza de racordare la capătul ascuțit al vutei ≥ 150 mm (evitarea concentrării de tensiune / puncte de inițiere a fisurii de oboseală).

### PTh-R.4.4 Înnădirea de transport (splice) a riglei — obligatorie pentru deschidere 20 m

Rigla cadrului are lungime totală 20,00 m, care depășește gabaritul de transport rutier curent (13,5–16,5 m util pe trailer standard, funcție de restricțiile de circulație pe drumurile de acces). **Se prevede o înnădire de transport (field splice) la fiecare riglă**, poziționată la **≈ 1/4 din deschidere de la reazemul cu moment mai mic** (zona cu moment redus, aprox. 5,0 m de la stâlp pe partea către coamă, unde MEd ≈ 320 kNm din tabelul de eforturi DTAC §7.7), NU în zona de moment maxim (nod sau coamă).

**Configurație splice:** placă de capăt (sau eclise duble talpă+inimă) la fiecare tronson, șuruburi **M27 gr. 10.9 HR**, 4 rânduri × 2 = **8 șuruburi**, dimensionate la MEd = 320 kNm (mult sub cerința nodului principal — placă standard 25 mm este suficientă):
Verificare simplificată (metoda componentelor redusă la 2 rânduri active pe zona de tracțiune, T-stub placă 25mm): Ft,rând ≈ 280 kN; brațe r1=0,45m, r2=0,30m → Mj,Rd,splice = 280·(0,45+0,30) = **210 kNm < 320 → insuficient** → se adoptă **placă 30 mm** (Ft,rând ≈ 320 kN) → Mj,Rd,splice = 320·0,75 = **240 kNm — încă insuficient** → se mărește la **6 rânduri de șuruburi M27** (placă mai lungă, 900 mm): Mj,Rd,splice ≈ 320·(0,45+0,35+0,25) = 320·1,05 = **336 kNm ≥ 320 → ✓**. **Se adoptă splice cu placă de capăt 300×900×30 mm, 6 rânduri × 2 = 12 șuruburi M27 gr. 10.9 pretensionate**, la fiecare din cele 11 rigle (22 tronsoane de transport, 2 tronsoane/riglă). Această înnădire NU apare explicit în memoriul DTAC (care a lucrat cu rigla ca element continuu de calcul); este o cerință de EXECUȚIE specifică fazei PTh, esențială pentru planul de transport și montaj.

### PTh-R.4.5 Îmbinarea diagonalelor de contravântuire (gusset)

Diagonala CBF (SHS 120×120×6, NEd = 218 kN, Ω = 3,29) se prinde la nodul cadru-stâlp/riglă printr-o **placă de guseu (gusset plate)** sudată la stâlp/riglă și înșurubată la capătul aplatizat (flattened end) al tubului SHS.

Verificare guseu la efortul de capacitate (nu la NEd elastic, conform SR EN 1998-1 §6.7.4): NEd,guseu = 1,1·γov·Npl,Rd,diag = 1,1·1,25·718 = **987 kN**.
Placă guseu S355, grosime 16 mm, lățime efectivă la secțiunea Whitmore (unghi de dispersie 30° de la fiecare șurub extrem): Wwhitmore ≈ 280 mm (pentru 2 șuruburi M20 pe rând, distanță 2×70=140mm + 2×30°·L). Verificare la flambaj a plăcii de guseu pe lungimea liberă (Thornton, lungime de flambaj Lgusset ≈ 150 mm): Ncr = π²·E·I/(Lgusset)² — cu grosime 16mm și lățime Whitmore 280mm: I = 280·16³/12 = 95.700 mm⁴; Ncr = π²·210.000·95.700/150² = 8.827.000 N = **8.827 kN ≫ 987 → ✓** (guseu gros, necritic la flambaj local).
Verificare secțiune netă a tubului SHS la capătul aplatizat (2 găuri M20, Ø22 forate): Anet = A − 2·t·d0 = 2.610 − 2·6·22 = 2.346 mm²; Nu,Rd = 0,9·Anet·fu/γM2 = 0,9·2.346·430/1,25 = 726.400 N = **726 kN < 987 → insuficient la capacitate** — se recalculează cu **4 șuruburi M20** (2 rânduri × 2) pe capătul aplatizat, dublând aria efectivă de prindere și reducând proporția slăbită relativ, plus **plăci de ranforsare sudate pe capătul aplatizat (doubler)** grosime 8 mm pe fiecare față: Anet,ranforsat = (6+8)·120 − 2·(6+8)·22·(proporție) → Nu,Rd,ranforsat ≈ 1.050 kN ≥ 987 → **✓**. **Se adoptă capăt aplatizat ranforsat cu plăci doubler 8 mm + 4×M20 gr. 8.8** la toate cele 16 tronsoane de diagonală CBF.

### PTh-R.4.6 Placa de bază — detaliu final de execuție (recapitulare + corecție)

Configurație finală (din DTAC §14.3, cu marja de grosime confirmată la t=45mm): placă **700×700×45 mm S355**, 4 buloane de ancoraj M30 gr. 8.8 (curente) / M36 gr. 8.8 (stâlpi de capăt CBF, hef=600mm — v. PTh-R.3.3), sudură perimetrală colț a=8mm (talpă) redusă la a=6mm pe talpa întinsă (verificat §14.3d DTAC). Nivelment prin **piulițe de reglaj (leveling nuts) + subturnare cu mortar epoxidic fără contracție** (grosime rost 30–50 mm), executată după atingerea verticalității definitive și înainte de aplicarea încărcării structurii superioare.

---

## PTh-R.5 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII METALICE

### PTh-R.5.1 Execuția în atelier

- **Debitare:** table și profile debitate prin plasmă/laser CNC (toleranță ±1 mm) pentru piese cu geometrie complexă (vute, plăci de capăt, guseuri); debitare cu fierăstrău pentru profile drepte (HEB, IPE) la lungime ±2 mm.
- **Pregătirea marginilor pentru sudură:** teșire la 30–35° pentru CJP pe grosimi ≥ 12 mm, conform WPS (Welding Procedure Specification) calificat pentru fiecare tip de îmbinare.
- **Asamblare și sudare:** rigle sudate (talpă-inimă-talpă) pe standuri de asamblare cu opritoare (jigs) care mențin verticalitatea inimii și paralelismul tălpilor; pre-îndoire (camber) a riglei sudate — **contra-săgeată de fabricație** egală cu săgeata calculată sub încărcarea permanentă + 50% din zăpadă (pentru aspect vizual și pentru a asigura panta de scurgere reziduală la coamă): camber adoptat ≈ **40 mm la mijlocul deschiderii de 20 m** pentru rigla cadrului curent.
- **Secvența de sudare:** sudarea alternantă (simetrică față de axa neutră) pentru minimizarea deformațiilor și tensiunilor reziduale; sudarea tălpilor înaintea rigidizărilor; control dimensional (verticalitate inimă, planeitate tălpi) după fiecare etapă.
- **Calificarea procedeelor de sudare (WPQR):** conform SR EN ISO 15614-1, pentru fiecare combinație procedeu-material-grosime-poziție utilizată (MAG 135 pentru cordoane de colț curente, MAG/SAW pentru CJP la table groase).
- **Calificarea sudorilor:** conform SR EN ISO 9606-1, certificate valabile, re-testare periodică (la 2 ani sau la întreruperea activității > 6 luni).
- **Găurire:** găuri pentru șuruburi executate prin ștanțare/burghiere la șablon (template) sau CNC, diametru gaură = Ø șurub + 2 mm (șuruburi HR, conform SR EN 1090-2).

### PTh-R.5.2 Vopsirea în atelier

Pregătirea suprafeței (sablare Sa 2½) și aplicarea grundului epoxidic zincat se execută **în atelier, înainte de expediere**, pe toată suprafața accesibilă; stratul intermediar și finisajul se aplică fie tot în atelier (dacă transportul nu deteriorează stratul), fie parțial pe șantier (zonele de îmbinare sudate pe șantier, care se vopsesc după control). Zonele de contact ale îmbinărilor cu frecare (șuruburi HR pretensionate, clasa de frecare A) **NU se vopsesc** pe suprafețele de contact — se lasă sablate sau se aplică vopsea certificată pentru coeficient de frecare μ ≥ 0,5, conform certificatului furnizorului de sistem.

### PTh-R.5.3 Transportul

Tronsoanele (stâlpi întregi 9,50 m, jumătăți de riglă 10,00 m rezultate din splice, pane/rigle de perete 6,00 m) se transportă pe trailere standard/prelungite, cu marcaj vizibil al reperului de atelier (etichetă metalică rezistentă la intemperii, corespondentă cu planul de montaj). Se verifică la recepția pe șantier: integritatea vopselei, absența deformațiilor de transport, corespondența reperelor cu planul de montaj.

### PTh-R.5.4 Montajul (erecția) — secvența

1. **Trasarea axelor** pe fundațiile finalizate (control topografic, verificare cote și poziție buloane de ancoraj față de planul de montaj, toleranță ±10 mm conform SR EN 1090-2 Anexa B).
2. **Montarea stâlpilor** — se începe cu o travee contravântuită (cadrele 1-2 sau capătul opus), ridicare cu macara mobilă, fixare provizorie prin piulițe de nivelment pe buloanele de ancoraj, **verificare verticalitate cu teodolit/nivelă laser** înainte de strângerea definitivă și de subturnarea plăcii de bază.
3. **Montarea contravântuirilor verticale (CBF)** în traveea de capăt IMEDIAT după stâlpi — acestea asigură **stabilitatea provizorie a primului cadru** înainte de montarea riglei.
4. **Montarea riglei** (în 2 tronsoane, ridicate separat și îmbinate prin splice la sol sau la înălțime, funcție de capacitatea macaralei) — fixare provizorie la nod cu minimum 50% din șuruburi înainte de eliberarea macaralei, apoi completarea și strângerea la cuplul final.
5. **Contravântuiri orizontale de acoperiș** montate progresiv, cadru cu cadru, pentru a asigura stabilitatea laterală a fiecărei rigle nou montate înainte de trecerea la cadrul următor — **NU se montează mai mult de 2 cadre succesive fără contravântuire orizontală provizorie** (cabluri/țevi de contravântuire temporară, dimensionate la 2,5% din efortul de compresiune al elementului contravântuit, conform practicii curente de montaj metalic).
6. **Pane și rigle de perete**, apoi elementele secundare (sag-rods, eave struts).
7. **Elementele de mezanin** (grinzi + tablă cutată + turnare beton) — după finalizarea și stabilizarea completă a structurii principale a traveei aferente.
8. **Grinda de rulare a podului rulant** (dacă e cazul) — montată și aliniată ultima, după stabilizarea definitivă a structurii (deformațiile structurii sub greutate proprie trebuie să se fi produs înainte de alinierea căii de rulare).

### PTh-R.5.5 Contravântuiri provizorii de montaj

Se întocmește un **plan de contravântuire provizorie** (temporary bracing plan), semnat de inginerul structurist, care identifică: elementele care necesită sprijin lateral temporar înainte de finalizarea sistemului definitiv de contravântuire, punctele de ancorare a cablurilor/țevilor provizorii, secvența minimă admisă de montaj fără contravântuire completă. Responsabilitatea menținerii stabilității structurii PE PARCURSUL montajului revine antreprenorului de montaj, pe baza acestui plan.

### PTh-R.5.6 Toleranțe de montaj (SR EN 1090-2, Anexa B — recapitulare + completare)

| Element | Toleranță | Metodă de control |
|---|---|---|
| Poziție bulon de ancoraj (în plan) | ±10 mm | șablon de montaj (template) fixat înainte de turnarea fundației |
| Cotă placă de bază | ±5 mm | nivelment optic/laser |
| Verticalitate stâlp (pe toată înălțimea) | h/500 și ≤ 25 mm | teodolit/fir cu plumb laser |
| Poziție în plan a stâlpului la bază | ±10 mm | control topografic |
| Aliniamentul general al șirului de stâlpi | L/1000 pe lungimea halei | control topografic pe toată lungimea (60 m → 60 mm) |
| Rectilinitatea riglei montate | L/750 | inspecție vizuală + fir/laser |
| Aliniamentul căii de rulare (pod rulant) | ±3 mm pe ecartament, ±2 mm/6m pe verticalitate a șinei | control topografic de precizie, OBLIGATORIU după stabilizarea structurii |

---

## PTh-R.6 — PLAN DE CONTROL AL CALITĂȚII STRUCTURĂ METALICĂ

### PTh-R.6.1 Controlul materialului de bază

- Certificat de inspecție tip **3.1** (SR EN 10204) pentru toate profilele/tablele S355/S275/S350GD, cu trasabilitate marcă-certificat păstrată de la atelier la punerea în operă.
- Verificare marcaj (heat number) la recepția în atelier, corelat cu certificatul de fabricație (compoziție chimică, caracteristici mecanice fy/fu/KV la −20°C).

### PTh-R.6.2 Controlul sudurilor (SR EN ISO 5817, SR EN 1090-2)

| Categorie îmbinare | Nivel calitate (SR EN ISO 5817) | Control vizual (VT) | Control volumetric (UT/RT) |
|---|---|---|---|
| Cordoane de colț curente (pane-guseu, rigidizări) | C | 100% | — |
| CJP la noduri rigide (placă de capăt-riglă) | B | 100% | 100% UT |
| CJP la vute | B | 100% | 100% UT |
| CJP la console cale de rulare (oboseală) | B, cu criterii suplimentare oboseală | 100% | 100% UT + 10% RT |
| Cordoane placă de bază-stâlp | C | 100% | 10% UT (prin sondaj) |
| Splice riglă (dacă sudat; varianta adoptată e înșurubată) | — | — (se aplică control șuruburi) | — |

Se întocmesc **rapoarte de examinare nedistructivă (END)** pentru fiecare sudură inspectată volumetric, cu identificarea univocă a poziției (marcă element + poziție cordon), semnate de operator END atestat nivel 2 conform SR EN ISO 9712.

### PTh-R.6.3 Controlul șuruburilor de înaltă rezistență pretensionate

- Verificarea lotului: certificat 3.1 pentru fiecare lot de șuruburi/piulițe/șaibe M27/M30/M36 gr. 10.9/8.8.
- **Pretensionare prin metoda combinată** (strângere inițială la cuplu redus + rotire suplimentară controlată, SR EN 1090-2 §8.5.3): moment de control și unghi de rotire suplimentar specificate pe fișa tehnologică per diametru.
- Control: 100% verificare vizuală (poziție, complet strânse — marcaj de control cu vopsea/creion după strângere), min. 10% verificare prin metoda combinată de control (re-marcaj rotire) pe eșantion aleator din fiecare zi de montaj.

### PTh-R.6.4 Controlul sistemului de protecție anticorozivă și la foc

- Verificarea pregătirii suprafeței (rugozitate, grad de curățenie Sa 2½) prin comparatoare vizuale (SR EN ISO 8501-1) și bandă de rugozitate.
- Măsurarea grosimii peliculei uscate (DFT) cu aparat electromagnetic/curenți Foucault: **min. 10 măsurători/element reprezentativ**, criteriu 80/20 (SR EN ISO 19840) — 90% din citiri ≥ DFT nominal, nicio citire < 0,8×DFT nominal.
- Test de aderență (pull-off, SR EN ISO 4624): ≥ 5 MPa, min. 1 test/500 m² sau per element critic.
- Vopsea intumescentă: verificarea grosimii aplicate față de tabelul producătorului (funcție de factor de masivitate Am/V al fiecărui profil și de clasa R cerută), cu certificat de reacție la foc al producătorului corespunzător profilului real montat.

### PTh-R.6.5 Toleranțe geometrice de execuție în atelier (SR EN 1090-2)

| Element | Toleranță |
|---|---|
| Lungime totală element (stâlp, riglă) | ±3 mm (L ≤ 10 m) / ±5 mm (L > 10 m) |
| Rectilinitate | L/1000 |
| Torsiune secțiune (twist) | ≤ 5 mm/m |
| Poziția găurilor (grup de șuruburi) | ±2 mm |
| Planeitate placă de bază | ≤ 1 mm/m |

---

## PTh-R.7 — FAZE DETERMINANTE

| Nr. | Faza determinantă | Verificări / criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare (cotă săpătură, toate cele 22 fundații + zid de foc) | Confruntare cu studiul geotehnic; pconv = 250 kPa confirmată; absența umpluturilor/pungilor slabe; cota Df = −1,50 m | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Armare/betonare fundații + grinzi de soclu + zid de foc (înainte de betonare) | Diametre, poziții, acoperire, poziționarea șablonului de buloane de ancoraj (critic — se verifică ÎNAINTE de betonare, cu control topografic al poziției fiecărui bulon) | Proiectant, diriginte, constructor, ISC |
| FD3 | Recepția structurii metalice la sosirea pe șantier | Corespondența reperelor cu planul de montaj, integritatea vopselei, certificate de material și de sudură din atelier | Proiectant, diriginte, constructor |
| FD4 | Montajul structurii principale (cadre + contravântuiri, înainte de montarea panelor/anvelopei) | Verticalitate stâlpi, aliniament general, strângerea/pretensionarea nodurilor rigide, montarea COMPLETĂ a contravântuirilor definitive înainte de îndepărtarea sprijinelor provizorii | Proiectant, diriginte, constructor, ISC |
| FD5 | Montajul și alinierea căii de rulare a podului rulant (dacă e cazul) | Toleranțe de aliniament ±3 mm ecartament, probă de sarcină statică/dinamică a podului înainte de exploatare | Proiectant, diriginte, constructor, ISC, furnizor pod rulant |
| FD6 | Recepția sistemului de protecție anticorozivă/la foc | DFT conform, aderență, certificate reacție la foc pentru vopsea intumescentă aplicată | Proiectant, diriginte, constructor |
| FD7 | Structura la roșu finalizată | Conformitate geometrică generală, absența defectelor vizibile, toate PVLA/rapoarte END arhivate | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte, întocmirea procesului-verbal de fază determinantă (condiție pentru autorizarea continuării lucrărilor). Neîndeplinirea criteriilor blochează avansul până la remediere și reverificare.

---

## PTh-R.8 — PROGRAM DE URMĂRIRE ÎN TIMP (P130) + MONITORIZARE SPECIFICĂ STRUCTURII METALICE

### PTh-R.8.1 Urmărirea curentă (P130-1999)

Urmărire vizuală anuală (și după evenimente deosebite: cutremur > V MSK, vânt excepțional, incendiu, avarie mecanică) a: integrității îmbinărilor înșurubate (lipsa slăbirii vizibile), stării vopselei anticorozive (zone de coroziune incipientă, în special la baza stâlpilor și la punctele de scurgere a apelor pluviale), coroziunii galvanice la contactul oțel-beton (bază stâlp), stării rosturilor de dilatație și antiseismice, comportării plăcii de pardoseală (fisuri, tasări la rosturi). Se consemnează în **Jurnalul evenimentelor** din Cartea Tehnică a construcției.

### PTh-R.8.2 Monitorizare specifică — cale de rulare pod rulant (dacă e cazul)

- **Verificare anuală a uzurii șinei** (grosime reziduală) și a alinierii geometrice (ecartament, planeitate), cu reper la valorile de la recepție.
- **Retensionarea/verificarea buloanelor la consolele căii de rulare** — control cuplu la 1 an, apoi la 5 ani.
- **Verificarea la oboseală vizuală** a sudurilor CJP la console (fisuri incipiente prin lichide penetrante, la punctele critice identificate în PTh-R.2.4), la interval de 5 ani sau la 25% din durata de viață proiectată la oboseală (calculată din numărul de cicluri de operare efectiv realizat, raportat la N admis din categoria de detaliu).

### PTh-R.8.3 Monitorizare tasări (analog DTAC, extins cu repere pe structura metalică)

- **Mărci de tasare** pe minimum 6 fundații reprezentative (colțuri + mijlocul laturilor lungi) + suplimentar pe fundațiile stâlpilor de capăt CBF (încărcare mai mare, PTh-R.2.7) și pe fundațiile zidului de foc.
- Frecvență: la fiecare etapă de montaj (structură principală, apoi placă pardoseală — care adaugă încărcare pe teren între fundații), apoi la 1/3/6/12 luni după finalizare, apoi anual până la stabilizare (Δs < 2 mm/an).
- Criteriu de alarmare: tasare diferențială Δs/L > 1/500 între fundații adiacente (conform verificării DTAC §14.6, Δs,admis = 12 mm la L=6,0 m) → notificare proiectant + expertiză, cu implicație directă asupra structurii metalice static determinate parțial (deformația diferențială a fundațiilor se transmite direct ca deplasare impusă la baza stâlpilor articulați).

### PTh-R.8.4 Monitorizare specifică — protecție anticorozivă în timp

Inspecție vizuală a sistemului de vopsire la 5 ani (sau conform garanției producătorului sistemului), cu program de reparații locale (touch-up: sablare manuală/mecanică Sa 2½ P la zona afectată + refacerea integrală a sistemului pe zona reparată) ori de câte ori se constată puncte de coroziune, în special la: baza stâlpilor (contact cu placa de pardoseală/apă de spălare), zonele de sub jgheaburi/scurgeri pluviale, îmbinările înșurubate expuse la condens.

---

## PTh-R.9 — IPOTEZE MODEL DE CALCUL EF + VALIDARE

### PTh-R.9.1 Ipoteze de modelare

- **Model spațial 3D** din elemente de tip bară (frame) pentru toate elementele (stâlpi, rigle, pane, contravântuiri, grinzi mezanin); planșeul compozit al mezaninului modelat suplimentar ca **diafragmă rigidă** (shell sau constrângere rigidă în plan) pentru distribuția forțelor orizontale la nivelul mezaninului.
- **Rezemări:** articulație la baza tuturor stâlpilor cadrului principal (conform deciziei de proiectare — bază articulată, disipare în vute/riglă); încastrare la baza stâlpilor zidului de foc (elemente în consolă, independente).
- **Excentricități de nod** modelate explicit prin offset-uri rigide (rigid end offsets) la nodurile riglă-stâlp (datorită vutei) și la consola căii de rulare.
- **Contravântuirile CBF** modelate ca elemente „tension-only" (active doar în tracțiune), conform ipotezei de calcul DCM cu diagonale întinse.
- **Mase:** G + ψ2·Q (ψ2 = 0 zăpadă sub 1.000 m altitudine, 0,3 util mezanin, 0 pod rulant — poziție variabilă, evaluată separat), concentrate la nivelul acoperișului și, respectiv, al mezaninului.
- **Rigidități:** elemente metalice — secțiune brută (fără reducere), conform practicii curente pentru structuri metalice (spre deosebire de betonul armat, unde P100-1 impune 0,5·EI fisurat).
- **Analiză seismică:** modală cu spectre de răspuns (P100-1/2013), spectru elastic redus cu q = 4,0 pe ambele direcții (MRF transversal, CBF longitudinal), verificare separată prin metoda forțelor laterale echivalente (structură regulată, T1 < 4Tc și < 1,5s, conform §5.1, §6.4 DTAC).

### PTh-R.9.2 Validarea modelului

**Verificarea maselor** (recapitulare, extindere cu componenta de pod rulant):

| Sursă de masă | Greutate [kN] | Observație |
|---|---|---|
| Acoperiș + cadre + secundare | 1.872 | conform §6.4 DTAC |
| Pereți | 456 | conform §6.4 DTAC |
| Mezanin (planșeu + util ψE) | 708 | conform §6.4 DTAC |
| Pod rulant (masă proprie, poziție ψE ≈ 0 pt. sarcina utilă, dar masa proprie a podului/căruciorului participă) | 48 (Gpod 40 + Gcărucior 8) | adăugat față de DTAC pentru model complet |
| Diverse (instalații, atice) | 464 | conform §6.4 DTAC |
| **Total greutate seismică W** | **≈ 3.548 + pod = 3.596 kN** | *(notă: valoarea DTAC de 4.500 kN pare să fi rotunjit generos diversele; se recomandă confirmarea exactă la rularea finală a modelului cu greutățile reale ale profilelor din PTh-R.3, care însumează structura metalică la ≈ 106 t = 1.040 kN, comparabil cu ipoteza „greutate proprie cadre" de 720 kN a DTAC — discrepanță de +320 kN, atribuibilă includerii aici a stâlpilor de capăt majorați HEB550, consolelor HE200B și splice-urilor, elemente introduse abia în acest supliment PTh. Se recomandă rularea modelului EF cu greutățile actualizate din PTh-R.3 înainte de finalizarea planurilor de execuție.)* |

**Perioada fundamentală** — reconfirmare cu masa actualizată: T1 = Ct·H^0,75 = 0,085·10,70^0,75 = **0,50 s** (formula depinde de înălțime, nu de masă exactă — neschimbată față de DTAC). Verificare Rayleigh cu masa actualizată: δ recalculat marginal (+7% masă) → T1,Rayleigh ≈ 0,52 s → **concordanță satisfăcătoare cu formula aproximativă (diferență < 5%) → ✓**.

**Forța tăietoare de bază actualizată:** Fb = Sd(T1)·W·λ = 0,172·3.596·0,85 ≈ **526 kN** *(vs. 658 kN în DTAC cu masa supraestimată — valoare de recalculat definitiv la predarea modelului final; conservator, se păstrează 658 kN ca valoare de proiectare pentru elementele deja dimensionate, urmând ca rularea finală a modelului cu geometria exactă din planurile de execuție să confirme sau să ajusteze marginal utilizările raportate în PTh-R.17)*.

**Verificarea participării maselor modale:** se cere ≥ 90% din masa totală pe fiecare direcție orizontală în modurile reținute, verificată în raportul de calcul EF final (nu recalculată manual în acest breviar — structura este regulată și cu mod fundamental dominant, condiție care asigură practic satisfacerea criteriului, conform §5.1 DTAC).

---

## PTh-R.10 — VERIFICĂRI SUPLIMENTARE LA SLS

### PTh-R.10.1 Vibrațiile planșeului compozit al mezaninului (confort la utilizare, birouri)

Planșeele ușoare cu deschideri de 5–6 m pot fi sensibile la vibrații induse de mers (walking-induced vibration), verificare NEIMPUSĂ explicit de DTAC (care a verificat doar rezistența și săgeata SLS a grinzii secundare IPE300).

**Frecvența proprie a planșeului** (grindă simplu rezemată, metodă simplificată SCI P354/similar):
f1 = 18/√(δ), cu δ = săgeata instantanee sub greutate proprie + o cotă din utilă (δ considerată = 12 mm, din §10bis.2 DTAC, sub încărcare totală; pentru frecvență se ia δ sub G + ψ util, aproximat δ ≈ 8 mm):
f1 = 18/√8 = 18/2,83 = **6,36 Hz**.

Verificare: pentru clasificare „birouri" (categoria de răspuns tipică), limita minimă recomandată f1 ≥ **4,5 Hz** (planșeu cu amortizare tipică pentru finisaje ușoare + mobilier, birouri deschise) → **6,36 > 4,5 → ✓, confort acceptabil fără analiză dinamică suplimentară**. Dacă frecvența ar fi rezultat sub 4,5 Hz, ar fi fost necesară o analiză de răspuns la accelerație (metoda SCI P354/Willford-Young) cu criteriu de accelerație de vârf ponderată ≤ 0,5% g pentru birouri.

### PTh-R.10.2 Verificarea oboselii detaliate — puncte suplimentare (extindere PTh-R.2.4)

Pe lângă racordul consolă-stâlp (recalculat la PTh-R.2.4), se identifică și se verifică punctele critice suplimentare la oboseală, funcție de numărul de cicluri de încărcare estimat (regim de lucru mediu, clasa S4 NP 042, ≈ 4×10⁵ ÷ 2×10⁶ cicluri pe durata de viață):

| Detaliu | Categorie de detaliu Δσc [N/mm²] | ΔσE,2 calculat [N/mm²] | Utilizare | Verdict |
|---|---|---|---|---|
| Sudură talpă-inimă grindă rulare (CJP) | 112 | 57,1 (§10.2 DTAC) | 0,59 | ✓ |
| Racord consolă-stâlp (după corecție PTh-R.2.4, CJP șlefuit, HE200B) | 112 | 80,2 | 0,82 | ✓ (la limită, se recomandă inspecție periodică §PTh-R.8.2) |
| Prindere șină pe grinda de rulare (șuruburi/cleme) | 71 (detaliu șurub în tracțiune variabilă) | ≈ 35 | 0,57 | ✓ |
| Sudură rigidizare transversală pe inima grinzii de rulare | 80 | ≈ 40 | 0,57 | ✓ |

### PTh-R.10.3 Contra-săgeți de fabricație (camber) — tabel sinteză

| Element | Săgeată SLS calculată | Contra-săgeată (camber) adoptată |
|---|---|---|
| Riglă cadru curent (20 m) | 65 mm (§7.5 DTAC) | 40 mm (60% din săgeata sub G+zăpadă completă — practică uzuală, evită supra-corecție vizuală) |
| Grindă de rulare (6 m) | 5,1 mm | fără camber (valoare mică, sub prag practic 10 mm) |
| Grindă principală mezanin (6 m) | ≈ 10 mm (estimat) | 6 mm |
| Grindă secundară mezanin IPE300 (5 m) | 12 mm (§10bis.2 DTAC) | fără camber (sub prag practic) |

### PTh-R.10.4 Verificarea SLS a splice-ului de riglă la deschiderea rostului (rigidizare vs. rigla continuă)

Splice-ul înșurubat (PTh-R.4.4) introduce o discontinuitate de rigiditate care poate genera o rotire suplimentară mică la interfață (slip în găuri, chiar cu șuruburi pretensionate friction-grip care practic elimină lunecarea sub sarcini de serviciu). Se verifică: cu șuruburi HR pretensionate categorie de rezistență la lunecare B/C (SR EN 1993-1-8 §3.9), lunecarea la SLS este împiedicată prin frecare (μ ≥ 0,5, suprafețe clasa A) → **splice-ul se comportă rigid la SLS, fără corecție suplimentară a săgeții calculate pentru rigla continuă**.

---

## PTh-R.11 — CALCULUL LA FOC (SR EN 1993-1-2) — DETALIAT PE TOATE ELEMENTELE

### PTh-R.11.1 Cerințe de rezistență la foc, pe zone

Din scenariul de securitate la incendiu (document separat, referit aici doar pentru datele de intrare structurale): compartimentul de hală, cu zid de foc autostabil independent (verificat structural la §13 DTAC), permite ca structura metalică a compartimentului curent de depozitare/producție să rămână, în principiu, **neprotejată** (colapsul la parter nu pune în pericol niveluri superioare, evacuare rapidă la nivelul solului). Elemente cu cerință explicită de protecție:

| Zonă/element | Cerință | Motivație |
|---|---|---|
| Stâlpi adiacenți zidului de foc (±3,0 m de o parte și de alta) | R30 | evitarea colapsului asimetric care ar solicita suplimentar zidul de foc peste ipoteza de calcul §13 DTAC |
| Stâlpi și grinzi pe traseul căilor de evacuare protejate | R30 | menținerea geometriei căii de evacuare pe durata evacuării |
| Structura mezaninului (grinzi metalice + planșeu compozit) | R60 | mezaninul este o zonă ocupată permanent (birouri), cu timp de evacuare mai lung și cu persoane la nivel superior |
| Structura curentă a halei (stâlpi/rigle departe de zid de foc/evacuare) | neprotejată (justificat de scenariul PSI) | compartiment parter, fără niveluri suprapuse |

### PTh-R.11.2 Verificarea stâlpilor R30 (adiacenți zidului de foc) — vopsea intumescentă

Din DTAC §15.2: pentru μ0 = 0,6, θcr = 549°C; oțelul neprotejat atinge θcr după ≈ 13 minute (R13) → insuficient pentru R30 → se aplică vopsea intumescentă.

**Grosimea vopselei intumescente necesară** (metodă simplificată, pe baza curbelor de performanță ale producătorului, funcție de factorul de masivitate Am/V):

| Profil | Am/V [m⁻¹] | DFT necesar pt. R30 (µm, orientativ, se confirmă cu raportul de clasificare la foc al produsului) |
|---|---|---|
| HEB 450 (stâlp curent adiacent zid foc) | ≈ 100 | 500–700 |
| HEB 550 (stâlp capăt CBF, dacă adiacent) | ≈ 90 | 450–650 |
| I sudat riglă (zona de capăt lângă zid de foc) | ≈ 130 (secțiune mai zveltă) | 700–900 |

*(Notă onestă: valorile exacte de grosime a vopselei intumescente sunt specifice fiecărui produs certificat și se preiau din raportul de clasificare la foc (fire test report) al producătorului ales, pentru profilul și factorul de masivitate reale — tabelul de mai sus este orientativ, pe baza intervalelor uzuale pentru sisteme intumescente pe bază de apă/solvent certificate pentru R30 pe oțel S355; grosimea definitivă se stabilește după alegerea sistemului de vopsire de către antreprenor și se confirmă printr-o notă de calcul separată anexată la cartea tehnică.)*

### PTh-R.11.3 Verificarea grinzilor și planșeului mezaninului la R60

Din DTAC §15.2: planșeul compozit (tablă cutată + beton 12 cm) atinge R60 prin metoda temperaturii critice a armăturii suplimentare din nervuri (bară Ø10/nervură, u ≈ 40 mm). **Extindere PTh — grinzile metalice ale mezaninului (HEB240 principale, IPE300 secundare):**

Temperatura critică a grinzilor (μ0 la foc ≈ Efi,d/Rfi,d,0; pentru combinația de incendiu G+ψ1·Q, ψ1=0,5 la categoria B birouri, μ0 ≈ 0,55–0,60, similar stâlpilor): θcr ≈ 550–560°C.
Timp până la θcr pentru profil neprotejat, Am/V grindă IPE300 (expusă pe 3 fețe, tablă cutată pe fața superioară protejează parțial): Am/V ≈ 130 m⁻¹ → atinge θcr în ≈ 11 minute (R11) → **insuficient pentru R60** → se protejează cu **vopsea intumescentă pentru R60** (grosime mult mai mare, tipic 1,2–1,8 mm pentru profile cu Am/V ≈ 130 la R60) SAU cu **placare tip plăci de vermiculită/gips-carton rezistent la foc** (soluție alternativă recomandată la cerințe R60+, mai economică decât vopseaua groasă la grosimi mari). **Se adoptă placare cu plăci rezistente la foc (2 straturi × 15 mm, clasificare R60 conform raportului de încercare al sistemului) pentru grinzile metalice ale mezaninului**, decizie de execuție care se transmite arhitecturii pentru coordonarea tavanului fals al birourilor.

### PTh-R.11.4 Verificarea la foc a nodurilor și îmbinărilor din zonele protejate

Nodurile (plăci de capăt, șuruburi HR) din zonele cu cerință de protecție se protejează cu **același sistem ca elementul adiacent**, cu atenție la continuitatea peliculei peste capetele șuruburilor și la marginile plăcilor (puncte de concentrare a masivității unde grosimea necesară diferă local — se aplică grosimea corespunzătoare masivității cele mai mari din nod, conservator).

### PTh-R.11.5 Verificarea zidului de foc la interfața cu structura metalică protejată

Rostul de decuplare între zidul de foc (b.a., verificat §13 DTAC la colaps unilateral) și structura metalică rămâne esențial: stâlpii metalici adiacenți, chiar protejați la R30, NU se reazemă pe zidul de foc și nu-i transmit reacțiuni — ipoteza de calcul a zidului de foc (verificat independent, în consolă) rămâne valabilă indiferent de protecția aplicată structurii metalice adiacente.

### PTh-R.11.6 Tabel sinteză cerințe și soluții de protecție la foc

| Element/zonă | Cerință | Soluție adoptată | Verificare |
|---|---|---|---|
| Structură curentă hală (departe de zid foc/evacuare) | neprotejat | — | justificat de scenariul PSI |
| Stâlpi adiacenți zid de foc (±3,0m) | R30 | vopsea intumescentă (DFT conform PTh-R.11.2) | θcr=549°C atins la >30min |
| Structură căi de evacuare protejate | R30 | vopsea intumescentă | idem |
| Grinzi metalice mezanin | R60 | placare 2×15mm plăci rezistente la foc | conform raport încercare sistem |
| Planșeu compozit mezanin | R60 | armătură Ø10/nervură (§15.2 DTAC) | verificat DTAC |
| Zid de foc (b.a.) | REI 180 | secțiune 40×60cm, 6Ø28/față (§13 DTAC) | verificat DTAC, neschimbat |

---

## PTh-R.12 — DETALII DE ÎMBINARE TIPIZATE COMPLETE (PLANȘE DE ATELIER ȘI MONTAJ)

### PTh-R.12.1 Conținutul setului de planșe de rezistență faza PTh

| Cod planșă | Denumire | Conținut |
|---|---|---|
| S01 | Plan general de fundații — trasare | Axe, cote de fundare, poziții șabloane buloane de ancoraj |
| S02 | Plan fundații — cofraj/armare + zid de foc | Dimensiuni B×L×H, armare tălpi, mustăți, GE |
| S03 | Plan de montaj structură metalică — parter | Poziții stâlpi/repere ST-, CF-, coordonate axe |
| S04 | Plan de montaj — cadre transversale (elevație tip) | Poziții RG-, CV-, cote de nivel caracteristice |
| S05 | Plan de montaj — contravântuiri și acoperiș | CO-, PN- pe zone (F/G/H/I), SR- |
| S06 | Plan de montaj — mezanin | MZ-P, MZ-S, poziție planșeu compozit, scară SC- |
| S07 | Plan de montaj — cale de rulare pod rulant (dacă e cazul) | GR-, CS-, cote de aliniere |
| S08 | Detaliu nod rigid riglă-stâlp (tip) | Placă capăt 40mm, backing plate, 4 rânduri M30, rigidizări |
| S09 | Detaliu splice riglă | Placă 900mm, 6 rânduri M27, poziție la 1/4 deschidere |
| S10 | Detaliu placă de bază + ancoraje (curent și capăt CBF) | PB-01/PB-02, buloane M30/M36, subturnare |
| S11 | Detaliu prindere diagonală CBF (gusset) | Placă guseu 16mm, capăt aplatizat ranforsat, 4×M20 |
| S12 | Detaliu consolă cale de rulare (după corecție HE200B) | Racord CJP șlefuit, rigidizări stâlp |
| S13 | Detaliu zid de foc — armare + rost de decuplare | Secțiune 40×60, 6Ø28/față, rost față de structură metalică |
| S14 | Detalii tipizate pane/rigle perete pe zone | Fixare, sag-rods, secțiuni pe zonă (F/G/H/I, A/B/D/E) |
| S15 | Extras de materiale (bill of quantities) | Tabelele PTh-R.3, pe repere |

### PTh-R.12.2 Fișa de element (shop drawing) — exemplu ST-03 (stâlp curent)

| Parametru | Valoare |
|---|---|
| Reper | ST-03 |
| Profil | HEB 450 |
| Lungime totală | 9.500 mm |
| Material | S355 J2, certificat 3.1 |
| Prelucrări capăt inferior | placă de bază sudată PB-01 (700×700×45), 4 găuri Ø33 pt. M30 |
| Prelucrări capăt superior | placă de capăt sudată (300×750×40) + backing plate 20mm, rigidizări la ambele tălpi |
| Prelucrări intermediare | rigidizări la cota +6,50m (dacă traveea are pod rulant — nu e cazul la ST-03) |
| Camber/pretratare | fără (stâlp drept) |
| Vopsire | sistem C3-H complet în atelier (grund+intermediar+finisaj) |
| Marcaj | poansonat lângă placa de bază, vizibil post-montaj |

### PTh-R.12.3 Fișa de element — exemplu RG-05 (riglă cadru, 2 tronsoane)

| Parametru | Tronson 1 (RG-05a) | Tronson 2 (RG-05b) |
|---|---|---|
| Lungime | 10.000 mm | 10.000 mm |
| Secțiune | I sudat h variabil 900→650 mm (capăt nod → splice) | I sudat h variabil 650→900→650 (splice → coamă → splice opus, simetric) |
| Capăt către stâlp | placă de capăt 300×750×40 + vută 1.800mm | — |
| Capăt splice | placă de capăt splice 300×900×30, 6 rânduri M27 | placă de capăt splice identică (simetrică) |
| Camber aplicat | 40 mm distribuit pe toată rigla (interpolat pe tronsoane) | idem |

### PTh-R.12.4 Racord grindă mezanin — stâlp propriu

Grinzile principale ale mezaninului (MZ-P, HEB240) se prind pe stâlpii proprii ai mezaninului (secțiune HEB200, independenți structural de cadrele principale ale halei, cu excepția reazemului lateral la cadrul 10 — v. PTh-R.2.5) prin placă de capăt înșurubată (M20 gr. 8.8, 4 buc), simplu rezemată (nu moment-rezistentă — mezaninul nu participă la sistemul de contravântuire seismică principal al halei, fiind conceput ca substructură independentă legată doar prin diafragma planșeului compozit la nivelul ei).

---

## PTh-R.13 — CALCULUL COMPLET AL SCĂRII METALICE ȘI AL PLATFORMELOR TEHNICE

### PTh-R.13.1 Geometria scării de acces la mezanin

Scară metalică cu 2 vanguri (profil UNP 200), rampă dreaptă, lățime utilă 1,10 m, înălțime de urcat H = 4,00 m (cota mezaninului), unghi de înclinare ≈ 35°, lungime înclinată Linc = 4,00/sin35° = **6,97 m**, cu 1 podest intermediar la H/2 = 2,00 m (2 rampe de câte 11 trepte, h treaptă ≈ 182 mm, lățime călcare ≈ 280 mm — verificare 2h+l = 364+280 = 644 mm, în intervalul confortabil 600–660 mm conform normelor de proiectare a scărilor).

### PTh-R.13.2 Încărcări pe rampă (recapitulare + detaliere completă)

| Componentă | Valoare | Observație |
|---|---|---|
| Greutate proprie trepte (tablă striată 6mm + suporți) | 0,45 kN/m² | pe proiecție orizontală |
| Greutate proprie vanguri + balustradă (echivalent distribuit) | 0,35 kN/m² | — |
| Greutate proprie totală gk | 0,80 kN/m² | — |
| Utilă (scări cu aglomerări, categ. A/scări) | 4,0 kN/m² | SR EN 1991-1-1 tab. 6.2 |
| **qEd = 1,35·0,80 + 1,5·4,0** | **7,08 kN/m²** | pe proiecție orizontală |

*(Notă: valoarea de 8,38 kN/m din DTAC §16.6 folosea gk = 1,2 kN/m² generic pentru „trepte+vanguri"; prezentul calcul detaliază separat cele două componente, rezultând un gk ceva mai redus (0,80) — diferența e minoră și ambele acoperă necesarul; se reține pentru execuție valoarea DIN PTh, recalculată detaliat: qEd = 7,08 kN/m² pe proiecție.)*

### PTh-R.13.3 Calculul static al rampei

Încărcare pe vang (2 vanguri, lățime aferentă fiecăruia = 0,55 m din lățimea utilă 1,10 m):
qvang = qEd·0,55 = 7,08·0,55 = **3,89 kN/m** (pe proiecție orizontală) → pe lungimea înclinată: qvang,inc = qvang·sin35°/sin35°... (se lucrează direct cu momentul pe proiecție, echivalent pentru rampe înclinate uzuale): **q'vang ≈ 3,89/cos35° = 4,75 kN/m** (pe lungime înclinată, corectat pentru proiecție).

Moment pe rampă (simplu rezemată vang la parter, rezemată pe grinda de podest la mijloc — model grindă continuă pe 2 deschideri egale Linc/2 = 3,485 m fiecare):
MEd,câmp ≈ q'vang·(Linc/2)²/8 = 4,75·3,485²/8 = **7,20 kNm** (pe deschiderea de rampă simplă);
MEd,reazem (podest intermediar, continuitate) ≈ q'vang·(Linc/2)²/8·(factor 1,25 pt reazem continuu) ≈ **9,0 kNm**.

*(Notă: valorile diferă de MEd=25,4 kNm calculat în DTAC §16.6, care trata rampa ca simplu rezemată pe toată lungimea Linc=6,97m fără podest intermediar. Prezentul calcul PTh introduce podestul intermediar la H/2, cf. normelor de proiectare a scărilor pentru H=4,00m — o scară de 22 de trepte fără podest ar depăși recomandările uzuale de confort/siguranță pentru o singură rampă. Introducerea podestului este o completare de proiectare PTh față de simplificarea DTAC, care reduce semnificativ momentul de calcul pe vang.)*

### PTh-R.13.4 Verificarea vangului UNP 200

Mpl,Rd(UNP200) = 228.000·275 = **62,7 kNm** (§16.6 DTAC) → utilizare MEd,reazem/Mpl,Rd = 9,0/62,7 = **0,14 — secțiune mult supradimensionată pentru rezistență** → **se menține UNP 200 din considerente de rigiditate/săgeată și de asamblare uzuală (profil comercial curent), nu din necesitate de rezistență**.

Săgeata (rampă L=3,485m, q'vang=4,75kN/m, I(UNP200)=1.910cm⁴): w = 5·q·L⁴/(384·E·I) = 5·4,75·3.485⁴/(384·210.000·1.910·10⁴) — calculat: w ≈ **3,8 mm** ≪ L/300 = 11,6 mm → **✓, larg satisfăcut**.

### PTh-R.13.5 Grinda de podest intermediar

Grindă de podest (secțiune C200 sau UNP200), deschidere = lățimea scării 1,10 m + reazeme, încărcată de reacțiunile celor 2 vanguri de pe fiecare rampă (superioară + inferioară) + greutatea proprie a podestului (tablă striată, 1,10×1,20m):
Reacțiune vang pe podest ≈ q'vang·Linc/2/2 (jumătate din rampă) × 2 rampe = 4,75·3,485/2·2 ≈ **16,6 kN** pe fiecare grindă de podest (2 grinzi, una de fiecare parte).
Grindă de podest verificată la încovoiere similar unei grinzi secundare curente — secțiune UNP200 (Mpl,Rd = 62,7 kNm) larg suficientă pentru deschiderea mică de 1,10 m.

### PTh-R.13.6 Treptele și balustrada

Treaptă (tablă striată 6 mm sau grătar electroforjat), deschidere 1,10 m (între vanguri), verificată la sarcina concentrată 2,0 kN pe 200×200 mm (utilizator izolat) + utilă distribuită 4,0 kN/m²; săgeată ≤ L/300 = 3,7 mm — conform pentru tablă striată 6 mm sau grătar standard 30×2 mm/maillage 34×38.

Balustrada (h = 1,10 m, cerință NP 068/normativ accesibilitate + siguranță), verificată la împingerea orizontală liniară aplicată la mâna curentă: 1,0 kN/m (SR EN 1991-1-1 categoria A). Stâlpișori la interax ≤ 1,20 m, mână curentă profil rotund Ø42,4mm, umplutură verticală (bare Ø12 la interax ≤ 120mm, conform cerinței anti-cățărare pentru siguranța copiilor, dacă aplicabil pe zonele accesibile publicului).

### PTh-R.13.7 Prinderea scării de structură

Prindere superioară (la mezanin): articulată, placă de capăt mică + 2 buloane M16 gr. 8.8, permite rotire liberă (fără moment transmis structurii principale).
Prindere inferioară (la placa de pardoseală/fundație proprie mică): reazem simplu, placă de bază 250×250×15mm + 2 buloane de ancoraj M16, cu gaură alungită (slotted hole) pe o direcție pentru a permite dilatarea termică diferențială între scară și structura principală fără a introduce eforturi parazite.

### PTh-R.13.8 Platforme tehnice (acces la echipamente de acoperiș/mezanin, dacă prevăzute)

Platformele tehnice de acces la echipamentele de pe acoperiș (unități de ventilare, dacă amplasate pe structura de acoperiș) se dimensionează similar podestelor scării, cu încărcare utilă de întreținere qk = 1,5 kN/m² (acces ocazional personal calificat) + sarcină concentrată 1,5 kN pe 200×200mm, secțiuni tipizate C120/C150 pe grătar metalic, verificate individual funcție de amplasarea și dimensiunile reale ale echipamentelor (se detaliază la faza de execuție, pe baza fișelor tehnice ale echipamentelor selectate de instalații).

---

## PTh-R.14 — TEHNOLOGIE DE EXECUȚIE PE TIMP FRIGUROS/CĂLDUROS

### PTh-R.14.1 Cadru normativ

Sudarea și montajul structurilor metalice pe timp friguros se desfășoară conform recomandărilor **SR EN 1090-2** și ale codurilor de sudare aplicabile (SR EN ISO 15609 pentru specificațiile procedeelor), corelat cu **C 16** (normativ execuție lucrări pe timp friguros, aplicat prin analogie principiilor generale, întrucât C16 vizează în principal betonul) pentru aspectele de organizare de șantier.

### PTh-R.14.2 Riscuri și măsuri la sudare pe timp friguros

- **Temperatura minimă de sudare** pentru oțeluri S355/S275 fără preîncălzire: în general ≥ 0°C pentru grosimi curente (< 30mm), cu precauții suplimentare (preîncălzire locală la 50–100°C cu arzător, conform WPS) pentru table groase (> 30mm, cazul plăcilor de bază 45mm și al plăcilor de capăt 40mm) SAU la temperaturi ambientale sub 0°C, pentru a reduce riscul de fisurare la rece (hidrogen) și a asigura o răcire controlată a cusăturii.
- **Sudarea sub +5°C** necesită măsuri suplimentare: îndepărtarea umezelii/gheții de pe suprafețele de sudat (uscare cu flacără/aer cald înainte de sudare), protecție împotriva vântului (paravane) pentru procedeele cu gaz de protecție (MAG), verificarea temperaturii materialului de bază (nu doar a aerului) înainte de aprindere.
- **Depozitarea consumabililor** (electrozi bazici) în uscătoare/tubulare încălzite, conform fișei tehnice a producătorului (electrozii bazici absorb umiditate, generând risc de hidrogen difuzibil în cusătură).

### PTh-R.14.3 Măsuri la montaj pe timp friguros

- Verificarea **fragilității oțelului la temperatură scăzută** — oțelurile adoptate (S355 J2, tenacitate KV ≥ 27J la −20°C) sunt certificate pentru execuție la temperaturi scăzute, dar se evită **șocurile mecanice** (impact la manipulare, batere excesivă la ajustarea găurilor) la temperaturi < −10°C, care pot iniția fisuri fragile în special la muchiile debitate termic netratate.
- **Pretensionarea șuruburilor HR** la temperaturi scăzute: se verifică valabilitatea cuplului de strângere specificat (unele scule/chei dinamometrice pot necesita recalibrare la temperaturi extreme); se evită condensul/gheața pe suprafețele de contact înainte de strângere (afectează coeficientul de frecare µ).
- **Ridicarea și manipularea** elementelor mari (rigle de 10m) la vânt puternic sau ceață/polei se suspendă conform planului de securitate al șantierului (SSM).

### PTh-R.14.4 Măsuri pe timp călduros

- Protecția vopselelor proaspăt aplicate față de radiația solară directă și de temperaturi de aplicare peste limita superioară a fișei tehnice (uzual 35°C pentru sisteme epoxidice — risc de „solvent boiling"/pori în peliculă).
- Sudarea la temperaturi ambientale ridicate (> 35°C): se verifică respectarea intervalului de temperatură interpas (interpass temperature) specificat în WPS, care poate necesita PAUZE de răcire între treceri la table groase.

### PTh-R.14.5 Betonul asociat structurii metalice (fundații, zid de foc, placă pardoseală) pe timp friguros

Pentru componentele de beton (fundații, zid de foc, placa pardoseală, planșeul compozit) se aplică integral prevederile de execuție pe timp friguros conform **C 16** (protecție/tratare termică, aditivi antiîngheț, metoda maturității pentru confirmarea rezistenței la decofrare) — identic principiului aplicat funcțiunilor cu structură integral din beton armat, adaptat la volumele de beton specifice halei (fundații izolate, placă industrială mare suprafață — atenție sporită la fisurarea din contracție termică diferențială pe suprafețe mari, cu rosturi de contracție la 5–6m conform §12.5 DTAC, tăiate mai devreme pe vreme rece din cauza priorității reduse a betonului).

---

## PTh-R.15 — PROGRAM COMPLET DE PROBE ȘI ÎNCERCĂRI

### PTh-R.15.1 Încercări pe materialul de bază (oțel)

| Control | Frecvență |
|---|---|
| Certificat 3.1 (compoziție, Re, Rm, alungire, KV) | fiecare lot/colada, la recepția în atelier |
| Verificare marcaj/heat number la debitare | 100% loturi |
| Încercare de tracțiune pe eșantion (dacă certificatul lipsește/e neconcludent) | prin sondaj, laborator acreditat |

### PTh-R.15.2 Încercări pe îmbinări sudate

| Control | Frecvență/Extindere |
|---|---|
| Examinare vizuală (VT) | 100% toate sudurile |
| Ultrasunete (UT) — CJP noduri rigide, vute, console cale rulare | 100% |
| Radiografie (RT) — console cale de rulare (categorie oboseală) | 10% prin sondaj + toate cele suspecte la UT |
| Lichide penetrante (PL) — verificare periodică sudură consolă (în exploatare, §PTh-R.8.2) | la 5 ani |
| Calificare procedee (WPQR) | înainte de începerea producției, per combinație procedeu-grosime-poziție |
| Calificare sudori | valabilă la data execuției, per procedeu și poziție |

### PTh-R.15.3 Încercări pe șuruburi HR pretensionate

| Control | Frecvență |
|---|---|
| Certificat 3.1 lot șuruburi/piulițe/șaibe | fiecare lot |
| Verificare coeficient de frecare (µ) suprafețe de contact | certificat furnizor sistem, per lot vopsea zonă de contact |
| Control pretensionare (metoda combinată, marcaj rotire) | 100% vizual + 10% verificare instrumentală prin sondaj |

### PTh-R.15.4 Încercări pe sistemul de protecție

| Control | Frecvență |
|---|---|
| Rugozitate suprafață după sablare | per element reprezentativ |
| DFT (grosime peliculă uscată) | min. 10 puncte/element, criteriu 80/20 |
| Aderență (pull-off) | 1/500 m² sau per element critic |
| Certificat reacție la foc vopsea intumescentă | per lot, corelat cu profilul/masivitatea reală |

### PTh-R.15.5 Încercări pe elementele de beton asociate (fundații, zid de foc, placă, mezanin)

| Control | Frecvență |
|---|---|
| Consistență beton la fiecare transport | 100% transporturi |
| Rezistență compresiune (seturi 3 cuburi) | 1 set/50mc SAU/element SAU/zi turnare |
| Probe decofrare | 1 set/element important |
| Portanță strat balast sub placă industrială (Ev2) | placă de încărcare, min. 1 punct/500mp |

### PTh-R.15.6 Probă de recepție a podului rulant (dacă e cazul)

- **Probă statică**: 1,25× sarcina nominală, menținută 10 minute, verificare deformații reziduale ale grinzii de rulare și ale consolelor (nu se admit deformații permanente).
- **Probă dinamică**: sarcină nominală, deplasare pe toată lungimea căii, verificarea funcționării mecanismelor de siguranță (limitatoare de cursă, frâne) și a alinierii sub sarcină.
- **Aliniere finală** verificată topografic după probele de sarcină (structura se poate așeza/deforma marginal sub prima încărcare reală).

### PTh-R.15.7 Documente de conformitate arhivate la Cartea Tehnică

Certificate materiale 3.1, rapoarte END (VT/UT/RT), fișe de pretensionare șuruburi, rapoarte DFT/aderență vopsea, procese-verbale de fază determinantă, procese-verbale de probă a podului rulant, buletine de încercare beton, raport topografic final de as-built (poziții reale vs. proiect, cu abateri consemnate).

---

## PTh-R.16 — BREVIAR COMPLET DE ÎNCĂRCĂRI ȘI COMBINAȚII (TOATE TIPURILE DE CADRU)

### PTh-R.16.1 Acțiuni permanente (G) — recapitulare cu valori actualizate din PTh-R.3

| Element | gk |
|---|---|
| Acoperiș (panou sandwich + pane + instalații suspendate + tavan) | 0,48 kN/m² (§6.1 DTAC, neschimbat) |
| Perete (panou sandwich + rigle) | 0,24 kN/m² (neschimbat) |
| Greutate proprie structură metalică (recalculată din PTh-R.3: 106,1 t/2.400mp) | 0,442 kN/m² *(vs. 0,30 kN/m² estimat generic în DTAC §6.1 — valoare actualizată, mai mare, provenind din contabilizarea exactă a stâlpilor de capăt majorați, consolelor și splice-urilor; se recomandă utilizarea valorii PTh la recalcularea finală a modelului EF, v. PTh-R.9.2)* |

### PTh-R.16.2 Acțiuni variabile (Q) — neschimbate față de DTAC

Zăpadă s = 1,60 kN/m² (μ1=0,8, sk=2,0); vânt qp = 1,05 kN/m²; utilă acoperiș 0,40 kN/m²; utilă mezanin 3,0+0,8 kN/m²; pod rulant conform NP 042 (Rv,d ≈ 115 kN/roată); temperatură ΔT=±35°C.

### PTh-R.16.3 Combinații SLU — tabel unificat pe toate cadrele

| Combinație | Cadru curent (3,4,6,7,9) | Cadru capăt CBF (2,8) | Cadru cu pod (5) | Cadru cu mezanin (10) | Fronton (1,11) |
|---|---|---|---|---|---|
| C1 gravitațional | NEd=380, MEd=520 | NEd=385+ΔN capacitate, MEd=525 | — | NEd=460, MEd=560 | NEd=210, MEd=95 |
| C2 ridicare (vânt succiune) | NEd=−85, MEd=180 | idem + verificare ancoraj majorat | — | idem | idem |
| C3 cu pod rulant | — | — | NEd=552,5, MEd=405 | — | — |
| C4 cu mezanin | — | — | — | NEd=460 (util+G), MEd=560 | — |
| Seismică | NEd=350, MEd=480 | NEd=987 (efort capacitate CBF, PTh-R.2.7) | recalculat cu N pod | idem C4 + componentă seismică mezanin | NEd fronton seismic ≈ 180, MEd ≈ 60 |

### PTh-R.16.4 Exemplu numeric suplimentar — cadru de fronton (stâlp HEB300)

Combinația de vânt frontal (guvernantă pentru stâlpul de fronton, v. PTh-R.2.6): MEd = 72,1 kNm, NEd (din greutatea proprie a frontonului + reacție contravântuire orizontală) ≈ **65 kN** (compresiune redusă, stâlp de fronton neportant pentru cadrul principal, doar autoportant + vânt).
Verificare interacțiune (secțiune clasa 1, Npl,Rd = 149.00·355=5.290 kN): n=65/5.290=0,012 (neglijabil) → MN,Rd ≈ Mpl,Rd = 663,5 kNm → utilizare MEd/MN,Rd = 72,1/663,5 = **0,11 — secțiune guvernată de zveltețe/flambaj lateral (rezemat de riglele de perete la 3,0 m), nu de rezistență la încovoiere**.

### PTh-R.16.5 Tabel centralizator utilizări — toate cadrele (extindere PTh-R.2.2)

| Cadru/element | Verificare guvernantă | Utilizare | Verdict |
|---|---|---|---|
| Cadru curent — stâlp HEB450 | interacțiune 6.61 | 0,53 | ✓ |
| Cadru curent — riglă (nod) | încovoiere+deversare | 0,74 | ✓ |
| Cadru capăt CBF — stâlp HEB550 | interacțiune 6.61 (efort capacitate) | 0,31 | ✓ |
| Cadru cu pod — stâlp HEB500 | interacțiune 6.61 | 0,33 | ✓ |
| Cadru cu pod — consolă HE200B | oboseală (după corecție PTh-R.2.4) | 0,82 | ✓ |
| Cadru cu mezanin — stâlp HEB450 | interacțiune 6.61 | 0,57 | ✓ |
| Fronton — stâlp HEB300 | încovoiere | 0,11 | ✓ (guvernat de zveltețe) |
| Nod rigid (toate, placă 40mm+backing) | metoda componentelor | 0,79 (300/550,8 rând critic) | ✓ (după corecție PTh-R.4.1) |
| Splice riglă | metoda componentelor | 0,95 (320/336) | ✓ |
| Guseu diagonală CBF | secțiune netă ranforsată | 0,94 (987/1.050) | ✓ (la limită, recomandată verificare suplimentară la execuție) |

---

## PTh-R.17 — SINTEZA VERIFICĂRILOR SUPLIMENTARE ȘI CONCLUZIE INGINEREASCĂ

### PTh-R.17.1 Sinteza corecțiilor de proiectare aduse de faza PTh față de predimensionarea DTAC

| Element/aspect | Predimensionare DTAC | Corecție/detaliere PTh | Motiv |
|---|---|---|---|
| Consola cale de rulare | IPE300, sudură colț a=6mm | **HE200B, sudură CJP șlefuită** | verificare la oboseală (categorie de detaliu insuficientă la profilul/sudura inițială) |
| Stâlpi de capăt travee CBF | HEB450 (uniform cu restul) | **HEB550** | efort de capacitate al diagonalei CBF (calcul de capacitate, neexplicitat numeric în DTAC) |
| Nod rigid riglă-stâlp | placă 30mm + M27/M30, Mj,Rd aproximat 585–700 kNm | **placă 40mm + backing plate 20mm + M30, Mj,Rd verificat component cu component = 680,4 kNm** | recalcul riguros metoda componentelor (DTAC folosea o aproximare uniformă pe rânduri) |
| Splice de transport riglă | neexplicitat (riglă tratată continuu) | **splice la 1/4 deschidere, placă 900mm, 12×M27/tronson** | cerință de transport (L=20m > gabarit rutier) |
| Guseu diagonală CBF | neexplicitat (diagonală tratată la NEd elastic) | **capăt ranforsat cu doubler + 4×M20, verificat la efortul de capacitate (987kN)** | calcul de capacitate al elementelor nedisipative |
| Pane/rigle de perete | profil unic înfășurătoare | **profile diferențiate pe zone F/G/H/I și A/B/D/E** | optimizare + verificare la succiune pe zone, neprezentă în DTAC |
| Scară mezanin | rampă unică 6,97m fără podest | **2 rampe + podest intermediar la H/2** | conformare la practica de proiectare a scărilor pt. H=4,00m |
| Greutate proprie structură metalică | estimare generică 0,30 kN/m² | **0,442 kN/m² (din extras de materiale real, PTh-R.3)** | contabilizare exactă — recomandată rerulare model EF final |

### PTh-R.17.2 Tabel centralizator conformitate — toate verificările suplimentare PTh

| Categorie | Verificare | Rezultat |
|---|---|---|
| Oboseală | Consolă cale rulare (corectată) | 0,82 ✓ |
| Oboseală | Grindă rulare (talpă-inimă) | 0,59 ✓ |
| SLS vibrații | Planșeu mezanin, f1=6,36Hz | ✓ (>4,5Hz) |
| SLS deplasări | Toate elementele (tabel PTh-R.16.5 + DTAC §16) | ✓ |
| Foc | Stâlpi adiacenți zid foc R30 | ✓ (vopsea intumescentă) |
| Foc | Grinzi mezanin R60 | ✓ (placare) |
| Îmbinări | Nod rigid, splice, guseu CBF | ✓ (după corecțiile PTh-R.4) |
| Execuție | Toleranțe montaj, EXC2/EXC3 local | conform SR EN 1090-2 |

### PTh-R.17.3 Concluzie inginerească

Structura metalică a halei industriale/logistice de referință (L=60m × B=40m, cadre MRF q=4,0 + CBF q=4,0, DCM), verificată integral la predimensionare în faza DTAC, a fost **detaliată la nivel de execuție** în prezentul supliment PTh: extras complet de materiale pe repere (≈106,1 t oțel structural + consumabile), îmbinări dimensionate prin metoda componentelor (nod rigid, splice de transport, guseu de contravântuire, placă de bază), tehnologie de execuție în atelier și montaj, plan de control al calității, faze determinante, program de urmărire în timp și program de probe.

Analiza detaliată a evidențiat **trei corecții de proiectare** față de predimensionarea DTAC (consola căii de rulare, stâlpii de capăt CBF, configurația finală a nodului rigid), toate documentate cu verificare numerică și motivate tehnic la §PTh-R.17.1 — corecții normale și așteptate la trecerea de la faza de predimensionare (DTAC) la faza de execuție (PTh), care nu invalidează soluția de ansamblu ci o consolidează. Se recomandă, înainte de finalizarea planurilor de execuție: (1) rularea modelului EF final cu greutatea proprie actualizată a structurii metalice (0,442 kN/m² vs. 0,30 kN/m² estimat în DTAC), (2) confirmarea parametrilor de amplasament reali (ag, Tc, sk, qb, pconv) cu harta de zonare P100-1/CR 1-1-3/CR 1-1-4 și studiul geotehnic definitiv al amplasamentului efectiv, (3) confirmarea grosimilor de vopsea intumescentă cu raportul de clasificare la foc al sistemului efectiv ales de antreprenor.

Documentația necesită verificare tehnică de către verificatori atestați MDLPA pe cerințele **Af** (rezistență mecanică — structuri metalice, obligatoriu), **A1** (rezistență mecanică — fundații/beton, placă pardoseală, zid de foc), **Ag** (geotehnic) și **Ci** (securitate la incendiu), conform Legii 10/1995 și HG 925/1995.

---

*Prezentul supliment de fază PTh-Rezistență completează faza DTAC (`structura.md`) și se citește împreună cu planșele de montaj și de atelier S01–S15 (PTh-R.12.1) și cu Caietul de sarcini pentru structuri metalice și de beton armat (document distinct). Toate valorile numerice sunt exemple de dimensionare pentru o hală industrială/logistică de referință (40×60m, mezanin ~150mp, pod rulant opțional 8t) și se confirmă/ajustează în urma rulării finale a modelului EF pe geometria reală a proiectului, a studiului geotehnic definitiv al amplasamentului și a alegerii efective a sistemelor de protecție (vopsire anticorozivă/intumescentă) de către antreprenorul de execuție.*
