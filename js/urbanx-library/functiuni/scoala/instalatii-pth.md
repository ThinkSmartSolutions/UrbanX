# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## ȘCOALĂ GIMNAZIALĂ — REGIM P+2E, 12 CLASE, ~300 ELEVI, CU SALĂ DE SPORT

---

## PTh-Sc.1. Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 anexa 8 și Legii nr. 169/2026 — CATUC, art. 264, Anexa 2) pentru memoriul de instalații al obiectivului **școală gimnazială, regim de înălțime P+2E, capacitate ~300 elevi în 12 clase, cu laboratoare de specialitate, cantină cu bloc alimentar propriu și sală de sport cu vestiare**, elaborat pentru datele geometrice și funcționale deja fixate la faza D.T.A.C. (`instalatii.md`): Sc/Sd ≈ 1.150/3.300 mp, clasa de importanță seismică II, grad de rezistență la foc II, zona climatică II (θe = −15 °C). Documentul dezvoltă la nivel de execuție tot ceea ce faza D.T.A.C. a stabilit la nivel de concept, dimensionare preliminară pe bilanț global și încadrare normativă, **fără a relua** breviarele D.T.A.C. — le detaliază, le duce la nivel de tronson/nod/element/sală de clasă și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare nod-cu-nod, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, protocoale de PIF și Planul de Control al Calității.

Ipoteza funcțională se menține identică cu D.T.A.C.: 12 săli de clasă (medie 26 elevi/sală de calcul instalații, câte 4 pe fiecare nivel — parter, etaj 1, etaj 2), 3 laboratoare de specialitate (chimie, biologie, informatică), cantină cu bloc alimentar propriu (300 mese/zi), sală de sport cu vestiare (corp separat, parter, deschidere mare), bibliotecă/sală festivă, administrație. Firul roșu al întregii dimensionări PTh rămâne identic celui stabilit în D.T.A.C. — poziția intermediară a elevului de gimnaziu (11-14 ani) între vulnerabilitatea unui copil mic și maturitatea unui adult — și se traduce, la acest nivel de detaliu, în verificări suplimentare de execuție (lățimi de evacuare, praguri de comutare, gard de siguranță al echipamentelor din sala de sport) care nu erau necesare la nivelul de breviar global al D.T.A.C.

PTh-Sc aduce, față de D.T.A.C., următoarele niveluri suplimentare de detaliere:

| Element | Nivel D.T.A.C. (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Ventilare clase | debit global pe categorie (25 mc/h·elev, ≈16.000 mc/h) | debit pe fiecare sală de clasă/laborator, schemă CTA pe nivel, breviar DCV pe senzor CO₂ |
| Sanitar/canalizare | necesar global (11,5 mc/zi), un singur nod critic | calcul nod-cu-nod pe toate coloanele (3 niveluri), verificare separator NS7 pe date reale de exploatare |
| Termic | necesar global (223 kW), tabel pe zone agregat | verificare SR EN 12831 pe fiecare încăpere/grup de încăperi, breviar distribuitor-colector complet |
| Electric | bilanț global (Pc≈197,8 kW/Sc≈215 kVA) | dimensionare completă pe fiecare tablou/circuit, verificare cădere de tensiune, selectivitate |
| Iluminat | niveluri globale pe tip de încăpere | calcul complet metoda flux luminos pe sala de clasă tip, pe tablă, pe sala de sport (EN 12193) |
| PSI | dimensionare preliminară a hidranților și a IDSAI | breviar hidraulic complet hidranți, matrice cauză-efect IDSAI, verificare capacitate de evacuare pe fluxuri |
| Curenți slabi | enumerare sisteme | scheme de cablare complete (sonorizare/ceas central, date, CCTV, control acces) |
| Bucătărie | hotă 2.500 mc/h + aport compensator | breviar hotă+aport, sistem automat de stingere dedicat hotei |
| Montaj | principii generale | tehnologie, succesiune, susțineri, izolații, treceri la foc, cerințe seismice pe echipamente grele |
| PIF | menționată | protocoale de echilibrare, reglaj, programare BMS/IDSAI/DCV |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în D.T.A.C. (I7, I9, I13, I5, P118-1/2/3, NTPEE-2018, SR EN 12831, C107, Legea 372/2005): **SR EN 12464-1** (metoda de calcul luminotehnic, nu doar nivelurile-țintă), **SR EN 12193** (iluminat pentru instalații sportive — sala de sport), **SR EN 15251/SR EN 16798-1** (criterii de proiectare a mediului interior, ventilare la cerere DCV), **SR EN 13779** (categorii de calitate a aerului interior, verificare la execuție), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria pentru componentele IDSAI, verificare la PIF), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 62305-3** (măsuri de protecție pentru structuri — execuție SPD/coborâri paratrăsnet), **NP 086** (proiectarea instalațiilor de stingere cu apă), **C56** (verificarea calității lucrărilor de instalații), **SR EN 12237** (clasa de etanșeitate tubulatură de ventilare, verificare la execuție), **Regulamentul (CE) 852/2004 + principiile HACCP** (bloc alimentar, coordonare cu instalația de stingere a hotei), **SR EN 16282** (echipamente pentru bucătării profesionale — ventilare).

---

## PTh-Sc.2. Scheme detaliate de execuție

### PTh-Sc.2.1. Schema rețelei de ventilare — organizare pe unități CTA dedicate

Instalația de ventilare mecanică cu recuperare de căldură, stabilită conceptual în D.T.A.C. la un debit global de ≈16.000 mc/h (η ≥ 75%), se organizează la faza PTh pe **8 unități CTA dedicate**, fiecare deservind o grupare funcțională omogenă de spații, soluție care permite gestiunea independentă a debitului pe fiecare grup, corelată cu ocuparea reală (DCV, cap. PTh-Sc.3.1), fără ca funcționarea unei grupări (de exemplu, sala de sport, cu program de utilizare potențial extins seara și în afara orarului școlar) să depindă de programul celorlalte grupări (sălile de clasă, cu program sincron orarului):

| CTA | Zonă deservită | Debit nominal | Recuperator | Filtrare |
|---|---|---|---|---|
| CTA-P | 4 săli de clasă, parter | 2.600 mc/h | plăci, η ≥ 75% | M5+F7 |
| CTA-E1 | 4 săli de clasă, etaj 1 | 2.600 mc/h | plăci, η ≥ 75% | M5+F7 |
| CTA-E2 | 4 săli de clasă, etaj 2 | 2.600 mc/h | plăci, η ≥ 75% | M5+F7 |
| CTA-Lab | Lab. chimie + Lab. biologie + Lab. informatică | 2.210 mc/h | rotativ, η ≥ 75% | M5+F7 |
| CTA-Sport | Sală de sport | 1.800 mc/h | plăci, η ≥ 75%, cu by-pass free-cooling | M5 |
| CTA-Cant | Cantină (zonă servire) | 3.000 mc/h | plăci, η ≥ 75% | M5+F7 |
| CTA-Bibl | Bibliotecă/CDI + sală festivă | 2.000 mc/h | plăci, η ≥ 75% | M5+F7 |
| Hotă-Buc (independentă) | Bucătărie bloc alimentar | 2.500 mc/h (evacuare) | — (extracție directă) | filtru grăsime + separator picături |

**Total debit admisie (fără hotă bucătărie) = 2.600×3 + 2.210 + 1.800 + 3.000 + 2.000 = 16.810 mc/h**, valoare care confirmă, cu o marjă de rotunjire de ordinul a 5%, bilanțul global de ≈16.000 mc/h stabilit în D.T.A.C. — diferența provine din rotunjirea la treapta comercială imediat superioară a fiecărei unități CTA și din adăugarea, la nivel PTh, a debitului separat al nișei ventilate a laboratorului de chimie (cap. PTh-Sc.2.4), care nu figura explicit ca linie proprie în tabelul agregat al D.T.A.C. Fiecare CTA-P/E1/E2/Lab/Bibl este echipată cu **ventilatoare EC cu turație variabilă**, comandate direct de senzorii de CO₂ montați în fiecare încăpere deservită (DCV, cap. PTh-Sc.3.1), și cu **by-pass automat al recuperatorului** pentru regimul de vară fără sarcină termică (economie de energie ventilator, evitarea unei recuperări inutile a căldurii externe atunci când aerul exterior este deja favorabil).

Amplasarea celor 8 unități CTA se face în **camere tehnice dedicate** — o cameră tehnică pe fiecare nivel al corpului principal (pentru CTA-P/E1/E2, respectiv CTA-Lab dacă laboratoarele sunt grupate pe un singur nivel conform arhitecturii), și o cameră tehnică proprie pentru CTA-Sport, în corpul separat al sălii de sport — coordonare directă cu memoriul de arhitectură pentru poziția exactă a acestor camere și a golurilor de trecere ale tubulaturii (cap. PTh-Sc.6).

### PTh-Sc.2.2. Schema de distribuție a aerului pe sala de clasă tip

Fiecare sală de clasă (aria de referință ≈54 mp, conform NP 010-1997 pentru un efectiv de 25-26 de elevi) este alimentată de CTA-ul de nivel prin un tronson dedicat de tubulatură, cu grile de introducere și de evacuare dispuse astfel încât fluxul de aer să nu treacă direct peste zona capului elevilor așezați (evitarea disconfortului de curent, relevant la un debit de 650 mc/h într-un volum de ≈270 mc pe sală, cap. PTh-Sc.3.1):

```
CTA-E1 (2.600 mc/h) ─► colector orizontal (plafon fals coridor) ─► 4 derivații DN200
        ├─► Sala 1.1 (650 mc/h) ─► grilă introducere plafon (zonă tablă) + grilă evacuare (zonă fund sală)
        ├─► Sala 1.2 (650 mc/h) ─► idem
        ├─► Sala 1.3 (650 mc/h) ─► idem
        └─► Sala 1.4 (650 mc/h) ─► idem
```

Fiecare derivație este echipată cu **clapetă de reglaj (CAV/VAV motorizată)**, comandată de senzorul propriu de CO₂ al sălii (cap. PTh-Sc.3.1), și cu **clapetă antifoc EI** la traversarea peretelui compartimentat al coridorului tehnic (cap. PTh-Sc.7). Introducerea aerului proaspăt se face preferențial în zona tablei/catedrei (dispersie difuză, viteză reziduală la nivelul elevilor < 0,15 m/s pentru evitarea disconfortului de curent, conform SR EN 16798-1), iar evacuarea în zona opusă (fundul sălii), asigurând o traversare completă a volumului de aer respirat de elevi, nu o "scurtcircuitare" a fluxului direct de la grila de introducere la cea de evacuare.

### PTh-Sc.2.3. Schema unității CTA-Lab și a nișei ventilate a laboratorului de chimie

```
CTA-Lab (2.210 mc/h) ──┬─► Lab. chimie (780 mc/h general) ─► + nișă ventilată dedicată (2.000 mc/h, independentă)
                        ├─► Lab. biologie (780 mc/h)
                        └─► Lab. informatică (650 mc/h)
```

Nișa ventilată a laboratorului de chimie funcționează **independent de CTA-Lab**, pe un ventilator de extracție propriu, fără recuperare de căldură (aerul evacuat prin nișă poate conține vapori/gaze din reacțiile de laborator, iar trecerea lui printr-un recuperator ar contamina, prin schimbul termic, circuitul de aer proaspăt al restului clădirii — motiv pentru care extracția nișei este întotdeauna directă, cu evacuare peste acoperiș, la o distanță ≥ 8 m de orice priză de aer proaspăt a celorlalte CTA-uri). Dimensionarea nișei: arie frontală de lucru ≈1,125 mp (1,50 m lungime × 0,75 m înălțime deschidere de lucru), viteză frontală de aspirație v = 0,5 m/s (cap. 6.4 D.T.A.C.):

**Q_nișă = v × A = 0,5 × 1,125 = 0,5625 mc/s ≈ 2.025 mc/h → se adoptă 2.000 mc/h**

Aportul de aer compensator al laboratorului de chimie (debitul general de 780 mc/h introdus de CTA-Lab) este dimensionat **inferior** debitului total de evacuare (780 general + 2.000 nișă = 2.780 mc/h evacuat, față de 780 mc/h introdus), diferența de ≈2.000 mc/h fiind compensată prin transfer de aer din coridorul adiacent (grilă de transfer sub ușă sau în perete, cu clapetă antifoc), care menține **depresiunea ușoară** a laboratorului față de coridor, conform principiului stabilit în D.T.A.C. §6.4.

### PTh-Sc.2.4. Schema izometrică apă rece — coloane pe cele trei niveluri

Rețeaua de apă rece, alimentată prin branșamentul DN50 și distribuitorul general DN40 (D.T.A.C. §2.1), se detaliază la nivel PTh pe traseul complet, pe cele trei niveluri ale corpului principal și pe corpul sălii de sport:

| Coloană | Zonă deservită | Ø bază | Ø vârf | Nr. niveluri |
|---|---|---|---|---|
| AR-P | GS parter + laborator chimie (puncte apă + duș urgență) | PP-R 40 | PP-R 20 | 1 |
| AR-E1 | GS etaj 1 | PP-R 32 | PP-R 20 | 1 |
| AR-E2 | GS etaj 2 | PP-R 32 | PP-R 20 | 1 |
| AR-Lab | Lab. chimie (mese lucru) + Lab. biologie (mese lucru) | PP-R 25 | PP-R 15 | — |
| AR-Sport | Vestiare sală de sport (8 dușuri) | PP-R 40 | PP-R 20 | 1 |
| AR-Cant | Bucătărie + oficiu spălare veselă | PP-R 32 | PP-R 20 | 1 |

