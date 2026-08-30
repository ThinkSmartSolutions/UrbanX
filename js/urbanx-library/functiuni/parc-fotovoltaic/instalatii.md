# MEMORIU TEHNIC DE INSTALAȚII ELECTRICE — CENTRALĂ ELECTRICĂ FOTOVOLTAICĂ (DTAC)

## Parc fotovoltaic — putere instalată PARAMETRICĂ (P_DC ∈ 500 kWp … 50 MWp), racord LES/LEA de medie tensiune

---

## 0. FOAIE DE CAPĂT ȘI CADRU GENERAL

**Denumire obiectiv:** Centrală electrică fotovoltaică (CEF / parc fotovoltaic) cu putere instalată în curent continuu **P_DC** (mărime de temă, variabilă, stabilită de proiectant/beneficiar în plaja **500 kWp … 50 MWp**), montaj pe structuri metalice fixe (sau tracker mono-axial), cu unul sau mai multe posturi de transformare 0,4/20 kV proprii și racordare la Sistemul Electroenergetic Național (SEN) prin linie electrică de medie tensiune (LES/LEA 20 kV, respectiv 110 kV pentru puteri mari).

> **PRINCIPIU DE PROIECTARE — PARAMETRIZAREA.** Prezentul memoriu este redactat **parametric**: dimensionarea *unității elementare* (stringul DC — numărul de module în serie, tensiunile, curentul) este **independentă de puterea totală a parcului** și rezultă exclusiv din caracteristicile modulului, din fereastra de tensiune a invertorului și din temperaturile de calcul. Toate mărimile de *ansamblu* (număr de stringuri, număr de invertoare, putere AC, putere și număr de transformatoare, secțiunile magistralelor MT, nivelul de tensiune al racordului) **scalează cu P_DC** prin formule explicite. Un **exemplu numeric complet la P_DC = 2.000 kWp** este dezvoltat separat și **etichetat ca atare** — el ilustrează metoda, nu fixează puterea. Tabelele conțin **coloane-formulă** pentru recalcularea la orice putere aleasă de utilizator.

**Faza de proiectare:** D.T.A.C. (Documentație Tehnică pentru Autorizarea executării lucrărilor de Construire), conform Legii nr. 169/2026 (CATUC), art. 264, Anexa nr. 2. Prezentul memoriu dezvoltă, la nivel de faza D.T.A.C., breviare de calcul specifice fazelor următoare (P.Th. / D.E. / proiect de racordare avizat de operatorul de distribuție — OD), pentru a fundamenta soluția electrică, dimensionarea echipamentelor, spațiile tehnice, culoarele de cabluri și interfața cu rețeaua.

**Titular / Beneficiar:** _(se completează)_ — producător de energie electrică din surse regenerabile (SRE), în regimul de autorizare / licențiere ANRE aplicabil puterii instalate.

**Proiectant de specialitate instalații electrice:** inginer electrician atestat/autorizat ANRE (grad corespunzător proiectării instalațiilor de utilizare și de racordare la MT/ÎT), cu verificator de proiecte atestat MDLPA pentru cerința „Is" (instalații electrice) și „B2" (securitate la incendiu — instalații), după caz.

**Amplasament de referință:** teren extravilan/intravilan reglementat prin PUZ; suprafața brută ocupată **scalează cu puterea** — orientativ **1,5–2,0 ha/MWp** funcție de tehnologia de montaj și de gradul de acoperire (Ground Coverage Ratio, GCR ≈ 0,45–0,55). Pentru un parc de N MWp: S_teren ≈ N × (1,5…2,0) ha.

**Zonă climatică de referință (pentru calcule):** iradiere globală în plan orizontal (GHI) ≈ 1.350–1.450 kWh/m²·an (sud-estul României); iradiere în plan înclinat optim (POA / GTI) ≈ 1.550–1.650 kWh/m²·an; temperatura minimă de calcul a aerului **−20 °C** (STAS 6472/2), temperatura ambiantă maximă de proiectare +40 °C, temperatura minimă a celulei adoptată pentru verificarea tensiunii **−10 °C** (regim conservator, cer senin, răsărit cu iradiere incipientă), temperatura maximă a celulei în regim staționar **+70 °C** (NOCT majorat).

### 0.1. Cadru normativ aplicabil (ediții în vigoare la data proiectării)

| Normativ / Reglementare | Domeniu |
|---|---|
| **I7/2011** | Instalații electrice cu tensiuni până la 1000 V c.a. și 1500 V c.c. |
| **NTE 007/08/00** | Proiectarea și execuția rețelelor de cabluri electrice |
| **NTE 401/2003** | Metodologie privind determinarea secțiunii economice a conductoarelor |
| **NTE 003/04/00 (PE 104)** | Construcția liniilor electrice aeriene de energie cu tensiuni peste 1 kV (LEA) |
| **PE 101A** | Distanțe și intersecții ale LEA cu alte construcții/instalații (culoare de trecere) |
| **PE 132** | Normativ de proiectare a rețelelor electrice de distribuție publică |
| **NTE 006/06/00 (PE 107)** | Proiectarea și execuția rețelelor de cabluri electrice |
| **PE 116/1994** | Normativ de încercări și măsurători la echipamente și instalații electrice |
| **PE 118/1992 (NTI)** | Regulament general de manevre în instalațiile electrice |
| **NP 004/2003** | Normativ pentru proiectarea instalațiilor de protecție împotriva trăsnetului |
| **NTE 001/03/00** | Norme de dimensionare a instalațiilor de legare la pământ |
| **1.RE-Ip 30/2004** | Îndreptar de proiectare și execuție a instalațiilor de legare la pământ |
| **SR EN IEC 62305-1…4:2011/2024** | Protecția împotriva trăsnetului (LPS + SPM) |
| **STAS 12604-4/5-89** | Protecția împotriva electrocutărilor. Instalații de legare la pământ |
| **SR EN 62446-1:2016** | Sisteme fotovoltaice — cerințe pentru încercări, documentație, întreținere (PIF) |
| **SR EN IEC 62548** | Cerințe de proiectare pentru câmpurile fotovoltaice (protecții, siguranțe, sectionare) |
| **SR EN IEC 61730-1/-2** | Calificarea de securitate a modulelor fotovoltaice |
| **SR EN IEC 61215-1/-2** | Calificarea de proiectare și omologarea modulelor FV cristaline |
| **SR EN IEC 62109-1/-2** | Securitatea invertoarelor pentru sisteme de conversie a puterii FV |
| **SR EN IEC 61439-1/-2** | Ansambluri de aparataj de joasă tensiune (tablouri) |
| **SR EN IEC 62271-200** | Aparataj de MT în anvelopă metalică (celule 24 kV) |
| **SR EN 60076** | Transformatoare de putere |
| **SR EN 50618 / IEC 62930** | Cabluri electrice pentru sisteme fotovoltaice (cablu solar) |
| **Reg. (UE) 2016/631 (RfG / NC RfG)** | Cod de rețea — racordarea generatoarelor |
| **Ord. ANRE 208/2018 (Norma tehnică RfG)** | Cerințe naționale de aplicare a RfG |
| **Ord. ANRE 59/2013 + 235/2019** | Regulament de racordare a utilizatorilor la rețea + Norma tehnică |
| **Ord. ANRE 11/2023** | Metodologie de stabilire a tarifelor de racordare la rețea |
| **Ord. ANRE 20/2004 (Codul tehnic al RET)** | Condiții tehnice de funcționare a rețelei electrice de transport |
| **Codul rețelei de distribuție (ANRE)** | Condiții tehnice de funcționare în rețeaua de distribuție (RED) |
| **Ord. ANRE 82/2022** | Regulament autoconsum / prosumatori (dacă aplicabil) |
| **P118-1/1999, P118-3/2015** | Securitate la incendiu construcții + detectare-semnalizare |
| **Legea 123/2012** | Legea energiei electrice și a gazelor naturale |
| **Legea nr. 169/2026 (CATUC), Legea 10/1995** | Autorizarea construirii (art. 264, Anexa nr. 2); calitatea în construcții |

---

## 1. MĂRIMILE DE TEMĂ ȘI RELAȚIILE DE SCALARE CU PUTEREA

### 1.1. Parametrul de intrare și mărimile derivate

Singura mărime *impusă* de temă este **puterea instalată c.c., P_DC**. Toate celelalte mărimi de ansamblu se **derivă** din P_DC prin relații fixe (independente de valoarea numerică a puterii):

| Mărime derivată | Simbol | Relație de scalare | Observație |
|---|---|---|---|
| Raport supradimensionare invertor | ILR | dat (1,15…1,35), **de referință 1,25** | independent de P_DC |
| Putere activă maximă AC | P_AC | **P_AC = P_DC / ILR** | ex. ILR 1,25 → P_AC = 0,80·P_DC |
| Putere aparentă instalată invertoare | S_AC | ≈ P_AC / cosφ_min (cosφ 0,95) | pentru capabilitate RfG |
| Nr. module | N_mod | **N_mod = P_DC / P_mod** | P_mod = putere modul (Wp) |
| Nr. module/string | N_s | **din § 3 — NU depinde de P_DC** | funcție de modul + invertor + T |
| Nr. stringuri | N_str | **N_str = P_DC / (N_s · P_mod)** | rotunjit |
| Nr. invertoare | N_inv | **N_inv = P_AC / P_inv,unit** | P_inv,unit = putere invertor ales |
| Putere transformator | S_T | **S_T ≥ P_AC / cosφ** (≈ P_AC…1,1·P_AC) | standardizat pe treaptă |
| Nr. transformatoare / PT | N_PT | **N_PT = ⌈S_T,total / S_T,unit⌉** | trepte 630/800/1000/1250/1600/2000/2500 kVA |
| Nivel tensiune racord | U_racord | 20 kV (≲ ~ 10 MW) / 110 kV (mari) | funcție de P și de rețeaua OD |
| Suprafață teren | S_teren | ≈ P_DC[MW] × (1,5…2,0) ha | GCR ≈ 0,45–0,55 |

> **Regula fundamentală:** *proiectăm o dată stringul-tip și blocul de conversie (invertor + trafo), apoi „multiplicăm" blocul de câte ori cere P_DC.* Aceasta este și rațiunea arhitecturii modulare (invertoare de string + PT-uri repartizate) pentru parcurile de putere mare.

### 1.2. Alegerea nivelului de tensiune al racordului (funcție de putere)

| Plaja P_AC | Racord uzual | Configurație |
|---|---|---|
| ≤ 0,5 MW | JT 0,4 kV sau MT 20 kV | 1 PT mic sau branșament trifazat întărit |
| 0,5 … ~5–8 MW | **MT 20 kV** (LES/LEA) | 1…N PT-uri 0,4/20 kV + stație de conexiuni |
| ~5–8 … ~25 MW | MT 20 kV cu bară colectoare / mai multe LES | stație de conexiuni MT extinsă |
| > 25 MW | **ÎT 110 kV** | stație de transformare 20/110 kV proprie |

Pentru plaja tipică a platformei (500 kWp – 50 MWp), **racordul de referință este 20 kV**, cu trecere la 110 kV pentru capătul superior al intervalului (peste ~20–25 MW, când curentul de MT și pierderile devin nejustificate).

### 1.3. Producția anuală (indicator scalabil)

Cu Performance Ratio de proiectare **PR = 0,82** (cap. 12) și iradiere în plan de modul GTI ≈ 1.600 kWh/m²·an, energia anuală scalează liniar cu puterea:

> **E_an = P_DC × (GTI / G_STC) × PR = P_DC[kWp] × 1,600 × 0,82 ≈ P_DC[kWp] × 1,312 [kWh/an]**

Energie specifică (yield): ≈ **1.312 kWh/kWp·an**; factor de capacitate CF = E_an/(P_AC·8.760) ≈ **0,187 (18,7 %)** — ambele **independente de puterea totală** (proprietăți ale tehnologiei + climatului).

Aceste mărimi specifice sunt utile tocmai pentru că **nu depind de scara parcului**: yield-ul de ~1.312 kWh/kWp·an și factorul de capacitate de ~18,7 % caracterizează *tehnologia și amplasamentul*, nu dimensiunea. Un investitor sau un proiectant poate estima instantaneu producția oricărei puteri prin simplă înmulțire (E_an ≈ P_DC × 1,312 MWh la P_DC în MWp), iar veniturile, dimensionarea contorizării și garanțiile de performanță se scalează la fel de simplu. Din perspectiva rețelei, factorul de capacitate relativ scăzut (~19 %, tipic solarului în climat temperat-continental) explică de ce puterea de racord (P_AC) este dimensionantă pentru infrastructura de evacuare, dar energia efectiv injectată este mult sub produsul P_AC × 8.760 h — un aspect relevant pentru studiul de soluție și pentru evaluarea impactului asupra rețelei (§ 9). Adăugarea unui sistem de stocare (BESS) la retehnologizare poate crește factorul de capacitate efectiv la punctul de racord prin decalarea injecției (vezi cap. 17).

---

## 2. ARHITECTURA ELECTRICĂ GENERALĂ

Fluxul de conversie și transport, de la sursă la SEN, urmează lanțul (identic la orice putere; se multiplică blocurile):

