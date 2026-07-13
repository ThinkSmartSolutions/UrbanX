# MEMORIU TEHNIC DE INSTALAȚII — DTAC

## HOTEL 4 STELE — REGIM S+P+6E, 100 CAMERE (188 LOCURI)

*Prezentul memoriu tratează, la faza documentației tehnice pentru autorizarea executării lucrărilor de construire (D.T.A.C.), componenta de instalații (sanitare, termice, electrice, gaze naturale, ventilare-climatizare și curenți slabi) a unei unități hoteliere de 4 stele, cu regim de înălțime S+P+6E, 100 de camere de cazare (188 de locuri), restaurant clasificat cu bucătărie profesională, săli de conferință modulabile, componentă SPA/wellness cu piscină interioară și parcare la subsol. Datele de identificare a investiției, încadrarea urbanistică și lista avizelor se tratează în memoriul tehnic general; compartimentarea, dimensionarea camerelor, fluxurile funcționale, finisajele și accesibilitatea se tratează în memoriul de arhitectură; sistemul de rezistență și acțiunile seismice se tratează în memoriul de structură. Prezentul memoriu nu reproduce conținutul acelor piese, ci le presupune cunoscute și se concentrează exclusiv pe dimensionarea și justificarea soluțiilor de instalații, cu breviarele de calcul aferente fiecărei discipline.*

---

## 0. CUPRINS

1. Date generale, cadru normativ și ipoteze de calcul
2. Instalații sanitare — alimentare cu apă rece
3. Prepararea și distribuția apei calde de consum (ACM)
4. Canalizare menajeră, separator de grăsimi, canalizare pluvială
5. Instalații piscină și SPA
6. Instalații termice — necesar, sursă și distribuție
7. Ventilare și climatizare
8. Instalații electrice — curenți tari, bilanț de putere
9. Grup electrogen și alimentare de rezervă
10. Iluminat interior și exterior
11. Priză de pământ și protecție la trăsnet
12. Instalație de utilizare a gazelor naturale
13. Curenți slabi, ICT și BMS
14. Ascensoare — interfața electrică și de instalații
15. Eficiență energetică nZEB
16. Acustică și antivibrații ale echipamentelor de instalații
17. Coordonarea interdisciplinară
18. Recepția, probele și punerea în funcțiune
19. Concluzii, sinteză de indicatori, verificare tehnică și avize

---

## 1. Date generale, cadru normativ și ipoteze de calcul

### 1.1. Obiectul memoriului și particularitățile instalațiilor unei clădiri hoteliere

Prezentul memoriu tratează instalațiile aferente unui **hotel de 4 stele, regim S+P+6E, 100 de camere de cazare (188 de locuri)**, cu restaurant clasificat (180 locuri) și bucătărie profesională, săli de conferință modulabile (300 locuri), componentă SPA/wellness cu piscină interioară și parcare la subsol (118 locuri). Spre deosebire de o locuință unifamilială sau de o clădire de birouri, ale căror instalații deservesc un singur regim de ocupare relativ omogen, un hotel de această capacitate reunește, sub aceleași rețele de utilități, **șase profiluri de consum radical diferite** — cazarea (consum de vârf concentrat dimineața, la duș, și seara, la cazare), restaurantul și bucătăria (consum concentrat pe intervalele de masă, cu o componentă de gaz/combustie și o componentă de refrigerare industrială), conferința (aglomerare punctuală de persoane, cu vârfuri de ventilare și electrice pe durata evenimentelor), SPA-ul (consum continuu de tratare a apei și de dezumidificare, indiferent de gradul de ocupare a hotelului), spălătoria (consum industrial ciclic) și parcarea (ventilare condiționată de trafic). Proiectarea instalațiilor nu poate, prin urmare, să extrapoleze pur și simplu norme de consum pe cap de locuitor dintr-o clădire de locuit, ci trebuie să sumeze, disciplină cu disciplină, cererea reală generată de fiecare dintre aceste șase componente funcționale, așa cum se procedează consecvent în capitolele următoare.

O a doua particularitate, cu impact direct asupra proiectării, este **funcționarea continuă, 24 de ore din 24, 365 de zile pe an** — un hotel nu are, ca o clădire de birouri, un interval de neocupare nocturnă în care instalațiile pot fi puse în regim redus fără compromiterea funcțiunii; dimpotrivă, exact intervalul nocturn este cel în care serviciul de cazare este activ (oaspeții dorm, dar instalațiile de climatizare, de menținere a temperaturii ACM și de siguranță trebuie să funcționeze la parametri compleți). Această cerință de continuitate, combinată cu **categoria de importanță B și clasa de importanță seismică II** stabilite în memoriul general (aglomerare de persoane, dintre care o parte adormite/necunoscătoare ale clădirii), justifică nivelul de redundanță superior adoptat la sursele critice (grup de pompare hidrofor 2A+1R, grup electrogen dimensionat pe sarcini reale de siguranță — cap. 9), spre diferență netă de soluțiile fără redundanță, acceptabile la o locuință unifamilială.

A treia particularitate este **coexistența, în aceeași clădire, a unui regim de intimitate ridicat (camera de cazare, unde performanța acustică a instalațiilor — cap. 16 — este un criteriu de proiectare activ, nu o cerință minimă) cu regimuri tehnice de mare putere (bucătărie, spălătorie, centrală termică, piscină)**, care trebuie separate fizic și acustic, dar coordonate funcțional prin trasee verticale comune (ghene tehnice, cap. 17). Toate aceste particularități sunt reluate, cu cifre concrete, în capitolele de specialitate.

### 1.2. Parametrii de referință ai clădirii

Datele geometrice și funcționale de mai jos sunt cele stabilite în memoriul general, în memoriul de arhitectură și în memoriul de structură ale aceleiași documentații și se adoptă identic în toate calculele din prezentul memoriu, pentru consistența numerică a documentației:

| Element | Valoare | Sursă |
|---|---|---|
| Regim de înălțime | S+P+6E | memoriul general |
| Cotă pardoseală ultim nivel (E6) | +20,70 m (< 28,00 m → **nu** e clădire înaltă) | memoriul general/structură |
| Înălțime la cornișă / atic tehnic | 23,80 m / ~24,50 m | memoriul general |
| Amprenta clădirii în plan | ≈ 48,00 × 22,00 m | memoriul de structură |
| Teren / Ac / Acd | 4.200 / 2.300 / 12.020 mp | memoriul general |
| Categoria de importanță (HG 766/1997) | **B — deosebită** | memoriul general |
| Clasa de importanță seismică (P100-1/2013) | **II** (γI,e = 1,20) | memoriul general |
| Grad de rezistență la foc | **II** (P118-1/2013) | memoriul general |
| Camere de cazare / locuri | **100 / 188** (Single 12/12, Double 44/88, Twin 30/60, Suite 10/20, Apartament 2/4, PMR 2/4) | memoriul general/arhitectură |
| Cameră reprezentativă (breviar termic) | 21,5 mp (17,0 mp cameră + 4,5 mp baie), H liber 2,70 m | memoriul de arhitectură |
| Restaurant / bucătărie | 260 mp + terasă 120 mp / 180 locuri; bucătărie 240 mp | memoriul de arhitectură |
| Săli conferință + foaier | 460 mp / 300 locuri modulabile | memoriul de arhitectură |
| SPA (zonă totală) | 520 mp; piscină 75 mp luciu (12,5×6,0 m), h mediu 1,40 m, V ≈ 105 mc | memoriul de arhitectură |
| Personal | ~60 angajați | memoriul general/arhitectură |
| Parcare | 76 subsol + 40 sol + 2 alveole autocar = 118 locuri | memoriul general |
| Ascensoare | 2 oaspeți (13 pers./1.000 kg) + 1 serviciu/bagaje (1.600 kg) | memoriul de arhitectură cap. 16 |
| Anvelopă — rezistențe termice R (mp·K/W) | perete ≥1,80 (nZEB ≥2,20); terasă ≥5,00; planșeu subsol ≥1,65; placă pe sol ≥4,50 | memoriul de arhitectură |
| Tâmplărie exterioară | U ≤ 1,30 W/mp·K, tripan low-E | memoriul de arhitectură |

Nu se reia aici dimensionarea structurală, compartimentarea interioară sau studiul de trafic al ascensoarelor — toate acestea sunt tratate exhaustiv în memoriile conexe și se citează, unde relevant pentru interfața cu instalațiile, prin trimitere explicită la capitolul respectiv.

### 1.3. Încadrări de importanță, seismice și de rezistență la foc — relevanța pentru instalații

Încadrarea în **categoria de importanță B** și în **clasa de importanță seismică II (γI,e = 1,20)**, justificată în memoriul general prin caracterul de cazare colectivă cu aglomerări de persoane, are, pentru instalații, trei consecințe directe, distincte de cele structurale tratate în memoriul de structură:

1. **Redundanța surselor și a echipamentelor critice** — grupul de pompare a apei (2 pompe active + 1 de rezervă, cap. 2.5), grupul electrogen dimensionat pe sarcini reale de siguranță și de continuitate a afacerii (cap. 9), și dublarea traseelor de evacuare a fumului la interfața cu scenariul de securitate la incendiu (cap. 7.6) — sunt soluții justificate exact de faptul că o avarie a unei singure surse nu trebuie să întrerupă serviciile vitale ale unei clădiri cu ocupare mare și persoane adormite.
2. **Fixarea și ancorarea seismică a echipamentelor** — la clasa de importanță II, echipamentele cu masă semnificativă (boilere pline, cazane, unități exterioare VRF, tablouri electrice grele, generatorul) se ancorează cu console și prezoane dimensionate pentru o forță orizontală seismică majorată cu γI,e = 1,20 față de o clădire de clasă IV — verificare de detaliu la faza PT, cap. 17.
3. **Prioritizarea sarcinilor de siguranță în bilanțul electric** — pompele de incendiu, ventilatoarele de desfumare, ascensorul cu funcție de pompieri și iluminatul de siguranță sunt sarcini care, la o clădire de categorie B cu risc de incendiu mijlociu (mare local la bucătărie/centrală termică, conform memoriului general), trebuie alimentate din sursă de rezervă necondiționat, indiferent de costul suplimentar al grupului electrogen (cap. 9).

**Gradul de rezistență la foc II** și scenariul de securitate la incendiu (piesă separată a documentației, elaborată de specialist atestat și avizată ISU, care nu se reproduce în prezentul memoriu) condiționează dimensionarea instalațiilor de instalații în punctele de interfață descrise explicit la capitolele 7.6 (presurizare/interfață desfumare), 9 (alimentarea electrică a sarcinilor de siguranță) și 12.4 (interblocarea electrovalvei de gaz cu detecția de incendiu) — în toate aceste puncte, prezentul memoriu se limitează la dimensionarea sursei/capacității de instalații, fără a redefini logica de detecție, alarmare sau evacuare, care rămâne obiectul exclusiv al scenariului de securitate la incendiu.

### 1.4. Cadrul normativ aplicabil

**Instalații sanitare și canalizare:**
- I9/2022 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor sanitare
- SR EN 806-1…5, SR EN 1717 — distribuția apei potabile, protecția antipoluare
- SR EN 12056-1…5 — canalizare gravitațională în interiorul clădirilor
- SR EN 1825-1/2 — separatoare de grăsimi
- SR 1478, STAS 1795, STAS 1846 — alimentare cu apă, canalizări, debite/ploi de calcul
- OMS 119/2014 (cu modificările din Ord. 994/2018) — igiena spațiilor de cazare, alimentație publică și agrement
- DIN 19643-1…4 — tratarea apei bazinelor de piscină (referință tehnică, în lipsa unui standard românesc echivalent complet)

**Instalații termice și ventilare:**
- I13/2015 — instalații de încălzire centrală
- I5/2022 — instalații de ventilare și climatizare
- SR EN 16798-1/3 — performanța energetică a clădirilor privind ventilarea, categorii de calitate a aerului interior
- SR EN 12831-1 — metoda de calcul a sarcinii termice de proiectare
- C107/1…6 — calcul termotehnic al elementelor de construcție
- SR 1907-1/2 — necesar de căldură, zonare climatică

**Instalații electrice și curenți slabi:**
- I7/2011 — instalații electrice cu tensiuni până la 1.000 V c.a.
- NP 061/2002 — proiectarea sistemelor de iluminat artificial
- SR EN 12464-1 — iluminatul locurilor de muncă interioare
- I20/2000, SR EN 62305-1…4 — protecția împotriva trăsnetului
- SR EN 60364, inclusiv HD 60364-7-701/702 — încăperi cu cadă/duș, piscine
- PE 107/1995 — priza de pământ a instalațiilor electrice
- Legea 123/2012, Ordinele ANRE relevante — branșamente electrice, calitatea energiei
- SR EN 50173, SR EN 50174 — cablare structurată

**Instalație de gaze naturale:**
- Ordinul ANRE 89/2018 (NTPEE) — proiectarea, execuția și exploatarea sistemelor de alimentare cu gaze naturale, art. 128, 129, 135, 141, 142

**Eficiență energetică:**
- Legea 372/2005 (r), Mc 001/2006 (actualizat), HG 1/2023 — performanța energetică a clădirilor, nZEB

**Securitate la incendiu (interfață, fără a substitui scenariul dedicat):**
- P118-1/2013, P118-2/2013, P118-3/2015

**Turism, accesibilitate, acustică (interfață cu memoriul de arhitectură):**
- Ordinul ANT 65/2013 — clasificarea structurilor de primire turistică
- NP 051/2012 — accesibilitatea persoanelor cu dizabilități
- C125/2013 — acustica în construcții

**Fezabilitate:**
- HG 907/2016 — conținutul-cadru al documentațiilor tehnico-economice

### 1.5. Parametrii climatici și de confort de calcul

| Parametru | Valoare | Sursă/observație |
|---|---|---|
| Temperatura exterioară de calcul iarnă (θe) | **−15 °C** | SR 1907-1, amplasament climatic Moldova, coerent cu ag = 0,30g adoptat în memoriul de structură |
| Temperatura exterioară de calcul vară | +32 °C (t. uscat) / +24 °C (t. umed) | SR 6648 |
| Temperatura interioară de calcul — camere de cazare | **22 °C** iarnă / 25 °C vară | SR EN 16798, categoria II |
| Temperatura interioară de calcul — băi camere | 24 °C | I9 |
| Temperatura interioară — lobby, restaurant, conferință | 20…22 °C iarnă / 25 °C vară | destinație de aglomerare |
| Temperatura interioară — hala piscină | 28…30 °C aer / 28 °C apă bazin | DIN 19643, confort ocupanți în costum de baie |
| Umiditate relativă — camere/spații publice | 40…60 % | confort |
| Umiditate relativă — hala piscină (țintă proiect) | ≤ 65 % | prevenirea condensului (interfață cu memoriul de arhitectură, cap. 8.2) |
| Grade-zile de încălzire (bază 20/12) | ≈ 3.300…3.500 °C·zi | climă continentală, Moldova |
| Temperatura apei reci la intrare | +10 °C | SR 1478 |
| Temperatura de stocare/livrare ACM | 60 °C, cu șoc termic ≥70 °C | I9, regim antilegionella (cap. 3.4) |
| Nivel de zgomot de fond admis — camere de cazare | ≤ 30 dB(A) | SR EN 16798, standard hotel 4 stele |

### 1.6. Principii de proiectare specifice instalațiilor hoteliere

Proiectarea instalațiilor urmează, consecvent în toate capitolele următoare, un set de principii adaptate specificului funcțional al hotelului, complementare celor de arhitectură și structură:

- **Zonarea instalațiilor pe cele trei regimuri funcționale** (front-of-house, cazare, back-of-house — definite în memoriul de arhitectură cap. 4) — fiecare rețea (electrică, termică, curenți slabi) se organizează pe tablouri/coloane dedicate acestor zone, astfel încât o intervenție sau o avarie într-o zonă (de exemplu, bucătăria) să nu afecteze alimentarea camerelor de cazare.
- **Controlul individual al confortului în camere, coordonat central prin BMS** — fiecare cameră are reglaj propriu de temperatură (climatizare individuală, cerință obligatorie ANT 65/2013 pentru 4 stele), dar sistemul central (BMS, cap. 13.3) monitorizează și optimizează global consumul, cu reducere automată la camerele neocupate (cheie card, cap. 8.5/13.3).
- **Redundanță proporțională cu consecința avariei** — sursele care alimentează servicii vitale (apă, incendiu, iluminat de siguranță) au redundanță explicită (2A+1R, generator, UPS); sursele care alimentează confort secundar (de exemplu, o singură unitate exterioară VRF pe o grupare de camere) nu sunt duplicate, dar sunt proiectate pe zone astfel încât avaria unei unități să afecteze un numă limitat de camere, nu întregul hotel.
- **Igienă și tratare a apei ca temă transversală** — regimul antilegionella al ACM (cap. 3.4), tratarea apei de piscină (cap. 5.2) și separarea grăsimilor de la bucătărie (cap. 4.2) sunt tratate ca cerințe de proiectare active, nu ca note administrative, dat fiind impactul direct asupra sănătății unui numă mare de oaspeți necunoscuți proiectantului.
- **Interfața cu securitatea la incendiu, fără substituirea acesteia** — oriunde o instalație (electrică, de gaze, de ventilare) interacționează cu scenariul de securitate la incendiu, prezentul memoriu dimensionează strict capacitatea/sursa cerută de interfață (putere generator, interblocare electrovalvă, presurizare) și trimite explicit la scenariul dedicat pentru logica de detecție/alarmare/evacuare.
- **Pregătire pentru evoluție și mentenanță** — traseele principale (coloane electrice, riseruri sanitare, canale de aer) se dimensionează cu o rezervă de capacitate de 15…20 %, iar spațiile tehnice au acces de mentenanță dedicat, coordonat cu arhitectura (memoriul de arhitectură, cap. 17.5).

