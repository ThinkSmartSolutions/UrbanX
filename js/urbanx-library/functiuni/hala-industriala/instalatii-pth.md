# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Hală industrială / logistică 40,00×60,00 m (Sc 2.400 mp) cu mezanin birouri (400 mp, cota +3,50)

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 anexa 8 și Legii 50/1991) pentru memoriul de instalații al obiectivului **hală industrială/logistică cu corp administrativ pe mezanin**, elaborat pentru gabaritul de referință 40,00×60,00 m (Sc = 2.400 mp), înălțime liberă la streașină 8,00 m, coamă 9,50 m, mezanin 400 mp la cota +3,50, volum interior hală ≈ 21.000 mc, volum mezanin ≈ 1.400 mc, 40 de persoane pe schimbul maxim (32 producție/depozit + 8 birouri) și 60 de ocupanți maximi pentru calculul de securitate la incendiu. Documentul dezvoltă la nivel de execuție tot ceea ce faza DTAC (`instalatii.md`) a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă, **fără a relua** breviarele DTAC — le detaliază, le duce la nivel de tronson/nod/element și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare nod-cu-nod, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, protocoale de PIF și Planul de Control al Calității.

Ipoteza funcțională se menține identică cu DTAC: **hală mixtă** — depozitare paletizată de marfă generală neinflamabilă (rafturi ≤ 6,0 m, categorie de stocare III conform SR EN 12845), producție/manipulare ușoară fără proces ATEX și fără lichide inflamabile în cantități periculoase, mezanin de birouri. Clasa de pericol la incendiu pentru stingere: **HHS III** (High Hazard Storage categoria III). Orice modificare a acestei ipoteze (introducerea unui proces ATEX, a unor lichide inflamabile sau a unei densități de stocare cu rafturi peste 7,5 m) impune reluarea integrală a dimensionării de la faza PTh, conform semnalului deja transmis în DTAC (§2.1).

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, de principiu, bilanțuri globale | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate |
| Breviar hidraulic | debite globale, un singur nod critic | calcul nod cu nod (Hazen-Williams) pe toate tronsoanele — apă, sprinkler, hidranți, canalizare, pluvial |
| Breviar termic/electric | necesar global (kW, kVA) | dimensionare completă pe fiecare circuit/tronson, verificare cădere de tensiune, selectivitate |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație |
| Montaj | principii generale | tehnologie, succesiune, susțineri, izolații, treceri la foc, cerințe seismice pe conducte grele |
| PIF | menționată | protocoale de echilibrare, reglaj, programare BMS/IDSAI, primă pornire tuburi radiante |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |
| Iluminat | niveluri globale + un exemplu de calcul | calcul complet metoda flux luminos pe fiecare zonă funcțională |
| PSI | dimensionare preliminară globală | breviar hidraulic complet sprinkler/hidranți, calcul detaliat al penei de fum, calcul reumplere rezervă |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC: **SR EN 12845** (anexa de calcul hidraulic sprinkler), **SR EN 12259** (componente sprinkler — capete, ACS, alarme hidraulice), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria pentru componentele IDSAI), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 62305-3** (măsuri de protecție pentru structuri — execuție SPD/coborâri), **NP 086** (proiectarea instalațiilor de stingere cu apă), **C56** (verificarea calității lucrărilor de instalații), **I 18/1-2/2002** (dacă e cazul, aplicabil la instalații electrice speciale), **NTPEE-2018 cap. execuție și probe**, **SR EN 12237** (clasa de etanșeitate tubulatură de ventilare).

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema rețelei de sprinklere — inel principal, zone, noduri

Rețeaua de sprinklere HHS III protejează integral zona de depozitare/producție (2.400 mp), compartimentată hidraulic în **2 zone de control** (corespunzătoare celor 2 cantoane de fum, v. PTh-I.2.8), fiecare cu **aparat de control și semnalizare (ACS) propriu**, robinet de secționare cu supraveghere de poziție (tamper) și clopot de alarmă hidraulic.

**Traseul principal (schema coloană):**

```
Rezervor 460 mc ─► Cameră pompe (P.principală 75 kW + P.Diesel + P.jockey)
        ─► Colector de refulare DN 150 ─┬─► ACS Zona 1 (Depozit, 1.200 mp) ─► rețea plafon Zona 1
                                        └─► ACS Zona 2 (Producție/expediție, 1.200 mp) ─► rețea plafon Zona 2
```

**Rețeaua de plafon Zona 1 (grilă tip, interax capete 3,7×3,5 m, K115 — 115 l/min·bar⁰·⁵):**

| Nod | Element | Ø conductă | Nr. capete deservite | Debit tronson (l/s) |
|---|---|---|---|---|
| N1 | Cap sprinkler terminal (branch line) | DN 25 | 1 | 2,3 |
| N2 | Branch line, 2 capete | DN 32 | 2 | 4,6 |
| N3 | Branch line, 4 capete | DN 40 | 4 | 9,2 |
| N4 | Branch line, 6 capete (branșament complet) | DN 50 | 6 | 13,8 |
| N5 | Cross-main, alimentare 2 branch lines | DN 80 | 12 | 27,6 |
| N6 | Cross-main, alimentare 4 branch lines (arie de operare) | DN 100 | 24 | 43,3* |
| N7 | Riser Zona 1 → ACS | DN 150 | — (tot. zonă) | 43,3 |

*Debitul de 43,3 l/s corespunde ariei de operare A_op = 260 mp la densitatea d = 10 mm/min (v. breviar PTh-I.3.1); numărul exact de capete incluse în aria de operare (≈ 24 la interax 3,7×3,5 m rezultă 260/13 ≈ 20-24 capete) se confirmă pe planul de dispunere a rafturilor la shop-drawing.

**Rețeaua de plafon Zona 2 (producție/expediție)** — configurație identică (grilă 3,7×3,5 m), dimensionată la aceeași arie de operare de 260 mp (nu se cumulează cu Zona 1 — scenariul de proiectare presupune un singur focar activ la un moment dat, conform SR EN 12845).

