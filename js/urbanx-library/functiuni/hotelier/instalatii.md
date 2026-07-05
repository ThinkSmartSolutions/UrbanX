## 1. Date generale și cadru

Memoriu de instalații DTAC pentru **HOTEL 4 stele, S+P+6E, ~100 camere** (200-220 paturi) + restaurant + SPA cu piscină + săli conferință + parcare subsol. ~350 utilizatori. **Funcționare continuă 24/7/365.**

| Element | Valoare |
|---|---|
| Categoria importanță | C — normală |
| Clasa seismică | III (γI 1,0) |
| Grad RF | I (clădire înaltă / >28 m) |

*Notă: acest memoriu tratează varianta cu cota ultimului nivel >28 m → **clădire înaltă** (P118-1) cu cerințe PSI maxime.*

**Normative:** I9-2022, I13-2015, I5-2022, I7-2011, NP 061, P118-1/2/3, NP 086, SR EN 12845, STAS 1478/1795/1846, C107, **Ordin ANT 65/2013** (dotări stele), OMS 119/2014, Legea 372/2005 (nZEB), SR EN 16798-1/3, I20/SR EN 62305, SR EN 54-16/24, SR EN 1825 (separator grăsimi), DIN 19643 (piscină).

## 2. Instalații sanitare

**Necesar apă** (cazare 220×250 = 55 mc + restaurant 400×25 = 10 + personal 60×60 = 3,6 + SPA 12 + spălătorie 300×15 = 4,5 + comune 3): **~88,1 mc/zi**; Q_zi,max ×1,25 = 110,1; Q_orar,max = (110,1/16)×2,0 = **13,76 mc/h ≈ 3,82 l/s**. **Debit calcul** (ΣE ~280): qc = 0,20·(1,7·√280 + 0,015·280) = **6,53 l/s** + incendiu. Branșament PEHD De110 + apometru combinat + **rezervor acumulare ~30 mc**.

**Hidrofor:** H_nec la E6 = 22,5 + 10 + 12 = **44,5 mCA (4,45 bar)** > rețea → grup VSD **3 pompe (2A+1R)** Q 23,4 mc/h H 45 + vas 2×300 l; reductoare presiune P-E2.

**ACM (consumator major):** cazare 220×120 + restaurant 400×15 + SPA 4 + spălătorie 3 + personal 60×30 = **~41,2 mc/zi la 60°C**. P_vârf = 9,0·1000·4,186·50/3600 = **523 kW** instant; cu acumulare → **3 boilere 2.000 l inox** + 250 kW schimbătoare. **Anti-Legionella (critic hotel):** stocare/plecare **60°C**, retur recirculare **≥55°C**, **șoc termic 70°C/3 min** automat BMS, fără dead-legs (≤3 l terminal), TMV antiopărire 40-43°C la consum.

**Canal menajer:** Q_ww = K·√ΣDU = 0,7·√600 = **17,1 l/s**; coloane PP fonoabsorbant (acustic camere) + ventilare secundară; racord cu clapetă antiretur. **Separator grăsimi bucătărie (SR EN 1825):** NS = Qs·ft·fd·fr = 4,0·1,3·1,0·1,3 = 6,76 → **NS 10**. **Pluvială** (acoperiș 1.200 mp, i 300, ψ 1,0): Q_p = 300·0,12·1,0 = **36 l/s** → 5-6 receptoare + coloane DN110/125; parcare → bașă + separator hidrocarburi + pompare.

## 3. Instalații termice

**Necesar** (SR EN 12831, te −15°C): camere 3.500×55 = 192,5 + lobby 800×60 = 48 + restaurant 600×70 = 42 + conferință 400×65 = 26 + SPA 500×120 = 60 + bucătărie 200×50 = 10 + parcare antiîngheț 1.400×15 = 21 = **~400 kW** + ACM 250 = **~650 kW instalat**.

**Sursă hibridă nZEB:** 2 pompe căldură aer-apă cascadă (COP 3,5, 2×130 = 260 kW, bază 45/40°C) + 2 cazane condensație gaz (2×250 = 500 kW, vârf + ACM 60°C/șoc 70) + recuperare dezumidificator piscină (~40 kW) + solar termic (30 mp). Butelie egalizare + distribuitor.

| Circuit | Regim | Corpuri |
|---|---|---|
| Camere | 45/40 (VCV) | ventiloconvectoare 4 țevi |
| Lobby/circulații | 40/33 | pardoseală + VCV |
| Restaurant/conferință | 45/40 | VCV + CTA |
| Parcare | antiîngheț | aeroterme/CTA |

**Termostat individual/cameră** (confort 4★, comandă VCV) + programare BMS legat de card. **Sistem 4 țevi** (încălzire+răcire simultan camere nord vs. conferință aglomerată).

