## 1. Date generale și cadru normativ

Memoriu de instalații DTAC pentru **clădire de birouri clasa A, S+P+6E** (SCD ~5.600 mp, ~620 mp util/nivel, H liber 3,00 m, ~600 persoane). Tratează sanitare, termice, **ventilare-climatizare (dominantă)**, electrice (tari+slabi), BMS, PSI, nZEB.

| Element | Valoare |
|---|---|
| Populație | ~600 pers (~85/nivel) |
| Categoria importanță | C — normală |
| Clasa seismică | II (γI,e 1,2) |
| Grad RF | II |
| Cotă ultim nivel | +25,50 m |

**Clădire înaltă:** H_E6 = 3,90 + 6×3,60 = **25,50 < 28 m → NU e clădire înaltă strict**, dar se adoptă **acoperitor măsurile de tip clădire înaltă** (sprinklere generalizate, presurizare casă scări, coloană uscată).

**Normative:** I9/2015, SR 1478, SR EN 806, SR EN 12056; I13/2015, SR 1907, C107; I5/2010, **SR EN 16798-1** (categorii aer), ASHRAE 62.1/55; I7/2011, NP 061, SR EN 12464-1, I20/SR EN 62305; P118-1/2/3, NP 086, HG 571/2016, Ordin MAI 129/2016; Legea 372/2005+Mc001, opțional LEED/WELL/BREEAM.

## 2. Instalații sanitare

**Debit apă rece** (72 obiecte: 29 lavoare + 29 WC + 14 pisoare, ΣE = 36): qc = 0,20·√36 + 0,004·36 = 1,20 + 0,144 = 1,34 → **adoptat 1,5 l/s**; verificare consum 600·20 = 12 mc/zi (vârf guvernat de qc). Racord DN 40 + clapetă antiretur RPZ.

**Hidrofor:** H_nec la E6 = 26,5 (geodezic) + 8 (pierderi) + 5 (utilizare) = **39,5 mCA (3,95 bar) > p_disp 3,0** → **grup pompare turație variabilă** (2+1 pompe, vas 100 l, refulare 4,5 bar); zonare parter-E2 direct / E3-E6 hidrofor.

**ACM:** 600·5 = **3 mc/zi** → boiler acumulare 2×500 l de la pompa de căldură + rezistență back-up + ciclu antilegionella 60°C + recirculare (retur ≥50°C).

**Canal menajer:** Q_ww = K·√ΣDU = 0,5·√79,5 = **4,46 l/s**; coloane Dn110 aerisite, colector Dn160 (i 1,5%); GS subsol sub cota canal → **stație pompare cu tocător** (2 pompe alternante + alarmă BMS).

**Pluvială terasă** (700 mp, i 300 l/s·ha, ψ 1,0): Q = 0,03·700·1,0 = **21 l/s** → **sistem sifonic 4 receptoare** (~5,3 l/s) Dn90-110 + preaplin (1/100 ani) + atenuare la 5 l/s (bazin tampon 15 mc dacă PUZ impune).

## 3. Instalații termice

**Necesar încălzire** (anvelopă nZEB U perete 0,25, tâmplărie triplă U 1,0): q_specific ~35 W/mp (22°C interior / −15°C exterior) → **Φ_încălzire = 175 kW**.

**Sursă adoptată: pompă de căldură reversibilă aer-apă (chiller reversibil 4 țevi)** — încălzire (45/40°C joasă temperatură) + răcire (7/12°C); COP încălzire (A7/W45) 3,2, **SCOP 3,8**. Back-up vârf iarnă: cazan condensație gaz 120 kW sau rezistențe electrice. **4 țevi** → încălzire+răcire simultan pe fațade diferite (S vs N). Contorizare pe niveluri (BMS), dedurizator adaos, separator aer/nămol.

## 4. Ventilare-climatizare (HVAC) — dominantă

**Aer proaspăt (SR EN 16798-1, cat. II):** metoda combinată q = 600·7 l/s + 5.000·0,7 l/s·mp = 4.200 + 3.500 = 7.700 l/s ≈ 27.720 mc/h → **adoptat 30.000 mc/h** (n = 2,0 schimburi/h).

**2 CTA × 15.000 mc/h** (subsol/terasă): recuperator rotativ **η ≥ 75%**, filtre ePM1 50% (F7), baterii răcire 7/12 + încălzire 45/40, ventilatoare EC VAV, SFP ≤ 1,5 kW/(mc/s). **Recuperare iarnă:** Φ = 0,34·30.000·0,75·37 = **283 kW recuperați** (fără recuperator ar trebui 377 → rămâne 94 kW). **Free-cooling** pe entalpie (clapete amestec + bypass, comandă BMS).

