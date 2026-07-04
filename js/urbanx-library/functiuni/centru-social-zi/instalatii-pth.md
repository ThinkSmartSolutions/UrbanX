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

## PTh-I.9 — Calcul iluminat interior și de siguranță (NP061-02 / SR EN 12464-1)

### PTh-I.9.1 — Metoda de calcul (flux luminos)

Calculul se face prin metoda factorului de utilizare (flux luminos), conform SR EN 12464-1 și NP061-02. Formula de bază pentru numărul de corpuri:

N = (E × S) / (Φ_corp × U × M)

unde:
- E = nivelul de iluminare menținut cerut [lx]
- S = suprafața încăperii [mp]
- Φ_corp = fluxul luminos al unui corp [lm]
- U = factorul de utilizare (funcție de indicele încăperii k și reflectanțe)
- M = factorul de mentenanță (0,80 pentru corpuri LED etanșe, mediu curat)

Indicele încăperii: k = (L × l) / [Hu × (L + l)], unde Hu = înălțimea utilă (planul de montaj − planul de lucru 0,85 m).

Reflectanțe adoptate (tavan/pereți/pardoseală): 0,70 / 0,50 / 0,20 (spații curate, finisaje deschise). Factor de mentenanță M = 0,80.

Corp de referință adoptat pentru spații uscate: panou LED 600×600, 36 W, 4000 lm, eficacitate 111 lm/W, UGR ≤ 19. Pentru spații umede: corp etanș IP65 LED 40 W / 4400 lm.

### PTh-I.9.2 — Cerințe de iluminare pe categorii de încăperi (SR EN 12464-1 / NP061)

| Tip încăpere | Em cerut [lx] | UGR max | Ra min | Uo min |
|---|---|---|---|---|
| Săli de zi / socializare vârstnici | 300 | 22 | 80 | 0,60 |
| Cabinet medical / tratament | 500 | 19 | 90 | 0,70 |
| Săli de mese | 300 | 22 | 80 | 0,60 |
| Birouri administrație | 500 | 19 | 80 | 0,60 |
| Bucătărie / oficiu preparare | 500 | 22 | 80 | 0,60 |
| Grupuri sanitare / băi | 200 | 25 | 80 | 0,40 |
| Vestiare / dormit odihnă | 200 | 22 | 80 | 0,40 |
| Circulații / holuri / coridoare | 150 | 25 | 80 | 0,40 |
| Casa scării | 150 | 25 | 80 | 0,40 |
| Depozite / magazii | 100 | 25 | 80 | 0,40 |
| Spații tehnice (CT, tablouri) | 200 | 25 | 80 | 0,40 |
| Recepție / spațiu primire | 300 | 22 | 80 | 0,60 |

**Notă vârstnici:** conform NP061, pentru clădiri cu utilizatori vârstnici se aplică un spor de +1 treaptă pe scara Em în zonele de activitate (vârsta reduce sensibilitatea retiniană — necesar de ~2× lux față de un adult tânăr). Nivelurile din tabel includ deja acest spor față de valoarea generică.

### PTh-I.9.3 — Calcul detaliat pe încăperi (parter)

Corp de referință 36 W / 4000 lm, Hu = 3,00 − 0,85 = 2,15 m (unde H liber = 3,00 m).

| Nr | Încăpere | S [mp] | L×l [m] | k | U | E cerut | N calc | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|---|---|
| P01 | Sală de zi 1 | 60 | 10,0×6,0 | 1,74 | 0,68 | 300 | 8,3 | 9 | 324 |
| P02 | Sală de zi 2 | 48 | 8,0×6,0 | 1,60 | 0,66 | 300 | 6,8 | 7 | 252 |
| P03 | Sală de mese | 55 | 11,0×5,0 | 1,59 | 0,65 | 300 | 7,9 | 8 | 288 |
| P04 | Cabinet medical | 20 | 5,0×4,0 | 1,03 | 0,54 | 500 | 5,8 | 6 | 216 |
| P05 | Recepție / primire | 18 | 6,0×3,0 | 0,93 | 0,51 | 300 | 3,3 | 4 | 144 |
| P06 | Bucătărie / oficiu | 24 | 6,0×4,0 | 1,12 | 0,56 | 500 | 6,7 | 7 (IP65 40W) | 280 |
| P07 | Hol principal | 35 | 14,0×2,5 | 0,99 | 0,52 | 150 | 3,2 | 4 | 144 |
| P08 | Grup sanitar F | 12 | 4,0×3,0 | 0,80 | 0,48 | 200 | 1,6 | 2 (IP65) | 80 |
| P09 | Grup sanitar B | 12 | 4,0×3,0 | 0,80 | 0,48 | 200 | 1,6 | 2 (IP65) | 80 |
| P10 | GS persoane cu dizabilități | 6 | 3,0×2,0 | 0,56 | 0,40 | 200 | 1,0 | 2 (IP65) | 80 |
| P11 | Vestiar personal | 10 | 4,0×2,5 | 0,72 | 0,45 | 200 | 1,4 | 2 | 72 |
| P12 | Centrala termică | 15 | 5,0×3,0 | 0,87 | 0,49 | 200 | 1,8 | 2 (IP65) | 80 |
| P13 | Casa scării | 12 | 4,0×3,0 | 0,80 | 0,48 | 150 | 1,2 | 2 | 72 |
| P14 | Depozit alimente | 8 | 4,0×2,0 | 0,62 | 0,42 | 100 | 0,6 | 1 (IP65) | 40 |

Exemplu de verificare (P01, sală de zi 1):
N = (300 × 60) / (4000 × 0,68 × 0,80) = 18000 / 2176 = 8,27 → 9 corpuri.
E realizat = (9 × 4000 × 0,68 × 0,80) / 60 = 19584 / 60 = **326 lx ≥ 300 lx** ✓
Uniformitate estimată Uo = 0,62 ≥ 0,60 (dispunere 3×3 uniformă, distanță/înălțime = 0,9 ≤ SHR max). ✓

### PTh-I.9.4 — Calcul detaliat pe încăperi (etaj)

