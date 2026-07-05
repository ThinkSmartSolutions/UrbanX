# MEMORIU TEHNIC DE INSTALAȚII ELECTRICE — STAȚIE 110/20 kV (DTAC)

## 1. Date generale și cadru

Partea centrală (inima): schema monofilară, echipamente primare (110 kV + trafo + 20 kV), protecții, **priză pământ (securitate persoane)**, servicii proprii ca/cc, SCADA IEC 61850, iluminat + PSI.

| Parametru | Valoare |
|---|---|
| Tensiuni | 110/20 kV (Um 123/24) |
| Putere trafo | Sn 25-40 MVA (ex. 40) |
| Neutru 110 / 20 | legat efectiv / tratat (Petersen/rezistor) |

**Normative:** NTE 001/03 (coordonare izolație), NTE 003/007, PE 101/103/104/111/116, **SR EN 61936-1** (>1 kV), **SR EN 50522** (împământare), IEC 62271 (aparataj), IEC 60076 (trafo), IEC 60071, I7-2011.

## 2. Schema electrică

**LEA/LES 110 kV → celulă linie 110 kV** (descărcător MOSA + separatoare + CLP + TT/TC + întreruptor SF₆/vid + separator bară) → **bare 110 kV** (dublă/simplă) → **celulă trafo** → **TRAFO 110/20 kV YNd11 Sn 40 MVA uk ~12% + OLTC + Buchholz** → **celulă trafo 20 kV** → **bare 20 kV** (celule metalice interior) → **plecări MT** (întreruptor + TC/TT + protecții + măsură) → distribuție. Servicii proprii: trafo 20/0,4 kV + tablou ca + cc (baterie + redresor) + UPS.

## 3. Breviar de calcul

**Curenți nominali (IEC 60076):** In,110 = Sn/(√3·Un) = 40M/(√3·110k) = **210 A**; In,20 = 40M/(√3·20k) = **1.155 A** → echipamente 1.250 A. **Scurtcircuit prin trafo (uk 12%):** Isc,20 = In,20/(uk/100) = 1.155/0,12 = **9,6 kA**; Ssc,20 = Sn/uk = 40/0,12 = **333 MVA** → celule MT dimensionate **12,5 kA** (IEC 62271). **110 kV** (Ssc,SEN ~3.000 MVA): Isc,110 = Ssc/(√3·Un) = **15,7 kA** → aparataj ≥25 kA/1s.

**Bare (PE 103/SR EN 60865):** termic S ≥ Ith·√tk/k; Isc 12,5 kA, tk 1s, k 143 → **S_min 87 mm² → ales ≥240 mm²** (curent nominal + termic). Electrodinamic F = (μ0/2π)·(i_vârf²/a)·l, i_vârf = κ√2·Isc (κ 1,8) → verificare izolatoare-suport (+ seism §structura).

**Coordonare izolație (NTE 001/IEC 62271):** 110 kV Um 123 BIL **550 kV** (d aer ~1,10 m); 20 kV Um 24 BIL **125 kV** (d ~0,22 m) → gabarite portale. **Descărcătoare MOSA** lângă trafo, Ures <BIL, marjă Kp ≥1,15-1,25.

## 4. Protecții (PE 111, IEC 60255)

| Cod | Funcție |
|---|---|
| **87T** | diferențială trafo (bază, defect intern instantaneu) |
| 50/51 | maximală curent (scurtcircuit/suprasarcină) |
| 50N/51N/64 | homopolară (defect pământ) + cuvă/masă trafo |
| 21 | distanță (linii 110 kV) |
| 27/59 | min./max. tensiune |
| 81 U/O | min./max. frecvență (delestaj/decuplare) |
| Buchholz 63 + 26/49 | gaze/presiune + temperatură trafo |

Relee numerice + redundanță (principală + rezervă trafo), alimentate din cc.

## 5. Priză de pământ (SR EN 50522 — CRITIC securitate)

