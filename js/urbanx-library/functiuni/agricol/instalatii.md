# MEMORIU TEHNIC DE INSTALAȚII — FERMĂ AGROZOOTEHNICĂ (DTAC)

Instalații fermă: hală adăpost + siloz + anexe. Categoria C (B peste prag IED), clasa III, grad RF III-IV.

## 1. Date generale, cadru, date de calcul

3 circuite apă: adăpare (potabilă) + spălare-dezinfecție + potabilă personal. **Normative:** I9-2015, STAS 1478, SR 1343, STAS 1795, NP 133/2013; I13-2015, **I5-2022** (ventilare-climatizare), I6/I31 (gaze), C107/2005, SR 1907; I7-2011, NP 061-2002, PE 116, SR EN 62305; P118-1/2/3, Legea 307/2006, HG 571/2016, Ordin MAI 129/2016; Legea 372/2005 + Mc001 (nZEB); norme **ANSVSA** bunăstare (**Directiva 2008/120/CE** porcine, **2007/43/CE** broiler, **1999/74/CE** ouătoare, **2008/119/CE** viței); **Directiva Nitrați 91/676** + HG 964/2000 + Cod bune practici + PAZVN (**tot teritoriul RO = zonă vulnerabilă**), **Directiva 2010/75/UE IED** + Legea 278/2013 + BREF IRPP, Legea apelor 107/1996, OUG 195/2005.

**Praguri IED (autorizație integrată):** păsări **>40.000**, porci >30 kg **>2.000**, scroafe **>750**.

**Date calcul (tabel specific pe specie):** apă adăpare vacă lapte 60-100 l/cap/zi, porc gras 8-12, pasăre 0,25-0,35; dejecții vacă 45-55, porc 5-7, pasăre 0,12-0,15; ventilare vară vacă 400-500 mc/h/cap, porc 80-100, pasăre 4-5; iarnă vacă 60-80, porc 8-12, pasăre 0,7-1,0; căldură metabolică vacă 700-1.000 W/cap, porc 90-120, pasăre 8-10. **Exemplu: 2.000 porci gras** hală închisă presiune negativă, θe iarnă −18°C, vară +32°C, θi 18-22°C.

## 2. Instalații sanitare și adăpare

Sursă **foraj propriu** (aviz ANAR + hidrogeologic + control potabilitate ANSVSA) sau branșament. Schema: foraj → rezervor → hidrofor → distribuție + rezervă incendiu.

**Necesar apă: Q_ad = Σ(Ni·qi).** Ex. 2.000 porci × 10 = **20 mc/zi** + spălare ~3 + personal 4×60 = 0,24 → **Q_zi,med 23,2 mc/zi**; Q_zi,max = 1,3·23,2 = **30,2 mc/zi**; Q_o,max = 2,5·30,2/24 = **3,15 mc/h (0,87 l/s)**. **Rezervor:** V = compensare (8-12) + avarie (~24, 1 zi critic) + incendiu → **2×25 mc** (incendiu intangibil) + senzor/preaplin/recirculare. **Hidrofor** 2 pompe (1A+1R) VFD, Q ≥3,2 mc/h, H 40-50 mCA. **Adăpare:** adăpători automate nivel/tetină/cupă + regulator presiune + dozator medicație + contorizare/hală (consum = indicator sanitar) + antiîngheț. **Canal separat:** menajer (fosă/microstație) / **tehnologic → gestiune dejecții (NU în canal/emisar)** / pluvial (acoperiș curat separat; platforme murdare → bazin must).

## 3. Gestiunea dejecțiilor — capitol central

**Tot RO = zonă vulnerabilă nitrați → stocare min. 4-6 luni (150-180 zile)**; împrăștiere pe plan fertilizare ≤**170 kg N/ha·an**. **Colectare:** canale sub grătare (hidraulic flushing / gravitațional) / raclare mecanică / așternut adânc → platformă. Tip: solid → platformă acoperită + must; lichid → bazin/lagună etanșă (+ separare fracții).

**V_stoc = N · v_d · t_stoc · k_s.** Ex. 2.000 porci × 6 × 180 × 1,15 = **2.484.000 l ≈ 2.484 mc** + V_ploaie (A×h) + V_spălare → bazin **~2.700-3.000 mc** (2 bazine mari: umplere + maturare). **Teren împrăștiere:** A_teren = N·N_excretat/170 (porc gras ~10-12 kg N/an); fără suprafață → export/biogaz. **Platformă solid:** radier b.a. C25/30 impermeabil + pante 2-3% spre must + acoperiș + ziduri sprijin. **Bazin lichid:** b.a. C30/37 XA impermeabil sau HDPE ≥1,5-2,0 mm + detectare scurgeri + freeboard 0,5 m + mixer + **acoperire (reducere NH₃ — BAT/IED)** + distanțe sanitare + separare fracții (șnec/presă). **Valorificare:** împrăștiere încorporare rapidă / biogaz / compostare.