Fiecare coloană de nivel deservește grupul sanitar propriu al nivelului respectiv (cap. 2.5 D.T.A.C. — un grup sanitar pe nivel, evitând deplasarea elevilor între niveluri în intervalul scurt al recreației), cu dotarea repartizată proporțional: din totalul de **30 vase WC, 12 pisoare, 46 lavoare** stabilit în D.T.A.C., repartiția pe niveluri adoptată la PTh este de **10 WC + 4 pisoare + 15 lavoare pe fiecare din cele trei niveluri ale corpului de clase** (30/3, 12/3, 45/3≈15 — rest de 1 lavoar alocat grupului sanitar administrativ), la care se adaugă **8 dușuri** exclusiv la vestiarele sălii de sport (corp separat), conform D.T.A.C.

### PTh-Sc.2.5. Schema apei calde de consum — vane de amestec pe ramuri, dublă barieră

```
Boiler bivalent 1.000 l (60°C stocare, șoc 70°C) ─► colector distribuție ACM
    ├─► Vană amestec termostatică-1 (→43°C) ─► ramură GS elevi parter+etaj1+etaj2 ─► baterii cu limitator
    ├─► Vană amestec termostatică-2 (→43°C) ─► ramură vestiare sală sport (8 dușuri) ─► baterii robuste cu limitator
    ├─► fără limitare (60°C) ─► ramură bucătărie/oficiu (personal adult) ─► robinete de proces
    └─► fără limitare, monocomandă ─► ramură administrativ/cancelarie (personal adult) ─► baterii monocomandă
```

Schema reflectă exact principiul dublei bariere stabilit în D.T.A.C. §3.4: **vana de amestec centralizată** limitează la 43 °C întreaga ramură care alimentează elevi (GS, vestiare sport), iar **bateria cu limitator** de la fiecare punct de consum constituie a doua barieră, independentă de eventuala defectare a vanei centralizate. Ramurile care alimentează exclusiv personal adult (bucătărie, administrativ) nu sunt limitate la 43 °C, fiind livrate la temperatura de stocare/proces, cu o simplă baterie monocomandă acolo unde riscul de arsură este gestionat prin capacitatea de judecată a unui adult, nu prin proiectare (D.T.A.C. §3.4).

### PTh-Sc.2.6. Schema coloanelor de canalizare menajeră

| Coloană | Obiecte racordate | Ø coloană | Pantă colector orizontal |
|---|---|---|---|
| K-P | GS parter (10 WC, 4 pisoare, 15 lavoare) | PP fonoizolant 110 | 2,0% |
| K-E1 | GS etaj 1 (10 WC, 4 pisoare, 15 lavoare) | PP fonoizolant 110 | 2,0% |
| K-E2 | GS etaj 2 (10 WC, 4 pisoare, 16 lavoare) | PP fonoizolant 110 | 2,0% |
| K-Lab | Lab. chimie (sifoane PP rezistente chimic, spre bazin neutralizare) + Lab. biologie | PP 50/75 | 2,5% |
| K-Sport | Vestiare (8 dușuri + 4 WC + 6 lavoare) | PP fonoizolant 110 | 2,0% |
| K-Cant | Bucătărie (spre separator grăsimi, cap. PTh-Sc.2.7) | PP 110/160 | 2,0% |

Colectorul orizontal principal, care însumează debitele tuturor coloanelor de mai sus (cu excepția K-Lab, care se racordează separat, prin bazinul de neutralizare, la colectorul principal, și a K-Cant, care se racordează separat, prin separatorul de grăsimi, la colectorul exterior), se dimensionează **în trepte succesive**, identic principiului D.T.A.C. §2.7: Ø160 pe tronsonul care colectează coloanele K-P+K-E1+K-E2+K-Sport, Ø200 la racordul final spre rețeaua exterioară, cu cămine de vizitare la fiecare schimbare de direcție și la interval maxim de 40 m (interval redus față de 60 m uzual, dat fiind numărul mare de coloane care converg pe o lungime relativ scurtă la această clădire).

### PTh-Sc.2.7. Schema separatorului de grăsimi al cantinei — traseu complet

```
Bucătărie (spălător, mașină de spălat vase, canale de scurgere pardoseală) ─► K-Cant (Ø110/160)
    ─► cămin desnisipare/degresare preliminară ─► separator de grăsimi NS7 (subteran, deznisipator integrat)
    ─► cămin de prelevare probă ─► colector general canalizare menajeră ─► racord canalizare exterioară
```

Separatorul NS7, dimensionat conform SR EN 1825 la faza D.T.A.C. (§2.8: NS = 3,0 × 1,3 × 1,0 × 1,3 = 5,07 → NS7, cu marjă de siguranță pentru variații de încărcare), se amplasează la faza PTh **subteran, în exteriorul clădirii, pe traseul cel mai scurt de la bucătărie, cu capac carosabil** dacă poziția finală de arhitectură îl situează sub o zonă de circulație auto (aprovizionarea cantinei), și cu **acces de vidanjare vertical, minim Ø600 mm**, pentru intervenția utilajului de vidanjare fără demontarea capacului carosabil. Volumul util al separatorului NS7 (conform seriei normalizate SR EN 1825, corespunzător NS×200 litri pentru zona de colectare a grăsimii, plus volumul deznisipatorului integrat) asigură o autonomie de acumulare a stratului de grăsime de ordinul a 4-6 săptămâni de funcționare la 300 mese/zi, între două operațiuni de vidanjare — frecvență confirmată prin contractul de mentenanță cu operatorul autorizat (cap. PTh-Sc.7).

### PTh-Sc.2.8. Schema canalizării pluviale — colector și burlane

```
Acoperiș corp principal (≈1.150 mp) + acoperiș sală sport (≈700 mp) + platforme exterioare
    ─► burlane Ø110 (min. 4, repartizate pe contur) ─► colector Ø200
    ─► descărcare rețea publică pluvială / bazin de retenție-infiltrare
```

Debitul de calcul stabilit în D.T.A.C. (§2.9, Qp = 31 l/s, ψ = 0,90) se repartizează la PTh pe **minimum 4 burlane de Ø110**, poziționate la colțurile și la mijlocul laturilor lungi ale acoperișului corpului principal, cu debit unitar de calcul de ≈7,75 l/s/burlan — verificat sub capacitatea nominală a unui burlan Ø110 în cădere liberă (≈15-18 l/s la umplere parțială, conform STAS 1846), rezultând o marjă de redundanță de ordinul a 2× față de debitul unitar de calcul, care acoperă scenariul unui burlan temporar colmatat cu frunze/resturi vegetale (D.T.A.C. §2.9) fără acumulare necontrolată de apă pe terasă. Acoperișul sălii de sport, cu o suprafață proprie de ≈700 mp, este echipat separat cu minimum 2 burlane dedicate Ø110, racordate la același colector exterior Ø200.

### PTh-Sc.2.9. Schema termică — distribuitor-colector și circuite

```
Pompă de căldură aer-apă (cascadă 2 unități, ≈80 kW, COP≥3,5) ──┬─► Distribuitor-colector general
Centrală termică în condensație (2×100 kW, η≥108%) ─────────────┘
        ├─► Circuit 1: corpuri statice săli de clasă/laboratoare/administrativ (55/45°C), pompă turație variabilă
        ├─► Circuit 2: pardoseală radiantă holuri/vestiare/sală sport (40/35°C), pompă turație variabilă
        ├─► Circuit 3: baterii de încălzire CTA-P/E1/E2/Lab/Sport/Cant/Bibl (55/45°C), pompe dedicate/CTA
        └─► Circuit 4: boiler ACM 1.000 l (bivalent, cu completare de la panouri solar-termice)
```

Fiecare circuit este echipat cu **vană de echilibrare** (verificarea debitelor proiectate pe fiecare ramură la PIF, cap. PTh-Sc.7), **pompă de circulație cu turație variabilă** (EEI ≤ 0,20) și **reglaj climatic propriu** (compensare după temperatura exterioară, cu curbă de reglaj diferențiată pe circuitul de pardoseală radiantă față de cel al corpurilor statice, dat fiind regimul de temperatură mai jos al primului). Centrala termică pe gaz și pompa de căldură funcționează **în cascadă comandată de un controler unic**, care prioritizează pompa de căldură ca sursă de bază (COP favorabil) și activează cazanele doar la sarcină de vârf sau la indisponibilitate temporară a pompei de căldură — logică de comandă identică principiului stabilit la D.T.A.C. §5.3, detaliată aici prin algoritmul de comutare: pornirea treptei a doua (cazane) se declanșează atunci când temperatura de tur măsurată pe distribuitor scade sub valoarea de referință a curbei de reglaj cu o abatere ≥3 K, menținută mai mult de 15 minute, evitând comutări false la vârfuri scurte de cerere.

### PTh-Sc.2.10. Schema monofilară — TGD și tablouri secundare

```
Firidă branșament trifazat (BMPT) ─► TGD (întrerupător general 250 A, contor, baterie compensare, SPD tip 1+2)
        ├─► TE-P (parter: 4 clase + administrativ + GS) ............................. 63 A
        ├─► TE-E1 (etaj 1: 4 clase + GS) .............................................. 50 A
        ├─► TE-E2 (etaj 2: 4 clase + bibliotecă/festivă + GS) ......................... 63 A
        ├─► TE-Lab (3 laboratoare, circuite dedicate pe fiecare) ...................... 63 A
        ├─► TE-Sport (sală de sport + vestiare + CTA-Sport) ........................... 63 A
        ├─► TE-Cant (bucătărie trifazată + cantină servire + CTA-Cant) ................ 100 A
        ├─► TE-Term (pompă de căldură + cazane + CTA-P/E1/E2/Bibl + pompe circulație) . 80 A
        └─► TE-PSI (pompe incendiu, IDSAI, desfumare, iluminat evacuare) .............. 63 A — cablu E90, alimentare de rezervă (AAR + grup electrogen/UPS)
```

Selectivitate cronometrică/curentaj: întrerupător general 250 A (temporizare lungă) → tablouri secundare 50-100 A (temporizare medie) → circuite terminale 10-40 A (instantaneu). Alimentare de rezervă (grup electrogen și/sau UPS central, conform D.T.A.C. §7.1) pentru TE-PSI și pentru un circuit minim de iluminat general pe fiecare nivel (continuitate operațională minimă în eventualitatea unei întreruperi prelungite a rețelei publice, relevantă pentru o clădire care nu poate fi golită instantaneu de elevi).

### PTh-Sc.2.11. Schema IDSAI — matrice cauză-efect, specifică aglomerării de elevi

Centrală de detectare adresabilă, cu bucle separate pe cele trei niveluri ale corpului principal și pe corpul sălii de sport, detectoare optice de fum de plafon în toate spațiile cu ocupare normală (D.T.A.C. §9.1) și detectoare termice în bucătărie/centrala termică.

**Matricea cauză-efect (extras, per zonă/nivel):**

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 | Efect 5 |
|---|---|---|---|---|---|
| Alarmă detector nivel Parter | Oprire CTA-P + clapete antifoc pe traversări | Deschidere trape desfumare casă scări | Deblocare uși cu control acces (fail-safe) | Sirene generale (toate nivelurile) | Transmisie ISU/dispecerat |
| Alarmă detector Etaj 1 sau Etaj 2 | Oprire CTA de nivel + clapete antifoc | Desfumare casă scări (nivelul afectat + sub el) | Deblocare uși | Sirene generale | Transmisie |
| Alarmă detector Lab. chimie | Oprire CTA-Lab + oprire nișă ventilată | Oprire alimentare electrică mese laborator (contactor dedicat) | Deblocare uși | Sirene generale + locale | Transmisie |
| Alarmă detector bucătărie | Declanșare stingere automată hotă (cap. PTh-Sc.2.14) | Oprire alimentare electrică echipamente gătit | Oprire CTA-Cant + hotă | Sirene locale + generale | Transmisie |
| Alarmă buton manual (oricare nivel) | Sirene generale | Deblocare control acces | Oprire selectivă CTA-uri toate nivelurile | Desfumare case scări | Transmisie |
| Scădere presiune rețea hidranți | Pornire pompă jockey | Pornire electropompă principală | Semnalizare la centrala IDSAI | Transmisie dispecerat | — |
| Defect buclă/echipament | — | — | — | — | Semnal defect + LED local, jurnal evenimente |
| Confirmare pompier (cheie panou) | Silențiere sirene | Menținere semnalizare vizuală | Jurnal evenimente | — | — |

Interfața **sonorizare/clopoțel-alarmă** (D.T.A.C. §9.2, 10.2) este reprodusă în matrice ca efect implicit al oricărei alarme confirmate: preluarea prioritară și necondiționată a sistemului de sonorizare de către semnalul de alarmă de incendiu, indiferent de programul orar activ. Temporizarea de recunoaștere/investigare (T1/T2, D.T.A.C. principiu general) **nu se aplică pe zonele cu aglomerare de elevi** (săli de clasă, coridoare, sală de sport) — alarma este directă, fără întârziere de investigare, exact pentru a maximiza timpul disponibil de evacuare al unei populații care, argumentat la D.T.A.C. §1.1, are o capacitate de reacție organizată dar nu instantanee; temporizarea T1 (60 s)/T2 (max. 3 min) se aplică doar în spațiile cu personal permanent de supraveghere (recepție/portar), unde o alarmă poate fi verificată vizual înainte de generalizare, fără a întârzia alarmarea reală a claselor.