**Rețea grilă** (platbandă Cu/OL-Zn −0,7-0,8 m, ochiuri 3-7 m) + electrozi verticali perimetru, leagă toate masele/neutre/ecrane/paratrăsnete → limitare **tensiuni atingere U_a + pas U_p**. **Curent dimensionare:** I_E = r·Ik1·(1−r_ecran); ex. I_E 5 kA, tf 0,5s. **Rezistență (Sverak/Laurent):** R_E = ρ[1/L_T + 1/√(20A)·(1+1/(1+h√(20/A)))] → **R_E <1 Ω** stații IT. **Tensiuni:** U_atingere = ρ·Km·Ki·I_E/L_M; U_pas = ρ·Ks·Ki·I_E/L_S. **Verificare securitate:** U_atingere ≤ **U_Tp,adm(tf)** (SR EN 50522, corp uman):

| tf | U_Tp adm |
|---|---|
| 0,1 s | ~785 V |
| 0,2 s | ~555 V |
| 0,5 s | ~220 V |
| ≥1,0 s | ~117 V |

**Coordonare cu protecțiile:** protecții rapide (87T instant, 50) → tf mic → U_Tp,adm crește (parte din strategia securitate). Reducere dacă depășire: strat pietriș (ρ_s mare ridică pragul) + îndesire grilă (Km/Ks) + electrozi + tratare sol. Paratrăsnete + MOSA legate la aceeași priză.

## 6. Servicii proprii (I7/PE 111)

**Ca 0,4 kV:** trafo servicii 20/0,4 kV (100-250 kVA) + TGSP + **alimentare dublă bară secționată + AAR** (iluminat, prize, ventilație, încălzire anticondens celule, OLTC, redresoare). **Cc (110/220 Vcc):** **baterie acumulatori** (Ni-Cd/plumb, autonomie 8-10 h) pt protecții/comandă/semnalizări/iluminat siguranță + **redresor/încărcător dublu tampon** + **UPS** SCADA. C_baterie = Σ(Ii·ti)/(k_desc·k_temp) pe profilul cel mai defavorabil.

## 7. Comandă-control (IEC 61850)

Sistem numeric pe **nivel proces / travee (IED protecție-comandă) / stație** (calculator + HMI), magistrale IEC 61850 (GOOSE interblocaje + MMS raportare); **SCADA + telecomandă dispecer (DEC/DEN)**; sincronizare GPS/PTP IEEE 1588; interblocaje (nu separator sub sarcină, secvență întreruptor-separator).

## 8. Iluminat + PSI

Iluminat interior + siguranță (cc/UPS) + exterior platformă (proiectoare portale). **PSI trafo ulei (risc major):** detecție (Buchholz + temperatură + incendiu) + stingere (apă pulverizată/N₂/CO₂ trafo mari) + separare (pereți antifoc/distanțe) + **cuvă retenție etanșă + pietriș stingător → separator ulei-apă**; coordonare P118 + PE 009.

## 9. Racordare SEN

Nod 110 kV (ATR + fișă soluție OTS/OD); Cod RET/RED: nivel scurtcircuit + reglaj tensiune (OLTC) + regim neutru (110 legat efectiv / 20 tratat) + calitate energie + protecție selectivă coordonată amonte.

## 10. Concluzii + verificare Ie

| Mărime | Valoare |
|---|---|
| In 110 / 20 | 210 / 1.155 A |
| Isc 20 / 110 | 9,6 (→12,5) / 15,7 (→≥25) kA |
| Ssc 20 | 333 MVA |
| S_min bară | 87 (→≥240) mm² |
| BIL 110 / 20 | 550 / 125 kV |
| Priză | U_atingere ≤ U_Tp,adm(tf) |

Schema asigură transformare/comutație/măsură/protecție (NTE/PE/SR EN 61936-1). Echipamente dimensionate la In + Isc cu marje standardizare. Coordonare izolație (BIL + MOSA) protejează trafo. **Verificarea esențială securitate = priza de pământ (SR EN 50522)** — U_atingere/U_pas admisibile legate de timpul deconectare protecții (87T/50 rapide → prag ridicat). Servicii proprii ca/cc redundante (AAR + baterie + UPS) → protecții funcționale în avarie. Coordonat cu rezistența (gabarite portale din distanțe izolație, priză comună, cuvă mediu+PSI). **Verificare Ie** verificator atestat + coordonare OTS (ATR). Detaliere scheme monofilare + dimensionare protecții la PT.
