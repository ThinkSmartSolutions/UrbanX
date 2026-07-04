## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție conform HG 907/2016, anexa 8) pentru memoriile de instalații ale obiectivului **Centru Social de Zi pentru vârstnici**, regim de înălțime P+1, arie construită desfășurată cca. 900 mp. Documentul dezvoltă, la nivel de execuție, ceea ce faza DTAC a stabilit la nivel de concept și autorizare, fără a repeta conținutul acesteia.

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC | Nivel PTh (suplimentar) |
|---|---|---|
| Scheme | conceptuale, de principiu | scheme de execuție complete, cu toate diametrele/secțiunile/aparatele |
| Breviar | exemple de calcul, bilanțuri | dimensionarea TUTUROR tronsoanelor și circuitelor |
| Echipamente | tipuri și puteri | fișe tehnice complete per echipament major |
| Probe | enumerare | tabel complet presiune/durată/criteriu per instalație |
| Montaj | principii | tehnologie, succesiune, susțineri, treceri la foc |
| PIF | menționată | protocoale de echilibrare, reglaj, programare |
| Calitate | — | Plan de Control al Calității + faze determinante |

Normative de referință aplicate în execuție: **I5-2022** (ventilare-climatizare), **I7-2011** (electrice), **I9-2022** (sanitare), **I13-2015** (încălzire), **P118-2/2013** (hidranți, stingere apă), **P118-3/2015** (semnalizare incendiu IDSAI), **NP061-2002** (iluminat), **SR EN 806**, **SR EN 12831**, **SR EN 14336**, **SR EN 1264** (pardoseală radiantă), **SR EN 12599** (recepție ventilare), **SR EN 60364**, **STAS 6472**, **C56**.

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema coloanei termice — sursă → distribuitoare → corpuri

Sursa de energie termică este o **pompă de căldură aer-apă** cu putere nominală 60 kW (regim 45/40°C pentru radiatoare, 35/30°C pentru pardoseală radiantă), completată de un **boiler termodinamic** pentru ACM. Distribuția este de tip **arbore cu distribuitor-colector orizontal**, în două regimuri de temperatură prin butelie de egalizare a presiunilor (BEP).

**Traseul termic complet (schema coloană):**

```
PC 60 kW ─► BEP (butelie egalizare) ─┬─► Pompă P1 ─► Distribuitor D1 (radiatoare 45/40)
                                     │
                                     └─► Pompă P2 ─► Distribuitor D2 (pardoseală 35/30)
                                                       via vană cu 3 căi + grup pompare
```

**Distribuitor D1 — circuite radiatoare (45/40°C):**

| Circuit | Zonă deservită | Debit (l/h) | Ø ramură | Corpuri |
|---|---|---|---|---|
| C1.1 | Parter — hol + recepție | 172 | Cu 18×1 | 3 |
| C1.2 | Parter — grupuri sanitare | 258 | Cu 22×1 | 5 |
| C1.3 | Parter — cabinet medical + izolare | 215 | Cu 18×1 | 4 |
| C1.4 | Etaj — birouri administrație | 301 | Cu 22×1 | 6 |
| C1.5 | Etaj — sală kinetoterapie | 344 | Cu 22×1 | 4 |

**Distribuitor D2 — circuite pardoseală radiantă (35/30°C):**

| Circuit | Zonă | Lungime buclă (m) | Debit (l/h) | Nr. bucle |
|---|---|---|---|---|
| C2.1 | Sală zi comună | 95 | 210 | 2 |
| C2.2 | Sală mese | 88 | 195 | 2 |
| C2.3 | Sală activități | 82 | 180 | 2 |
| C2.4 | Vestiare + circulații | 76 | 165 | 2 |

Fiecare distribuitor este echipat cu: robineți de reglaj termostatic pe tur, debitmetre pe retur (flowmetre 0-4 l/min pentru pardoseală), aerisitoare automate, robineți de golire, termometre tur/retur și manometru.

### PTh-I.2.2 Schema izometrică apă rece / caldă / recirculare

Racordul de apă rece se face din branșamentul public (Ø63 PE-HD) prin cămin apometru, contor DN25 și reductor de presiune. Alimentarea ACM se face din boiler cu recirculare permanentă pentru menținerea temperaturii la puncte îndepărtate ≥50°C (antilegionella).