```
MODULE FV (P_mod Wp)
   │  string DC (serie de N_s module)  → ≤ 1.500 V DC
   ▼
CUTIE DE CONEXIUNI STRING / COMBINER DC  (siguranțe gPV + SPD + sectionare)
   │  cablu solar H1Z2Z2-K / EN 50618
   ▼
INVERTOR FV  (MPPT, 1.500 V DC → 0,4/0,8 kV AC)   ILR 1,25
   │  bara JT / cablu AC
   ▼
TABLOU GENERAL JT (TGJT) + servicii proprii
   │
   ▼
TRANSFORMATOR 0,4/20 kV, S_T kVA, Dyn11
   │  cablu / barete MT
   ▼
CELULE MT (stație de conexiune internă): sosire trafo + măsură + plecare
   │  LES 20 kV (bară colectoare la mai multe PT-uri)
   ▼
PUNCT DE DELIMITARE (PMD) — celulă de racord OD  →  SEN 20 (110) kV
```

**Descrierea nivelurilor:**

1. **Nivelul DC (≤1.500 V):** module în serie = stringuri; stringurile se grupează în combinere sau se leagă direct la intrările MPPT ale invertoarelor. Aici: sectionare DC, siguranțe gPV, SPD tip 1+2.
2. **Nivelul de conversie (invertoare):** DC → AC, urmărirea MPPT, sincronizare, funcțiile de sistem RfG.
3. **Nivelul JT (0,4 kV):** colectare AC, TGJT, servicii proprii, protecții JT.
4. **Nivelul de transformare:** transformator(oare) ridicător(oare) 0,4/20 kV, grupa Dyn11.
5. **Nivelul MT (20 kV):** celule MT în anvelopă metalică (sosire, măsură, plecare), bară colectoare pentru mai multe PT-uri, contorizare bidirecțională, protecție de interfață și de racord.
6. **Racordul la SEN:** LES/LEA 20 kV (sau stație 20/110 kV la puteri mari) până la PMD stabilit prin ATR.

**Alegerea topologiei de bloc (funcție de putere):**
- **500 kWp – ~5 MWp:** invertoare de string (30–250 kW/buc) + **1 PT** (sau 2) 0,4/20 kV.
- **~5 – 25 MWp:** mai multe **stații compacte** (invertoare + PT propriu, „inverter-transformer station" 1.600–2.500 kVA fiecare) colectate pe **bară MT 20 kV**.
- **> 25 MWp:** ca mai sus + **stație de transformare 20/110 kV** proprie, racord ÎT.

### 2.1. Justificarea arhitecturii modulare și a nivelurilor de conversie

Alegerea unei arhitecturi în „blocuri" repetitive nu este o preferință estetică, ci consecința directă a fizicii conversiei fotovoltaice și a economiei rețelelor. Energia se produce la nivelul modulului în curent continuu, la o tensiune scăzută (câteva zeci de volți per modul) și un curent moderat. Pentru a transporta această energie pe distanțele mari ale unui câmp de câteva hectare fără pierderi ohmice inacceptabile, tensiunea trebuie ridicată succesiv: mai întâi prin **înserierea modulelor în string** (până la ~1.500 V DC — limita superioară de izolație a componentelor „low-voltage" conform I7/2011 și IEC 62109, care evită încadrarea în regimul de înaltă tensiune și aparatajul aferent, mult mai scump), apoi prin **conversia la joasă tensiune alternativă** (0,4 sau 0,8 kV) în invertor, și în final prin **transformarea la medie tensiune** (20 kV) pentru transportul spre punctul de racord și injecția în SEN.

Ridicarea tensiunii la fiecare treaptă urmărește minimizarea pierderilor prin efect Joule, care scad cu pătratul curentului: la aceeași putere transmisă, dublarea tensiunii sfertește pierderile (P_Joule = 3·I²·R, iar I = P/(√3·U·cosφ)). Acesta este motivul pentru care magistrala DC funcționează la ~1.100–1.500 V și nu la tensiunea unui singur modul, și motivul pentru care evacuarea spre rețea se face la 20 kV (respectiv 110 kV la puteri mari), nu la 0,4 kV.

**De ce blocuri repetitive și nu un singur echipament central de mare putere?** Trei rațiuni: (1) **disponibilitatea** — într-o arhitectură cu N invertoare, avaria unuia scoate din funcțiune doar 1/N din putere, în timp ce un invertor central reprezintă un punct unic de defect (SPOF) ce poate opri întreg parcul; (2) **granularitatea MPPT** — mai multe urmăritoare de putere maximă independente compensează local mismatch-ul, umbrirea parțială și degradarea neuniformă, câștigând procente de energie anuală; (3) **mentenabilitatea** — un modul de conversie de 200 kW se poate înlocui „hot-swap" într-o oră de doi tehnicieni, pe când un invertor central de mai multe MW cere macara, întreruperea unui sector întreg și, adesea, comandă specială cu termen de livrare de săptămâni. Prin urmare, indiferent dacă parcul are 0,5 MW sau 50 MW, arhitectura este aceeași — se schimbă doar **numărul de blocuri**, ceea ce este chiar esența parametrizării din prezentul memoriu.

**Numărul de niveluri de transformare** este de asemenea funcție de putere. Sub ~20–25 MW este suficientă o singură treaptă 0,4/20 kV, iar evacuarea se face direct în rețeaua de medie tensiune a operatorului de distribuție. Peste acest prag, curentul de MT devine prohibitiv (peste ~600–700 A la 20 kV, ceea ce impune bare colectoare masive și cabluri gemene multiple), iar pierderile pe magistrala MT cresc pătratic; devine economic să se adauge o **a doua treaptă de transformare 20/110 kV** și racordul la rețeaua de transport / de distribuție de înaltă tensiune. Această tranziție tehnologică este marcată explicit în tabelul de scalare din § 4.2.

---

## 3. DIMENSIONAREA STRINGULUI DC (INDEPENDENTĂ DE PUTEREA TOTALĂ)

> **Notă metodologică:** rezultatele acestui capitol (N_s = module/string, tensiuni, curent) sunt **valabile la orice putere a parcului**. Ele depind doar de: (a) caracteristicile modulului ales, (b) fereastra de tensiune / tensiunea maximă DC a invertorului, (c) temperaturile de calcul. Puterea totală intervine abia în cap. 4+ (numărul de stringuri). Modulul și invertorul de mai jos sunt de referință; la schimbarea lor se refac doar formulele — nu și restul arhitecturii.

### 3.1. Caracteristicile modulului de referință (la STC: 1.000 W/m², 25 °C, AM 1,5)

| Parametru | Simbol | Valoare de referință |
|---|---|---|
| Putere nominală | P_mod | 555 Wp (monocristalin PERC/TOPCon, half-cut, 144 celule) |
| Tensiune la putere maximă | V_mpp | 42,0 V |
| Curent la putere maximă | I_mpp | 13,22 A |
| Tensiune de mers în gol | V_oc | 50,2 V |
| Curent de scurtcircuit | I_sc | 14,05 A |
| Coef. temperatură V_oc | β | −0,25 %/°C = −0,1255 V/°C |
| Coef. temperatură V_mpp | — | −0,29 %/°C ≈ −0,1218 V/°C |
| Coef. temperatură I_sc | α | +0,045 %/°C |
| Coef. temperatură P | γ | −0,34 %/°C |
| Tensiune sistem maximă | U_max,sys | 1.500 V DC |
| Fereastră MPPT invertor | — | U_mpp,min = 500 V … U_mpp,max = 1.500 V |

Dimensionarea unui string reprezintă rezolvarea unei duble inecuații de tensiune, între două regimuri termice extreme aflate în opoziție. Modulul fotovoltaic se comportă ca o sursă de tensiune cu **coeficient de temperatură negativ**: tensiunea sa (atât de mers în gol V_oc, cât și de putere maximă V_mpp) crește când celula se răcește și scade când celula se încălzește. Consecința proiectării: **iarna, la răsărit, cu cerul senin și celula rece**, tensiunea stringului atinge maximul absolut — regimul care poate depăși limita de izolație de 1.500 V și distruge invertorul; **vara, la amiază, cu celula fierbinte**, tensiunea coboară la minim — regimul în care stringul riscă să iasă *sub* fereastra MPPT, caz în care invertorul nu mai poate extrage puterea maximă și randamentul se prăbușește. Numărul de module în serie trebuie ales astfel încât ambele extreme să rămână în limite. Această logică este universal valabilă (orice putere de parc), motiv pentru care stringul este „cărămida" invariantă a proiectării.

### 3.2. Numărul MAXIM de module/string — condiția de tensiune (V_oc la T minimă)

Tensiunea de mers în gol crește la scăderea temperaturii. Regimul critic este **stringul deconectat de sarcină** (invertor oprit, de ex. la avarie sau înainte de sincronizare) în dimineața rece de iarnă: toate modulele sunt în gol (V_oc, nu V_mpp), iar temperatura celulei poate fi apropiată de temperatura aerului nocturn. Se calculează V_oc la T_min = **−10 °C** (celula):

> V_oc(T) = V_oc,STC × [1 + β × (T − 25)],  β = −0,0025 /°C
> ΔT = −10 − 25 = **−35 °C**
> V_oc(−10 °C) = 50,2 × [1 + (−0,0025)(−35)] = 50,2 × 1,0875 = **54,59 V/modul**

**Condiția de izolație a sistemului:**
> N_s,max × V_oc(−10 °C) ≤ U_max,sys = 1.500 V
> **N_s,max ≤ 1.500 / 54,59 = 27,47 → N_s,max = 27 module** (rotunjire în JOS, obligatoriu)

Verificare: 27 × 54,59 = **1.473,9 V < 1.500 V** ✔ (marjă 1,7 %).

> **Sensibilitate la temperatură (formulă generală, orice T_min):** N_s,max = ⌊ U_max,sys / (V_oc,STC · (1 + β·(T_min − 25))) ⌋.
> La T_min = −20 °C: V_oc = 50,2×(1+0,0025×45) = 55,85 V → N_s,max = ⌊1.500/55,85⌋ = **26**. Se adoptă valoarea impusă de temperatura minimă absolută a locului. De referință (T_min −10 °C): **N_s,max = 27**.

### 3.3. Numărul MINIM de module/string — condiția MPPT (V_mpp la T maximă)

La T_max = **+70 °C** (celula), tensiunea scade; stringul trebuie să rămână peste MPPT minim:

> V_mpp(70 °C) = 42,0 × [1 + (−0,0029)(70 − 25)] = 42,0 × (1 − 0,1305) = **36,52 V/modul**
> **N_s,min ≥ U_mpp,min / V_mpp(70 °C) = 500 / 36,52 = 13,69 → N_s,min = 14 module**

**Verificare V_mpp la T minimă (să nu depășească MPPT max):**
> V_mpp(−10 °C) = 42,0 × (1 + (−0,0029)(−35)) = 42,0 × 1,1015 = **46,26 V/modul**
> N_s × 46,26 ≤ 1.500 → N_s ≤ 32,4 (neconstrângător — limita reală rămâne V_oc)

**Consecința nerespectării N_s,min.** Dacă stringul are prea puține module, la temperaturi ridicate tensiunea de lucru coboară sub pragul MPPT minim al invertorului (500 V în exemplul nostru). În acest regim invertorul nu mai poate urmări punctul de putere maximă: fie deconectează stringul (pierdere totală de producție pe intervalul respectiv), fie funcționează la o tensiune impusă, suboptimă, cu pierdere de energie. Efectul este maxim exact la orele cele mai productive de vară, deci penalizează disproporționat producția anuală. De aceea condiția N_s ≥ 14 este obligatorie, iar în practică se lucrează la limita superioară (27) tocmai pentru a păstra o marjă confortabilă față de pragul MPPT inferior pe tot parcursul anului.

**Rolul diferit al celor două limite.** Limita superioară (N_s,max = 27) este o **condiție de securitate** (protejează izolația de 1.500 V și integritatea invertorului — depășirea ei poate distruge echipamentul și e periculoasă); ea se calculează la temperatura minimă *absolută* a locului și nu admite compromisuri. Limita inferioară (N_s,min = 14) este o **condiție de performanță** (evită pierderea de energie prin ieșirea din fereastra MPPT); ea admite o oarecare toleranță (o scurtă ieșire sub prag în vârf de caniculă are impact energetic mic). Din acest motiv proiectarea se „lipește" de limita superioară de securitate, respectând-o strict, și lasă marjă generoasă față de limita inferioară.

### 3.4. Alegerea numărului de module/string

Fereastra admisibilă: **14 ≤ N_s ≤ 27**. Se adoptă **maximul compatibil cu izolația** (minimizează curentul, pierderile ohmice DC, numărul de stringuri și lungimea de cablu):

> **N_s = 27 module/string** ⇒ P_string = 27 × 555 = **14,985 kWp ≈ 15,0 kWp/string**

| Verificare string 27 module | Formulă | Rezultat | Limită | Stare |
|---|---|---|---|---|
| U_oc la −10 °C | 27 × 54,59 | 1.473,9 V | ≤ 1.500 V | ✔ |
| U_mpp la +70 °C | 27 × 36,52 | 986,0 V | ≥ 500 V | ✔ |
| U_mpp la −10 °C | 27 × 46,26 | 1.249,0 V | ≤ 1.500 V | ✔ |
| U_mpp la +25 °C (STC) | 27 × 42,0 | 1.134,0 V | 500–1.500 V | ✔ |

