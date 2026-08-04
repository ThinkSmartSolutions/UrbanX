# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Centru comercial regional (MALL), S+P+2E, GLA ~22.000 mp, SCD ~52.000 mp

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 Anexa 8 și Legii 50/1991 Anexa 1) pentru memoriul de instalații al centrului comercial regional (mall) tratat la faza DTAC (`instalatii.md`), cu regim de înălțime **S+P+2E**, galerie comercială organizată în jurul unui **atrium central pe 3 niveluri**, ancorată de **hipermarket**, **cinema multiplex** (6-8 săli, 1.600 locuri) și **food-court** (12-16 module), completată de 90-110 unități comerciale și de un **parcaj subteran de ~22.000 mp**. Populația de referință rămâne cea stabilită în DTAC: **populația de vârf ~10.500 persoane** (baza scenariului de evacuare) și **populația de calcul cu simultaneitate ~6.500-7.000 persoane** (baza dimensionării consumurilor curente). SCD ~52.000 mp, GLA ~22.000 mp.

Documentul dezvoltă la nivel de execuție tot ceea ce faza DTAC a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă, **fără a relua** breviarele DTAC — le detaliază, le duce la nivel de tronson/nod/element și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare hidraulice și electrice nod-cu-nod, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, protocoale de PIF (inclusiv verificarea CFD a desfumării atriumului) și Planul de Control al Calității (PCC). Ipoteza funcțională se menține identică cu DTAC: sursă termică mixtă (pompe de căldură reversibile + cazane de condensație), frig de confort pe chillere cu agent GWP redus, frig alimentar CO₂ transcritic la hipermarket, sprinklerare generalizată diferențiată pe clase de pericol, desfumare a parcajului prin jet-fan (NP 127/2009) și desfumare a atriumului prin SHEVS (SR EN 12101). Orice modificare a acestor ipoteze (schimbare de tenant-mix cu proces special, majorare a densității de stocare a hipermarketului peste 7,5 m, reconfigurare a atriumului) impune reluarea integrală a dimensionării de la faza PTh.

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, bilanțuri globale pe zone funcționale | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate |
| Breviar hidraulic PSI | debite globale pe clasă de pericol, un singur nod critic | calcul nod cu nod (Hazen-Williams) pe fiecare zonă de control OH3/HHS/OH2 |
| Breviar electric | bilanț global (kW, kVA) pe 3 posturi de transformare | dimensionare completă pe fiecare tablou/circuit, verificare cădere de tensiune, selectivitate ZSI |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Desfumare atrium | breviar analitic (plumă, debit masic) | verificare obligatorie prin simulare CFD pe geometria finală + protocol de comisionare |
| Desfumare parcaj | principiu jet-fan + regim exploatare/incendiu | dimensionare pe cantoane, forța de împingere per jet-fan, distanță între unități |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație |
| Montaj | principii generale | tehnologie, succesiune, susțineri seismice, izolații, treceri la foc |
| PIF | menționată | protocoale de echilibrare hidraulică/aeraulică, STI EVAC, PT MT, FV, CFD |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |
| Iluminat | niveluri globale pe zone | calcul complet metoda flux luminos pe fiecare zonă funcțională |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC: **SR EN 12845** (calcul hidraulic sprinkler și componentele instalației), **SR EN 12259** (componente sprinkler — capete, ACS, alarme hidraulice), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria pentru componentele de detecție-alarmare), **SR EN 54-16/24** (alarmare vocală și difuzoare), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 62305-3** (măsuri de protecție — execuție SPD/coborâri), **NP 086** (proiectarea instalațiilor de stingere cu apă), **NP 127/2009** (parcaje — execuție jet-fan), **C56** (verificarea calității lucrărilor de instalații), **SR EN 12237** (clasa de etanșeitate tubulatură de ventilare), **SR EN 12599** (proceduri de recepție și testare a instalațiilor de ventilare), **SR EN 806-4** (probe de instalație interioară de apă), **SR EN 12056-2** (verificare hidraulică canalizare), **SR EN 1825/858** (execuție și verificare separatoare grăsimi/hidrocarburi), **F-Gas Reg. UE 517/2014** (verificarea etanșeității circuitelor frigorifice), **NFPA 92/BS 7346** (metodologia de referință pentru simularea CFD a desfumării atriumurilor mari, aplicată complementar în lipsa unei metodologii naționale complete pentru volume de această amploare).

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema rețelei de sprinklere — zone de control, clase de pericol, noduri

Instalația de sprinklere protejează **integral** clădirea (cu excepția camerelor electrice — PT1/PT2/PT3, protejate cu gaz inert, cf. DTAC §13.1), compartimentată hidraulic pe **5 zone de control**, fiecare cu **aparat de control și semnalizare (ACS) propriu**, robinet de secționare cu supraveghere de poziție (tamper) și clopot de alarmă hidraulic:

| Zonă de control | Clasă de pericol (SR EN 12845) | Suprafață protejată | Densitate d | Arie de operare A_op |
|---|---|---|---|---|
| ZC1 — Galerie nivel S/P | OH3 | ~2.200 mp | 5 mm/min | 260 mp |
| ZC2 — Galerie nivel 1/2 + food-court + cinema (foaier) | OH3 | ~4.300 mp | 5 mm/min | 260 mp |
| ZC3 — Depozit propriu hipermarket (rafturi ≤ 6,0 m) | HHS III | ~1.500 mp | 10 mm/min | 260 mp |
| ZC4 — Zonă de vânzare hipermarket | OH3 | ~2.500 mp | 5 mm/min | 260 mp |
| ZC5 — Parcaj subteran | OH2 | 22.000 mp (compartimente ≤ 2.600 mp) | 5 mm/min | 240 mp |

**Traseul principal (schema coloană):**

```
Rezervor incendiu 650 mc (2 compartimente) ─► Cameră pompe (P.principală 90 kW + P.Diesel + P.jockey)
   ─► Colector de refulare DN 200 ─┬─► ACS ZC1 (Galerie S/P) ─► rețea plafon galerie parter
                                    ├─► ACS ZC2 (Galerie 1/2 + food-court + cinema) ─► rețea plafon niveluri superioare
                                    ├─► ACS ZC3 (Depozit hipermarket, HHS III) ─► rețea plafon depozit
                                    ├─► ACS ZC4 (Vânzare hipermarket) ─► rețea plafon zonă vânzare
                                    └─► ACS ZC5 (Parcaj) ─► rețea plafon parcaj, pe cantoane
```

**Rețeaua de plafon ZC1/ZC2 (grilă tip OH3, interax capete 3,7×3,7 m, capete K115 = 1,60 l/s·bar⁰·⁵):**

| Nod | Element | Ø conductă | Nr. capete deservite | Debit tronson (l/s) |
|---|---|---|---|---|
| N1 | Cap sprinkler terminal (branch line) | DN 25 | 1 | 1,2 |
| N2 | Branch line, 3 capete | DN 32 | 3 | 3,5 |
| N3 | Branch line, 6 capete (branșament complet) | DN 50 | 6 | 6,9 |
| N4 | Cross-main, alimentare 2 branch lines | DN 80 | 12 | 13,9 |
| N5 | Cross-main, alimentare aria de operare (260 mp ≈ 19 capete) | DN 100 | 19 | 21,7* |
| N6 | Riser ZC1/ZC2 → ACS | DN 150 | — (tot. zonă) | 35,0** |

\*Debitul teoretic pe aria de operare de calcul (260 mp × 5 mm/min ÷ 60 = 21,7 l/s); \*\*debitul real de proiectare la ACS, majorat la 35,0 l/s pentru acoperirea pierderilor de presiune pe rețeaua extinsă a galeriei și a marjei de siguranță hidraulică (identic cu valoarea din DTAC §13.2, confirmată prin calculul nod-cu-nod de mai jos, v. PTh-I.3.1).

**Rețeaua ZC3 (HHS III — depozit hipermarket, grilă 3,7×3,5 m, capete K115):** configurație identică ca principiu, dar la densitate dublă (10 mm/min), rezultând debitul de zonă **Q_op = 10 × 260 / 60 ≈ 43,3 l/s** (v. PTh-I.3.2 pentru calculul nod-cu-nod complet).

**Rețeaua ZC5 (OH2 — parcaj):** grilă 4,0×4,0 m (interax mai mare, admis la clasa OH2, plafon jos ~2,7 m), capete K80 (0,80 l/s·bar⁰·⁵ — presiune mai mare necesară la capătul terminal), aria de operare 240 mp la 5 mm/min ⟹ **Q_op ≈ 20,0 l/s**.