**Schema izometrică — coloane verticale:**

| Coloană | Tip | Nivel deservit | Ø bază | Ø vârf |
|---|---|---|---|---|
| AR-1 | apă rece | P+E — grup sanitar central | PPR 40 | PPR 25 |
| AR-2 | apă rece | P+E — grupuri secundare | PPR 32 | PPR 20 |
| AR-3 | apă rece | bucătărie / oficiu | PPR 32 | PPR 25 |
| ACC-1 | apă caldă | P+E — grup central | PPR 32 | PPR 20 |
| ACC-2 | apă caldă | P+E — grupuri secundare | PPR 25 | PPR 20 |
| REC-1 | recirculare | buclă retur ACM | PPR 20 | PPR 20 |

Bucla de recirculare este dimensionată la 3×volumul instantaneu al rețelei ACM, cu pompă de recirculare cu termostat (pornire sub 48°C). Distribuția orizontală pe plafon fals, cu pantă spre punctul de golire.

### PTh-I.2.3 Schema coloanelor de canalizare — diametre și pante

Canalizarea menajeră este separată de cea pluvială (sistem separativ). Coloanele verticale ventilate depășesc învelitoarea cu 0,50 m (ventilație primară).

| Coloană | Obiecte racordate | Ø coloană | Pantă colector orizontal |
|---|---|---|---|
| K1 | grup sanitar central P+E (6 WC, 4 lavoare) | PP 110 | 2,0% |
| K2 | grupuri secundare (4 WC, 3 lavoare) | PP 110 | 2,0% |
| K3 | bucătărie + oficiu (spălătoare, mașină) | PP 110 | 2,5% |
| K4 | cabinet medical + spălătorie | PP 90 | 2,5% |
| KP1 | pluvial acoperiș zona A | PP 110 | 1,5% |
| KP2 | pluvial acoperiș zona B | PP 110 | 1,5% |

Panta minimă respectă I9: 3% pentru DN ≤ 100 recomandat, admis 2% la colectoare lungi; pentru pluvial min. 1,5%. Piese de curățire la bază coloană, schimbări de direcție și la max. 15 m pe orizontală.

### PTh-I.2.4 Schema monofilară — tablou general + tablouri secundare

Alimentarea se face din firida de branșament trifazată prin cablu CYABY 4×25 mmp la **Tabloul General (TG)**, cu contor și întrerupător general 4P 63A.

**Structura de distribuție:**

```
Firidă branșament ─► TG (63A) ─┬─► TS-P (parter)
                               ├─► TS-E (etaj)
                               ├─► TS-CT (centrală termică/instalații)
                               ├─► TS-B (bucătărie)
                               └─► TS-IDSAI/CS (curenți slabi, alimentare garantată)
```

Racord separat pentru consumatorii vitali (IDSAI, iluminat siguranță, pompe incendiu) cu alimentare de rezervă. Selectivitate asigurată prin cascadare: general 63A → secundare 32-40A → circuite finale 10-25A.

### PTh-I.2.5 Schema funcțională CTA (centrală tratare aer)

Sistem de ventilare mecanică cu recuperare de căldură (I5), o CTA principală pentru zonele comune și extracții separate pentru grupuri sanitare/bucătărie.

**Fluxul funcțional CTA-1:**

```
Aer proaspăt ─► jaluzea ─► filtru G4 ─► recuperator rotativ (η=75%)
   ─► baterie încălzire (apă 45/40) ─► filtru F7 ─► ventilator refulare ─► tubulatură
Aer viciat ◄─ ventilator evacuare ◄─ recuperator ◄─ filtru G4 ◄─ grile aspirație
```

Automatizare: senzor CO2 în sala comună (modulează debitul 40-100%), termostat pe refulare (comandă baterie prin vană 3 căi), presostate diferențiale pe filtre (alarmă colmatare), by-pass recuperator (free-cooling la temperatură exterioară favorabilă).

### PTh-I.2.6 Schema IDSAI — matrice cauză-efect

Centrală de detectare adresabilă cu bucle inelare, conform P118-3. Detecție optică de fum în circulații, camere, spații comune; termovelocimetrică în bucătărie/CT.

