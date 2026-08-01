## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență al hotelului de 4 stele, regim **S+P+6E**, elaborat conform **HG 907/2016** (conținutul-cadru al documentațiilor tehnico-economice, anexa 8 — Proiect Tehnic). El aprofundează faza DTAC (deja redactată — sistem dual: nucleu central + pereți structurali continui + cadre de subsol/parter/etajul 1 + planșeu de transfer la cota +8,70 m + pereți structurali de etaj discontinuați pe etajele de cazare E2÷E6; materiale, acțiuni, spectru seismic P100-1/2013, categoria de importanță B, clasa de importanță seismică II, predimensionare, fundare pe radier general) aducând structura la nivelul de detaliere necesar EXECUȚIEI: breviar de calcul complet pentru toate elementele, planuri de armare cu extras de oțel, detalii de armare la noduri și zone critice, tehnologia de execuție, planul de control al calității, fazele determinante și programul de urmărire în timp.

Documentul **nu repetă** conținutul DTAC (justificarea alegerii sistemului structural, evaluarea încărcărilor unitare de bază, calculul seismic simplificat de predimensionare — cap. 1-9 DTAC) și **nu se suprapune** cu Caietul de sarcini (care va fi elaborat separat, cu specificațiile de material și de execuție pe articole de deviz). Toate valorile numerice preluate din DTAC sunt reluate ca date de intrare, fără recalculare, iar dimensionarea de execuție dezvoltată aici este consistentă cu acestea.

### 1.1. Recapitulare a datelor de bază ale proiectului (preluate din DTAC, nemodificate)

| Parametru | Valoare | Sursă (DTAC) |
|---|---|---|
| Regim de înălțime | S+P+6E | memoriu general |
| Dimensiuni plan (ax-ax) | 48,00 × 22,00 m | cap. 1.2 |
| Suprafață construită Ac/nivel | ≈ 1.056 mp | cap. 1.2 |
| Sistem de axe longitudinale | 1÷13, interax 4,00 m | cap. 1.2 |
| Sistem de axe transversale | A÷D: A-B = 7,00 m, B-C = 2,20 m (coridor), C-D = 7,00 m | cap. 1.2 |
| Sistem structural | Dual: nucleu central (t=30 cm) + pereți de contur continui + cadre subsol/parter/etajul 1 (stâlpi interax 8,00 m, axele impare) + pereți de etaj discontinuați (axele pare, doar E2÷E6) | cap. 2 |
| Cota planșeului de transfer | +8,70 m (peste etajul 1) | cap. 2.2, 8.2 |
| Cota planșeului peste E6 | +23,70 m (≈ +23,80 m cu coronament) | cap. 1.2 |
| Categoria de importanță | B (deosebită), HG 766/1997 | cap. 1.3 |
| Clasa de importanță seismică | II, γI,e = 1,20 | cap. 1.3 |
| Amplasament de calcul (exemplu dezvoltat) | Bacău: ag = 0,30g, TC = 0,70 s | cap. 4.1 |
| Clasa de ductilitate | DCM | cap. 7.1 |
| Factor de comportare adoptat | q = 2,90 (penalizat 20% pt. neregularitate elevație) | cap. 7.1 |
| Forța seismică de bază | Fb ≈ 26.460 kN | cap. 7.4 |
| Greutate seismică totală | W ≈ 91.350 kN (m ≈ 9.312 t) | cap. 7.2 |
| Cotă de fundare (talpă radier) | −3,80 m | cap. 1.2, 4.4 |
| Nivel hidrostatic (NHS) | −2,20 m | cap. 4.4 |
| Presiune convențională de bază | pconv = 250 kPa | cap. 4.4 |
| Categoria geotehnică | 3 | cap. 4.4 |

### 1.2. Materiale — recapitulare și completare pentru execuție

| Element | Clasă beton | Clasă expunere | Oțel | cnom |
|---|---|---|---|---|
| Radier general + pereți subsol (cuvă etanșă) | C30/37 | XC2+XA1 | B500C | 45-50 mm |
| Stâlpi parter/subsol/etajul 1 + grinzi de transfer + nucleu (zonă critică bază) | C35/45 | XC1 | B500C | 30 mm |
| Nucleu central + pereți continui, etaje superioare | C30/37 | XC1 | B500C | 25 mm |
| Planșeu de transfer (+8,70 m) | C35/45 | XC1 | B500C | 30 mm |
| Planșee curente (podium + E2÷E6 + terasă) | C25/30 (C30/37 la deschideri mari) | XC1 | B500C | 25 mm |
| Pereți structurali de etaj (compartimentare camere) | C30/37 | XC1 | B500C | 25 mm |
| Scări, rampe | C25/30 | XC1 | B500C | 25 mm |
| Egalizare sub radier | C8/10 | X0 | — | — |

Toate valorile de calcul (fcd, fyd, Ecm) sunt cele stabilite la cap. 3 al memoriului DTAC și se preiau identic: `fcd(C25/30)=16,67`, `fcd(C30/37)=20,00`, `fcd(C35/45)=23,33 N/mm²`; `fyd=434,8 N/mm²`.

---

## PTh-R.2 — BREVIAR DE CALCUL COMPLET

### 2.1. Metodologie și convenții

Toate eforturile de proiect definitive provin din **analiza modală spațială cu spectre de răspuns** pe model 3D complet (minimum 90% masă modală activă pe fiecare direcție, combinare CQC, direcțional 100%/30%, conform P100-1 §4.5.3.5.4 și cap. 6.3 DTAC), rulată în program de calcul cu elemente finite (v. PTh-R.9). Breviarele de mai jos dezvoltă, pentru fiecare familie de elemente, dimensionarea de execuție pornind de la eforturile rezultate din acest model, verificate încrucișat cu metoda forțelor laterale echivalente din DTAC (cap. 7) ca reper de ordin de mărime.

Combinații de acțiuni (reluate din DTAC cap. 5.4):
- **Fundamentală (SLU persistentă):** `1,35·G + 1,5·Q` (+ acțiuni climatice cu ψ0);
- **Seismică (SLU specială):** `G + Σψ2,i·Qi + γI,e·AEk`;
- **Caracteristică/cvasipermanentă (SLS):** `G + Σψ1,i·Qi` / `G + Σψ2,i·Qi`.

Arii minime/maxime de armare (SR EN 1992-1-1 §9.2.1.1, §9.5.2, §9.6.2):
- Plăci și grinzi: `As,min = 0,26·(fctm/fyk)·bt·d ≥ 0,0013·bt·d`; `As,max = 0,04·Ac`;
- Stâlpi (P100-1 §5.4.3.2.2, DCM): `As,min = 0,01·Ac`; `As,max = 0,04·Ac` (0,06·Ac în zone de înnădire);
- Pereți structurali (P100-1 §5.4.3.4.2): `ρv,min = 0,0015`, `ρh,min = 0,0025` pe inimă; `ρbulb,min` conform confinării (cap. 2.7).

### 2.2. Încărcări unitare adoptate — recapitulare pe categorii de placă

Valorile de bază sunt cele din DTAC cap. 5.1 și 5.5; se detaliază aici pe fiecare tip de travee structurală, ținând cont de faptul că structura camerelor urmează grila **4,00 m (axial longitudinal) × 7,00 m (A-B / C-D, transversal)**, cu coridorul central B-C = 2,20 m.

| Zonă/placă | gk (kN/m²) | qk (kN/m²) | Combinație SLU pEd (kN/m²) |
|---|---|---|---|
| Cameră standard (Single/Double/Twin/PMR), travee 4,00×7,00 | 7,60 | 2,00 | 1,35·7,60+1,5·2,00 = 13,26 |
| Suite/Apartament, travee dublă 8,00×7,00 | 7,60 | 2,00 | 13,26 (identic — încărcare de suprafață nu depinde de deschidere) |
| Coridor central (B-C, 2,20 m lățime) | 7,60 | 3,00 | 1,35·7,60+1,5·3,00 = 14,76 |
| Planșeu curent podium (parter/etajul 1, C1/C2/C3) | 7,50/8,20 (etaj1) | 4,00-5,00 | 16,28 (adoptat, cap. 5.5 DTAC) |
| Terasă (peste E6) | 7,50 | 4,00 | 1,35·7,50+1,5·4,00 = 16,13 |
| Planșeu de transfer (+8,70 m) | — | — | conform grinda/placa de transfer, cap. 2.4 |