| Nr | Încăpere | S [mp] | k | U | E cerut | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|
| E01 | Sală odihnă / dormit 1 | 40 | 1,50 | 0,64 | 200 | 5 | 180 |
| E02 | Sală odihnă / dormit 2 | 40 | 1,50 | 0,64 | 200 | 5 | 180 |
| E03 | Sală activități / kinetoterapie | 50 | 1,60 | 0,66 | 300 | 7 | 252 |
| E04 | Birou administrație | 22 | 1,05 | 0,55 | 500 | 6 | 216 |
| E05 | Birou asistent social | 16 | 0,90 | 0,50 | 500 | 5 | 180 |
| E06 | Sală multifuncțională | 45 | 1,55 | 0,65 | 300 | 7 | 252 |
| E07 | Hol etaj | 30 | 0,95 | 0,51 | 150 | 4 | 144 |
| E08 | Grup sanitar F etaj | 12 | 0,80 | 0,48 | 200 | 2 (IP65) | 80 |
| E09 | Grup sanitar B etaj | 12 | 0,80 | 0,48 | 200 | 2 (IP65) | 80 |
| E10 | Magazie materiale | 10 | 0,72 | 0,45 | 100 | 2 | 72 |
| E11 | Casa scării etaj | 12 | 0,80 | 0,48 | 150 | 2 | 72 |

### PTh-I.9.5 — Sinteză putere instalată iluminat

| Zonă | Nr corpuri | Putere instalată [W] |
|---|---|---|
| Parter (normal) | 58 | 2072 |
| Etaj (normal) | 47 | 1708 |
| Exterior (aplice, balizaj) | 14 | 560 |
| **Total iluminat normal** | **119** | **4340** |

Putere specifică iluminat: 4340 W / 900 mp = **4,82 W/mp**, sub limita indicativă NP061 de 8–10 W/mp pentru LED. ✓ Densitatea de putere pentru iluminat (LPD) respectă cerința Legii 372/2005.

### PTh-I.9.6 — Iluminat de siguranță și evacuare (NP061-02 cap. 7, SR EN 1838)

Se prevăd următoarele categorii de iluminat de siguranță, cu corpuri LED autonome (kit acumulator Li-Fe, autonomie 3 h, menteninstabile, LED permanent SA/nepermanent SE):

| Tip iluminat siguranță | Cerință normativă | Nivel | Autonomie | Amplasare |
|---|---|---|---|---|
| Evacuare (căi) | E ≥ 1 lx pe axul căii; ≥ 0,5 lx bandă centrală | 1 lx | 3 h | Coridoare, holuri, scări |
| Antipanică (spații > 60 mp) | E ≥ 0,5 lx la 1 m de pardoseală | 0,5 lx | 3 h | Săli de zi, sală mese, sală multifuncț. |
| Marcare hidranți / ECS / stingătoare | E ≥ 5 lx pe echipament | 5 lx | 3 h | Puncte PSI |
| Indicatoare direcție (pictograme) | Luminanță ≥ 2 cd/mp, distanță vizibilitate | permanent | 3 h | Traseu evacuare, uși evacuare |
| Iluminat de siguranță pt continuarea lucrului | E ≥ 10% din normal (cabinet medical) | 50 lx | 1 h | Cabinet medical |

Calcul corpuri evacuare (coridor tip, lungime 14 m, corp de evacuare 3 W / 200 lm cu distribuție trasee):
- Distanța max între corpuri pe cale: cf. producător, 8–10 m pentru 1 lx la H=2,8 m.
- N = 14 / 8 + 1 uși = 2 corpuri traseu + 1 corp deasupra ușii de evacuare.

| Zonă | Corpuri evacuare 3W | Corpuri antipanică 3W | Indicatoare Exit 3W |
|---|---|---|---|
| Parter coridoare + hol | 4 | — | 3 |
| Parter săli (antipanică) | — | 6 | 3 |
| Casa scării (P+E) | 4 | — | 2 |
| Etaj coridor + săli | 4 | 5 | 4 |
| Marcare PSI (hidranți/stingătoare) | 6 (5 lx) | — | — |
| **Total** | **18** | **11** | **12** |

Total iluminat siguranță: 41 corpuri × ~3 W = **123 W** (pe acumulatori proprii, nu se însumează la puterea de calcul a tabloului decât ca sarcină de încărcare ~0,2 kW). Toate corpurile sunt de tip autotest (test funcțional automat lunar + test autonomie semestrial), cu semnalizare defect local.

Verificare timp de comutare: ≤ 5 s pentru atingerea a 50% din nivel, ≤ 60 s pentru 100% (SR EN 1838) — asigurat prin corpuri autonome (comutare instantanee la căderea tensiunii). ✓

---

## PTh-I.10 — Breviar de calcul securitate la incendiu (instalații)

### PTh-I.10.1 — Încadrare și cerințe generale

Clădire: centru social de zi, categoria de importanță C (normală), clasa de importanță III. Funcțiune: sănătate/asistență socială — se asimilează cerințelor pentru clădiri civile cu persoane care necesită asistență la evacuare. Regim P+1, arie construită ~500 mp, arie desfășurată ~900 mp, H max cca 8 m. Grad de rezistență la foc II. Risc de incendiu mic–mijlociu.

Nr. maxim persoane estimat: ~80 (beneficiari + personal). Necesită căi de evacuare dimensionate și, ca urmare a numărului și tipului de utilizatori, instalații de semnalizare și, după caz, hidranți interiori.

### PTh-I.10.2 — Calcul hidranți interiori (P118/2-2013, art. specifice)

Conform P118/2-2013, pentru clădiri de sănătate/asistență socială cu arie desfășurată peste 600 mp se prevăd hidranți interiori.

Parametri adoptați:
- Debit specific pe hidrant: q = 2,1 l/s (jet compact) — clădire civilă risc mic–mijlociu.
- Nr. jeturi simultane în funcțiune: n = 2 (arie și volum compartiment).
- Lungime furtun: 20 m + rază jet 6 m = acoperire 26 m/hidrant.

Debit de calcul instalație hidranți interiori:
Q_hi = n × q = 2 × 2,1 = **4,2 l/s**

Presiune la robinetul hidrantului:
- Presiune minimă la ajutaj pentru jet compact: 2,5 bar (250 kPa).
- Pierderi furtun 20 m + racord + robinet ≈ 0,4 bar.
- Presiune necesară la hidrant: **≈ 2,9 bar**.