Tensiunea de lucru STC ≈ **1.134 V**, în treimea superioară a ferestrei MPPT (randament maxim al invertorului).

**De ce se adoptă maximul admis (27) și nu o valoare intermediară?** Alegerea numărului maxim de module compatibil cu izolația maximizează tensiunea de lucru a stringului și, implicit, minimizează curentul necesar pentru aceeași putere. Curentul mai mic aduce trei beneficii cumulate: (a) **pierderi ohmice DC mai mici** (P = I²·R scade pătratic), deci cabluri de secțiune mai redusă la aceeași cădere de tensiune procentuală; (b) **mai puține stringuri pentru aceeași putere**, deci mai puține cutii de conexiune, mai puține siguranțe gPV, mai puțini conectori MC4 (fiecare conector este un potențial punct de arc și de defect); (c) **randament de conversie superior al invertorului**, întrucât randamentul invertoarelor de 1.500 V este maxim în treimea superioară a ferestrei MPPT (uzual la 65–75 % din U_mpp,max, adică ~1.000–1.150 V), exact unde se poziționează stringul de 27 module la STC. Din acest motiv, regula de proiectare consacrată este: *string cât mai lung permis de limita de 1.500 V la temperatura minimă absolută a locului*.

**Verificarea în regim de exploatare curentă.** La o zi caldă de vară, cu celula la ~55–60 °C și iradiere de 900 W/m², tensiunea de lucru a stringului scade la ~1.010–1.030 V, rămânând confortabil în interiorul ferestrei MPPT (500–1.500 V). Nici în cel mai defavorabil regim (celula la +70 °C, § 3.3) tensiunea de 986 V nu coboară sub pragul MPPT minim de 500 V. Prin urmare, stringul de 27 module este funcțional în întreaga plajă de temperatură a amplasamentului, fără pierderi de urmărire MPPT și fără risc de depășire a izolației.

### 3.5. Curentul de string (invariant cu N_s și cu puterea parcului)

> I_string,mpp = I_mpp = **13,22 A**;  I_string,sc = I_sc = **14,05 A** (STC)
> I_sc(70 °C) = 14,05 × [1 + 0,00045 × 45] = **14,33 A**
> Curent de dimensionare (SR EN IEC 62548): **I_dim = 1,25 × I_sc = 17,56 A**

> **Concluzie de string-tip (valabilă 500 kWp … 50 MWp):** *string = 27 module 555 Wp, 15,0 kWp, ~1.134 V DC, 13,22 A.* Acesta este „cărămida" pe care o multiplicăm.

### 3.6. Observații privind modulele bifaciale și degradarea

Dacă se adoptă module **bifaciale** (curent frecvent la parcurile MW), curentul de scurtcircuit efectiv crește cu câștigul bifacial (bifacial gain), tipic +5…+15 % funcție de albedoul solului (pietriș deschis, iarbă, membrană albă). Acest surplus de curent nu modifică numărul de module în serie (dimensionarea de tensiune rămâne neschimbată), dar **majorează curentul de dimensionare** al cablurilor de string și al siguranțelor gPV: I_dim,bifacial = 1,25 × I_sc × (1 + g_bif). La g_bif = 0,10: I_dim = 1,25 × 14,05 × 1,10 = 19,32 A. Se verifică din nou cablul 1×6 mm² (I_z redus ≈ 50 A la 60 °C) — acoperă cu marjă. Câmpul DC total (kWp) rămâne definit de puterea față-frontală a modulelor (STC), câștigul bifacial fiind contabilizat separat, ca sporire de PR/producție.

De asemenea, la modulele cristaline se ține cont de **degradarea inițială indusă de lumină (LID)** de ~1–2 % în primele ore de expunere (mai redusă la TOPCon/HJT decât la PERC vechi) și de **degradarea liniară** garantată de ~0,45–0,55 %/an. Aceste efecte nu modifică dimensionarea electrică (tensiuni, secțiuni), ci intră exclusiv în bilanțul de producție și în proiecția pe orizontul de 25–30 ani (cap. 17). Un modul care garantează ≥ 84,8 % din puterea nominală la 25 de ani (degradare 0,55 %/an după anul 1) definește pragul inferior al energiei livrate spre finalul duratei de viață.

---

## 4. SCALAREA ANSAMBLULUI CU PUTEREA — NR. STRINGURI, INVERTOARE, TRAFO

### 4.1. Formulele de multiplicare

Cu stringul-tip de la § 3 (P_string = 15,0 kWp) și ILR de referință 1,25:

| Mărime | Formulă generală | Comentariu |
|---|---|---|
| Nr. stringuri | **N_str = round( P_DC / P_string )** | P_string = 14,985 kWp |
| Nr. module | **N_mod = N_str × N_s** = N_str × 27 | |
| Putere AC | **P_AC = P_DC / ILR** = 0,80 · P_DC | ILR 1,25 |
| Nr. invertoare | **N_inv = ⌈ P_AC / P_inv,unit ⌉** | P_inv,unit ales din § 5 |
| Putere trafo totală | **S_T ≈ P_AC** (…÷cosφ pentru reactiv) | trepte standard |
| Nr. PT-uri | **N_PT = ⌈ S_T / S_T,unit ⌉** | 630…2.500 kVA/PT |

### 4.2. Tabel de dimensionare parametric (recalculabil pentru orice P_DC)

Coloanele-formulă permit recalcularea directă la puterea aleasă de utilizator (P_string = 15,0 kWp, ILR 1,25, P_inv,unit = 200 kW, S_T,unit = 2.500 kVA):

| P_DC | N_str = P_DC/15,0 | N_mod = 27·N_str | P_AC = 0,80·P_DC | N_inv (200 kW) | S_T total ≈ P_AC | N_PT (2.500 kVA) | Racord |
|---|---|---|---|---|---|---|---|
| **500 kWp** | 33 | 891 | 400 kW | 2 | 500 kVA (1×630) | 1 | 20 kV |
| **1.000 kWp** | 67 | 1.809 | 800 kW | 4 | 800 kVA (1×1000) | 1 | 20 kV |
| **2.000 kWp** | 134 | 3.618 | 1.600 kW | 8 | 1.600 kVA | 1 | 20 kV |
| **5.000 kWp** | 334 | 9.018 | 4.000 kW | 20 | 4.000 kVA (2×2000) | 2 | 20 kV |
| **10.000 kWp** | 667 | 18.009 | 8.000 kW | 40 | ~8.000 kVA | 4 | 20 kV |
| **25.000 kWp** | 1.668 | 45.036 | 20.000 kW | 100 | ~20 MVA | 8 | 20/110 kV |
| **50.000 kWp** | 3.336 | 90.072 | 40.000 kW | 200 | ~40 MVA | 16 | 110 kV |

> Numerele din tabel sunt derivate exclusiv prin formulele coloanei de antet; la modificarea modulului/invertorului/ILR se recalculează identic. Treptele standard de transformator (SR EN 60076): 630 / 800 / 1000 / 1250 / 1600 / 2000 / 2500 kVA.

### 4.3. EXEMPLU NUMERIC COMPLET — ilustrarea metodei la P_DC = 2.000 kWp

> **AVERTISMENT DE INTERPRETARE:** următorul exemplu **NU fixează puterea parcului la 2 MWp**. Puterea este o mărime de temă, variabilă (500 kWp … 50 MWp). Exemplul servește *exclusiv* la demonstrarea aplicării formulelor de scalare pe o valoare concretă, ușor de urmărit. Pentru orice altă putere se reia identic calculul, înlocuind P_DC.

**Pas 1 — numărul de module.** N_mod = P_DC / P_mod = 2.000.000 / 555 = 3.603,6 → se rotunjesc la un număr întreg de stringuri (Pas 3).

**Pas 2 — stringul-tip** (din § 3, invariant): N_s = 27 module; P_string = 14,985 kWp; U_lucru ≈ 1.134 V DC; I = 13,22 A. Verificat la temperatură (U_oc,−10°C = 1.473,9 V < 1.500 V; U_mpp,+70°C = 986 V > 500 V).

**Pas 3 — numărul de stringuri.** N_str = round(P_DC / P_string) = round(2.000 / 14,985) = round(133,47) = **134 stringuri**. Puterea instalată reală: 134 × 14,985 = **2.007,99 kWp** (≈ +0,4 % față de 2 MWp nominal, acceptabil). Dacă se dorește ≤ 2 MWp strict, se adoptă 133 stringuri → 1.993,0 kWp. Numărul real de module: 134 × 27 = **3.618 module**.

**Pas 4 — puterea AC.** P_AC = P_DC / ILR = 2.008 / 1,25 = **1.606 kW ≈ 1.600 kW**.

**Pas 5 — numărul de invertoare.** Cu invertorul de referință de 200 kW: N_inv = ⌈P_AC / 200⌉ = ⌈1.606/200⌉ = ⌈8,03⌉ = **8 invertoare** (se acceptă 8 invertoare de 200 kW = 1.600 kW; surplusul de 6 kW se pierde ca clipping marginal, deja în bilanțul PR). Stringuri per invertor: 134/8 ≈ **16–17 stringuri**; P_DC/invertor ≈ 250 kWp → ILR local ≈ 1,25 ✔.

**Pas 6 — transformatorul.** S_T ≈ P_AC = **1.600 kVA** (treaptă standard). Un singur PT 0,4/20 kV, 1.600 kVA, Dyn11, u_k 6 %. Verificare reactivă RfG: S_max necesar = 1.600/0,95 = 1.684 kVA — se acceptă funcționarea pe diagrama P-Q (P²+Q²≤S_T²) sau treaptă superioară 2.000 kVA dacă OD cere cvadrant complet la P nominal.

**Pas 7 — racordul.** I_MT = S/(√3·U) = 1.600.000/(√3·20.000) = **46,2 A** → **LES 20 kV** A2XS(F)2Y 3×(1×95) Al. Racord la SEN prin celulă de linie în stația de conexiuni proprie, PMD la interfața OD.

**Pas 8 — producția.** E_an = 2.008 × 1,312 = **≈ 2.635 MWh/an** (PR 0,82, GTI 1.600 kWh/m²·an).

**Sinteza exemplului 2 MWp:** 3.618 module × 555 Wp · 134 stringuri × 27 module · 8 invertoare × 200 kW (ILR 1,25) · 1 PT 1.600 kVA 0,4/20 kV Dyn11 · racord LES 20 kV 46,2 A · ~2.635 MWh/an. **Toate aceste cifre s-au obținut mecanic din formulele § 4.1, aplicate valorii P_DC = 2.000 kWp; aceeași procedură produce configurația pentru orice altă putere aleasă.**

Pentru contrast, aplicarea acelorași formule la **P_DC = 10.000 kWp** dă: 667 stringuri, 18.009 module, 8.000 kW AC, 40 invertoare de 200 kW, ~8 MVA de transformare (adoptat 4×2.000 kVA sau 2×2.500+…), bară colectoare MT 20 kV la care se leagă cele 4 PT-uri, racord tot 20 kV (I_MT ≈ 231 A pe magistrala colectoare totală). Iar la **P_DC = 50.000 kWp**: 3.336 stringuri, ~90.000 module, 40 MW AC, 200 invertoare (sau echivalent în invertoare centrale), ~40 MVA transformare, **racord 110 kV cu stație proprie 20/110 kV** (curentul de 20 kV, ~1.155 A, ar deveni prohibitiv). Se observă că **doar numerele se schimbă — metoda și stringul-tip rămân identice**.

---

## 5. INVERTOARELE FV

### 5.1. Topologie — string vs. central (alegere funcție de putere)

| Criteriu | Invertor central (mari) | Invertoare de string |
|---|---|---|
| Randament euro | 98,0–98,6 % | 98,3–98,8 % |
| Redundanță | scăzută (SPOF) | ridicată (avaria = 1/N_inv) |
| MPPT (granularitate) | 1–8 globale | 6–12/invertor |
| Pierderi mismatch/umbrire | mari | reduse (MPPT local) |
| Mentenanță | intervenție grea | modulară, hot-swap |
| Cost specific | mai mic | ușor mai mare |

**Regula de selecție pe putere:** ≤ ~5 MWp și/sau teren cu microrelief/umbriri → **invertoare de string** (redundanță, MPPT fin); > ~5 MWp cu teren compact → se pot folosi și **invertoare centrale** sau **string-uri de mare putere (250–350 kW)** grupate în stații cu trafo propriu. De referință (metodă): **invertoare de string 200 kW, 1.500 V DC.**

Invertorul este componenta care determină decisiv **randamentul de sistem, disponibilitatea și conformitatea cu rețeaua**. El îndeplinește simultan mai multe funcții: (1) **conversia DC → AC** prin comutație PWM la frecvențe de câțiva kHz–zeci de kHz, cu filtrare LC/LCL la ieșire pentru un curent injectat cvasi-sinusoidal (THD < 3 %, conform cerințelor de calitate a energiei); (2) **urmărirea punctului de putere maximă (MPPT)** — un algoritm (perturbă-și-observă sau conductanță incrementală) care ajustează continuu tensiunea de lucru a stringului astfel încât produsul U·I să fie maxim, compensând variațiile de iradiere și temperatură; (3) **sincronizarea și controlul de rețea** — menținerea fazei și frecvenței, reglajul de putere activă/reactivă și funcțiile de sistem impuse de RfG (cap. 10); (4) **protecția** — deconectarea la abateri de tensiune/frecvență, la funcționare în insulă, la defecte DC (izolație, arc). Din perspectiva securității, invertorul certificat IEC 62109-1/-2 garantează separarea galvanică sau monitorizarea de izolație (sisteme fără transformator), esențială la sistemele DC flotante de 1.500 V.