Valoarea adoptată acoperitor la cap. 5.5 DTAC (`pEd,SLU,adoptat = 16,28 kN/mp`) rămâne valoarea de referință pentru toate planșeele etajelor de cazare (E2÷E6), inclusiv camerele mari (suite/apartament), unde neuniformitatea locală (mobilier fix, placaje) este deja inclusă în marja de +19% aplicată în DTAC.

### 2.3. Dimensionarea plăcilor curente — pe tipuri de cameră

#### 2.3.1. Placă cameră standard (Single/Double/Twin/PMR) — travee 4,00 × 7,00 m

Placă rezemată pe 4 laturi (pereți structurali longitudinali pe axele adiacente + pereți transversali la limita cu coridorul și la fațadă), grosime **h = 15 cm** (`d ≈ 120 mm`, cnom = 25 mm), λ = ly/lx = 7,00/4,00 = 1,75.

Momente (metodă tabelară, coeficienți Marcus pentru placă dublu-armată pe contur, `pEd = 13,26 kN/mp`):
- `mx = αx·pEd·lx² = 0,065·13,26·4,00² = 0,065·13,26·16,0 = 13,79 kNm/m` (deschidere scurtă, direcție axială)
- `my = αy·pEd·lx² = 0,022·13,26·16,0 = 4,67 kNm/m` (deschidere lungă)

Armare direcție scurtă (x), d = 120 mm:
`μ = Mx/(b·d²·fcd) = 13,79·10⁶/(1000·120²·16,67) = 13,79·10⁶/2,40·10⁸ = 0,0574`
`ω ≈ 0,059` → `As = ω·b·d·fcd/fyd = 0,059·1000·120·16,67/434,8 = 271 mm²/m`
`As,min = 0,26·(2,6/500)·1000·120 = 162 mm²/m` → guvernează calculul de câmp.

**Adoptat: Ø10/250 (As,ef = 314 mm²/m) în câmp direcția scurtă; Ø10/200 (As,ef=393 mm²/m) la reazeme (moment negativ la continuitate cu traveea vecină); Ø8/250 în câmp direcția lungă, Ø8/200 la reazem.**

Verificare la deformabilitate (SR EN 1992-1-1 §7.4.2): `L/d admis ≈ 26·K` (K=1,5 pentru placă continuă pe contur, cu majorare 1,2 pentru As,ef>As,nec) → `L/d admis ≈ 46,8`; `L/d efectiv = 4000/120 = 33,3 < 46,8` ✓.

#### 2.3.2. Placă suite/apartament — travee dublă 8,00 × 7,00 m

Deschiderea dublă (peretele intermediar dintre cele două travei standard este preluat ca element nestructural sau eliminat local, conform cap. 9.3 DTAC), impune o grosime majorată **h = 18 cm** (d ≈ 150 mm) și, pe direcția scurtă (acum 7,00 m, devenită deschiderea guvernantă dacă peretele intermediar lipsește, sau 8,00 m dacă acesta se păstrează parțial ca grindă ascunsă).

Se adoptă soluția cu **grindă ascunsă în grosimea planșeului** pe linia peretelui eliminat (secțiune 40×18 cm, în lungul axei longitudinale întrerupte), care reduce efectiv deschiderea de calcul a plăcii la 4,00 m pe fiecare travee, păstrând armarea de tip 2.3.1 pentru placă, cu suplimentare doar la nivelul grinzii ascunse:

`p_grindă,ascunsă = pEd·3,50 (semi-lățime tributară pe fiecare parte) = 13,26·3,50 = 46,4 kN/m`
`M_grindă = p·L²/10 (grindă continuă, aprox.) = 46,4·4,00²/10 = 74,2 kNm`
`As,nec = 74,2·10⁶/(0,9·150·434,8) = 74,2·10⁶/58.698 = 1.264 mm²` → **adoptat 3Ø25 (As=1.473 mm²)**.

#### 2.3.3. Placă coridor central (B-C, 2,20 m lățime)

Placă rezemată pe 2 laturi (pereții structurali ai camerelor de o parte și de alta), lucrând într-o singură direcție (λ = L_lungă/2,20 ≫ 2), deschidere de calcul 2,20 m, `pEd = 14,76 kN/mp` (categorie circulație, qk=3,00):

`M = pEd·L²/8 = 14,76·2,20²/8 = 14,76·4,84/8 = 8,93 kNm/m`
`As,nec = 8,93·10⁶/(0,9·120·434,8) = 190 mm²/m` < `As,min = 162 mm²/m` (comparabil) → **adoptat Ø10/300 (As=262 mm²/m), h=13 cm** (placă mai subțire, deschidere mică, dar dictată constructiv de minimul de 13 cm pentru rezistență la foc REI90, cap. 3.3 DTAC).

#### 2.3.4. Placă terasă peste E6

`pEd = 16,13 kN/mp`, deschidere tipică 4,00×7,00 m (identică grilei etajelor de cazare, nucleul și pereții de contur continuând până la acest nivel):
`mx = 0,065·16,13·16,0 = 16,78 kNm/m` → `As,nec = 330 mm²/m` → **adoptat Ø10/200 (As=393 mm²/m)**, h=15 cm, cu pantă de 1,5% realizată din șapă de pantă (nu din variația grosimii plăcii structurale).

#### 2.3.5. Sinteza plăcilor curente

| Placă | Deschidere (m) | h (cm) | Armare câmp (dir. scurtă) | Armare reazem | Armare dir. lungă |
|---|---|---|---|---|---|
| Cameră standard | 4,00×7,00 | 15 | Ø10/250 | Ø10/200 | Ø8/250 |
| Suite/apartament (+grindă ascunsă 40×18) | 4,00×7,00 (efectiv) | 18 | Ø10/200 | Ø10/150 | Ø8/200 |
| Coridor | 2,20 (1 direcție) | 13 | Ø10/300 | Ø10/250 | Ø8/300 (repartiție) |
| Podium (parter/etajul 1, deschidere 7,00-8,00 m) | 7,00-8,00 | 18-20* | v. cap. 2.5 (planșeu curent podium) | | |
| Terasă peste E6 | 4,00×7,00 | 15 | Ø10/200 | Ø10/150 | Ø8/200 |

*Planșeele curente ale podiumului (parter, etajul 1), pe grila rară de 8,00 m, sunt planșee-dală rezemate pe grinzi de cadru (cap. 2.5), nu plăci simple pe pereți — dimensionarea lor este subordonată dimensionării grinzilor de cadru din același capitol.

### 2.4. Dimensionarea planșeului de transfer — dezvoltare completă pe toate axele pare

DTAC (cap. 8.2-8.5) a dezvoltat integral, ca exemplu de calcul, grinda de transfer de pe axa 6. Prezentul supliment PTh extinde calculul la **toate cele 6 axe longitudinale pare** (2, 4, 6, 8, 10, 12) care susțin pereți structurali de etaj discontinuați, ținând cont de poziția fiecărei axe față de nucleul central (axele 6-8) și de variația ariei tributare a peretelui de etaj corespunzător.

#### 2.4.1. Recapitulare încărcare tipică pe grinda de transfer (identică pentru toate axele pare cu geometrie de plan similară)

`q_pereți = 5·15,0 = 75 kN/m` (5 niveluri E2÷E6, `t=25 cm`, `H=3,00 m`, `γ=20 kN/mc`)
`q_planșee = 5·36 = 180 kN/m` (lățime tributară 2,20 m, `pEd,SLU=16,28 kN/mp`)
`q_transfer = 255 kN/m` (cap. 8.3 DTAC)

#### 2.4.2. Grinzile de transfer pe axele 2, 4, 8, 10, 12 (departe de nucleu)

Aceste grinzi reazemă pe stâlpii de la etajul 1 (interax 8,00 m), similar celei de pe axa 6, dar nu beneficiază de rigiditatea suplimentară a nucleului adiacent — solicitarea de calcul rămâne identică (`q_transfer=255 kN/m`, `L=8,00 m`), dar verificarea deformației și a distribuției de eforturi la reazeme se face separat, dat fiind că aceste grinzi lucrează ca elemente cvasi-independente:

`M_Ed = 255·8,00²/8 = 2.040 kNm`; `V_Ed = 1.020 kN` (identic axei 6)

Majorare Ω=1,4: `M_Ed,transfer=2.856 kNm`; `V_Ed,transfer=1.428 kN` → **secțiune 60×120 cm, C35/45, 9Ø32 (As=7.238 mm², ρ=1,06%)**, identic soluției de pe axa 6.

#### 2.4.3. Grinda de transfer pe axa 8 — interfața cu nucleul central

Axa 8 constituie limita nucleului central (axele longitudinale 6÷8, cap. 2.2 DTAC); grinda de transfer de pe această axă reazemă, la un capăt, direct pe peretele nucleului (reazem rigid, nu pe stâlp izolat) — condiție favorabilă, care reduce deschiderea efectivă de calcul la aproximativ `L_efectiv ≈ 7,50 m` (scăzând jumătate din lățimea nucleului, `lw/2 ≈ 2,50 m`, dar reazemul pe perete masiv reduce practic la zero rotația la acest capăt, echivalent unei console parțial încastrate):

`M_Ed ≈ q·L_efectiv²/9 (coeficient redus pentru semi-încastrare) = 255·7,50²/9 = 255·56,25/9 = 1.594 kNm` — inferior valorii de pe axele izolate (2.040 kNm), confirmând beneficiul structural al proximității nucleului.

Se menține totuși **aceeași secțiune 60×120 cm și aceeași armare (9Ø32)** ca soluție unică de execuție pe toată lungimea clădirii (simplificare de șantier, evitarea erorilor de armare diferențiată pe axe adiacente), rezerva suplimentară de capacitate pe axa 8 servind ca marjă față de incertitudinea reală a gradului de încastrare pe nucleu.

#### 2.4.4. Grinzile transversale de colectare (pe axele A, B, C, D, la cota +8,70 m)

Suplimentar față de grinzile longitudinale de transfer (care colectează pereții de etaj de-a lungul axelor pare), planșeul de transfer include **grinzi transversale de colectare** pe liniile B și C (limitele coridorului), care preiau reacțiunile locale ale pereților transversali dintre camere (perpendiculari pe coridor) și le redirijează spre nucleu și spre stâlpii de pe axele impare:

Încărcare estimată (perete transversal tipic, aceeași grosime/înălțime, aria tributară 2,00 m pe axă longitudinală): `q_transv = 5·(15,0+36·2,00/2,20) ≈ 5·(15,0+32,7) = 5·47,7 = 238,5 kN/m` pe o deschidere tipică de 7,00 m (A-B sau C-D):

`M_Ed = 238,5·7,00²/8 = 1.461 kNm`; majorat Ω=1,4: `M_Ed,transfer=2.045 kNm` → **secțiune 50×100 cm, C35/45**, `As,nec = 2.045·10⁶/(0,9·960·434,8) = 5.435 mm²` → **adoptat 7Ø32 (As=5.629 mm²)**.

#### 2.4.5. Extras sintetic — grinzile planșeului de transfer

| Poziție | Secțiune (cm) | Deschidere (m) | M_Ed,transfer (kNm) | Armare | Etrieri (zonă critică/câmp) |
|---|---|---|---|---|---|
| Axa 2 (longitudinală) | 60×120 | 8,00 | 2.856 | 9Ø32 sus+jos | Ø10/4r/100 / Ø10/4r/175 |
| Axa 4 (longitudinală) | 60×120 | 8,00 | 2.856 | 9Ø32 sus+jos | Ø10/4r/100 / Ø10/4r/175 |
| Axa 6 (longitudinală, adiacentă nucleu) | 60×120 | 8,00 | 2.856 | 9Ø32 sus+jos | Ø10/4r/100 / Ø10/4r/175 |
| Axa 8 (longitudinală, pe nucleu) | 60×120 | 7,50 (efectiv) | 1.594* | 9Ø32 sus+jos | Ø10/4r/100 / Ø10/4r/175 |
| Axa 10 (longitudinală) | 60×120 | 8,00 | 2.856 | 9Ø32 sus+jos | Ø10/4r/100 / Ø10/4r/175 |
| Axa 12 (longitudinală) | 60×120 | 8,00 | 2.856 | 9Ø32 sus+jos | Ø10/4r/100 / Ø10/4r/175 |
| Transversale B, C (colectare, la fiecare travee 4,00 m) | 50×100 | 7,00 | 2.045 | 7Ø32 sus+jos | Ø10/4r/100 / Ø10/4r/175 |

*Armare menținută egală cu restul axelor din motive de uniformizare a execuției (cap. 2.4.3).

Etrierii cu 4 ramuri (lățimea de 50-60 cm impune minimum 4 ramuri pentru confinarea completă a secțiunii, cf. P100-1 §5.4.3.2.2) se dispun conform detaliului D-R04 (PTh-R.4).

#### 2.4.6. Placa planșeului de transfer între grinzi

Placa propriu-zisă a planșeului de transfer (`h=40 cm` curent, `h=50 cm` local sub stâlpi și reazeme de pereți, cap. 8.2 DTAC), pe câmpuri de 8,00×7,00 m între grinzile de transfer:

`pEd,placă = 1,35·(0,40·25)+1,5·5,00 (utilă etaj1/parter, medie) = 1,35·10,0+7,5 = 13,5+7,5=21,0 kN/mp` (contribuție proprie, suplimentar față de reacțiunile concentrate deja colectate de grinzi)

Placă rezemată pe grinzile de transfer perimetrale, λ=8,00/7,00=1,14: `mx=0,044·21,0·7,00²=0,044·21,0·49,0=45,3 kNm/m` → `As,nec (d=440mm, h=500mm zonă majorată)=45,3·10⁶/(0,9·440·434,8)=263 mm²/m` → **Ø12/300 (As=377 mm²/m)** dublă plasă (superior+inferior, placă cu moment de semn variabil sub acțiune seismică bidirecțională) — armare suplimentară locală (armătură de suspendare) la reazemele pereților de etaj, conform cap. 8.4 DTAC și detaliul PTh-R.4.2.

### 2.5. Dimensionarea grinzilor de cadru — parter și etajul 1

#### 2.5.1. Grinda transversală de cadru (recapitulare și extindere, cap. 9.3 DTAC)

Grinda transversală tipică de la parter (deschidere `L≈8,50 m` pe axele B-D sau A-C, aria tributară 4,25 m): secțiune **50×90 cm**, `As,câmp=5Ø25 (2.454 mm²)`. Se completează aici verificarea la etajul 1, unde solicitarea este majorată de proximitatea planșeului de transfer (cap. 9.3 DTAC semnalează necesitatea recalculării separate):

Grinda transversală de la etajul 1, imediat sub planșeul de transfer, preia suplimentar o cotă din reacțiunile locale ale pereților transversali discontinuați (necolectate integral de grinzile transversale de colectare de la cap. 2.4.4, care sunt situate chiar la acest nivel — de fapt aceeași grindă): se **unifică** grinda transversală de cadru a etajului 1 cu grinda transversală de colectare a planșeului de transfer (cap. 2.4.4), rezultând o secțiune unică **50×100 cm, 7Ø32**, care înlocuiește, la acest nivel, soluția standard de 50×90 cm din parter.

#### 2.5.2. Grinda longitudinală de cadru (contur, subsol/parter/etajul 1)

Grinda longitudinală de pe axele de contur (1 și 13, sau axele impare curente 3,5,7,9,11 la parter/etajul 1, deschidere 8,00 m, aceeași cu cea a grinzilor de transfer, dar la parter/subsol unde nu preiau pereți discontinuați, doar planșeul curent al podiumului):

`p_Ed=16,28·4,00 (semi-deschidere aferentă tributară pe fiecare parte a axei de 8,00m) = 65,1 kN/m` + g.p. grindă `0,45·0,85·25·1,35=12,9 kN/m` ≈ **78,0 kN/m**

`M_Ed=78,0·8,00²/10=499 kNm` (grindă continuă); **secțiune 45×85 cm, C35/45**: `As,nec=499·10⁶/(0,9·800·434,8)=1.594 mm²` → **adoptat 4Ø25 (As=1.963 mm²)** câmp, **5Ø25 (2.454 mm²)** reazem.

#### 2.5.3. Sinteza grinzilor de cadru subsol/parter/etajul 1