Verificare acoperire: cu furtun 20 m + jet 6 m fiecare punct al clădirii trebuie atins de min. 1 jet (2 jeturi în zonele centrale). Se amplasează 4 hidranți interiori (2 parter, 2 etaj) în casa scării/holuri — fiecare punct acoperit de cel puțin 2 jeturi. ✓

| Parametru hidranți interiori | Valoare |
|---|---|
| Nr. hidranți interiori | 4 (2/nivel) |
| Debit specific / hidrant | 2,1 l/s |
| Jeturi simultane | 2 |
| Debit de calcul Q_hi | 4,2 l/s |
| Presiune necesară la hidrant | 2,9 bar |
| Timp teoretic de funcționare | 10 min (interiori) |
| Tip | echipat DN25/DN33, furtun semirigid 20 m |

### PTh-I.10.3 — Calcul hidranți exteriori

Conform P118/2, pentru volumul construit (~2700 mc) și riscul de incendiu, debit hidranți exteriori:
Q_he = **5 l/s**, timp de funcționare teoretic 60 min (asigurat de rețeaua stradală / hidranți publici la ≤ 100 m sau gospodărie proprie).

Amplasare: 2 hidranți exteriori supraterani DN80, dispuși la max. 150 m unul de altul, la ≥ 5 m de clădire, racordați la rețeaua publică. Dacă rețeaua publică nu asigură debit/presiune, se prevede rezervă proprie (vezi mai jos).

### PTh-I.10.4 — Rezervă intangibilă de incendiu

Volumul rezervei (dacă nu există sursă publică suficientă) se calculează pentru hidranți interiori + eventual exteriori:

V_rezervă = (Q_hi × t_hi + Q_he × t_he) × 3,6

- Hidranți interiori: 4,2 l/s × 10 min = 4,2 × 600 = 2520 l = 2,52 mc
- Hidranți exteriori (dacă nu e sursă publică): 5 l/s × 60 min = 5 × 3600 = 18000 l = 18 mc

V_rezervă totală = 2,52 + 18 = **20,52 mc** (rotunjit 21 mc), în rezervor propriu, dacă rețeaua publică nu confirmă debitul. În ipoteza racordului la rețea publică cu debit/presiune confirmate prin aviz, rezervorul propriu se limitează la hidranții interiori (~3 mc) + grup de pompare.

| Componentă rezervă | Debit | Timp | Volum |
|---|---|---|---|
| Hidranți interiori | 4,2 l/s | 10 min | 2,52 mc |
| Hidranți exteriori (fără sursă publică) | 5,0 l/s | 60 min | 18,00 mc |
| **Total rezervă intangibilă** | — | — | **20,52 mc** |

### PTh-I.10.5 — Grup de pompare incendiu

Grup dimensionat pentru scenariul cel mai defavorabil (hidranți interiori 4,2 l/s la 2,9 bar + pierderi coloane/subteran):
- Debit pompă: Q_p ≥ 4,5 l/s (16,2 mc/h), cu marjă.
- Înălțime de pompare: H_p = presiune necesară + pierderi + înălțime geodezică ≈ (29 + 4 + 8) mCA ≈ **41 mCA**.
- Configurație: 1 pompă activă + 1 pompă rezervă (100% backup) + 1 pompă pilot (menținere presiune) + vas de presiune 24–50 l.
- Alimentare electrică din tabloul general pe circuit distinct, prioritar (vezi P100 și I7 — sursă de rezervă).

### PTh-I.10.6 — Instalație de detectare, semnalizare și avertizare incendiu (IDSAI) — dimensionare detectoare

Conform P118/3-2015, acoperire cu detectoare de fum optice adresabile. Arie de acoperire per detector fum: 60–80 mp la H ≤ 3,5 m (adopt 60 mp acoperire de siguranță), rază max 6,7 m. Distanța max detector–perete: 3,35 m.

Nr. detectoare per încăpere: N_det = S / 60 (min. 1 pe încăpere închisă cu risc).

| Încăpere | S [mp] | Tip detector | Nr. detectoare |
|---|---|---|---|
| Sală de zi 1 | 60 | fum optic | 1 |
| Sală de zi 2 | 48 | fum optic | 1 |
| Sală de mese | 55 | fum optic | 1 |
| Cabinet medical | 20 | fum optic | 1 |
| Recepție | 18 | fum optic | 1 |
| Bucătărie/oficiu | 24 | termic (nu fum — vapori) | 1 |
| Hol parter | 35 | fum optic | 1 |
| Centrala termică | 15 | termovelocimetric | 1 |
| Depozit alimente | 8 | fum optic | 1 |
| Vestiar | 10 | fum optic | 1 |
| Casa scării (P+E) | — | fum optic | 2 |
| Săli odihnă/dormit E01,E02 | 80 | fum optic | 2 |
| Sală kineto E03 | 50 | fum optic | 1 |
| Birouri E04,E05 | 38 | fum optic | 2 |
| Sală multifuncțională E06 | 45 | fum optic | 1 |
| Holuri etaj | 30 | fum optic | 1 |
| GS-uri (P+E) | — | — (exceptate) | 0 |
| Magazie E10 | 10 | fum optic | 1 |
| **Total detectoare automate** | — | — | **19** |

Elemente de comandă/semnalizare:
- Butoane manuale de semnalizare (declanșatoare manuale): pe fiecare cale de evacuare, lângă ieșiri și în casa scării — **6 buc** (max 30 m distanță de parcurs până la un buton).
- Sirene interioare acustico-optice: acoperire ≥ 65 dB(A) în toate spațiile → **6 buc** (3/nivel).
- Sirenă exterioară cu flash: **1 buc**.
- Centrală de semnalizare adresabilă: 2 bucle, cu baterii tampon autonomie 48 h veghe + 30 min alarmă, amplasată la recepție (spațiu supravegheat permanent).
- Interfațare: comandă oprire CTA la alarmă, deblocare uși evacuare, transmisie la dispecerat/persoană responsabilă.

### PTh-I.10.7 — Desfumare (evacuare fum și gaze fierbinți)