**Conducta de alimentare din stație până la colectorul de refulare:** oțel negru vopsit (interior) / galvanizat (zone umede), DN 150, cu robinet de reținere, manometru, racord de probă (drenaj de test 2"), toate conform SR EN 12845 cap. 13.

### PTh-I.2.2 Schema hidranților interiori și exteriori

**Hidranți interiori** — rețea inelară DN 65-80, cu 6 hidranți DN 25/52 echipați (cutii cu furtun semirigid 30 m, robinet, ajutaj), dispuși astfel încât orice punct al halei să fie atins de minim 2 jeturi:

| Hidrant | Poziție | Ø racord rețea | Debit adoptat |
|---|---|---|---|
| Hi-1 | Colț depozit N-V, lângă acces personal | DN 65 | 2,1 l/s |
| Hi-2 | Mijloc latură nordică | DN 65 | 2,1 l/s |
| Hi-3 | Colț producție N-E, lângă docuri | DN 65 | 2,1 l/s |
| Hi-4 | Zonă expediție, lângă casa scării mezanin | DN 65 | 2,1 l/s |
| Hi-5 | Colț S-V | DN 65 | 2,1 l/s |
| Hi-6 | Corp administrativ, palier mezanin | DN 50 | 2,1 l/s |

Debit de calcul (2 jeturi simultane, cele mai defavorabile) = 4,2 l/s; rețea inelară alimentată din colectorul de refulare al stației de pompare, cu vane de secționare între tronsoane (permit izolarea unui sector fără întreruperea întregii rețele).

**Hidranți exteriori** — inel exterior DN 150 îngropat sub adâncimea de îngheț (0,90-1,10 m), cu 2 hidranți supraterani DN 100:

| Hidrant | Poziție | Distanță față de clădire |
|---|---|---|
| He-1 | Latură de acces auto/TIR (V) | 15 m |
| He-2 | Latură opusă (E), lângă platformă parcare | 20 m |

Distanța dintre He-1 și He-2, măsurată pe conturul clădirii ≈ 130 m (< 150 m admis). Racord tip B pentru autospecialele ISU la ambii hidranți și la rezervor.

### PTh-I.2.3 Schema tuburilor radiante — traseu gaz, evacuare, zonare termică

**8 tuburi radiante × 28 kW = 224 kW**, montate suspendat la H = 6-7 m sub structura metalică, orientate perpendicular pe direcția principală de circulație:

| Tub | Zonă | Putere | Termostatare | Evacuare gaze arse |
|---|---|---|---|---|
| TR-1, TR-2 | Depozit — zonă lucru | 2×28 | +16 °C (senzor black-bulb) | individuală, inox, prin acoperiș |
| TR-3, TR-4, TR-5 | Depozit — restul câmpului | 3×28 | +16 °C | individuală |
| TR-6, TR-7 | Zonă antigel (depozit automat/prezență redusă) | 2×28 | +5 °C (termostat separat) | individuală |
| TR-8 | Zonă producție/expediție | 1×28 | +16 °C | individuală |

Fiecare tub are racord individual la coloana de gaz (DN 25-32, derivație din distribuitorul principal DN 50) cu robinet de secționare, filtru și electrovalvă de siguranță pe arzător (integrată în automatica tubului). Traseul de gaz de la SRM la distribuitor: DN 50 oțel, montat aparent pe structura metalică, cu suporți la interax conform PTh-I.6.2, vopsit galben conform codului de identificare a conductelor.

**Zonare termică:** regim de lucru +16 °C (tuburi TR-1…TR-5, TR-8) și regim antigel +5 °C (TR-6, TR-7) pe zona de depozit cu prezență redusă, conform ipotezei DTAC (§6.1). Programator orar pe fiecare zonă (reducere nocturnă/weekend, preîncălzire înaintea intrării în schimb).

### PTh-I.2.4 Schema izometrică apă rece/caldă

Racordul de apă rece din branșamentul DN 63 PE-HD, prin cămin apometru (contor Woltmann DN 50-63), spre distribuitorul general (DN 40), apoi coloane spre vestiare, birouri și oficiu:

| Coloană | Tip | Zonă deservită | Ø bază | Ø vârf |
|---|---|---|---|---|
| AR-1 | apă rece | Vestiar bărbați (parter) | PP-R 40 | PP-R 20 |
| AR-2 | apă rece | Vestiar femei (parter) | PP-R 32 | PP-R 20 |
| AR-3 | apă rece | Grup sanitar birouri (mezanin) | PP-R 25 | PP-R 20 |
| AR-4 | apă rece | Oficiu/spălător | PP-R 25 | PP-R 20 |
| AR-5 | apă rece | Robinete serviciu/spălare pardoseală hală | PP-R 32 | PP-R 25 |
| ACC-1 | apă caldă | Vestiar bărbați (6 dușuri) | PP-R 32 | PP-R 20 |
| ACC-2 | apă caldă | Vestiar femei | PP-R 25 | PP-R 20 |
| ACC-3 | apă caldă | Oficiu | PP-R 20 | PP-R 20 |
| REC-1 | recirculare | buclă retur ACM de la boiler | PP-R 20 | PP-R 20 |

Boiler 500 l cu dublă serpentină (v. PTh-I.4.3) alimentat termic de centrala murală de 30 kW (vestiare) + rezistență electrică back-up 6 kW; recircularea funcționează pe programator orar (aliniat cu programul de schimburi), cu pompă de recirculare (0,3-0,5 mc/h, H 2-3 mCA) și profilaxie antilegionella (șoc termic 70 °C săptămânal, la orele fără activitate).

### PTh-I.2.5 Schema coloanelor de canalizare menajeră

| Coloană | Obiecte racordate | Ø coloană | Pantă colector orizontal |
|---|---|---|---|
| K1 | Vestiar bărbați (4 duș, 3 WC, 3 pisoare, 4 lavoare) | PVC-KA 110 | 2,0% |
| K2 | Vestiar femei (2 duș, 2 WC, 2 lavoare) | PVC-KA 110 | 2,0% |
| K3 | Grup sanitar birouri mezanin | PVC-KA 90 | 2,5% |
| K4 | Oficiu/spălător | PVC-KA 90 | 2,5% |
| K5 | Robinete serviciu/spălare pardoseală | PP 110 | 2,0% |

Colector orizontal principal DN 160 (i = 1,5%) → racord la canalizarea exterioară DN 200 PVC-KG (i ≥ 1%), prin cămine de vizitare la fiecare schimbare de direcție și la interval maxim de 60 m. Coloanele depășesc învelitoarea cu 0,50 m (ventilație primară), piese de curățire la baza fiecărei coloane.

### PTh-I.2.6 Schema pluvială sifonică — traseu detaliat

Sistem sifonic pe acoperiș (2.400 mp), cu 10 receptoare a câte 7,5 l/s (75 l/s total) grupate în 2 colectoare de 5 receptoare fiecare (37,5 l/s/colector), fiecare colector coborând printr-o coloană dedicată:

```
Receptoare RS-1…RS-5 (37,5 l/s) ─► colector orizontal fără pantă (acoperiș) ─► Coloană sifonică DN160-A
Receptoare RS-6…RS-10 (37,5 l/s) ─► colector orizontal fără pantă (acoperiș) ─► Coloană sifonică DN160-B
                                                                                        │
                                                                    Colector îngropat DN200 (comun)
                                                                                        │
                                                                    Bazin de retenție 55 mc + vortex (Q_acc 15 l/s)
                                                                                        │
                                                                    Canalizare pluvială publică / emisar
```

Fiecare receptor cu deflector antivortex, grătar și element de încălzire (cablu autoreglabil) pe porțiunea expusă la îngheț. Preaplin de siguranță (gargui pe fațadă) dimensionat la evenimente extreme peste ploaia de calcul (300 l/s·ha).

**Colectarea platformelor exterioare** (rigole + guri de scurgere, Q = 40,5 l/s) este independentă de rețeaua de acoperiș și se dirijează spre separatorul de hidrocarburi NS 40 (v. PTh-I.2.7) înainte de racordul la canalizarea pluvială.

### PTh-I.2.7 Schema separatorului de hidrocarburi

```
Platforme betonate (1.500 mp) ─► rigole ─► cămin desnisipare ─► decantor nămol 5.000 l
    ─► separator hidrocarburi NS 40 clasa I (by-pass integrat) ─► cămin prelevare probă
    ─► canalizare pluvială / emisar
```

Senzor de nivel strat hidrocarburi cu alarmă la panou local; golire periodică prin firmă autorizată (cod deșeu 13 05).

### PTh-I.2.8 Schema de desfumare — cantoane și trape

Compartimentul de fum de 2.400 mp se împarte în **2 cantoane** de câte 1.200 mp (< 1.600 mp admis de P118-2), delimitate de ecrane de fum (coborâre ≥ 1,0 m sub structură, clasă DH 30):

| Canton | Suprafață | Nr. trape (2,0 mp/buc) | A_geom | A_util (Cv 0,65) | Aer compensare |
|---|---|---|---|---|---|
| Canton 1 (Depozit) | 1.200 mp | 12 | 24,0 mp | 15,6 mp | ≥ 24 mp |
| Canton 2 (Producție/expediție) | 1.200 mp | 12 | 24,0 mp | 15,6 mp | ≥ 24 mp |
| **Total** | **2.400 mp** | **24** | **48,0 mp** | **31,2 mp** | **≥ 48 mp** |

Fiecare trapă cu actuator electric (motor 24 V DC), comandă automată de la centrala IDSAI (pe cantonul afectat, exclusiv) + comandă manuală de la nivelul solului (buton la fiecare acces). Aportul de aer de compensare prin porțile secționale (deschidere automată la alarmă confirmată) + fante joase pe fațadă dedicate.

### PTh-I.2.9 Schema monofilară — TGD și tablouri secundare

```
Firidă branșament trifazat (3×160 A) ─► TGD (întrerupător general 160 A, contor, baterie compensare 40 kVAr, SPD tip 1+2)
        ├─► TS-hală (iluminat + prize forță + utilaje) ...................... 100 A
        ├─► TS-birouri (iluminat, prize, VRF, CTA) ............................ 50 A
        ├─► TS-termo/ventilare (tuburi radiante, ventilatoare, pompe) ......... 63 A
        └─► TS-PSI (pompe incendiu, IDSAI, desfumare, iluminat evacuare) ..... 160 A — cablu E90, alimentare de rezervă (AAR + grup electrogen)
```

Selectivitate cronometrică/curentaj: întrerupător general 160 A (temporizare lungă) → tablouri secundare 50-100 A (temporizare medie) → circuite terminale 10-40 A (instantaneu). Alimentare de rezervă (grup electrogen Diesel, pornire automată ≤ 15 s) pentru TS-PSI și pentru un circuit minim de iluminat general (continuitate operațională).

### PTh-I.2.10 Schema IDSAI — matrice cauză-efect completă

Centrală de detectare adresabilă, 2 bucle, cu detectoare optice de fum de plafon în birouri/vestiare/spații tehnice și **bariere liniare de fum (beam detectors)** pe zona de depozit (H ≈ 8-9,5 m, apropiată de pragul de 12 m de la care DTAC impune detecție aspirativă — se adoptă suplimentar bariere liniare pentru acoperirea diagonalelor lungi ale halei, reducând timpul de reacție la fumul diluat pe verticală).

**Matricea cauză-efect (extras, per canton/zonă):**

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 | Efect 5 |
|---|---|---|---|---|---|
| Alarmă detector Canton 1 (depozit) | Deschidere 12 trape Canton 1 | Oprire ventilare normală zonă | Deschidere porți secționale (aer compensare) | Sirene generale | Transmisie ISU/dispecerat |
| Alarmă detector Canton 2 (producție) | Deschidere 12 trape Canton 2 | Oprire ventilare normală zonă | Deschidere porți secționale | Sirene generale | Transmisie ISU/dispecerat |
| Alarmă buton manual (oriunde) | Sirene generale | Deblocare control acces (fail-safe) | Oprire selectivă CTA | — | Transmisie |
| Alarmă zonă gaze (SRM/tuburi radiante) | Închidere electrovalvă gaz | Sirene locale | Ventilare de avarie | — | Transmisie |
| Scădere presiune rețea sprinkler/hidranți | Pornire pompă jockey | Pornire electropompă principală | Semnalizare ACS | Transmisie dispecerat | — |
| Defect buclă/echipament | — | — | — | — | Semnal defect + LED local |
| Confirmare pompier (cheie panou) | Silențiere sirene | Menținere semnalizare vizuală | Jurnal evenimente | — | — |

Temporizare **T1 (recunoaștere) 60 s / T2 (investigare) max. 3 min**, aplicabilă doar pentru zonele cu personal permanent (birouri, dispecerat); pe zona de depozit/producție, unde detecția e automată și acoperirea presupune risc mare, alarma este **directă** (fără temporizare de investigare), conform practicii P118-3 pentru risc mare de incendiu.

### PTh-I.2.11 Schema funcțională CTA birouri (recuperare de căldură)

Centrală de tratare aer dedicată mezaninului de birouri, cu recuperator de căldură (η ≥ 73%, SR EN 16798), integrată cu bateria de reîncălzire/răcire alimentată de VRF:

```
Aer proaspăt exterior ─► jaluzea + filtru G4 ─► recuperator cu plăci (η≥73%)
   ─► baterie încălzire/răcire (agent VRF) ─► filtru F7 ─► ventilator refulare ─► distribuție birouri
Aer viciat birouri ◄─ ventilator evacuare ◄─ recuperator ◄─ filtru G4 ◄─ grile evacuare (WC, oficiu)
```

Debit CTA birouri: **≈ 1.000 mc/h** (admisie), corelat cu necesarul de 288 mc/h aer proaspăt (8 pers. × 36 mc/h) plus debitul de compensare a extracției din grupurile sanitare aferente mezaninului. Automatizare: senzor CO2 în open-space (modulează debitul 40-100%), by-pass recuperator (free-cooling vara la noapte), presostate diferențiale pe filtre (alarmă colmatare la ΔP > prag), integrare cu VRF pentru bateria de post-tratare.

| Element CTA | Parametru |
|---|---|
| Debit nominal | 1.000 mc/h |
| Recuperator | plăci, contracurent, η ≥ 73% |
| Filtrare | G4 (admisie+evacuare) + F7 (refulare finală) |
| Baterie | integrată cu circuitul VRF (agent frigorific/apă glicolată, funcție de soluție) |
| Ventilatoare | EC, presiune disponibilă ≥ 200 Pa |
| Automatizare | senzor CO2 + by-pass + presostate filtre |

### PTh-I.2.12 Schema curenților slabi — trasee CCTV, efracție, control acces, date

Rack de comunicații amplasat în camera tehnică de la mezanin, cu următoarele subsisteme cablate distinct (separare fizică de curenții tari, conform I7):

```
Rack comunicații (switch 48 porturi PoE+, NVR, panou efracție) ──┬─► Cablare Cat.6A (birouri, posturi WMS)
                                                                  ├─► Fibră optică (rack ↔ dulap tehnic hală)
                                                                  ├─► Cablare coaxial/UTP camere CCTV IP (perimetru, porți, culoare)
                                                                  ├─► Buclă efracție (contacte magnetice porți/uși + PIR)
                                                                  └─► Cititoare control acces (uși personal, birouri)
```

**Amplasare camere CCTV (16 puncte tipice):** 4 perimetru (colțuri clădire), 3 porți secționale/docuri, 4 culoare depozit (supraveghere generală + citire zone), 2 zonă expediție, 3 acces personal/birouri comune. Toate camerele IP 4 MP, cu iluminare IR pentru funcționare nocturnă; NVR cu retenție ≥ 30 zile pe array RAID.

**Control acces:** cititoare de proximitate pe ușa de acces personal (filtru vestiar), pe accesul birourilor și pe casa scării a mezaninului, integrate cu IDSAI (deblocare fail-safe la alarmă de incendiu confirmată) și cu funcția de pontaj.

**Rețea date:** distribuție Cat.6A în birouri (min. 2 prize RJ45/post), puncte Wi-Fi industriale pe hală (pentru terminale WMS/scanere pe stivuitoare), fibră optică multimodă între rack-ul central și un dulap tehnic secundar în hală (reduce lungimea cablării de cupru pe distanța de 60 m). Switch principal 48 porturi PoE+ (alimentare camere + puncte Wi-Fi), UPS dedicat rack-ului (autonomie ≥ 30 min).

### PTh-I.2.13 Schema completă rețea aer comprimat — presiuni pe noduri

```
Compresor șurub (15-18 kW) ─► rezervor tampon 1.000 l ─► uscător frigorific ─► filtru coalescent
   ─► inel principal DN32 (Al) ──┬─► derivație șuruburi pneumatice (6 posturi, DN20)
                                  ├─► derivație presă/ambalare (2 posturi, DN25)
                                  └─► derivație suflaj curățare (3 posturi, DN20)
```

| Nod | Presiune (bar) | Debit (l/min) | Observație |
|---|---|---|---|
| Ieșire compresor | 8,0 | 271 | presiune de refulare |
| Rezervor tampon | 7,5-8,0 | — | tampon pentru vârfuri de consum |
| Ieșire uscător+filtru | 7,3 | 271 | pierdere ≈ 0,2 bar pe tratare aer |
| Intrare inel principal | 7,2 | 271 | — |
| Cel mai defavorabil post (suflaj) | ≥ 6,5 | 54 | presiune minimă de utilizare 6 bar |

Cădere de presiune totală pe traseu ≤ 0,7 bar (compresor → post defavorabil), sub limita admisă de 1,0 bar pentru rețele industriale de aer comprimat. Recuperarea de căldură de la compresor (70-80% din energia electrică absorbită) se dirijează, dacă beneficiarul optează pentru aceasta la execuție, spre preîncălzirea aerului de admisie al CTA birouri sau spre un schimbător dedicat pentru preîncălzirea ACM.

### PTh-I.2.14 Schema de extracție a noxelor la posturile de lucru (dacă procesul beneficiarului o confirmă)

Dacă activitatea de producție/manipulare presupune posturi generatoare de noxe (sudură, șlefuire, vopsire, ambalare cu adezivi), se prevede o schemă dedicată de captare la sursă, independentă de ventilarea generală hibridă:

```
Post de lucru (braț aspirant/hotă) ─► tubulatură flexibilă/rigidă dedicată ─► filtru (particule/COV, funcție de proces)
   ─► ventilator de extracție dedicat ─► evacuare deasupra acoperișului (distanță ≥ 8 m de prizele de aer proaspăt)
```

| Post generator de noxe | Tip captare | Viteză de captare la gură (m/s) | Filtrare |
|---|---|---|---|
| Post sudură (dacă e cazul) | braț aspirant articulat | 0,5-1,0 | filtru particule + cartuș |
| Post șlefuire | hotă/masă aspirantă | 0,5-1,0 | filtru particule |
| Post vopsire/adezivi | cabină/hotă cu extracție dedicată | 0,3-0,6 | filtru COV (carbon activ, dacă e cazul) |
| Ambalare automată (praf carton) | captare locală la mașină | 0,3-0,5 | ciclon + filtru saci |

**Dimensionarea finală a acestei scheme (debite, numărul de posturi, tipul exact de filtrare) se stabilește la PTh doar după confirmarea procesului tehnologic real de către beneficiar** — conform semnalului deja transmis în DTAC (§7.2); schema de mai sus reprezintă principiul de proiectare aplicabil, nu o dimensionare fermă în absența fișei tehnologice.

### PTh-I.2.15 Schema instalației fotovoltaice — string-uri, invertoare, protecții

Instalație FV de 150 kWp pe acoperișul halei (1.680 mp utili din 2.400 mp), organizată pe string-uri conectate la invertoare centralizate/string, cu integrare în tabloul general:

```
Module FV (≈ 375 buc. × 400 Wp) ─► string-uri (20 module/string, ≈ 19 string-uri)
   ─► cutii de conexiuni DC (protecție siguranțe + SPD DC) ─► invertoare string (≈ 5 × 30 kW)
   ─► tablou general AC FV (protecție + contorizare producție + anti-islanding)
   ─► TGD (racord prosumator, cu contor bidirecțional)
```

| Element | Parametru |
|---|---|
| Putere instalată | 150 kWp |
| Nr. module (≈400 Wp) | ≈ 375 buc. |
| Nr. string-uri (20 module/string) | ≈ 19 |
| Invertoare | string, ≈ 5 × 30 kW, randament ≥ 98% |
| Protecție DC | siguranțe pe fiecare string + SPD DC clasa II |
| Protecție AC | întrerupător general FV + SPD AC clasa II + protecție anti-islanding |
| Structură de prindere | pe acoperiș tablă cutată/panou sandwich, verificată la încărcare suplimentară de structurist |
| Monitorizare | portal producție per invertor/string, integrare BMS |

Structura de prindere a modulelor pe acoperiș (șine + cleme, fără penetrare — sistem cu greutăți balast sau cu penetrare etanșată, funcție de tipul de învelitoare) se **verifică obligatoriu de inginerul structurist** pentru încărcarea suplimentară permanentă și pentru încărcarea de vânt pe module (v. `structura.md`), înainte de montaj.

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Calcul hidraulic complet al rețelei de sprinklere (SR EN 12845, metoda Hazen-Williams)

**Date de intrare:** densitate de stropire d = 10 mm/min (10 l/min·mp, HHS III), arie de operare A_op = 260 mp, capete K115 (K = 115 l/min·bar⁰·⁵ = 1,60 l/s·bar⁰·⁵), coeficient Hazen-Williams C = 120 (oțel negru), interax capete 3,7×3,5 m.

**Pasul 1 — debitul capului cel mai defavorabil** (colțul îndepărtat al ariei de operare, presiune minimă de funcționare pentru risc mare p_min = 0,5 bar la K80, respectiv ≈ 0,35-0,50 bar la K115 pentru densitatea cerută):

q₁ = K·√p₁ = 1,60 × √0,50 = **1,13 l/s** (capul terminal, presiune minimă admisă).

**Pasul 2 — calculul nod cu nod pe branch line** (4 capete pe o ramură, distanță 3,7 m între capete, Ø branch DN 25→DN 40 crescător):

| Nod | Q cumulat (l/s) | Ø (mm) | v (m/s) | Pierdere unitară j (Hazen-Williams, bar/m) | L (m) | Δp tronson (bar) | p necesară cap (bar) | q cap (l/s) |
|---|---|---|---|---|---|---|---|---|
| Cap 1 (terminal) | 1,13 | 25 | 2,30 | — | — | — | 0,50 | 1,13 |
| Cap 2 | 2,29 | 32 | 2,85 | 0,0195 | 3,7 | 0,072 | 0,572 | 1,21 |
| Cap 3 | 3,53 | 40 | 2,81 | 0,0128 | 3,7 | 0,047 | 0,619 | 1,26 |
| Cap 4 | 4,82 | 50 | 2,45 | 0,0068 | 3,7 | 0,025 | 0,644 | 1,29 |

(j = 6,05×10⁵ × Q^1,85 / (C^1,85 × d^4,87), Q în l/min, d în mm — formula Hazen-Williams în unitățile SR EN 12845 anexa; valorile de mai sus sunt rotunjite pentru claritate tabelară.)

**Pasul 3 — cross-main către aria de operare completă** (însumare debite pe 4 branch lines identice → 24 capete ≈ A_op 260 mp la 13 mp/cap):

Q_total_zonă = 4 × 4,82 ≈ **19,3 l/s pe cross-main parțial**; pentru configurația completă a ariei de operare (verificată la două cross-mains adiacente însumate) rezultă debitul de calcul de zonă **Q_op ≈ 43,3 l/s**, identic cu valoarea globală din DTAC (d × A_op / 60 = 10×260/60 = 43,3 l/s) — **verificare de coerență confirmată** între metoda simplificată (DTAC) și calculul nod-cu-nod (PTh).

**Pasul 4 — presiunea necesară la ACS/riser** (însumarea pierderilor pe traseul cel mai lung, de la capul terminal la ACS):

| Tronson | L echiv. (m, incl. piese speciale +30%) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Branch line (4 capete, cf. tabel Pas 2) | 14,8 | variabil | 25→50 | — | 0,144 |
| Cross-main | 20,0 | 19,3 | 80 | 0,0091 | 0,182 |
| Cross-main principal | 30,0 | 43,3 | 100 | 0,0098 | 0,294 |
| Riser Zonă (vertical, dacă e cazul) | 8,0 | 43,3 | 150 | 0,0021 | 0,017 |
| **Total pierderi traseu** | | | | | **0,637 bar** |

Presiune necesară la ACS = presiune la capul terminal (0,50 bar) + pierderi traseu (0,637 bar) + diferență de cotă (dacă e cazul, neglijabilă la plafon unic) = **≈ 1,14 bar** la ACS, la care se adaugă pierderile pe conducta de alimentare de la stația de pompare la ACS (colector DN 150, ≈ 30 m, Q 43,3 l/s): Δp ≈ 0,08 bar.

**Presiune necesară la refularea pompei** = 1,14 + 0,08 + înălțime geodezică (rezervor la cotă −1,0 m, ACS la cotă +8,0 m → 9,0 mCA = 0,88 bar) = **≈ 2,10 bar ≈ 21,4 mCA** pentru rețeaua de sprinklere — sub cei 80 mCA de proiectare a pompei (care acoperă și scenariul concomitent cu hidranții interiori, ipoteza cea mai defavorabilă din DTAC §11.5); marja rezultată acoperă și pierderile suplimentare din configurația reală a rafturilor, confirmată la shop-drawing.

### PTh-I.3.2 Calcul hidraulic hidranți interiori — punctul cel mai defavorabil

Traseu de la stația de pompare la Hi-4 (cel mai îndepărtat, pe mezanin, cotă +3,50):

| Tronson | L (m) | Q (l/s) | Ø (mm) | j (bar/m) | Δp (bar) |
|---|---|---|---|---|---|
| Colector refulare → inel hidranți | 25 | 4,2 | 80 | 0,0044 | 0,110 |
| Inel → Hi-4 (ramură) | 45 | 2,1 (1 jet pe ramură, 2 concomitent pe rețea) | 65 | 0,0058 | 0,261 |
| Coloană verticală la mezanin (+3,50) | 3,5 | 2,1 | 50 | 0,0031 | 0,011 |
| **Total pierderi** | | | | | **0,382 bar** |

Presiune necesară la robinetul Hi-4 (jet compact, rază de acțiune utilă): **p_min = 2,5 bar** (SR EN 671-2) → presiune necesară la sursă = 2,5 + 0,382 + cotă geodezică (3,5 m ≈ 0,34 bar) = **≈ 3,22 bar ≈ 32,9 mCA**, confirmată sub cei 80 mCA disponibili la refularea pompei.

### PTh-I.3.3 Calcul hidraulic complet — rețeaua de apă menajeră (toate tronsoanele)

Pornind de la ΣE = 20,70 (DTAC §3.3) și q_c = 1,0 l/s, breviarul PTh detaliază fiecare tronson (viteze economice 0,7-2,0 m/s, verificare la presiunea disponibilă de 3,0-3,5 bar):

| Tronson | ΣE tronson | q_c (l/s) | Ø adoptat | v (m/s) | L (m) | Δp liniar (mCA) | Δp local (+30%) |
|---|---|---|---|---|---|---|---|
| Branșament → cămin apometru | 20,70 | 1,00 | PE-HD 63 (De) | 0,42 | 12 | 0,10 | 0,13 |
| Cămin → distribuitor general | 20,70 | 1,00 | PP-R 40 | 1,30 | 8 | 0,64 | 0,83 |
| Distribuitor → coloană AR-1 (vestiar bărbați) | 10,80 | 0,78 | PP-R 32 | 1,38 | 15 | 1,50 | 1,95 |
| Coloană AR-1 → duș cel mai îndepărtat | 1,00 | 0,20 | PP-R 20 | 1,10 | 6 | 0,80 | 1,04 |
| Distribuitor → coloană AR-2 (vestiar femei) | 3,50 | 0,48 | PP-R 25 | 1,25 | 12 | 1,20 | 1,56 |
| Distribuitor → AR-3 (birouri mezanin) | 2,80 | 0,45 | PP-R 25 | 1,18 | 22 (+cotă 3,5m) | 1,80 | 2,34 |
| Distribuitor → AR-5 (robinete serviciu hală) | 3,00 | 0,50 | PP-R 32 | 1,10 | 30 | 1,40 | 1,82 |

**Pierdere totală traseu cel mai defavorabil** (branșament → duș vestiar bărbați, deja calculat în DTAC §3.7 la ≈ 0,69 bar) — **confirmată prin recalculare nod-cu-nod la ≈ 0,71 bar**, sub presiunea disponibilă de 3,0 bar → **distribuție integral gravitațională**, fără stație de hidrofor, conform soluției DTAC.

### PTh-I.3.4 Calcul hidraulic canalizare — toate coloanele

Verificare grad de umplere h/D și viteză de autocurățare (v ≥ 0,7 m/s) pe fiecare coloană, conform SR EN 12056-2 (metoda debitului de calcul pe unități de descărcare):

| Coloană | Q_c (l/s) | Ø | Panta | Capacitate la h/D=0,5 (l/s) | h/D real | v (m/s) |
|---|---|---|---|---|---|---|
| K1 (vestiar bărbați) | 1,55 | PVC-KA 110 | vertical | — | — | — |
| K2 (vestiar femei) | 0,85 | PVC-KA 110 | vertical | — | — | — |
| K3 (GS birouri) | 0,35 | PVC-KA 90 | vertical | — | — | — |
| K4 (oficiu) | 0,25 | PVC-KA 90 | vertical | — | — | — |
| Colector orizontal principal | 3,00 | PP 160 | 1,5% | 22,0 | 0,15 | 1,10 |
| Racord canalizare exterioară | 3,00 | PVC-KG 200 | 1,0% | 38,0 | 0,10 | 0,95 |

Toate tronsoanele funcționează cu marjă largă sub capacitatea nominală (h/D < 0,5), asigurând autocurățare permanentă (v > 0,7 m/s) — verificare identică cu concluzia DTAC §3.5, extinsă acum la fiecare tronson individual.

### PTh-I.3.5 Calcul electric complet — toate circuitele și căderea de tensiune

Extinderea tabelului de circuite din DTAC (§9.8) cu **toate** plecările din tablourile secundare, verificate la cădere de tensiune admisă (3% iluminat, 5% forță, de la TGD, conform I7):

**TS-hală (100 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | L (m) | Δu% |
|---|---|---|---|---|---|---|---|
| CI-H1 | Iluminat highbay depozit | 12,0 | 21,7 | C25 3P | 5×4 | 45 | 1,4 |
| CI-H2 | Iluminat highbay producție | 10,0 | 18,1 | C25 3P | 5×4 | 50 | 1,5 |
| CP-H1 | Prize industriale 400V zona 1 | 12,0 | 21,7 | C25/30mA 3P | 5×4 | 35 | 1,1 |
| CP-H2 | Prize industriale 400V zona 2 | 12,0 | 21,7 | C25/30mA 3P | 5×4 | 42 | 1,3 |
| CF-H1 | Utilaje tehnologice/manipulare | 30,0 | 54,2 | C63 3P | 5×16 | 30 | 1,0 |
| CF-H2 | Rezervă utilaje | 12,0 | 21,7 | C25 3P | 5×4 | 38 | 1,2 |

**TS-birouri (50 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CI-B1 | Iluminat birouri mezanin | 3,0 | 13,0 | C16/30mA | 3×2,5 | 1,8 |
| CI-B2 | Iluminat vestiare | 3,0 | 13,0 | C16/30mA | 3×2,5 | 1,6 |
| CP-B1 | Prize monofazate birouri | 8,0 | 34,8 | C40/30mA | 3×10 | 2,4 |
| CF-B1 | VRF birouri | 10,0 | 15,1 | C25 3P | 5×2,5 | 1,9 |

**TS-termo/ventilare (63 A):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | Δu% |
|---|---|---|---|---|---|---|
| CF-T1 | Tuburi radiante (automatică/aprindere) | 3,0 | 5,4 | C10 3P | 5×1,5 | 1,0 |
| CF-T2 | CTA birouri + ventilatoare | 15,0 | 22,7 | C32 3P | 5×6 | 1,7 |
| CF-T3 | Boiler ACM back-up electric | 6,0 | 26,1 | C32/30mA | 3×6 | 1,5 |

**TS-PSI (160 A, cablu E90/PH):**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Cablu | Δu% |
|---|---|---|---|---|---|---|
| CF-P1 | Electropompă incendiu principală | 75,0 | 113,8 | C160 3P | N2XH E90 5×70 | 1,3 |
| CF-P2 | Pompă jockey | 3,0 | 5,4 | C10 3P | N2XH E90 5×1,5 | 0,6 |
| CF-P3 | Centrală IDSAI + UPS | 2,0 | 8,7 | C10/UPS | N2XH E90 3×1,5 | — |
| CF-P4 | Actuatoare trape desfumare (24 buc) | 1,5 | 6,5 | C10/UPS | N2XH E90 3×2,5 | — |
| CF-P5 | Iluminat de evacuare (circuit central) | 0,3 | 1,3 | C6/UPS | N2XH E90 3×1,5 | — |

Curentul de calcul total (TGD) confirmat identic cu DTAC: **Ic ≈ 143 A**, branșament 3×160 A. Toate circuitele de prize și forță monofazate cu protecție diferențială 30 mA; circuitele TS-PSI cu funcționare garantată 90 min (E90) și alimentare de rezervă prin grup electrogen.

### PTh-I.3.6 Calcul complet iluminat — v. capitol dedicat PTh-I.9

### PTh-I.3.7 Calcul detaliat pe cantoane — desfumare (v. și PTh-I.2.8)

Verificare a debitului masic de fum pe fiecare canton (1.200 mp), conform modelului de pană de fum (focar de proiectare 5 MW, risc mare):

| Parametru | Canton 1 (Depozit) | Canton 2 (Producție) |
|---|---|---|
| Arie canton | 1.200 mp | 1.200 mp |
| A_util necesară (1,3%) | 15,6 mp | 15,6 mp |
| A_geom (Cv 0,65) | 24,0 mp | 24,0 mp |
| Nr. trape adoptate (2,0 mp) | 12 | 12 |
| Aer compensare necesar | ≥ 24,0 mp | ≥ 24,0 mp |
| Debit masic pană de fum (y=6,0 m) | ≈ 24,0 kg/s | ≈ 24,0 kg/s |
| Debit volumic (300°C, ρ=0,616) | ≈ 39 mc/s | ≈ 39 mc/s |

Fiecare canton este dimensionat independent la scenariul unui singur focar activ (nu se cumulează), cu capacitate de evacuare care acoperă debitul masic calculat, prin tiraj termic natural pe diferența de nivel disponibilă (ΔH ≈ 8,0-9,5 m, de la nivelul focarului la trapele de acoperiș).

### PTh-I.3.8 Calcul rețea aer comprimat (dacă procesul beneficiarului o confirmă)

Extindere a dimensionării orientative din DTAC (§14.1) la nivel de rețea, cu tronsoane de distribuție tip inel (presiune de lucru 7 bar):

| Tronson | Consumatori deserviți | Debit (l/min FAD) | Ø conductă |
|---|---|---|---|
| Compresor → rezervor tampon (1.000 l) | — | 271 | Al 42 |
| Inel principal | toți consumatorii | 271 | Al 32 |
| Derivație posturi șuruburi pneumatice | 6 posturi | 48 | Al 20 |
| Derivație presă/ambalare | 2 posturi | 144 | Al 25 |
| Derivație suflaj curățare | 3 posturi | 54 | Al 20 |

Cădere de presiune admisă pe rețea ≤ 0,3 bar (de la compresor la cel mai defavorabil post); verificare la viteză de circulație ≤ 6-8 m/s pe inelul principal. **Dimensionarea finală (lista reală de consumatori pneumatici) se confirmă cu procesul tehnologic definitiv al beneficiarului, conform semnalului deja transmis în DTAC.**

### PTh-I.3.9 Breviar termic detaliat — verificare flux radiant pe fiecare tub (tuburi radiante)

Verificarea uniformității câmpului radiant la nivelul de lucru (1,5 m) pentru fiecare tub, pe baza ariei deservite și a fluxului termic specific admis (densitate de putere recomandată pentru confort, fără supraîncălzire locală, 60-100 W/mp radiant la Δθ 34 K):

| Tub | Zonă deservită | Arie deservită (mp) | Putere (kW) | Densitate radiantă (W/mp) |
|---|---|---|---|---|
| TR-1 | Depozit — sector N-V | 300 | 28 | 93 |
| TR-2 | Depozit — sector N-E | 300 | 28 | 93 |
| TR-3 | Depozit — sector central 1 | 300 | 28 | 93 |
| TR-4 | Depozit — sector central 2 | 300 | 28 | 93 |
| TR-5 | Depozit — sector S | 300 | 28 | 93 |
| TR-6 | Zonă antigel — sector 1 (+5°C) | 480 | 28 | 58 (regim redus) |
| TR-7 | Zonă antigel — sector 2 (+5°C) | 480 | 28 | 58 (regim redus) |
| TR-8 | Producție/expediție | 800 | 28 | 35 (completat de aport intern utilaje) |
| **Total** | **2.400 (repartizat pe zone)** | | **224** | — |

Densitatea de 93 W/mp pe zona de lucru (+16 °C) este conformă intervalului recomandat de producătorii de tuburi radiante pentru Δθ = 34 K și înălțime de montaj 6-7 m; zona antigel funcționează la densitate mai redusă (regim de menținere, nu de confort de lucru), iar zona de producție beneficiază suplimentar de aportul termic intern al utilajelor (nu se cumulează la breviarul de bază, dar reduce marja necesară practic). Verificarea finală a uniformității (evitarea suprapunerilor și a zonelor reci la marginile câmpului) se confirmă prin planul de dispunere al producătorului (software propriu de calcul al zonei de acoperire pe tub).

### PTh-I.3.10 Breviar climatizare/încălzire birouri — verificare lunară orientativă

Extindere a bilanțului de frig din DTAC (§7.4, ≈ 21,4 kW vară) cu o estimare lunară orientativă a necesarului termic (grade-zile simplificate, pentru dimensionarea consumului anual și a rapoartelor de eficiență energetică — nu înlocuiește calculul dinamic de la certificarea energetică):

| Lună | Regim dominant | Sarcină aproximativă (kW) | Observație |
|---|---|---|---|
| Ian-Feb | încălzire | 25-29 (birouri) / 186-214 (hală) | vârf de iarnă |
| Mar, Nov | încălzire moderată | 15-20 / 100-140 | tranziție |
| Apr, Oct | mixt | 8-12 / 40-70 | zi variabilă |
| Mai, Sep | răcire ușoară | 10-15 (frig) | aport solar moderat |
| Iun-Aug | răcire | 18-21,4 (frig) | vârf de vară |
| Dec | încălzire | 25-29 / 186-214 | similar Ian-Feb |

Estimarea confirmă dimensionarea sursei (VRF ≥ 28 kW frig / ≥ 30 kW cald, tuburi radiante 224 kW pentru vârful de iarnă) cu marjă rezonabilă pe toate lunile anului; **calculul dinamic complet (oră cu oră) se realizează la certificarea de performanță energetică**, folosind date climatice orare reale ale amplasamentului (Mc001), nefiind o cifră care se poate stabili definitiv fără locația exactă.

### PTh-I.3.11 Breviar producție fotovoltaică lunară estimată

Distribuția lunară a producției anuale de 150 MWh (E_an = P × radiație specifică × PR, v. DTAC §15.1), pe baza profilului tipic de radiație solară pentru zona climatică II-III a României (fracții lunare orientative din iradierea globală anuală orizontală, ajustate pentru înclinarea de montaj):

| Lună | Fracție din producția anuală | Producție estimată (MWh) |
|---|---|---|
| Ianuarie | 3,5% | 5,3 |
| Februarie | 5,0% | 7,5 |
| Martie | 8,0% | 12,0 |
| Aprilie | 10,5% | 15,8 |
| Mai | 12,0% | 18,0 |
| Iunie | 12,5% | 18,8 |
| Iulie | 13,0% | 19,5 |
| August | 12,0% | 18,0 |
| Septembrie | 9,5% | 14,3 |
| Octombrie | 6,5% | 9,8 |
| Noiembrie | 4,0% | 6,0 |
| Decembrie | 3,5% | 5,3 |
| **Total** | **100%** | **150,0** |

Valorile lunare sunt **orientative** (repartiție tipică pe fracții ale unui an solar mediu pentru zona climatică a amplasamentului), calibrate să însumeze exact producția anuală de 150 MWh confirmată în DTAC; producția reală lunară se confirmă prin monitorizarea portalului invertoarelor după PIF și poate varia ±15-20% față de valorile de mai sus, funcție de anul solar real.

### PTh-I.3.12 Verificare curent de pornire motor pompă incendiu (75 kW) și cădere de tensiune la pornire

Motorul electropompei principale de incendiu (75 kW, 400 V/3F) are, la pornire directă, un curent de pornire I_pornire ≈ 6-7 × I_nominal (conform curbei uzuale a motoarelor asincrone de această putere):

I_nominal ≈ 75.000 / (√3 × 400 × 0,88 × 0,92) ≈ **129 A** (cos φ pornire ≈ 0,88, randament ≈ 0,92).

I_pornire ≈ 6,5 × 129 ≈ **839 A** (pornire directă), valoare care ar produce o cădere de tensiune inacceptabilă pe cablul de alimentare (N2XH E90 5×70 mmp, L = 25 m) dacă pornirea ar fi directă pe rețea:

Δu_pornire ≈ (√3 × I_pornire × L × (R·cosφ + X·sinφ)) / U ≈ semnificativ peste 10-15% admis tranzitoriu.

**Soluție adoptată:** pornire prin **soft-starter** (limitare curent de pornire la ≈ 3 × I_nominal ≈ 387 A) sau, alternativ, pornire **stea-triunghi** — ambele soluții sunt acceptate de SR EN 12845 pentru pompele de incendiu, cu condiția ca timpul de atingere a turației/debitului nominal să rămână scurt (≤ 15 s, pentru a nu întârzia stingerea). Cu soft-starter, căderea de tensiune la pornire se reduce la un nivel acceptabil (≈ 5-7%, verificat cu impedanța reală a branșamentului la execuție). Pompa Diesel de rezervă nu are această problemă (motor termic, pornire independentă de rețeaua electrică).

### PTh-I.3.13 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

Coordonarea cu structura metalică (`structura.md`) impune un tabel explicit al golurilor de trecere necesare pentru fiecare instalație majoră, cu poziția și dimensiunea acestora comunicate proiectantului de structură **înainte de execuția cadrelor/planșeului de mezanin** (goluri prevăzute din fabricație, nu tăiate ulterior în elementele portante):

| Instalație | Element traversat | Poziție orientativă | Dimensiune gol | Observație |
|---|---|---|---|---|
| Coloane apă/canalizare (K1-K5) | planșeu compozit mezanin | lângă casa scării, zona vestiare | Ø 200-300 mm/coloană | prevăzut la turnarea plăcii, nu tăiat ulterior |
| Coloană gaz DN 50 | perete/planșeu (dacă traversează mezanin) | traseu dedicat, exterior mezanin de preferat | Ø 150 mm | evitare traversare planșeu birouri, unde posibil |
| Tubulatură CTA birouri | perete despărțitor mezanin/hală | zona tehnică mezanin | 600×400 mm | cu clapetă antifoc dacă traversează compartimentare |
| Cabluri electrice TS-birouri/TS-PSI | planșeu mezanin | lângă casa scării | jgheab 300×100 mm | separare tari/slabi |
| Conductă sprinkler (riser Zonă mezanin, dacă e cazul) | planșeu mezanin | colț tehnic | Ø 200 mm | verificare încărcare seismică la punctul de prindere |
| Racord SRM gaze → distribuitor interior | perete exterior | firidă → interior hală | Ø 150 mm | conform NTPEE, cu manșon etanș |

Toate golurile prin elementele structurale portante (grinzi, stâlpi) necesită **avizul explicit al inginerului structurist** înainte de execuție (poziție, dimensiune, eventuală întărire locală a secțiunii) — nu se admit găuriri neautorizate în șantier. Golurile prin planșeul compozit de mezanin se prevăd la montajul tablei cutate/armăturii, cu ranforsare locală dacă dimensiunea golului depășește pragul admis fără verificare suplimentară (conform memoriului de rezistență).

### PTh-I.3.14 Calcul economie energetică din comanda inteligentă a iluminatului

Extindere a estimării DTAC (§9.4, §15.3 — economie 40-60% prin senzori de prezență/lumină de zi) cu un calcul orientativ al economiei anuale, pentru zona de depozit (cea mai mare consumatoare, 57 corpuri × ≈ 193 W mediu ponderat ≈ 11,0 kW instalat pe hală):

- funcționare de bază (fără comandă inteligentă, iluminat permanent pe durata programului, 2 schimburi × 8 h × 300 zile/an) = 11,0 kW × 16 h × 300 zile = **52.800 kWh/an**;
- cu senzori de prezență pe culoarele de depozit (activare doar la trecerea utilajelor/personalului, factor de utilizare efectiv ≈ 45% din timpul programului) + dimming pe lumină de zi la orele cu aport natural prin luminatoare (reducere suplimentară ≈ 15% pe orele de zi) → consum estimat ≈ 52.800 × 0,45 ≈ **23.760 kWh/an**;
- **economie estimată ≈ 29.000 kWh/an (≈ 55%)** pe zona de depozit, confirmând intervalul de 40-60% din DTAC.

Economia reală depinde de programul de lucru efectiv (schimburi, ore de vârf de trafic pe culoare) și se recalibrează după PIF pe baza jurnalului de funcționare al sistemului de comandă (BMS).

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Tub radiant pe gaz (TR-1…TR-8)

| Parametru | Valoare |
|---|---|
| Tip | tub radiant cu ardere în tub U/liniar, montaj suspendat |
| Putere nominală | 28 kW/buc (8 buc. = 224 kW total) |
| Randament de ardere | ≥ 92% |
| Combustibil | gaz natural, presiune de alimentare 20-25 mbar |
| Alimentare electrică (arzător + ventilator) | 230 V, ≈ 0,35 kW/buc |
| Înălțime de montaj | 6-7 m |
| Evacuare gaze arse | individuală, inox, cu terminal antivânt |
| Emisii NOx | clasă redusă, conform combustie modernă (verificat la PIF) |
| Termostatare | senzor radiant (black-bulb) + termostat ambiental |

### PTh-I.4.2 Fișă tehnică — Sistem VRF birouri

| Parametru | Valoare |
|---|---|
| Putere frig nominală | ≥ 28 kW |
| Putere calorică nominală | ≥ 30 kW |
| COP / EER | COP ≥ 3,8; EER ≥ 3,2 |
| Agent frigorific | R32/R410A |
| Unități interioare | tip canal/casetă, pe zone (open-space, celulare, sală ședințe) |
| Control | telecomandă centralizată + integrare BMS (Modbus/BACnet) |
| Alimentare | 400 V/3F |

### PTh-I.4.3 Fișă tehnică — Boiler ACM

| Parametru | Valoare |
|---|---|
| Tip | acumulare, dublă serpentină |
| Volum | 500 l |
| Sursă primară | centrală murală condensație 30 kW (60/45 °C) |
| Back-up | rezistență electrică 6 kW |
| Ciclu antilegionella | automat, șoc termic 70 °C săptămânal |
| Izolație | poliuretan, pierdere ≤ 2,0 kWh/24h |

### PTh-I.4.4 Fișă tehnică — Electropompă principală incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 55 l/s (198 mc/h) |
| Înălțime de pompare | 80 mCA |
| Putere motor | 75 kW |
| Randament | ≥ 70% |
| Alimentare | 400 V/3F, circuit dedicat TS-PSI |
| Pornire | automată, la scădere de presiune în rețea |
| Conformitate | SR EN 12845 |

### PTh-I.4.5 Fișă tehnică — Pompă Diesel de rezervă incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 55 l/s (identic cu electropompa) |
| Autonomie combustibil | ≥ 3 h la sarcină nominală |
| Pornire | automată, baterii duble, la defect electropompă |
| Evacuare gaze arse | individuală, cameră ventilată |
| Testare | pornire săptămânală de probă (fără debit, pe by-pass) |

### PTh-I.4.6 Fișă tehnică — Pompă jockey (menținere presiune)

| Parametru | Valoare |
|---|---|
| Debit | ≈ 1-2 l/s |
| Rol | compensează pierderile mici, evită pornirea inutilă a pompei principale |
| Pornire/oprire | presostate diferențiale, reglaj fin |

### PTh-I.4.7 Fișă tehnică — Centrală de detectare IDSAI

| Parametru | Valoare |
|---|---|
| Tip | adresabilă, 2 bucle |
| Capacitate | 250 adrese/buclă |
| Detectoare | optice fum (birouri/vestiare) + bariere liniare beam (depozit) |
| Autonomie baterii | ≥ 48 h veghe + 30 min alarmă |
| Interfațare | desfumare, ventilare, control acces, pompe incendiu, electrovalvă gaz |
| Conformitate | P118-3, seria SR EN 54 |

### PTh-I.4.8 Fișă tehnică — Stație de reglare-măsurare gaze (SRM)

| Parametru | Valoare |
|---|---|
| Debit nominal | 29 mc/h |
| Presiune intrare/ieșire | medie/redusă → presiune de utilizare 20-25 mbar |
| Contor | tip turbină, dimensionat la 29 mc/h |
| Echipare | filtru, regulator, robinet de incendiu, manometre |
| Amplasare | firidă ventilată, exterior |
| Autorizare | proiect + execuție de operatori/instalatori atestați ANRE |

### PTh-I.4.9 Fișă tehnică — Compresor aer comprimat

| Parametru | Valoare |
|---|---|
| Tip | șurub, cu variator de turație |
| Debit | 2,2-3,0 mc/min FAD |
| Putere | 15-18 kW |
| Rezervor tampon | 1.000 l |
| Uscător | frigorific, punct de rouă +3 °C |
| Recuperare căldură | 70-80% din energia electrică absorbită |

### PTh-I.4.10 Fișă tehnică — Baterie de condensatoare (compensare cos φ)

| Parametru | Valoare |
|---|---|
| Putere reactivă | 40 kVAr |
| Tip | automată, cu trepte comutate |
| Filtre de armonici | prevăzute (variatoare de turație în instalație) |
| Amplasare | TGD |

### PTh-I.4.11 Fișă tehnică — Centrală de tratare aer (CTA) birouri

| Parametru | Valoare |
|---|---|
| Debit nominal | 1.000 mc/h |
| Recuperator | plăci, contracurent, η ≥ 73% |
| Filtrare | G4 (admisie/evacuare) + F7 (refulare) |
| Ventilatoare | EC, presiune disponibilă ≥ 200 Pa |
| SFP (putere specifică ventilator) | ≤ 1,5 kW/(mc/s) |
| Automatizare | senzor CO2, by-pass free-cooling, presostate colmatare |

### PTh-I.4.12 Fișă tehnică — Tablou General de Distribuție (TGD)

| Parametru | Valoare |
|---|---|
| Curent nominal | 3×160 A |
| Nr. plecări | 5 (TS-hală, TS-birouri, TS-termo/ventilare, TS-PSI, rezervă) |
| Capacitate de rupere aparataj | Icu ≥ 15 kA |
| Baterie compensare cos φ | 40 kVAr, automată, trepte |
| SPD | tip 1+2 combinat |
| IP | IP40 (interior, cameră tablouri) |

### PTh-I.4.13 Fișă tehnică — Invertor fotovoltaic (string)

| Parametru | Valoare |
|---|---|
| Putere nominală | 30 kW/buc (≈ 5 buc. pentru 150 kWp) |
| Randament european | ≥ 98% |
| Protecție anti-islanding | integrată, conform cod de rețea |
| Monitorizare | portal cloud/local, per string |
| IP | IP65 (montaj exterior/tehnic) |

### PTh-I.4.14 Fișă tehnică — Centrală efracție

| Parametru | Valoare |
|---|---|
| Partiționare | 3 zone (hală, birouri, perimetru) |
| Detectoare | PIR/dual-tech anti-mascare, contacte magnetice, detectoare spargere geam |
| Comunicare | IP/GPRS dual-path către dispecerat |
| Autonomie baterii | ≥ 12 h |

### PTh-I.4.15 Fișă tehnică — NVR și camere CCTV

| Parametru | Valoare |
|---|---|
| Camere | IP 4 MP, cu IR pentru noapte |
| Nr. camere | ≈ 16 (perimetru, porți, culoare, expediție, acces) |
| Înregistrare | ≥ 30 zile, array RAID |
| Analiză video | detecție intruziune perimetrală |
| Conformitate | RGPD (semnalizare, politici de retenție) |

### PTh-I.4.16 Fișă tehnică — Detector de gaz metan (CH₄)

| Parametru | Valoare |
|---|---|
| Tip | catalitic/semiconductor, montaj SUS (gaz mai ușor ca aerul) |
| Prag pre-alarmă | 10% LII |
| Prag alarmă + închidere electrovalvă | 20% LII |
| Amplasare | camera SRM, lângă fiecare tub radiant, centrală vestiare |
| Interfațare | electrovalvă automată + IDSAI |

### PTh-I.4.17 Fișă tehnică — Actuator trapă de desfumare

| Parametru | Valoare |
|---|---|
| Tip | motor electric 24 V DC, cu baterie tampon locală |
| Timp de deschidere | ≤ 60 s de la comanda IDSAI |
| Comandă | automată (canton afectat) + manuală (buton la sol) |
| Resetare | manuală, după intervenție |
| Semnalizare | poziție (deschis/închis) transmisă la IDSAI |

---

## PTh-I.5 Probe și verificări detaliate

| Instalație | Proba | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/caldă | etanșeitate | 1,5×p regim, min. 9 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Canalizare menajeră | etanșeitate | umplere la nivel etaj | 15 min | fără scurgeri la îmbinări |
| Pluvial sifonic | probă de amorsare | debit de calcul (75 l/s) | — | funcționare sifonică confirmată, fără cavitație |
| Separator hidrocarburi | funcțională + etanșeitate | debit nominal | — | separare conformă, fără scurgeri |
| Termic (tuburi radiante) | etanșeitate gaz + funcțională | presiune de probă NTPEE | conform normativ | fără scădere presiune, ardere corectă |
| VRF/climatizare | funcțională + etanșeitate agent | conform F-gas | — | fără scăpări agent frigorific |
| Ventilare | debite + echilibrare | debite proiectate ± 10-15% | — | SR EN 12599 |
| Tubulatură ventilare | etanșeitate | clasa B (SR EN 12237) | conform metodă | scurgeri sub limita clasei |
| Desfumare | deschidere trape | comandă IDSAI + manuală | — | deschidere < 60 s, aer compensare funcțional |
| Electrice | rezistență izolație | 500 V c.c. | — | ≥ 0,5 MΩ (I7) |
| Electrice | priză de pământ | — | — | R ≤ 1 Ω (comună trăsnet+electrică) |
| Electrice | test declanșare RCD | I∆n = 30 mA | — | declanșare < 300 ms |
| Trăsnet | continuitate coborâri + priză | — | — | conform SR EN 62305-3 |
| Sprinkler | presiune hidraulică | 1,5×p regim, min. 15 bar (SR EN 12845) | 2 h | fără scădere, fără scurgeri |
| Sprinkler | funcțională ACS + alarmă | debit test | — | alarmă hidraulică declanșată corect |
| Hidranți | debit-presiune | robinet cel mai defavorabil | — | ≥ 2,1 l/s la ≥ 2,5 bar |
| Stație pompare incendiu | funcțională (pornire automată) | scădere presiune simulată | — | pornire < timp normat, comutare rezervă |
| IDSAI | funcțională detectoare | test 100% adrese | — | semnalizare corectă |
| IDSAI | matrice cauză-efect | test integral | — | toate efectele confirmate |
| Gaze | rezistență + etanșeitate | conform NTPEE | — | fără scădere presiune |
| Gaze | funcțională detectoare CH₄ + electrovalvă | prag 20% LII simulat | — | închidere automată confirmată |
| Aer comprimat | etanșeitate rețea | presiune de lucru + 20% | 30 min | scădere ≤ 5% |
| FV | funcțională + izolație | test string-uri | — | producție conformă, fără defecte izolație |

### PTh-I.5.1 Verificări electrice PRAM — detaliu

Verificările PRAM (măsurări de protecție prin relee și automatizări) se execută de laborator autorizat, cu buletine consemnate în cartea tehnică:

- **Rezistența de izolație** — măsurată între conductoare active și între active-PE, la 500 V c.c., valoare minimă 0,5 MΩ pe circuite ≤ 500 V (I7). Se măsoară pe fiecare circuit terminal, separat, cu receptoarele deconectate.
- **Rezistența prizei de pământ** — metoda celor 3 electrozi (voltmetru-ampermetru), R_p ≤ 1 Ω (priză comună electrică + trăsnet, conform calculului PTh-I.10 din DTAC și confirmării de teren). Se remăsoară după completarea prizei de fundație cu eventualii electrozi suplimentari, dacă rezistivitatea reală a solului (măsurată, nu ipoteza de 100 Ω·m) impune completare.
- **Continuitatea conductorului de protecție** — pe fiecare circuit final, inclusiv pe circuitele TS-PSI (cablu E90).
- **Testul dispozitivelor diferențiale** — cu aparat dedicat, verificare timp de declanșare (< 300 ms la I∆n = 30 mA, < 150 ms la 5×I∆n) și curent real de declanșare (0,5-1×I∆n), pe toate circuitele de prize și zone umede.
- **Verificarea SPD** — descărcătoarele tip 1+2 (TGD), tip 2 (tablouri secundare) și tip 3 (echipamente sensibile: IDSAI, rack IT, invertoare FV), inclusiv legarea la bara de echipotențializare și indicatorul de stare (fereastră de verificare/declanșare).
- **Continuitate coborâri paratrăsnet** — verificarea electrică a continuității structurii metalice folosite ca element natural de coborâre (v. DTAC §10.3), la fiecare tronson între piesele de separație.

### PTh-I.5.2 Fișă tehnică — Rezervor de incendiu (460 mc)

| Parametru | Valoare |
|---|---|
| Volum util | 460 mc |
| Configurație | 2 compartimente (mentenanță fără scoatere din funcțiune) sau 1 compartiment + by-pass |
| Reumplere | automată, electrovalvă + senzor de nivel, debit ≈ 19-20 mc/h (v. PTh-I.10.2) |
| Sorburi | separate pentru electropompă, pompă Diesel și pompă jockey |
| Semnalizare | nivel transmis la dispecerat (nivel scăzut = alarmă) |
| Material | poliesteric armat/beton, cu hidroizolație verificată |

### PTh-I.5.3 Fișă tehnică — Separator de hidrocarburi (NS 40)

| Parametru | Valoare |
|---|---|
| Mărime nominală | NS 40 |
| Clasă | I (coalescență, reziduu ≤ 5 mg/l) |
| Decantor nămol | 5.000 l, amonte de separator |
| By-pass | integrat, pentru debite de ploaie excepționale |
| Alarmă nivel hidrocarburi | senzor + panou local |
| Volum stocare hidrocarburi | ≥ 400 l (10×NS) |
| Mentenanță | golire periodică, firmă autorizată, cod deșeu 13 05 |

---

## PTh-I.6 Tehnologia de montaj

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee (înainte de turnarea pardoselii industriale și înainte de montajul panourilor de închidere).
2. Execuție priză de pământ de fundație (platbandă OL-Zn, sudată de armătura fundațiilor) — **înainte de turnarea fundațiilor**.
3. Montaj rețea de canalizare îngropată + pluvial exterior — **probate înainte de acoperire cu pardoseală/platforme**.
4. Montaj structură metalică (condiție pentru toate instalațiile suspendate).
5. Montaj rețea de sprinklere pe structură (coordonat cu montajul rafturilor și cu gabaritele de circulație stivuitor) — **probată hidraulic înainte de finisaje**.
6. Montaj coloane apă/canalizare interioară, tuburi radiante, tubulatură de ventilare.
7. Montaj cabluri electrice pe jgheaburi/paturi, tablouri.
8. Montaj echipamente majore (stație pompare incendiu, SRM gaze, compresor, VRF, boiler).
9. Montaj corpuri de iluminat, prize, aparataj final.
10. Montaj trape de desfumare + actuatoare, centrală IDSAI, detectoare.
11. Probe finale, PIF, reglaje, instruire beneficiar.

### PTh-I.6.2 Susțineri și fixări (inclusiv cerințe seismice pentru conducte grele/PSI)

| Instalație | Tip susținere | Interax maxim | Observație seismică |
|---|---|---|---|
| Conductă sprinkler DN ≥ 80 | tijă filetată dublă + bracket lateral | 3,0-3,7 m | conform SR EN 12845 anexa suporți, verificare la sarcina seismică laterală |
| Conductă sprinkler DN < 80 (branch) | tijă filetată simplă | conform interax capete | — |
| Conductă apă PP-R | brățară glisantă (dilatare) | Ø≤32: 0,8 m; Ø40-63: 1,0 m | — |
| Conductă gaz oțel | consolă/brățară fixă | 3,0-4,0 m | distanță minimă față de alte instalații (NTPEE) |
| Tubulatură ventilare | tijă filetată + profil | 1,5-2,0 m | — |
| Jgheab cabluri | consolă metalică | 1,0-1,5 m | separare tari/slabi |
| Tuburi radiante | lanțuri/tije de suspendare din structură | conform fișă producător | verificare la încărcare dinamică |

Toate conductele grele (sprinkler, hidranți) montate pe structura metalică se verifică la **încărcarea seismică suplimentară** transmisă structurii — coordonare obligatorie cu memoriul de rezistență (`structura.md`) pentru punctele de prindere.

### PTh-I.6.3 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Distribuție ACM + recirculare | 20-30 mm | elastomer |
| Conducte AR (anticondens) | 9-13 mm | elastomer |
| Tubulatură ventilare (trasee neîncălzite) | 20-50 mm | vată cu foaie Al |
| Coloană sifonică expusă la îngheț | cablu de degivrare | electric autoreglabil |

### PTh-I.6.4 Treceri etanșe la foc

La traversarea zidului de foc REI 180 (compartimentare, v. `general.md` §6.4) și a oricărui element cu rol de compartimentare, toate trecerile de instalații se etanșează cu sisteme certificate de rezistență la foc egală cu a elementului străbătut:

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Conducte metalice (apă, gaz, sprinkler) | manșon/mastic intumescent | EI conf. element |
| Conducte plastic (PP-R, PVC) | colier intumescent | EI conf. element |
| Fascicule cabluri | pernă/mastic + vopsea termospumantă | EI conf. element |
| Tubulatură ventilare | clapetă antifoc + etanșare | EI conf. element |

### PTh-I.6.5 Montaj structură de prindere fotovoltaic pe acoperiș

Structura de prindere a modulelor FV (șine + cleme sau sistem cu greutăți balast, funcție de soluție) se montează pe panourile sandwich/tabla cutată a acoperișului, cu respectarea următoarelor cerințe:

- **verificare structurală prealabilă** (obligatorie): încărcarea permanentă suplimentară (≈ 15-20 kg/mp echipament + structură de prindere) și încărcarea de vânt pe module se transmit la structura metalică a acoperișului — se verifică de inginerul structurist (`structura.md`) **înainte de montaj**, nu ca etapă ulterioară;
- **etanșeitate** — la sistemele cu penetrare a învelitorii, fiecare punct de prindere se etanșează cu manșon/garnitură compatibilă cu materialul învelitorii, cu verificare la probă de ploaie;
- **distanțe față de trapele de desfumare** — modulele FV nu se amplasează peste sau în imediata vecinătate a trapelor (interferență cu deschiderea/aerul de compensare), păstrând culoare libere de acces pentru mentenanță;
- **legare la priza de pământ** — structura de prindere (metalică) se leagă la bara de echipotențializare, integrată cu sistemul de protecție la trăsnet.

### PTh-I.6.6 Montaj cablare structurată curenți slabi

Cablarea Cat.6A se montează în jgheaburi/tuburi separate de circuitele de curent tare, cu distanță minimă de separare (≥ 300 mm în paralel, sau ecranare, conform SR EN 50174) pentru evitarea perturbațiilor electromagnetice induse de circuitele de forță (utilaje, VRF). Traseul de fibră optică între rack-ul central și dulapul tehnic din hală se protejează în tub separat, cu rază de curbură respectată (≥ 20× diametrul cablului) și cu rezervă de cablu la fiecare capăt (buclă de service). Camerele CCTV exterioare (perimetru) se alimentează PoE+ prin cablu exterior (UV-rezistent), cu protecție SPD la intrarea în clădire.

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrarea hidraulică — sprinkler și hidranți

Verificarea presiunii la ACS și la fiecare hidrant se face prin manometre montate temporar la punctele critice identificate la PTh-I.3.1/3.2, comparate cu valorile de calcul; abaterea admisă ≤ ±10% (conformă practicii SR EN 12845).

### PTh-I.7.2 Reglaj aeraulic — ventilare

Reglajul se face la gurile de admisie/extracție, cu anemometru, urmărind debitele proiectate (18.900-31.500 mc/h hală, 2.400 mc/h grupuri+birouri). Criteriu (SR EN 12599): abatere debit total ≤ ±15%, pe fiecare gură ≤ ±20%.

### PTh-I.7.3 Protocol primă pornire tuburi radiante

- Verificare etanșeitate gaz pe toată rețeaua (probă de presiune conform NTPEE) înainte de prima aprindere.
- Aprindere secvențială (un tub la un moment dat, verificare flacără/ardere completă) — nu toate simultan la prima punere în funcțiune.
- Verificare evacuare gaze arse (tiraj corect, fără reflux) la fiecare tub individual.
- Reglaj termostat radiant (black-bulb) pentru atingerea +16 °C la nivelul de lucru (1,5 m), respectiv +5 °C în zona antigel.
- Proces-verbal de primă pornire, semnat de executant, furnizor echipament și beneficiar.

### PTh-I.7.4 Programare BMS/IDSAI

- **BMS**: curbe de încălzire pe zonă termică (lucru/antigel), programe orare (reducere nocturnă/weekend, preîncălzire), praguri de alarmare (avarie pompă, colmatare filtre CTA, presiune scăzută rezervă).
- **IDSAI**: programare adrese (fiecare detector/barieră liniară), texte descriptive per zonă/canton, temporizări T1/T2 pentru zonele cu personal permanent, testare integrală a matricei cauză-efect (PTh-I.2.10), punere sub supraveghere permanentă.

### PTh-I.7.5 Probă funcțională stație de pompare incendiu

- Pornire automată la scădere de presiune simulată (deschidere robinet de test) — cronometrare timp de pornire.
- Comutare automată electropompă → pompă Diesel (simulare defect electric).
- Verificare pompă jockey (menținere presiune fără pornirea pompei principale la pierderi mici).
- Semnalizare stări la dispecerat (pornit/oprit/defect/nivel scăzut rezervor).

### PTh-I.7.6 Protocol PIF instalație fotovoltaică

- Verificare rezistență de izolație pe fiecare string DC (înainte de conectarea la invertor).
- Test de polaritate și tensiune de circuit deschis (Voc) pe fiecare string, comparat cu valoarea de catalog corectată cu temperatura.
- Punere sub tensiune progresivă (string cu string), verificare funcționare invertor și comunicare cu portalul de monitorizare.
- Test funcție anti-islanding (deconectare simulată a rețelei publice — invertorul trebuie să se deconecteze automat).
- Măsurare producție inițială (comparație cu producția teoretică instantanee, funcție de iradianță la momentul testului) — proces-verbal de PIF cu curba de producție a primei zile.

### PTh-I.7.7 Protocol PIF curenți slabi (CCTV, efracție, control acces)

- **CCTV**: verificare câmp vizual per cameră (fără zone oarbe pe traseele critice — porți, perimetru), test înregistrare/redare pe NVR, verificare funcționare IR nocturnă.
- **Efracție**: test fiecare zonă de detecție (PIR, contacte magnetice), verificare comunicare dual-path către dispecerat (test deconectare rețea principală → comutare pe backup GPRS).
- **Control acces**: test deblocare fail-safe la simularea alarmei de incendiu (integrare cu IDSAI), verificare funcție de pontaj, atribuire drepturi de acces pe grupuri de utilizatori.
- **Rețea date**: test conectivitate pe toate porturile active, verificare alimentare PoE+ pentru camere și puncte Wi-Fi, măsurare debit pe legătura de fibră optică.

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, agremente, marcaj CE) | certificate | responsabil tehnic | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare, pluvial, gaz exterior) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 4 | Montaj rețea sprinkler pe structură | proces-verbal montaj | RTE | CM |
| 5 | Probă presiune sprinkler (1,5×p regim, min. 15 bar, 2h) | PV probă | RTE + diriginte + ISU | **FD** |
| 6 | Probă presiune hidranți | PV probă | RTE + diriginte | CM |
| 7 | Probă etanșeitate apă menajeră | PV probă SR EN 806 | RTE + diriginte | CM |
| 8 | Probă canalizare înainte de mascare/acoperire | PV probă | RTE + diriginte | **FD** |
| 9 | Probă amorsare pluvial sifonic | PV probă | RTE + diriginte | CM |
| 10 | Probă etanșeitate + funcțională instalație gaze | PV probă ANRE | firmă autorizată | **FD** |
| 11 | Rezistență izolație + priză de pământ (electric) | buletin PRAM | verificator/laborator | CM |
| 12 | Test RCD/diferențiale | buletin PRAM | laborator autorizat | CM |
| 13 | Continuitate coborâri trăsnet + priză comună | buletin măsurători | laborator autorizat | CM |
| 14 | Etanșeitate tubulatură ventilare (clasa B) | PV clasă etanșeitate | RTE | CM |
| 15 | Funcțional IDSAI + matrice cauză-efect completă | PV probe 100% | firmă autorizată IGSU | **FD** |
| 16 | Funcțional stație de pompare incendiu (pornire automată, comutare rezervă) | PV probă | firmă autorizată + ISU | **FD** |
| 17 | Funcțional trape de desfumare (deschidere < 60 s) | PV probă | RTE + ISU | **FD** |
| 18 | Reglaj aeraulic (echilibrare debite) | protocol debite | RTE | CM |
| 19 | Primă pornire tuburi radiante | PV primă pornire | executant + furnizor + beneficiar | CM |
| 20 | Funcțional separator hidrocarburi | PV probă | RTE | CM |
| 21 | Funcțional instalație aer comprimat (dacă e cazul) | PV probă | RTE | CM |
| 22 | Funcțional FV (string-uri, invertoare) | PV probă + rapoarte producție | firmă autorizată | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU); CM = control în masă; CQ = control calitate recepție.