**Matricea cauză-efect:**

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 |
|---|---|---|---|---|
| Alarmă detector zonă comună | Sirene generale | Deblocare uși evacuare | Oprire CTA | Semnal panou |
| Alarmă buton manual | Sirene generale | Deblocare uși | Oprire CTA | Transmisie dispecerat |
| Alarmă bucătărie (termic) | Sirene locale | Oprire gaze (electroventil) | Oprire hotă | Semnal panou |
| Alarmă CT | Sirene | Oprire gaze CT | Oprire pompă căldură | Semnal |
| Defect buclă | — | — | — | Semnal defect + LED |
| Confirmare pompier | Silențiere sirene | Menținere semnalizare | — | Jurnal |

Temporizare T1 (recunoaștere) 60 s / T2 (investigare) max. 3 min pentru zone cu personal permanent.

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Tabel complet corpuri de încălzire per încăpere

Necesar de căldură din DTAC (SR EN 12831), corpuri dimensionate la ΔT=30°C (45/40/20). Puterea corpului: **Q_corp = Q_necesar × f_amplasare**, cu f=1,05 pentru amplasare sub fereastră.

| Nr. | Încăpere | Q necesar (W) | Tip corp | Dimensiune | Q corp (W) | Nr. |
|---|---|---|---|---|---|---|
| P01 | Hol acces | 480 | Panou 22 | 600×600 | 510 | 1 |
| P02 | Recepție | 620 | Panou 22 | 600×800 | 680 | 1 |
| P03 | Cabinet medical | 890 | Panou 22 | 600×1000 | 850 | 1 |
| P04 | Cameră izolare | 640 | Panou 22 | 600×800 | 680 | 1 |
| P05 | GS bărbați P | 410 | Radiator baie | 600×500 | 430 | 1 |
| P06 | GS femei P | 410 | Radiator baie | 600×500 | 430 | 1 |
| P07 | GS PMR P | 350 | Radiator baie | 500×500 | 360 | 1 |
| P08 | Sală zi comună | pardoseală | — | — | 3800 | — |
| P09 | Sală mese | pardoseală | — | — | 3200 | — |
| P10 | Oficiu | 720 | Panou 22 | 600×900 | 765 | 1 |
| E01 | Birou administrație 1 | 680 | Panou 22 | 600×800 | 680 | 1 |
| E02 | Birou administrație 2 | 680 | Panou 22 | 600×800 | 680 | 1 |
| E03 | Birou director | 590 | Panou 22 | 600×700 | 595 | 1 |
| E04 | Sală ședințe | 940 | Panou 22 | 600×1200 | 1020 | 1 |
| E05 | Sală kinetoterapie | 1680 | Panou 22 ×2 | 600×1000 | 1700 | 2 |
| E06 | Sală activități | pardoseală | — | — | 2900 | — |
| E07 | GS etaj bărbați | 410 | Radiator baie | 600×500 | 430 | 1 |
| E08 | GS etaj femei | 410 | Radiator baie | 600×500 | 430 | 1 |
| E09 | Vestiar personal | 560 | Panou 22 | 600×700 | 595 | 1 |
| — | **TOTAL radiatoare** | **9 990** | — | — | **10 445** | 16 |
| — | **TOTAL pardoseală** | **9 800** | — | — | **9 900** | — |
| — | **TOTAL general** | **19 790** | — | — | **20 345** | — |

Verificare debit total radiatoare: Q=10 445 W, ΔT=5 K → G = Q/(1,163×ΔT) = 10445/(1,163×5) = **1 796 l/h**. Debit pardoseală (ΔT=5): 9900/(1,163×5) = **1 703 l/h**.

### PTh-I.3.2 Tabel complet obiecte sanitare + debite

Debite specifice (I9, SR EN 806): lavoar 0,10 l/s, WC rezervor 0,10 l/s, duș 0,20 l/s, spălător bucătărie 0,20 l/s, robinet serviciu 0,30 l/s.