Conform P118/2 și normativ desfumare:
- Casa scării închisă: desfumare prin trapă/fereastră în treimea superioară, arie liberă ≥ 1 mp (5% din arie sau min 1 mp), cu comandă manuală la parter + declanșare automată.
- Coridoare de evacuare > 20 m: desfumare naturală prin ferestre mobile sau mecanică. Coridoarele proiectate ≤ 20 m — nu necesită desfumare separată, dar se asigură deschideri.
- Bucătărie: hotă cu evacuare mecanică proprie (vezi ventilare).

| Spațiu | Tip desfumare | Suprafață liberă / debit |
|---|---|---|
| Casa scării | naturală (trapă acoperiș) | A_libera ≥ 1,0 mp |
| Coridor parter (dacă > 20 m) | naturală (ferestre) | ≥ 1 mp la capăt |
| Coridor etaj | naturală (ferestre) | ≥ 1 mp la capăt |

Calcul arie desfumare casa scării: A_geometrică ≥ 1 mp; A_liberă = A_geom × Cd (coef. 0,5–0,6 trapă) → se adoptă trapă 1,5 × 1,0 m = 1,5 mp geometric → A_liberă ≈ 0,9–1,0 mp. ✓ (Introducerea de aer se face prin ușa de la parter, deschisă la evacuare.)

### PTh-I.10.8 — Dotare cu stingătoare portabile (P118, mod calcul pe arie)

Regulă de dotare: min. 1 stingător cu pulbere P6 (6 kg, 21A-113B-C) la fiecare 200 mp arie sau fracțiune, cu distanța max de parcurs până la un stingător ≤ 15 m. În plus, stingătoare specifice pe risc.

| Zonă / risc | Arie [mp] | Nr. stingătoare | Tip |
|---|---|---|---|
| Parter (spații generale) | 500 | 3 | P6 pulbere ABC |
| Etaj (spații generale) | 400 | 2 | P6 pulbere ABC |
| Centrala termică | 15 | 1 | P6 pulbere ABC |
| Bucătărie (grăsimi) | 24 | 1 | spumant clasa F (grăsimi) |
| Tablouri electrice / IT | — | 2 | CO2 (G5, clasa E) |
| Rezervă / recepție | — | 1 | P6 pulbere ABC |
| **Total** | — | **10** | — |

Verificare parter: 500 mp / 200 = 2,5 → 3 stingătoare + suplimentare pe risc. Distanțe de parcurs ≤ 15 m verificate pe plan (amplasare la ieșiri, holuri, lângă hidranți). ✓

---

## PTh-I.11 — Bilanț energetic al clădirii (Legea 372/2005, Mc 001)

### PTh-I.11.1 — Date de intrare

| Parametru | Valoare |
|---|---|
| Arie utilă totală (A_u) | 810 mp |
| Arie desfășurată | 900 mp |
| Volum încălzit (V) | 2430 mc |
| Zonă climatică | III (Te_calcul = −18 °C) |
| Temperatură interioară de calcul | +22 °C (spații ocupate de vârstnici) |
| Grade-zile de încălzire (DD, baza 20 °C) | ~3000 K·zile |
| Regim de funcționare | 12 h/zi, program de zi |
| Sursa de căldură | centrală termică proprie (cazan condensare) |

### PTh-I.11.2 — Consum de energie pentru încălzire

Necesarul anual de căldură pentru încălzire (aproximare pe grade-zile + pierderi ventilare):

Q_înc = [(H_T + H_V) × DD × 24] / 1000 [kWh/an]

- Coeficient pierderi prin transmisie H_T ≈ 320 W/K (anvelopă conform C107, U mediu ~0,4 W/mp·K, A_anvelopă ~800 mp).
- Coeficient pierderi prin ventilare H_V ≈ 0,34 × n × V = 0,34 × 0,5 × 2430 = 413 W/K.

Q_brut = [(320 + 413) × 3000 × 24] / 1000 = 733 × 72 = 52 776 kWh/an.
Aporturi (solare + interne) reduc cu ~25%: Q_util ≈ 52 776 × 0,75 = **39 582 kWh/an**.
Cu randament sistem (cazan condensare η=0,96, distribuție 0,95, reglaj 0,97):
Q_final,înc = 39 582 / (0,96 × 0,95 × 0,97) = 39 582 / 0,884 = **44 776 kWh/an**.

### PTh-I.11.3 — Consum pentru apă caldă de consum (ACM)

Necesar ACM: ~80 persoane × 10 l/zi·pers la ΔT=50 °C, 300 zile/an.
Q_acm = (V × ρ × c × ΔT × zile) / 3600
= (0,80 mc/zi × 1000 × 4,186 × 50 × 300) / 3600
= (800 × 4,186 × 50 × 300) / 3600 kJ→ = 50 232 000 / 3600 = 13 953 kWh/an util.
Cu randament preparare+distribuție+recirculare (0,85):
Q_final,acm = 13 953 / 0,85 = **16 415 kWh/an**.

### PTh-I.11.4 — Consum pentru ventilare (energie electrică ventilatoare)

Putere ventilatoare CTA (introducere+evacuare) ≈ 1,5 kW; funcționare 12 h × 300 zile = 3600 h/an.
Q_vent = 1,5 × 3600 = **5400 kWh/an** (energie electrică).

### PTh-I.11.5 — Consum pentru iluminat

LPD = 4,82 W/mp × 810 mp = 3,9 kW instalat; factor utilizare/prezență 0,6; 12 h × 300 zile = 3600 h.
Q_ilum = 3,9 × 0,6 × 3600 = **8424 kWh/an**.

### PTh-I.11.6 — Consum forță/echipamente auxiliare

Pompe circulație, automatizare, prize echipamente (estimat): P ~2,0 kW, factor 0,4, 3600 h.
Q_forță = 2,0 × 0,4 × 3600 = **2880 kWh/an**.

### PTh-I.11.7 — Bilanț energetic sintetic

| Utilizare | Purtător | Consum [kWh/an] | Consum specific [kWh/mp·an] |
|---|---|---|---|
| Încălzire | gaz (cazan condensare) | 44 776 | 55,3 |
| Apă caldă de consum | gaz | 16 415 | 20,3 |
| Ventilare | electric | 5 400 | 6,7 |
| Iluminat | electric | 8 424 | 10,4 |
| Forță/auxiliare | electric | 2 880 | 3,6 |
| **Total energie finală** | — | **77 895** | **96,2** |

### PTh-I.11.8 — Aport din surse regenerabile