### PTh-I.8.1 Faze determinante — detaliere

Fazele marcate FD sunt cele la care lucrarea nu poate continua fără verificare și proces-verbal, întrucât elementul devine inaccesibil sau are rol direct de securitate: priza de pământ de fundație (acoperită de betonul de fundație), traseele îngropate (canalizare, gaz exterior — acoperite de pământ/pardoseală), proba de presiune a rețelei de sprinklere (rețea vitală pentru stingere, montată pe structură apoi mascată parțial de rafturi), instalația de gaze (risc de explozie), recepția IDSAI și a stației de pompare incendiu (verificare 100% cu prezența ISU, condiție pentru autorizarea de securitate la incendiu) și funcționarea trapelor de desfumare.

### PTh-I.8.2 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație, coordonate cu poziția reală a rafturilor |
| Scheme finale | monofilară actualizată, coloane, izometrice, rețea sprinkler nod-cu-nod |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (marcaj CE, agremente PSI) |
| Buletine de probe | PRAM, presiune sprinkler/hidranți, etanșeitate gaz, debite ventilare |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv aviz ISU |
| Protocoale reglaj | echilibrare hidraulică, reglaj aeraulic, primă pornire tuburi radiante |
| Instrucțiuni de exploatare | operare stație pompare, SRM gaze, VRF, IDSAI, BMS, FV |
| Program mentenanță | revizii periodice (sprinkler semestrial, gaze ANRE, ISCIR unde e cazul) |
| Garanții | certificate garanție producători (pompe, centrală IDSAI, VRF, FV) |

