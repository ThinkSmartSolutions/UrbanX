## 1. Date generale și cadru

Memoriu de instalații DTAC pentru **imobil mixt S+P+M+5E** — comercial (parter+mezanin) + locuințe colective (etaje) + parcaj subteran. Categoria C, clasa II, grad II RF. **Temă centrală: separarea + contorizarea independentă comercial/rezidențial** pe toate utilitățile.

| Parametru | Valoare |
|---|---|
| Ac / Ad | 620 / ~4.150 mp |
| Apartamente | 40 (8/etaj; 12×2cam + 20×3cam + 8×4cam) |
| Comercial util | 950 mp (parter 620 + mezanin 330, din care alimentație publică 180) |
| Parcaj / persoane | 42 locuri / 128 rezidenți + 190 comercial |
| H cornișă | 19,80 m (<28 → NU clădire înaltă) |

**Normative:** I9/2015, STAS 1478, SR 1795/SR EN 12056, I13/2015, I5/2010, I7/2011, NP 061, NTPEE-2018, P118-1/2/3, NP 24/25 (parcaje), C107, OMS 119/2014, Legea 372/2005+Mc001, SR EN 16798-1, SR EN 62305, SR EN 1825 (grăsimi), SR EN 858 (hidrocarburi).

## 2. Instalații sanitare — separare hidraulică

Branșament unic + contor general → în gospodărie subsol **2 ramuri separate cu subcontoare:** REZIDENȚIAL (coloane → **contor/apartament** pe palier) + COMERCIAL (contor comercial + subcontoare/unitate).

**Debite:** rezidențial Q_zi,med = 128·280/1000 = 35,84 mc/zi (×1,30 = 46,6; orar ×2,0 = **3,88 mc/h**); comercial 5,5 mc/zi. Debit coloană (E ~30): qc = 0,20·√30 + 0,20·30^0,12 = **1,38 l/s** → DN40 (v 1,72 <2,0). **Hidrofor:** H_nec = 17,70 + 8,50 + 2,55 + 5,00 = **33,75 mCA (3,4 bar)** > 2,5 rețea → grup VSD 2 pompe (1A+1R) 2×2,5 mc/h/40 mCA + vas 200 l; comercial (cote joase) direct din rețea.

**ACM:** rezidențial **centrale de apartament combi gaz** (contorizare implicită prin contor gaz, fără recirculare) — instant ≥12 l/min; alternativ centralizat (2 boilere 1.500 l + recirculare + contor ACM/apartament, stocare ≥60°C / consum ≤55°C, șoc 70°C anti-Legionella). Comercial local separat.

**Canal menajer** (SR EN 12056, K 0,5): coloană ΣDU 32 → Q_ww = 0,5·√32 = **2,83 l/s** → PP DN110; pante DN110 1,5-2% / DN160 1%. **Canal gras** (alimentație publică → **separator grăsimi SR EN 1825**): NS = 2,5·1,3·1,3·1,5 = 6,34 → **NS 7** (nu în rețeaua rezidențială). **Pluvială:** Q_p = 300·620·0,90/10000 = **16,74 l/s** → 2 coloane DN110 + preaplin → rețea/bazin retenție. **Parcaj subsol** (sub cota canal): **stație pompare** (2 pompe) + **separator hidrocarburi SR EN 858 NS 10** (clasa I ≤5 mg/l).

## 3. Instalații termice

**Comparație V1 centrale apartament gaz / V2 pompe căldură centralizat / V3 CT comună.** Adoptat **V1 — centrale murale condensație gaz/apartament** (η ≥92%, tip C ventuză/coș colectiv): **contorizare nativă** prin contor gaz, fără pierderi distribuție, responsabilizare. Comercial **sursă proprie separată** (roof-top/VRF, contor propriu). Pregătire hibridizare (FV comun).