Sistem propus: panouri fotovoltaice 10 kWp pe acoperiș (orientare sud, 15°), producție specifică zona III ~1150 kWh/kWp·an.
E_FV = 10 × 1150 = 11 500 kWh/an → acoperă ~72% din consumul electric (16 704 kWh/an) și ~15% din energia finală totală.

Opțional: 6 mp panouri solar-termice pentru preîncălzire ACM → aport ~2500 kWh/an termic (reduce consumul de gaz ACM cu ~15%).

Cota de energie din surse regenerabile:
%RES = (11 500 + 2 500) / (77 895) ≈ **18%** din energia finală, respectând cerința de nivel minim RES pentru clădiri noi (nZEB — se completează cu îmbunătățirea anvelopei pentru atingerea pragului nZEB integral).

### PTh-I.11.9 — Energie primară și clasa energetică

Factori de conversie energie primară: gaz 1,1; electric 2,6 (mediu rețea RO).

| Purtător | Energie finală [kWh/an] | Factor | Energie primară [kWh/an] |
|---|---|---|---|
| Gaz (înc + ACM) | 61 191 | 1,1 | 67 310 |
| Electric (vent+ilum+forță) | 16 704 | 2,6 | 43 430 |
| minus FV consumat local | −11 500 | 2,6 | −29 900 |
| **Total energie primară** | — | — | **80 840** |

Consum specific energie primară: 80 840 / 810 = **99,8 kWh/mp·an**.

Încadrare clasă energetică (grila Mc001 pentru clădiri de sănătate/asimilate, consum total):
- Consum specific energie finală ≈ 96 kWh/mp·an și energie primară ~100 kWh/mp·an → **clasa energetică B** (spre pragul A prin creșterea aportului FV și izolării).

Notă: atingerea clasei A / nZEB integral se realizează prin: creșterea grosimii termoizolației (U perete ≤ 0,28), tâmplărie triplu vitraj (U_w ≤ 1,0), recuperare de căldură pe ventilare (η ≥ 75%) și extinderea FV la 15 kWp.

---

## PTh-I.12 — Calcul instalație de ventilare mecanică (I5-2010)

### PTh-I.12.1 — Debite de aer proaspăt pe încăpere

Criteriu adoptat (I5): 20–30 mc/h·persoană pentru spații ocupate; pentru grupuri sanitare debit de evacuare pe obiect; pentru bucătărie schimburi orare + hotă.

| Încăpere | Persoane | Debit/pers [mc/h] | Q aer proaspăt [mc/h] | Volum [mc] | n [1/h] |
|---|---|---|---|---|---|
| Sală de zi 1 | 15 | 25 | 375 | 180 | 2,1 |
| Sală de zi 2 | 12 | 25 | 300 | 144 | 2,1 |
| Sală de mese | 20 | 30 | 600 | 165 | 3,6 |
| Cabinet medical | 3 | 30 | 90 | 60 | 1,5 |
| Recepție | 3 | 20 | 60 | 54 | 1,1 |
| Sală kineto E03 | 10 | 30 | 300 | 150 | 2,0 |
| Săli odihnă E01+E02 | 12 | 25 | 300 | 240 | 1,3 |
| Sală multifuncțională | 20 | 25 | 500 | 135 | 3,7 |
| Birouri E04+E05 | 4 | 25 | 100 | 114 | 0,9 |
| **Subtotal introducere** | — | — | **2725** | — | — |

### PTh-I.12.2 — Debite de evacuare (extracție)

| Încăpere | Criteriu | Q evacuare [mc/h] |
|---|---|---|
| Grup sanitar F parter (2 WC, 2 lav) | 50 mc/h·WC + 25/lav | 150 |
| Grup sanitar B parter | idem | 150 |
| GS persoane cu dizabilități | 1 WC | 50 |
| GS F etaj | 150 |
| GS B etaj | 150 |
| Bucătărie/oficiu | hotă + 15 schimburi | 800 |
| Centrala termică | ventilare naturală (nu se cuantifică la CTA) | — |
| Depozit/vestiar | 4 sch/h | 100 |
| **Subtotal evacuare (fără hotă bucătărie separată)** | — | ~900 |

Notă: bucătăria are extracție proprie prin hotă (800 mc/h) evacuată direct la exterior, independentă de CTA generală; se compensează cu aer din sala de mese.

### PTh-I.12.3 — Bilanț aeraulic general

| Flux | Debit [mc/h] |
|---|---|
| Introducere aer proaspăt (CTA) | 2725 |
| Evacuare săli sanitare + tehnice (CTA extracție) | 900 |
| Evacuare hotă bucătărie (independentă) | 800 |
| Transfer prin uși/grile (compensare) | echilibrat |

Se adoptă o CTA cu debit nominal 2800 mc/h introducere / 2800 mc/h extracție, cu recuperator de căldură cu plăci (η ≥ 75%), pentru echilibru și recuperare. Ușoara suprapresiune în spațiile ocupate + depresiune în grupuri sanitare și bucătărie (extracție > introducere local). Bilanțul global: introducere 2800 ≈ extracție (900 CTA + transfer 1900 către zonele cu extracție + hotă compensată din mese).

### PTh-I.12.4 — Dimensionare tubulatură pe tronsoane

Criteriu viteză: canale principale 4–5 m/s, secundare 3–4 m/s, guri 2–2,5 m/s. Secțiune A = Q / (3600 × v).

| Tronson | Q [mc/h] | v adoptat [m/s] | A necesar [mp] | Dimensiune canal | v real [m/s] |
|---|---|---|---|---|---|
| T1 (magistrală CTA→parter) | 2800 | 5,0 | 0,156 | 500×350 mm (0,175 mp) | 4,4 |
| T2 (ramură parter săli) | 1400 | 4,5 | 0,086 | 400×250 (0,10 mp) | 3,9 |
| T3 (ramură etaj) | 1400 | 4,5 | 0,086 | 400×250 | 3,9 |
| T4 (derivație sală de zi) | 375 | 3,5 | 0,030 | Ø200 (0,031 mp) | 3,3 |
| T5 (derivație sală mese) | 600 | 3,5 | 0,048 | Ø250 (0,049 mp) | 3,4 |
| T6 (evacuare GS-uri) | 450 | 4,0 | 0,031 | Ø200 | 4,0 |
| T7 (hotă bucătărie) | 800 | 5,0 | 0,044 | Ø250 (0,049 mp) | 4,5 |
| Gură introducere tip (anemostat) | 150 | 2,2 | 0,019 | 300×300 grilă | 2,0 |