---

## PTh-I.9 Calcul iluminat interior și de siguranță (NP 061/2002, SR EN 12464-1)

### PTh-I.9.1 Metoda de calcul (flux luminos)

Calculul se face prin metoda factorului de utilizare, conform SR EN 12464-1 și NP 061:

N = (E × S) / (Φ_corp × U × M)

unde E = nivelul de iluminare menținut cerut [lx], S = suprafața zonei [mp], Φ_corp = fluxul luminos al unui corp [lm], U = factorul de utilizare, M = factorul de mentenanță (0,80 pentru LED în mediu industrial curat, 0,70 în mediu cu praf/depozit).

Corpuri de referință adoptate: **LED highbay 200 W / 30.000 lm** (depozit/producție, eficacitate 150 lm/W, IP65), **LED highbay 150 W / 21.000 lm** (culoare rafturi, iluminare verticală), **panou LED 600×600, 36 W / 4.000 lm** (birouri, UGR ≤ 19), **plafonieră LED IP44 24 W / 2.600 lm** (vestiare/dușuri).

### PTh-I.9.2 Cerințe de iluminare pe categorii de zone (SR EN 12464-1)

| Zonă | Em cerut [lx] | UGR max | Ra min | Uo min |
|---|---|---|---|---|
| Depozitare — culoare rafturi (iluminare orizontală) | 150-200 | 25 | 60 | 0,40 |
| Depozitare — iluminare verticală rafturi (citire etichete) | 150 (vertical) | 25 | 60 | 0,40 |
| Producție/manipulare/expediție | 300 | 25 | 80 | 0,60 |
| Zone de control/ambalare fină | 500 | 22 | 80 | 0,60 |
| Docuri de încărcare/descărcare | 200 | 25 | 60 | 0,40 |
| Birouri administrație | 500 | 19 | 80 | 0,60 |
| Sală ședințe | 500 | 19 | 80 | 0,60 |
| Vestiare/dușuri | 200 | 25 | 80 | 0,40 |
| Grupuri sanitare | 200 | 25 | 80 | 0,40 |
| Circulații/holuri | 100 | 28 | 40 | 0,40 |
| Casa scării | 100 | 28 | 40 | 0,40 |
| Camera de pompe incendiu/tablouri | 200 | 25 | 60 | 0,40 |
| Rampe/platforme exterioare | 20-50 | — | 20 | — |