| Cod | Obiect | Buc. | q spec (l/s) | Σq (l/s) | AR | ACC |
|---|---|---|---|---|---|---|
| OS-1 | Lavoar parter | 4 | 0,10 | 0,40 | da | da |
| OS-2 | WC parter | 3 | 0,10 | 0,30 | da | — |
| OS-3 | Duș cabinet | 1 | 0,20 | 0,20 | da | da |
| OS-4 | Lavoar etaj | 3 | 0,10 | 0,30 | da | da |
| OS-5 | WC etaj | 3 | 0,10 | 0,30 | da | — |
| OS-6 | Spălător oficiu | 2 | 0,20 | 0,40 | da | da |
| OS-7 | Mașină spălat vase | 1 | 0,20 | 0,20 | da | — |
| OS-8 | Robinet serviciu | 2 | 0,30 | 0,60 | da | — |
| OS-9 | Spălătorie | 1 | 0,20 | 0,20 | da | da |
| — | **TOTAL** | **20** | — | **2,90** | — | — |

**Debit de calcul (I9, metoda unităților de debit / SR EN 806-3):** Suma debitelor specifice Σq = 2,90 l/s. Debit de calcul simultan: **qc = 0,7 × √(Σq × 1) + 0,05** aproximat, sau prin curba de simultaneitate → **qc ≈ 1,05 l/s** pentru clădiri administrative/sociale. Dimensionare branșament: qc=1,05 l/s, v=1,5 m/s → D = √(4×qc/(π×v×1000)) → **DN25** (verificat cu viteza 1,4 m/s).

### PTh-I.3.3 Tabel complet circuite electrice

Bilanț puteri din DTAC: Pi ≈ 78 kW, Pc = 45 kW (ks=0,58). Căderea de tensiune admisă (I7): 3% iluminat, 5% forță, de la TG.

**Verificare cădere tensiune monofazat:** Δu% = (2×ρ×L×I×cosφ)/(S×Un) ×100; trifazat coef. √3 în loc de 2.

| Circuit | Destinație | P (W) | I (A) | Protecție | Secțiune | L (m) | Δu% |
|---|---|---|---|---|---|---|---|
| CI-1 | Ilum. hol+recepție | 480 | 2,1 | C10/30mA | 3×1,5 | 22 | 0,9 |
| CI-2 | Ilum. săli comune P | 920 | 4,0 | C10/30mA | 3×1,5 | 28 | 2,1 |
| CI-3 | Ilum. birouri E | 640 | 2,8 | C10/30mA | 3×1,5 | 34 | 1,8 |
| CI-4 | Ilum. GS-uri | 320 | 1,4 | C10/30mA | 3×1,5 | 18 | 0,5 |
| CI-5 | Ilum. siguranță | 180 | 0,8 | C6 | 3×1,5 | 40 | 0,7 |
| CP-1 | Prize parter zona 1 | 2000 | 8,7 | C16/30mA | 3×2,5 | 20 | 1,3 |
| CP-2 | Prize parter zona 2 | 2000 | 8,7 | C16/30mA | 3×2,5 | 26 | 1,7 |
| CP-3 | Prize etaj zona 1 | 2000 | 8,7 | C16/30mA | 3×2,5 | 30 | 2,0 |
| CP-4 | Prize etaj zona 2 | 2000 | 8,7 | C16/30mA | 3×2,5 | 36 | 2,4 |
| CP-5 | Prize cabinet medical | 1500 | 6,5 | C16/30mA | 3×2,5 | 24 | 1,2 |
| CF-1 | Pompă căldură | 18000 | 27,4 | C40 3P | 5×6 | 15 | 1,1 |
| CF-2 | CTA-1 | 3000 | 6,4 | C16 3P | 5×2,5 | 18 | 1,0 |
| CF-3 | Boiler ACM | 4500 | 19,6 | C25/30mA | 3×4 | 16 | 1,4 |
| CF-4 | Bucătărie forță | 8000 | 12,1 | C25 3P | 5×4 | 22 | 1,3 |
| CF-5 | Pompe recirculare | 600 | 2,6 | C10/30mA | 3×1,5 | 20 | 0,8 |
| CF-6 | Pompă hidranți | 4000 | 8,5 | C16 3P | 5×2,5 | 25 | 1,5 |
| CS-1 | IDSAI (garantat) | 300 | 1,3 | C6/UPS | 3×1,5 | — | — |
| CS-2 | Nurse-call (garantat) | 200 | 0,9 | C6/UPS | 3×1,5 | — | — |

