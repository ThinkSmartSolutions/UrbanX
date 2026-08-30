# PTh-A — SUPLIMENT DE PROIECT TEHNIC DE EXECUȚIE (P.Th.) — ARHITECTURĂ / AMENAJAREA TERITORIULUI
## Parc fotovoltaic — Centrală Electrică Fotovoltaică (CEF), mese fixe 2V, racord LES/PT 0,4/20 kV
### Metodologie PARAMETRICĂ (P_DC = 500 kWp … 50 MWp) — exemplu numeric ilustrativ menținut: P_DC = 2.000 kWp (2 MWp)

---

## PTh-A.0 Preambul, obiectul suplimentului și corelarea cu memoriul DTAC

### PTh-A.0.1 Obiectul documentației

Prezentul document constituie **suplimentul de fază Proiect Tehnic de execuție (P.Th.)** al specialității arhitectură/amenajarea teritoriului pentru obiectivul **„Construire parc fotovoltaic (Centrală Electrică Fotovoltaică) cu putere instalată în curent continuu P_DC (variabilă de proiect), racordare la SEN prin post de transformare 0,4/20 kV și lucrări conexe de infrastructură"**, și se **adaugă** la memoriul de arhitectură deja elaborat în faza D.T.A.C. (fișierul `arhitectura.md` din prezentul dosar), fără a-l relua sau dubla. Documentul este redactat conform **art. 8 din Legea nr. 10/1995** privind calitatea în construcții (proiectul tehnic de execuție trebuie să dezvolte soluțiile DTAC/DALI la nivel de execuție, cu detalii, specificații și caiete de sarcini) și conform structurii-cadru pentru P.Th. și D.E. reglementate prin **Ordinul nr. 1.057/2023 al MDLPA** (conținutul-cadru al documentației tehnice de proiectare pe faze).