## 4. Termice și microclimat

Sursa dominantă iarna = **căldură metabolică**. Adulte (porc gras/vacă/ouătoare) **neîncălzite** (metabolic + ventilare reglează); maternitate/tineret **încălzire localizată** (lămpi IR + podea încălzită: purcei 30-34°C, pui 32-34°C scăzând); filtru/birouri confort 20-22°C. Anvelopă C107 (limitează pierderi + **condens**).

**Bilanț termic: Q_animale + Q_încălzire = Q_transmisie + Q_ventilare.** Q_animale = N·qs; Q_transmisie = ΣUj·Aj·(θi−θe); **Q_ventilare = 0,34·L·(θi−θe)**. Ex. 2.000 porci: Q_animale = 2.000·100 = **200 kW**; L_iarna 20.000 mc/h → Q_ventilare = 0,34·20.000·36 = **245 kW**; Q_transmisie ~54 kW → necesar 299, aport 200 → **deficit ~99 kW** acoperit prin: reducere debit ventilare iarnă (pârghia principală) + recuperator (−40-60%) + încălzire suport (doar maternitate). **Cuplaj termic-ventilare** critic. Sursă zone încălzite: pompă căldură/CT (podea 35-45°C) + IR; ACM boiler + solar/PC; antiîngheț cablu.

## 4b. Ventilarea zootehnică — capitol central

Scop (I5 + bunăstare): temperatură + umiditate (60-75% RH) + gaze (**NH₃ max 20 ppm** rec. <10, **CO₂ max 3.000 ppm**, **H₂S max 5 ppm**, praf).

**2 regimuri:** **VARĂ maxim** (evacuare căldură + răcire, 80-100 mc/h/cap porc / 400-500 vacă / 5-6 pasăre) vs. **IARNĂ minim igienă** (evacuare umiditate/gaze conservând căldura, 8-12 porc / 0,7-1,2 pasăre). Raport **~10:1** → ventilatoare în trepte.

**L_vara = N·l_vara.** Ex. 2.000·100 = **200.000 mc/h**. **L_iarna** = max(umiditate L = W_prod/(ρ(xi−xe)), CO₂ L = V_CO₂/(Ci,adm−Ce)). Ex. 2.000·10 = **20.000 mc/h**. **Sisteme:** naturală (cortine + coamă, Δp = H·g·(ρe−ρi)) / **presiune negativă** (extracție + admisii reglabile — uzual hale închise) / **tunel** (viteză 1,5-2,5 m/s răcire + pad cooling caniculă) / transversală. Ventilatoare la presiune statică 20-50 Pa, criteriu eficiență mc/h/W. **Automatizare climat** (senzori T/RH/NH₃/CO₂ + presiune diferențială → trepte + turație VFD + admisii + încălzire + cooling, curbe setpoint pe vârstă + alarmă).

## 5. Electrice și grup electrogen

**Bilanț (ex. 2.000 porci):** ventilatoare 32,4 (dominant) + furajare 4,5 + pompe apă 2,7 + dejecții 2,2 + iluminat 5,8 + încălzire IR 6,0 + filtru 2,5 + siloz 1,9 + curenți slabi 2,4 = **Pc ~60,4 kW**; cosφ 0,90 → **Sc ~67 kVA** + compensare (cosφ >0,92). Coloane I7 (ΔU ≤3% iluminat/5% forță + selectivitate).

**Grup electrogen OBLIGATORIU (siguranță):** oprirea ventilației = **mortalitate în masă în minute** (căldură/umiditate/gaze) → GE preia sarcina esențială (ventilare + pompe + automatizare + iluminat siguranță) + **AAR <15-30 s** + **cortine fail-safe gravitaționale** (deschidere automată la cădere tensiune) + **alarmă (sirenă + SMS/apel)** + combustibil ≥24-48 h. GE ~60-80 kVA. **Priză pământ R ≤4 Ω** (comună) + egalizare mase metalice (hală/siloz/conducte). **Paratrăsnet:** hală mare izolată + silozuri înalte → risc ridicat, evaluare SR EN 62305-2 → nivel **III-IV** + SPD pe TG + automatizare.

