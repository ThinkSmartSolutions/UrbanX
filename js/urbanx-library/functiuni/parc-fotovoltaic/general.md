# MEMORIU TEHNIC GENERAL — PARC FOTOVOLTAIC (CENTRALĂ ELECTRICĂ FOTOVOLTAICĂ)
## Faza D.T.A.C. (Documentație Tehnică pentru Autorizarea executării lucrărilor de Construire) — Legea nr. 50/1991, Anexa nr. 1

> **NOTĂ METODOLOGICĂ — DOCUMENT PARAMETRIC.** Prezentul memoriu este redactat **parametric/metodologic**: puterea instalată în curent continuu **P_DC este o variabilă de proiect** stabilită de investitor (poate fi 500 kWp, 1 MWp, 2 MWp, 5 MWp, 50 MWp etc.). Toate mărimile derivate (număr de module, suprafață de teren, putere AC, putere post de transformare, energie anuală, CO₂ evitat, CAPEX/OPEX) se calculează din P_DC prin **formulele de dimensionare și scalare** prezentate în fiecare capitol. Pentru claritate, se dau **exemple numerice etichetate explicit „Exemplu de calcul pentru P_DC = 2 MWp"**, dar acestea NU sunt o ipoteză fixă a proiectului — cititorul recalculează, cu aceleași formule, pentru puterea proiectului său. Tabelele conțin coloană cu **formula de calcul**, tocmai pentru a permite recalcularea la orice putere.

---

## 1. DATE DE IDENTIFICARE A INVESTIȚIEI

### 1.1. Denumirea obiectivului de investiții

**Construire parc fotovoltaic (Centrală Electrică Fotovoltaică — CEF) cu putere instalată în curent continuu P_DC [kWp] (variabilă de proiect), racordare la Sistemul Energetic Național prin post de transformare 0,4/20 kV și lucrări conexe de infrastructură** (drumuri interioare, împrejmuire, platforme tehnologice, rețele electrice interioare, sistem de securitate și monitorizare).

Obiectivul se încadrează, din punct de vedere al clasificării CAEN, în activitatea principală **CAEN 3511 — Producția de energie electrică**, iar din punct de vedere al Legii nr. 50/1991 în categoria **construcțiilor și instalațiilor tehnico-edilitare** cu caracter industrial-energetic. Este important de subliniat, încă din denumire, natura hibridă a obiectivului: din perspectiva dreptului construcțiilor este un ansamblu de „construcții și instalații" ce necesită autorizare de construire (Legea nr. 50/1991), iar din perspectiva dreptului energiei este o „capacitate de producere a energiei electrice" ce necesită autorizare de înființare și, ulterior, licență de exploatare comercială emise de ANRE (Legea nr. 123/2012). Cele două regimuri se suprapun procedural și trebuie corelate: autorizația de construire nu poate fi emisă fără ATR (care fixează soluția de racordare), iar autorizația de înființare ANRE presupune existența terenului și a soluției tehnice. Prezentul memoriu tratează exclusiv componenta de autorizare a construirii (DTAC), dar semnalează, acolo unde este relevant, interfața cu procedurile ANRE și de mediu.

**Încadrarea în categoria de importanță și clasa de risc** (Legea nr. 10/1995, HG nr. 766/1997 și normativul P100-1): structurile de susținere a modulelor, posturile de transformare, stațiile de invertoare și clădirea de pază (dacă există) se încadrează, de regulă, în **categoria de importanță „C" — construcții de importanță normală**, iar drumurile interioare și împrejmuirea în categoria „D" — construcții de importanță redusă. Din punct de vedere seismic (P100-1/2013, tabelul 4.2), ansamblul se încadrează în **clasa de importanță-expunere III (coeficient γI = 1,0)**. Trebuie remarcat că, la mesele fotovoltaice fixe, elemente ușoare cu suprafață mare expusă, **acțiunea vântului (SR EN 1991-1-4) este de regulă mai defavorabilă decât acțiunea seismică**, dat fiind că masa proprie redusă conduce la forțe seismice mici (forța seismică de bază Fb = γI × Sd(T1) × m × λ, proporțională cu masa m), în timp ce presiunea dinamică a vântului acționează pe o arie colectoare mare. Verificarea seismică rămâne totuși obligatorie pentru posturile de transformare, containerele de invertoare și ancorajele acestora, unde masele sunt semnificative.

### 1.2. Amplasamentul investiției

| Element | Descriere |
|---|---|
| Localizarea administrativ-teritorială | Extravilan (sau intravilan cu destinație admisă) UAT [localitate], județul [județ] |
| Nr. cadastral / Carte Funciară | CF nr. [_______], nr. cadastral [_______] |
| Suprafața totală a terenului (S_teren) | rezultă din P_DC prin formula de scalare (cap. 5); ex. ~2,0–2,5 ha pentru 2 MWp |
| Categoria de folosință actuală | Teren arabil / neproductiv / pășune (după caz), extravilan |
| Regim juridic | Proprietate privată a beneficiarului / concesiune / superficie / arendă pe min. 25–30 ani |
| Coordonate de referință (Stereo 70) | X = [_______], Y = [_______] (colț de referință) |
| Sistem de proiecție | Stereografic 1970 (EPSG:3844); date GPS raportate în WGS84 (EPSG:4326) |

Terenul se alege relativ plan, cu pantă medie < 5%, expunere favorabilă (deschidere sudică fără obstacole majore de umbrire în arcul solar util), fără cursuri de apă permanente pe amplasament și fără LEA de înaltă tensiune care să traverseze zona de amplasare a meselor fotovoltaice.

**Criterii de eligibilitate a amplasamentului** analizate la faza de identificare a sitului și confirmate în DTAC:

1. **Resursa solară.** Iradiația globală în plan orizontal (GHI) și, mai relevant, iradiația în planul modulelor (POA — Plane of Array) se preiau din baze de date validate (PVGIS al Comisiei Europene, Meteonorm, SolarGIS). Valoarea POA la latitudinile României, pentru module fixe orientate sud la înclinare optimă, se situează în intervalul 1.300–1.500 kWh/m²·an; alegerea unui amplasament în sudul/sud-estul țării maximizează producția specifică.
2. **Panta și microrelieful.** Pante < 5% permit un layout regulat de mese fără terasări costisitoare; pante mai mari cresc autoumbrirea între rânduri pe versanții orientați nordic și complică baterea piloților.
3. **Umbrirea din orizont și din obstacole.** Se verifică profilul de orizont (dealuri, păduri, construcții) și obstacolele apropiate; unghiul de mascare al orizontului sudic trebuie să fie minim în intervalul orar util (cca. 09:00–15:00 timp solar).
4. **Capacitatea portantă și geotehnica.** Terenul trebuie să permită baterea/înșurubarea piloților metalici; se solicită studiu geotehnic cu teste de smulgere (pull-out) și de împingere laterală a piloților de probă, plus determinarea rezistivității solului (pentru dimensionarea prizei de pământ) și a agresivității chimice (pentru coroziunea structurilor îngropate).
5. **Distanța și capacitatea de racordare.** Distanța până la punctul de racordare (stație/PA a operatorului de distribuție) determină lungimea și costul LES 20 kV; capacitatea disponibilă de evacuare în rețea condiționează întreaga fezabilitate și se confirmă prin ATR.
6. **Restricțiile de mediu și de servitute.** Se verifică suprapunerea cu arii naturale protejate (Natura 2000, rezervații), cu zone inundabile (bandă de protecție a cursurilor de apă), cu servituți aeronautice (proximitatea aeroporturilor — reflexia luminoasă spre pistă/turnul de control) și militare, cu culoare de LEA existente (zone de protecție NTE 401/2003) și cu monumente/situri arheologice.
7. **Categoria de folosință a terenului.** Amplasarea pe teren arabil de clasă superioară este descurajată; se preferă terenuri de clasă inferioară de fertilitate, neproductive sau degradate, cu scoatere din circuitul agricol temporară (reversibilă) pe durata funcționării.

### 1.3. Beneficiarul / titularul investiției

- **Titular / investitor:** [Denumire societate] S.R.L. / S.A., CUI [_______], J[__]/[____]/[____], cu sediul în [_______].
- **Reprezentant legal:** [Nume, funcție].
- **Calitatea față de teren:** proprietar / titular al dreptului de superficie / concesionar (conform art. 6 alin. (1) din Legea nr. 50/1991, cu dovada titlului asupra imobilului).

### 1.4. Proiectantul

- **Proiectant general:** [Denumire birou proiectare], atestat conform Legii nr. 10/1995.
- **Șef proiect / coordonator:** [Nume], inginer.
- **Proiectant de specialitate energetică electrică:** inginer autorizat ANRE, gradul [I / II] pentru proiectare instalații electrice, conform Ordinului ANRE nr. 116/2016 (atestare operatori economici și autorizare electricieni).
- **Verificator de proiect:** verificator tehnic atestat MDLPA pentru cerințele esențiale de calitate, cerința **A (rezistență mecanică și stabilitate)** pentru structuri, respectiv verificare instalații electrice (specialitatea **Ie**), conform Legii nr. 10/1995 și HG nr. 925/1995.

### 1.5. Faza de proiectare

Prezentul memoriu constituie parte a documentației **D.T.A.C.** (Documentație Tehnică pentru Autorizarea executării lucrărilor de Construire), fază reglementată de **Legea nr. 50/1991** privind autorizarea executării lucrărilor de construcții, republicată, cu modificările și completările ulterioare, și de **Ordinul MDRAP nr. 839/2009** (Norme metodologice de aplicare). Conținutul-cadru al documentației este cel prevăzut în **Anexa nr. 1** la Legea nr. 50/1991.

DTAC se elaborează pe baza documentației tehnico-economice aprobate (S.F. — Studiu de Fezabilitate / D.A.L.I. după caz, conform HG nr. 907/2016), a Certificatului de Urbanism și a avizelor/acordurilor solicitate prin acesta, și precede fazele de **Proiect Tehnic (P.Th.)** și **Detalii de Execuție (D.E.)**.

### 1.6. Autorizația de construire — cadrul procedural

Autorizația de Construire (A.C.) se emite de autoritatea administrației publice locale competente (Primar / Președinte Consiliu Județean, după caz), în baza DTAC și a documentelor prevăzute la art. 7 din Legea nr. 50/1991. Pentru CEF, avizele determinante uzuale sunt: **Aviz Tehnic de Racordare (ATR)** de la operatorul de distribuție (DSO), aviz de mediu (clasarea notificării / decizia etapei de încadrare a APM), avize utilități, aviz de gospodărire a apelor (dacă e cazul), aviz Direcția pentru Agricultură (scoatere temporară/definitivă din circuitul agricol), aviz Ministerul Apărării / STS / servicii dacă amplasamentul este în zonă de servitute aeronautică sau militară.

**Succesiunea procedurală completă** (de la teren la punerea în funcțiune) urmează, de regulă, următorii pași, corelați între cele trei regimuri (urbanism/construcții, energie, mediu):

1. **Certificat de Urbanism (CU)** emis de autoritatea locală, care stabilește regimul juridic, economic și tehnic al terenului și enumeră avizele/acordurile necesare.
2. **Documentație de urbanism**, dacă amplasamentul este extravilan sau reglementările existente nu permit funcțiunea: **Plan Urbanistic Zonal (PUZ) „Parc Fotovoltaic"** aprobat prin HCL, precedat de aviz de oportunitate și, uzual, de evaluare de mediu strategică (SEA, HG nr. 1076/2004).
3. **Studiul de Soluție și ATR** de la operatorul de distribuție (procedura Ord. ANRE nr. 59/2013), care fixează punctul și soluția de racordare și capacitatea de evacuare.
4. **Decizia etapei de încadrare** a Agenției pentru Protecția Mediului (Legea nr. 292/2018), respectiv decizia privind necesitatea evaluării de impact și, dacă e cazul, evaluarea adecvată (OUG nr. 57/2007) pentru arii Natura 2000.
5. **Scoaterea din circuitul agricol** (Legea nr. 18/1991, Ordinul MADR nr. 83/2018) — de preferat temporară, pe durata funcționării, pentru reversibilitate.
6. **Autorizația de înființare ANRE** (pentru capacități > 1 MW).
7. **Autorizația de Construire** pe baza DTAC (obiectul prezentului memoriu).
8. **Execuția, punerea sub tensiune, PIF cu DSO** și **licența de exploatare comercială ANRE**.

Această înlănțuire justifică de ce DTAC nu este un document izolat, ci nodul central care agregă rezultatele avizării.

### 1.7. Parametrii de proiect (variabilele de intrare)

Documentul se instanțiază pentru un proiect concret prin completarea următorului **set de parametri de intrare**; toate celelalte mărimi se deduc prin formule.

| Simbol | Parametru | U.M. | Domeniu tipic | Exemplu (2 MWp) |
|---|---|---|---|---|
| **P_DC** | Putere instalată DC (variabila principală) | kWp | 250 … 100.000+ | 2.000 |
| P_modul | Putere unitară modul | Wp | 450 … 600 | 555 |
| ILR | Raport DC/AC (inverter loading ratio) | — | 1,15 … 1,35 | 1,25 |
| n_s | Module pe string | buc. | 24 … 30 | 28 |
| GCR | Ground Coverage Ratio | — | 0,30 … 0,45 | 0,37 |
| A_modul | Aria unitară modul | m² | ~2,5 … 2,6 | 2,58 |
| PSH_POA | Iradiere în planul modulelor | kWh/m²·an | 1.300 … 1.500 | 1.450 |
| PR | Performance Ratio | — | 0,80 … 0,84 | 0,82 |
| d | Degradare anuală | %/an | 0,40 … 0,55 | 0,50 |
| T | Durata de viață | ani | 25 … 30 | 25 |