**Necesar (C107/SR EN 12831, anvelopă nZEB):** apartamente 45 W/mp (108 kW) + comercial 60 (57) + comun 25 (7,5) = **~172,5 kW**. Apartament 3 cam (68 mp): Q = 3,06 kW → centrală **24 kW** (dictată de ACM instant). **Distribuție pardoseală radiantă 35/30** + radiatoare termostatici + termostat programabil/apartament. **Contorizare:** contor gaz G4/apartament (V1) sau calorimetru (V2/V3) + contor comercial + contor comun (fără cotă indiviză — Legea 372).

## 4. Ventilare-climatizare

**Apartamente:** naturală organizată (grile higro + coșuri băi/bucătării), ≥0,5 sch/h; bucătărie 108 mc/h, baie fără fereastră 54 mc/h; **climatizare split/multisplit** individual (unitate exterioară balcon, circuit din tablou apartament). Apartament 3 cam: 64 mc/h aer proaspăt.

**Comercial (aglomerare):** Q_aer = 190·10 l/s = **6.840 mc/h** → **CTA cu recuperator η ≥73% + baterii C/R + filtre ePM1 50% + VRF/roof-top**; sarcină răcire ~95 kW (80 W/mp). **Alimentație publică:** hotă profesională + make-up 85-90% + canal grăsime + registru foc.

**Parcaj:** ventilare exploatare **6 sch/h = 9.672 mc/h** (senzori CO 50/100 ppm) + **desfumare 12 sch/h = 19.344 mc/h** (jet-fan + extracție **F400 120** EN 12101-3, comandă detecție + CO, pe sursă rezervă).

## 5. Electrice — separare și contorizare

BMPG → contor general → **grupuri separate: TG-REZIDENȚIAL** (contor/apartament pe palier) + **TG-COMERCIAL** (contoare separate total) + **TG-PĂRȚI COMUNE** + **TG-PARCAJ/PSI** (siguranță).

**Bilanț:** 40 ap.×8 (ku 0,7, ks 0,45 = 100,8) + comercial 180 (0,8·0,9 = 129,6) + alimentație 60 (33,6) + comun 45 (25,2) + ventilare 22 (12,3) = **Pc ~301,5 kW**; S = 301,5/0,92 = **327,7 kVA**; Ic = 473 A → **~330 kVA, general 630 A** (+ post trafo posibil). Compensare ~50 kVAr.

**Tablouri:** TG (analizor + compensare) + **TE-apartament** (40A, RCD 30 mA prize/băi, MCB circuite, contor palier) + TE-comercial separat + comun + parcaj/PSI. Cădere tensiune coloană apartament (8 kW, 45 m, Cu 10): ΔU 2,42% <3% ✓. **Sursă rezervă:** **grup electrogen** (pompe PSI + desfumare + iluminat securitate ~55-60 kVA, AAR <15 s) + UPS detecție; cabluri **E90/PH90** securitate. **Priză pământ** de fundație **R ≤1 Ω** (comună paratrăsnet) + BEP + TN-S; **paratrăsnet nivel III** (SR EN 62305, PDA/rețea + ≥2 coborâri).

## 6. Iluminat (NP 061)

Apartament living/dormitor 100-200 / bucătărie 300 / baie 200; comercial 300-500 (casă 500 UGR 19); alimentație 200; scări/coridor 100; lobby 150; parcaj 75 (rampă 300/75). LED ≥100 lm/W. Calcul zonă vânzare (300 mp, 400 lx): Φ = 400·300/(0,55·0,80) = 272.727 lm → 68 corpuri, **8,2 W/mp** (LENI nZEB). **Securitate (SR EN 1838, ≥1h):** evacuare ≥1 lx ax, antipanică ≥0,5 (comercial/lobby), risc 15 lx, hidranți 5 lx, autotest + fotoluminiscent.

## 7. Gaze (NTPEE-2018)