**De ce 1.500 V și nu 1.000 V DC?** Trecerea de la sistemele de 1.000 V la cele de **1.500 V DC** (dominante astăzi la parcurile utilitare) crește cu ~50 % numărul de module pe string, reducând proporțional numărul de stringuri, de cabluri, de conectori și de intrări de invertor pentru aceeași putere — deci pierderi ohmice mai mici și cost specific (€/kW) mai redus, la același cadru normativ „low-voltage" (I7/2011 acoperă până la 1.500 V c.c.). Este motivul pentru care întreaga dimensionare din prezentul memoriu pornește de la U_max,sys = 1.500 V.

### 5.2. Parametri invertor de referință (bloc de 200 kW)

| Parametru | Valoare |
|---|---|
| Putere activă nominală | 200 kW |
| Putere AC maximă | 220 kVA (cosφ 0,9) |
| Tensiune AC | 800 V (3~) sau 400 V |
| Domeniu MPPT | 500 … 1.500 V DC |
| Tensiune DC maximă | 1.500 V |
| Nr. MPPT | 6–12 |
| Randament maxim | 99,0 % |
| **Randament european η_euro** | **98,6 %** |
| THD curent | < 3 % |
| Funcții rețea | LVRT/HVRT, Q(U), P(f), cosφ(P), reactive night mode |

**Randamentul european** (EN 50530, ponderat pe profilul de iradiere):
> η_euro = 0,03·η₅% + 0,06·η₁₀% + 0,13·η₂₀% + 0,10·η₃₀% + 0,48·η₅₀% + 0,20·η₁₀₀% = **98,6 %**
Această valoare intră în bilanțul PR ca pierdere de conversie ≈ 1,4 %.

### 5.3. ILR pe invertor și repartiția stringurilor

Pe fiecare invertor de 200 kW AC, la ILR 1,25: P_DC/inv ≈ **250 kWp** → **N_str/inv = 250/15,0 ≈ 16–17 stringuri** (3–4 stringuri/MPPT). Puterea de vârf DC ce depășește P_AC ("clipping") apare doar câteva zeci de ore/an; energia pierdută la ILR 1,25 este **< 1,0 %/an** (climat RO), integrată în PR.

**Justificarea economică a supradimensionării DC.** Un invertor este dimensionat în putere AC și costă proporțional cu aceasta; el nu poate livra mai mult decât P_AC, indiferent cât produce câmpul DC. Dacă am dimensiona câmpul DC exact la P_AC (ILR = 1,0), invertorul ar lucra la putere nominală doar în puținele ore de iradianță maximă (~1.000 W/m², celulă rece), iar restul anului — adică majoritatea energiei, produsă la 300–800 W/m² — ar lucra la sarcină parțială, în zona de randament mai slab, iar puterea AC scumpă ar sta subutilizată. Supradimensionând câmpul DC (ILR 1,25), la iradianțe medii invertorul lucrează mai aproape de nominal (randament mai bun), iar factorul de capacitate crește. „Prețul" plătit este limitarea (clipping) vârfurilor rare, care la ILR 1,25 costă sub 1 % din energia anuală — mult mai puțin decât câștigul obținut prin utilizarea mai bună a invertorului. Optimul depinde de climat: în zone mai însorite (mai multe ore de vârf) ILR optim scade spre 1,15–1,20, iar în zone cu iradianță mai difuză poate urca spre 1,30–1,35. Pentru România, **ILR 1,25 este valoarea de referință echilibrată**, adoptată în tot memoriul.

---

## 6. CABLURI DC ȘI AC

Dimensionarea cablurilor urmează, la fiecare tronson, **trei criterii cumulative** care trebuie satisfăcute simultan: (1) **curentul maxim admisibil (I_z)** — cablul, cu izolația sa, nu trebuie să depășească temperatura de regim (uzual 70 °C pentru PVC, 90 °C pentru XLPE/elastomer), ținând cont de modul de pozare, de temperatura mediului și de gruparea cu alte cabluri (factori de corecție k_θ, k_g conform I7/2011 și NTE 007); (2) **căderea de tensiune** — pierderea de tensiune pe traseu trebuie să rămână sub pragul admis (adoptăm < 1 % pe partea DC și pe fiecare tronson AC, pentru a limita pierderea energetică și a nu deplasa punctul de lucru); (3) **solicitarea la scurtcircuit** — secțiunea trebuie să reziste termic curentului de defect pe durata de acționare a protecției (formula S_min = I_scc·√t/k), criteriu dominant mai ales pe partea de MT. Se adoptă întotdeauna secțiunea rezultată din cel mai sever dintre cele trei criterii. Metodologia de determinare a secțiunii economice (optim tehnico-economic între costul cablului și costul pierderilor pe durata de viață) este dată de **NTE 401/2003**.

### 6.1. Cablu solar de string (parte DC)

**Cablu solar H1Z2Z2-K** (SR EN 50618 / IEC 62930): Cu cositorit, izolație+manta elastomer reticulat fără halogen, UV/ozon, −40…+90 °C (vârf +120 °C), **Uo/U 1.500/1.500 V DC**, viață 25 ani exterior. Se cositorește conductorul pentru rezistență la coroziune și se aleg conectori (MC4 sau echivalent) *de la același producător cu cablul*, sertizați cu scula dedicată — un contact prost la conector este cea mai frecventă cauză de hot-spot și de arc DC în parcurile FV.

**Curent admisibil.** I_dim = 1,25×I_sc = 17,56 A; factori de corecție: temperatură 60 °C k_θ ≈ 0,71; grupare 2 cabluri k_g ≈ 0,90.
> I_z necesar = 17,56 / (0,71 × 0,90) = **27,5 A** → cablu **1×6 mm² Cu** (I_z ≈ 70 A aer, ~50 A la 60 °C) ✔

**Cădere de tensiune DC (< 1 %).** ρ_Cu(70 °C) ≈ 0,0216 Ω·mm²/m; L_dus-întors = 120 m:
> ΔU = (ρ × L × I_mpp)/S = (0,0216 × 120 × 13,22)/6 = **5,71 V** → ΔU% = 5,71/1.134 = **0,50 %** ✔
> La 200 m dus-întors: ΔU = 9,52 V → 0,84 % (< 1 %); trasee mai lungi → 10 mm².

### 6.2. Magistrală DC (combiner → invertor)

Combiner cu k stringuri: I = k×13,22 A; I_dim = 1,25×k×14,05. Ex. k = 4: I_dim = 70,3 A → **1×25 mm²** (I_z ≈ 100 A la 60 °C); ΔU verificat identic; magistrale lungi 35–50 mm².

### 6.3. Cablu AC de joasă tensiune (invertor → TGJT/trafo)

Invertor 200 kW: la 800 V → I_AC = 200.000/(√3·800) = **144,3 A**; la 400 V → **288,7 A**. Cablu **N2XY/NA2XY 0,6/1 kV**, îngropat −0,8 m (NTE 007).
> Cădere de tensiune (< 1 %): ΔU% = (√3·I·(R·cosφ+X·sinφ)·L)/U_n × 100.
> Ex. 400 V, 289 A, Al 185 mm² (R≈0,164 Ω/km), L = 50 m, cosφ 1: ΔU = 1,732×289×0,164×0,050 = 4,10 V → **1,03 %** — la limită; se majorează la 240 mm² sau se scurtează. **La 800 V pierderea scade de 4×** (curent la jumătate, tensiune dublă) → soluție preferată pe distanțe.

Alegerea tensiunii AC de ieșire a invertorului (400 V vs. 800 V) este, ca și restul lanțului, o problemă de minimizare a curentului: la aceeași putere, dublarea tensiunii înjumătățește curentul, iar pierderile pe cablu (∝ I²) scad de patru ori, permițând secțiuni mai mici pe distanța invertor–transformator. Invertoarele moderne de string „HV" livrează 800 V AC tocmai pentru a beneficia de acest avantaj când invertoarele sunt descentralizate în câmp, departe de PT. Când invertoarele sunt grupate lângă PT (arhitectura „inverter station"), distanța AC de JT este scurtă și tensiunea de 400 V devine acceptabilă. Indiferent de alegere, transformatorul are înfășurarea de JT adaptată tensiunii invertorului (0,4 sau 0,8 kV), iar raportul de transformare spre 20 kV se ajustează corespunzător. Această decizie nu afectează dimensionarea stringului DC (invariantă), ci doar tronsonul AC de JT.

### 6.4. Cablu MT 20 kV (magistrală colectoare / LES de racord)

**A2XS(F)2Y 12/20 kV** (Al, XLPE, ecran Cu, manta PE) sau **N2XSY** (Cu). Curentul de linie scalează cu puterea trafo/parc:
> **I_MT = S / (√3 × U)**;  ex. 1,6 MVA → I = 1.600.000/(√3×20.000) = **46,2 A**; ex. 20 MVA → **577 A**.
> Dimensionare I_dim = 1,25×I_MT; secțiunea crește cu puterea (95 → 240 → 300 mm² → cabluri gemene pentru MVA mari).

**Secțiune minimă la scurtcircuit** (termică): S_min = I_scc × √t_d / k. Ex. I_scc = 8 kA, t_d = 0,5 s, k = 94 (Al/XLPE):
> S_min = 8.000 × √0,5 / 94 = **60,2 mm²** → 95 mm² acoperă pentru racord 1,6 MVA ✔. Ecranul Cu se dimensionează la defectul monofazat (min. 16–25 mm² Cu echiv.).

**De ce secțiunea MT este dictată de scurtcircuit, nu de curentul nominal?** La 20 kV, curentul de sarcină al unui racord de 1,6 MVA este de doar 46 A — o secțiune de 16–25 mm² ar fi suficientă termic în regim normal. Însă în cazul unui scurtcircuit în punctul de racord (unde puterea de scurtcircuit a rețelei OD poate da 8–16 kA), cablul trebuie să suporte, fără deteriorarea izolației XLPE, curentul de defect pe întreaga durată de acționare a protecției (temporizarea de coordonare cu OD, 0,3–0,5 s). De aici secțiunea minimă termică de ~60 mm² și adoptarea a 95 mm². La puteri mari, când curentul de sarcină crește (ex. 577 A la 20 MVA), criteriul de curent admisibil devine, la rândul său, dominant, impunând 240–300 mm² sau cabluri gemene. Acesta este încă un motiv tehnic al trecerii la 110 kV la puteri mari: la 110 kV, curentul aceleiași puteri este de 5,5 ori mai mic, iar secțiunile redevin rezonabile.

---

## 7. CUTII DE CONEXIUNE STRING (COMBINER) ȘI PROTECȚII DC

Partea de curent continuu ridică probleme de protecție **specifice și mai severe decât partea AC**, din trei motive fizice: (1) **arcul electric DC nu are trecere naturală prin zero** — odată amorsat, se autoîntreține și trebuie stins forțat prin alungire/răcire în camera de stingere a aparatului (de aici aparatajul DC dedicat, nu se poate folosi aparataj AC); (2) **sursa este limitată în curent** — un modul livrează la scurtcircuit doar ~1,2–1,3× curentul nominal (I_sc ≈ I_mpp), ceea ce face ca protecțiile de suprasarcină clasice să nu „vadă" ușor un defect de string, impunând logici dedicate (siguranțe gPV cu caracteristică specială); (3) **generatorul nu poate fi „oprit"** — modulele produc tensiune ori de câte ori sunt iluminate, deci părțile DC rămân sub tensiune și după deconectarea invertorului, cerință majoră de securitate pentru intervenție și pentru pompieri. Proiectarea protecțiilor DC urmează integral **SR EN IEC 62548** (cerințe de proiectare a câmpului FV) și I7/2011 pentru domeniul de tensiune continuă.

### 7.1. Cutia de conexiune DC (combiner)

Când invertorul are multe intrări MPPT, combinerele pot lipsi (string direct în invertor prin MC4 + siguranță). La grupare: **cutie DC IP65** cu: borne +/−; **siguranțe gPV** pe fiecare string (ambele polarități, sistem IT flotant), 1.500 V DC; **SPD tip 1+2** 1.500 V DC; **întrerupător-separator DC** (load-break); monitorizare curent string (SCADA). Cutia se amplasează la umbră/ventilată (temperaturile interioare pot depăși +60 °C vara), cu presetupe etanșe și cu marcaj de securitate pe capac.

### 7.2. Siguranțe gPV (protecția la curent invers)

La scurtcircuitul unui string, stringurile paralele injectează curent invers. Dimensionare (SR EN IEC 62548 / IEC 60269-6):
> 1,5 × I_sc ≤ I_n ≤ 2,4 × I_sc  și  I_n ≤ I_R,modul
> 1,5×14,05 = 21,1 A ≤ I_n ≤ 33,7 A → **gPV 25 A / 1.500 V DC** (14×51 mm).
> Siguranța e necesară doar la > 3 stringuri/MPPT (curent invers > I_R modul); la ≤ 2 se poate omite.

### 7.3. SPD DC (descărcătoare de supratensiuni)