## 6. Iluminat (NP 061 + norme specii)

Program lumină = parametru zootehnic. Ouătoare 20-40 lx (16h L/8h Î), broiler 20 lx (min. 6h Î continuu, Dir. 2007/43), porci 40-100 lx (min. 8h ≥40 lx), bovine muls 150-200 lx (16h), tehnice 100-200. **LED dimabil IP54/65** (rezistent spălare/amoniac) + simulare zori/amurg. **Siguranță (P118-3/NP 061):** evacuare autonomie 1-3h + marcare hidranți + continuare lucru (comandă climat). **Siloz:** corpuri **ATEX** (praf cereale — zone Ex, NP 099/SR EN 60079).

## 7. PSI agricol (P118)

Sarcină termică ridicată (furaje/paie/cereale/praf → explozie siloz). Grad III-IV. **Rezervă apă: V_inc = (Q_hi + Q_he)·T** (T 3h). **Poate fi COMUNĂ cu gospodăria apă** (intangibil prin poziție aspirații) + foraj. Ex. Q_he 10 l/s × 3h = **108 mc**. **Stingere:** hidranți exteriori (rețea inelară + pompe activă+rezervă+pilot, alimentate și din GE) + interiori (dacă impuși) + stingătoare. **Detecție (P118-3):** IDSAI magazii/tehnică/tablouri (detectoare cu prag pt praf). **Evacuare animale: porți/uși largi** spre padocuri. **Distanțe siguranță** siloz/magazie față de hale (P118-1). **Explozie praf siloz:** aspirație/desprăfuire + panouri decompresie (venting) + împământare + echipamente ATEX.

## 8. Curenți slabi și automatizare

**Computer climat** (senzori T/RH/NH₃/CO₂/presiune → ventilatoare VFD + admisii + încălzire + cooling + lumină, curbe pe vârstă). **Alarmă climat critică** independentă + acumulator (T min/max, cădere tensiune, defect ventilator, gaze) → sirenă + **apel/SMS fermier** (GSM, escaladare multi-numere). **Furajare automată** (transportoare/melci siloz → buncăre → linii + dozare rețetă + cântărire). **Muls** (sală muls automatizată / robot AMS + tanc răcire lapte CIP; ouătoare benzi colectare ouă). **CCTV** (hale/filtru/siloz/perimetru + NVR) + control acces filtru (biosecuritate) + cântărire animale + software management (efectiv/sanitar/producție/consum) + rețea Cat.6/fibră + UPS.

## 9. Biogaz, eficiență, nZEB

**Biogaz** (digestie anaerobă dejecții + co-substrat → cogenerare CHP + digestat fertilizant; V = m_VS·Y) — preferat ferme mari (autoconsum + IED/BAT + management dejecții). **Fotovoltaic acoperiș** (vârf producție vară = vârf ventilare) autoconsum + injecție. **Recuperator căldură** aer evacuat (−40-60% încălzire). Pompe căldură (podea maternitate + ACM). **LED + ventilatoare EC/brushless** (consumator dominant). Recuperare căldură lapte. Anvelopă C107. Tendință cvasi-independență energetică.

## 10. Concluzii, verificare, avize

Asigură bunăstare (microclimat/apă/lumină/densitate ANSVSA-UE) + **siguranța efectivului** (GE + AAR + alarmă + fail-safe) + mediu (dejecții 4-6 luni etanșe + plan 170 kg N/ha + biogaz — Nitrați/CBPA/BAT/IED) + foc (rezervă + hidranți + detecție + evacuare animale + antiexplozie) + eficiență (recuperare + PV + LED + biogaz).

**Verificare (Legea 10/1995, HG 925/1995):** **Is** (apă/canal/adăpare), **It** (termice/ventilare zootehnică/gaze), **Ie** (electrice/GE/priză/paratrăsnet/curenți slabi), **Ci** (foc — stingere/detecție) + corelat A/B. **Avize:** **gospodărirea apelor ANAR/ABA** (foraj + dejecții), **ISU** (HG 571/2016), **sanitar-veterinar ANSVSA/DSVSA** (funcționare/bunăstare/biosecuritate), **mediu APM** (+ **autorizație integrată IED** peste prag), sanitar DSP (distanțe + apă personal), operatori utilități, foraj (notificare ANAR). Se corelează cu piesele desenate + memoriile de specialitate + proiectul tehnologic.
