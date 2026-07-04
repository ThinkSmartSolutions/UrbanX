## 1. Date generale și cadru normativ

Memoriu de instalații DTAC pentru **hală industrială și depozitare parter înalt cu mezanin birouri** (structură metalică, Sc 2.010 mp, Sd 2.360, H liber 8,00 m streașină / 9,50 coamă, V ≈ 16.500 mc, 40 persoane). Tratează: sanitare (apă, canal menajer/tehnologic/pluvial), termice, ventilare-climatizare-desfumare, electrice (tari+slabi), gaze, PSI, eficiență energetică+FV.

| Parametru calcul | Valoare | Sursă |
|---|---|---|
| θe iarnă | −18°C (zona II) | SR 1907-1 |
| θe vară | +30°C (zona III) | SR 6648 |
| Ploaie de calcul | i = 300 l/s·ha (clasa III) | SR 1846-2 |
| Adâncime îngheț | 0,90-1,10 m | STAS 6054 |
| Presiune rețea | 3,0-3,5 bar | aviz operator |
| Rezistivitate sol | ρ = 100 Ω·m | de confirmat |

**Normative:** I9/2015, I13/2015, I5/2010, I7/2011, NP 061, P118-1/2/3, SR EN 12845 (sprinkler), SR EN 671 (hidranți), NP 086, NTPEE-2018, C107, SR EN 62305 (trăsnet), SR EN 16798, Legea 372/2005+Mc001, HG 1146/2006, HG 907/2016.

## 2. Tipuri de hală — impact asupra instalațiilor

| Tip | Încălzire | Ventilare | PSI dominant | Particularități |
|---|---|---|---|---|
| Depozitare marfă generală | antigel 5-8°C, radiant | minimă | **sprinkler/ESFR + hidranți** | rezervă mare apă, ESFR la rafturi >7,5 m |
| Producție | 16-18°C | mecanică evacuare noxe | hidranți+detecție+sprinkler | ventilare tehnologică locală |
| Frigorifică | agregate frig | camere tehnice frig | detecție agent + stingere | instalație frig NH₃/CO₂, detecție agent SR EN 378 |
| ATEX | echip. Ex etanșe | diluție + evacuare zonă | prevenire aprindere | **echipamente Ex d/e/i**, zone 0/1/2 sau 20/21/22 |

**Ipoteza obiectivului:** hală mixtă depozitare paletizată (rafturi ≤6 m) + producție/manipulare + mezanin birouri. Fără ATEX, fără lichide inflamabile, fără frig industrial. → sprinkler zonă depozit+producție, 16°C zonă lucru / 5°C antigel depozit, ventilare mecanică+desfumare. Schimbare spre ATEX/frigorific la PTh → re-evaluare integrală.

## 3. Instalații sanitare

**Necesar apă** (32 muncitori duș 60 l/pers + 8 birouri 20 l/pers): Q_zi_med = (1920+160)/1000 = **2,08 mc/zi**; ×Kzi 1,30 = 2,70 mc/zi; Q_orar_max = (2,70/8)×2,0 = **0,675 mc/h ≈ 0,19 l/s**.

**Debit de calcul** (ΣE = 23,9 echiv. din 8 lavoare + 6 WC + 3 pisoare + 6 dușuri + 2 chiuvete + 4 robinete): qc = 0,20·√23,9 + 0,004·23,9 = 0,978 + 0,096 = **1,07 l/s** → conductă **DN 40** (v≈1,7 m/s); branșament general **DN 63 PE-HD**.

**ACM dușuri:** 6 dușuri × 2 schimburi × 30 l = **360 l/zi** la 45°C; vârf 6 simultan 0,10 l/s, Δθ 50K → **P_vârf = 125,6 kW**. Soluție: **boiler acumulare 500 l** dublă serpentină + rezistență 6 kW back-up + recirculare.

**Canal menajer:** qc_u = 1,07 + 2,0 = **3,07 l/s**; coloane DN 110 aerisite, colectoare DN 110 (i=2%) / DN 160 (i=1,5%), racord DN 200 PVC-KG.