Verificare pierderi de sarcină magistrală (metoda lungimii echivalente): pierdere liniară ~1 Pa/m × ~40 m + rezistențe locale (coturi, ramificații, filtre, recuperator, baterie) ~250 Pa → presiune totală disponibilă necesară ventilator ≈ **450–500 Pa**. CTA aleasă cu ventilatoare EC 2800 mc/h la 550 Pa. ✓

### PTh-I.12.5 — Verificare schimburi de aer minime

Toate spațiile ocupate ≥ 1 sch/h (cerință minimă igienică); grupuri sanitare ≥ 5–10 sch/h (asigurat prin extracție dedicată); bucătărie ≥ 15 sch/h prin hotă. ✓

---

## PTh-I.13 — Calcul instalație de canalizare

### PTh-I.13.1 — Canalizare menajeră — debite de calcul (SR EN 12056 / I9)

Debitul de calcul se determină din suma unităților de scurgere (DU) pe obiect:

Q_ww = K × √(Σ DU) [l/s], unde K = 0,5 (utilizare intermitentă, clădire tip locuință/asimilat).

Unități de scurgere (DU) pe obiect (SR EN 12056-2):
- Lavoar: 0,5; WC cu rezervor 6 l: 2,0; Duș: 0,6; Chiuvetă bucătărie: 0,8; Spălător profesional: 1,5; Sifon pardoseală: 0,8.

| Zonă | Obiecte | Σ DU |
|---|---|---|
| GS F parter | 2 WC(4,0) + 2 lav(1,0) | 5,0 |
| GS B parter | 2 WC(4,0) + 2 lav(1,0) | 5,0 |
| GS dizabilități | 1 WC(2,0) + 1 lav(0,5) | 2,5 |
| Bucătărie | chiuvetă(0,8)+spălător(1,5)+SP(0,8) | 3,1 |
| Cabinet medical | 1 lav(0,5) | 0,5 |
| GS F+B etaj | 4 WC(8,0)+4 lav(2,0) | 10,0 |
| **Total Σ DU clădire** | — | **26,1** |

Q_ww total = 0,5 × √26,1 = 0,5 × 5,11 = **2,55 l/s**.
La acest debit continuu se adaugă cel mai mare debit continuu Qc (nu e cazul) și debitul de pompare (nu e cazul) → Q_tot ≈ 2,55 l/s.

### PTh-I.13.2 — Dimensionare coloane și colectoare menajere

| Element | Q [l/s] | Diametru adoptat | Umplere/pantă | Verificare |
|---|---|---|---|---|
| Coloană GS (2 WC) | ~2,0 | DN110 (PP) | — | Q_max DN110 vertical ~4 l/s ✓ |
| Colector orizontal secundar | ~2,0 | DN110, i=2% | h/D ≤ 0,5 | ✓ |
| Colector principal ieșire | 2,55 | DN125, i=1,5% | h/D ≤ 0,5 | Q_cap DN125 la 1,5% ~7 l/s ✓ |
| Racord obiect WC | 2,0 | DN110 | — | ✓ |
| Racord lavoar/duș | 0,5–0,6 | DN50 | — | ✓ |
| Racord chiuvetă bucătărie | 0,8 | DN50 | — | ✓ |
| Ventilare coloane (aerisire) | — | DN75/DN110 la terasă | — | ✓ |

Panta minimă colectoare orizontale: 1,5–2% (autocurățire, viteză 0,7–2,5 m/s). Fiecare coloană se prelungește peste acoperiș ca ventilare primară (căciulă). Se prevăd piese de curățire la bază și schimbări de direcție.

### PTh-I.13.3 — Separator de grăsimi (bucătărie)

Bucătăria cu preparare alimente descarcă prin separator de grăsimi înainte de racordul la canalizare (obligatoriu — norma de protecție a rețelei).

Dimensionare separator (SR EN 1825): NS = Q_s × f_t × f_r × f_d
- Q_s = debit ape uzate bucătărie ≈ 1,5 l/s
- f_t (temperatură > 60 °C) = 1,3; f_r (densitate grăsimi) = 1,0; f_d (detergenți) = 1,3
- NS = 1,5 × 1,3 × 1,0 × 1,3 = 2,54 → se adoptă separator **NS 4** (cu nămolar integrat, volum ~ conform NS).

### PTh-I.13.4 — Canalizare pluvială — debite de ploaie (I9 / SR EN 12056-3)

Debitul de ploaie: Q_p = i × A × C / 10000 [l/s]
- i = intensitatea ploii de calcul = 300 l/s·ha (echiv. 0,03 l/s·mp) — durata 5 min, frecvență 1/an, zonă III RO.
- A = aria receptoare (proiecție orizontală acoperiș) = 500 mp.
- C = coeficient de scurgere acoperiș = 1,0.

Q_p = 0,03 × 500 × 1,0 = **15 l/s** (debit total acoperiș).

### PTh-I.13.5 — Dimensionare receptoare și coloane pluviale

Nr. receptoare (guri de scurgere terasă): capacitate uzuală receptor Ø110 ≈ 4–6 l/s.
N_rec = 15 / 5 = 3 → se adoptă **4 receptoare** (redundanță + repartizare uniformă pe terasă, max ~150 mp/receptor).

| Element pluvial | Q [l/s] | Diametru | Verificare |
|---|---|---|---|
| Receptor terasă (x4) | ~3,75 fiecare | Ø110 sifon terasă | ✓ (< 5 l/s) |
| Coloană pluvială (x4) | ~3,75 | DN110 | Q_cap DN110 vertical ~8 l/s ✓ |
| Colector pluvial orizontal | 15 | DN160, i=1% | Q_cap DN160 la 1% ~18 l/s ✓ |
| Preaplin terasă (siguranță) | — | fante/guri suplim. | obligatoriu (backup înfundare) |

Se prevede sistem separat pluvial de menajer (rețea divizoare) până la limita de proprietate; racordul final la canalizarea publică conform avizului operatorului (unitar/divizor). Preaplinuri de siguranță pe atic pentru scenariul de înfundare a receptoarelor.