## 4. Ventilare-climatizare

Cat. II (SR EN 16798-1): camere 24-26/22°C, UR 50±10%, aer proaspăt 40-54 mc/h·pers, zgomot ≤30 dB(A), CO₂ ≤800 ppm.

**Camere: VRF 3 țevi recuperare + aer proaspăt DOAS.** Unitate interioară + termostat/cameră (reglaj 16-30°C — confort 4★); unități exterioare terasă grupate (recuperare între camere care cer răcire/încălzire); aer proaspăt tratat separat, evacuare din baie. Bilanț: 220×40 = **8.800 mc/h** aer proaspăt → 2 CTA cu recuperare η≥73%; P_rec iarnă = (8.800/3.600)·1,2·37·0,75 = **81,4 kW recuperați**.

**Spații comune (aglomerare, VAV pe CO₂):** restaurant 200×36 = 7.200, conferință 250×36 = 9.000, lobby 100×25 = 2.500 mc/h; CTA dedicate cu recuperare + umidificare conferință; **chiller ~350 kW** frig.

**Bucătărie:** hotă profesională Q_extras ~12.000 mc/h (filtre grăsimi + UV/ozon) + **aport compensat ~10.500 mc/h** (85-90%, depresiune anti-miros), ventilator rezistent grăsime + evacuare acoperiș.

**Parcaj:** exploatare CO 6-10 vol/h (**25.200-42.000 mc/h**, senzori 50/100 ppm); **desfumare F400** (400°C/120 min) 10-12 vol/h + compensare, comandă centrala incendiu.

## 5. Instalații piscină / SPA

**Piscină** 12,5×6,0×1,4 = **105 mc**, 75 mp luciu, apă 28°C, aer 30°C, UR ≤65%.

**Tratare apă (OMS 119, DIN 19643):** recirculare T 3h → Q = V/T = **35 mc/h** (deversor perimetral → vas compensare ~10 mc); filtre nisip/sticlă ≤30 m/h + backwash; **clor** (0,5-1,0 mg/l) + **UV** (reduce cloramine) + corecție pH 7,2-7,6 + coagulant; monitorizare on-line (clor/pH/redox) la BMS; **împrospătare ≥5% volum/zi = 5,25 mc/zi**.

**Dezumidificare (CRITIC):** evaporare W ≈ ε·A = 0,10·75 = **7,5 kg/h** (până la 15 la ocupare). Debit aer m_aer = W/(x_int − x_introdus) = 7,5/0,0078 = 961 kg/h ≈ **800 mc/h** (până la 1.900 intens) → **CTA piscină 1.000-3.000 mc/h** cu recuperator + **pompă căldură integrată** (dezumidificare + recuperare pe ACM/apă piscină) + baterie încălzire + materiale anticorozive (inox/Al); introducere aer pe spălarea vitrajelor (anti-condens); presiune negativă vs. spații alăturate. Saune (finlandeză + hammam) + jacuzzi (tratare proprie).

## 6. Instalații electrice

**Bilanț** (Pi 1.250 kW): camere 220 (Kc 0,45), iluminat comun 60, restaurant 50, **bucătărie 180**, SPA 90, climatizare 320 (0,70), pompe termice 80, lifturi 60, spălătorie 60, pompe apă 40, ventilare/desfumare 50 → **Pa ~752,5; ×Ks 0,85 = 640 kW**; S = 640/0,92 = **696 → 700 kVA**; Ic = 700.000/(1,732·400) = **1.010 A** → **post trafo propriu 1.000 kVA 20/0,4 kV**.

**Distribuție:** TG + TEG (siguranță pe grup) + TD-etaj ×7 + TD-bucătărie + TD-CT + TD-climatizare + TD-SPA + TD-parcare; cabluri N2XH fără halogeni, **E90 pe securitate incendiu**; compensare cos φ ≥0,92.

**Grup electrogen:** siguranță incendiu (pompe 90 + desfumare 40 + iluminat securitate 25 + lift pompieri 15 + centrală 5 + epuisment 8 = ~183) + servicii hotel parțial 200 = **~400 → grup 500 kVA/400 kW**, autonomie 8-12h, AAR <15 s; vitale + UPS (centrală incendiu, IT, PMS).

**Priză pământ** de fundare **Rp ≤1 Ω** (comună paratrăsnet); TN-S; RCD 30 mA prize + zone umede (băi/SPA/piscină echipotențializare SR HD 60364-7-702); **paratrăsnet nivel II** (I20/SR EN 62305, PDA/rețea + ≥4 coborâri + SPD 1+2/2+3).

**Eco-switch card cameră:** cardul RFID alimentează circuitele de prezență; la plecare taie iluminat/prize neesențiale + climatizare setback (18/28°C); rămân minibar/siguranță/detector fum; **economie 15-25%**.