**Tip 2** standard; **tip 1+2** dacă distanța string–invertor > 10 m sau amplasament expus (LPL III–IV):
> U_cpv ≥ 1,2 × U_oc,sistem = 1,2 × 1.474 = 1.769 V → clasa 1.500 V DC (Ucpv ≈ 1.800 V);
> I_imp (10/350) ≥ 12,5 kA; I_n (8/20) ≥ 20 kA; montaj în „Y" (evită curent de fugă); contact de defect la SCADA. SPD la fiecare ≤10 m de cablu (cascadă combiner + invertor).

**De ce SPD-uri și de ce în cascadă.** Suprafața mare a câmpului de module, cu bucle de cablu întinse, este o „antenă" excelentă pentru supratensiunile induse de trăsnet, chiar și la loviri indirecte (la sute de metri). Aceste supratensiuni tranzitorii, de kilovolți și microsecunde, distrug intrările DC ale invertoarelor (componenta cea mai scumpă și cu termen de livrare mare). SPD-ul este o sarcină neliniară (varistor cu oxid metalic + eventual eclator în serie) care rămâne „invizibilă" la tensiunea de lucru și devine brusc conductoare peste un prag, deviind impulsul spre pământ și limitând tensiunea reziduală la o valoare pe care echipamentul o suportă. **Montajul în „Y"** (pol+ și pol− fiecare la PE prin câte un varistor, cu un eclator comun spre PE) evită curentul de fugă permanent al varistoarelor pe sistemul DC flotant, care ar declanșa falsele alarme ale monitorului de izolație. **Cascada** (un SPD la combiner + un SPD la intrarea invertorului) este necesară pentru că un SPD protejează eficient doar echipamentele aflate la cel mult ~10 m de el pe traseu; pe traseele lungi string–invertor, un singur SPD nu ar acoperi ambele capete. Coordonarea energetică între treptele de SPD (tip 1 la intrare, tip 2 la echipament) asigură că fiecare deviază partea de energie care îi revine.

### 7.4. Sectionarea DC

Fiecare invertor are **separator DC integrat** (obligatoriu, IEC 62109); combinerele au load-break switch. Marcare „PERICOL — TENSIUNE DC PREZENTĂ CHIAR CU INVERTORUL DECONECTAT".

---

## 8. TRANSFORMATORUL ȘI POSTUL DE TRANSFORMARE 0,4/20 kV

### 8.1. Transformatorul (putere = mărime scalabilă)

Puterea transformatorului **scalează cu puterea AC**: S_T ≥ P_AC (÷cosφ pentru reactiv), aleasă pe treaptă standard (630/800/1000/1250/1600/2000/2500 kVA). Pentru puteri mari se folosesc **mai multe PT-uri identice** pe bară MT (modularitate). Exemplul de referință: **S_T = 1.600 kVA** (corespunde P_AC = 1.600 kW la P_DC 2 MWp).

| Parametru | Valoare de referință |
|---|---|
| Putere nominală | S_T (scalabil); ex. **1.600 kVA** |
| Raport | 0,4 / 20 kV |
| Grupa de conexiuni | **Dyn11** (Δ MT / Y JT, nul accesibil, defazaj 330°) |
| Tensiune de scurtcircuit | u_k = 6 % |
| Pierderi în gol P₀ | ≈ 1.700 W (la 1.600 kVA) |
| Pierderi în sarcină P_k (75°C) | ≈ 15.000 W (la 1.600 kVA) |
| Tip | uscat rășină turnată sau ulei ermetic |
| Reglaj | ±2×2,5 % pe MT |
| Nivel izolare MT | 24 kV (Um), BIL 125 kV |

**Grupa Dyn11** — standard pentru racordarea generatoarelor: triunghiul MT blochează armonicile homopolare (multiplu de 3) și izolează nulul; steaua JT dă nulul de serviciu și tratarea neutrului (TN-S servicii proprii). Defazajul de 330° (indicele orar 11) este cel consacrat pentru cuplarea la rețeaua de distribuție românească. Înfășurarea triunghi pe partea de MT constituie și o „capcană" pentru curenții homopolari generați de eventualele dezechilibre sau armonici de pe partea de JT, împiedicând propagarea lor spre rețea și îmbunătățind calitatea energiei injectate. Reglajul ±2×2,5 % pe MT (plot fără sarcină) permite adaptarea la tensiunea reală a rețelei în punctul de racord, care poate varia în plaja 0,9–1,1 U_n.

**Alegerea tipului constructiv (uscat vs. ulei):** transformatorul **uscat în rășină turnată** este preferat în anvelope compacte și în incinte cu risc de incendiu redus (fără ulei, fără bazin de retenție, mentenanță minimă), în timp ce **transformatorul în ulei ermetic** oferă un cost specific mai mic la puteri mari și o capacitate de supraîncărcare superioară, dar impune tavă/bazin de retenție a uleiului (protecția solului și a apelor), monitorizare Buchholz și măsuri suplimentare de securitate la incendiu. Alegerea se face funcție de putere, de amplasare (interior anvelopă vs. exterior) și de cerințele de mediu.

**Pierderile și randamentul** — dimensionante pentru ventilația PT și pentru bilanțul energetic: pierderile în gol P₀ (magnetizare, prezente permanent cât timp trafo e sub tensiune, inclusiv noaptea) și pierderile în sarcină P_k (efect Joule în înfășurări, proporționale cu pătratul încărcării). La un trafo de 1.600 kVA, P₀ ≈ 1,7 kW și P_k ≈ 15 kW la sarcină nominală (§ 14.4). Pierderile în gol contribuie la consumul propriu nocturn (trafo lăsat sub tensiune pentru menținerea protecțiilor și a serviciilor); la parcurile mari se poate deconecta un PT în perioadele de producție nulă pentru economie.

**Încărcarea reactivă (RfG):** RfG cere ±0,95 → S_max = P_AC/0,95. Fie se adoptă treaptă superioară, fie funcționare pe diagrama P²+Q²≤S_T². Ex. 2 MWp: S = P_AC = 1.600 kVA (100 %); reactiv la limitarea P corespunzătoare.

### 8.2. Celule de MT 24 kV (SR EN IEC 62271-200)

**Stație de conexiuni MT** în anvelopă metalică (SF6 sau aer/solid fără-SF6), config. de bază (extensibilă cu bară colectoare la mai multe PT-uri):
1. **Celulă de sosire/racord (linie)** — separator de sarcină + CLP — interfață OD / PMD;
2. **Celulă de măsură** — TT + TC clasa 0,2S/0,5S pentru contorizarea de decontare;
3. **Celulă de protecție trafo** — întreruptor în vid + releu + CLP.
Aparataj: separatori 24 kV/630 A; întreruptor vid 24 kV/630 A/16 kA·1s; TC 50–100/5 A (funcție de S); TT 20.000/√3 : 100/√3 V.

Rolul fiecărei celule: **celula de sosire/racord** conține separatorul de sarcină cu cuțit de legare la pământ (CLP) și materializează interfața cu operatorul de rețea — aici, uzual, se plasează punctul de delimitare; separatorul de sarcină permite izolarea vizibilă a instalației față de rețea pentru mentenanță, iar CLP aduce bara la potențialul pământului pentru intervenția în siguranță. **Celula de măsură** găzduiește transformatoarele de măsură — TC pentru curent și TT pentru tensiune, ambele de clasă înaltă de exactitate (0,2S pentru decontare), care reduc mărimile de MT la valori mici (5 A, 100 V) prelucrabile de contor și de relee; grupul de măsurare este sigilat de operatorul de rețea, orice intervenție ulterioară necesitând prezența acestuia. **Celula de protecție a trafo** conține întreruptorul în vid (singurul aparat capabil să întrerupă curenți de scurtcircuit sub sarcină) comandat de releul de protecție (funcțiile 50/51/51N/67N), care decuplează transformatorul la orice defect. Configurația se extinde modular: la parcurile cu mai multe PT-uri, se adaugă o celulă de plecare pe fiecare PT și o bară colectoare comună, iar la racordul de 110 kV întreaga schemă de 20 kV devine partea de MT a unei stații de transformare 20/110 kV. Aparatajul fără SF6 (izolație în aer/solid sau în gaz alternativ) este tot mai preferat din rațiuni de mediu, SF6 fiind un gaz cu efect de seră foarte puternic, reglementat în reducere la nivel european.

### 8.3. Protecțiile MT (funcții ANSI)

| ANSI | Descriere | Reglaj indicativ |
|---|---|---|
| **50** | curent maxim instantaneu (scc) | I>> ≈ 8×I_n, t = 0,05 s |
| **51** | curent maxim temporizat (IDMT) | I> ≈ 1,2×I_n, t ≈ 0,5 s |
| **51N** | maximală homopolară (defect pământ) | 3I₀ > 10–20 A, t = 0,3–0,5 s |
| **67N** | direcțională de defect la pământ | coordonată cu OD (neutru tratat) |
| **59 / 27** | supra/minimă tensiune (interfață) | 1,15 Un 0,2 s / 0,85 Un 1,5 s |
| **81O/81U** | frecvență max/min (interfață RfG) | 51,5 Hz 0,2 s / 47,5 Hz 0,2 s |
| **78 / 25** | anti-insularizare / sincronism | ROCOF/vector-shift, per RfG |

**Coordonarea protecțiilor** (selectivitatea) este cerința ca, la un defect, să acționeze *doar* protecția cea mai apropiată de defect, lăsând restul instalației în funcțiune. Aceasta se obține prin **gradarea temporizărilor** (releele din amonte, mai aproape de rețea, au temporizări mai mari cu un pas de coordonare de ~0,25–0,3 s față de cele din aval) și prin **caracteristici inverse (IDMT)** care acționează cu atât mai repede cu cât curentul de defect este mai mare. Protecția instantanee de curent maxim (50) acoperă scurtcircuitele apropiate, franche; protecția temporizată (51) acoperă suprasarcinile și defectele îndepărtate; protecția homopolară (51N/67N) acoperă defectele monofazate la pământ, cele mai frecvente în rețelele de MT. Reglajele finale (praguri, temporizări, curbe) se stabilesc de comun acord cu operatorul de rețea, pentru a se încadra în planul de protecție al zonei — motiv pentru care în DTAC se dau valori *indicative*, urmând a fi confirmate în proiectul de racordare.

### 8.4. Protecția de interfață (RfG)

Conform **Ord. ANRE 208/2018** și codului de rețea, la racord se prevede **protecția de interfață** care deconectează centrala la ieșirea din benzile de tensiune (27/59) și frecvență (81U/81O) și la funcționarea în insulă (anti-islanding). Rolul ei distinct față de protecțiile de scurtcircuit: protecția de interfață supraveghează *starea rețelei* (nu un defect propriu al instalației) și decuplează producătorul atunci când rețeaua iese din parametri sau când centrala ar risca să alimenteze o „insulă" izolată (situație periculoasă pentru personalul de intervenție al OD, care ar putea atinge conductoare presupus scoase de sub tensiune). Detecția insulei se face prin metode pasive (salt de frecvență ROCOF — rate of change of frequency, salt de vector de fază) și/sau active. Reglajele exacte — prin ATR și proiectul de racordare aprobat de OD.

### 8.5. Anvelopa PT / stația compactă

Anvelopă prefabricată de beton (sau container), compartimente separate MT / trafo / JT; ventilare dimensionată la pierderi (ex. P₀+P_k ≈ 16,7 kW/1.600 kVA); rezistență la foc (P118), tavă de retenție ulei (dacă e cazul), interlock celulă–ușă, covor electroizolant, echipament de manevră, indicatoare de securitate. La puteri mari — **mai multe PT-uri identice** repartizate în câmp și legate pe bară MT.

---

## 9. RACORDAREA LA SEN

Racordarea unei centrale de producere la Sistemul Electroenergetic Național este un proces reglementat integral de ANRE, distinct de simpla execuție a instalației. El presupune obținerea unei succesiuni de avize, studii și acte administrative, iar nerespectarea etapelor blochează punerea sub tensiune. Nivelul de tensiune al racordului și complexitatea studiilor **scalează cu puterea** (§ 1.2), motiv pentru care procedura de mai jos indică explicit pragurile.

### 9.1. Actele și studiile de racordare (Ord. ANRE 59/2013, 235/2019, 11/2023)

1. **Cererea de racordare** depusă la operatorul de rețea (OR) — operatorul de distribuție (OD) pentru racord la 20 kV, respectiv Transelectrica (OTS) pentru racord la 110 kV — însoțită de certificatul de urbanism, actele de teren și fișa tehnică a centralei.
2. **Studiul de soluție** (elaborat de OR sau de firmă atestată ANRE, avizat de OR) care stabilește **soluția tehnică optimă** de racordare (punct de racord, nivel de tensiune, lucrări în amonte). Pentru puteri mari studiul de soluție integrează:
   - **studiul de scurtcircuit** — determinarea curenților de scurtcircuit în punctul de racord (dimensionarea aparatajului, a protecțiilor, verificarea secțiunilor la solicitare termică — cf. § 6.4);
   - **studiul de stabilitate / de regim** — pentru centralele racordate la **transport (> 10 MW la 110 kV)**, analiza impactului asupra tensiunii, a fluxurilor de putere și a stabilității sistemului.
