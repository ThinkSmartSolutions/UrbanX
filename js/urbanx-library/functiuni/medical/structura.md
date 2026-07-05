## 1. Date generale

Memoriu de rezistență DTAC pentru **unitate medicală (spital/clinică) cu bloc operator, ATI și imagistică, S+P+4E**, beton armat sistem dual (cadre + pereți structurali).

| Element | Valoare |
|---|---|
| Ac/nivel / Ad | ~1.000 / ~6.000 mp |
| H liber curent / subsol | 3,60 (net 3,00 + tehnic 0,60) / 3,80 m |
| Cotă fund radier | −4,25 m; h_tot ~22,80 m |
| Sistem | dual b.a. monolit C30/37-C35/45 |
| **Clasa importanță** | **I (γI,e = 1,40)**, cat. **B** |
| Consecințe | **CC3** |

**Amplasament (ipoteză zonă seismică ridicată):** ag 0,30g, Tc 1,6s (Vrancea), TB 0,32/TD 2,0, teren mediu (C).

**Normative:** Legea 10/1995, CR 0/2012, **P100-1/2013**, CR 1-1-3/1-1-4, SR EN 1992 + NE 012, SR EN 1998, NP 112/2014, SR EN 1997, **NP 015-1997**, NP 074/2014 (cat. geo 3), NP 124-2010.

## 2-3. Clasa de importanță I — implicațiile γI,e = 1,40

Spitale cu ATI + săli operație → **clasa I** (cea mai severă), Fb,I = 1,40·Fb,cl.III (+40%); echivalent IMR ~1.500-2.500 ani.

**Trei niveluri de performanță:** (1) **SLS/limitarea degradărilor** — funcționare continuă, degradări nesemnificative structural + nestructural (adesea DETERMINANT la spital); (2) ULS/siguranța vieții (marjă +40%); (3) prevenirea colapsului. **Consecință: SLS guvernează** (drift limitat — echipamentele CT/RMN/gaze medicale/ventilație presiune nu ies din funcțiune).

**Verificări suplimentare:** componente nestructurale + instalații (cap. 10, γCf sporit, ancorare seismică echipamente grele), rosturi seismice (anti-pounding), redundanță, control calitate nivel III.

**Opțiunea IZOLARE SEISMICĂ DE BAZĂ** (P100 cap. 11, recomandată la ag ≥0,25-0,30g): izolatori LRB/FPS între infra și suprastructură → T_iso 2,5-3,5 s (de la 0,6-0,8), forțe ÷3-5×, drift <0,1% h (echipamente operaționale).

| Soluție | T1 | Sd/g | Fb rel. | Drift |
|---|---|---|---|---|
| Bază fixă dual clasa I | 0,70 | 0,175 | 100% | 0,5-0,7% |
| **Bază izolată LRB** | 3,00 | 0,045 | **25-30%** | <0,1% |

*Atenție: la Tc mare (Vrancea) beneficiul izolării e mai redus (perioada alungită poate cădea tot pe palier) — verificare spectrală specifică.* **Adoptat conservator: bază fixă + sistem dual rigid** cu drift sever controlat; izolarea = optimizare.

## 4. Sistemul structural — dual (pereți predominanți)

Sistem dual b.a. monolit (pereți predominanți): rigiditate mare → drift redus (echipamente + funcționare postseism), flexibilitate cadre (compartimentări medicale reconfigurabile NP 015), redundanță. **Pereți preiau ~72% > 50% → dual cu pereți predominanți.**

| Element | Descriere |
|---|---|
| Tramă | 7,20×7,20 (8,10 la săli operație) |
| Stâlpi | 60×60 curent / 70×70 subsol-P |
| Pereți/diafragme | 30 cm curent / 40 subsol, simetric + nuclee |
| Nuclee | 2 (scări+lifturi pat), tuburi închise |
| Grinzi | principale 30×65, secundare 25×55 |
| Planșeu | placă 15 cm + grinzi (diafragmă rigidă) |

Pereți/nuclee continue radier→ultim nivel (fără soft-storey).

## 5. Regularitate și factor q

Regulat plan (compact dublu simetric, e0 ≤0,30r, r>ls, λ = 42/24 = 1,75<4) + vertical (continuu) → nepenalizat. **q = q0·kw = 3,0·1,25·1,0 = 3,75 → adoptat conservator q = 3,50** (redus intenționat pt. clasa I, structură cvasi-elastică; DCH ar da 4,4-5,0).

## 6. Planșee + vibrații imagistică