Conducta de alimentare de la stația de pompare până la colectorul de refulare: oțel negru vopsit (interior)/galvanizat (zone umede — parcaj), DN 200, cu robinet de reținere, manometru și racord de probă (drenaj de test 2"), toate conform SR EN 12845 cap. 13.

### PTh-I.2.2 Schema hidranților interiori și exteriori

**Hidranți interiori** — rețea inelară DN 80-100, distribuită pe toate nivelurile (galerie, food-court, cinema, hipermarket, parcaj), cu **28 hidranți DN 25/52** echipați (cutii cu furtun semirigid 30 m, robinet, ajutaj), dispuși astfel încât orice punct al clădirii să fie atins de minimum 2 jeturi simultane de câte 2,1 l/s (identic cu ipoteza DTAC §13.4):

| Grup hidranți | Nr. hidranți | Poziție | Ø racord rețea |
|---|---|---|---|
| Hi-Galerie P | 8 | la fiecare 30 m pe circulația comună, parter | DN 80 |
| Hi-Galerie 1/2 | 10 | idem, etaje 1 și 2, incl. foaier cinema | DN 80 |
| Hi-Hipermarket | 4 | depozit + zonă vânzare | DN 65 |
| Hi-Food-court | 2 | culoar tehnic BOH adiacent modulelor | DN 65 |
| Hi-Parcaj | 4 | la capetele rampelor și la casele scărilor | DN 65 |

Debit de calcul (2 jeturi simultane, cele mai defavorabile) = **4,2 l/s**; rețea inelară alimentată din colectorul de refulare al stației de pompare, cu vane de secționare între tronsoane (permit izolarea unui sector fără întreruperea întregii rețele — coerent cu funcționarea continuă a mall-ului pe toată durata programului).

**Hidranți exteriori** — inel exterior DN 200 îngropat sub adâncimea de îngheț (0,90-1,10 m), cu **6 hidranți supraterani DN 100**, dispuși pe conturul incintei (front principal, laturi galerie, zonă rampă marfă, zonă parcaj suprateran), la distanțe reciproce ≤ 150 m și la ≤ 5 m de carosabilul accesibil autospecialelor ISU. Debit de calcul **40 l/s** (2 hidranți concomitenți la 20 l/s), racord tip B pentru autospecialele ISU la fiecare hidrant și la rezervor (racord Siameze dedicat, independent de circuitul intern al pompelor).

### PTh-I.2.3 Schema HVAC — cele 18 CTA, distribuție pe zone

Configurația celor 18 CTA (v. DTAC §5.2) se detaliază la nivel de traseu principal de tubulatură și de conectare la rețeaua de agent termic/frigorific:

```
Sursă termică (pompe căldură 2,8 MW + cazane condensație 2,8 MW) ─► distribuitor multi-circuit
   ├─► circuit 45/40°C (CTA) ──┬─► CTA Galerie (6 buc.) ──► plenum tehnic galerie ──► difuzoare/grile galerie
   │                            ├─► CTA Hipermarket (3 buc.) ──► zonă vânzare + BOH propriu
   │                            ├─► CTA Food-court (2 buc.) ──► zonă mese + hote dedicate module
   │                            ├─► CTA Cinema (3 buc.) ──► sistem displacement săli + foaier
   │                            └─► CTA Tehnic/BOH (4 buc.) ──► culoare tehnice, camere echipamente
   └─► circuit 70/55°C (cazane) ──► baterii de vârf CTA (asistare regim rece extrem)

Sursă de frig (chillere 3×1.400 kW + pompe căldură reversibile 1.500 kW) ─► distribuitor frig
   └─► aceleași 18 CTA (baterii de răcire) + rețea secundară fan-coil unități Model A (v. DTAC §5.7)
```

Fiecare CTA este echipată cu recuperator entalpic (η ≥ 73 %), ventilatoare EC (SFP ≤ 1,6 kW/(mc/s)), filtrare ePM1 55-60 %, baterii de încălzire/răcire pe cele două regimuri de temperatură și atenuatoare de zgomot — parametrii de execuție se confirmă pe fișele tehnice de la PTh-I.4. Tubulatura principală (galerie) se dimensionează la viteze economice 6-8 m/s pe canalele principale și 3-5 m/s pe ramificațiile terminale, cu clasă de etanșeitate **B (SR EN 12237)** pe toate traseele aparente din plenumul tehnic al galeriei.

**Food-court (exhaustare fum de gătit, v. DTAC §5.4):** fiecare din cele 12-16 module are hotă profesională proprie, racordată la un **canal colector comun din inox**, cu 2 ventilatoare de exhaustare F400 (unul de rezervă), debit total ≈ 90.000 mc/h, aport make-up air 85 % din debitul evacuat.

**Cinema (ventilare displacement, v. DTAC §5.5):** fiecare din cele 6-8 săli are propriul circuit de introducere la partea inferioară (grile sub scaune/pe lateral) și evacuare la partea superioară, cu reglaj VAV pe senzor CO₂ independent pe sală, debit total la capacitate nominală **≈ 48.960 mc/h**.

### PTh-I.2.4 Schema izometrică apă rece/caldă și contorizare pe chiriași

```
Branșament dublu Dn 200 (fiecare linie: contor + filtru + disconnector BA)
   ─► Grup de pompare (hidrofor 3+1, VSD, 90 mc/h la 55 mCA)
      ─► Distribuitor general ─┬─► Coloană Galerie P (contor zonă) ──► cămine contorizare unități (câte 1/unitate, pe culoar tehnic)
                                ├─► Coloană Galerie 1 (contor zonă) ──► idem
                                ├─► Coloană Galerie 2 + Cinema (contor zonă) ──► idem + GS foaier cinema
                                ├─► Coloană Hipermarket (contor zonă, sursă ACM proprie)
                                ├─► Coloană Food-court (contor zonă, sursă ACM operator)
                                └─► Coloană Tehnic/BOH + udare spații verzi
```

Fiecare unitate comercială primește racordul de apă rece la limita de proprietate (lot line), cu **contor individual în cămin exterior** pe culoarul tehnic (v. DTAC §2.7), colectat prin concentratoare de etaj și transmis la BMS. Boilerele electrice locale ale grupurilor sanitare ale galeriei (v. DTAC §2.5) se alimentează din aceeași coloană zonală, cu recirculare menținută ≥ 55 °C pe fiecare buclă și ciclu de dezinfecție termică programat prin BMS.

### PTh-I.2.5 Schema coloanelor de canalizare menajeră

Coloanele verticale (PP fonoabsorbant, v. DTAC §3.1) colectează descărcările fiecărui nivel către un colector orizontal principal, cu ventilare primară/secundară pe fiecare coloană:

| Coloană | Zonă deservită | Ø coloană | Racord special |
|---|---|---|---|
| CM-G1…G6 | Grupuri sanitare galerie (P, 1, 2 — câte 2/nivel) | PP 160 | — |
| CM-FC1, CM-FC2 | Food-court (bucătării module + zonă mese) | PP 200 | prin separatoarele de grăsimi ZC-FC (v. PTh-I.2.7) |
| CM-HM1 | Hipermarket (procesare proprie + GS) | PP 160 | prin separator NS 7 dedicat |
| CM-C1 | Cinema (foaier + săli) | PP 110 | — |
| CM-P1, CM-P2 | Parcaj (pompare — cotă inferioară subsol) | PP 110 | stație de pompare cu tocător |

Colector orizontal principal DN 300 (i = 1,0-1,5 %) → racord la canalizarea exterioară, prin cămine de vizitare la fiecare schimbare de direcție și la interval maxim de 60 m. Debitul de calcul confirmat identic cu DTAC (q = 26 l/s).

### PTh-I.2.6 Schema pluvială sifonică — traseu detaliat

```
Terasă ~13.000 mp ─► receptoare sifonice (grupate pe sectoare de acoperiș, deflector antivortex + element de încălzire)
   ─► colectoare orizontale fără pantă (funcționare în plin) ─► 6 coloane sifonice DN 200-250
                                                                        │
                                                    Colector îngropat DN 400 (comun)
                                                                        │
                            Bazin decantor (forebay) ─► Bazin de retenție 250-300 mc + regulator debit (vortex, Q_evac < 100 l/s)
                                                                        │
                                                    Preaplin de siguranță ──► traseu evacuare urgență
                                                                        │
                                                    Canalizare pluvială publică / emisar
```

Debit de calcul Q_p = 390 l/s (v. DTAC §3.3), volumul bazinului de retenție confirmat la **250 mc** (cu recomandarea de majorare la faza de execuție finală cu coeficientul de siguranță climatică 1,2, v. DTAC §3.6, dacă avizul de gospodărire a apelor impune reverificarea). Telemetria de nivel a bazinului se transmite la BMS.

**Colectarea platformelor exterioare** (parcaj suprateran, alei carosabile, rampă marfă) este independentă de rețeaua de acoperiș și se dirijează spre separatorul de hidrocarburi (v. PTh-I.2.7) înainte de racordul la canalizarea pluvială.

### PTh-I.2.7 Schema separatoarelor de grăsimi și de hidrocarburi

```
Food-court (12-16 module) ─► canalizare dedicată bucătării ─► 2 × separator grăsimi NS 10 (in paralel, mentenanță pe rând)
                                                                        │
                                                          senzor de nivel/grosime peliculă → alarmă BMS
                                                                        │
                                                          canalizare menajeră → colector principal

Hipermarket (carmangerie/patiserie/rotiserie) ─► separator grăsimi NS 7 dedicat ─► idem

Platforme exterioare/parcaj suprateran ─► rigole ─► cămin desnisipare ─► decantor nămol
   ─► separator hidrocarburi NS 65 clasa I (filtru coalescent, by-pass integrat) ─► cămin prelevare probă
   ─► canalizare pluvială (v. PTh-I.2.6, înainte de bazinul de retenție)
```

### PTh-I.2.8 Schema desfumării parcajului subteran — jet-fan (NP 127/2009)

Parcajul de 22.000 mp se împarte în **compartimente de fum de ≤ 2.600 mp** (v. DTAC §6.3), fiecare cu propriul șir de jet-fans și cu propriul punct de evacuare mecanică:

| Compartiment | Suprafață | Nr. jet-fans (regim curent) | Nr. jet-fans (regim incendiu, F400) | Puț evacuare dedicat |
|---|---|---|---|---|
| C1 | 2.500 mp | 8 | 8 | PE-1 (DN echiv. 2×5,0 mp) |
| C2 | 2.500 mp | 8 | 8 | PE-2 |
| C3 | 2.550 mp | 8 | 8 | PE-3 |
| C4 | 2.550 mp | 8 | 8 | PE-4 |
| C5 | 2.500 mp | 7 | 7 | PE-5 |
| C6 | 2.500 mp | 7 | 7 | PE-6 |
| C7 | 2.500 mp | 7 | 7 | PE-7 |
| C8 | 2.400 mp | 7 | 7 | PE-8 |
| **Total** | **22.000 mp** | **60** | **60** | **8 puțuri** |

Fiecare jet-fan dezvoltă o forță de împingere (thrust) de ordinul **60-80 N**, dispus în șiruri la interax 25-30 m de-a lungul culoarelor de circulație, comandat de senzorii de CO (praguri 30/100 ppm, v. DTAC §6.2) în regim curent și comutat la regimul de desfumare (certificare F400, 400 °C/2h) la confirmarea alarmei de incendiu pe compartimentul afectat — v. calculul de verificare a debitului echivalent la PTh-I.3.9.

### PTh-I.2.9 Schema desfumării atriumului — SHEVS

```
Atrium (volum ~35.000 mc, luminator zenital) ─► 4 ventilatoare desfumare F400 pe terasă (110.000 mc/h fiecare, 1 rezervă)
        │                                                        │
   cortine de fum DH60 (la marginea golurilor, fiecare nivel)     comandă: automat (IDSAI) + manual (panou pompieri)
        │                                                        │
   compensare aer proaspăt la parter (guri joase, v < 5 m/s)      alimentare: sursă de siguranță (grup electrogen, cap. 10 DTAC)
```

Debitul de proiectare confirmat identic cu DTAC (§7.2): ṁ ≈ 74 kg/s, V̇ ≈ 428.000 mc/h la ρ = 0,62 kg/mc (300 °C). Verificarea finală a soluției (menținerea stratului liber de 2,5 m, absența recirculării) se realizează prin **simulare CFD pe geometria finală** a atriumului — v. protocol PTh-I.7.

### PTh-I.2.10 Schema monofilară — 3 posturi de transformare, TGJT, tablouri chiriași

```
Rețea MT 20 kV (buclă/inel, alimentare din 2 direcții)
   ├─► PT1 — Frig (2×1.600 kVA) ─► TGJT1 ─► Chillere, pompe căldură, pompe circulație
   ├─► PT2 — Galerie (2×1.600 kVA) ─► TGJT2 ─┬─► Iluminat galerie
   │                                          ├─► Prize chiriași (tablouri individuale, contorizare Modbus)
   │                                          ├─► CTA galerie/food-court/cinema
   │                                          └─► Scări rulante/ascensoare publice
   └─► PT3 — Hipermarket/parcaj (2×1.250 kVA) ─► TGJT3 ─┬─► Frig alimentar (CO₂ transcritic)
                                                          ├─► Iluminat + ventilare parcaj (jet-fans regim curent)
                                                          └─► Hipermarket (propriu, excl. frig alimentar)

Tablou dedicat consumatori de siguranță (independent, cablu E90/PH90):
   Grup electrogen 2×1.000 kVA (AAR < 15 s) ──► Pompe sprinklere, desfumare atrium, desfumare parcaj (regim incendiu),
                                                  iluminat evacuare, ascensor pompieri, EVAC, IDSAI/BMS siguranță
   UPS 2×200 kVA ──► centrală detecție, EVAC, CCTV, servere, casierii
```

Fiecare TGJT este echipat cu întrerupătoare debroșabile și schemă de selectivitate **ZSI**; tablourile chiriașilor au contorizare individuală Modbus (v. DTAC §9.4). Distribuția verticală principală prin busbar capsulat, cabluri **LSZH** pe circuitele curente și **E90/PH90** pe circuitele de siguranță, pe trasee separate.

### PTh-I.2.11 Schema curenților slabi — CCTV, control acces, IDSAI, BMS, EVAC/PA

```
Rack central de comunicații (MDF/Meet-Me Room, lângă PT2) ──┬─► Fibră optică redundantă (2 trasee) ──► IDF pe fiecare nivel/zonă
                                                              ├─► CCTV (350-450 camere IP) ──► NVR ≥30 zile + analitică + LPR parcaj
                                                              ├─► Control acces (deblocare fail-safe la alarmă IDSAI)
                                                              ├─► Efracție (unități în afara programului + zone tehnice)
                                                              ├─► WiFi acoperire integrală + telefonie IP
                                                              ├─► Sonorizare PA/EVAC (v. releu de prioritate hardware, DTAC §15.3)
                                                              ├─► Signage digital
                                                              └─► PGS (ghidare parcare, senzori pe loc)

Centrală IDSAI (2× redundantă la scara mall-ului, pe cantoane/zone) ──► matrice cauză-efect (v. PTh-I.2.12)
BMS central (BACnet/IP + Modbus) ──► dispecerat tehnic 24/7 (HVAC, contorizare chiriași, pompe, separatoare, iluminat DALI, CMMS)
```

### PTh-I.2.12 Schema IDSAI — matrice cauză-efect (extras reprezentativ)

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 | Efect 5 |
|---|---|---|---|---|---|
| Alarmă detector galerie (zonă/nivel) | Alarmare vocală zonată (evacuare imediată zonă afectată, alertă zone adiacente) | Oprire CTA aferentă zonei | Deblocare control acces pe traseele de evacuare | Rechemare ascensoare publice la parter | Transmisie ISU/dispecerat |
| Alarmă VESDA atrium | Pornire 4 ventilatoare desfumare atrium | Coborâre cortine de fum DH60 | Alarmare vocală pe toate cele 3 niveluri | Oprire CTA galerie | Transmisie ISU/dispecerat |
| Alarmă detector termic food-court | Închidere ventilator exhaustare (regim F400 continuă evacuarea controlată) | Alarmare vocală zonă food-court | Sirene locale bucătării | — | Transmisie |
| Alarmă senzor CO/incendiu parcaj (canton) | Comutare jet-fans canton pe regim desfumare F400 | Deschidere porți/rampe pentru aer compensare | Alarmare vocală parcaj | Blocare acces auto nou pe canton | Transmisie ISU/dispecerat |
| Scădere presiune rețea sprinklere/hidranți | Pornire pompă jockey | Pornire electropompă principală | Comutare pompă Diesel (dacă defect electric) | Semnalizare ACS afectat | Transmisie dispecerat |
| Alarmă buton manual (oriunde) | Alarmare vocală zonă | Deblocare control acces | Transmisie | — | — |
| Confirmare pompier (cheie panou) | Silențiere sirene locale | Menținere alarmare vocală pe zonele încă neevacuate | Jurnal evenimente | — | — |

Temporizare **T1 (recunoaștere)/T2 (investigare)** aplicabilă doar în zonele cu personal permanent (dispecerat, BOH); pe zonele publice de mare aglomerare (galerie, atrium, cinema, food-court), alarma este **directă**, fără temporizare de investigare, conform practicii P118-3 pentru risc mare de aglomerare.

### PTh-I.2.13 Schema instalației fotovoltaice

```
Module FV (≈ 4.200 buc. × 375 Wp, ~7.500 mp utili din terasa de 13.000 mp) ─► string-uri (24 module/string, ≈ 175 string-uri)
   ─► cutii de conexiuni DC (siguranțe + SPD DC clasa II) ─► invertoare string (≈ 32 × 50 kW)
   ─► tablou general AC FV (protecție + contorizare producție + anti-islanding)
   ─► TGJT2 (racord prosumator, contor bidirecțional)
```

Putere instalată confirmată **~1.575 kWp** (v. DTAC §16.2), producție estimată **~1,81 GWh/an**. Structura de prindere (pe zonele fără echipamente tehnice/ventilatoare desfumare) se verifică de structurist pentru încărcarea suplimentară permanentă și de vânt, cu distanțe de siguranță față de trapele/ventilatoarele de desfumare a atriumului și a parcajului.

### PTh-I.2.14 Schema frigului alimentar — sistem CO₂ transcritic hipermarket

```
Vitrine MT (+2/+4°C, 750 kW) + Camere LT (−22°C, 450 kW) ─► compresoare CO₂ transcritic (etaj MT + etaj LT booster)
   ─► gaz cald recuperat ──► schimbător de căldură ──► preîncălzire ACM/circuit termic secundar hipermarket (v. DTAC §8.3)
   ─► condensare/gas cooler pe terasă (adiacent, dar la distanță de FV și de trapele de desfumare)
```

### PTh-I.2.15a Schema gestionării deșeurilor — presă carton, compactoare, cameră frigorifică

```
Unități galerie (130-160) + hipermarket ─► culoar tehnic serviciu ─► încăpere BOH dedicată deșeurilor (REI, sprinklerată)
   ├─► presă de balotat carton (baler) ──► baloturi stivuite ──► acces auto dedicat colectare (rampă marfă, în afara vârfului comercial)
   ├─► compactor deșeuri reziduale + container ──► senzor nivel umplere → alarmă BMS → solicitare ridicare automată
   ├─► compactor plastic-metal + container ──► idem
   └─► containere sticlă (fără compactare, manipulare separată)

Food-court (12-16 module) + hipermarket (carmangerie/patiserie) ─► cameră frigorifică deșeuri alimentare (+4…+8°C)
   ─► pardoseală cu pantă → rigolă → separator grăsimi (v. PTh-I.2.7) → canalizare menajeră
   ─► senzor temperatură + alarmă BMS (depășire +8°C) → ventilare proprie în depresiune → evacuare directă exterior
```

Toate echipamentele de gestionare a deșeurilor sunt integrate în BMS (nivel de umplere, temperatură cameră frigorifică, programare curse de colectare prin CMMS — v. DTAC §17), cu acces auto dedicat, fizic separat de fluxul public și de rampa curentă de aprovizionare a chiriașilor (v. DTAC §1.5).

### PTh-I.2.15b Schema stațiilor de încărcare vehicule electrice (EV)

```
TGJT2 (Galerie, rezervă de putere dedicată) ─► tablou dedicat stații EV ─► distribuție pe grupuri de 6-8 stații/circuit
   ─► stații de încărcare AC 22 kW (minimum 10% din locurile de parcare, v. DTAC §16.2) + 2-4 stații DC rapide (50-150 kW) la accesul principal
   ─► sistem de management al sarcinii (load management), limitează puterea totală simultană sub rezerva alocată din bilanțul PT2
```

Sistemul de management al sarcinii distribuie dinamic puterea disponibilă între stațiile active (mai multe vehicule la încărcare simultană, la putere redusă per stație, în locul unei limitări fixe pe stație), evitând depășirea rezervei de putere alocate din PT2 și integrarea directă cu contorizarea individuală/facturarea serviciului de încărcare (BMS, coerent cu principiul de contorizare de la DTAC §1.5).

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Calcul hidraulic complet — sprinklere OH3 galerie (SR EN 12845, Hazen-Williams)

**Date de intrare:** d = 5 mm/min, A_op = 260 mp, capete K115, C = 120 (oțel negru), interax 3,7×3,7 m, presiune minimă la capul terminal p_min = 0,7 bar (OH, K115).

**Pasul 1 — debitul capului terminal:**

q₁ = K·√p₁ = 1,15 × √0,70 = **0,96 l/s** (rotunjit la 1,2 l/s de proiectare, cf. tabel PTh-I.2.1, cu marjă de presiune reală a rețelei).

**Pasul 2 — calcul nod cu nod pe branch line** (3 capete pe ramură, distanță 3,7 m):

| Nod | Q cumulat (l/s) | Ø (mm) | v (m/s) | j (bar/m) | L (m) | Δp tronson (bar) | p necesară cap (bar) |
|---|---|---|---|---|---|---|---|
| Cap 1 (terminal) | 1,20 | 25 | 2,45 | — | — | — | 0,70 |
| Cap 2 | 2,35 | 32 | 2,92 | 0,0201 | 3,7 | 0,074 | 0,774 |
| Cap 3 | 3,49 | 40 | 2,78 | 0,0125 | 3,7 | 0,046 | 0,820 |

**Pasul 3 — cross-main pe aria de operare (19 capete ≈ 260 mp la ~13,7 mp/cap):**

Q_op = 19 × 1,84 (debit mediu ponderat pe cap, confirmat prin iterație) ≈ **21,7 l/s** teoretic (identic cu d × A_op / 60 = 5 × 260 / 60 = 21,7 l/s) — **verificare de coerență confirmată** între metoda simplificată și calculul nod-cu-nod.

**Pasul 4 — presiunea necesară la ACS ZC1/ZC2** (traseul cel mai lung, incl. piese speciale +30%):

| Tronson | L echiv. (m) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Branch line (3 capete) | 11,1 | variabil | 25→40 | — | 0,120 |
| Cross-main | 25,0 | 13,9 | 80 | 0,0067 | 0,168 |
| Cross-main principal | 40,0 | 21,7 | 100 | 0,0072 | 0,288 |
| Riser vertical (parter → nivel 2, ~12 m) | 12,0 | 35,0 | 150 | 0,0019 | 0,023 |
| **Total pierderi traseu** | | | | | **0,599 bar** |

Presiune necesară la ACS = 0,70 (cap terminal) + 0,599 (pierderi) + diferență de cotă (12 m ≈ 1,18 bar, cazul cel mai defavorabil — capul de la nivelul 2) = **≈ 2,48 bar**, la care se adaugă pierderile pe colectorul de refulare (DN 200, ~35 m, Q 35 l/s): Δp ≈ 0,06 bar. **Presiune necesară la refulare pompă (scenariul ZC1/ZC2) ≈ 2,54 bar ≈ 25,9 mCA.**

### PTh-I.3.2 Calcul hidraulic — HHS III depozit hipermarket (scenariu guvernant)

Densitate dublă (10 mm/min) față de OH3, cu aceeași metodologie de calcul nod-cu-nod:

Q_op(HHS) = 10 × 260 / 60 = **43,3 l/s** (v. tabel PTh-I.2.1, identic cu abordarea validată pe funcțiunea hală industrială pentru aceeași clasă de depozitare, replicabilă pentru depozitul propriu al hipermarketului).

Presiunea necesară la ACS ZC3, pe traseul cel mai lung (branch line 4 capete + cross-main dublu debit față de OH3): prin analogie cu breviarul de tip HHS III, presiunea necesară rezultă **≈ 3,1-3,4 bar la ACS**, superioară scenariului OH3 — **acest scenariu guvernează dimensionarea grupului de pompare** (v. PTh-I.3.4).

### PTh-I.3.3 Calcul hidraulic — OH2 parcaj subteran

Q_op(OH2) = 5 × 240 / 60 = **20,0 l/s**, la presiune minimă de capăt p_min = 0,50 bar (K80). Traseul fiind orizontal (un singur nivel, subsol), pierderile de cotă sunt neglijabile; presiunea necesară la ACS ZC5 rezultă **≈ 1,4-1,6 bar**, sensibil sub scenariul HHS III — confirmă că **parcajul nu este scenariul de dimensionare a pompei**.

### PTh-I.3.4 Dimensionarea grupului de pompare al instalației de sprinklere

Scenariul guvernant (HHS III, cap. PTh-I.3.2) + hidranți interiori concomitenți (4,2 l/s, v. PTh-I.3.5) conduce la debitul de proiectare al pompei principale:

**Q_pompă = 43,3 + 4,2 ≈ 47,5 l/s ⟹ se adoptă Q = 50 l/s (180 mc/h).**

Presiunea necesară la refularea pompei, însumând presiunea la ACS ZC3 (≈ 3,4 bar), pierderile pe colectorul principal (≈ 0,15 bar) și înălțimea geodezică (rezervor la cotă −4,0 m, ACS depozit hipermarket la cotă +0,50 m ⟹ ≈ 4,5 mCA = 0,44 bar):

**H_pompă ≈ 3,4 + 0,15 + 0,44 ≈ 4,0 bar ⟹ majorat la 9,0 bar (≈ 90 mCA)** pentru acoperirea integrală a scenariului concomitent cu alimentarea nivelurilor superioare ale galeriei (cota +12 m) și a marjei de siguranță impuse de SR EN 12845 pentru rețele extinse pe mai multe niveluri.

**Se adoptă:** electropompă principală 90 kW (Q = 50 l/s, H = 90 mCA), pompă Diesel de rezervă identică ca duty point (independentă de alimentarea electrică), pompă jockey (Q ≈ 2-3 l/s, menținere presiune). Hidranții exteriori (40 l/s) se alimentează printr-un racord dedicat de pe colectorul principal, cu un al doilea punct de funcționare al pompei (Q = 90 l/s la ≈ 45-50 mCA, scenariul concomitent maxim conform NP086), verificat pe curba pompei la comisionare (v. PTh-I.7.1).

### PTh-I.3.5 Calcul hidraulic hidranți interiori — punctul cel mai defavorabil

Traseu de la stația de pompare la hidrantul cel mai îndepărtat (Hi-Galerie 1/2, nivel 2, cotă +12,0 m):

| Tronson | L (m) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Colector refulare → inel hidranți | 40 | 4,2 | 100 | 0,0031 | 0,124 |
| Inel → hidrant (ramură) | 55 | 2,1 | 65 | 0,0056 | 0,308 |
| Coloană verticală (parter → nivel 2) | 12,0 | 2,1 | 65 | 0,0056 | 0,067 |
| **Total pierderi** | | | | | **0,499 bar** |

Presiune necesară la robinet (SR EN 671-2, p_min = 2,5 bar) + pierderi (0,499 bar) + cotă geodezică (12 m ≈ 1,18 bar) = **≈ 4,18 bar ≈ 42,6 mCA**, confirmată sub cei 90 mCA disponibili la refularea pompei.

### PTh-I.3.6 Verificare rezervă de apă de incendiu — reconciliere cu scenariul PTh

Rezerva calculată în DTAC (§13.5) pe scenariul global de simultaneitate sprinklere+hidranți int.+hidranți ext. (Q_inc = 79,2 l/s, V ≈ 560,5 mc, rezervor adoptat 650 mc) rămâne **acoperitoare** și la nivel de PTh: chiar înlocuind debitul de sprinklere generic (35 l/s) cu debitul real guvernant (HHS III, 43,3 l/s), diferența (43,3 − 35 = 8,3 l/s pe durata de 60 min) adaugă un necesar suplimentar de doar **≈ 30 mc**, absorbit integral de marja deja constituită între calculul teoretic (560,5 mc) și volumul adoptat (650 mc, marjă de 89,5 mc). **Nu este necesară majorarea rezervorului de incendiu față de soluția DTAC.**

### PTh-I.3.7 Calcul hidraulic complet — rețeaua de apă menajeră (tronsoane reprezentative)

Pornind de la ΣE ≈ 3.200 și q_c = 24,1 l/s (DTAC §2.2), breviarul PTh detaliază tronsoanele principale, verificate la viteze economice (0,7-2,0 m/s):

| Tronson | ΣE tronson | q_c (l/s) | Ø adoptat | v (m/s) | L (m) | Δp liniar (mCA) |
|---|---|---|---|---|---|---|
| Branșament → cămin apometru (×2) | 3.200 | 24,1 | PEHD 200 (×2) | 0,77 | 15 | 0,45 |
| Cămin → grup de pompare | 3.200 | 24,1 | oțel 150 | 1,36 | 10 | 0,62 |
| Grup pompare → distribuitor general | 3.200 | 24,1 | oțel 125 | 1,96 | 8 | 0,71 |
| Distribuitor → coloană Galerie P | 900 | 8,1 | PP-R 75 | 1,84 | 25 | 1,20 |
| Distribuitor → coloană Hipermarket | 700 | 7,1 | PP-R 63 | 2,28 | 30 (+cotă 0,5m) | 1,85 |
| Distribuitor → coloană Food-court | 850 | 7,9 | PP-R 63 | 2,53 | 35 | 2,10 |
| Coloană → cel mai defavorabil GS nivel 2 | 120 | 3,0 | PP-R 40 | 1,90 | 12 m (+cotă 12 m) | 2,45 |

Presiunea disponibilă la refularea grupului de pompare (55 mCA, v. DTAC §2.6) acoperă cu marjă confortabilă traseul cel mai defavorabil (≈ 8-9 mCA pierderi totale + 12 m cotă ≈ 21 mCA necesar la robinet), confirmând soluția de hidrofor cu VSD adoptată la DTAC.

### PTh-I.3.8 Calcul hidraulic canalizare — verificare grad de umplere și autocurățare

Verificare h/D și viteză de autocurățare (v ≥ 0,7 m/s), conform SR EN 12056-2, pe tronsoanele orizontale principale:

| Tronson | Q_c (l/s) | Ø | Panta | Capacitate la h/D=0,5 (l/s) | h/D real | v (m/s) |
|---|---|---|---|---|---|---|
| Colector Galerie → principal | 12,0 | PP 250 | 1,0% | 58,0 | 0,21 | 0,95 |
| Colector Food-court (post-separator) | 8,0 | PP 200 | 1,5% | 42,0 | 0,19 | 0,92 |
| Colector Hipermarket (post-separator) | 4,0 | PP 160 | 1,5% | 26,0 | 0,15 | 0,88 |
| Colector principal → racord exterior | 26,0 | PVC-KG 315 | 1,0% | 95,0 | 0,27 | 1,05 |

Toate tronsoanele funcționează cu marjă largă sub capacitatea nominală (h/D < 0,5), asigurând autocurățare permanentă — confirmare identică cu concluzia DTAC (§3.1), extinsă acum la fiecare tronson.

### PTh-I.3.9 Verificare debit echivalent — desfumare parcaj (jet-fan)

Pe compartimentul afectat (2.600 mp, cf. PTh-I.2.8), regimul de desfumare de 4-6 volume/oră (cf. DTAC §6.3, la volum compartiment ≈ 2.600 mp × 2,7 m ≈ 7.020 mc):

**V̇_desfumare = 5 × 7.020 ≈ 35.100 mc/h ≈ 9,75 mc/s** pe compartimentul afectat, evacuat prin puțul dedicat (PE-x) cu asistarea celor 8 jet-fans ai compartimentului, care mențin viteza de curgere longitudinală pe culoar (≥ 2-3 m/s, suficientă pentru a controla stratificarea fumului sub plafonul jos de 2,7 m al parcajului) — verificare care confirmă dimensionarea puțurilor de evacuare (secțiune echivalentă ≥ 2,5-3,0 mp per compartiment, integrată în arhitectura parcajului).

### PTh-I.3.10 Calcul electric complet — 3 posturi de transformare, TGJT-uri, circuite reprezentative

Extinderea bilanțului de puteri din DTAC (§9.2) pe fiecare post de transformare, cu verificarea căderii de tensiune pe circuitele principale (admis 3 % iluminat, 5 % forță, conform I7):

**PT1 — Frig (2×1.600 kVA, Pc ≈ 2.320 kW):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CF-F1 | Chiller 1 (1.400 kW frig, ~450 kW electric) | 450 | 683 | C800 3P | Cu 4×(1×240) | 1,8 |
| CF-F2 | Chiller 2 | 450 | 683 | C800 3P | Cu 4×(1×240) | 1,9 |
| CF-F3 | Chiller 3 | 450 | 683 | C800 3P | Cu 4×(1×240) | 1,7 |
| CF-F4 | Pompe căldură reversibile | 620 | 940 | C1000 3P | Cu 4×(2×185) | 2,1 |
| CF-F5 | Pompe circulație VSD (distribuitor) | 350 | 531 | C630 3P | Cu 4×(1×185) | 1,6 |

**PT2 — Galerie (2×1.600 kVA, Pc ≈ 4.400 kW, incl. prize chiriași, iluminat, CTA galerie/food-court/cinema, scări/lifturi):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CI-G1…G3 | Iluminat galerie (3 subcircuite pe niveluri) | 3×360 | 3×547 | C630 3P | Cu 4×(1×185) | 2,3 |
| CP-U1…U8 | Tablouri chiriași (grupuri de câte 15-20 unități) | var. | var. | C250-C400 3P | conform contract chirie | ≤ 4,0 |
| CF-CTA-G | CTA galerie (6 buc., total ~450 kW) | 450 | 683 | C800 3P | Cu 4×(1×240) | 1,9 |
| CF-CTA-FC | CTA food-court (2 buc., total ~120 kW) | 120 | 182 | C250 3P | Cu 4×70 | 1,4 |
| CF-CTA-C | CTA cinema (3 buc., total ~140 kW) | 140 | 212 | C250 3P | Cu 4×95 | 1,5 |
| CF-SR | Scări rulante (8-10 buc.) | 260 | 394 | C400 3P | Cu 4×120 | 1,7 |
| CF-ASC | Ascensoare publice + ascensor pompieri | 112 | 170 | C250 3P | Cu 4×70 (E90 pt. lift pompieri) | 1,3 |

**PT3 — Hipermarket/Parcaj (2×1.250 kVA, Pc ≈ 1.930 kW):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CF-HM1 | Frig alimentar CO₂ transcritic (MT+LT) | 468 | 710 | C800 3P | Cu 4×(1×240) | 2,0 |
| CF-HM2 | Hipermarket propriu (iluminat+prize+utilaje) | 630 | 956 | C1000 3P | Cu 4×(2×185) | 2,4 |
| CF-PK1…PK8 | Ventilare/jet-fans parcaj (8 compartimente) | 8×36 | 8×55 | C63 3P/canton | Cu 4×16 | 1,6 |
| CF-PGS | Ghidare parcare + iluminat parcaj | 45 | 68 | C100 3P | Cu 4×25 | 1,4 |

**Tablou dedicat consumatori de siguranță (grup electrogen + UPS, cablu E90/PH90):**

| Circuit | Destinație | P (kW) | Alimentare |
|---|---|---|---|
| CF-PSI1 | Electropompă principală incendiu (90 kW) | 90 | AAR grup electrogen |
| CF-PSI2 | Pompă jockey | 4 | AAR grup electrogen |
| CF-DSF1 | 4 ventilatoare desfumare atrium (F400) | 4×22 | AAR grup electrogen |
| CF-DSF2 | Jet-fans regim desfumare (60 buc., simultan pe cantoanele afectate) | ~150 (vârf, nu toate simultan) | AAR grup electrogen |
| CF-EVAC | Alarmare vocală + amplificatoare EVAC | 15 | UPS 2×200 kVA |
| CF-IDSAI | Centrală IDSAI + repetitoare | 8 | UPS |
| CF-LIFT-P | Ascensor pompieri | 45 | AAR grup electrogen |
| CF-ILUM-S | Iluminat de evacuare/antipanică (circuit central) | 12 | UPS (comutare <5s) + baterii locale |

Curentul de calcul total confirmat identic cu DTAC: **Ic ≈ 12.000 kW instalat / 7.970 kW cerut ≈ 8,0 MW**, S ≈ 8.390 kVA (cos φ = 0,95), acoperit de cele 3 posturi (total ~8.900 kVA instalat).

### PTh-I.3.11 Verificare curent de pornire — electropompă principală incendiu (90 kW)

I_nominal ≈ 90.000 / (√3 × 400 × 0,88 × 0,92) ≈ **155 A**; I_pornire directă ≈ 6,5 × 155 ≈ **1.008 A** — cădere de tensiune inacceptabilă la pornire directă pe cablul de 25-30 m. **Soluție adoptată: soft-starter** (limitare la ≈ 3 × I_nominal ≈ 465 A), conform SR EN 12845, cu timp de atingere a debitului nominal ≤ 15 s. Pompa Diesel de rezervă are pornire independentă (motor termic, baterii duble).

### PTh-I.3.12 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

| Instalație | Element traversat | Poziție orientativă | Dimensiune gol | Observație |
|---|---|---|---|---|
| Coloane sprinkler/hidranți (riser vertical) | planșee galerie (P→1→2) | zone tehnice, lângă casele scărilor | Ø 300-400 mm/coloană | prevăzut la execuția planșeului, verificare seismică la punctul de prindere |
| Tubulatură CTA galerie (canale principale) | planșee/plenumuri tehnice | plafon fals galerie, pe toată lungimea | 1.200×600 mm | clapete antifoc la traversarea compartimentărilor |
| Canal exhaustare food-court (colector inox) | perete/planșeu spre BOH | culoar tehnic serviciu | Ø 600-800 mm | rezistență la 400°C/2h, distanță de siguranță față de combustibile |
| 4 ventilatoare desfumare atrium | acoperiș/terasă, deasupra luminatorului | zona centrală terasă | 4× 3,0×3,0 m | coordonare cu structura acoperișului, distanță față de FV |
| Puțuri evacuare jet-fan (8 buc.) | planșeu peste parcaj | la capetele compartimentelor | 8× 2,5-3,0 mp | secțiune echivalentă verificată la PTh-I.3.9 |
| Cabluri PT1/PT2/PT3 → TGJT-uri | planșee tehnice | camere tablouri dedicate | jgheaburi 600×200 mm | separare tari/slabi, distanță față de conducte PSI |
| Racord SRM gaze (dacă sursa termică include componentă pe gaz) | perete exterior | firidă → centrala termică | Ø 200 mm | conform NTPEE, manșon etanș |

Toate golurile prin elementele structurale portante necesită avizul explicit al inginerului structurist înainte de execuție.

### PTh-I.3.13 Calcul economie energetică — comandă inteligentă iluminat și BMS

Extinderea estimării DTAC (§16.1, pct. 5 și 7 — economie 55 % iluminat LED/DALI, 8-12 % optimizare BMS) cu un calcul orientativ pentru galeria (cea mai mare consumatoare de iluminat, ~1.080 kW instalat total clădire, din care ~450 kW pe galerie):

- funcționare de bază (fără daylight dimming/senzori, 14 h/zi × 360 zile) = 450 kW × 14 h × 360 = **2.268.000 kWh/an**;
- cu comandă DALI + daylight dimming la atrium (aport solar semnificativ prin luminator, reducere ~25% pe orele de zi însorite, ~30% din program) + scenarii de reducere în orele de trafic redus (~20% din program, reducere 40%) → consum estimat ≈ 2.268.000 × 0,72 ≈ **1.633.000 kWh/an**;
- **economie estimată ≈ 635.000 kWh/an (≈ 28 %)** pe iluminatul galeriei, valoare mai conservatoare decât media globală de 55 % din DTAC (care include și unitățile comerciale, unde controlul e integral la chiriaș) — coerentă cu ponderea reală a suprafețelor comune.

### PTh-I.3.14 Breviar climatizare unități — rezerva fizică Model A/Model B (verificare de capacitate)

Rețeaua secundară de agent termic/frigorific către lot line-urile galeriei (Model A, v. DTAC §5.7) se dimensionează la faza PTh pentru un necesar mediu ponderat de **120-150 W/mp** pe unitățile mici-medii (< 150 mp), rezultând, pentru cei ~6.500 mp de unități estimate a opta pentru Model A (aprox. 70 % din cei 9.000 mp galerie, conform practicii de piață descrise în DTAC §5.7), un necesar suplimentar de rețea secundară de **≈ 900-980 kW**, deja inclus în bilanțul global de frig de confort (5,85 MW, DTAC §8.1) prin componenta „Unități — 1.500 kW”, cu marjă confirmată. Pentru unitățile mari care optează pentru Model B (VRF propriu, ~2.500 mp din cei 9.000 mp), rezerva de structură/electrică pe terasă (v. PTh-I.6.5) se dimensionează la **≈ 25 W/mp** putere electrică instalată pentru unitățile exterioare, respectiv **≈ 45-50 kg/mp** încărcare suplimentară pe zona rezervată — valori confirmate de structurist înainte de execuția planșeului de terasă, coerent cu principiul de rezervare fizică a ambelor modele stabilit la DTAC (fără a bloca opțiunea comercială finală, decisă la momentul leasing-ului).

### PTh-I.3.15 Verificare economică — pompe și ventilatoare cu turație variabilă (VSD)

Toate pompele de circulație (distribuitor termic/frig, cap. PTh-I.2.3) și ventilatoarele EC ale celor 18 CTA funcționează cu turație variabilă (VSD), comandate de senzori de presiune diferențială/temperatură pe fiecare circuit — conform legii afinității pompelor (puterea absorbită variază cu cubul turației), o reducere de turație la 80 % (tipică pentru orele de trafic redus ale galeriei, cu sarcină termică sub vârf) reduce puterea absorbită la **≈ 0,8³ ≈ 51 %** din puterea nominală, față de o soluție cu turație fixă și vană de laminare (unde puterea absorbită rămâne aproape constantă, indiferent de debitul real necesar). Aplicată la puterea totală instalată a pompelor de circulație și a ventilatoarelor CTA (≈ 1.015 kW, v. DTAC §9.2, componenta „CTA/ventilare/desfumare”), la un profil orar tipic unde ≈ 60 % din programul de funcționare se desfășoară la sarcină parțială (65-85 % turație), economia anuală estimată este de ordinul **25-35 %** față de o soluție echivalentă cu turație fixă — contribuție care se adaugă cumulativ la cele opt măsuri ale strategiei nZEB de la DTAC §16.1.

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Chiller (confort, agent GWP redus)

| Parametru | Valoare |
|---|---|
| Putere frigorifică nominală | 1.400 kW/buc. (3 buc.) |
| Agent frigorific | R1234ze sau R513A |
| EER / SEER | ≥ 3,2 / ≥ 5,5 |
| Free-cooling | integrat, activare automată sub prag temperatură exterioară |
| Respingere căldură | dry-cooler/turn răcire, tratament anti-Legionella |
| Alimentare | 20 kV → 0,4 kV prin PT1, ~450 kW electric/buc. |

### PTh-I.4.2 Fișă tehnică — Pompă de căldură reversibilă aer-apă/apă-apă

| Parametru | Valoare |
|---|---|
| Putere calorică/frigorifică | ≈ 2,8 MW total / ≈ 1,5 MW frig |
| COP / EER | COP ≥ 3,4 |
| Regim de temperatură | 45/40°C (circuit CTA) |
| Reversibilitate | automată, sezonieră |

### PTh-I.4.3 Fișă tehnică — Cazan de condensație (sursă de vârf)

| Parametru | Valoare |
|---|---|
| Putere unitară | 1.400 kW/buc. (2 buc.) |
| Randament | ≥ 98% (regim condensație) |
| Combustibil | gaz natural |
| Regim | 70/55°C |

### PTh-I.4.4 Fișă tehnică — CTA tip galerie (1 din 6, referință)

| Parametru | Valoare |
|---|---|
| Debit nominal | 45.000 mc/h |
| Recuperator | roată entalpică, η ≥ 73% |
| Filtrare | ePM1 55-60% |
| Ventilatoare | EC, SFP ≤ 1,6 kW/(mc/s) |
| Automatizare | senzor CO2/temperatură zonă, integrare BMS BACnet |

### PTh-I.4.5 Fișă tehnică — CTA cinema (displacement)

| Parametru | Valoare |
|---|---|
| Debit nominal | 20.000 mc/h/buc. (3 buc.) |
| Tip distribuție | displacement, introducere joasă viteză redusă |
| Reglaj | VAV pe senzor CO2 per sală |
| Filtrare | ePM1 + suplimentar F7 (calitate aer superioară în sală ocupată) |

### PTh-I.4.6 Fișă tehnică — Boiler ACM descentralizat (tip grup sanitar galerie)

| Parametru | Valoare |
|---|---|
| Tip | acumulare electrică, local pe grup sanitar |
| Volum unitar | 150-300 l (funcție de grup) |
| Ciclu antilegionella | automat, șoc termic 70°C săptămânal |
| Recirculare | pompă locală, program orar |

### PTh-I.4.7 Fișă tehnică — Electropompă principală incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 50 l/s (180 mc/h) |
| Înălțime de pompare | 90 mCA |
| Putere motor | 90 kW |
| Pornire | soft-starter (limitare 3×In) |
| Conformitate | SR EN 12845 |

### PTh-I.4.8 Fișă tehnică — Pompă Diesel de rezervă incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 50 l/s (identic cu electropompa) |
| Autonomie combustibil | ≥ 3 h la sarcină nominală |
| Pornire | automată, baterii duble |
| Testare | pornire săptămânală de probă pe by-pass |

### PTh-I.4.9 Fișă tehnică — Ventilator desfumare atrium (F400)

| Parametru | Valoare |
|---|---|
| Debit unitar | 110.000 mc/h (4 buc., 1 rezervă) |
| Certificare | F400 (400°C/2h) |
| Amplasare | terasă, deasupra luminatorului zenital |
| Alimentare | sursă de siguranță (grup electrogen) |

### PTh-I.4.10 Fișă tehnică — Jet-fan parcaj

| Parametru | Valoare |
|---|---|
| Forță de împingere unitară | 60-80 N |
| Certificare | F400 (regim desfumare) |
| Nr. total | 60 buc. (8 compartimente) |
| Comandă | senzor CO (regim curent) + IDSAI (regim incendiu, pe canton) |

### PTh-I.4.11 Fișă tehnică — Post de transformare MT/JT

| Parametru | Valoare |
|---|---|
| Configurație | 2 transformatoare/post (N-1) |
| Puteri | PT1: 2×1.600 kVA; PT2: 2×1.600 kVA; PT3: 2×1.250 kVA |
| Rețea MT | 20 kV, configurație buclă |
| Protecție | relee de protecție MT + separator de sarcină |

### PTh-I.4.12 Fișă tehnică — Grup electrogen de siguranță

| Parametru | Valoare |
|---|---|
| Putere unitară | 1.000 kVA (2 buc., N+1) |
| AAR | < 15 s |
| Autonomie | 8 h la sarcină nominală |
| Combustibil | motorină, rezervor zilnic + rezervor de rezervă |

### PTh-I.4.13 Fișă tehnică — UPS consumatori critici

| Parametru | Valoare |
|---|---|
| Putere | 2×200 kVA |
| Autonomie baterii | ≥ 15-30 min (punte până la AAR grup electrogen) |
| Consumatori | centrală detecție, EVAC, CCTV, servere BMS, casierii |

### PTh-I.4.14 Fișă tehnică — Centrală de detectare IDSAI (scară mall)

| Parametru | Valoare |
|---|---|
| Tip | adresabilă, arhitectură multi-buclă pe zone/cantoane |
| Detectoare | optice fum (galerie/unități), termice (food-court), VESDA (atrium) |
| Interfațare | desfumare atrium+parcaj, EVAC, control acces, pompe incendiu, CTA |
| Conformitate | P118-3, seria SR EN 54 |

### PTh-I.4.15 Fișă tehnică — Sistem de alarmare vocală EVAC

| Parametru | Valoare |
|---|---|
| Conformitate | SR EN 54-16 |
| Zonare | pe niveluri și sectoare de galerie (evacuare fazată) |
| STI cerut | ≥ 0,5 |
| Prioritate | releu hardware peste sonorizarea comercială (PA) |
| Alimentare | UPS + grup electrogen |

### PTh-I.4.16 Fișă tehnică — Sistem frig alimentar CO₂ transcritic

| Parametru | Valoare |
|---|---|
| Putere MT/LT | 750 kW (+2/+4°C) / 450 kW (−22°C) |
| Agent | CO₂ (R744) |
| Recuperare căldură | gaz cald, 60-70°C, spre ACM/circuit termic hipermarket |
| Regim | continuu 24/24 |

### PTh-I.4.17 Fișă tehnică — Invertor fotovoltaic (string)

| Parametru | Valoare |
|---|---|
| Putere nominală | 50 kW/buc. (≈ 32 buc. pentru 1.575 kWp) |
| Randament european | ≥ 98% |
| Protecție anti-islanding | integrată |
| Monitorizare | portal cloud, per string, integrare BMS |

### PTh-I.4.18 Fișă tehnică — Presă de balotat carton (baler)

| Parametru | Valoare |
|---|---|
| Tip | verticală/orizontală, acționare hidraulică |
| Raport de compactare | 8:1 până la 10:1 |
| Capacitate | dimensionată la ~35-45% din 1.930 kg/zi flux total (v. DTAC §17.5) |
| Amplasare | încăpere BOH dedicată, compartimentare REI, sprinklerată (v. PTh-I.2.15a) |
| Semnalizare | senzor balot complet → alarmă CMMS |

### PTh-I.4.19 Fișă tehnică — Compactor deșeuri (reziduale/plastic-metal)

| Parametru | Valoare |
|---|---|
| Acționare | electro-hidraulică |
| Raport de compactare | 4:1 până la 6:1 |
| Senzor nivel umplere | celulă de sarcină/ultrasonic, transmis BMS |
| Amplasare | BOH, vecinătatea rampei de marfă |

### PTh-I.4.20 Fișă tehnică — Cameră frigorifică deșeuri alimentare

| Parametru | Valoare |
|---|---|
| Temperatură menținută | +4…+8°C |
| Pardoseală/pereți | lavabili, pantă de scurgere spre rigolă |
| Ventilare | proprie, depresiune, evacuare directă exterior |
| Alarmă | senzor temperatură (depășire +8°C) → BMS/echipă FM |
| Separare | fizică integrală de camerele frigorifice de marfă proaspătă |

### PTh-I.4.21 Fișă tehnică — Stație de încărcare vehicule electrice (EV)

| Parametru | Valoare |
|---|---|
| Tip AC | 22 kW, minimum 10% din locurile de parcare (v. DTAC §16.2) |
| Tip DC rapid | 50-150 kW, 2-4 stații la accesul principal |
| Management sarcină | dinamic, limitare sub rezerva alocată din PT2 |
| Contorizare | individuală, integrare BMS pentru facturare serviciu |

### PTh-I.4.22 Fișă tehnică — Sistem PGS (Parking Guidance System)

| Parametru | Valoare |
|---|---|
| Senzor per loc | ultrasonic/cameră, stare ocupat/liber |
| Afișaj | panouri de nivel/culoar cu număr de locuri libere |
| Integrare | BMS + LPR (v. DTAC §15.1) pentru statistici de ocupare |
| Beneficiu | reduce timpul de căutare a locului și congestia/emisiile în parcaj |

---

## PTh-I.5 Probe și verificări detaliate

| Instalație | Proba | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/caldă | etanșeitate | 1,5×p regim, min. 10 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Canalizare menajeră | etanșeitate | umplere la nivel etaj | 15 min | fără scurgeri la îmbinări |
| Separatoare grăsimi (3 buc.) | funcțională + etanșeitate | debit nominal | — | eficiență separare conformă SR EN 1825 |
| Pluvial sifonic | probă de amorsare | debit de calcul (390 l/s) | — | funcționare sifonică confirmată, fără cavitație |
| Separator hidrocarburi NS 65 | funcțională + etanșeitate | debit nominal | — | reziduu ≤ 5 mg/l (SR EN 858) |
| HVAC — toate cele 18 CTA | debite + echilibrare | debite proiectate ± 10-15% | — | SR EN 12599 |
| Tubulatură ventilare | etanșeitate | clasa B (SR EN 12237) | conform metodă | scurgeri sub limita clasei |
| Exhaustare food-court | funcțională F400 | test la cald simulat | — | ventilator menține funcționarea la 400°C/2h |
| Cinema (displacement) | reglaj VAV pe CO2 | debit 8,5 l/s·loc verificat | — | conform proiect, pe fiecare sală |
| Desfumare parcaj (jet-fan) | funcțională regim curent + incendiu | comandă senzor CO + IDSAI | — | comutare regim F400 < 60 s |
| Desfumare atrium | funcțională + CFD | comandă IDSAI + manuală | — | strat liber ≥ 2,5 m confirmat prin simulare + test la cald |
| Electrice (3 PT-uri) | rezistență izolație | 1.000/500 V c.c. (MT/JT) | — | conform I7 |
| Electrice | priză de pământ | — | — | R ≤ 1 Ω (comună trăsnet+electrică) |
| Electrice | test declanșare RCD | I∆n = 30 mA | — | declanșare < 300 ms |
| Trăsnet | continuitate coborâri + priză | — | — | conform SR EN 62305-3 |
| Sprinkler (5 zone de control) | presiune hidraulică | 1,5×p regim, min. 15 bar (SR EN 12845) | 2 h | fără scădere, fără scurgeri, per zonă |
| Sprinkler | funcțională ACS + alarmă (fiecare ACS) | debit test | — | alarmă hidraulică declanșată corect |
| Hidranți interiori/exteriori | debit-presiune | punctul cel mai defavorabil | — | ≥ 2,1 l/s la ≥ 2,5 bar (interiori), ≥ 20 l/s (exteriori) |
| Stație pompare incendiu | funcțională (curbă pompă, 2 puncte de duty) | scădere presiune simulată | — | pornire < timp normat, ambele puncte confirmate |
| IDSAI | funcțională detectoare | test 100% adrese | — | semnalizare corectă |
| IDSAI | matrice cauză-efect | test integral | — | toate efectele confirmate, pe fiecare canton/zonă |
| EVAC | inteligibilitate STI | cu PA comercială pornită la nivel maxim admis | — | STI ≥ 0,5 pe toate zonele |
| PT MT/JT | probe electrice de punere sub tensiune | conform normativ energetic | — | avizul operatorului de rețea |
| Grup electrogen | funcțională AAR | simulare cădere rețea | — | comutare < 15 s, autonomie confirmată ≥ 8h la test parțial |
| UPS | funcțională + autonomie | test descărcare | — | autonomie conformă fișei tehnice |
| FV | funcțională + izolație | test string-uri | — | producție conformă, fără defecte izolație |
| CCTV/control acces/efracție | funcțională integrală | test pe fiecare subsistem | — | conform PTh-I.7.7 (adaptat scării mall) |

### PTh-I.5.1 Verificări electrice PRAM — detaliu

- **Rezistența de izolație** — pe fiecare circuit terminal al celor 3 PT-uri și al tabloului de siguranță, deconectat de la receptoare, la 500 V c.c. (JT) — minim 0,5 MΩ (I7); pe partea MT, conform metodologiei specifice și avizului operatorului de rețea.
- **Rezistența prizei de pământ** — R ≤ 1 Ω, comună electrică+trăsnet (v. DTAC §12.1), remăsurată după completarea eventuală a prizei de fundație cu electrozi suplimentari, dacă rezistivitatea reală a solului o impune.
- **Continuitatea conductorului de protecție** — pe fiecare circuit final, inclusiv circuitele E90/PH90 ale tabloului de siguranță.
- **Testul dispozitivelor diferențiale** — pe toate circuitele de prize și zone umede (GS, food-court), timp de declanșare < 300 ms la 30 mA.
- **Verificarea SPD** — tip 1+2 la fiecare TGJT, tip 2+3 la tablourile terminale sensibile (IDSAI, rack IT, invertoare FV, casierii).
- **Continuitate coborâri paratrăsnet** — verificare la fiecare tronson între piesele de separație, pe toate cele 4 laturi ale acoperișului.

### PTh-I.5.2 Fișă tehnică — Rezervor de incendiu (650 mc)

| Parametru | Valoare |
|---|---|
| Volum util | 650 mc |
| Configurație | 2 compartimente independente |
| Reumplere | automată, electrovalvă + senzor nivel, < 24 h |
| Sorburi | separate pentru electropompă, pompă Diesel și pompă jockey |
| Semnalizare | nivel transmis la dispecerat BMS |

### PTh-I.5.3 Fișă tehnică — Separator de hidrocarburi (NS 65)

| Parametru | Valoare |
|---|---|
| Mărime nominală | NS 65 |
| Clasă | I (coalescență, reziduu ≤ 5 mg/l) |
| Decantor nămol | amonte de separator |
| Alarmă nivel hidrocarburi | senzor + panou local, transmis BMS |
| Mentenanță | golire periodică, firmă autorizată |

---

## PTh-I.6 Tehnologia de montaj

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee generale (înainte de turnarea pardoselilor și montajul compartimentărilor interioare).
2. Execuție priză de pământ de fundație — **înainte de turnarea fundațiilor**.
3. Montaj rețele îngropate (canalizare, pluvial exterior, rețea hidranți exteriori) — **probate înainte de acoperire**.
4. Montaj structură (condiție pentru toate instalațiile suspendate — CTA pe terasă, jet-fans, sprinklere pe plafon).
5. Montaj rezervor incendiu + stație de pompare (probă hidraulică pe fiecare zonă de control înainte de mascarea rețelei de sprinklere de către finisaje/rafturi).
6. Montaj cele 3 posturi de transformare + cabluri MT (verificare/punere sub tensiune cu operatorul de rețea).
7. Montaj rețea sprinklere pe plafon, pe toate cele 5 zone de control, coordonat cu montajul plafoanelor false ale galeriei.
8. Montaj coloane apă/canalizare interioară, tubulatură CTA (18 buc.), canal exhaustare food-court.
9. Montaj cabluri electrice pe jgheaburi/busbar, tablouri (3 PT-uri + tablou siguranță + tablouri chiriași).
10. Montaj echipamente majore (chillere, pompe căldură, cazane, sistem frig alimentar CO₂, grup electrogen, UPS).
11. Montaj corpuri de iluminat, prize, aparataj final pe toate nivelurile.
12. Montaj ventilatoare desfumare atrium (terasă) + jet-fans parcaj + actuatoare/trape.
13. Montaj instalație fotovoltaică (după finalizarea lucrărilor de acoperiș și verificarea structurală).
14. Montaj centrală IDSAI, EVAC, detectoare (incl. VESDA atrium), curenți slabi (CCTV/control acces/BMS).
15. Probe finale pe zonă/sistem, verificare CFD desfumare atrium, PIF, reglaje, instruire beneficiar/administrație mall.

### PTh-I.6.2 Susțineri și fixări (inclusiv cerințe seismice pe conducte grele/PSI)

| Instalație | Tip susținere | Interax maxim | Observație seismică |
|---|---|---|---|
| Conductă sprinkler DN ≥ 100 (cross-main/riser) | tijă filetată dublă + bracket lateral | 3,0-3,7 m | conform SR EN 12845 anexa suporți, verificare la sarcina laterală (clasă importanță II) |
| Conductă sprinkler DN < 100 (branch) | tijă filetată simplă | conform interax capete | — |
| Conductă apă PP-R/oțel | brățară glisantă (dilatare) | Ø≤63: 1,0 m; Ø>63: 1,5-2,0 m | — |
| Tubulatură CTA galerie (canale mari) | tijă filetată + profil, dublă la treceri de compartimentare | 1,5-2,5 m | verificare seismică la traversarea rosturilor de dilatare |
| Jgheaburi/busbar cabluri | consolă metalică | 1,0-1,5 m | separare tari/slabi, distanță de conductele PSI |
| Ventilatoare desfumare atrium (terasă) | postament antivibrant + ancorare seismică | — | verificare încărcare vânt + seism cu structuristul |
| Jet-fans parcaj | suspendare din planșeu, sistem antivibrant | conform interax din PTh-I.2.8 | verificare la vibrația indusă de trafic auto |

Toate conductele grele (sprinkler, hidranți) montate suspendat se verifică la încărcarea seismică suplimentară transmisă structurii — coordonare obligatorie cu memoriul de rezistență.

### PTh-I.6.3 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Distribuție ACM + recirculare (fiecare buclă locală) | 20-30 mm | elastomer |
| Conducte agent termic/frigorific CTA (rețea principală) | 30-40 mm | elastomer/vată minerală cu barieră vapori |
| Tubulatură ventilare (trasee exterioare/neîncălzite) | 25-50 mm | vată cu foaie Al |
| Coloană pluvială sifonică expusă la îngheț | cablu de degivrare | electric autoreglabil |

### PTh-I.6.4 Treceri etanșe la foc

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Conducte metalice (apă, sprinkler, agent termic/frigorific) | manșon/mastic intumescent | EI conform elementului străbătut |
| Conducte plastic (PP-R, PVC) | colier intumescent | EI conform elementului |
| Fascicule cabluri (inclusiv circuite E90/PH90) | pernă/mastic + vopsea termospumantă | EI conform elementului |
| Tubulatură ventilare (CTA galerie, food-court) | clapetă antifoc + etanșare | EI conform elementului |
| Canal exhaustare food-court (traversare compartimentare) | clapetă F400 dedicată + etanșare | EI/F400 conform elementului |

### PTh-I.6.5 Montaj echipamente pe terasă — coordonare FV / desfumare / CTA

Terasa mall-ului găzduiește simultan module fotovoltaice (~7.500 mp), 4 ventilatoare de desfumare a atriumului, unitățile exterioare VRF ale chiriașilor Model B (v. DTAC §5.7) și, potențial, unitățile condensatoare ale chillerelor/pompelor de căldură. Coordonarea acestor echipamente pe suprafața disponibilă se stabilește printr-un **plan de zonare a terasei**, elaborat la faza PTh împreună cu arhitectul și structuristul, care rezervă: culoare de acces liber pentru mentenanță (minimum 1,2 m lățime), distanțe de siguranță între modulele FV și ventilatoarele de desfumare (evitarea umbririi reciproce și a interferenței cu fluxul de aer evacuat), și zone dedicate, fără module FV, deasupra fiecărui compartiment tehnic al parcajului unde ar putea fi necesare, ulterior, guri suplimentare de aer de compensare.

### PTh-I.6.6 Montaj cablare structurată curenți slabi

Cablarea Cat.6A/fibra optică se montează pe trasee separate de curenții tari (≥ 300 mm în paralel sau ecranare, SR EN 50174), cu rezervă de cablu la fiecare IDF de nivel. Camerele CCTV exterioare (perimetru, accese, parcaj suprateran) se alimentează PoE+ prin cablu exterior UV-rezistent, cu protecție SPD la intrarea în clădire. Rețeaua de fibră optică pentru chiriași (v. DTAC §18.2) se montează pe traseu dedicat, distinct fizic de fibra sistemelor de siguranță (IDSAI, EVAC), coerent cu principiul de segregare de la DTAC §18.3.

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrarea hidraulică — sprinklere și hidranți (toate cele 5 zone de control)

Verificarea presiunii la fiecare ACS (ZC1-ZC5) și la hidranții cei mai defavorizați se face prin manometre montate temporar la punctele critice identificate la PTh-I.3.1-I.3.5, comparate cu valorile de calcul; abaterea admisă ≤ ±10%. Curba pompei principale se verifică la **ambele puncte de funcționare** (scenariul intern, sprinklere+hidranți interiori, și scenariul concomitent cu hidranții exteriori, v. PTh-I.3.4), cu proces-verbal separat pentru fiecare.

### PTh-I.7.2 Reglaj aeraulic — cele 18 CTA

Reglajul se face la gurile de admisie/extracție ale fiecărei CTA, cu anemometru, urmărind debitele proiectate din tabelul DTAC §5.2 (270.000 galerie / 90.000 hipermarket / 50.000 food-court / 60.000 cinema / 32.000 tehnic-BOH mc/h). Criteriu (SR EN 12599): abatere debit total pe CTA ≤ ±15%, pe fiecare gură terminală ≤ ±20%. Pe cinema, reglajul VAV se verifică suplimentar la 3 niveluri de ocupare simulată (0%, 50%, 100%) pentru confirmarea funcționării corecte a senzorului CO2.

### PTh-I.7.3 Protocol verificare CFD — desfumare atrium

- Model CFD elaborat pe **geometria finală** a atriumului (dimensiuni reale confirmate as-built ale galeriilor adiacente, luminatorului, cortinelor de fum), cu focarul de proiectare (5 MW, Qc = 3.500 kW) plasat succesiv în cele mai defavorabile poziții (parter, sub luminator, la marginea golului fiecărui nivel).
- Verificare a menținerii stratului de aer liber ≥ 2,5 m deasupra ultimului nivel ocupat, pe toată durata de referință a scenariului de evacuare.
- Verificare a absenței recirculării fumului către zonele ocupate prin gurile de compensare (viteză aer compensare < 5 m/s, confirmată la fața locului cu anemometru la testul la cald simulat).
- Raport CFD semnat de specialist atestat, anexat la scenariul de securitate la incendiu și la cartea tehnică — condiție pentru avizul ISU de PIF.

### PTh-I.7.4 Protocol verificare — desfumare parcaj (jet-fan)

- Test funcțional regim curent: pornire automată la prag CO 30 ppm, ventilare maximă la 100 ppm, pe fiecare compartiment.
- Test funcțional regim incendiu: comutare a jet-fans-urilor certificate F400 pe cantonul afectat (simulare alarmă IDSAI), verificare timp de comutare și menținere a vitezei de curgere pe culoar (≥ 2-3 m/s, v. PTh-I.3.9).
- Verificare aer de compensare (deschidere automată rampe/porți) simultan cu regimul de desfumare.

### PTh-I.7.5 Protocol STI — alarmare vocală EVAC

Măsurătoarea STI se realizează pe toate zonele de amplificare (v. DTAC §14.2), **cu sonorizarea comercială PA pornită la nivelul ei maxim admis** (65-70 dB(A) în galerie), în cel puțin un punct reprezentativ per zonă (galerie fiecare nivel, atrium, food-court, foaier cinema, parcaj). Criteriu de admisie: STI ≥ 0,5 pe fiecare punct de măsură. Se testează suplimentar releul de prioritate hardware (întrerupere fizică a PA la declanșarea alarmei) și comutarea automată pe backup GPRS/dual-path a comunicării dispeceratului, dacă aplicabil.

### PTh-I.7.6 Protocol PIF — posturi de transformare MT/JT

- Verificări electrice de punere sub tensiune conform normativului energetic în vigoare și avizului operatorului de distribuție (probe de izolație pe partea MT, verificare relee de protecție, testare funcționare în buclă a rețelei MT dintre cele 3 posturi).
- Verificare funcționare selectivitate ZSI între TGJT și tablourile secundare — simulare defect la diverse niveluri ale ierarhiei de protecție, confirmare declanșare exclusiv a întrerupătorului cel mai apropiat de defect.
- Testare comutare automată AAR pe tabloul de siguranță (simulare cădere rețea publică), cronometrare timp de comutare (< 15 s) și verificare secvențială a pornirii consumatorilor critici (pompe sprinklere, desfumare atrium, iluminat evacuare, EVAC, ascensor pompieri).

### PTh-I.7.7 Protocol PIF fotovoltaic

- Verificare rezistență de izolație pe fiecare string DC înainte de conectarea la invertor.
- Test tensiune de circuit deschis (Voc) pe eșantion reprezentativ de string-uri, comparat cu valoarea de catalog corectată cu temperatura.
- Punere sub tensiune progresivă, verificare funcționare invertoare și comunicare cu portalul de monitorizare.
- Test funcție anti-islanding (deconectare simulată a rețelei publice).
- Măsurare producție inițială, proces-verbal cu curba de producție a primei zile.

### PTh-I.7.8 Protocol PIF curenți slabi (CCTV, control acces, efracție, BMS)

- **CCTV**: verificare câmp vizual per cameră (fără zone oarbe pe accesele parcajului, culoare galerie, casele scărilor), test înregistrare/redare NVR, verificare funcționare LPR pe accesele parcajului.
- **Control acces**: test deblocare fail-safe la simularea alarmei IDSAI pe fiecare zonă, verificare integrare cu sistemul de pontaj al personalului FM.
- **Efracție**: test fiecare zonă (unități în afara programului, zone tehnice), verificare comunicare dual-path.
- **BMS**: verificare integrală a punctelor de contorizare individuală (apă/energie termică/electrică) pentru un eșantion reprezentativ de unități, confirmarea transmisiei automate către modulul de facturare CAM; programare curbe de reglaj CTA, praguri de alarmare (colmatare filtre, nivel separatoare, nivel bazin retenție pluvial).

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, agremente, marcaj CE) | certificate | responsabil tehnic | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare, pluvial, hidranți exteriori) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 4 | Rezervor de incendiu + probă etanșeitate | PV probă | RTE + diriginte | **FD** |
| 5 | Montaj rețea sprinkler pe toate cele 5 zone de control | proces-verbal montaj | RTE | CM |
| 6 | Probă presiune sprinkler, fiecare zonă (1,5×p regim, min. 15 bar, 2h) | PV probă/zonă | RTE + diriginte + ISU | **FD** |
| 7 | Probă presiune hidranți interiori/exteriori | PV probă | RTE + diriginte | CM |
| 8 | Probă etanșeitate apă menajeră | PV probă SR EN 806 | RTE + diriginte | CM |
| 9 | Probă canalizare înainte de mascare/acoperire | PV probă | RTE + diriginte | **FD** |
| 10 | Probă funcțională separatoare grăsimi/hidrocarburi | PV probă | RTE | CM |
| 11 | Probă amorsare pluvial sifonic | PV probă | RTE + diriginte | CM |
| 12 | Punere sub tensiune posturi de transformare MT/JT | PV operator rețea | operator distribuție + RTE | **FD** |
| 13 | Rezistență izolație + priză de pământ (electric, 3 PT-uri) | buletin PRAM | verificator/laborator | CM |
| 14 | Test RCD/diferențiale | buletin PRAM | laborator autorizat | CM |
| 15 | Continuitate coborâri trăsnet + priză comună | buletin măsurători | laborator autorizat | CM |
| 16 | Etanșeitate tubulatură ventilare (clasa B), toate cele 18 CTA | PV clasă etanșeitate | RTE | CM |
| 17 | Funcțional IDSAI + matrice cauză-efect completă (toate cantoanele/zonele) | PV probe 100% | firmă autorizată IGSU | **FD** |
| 18 | Funcțional stație de pompare incendiu (2 puncte de duty, comutare rezervă) | PV probă | firmă autorizată + ISU | **FD** |
| 19 | Verificare CFD desfumare atrium (geometrie finală) | raport CFD + PV test la cald | specialist atestat + ISU | **FD** |
| 20 | Funcțional jet-fans parcaj (regim curent + regim incendiu, toate cantoanele) | PV probă | RTE + ISU | **FD** |
| 21 | Măsurătoare STI alarmare vocală EVAC (toate zonele) | PV măsurătoare | firmă atestată | **FD** |
| 22 | Reglaj aeraulic (echilibrare debite, toate cele 18 CTA) | protocol debite | RTE | CM |
| 23 | Funcțional grup electrogen (AAR, autonomie) | PV probă | RTE + electrician autorizat | **FD** |
| 24 | Funcțional UPS | PV probă | RTE | CM |
| 25 | Funcțional FV (string-uri, invertoare, anti-islanding) | PV probă + rapoarte producție | firmă autorizată | CM |
| 26 | Funcțional CCTV/control acces/efracție integrat cu IDSAI | PV probă integrare | RTE | CM |
| 27 | Verificare contorizare individuală chiriași (eșantion) + integrare BMS/CAM | PV probă | RTE + administrația mall-ului | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU); CM = control în masă; CQ = control calitate recepție.