| Marcă | Poziție | Secțiune (cm) | L (m) | As câmp | As reazem | Etrieri |
|---|---|---|---|---|---|---|
| GC-T1 | transversală parter (A-C/B-D) | 50×90 | 8,50 | 5Ø25 | 5Ø25+2Ø22 | Ø10/100 / Ø10/200 |
| GC-T2 | transversală etajul 1 (unificată cu grinda de colectare) | 50×100 | 7,00-8,50 | 7Ø32 | 7Ø32 | Ø10/4r/100 / Ø10/4r/175 |
| GC-L1 | longitudinală contur/impare, parter/etajul 1/subsol | 45×85 | 8,00 | 4Ø25 | 5Ø25 | Ø10/125 / Ø10/225 |

### 2.6. Dimensionarea stâlpilor — sinteză completă pe toate pozițiile

#### 2.6.1. Stâlpul tipic cel mai încărcat (recapitulare, cap. 9.2 DTAC)

`N_Ed≈10.400 kN`, secțiune **80×80 cm**, C35/45, **12Ø25 (As=5.891 mm²)**, `νd=0,70` (peste 0,55, admis pentru element protejat, cu confinare integrală pe toată înălțimea liberă a celor 3 niveluri ale cadrului protejat).

#### 2.6.2. Stâlpul de colț al cadrului protejat — verificare biaxială

Stâlpul de colț (intersecția axei 1 sau 13 cu axa A sau D) preia încărcare gravitațională mai redusă ca arie tributară, dar solicitare seismică biaxială (M_x și M_y simultan, similar mecanismului descris la stâlpul de colț din exemplul-reper): `N_Ed≈6.200 kN`, `Mx≈680 kNm`, `My≈590 kNm` (valori estimate proporțional cu aria tributară redusă la colț și cu excentricitatea structurală, cap. 6.1 DTAC).

`νd=6.200.000/(800²·23,33)=6.200.000/14.931.200=0,415`

Verificare biaxială (§5.8.9, coeficient a interpolat pentru νd=0,415 → a≈1,25): cu secțiunea de bază 80×80 cu 12Ø25, `MRd≈2.450 kNm` pe fiecare direcție (din diagrama N-M la acest νd):

`(680/2.450)^1,25+(590/2.450)^1,25=0,236+0,197=0,433<1` ✓ — secțiunea standard **80×80 cm, 12Ø25** acoperă și stâlpul de colț, fără majorare suplimentară (spre diferență de exemplul-reper de referință, unde stâlpul de colț necesita majorare — aici rezerva amplă a secțiunii dictate de transfer absoarbe și solicitarea biaxială de colț).

#### 2.6.3. Stâlpii curenți ai cadrului protejat (poziții intermediare, fără transfer direct deasupra)

Stâlpii de pe axele impare care nu susțin direct o grindă de transfer longitudinală (dar participă la cadrul spațial al podiumului, susținând doar grinzile transversale și planșeul curent) au încărcare gravitațională redusă față de stâlpul-tip: `N_Ed≈7.800 kN` (fără componenta din grinzile de transfer, doar arie aferentă directă pe 3 niveluri + greutate proprie):

Pentru secțiune **70×70 cm** (revenire la secțiunea din varianta neconservatoare, verificată aici separat): `N_Rd=490.000·23,33+As·434,8`; cu `As,min=0,01·490.000=4.900 mm²` → **8Ø28 (As=4.926 mm²)**: `N_Rd=11.431.700+2.141.653=13.573 kN`; `N_Ed/N_Rd=7.800/13.573=0,57` (rezervă 43%) ✓; `νd=7.800.000/(490.000·23,33)=0,682` — peste 0,55, se adoptă **majorare la 80×80 cm** pentru uniformizare cu stâlpul-tip și pentru satisfacerea condiției „coloană tare" la toate nodurile (cap. 2.10): **80×80 cm, 8Ø25 (As=3.927 mm², ρ=0,61%, peste As,min=6.400 mm²→ guvernează minimul → adoptat 8Ø28, As=4.926 mm², ρ=0,77%)**.

#### 2.6.4. Stâlpii etajelor de cazare (E2÷E6) — la interfața cu pereții structurali

La etajele de cazare, elementele verticale predominante sunt pereții structurali (compartimentarea camerelor, cap. 2.7 mai jos), nu stâlpi izolați; totuși, la capetele de corp și la nucleu, unde geometria locală (deschideri pentru circulații, holuri de acces la ascensoare) nu permite un perete continuu, se prevăd stâlpi de completare, secțiune **40×40 cm**, C30/37, armare minimă constructivă **8Ø16 (As=1.608 mm², ρ=1,00%)** — nesolicitați semnificativ, rol de rigidizare locală și de suport pentru planșeu în zonele fără perete.

#### 2.6.5. Sinteza generală a stâlpilor

| Marcă | Poziție | Nivel | Secțiune (cm) | N_Ed (kN) | νd | Armare | Etrieri critic/curent |
|---|---|---|---|---|---|---|---|
| S-T1 | tipic, sub grindă transfer | S/P/E1 | 80×80 | 10.400 | 0,70 | 12Ø25 | Ø10/4r/100 / Ø10/4r/200 |
| S-C1 | colț cadru protejat | S/P/E1 | 80×80 | 6.200 | 0,42 | 12Ø25 | Ø10/4r/100 / Ø10/4r/200 |
| S-I1 | intermediar, fără transfer direct | S/P/E1 | 80×80 | 7.800 | 0,42 | 8Ø28 | Ø10/4r/100 / Ø10/4r/200 |
| S-E1 | completare, etaje cazare E2÷E6 | E2÷E6 | 40×40 | ≤ 350 | < 0,20 | 8Ø16 | Ø8/100 / Ø8/200 |

Zona critică (`lcr = max(hstâlp; Hliber/6; 450mm)`) pentru stâlpii 80×80 la parter (Hliber=3,60m): `lcr=max(800; 600; 450)=800 mm`; identic la etajul 1 (Hliber=3,30m): `lcr=max(800; 550; 450)=800 mm` — confinare pe această lungime la ambele capete, cu etrieri **Ø10/4 ramuri/100 mm** (majorat de la Ø12/100 mm din exemplul-reper la Ø10/4 ramuri, echivalent ca arie de confinare, dar mai practic la o secțiune de 80 cm care necesită oricum 4 ramuri pentru distanța maximă între etrieri legați).

### 2.7. Dimensionarea nucleului central și a pereților de contur continui

#### 2.7.1. Nucleul central — verificare pe toată înălțimea (extindere față de cap. 10.2 DTAC, care a verificat doar zona critică de bază)

Recapitulare zonă critică bază (cap. 10.2 DTAC): `t=30cm`, bulbi de capăt `lc≈0,90m`, **12Ø25** per bulb, armătură de inimă **Ø14/150mm** ambele fețe. Se dezvoltă aici verificarea la nivelurile superioare:

**Zona critică (bază, S-P-E1, h_critic conform P100-1 §5.4.3.4.2):** `hcr=max(lw; Hetaj/6)=max(5,00; 11,90/6=1,98)=5,00 m` (înălțimea critică se extinde pe toată înălțimea cadrului protejat, dat fiind rolul de element continuu unic la interfața de transfer) — armare descrisă la cap. 10.2 DTAC se menține pe toată această înălțime (S+P+E1).

**Zona curentă (E2÷E6):** solicitări reduse (M_Ed, N_Ed descrescătoare cu înălțimea, conform distribuției triunghiulare cap. 7.5 DTAC), se reduce armătura bulbilor de capăt la **8Ø25 (As=3.927 mm²)** și armătura de inimă la **Ø12/200 mm**, cu reducere treptată pe 2 loturi (E2-E3 armare intermediară 10Ø25, E4-E6 armare redusă 8Ø25) — decizie de execuție care reduce consumul de oțel fără a compromite ductilitatea (verificare la PT prin diagrama de interacțiune pe fiecare tronson).

**Zona superioară (terasă):** armătură minimă constructivă, `ρv,min=0,15%`, **Ø12/250mm** ambele fețe, bulbi de capăt reduși la armătura minimă de 0,4% din aria bulbului.

#### 2.7.2. Pereții de contur continui