---

## 2. OBIECTUL, NECESITATEA ȘI OPORTUNITATEA INVESTIȚIEI

### 2.1. Obiectul investiției

Obiectul investiției îl constituie **realizarea unei centrale electrice fotovoltaice de putere P_DC [kWp]** (variabilă de proiect), destinată producerii de energie electrică din sursă regenerabilă (radiație solară) și livrării acesteia în Sistemul Energetic Național (SEN) prin racordarea la rețeaua de distribuție de medie tensiune (20 kV) a operatorului concesionar.

Centrala funcționează pe principiul conversiei fotovoltaice directe a radiației solare în energie electrică de curent continuu, urmată de conversia DC→AC prin invertoare de rețea (grid-tie), ridicarea tensiunii de la 0,4 kV la 20 kV prin post de transformare și injectarea în punctul de delimitare stabilit prin ATR. Regimul de funcționare este **nesupravegheat permanent** (fără personal de exploatare rezident), cu monitorizare de la distanță prin sistem SCADA.

**Lanțul energetic complet** (fluxul de la fotoni la rețea) este următorul: radiația solară incidentă (directă + difuză + reflectată — componenta care justifică modulele bifaciale) → generarea perechilor electron-gol în celulele semiconductoare (efect fotovoltaic, joncțiune p-n de siliciu monocristalin) → curent continuu la nivel de modul → însumare în serie pe string (creșterea tensiunii) → însumare în paralel în cutiile de conexiuni (creșterea curentului) → conversie DC→AC în invertor cu urmărirea punctului de putere maximă (MPPT) → însumare pe barele de joasă tensiune → ridicare de tensiune 0,4/20 kV în transformator → măsură comercială → injecție în rețeaua de distribuție de medie tensiune → transport și distribuție către consumatori prin SEN. Fiecare verigă introduce pierderi cuantificate în bilanțul PR (cap. 4). Absența oricărei componente rotative sau de ardere face ca instalația să nu aibă emisii, zgomot semnificativ sau consum de apă în exploatare — trăsături care o disting de centralele termoelectrice clasice și care fundamentează impactul de mediu redus (cap. 8).

### 2.2. Necesitatea investiției — context energetic

Necesitatea investiției derivă din angajamentele naționale și europene de decarbonizare a sectorului energetic:

- **PNIESC (Planul Național Integrat în domeniul Energiei și Schimbărilor Climatice 2021–2030)** stabilește pentru România o **țintă de minim 30,7% pondere a energiei din surse regenerabile în consumul final brut** până în 2030 (revizuită ascendent în versiunile actualizate ale planului către ~34%), cu o componentă importantă de energie solară fotovoltaică în mixul de producție.
- **Directiva (UE) 2018/2001 (RED II)**, modificată prin **Directiva (UE) 2023/2413 (RED III)**, ridică ținta europeană agregată de RES la **42,5% (indicativ 45%) până în 2030**, cu simplificarea procedurilor de autorizare pentru instalațiile de producere din surse regenerabile (zone de accelerare a energiei regenerabile).
- **Regulamentul (UE) 2021/1119 (Legea Europeană a Climei)** consacră obiectivul de **neutralitate climatică până în 2050** și reducerea emisiilor nete cu minim 55% până în 2030 față de 1990.
- **REPowerEU** și **Pactul Verde European (Green Deal)** accelerează substituirea combustibililor fosili importați cu producție regenerabilă indigenă.

La nivel național, capacitatea fotovoltaică instalată a crescut accelerat, dar rămâne sub potențialul geografic al țării; iradiația globală orizontală medie multianuală în România este de **1.200–1.450 kWh/m²·an**, cu valori superioare în sudul și sud-estul țării, plasând România peste media multor state europene cu piețe FV mature.

**Contribuția energetică scalează liniar cu puterea**: o CEF injectează anual E_anual [MWh] = P_DC × PSH_POA × PR (cap. 4). *Exemplu de calcul: pentru P_DC = 2 MWp rezultă ≈ 2.380 MWh/an*, echivalentul consumului mediu anual al aproximativ **900–1.000 de gospodării** (la ~2,4–2,6 MWh/gospodărie·an); pentru orice altă putere, energia se recalculează proporțional.

### 2.3. Oportunitatea investiției

Oportunitatea este susținută de:

1. **Costul nivelat al energiei (LCOE)** fotovoltaic scăzut și în continuă scădere — sub 45–55 EUR/MWh pentru proiecte de utilitate în condițiile RO (cap. 7), competitiv cu sursele convenționale și fără expunere la volatilitatea prețului combustibililor fosili sau la costul certificatelor de CO₂ (EU ETS).
2. **Maturitatea tehnologică** a modulelor bifaciale cu celule PERC/TOPCon și a invertoarelor de string/central, cu garanții de performanță de 25–30 ani și degradare anuală certificată ≤ 0,5%/an.
3. **Cadrul de sprijin și de piață:** posibilitatea încheierii de **Contracte de vânzare-cumpărare a energiei electrice (PPA — Power Purchase Agreement)** pe termen lung, participarea la mecanismul **CfD (Contracts for Difference)** conform OUG nr. 27/2022 și schemelor operate prin OPCOM, sau vânzarea pe piața angro (PZU/PI).
4. **Reversibilitatea** ocupării terenului: la sfârșitul ciclului de viață (25–30 ani), amplasamentul poate fi readus integral la starea agricolă anterioară (structuri demontabile, piloți extractibili, fără fundații masive de beton pe zona de câmp FV).

5. **Modularitatea și scalabilitatea** tehnologiei: aceeași arhitectură tehnică (module + stringuri + invertoare + PT + racord) se replică la orice putere, ceea ce permite adaptarea investiției la capacitatea de racordare disponibilă, la suprafața de teren și la apetitul de capital al investitorului, fără schimbarea principiilor de proiectare. Această proprietate stă la baza abordării parametrice a prezentului memoriu.
6. **Timp scurt de implementare**: durata de execuție de ordinul a 4–6 luni (cap. 9), mult sub cea a capacităților convenționale, permite un răspuns rapid la nevoia de capacitate nouă din sistem.

Investiția este astfel **necesară** (răspunde unei obligații de politică publică și unei cereri reale de energie) și **oportună** (fezabilă tehnic și economic, cu risc scăzut și impact de mediu pozitiv net), la orice scară de putere aleasă de investitor.

### 2.4. Poziționarea în piața de energie

Energia produsă poate fi valorificată prin mai multe canale, care nu se exclud reciproc și pot fi combinate în strategia comercială a proiectului:

- **Piața pentru Ziua Următoare (PZU)** și **Piața Intraday (PI)**, operate de OPCOM — vânzare la prețul angro, cu expunere la volatilitate.
- **Contracte bilaterale PPA** (Power Purchase Agreement), pe termen lung (10–15 ani), cu un cumpărător corporativ sau un furnizor — stabilizează veniturile și facilitează finanțarea bancară (bancabilitate).
- **Contracte pentru Diferență (CfD)**, mecanism de sprijin operat prin OPCOM conform OUG nr. 27/2022 — garantează un preț de exercitare (strike price) pe termen lung, transferând riscul de preț.
- **Autoconsum și prosumator** — mai relevant pentru CEF de putere mică amplasate lângă un consumator industrial, cu injecția surplusului în rețea.

Alegerea canalului nu modifică soluția tehnică din DTAC, dar influențează dimensionarea (ex. un contract de autoconsum poate justifica un ILR diferit) și analiza economică din Studiul de Fezabilitate.

---

## 3. DESCRIEREA GENERALĂ A SOLUȚIEI TEHNICE

Centrala electrică fotovoltaică se compune, indiferent de putere, din aceleași subsisteme funcționale, care se dimensionează la scară: (a) câmpul fotovoltaic (module + structuri de susținere), (b) instalația electrică de curent continuu (stringuri + cutii de conexiuni/combiner), (c) instalația de conversie (invertoare), (d) instalația de curent alternativ de joasă tensiune (0,4 kV), (e) postul/posturile de transformare 0,4/20 kV, (f) instalația de medie tensiune și racordul, (g) infrastructura de incintă (drumuri, platforme, împrejmuire), (h) sistemele auxiliare (SCADA, CCTV, antiefracție, iluminat de securitate, priza de pământ și paratrăsnet).

### 3.1. Câmpul fotovoltaic — module

- **Tip module:** panouri fotovoltaice **bifaciale**, tehnologie monocristalină cu celule half-cut (PERC / TOPCon), sticlă-sticlă sau sticlă-folie, putere nominală unitară **P_modul** (parametru; ex. 555 Wp la STC: 1000 W/m², AM 1,5, 25 °C).
- **Număr module (formulă de scalare):**  
  **N = P_DC / P_modul**  (se rotunjește la multiplu de n_s pentru a completa stringuri întregi).  
  *Exemplu de calcul pentru P_DC = 2 MWp, P_modul = 555 Wp:* N = 2.000.000 / 555 = 3.604 → **3.600 module**.
- **Randament modul:** η_modul ≈ 21,3–21,5% (aria unitară A_modul ≈ 2,58 m², dimensiuni tipice ~2384 × 1096 mm).
- **Coeficient de temperatură al puterii:** γ_Pmpp ≈ −0,30 … −0,34 %/°C (avantaj TOPCon).
- **Câștig bifacial:** 5–12% funcție de albedo (0,20 sol/vegetație, până la 0,30–0,50 pe pietriș deschis) și de înălțimea de montaj; se include conservator în PR global.
- **Conformitate:** module certificate **IEC 61215** (design/omologare de tip — module cristaline), **IEC 61730-1/-2** (siguranță electrică, clasa II izolație, clasa A aplicație), rezistență la sarcini mecanice ≥ 5400 Pa (zăpadă) / ≥ 2400 Pa (vânt) conform IEC 61215.
- **Parametrii electrici la STC** (Standard Test Conditions: 1000 W/m², spectru AM 1,5, temperatură celulă 25 °C) și la NOCT/NMOT (Nominal Operating Cell/Module Temperature, cca. 800 W/m², 20 °C mediu, 1 m/s) sunt cei relevanți pentru dimensionarea electrică: tensiunea la gol V_oc, curentul de scurtcircuit I_sc, tensiunea și curentul la putere maximă V_mpp/I_mpp. La proiectarea stringurilor se verifică **V_oc corectat la temperatura minimă de proiectare** (ex. −20 °C în RO), deoarece V_oc crește la temperaturi scăzute (coeficient de temperatură β_Voc ≈ −0,25…−0,30 %/°C) — acesta este cazul cel mai defavorabil pentru depășirea tensiunii maxime a sistemului DC (1.500 V).
- **Garanții:** garanție de produs 12–15 ani și **garanție de performanță liniară** ~25–30 ani (ex. ≥ 84,8% din puterea nominală la anul 25), cu degradare declarată în primul an ≤ 1–2% și ulterior ≤ 0,4–0,55%/an. Aceste valori fundamentează calculul de producție pe durata de viață (cap. 4).
- **Fenomene de degradare** de urmărit prin O&M: LID (Light Induced Degradation), LeTID (Light and elevated Temperature Induced Degradation, atenuat la TOPCon), PID (Potential Induced Degradation — se previne prin punerea la pământ corectă a polului negativ sau prin invertoare fără transformator cu potențial controlat), microfisuri (hot-spots — detectabile termografic conform IEC 62446-3).

### 3.2. Structuri de susținere (mese fixe)

- **Tip:** structuri **fixe (fixed-tilt)**, configurație **2V** (două module portrait pe rând), fără tracker — minimizează componentele mobile și costul de mentenanță. Alternative (comparație tehnologică):

| Tip structură | GCR | Efect asupra producției | Observație |
|---|---|---|---|
| Pe sol, fix (soluție de referință) | 0,35–0,45 | reper | CAPEX/OPEX minim, robust |
| Tracker 1 axă | 0,30–0,40 | +15–25% | cost + piese mobile |
| Tracker 2 axe | 0,15–0,25 | +30–40% | teren mult, cost mare |
| Plutitor (floating) | — | — | fără teren, dar ancorare/luciu apă |
| Agrivoltaic | 0,25–0,35 | dublă utilizare teren | structuri înalte, cost |