| Zonă | Tip | Grosime | Deschidere |
|---|---|---|---|
| Saloane | placă pe grinzi | 15 cm | 7,20 |
| Bloc operator | placă grinzi dese | 18 cm | 8,10 |
| Imagistică CT/RMN | dală groasă/radier local | 25-30 cm | 7,20 |

**Vibrații RMN (criteriu VC — viteză RMS pe 1/3 octavă):** VC-A 50 / VC-B 25 / **VC-C 12,5 (RMN uzual) / VC-D 6,3 (înaltă rezoluție)** / VC-E 3,1 µm/s. Cerință zonă RMN **VC-C÷VC-D**. Frecvență proprie placă **f_n ≥ 8 Hz** (rec. ≥10): f_n = 18/√δ = 18/√2,1 ≈ **12,4 Hz > 8** ✓. Măsuri: dală 25-30 cm + **dală flotantă pe amortizoare** (decuplată); RMN preferabil subsol/parter. **Săgeți:** δ/L ≤ 1/250 (28,8 mm), calc ~19 < 28,8 ✓; ≤1/500 sub echipamente.

## 7. Acțiuni

**Permanente:** placă 15 (3,75) + finisaje medicale (1,50) + tavane+HVAC dens (1,20) + pereți reconfigurabili (1,50) = **7,95 kN/mp**; terasă 6,50.

**Utile spital:** saloane/cabinete 2,00; coridoare 4,00; aglomerate (așteptare/hol) 5,00; săli operație/ATI 4,00 + concentrate; arhive/farmacie 6,00-7,50; tehnice 7,50; scări 4,00; zăpadă sk 1,60.

**Echipamente grele concentrate:** CT 2-3 t (20-30 kN, dinamic gantry); **RMN 5-7 t** (50-70 kN) + ecranare +2-4 t + cușcă Faraday; angiograf 2,5-4 t (+ braț C **suspendat de planșeu superior** — verificare pull-out); accelerator liniar >8 t (radier propriu). Toate **ancorate seismic** (cap. 10).

**Grupări (CR 0):** SLU 1,35G + 1,5Qk,1 + 1,5ψ0Qk; **seismic G + 1,40·AEk + ψ2Qk** (ψ2 0,4 aglomerate / 0,3 curent).

## 8. Analiza seismică

Model 3D EF (bare cadre + shell pereți/planșee), încastrat la radier, modal cu spectre.

**Masă:** m_nivel = (7,95 + 0,4·3,0)·1000/9,81 ≈ 933 t; **M_tot ~5.400 t (~53.000 kN)**. **T1** empiric 0,05·22,8^0,75 ≈ 0,52; modal ~**0,70 s** (TB<T1<TC → β = β0 = 2,5). **Sd(T1) = 0,30g·2,5/3,50 = 0,214g**.

**Fb = γI,e·Sd·m·λ = 1,40·0,214·53.000·0,85 ≈ 13.500 kN** (c = **0,255**).

| Clasă | γI,e | Fb (kN) | Raport |
|---|---|---|---|
| III | 1,00 | 9.640 | 1,00 |
| II | 1,20 | 11.570 | 1,20 |
| **I spital** | **1,40** | **13.500** | **1,40** |

Distribuție triunghiulară (terasă 3.520 → subsol 663 kN); mase modale ≥90% (min. 12 moduri).

## 9. Drift — SLS/ULS clasa I

**SLS (limitarea degradărilor — DETERMINANT):** d_r,SLS = ν·q·d_r,e (ν 0,5); limită componente fixate rigid **≤ 0,005h = 18,0 mm** (h 3,60). Max nivel E2: 0,5·3,5·5,0 = **8,8 mm (0,24% h) < 18** ✓ (marjă mare → funcționare postseism). **ULS:** d_r,ULS = q·d_r,e ≤ 0,025h = 90 mm; max 17,5 << 90 ✓ (cvasi-elastic). **P-Δ:** θ = 53.000·0,0175/(13.500·3,6) = **0,019 < 0,10** neglijabil.

## 10. Verificarea elementelor (marjă clasa I)

**Pereți** (30 cm × 6,0, nucleu): N_Ed 8.500, M_Ed 21.000 kNm; νd = 8.500·10³/(300·6000·20) = **0,236 < 0,40** ✓; forfecare cu suprarezistență. **Stâlpi 60×60 C35/45:** N_Ed 4.200, νd = 4.200·10³/(600·600·23,3) = **0,50 < 0,55** ✓, ρ 1,8%; **grindă slabă/stâlp puternic ΣM_Rc ≥ 1,3·ΣM_Rb** ✓. **Grinzi 30×65 C30/37:** M_Ed 420 → As = 420·10⁶/(0,9·610·435) = 1.760 → **6Ø20 (1.885)**. **Planșeu-diafragmă:** colectori + conexiuni placă-perete.