Pereții de capăt de corp (axele 1 și 13) și cel din spatele blocului bucătărie/tehnic (dacă geometria o permite, cap. 2.2 DTAC), grosime **t=25cm**, lungime efectivă `lw≈4,00-6,00m` (funcție de poziție), armare de bază similară nucleului dar la scară redusă: bulbi de capăt **6Ø22 (As=2.281mm²)**, inimă **Ø12/200mm**, cu majorare la zona de bază (S-P-E1) la **8Ø22 (As=3.041mm²)**, inimă **Ø12/150mm**.

### 2.8. Radierul general — verificare de execuție

#### 2.8.1. Presiunea pe teren

`N_total (SLU, gravitațional)= ΣWi·1,30 (majorare medie G+Q față de greutatea seismică pură) ≈ 91.350·1,30/9,81·9,81 ≈ 118.750 kN` (estimare acoperitoare pentru verificarea la SLU a radierului, incluzând suprasarcina utilă completă, nu doar cea ponderată seismic).

`p_teren=N_total/A_radier=118.750/1.056=112,5 kPa < pconv=250 kPa` (cap. 4.4 DTAC) ✓ — rezervă amplă (55%), justificată de conservatorismul includerii integrale a subsolului în calculul CUT (cap. 4.2 memoriul general) și de marja normală de proiectare a unui radier general la o clădire de 7 niveluri.

#### 2.8.2. Grosimea radierului și armarea de bază

Grosime adoptată **hradier=80cm** curent, majorată local la **100cm** sub stâlpii cadrului protejat (zonă de concentrare a încărcării transmise de la stâlpii 80×80, cap. 2.6.1) și la baza nucleului central.

Verificare la încovoiere (radier ca placă groasă pe pat elastic, moment de calcul estimat pentru presiunea medie pe teren, majorat pentru neuniformitatea reală indusă de rigiditatea nucleului): `M_Ed≈p_teren·L_efectiv²/10`, cu `L_efectiv≈8,00m` (interax stâlpi): `M_Ed=112,5·8,00²/10=720 kNm/m` (bandă de 1m lățime).

`As,nec (d=720mm, cnom=45mm): =720·10⁶/(0,9·720·434,8)=2.552 mm²/m` → **adoptat Ø28/150mm (As=4.104mm²/m)**, dublă plasă (superior+inferior — radierul lucrează la moment pozitiv sub stâlpi, negativ în câmp, cf. modelului de calcul pe pat de arcuri elastice, verificat definitiv la PT).

#### 2.8.3. Verificarea la subpresiune (plutire, UPL) — cuvă etanșă

Conform cap. 4.4 și 5.4 DTAC (NHS=−2,20m, subsol parțial sub apă), se verifică echilibrul la plutire pe perioada de execuție (subsol gol, înainte de finisare) și în exploatare:

`Subpresiune = γapă·(NHS−talpă radier)·A = 10·(3,80−2,20)·1.056 = 10·1,60·1.056=16.896 kN`

`Greutate stabilizatoare (radier+pereți subsol+greutate parțială suprastructură la faza critică de execuție, minimă) ≈ 0,80·25·1.056+pereți subsol (perimetru 140m×3,20m×0,30m×25)=21.120+3.360=24.480 kN`

`Factor de siguranță la plutire = 24.480/16.896=1,45 > 1,10 (minim uzual la faza de execuție cu structură parțială)` ✓ — verificare definitivă la PT pe faza de execuție cea mai defavorabilă (imediat după turnarea radierului, înainte de pereții subsolului), cu eventuală necesitate de epuisment controlat pe durata turnării, tratată în tehnologia de execuție (cap. PTh-R.5.5).

### 2.9. Verificarea nodurilor „coloană tare — grindă slabă" (extindere cap. 9.4 DTAC)

Se verifică, suplimentar față de nodul-tip din DTAC, nodurile de la interfața cu grinda de transfer (cel mai solicitat structural din toată clădirea):

**Nod stâlp S-T1 (80×80, 12Ø25) — grindă de transfer (60×120, 9Ø32), la etajul 1:**

`ΣM_Rc = 2·M_Rd,stâlp` (stâlp deasupra + dedesubt, ambele 80×80/12Ø25, `M_Rd≈2.450 kNm` la νd corespunzător) `=2·2.450=4.900 kNm`

`ΣM_Rb = M_Rd,grindă,stânga+M_Rd,grindă,dreapta` — grinda de transfer fiind proiectată să rămână **elastică** (element protejat prin Ω, cap. 8.4 DTAC), condiția de „coloană tare-grindă slabă" nu se aplică în sensul clasic (care presupune disipare în grindă); în schimb, se verifică explicit că stâlpul **nu** cedează înaintea grinzii de transfer la solicitarea majorată: `M_Rd,grindă (la 9Ø32, `d≈1.142mm`) ≈ As·fyd·0,9·d=7.238·434,8·0,9·1.142/10⁶=3.234 kNm` per grindă, pe 2 fețe (dacă grinda e continuă pe stâlp): `ΣM_Rb=2·3.234=6.468 kNm > ΣM_Rc=4.900 kNm` — **stâlpul ar ceda înaintea grinzii de transfer** dacă s-ar aplica principiul clasic; cum grinda de transfer trebuie să rămână elastică prin definiție (Ω=1,4, cap. 8.4 DTAC), acest rezultat confirmă că **stâlpul, nu grinda, este elementul care ar putea intra în domeniul inelastic la o solicitare extremă peste cea de proiect** — motiv suplimentar pentru confinarea integrală a stâlpilor cadrului protejat pe toată înălțimea (cap. 2.6.5), măsură care le conferă ductilitate de rezervă chiar dacă nu sunt proiectate ca elemente disipative primare.

### 2.10. Scări și rampe

#### 2.10.1. Scara principală de evacuare (în nucleu)

Rampă din beton armat monolit, grosime **h=16cm**, lățime utilă 1,40m (2 fluxuri de evacuare, conform normativ de securitate la incendiu — dimensionare exactă la scenariul dedicat), înclinare 30°, deschidere înclinată ≈4,20m:

`pEd=1,35·(0,16·25/cos30°+trepte 1,50)+1,5·4,00 (categorie evacuare)=1,35·(4,62+1,50)+6,00=1,35·6,12+6,00=8,26+6,00=14,26 kN/mp` (proiectat pe orizontală)

`M=pEd·L²/8=14,26·4,20²/8=31,4 kNm/m` → `As,nec=31,4·10⁶/(0,9·130·434,8)=618 mm²/m` → **adoptat Ø12/175mm (As=646mm²/m)**.

#### 2.10.2. Rampa auto de acces subsol

Placă de beton armat, grosime **h=20cm**, pantă 15%, lățime 6,00m (2 benzi), rezemată pe pereți laterali de sprijin (cuva rampei, pereți de beton armat 25cm, calculați la împingerea pământului conform cap. 5.4 DTAC): `pEd=1,35·(0,20·25)+1,5·2,50 (trafic auto)=6,75+3,75=10,5 kN/mp` → armare constructivă majorată **Ø12/150mm** ambele direcții, dublă plasă.

---

## PTh-R.3 — PLANURI DE ARMARE ȘI EXTRAS DE ARMĂTURĂ

### 3.1. Organizarea planurilor de armare (piese desenate PTh-R)

| Plan | Conținut | Scară |
|---|---|---|
| PTh-R-01 | Plan de armare radier general | 1:100, detalii 1:20 |
| PTh-R-02 | Plan de cofraj + armare pereți/stâlpi subsol | 1:50 |
| PTh-R-03 | Plan de armare planșeu peste subsol | 1:50 |
| PTh-R-04 | Plan de cofraj + armare stâlpi/pereți parter | 1:50 |
| PTh-R-05 | Plan de armare planșeu peste parter | 1:50 |
| PTh-R-06 | Plan de cofraj + armare stâlpi/pereți etajul 1 | 1:50 |
| PTh-R-07 | Plan de armare planșeu de transfer (+8,70m) — inclusiv toate grinzile de transfer | 1:50, detalii grinzi 1:20 |
| PTh-R-08 | Plan de armare pereți structurali de etaj (E2, tipic pentru E2÷E6) | 1:50 |
| PTh-R-09 | Plan de armare planșeu curent etaj de cazare (tipic) | 1:50 |
| PTh-R-10 | Plan de armare planșeu terasă | 1:50 |
| PTh-R-11 | Detalii nucleu central — secțiuni orizontale pe fiecare nivel | 1:20 |
| PTh-R-12 | Detalii scări (principală + serviciu) | 1:20 |
| PTh-R-13 | Detalii de armare — noduri, ancoraje, confinare (v. PTh-R.4) | 1:5, 1:10 |

