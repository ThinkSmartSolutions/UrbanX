## 1. Date generale și cadru normativ

Memoriu de instalații DTAC pentru **unitate medicală (spital/clinică multifuncțională) S+P+4E**, ADC ~6.000 mp (~1.000/nivel). **90 paturi + 8 posturi ATI + 3 săli operație + ambulatoriu**; 220 persoane/schimb.

| Nivel | Funcțiune | Grupă medicală (HD 60364-7-710) |
|---|---|---|
| Subsol | tehnic (CT, stații gaze, hidrofor, gospodărie apă incendiu, TG, GE), depozite, morgă, sterilizare | 0/1 |
| Parter | ambulatoriu, UPU/triaj, imagistică (RX/CT/RMN), laborator, farmacie | 1 |
| Etaj 1 | bloc operator (3 săli), ATI (8), sterilizare | **2** |
| Etaje 2-4 | spitalizare (chirurgie/medicină/obstetrică-neonatologie) | 1-2 |

**Caracteristică definitorie: FUNCȚIONARE CONTINUĂ 24/7/365 + REDUNDANȚĂ.** Clasa I importanță (γI 1,4), categoria A. *Nicio pană să nu pună în pericol un pacient critic.*

| Utilitate | Redundanță | Întrerupere admisă |
|---|---|---|
| Electric Grupa 2 (op./ATI) | dublă rețea + GE + UPS | **≤0,5 s** (HD 60364-7-710) |
| Electric Grupa 1 | dublă rețea + GE | ≤15 s |
| Oxigen | sursă + rezervă + avarie (**N+2**) | 0 s |
| Aer/vacuum | duplex-triplex (N+1) | 0 s |
| Termic | 2 cazane 60% (N+1) | 0 s |
| Apă | rezervă ≥24h | 0 s |

**Normative:** I9/2015, I13/2015, I5/2022, I6/Legea 123/2012, STAS 1478/1795, C107; **NP 015-1997**, **Ordin MS 914/2006** (+1096/2016, 961/2016), **SR EN ISO 7396-1** (gaze medicale), **SR EN ISO 14644-1** (clase puritate), SR EN 16798/DIN 1946-4 (ventilare sănătate), **SR HD 60364-7-710** (locații medicale IT); P118-1/2/3, NP 061; Legea 372/2005, HG 571/2016, Mc001.

## 2. Instalații sanitare

**Sursă:** branșament **dublu** (2 artere, cămine separate), 2,5-3,5 bar, apometru DN100/40.

**Necesar apă** (I9/STAS 1478): 90 paturi×400 + 8 ATI×750 + 220 personal×60 + 300 ambulatoriu×15 + 3 op.×400 + 400 mese×25 + spălătorie 8.000 + sterilizare/laborator 5.000 = **~94 mc/zi**. Q_zi,max = 1,15·94 = 108,1; Q_orar,max = 2,0·108,1/24 = **9,0 mc/h**; q_c instantaneu (ΣE ~620) ≈ **17,3 l/s**.

**Rezervă:** consum 108 mc (24h) + **incendiu** V = hidranți int. 90 + ext. 54 + sprinklere 108 = 252 → **rezervor 360 mc** (2×180 mentenanță).

**Hidrofor:** H_nec = 15,6 + 8,5 + 3,0 + 15,0 = **42,1 mCA (4,2 bar)** → grup VSD **3 pompe (2A+1R)** Q 17,5 l/s H 43, vas 500 l, pe tablou vital.

**ACM anti-Legionella (pacienți imunocompromiși):** preparare/stocare **≥60°C**, recirculare retur **≥55°C**, **șoc termic 70°C ≥3 min** automat BMS, mitigatoare 38-43°C la consum (anti-opărire). Necesar ~42 mc/zi; Q_ACM = 42.000·1,163·50/(24·1000) = 101,8 kW mediu (**~305 kW vârf**); **2 boilere 3.000 l inox 316L** (redundanță).

**Apă tratată:** sterilizare demineralizată <5 µS/cm (RO+deionizare, 1,5 mc/h); laborator ultrapură tip I <0,1 µS/cm (RO+EDI+UV, 0,3); dializă (RO dublu-pas, 0,8); umidificare AHU (RO+UV). Buclă inox 316L continuă fără brațe moarte.