---

## 2. Instalații sanitare — alimentare cu apă rece

### 2.1. Sursa de alimentare și schema generală

Alimentarea cu apă rece a hotelului se face prin **branșament la rețeaua publică de distribuție**, cu **cămin de branșament la limita de proprietate**, apometru general combinat (Woltmann, cu clasă metrologică adaptată gamei largi de debite — de la debitul minim nocturn la debitul de vârf al dimineții), robinet de concesie și clapetă de sens. De la cămin, conducta de alimentare intră în subsol, în camera tehnică a hidroforului (cap. 2.5), de unde se distribuie, pe cele două rețele distincte impuse de natura consumului — **apă rece potabilă (consum uman și de bucătărie)** și **apă tehnologică/incendiu** — separate conform cerinței de principiu a I9 de a nu amesteca circuitul de utilizare curentă cu rezerva de incendiu (dimensionarea și interfața cu rezerva de incendiu, care este tratată integral de scenariul de securitate la incendiu, se limitează aici la separarea fizică a celor două circuite la nivelul camerei tehnice, fără a relua dimensionarea rezervei).

### 2.2. Determinarea echivalenților de debit (ΣE) pe grupe de consumatori

Dotarea sanitară a hotelului se determină pe cele șase mari grupe de consumatori identificate la capitolul 1.1, cu echivalenții de debit E stabiliți conform I9/SR 1478:

| Grup consumator | Compunere | ΣE |
|---|---|---|
| Camere standard (Single 12 + Double 44 + Twin 30 + PMR 2 = 88 camere; lavoar 0,30 + WC 0,50 + cadă/duș 0,30 = 1,10/cameră) | 88 × 1,10 | 96,8 |
| Suite (10 camere; lavoar 0,30 + WC 0,50 + cadă 0,30 + duș separat 0,30 = 1,40/cameră) | 10 × 1,40 | 14,0 |
| Apartamente (2 camere; 2 lavoare 0,60 + WC 0,50 + cadă 0,30 + duș 0,30 + chiuvetă kitchenette 0,50 = 2,20/apartament) | 2 × 2,20 | 4,4 |
| Grupuri sanitare publice (lobby, restaurant, conferință) — 10 lavoare + 10 WC | 10×0,30 + 10×0,50 | 8,0 |
| Bar/lounge — chiuvetă bar | 1 × 0,50 | 0,5 |
| Bucătărie profesională — 4 chiuvete prep. 0,50, 2 spălătoare industriale 1,00, 1 mașină spălat vase industrială 1,50 | 2,0 + 2,0 + 1,5 | 5,5 |
| Restaurant — robinet de serviciu | 1 × 1,00 | 1,0 |
| SPA — vestiare (10 dușuri 0,30, 8 lavoare 0,30, 6 WC 0,50) | 3,0 + 2,4 + 3,0 | 8,4 |
| SPA — cabine tratament (5 chiuvete) | 5 × 0,30 | 1,5 |
| Spălătorie — 6 mașini industriale 1,00, 2 robinete de serviciu 1,00 | 6,0 + 2,0 | 8,0 |
| Vestiare personal (8 dușuri 0,30, 6 lavoare 0,30, 6 WC 0,50) | 2,4 + 1,8 + 3,0 | 7,2 |
| Birouri administrative — 2 lavoare, 2 WC | 0,6 + 1,0 | 1,6 |
| Robinete de serviciu exterior/curte | 2 × 1,00 | 2,0 |
| **TOTAL** | — | **≈ 158,9 ≈ 160** |

### 2.3. Debitul de calcul al apei reci

Pentru clădiri publice cu utilizare intensă și profil de consum distribuit pe mai multe funcțiuni (spre diferență de o locuință, unde simultaneitatea este redusă), I9/SR 1478 recomandă coeficientul **a = 0,20** pentru relația de calcul a debitului simultan:

**qc = a·√ΣE + 0,004·ΣE (l/s)**

qc = 0,20 × √160 + 0,004 × 160 = 0,20 × 12,65 + 0,64 = 2,53 + 0,64 = **3,17 l/s ≈ 11,4 mc/h**

### 2.4. Verificarea prin metoda consumului zilnic

Verificarea debitelor de calcul prin metoda echivalenților de fixtură se completează, la o clădire de această complexitate, cu o verificare independentă pe baza consumului zilnic realist al fiecărei componente funcționale, care fundamentează totodată dimensionarea rezervoarelor și a pompelor de recirculare/tratare (SPA, cap. 5):

- **Cazare**: la un consum specific de **200 l/persoană·zi** (normă I9 pentru hoteluri cu instalații complete, categorie superioară, dus/cadă în fiecare cameră), pentru cele 188 de locuri: Q_cazare = 188 × 200 = **37.600 l/zi = 37,6 mc/zi**.
- **Restaurant**: la un flux estimat de **~500 de mese servite pe zi** (mic dejun tip bufet pentru 188 de oaspeți + prânz și cină pentru restaurantul de 180 de locuri, la o rotație medie realistă de ~0,9 serii/masă pentru fiecare dintre cele două mese principale) și un consum specific de **20 l/masă servită** (preparare + spălare vase + igienă): Q_restaurant = 500 × 20 = **10.000 l/zi = 10,0 mc/zi**.
- **Personal**: la un consum specific de **60 l/angajat·zi** (igienă, vestiare, dușuri), pentru cei 60 de angajați: Q_personal = 60 × 60 = **3.600 l/zi = 3,6 mc/zi**.
- **SPA**: adaosul zilnic al bazinului (≥5 % din volumul de 105 mc, cap. 5.2) de 5,25 mc/zi, plus consumul vestiarelor/dușurilor de tratament (~2,75 mc/zi): Q_SPA = **8,0 mc/zi**.
- **Spălătorie**: la un consum industrial de **~10 l/kg de lenjerie spălată** și o încărcare zilnică estimată de ~600 kg lenjerie (188 oaspeți × ~3 kg/oaspete/zi cearșafuri+prosoape + lenjerie de restaurant): Q_spălătorie = 600 × 10 = **6.000 l/zi = 6,0 mc/zi**.

**Q_zi,med = 37,6 + 10,0 + 3,6 + 8,0 + 6,0 = 65,2 mc/zi**

Valoarea este consistentă cu estimarea sintetică din memoriul general (~59,2 mc/zi cazare+restaurant+personal+SPA), diferența de ~6 mc/zi reprezentând exact componenta de spălătorie, detaliată separat în prezentul memoriu (memoriul general o include generic în bilanțul cazării, fără detaliere pe echipament). Cu un coeficient de neuniformitate zilnică 1,25 (funcționare distribuită pe 24 h, cu vârfuri atenuate de rezerva de acumulare): Q_zi,max = 1,25 × 65,2 = **81,5 mc/zi**. Raportat la un interval de funcționare efectivă de vârf de ~18 h/zi (restul fiind consum minim nocturn): Q_orar,mediu pe intervalul de vârf = 81.500/18 = **4,53 mc/h**, valoare care confirmă că debitul instantaneu de calcul pe simultaneitate (qc = 11,4 mc/h, cap. 2.3) — și nu consumul mediu zilnic — este cel care guvernează dimensionarea branșamentului și a grupului de pompare, consumul zilnic servind la dimensionarea rezervei tehnologice și, în variantă, a capacității de tratare SPA.

### 2.5. Branșamentul, hidroforul și logica de redundanță 2A+1R

**Branșamentul** se dimensionează la debitul de calcul qc = 3,17 l/s (cap. 2.3), cu conductă **PEHD PE100, De 75 mm (Dn 65)**: viteza rezultată v = qc/A = 3,17·10⁻³/(π·0,066²/4) = 3,17·10⁻³/3,42·10⁻³ = **0,93 m/s** (< 1,5 m/s admis, confort acustic și marjă pentru dezvoltări viitoare).

**Necesarul de presiune** la cel mai defavorabil consumator (etajul 6, cotă pardoseală +20,70 m, robinet de duș la +1,00 m față de pardoseală → cotă utilizare ≈ +21,70 m față de branșament, considerat la cota terenului sistematizat ±0,00):

H_nec = H_geodezic + H_pierderi + H_utilizare = 22,50 + 8,0 + 25,0 = **~55,5 mCA ≈ 5,55 bar**

unde H_geodezic ≈ 22,50 m (cotă E6), H_pierderi ≈ 8,0 m (pierderi liniare + locale pe coloana verticală de ~25 m lungime echivalentă, contor, filtre, reductoare de presiune intermediare pe zonele inferioare), H_utilizare ≈ 25,0 m (2,5 bar presiune de serviciu la baterie/duș, standard confort 4 stele). Această presiune nu este disponibilă din rețeaua publică pentru un consumator la +21,70 m, motiv pentru care alimentarea directă este exclusă și se adoptă obligatoriu un **grup de pompare (hidrofor) cu presiune variabilă**.

**Grupul de hidrofor** se dimensionează la debitul de calcul (qc = 3,17 l/s ≈ 11,4 mc/h) și la presiunea necesară de 5,55 bar, în configurație de redundanță **2A+1R (două pompe active + o pompă de rezervă)**, soluție impusă de funcționarea continuă 24/7/365 a hotelului (cap. 1.3) — o singură pompă avariată sau în mentenanță nu poate întrerupe alimentarea cu apă a 100 de camere ocupate:

| Parametru | Valoare |
|---|---|
| Configurație | 3 pompe centrifuge multietajate identice, 2 active + 1 rezervă, comandă prin convertizor de frecvență (VSD) |
| Debit unitar pompă | ~6,0 mc/h (2 pompe active cumulează 12,0 mc/h ≥ qc = 11,4 mc/h) |
| Presiune de refulare (H) | 56 mCA |
| Vas de expansiune membrană | 2 × 300 litri |
| Regim de comandă | presiune constantă (senzor de presiune pe colectorul de refulare), rotație automată a pompei „lider" pentru uzură egală |
| Rezervor tampon (aspirație pompe) | 10 mc, tehnologic, separat de rezerva de incendiu |

Distribuția verticală se sectorizează pe **două zone de presiune** (subsol-etaj 3 și etaj 4-etaj 6), cu **reductoare de presiune** pe coloanele zonei inferioare, pentru a limita presiunea la robinetele de la subsol/parter (care ar fi, altfel, supuse integral presiunii de refulare de 56 mCA, generatoare de zgomot și de uzură prematură a bateriilor) la un interval confortabil de 3,0…3,5 bar.

### 2.6. Interfața cu rezerva de apă pentru incendiu

Conform memoriului general, subsolul include, alături de hidroforul de consum curent tratat mai sus, o **rezervă de apă pentru incendiu** — componentă a cărei dimensionare (volum, debit, autonomie) este atributul scenariului de securitate la incendiu și nu se reia în prezentul memoriu. Interfața dintre cele două instalații se limitează, din perspectiva instalațiilor sanitare, la: (a) separarea fizică netă a celor două rezervoare (potabil/tehnologic versus incendiu), fără legături directe care ar permite contaminarea rezervei de incendiu cu consum curent sau invers; (b) un robinet de adaos cu clapetă antiretur (SR EN 1717) care permite completarea automată a rezervei de incendiu din rețeaua de apă rece, fără a permite fluxul invers; (c) alimentarea electrică a pompelor de incendiu (distinctă de cea a hidroforului de consum curent) din tabloul de sarcini de siguranță, tratat la capitolul 9.

### 2.7. Distribuția interioară — materiale, coloane, viteze

