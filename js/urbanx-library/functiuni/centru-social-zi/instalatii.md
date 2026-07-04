Voi redacta conținutul complet al memoriilor tehnice de instalații pentru un centru social de zi. Acesta este un task de redactare tehnică — livrez direct conținutul.

## MEMORII TEHNICE DE INSTALAȚII — CENTRU SOCIAL DE ZI

### Date generale de temă

Prezentele memorii tehnice se referă la instalațiile aferente unei clădiri civile publice cu funcțiunea de **Centru Social de Zi** (destinat asistenței sociale — persoane vârstnice și/sau persoane cu dizabilități, fără cazare de noapte), fază **DTAC/PTh**, clădire încadrată la categoria de importanță **C (normală)** conform HGR 766/1997 și clasa de importanță **II** conform P100-1/2013.

Clădirea are regim de înălțime **P+1E**, arie construită Ac ≈ 620 m², arie desfășurată Ad ≈ 1.180 m², înălțime la cornișă ≈ 8,50 m, capacitate proiectată **60 beneficiari/zi + 14 personal** (total 74 utilizatori simultan). Programul de funcționare: 08:00–18:00, 5 zile/săptămână.

Documentațiile s-au întocmit cu respectarea Legii nr. 10/1995 (republicată) privind calitatea în construcții și a HGR 907/2016 privind conținutul-cadru al documentațiilor tehnico-economice.

---

## A. INSTALAȚII TERMICE (IT)

### A.1. Baza de proiectare și normative

Instalațiile termice s-au proiectat conform:
- **Normativ I13/2015** — Normativ pentru proiectarea, execuția și exploatarea instalațiilor de încălzire centrală;
- **C107/2005** (părțile 1–5) — Normativ privind calculul termotehnic al elementelor de construcție ale clădirilor;
- **SR 1907-1:2014** — Instalații de încălzire. Necesarul de căldură de calcul;
- **SR 1907-2:2014** — Temperaturi interioare convenționale de calcul;
- **Legea 372/2005** (republicată) — privind performanța energetică a clădirilor;
- **Mc 001** — Metodologia de calcul al performanței energetice a clădirilor (aprobată prin Ordin MDRAP).

### A.2. Parametri climatici și interiori de calcul

Amplasament în **zona climatică III** (temperatura exterioară convențională de calcul **te = −18 °C**), zona eoliană IV.

**Tabel A.1 — Temperaturi interioare convenționale de calcul (SR 1907-2 / SR 1846)**

| Nr. | Încăpere | ti [°C] | Nr. schimburi aer [h⁻¹] |
|---|---|---|---|
| 1 | Săli de activități/socializare | +22 | 1,0 |
| 2 | Cabinet medical/asistență | +24 | 1,5 |
| 3 | Sală mese/servire | +20 | 1,5 |
| 4 | Bucătărie de distribuție | +18 | conf. debit HVAC |
| 5 | Birouri administrație | +20 | 1,0 |
| 6 | Vestiare personal | +22 | 1,5 |
| 7 | Grupuri sanitare | +20 | conf. debit HVAC |
| 8 | Holuri, circulații | +18 | 0,5 |
| 9 | Cameră de odihnă/repaus | +22 | 1,0 |
| 10 | Spații tehnice | +10 | 0,5 |

### A.3. Necesarul de căldură (bilanț termic)

Necesarul de căldură s-a determinat conform SR 1907-1, cu verificarea coeficienților de transfer termic U [W/m²K] la valorile normate de C107/2005 și Mc 001:

**Tabel A.2 — Rezistențe termice realizate vs. normate**

| Element de anvelopă | U realizat [W/m²K] | U max normat [W/m²K] | Verificare |
|---|---|---|---|
| Pereți exteriori (termosistem 15 cm EPS/vată) | 0,26 | 0,56 | Conform |
| Terasă/planșeu peste ultimul nivel (20 cm) | 0,18 | 0,32 | Conform |
| Planșeu peste subsol/pardoseală pe sol | 0,28 | 0,35 | Conform |
| Tâmplărie exterioară (geam tripan Low-E, Ar) | 1,10 | 1,30 | Conform |

Necesarul de căldură pe încăperi cuprinde pierderile prin transmisie (QT) și pierderile prin infiltrații/ventilare naturală (Qi), cu adaosuri pentru orientare și expunere.

**Necesar total de căldură pentru încălzire (bilanț sintetic):**
- Pierderi prin transmisie ΣQT ≈ **41,2 kW**
- Pierderi prin ventilare/infiltrații ΣQi ≈ **13,8 kW**
- **Necesar total instalat QÎ ≈ 55,0 kW** (rotunjit, cu adaos siguranță 5%)

Indice specific de putere termică: **55.000 W / 1.180 m² ≈ 46,6 W/m²** — valoare corespunzătoare unei clădiri civile bine izolate.

### A.4. Sursa de căldură

**Soluția adoptată — sistem hibrid pompă de căldură + centrală termică pe gaz (backup/vârf):**

**Varianta principală — pompă de căldură aer-apă:**
- 2 × pompe de căldură aer-apă, tip invertor, putere termică unitară **30 kW** la regim A7/W35 (total 60 kW), COP mediu sezonier SCOP ≥ **3,8**;
- regim de temperatură scăzută **45/40 °C** pe circuitul de încălzire, favorizând randamentul PC;
- rezervor tampon (puffer) **500 litri** pentru decuplarea hidraulică și reducerea numărului de porniri;
- funcționare cu robinet de amestec și pompe de circulație cu turație variabilă (clasă energetică EEI ≤ 0,20).

**Sursa de vârf/rezervă — centrală termică murală în condensație pe gaz natural:**
- 1 × cazan în condensație **60 kW**, randament sezonier **η ≥ 109%** (raportat la Pci), clasa NOx 6;
- funcționează la vârf de sarcină (te < −5 °C) și ca rezervă la avaria PC, asigurând redundanța sursei conform I13/2015;
- evacuare gaze arse tip **C** (etanș, coaxial Ø80/125), independent de aerul din încăpere.

Centrala termică este amplasată într-o încăpere tehnică dedicată, cu volum > 18 m³, ventilată natural (grile jos+sus), conform I13/2015 și NTPEE (dimensionare gaz — vezi cap. G).

### A.5. Distribuția agentului termic

- **Distribuție arborescentă bitub**, cu conducte de oțel/PP-R pretermoizolate, izolate cu cochilii de vată minerală/elastomer cu grosime conform I13/2015 (min. 30 mm la conductele de distribuție);
- distribuție orizontală pe fiecare nivel, prin plafon fals și șape, cu **distribuitor-colector** pe fiecare zonă termică;
- echilibrare hidraulică prin robinete de echilibrare statică (Ø15–Ø40) pe fiecare ramură;
- pante de golire și robinete de aerisire (aeroventile automate) în punctele înalte;
- vas de expansiune închis cu membrană **80 litri**, supapă de siguranță tarată la 3 bar.

### A.6. Corpuri de încălzire

Sistem mixt, adaptat funcțiunii sociale (siguranță termică — protecție anti-arsură pentru beneficiari vârstnici/cu dizabilități):

**Tabel A.3 — Corpuri de încălzire**

| Spațiu | Sistem | Caracteristici |
|---|---|---|
| Săli de activități, sală mese | Încălzire prin pardoseală radiantă | ti suprafață ≤ 29 °C, confort ridicat, fără risc arsură |
| Cabinet medical, birouri | Radiatoare din oțel cu panouri | putere 600–1.500 W/corp, capace de protecție |
| Grupuri sanitare | Radiatoare port-prosop + pardoseală | 400–800 W |
| Holuri, circulații | Pardoseală radiantă | temperatură moderată |
| Cameră tehnică | Fără corpuri (aport indirect) | — |

Reglaj termostatat pe fiecare distribuitor de pardoseală (cap termostatic pe circuit) și robinete termostatice pe radiatoare.

### A.7. Reglaj, automatizare și randament

- **Automatizare cu reglaj după curbă climatică** (senzor exterior), programator orar zi/noapte și pe zile de weekend (clădire cu program), cu funcție de reducere nocturnă a temperaturii (setback la +15 °C în afara programului);
- termostate de ambianță pe zone;
- prioritizare automată sursă PC vs. cazan (regulator de cascadă), pentru maximizarea utilizării energiei regenerabile;
- randament global de utilizare a energiei ridicat: PC ca sursă de bază (>85% din energia sezonieră) + condensație pe vârf;
- contorizare termică pentru monitorizarea consumului (integrare BMS — vezi cap. F).

---

## B. INSTALAȚII SANITARE (IS)

### B.1. Baza de proiectare și normative

- **Normativ I9/2015** — Normativ privind proiectarea, execuția și exploatarea instalațiilor sanitare;
- **SR 1846-1/2:2007** — Canalizări exterioare. Prescripții de proiectare (debite ape uzate și meteorice);
- **SR 1478** — Alimentarea cu apă la construcții civile și industriale;
- **STAS 1795** — Canalizări interioare;
- **OMS 119/2014** — Norme de igienă (dotare sanitară, apă potabilă);
- **NP 011** — clădiri civile (dotare grupuri sanitare).

### B.2. Alimentarea cu apă rece

Alimentarea se face din **rețeaua publică de apă** printr-un branșament Ø63 mm PEHD, cu cămin de branșament, contor de debit și clapetă antiretur (protecție anti-refulare conform I9). Presiunea de utilizare necesară ≈ 2,5–3,0 bar; dacă presiunea din rețea este insuficientă, se prevede **grup de pompare (hidrofor) cu convertizor de frecvență** și vas de hidrofor 100 litri.

**Necesarul de apă (consum specific pe beneficiari — OMS 119, SR 1478):**

Debitul de calcul s-a determinat pe baza sumei echivalenților de debit ai obiectelor sanitare (E), conform I9/2015.

**Tabel B.1 — Debite și consumuri specifice**

| Categorie utilizator | Nr. | Consum specific [l/pers·zi] | Consum [l/zi] |
|---|---|---|---|
| Beneficiari centru de zi | 60 | 50 | 3.000 |
| Personal | 14 | 30 | 420 |
| Bucătărie de distribuție (servire mese) | 74 mese | 15 l/masă | 1.110 |
| Întreținere/curățenie | — | forfetar | 300 |
| **Total necesar zilnic Qzi** | | | **≈ 4.830 l/zi (4,83 m³/zi)** |

- Debit maxim zilnic (Kzi = 1,3): **Qzi,max ≈ 6,28 m³/zi**
- Debit maxim orar (Ko = 2,0): **Qo,max ≈ 1,05 m³/h**
- Debit de calcul conductă de branșament (sumă echivalenți E ≈ 45): **qc ≈ 1,8 l/s**

### B.3. Distribuția apei reci și calde menajere

- **Distribuție arborescentă** din țeavă PP-R/PE-Xc, montată îngropat în șape și mascată în ghene/plafon fals, izolată termic (ACM și recirculare) și anticondens (ACR);
- coloane verticale în ghene tehnice cu robinete de secționare pe fiecare nivel/grup sanitar;
- protecție antiîngheț și izolare a conductelor pe traseele reci.

### B.4. Prepararea apei calde menajere (ACM)

**Soluția adoptată — preparare ACM combinată cu pompa de căldură + panouri solare termice:**
- **boiler bivalent 500 litri**, cu serpentină inferioară racordată la panourile solare și serpentină superioară la pompa de căldură/cazan;
- **captatoare solare termice** (4 × plane, ≈ 10 m²) montate pe terasă, orientate sud, înclinație ≈ 45°, cu grup de pompare solar și vas de expansiune 24 l;
- necesar ACM: 74 utilizatori × ≈ 15 l/pers·zi la 60 °C ≈ **1.100 l/zi**;
- **protecție antilegionella** (I9/2015, OMS 119): dezinfecție termică periodică cu ridicarea temperaturii boilerului la min. **60 °C**, șoc termic 70 °C săptămânal automat;
- **recirculare ACM** cu pompă și termostat, pentru asigurarea temperaturii la punctele de consum (max. 30 s până la apă caldă).

Baterii cu limitare de temperatură (anti-opărire, prag 43 °C) la lavoarele beneficiarilor — cerință esențială pentru grupul-țintă (vârstnici/dizabilități).

### B.5. Obiecte sanitare

Dotare conform OMS 119/2014 și NP 011, cu **grupuri sanitare accesibile pentru persoane cu dizabilități** (NP 051 — adaptarea clădirilor la nevoile persoanelor cu handicap):

**Tabel B.2 — Obiecte sanitare**

| Obiect | Buc. | Observații |
|---|---|---|
| Vase WC (rezervor 3/6 l economic) | 10 | din care 2 adaptate PMR |
| Lavoare | 12 | 2 adaptate PMR, baterii anti-opărire |
| Pisoare | 3 | grup sanitar bărbați |
| Dușuri (cu scaun rabatabil) | 3 | 1 adaptat PMR |
| Spălătoare bucătărie (inox 2 cuve) | 2 | apă caldă |
| Robinete curățenie + bazine de golire | 3 | pe niveluri |
| Bare de sprijin, alarmă apel WC PMR | set | vezi cap. F |

### B.6. Canalizarea menajeră

- Sistem separativ (menajer + pluvial distinct), conform SR 1846;
- **conducte PP/PVC-KG** pentru scurgere, cu pante conform I9 (Ø110 la 2%, Ø50 la 3%);
- **ventilare primară** a coloanelor prin conducte prelungite peste terasă (căciuli de ventilație) și ventilare secundară acolo unde e necesar (STAS 1795), pentru protecția gărzilor hidraulice ale sifoanelor;
- sifoane de pardoseală în grupuri sanitare, bucătărie, spații tehnice;
- **separator de grăsimi** pe canalizarea de la bucătăria de distribuție înainte de racord (I9/OMS);
- debit ape uzate menajere Quz ≈ 0,8 × Qzi ≈ **5,0 m³/zi**; debit de calcul de vârf ≈ **4,5 l/s**;
- racord la rețeaua publică de canalizare prin cămin de racord.

### B.7. Canalizarea pluvială

Determinată conform SR 1846-2, pentru zona ploilor cu intensitate **i = 130 l/s·ha** (durata 15 min, frecvența 1/1) — se adoptă valoarea locală conform hărții STAS 9470:

- suprafață receptoare (terasă) Sr ≈ 620 m² = 0,062 ha; coeficient scurgere φ = 1,0 (terasă);
- **debit pluvial de calcul Qp = φ · i · Sr = 1,0 × 130 × 0,062 ≈ 8,1 l/s**;
- receptoare de terasă (gaigere) cu parafrunzar, coloane pluviale interioare Ø110 mascate în ghene;
- descărcare la rețeaua pluvială/șanț/dren, eventual **bazin de retenție/infiltrare** dacă se impune prin avizul de gospodărire a apelor;
- se recomandă recuperarea parțială a apei pluviale pentru irigarea spațiilor verzi (rezervor îngropat).

---

## C. INSTALAȚII DE VENTILARE-CLIMATIZARE (HVAC)

### C.1. Baza de proiectare și normative

- **Normativ I5/2010** — Normativ pentru proiectarea, executarea și exploatarea instalațiilor de ventilare și climatizare;
- **OMS 119/2014** — rate minime de aer proaspăt/schimburi de aer pe destinații;
- **SR EN 16798-1** — parametri de confort interior;
- **C107/2005**, **Legea 372/2005**, **Mc 001** — corelare cu performanța energetică.

### C.2. Concepția sistemului

Ținând cont de programul de utilizare intensivă și de sensibilitatea grupului-țintă la calitatea aerului, s-a adoptat:
- **ventilare mecanică cu recuperare de căldură** (VMC) pentru spațiile principale, cu **centrală de tratare aer (CTA) cu recuperator cu plăci/rotor, randament de recuperare ε ≥ 75%**;
- ventilare mecanică prin evacuare pentru grupuri sanitare, bucătărie, spații tehnice;
- **climatizare** pentru confort de vară în spațiile ocupate (integrată în CTA — baterie de răcire pe apă rece de la pompa de căldură reversibilă, sau sistem VRF de completare).