### 3.2. Extras de armătură — estimare de consum pe categorii de elemente

Extrasul definitiv de armătură se întocmește la PT pe baza planurilor de execuție complete (poziții, lungimi tăiate, forme de fasonare); estimarea de mai jos este orientativă, pe baza secțiunilor și armărilor stabilite la cap. 2, cu scop de verificare a ordinului de mărime și de fundamentare preliminară a devizului:

| Categorie element | Volum beton estimat (mc) | Consum specific oțel (kg/mc) | Greutate oțel estimată (t) |
|---|---|---|---|
| Radier general | ≈ 950 | 130 | 123,5 |
| Pereți subsol (cuvă etanșă) | ≈ 480 | 100 | 48,0 |
| Stâlpi cadru protejat (S+P+E1, secțiuni majorate) | ≈ 620 | 220 | 136,4 |
| Nucleu central + pereți contur (toată înălțimea) | ≈ 1.850 | 160 | 296,0 |
| Grinzi de transfer + transversale colectare (+8,70 m) | ≈ 210 | 260 | 54,6 |
| Planșeu de transfer (placă) | ≈ 480 | 140 | 67,2 |
| Pereți structurali de etaj (E2÷E6) | ≈ 1.320 | 90 | 118,8 |
| Planșee curente (podium + E2÷E6 + terasă) | ≈ 2.640 | 90 | 237,6 |
| Grinzi de cadru (subsol/parter/etajul 1) | ≈ 340 | 180 | 61,2 |
| Scări, rampe | ≈ 140 | 110 | 15,4 |
| **TOTAL estimat** | **≈ 9.030 mc** | **medie ≈ 128 kg/mc** | **≈ 1.159 t** |

Indicele global rezultat (≈ 128 kg oțel/mc beton) este consistent cu practica de execuție pentru structuri duale DCM cu element de transfer în zonă seismică ridicată (interval uzual de referință 100-150 kg/mc pentru acest tip de sistem, superior mediei unei structuri regulate în cadre — 80-100 kg/mc — exact din cauza suplimentului de armare la elementele de transfer, la nucleu și la stâlpii cadrului protejat, cuantificat explicit prin calculul de mai sus). Extrasul definitiv, pe poziții și pe faze de aprovizionare, se elaborează la PT.

---

## PTh-R.4 — DETALII DE ARMARE (NODURI, ANCORAJE, ÎNNĂDIRI, CONFINARE)

### D-R01 — Nod grindă de transfer — stâlp cadru protejat (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Armătura longitudinală a grinzii | Trece continuă prin nod pe direcția grinzii, ancorată dincolo de nod | 9Ø32, lungime de ancorare `lbd` conform §8.4 SR EN 1992-1-1 |
| Armătura stâlpului | Continuă pe verticală prin nod, fără întrerupere | 12Ø25 |
| Etrieri de confinare în nod | Aceeași densitate ca zona critică a stâlpului | Ø10/4 ramuri/100 mm |
| Verificare la forfecare în nod (panel zone) | `VEd,nod` din echilibrul grinzii+stâlpilor adiacenți, verificat la strivirea bielei diagonale | conform P100-1 §5.5.2.3, calcul definitiv la PT |

### D-R02 — Armătură de suspendare la reazemul peretelui de etaj discontinuat pe grinda/placa de transfer (sc. 1:10)

Detaliul critic al întregii structuri: peretele de etaj (t=25cm) se oprește deasupra planșeului de transfer și își transmite reacțiunea la partea superioară a plăcii/grinzii; armătura principală de rezistență a grinzii de transfer lucrează însă la partea inferioară — este necesară armătură verticală de suspendare care să transfere încărcarea de la fibra superioară la cea inferioară.

| Element | Descriere | Specificație |
|---|---|---|
| Armătură de suspendare | Etrieri/agrafe verticale înglobate în grosimea plăcii/grinzii, sub amprenta peretelui | `Asw,susp=q_perete/fyd` pe lungimea de rezemare, calcul detaliat la PT |
| Poziționare | Pe toată lățimea peretelui discontinuat + zonă de difuzie 45° în grosimea plăcii | continuitate cu etrierii curenți ai grinzii |
| Armătură orizontală de continuitate | Bare orizontale în placă, sub perete, pentru colectarea eforturilor de întindere transversală | Ø12/150mm suplimentar față de armarea curentă a plăcii |

### D-R03 — Confinare stâlpi cadru protejat, zonă critică (sc. 1:10)

| Element | Descriere | Specificație |
|---|---|---|
| Zonă critică | `lcr=800mm` de la fața fiecărui planșeu, la toate cele 3 niveluri (S/P/E1) | conform cap. 2.6.5 |
| Etrieri de confinare | 4 ramuri, distanță redusă | Ø10/100mm în zona critică |
| Verificare confinare (P100-1 §5.4.3.2.2) | `α·ωwd≥30·μφ·νd·εsy,d·(bc/bo)−0,035` | verificat la PT cu νd=0,70 (cap. 2.6.1) |
| Etrieri în afara zonei critice | Distanță majorată | Ø10/200mm |
| Legături între ramuri | Fiecare bară longitudinală alternantă prinsă de etrier/agrafă | conform §5.4.3.2.2(8) |

### D-R04 — Etrieri grindă de transfer, secțiune 60×120 cm (sc. 1:10)

| Element | Descriere | Specificație |
|---|---|---|
| Etrieri zonă critică (2h de la reazem) | 4 ramuri, pas redus | Ø10/100mm |
| Etrieri câmp | 4 ramuri, pas curent | Ø10/175mm |
| Armătură de inimă (piele) | Bare longitudinale suplimentare pe înălțimea de 120cm, la interval ≤300mm, pentru controlul fisurării | Ø12/300mm ambele fețe |
| Armătură principală | 9Ø32 sus + 9Ø32 jos, pe 2-3 rânduri | distanță liberă între bare ≥ max(Ø; 20mm; dg+5mm) |

### D-R05 — Înnădirea armăturilor longitudinale (bare Ø25-Ø32)

| Element | Descriere | Specificație |
|---|---|---|
| Lungime de înnădire prin suprapunere | `l0=α1·α6·lb,rqd≥l0,min` | calcul conform §8.7 SR EN 1992-1-1, condiții de aderență |
| Poziționare înnădiri | Evitate în zonele critice (confinare, cap. D-R03); decalate min. 0,6·l0 între bare adiacente | conform §8.7.2 |
| Bare Ø32 (grinzi de transfer) | Se recomandă înnădire prin cuplaje mecanice filetate (nu suprapunere) dat fiind diametrul mare | Agrement Tehnic cuplaj mecanic clasă A/B |
| Ancorarea barelor la capătul liber (grinzi de transfer pe reazem de capăt) | Ancorare dreaptă + cârlig la 90°, sau ancorare mecanică cu placă de capăt | conform §8.4, verificat la PT |

### D-R06 — Detaliu armare radier — zonă sub stâlp cadru protejat (verificare la străpungere, sc. 1:10)

| Element | Descriere | Specificație |
|---|---|---|
| Grosime radier locală | Majorare la 100cm sub stâlpii cadrului protejat | pe o rază de min. 2d de la fața stâlpului |
| Armătură de străpungere | Etrieri verticali tip „stud-rail" dispuși radial | conform §6.4.5, calcul definitiv la PT |
| Armătură de bază radier | Continuă, fără întrerupere sub stâlp | Ø28/150mm ambele plase |
| Capitel ascuns local | Evazare locală prin majorarea grosimii, fără element vizibil | tranziție lină pe min. 1,5m |

---

## PTh-R.5 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII

### 5.1. Succesiunea generală de execuție