**Sarcină de răcire** (aporturi interne birou 10 mp/pers): persoane 9,0 + IT 12,0 + iluminat 8,0 + solar 15,0 = **44 W/mp** → Φ_interior = 220 kW; aer proaspăt vara ~100 kW → **Φ_frig total ~320 kW ×0,90 = 288 → instalat ~300 kW** (2 chillere 150 kW); indice **60 W/mp** (clasa A).

**Sistem climatizare (comparație VAV / FCU 4 țevi / VRF / grinzi răcire):** soluție hibridă adoptată — **aer primar tratat CTA cu recuperare** (igienă + dezumidificare/punct rouă) + **ventiloconvectoare 4 țevi tavan** (sarcină sensibilă pe zone, reglaj/orientare); perimetru vs. interior tratate distinct; alternativă premium grinzi de răcire (WELL/LEED). Distribuție grile inducție/difuzoare, extracție plenum tavan; canale 5-6/3-4 m/s, grile ≤2,5 m/s; clapete antifoc EI90/120 + atenuatoare (≤35 dB(A) NR35).

## 5. Ventilare parcaj + spații tehnice

**Parcaj (1.960 mc):** exploatare **6 vol/h = 12.000 mc/h** senzori CO (100 ppm alarmă / 200 evacuare); **desfumare 10 vol/h = 20.000 mc/h** ventilatoare **F400** (400°C/120 min) + compensare ≥60% jos, comandă detecție + manual pompieri, alimentare siguranță. **GS** 25 mc/h·pisoar / 50·cabină (10-15 vol/h); pompe/tablouri/gospodărie PSI 4-6 vol/h + antiîngheț +5°C; **cameră servere** răcire dedicată N+1.

## 6. Electrice — curenți tari (I7/2011)

**Bilanț** (Pi ~435 kW): iluminat LED 40 (Kc 0,9), prize 125 (0,6), climatizare 130 (0,8), ventilare 45 (0,7), lifturi 30 (0,5), servere 40 (0,9), pompe 25, diverse 30. **Pc ~355 ×Ks 0,85 = 302 kW**; S = 302/0,92 = **328 kVA** + compensare cos φ ≥0,92. **Trafo 400 kVA** (MT 20 kV) sau branșament JT.

**Distribuție:** TGD → tablouri nivel (TE) + TH climatizare + **TPSI (sursă siguranță)** + parcaj/desfumare + UPS servere + grup electrogen (AAR). Schemă **TN-S**, RCD 30 mA prize / 300 mA general, SPD T1+2. **UPS** servere 40 kW crit., 15 min → E 11,1 kWh, **60 kVA N+1**. **Grup electrogen** (pompe incendiu 55 + desfumare/presurizare 30 + iluminat securitate 8 + BMS 5 ≈ 113) → **150 kVA/120 kW**, AAR <15 s, motorină ≥4h.

**Priză pământ** de fundație R ≤ 1 Ω (comună) + BEP echipotențial. **Paratrăsnet (SR EN 62305):** LPS **clasa II** (ochiuri 10×10 m terasă + tije), min. 4 coborâri (≤15 m), SPD T1+T2+T3.

## 7. Iluminat (NP 061, SR EN 12464-1)

Birouri **500 lx UGR<19 Ra80 Uo 0,60**; ședințe 500; circulații 100-150; parcaj 75; GS 200; lobby 300. Dimensionare: Φ = Em·A/(UF·MF) → 500/(0,55·0,80) = 1.136 lm/mp; LED 130 lm/W → **≤8 W/mp** (LENI redus nZEB). **Control:** senzori prezență (−20-35%) + daylight harvesting perimetru (−20-40%) + DALI în BMS. **Securitate:** evacuare ≥1 lx (1-3h), antipanică 0,5, intervenție 15%, marcaje permanente.

## 8. PSI (P118-2/3) — acoperitor clădire înaltă

**Hidranți interiori:** 2 jeturi × 2,1 = **4,2 l/s**, 10 min → 2,52 mc. **Hidranți exteriori:** **20 l/s**, 3h → 216 mc. **Sprinklere** (OH2 birouri, 5 mm/min pe 144 mp): q = 5·144/60 = 12 → ~15-20 l/s, 60 min → 72 mc. **Rezervă:** V = 72 + 2,5 ≈ 75 → **rezervor 100 mc**. **Pompare (NP 086/SR EN 12845):** principală electrică Q ~25 l/s H ~70 mCA + rezervă (Diesel) + jockey, alimentare siguranță, cameră REI acces exterior.