**Canal tehnologic:** ape cu hidrocarburi → separator clasa I (≤5 mg/l); grăsimi → separator SR EN 1825; neutralizare pH (NTPA-002). Ipoteza actuală (fără proces umed) → doar canalizare pardoseală cu sifoane la separatorul platformelor.

**Pluvială (CRITIC — acoperiș mare):** Q_p = φ·i·Sc/10000 = 1,0·300·2010/10000 = **60,3 l/s** (φ=1,0 tablă). Comparație: gravitațional (12 receptoare, DN 100-125) vs. **sifonic adoptat** (8 receptoare × 7,5 l/s, 2 coloane DN 160, colector DN 200 — mai puține coborâri, autocurățare). **Bazin retenție:** V_ret = (60,3−10)·900/1000 = 45,3 → **bazin 50 mc** + regulator vortex la Q_acc 10 l/s. **Separator hidrocarburi platforme** (S 1.500 mp, φ 0,9 → Q 40,5 l/s) → NS 40 cu by-pass.

## 4. Instalații termice

**Necesar hală (θi 16°C, Δθ 34K):**

| Element | A (mp) | U | Φ (W) |
|---|---|---|---|
| Pereți sandwich 100 mm | 1.180 | 0,26 | 10.431 |
| Acoperiș sandwich 120 mm | 2.010 | 0,22 | 15.035 |
| Pardoseală pe sol | 2.010 | 0,35 | 14.774 |
| Tâmplărie/luminatoare | 180 | 1,6 | 9.792 |
| **Transmisie** | | | **50.032** |

Ventilare/infiltrații (n 0,5, V 16.500): Φ_v = 0,34·0,5·16.500·34 = **95.370 W**. **Total hală ≈ 145,4 kW** + 7% intermitent → **156 kW**. Zone antigel 5°C (Δθ 23K) ≈ 0,68× pe zonă.

**Soluție hală:** comparație aeroterme apă / aeroterme gaz / **tuburi radiante gaz adoptate** (încălzesc corpurile nu aerul, ideal H mare, fără stratificare) — 7-8 tuburi × 20 kW la H 6-7 m, evacuare individuală NTPEE.

**Mezanin (20-22°C):** birouri 210 mp×70 + vestiare 90×90 + tehnice 50×55 = **25,6 kW** → radiatoare/ventiloconvectoare de la centrală murală condensație 30 kW (60/45°C) + boiler ACM.

**Sursă/bilanț gaz:** radiante 156 + centrală 26 + ACM 12-30 = **~200 kW** → Q_gaz = 200/9,3 = **21,5 mc/h**.

## 5. Ventilare, climatizare, desfumare

**Hală:** aer proaspăt igienic 32×30 = 960 mc/h; pe schimburi n 1,5 → Q = **24.750 mc/h**. Soluție hibridă: admisie naturală joasă + evacuare prin luminatoare/trape (efect coș) + mecanică pentru noxe proces.

**Vestiare/birouri:** WC 25 mc/h·vas, duș 100/duș (6→600), vestiare 5 h⁻¹ (~1.250), birouri 25-36 mc/h·pers (~290). Evacuare mecanică + compensare, depresiune la grupuri sanitare, recuperator la birouri.

**Desfumare (P118-2):** naturală prin trape acoperiș + aer compensare jos. A_df_util = 1,3%·2.010 = **26,1 mp** util; cu Cv 0,65 → A_geom = 40,2 mp → **20 trape × 2,0 mp** (automat IDSAI + manual). Aer compensare ≥ aria evacuare, v ≤ 5 m/s. Ecrane de fum ≥1,0 m → cantoane ≤1.600 mp (PTh).

## 6. Instalații electrice — curenți tari (I7/2011)