3. **Avizul Tehnic de Racordare (ATR)** — actul care stabilește: puterea aprobată pentru evacuare, tensiunea de racord, **punctul de delimitare (PMD)**, cerințele de protecție, de contorizare și de telecomunicații (telemăsură/telecomandă), obligațiile RfG. ATR este valabil o perioadă determinată și condiționează contractul de racordare.
4. **Tariful de racordare** se stabilește conform **Ord. ANRE 11/2023** (metodologia tarifelor de racordare), acoperind lucrările din instalația de racordare.
5. **Proiectul de racordare** (instalația de racordare + instalația de utilizare de la PMD spre producător), verificat de verificator atestat MDLPA și **avizat de OR** (prin comisia tehnico-economică — CTE).
6. **Contractul de racordare** + execuția LES/LEA și a stației de conexiuni; **punerea sub tensiune de probă (PIF)**.

### 9.2. Regimul de autorizare/licențiere ANRE (funcție de putere)

- pentru capacități **> 1 MW** — **autorizație de înființare** ANRE emisă *înainte* de începerea execuției centralei;
- după punerea în funcțiune și dovada conformității — **licența de producere** a energiei electrice;
- sub pragurile stabilite (mici capacități / prosumatori) — regim simplificat conform Ord. ANRE 82/2022.
Aceste acte **variază cu puterea** aleasă de beneficiar și se corelează cu nivelul de racord (OD 20 kV vs. Transelectrica 110 kV).

### 9.3. Punctul de delimitare (PMD)

Limita de gestiune/proprietate OR–producător, stabilită prin ATR — uzual la bornele celulei de linie din stația producătorului, la un PT/PA al OD, sau la bara de 110 kV a stației (la racord ÎT). La PMD (sau în punctul de măsurare convenit) se amplasează **contorul de decontare, montat și sigilat de operatorul de rețea (OR)**. Delimitarea fixează și responsabilitatea pentru pierderile de transformare (dacă măsurarea se face pe JT).

### 9.4. LES/LEA de racord și distanțele față de LEA existente

**Racord 20 kV — LES** (A2XS(F)2Y, § 6.4) pozată la −0,8/−1,0 m pe pat de nisip, cu placă avertizoare și bandă de semnalizare, până la punctul de racord OD (celulă liberă în PA/PT sau LEA/LES 20 kV). La puteri mari — **racord 110 kV** cu stație proprie 20/110 kV și LEA/LES de ÎT. Execuția LEA respectă **NTE 003/04/00 (PE 104)**, rețelele de distribuție **PE 132**, iar traversările de drumuri/canale se fac în tuburi de protecție / foraj dirijat.

**Distanțe și culoare de trecere (NTE 003/04/00, PE 101A)** — relevante întrucât amplasamentul poate fi traversat de LEA existente, iar **structurile fotovoltaice NU se amplasează sub LEA**:
- **LEA 110 kV:** culoar de trecere ~20 m de o parte și de alta a axului; distanța minimă orizontală de siguranță ~8 m;
- **LEA 20 kV (MT):** distanță minimă ~4 m;
- **LEA 0,4 kV (JT):** distanță minimă ~1,5 m.
La proiectarea implantării câmpului de module se verifică respectarea acestor distanțe și se rezervă culoarele de trecere; eventualele LEA care traversează amplasamentul se deviază/subtraversează în acord cu OR.

### 9.5. Contorizarea și sistemul de măsurare

- **Contorizare bidirecțională** (energie activă produsă/consumată + reactivă în 4 cadrane), clasă de exactitate **0,2S/0,5S**;
- măsurare indirectă prin **TC clasa 0,2S** și **TT clasa 0,2**, grup de măsurare **sigilat de OR**;
- **contor principal + contor martor (backup)**, telecitire (GPRS/optic), interfață cu sistemul de măsurare al OR și cu dispecerul;
- punct de măsurare la 20 kV / 110 kV (sau pe JT cu corecția pierderilor de transformare, dacă ATR permite);
- **consumul propriu tehnologic** (servicii proprii, invertoare în stand-by, încălzire anticondens, SCADA, iluminat, CCTV) este contorizat/estimat separat și reprezintă orientativ **0,5–1,5 % din producția brută anuală** (mărime procentuală, deci **parametrică pe putere**), fiind scăzut din energia livrată în SEN.

---

## 10. CONFORMITATE RfG — Reg. (UE) 2016/631

Codul de rețea privind racordarea generatoarelor — **Reg. (UE) 2016/631 (NC RfG)**, transpus național prin **Ord. ANRE 208/2018** — impune ca orice modul generator (inclusiv o centrală FV cu invertoare) să contribuie activ la stabilitatea sistemului, nu doar să injecteze energie „când și cât poate". Filozofia RfG este că, pe măsură ce ponderea surselor regenerabile crește, aceste surse trebuie să preia funcții de sistem pe care le asigurau tradițional generatoarele sincrone clasice (grupurile termo/hidro): susținerea tensiunii prin reactiv, susținerea frecvenței, rămânerea conectat la defecte tranzitorii (pentru a nu declanșa un efect de domino de deconectări care ar prăbuși sistemul). Aceste cerințe se implementează în firmware-ul invertoarelor certificate și se coordonează, la nivel de centrală, prin Power Plant Controller (cap. 12).

### 10.1. Clasificarea modulului generator (funcție de putere — SCALABILĂ)

**Tipul RfG depinde direct de P_max**, deci **variază cu puterea parcului** (transpunere Ord. ANRE 208/2018), zona sincronă Europa continentală. Cu cât tipul este „mai înalt" (A→D), cu atât capabilitățile impuse sunt mai extinse, deoarece impactul centralei asupra sistemului crește cu puterea:

| Tip | Prag putere max. | Exemplu din plaja platformei |
|---|---|---|
| **A** | 0,8 kW … < prag B | parcuri mici / prosumatori |
| **B** | prag B … < prag C | parcuri medii |
| **C** | ~1 MW … < 50 MW | **majoritatea 1–50 MW** (ex. 2 MWp → Tip C) |
| **D** | ≥ 50 MW sau racord ≥ 110 kV | capătul superior / racord ÎT |

Cerințele Tip C includ integral Tip A + B. Pentru capătul de 50 MWp cu racord 110 kV → **Tip D**.

### 10.2. Capabilități impuse (Tip C, ilustrativ)

**a) Frecvență / răspuns la frecvență:** funcționare continuă 49,0–51,0 Hz (+ domenii extinse temporizate); **LFSM-O** (reducere P la f > 50,2–50,5 Hz, statism 2–12 %); **LFSM-U**; **FSM** (reglaj primar cu bandă moartă/statism); limitarea gradientului de P.
**b) Tensiune:** funcționare continuă 0,9–1,1 U_n (+ domenii extinse temporizate).
**c) FRT / LVRT:** rămânere conectat la scăderi de tensiune conform curbei U-t (până la ~0,05–0,15 U_n sute de ms) + **injectare curent reactiv** (suport dinamic, k ≥ 2) + HVRT.
**d) Reactiv / factor de putere:** diagramă P-Q, **cosφ 0,95 ind … 0,95 cap** la P_max; moduri: Q fix, cosφ fix, **Q(U)**, **cosφ(P)**; reactiv și la P = 0 (noaptea, dacă solicitat).
**e) Putere activă:** setpoint P de la distanță (limitare la comandă OD/dispecer); limitarea gradientului (ramp-rate, ex. 10 %/min).
**f) Robustețe / telecomunicații:** rezistență la salturi de fază, fault recorder, interfață de telecomunicație cu dispecerul.

**Semnificația fizică a capabilităților** (pentru înțelegerea cerințelor, nu doar bifarea lor): **FRT/LVRT** împiedică declanșarea în cascadă — la un scurtcircuit undeva în rețea, tensiunea scade tranzitoriu pe o arie largă; dacă toate centralele s-ar deconecta simultan (pentru autoprotecție), sistemul ar pierde brusc gigawați de generare și s-ar prăbuși. RfG cere invertoarelor să *rămână conectate* pe durata golului de tensiune (conform curbei U-t) și, mai mult, să *injecteze curent reactiv* pentru a susține activ tensiunea în zona defectului. **Controlul P/Q și Q(U)** permite operatorului să regleze tensiunea locală (reactiv capacitiv ridică tensiunea, inductiv o coboară), esențial în nodurile de distribuție unde injecția fotovoltaică masivă tinde să *crească* tensiunea peste limite la orele de producție maximă. **Răspunsul la frecvență (LFSM/FSM)** face ca centrala să-și reducă automat puterea la supra-frecvență (surplus de generare în sistem) și, unde există marjă, să contribuie la sub-frecvență — o formă de rezervă rapidă. **Limitarea gradientului (ramp-rate)** previne variații bruște de putere (ex. la trecerea rapidă a norilor peste un parc mare) care ar solicita rezervele sistemului.

### 10.3. Implementare

Capabilitățile — prin **invertoare certificate RfG** (firmware) coordonate de **Power Plant Controller (PPC)** (cap. 11), care menține setpoint-urile P/Q/U/cosφ **măsurate la punctul de racord**. Conformitatea = certificat de echipament + document de instalare + teste de PIF supravegheate de OD/TSO.

---

## 11. PRIZĂ DE PĂMÂNT, PARATRĂSNET, PROTECȚIA LA SUPRATENSIUNI

### 11.1. Instalația de legare la pământ (STAS 12604, NTE 001, IEC 62305-3)

**Priză comună** (funcțională + protecție) pentru structuri module, invertoare, PT/trafo, celule MT, ecrane cabluri, SPD, paratrăsnet — echipotențializare generală. Se **extinde cu suprafața parcului** (priză mai mare la putere mai mare → dispersie mai bună).

Principiul care guvernează întreaga instalație de legare la pământ este **echipotențializarea**: toate masele metalice accesibile (structuri, carcase, ecrane, armături) se leagă la aceeași rețea de pământare, astfel încât, în orice regim (funcționare normală, defect la pământ, lovire de trăsnet), diferențele de potențial dintre elementele pe care le-ar putea atinge simultan o persoană să rămână sub pragurile periculoase. Un potențial ridicat nu este în sine periculos dacă tot ce e în jur are același potențial; pericolul apare din *diferența* de potențial (tensiunea de atingere — între mână și picioare; tensiunea de pas — între cei doi pași). De aceea o priză de pământ „bună" nu înseamnă doar o rezistență de dispersie mică, ci și o rețea densă care egalizează potențialul pe suprafață — motiv pentru care conductorul orizontal de contur (buclă) contează cel puțin la fel de mult ca electrozii verticali, iar la parcurile mari rețeaua orizontală lungă, legată la sutele de rânduri de structuri metalice, asigură cea mai mare parte a dispersiei.

**Priză de câmp:** electrozi verticali (țăruși Cu-oțel 2–3 m) + conductor orizontal (OL-Zn 40×4 sau Cu 50 mm²) la −0,8 m, legat la fiecare rând de mese. Structurile galvanizate = priză naturală extinsă.
**Priză PT:** buclă perimetrală + electrozi în colțuri, legată la neutrul trafo JT, carcase MT, armătura fundației (priză de fundare).

**Valoarea impusă:** R_p ≤ **1 Ω** la PT/stația MT (neutru tratat; tensiuni de atingere/pas U_a ≤ 50/125 V funcție de t_d); priză comună cu paratrăsnet ≤ 10 Ω (IEC 62305) → se adoptă cea mai severă, **≤ 1 Ω**.

**Dispersie electrod vertical (verificare):** R_e = (ρ/2πL)·ln(4L/d). Cu ρ = 100 Ω·m, L = 3 m, d = 0,0172 m:
> R_e = (100/(2π·3))·ln(4·3/0,0172) = 5,305 × ln(697,7) = **34,7 Ω/electrod**.
> Nr. electrozi pt. R_p ≤ 1 Ω (η ≈ 0,7): N ≈ 34,7/(1×0,7) ≈ **50** legați în paralel cu conductor de contur. În practică rețeaua orizontală lungă reduce mult R_p; valoarea se **măsoară obligatoriu la PIF** (PE 116) și se completează cu electrozi.

**Legătura cu valoarea impusă și cadrul normativ:** cerința R_p < 1 Ω decurge din **PE 116/1994** coroborat cu **I7/2011** și **STAS 12604** pentru instalațiile cu neutrul MT tratat, unde tensiunile de atingere și de pas trebuie menținute sub pragurile admise (50 V regim normal / 125 V regim de scurtă durată) pentru timpii de eliminare a defectului stabiliți de protecții. Valoarea se **măsoară obligatoriu la punerea în funcțiune** și periodic în exploatare (metoda căderii de potențial), rețeaua completându-se cu electrozi până la atingerea pragului.

### 11.2. Protecția împotriva trăsnetului (NP 004/2003 + SR EN 62305)