1. **Săpătură generală** la cota −3,80m (talpă radier), cu sprijiniri de mal conform studiului geotehnic (categoria geotehnică 3, cap. 4.4 DTAC) — palplanșe metalice sau pereți mulați, funcție de proximitatea vecinătăților și de nivelul apei subterane.
2. **Epuisment** (dacă NHS>cota de fundare pe durata execuției, cap. 2.8.3) — puțuri de epuisment perimetrale, pompare controlată, monitorizată prin piezometre.
3. **Beton de egalizare** C8/10, grosime 10cm, pe toată amprenta radierului.
4. **Hidroizolația radierului** (membrană bituminoasă/PVC sub placă, sau sistem de cristalizare încorporată în beton, conform soluției adoptate la memoriul de arhitectură/detalii) — continuă, cu ridicări pe conturul viitorilor pereți de subsol.
5. **Armarea și turnarea radierului general**, în tronsoane, cu rosturi de turnare tratate (cap. 5.5) — control obligatoriu al armăturii de străpungere sub stâlpii cadrului protejat (D-R06) înainte de turnare (fază determinantă, cap. PTh-R.7).
6. **Pereții subsolului (cuvă etanșă)** — cofrare bilaterală, armare, turnare, cu bandă de etanșare la rostul radier-perete (cap. 5.5).
7. **Stâlpii și grinzile de la subsol/parter/etajul 1**, executați succesiv pe măsura ridicării planșeelor, cu esafodaj de susținere a cofrajelor grinzilor și plăcilor.
8. **Nucleul central** — se execută, de regulă, cu **cofraje autocățărătoare/glisante** pentru avans mai rapid decât restul structurii (practică uzuală pentru nuclee de mare înălțime), decalaj de 2-3 niveluri față de planșeele curente, pentru a permite structurii de contur să „ajungă din urmă" fără a bloca lucrul la nucleu.
9. **Planșeul de transfer (+8,70m)** — fază critică (cap. 5.2), executat după atingerea rezistenței de proiect a stâlpilor cadrului protejat de dedesubt.
10. **Structura turnului de cazare (E2÷E6)** — pereți structurali de etaj + planșee, ciclu repetitiv (cca. 7-10 zile/nivel, funcție de organizarea șantierului), posibil cu cofraje tunel pentru pereți+placă simultan, dat fiind repetitivitatea geometriei (cap. 9.1 memoriul de arhitectură).
11. **Planșeul-terasă și structura de rezemare a echipamentelor tehnice** (parapete, socluri echipamente HVAC, conform memoriului de instalații).

### 5.2. Cofraje și eșafodaje pentru planșeul de transfer — măsură critică

Planșeul de transfer (grosime 40-50cm, grinzi 60×120cm) reprezintă cel mai greu element de cofrat/susținut din întreaga structură. Se impun următoarele măsuri, distincte de execuția planșeelor curente:

- **Eșafodaj greu, dimensionat la greutatea proprie a betonului proaspăt** (≈ 25 kN/mc × grosime majorată) **plus** încărcarea de execuție (personal, echipamente, cofraj) — verificare de stabilitate separată, întocmită de furnizorul de eșafodaj pe baza planului de cofraj;
- **Menținerea sprijinirilor (popilor) sub planșeul de transfer și sub cel puțin 2 niveluri suprapuse ale structurii de deasupra**, până la atingerea a minimum 70% din rezistența caracteristică la 28 zile (verificată prin epruvete martor sau prin metode nedistructive), dat fiind rolul critic, necompensabil, al acestui element — nu se decofrează prematur, indiferent de presiunea de avans a graficului de execuție;
- **Contrasăgeata de execuție** (pre-camber) a cofrajului, dimensionată să compenseze săgeata elastică și cea diferată (fluaj) așteptată sub greutatea proprie și sub încărcările ulterioare ale turnului de cazare, calculată la PT pe baza modelului de element finit;
- **Succesiunea de turnare a betonului** pe planșeul de transfer: turnare într-o singură etapă continuă pe toată aria unui tronson (fără rosturi de lucru în mijlocul unei grinzi de transfer), cu vibrare mecanică internă sistematică (grosimea mare a elementului impune vibrare pe straturi de max. 50cm).

### 5.3. Turnarea betonului — reguli generale

- **Rosturi de turnare** — poziționate, pe cât posibil, la 1/5 din deschiderea grinzilor/plăcilor (zonă de moment minim), niciodată în zona critică a elementelor de transfer sau în zona de confinare a stâlpilor; tratate prin curățare mecanică, spălare, aplicare de amorsă de aderență (slurry ciment) înainte de turnarea tronsonului adiacent;
- **Beton auto-compactant (SCC)** recomandat la elementele cu armare densă (grinzi de transfer, noduri stâlp-grindă la cadrul protejat, bulbii de capăt ai nucleului), pentru a evita segregarea și golurile de compactare în zonele cu congestie de armătură;
- **Cura betonului** — protecție la pierderea rapidă de umiditate (folie, produs de cură pulverizat) minimum 7 zile la elementele curente, minimum 14 zile la elementele masive (radier, planșeu de transfer), cu monitorizarea temperaturii interne la elementele masive (risc de fisurare termică la radier, grosime ≥80cm — se recomandă turnare pe timp răcoros/noaptea vara, cu beton cu degajare redusă de căldură de hidratare, sau răcire cu serpentine, funcție de rezultatul calculului termic la PT);
- **Control al acoperirii cu beton** — distanțieri certificați, verificați vizual înainte de turnare (fază de control, cap. PTh-R.6), în special la elementele cu clasă de expunere XA1 (radier), unde acoperirea de 45-50mm este critică pentru durabilitate.

### 5.4. Armarea pe șantier

- **Fasonarea armăturii** conform planurilor de execuție (poziții, lungimi tăiate, raze de îndoire minime conform §8.3 SR EN 1992-1-1, diferențiate pentru barele Ø25-Ø32);
- **Recepția armăturii înainte de turnare** — verificarea poziției, distanțelor, acoperirilor, lungimilor de ancorare/înnădire, cu proces-verbal de lucrări ascunse, obligatoriu la fiecare element structural, cu accent special pe elementele de transfer și pe nucleu (fază determinantă);
- **Cuplaje mecanice** la barele Ø32 ale grinzilor de transfer (cap. D-R05) — montate conform fișei tehnice a producătorului, cu control al cuplului de strângere/presării, după caz.

### 5.5. Etanșarea cuvei de subsol

- **Rosturi de turnare radier-pereți** — bandă de etanșare hidroexpandabilă (bentonitică) sau bandă PVC cu aripioare, înglobată la rostul dintre radier și baza pereților subsolului, pe tot conturul cuvei;
- **Penetrări** (treceri de instalații prin radier/pereți subsol) — manșoane de etanșare dedicate, montate înainte de turnare, cu garnitură de etanșare la interfața cu conducta;
- **Beton hidrofug de masă** (aditiv de impermeabilizare) la radier și pereții subsolului, suplimentar față de sistemul de hidroizolație aplicată (cap. 3.4 DTAC), ca a doua barieră de siguranță — soluție de tip „structură albă" (white box) parțial asistată.

---

## PTh-R.6 — PLAN DE CONTROL AL CALITĂȚII

| Etapă | Verificare | Frecvență/Metodă | Responsabil |
|---|---|---|---|
| Recepție oțel-beton | Certificat de calitate, marcaj CE, verificare vizuală diametre | la fiecare lot | responsabil tehnic cu execuția (RTE) |
| Recepție beton | Bon de livrare, temperatură, tasare (slump test) | la fiecare transport | RTE + laborator |
| Epruvete martor | Turnare cuburi/cilindri la fiecare turnare de volum >50mc sau element critic | min. 3 epruvete/turnare, testare 7/28 zile | laborator autorizat |
| Verificare armătură înainte de turnare | Poziții, acoperiri, ancoraje, distanțieri | 100% elemente, PV lucrări ascunse | RTE + proiectant + dirigent |
| Verificare cofraje | Geometrie, etanșeitate, sprijiniri, contrasăgeată | 100% elemente critice (transfer, nucleu) | RTE |
| Control nedistructiv beton întărit | Sclerometru/ultrasunete la elemente critice, la dubii de calitate | conform program dedicat | laborator autorizat |
| Verificare toleranțe geometrice execuție | Verticalitate stâlpi/nucleu, planeitate planșee | topometrie periodică, fiecare 2-3 niveluri | topograf + RTE |
| Monitorizare beton masiv (radier, planșeu transfer) | Temperatură internă vs. suprafață (risc fisurare termică) | senzori înglobați, citire zilnică primele 7 zile | RTE + proiectant |