**Bilanț puteri** (Pi total ≈ 205 kW): iluminat hală LED 22 (Ku 0,90), birouri 6, securitate 2, prize mono 8, prize forță trifazate 40 (0,40), utilaje 60 (0,50), ventilare 18, sursă termică 8, **pompe incendiu 30** (regim avarie separat), boiler 6, curenți slabi 5. **Pc (fără pompe incendiu) ≈ 98,4 kW**; ×Ks 0,85 = **84 kW**.

Ic = 84.000/(1,732·400·0,92) = **131,8 A** → branșament **3×160 A** + TGD. Compensare cos φ ≥ 0,92 (baterie ~40 kVAr).

**Tablouri:** TGD + TS-hală + TS-birouri + TS-termo/ventilare + **TS-PSI** (pompe/IDSAI cu alimentare de rezervă). Circuite securitate incendiu (desfumare, pompe, IDSAI, iluminat evacuare) cu **cabluri rezistente la foc E90/PH**, funcționare 90 min.

**Iluminat (NP 061, SR EN 12464-1):** hală depozitare 150-200 lx / producție 300 / birouri 500 / vestiare 200 / circulații 100, LED highbay + senzori, ≤2,5 W/mp/100lx. **Securitate:** evacuare 1 lx/ax 1-3h, panică 0,5 lx, hidranți/tablouri 5 lx, indicatoare la ieșiri.

**Priză pământ de fundație** (platbandă OL-Zn 40×4 sudată de armătură): R ≈ ρ/(π·D) = 100/(3,14·50) = 0,64 → **R < 1 Ω** (comună cu paratrăsnet); BEP egalizare potențial.

**Paratrăsnet (SR EN 62305):** analiză risc R → **NPT III** (sferă r=45 m). Comparație PDA (1-2 catarge, economic pe suprafață mare) vs. cușcă Faraday (ochiuri 15×15 m). Soluție: structura metalică = componentă naturală + **PDA pe catarg** (verificare acoperire — ~2 catarge la dreptunghi 50×40) sau rețea; min. 2 coborâri (NPT III), SPD tip 1+2 la TGD + tip 2/3 secundare.

## 7. PSI (P118-2/3) — CRITIC

**Densitate sarcină termică:** q_s = Σ(Mi·Hi)/As; depozit paletizat ambalaje ≈ **1.200 MJ/mp** (>840) → **risc mare** → impune sprinkler + hidranți int./ext. + detecție + desfumare.

**Hidranți interiori (SR EN 671):** 2 jeturi × 2,1 l/s = **4,2 l/s**, 10 min → **2,52 mc**; orice punct atins de 2 jeturi.

**Hidranți exteriori (V>5.000 mc, risc mare):** 2 × 10 l/s = **20 l/s**, 3h → **216 mc**.

**Sprinkler (SR EN 12845):** depozitare HHS cat. III, densitate stropire **d = 10 mm/min**, arie operare **260 mp** → Q_spk = 10·260/60 = **43,3 l/s**; timp 90 min → **233,8 mc**. Alternativă **ESFR** (K360/K200, 3,5-5,0 bar, 12 capete) la rafturi >7,5 m — elimină sprinklere intermediare.

**Gospodărie apă incendiu:** V_rezervă = 233,8 + 2,52 + 216 = **452,3 → rezervor 460 mc** (reumplere 24h). *Dacă hidranții ext. sunt din rețea publică cu debit garantat → ~236 mc.* **Stație pompare:** electropompă principală Q 45-65 l/s H 70-90 mCA + **rezervă Diesel** + jockey; P = 1000·9,81·0,055·80/(1000·0,70) = **61,7 kW** → motor 75 kW.

**IDSAI (P118-3):** centrală adresabilă (autonomie ≥48h+30min); la H>12 m detectoarele de plafon ineficiente → **detecție aspirativă ASD/VESDA** sau **liniară beam**; punctuale în birouri/tehnice; butoane manuale; sirene + flash; interfațare desfumare/oprire ventilare/deblocare acces/pompe/transmisie pompieri.