### C.3. Debite de aer proaspăt (rate ventilare OMS 119)

Aportul de aer proaspăt s-a dimensionat pe baza ratei minime pe persoană și a schimburilor de aer pe destinație.

**Tabel C.1 — Debite de aer proaspăt pe spații**

| Spațiu | Persoane | Rată aer proaspăt | Debit introdus [m³/h] |
|---|---|---|---|
| Săli activități/socializare | 40 | 30 m³/h·pers | 1.200 |
| Sală de mese/servire | 30 | 30 m³/h·pers | 900 |
| Cabinet medical/asistență | 4 | 40 m³/h·pers (medical) | 160 |
| Birouri administrație | 6 | 30 m³/h·pers | 180 |
| Cameră odihnă/repaus | 8 | 30 m³/h·pers | 240 |
| Vestiare personal | — | 5 schimburi/h | 200 |
| **Total aer proaspăt introdus** | | | **≈ 2.880 m³/h** |

**Tabel C.2 — Debite de aer viciat evacuat (evacuare mecanică)**

| Spațiu | Rată evacuare | Debit evacuat [m³/h] |
|---|---|---|
| Grupuri sanitare (WC) | 25 m³/h·vas + 15 m³/h·pisoar | ≈ 350 |
| Dușuri | 15 schimburi/h local | ≈ 150 |
| Bucătărie distribuție | hotă + 10 schimburi/h | ≈ 600 |
| Spații depozitare/tehnice | 4 schimburi/h | ≈ 120 |
| **Total aer viciat evacuat** | | **≈ 1.220 m³/h** |

Echilibrul aeraulic asigură ușoară suprapresiune în spațiile "curate" (săli, cabinet) și depresiune în grupurile sanitare/bucătărie, împiedicând migrarea mirosurilor.

### C.4. Echipamente și tratarea aerului

- **CTA cu recuperator (ε ≥ 75%)**, debit nominal ≈ 3.000 m³/h, cu:
  - baterie de preîncălzire/încălzire (apă caldă de la sursa termică),
  - baterie de răcire/dezumidificare (apă rece 7/12 °C de la PC reversibilă),
  - filtre **ePM1 55% (F7)** pe aer proaspăt și ePM10 (M5) pe evacuare, conform SR EN ISO 16890,
  - ventilatoare EC cu turație variabilă (SFP conform I5, categoria de eficiență),
  - by-pass de recuperator pentru free-cooling nocturn de vară;
- **hotă de bucătărie** cu filtre de grăsimi și evacuare independentă peste acoperiș;
- **ventilatoare de evacuare** pentru grupuri sanitare, cu funcționare temporizată/la senzor de prezență;
- clapete de reglaj (VAV/CAV), tobe de atenuare fonică pe tubulatură (Lp ≤ 35 dB(A) în spațiile ocupate — cerință de confort acustic).

### C.5. Distribuția aerului

- **Tubulatură din tablă zincată** izolată termic și fonic, mascată în plafon fals;
- introducere aer prin **anemostate/grile cu reglaj**, evacuare prin grile de transfer și grile de evacuare;
- traversările de pereți/planșee cu rol de rezistență la foc se echipează cu **clapete antifoc (EI 60/EI 90)** acționate automat, integrate cu IDSI (vezi cap. E), conform I5 și P118-2.

### C.6. Climatizare de confort (vară)

- răcire prin bateria de răcire a CTA (aer primar tratat) completată, unde e nevoie de sarcină punctuală (cabinet, birouri sud), cu **unități VRF/split** clasa energetică ridicată (SEER ≥ 6,1);
- parametri de confort de vară: ti = **26 °C**, φ = 50%, viteza aerului ≤ 0,25 m/s în zona ocupată;
- reglaj cu termostate de zonă integrate în BMS.

---

## D. INSTALAȚII ELECTRICE (IE)

### D.1. Baza de proiectare și normative

- **Normativ I7/2011** — Normativ pentru proiectarea, execuția și exploatarea instalațiilor electrice aferente clădirilor;
- **NP 061/2002** — Normativ pentru proiectarea și executarea sistemelor de iluminat artificial din clădiri;
- **SR EN 12464-1** — Iluminatul locurilor de muncă în interior;
- **SR EN 62305** (părțile 1–4) — Protecția împotriva trăsnetului;
- **SR HD 60364** — Instalații electrice de joasă tensiune;
- **Legea 372/2005**, **Mc 001** — eficiență energetică iluminat.

### D.2. Alimentarea cu energie electrică. Bilanțul de puteri

Alimentarea din **rețeaua de distribuție 0,4 kV** printr-un branșament trifazat, bloc de măsură și protecție (BMPT) și tablou general de distribuție (TGD).

**Tabel D.1 — Bilanțul de puteri instalate**

| Consumator | Pi [kW] |
|---|---|
| Iluminat normal + siguranță | 12 |
| Prize de uz general | 25 |
| Pompe de căldură (2×) + climatizare | 22 |
| CTA + ventilatoare + pompe circulație | 9 |
| Grup pompare apă + boiler electric backup | 6 |
| Bucătărie de distribuție (echipamente) | 18 |
| Ascensor PMR + diverse | 8 |
| Curenți slabi, IDSI, echipamente IT | 4 |
| **Total putere instalată Pi** | **≈ 104 kW** |

- Coeficient de simultaneitate/utilizare global ks ≈ 0,55;
- **Putere absorbită (cerută) Pa ≈ 57 kW** (Sa ≈ 71 kVA la cosφ = 0,92 corectat cu baterie de condensatoare);
- se prevede **compensarea factorului de putere** (baterie automată de condensatoare) pentru cosφ ≥ 0,92.

### D.3. Tablouri și distribuție

- **Tablou general de distribuție (TGD)** cu întrerupător general automat, protecții diferențiale și de suprasarcină/scurtcircuit selectiv, descărcătoare de supratensiune (SPD tip 2, conform I7 și SR EN 62305);
- **tablouri secundare (TS)**: TS-parter, TS-etaj, TS-CT/tehnic, TS-bucătărie, TS-HVAC, TE (tablou consumatori de rezervă/vitali);
- distribuție prin **cabluri din cupru CYY-F/N2XH** (cabluri fără halogeni — N2XH/NHXH pe căile de evacuare și circuitele vitale, conform I7 și P118), pozate în jgheaburi metalice, tuburi de protecție și îngropat;
- selectivitatea protecțiilor asigurată amonte-aval; protecție diferențială **30 mA** pe toate circuitele de prize și băi (protecție la electrocutare, esențială în mediu social).

### D.4. Iluminat normal (NP 061 / SR EN 12464)

Corpuri de iluminat **LED**, eficacitate ≥ 120 lm/W, cu reglaj (dimming) și senzori de prezență/lumină naturală pe circulații și grupuri sanitare (eficiență energetică).

**Tabel D.2 — Niveluri de iluminare normate pe spații**

| Spațiu | Em [lux] | UGR max | Ra |
|---|---|---|---|
| Săli de activități/socializare | 300 | 19 | ≥ 80 |
| Cabinet medical/tratament | 500–1.000 (local) | 19 | ≥ 90 |
| Sală de mese | 200–300 | 22 | ≥ 80 |
| Birouri administrație | 500 | 19 | ≥ 80 |
| Bucătărie de distribuție | 500 | 22 | ≥ 80 |
| Holuri, circulații | 100–150 | 25 | ≥ 80 |
| Scări (nivel sporit — siguranță) | 150 | 25 | ≥ 80 |
| Grupuri sanitare | 200 | 25 | ≥ 80 |
| Depozite, tehnic | 100–200 | 25 | ≥ 60 |

Notă: pentru grupul-țintă (vârstnici) se aplică nivel de iluminare sporit (evitarea căderilor), contrast crescut și limitarea orbirii (UGR redus).

### D.5. Iluminat de siguranță și securitate

Conform I7/2011, NP 061 și P118-3, se prevăd (corpuri LED cu acumulator/kit invertor, autonomie min. 1–3 h):
- **iluminat de securitate pentru evacuare** — pe căile de evacuare, la min. 1 lux pe axul căii, marcarea ușilor de evacuare;
- **iluminat de securitate pentru marcarea hidranților și a echipamentelor PSI**;
- **iluminat de securitate anti-panică** în sălile aglomerate (≥ 0,5 lux);
- **iluminat de securitate pentru continuarea lucrului** în cabinetul medical;
- pictograme luminoase de ieșire (indicatoare EXIT) permanente/nepermanente.

### D.6. Instalația de prize și forță

- circuite de prize monofazate 16 A cu protecție diferențială 30 mA, prize duble/triple în funcție de spațiu;
- circuite trifazate pentru echipamentele de bucătărie, HVAC, pompe;
- prize dedicate cu marcaj pentru echipamentele IT/curenți slabi;
- prize la înălțime accesibilă în spațiile PMR.

### D.7. Instalația de legare la pământ și priza de pământ

- **priză de pământ artificială** din platbandă OL-Zn 40×4 mm și electrozi verticali, cu **rezistență de dispersie R ≤ 1 Ω** (priză comună protecție + paratrăsnet, conform I7 și SR EN 62305);
- **centură de egalizare a potențialelor** (bară principală de egalizare — BEP) la care se leagă: instalația electrică (PE), conductele metalice de apă/gaz/încălzire, structura metalică, jgheaburile de cabluri;
- egalizare suplimentară locală în băi/dușuri (zone cu risc).

### D.8. Protecția împotriva trăsnetului (IPT — SR EN 62305)

- evaluarea riscului conform SR EN 62305-2; având în vedere funcțiunea publică și afluența de persoane cu mobilitate/reacție reduse, s-a adoptat **nivel de protecție III (LPL III)**;
- **IPT tip retea de captare** (dispozitiv de captare pe terasă — tije + rețea de conductoare), **conductoare de coborâre** (min. 2, distribuite pe perimetru la interdistanță conform LPL III), **priză de pământ** comună R ≤ 1 Ω;
- SPD coordonate (tip 1 la intrare + tip 2 în tablouri) pentru protecția la supratensiuni.

### D.9. Alimentarea de rezervă

- **grup electrogen / UPS** pentru consumatorii vitali și de securitate la incendiu, conform I7 și P118:
  - **UPS** (autonomie 15–30 min) pentru IDSI, iluminat de securitate, servere/curenți slabi, apel asistență;
  - opțional **grup electrogen** pentru menținerea funcțiunilor esențiale (ascensor PMR pentru evacuare, pompe incendiu dacă e cazul) — pornire automată (AAR/comutator sursă) la căderea rețelei;
- consumatorii de securitate la incendiu sunt alimentați pe **cablu rezistent la foc** și pe cale distinctă (E90/PH conform P118-2).

---

## E. INSTALAȚII DE SECURITATE LA INCENDIU

### E.1. Baza de proiectare și normative

- **P118-1/2013** — Normativ de siguranță la foc a construcțiilor (încadrare, evacuare);
- **P118-2/2013** — Instalații de stingere a incendiilor (hidranți);
- **P118-3/2015** — Instalații de detectare, semnalizare și avertizare/alarmare (IDSI);
- **Legea 307/2006** privind apărarea împotriva incendiilor și normele metodologice.

Clădirea (P+1E, arie construită ≈ 620 m², public sensibil) impune dotarea cu instalații de securitate la incendiu conform scenariului de securitate la incendiu (întocmit separat). Nivelul de stabilitate/comportare la foc și gradul de rezistență la foc se stabilesc prin scenariu; ipoteza de proiectare: **grad II de rezistență la foc**.

### E.2. Hidranți interiori (P118-2)

Având în vedere aria și destinația (clădire de sănătate/asistență socială cu persoane cu mobilitate redusă), se prevede **instalație de hidranți de incendiu interiori**:

- hidranți interiori de perete **DN 25**, cu furtun semirigid, jet de min. lungimea necesară acoperirii fiecărui punct cu **2 jeturi simultane** (conform P118-2 pentru clădiri cu ocupanți greu evacuabili);
- debit specific pe hidrant interior **q = 2,1 l/s**, presiune la robinet min. 2,5 bar;
- **debit de calcul hidranți interiori: 2 jeturi × 2,1 l/s ≈ 4,2 l/s**;
- amplasare astfel încât orice punct din spațiile accesibile să fie atins; cutii de hidrant cu stingător portabil alăturat.

### E.3. Hidranți exteriori (P118-2)

- alimentare de la rețeaua publică cu hidranți exteriori supraterani **DN 80**, dispuși la max. 150 m față de clădire și accesibili pompierilor;
- **debit hidranți exteriori conform P118-2**: pentru volumul/destinația clădirii ≈ **10 l/s**, timp teoretic de funcționare 180 min → rezervă intangibilă de incendiu, asigurată din rețea publică sau **rezervor de incendiu propriu** dacă rețeaua nu asigură debitul/presiunea;
- dacă rezervorul propriu este necesar: **stație de pompare incendiu** (pompă activă + pompă de rezervă + pompă-pilot), conform P118-2, cu alimentare electrică de rezervă.

### E.4. Rezerva de apă și gospodăria de incendiu

- volumul rezervei de incendiu = debit hidranți interiori + exteriori × timpul teoretic de funcționare; dimensionare finală în funcție de disponibilul rețelei publice (aviz operator);
- estimativ: Vinc ≈ (4,2 + 10) l/s × timpii normați → **rezervor ≈ 110–160 m³** (dacă nu se poate conta pe rețea);
- rețea inelară de incendiu, robinete de secționare, racord la coloană uscată dacă e impus.

### E.5. Stingătoare și mijloace de primă intervenție

- stingătoare portabile cu pulbere **P6** și CO₂ **G5** (bucătărie, tablouri electrice), dimensionate la 1 stingător/300 m² și pe categorii de risc, marcate cu iluminat de securitate;
- pături antifoc la bucătărie.

### E.6. Detectare, semnalizare și alarmare (IDSI — P118-3)

Se prevede **instalație de detectare, semnalizare și alarmare la incendiu adresabilă**, acoperind integral clădirea:

- **centrală de detectare-semnalizare adresabilă** cu acumulatori de rezervă (autonomie 48 h veghe + 30 min alarmă), amplasată în spațiu supravegheat permanent (recepție/pază);
- **detectoare optice de fum adresabile** în toate spațiile (săli, birouri, holuri, circulații, camere tehnice), detectoare de temperatură în bucătărie, detectoare în tubulatura HVAC unde e cazul;
- **butoane manuale de semnalizare** (declanșatoare manuale) pe căile de evacuare, la ieșiri și pe paliere;
- **sirene de alarmare acustică + dispozitive optice (flash)** — esențial dat fiind grupul-țintă (persoane cu deficiențe de auz/văz), pentru alarmare acusto-optică conform P118-3;
- funcții de comandă automate la alarmă: oprire ventilare/închidere clapete antifoc, deblocare uși control acces (evacuare liberă), oprire selectivă alimentare, comandă desfumare (dacă e cazul), transmitere la dispecerat;
- cablaje rezistente la foc pe circuitele vitale (E30/E90).

### E.7. Desfumare și evacuare

- **desfumarea** caselor de scări și a circulațiilor comune conform P118-1/2 (natural — trape/ferestre cu acționare automată, sau mecanic, după caz);
- **iluminat de securitate pentru evacuare** (vezi cap. D.5) coordonat cu IDSI;
- ușile de pe traseele de evacuare cu deschidere în sensul evacuării, bare antipanică, deblocare automată a controlului de acces la alarmă.

---

## F. INSTALAȚII DE CURENȚI SLABI (I18)

### F.1. Baza de proiectare și normative

- **Normativ I18/1-2001** — Normativ pentru proiectarea și executarea instalațiilor electrice interioare de curenți slabi;
- **I18/2-2002** — Normativ pentru proiectarea și executarea instalațiilor de semnalizare a incendiilor și a sistemelor de alarmare contra efracției;
- standarde SR EN aferente (structured cabling SR EN 50173, CCTV, control acces).