---

## PTh-I.14 — Fișe tehnice echipamente (completare)

### PTh-I.14.1 — Pompă de circulație încălzire

| Caracteristică | Valoare / cerință |
|---|---|
| Tip | rotor umed, electronică, cu turație variabilă (ΔP-v) |
| Debit nominal | 3,5 mc/h |
| Înălțime de pompare | 5,5 mCA |
| Putere absorbită | 45–70 W (modulant) |
| Clasa eficiență | EEI ≤ 0,20 |
| Tensiune | 230 V / 50 Hz |
| Temperatură fluid | −10…+95 °C |
| Racord | flanșă/filet DN25–32 |
| Montaj | pe tur/retur, cu ventile de izolare + clapetă |

### PTh-I.14.2 — Pompă recirculare ACM

| Caracteristică | Valoare |
|---|---|
| Debit | 0,8 mc/h |
| Înălțime | 2,0 mCA |
| Putere | 15–25 W |
| Corp | bronz/inox (apă potabilă) |
| Comandă | temporizator + termostat (recirculare programată) |

### PTh-I.14.3 — Grup de pompare incendiu (fișă)

| Caracteristică | Valoare |
|---|---|
| Configurație | 1 activă + 1 rezervă + 1 pilot (jockey) |
| Debit pompă principală | ≥ 4,5 l/s (16,2 mc/h) |
| Înălțime de pompare | 41 mCA |
| Putere motor pompă | ~4 kW |
| Pompă pilot | 0,5 l/s, menținere presiune |
| Vas de presiune | 24–50 l |
| Pornire | automat pe cădere presiune, oprire manuală |
| Alimentare | circuit prioritar din TG, semnalizare la centrala IDSAI |
| Standard | conform SR EN 12845 / P118-2 |

### PTh-I.14.4 — Vas de expansiune închis (încălzire)

Dimensionare: V_vas = (V_instal × Δv × factor) / (1 − P_min/P_max)
- V_instalație ~350 l apă; coeficient dilatare Δv la ΔT (10→80 °C) ≈ 0,029.
- V_util = 350 × 0,029 = 10,15 l.
- Presiune iniț. P_min = 1,0 bar abs → 2,0 bar abs; P_max = 3,0 bar abs (înainte de supapă 3 bar).
- Factor presiune = (P_max − P_min)/P_max = (3,0 − 2,0)/3,0 = 0,33.
- V_vas = 10,15 / 0,33 = 30,8 l → se adoptă **vas 35 l**, presiune preîncărcare 1,0 bar.

| Caracteristică | Valoare |
|---|---|
| Volum | 35 l |
| Presiune preîncărcare | 1,0 bar |
| Presiune max. lucru | 3 bar |
| Membrană | EPDM (apă încălzire) |
| Racord | 3/4" |

### PTh-I.14.5 — Vas de expansiune ACM

| Caracteristică | Valoare |
|---|---|
| Volum | 12 l |
| Membrană | pentru apă potabilă (butil/aliment.) |
| Presiune preîncărcare | egal cu presiunea rețelei (~2,5 bar) |
| Amplasare | pe circuitul de rece la boiler |

### PTh-I.14.6 — Separator de grăsimi (fișă)

| Caracteristică | Valoare |
|---|---|
| Clasă / mărime nominală | NS 4 (SR EN 1825) |
| Material | polietilenă / beton, etanș |
| Nămolar integrat | da |
| Capac | carosabil/necarosabil funcție de amplasare |
| Debit max. | ~4 l/s |
| Golire/vidanjare | periodic, cu contract |

### PTh-I.14.7 — Tablou electric secundar (tip)

| Caracteristică | Valoare |
|---|---|
| Grad protecție | IP40 (interior) / IP54 (spații tehnice) |
| Aparataj | întrerupător general + diferențiale 30 mA + MCB pe circuite |
| Protecție supratensiuni | descărcător T2 (parter, la TG) |
| Rezervă spații | ≥ 20% module libere |
| Circuite tip | iluminat (10A), prize (16A), forță dedicată |
| Selectivitate | cu tabloul general |
| Etichetare | schema monofilară în ușă, marcare circuite |

### PTh-I.14.8 — Corp de iluminat interior (tip)

| Caracteristică | Panou LED birou | Corp etanș IP65 | Corp siguranță |
|---|---|---|---|
| Putere | 36 W | 40 W | 3 W |
| Flux | 4000 lm | 4400 lm | 200 lm |
| Temperatură culoare | 4000 K | 4000 K | 6000 K |
| Ra | ≥ 80 | ≥ 80 | — |
| UGR | ≤ 19 | ≤ 22 | — |
| Grad protecție | IP20/IP40 | IP65 | IP42 |
| Alimentare | 230 V | 230 V | 230 V + acumulator 3h |
| Durată viață | ≥ 50 000 h | ≥ 50 000 h | ≥ 50 000 h |

### PTh-I.14.9 — Hidrant interior echipat (fișă)

| Caracteristică | Valoare |
|---|---|
| Tip cutie | metalică, cu ușă și geam, marcată |
| Robinet | DN25 (sau DN33), cu ventil |
| Furtun | semirigid 20 m, Ø25 mm |
| Ajutaj | reglabil jet compact/pulverizat |
| Debit specific | 2,1 l/s la 2,5 bar la ajutaj |
| Amplasare | pe cale de evacuare, h manevrare 0,8–1,5 m |
| Marcare | indicator + iluminat de siguranță 5 lx |

### PTh-I.14.10 — Hidrant exterior suprateran (fișă)

| Caracteristică | Valoare |
|---|---|
| Tip | suprateran DN80, cu golire automată (antiîngheț) |
| Racorduri | 2×tip B (Ø65) sau conform aviz ISU |
| Presiune de lucru | min. 1 bar la debit 5 l/s |
| Distanță de clădire | ≥ 5 m, ≤ 150 m între hidranți |
| Marcaj | placă indicatoare hidrant |

---

## PTh-I.15 — Protecția antiseismică a instalațiilor (P100-1, componente nestructurale)

### PTh-I.15.1 — Principii și cerințe