Toate circuitele de prize și forță monofazate cu protecție diferențială 30 mA (I7 art. protecție persoane). Circuit siguranță pe grup separat cu alimentare de rezervă.

### PTh-I.3.4 Tabel complet guri de ventilare + debite reglaj

Debite aer proaspăt din DTAC (I5): sală comună 25 mc/h/pers, birou 30 mc/h/pers, GS extracție 25 mc/h/obiect.

| Gură | Încăpere | Tip | Debit proiectat (mc/h) | Reglaj admis (±%) |
|---|---|---|---|---|
| VR-1 | Sală zi comună | difuzor rotativ | 600 | ±10 |
| VR-2 | Sală mese | difuzor rotativ | 480 | ±10 |
| VR-3 | Sală activități | difuzor rotativ | 420 | ±10 |
| VR-4 | Birouri E (×3) | anemostat | 3×120 | ±10 |
| VR-5 | Sală kineto | difuzor liniar | 300 | ±10 |
| VE-1 | GS parter | valvă extracție | 3×50 | ±15 |
| VE-2 | GS etaj | valvă extracție | 3×50 | ±15 |
| VE-3 | Bucătărie hotă | grilă | 800 | ±15 |
| VE-4 | Oficiu | valvă | 100 | ±15 |
| VE-5 | Spălătorie | valvă | 150 | ±15 |
| — | **Σ refulare** | — | **2 160** | — |
| — | **Σ extracție** | — | **1 500** | — |

Bilanț: refulare 2160 mc/h, extracție locală 1500 mc/h + extracție CTA 660 mc/h = echilibrat cu ușoară suprapresiune în zonele comune (igienic).

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Pompă de căldură aer-apă

| Parametru | Valoare |
|---|---|
| Tip | aer-apă, inverter, monobloc exterior |
| Putere termică nominală | 60 kW (A7/W45) |
| Putere frigorifică | 55 kW (A35/W7) |
| COP | 3,4 (A7/W35) |
| SCOP | 3,9 (climat mediu) |
| Alimentare | 400V/3F/50Hz |
| Putere electrică absorbită | 18 kW |
| Agent frigorific | R32 |
| Temperatură tur max. | 60°C |
| Nivel zgomot | ≤ 58 dB(A) la 1 m |
| Clasă eficiență sezonieră | A++ |

### PTh-I.4.2 Fișă tehnică — CTA-1 (centrală tratare aer)

| Parametru | Valoare |
|---|---|
| Debit nominal | 2 200 mc/h |
| Recuperator | rotativ entalpic, η = 75% |
| Baterie încălzire | apă 45/40°C, 8 kW |
| Filtre | G4 (proaspăt+viciat) + F7 (refulare) |
| Ventilatoare | EC, presiune disponibilă 300 Pa |
| Putere electrică | 3 kW |
| SFP (putere specifică ventilator) | ≤ 1,5 kW/(mc/s) |
| Automatizare | integrată, comunicație BMS Modbus |

### PTh-I.4.3 Fișă tehnică — Boiler ACM

| Parametru | Valoare |
|---|---|
| Tip | boiler bivalent (PC + rezistență) |
| Volum | 500 l |
| Suprafață serpentină | 2,5 mp |
| Rezistență electrică back-up | 4,5 kW |
| Ciclu antilegionella | automat, 60°C săptămânal |
| Izolație | poliuretan 50 mm, pierdere ≤ 1,8 kWh/24h |

### PTh-I.4.4 Fișă tehnică — Tablouri electrice

| Tablou | Curent nominal | Nr. circuite | IP | Observații |
|---|---|---|---|---|
| TG | 63 A | 12 | IP40 | contor, general 4P, SPD tip 2 |
| TS-P | 40 A | 10 | IP40 | diferențiale 30mA |
| TS-E | 40 A | 10 | IP40 | diferențiale 30mA |
| TS-CT | 40 A | 8 | IP54 | mediu umed |
| TS-B | 32 A | 6 | IP54 | bucătărie |
| TS-IDSAI/CS | 16 A | 6 | IP40 | alimentare garantată UPS |