### PTh-I.8.1 Faze determinante — detaliere

Numărul ridicat de faze determinante față de o clădire monofuncțională (v. hala industrială, unde erau 6 FD) reflectă complexitatea și profilul de risc superior al unui mall regional: pe lângă priza de pământ de fundație, trasee îngropate, probele de sprinkler și instalația de gaze/electric (comune tuturor tipologiilor), se adaugă ca faze determinante specifice **verificarea CFD a desfumării atriumului** (element unic, fără de care avizul ISU nu poate fi obținut), **funcționarea integrală a jet-fans-urilor parcajului** pe regim de desfumare (verificare pe fiecare din cele 8 compartimente) și **măsurătoarea STI a alarmării vocale** (condiție de bază pentru evacuarea ordonată a mii de persoane necunoscătoare ale planului clădirii, v. DTAC §14.2). Absența oricăreia dintre aceste verificări blochează obținerea autorizației de securitate la incendiu la punerea în funcțiune (HG 571/2016).

### PTh-I.8.2 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație, pe toate nivelurile, coordonate cu poziția reală a rafturilor hipermarketului |
| Scheme finale | monofilară actualizată (3 PT-uri + tablou siguranță), coloane, izometrice, rețea sprinkler nod-cu-nod pe fiecare zonă de control |
| Raport CFD desfumare atrium | model, ipoteze, rezultate, semnat de specialist atestat |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (marcaj CE, agremente PSI) |
| Buletine de probe | PRAM, presiune sprinkler/hidranți (per zonă), etanșeitate, debite ventilare (per CTA), STI EVAC |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv aviz ISU |
| Protocoale reglaj | echilibrare hidraulică, reglaj aeraulic (18 CTA), programare BMS/IDSAI |
| Instrucțiuni de exploatare | operare stație pompare, IDSAI, BMS, PT MT/JT, grup electrogen, FV |
| Program mentenanță | revizii periodice (sprinkler semestrial, ISCIR ascensoare/scări rulante, F-Gas, metrologie contoare chiriași) |
| Garanții | certificate garanție producători (pompe, chillere, IDSAI, EVAC, FV, ascensoare/scări rulante) |