### F.2. Rețea structurată voce-date (IT)

- **cablare structurată cat. 6/6A UTP/FTP**, prize duble RJ45 în birouri, cabinet, recepție, săli, cu rack de comunicații (dulap 19") echipat cu patch-panel, switch-uri, echipament rețea;
- legătură fibră optică/branșament internet, router, firewall;
- **rețea Wi-Fi** cu puncte de acces distribuite (acoperire integrală — inclusiv pentru beneficiari).

### F.3. Control acces

- **control acces pe uși** exterioare și pe zone sensibile (cabinet medical, arhivă, spații tehnice, farmacie/depozit medicamente), cu cititoare de proximitate/cartelă și, unde e cazul, videointerfon la intrarea principală;
- **integrare cu IDSI**: deblocare automată a tuturor ușilor de pe traseele de evacuare la alarmă de incendiu (cerință de securitate a persoanelor);
- gestiune centralizată a accesului și jurnalizare.

### F.4. Supraveghere video (CCTV)

- **sistem CCTV IP** cu camere la intrări, circulații comune, exterior/perimetru și zone cu risc (fără supraveghere în spații de intimitate — grupuri sanitare, cabinete de consultație — respectând GDPR și demnitatea beneficiarilor);
- înregistrator NVR cu stocare conform politicii de retenție, alimentare din UPS.

### F.5. Sistem de apel asistență / apel medical (specific centru social)

Instalație **esențială** pentru funcțiunea de asistență socială:
- **butoane de apel asistență** (nurse call) în grupurile sanitare adaptate PMR (buton + cordon de tragere accesibil de la nivelul pardoselii, pentru cazul căderii), camere de repaus, cabinet;
- **panou de semnalizare** la recepție/postul de asistență, cu identificarea încăperii care apelează, semnalizare acustică și optică;
- confirmare prezență personal și resetare locală;
- integrare opțională cu sistem de localizare/paging al personalului.

### F.6. Sistem de sonorizare / avertizare vocală

- **sistem de sonorizare cu funcție de avertizare vocală (voice alarm)** în spațiile comune, integrat cu IDSI pentru mesaje de evacuare clare (mai eficient decât sirenele pentru persoane dezorientate/vârstnice), conform P118-3.

### F.7. Sistem de detecție efracție (antiefracție)

- senzori de mișcare, contacte magnetice pe uși/ferestre exterioare, centrală antiefracție cu comunicator, armare pe timpul nefuncționării centrului.

### F.8. Management tehnic al clădirii (BMS)

- **sistem BMS** de automatizare și management pentru monitorizarea și comanda instalațiilor: sursă termică (PC/cazan), CTA/HVAC, iluminat pe zone, contorizare energie (electric, termic, apă, gaz), programe orare, alarme tehnice;
- interfață de vizualizare și raportare a consumurilor (suport pentru certificarea și monitorizarea performanței energetice);
- integrare cu IDSI (comenzi la incendiu) și cu tablourile electrice (contorizare inteligentă).

---

## G. INSTALAȚII DE UTILIZARE A GAZELOR NATURALE

### G.1. Baza de proiectare și normative

- **Normele tehnice pentru proiectarea, executarea și exploatarea sistemelor de alimentare cu gaze naturale (NTPEE-2018 / Ordin ANRE 32/2018)**;
- **I13/2015** (corelare cu instalația termică);
- **SR EN 1775** — conducte de gaz pentru clădiri.

(Instalația de gaz se prevede pentru alimentarea cazanului în condensație de vârf/rezervă din cap. A.)

### G.2. Debitul de gaz și dimensionare

- consumator: cazan în condensație **60 kW**, randament ≈ 109%;
- **debit de gaz de calcul Q ≈ P/(η · Hi)**; cu Hi ≈ 9,3 kWh/m³ (gaz natural) → Q ≈ 60/(1,0 × 9,3) ≈ **6,4 m³/h** (cu η pe Pci consumul de vârf de calcul ≈ **6,5–7,0 m³/h**);
- **branșament de gaz** din rețeaua de distribuție, **post de reglare-măsurare (PRM)** cu regulator și contor, montat la limita de proprietate;
- **traseu aparent**, din țeavă de oțel/cupru, marcat, cu robinet de incendiu la intrare, robinet de siguranță și robinet de aparat.

### G.3. Măsuri de siguranță (NTPEE)

- **detector automat de gaze + electrovană de blocare** (SIAG — sistem de detecție și închidere automată) în centrala termică;
- **ventilarea naturală** a camerei centralei termice: grile jos (aer de ardere/evacuare gaz mai greu) și sus, cu secțiuni libere dimensionate conform NTPEE (min. 0,003 m²/kW pentru evacuare și aport aer de ardere pentru aparate cu cameră deschisă — aici cazan etanș tip C, dar se păstrează ventilarea de siguranță a spațiului);
- evacuarea gazelor de ardere prin **coș/tiraj etanș tip C** (coaxial), independent de aerul din încăpere;
- traseul de gaz nu traversează spații cu risc, coșuri de fum, ghene de canalizare; distanțe de siguranță față de instalația electrică conform NTPEE;
- probe de rezistență și etanșeitate înainte de punerea în funcțiune, recepție cu operatorul de distribuție.

*Notă: în varianta cu sursă exclusiv pompă de căldură (fără gaz), capitolul G nu se aplică; s-a păstrat cazanul de gaz ca sursă de vârf/rezervă pentru siguranța în exploatare la temperaturi extreme.*

---

## H. PERFORMANȚA ENERGETICĂ A CLĂDIRII

### H.1. Baza de proiectare și normative

- **Legea 372/2005** (republicată) privind performanța energetică a clădirilor;
- **Metodologia Mc 001** de calcul al performanței energetice (aprobată prin Ordin al ministerului de resort);
- **C107/2005** — calcul termotehnic;
- Directiva EPBD transpusă — cerința de **clădire al cărei consum de energie este aproape egal cu zero (nZEB)** pentru clădirile publice noi.

### H.2. Măsuri de eficiență energetică adoptate

**Anvelopă (pasive):**
- termoizolare peste cerințele minime (U pereți 0,26; terasă 0,18 W/m²K — vezi Tabel A.2);
- tâmplărie performantă tripan Low-E (U = 1,10 W/m²K), etanșeitate la aer ridicată, punți termice tratate;
- protecție solară (jaluzele/copertine) pe fațadele expuse — reducerea sarcinii de răcire.

**Sisteme (active) eficiente:**
- **pompă de căldură aer-apă** ca sursă de bază (SCOP ≥ 3,8) — energie regenerabilă termică;
- **cazan în condensație** de vârf (η ≥ 109%);
- **ventilare cu recuperare de căldură** ε ≥ 75% (reducere pierderi ventilare);
- iluminat integral **LED** cu control (dimming, senzori), respectând valorile-țintă de putere instalată/lux din NP 061;
- pompe și ventilatoare cu turație variabilă (EC), compensarea factorului de putere.

**Surse regenerabile (cerință nZEB):**
- **panouri solare termice** (≈ 10 m²) pentru ACM;
- **sistem fotovoltaic pe terasă** (recomandat, ≈ 15–25 kWp) pentru acoperirea unei cote din consumul de energie primară — condiție pentru atingerea nivelului nZEB al clădirii publice;
- BMS pentru monitorizarea și optimizarea consumurilor.

### H.3. Rezultatul evaluării energetice

Pe baza calculului Mc 001 (consum specific de energie primară și emisii de CO₂), clădirea se încadrează, prin măsurile de mai sus, la:
- **clasa energetică A**;
- **consum de energie primară totală estimat ≈ 90–110 kWh/m²·an** (sub pragul de referință), cu ponderea surselor regenerabile ≥ nivelul impus nZEB pentru clădiri publice;
- **emisii CO₂ reduse** prin utilizarea PC + FV + solar termic.

Certificatul de performanță energetică se va elabora de auditor energetic atestat, pe baza proiectului tehnic definitivat.

---

### Note finale comune tuturor specialităților

1. Toate instalațiile se execută de personal/firme autorizate (ANRE pentru gaz și electric, ISCIR unde e cazul), cu verificarea proiectelor de către **verificatori de proiecte atestați** pe cerințele Legii 10/1995 (Is — instalații, Ie — electrice, It — termice, Ci — securitate la incendiu).
2. Se respectă **cerințele fundamentale** ale Legii 10/1995: rezistență mecanică și stabilitate, securitate la incendiu, igienă/sănătate/mediu, siguranță și accesibilitate în exploatare (inclusiv **NP 051 — adaptarea la persoane cu handicap**, esențial pentru funcțiune), protecție împotriva zgomotului, economie de energie și izolare termică, utilizare sustenabilă a resurselor.
3. Soluțiile de detaliu (dimensionări finale, scheme, planuri) se dezvoltă în fazele PTh + DE, corelat cu scenariul de securitate la incendiu și cu avizele operatorilor de utilități.

---

Am redactat conținutul complet al memoriilor tehnice de instalații pentru un centru social de zi (P+1E, ~1.180 m², 60 beneficiari + 14 personal), fază DTAC/PTh, la adâncime de memoriu real de depunere, acoperind toate cele 8 specialități (A–H) cu:

- **Valori cuantificate reale**: necesar căldură 55 kW (46,6 W/m²), debit apă 4,83 m³/zi, aer proaspăt 2.880 m³/h, putere absorbită 57 kW, hidranți interiori 4,2 l/s, pluvial 8,1 l/s, gaz 6,5 m³/h etc.
- **9 tabele** cu debite, puteri, niveluri lux (NP 061/SR EN 12464), rate ventilare (OMS 119), corpuri de încălzire, obiecte sanitare, bilanț puteri.
- **Normative citate exact** conform cerinței: I13/2015, C107/2005, I5/2010, I9/2015, SR 1846, I7/2011, I18/1-2, NP 061/2002, P118-1/2/3, Legea 10/1995, OMS 119/2014, NP 011, Legea 372/2005, Mc 001 — plus normative reale conexe (NTPEE-2018 pentru gaz, SR EN 62305 trăsnet, NP 051 accesibilitate PMR, SR 1907 necesar căldură).
- **Adaptări specifice funcțiunii sociale**: baterii anti-opărire, protecție antilegionella, grupuri sanitare PMR, sistem apel asistență (nurse call), alarmare acusto-optică pentru deficiențe senzoriale, iluminat sporit anti-cădere, deblocare acces la incendiu.

Conținutul este returnat direct ca secțiuni Markdown structurate (## specialitate / ### subcapitol / paragrafe / tabele), volum echivalent 40+ pagini, fără cod, fără placeholdere și fără normative inventate. Nu am scris niciun fișier — textul de mai sus este livrabilul.

---

Livrez direct conținutul markdown.

## A. INSTALAȚII TERMICE — BREVIAR DE CALCUL

### A.1. Parametri climatici și temperaturi interioare de calcul

Amplasament în zona climatică II (conform SR 1907-1/2014), temperatura exterioară convențională de calcul **te = -15 °C**, viteza vântului de calcul **v = 4,0 m/s** (zona eoliană III). Temperaturile interioare de calcul (ti) se stabilesc conform destinației și SR 1907-2, majorate față de valorile uzuale pentru categoria de vârstnici (sensibilitate termică crescută — OMS 119/2014):

| Nr. | Încăpere | ti [°C] | Volum V [mc] | Justificare ti |
|-----|----------|---------|--------------|----------------|
| P01 | Sală activități 1 | +22 | 210 | vârstnici, ședere prelungită |
| P02 | Sală activități 2 | +22 | 165 | idem |
| P03 | Sală mese | +22 | 240 | consum, ședere |
| P04 | Cabinet medical | +24 | 60 | consult, dezbrăcare |
| P05 | Cabinet kinetoterapie | +22 | 130 | efort fizic ușor |
| P06 | Sală relaxare/odihnă | +23 | 95 | repaus |
| P07 | Vestiar/hol acces | +18 | 140 | tranzit |
| P08 | Grupuri sanitare P | +20 | 55 | igienă |
| P09 | Bloc alimentar (bucătărie) | +18 | 150 | degajări interne |
| E01 | Birou administrativ | +20 | 90 | muncă sedentară |
| E02 | Sală multifuncțională | +22 | 275 | evenimente |
| E03 | Cameră personal | +22 | 70 | pauze |
| E04 | Grupuri sanitare E | +20 | 45 | igienă |
| E05 | Depozit/magazie | +15 | 80 | fără ședere |

### A.2. Necesarul de căldură pe încăpere (SR 1907-1)

Necesarul de căldură de calcul se determină cu relația:

**Q = Q_T + Q_i − Q_ap [W]**

unde:
- **Q_T** = pierderi prin transmisie = Σ (C_M · A · (ti − te) · (1 + Σ A) ) [W], cu C_M coeficientul de transfer termic al elementului [W/mp·K]
- **Q_i** = sarcina termică pentru încălzirea aerului infiltrat = 0,34 · n · V · (ti − te) [W], n = nr. schimburi de aer/oră prin infiltrații
- **Q_ap** = aporturi interne (persoane, iluminat) — neglijate la dimensionare pentru siguranță în regim de vârf

Coeficienți de transfer termic ai anvelopei (proiectați conform C107/2005 și cerință nZEB):
- Perete exterior termoizolat (vată minerală 15 cm): **U = 0,26 W/mp·K**
- Planșeu terasă (vată minerală 20 cm): **U = 0,18 W/mp·K**
- Planșeu peste sol (polistiren extrudat 10 cm): **U = 0,32 W/mp·K**
- Tâmplărie termopan triplu strat, ramă PVC 6 camere: **U = 1,1 W/mp·K**

**Exemplu de calcul detaliat — Sala mese (P03):**
- Perete exterior: A = 28 mp, U = 0,26 → 28 · 0,26 · (22−(−15)) = 269 W
- Tâmplărie (ferestre): A = 12 mp, U = 1,1 → 12 · 1,1 · 37 = 488 W
- Planșeu peste sol: A = 80 mp, U = 0,32 → 80 · 0,32 · 37 = 947 W (corectat cu factor sol 0,5 → 474 W)
- Adaos orientare N (+5%) și înălțime: cca +8% → Q_T ≈ (269+488+474) · 1,08 = 1.329 W
- Infiltrații: Q_i = 0,34 · 0,3 · 240 · 37 = 906 W
- **Q_P03 = 1.329 + 906 = 2.235 W**

Sinteza necesarului pe clădire:

| Nr. | Încăpere | Q_T [W] | Q_i [W] | Q total [W] |
|-----|----------|---------|---------|-------------|
| P01 | Sală activități 1 | 1.980 | 793 | 2.773 |
| P02 | Sală activități 2 | 1.540 | 623 | 2.163 |
| P03 | Sală mese | 1.329 | 906 | 2.235 |
| P04 | Cabinet medical | 720 | 251 | 971 |
| P05 | Cabinet kineto | 1.180 | 491 | 1.671 |
| P06 | Sală relaxare | 890 | 384 | 1.274 |
| P07 | Vestiar/hol | 1.240 | 476 | 1.716 |
| P08 | GS parter | 610 | 214 | 824 |
| P09 | Bloc alimentar | 1.020 | 630 | 1.650 |
| E01 | Birou admin | 780 | 268 | 1.048 |
| E02 | Sală multifuncț. | 2.310 | 1.155 | 3.465 |
| E03 | Cameră personal | 640 | 294 | 934 |
| E04 | GS etaj | 480 | 176 | 656 |
| E05 | Depozit | 420 | 306 | 726 |
| — | **TOTAL** | **16.139** | **7.967** | **≈ 22.106 W** |

**Necesar total de căldură pentru încălzire: Q_înc = 22,1 kW.** Se adaugă rezerva de siguranță și pierderile pe distribuție (5%): **Q_dim = 23,2 kW.**

### A.3. Necesarul de căldură pentru preparare apă caldă menajeră (ACM)

Conform SR 1478 și STAS 1478, necesar specific pentru clădiri sociale de zi: **20 l/pers·zi la 60 °C** (fără dușuri generalizate; cu 4 dușuri kineto → adaos).

- Beneficiari + personal: N = 60 + 12 = **72 persoane**
- Consum zilnic: V_zi = 72 · 20 = **1.440 l/zi** + adaos dușuri kineto 4 · 40 = 160 l → **V_zi ≈ 1.600 l/zi**
- Sarcina de vârf (coeficient orar 1/8 din zilnic): V_h = 200 l/h
- Puterea de preparare: **Q_ACM = V_h · ρ · c · Δt / 3600 = 200 · 1 · 1,163 · (60−10) / 1000 = 11,6 kW**
- Se prevede **boiler bivalent 500 l** (acumulare care aplatizează vârful), putere serpentină 12 kW.

### A.4. Alegerea sursei termice

Se compară două soluții. Se adoptă **soluția cu pompă de căldură** (cerință nZEB, aport regenerabil):

| Soluție | Putere | Randament/COP | Observații |
|---------|--------|---------------|------------|
| Pompă căldură aer-apă (adoptată) | 27 kW nominal | COP 3,8 (A7/W35) | acoperă înc. + ACM, regenerabil |
| Cazan condensare gaz (rezervă/backup) | 24 kW | η = 108% (PCI) | funcționare bivalentă la te < −7 °C |

- Putere sursă necesară: Q_înc (23,2) + Q_ACM parțial (aplatizat de boiler, 8 kW) ≈ **31 kW** → 1 pompă căldură 27 kW + backup gaz 24 kW în cascadă.
- Regim de temperatură joasă: **tur/retur 45/35 °C** (compatibil pompă căldură + corpuri/pardoseală).

### A.5. Dimensionarea corpurilor de încălzire

Sistem mixt: **încălzire prin pardoseală** în sălile de activități și mese (confort la vârstnici, temperatură uniformă la nivelul gleznelor), **radiatoare din oțel** în încăperi tehnice/tranzit.

**Pardoseală radiantă — Sala mese (Q = 2.235 W, A = 80 mp):**
- Densitate flux termic necesar: q = 2.235 / 80 = **27,9 W/mp** (sub limita 100 W/mp; temperatură pardoseală ≈ 26 °C, OK pentru vârstnici, sub 29 °C admis)
- Pas serpentină: 20 cm; țeavă PE-RT Ø17×2 mm; lungime circuit ≈ A / pas = 80/0,2 = 400 m → **4 circuite × 100 m** (limită pierdere sarcină)

**Radiatoare (exemplu birou admin E01, Q = 1.048 W, tur/retur 45/35, ti 20):**
- Δt mediu = (45+35)/2 − 20 = 20 K → factor corecție F ≈ 0,45 față de putere nominală (Δt 50 K)
- Putere nominală radiator necesară: 1.048 / 0,45 = **2.329 W** → radiator oțel tip 22, H600×L1000 (≈ 1.550 W nom.) × 1,5 → **2 elemente** sau tip 33 H600×L1200.

### A.6. Dimensionarea circuitelor de distribuție

Debit agent termic total: **G = Q / (c · Δt) = 23.200 / (1,163 · 10) = 1.994 kg/h ≈ 2,0 mc/h.**

| Tronson | Debit [mc/h] | v admisă [m/s] | Ø nominal | Material |
|---------|--------------|----------------|-----------|----------|
| Pompă → distribuitor | 2,0 | 0,8 | DN32 | Cu / oțel |
| Distribuitor → pardoseală P | 1,1 | 0,6 | DN25 | multistrat |
| Distribuitor → radiatoare E | 0,6 | 0,5 | DN20 | multistrat |
| Racord corp individual | 0,05 | 0,4 | DN12 (Ø15) | Cu |

Vas de expansiune închis cu membrană: V_vas = V_instalație · coef. dilatare · factor presiune ≈ 300 l · 0,04 / 0,5 = **24 l → se adoptă 35 l**. Supapă de siguranță 3 bar pe fiecare sursă.

---

## B. INSTALAȚII DE VENTILARE ȘI CLIMATIZARE (I5/2010)

### B.1. Debite de aer proaspăt pe încăpere

Conform I5/2010 tabel 2 (debit minim aer proaspăt) și SR EN 16798-1, categoria II de calitate a aerului interior. Debit specific: **spații ocupate 30 mc/h·pers** (categoria vârstnici — majorat de la minim 22 mc/h·pers), grupuri sanitare pe obiect.

| Încăpere | Nr. pers. | Debit specific | Q aer proaspăt [mc/h] | Mod |
|----------|-----------|----------------|------------------------|-----|
| Sală activități 1 | 20 | 30 mc/h·p | 600 | introducere |
| Sală activități 2 | 15 | 30 mc/h·p | 450 | introducere |
| Sală mese | 30 | 30 mc/h·p | 900 | introducere |
| Cabinet medical | 3 | 40 mc/h·p | 120 | intr. + extr. |
| Cabinet kineto | 8 | 40 mc/h·p | 320 | introducere |
| Sală relaxare | 6 | 30 mc/h·p | 180 | introducere |
| Sală multifuncț. | 40 | 30 mc/h·p | 1.200 | introducere |
| Birou admin | 3 | 30 mc/h·p | 90 | introducere |
| **Subtotal introducere** | | | **3.860** | |

**Extracții specifice (I5 art. 2.3):**

| Încăpere | Bază calcul | Debit extras [mc/h] |
|----------|-------------|----------------------|
| GS parter (2 WC, 2 lavoare) | 50 mc/h·WC | 150 |
| GS etaj (2 WC) | 50 mc/h·WC | 100 |
| Bloc alimentar — hotă gătire | debit hotă = 750 mc/h·mp fantă × 1 m + capt. | 1.500 |
| Bloc alimentar — extracție generală | 15 sch/h × 150 mc | 2.250 (parțial via hotă) |
| Cabinet medical | 6 sch/h | 360 |
| Depozit | 4 sch/h | 320 |
| **Subtotal extracție** | | **≈ 2.630 (fără hotă) + 1.500 hotă** |

### B.2. Schimburi de aer/oră (verificare)

| Încăpere | Q aer [mc/h] | V [mc] | n [sch/h] | Normă min. |
|----------|--------------|--------|-----------|------------|
| Sală mese | 900 | 240 | 3,75 | ≥ 3 OK |
| Sală multifuncț. | 1.200 | 275 | 4,36 | ≥ 4 OK |
| Cabinet medical | 360 | 60 | 6,0 | ≥ 6 OK |
| Bloc alimentar | 2.250 | 150 | 15,0 | ≥ 15 OK |
| GS parter | 150 | 55 | 2,7 | ≥ 2,5 OK (pe WC) |

### B.3. Dimensionarea centralei de tratare aer (CTA) cu recuperare

Se prevede o **CTA cu recuperator de căldură cu plăci (η ≥ 75%, cerință I5 clădiri noi)** pentru zona ocupată (introducere 3.860 mc/h, echilibrată cu extracție).

- Debit nominal CTA: **Q_CTA = 4.000 mc/h** (rotunjit, cu rezervă).
- Recuperare căldură: economie de energie pe aer proaspăt iarna:
  Q_recuperat = 0,34 · Q · Δt · η = 0,34 · 4.000 · (22−(−15)) · 0,78 = **39.256 W ≈ 39 kW recuperați** din 50 kW bruți → baterie de încălzire post-recuperare doar **≈ 11 kW**.
- Baterie de încălzire CTA: alimentată din sursa termică, putere **12 kW**, tur/retur 45/35.
- Baterie de răcire (vară, DX sau apă rece): sarcină sensibilă vară = 0,34 · 4.000 · (32−26) = 8.160 W + latentă ≈ **≈ 14 kW frig**.
- Ventilatoare: presiune disponibilă ≈ 350 Pa; putere electrică estimată P = Q · Δp / (3600 · η_v) = 4.000 · 350 / (3.600.000 · 0,6) = **0,65 kW** × 2 (introducere + evacuare).
- Clasă filtrare: **ePM1 50% (F7)** pe introducere + ePM10 (M5) prefiltru — protecție respiratorie beneficiari.

**Bilanț aeraulic (echilibru):**

| | Introducere [mc/h] | Extracție [mc/h] |
|---|---|---|
| Zonă ocupată (CTA) | 4.000 | 2.630 (GS + camere) |
| Bloc alimentar (independent) | 1.400 (aer compensare) | 1.500 (hotă) + transfer |
| **Diferență** | ușor suprapresiune spații curate | depresiune GS + bucătărie |

Se asigură **suprapresiune** în spațiile de activități (evită migrarea mirosurilor din GS/bucătărie) și **depresiune** în GS și bloc alimentar. Bucătăria cu instalație independentă (kit hotă + ventilator antigrăsime).

---

## C. INSTALAȚII SANITARE (I9/2015)

### C.1. Debite de calcul apă rece și caldă

Metoda echivalenților de debit (I9/2015, anexa). Fiecare obiect sanitar are un debit specific și un echivalent E (raportat la 0,2 l/s):

| Obiect | Nr. buc. | Debit spec. qs [l/s] | E unitar | E total |
|--------|----------|----------------------|----------|---------|
| Lavoar | 12 | 0,10 | 0,50 | 6,00 |
| WC cu rezervor | 8 | 0,10 | 0,50 | 4,00 |
| Duș | 4 | 0,20 | 1,00 | 4,00 |
| Spălător bucătărie | 3 | 0,20 | 1,00 | 3,00 |
| Mașină spălat vase | 1 | 0,25 | 1,25 | 1,25 |
| Robinet serviciu | 3 | 0,20 | 1,00 | 3,00 |
| **TOTAL echivalenți E** | | | | **21,25** |

**Debit de calcul (I9, clădiri social-administrative):**

**q_c = 0,20 · (a · √E + b · E + c) [l/s]**, cu a=1,7; b=0,14; c=0,90 (regim de utilizare uniform)

q_c = 0,20 · (1,7 · √21,25 + 0,14 · 21,25 + 0,90) = 0,20 · (1,7 · 4,61 + 2,98 + 0,90) = 0,20 · (7,84 + 3,88) = **q_c ≈ 2,34 l/s** apă rece total.

Debit apă caldă (obiecte cu ACM: lavoare, dușuri, spălătoare → E_ACM ≈ 11): q_c,ACM = 0,20 · (1,7·√11 + 0,14·11 + 0,9) = 0,20 · (5,64+1,54+0,9) = **1,62 l/s**.

### C.2. Dimensionarea branșamentului și conductelor

- Branșament apă rece: q_c = 2,34 l/s, v_admis = 1,5 m/s → A = q/v = 0,00234/1,5 = 0,00156 mp → Ø = 44,6 mm → **branșament DN50 (PEHD De63)**, apometru DN40.
- Presiune de utilizare necesară: H_nec = H_geo (etaj +5 m) + Σh_r,l (pierderi ≈ 8 m) + H_obiect (5 m) = **18 mCA** → dacă presiunea rețelei < 2,5 bar se prevede **grup de pompare (hidrofor) 2 pompe (1+1R), Q=3 mc/h, H=25 m.**

| Tronson | q_c [l/s] | v [m/s] | Ø interior | Ø nominal |
|---------|-----------|---------|------------|-----------|
| Branșament | 2,34 | 1,5 | 44,6 | DN50 / De63 PEHD |
| Coloană principală AR | 1,80 | 1,4 | 40,4 | De50 PP-R |
| Coloană AR etaj | 1,10 | 1,2 | 34,2 | De40 PP-R |
| Distribuție ACM | 1,62 | 1,3 | 39,8 | De50 PP-R + recirculare De25 |
| Racord obiect | 0,10–0,20 | 1,0 | 12–16 | De16/De20 PP-R |

Recirculare ACM cu pompă (evită așteptarea apei calde — confort vârstnici, igienă anti-Legionella: menținere ≥ 55 °C în retur, șoc termic periodic 70 °C).

### C.3. Obiecte sanitare — verificare număr conform OMS 119/2014

Pentru clădiri publice/asistență socială, OMS 119/2014 (norme igienă): 1 WC / 30 persoane pe sex + adaos, minim 1 grup sanitar pentru persoane cu dizabilități (obligatoriu — beneficiari vârstnici, mobilitate redusă).

| Obiect | Necesar (60 benef. + 12 pers.) | Prevăzut | Verificare |
|--------|-------------------------------|----------|------------|
| WC beneficiari | ≥ 4 (2M+2F) | 4 + 2 PMR | OK + adaptat PMR |
| WC personal | ≥ 1 | 2 | OK |
| Lavoare | 1/WC + zone | 12 | OK |
| Duș (kineto/igienă) | 2 minim | 4 | OK |
| Grup sanitar PMR | ≥ 1 obligatoriu | 2 (P+E) | OK, cu bare sprijin |

Obiecte adaptate: WC la înălțime 46–48 cm, bare rabatabile, lavoar fără picior, robinete cu manetă lungă/senzor.

### C.4. Canalizare menajeră

Metoda debitului de calcul: **q_c,ev = q_c + q_s,max** (q_s,max = debitul obiectului cu cel mai mare debit de scurgere = WC 2,5 l/s).

- q_c,ev = 2,34 + 2,5 = **4,84 l/s.**

| Element | Debit [l/s] | Umplere | Ø nominal | Pantă |
|---------|-------------|---------|-----------|-------|
| Racord WC | 2,5 | 0,7 | DN110 | 2% |
| Racord lavoar/duș | 0,5–0,8 | 0,5 | DN50 | 3% |
| Coloană verticală | 4,0 | 0,5 (h/D) | DN110 | vert. |
| Colector orizontal la ieșire | 4,84 | 0,7 | DN125 | 2% |
| Ventilare coloane | — | — | DN75 (peste acoperiș) | vert. |

Colector la cămin de racord → rețea publică. Se prevede **separator de grăsimi** pe evacuarea blocului alimentar (NP 133), dimensionat la debit bucătărie 1,5 l/s → separator NS 2.

### C.5. Canalizare pluvială

Debit de ploaie: **Q_p = m · i · Φ · A [l/s]**, cu:
- i = intensitatea ploii de calcul (durata 5 min, frecvență 1/1) ≈ **300 l/s·ha = 0,03 l/s·mp** (zona geografică)
- Φ = coeficient scurgere terasă/tablă = 0,90
- m = coeficient adimensional 1,0
- A = suprafață acoperiș (proiecție orizontală) ≈ **520 mp = 0,052 ha**

Q_p = 1,0 · 300 · 0,90 · 0,052 = **≈ 14,0 l/s.**

| Element | Debit [l/s] | Ø nominal | Nr. buc. |
|---------|-------------|-----------|----------|
| Receptor terasă (per 250 mp) | 7,0 | DN110 | 2–3 |
| Coloană pluvială | 7,0 | DN110 | 3 |
| Colector orizontal | 14,0 | DN160 | 1 |

Ape pluviale dirijate spre **bazin de retenție/infiltrare** (cerință gestionare la sursă) sau canalizare pluvială publică. Rigole și guri de scurgere pentru platforme.

---

## D. INSTALAȚII ELECTRICE (I7/2011)

### D.1. Bilanțul de puteri

| Nr. | Categorie receptor | Pi [kW] | ku | ks | Pc [kW] |
|-----|--------------------|---------|-----|-----|---------|
| 1 | Iluminat interior | 8,5 | 0,9 | 0,9 | 6,9 |
| 2 | Iluminat exterior/siguranță | 2,0 | 1,0 | 0,8 | 1,6 |
| 3 | Prize uz general | 18,0 | 0,3 | 0,5 | 2,7 |
| 4 | Bucătărie (aragaz elec., cuptor, frig.) | 22,0 | 0,7 | 0,6 | 9,2 |
| 5 | HVAC (CTA, pompe, PC) | 14,0 | 0,8 | 0,8 | 9,0 |
| 6 | Pompă căldură + boiler | 9,0 | 0,9 | 0,8 | 6,5 |
| 7 | Ascensor PMR | 7,5 | 0,5 | 0,6 | 2,3 |
| 8 | Curenți slabi (UPS, ICT) | 3,0 | 0,8 | 0,9 | 2,2 |
| 9 | Spălătorie/diverse | 6,0 | 0,4 | 0,5 | 1,2 |
| | **TOTAL** | **90,0** | | | **≈ 41,6** |

- **Putere instalată Pi = 90 kW.**
- **Putere cerută (absorbită) Pc = 41,6 kW.**
- Cu factor de putere cos φ = 0,92 (baterie condensatoare pt HVAC): **S = Pc / cos φ = 45,2 kVA.**
- Curent de calcul: **I_c = S / (√3 · U) = 45.200 / (1,732 · 400) = 65,2 A.**

### D.2. Branșament și tablou general (TG)

- Branșament trifazat, putere aprobată ≈ **50 kVA**, întreruptor general **80 A** (rezervă extindere), curbă C.
- Contor trifazat + bloc de măsură și protecție (BMPT) la limita de proprietate.
- Alimentare de rezervă: **grup electrogen 40 kVA** (comutare automată AAR) pentru circuite vitale — nurse call, iluminat siguranță, ascensor, frigidere medicamente, o parte HVAC. Alternativ UPS pentru curenți slabi + iluminat siguranță.

### D.3. Schema tabloului general — extras circuite

| Circ. | Destinație | Protecție | ΔI (dif.) | Cablu |
|-------|-----------|-----------|-----------|-------|
| Q1 | Tablou secundar bucătărie TS-BUC | MCB 3P 40A curbă C | RCD 3P 40A/30mA | CYABY 5×10 |
| Q2 | Tablou HVAC TS-HVAC | MCB 3P 32A | RCD 3P 40A/300mA | CYABY 5×6 |
| Q3 | Pompă căldură | MCB 3P 25A | RCD 3P 30mA | CYY-F 5×6 |
| Q4 | Ascensor PMR | MCB 3P 20A | RCD 3P 30mA | CYY 5×4 |
| Q5 | Iluminat parter | MCB 1P 10A curbă B | RCD 2P 30mA | CYY-F 3×1,5 |
| Q6 | Iluminat etaj | MCB 1P 10A curbă B | RCD 2P 30mA | CYY-F 3×1,5 |
| Q7 | Prize săli activități | MCB 1P 16A | RCD 2P 30mA | CYY-F 3×2,5 |
| Q8 | Prize cabinet medical (dedicat) | MCB 1P 16A | RCD 2P 30mA cl. A | CYY-F 3×2,5 |
| Q9 | Iluminat siguranță (nedetașabil) | MCB 1P 6A | — (circuit separat) | rezist. foc E90 |
| Q10 | Nurse call + IT (via UPS) | MCB 1P 10A | RCD 30mA | CYY-F 3×2,5 |
| Q11 | Detecție incendiu (centrală) | MCB 1P 6A dedicat | — | rezist. foc E90 |
| Q12 | Boiler ACM | MCB 1P 16A | RCD 30mA | CYY-F 3×2,5 |

**Verificare cădere de tensiune** circuit iluminat cel mai lung (Q6, L=45 m, I=8A, s=1,5 mmp): ΔU = 2·ρ·L·I·cosφ / s = 2·0,0178·45·8·1 / 1,5 = 8,5 V = **2,3% < 3% admis (iluminat) — OK.**

### D.4. Priza de pământ

- Rezistență de dispersie admisă (instalație comună protecție + paratrăsnet): **Rp ≤ 1 Ω** (cerință co-existență paratrăsnet).
- Priză de fundație (naturală, în beton — armătura radierului) + priză artificială de completare cu electrozi verticali (țăruși OL-Zn 2,5 m) + platbandă OL-Zn 40×4 în centură.
- Rezistivitate sol estimată ρ = 100 Ω·m → pentru Rp ≤ 1 Ω sunt necesari cca 8–10 electrozi verticali interconectați + priza de fundație.
- Schema TN-S (nul de protecție separat de nul de lucru), legare la pământ a tuturor maselor, centură echipotențială principală (BEP) în camera tehnică.

### D.5. Protecția împotriva trăsnetului (SR EN 62305)

**Evaluarea riscului (SR EN 62305-2):** clădire publică cu persoane vulnerabile (vârstnici, mobilitate redusă) → risc de pierdere de viață umană **R1**. Se compară R1 cu risc tolerabil R_T = 10⁻⁵.

Estimare: suprafață de captare A_d = L·l + 6·H·(L+l) + π·(3H)² ≈ pentru 30×18×9 m → A_d ≈ 30·18 + 6·9·48 + π·27² = 540 + 2.592 + 2.290 = **5.422 mp = 0,0054 km²**. Cu densitate descărcări N_g = 4 trăsnete/km²·an → N_d = N_g · A_d · C_d = 4 · 0,0054 · 1 = **0,0216/an**.

Cu factorii de vulnerabilitate (persoane, panică evacuare dificilă), **R1 rezultat > R_T → IPT NECESAR.** Se adoptă **nivel de protecție III (LPL III)**, cu:
- Dispozitiv de captare tip rețea/plasă (ochi 15×15 m) + tije pe elementele înalte.
- Minim 4 conductoare de coborâre (distanțate ≤ 15 m pe perimetru).
- Priza de pământ comună (Rp ≤ 1 Ω), piese de separație de măsură.
- SPD-uri (descărcătoare) tip 1+2 în TG și tip 2 în tablourile secundare (protecție la supratensiuni).

---

## E. INSTALAȚII DE ILUMINAT (NP 061/2002, SR EN 12464-1)

### E.1. Niveluri de iluminare menținute Em

Pentru vârstnici, NP 061 și bunele practici recomandă **majorarea nivelurilor cu cca 50%** față de valorile de bază (acuitate vizuală redusă), și **limitarea orbirii (UGR)** și **redare culori Ra ≥ 80**.

| Încăpere | Em bază [lx] | Em adoptat [lx] | UGR max | Ra | Uo min |
|----------|--------------|-----------------|---------|-----|--------|
| Sală activități | 300 | 500 | 19 | 80 | 0,60 |
| Sală mese | 200 | 300 | 22 | 80 | 0,40 |
| Cabinet medical (examinare) | 500 | 1.000 (local) | 19 | 90 | 0,70 |
| Cabinet kineto | 300 | 500 | 19 | 80 | 0,60 |
| Bloc alimentar | 500 | 500 | 22 | 80 | 0,60 |
| Birou admin | 500 | 500 | 19 | 80 | 0,60 |
| Coridoare/scări | 100 | 200 | 25 | 80 | 0,40 |
| Grupuri sanitare | 200 | 200 | 25 | 80 | 0,40 |
| Sală multifuncțională | 300 | 500 | 19 | 80 | 0,60 |

### E.2. Dimensionarea iluminatului (metoda factorului de utilizare)

**Exemplu — Sală activități 1 (A = 60 mp, Em = 500 lx):**
- Flux total necesar: **Φ = Em · A / (U · MF)**, cu U (factor utilizare) = 0,55, MF (factor menținere) = 0,80
- Φ = 500 · 60 / (0,55 · 0,80) = **68.182 lm**
- Corp LED panou 600×600, 36 W, 4.000 lm, 111 lm/W → nr. = 68.182 / 4.000 = **17 corpuri** → dispunere 4×4 + 1 = 17 panouri, putere instalată 612 W (**≈ 10,2 W/mp** — eficient).

Corpuri LED, temperatură culoare 4.000 K (neutru), flicker redus, senzori prezență + reglaj automat în funcție de lumina naturală (economie energie, cerință nZEB).

### E.3. Iluminatul de siguranță (P118, NP 061 cap. iluminat siguranță)

| Tip iluminat siguranță | Locație | Nivel min. | Autonomie |
|------------------------|---------|------------|-----------|
| Evacuare — pe căi | Coridoare, scări, uși ieșire | 1 lx (axa căii) | ≥ 1 h |
| Evacuare — indicatoare | Deasupra ușilor de evacuare | luminanță ≥ 2 cd/mp | ≥ 1 h |
| Antipanică | Săli > 60 mp (activități, mese) | 0,5 lx | ≥ 1 h |
| Pentru intervenții | Cameră tehnică, tablou electric | 15 lx | ≥ 1 h |
| Marcarea hidranților | La fiecare hidrant/stingător | — | ≥ 1 h |

Corpuri autonome cu acumulator (kit LED + inverter) sau alimentate din sursă centrală cu baterie; testare automată (autotest). Indicatoare de evacuare luminate permanent conform ISO 7010.

---

## F. INSTALAȚII DE DETECTARE, SEMNALIZARE ȘI ALARMARE LA INCENDIU (P118-3/2015)

### F.1. Necesitate și scenariul de securitate

Clădirea de asistență socială cu persoane cu mobilitate redusă (vârstnici) → **echiparea cu IDSAI este obligatorie** (P118-3, corelat cu scenariul de securitate la incendiu). Categorie de importanță și clasa de reacție impun **detectare totală** (acoperire integrală a spațiilor, exceptând GS mici).

### F.2. Zone, detectoare, centrală

| Zonă (bucla) | Spații acoperite | Tip detector |
|--------------|------------------|--------------|
| Z1 | Săli activități, mese, relaxare (parter) | optic de fum adresabil |
| Z2 | Cabinet medical, kineto, birou, personal | optic de fum |
| Z3 | Bloc alimentar | termic (termovelocimetric) — evită alarme false de la abur/fum gătit |
| Z4 | Coridoare, scări, holuri | optic fum + butoane manuale |
| Z5 | Cameră tehnică, depozit, tablou electric | optic fum + termic |
| Z6 | Sală multifuncțională (etaj) | optic fum + aspirativ (opțional plafon înalt) |

- **Centrală de semnalizare adresabilă**, 2 bucle, cu sursă de rezervă (acumulatori, autonomie ≥ 48 h veghe + 30 min alarmare).
- Butoane manuale de semnalizare la fiecare ieșire și pe căile de evacuare (max 30 m parcurs până la un buton).
- Sirene acustice + **dispozitive optice (flash)** — esențial pentru beneficiari cu deficiențe de auz.
- Nivel de presiune acustică alarmă ≥ 65 dB(A) (sau +5 dB peste zgomotul de fond), audibil în toate spațiile inclusiv GS.
- **Corelare cu scenariul**: la alarmă generală → comandă oprire CTA/ventilare (evitare propagare fum), deblocare control acces (uși evacuare), oprire alimentare gaz (electrovalvă), aducere ascensor la parter. Transmisie la dispecerat/serviciu de pompieri (opțional prin dialer/IP).

---

## G. INSTALAȚII DE STINGERE A INCENDIILOR (P118-2/2013)

### G.1. Hidranți interiori

Necesitatea hidranților interiori (P118-2 art. relevant): clădiri de asistență socială cu arie construită și volum peste pragurile normate → **hidranți interiori obligatorii**. Volum clădire ≈ 3.500 mc, arie ≈ 900 mp → **necesar hidranți interiori**.

- Număr jeturi în funcțiune simultană: **2 jeturi** (clădire cu risc, public vulnerabil).
- Debit specific hidrant interior Ø racord DN50, ajutaj: **q = 2,1 l/s/jet** → **Q_hi = 2 · 2,1 = 4,2 l/s.**
- Presiune la robinet: ≥ 2,5 bar; lungime furtun 20 m + bătaie jet → acoperire completă (fiecare punct atins de 2 jeturi).
- Amplasare: cutii hidrant pe coridoare, lângă ieșiri, la max 30 m acoperire.

### G.2. Hidranți exteriori

- Necesar în funcție de volum și grad de rezistență la foc: **Q_he = 5 l/s** (debit minim pentru această categorie de volum), durată teoretică de stingere **T = 3 h**.
- Se asigură din rețeaua publică (hidranți stradali la ≤ 150 m) SAU din gospodărie proprie de apă cu rezervor.

### G.3. Rezerva de apă pentru incendiu

Dacă rețeaua publică nu asigură simultan debitul + presiunea:
- **V_rezervă = (Q_hi + Q_he) · T** — pentru hidranți interiori T_hi = 10 min, exteriori T_he = 3 h:
  V = 4,2 l/s · 600 s + 5 l/s · 10.800 s = 2.520 + 54.000 = **56.520 l ≈ 57 mc.**
- Se prevede **rezervor de incendiu 60 mc** (dacă e cazul) + **grup de pompare incendiu (pompă principală + pilot + rezervă)** conform P118-2, sau se confirmă asigurarea din rețea publică cu aviz operator.

### G.4. Stingătoare portabile

| Tip stingător | Amplasare | Nr. |
|---------------|-----------|-----|
| P6 (pulbere ABC 6 kg) | Coridoare, general (1/200 mp + 1/nivel) | 8 |
| CO₂ 5 kg | Tablou electric, cameră tehnică, IT | 3 |
| Special grăsimi (clasa F) | Bloc alimentar (lângă plită) | 1 |
| **TOTAL** | | **12** |

Distanța maximă de parcurs până la un stingător: ≤ 15 m. Semnalizare cu pictograme și iluminat de siguranță.

---

## H. INSTALAȚII DE GAZE NATURALE (dacă sursă/backup pe gaz)

### H.1. Debit și dimensionare

În soluția bivalentă (backup cazan condensare 24 kW gaz):
- Consum de calcul cazan: **Q_gaz = P / (η · Hi) = 24 / (1,08 · 9,3 kWh/mc) = 2,39 mc/h** (gaz metan Hi ≈ 9,3 kWh/mc / 34 MJ/mc).
- Dimensionare conductă (metoda pierderilor de presiune, presiune redusă 20–50 mbar): pentru 2,4 mc/h și lungime ≈ 25 m → **conductă oțel/cupru DN20 (3/4")**, cădere presiune < 1 mbar.
- Post de reglare-măsurare (regulator + contor gaz) la limita de proprietate; robinet de incendiu (electrovalvă) la intrarea în clădire, comandat de detecția de gaz și de IDSAI.

### H.2. Ventilarea și securitatea centralei termice pe gaz

- Suprafață minimă vitrată/ventilare (I13, GEx): golul de ventilare inferior + superior, secțiune liberă ≥ 0,003 mp per kW → pentru 24 kW → **≥ 0,072 mp** (grile jos + sus).
- Volum minim încăpere: ≥ 0,8 mc/kW → 24·0,8 = 19,2 mc (înălțime liberă ≥ 2,4 m).
- **Detector de gaz metan** (senzor la partea superioară — gaz mai ușor ca aerul) cuplat cu **electrovalvă de închidere automată** și alarmă.
- Evacuare gaze arse: coș etanș/kit concentric pentru cazan cu condensare (tiraj forțat, clasă C).
- Aparate în clasă etanșă (cameră de ardere etanșă) preferate — reduc cerințele de ventilare a încăperii.

---

## I. INSTALAȚII DE CURENȚI SLABI

### I.1. Voce-date (rețea structurată)

- Cablare structurată **cat. 6 U/UTP**, prize RJ45 duble în birou, cabinet medical, personal, recepție, săli (WiFi AP).
- Rack de comunicații 19" în camera tehnică IT, patch-panel, switch PoE (alimentare AP + camere + telefonie IP).
- **UPS 3 kVA** pentru echipamentele IT + nurse call + centrală incendiu backup (autonomie ≥ 30 min).
- Puncte WiFi (AP) — minim 4 pentru acoperire integrală (săli, mese, etaj).

### I.2. Control acces

- Uși control acces cu cititor de proximitate: intrare principală, acces personal, cabinet medicamente, cameră tehnică.
- **Corelare obligatorie cu IDSAI**: la alarmă de incendiu, deblocare automată a ușilor de pe căile de evacuare (fail-safe).
- Interfon la intrare + videointerfon la recepție.

### I.3. Supraveghere video (CCTV)

- Camere IP (rezoluție ≥ 2 MP) pe: intrare, holuri, curte/acces, sală mese, perimetru. Evitare camere în GS/spații de intimitate (respectare GDPR / demnitate beneficiari).
- NVR cu stocare ≥ 30 zile, alimentare PoE, backup UPS.
- Estimare 12–16 camere.

### I.4. Sistem de apelare personal (Nurse Call) — ESENȚIAL

Sistem dedicat de apelare/asistență (obligatoriu la centre pentru vârstnici):
- **Butoane de apel** la pat/scaun în sălile de odihnă/relaxare, **butoane cu cordon (pull-cord) în fiecare GS și duș** (accesibile de la nivelul podelei — cădere).
- Terminal/afișaj la punctul de supraveghere personal (indică încăperea/beneficiarul care solicită ajutor) + repetitoare acustic-luminoase pe coridoare.
- Confirmare prezență personal (buton reset în cameră).
- Alimentare din UPS (funcționare la cădere rețea), integrare cu telefonie/pager personal.

### I.5. BMS (Building Management System) — listă puncte

| Sistem | Puncte monitorizate/comandate |
|--------|-------------------------------|
| Termic | temperatură tur/retur, stare pompă căldură/cazan, temperatură boiler ACM, comandă |
| HVAC/CTA | debit, temperatură introducere, stare ventilatoare, filtre (presostat colmatare), baterii |
| Sanitar | nivel rezervoare, stare pompe hidrofor, alarmă inundație (senzor cameră tehnică) |
| Electric | stare TG, consum energie (contor), stare grup electrogen/UPS |
| Iluminat | scenarii, senzori prezență, aport lumină naturală |
| Confort | temperatură/umiditate/CO₂ pe zone (sonde CO₂ în săli — comandă debit aer proaspăt) |
| Securitate | interfațare status IDSAI, control acces, CCTV (doar status) |

Sonde de CO₂ în sălile de activități/mese → reglaj automat debit aer proaspăt (Demand Controlled Ventilation — economie energie + calitate aer garantată).

---

## J. EFICIENȚĂ ENERGETICĂ ȘI SURSE REGENERABILE (Legea 372/2005)

### J.1. Cerința nZEB

Clădire publică nouă → obligatoriu **nZEB (nearly Zero Energy Building)**: consum de energie primară foarte redus, acoperit în proporție semnificativă din **surse regenerabile**.

### J.2. Măsuri de eficiență adoptate

| Măsură | Efect |
|--------|-------|
| Anvelopă performantă (U perete 0,26; terasă 0,18; tâmplărie triplu 1,1) | reducere pierderi transmisie |
| Recuperator de căldură CTA (η ≥ 78%) | recuperare ≈ 39 kW pe aer proaspăt |
| Pompă de căldură aer-apă (COP 3,8) | sursă principală regenerabilă |
| Iluminat 100% LED + senzori prezență + reglaj lumină naturală | ≈ 10 W/mp instalat |
| DCV — ventilare comandată de CO₂ | reduce debitul la ocupare redusă |
| Recirculare ACM izolată + izolare conducte | reducere pierderi |
| Baterie condensatoare (cos φ 0,92) | reducere pierderi rețea |

### J.3. Aport regenerabil

- **Panouri fotovoltaice pe terasă**: putere estimată **15 kWp** (≈ 90 mp), producție ≈ 16.500 kWh/an → acoperă o parte semnificativă din consumul de iluminat + pompe + HVAC.
- **Pompa de căldură** = aport de energie aerotermală regenerabilă (parte din energia livrată provine din mediu, COP 3,8 → ~74% regenerabil pe partea termică).
- Opțional: panouri solar-termice pentru pre-încălzire ACM.

### J.4. Estimare consum specific de energie

- Consum specific de energie primară estimat: **≈ 90–110 kWh/mp·an** (țintă nZEB clădire publică), din care aport regenerabil ≥ 30–40% → încadrare **clasa energetică A**.
- Necesar specific de încălzire: Q_înc anual ≈ 22 kW · grade-zile → estimat **≈ 45–55 kWh/mp·an** (anvelopă performantă + recuperare).

---

## K. PIESE DESENATE — INSTALAȚII (Legea 50/1991, Anexa 1)

Conținutul minim al pieselor desenate de instalații, pe specialități:

### K.1. Instalații termice (IT)
- Plan parter + etaj cu traseele de distribuție agent termic, amplasarea corpurilor de încălzire, circuitele de pardoseală radiantă (cu pas și lungimi).
- **Schemă funcțională (coloană/monofilară)** a sursei termice: pompă căldură + cazan backup + boiler ACM + distribuitor-colector + vase expansiune + pompe de circulație.
- Detalii de montaj distribuitor pardoseală, izolații conducte.

### K.2. Instalații sanitare (IS)
- Plan parter + etaj cu obiecte sanitare, trasee apă rece/caldă/recirculare, canalizare menajeră + pluvială.
- **Schemă coloane apă** (izometrie) și **schemă coloane canalizare** (cu diametre, pante, ventilații).
- Plan de situație cu branșament apă, racord canalizare, cămine, separator grăsimi, bazin retenție pluvial.

### K.3. Instalații electrice (IE)
- Plan parter + etaj cu circuite de iluminat, prize, forță, poziții corpuri și tablouri.
- **Schema monofilară a tabloului general și a tablourilor secundare** (circuite, protecții, secțiuni).
- Plan priză de pământ + paratrăsnet (dispunere captatori, coborâri, piese separație).
- Plan iluminat de siguranță/evacuare cu poziții corpuri și indicatoare.

### K.4. Ventilare-climatizare (HVAC)
- Plan parter + etaj cu tubulatură introducere/evacuare, guri de aer, poziție CTA, hotă bucătărie.
- **Schemă funcțională CTA** (recuperator, baterii, filtre, ventilatoare) + bilanț aeraulic.

### K.5. Detectare-semnalizare incendiu (IDSAI) și stingere
- Plan cu poziții detectoare, butoane manuale, sirene/flash, centrală, trasee cu cablu rezistent la foc.
- Plan hidranți interiori/exteriori, stingătoare, schema instalației de stingere + gospodărie apă (dacă e cazul).
- **Schema bloc a corelării IDSAI** (comenzi: oprire ventilare, deblocare uși, oprire gaz, ascensor la parter).

### K.6. Gaze naturale (IG) și curenți slabi (ICT)
- Plan traseu gaz, post reglare-măsurare, detector gaz + electrovalvă, ventilare centrală.
- Planuri curenți slabi: voce-date, CCTV, control acces, **nurse call** (cu poziții butoane pull-cord în GS/dușuri și terminal la punctul de supraveghere), schema BMS.

---

**Notă generală:** Toate breviarele de calcul de mai sus se vor detalia și verifica de proiectantul de specialitate în faza PTh, cu programe de calcul specializate și cu datele exacte de la furnizorii de utilități (presiune apă, putere aprobată energie, presiune gaz). Valorile numerice reprezintă dimensionări preliminare conform normativelor în vigoare, pentru un centru social de zi de cca 900 mp, 40–60 beneficiari + personal.

---

## L. CALCULUL PIERDERILOR DE SARCINĂ PE CIRCUITUL TERMIC CEL MAI DEFAVORABIL. ALEGEREA POMPEI DE CIRCULAȚIE

### L.1. Identificarea circuitului cel mai defavorabil

Circuitul cel mai defavorabil este cel care alimentează cel mai îndepărtat distribuitor de la centrala termică (CT parter) — distribuitorul DP-2 al zonei de est etaj 1, care deservește sala de socializare și cabinetele medicale (corpuri statice + o buclă de pardoseală radiantă). Traseul include: pornire din butelia de egalizare hidraulică, coloana verticală, distribuitorul etaj, ramura terminală.

Debitul total al circuitului primar rezultă din necesarul de căldură al clădirii calculat anterior în memoriul termic (`Q_înc = 42,8 kW`). Debitul masic pe circuitul primar, pentru un salt termic de proiectare `Δt = 15 K` (regim 45/30 °C, adaptat pompei de căldură):

```
G = Q / (c_p · Δt) = 42 800 / (4187 · 15) = 0,681 kg/s ≈ 2 452 kg/h ≈ 2,45 m³/h
```

Pe circuitul cel mai defavorabil (DP-2) revine o fracțiune de `Q_DP2 = 11,2 kW`, deci:

```
G_DP2 = 11 200 / (4187 · 15) = 0,178 kg/s = 642 kg/h ≈ 0,642 m³/h
```

### L.2. Tronsonarea și calculul pierderilor liniare

Se aplică relația generală de pierdere de sarcină:

```
Δp = R · L + Z    [Pa]
R = λ · (1/D) · (ρ·v²/2)     (pierdere liniară unitară, Pa/m)
Z = Σξ · (ρ·v²/2)            (pierderi locale, Pa)
```

unde `ρ = 990 kg/m³` (apă la 45 °C), `v` — viteza, `λ` — coeficient de frecare (Colebrook, țevi cupru/multistrat, rugozitate k = 0,007 mm).

Debitele pe tronsoane s-au repartizat descrescător de la CT spre terminal. Tabelul de calcul (tur; returul este simetric, se dublează):

| Tr. | Q (kW) | G (kg/h) | D int. (mm) | v (m/s) | R (Pa/m) | L (m) | R·L (Pa) | Σξ | Z (Pa) | Δp tr. (Pa) |
|-----|--------|----------|-------------|---------|----------|-------|----------|-----|--------|-------------|
| T1 (BEH→col.) | 42,8 | 2452 | 42,6 | 0,48 | 68 | 3,0 | 204 | 2,4 | 274 | 478 |
| T2 (col. vert.) | 22,0 | 1261 | 32,6 | 0,42 | 74 | 6,5 | 481 | 3,1 | 271 | 752 |
| T3 (col.→DP2) | 11,2 | 642 | 26,2 | 0,33 | 62 | 8,0 | 496 | 4,2 | 224 | 720 |
| T4 (DP2→ramură) | 6,4 | 367 | 20,0 | 0,32 | 78 | 5,5 | 429 | 5,0 | 251 | 680 |
| T5 (ramură term.) | 2,8 | 160 | 16,0 | 0,22 | 52 | 7,0 | 364 | 3,8 | 90 | 454 |
| **Σ tur** | | | | | | 30,0 | 1974 | | 1110 | **3084** |

Pierderea pe tur = 3 084 Pa. Return simetric ≈ 3 084 Pa → **Σ liniar+local țevi = 6 168 Pa ≈ 0,617 m c.a.**

### L.3. Pierderile pe echipamente (rezistențe fixe)

| Element | Δp (kPa) | Δp (Pa) |
|---------|----------|---------|
| Buclă pardoseală radiantă (cel mai lung circuit, 95 m) | 14,0 | 14 000 |
| Baterie schimbător pompă căldură (evaporator/condensator hidraulic) | 8,5 | 8 500 |
| Robinet cap termostatic corp static defavorabil | 6,0 | 6 000 |
| Robinet echilibrare DP-2 (presetare) | 4,0 | 4 000 |
| Filtru Y + separator impurități | 3,0 | 3 000 |
| Contor energie termică (ultrasonic) | 2,5 | 2 500 |
| **Σ echipamente** | **38,0** | **38 000** |

### L.4. Pierderea totală și punctul de funcționare

```
Δp_total = Δp_țevi + Δp_echipamente = 6 168 + 38 000 = 44 168 Pa ≈ 44,2 kPa ≈ 4,51 m c.a.
```

Se adaugă o rezervă de 10 % pentru murdărire/îmbătrânire:

```
H_pompă = 4,51 · 1,10 = 4,96 m c.a. ≈ 5,0 m c.a.
Q_pompă = G_total = 2,45 m³/h
```

**Punct de funcționare cerut: Q = 2,45 m³/h, H = 5,0 m c.a.**

### L.5. Alegerea pompei

Se alege o pompă de circulație cu rotor umed, cu turație variabilă (clasa EEI ≤ 0,20), tip Grundfos ALPHA2 25-60 / 180 sau Wilo Yonos PICO 25/1-6. Curba Q-H a pompei acoperă punctul (2,45 m³/h; 5,0 m c.a.) în modul de reglaj presiune proporțională.

| Regim | Q (m³/h) | H disponibil (m) | H cerut (m) | Marjă |
|-------|----------|------------------|-------------|-------|
| Nominal iarnă | 2,45 | 5,4 | 5,0 | +8 % |
| Parțial (50 %) | 1,23 | 3,2 | 1,6 | reglaj Δp |
| Minim vară (ACM) | 0,80 | 2,1 | 0,9 | reglaj Δp |

Puterea electrică absorbită la punctul nominal: `P_1 ≈ 45 W`. Reglajul cu presiune proporțională reduce consumul la sarcini parțiale cu ~60 % față de o pompă cu turație fixă.

---

## M. ECHILIBRAREA HIDRAULICĂ A INSTALAȚIEI TERMICE

### M.1. Principiu

Fără echilibrare, circuitele apropiate de pompă primesc debit excesiv, iar cele îndepărtate (DP-2) rămân subalimentate — apar dezechilibre termice, zgomote și supraconsum. Echilibrarea impune fiecărui circuit debitul de proiect prin introducerea unei rezistențe suplimentare controlate (robinet de echilibrare cu presetare / robinet dinamic PICV), astfel încât căderea de presiune să fie egală pe toate ramurile paralele.

Debitul de reglaj se calculează pentru fiecare circuit din sarcina termică:

```
G_i = Q_i / (c_p · Δt)
```

Presetarea `k_v` a robinetului rezultă din:

```
k_v = G_i / √(Δp_robinet)     [m³/h, cu Δp în bar]
```

Δp_robinet = presiunea disponibilă în noduri minus pierderea pe traseul propriu al circuitului.

### M.2. Tabel echilibrare distribuitor pardoseală radiantă (DP-1, sala mese + saloane parter)

Distribuitor cu 8 circuite, regim 40/32 °C (Δt = 8 K). Debitul pe circuit:

| Circ. | Încăpere | Q (W) | Lung. buclă (m) | G (l/h) | Δp buclă (kPa) | Presetare (nr. tură) | k_v (m³/h) |
|-------|----------|-------|-----------------|---------|----------------|----------------------|------------|
| 1 | Sala mese A | 1450 | 88 | 156 | 13,2 | 2,5 | 0,43 |
| 2 | Sala mese B | 1380 | 84 | 148 | 12,4 | 2,7 | 0,42 |
| 3 | Salon odihnă 1 | 980 | 66 | 105 | 8,1 | 3,5 | 0,37 |
| 4 | Salon odihnă 2 | 1020 | 70 | 110 | 8,8 | 3,3 | 0,37 |
| 5 | Hol distribuție | 720 | 52 | 77 | 5,2 | 4,5 | 0,34 |
| 6 | Vestiar | 540 | 44 | 58 | 4,0 | 5,5 | 0,29 |
| 7 | Cabinet kineto | 1180 | 76 | 127 | 10,5 | 3,0 | 0,39 |
| 8 | Recepție | 640 | 48 | 69 | 4,6 | 5,0 | 0,32 |
| **Σ** | | **7910** | | **850** | | | |

Circuitul defavorabil (cel mai lung, C1) rămâne complet deschis; celelalte se presetează progresiv pentru a le crește artificial rezistența până la egalizarea Δp în punctele de racord ale distribuitorului. Presetarea se exprimă în număr de ture ale limitatorului de debit din fiecare cale de tur.

### M.3. Echilibrare pe verticală

La baza fiecărei coloane se montează un robinet de echilibrare static (STAD/setter) sau un regulator de presiune diferențială (Δp-controller) menținând Δp constant la distribuitoarele de etaj indiferent de gradul de deschidere al capetelor termostatice, prevenind zgomotele de curgere. Se recomandă Δp de reglaj la distribuitor: 10 kPa.

| Coloană | Debit (l/h) | Δp disponibil (kPa) | Δp preluat robinet (kPa) | Presetare STAD |
|---------|-------------|---------------------|--------------------------|----------------|
| C1 (parter est) | 1261 | 28 | 18 | poz. 3,2 |
| C2 (parter vest) | 1080 | 26 | 16 | poz. 3,6 |
| C3 (etaj est) | 642 | 22 | 12 | poz. 4,1 |
| C4 (etaj vest) | 540 | 20 | 10 | poz. 4,4 |

---

## N. SCHEMA TABLOULUI SECUNDAR BUCĂTĂRIE (TS-BUC)

### N.1. Descriere

Bucătăria (preparare + oficiu servire pentru 40-60 beneficiari) se alimentează dintr-un tablou secundar dedicat TS-BUC, racordat din tabloul general TG printr-un circuit trifazat protejat. TS-BUC este separat pentru a permite deconectarea grupată în caz de intervenție și pentru a limita perturbarea restului clădirii.

Alimentare coloană: cablu CYAbY 5×10 mm², protejat în TG cu disjunctor 3P 40 A, curbă C, cu deconectare selectivă față de disjunctorul general.

### N.2. Bilanțul de putere al bucătăriei

| Consumator | P inst. (kW) | Faze | c cerere | P cerut (kW) |
|------------|--------------|------|----------|--------------|
| Aragaz/plită electrică (dacă electric) | 10,5 | 3F | 0,7 | 7,35 |
| Cuptor profesional | 6,0 | 3F | 0,7 | 4,20 |
| Hotă cu motor + iluminat | 1,1 | 1F | 0,9 | 0,99 |
| Frigider + congelator | 1,4 | 1F | 0,8 | 1,12 |
| Mașină spălat vase profesională | 5,5 | 3F | 0,6 | 3,30 |
| Prize monofazate oficiu (robot, mixer) | 3,7 | 1F | 0,5 | 1,85 |
| Boiler electric oficiu (ACM local) | 2,0 | 1F | 0,8 | 1,60 |
| Iluminat bucătărie | 0,6 | 1F | 1,0 | 0,60 |
| **Σ instalat** | **30,8** | | | **21,01** |

Putere cerută TS-BUC: `P_c ≈ 21,0 kW`; cu factor simultaneitate global 0,75 → `P_simultan ≈ 15,8 kW`. Curent de calcul trifazat:

```
I_c = P / (√3 · U · cosφ) = 15 800 / (1,732 · 400 · 0,92) = 24,8 A
```

Se confirmă disjunctorul de coloană 3P 40 A (rezervă de creștere).

### N.3. Extras de circuite TS-BUC

| Nr. circ. | Denumire | Faze | P (kW) | I (A) | Protecție | Secțiune conductor | Obs. |
|-----------|----------|------|--------|-------|-----------|--------------------|------|
| Q0 | Sosire coloană | 3F | 15,8 | 24,8 | — (din TG) | 5×10 mm² | — |
| Q1 | Aragaz/plită | 3F | 10,5 | 16,9 | MCB 3P 20A C | 5×4 mm² | dedicat |
| Q2 | Cuptor | 3F | 6,0 | 9,7 | MCB 3P 16A C | 5×2,5 mm² | dedicat |
| Q3 | Mașină spălat vase | 3F | 5,5 | 8,9 | MCB 3P 16A C + DDR 30 mA | 5×2,5 mm² | DDR clasă A |
| Q4 | Hotă | 1F | 1,1 | 5,0 | MCB 1P 10A C | 3×1,5 mm² | interlock cu gaz |
| Q5 | Frigider | 1F | 0,7 | 3,2 | MCB 1P 10A C + DDR 30 mA | 3×2,5 mm² | dedicat, fără alte prize |
| Q6 | Congelator | 1F | 0,7 | 3,2 | MCB 1P 10A C + DDR 30 mA | 3×2,5 mm² | dedicat |
| Q7 | Prize oficiu (4 duble) | 1F | 3,7 | 16,1 | MCB 1P 16A C + DDR 30 mA | 3×2,5 mm² | DDR clasă A |
| Q8 | Boiler ACM local | 1F | 2,0 | 9,1 | MCB 1P 16A C + DDR 30 mA | 3×2,5 mm² | dedicat |
| Q9 | Iluminat bucătărie | 1F | 0,6 | 2,7 | MCB 1P 10A B | 3×1,5 mm² | — |
| Q10 | Rezervă | 1F | — | — | MCB 1P 16A C | 3×2,5 mm² | 20 % rezervă |

Note tehnice:
- Toate circuitele de prize și utilaje cu carcasă metalică accesibilă: protecție diferențială 30 mA (I7 — protecția la atingere indirectă în medii umede/bucătării).
- Circuitul hotei (Q4) prevăzut cu interblocare la detectorul de gaz metan (dacă plita e pe gaz): la alarmă gaz, electroventilul de gaz se închide și hota rămâne alimentată pe circuit securizat de la BAAS.
- Selectivitate: disjunctoarele MCB (In ≤ 20 A) sub disjunctorul de coloană 40 A — selectivitate parțială curent/timp.
- Toate circuitele trifazate: verificare echilibrare faze — sarcina monofazată distribuită R/S/T pentru dezechilibru < 15 %.

---

## O. CALCULUL CANALIZĂRII MENAJERE PE TRONSOANE. VENTILAREA COLOANELOR

### O.1. Debitul de calcul

Conform SR EN 12056-2 / I9, debitul de calcul al apelor uzate:

```
Q_ww = K · √(ΣDU)     [l/s]
```

unde `K = 0,5` (clădire cu utilizare intermitentă — clădiri publice tip centru de zi) și `DU` = unități de descărcare pe obiect:

| Obiect sanitar | DU (l/s) |
|----------------|----------|
| Lavoar | 0,5 |
| WC cu rezervor 6 l | 2,0 |
| Duș | 0,6 |
| Pisoar | 0,5 |
| Chiuvetă bucătărie | 0,8 |
| Mașină spălat vase | 0,8 |
| Sifon pardoseală DN50 | 0,8 |

### O.2. Tabel de calcul pe tronsoane (colector orizontal parter → cămin exterior)

| Tronson | Obiecte racordate | ΣDU | Q_ww = 0,5√ΣDU (l/s) | Ø ales (DN) | Pantă (%) | v (m/s) | Grad umplere h/D |
|---------|-------------------|-----|----------------------|-------------|-----------|---------|------------------|
| T1 (grup san. E1) | 3 WC + 3 lav + 1 SP | 8,3 | 1,44 | 110 | 2,0 | 0,72 | 0,42 |
| T2 (grup san. E2) | 2 WC + 2 lav + 1 duș | 6,1 | 1,24 | 110 | 2,0 | 0,70 | 0,40 |
| T3 (bucătărie) | 2 chiuv + MSV + 1 SP | 3,2 | 0,89 | 110 | 2,0 | 0,66 | 0,35 |
| T4 (colector T1+T2) | cumul | 14,4 | 1,90 | 110 | 1,5 | 0,74 | 0,48 |
| T5 (colector +T3) | cumul | 17,6 | 2,10 | 125 | 1,5 | 0,78 | 0,45 |
| T6 (ieșire→cămin) | total clădire | 22,4 | 2,37 | 125 | 1,5 | 0,80 | 0,48 |

Verificare grad de umplere: pentru toate tronsoanele `h/D ≤ 0,5` (I9 impune ≤ 0,5 pentru colectoare orizontale menajere) — **conform**. Viteza de autocurățire `v ≥ 0,7 m/s` — **respectată** pe colectoare (evită depunerile).

### O.3. Coloanele verticale

| Coloană | Obiecte | ΣDU | Q_ww (l/s) | Ø coloană (DN) | Capacitate max. (l/s) |
|---------|---------|-----|------------|----------------|-----------------------|
| K1 (grupuri E1+P) | 4 WC + 4 lav | 10,0 | 1,58 | 110 | 4,0 (ventilată primar) |
| K2 (grupuri E2+P) | 3 WC + 3 lav + duș | 8,1 | 1,42 | 110 | 4,0 |
| K3 (bucătărie) | chiuvete + MSV | 3,2 | 0,89 | 75 | 2,0 |

### O.4. Ventilarea coloanelor

- Fiecare coloană se prelungește peste acoperiș ca **ventilație primară**, Ø egal cu al coloanei (DN110/DN75), ieșire min. 0,50 m peste învelitoare și min. 2 m depărtare de ferestre/prize aer.
- Pentru grupurile sanitare grupate cu > 3 obiecte pe coloană se prevede **ventilație secundară** (coloană de aerisire paralelă DN70) racordată la baza și vârful coloanei, pentru a evita sifonarea gărzilor hidraulice (protejarea sifoanelor la depresiune > 400 Pa).
- Pe obiectele terminale îndepărtate se admit **aeratoare cu membrană** (ventile de admisie aer) DN50/DN75, montate accesibil, doar acolo unde nu se poate prelungi coloana la acoperiș.
- Garda hidraulică minimă a sifoanelor: 50 mm (lavoare/dușuri), 60 mm (WC).

---

## P. PERFORMANȚA SEZONIERĂ A POMPEI DE CĂLDURĂ (SCOP / SEER). CONSUM ANUAL

### P.1. Definiții

- **SCOP** (Seasonal Coefficient of Performance) — randamentul sezonier la încălzire = energie termică livrată / energie electrică consumată, integrat pe sezonul de încălzire (EN 14825, zonă climatică medie).
- **SEER** (Seasonal Energy Efficiency Ratio) — analog pentru răcire.

Pompa aleasă: pompă de căldură aer-apă inverter, `P_înc nominal = 45 kW` (regim 45/30 °C), cu:

```
SCOP = 4,1   (regim de joasă temperatură, clima Cf/D România)
SEER = 5,3   (răcire, regim 7/12 °C)
```

### P.2. Necesarul anual de energie termică

Metoda gradelor-zile (SR 1907 / metoda simplificată):

```
E_înc = (Q_înc / Δt_calcul) · 24 · GZ / 1000     [kWh/an]
```

cu `Q_înc = 42,8 kW`, `Δt_calcul = θ_i − θ_e = 20 − (−18) = 38 K`, `GZ ≈ 3 100 grade-zile` (bază 12 °C, zona Moldova):

```
E_înc = (42 800 / 38) · 24 · 3100 / 1000 = 1126,3 · 24 · 3,1 = 83 780 kWh/an
```

Se aplică factor de ocupare/reglaj termic (recuperare ventilare, prezență) `f = 0,82`:

```
E_înc,net ≈ 68 700 kWh/an
```

### P.3. Consumul electric al pompei de căldură — încălzire

```
W_el,înc = E_înc,net / SCOP = 68 700 / 4,1 = 16 760 kWh/an
```

### P.4. Necesarul de răcire (sezonul cald)

Sarcină de răcire estimată `Q_răc = 32 kW`, ore echivalente la sarcină plină `EFLH_răc ≈ 480 h/an`:

```
E_răc = 32 · 480 = 15 360 kWh/an
W_el,răc = E_răc / SEER = 15 360 / 5,3 = 2 900 kWh/an
```

### P.5. Sinteză consum și cost anual

| Utilizare | Energie utilă (kWh/an) | SCOP/SEER | Consum electric (kWh/an) | Cost (lei/an) la 1,30 lei/kWh |
|-----------|------------------------|-----------|--------------------------|-------------------------------|
| Încălzire | 68 700 | 4,1 | 16 760 | 21 788 |
| Răcire | 15 360 | 5,3 | 2 900 | 3 770 |
| **Total PC** | **84 060** | — | **19 660** | **25 558** |

Comparativ, aceeași energie termică produsă cu cazan gaz (η = 0,92): consum gaz ≈ 74 700 kWh/an → cost la 0,45 lei/kWh ≈ 33 600 lei/an doar încălzirea. Pompa de căldură reduce factura de încălzire cu ~35 % și elimină emisiile locale.

---

## Q. VASUL DE EXPANSIUNE ACM ȘI STAȚIA DE TRATARE / DEDURIZARE A APEI

### Q.1. Vasul de expansiune pentru ACM

Boilerul de ACM (`V_boiler = 500 l`) necesită preluarea dilatării apei la încălzire 10 → 60 °C. Coeficientul de dilatare a apei pe acest interval `e ≈ 0,0171`.

Volum de expansiune:

```
V_e = V_boiler · e = 500 · 0,0171 = 8,55 l
```

Volumul nominal al vasului de expansiune (cu membrană, pentru ACM — tip sanitar, membrană alimentară):

```
V_n = V_e · (P_max + 1) / (P_max − P_0)
```

cu `P_0 = 3,0 bar` (presiune preumflare = presiune rețea), `P_max = 6,0 bar` (presiune supapă siguranță − 10 %):

```
V_n = 8,55 · (6,0 + 1) / (6,0 − 3,0) = 8,55 · 7 / 3 = 19,95 l → se alege V_n = 24 l
```

Se prevede supapă de siguranță ACM tarată la 7 bar și vas de expansiune sanitar 24 l cu membrană certificată contact alimentar.

### Q.2. Stația de tratare / dedurizare

Analiza apei de rețea (zona Moldova): duritate totală `TH ≈ 22 °dH` (apă dură). Peste 15 °dH apar depuneri de calcar în boiler, schimbătoare și pompa de căldură, reducând randamentul și durata de viață.

**Debit de dimensionare dedurizator:** debitul de vârf al clădirii `Q_vârf ≈ 2,4 l/s = 8,6 m³/h`.

**Capacitate ciclică (schimb ionic):**

```
Duritate de eliminat = TH_intrare − TH_țintă = 22 − 8 = 14 °dH
Consum apă zilnic estimat: 60 benef. × 50 l/zi + bucătărie 2000 l = 5000 l/zi = 5 m³/zi
Capacitate necesară între regenerări (7 zile) = 5 · 7 · 14 = 490 °dH·m³
```

Se alege dedurizator duplex (2 coloane, funcționare continuă) cu:
- volum rășină: 25 l/coloană,
- capacitate de schimb: ~5 °dH·m³/l rășină × 25 = 125 °dH·m³/regenerare/coloană,
- interval regenerare volumetric la ~25 m³ tratat,
- consum sare regenerare: ~3,75 kg/regenerare.

| Parametru | Intrare | Ieșire (țintă) |
|-----------|---------|-----------------|
| Duritate totală | 22 °dH | 6–8 °dH (amestec by-pass) |
| Fier | < 0,2 mg/l | — |
| Debit nominal | — | 8,6 m³/h |
| Pierdere sarcină dedurizator | — | ~0,7 bar |

Se lasă o duritate reziduală de 6–8 °dH (prin by-pass reglabil) pentru a evita apa complet moale (corozivă) și a păstra echilibrul calco-carbonic. Pe circuitul de umplere al instalației termice se prevede suplimentar filtru + demineralizare/condiționare chimică (VDI 2035) pentru protecția pompei de căldură.

---

## R. CALCUL ILUMINAT — EXTINDERE PE ÎNCĂ 6 ÎNCĂPERI (METODA FACTORULUI DE UTILIZARE)

### R.1. Metodă

Fluxul luminos total necesar:

```
Φ_total = (E_med · A · F_m) / (U · MF)
```

unde `E_med` — iluminarea medie cerută (NP061, lx), `A` — suprafața (m²), `F_m` = 1/MF (factor de menținere, uzual MF = 0,80), `U` — factor de utilizare (funcție de indicele încăperii k și reflectanțe), `MF` — factor de menținere. Numărul de corpuri:

```
N = Φ_total / Φ_corp
```

Indicele încăperii: `k = (L · l) / [h_u · (L + l)]`, `h_u` = înălțime utilă deasupra planului de lucru.

### R.2. Tabel de calcul (corpuri LED, Φ_corp = 3600 lm, P_corp = 30 W, tip panou 600×600 / plafonieră)

| Încăpere | A (m²) | E cerut (lx) | k | U | MF | Φ_total (lm) | N calc. | N ales | P total (W) | W/m² |
|----------|--------|--------------|-----|------|------|--------------|---------|--------|-------------|------|
| Cabinet medical | 18 | 500 | 0,9 | 0,52 | 0,80 | 21 635 | 6,0 | 6 | 180 | 10,0 |
| Sală kinetoterapie | 45 | 300 | 1,4 | 0,60 | 0,80 | 28 125 | 7,8 | 8 | 240 | 5,3 |
| Sală socializare | 60 | 300 | 1,6 | 0,63 | 0,80 | 35 714 | 9,9 | 10 | 300 | 5,0 |
| Bucătărie | 28 | 500 | 1,1 | 0,55 | 0,80 | 31 818 | 8,8 | 9 | 270 | 9,6 |
| Vestiar personal | 12 | 200 | 0,8 | 0,48 | 0,80 | 6 250 | 1,7 | 2 | 60 | 5,0 |
| Birou administrativ | 16 | 500 | 0,9 | 0,52 | 0,80 | 19 231 | 5,3 | 6 | 180 | 11,3 |
| **Σ extindere** | | | | | | | | **41** | **1 230** | — |

Verificare uniformitate: se dispun corpurile în grilă regulată, raport distanță/înălțime `S/h ≤ 1,5` conform curbei fotometrice → uniformitate `U_o = E_min/E_med ≥ 0,60` (birouri/cabinete) — **conform NP061**. Densitatea de putere pentru iluminat (LPD) sub 12 W/m² în toate încăperile — **conform cerinței nZEB**.

---

## S. BILANȚUL ENERGETIC DETALIAT PE UTILIZĂRI

### S.1. Consumuri anuale pe categorii

| Utilizare | Bază de calcul | Consum (kWh/an) | Pondere (%) |
|-----------|----------------|-----------------|-------------|
| Încălzire (PC) | E_înc/SCOP (cap. P) | 16 760 | 43,4 |
| ACM | 60 benef.×50 l×45 K×365 / (η·860) | 6 420 | 16,6 |
| Ventilare (CTA + ventilatoare) | 2 CTA × 1,5 kW × 3000 h | 8 100 | 21,0 |
| Iluminat | LPD med. × A × ore funcț. | 3 850 | 10,0 |
| Răcire (PC) | E_răc/SEER (cap. P) | 2 900 | 7,5 |
| Forță/prize/echip. bucătărie | bilanț × ore | 4 600 | 11,9 |
| Pompe circulație | 3 pompe × 45 W × 4000 h | 540 | 1,4 |

Corectăm redundanța (ventilarea include ventilatoarele CTA; forța include bucătăria). Recapitulare consolidată:

| Categorie | kWh/an | Pondere (%) | Observație |
|-----------|--------|-------------|------------|
| Încălzire | 16 760 | 40,5 | pompă căldură, SCOP 4,1 |
| ACM | 6 420 | 15,5 | boiler 500 l + recirculare |
| Ventilare mecanică | 8 100 | 19,6 | 2 CTA cu recuperare |
| Iluminat LED | 3 850 | 9,3 | LPD < 12 W/m² |
| Răcire | 2 900 | 7,0 | pompă căldură, SEER 5,3 |
| Forță + echip. bucătărie | 4 600 | 11,1 | utilaje profesionale |
| Pompe/auxiliare | 540 | 1,3 | pompe EEI ≤ 0,20 |
| **TOTAL** | **41 170** | **100** | — |

### S.2. Indicatori sintetici

```
Consum specific total = 41 170 / 900 m² = 45,7 kWh/m²·an
```

Sub pragul de energie primară pentru clădiri nZEB publice (cu factorul energie primară electric ~2,5 și aport fotovoltaic — v. memoriul nZEB). Ponderea dominantă a încălzirii (40,5 %) justifică investiția în pompa de căldură de înaltă eficiență și anvelopa performantă.

---

## T. CALCULUL DEBITULUI DE GAZ ȘI EVACUAREA GAZELOR ARSE — CAZAN BACKUP

### T.1. Debitul de gaz

Cazanul de gaz de rezervă (backup pentru pompa de căldură la temperaturi extreme / mentenanță): `P_util = 40 kW`, randament `η = 0,92`. Puterea de intrare (pe combustibil):

```
P_intrare = P_util / η = 40 / 0,92 = 43,5 kW
```

Puterea calorifică inferioară a gazului natural `H_i = 9,45 kWh/m³` (34,02 MJ/m³):

```
Q_gaz = P_intrare / H_i = 43,5 / 9,45 = 4,60 m³/h
```

Dimensionare conductă gaz (viteză admisă ≤ 6 m/s branșament interior, presiune joasă 20 mbar), pentru `Q = 4,60 m³/h`:

```
D ≈ 18,8 √(Q / v) → pentru v = 4 m/s: D ≈ 18,8·√(4,60/4) ≈ 20 mm int.
```

Se alege conductă DN25 (Ø int. 27 mm) oțel, care asigură viteză < 4 m/s și cădere de presiune sub limita admisă (max. 1 mbar pe traseul interior).

### T.2. Debitul de aer de ardere și evacuarea gazelor arse

Aer teoretic de ardere pentru gaz metan: `≈ 9,52 m³ aer / m³ gaz`; cu exces `λ = 1,2`:

```
V_aer = 4,60 · 9,52 · 1,2 = 52,5 m³/h
```

Volum gaze arse (produse de ardere, umede):

```
V_ga ≈ 4,60 · 11,5 · 1,2 ≈ 63,5 m³/h  (≈ 0,0176 m³/s la stare de referință)
```

### T.3. Dimensionarea coșului de fum / evacuării

Pentru cazan în condensație, evacuare tip C (etanșă, coaxial sau separat), temperatură gaze ~55 °C. Secțiunea coșului din tirajul necesar:

```
A_coș = V_ga / (v_ga · 3600)     [m²]
```

cu viteza gazelor în coș `v_ga = 2 m/s` (tiraj forțat/ventilator cazan):

```
A_coș = 63,5 / (2 · 3600) = 0,00882 m² → D = √(4A/π) = √(4·0,00882/3,1416) = 0,106 m ≈ 106 mm
```

Se alege coș/evacuare **Ø 110 mm** (PP rezistent la condensat, sistem C33 vertical prin acoperiș sau C13 prin perete). Verificare tiraj:

| Parametru | Valoare | Cerință | Stare |
|-----------|---------|---------|-------|
| Ø evacuare | 110 mm | ≥ 106 mm | OK |
| Lungime traseu echiv. | 6,5 m | ≤ L_max producător (12 m) | OK |
| Nr. coturi 90° | 2 | echiv. ~2 m/cot | OK |
| Temp. gaze | 55 °C | condensație (< 80 °C) | OK |
| Evacuare condensat | racord sifon DN32 | obligatoriu | prevăzut |

Priza de aer proaspăt (sistem etanș C) coaxială cu evacuarea; distanțele de amplasare a terminalului față de ferestre/prize aer conform normativului de gaze (min. 0,60 m lateral, 2,20 m sub ferestre).

---

## U. PROTECȚIA LA LEGIONELLA

### U.1. Riscul

Legionella pneumophila proliferează în apă caldă stagnantă la 25–45 °C. Într-un centru pentru vârstnici (populație vulnerabilă, imunitate scăzută), controlul riscului legionella este obligatoriu — dușurile (aerosoli) sunt principala cale de expunere.

### U.2. Măsuri de proiectare

- **Temperatura de stocare ACM: min. 60 °C** permanent în boiler.
- **Temperatura pe returul de recirculare: min. 55 °C** (nu se admite scădere sub 50 °C în niciun punct al rețelei).
- **Recirculare permanentă** cu pompă dedicată — timp de stagnare zero pe coloane; sistemul se dimensionează astfel încât să nu existe brațe moarte (dead-legs) > 5 m.
- Distribuția ACM și recirculare izolate termic pentru a limita pierderea sub 55 °C.

### U.3. Programul de șoc termic (dezinfecție termică)

| Parametru | Valoare | Frecvență |
|-----------|---------|-----------|
| Temperatură șoc în boiler | 70 °C | săptămânal |
| Temperatură la punctele de consum (robinete/dușuri) | ≥ 65 °C, minim 5 min/punct | săptămânal |
| Menținere 70 °C în boiler | 30 min înainte de purjare puncte | săptămânal |
| Verificare temperatură retur recirculare | ≥ 55 °C | zilnic (log BMS) |
| Analiză microbiologică Legionella | < 1000 UFC/l | semestrial (laborator) |

### U.4. Automatizarea și protecția utilizatorului

- Șocul termic se comandă automat din BMS (program orar, noaptea, cu clădirea neocupată).
- La punctele de consum accesibile beneficiarilor se montează **baterii/mitigatoare termostatice** (TMV — thermostatic mixing valve) reglate la 43 °C, care limitează temperatura la robinet pentru protecție la opărire (vârstnici — piele sensibilă), în timp ce rețeaua rămâne la 60 °C.
- În timpul șocului termic la 65 °C, punctele accesibile se izolează (nu se folosesc), evitând opărirea.

---

## V. TOPOLOGIA SISTEMULUI NURSE-CALL ȘI PARAMETRII BMS SUPLIMENTARI

### V.1. Arhitectura nurse-call (extindere)

Sistemul de apel asistență (nurse-call) este organizat pe **bucle de zonă**, cu bus de comunicație redundant și unitate centrală la recepție/cabinet asistent medical.

| Buclă | Zonă deservită | Terminale | Tip apel |
|-------|----------------|-----------|----------|
| B1 | Saloane odihnă P | 4 pere/pat + 4 pull-cord | standard + urgent |
| B2 | Grupuri sanitare P+E1 | 6 pull-cord tavan + 6 buton anulare | urgență (cablu tras, IP44) |
| B3 | Cabinete medicale | 2 buton medical + 2 cod-albastru | urgență medicală |
| B4 | Sală socializare + mese | 4 buton mobil (radio) | asistență |
| B5 | Circulații/coridoare | 6 lampă coridor + buzzer | semnalizare/localizare |

- Fiecare cameră: **lampă de deasupra ușii** (roșu = apel activ) + repetare pe **panoul coridor** + afișare pe **display central** (nr. cameră, tip apel, timp scurs).
- **Buton anulare (reset)** numai din interiorul camerei (confirmă prezența personalului).
- Cablu tras (pull-cord) în grupuri sanitare, montat astfel încât să fie accesibil și de la nivelul pardoselii (persoană căzută).
- Integrare cu telefonia DECT a personalului: apelul se rutează la handset-ul asistentului de serviciu; escaladare automată dacă nu e preluat în 60 s.
- Alimentare din sursă neîntreruptibilă (UPS) — funcționare min. 4 h la cădere rețea.

### V.2. Parametrii BMS suplimentari (praguri de alarmă și scenarii)

| Punct monitorizat | Prag alarmă | Acțiune automată |
|-------------------|-------------|-------------------|
| Temp. tur încălzire | > 50 °C sau < 35 °C | modulare PC / alarmă mentenanță |
| Temp. ACM boiler | < 58 °C | pornire rezistență electrică / cazan backup |
| Retur recirculare ACM | < 55 °C | alarmă legionella + verificare pompă |
| CO₂ sală socializare | > 1000 ppm | creștere debit CTA (free-cooling/aport aer) |
| CO bucătărie (dacă gaz) | > 30 ppm | alarmă + oprire electrovană gaz + evacuare |
| Detector gaz metan | > 20 % LIE | închidere electrovană + ventilare forțată |
| Umiditate saloane | < 30 % / > 60 % | umidificare / dezumidificare |
| Presiune circuit termic | < 1,0 bar | alarmă + oprire pompă (protecție mers uscat) |
| Debit apă rece consum | anomalie (curgere continuă noaptea) | alarmă scurgere / avarie |
| Curent tablou general | > 90 % In | alarmă supraîncărcare |

Scenarii BMS:
- **Scenariu noapte:** reducere debit ventilare la minim igienic, setpoint încălzire −2 °C în spații neocupate, șoc termic legionella programat 02:00–04:00.
- **Scenariu incendiu (de la IDSAI):** oprire CTA (sau comutare desfumare), deblocare uși control acces, oprire generală gaz, iluminat de siguranță pornit.
- **Scenariu economie weekend:** regim redus, monitorizare doar pază/tehnică.

---

## W. MĂSURI DE PROTECȚIE ANTISEISMICĂ A INSTALAȚIILOR (P100 — partea instalații)

### W.1. Context normativ

Conform P100-1 (cap. privind componentele nestructurale) și P100-3, instalațiile (conducte, tubulatură, echipamente, tablouri) sunt **componente nestructurale** care trebuie să reziste la accelerațiile seismice fără să cadă, să se rupă sau să blocheze căile de evacuare. Zona seismică (Moldova): `a_g = 0,20–0,35 g`, `T_C = 0,7 s`.

Forța seismică pe componentă:

```
F_a = (γ_a · a_g · S_a · W_a) / q_a
```

unde `W_a` = greutatea componentei, `S_a` = factor de amplificare pe înălțime, `q_a` = factor de comportare al componentei, `γ_a` = factor importanță (1,5 pentru instalații critice în clădire cu funcțiune socială).

### W.2. Măsuri pe categorii de instalații

| Instalație | Măsură antiseismică | Prescripție |
|------------|---------------------|-------------|
| Conducte termice/sanitare | Susțineri seismice (bride cu contravântuire) la interval ≤ 6 m pe orizontală, ≤ etaj pe verticală | brațe seismice la schimbări de direcție și derivații |
| Tubulatură ventilare | Suporți antiseismici cu tije + contravântuiri longitudinale/transversale | tubulatură > 0,6 m lățime: suport la ≤ 9 m |
| Traversări rosturi seismice | Racorduri flexibile (compensatoare) la trecerea între tronsoane structurale | burduf/compensator axial + lateral |
| Traversări pereți/planșee | Manșoane cu spațiu liber (joc) + material elastic | evită forfecarea conductei la deplasare relativă |
| Echipamente grele (boiler, CTA, PC) | Ancorare la structură prin buloane dimensionate la F_a + amortizoare | verificare smulgere/forfecare buloane |
| Boiler ACM (500 l) | Chingi/coliere antiseismice la min. 2 niveluri + prag de reazem | prevenire răsturnare (raport H/D mare) |
| Tablouri electrice | Fixare rigidă în perete/postament, uși cu zăvor | greutate concentrată — ancoraj la 4 puncte |
| Conducte gaz | Racord flexibil metalic la aparat + robinet cu declanșare seismică | electrovană cu senzor seismic (oprire la cutremur) |
| Corpuri de iluminat suspendate | Cabluri de siguranță secundare | prevenire cădere la balans |
| Sprinklere/IDSAI | Susțineri seismice dedicate (NFPA 13 / P118) + joc la capete | menținere funcțională post-seism |

### W.3. Exemplu de calcul — ancorarea boilerului ACM

Greutate boiler plin: `W_a = 500 l apă + 120 kg tară ≈ 620 kg = 6,08 kN`. Pentru `a_g = 0,30 g`, `S_a = 2,5` (amplificare parter), `q_a = 2,0`, `γ_a = 1,5`:

```
F_a = (1,5 · 0,30 · 2,5 · 6,08) / 2,0 = 3,42 kN (orizontal)
```

Momentul de răsturnare (H_cg ≈ 0,9 m) contracarat prin 2 rânduri de coliere ancorate în perete portant; efortul de smulgere per bulon (4 buloane, braț 0,6 m):

```
T_bulon = F_a · H_cg / (n · braț) = 3,42 · 0,9 / (4 · 0,6) ≈ 1,28 kN
```

Se aleg ancore chimice M12 (rezistență smulgere admisă > 8 kN în beton C20/25) — **coeficient de siguranță > 6** — conform.

### W.4. Principii generale

- Instalațiile pe căile de evacuare nu trebuie să cadă și să blocheze evacuarea (γ_a = 1,5).
- Racordurile flexibile obligatorii la: traversări de rost seismic, racorduri la echipamente vibrante (pompe, CTA), racord gaz la aparat.
- Robinetul seismic de gaz întrerupe automat alimentarea la accelerație > prag (protecție la scurgeri post-seism — cauza majoră a incendiilor secundare).
- Coordonare cu structuristul pentru poziția rosturilor seismice și capacitatea de ancorare a pereților/planșeelor.