**Canalizare SEPARATĂ:** menajeră (rețea publică); **infecțioasă/septică** (boli infecțioase/microbiologie/morgă → decontaminare termică/chimică înainte de deversare); **radioactivă** (medicină nucleară → **bazine de decădere ≥10 T½**, I-131 8 zile → ≥80 zile, monitorizare); tehnologică grasă (bucătărie → separator grăsimi); pluvială. q_c canal = 17,3 + 2,0 = **19,3 l/s**; pluvială Q_p = 0,8·300·0,1·0,9 = **21,6 l/s**.

## 3. Gaze medicale (SR EN ISO 7396-1) — cea mai critică

| Gaz | Presiune | Cod culoare |
|---|---|---|
| O₂ | 4-5 bar | alb |
| Aer medical AIR-4 | 4-5 | negru-alb |
| Aer motor AIR-8 | 7-8 | negru-alb |
| Vacuum | −0,6…−0,9 | galben |
| N₂O | 4-5 | albastru |
| CO₂ | 4-5 | gri |
| AGSS (evacuare anestezice) | vacuum dedicat | violet |

**OXIGEN — TRIPLĂ REDUNDANȚĂ (N+2):** (1) **VIE criogenic** 5.000 l + vaporizatoare duble; (2) rampă butelii comutare automată; (3) rampă backup + prize NIST urgență. **Debit** = săli op. 3×100 + ATI 8×100×0,75 + saloane 90×20×0,5 + naștere 6×40 = **~2.040 l/min ≈ 123 mc/h**; autonomie VIE ~34h vârf.

**Aer medical:** compresoare **oil-free triplex (2A+1R)**, uscător adsorbție (rouă ≤−40°C), filtre 0,01 µm + carbon + bacteriologic, tampon 2×1.000 l, monitorizare CO/CO₂/ulei. **Vacuum:** pompe duplex-triplex (N+1), filtre bacteriologice, ~40 mc/h. **N₂O/CO₂:** rampe duble comutare + detectoare. **AGSS:** vacuum DEDICAT separat, evacuare exterior (protejează personalul).

**Rețea:** cupru medical degresat (SR EN 13348), lipire în azot; **cutii de zonă** cu vane+manometre/departament; prize profil unic anti-eroare (ATI O₂+AIR+VAC×2-3, op. toate 7, saloane O₂+VAC). **Alarme 3 niveluri** (operaționale la stație / clinice la nurse station / urgență la sas), pe UPS.

## 4. Instalații termice

**Sursă N+1:** **2 cazane condensație × 60%** gaz + comutare motorină rezervă.

**Bilanț** (t_e −18°C, SR 1907): săli op. 22-24, ATI 24, saloane 22, naștere 24-26, coridoare 20, băi 24, tehnic 15. Q_total = transmisie 210 + ventilare 480 + ACM vârf 305 (cu 0,9) ≈ **895 kW → 2×550 kW (N+1)**.

**Distribuție:** butelie egalizare + pompe duble; circuite AHU (75/60), radiatoare/VCV non-critice (55/45), ACM prioritar, pardoseală pediatrie. **Zone aseptice (op./ATI): climatizare integral prin aer, FĂRĂ radiatoare** (igienă). Radiatoare oțel netede lavabile saloane.

## 5. Ventilare-climatizare cu clase de puritate

**Principii:** (1) **100% aer proaspăt filtrat** zone medicale, recirculare INTERZISĂ septic + bloc operator; (2) **cascadă presiuni** (pozitivă op./ATI/sterilizare curată/farmacie/neonatologie; negativă izolare TBC/microbiologie/morgă/sterilizare murdară); (3) filtrare F7+F9+**H13/H14 HEPA** critic.

| Încăpere | Vol/h | % proaspăt | Filtrare | Presiune | Clasa |
|---|---|---|---|---|---|
| Sală operație aseptică | **20-25** | 100% | F7+F9+**H14** laminar | **+15 Pa** | **ISO 5** laminar / ISO 7 |
| Sală op. generală | 15-20 | 100% | +H14 | +10 Pa | ISO 7 |
| ATI | 10-12 | 100% | +H13 | +8 Pa | ISO 7-8 |
| Salon standard | 6 | ≥50% | F7+F9 | neutră | — |
| Salon imunodeprimați | 12 | 100% | +H14 | +15 Pa | ISO 7 |
| Izolare TBC | 12 | 100% | evacuare HEPA | **−15 Pa** | — |
| Sterilizare curată/murdară | 15 | 100% | +H13 / — | poz. / neg. | ISO 8 |
| RMN/CT | 8-10 | ≥50% | F7+F9 | neutră | UR strict |
| Naștere/neonatologie | 12 | 100% | +H14 | poz. | ISO 7 |