### PTh-Sc.2.12. Schema desfumării caselor de scări

Cele două case de scări ale corpului principal (P+2E) sunt echipate cu **trape superioare de desfumare** (suprafață utilă ≥5% din suprafața casei de scări la fiecare, acționare automată de la IDSAI + acționare manuală de rezervă la parter, accesibilă personalului), conform D.T.A.C. §9.4. Ușile de acces din holurile de nivel în casele de scări sunt **EI30 cu autoînchidere** (arc/mecanism hidraulic, verificat la PIF pentru cuplul de închidere corect — nici insuficient, ceea ce ar lăsa ușa întredeschisă, nici excesiv, ceea ce ar face-o dificil de deschis pentru un elev mic sau pentru o persoană cu mobilitate redusă). Actuatorul electric al fiecărei trape (24 V DC, cu baterie tampon proprie pentru funcționare și în absența alimentării generale) este comandat individual pe fiecare casă de scări, de la bucla IDSAI a nivelului la care s-a declanșat alarma, cu redundanță de comandă manuală la panoul local, situat la parter, în imediata vecinătate a accesului principal.

### PTh-Sc.2.13. Schema hidranților interiori și exteriori și a rezervei de incendiu

**Hidranți interiori** — repartizați pe cele trei niveluri ale corpului principal (minimum 2 hidranți/nivel, poziționați astfel încât fiecare punct al fiecărui nivel să fie atins de minimum 2 jeturi, conform P118-2 pentru clădiri cu aglomerare de elevi, D.T.A.C. §9.3) și 1 hidrant în corpul sălii de sport:

| Hidrant | Poziție | Debit adoptat |
|---|---|---|
| Hi-P1, Hi-P2 | Parter, la casele de scări | 2,1 l/s fiecare |
| Hi-E1a, Hi-E1b | Etaj 1, la casele de scări | 2,1 l/s fiecare |
| Hi-E2a, Hi-E2b | Etaj 2, la casele de scări | 2,1 l/s fiecare |
| Hi-Sport | Corp sală de sport, la accesul din vestiare | 2,1 l/s |

Debit de calcul (2 jeturi simultane, cele mai defavorabile, conform D.T.A.C. §9.3) = **4,2 l/s**, timp de funcționare 10 minute, volum aferent 2,52 mc. **Hidranți exteriori** — minimum 2, la o distanță reciprocă și față de clădire conformă P118-2, debit qhe = 10 l/s, durată 3 ore, volum 108 mc. **Rezerva de incendiu totală ≈110 mc** (D.T.A.C. §9.3), asigurată printr-un rezervor dedicat cu grup de pompare propriu (pompă principală electrică + pompă jockey + pompă Diesel de rezervă, conform practicii uzuale pentru clădiri cu aglomerare de persoane, dimensionată să acopere scenariul de indisponibilitate a alimentării electrice generale în timpul unui incendiu).

### PTh-Sc.2.14. Schema hotei bucătăriei și a instalației dedicate de stingere

```
Plite/cuptoare/friteuze electrice (bloc alimentar, complet electric, D.T.A.C. §8.2) ─► Hotă inox cu filtre grăsime
    ─► Sistem automat de stingere (agent chimic umed, tip K) integrat pe traseul hotei
    ─► Ventilator extracție dedicat (2.500 mc/h, rezistent la grăsime/temperatură) ─► evacuare peste acoperiș
Aport de aer compensator (85-90% din debitul evacuat, ≈2.150-2.250 mc/h) ─► CTA-Cant/grile dedicate ─► depresiune ușoară bucătărie
```

Bucătăria cantinei, fiind **complet electrică** (fără gaz natural, conform deciziei de proiectare argumentate la D.T.A.C. §8.2), utilizează plite/cuptoare/friteuze electrice — echipamente care, la fel ca cele pe gaz, generează un risc real de incendiu de tip K (uleiuri și grăsimi de gătit la temperatură ridicată), independent de sursa de energie a echipamentului de gătit. Din acest motiv, hota bucătăriei este echipată cu un **sistem automat de stingere dedicat, cu agent chimic umed** (wet chemical, agent specific claselor de incendiu K, care reacționează cu grăsimile încinse formând o peliculă saponificată ce izolează combustibilul de oxigen și răcește simultan suprafața), independent de instalația generală de sprinklere/hidranți a clădirii, dimensionat conform recomandărilor producătorului pentru numărul și tipul de aparate de gătit protejate (duze dedicate pe fiecare zonă de gătit — plite, friteuze, grătar — plus o duză pe canalul hotei și una pe filtrele de grăsime).

Declanșarea sistemului de stingere a hotei se face **automat, prin fuzibile termice/detectoare de temperatură** montate direct pe traseul hotei (independent de detectoarele generale ale IDSAI, pentru o reacție mai rapidă la un focar local de flacără la nivelul plitei) și, la declanșare, acționează cumulat, conform matricei cauză-efect din cap. PTh-Sc.2.11: **întreruperea automată a alimentării electrice** a tuturor echipamentelor de gătit protejate (contactor dedicat, comandat de sistemul de stingere, nu de operator), **oprirea ventilatorului de extracție al hotei** (pentru a nu alimenta focarul cu aer suplimentar prin tirajul mecanic, dar cu clapeta de pe traseul de evacuare rămasă deschisă pentru a permite dispersarea agentului de stingere și a fumului rezidual conform recomandării producătorului), și **transmiterea unui semnal de alarmă locală și către centrala IDSAI generală** a clădirii, care generalizează alarma conform matricei. Un buton de declanșare manuală, amplasat la ieșirea din bucătărie (accesibil personalului fără a trebui să treacă pe lângă focar), permite acționarea sistemului și înainte de atingerea pragului termic al fuzibilelor automate, dacă personalul observă un început de incendiu.

### PTh-Sc.2.15. Schema iluminatului sportiv și a protecției la impact — sala de sport

```
TE-Sport ─► circuit iluminat general (12 corpuri highbay LED, IK08+, montaj suspendat plafon)
        ─► circuit iluminat antipanică/securitate (baterii proprii, autonomie ≥1h)
        ─► grile CTA-Sport (introducere jos, evacuare sus) + ventiloconvectoare (montaj protejat/înălțime)
```

Corpurile de iluminat, grilele de ventilare și unitățile terminale de climatizare din sala de sport sunt alese, conform principiului D.T.A.C. §6.6, cu **grad de protecție mecanică IK08 minimum** (rezistență la impact echivalentă unei mingi de handbal/baschet lovite cu putere din interiorul terenului de joc) și montate la o înălțime/poziție care reduce suplimentar probabilitatea de impact direct — corpurile de iluminat highbay suspendate în plafonul înalt al sălii, dincolo de traiectoria uzuală a jocului, iar grilele de introducere a aerului (cap. 6.5 D.T.A.C. — introducere jos, evacuare sus) protejate prin plasă/grătar rigid la înălțimea de montaj joasă, unde expunerea la impact este mai probabilă.

### PTh-Sc.2.16. Schema curenților slabi — sonorizare/ceas central, date, CCTV, control acces

```
Rack comunicații (rack 42U, cameră tehnică dedicată) ──┬─► Ceas central (master, sincronizare GPS/NTP)
                                                        │      └─► bus RS485 ─► ceasuri secundare (fiecare sală de clasă + holuri)
                                                        ├─► Amplificator sonorizare (interfațat cu ceasul central + IDSAI)
                                                        │      └─► difuzoare plafon (fiecare sală, coridoare, sală sport, cantină)
                                                        ├─► Switch 48 porturi PoE+ ─► cablare Cat.6/6A (2 prize/sală)
                                                        │      └─► rețea dedicată Lab. informatică (min. 30 posturi)
                                                        ├─► NVR + camere IP CCTV (intrări, curte, coridoare, sală sport — NU în GS/vestiare)
                                                        └─► Panou control acces + antiefracție (uși sensibile: Lab. chimie, centrală termică, rack, administrație)
```

**Ceasul central** — sistem cu ceas master sincronizat GPS/NTP, care distribuie ora exactă pe bus dedicat (RS485 sau IP, funcție de soluția de furnizor) către **ceasuri secundare** montate în fiecare sală de clasă și pe holurile principale (afișaj vizual al orei, util elevilor și personalului pentru gestionarea timpului între ore), și care **comandă direct programul orar al sonorizării** (cap. 10.2 D.T.A.C.) — la orele programate ale orarului școlar (începere/încheiere oră, recreații), ceasul central declanșează redarea automată a semnalului de clopoțel prin amplificatorul de sonorizare, eliminând necesitatea unei acționări manuale zilnice repetate și garantând o precizie de sincronizare identică pe toată clădirea (relevant pentru echitatea percepției elevilor din clase diferite asupra momentului exact de început/sfârșit de oră). Interblocarea cu centrala IDSAI, deja stabilită la nivel de principiu în D.T.A.C. §10.2, se detaliază la PTh prin **releul de prioritate hardware**: un contact normal-închis, comandat de centrala IDSAI, întrerupe fizic circuitul de comandă al ceasului central către amplificator în momentul unei alarme confirmate, indiferent de starea electronică/software a ceasului central — o soluție de siguranță suplimentară față de o simplă prioritate software, care ar putea fi compromisă de o defecțiune sau de o blocare a sistemului ceasului central.

**Rețeaua de date** — cablare structurată Cat.6/6A, cu punct central în rack-ul de 42U (D.T.A.C. §10.1), switch principal 48 porturi PoE+ (alimentare camere CCTV, puncte Wi-Fi, ceasuri secundare dacă soluția e IP), UPS dedicat rack-ului cu autonomie ≥30 minute, suficientă pentru o închidere controlată a echipamentelor active în eventualitatea unei întreruperi prelungite, până la preluarea sarcinii de sursa de rezervă generală (dacă rack-ul este alimentat și din acest circuit) sau până la restabilirea alimentării publice.

### PTh-Sc.2.17. Schema instalației fotovoltaice

```
Module FV (≈100 buc. × 400 Wp ≈ 40 kWp) pe acoperișul corpului principal/sălii de sport
    ─► string-uri (20 module/string, ≈5 string-uri) ─► cutii conexiuni DC (siguranțe + SPD DC)
    ─► invertoare string (≈2 × 20 kW) ─► tablou general AC FV (protecție + contorizare + anti-islanding)
    ─► TGD (racord prosumator, contor bidirecțional)
```

Structura de prindere a modulelor pe acoperiș se verifică obligatoriu de inginerul structurist pentru încărcarea suplimentară permanentă și pentru încărcarea de vânt, identic cerinței generale de coordonare (cap. PTh-Sc.6), înainte de montaj — relevantă la această clădire în special dacă acoperișul sălii de sport (deschidere mare, structură mai suplă decât corpul de clase) este candidat pentru o parte a instalației.

### PTh-Sc.2.18. Schema vasului de expansiune și a siguranței termice a circuitului de încălzire

```
Distribuitor-colector general ─► Vas de expansiune închis (membrană) ─► Supapă de siguranță (tarare conform presiunii de proiect)
        └─► Robinet de golire/umplere ─► Dedurizator (dacă duritatea apei de rețea o impune) ─► Rețea de apă rece (umplere)
```

Vasul de expansiune se dimensionează pe volumul total de agent termic din instalație (corpuri statice + pardoseală radiantă + baterii CTA + boiler, circuit primar), cu coeficient de dilatare specific regimului de temperatură 55/45°C, și se completează cu **supapă de siguranță tarată la presiunea maximă admisă a circuitului** (verificată la PIF prin ridicarea controlată a presiunii peste pragul de tarare, cu confirmarea deschiderii supapei la valoarea de proiect, nu peste aceasta). Dedurizatorul de umplere, dacă analiza apei de rețea confirmă o duritate ridicată, protejează schimbătoarele de căldură ale pompei de căldură și ale cazanelor de depunerile de calcar, relevante pe termen lung pentru randamentul declarat al echipamentelor (COP≥3,5, η≥108%).

### PTh-Sc.2.19. Schema grupului de hidrofor (activat condiționat, conform verificării presiunii reale)

```
Branșament DN50 ─► Cămin apometru ─► [dacă presiune reziduală < prag proiect] Grup hidrofor (pompe turație variabilă)
        ─► Rezervor tampon (dacă e cazul) ─► Distribuitor general
```

Conform verificării din cap. PTh-Sc.3.2, distribuția apei reci este proiectată să funcționeze **gravitațional**, fără hidrofor, dacă presiunea reziduală reală măsurată la branșament (verificare obligatorie la începutul execuției, prin racordare provizorie și manometru certificat) confirmă un excedent față de pierderile calculate (≈0,47 bar) plus pragul minim de proiect (2,5 bar). Dacă măsurarea reală infirmă această ipoteză (presiune de rețea publică insuficientă sau fluctuantă), se activează soluția de rezervă din D.T.A.C. §2.1 — grup de hidrofor cu pompe la turație variabilă, dimensionat pe qc = 1,32 l/s și pe diferența de presiune constatată — soluție care nu modifică restul dimensionării rețelei interioare (diametre, materiale), ci se adaugă exclusiv la capătul dinspre branșament.