Racord + **PRM** la limită (≤100 mbar); coloane în ghene ventilate (OL/Cu/PE) + robinet incendiu bază; **firidă contoare palier — contor G4/apartament** + comercial separat. Debit centrală 24 kW: q = 24/(9,44·0,92) = **2,76 mc/h < G4 6**; coloană 5 ap. (simultaneitate 0,68) = 9,38 mc/h → DN25-32 (Renouard). **Siguranță:** detector metan + **electrovalvă** (20% LEL) + ventilare încăpere + **evacuare tip C etanșă** (nu tip B în spații locuit); bucătărie comercială detecție + EV + oprire urgență.

## 8. PSI (P118-2/3)

**Compartimentare comercial/rezidențial:** planșeu mezanin **REI 90-120**, pereți comercial↔casa scări REI 90, parcaj **REI 120 + sas**, clapete antifoc EI 60-90 pe traversări, uși evacuare EI2 30-C. Căi evacuare proprii/funcțiune.

**Evacuare comercial** (190 pers): n = 190/70 = 2,71 → **3 fluxuri (1,80 m)**, min. 2 ieșiri (1 directă); un sens ≤22 m / două ≤35 m + bare antipanică. **Stingere:** hidranți interiori **4,2 l/s** (2 jeturi × 2,1) + exteriori 5-10 l/s + sprinklere (comercial/parcaj peste prag) + gospodărie apă + pompe (activă + rezervă GE + jockey); rezervă ~38,5 mc. **Detecție adresabilă CDSI** (48h+30min) + optice/termice parcaj + butoane + sirene + **EVAC comercial (SR EN 54-16)**; comenzi oprire ventilare/desfumare/deblocare acces/lift parter/EV gaz/pompe. **Desfumare** case scări (trapă ≥5% arie SR EN 12101-2 / presurizare 20-50 Pa) + parcaj (jet-fan F400 12 sch/h).

## 9. Curenți slabi

**Videointerfon** apartamente (post interior + panou stradal lobby) + **control acces lobby rezidențial** (cartelă/cod, separat de comercial) + CCTV (comun lobby/parcaj/lift + comercial separat, GDPR) + TV/date fibră (rack/nivel, MDF subsol) + efracție (opțional apartament, comercial). Rețele comercial/rezidențial pe **rack-uri/ghene separate**; curenți slabi separați de tari (≥30 cm, I7). Vizitator magazin fără acces în zona locuit.

## 10. nZEB (Legea 372/2005)

**Fotovoltaic comun terasă** (~300 mp, 550 Wp/2,3 mp → ~20-25 kWp realist; E = 22·1.200 = **26.400 kWh/an** părți comune) + pompe căldură (comercial/comun COP >3,5) + recuperare CTA (η ≥73%) + LED + senzori + contorizare inteligentă + anvelopă C107. **Indicatori nZEB:** energie primară ≤ prag + **≥30% RES** + evaluare separată rezidențial/comercial/comun.

## 11. Concluzii și verificare

| Utilitate | Rezidențial | Comercial | Contorizare |
|---|---|---|---|
| Apă | coloane + contor/ap. | contor + subcontoare | **independentă** |
| ACM | centrală ap. gaz | boiler propriu | **independentă** |
| Canal | menajer separat | + **gras (separator)** | rețele distincte |
| Termic | contor gaz/ap. | sursă proprie + contor | **independentă** |
| Electric | contor/ap. palier | contor separat total | **independentă** |
| Gaz | contor G4/ap. | contor separat | **independentă** |

**Verificare (Legea 10/1995)** verificatori atestați MDLPA: **Is** (sanitare + PSI apă + separator + antilegionella), **It** (termice + ventilare + desfumare), **Ie** (electrice + paratrăsnet + siguranță), **Ig** (gaze). **Avize:** **ISU** (scenariu securitate, Ordin 129/2016 — comercial aglomerare + parcaj), apă-canal (+ grăsimi/pluvial), gaz (PRM), electric (putere + post trafo), mediu (separator/GE). Principiul **separării+contorizării independente comercial/rezidențial** aplicat consecvent pe toate specialitățile (facturare corectă + administrare distinctă). Detaliere breviare/scheme la PTh+DE.
