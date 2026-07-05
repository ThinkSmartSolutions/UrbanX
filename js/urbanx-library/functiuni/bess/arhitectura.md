# MEMORIU DE ARHITECTURĂ / AMENAJARE — BESS (DTAC)

## 1. Concept de amenajare

Platformă tehnică zonificată BESS 25 MW/50 MWh (10 containere LFP), 3 imperative: **siguranța la foc** (distanțe anti-propagare validate UL 9540A), **accesibilitate intervenție** (autospeciale ISU ≥2 laturi), **flux tehnologic** (baterii→PCS→trafo→racord). Construcții joase (parter tehnic), POT/CUT reduse, dominat de circulații + distanțe protecție + perimetru vegetal. Categoria C, clasa III (γI 1,0), risc MARE.

## 2. Amplasarea containerelor — layout și distanțe

**10 containere ISO 20'** (6,06×2,44 m, H 2,90) în **2 rânduri × 5**, uși spre culoare intervenție.

| Distanță | Adoptat | Bază |
|---|---|---|
| **Container ↔ container** | **≥3,0 m** (NFPA 855) sau UL 9540A | NFPA 855 §4.1 |
| Container ↔ limită proprietate | ≥6,0 m (flux termic radiant UL 9540A) | NFPA 855/P118 |
| Container ↔ clădire ocupată (EMS) | ≥6,0-10,0 m | NFPA 855 |
| Container ↔ drum public | ≥3,0 m | P118/RLU |
| **Culoar intervenție între rânduri** | **≥6,0 m** (gabarit autospecială) | Ord. MAI 129/2016 |
| PCS/trafo ↔ container baterii | ≥3,0 m | NFPA 855 |

**Regula cheie:** min. **3 m** NFPA 855 în lipsa testului; **UL 9540A** poate justifica alte distanțe (doar cu demonstrarea non-propagării flux termic + gaze venting). Adoptat conservativ **3,0 m lateral + 6,0 m culoar** până la validarea raport UL 9540A la PTh.

**Layout:** rând A (BAT1-5, 3 m între) — culoar 6 m — rând B (BAT6-10); zona PCS+trafo (≥3 m de baterii); cabină EMS + stație racord; bazin retenție ape stingere + rezervă incendiu; drum acces → poartă → drum perimetral inelar.

## 3. Platforme betonate suport

Fiecare container pe **platformă/fundație b.a.** pentru: gravitațional container plin (30-35 t), **ancoraj seismic** (buloane chimice ~114 kN), planeitate + drenaj (pantă ≥1%). Alcătuire: placă b.a. C25/30 20-30 cm + balast compactat (Ev2 ≥80 MPa) + hidroizolație + borduri dirijare ape spre bazin retenție. Culoarele/platforma intervenție betonate (portanță autospeciale).

## 4. Drumuri acces + platformă intervenție pompieri

**Acces ISU (Ord. MAI 129/2016, P118-1):** autospeciale pe **≥2 laturi**; **gabarit** lățime liberă ≥3,8 m (rec. ≥6 manevră), înălțime ≥4,2, rază viraj ≥12 m; **portanță** osie ≥10 t / masă ≥26 t; platformă întoarcere 12×12 sau buclă. **Drum perimetral inelar** (ocolire completă — atac din orice direcție) + culoare 6 m între rânduri; îmbrăcăminte beton/asfalt pe balast. **Hidranți exteriori** (P118-2) din rezervă proprie + grup pompare, debit pt **răcire exterioară (drencer)** containere pe durata intervenției.

## 5. Împrejmuire, protecție, CCTV

Împrejmuire securitate **H ≥2,0 m** (panouri rigide) + poartă carosabilă+pietonală; **zonă protecție** (retragere gard-containere = distanță siguranță limită + circulație perimetrală); **CCTV** perimetral (vedere nocturnă/termică — util detecție puncte calde) + iluminat siguranță + antiefracție/control acces.

## 6. Cabină comandă EMS