### PTh-I.4.5 Fișă tehnică — Centrală IDSAI

| Parametru | Valoare |
|---|---|
| Tip | adresabilă, 2 bucle |
| Capacitate | 250 adrese/buclă |
| Detectoare | optice fum + termovelocimetrice |
| Butoane manuale | pe căi de evacuare, max. 30 m |
| Sirene | interior + exterioară cu flash |
| Acumulatori back-up | 72 h veghe + 30 min alarmă |
| Conformitate | P118-3, SR EN 54 |

### PTh-I.4.6 Fișă tehnică — Instalație hidranți interiori

| Parametru | Valoare |
|---|---|
| Tip | hidranți interiori DN25 cu furtun semirigid |
| Debit/hidrant | 2,1 l/s (P118-2) |
| Nr. jeturi simultane | 2 |
| Debit calcul | 4,2 l/s |
| Presiune la robinet | min. 2,7 bar |
| Timp funcționare | 60 min |
| Rezervă apă incendiu | 15,1 mc |
| Grup pompare | pompă principală + rezervă + pilot, presiune 4,5 bar |

---

## PTh-I.5 Probe și verificări detaliate

### PTh-I.5.1 Tabel probe per instalație

| Instalație | Proba | Presiune / parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Încălzire radiatoare | presiune la rece | 1,5 × p.regim = min. 6 bar | 2 h | fără scădere presiune, fără scurgeri |
| Pardoseală radiantă | presiune sub șapă | 6 bar | 24 h | scădere ≤ 0,2 bar (corecție temperatură) |
| Pardoseală radiantă | menținere la turnare șapă | 3 bar | pe durata turnării | presiune menținută |
| Apă rece/caldă | etanșeitate | 1,5 × p.regim = min. 9 bar (dacă regim 6) | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Apă rece/caldă | dezinfecție + spălare | — | conform protocol | analiză bacteriologică conformă |
| Canalizare | etanșeitate cu apă | umplere coloană la nivel etaj | 15 min | fără scurgeri la îmbinări |
| Canalizare | proba cu fum (opțional) | fum sub presiune joasă | — | fără fugă vizibilă |
| Ventilare — tubulatură | etanșeitate | clasa B (SR EN 12237) | conform metodă | scurgeri sub limita clasei |
| Electrice | rezistență izolație | 500 V c.c. | — | ≥ 0,5 MΩ (I7) |
| Electrice | continuitate PE + priză pământ | — | — | Rp ≤ 4 Ω (fără paratrăsnet), ≤1Ω cu |
| Electrice | test declanșare RCD | I∆n = 30 mA | — | declanșare < 300 ms |
| Electrice | buclă defect | — | — | valori conf. calcul selectivitate |
| IDSAI | funcțională detectoare | test 100% | — | semnalizare corectă fiecare adresă |
| IDSAI | matrice cauză-efect | test integral | — | toate efectele confirmate |
| IDSAI | autonomie acumulatori | descărcare | 72 h | menținere veghe |
| Hidranți | debit-presiune | la robinetul cel mai defavorabil | — | ≥2,1 l/s la ≥2,7 bar |
| Gaze | rezistență + etanșeitate | conform normativ gaze | — | fără scădere presiune |

### PTh-I.5.2 Verificări electrice PRAM — detaliu

Verificările PRAM (Protecție prin Relee și Automatizări / măsurări) includ:

- **Rezistența de izolație** măsurată între conductoare active și între active-PE, la 500 V c.c., valoare minimă 0,5 MΩ pentru circuite ≤ 500 V (I7 tabel).
- **Rezistența prizei de pământ**: măsurată prin metoda celor 3 electrozi (voltmetru-ampermetru), R_p ≤ 4 Ω. La combinarea cu instalația de paratrăsnet și priza fundației, ținta ≤ 1 Ω.
- **Continuitatea conductorului de protecție** pe fiecare circuit final.
- **Testul dispozitivelor diferențiale** cu aparat dedicat: verificare timp de declanșare (<300 ms la I∆n, <150 ms la 5×I∆n) și curent real de declanșare (0,5-1×I∆n).
- **Verificarea SPD** (descărcătoare) și a legării la bara de echipotențializare.

---