Proiectarea instalației de protecție împotriva trăsnetului (IPT) se face conform **NP 004/2003** coroborat cu **SR EN 62305**, pornind de la o **analiză de risc (IEC 62305-2)** care compară riscul de pierdere cu riscul tolerabil și stabilește nivelul de protecție (LPL I–IV). Sistemul poate fi **convențional** (dispozitive de captare tip tijă Franklin/rețea, dimensionate prin metoda sferei rotative sau a unghiului de protecție) sau **cu dispozitiv de amorsare (PDA/paratrăsnet activ)**, alegerea fiind justificată prin calcul (raza de protecție calculată funcție de înălțimea de montaj și nivelul de protecție). Pentru parc FV (suprafață mare, electronică sensibilă):
- **LPS extern:** tije/paratrăsnete pe PT (și stâlpi dedicați în câmp la nevoie), coborâri, priză (§ 11.1). Modulele NU se folosesc drept captare; poziționarea tijelor prin metoda sferei rotative/unghiului, fără a umbri modulele.
- **SPM (protecția la supratensiuni):** SPD coordonate — **DC** tip 1+2 (combiner + invertor); **AC JT** tip 1+2 (ieșire invertor + TGJT, U_c ≥ 1,1 U_n, I_imp ≥ 12,5 kA); **MT** descărcătoare ZnO 24 kV la sosire LES și borne trafo; **semnal/SCADA** SPD pe date (fibră cu izolare galvanică preferată).
- **Echipotențializare de trăsnet:** toate masele/ecranele/structurile la bară de echipotențializare (BEP) la fiecare stație/invertor.

### 11.3. Protecția împotriva electrocutărilor

Servicii proprii JT: **TN-S**, întrerupere automată (disjunctoare + DDR/RCD 30 mA pe prize/iluminat exterior); legare de protecție clasa I la PE; zonare/marcare DC; distanțe de securitate și îngrădiri MT (SR EN 50110, PE 118).

---

## 12. SCADA, MONITORIZARE, STAȚIE METEO, PPC

### 12.1. SCADA / monitorizare

Colectează în timp real de la: **invertoare** (P,Q,U,I,f,cosφ,T,erori,energie — Modbus TCP/RS485); **combinere** (curent string — detectare defecte); **trafo** (T, Buchholz); **relee MT** (stări, alarme, oscilografe — IEC 61850/Modbus); **contor de decontare**; **stație meteo**. Arhitectură: datalogger local redundant → server SCADA (local+cloud) → HMI, alarmare, rapoarte producție/PR, integrare cu dispecerizarea OD/TSO.

### 12.2. Stație meteo (SR EN 62446-1)

Min. o stație la parc MW: **piranometru** POA (+ opțional GHI), **T modul** (PT100 pe spatele modulelor, ≥2), **T ambiantă + vânt**; opțional zăpadă, celulă de referință. Permite PR în timp real:
> **PR = E_măsurată / (P_DC × H_POA / G_STC)**.

### 12.3. Power Plant Controller (PPC)

Controlerul de nivel-centrală care realizează RfG **la punctul de racord** (nu per invertor): măsoară P/Q/U/cosφ/f la racord (TC/TT dedicate); primește **setpoint-uri de la dispecer** și le distribuie proporțional invertoarelor (buclă închisă); implementează **Q(U), cosφ(P), FSM/LFSM, ramp-rate**; loghează conformitatea. Timp de răspuns conform RfG; comunicație PPC–invertoare pe fibră/rețea industrială redundantă. **PPC devine obligatoriu la Tip B/C/D** — deci scalează cu puterea.