## 11. Infrastructura — radier + fundații antivibratile

**Radier general** (uniformizare tasări echipamente grele + rigidizare + cuvă etanșă): grosime 90 cm (120-150 sub pereți/nuclee), C30/37 XC2/XA1; p_ef ~220 kPa < p_pl 280 ✓; plase Ø20/15 sus/jos + armătură străpungere. **Străpungere** stâlp 70×70 V_Ed 4.200, d 82, β 1,15 → armătură unde v_Ed>v_Rd,c.

**Fundație antivibratilă RMN:** (a) **masă inerțială** (bloc beton 5-10× masa echipamentului → amplitudine ∝ F/m mică); (b) **decuplare** pe elastomeri/neopren/arcuri sau **dală flotantă** (rost), f0 = (1/2π)√(k/m) ≈ 3-5 Hz (izolare la f>2f0). **Cușcă Faraday RMN:** panouri Cu/oțel ecranare RF suspendate de structură (ancoraj pt. greutate ecranare magnetică fier — până la câteva tone + seism); zonă excludere feromagnetică (linia 0,5 mT). **CT/angiograf:** rigidizare locală placă + ancorare + verificare placă superioară (braț suspendat).

## 12. Geotehnic

Cat. geo **3** (clasa I + radier + echipamente sensibile). Argilă prăfoasă vârtoasă → nisip îndesat; radier −4,25 (sub îngheț/umpluturi); pconv 250-300 kPa; NH −3,00 (cuvă etanșă); tasare ≤3,5 cm, Δs/L ≤1/500 (echipamente); Tc 1,6s teren mediu. Verificare tasare sub RMN (<1 mm/m — dezaxare magnet).

## 13. Detalii armare seismică (DCM→DCH clasa I)

**Zone critice:** grinzi l_cr 1,5h (etrieri s ≤ min(h/4;24Øe;150)); stâlpi l_cr max(h;llib/6;600) (confinare s ≤ min(b/3;125), ωwd ≥0,08); pereți h_cr = max(lw;H/6) (bulbi confinați, ρ ≥0,20%). **Confinare** ωwd ≥0,08 (DCM) / 0,12 (DCH) — sporită la stâlpi parter/subsol. Acoperiri 35 mm (radier/subsol 45-50 XC2/XA1). **Ancorare seismică componente** (cap. 10): Fa = γa·ma·Sa/qa pentru CT/RMN/angiograf/gaze/UPS/generatoare/HVAC/tavane (γa sporit vital).

## 14. Materiale

| Material | Clasă | Utilizare |
|---|---|---|
| Beton | C30/37 (fcd 20) | radier, pereți, grinzi, plăci |
| Beton | C35/45 (fcd 23,3) | stâlpi subsol/parter |
| Oțel | **BST500C clasa C** (fyd 435, εuk ≥7,5%, ft/fy ≥1,15) | armături seismice (obligatoriu) |

## 15. Concluzii și verificare A1/Af

| Verificare | Rezultat | Stare |
|---|---|---|
| Clasa I γI,e 1,40 | pe toate grupările seismice | ✔ |
| Fb | 13.500 kN (c 0,255) | ✔ |
| Drift SLS (postseism) | 8,8 mm (0,24% h) ≤18 | ✔ marjă |
| Drift ULS | 17,5 ≤90 | ✔ cvasi-elastic |
| P-Δ θ | 0,019 <0,10 | ✔ |
| Pereți/stâlpi νd | 0,236 / 0,50 | ✔ |
| Grindă slabă/stâlp | ΣM_Rc ≥1,3ΣM_Rb | ✔ |
| Vibrații imagistică | 12,4 Hz, dală flotantă RMN | ✔ |
| Tasare radier | ≤3,5 cm, Δs/L ≤1/500 | ✔ |

**Clasa I = responsabilitate maximă:** spitalul rămâne **funcțional imediat post-cutremur** (nu doar nu se prăbușește). → forțe +40%, sistem dual rigid + **q redus intenționat 3,50** (cvasi-elastic), drift SLS strict (0,24% h marjă mare), vibrații imagistică + fundații antivibratile (masă inerțială + Faraday RMN), ancorare seismică echipamente, opțiune izolare bază. **Verificare** verificatori atestați MDLPA competenți clasa I: **A1** (b.a.), **Af** (geotehnic/fundații), **C** (incendiu R120-180). Control execuție **nivel III** + faze determinante avizate ISC (categoria B). Detalii (cofraj/armare, breviar) la PT+DE.