**Sală operație (LAF):** plafon **HEPA H14** (≥99,995% la 0,3 µm) ~3,2×3,2 m, viteză **0,25-0,35 m/s** descendent, **ISO 5** zona sterilă, 20-25 vol/h, +15 Pa cascadă triplă, 18-26°C reglabil + 45-55% UR. **AHU dedicat/sală** (nu partajat), umidificare cu abur igienic, ventilatoare duble.

**Recuperare cu LIMITE IGIENICE:** zone septice → **recuperator circuit intermediar (glicol) — separare fizică totală**, η 45-55%; zone non-critice → plăci/rotativ η 70-85%. Aer extras op./izolare/laborator NU se recirculă (evacuare ≥10 m de priză proaspăt).

## 6. Instalații electrice (I7, SR HD 60364-7-710)

**Alimentare multiplă:** (1) **dublă rețea MT** (2 racorduri + 2 trafo, AAR); (2) **GE** (AAR ≤15 s, motorină ≥24-48h, dublu N+1); (3) **UPS** Grupa 2 (op./ATI, **≤0,5 s**, autonomie ≥3h).

| Consumator | Normală | La cădere | Timp |
|---|---|---|---|
| Grupa 2 vital | rețea + UPS on-line | UPS→GE | **≤0,5 s** |
| Grupa 1 | rețea | GE | ≤15 s |
| Iluminat securitate | rețea | GE + acumulatori | ≤5 s |

**Bilanț** (Pi 1.560 kW): iluminat 120, prize medicale 200, imagistică 350, op.+ATI 180, HVAC 300, pompe 90, ascensoare 120, bucătărie/spălătorie 200 → **Pc ~961 kW → Sc ~1.130 kVA**. **Trafo 2×1.000 kVA**; **GE ≥800 kVA** (delestare neesențiali).

**IT medical Grupa 2** (op./ATI): **transformator de separare** (la primul defect echipamentul rămâne în funcțiune) + **IMD monitor izolație** (alarmă <50 kΩ), 5-8 kVA/sală. **Priză pământ R ≤1 Ω** (comună paratrăsnet); **egalizare potențial medicală suplimentară** (BEP local Grupa 1/2, conductoare ≤0,2 Ω — protecție microșoc µA cateter cardiac); paratrăsnet PDA. TGD dublă bară + cuplă; tablouri vital (roșu/GE) / neîntreruptibil (UPS) / normal; cabluri E90/PH90 pe securitate.

## 7. Iluminat (NP 061, SR EN 12464-1)

| Încăpere | Em (lx) | Ra |
|---|---|---|
| Câmp operator (scialitică) | 10.000-100.000 reglabil | ≥95 |
| Sală op. general | 1.000 | ≥90 |
| ATI | 100 repaus / 1.000 examinare | ≥90 |
| Cabinet/examinare | 500/1.000 | ≥90 |
| Laborator | 500 | ≥80 |
| Salon | 100 (+300 lectură) / 5 veghe noapte | ≥80 |
| Coridoare zi/noapte | 200/50 | ≥80 |

LED driver flicker redus, IP54-65 zone umede/aseptice (etanșe lavabile op.), 4.000 K. **Iluminat securitate:** evacuare ≥3h (≤5 s); **continuarea lucrului op./ATI ≥3h (≤0,5 s pe UPS)** — intervenția nu se oprește.

## 8. PSI (P118-2/3)

**Sprinklere** (aglomerări mobilitate redusă, 5 mm/min pe 216 mp, ~30 l/s) pe cea mai mare parte. **EXCEPȚII (apa distruge/pericol):** săli operație (gaz inert IG-55/detecție), RMN (detecție aspirativă + quench), CT/RX/angiograf (gaz FK-5-1-12/IG-55), servere (gaz + VESDA), tablouri (gaz).

**Hidranți:** interiori/nivel 2 jeturi × 2,5 l/s; exteriori 3×5 l/s; **grup pompare** (activă + rezervă Diesel independentă + pilot), pompa electrică pe tablou vital.

