## 1. Date generale și cadru

Memoriu de instalații DTAC pentru **locuință individuală unifamilială P+1E**, Acd ~180 mp, familie 5 persoane, H liber 2,70 m. Categoria D, clasa III, grad RF II, risc mic, **nZEB clasa A**.

**Normative:** I5-2022, I7-2011, I9-2022, I13-2015, NTPEE-2018, NP 061, C107, Mc001-2022, P118, SR 1907, STAS 1478/1795, SR 1846, SR EN 12056/12831, OMS 119/2014, Legea 372/2005 (nZEB obligatoriu casă nouă post-2020), Legea 458/2002 (potabilitate), 184/2021 (prosumator).

**Climatic (zona II/III NE):** te −18°C, ti 22 (băi 24), GZ ~3.100 °C·zi, apă rece 10°C, ACM 55-60°C.

## 2. Instalații sanitare

**Apă rece — 2 variante:** (A) **branșament public** PEHD De 32 (Dn 25) + cămin apometru Dn 20 + clapetă (+booster dacă <1,5 bar la etaj); (B) **puț forat** 40-60 m + pompă submersibilă 3-4 mc/h/45-60 mCA + hidrofor vas 100 l + **tratare** (filtru 50 µm + carbon + dedurizare + UV) + buletin potabilitate.

**Debit calcul** (ΣE = 9,75 din 13 obiecte): qc = 0,15·√9,75 + 0,004·9,75 = 0,468 + 0,039 = **0,51 l/s**; coloană **PP-R/PEX De 25**. Necesar 5×120 = 600 l/zi (×kzi 1,30 = 780).

**ACM** (5×60 = 300 l/zi, 55°C): Q = 300·4,186·45/3600 = **15,7 kWh/zi**. Soluție nZEB hibrid: **boiler bivalent 200 l** (serpentină solar + sursă termică) + **2 panouri solare plane 5 mp** (60-70% anual) + rezistență 2 kW backup + **șoc termic 60°C anti-Legionella** (OMS 119) + recirculare.

**Canal menajer** q = 0,5·√9 = **1,5 l/s**: coloane Dn110 (2%) + racorduri Dn50 (3%) + ventilare peste acoperiș + piese curățire. **Evacuare:** (A) racord public cămin Dn400 + clapetă; (B) **microstație biologică 5 LE** (SBR, efluent NTPA 002) sau fosă septică etanșă 3 comp. ~3 mc + dren, **≥10 m de puț+limite** (OMS 119). **Pluvială:** Q_p = 0,8·0,015·110·0,90 = **1,19 l/s** → jgheaburi Dn125 + burlane Dn90-100 (2) → **rezervor 1.000-3.000 l** (udat) + preaplin puț absorbant/rigolă pe lot (nu spre vecini); separativ obligatoriu.

## 3. Instalații termice

**Necesar (C107/SR EN 12831, Δt 40K):** U perete 0,25, acoperiș 0,15, placă sol 0,22, tâmplărie 0,90 (sub Umax). Q = Σ(U·A·Δt) + 0,34·n·V·Δt pe camere → living 2.660 W, dormitoare 770-1.080, băi 450-540 = **~8.240 W** (+10% distribuție) → **~9,1 kW**, indice **~62 W/mp** (nZEB vs. 90-110 neizolat).

**Sursă nZEB: pompă de căldură aer-apă 10-12 kW** (COP ~4,0 A7/W35, reversibilă), regim **35/30°C** + backup centrală condensație 24 kW (dacă gaz) sau rezistență (bivalent) + puffer 100-200 l + vas expansiune 12-18 l. **Distribuție:** **pardoseală radiantă** (parter + băi, PEX 16×2, pas 10-15, ≤29°C locuit/33 băi) + radiatoare dormitoare (termostatici); grup amestec 3 căi + pompă VSD (EEI ≤0,20); reglaj climatic + cameră + regim redus; echilibrare hidraulică obligatorie.

## 4. Ventilare

Necesar 0,5 sch/h: V 356 mc → **178 mc/h**. Evacuări: bucătărie hotă 300-600 (90 continuu), baie fără fereastră 90, WC 30. **Soluție nZEB: VMC dublu-flux cu recuperator contracurent η ≥85%** (180-250 mc/h, filtre G4+F7, introducere living/dormitoare + extracție băi/bucătărie, bypass free-cooling vară + antiîngheț). Recuperare: Q = 0,34·178·40·0,85 ≈ **2,06 kW recuperați**. Hotă evacuare proprie (nu prin VMC).

## 5. Instalații electrice

**Branșament trifazat** (3F+N, casă nZEB cu PC + prosumator) + BMPT + **contor bidirecțional** (smart), Pi solicitat ~15 kW.

**Bilanț** (Pi 23,8 kW): iluminat 1,2 + prize 4,0 + bucătărie 7,0 (0,50) + **PC 4,0** (0,80) + boiler 2,0 + VMC/pompe 0,6 + AC 2,0 + exterior/garaj 3,0 → **Pc ~12,6 kW**; Ic = 12.600/(1,732·400·0,92) = **19,8 A/fază**.