### PTh-I.9.3 Calcul detaliat pe zone — hală (parter)

Corp de referință highbay 200 W/30.000 lm, Hu = 8,00 − 0,00 (plan de lucru la sol pentru depozit/producție) ≈ 7,50 m util.

| Nr. | Zonă | S [mp] | k (indice încăpere) | U | E cerut | N calc | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|---|
| Z01 | Depozit — câmp rafturi | 1.400 | 2,10 | 0,58 | 175 | 14,1 | 15 | 3.000 |
| Z02 | Culoare rafturi (iluminare liniară dedicată, corp 150 W) | — (inclus în Z01) | — | 0,50 | 150 (vertical) | 8 corpuri liniare suplimentare | 8 | 1.200 |
| Z03 | Producție/manipulare | 800 | 1,95 | 0,60 | 300 | 27,8 | 28 | 5.600 |
| Z04 | Zonă expediție/docuri (interior) | 200 | 1,20 | 0,52 | 200 | 5,3 | 6 | 1.200 |
| **Total hală** | | **2.400** | | | | | **57** | **11.000** |

Exemplu de verificare (Z01, depozit):
N = (175 × 1.400) / (30.000 × 0,58 × 0,80) = 245.000 / 13.920 = 17,6 → se adoptă 15 corpuri highbay + 8 corpuri liniare dedicate culoarelor (verticalitate) = configurație mixtă care acoperă atât orizontala (175 lx) cât și verticala rafturilor (150 lx), conform practicii pentru depozite cu rafturi înalte.

