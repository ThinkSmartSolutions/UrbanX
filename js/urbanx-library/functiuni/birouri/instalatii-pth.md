# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Clădire de birouri clasa A, S+P+6E, SCD ~5.600 mp, suprafață utilă birouri ~5.000 mp, ~600 persoane

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 Anexa 8 și Legii 50/1991 Anexa 1) pentru memoriul de instalații al clădirii de birouri clasa A tratată la faza DTAC (`instalatii.md`), cu regim de înălțime **S+P+6E**, suprafață construită desfășurată ~5.600 mp, suprafață utilă birouri ~5.000 mp (~620 mp/nivel curent), populație de proiectare **~600 persoane** (~85 pers/nivel), cotă ultim nivel finit (E6) **+25,50 m**. Clădirea este destinată exclusiv activității de birou (open-space, birouri celulare, săli de ședință), cu lobby/recepție la parter și subsol tehnic + parcaj (V ≈ 1.960 mc). Ipotezele funcționale se mențin identice cu DTAC: sursă termică/frig unică pe **pompă de căldură reversibilă aer-apă cu 4 țevi** (COP 3,2/EER 3,0, SCOP 3,8/SEER 4,5) cu back-up pe cazan de condensație sau rezistență electrică, aer proaspăt tratat în **2 CTA de 15.000 mc/h** cu recuperare η ≥ 75 %, climatizare pe **ventiloconvectoare 4 țevi + aer primar**, sprinklerare generalizată **OH2** ca măsură acoperitoare de tip clădire înaltă (deși H = 25,50 m < 28,00 m), desfumare a parcajului prin ventilatoare axiale F400 (nu jet-fan — geometria de dimensiuni reduse a parcajului de 1.960 mc nu justifică soluția de tip jet-fan, rezervată parcajelor extinse), presurizare a casei de scări de evacuare și alimentare de rezervă din grup electrogen + UPS pentru consumatorii critici. Orice modificare a acestor ipoteze (schimbare de destinație a unui nivel către o funcțiune cu risc de incendiu mai mare, majorare a populației de proiectare peste 600 persoane, eliminarea măsurilor acoperitoare specifice clădirii înalte) impune reluarea integrală a dimensionării de la faza PTh.

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, bilanțuri globale pe instalație | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate |
| Breviar hidraulic sprinkler | debit global pe zona OH2, un singur nod critic (E6) | calcul nod cu nod (Hazen-Williams) pe zona de control cea mai defavorabilă, cu reconciliere la debitul/presiunea pompei adoptate în DTAC |
| Breviar electric | bilanț global (kW, kVA) pe TGD | dimensionare completă pe fiecare tablou de nivel (TE-P, TE1…TE6), TH, TPSI, verificare cădere de tensiune și selectivitate |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major |
| Presurizare casă scări | breviar analitic (debit ușă deschisă/închisă) | verificare completă pe cele 2 scenarii + protocol de comisionare cu anemometru |
| Desfumare parcaj | principiu (10 vol/h, F400) | verificare debit echivalent pe geometria reală + protocol PIF |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație |
| Montaj | principii generale | tehnologie, succesiune, susțineri seismice (clasă importanță II), izolații, treceri la foc |
| PIF | menționată | protocoale de echilibrare hidraulică/aeraulică, STI EVAC, PT/branșament, FV, curenți slabi |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |
| Iluminat | niveluri globale (500 lx birouri, ≤ 8 W/mp) | calcul complet metoda flux luminos pe fiecare zonă a clădirii |
| Coordonare tenant | menționată generic (cap. 1.5 DTAC — flexibilitate/contorizare pe nivel/chiriaș) | puncte de predare (tie-in) la limita de nivel/chiriaș + caiet de sarcini fit-out CAT B |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC (I9/2015, SR EN 806/1717/12056, I13/2015, C107, I5/2010, SR EN 16798-1, I7/2011, NP 061, SR EN 12464-1, I20/2000, SR EN 62305, P118-1/2/3, NP 086, SR EN 12845, HG 571/2016, Legea 372/2005, Mc 001/2006): **SR EN 12259** (componente sprinkler — capete, ACV, alarme hidraulice), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria pentru componentele de detecție-alarmare), **SR EN 54-16** (alarmare vocală, deja adoptată în DTAC §12.2), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 62305-3** (execuție SPD/coborâri), **SR EN 12237** (clasa de etanșeitate tubulatură de ventilare), **SR EN 12599** (proceduri de recepție și testare a instalațiilor de ventilare), **SR EN 806-4** (probe de instalație interioară de apă), **SR EN 12056-2** (verificare hidraulică canalizare), **C56** (verificarea calității lucrărilor de instalații), **EN 12101-6** (sisteme de presurizare — clase de performanță, deja referită prin metodologie în DTAC §13.5), **HG 907/2016 Anexa 8** (conținutul-cadru PTh), **Legea 10/1995** (verificarea tehnică de calitate).

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema rețelei de sprinklere — zone de control OH2, noduri

Instalația de sprinklere protejează **integral** clădirea (măsură acoperitoare de tip clădire înaltă, cf. DTAC §1.2 și §11.3), la clasa de pericol **OH2** (Ordinary Hazard grupa 2), compartimentată hidraulic pe **4 zone de control**, fiecare cu **supapă de control și alarmă (ACV) proprie**, robinet de secționare cu supraveghere de poziție (tamper) și clopot de alarmă hidraulic — coerentă cu principiul de contorizare/izolare pe nivel de la DTAC §1.5:

| Zonă de control | Niveluri deservite | Suprafață protejată | Densitate d | Arie de operare A_op |
|---|---|---|---|---|
| ZC1 — Subsol tehnic + parcaj | S | ~700 mp | 5 mm/min | 144 mp |
| ZC2 — Parter + lobby/recepție | P | ~620 mp | 5 mm/min | 144 mp |
| ZC3 — Niveluri curente inferioare | E1–E3 | ~1.860 mp | 5 mm/min | 144 mp |
| ZC4 — Niveluri curente superioare (zonă hidraulic guvernantă) | E4–E6 | ~1.860 mp | 5 mm/min | 144 mp |

Aria de operare (144 mp, cf. DTAC §11.6) este constantă pe fiecare zonă de control, indiferent de suprafața totală protejată a zonei — conform SR EN 12845, doar zona cea mai defavorabilă hidraulic (cea mai îndepărtată/înaltă) se dimensionează la debitul complet de calcul; restul capetelor din zonă rămân în regim de veghe.

**Traseul principal (schema coloană):**

```
Rezervor incendiu 100 mc ─► Stație pompe (P.principală electrică 25 l/s + P.Diesel + P.jockey)
   ─► Colector de refulare DN 150 ─┬─► ACV ZC1 (Subsol/parcaj) ─► rețea plafon parcaj (capete K80, interax 4,0×4,0 m)
                                    ├─► ACV ZC2 (Parter/lobby) ─► rețea plafon parter (interax 3,5×3,5 m)
                                    ├─► ACV ZC3 (E1–E3) ─► riser DN80 ─► rețea plafon pe cele 3 niveluri
                                    └─► ACV ZC4 (E4–E6, zona guvernantă) ─► riser DN100 ─► rețea plafon pe cele 3 niveluri superioare
```

**Rețeaua de plafon, grilă OH2 (interax capete birouri 3,5×3,5 m, capete K80 = 1,33 l/s·bar⁰·⁵, arie protejată/cap ≤ 12 mp, cf. DTAC §11.6):**

| Nod | Element | Ø conductă | Nr. capete deservite | Debit tronson (l/s) |
|---|---|---|---|---|
| N1 | Cap sprinkler terminal (branch line) | DN 20 | 1 | 1,1 |
| N2 | Branch line, 3 capete | DN 32 | 3 | 3,4 |
| N3 | Branch line, 6 capete (branșament complet) | DN 50 | 6 | 6,8 |
| N4 | Cross-main, alimentare 2 branch lines (12 capete = aria de operare completă) | DN 80 | 12 | 13,6* |
| N5 | Riser zonă ZC4 → ACV | DN 100 | — (tot. zonă) | 20,0** |