Toate datele de temă, dimensiunile, materialele și cifrele preiau **întocmai** memoriul DTAC de arhitectură, de rezistență și de instalații electrice deja existente în acest dosar: metodologia **parametrică** (P_DC variabilă de proiect, exemplu ilustrativ etichetat explicit **„EXEMPLU 2 MWp"**), geometria invariantă a celulei-tip (coarda mesei L = 4,58 m, unghi de înclinare β = 30°, pitch D_pitch = 12,0 m, GCR = 0,38, gardă la sol 0,8 m, înălțime maximă structură h_sus ≈ 3,1 m), suprafața de teren St ≈ 2,2–2,7 ha pentru exemplul de 2 MWp, gardul perimetral H = 2,0 m, cabina de comandă/pază (Su ≈ 20–29 mp la parc mic ≤ 2 MWp, Sc ≈ 26–35 mp) și postul de transformare 1.600 kVA în anvelopă prefabricată. Nu se introduc dimensiuni, materiale sau soluții noi față de DTAC — se **detaliază la nivel de execuție** ceea ce DTAC a stabilit la nivel de concept, conform regulii de aur a platformei privind neduplicarea conținutului între piese de fază diferită.

### PTh-A.0.2 Ce NU conține acest supliment (trimiteri, nu duplicare)

- **Dimensionarea structurală** a meselor, piloților/șuruburilor de fundare, verificările la vânt/zăpadă/seism, breviarele de calcul ale profilelor și îmbinărilor — aparțin exclusiv memoriului de rezistență (`structura.md`) și eventualului supliment `structura-pth.md`; prezentul document tratează **doar interfața arhitecturală** a acestor elemente (poziție, gabarit, aspect, tolerantă de amplasare), nu calculul lor.
- **Dimensionarea electrică** (stringuri, invertoare, cabluri, transformator, protecții, SCADA) — aparține memoriului de instalații electrice (`instalatii.md`); prezentul document reține **doar interfața de plan** (poziția platformelor, coridoarele de cablu, gabaritul anvelopelor).
- **Scenariul de securitate la incendiu** — piesă distinctă (`scenariu-psi.md`), aici se reiau doar cerințele care condiționează soluția arhitecturală (accesul autospecialelor, gradul de rezistență la foc al anvelopelor).
- **Analiza economică, LCOE, CAPEX/OPEX** — aparțin studiului de fezabilitate, nu prezentului supliment tehnic de execuție.

### PTh-A.0.3 Cadrul normativ de detaliere aplicat suplimentar față de DTAC

| Domeniu | Act normativ / standard | Rol la faza PTh |
|---|---|---|
| Conținut-cadru P.Th./D.E. | Ordinul MDLPA nr. 1.057/2023 | structura documentației pe faze, piese scrise/desenate obligatorii |
| Calitatea în construcții | Legea nr. 10/1995, HG nr. 925/1995 (verificare) | verificare de proiect la faza PTh, cerințele A–G |
| Caiete de sarcini | HG nr. 907/2016, Anexa 8 (conținut caiet de sarcini) | structura caietelor de sarcini pe categorii de lucrări |
| Execuție lucrări | Legea nr. 10/1995 art. 23 (obligațiile executantului) | plan de control calitate, PVLA, procese verbale de fază determinantă |
| Toleranțe execuție construcții | SR EN 13670 (execuția structurilor de beton), NE 012/2-2010 | toleranțe la platforme betonate, radier PT |
| Toleranțe montaj structuri metalice | SR EN 1090-1/-2, SR EN 1993-1-1 | toleranțe de verticalitate/aliniament mese și piloți |
| Recepția lucrărilor | Legea nr. 10/1995, HG nr. 273/1994 (regulament recepție) | recepție la terminarea lucrărilor, recepție finală |
| Cartea tehnică a construcției | HG nr. 273/1994, Anexa 7 | structura Cărții tehnice, capitolul de arhitectură |
| Trasarea lucrărilor | Legea nr. 7/1996 (cadastru), Ord. ANCPI | plan de trasare, materializare repere |
| Deșeuri de șantier | Legea nr. 211/2011, HG nr. 856/2002 | managementul deșeurilor de execuție |
| Sănătate și securitate în muncă (șantier) | Legea nr. 319/2006, HG nr. 300/2006 | plan propriu de securitate, PSI șantier |
| Accesibilitate PMR (execuție) | NP 051/2012 (revizuit) | verificare la recepție a toleranțelor de accesibilitate |
| Confort acustic | STAS 6156, SR 10009 | verificare acustică la recepție (zgomot la limita incintei) |
| Performanță energetică (cabină) | Legea nr. 372/2005, Metodologia MC001 | certificat de performanță energetică al cabinei |

### PTh-A.0.4 Structura suplimentului

Suplimentul urmează structura-cadru consacrată la nivelul bibliotecii UrbanX pentru faza PTh a specialității arhitectură, adaptată la specificul unei CEF (construcții minimale, dar organizare de sit extinsă): (A.1) detalii de execuție numerotate D01–D15 la scări mari; (A.2) tabloul de tâmplărie al cabinei; (A.3) specificațiile de finisaje pe încăpere; (A.4) tehnologia de execuție a lucrărilor de arhitectură/amenajare; (A.5) planul de control al calității; (A.6) toleranțele de execuție; (A.7) recepția lucrărilor; (A.8) cartea tehnică; (A.9) fișele tehnice de materiale FT-01…FT-10; (A.10) detalii suplimentare D16–D25; (A.11) confortul acustic; (A.12) planul de trasare; (A.13) breviarul de suprafețe as-built; (A.14) sistemul de semnalizare; (A.15) fișele de încăpere (room data sheets) ale cabinei; (A.16) studiul de umbrire/glare la nivel de execuție; (A.17) programul de mentenanță; (A.18) planul de management al calității; (A.19) măsurile de durabilitate/reversibilitate la nivel de execuție; (A.20) detalii suplimentare D26–D30 și sinteza planșelor PTh.

Ca și în memoriul DTAC, **elementele geometrice invariante** (β, pitch, GCR, coarda mesei) rămân neschimbate la orice putere, iar **elementele scalabile** (numărul de repetiții, lungimile de gard/drum, numărul de platforme) se calculează prin aceleași formule parametrice — la faza PTh acestea se transpun în **cote de trasare** și **toleranțe de execuție** concrete, aplicabile identic indiferent de P_DC.

---

## PTh-A.1 DETALII DE EXECUȚIE (D01–D15)

> Toate detaliile sunt corelate cu piesele desenate DTAC A-02…A-08 (plan de situație, secțiune caracteristică, planuri PT/cabină/gard/peisaj) și cu memoriile de rezistență/instalații pentru interfața structurală/electrică. Cotele reproduc valorile EXEMPLU 2 MWp ale DTAC; la altă putere, geometria detaliilor **rămâne identică** (sunt invariante — vezi §3 al memoriului DTAC de arhitectură), doar numărul de repetiții variind.

### D01 — Fundare pilot metalic bătut (ram-pile) — interfața arhitectură/structură (sc. 1:10)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Pilot metalic, profil C/U/sigma | oțel zincat termic EN ISO 1461, zinc ≥ 55–70 µm, secțiune conform breviarului de rezistență |
| 2 | Adâncime de încastrare | **1,5–2,0 m** (interval de principiu; valoarea exactă rezultă din testul de smulgere pull-out pe amplasament, conform studiului geotehnic — a se vedea nota de onestitate PTh-A.1bis) |
| 3 | Cotă de ieșire din teren (cap pilot) | +0,30…+0,40 m față de cota terenului amenajat, pentru racordul cu stâlpul vertical al mesei |
| 4 | Verticalitate admisă | abatere ≤ 1,0% din lungimea liberă (≤ 1° față de verticală) — a se vedea PTh-A.6.2 |
| 5 | Zonă de lucru | fâșie de 0,5 m în jurul pilotului, fără compactare mecanizată grea (evitarea afânării locale) |

**Text de cerințe de execuție/toleranțe:** Baterea se execută cu utilaj vibro-percutor ghidat pe șablon laser/GPS-RTK, cu control continuu al verticalității (nivelă digitală montată pe utilaj); toleranța de poziție în plan a capului de pilot este **± 20 mm** față de punctul de trasare, iar toleranța de cotă de nivel a capului de pilot este **± 15 mm**, pentru a permite montajul fără forțarea structurii metalice a mesei (jocurile de montaj ale clemelor sunt dimensionate pentru aceste toleranțe — a se vedea memoriul de rezistență). Se interzice baterea în condiții de îngheț al solului pe adâncimea activă sau pe sol saturat fără verificare geotehnică prealabilă. Fiecare al 20-lea pilot (minimum 1 pilot per grup de fundare omogenă) se supune unui **test de smulgere de control** în timpul execuției, conform planului de control al calității (PTh-A.5).

### D02 — Fundare pe șurub elicoidal (ground screw) — interfața arhitectură/structură (sc. 1:10)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Șurub elicoidal, tijă + elice | oțel zincat termic, diametru elice conform breviarului de rezistență (funcție de portanța cerută) |
| 2 | Adâncime de înșurubare | **1,2–1,8 m**, funcție de rezistența la penetrare înregistrată (cuplu de înșurubare monitorizat) |
| 3 | Cotă de ieșire | identică cu D01, pentru compatibilitatea aceleiași structuri de mesă |
| 4 | Cuplu de înșurubare minim | valoare de proiect stabilită prin corelația cuplu-portanță din studiul geotehnic/testul de probă |

**Text de cerințe de execuție/toleranțe:** Înșurubarea se execută cu cap hidraulic ghidat, cu înregistrare automată a cuplului de instalare pe toată adâncimea; dacă cuplul realizat la adâncimea de proiect este sub pragul minim de calcul, se continuă înșurubarea până la atingerea cuplului țintă sau se raportează la proiectant pentru soluție alternativă (adâncire, schimbare tip fundare local). Se aplică aceleași toleranțe de poziție/verticalitate ca la D01. Soluția se preferă pe soluri cu conținut de pietriș/rezistență ridicată unde baterea (D01) nu este eficientă, conform arborelui de decizie din memoriul de rezistență.

### D03 — Prinderea mesei de pilot — clemă reglabilă (sc. 1:5)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Clemă de reglaj pe 3 axe (X/Y/Z) | oțel inox A2/A4 sau oțel zincat, șuruburi cu cuplu controlat |
| 2 | Joc de reglaj | ± 30 mm pe orizontală, ± 40 mm pe verticală — absoarbe toleranțele de la D01/D02 |
| 3 | Cuplu de strângere | conform fișei tehnice a producătorului sistemului de montaj (torque check obligatoriu — PTh-A.5.3) |

**Text de cerințe de execuție/toleranțe:** Reglajul mesei se execută **după** stabilizarea completă a tuturor piloților unui rând (evitarea transmiterii de tensiuni între mese adiacente); planeitatea rândului de mese (linia de coamă) se verifică cu nivelă/laser rotativ, toleranță ≤ ± 15 mm pe lungimea unui rând, pentru a nu compromite drenajul apei de pe suprafața modulelor și aspectul general al câmpului.

### D04 — Împrejmuire perimetrală — gard zincat H = 2,0 m, soclu permeabil (sc. 1:20 + detaliu 1:5)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Panou de gard bordurat | plasă zincată/plastifiată, ochi 50×200 mm, H = **2,0 m** |
| 2 | Stâlp de gard | țeavă zincată Ø 60 mm, fundare punctuală, interax 2,5–3,0 m |
| 3 | Spațiu liber la bază | **10–15 cm** liber sub panou, pentru trecerea faunei mici (conform memoriului DTAC §6.1) |
| 4 | Fundare stâlp | fundație punctuală de beton C20/25, adâncime 0,5–0,6 m, sau șurub elicoidal mic |
| 5 | Fir de tensionare | fir zincat Ø 3 mm, pe 3 rânduri (sus, mijloc, jos), tensionat cu întinzător |

**Text de cerințe de execuție/toleranțe:** Verticalitatea stâlpilor de gard ≤ 1% din înălțime; aliniamentul gardului pe traseu ≤ ± 30 mm față de axul de trasare; spațiul liber de 10–15 cm la bază se verifică punctual la recepție (nu se admite continuitate de sol/beton pe toată lungimea, decât la traversările special prevăzute pentru scurgerea apelor). Panourile se montează cu suprapunere/etanșare la colțuri și la porți, fără spații care să permită accesul uman.

### D05 — Poartă carosabilă glisantă + poartă pietonală (sc. 1:20)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Poartă carosabilă glisantă | cadru metalic zincat + plasă identică gardului, lățime liberă **≥ 4,0 m** |
| 2 | Poartă pietonală | lățime liberă **≥ 0,90 m**, cu yală/control acces |
| 3 | Sistem de acționare | motorizat, cu telecomandă și buton de deblocare manuală de urgență (acces ISU) |
| 4 | Fundație șină de rulare | grindă de ghidaj din beton C20/25, adâncime 0,4 m, lungime = 2× deschiderea porții |

**Text de cerințe de execuție/toleranțe:** Grinda de ghidaj se toarnă cu planeitate ≤ ± 5 mm pe lungime (rulare fără frecare); butonul de deblocare manuală se amplasează accesibil din exterior pentru intervenția ISU, conform scenariului de securitate la incendiu. Raza de viraj la intrare respectă gabaritul autospecialei de intervenție (≥ 12 m, a se vedea memoriul DTAC §4.3).

### D06 — Platformă post de transformare (PT) — radier + cuvă de retenție ulei (sc. 1:20 + detaliu 1:5)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Radier beton armat | C25/30, grosime 20–25 cm, armat conform breviarului de rezistență §6.4.1 |
| 2 | Cuvă de retenție ulei | volum ≥ **100% din volumul de ulei** al transformatorului, cu strat de pietriș drenant/separator hidrocarburi |
| 3 | Hidroizolație cuvă | membrană hidroizolantă de tip cuvă (bentonitică sau bituminoasă armată), etanșă la hidrocarburi |
| 4 | Pantă de scurgere platformă | 1,5–2,0% spre exterior, evitând acumularea apei pluviale la baza anvelopei PT |
| 5 | Bordură perimetrală platformă | prefabricată din beton, H = 15 cm |

**Text de cerințe de execuție/toleranțe:** Planeitatea radierului ≤ ± 8 mm sub dreptar de 2 m (toleranță standard pentru așezarea anvelopei prefabricate fără forțare); etanșeitatea cuvei se verifică prin **probă cu apă** (umplere și menținere 24 h, fără pierdere de nivel > 2 mm) înainte de montarea transformatorului — punct de control obligatoriu (PVLA, PTh-A.5.3). Priza de pământ și centura de echipotențializare (coordonate cu memoriul de instalații electrice) se pozează **înainte** de turnarea radierului, cu conductorul rămas accesibil pentru continuitate.

### D07 — Cabina de comandă/pază — soclu și hidroizolație (sc. 1:5)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Fundație/radier cabină | beton armat C20/25, adâncime de fundare ≥ adâncimea de îngheț zonală (0,8–1,0 m) |
| 2 | Soclu | H ≥ 30 cm peste cota terenului amenajat, tencuială soclu hidrofugă |
| 3 | Hidroizolație orizontală | membrană bituminoasă lipită, sub zidărie, la nivelul soclului |
| 4 | Hidroizolație verticală | vopsea bituminoasă bicomponentă, 2 straturi, pe toată înălțimea soclului îngropat |
| 5 | Drenaj perimetral | strat de pietriș 20 cm lățime, cu pantă spre rigolă/teren natural |

**Text de cerințe de execuție/toleranțe:** Racordarea hidroizolației orizontale cu cea verticală se execută **continuu, fără întrerupere**, cu suprapunere ≥ 10 cm; se interzice traversarea soclului de instalații fără manșon etanș. Verificare la recepția fazei determinante „hidroizolații soclu" — obligatorie înainte de acoperirea cu pământ (PVLA).

### D08 — Cabina de comandă/pază — prag acces „la zero" cu rampă/lipsă de prag, acces PMR (sc. 1:10)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Prag acces | denivelare ≤ 2 cm (teșit la 1:2) sau acces la zero cu rigolă de colectare exterioară |
| 2 | Rampă (dacă diferența de nivel > 2 cm) | pantă maximă **8%**, lățime liberă ≥ 1,20 m, cu parapete/borduri de siguranță H ≥ 5 cm |
| 3 | Ușă de acces | lățime liberă ≥ **0,90 m**, deschidere spre exterior sau glisantă |
| 4 | Suprafață de manevră exterioară | cerc Ø ≥ 1,50 m, pardoseală antiderapantă, fără prag |

**Text de cerințe de execuție/toleranțe:** Panta rampei se verifică cu nivela digitală (toleranță ± 0,5%); pardoseala exterioară de acces se execută din material antiderapant clasa **R11** (zonă exterioară), cu pantă de scurgere 1,5% perpendiculară pe sensul de deplasare pentru a evita băltirea fără a compromite accesibilitatea. Conform NP 051/2012, verificarea acestor cote este obligatorie la recepția lucrărilor de arhitectură (PTh-A.7.2).

### D09 — Rigolă/canal de drenaj de-a lungul drumului perimetral (sc. 1:10)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Rigolă înierbată (swale) | secțiune trapezoidală, lățime bază 0,3–0,5 m, adâncime 0,2–0,3 m |
| 2 | Pantă longitudinală rigolă | 0,3–0,5% minim, spre punctul de infiltrare/emisar natural |
| 3 | Strat vegetal rigolă | gazon rezistent la umiditate temporară, însămânțat |

**Text de cerințe de execuție/toleranțe:** Rigola se execută cu profil continuu, fără puncte de contrapantă (verificare cu nivelă pe toată lungimea); se evită impermeabilizarea rigolei (fără beton continuu), conform principiului de gestiune a apelor prin infiltrare pe amplasament (memoriul DTAC §7.1). La traversarea drumurilor de incintă, rigola se dublează cu podeț/tub PVC Ø 300–400 mm (D10).

### D10 — Trecere cablu subteran sub drum de incintă — tub de protecție (sc. 1:10)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Tub de protecție cablu | PVC/PEHD corugat, Ø 110–160 mm, funcție de numărul de cabluri |
| 2 | Adâncime de pozare sub drum | ≥ 0,80 m (protecție la sarcini de trafic tehnologic) |
| 3 | Bandă de avertizare | bandă de plastic marcată „ATENȚIE CABLU ELECTRIC", la 0,3 m deasupra tubului |
| 4 | Pat de nisip | strat de nisip 10 cm sub și peste tub, înainte de umplutura compactată |

**Text de cerințe de execuție/toleranțe:** Compactarea umpluturii deasupra tubului se face în straturi de max. 20 cm, grad de compactare Proctor ≥ 95%, pentru a evita tasări ulterioare ale drumului; poziția exactă a tuburilor se relevează topografic (as-built) și se predă la Cartea tehnică (PTh-A.8), fiind element critic pentru mentenanța ulterioară fără deteriorarea cablurilor.

### D11 — Coridor tehnologic de cablu între rânduri (canal deschis, în pitch) (sc. 1:20)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Coridor liber între rânduri | D_pitch − b ≈ **8,0 m** liber (invariant, conform DTAC §4.2) |
| 2 | Șanț cablu DC (dacă îngropat) | adâncime 0,5–0,7 m, în lungul rândului de mese, la 1,0–1,5 m de axul pilotului |
| 3 | Alternativă: cablu pe suport aerian jos (estacadă) | suport metalic H ≈ 0,3–0,5 m deasupra solului, la baza mesei |

**Text de cerințe de execuție/toleranțe:** Alegerea între cablare îngropată și cablare pe estacadă joasă se stabilește de proiectantul de instalații electrice; arhitectura rezervă **coridorul de acces neobstrucționat** pentru ambele soluții, fără elemente construite (pietre, borduri) care să blocheze utilajul de cosire/pășunat.

### D12 — Stâlp semnalistică de pericol electric + CCTV/iluminat (sc. 1:10)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Stâlp metalic | țeavă zincată Ø 60–89 mm, H = 2,5–3,0 m |
| 2 | Placă avertizare pericol electrocutare | aluminiu/PVC rigid, pictograme SR EN ISO 7010, min. 300×400 mm |
| 3 | Fundație stâlp | fundație punctuală beton C20/25, 0,5×0,5×0,6 m |
| 4 | Corp CCTV/iluminat (unde e cazul) | montat la partea superioară, orientare reglabilă |

**Text de cerințe de execuție/toleranțe:** Interax de amplasare a plăcilor de avertizare pe gard ≤ 25–30 m și obligatoriu la fiecare poartă; înălțimea de montare a plăcii la ochii unui adult (1,4–1,6 m) pentru lizibilitate; stâlpii CCTV/iluminat se poziționează pe banda liberă perimetrală, fără a umbri modulele (conform DTAC §6.2).

### D13 — Perdea vegetală perimetrală — secțiune de plantare (sc. 1:20)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Bandă de plantare | lățime 2,0–3,0 m, în interiorul benzii libere de retragere (≥ 3,0–5,0 m) |
| 2 | Specii | arbuști/arbori de talie mică-medie, specii autohtone (păducel, corn, sânger, arțar de câmp) |
| 3 | Interax de plantare | 1,0–1,5 m pe rând, 2 rânduri decalate (quincunx) pentru masare rapidă |
| 4 | Pământ vegetal de plantare | strat 0,4–0,5 m grosime, amestec pământ vegetal + compost |

**Text de cerințe de execuție/toleranțe:** Plantarea se execută în perioada de repaus vegetativ (toamnă/primăvară timpurie); udarea de întreținere obligatorie primii 2 ani (perioadă critică de prindere); pe latura sudică se folosesc **exclusiv** specii de talie joasă menținute sub înălțimea de umbrire (conform criteriului anti-umbrire de orizont, DTAC §2.4) — verificare la recepția lucrărilor de peisagistică.

### D14 — Cameră/hotel pentru insecte și cuiburi pentru păsări — detaliu montaj (sc. 1:10)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Structură „hotel de insecte" | lemn tratat, module cu găuri de diametre variate, montat pe stâlp/gard |
| 2 | Căsuță pentru păsări | lemn, montată pe stâlp la H = 2,5–3,0 m, orientare ferită de vânturi dominante |
| 3 | Amplasare | pe perimetru, la interfața cu perdeaua vegetală, densitate 1 element/50–100 m gard |

**Text de cerințe de execuție/toleranțe:** Măsură de ameliorare ecologică (unde este cerută prin acordul de mediu, Legea nr. 292/2018); montaj la înălțime care evitare accesul prădătorilor de la sol; se predă la Cartea tehnică lista și pozițiile elementelor instalate.

### D15 — Racord acces din drumul public — podeț peste rigolă (sc. 1:20)

| Element | Descriere | Material / dimensiune |
|---|---|---|
| 1 | Podeț carosabil | tub PREMO Ø 500–800 mm sau dală prefabricată, funcție de secțiunea rigolei drumului public |
| 2 | Lățime podeț | ≥ lățimea drumului de acces (4,0–5,0 m) + racordări laterale |
| 3 | Capacitate portantă | dimensionată pentru transportul agabaritic al transformatorului/anvelopei PT (clasa de încărcare grea) |

**Text de cerințe de execuție/toleranțe:** Execuția podețului necesită avizul administratorului drumului public (CNAIR/CJ/Primărie, conform OG nr. 43/1997); racordarea în plan și profil longitudinal respectă normele tehnice rutiere pentru raza de viraj a vehiculelor grele (≥ 8–10 m, conform DTAC §4.3); se verifică debitul rigolei drumului public pentru dimensionarea corectă a secțiunii podețului (nu se reduce capacitatea de scurgere a rigolei existente).

### PTh-A.1bis — Notă de onestitate privind valorile geotehnice

Adâncimile de fundare (D01: 1,5–2,0 m; D02: 1,2–1,8 m) și cuplul minim de înșurubare sunt **intervale de principiu**, preluate identic din memoriul DTAC de arhitectură și din cel de rezistență. Valoarea exactă de execuție **nu poate fi stabilită fără studiul geotehnic specific amplasamentului** (teste de smulgere pull-out și de împingere laterală, conform memoriului de rezistență §4.4/§4.6) — acesta este motivul pentru care ambele memorii tratează adâncimea ca interval, nu ca cifră fixă; documentul nu inventează o valoare unică falsă, ci fixează procedura de determinare (test de probă pe cel puțin 3 piloți înainte de baterea/înșurubarea de serie) și pragul minim acceptat, verificate în teren la faza de execuție.

---

## PTh-A.2 TABLOUL DE TÂMPLĂRIE DETALIAT (cabina de comandă/pază)

### PTh-A.2.1 Tâmplărie exterioară

| Poziție | Denumire | Dimensiuni (l×h, cm) | U_w (W/m²K) | Descriere |
|---|---|---|---|---|
| T-01 | Ușă de acces principal | 100×210 | ≤ 1,4 | PVC/aluminiu cu rupere punte termică, panou plin + vizor, cu prag redus/zero (D08) |
| T-02 | Fereastră cameră comandă/SCADA | 120×150 | ≤ 1,3 | PVC/aluminiu, geam termopan 4-16-4 Low-E, cu grilaj de protecție exterior |
| T-03 | Fereastră grup sanitar | 60×60 | ≤ 1,4 | PVC, geam mat, oscilobatant, cu ventilație controlată |
| T-04 | Fereastră depozit/vestiar | 80×100 | ≤ 1,4 | PVC, geam termopan, cu grilaj de protecție |

### PTh-A.2.2 Tâmplărie interioară

| Poziție | Denumire | Dimensiuni (l×h, cm) | Descriere |
|---|---|---|---|
| Ti-01 | Ușă cameră comandă/SCADA | 90×210 | lemn/PVC, rezistență la uzură, cu prag redus |
| Ti-02 | Ușă grup sanitar (accesibil PMR) | 90×210 | deschidere spre exterior sau glisantă, bară de tragere interioară |
| Ti-03 | Ușă depozit/vestiar | 80×210 | lemn/PVC |

### PTh-A.2.3 Ferestre și tâmplărie a anvelopei PT (informativ, coordonare cu instalații)

Anvelopa postului de transformare prefabricat nu conține tâmplărie de tip clădire, ci **uși tehnologice metalice** (acces celule MT/JT), cu grile de ventilație naturală dimensionate de producătorul anvelopei conform pierderilor termice ale transformatorului (coordonare cu memoriul de instalații electrice, §8.5); arhitectura reține doar gabaritul anvelopei și accesul liber în fața ușilor tehnologice (spațiu de manevră ≥ 1,0 m conform normelor de exploatare electrică).

---

## PTh-A.3 SPECIFICAȚII TEHNICE DE FINISAJE (fișă pe încăpere — cabina de comandă/pază)

### PTh-A.3.1 Fișă finisaje — Cameră comandă/SCADA + pază

| Element | Material | Clasă/performanță |
|---|---|---|
| Pardoseală | covor PVC electroizolant antistatic | rezistență electrică de suprafață 10⁶–10⁹ Ω, clasa antiderapantă R9 |
| Perete | zugrăveală lavabilă, culoare deschisă | rezistență la spălare clasa 1 |
| Tavan | tencuit/gletuit, vopsit | — |
| Plintă | PVC, h = 10 cm | — |

### PTh-A.3.2 Fișă finisaje — Grup sanitar accesibil PMR

| Element | Material | Clasă/performanță |
|---|---|---|
| Pardoseală | gresie tehnică | antiderapantă R10–R11, rezistentă la umiditate |
| Perete (zonă umedă) | faianță h = 2,0 m | rezistentă la umiditate, rosturi igienice |
| Obiecte sanitare | WC suspendat + lavoar la cotă accesibilă (0,80–0,85 m) | conform NP 051/2012 |
| Bare de sprijin | inox, montaj conform D17 (PTh-A.10) | rezistență la smulgere ≥ 150 kg |

### PTh-A.3.3 Fișă finisaje — Depozit scule/vestiar

| Element | Material | Clasă/performanță |
|---|---|---|
| Pardoseală | gresie tehnică sau beton sclivisit | rezistentă la abraziune |
| Perete | zugrăveală lavabilă | — |
| Mobilier fix | rafturi metalice, cuier vestiar | — |

### PTh-A.3.4 Fișă finisaje — Hol/circulație

| Element | Material | Clasă/performanță |
|---|---|---|
| Pardoseală | gresie tehnică antiderapantă | R10, continuitate cu accesul exterior (fără prag, D08) |
| Perete | zugrăveală lavabilă | — |

---

## PTh-A.4 TEHNOLOGIA DE EXECUȚIE A LUCRĂRILOR DE ARHITECTURĂ/AMENAJARE

### PTh-A.4.1 Succesiunea generală a operațiilor (conform DTAC §12.1, detaliată la nivel de execuție)

| Etapă | Lucrare | Interfață/condiționare |
|---|---|---|
| 1 | Organizare de șantier, împrejmuire provizorie, platforme de depozitare | acces asigurat din drumul public existent |
| 2 | Trasare topografică generală (axe, repere, tramă) | PTh-A.12; predare bornă de referință |
| 3 | Execuție drumuri de incintă (strat de formă + balastare) | verificare grad de compactare Proctor ≥ 95% |
| 4 | Execuție platforme betonate PT/skid-uri invertoare | vezi D06; probă etanșeitate cuvă |
| 5 | Baterea/înșurubarea piloților pe rânduri (D01/D02) | test de smulgere de control pe eșantion |
| 6 | Montaj structuri metalice mese + reglaj (D03) | verificare planeitate rând |
| 7 | Montaj module fotovoltaice | (piesă electrică/structurală — arhitectura rezervă accesul) |
| 8 | Pozare cabluri (D10/D11) și montaj invertoare/PT | coordonare cu instalații electrice |
| 9 | Execuție cabină comandă/pază (fundație, structură, finisaje) | D07/D08, PTh-A.2/A.3 |
| 10 | Împrejmuire definitivă (D04), porți (D05) | |
| 11 | Sistem CCTV/antiefracție/iluminat, semnalistică (D12) | |
| 12 | Amenajare peisagistică — perdea vegetală (D13), covor vegetal, elemente de biodiversitate (D14) | |
| 13 | Rigole/drenaj (D09), podeț de acces (D15) | |
| 14 | Curățenie generală, verificări finale, recepție pe faze | PTh-A.7 |

### PTh-A.4.2 Condiții și reguli tehnologice critice

- **Interdicția lucrărilor de fundare pe timp de îngheț** al solului activ sau pe teren saturat neverificat geotehnic.
- **Succesiunea obligatorie „drum → platforme → fundare mese"**: drumurile de incintă se execută înaintea baterii piloților, pentru a permite accesul utilajelor grele fără afectarea câmpului deja montat.
- **Protejarea modulelor deja montate**: la extinderea câmpului în etape, se interzice circulația utilajelor grele prin rândurile finalizate — se folosesc coridoarele de mentenanță (D11).
- **Coordonarea electrică-arhitectură**: pozarea cablurilor (D10/D11) se execută **înainte** de amenajarea peisagistică finală (D13), pentru a evita deteriorarea plantațiilor tinere.
- **Protecția stratului vegetal** în afara zonelor de lucru — delimitare cu bandă/împrejmuire provizorie a zonelor de circulație a utilajelor, limitând compactarea solului la strictul necesar.

---

## PTh-A.5 PLANUL DE CONTROL AL CALITĂȚII — ARHITECTURĂ/AMENAJARE

### PTh-A.5.1 Matrice de control pe categorii de lucrări

| Categorie | Verificare | Frecvență | Responsabil |
|---|---|---|---|
| Trasare generală | conformitate cu planul de trasare (PTh-A.12) | la fiecare etapă de trasare | topograf + diriginte |
| Fundare piloți/șuruburi | verticalitate, cotă cap pilot, test de smulgere | 100% verticalitate; test pe eșantion (min. 3 + 1/20) | executant + proiectant rezistență |
| Platforme betonate | planeitate, etanșeitate cuvă PT | 100% platforme | executant + diriginte |
| Structură cabină | hidroizolații, verticalitate zidărie | la fiecare fază determinantă | diriginte + proiectant |
| Împrejmuire | aliniament, verticalitate stâlpi, spațiu la bază | eșantion 10% + puncte critice (colțuri, porți) | executant + diriginte |
| Amenajări peisagistice | prindere plantații (control la 6 luni) | la recepție + control post-recepție 1 an | executant peisagist |
| Semnalistică | prezență, poziționare, lizibilitate | 100% la recepție | diriginte + beneficiar |

### PTh-A.5.2 Abateri admisibile — sinteză (a se vedea și PTh-A.6)

| Element | Abatere admisă |
|---|---|
| Poziție în plan pilot/șurub | ± 20 mm |
| Verticalitate pilot/șurub | ≤ 1,0% din lungime |
| Planeitate rând de mese | ± 15 mm pe lungime |
| Planeitate radier PT | ± 8 mm sub dreptar 2 m |
| Aliniament gard | ± 30 mm |
| Verticalitate stâlp gard | ≤ 1,0% din înălțime |
| Pantă rampă acces cabină | ± 0,5% față de 8% maxim |

### PTh-A.5.3 Lista PVLA obligatorii (procese verbale de lucrări ascunse)

1. Trasare generală și predare repere (PTh-A.12).
2. Test de smulgere pe piloți/șuruburi de probă, înainte de execuția de serie.
3. Armătura radierului PT (înainte de turnare betonului) — coordonat cu memoriul de rezistență.
4. Etanșeitatea cuvei de retenție ulei (proba cu apă, D06).
5. Hidroizolațiile soclului cabinei (D07), înainte de acoperire cu pământ.
6. Poziția tuburilor de protecție cablu sub drum (D10), înainte de acoperire.
7. Priza de pământ și centura de echipotențializare, înainte de acoperire (coordonat cu instalații).
8. Compactarea straturilor de formă ale drumurilor de incintă.

---

## PTh-A.6 TOLERANȚE DE EXECUȚIE

### PTh-A.6.1 Toleranțe la geometria câmpului (specifice CEF)

| Parametru | Valoare de proiect | Toleranță de execuție | Justificare |
|---|---|---|---|
| Pitch D_pitch | 12,0 m | ± 50 mm | menține umbrirea reziduală în limitele calculate (<1%/an) |
| Unghi de înclinare β | 30° | ± 0,5° | menține performanța energetică estimată |
| Coarda mesei L (aliniament) | 4,58 m | ± 15 mm | corelare cu modularea electrică a stringurilor |
| Aliniament rânduri (perpendicularitate pe axul E–V) | — | ± 0,3° pe lungimea rândului | evitarea convergenței/divergenței vizuale a rândurilor |
| Gardă la sol | 0,8 m | ± 30 mm | menține accesul faunei/vegetației și ventilația |

### PTh-A.6.2 Verticalitate

| Element | Toleranță |
|---|---|
| Pilot/șurub de fundare | ≤ 1,0% din lungimea liberă |
| Stâlp de gard | ≤ 1,0% din înălțime |
| Pereți cabină comandă | ≤ 2 mm/m, max. 10 mm pe toată înălțimea (conform practicii curente de execuție zidărie/gips-carton) |

### PTh-A.6.3 Planeitate

| Element | Toleranță |
|---|---|
| Radier platformă PT | ± 8 mm sub dreptar 2 m |
| Pardoseală cabină | ± 4 mm sub dreptar 2 m (finisaj) |
| Drum de incintă (strat final) | ± 15 mm sub dreptar 3 m |

### PTh-A.6.4 Pante și niveluri

| Element | Pantă de proiect | Toleranță |
|---|---|---|
| Platformă PT (scurgere) | 1,5–2,0% | ± 0,3% |
| Rampă acces PMR | ≤ 8% | ± 0,5% |
| Rigolă de drenaj | ≥ 0,3–0,5% | fără contrapantă (0% minim absolut) |

---

## PTh-A.7 RECEPȚIA LUCRĂRILOR DE ARHITECTURĂ/AMENAJARE

### PTh-A.7.1 Recepții pe faze/lucrări ascunse

Se organizează recepții pe fază determinantă pentru: fundarea piloților/șuruburilor (după testele de smulgere de control), armătura și etanșeitatea cuvei PT, hidroizolațiile cabinei, pozarea tuburilor de cablu și a prizei de pământ înainte de acoperire, conform listei PVLA (PTh-A.5.3). Fiecare recepție de fază se consemnează în procesul-verbal semnat de executant, dirigintele de șantier și proiectant (unde e cazul), și se anexează la Cartea tehnică.

### PTh-A.7.2 Recepția la terminarea lucrărilor (arhitectură)

Verificări obligatorii la recepția la terminarea lucrărilor: conformitatea geometriei câmpului cu tolerantele PTh-A.6 (verificare topografică as-built comparativă cu planul de trasare), integritatea și continuitatea gardului (inclusiv spațiul liber la bază), funcționarea porților (inclusiv deblocarea manuală de urgență), accesibilitatea PMR a cabinei (toleranțe prag/rampă/GS), etanșeitatea cuvei PT (raport probă cu apă), prezența și lizibilitatea semnalisticii de pericol electric, starea plantațiilor (prindere confirmată vizual), funcționarea sistemului de drenaj (fără băltiri la prima ploaie de test).

### PTh-A.7.3 Recepția finală (după perioada de garanție)

La expirarea perioadei de garanție (conform contractului de execuție, uzual 12–36 luni) se verifică suplimentar: prinderea definitivă a perdelei vegetale (rata de supraviețuire ≥ 85%, cu completări acolo unde e cazul), absența tasărilor la platforme și drumuri, integritatea hidroizolațiilor (fără infiltrații la cabină/PT), starea galvanizării structurilor metalice (fără coroziune vizibilă prematură), funcționarea corectă a rigolelor de drenaj pe ciclul sezonier complet.

---

## PTh-A.8 CARTEA TEHNICĂ — PARTEA DE ARHITECTURĂ/AMENAJARE

### PTh-A.8.1 Conținutul dosarului de arhitectură (as-built)

- Planul de situație as-built (poziția reală a tramei de mese, drumurilor, platformelor, gardului, cabinei, perdelei vegetale), cu abateri față de proiect documentate.
- Releveul topografic al traseelor de cabluri îngropate (D10/D11) — esențial pentru mentenanța ulterioară fără riscul deteriorării cablurilor.
- Certificatele de calitate ale materialelor puse în operă: zincarea gardului/structurilor (rapoarte de grosime strat zinc), betoanele (rapoarte de rezistență la 28 zile), hidroizolațiile (fișe tehnice + certificate de conformitate).
- Procesele-verbale de recepție pe faze (PTh-A.7.1) și rapoartele testelor de smulgere.
- Fișele tehnice de materiale (PTh-A.9) și planurile de detaliu executate (D01–D30).

### PTh-A.8.2 Instrucțiuni de exploatare și întreținere (extras arhitectură)

Se predau beneficiarului: programul de mentenanță a gardului/porților/drumurilor (PTh-A.17), procedura de verificare periodică a etanșeității cuvei PT, procedura de cosire/pășunat controlat (fără erbicide), lista contactelor pentru intervenție în caz de deteriorare a gardului/semnalisticii, planul de trasare pentru reperare rapidă în caz de reparații.

### PTh-A.8.3 Predarea cărții tehnice

Cartea tehnică se predă beneficiarului la recepția la terminarea lucrărilor, în formă completă (fizică și electronică), conform HG nr. 273/1994, Anexa 7, și se actualizează la fiecare intervenție majoră ulterioară (înlocuire componente, extindere de putere).

---

## PTh-A.9 FIȘE TEHNICE DE MATERIALE (caiet de produse — arhitectură/amenajare)

### PTh-A.9.1 Preambul și mod de utilizare a fișelor

Fișele următoare completează specificațiile din memoriul DTAC (materialele acolo enunțate la nivel de concept) cu **parametrii de produs, criteriile de acceptanță și modul de verificare** necesari execuției; ele NU înlocuiesc fișele tehnice ale producătorilor efectiv contractați, ci fixează **pragurile minime de performanță** pe care orice produs echivalent trebuie să le respecte.

### PTh-A.9.2 Fișă tehnică FT-01: Gard zincat bordurat + stâlpi

| Parametru | Cerință minimă |
|---|---|
| Protecție anticorozivă | zincare termică EN ISO 1461, strat ≥ 55–70 µm |
| Clasa de corozivitate atmosferică | C2–C3 (ISO 9223); C4–C5 în zone litorale/industriale — grosime sporită |
| Înălțime panou | 2,0 m |
| Rezistență la tracțiune plasă | conform SR EN 10223-6 (plase din sârmă zincată) |

### PTh-A.9.3 Fișă tehnică FT-02: Membrane hidroizolante (soclu cabină + cuvă PT)

| Parametru | Cerință minimă |
|---|---|
| Tip | bituminoasă armată cu poliester sau bentonitică (cuvă) |
| Rezistență la hidrocarburi (cuvă PT) | etanșeitate confirmată la contact cu ulei de transformator |
| Alungire la rupere | ≥ 40% (membrane bituminoase) |
| Verificare la punere în operă | probă cu apă 24 h, fără pierdere de nivel > 2 mm |

### PTh-A.9.4 Fișă tehnică FT-03: Tâmplărie cabină comandă/pază

| Parametru | Cerință minimă |
|---|---|
| U_w ferestre | ≤ 1,3 W/m²K |
| U_d uși exterioare | ≤ 1,4 W/m²K |
| Etanșeitate la aer | clasa 3 (SR EN 12207) |
| Rezistență la efracție (fereastră cameră SCADA) | grilaj de protecție suplimentar sau geam RC2 |

### PTh-A.9.5 Fișă tehnică FT-04: Pardoseli PVC electroizolante (cameră SCADA)

| Parametru | Cerință minimă |
|---|---|
| Rezistență electrică de suprafață | 10⁶–10⁹ Ω (disipativ static) |
| Clasă de trafic | comercial mediu (uz tehnic) |
| Reacție la foc | Bfl-s1 minim |

### PTh-A.9.6 Fișă tehnică FT-05: Gresie tehnică (GS, hol, depozit)

| Parametru | Cerință minimă |
|---|---|
| Antiderapanță | R10 (interior), R11 (acces exterior/rampă) |
| Absorbție de apă | ≤ 3% (gresie porțelanată) |

### PTh-A.9.7 Fișă tehnică FT-06: Piloți/șuruburi de fundare metalice

| Parametru | Cerință minimă |
|---|---|
| Material | oțel S235/S355, zincat termic EN ISO 1461 |
| Grosime strat zinc | ≥ 55–70 µm |
| Toleranță geometrică profil | conform SR EN 10025/10219 |

### PTh-A.9.8 Fișă tehnică FT-07: Balast/piatră spartă drumuri de incintă

| Parametru | Cerință minimă |
|---|---|
| Granulometrie strat formă | 0–63 mm, conform STAS 6400 |
| Grad de compactare Proctor | ≥ 95% (strat de formă), ≥ 98% (strat de uzură) |
| CBR minim | ≥ 15% pentru trafic tehnologic ocazional |

### PTh-A.9.9 Fișă tehnică FT-08: Amestec de semințe pajiște/covor vegetal

| Parametru | Cerință minimă |
|---|---|
| Compoziție | graminee rezistente la umbră parțială și secetă + specii melifere (min. 15% din amestec) |
| Fără erbicide reziduale | certificat de calitate semințe |
| Densitate semănare | 25–35 g/mp (funcție de specii) |

### PTh-A.9.10 Fișă tehnică FT-09: Cuvă de retenție ulei (element prefabricat sau turnat)

| Parametru | Cerință minimă |
|---|---|
| Capacitate | ≥ 100% volum ulei transformator + marjă precipitații |
| Etanșeitate | confirmată prin probă cu apă înainte de PIF |
| Strat de separare hidrocarburi | pietriș/material filtrant certificat pentru retenție hidrocarburi |

### PTh-A.9.11 Fișă tehnică FT-10: Semnalistică de securitate (plăci avertizare)

| Parametru | Cerință minimă |
|---|---|
| Suport | aluminiu sau PVC rigid rezistent UV |
| Pictograme | conform SR EN ISO 7010 |
| Durabilitate culoare | rezistență UV ≥ 5 ani fără decolorare semnificativă |

---

## PTh-A.10 DETALII SUPLIMENTARE (D16–D25)

### D16 — Rigolă carosabilă la intersecția drum incintă/coridor transversal (sc. 1:20)

Rigolă prefabricată de beton, cu grătar metalic galvanizat pentru zonele carosabile, secțiune dimensionată pentru debitul cumulat al blocului de câmp deservit; capacul grătarului rezistă la trecerea utilajelor de mentenanță (clasa de încărcare B125 minim, conform SR EN 124).

### D17 — Montaj bare de sprijin grup sanitar accesibil (detaliu ancoraj) (sc. 1:10)

Bare de sprijin inox Ø 30–35 mm, montate pe dibluri chimice în perete solid (nu în gips-carton simplu, sau cu placă de rigidizare dedicată), rezistență la smulgere verificată ≥ 150 kg conform NP 051/2012; poziționare la 0,70–0,80 m față de pardoseală.

### D18 — Scafă tavan cameră SCADA (rost umbră pentru trasee tehnice) (sc. 1:10)

Scafă perimetrală din gips-carton sau profil metalic, cu rost de 3–5 cm pentru mascarea traseelor de cablu de date/electrice care alimentează echipamentul SCADA, cu acces de întreținere prin panouri demontabile punctuale.

### D19 — Rost de dilatație platformă betonată PT (sc. 1:10)

Rost de dilatație la interval de 6–8 m pe platformele betonate mari, umplut cu material elastic (mastic poliuretanic), pentru preluarea variațiilor termice fără fisurare necontrolată; rostul se profilează cu pantă spre exterior pentru a evita infiltrarea apei.

### D20 — Trecere cablu prin perete cabină (etanșare/protecție mecanică) (sc. 1:10)

Manșon etanș (presetupă) la traversarea peretelui cabinei de către cablurile de servicii proprii/SCADA, cu clasă de etanșeitate IP54 minim și protecție mecanică suplimentară (tub rigid) pe porțiunea exterioară expusă.

### D21 — Parapet/balustradă acces rampă cabină (sc. 1:10)

Bordură/parapet lateral H ≥ 5 cm la marginile rampei de acces (D08) pentru ghidarea bastonului alb/prevenirea alunecării scaunului rulant în afara traseului, conform NP 051/2012.

### D22 — Detaliu bandă de avertizare deasupra cablurilor MT (sc. 1:10)

Bandă de plastic roșie marcată „ATENȚIE CABLU ELECTRIC — PERICOL", pozată continuu la 0,30 m deasupra cablurilor de medie tensiune, pe toată lungimea traseului LES 20 kV, inclusiv la traversările de drum (coordonare cu D10).

### D23 — Copertină acces principal cabină (sc. 1:20)

Copertină metalică ușoară deasupra ușii de acces (T-01), lățime egală cu golul + 0,5 m de fiecare parte, pantă de scurgere spre exterior, protejând utilizatorii și pragul de precipitații.

### D24 — Platformă de manevră/parcare vizitatori la poartă (sc. 1:100)

Platformă pietruită/balastată, 2 locuri (1 accesibil PMR marcat), lângă poarta pietonală, cu acces continuu spre cabină conform D08.

### D25 — Marcaj/numerotare blocuri de mese (stâlp indicator) (sc. 1:20)

Stâlp indicator scund (H ≈ 1,2 m) la capătul fiecărui bloc/rând de mese, cu numerotare vizibilă (conform DTAC §8), esențial pentru localizarea rapidă a defectelor de mentenanță la parcuri mari — densitate un indicator la fiecare bloc electric (coordonare cu memoriul de instalații electrice §3.14).

---

## PTh-A.11 CONFORT ACUSTIC

### PTh-A.11.1 Cadru și indicatori

Sursele de zgomot ale unei CEF sunt limitate la transformator (zumzet electromagnetic) și, secundar, la invertoare (ventilatoare de răcire); nu există surse de ardere sau echipamente rotative mari. Cerința se verifică prin nivelul de zgomot la limita incintei (limita de proprietate), conform **STAS 10009** (limite de zgomot ambiental) și **OMS nr. 119/2014**.

### PTh-A.11.2 Cerințe și verificare

| Receptor | Limită orientativă (dB(A)) | Observație |
|---|---|---|
| Limita incintei, zi | 50–55 dB(A) | funcție de zona funcțională (STAS 10009) |
| Limita incintei, noapte | 40–45 dB(A) | funcție de zona funcțională |
| Cea mai apropiată locuință (dacă există) | conform zonei de referință | distanța + perdeaua vegetală atenuează suplimentar |

**Măsuri constructive**: amplasarea PT/transformatorului retras de limita de proprietate (distanță minimă recomandată ≥ 20–30 m față de eventuale locuințe învecinate, funcție de amplasament), perdeaua vegetală perimetrală ca atenuator suplimentar (efect de difuzie, nu de barieră acustică propriu-zisă), transformator cu nivel de zgomot garantat de producător (fișă tehnică, coordonare cu memoriul de instalații electrice). Verificarea finală se face prin **măsurători acustice la recepție**, la limita incintei, în cel puțin 2 puncte reprezentative.

### PTh-A.11.3 Zgomot în cabina de comandă

Cabina, având echipamente electronice fără surse majore de zgomot intern, nu necesită tratamente acustice speciale; se aplică principiile uzuale de confort (finisaje absorbante minime, tâmplărie cu etanșeitate la aer conform FT-03).

---

## PTh-A.12 PLANUL DE TRASARE (cote, axe, repere)

### PTh-A.12.1 Principii de trasare pentru câmpul FV

Trasarea unui câmp FV se bazează pe un **sistem de axe local**, derivat din coordonatele Stereo70 ale bornelor de hotar, cu: (a) o **axă de referință E–V** (paralelă cu direcția rândurilor de mese, azimut 90°/270°), materializată prin minimum 2 borne fixe la capetele câmpului; (b) o **axă de referință N–S** perpendiculară, care fixează poziția pitch-ului; (c) **repere secundare** la fiecare capăt de rând, materializate prin țăruși/borne metalice, cu cote GPS-RTK (precizie ≤ 2 cm) predate ca fișier de coordonate pentru ghidarea utilajului de bătut piloți.

### PTh-A.12.2 Cote de trasare cheie (EXEMPLU 2 MWp — recalculabile parametric)

| Element | Cotă/interax | Formulă/sursă |
|---|---|---|
| Interax rânduri (pitch) | 12,0 m | D_pitch (DTAC §3.4) |
| Interax mese pe rând | 4,58 m + rost | L (DTAC §3.2) |
| Retragere gard față de primul rând | ≥ 3,0–5,0 m | DTAC §6.1 |
| Retragere gard față de limita de proprietate | conform regulament local + distanțe minime (DTAC §2.7) | — |
| Lățime drum perimetral | 4,0 m | DTAC §4.3 |
| Lățime drum acces | 4,0–5,0 m | DTAC §4.3 |

### PTh-A.12.3 Materializarea și predarea trasării

Fiecare etapă de trasare (drumuri, platforme, rânduri de mese, gard) se finalizează cu un **proces-verbal de predare a trasării** către executant, semnat de topograf și diriginte de șantier, însoțit de fișierul de coordonate (format DXF/CSV) compatibil cu utilajele GPS-RTK de execuție. Bornele de referință se protejează pe toată durata execuției și se predau la Cartea tehnică cu coordonatele finale as-built.

---

## PTh-A.13 BREVIAR SUPRAFEȚE AS-BUILT + BILANȚ FINAL

### PTh-A.13.1 Metodologie de măsurare

Suprafețele as-built se determină prin ridicare topografică finală (drone/GPS-RTK) a: conturului real al câmpului de module, drumurilor de incintă, platformelor betonate, amprentei cabinei, perimetrului gardului, suprafeței plantate cu perdea vegetală. Metodologia respectă aceeași convenție de calcul din memoriul DTAC (§10), pentru comparabilitate directă proiect-execuție.

### PTh-A.13.2 Breviar suprafețe as-built (formular tip — se completează la finalizarea execuției, EXEMPLU 2 MWp)

| Categorie | Suprafață de proiect (DTAC, mp) | Suprafață as-built (mp) | Abatere (%) |
|---|---|---|---|
| Teren total (St) | 22.000 | ___ | ___ |
| Suprafață captatoare module | 9.310 | ___ | ___ |
| Drumuri de incintă + platforme | ~1.000 | ___ | ___ |
| Platformă PT (betonată) | ~40 | ___ | ___ |
| Cabină comandă/pază (Sc) | ~28 (medie interval 26–35) | ___ | ___ |
| Perdea vegetală + retrageri | ~1.150 | ___ | ___ |
| Suprafață efectiv impermeabilizată | ~130 | ___ | ___ |

### PTh-A.13.3 Bilanț final

Bilanțul final se anexează la cartea tehnică și confirmă (sau documentează abaterile față de) indicatorii de proiect: densitatea de putere δ_P (MWp/ha), procentul de suprafață impermeabilizată (țintă < 1%), POT-ul construcțiilor definitive (țintă < 1%). Abaterile > 5% față de proiect se justifică în raportul de recepție și se comunică proiectantului pentru avizare.

---

## PTh-A.14 SISTEM DE SEMNALIZARE (siguranță electrică + orientare tehnică)

### PTh-A.14.1 Principii

Semnalistica unei CEF are dublu rol: **siguranță electrică** (avertizare pericol, interzicere acces) și **orientare tehnică** (numerotarea blocurilor pentru mentenanță — D25), fără componenta de „wayfinding" pentru public specifică unei clădiri cu utilizatori (nu este cazul unui parc FV nesupravegheat permanent).

### PTh-A.14.2 Specificații dimensionale plăci

| Tip placă | Dimensiune | Montare |
|---|---|---|
| Avertizare pericol electrocutare (gard/poartă) | 300×400 mm | pe stâlp de gard, H = 1,4–1,6 m |
| Înaltă tensiune (PT/stație) | 200×300 mm | pe anvelopă/ușă tehnologică |
| Tensiune DC periculoasă (combiner box) | 100×150 mm | pe capacul cutiei de conexiuni |
| Numerotare bloc mese | 150×150 mm | pe stâlp indicator D25 |
| Panou de identificare obiectiv (la intrare) | 800×1.200 mm | pe structură dedicată lângă poartă |

### PTh-A.14.3 Cerințe de contrast, culoare și material

Conform SR EN ISO 7010: fond galben + pictogramă neagră pentru „pericol general", fond roșu pentru „interzis"; materiale rezistente UV cu durabilitate minimă 5 ani (FT-10).

### PTh-A.14.4 Montaj și recepția sistemului

Toate plăcile se montează după finalizarea gardului/porților și se verifică 100% la recepția lucrărilor (prezență, lizibilitate, poziție conformă cu planul de semnalistică din piesele desenate).

---

## PTh-A.15 ROOM DATA SHEETS — CABINA DE COMANDĂ/PAZĂ

### PTh-A.15.1 Convenții și legendă

Fișele de mai jos detaliază la nivel de execuție cele 4 încăperi ale cabinei de comandă/pază (parc mic, ≤ 2 MWp — conform DTAC §5.2); pentru parcuri mari (≥ 10 MWp) suprafețele cresc conform tabelului DTAC (cameră comandă 18–30 mp, GS 5–8 mp, depozit/vestiar 10–20 mp), păstrând aceleași specificații calitative.

### Tabel R.01 — Cameră comandă/SCADA + pază

| Parametru | Valoare |
|---|---|
| Suprafață utilă (parc ≤ 2 MWp) | 10–14 mp |
| Înălțime liberă | ≥ 2,50 m (2,70 m recomandat) |
| Pardoseală | PVC electroizolant antistatic (FT-04) |
| Iluminat | general LED 300–500 lux la planul de lucru |
| Climatizare | split dedicat, funcție de sarcina termică a echipamentelor SCADA |
| Prize/echipare electrică | tablou local servicii proprii, prize dedicate echipament SCADA |
| Tâmplărie | T-02 (fereastră cu grilaj), Ti-01 (ușă interioară) |

### Tabel R.02 — Grup sanitar accesibil PMR

| Parametru | Valoare |
|---|---|
| Suprafață utilă | 4–5 mp |
| Dotare | WC suspendat, lavoar la cotă accesibilă, bare de sprijin (D17) |
| Spațiu de manevră scaun rulant | cerc Ø ≥ 1,50 m |
| Pardoseală | gresie tehnică R10–R11 (FT-05) |
| Ventilație | naturală + mecanică de evacuare |
| Tâmplărie | T-03, Ti-02 (deschidere spre exterior) |

### Tabel R.03 — Depozit scule/vestiar

| Parametru | Valoare |
|---|---|
| Suprafață utilă | 4–6 mp |
| Dotare | rafturi metalice, cuier vestiar, priză pentru încărcare scule electrice |
| Pardoseală | gresie tehnică sau beton sclivisit |
| Tâmplărie | T-04, Ti-03 |

### Tabel R.04 — Hol/circulație

| Parametru | Valoare |
|---|---|
| Suprafață utilă | 2–4 mp |
| Pardoseală | gresie tehnică R10, continuă cu accesul exterior (D08) |
| Iluminat | LED cu senzor de mișcare |

### PTh-A.15.2 Breviar sintetic încăperi (parc ≤ 2 MWp)

| Cod | Denumire | Su (mp) |
|---|---|---|
| R.01 | Cameră comandă/SCADA + pază | 10–14 |
| R.02 | Grup sanitar PMR | 4–5 |
| R.03 | Depozit/vestiar | 4–6 |
| R.04 | Hol/circulație | 2–4 |
| **Total Su** | | **~20–29** |
| **Sc (amprentă, cu pereți)** | | **~26–35** |

---

## PTh-A.16 STUDIU DE UMBRIRE/GLARE LA NIVEL DE EXECUȚIE (verificare, complement DTAC)

### PTh-A.16.1 Cadru și obiectiv

La faza DTAC, geometria anti-umbrire (β, pitch, GCR) a fost stabilită prin calcul analitic la solstițiul de iarnă (memoriul DTAC §3.4). La faza PTh, această geometrie se **verifică pe terenul real** (topografia as-built, orizontul real de vegetație/relief), confirmând sau ajustând local pitch-ul, conform corecției de pantă (DTAC §3.6).

### PTh-A.16.2 Verificarea la execuție

Se recomandă, înainte de baterea de serie a piloților, o **verificare cu instrument de analiză de orizont solar** (solarimetru/aplicație dedicată) în minimum 3 puncte reprezentative ale câmpului (colțuri + centru), confirmând că unghiul de mascare al orizontului sudic real este sub pragul admis de proiect. Dacă se constată obstacole neprevăzute în DTAC (vegetație crescută, construcții noi vecine), se raportează proiectantului pentru eventuala corecție locală a pitch-ului (D_pitch,teren, formula DTAC §3.6).

### PTh-A.16.3 Verificarea glare la execuție

Unde DTAC a semnalat necesitatea studiului de glare (vecinătate aeroport/drum important — DTAC §6.4), la faza PTh se confirmă avizul AACR obținut și se verifică la montaj că orientarea reală a modulelor (azimut ± toleranță) respectă ipotezele studiului de glare; abaterile de aliniament peste toleranța PTh-A.6.1 (± 0,3°) impun re-verificarea simulării de glare.

---

## PTh-A.17 PROGRAM DETALIAT DE MENTENANȚĂ ARHITECTURĂ/AMENAJARE

### PTh-A.17.1 Principii și responsabilități

Mentenanța de arhitectură/amenajare (distinctă de mentenanța electrică O&M a echipamentelor, tratată în memoriul de instalații §12.2) este responsabilitatea beneficiarului/operatorului, conform planului predat la Cartea tehnică (PTh-A.8.2).

### PTh-A.17.2 Drumuri de incintă și platforme

| Operație | Frecvență |
|---|---|
| Inspecție vizuală (denivelări, băltiri) | trimestrial |
| Refacere strat de uzură (balast) | la nevoie, orientativ 3–5 ani |
| Curățare rigole de drenaj | de 2 ori/an (primăvară/toamnă) + după evenimente pluviale extreme |

### PTh-A.17.3 Împrejmuire, porți, semnalistică

| Operație | Frecvență |
|---|---|
| Verificare integritate gard (spații, coroziune) | lunar |
| Verificare funcționare automatizare porți | lunar |
| Verificare/înlocuire plăci de semnalizare decolorate | anual |

### PTh-A.17.4 Cabina de comandă/pază

| Operație | Frecvență |
|---|---|
| Verificare hidroizolații/infiltrații | anual (înainte de sezonul ploios) |
| Verificare tâmplărie (etanșeitate, feronerie) | anual |
| Verificare accesibilitate PMR (praguri, rampă) | anual |

### PTh-A.17.5 Platforma și cuva de retenție PT

| Operație | Frecvență |
|---|---|
| Inspecție vizuală cuvă (fisuri, urme de ulei) | trimestrial + după orice avarie a transformatorului |
| Verificare etanșeitate (probă cu apă) | la 5 ani sau după reparație |

### PTh-A.17.6 Amenajări peisagistice și covor vegetal

| Operație | Frecvență |
|---|---|
| Cosire mecanică sau pășunat controlat | 2–4 ori/an |
| Completare/înlocuire plantații perdea vegetală | anual, la control de primăvară |
| Verificare stare hoteluri insecte/căsuțe păsări | anual |

---

## PTh-A.18 PLANUL DE MANAGEMENT AL CALITĂȚII (execuție arhitectură/amenajare)

### PTh-A.18.1 Domeniu și structură

Planul de management al calității reia și extinde matricea PTh-A.5 cu procedurile tehnice de execuție (PTE) specifice fiecărei categorii de lucrare, punctele de control și tratarea neconformităților.

### PTh-A.18.2 Proceduri tehnice de execuție (PTE) — listă minimă

1. PTE — Trasarea generală a câmpului FV.
2. PTE — Baterea/înșurubarea piloților de fundare (inclusiv testul de smulgere).
3. PTE — Turnarea platformelor betonate și execuția cuvei de retenție.
4. PTE — Montajul structurilor metalice și reglajul meselor.
5. PTE — Execuția hidroizolațiilor cabinei.
6. PTE — Montajul împrejmuirii și porților.
7. PTE — Amenajarea peisagistică (plantare, însămânțare).

### PTh-A.18.3 Puncte de control și faze determinante

Coincid cu lista PVLA (PTh-A.5.3), la care se adaugă punctele de control intermediar din matricea PTh-A.5.1.

### PTh-A.18.4 Înregistrări de calitate obligatorii

Rapoarte de test de smulgere, rapoarte de compactare Proctor, certificate de calitate beton, rapoarte de zincare, procese-verbale de recepție pe fază, releveu topografic as-built.

### PTh-A.18.5 Tratarea neconformităților

Orice abatere peste toleranțele PTh-A.6 se consemnează în registrul de neconformități, se analizează de proiectant (acceptare cu justificare tehnică, remediere sau respingere), iar remedierea se verifică printr-un nou control înainte de continuarea lucrărilor adiacente.

---

## PTh-A.19 MĂSURI DE DURABILITATE ȘI ECONOMIE CIRCULARĂ (nivel de execuție)

### PTh-A.19.1 Reversibilitatea la nivel de execuție

Detaliile D01/D02 (fundare pe piloți/șuruburi, fără beton masiv) sunt alese special pentru a asigura, la nivel de execuție, **extragerea integrală** la dezafectare (conform DTAC §11); procedura de extragere (inversul procedurii de instalare, cu utilaj de extracție dedicat) se documentează în Cartea tehnică pentru referință viitoare.

### PTh-A.19.2 Managementul deșeurilor de execuție

Conform Legii nr. 211/2011 și HG nr. 856/2002: separarea pe șantier a deșeurilor metalice (resturi de profile, capete de cablu), a deșeurilor de beton/inerte, a ambalajelor (paleți de transport module), cu evidența cantităților predate la operatori autorizați; se interzice depozitarea necontrolată pe amplasament.

### PTh-A.19.3 Materiale sustenabile

Preferință pentru materiale reciclabile/reciclate acolo unde performanța tehnică o permite (oțel zincat reciclabil 100%, agregate din surse locale pentru reducerea transportului), conform principiului de economie circulară aplicat întregii soluții (module, structuri — DTAC §11.1).

### PTh-A.19.4 Performanța energetică a cabinei

Cabina de comandă/pază, ca unică construcție cu prezență umană ocazională, respectă principiile Legii nr. 372/2005 (izolare termică a anvelopei, tâmplărie performantă U ≤ 1,3–1,4 W/m²K conform FT-03); nu se aplică cerințe nZEB stricte, dat fiind caracterul ocazional al ocupării, dar se recomandă izolarea minimă pentru reducerea consumului de încălzire/climatizare al serviciilor proprii.

---

## PTh-A.20 DETALII SUPLIMENTARE (D26–D30) ȘI SINTEZA PLANȘELOR PTh

### D26 — Detaliu geotextil separator sub drumul de incintă (sc. 1:10)

Geotextil nețesut, rezistență la perforare conform SR EN ISO 12236, pozat între patul de pământ și stratul de balast, pentru separarea straturilor și prevenirea migrării particulelor fine — crește durata de viață a drumului fără întreținere frecventă.

### D27 — Detaliu strat filtrant/drenant la baza rândului de mese pe teren argilos (sc. 1:10)

Pe amplasamente cu sol argilos și exces de umiditate, se prevede un strat local de pietriș/nisip la piciorul piloților (fâșie 0,3 m lățime), facilitând drenajul local și reducând riscul de îmbibare care ar afecta capacitatea portantă pe termen lung.

### D28 — Detaliu marcaj GPS de referință permanentă (bornă) (sc. 1:20)

Bornă de beton cu placă metalică inscripționată, cu coordonate Stereo70 gravate, amplasată la fiecare colț al proprietății și în minimum 2 puncte interioare, pentru repunerea rapidă a trasării în caz de reparații/extinderi ulterioare.

### D29 — Detaliu acces tehnic pietonal în coridorul de pitch (treaptă/pas japonez pe rigolă) (sc. 1:20)

Pas japonez (dale prefabricate punctuale) la traversarea rigolelor de drenaj din interiorul câmpului, pentru accesul pietonal al personalului de mentenanță fără afectarea secțiunii de scurgere a rigolei.

### D30 — Detaliu fixare panou de identificare a obiectivului la intrare (sc. 1:20)

Structură metalică autoportantă (2 stâlpi + panou 800×1.200 mm), fundație punctuală de beton, amplasată vizibil lângă poarta principală, cu datele obiectivului conform Legii nr. 169/2026 (CATUC), art. 264 (denumire, beneficiar, proiectant, nr. autorizație de construire).

### PTh-A.20.1 Sinteza planșelor de execuție (arhitectură/amenajare)

| Nr. | Planșă | Scară | Corelare DTAC |
|---|---|---|---|
| PTh-A-01 | Plan de trasare general (axe, repere, borne) | 1:500/1:1.000 | A-02 |
| PTh-A-02 | Plan de situație de execuție (cote detaliate) | 1:500 | A-02 |
| PTh-A-03 | Detalii fundare piloți/șuruburi (D01, D02) | 1:10 | A-03, A-08 |
| PTh-A-04 | Detaliu prindere mesă (D03) | 1:5 | A-03 |
| PTh-A-05 | Detalii împrejmuire și porți (D04, D05) | 1:20/1:5 | A-06 |
| PTh-A-06 | Detalii platformă PT și cuvă retenție (D06) | 1:20/1:5 | A-05 |
| PTh-A-07 | Plan + detalii cabină comandă (D07, D08, D17–D21) | 1:50/1:5-1:10 | A-04 |
| PTh-A-08 | Detalii drenaj și traversări cablu (D09, D10, D11, D26, D27) | 1:10-1:20 | A-02, A-07 |
| PTh-A-09 | Detalii semnalistică și identificare (D12, D22, D25, D30) | 1:10-1:20 | cap. 8 DTAC |
| PTh-A-10 | Plan amenajare peisagistică de execuție (D13, D14) | 1:500 | A-07 |
| PTh-A-11 | Detalii acces și racord drum public (D15, D24) | 1:20-1:100 | — |
| PTh-A-12 | Detalii repere GPS permanente (D28, D29) | 1:20 | — |
| PTh-A-13 | Tablou de tâmplărie și fișe de finisaje | — | PTh-A.2, A.3 |
| PTh-A-14 | Breviar toleranțe și plan de control al calității | — | PTh-A.5, A.6 |

---

## PTh-A.21 DETALII DE EXECUȚIE — VARIANTA CU STRUCTURI DE URMĂRIRE SOLARĂ (TRACKER PE O AXĂ, HSAT)

### PTh-A.21.1 Preambul — corelare cu memoriul de rezistență

Memoriul DTAC de rezistență (`structura.md`, §2A.1) tratează comparativ soluția adoptată (mese fixe, β = 30°) și alternativa cu **tracker pe o axă orizontală N–S (HSAT)**, reținută ca variantă tehnică posibilă a temei de proiectare (funcțiunea admite explicit „structură fix/tracker"). Prezentul capitol detaliază, **doar la nivel de interfață arhitecturală de execuție**, elementele specifice acestei variante — dimensionarea mecanică/electrică a acționării rămâne în sarcina proiectantului de structură/electric și a furnizorului de echipament. Geometria invariantă (β variabil ±55° în timpul zilei, în loc de β fix = 30°) și scalarea cu puterea (număr de rânduri de tracker = N_mod/n_tracker) urmează aceleași principii parametrice din DTAC, cu diferența că **unitatea replicabilă** este acum „rândul de tracker cu motor propriu", nu „mesa fixă".

### D31 — Fundație pilot/pilon central sub torque tube (interfață arhitectură/structură) (sc. 1:10)

| Element | Descriere | Material/dimensiune |
|---|---|---|
| 1 | Pilot metalic bătut sau șurub elicoidal, ranforsat pentru moment de torsiune | oțel zincat termic, secțiune superioară celei de la mesele fixe (moment suplimentar din torque tube — a se vedea `structura.md` §2A.1.2) |
| 2 | Interax piloți pe rândul de tracker | 4,5–6,0 m (funcție de lungimea torque tube-ului, stabilită de proiectantul de structură/furnizor) |
| 3 | Cotă de ieșire cap pilot | uniformă pe tot rândul (± 10 mm) — esențială pentru alinierea torque tube-ului fără tensiuni parazite |
| 4 | Pilot de capăt (lângă acționare) | fundație supradimensionată local pentru preluarea reacțiunii motorului/reductorului |

**Text de cerințe de execuție/toleranțe:** Spre deosebire de mesele fixe (D01), la tracker **planeitatea și coliniaritatea capetelor de pilot pe axa N–S sunt critice** — abaterea admisă între piloți succesivi este ≤ **± 10 mm** pe verticală și ≤ **± 15 mm** pe orizontală față de axul teoretic, pentru a evita frecări/blocaje ale torque tube-ului rotativ și solicitări de torsiune parazite în lagăre. Se recomandă verificare cu laser rotativ pe toată lungimea rândului înainte de montajul torque tube-ului, cu remedierea (extragere/rebatere) a oricărui pilot care depășește toleranța.

### D32 — Platformă tehnică pentru motor/actuator + cutie de comandă locală (sc. 1:20)

| Element | Descriere | Material/dimensiune |
|---|---|---|
| 1 | Platformă/soclu suport motor-reductor | beton local sau suport metalic pe pilotul de capăt, dimensionat de furnizor |
| 2 | Cutie de comandă locală (controller rând) | montată la H ≥ 0,6 m, protecție IP65, acces frontal pentru mentenanță |
| 3 | Senzor de poziție/inclinometru | montat pe torque tube, protejat de intemperii |
| 4 | Anemometru de rând/zonă | poziționat neumbrit, pentru declanșarea modului „stow" la vânt puternic |

**Text de cerințe de execuție/toleranțe:** Cutia de comandă și cablurile de alimentare/semnal ale motorului se pozează în coridorul de mentenanță (D11), cu manșoane etanșe la intrarea în cutie (IP65, conform D20 adaptat); se rezervă spațiu de acces frontal ≥ 0,8 m pentru intervenția tehnicianului la reductor.

### D33 — Interfața civilă a modului „stow" (poziție de siguranță la vânt) (sc. 1:20, schemă)

| Element | Descriere |
|---|---|
| 1 | Unghi de „stow" | orizontal (0°) sau alt unghi de siguranță stabilit de proiectantul de structură, funcție de analiza aeroelastică |
| 2 | Prag de declanșare (viteza vântului) | valoare de proiect a producătorului/proiectantului de structură, verificată la PIF |
| 3 | Gardă la sol în poziție „stow" | se verifică menținerea gărzii minime (0,6–0,8 m) și în poziția de siguranță, nu doar în poziția de urmărire |

**Text de cerințe de execuție/toleranțe:** La recepție se verifică funcțional modul „stow" prin simulare/test de comandă manuală (declanșare de probă), confirmând timpul de reacție și unghiul final atins; arhitectura verifică doar că, în poziția „stow", nu apar coliziuni cu elementele fixe din câmp (coridoare, rigole, gard).

### PTh-A.21.2 Toleranțe specifice execuției pentru tracker

| Parametru | Toleranță de execuție |
|---|---|
| Coliniaritate capete piloți pe rând (verticală) | ± 10 mm |
| Coliniaritate capete piloți pe rând (orizontală) | ± 15 mm |
| Interax piloți pe rând | ± 30 mm |
| Aliniament rânduri succesive (paralelism) | ± 0,3° |

### PTh-A.21.3 Notă privind trackerul pe două axe

Conform `structura.md` §2A.1.3, trackerul pe două axe presupune o **fundație izolată masivă / pilon forat** (nu piloți distribuiți), rar justificată economic la scară utilitară. Dacă tema de proiectare adoptă această variantă, interfața arhitecturală de execuție se limitează la: rezervarea unei platforme circulare de mentenanță în jurul pilonului central (Ø ≥ 3–4 m, pietruită), acces dedicat pentru macara la montaj (gabarit de manevră sporit față de D01–D03) și coordonarea strictă cu breviarul de calcul al fundației forate (piesă de rezistență, nu de arhitectură). Nu se detaliază suplimentar în acest supliment, dat fiind caracterul de excepție al soluției.

---

## PTh-A.22 DETALII DE EXECUȚIE — FUNDAȚIE PE BALAST DE BETON (BALLASTED FOOTING), CAZ SPECIAL

### PTh-A.22.1 Condiții de aplicare (interfață cu memoriul de rezistență)

Conform `structura.md` §2A.2.3, soluția cu blocuri de balast din beton se aplică **doar** atunci când baterea/înșurubarea piloților este imposibilă sau interzisă: rocă la mică adâncime, halde/depozite de deșeuri, terenuri contaminate, prezența membranelor geosintetice de etanșare sau a rețelelor îngropate cu servitute. Este o soluție de excepție, nu varianta de referință a prezentului supliment (care rămâne fundarea pe piloți/șuruburi, D01/D02).

### D34 — Bloc de balast prefabricat sub stâlp de mesă (sc. 1:10)

| Element | Descriere | Material/dimensiune |
|---|---|---|
| 1 | Bloc de beton prefabricat | beton C25/30, volum dimensionat de proiectantul de rezistență (ordin de mărime 3–4 m³/stâlp de contur, conform breviarului `structura.md` §2A.2.3) |
| 2 | Pat de balast/pietriș nivelat | grosime 15–20 cm, pentru repartizarea uniformă a presiunii pe teren și facilitarea drenajului |
| 3 | Interfața bloc-stâlp | placă de bază metalică înglobată/ancorată în bloc, conform detaliului de rezistență |
| 4 | Protecție membrană geosintetică existentă (dacă e cazul) | strat de protecție (geotextil + strat de nisip) între bloc și membrană, pentru a nu o perfora/deteriora la punere în operă |

**Text de cerințe de execuție/toleranțe:** Blocurile se prefabrică în afara amplasamentului (evitarea betonării in situ pe membrane/terenuri sensibile) și se transportă/așază cu utilaj de ridicare adecvat greutății (8–9 t/bloc, conform calculului de rezistență); planeitatea patului de așezare ≤ ± 10 mm sub dreptar de 2 m, pentru contact uniform bloc-teren (evitarea concentrărilor de presiune și a basculării). Se interzice orice perforare a membranei geosintetice existente — dacă traseul de cablu trebuie să o traverseze, se folosește exclusiv traversarea prin puncte special executate și etanșate, agreate cu administratorul depozitului/sitului.

### PTh-A.22.2 Toleranțe specifice

| Parametru | Toleranță |
|---|---|
| Planeitate pat de așezare bloc | ± 10 mm sub dreptar 2 m |
| Poziție în plan bloc | ± 30 mm |
| Verticalitate stâlp pe bloc | ≤ 1,0% din înălțime (identic D01) |

### PTh-A.22.3 Notă de onestitate

Volumul exact de beton per bloc (ordinul de mărime 3–4 m³/stâlp de contur, până la ~30–40 m³/masă echipată integral pe balast) rezultă din verificarea la răsturnare și alunecare din vânt, calculată în memoriul de rezistență pentru condițiile specifice de vânt și geometrie ale amplasamentului real; valoarea nu poate fi generalizată fără acel calcul — prezentul supliment reține doar **procedura de execuție și tolerantele**, nu recalculează dimensionarea structurală.

---

## PTh-A.23 BREVIAR DE CANTITĂȚI DE EXECUȚIE — FORMULE PARAMETRICE (recalculabile la orice P_DC)

### PTh-A.23.1 Principiul de calcul al cantităților

Conform metodologiei parametrice a întregului dosar, cantitățile de execuție ale lucrărilor de arhitectură/amenajare se calculează din **N_mod = P_DC/P_mod** și din geometria invariantă a celulei-tip (§3 al memoriului DTAC), permițând generarea directă a listei de cantități (deviz-ofertă) pentru orice putere de proiect fără reproiectare.

### PTh-A.23.2 Tabel de formule și exemplu numeric (EXEMPLU 2 MWp: N_mod = 3.604, N_mese = 90, N_rânduri ≈ 12)

| Categorie de lucrare | Formulă parametrică | EXEMPLU 2 MWp |
|---|---|---|
| Număr piloți/șuruburi de fundare | N_piloți = N_mese × piloți/masă (uzual 6–9/masă de 40 module) | 90 × 8 ≈ **720 buc.** |
| Teste de smulgere de control | 1/20 piloți + minim 3 de probă | ≈ **39 teste** |
| Lungime gard perimetral | ∝ perimetrul incintei ≈ 2×(√St × k_formă) | funcție de forma reală a parcelei; orientativ **550–650 m** pentru St ≈ 2,2–2,7 ha, parcelă apropiată de pătrat |
| Număr stâlpi de gard | lungime gard / interax (2,5–3,0 m) | ≈ **200–250 buc.** |
| Număr plăci avertizare pe gard | lungime gard / 25–30 m | ≈ **20–25 buc.** |
| Lungime drum perimetral (buclă) | ≈ perimetrul incintei − lungimea gardului spre exterior nefolosită | ≈ **500–600 m** |
| Lungime drum de acces | funcție de distanța la drumul public | variabilă cu amplasamentul (0,05–1,0 km orientativ) |
| Suprafață platformă PT | ∝ nr. transformatoare × ~40 mp/unitate | 1 × 40 = **40 mp** |
| Suprafață cabină comandă/pază | conform §5.2 DTAC | **~28 mp** (medie interval 26–35) |
| Suprafață perdea vegetală | ∝ perimetru × lățime bandă (2,0–3,0 m) | 550–650 m × 2,5 m ≈ **1.400–1.600 mp** |
| Număr puieți/arbuști perdea vegetală | suprafață perdea / (interax 1,0–1,5 m)² × 2 rânduri | ≈ **1.000–1.400 buc.** |
| Suprafață covor vegetal însămânțat | S_teren − (drumuri + platforme + Sc) | ≈ **20.700–21.900 mp** |
| Cantitate semințe pajiște | suprafață covor vegetal × 25–35 g/mp | ≈ **520–770 kg** |
| Lungime tub protecție cablu sub drumuri | ∝ nr. traversări drum × lățime drum | funcție de layout electric (coordonare instalații) |
| Număr stâlpi indicator numerotare bloc | ∝ N_rânduri sau N_blocuri electrice | ≈ **12–20 buc.** |
| Volum beton radier platformă PT | 40 mp × 0,20–0,25 m grosime | ≈ **8–10 mc** |

### PTh-A.23.3 Tabel de scalare a cantităților principale pe trepte de putere (aceleași formule, geometrie invariantă)

| P_DC | N_mese | N_piloți (≈8/masă) | Lungime gard orientativă | Nr. stâlpi gard | Sc cabină+PT |
|---|---|---|---|---|---|
| 500 kWp | ~23 | ~184 | ~280–320 m | ~100–115 | ~50 mp |
| **2 MWp (exemplu)** | **~90** | **~720** | **~550–650 m** | **~200–250** | **~130 mp** |
| 10 MWp | ~450 | ~3.600 | ~1.230–1.420 m | ~440–500 | ~500 mp (stație extinsă) |
| 20 MWp | ~901 | ~7.208 | ~1.740–2.010 m | ~620–710 | ~800–1.000 mp |

*Notă metodologică:* lungimea de gard/perimetru scalează cu **√(suprafață)**, nu liniar cu P_DC — motiv pentru care parcurile mari au un consum de gard/km de perimetru pe MWp **mai mic** (economie de scară), confirmând observația din memoriul DTAC §4.3 privind perimetrul. Cantitățile din tabel sunt orientative pentru forme de parcelă apropiate de pătrat/dreptunghi compact; parcelele alungite sau neregulate au perimetru mai mare la aceeași suprafață și necesită recalcul pe planul de situație real.

### PTh-A.23.4 Utilizarea breviarului la ofertare și execuție

Breviarul de mai sus se folosește pentru generarea listei de cantități (deviz-ofertă) la faza de licitație/contractare a execuției și pentru verificarea de plauzibilitate a cantităților facturate pe parcursul execuției (comparație cantitate contractată vs. cantitate pusă în operă, pe fiecare categorie); valorile exacte se recalculează întotdeauna pe planul de situație de execuție real (PTh-A-01/PTh-A-02), breviarul parametric servind ca **verificare încrucișată**, nu ca sursă unică de cantități contractuale.

---

## PTh-A.24 DETALII SUPLIMENTARE CABINĂ (D35–D40) — ANVELOPĂ ȘI COMPARTIMENTARE

### D35 — Streașină și învelitoare cabină (acoperiș ușor, pantă mică) (sc. 1:10)

| Element | Descriere | Material/dimensiune |
|---|---|---|
| 1 | Structură șarpantă ușoară | grinzi metalice sau lemn tratat, pantă 8–15% |
| 2 | Învelitoare | tablă cutată prevopsită sau panou termoizolant tip sandwich, culoare neutră integrată peisagistic |
| 3 | Streașină | ieșire în consolă 30–40 cm, cu bordură de picurare |
| 4 | Strat termoizolant sub învelitoare | vată minerală/poliizocianurat, grosime conform calculului termic (PTh-A.19.4) |

**Text de cerințe de execuție/toleranțe:** Panta minimă de scurgere se verifică la montaj (≥ 8%, fără zone de contrapantă/băltire); prinderea învelitorii respectă schema de fixare a producătorului pentru zona de vânt a amplasamentului (aceleași ipoteze de vânt ca la structurile de câmp — coordonare cu memoriul de rezistență).

### D36 — Jgheab și burlan cabină (sc. 1:10)

| Element | Descriere | Material/dimensiune |
|---|---|---|
| 1 | Jgheab | tablă zincată/aluminiu, secțiune dimensionată pentru suprafața de acoperiș a cabinei |
| 2 | Burlan | Ø 100–125 mm, cu evacuare la nivelul solului spre rigolă/zonă de infiltrare |
| 3 | Element de descărcare la sol | cot + tub de protecție, evitând eroziunea locală (piatră spartă la bază) |

**Text de cerințe de execuție/toleranțe:** Panta jgheabului ≥ 0,5% spre burlan; se evită descărcarea directă a apei pe platforma de acces PMR (D08) — burlanul se poziționează astfel încât apa să fie direcționată spre rigola generală (D09), nu spre traseul accesibil.

### D37 — Compartimentare interioară cabină (perete ușor gips-carton pe structură metalică) (sc. 1:10)

| Element | Descriere | Material/dimensiune |
|---|---|---|
| 1 | Structură metalică | profile UW/CW zincate, conform FT-07 (fișă gips-carton) |
| 2 | Placare | 2×12,5 mm gips-carton pe fiecare parte (rezistent la umiditate la GS) |
| 3 | Izolație fonică/termică în gol | vată minerală 5–7 cm |

**Text de cerințe de execuție/toleranțe:** Verticalitatea peretelui ≤ 2 mm/m; la peretele GS-cameră SCADA se prevede placare hidrofugă pe fața dinspre GS; rosturile de placare se tratează cu bandă + glet, fără fisuri vizibile la recepție.

### D38 — Plafon fals cu trasee de instalații (cameră SCADA) (sc. 1:10)

| Element | Descriere | Material/dimensiune |
|---|---|---|
| 1 | Plafon fals demontabil | dale minerale 60×60 cm pe grilaj metalic, sau gips-carton cu trape de vizitare |
| 2 | Spațiu tehnic peste plafon | ≥ 15–20 cm pentru trasee de date/electrice |

**Text de cerințe de execuție/toleranțe:** Se prevăd trape de vizitare deasupra tablourilor electrice și a conexiunilor de date, pentru mentenanța ulterioară fără demontarea integrală a plafonului.

### D39 — Soclu și tencuială decorativă exterioară cabină — straturi (sc. 1:10)

| Element | Descriere | Material/dimensiune |
|---|---|---|
| 1 | Suport (zidărie/beton) | conform D07 |
| 2 | Termosistem (dacă e prevăzut) | polistiren expandat/vată minerală, grosime conform calculului termic |
| 3 | Plasă armare + adeziv | conform FT sistem termoizolant |
| 4 | Tencuială decorativă finală | structurată, culoare neutră non-reflectorizantă (integrare peisagistică, DTAC §6.3) |

**Text de cerințe de execuție/toleranțe:** Culoarea finală se validează pe eșantion la fața locului înainte de aplicarea generală, conform criteriului de integrare peisagistică (evitarea suprafețelor albe/reflectante).

### D40 — Prag grup sanitar interior cabină — fără denivelare (sc. 1:10)

| Element | Descriere |
|---|---|
| 1 | Racord pardoseală hol–GS | continuu, fără prag, cu pantă de scurgere 1,5% în interiorul GS spre sifon de pardoseală |
| 2 | Etanșare | hidroizolație sub gresie în tot GS-ul, racordată la sifon |

**Text de cerințe de execuție/toleranțe:** Verificarea absenței denivelării la recepție (conform NP 051/2012), cu proba de scurgere a apei (fără infiltrații la pereții adiacenți).

---

## PTh-A.25 INTERFAȚA CU PROCEDURA DE MEDIU LA NIVEL DE EXECUȚIE

### PTh-A.24.1 Măsuri de protecție a mediului în timpul execuției

| Aspect | Măsură |
|---|---|
| Praf (drumuri, terasamente) | umectare periodică a suprafețelor în lucru pe perioade secetoase |
| Zgomot de șantier | limitarea programului de lucru cu utilaje grele la intervalul orar diurn admis local |
| Eroziune sol descoperit | fazarea lucrărilor de terasamente astfel încât suprafața descoperită la un moment dat să fie minimă; refacere rapidă a covorului vegetal după fiecare etapă |
| Scurgeri accidentale (carburanți utilaje) | zonă dedicată de alimentare/staționare utilaje, cu material absorbant la îndemână |
| Protecția arborilor/vegetației existente de păstrat | împrejmuire de protecție a trunchiurilor/rădăcinilor în zona de lucru |
| Gestiunea apelor pluviale în timpul execuției | rigole provizorii de deviere, evitând scurgerea necontrolată spre terenurile vecine |

### PTh-A.24.2 Protecția arheologică (descoperiri fortuite)

Conform **OG nr. 43/2000** privind protecția patrimoniului arheologic, dacă în timpul lucrărilor de terasamente/fundare se descoperă vestigii arheologice, execuția se **oprește imediat** în zona afectată, se anunță în 72 de ore direcția județeană pentru cultură, iar lucrările se reiau doar după eliberarea acordului/descărcării de sarcină arheologică. Această procedură este relevantă în special la parcurile mari, cu terasamente extinse pe suprafețe puțin cercetate anterior.

### PTh-A.24.3 Refacerea terenurilor afectate temporar de organizarea de șantier

Zonele folosite temporar pentru depozitare/manipulare (platforme de descărcare module, zonă de asamblare mese) se decompactează și se refac cu strat vegetal la finalul execuției, conform principiului de reversibilitate aplicat întregului proiect (DTAC §11, PTh-A.19.1).

---

## PTh-A.26 SĂNĂTATE ȘI SECURITATE ÎN MUNCĂ PE ȘANTIER — INTERFAȚA ARHITECTURALĂ

### PTh-A.25.1 Cadru

Organizarea de șantier respectă **Legea nr. 319/2006** și **HG nr. 300/2006** (șantiere temporare/mobile); prezentul capitol reține doar interfața cu soluțiile de arhitectură/amenajare (accese, semnalizare, delimitări), planul propriu de securitate și sănătate fiind piesă distinctă a antreprenorului.

### PTh-A.25.2 Riscuri specifice unui șantier de parc FV și măsuri de arhitectură/amenajare asociate

| Risc | Măsură de organizare a sitului |
|---|---|
| Circulația utilajelor grele (baterea piloților, transport module) pe suprafață extinsă | drumuri de incintă executate în prima etapă (PTh-A.4.1), semnalizare de circulație provizorie |
| Lucru în apropierea instalațiilor electrice existente (LEA vecine, racord în execuție) | delimitare fizică + semnalizare a zonelor cu tensiune, coordonare cu operatorul de rețea |
| Șanțuri deschise pentru cabluri (D10/D11) | împrejmuire provizorie/marcaj al șanțurilor deschise, acoperire pe timpul nopții |
| Manipulare module (greutate, suprafață mare, sensibile la vânt) | zonă de depozitare protejată de vânt, proceduri de manipulare cu echipament dedicat |
| Lucrul la înălțime redusă (montaj mese, cabină) | echipament individual de protecție conform HG 300/2006, deși înălțimile sunt reduse (≤ 3,1 m) |

### PTh-A.25.3 Semnalizare provizorie de șantier

Panouri de identificare a șantierului (conform Legii nr. 169/2026 — CATUC), semnalizare rutieră provizorie la accesul din drumul public, delimitare cu bandă/gard provizoriu a zonelor de lucru active, distincte de semnalistica definitivă tratată la PTh-A.14.

---

## PTh-A.27 CHECKLIST FINAL DE PREDARE — ARHITECTURĂ/AMENAJARE

Listă de verificare sintetică pentru dirigintele de șantier/beneficiar, anterioară recepției la terminarea lucrărilor (nu înlocuiește procesele-verbale formale, PTh-A.7):

- [ ] Geometria câmpului (pitch, aliniament, unghi) conformă cu tolerantele PTh-A.6.1, verificată topografic as-built.
- [ ] Toate testele de smulgere de control efectuate și arhivate (PTh-A.5.3).
- [ ] Etanșeitatea cuvei de retenție ulei confirmată prin probă cu apă (D06).
- [ ] Hidroizolațiile cabinei verificate, fără infiltrații (D07).
- [ ] Accesibilitatea PMR a cabinei conformă (prag, rampă, GS) — D08, NP 051/2012.
- [ ] Gard perimetral complet, cu spațiu la bază pentru fauna mică, porți funcționale inclusiv deblocare manuală de urgență.
- [ ] Toată semnalistica de pericol electric montată și lizibilă (PTh-A.14).
- [ ] Sistemul de drenaj (rigole, podeț acces) funcțional, verificat la o ploaie de test.
- [ ] Plantațiile perdelei vegetale instalate conform planului, cu specii joase pe latura sudică.
- [ ] Elementele de biodiversitate (hoteluri insecte, căsuțe păsări) montate, dacă cerute prin acordul de mediu.
- [ ] Traseele de cabluri îngropate relevate topografic (as-built) și predate la Cartea tehnică.
- [ ] Bornele de referință GPS permanente (D28) instalate și coordonatele predate.
- [ ] Panoul de identificare a obiectivului montat la intrare (D30).
- [ ] Zonele de organizare de șantier decompactate și refăcute vegetal.
- [ ] Cartea tehnică — partea de arhitectură completă și predată (PTh-A.8).

---

## PTh-A.28 GLOSAR DE TERMENI SPECIFICI FAZEI P.Th. ȘI EXECUȚIEI

> Completează glosarul general al memoriului DTAC (`arhitectura.md` §13.2), cu termeni specifici procesului de execuție/recepție, fără reluarea termenilor deja definiți acolo (β, GCR, pitch, string, PR etc.).

- **P.Th. (Proiect Tehnic de execuție)** — faza de proiectare ulterioară DTAC, care dezvoltă soluția la nivel de detaliu, caiete de sarcini și cantități, conform Ordinului MDLPA nr. 1.057/2023.
- **D.E. (Detalii de Execuție)** — piesele desenate de detaliu (D01…D40 în prezentul supliment) care explicitează la scară mare modul de realizare a unui nod constructiv.
- **PVLA (Proces-Verbal de Lucrări Ascunse)** — document de recepție intermediară pentru lucrări care urmează a fi acoperite (fundații, hidroizolații, cabluri îngropate), fără de care lucrarea ulterioară nu poate continua legal.
- **Fază determinantă** — etapă de execuție la care participarea reprezentantului ISC/proiectantului/dirigintelui este obligatorie înainte de continuarea lucrărilor (ex. armătura radierului PT, proba de etanșeitate a cuvei).
- **Diriginte de șantier** — reprezentantul tehnic al beneficiarului, autorizat conform legii, care verifică conformitatea execuției cu proiectul și semnează procesele-verbale de recepție pe fază.
- **As-built** — documentația și releveul care reflectă situația **efectiv realizată** în teren, cu toate abaterile față de proiect, predată la Cartea tehnică.
- **Test de smulgere (pull-out test)** — încercare in situ care determină capacitatea portantă la extracție a unui pilot/șurub de fundare, obligatorie pe eșantion înainte de execuția de serie (PTh-A.1bis).
- **Cuplu de instalare (torque)** — parametrul măsurat la înșurubarea unui șurub elicoidal de fundare, corelat cu portanța realizată; înregistrat automat de utilajul de instalare.
- **Stow (poziție de siguranță)** — unghiul la care se aduce un tracker în caz de vânt puternic, pentru reducerea încărcării aerodinamice (PTh-A.21).
- **Ballasted footing (fundație pe balast)** — soluție de fundare prin greutate proprie (blocuri de beton), fără ancorare în teren, utilizată doar când piloții/șuruburile sunt imposibile (PTh-A.22).
- **Breviar de cantități** — lista formulelor și valorilor de calcul al cantităților de execuție, recalculabilă parametric la orice putere (PTh-A.23).
- **Toleranță de execuție** — abaterea maximă admisă între valoarea de proiect și valoarea realizată în teren, fără a compromite funcționarea/aspectul/durabilitatea lucrării (PTh-A.6).
- **Fișă tehnică de produs (FT)** — document care fixează pragurile minime de performanță ale unui material/produs, utilizat la verificarea ofertelor și a certificatelor de conformitate (PTh-A.9).
- **Room Data Sheet (fișă de încăpere)** — fișa completă de date tehnice pentru o încăpere (finisaje, dotări, instalații), utilizată la coordonarea execuției interioare a cabinei (PTh-A.15).
- **Checklist de predare** — lista de verificare sintetică folosită înaintea recepției formale, care nu înlocuiește procesele-verbale reglementate, dar reduce riscul de omisiuni (PTh-A.27).

---

## PTh-A.29 CONCLUZIE — CORELAREA COMPLETĂ DTAC + PTh-A

Ansamblul memoriului DTAC de arhitectură (concepția parametrică a soluției, geometria invariantă, bilanțul teritorial) și al prezentului supliment PTh-A (detaliile de execuție, specificațiile de finisaje, toleranțele, planul de control al calității, cartea tehnică) acoperă integral specialitatea arhitectură/amenajarea teritoriului pentru obiectivul „parc fotovoltaic", de la faza de concept până la faza de execuție și recepție, fără duplicare de conținut între cele două piese și cu **coerență numerică totală** (aceleași dimensiuni, materiale, cote și formule parametrice regăsite identic în ambele documente). Metodologia parametrică este menținută pe tot parcursul: geometria celulei-tip (β = 30°, pitch = 12,0 m, GCR = 0,38, coarda mesei L = 4,58 m) rămâne invariantă la orice putere din intervalul 500 kWp…50 MWp, iar toleranțele, detaliile și specificațiile din prezentul supliment se aplică identic indiferent de scara proiectului — doar numărul de repetiții ale detaliilor (piloți, mese, panouri de gard, plăci de semnalizare) scalând proporțional cu P_DC.

*Întocmit: arhitect cu drept de semnătură (Legea nr. 184/2001, OAR), în coordonare cu proiectanții de rezistență, instalații electrice și securitate la incendiu, la faza Proiect Tehnic de execuție (P.Th.), conform Ordinului MDLPA nr. 1.057/2023 și Legii nr. 10/1995. Valorile geotehnice de adâncime de fundare rămân, ca și în DTAC, intervale de principiu, confirmate obligatoriu prin testul de smulgere de probă pe amplasamentul real înainte de execuția de serie — nu se substituie unei cifre neconfirmate.*