---

## PTh-I.9 Calcul iluminat interior și de siguranță (NP 061/2002, SR EN 12464-1)

### PTh-I.9.1 Metoda de calcul (flux luminos) și corpuri de referință

N = (E × S) / (Φ_corp × U × M), cu M = 0,80 (LED, mediu curat comercial) și U funcție de geometria fiecărei zone (indice de încăpere k).

Corpuri de referință adoptate: **panou LED 600×600, 40 W/5.200 lm** (galerie, unități, food-court), **downlight LED 25 W/3.200 lm, UGR≤22** (galerie, cu dimming DALI), **proiector LED de scenă 60 W** (atrium, iluminat scenografic suplimentar), **corp LED dimabil, 15-30 W** (sălile de cinema, program de fază proiecție), **highbay LED IP65, 150 W/21.000 lm** (parcaj), **panou LED 36 W** (birouri/BOH).

### PTh-I.9.2 Calcul detaliat — Galerie (pe niveluri)

| Nr. | Zonă | S [mp] | k | U | E cerut [lx] | N calc | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|---|
| G-P | Galerie parter | 2.200 | 2,20 | 0,62 | 250 | 271 | 275 | 6.875 |
| G-1 | Galerie nivel 1 | 2.150 | 2,15 | 0,61 | 250 | 268 | 270 | 6.750 |
| G-2 | Galerie nivel 2 | 2.150 | 2,15 | 0,61 | 250 | 268 | 270 | 6.750 |
| G-Atrium | Atrium (proiectoare scenografice suplimentare) | — | — | 0,55 | 300+ | — | 45 | 2.700 |
| **Total galerie** | | **6.500** | | | | | **860** | **23.075** |