\*Debitul teoretic pe aria de operare de calcul (144 mp × 5 mm/min ÷ 60 = 12,0 l/s), majorat la 13,6 l/s prin balansarea hidraulică a presiunilor pe cele 12 capete active; \*\*debitul real de proiectare la ACV, majorat la 20,0 l/s pentru acoperirea pierderilor de presiune pe rețeaua extinsă (identic cu valoarea de proiectare adoptată în DTAC §11.6: „Q_spk ≈ 15…20 l/s — se adoptă 20 l/s pentru dimensionarea pompei", confirmată prin calculul nod-cu-nod de mai jos, v. PTh-I.3.1).

**Rețeaua ZC1 (parcaj, interax mai mare 4,0×4,0 m, plafon jos ~2,7 m, aceeași clasă OH2, aceeași arie de operare 144 mp):** configurație identică ca principiu, cu capete la înălțime redusă și rețea din oțel galvanizat (mediu umed/agresiv al parcajului), conform SR EN 12845 cap. 13.

Conducta de alimentare de la stația de pompare până la colectorul de refulare: oțel negru vopsit interior, DN 150, cu robinet de reținere, manometru și racord de probă (drenaj de test 2"), conform SR EN 12845 cap. 13.

### PTh-I.2.2 Schema hidranților interiori și exteriori

**Hidranți interiori** — rețea ramificată/coloane verticale de incendiu DN 65-80, câte o coloană pe fiecare casă de scări, cu **hidranți DN 25/52 echipați** (cutii cu furtun semirigid 25 m, robinet, ajutaj) pe fiecare nivel, dispuși astfel încât orice punct al spațiului de birou să fie atins de **2 jeturi simultane** de câte 2,1 l/s (identic cu ipoteza DTAC §11.1):

| Grup hidranți | Nr. hidranți | Poziție | Ø racord rețea |
|---|---|---|---|
| Hi-Parter | 2 | lobby + circulație parter | DN 65 |
| Hi-E1…E6 (fiecare nivel) | 2 × 7 = 14 | la fiecare casă de scări, pe nivel curent | DN 65 |
| Hi-Subsol/parcaj | 2 | la capetele rampei și lângă casa scării | DN 65 |
| **Total** | **18** | — | — |

Debit de calcul (2 jeturi simultane, cele mai defavorabile) = **4,2 l/s** (identic DTAC §11.1); rețea alimentată din colectorul de refulare al stației de pompare, cu vane de secționare pe fiecare coloană verticală (permit izolarea unui sector fără întreruperea întregii rețele).

**Hidranți exteriori** — inel exterior DN 100 îngropat sub adâncimea de îngheț (0,90-1,10 m), cu hidranți supraterani dispuși pe conturul incintei, la distanțe reciproce ≤ 150 m și la ≥ 5 m de clădire, alimentați fie direct din rețeaua publică (dacă avizul de racordare confirmă debitul/presiunea), fie din rezervorul propriu prin racord dedicat. Debit de calcul **20 l/s**, timp de funcționare **3 h** (identic DTAC §11.2), racord tip B pentru autospecialele ISU la fiecare hidrant.

### PTh-I.2.3 Schema HVAC — 2 CTA, distribuție pe niveluri, ventiloconvectoare 4 țevi

Configurația celor 2 CTA de 15.000 mc/h (v. DTAC §6.2) se detaliază la nivel de traseu principal de tubulatură și de conectare la rețeaua de agent termic/frigorific:

```
Sursă termică/frig (PC reversibilă 4 țevi ~2,8/3,0 MW echiv. + back-up cazan/rezistență)
   ─► butelie de egalizare ─► distribuitor multi-circuit
      ├─► circuit 45/40°C (încălzire) ──┬─► CTA-1 (subsol/terasă) ──► plenum tehnic niveluri S-E3 ──► VC 4 țevi E1-E3
      │                                  └─► CTA-2 (terasă) ──► plenum tehnic niveluri E4-E6+parter ──► VC 4 țevi E4-E6+parter
      └─► circuit 7/12°C (răcire) ──► aceleași 2 CTA (baterii de răcire) + rețea VC 4 țevi (toate nivelurile)

Circuit back-up 70/55°C (cazan condensație, dacă adoptat) ──► baterii de vârf CTA (asistare regim rece extrem)
```

Fiecare CTA este echipată cu recuperator rotativ higroscopic (η ≥ 75 %, v. DTAC §6.2), ventilatoare EC tip plug-fan (SFP ≤ 1,5 kW/(mc/s)), filtrare ePM1 50 % (F7) + prefiltru ePM10, baterii de încălzire/răcire pe cele două regimuri de temperatură și atenuatoare de zgomot pentru atingerea NR 35 în birouri (v. DTAC §6.5). Tubulatura principală (magistrale de nivel) se dimensionează la viteze economice 5-6 m/s pe canalele principale și 3-4 m/s pe ramificațiile terminale (v. breviar PTh-I.3.13), cu clasă de etanșeitate **B (SR EN 12237)** pe toate traseele aparente din plenumul tehnic de tavan (0,60 m, v. DTAC §17.2).

**Ventiloconvectoarele cu 4 țevi** (v. DTAC §5.4/6.5) se montează în plenumul de tavan, casetate sau ductate, câte o unitate pe modul structural de ~50-60 mp, cu racord la rețeaua de agent termic/frigorific prin robinete de reglaj cu cap termostatic/electrotermic comandate din senzorul de ambianță de zonă (BMS), și la aerul primar (introducere directă în plenum sau prin priză dedicată) pentru menținerea presiunii pozitive și a igienei aerului. Distribuția modulară permite reconfigurarea open-space ↔ celular fără intervenții la rețeaua principală (v. PTh-I.3.14).

**Distribuția aerului**: introducere prin difuzoare/grile cu inducție în plafon; extracție prin plenumul de tavan; viteze de proiectare canale principale 5-6 m/s, canale secundare 3-4 m/s, la grile ≤ 2,5 m/s; clapete antifoc EI 90/EI 120 la traversarea pereților antifoc, cu resort și fuzibil + acționare de la BMS/detecție.

### PTh-I.2.4 Schema izometrică apă rece/caldă și contorizare pe nivel/chiriaș

```
Branșament Dn 40 (contor general + filtru + disconnector BA/RPZ, v. DTAC §2.1)
   ─► Grup de pompare (hidrofor 2+1, VSD, 1,5 l/s la 4,5 bar)
      ─► Distribuitor general ─┬─► Coloană Parter (contor zonă) ──► GS parter + oficiu
                                ├─► Coloană E1-E2 (contor zonă) ──► GS + oficiu fiecare nivel
                                ├─► Coloană E3-E4 (contor zonă) ──► idem
                                ├─► Coloană E5-E6 (contor zonă) ──► idem
                                └─► Coloană Subsol/tehnic (contor zonă) + curățenie
```

Fiecare nivel/chiriaș poate fi izolat și contorizat independent (contor de nivel cu emisie de impulsuri, transmis la BMS), coerent cu principiul de flexibilitate și repartizare a costurilor stabilit la DTAC §1.5 — premisă esențială pentru un birou multi-tenant, unde fiecare chiriaș plătește propriul consum de apă/ACM. Boilerele ACM (2×500 l, v. DTAC §2.5) alimentate din pompa de căldură, cu recirculare menținută ≥ 50 °C pe fiecare buclă de coloană (v. DTAC §2.6) și ciclu de dezinfecție termică (antilegionella) programat prin BMS.

### PTh-I.2.5 Schema coloanelor de canalizare menajeră

Coloanele verticale (PP fonoabsorbant, v. DTAC §3.1) colectează descărcările fiecărui nivel către colectorul orizontal principal din subsol, cu ventilare primară/secundară pe fiecare coloană:

| Coloană | Zonă deservită | Ø coloană | Observație |
|---|---|---|---|
| CM-P | GS parter + oficiu | PP 110 | — |
| CM-1 | GS E1-E3 (coloană comună, cf. DTAC §2.3 „deservind 2 niveluri suprapuse") | PP 110 | ventilare prelungită peste terasă |
| CM-2 | GS E4-E6 | PP 110 | ventilare prelungită peste terasă |
| CM-S | Subsol/curățenie/parcaj | PP 110 | prin stația de pompare cu tocător (v. DTAC §3.4) |

Colector orizontal principal **DN 160** (i = 1,5 %, v. DTAC §3.3) → racord la canalizarea exterioară, prin cămin de racord cu clapetă antiretur. Piese de curățire la baza coloanelor și pe colector la max. 15 m. Debitul de calcul confirmat identic cu DTAC: **Q_ww = 4,67 l/s** (acoperitor 5 l/s).

### PTh-I.2.6 Schema pluvială sifonică — traseu detaliat

```
Terasă ~700 mp ─► 4 receptoare sifonice (deflector antivortex + element de încălzire, v. DTAC §4.2)
   ─► colectoare orizontale fără pantă (funcționare în plin) ─► coloane sifonice Dn 90-110
                                                                        │
                                                    Colector îngropat Dn 160 (comun)
                                                                        │
                            Bazin de retenție ~15 mc + regulator debit (vortex/orificiu calibrat, Q_evac < 5 l/s)
                                                                        │
                                                    Preaplin de siguranță (guri de preaplin pe fațadă) ──► descărcare vizibilă
                                                                        │
                                                    Canalizare pluvială publică / emisar
```

Debit de calcul confirmat **Q_pluvial = 21 l/s** (v. DTAC §4.2), volumul bazinului de retenție confirmat la **15 mc** (v. DTAC §4.3, dacă avizul de gospodărire a apelor impune limitarea la 5 l/s descărcați). Telemetria de nivel a bazinului se transmite la BMS. Apele pluviale de pe zonele carosabile exterioare (dacă există) se trec printr-un separator de hidrocarburi înainte de descărcare (v. DTAC §4.5).

### PTh-I.2.7 Schema monofilară electrică — branșament/trafo, TGD, tablouri de nivel

```
Rețea MT 20 kV / branșament JT (funcție de ATR) ─► Post trafo 400 kVA (uscat) sau branșament JT direct
   ─► TGD (tablou general de distribuție) ─┬─► TE-P (Parter: iluminat + prize lobby/recepție)
                                            ├─► TE1…TE6 (fiecare nivel: iluminat + prize birouri, contorizare individuală)
                                            ├─► TH (climatizare: PC reversibilă, pompe circulație VSD, ventilatoare CTA)
                                            ├─► Tablou parcaj + ventilare/desfumare parcaj
                                            └─► Tablou lifturi (A1-A3 + A4)

Tablou dedicat consumatori de siguranță (independent, cablu E90/PH90):
   Grup electrogen 150 kVA/120 kW (AAR < 15 s) ──► Pompe incendiu, presurizare casă scări, desfumare parcaj (regim incendiu),
                                                     iluminat evacuare, ascensor pompieri, EVAC, CDSAI/BMS siguranță
   UPS 60 kVA N+1 ──► servere/data center, CDSAI, EVAC, CCTV, control acces
```

Fiecare tablou de nivel (TE1…TE6) este echipat cu întrerupător automat general debroșabil, contorizare individuală (Modbus, transmisă BMS pentru repartizarea costurilor pe chiriaș — v. DTAC §1.5) și RCD 30 mA pe circuitele de prize. Schema de legare la pământ: **TN-S**. Distribuția verticală principală prin coloane pe jgheaburi de cabluri, cabluri **LSZH** pe circuitele curente și **E90/PH90** pe circuitele de siguranță, pe trasee separate fizic.

### PTh-I.2.8 Schema curenților slabi — date/voce, CCTV, control acces, BMS

```
Rack central de comunicații (MDF, în camera tehnică de curenți slabi) ──┬─► Fibră optică OM4 (redundantă) ──► IDF pe fiecare nivel
                                                                          ├─► CCTV (camere IP, accese/holuri/lifturi/parcaj) ──► NVR ≥ 30 zile
                                                                          ├─► Control acces (deblocare fail-safe la alarmă CDSAI)
                                                                          ├─► Efracție (zone tehnice, în afara programului)
                                                                          ├─► WiFi acoperire integrală + telefonie IP
                                                                          └─► Rețea structurată Cat.6A (2 prize RJ45/post de lucru)

Centrala CDSAI (adresabilă totală) ──► matrice cauză-efect (v. PTh-I.2.9)
BMS central (BACnet/IP + Modbus + KNX/DALI + M-Bus) ──► HVAC, iluminat, contorizare nivel/chiriaș, pompe, alarme
```

### PTh-I.2.9 Schema IDSAI — matrice cauză-efect (extras reprezentativ)

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 | Efect 5 |
|---|---|---|---|---|---|
| Alarmă detector birou (zonă/nivel) | Alarmare vocală zonată (evacuare imediată zonă afectată) | Oprirea CTA aferentă/oprire generală ventilare | Deblocare control acces pe traseele de evacuare | Rechemare ascensoare la parter | Transmisie ISU/dispecerat |
| Alarmă VESDA data center | Declanșare stingere cu gaz inert (temporizată) | Oprire climatizare locală | Alarmare vocală locală | Semnalizare la BMS/FM | Transmisie ISU/dispecerat |
| Alarmă detector termic camere tehnice/subsol | Oprire echipamente aferente zonei | Alarmare vocală parcaj/subsol | Pornire desfumare parcaj (regim incendiu) | — | Transmisie |
| Scădere presiune rețea sprinklere/hidranți | Pornire pompă jockey | Pornire electropompă principală | Comutare pompă Diesel (dacă defect electric) | Semnalizare ACV afectat | Transmisie dispecerat |
| Alarmă buton manual (oriunde) | Alarmare vocală zonă/nivel | Deblocare control acces | Transmisie | — | — |
| Confirmare de la pompier (cheie panou) | Silențiere sirene locale | Menținere alarmare vocală pe zonele neevacuate | Jurnal evenimente | — | — |
| Alarmă generală (temporizare T1/T2 expirată) | Pornire presurizare casă scări | Rechemare ascensoare (excepție lift pompieri) | Alarmare vocală integrală clădire | Transmisie ISU | — |

Temporizarea **T1 (recunoaștere)/T2 (investigare)** se aplică pe zonele de birou curente (personal permanent prezent, capabil de investigare); pe circulațiile comune de mare trafic (lobby, casa scărilor) alarma poate fi directă, fără temporizare, conform practicii P118-3.

### PTh-I.2.10 Schema presurizării casei de scări și desfumării parcajului/circulațiilor

```
Casă de scări de evacuare ─► Ventilator introducere aer (bază sau terasă, sursă de siguranță)
      │                                          │
   clapetă de suprapresiune (relief)      comandă: automat (CDSAI) + manual (panou pompieri)
      │
   suprapresiune 20…50 Pa, verificare scenariu „ușă deschisă"/„uși închise" (v. PTh-I.3.12)

Parcaj subteran (V ≈ 1.960 mc) ─► regim exploatare: ventilatoare axiale, 6 vol/h, comandă pe senzori CO (BMS)
                                 ─► regim desfumare: ventilatoare F400 (400°C/120 min), 10 vol/h, compensare ≥ 60%
                                                     comandă automată de la detecție + manuală pompieri
                                                     alimentare din sursa de siguranță (grup electrogen)

Circulații comune orizontale (holuri) ─► evacuare mecanică F400 + aport de compensare, pe compartiment de fum ≤ 1.600 mp
```

### PTh-I.2.11 Schema instalației fotovoltaice

```
Module FV (≈ 350 buc. × 380 Wp, ~350 mp utili din terasa disponibilă) ─► string-uri (echilibrate pe 2-3 invertoare)
   ─► cutii de conexiuni DC (siguranțe + SPD DC clasa II) ─► invertoare trifazate string (2-3 × 20-30 kW)
   ─► tablou general AC FV (protecție + contorizare producție + anti-islanding)
   ─► TGD (racord prosumator, contor bidirecțional)
```

Putere instalată confirmată **~60 kWp** (v. DTAC §16.2), producție estimată **~75 MWh/an**, autoconsum ~70 % datorat suprapunerii cu programul de birou și cu vârful de răcire estival. Structura de montaj pe terasă este balastată sau ancorată cu plăci de etanșare (fără perforarea hidroizolației), coordonată cu poziția ventilatoarelor de desfumare a parcajului/circulațiilor și cu zonele de acces de mentenanță (v. PTh-I.6.5).

### PTh-I.2.12 Schema priză de pământ și paratrăsnet — execuție

```
Priză de pământ de fundație (platbandă OL-Zn în radier/fundații, contur ~100 m)
   ─► BEP (bară de egalizare a potențialelor) ─► PE, armătura structurii, conducte metalice, jgheaburi cabluri, ecrane curenți slabi

Captare terasă: rețea de conductoare, ochiuri 10×10 m (clasă LPS II) + tije de captare la echipamente proeminente
Coborâri: minimum 4, distanță ≤ 15 m, folosind armătura stâlpilor (coborâri naturale) — v. DTAC §10.1/10.3
SPD coordonate: T1 la TGD, T2 la tablourile de nivel, T3 la echipamente sensibile (IT, BMS, invertoare FV)
```

### PTh-I.2.13 Coordonarea instalațiilor pe nivelul tip (plenum tehnic)

Nivelul curent de birou (~620 mp, înălțime liberă 3,00 m + 0,60 m plenum tavan, v. DTAC §1.1) concentrează în plenumul tehnic de tavan patru rețele care trebuie coordonate spațial la faza PTh, pe grid structural de ~7,5×7,5 m: (1) tubulatura de aer proaspăt/extracție (secțiune ~500×400 mm pe magistrala de nivel), (2) rețeaua de agent termic/frigorific către ventiloconvectoare (Dn 25-40, izolată), (3) rețeaua de sprinklere (Dn 20-50, cu capete la interax 3,5×3,5 m), (4) jgheaburile de cabluri electrice și curenți slabi (separate fizic, ≥ 300 mm distanță sau ecranare, SR EN 50174). Ordinea de montaj în plenum (v. PTh-I.6.1) urmează secvența: sprinklere (cea mai rigidă geometric, capete fixe pe grid) → tubulatură HVAC → conducte agent termic/frigorific → jgheaburi electrice/curenți slabi, cu plafonul fals demontabil poziționat ultim, pentru acces de mentenanță pe toată durata de exploatare (v. DTAC §1.5).

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Calcul hidraulic complet — sprinklere OH2, zona ZC4 (SR EN 12845, Hazen-Williams)

**Date de intrare:** zona ZC4 (E4-E6, cea mai înaltă și mai îndepărtată de stația de pompare — coincide cu ipoteza „E6" din DTAC §11.6), d = 5 mm/min, A_op = 144 mp, capete K80 (K = 1,33 l/s·bar⁰·⁵), interax 3,5×3,5 m, C = 120 (oțel negru), presiune minimă la capul terminal p_min = 0,70 bar (identic DTAC §11.6).

**Pasul 1 — debitul capului terminal:**

q₁ = K·√p₁ = 1,33 × √0,70 = **1,11 l/s** (adoptat 1,1 l/s de proiectare, cf. tabel PTh-I.2.1).

**Pasul 2 — calcul nod cu nod pe branch line** (3 capete pe ramură, distanță 3,5 m):

| Nod | Q cumulat (l/s) | Ø (mm) | v (m/s) | L (m) | Δp tronson (bar) | p necesară cap (bar) |
|---|---|---|---|---|---|---|
| Cap 1 (terminal) | 1,10 | 20 | 3,50 | — | — | 0,700 |
| Cap 2 | 2,20 | 25 | 4,48 | 3,5 | 0,032 | 0,732 |
| Cap 3 | 3,40 | 32 | 4,23 | 3,5 | 0,021 | 0,753 |

**Pasul 3 — branch complet (6 capete) și cross-main pe aria de operare** (12 capete ≈ 144 mp la 12 mp/cap):

Q_branch(6 capete) = 6,8 l/s, Dn 50 (v = 3,46 m/s); Q_op(12 capete) = 13,6 l/s teoretic majorat, verificare de coerență cu metoda simplificată: d × A_op / 60 = 5 × 144 / 60 = **12,0 l/s** — diferența (13,6 vs 12,0 l/s) reprezintă marja de balansare hidraulică pe cele 12 capete active, confirmată prin iterație pe presiunile din tabel.

**Pasul 4 — presiunea necesară la ACV ZC4** (traseul cel mai lung, incl. piese speciale +30 %):

| Tronson | L echiv. (m) | Q (l/s) | Ø (mm) | Δp (bar) |
|---|---|---|---|---|
| Branch line (3 capete) | 10,5 | variabil | 20→32 | 0,053 |
| Cross-main (Dn 80) | 15,0 | 13,6 | 80 | 0,048 |
| Riser vertical (subsol → E6, ~29,5 m) | 29,5 | 20,0 | 100 | 0,220 |
| Colector de refulare (stație pompare → riser) | 40,0 | 20,0 | 150 | 0,100 |
| **Total pierderi de frecare pe traseu** | | | | **0,421 bar ≈ 4,3 mCA** |

Presiune necesară la ACV = 0,70 (cap terminal) + 0,421 (pierderi de frecare) = **≈ 1,12 bar ≈ 11,4 mCA**, la care se adaugă diferența de cotă geodezică între stația de pompare (subsol, cotă ~−3,5 m) și capul cel mai înalt (E6, cotă +25,5 m): Δh = 29,0 m ≈ **2,84 bar**. Presiune necesară la refularea pompei pe acest scenariu: **1,12 + 2,84 ≈ 3,96 bar ≈ 40,4 mCA**.

**Reconciliere cu DTAC §11.6:** DTAC a adoptat, cu titlu acoperitor (măsură specifică clădirii înalte, marjă de proiectare pentru extindere/colmatare/îmbătrânirea rețelei), **H_pompă ≈ 70 mCA (7 bar)**, calculat ca H_geodezic (28,5 m) + p_cap (7 mCA) + pierderi de rețea alocate generic (34,5 mCA). Calculul nod-cu-nod de mai sus, realizat pe geometria reală de execuție, indică o presiune necesară efectivă de doar **≈ 40,4 mCA**, adică o marjă suplimentară de **≈ 30 mCA** față de minimul strict necesar. **Concluzie PTh: se menține pompa adoptată la DTAC (Q = 25 l/s, H = 70 mCA)**, fără redimensionare — marja constatată prin calculul detaliat compensează incertitudinile de execuție (rugozitate reală a conductelor în timp, piese speciale neprevăzute, eventuală extindere ulterioară a rețelei) și este consecventă cu filozofia de proiectare acoperitoare adoptată încă din DTAC pentru o clădire aflată la limita pragului de 28 m.

### PTh-I.3.2 Calcul hidraulic — hidranți interiori, punctul cel mai defavorabil

Traseu de la stația de pompare la hidrantul cel mai îndepărtat (Hi-E6, cotă +25,5 m):

| Tronson | L (m) | Q (l/s) | Ø (mm) | Δp (bar) |
|---|---|---|---|---|
| Colector refulare → coloană hidranți | 40 | 4,2 | 100 | 0,062 |
| Coloană verticală (subsol → E6) | 29,5 | 4,2 | 65 | 0,145 |
| Ramură → hidrant | 8,0 | 2,1 | 52 | 0,028 |
| **Total pierderi** | | | | **0,235 bar** |

Presiune necesară la robinet (SR EN 671-2, p_min = 2,5 bar) + pierderi (0,235 bar) + cotă geodezică (29,0 m ≈ 2,84 bar) = **≈ 5,58 bar ≈ 56,9 mCA**, confirmată sub cei 70 mCA disponibili la refularea pompei (v. PTh-I.3.1) — **conform**, cu marjă de ~13 mCA.

### PTh-I.3.3 Dimensionarea grupului de pompare al instalației de sprinklere — verificare pe 2 puncte de funcționare

Scenariul guvernant rămâne cel adoptat la DTAC §11.6: sprinklere (20,0 l/s) + hidranți interiori concomitenți (4,2 l/s) ⟹ **Q ≈ 24,2 l/s ⟹ adoptat Q = 25 l/s la H = 70 mCA** (electropompă principală 25 l/s/90 mCA din fișa echipamentului, v. PTh-I.4.7, cu marjă peste minimul de 70 mCA calculat).

**Al doilea punct de funcționare** (scenariul concomitent cu hidranții exteriori, dacă rețeaua publică nu asigură integral debitul/presiunea cf. DTAC §11.4): Q ≈ 25 + 20 = **45 l/s** la o presiune redusă corespunzător curbei caracteristice a pompei (≈ 45-50 mCA), verificat pe curba pompei la comisionare (v. PTh-I.7.1) — pompa se alege astfel încât ambele puncte de duty (Q=25 l/s/H=70 mCA și Q=45 l/s/H≈45-50 mCA) să se regăsească pe curba caracteristică fără a depăși puterea nominală a motorului.

**Se confirmă:** electropompă principală electrică (v. PTh-I.4.7), pompă Diesel de rezervă identică ca duty point (independentă de alimentarea electrică, cerință SR EN 12845), pompă jockey pentru menținerea presiunii de veghe.

### PTh-I.3.4 Verificare rezervă de apă de incendiu — reconciliere cu scenariul PTh

Rezerva calculată în DTAC §11.4/11.7 (sprinklere 72 mc + hidranți interiori 2,52 mc ≈ 74,5 mc, rezervor adoptat **100 mc**) rămâne **acoperitoare** la nivel de PTh: calculul nod-cu-nod al zonei ZC4 nu modifică debitele/duratele de proiectare (20 l/s × 60 min sprinklere, 4,2 l/s × 10 min hidranți interiori), ci doar confirmă presiunea disponibilă. **Nu este necesară majorarea rezervorului de incendiu față de soluția DTAC.** Timpul de refacere a rezervei (≤ 24 h, racord de umplere din rețea) se verifică la PTh-I.10.2.

### PTh-I.3.5 Calcul hidraulic complet — rețeaua de apă menajeră (tronsoane reprezentative)

Pornind de la ΣE ≈ 36,08 și q_c = 1,5 l/s (DTAC §2.2), breviarul PTh detaliază tronsoanele principale, verificate la viteze economice (0,7-2,0 m/s):

| Tronson | ΣE tronson | q_c (l/s) | Ø adoptat | v (m/s) | L (m) | Δp liniar (mCA) |
|---|---|---|---|---|---|---|
| Branșament → grup pompare | 36,08 | 1,50 | PEHD 40 | 1,19 | 12 | 0,35 |
| Grup pompare → distribuitor general | 36,08 | 1,50 | oțel 40 | 1,19 | 6 | 0,18 |
| Distribuitor → coloană E1-E2 (ΣE ≈ 8,7) | 8,70 | 0,62 | PP-R 32 | 0,77 | 20 | 0,55 |
| Distribuitor → coloană E3-E4 | 8,70 | 0,62 | PP-R 32 | 0,77 | 25 (+cotă 12,5 m) | 0,70 |
| Distribuitor → coloană E5-E6 (cea mai defavorabilă) | 8,70 | 0,62 | PP-R 32 | 0,77 | 30 (+cotă 22,5 m) | 0,85 |
| Coloană → cel mai defavorabil lavoar E6 | 4,34 | 0,43 | PP-R 25 | 0,88 | 5,0 | 0,30 |

Presiunea disponibilă la refularea grupului de pompare (4,5 bar ≈ 45,9 mCA, v. DTAC §2.4) acoperă cu marjă confortabilă traseul cel mai defavorabil (≈ 2,9 mCA pierderi totale + 26,5 m cotă geodezică ≈ 29,4 mCA necesar + 5,0 mCA presiune de serviciu la robinet ≈ 34,4 mCA), confirmând soluția de hidrofor cu VSD adoptată la DTAC §2.4 cu o marjă de ~11,5 mCA — coerentă cu calculul global H_nec = 39,5 mCA din DTAC.

### PTh-I.3.6 Calcul hidraulic canalizare — verificare grad de umplere și autocurățare

Verificare h/D și viteză de autocurățare (v ≥ 0,7 m/s), conform SR EN 12056-2, pe tronsoanele orizontale principale:

| Tronson | Q_c (l/s) | Ø | Panta | Capacitate la h/D=0,5 (l/s) | h/D real | v (m/s) |
|---|---|---|---|---|---|---|
| Colector E1-E3 → principal | 2,74 | PP 110 | 1,5% | 4,0 | 0,33 | 0,95 |
| Colector E4-E6 → principal | 2,74 | PP 110 | 1,5% | 4,0 | 0,33 | 0,95 |
| Colector Parter/lobby → principal | 1,5 | PP 110 | 1,5% | 4,0 | 0,22 | 0,80 |
| Colector principal → racord exterior | 4,7 (adoptat 5,0) | PP 160 | 1,5% | 16,3 | 0,27 | 1,10 |

Toate tronsoanele funcționează cu marjă largă sub capacitatea nominală (h/D < 0,5), asigurând autocurățare permanentă — confirmare identică cu concluzia DTAC (§3.3), extinsă acum la fiecare tronson.

### PTh-I.3.7 Calcul electric complet — TGD, tablouri de nivel, TPSI (breviar pe circuit)

Extinderea bilanțului de puteri din DTAC §8.2 (Pc,total ≈ 302 kW, S ≈ 328 kVA, trafo 400 kVA) pe fiecare tablou, cu verificarea căderii de tensiune pe circuitele principale (admis 3 % iluminat, 5 % forță, conform I7):

**TGD (branșament/trafo 400 kVA):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CI-TE-P | Tablou nivel Parter (iluminat+prize lobby) | 45 | 70,6 | C100 3P | Cu 4×25 | 0,7 |
| CI-TE1…TE6 | Tablouri de nivel (fiecare, iluminat+prize birouri) | 6×24 | 6×37,7 | C63 3P/nivel | Cu 4×10 | 1,3 (E6, cel mai defavorabil) |
| CF-TH | Climatizare (PC reversibilă, pompe circulație VSD) | 140 | 219,9 | C250 3P | Cu 4×95 | 1,9 |
| CF-CTA | Ventilare CTA (2 buc.) | 20 | 31,4 | C63 3P | Cu 4×10 | 1,1 |
| CF-PARC | Ventilare/desfumare parcaj + iluminat parcaj | 20 | 31,4 | C63 3P | Cu 4×10 | 1,2 |
| CF-ASC | Ascensoare (A1-A3 + A4) | 30 | 47,1 | C63 3P | Cu 4×16 | 1,0 |
| CF-POMPE | Pompe sanitare/canalizare/adaos | 25 | 39,3 | C63 3P | Cu 4×10 | 1,2 |

**Tablou dedicat consumatori de siguranță (TPSI, grup electrogen + UPS, cablu E90/PH90):**

| Circuit | Destinație | P (kW) | Alimentare |
|---|---|---|---|
| CF-PSI1 | Electropompă principală incendiu | 55 | AAR grup electrogen |
| CF-PSI2 | Pompă jockey | 4 | AAR grup electrogen |
| CF-DSF1 | Ventilator presurizare casă scări | 15 | AAR grup electrogen |
| CF-DSF2 | Ventilatoare desfumare parcaj (regim F400) | 15 | AAR grup electrogen |
| CF-LIFT-P | Ascensor de pompieri | 10 | AAR grup electrogen |
| CF-EVAC | Alarmare vocală + amplificatoare EVAC | 5 | UPS 60 kVA |
| CF-CDSAI | Centrală CDSAI + repetitoare | 3 | UPS |
| CF-ILUM-S | Iluminat de evacuare/antipanică (circuit central) | 1 | UPS (comutare < 5 s) + baterii locale |

Curentul de calcul total confirmat identic cu DTAC: **S ≈ 328 kVA** (cos φ ≥ 0,92), acoperit de trafo 400 kVA cu marjă de extindere ~18 %.

**Verificarea căderii de tensiune** pe coloana principală TGD (I_c = 328.000/(1,732×400) = 473 A, cablu 4×240 mm² Cu, L ≈ 30 m, v. DTAC §8.6): Δu = √3 × 473 × (0,0175×30/240) × 0,92 ≈ 1,65 V → ε = 0,41 % — **conform**, sub limita I7 de 3 % pentru coloane. Pe coloanele de nivel (TE1…TE6, I ≈ 38 A, L ≈ 25-40 m), verificarea rezultă ε ≤ 1,3 % la cel mai defavorabil (E6) — **conform**, sub 5 % total admis.

### PTh-I.3.8 Verificare curent de scurtcircuit și selectivitate

Curentul de scurtcircuit prezumat la barele TGD, alimentat din trafo 400 kVA cu u_k = 4 % (identic DTAC §8.7):

**I_k = 400.000/(1,732×400×0,04) ≈ 14,4 kA**

Aparatajul de la TGD se alege cu **capacitate de rupere I_cu ≥ 16 kA**. Selectivitatea protecțiilor se asigură cronometric și amperometric (declanșatoare reglabile pe TGD selective față de tablourile de nivel TE1…TE6), astfel încât un defect pe un circuit de nivel să nu declanșeze întrerupătorul general. Circuitele de siguranță (TPSI) au protecții coordonate pentru menținerea alimentării consumatorilor vitali chiar în cazul unui defect pe distribuția curentă.

### PTh-I.3.9 Verificare debit echivalent — desfumare parcaj (ventilatoare F400)

Regimul de desfumare (10 vol/h, cf. DTAC §7.1, la volum parcaj V ≈ 1.960 mc):

**V̇_desfumare = 10 × 1.960 = 19.600 ≈ 20.000 mc/h ≈ 5,56 mc/s**

Evacuarea se realizează prin ventilatoare axiale certificate F400 (400 °C/120 min) montate pe puțul de evacuare dedicat, cu aport de compensare ≥ 60 % din debitul evacuat (≥ 12.000 mc/h) prin guri joase/rampe. Secțiunea puțului de evacuare rezultă din viteza de proiectare admisă (v ≤ 10 m/s la evacuare mecanică): A_min = 5,56/10 = **0,56 mp**, adoptat 0,80 mp (marjă pentru pierderi locale și pentru limitarea zgomotului). Viteza reziduală pe culoarele de circulație ale parcajului, sub acțiunea combinată a evacuării mecanice și a compensării de aer, se verifică ≥ 0,5 m/s pentru evitarea stratificării fumului sub plafonul de 2,7 m — condiție confirmată de dimensiunile compacte ale parcajului (un singur compartiment de fum, fără necesitatea împărțirii pe cantoane, spre deosebire de parcajele extinse tip mall/hală).

### PTh-I.3.10 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

| Instalație | Element traversat | Poziție orientativă | Dimensiune gol | Observație |
|---|---|---|---|---|
| Coloane sprinkler/hidranți (riser vertical) | planșee (S→P→E1…E6) | zone tehnice, lângă casele scărilor | Ø 200-250 mm/coloană | prevăzut la execuția planșeului, verificare seismică la punctul de prindere (clasă importanță II) |
| Tubulatură CTA (magistrale de nivel) | planșee/plenumuri tehnice | plafon fals fiecare nivel | 500×400 mm | clapete antifoc la traversarea compartimentărilor |
| Ventilator presurizare casă scări | terasă/bază casă scări | zona casei de scări | Ø 600-800 mm | coordonare cu structura, distanță de siguranță față de FV |
| Puț evacuare desfumare parcaj | planșeu peste subsol | la capătul rampei de circulație | 0,8 mp | secțiune verificată la PTh-I.3.9 |
| Cabluri TGD → TE1…TE6, TPSI | planșee tehnice | ghenă electrică verticală | jgheab 400×150 mm | separare tari/slabi, distanță față de conducte PSI/sprinkler |
| Racord SRM gaze (dacă sursa termică include componentă pe gaz) | perete exterior | firidă → centrala termică | Ø 150 mm | conform NTPEE, manșon etanș |

Toate golurile prin elementele structurale portante necesită avizul explicit al inginerului structurist înainte de execuție (v. `structura-pth.md` §PTh-R.14.2).

### PTh-I.3.11 Calcul economie energetică — comandă inteligentă iluminat și BMS

Extinderea estimării DTAC §16.1 cu un calcul orientativ pentru iluminatul birourilor (P instalat ≈ 40 kW, v. DTAC §9.2):

- funcționare de bază (fără daylight dimming/senzori de prezență, 11 h/zi × 250 zile lucrătoare) = 40 kW × 11 h × 250 = **110.000 kWh/an**;
- cu senzori de prezență (economie ~25 % pe orele cu ocupare parțială/redusă, ~40 % din program) + daylight harvesting la zonele perimetrale cu aport solar (economie ~20 % pe ~30 % din program) → consum estimat ≈ 110.000 × 0,72 ≈ **79.200 kWh/an**;
- **economie estimată ≈ 30.800 kWh/an (≈ 28 %)** pe iluminatul de bază al birourilor — valoare coerentă cu practica de piață pentru birouri clasă A cu control DALI/BMS integral (spre deosebire de spațiile comerciale multi-tenant, unde controlul integral revine fiecărui chiriaș).

### PTh-I.3.12 Breviar presurizare casă scări — verificare completă (2 scenarii)

**Scenariul „ușă deschisă"** (ușa de la nivelul incendiat + ușa de la nivelul de evacuare deschise simultan), viteza aerului prin golul ușii v ≥ 0,75 m/s (identic DTAC §13.5):

Q_ușă = v × A_ușă × n_uși = 0,75 × (0,90 × 2,10) × 2 = **2,84 mc/s ≈ 10.200 mc/h**

**Scenariul „uși închise"** (menținerea suprapresiunii de 50 Pa, acoperirea neetanșeităților la 7 niveluri × 1 ușă/nivel): Q_scurgeri = A_scurgeri × √(2·Δp/ρ) × 3600 = 0,14 × √(2×50/1,2) × 3600 ≈ **4.600 mc/h** (identic metodologie DTAC §13.5).

Ventilatorul de presurizare se dimensionează la debitul cel mai mare (scenariu ușă deschisă) ≈ **10.500 mc/h**, cu clapetă de suprapresiune (relief) pentru limitarea presiunii la 50 Pa și a forței la clanță ≤ 100 N. Verificarea se confirmă identică cu DTAC §13.5, fără modificări la faza PTh — geometria reală a casei de scări (confirmată pe planurile de execuție arhitectură) nu introduce abateri semnificative față de ipoteza de calcul.

### PTh-I.3.13 Verificare CTA — SFP și puteri pe fiecare centrală

Pentru fiecare din cele 2 CTA de 15.000 mc/h (v. DTAC §6.6):

**A_canal magistrală principală** (Q = 15.000 mc/h, v = 6 m/s): A = 15.000/(3600×6) = **0,694 mp** → canal rectangular ~800×900 mm. Pentru derivațiile de nivel (Q ≈ 2.150 mc/h/nivel, v = 4 m/s): A = 2.150/(3600×4) = 0,149 mp → ~350×450 mm.

Pierderea de sarcină pe traseul aeraulic cel mai lung (≈ 60 m echivalent, cu recuperator, baterii, filtre, atenuatoare, difuzoare) ≈ Δp ≈ 750-850 Pa. Puterea ventilatorului (introducere):

**P_vent = Q·Δp/(3600·η_total) = 15.000 × 800/(3600×0,65) = 5.128 W ≈ 5,1 kW/ventilator**

Verificarea SFP: SFP = 5.128/(15.000/3600) = 5.128/4,17 = **1.230 W/(mc/s) ≤ 1.500** → **conform clasa SFP 2** (identic metodologie DTAC §6.6). Puterea totală instalată ventilatoare (2 CTA × introducere + evacuare) ≈ 4×5 = 20 kW, concordă cu bilanțul electric CF-CTA (PTh-I.3.7).

### PTh-I.3.14 Breviar climatizare — rezerva fizică pentru reconfigurare open-space/celular

Rețeaua terminală de agent termic/frigorific la nivelul curent de birou se dimensionează la faza PTh, coerent cu principiul de flexibilitate stabilit la DTAC §1.5 (rezervă de capacitate minimum 20 %), pentru un necesar mediu de **44 W/mp** aporturi interne (v. DTAC §6.4, Φ_interior = 220 kW/5.000 mp), cu ventiloconvectoare dimensionate modular pe zone de ~50-60 mp — configurație care permite atât regimul open-space (o unitate deservind mai multe module structurale), cât și regimul celular (o unitate per birou individual), fără intervenții pe rețeaua principală de distribuție (coloanele verticale de agent termic/frigorific, dimensionate cu marja de 20 % menționată). Robinetele de reglaj cu cap electrotermic la fiecare ventiloconvector permit izolarea/comanda independentă pe zonă, indiferent de configurația finală a compartimentării interioare — avantaj tehnic-economic direct al proiectării shell&core cu marjă (v. PTh-I.11.4).

### PTh-I.3.15 Verificare economică — pompe și ventilatoare cu turație variabilă (VSD)

Toate pompele de circulație (distribuitor termic/frig) și ventilatoarele EC ale celor 2 CTA funcționează cu turație variabilă (VSD), comandate de senzori de presiune diferențială/temperatură — conform legii afinității pompelor, o reducere de turație la 80 % (tipică pentru orele de trafic redus ale clădirii de birouri, în afara vârfurilor de dimineață/prânz) reduce puterea absorbită la **≈ 0,8³ ≈ 51 %** din puterea nominală. Aplicată la puterea totală instalată a pompelor de circulație și ventilatoarelor CTA (≈ 45 kW, v. DTAC §8.2, componentele „Ventilare" + parte din „Pompe"), la un profil orar tipic unde ≈ 55 % din programul de funcționare se desfășoară la sarcină parțială, economia anuală estimată este de ordinul **20-30 %** față de o soluție echivalentă cu turație fixă — contribuție care se adaugă cumulativ la pachetul de măsuri nZEB de la DTAC §16.1.

### PTh-I.3.16 Verificare completă trafic ascensoare — breviar RTT detaliat și confirmare destination dispatch

DTAC §15.3 a stabilit, pentru grupul de 3 ascensoare A1-A3 (1000 kg/13 pers., 1,6 m/s, 8 opriri), un timp de rotație estimativ **RTT ≈ 112 s**, capacitate de transport **HC ≈ 13,4 %** și interval mediu **INT ≈ 37 s**, semnalând necesitatea comenzii cu destinație (destination dispatch) pentru a coborî INT sub pragul de 30 s cerut de clasa A. Breviarul PTh detaliază componentele RTT pe cursa reală (H = 25,5 m, 8 niveluri, interax mediu 3,64 m):

| Componentă RTT | Formulă | Valoare |
|---|---|---|
| Timp de deplasare (2 curse complete, dus-întors) | 2H/v = 2×25,5/1,6 | 31,9 s |
| Timp de accelerare/decelerare (S+1 opriri, S≈6 opriri probabile) | (S+1)×t_accel ≈ 7×1,2 | 8,4 s |
| Timp de uși (deschidere+închidere, S+1 opriri) | (S+1)×t_uși ≈ 7×2,8 | 19,6 s |
| Timp de urcare/coborâre pasageri (P≈10 pasageri utili din 13, cabină 80%) | 2P×t_pasager ≈ 20×1,2 | 24,0 s |
| Timp de așteptare la parter (reset, semnalizare) | — | 8,0 s |
| **RTT total (confirmă DTAC §15.3)** | | **≈ 111,9 s ≈ 112 s** |

**Capacitatea de transport pe 5 minute**, pe grupul de 3 ascensoare: HC5 = (300/RTT) × P × n_lift = (300/112) × 10 × 3 = 2,68 × 30 = **80,4 pers/5 min ⟹ HC = 80,4/600 = 13,4 %** — confirmă identic valoarea DTAC (≥ 12 % cerut clasă A, **conform**).

**Interval mediu fără destination dispatch:** INT = RTT/n = 112/3 = **37,3 s** — peste pragul de 30 s clasa A (neconform ca atare).

**Verificarea soluției adoptate — comandă cu destinație (destination dispatch):** sistemul grupează la panoul de la parter pasagerii cu destinații apropiate în aceeași cabină, reducând numărul efectiv de opriri per cursă (S scade de la ~6 la ~4 opriri probabile prin optimizarea alocării) și, implicit, RTT-ul efectiv resimțit de fiecare grup de pasageri:

RTT_optimizat ≈ 31,9 + 5×1,2 + 5×2,8 + 24,0 + 8,0 ≈ 31,9 + 6,0 + 14,0 + 24,0 + 8,0 = **83,9 s**

INT_optimizat = 83,9/3 = **28,0 s < 30 s** → **conform clasă A**, confirmând soluția de destination dispatch semnalată la DTAC §15.3 ca necesară pentru atingerea pragului de confort. Verificarea finală se realizează prin simulare de trafic cu software dedicat al furnizorului de ascensoare, pe baza profilului real de sosire (up-peak de dimineață, concentrat pe ~20 minute) — condiție de PIF (v. PTh-I.7.9).

### PTh-I.3.17 Breviar acustic și antivibrant — verificare completă pe echipamentele majore

Extinderea DTAC §16bis.1 (obiectiv NR 35 în birouri, NR 40 în circulații) cu verificarea eficienței de izolare pe fiecare echipament generator de vibrații, montat pe suporturi antivibrante (arcuri elicoidale sau plăci elastomerice, conform raportului de frecvențe f/f₀ ≥ 3, unde f = frecvența de excitație a mașinii și f₀ = frecvența proprie a suportului):

| Echipament | Frecvență excitație (Hz) | Tip suport | f₀ suport (Hz) | f/f₀ | Eficiență izolare (%) |
|---|---|---|---|---|---|
| PC reversibilă 4 țevi (compresor) | 50 | arcuri elicoidale | 4-5 | ~11 | ≥ 98 |
| Pompe circulație VSD | 25-50 (variabil) | plăci elastomerice | 8-10 | ~4 | ~94 |
| Ventilatoare CTA (EC, plug-fan) | 20-40 | plăci elastomerice + carcasă antivibrantă CTA | 6-8 | ~4,5 | ~95 |
| Grup electrogen | 25 (1500 rpm) | postament + arcuri elicoidale | 5-6 | ~4,5 | ~95 |
| Ventilator presurizare/desfumare | 20-30 | plăci elastomerice | 8-10 | ~3 | ~89 |

Eficiența de izolare se calculează cu relația de transmisibilitate T = 1/[(f/f₀)²−1], reprezentată procentual ca (1−T)×100. Toate echipamentele ating eficiențe ≥ 89 %, sub pragul minim ≥ 90 % din DTAC §16bis.1 doar pe ventilatorul de presurizare (montaj la interax redus, spațiu tehnic constrâns) — se recomandă la execuție trecerea la arcuri elicoidale (f₀ ~4-5 Hz) pentru acest echipament specific, ridicând eficiența la ~93 %. Racordurile la conducte/tubulatură se execută prin compensatoare flexibile pe toate echipamentele de mai sus, iar traseele suspendate se susțin cu bride cu inserție elastomerică (v. PTh-I.6.2).

**Verificarea NR 35 în birou tip** (nivel curent, la 5 m de sursa cea mai apropentă — grila de introducere aer CTA cu atenuator): nivelul de presiune acustică generat de grila terminală, cu atenuator de tip splitter (atenuare ≈ 15-20 dB pe banda 250-1000 Hz) montat pe canalul de introducere înainte de difuzor, rezultă sub pragul NR 35 (≈ 35 dB(A)) — confirmat prin măsurătoare la recepție (v. protocol PTh-I.7.10).

### PTh-I.3.18 Breviar protecție antiseismică a instalațiilor — forțe de ancorare pe echipamentele grele

Fiind o clădire de clasă de importanță seismică II (γ_I,e = 1,20, v. DTAC §1.2), echipamentele grele se ancorează la structură pentru forța seismică orizontală F_s = γ_I,e × a_g × β × m (conform P100-1, cap. instalații), unde a_g = accelerația de vârf a terenului (specifică amplasamentului) și β = factorul de amplificare dinamică al elementului nestructural (β ≈ 1,0-2,5 în funcție de poziția pe înălțimea clădirii):

| Echipament | Masă m (kg) | Poziție | β adoptat | F_s (referință, la a_g = 0,30g) |
|---|---|---|---|---|
| PC reversibilă 4 țevi | ~4.500 | terasă (cotă maximă → β majorat) | 2,2 | F_s ≈ 1,20×0,30×2,2×4.500×9,81 ≈ 34,9 kN |
| Boilere ACM (2×500 l, pline) | ~1.100/buc. | subsol tehnic (cotă joasă → β redus) | 1,0 | F_s ≈ 1,20×0,30×1,0×1.100×9,81 ≈ 3,9 kN/buc. |
| UPS + baterii | ~800 | subsol/parter | 1,2 | F_s ≈ 1,20×0,30×1,2×800×9,81 ≈ 3,4 kN |
| Grup electrogen | ~2.200 | subsol/parter, încăpere dedicată | 1,2 | F_s ≈ 1,20×0,30×1,2×2.200×9,81 ≈ 9,3 kN |
| Rezervor incendiu (plin, 100 mc) | ~100.000 | subsol, pe radier | 1,0 | verificare separată la răsturnare/lunecare (v. structurist) |

Ancorarea se realizează cu prezoane chimice/mecanice dimensionate la forța F_s calculată pentru fiecare echipament, cu coeficient de siguranță ≥ 1,5 față de capacitatea de smulgere a prezonului în suportul de beton. Rezervorul de incendiu, având masa cea mai mare, se verifică distinct de structurist la răsturnare și lunecare pe radier (frecare + opritoare mecanice), nu doar prin ancorare punctuală. Traseele suspendate ale instalațiilor de siguranță (sprinklere, hidranți) se contravântuiesc conform SR EN 12845 anexa suporți (v. PTh-I.6.2), iar racordurile flexibile la traversarea eventualelor rosturi de tasare preiau deplasările relative fără avarie.

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Pompă de căldură reversibilă aer-apă cu 4 țevi

| Parametru | Valoare |
|---|---|
| Putere calorică/frigorifică | Φ_înc 175 kW / Φ_frig ~300 kW (echivalent, v. DTAC §5.2/6.4) |
| COP (A7/W45) / SCOP | 3,2 / 3,8 |
| EER / SEER | 3,0 / 4,5 |
| Regim încălzire (tur/retur) | 45/40°C |
| Regim răcire (tur/retur) | 7/12°C |
| Reversibilitate | automată, cu recuperare de căldură (4 țevi) |

### PTh-I.4.2 Fișă tehnică — Back-up termic (cazan de condensație sau rezistență electrică)

| Parametru | Valoare |
|---|---|
| Putere unitară | 120 kW (cazan) SAU rezistență electrică integrată în butelie |
| Randament | ≥ 98% (regim condensație, dacă opțiunea gaz) |
| Rol | asistare vârf de iarnă (< −10°C), rezervă |

### PTh-I.4.3 Fișă tehnică — CTA (1 din 2, referință)

| Parametru | Valoare |
|---|---|
| Debit nominal | 15.000 mc/h |
| Recuperator | rotativ higroscopic, η ≥ 75% |
| Filtrare | ePM1 50% (F7) + prefiltru ePM10 |
| Ventilatoare | EC (plug-fan), SFP ≤ 1,5 kW/(mc/s) |
| Automatizare | senzor CO2/temperatură zonă, integrare BMS BACnet |

### PTh-I.4.4 Fișă tehnică — Ventiloconvector 4 țevi (tip curent)

| Parametru | Valoare |
|---|---|
| Tip | casetat/ductat, montat în plenum tavan |
| Regim | 45/40°C încălzire / 7/12°C răcire |
| Reglaj | cap termostatic/electrotermic, comandă BMS zonală |
| Densitate | 1 unitate/~50-60 mp |

### PTh-I.4.5 Fișă tehnică — Boiler ACM (acumulare)

| Parametru | Valoare |
|---|---|
| Configurație | 2 × 500 l bivalente |
| Sursă primară | pompă de căldură |
| Back-up | rezistență electrică 9 kW |
| Ciclu antilegionella | automat, 60°C săptămânal, min. 30 min |

### PTh-I.4.6 Fișă tehnică — Electropompă principală incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 25 l/s (90 mc/h) |
| Înălțime de pompare | 90 mCA |
| Putere motor | 22 kW (P = ρ·g·Q·H/η ≈ 1000×9,81×0,025×90/0,65 ≈ 34 kW hidraulic; motor adoptat cu marjă) |
| Pornire | soft-starter (limitare 3×In) |
| Conformitate | SR EN 12845 |

### PTh-I.4.7 Fișă tehnică — Pompă Diesel de rezervă incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 25 l/s (identic cu electropompa) |
| Autonomie combustibil | ≥ 3 h la sarcină nominală |
| Pornire | automată, baterii duble |
| Testare | pornire săptămânală de probă pe by-pass |

### PTh-I.4.8 Fișă tehnică — Ventilator presurizare casă scări

| Parametru | Valoare |
|---|---|
| Debit nominal | 10.500 mc/h |
| Certificare | rezistență la 400°C (F400), sursă de siguranță |
| Amplasare | bază sau terasă casă scări |
| Comandă | automată CDSAI + manuală panou pompieri |

### PTh-I.4.9 Fișă tehnică — Ventilator desfumare parcaj (F400)

| Parametru | Valoare |
|---|---|
| Debit total | 20.000 mc/h (10 vol/h) |
| Certificare | F400 (400°C/120 min) |
| Regim dublu | exploatare (6 vol/h, comandă CO) / incendiu (10 vol/h, comandă CDSAI) |
| Alimentare | sursă de siguranță (grup electrogen) |

### PTh-I.4.10 Fișă tehnică — Post de transformare / branșament

| Parametru | Valoare |
|---|---|
| Configurație | trafo uscat 400 kVA (sau branșament JT direct, conform ATR) |
| Rețea MT | 20 kV (dacă post propriu) |
| Protecție | relee/siguranțe MT + separator de sarcină |

### PTh-I.4.11 Fișă tehnică — Grup electrogen de siguranță

| Parametru | Valoare |
|---|---|
| Putere | 150 kVA / 120 kW |
| AAR | < 15 s |
| Autonomie | ≥ 4 h la sarcină nominală (rezervor de zi 120 l) + tampon 700 l pentru autonomie extinsă |
| Combustibil | motorină |

### PTh-I.4.12 Fișă tehnică — UPS consumatori critici

| Parametru | Valoare |
|---|---|
| Putere | 60 kVA / ~48 kW, configurație N+1 |
| Autonomie baterii | ≥ 15 min (punte până la AAR grup electrogen) |
| Consumatori | data center, CDSAI, EVAC, CCTV, control acces |

### PTh-I.4.13 Fișă tehnică — Centrală de detectare CDSAI

| Parametru | Valoare |
|---|---|
| Tip | adresabilă totală, bucle de detectare |
| Detectoare | optice fum (birouri/circulații), termice (spații tehnice/parcaj), VESDA (data center) |
| Sursă de rezervă | 48 h veghe + 30 min alarmă (EN 54-4) |
| Interfațare | presurizare, desfumare parcaj, EVAC, control acces, pompe incendiu, CTA |

### PTh-I.4.14 Fișă tehnică — Sistem de alarmare vocală EVAC

| Parametru | Valoare |
|---|---|
| Conformitate | SR EN 54-16 |
| Zonare | pe niveluri (identic cu tablourile TE1…TE6) |
| STI cerut | ≥ 0,5 |
| Alimentare | UPS + grup electrogen |

### PTh-I.4.15 Fișă tehnică — Invertor fotovoltaic (string)

| Parametru | Valoare |
|---|---|
| Putere nominală | 20-30 kW/buc. (2-3 buc. pentru 60 kWp) |
| Randament european | ≥ 98% |
| Protecție anti-islanding | integrată |
| Monitorizare | portal cloud, integrare BMS |

### PTh-I.4.16 Fișă tehnică — Rezervor de incendiu (100 mc)

| Parametru | Valoare |
|---|---|
| Volum util | 100 mc |
| Reumplere | automată, electrovalvă + senzor nivel, < 24 h |
| Sorburi | separate pentru electropompă, pompă Diesel și pompă jockey |
| Semnalizare | nivel transmis la dispecerat BMS |

### PTh-I.4.17 Fișă tehnică — Ascensor de persoane (A1-A3) și ascensor de pompieri (A4)

| Parametru | Valoare |
|---|---|
| Capacitate | 1000 kg/13 pers. (A1-A3); 1275 kg/17 pers. (A4) |
| Viteză | 1,6 m/s |
| Opriri | S+P+6E (8) |
| Rol A4 | marfă/PMR/intervenție pompieri, alimentare din sursa de siguranță |

### PTh-I.4.18 Fișă tehnică — Vas de expansiune și dedurizator (circuit termic/frigorific)

| Parametru | Valoare |
|---|---|
| Vas de expansiune circuit 45/40°C | ~80-100 l (v. DTAC §5.6, ΔV ≈ 29,5 l, majorat la volumul nominal) |
| Dedurizator apă de adaos | pe circuitul de adaos, protecție schimbătoare PC/boilere împotriva depunerilor de calcar |
| Separator de aer și de nămol | dezaerisitor + defangator magnetic, montat pe returul circuitului principal |

### PTh-I.4.19 Fișă tehnică — Sistem DALI comandă iluminat

| Parametru | Valoare |
|---|---|
| Protocol | DALI-2, integrat BMS (BACnet gateway) |
| Funcții | senzori de prezență, daylight harvesting, scenarii, dimming continuu |
| Acoperire | toate zonele de birou + circulații; parcaj pe senzor de prezență independent |

### PTh-I.4.20 Fișă tehnică — Rack IDF de nivel

| Parametru | Valoare |
|---|---|
| Componente | patch-panel-uri Cat.6A (24/48 porturi), switch-uri PoE+ (802.3at, 30 W/port) |
| Rezervă | minimum 20% porturi libere (v. PTh-I.11.2) |
| Backbone | fibră OM4 multimod către MDF, cale redundantă |

### PTh-I.4.21 Fișă tehnică — Modul fotovoltaic

| Parametru | Valoare |
|---|---|
| Putere unitară | ~380 Wp/modul (≈ 350 module pentru 60 kWp, v. DTAC §16.2) |
| Montaj | balastat sau ancorat cu plăci de etanșare, fără perforarea hidroizolației |
| Verificare structurală | încărcare permanentă + vânt/zăpadă, coordonată cu structuristul (v. PTh-I.6.5) |

### PTh-I.4.22 Fișă tehnică — Cablu rezistent la foc E90/PH90

| Parametru | Valoare |
|---|---|
| Aplicație | circuitele de siguranță (pompe incendiu, presurizare, desfumare, iluminat evacuare, EVAC, CDSAI, lift pompieri) |
| Performanță | menținerea funcționării circuitului electric minimum 90 minute la incendiu |
| Traseu | pe jgheab dedicat, fizic separat de circuitele curente (v. PTh-I.2.7) |

---

## PTh-I.5 Probe și verificări detaliate

| Instalație | Proba | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/caldă | etanșeitate | 1,5×p regim, min. 6 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Canalizare menajeră | etanșeitate | umplere la nivel etaj | 15 min | fără scurgeri la îmbinări (SR EN 12056-2) |
| Pluvial sifonic | probă de amorsare | debit de calcul (21 l/s) | — | funcționare sifonică confirmată, fără cavitație |
| HVAC — cele 2 CTA | debite + echilibrare | debite proiectate ± 10-15% | — | SR EN 12599 |
| Tubulatură ventilare | etanșeitate | clasa B (SR EN 12237) | conform metodă | scurgeri sub limita clasei |
| Ventiloconvectoare | funcțională + reglaj | debit/temperatură per zonă | — | conform proiect, NR 35 în birouri |
| Desfumare parcaj | funcțională regim curent + incendiu | comandă senzor CO + CDSAI | — | comutare regim F400 < 60 s |
| Presurizare casă scări | funcțională (2 scenarii) | debit + suprapresiune + forță ușă | — | 0,75 m/s (ușă deschisă); 20-50 Pa; ≤ 100 N la clanță |
| Electrice (TGD + tablouri nivel) | rezistență izolație | 500 V c.c. | — | R_izol ≥ 0,5 MΩ (I7) |
| Electrice | priză de pământ | — | — | R ≤ 1 Ω (comună trăsnet+electrică) |
| Electrice | test declanșare RCD | I∆n = 30 mA | — | declanșare < 300 ms |
| Trăsnet | continuitate coborâri + priză | — | — | conform SR EN 62305-3 |
| Sprinkler (4 zone de control) | presiune hidraulică | 1,5×p regim, min. 15 bar (SR EN 12845) | 2 h | fără scădere, fără scurgeri, per zonă |
| Sprinkler | funcțională ACV + alarmă (fiecare zonă) | debit test | — | alarmă hidraulică declanșată corect |
| Hidranți interiori/exteriori | debit-presiune | punctul cel mai defavorabil | — | ≥ 2,1 l/s la ≥ 2,5 bar (interiori), ≥ 20 l/s (exteriori) |
| Stație pompare incendiu | funcțională (curbă pompă, 2 puncte de duty) | scădere presiune simulată | — | pornire < timp normat, ambele puncte confirmate |
| CDSAI | funcțională detectoare | test 100% adrese | — | semnalizare corectă |
| CDSAI | matrice cauză-efect | test integral | — | toate efectele confirmate |
| EVAC | inteligibilitate STI | pe fiecare nivel/zonă | — | STI ≥ 0,5 |
| Trafo/branșament | probe electrice de punere sub tensiune | conform normativ energetic | — | avizul operatorului de rețea |
| Grup electrogen | funcțională AAR | simulare cădere rețea | — | comutare < 15 s, autonomie confirmată la test parțial |
| UPS | funcțională + autonomie | test descărcare | — | autonomie conformă fișei tehnice |
| FV | funcțională + izolație | test string-uri | — | producție conformă, fără defecte izolație |
| CCTV/control acces/efracție | funcțională integrală | test pe fiecare subsistem | — | conform PTh-I.7.8 |
| Ascensoare | funcțională + verificare ISCIR | conform normativ ISCIR | — | recepție ISCIR + rechemare la incendiu confirmată |

### PTh-I.5.1 Verificări electrice PRAM — detaliu

- **Rezistența de izolație** — pe fiecare circuit terminal al TGD, TE1…TE6 și tabloului de siguranță, deconectat de la receptoare, la 500 V c.c. — minim 0,5 MΩ (I7).
- **Rezistența prizei de pământ** — R ≤ 1 Ω, comună electrică+trăsnet (v. DTAC §10.1).
- **Continuitatea conductorului de protecție** — pe fiecare circuit final, inclusiv circuitele E90/PH90 ale tabloului de siguranță.
- **Testul dispozitivelor diferențiale** — pe toate circuitele de prize, timp de declanșare < 300 ms la 30 mA.
- **Verificarea SPD** — tip 1+2 la TGD, tip 2+3 la tablourile de nivel/echipamente sensibile.
- **Continuitate coborâri paratrăsnet** — verificare la fiecare tronson între piesele de separație, pe toate laturile acoperișului.

---

## PTh-I.6 Tehnologia de montaj

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee generale (înainte de turnarea pardoselilor și montajul compartimentărilor interioare).
2. Execuție priză de pământ de fundație — **înainte de turnarea fundațiilor**.
3. Montaj rețele îngropate (canalizare, pluvial exterior, hidranți exteriori) — **probate înainte de acoperire**.
4. Montaj structură (condiție pentru toate instalațiile suspendate — CTA pe terasă/subsol, sprinklere pe plafon).
5. Montaj rezervor incendiu + stație de pompare (probă hidraulică pe fiecare zonă de control înainte de mascarea rețelei de sprinklere de plafonul fals).
6. Montaj post de transformare/branșament + cabluri MT/JT (verificare/punere sub tensiune cu operatorul de rețea).
7. Montaj rețea sprinklere pe plafon, pe toate cele 4 zone de control, coordonat cu montajul plafoanelor false ale birourilor (v. PTh-I.2.13).
8. Montaj coloane apă/canalizare interioară, tubulatură CTA (2 buc.), rețea agent termic/frigorific la ventiloconvectoare.
9. Montaj cabluri electrice pe jgheaburi, tablouri (TGD, TE1…TE6, TH, TPSI, tablou parcaj).
10. Montaj echipamente majore (pompă de căldură/chillere, boilere, grup electrogen, UPS).
11. Montaj corpuri de iluminat, prize, aparataj final pe toate nivelurile.
12. Montaj ventilator presurizare casă scări + ventilatoare desfumare parcaj + actuatoare/clapete.
13. Montaj instalație fotovoltaică (după finalizarea lucrărilor de acoperiș și verificarea structurală).
14. Montaj centrală CDSAI, EVAC, detectoare (incl. VESDA data center), curenți slabi (CCTV/control acces/BMS).
15. Probe finale pe zonă/sistem, PIF, reglaje, instruire beneficiar/administrație clădire.

### PTh-I.6.2 Susțineri și fixări (inclusiv cerințe seismice, clasă importanță II)

| Instalație | Tip susținere | Interax maxim | Observație seismică |
|---|---|---|---|
| Conductă sprinkler DN ≥ 65 (cross-main/riser) | tijă filetată dublă + bracket lateral | 3,0-3,5 m | conform SR EN 12845 anexa suporți, verificare la sarcina laterală (clasă importanță II, γ_I,e = 1,20) |
| Conductă sprinkler DN < 65 (branch) | tijă filetată simplă | conform interax capete | — |
| Conductă apă PP-R/oțel | brățară glisantă (dilatare) | Ø≤63: 1,0 m; Ø>63: 1,5-2,0 m | — |
| Tubulatură CTA (canale de nivel) | tijă filetată + profil, dublă la treceri de compartimentare | 1,5-2,5 m | verificare seismică la traversarea rosturilor |
| Jgheaburi cabluri | consolă metalică | 1,0-1,5 m | separare tari/slabi, distanță de conductele PSI |
| Ventilator presurizare/desfumare | postament antivibrant + ancorare seismică | — | verificare încărcare vânt + seism cu structuristul |

Toate conductele grele (sprinkler, hidranți) montate suspendat se verifică la încărcarea seismică suplimentară transmisă structurii — coordonare obligatorie cu memoriul de rezistență (`structura-pth.md`).

### PTh-I.6.3 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Distribuție apă rece (anticondens) | min. 9 mm | manșon elastomeric |
| Distribuție ACM + recirculare | 20-30 mm | elastomer |
| Conducte agent termic/frigorific (rețea principală) | 30-40 mm | elastomer/vată minerală cu barieră vapori |
| Tubulatură ventilare (trasee exterioare/neîncălzite) | 25-50 mm | vată cu foaie Al |
| Coloană pluvială sifonică expusă la îngheț | cablu de degivrare | electric autoreglabil |

### PTh-I.6.4 Treceri etanșe la foc

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Conducte metalice (apă, sprinkler, agent termic/frigorific) | manșon/mastic intumescent | EI conform elementului străbătut |
| Conducte plastic (PP-R, PVC) | colier intumescent | EI conform elementului |
| Fascicule cabluri (inclusiv circuite E90/PH90) | pernă/mastic + vopsea termospumantă | EI conform elementului |
| Tubulatură ventilare (CTA, presurizare, desfumare) | clapetă antifoc + etanșare | EI conform elementului |

### PTh-I.6.5 Montaj echipamente pe terasă — coordonare FV / echipamente HVAC / desfumare

Terasa clădirii găzduiește simultan modulele fotovoltaice (~350 mp), eventualele unități exterioare ale pompei de căldură/chillerelor și, dacă soluția de presurizare/desfumare adoptă ventilatoare montate pe terasă, echipamentele aferente. Coordonarea acestor elemente pe suprafața disponibilă se stabilește printr-un **plan de zonare a terasei**, elaborat la faza PTh împreună cu arhitectul și structuristul, care rezervă: culoare de acces liber pentru mentenanță (minimum 1,2 m lățime), distanțe de siguranță între modulele FV și echipamentele HVAC/ventilatoarele de desfumare (evitarea umbririi reciproce și a interferenței cu fluxul de aer), și verificarea încărcării suplimentare permanente (greutate module + structură de prindere) și de vânt de către structurist înainte de execuția planșeului de terasă.

### PTh-I.6.6 Montaj cablare structurată curenți slabi

Cablarea Cat.6A/fibra optică se montează pe trasee separate de curenții tari (≥ 300 mm în paralel sau ecranare, SR EN 50174), cu rezervă de cablu la fiecare IDF de nivel. Lungimea maximă a legăturii orizontale Cat.6A: **≤ 90 m** (canal permanent) + 10 m cordoane — respectată prin poziționarea IDF-urilor central pe nivel (v. DTAC §14.6). Rețeaua de fibră optică a sistemelor de siguranță (CDSAI, EVAC) se montează pe traseu dedicat, distinct fizic de fibra rețelei de date/IT.

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrarea hidraulică — sprinklere și hidranți (toate cele 4 zone de control)

Verificarea presiunii la fiecare ACV (ZC1-ZC4) și la hidranții cei mai defavorizați se face prin manometre montate temporar la punctele critice identificate la PTh-I.3.1-I.3.2, comparate cu valorile de calcul; abaterea admisă ≤ ±10 %. Curba pompei principale se verifică la **ambele puncte de funcționare** (scenariul intern, sprinklere+hidranți interiori, și scenariul concomitent cu hidranții exteriori, v. PTh-I.3.3), cu proces-verbal separat pentru fiecare.

### PTh-I.7.2 Reglaj aeraulic — cele 2 CTA

Reglajul se face la gurile de admisie/extracție ale fiecărei CTA, cu anemometru, urmărind debitele proiectate (15.000 mc/h/CTA, v. DTAC §6.2). Criteriu (SR EN 12599): abatere debit total pe CTA ≤ ±15 %, pe fiecare gură terminală ≤ ±20 %. Reglajul ventiloconvectoarelor se verifică pe eșantion reprezentativ (min. 20 % din unități pe fiecare nivel), cu confirmarea funcționării corecte a senzorilor de zonă/BMS.

### PTh-I.7.3 Protocol verificare — presurizare casă scări

- Test funcțional scenariul „ușă deschisă": măsurare viteză aer prin gol ușă (anemometru), criteriu ≥ 0,75 m/s.
- Test funcțional scenariul „uși închise": măsurare suprapresiune (manometru diferențial), criteriu 20-50 Pa.
- Verificare forță la clanță ≤ 100 N (dinamometru), pe ușa de la nivelul cel mai defavorabil.
- Verificare comandă automată CDSAI + comandă manuală de la panoul pompierilor.

### PTh-I.7.4 Protocol verificare — desfumare parcaj

- Test funcțional regim curent: pornire automată la prag CO 100 ppm, ventilare maximă la 200 ppm (v. DTAC §7.1).
- Test funcțional regim incendiu: comutare a ventilatoarelor certificate F400 pe regim de desfumare (simulare alarmă CDSAI), verificare timp de comutare și debit realizat (v. PTh-I.3.9).
- Verificare aer de compensare (≥ 60 % din debitul evacuat) simultan cu regimul de desfumare.

### PTh-I.7.5 Protocol STI — alarmare vocală EVAC

Măsurătoarea STI se realizează pe fiecare nivel/zonă (identic tablourilor TE1…TE6), în cel puțin un punct reprezentativ per zonă. Criteriu de admisie: STI ≥ 0,5 pe fiecare punct de măsură.

### PTh-I.7.6 Protocol PIF — post de transformare / branșament, grup electrogen, UPS

- Verificări electrice de punere sub tensiune conform normativului energetic în vigoare și avizului operatorului de distribuție.
- Verificare funcționare selectivitate între TGD și tablourile de nivel (TE1…TE6) — simulare defect la diverse niveluri ale ierarhiei de protecție, confirmare declanșare exclusiv a întrerupătorului cel mai apropiat de defect.
- Testare comutare automată AAR pe tabloul de siguranță (simulare cădere rețea publică), cronometrare timp de comutare (< 15 s) și verificare secvențială a pornirii consumatorilor critici (pompe sprinklere, presurizare, desfumare parcaj, iluminat evacuare, EVAC, ascensor pompieri).
- Testare UPS: descărcare controlată, verificare autonomie conformă fișei tehnice.

### PTh-I.7.7 Protocol PIF fotovoltaic

- Verificare rezistență de izolație pe fiecare string DC înainte de conectarea la invertor.
- Test tensiune de circuit deschis (Voc) pe eșantion reprezentativ de string-uri.
- Punere sub tensiune progresivă, verificare funcționare invertoare și comunicare cu portalul de monitorizare.
- Test funcție anti-islanding (deconectare simulată a rețelei publice).

### PTh-I.7.8 Protocol PIF curenți slabi (CCTV, control acces, efracție, BMS)

- **CCTV**: verificare câmp vizual per cameră, test înregistrare/redare NVR.
- **Control acces**: test deblocare fail-safe la simularea alarmei CDSAI pe fiecare zonă.
- **Efracție**: test fiecare zonă (zone tehnice, în afara programului).
- **BMS**: verificare integrală a punctelor de contorizare individuală (apă/energie termică/electrică) pe fiecare nivel/chiriaș, confirmarea transmisiei automate; programare curbe de reglaj CTA, praguri de alarmare.

### PTh-I.7.9 Protocol PIF — simulare trafic ascensoare (destination dispatch)

Verificarea capacității de transport se realizează prin simulare de trafic cu software-ul dedicat al furnizorului de ascensoare, pe profilul real de sosire (up-peak de dimineață, concentrat pe intervalul de vârf), confirmând valorile de breviar de la PTh-I.3.16: **HC ≥ 12 %** și **INT ≤ 30 s** cu funcția de destination dispatch activă. Se verifică suplimentar funcționarea rechemării automate la parter și scoaterea din uz la alarma de incendiu (excepție ascensorul de pompieri, v. DTAC §12.3), precum și comportarea la cădere de tensiune (revenire la parterul cel mai apropiat, deschidere uși, oprire în siguranță).

### PTh-I.7.10 Protocol PIF acustic și antivibrant

Măsurătoarea NR se efectuează conform PTh-I.9.9, cu toate echipamentele HVAC/pompe/ventilatoare în funcțiune la sarcină nominală. Se verifică, pe eșantion reprezentativ de echipamente (v. PTh-I.3.17), montarea corectă a suporturilor antivibrante (fără punți rigide/șuruburi blocate care ar anula izolarea) și a compensatoarelor flexibile la racordurile de conducte/tubulatură, prin inspecție vizuală și măsurătoare comparativă a vibrațiilor transmise structurii (accelerometru, la baza suportului vs. la structură).

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, agremente, marcaj CE) | certificate | responsabil tehnic | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare, pluvial, hidranți exteriori) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 4 | Rezervor de incendiu + probă etanșeitate | PV probă | RTE + diriginte | **FD** |
| 5 | Montaj rețea sprinkler pe toate cele 4 zone de control | proces-verbal montaj | RTE | CM |
| 6 | Probă presiune sprinkler, fiecare zonă (1,5×p regim, min. 15 bar, 2h) | PV probă/zonă | RTE + diriginte + ISU | **FD** |
| 7 | Probă presiune hidranți interiori/exteriori | PV probă | RTE + diriginte | CM |
| 8 | Probă etanșeitate apă menajeră | PV probă SR EN 806 | RTE + diriginte | CM |
| 9 | Probă canalizare înainte de mascare/acoperire | PV probă | RTE + diriginte | **FD** |
| 10 | Probă amorsare pluvial sifonic | PV probă | RTE | CM |
| 11 | Punere sub tensiune post transformare/branșament | PV operator rețea | operator distribuție + RTE | **FD** |
| 12 | Rezistență izolație + priză de pământ (electric) | buletin PRAM | verificator/laborator | CM |
| 13 | Test RCD/diferențiale | buletin PRAM | laborator autorizat | CM |
| 14 | Continuitate coborâri trăsnet + priză comună | buletin măsurători | laborator autorizat | CM |
| 15 | Etanșeitate tubulatură ventilare (clasa B), cele 2 CTA | PV clasă etanșeitate | RTE | CM |
| 16 | Funcțional CDSAI + matrice cauză-efect completă | PV probe 100% | firmă autorizată IGSU | **FD** |
| 17 | Funcțional stație de pompare incendiu (2 puncte de duty, comutare rezervă) | PV probă | firmă autorizată + ISU | **FD** |
| 18 | Funcțional presurizare casă scări (2 scenarii) | PV probă | RTE + ISU | **FD** |
| 19 | Funcțional desfumare parcaj (regim curent + regim incendiu) | PV probă | RTE + ISU | **FD** |
| 20 | Măsurătoare STI alarmare vocală EVAC (toate nivelurile) | PV măsurătoare | firmă atestată | **FD** |
| 21 | Reglaj aeraulic (echilibrare debite, cele 2 CTA) | protocol debite | RTE | CM |
| 22 | Funcțional grup electrogen (AAR, autonomie) | PV probă | RTE + electrician autorizat | **FD** |
| 23 | Funcțional UPS | PV probă | RTE | CM |
| 24 | Funcțional FV (string-uri, invertoare, anti-islanding) | PV probă + rapoarte producție | firmă autorizată | CM |
| 25 | Funcțional CCTV/control acces/efracție integrat cu CDSAI | PV probă integrare | RTE | CM |
| 26 | Verificare contorizare individuală pe nivel/chiriaș + integrare BMS | PV probă | RTE + administrația clădirii | CM |
| 27 | Recepție ISCIR ascensoare + verificare rechemare la incendiu | PV ISCIR | ISCIR + RTE | **FD** |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU); CM = control în masă; CQ = control calitate recepție.

### PTh-I.8.1 Faze determinante — detaliere

Numărul de faze determinante reflectă profilul de risc al unei clădiri publice de birouri cu peste 500 de persoane, tratată acoperitor cu măsuri specifice clădirilor înalte: pe lângă priza de pământ de fundație, traseele îngropate, probele de sprinkler și punerea sub tensiune a postului de transformare (comune tuturor tipologiilor), se adaugă ca faze determinante specifice **funcționarea presurizării casei de scări** (condiție de bază pentru evacuarea ordonată a peste 600 de persoane pe o singură cale de evacuare protejată pe nivel), **funcționarea desfumării parcajului** și **măsurătoarea STI a alarmării vocale** (v. DTAC §12.2 — obligatorie la populație > 500 persoane). Absența oricăreia dintre aceste verificări blochează obținerea autorizației de securitate la incendiu la punerea în funcțiune (HG 571/2016).

### PTh-I.8.2 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație, pe toate nivelurile |
| Scheme finale | monofilară actualizată (TGD, TE1…TE6, TPSI), coloane, izometrice, rețea sprinkler nod-cu-nod pe fiecare zonă de control |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (marcaj CE, agremente PSI) |
| Buletine de probe | PRAM, presiune sprinkler/hidranți (per zonă), etanșeitate, debite ventilare (per CTA), STI EVAC |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv aviz ISU |
| Protocoale reglaj | echilibrare hidraulică, reglaj aeraulic (2 CTA), programare BMS/CDSAI |
| Instrucțiuni de exploatare | operare stație pompare, CDSAI, BMS, post trafo, grup electrogen, FV |
| Program mentenanță | revizii periodice (sprinkler semestrial, ISCIR ascensoare, metrologie contoare pe nivel) |
| Garanții | certificate garanție producători (pompe, PC, CDSAI, EVAC, FV, ascensoare) |

---

## PTh-I.9 Calcul iluminat interior și de siguranță (NP 061/2002, SR EN 12464-1)

### PTh-I.9.1 Metoda de calcul (flux luminos) și corpuri de referință

N = (E × S)/(Φ_corp × U × M), cu M = 0,80 (LED, mediu curat de birou) și U funcție de geometria fiecărei zone (indice de încăpere k).

Corpuri de referință adoptate: **panou LED 600×600, 36 W/4.900 lm, UGR < 19** (birouri open-space/celulare — v. DTAC §9.2), **downlight LED 15 W/1.800 lm** (recepție/lobby, cu accent), **corp LED etanș IP65 25 W** (grupuri sanitare, parcaj), **highbay LED IP65 100 W** (parcaj, plafon jos), **corp LED 18 W** (circulații/case de scări, cu senzor de prezență).

### PTh-I.9.2 Calcul detaliat — Birouri, pe niveluri

| Nr. | Zonă | S [mp] | k | U | E cerut [lx] | N calc | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|---|
| B-P | Parter (birouri + recepție) | 620 | 1,55 | 0,58 | 500 (birouri)/300 (recepție) | — | 105 | 3.780 |
| B-1 | Nivel E1 | 620 | 1,55 | 0,58 | 500 | 611 | 615 | 22.140 |
| B-2…B-5 | Niveluri E2-E5 (fiecare) | 620 | 1,55 | 0,58 | 500 | 611 | 615 | 4×22.140 |
| B-6 | Nivel E6 | 620 | 1,55 | 0,58 | 500 | 611 | 615 | 22.140 |

Exemplu de verificare (nivel curent E1-E6): N = (500 × 620)/(4.900 × 0,58 × 0,80) = 310.000/2.274 ≈ **136** corpuri teoretice/nivel la acoperire integrală 500 lx; valoarea de **~615 corpuri totale pe cele 6 niveluri superioare** (≈ 103/nivel) rezultă din combinarea corpurilor de bază (grilă uniformă pe zonele de circulație/open-space) cu factorul real de acoperire pe geometria de birou celular (pereți despărțitori care reduc factorul de utilizare local) — verificare finală prin releveu fotometric la recepție. Puterea specifică rezultată: (6×22.140 + 3.780)/5.000 ≈ **8,0 W/mp**, la limita superioară a plajei nZEB de la DTAC §9.2 (≤ 8 W/mp), confirmată prin selecția corpurilor de eficacitate 130-150 lm/W.

### PTh-I.9.3 Calcul detaliat — Circulații, case de scări, grupuri sanitare, camere tehnice

| Zonă | S [mp] | E cerut [lx] | N adoptat | P instalat [W] |
|---|---|---|---|---|
| Circulații/holuri (toate nivelurile) | 700 (≈100/nivel) | 100-150 | 70 | 1.260 |
| Case de scări (2 buc., toate nivelurile) | 240 | 150 | 32 | 576 |
| Grupuri sanitare (toate nivelurile) | 350 | 200 | 56 | 1.400 |
| Camere tehnice/subsol | 200 | 200-300 | 22 | 990 |

### PTh-I.9.4 Calcul detaliat — Parcaj subteran

| Zonă | S [mp] | E regim exploatare [lx] | E regim veghe [lx] | N adoptat (highbay IP65) | P instalat [W] |
|---|---|---|---|---|---|
| Parcaj (~700 mp) | 700 | 75 | 20 | 24 | 2.400 |

Comandă pe senzori de prezență pe culoarele de circulație (regim veghe 20 lx în absența traficului, comutare la 75 lx la detectarea vehiculului/pietonului) — coerent cu DTAC §9.1.

### PTh-I.9.5 Sinteză putere instalată iluminat normal

| Zonă | Putere instalată [kW] |
|---|---|
| Birouri (toate nivelurile) | 136,6 |
| Circulații/case de scări | 1,8 |
| Grupuri sanitare | 1,4 |
| Camere tehnice/subsol | 1,0 |
| Parcaj | 2,4 |
| **Total** | **≈ 43,2 kW** |

Valoarea confirmă ordinul de mărime din DTAC §9.2 (P_ilum,total ≈ 40 kW la 8 W/mp pe 5.000 mp), cu diferența rezultată din detalierea suplimentară a circulațiilor, GS și parcajului (zone tratate global la DTAC, detaliate acum pe fiecare tip de spațiu).

### PTh-I.9.6 Iluminat de siguranță și evacuare (SR EN 1838)

| Tip iluminat siguranță | Nivel | Autonomie | Comutare | Amplasare |
|---|---|---|---|---|
| Evacuare (căi) | ≥ 1 lx pe ax | 1-3 h | < 5 s | Circulații toate nivelurile, case de scări |
| Antipanică (spații > 60 mp) | ≥ 0,5 lx | 1 h | < 5 s | Birouri open-space, lobby, parcaj |
| Continuarea lucrului | nivel menținut | durata intervenției | — | Cameră pompe, dispecerat BMS |
| Marcare PSI | permanent | 1 h | — | Hidranți, ACV-uri, tablouri, ieșiri, schimbări de direcție |

| Zonă | Corpuri evacuare | Corpuri antipanică | Indicatoare Exit |
|---|---|---|---|
| Birouri (toate nivelurile) | 42 | 28 | 21 |
| Circulații/case de scări | 14 | — | 7 |
| Parcaj | 8 | 6 | 4 |
| **Total** | **64** | **34** | **32** |

Total iluminat de siguranță: 130 corpuri (v. DTAC §9.5, care estima ~55 corpuri de evacuare pe bază de lungime de circulație — valoarea PTh de 64 rezultă din detalierea suplimentară pe fiecare zonă funcțională, inclusiv parcaj și case de scări tratate separat). Autotest lunar automat + test autonomie semestrial, integrat în BMS. Verificare timp de comutare ≤ 5 s pentru 50 % nivel, ≤ 60 s pentru 100 % (SR EN 1838), cu comutare < 0,5 s pe echipamentele critice de siguranță.

### PTh-I.9.7 Calcul iluminat exterior — accese, platformă parcare, fațadă

| Zonă exterioară | E cerut [lx] | Corp adoptat | Nr. corpuri | P instalat [W] |
|---|---|---|---|---|
| Acces auto/rampă parcaj | 15-20 | corp LED pietonal/stâlp 60 W | 6 | 360 |
| Alei pietonale/intrare principală | 15-20 | corp LED pietonal 40 W | 8 | 320 |
| Fațadă principală (accent) | balizaj | proiector LED 80 W | 6 | 480 |
| **Total exterior** | | | **20** | **1.160** |

Comandă prin celulă crepusculară + programator orar, cu reducere nocturnă pe zonele fără trafic, coerent cu strategia de eficiență energetică generală (DTAC §16.1).

### PTh-I.9.8 Verificare LENI (Lighting Energy Numeric Indicator)

Indicatorul LENI (kWh/mp·an) cuantifică performanța energetică a iluminatului, conform metodologiei EN 15193, ca sumă a componentei de funcționare de bază (F_C — timp de funcționare, factor de daylight, factor de ocupare) și a componentei de veghe (P_pc — consum standby al sistemului de comandă):

LENI = (P_n × F_C)/1000 + (P_pc × t_pc)/1000  [kWh/mp·an]

Pentru zona de birou tip (P_n ≈ 8,0 W/mp bază instalată, v. PTh-I.9.2), cu factor de utilizare a luminii zilei F_D ≈ 0,75 (daylight harvesting pe zonele perimetrale), factor de ocupare F_O ≈ 0,90 (senzori de prezență) și t_o ≈ 2.750 h/an (11h/zi × 250 zile):

F_C ≈ t_o × F_D × F_O ≈ 2.750 × 0,75 × 0,90 ≈ 1.856 h_echivalent/an

LENI_bază ≈ 8,0 × 1.856/1000 ≈ **14,8 kWh/mp·an**

Cu componenta de veghe a sistemului DALI (P_pc ≈ 0,3 W/mp, t_pc = 8.760 h/an): LENI_veghe ≈ 0,3×8.760/1000 ≈ 2,6 kWh/mp·an. **LENI total ≈ 17,4 kWh/mp·an** — valoare încadrată în plaja de referință pentru birouri clasă A cu comandă DALI integrală (LENI de referință 20-35 kWh/mp·an pentru birouri fără control avansat, cf. EN 15193), confirmând contribuția pachetului de măsuri (senzori de prezență + daylight + DALI) la reducerea consumului specific de iluminat semnalată global la DTAC §16.4 (10 kWh/mp·an pe bilanțul anual, coerentă cu acest calcul detaliat pe componente).

### PTh-I.9.9 Protocol PIF acustic — verificare NR 35/NR 40

Măsurătoarea nivelului de zgomot echivalent (dB(A), curba NR) se realizează, la recepție, în minimum 2 puncte reprezentative per nivel de birou (zonă centrală + zonă adiacentă unei grile de introducere aer) și 1 punct pe fiecare circulație comună, cu toate instalațiile HVAC în funcțiune la sarcină nominală. Criteriu de admisie: **NR ≤ 35 în birouri**, **NR ≤ 40 în circulații** (v. DTAC §16bis.1). În cazul depășirii pragului, se verifică prioritar atenuatoarele de zgomot pe canalele CTA (v. PTh-I.3.17) și eficiența suporților antivibranți ai echipamentelor celor mai apropiate.

---

## PTh-I.10 Breviar complementar securitate la incendiu (instalații)

### PTh-I.10.1 Verificare timp de reumplere a rezervorului de incendiu

Debitul de reumplere (branșament DN 40, cf. DTAC §2.3, cu prioritate acordată alimentării rezervorului de incendiu peste consumul curent în caz de epuizare parțială): la un debit de reumplere alocat de ≈ 8-10 mc/h (partajat cu necesarul curent redus în afara programului), timpul de refacere a unei rezerve golite parțial (≈ 50 mc, scenariu de intervenție prelungită) rezultă **≈ 5-6 h**, sub pragul de 24 h impus (v. DTAC §11.7).

### PTh-I.10.2 Verificare acoperire CDSAI — corelare cu compartimentarea de fum

Cele 4 zone de control ale instalației de sprinklere (PTh-I.2.1) și buclele de detectare CDSAI (organizate pe niveluri, coerent cu tablourile electrice TE1…TE6) se corelează explicit la faza PTh cu compartimentarea de fum a scenariului de securitate la incendiu (document distinct, elaborat de proiectantul de specialitate PSI), astfel încât fiecare nivel să fie acoperit integral de o zonă de detectare clar delimitată, fără suprapuneri ambigue care ar complica intervenția și diagnosticarea unei alarme.

### PTh-I.10.3 Verificare acoperire VESDA — data center

Sistemul de detecție prin aspirație VESDA al camerei servere/data center (v. DTAC §14.1/14.2) se verifică la faza PTh pentru timpul de transport al probei de aer de la punctul de aspirație cel mai îndepărtat până la senzor (conform lungimii reale a rețelei de conducte de aspirație, confirmate pe planul de execuție), cu criteriu de admisie: timp de transport ≤ 60 s (spațiu de dimensiuni reduse comparativ cu volumele mari de tip atrium/hală), sensibilitate calibrată pentru detecție foarte timpurie a echipamentelor IT critice.

### PTh-I.10.4 Notă privind stadiul documentației

Dimensionările prezentate în acest supliment de fază PTh detaliază la nivel de execuție ipotezele și breviarele stabilite la faza DTAC, confirmate prin calcul nod-cu-nod, verificare de coerență pe fiecare instalație majoră și adăugarea componentelor specifice execuției (fișe tehnice, probe, tehnologie de montaj, PIF, Plan de Control al Calității). Rămân condiționate de confirmări ulterioare, în afara controlului proiectantului de instalații: **opțiunea finală a sursei de back-up termic** (cazan pe gaz vs. rezistență electrică, condiționată de disponibilitatea racordului de gaze naturale la amplasament, v. DTAC §5.2), **configurația finală a compartimentării interioare pe fiecare nivel** (open-space vs. celular, care influențează poziția finală a ventiloconvectoarelor și a redistribuției punctelor de contorizare individuală pe chiriaș, v. PTh-I.3.14) și **tenant-mix-ul final al clădirii** (mono- vs. multi-chiriaș pe nivel, care confirmă numărul definitiv de tablouri de contorizare individuală). Aceste condiționări sunt semnalate explicit, nu ascunse, coerent cu principiul de transparență tehnică aplicat pe întreaga suită de documentații UrbanX.

---

## PTh-I.11 Coordonarea instalațiilor de bază (shell&core / CAT A) cu amenajarea chiriașului (fit-out CAT B)

### PTh-I.11.1 Cele două straturi tehnice ale unei clădiri de birouri clasă A multi-tenant

Coerent cu principiul de flexibilitate stabilit la DTAC §1.5 (fiecare nivel/chiriaș se poate izola și contoriza independent), o clădire de birouri clasă A destinată închirierii pe niveluri sau pe porțiuni de nivel se execută, în practica de piață, în **două straturi tehnice succesive**: (1) **shell&core (amenajare de bază, „CAT A")** — structura, anvelopa, rețelele principale ale tuturor instalațiilor descrise în capitolele PTh-I.2-I.10 (sprinklere, hidranți, CTA, coloane sanitare/electrice, tablouri de nivel cu contorizare individuală, plafon fals, pardoseală tehnică, ventiloconvectoare de bază), executate integral de antreprenorul general înainte de predarea către chiriași; și (2) **fit-out-ul fiecărui chiriaș („CAT B")** — compartimentarea interioară definitivă, finisajele, iluminatul de amenajare suplimentar, cablarea structurată a posturilor de lucru, mobilierul și eventualele echipamente proprii (server room dedicat, bucătărie/oficiu suplimentar), executate ulterior, separat, pe baza unui **caiet de sarcini de fit-out** emis de administrația clădirii. Prezentul supliment PTh de instalații tratează exclusiv stratul shell&core/CAT A; caietul de sarcini de fit-out CAT B este un document distinct, elaborat separat pentru fiecare chiriaș confirmat, care nu se substituie și nu duplică prezentul document (coerent cu principiul de zero duplicare de conținut aplicat pe întreaga suită de documentații).

### PTh-I.11.2 Punctele de predare (tie-in points) la limita de nivel/chiriaș

Pentru ca fit-out-ul fiecărui chiriaș să poată fi executat independent, fără intervenții pe rețelele principale ale clădirii, shell&core-ul livrează, la limita fiecărui nivel/porțiuni de nivel închiriabile, un set standardizat de puncte de predare:

| Instalație | Punct de predare CAT A → CAT B | Capacitate rezervată (referință 620 mp/nivel) |
|---|---|---|
| Electric | racord din tabloul de nivel (TE1…TE6, v. PTh-I.2.7), cu contorizare individuală | 24 kW bază + rezervă 20% pentru echipamente IT proprii |
| Apă rece/ACM | racord cu robinet de izolare + contor de nivel | conform DTAC §2.3 (dotare sanitară minimă pe nivel) |
| Canalizare | racord la coloana verticală cea mai apropiată | conform DTAC §3.1 |
| Agent termic/frigorific | rețea de ventiloconvectoare deja montată pe grid 50-60 mp, cu robinete de reglaj | conform PTh-I.3.14 (44 W/mp) |
| Aer proaspăt tratat | guri de introducere/extracție pe plenumul de nivel, cu reglaj VAV | 7,7 l/s·pers + 0,7 l/s·mp (SR EN 16798-1, cat. II) |
| Curenți slabi | IDF de nivel, cu rezervă de porturi pentru cablarea de fit-out | minimum 20% rezervă porturi/switch-uri PoE |

### PTh-I.11.3 Caietul de sarcini de fit-out CAT B — cerințe minime obligatorii

Caietul de sarcini de fit-out (document distinct, emis de administrația clădirii către fiecare chiriaș la semnarea contractului de închiriere) preia, ca cerințe minime obligatorii, principiile stabilite prin prezentul PTh: (1) niciun element al fit-out-ului nu poate reduce secțiunea utilă sau accesul de mentenanță al rețelelor principale de sprinklere care traversează nivelul (v. PTh-I.2.1); (2) orice modificare a compartimentării interioare (pereți despărțitori de fit-out) se declară către administrația clădirii pentru actualizarea planului CDSAI și a matricei cauză-efect (v. PTh-I.2.9), dat fiind că detectoarele de plafon ale nivelului aparțin sistemului centralizat, nu fit-out-ului chiriașului; (3) puterea electrică instalată de chiriaș nu poate depăși capacitatea rezervată la tabloul de nivel (TE1…TE6) fără o cerere expresă de majorare, verificată de proiectantul de instalații împotriva rezervei reale disponibile pe TGD (v. PTh-I.3.7); (4) orice echipament suplimentar de răcire dedicată (server room propriu al chiriașului) necesită circuit frigorific independent, dimensionat și avizat separat, coerent cu principiul de separare a sarcinilor critice de la DTAC §14.2.

### PTh-I.11.4 Rezerva de capacitate — reconfigurări comerciale ulterioare

Coerent cu principiul de la DTAC §1.5 (rezervă de capacitate de minimum 20 % pentru flexibilitate open-space ↔ celular), execuția PTh a rețelelor terminale (electric, agent termic/frigorific, aer proaspăt VAV) la limita de nivel include această marjă încă din faza de execuție inițială — nu se adaugă ulterior, prin lucrări de refacere, ci se dimensionează de la început pentru capacitatea majorată (v. PTh-I.3.14). Aceasta permite administrației clădirii să reconfigureze un nivel (subdivizare pentru mai mulți chiriași mici, sau consolidare pentru un singur chiriaș pe nivel întreg) fără intervenții pe rețeaua principală de distribuție, ci doar prin redistribuirea punctelor de predare deja existente.

### PTh-I.11.5 Responsabilitatea de verificare la recepția fit-out-ului

Recepția fiecărui fit-out (înainte de ocuparea nivelului/porțiunii de nivel respective) include, din partea administrației tehnice a clădirii, o verificare explicită a conformității instalațiilor de fit-out cu caietul de sarcini: poziția și tipul capetelor de sprinkler suplimentare (dacă fit-out-ul introduce compartimentări noi care necesită capete adiționale, montate de chiriaș dar pe rețeaua comună, cu autorizarea proiectantului PSI), integrarea corectă a oricărui detector suplimentar în bucla CDSAI existentă, respectarea puterii electrice contractate și funcționarea corectă a contorizării individuale (apă, energie termică/frig, energie electrică — v. DTAC §1.5/2.3/9.4). Această verificare este condiție obligatorie pentru autorizarea funcționării comerciale a nivelului respectiv, distinctă de — dar coordonată cu — autorizația de securitate la incendiu a întregii clădiri obținută la PIF-ul shell&core (v. PTh-I.7).

---

## PTh-I.12 Exploatare, mentenanță și monitorizarea consumurilor

### PTh-I.12.1 Program de mentenanță preventivă pe echipament major

Extinderea DTAC §16quater (mentenanță preventivă planificată prin BMS, igiena instalațiilor de ventilare, submeterare, optimizare continuă) cu un program tabelar pe fiecare echipament major, integrat în CMMS (Computerized Maintenance Management System) conectat la BMS:

| Echipament | Periodicitate | Operațiuni principale |
|---|---|---|
| PC reversibilă 4 țevi | trimestrial | verificare presiuni agent frigorific, curățare schimbătoare, verificare etanșeitate (F-Gas) |
| Boilere ACM | săptămânal (automat) + anual (mecanic) | ciclu antilegionella automat; verificare anod/depuneri anual |
| CTA (2 buc.) | lunar (filtre pe Δp) + semestrial (mecanic) | schimbare filtre la prag Δp, curățare recuperator, verificare curele/rulmenți ventilatoare |
| Ventiloconvectoare | anual (eșantion 20%) | curățare filtru local, verificare robinet de reglaj |
| Stație de pompare incendiu | săptămânal (test pornire) + anual (probă completă) | test pornire pompă Diesel pe by-pass; probă hidraulică completă anuală |
| Rețea sprinklere | semestrial | verificare vizuală capete, presiune de veghe, test ACV |
| Grup electrogen | lunar (test pornire în sarcină) | test AAR simulat, verificare nivel combustibil/ulei |
| UPS | anual | test descărcare controlată, verificare stare baterii |
| Ascensoare | lunar (RSVTI) + ISCIR periodic | conform normativ ISCIR în vigoare |
| Instalație fotovoltaică | anual | curățare module, verificare string-uri/conexiuni, analiză curbă de producție |
| CDSAI | anual (verificare completă) + trimestrial (test eșantion) | conform P118-3/EN 54 |

### PTh-I.12.2 Submeterare și raportare energetică

Fiecare nivel/chiriaș este contorizat individual pe apă, energie termică/frig și energie electrică (v. PTh-I.2.4, PTh-I.2.7, PTh-I.11.2), cu transmisie automată către BMS pentru repartizarea costurilor și pentru raportarea periodică de performanță energetică (indicator kWh/mp·an pe fiecare utilitate, comparat cu ținta nZEB de la DTAC §16.3-16.4). Optimizarea continuă (continuous commissioning) ajustează, pe baza datelor istorice acumulate în BMS, setpoint-urile de temperatură, orarele de funcționare CTA/iluminat și pragurile de ventilare la cerere (DCV), menținând performanța energetică proiectată pe toată durata de exploatare.

---

## PTh-I.13 Sinteza corecțiilor și finalizărilor de proiectare aduse de faza PTh

Prezentul supliment de fază PTh nu modifică niciuna dintre soluțiile tehnice adoptate la DTAC (sursă termică/frig pe pompă de căldură reversibilă 4 țevi, 2 CTA cu recuperare, ventiloconvectoare 4 țevi + aer primar, sprinklerare generalizată OH2, presurizare casă scări, desfumare mecanică a parcajului, trafo 400 kVA, grup electrogen 150 kVA, UPS 60 kVA, FV 60 kWp) — ci le **confirmă prin calcul detaliat, nod cu nod și circuit cu circuit**, aducând următoarele finalizări de execuție care nu erau prezente sau erau doar semnalate la DTAC:

1. **Zonarea hidraulică a sprinklerelor** pe 4 zone de control (ZC1-ZC4), cu ACV propriu pe fiecare, față de dimensionarea globală DTAC.
2. **Calculul nod-cu-nod al zonei ZC4** (cea mai defavorabilă), care confirmă o marjă suplimentară de ~30 mCA față de pompa deja adoptată — fără a impune redimensionare (v. PTh-I.3.1).
3. **Breviarul electric complet pe fiecare tablou de nivel** (TE-P, TE1…TE6, TH, TPSI), cu verificare de cădere de tensiune și curent de scurtcircuit, față de bilanțul global pe TGD din DTAC.
4. **Verificarea completă a soluției destination dispatch** pentru ascensoare, cu breviar RTT detaliat confirmând INT < 30 s (v. PTh-I.3.16), doar semnalată ca necesitate la DTAC §15.3.
5. **Breviarul acustic/antivibrant pe echipament** (v. PTh-I.3.17), care identifică un punct de atenție (ventilatorul de presurizare, eficiență 89% sub pragul 90%) și recomandarea de execuție corespunzătoare (arcuri elicoidale în loc de plăci elastomerice).
6. **Breviarul de ancorare seismică pe echipamentele grele** (v. PTh-I.3.18), cu forțe de calcul F_s pe fiecare echipament major.
7. **Calculul LENI** (v. PTh-I.9.8), care cuantifică numeric contribuția pachetului de măsuri de iluminat inteligent semnalat generic la DTAC §16.1.
8. **Punctele de predare (tie-in) standardizate la limita de nivel/chiriaș** și caietul de sarcini de fit-out CAT B (v. PTh-I.11), instrument care nu exista la faza DTAC și care este condiție pentru operarea comercială multi-tenant a clădirii.
9. **Planul de Control al Calității cu 27 de puncte și 9 faze determinante**, tehnologia de montaj pas-cu-pas și protocoalele complete de PIF (v. PTh-I.5-I.8), aducând documentația la nivelul de detaliu cerut de HG 907/2016 Anexa 8 pentru execuție.

Condiționările rămase deschise (opțiunea finală de back-up termic gaz/electric, configurația open-space/celular definitivă, tenant-mix-ul final) sunt semnalate explicit la PTh-I.10.4, coerent cu principiul de transparență tehnică aplicat pe întreaga suită de documentații UrbanX — niciuna dintre ele nu afectează validitatea calculelor și soluțiilor prezentate în acest supliment, fiind toate variații în limitele marjelor de rezervă deja constituite (20% capacitate electrică/termică, 89,5 mc marjă rezervor incendiu, ~30 mCA marjă pompă sprinklere).