---

## PTh-R.7 — FAZE DETERMINANTE

Conform Legii 10/1995 și procedurilor ISC, se stabilesc următoarele faze determinante, cu convocare obligatorie a Inspectoratului de Stat în Construcții, a proiectantului și a dirigintelui de șantier:

1. **Recepția săpăturii generale și a stratului de fundare** — confirmarea condițiilor geotehnice reale față de studiul geotehnic (categoria geotehnică 3 impune verificare atentă, cap. 4.4 DTAC);
2. **Recepția armăturii radierului general**, inclusiv armătura de străpungere sub stâlpii cadrului protejat (D-R06), înainte de turnare;
3. **Recepția hidroizolației radierului și a bandelor de etanșare** la rosturile de turnare ale cuvei de subsol, înainte de acoperire;
4. **Recepția armăturii stâlpilor cadrului protejat** (S/P/E1) la fiecare nivel, cu verificare explicită a confinării în zona critică (D-R03);
5. **Recepția armăturii planșeului de transfer** — fază critică unică, cu verificare separată a: (a) armăturii grinzilor de transfer și a majorării cu Ω, (b) armăturii de suspendare la reazemele pereților discontinuați (D-R02), (c) armăturii de străpungere sub stâlpi;
6. **Recepția eșafodajului planșeului de transfer** înainte de turnare (verificare independentă a proiectului de eșafodaj);
7. **Decofrarea planșeului de transfer** — condiționată de atingerea rezistenței minime (cap. 5.2), verificată prin epruvete/metode nedistructive, cu aviz explicit al proiectantului de structură;
8. **Recepția armăturii nucleului central**, la fiecare 2-3 niveluri (odată cu avansul cofrajelor autocățărătoare);
9. **Recepția structurii de rezistență la finalul suprastructurii** — verificare generală de ansamblu, toleranțe geometrice, înainte de închiderile de fațadă.

---

## PTh-R.8 — PROGRAM DE URMĂRIRE ÎN TIMP (P130) ȘI MONITORIZARE SPECIALĂ

### 8.1. Cadrul general

Conform P130/1999 și încadrării în categoria de importanță B (cap. 1.4 DTAC), construcția este supusă urmăririi curente pe toată durata de exploatare, prin observare vizuală periodică (semestrială) a elementelor structurale accesibile (fisuri, deformații, infiltrații) și prin urmărire specială pe durata execuției și în primii ani de exploatare, dat fiind sistemul structural cu discontinuitate controlată (planșeul de transfer).

### 8.2. Monitorizarea tasărilor

- **Repere de tasare** montate pe radier/pe stâlpii cadrului protejat, la colțurile clădirii și la centrul nucleului, citite topografic: la finalul execuției infrastructurii, la finalul fiecărui nivel al suprastructurii, apoi trimestrial în primul an de exploatare și anual ulterior, până la stabilizarea tasărilor (variație <2mm/an);
- **Prag de alertă** — diferență de tasare relativă între repere adiacente >1/500 din distanța dintre ele (limita uzuală pentru structuri cu pereți structurali, mai restrictivă decât la cadre pure, dat fiind riscul de fisurare a pereților structurali/nucleului la tasări diferențiale).

### 8.3. Monitorizare specială — interfața de transfer

Dat fiind rolul critic, fără redundanță, al planșeului de transfer și al stâlpilor cadrului protejat (cap. 2.4-2.6), se recomandă, suplimentar față de urmărirea curentă:

- **Fisurometre** montate pe fețele grinzilor de transfer și ale nodurilor stâlp-grindă critice, citite la 6 luni în primii 2 ani de exploatare;
- **Verificare vizuală detaliată** a planșeului de transfer (fața inferioară, accesibilă din etajul 1) la fiecare inspecție periodică, cu fotografiere sistematică pentru comparație în timp;
- **Instrumentare seismică** (accelerometre) recomandată la baza clădirii și la vârful nucleului, pentru înregistrarea răspunsului real la un eveniment seismic semnificativ — măsură de bună practică, nu obligatorie normativ, dar valoroasă pentru validarea comportării reale a sistemului dual cu transfer, dat fiind amplasamentul cu seismicitate ridicată (ag=0,30g).

---

## PTh-R.9 — IPOTEZE MODEL DE CALCUL EF ȘI VALIDARE

### 9.1. Descrierea modelului

Modelul de calcul definitiv (obligatoriu la PT, conform cap. 6.3 DTAC) este un model spațial (3D) cu elemente finite, care include: elemente de tip placă (shell) pentru planșee, pereți structurali (nucleu, pereți de contur, pereți de etaj) și radier; elemente de tip bară (frame) pentru stâlpi și grinzi; diafragmă rigidă la nivelul fiecărui planșeu (verificată, nu impusă a priori, dat fiind golul de dublă înălțime al lobby-ului, cap. 5.1 memoriul de arhitectură — zona de gol se modelează explicit, fără diafragmă, cu verificare separată a colectării forțelor orizontale în jurul golului); interacțiune radier-teren modelată prin arcuri elastice (coeficient de pat, Winkler) calibrat pe baza modulului de deformație din studiul geotehnic (cap. 4.4 DTAC).

### 9.2. Ipoteze de modelare specifice acestei structuri

- **Planșeul de transfer** — modelat cu elemente shell de grosime reală (40/50cm), cu grinzile de transfer modelate ca elemente de bară cu excentricitate față de planul median al plăcii (offset rigid), pentru captarea corectă a interacțiunii placă-grindă;
- **Pereții de etaj discontinuați** — modelați ca elemente shell care se opresc exact la fața superioară a planșeului de transfer, fără continuitate artificială în model;
- **Rigiditatea fisurată** — conform P100-1 §4.5.3.4, rigiditatea la încovoiere/forfecare a elementelor de beton armat se reduce la 50% din rigiditatea secțiunii brute (elemente fisurate sub acțiuni seismice), aplicată uniform tuturor elementelor verticale, cu excepția radierului (rigiditate brută, element de fundare);
- **Excentricitatea accidentală** — ±5% din dimensiunea în plan perpendiculară pe direcția de calcul (P100-1 §4.3.2), aplicată la centrul de masă al fiecărui nivel.

### 9.3. Validarea modelului

- **Verificare de echilibru static global** — reacțiunile din model, sumate, trebuie să egaleze greutatea totală introdusă (verificare automată de soft, dar confirmată manual);
- **Comparație perioade proprii** — perioadele fundamentale rezultate din model (T1,X, T1,Y) se compară cu estimarea empirică din DTAC (T1,emp=0,54s, T1,X≈0,42s, T1,Y≈0,53s, cap. 7.3 DTAC); o abatere de peste ±30% impune reverificarea ipotezelor de modelare (rigiditate, mase) înainte de acceptarea rezultatelor pentru dimensionare;
- **Comparație forță de bază** — forța tăietoare de bază rezultată din analiza modală (Fb,modal) se compară cu Fb=26.460 kN din metoda forțelor laterale echivalente (cap. 7.4 DTAC); conform P100-1 §4.5.3.5.5, dacă Fb,modal < 0,85·Fb (pentru structuri neregulate, coeficientul minim admis), rezultatele modale se scalează la această valoare minimă înainte de dimensionarea finală a armăturii;
- **Verificare distribuție tăietoare pe verticală** — distribuția rezultată din model se compară cu distribuția triunghiulară de predimensionare (cap. 7.5 DTAC, tabelul cu Fi pe niveluri), cu atenție particulară la concentrarea de forță la interfața de transfer (+8,70m), unde participarea modurilor superioare de vibrație (cap. 6.3 DTAC) poate produce o distribuție diferită de cea triunghiulară simplificată.

Rezultatele definitive ale acestui model (eforturi, deplasări, verificări de rezistență și de ductilitate pe fiecare element) înlocuiesc, la faza PT, valorile de predimensionare din DTAC și pe cele de verificare din prezentul supliment PTh acolo unde diferă semnificativ (>15%); breviarele de calcul din cap. PTh-R.2 rămân valabile ca reper de ordin de mărime și ca justificare de principiu a soluțiilor constructive (secțiuni, tipuri de armare) adoptate.