## PTh-I.6 Tehnologia de montaj

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee și găuri (înainte de turnare pardoseli/planșee).
2. Montaj coloane verticale (canalizare → apă → termic → electric), de jos în sus.
3. Montaj distribuții orizontale îngropate/mascate — **probate înainte de mascare** (faze determinante).
4. Turnare șape peste pardoseala radiantă (după proba la 3 bar menținută).
5. Montaj corpuri de încălzire, obiecte sanitare, aparataj electric — după finisaje.
6. Montaj echipamente majore (PC, CTA, boiler, tablouri, centrală IDSAI).
7. Probe finale, PIF, reglaje.

### PTh-I.6.2 Susțineri și fixări

| Instalație | Tip susținere | Interax maxim |
|---|---|---|
| Țeavă Cu/oțel orizontal | brățară cu garnitură | Ø≤22: 1,25 m; Ø28-42: 2,0 m |
| PPR orizontal | brățară glisantă (dilatare) | Ø≤32: 0,8 m; Ø40-63: 1,0 m |
| PP canalizare vertical | brățară fixă/glisantă | pe fiecare etaj + la ramificații |
| Tubulatură ventilare | tijă filetată + profil | 1,5-2,0 m |
| Jgheab cabluri | consolă | 1,0-1,5 m |

Compensarea dilatării pentru PPR apă caldă prin brațe de compensare / lire; puncte fixe la coloane.

### PTh-I.6.3 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Distribuție termică tur/retur | 25-40 mm (funcție Ø) | vată minerală/elastomer |
| Conducte ACM + recirculare | 20-30 mm | elastomer |
| Conducte AR (anticondens) | 9-13 mm | elastomer |
| Tubulatură ventilare | 20-50 mm | vată cu foaie Al |

Grosimile respectă cerințele I5/I13 privind limitarea pierderilor (izolație funcție de diametru și diferență de temperatură).

### PTh-I.6.4 Treceri etanșe la foc

La traversarea pereților/planșeelor cu rol de compartimentare (P118), toate trecerile de instalații se etanșează cu **sisteme certificate** de rezistență la foc egală cu a elementului străbătut:

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Conducte metalice | manșon/mastic intumescent | EI conf. element |
| Conducte plastic (PP, PPR) | colier intumescent (obturare la topire) | EI conf. element |
| Fascicule cabluri | pernă/mastic + vopsea termospumantă | EI conf. element |
| Tubulatură ventilare | clapetă antifoc + etanșare | EI conf. element |

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrarea hidraulică — încălzire

Echilibrarea se face pe distribuitoare, urmărind debitele de calcul din breviar (PTh-I.3.1). Pentru pardoseala radiantă se reglează flowmetrele fiecărei bucle la debitul din tabelul PTh-I.2.1.

**Protocol echilibrare radiatoare (metoda presetare robineți termostatici):**

| Distribuitor | Circuit | Debit țintă (l/h) | Presetare robinet | Debit măsurat |
|---|---|---|---|---|
| D1 | C1.1 | 172 | poziția 3 | _____ |
| D1 | C1.2 | 258 | poziția 4 | _____ |
| D1 | C1.3 | 215 | poziția 3,5 | _____ |
| D1 | C1.4 | 301 | poziția 4,5 | _____ |
| D1 | C1.5 | 344 | poziția 5 | _____ |
| D2 | C2.1 | 210 | flowmetru 3,5 l/min | _____ |
| D2 | C2.2 | 195 | flowmetru 3,2 l/min | _____ |
| D2 | C2.3 | 180 | flowmetru 3,0 l/min | _____ |
| D2 | C2.4 | 165 | flowmetru 2,7 l/min | _____ |

Criteriu de acceptare (SR EN 14336): abatere debit ≤ ±10% față de proiectat pe fiecare ramură.

### PTh-I.7.2 Reglaj aeraulic — ventilare

Reglajul se face la gurile din PTh-I.3.4, cu anemometru, urmărind debitele proiectate. Procedură: se reglează întâi ventilatorul CTA la debit total, apoi se echilibrează gurile de la cea mai defavorabilă (capăt tronson) spre CTA.

Criteriu (SR EN 12599): abatere debit total ≤ ±15%, pe fiecare gură ≤ ±20% (recepție ventilare pentru clădiri).

