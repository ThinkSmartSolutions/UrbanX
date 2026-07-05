# MEMORIU DE ARHITECTURĂ / AMENAJARE PLATFORMĂ — STAȚIE 110/20 kV (DTAC)

## 1. Obiect

Amenajarea platformei stației 110/20 kV + soluții arhitecturale: clădire comandă, cuve retenție ulei, drumuri/platforme montaj, împrejmuire securizată, organizare funcțională vs. distanțe izolație aer + rețea împământare. Zonă tehnică/industrială — arhitectura subordonată funcțiunii energetice.

## 2. Amenajarea platformei — layout

**3 zone liniare (flux 110→trafo→20 kV):**

| Zonă | Conținut | % platformă |
|---|---|---|
| **110 kV AIS exterior** | portaluri LEA + celule linie/trafo + cadre + aparataj | 40-50% |
| **Transformatoare** | 2 boxe trafo + cuve retenție + pereți antifoc + cale montaj | 15-20% |
| **20 kV + comandă** | clădire (celule MT + comandă/SCADA + servicii + baterii + GS) | 250-400 mp |

Platforma 110 kV **balastată/pietruită** (drenaj + acces prize pământ + strat piatră spartă limitează tensiuni pas SR EN 50522); căi + platformă montaj trafo **betonate** (transport greu); cotă +15-20 cm peste teren + pante ≥0,5% spre rigole/separator. **Bilanț ex.:** teren 10.000, platformă 110 kV 4.500, trafo 1.200, clădire 320, drumuri 1.800, verzi 2.180 → **POT ~3,2%**.

## 3. Cuva de retenție ulei

Sub fiecare trafo — **cuvă etanșă b.a. impermeabilizat, reține 100% ulei** + stinge/limitează incendiu. Componente: (1) bazin etanș; (2) **grătar + pietriș** superior (fragmentează/stinge ulei aprins prin răcire); (3) colector; (4) conductă → **separator ulei-apă (deuleiator)**; (5) cămin + vană izolare.

**Dimensionare: V_cuvă = V_ulei,max + V_apă = 1,00·V_ulei,trafo_max + k·V_ulei,max** (k ~0,10). **Ex. trafo 25 MVA:** V_ulei 22 mc + 2,2 → **V_cuvă ≥25 mc**. A_cuvă = (L_trafo+2a)(l_trafo+2a); trafo 6,0×4,0 + gardă 0,75 → 7,5×5,5 = 41,25 mp; **h_util = 25/41,25 ≈ 0,61 → adoptat 0,70 m** + pietriș ≥0,25 m (stone bed). **Separator SR EN 858** (ieșire ≤5 mg/l); ulei = deșeu periculos 13 03*.

## 4. Drumuri + platformă montaj trafo

Transport trafo 40-70 t → **portanță mare** + raze curbură trailer agabaritic; drum interior lățime ≥**4,0 m**, rază ≥12 m; platformă montaj betonată/trafo. **Structură rutieră:** beton BcR/dale 22-25 + balast stabilizat 30-40 + strat formă balast 20-30; dimensionare osie >115 kN (PD 177/NP 081). Poartă carosabilă ≥5,0 m (agabaritic) + pietonală + alveolă manevră.

## 5. Împrejmuire securizată + securitate

Gard metalic/beton **H ≥2,20 m** + extensie sârmă; **zonă protecție interioară** ≥1,0-2,0 m (distanțe siguranță + acces mentenanță); porți securitate. **CCTV** perimetral + zone critice (trafo/comandă) + **antiefracție** (bariere IR/microunde + contacte) + **control acces** (cartelă/cod) + iluminat securitate (c.c./GS). Aparataj 110 kV la distanțe minime față de gard/limită (PE 101A, SR EN 61936-1).

## 6. Clădirea de comandă

| Încăpere | Cerințe |
|---|---|
| Comandă/protecții + SCADA | climatizare, pardoseală tehnică, EMC |
| Celule MT 20 kV | ventilație, culoar manevră/evacuare, uși EI |
| **Baterii cc** | **ventilație forțată (H₂)**, pardoseală antiacid, iluminat ex |
| Servicii proprii ca | ventilație |
| Grup electrogen | insonorizare + evacuare gaze + cuvă motorină |
| GS + vestiar / coridor | lățime ≥1,20, EI |

Structură cadre b.a./zidărie confinată, **grad II RF** (separări EI 90/120 baterii + celule MT), fundații (geotehnic), **clasa seismică II γI 1,2** (P100), finisaje industriale + pardoseli tehnice antistatice. Instalații: climatizare + ventilație antiex baterii + detecție (P118-3) + electric ca/cc + iluminat normal+siguranță.

## 7. Distanțe de izolație în aer (clearances 110 kV)

Izolația = aer atmosferic; distanțe funcție de **BIL** (SR EN 61936-1, NTE 007, PE 104). **110 kV (Um 123, BIL 550):**

| Distanță | Valoare |
|---|---|
| Fază-pământ / fază-fază (N) | ≈1.100 mm |
| Siguranță circulație orizontală (N+900) | ≈2.000 mm |
| Siguranță verticală (N+2250) | ≈3.350 mm |
| Înălțime părți sub tensiune deasupra sol | ≥3,35-4,5 m (uzual 4,5) |

**d_aer ≈ k_aer·U_ținere,imp** (k ~1,9-2,1 mm/kV impuls); BIL 550 × 2,0 ≈ **1.100 mm**. Coordonare izolație NTE 001/IEC 60071.

## 8. Prize de pământ — rețea generală (SR EN 50522)

**Grilă/priză** care leagă toate masele + neutre + paratrăsnete, dublu rol: **protecție** (limitare tensiuni atingere U_a + pas U_p sub admisibil) + **funcțional** (întoarcere curent defect). U_E = R_E·I_E; **stratul de piatră spartă** (ρ_s ridicat) crește tensiunea admisibilă. R_E ≤1-4 Ω (verificat PE 116). Grilă orizontală OL-Zn/Cu −0,7-0,8 m (ochiuri 5×5/10×10) + electrozi verticali + coborâri + măsurare U_atingere/U_pas la PIF + periodic.

## 9. Gabarite montaj, integrare, dezafectare

Spații libere mentenanță în jurul aparatelor + gabarite ridicare macara (trafo/portaluri) + înălțimi manevră sub coborâri LEA (clearance §7). Integrare: ecrane/plantații perimetrale (vizual+acustic, fără culoar siguranță) + finisaje neutre + iluminat spre interior. **Dezafectare:** decontaminare ulei (13 03*, verificare PCB) + recuperare SF₆ (dacă GIS) + refacere sol sub cuve + reciclare metale/beton.

## 10. Concluzii (6 cerințe)

**A** rezistență (structuri clasa II γI 1,2 + portanță drum trafo); **B** incendiu (grad II RF + EI baterii/celule + cuvă cu pietriș stingere + P118/ISU); **C** igienă/mediu (cuvă 100% ulei + separator + zgomot <Ord. MS 119 + CEM <limite + ventilație antiex baterii); **D** siguranță/accesibilitate (distanțe izolație aer + siguranță personal SR EN 61936-1/PE 101A + priză SR EN 50522 U_atingere/U_pas + gabarite mentenanță + gard/CCTV); **E** zgomot (trafo controlat + ecrane + GS insonorizat); **F** energie (reducere pierderi + trafo ecodesign + AIS fără SF₆ + iluminat eficient). Cuvă ≥25 mc + distanțe izolație ~1,1 m + priză R_E ≤1-4 Ω. Apt AC sub rezerva avize + verificatori. Semnat arhitect + verificator.