**Coloană uscată DN 65** (dacă configurația o impune) + racord autospeciale la rezervor.

| Instalație | Debit | Timp | Volum |
|---|---|---|---|
| Sprinkler HHS III | 43,3 l/s | 90 min | 233,8 mc |
| Hidranți interiori | 4,2 l/s | 10 min | 2,52 mc |
| Hidranți exteriori | 20 l/s | 180 min | 216 mc |
| **Rezervă totală** | | | **≈460 mc** |

## 8. Curenți slabi

**Efracție:** centrală partiționată, PIR/dual, contacte magnetice, detecție spargere geam, sirenă + comunicator IP/GPRS, acumulatori ≥12h. **CCTV:** camere IP 4MP perimetru/porți/depozit/expediție, NVR ≥30 zile RAID, IR, RGPD. **Control acces:** cititoare proximitate + integrare IDSAI (fail-safe evacuare) + pontaj. **Voce-date:** cablare **Cat.6/6A**, 2 prize/post, rack + switch PoE, fibră hală-birouri + Wi-Fi industrial; ~40 porturi → switch 48 PoE+.

## 9. Gaze naturale (NTPEE-2018)

Q_gaz **21,5 mc/h**; branșament presiune redusă + **SRM** (regulator/contor/filtru/robinet incendiu); conducte oțel/PE → oțel interior; DN 40-50 (calcul hidraulic). **Siguranță:** detecție CH₄ sus în încăperi cu aparate + traseu radiante; **electrovalvă cu rearmare manuală** (închide la 20% LII); ventilare permanentă; evacuare gaze arse individual + aer ardere. Praguri: 10% LII pre-alarmă / 20% alarmă+închidere.

## 10. Eficiență energetică / nZEB (Legea 372/2005)

**Fotovoltaic acoperiș** (2.010 mp, 70% util 1.400 mp × 0,18-0,20 kWp/mp → potențial **250-280 kWp**): adoptat **150 kWp** extensibil; E_an = 150·1.250·0,80 = **150 MWh/an**; on-grid prosumator, invertoare string, anti-islanding, structură verificată de structurist.

Alte măsuri: LED + senzori (−50-60%), recuperator CTA birouri (η≥73%), tuburi radiante (−15-25% la H mare), anvelopă U 0,26/0,22, pompe/ventilatoare turație variabilă, compensare cos φ. CPE la PTh cu clasă energetică + aport regenerabil nZEB.

## 11. Concluzii și verificare

| Specialitate | Soluție | Parametru |
|---|---|---|
| Sanitare | DN 63, boiler 500 l recirculare | qc 1,07 l/s; ACM 125 kW |
| Pluvială | sifonic 8 receptoare + bazin 50 mc | Q_p 60,3 l/s |
| Termice | radiante gaz + centrală | 156 + 26 kW |
| Ventilare | hibridă + recuperator | 24.750 mc/h |
| Desfumare | trape acoperiș 26,1 mp util | 1,3% arie |
| Electrice | 3×160 A, TGD, FV 150 kWp | Pc 84 kW; Ic 132 A |
| Paratrăsnet | priză fundație <1 Ω + PDA/Faraday | NPT III |
| PSI | sprinkler HHS + hidranți + IDSAI ASD | rezervă 460 mc, pompe 75 kW |
| Gaze | SRM + detecție + electrovalvă | 21,5 mc/h |

**Verificare tehnică** (Legea 10/1995) verificatori atestați MDLPA: **Is** (sanitare), **It** (termice), **Ie** (electrice), **Ig** (gaze, ANRE), **Cc/Ci** (scenariu securitate incendiu), **A** (structură prinderi FV/catarge). **Avizare/autorizare ISU** (HG 571/2016) pe scenariul de securitate la incendiu (Ordin 129/2016 / P118-1) — aprobarea PSI condiționată de aviz ISU. Breviare + planuri + scheme la PTh+DDE; valorile DTAC = dimensionare preliminară, se definitivează pe date finale (marfă, avize, măsurători).