**Detecție adresabilă redundantă** (buclă închisă): optice/multisenzor saloane/coridoare, termice bucătărie, **aspirativă VESDA** imagistică/servere/arhivă + butoane + sirene+optic. Integrare: oprire ventilație, desfumare, deblocare acces, ascensoare parter, transmisie ISU. **Evacuare orizontală progresivă** (pacienți imobilizați → compartiment alăturat prin uși EI) + ascensor pompieri + zone refugiu. **Desfumare** case scări (suprapresiune) + coridoare, ventilatoare F400, pe tablou vital.

## 9. Curenți slabi și sisteme medicale

**Nurse call OBLIGATORIU** (Ord. 914): buton la fiecare pat + pară + cordon în băi (pacient căzut); terminal cameră + lampă hol + afișaj nurse station cu prioritizare (normal/urgență/cod albastru); voce bidirecțională ATI; pe tablou vital.

| Sistem | Specific spital |
|---|---|
| Interfon | la sasul bloc operator |
| CCTV | holuri/farmacie/ATI/perimetru (FĂRĂ saloane — GDPR) |
| Control acces | op./ATI/farmacie stupefiante/laborator/servere/gaze; deblocare la alarmă |
| **Rețea date RIS/PACS** | imagistică trafic mare (CT 200-500 MB, RMN ~1 GB) → **backbone fibră ≥10 Gbps redundant inel**, Cat 6A, VLAN medical |
| Ceas-mamă | cronometru săli op. |
| EVAC voce-alarmare | integrat detecție (P118-3) |
| **BMS** | **monitorizare permanentă presiuni cascadă** op./izolare (alarmă la pierdere), HVAC, gaze, energie |

Centru de date propriu (2 camere redundante) răcire + gaz, pe UPS+GE.

## 10. nZEB adaptat spital (fiabilitate + igienă prioritare)

| Măsură | Aplicare | Limită |
|---|---|---|
| Recuperare căldură | obligatorie (debite mari) | glicol în septic (fără transfer aer) |
| Anvelopă (C107) | U perete ≤0,30, ferestre ≤1,3 | fără compromis ventilație |
| **Cogenerare CHP** | recomandată (electric+căldură+ACM tot anul) | gaz, factor utilizare >85% |
| Solar termic | preîncălzire ACM | finisare 60°C pe sursă sigură (Legionella) |
| Fotovoltaic | terasă, consum diurn | nu pe vital |
| LED + DALI | integral | fără senzori în ATI/op. |

Țintă: energie primară nZEB spital (Mc 001), RES ≥30%, recuperare 45-55% septic / 70-85% curat, CHP >85%.

## 11. Concluzii și verificare

Redundanță totală vitale (dublă rețea + GE + UPS; oxigen N+2; N+1 cazane/pompe/compresoare/vacuum; rezervă apă mare); ventilație clase puritate (ISO 5/7/8) + cascade presiune + HEPA; nZEB subordonat fiabilității/igienei.

**Verificare tehnică** (Legea 10/1995, HG 925/1995) verificatori atestați MDLPA: **Is** (sanitare + gaze medicale + apă tratată + canal separat), **It** (termice + ventilare clase puritate), **Ie** (alimentare redundantă + IT medical + iluminat + curenți slabi + paratrăsnet), **Ig** (gaz CT); **C** (incendiu).

**Avize:** **ISU** (incendiu), **DSP** (autorizație sanitară — circuite/ventilație/apă/sterilizare Ord. 914), apă-canal (+ preepurare), energie (dublă MT), gaze, **CNCAN** (medicină nucleară/RX — decădere/ecranare), APM (deșeuri medicale/ape/emisii).

**Probe PIF:** gaze medicale (etanșeitate + **identitate anti-încrucișare** critică + debit + alarme + puritate aer), ventilație zone curate (validare ISO 14644 numărare particule + presiuni cascadă + integritate HEPA DOP), electrice (IT medical izolație + IMD, egalizare ≤0,2 Ω, UPS ≤0,5 s, GE ≤15 s, priză ≤1 Ω), sanitare (dezinfecție + regim 60/70°C), PSI (hidranți/sprinklere + detecție + desfumare + scenariu). Detaliere PT+DDE.