Exemplu de verificare (G-P): N = (250 × 2.200) / (5.200 × 0,62 × 0,80) = 550.000 / 2.579 ≈ **213** corpuri teoretice la debit maxim de flux, redus la 275 prin combinarea cu downlight-urile de accent DALI (dimming zilnic pe daylight la atrium) — configurație finală verificată prin releveu fotometric la recepție, coerent cu practica din DTAC (§11.1: 6-8 W/mp galerie); puterea specifică rezultată (23.075 W / 6.500 mp ≈ 3,6 W/mp pe corpurile de bază, la care se adaugă iluminatul de accent al unităților, în sarcina fiecărui chiriaș) confirmă încadrarea sub pragul de 6-8 W/mp din DTAC.

### PTh-I.9.3 Calcul detaliat — Food-court, cinema (foaier + săli), unități-tip

| Nr. | Zonă | S [mp] | E cerut [lx] | N adoptat | P instalat [W] |
|---|---|---|---|---|---|
| FC-01 | Food-court — zonă mese | 1.400 | 200 | 108 | 4.320 |
| CI-Foaier | Cinema — foaier | 800 | 150 | 46 | 1.150 |
| CI-Sali | Cinema — 8 săli (dimming, mediu proiecție) | 1.700 | 50-100 | 120 (corpuri dimabile) | 3.000 (regim redus) |
| UT-tip | Unitate-tip 100 mp (sarcină chiriaș, referință) | 100 | 400 | 12-15 | 1.200-1.500 |