Conform P100-1, instalațiile (componente nestructurale — CNS) trebuie astfel prinse și susținute încât să reziste la acțiunea seismică fără a se desprinde, deplasa excesiv sau afecta căile de evacuare. Categoria de importanță C, clasa III → factor de importanță CNS γ ≈ 1,0. Se verifică forța seismică orizontală pe componentă:

F_CNS = γ × (a_g / g) × β × k_z × M × g

unde a_g = accelerația de proiectare a terenului (funcție de amplasament, ex. 0,20 g), β = coeficient de amplificare dinamică a componentei (1,0–2,5), k_z = factor de înălțime (1 la parter, până la 2 la vârf), M = masa componentei.

Exemplu boiler ACM plin (M ≈ 300 kg, parter, a_g=0,20g, β=1,0, k_z=1):
F = 1,0 × 0,20 × 1,0 × 1,0 × 300 × 9,81 = 0,20 × 2943 = **589 N** forță orizontală de ancorare → dimensionare buloane de ancorare în radier.

### PTh-I.15.2 — Măsuri pe categorii de instalații

| Component / instalație | Măsură antiseismică |
|---|---|
| Cazan, boiler, vase expansiune | ancorare în placă/postament cu buloane chimice, calcul la F_CNS; postament cu prag |
| CTA / ventilatoare | prindere pe suporți antivibrație + lanțuri/cabluri de siguranță (limitare deplasare) |
| Pompe | pe socluri cu amortizori + racorduri flexibile (evită transmiterea vibrații + preia deplasări) |
| Tubulatură ventilare | bride și tije la interax redus (≤ 3 m), contravântuiri la tronsoane lungi |
| Conducte încălzire/sanitare | suporți cu posibilitate de dilatare + puncte fixe; distanțe reduse la traversări de rost |
| Coloane verticale (canalizare, apă) | bride la fiecare nivel + ghidaje; compensare la traversarea planșeelor |
| Corpuri de iluminat suspendate | prindere dublă (siguranță) — cablu suplimentar de reținere |
| Tablouri electrice | fixare pe perete/structură cu dibluri metalice; nu pe pereți despărțitori ușori nesusținuți |
| Rezervor incendiu | ancorare, racorduri flexibile la conducte |
| Traversări rost seismic | racorduri flexibile / bucle de dilatare pe toate conductele care traversează rostul |

### PTh-I.15.3 — Racorduri flexibile obligatorii

Se prevăd racorduri flexibile (compensatori, burdufuri, furtunuri armate) la:
- Racordul pompelor și al CTA (antivibrație + seismic).
- Legăturile echipamentelor grele (cazan, boiler) la rețelele rigide.
- Toate traversările de rost seismic (dacă există) și la trecerea între tronsoane cu comportare dinamică diferită.
- Racordul instalațiilor la branșamentele exterioare (unde structura clădirii se poate deplasa relativ față de teren).

### PTh-I.15.4 — Susțineri și ancorări — reguli de interax

| Element | Interax maxim susțineri | Tip prindere |
|---|---|---|
| Conducte metalice orizontale Ø ≤ 50 | 2,0 m | brățară + tijă filetată |
| Conducte metalice Ø > 50 | 3,0 m | brățară + contravântuire |
| Conducte PP/PPR (dilatare mare) | 0,8–1,2 m | brățări glisante + puncte fixe |
| Tubulatură ventilare rectangulară | 2,5–3,0 m | profil + tije + contravântuire transversală |
| Coloane verticale | 1 pe nivel + ghidaje | bridă structurală |
| Jgheaburi/paturi de cabluri | 1,5 m | consolă + tijă + reținere seismică |

### PTh-I.15.5 — Verificări la recepție (antiseismic)

- Verificarea existenței și strângerii ancorajelor echipamentelor grele (moment de strângere conform fișă).
- Verificarea prezenței racordurilor flexibile la toate echipamentele dinamice și la traversări de rost.
- Verificarea suporților la interaxele prescrise și a contravântuirilor pe tronsoane lungi.
- Verificarea prinderii duble a corpurilor de iluminat suspendate.
- Verificarea că nicio instalație nu blochează căile de evacuare la deplasări seismice.
- Consemnarea în procesul-verbal de recepție a componentelor nestructurale (CNS) conform P100.

---

## PTh-I.16 — Sinteză cantități instalații (extras pentru antemăsurătoare)

| Categorie | Element | U.M. | Cantitate |
|---|---|---|---|
| Iluminat | Panouri LED 36 W | buc | 105 |
| Iluminat | Corpuri etanșe IP65 40 W | buc | 14 |
| Iluminat siguranță | Corpuri autonome 3 W (evac/antipanică/marcaj) | buc | 41 |
| PSI | Hidranți interiori echipați | buc | 4 |
| PSI | Hidranți exteriori supraterani | buc | 2 |
| PSI | Stingătoare portabile (P6/CO2/F) | buc | 10 |
| IDSAI | Detectoare automate (fum/termic) | buc | 19 |
| IDSAI | Butoane manuale semnalizare | buc | 6 |
| IDSAI | Sirene interioare / exterioare | buc | 6 / 1 |
| Ventilare | CTA cu recuperare 2800 mc/h | buc | 1 |
| Ventilare | Tubulatură (metri liniari echiv.) | ml | ~180 |
| Canalizare | Separator grăsimi NS 4 | buc | 1 |
| Canalizare | Receptoare pluviale terasă | buc | 4 |
| Termic | Vas expansiune 35 l / 12 l | buc | 1 / 1 |
| Termic | Pompe circulație / recirculare | buc | 2 / 1 |
| PSI | Grup pompare incendiu (1A+1R+pilot) | set | 1 |

Notă: cantitățile din prezentul extras servesc corelării cu listele de cantități (antemăsurătoare) și nu se substituie acestora; valorile definitive rezultă din planurile de execuție și detaliile de montaj.

---

*Prezentul supliment PTh completează memoriile de instalații pe temele: calcul iluminat interior și de siguranță, breviar PSI (hidranți, IDSAI, desfumare, stingătoare), bilanț energetic (Legea 372/2005), calcul ventilare mecanică (I5), calcul canalizare menajeră și pluvială, fișe tehnice echipamente complementare și protecția antiseismică a instalațiilor (P100 — componente nestructurale). Toate calculele sunt de nivel de proiect tehnic (PTh) și se corelează cu planurile de execuție, schemele și detaliile de montaj din piesele desenate.*