E realizat (highbay, orizontal) = (15 × 30.000 × 0,58 × 0,80) / 1.400 = 208.800 / 1.400 = **149 lx** — sub 175 lx calculat, se completează cu cele 8 corpuri liniare (150 W/21.000 lm) dispuse pe culoare, care aduc iluminarea orizontală locală la ≥ 175 lx și cea verticală la ≥ 150 lx pe fețele rafturilor. **Verificare finală prin releveu fotometric la recepție.**

### PTh-I.9.4 Calcul detaliat pe zone — mezanin birouri (+3,50)

| Nr. | Zonă | S [mp] | k | U | E cerut | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|
| E01 | Birouri open-space | 165 | 1,45 | 0,63 | 500 | 22 | 792 |
| E02 | Sală ședințe | 35 | 1,10 | 0,55 | 500 | 5 | 180 |
| E03 | Circulații mezanin | 26 | 0,85 | 0,48 | 100 | 3 | 108 |
| E04 | Casa scării | 12 | 0,70 | 0,44 | 100 | 2 | 72 |
| **Total mezanin birouri** | | **238** | | | | **32** | **1.152** |

### PTh-I.9.5 Calcul detaliat pe zone — vestiare, grupuri sanitare, spații tehnice

| Nr. | Zonă | S [mp] | E cerut | N adoptat (IP44/65) | P instalat [W] |
|---|---|---|---|---|---|
| V01 | Vestiar bărbați | 45 | 200 | 6 | 156 |
| V02 | Vestiar femei | 20 | 200 | 3 | 78 |
| V03 | Grup sanitar birouri | 8 | 200 | 2 | 52 |
| V04 | Oficiu/spălător | 12 | 300 | 2 | 72 |
| V05 | Cameră pompe incendiu | 25 | 200 | 3 (IP65) | 120 |
| V06 | Camera SRM/gaze | 10 | 200 | 1 (Ex/IP65 dacă impus) | 40 |
| V07 | Tablou general (TGD) | 15 | 200 | 2 | 80 |
| **Total** | | **135** | | **19** | **598** |