- **Unghi de înclinare (tilt):** β = **25°–35°** față de orizontală (optim pentru latitudinea RO ~44°–48°).
- **Orientare (azimut):** sud, abateri ≤ ±10° cu pierderi < 1%.
- **Material:** oțel zincat termic (**EN ISO 1461**, strat zinc ≥ 55–70 µm) și/sau aluminiu la profilele de prindere; șuruburi/cleme inox A2/A4.
- **Fundare:** **piloți metalici bătuți (ramming) sau înșurubați (screw piles)** direct în teren, fără fundații de beton pe zona de câmp; adâncime de încastrare 1,2–1,8 m funcție de capacitatea portantă (studiu geotehnic — test de smulgere/pull-out și de împingere laterală).
- **Distanța între rânduri (pitch):** dimensionată pentru evitarea autoumbririi la solstițiul de iarnă (21 decembrie), rezultând **GCR = 0,35–0,40** (GCR = A_module / A_teren_util).
- **Calcul structural:** conform **SR EN 1990**, **SR EN 1991-1-3** (zăpadă), **SR EN 1991-1-4** (vânt), **SR EN 1993-1-1/-1-3** (oțel, elemente formate la rece), cu verificare la SLU și SLS. La mese FV **vântul este adesea acțiunea determinantă**, nu seismul.
- **Combinații de încărcări și acțiuni de proiectare** (verificate la faza P.Th., anticipate la DTAC):
  - **Greutatea proprie** a modulelor și structurii (permanentă, G).
  - **Acțiunea zăpezii** s = μ_i × C_e × C_t × s_k, cu valoarea caracteristică s_k funcție de zona climatică (CR 1-1-3 / SR EN 1991-1-3, harta de zonare a României); pentru module înclinate, coeficientul de formă μ_i scade cu unghiul de înclinare (pentru β ≥ 60° zăpada practic alunecă).
  - **Acțiunea vântului** w = c_s c_d × c_f × q_p(z_e), cu presiunea de vârf q_p derivată din viteza de referință v_b,0 (harta zonelor de vânt, CR 1-1-4 / SR EN 1991-1-4) și coeficienți de forță c_f pentru panouri libere/parapete; se verifică atât presiunea (mese pline de vânt din față), cât și **sucțiunea/răsturnarea** (vânt din spate care tinde să smulgă piloții) — cazul critic pentru dimensionarea încastrării.
  - **Acțiunea seismică**, prin metoda forțelor laterale echivalente sau modală (P100-1/2013), cu Fb = γI × Sd(T1) × m × λ; datorită masei mici, forța seismică este de regulă acoperită de combinația de vânt, dar se verifică explicit ancorajele PT și containerelor.
  - **Combinații** conform SR EN 1990 (grupări fundamentale și accidentale), cu factori parțiali de siguranță γ_G, γ_Q și coeficienți de simultaneitate ψ.
- **Rezistența la coroziune:** durata de viață a galvanizării la cald (EN ISO 1461) este dimensionată pentru ≥ 25 ani în categoria de corozivitate atmosferică C2–C3 (ISO 9223); în medii mai agresive (litoral C4–C5) se sporește grosimea stratului de zinc sau se folosesc oțeluri Magnelis/aluzinc.

### 3.3. Instalația electrică de curent continuu (DC)

- **Stringuri:** module în serie; la V_mpp ≈ 42 V și V_oc ≈ 50 V/modul, un string de **n_s = 28 module** dezvoltă V_oc,string ≈ 1.400 V < 1.500 V (tensiunea maximă a sistemului DC, conform IEC 62109/IEC 62548). P_string = n_s × P_modul ≈ 28 × 555 = 15,54 kWp.
- **Număr stringuri (formulă):** **N_str = N / n_s**.  *Exemplu 2 MWp:* N_str = 3.600 / 28 ≈ **129 stringuri**.
- **Cabluri DC:** conductoare solare **H1Z2Z2-K** (XLPO, UV, −40…+90 °C, dublă izolație, EN 50618), 4–6 mm², conectori MC4 sertizați.
- **Cutii de conexiuni DC (combiner boxes):** grupare stringuri cu SPD tip 2 (IEC 61643), siguranțe gPV pe fiecare polaritate, separatoare DC; grad de protecție min. **IP65**.
- **Reguli de proiectare DC** (IEC 62548, SR HD 60364-7-712): numărul maxim de module pe string se determină din condiția V_oc,string(la T_min) ≤ V_sist,max (1.500 V), iar numărul minim din condiția ca V_mpp(la T_max, cca. 70 °C celulă) să rămână în fereastra MPPT a invertorului; siguranțele de string se aleg astfel încât I_n,sigurantă > 1,5 × I_sc,modul și < curentul maxim invers admis de modul (reverse current), pentru a proteja modulele împotriva curenților de retur în caz de defect; cablurile se dimensionează pentru cădere de tensiune ΔU_DC ≤ 1% și verificare termică. Sistemul DC funcționează, de regulă, ca sistem **IT nelegat la pământ** (fără punct de nul conectat la masă), cu monitorizare de izolație (riso) — cerință de siguranță pentru detectarea timpurie a defectelor de izolație și evitarea arcului electric DC (care, spre deosebire de arcul AC, nu se autostinge la trecerea prin zero).
- **Protecția la arc electric DC (AFCI)** și **deconectorii rapizi de string/modul (rapid shutdown)** — recomandate ca măsuri de siguranță la incendiu și pentru intervenția pompierilor, întrucât câmpul FV rămâne sub tensiune atâta timp cât există lumină.

### 3.4. Instalația de conversie — invertoare