## 7. Iluminat (NP 061, SR EN 12464-1)

Cameră ambianță 100-150 (2700-3000 K) + citit 300 + oglindă baie 300-500; recepție/lobby 300; restaurant 150-200 (dimabil); bucătărie 500 (Ra≥80); conferință 300-500 (DALI); coridoare 100 + orientare nocturnă; SPA/piscină 200 (IP65); parcare 75; birouri 500. LED ≥100 lm/W, Ra ≥80 (≥90 oglinzi/recepție); iluminat scenografic lobby/restaurant/SPA (4★); DALI + senzori; exterior arhitectural + reducere nocturnă. **Securitate:** evacuare 1-3h, anti-panică 1h (restaurant/conferință), marcare hidranți, indicatoare „IEȘIRE" (autonome/pe grup, SR EN 1838, ≥1 lx ax).

## 8. PSI (CRITIC — clădire înaltă + cazare)

Grad RF I + **Scenariu de securitate la incendiu**. **Detecție totală (P118-3):** detectoare fum optice în **TOATE camerele** + holuri/tehnice/parcaj (aspirativă) + termice bucătărie + butoane + **centrală adresabilă redundantă** 24/7 recepție. **Alarmare vocală EVAC (SR EN 54-16/24) multilingv** (RO+EN), zonare pe niveluri (evacuare progresivă).

**Sprinklere OBLIGATORII** (SR EN 12845, LH/OH1 cazare, OH2 parcaj): 5 mm/min pe 72 mp → ~25-30 l/s, 60 min; ACS pe zone. **Hidranți interiori** 2 jeturi × 2,1 = 4,2 l/s (clădire înaltă) + **exteriori** 10-20 l/s + **coloane uscate** scări. **Gospodărie apă incendiu:** sprinklere 108 + hidranți int. 15 + ext. 216 = **rezervă ~300 mc**; **stație pompare** (principală electrică + rezervă Diesel + jockey).

**Desfumare:** **presurizare case scări** (20-80 Pa); desfumare coridoare + spații mari (trape); **parcaj F400**; clapete antifoc EI pe traversări. Iluminat securitate + **ascensor pompieri** + compartimentare.

## 9. Curenți slabi și automatizare

**Date:** cablare Cat.6/6A + fibră (backbone vertical), rack/nivel + server room climatizat. **Telefonie IP** (integrat PMS: facturare, wake-up). **IPTV** camere + **WiFi mare densitate** (VLAN oaspeți/admin/IoT) — cerință ANT 4★. **PMS** (rezervări/check-in/facturare) + **încuietori RFID/mobil** integrate cu eco-switch. **CCTV** IP spații comune (GDPR, fără intimitate). **Sonorizare/PA** zonabilă integrată EVAC (prioritate mesaje evacuare). **BMS** (HVAC, ACM/anti-Legionella șoc termic, piscină clor/pH/UR, ventilare pe CO₂, card cameră, iluminat DALI, energie/contorizare, alarme tehnice, interfață PSI).

## 10. nZEB (Legea 372/2005)

Pompe căldură (bază, COP 3,5) + recuperare piscină (dezumidificator PC) + recuperare CTA (η≥73%, ~80 kW) + recuperare VRF 3 țevi + solar termic ACM + **fotovoltaic terasă** (~300 mp → **60 kWp**, E ~69.000 kWh/an autoconsum) + BMS + card cameră (−15-25%) + LED + DCV pe CO₂ + izolație C107. Cotă RES ≥30%.

## 11. Concluzii și verificare

Instalații hotel 4★ S+P+6E: confort (reglaj individual cameră, ACM permanent, aer tratat, izolare fonică), funcționare continuă (redundanță 2+1 pompe/surse + grup + UPS + BMS), igienă (anti-Legionella 60/70°C, tratare piscină clor+UV, separator grăsimi), **securitate incendiu maximă clădire înaltă** (detecție totală + EVAC + sprinklere + hidranți + desfumare + presurizare scări), nZEB (pompe căldură + recuperare + solar/PV + card).

**Verificare (Legea 10/1995)** verificatori atestați MDLPA: **Is** (sanitare), **It** (termice), **Iv** (ventilare-climatizare), **Ie** (electrice + curenți slabi + paratrăsnet), **cerința C** (securitate incendiu). **Avize:** ISU (aviz proiectare + autorizație PIF, HG 571/2016), scenariu securitate; probe PIF firme autorizate. **Clasificare ANT 4★** — verificare dotări instalații (ACM permanent, climatizare, GS/cameră, WiFi/IPTV, telefon, lift, detecție/EVAC, grup rezervă) toate CONFORM. Detaliere breviare/scheme/planuri la PTh+DE.