Sălile de cinema funcționează la regim variabil (dimming pe fazele proiecției: pauză publicitară, prezentare film, pauze între proiecții — pornire la 100% pentru curățenie), conform programării BMS coordonate cu operatorul cinema (v. DTAC §5.6).

### PTh-I.9.4 Calcul detaliat — Parcaj subteran (pe compartimente)

| Compartiment | S [mp] | E regim exploatare [lx] | E regim veghe [lx] | N adoptat (highbay IP65) | P instalat [W] |
|---|---|---|---|---|---|
| C1-C8 (fiecare ~2.500-2.600 mp) | 22.000 (total) | 75 | 20 | 8×34 ≈ 272 | 272×150 ≈ 40.800 |

Comandă pe senzori de prezență pe culoarele de circulație (regim veghe 20 lx în absența traficului, comutare la 75 lx la detectarea vehiculului/pietonului), integrată cu sistemul PGS de ghidare a parcării (v. DTAC §15.1).

### PTh-I.9.5 Calcul detaliat — Tehnic/BOH, culoar de serviciu, camere echipamente

| Zonă | S [mp] | E cerut [lx] | N adoptat | P instalat [W] |
|---|---|---|---|---|
| Culoar tehnic serviciu (spatele unităților) | 1.200 | 150 | 60 | 1.800 |
| Camere echipamente (PT1-3, pompe, chillere, IDSAI) | 900 | 200-300 | 55 | 2.475 |
| Depozit propriu hipermarket | 1.500 | 200 | 40 (highbay) | 6.000 |
| Zonă vânzare hipermarket | 2.500 | 500 (comercial) | 210 | 8.400 |