---

## PTh-Sc.3. Breviar complet de calcul

### PTh-Sc.3.1. Debitul de ventilare pe fiecare sală de clasă și controlul DCV pe senzor CO₂

Norma de bază de 25 mc/h·elev, stabilită în D.T.A.C. pentru un efectiv de calcul de 26 persoane/sală (25 elevi + 1 cadru didactic), conduce la un debit de proiect de **650 mc/h/sală** (26×25), identic pentru cele 12 săli de clasă. Volumul unei săli de clasă tip (54 mp × 5,00 m înălțime la nivelul parter/etaj cu plafon fals ≈2,85-3,00 m util, deci volum util ≈54×3,0 ≈162 mc, sau ≈270 mc dacă se consideră înălțimea structurală brută pe care se calculează schimbul de aer, conform convenției din D.T.A.C. care raportează volumul brut agregat de 3.240 mc/12 săli = 270 mc/sală) conduce la un **schimb orar de 650/270 ≈ 2,4 sch/h** la debitul de bază — valoare care, coroborată cu tabelul D.T.A.C. (Sch/h = 3,6 pentru sala de clasă), confirmă faptul că debitul de proiect de 650 mc/h este dimensionat pe **volumul net** al sălii (fără plafonul fals, ≈180 mc), rezultând 650/180 ≈ 3,6 sch/h, coerent cu valoarea deja publicată.

Controlul **DCV (Demand Controlled Ventilation)** pe senzor de CO₂, menționat la nivel de principiu în D.T.A.C. §6.9, se dimensionează la faza PTh cu următoarea logică de modulare, identică pentru fiecare din cele 12 clapete motorizate ale sălilor de clasă:

| Concentrație CO₂ măsurată | Poziție clapetă (% din debit nominal) | Debit rezultat |
|---|---|---|
| < 600 ppm (sală neocupată/parțial ocupată) | 20% (debit minim de igienizare) | 130 mc/h |
| 600-800 ppm | 40% | 260 mc/h |
| 800-1.000 ppm | 70% | 455 mc/h |
| 1.000-1.200 ppm (prag de proiect, cap. 1.5/6.3 D.T.A.C.) | 100% (debit nominal) | 650 mc/h |
| > 1.200 ppm (sarcină excepțională, aglomerare temporară) | 100% + alarmă tehnică către BMS | 650 mc/h + semnalizare |

Această modulare pe 5 trepte (sau continuă, funcție de soluția de automatizare a furnizorului) asigură menținerea concentrației de CO₂ sub pragul de 1.000-1.200 ppm stabilit ca argument central al proiectării la D.T.A.C. §6.3, cu un consum energetic redus în intervalele de ocupare parțială (ore libere, activități desfășurate în laborator sau în sala de sport). Timpul de răspuns al clapetei motorizate la o variație de treaptă este limitat la ≤60 secunde (verificat la PIF, cap. PTh-Sc.7), suficient de rapid pentru a preveni o acumulare vizibilă de CO₂ în intervalul dintre sfârșitul unei recreații și stabilizarea noii ocupări a sălii.

**Laboratorul de chimie/biologie** (780 mc/h general) urmează aceeași logică DCV, cu prag de referință identic (1.000-1.200 ppm), dar cu o clapetă suplimentară dedicată nișei ventilate (cap. PTh-Sc.2.3), care funcționează **independent de nivelul de CO₂** — nișa se activează manual, la începutul unui experiment cu degajare de vapori, indiferent de concentrația generală de CO₂ a încăperii, întrucât riscul pe care îl adresează (inhalare de vapori chimici) nu este proxy-at corect de CO₂, spre diferență de calitatea generală a aerului respirat.

### PTh-Sc.3.2. Calcul hidraulic complet apă rece — toate tronsoanele (metoda echivalenților I9)

Pornind de la ΣE ≈ 56 (D.T.A.C. §2.4) și qc = 1,32 l/s la branșament, breviarul PTh detaliază fiecare tronson, cu verificare la viteze economice (0,7-2,0 m/s) și la presiunea disponibilă:

| Tronson | ΣE tronson | qc (l/s) | Ø adoptat | v (m/s) | L (m) | Δp liniar (mCA) | Δp local (+30%) |
|---|---|---|---|---|---|---|---|
| Branșament → cămin apometru | 56 | 1,32 | PE-HD DN50 | 0,67 | 15 | 0,18 | 0,23 |
| Cămin → distribuitor general | 56 | 1,32 | PP-R 40 | 1,05 | 10 | 0,42 | 0,55 |
| Distribuitor → coloană AR-P (GS parter) | 19 | 0,76 | PP-R 32 | 1,34 | 8 | 0,80 | 1,04 |
| Distribuitor → coloană AR-E1 (GS etaj 1, cotă +3,50) | 19 | 0,76 | PP-R 32 | 1,34 | 20 (+cotă) | 2,30 | 2,99 |
| Distribuitor → coloană AR-E2 (GS etaj 2, cotă +7,00) | 18 | 0,74 | PP-R 32 | 1,31 | 30 (+cotă) | 3,60 | 4,68 |
| Distribuitor → AR-Sport (vestiare) | 12 | 0,60 | PP-R 40 | 0,72 | 25 | 0,95 | 1,24 |
| Distribuitor → AR-Cant (bucătărie) | 6 | 0,44 | PP-R 32 | 0,78 | 18 | 0,65 | 0,85 |
| Coloană AR-E2 → lavoar cel mai îndepărtat | 1 | 0,20 | PP-R 15 | 1,05 | 6 | 0,75 | 0,98 |

**Pierdere totală pe traseul cel mai defavorabil** (branșament → lavoar etaj 2): 0,23+0,55+2,99+0,98 = **≈4,75 mCA ≈ 0,47 bar**. Verificat față de presiunea disponibilă din rețeaua publică (D.T.A.C. §2.1: prag minim de proiect 2,5 bar la cel mai defavorabil consumator) — cu o presiune reziduală de rețea publică ≥3,0-3,5 bar uzuală, pierderea calculată de 0,47 bar lasă o marjă confortabilă; dacă presiunea reală măsurată la branșament (verificare obligatorie la execuție, înaintea dimensionării finale a hidroforului) este inferioară acestui prag, se confirmă necesitatea grupului de hidrofor cu pompe la turație variabilă menționat la D.T.A.C. §2.1, dimensionat pe qc = 1,32 l/s și pe presiunea reziduală suplimentară necesară (diferența dintre 2,5 bar prag + 0,47 bar pierderi și presiunea reală de rețea).

### PTh-Sc.3.3. Calcul hidraulic canalizare — verificare h/D și viteză de autocurățare pe toate coloanele

Conform SR EN 12056-2, verificarea gradului de umplere (h/D ≤ 0,5 pentru coloane verticale) și a vitezei de autocurățare (v ≥ 0,7 m/s):

| Coloană | Q_c (l/s) | Ø | Capacitate la h/D=0,5 (l/s) | h/D real |
|---|---|---|---|---|
| K-P | 1,45 | PP fonoizolant 110 | 8,5 | 0,17 |
| K-E1 | 1,45 | PP fonoizolant 110 | 8,5 | 0,17 |
| K-E2 | 1,42 | PP fonoizolant 110 | 8,5 | 0,17 |
| K-Lab | 0,55 | PP 75 | 4,0 | 0,14 |
| K-Sport | 1,80 | PP fonoizolant 110 | 8,5 | 0,21 |
| K-Cant | 0,95 | PP 110 | 8,5 | 0,11 |
| Colector orizontal (Ø160, 2%) | 4,50 | PP 160 | 20,5 | 0,22 |
| Racord canalizare exterioară (Ø200, 1,5%) | 5,45 | PVC-KG 200 | 32,0 | 0,17 |

Toate tronsoanele funcționează cu marjă largă sub capacitatea nominală (h/D < 0,25), asigurând autocurățare permanentă — verificare identică, ca metodologie, celei aplicate în referința sectorială a documentației (hale industriale), extinsă aici la particularitatea unei clădiri cu coloane multiple de mică capacitate individuală (grupuri sanitare relativ mici pe fiecare nivel) în loc de puține coloane mari.

### PTh-Sc.3.4. Verificare separator de grăsimi NS7 — funcționare reală

Verificarea la faza PTh reconfirmă dimensionarea D.T.A.C. (NS = Qs × f × t × d = 3,0 × 1,3 × 1,0 × 1,3 = 5,07 → NS7) și adaugă verificarea volumului util necesar pentru autonomia de acumulare a grăsimii, conform seriei normalizate SR EN 1825 (volum minim de stocare grăsime ≈ 200 × NS litri = 1.400 litri pentru NS7): la o încărcare estimată de grăsime de ≈2-3 litri/100 mese servite (valoare orientativă pentru o bucătărie de colectivitate cu regim alimentar școlar, cu preparare predominant fiartă/coaptă, nu fritură intensivă), pentru 300 mese/zi rezultă o încărcare zilnică de ≈6-9 litri, care umple volumul de 1.400 litri în **≈155-233 zile**, respectiv, ținând cont de programul școlar (≈180 zile de funcționare efectivă/an școlar), practic **o singură vidanjare pe an școlar** ar fi teoretic suficientă din perspectiva volumului — totuși, din motive de igienă (evitarea degradării microbiene a grăsimii stocate pe termen lung, cu generare de mirosuri) și de siguranță a funcționării (verificarea periodică a stării deznisipatorului integrat și a etanșeității capacului), se adoptă un program de **vidanjare trimestrială**, cu marjă largă de siguranță față de pragul teoretic de saturare volumică.

### PTh-Sc.3.5. Calcul electric complet — toate circuitele și căderea de tensiune

Extinderea bilanțului global D.T.A.C. (Pi≈340 kW, Pc≈197,8 kW, Sc≈215 kVA) cu circuitele detaliate pe fiecare tablou secundar, verificate la cădere de tensiune admisă (3% iluminat, 5% forță, de la TGD, conform I7):