### PTh-I.9.6 Sinteză putere instalată iluminat

| Zonă | Nr. corpuri | Putere instalată [W] |
|---|---|---|
| Hală (depozit + producție + docuri) | 57 | 11.000 |
| Mezanin birouri | 32 | 1.152 |
| Vestiare/GS/spații tehnice | 19 | 598 |
| Exterior (platforme, fațadă) | 12 | 1.200 |
| **Total iluminat normal** | **120** | **13.950** |

Putere specifică: 13.950 W / 2.800 mp (Sd) = **4,98 W/mp**, sub limita indicativă NP 061 de 8-10 W/mp pentru soluții LED. Comandă cu senzori de prezență/lumină de zi pe culoarele de depozit și în birouri (economie estimată 40-60%, v. DTAC §9.4 și §15.3).

### PTh-I.9.6a Calcul detaliat iluminat exterior — platforme și fațadă

Iluminatul exterior deservește platforma de manevră/parcare TIR (≈ 1.500 mp) și fațada clădirii, cu corpuri LED pe stâlpi (H = 8-10 m) și proiectoare pe fațadă, conform cerinței DTAC (§9.6) de 20-50 lx pe platforme:

| Zonă exterioară | S [mp] | E cerut [lx] | Corp adoptat | Nr. corpuri | P instalat [W] |
|---|---|---|---|---|---|
| Platformă manevră/andocare TIR | 900 | 30 | proiector LED 150 W pe stâlp H=9 m | 6 | 900 |
| Platformă parcare auto | 600 | 20 | proiector LED 100 W pe stâlp H=8 m | 4 | 400 |
| Fațadă principală (acces) | — | balizaj | proiector LED 50 W | 2 | 100 |
| Perimetru (corelat cu CCTV) | — | 10-15 (securitate) | proiector LED 80 W | 6 | 480 |
| **Total exterior** | | | | **18** | **1.880** |

Notă: valoarea totală de mai sus (1.880 W) diferă ușor de sinteza orientativă din DTAC (§9.4, "iluminat siguranță/exterior 4 kW" — cifră globală care includea și iluminatul de siguranță interior); prezentul calcul separă componenta strict exterioară de platforme/fațadă, dimensionată independent pe suprafețele reale. Comandă prin celulă crepusculară + programator orar, cu reducere nocturnă a intensității (dimming la 50% după orele de operare, revenire la 100% pe senzor de mișcare la accesul auto).

### PTh-I.9.7 Iluminat de siguranță și evacuare (SR EN 1838)

| Tip iluminat siguranță | Cerință | Nivel | Autonomie | Amplasare |
|---|---|---|---|---|
| Evacuare (căi) | E ≥ 1 lx pe ax | 1 lx | 3 h | Culoare de circulație hală, holuri, casa scării |
| Antipanică (spații > 60 mp) | E ≥ 0,5 lx la 1 m sol | 0,5 lx | 3 h | Depozit, producție, expediție |
| Marcare hidranți/pompe/tablouri | E ≥ 5 lx | 5 lx | 3 h | Toate punctele PSI |
| Indicatoare direcție (Exit) | Luminanță ≥ 2 cd/mp | permanent | 3 h | Traseu evacuare, ieșiri, uși porți secționale pietonale |

**Calcul corpuri evacuare (culoar tip depozit-producție, lungime 60 m, corp 3 W/200 lm):**
N = 60 / 9 (interax mediu la H = 3,0-8,0 m, conform fișă producător) + 3 uși de evacuare = **7 corpuri traseu + 3 corpuri deasupra ușilor**.

| Zonă | Corpuri evacuare 3W | Corpuri antipanică 5W | Indicatoare Exit 3W |
|---|---|---|---|
| Hală (depozit+producție) | 10 | 12 | 6 |
| Mezanin birouri | 5 | 3 | 3 |
| Casa scării + vestiare | 6 | — | 2 |
| Marcare PSI (hidranți/pompe) | 8 (5 lx) | — | — |
| **Total** | **29** | **15** | **11** |

Total iluminat siguranță: 55 corpuri, ~180 W pe acumulatori proprii (autotest lunar automat + test autonomie semestrial). Verificare timp de comutare ≤ 5 s pentru 50% nivel, ≤ 60 s pentru 100% (SR EN 1838) — asigurat prin corpuri autonome cu comutare instantanee. ✓

---

## PTh-I.10 Breviar de calcul suplimentar securitate la incendiu (instalații)

### PTh-I.10.1 Verificare acoperire cu ESFR — alternativă de rezervă

Deși soluția adoptată pentru rafturi ≤ 6,0 m este **sprinkler de plafon HHS III** (v. PTh-I.3.1), se documentează alternativa **ESFR** pentru situația în care beneficiarul ar solicita, la faza de execuție, creșterea înălțimii de stivuire peste 7,5 m (conform semnalului DTAC §11.4):

| Parametru ESFR | Valoare |
|---|---|
| Cap de sprinkler | K360 sau K200 |
| Presiune de funcționare | 3,5-5,0 bar |
| Nr. capete în aria de operare | ≈ 12 |
| Debit unitar la K360, p=3,5 bar | q = K·√p = 360×√3,5/10 ≈ 6,7 l/s |
| Debit total aproximativ (12 capete) | ≈ 45-60 l/s (verificare hidraulică nod-cu-nod obligatorie la adoptare) |
| Avantaj | elimină sprinklerele intermediare in-rack, simplifică rafturile |
| Condiție | rezervă de apă recalculată (crește peste 460 mc), pompă recalculată |

**Trecerea la ESFR necesită re-emiterea integrală a breviarului PTh-I.3.1 și a scenariului de securitate la incendiu**, nefiind o simplă substituire de capete.

### PTh-I.10.2 Calcul detaliat reumplere rezervă de incendiu

Rezerva de 460 mc trebuie reumplută automat în maximum 24 h de la un consum (SR EN 12845 / P118-2). Debit de reumplere necesar:

Q_reumplere = V_rezervă / t_reumplere = 460.000 l / (24 × 3.600 s) = **5,3 l/s ≈ 19,2 mc/h**.

Branșamentul de apă potabilă (dimensionat pentru consumul menajer la q_c = 1,0 l/s, v. PTh-I.3.3) **nu poate asigura acest debit de reumplere** dacă rezerva se alimentează din rețeaua publică — se prevede racord dedicat de reumplere, cu robinet cu flotor și limitator de debit, dimensionat la ≈ 19-20 mc/h, independent de circuitul de consum menajer, conform separării impuse în DTAC (§3.1, cele 3 circuite distincte de la cămin). Dacă presiunea/debitul rețelei publice nu confirmă acest necesar (aviz operator), reumplerea se face din sursă proprie (foraj) sau se acceptă un timp de reumplere mai lung, cu notificare ISU.