Rațiunea PPC: cerințele RfG se referă la comportamentul măsurat **în punctul de delimitare cu rețeaua**, nu la bornele fiecărui invertor. Între borna invertorului și PMD se interpun cabluri, transformatoare (care consumă reactiv în funcție de încărcare) și pierderi — astfel încât suma naivă a setpoint-urilor de invertor nu produce valoarea dorită la racord. PPC închide bucla: măsoară P, Q, U și cosφ real la racord, compară cu setpoint-ul primit de la dispecer (sau cu caracteristica Q(U) prescrisă) și ajustează dinamic comenzile către fiecare invertor până când mărimea la racord atinge ținta. La un ordin de dispecer de limitare a puterii active (de ex. „reduceți la 50 % din P_max" pentru congestie de rețea sau preț negativ), PPC repartizează reducerea între invertoare și menține gradientul în limita ramp-rate. PPC este, prin urmare, „creierul" de conformitate al centralei și componenta care face ca un parc de invertoare individuale să se comporte, față de rețea, ca un singur generator controlabil.

---

## 13. SERVICII PROPRII, ILUMINAT, CCTV / ANTIEFRACȚIE

### 13.1. Servicii proprii

Consumatori alimentați din TGJT 0,4 kV (consum propriu contorizat separat): ventilație/climatizare PT și camere invertoare; iluminat; SCADA/PPC/servere/comunicații/UPS; CCTV, antiefracție, control acces; prize mentenanță; încălzire anticondens celule MT; pompe drenaj/spălare (dacă există). Putere ≈ **10–25 kW** (scalează ușor cu nr. PT-uri). **UPS** (≥ 1–2 h) pentru SCADA/PPC/protecții MT/comunicații. Consum tehnologic propriu ≈ **0,5–1,5 % din producția brută anuală** (mărime procentuală, parametrică pe putere; § 9.5), acoperit ziua din propria producție și noaptea din rețea.

Alimentarea serviciilor proprii se face dintr-un transformator de servicii proprii (sau dintr-o înfășurare/priză a PT), astfel încât instalația să dispună de energie de comandă și protecție **indiferent de starea de producție** a centralei. Cerința critică de continuitate privește protecțiile de MT, protecția de interfață, SCADA, PPC și comunicația cu dispecerul: acestea trebuie să funcționeze și în absența rețelei (pentru a putea readuce centrala în sistem în siguranță la revenirea tensiunii) — de unde necesitatea UPS-ului cu autonomie de 1–2 ore și, la parcurile mari, a unei surse de rezervă. Încălzirea anticondens a celulelor de MT previne condensul care ar putea provoca conturnări pe izolatoarele interioare, iar climatizarea camerelor de invertoare menține temperatura sub pragul de derating termic al invertoarelor (peste ~45–50 °C ambianță, invertoarele își reduc automat puterea).

### 13.2. Iluminat

- **exterior/perimetral** LED pe stâlpi, comandă crepusculară + orar + mișcare (integrat CCTV);
- **de siguranță/evacuare** în PT (kit autonom, P118-3);
- niveluri: PT/tehnice 200–300 lx, căi acces 20–50 lx (NP 061).

### 13.3. CCTV, antiefracție, control acces

- **CCTV** perimetral (IP+IR, analiză video), NVR + cloud;
- **antiefracție** (bariere IR/detectoare pe gard, senzori uși PT, sirenă + comunicator la dispecerat);
- **control acces** PT; alimentare din servicii proprii + **backup baterie/UPS**.

### 13.4. Sisteme de urmărire solară (trackere) — dacă montajul este cu urmărire

Când structura de susținere este de tip **tracker mono-axial** (rotire est–vest în jurul unui ax orizontal N–S), în locul meselor fixe înclinate, apar consumatori și circuite de comandă suplimentare, tratate aici pentru completitudine (montajul fix nu le are). Alegerea fix vs. tracker este o decizie tehnico-economică independentă de dimensionarea electrică a stringului.

**Impactul asupra producției (fix vs. tracker).** Urmărirea solară crește iradierea captată în plan de modul menținând unghiul de incidență apropiat de normală pe durata zilei, cu un câștig energetic tipic de **+15…+25 %** pentru trackerul mono-axial (până la ~+30…+35 % în climate foarte însorite, cu componentă directă mare), față de montajul fix optim. Câștigul se traduce printr-un yield specific (kWh/kWp) mai mare și un profil de producție „aplatizat" (vârfuri de dimineață și seară mai pline), avantajos pentru piață. **Dimensionarea stringului (N_s, tensiuni, curent) NU se modifică** — modulele și limitele de tensiune sunt aceleași; se modifică doar producția (deci PR/energia) și adăugarea infrastructurii de tracker. Rămâne, așadar, integral parametric pe putere.

**Alimentare și comandă:**
- **motoare/actuatoare** de tracker (motoreductoare de c.c. 24/48 V sau motoare de c.a., ori actuatoare liniare) — câte unul pe rând/tracker sau grupate pe „table"; alimentate din serviciile proprii de JT prin tablouri de distribuție dedicate în câmp;
- **controller local de tracker (NCU — Node/Tracker Control Unit)** pe fiecare rând sau grup — calculează poziția solară (algoritm astronomic după coordonate, dată și oră) și comandă motorul; unele soluții sunt **autonome, alimentate de un mic modul FV propriu + acumulator**, eliminând cablarea de forță pe fiecare rând;
- **senzori:** poziție/unghi (encoder/inclinometru pentru feedback de poziție), iradianță (celulă/piranometru pentru optimizare și verificare), **anemometru (viteză și direcție vânt)** — critic pentru siguranță.

**Backtracking.** La unghiuri solare joase (dimineață/seară), rândurile de trackere s-ar umbri reciproc; algoritmul de **backtracking** reduce controlat unghiul de urmărire (rotește invers) astfel încât rândurile din spate să nu fie umbrite de cele din față, sacrificând puțină iradianță directă pentru a elimina pierderea mult mai mare prin umbrire de string. Backtracking-ul depinde de geometria câmpului (distanța dintre rânduri, GCR) și este implementat în controllerul de tracker.

**Poziția de siguranță (stow).** La depășirea unui prag de viteză a vântului (anemometrul semnalează, ex. > 15–20 m/s) sau la condiții meteo severe (grindină, zăpadă abundentă), trackerele sunt aduse automat în **poziția de siguranță (stow)** — de regulă orizontală sau la un unghi minim care reduce încărcarea din vânt (efect de portanță/flutter) și riscul de avarie structurală. Comanda de stow are **prioritate absolută** asupra urmăririi și trebuie să funcționeze și la lipsa rețelei (de aici acumulatorul de rezervă la controller/actuator). Un stow greșit sau întârziat este principala cauză de avarie catastrofală la parcurile cu trackere pe furtună.

**Integrare SCADA/PPC.** Controllerele de tracker se integrează în SCADA (Modbus/protocol dedicat) pentru monitorizarea poziției, a stărilor de eroare, a comenzilor de stow și a datelor de vânt; PPC/SCADA poate impune stow general, poziție de mentenanță (acces între rânduri) sau poziție de spălare. **Consumul propriu al trackerelor** este mic și intermitent (motoarele funcționează câteva minute pe oră pentru corecția de poziție), estimat la fracțiuni de procent din producție și inclus în consumul tehnologic propriu (0,5–1,5 %, § 9.5); la trackerele autonome (auto-alimentate) consumul din serviciile proprii este cvasi-nul.

---

## 14. BREVIAR DE DIMENSIONARE (TABELE DE SINTEZĂ)

### 14.1. Stringul-tip (invariant cu puterea)

| Mărime | Valoare | Sursă/formulă |
|---|---|---|
| Putere modul | 555 Wp | fișă |
| N module/string | 27 | 14 ≤ N_s ≤ 27 (§ 3) |
| Putere/string | 14,985 kWp | 27 × 555 |
| U_oc la −10 °C | 1.473,9 V | ≤ 1.500 V ✔ |
| U_mpp la STC | 1.134 V | 27 × 42,0 |
| U_mpp la +70 °C | 986 V | ≥ 500 V ✔ |
| Curent (mpp/sc) | 13,22 / 14,05 A | I_mpp / I_sc |
| I dimensionare | 17,56 A | 1,25 × I_sc |

### 14.2. Cabluri (secțiuni de referință, recalculabile la putere)

| Tronson | Tip | Secțiune | I_dim [A] | ΔU [%] | Notă scalare |
|---|---|---|---|---|---|
| String DC | H1Z2Z2-K 1,5 kV | 1×6 mm² Cu | 17,6 | 0,50 | invariant |
| Magistrală DC (4 str.) | H1Z2Z2-K | 1×25 mm² | 70,3 | < 1 | ∝ nr. stringuri/combiner |
| AC 0,8 kV | N2XY 0,6/1 kV | 3×95 mm² | 144 | < 0,5 | per invertor |
| AC 0,4 kV | NA2XY | 3×185+95 Al | 289 | ≈1,0 | per invertor |
| MT 20 kV | A2XS(F)2Y 12/20 | 95…300 mm² | I=S/(√3·U) | < 0,5 | **∝ P** (46 A/1,6MVA … 577 A/20MVA) |

### 14.3. Protecții

| Element | Tip | Reglaj |
|---|---|---|
| String DC | gPV 25 A / 1.500 V | 1,5–2,4 × I_sc |
| SPD DC | tip 1+2, Uc 1.800 V | I_imp 12,5 kA, I_n 20 kA |
| Sectionare DC | separator invertor + combiner | load-break 1.500 V |
| Invertor AC | disjunctor + SPD 1+2 | I_n ≈ 315 A/inv (0,4 kV) |
| Trafo — MT | întreruptor vid 24 kV + releu 50/51/51N | I>> 8×I_n; I> IDMT |
| Interfață racord | 27/59, 81U/81O, 67N, anti-islanding | per ATR/RfG |
| SPD MT | descărcător ZnO 24 kV | U_c ≈ 24 kV, I_n 10 kA |

### 14.4. Bilanțul de pierderi — Performance Ratio (independent de putere)

PR = produsul factorilor de randament (derate) de la POA la energia livrată. Bilanț de proiectare (valabil la orice putere — proprietate de tehnologie/climat):

| Componentă de pierdere | Factor | Pierdere | η parțial |
|---|---|---|---|
| Temperatura celulei (γ −0,34 %/°C) | 0,955 | −4,5 % | 0,955 |
| Soiling (praf/zăpadă) | 0,975 | −2,5 % | 0,931 |
| Mismatch (dispersie + LID) | 0,980 | −2,0 % | 0,912 |
| Cabluri DC (ohmic) | 0,990 | −1,0 % | 0,903 |
| Conversie invertor (η_euro 98,6 %) | 0,986 | −1,4 % | 0,891 |
| Clipping / limitare invertor (ILR 1,25) | 0,990 | −1,0 % | 0,882 |
| Cabluri AC + transformator (P₀+P_k) | 0,985 | −1,5 % | 0,868 |
| Consum auxiliar | 0,995 | −0,5 % | 0,864 |
| IAM / reflexie unghi + spectral | 0,985 | −1,5 % | 0,851 |
| Indisponibilitate (~99,3 %) | 0,993 | −0,7 % | 0,845 |
| Toleranță senzori / degradare an 1 | 0,985 | −1,5 % | **≈ 0,832** |

> **PR de proiectare ≈ 0,82–0,83** (an 1); scade cu degradarea (~−0,45…0,5 %/an). E_an ≈ P_DC[kWp] × 1,312 kWh/an.

**Interpretarea bilanțului.** Performance Ratio (raportul de performanță) exprimă cât din energia teoretic disponibilă (iradierea × puterea instalată la STC) ajunge efectiv livrată în rețea, după toate pierderile lanțului. Cea mai mare pierdere unică este cea **termică** — la temperaturi de celulă tipice de vară (+50…+65 °C), puterea modulelor scade cu ~4–5 % față de valoarea de catalog (măsurată la 25 °C); de aceea PR este mai bun iarna decât vara, chiar dacă energia absolută e mai mare vara. Următoarele ca pondere sunt **soiling-ul** (murdărire — praf, polen, găinaț de pasăre, zăpadă; se combate prin spălare periodică și prin panta modulelor) și **mismatch-ul** (dispersia de fabricație între module + degradarea neuniformă), atenuat de MPPT-ul granular al invertoarelor de string. Pierderile electrice propriu-zise — cabluri DC, conversie invertor, transformator, cabluri AC/MT — însumează, semnificativ, sub 5 %, ceea ce confirmă că dimensionarea electrică (secțiuni, ILR, trafo) este bine echilibrată: nu are sens supradimensionarea costisitoare a cablurilor pentru a câștiga zecimi de procent, câtă vreme pierderile termice și de soiling domină. **Fiecare factor din tabel este o proprietate de tehnologie și de climat, independentă de puterea totală** — de aceea PR ≈ 0,82 se aplică identic unui parc de 0,5 MW și unuia de 50 MW (diferă doar energia absolută, care scalează liniar cu P_DC).

**Pierderi transformator (ex. 1.600 kVA):** P = P₀ + P_k·(S/S_n)² = 1.700 + 15.000·1² = **16,7 kW**; η_trafo = 1.600.000/(1.600.000+16.700) = **98,97 %**.
**Pierderi LES 20 kV (ex. I=46,2 A, R=0,32 Ω/km, L=0,5 km):** 3·I²·R·L = 3×46,2²×0,32×0,5 = **1,0 kW (0,06 %)** — neglijabil; **∝ I² deci crește pătratic cu puterea** (motiv de trecere la 110 kV la putere mare).

---

## 15. PROBE, PUNERE ÎN FUNCȚIUNE ȘI RECEPȚIE

Punerea în funcțiune (PIF) este etapa care demonstrează, prin măsurători documentate, că instalația a fost executată corect, este sigură și funcționează la parametrii proiectați. Ea combină două registre: **verificările specifice fotovoltaice** (SR EN 62446-1, categoria 2 — sistem conectat la rețea) pentru partea DC și de sistem, respectiv **încercările clasice de instalații electrice** (PE 116/1994) pentru partea de JT/MT și pentru echipamentele de putere. Toate rezultatele se consemnează în buletine de încercări și se centralizează în dosarul de PIF, condiție pentru recepție și pentru punerea sub tensiune definitivă de către operatorul de rețea.

PIF conform **SR EN 62446-1** (sistem conectat la rețea) și **PE 116**, cu dosar de PIF:

**DC (IEC 62446):** continuitatea legăturilor de protecție/echipotențializare; polaritatea + V_oc per string (vs. valoarea calculată corectată la T); I_sc / curent de funcționare per string (detectare stringuri defecte); **rezistența de izolație DC** (≥ 1 MΩ, măsurare la 1.000 V); funcționarea gPV/SPD/separatoarelor; termografie IR (hot-spots).

**AC/MT (PE 116):** izolație cabluri JT/MT (Megger); **încercarea de tensiune mărită** a cablului MT (VLF 0,1 Hz sau f industrială); verificarea protecțiilor MT (injecție primară/secundară — reglaje 50/51/51N/67N + temporizări); verificarea trafo (raport, grupa, R înfășurări, u_k, rigiditate ulei); **măsurarea prizei de pământ** + tensiuni atingere/pas; verificarea contorizării (raport TC/TT, sensuri, sigilare OD).

**Teste RfG:** verificarea funcțiilor de sistem (LVRT, Q(U), cosφ(P), LFSM-O/U, ramp-rate) prin protocol supravegheat OD/TSO; reglarea protecției de interfață; **certificat de instalare + document de punere în funcțiune (Operational Notification)** conform RfG.

Recepția (PVR): după PIF cu buletine, dosar „as-built", instrucțiuni exploatare/mentenanță, certificatele echipamentelor (module IEC 61215/61730, invertoare IEC 62109 + RfG, trafo IEC 60076, celule IEC 62271) și avizul OD de punere sub tensiune definitivă.

**Semnificația verificării V_oc per string la PIF.** Măsurarea tensiunii de mers în gol pe fiecare string și compararea ei cu valoarea calculată (corectată la temperatura din momentul măsurării prin coeficienții din § 3) este cel mai eficient test de descoperire a erorilor de montaj: un string cu un modul lipsă/inversat, cu o conexiune întreruptă sau cu polaritate greșită dă o V_oc semnificativ diferită de restul. Un curent I_sc sau de funcționare mult sub media stringurilor vecine indică un modul defect, o umbrire sau o conexiune de rezistență mare. Termografia în infraroșu, efectuată sub sarcină în zi însorită, localizează punctele fierbinți (hot-spots) din module (celule fisurate, diode by-pass defecte) și din conexiuni (contacte slabe la conectori sau la borne) — cauze majore de pierdere de energie și de risc de incendiu. Aceste verificări, alături de măsurarea rezistenței de izolație DC (care detectează deteriorări ale izolației, infiltrații de apă, defecte la conectori), constituie „amprenta" inițială a instalației, față de care se compară măsurătorile periodice din exploatare.

**Verificarea prizei de pământ** se repetă la PIF (metoda căderii de potențial), iar dacă valoarea măsurată nu atinge pragul impus (§ 11.1) se completează rețeaua de electrozi până la conformitate — motivul pentru care conductorul de contur se prevede cu prize de măsură și cu posibilitatea de extindere.

---

## 16. MĂSURI DE SECURITATE LA INCENDIU (parte electrică)

Riscul de incendiu într-o centrală FV este concentrat în trei zone: (1) **câmpul DC** — unde arcul electric la un contact defect (conector prost sertizat, bornă slăbită, cablu ros de rozătoare) se poate autoîntreține și amorsa un incendiu, iar părțile rămân energizate de soare chiar cu invertorul oprit; (2) **camerele de invertoare** — echipamente electronice de putere cu disipare termică; (3) **postul de transformare** — mai ales la trafo în ulei (sarcină de foc + risc de scurgere/aprindere a uleiului). Măsurile de mai jos, coroborate cu P118-1/1999 și P118-3/2015, tratează diferențiat aceste zone. Esențială este colaborarea cu ISU la planul de intervenție: pompierii trebuie să știe că partea DC nu poate fi „scoasă de sub tensiune" prin simpla deconectare a rețelei, atât timp cât modulele sunt iluminate.

- **riscul DC:** arcul DC nu se autostinge; conectori certificați (MC4 originali, nemixați), siguranțe gPV, sectionare vizibilă, marcaje „DC prezent"; opțional AFCI la invertor;
- **PT/celule MT:** compartimentare rezistentă la foc (P118-1), stingătoare CO₂/pulbere, tavă de retenție ulei, ventilare;
- **detectare-semnalizare** în PT (P118-3) cu transmitere la dispecerat;
- **deconectare de urgență** (stop de emergență, sectionare generală) accesibilă pompierilor;
- **plan de intervenție** cu marcarea sectionărilor DC/AC/MT (partea DC rămâne energizată de soare chiar cu întrerupătorul general deschis);
- **acces și organizare de șantier de intervenție:** drumuri de incintă practicabile pentru autospeciale, sursă de apă/hidrant (dacă e impusă de scenariul de securitate la incendiu), distanțe de siguranță între blocuri de echipamente, împrejmuire cu porți de acces marcate;
- **compartimentare și clase de reacție la foc:** cablurile în canale/estacade se aleg cu clase de reacție la foc adecvate (fără propagarea flăcării), iar penetrațiile prin pereții rezistenți la foc ai PT se etanșează cu materiale certificate (paste/perne/coliere intumescente) pentru a păstra clasa de rezistență la foc a compartimentului.

Se subliniază încă o dată particularitatea fotovoltaicului față de o instalație clasică: **energia „sursei" nu se poate anula.** La un incendiu, întreruptorul general de MT și separatoarele izolează parcul de rețea, dar fiecare string continuă să producă tensiune atât timp cât modulele sunt luminate — inclusiv de flăcări sau de lumina reflectoarelor de intervenție nocturnă. Din acest motiv, sistemele moderne pot include **funcții de „rapid shutdown"** (deconectori la nivel de modul/string comandați să reducă tensiunea DC la o valoare sigură în câmp), iar planul de intervenție și instructajul ISU trebuie să trateze explicit riscul electric permanent al părții DC.

---

## 17. CONCLUZII ȘI CELE TREI COMPONENTE URBANISTICE

Prezentul memoriu fundamentează, la faza DTAC, soluția de instalații electrice a unei centrale fotovoltaice cu **putere instalată parametrică (500 kWp … 50 MWp)**, proiectată prin metoda **string-tip + multiplicare**: stringul de referință (27 module 555 Wp, 15,0 kWp, ~1.134 V DC, 13,22 A) este verificat riguros la temperatură (V_oc la −10 °C = 1.473,9 V < 1.500 V; V_mpp la +70 °C = 986 V, în fereastra MPPT) și este **invariant cu puterea totală**; numărul de stringuri, de invertoare, puterea și numărul transformatoarelor, secțiunile magistralelor MT și nivelul de tensiune al racordului **scalează prin formule explicite** (N_str = P_DC/P_string; P_AC = P_DC/ILR; S_T ≈ P_AC; U_racord 20/110 kV funcție de putere). Cablurile sunt verificate la curent admisibil și cădere de tensiune (< 1 %), protecțiile DC/AC/MT conform IEC/ANRE, iar centrala respectă cerințele **RfG** (Tip A/B/C/D — funcție de putere) prin invertoare certificate coordonate de PPC. Performance Ratio de proiectare ≈ 0,82; producția ≈ P_DC × 1.312 kWh/an. **Exemplul numeric la 2.000 kWp** (P_AC 1.600 kW, 134 stringuri, 8 invertoare 200 kW, PT 1.600 kVA, racord LES 20 kV) este dezvoltat ca *ilustrare a metodei*, nu ca fixare a puterii.

**Cele trei componente (regula de aur nr. 10):**

1. **ANALITICĂ** — dimensionare cu date reale (modul 555 Wp, coeficienți de temperatură din fișă), formule verificate și **parametrizate** (V_oc(T), V_mpp(T), N_str = P_DC/P_string, P_AC = P_DC/ILR, S_min scc, dispersie priză, bilanț PR), temei normativ (I7/2011, NTE 401/2003, PE 116, IEC 62446/62548/62305, Ord. ANRE 208/2018, RfG 2016/631). Fiecare cifră are sursă și formulă; tabelele au coloane-formulă pentru orice putere.

2. **GRAFICĂ** — reprezentarea pe hartă/plan a câmpului de module (GCR 0,45–0,55; ~1,5–2,0 ha/MWp), traseul LES/LEA până la PMD, amplasarea PT-urilor/invertoarelor (multiplicate cu puterea), culoarele de cabluri, priza de pământ perimetrală și zonele paratrăsnet; schema monofilară MT/JT și diagrama P-Q de capabilitate — în piesele desenate P.Th.

3. **PREDICȚIE** — proiecția producției pe 25–30 ani cu degradare ~0,45–0,5 %/an (PR an 1 ≈ 0,82 → an 25 ≈ 0,73), scenarii de repowering (înlocuire invertoare la ~12–15 ani, hibridizare cu stocare BESS pentru netezirea injecției și servicii de sistem, creșterea ILR/puterii la retehnologizare), integrare în strategia energetică locală (contribuție la ținta SRE a UAT, decarbonizare, comunități de energie). Proiecția este pozitivă și strategică, nu declin pasiv.

---

*Memoriu întocmit la faza DTAC, redactat parametric (P_DC variabilă 500 kWp – 50 MWp). Breviarele se detaliază și se avizează la fazele P.Th./D.E. și în proiectul de racordare aprobat de operatorul de distribuție. Nivelul de tensiune al racordului, reglajele protecțiilor și cerințele RfG se stabilesc prin Avizul Tehnic de Racordare (ATR), funcție de puterea efectiv aleasă.*