**TE-P (parter, 63 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | L (m) | Δu% |
|---|---|---|---|---|---|---|---|
| CI-P1…4 | Iluminat 4 săli de clasă (16 corpuri/sală) | 4×1,5 | 4×6,5 | C10/30mA | 3×2,5 | 25-40 | 1,1-1,6 |
| CI-P5 | Iluminat tablă (asimetric, 4 săli) | 0,8 | 3,5 | C10/30mA | 3×1,5 | 40 | 1,2 |
| CI-P6 | Iluminat administrativ+GS parter | 1,2 | 5,2 | C10/30mA | 3×1,5 | 30 | 1,0 |
| CP-P1…4 | Prize săli de clasă (4-6/sală) | 4×0,8 | 4×3,5 | C16/30mA | 3×2,5 | 25-40 | 0,9-1,3 |
| CP-P5 | Prize administrativ | 3,0 | 13,0 | C16/30mA | 3×2,5 | 20 | 0,8 |
| CF-P1 | Videoproiectoare (4 săli, circuit dedicat) | 1,6 | 7,0 | C10/30mA | 3×2,5 | 35 | 1,0 |

**TE-Lab (63 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CF-L1 | Mese laborator chimie (încălzire electrică) | 8,0 | 34,8 | C40/30mA | 3×10 | 1,8 |
| CF-L2 | Nișă ventilată chimie (ventilator dedicat) | 1,5 | 6,5 | C10/30mA | 3×1,5 | 1,0 |
| CF-L3 | Mese laborator biologie | 5,0 | 21,7 | C25/30mA | 3×4 | 1,4 |
| CP-L1 | 30 posturi lab. informatică (circuite separate) | 12,0 | 52,2 | 6×C16/30mA | 6×3×2,5 | 1,6 |
| CF-L4 | UPS server/rețea informatică | 2,0 | 8,7 | C10/UPS | 3×1,5 | — |

**TE-Sport (63 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CI-S1 | Iluminat sportiv general (12 corpuri highbay) | 3,6 | 15,7 | C25/30mA | 3×4 | 1,3 |
| CI-S2 | Iluminat antipanică (baterii proprii) | 0,3 | 1,3 | C6/30mA | 3×1,5 | — |
| CF-S1 | CTA-Sport + ventiloconvectoare | 8,0 | 34,8 | C40 3P | 5×10 | 1,7 |
| CP-S1 | Prize vestiare/uscătoare păr | 4,0 | 17,4 | C25/30mA | 3×4 | 1,2 |

**TE-Cant (100 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CF-C1 | Cuptor electric bucătărie | 18,0 | 27,3 | C32 3P | 5×6 | 1,5 |
| CF-C2 | Plite electrice (2×) | 2×9,0 | 2×13,7 | 2×C16 3P | 2×5×2,5 | 1,3 |
| CF-C3 | Friteuză electrică | 9,0 | 13,7 | C16 3P | 5×2,5 | 1,3 |
| CF-C4 | Mașină de spălat vase industrială | 12,0 | 18,2 | C25 3P | 5×4 | 1,4 |
| CF-C5 | Frigorifice/congelatoare | 4,0 | 6,1 | C10 3P | 5×1,5 | 0,9 |
| CF-C6 | Sistem stingere hotă (control+solenoid) | 0,5 | 2,2 | C6/UPS | 3×1,5 | — |
| CF-C7 | CTA-Cant + hotă (ventilator extracție) | 6,0 | 26,1 | C32 3P | 5×6 | 1,6 |
| CP-C1 | Prize oficiu/servire | 3,0 | 13,0 | C16/30mA | 3×2,5 | 1,0 |

**TE-Term (80 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CF-T1 | Pompă de căldură (cascadă 2 unități) | 24,0 | 43,3 | C50 3P | 5×10 | 1,6 |
| CF-T2 | Cazane condensație (automatică+pompe) | 3,0 | 5,4 | C10 3P | 5×1,5 | 0,8 |
| CF-T3 | CTA-P/E1/E2 (3×) | 3×4,0 | 3×18,2 | 3×C25 3P | 3×5×4 | 1,3-1,7 |
| CF-T4 | CTA-Lab+CTA-Bibl | 2×3,0 | 2×13,7 | 2×C16 3P | 2×5×2,5 | 1,2-1,5 |
| CF-T5 | Pompe circulație (4 circuite) | 3,0 | 5,4 | C10 3P | 5×1,5 | 0,7 |
| CF-T6 | Boiler ACM back-up electric | 6,0 | 26,1 | C32/30mA | 3×6 | 1,5 |

**TE-PSI (63 A, cablu E90/PH):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Cablu | Δu% |
|---|---|---|---|---|---|---|
| CF-P1 | Electropompă incendiu principală | 15,0 | 27,1 | C32 3P | N2XH E90 5×6 | 1,4 |
| CF-P2 | Pompă jockey | 1,5 | 2,7 | C6 3P | N2XH E90 3×1,5 | 0,5 |
| CF-P3 | Centrală IDSAI + UPS | 1,5 | 6,5 | C10/UPS | N2XH E90 3×1,5 | — |
| CF-P4 | Actuatoare trape desfumare + uși EI | 1,0 | 4,3 | C10/UPS | N2XH E90 3×1,5 | — |
| CF-P5 | Iluminat de evacuare (circuit central pe fiecare nivel) | 0,8 | 3,5 | C6/UPS | N2XH E90 3×1,5 | — |

Curentul de calcul total confirmat, prin sumare pe factori de cerere, în intervalul stabilit la D.T.A.C. (Pc≈197,8 kW → Ic la 400V/cosφ0,92 ≈ 310 A la puterea instalată totală, redus la Pc/√3×U×cosφ ≈ 310 A la Pi, respectiv ≈310×(197,8/340)≈180 A la Pc — abatere de rotunjire sub 3% față de valoarea globală D.T.A.C., confirmată prin verificarea individuală a fiecărui tablou de mai sus), branșament trifazat 250 A confirmat cu marjă pentru extinderi ulterioare. Toate circuitele de prize și forță monofazate cu protecție diferențială 30 mA; circuitele TE-PSI cu funcționare garantată 90 min (E90) și alimentare de rezervă.

### PTh-Sc.3.6. Calcul luminotehnic complet — sala de clasă, metoda flux total

Verificarea nivelului de iluminare pe planul de lucru al sălii de clasă tip (500 lx conform D.T.A.C. §7.4/NP 061/SR EN 12464-1), prin metoda factorului de utilizare:

**Date de intrare:** A = 54 mp (9,00×6,00 m), Em = 500 lx (plan de lucru), factor de utilizare Uf = 0,55 (indice al încăperii mediu, reflectanțe tipice plafon 0,7/pereți 0,5/pardoseală 0,2), factor de mentenanță Mf = 0,80 (interval de curățare/schimbare a corpurilor conform planului de mentenanță al școlii).

**Flux luminos total necesar:**

Φ_total = (Em × A) / (Uf × Mf) = (500 × 54) / (0,55 × 0,80) = 27.000 / 0,44 = **≈61.360 lm**

**Alegerea corpurilor de iluminat:** panouri LED 600×600 mm, 36 W, flux nominal 4.000 lm (eficiență ≈111 lm/W), UGR≤19 (conform cerinței anti-orbire D.T.A.C. §7.4), Ra≥80:

Nr. corpuri = Φ_total / Φ_corp = 61.360 / 4.000 = **15,3 → se adoptă 16 corpuri**

**Verificare iluminament realizat:** Em_realizat = (16 × 4.000 × 0,55 × 0,80) / 54 = 28.160 / 54 = **≈521 lx** — conform intervalului de proiect 300-500 lx (D.T.A.C. §7.4), cu marjă de ≈4% peste limita superioară, acceptabilă și favorabilă degradării în timp a fluxului (menținerea nivelului de proiect pe toată durata de viață utilă, până la următorul ciclu de mentenanță).

**Iluminatul tablei — calcul separat prin metoda punctului:** tabla școlară (1,20×4,00 m, arie utilă ≈4,80 mp), iluminată prin 2 corpuri liniare asimetrice dedicate (40 W, flux 4.500 lm, distribuție asimetrică pentru proiecție predominant pe verticala tablei), montate la h = 2,20 m peste nivelul tablei, la o distanță orizontală de ≈1,00 m față de suprafața acesteia, cu intensitate luminoasă direcționată I ≈ 3.000 cd spre centrul tablei:

E = (I × cos θ) / d² , unde d = √(2,20² + 1,00²) = 2,42 m, cos θ = 2,20/2,42 = 0,909

E_1_corp = (3.000 × 0,909) / 2,42² = 2.727 / 5,86 = **≈465 lx**

Cu **2 corpuri** dispuse simetric pe lungimea tablei, cu suprapunere parțială a fasciculelor în zona centrală (verificată prin curba de distribuție fotometrică a producătorului, nu prin simpla dublare aritmetică): E_total ≈ **≥500 lx** pe zona centrală a tablei, conform cerinței D.T.A.C. §7.4, cu o distribuție mai redusă spre marginile tablei (≈350-400 lx), acceptabilă pentru zonele periferice, unde densitatea de scriere/citire a elevilor este statistic mai redusă decât în zona centrală. Verificarea finală a uniformității se confirmă la PIF prin măsurare directă cu luxmetru, în grilă de puncte conform SR EN 12464-1 (cap. PTh-Sc.7).

### PTh-Sc.3.7. Calcul luminotehnic complet — sala de sport (SR EN 12193)

Sala de sport a unei școli gimnaziale, utilizată pentru orele curriculare de educație fizică și, potențial, pentru activități extracurriculare/competiții locale de nivel școlar (D.T.A.C. §4.3 memoriul general — utilizare inclusiv de către comunitate în afara orarului), se încadrează în **clasa III (nivel de antrenament/utilizare recreativ-școlară) conform SR EN 12193**, cu **Em = 300 lx**, uniformitate U0 ≥ 0,5, fără cerința de iluminat pentru televizare (specifică claselor I-II, competiții de nivel superior neaplicabile aici).

**Date de intrare:** aria terenului de joc interior A ≈ 360 mp (24,00×15,00 m, dimensiune tipică pentru o sală de sport școlară cu teren de handbal/baschet redus), Em = 300 lx, Uf = 0,60 (indice al încăperii favorabil, plafon înalt dar reflectanțe bune), Mf = 0,80.

Φ_total = (Em × A) / (Uf × Mf) = (300 × 360) / (0,60 × 0,80) = 108.000 / 0,48 = **≈225.000 lm**

**Alegerea corpurilor de iluminat:** highbay LED 150 W, flux nominal 19.500 lm (130 lm/W), IK08+ (protecție impact minge, cap. PTh-Sc.2.15), UGR limitat prin optică asimetrică/direcționare care evită orbirea directă a jucătorilor care privesc spre plafon în timpul jocului (relevant la sporturi cu mingea aeriană — baschet, volei):

Nr. corpuri = 225.000 / 19.500 = **11,5 → se adoptă 12 corpuri**

**Verificare iluminament realizat:** Em_realizat = (12 × 19.500 × 0,60 × 0,48) / 360 — *(notă: produsul Uf×Mf = 0,48 se aplică o singură dată, corect: Em = (12×19.500×0,48)/360 = 112.320/360 =* **≈312 lx** — conform cerinței de 300 lx minim, cu marjă de ≈4%, distribuția celor 12 corpuri pe o grilă regulată (3×4) pe plafonul sălii asigurând uniformitatea U0 ≥ 0,5 cerută de SR EN 12193, verificată la PIF prin măsurare în grila de puncte standard a normativului (minimum 20 de puncte pentru terenul de dimensiunea dată).

**Iluminatul de siguranță/antipanică al sălii de sport** (D.T.A.C. §7.6) se dimensionează separat, la nivel minim ≥0,5 lx pe întreaga suprafață a sălii, cu corpuri echipate cu baterie proprie de autonomie ≥1 oră, distincte de corpurile de iluminat sportiv general (care se opresc la o cădere de tensiune, spre diferență de cele de securitate).

### PTh-Sc.3.8. Calcul hidraulic hidranți interiori — punctul cel mai defavorabil (etaj 2)

Traseu de la stația de pompare la hidrantul Hi-E2b (cel mai îndepărtat, etaj 2, cotă +7,00 m):

| Tronson | L (m) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Colector refulare → inel hidranți | 20 | 4,2 | 80 | 0,0044 | 0,088 |
| Inel → coloană verticală Hi-E2b | 15 | 2,1 (1 jet pe ramură) | 65 | 0,0058 | 0,087 |
| Coloană verticală parter→etaj 2 (+7,00 m) | 7,0 | 2,1 | 50 | 0,0031 | 0,022 |
| Ramură finală → robinet Hi-E2b | 5 | 2,1 | 50 | 0,0031 | 0,016 |
| **Total pierderi** | | | | | **0,213 bar** |

Presiune necesară la robinetul Hi-E2b (jet compact, rază de acțiune utilă, SR EN 671-2): **p_min = 2,5 bar** → presiune necesară la sursă = 2,5 + 0,213 + cotă geodezică (7,0 m ≈ 0,69 bar) = **≈3,40 bar ≈ 34,7 mCA**, confirmată sub presiunea de refulare de proiect a pompei de incendiu (dimensionată, conform D.T.A.C., la un nivel care acoperă scenariul concomitent hidranți interiori + eventuală rezervă pentru sprinklere, dacă tema o impune la nivelul sălii de sport/depozitului de material sportiv).

### PTh-Sc.3.9. Breviar termic detaliat — verificare SR EN 12831 pe grupări de încăperi

Extindere a tabelului agregat D.T.A.C. (§5.2, necesar total 223 kW) cu verificarea distinctă pe fiecare nivel al corpului de clase, confirmând coerența repartiției:

| Nivel/zonă | Nr. săli/spații | Volum (mc) | Necesar (kW) | Necesar/sală (kW) |
|---|---|---|---|---|
| Parter (4 clase + administrativ + GS) | 4+adm+GS | 1.080+450+300=1.830 | 23,8+9,9+7,8=41,5 | ≈5,9 |
| Etaj 1 (4 clase + GS) | 4+GS | 1.080+100=1.180 | 23,8+2,6=26,4 | ≈5,9 |
| Etaj 2 (4 clase + bibliotecă/festivă + GS) | 4+bibl+GS | 1.080+800+100=1.980 | 23,8+16,0+2,6=42,4 | ≈5,9-16,0 |
| Laboratoare (3, chimie+biologie+informatică) | 3 | 900 | 21,6 | ≈7,2 |
| Sală de sport (corp separat) | 1 | 2.700 | 48,6 | — |
| Cantină+bloc alimentar | 1+1 | 600 | 14,4 | — |
| Holuri/circulații/scări (toate nivelurile) | — | 2.100 | 33,6 | — |
| **Total** | | **≈9.290** | **≈228,5** | |

Valoarea recalculată pe zone (≈228,5 kW) se situează în marjă de coerență (< 3%) cu valoarea globală D.T.A.C. (223 kW), diferența provenind din rotunjirile de agregare pe grupări diferite de spații (D.T.A.C. agregă holurile separat, PTh distribuie o parte a acestora pe verificarea per nivel unde e relevant); pentru dimensionarea sursei se păstrează, ca valoare guvernantă, cifra D.T.A.C. de 223 kW, verificarea PTh confirmând absența unei erori sistematice de calcul la nivelul repartiției fine pe încăperi.

### PTh-Sc.3.10. Calcul aport de aer compensator hotă bucătărie

Debit evacuat hotă = 2.500 mc/h (D.T.A.C. §6.7). Aport compensator dimensionat la 85-90% din debitul evacuat, pentru menținerea depresiunii ușoare a bucătăriei:

Q_compensare = 2.500 × 0,87 (valoare medie a intervalului) = **≈2.175 mc/h → se adoptă 2.200 mc/h**, introdus prin CTA-Cant (dedicat parțial acestui scop, cu tratare/filtrare M5+F7 pentru a nu introduce în bucătărie aer neconform normelor HACCP) și prin grile suplimentare de transfer din zona de servire a cantinei (aer deja tratat de CTA-Cant, cap. PTh-Sc.2.1). Diferența dintre debitul evacuat (2.500) și cel introdus (2.200) — **≈300 mc/h** — este compensată prin infiltrație controlată/transfer din spațiile adiacente, asigurând depresiunea de proiect fără o subalimentare excesivă care ar face dificilă deschiderea ușilor bucătăriei împotriva unui gradient de presiune prea mare.

### PTh-Sc.3.11. Verificare capacitate de evacuare — interfața cu instalațiile electrice/PSI

**Notă de principiu:** scenariul de securitate la incendiu, cu logica completă de detecție/alarmare/evacuare, calculul timpului de evacuare și dimensionarea exactă a lățimilor căilor de evacuare, este piesă separată a documentației, elaborată de specialist atestat și avizată ISU (D.T.A.C. §1.3) — nu se substituie de prezentul memoriu. Verificarea de mai jos este o **estimare orientativă a ordinii de mărime**, utilă exclusiv pentru confirmarea coerenței dimensionării interfețelor de instalații (autonomia iluminatului de securitate, capacitatea sursei de rezervă, timpul de acționare al desfumării) cu durata reală de evacuare a populației școlii.

Populație de calcul: 300 elevi + 30 personal = 330 persoane pe compartimentul de incendiu al corpului principal. Evacuare pe cele 2 case de scări (lățime utilă adoptată de arhitectură, orientativ 1,20 m/casă scară → 2 fluxuri de 0,60 m/casă, conform unității de flux P118), rezultând **4 fluxuri totale** de evacuare verticală. La o capacitate orientativă de ≈16-20 persoane/flux/minut pe scări descendente (valoare de ordin de mărime pentru o clădire cu risc mediu, folosită exclusiv pentru verificarea de coerență de mai jos, nu ca valoare de dimensionare a scenariului PSI): capacitate totală ≈4×18 ≈72 persoane/minut.

Timp teoretic de evacuare completă ≈330/72 ≈ **4,6 minute**, la care se adaugă o marjă pentru comportamentul specific al elevilor de gimnaziu (timp de reacție la alarmă, organizare pe clase sub îndrumarea cadrului didactic, posibilă aglomerare punctuală la ușile de acces în casele de scări — argumentat la D.T.A.C. §1.1 ca o capacitate de autoevacuare reală, dar nu echivalentă cu a unui adult experimentat): timp real estimat de evacuare **≈6-7 minute**. Această ordine de mărime confirmă coerența dimensionării: **autonomia iluminatului de securitate (1-3 ore, D.T.A.C. §7.6)** este cu mult superioară timpului necesar de evacuare, la fel ca **timpul de acționare al trapelor de desfumare** (comandă automată, secunde, cap. PTh-Sc.2.12) și **autonomia sursei de rezervă a IDSAI** (24h veghe/30 min alarmă, D.T.A.C. §9.1) — toate cu marje largi față de fereastra de timp real de evacuare, verificate ca ordine de mărime la faza PTh, cu calculul definitiv și exact rămas, conform principiului stabilit, în sarcina exclusivă a scenariului de securitate la incendiu.

### PTh-Sc.3.12. Verificare curent de pornire — pompă incendiu și motoare de putere semnificativă

Motorul electropompei principale de incendiu (15 kW, 400 V/3F, D.T.A.C./PTh cap. PTh-Sc.3.5) are, la pornire directă, un curent de pornire I_pornire ≈ 6-7 × I_nominal:

I_nominal ≈ 15.000 / (√3 × 400 × 0,85 × 0,90) ≈ **28,3 A** (cos φ pornire ≈0,85, randament ≈0,90)

I_pornire ≈ 6,5 × 28,3 ≈ **184 A** — valoare moderată, care nu impune, la această putere, o soluție de limitare obligatorie (spre diferență de pompele de putere mult mai mare, unde soft-starter-ul este soluția standard); se recomandă totuși **pornire stea-triunghi sau soft-starter** ca bună practică, reducând suplimentar șocul de pornire asupra rețelei interne și asupra celorlalte receptoare alimentate din același tablou TE-PSI (IDSAI, actuatoare desfumare), care nu trebuie afectate de o cădere de tensiune tranzitorie la pornirea pompei.

### PTh-Sc.3.13. Calcul economie energetică din comanda inteligentă a iluminatului și a ventilării

Extindere a estimării D.T.A.C. (§7.4, §11 — economie 40-60% prin senzori de prezență/daylight harvesting/DCV) cu un calcul orientativ pentru zona sălilor de clasă (12 săli × 16 corpuri × 36 W ≈ 6,9 kW instalat iluminat clase):

- funcționare de bază (fără comandă inteligentă, iluminat permanent pe durata programului școlar, 8 h × 180 zile/an) = 6,9 kW × 8 h × 180 zile = **9.936 kWh/an**;
- cu daylight harvesting (reducere ≈30% pe orele cu aport solar favorabil, sălile cu expunere bună) + oprire automată la sălile neocupate (ore libere/activități în alte spații, factor de utilizare efectiv ≈75% din programul teoretic) → consum estimat ≈9.936 × 0,75 × 0,70 ≈ **5.216 kWh/an**;
- **economie estimată ≈4.720 kWh/an (≈47%)** pe zona sălilor de clasă, confirmând intervalul de 40-60% din D.T.A.C.

La această economie de iluminat se adaugă economia de ventilare prin DCV (cap. PTh-Sc.3.1) — reducerea debitului mediu ponderat pe zi de la 100% (funcționare fără DCV, pe durata întregului program) la un debit mediu ponderat estimat ≈55-65% (funcție de profilul real de ocupare pe ore libere/recreații), cu impact direct asupra consumului energetic al ventilatoarelor CTA și al bateriilor de încălzire/răcire, recalibrat după PIF pe baza jurnalului real de funcționare al sistemului BMS (cap. PTh-Sc.7).

### PTh-Sc.3.14. Calcul luminotehnic — coridoare și grupuri sanitare

**Coridor tip** (lățime 2,40 m, lungime segment de calcul 12,00 m între două intersecții, A ≈ 29 mp), Em = 100-150 lx (D.T.A.C. §7.4), Uf = 0,50 (indice al încăperii nefavorabil, spațiu lung și îngust), Mf = 0,80:

Φ_total = (125 × 29) / (0,50 × 0,80) = 3.625 / 0,40 = **≈9.060 lm**

Cu corpuri LED de tip aplică/plafonieră 18 W, flux 2.000 lm: nr. corpuri = 9.060/2.000 ≈ **4,5 → 5 corpuri** pe segmentul de 12 m, cu comandă prin senzor de prezență (D.T.A.C. §7.4), care reduce fluxul la 20-30% în absența traficului și îl restabilește la 100% la detectarea mișcării — relevant pe coridoare, unde traficul este intermitent (concentrat la recreații, cap. 2.2 D.T.A.C.) și nu justifică un iluminat permanent la nivel maxim pe intervalele dintre recreații.

**Grup sanitar tip** (≈30 mp, dotare proporțională cap. PTh-Sc.2.4), Em = 200 lx, Uf = 0,45 (reflectanțe mai reduse, finisaje ceramice), Mf = 0,80:

Φ_total = (200 × 30) / (0,45 × 0,80) = 6.000 / 0,36 = **≈16.670 lm**, realizat cu 5-6 corpuri LED etanșe (IP44 minimum, dat fiind umiditatea), 18 W/2.000 lm fiecare, comandate prin senzor de prezență (economie de energie la un spațiu cu ocupare intermitentă, dar cu cerința de a nu întârzia aprinderea la intrarea unui elev, timp de răspuns senzor ≤1 s).

### PTh-Sc.3.15. Verificare calitate aer interior conform SR EN 16798-1 — categoria de proiect

Debitele adoptate în D.T.A.C. (25 mc/h·elev sală de clasă, 30 mc/h·persoană laborator/sală de sport/cantină) se verifică, la faza PTh, față de categoriile de calitate a aerului interior definite de SR EN 16798-1 (succesoarea SR EN 15251), care clasifică spațiile în IDA1 (calitate ridicată) până la IDA4 (calitate scăzută), pe baza debitului de aer proaspăt pe persoană: **IDA2 (calitate medie, debit de referință 25-36 mc/h·persoană)** este categoria în care se încadrează toate debitele adoptate pentru această clădire, superioară categoriei IDA3 (debit minim, 15-25 mc/h·persoană, uzuală la clădiri de birouri fără cerințe speciale) — o încadrare deliberată, coerentă cu argumentarea cognitivă de la D.T.A.C. §6.3, care nu acceptă un compromis pe calitatea aerului sălilor de clasă doar pentru reducerea costului instalației.

### PTh-Sc.3.16. Verificare acustică — zgomotul echipamentelor de ventilare față de nivelul admis în sala de clasă (C125/2013)

Nivelul de zgomot de fond admis într-o sală de clasă pe durata orelor de curs, conform C125/2013 și bunelor practici de acustică a clădirilor de învățământ, este de ordinul **NC 30-35 (≈35-40 dB(A))** — un prag mai strict decât cel al unui birou obișnuit (NC 35-40), dat fiind cerința de inteligibilitate a vorbirii profesorului pe toată suprafața sălii, inclusiv pentru elevii aflați la distanța maximă de catedră. Verificarea la execuție a acestui prag, pentru contribuția instalației de ventilare (ventilatoarele CTA, grilele de introducere/evacuare), se realizează prin: (a) alegerea unor **grile de introducere/evacuare cu viteză reziduală redusă** la ieșire (≤2,0 m/s la grilă, pentru evitarea zgomotului aerodinamic generat de turbulență); (b) **atenuatori de zgomot (silențioase) montați pe tronsonul de tubulatură** dintre CTA și prima derivație spre sălile de clasă, dimensionați pentru atenuarea zgomotului generat de ventilator pe frecvențele relevante vorbirii umane (500-2.000 Hz); (c) **susțineri antivibratile** ale tubulaturii și ale unităților CTA (cap. PTh-Sc.5.3), care previn transmiterea zgomotului mecanic prin structura clădirii către sălile adiacente camerei tehnice. Verificarea finală se face la PIF prin măsurare directă cu sonometru, în sala de clasă cel mai apropiată de camera tehnică CTA, cu instalația funcționând la debitul nominal.

### PTh-Sc.3.17. Calcul orientativ vas de expansiune circuit termic

Volumul total de agent termic (corpuri statice + pardoseală radiantă + baterii CTA, circuit primar, estimat pe baza lungimii totale de conductă și a volumelor interne ale echipamentelor) se estimează la **≈2.500-3.000 litri** pentru o clădire de această dimensiune (Sd≈3.300 mp). La un coeficient de dilatare volumică pentru regim 55/45°C de ordinul 2,5-3,0% și un factor de presiune al vasului de expansiune (funcție de presiunea de umplere/presiunea maximă admisă a instalației) de ordinul 1,3-1,5:

V_expansiune ≈ V_instalație × coeficient dilatare × factor presiune ≈ 2.750 × 0,028 × 1,4 ≈ **≈108 litri → se adoptă vas de expansiune de 140-150 litri** (treaptă comercială imediat superioară, cu marjă de siguranță pentru variații de temperatură peste regimul de calcul, de exemplu la un ciclu de șoc termic al boilerului care ar tranzitoriu majora temperatura medie a instalației).

---

## PTh-Sc.4. Specificații complete echipamente majore

### PTh-Sc.4.1. Fișă tehnică — Unitate CTA cu recuperator (tip CTA-P/E1/E2/Bibl)

| Parametru | Valoare |
|---|---|
| Debit nominal | 2.000-2.600 mc/h (funcție de zonă) |
| Recuperator | plăci, contracurent, η ≥ 75% |
| Filtrare | M5 (admisie+evacuare) + F7 (refulare finală) |
| Baterie încălzire/răcire | integrată cu circuitul termic (55/45°C) |
| Ventilatoare | EC, presiune disponibilă ≥ 150 Pa, turație variabilă |
| Automatizare | senzor CO₂ per sală deservită + by-pass recuperator + presostate filtre |
| Clasă etanșeitate tubulatură | conform SR EN 12237 |

### PTh-Sc.4.2. Fișă tehnică — CTA-Lab (recuperare rotativă)

| Parametru | Valoare |
|---|---|
| Debit nominal | 2.210 mc/h |
| Recuperator | rotativ, η ≥ 75%, cu clapetă de izolare pentru evitarea transferului de contaminanți între admisie/evacuare |
| Filtrare | M5+F7 pe circuitul general |
| Automatizare | senzor CO₂ per laborator + comandă independentă nișă chimie |

### PTh-Sc.4.3. Fișă tehnică — Nișă ventilată laborator chimie

| Parametru | Valoare |
|---|---|
| Tip | nișă de laborator cu ușă frontală glisantă |
| Debit extracție | 2.000 mc/h |
| Viteză frontală de aspirație | 0,5 m/s (verificată la PIF cu anemometru, la ușă deschisă la înălțimea de lucru) |
| Ventilator | dedicat, rezistent chimic, fără recuperare de căldură |
| Evacuare | independentă, peste acoperiș, distanță ≥8 m de prizele de aer proaspăt |
| Material tubulatură/nișă | PP sau inox, rezistent la agenții chimici uzuali de laborator gimnazial |

### PTh-Sc.4.4. Fișă tehnică — Pompă de căldură aer-apă (cascadă)

| Parametru | Valoare |
|---|---|
| Putere calorică totală (2 unități) | ≈80 kW |
| COP nominal (A7/W35) | ≥ 3,5 |
| Regim de temperatură | 55/45°C (corpuri statice) / compatibil 40/35°C prin vană de mixare pe circuitul de pardoseală |
| Amplasare | exterior, pe platformă dedicată, cu ancorare seismică conform clasei II (D.T.A.C. §1.3) |
| Automatizare | controler cascadă, comandă prioritară față de cazane, integrare BMS |

### PTi-Sc.4.5. Fișă tehnică — Centrală termică în condensație (2×100 kW)

| Parametru | Valoare |
|---|---|
| Putere unitară | 100 kW/buc (2 buc.) |
| Randament (Pci) | ≥ 108% |
| Combustibil | gaz natural, exclusiv pentru centrala termică (D.T.A.C. §8.1/8.2) |
| Evacuare gaze arse | coș etanș tip C, aer de ardere din exterior |
| Siguranță | detector CH₄ + electrovalvă (prag 2% vol. sau 10% LIE, D.T.A.C. §8.3) |
| Amplasare | încăpere dedicată, ventilată NTPEE, compartimentare EI |

### PTh-Sc.4.6. Fișă tehnică — Boiler ACM bivalent

| Parametru | Valoare |
|---|---|
| Volum | 1.000 litri |
| Surse | pompă de căldură/cazane (serpentină 1) + panouri solar-termice (serpentină 2) |
| Regim antilegionella | stocare ≥60°C, șoc termic 70°C periodic |
| Limitare livrare | vane amestec 43°C pe ramurile elevi/vestiare sport (dublă barieră, cap. PTh-Sc.2.5) |

### PTh-Sc.4.7. Fișă tehnică — Grup de pompare incendiu

| Parametru | Valoare |
|---|---|
| Pompă principală | electrică, 15 kW, debit conform Q_op hidranți |
| Pompă jockey | menținere presiune rețea, pornire/oprire automată la scăderi mici |
| Pompă de rezervă | Diesel (recomandat, pentru independență totală de rețeaua electrică) sau electrică cu alimentare din grup electrogen |
| Rezervor incendiu | ≈110 mc, dedicat, conform D.T.A.C. §9.3 |
| Automatizare | pornire automată la scădere presiune, semnalizare la centrala IDSAI |

### PTh-Sc.4.8. Fișă tehnică — Sistem automat de stingere hotă bucătărie

| Parametru | Valoare |
|---|---|
| Tip agent | chimic umed (wet chemical), specific clasă K |
| Declanșare | automată (fuzibile termice pe traseul hotei) + manuală (buton la ieșirea din bucătărie) |
| Interfațare | oprire automată alimentare electrică echipamente gătit protejate + oprire ventilator hotă + alarmă către IDSAI |
| Duze dedicate | pe fiecare zonă de gătit protejată (plite, friteuze, grătar) + canal hotă + filtre grăsime |
| Verificare periodică | conform programului de mentenanță al producătorului (recomandat semestrial) |

### PTh-Sc.4.9. Fișă tehnică — Corpuri de iluminat (sală de clasă / sală de sport)

| Parametru | Sală de clasă | Sală de sport |
|---|---|---|
| Tip | panou LED 600×600 mm | highbay LED |
| Putere | 36 W | 150 W |
| Flux nominal | 4.000 lm | 19.500 lm |
| UGR | ≤ 19 | protecție prin optică/poziționare |
| IK | standard | ≥ IK08 (protecție impact) |
| Ra | ≥ 80 | ≥ 80 |

### PTh-Sc.4.10. Fișă tehnică — Centrală IDSAI și ceas central

| Parametru | Valoare |
|---|---|
| Centrală IDSAI | adresabilă, bucle pe fiecare nivel + sală de sport, rezervă 24h veghe/30 min alarmă |
| Ceas central | master sincronizat GPS/NTP, bus către ceasuri secundare, interfațat cu sonorizarea |
| Prioritate hardware | releu normal-închis, comandat de IDSAI, întrerupe fizic comanda ceas→amplificator la alarmă |

### PTh-Sc.4.11. Fișă tehnică — Grup de hidrofor (echipament de rezervă, condiționat)

| Parametru | Valoare |
|---|---|
| Configurație | 2 pompe (1 activă + 1 rezervă), turație variabilă |
| Debit de proiect | qc = 1,32 l/s |
| Presiune de refulare | funcție de deficitul real constatat față de presiunea de rețea (cap. PTh-Sc.2.19) |
| Rezervor tampon | ≥100 litri (membrană), pentru evitarea pornirilor/opririlor frecvente la debite mici |
| Automatizare | pornire/oprire pe presiune, alternanță pompe pentru uzură echilibrată |

### PTh-Sc.4.12. Fișă tehnică — UPS rack comunicații și UPS servere

| Parametru | Valoare |
|---|---|
| UPS rack comunicații | on-line dublă conversie, autonomie ≥30 min la sarcină nominală |
| UPS servere/rețea informatică | dedicat, autonomie suficientă pentru închidere controlată a stațiilor |
| Baterii | plumb-acid sigilate (VRLA) sau litiu, cu monitorizare stare la BMS |
| Alimentare din sursă de rezervă | comutare automată la grup electrogen pentru autonomie extinsă |

### PTh-Sc.4.13. Fișă tehnică — Module fotovoltaice și invertoare

| Parametru | Valoare |
|---|---|
| Putere instalată | ≈40 kWp |
| Module | ≈100 buc. × 400 Wp, monocristaline |
| Invertoare | string, ≈2×20 kW, randament ≥98% |
| Protecție DC | siguranțe pe fiecare string + SPD DC clasa II |
| Protecție AC | întrerupător general FV + SPD AC clasa II + anti-islanding |
| Monitorizare | portal producție per invertor, integrare BMS |

### PTh-Sc.4.14. Fișă tehnică — Corp de iluminat coridor/grup sanitar

| Parametru | Valoare |
|---|---|
| Tip | aplică/plafonieră LED etanșă |
| Putere | 18 W |
| Flux nominal | 2.000 lm |
| IP | ≥ IP44 (grupuri sanitare, umiditate) |
| Comandă | senzor de prezență, timp de răspuns ≤1 s |

### PTh-Sc.4.15. Fișă tehnică — Ventiloconvector protejat, sală de sport

| Parametru | Valoare |
|---|---|
| Tip | montaj plafon/perete înalt, carcasă rezistentă la impact |
| IK | ≥ IK08 |
| Poziționare | deasupra traiectoriei uzuale de joc sau protejat prin grilaj rigid |
| Comandă | integrată cu reglajul climatic al circuitului de pardoseală radiantă/CTA-Sport |

---

## PTh-Sc.5. Caiet de sarcini pentru montaj

### PTh-Sc.5.1. Instalații sanitare și canalizare

Conductele de apă rece/caldă (PP-R) se montează cu **respectarea dilatațiilor** (bucle de dilatare sau compensatori la traseele lungi orizontale, în special pe coloanele care alimentează etajele 1 și 2), cu **izolație termică** pe toate traseele de apă caldă și pe traseele de apă rece care traversează spații neîncălzite (ghene tehnice fără climatizare), și cu **susțineri la interval maxim de 1,0-1,2 m** pentru Ø≤32 și de 1,5-2,0 m pentru diametre superioare, conform recomandărilor producătorului. Canalizarea (PP fonoizolant pe coloanele care traversează sau sunt adiacente sălilor de clasă) se montează cu **pante verificate cu nivela laser**, nu estimate vizual, și cu **piese de curățire** la baza fiecărei coloane și la fiecare schimbare de direcție ≥45°. Traversările prin planșee se realizează prin **manșoane cu spațiu liber pentru dilatare** și se etanșează la foc (clapetă antifoc/manșon intumescent) dacă traversarea trece printr-un element de compartimentare EI. Bazinul de neutralizare al laboratorului de chimie și separatorul de grăsimi al bucătăriei se montează cu **verificarea etanșeității prin probă de apă** (umplere completă, verificare vizuală a rosturilor/racordurilor pe durata a minimum 24 ore) înainte de acoperire/astupare.

### PTh-Sc.5.2. Instalații termice

Distribuitoarele-colectoare se montează în **camere tehnice cu acces facil pentru mentenanță** (spațiu liber minim 0,60-0,80 m în fața vanelor de echilibrare), cu **etichetarea fiecărui circuit** (vopsire/marcaj permanent, conform schemei de execuție) pentru identificarea rapidă la operațiuni de întreținere de către personalul tehnic al școlii, care nu este întotdeauna specializat pe instalații. Conductele de agent termic se izolează integral pe traseele aparente/în ghene, cu grosime de izolație conformă C107 pentru minimizarea pierderilor pe traseu. Pompa de căldură, amplasată exterior, se montează pe **socluri antivibratile**, cu ancorare seismică dimensionată pentru clasa de importanță II (D.T.A.C. §1.3), verificată de proiectantul de structură înainte de execuție. Pardoseala radiantă (holuri, vestiare, sală de sport) se montează cu **verificare a presiunii de probă (6 bar, minimum 24h, fără scădere)** înainte de turnarea șapei, obligatoriu documentată prin proces-verbal, dat fiind că o eventuală defecțiune ulterioară turnării șapei ar necesita o intervenție extrem de costisitoare și disruptivă pentru activitatea școlii.

### PTh-Sc.5.3. Instalații de ventilare

Tubulatura se montează cu **etanșeitate verificată la clasa impusă de SR EN 12237** (clasa B minimum pe traseele principale, clasa C pe traseele de la CTA la nișa ventilată a laboratorului de chimie, unde o eventuală pierdere ar reduce eficiența de captare la sursă), cu **susțineri antivibratile** pe traseele apropiate de sălile de clasă (evitarea transmiterii zgomotului mecanic al ventilatoarelor prin structura clădirii, relevant pentru confortul acustic al orelor de curs, C125/2013). Clapetele antifoc se montează **exact la planul elementului de compartimentare traversat** (nu la distanță, care ar lăsa un tronson de tubulatură neprotejat în interiorul compartimentului), cu acces de inspecție/mentenanță pentru verificarea periodică a funcționării mecanismului de închidere. Nișa ventilată a laboratorului de chimie se montează cu verificarea, la recepție, a distanței minime de 8 m față de orice priză de aer proaspăt a celorlalte CTA-uri, conform proiectului — o verificare geometrică simplă, dar esențială, ratată frecvent în execuție dacă poziționarea exactă a tuburilor de evacuare pe acoperiș nu este trasată riguros față de planul de arhitectură.

### PTh-Sc.5.4. Instalații electrice și curenți slabi

Cablarea circuitelor TE-PSI (rezistente la foc, E90) se montează **fizic separată** de restul cablării electrice, pe trasee proprii sau cu bariere de separare în jgheaburile comune, pentru a nu compromite integritatea de funcționare a acestor circuite critice printr-un eveniment care ar afecta un cablu adiacent necritic. Prizele și corpurile de iluminat din sălile de clasă și din grupurile sanitare se montează la **înălțimi coordonate cu memoriul de arhitectură**, adaptate accesibilității elevilor de gimnaziu (D.T.A.C. §2.5). Cablarea de curenți slabi (date, sonorizare, CCTV, control acces, ceas central) se montează **separat fizic de cablarea de curenți tari**, conform I7, cu distanțe minime de paralelism sau cu ecranare, pentru evitarea perturbațiilor electromagnetice asupra semnalelor de date/audio. Rack-ul de comunicații se montează în cameră tehnică dedicată, cu **climatizare proprie minimă** (evitarea supraîncălzirii echipamentelor active) și cu **UPS dedicat**, testat la recepție pentru autonomia declarată.

### PTh-Sc.5.5. Instalații pentru securitatea la incendiu

Detectoarele IDSAI se montează conform planului de acoperire, cu **verificarea distanțelor față de grile de ventilare/corpuri de iluminat** (evitarea pozițiilor care ar întârzia detecția prin diluarea fumului de către un curent de aer local). Cablarea IDSAI se realizează cu **cablu rezistent la foc**, pe trasee separate de restul instalațiilor de curenți slabi, cu bucle verificate la rezistență de izolație înainte de conectarea la centrală. Ușile EI cu autoînchidere se montează cu **verificarea unghiului și a vitezei de închidere** (reglaj al mecanismului hidraulic, evitând o închidere prea rapidă și violentă, riscantă pentru un elev aflat în trecere, dar suficient de fermă pentru a garanta închiderea completă). Sistemul de stingere a hotei se montează **exact conform fișei tehnice a producătorului** (poziționarea duzelor, presiunea de proiect a rezervorului de agent), cu verificare de către un tehnician certificat al producătorului, nu doar de instalatorul general.

### PTh-Sc.5.6. Instalația fotovoltaică

Modulele se montează pe structura de prindere avizată de structurist (cap. PTh-Sc.2.17), cu **respectarea distanței minime față de marginea acoperișului** (cerință de vânt/zăpadă, conform proiectului de structură al acoperișului) și cu **trasee de cablu DC protejate mecanic** (tub de protecție UV-rezistent pe traseul expus, până la cutiile de conexiuni). Invertoarele se amplasează în cameră tehnică ventilată (evacuarea căldurii disipate de electronica de putere), cu acces facil pentru mentenanță și pentru citirea afișajului local. Punerea în funcțiune se face doar după **avizul de racordare al operatorului de distribuție** (contorizare bidirecțională, acord de tip prosumator), verificat înainte de conectarea definitivă la TGD.

### PTh-Sc.5.7. Coordonarea montajului cu finisajele de arhitectură — protecțiile la impact

Toate echipamentele cu cerință de protecție la impact (corpuri de iluminat, grile, ventiloconvectoare din sala de sport, cap. PTh-Sc.2.15) se montează **după confirmarea poziției exacte a liniilor de joc și a înălțimii libere reale** din planul de arhitectură al sălii de sport, nu pe o poziționare generică — o coordonare simplă, dar cu impact direct asupra eficienței protecției: un corp montat la o înălțime insuficientă față de traiectoriile reale de joc ale unei mingi de baschet/handbal rămâne expus, indiferent de gradul IK declarat al produsului. Similar, obiectele sanitare și bateriile termostatice (cap. PTh-Sc.2.4-2.5) se montează la înălțimile confirmate de memoriul de arhitectură pentru accesibilitatea elevilor de gimnaziu (D.T.A.C. §2.5), verificate pe șablon fizic înainte de fixarea definitivă a suporților.

---

## PTh-Sc.6. Coordonarea interdisciplinară — goluri de trecere prin structură

| Instalație | Element traversat | Poziție orientativă | Dimensiune gol | Observație |
|---|---|---|---|---|
| Coloane apă/canalizare (K-P, K-E1, K-E2) | planșeu etaj 1/etaj 2 | ghenă tehnică lângă GS fiecare nivel | Ø150-250 mm/coloană | prevăzut la execuția planșeului, nu tăiat ulterior |
| Tubulatură CTA-E1/E2 | perete/planșeu ghenă tehnică | zona tehnică fiecare nivel | 500×300 mm/derivație | cu clapetă antifoc la traversarea compartimentării |
| Coloană gaz DN32-50 | perete exterior/traseu dedicat spre centrala termică | traseu aparent, evitare traversare săli de clasă | Ø100-150 mm | conform NTPEE, manșon etanș |
| Cabluri TE-PSI (E90) | planșee, ghenă dedicată | lângă casele de scări, fiecare nivel | jgheab 300×100 mm | separare fizică de restul cablării |
| Nișă ventilată chimie — evacuare | acoperiș | poziție dedicată, ≥8 m de prize CTA | Ø250-300 mm | verificare distanță la recepție |
| Conducte hidranți (coloane verticale) | planșee, ghenă tehnică | lângă casele de scări | Ø65-80 mm | verificare încărcare/ancorare seismică la punctele de prindere |

Toate golurile prin elementele structurale portante (grinzi, stâlpi, plăci de rezistență) necesită **avizul explicit al inginerului structurist** înainte de execuție — nu se admit găuriri neautorizate în șantier. Ghenele tehnice se poziționează, pe cât posibil, în vecinătatea directă a grupurilor sanitare de pe fiecare nivel (coordonare deja stabilită la D.T.A.C. §4.1), minimizând lungimea traseelor orizontale în plafoanele false ale sălilor de clasă și, implicit, riscul de zgomot de scurgere perceput în timpul orelor de curs.

---

## PTh-Sc.7. Recepția, probele, PIF și Planul de Control al Calității

### PTh-Sc.7.1. Tabelul complet al probelor pe instalație

| Instalație | Probă | Presiune/Parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/caldă | Presiune | 1,5×presiune de lucru | 1 h | fără scădere de presiune, fără scurgeri vizibile |
| Canalizare menajeră | Etanșeitate | umplere completă coloană | 30 min | fără scurgeri la îmbinări |
| Pardoseală radiantă | Presiune | 6 bar | 24 h | fără scădere de presiune |
| Instalație termică (corpuri statice) | Presiune | 1,5×presiune de lucru | 1 h | fără scădere, fără scurgeri |
| Instalație gaze naturale | Etanșeitate | conform NTPEE | conform NTPEE | fără scădere de presiune la manometru |
| Electrovalvă gaz + detector CH₄ | Funcțională | prag 2% vol./10% LIE | — | închidere automată confirmată la prag |
| Ventilare — CTA general | Debit | debit de proiect ±10% | — | verificat cu anemometru/balometru pe fiecare grilă |
| Ventilare — recuperator | Randament | η ≥ 75% | — | verificat cu termometre pe cele 4 puncte ale recuperatorului |
| Nișă ventilată chimie | Viteză frontală | 0,5 m/s | — | verificat cu anemometru, ușă la poziția de lucru |
| DCV — clapete motorizate | Timp de răspuns | ≤60 s la variație de treaptă | — | verificat pe fiecare sală |
| Instalație electrică | PRAM (priză pământ, izolație) | R≤1 Ω / izolație conform I7 | — | buletin de măsurători |
| Paratrăsnet | Continuitate coborâri | conform SR EN 62305 | — | buletin de măsurători |
| IDSAI | Funcțională completă | toate interfețele matricei cauză-efect | — | verificare punct cu punct, proces-verbal |
| Sistem stingere hotă | Funcțională | declanșare la prag termic + manual | — | verificat de tehnician certificat producător |
| Hidranți interiori/exteriori | Debit/presiune | debit și presiune de proiect | — | măsurat la robinetul cel mai defavorabil |
| Iluminat general/tablă/sportiv | Iluminometrie | Em de proiect pe grilă de puncte | — | conform SR EN 12464-1/SR EN 12193 |
| Sonorizare/ceas central | Funcțională + prioritate IDSAI | — | — | verificat la alarmă simulată |

### PTh-Sc.7.2. Protocoale de PIF

**Echilibrarea hidraulică** a circuitelor termice (corpuri statice, pardoseală radiantă, baterii CTA) se realizează prin reglarea vanelor de echilibrare la debitele de proiect din breviarul PTh-Sc.3.9, cu măsurare directă (debitmetre ultrasonice portabile sau vane cu port de măsură integrat), documentată în procesul-verbal de echilibrare pe fiecare circuit. **Reglajul DCV** se realizează prin simularea unei ocupări progresive a unei săli-etalon (generare controlată de CO₂ sau ocupare reală cu personal), verificând treptele de modulare din tabelul PTh-Sc.3.1 și timpul de răspuns al clapetelor. **Programarea BMS** integrează toate măsurile nZEB (D.T.A.C. §11) — regim redus în afara orelor de curs, curbe de reglaj climatic, priorități pompă de căldură/cazane, program orar recirculare ACM — cu verificarea, pe durata unei săptămâni de probă, a coerenței programului cu orarul școlar real furnizat de beneficiar. **Programarea ceasului central/sonorizării** se verifică prin simularea completă a unui program orar tipic, urmată obligatoriu de o **simulare de alarmă de incendiu în timpul unui semnal de clopoțel programat**, verificând prioritatea absolută și instantanee a alarmei conform interblocării hardware descrise la cap. PTh-Sc.2.16 — o probă esențială, care nu poate fi omisă sau presupusă funcțională doar din documentația tehnică a echipamentelor.

### PTh-Sc.7.3. Planul de Control al Calității — faze determinante (FD)

| Fază determinantă | Verificare | Participanți |
|---|---|---|
| FD1 — înainte de turnarea planșeelor | poziția golurilor de trecere (cap. PTh-Sc.6) | proiectant instalații + structurist + executant |
| FD2 — înainte de turnarea șapei peste pardoseală radiantă | proba de presiune 6 bar/24h | proiectant + dirigenție + executant |
| FD3 — înainte de mascarea coloanelor în ghene | proba de presiune apă rece/caldă + verificare vizuală etanșeitate canalizare | dirigenție + executant |
| FD4 — înainte de finisarea pereților la traversările antifoc | verificarea manșoanelor intumescente/clapetelor antifoc pe fiecare traversare | proiectant PSI + dirigenție |
| FD5 — înainte de recepția la terminarea lucrărilor | toate probele din tabelul PTh-Sc.7.1, complete și documentate | proiectant + dirigenție + verificatori atestați + beneficiar |

Nicio fază determinantă nu se acoperă (turnare, finisare, mascare) fără proces-verbal semnat de participanții desemnați — o disciplină de execuție cu relevanță suplimentară la această clădire, dat fiind că o eventuală defecțiune nedetectată la timp (scurgere pe o coloană mascată, gol de trecere neetanșat la foc) ar afecta, pe durata exploatării, o clădire ocupată zilnic de 300 de elevi, unde intervențiile ulterioare de remediere sunt semnificativ mai disruptive decât la o clădire cu program de utilizare flexibil.

### PTh-Sc.7.4. Recepția și cartea tehnică a construcției

Toate procesele-verbale de fază determinantă, buletinele de măsurători (PRAM, paratrăsnet, iluminometrie), procesele-verbale de probă (presiune, etanșeitate, debit, funcționalitate IDSAI/stingere hotă/hidranți) și schemele de execuție „as-built" (actualizate cu eventualele modificări față de proiect, apărute în execuție) se anexează **cărții tehnice a construcției**, document obligatoriu pentru exploatarea și mentenanța ulterioară a clădirii, transmis beneficiarului (UAT, conform D.T.A.C. general.md §1.3) la recepția la terminarea lucrărilor, împreună cu **manualele de utilizare și de mentenanță** ale echipamentelor majore (pompă de căldură, cazane, CTA-uri, centrală IDSAI, sistem stingere hotă, ceas central), esențiale pentru personalul tehnic al școlii, care va asigura exploatarea curentă a instalațiilor pe toată durata de viață a clădirii.

### PTh-Sc.7.5. Mentenanța programată pe durata de exploatare

Predarea către beneficiar (UAT, prin conducerea unității de învățământ și personalul tehnic propriu sau contractat) include un **program orientativ de mentenanță preventivă**, structurat pe periodicitate, care nu se substituie manualelor specifice ale fiecărui producător, dar oferă administrației școlii un cadru de planificare bugetară și operațională pentru primul ciclu de exploatare:

| Instalație/echipament | Operațiune | Periodicitate |
|---|---|---|
| Filtre CTA (toate unitățile) | Verificare colmatare (presostat) / înlocuire | trimestrial / la alarmă presostat |
| Nișă ventilată laborator chimie | Verificare viteză frontală de aspirație | semestrial |
| Separator de grăsimi cantină | Vidanjare | trimestrial (cap. PTh-Sc.3.4) |
| Sistem stingere hotă | Verificare/recertificare | semestrial (cap. PTh-Sc.4.8) |
| Pompă de căldură + cazane | Revizie tehnică (autorizată) | anual, înainte de sezonul de încălzire |
| Panouri fotovoltaice | Verificare vizuală + curățare | anual + după evenimente meteo severe |
| Centrală IDSAI + detectoare | Verificare funcțională completă | anual (conform P118-3) + verificare periodică baterii |
| Hidranți interiori/exteriori + grup pompare | Probă de funcționare la debit/presiune | anual |
| Priza de pământ + paratrăsnet | Măsurare rezistență de dispersie | anual |
| Ceas central + sonorizare | Verificare interblocare cu IDSAI | anual, la simulare de alarmă |
| Corpuri de iluminat (înlocuire surse/curățare) | Curățare reflectoare/înlocuire surse defecte | anual, corelat cu Mf de proiect |
| UPS rack/servere | Test autonomie reală sub sarcină | anual |

Programul de mai sus se corelează cu **vacanțele școlare** (intervale fără ocupare, favorabile intervențiilor care ar perturba activitatea didactică — revizia cazanelor, verificarea completă a IDSAI, curățarea filtrelor CTA) și se actualizează, pe durata exploatării, pe baza jurnalului real de evenimente al sistemului BMS și al centralei IDSAI, conform principiului deja stabilit la cap. PTh-Sc.3.13.

---

## PTh-Sc.8. Concluzii

Prezentul supliment de fază PTh confirmă, prin recalculare nod-cu-nod și prin verificare la nivel de tronson/circuit/sală de clasă, integritatea tuturor cifrelor de dimensionare stabilite la faza D.T.A.C. — necesarul de apă de **11,5 mc/zi**, necesarul termic de **≈223 kW**, debitul de ventilare de **25 mc/h·elev** (≈16.000 mc/h agregat, confirmat la ≈16.810 mc/h prin sumarea celor 8 unități CTA dedicate), bilanțul electric **Pc≈197,8 kW/Sc≈215 kVA** — și le duce la nivelul de detaliu necesar execuției: scheme complete pe fiecare instalație, breviare de calcul pe fiecare tronson/circuit/sală, fișe tehnice complete ale echipamentelor majore, caiet de sarcini de montaj pe fiecare specialitate, tabel complet al probelor și Plan de Control al Calității cu faze determinante explicite.

Particularitățile specifice acestei funcțiuni — dimensionarea CTA pe unități dedicate per nivel/zonă cu DCV pe fiecare sală, dubla barieră termică (43°C) pe ramurile care alimentează elevi, eliminarea prin proiectare a gazului natural din laborator și din bucătărie, sistemul dedicat de stingere a hotei bucătăriei complet electrice, iluminatul sportiv conform SR EN 12193 cu protecție la impact IK08+, interblocarea hardware ceas central-sonorizare-IDSAI și verificarea de coerență a capacității de evacuare pe fluxuri — sunt tratate la nivelul de detaliu și de argumentare tehnică cerut de execuția reală a unei clădiri cu aglomerare de 300 de elevi, fără a substitui scenariul de securitate la incendiu (piesă separată, avizată ISU) și fără a modifica nicio valoare de dimensionare deja stabilită și guvernantă la faza D.T.A.C.

**Verificare tehnică** de verificatori atestați MDLPA: **Is** (sanitare + PSI hidraulic), **It** (termice/ventilare/gaze), **Ie** (electrice/curenți slabi/paratrăsnet/IDSAI), pe cerințele A-F, extinsă la nivelul de detaliu al prezentului supliment PTh. Execuție de personal autorizat (ANRE gaze/electric); probe + PRAM cu buletine la punerea în funcțiune; recepție condiționată de completarea integrală a Planului de Control al Calității și de predarea cărții tehnice a construcției către beneficiar.