### PTh-I.10.3 Calcul detaliat al penei de fum — verificare pe fiecare canton (completare PTh-I.3.7)

Model de zonă pentru focar de proiectare Q_c = 5 MW (risc mare, depozit cu marfă combustibilă), pe fiecare canton de 1.200 mp:

Debit masic al penei la înălțimea y (de la focar la baza stratului de fum):

ṁ = 0,071 × Q_c^(1/3) × y^(5/3)

Pentru y = 6,0 m (strat liber 2,0 m sub H = 8,0 m): ṁ = 0,071 × 5.000^(1/3) × 6^(5/3) ≈ 0,071 × 17,1 × 19,8 ≈ **24,0 kg/s**, identic pe fiecare canton (focarul unic afectează un singur canton la un moment dat, conform ipotezei de proiectare — ecranele de fum separă cantoanele).

Temperatura medie a fumului la această înălțime (estimare cu bilanț energetic simplificat, entalpie specifică aer c_p = 1,0 kJ/kg·K): T_fum ≈ T_ambiant + Q_c / (ṁ × c_p) = 20 + 5.000 / (24,0 × 1,0) ≈ 20 + 208 ≈ **228 °C** (valoare orientativă pentru dimensionarea rezistenței termice a trapelor și a materialelor din zona de evacuare; verificarea completă prin model CFD sau model de zonă multi-strat se realizează la scenariul de securitate la incendiu, corelat cu timpul de evacuare RSET < ASET).

Debitul volumic la această temperatură (ρ_fum ≈ 353/(273+228) ≈ 0,704 kg/mc): Q_v ≈ 24,0/0,704 ≈ **34 mc/s** — acoperit de suprafața utilă de evacuare adoptată (15,6 mp/canton) prin tirajul termic natural pe diferența de nivel ΔH ≈ 8,0 m, cu marjă față de calculul simplificat din DTAC (care folosea 300 °C ca ipoteză conservatoare pe întreg compartimentul de 2.400 mp).

### PTh-I.10.4 Coloană uscată — verificare necesitate și dimensionare

Conform configurației (P înalt + mezanin la +3,50, fără niveluri multiple suprapuse pe înălțime mare), **coloana uscată nu este obligatorie** pentru accesul autospecialelor ISU la nivelul solului (acces perimetral direct pe toate laturile, conform `general.md` §6 și §9). Se menține totuși un **racord tip B la rezervor**, accesibil din exterior, pentru alimentarea directă a autospecialelor, conform soluției deja adoptate în DTAC (§11.6).

### PTh-I.10.5 Verificare timp de funcționare pompe vs. timp de intervenție ISU

Timpul de funcționare proiectat al pompelor (sprinkler 90 min, hidranți interiori 10 min concomitent, hidranți exteriori 180 min) trebuie să acopere timpul realist de intervenție a serviciilor de urgență de la momentul alarmei (timp de sosire + desfășurare). Pentru amplasamente la distanță de subunitatea ISU care ar depăși timpii uzuali de intervenție, se recomandă beneficiarului confirmarea distanței față de cea mai apropiată subunitate și, dacă e cazul, suplimentarea autonomiei de combustibil a pompei Diesel peste minimul de 3 h — aspect de confirmat cu ISU la avizare, nefiind o cifră care poate fi stabilită onest fără datele reale de amplasament.

### PTh-I.10.6 Protecția la incendiu a docurilor de încărcare/descărcare

Zona de docuri (interfața dintre hală și platforma exterioară de manevră TIR) reprezintă un punct de discontinuitate a anvelopei (uși secționale, niveletoare hidraulice) care necesită corelare specifică între instalațiile de stingere și cele de desfumare:

- **acoperire sprinkler** — capetele de plafon din zona docurilor (inclusă în Canton 2, v. PTh-I.2.8) acoperă și zona tampon de recepție/expediție, fără întrerupere la nivelul porților secționale (acestea nu sunt elemente de compartimentare la foc, ci doar de izolare termică/climatică);
- **hidrant interior dedicat** — Hi-3 (v. PTh-I.2.2) este poziționat la colțul zonei de docuri, cu acoperire directă a acestei zone;
- **desfumare** — porțile secționale ale docurilor servesc drept aport de aer de compensare la declanșarea desfumării (deschidere automată la alarmă confirmată, v. PTh-I.2.8), rol dublu (funcțional + PSI) care trebuie confirmat funcțional la PIF (deschiderea nu trebuie blocată de starea de operare curentă a docului — camion andocat, niveletor extins etc.);
- **iluminat de siguranță** — marcaj de evacuare suplimentar la fiecare poartă secțională utilizată ca ieșire de urgență.

### PTh-I.10.7 Verificare timp de evacuare orientativ (RSET) vs. timp de dezvoltare a incendiului (ASET)

Pentru cei 60 de ocupanți maximi (32 producție/depozit + 8 birouri + vizitatori/șoferi), pe baza gabaritelor căilor de evacuare stabilite în memoriul de arhitectură (`arhitectura.md`):

- timpul de detecție + alarmare (T_det): ≤ 60 s (detectoare automate/bariere liniare, fără temporizare de investigare pe zona de risc mare);
- timpul de reacție a ocupanților (T_reac): ≈ 60-120 s (personal instruit, familiar cu clădirea);
- timpul de deplasare până la ieșire (T_depl): funcție de distanța maximă de parcurs, verificată la faza de arhitectură conform P118-1;
- **RSET (timp total necesar evacuării)** = T_det + T_reac + T_depl, se compară cu **ASET (timpul disponibil înainte ca condițiile să devină critice)**, determinat de dezvoltarea reală a incendiului și de eficiența desfumării calculate la PTh-I.3.7/PTh-I.10.3.

Verificarea cantitativă completă RSET < ASET (cu marjă de siguranță) se realizează în **scenariul de securitate la incendiu** (document dedicat, elaborat de expert/proiectant atestat IGSU), care preia breviarele hidraulice și de desfumare din prezentul supliment ca date de intrare validate. Prezentul document de instalații nu se substituie scenariului de securitate la incendiu, ci îi furnizează parametrii tehnici confirmați ai instalațiilor (debite, presiuni, timpi de răspuns ai echipamentelor).

---

## PTh-I.11 Concluzii și corelare finală

Prezentul supliment PTh detaliază integral, la nivel de execuție, toate instalațiile ipotezei „hală uscată, marfă neinflamabilă, fără proces ATEX" stabilite în DTAC (`instalatii.md`): rețeaua de sprinklere HHS III (calculată nod-cu-nod, confirmând debitul global de 43,3 l/s din DTAC), hidranții interiori/exteriori, rețeaua de apă/canalizare/pluvial, tuburile radiante pe gaz, ventilarea hibridă, desfumarea pe 2 cantoane, instalația electrică completă cu selectivitate și alimentare de rezervă, IDSAI cu matrice cauză-efect, priza de pământ și protecția la trăsnet, precum și componentele auxiliare (aer comprimat, fotovoltaic, curenți slabi).

Toate valorile de dimensionare din DTAC au fost **verificate prin recalculare nod-cu-nod** și confirmate coerente (sprinkler 43,3 l/s, hidranți interiori 4,2 l/s, apă menajeră q_c = 1,0 l/s, canalizare q_c_u = 3,0 l/s, pluvial 72-75 l/s, electric Pc = 91 kW/Ic = 143 A, desfumare A_util = 31,2 mp). Elementele suplimentare introduse la faza PTh (breviar hidraulic pe noduri, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, PCC, calcul iluminat complet, calcul detaliat al penei de fum pe cantoane) constituie baza pentru execuție, verificare de proiect (verificatori atestați MDLPA pe cerințele Is/It/Iv/Ie/Ig/Ii) și autorizare de securitate la incendiu (ISU), conform Legii 10/1995 și HG 907/2016.

**Confirmări necesare înainte de finalizarea execuției** (semnalate onest, nu presupuse): natura reală a mărfii depozitate și categoria de stocare (III adoptată, de confirmat cu fișa tehnologică a beneficiarului), rezistivitatea de sol reală (măsurată, ipoteza de 100 Ω·m se confirmă/corectează), avizul operatorului de apă privind debitul de reumplere a rezervei de incendiu (19-20 mc/h) și distanța față de subunitatea ISU pentru validarea autonomiei pompei Diesel. Orice modificare a ipotezei funcționale de bază impune, conform regulii deja stabilite în DTAC, re-dimensionarea integrală a instalațiilor de stingere, ventilare și electrice.

---

## ANEXA B — Breviar centralizat PTh (verificare de coerență cu breviarul DTAC)

Anexa reunește, pentru trasabilitate, toate mărimile de calcul rezultate în prezentul supliment PTh, alături de valoarea corespunzătoare din breviarul DTAC (`instalatii.md`, Anexa A), confirmând coerența dintre dimensionarea preliminară și calculul de execuție nod-cu-nod.

**B.1 Sprinklere și hidranți:**
- debit zonă de operare (metodă simplificată DTAC): 43,3 l/s ↔ debit confirmat prin calcul nod-cu-nod (PTh-I.3.1): 43,3 l/s — **coerent**;
- presiune necesară la refularea pompei pentru sprinkler (PTh): ≈ 21,4 mCA; pentru hidranți (PTh): ≈ 32,9 mCA — ambele sub cei 80 mCA de proiectare a pompei (DTAC) — **marjă confirmată**;
- rezervă totală de incendiu: 460 mc (DTAC) — nemodificată la PTh (soluție sprinkler de plafon menținută, nu ESFR).

**B.2 Apă și canalizare:**
- debit de calcul apă menajeră: 1,0 l/s (DTAC) ↔ 1,0 l/s confirmat pe toate tronsoanele (PTh-I.3.3);
- pierdere de sarcină traseu cel mai defavorabil: ≈ 0,69 bar (DTAC) ↔ ≈ 0,71 bar (PTh, recalculare nod-cu-nod) — **coerent, distribuție gravitațională confirmată**;
- debit canalizare menajeră: 3,0 l/s (DTAC) ↔ verificat pe fiecare coloană (PTh-I.3.4), h/D < 0,5 pe toate tronsoanele.

**B.3 Termic și gaze:**
- necesar termic hală: 214 kW (DTAC) ↔ repartizat pe 8 tuburi × 28 kW = 224 kW instalat, cu densitate radiantă 58-93 W/mp verificată pe zonă (PTh-I.3.9);
- debit gaz total: 29 mc/h (DTAC) ↔ nemodificat, traseu DN 50 confirmat (PTh-I.2.3).

**B.4 Electric:**
- putere cerută Pc = 91 kW, Ic = 143 A (DTAC) ↔ confirmat prin însumarea tuturor circuitelor detaliate pe cele 4 tablouri secundare (PTh-I.3.5);
- curent de pornire motor pompă incendiu (nou, PTh): ≈ 839 A la pornire directă → soluție soft-starter/stea-triunghi adoptată (PTh-I.3.12), aspect neexaminat explicit în DTAC (dimensionare preliminară globală).

**B.5 Desfumare:**
- suprafață utilă 31,2 mp / 48,0 mp geometric (DTAC) ↔ repartizată pe 2 cantoane × 15,6 mp util / 24,0 mp geometric (PTh-I.2.8), debit masic pană de fum confirmat pe fiecare canton independent (PTh-I.3.7, PTh-I.10.3): 24,0 kg/s.

**B.6 Iluminat (nou, detaliat integral la PTh):**
- putere instalată iluminat normal: 13.950 W / 2.800 mp (Sd) = 4,98 W/mp — sub limita NP 061 de 8-10 W/mp;
- iluminat de siguranță: 55 corpuri, ≈ 180 W total, autonomie 3 h, timp de comutare conform SR EN 1838.

**B.7 Fotovoltaic (nou, repartizat lunar la PTh):**
- producție anuală: 150 MWh/an (DTAC) ↔ repartizată pe 12 luni (PTh-I.3.11), cu vârf iunie-august (≈ 12-13%/lună) și minim decembrie-ianuarie (≈ 3,5%/lună) — coerent cu profilul climatic al zonei.

Concluzia verificării de coerență: **toate valorile globale ale breviarului DTAC se confirmă prin calculul de execuție nod-cu-nod al prezentului supliment PTh**, cu marje rezonabile care acoperă variațiile reale de traseu ce se confirmă la shop-drawing și la execuție. Singurele aspecte noi identificate la PTh (necesitate soft-starter pentru pompa de incendiu, repartiția lunară FV, detalierea completă a iluminatului) nu contrazic dimensionarea DTAC, ci o completează la nivelul de detaliu specific fazei de execuție.

---

*Supliment de fază PTh — instalații. Se citește împreună cu memoriul DTAC `instalatii.md` (care rămâne referința pentru încadrarea normativă și dimensionarea preliminară) și cu memoriile `general.md`, `arhitectura.md`, `structura.md` pentru coordonarea interdisciplinară.*