### PTh-I.9.6 Sinteză putere instalată iluminat normal

| Zonă | Putere instalată [kW] |
|---|---|
| Galerie + atrium | 23,1 |
| Food-court | 4,3 |
| Cinema (foaier + săli) | 4,2 |
| Unități (sarcină chiriaș, estimare medie 12 W/mp × 9.000 mp) | 108,0 |
| Parcaj | 40,8 |
| Tehnic/BOH + culoar serviciu | 4,3 |
| Hipermarket (vânzare + depozit) | 14,4 |
| **Total iluminat normal (confirmă ordinul de mărime DTAC, ~1.080 kW cu marjă comercială a chiriașilor)** | **≈ 199 kW bază comună + ~880 kW sarcină chiriași/hipermarket la vârf de amenajare completă** |

Diferența față de valoarea globală de 1.080 kW din DTAC (§9.2) se explică prin faptul că breviarul de mai sus detaliază iluminatul de bază al spațiilor comune, în timp ce iluminatul comercial de amenajare (fit-out) al fiecărei unități — vitrine, accent, iluminat de produs — este proiectat și instalat de fiecare chiriaș în parte, în limitele puterii rezervate prin contractul de închiriere (v. DTAC §9.4, tablouri chiriași contorizate individual); valoarea de 1.080 kW din DTAC reprezintă suma bugetară estimată la nivel de întreagă clădire, inclusiv rezerva pentru fit-out-ul chiriașilor.

### PTh-I.9.7 Iluminat de siguranță și evacuare (SR EN 1838)

| Tip iluminat siguranță | Nivel | Autonomie | Comutare | Amplasare |
|---|---|---|---|---|
| Evacuare (căi) | ≥ 1 lx pe ax (5 lx în atrium/intersecții) | 1 h | < 5 s | Galerie toate nivelurile, foaier cinema, culoare tehnice |
| Antipanică (spații > 60 mp) | ≥ 0,5 lx | 1 h | < 5 s | Galerie, atrium, food-court, parcaj |
| Continuarea lucrului | nivel menținut | 1 h | — | Casierii, dispecerat tehnic |
| Marcare PSI | permanent | 1 h | — | Hidranți, ACS-uri, tablouri, ieșiri, schimbări de direcție |
| Marcare hipermarket/parcaj (echipamente critice) | ≥ 5 lx | 1 h | < 0,5 s | Stație pompare, PT-uri, IDSAI |

| Zonă | Corpuri evacuare | Corpuri antipanică | Indicatoare Exit |
|---|---|---|---|
| Galerie (toate nivelurile) | 180 | 95 | 64 |
| Food-court | 22 | 14 | 8 |
| Cinema (foaier + săli) | 30 | 16 | 22 |
| Parcaj | 60 | 40 | 24 |
| Hipermarket | 24 | 18 | 8 |
| Tehnic/BOH | 20 | — | 6 |
| **Total** | **336** | **183** | **132** |

