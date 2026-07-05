# MEMORIU TEHNIC DE INSTALAȚII — PARCARE PUBLICĂ COLECTIVĂ MULTIETAJATĂ (DTAC)

Parcaj închis **S+P+5E, 460 locuri**, beton armat. Piesă scrisă instalații DTAC (Legea 50/1991 Anexa 1).

| Rubrică | Valoare |
|---|---|
| Niveluri | 6 supraterane + 1 subteran = 7 platforme |
| Capacitate | 460 (~65-66/nivel) |
| Ac / Ad | ~2.400 / ~16.800 mp |
| H liberă / nivel | 2,30 (rampe 2,20) / ~3,00 |
| Categorie / clasa / grad | C / II (γI,e 1,2) / II RF |
| Pericol incendiu | D (parcare) / C (tehnice) — risc mediu |

## 1. Date generale, cadru, populație

Funcțiune exclusivă parcaj M1/N1 ≤3,5 t. **V_niv brut** ~7.200 mc (nivel 2.400 mp); breviare ventilare/desfumare calculate pe **2 scenarii**: standard ~7.000 mc și mare 18.000 mc (amprente „big-box" 5.000-6.500 mp/nivel = 15.000-20.000 mc).

**Clasificare deschis/închis:** deschis = goluri ≥**1/3 (33%) din pereți perimetrali** pe 2 fațade opuse (≥5% planșeu) → natural; altfel **închis → ventilare mecanică CO + desfumare + detecție obligatorii**. Aici subsol + supraterane <33% → **tot închis** (acoperitor).

**Populație:** tranzitorie (pietoni); vârf ~150 pers (1/3 locuri) + 3-4 personal; **N_evac acoperitor ~464 pers** (căi/iluminat/desfumare). Consum apă menajeră redus.

**Normative:** Legea 50/1991, 10/1995, HG 907/2016, 307/2006, 571/2016, Ordin MAI 129/2016; **I9-2022**, STAS 1846/SR EN 12056, **SR EN 858-1/2** (separator — critic), SR EN 752, NP 133; I13-2015, **I5-2022** (ventilare+desfumare — critic), **NP 24-97**, C107, **SR EN 12101-3** (F400/120), SR EN 12101-6; I7-2011, NP 061-2002, SR EN 12464-1, SR EN 1838, SR EN 62305, Legea 372/2005 (nZEB+EV), EPBD 2024/1275; P118-1999, **P118-2/2013** (stingere), **P118-3/2015** (detecție), SR EN 12845, SR EN 671, SR EN 54.

## 2. Instalații sanitare

**Apă rece:** incendiu (contor separat) + GS personal/curățenie. Debit menajer (I9): qc = a·c·√ΣE = 0,15·√16 = **0,60 l/s (~2,16 mc/h)** + spălare 2×DN20 = 0,60 → dimensionare 0,6-1,2 l/s; hidrofor mic dacă presiune insuficientă la etaje superioare.

**Canalizare (CRITIC):** pante pardoseli **1,5-2%** → sifoane/rigole cu gardă + coș sedimente (1/150-200 mp + rigolă bază rampe) → coloane PP/fontă DN110-160 gravitațional. Debit spălare (SR EN 12056-2): Qww = K√ΣDU (K 0,7) → **Q ~3-6 l/s**.

**Separator hidrocarburi (SR EN 858):** **NS = (Qr + fx·Qs)·fd**; Qs 3,0 + Qr 4,0, fx 2 (detergent), fd 1,0 (clasa I ρ ≤0,85): NS = (4,0 + 2·3,0)·1,0 = **10 → separator NS 10 clasa I coalescent** (≤5 mg/l ieșire). Decantor nămol V = 200·NS/fd = **2.000 l**. By-pass + avertizor nivel + cămin prelevare (APM), montaj înainte de canal public.

**Stație pompare** (subsol sub cotă canal): bazin + **2 electropompe submersibile tocător** (1+1R), Qp ≥10 l/s, H 8-12 mCA + senzori + alarmă.

**Pluvială:** Qpl = Φ·i·A/10000 = 0,90·300·0,24 = **64,8 l/s** (terasă 2.400 mp, i 300) → ≥4 receptoare DN110-125 + parafrunzar; rampe descoperite prin separator.

## 3. Instalații termice

Parcaj **neîncălzit** (tampon C107). **Antiîngheț >+5°C** doar în: casa scării, puț lift, box control, **gospodărie apă incendiu** (critic), camere tehnice — aeroterme/convectoare electrice termostat + **heat-tracing** autoreglabil + izolare. Gospodărie: V 60 mc, Δt 20 K → ~1,2 kW (2 kW instalat). Total antiîngheț **~8-10 kW** pe termostat.

## 4. Ventilarea parcajului închis — capitol central

Două funcții: **A exploatare (CO/NOx)** + **B desfumare** (I5-2022, NP 24-97, P118, SR EN 12101-3).

**A. Exploatare — max dintre:**
- **(a) schimburi:** Q = n·V_niv, **n = 6 sch/h** → V 18.000 → **108.000 mc/h**; V 7.000 → 42.000.
- **(b) emisie CO:** Q_CO = E_CO/(c_adm − c_ext), c_adm 55 mg/mc (~50 ppm), c_ext 8; nivel 66 locuri: 33 veh/h × 8 g CO = 264.000 mg/h → Q = 264.000/47 ≈ **5.617 mc/h**.
- **Determinant (a)** (6 sch/h) >> emisie CO.

**Reglaj trepte senzori CO** (1/400 mp, VSD): <50 ppm oprit/minim / 50 treapta I (~50%) / 100 treapta II (100%) / **≥150 ppm maxim + alarmă evacuare zonă + dispecerat**. Introducere 85-90% din extras (depresiune, protecție casa scării); extracție 2 niveluri (jos CO/gaze grele, sus gaze calde).

**B. Desfumare:** Q_desf = n_desf·V_niv, **n_desf = 12 sch/h** → V 18.000 → **216.000 mc/h**; V 7.000 → 84.000. Aport compensare ≥75%: **162.000 mc/h** (guri joase/rampe, v ≤5 m/s). **Cantoane fum ≤3.000 mp** (ecrane ≥0,50 sub tavan); nivel 2.400 = 1 canton, 18.000 = 6-8. **Ventilatoare F400/120** (SR EN 12101-3, 400°C/120 min) + tubulatură E600/EI + clapete. **Jet-fan** (fără tubulatură): impuls dinspre aport (rampe) spre extracție F400/120, dimensionare **CFD** la PT. **Comandă:** auto (detecție) + manual (panou pompieri); oprire confort + pornire desfumare canton; sursă securitate + cabluri E90/PH90.

| Nivel/regim | V_niv | n | Q mc/h | Aport |
|---|---|---|---|---|
| Standard exploatare | 7.000 | 6 | 42.000 | ~37.000 |
| Standard desfumare | 7.000 | 12 | 84.000 | ≥63.000 |
| Mare exploatare | 18.000 | 6 | 108.000 | ~97.000 |
| **Mare desfumare** | 18.000 | 12 | **216.000** | ≥162.000 |
| Verificare CO emisie | — | — | ~5.600 (nedeterminant) | — |

Aceleași ventilatoare F400/120 servesc ambele regimuri prin VSD (turație redusă = CO, maximă = desfumare).

## 5. Instalații electrice

Branșament JT/post trafo, BMPT + TGD, **TN-S**.

| Consumator | P inst kW | Pc kW |
|---|---|---|
| Ventilatoare (exploatare/desfumare) | 240 | 120…240 |
| Iluminat normal LED | 55 | 44 |
| Iluminat securitate | 8 | 8 |
| Pompe incendiu | 90 | 0…90 |
| Pompe uzate + hidrofor | 8 | 4 |
| **EV charging (dominant)** | 340-776 | **~200 (DLM)** |
| Curenți slabi/ticketing/CCTV | 15 | 10 |
| Antiîngheț | 10 | 3 |
| **Total exploatare** | | **~393 kW** |

Dominant **EV charging** (plafonat DLM); la incendiu EV + ventilare confort **decuplate**. Pc ~400 kW (S ~470 kVA) → **spor putere**.

**Tablouri:** TGD + **TS securitate** pe sursă rezervă (pompe incendiu, desfumare, iluminat securitate, detecție, lift pompieri). **Sursă rezervă:** **grup electrogen ≥350 kVA** (AAR ≤15 s, autonomie ≥3h) sau dublă cale; iluminat securitate + detecție acumulatori proprii; baterie condensatoare cosφ ≥0,92.

**EV (Legea 372/2005 + EPBD):** nerezidențial >10 locuri → min. 1 punct echipat + tubulatură ≥20% locuri. Soluție: 46 AC echipate (10%, 7,4/22 kW) + 2 DC 50 kW + 92 pre-echipate (20%) + tubulatură toate. **P_EV = 23·7,4 + 23·22 + 2·50 = 776 kW instalat**; DLM (cs 0,25-0,30) → **~200-230 kW cerut**. AC SR EN 61851 tip 2, DC CCS Combo 2, **RCD tip B**, OCPP.

**Priză pământ** de fundare + electrozi **R ≤1 Ω** + echipotențializare (BEP). **Paratrăsnet (SR EN 62305):** clădire înaltă publică → **LPL III** (captare terasă + ≥2 coborâri, ≤15 m) + SPD tip 1+2 TGD, tip 2/3 tablouri.

## 6. Iluminat (NP 061, SR EN 12464-1)

| Zonă | Em lx | U0 |
|---|---|---|
| Locuri/alei | 75 | 0,40 |
| Rampe zi / noapte | 300 / 75 | 0,40 |
| Tranziție intrare | gradient 300→75 | — |
| Casa scării | 100 | 0,40 |
| Casierie/box | 300 | 0,60 |

Rampe reglează automat pe luminanța exterioară (adaptare ochi). LED IP54 IK08 4000K ≥130 lm/W + **senzori prezență** (dimming 20-30% la gol). Flux: Φ = Em·A/(Uf·Mf) = 75·100/(0,45·0,80) = **20.833 lm → ~5,2 corpuri/100 mp** (~2,5-3,0 W/mp).

**Securitate (SR EN 1838, P118):** evacuare **≥1 lx** ax pardoseală + antipanică **≥0,5 lx** platforme + pictograme EXIT ISO 7010 + indicatoare locuri libere; kit acumulatori autonomie **≥1h** + self-test + activare la cădere tensiune/alarmă.

## 7. PSI parcaj — capitol central

Parcaj închis → **avizare/autorizare ISU** (Ordin 129/2016).

**Detecție (P118-3):** centrală adresabilă SR EN 54-2/4 (≥24h veghe) + detectoare **adaptate mediu auto** (termovelocimetrice/liniare termice/ASD — evită false de la eșapament/ventilare) + declanșatoare ≤30 m + sirene/lămpi. **Matrice cauză-efect:** oprire ventilare confort + desfumare canton + pornire pompe + **deblocare bariere/uși fail-safe** + lifturi la evacuare + semnal ISU.

**Hidranți (P118-2):** interiori 2 jeturi q 2,1 l/s → **Qhi = 4,2 l/s** (furtun 20-30 m); exteriori **10-20 l/s** + racord autospeciale.

**Sprinklere (obligatoriu parcaj închis, SR EN 12845) clasa OH2:** d 5,0 mm/min, A_op 144 mp, 60 min → **Q_spk = d·A_op = 5,0·144 = 720 l/min = 12 l/s**; cap ≤12 mp bulb 68°C → **200 capete/nivel**; zone reci **dry pipe**.

**Rezervă + pompare:** **V_ri = (Q_spk + Q_hi + Q_he)·t** — sprinkler 12 l/s × 60 = 43,2 mc + HI 4,2 × 10 min = 2,5 mc (+HE 15 × 3h = 162 din rețea publică, exceptabil cu ISU) → **V_ri ~46 mc proprie → rezervor 50 mc** (~210 cu HE); dublu-compartimentat, antiîngheț. **Stație pompare (SR EN 12845):** principală (Q 15-20 l/s, H 60-80 mCA) + **rezervă Diesel** + jockey + racord autospeciale.

## 8. Curenți slabi

**PGS ghidare** (senzori/loc + LED verde/roșu + afișaje libere/nivel+total + panou intrare) + **ticketing/bariere/plată** (bucle + tichet + case POS card/QR + **LPR** abonați, deblocare la incendiu) + **CCTV+LPR** (camere/nivel + accese, NVR ≥30 zile, RGPD) + control acces + **interfoane SOS**/nivel + **sonorizare voce-alarmă VA/PA (SR EN 54-16/24)** + rețea date Cat.6/FO rack+UPS + **BMS/SCADA** box control integrează tot.

## 9. nZEB (Legea 372/2005)

**Fotovoltaic terasă:** P_FV ~1.800 mp · 0,20 kWp/mp = **360 kWp** → ~414 MWh/an (autoconsum EV + surplus prosumator, pergolă FV ultimul nivel). **Ventilare la cerere (DCV) senzori CO + VSD → economie 60-80%** (cea mai mare a clădirii). LED + senzori + lumină naturală → 50-70%. Recuperare frânare lift, BMS peak-shaving prin DLM, motoare IE3/IE4, cosφ. CPE la recepție.

## 10. Concluzii, verificare, avize

**Verificare (Legea 10/1995):** **Is** (apă/canal/separator/pompare), **It** (antiîngheț/ventilare CO/desfumare), **Ie** (tablouri/EV/priză/paratrăsnet), **Ci** (detecție/sprinkler/hidranți/desfumare/rezervă). **Scenariu securitate incendiu** (Ordin 129/2016). **Avize:** **ISU obligatoriu** (parcaj închis HG 571/2016), apă-canal + descărcare (separator), **mediu APM** (separator hidrocarburi), **spor putere SDEE** (EV + ventilare), racordare FV prosumator. Miza instalațiilor — **ventilare CO/desfumare parcaj închis** (6/12 sch/h, F400/120, jet-fan), **separator hidrocarburi NS 10** (mediu), **sprinklere OH2 12 l/s + rezervă**, **EV charging DLM** — rezolvată complet; nZEB prin FV 360 kWp + DCV. PT + piese desenate ulterior.