### PTh-I.7.3 Protocol primă încălzire pardoseală radiantă

Punerea în funcțiune a pardoselii radiante după minimum 21 zile de la turnarea șapei cimentoase (7 zile pentru anhidrit), conform SR EN 1264-4:

| Ziua | Temperatură tur | Observație |
|---|---|---|
| 1 | 25°C | menținere constantă |
| 2 | 25°C | — |
| 3 | 25°C | — |
| 4 | 35°C (+10°C/zi) | creștere treptată |
| 5 | 45°C (temp. max. proiect) | menținere |
| 6-7 | 45°C | menținere max. proiect |
| 8+ | revenire la temp. de exploatare | proces-verbal prima încălzire |

Se întocmește **proces-verbal de primă încălzire** semnat de executant și beneficiar.

### PTh-I.7.4 Programare BMS / IDSAI

- **BMS**: parametrizare curbe de încălzire (compensare climatică pompă căldură), programe orare (regim redus noapte), praguri CO2 pentru CTA, alarmări (avarie pompă, colmatare filtre, temperatură ACM).
- **IDSAI**: programare adrese detectoare, texte descriptive per zonă, temporizări T1/T2, testare integrală matrice cauză-efect, punere sub supraveghere.

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

### PTh-I.8.1 Tabel PCC

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente | certificate, agremente | responsabil tehnic | CQ |
| 2 | Trasee coloane înainte de mascare | proces-verbal | RTE + diriginte | **FD** |
| 3 | Probă presiune pardoseală radiantă | PV probă 6 bar/24h | RTE + diriginte | **FD** |
| 4 | Probă presiune instalație termică | PV probă | RTE + diriginte | CM |
| 5 | Probă etanșeitate apă | PV probă SR EN 806 | RTE + diriginte | CM |
| 6 | Probă canalizare înainte de mascare | PV probă | RTE + diriginte | **FD** |
| 7 | Rezistență izolație + priză pământ | buletin PRAM | verificator/laborator | CM |
| 8 | Test RCD / diferențiale | buletin PRAM | laborator autorizat | CM |
| 9 | Etanșeitate tubulatură ventilare | PV clasă etanșeitate | RTE | CM |
| 10 | Funcțional IDSAI + cauză-efect | PV probe 100% | firmă autorizată IGSU | **FD** |
| 11 | Debit-presiune hidranți | PV probă | firmă autorizată | CM |
| 12 | Echilibrare hidraulică | protocol debite | RTE | CM |
| 13 | Reglaj aeraulic | protocol debite | RTE | CM |
| 14 | Primă încălzire pardoseală | PV primă încălzire | executant + beneficiar | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant); CM = control în masă; CQ = control calitate recepție.

### PTh-I.8.2 Faze determinante (probe îngropate/mascate)

Fazele determinante marcate mai sus (FD) sunt cele la care lucrarea nu poate continua fără verificare și proces-verbal, deoarece elementul devine inaccesibil sau are rol de securitate:

- Trasee de instalații înainte de mascare (plafoane false, ziduri, șape).
- Proba pardoselii radiante înainte și pe durata turnării șapei.
- Proba canalizării îngropate înainte de acoperire.
- Recepția IDSAI (securitate la incendiu — verificare 100% cu firmă autorizată IGSU).

### PTh-I.8.3 Cartea tehnică a construcției — capitol instalații

La finalizare se predă beneficiarului **capitolul instalații al cărții tehnice**, cuprinzând:

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație |
| Scheme finale | monofilară actualizată, coloane, izometrice |
| Fișe tehnice echipamente | toate echipamentele montate + certificate |
| Buletine de probe | PRAM, presiune, etanșeitate, debite |
| Procese-verbale FD | toate fazele determinante semnate |
| Protocoale reglaj | echilibrare hidraulică, reglaj aeraulic, primă încălzire |
| Instrucțiuni de exploatare | operare PC, CTA, boiler, BMS, IDSAI |
| Program mentenanță | revizii periodice, verificări ISCIR/PSI |
| Garanții | certificate garanție producători |

Cartea tehnică se completează pe tot parcursul execuției și constituie baza recepției la terminarea lucrărilor și a exploatării ulterioare.