# MEMORIU DE ARHITECTURĂ / AMENAJAREA TERENULUI — CEF (DTAC)

## 1. Obiect și principii

Amenajarea terenului CEF 8,0 MWp: organizarea câmpului de module, structuri montaj, posturi/stații, drumuri, împrejmuire, clădire pază, integrare peisagistică, dezafectare. Principii: maximizare producție (orientare/înclinare optimă, minim umbrire), utilizare eficientă teren (GCR), **reversibilitate** (piloți, fără beton masiv), accesibilitate mentenanță, integrare peisagistică.

## 2. Organizarea câmpului fotovoltaic

**Orientare Sud** (azimut 180°). **Unghi optim: β_opt ≈ φ − (5-10°)**; pentru RO (φ 44-48°) → β ≈ 30-35°; **adoptat β = 32°** (echilibru producție/vânt/pitch). (φ 44° → 34°, 46° → 32°, 48° → 30°.)

**Distanța între rânduri (pitch) anti-umbrire** — condiția critică = solstițiu iarnă. **Altitudine solară amiază: α_s = 90° − φ − 23,45°** (φ 46° → 20,55°). Înălțime rând h = d_modul·sin β; umbra D_umbra = h·cos(γ_s)/tan(α_s). **D_pitch = d_modul·cos β + h·cos(γ_s)/tan(α_s)**.

**Exemplu** (mesă 2V, d_modul 4,3 m, β 32°): h = 4,3·sin32 = **2,28 m**; bază = 4,3·cos32 = **3,65 m**; umbra la α_s 20,55° = 2,28/tan20,55 = **6,08 m** → **D_pitch ≈ 9,7 m**. Practic optimizat 7,5-9,7 m (criteriu economic la ora 9/15).

**GCR = d_modul/D_pitch** = 4,3/9,7 = **0,44** (adoptat 0,40-0,44, umbrire <1-2%/an).

| Pitch (m) | GCR | Umbrire |
|---|---|---|
| 12,0 | 0,36 | minimă |
| 9,7 | 0,44 | <1% |
| 8,6 | 0,50 | 1-2% |
| 7,0 | 0,61 | >3% |

**Nr. rânduri: N = (L_teren − bază)/D_pitch + 1**; teren adâncime util ~350 m → ~36 rânduri; ~264 mese (2V×~28 = 56 module/masă).

## 3. Structuri de montaj

Ramă metalică fixă (mese 2V portret), oțel zincat la cald/aluminiu; **fundare piloți bătuți (ram-piles) profil C/U zincat 1,5-2,0 m** sau șuruburi de fundare — **fără beton (reversibil, extractibil la dezafectare)**; gardă la sol ≥0,6-0,8 m (vegetație/mentenanță); verificare vânt (CR 1-1-4 determinant) + seismic (P100 III). Smulgere pe piloți dimensionează adâncimea.

## 4. Posturi, stații, platforme

Stații invertoare (skid distribuit pe platforme pietruite/dale, acces drum tehnologic, anvelopă ventilată); PT 0,8/20 kV (anvelopă prefabricată pe platformă betonată punctual + celule MT + transformator **cuvă retenție ulei**); platforme tehnice pietruite (acces vehicul intervenție). PT amplasat aproape de racord LES (minim traseu MT + pierderi).

## 5. Drumuri și circulații

Drum acces din DC/DJ (lățime 4-5 m, pietruit); drumuri tehnologice interioare 4,0 m (buclă perimetrală + culoare stații, rază viraj intervenție/ISU); poartă carosabilă ≥4,0 m + pietonal. Dimensionate pentru mentenanță + autospeciale ISU.

## 6. Împrejmuire și zonă protecție

Gard perimetral panouri/plasă zincată **h 2,0 m** pe stâlpi metalici; **bandă liberă ≥3,0-5,0 m** între gard și primul rând (mentenanță + culoar CCTV); poartă glisantă + acces pietonal; gard retras **≥5,0 m** de la limite (perdea vegetală).

## 7. Clădirea de comandă/pază

Birou SCADA + pază + GS, ~20-30 mp, parter, modulară/container sau zidărie ușoară incombustibilă grad II RF; post SCADA + tablou servicii proprii + GS (fosă/branșament); anvelopă termică conform Legea 372/2005.

## 8. Integrare peisagistică și vegetație

Perdea vegetală perimetrală (arbuști/arbori talie mică pe banda retragere ≥5 m, specii autohtone); gazon/pajiște sub și între panouri (amestec ierbos + specii melifere); **management: cosire mecanică sau pășunat controlat (ovine)** — evită erbicide, menține covor sub gardă; verificare glare (sticlă antireflex) la receptori sensibili.

## 9. Bilanț teritorial

| Categorie | ha | % |
|---|---|---|
| Teren total | 14,0 | 100 |
| Proiecție module (câmp) | ~5,6 | ~40 (GCR 0,40) |
| Drumuri + platforme | ~0,7 | ~5 |
| Posturi/stații | ~0,1 | ~1 |
| Clădire pază + amenajări | ~0,05 | ~0,3 |
| Perdea vegetală + protecție + liber | ~7,55 | ~53,7 |
| **Permeabil (neimpermeabilizat)** | **~13,2** | **~94** |

Câmpul FV pe piloți NU impermeabilizează; impermeabilizat efectiv (platforme/PT/clădire) <6%.

## 10. Accesibilitate mentenanță

Culoare (drumuri tehnologice) la fiecare bloc mese + stație; pitch permite acces personal/curățare; gardă ≥0,6 m + acces între rânduri → curățare + termografie + înlocuire componente.

## 11. Dezafectare

La ~30 ani/încetare: demontare module → reciclare (DEEE 2012/19/UE + OUG 5/2015); **extragere piloți** (reversibil); demolare platforme/PT + reciclare metale; refacere sol vegetal → **categoria agricolă inițială**; plan dezafectare + garanție financiară la autorizare.

## 12. Formule de sinteză

| Mărime | Formulă |
|---|---|
| Unghi optim | β ≈ φ − (5-10°) |
| Altitudine solară iarnă | α_s = 90° − φ − 23,45° |
| Înălțime rând | h = d_modul·sin β |
| Pitch anti-umbrire | D = d·cos β + h·cos(γ_s)/tan(α_s) |
| GCR | d_modul/D_pitch |
| Nr. rânduri | (L_teren − bază)/D + 1 |
| Producție | E = P_DC·PSH_POA·PR |
| CO₂ evitat | E·f_emisie_SEN |

## 13. Concluzii (6 cerințe)

Amenajare CEF 8,0 MWp: **A** rezistență (structuri verificate vânt CR 1-1-4 + seism P100 clasa III, piloți smulgere); **B** incendiu (containere/PT incombustibile I-II RF, arc DC, scenariu, acces autospeciale); **C** igienă/mediu (impact redus, sol permeabil, biodiversitate, reciclare DEEE); **D** siguranță/accesibilitate (drumuri tehnologice, mentenanță, gard+CCTV, gardă sol); **E** zgomot (invertoare/trafo în limite Ord. 119/2014); **F** energie (obiectivul produce ~10.400 MWh/an curat; clădire pază L372/2005). Respectă cadrul + PUZ + reversibilitate + integrare peisagistică. Semnat arhitect (L10/1995 + L184/2001).