- **Concept:** invertoare de **string** (distribuite) sau **centrale** (skid), grid-tie, cu MPPT multiplu.
- **Putere nominală AC (formulă):** **P_AC = P_DC / ILR**.  *Exemplu 2 MWp, ILR 1,25:* P_AC = 2.000 / 1,25 = **1.600 kVA**.
- **Raport DC/AC (ILR — overplanting):** ILR = P_DC / P_AC = 1,15…1,35 (referință 1,25). Supradimensionarea DC crește orele la putere nominală AC și energia anuală, cu pierderi de clipping neglijabile (< 1–2%).
- **Randament:** η_invertor euro/CEC ≥ **98,0–98,6%**, cu pornire low-light și derating termic.
- **Funcții de rețea (grid support):** control Q(U), cos φ reglabil 0,90 ind…0,90 cap, **FRT/LVRT**, reglaj P(f) la supra-frecvență, conform **Regulamentului (UE) 2016/631 (RfG)** și Codului Tehnic al RED. Clasificarea pe tipuri (A/B/C/D) se face după **puterea maximă la punctul de conectare**: sub 1 MW și < 110 kV → tip A; **0,125–…MW → tip B**; peste praguri → C/D — se stabilește în funcție de P_AC a proiectului concret.
- **Conformitate:** IEC 62109-1/-2; CEM conform seriei EN 61000.
- **Justificarea supradimensionării DC (oversizing).** Puterea instantanee la ieșirea câmpului atinge P_DC nominal doar în condiții ideale (iradianță 1000 W/m², 25 °C), rareori întâlnite simultan; în majoritatea orelor de producție iradianța și temperatura reale conduc la o putere sub nominal. Prin urmare, dimensionarea invertorului la P_AC = P_DC ar lăsa echipamentul subîncărcat aproape tot timpul. Alegerea ILR ≈ 1,25 face ca invertorul să funcționeze aproape de nominal mai multe ore pe zi, crescând energia anuală și factorul de capacitate AC, cu prețul unei limitări (clipping) doar în vârfurile scurte de iradianță — pierdere de energie de sub 1–2%, mult inferioară câștigului. Valoarea optimă a ILR depinde de climat (mai mare în zone cu iradianță difuză, mai mică în zone cu vârfuri intense), de tehnologia modulelor și de strategia comercială (un ILR mai mare „aplatizează" profilul de injecție, util când capacitatea de racordare este limitată).
- **Clasificarea RfG a modulului de generare** (Regulamentul UE 2016/631) se face după puterea maximă la punctul de conectare P_max și tensiunea de conectare. Pentru o CEF racordată la 20 kV: tip A (< 1 MW), tip B (1–…MW, sub praguri naționale), tip C/D la puteri mari. Fiecare tip impune cerințe crescânde: reglaj de frecvență, capabilitate de putere reactivă, LVRT (traversarea golurilor de tensiune), telecomunicație și telecomandă cu operatorul. Certificarea conformității (Notificarea Operațională de Punere în Funcțiune — NOPÎF/EON) se obține pe baza documentelor de conformitate ale echipamentelor și, la puteri mari, prin testare.

### 3.5. Instalația de curent alternativ de joasă tensiune (0,4 kV)

- Colectarea ieșirilor AC pe **tabloul general de joasă tensiune (TGJT)**, cu întrerupătoare automate, protecții scurtcircuit/suprasarcină, SPD tip 2, măsură pe JT.
- Cabluri AC de JT (**N2XH / CYY-F**) dimensionate la curent nominal, verificate la cădere de tensiune (ΔU ≤ 1,5% pe JT) și la solicitare termică de scurtcircuit (I²t).

### 3.6. Postul/posturile de transformare 0,4/20 kV

- **Putere PT (formulă de dimensionare):** **S_PT ≈ P_AC** (se alege prima treaptă standardizată ≥ P_AC; treapta se împarte pe mai multe unități la puteri mari).  
  *Exemplu 2 MWp:* P_AC = 1.600 kVA → **transformator 1.600 kVA**, raport 0,4/20 kV. Pentru puteri mari se folosesc mai multe PT (ex. 5 MWac → 2–3 × 1.600–2.500 kVA sau stație 20 kV dedicată).
- **Caracteristici transformator:** în ulei (ONAN) sau uscat în rășină, grupă **Dyn5/Dyn11**, u_k ≈ 6%, reglaj de priză MT ±2×2,5%.
- **Amplasare:** post prefabricat de beton (PTAB) sau cabină metalică, pe platformă betonată, cu **cuvă de retenție a uleiului** ≥ 100% din volumul de ulei (protecția solului/apelor subterane).
- **Celule MT (20 kV):** sosire, plecare, măsură, protecție (relee maximală de curent, homopolară, direcțională după caz), conform Codului Tehnic al RED și **NTE 401/2003**.
- **Măsura energiei:** grup bidirecțional clasă 0,2S/0,5S în punctul de delimitare (ATR), cu telecitire.
- **Pierderile transformatorului** (de mers în gol P_0 și de sarcină P_k) se cuantifică în bilanțul PR; la un transformator de distribuție eficient, randamentul la sarcină nominală este ~99%, iar pierderile de mers în gol devin semnificative la CEF, unde noaptea nu există producție dar transformatorul rămâne alimentat din rețea — de aceea se preferă transformatoare cu pierderi reduse (clasele de eco-proiectare conform Regulamentului UE 548/2014) și, uneori, deconectarea PT pe timp de noapte.
- **Serviciile proprii (auxiliare)** ale centralei (SCADA, iluminat de securitate, sisteme de securitate, ventilație, trasare) se alimentează dintr-un transformator de servicii proprii sau dintr-o plecare dedicată de JT; consumul propriu este de ordinul a 0,5–1% din producție și se scade la calculul energiei nete livrate.

### 3.7. Racordul la rețeaua de distribuție (20 kV)

- Soluția se stabilește prin **Studiul de Soluție** și **Avizul Tehnic de Racordare (ATR)** al DSO, conform **Regulamentului de racordare** (Ord. ANRE nr. 59/2013, cu modificările ulterioare — versiunea în vigoare).
- **Racord de referință:** **LES 20 kV** din PT la punctul de racordare (celulă rezervată în stația/PA a DSO sau racord în buclă pe LEA/LES 20 kV existentă); lungime funcție de amplasament (0,5–5 km).
- **Cablu MT (dimensionare la curent):** tip **A2XS(F)2Y / N2XSY 12/20 kV**; curentul nominal **I_n = P_AC / (√3 × U)**.  *Exemplu 1.600 kVA la 20 kV:* I_n = 1.600.000 / (1,732 × 20.000) ≈ **46 A** → secțiune Al 95–120 mm² (verificată și la scurtcircuitul rețelei DSO).
- **Etape:** cerere racordare + fișă soluție → ATR → contract racordare → proiectare/execuție instalație racordare → PIF → certificat de racordare.

### 3.8. Drumuri interioare, platforme, împrejmuire, securitate

- **Drum de acces exterior:** legătura cu drumul public se realizează cu aviz de la administratorul drumului (CNAIR / Consiliul Județean / Primărie), cu amenajarea intersecției (raza de racordare pentru autospeciale și transport agabaritic al PT/containerelor) și, la nevoie, cu podeț peste rigola drumului public.
- **Drum de incintă / acces:** drum tehnologic perimetral și de acces, lățime 3,0–4,0 m (până la 5 m la parcuri mari), structură balastată/pietruită, pentru mentenanță și autospeciale PSI; se dimensionează pentru gabaritul de intervenție ISU și pentru transportul transformatoarelor.
- **Platforme:** betonate sub PT și cabine invertoare, cu pantă de scurgere și rigole.
- **Împrejmuire:** gard perimetral panouri bordurate zincate / plasă, înălțime ≥ 2,0 m, poartă auto+pietonal; **spații libere la baza gardului (10–15 cm)** pentru fauna mică.
- **Antiefracție:** senzori perimetrali (IR, cablu senzor, microunde), centrală alarmă cu comunicare la dispecerat, conform Legii nr. 333/2003.
- **CCTV:** camere IP fixe + PTZ, IR nocturn, NVR, VMD, conform HG nr. 301/2012.
- **Iluminat de securitate:** LED cu comandă crepusculară/la detecție, minimizat (poluare luminoasă).
- **SCADA:** monitorizare producție, invertoare, stație meteo (piranometru, temperaturi, anemometru), comunicare GSM/fibră la dispecer și, la cerere, la DEC/DED conform Codului Tehnic al RED.
- **Rolul stației meteo în verificarea performanței:** piranometrul (măsură a iradianței POA) permite calculul în timp real al Performance Ratio efectiv (PR = producție măsurată / producție teoretică din iradianța măsurată), instrumentul principal de verificare a garanției de producție și de detectare a subperformanței (murdărire, defecte de string, degradare accelerată). Senzorii de temperatură modul permit corectarea la temperatura de referință.
- **Cerințe de securitate cibernetică:** sistemul SCADA și legăturile de telecomandă cu operatorul de rețea trebuie protejate conform bunelor practici (segmentare de rețea, VPN, autentificare), CEF de putere mare fiind infrastructură energetică cu relevanță pentru securitatea alimentării.

### 3.9. Legare la pământ și protecție împotriva trăsnetului

- **Priză de pământ** perimetrală + de suprafață, **R_p ≤ 4 Ω** (valoare-țintă uzuală; se corelează cu cerințele de protecție la atingere și cu rezistivitatea solului determinată geotehnic), echipotențializarea tuturor maselor (structuri metalice ale meselor, carcase invertoare, cuve PT, gard metalic).
- **Protecție trăsnet (LPS):** analiză de risc și sistem conform seriei **SR EN/IEC 62305-1…-4**. Analiza de risc (partea -2) compară riscul calculat R cu riscul tolerabil R_T și stabilește nivelul de protecție necesar (LPL I–IV). Componentele câmpului FV, având suprafață mare expusă în teren deschis, sunt vulnerabile la supratensiuni de origine atmosferică induse; protecția se realizează în cascadă cu **SPD tip 1** (la intrarea în PT/tabloul general, pentru descărcarea curentului de trăsnet) și **SPD tip 2** (la nivel de invertor și combiner box, pentru limitarea supratensiunilor reziduale), coordonate energetic, plus legarea echipotențială a tuturor structurilor la priza de pământ.
- **Protecția împotriva șocurilor electrice** (IEC 61140, I7/2011): pe partea DC se aplică izolația dublă/întărită (clasa II a modulelor și cablurilor) și separarea de pământ (sistem IT cu monitorizare de izolație); pe partea AC se aplică schema de legare la neutru corespunzătoare (TN-S în incintă) cu protecții diferențiale și la scurtcircuit, plus verificări PRAM periodice.

---

## 4. BILANȚ DE PUTERI ȘI ENERGIE (FORMULE PARAMETRICE)

### 4.1. Set de formule de scalare

| Nr. | Mărime | Formulă | U.M. |
|---|---|---|---|
| 1 | Număr module | N = P_DC / P_modul | buc. |
| 2 | Număr stringuri | N_str = N / n_s | buc. |
| 3 | Putere AC | P_AC = P_DC / ILR | kVA |
| 4 | Putere PT | S_PT ≈ P_AC (treapta standard ≥ P_AC) | kVA |
| 5 | Curent nominal MT | I_n = P_AC / (√3 × U) | A |
| 6 | Energie anuală (an 1) | E = P_DC × PSH_POA × PR / G_STC | kWh/an |
| 7 | Yield specific | Y_f = E / P_DC | kWh/kWp·an |
| 8 | Factor de capacitate (DC) | CF_DC = E / (P_DC × 8.760) | — |
| 9 | Factor de capacitate (AC) | CF_AC = E / (P_AC × 8.760) | — |
| 10 | Ore echivalente (DC) | h_ech = E / P_DC | h/an |
| 11 | Energie an k (degradare) | E_k = E_1 × (1 − d)^(k−1) | kWh/an |
| 12 | Energie cumulată T ani | E_tot = E_1 × [1 − (1 − d)^T] / d | kWh |
| 13 | CO₂ evitat anual | CO₂ = E × f_emisie_SEN | tCO₂/an |
| 14 | Teren necesar | S_teren = A_module / GCR (A_module ≈ N × A_modul × cos β) | m² |

(G_STC = 1 kW/m²; formula 6 este dimensional corectă: E[kWh] = P_DC[kWp] × PSH_POA[kWh/m²·an] / (1 kW/m²) × PR.)

**Interpretarea mărimilor cheie:**

- **PSH_POA (Peak Sun Hours în planul modulelor)** reprezintă numărul echivalent de ore pe an în care soarele ar radia la 1000 W/m² pentru a livra aceeași energie ca radiația reală variabilă; numeric egal cu iradiația POA exprimată în kWh/m²·an împărțită la 1 kW/m². Valoarea POA încorporează deja câștigul din înclinarea și orientarea modulelor față de iradiația orizontală (GHI) și, la module bifaciale, un aport din iradiația reflectată de sol pe fața posterioară.
- **PR (Performance Ratio)** este raportul adimensional dintre energia efectiv livrată și energia teoretic disponibilă la iradiația măsurată, dacă modulele ar funcționa la randamentul STC. Este indicatorul universal de calitate al unei CEF (independent de locație și de putere), permițând compararea instalațiilor între ele; valoarea 0,80–0,84 este tipică pentru mese fixe bine proiectate în climat temperat.
- **Factorul de capacitate (CF)** exprimă cât de intens este utilizată puterea instalată în raport cu funcționarea teoretică continuă (8.760 h/an). Valorile FV (13–17%) sunt intrinsec mai mici decât ale surselor dispecerizabile, reflectând caracterul intermitent al resursei solare (zi/noapte, sezon, nebulozitate). CF raportat la puterea AC (17%) este mai mare decât cel raportat la puterea DC (13,6%) tocmai datorită supradimensionării DC.

**Precizia estimării.** Formula simplificată E = P_DC × PSH × PR oferă o estimare bună la nivel de DTAC (eroare tipică ±5–8%). Pentru bancabilitate, la faza P.Th./S.F. se rulează o **simulare orară detaliată** (PVsyst, PVGIS, SAM) cu date meteo TMY (Typical Meteorological Year), care modelează explicit fiecare pierdere, umbrirea inter-rând oră cu oră, comportamentul termic și clippingul, și furnizează distribuția probabilistică a producției (P50/P90 — valoarea depășită cu probabilitate 50%, respectiv 90%). Valoarea **P90** este cea folosită de finanțatori pentru dimensionarea serviciului datoriei.

### 4.2. Exemplu de calcul complet pentru P_DC = 2 MWp

> Etichetat explicit ca **exemplu**; nu constituie ipoteza fixă a proiectului. Se recalculează pentru orice P_DC folosind formulele din 4.1.

| Nr. | Indicator | Formulă | Valoare (P_DC = 2.000 kWp) |
|---|---|---|---|
| 1 | Putere DC | dat de proiect | 2.000 kWp (3.600 × 555 = 1.998 efectiv) |
| 2 | Putere AC | P_DC / ILR | 1.600 kVA |
| 3 | ILR | P_DC / P_AC | 1,25 |
| 4 | Număr module | P_DC / P_modul | 3.600 |
| 5 | Module/string | V_oc,str < 1.500 V | 28 |
| 6 | Număr stringuri | N / n_s | 129 |
| 7 | Invertoare | P_AC / P_inv | 16 × 100 kVA |
| 8 | PT | ≥ P_AC | 1.600 kVA |
| 9 | Iradiere POA | PVGIS/Meteonorm | 1.450 kWh/m²·an |
| 10 | PR | defalcare pierderi | 0,82 |
| 11 | Energie an 1 | P_DC × PSH × PR | 2.000 × 1.450 × 0,82 = **2.378 MWh/an** |
| 12 | Yield specific | E / P_DC | **1.189 kWh/kWp·an** |
| 13 | CF (DC) | E / (P_DC × 8.760) | 2.378.000 / 17.520.000 = **13,6%** |
| 14 | CF (AC) | E / (P_AC × 8.760) | 2.378.000 / 14.016.000 = **17,0%** |
| 15 | Ore echiv. (DC) | E / P_DC | **1.189 h/an** |
| 16 | Ore echiv. (AC) | E / P_AC | **1.486 h/an** |
| 17 | Degradare | garanție | 0,50 %/an |
| 18 | Energie an 25 | E_1 × 0,995^24 | 2.378 × 0,8869 = **2.109 MWh/an** |
| 19 | Cumulat 25 ani | serie geometrică | **55.885 MWh** |
| 20 | Cumulat 30 ani | serie geometrică | **66.394 MWh** |

**Detaliere calcule (exemplul 2 MWp):**

- Energie an 1: E = 2.000 × 1.450 × 0,82 = **2.378.000 kWh/an ≈ 2.380 MWh/an**.
- Yield specific: Y_f = 2.378.000 / 2.000 = **1.189 kWh/kWp·an** (domeniu de referință 1.190–1.300, funcție de zonă și câștig bifacial).
- Factor de capacitate DC: CF = 2.378.000 / (2.000 × 8.760) = **0,1357 → 13,6%**.
- Factor de capacitate AC: CF_AC = 2.378.000 / (1.600 × 8.760) = **0,1697 → 17,0%**.
- Degradare pe viață: (1 − 0,005)^25 = 0,995^25 ≈ 0,8825; E_tot,25 = 2.378 × (1 − 0,8825)/0,005 = 2.378 × 23,50 ≈ **55.885 MWh**; media anuală ≈ 2.235 MWh; anul 25 = 2.378 × 0,995^24 ≈ **2.109 MWh** (retenție 88,7%, coerent cu garanția ≥ 84,8% la 25 ani).
- Pentru T = 30 ani: 0,995^30 ≈ 0,8604; E_tot,30 = 2.378 × (1 − 0,8604)/0,005 = 2.378 × 27,92 ≈ **66.394 MWh**.

### 4.3. Tabel de scalare pentru puteri uzuale (aceleași formule, PR 0,82, PSH 1.450)

| P_DC | N module (÷555 Wp) | P_AC (÷ILR 1,25) | PT ≈ | E anual (×1.450×0,82) | Teren orientativ (GCR 0,37) |
|---|---|---|---|---|---|
| 500 kWp | 901 | 400 kVA | 400–630 kVA | 595 MWh | ~0,55 ha |
| 1 MWp | 1.802 | 800 kVA | 800 kVA | 1.190 MWh | ~1,1 ha |
| **2 MWp** | **3.604** | **1.600 kVA** | **1.600 kVA** | **2.378 MWh** | **~2,2 ha** |
| 5 MWp | 9.009 | 4.000 kVA | 2×2.500 kVA | 5.945 MWh | ~5,5 ha |
| 10 MWp | 18.018 | 8.000 kVA | stație 20 kV | 11.890 MWh | ~11 ha |
| 50 MWp | 90.090 | 40.000 kVA | stație 20/110 kV | 59.450 MWh | ~55 ha |

*Suprafața de teren și treapta PT sunt orientative; se detaliază după bilanțul din cap. 5 și după soluția de racordare (ATR).*

### 4.4. Bilanțul de pierderi (defalcarea PR — independent de putere)

| Categorie de pierdere | Valoare tipică | Observații |
|---|---|---|
| Temperatură (peste 25 °C) | 4–8% | funcție de γ_Pmpp și NOCT |
| Umbrire (near/far) + orizont | 1–3% | inter-row + orizont |
| Mismatch (neuniformitate) | 1–2% | toleranță sortată pozitiv |
| Murdărire (soiling) | 1–3% | funcție de curățare/precipitații |
| Pierderi cabluri DC | 1–1,5% | ΔU DC ≤ 1% |
| Randament invertor | 1,4–2% | η 98–98,6% |
| Transformator + AC | 1–2% | trafo ~99% + cabluri AC |
| Clipping (ILR 1,25) | < 1–2% | oversizing DC |
| Indisponibilitate | 0,5–1% | mentenanță, defecte |
| **PR rezultant** | **≈ 0,82** | produs cumulat |

PR-ul confirmat prin **simulare PVsyst/PVGIS** se atașează la faza P.Th.; el este cvasi-independent de puterea instalată (depinde de sit, tehnologie și management O&M), motiv pentru care formula E = P_DC × PSH × PR scalează liniar cu P_DC.

**Modelarea matematică a PR** ca produs de factori: PR = (1 − p_temp) × (1 − p_umbrire) × (1 − p_mismatch) × (1 − p_soiling) × (1 − p_cabluri) × η_inv × η_trafo × (1 − p_clipping) × disp. Fiecare factor sub-unitar reduce PR; produsul lor conduce la valoarea globală. Această descompunere permite optimizarea proiectării: de exemplu, creșterea distanței între rânduri reduce p_umbrire (dar mărește terenul și scade GCR), curățarea mai frecventă reduce p_soiling (dar crește OPEX), iar alegerea unui ILR echilibrat menține p_clipping neglijabil. Proiectarea optimă este cea care maximizează energia livrată pe unitatea de cost (LCOE minim), nu neapărat PR-ul maxim în sine.

### 4.5. Verificarea electrică a stringurilor la temperaturile extreme

Numărul de module pe string (n_s) — parametru care fixează arhitectura DC — se determină din dubla condiție de tensiune, independentă de putere:

- **Limita superioară (temperatură minimă de proiectare, ex. −25 °C):** n_s × V_oc × [1 + β_Voc × (T_min − 25)] ≤ V_sist,max (1.500 V). La module cu V_oc ≈ 50 V și β_Voc ≈ −0,28 %/°C, V_oc la −25 °C ≈ 50 × [1 + 0,0028 × 50] = 50 × 1,14 = 57 V; deci n_s,max ≤ 1.500 / 57 ≈ 26–28 module.
- **Limita inferioară (temperatură maximă a celulei, ex. +70 °C):** n_s × V_mpp la 70 °C ≥ V_mpp,min a ferestrei MPPT a invertorului, pentru ca invertorul să poată urmări punctul de putere maximă și în zilele calde.

Alegerea n_s = 28 (exemplul de referință) respectă ambele limite. Aceasta ilustrează că, deși puterea totală este variabilă, **arhitectura de string este constrânsă de fizica dispozitivelor și de standarde (IEC 62109, IEC 62548)**, nu de mărimea parcului — un parc de 500 kWp și unul de 50 MWp folosesc aceeași lungime de string, diferind doar prin numărul de stringuri.

---

## 5. BILANȚ TERITORIAL (SUPRAFEȚE, POT, CUT) — PARAMETRIC

### 5.1. Formula de dimensionare a terenului

Suprafața de teren scalează cu puterea:

**S_teren ≈ A_module / GCR**, unde **A_module ≈ N × A_modul × cos β** (proiecția orizontală a suprafeței colectoare), iar N = P_DC / P_modul.

Echivalent, densitatea de putere pe teren **ρ = P_DC / S_teren ≈ 0,8–1,0 MWp/ha** pentru mese fixe la latitudinea RO (rezultă din GCR 0,35–0,40 și randamentul modulelor). Deci **S_teren ≈ P_DC[MWp] / 0,9 [MWp/ha]**.

**Deducerea densității de putere.** Aria colectoare necesară pentru P_DC este A_module = P_DC / (η_modul × G_STC) = P_DC[kWp] / (0,215 × 1 kW/m²) ≈ P_DC[kWp] × 4,65 m²/kWp. Aria de teren rezultă împărțind la GCR: A_teren = A_module / GCR. La η_modul ≈ 0,215 și GCR ≈ 0,37: A_teren ≈ P_DC × 4,65 / 0,37 ≈ P_DC × 12,6 m²/kWp, adică ≈ 1,26 ha/MWp → densitatea ρ ≈ 0,79 MWp/ha. Cu marje pentru drumuri, PT, retrageri și bandă tehnică, valoarea practică urcă la 1,1–1,3 ha/MWp la mese fixe (ρ ≈ 0,77–0,90 MWp/ha) și până la 2,0–2,5 ha/MWp la trackere (GCR mai mic). De aceea densitatea este un parametru de proiect, nu o constantă.

### 5.1bis. Dimensionarea bidirecțională teren ↔ putere

Proiectarea unei CEF pornește, în practică, dintr-una din două situații — fie investitorul are o **putere-țintă** (din contract/racord) și caută terenul necesar, fie are un **teren dat** și vrea puterea maximă instalabilă. Ambele sensuri se rezolvă cu aceleași mărimi, inversând formula.

**Sensul A — Putere dorită → Teren necesar:**

> **S_teren = (N_module × A_modul) / GCR × (1 + f_infra)**, unde N_module = P_DC / P_modul, A_modul = aria unitară a modulului, iar f_infra ≈ 0,15–0,25 este marja pentru drumuri, platforme PT, retrageri și bandă tehnică.

Exprimat sintetic ca **suprafață specifică**: **s = S_teren / P_DC ≈ 1,5–2,5 ha/MWp** (valoarea mică la mese fixe cu module de randament mare, valoarea mare la trackere).  
*Exemplu de calcul: pentru P_DC = 2 MWp, mese fixe, s ≈ 1,1–1,3 ha/MWp → S_teren ≈ 2,2–2,6 ha* (coerent cu terenul de referință 2,25 ha).

**Sensul B — Teren disponibil → Putere maximă instalabilă:**

> **P_max = (S_util × GCR) / A_modul × P_modul**, unde S_util = S_teren × (1 − f_infra) este suprafața net utilizabilă (după scăderea drumurilor, retragerilor, zonelor de protecție și a benzii perimetrale).

*Exemplu de calcul: pentru un teren S_teren = 5 ha, cu f_infra = 0,20 → S_util = 4,0 ha = 40.000 m²; mese fixe GCR 0,37; module 555 Wp cu A_modul 2,58 m²:*  
Nr. module = S_util × GCR / A_modul = 40.000 × 0,37 / 2,58 ≈ **5.736 module**; P_max = 5.736 × 555 ≈ **3.183 kWp ≈ 3,2 MWp DC** (deci ρ ≈ 0,64 MWp/ha pe terenul brut, respectiv ~0,80 MWp/ha pe S_util).

**Densitatea de putere (kWp/ha)** este mărimea-punte între cele două sensuri: ρ = P_DC / S_teren. La mese fixe ρ ≈ 770–900 kWp/ha (teren brut); la trackere scade la ~400–600 kWp/ha. Cunoscând ρ pentru tipul de montaj ales, oricare dintre cele două întrebări (câtă putere pe terenul meu / cât teren pentru puterea mea) se răspunde imediat.

### 5.1ter. Tipuri de montaj — impact comparativ asupra terenului și producției

Alegerea tipului de montaj este decizia care influențează cel mai mult raportul teren/putere/producție/cost. Tabelul comparativ (parametric, valori de referință RO):

| Tip montaj | GCR tipic | Densitate (kWp/ha) | Producție relativă | Teren relativ | Cost relativ | Piese mobile |
|---|---|---|---|---|---|---|
| **Suporți ficși (referință)** | ~0,40 | ~800–900 | 100% (bază) | 100% (bază) | 100% (bază) | nu |
| Tracker 1 axă (N-S, urmărire E-V) | ~0,33 | ~500–650 | **+15–20%** | +30–50% | +10–20% | da (motoare, senzori) |
| Tracker 2 axe | ~0,25 | ~350–500 | **+25–35%** | +60–100% | +30–50% | da (complex) |

**Interpretare pentru decizia de proiect:**

- **Mese fixe** — soluția de referință: CAPEX și OPEX minime, fiabilitate maximă (fără componente mobile care se defectează), robustețe la vânt, execuție rapidă cu piloți bătuți fără beton. Producția specifică este cea mai mică, dar costul nivelat (LCOE) este de regulă cel mai bun în RO pentru proiecte utility standard.
- **Tracker 1 axă** — crește producția cu 15–20% prin urmărirea soarelui pe direcția E-V, dar necesită mai mult teren (GCR mai mic pentru a evita autoumbrirea la unghiuri mari), motoare, senzori și mentenanță suplimentară; justificat pe terenuri ample cu resursă solară bună și când capacitatea de racordare permite o energie mai mare.
- **Tracker 2 axe** — câștig maxim de producție (25–35%), dar cost și complexitate mari, teren mult; rar folosit la scară utility, mai degrabă în cercetare sau nișe.

Când **terenul este factorul limitativ** (Sensul B), mesele fixe maximizează puterea instalabilă (GCR mare); când **capacitatea de racordare/energia este ținta** și terenul e abundent, trackerele pot fi avantajoase. Prezentul memoriu adoptă, ca soluție de referință, **mesele fixe**, dar formulele rămân valabile pentru orice tip, prin ajustarea GCR și a densității.

### 5.2. Exemplu de bilanț al suprafețelor pentru P_DC = 2 MWp (S_teren ≈ 22.500 m² = 2,25 ha)

| Nr. | Categorie de suprafață | Formulă / regulă | Suprafață (m²) | Pondere |
|---|---|---|---|---|
| 1 | Teren total | S_teren ≈ P_DC / 0,9 MWp·ha⁻¹ | 22.500 | 100% |
| 2 | Proiecție module (câmp FV) | A_module = A_teren_util × GCR | ~8.000–9.000 | 35–40% |
| 3 | Amprentă PT + cabine invertoare | funcție de nr. PT | ~120–180 | 0,5–0,8% |
| 4 | Drumuri + platforme balastate | ~5–8% din S_teren | ~1.200–1.800 | 5–8% |
| 5 | Bandă tehnică perimetrală (gard) | perimetru × lățime | ~300–500 | 1,5–2% |
| 6 | Spații verzi / vegetație sub-mese | rest | ~11.000–12.000 | ≈ 50–55% |

A_module = A_teren_util × GCR; la GCR 0,37 și A_teren_util ≈ 22.000 m² → A_module ≈ 8.140 m².

### 5.3. POT și CUT — de ce sunt foarte mici (regulă generală, orice putere)

Pentru o CEF, coeficienții urbanistici clasici (POT, CUT) se raportează **exclusiv la construcțiile propriu-zise** (posturi de transformare, cabine tehnice, eventual clădire de pază), **nu la mesele fotovoltaice**, întrucât:

- Mesele fotovoltaice sunt **instalații tehnologice pe structuri metalice demontabile pe piloți**, fără fundații de tip construcție permanentă; nu creează suprafață construită desfășurată în sens urbanistic (nu sunt „clădiri" cu planșee).
- Solul rămâne **permeabil** sub și între mese (vegetație menținută), fără impermeabilizare — apa pluvială se infiltrează natural.

**POT (raportat la construcțiile permanente):** POT = A_construită_la_sol / S_teren.  
*Exemplu 2 MWp:* POT ≈ (180 m² PT+cabine + ~800 m² platforme) / 22.500 ≈ **2–5%**.  
Regula scalează: chiar la puteri mari, construcțiile efective rămân o fracțiune minoritară, deci **POT rămâne de ordinul 2–5%**.

**CUT:** CUT = A_desfășurată / S_teren; construcțiile fiind parter (P), A_desfășurată ≈ A_construită → CUT ≈ **0,02–0,05**.

**De ce sunt mici:** funcțiunea fotovoltaică este **extensivă și cu grad redus de construire** — ocupă mult teren pentru colectarea radiației, dar „construiește" foarte puțin. Aceasta o diferențiază radical de industria clasică (hale) și susține **reversibilitatea**. Documentația de urbanism (**PUZ Parc Fotovoltaic**, conform Legii nr. 350/2001) stabilește POT/CUT admise; pentru energie ele sunt caracteristic reduse (POT ≤ 5–10%, CUT ≤ 0,1, regim P, retrageri ≥ 5,0 m + perdea vegetală).

> **Rang superior ≠ rang inferior:** PUZ Parc Fotovoltaic (rang superior — reglementare de zonă) ≠ DTAC (rang inferior — autorizare punctuală pe amplasament). Sunt documente diferite ca scop și conținut.

**Standard specific funcțiunii:** indicatorul relevant nu este POT/CUT (proiectați pentru clădiri), ci **densitatea de putere (kWp/ha)** și **GCR**. *Exemplu 2 MWp:* ρ = 2.000 / 2,25 = **≈ 890 kWp/ha** (0,89 MWp/ha).

### 5.4. Managementul apelor pluviale și permeabilitatea

Un aspect definitoriu al bilanțului teritorial la CEF este **menținerea permeabilității terenului**. Spre deosebire de o hală industrială, unde suprafața se impermeabilizează masiv și se impune canalizare pluvială dimensionată la debitul de calcul, la parcul fotovoltaic:

- Suprafața impermeabilizată efectiv este minimă (doar platformele PT și, eventual, cabinele de invertoare) — sub 1% din teren.
- Sub și între mese solul rămâne acoperit cu vegetație, iar apa pluvială se **infiltrează natural** sau se scurge lent, fără concentrare artificială.
- Coeficientul de scurgere al amplasamentului rămâne practic neschimbat față de starea agricolă inițială, motiv pentru care avizul de gospodărire a apelor confirmă, de regulă, impact hidrologic neglijabil.
- Se prevăd totuși rigole și șanțuri de gardă locale pentru dirijarea apelor de la platforme și pentru evitarea eroziunii la baza piloților pe terenurile în pantă.

Această caracteristică susține argumentul de reversibilitate și de impact de mediu redus dezvoltat în cap. 8.

### 5.5. Retrageri, zone de protecție și organizarea layoutului

Layoutul câmpului respectă retragerile și zonele de protecție impuse prin PUZ, CU și avize:

- **Retrageri față de limitele de proprietate:** de regulă ≥ 5,0 m, cu perdea vegetală de protecție/camuflaj vizual pe latura dinspre drumuri publice sau locuințe.
- **Distanța față de fondul forestier:** cca. 50 m (Codul Silvic, Legea nr. 46/2008), atât pentru protecția pădurii, cât și pentru evitarea umbririi de la vegetația înaltă.
- **Zone de protecție ale rețelelor** care traversează sau mărginesc terenul: LEA/LES (NTE 401/2003), conducte de gaz (Transgaz, cca. 20 m), cale ferată (CFR, cca. 100 m), drum național (CNAIR, cca. 22 m de la ax), cursuri de apă (ANAR, bandă de mal cca. 5 m).

Aceste constrângeri reduc aria efectiv utilizabilă a terenului și explică de ce **suprafața brută achiziționată/concesionată este cu 10–20% mai mare decât aria strict necesară** pentru puterea proiectată — factor de luat în calcul la instanțierea formulei S_teren pentru un proiect concret.

---

## 6. CADRUL LEGAL ȘI NORMATIV APLICABIL

Cadrul legal-administrativ constituie substanța memoriului general la o CEF, întrucât autorizarea depinde de un complex de regimuri juridice suprapuse (construcții, urbanism, energie, mediu, fond funciar). Referințele de mai jos se citează cu articolele relevante și se aplică indiferent de puterea instalată.

### 6.1. Legislație primară — construcții și autorizare

- **Legea nr. 50/1991** privind autorizarea executării lucrărilor de construcții, republicată, cu modificările și completările ulterioare — cadrul autorizației de construire; conținutul-cadru al DTAC este cel din **Anexa nr. 1**; documentele necesare emiterii A.C. sunt cele de la **art. 7**; dovada dreptului asupra imobilului — **art. 6 alin. (1)**. **Ordinul MDRAP nr. 839/2009** — Norme metodologice de aplicare.
- **Legea nr. 10/1995** privind calitatea în construcții, republicată — cele **6 cerințe fundamentale (art. 5)**: A (rezistență mecanică și stabilitate), B (securitate la incendiu), C (igienă, sănătate și mediu înconjurător), D (siguranță și accesibilitate în exploatare), E (protecție împotriva zgomotului), F (economie de energie și izolare termică); obligativitatea **verificării tehnice** a proiectelor de către verificatori atestați (**art. 13, art. 22**); **HG nr. 925/1995** — regulament de verificare și expertizare tehnică.
- **Legea nr. 350/2001** privind amenajarea teritoriului și urbanismul, cu modificările ulterioare — documentațiile de urbanism (PUG, PUZ, PUD) și avizul arhitectului-șef. **Art. 32** stabilește că, atunci când reglementările în vigoare (PUG/RLU) nu permit realizarea investiției (situație uzuală pentru CEF în extravilan pe teren arabil), este obligatorie **elaborarea și aprobarea unui PUZ**, precedat de aviz de oportunitate. **Ordinul MDRAP nr. 233/2016** aprobă normele metodologice și conținutul-cadru al documentațiilor PUZ.
- **HG nr. 907/2016** privind etapele de elaborare și conținutul-cadru al documentațiilor tehnico-economice (nota de fundamentare, S.F., D.A.L.I., P.Th., devizul general) — standard de conținut pentru fazele economice și tehnice, corelate cu DTAC.

### 6.1bis. Cele șase cerințe fundamentale (Legea nr. 10/1995) aplicate la CEF

Modul concret în care ansamblul răspunde celor șase cerințe fundamentale de calitate:

- **A — Rezistență mecanică și stabilitate:** structurile de susținere, piloții și posturile de transformare se verifică la SLU/SLS pentru combinațiile de greutate proprie, zăpadă, vânt (determinant) și seism (SR EN 1990/1991/1993/1997, P100-1); verificare de proiect pe specialitatea Af/A1.
- **B — Securitate la incendiu:** măsuri specifice riscului de arc DC — rapid shutdown, SPD, distanțe de siguranță, acces autospeciale, stingătoare la PT/invertoare; aviz/autorizație ISU (P118, HG nr. 571/2016).
- **C — Igienă, sănătate și mediu:** impact de mediu redus (fără emisii, fără ape uzate tehnologice), cuvă de retenție ulei, gestionarea deșeurilor și a DEEE la dezafectare; procedura de mediu (Legea nr. 292/2018).
- **D — Siguranță și accesibilitate în exploatare:** protecții electrice, legare la pământ, semnalizare de securitate, drumuri de mentenanță și intervenție, sistem de securitate; exploatare cu personal atestat.
- **E — Protecție împotriva zgomotului:** surse minore (invertoare, transformator), cu niveluri sub pragurile la limita de proprietate (STAS 10009); fără impact rezidențial la distanțele uzuale.
- **F — Economie de energie și izolare termică:** cerință cu aplicabilitate marginală (nu există clădiri încălzite semnificative, cu excepția eventualei clădiri de pază); relevantă prin randamentul energetic al echipamentelor (invertoare, transformatoare eco-proiectate).

### 6.2. Legislație energetică, promovare RES și racordare

- **Legea energiei electrice și a gazelor naturale nr. 123/2012**, cu modificările și completările ulterioare — cadrul de producere, transport, distribuție și furnizare; regimul de **autorizare de înființare** și de **licențiere a producerii** de către ANRE (pentru capacități > 1 MW este necesară autorizația de înființare, iar la punerea în funcțiune licența de exploatare comercială); obligația de racordare la SEN a operatorilor de rețea.
- **Legea nr. 220/2008** pentru stabilirea sistemului de promovare a producerii energiei din surse regenerabile de energie, republicată, cu modificările ulterioare — schema **certificatelor verzi**, cu eligibilitatea explicită a energiei solare fotovoltaice; stabilește criteriile de acreditare a producătorilor de E-SRE de către ANRE.
- **Legea nr. 101/2023** privind aprobarea și implementarea mecanismului de **Contracte pentru Diferență (CfD)** ca instrument de sprijin pentru investițiile în capacități de producere din surse cu emisii reduse — preț de exercitare (strike price) atribuit prin licitații competitive organizate de ANRE, pe durate tipice de 15 ani.
- **Ordinul ANRE nr. 59/2013** pentru aprobarea Regulamentului privind racordarea utilizatorilor la rețelele electrice de interes public, cu modificările ulterioare — procedura ATR (cerere de racordare, fișă/studiu de soluție, aviz tehnic de racordare, contract de racordare, certificat de racordare).
- **Ordinul ANRE nr. 11/2023** privind tariful de racordare / metodologia de stabilire a tarifelor de racordare la rețelele electrice — fundamentează componenta de cost a racordului în CAPEX.
- **Codul Tehnic al Rețelei Electrice de Distribuție (RED)** și **Codul Tehnic al RET** (aprobate prin ordine ANRE) — cerințe de conectare, calitatea energiei, telemăsură/SCADA, protecții și reglaje.
- **Regulamentul (UE) 2016/631 (RfG — Requirements for Generators)** — cerințe armonizate de racordare a modulelor de generare; clasificarea pe tipuri A/B/C/D după puterea maximă și tensiunea la punctul de conectare (se stabilește pentru P_AC a proiectului concret).
- **NTE 401/2003** — Normă tehnică privind stabilirea distanțelor și zonelor de protecție și de siguranță ale rețelelor electrice de interes public.
- **Ordinul ANRE nr. 116/2016** — atestarea operatorilor economici și autorizarea electricienilor care proiectează/execută instalații electrice. Normative de rețea/instalații de putere: **PE 116** (verificări și încercări), **PE 134** (dimensionare la scurtcircuit), **PE 155** (proiectare rețele MT), după caz.

### 6.3. Normative tehnice de instalații și construcții

- **Normativul I7/2011** — proiectarea, execuția și exploatarea instalațiilor electrice (dimensionare, protecții, prize de pământ, tablouri).
- **P100-1/2013** — Cod de proiectare seismică (a_g funcție de zona seismică; verificarea structurilor tehnologice și a containerelor/PT).
- **Eurocoduri:** **SR EN 1990** (baze), **SR EN 1991** (acțiuni — zăpadă -1-3, vânt -1-4), **SR EN 1993** (oțel, inclusiv -1-3 formate la rece), **SR EN 1997** (geotehnică — fundare piloți); **CR 1-1-3 / CR 1-1-4** (zăpadă/vânt, anexe naționale).

### 6.4. Standarde IEC/EN pentru componente fotovoltaice

- **IEC 61215** — module cristaline: calificare de proiectare și omologare de tip.
- **IEC 61730-1/-2** — siguranța modulelor FV.
- **IEC 62446-1** — documentație, PIF, inspecție și încercări ale sistemelor FV racordate la rețea (raport PIF, teste string).
- **IEC 62548** — cerințe de proiectare a instalațiilor FV (partea DC).
- **SR HD 60364-7-712** — instalații electrice de joasă tensiune: sisteme de alimentare FV solare.
- **IEC 62109-1/-2** — siguranța invertoarelor.
- **EN 50618** — cabluri solare DC.
- **IEC 61643** — SPD.
- **SR EN / IEC 62305-1…-4** — protecția împotriva trăsnetului.
- **IEC 61140** — protecția împotriva șocurilor electrice.
- **SR EN 50583** — sisteme fotovoltaice în clădiri (BIPV — după caz).
- **EN ISO 1461** — galvanizare la cald (structuri).

### 6.5. Mediu, evaluare de impact și arii protejate

- **OUG nr. 195/2005** privind protecția mediului, aprobată prin Legea nr. 265/2006, cu modificările ulterioare — cadrul general.
- **Legea nr. 292/2018** privind evaluarea impactului anumitor proiecte publice și private asupra mediului (transpune Directiva EIA 2011/92/UE, mod. 2014/52/UE) — parcurgerea procedurii de evaluare: notificare → **etapa de încadrare (screening)** → dacă e cazul, definirea domeniului evaluării (scoping) → **Raportul privind Impactul asupra Mediului (RIM)** → consultarea publicului → analiza în Comisia de Analiză Tehnică (CAT) → **Acordul de Mediu**.
- **HG nr. 445/2009 privind evaluarea impactului anumitor proiecte publice și private asupra mediului, modificată prin HG nr. 22/2017** — încadrează **parcurile solare/fotovoltaice** în categoria de proiecte supuse deciziei etapei de încadrare: „instalații industriale destinate producerii de energie electrică" figurează în **Anexa nr. 2, pct. 3 lit. a)**, ceea ce înseamnă că proiectul intră la **screening** (nu automat la EIA completă); decizia (cu sau fără evaluare de impact) se ia de APM funcție de caracteristicile amplasamentului.
- **HG nr. 1076/2004** privind stabilirea procedurii de realizare a evaluării de mediu pentru planuri și programe (**SEA** — transpune Directiva 2001/42/CE) — se aplică documentației **PUZ** (aviz de mediu pentru plan).
- **OUG nr. 57/2007** privind regimul ariilor naturale protejate (aprobată prin Legea nr. 49/2011), cu modificările ulterioare — dacă amplasamentul este în/adiacent unui **sit Natura 2000**, este necesară **evaluarea adecvată** (studiu de evaluare adecvată — EA) și avizul custodelui/APM.

### 6.6. Fond funciar și scoaterea din circuitul agricol

- **Legea fondului funciar nr. 18/1991**, republicată — **art. 92** reglementează aprobarea scoaterii definitive/temporare din circuitul agricol a terenurilor situate în extravilan, cu plata taxelor și pe baza documentației specifice.
- **Legea nr. 17/2014** privind unele măsuri de reglementare a vânzării terenurilor agricole situate în extravilan — condiții de utilizare/tranzacționare a terenurilor agricole extravilane.
- **HG nr. 1132/2008** (și actele conexe de stabilire a taxelor) — cuantumul **taxei de scoatere din circuitul agricol**, diferențiat pe **clasele de calitate I–V** ale terenului (taxă maximă pentru clasa I fertilă, minimă pentru clasa V), determinate prin **studiu pedologic (OSPA)**; scoaterea temporară (preferată pentru CEF reversibile) se bucură de un regim și de o taxă mai favorabile decât scoaterea definitivă.
- **Legea nr. 46/2008 — Codul Silvic**, cu modificările ulterioare — impune, ca regulă de bună practică și de servitute, **distanța minimă de cca. 50 m față de limita fondului forestier** (pentru protecția pădurii și evitarea umbririi/incendiilor), verificată la stabilirea layoutului.
- Studiul pedologic și avizul **ANIF** (Agenția Națională de Îmbunătățiri Funciare) sunt necesare când terenul este cuprins în amenajări de îmbunătățiri funciare (irigații, desecare).

### 6.7. Deșeuri, DEEE și sfârșitul de viață al panourilor

- **Legea nr. 211/2011** privind regimul deșeurilor, republicată, cu modificările ulterioare — ierarhia deșeurilor (prevenire → pregătire pentru reutilizare → reciclare → alte valorificări → eliminare) și obligațiile de gestionare, aplicabile atât deșeurilor de șantier, cât și echipamentelor la dezafectare.
- **Directiva 2012/19/UE (DEEE)** privind deșeurile de echipamente electrice și electronice — panourile fotovoltaice sunt încadrate explicit ca **DEEE**; directiva este transpusă în dreptul intern prin **OUG nr. 5/2015** privind DEEE (și actele subsecvente). Ținta de **valorificare/reciclare a materialelor este ≥ 80–85%** din masa echipamentului.
- **HG nr. 1037/2010** privind deșeurile de echipamente electrice și electronice (reglementare privind colectarea, tratarea și reciclarea DEEE) — cadru operațional pentru **reciclarea modulelor** la sfârșit de viață, prin operatori autorizați și scheme de responsabilitate extinsă a producătorului (EPR/OIREP), inclusiv sisteme colective dedicate FV de tip **PV CYCLE**.
- **HG nr. 520/2016** privind cerințele minime de securitate și sănătate referitoare la expunerea lucrătorilor la riscurile generate de **câmpuri electromagnetice** — relevantă pentru personalul de exploatare/mentenanță în vecinătatea PT, celulelor MT și invertoarelor.

### 6.8. Securitate, muncă și incendiu

- **Legea nr. 319/2006** a securității și sănătății în muncă + **HG nr. 1425/2006** (norme metodologice); **HG nr. 300/2006** privind șantierele temporare/mobile (coordonator SSM, plan de securitate și sănătate).
- **Legea nr. 307/2006** privind apărarea împotriva incendiilor + **Normativ P118-1/-2/-3**, **HG nr. 571/2016** (categorii de construcții/amenajări supuse avizării/autorizării ISU), **Ordinul MAI nr. 129/2016** (norme metodologice de avizare/autorizare) — câmp FV cu risc specific de arc electric DC: acces pentru autospeciale, stingătoare CO₂/pulbere la PT/invertoare, semnalizare de rapid shutdown, plan de intervenție.
- **Legea nr. 333/2003** privind paza obiectivelor + **HG nr. 301/2012** (norme) — plan de pază, sistem tehnic de securitate avizat (CCTV + antiefracție).

---

## 6bis. FLUX DE AVIZE ȘI AUTORIZAȚII

Autorizarea unei CEF parcurge, în paralel și în serie, trei filiere procedurale — **urbanism/construcții**, **energie** și **mediu/fond funciar** — a căror finalizare condiționează emiterea Autorizației de Construire și, ulterior, punerea în funcțiune. Fluxul este identic ca structură pentru orice putere; la puteri mari cresc doar complexitatea studiilor (EIA completă, racord la tensiune superioară) și pragurile de licențiere.

### 6bis.1. Etapele principale ale fluxului

1. **Certificat de Urbanism (CU) pentru construire** — emis de Primărie/Consiliul Județean; stabilește regimul juridic/economic/tehnic și lista de avize.
2. **PUZ „Parc Fotovoltaic"** — dacă PUG/RLU nu permite funcțiunea (Legea nr. 350/2001, art. 32); avizat de: Consiliul Județean, APM (aviz de mediu SEA), DSP, ISU, ANIF, ANAR, Direcția Agricolă, Direcția de Cultură (patrimoniu/arheologie), CFR, CNAIR, operatori de rețele electrice/gaz, după caz; aprobat prin HCL.
3. **Studiu de Soluție + ATR** — de la operatorul de distribuție (procedura Ord. ANRE nr. 59/2013); fixează punctul, soluția și capacitatea de racordare.
4. **Scoaterea din circuitul agricol** — pe baza **studiului pedologic (OSPA)**, cu plata **taxei** (HG nr. 1132/2008, diferențiată pe clasele I–V, Legea nr. 18/1991 art. 92) și **avizul ANIF** dacă terenul e în amenajări funciare.
5. **Procedura de mediu (EIA)** — notificare → screening → (eventual) scoping → **RIM** → **consultare publică (min. 45 zile)** → CAT → **Acord de Mediu**; **Evaluare Adecvată** (OUG nr. 57/2007) dacă e în/lângă Natura 2000.
6. **Avize de utilități și servituți** — operatori electrici (Transelectrica/OD), ANAR (gospodărirea apelor, bandă de protecție cca. 5 m mal), DSP, ISU, ANIF, MApN/SRI/STS (servituți militare), AACR (servituți aeronautice), CFR (zonă de protecție cca. 100 m față de calea ferată), CNAIR/administrator drum (zonă de protecție cca. 22 m față de axul drumului național), Transgaz (zonă de protecție cca. 20 m față de conducte de gaz), Direcția de Cultură (descărcare de sarcină arheologică).
7. **Autorizația de înființare ANRE** — pentru capacități > 1 MW (Legea nr. 123/2012).
8. **Autorizația de Construire** — în baza DTAC (obiectul prezentului memoriu).
9. **Execuție → PIF cu DSO → recepție → Licența de producere ANRE**.

### 6bis.2. Tabel sinoptic — avize, emitenți, temei legal, termen

| Aviz / Autorizație | Emitent | Temei legal | Termen orientativ |
|---|---|---|---|
| Certificat de Urbanism (construire) | Primărie / Consiliul Județean | Legea nr. 50/1991 (art. 6), Legea nr. 350/2001 | 15–30 zile |
| Aviz de oportunitate + PUZ | Arhitect-șef / Consiliul Județean / CL | Legea nr. 350/2001 (art. 32), Ord. MDRAP nr. 233/2016 | 6–12 luni |
| Aviz de mediu pentru PUZ (SEA) | APM | HG nr. 1076/2004 | 2–4 luni |
| Studiu de Soluție + ATR | Operator de Distribuție (DSO) | Ord. ANRE nr. 59/2013 | 30–90 zile |
| Tarif de racordare | ANRE / DSO | Ord. ANRE nr. 11/2023 | odată cu ATR |
| Studiu pedologic (OSPA) | OSPA județean | Legea nr. 18/1991, HG nr. 1132/2008 | 30–60 zile |
| Scoatere din circuitul agricol | Direcția Agricolă / MADR | Legea nr. 18/1991 (art. 92), Legea nr. 17/2014 | 30–90 zile |
| Aviz ANIF | ANIF | Legea nr. 18/1991, legislația IF | 30 zile |
| Decizie etapă de încadrare (screening EIA) | APM | Legea nr. 292/2018, HG nr. 445/2009 mod. HG nr. 22/2017 (Anexa 2 pct. 3a) | 30–60 zile |
| Acord de Mediu (dacă RIM) | APM | Legea nr. 292/2018 | 3–6 luni (cu 45 zile consultare) |
| Evaluare adecvată (Natura 2000) | APM / custode | OUG nr. 57/2007 (Legea nr. 49/2011) | funcție de caz |
| Aviz gospodărirea apelor | ANAR / ABA | Legea apelor nr. 107/1996 | 30–60 zile |
| Aviz DSP | Direcția de Sănătate Publică | Legea nr. 95/2006, Ord. MS | 30 zile |
| Aviz/Autorizație ISU | Inspectoratul pentru Situații de Urgență | Legea nr. 307/2006, HG nr. 571/2016, Ord. MAI nr. 129/2016 | 30–60 zile |
| Aviz MApN / SRI / STS | instituții de apărare/securitate | reglementări servituți | 30–60 zile |
| Aviz AACR (aeronautic) | Autoritatea Aeronautică Civilă Română | reglementări servituți aeronautice | 30–60 zile |
| Aviz CFR | CFR / operator feroviar | zonă de protecție cca. 100 m | 30–60 zile |
| Aviz CNAIR / administrator drum | CNAIR / CJ / Primărie | zonă de protecție cca. 22 m ax drum național | 30 zile |
| Aviz Transgaz | Transgaz | zonă de protecție cca. 20 m conducte gaz | 30 zile |
| Aviz Direcția de Cultură (arheologie) | Direcția Județeană pentru Cultură | Legea nr. 422/2001 (patrimoniu) | 30 zile |
| Autorizație de înființare | ANRE | Legea nr. 123/2012 | 30–60 zile |
| **Autorizație de Construire** | **Primărie / Consiliul Județean** | **Legea nr. 50/1991 (art. 7)** | **30 zile** |
| Licență de producere | ANRE | Legea nr. 123/2012 | după PIF |

*Termenele sunt orientative (termene legale maxime sau uzuale); durata reală depinde de completitudinea documentației și de complexitatea amplasamentului. Tabelul rămâne valabil pentru orice putere; unele avize (ex. EIA completă, autorizație de înființare) devin obligatorii doar peste anumite praguri.*

### 6bis.3. Finanțare și mecanisme de sprijin

Structura de finanțare nu modifică soluția tehnică din DTAC, dar condiționează bancabilitatea și, uneori, dimensionarea. Instrumente disponibile:

- **Certificate verzi** (Legea nr. 220/2008) — schema de sprijin pentru E-SRE, cu eligibilitatea energiei solare.
- **CfD — Contracte pentru Diferență** (Legea nr. 101/2023) — preț de exercitare (strike price) atribuit prin **licitații competitive organizate de ANRE**, pe **15 ani**, care transferă riscul de preț și îmbunătățește bancabilitatea.
- **Granturi și instrumente publice:** **PNRR — Componenta C6 Energie**, **Programul Operațional Creștere Durabilă / POCIDIF**, **Fondul pentru Modernizare**, cofinanțare **BEI** (Banca Europeană de Investiții).
- **Contracte PPA** pe termen lung (10–15 ani) cu cumpărători corporativi/furnizori.
- **Cerințe ale finanțatorilor:** raport de **producție energetică estimată (Energy Yield Assessment — EYA)** cu valori **P50/P90**, **Technical Due Diligence (TDD)** independent, contracte O&M cu garanții de disponibilitate/performanță și pachet de **asigurări** (all-risks construcție + operare, întreruperea activității).

---

## 7. INDICATORI TEHNICO-ECONOMICI SINTETICI (PARAMETRIC)

> Valorile sunt orientative, la nivel de referință DTAC, și se corelează/detaliază în **Studiul de Fezabilitate (S.F.)** cu **Devizul General** (HG nr. 907/2016). Nu dublează analiza economică din S.F., ci o rezumă. Toate mărimile se exprimă **specific pe unitate de putere (EUR/kWp, EUR/MWp)** ca să scaleze la orice P_DC.

### 7.1. CAPEX — cost specific și formulă de scalare

Cost specific de referință pentru CEF „utility-scale" mese fixe în RO: **≈ 550–700 EUR/kWp DC** (fără TVA, „turnkey EPC", exclusiv racordul lung și terenul).

**CAPEX ≈ P_DC[kWp] × c_spec[EUR/kWp]**.  *Exemplu 2 MWp la 620 EUR/kWp:* CAPEX ≈ 2.000 × 620 = **1.240.000 EUR** (domeniu 1,1–1,4 mil.).

| Componentă CAPEX | Pondere tipică | Valoare (exemplu 2 MWp, EUR) |
|---|---|---|
| Module FV | 35–42% | ~490.000 |
| Invertoare | 8–12% | ~130.000 |
| Structuri + piloți | 12–16% | ~180.000 |
| Cabluri DC/AC + tablouri + BOS | 8–12% | ~130.000 |
| PT + celule MT | 6–9% | ~95.000 |
| Racord MT (LES 20 kV) + ATR | variabil | ~90.000 |
| Drumuri, platforme, gard, terasamente | 5–8% | ~85.000 |
| SCADA, CCTV, antiefracție, priză, LPS | 3–5% | ~55.000 |
| Proiectare, avize, dirigenție, PIF | 4–6% | ~65.000 |
| Diverse și neprevăzute | ~5% | ~60.000 |
| **TOTAL (exemplu 2 MWp)** | **100%** | **≈ 1.240.000** |

La puteri mari, c_spec scade (economii de scară → 500–550 EUR/kWp la ≥ 10 MWp); la puteri mici crește (650–750 EUR/kWp sub 1 MWp).

### 7.2. OPEX

OPEX anual specific: **≈ 10.000–14.000 EUR/MWp·an** (O&M, SCADA, curățare, vegetație, pază, asigurări, taxe, măsură).  
**OPEX ≈ P_DC[MWp] × 12.000 EUR/MWp·an.**  *Exemplu 2 MWp:* ≈ **24.000–28.000 EUR/an**.

### 7.3. LCOE

**LCOE = (CAPEX + Σ OPEX_actualizat) / Σ E_actualizat** (actualizare la rata de discount r).

*Exemplu 2 MWp, T = 25 ani (fără actualizare, pentru ordin de mărime):*  
Cost total ≈ 1.240.000 + 25 × 25.000 = **1.865.000 EUR**; energie totală ≈ 55.885 MWh → LCOE_neactualizat ≈ **33,4 EUR/MWh**.  
Cu actualizare (WACC 6–8%) și degradare: **LCOE ≈ 45–55 EUR/MWh** — competitiv cu prețul angro mediu multianual (PZU), susține bancabilitatea (PPA/CfD). Fiind cost specific, LCOE este cvasi-independent de scară (variază ușor prin c_spec).

### 7.4. Indicatori de eficiență (exemplu 2 MWp, detaliați în S.F.)

| Indicator | Formulă | Valoare (2 MWp) |
|---|---|---|
| Investiție specifică | c_spec | ~620 EUR/kWp |
| Producție an 1 | P_DC × PSH × PR | 2.378 MWh |
| Venit brut an 1 (la ~70 EUR/MWh) | E × p | ~166.000 EUR |
| OPEX anual | P_DC × 12.000 EUR/MWp | ~25.000 EUR |
| EBITDA an 1 | venit − OPEX | ~141.000 EUR |
| Payback simplu | CAPEX / EBITDA | ~8–10 ani |
| Durată de viață | — | 25–30 ani |
| LCOE | — | 45–55 EUR/MWh |

### 7.5. Analiză de senzitivitate și indicatori de rentabilitate

Indicatorii de fezabilitate se detaliază în Studiul de Fezabilitate, dar memoriul semnalează sensibilitatea rezultatului la principalele variabile:

| Variabilă | Variație | Efect asupra rezultatului |
|---|---|---|
| Prețul de vânzare a energiei | ±10 EUR/MWh | efect major și direct asupra veniturilor și payback (cel mai sensibil parametru) |
| PSH_POA (resursa solară) | ±5% | ±5% asupra energiei și veniturilor |
| PR | ±0,02 | ±2,4% asupra energiei |
| CAPEX specific | ±10% | ±10% asupra investiției și payback |
| Rata de discount (WACC) | ±1 pp | efect semnificativ asupra VAN și LCOE |
| Degradarea anuală | ±0,1 pp/an | efect cumulativ pe durata de viață |

Indicatorii de rentabilitate uzuali calculați în S.F.: **Valoarea Actualizată Netă (VAN/NPV)**, **Rata Internă de Rentabilitate (RIR/IRR)**, **raportul de acoperire a serviciului datoriei (DSCR)** pentru finanțarea prin credit, și **payback actualizat**. Pentru un proiect cu PPA/CfD pe 15 ani, RIR pe capital propriu (equity IRR) tipic se situează în intervalul 8–12%, iar DSCR minim ≥ 1,2–1,3 — praguri care fundamentează bancabilitatea. Toate mărimile fiind exprimate specific pe MWp, concluziile de rentabilitate scalează la puterea proiectului, cu ajustarea CAPEX/kWp pentru economiile de scară.

---

## 8. IMPACTUL ASUPRA MEDIULUI (SINTETIC)

### 8.1. Emisii de CO₂ evitate — formulă

**CO₂_evitat = E_anual × f_emisie_SEN**, cu f_emisie ≈ **0,30 tCO₂/MWh** (mixul SEN; domeniu 0,25–0,35 tCO₂/MWh funcție de anul de referință și metodologie).

- *Exemplu 2 MWp:* CO₂ evitat = 2.378 × 0,30 ≈ **713 tCO₂/an**; pe 25 ani ≈ 55.885 × 0,30 ≈ **16.766 tCO₂**.
- Scalare: la 10 MWp → ~3.567 tCO₂/an; la 50 MWp → ~17.835 tCO₂/an (proporțional cu E).
- Echivalent (exemplu 2 MWp): absorbția a ~28.000–35.000 arbori maturi/an sau evitarea emisiilor a ~150 autoturisme/an.

### 8.2. Sol, apă, biodiversitate

- **Sol:** ocupare reversibilă, fără impermeabilizare pe câmp; piloți metalici extractibili; risc de eroziune redus prin covor vegetal.
- **Apă:** fără consum tehnologic semnificativ (curățare uscată/apă demineralizată în volume mici); ape pluviale infiltrate natural; cuvă de retenție ulei la transformator.
- **Biodiversitate:** amplasare pe teren agricol de valoare ecologică redusă (nu în Natura 2000 — a se confirma prin evaluarea de mediu); spații libere la baza gardului pentru fauna mică; vegetație între rânduri = **habitat de pajiște** (efect pozitiv pe polenizatori și fauna de câmp — „solar meadow / agri-PV"), fără erbicide agresive.
- **Zgomot:** surse minore (ventilatoare invertoare/trafo), sub praguri la limita de proprietate (STAS 10009); glare redus prin sticlă antireflex.

### 8.2bis. Timpul de recuperare energetică și amprenta de carbon pe ciclul de viață

Dincolo de CO₂ evitat în exploatare, o CEF are un impact climatic net pozitiv și pe ciclul de viață complet (LCA):

- **Timpul de recuperare a energiei (EPBT — Energy Payback Time):** energia consumată pentru fabricarea, transportul, instalarea și dezafectarea instalației se recuperează, prin producția proprie, în cca. **1–2 ani** la latitudinile României — o fracțiune mică din durata de viață de 25–30 ani.
- **Amprenta de carbon pe ciclul de viață** a energiei FV este de ordinul **20–40 gCO₂/kWh**, de ~10–25 de ori mai mică decât a energiei pe gaz (~400–500 gCO₂/kWh) sau cărbune (~800–1000 gCO₂/kWh); pe durata de viață, emisiile evitate depășesc cu mult emisiile încorporate.
- Raportat la exemplul de 2 MWp, chiar dacă emisiile încorporate ar fi de ordinul câtorva sute de tone CO₂, ele sunt „amortizate" din punct de vedere climatic în primul an de funcționare, prin cele ~713 tCO₂ evitate anual.

### 8.3. Decomisionare și readucerea terenului la starea inițială

Ciclul de viață proiectat este de **25–30 de ani**, la finalul căruia obiectivul se dezafectează conform unui **plan de dezafectare** prevăzut încă din faza de mediu (parte a documentației EIA) și garantat financiar. Etapele dezafectării:

1. **Deconectarea și demontarea instalației electrice** (invertoare, tablouri, cabluri, celule MT) — cu recuperarea metalelor (cupru, aluminiu) și a echipamentelor reutilizabile.
2. **Demontarea modulelor** și predarea lor în circuitul **DEEE** — reciclare/valorificare **≥ 80–85% din masă** (sticlă, aluminiu, siliciu, argint, cupru), prin operatori autorizați și scheme de tip **PV CYCLE**, în temeiul Directivei 2012/19/UE, OUG nr. 5/2015, HG nr. 1037/2010 și Legii nr. 211/2011.
3. **Demontarea structurilor de susținere** (oțel zincat — reciclabil integral ca fier vechi) și **extragerea piloților** din sol.
4. **Dezafectarea posturilor de transformare și a racordului** (LES 20 kV), cu tratarea uleiului de transformator ca deșeu periculos, dacă e cazul.
5. **Decopertarea platformelor și drumurilor** balastate și **readucerea terenului la categoria de folosință agricolă** anterioară (afânare, refacerea stratului fertil, reînsămânțare).
6. **Obținerea autorizației de desființare** (Legea nr. 50/1991) și recepția lucrărilor de readucere la starea inițială.

**Garanția financiară de decomisionare** — fond de garantare, scrisoare de garanție bancară sau poliță — se constituie pentru a asigura acoperirea costului de dezafectare independent de situația economică a operatorului la finalul vieții. Ordinul de mărime al costului net de dezafectare este de **cca. 20.000–50.000 EUR/MWp** (din care se scade valoarea reziduală a materialelor reciclabile), echivalent cu ~3–5% din CAPEX. Reversibilitatea completă a ocupării terenului — trăsătură distinctivă a CEF pe piloți față de industria clasică pe fundații de beton — este argumentul de mediu central care justifică amplasarea temporară pe teren agricol.

---

## 9. ORGANIZAREA EXECUȚIEI, ETAPIZARE ȘI DURATA

### 9.1. Etapizarea execuției (durate care scalează cu puterea)

| Etapă | Activități | Durata orientativă (exemplu 2 MWp) |
|---|---|---|
| 0. Pregătire | AC, ATR, contract racordare, organizare șantier | post-autorizare |
| 1. Terasamente și drumuri | nivelări locale, drumuri, platforme PT/invertoare, șanțuri cabluri | 3–4 săptămâni |
| 2. Fundare structuri | batere/înșurubare piloți, teste pull-out | 3–4 săptămâni |
| 3. Montaj structuri | asamblare profile, pane | 3–4 săptămâni |
| 4. Montaj module | fixare + cablare stringuri DC, combiner | 4–6 săptămâni |
| 5. Instalații electrice | invertoare, TGJT, cabluri, PT, celule MT, LES | 4–6 săptămâni (paralel) |
| 6. Sisteme auxiliare | SCADA, CCTV, antiefracție, priză, LPS, iluminat | 2–3 săptămâni |
| 7. Testare și PIF | teste string (IEC 62446), probe, punere sub tensiune, PIF cu DSO, recepție | 2–4 săptămâni |
| **Durata totală** | | **≈ 4–6 luni** (crește la puteri mari) |

Duratele scalează cu puterea: un parc mic (< 1 MWp) se execută în 2–3 luni, unul de câteva MWp în 4–6 luni, iar parcurile mari (zeci de MWp) în 8–14 luni, adesea etapizat pe tronsoane cu punere sub tensiune parțială. Mare parte din activități se pot **suprapune (paralelism)**: baterea piloților poate începe pe primele tronsoane în timp ce se finalizează drumurile pe altele, iar montajul modulelor progresează în urma structurilor, cu instalația electrică urmând imediat.

### 9.2. Organizarea de șantier

- Zonă de organizare (birou, vestiare, depozit securizat pentru module și invertoare — componente cu valoare mare și risc de furt), împrejmuire provizorie, semnalizare rutieră, punct PSI și prim-ajutor, platformă de spălare a roților la ieșirea din șantier.
- Execuție cu **operatori atestați ANRE** pentru partea electrică (Ord. nr. 116/2016), **dirigenție de șantier** asigurată de diriginte atestat MDLPA pe domeniile relevante (construcții civile/industriale, instalații electrice), **verificator de proiect** la faze determinante și **coordonator SSM** conform HG nr. 300/2006, cu plan propriu de securitate și sănătate.
- **Faze determinante** și program de control al calității (PCCVI) agreat cu Inspectoratul de Stat în Construcții (ISC): recepția piloților (teste de smulgere), verificarea montajului structurilor, verificarea prizei de pământ (PRAM), probele electrice DC/AC (teste de string conform IEC 62446).
- Management deșeuri de șantier conform Legii nr. 211/2011 (colectare selectivă a ambalajelor, metalelor, deșeurilor de cablu; evacuare la operatori autorizați; evidența deșeurilor).
- **Impact temporar de șantier** (praf, zgomot, trafic greu pentru transportul modulelor și PT) — atenuat prin măsuri uzuale (stropire, program de lucru, trasee agreate cu administratorul drumului); reversibil integral la finalizare.

### 9.3. Exploatare și mentenanță (O&M)

- **Regim de funcționare:** **nesupravegheat permanent** (fără personal rezident), cu monitorizare SCADA 24/7 de la un dispecerat de producție; intervenția pe teren se face de echipe mobile la alarmă sau conform planului de mentenanță.
- **Mentenanță preventivă programată:** inspecții vizuale și **termografice (cu dronă cu cameră IR)** pentru detectarea hot-spot-urilor și a stringurilor defecte (IEC 62446-3); verificarea și strângerea conexiunilor DC/AC; curățarea modulelor (funcție de gradul de soiling și de aportul natural al precipitațiilor); întreținerea vegetației prin cosire mecanică sau **pășunat controlat** (ovine — soluție agri-solară care reduce costul și emisiile); verificări **PRAM periodice** ale prizei de pământ și ale protecțiilor conform I7/2011; verificarea uleiului și a protecțiilor transformatorului; testarea sistemelor de securitate (CCTV, antiefracție) și PSI.
- **Mentenanță corectivă:** înlocuirea componentelor defecte (module cu degradare accelerată, invertoare, siguranțe), cu piese de schimb din stoc; invertoarele au durata de viață tipică 10–15 ani și pot necesita o înlocuire pe durata de viață a parcului (cost de replacement inclus în OPEX/CAPEX de reinvestiție).
- **Monitorizarea performanței:** urmărirea continuă a **PR efectiv** (din piranometru) și compararea cu PR garantat; orice abatere declanșează investigație (murdărire, umbrire nouă, defecte). Rapoarte de producție lunare/anuale către investitor și finanțator.
- **Contract O&M** cu furnizor specializat, cu **garanție de disponibilitate (≥ 98%)** și, uneori, **garanție de producție** (energy yield guarantee), cu penalități/bonusuri.

### 9.4. Etapizarea investiției în timp

Un investitor poate dezvolta parcul **în etape** (pe tronsoane), în funcție de capacitatea de racordare disponibilă și de finanțare, punând în funcțiune parțial și extinzând ulterior. Abordarea parametrică a prezentului memoriu susține direct această flexibilitate: fiecare tronson se dimensionează cu aceleași formule pentru puterea sa parțială, iar infrastructura comună (drum, PT, racord) se dimensionează la puterea finală proiectată.

### 9.5. Decomisionare (sfârșit de viață)

Conform 8.3: demontare, valorificare materiale (DEEE + fier vechi), extragere piloți, readucere teren la starea agricolă, cu garanție financiară de decomisionare și **autorizație de desființare** (Legea nr. 50/1991) la finalul ciclului de viață.

---

## 10. CONCLUZII

Investiția „Parc fotovoltaic P_DC [kWp]" (putere variabilă, stabilită de investitor) este **fundamentată tehnic, viabilă economic și favorabilă din punct de vedere al mediului**, respectând integral cadrul legal și normativ aplicabil (Legea nr. 50/1991, Legea nr. 10/1995, Legea nr. 123/2012, Legea nr. 220/2008, HG nr. 907/2016, Ord. ANRE de racordare, Codul Tehnic RED, Regulamentul RfG (UE) 2016/631, NTE 401/2003, Eurocodurile, I7/2011, standardele IEC 61215/61730/62446/62548/62109/62305, SR HD 60364-7-712, Legea nr. 211/2011 și regimul DEEE).

Fiind un **document parametric**, memoriul se aplică la orice putere: mărimile derivate se obțin din P_DC prin formulele din capitolele 4, 5 și 7 (N = P_DC/P_modul; P_AC = P_DC/ILR; S_PT ≈ P_AC; S_teren ≈ P_DC/ρ; E = P_DC×PSH×PR; CO₂ = E×f). Exemplul de calcul pentru P_DC = 2 MWp este ilustrativ și **nu constituie ipoteza fixă a proiectului**.

### 10.1. Componenta ANALITICĂ (date, cifre, formule, temei)

Soluția se dimensionează riguros prin formulele de scalare, fiecare valoare trasabilă la o formulă și la un temei normativ. *Exemplu 2 MWp:* 3.600 module × 555 Wp = 2.000 kWp DC; 129 stringuri × 28 module (V_oc < 1.500 V); P_AC = 1.600 kVA la ILR 1,25; E = 2.000 × 1.450 × 0,82 ≈ 2.378 MWh/an; yield 1.189 kWh/kWp·an; CF 13,6% (DC) / 17,0% (AC); GCR 0,37; densitate ≈ 890 kWp/ha.

### 10.2. Componenta GRAFICĂ (reprezentare pe amplasament)

DTAC cuprinde piesele desenate corelate cu memoriul: **plan de încadrare**, **plan de situație** (câmp FV, drumuri, PT, împrejmuire, LES racord, bilanț de suprafețe), **plan de amplasare mese și stringuri**, **scheme electrice monofilare DC/AC/MT**, **detalii de fundare piloți/structuri**, **plan priză de pământ și LPS**. Bilanțurile teritorial (cap. 5) și de energie (cap. 4) se regăsesc grafic în tabele și scheme.

### 10.3. Componenta PREDICTIVĂ (proiecție pe orizontul de viață)

Cu degradare 0,50%/an, producția scade prin E_k = E_1 × (1 − d)^(k−1). *Exemplu 2 MWp:* de la 2.378 MWh (an 1) la 2.109 MWh (an 25) — retenție 88,7%; cumulat ≈ 55.885 MWh la 25 ani / ≈ 66.394 MWh la 30 ani; CO₂ evitat ≈ 713 t/an (≈ 16.766 t/25 ani). LCOE actualizat 45–55 EUR/MWh și payback ~8–10 ani susțin bancabilitatea. La finalul vieții, terenul se readuce integral la starea agricolă (reversibilitate), cu valorificare DEEE (≥ 80–85%) și garanție financiară de decomisionare.

**În concluzie**, obiectivul răspunde direct țintelor PNIESC și RED III de creștere a ponderii surselor regenerabile, contribuie la securitatea și decarbonizarea aprovizionării cu energie, are impact de mediu pozitiv net și ocupare reversibilă a terenului, și se propune spre **autorizare** conform Legii nr. 50/1991, la scara de putere stabilită de investitor. Se solicită emiterea **Autorizației de Construire** pe baza prezentei documentații D.T.A.C.

---

*Prezentul memoriu tehnic general este parte integrantă a documentației D.T.A.C. și se completează cu memoriile tehnice de specialitate (arhitectură/amenajare, structură/rezistență, instalații electrice), cu piesele desenate, cu referatele verificatorilor de proiect atestați și cu avizele/acordurile solicitate prin Certificatul de Urbanism. Parametrii de proiect (P_DC și setul din §1.7) se completează pentru fiecare investiție; toate mărimile derivate se recalculează cu formulele indicate. Datele numerice au caracter de referință la faza DTAC și se detaliază/confirmă (inclusiv prin simulare PVsyst/PVGIS) la fazele P.Th. și D.E. și în Studiul de Fezabilitate.*