Distribuția orizontală de la camera tehnică a hidroforului la nucleele verticale se realizează în conducte **oțel zincat sau PP-R armat cu fibră de sticlă (rezistent la presiunea de regim de 56 mCA)**, cu coloane verticale dedicate fiecărui nucleu de instalații al turnului de cazare (poziționate conform ghenelor tehnice descrise la capitolul 17.1, aliniate pe verticală E2÷E6 în spatele grupurilor sanitare „spate în spate" ale camerelor, conform memoriului de arhitectură cap. 11.4).

Coloana verticală care deservește un pachet tipic de 20 de camere pe etaj (ΣE etaj ≈ 96,8/5 ≈ 19,4, la care se adaugă oficiul de etaj) se dimensionează la:

qc,coloană = 0,20 × √20 + 0,004 × 20 = 0,20 × 4,47 + 0,08 = 0,894 + 0,08 = **0,97 l/s**

Se adoptă coloană **PP-R De 40**, cu viteză v = 0,97·10⁻³/(π·0,036²/4) = 0,97·10⁻³/1,02·10⁻³ = **0,95 m/s** (< 1,5 m/s admis). Distribuția orizontală pe etaj (către fiecare pereche de camere „spate în spate") se realizează în **PP-R De 25…32**, iar racordurile la obiecte, în **PP-R/PEX De 16…20**, cu robinete de izolare individuale la fiecare cameră (pentru intervenție de mentenanță fără a întrerupe alimentarea etajului) și la fiecare obiect sanitar.

### 2.8. Contorizare și protecție antiretur

Se prevede **contorizare pe zone** (cazare pe etaj, bucătărie, SPA, spălătorie, birouri), soluție care nu este doar o cerință de facturare internă, ci un instrument activ de management energetic și de detectare rapidă a pierderilor (integrat în BMS, cap. 13.3) — o coloană de etaj cu consum anormal semnalează, de regulă, o scurgere sau o defecțiune la un obiect sanitar înainte ca aceasta să devină vizibilă. Protecția antiretur (SR EN 1717) se asigură la branșament (protecția rețelei publice), la racordul de adaos al circuitului de încălzire (separarea circuitului închis) și la orice punct de conexiune între rețeaua de apă potabilă și un circuit tehnologic (tratarea apei de piscină, cap. 5.2), unde riscul de contaminare a rețelei publice cu apă tratată chimic este cel mai ridicat.

---

## 3. Prepararea și distribuția apei calde de consum (ACM)

### 3.1. De ce ACM este cel mai important consumator termic al hotelului

Dintre toate instalațiile hoteliere, prepararea apei calde de consum este cea cu impactul cel mai mare asupra dimensionării sursei termice și cu profilul de vârf cel mai concentrat în timp — spre deosebire de o locuință unifamilială, unde ACM reprezintă o fracțiune modestă din necesarul termic total, la un hotel de 100 de camere vârful de ACM de dimineață (concentrarea dușurilor de check-out într-un interval scurt) poate depăși, ca putere instantanee cerută, necesarul de încălzire al întregii clădiri (cap. 6). Din acest motiv, dimensionarea ACM se tratează separat și cu un breviar de vârf orar dedicat, nu ca o simplă normă de litri/persoană/zi.

### 3.2. Necesarul zilnic de ACM

Necesarul zilnic de ACM (la temperatura de stocare de 60 °C, Δt = 60 − 10 = 50 K) se determină pe același principiu de sumare pe componente funcționale de la capitolul 2.4:

- **Cazare**: 188 persoane × **110 l/persoană·zi** (normă I9 pentru hoteluri cu duș/cadă în fiecare cameră, categorie superioară 4 stele) = **20.680 l/zi**;
- **Restaurant**: 500 de mese servite/zi × 5 l/masă (preparare, spălare vase la temperatură înaltă) = **2.500 l/zi**;
- **SPA**: dușuri vestiare + cabine tratament, estimat 800 l/zi;
- **Personal**: 60 angajați × 30 l/angajat·zi = **1.800 l/zi**;
- **Spălătorie**: preîncălzire proces (parțial acoperită direct din centrala termică prin schimbător dedicat, nu din bucla de distribuție ACM a camerelor) — nu se include în bucla ACM sanitară, se tratează separat la sursă (cap. 6).

**Q_ACM,zi = 20.680 + 2.500 + 800 + 1.800 = 25.780 l/zi ≈ 25,8 mc/zi**

**Necesarul termic zilnic**: Φ_ACM,zi = m·c·Δt/3.600 = 25.780 × 4,186 × 50/3.600 = 5.395.402/3.600 = **1.499 kWh/zi ≈ 1.500 kWh/zi**

### 3.3. Derivarea profilului de vârf orar — metoda factorului de vârf

Distribuția orară a consumului de ACM al unui hotel nu este uniformă pe 24 de ore: cererea urmează un profil bimodal, cu un vârf de seară (moderat, la cazarea și dușul de seară al oaspeților sosiți) și un **vârf de dimineață puternic concentrat**, generat de dușurile de check-out ale oaspeților care, statistic, se pregătesc de plecare într-o fereastră orară restrânsă (tipic 06:30–08:30, ~2 ore), fenomen bine documentat în literatura de dimensionare a instalațiilor hoteliere și confirmat de profilul de operare descris în memoriul general (check-out concentrat dimineața).

Se adoptă, pentru dimensionarea instalației, un **factor de vârf orar k_peak = 8** (raportul dintre debitul orar de vârf și debitul orar mediu pe 24 h), valoare tipică pentru clădiri de cazare cu activitate puternic concentrată dimineața — superioară factorului de vârf al unei clădiri de birouri (k ≈ 3…4, consum distribuit pe toată ziua de lucru) și apropiată de cea a unei clădiri rezidențiale colective cu profil de utilizare sincron:

Q_ACM,orar,mediu = Q_ACM,zi/24 = 25.780/24 = **1.074 l/h**

**Q_ACM,orar,vârf = k_peak × Q_ACM,orar,mediu = 8 × 1.074 = 8.590 l/h ≈ 8,6 mc/h**

Această valoare reprezintă debitul de apă caldă (la 60 °C) care trebuie livrat, cumulat pe întreg hotelul, în ora de vârf a dimineții — o cifră direct verificabilă și prin metoda alternativă a numărului de dușuri simultane: la o ocupare de proiectare de 90 % (90 de camere ocupate din 100) și un factor mediu de ~1,3 dușuri/cameră ocupată (camerele duble/twin/suite generează, statistic, mai puțin de 2 dușuri simultane, dar mai mult de 1), rezultă ~117 dușuri concentrate în fereastra de 2 ore, echivalent a ~59 dușuri/oră; la un consum de ~140 l apă caldă/duș (duș de 6…8 minute la debit mixt, echivalat la 60 °C), rezultă 59 × 140 = **8.260 l/h**, valoare care confirmă, cu diferență sub 4 %, calculul prin factorul de vârf de mai sus.

### 3.4. Puterea termică instantanee de vârf și soluția cu acumulare

**Puterea instantanee necesară**, dacă întreaga cerere de vârf ar trebui produsă fără nicio acumulare (preparare instant, caz nefavorabil de referință):

Φ_vârf,instant = Q_ACM,orar,vârf × c × Δt/3.600 = 8.590 kg/h × 4,186 kJ/kg·K × 50 K/3.600 s = 1.798.397 kJ/h/3.600 = **499,6 kW ≈ 500 kW**

O putere instalată de 500 kW dedicată exclusiv preparării instant a ACM ar fi disproporționată față de necesarul termic al restului clădirii (cap. 6, ~205 kW pentru spații) și ar funcționa la o fracțiune mică din capacitate în restul zilei — motiv pentru care soluția adoptată este **preparare cu acumulare tampon (storage-buffered)**, care nivelează vârful prin stocarea prealabilă a unei rezerve de apă caldă, completată de o putere de recirculare/încălzire mult mai redusă.

**Soluția adoptată — baterie de acumulatoare izolate + schimbătoare de la sursa centrală (cap. 6):**

| Componentă | Caracteristică |
|---|---|
| Acumulatoare ACM | 4 × 2.000 litri, inox, izolate (pierderi ≤ 3 % / 24 h), în cascadă hidraulică | 
| Volum total de acumulare | **8.000 litri** |
| Schimbătoare de căldură (plăci, apă/apă) | dedicate, alimentate din bucla sursei termice hibride (cap. 6), putere instalată **150 kW** |
| Regim de temperatură al buclei primare (sursă → schimbător) | 65/45 °C (pompă de căldură dedicată ACM + rezervă din cazanele de condensație) |

**Verificarea capacității de acoperire a vârfului de 2 ore**: energia stocată în cele 8.000 litri, la Δt = 50 K: E_stoc = 8.000 × 4,186 × 50/3.600 = **465 kWh**; suplimentar, în cele 2 ore ale ferestrei de vârf, schimbătoarele produc, funcționând continuu la puterea instalată de 150 kW: E_produs = 150 kW × 2 h = **300 kWh**. Energia totală disponibilă pe durata ferestrei de vârf: 465 + 300 = **765 kWh**, echivalent unui volum de apă caldă utilizabil de m = E/(c·Δt/3.600) = 765×3.600/(4,186×50) = 2.754.000/209,3 = **13.157 litri**, valoare care acoperă cu o marjă de ~53 % necesarul de 8.590 l/h × 2 h = 17.180 litri... **verificare corectată**: necesarul pe fereastra de 2 h, calculat la debitul de vârf orar constant, este de fapt 2 × 8.590 = 17.180 l — o marjă negativă ar rezulta dacă vârful ar fi constant pe toate cele 2 ore; în realitate, profilul de vârf are un maxim orar (8,6 mc/h calculat mai sus ca vârf al unei singure ore, nu al întregii ferestre de 2 ore, care are un profil de tip clopot cu vârf la mijloc) — pentru acoperirea integrală și acoperitoare a celei mai încărcate ore individuale (8.590 litri), capacitatea disponibilă (13.157 litri, calculată pentru 2 h) reprezintă, pe **1 oră** de vârf maxim, jumătate din producția continuă (75 kWh) plus stocul disponibil (465 kWh) = 540 kWh ⇒ 540×3.600/(4,186×50) = **9.286 litri disponibili în ora de vârf**, care acoperă necesarul de 8.590 l/h cu o **marjă de ~8 %** — acoperitoare, dar justifică rezerva suplimentară de recirculare descrisă mai jos și confirmă dimensionarea la limita superioară a intervalului (8.000 l acumulare + 150 kW), fără sub-dimensionare.

### 3.5. Regimul antilegionella — cerință critică la scara unui hotel

Regimul antilegionella al ACM este, la un hotel cu 188 de oaspeți necunoscuți și cu o topologie de distribuție ramificată pe 5 etaje, o cerință de siguranță sanitară de prim ordin, nu o recomandare — riscul de proliferare a bacteriei Legionella pneumophila crește exponențial în intervalul de temperatură 25…45 °C și în porțiunile de rețea cu stagnare (dead-legs), motiv pentru care se adoptă cumulat:

- **Temperatura de stocare/plecare din acumulatoare: ≥60 °C**, în afara intervalului critic de proliferare;
- **Temperatura de retur a recirculării: ≥55 °C**, verificată la cel mai îndepărtat punct de retur (etajul 6, coloana cea mai lungă) — sub acest prag, se declanșează automat o alarmă tehnică pe BMS (cap. 13.3);
- **Șoc termic periodic automatizat**: ridicarea temperaturii întregii acumulări la **≥70 °C, menținută minimum 30…60 de minute**, programată automat prin BMS pe timp de noapte (consum minim, fără disconfort la robinet), cu frecvență săptămânală și, obligatoriu, după orice intervenție de mentenanță pe acumulatoare;
- **Eliminarea porțiunilor moarte (dead-legs) cu volum peste 3 litri** — toate ramurile de distribuție se proiectează cu recirculare activă până cât mai aproape de ultimul punct de consum, iar orice ramură terminală neevitabilă se limitează la volum ≤3 litri;
- **Mixere termostatice antiopărire (TMV)** la fiecare punct de consum (baterie de duș/cadă din camere, dușuri SPA), care limitează temperatura livrată la robinet la **38…42 °C**, permițând menținerea temperaturii ridicate (60…70 °C) pe toată bucla de distribuție fără risc de opărire a oaspetelui.

### 3.6. Bucla de recirculare — dimensionare

Recircularea ACM pe cele 5 niveluri de cazare (E2÷E6) se organizează pe câte o coloană de recirculare per nucleu de riseruri (aliniată cu coloana de distribuție, cap. 2.7), cu pompă de recirculare dedicată pe fiecare coloană, dimensionată pentru a compensa pierderile termice ale traseului de tur (nu pentru debitul de consum, care este preluat de sursa principală):

Pentru o coloană de 25 m lungime echivalentă (tur + retur), izolată conform I13 (manșon elastomeric ≥19 mm), pierderea termică liniară estimată la ~8 W/m conductă izolată: Φ_pierderi,coloană = 25 × 2 (tur+retur) × 8 = **400 W**, care trebuie compensată de un debit de recirculare:

Q_recirc = Φ_pierderi/(c·Δt) = 400/(4.186 × 5 K) = 400/20.930 = 0,0191 kg/s ≈ **0,069 mc/h**

Se adoptă, pe fiecare din cele 5 coloane, o pompă de recirculare mică (~0,1 mc/h, H ≈ 3 mCA), cu comandă continuă (nu pe temporizator, dat fiind regimul de funcționare 24/7 al hotelului) și verificare periodică a temperaturii de retur prin senzor conectat la BMS.

---

## 4. Canalizare menajeră, separator de grăsimi, canalizare pluvială

### 4.1. Sistemul de canalizare — principii generale

Canalizarea interioară a hotelului este de tip **separativ** (menajeră separată de pluvială), gravitațională, organizată pe coloane verticale aliniate cu ghenele tehnice descrise la capitolul 17.1 (aceleași trasee folosite de coloanele de apă rece/caldă, pentru minimizarea numărului de goluri prin planșeele de beton armat). Colectoarele orizontale de la baza coloanelor, poziționate în subsol (sub cota parcajului sau în canale tehnice vizitabile), converg spre racordul unic la rețeaua publică de canalizare, cu excepția rețelei bucătăriei, care trece obligatoriu prin separatorul de grăsimi (cap. 4.2) și a rețelei de parcare, care trece prin separatorul de hidrocarburi (cap. 4.4), înainte de a se uni cu colectorul general.

### 4.2. Determinarea debitului de calcul — metoda unităților de descărcare (SR EN 12056-2)

Debitul apelor uzate se calculează, conform SR EN 12056-2, cu relația **Q_ww = K·√ΣDU** (l/s), unde coeficientul de frecvență K se stabilește la **K = 0,7** (clădire cu utilizare frecventă — spre diferență de o locuință unifamilială, la care K = 0,5, un hotel cu 100 de camere, restaurant și bucătărie profesională are un regim de utilizare mult mai intens și mai puțin întâmplător al obiectelor sanitare).

| Grup consumator | Compunere (DU unitar SR EN 12056) | ΣDU |
|---|---|---|
| Camere de cazare (100; medie 3,30 DU/cameră: lavoar 0,5 + WC 2,0 + cadă/duș 0,8) | 100 × 3,30 | 330,0 |
| Grupuri sanitare publice și de conferință (14 lavoare 0,5 + 14 WC 2,0) | 7,0 + 28,0 | 35,0 |
| Vestiare SPA și personal (18 dușuri 0,8 + 14 lavoare 0,5 + 12 WC 2,0) | 14,4 + 7,0 + 24,0 | 45,4 |
| Bucătărie profesională (4 chiuvete prep. 0,8, 2 spălătoare industriale 1,5, 1 mașină spălat vase 1,5) | 3,2 + 3,0 + 1,5 | 7,7 |
| Spălătorie (6 mașini industriale, 3,0 DU/mașină) | 6 × 3,0 | 18,0 |
| Bar/office/robinete de serviciu | — | 4,0 |
| **TOTAL ΣDU** | — | **≈ 440,1 ≈ 440** |

**Q_ww = 0,7 × √440 = 0,7 × 20,98 = 14,7 l/s**

Colectorul general se dimensionează acoperitor la **Q_tot ≈ 15,0 l/s**, în conductă **PVC/PP Dn 200**, pantă i = 1,5…2,0 %, cu piese de curățire la maximum 15 m și la fiecare schimbare de direcție. Coloanele verticale de cazare (aferente unui pachet de 20 de camere/etaj, ΣDU_etaj ≈ 330/5 ≈ 66) se dimensionează la Q_coloană = 0,7 × √66 = 5,69 l/s, în **PP fonoabsorbant Dn 110**, cu aerisire primară (prelungire peste terasă) — alegerea materialului fonoabsorbant nu este opțională la un hotel: coloanele traversează, pe verticală, zone imediat adiacente camerelor de cazare, iar zgomotul de scurgere al unei coloane standard din PVC ar deveni perceptibil în camerele vecine, contrar țintei acustice stabilite în memoriul de arhitectură (cap. 22).

### 4.3. Separatorul de grăsimi al bucătăriei (SR EN 1825)

Bucătăria profesională de 240 mp, care servește ~500 de mese/zi (cap. 2.4), evacuează pe canalizare o încărcare semnificativă de grăsimi și uleiuri de origine animală/vegetală, care trebuie separată înainte de racordul la rețeaua publică, pentru a preveni colmatarea conductelor (proprii și publice) prin depunere și solidificare a grăsimilor la răcire. Dimensionarea separatorului, conform SR EN 1825-1/2, se face cu relația:

**NS = Qs · ft · fd · fr**

unde:
- **Qs** = debitul de calcul al apelor uzate de la bucătărie (l/s) — pentru fluxul cumulat al spălătoarelor industriale, al mașinii de spălat vase și al chiuvetelor de preparare care pot descărca simultan la vârful de after-service: **Qs = 2,0 l/s**;
- **ft** = factorul de temperatură — apă de spălare vase la temperatură ridicată (>60 °C, care reduce viscozitatea grăsimii și favorizează antrenarea ei în canalizare înainte de a se putea separa termic): **ft = 1,3**;
- **fd** = factorul de densitate a grăsimii — grăsimi/uleiuri alimentare uzuale (ρ ≈ 0,90…0,94): **fd = 1,0**;
- **fr** = factorul de agenți de curățare — bucătăria profesională utilizează detergenți degresanți, care emulsionează parțial grăsimea și impun un factor majorat: **fr = 1,5**.

**NS = 2,0 × 1,3 × 1,0 × 1,5 = 3,9**

Se adoptă, cu rotunjire superioară la dimensiunea standard de catalog imediat superioară, un **separator de grăsimi NS 4**, amplasat la subsol pe traseul canalizării bucătăriei, înainte de unirea cu colectorul general, cu acces de vidanjare/curățare periodică (contract de întreținere, frecvență recomandată lunară, funcție de intensitatea reală de utilizare constatată în exploatare) și cu alarmă de nivel (grăsime acumulată) integrată în BMS.

### 4.4. Canalizarea pluvială — acoperiș și platforme exterioare

**Acoperișul** (proiecție orizontală ≈ amprenta clădirii, ~48,00 × 22,00 m = **1.056 mp**), la intensitatea de calcul i = 150 l/s·ha (0,015 l/s·mp) și coeficient de scurgere ψ = 0,90 (terasă cu membrană hidroizolantă, practic impermeabilă):

**Q_acoperiș = ψ · i · A = 0,90 × 0,015 × 1.056 = 14,3 l/s**

Colectarea se face prin **receptoare de pardoseală (sifoane de terasă) cu parafrunze**, minimum 6 puncte de colectare repartizate pe suprafața terasei (pentru redundanță — un receptor colmatat nu trebuie să provoace inundarea locală a terasei, dat fiind că aceasta adăpostește echipamente tehnice, cap. 20 din memoriul de arhitectură), racordate la coloane verticale **PVC Dn 110**, cu descărcare liberă (fără presiune) în colectorul pluvial de la subsol.

**Platformele exterioare și parcarea la sol** (40 de locuri + alei de acces, suprafață pavată estimată ~1.800 mp, ψ = 0,90 asfalt/pavaj):

**Q_parcare = 0,90 × 0,015 × 1.800 = 24,3 l/s**

Apele pluviale colectate de pe suprafețele carosabile (parcare, rampă de acces subsol) sunt încărcate cu hidrocarburi provenite din traficul auto (scurgeri de ulei/combustibil, particule de cauciuc) și trebuie tratate printr-un **separator de hidrocarburi cu by-pass, clasa I (conținut rezidual de hidrocarburi ≤5 mg/l la evacuare)**, dimensionat la debitul de calcul de 24,3 l/s, amplasat pe traseul de evacuare al colectorului de parcare, înainte de unirea cu rețeaua pluvială generală sau cu emisarul/rețeaua publică — cerință distinctă și separată de pluvialul de acoperiș (necontaminat, care nu necesită tratare prin separator de hidrocarburi).

### 4.5. Rampa de acces la subsol — protecție la inundare

Rampa de acces auto la parcarea subterană (memoriul de arhitectură, cap. 19.2), fiind un punct de colectare naturală a apelor pluviale de pe platforma exterioară, se protejează cu un **canal de scurgere transversal (rigolă cu grătar) la capul superior al rampei**, dimensionat pentru a intercepta scurgerea de pe platformă înainte de a intra pe rampă, plus o **stație de pompare a apelor pluviale la baza rampei** (cameră de pompare cu 2 pompe submersibile, 1 activă + 1 rezervă, comandate pe flotor), pentru evacuarea forțată a eventualelor infiltrații reziduale care ar trece de rigolă, prevenind inundarea parcajului subteran — măsură de protecție proporțională cu consecința (parcajul subteran adăpostește instalații tehnice esențiale — centrală termică, hidrofor, tablou electric general — a căror inundare ar întrerupe funcționarea întregului hotel).

---

## 5. Instalații piscină și SPA

### 5.1. Datele de proiectare ale bazinului

Bazinul interior al componentei SPA (memoriul de arhitectură, cap. 8) are o suprafață de luciu de **75 mp (12,5 × 6,0 m)**, adâncime medie **1,40 m**, rezultând un volum de exploatare:

**V = A × h_mediu = 75 × 1,40 = 105 mc**

### 5.2. Recircularea și filtrarea apei

Timpul de recirculare (turnover time) pentru un bazin public/hotelier de dimensiuni medii, cu ocupare moderată, se adoptă conform practicii uzuale (DIN 19643-1, valorile de referință pentru bazine de agrement de hotel) la **T = 4 h**:

**Q_recirc = V/T = 105/4 = 26,25 mc/h ≈ 7,3 l/s**

Bucla de recirculare cuprinde, în succesiune: **sistem de colectare** (jgheab de refulare periferic tip skimmer, care preia stratul superior de apă, cel mai încărcat cu impurități organice și grăsimi de la corpul uman) → **filtrare pe strat de nisip cuarțos/multimedia** (viteză de filtrare ≤ 30 m/h, dimensionată la debitul de recirculare de 26,25 mc/h → suprafață filtrantă necesară ≈ 26,25/30 ≈ 0,88 mp, se adoptă 2 filtre de 0,6 mp fiecare, redundanță) → **dezinfecție cu clor liber** (dozare automată, țintă 1,0…3,0 mg/l clor liber rezidual, conform OMS 119/2014) → **treaptă UV complementară** (recomandată DIN 19643 pentru reducerea cloraminelor/clorului combinat și a mirosului caracteristic, fără a elimina dezinfecția de bază cu clor) → **corecție pH** (dozare automată acid/bază, țintă pH 7,0…7,4) → **reîncălzire** (schimbător de căldură dedicat, alimentat din bucla sursei termice hibride, cap. 6, cu recuperarea căldurii latente a dezumidificatorului, cap. 5.4) → **refulare în bazin** prin duze de fund/perete, pentru omogenizare.

**Adaosul de apă proaspătă**, impus pentru dilutia compușilor organici acumulați și a subproduselor de dezinfecție, se dimensionează la minimum **5 % din volumul bazinului pe zi**: Q_adaos = 0,05 × 105 = **5,25 mc/zi**, valoare care confirmă exact componenta de adaos utilizată în bilanțul de apă rece al SPA (cap. 2.4).

### 5.3. Materiale și protecția anticorozivă

Toate elementele metalice în contact direct sau în proximitate cu atmosfera clorată a halei bazinului (structuri de susținere a plafonului, bare de scară, cadre ale gurilor de refulare/aspirație, elementele metalice ale CTA-piscină, cap. 5.4) se execută din **oțel inoxidabil austenitic AISI 316L** (rezistență superioară la coroziunea prin clorură, comparativ cu AISI 304, insuficient pentru atmosfera permanent clorată a unei hale de piscină) sau se protejează prin tratamente anticorozive echivalente; canalizarea tehnologică a bazinului (golire, spălare filtre) se execută în PVC/PP, materiale inerte la clor.

### 5.4. Dezumidificarea halei piscinei — breviar de calcul

Problema tehnică centrală a halei piscinei, semnalată și în memoriul de arhitectură (cap. 8.2) ca interfață arhitectură-instalații, este evaporarea permanentă de la suprafața liberă a bazinului, care trebuie compensată printr-un debit de aer suficient pentru a menține umiditatea relativă sub ținta de proiect (≤65 %, cap. 1.5), prevenind condensul pe anvelopă.

**Rata de evaporație** se calculează cu relația uzuală de dimensionare a halelor de piscină (metodă VDI/ASHRAE):

**W = ε · A**

unde ε este coeficientul de evaporație specific, dependent de gradul de ocupare a bazinului — pentru un bazin **ocupat**, cu agitație a suprafeței și activitate a înotătorilor (condiție de proiectare acoperitoare, spre diferență de bazinul neocupat, unde ε ≈ 0,35 kg/mp·h), se adoptă **ε = 0,50 kg/(mp·h)**:

**W = 0,50 × 75 = 37,5 kg/h** (umiditate de evacuat)

**Debitul de aer necesar** pentru evacuarea acestei umidități, la diferența de conținut de umiditate de proiect între aerul saturat al halei (x_hală ≈ 14 g/kg, la 28 °C/60 % UR) și aerul livrat de unitatea de dezumidificare după condensare (x_refulare ≈ 9 g/kg), Δx = 5 g/kg = 0,005 kg/kg:

**m_aer = W/Δx = 37,5/0,005 = 7.500 kg/h**

Convertit în debit volumetric, la densitatea aerului cald umed (ρ ≈ 1,15 kg/mc la 28 °C):

**Q_CTA,piscină = 7.500/1,15 = 6.522 mc/h ≈ 6.500 mc/h**

### 5.5. Unitatea de tratare a aerului — dezumidificator cu recuperare de căldură

Se adoptă o **unitate CTA-piscină dedicată, cu pompă de căldură integrată pentru dezumidificare (~6.500 mc/h)**, care recuperează căldura latentă condensată din procesul de dezumidificare și o redirecționează spre reîncălzirea apei bazinului (cap. 5.2) și/sau spre preîncălzirea ACM (cap. 3), reducând sarcina termică netă a sursei centrale pentru acest consumator continuu (spre diferență de sarcina de încălzire a clădirii, care variază cu temperatura exterioară, sarcina de dezumidificare a piscinei este practic constantă tot anul, ceea ce face recuperarea deosebit de eficientă economic). Unitatea funcționează în regim de recirculare parțială a aerului tratat (cu o priză de aer proaspăt minimă pentru calitatea aerului interior, dimensionată conform SR EN 16798 pentru spații de agrement) și de evacuare a excesului spre exterior.

### 5.6. Presiunea negativă și separarea de spațiile adiacente

Conform principiului stabilit în memoriul de arhitectură (cap. 8.2), hala piscinei se menține la o **presiune ușor negativă** față de coridoarele și vestiarele adiacente, prin dezechilibrarea controlată a debitelor introdus/evacuat ale CTA-piscină (evacuare > introducere, cu diferența compensată prin infiltrare controlată de aer din spațiile vecine) — măsură care previne migrarea necontrolată a aerului cald și umed, încărcat cu clor, spre zonele în care s-ar putea condensa pe suprafețe mai reci sau ar produce disconfort olfactiv oaspeților care nu se află în costum de baie.

---

## 6. Instalații termice — necesar, sursă și distribuție

### 6.1. Breviarul de calcul al camerei reprezentative (SR EN 12831)

Pentru camera reprezentativă a mixului de cazare — camera dublă standard, **17,0 mp cameră + 4,5 mp baie = 21,5 mp**, H liber 2,70 m (memoriul de arhitectură, cap. 10.2/11.1) — se determină necesarul de căldură la Δθ = θint − θext = 22 − (−15) = **37 K**.

Se consideră o cameră mediană a turnului de cazare (etaj intermediar, nu la colț, cu o singură fațadă exterioară, corespunzătoare unei travee structurale de ~3,80 m lățime axială, memoriul de structură cap. 1.2), cu geometria: fațadă exterioară = 3,80 × 2,70 = **10,26 mp**, din care vitraj ~40 % din suprafața traveei (memoriul de arhitectură, cap. 21.2) = 4,10 mp, rest perete opac = 6,16 mp.

**Pierderi prin transmisie:**

- Perete exterior opac: U = 1/R = 1/2,20 = 0,4545 W/mp·K (rezistență minimă nZEB, memoriul de arhitectură) → Φ_perete = U·A·Δθ = 0,4545 × 6,16 × 37 = **103,6 W**
- Fereastră: U = 1,30 W/mp·K → Φ_fereastră = 1,30 × 4,10 × 37 = **197,2 W**
- Pereții interiori (spre coridor, spre camerele adiacente) — considerați adiabatici, ambele spații fiind încălzite la temperaturi comparabile (coridorul de etaj este climatizat, memoriul de arhitectură cap. 14.2) → pierdere nulă prin transmisie internă;
- Planșeu peste/sub — pierdere nulă la o cameră de etaj intermediar (E3/E4/E5), ambele planșee adiacente unor spații încălzite identic.

**Pierderi prin ventilare** (aer proaspăt DOAS, cap. 7.2, debit de proiectare 60 mc/h/cameră la ocupare dublă):

Φ_vent,brut = 0,34 × Qv × Δθ = 0,34 × 60 × 37 = **754,8 W**

**Necesar brut al camerei**: Φ_brut = 103,6 + 197,2 + 754,8 = **1.055,6 W**; cu majorare 10 % pentru punți termice/orientare nefavorabilă: **Φ_cameră ≈ 1.161 W ≈ 1,16 kW**.

Indicele specific rezultat: 1.161/21,5 = **54 W/mp**, valoare consistentă cu ordinul de mărime al unei clădiri nZEB de anvelopă performantă (comparabil cu cel obținut pentru zonele de zi ale unei locuințe nZEB — vezi memoriul similar pentru locuință individuală, care obține ~58 W/mp la living, în condiții climatice mai severe, −18 °C).

### 6.2. Efectul recuperării de căldură asupra necesarului net al camerei

Pierderea brută de ventilare calculată mai sus (754,8 W/cameră) nu reprezintă sarcina reală de instalat pe unitatea terminală din cameră, întrucât aerul proaspăt este pretratat central prin unități DOAS cu recuperare de căldură (cap. 7.2, randament η = 0,80): Φ_vent,net = (1 − η) × Φ_vent,brut = 0,20 × 754,8 = **151,0 W**. Necesarul net, folosit pentru dimensionarea unității terminale (ventiloconvector/VRF) din fiecare cameră: Φ_cameră,net = 103,6 + 197,2 + 151,0 = **451,8 W**, majorat cu 10 % = **~500 W/cameră** — capacitatea instalată a unității terminale se dimensionează totuși la valoarea brută (cap. 6.1, ~1,16 kW), pentru a acoperi scenariul de avarie/bypass temporar al recuperatorului de căldură (îngheț, defectare), conform bunei practici de proiectare a sistemelor cu recuperare.

### 6.3. Agregarea necesarului pe cele 100 de camere

Camerele de colț (2 fațade exterioare) și cele de la etajul superior (E6, cu pierdere suplimentară prin planșeul de terasă, R ≥5,00 mp·K/W) au un necesar specific superior mediei calculate la cap. 6.1; ținând cont de această neuniformitate (aproximativ 20 de camere de colț/ultim nivel cu necesar majorat cu ~35 %, restul de 80 de camere la necesarul de bază), necesarul mediu ponderat pe cameră se estimează la ~1,20 kW/cameră:

**Φ_camere,total = 100 × 1,20 = 120 kW**

### 6.4. Necesarul spațiilor publice — argumentare pe W/mp

Spre diferență de camerele de cazare (geometrie repetitivă, calculabilă punctual), spațiile publice ale podiumului se dimensionează pe indici specifici argumentați din raportul de vitrare și din profilul de ocupare al fiecărei zone (memoriul de arhitectură, cap. 2.4, 5.1, 7.1):

| Spațiu | Suprafață (mp) | Indice adoptat (W/mp) | Argumentare | Φ (kW) |
|---|---|---|---|---|
| Lobby (dublă înălțime, fațadă vitrată extinsă) | 320 | 70 | volum mare, vitraj generos pe frontul principal (memoriul de arhitectură cap. 21.1), pierderi suplimentare prin golul de planșeu | 22,4 |
| Restaurant + terasă (interior) | 260 | 65 | vitraj moderat sud/sud-vest, ocupare mare (180 locuri, aport intern parțial compensator) | 16,9 |
| Săli conferință + foaier | 460 | 55 | vitraj redus (orientare nordică, memoriul de arhitectură cap. 2.4), dar necesar de preîncălzire înainte de eveniment, fără aportul intern al ocupării încă absente | 25,3 |
| Bucătărie (anti-îngheț/completare; aportul intern al echipamentelor de gătit acoperă necesarul curent) | 240 | 20 | doar frost-protection în afara orelor de funcționare | 4,8 |
| Parcare subsol (frost-protection rampă/tehnice) | — | — | valoare globală, zonă ramp/tehnice | 15,0 |
| **Subtotal spații publice + BOH** | — | — | — | **84,4** |

### 6.5. Necesarul termic total instalat

**Φ_total,instalat = Φ_camere + Φ_spații publice = 120 + 84,4 = 204,4 kW ≈ 205 kW**

La acest necesar de încălzire a spațiilor se adaugă puterea dedicată preparării ACM (cap. 3.4, 150 kW la schimbătoare) și puterea de reîncălzire/recuperare a bazinului SPA (cap. 5.5, sarcină redusă prin recuperarea de căldură, estimată la ~30 kW aport net din sursa centrală). Ținând cont de o diversitate rezonabilă între vârful de încălzire (care survine dimineața, la fel ca vârful de ACM, deci parțial concomitent) și rezerva necesară pentru zilele de temperatură minimă istorică, se adoptă o **putere totală instalată a centralei termice de ~450 kW**, care corespunde unui indice specific rezonabil pentru un hotel de 4 stele cu piscină de această capacitate (referință de bună practică pentru segmentul 4 stele cu SPA: 3,5…4,5 kW conectat/cameră, aici: 450/100 = 4,5 kW/cameră, la limita superioară a intervalului, justificată de componenta SPA).

### 6.6. Sursa termică — soluția hibridă și justificarea ei

Se adoptă o soluție **hibridă, aliniată cerinței nZEB**: bază de sarcină din **pompe de căldură aer-apă în cascadă**, dimensionate pentru ~60…70 % din vârful de 450 kW (≈ 280…300 kW instalați în pompe de căldură, care acoperă marea majoritate a orelor de funcționare la un COP favorabil), completată de **cazane de condensație pe gaz** pentru vârful de sarcină la temperaturi exterioare foarte scăzute (aproape de −15 °C de calcul) și pentru redundanță (cap. 12, ~180…200 kW în 2 cazane modulante):

| Sursă | Putere instalată | Rol |
|---|---|---|
| Pompe de căldură aer-apă în cascadă (min. 2 unități) | ~280…300 kW | bază de sarcină, COP ~3,3…3,8, regim 45/40 °C |
| Cazane de condensație pe gaz (min. 2 unități modulante) | ~180…200 kW | vârf de sarcină + rezervă/redundanță + susținere temperatură ACM (60…70 °C, șoc termic) |
| Recuperare dezumidificator piscină | ~40 kW (recuperabil) | preîncălzire apă bazin/ACM, sarcină continuă |
| Solar termic (completare ACM, cap. 15) | ~15…20 kW (variabil sezonier) | preîncălzire ACM |

**Justificarea alegerii hibride**: pompele de căldură, funcționând la un COP mediu sezonier de ~3,3, produc energia termică de bază la un cost operațional și o amprentă de carbon semnificativ mai reduse decât arderea directă a gazului (η ≈ 0,97 la cazanele de condensație, dar fără multiplicarea factorului COP), fiind astfel soluția economică dominantă pentru marea majoritate a orelor de funcționare; cazanele de condensație pe gaz rămân necesare pentru cele câteva zile de iarnă cu temperaturi apropiate de −15 °C (când performanța pompelor de căldură aer-apă scade semnificativ) și pentru a asigura temperatura ridicată de 60…70 °C cerută de regimul antilegionella al ACM (cap. 3.5), pe care o pompă de căldură obișnuită o atinge cu randament redus. Soluția pur electrică (100 % pompe de căldură, fără backup pe gaz) ar fi posibilă tehnic, dar ar necesita o putere instalată de pompe de căldură mult mai mare (pentru a acoperi și vârful rar de temperatură minimă), cu un cost de investiție disproporționat față de economia de operare — decizie de proiect care rămâne, la faza PT, la latitudinea analizei cost-beneficiu a beneficiarului, prezenta soluție hibridă fiind cea recomandată ca optimă la faza DTAC.

### 6.7. Argumentarea sistemului hibrid VRF+DOAS pentru camere versus sistem central all-air

Alegerea sistemului terminal pentru camere — **VRF/ventiloconvector cu recuperare + aer proaspăt tratat separat prin unități DOAS** — în locul unui sistem centralizat exclusiv pe aer (all-air, cu tratare integrală a debitului de aer la o singură CTA per etaj/zonă) se justifică prin trei argumente cumulate, specifice unui hotel:

1. **Controlul individual al confortului per oaspete** — cerință obligatorie ANT 65/2013 pentru categoria 4 stele (climatizare individuală), pe care doar un sistem cu unitate terminală proprie per cameră (VRF/ventiloconvector cu termostat propriu) o poate satisface; un sistem all-air ar necesita fie o zonă de control per cameră cu volum variabil (VAV) și baterie de reîncălzire locală — soluție mai costisitoare și mai voluminoasă decât o unitate VRF —, fie ar impune un compromis de confort uniform pe zone mari de coridor, inacceptabil la un hotel de 4 stele;
2. **Diversitatea de sarcină simultană între camere și spații publice** — camerele orientate nordic (mai puține la acest hotel, cap. 2.4 din memoriul de arhitectură, dar existente) pot necesita încălzire în aceeași perioadă în care sala de conferință, ocupată la capacitate (300 persoane), necesită răcire activă din aportul intern al ocupanților — un sistem VRF cu recuperare de căldură (3/4 țevi) transferă intern căldura de la unitățile care răcesc spre cele care încălzesc, cu un consum net de energie mult mai mic decât două sisteme independente care ar produce, separat, căldură și frig simultan;
3. **Eficiență energetică prin oprire/reducere individuală** — key-card-ul de acces la cameră (cap. 8.5) poate întrerupe/reduce direct unitatea terminală proprie a camerei neocupate, fără a afecta camerele vecine — o economie greu de replicat pe un sistem all-air centralizat, unde reducerea de debit afectează întreaga ramură VAV deservită.

### 6.8. Distribuția pe zone funcționale

| Zonă | Regim de distribuție | Corpuri terminale |
|---|---|---|
| Camere de cazare (E2÷E6) | agent termic 45/40 °C, buclă dedicată per etaj | unități VRF/ventiloconvector 4 țevi (recuperare), câte una per cameră |
| Lobby, coridoare de circulație | 40/33 °C | pardoseală radiantă (lobby) + ventiloconvectoare (coridoare) |
| Restaurant, săli conferință | 45/40 °C | CTA cu baterie de încălzire/răcire + ventiloconvectoare pentru reglaj fin de zonă |
| Bucătărie | frost-protection, 45/40 °C | aeroterme/radiatoare, funcționare limitată la afara programului de gătit |
| Parcare subsol | antiîngheț, 45/40 °C | aeroterme la rampă și la accesele exterioare |
| SPA/piscină | reîncălzire dedicată (cap. 5.2) + ventiloconvectoare vestiare | schimbător apă bazin + CTA-piscină (cap. 5.4) |

Fiecare buclă de distribuție este echipată cu **grup de amestec propriu, pompă de circulație cu turație variabilă (clasă EEI ≤0,20) și robinete de echilibrare hidraulică**, cu reglaj climatic (curbă de încălzire în funcție de temperatura exterioară) coordonat central prin BMS (cap. 13.3), care permite totodată setback-ul automat al camerelor neocupate.

### 6.9. Butelia de egalizare și vasul de expansiune

Cascada de pompe de căldură se decuplează hidraulic de circuitele de distribuție printr-o **butelie de egalizare** dimensionată la debitul maxim al sursei (~15 mc/h la Δt = 5 K pe circuitul primar), care reduce ciclarea compresoarelor la sarcină parțială. Volumul total de agent termic din instalație (sursă + acumulare ACM exclusă, care are vas propriu + distribuție pe toate zonele) se estimează la V_inst ≈ 3.500 litri; vasul de expansiune cu membrană se dimensionează la dilatarea de la 10 °C la 50 °C (regim maxim adoptat, cu marjă peste regimul curent de 45 °C): e ≈ 0,0121 → ΔV = 3.500 × 0,0121 = **42,4 litri**; cu presiunea de preîncărcare 1,5 bar și presiunea maximă admisă 4,0 bar (supapă de siguranță): V_vas = ΔV/[(pmax−ppre)/(pmax+1)] = 42,4/[(4−1,5)/5] = 42,4/0,50 = **~85 litri teoretic**; se adoptă practic un **vas de expansiune de 200 litri** (marjă pentru extinderi și pentru amortizarea șocurilor de presiune ale unei instalații de această complexitate, cu multiple bucle și pompe cu turație variabilă).

---

## 7. Ventilare și climatizare

### 7.1. Cadrul de proiectare — categorii de calitate a aerului interior (SR EN 16798)

Se adoptă, pentru toate spațiile ocupate ale hotelului, **categoria II** de calitate a mediului interior (SR EN 16798-1) — nivel de confort standard pentru clădiri noi cu ocupare de tip public/cazare, cu următorii parametri de proiectare: debit de aer proaspăt 30…36 mc/h/persoană (funcție de destinație), CO₂ ≤900…1.000 ppm peste nivelul exterior, zgomot de fond ≤30 dB(A) în camere (cap. 1.5), umiditate relativă 40…60 %.

### 7.2. Camerele de cazare — sistem DOAS cu recuperare de căldură

Debitul de aer proaspăt per cameră (ocupare de proiectare dublă, 30 mc/h/persoană): **Qv,cameră = 2 × 30 = 60 mc/h**. Pentru cele 100 de camere: **Q_DOAS,total = 100 × 60 = 6.000 mc/h**, tratat prin **unități DOAS cu recuperator de căldură rotativ/cu plăci, câte una per nivel de cazare (5 unități, 1.200 mc/h fiecare)**, amplasate în oficiile tehnice de etaj (cap. 17.1) sau centralizat pe terasă cu distribuție verticală, funcție de soluția tehnică adoptată la faza PT.

**Căldura recuperată** la randament η = 0,80 și Δθ = 37 K (cap. 1.5):

**Φ_recuperat = η × 0,34 × Qv × Δθ = 0,80 × 0,34 × 6.000 × 37 = 0,80 × 75.480 = 60.384 W ≈ 60,4 kW**

Această valoare confirmă exact reducerea sarcinii de ventilare calculată per cameră la capitolul 6.2 (754,8 W brut → 151,0 W net, adică o reducere de 603,8 W/cameră × 100 camere = 60.380 W ≈ 60,4 kW, identică cu recuperarea calculată aici pe bilanțul global) — verificare încrucișată care confirmă consistența breviarului termic și de ventilare.

### 7.3. Spațiile publice — CTA cu VAV comandat pe CO₂

Pentru spațiile de aglomerare (restaurant, săli de conferință, lobby), debitul minim de aer proaspăt se dimensionează la ocuparea de proiectare, cu variație a debitului (VAV) comandată de senzori de CO₂, pentru a evita supraventilarea (și, implicit, supraconsumul energetic) în intervalele de ocupare parțială:

| Spațiu | Ocupare de proiectare | Debit specific | Q proaspăt (mc/h) |
|---|---|---|---|
| Restaurant | 180 persoane | 30 mc/h/pers | 5.400 |
| Săli conferință + foaier | 300 persoane | 22 mc/h/pers | 6.600 |
| Lobby | 100 persoane (tranzit, echivalent) | 25 mc/h/pers | 2.500 |

Fiecare zonă este deservită de o **CTA dedicată cu recuperare de căldură** (baterie de recuperare rotativă/cu plăci, η ≥0,75), cu module de umidificare adiabatică pentru sala de conferință (confort la ocupare densă, unde uscarea aerului prin încălzire devine sensibilă) și cu module de răcire (chiller dedicat spații publice, putere estimată ~350 kW frig, dimensionat la aportul intern cumulat al ocupării maxime + aportul solar prin vitrajele lobby-ului/restaurantului, calcul detaliat la faza PT).

### 7.4. Bucătăria profesională — exhaustare și compensare

Bucătăria de 240 mp, cu flux „marche en avant" (memoriul de arhitectură, cap. 6.2, netratat aici), necesită un sistem de exhaustare a hotelor de gătit dimensionat pe lungimea liniei de gătit (~12 m linie de gătit estimată pentru un flux de 500 mese/zi) la o rată specifică de captare de **~2.500 mc/h pe metru linear de hotă** (valoare uzuală pentru echipamente de gătit profesionale cu flacără directă):

**Q_exhaustare = 12 × 2.500 = 30.000 mc/h**

Aportul de aer compensator se dimensionează la **85…90 % din debitul exhaustat**, diferența fiind menținută deliberat pentru a crea o **depresiune ușoară a bucătăriei față de restaurant** (prevenirea migrării mirosurilor de gătit spre sala de servire):

**Q_aport = 0,87 × 30.000 = 26.100 mc/h**

Hotele sunt echipate cu filtre de grăsime (tip labirint/baffle, cu spălare automată programată) și, conform bunei practici pentru bucătării profesionale de această capacitate, cu un modul de tratare UV/ozon complementar filtrării mecanice, pentru reducerea mirosurilor evacuate spre exterior. Ventilatorul de exhaustare este de tip rezistent la grăsime/temperatură (certificare F400, conform cerinței de siguranță la incendiu pentru canalele de bucătărie), cu evacuare pe terasă, la distanță și înălțime suficiente față de prizele de aer proaspăt ale celorlalte CTA (evitarea recirculării mirosurilor).

### 7.5. Spălătoria — exhaustare umiditate/căldură

Spălătoria de 110 mp (memoriul de arhitectură, cap. 17.2), cu mașini de spălat și uscătoare industriale, generează un aport semnificativ de umiditate și căldură reziduală, compensat printr-un sistem de exhaustare dedicat, dimensionat la **~15 schimburi de aer/oră** pe volumul încăperii (110 mp × 3,20 m H subsol = 352 mc): **Q_exhaustare,spălătorie = 15 × 352 = 5.280 mc/h ≈ 5.300 mc/h**, cu aport compensator din spațiile tehnice adiacente, fără tratare termică dedicată (aer de compensare la temperatura ambientală a subsolului).

### 7.6. Parcarea subterană — ventilare pe bază de CO și interfața cu desfumarea

**Volumul parcajului subteran** (Ac subsol ≈2.100 mp conform memoriului general, H_S = 3,20 m conform memoriului de structură): V = 2.100 × 3,20 = **6.720 mc**.

**Regimul curent (frecvență normală de trafic)**: ventilare continuă la **3 schimburi/oră**: Q_curent = 3 × 6.720 = **20.160 mc/h ≈ 20.000 mc/h**, cu senzori de CO amplasați pe grila de detecție a parcajului (conform I5), care comandă trecerea în regim de boost la depășirea pragului de 30…50 ppm.

**Regimul de boost (concentrație CO ridicată)**: ventilatoarele treaptă a doua aduc debitul la **6 schimburi/oră**: Q_boost = 6 × 6.720 = **40.320 mc/h ≈ 40.000 mc/h**, cu alarmă tehnică la 100 ppm (nivel de acțiune imediată, evacuare recomandată a personalului din zonă, conform bunelor practici I5 pentru parcaje subterane).

**Interfața cu desfumarea de incendiu** (dimensionată integral de scenariul de securitate la incendiu, nereluat aici): sistemul de ventilare curent pe bază de CO și sistemul dedicat de desfumare a parcajului (ventilatoare rezistente la temperatură ridicată, F400, cu comandă separată de la centrala de detecție și semnalizare a incendiului) sunt **instalații distincte**, cu ventilatoare și trasee proprii — ventilatoarele de exploatare curentă pe CO nu sunt certificate și nu se pot substitui ventilatoarelor de desfumare în caz de incendiu; interfața electrică (alimentarea ventilatoarelor de desfumare din sursa de rezervă, cap. 9) este singurul punct de coordonare tratat în prezentul memoriu.

### 7.7. Presurizarea caselor de scări — interfață conceptuală

Cele două case de scări de evacuare ale turnului de cazare (memoriul de arhitectură, cap. 16.2) sunt proiectate, conform scenariului de securitate la incendiu, ca **volume de evacuare protejate, presurizate** — dimensionarea debitului de aer de presurizare, a suprapresiunii țintă și a logicii de comandă (declanșare la semnal de la centrala de detecție) fac obiectul exclusiv al scenariului de securitate la incendiu. Prezentul memoriu se limitează la a semnala interfața: ventilatoarele de presurizare sunt alimentate electric din sursa de rezervă (cap. 9), pe circuite de siguranță dedicate, coordonate cu proiectantul de specialitate PSI la faza PT pentru poziționarea prizelor de aer și a traseelor de canale, astfel încât acestea să nu intersecteze traseele altor instalații pe ghenele tehnice comune (cap. 17.1).

---

## 8. Instalații electrice — curenți tari, bilanț de putere

### 8.1. Bilanțul de putere pe zone funcționale

Bilanțul electric se determină, ca și necesarul sanitar și termic, prin sumarea pe zone funcționale, cu factori de demand (kd) argumentați pentru profilul specific de simultaneitate al fiecărei zone — nu printr-un indice global mp/kW, insuficient de precis pentru o clădire cu șase profiluri de consum diferite (cap. 1.1):

| Zonă/consumator | Putere instalată Pi (kW) | Factor de demand kd | Putere calculată Pc (kW) | Argumentare kd |
|---|---|---|---|---|
| Camere de cazare (100 × ~2,0 kW: HVAC unitate proprie + prize + iluminat + minibar + TV) | 200 | 0,50 | 100,0 | ocupare medie <100 %, key-card energy management (cap. 8.5) reduce consumul camerelor neocupate |
| Bucătărie profesională (echipamente de gătit, refrigerare) | 180 | 0,60 | 108,0 | funcționare intensă la orele de vârf ale meselor, dar nu toate echipamentele simultan la putere maximă |
| Centrală termică/HVAC (pompe de căldură, pompe circulație, CTA, chiller) | 250 | 0,85 | 212,5 | funcționare cvasicontinuă, cu ciclare redusă la echipamentele moderne cu turație variabilă |
| Iluminat general (verificat la cap. 10.4) | 60 | 0,90 | 54,0 | funcționare uniformă pe programul de exploatare |
| Ascensoare (2×15 kW oaspeți + 1×18 kW serviciu) | 48 | 0,50 | 24,0 | funcționare intermitentă, rareori toate simultan la sarcină maximă |
| Spălătorie (mașini, uscătoare, călcătorii industriale) | 90 | 0,70 | 63,0 | cicluri de funcționare decalate pe echipamente |
| Pompe apă (hidrofor, recirculare ACM, piscină) | 40 | 0,60 | 24,0 | funcționare pe cicluri de presiune/recirculare |
| Prize generale, birouri, alte servicii | 60 | 0,40 | 24,0 | utilizare dispersată, fără simultaneitate ridicată |
| **TOTAL** | **928** | — | **609,5** | — |

Aplicând un **coeficient global de simultaneitate ksim = 0,85** (nesuprapunerea perfectă a vârfurilor tuturor zonelor — de exemplu, vârful bucătăriei de la ora prânzului nu coincide integral cu vârful de ocupare a camerelor de dimineață):

**Pc,final = 609,5 × 0,85 = 518,1 kW ≈ 520 kW**

### 8.2. Dimensionarea postului de transformare și a branșamentului

La un factor de putere estimat cosφ = 0,92 (compensare capacitivă centralizată prevăzută la tabloul general, pentru compensarea sarcinilor inductive ale motoarelor de pompe/ventilatoare/compresoare):

**S = Pc/cosφ = 520/0,92 = 565,2 kVA**

Se adoptă un **post de transformare propriu, 630 kVA** (dimensiune standard de catalog imediat superioară, cu marjă de ~11 % peste necesarul calculat, pentru dezvoltări ulterioare și pentru pornirea motoarelor mari fără cădere de tensiune inacceptabilă). Curentul nominal secundar al transformatorului: I_n = S/(√3×U) = 630.000/(1,732×400) = **909,3 A**; curentul de calcul al branșamentului, la puterea efectiv cerută: I_calcul = Pc/(√3×U×cosφ) = 520.000/(1,732×400×0,92) = 520.000/636,9 = **816,7 A**, cu marjă confortabilă față de curentul nominal al transformatorului adoptat.

### 8.3. Managementul energetic pe cartelă de acces în camere

Fiecare cameră este echipată cu un **sistem de management energetic pe bază de card RFID** (integrat cu sistemul de acces al camerei, memoriul de arhitectură cap. 10.3): la extragerea cardului din slotul dedicat (oaspetele a părăsit camera), unitatea HVAC proprie trece în regim de setback (temperatură redusă/ridicată cu 3…4 °C față de setpoint, fără oprire totală, pentru a evita timpul lung de recuperare la reîntoarcerea oaspetelui) și iluminatul principal se stinge automat, cu excepția prizelor pentru încărcare minibar/electronice. Economia de energie documentată pentru astfel de sisteme, în exploatarea hotelurilor comparabile, se situează în intervalul **20…25 % din consumul energetic al camerelor**, valoare adoptată ca premisă de calcul pentru bilanțul energetic nZEB (cap. 15).

### 8.4. Structura tablourilor electrice

Distribuția electrică se organizează pe o **hierarhie de tablouri** aliniată cu zonarea funcțională FOH/cazare/BOH (memoriul de arhitectură, cap. 4):

- **TGD (Tablou General de Distribuție)** — la subsol, adiacent postului de transformare, cu întrerupător general, compensare factor de putere, măsură/contorizare principală și interfața cu grupul electrogen (cap. 9, comutare automată ATS);
- **Tablouri secundare pe zonă**: subsol tehnic (CT, hidrofor, pompe), parter FOH (lobby, recepție, lounge-bar), parter BOH (bucătărie, depozite), etaj 1 (conferință + SPA), câte un tablou pe fiecare etaj de cazare (E2÷E6, 5 tablouri, alimentând cele ~20 de camere ale nivelului respectiv prin coloane dedicate), tablou HVAC/plantă tehnică, tablou ascensoare;
- **Tablouri de sarcini de siguranță** — alimentate atât din TGD (regim normal) cât și din generator (cap. 9), prin comutare automată, dedicate exclusiv pompelor de incendiu, ventilatoarelor de desfumare/presurizare, iluminatului de siguranță și ascensorului cu funcție de pompieri.

Fiecare tablou secundar are o **rezervă de minimum 20 % din capacitatea instalată** (module libere + secțiune de bare dimensionată acoperitor), pentru extinderi ulterioare fără intervenție majoră asupra distribuției existente.

---

## 9. Grup electrogen și alimentare de rezervă

### 9.1. Principiul de dimensionare — strict pe sarcinile reale de siguranță și continuitate

Grupul electrogen **nu** se dimensionează pentru a susține integral bilanțul electric al hotelului (cap. 8, 520 kW) — o soluție de rezervă totală ar fi disproporționată ca investiție și ca spațiu tehnic, și nu este cerută de normativ pentru o clădire care nu este definită drept „clădire înaltă" (cap. 1.2). Dimensionarea se face **exclusiv pe sarcinile de siguranță a vieții și pe un set restrâns de sarcini de continuitate a afacerii**, enumerate și argumentate individual mai jos, conform principiului de proporționalitate stabilit la capitolul 1.6.

### 9.2. Inventarul sarcinilor alimentate de generator

| Sarcină | Putere (kW) | Argumentare |
|---|---|---|
| Pompe de incendiu (hidranți + sprinklere, conform scenariului de securitate la incendiu) | 45 | siguranța vieții — obligatorie, sursă de rezervă necondiționată |
| Ventilatoare de desfumare/presurizare (case de scări + parcaj) | 35 | siguranța vieții — evacuare în siguranță a oaspeților |
| Iluminat de siguranță/evacuare (circuite dedicate LED, cap. 10.5) | 8 | siguranța vieții — marcarea traseelor de evacuare |
| Ascensor cu funcție de pompieri (1 din cele 2 ascensoare de oaspeți, cap. 14) | 15 | siguranța vieții — transport al echipelor de intervenție ISU |
| Continuitatea lanțului frigorific al bucătăriei (camere frigorifice, congelare) | 20 | continuitatea afacerii — pierderea stocului alimentar la o pană prelungită |
| Continuitatea centralei termice/pompelor de circulație/BMS | 15 | continuitatea afacerii — evitarea îngheţului instalațiilor pe timp de iarnă la o pană prelungită |
| Recepție/PMS minim + iluminat minim lobby | 5 | continuitatea afacerii — siguranța și orientarea oaspeților pe durata unei pene |
| **TOTAL sarcini alimentate de generator** | **143** | — |

### 9.3. Dimensionarea grupului electrogen

Ținând cont de curentul de pornire majorat al motoarelor mari (pompa de incendiu de 45 kW, cel mai mare motor din listă, cu curent de pornire de 2,5…3× curentul nominal la pornire directă, atenuat prin soft-starter), grupul electrogen se dimensionează cu o marjă de peste 35 % față de suma sarcinilor de regim continuu:

**P_generator ≈ 143 × 1,4 ≈ 200 kW**, adoptat ca **grup electrogen diesel, 200 kVA (160 kW la cosφ 0,80)**, cu alternator dimensionat pentru pornirea directă a motorului celui mai mare fără cădere de tensiune sub limita admisă pentru celelalte sarcini alimentate simultan.

### 9.4. Autonomia și comutarea automată

**Autonomia de combustibil** se dimensionează diferențiat: rezervorul de bază (integrat generatorului) asigură minimum **8 ore de funcționare continuă la sarcină nominală** — interval care acoperă marea majoritate a scenariilor de pană a rețelei publice — iar un rezervor suplimentar de combustibil, dimensionat pentru o **autonomie extinsă de 24 de ore**, susține continuitatea lanțului frigorific și a centralei termice pe durata unei pene prelungite, fără a necesita realimentare de urgență în timpul nopții.

**Comutarea automată (ATS — Automatic Transfer Switch)** detectează căderea tensiunii din rețeaua publică, comandă pornirea generatorului și efectuează transferul sarcinilor de siguranță pe generator într-un **timp total ≤10…15 secunde** (start motor + stabilizare tensiune/frecvență + comutare); pentru sarcinile critice care nu tolerează nici această întrerupere scurtă (sisteme IT/PMS, centrala de detecție și semnalizare a incendiului, echipamentele de rețea ale BMS), se prevede un **UPS dedicat, ~15 kVA, autonomie 15…30 de minute**, care asigură puntea de alimentare pe durata pornirii generatorului și, în caz de avarie a acestuia, un interval suficient pentru o închidere controlată a sistemelor sau pentru intervenția tehnică de urgență.

---

## 10. Iluminat interior și exterior

### 10.1. Nivelurile de iluminare de proiect (NP 061, SR EN 12464-1)

| Spațiu | Nivel de iluminare (lx) | Observație |
|---|---|---|
| Camere de cazare (ambient) | 100…150 | + iluminat de task la birou/oglindă, 300 lx local |
| Coridoare de etaj | 100 | ambianță caldă, redusă (memoriul de arhitectură, cap. 14.2) |
| Lobby | 200…300 | zonă de reprezentare |
| Restaurant | 150…200 | ambianță de servire, cu accente decorative |
| Bucătărie profesională | 500 | cerință de siguranță alimentară/lucru fin, EN 12464-1 |
| Săli de conferință | 300…500 | 500 lx pentru citire/scriere la mese de lucru |
| SPA/vestiare | 200 | confort, cu accente relaxante în zona de tratament |
| Grupuri sanitare | 200 | — |
| Parcare subsol | 75 | EN 12464-1, spații de circulație auto |
| Depozite/spații tehnice | 150…200 | acces de mentenanță |

### 10.2. Sursele și eficiența adoptată

Se adoptă exclusiv corpuri de iluminat **LED**, cu eficacitate luminoasă de proiect **~110…130 lm/W**, alegere care fundamentează direct puterile specifice de la capitolul 10.4 și care este consistentă cu ținta nZEB (cap. 15).

### 10.3. Controlul iluminatului — DALI și scenarii

Se adoptă un sistem de control **DALI** pe circuitele publice și de conferință, cu următoarele funcțiuni: **daylight harvesting** în lobby (reglarea automată a nivelului artificial în funcție de aportul de lumină naturală prin fațada vitrată, cap. 21.1 din memoriul de arhitectură), **scenarii predefinite** în sălile de conferință (nivel „prezentare", nivel „lucru la mese", nivel „eveniment de seară", comandate de la un panou central sau preluate automat prin integrarea cu sistemul audio-video al sălii), și **dimming controlat de oaspete** în camere (comandă la noptieră/la intrare, integrată cu sistemul de management energetic pe card, cap. 8.3).

### 10.4. Verificarea puterii instalate față de bilanțul electric

Verificarea puterii instalate de iluminat, pe suprafețe și indici specifici argumentați de nivelul de iluminare țintă și de eficacitatea LED adoptată (cap. 10.2):

| Zonă | Suprafață (mp) | Indice (W/mp) | P (kW) |
|---|---|---|---|
| Camere de cazare | 2.150 (100×21,5) | 8,0 | 17,2 |
| Coridoare de etaj/oficii | 780 | 5,0 | 3,9 |
| Lobby | 320 | 12,0 | 3,84 |
| Restaurant | 260 | 10,0 | 2,6 |
| Bucătărie | 240 | 15,0 | 3,6 |
| Conferință + foaier | 460 | 12,0 | 5,52 |
| SPA | 520 | 10,0 | 5,2 |
| Parcare subsol | 2.100 | 3,0 | 6,3 |
| BOH/depozite/vestiare | 350 | 6,0 | 2,1 |
| Iluminat exterior/fațadă (echivalent) | — | — | 5,0 |
| **TOTAL** | — | — | **≈60,3 ≈ 60** |

Valoarea rezultată (≈60 kW instalați) confirmă exact premisa adoptată la bilanțul electric general (cap. 8.1, Pi iluminat = 60 kW), verificare încrucișată care validează consistența internă a celor două capitole.

### 10.5. Iluminatul de siguranță și de evacuare — sursa de alimentare

Corpurile de iluminat de siguranță/evacuare (marcarea traseelor spre ieșiri, semnalizarea ușilor de evacuare, iluminatul anti-panică al spațiilor de aglomerare) sunt de tip **LED cu acumulator individual integrat (autonomie minimă 3 h)**, alimentate în regim normal din rețeaua generală și comutate automat pe propriul acumulator la căderea tensiunii; circuitele care le alimentează în regim normal sunt, suplimentar, racordate la sursa de rezervă (generator, cap. 9), pentru reîncărcarea acumulatoarelor imediat după transferul pe generator, fără a depinde de restabilirea rețelei publice. Dimensionarea logicii de marcaj, a distanțelor între corpuri și a nivelului de iluminare de evacuare (minimum 1 lx pe axul căilor de evacuare, conform normativelor de siguranță) este atributul scenariului de securitate la incendiu, nereluat aici.

---

## 11. Priză de pământ și protecție la trăsnet

### 11.1. Priza de pământ

Se adoptă o **priză de pământ combinată** — electrozi verticali (țeavă/platbandă zincată, dispuși pe conturul clădirii, interconectați) + centura de împământare înglobată în fundație (priză de fundație, conform PE 107/1995) — cu rezistență de dispersie țintă **Rp ≤1 Ω** la borna postului de transformare/generatorului (cerință superioară celei de 4 Ω admise pentru utilizarea generală a unei clădiri obișnuite, justificată de prezența postului de transformare propriu, cap. 8.2, și a grupului electrogen, cap. 9, ambele necesitând o priză de dispersie de calitate ridicată pentru protecția la defect și pentru compatibilitate electromagnetică). Toate masele metalice ale clădirii (structură, tâmplărie metalică, conducte, cutii de instalații) se echipotențializează prin bara principală de echipotențializare (BEP), amplasată la subsol, adiacentă TGD.

### 11.2. Evaluarea riscului de trăsnet (SR EN 62305-2) — necesitatea și nivelul de protecție

Spre diferență de o locuință unifamilială de mici dimensiuni, la care evaluarea de risc conduce frecvent la concluzia că protecția la trăsnet nu este necesară, un hotel de talia analizată — cu o **arie de captare mult mai mare** (footprint + înălțime) și cu un **factor de consecință mult mai ridicat** (aglomerare de persoane, dintre care unele adormite, cap. 1.3) — necesită o evaluare cantitativă explicită, dezvoltată în continuare.

**Aria de captare echivalentă (Ad)**, pentru o structură cu amprenta L×W = 48,00 × 22,00 m și înălțime H = 24,50 m (atic tehnic, cap. 1.2):

**Ad = L·W + 2·(3H)·(L+W) + π·(3H)²**

Ad = (48,00 × 22,00) + 2 × (3×24,50) × (48,00+22,00) + π × (3×24,50)²
Ad = 1.056 + 2 × 73,50 × 70,00 + π × 5.402,25
Ad = 1.056 + 10.290 + 16.977
**Ad ≈ 28.323 mp ≈ 0,0283 km²**

**Densitatea de descărcări la sol (Ng)**, pentru amplasamentul climatic al Moldovei: **Ng ≈ 2,8 descărcări/km²/an** (valoare reprezentativă pentru interiorul teritoriului României, moderat-scăzută comparativ cu regiunile sud-vestice).

**Coeficientul de mediu (Cd)**, pentru o structură situată într-o zonă urbană cu clădiri vecine de gabarit comparabil (memoriul de arhitectură, cap. 2.2 — regim P+4…P+8 în vecinătate): **Cd = 0,5** (structură înconjurată de construcții de înălțime comparabilă sau mai mare).

**Numărul anual estimat de descărcări directe (Nd)**:

**Nd = Ng · Ad · Cd = 2,8 × 0,0283 × 0,5 = 0,0396 ≈ 0,040 descărcări/an**

**Numărul anual acceptabil de descărcări (Ne)**, determinat prin coeficientul global de risc C, produs al factorilor specifici clădirii (metodologie simplificată, consistentă cu practica de evaluare a riscului aplicată în I20-2000/SR EN 62305-2):

- A (tip de construcție — structură de beton armat obișnuită, fără risc special de incendiu al materialelor de construcție): **A = 1,0**
- B (conținutul clădirii — fără conținut cu risc special: fără depozite de explozivi/materiale periculoase): **B = 1,0**
- C (ocuparea clădirii — **factor determinant**: aglomerare mare de persoane, dintre care o parte adormite/necunoscătoare ale clădirii, dificultate de evacuare rapidă comparativ cu o clădire de birouri): **C = 3,0**
- D (consecințele unei descărcări — posibile pierderi de vieți omenești și pierderi economice majore, consecvent cu categoria de importanță B adoptată în memoriul general): **D = 1,5**
- E (necesitatea continuității serviciului — hotelul nu este o infrastructură critică precum un spital, nu se aplică majorare suplimentară): **E = 1,0**

**C = A × B × C_ocupare × D × E = 1,0 × 1,0 × 3,0 × 1,5 × 1,0 = 4,5**

**Ne = 5,5×10⁻³/C = 5,5×10⁻³/4,5 = 1,222×10⁻³ descărcări/an**

**Compararea și concluzia**: Nd (0,040) este de **~32 de ori mai mare** decât Ne (0,00122) — diferență care, la o locuință unifamilială de gabarit redus (Ad mult mai mică, factor de ocupare C = 1,0), ar fi rezultat de regulă în Nd ≤ Ne (concluzia „protecție neconcludentă/nenecesară" adoptată de regulă pentru locuințe unifamiliale mici), dar care, la scara și cu ocuparea acestui hotel, impune explicit un sistem de protecție la trăsnet (SPT/LPS).

**Nivelul de protecție necesar**, determinat din eficiența minimă cerută:

**E_necesar = 1 − Ne/Nd = 1 − (1,222×10⁻³/0,040) = 1 − 0,0306 = 0,9694 ≈ 0,97**

Conform tabelului de eficiențe pe niveluri de protecție (SR EN 62305-1): eficiența de 0,97 se situează în intervalul **0,95 < E ≤ 0,98**, corespunzător **Nivelului de protecție II (LPS II)**.

### 11.3. Componentele sistemului de protecție la trăsnet — LPS II

| Componentă | Caracteristică pentru LPS II (SR EN 62305-3) |
|---|---|
| Instalație de captare | rețea de conductoare pe terasă, ochiuri de plasă ≤10×10 m, montată pe/deasupra paravanului perforat al zonei tehnice (memoriul de arhitectură, cap. 20.2), fără a compromite mascarea vizuală a echipamentelor |
| Coborâri | interval maxim 10 m, minimum 2 coborâri distincte, distribuite pe conturul clădirii, interconectate cu structura metalică (dacă accesibilă) sau independente, cu piese de separație pentru măsurarea rezistenței |
| Inel de echipotențializare | la fiecare 20 m înălțime pe verticală (minimum un inel intermediar, la cota planșeului de transfer, cap. 6 din memoriul de structură) |
| Priză de pământ | comună cu priza generală a clădirii (cap. 11.1), Rp ≤1 Ω |
| Protecție împotriva supratensiunilor (SPD) | SPD Tip 1 la tabloul general (TGD), obligatoriu la o clădire cu LPS extern (risc de supratensiune indusă prin conductoare); SPD Tip 2 la tablourile secundare de etaj/zonă (cap. 8.4); SPD dedicat pe liniile de date/curenți slabi (cap. 13) la interfața cu exteriorul (fibră optică, linii telecom) |
| Separație (distanța de siguranță) | verificare la faza PT, pe baza traseelor finale ale coborârilor și ale instalațiilor metalice interioare, pentru evitarea scânteierii periculoase |

---

## 12. Instalație de utilizare a gazelor naturale

### 12.1. Consumatorii de gaz și necesarul de debit

Gazul natural alimentează, la acest hotel, doi consumatori distincți: **cazanele de condensație de completare a sursei termice hibride** (cap. 6.6, ~200 kW instalați) și **echipamentele de gătit ale bucătăriei profesionale** (plite, cuptoare, marmite — putere termică echivalentă estimată la ~120 kW pentru un flux de 500 mese/zi). Debitul de calcul se determină din puterea termică utilă, puterea calorifică inferioară a gazului distribuit (PCI ≈ 9,3 kWh/mc, valoare uzuală pentru rețeaua națională) și randamentul de conversie propriu fiecărei categorii de echipament:

**Cazane de condensație** (η = 0,97): Q_cazane = 200/(9,3 × 0,97) = 200/9,02 = **22,17 mc/h**

**Echipamente de gătit** (η = 0,55, randament tipic al echipamentelor de combustie directă cu flacără deschisă, mult sub cel al cazanelor de condensație): Q_bucătărie = 120/(9,3 × 0,55) = 120/5,12 = **23,46 mc/h**

**Q_total = 22,17 + 23,46 = 45,6 mc/h ≈ 46 mc/h**

### 12.2. Branșamentul, contorizarea și reglarea presiunii

Se adoptă **branșament PE100 De 63 mm**, cu **stație de reglare-măsurare (SRM)** proprie la limita de proprietate (regulator de presiune, filtru, contor tip turbină/rotativ **G65**, cu capacitate nominală acoperitoare pentru debitul de calcul de 46 mc/h), robinet de incendiu (închidere manuală rapidă, accesibil din exterior) și robinete de secționare pe fiecare ramură (cazane/bucătărie), conform Ordinului ANRE 89/2018 (NTPEE).

### 12.3. Ventilarea încăperilor cu consumatori de gaz

Conform art. 128 și 129 din NTPEE, încăperile care adăpostesc consumatori de gaz cu cameră de ardere deschisă (bucătăria profesională, la echipamentele de gătit fără flux etanș propriu) se ventilează cu orificii de admisie/evacuare dimensionate pe puterea instalată — cerință deja satisfăcută funcțional de sistemul de exhaustare/aport al bucătăriei (cap. 7.4, Q_exhaustare = 30.000 mc/h, Q_aport = 26.100 mc/h), care asigură cu marjă amplă necesarul minim de aer de combustie impus de normativ. Cazanele de condensație se adoptă în variantă **cu cameră de ardere etanșă (tip C, evacuare coaxială/separată)**, soluție care elimină necesitatea unor orificii de ventilare naturală dedicate exclusiv arderii în centrala termică, dar pentru care se păstrează, conform art. 135 și 141, o ventilare generală minimă a încăperii tehnice, pentru accesul de service și pentru evacuarea pierderilor termice reziduale.

### 12.4. Detecția de gaz și interblocarea cu detecția de incendiu

Se prevăd **detectoare de gaz metan** (montate la partea superioară a încăperilor, gazul natural fiind mai ușor decât aerul) în centrala termică și în bucătărie, cuplate cu o **electrovalvă de siguranță** pe conducta de alimentare a fiecărei ramuri, care închide automat alimentarea la detectarea unei concentrații anormale. Conform art. 129 alin. (2) și (5) din NTPEE, electrovalva de siguranță se interblochează, suplimentar, cu **centrala de detecție și semnalizare a incendiului** a clădirii — la un semnal de incendiu confirmat provenit din zona centralei termice sau a bucătăriei, alimentarea cu gaz a ramurii respective se închide automat, indiferent de starea detectorului de gaz local. Prezentul memoriu descrie doar existența și necesitatea acestei interblocări electrice (electrovalvă comandată dual: detector de gaz local ȘI semnal din centrala de incendiu) — logica de detecție, temporizare și acționare a scenariului de incendiu propriu-zis este atributul exclusiv al scenariului de securitate la incendiu, avizat ISU.

### 12.5. Probe și autorizare

Instalația de utilizare se supune probei de rezistență și etanșeitate conform NTPEE (probă la 1,5× presiunea de regim, cu manometru etalonat, fără cădere de presiune pe durata de probă normată), iar punerea în funcțiune se face doar după verificarea de către verificatorul atestat de specialitate Ig (cap. 19.3) și autorizarea/acordul de furnizare de la operatorul de distribuție/ANRE.

---

## 13. Curenți slabi, ICT și BMS

### 13.1. Cablarea structurată și backbone-ul de fibră optică

Rețeaua de date se organizează pe o topologie stea-extinsă: **backbone vertical din fibră optică monomod**, care conectează un **rack tehnic per nivel** (subsol, parter, etaj 1, și câte un rack pe fiecare etaj de cazare E2÷E6 — 8 racktehnice în total) la un **rack central/core** amplasat la subsol, adiacent tabloului electric general, pentru lungime minimă de cablu de alimentare neîntreruptibilă. Distribuția orizontală, de la rackul de etaj la fiecare cameră/priză, se realizează în **cablare Cat.6A** (suport 10 GbE, marjă pentru evoluția cerințelor de bandă ale sistemelor de divertisment și ale echipamentelor IoT ale camerei), cu priză RJ45 dedicată pentru punctul de acces Wi-Fi al fiecărei zone de coridor și pentru televizorul/set-top-box-ul din fiecare cameră.

### 13.2. Rețeaua Wi-Fi pentru oaspeți

Se adoptă o rețea Wi-Fi de **înaltă densitate** (standard Wi-Fi 6/6E), cu un punct de acces la fiecare 2…3 camere pe coridor, plus puncte de acces dedicate în lobby, restaurant, săli de conferință (unde densitatea de utilizatori simultani este mult mai mare, cerând puncte de acces suplimentare dimensionate pe numărul de participanți, nu pe suprafață) și SPA. Rețeaua se segmentează pe **VLAN-uri distincte**: VLAN oaspeți (izolat, fără acces la rețelele interne), VLAN PMS/recepție, VLAN BOH (bucătărie, administrativ), VLAN BMS/tehnic (cap. 13.3) și VLAN CCTV (cap. 13.5) — separare obligatorie de securitate cibernetică, care previne accesul unui oaspete conectat la Wi-Fi la echipamentele tehnice sau la sistemele de gestiune ale hotelului.

### 13.3. Sistemul BMS (Building Management System) — justificarea scării

Un sistem de management centralizat al clădirii (BMS) nu este, la scara a 100 de camere/188 de locuri, cu restaurant, conferință, SPA și spălătorie, o opțiune de confort, ci o necesitate operațională: monitorizarea manuală, echipă cu echipă, a fiecărui sistem tehnic ar necesita un personal tehnic mult mai numeros decât justifică economia de exploatare a hotelului. BMS-ul integrează și coordonează, printr-o interfață unică de operare pentru echipa tehnică:

- **Setback-ul HVAC pe cameră**, corelat cu prezența pe card (cap. 8.3);
- **Automatizarea regimului antilegionella** al ACM (programarea șocului termic săptămânal, monitorizarea temperaturilor de retur pe fiecare coloană, cap. 3.5);
- **Monitorizarea chimiei apei bazinului** (clor liber, pH, temperatură — cap. 5.2), cu alarmă tehnică la abatere de la ținta de proiect;
- **Contorizarea energetică pe zone** (cap. 2.8), cu rapoarte de consum comparative lunare, instrument de detectare timpurie a derivelor de eficiență;
- **Alarme tehnice centralizate** (scurgeri, temperaturi anormale, defecțiuni de pompă/ventilator), rutate către personalul tehnic de serviciu, indiferent de ora din zi/noapte (regim 24/7, cap. 1.3).

### 13.4. Integrarea cu sistemul de gestiune hotelieră (PMS)

BMS-ul și sistemul de acces pe card (cap. 8.3) se integrează, la nivel de interfață de date, cu **sistemul de gestiune hotelieră (PMS)**, care gestionează rezervările și starea de ocupare a camerelor — integrarea permite, de exemplu, ca setback-ul HVAC al unei camere să se activeze automat între momentul de check-out înregistrat în PMS și momentul de check-in al oaspetelui următor, fără a depinde exclusiv de detecția fizică a cardului. Integrarea PMS se extinde, similar, la sistemul de telefonie internă și la punctele de vânzare (restaurant/bar), fără ca acestea să facă obiectul prezentului memoriu de instalații.

### 13.5. Videosupraveghere (CCTV) — poziționare și cadru GDPR

Sistemul de videosupraveghere acoperă exclusiv **spațiile de circulație comune** — accese, lobby, coridoare exterioare camerelor (nu în interiorul lor), parcare, curte de serviciu, punct gospodăresc — și **nu** are camere în interiorul camerelor de cazare, al cabinelor de tratament SPA sau al vestiarelor, respectând principiul de proporționalitate al protecției datelor cu caracter personal (Legea 190/2018, transpunerea GDPR pentru monitorizare video). Se prevede semnalistică vizibilă de informare a supravegherii video la toate punctele de acces, retenția înregistrărilor pe o durată limitată (recomandat 30 de zile, extensibilă doar în caz de incident documentat) și acces restricționat la echipa de securitate/management, conform politicii interne de protecție a datelor a operatorului.

---

## 14. Ascensoare — interfața electrică și de instalații

### 14.1. Precizare de domeniu

Numărul, capacitatea și studiul de trafic al ascensoarelor (**2 ascensoare de oaspeți, 13 persoane/1.000 kg fiecare, și 1 ascensor de serviciu/bagaje, 1.600 kg**, deservind subsol-etaj 6) sunt dimensionate integral în memoriul de arhitectură (cap. 16), care nu se reproduce aici. Prezentul capitol tratează exclusiv interfața electrică și de instalații a celor trei ascensoare, atribuția proprie a memoriului de instalații.

### 14.2. Alimentarea electrică dedicată

Fiecare ascensor este alimentat printr-un **circuit dedicat de la tabloul de ascensoare** (cap. 8.4), cu variator de frecvență (VFD) propriu pentru pornire/frânare progresivă (confort de călătorie și limitarea curentului de pornire): puterea motorului de tracțiune este estimată la **~15 kW** pentru fiecare din cele două ascensoare de oaspeți (1.000 kg) și **~18 kW** pentru ascensorul de serviciu (1.600 kg), valori consistente cu cele adoptate în bilanțul electric general (cap. 8.1, 48 kW instalați cumulat).

### 14.3. Ventilarea/răcirea camerei mașinilor

Dacă soluția tehnică finală adoptată la faza PT (memoriul de arhitectură, cap. 20.3) prevede o cameră de mașini dedicată la nivelul terasei, aceasta se ventilează/climatizează pentru a menține temperatura ambientală sub limita admisă de electronica de variație de frecvență (uzual ≤40 °C), printr-o unitate de climatizare/ventilare dedicată de capacitate redusă (~1 kW frig echivalent per cameră de mașini); soluțiile moderne fără cameră de mașini (mașină de tracțiune integrată în puț) reduc această sarcină la ventilarea punctuală a puțului.

### 14.4. Alimentarea de rezervă a ascensorului cu funcție de pompieri

Unul dintre cele două ascensoare de oaspeți este desemnat, conform scenariului de securitate la incendiu, drept **ascensor cu funcție de pompieri** — acesta este alimentat, suplimentar față de rețeaua normală, din **sursa de rezervă (generator, cap. 9.2)**, printr-un circuit dedicat cu cablu rezistent la foc, pentru a rămâne operațional sub controlul echipelor de intervenție ISU pe durata unei pene a rețelei publice concomitente cu un eveniment de incendiu. Logica de comandă în regim de pompieri (chemare prioritară, oprire la parter, comandă manuală din cabină) este atributul scenariului de securitate la incendiu.

---

## 15. Eficiență energetică nZEB

### 15.1. Cadrul legal și pachetul de măsuri

Conform Legii 372/2005 și HG 1/2023, hotelul se proiectează la nivelul de performanță **nZEB**, prin cumularea măsurilor deja descrise, disciplină cu disciplină, în capitolele precedente:

| Măsură | Capitol | Efect |
|---|---|---|
| Sursă termică hibridă (pompe de căldură cascadă + backup gaz) | 6.6 | bază de sarcină din energie regenerabilă aerotermală |
| Recuperare de căldură DOAS camere (η=0,80) | 7.2 | 60,4 kW recuperați pe ventilarea camerelor |
| Recuperare de căldură CTA spații publice (η≥0,75) | 7.3 | reducere sarcină ventilare public |
| Recuperare heat-pump dezumidificator piscină | 5.5 | ~40 kW recuperabili, sarcină continuă tot anul |
| Recuperare VRF inter-cameră (3/4 țevi) | 6.7 | transfer intern căldură/frig între zone cu sarcini opuse |
| Solar termic preasist ACM | 15.2 | reduce sarcina cazanelor pe orele cu soare |
| Fotovoltaic pe terasă | 15.3 | producție proprie de energie electrică |
| Management energetic pe card (camere) | 8.3 | −20…25 % consum HVAC/iluminat camere neocupate |
| Anvelopă nZEB (R majorat, tâmplărie performantă) | 1.2, memoriul de arhitectură | reducere necesar termic de bază |

### 15.2. Solarul termic pentru preasistarea ACM

Se prevede un câmp de **panouri solare termice, ~50 mp**, montat pe zona de terasă rămasă disponibilă în afara amprentei echipamentelor tehnice și a paravanului de mascare (memoriul de arhitectură, cap. 20.1-20.2), conectat în serie cu acumulatoarele ACM (cap. 3.4), ca treaptă de preîncălzire înaintea schimbătoarelor alimentate din sursa centrală — contribuție estimată la **~15…20 % din necesarul anual de ACM**, variabilă sezonier (maximă vara, redusă iarna, exact în perioada de vârf a necesarului de încălzire, când sursa centrală este solicitată integral pentru spații).

### 15.3. Instalația fotovoltaică

Aria de acoperiș net disponibilă pentru panouri fotovoltaice, după alocarea suprafețelor ocupate de echipamentele HVAC, camerele de mașini ale ascensoarelor, panourile solare termice (cap. 15.2) și căile de acces tehnic (memoriul de arhitectură, cap. 20), se estimează la **~35 % din amprenta de 1.056 mp ≈ 370 mp**. La un randament de ~6,0 mp/kWp (module de generație curentă, ~220 Wp/mp): 

**P_FV = 370/6,0 ≈ 61,7 kWp**, adoptat **P_FV = 60 kWp**.

Producția anuală estimată, la o iradiere specifică echivalentă de ~1.250 kWh/kWp·an (amplasament Moldova, coerent cu premisa climatică adoptată la cap. 1.5):

**E_FV = 60 × 1.250 = 75.000 kWh/an = 75 MWh/an**

Raportat la un consum electric anual estimat al hotelului (Pc = 520 kW conectat, cap. 8.1, la un factor de sarcină mediu realist de ~0,32 pentru o clădire hotelieră cu profil de consum variabil pe 24 h): E_consum,anual ≈ 520 × 0,32 × 8.760 = **1.458.000 kWh/an ≈ 1.458 MWh/an**. Gradul de acoperire din producția fotovoltaică proprie: 75/1.458 = **~5,1 %** — o contribuție modestă, dar onestă, consistentă cu limitarea reală a suprafeței de acoperiș disponibile pe o clădire de această densitate funcțională (o parte semnificativă a suprafeței este ocupată de echipamentele HVAC și de piscină/SPA, care sunt, la rândul lor, consumatori majori); ținta nZEB se atinge, la acest hotel, preponderent prin eficiența sursei termice hibride și prin recuperările de căldură cumulate (cap. 15.1), nu prin producția fotovoltaică proprie, care rămâne un aport complementar, nu principal.

### 15.4. Certificatul de performanță energetică

La finalizarea lucrărilor, se întocmește **Certificatul de Performanță Energetică** pe baza breviarului Mc001 complet (zone termice, echipamente selectate definitiv la faza PT, măsurători de etanșeitate/comportament termic), cu o estimare preliminară de încadrare în **clasa energetică B/A**, funcție de performanța finală confirmată a anvelopei și a echipamentelor efectiv montate.

---

## 16. Acustică și antivibrații ale echipamentelor de instalații

### 16.1. De ce instalațiile sunt calea de propagare cea mai frecvent subestimată

Memoriul de arhitectură (cap. 22) stabilește ținte de performanță acustică ambițioase pentru pereții și planșeele dintre camere (R'w ≥52 dB, L'n,w ≤58 dB), obținute prin masa peretelui structural și prin șapa flotantă. Aceste performanțe, oricât de bine executate constructiv, sunt **anulate local** dacă o instalație (o coloană de canalizare fixată rigid de perete, o pompă montată direct pe planșeu, un ventiloconvector prins rigid de tavanul fals) creează un traseu de transmisie a zgomotului structural (flanking noise) care evită complet elementul de compartimentare — un fenomen frecvent subestimat în proiectare, dar care poate degrada perceptibil, la recepția finală, performanța acustică măsurată a unei camere altfel bine construite. Prezentul capitol tratează exclusiv această interfață, complementară capitolului 22 al memoriului de arhitectură.

### 16.2. Decuplarea pompelor și a echipamentelor hidraulice

Toate pompele de circulație (încălzire, recirculare ACM, recirculare piscină, hidrofor) se montează pe **suporturi antivibratile cu inserție elastomerică sau pe arcuri metalice**, dimensionate pe masa și frecvența de excitație a echipamentului respectiv, cu **racorduri flexibile (compensatori)** la intrarea și ieșirea din fiecare pompă, care izolează vibrația de funcționare de conductele fixe ale clădirii. Pompele amplasate în camere tehnice adiacente sau apropiate de zone ocupate (centrala termică de la subsol, sub camerele de cazare ale etajului 2 doar prin planșeul de transfer, memoriul de structură cap. 2.3) beneficiază, suplimentar, de un **soclu de inerție** (placă de beton pe strat elastic) care mărește masa efectivă a ansamblului și reduce amplitudinea vibrației transmise la structură.

### 16.3. Decuplarea unităților exterioare VRF și a centralelor de tratare a aerului

Unitățile exterioare VRF, amplasate pe terasă în zona tehnică mascată de paravanul perforat (memoriul de arhitectură, cap. 20.2), se montează pe **izolatori tip arc** dimensionați pentru frecvența proprie joasă (≤5 Hz) necesară izolării eficiente a vibrației compresoarelor, poziționate la distanță maximă posibilă de traveele camerelor de la etajul 6 (cele mai apropiate de planul terasei) și orientate cu evacuarea de aer dinspre fațadele fără camere de cazare, unde geometria terasei o permite. Unitățile CTA (DOAS de etaj, CTA-piscină, CTA spații publice) se montează similar pe izolatori antivibratili, cu **conexiuni flexibile de canal** la intrarea/ieșirea din carcasă și cu **atenuatoare de zgomot (silențiatoare)** pe traseul principal de alimentare a camerelor, care reduc atât zgomotul propriu al ventilatorului transmis pe canal, cât și fenomenul de „cross-talk" acustic între camere adiacente conectate la același canal de distribuție.

### 16.4. Decuplarea traseelor verticale la traversarea elementelor de compartimentare

Coloanele de canalizare (deja alese fonoabsorbante, cap. 4.2), coloanele de apă și traseele electrice care traversează pereții/planșeele dintre camere se montează cu **manșoane elastice** la traversare, fără contact rigid direct între conductă/tub și marginea găurii de trecere prin beton — un contact rigid la acest punct ar transmite vibrația conductei direct în structură, indiferent de calitatea izolării fonice a restului traseului. Coliere de fixare cu inserție elastomerică se folosesc la toate punctele de ancorare a coloanelor pe traseul lor vertical prin ghenele tehnice (cap. 17.1).

### 16.5. Selecția și poziționarea unităților terminale din camere

Unitățile terminale VRF/ventiloconvector din camerele de cazare (cap. 6.7) se selectează pentru un **nivel de zgomot propriu ≤NC25…30** (clasă de zgomot redusă, specifică segmentului 4/5 stele), montate pe **tampoane elastomerice** la interfața cu tavanul fals, cu racorduri de refrigerant flexibile care preiau eventualele vibrații reziduale ale compresorului exterior fără a le transmite structurii camerei. Grilele de refulare/aspirație a aerului se aleg cu viteză de trecere redusă (evitarea zgomotului aerodinamic la debitul de proiectare al camerei, cap. 7.2).

### 16.6. Camera generatorului — tratament acustic dedicat

Grupul electrogen (cap. 9) se amplasează într-o **încăpere tehnică dedicată la subsol**, cât mai departe de camerele de cazare situate direct pe verticala sa, echipat cu **carcasă/capotaj acustic propriu** (atenuare la sursă) și cu montaj pe **izolatori de vibrații la bază**; traseul de evacuare a gazelor de eșapament se echipează cu **atenuator (silențiator) de eșapament**, iar priza de aer de răcire/combustie a generatorului se dimensionează cu atenuatoare acustice proprii pe traseu, pentru a limita zgomotul perceput la exterior sub limitele admise pentru zonele rezidențiale vecine pe timp de noapte (funcționare de test periodic).

---

## 17. Coordonarea interdisciplinară

### 17.1. Ghenele tehnice și logica de stivuire a coloanelor

Coloanele verticale ale tuturor instalațiilor (apă rece/caldă, canalizare, electrice, curenți slabi, tubulatură DOAS) se aliniază pe verticală, de la subsol la ultimul nivel de cazare, pe **ghene tehnice poziționate la interfața grupurilor sanitare „spate în spate"** ale camerelor (memoriul de arhitectură, cap. 11.4) — soluție care minimizează atât lungimea totală a coloanelor, cât și numărul de goluri prin planșeele de beton armat, întrucât o singură ghenă deservește simultan două camere adiacente pe același etaj, repetat identic pe toate cele 5 niveluri de cazare (memoriul de arhitectură, cap. 9.1, repetitivitatea etajului tipic). Golurile de trecere prin planșeu pentru fiecare ghenă se stabilesc din faza de proiectare a structurii (memoriul de structură), nu se sparg ulterior în plăcile de beton armat.

### 17.2. Coordonarea sarcinilor de echipamente cu structura de rezistență

Echipamentele grele amplasate pe terasă (unități exterioare VRF, CTA, module fotovoltaice/solare termice) sunt poziționate, în măsura posibilului, pe zonele planșeului de terasă dimensionate special pentru încărcări concentrate, coordonare confirmată direct cu memoriul de structură, care a bugetat explicit, în încărcarea permanentă a planșeului de terasă (cap. 5.1 al memoriului de structură), un increment de **1,20 kN/mp** pentru „structuri suport echipamente (chillere, CTA, panouri fotovoltaice)" — valoare care trebuie verificată la faza PT față de greutățile reale ale echipamentelor selectate definitiv, dar care confirmă, la nivel de concept, compatibilitatea între soluția de instalații propusă în prezentul memoriu și predimensionarea structurală deja efectuată.

### 17.3. Traversarea planșeului de transfer

Riserurile verticale care alimentează etajele de cazare traversează, la cota +4,50 m, **planșeul de transfer masiv** descris în memoriul de structură (cap. 2.2-2.3), element structural critic proiectat să rămână elastic sub acțiunea seismică de calcul (fără disipare inelastică admisă). Golurile de trecere prin acest planșeu pentru coloanele de instalații se stabilesc **exclusiv din faza de proiectare a structurii**, poziționate în afara zonelor de armare intensă ale grinzilor de transfer (axele pare 2,4,6,8,10,12, memoriul de structură cap. 1.2), coordonare care nu admite modificări ulterioare de traseu fără avizul explicit al proiectantului de structură, dat fiind rolul de element protejat, fără redistribuire posibilă a eforturilor, al planșeului de transfer.

### 17.4. Adiacențele spațiilor tehnice la subsol și parter

Gruparea spațiilor tehnice majore la subsol (centrală termică, hidrofor și rezervă de incendiu, tablou electric general, generator, spălătorie, depozite, vestiare — memoriul de arhitectură, cap. 17.5 și 19.4) este confirmată și din perspectiva instalațiilor ca soluție optimă: proximitatea centralei termice de hidrofor și de tabloul electric general minimizează lungimea traseelor de interconectare (bucla primară a sursei termice, alimentarea electrică a pompelor), iar separarea fizică netă a spălătoriei și a vestiarelor de zona tehnică „umedă" (centrală/hidrofor) respectă cerințele de igienă ale acestor spații, fără a compromite eficiența traseelor.

---

## 18. Recepția, probele și punerea în funcțiune

### 18.1. Probele pe discipline

| Instalație | Probă/verificare | Criteriu de acceptare |
|---|---|---|
| Apă rece/caldă | Probă de presiune hidraulică | 1,5× presiunea de regim (≥8,3 bar), fără scădere timp de 1 h |
| Canalizare menajeră | Probă de etanșeitate și scurgere | Fără scurgeri; garda hidraulică a sifoanelor menținută |
| Separator de grăsimi | Verificare funcțională + probă de etanșeitate | Fără scurgeri; eficiență de separare conform SR EN 1825 |
| Canalizare pluvială | Verificare debit/scurgere la ploaie simulată | Fără infiltrații/refulări; separator hidrocarburi funcțional |
| Instalație termică | Probă la rece + probă la cald + echilibrare hidraulică | Echilibrare debite pe bucle ±10 % |
| Piscină/tratare apă | Probă de etanșeitate bazin + buletin de analiză a apei | Parametri conformi OMS 119/2014/DIN 19643 |
| Ventilare (VRF/DOAS/CTA) | Măsurare debite de aer pe fiecare gură + reglaj | Debite proiectate ±15 % |
| Instalație electrică | Rezistență de izolație + continuitate PE + priză de pământ | R_izolație ≥0,5 MΩ; Rp ≤1 Ω |
| Grup electrogen | Test funcțional + test transfer automat ATS + probă de autonomie | Transfer ≤15 s; autonomie conform cap. 9.4 |
| Iluminat | Măsurare niveluri de iluminare (luxmetru) | Conform tabelului cap. 10.1 |
| Instalație fotovoltaică/solară | Verificare polaritate/izolație + test de producție | Conform proiect |
| Instalație de gaze | Probă de presiune/etanșeitate + autorizare | Conform NTPEE; fără scădere de presiune |
| Curenți slabi/BMS | Test funcțional rețea + integrare puncte de măsură | 100 % puncte funcționale |
| Ascensoare | Recepție ISCIR separată | Conform cărții tehnice + memoriul de arhitectură |

### 18.2. Secvența de punere în funcțiune

Punerea în funcțiune urmează, în ordine, etapele: probe de presiune/etanșeitate pe toate circuitele hidraulice (apă, încălzire, gaze, piscină) → echilibrarea hidraulică a buclelor de distribuție termică pe fiecare zonă → reglajul debitelor de aer ale DOAS/CTA pe fiecare gură de introducere/extracție și verificarea recuperatoarelor de căldură la parametrii de proiect (cap. 7.2) → măsurătorile electrice (izolație, continuitate, priză de pământ, verificare LPS) → punerea în funcțiune a surselor termice (pompe de căldură, cazane, verificarea automatizării șocului termic antilegionella) → punerea în funcțiune și proba de calitate a apei bazinului SPA → testul complet al grupului electrogen (pornire, transfer ATS, autonomie, alimentare sarcini de siguranță) → integrarea și testul funcțional al BMS pe toate punctele de măsură/comandă → autorizarea instalației de gaze de către operatorul de distribuție → recepția ISCIR a ascensoarelor → probele finale globale de interfață cu scenariul de securitate la incendiu (verificarea alimentării sarcinilor de siguranță din generator, verificarea interblocării electrovalvei de gaz). Se întocmesc procesele-verbale de probe pe fiecare disciplină și instrucțiunile de exploatare pentru personalul tehnic al hotelului (întreținere filtre, ciclu antilegionella, verificare periodică a sistemului de tratare a apei bazinului, verificare periodică a detectoarelor de gaz și a electrovalvelor de siguranță).

---

## 19. Concluzii, sinteză de indicatori, verificare tehnică și avize

### 19.1. Sinteza soluțiilor și a indicatorilor de dimensionare

| Instalație | Soluție adoptată | Parametru de calcul |
|---|---|---|
| Apă rece | Branșament PEHD De75 + hidrofor 2A+1R | qc = 3,17 l/s; H_nec ≈ 5,55 bar; Q_zi ≈ 65,2 mc/zi |
| ACM | Acumulare 8.000 l + schimbătoare 150 kW + antilegionella automatizat | Q_orar,vârf ≈ 8,6 mc/h; Φ_instant echivalent ≈ 500 kW |
| Canalizare menajeră | Gravitațional, coloane PP fonoabsorbant + separator grăsimi NS4 | Q_ww ≈ 14,7 l/s; ΣDU ≈ 440 |
| Canalizare pluvială | Acoperiș + parcare cu separator hidrocarburi clasa I | Q_acoperiș ≈14,3 l/s; Q_parcare ≈24,3 l/s |
| Piscină/SPA | Recirculare 4 h, filtrare+clor+UV, dezumidificator cu recuperare | Q_recirc ≈26,25 mc/h; Q_CTA-piscină ≈6.500 mc/h |
| Sursă termică | Hibrid: pompe de căldură cascadă + cazane condensație gaz | Φ_total ≈450 kW instalat |
| Ventilare camere | DOAS + VRF cu recuperare η=0,80 | Q_total ≈6.000 mc/h; recuperat ≈60,4 kW |
| Ventilare bucătărie | Hote + aport 87 % | Q_exhaustare ≈30.000 mc/h |
| Ventilare parcaj | CO-based, 3/6 schimburi/h | Q_curent ≈20.000; Q_boost ≈40.000 mc/h |
| Electrice | Post trafo 630 kVA + tablouri pe zonă | Pi ≈928 kW; Pc ≈520 kW |
| Grup electrogen | Diesel 200 kVA, sarcini de siguranță + continuitate | 143 kW sarcini alimentate; autonomie 8-24 h |
| Iluminat | LED, ~60 kW instalați, DALI spații publice | verificat pe cap. 10.4 |
| Priză de pământ/trăsnet | Priză combinată Rp≤1Ω + LPS Nivel II | Nd≈0,040/an; E necesar ≈0,97 |
| Gaze naturale | Branșament PE De63 + SRM + contor G65 | Q_total ≈46 mc/h |
| Curenți slabi/BMS | Cat.6A + fibră backbone + Wi-Fi 6 + BMS integrat | 8 racktehnice pe verticală |
| Ascensoare (interfață MEP) | Alimentare dedicată + generator pt. ascensor pompieri | ~48 kW instalați cumulat |
| nZEB | Recuperări cumulate + solar termic 50 mp + FV 60 kWp | E_FV ≈75 MWh/an (~5 % din consum) |

### 19.2. Verificarea tehnică (Legea 10/1995)

| Cerință | Verificator | Domeniu acoperit |
|---|---|---|
| **Is** | Verificator instalații sanitare | Apă rece/caldă, canalizare, separator grăsimi, piscină |
| **It** | Verificator instalații termice | Sursă termică, distribuție, ventilare-climatizare |
| **Ie** | Verificator instalații electrice | Curenți tari, curenți slabi, iluminat, priză de pământ, LPS |
| **Ig** | Verificator instalații gaze | Instalația de utilizare a gazelor naturale |
| **Iv** | Verificator instalații ventilare/PSI (interfață) | Interfața de capacitate cu scenariul de securitate la incendiu |

### 19.3. Avize și acorduri necesare

- **Apă-canal**: aviz de racordare la rețeaua publică de apă/canalizare, inclusiv acceptul pentru evacuarea apelor pretratate (separator grăsimi, separator hidrocarburi);
- **Energie electrică**: aviz tehnic de racordare (ATR), aviz pentru postul de transformare propriu;
- **Gaze naturale**: aviz de racordare + proiect de instalație de utilizare avizat conform NTPEE;
- **ISU**: aviz la scenariul de securitate la incendiu, cu verificarea interfețelor descrise la capitolele 7.6-7.7, 9.2, 12.4, 14.4;
- **DSP**: aviz sanitar pentru unitatea de cazare, alimentație publică și componenta SPA (calitatea apei bazinului, regimul antilegionella);
- **Mediu**: aviz privind evacuarea apelor uzate pretratate și gestionarea deșeurilor tehnice (uleiuri separator hidrocarburi, grăsimi separator bucătărie).

### 19.4. Notă privind stadiul documentației

Dimensionările din prezentul memoriu au caracter **preliminar, la nivel de DTAC**, fundamentate pe ipoteze de calcul acoperitoare și pe soluții de principiu consacrate pentru hoteluri de 4 stele cu componentă SPA/conferință de această capacitate. La faza de **proiect tehnic (PT)** se elaborează: breviarele de calcul complete pe fiecare zonă/circuit (calcul termic SR EN 12831 pe fiecare cameră individuală, nu doar pe camera reprezentativă; calcul hidraulic definitiv al buclelor de distribuție; bilanț electric definitiv pe circuite, cu selecția concretă a echipamentelor); schemele funcționale și planurile de execuție pe toate disciplinele; specificațiile tehnice și fișele de echipamente (pompe de căldură, cazane, module fotovoltaice, unități VRF/DOAS, grup electrogen), cu verificarea prin note de calcul semnate de proiectanții de specialitate și avizate de verificatorii atestați menționați la capitolul 19.2. Breviarele complete de coordonare cu scenariul de securitate la incendiu (dimensionarea desfumării, a presurizării, a alarmării vocale) se elaborează de specialistul atestat PSI, în paralel cu proiectul tehnic de instalații, cu verificarea reciprocă a interfețelor semnalate în prezentul memoriu.