**Tablou:** general 3P+N 32 A + **RCD 30 mA** pe prize+băi (obligatoriu I7) + SPD tip 2. Circuite: iluminat 1,5 mmp/10 A, prize 2,5/16 A + RCD, bucătărie 2,5-4 (plită 6/32 A), **PC 4 mmp 3F dedicat**, boiler dedicat, VMC, exterior IP44, FV bidirecțional + SPD DC/AC. Cabluri Cu N2XH.

**Priză pământ** de fundație (platbandă OL-Zn 40×4 + electrozi) **Rp ≤ 4 Ω** + BEP + echipotențializare băi; **paratrăsnet** (SR EN 62305-2) doar dacă analiza risc R1 o impune (poziție dominantă). **Fotovoltaic prosumator on-grid ~4-5 kWp** (10-12 panouri 400-450 Wp) + invertor hibrid 5 kW + contor bidirecțional (Legea 184/2021) + opțional baterie 5-10 kWh; E = 4,5·1.250 ≈ **5.600 kWh/an** (acoperă PC → nZEB).

## 6. Iluminat (NP 061)

Living 200 lx, bucătărie 300-500 (UGR<22), birou 500, dormitoare 100-200 (2700 K dimmer), băi 200 (300 oglindă, IP44 zone 0-1-2), hol/scară 100 + senzor, exterior 20-50 IP65. Integral **LED** (≥100 lm/W, Ra ≥80); putere specifică ~6 W/mp → 132·6 ≈ **0,79 kW**. Senzori mișcare hol/scară.

## 7. Gaze (NTPEE-2018, dacă racord)

Branșament PE Dn 32 + robinet + regulator (0,05 bar) + contor G4 în firidă ventilată. Consumatori: centrală condensație 24 kW (2,54 mc/h) + aragaz 8 kW (0,85) = **~3,39 mc/h** (Q = P/Hi = 32/9,44). Conductă interioară OL/Cu Dn 20-25 + robineți. **Siguranță:** ventilare permanentă, centrală **etanșă coaxial C13/C33**, **detector metan + electrovalvă** bucătărie/CT, coș omologat, verificare ANRE + probe presiune.

## 8. PSI (risc mic)

Sub praguri P118 (fără scenariu, fără hidranți). Recomandate: **detectoare autonome fum** (SR EN 14604) hol/scară/palier/dormitoare + **detector CO** la CT/sobă gaz + **stingător ABC 6 kg** + pătură antifoc bucătărie; distanțe siguranță + grad RF II.

## 9. Curenți slabi

Date **Cat.6** (rack hol tehnic, prize RJ45 living/birou/dormitoare + Wi-Fi 6) + TV coaxial RG6 + **videointerfon** (post exterior poartă + interioare + comandă poartă) + **alarmă antiefracție** (centrală + PIR parter + contacte + comunicator GSM/IP) + **smart home** opțional (termostate zone, VMC, monitorizare energie/FV). Curenți slabi în tuburi separate de forță (I18).

## 10. nZEB (Legea 372/2005 — casă nouă obligatoriu)

| Domeniu | Măsură | Efect |
|---|---|---|
| Anvelopă | termosistem 15-20 + tâmplărie triplă Low-E | Q ~62 W/mp |
| Termic | **PC aer-apă COP ~4** | regenerabil |
| ACM | **solar 5 mp** (60-70%) + boiler bivalent | regenerabil |
| Ventilare | VMC recuperator η ≥85% | −2 kW pierderi |
| Electric | **FV 4,5 kWp** (~5.600 kWh/an) | producție proprie |
| Iluminat | LED + senzori | consum minim |

Consum energie primară ~60-90 kWh/mp·an, aport regenerabil (PC+solar+FV) >30-40% → **nZEB**; CPE **clasa A** la recepție.

## 11. Concluzii și verificare

| Instalație | Soluție | Parametru |
|---|---|---|
| Apă | branșament/puț + hidrofor | qc 0,51 l/s |
| ACM | solar + PC boiler 200 l | 15,7 kWh/zi |
| Canal | separativ + microstație 5 LE / racord | 1,5 l/s |
| Termic | PC aer-apă + pardoseală radiantă | 9,1 kW (62 W/mp) |
| Ventilare | VMC dublu-flux η≥85% | 178 mc/h |
| Electric | trifazat 15 kW + FV 4,5 kWp | Pc 12,6 kW |
| Gaze | etanș + detector + electrovalvă | 3,39 mc/h |
| nZEB | PC+solar+FV+recuperare | clasa A |

**Verificare (Legea 10/1995, HG 925/1995)** verificatori atestați MDLPA: **Is** (sanitare + gaze), **It** (termice + energetic), **Ie** (electrice + FV + priză pământ). **PIF:** probe presiune/etanșeitate (apă/încălzire/gaze), funcționare cald, PRAM + izolație, autorizare gaze ANRE + racord electric, echilibrare hidraulică, **CPE clasa A** + PV recepție. Detaliere breviare/scheme la PT.