Container/cabină modulară la ≥6 m de baterii; **EMS + SCADA** + tablouri comandă + comunicații fibră + post operare; HVAC propriu + detecție + ieșire evacuare; grup social minim (instalație nemanată în regim normal, operată de la distanță).

## 7. Ventilație, răcire, management termic

**HVAC dedicat/container** menține celulele 15-35°C (ideal ~25) — performanță + viață + **prevenire thermal runaway**. **Necesar răcire:** Q_termic = P·(1−√η_RT); √0,87 ≈ 0,933 → pierdere pe o direcție ~6,7%; la 25 MW → **P_pierderi ~1,67 MW** total → **~167 kW/container** → Q_HVAC ≥ ×1,2 = **~200 kW frig/container**. Debit aer (dacă aer, ΔT 10 K): V̇ = Q/(ρ·cp·ΔT) = 200.000/(1,2·1005·10) ≈ **16,6 m³/s (~60.000 mc/h)** — orientativ; **răcire lichidă (liquid cooling)** frecvent preferată (debit agent mic, eficiență mare). **Ventilație deflagrație** independentă (panouri suprapresiune NFPA 855/68-69, evacuare gaze venting, previne atmosferă explozivă).

## 8. Zonare funcțională

| Zonă | Conținut | Separare |
|---|---|---|
| Baterii | 10 containere LFP | nucleu risc — 3 m + EI 120 |
| Conversie PCS | invertoare bidirecționale | ≥3 m de baterii |
| Transformare/racord | trafo MT + stație + celule | ≥3 m + separare foc |
| Comandă | cabină EMS/SCADA | ≥6 m (ocupat personal) |
| Utilități/incendiu | rezervă apă + pompare + bazin | periferic |

Separarea limitează propagarea + facilitează izolarea (secționare electrică, oprire BMS/EMS).

## 9. Integrare peisagistică

Perdea vegetală perimetrală (arbori/arbuști/gard viu esențe locale — mascare + fonic + barieră); ≥20% verzi (perimetral, **NU în distanțele antifoc dintre containere**); ape pluviale prin spații permeabile; cromatică sobră containere/cabine.

## 10. Dezafectare și reciclare baterii

La ≥15 ani/>6.000 cicluri: **descărcare controlată** (SoC transport, BMS) + demontare module/rack + **predare reciclare autorizată** (Li/Fe/Cu/Al — Dir. 2006/66 + OUG 5/2015 + Reg. UE 2023/1542) + opțional **second-life** + readucere teren (platforme reutilizabile/reciclare agregate) + plan management deșeuri periculoase (electrolit).

## 11. Formule și indicatori

**Densitate energetică:** d_E = E/S_teren = 50.000/13.000 ≈ **3,85 kWh/mp** (pe amprentă containere 148 mp → ~338 kWh/mp — suprafața dominată de distanțe siguranță). **Distanță siguranță:** D_min = max(3,0 m; D_UL9540A) unde D rezultă din flux termic radiant q" < prag aprindere (~12,5-20 kW/mp). **POT ≈ 2.000/13.000 = 15,4%; CUT ≈ 0,15** (parter tehnic). **Q_HVAC/container ≈ 200 kW** (§7).

## 12. Concluzii (6 cerințe)

**A** rezistență (platforme b.a. + containere ancorate seismic clasa III, fundații 35 t/container); **B** incendiu (distanțe ≥3 m NFPA 855/UL 9540A + EI 120 + detecție/stingere/venting + acces ISU 2 laturi + drum inelar + hidranți — **risc mare tratat integral**); **C** igienă/mediu (bazin retenție ape stingere + reciclare baterii + EIA); **D** siguranță/accesibilitate (circulații gabarit autospecială + service + CCTV + operare distanță); **E** zgomot (extravilan + perdea + HVAC/trafo <limite); **F** energie (management termic eficient + η ≥85% + integrare FV). Detaliere PTh (dimensionări platforme + distanțe validate UL 9540A + scenariu securitate), **avizare ISU precondiție critică**. Semnat arhitect + verificator A/B/Cc/Ci.