**Rețele:** hidranți interiori/nivel (furtun 25 m, 2 jeturi/punct), exteriori inelar Dn100 (≤150 m), sprinklere tavan OH2 (cap 68°C), **coloană uscată** casa scării (racord pompieri parter).

**Desfumare/presurizare:** **presurizare casă scări** 20-50 Pa; desfumare parcaj F400; desfumare circulații; trape fum automate la detecție.

**Detecție (P118-3):** **adresabilă totală** (birouri/circulații/tehnice/parcaj/ghene/tavane), optice + termice tehnice + butoane; **CDSAI** + baterii (48h+30min); comenzi: oprire ventilare + desfumare, deblocare acces, rechemare lifturi parter, presurizare, clapete antifoc, transmisie ISU; **avertizare vocală EN 54-16** (>500 pers).

## 9. Curenți slabi și BMS

**Date:** cablare **Cat.6A** (10 GbE, 2 prize/post) + rack/nivel (IDF) + backbone fibră **OM4** la MDF/data center (stea); **data center** UPS + răcire precizie N+1 + control acces + detecție VESDA + stingere gaz opțional; Wi-Fi PoE + telefonie IP. **CCTV** IP PoE, NVR ≥30 zile + analiză video. **Control acces** carduri/biometrie + antiefracție + interfațare detecție (fail-safe).

**BMS integrat (esențial clasa A + nZEB):** HVAC (CTA/FCU/chillere, free-cooling entalpie) + iluminat DALI + energie (submeterare/PV) + sanitare/termice + interfață CDSAI + acces/CCTV + ascensoare. Protocoale **BACnet/IP** + Modbus + KNX/DALI + M-Bus. Beneficiu: secvențiere surse, free-cooling, night purge, **DCV pe CO₂** (−15-30% ventilare).

## 10. nZEB (Legea 372/2005)

Măsuri: anvelopă (U perete 0,25, tâmplărie U 1,0) + **pompă căldură SCOP 3,8** + recuperare CTA η≥75% (283 kW) + free-cooling/night purge + LED DALI daylight (≤8 W/mp) + DCV CO₂ + BMS optimizare + **fotovoltaic terasă**.

**FV terasă:** ~350 mp utili → **~60 kWp**; E = 60·1.250 = **75 MWh/an**; invertoare prosumator + autoconsum (sinergie cu vârful de răcire vara). **Bilanț:** ~90-110 kWh/mp·an energie primară (prag nZEB birouri RO ≤90-120) + ≥10% RES. CPE la faza finală.

## 11. Concluzii și verificare

| Instalație | Soluție | Parametru |
|---|---|---|
| Apă rece | branșament + hidrofor VT | qc 1,5 l/s; H 3,95 bar |
| ACM | boiler pompă căldură + antilegionella | 3 mc/zi |
| Canal menajer/pluvial | gravitațional + pompare / sifonic | 4,46 / 21 l/s |
| Sursă termică | pompă căldură reversibilă 4 țevi | 175 kW; SCOP 3,8 |
| Aer proaspăt | 2 CTA recuperare η≥75% | 30.000 mc/h |
| Climatizare | aer primar + FCU 4 țevi | 300 kW (60 W/mp) |
| Parcaj | 6 vol/h + F400 | 12.000/20.000 mc/h |
| Electrice | trafo 400 kVA, UPS 60, grup 150 kVA | Pc 302 kW |
| Iluminat | LED DALI daylight | ≤8 W/mp |
| PSI | sprinklere OH2 + hidranți + presurizare | rezervă 100 mc |
| Curenți slabi/BMS | Cat.6A + fibră OM4 + BACnet | data center N+1 |
| nZEB | FV 60 kWp + PC + recuperare + BMS | ~90-110 kWh/mp·an |

**Verificare tehnică** (Legea 10/1995) verificatori atestați MDLPA: **Is** (sanitare + PSI apă), **It** (termice + ventilare-climatizare + desfumare), **Ie** (electrice + detecție + iluminat securitate + sursă siguranță). Scenariul de securitate (Ordin MAI 129/2016) → **aviz/autorizație ISU** (HG 571/2016). Avize: apă-canal, energie (racord + prosumator PV), gaze (dacă cazan), ISU, mediu. Dimensionările DTAC = preliminar, se detaliază la PT prin breviare + scheme.