Total iluminat de siguranță: 651 corpuri, autotest lunar automat + test autonomie semestrial pe eșantion reprezentativ, integrat în CMMS (DTAC §19.2). Verificare timp de comutare ≤ 5 s pentru 50% nivel, ≤ 60 s pentru 100% (SR EN 1838), cu comutare < 0,5 s pe echipamentele critice de siguranță (v. DTAC §11.2).

### PTh-I.9.8 Calcul iluminat exterior — platforme, parcaj suprateran, fațadă și semnalistică

Iluminatul exterior deservește platforma de parcare suprateran/la sol (parte din cele ~1.750 de locuri de parcare ale mall-ului, v. DTAC §2.4/16.2), aleile pietonale, fațada principală și semnalistica de identificare, cu corpuri LED pe stâlpi (H = 8-12 m) și proiectoare de fațadă:

| Zonă exterioară | S [mp] (orientativ) | E cerut [lx] | Corp adoptat | Nr. corpuri | P instalat [W] |
|---|---|---|---|---|---|
| Parcaj suprateran/la sol | ~18.000 | 20-30 | proiector LED 150 W pe stâlp H=10-12 m | 90 | 13.500 |
| Alei pietonale/accese | — | 15-20 | corp LED pietonal 40 W | 60 | 2.400 |
| Fațadă principală + logo/semnalistică | — | balizaj/accent | proiector LED 100 W + semnalistică dedicată | 40 | 4.000 |
| Perimetru (corelat cu CCTV, v. DTAC §15.1) | — | 10-15 (securitate) | proiector LED 80 W | 50 | 4.000 |
| Acces rampă marfă/BOH exterior | — | 30-50 | proiector LED 120 W | 12 | 1.440 |
| **Total exterior** | | | | **252** | **25.340** |

Comandă prin celulă crepusculară + programator orar, cu reducere nocturnă a intensității pe zonele de parcare fără trafic (dimming la 50% coordonat cu PGS — v. PTh-I.4.22) și revenire la 100% pe senzor de mișcare/prezență vehicul la accesele auto principale, coerent cu strategia de eficiență energetică generală (DTAC §16.1) și cu principiul de contorizare/monitorizare prin BMS aplicat întregii instalații de iluminat a clădirii.

---

## PTh-I.10 Breviar de calcul suplimentar securitate la incendiu (instalații)

### PTh-I.10.1 Verificare alternativă ESFR — hipermarket (dacă se depășește pragul de 6,0 m)

Soluția adoptată pentru depozitul propriu al hipermarketului (rafturi ≤ 6,0 m) este **sprinkler de plafon HHS III** (v. PTh-I.3.2). Se documentează, pentru situația în care operatorul hipermarketului ar solicita, la faza de amenajare finală, majorarea înălțimii de stivuire peste 7,5 m (semnalul deja transmis în DTAC §13.2):

| Parametru ESFR | Valoare |
|---|---|
| Cap de sprinkler | K360 sau K200 |
| Presiune de funcționare | 3,5-5,0 bar |
| Nr. capete în aria de operare | ≈ 12 |
| Debit unitar la K360, p = 3,5 bar | q = K·√p ≈ 6,7 l/s |
| Implicație asupra pompei | necesită redimensionarea grupului de pompare (v. PTh-I.3.4), scenariu care devine guvernant |

**Dimensionarea definitivă rămâne condiționată de fișa tehnologică a operatorului hipermarketului**, conform semnalului transmis deja la faza DTAC — nu se adoptă ferm la PTh în absența acestei confirmări.

### PTh-I.10.2 Verificare timp de reumplere a rezervorului de incendiu

Debitul de reumplere (branșament dublu Dn 200, cf. DTAC §2.3, cu prioritate acordată alimentării rezervorului de incendiu peste consumul curent în caz de epuizare parțială): la un debit de reumplere alocat de ≈ 30-35 mc/h (partajat cu necesarul curent redus pe timp de noapte), timpul de refacere a unei rezerve golite parțial (≈ 200 mc, scenariu de intervenție prelungită) rezultă **≈ 6-7 h**, sub pragul de 24 h impus (DTAC §13.5).

### PTh-I.10.3 Verificare compartimentare de fum — corelare cu structura pe zone de control PSI

Cele 5 zone de control ale instalației de sprinklere (PTh-I.2.1) nu coincid automat cu cantoanele/compartimentele de fum ale scenariului de securitate la incendiu (document distinct, elaborat de proiectantul de specialitate PSI) — corelarea celor două zonări (hidraulică pe de o parte, de fum pe de altă parte) se verifică explicit la faza PTh, astfel încât fiecare compartiment de fum să fie acoperit integral de o singură zonă de control a sprinklerelor sau de o combinație clar delimitată, fără suprapuneri ambigue care ar complica intervenția și diagnosticarea unei alarme.

### PTh-I.10.4 Verificare acoperire VESDA atrium — sensibilitate și timp de răspuns

Sistemul de detecție prin aspirație VESDA al atriumului (v. DTAC §14.1) se verifică la faza PTh pentru **timpul de transport** al probei de aer de la punctul de aspirație cel mai îndepărtat până la senzorul central (conform lungimii reale a rețelei de conducte de aspirație, confirmate pe planul de execuție), cu criteriu de admisie: timp de transport ≤ 120 s pe traseul cel mai lung, prag de sensibilitate calibrat astfel încât detecția să preceadă cu marjă suficientă acumularea vizibilă de fum sub luminatorul zenital, dat fiind volumul mare (~35.000 mc) care trebuie desfumat conform breviarului de la PTh-I.2.9.

### PTh-I.10.5 Notă privind stadiul documentației

Dimensionările prezentate în acest supliment de fază PTh detaliază la nivel de execuție ipotezele și breviarele stabilite la faza DTAC, confirmate prin calcul nod-cu-nod, verificare de coerență pe fiecare instalație majoră și adăugarea componentelor specifice execuției (fișe tehnice, probe, tehnologie de montaj, PIF, Plan de Control al Calității). Rămân condiționate de confirmări ulterioare, în afara controlului proiectantului de instalații: **fișa tehnologică definitivă a operatorului hipermarketului** (înălțimea reală de stivuire, care guvernează alegerea între HHS III și ESFR, v. PTh-I.10.1), **geometria finală a atriumului** (condiție pentru simularea CFD definitivă, v. PTh-I.7.3) și **planul definitiv de dispunere a rafturilor/tenant-mix-ul galeriei** (care confirmă poziția finală a fiecărui cap de sprinkler și a fiecărui punct de contorizare individuală). Aceste condiționări sunt semnalate explicit, nu ascunse, coerent cu principiul de transparență tehnică aplicat pe întreaga suită de documentații UrbanX.

---

## PTh-I.11 Coordonarea instalațiilor de bază (shell&core) cu amenajarea chiriașilor (fit-out)

### PTh-I.11.1 De ce un mall se execută în două straturi tehnice succesive, nu într-unul singur

Spre deosebire de o hală industrială sau o clădire de birouri cu un singur beneficiar, un mall regional se execută structural în **două straturi tehnice distincte, cu executanți și cu momente de execuție diferite**: (1) **shell&core** — structura, anvelopa, rețelele principale ale tuturor instalațiilor descrise în capitolele PTh-I.2-I.10, executate integral de antreprenorul general al beneficiarului/dezvoltatorului, înainte de comercializarea galeriei; și (2) **fit-out-ul fiecărei unități comerciale** — finisajele interioare, vitrina, iluminatul de produs, echipamentele proprii (fan-coil, VRF, casă de marcat, POS), executate ulterior, separat, de fiecare chiriaș prin propriul antreprenor, pe baza unui **caiet de sarcini de fit-out** emis de administrația mall-ului. Prezentul supliment PTh de instalații tratează exclusiv stratul shell&core; caietul de sarcini de fit-out este un document distinct, elaborat separat pentru fiecare tenant-mix confirmat, care nu se substituie și nu duplică prezentul document (coerent cu principiul de zero duplicare de conținut aplicat pe întreaga suită de documentații).

### PTh-I.11.2 Punctele de predare (tie-in points) către fiecare lot line

Pentru ca fit-out-ul fiecărui chiriaș să poată fi executat independent, fără a necesita intervenții pe rețelele principale ale clădirii, shell&core-ul livrează, la limita de proprietate (lot line) a fiecărei unități, un set standardizat de **puncte de predare**, documentat explicit pe planul de execuție al fiecărui lot:

| Instalație | Punct de predare la lot line | Capacitate rezervată (unitate-tip 100 mp) |
|---|---|---|
| Electric | racord din tabloul chiriaș (v. PTh-I.2.10), cu contorizare individuală | 15-25 kW (funcție de categoria de tenant-mix) |
| Apă rece | racord cu robinet de izolare + cămin de contorizare pe culoarul tehnic | conform DTAC §2.4 (dotare sanitară minimă) |
| Canalizare | racord la coloana verticală cea mai apropiată, cu diametru minim precizat | Ø minim 50 mm |
| Agent termic/frigorific (Model A) | racord 2 țevi (tur/retur) cu vană de reglaj + contorizare energie | conform PTh-I.3.14 (120-150 W/mp) |
| Aer proaspăt tratat (CTA galerie) | gură de branșament VAV, cu contorizare debit | 8-12 l/s·mp comercial (SR EN 16798-1, categoria II) |
| Curenți slabi | cutie de demarcație (demarc box) — voce/date/CATV, fibră sau cupru Cat.6A | minimum 2 fire/circuite redundante |
| Rezervă structurală terasă (Model B, dacă e cazul) | zonă delimitată, cu încărcare admisă precizată | conform PTh-I.3.14 |

### PTh-I.11.3 Caietul de sarcini de fit-out — cerințe minime obligatorii pentru chiriași

Caietul de sarcini de fit-out (document distinct, emis de administrația mall-ului către fiecare chiriaș la semnarea contractului de închiriere) preia, ca cerințe minime obligatorii, principiile stabilite prin prezentul PTh, astfel încât execuția descentralizată a zecilor de fit-out-uri să nu compromită performanța și siguranța ansamblului: (1) niciun element al fit-out-ului nu poate reduce secțiunea utilă sau accesul de mentenanță al rețelelor principale de sprinklere/hidranți care traversează unitatea (v. PTh-I.2.1); (2) orice modificare a compartimentării interioare a unității (pereți despărțitori de fit-out) se declară către administrația mall-ului pentru actualizarea planului IDSAI și a matricei cauză-efect (v. PTh-I.2.12), dat fiind că detectoarele de plafon ale unei unități aparțin sistemului centralizat, nu fit-out-ului chiriașului; (3) puterea electrică instalată de chiriaș nu poate depăși capacitata rezervată la tabloul chiriaș fără o cerere expresă de majorare, verificată de proiectantul de instalații al mall-ului împotriva rezervei reale disponibile pe PT-ul deservent (v. PTh-I.3.10); (4) orice echipament de bucătărie/gătit (relevant în special pentru chiriașii de tip food&beverage din afara food-court-ului dedicat) necesită hotă proprie cu exhaustare dedicată, dimensionată și avizată separat, pe același principiu ca la food-court (v. PTh-I.2.3), fără racordare la ventilarea generală a galeriei.

### PTh-I.11.4 Etapizarea comercială (remodelări) — rezerva de capacitate deja constituită la shell&core

Coerent cu principiul de la DTAC §1.5 (rezervă de capacitate de minimum 15-20% pentru remodelare comercială la 5-10 ani), execuția PTh a rețelelor terminale (electric, apă, agent termic/frigorific, VAV aer proaspăt) la lot line include această marjă încă din faza de execuție inițială — nu se adaugă ulterior, prin lucrări de refacere, ci se dimensionează de la început pentru capacitatea majorată. Aceasta permite administrației mall-ului să reconfigureze loturile (unificarea a două unități mici într-una mare, sau invers) fără intervenții pe rețeaua principală de distribuție, ci doar prin redistribuirea punctelor de predare deja existente la limitele loturilor adiacente — un avantaj tehnic-economic direct al proiectării shell&core cu marjă, care reduce semnificativ costul și durata reconfigurărilor comerciale ulterioare punerii în funcțiune.

### PTh-I.11.5 Responsabilitatea de verificare la recepția fit-out-ului

Recepția fiecărui fit-out (înainte de deschiderea comercială a unității respective) include, din partea administrației tehnice a mall-ului (echipa FM, v. DTAC §19.1), o verificare explicită a conformității instalațiilor de fit-out cu caietul de sarcini: poziția și tipul capetelor de sprinkler suplimentare (dacă fit-out-ul introduce compartimentări noi care necesită capete adiționale, montate de chiriaș dar pe rețeaua comună, cu autorizarea proiectantului PSI al mall-ului), integrarea corectă a oricărui detector suplimentar în bucla IDSAI existentă, respectarea puterii electrice contractate și funcționarea corectă a contorizării individuale pe toate cele trei fluide (apă, energie termică/frig, energie electrică — v. DTAC §2.7/4.3/9.4). Această verificare este condiție obligatorie pentru autorizarea funcționării comerciale a unității, distinctă de — dar coordonată cu — autorizația de securitate la incendiu a întregii clădiri obținută la PIF-ul shell&core (v. PTh-I.7).
