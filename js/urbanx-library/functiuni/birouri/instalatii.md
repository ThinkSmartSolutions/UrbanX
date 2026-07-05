# Memoriu tehnic de instalații — Clădire de birouri clasa A (S+P+6E)

## Cuprins

1. Date generale, cadru normativ și ipoteze de calcul
2. Instalații sanitare (I9/2015) — alimentare cu apă rece și caldă
3. Canalizare menajeră (I9, SR EN 12056)
4. Canalizare pluvială — acoperiș și terase (calcul debit)
5. Instalații termice — sursă și distribuție (I13/2015, C107)
6. Ventilare și climatizare — HVAC (I5/2010, SR EN 16798-1)
7. Ventilare parcaj, spații tehnice și desfumare parcaj (P118-2)
8. Instalații electrice — curenți tari (I7/2011)
9. Iluminat interior și de siguranță (NP 061, SR EN 12464-1)
10. Priză de pământ și paratrăsnet (I20, SR EN 62305)
11. Instalații de stingere a incendiilor (P118-2, NP 086, SR EN 12845)
12. Detecție, semnalizare și alarmare incendiu — IDSAI (P118-3)
13. Desfumare case de scări, holuri și circulații (P118-2)
14. Curenți slabi și BMS (date/voce, CCTV, control acces, efracție, automatizare)
15. Instalații de transport pe verticală — ascensoare (calcul trafic)
16. Eficiență energetică nZEB (Legea 372/2005, Mc001)
17. Concluzii, sinteză indicatori și verificare tehnică

---

## 1. Date generale, cadru normativ și ipoteze de calcul

### 1.1 Descrierea obiectivului

Prezentul memoriu tehnic de specialitate tratează instalațiile aferente unei **clădiri de birouri clasa A**, cu regim de înălțime **S+P+6E**, amplasată în mediul urban. Clădirea este destinată exclusiv activităților de birou (open-space, birouri celulare, săli de ședință, spații de recepție, spații tehnice și de servicii conexe), cu spații comune la parter (lobby/recepție, zonă comercială minoră) și subsol tehnic + parcaj.

Caracteristicile geometrice și funcționale de referință adoptate în calcule:

| Element | Valoare | Observații |
|---|---|---|
| Regim de înălțime | S+P+6E | Subsol tehnic + parcaj |
| Suprafață construită desfășurată (SCD) | ~5.600 mp | Total peste sol |
| Suprafață utilă/nivel | ~620 mp | Nivel curent birouri |
| Suprafață utilă totală birouri | ~5.000 mp | Baza de calcul HVAC |
| Înălțime liberă nivel curent | 3,00 m | + 0,60 m plenum tavan |
| Înălțime nivel (de la pardoseală la pardoseală) | 3,60 m | Parter 3,90 m |
| Cotă ultim nivel finit (E6) | +25,50 m | Parter 3,90 + 6 × 3,60 |
| Populație totală de proiectare | ~600 persoane | ~85 pers/nivel curent |
| Densitate ocupare | 1 pers / ~8,3 mp util | Birouri clasă A |

### 1.2 Încadrări de importanță și incendiu

| Parametru | Încadrare | Justificare |
|---|---|---|
| Categoria de importanță (HG 766/1997) | **C — normală** | Clădire publică curentă de birouri |
| Clasa de importanță seismică (P100-1) | **II** (γ_I,e = 1,20) | Aglomerări > 300 persoane |
| Gradul de rezistență la foc | **II** | Structură beton armat, protecție elemente |
| Risc de incendiu | mic (birouri) | Densitate sarcină termică < 420 MJ/mp |
| Categoria de pericol de incendiu (spații tehnice) | D/E | Centrale, tablouri |

**Analiza „clădire înaltă":** cota celui mai de sus nivel finit destinat activității este:

H_E6 = 3,90 + 6 × 3,60 = **25,50 m < 28,00 m** → conform P118-1 clădirea **NU se încadrează strict la clădiri înalte**. Totuși, dată fiind proximitatea de prag și populația de peste 500 persoane, se adoptă **acoperitor** o parte din măsurile specifice clădirilor înalte: sprinklere generalizate în toate spațiile, presurizarea casei de scări de evacuare, coloană uscată de intervenție, avertizare sonoră vocală. Această abordare oferă marjă de siguranță și facilitează o eventuală mansardare/supraetajare viitoare.

### 1.3 Cadru normativ aplicabil

**Instalații sanitare și canalizare:**
- I9/2015 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor sanitare
- SR 1478 — Alimentarea cu apă la construcții civile și industriale
- SR EN 806-1…5 — Specificații pentru instalații de distribuție apă potabilă
- SR EN 1717 — Protecția împotriva poluării apei potabile (dispozitive antiretur)
- SR EN 12056-1…5 — Canalizare gravitațională în interiorul clădirilor
- STAS 1795, STAS 1846 — Canalizări (debite de calcul)

**Instalații termice și frig:**
- I13/2015 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor de încălzire centrală
- C107/1…5 — Normativ privind calculul termotehnic al elementelor de construcție
- SR 1907-1/2 — Necesar de căldură (temperaturi interioare de calcul)
- SR EN 12831 — Metoda de calcul a sarcinii termice de proiectare

**Ventilare și climatizare:**
- I5/2010 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor de ventilare și climatizare
- SR EN 16798-1 — Performanța energetică a clădirilor. Parametri ambientali interiori (categorii de aer)
- SR EN 13779 (înlocuit de 16798-3) — Ventilarea clădirilor nerezidențiale
- ASHRAE 62.1 (aer proaspăt), ASHRAE 55 (confort termic)

**Instalații electrice:**
- I7/2011 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor electrice cu tensiuni până la 1000 V c.a.
- NP 061/2002 — Normativ pentru proiectarea și executarea sistemelor de iluminat artificial
- SR EN 12464-1 — Iluminatul locurilor de muncă în interior
- I20/2000 — Instalații de protecție împotriva trăsnetului
- SR EN 62305-1…4 — Protecția împotriva trăsnetului
- SR EN 60364 (HD 60364) — Instalații electrice de joasă tensiune

**Securitate la incendiu:**
- P118-1/2013 — Securitatea la incendiu a construcțiilor. Partea I — construcții
- P118-2/2013 — Instalații de stingere
- P118-3/2015 — Instalații de detectare, semnalizare și avertizare
- NP 086/2005 — Normativ pentru proiectarea, execuția și exploatarea instalațiilor de stingere cu apă
- SR EN 12845 — Sisteme fixe de stingere sprinkler
- SR EN 54-x — Sisteme de detectare și de alarmă la incendiu
- HG 571/2016, Ordin MAI 129/2016 — Avizarea/autorizarea ISU, scenariu de securitate

**Eficiență energetică:**
- Legea 372/2005 (r) — Performanța energetică a clădirilor
- Mc 001/2006 — Metodologie de calcul al performanței energetice a clădirilor
- Opțional: LEED v4, WELL, BREEAM

### 1.4 Parametri climatici și de confort de calcul

| Parametru | Valoare | Sursă |
|---|---|---|
| Temperatura exterioară de calcul iarnă | −15 °C | SR 1907-1 (zona II) |
| Temperatura exterioară de calcul vară | +32 °C (t.uscat), +21,5 °C (t.umed) | SR 6648 |
| Temperatura interioară birouri iarnă | +22 °C | SR EN 16798-1 cat. II |
| Temperatura interioară birouri vară | +24…26 °C | Confort adaptiv |
| Umiditate relativă interioară | 40…60 % | Confort |
| Categoria de calitate a aerului interior | **cat. II** | SR EN 16798-1 (clădiri noi) |
| Nivel zgomot interior birouri | ≤ NR 35 (≈35 dB(A)) | I5, SR EN 16798-1 |
| Nivel iluminare birouri | 500 lx, UGR < 19, Ra ≥ 80 | SR EN 12464-1 |

### 1.5 Principii generale de proiectare a instalațiilor

Proiectarea instalațiilor urmărește, dincolo de conformitatea normativă, un set de principii care asigură funcționalitatea, fiabilitatea și eficiența pe întreaga durată de viață a clădirii:

- **Flexibilitate și adaptabilitate**: spațiile de birou clasă A trebuie să permită reconfigurarea (open-space ↔ celular) fără intervenții majore la instalații — de aceea distribuția terminală (aer, apă, curenți slabi, electric) se face modular, pe grid, cu rezervă de capacitate de minimum 20 %.
- **Zonarea și contorizarea**: fiecare nivel/chiriaș se poate izola și contoriza independent (electric, termic, frig, apă), premisă pentru un management energetic transparent și pentru repartizarea corectă a costurilor.
- **Redundanță pe funcțiunile critice**: pompe (2+1), UPS (N+1), răcire data center (N+1), pompă incendiu (electrică + Diesel) — pentru continuitatea serviciilor esențiale.
- **Separarea instalațiilor de siguranță** de cele de exploatare curentă (cabluri, surse, trasee), astfel încât o avarie la instalația curentă să nu afecteze funcțiile de siguranță la incendiu.
- **Integrare BMS**: toate instalațiile se monitorizează și se comandă centralizat, permițând optimizare energetică, mentenanță predictivă și interfațare cu securitatea la incendiu.
- **Accesibilitate pentru mentenanță**: trasee vizitabile (ghene, plafoane demontabile, camere tehnice dimensionate cu spații de deservire), pentru intervenții rapide și igiena instalațiilor.
- **Eficiență energetică nativă (nZEB)**: soluțiile se aleg din start pentru consum minim de energie primară (recuperare, free-cooling, DCV, LED, pompă de căldură, fotovoltaic).

### 1.6 Bilanțul de suprafețe și baze de calcul sintetice

| Bază de calcul | Valoare | Utilizare |
|---|---|---|
| Suprafață utilă birouri | 5.000 mp | HVAC, iluminat, bilanț electric |
| Volum spații ocupate (H liber 3,0 m) | 15.000 mc | Schimburi de aer, aer proaspăt |
| Populație | 600 pers | Apă, ACM, canalizare, aer proaspăt, trafic lifturi |
| Suprafață terasă | 700 mp | Pluvial, fotovoltaic, LPS |
| Volum parcaj subteran | 1.960 mc | Ventilare, desfumare parcaj |
| Densitate ocupare | 1 pers/8,3 mp | Verificări cat. aer, aporturi |

---

## 2. Instalații sanitare (I9/2015) — alimentare cu apă rece și caldă

### 2.1 Descrierea sistemului

Alimentarea cu apă rece se realizează dintr-un branșament la rețeaua publică de distribuție, echipat cu contor general (apometru cu emisie de impulsuri către BMS), robinete de izolare, filtru și **dispozitiv de siguranță antiretur familia BA (RPZ)** conform SR EN 1717 pentru protecția rețelei publice împotriva refulării. Distribuția interioară este de tip inferior (colector în subsol), cu coloane verticale ce deservesc grupurile sanitare pe fiecare nivel.

### 2.2 Determinarea echivalenților de debit și a debitului de calcul

Dotarea sanitară de proiectare (grupuri sanitare pe niveluri, birouri clasă A, 7 niveluri supraterane):

| Obiect sanitar | Buc. total | Echivalent E unitar | ΣE |
|---|---|---|---|
| Lavoar (baterie stativă) | 29 | 0,35 | 10,15 |
| Vas WC (rezervor cu robinet flotor) | 29 | 0,50 | 14,50 |
| Pisoar (spălare temporizată) | 14 | 0,17 | 2,38 |
| Robinet serviciu/curățenie | 8 | 1,00 | 8,00 |
| Chiuvetă oficiu (ceainărie nivel) | 7 | 0,15 | 1,05 |
| **TOTAL** | **87** | — | **≈ 36,08** |

Debitul de calcul pentru apă rece se determină conform I9/STAS 1478, cu relația pentru clădiri civile:

**qc = a·b·c·√ΣE + 0,004·ΣE** (l/s)

unde a = 0,20 (regim cu funcționare simultană medie), b·c ≈ 1,0 (clădiri publice curente):

qc = 0,20 × √36,08 + 0,004 × 36,08 = 0,20 × 6,007 + 0,144 = 1,201 + 0,144 = **1,35 l/s**

Se adoptă acoperitor un debit de calcul **qc = 1,5 l/s** (≈ 5,4 mc/h).

**Verificarea prin consum zilnic** (norma de consum specific birouri ≈ 20 l/pers·zi conform SR 1478):

Q_zi,med = 600 × 20 = **12.000 l/zi = 12 mc/zi**

Q_zi,max = 1,10 × 12 = 13,2 mc/zi; debitul orar de vârf este însă guvernat de simultaneitatea qc, nu de consumul zilnic mediu. Racordul de branșament se dimensionează la **DN 40** (viteza în branșament v = qc/A = 1,5·10⁻³ / (π·0,040²/4) = 1,19 m/s < 2 m/s admis).

### 2.3 Repartizarea debitelor pe niveluri și pe grupuri sanitare

Fiecare nivel curent dispune de un grup sanitar femei + un grup sanitar bărbați + un GS PMR + un oficiu:

| Nivel | Lavoare | WC | Pisoare | ΣE nivel | qc nivel (l/s) |
|---|---|---|---|---|---|
| Parter | 5 | 4 | 2 | 4,84 | 0,45 |
| E1…E6 (fiecare) | 4 | 4 | 2 | 4,34 | 0,43 |
| Subsol (tehnic/curățenie) | — | 1 | — | 0,50 | 0,17 |

Debitul de calcul pe coloană (deservind 2 niveluri suprapuse, ΣE ≈ 8,7): qc,coloană = 0,20·√8,7 + 0,004·8,7 = 0,59 + 0,035 = **0,62 l/s** → coloană **Dn 32**; distribuție orizontală pe nivel **Dn 25**; legături obiecte **Dn 15…20**. Vitezele se limitează la 1,5…2,0 m/s pe conducte principale și ≤ 1,5 m/s pe legături.

### 2.4 Necesarul de presiune și grupul de pompare (hidrofor)

Presiunea necesară la cel mai defavorabil consumator (lavoar E6):

H_nec = H_geodezic + H_pierderi liniare+locale + H_utilizare

- H_geodezic (de la subsol la E6) = 25,50 + 1,0 (cotă subsol) = 26,5 mCA
- H_pierderi (liniare + locale, contor, filtru, RPZ) ≈ 8,0 mCA
- H_utilizare la robinet (presiune de serviciu) = 5,0 mCA

**H_nec = 26,5 + 8,0 + 5,0 = 39,5 mCA ≈ 3,95 bar**

Presiunea disponibilă în rețeaua publică (garantată contractual) ≈ 3,0 bar (30 mCA) < H_nec → **este necesară repompare interioară**.

Se adoptă **grup de pompare cu turație variabilă** (convertizor de frecvență, comandă pe presiune constantă la refulare), configurație **2 pompe active + 1 rezervă (2+1)**, cu vas de expansiune/tampon de 100 l pe refulare pentru eliminarea pornirilor frecvente și menținerea presiunii la debite mici. Debitul grupului: Q_grup = 1,5 l/s ≈ 5,4 mc/h; presiune de refulare reglată la **4,5 bar** (marjă peste 3,95 bar necesar).

**Zonare pe presiune** pentru a evita suprapresiunile la nivelurile inferioare (> 6 bar la obiect ar impune reductoare):
- **Zona inferioară** parter–E2: alimentare directă din rețea + booster minimal;
- **Zona superioară** E3–E6: alimentare din grupul de pompare.

La nivelurile unde presiunea statică depășește 5 bar la obiectele sanitare se prevăd reductoare de presiune pe coloană (reglaj 3,5 bar aval).

**Verificarea puterii grupului de pompare:**

P_hidraulic = ρ·g·Q·H / η_pompă = 1000 × 9,81 × 1,5·10⁻³ × 45 / 0,65 = 662 / 0,65 = **~1,02 kW hidraulic per pompă activă** → motor electric ~1,5 kW/pompă. Cu 2 pompe active + 1 rezervă, puterea instalată a grupului ≈ 4,5 kW (se regăsește în poziția „pompe" a bilanțului electric). Grupul cu turație variabilă menține presiunea constantă și reduce consumul la debite parțiale (legea afinității: P ∝ n³). Verificarea NPSH: întrucât aspirația se face din rețeaua sub presiune (nu din rezervor deschis), NPSH_disponibil este amplu (> 10 mCA) → **fără risc de cavitație**. Dacă alimentarea s-ar face dintr-un rezervor de rupere a presiunii, s-ar verifica NPSH_disp ≥ NPSH_nec + 0,5 mCA marjă.

### 2.5 Prepararea apei calde de consum (ACM)

Necesarul de ACM (norma birouri ≈ 5 l/pers·zi la 60 °C):

Q_ACM,zi = 600 × 5 = **3.000 l/zi = 3 mc/zi**

Consumul de vârf orar (coeficient de vârf 0,20 pentru birouri, concentrat la pauze): Q_ACM,vârf ≈ 0,25 mc/h. Puterea de preparare în regim de acumulare:

**Necesarul termic de încălzire a apei:**

Φ_ACM = Q·ρ·c·Δt / t_încărcare = (2×0,5 mc × 1000 × 4,186 × (60−10)) / (2 × 3600) kJ→kW

Φ_ACM = (1000 × 4,186 × 50) / 7200 = 209.300 / 7200 = **29 kW** (pe încărcare de 2 h a 1000 l)

Se adoptă preparare centralizată în **regim de acumulare**, cu **2 boilere bivalente de 500 l** (total 1.000 l) alimentate prioritar din **pompa de căldură** (sursa termică principală), cu **rezistență electrică de back-up** (9 kW) pentru vârfuri și ca sursă de rezervă. Se prevede obligatoriu:
- **Ciclu antilegionella**: ridicarea periodică (săptămânală, automat prin BMS) a temperaturii acumulării la **60 °C** minimum 30 minute, conform reglementărilor de igienă;
- **Recirculare ACM** pe coloane, cu pompă de recirculare și reglaj astfel încât temperatura de retur să se mențină **≥ 50 °C** (limitarea stagnării și a riscului microbiologic);
- Mixere termostatice la punctele de consum pentru limitarea la 43 °C (protecție antiopărire lavoare publice).

Distribuția ACM și recircularea sunt izolate termic (grosime izolație conform I13, min. 20…30 mm în funcție de diametru), coloanele fiind pozate în ghene tehnice comune cu apa rece.

### 2.6 Breviar de dimensionare a coloanei ACM și verificarea pierderilor de sarcină

Pentru coloana ACM cea mai defavorabilă (deservind nivelurile E4…E6), debitul de calcul se determină cu aceeași relație ca la apa rece, aplicată echivalenților de debit ai obiectelor care consumă apă caldă (lavoare + oficii): ΣE_ACM ≈ 6,5 → qc,ACM = 0,20·√6,5 + 0,004·6,5 = 0,51 + 0,026 = **0,54 l/s**. Se adoptă coloană **Dn 25** (viteza v = qc/A = 0,54·10⁻³ / (π·0,025²/4) = 1,10 m/s < 1,5 m/s admis pentru ACM, unde viteza se limitează suplimentar pentru reducerea eroziunii și a zgomotului la temperaturi ridicate).

Pierderea de sarcină pe circuitul ACM (tur + retur recirculare) se estimează cu relația Darcy-Weisbach h_f = λ·(L/D)·(v²/2g), cu λ ≈ 0,025 (regim turbulent, țeavă din cupru/multistrat), L_echivalent ≈ 60 m (tur + retur + pierderi locale echivalente):

h_f = 0,025 × (60 / 0,025) × (1,10² / (2 × 9,81)) = 0,025 × 2.400 × 0,0617 = **3,70 mCA**

Pompa de recirculare ACM se dimensionează pentru debitul de recirculare (≈ 10…15 % din debitul de vârf ACM, pentru menținerea temperaturii ≥ 50 °C pe retur) și H_pompă ≈ 4 mCA, cu comandă pe termostat de retur (pornire/oprire în funcție de temperatura de retur măsurată). Bucla de recirculare este echilibrată cu robinete termostatice de circulație pe fiecare ramură ascendentă (evitarea „scurtcircuitării" hidraulice a coloanelor apropiate de pompă).

### 2.7 Materiale, izolații și protecții sanitare

- **Conducte apă rece/caldă**: țeavă multistrat (PE-RT/Al/PE-RT) sau cupru pentru distribuția interioară, PP-R pentru coloane; racord branșament PEHD.
- **Izolație termică**: manșoane elastomerice/PE cu grosime conform I13 (min. 9 mm apă rece — anticondens, 20…30 mm ACM — antipierderi).
- **Protecție antiretur** (SR EN 1717): dispozitiv **BA (RPZ)** pe branșament (categoria de risc ridicat — clădire publică), plus supape antiretur locale la robinetele de serviciu și la racordurile la echipamente (rezervor incendiu, adaos termic).
- **Contorizare**: contor general cu emisie de impulsuri + contoare de nivel/chiriaș pe coloane (repartiție consum), integrate BMS.
- **Sifoane** cu gardă hidraulică ≥ 50 mm la toate obiectele; sifoane de pardoseală în GS, camere tehnice și parcaj cu gardă antievaporare.

---

## 3. Canalizare menajeră (I9, SR EN 12056)

### 3.1 Sistemul de canalizare

Canalizarea interioară este de tip **separativ** (menajeră separată de pluvială), gravitațională. Coloanele verticale colectează apele uzate de la grupurile sanitare și oficii pe fiecare nivel și le conduc la colectorul orizontal din subsol, de unde se evacuează gravitațional (sau prin pompare — vezi 3.4) la rețeaua publică de canalizare, prin cămin de racord cu clapetă antiretur.

### 3.2 Determinarea debitului de calcul

Conform SR EN 12056-2, debitul apelor uzate se calculează cu:

**Q_ww = K · √(ΣDU)** (l/s)

unde K = 0,5 (coeficient de frecvență pentru clădiri cu utilizare intermitentă — birouri, cu grupuri sanitare) și DU = unitatea de descărcare pe obiect:

| Obiect | Buc. | DU unitar (l/s) | ΣDU |
|---|---|---|---|
| Lavoar | 29 | 0,5 | 14,5 |
| Vas WC (rezervor 6 l) | 29 | 2,0 | 58,0 |
| Pisoar | 14 | 0,3 | 4,2 |
| Chiuvetă/oficiu | 7 | 0,6 | 4,2 |
| Robinet serviciu/sifon pardoseală | 8 | 0,8 (echiv.) | 6,4 |
| **TOTAL** | — | — | **≈ 87,3** |

Q_ww = 0,5 × √87,3 = 0,5 × 9,34 = **4,67 l/s**

La acest debit se adaugă eventualul debit continuu (Q_c ≈ 0, nu există aparate cu descărcare continuă) și debitul de vârf al pompelor (dacă e cazul). **Q_tot ≈ 4,7 l/s** (acoperitor 5 l/s pentru dimensionarea colectorului).

### 3.3 Dimensionarea conductelor

- **Coloane menajere**: Dn 110 (PP fonoabsorbant), cu **aerisire** prelungită peste terasă (ventilarea coloanei — evitarea desifonării gărzilor hidraulice). Fiecare coloană preia ΣDU parțial; la un DU ≈ 30/coloană, Q = 0,5·√30 = 2,7 l/s → Dn 110 acoperă (capacitate ~4 l/s la umplere 50 %).
- **Colector orizontal principal**: **Dn 160**, pantă **i = 1,5 %** (asigură viteza de autocurățire v ≥ 0,7 m/s). Verificare: la Dn 160, i = 1,5 %, capacitate la umplere h/D = 0,5 ≈ 9,5 l/s > 5 l/s necesar → **conform**.
- **Ventilare secundară** pe grupuri sanitare cu multe obiecte, pentru menținerea gărzii hidraulice.
- **Piese de curățire** (curățitoare) la baza coloanelor, la schimbări de direcție și pe colector la max. 15 m.

**Verificarea coloanei Dn 110**: capacitatea hidraulică a unei coloane de canalizare cu ventilare primară (aerisită), conform SR EN 12056-2, la un grad de umplere de 33 % (sistem I, uz intermitent birouri), este de ordinul **4,0 l/s** pentru Dn 110. Debitul pe coloana cea mai încărcată (deservind grupurile sanitare a 3 niveluri suprapuse, ΣDU ≈ 30) este Q = 0,5·√30 = **2,74 l/s < 4,0 l/s** → **conform**. Ventilarea principală (prelungirea coloanei peste terasă cu căciulă de ventilație) menține echilibrul de presiuni și protejează gărzile hidraulice ale sifoanelor de la ultimul nivel împotriva sifonării/desifonării.

### 3.4 Stație de pompare pentru grupurile sanitare de la subsol

Grupurile sanitare și scurgerile de la subsol (curățenie, garaje, camere tehnice) se află **sub cota canalului public** → evacuarea gravitațională nu este posibilă. Se prevede **stație de pompare ape uzate cu tocător** (bazin de retenție etanș, ~1 mc), echipată cu:
- **2 pompe submersibile cu tocător** în regim alternant (funcționare pe rând, egalizare ore), cu **cuplare simultană** la debit mare;
- senzori de nivel (pornire/oprire/alarmă preaplin) integrați în BMS;
- **alarmă de nivel maxim** transmisă la BMS și la dispecerat;
- conductă de refulare Dn 80 cu clapetă antiretur și vană, ridicare peste cota de refulare a canalului public.

Debitul de pompare Q_pompă ≈ 3…5 l/s (acoperă aportul de la subsol), H ≈ 8…10 mCA.

**Verificarea colectorului la umplere parțială**: colectorul Dn 160 la pantă i = 1,5 % are, conform formulei Manning-Strickler cu n = 0,013 (PP/PVC), o capacitate la umplere h/D = 0,7 de aproximativ:

Q = (1/n) · A · R^(2/3) · i^(1/2)

cu A = 0,7 × secțiune ≈ 0,0141 mp, R_h ≈ 0,043 m: Q = (1/0,013) × 0,0141 × 0,043^0,667 × 0,015^0,5 = 76,9 × 0,0141 × 0,123 × 0,122 ≈ **~0,0163 mc/s = 16,3 l/s** > 5 l/s necesar → **conform** cu marjă amplă, viteza de autocurățire (> 0,7 m/s) fiind asigurată chiar la debite parțiale.

---

## 4. Canalizare pluvială — acoperiș și terase (calcul debit)

### 4.1 Ipoteze de calcul

Suprafața de colectare pluvială (terasă + acoperiș tehnic): **A = 700 mp**. Se adoptă:
- **Intensitatea ploii de calcul**: i = 300 l/s·ha (echivalent ≈ 0,03 l/s·mp), corespunzătoare unei ploi cu frecvență 2/1 (o dată la 2 ani în ~15 min) — valoare uzuală pentru zona de amplasament conform SR 1846 și datelor ANM locale;
- **Coeficientul de scurgere** ψ = 1,0 (terasă bituminoasă/membrană, impermeabilă).

### 4.2 Debitul de calcul

**Q_pluvial = ψ · i · A = 1,0 × 0,03 l/s·mp × 700 mp = 21 l/s**

Se adoptă un **sistem de canalizare pluvială sifonic** (cu autoamorsare, funcționare în plin), care asigură debit mare cu conducte de diametru redus și fără pantă (montaj orizontal). Configurație:

- **4 receptoare sifonice** de terasă → debit unitar de calcul ≈ 21/4 = **5,3 l/s/receptor** (în limita capacității unui receptor sifonic Dn 90…110);
- **Coloane de descărcare Dn 90…110** (PEHD sudat), colectate în subsol la colectorul pluvial și evacuate gravitațional la rețeaua publică de ape pluviale sau la bazinul de atenuare.

### 4.3 Preaplin și atenuare

Conform reglementărilor, terasa se echipează cu **sistem de preaplin (guri de preaplin)** dimensionat pentru ploaia excepțională (frecvență 1/100 ani, i ≈ 400…500 l/s·ha), independent de sistemul principal, cu descărcare liberă vizibilă pe fațadă (semnal de colmatare a sistemului principal). Preaplinul preia diferența:

Q_preaplin = ψ · i_100 · A = 1,0 × 0,045 × 700 = **31,5 l/s** (dimensionat pentru scenariul de blocare a receptoarelor principale).

Dacă PUZ/avizul de gospodărire a apelor impune **debit maxim descărcat la rețea** (uzual limitat la 5 l/s pentru amplasamentul de 700 mp), se prevede **bazin de atenuare (retenție) ≈ 15 mc** cu regulator de debit (vortex/orificiu calibrat) care limitează descărcarea la **5 l/s**, restul volumului fiind reținut temporar și evacuat lent. Volumul de retenție se verifică prin bilanțul intrare–ieșire pe durata ploii de calcul:

V_ret = (Q_pluvial − Q_evacuat) × t_ploaie = (21 − 5) l/s × 15 min × 60 = 16 × 900 = 14.400 l ≈ **14,4 mc → adoptat 15 mc**.

### 4.4 Verificarea sistemului sifonic

Sistemul sifonic funcționează în plin (fără aer), amorsându-se la o lamă de apă de câțiva mm pe terasă. Presiunea motoare este energia geodezică (înălțimea de la receptor la punctul de descărcare), care „aspiră" apa. Condiția de dimensionare: pierderile de sarcină pe traseu (liniare + locale + reziduu de energie cinetică la descărcare) trebuie egalate de energia geodezică disponibilă H_geo ≈ 26 m (de la terasă la subsol). Pentru Q = 21 l/s pe colectorul comun Dn 110 (A = 0,0095 mp), viteza v = 0,021/0,0095 = **2,2 m/s** (în plaja 1…6 m/s recomandată pentru autoamorsare și autocurățire). Coloanele verticale Dn 90 la Q ≈ 5,3 l/s/receptor: v = 0,0053/0,0064 = **0,83 m/s** pe colectarea individuală, crescând la joncțiuni. Se verifică ca reziduul de presiune la fiecare receptor să fie pozitiv (fără cavitație) — condiție îndeplinită prin echilibrarea diametrelor pe traseu. Colectorul orizontal sub terasă se pozează fără pantă (avantajul sifonic), reducând înălțimea plenumului tehnic.

### 4.5 Ape convențional curate și separatoare

Apele pluviale de pe zonele carosabile/parcarea exterioară (dacă există) se trec printr-un **separator de hidrocarburi (produse petroliere) cu decantor**, dimensionat la debitul de calcul al suprafeței respective, înainte de descărcarea la rețeaua pluvială sau la bazinul de atenuare — cerință de mediu pentru protecția emisarului. Apele de pe terasă (curate) se descarcă direct în sistemul pluvial.

---

## 5. Instalații termice — sursă și distribuție (I13/2015, C107)

### 5.1 Necesarul de căldură pentru încălzire

Anvelopa clădirii este de standard nZEB, cu parametri termotehnici (conform C107 și cerințe Mc001):

| Element | Rezistență/coeficient | Valoare |
|---|---|---|
| Perete exterior | U | 0,25 W/mp·K |
| Tâmplărie (triplu vitraj Low-E, argon) | U_w | 1,0 W/mp·K |
| Terasă (acoperiș) | U | 0,18 W/mp·K |
| Placă pe sol/subsol | U | 0,30 W/mp·K |
| Factor solar tâmplărie | g | 0,40 (control solar) |

Necesarul specific de căldură pentru clădire nouă performantă, în regim +22 °C interior / −15 °C exterior, rezultă q_specific ≈ **35 W/mp** (raportat la suprafața utilă), incluzând pierderile prin transmisie și aportul de ventilare (parțial recuperat).

**Φ_încălzire = q_specific × S_util = 35 W/mp × 5.000 mp = 175.000 W = 175 kW**

Defalcarea orientativă a necesarului:
- Pierderi prin transmisie (anvelopă): ≈ 100 kW
- Aport ventilare (aer proaspăt neîncălzit prin recuperator): ≈ 60 kW
- Rezervă/margine + ACM back-up: ≈ 15 kW

### 5.2 Sursa termică adoptată

Se adoptă ca sursă principală **pompă de căldură reversibilă aer-apă tip chiller cu 4 țevi** (produce simultan apă caldă și apă rece), care acoperă atât încălzirea cât și răcirea (vezi cap. 6). Parametri:

| Parametru | Valoare |
|---|---|
| Regim încălzire (tur/retur) | 45/40 °C (joasă temperatură) |
| Regim răcire (tur/retur) | 7/12 °C |
| COP încălzire (A7/W45) | 3,2 |
| SCOP (sezonier încălzire) | **3,8** |
| EER răcire | ~3,0 |
| SEER (sezonier răcire) | ~4,5 |

**Avantajul sistemului cu 4 țevi**: permite **încălzire și răcire simultană** pe fațade diferite ale aceleiași clădiri (ex.: fațada sud cu aport solar necesită răcire, în timp ce fațada nord necesită încălzire în semisezon), cu **recuperarea căldurii** din procesul de răcire pentru încălzire — creștere semnificativă de eficiență.

**Back-up pentru vârful de iarnă** (temperaturi < −10 °C, când COP-ul pompei scade): **cazan de condensație pe gaz de 120 kW** (η ≈ 108 % PCI) SAU **rezistențe electrice** integrate în butelia de egalizare. Alegerea între gaz și electric depinde de disponibilitatea racordului de gaze și de bilanțul nZEB (electricul favorizează un scor de emisii mai bun dacă rețeaua este decarbonizată; gazul reduce vârful electric contractat).

**Analiza comparativă a surselor termice:**

| Sursă | Avantaje | Dezavantaje | Verdict |
|---|---|---|---|
| Pompă căldură aer-apă 4 țevi | RES, reversibilă, recuperare, nZEB | COP scade la ger, cost inițial | **Adoptată** |
| Cazan condensație gaz | Cost mic, putere de vârf sigură | Emisii, doar încălzire, racord gaz | **Back-up** |
| Pompă căldură sol-apă (geotermal) | COP superior, stabil | Cost foraje mare, spațiu | Alternativă premium |
| District heating (termoficare) | Fără sursă proprie | Disponibilitate locală, doar încălzire | Dacă există racord |

**Consumul energetic sezonier al sursei (estimativ):** la un necesar anual de încălzire de ~75 MWh_termic și SCOP 3,8, consumul electric al pompei de căldură pentru încălzire ≈ 75 / 3,8 = **~19,7 MWh_electric/an**; pentru răcire (~100 MWh_termic frig) la SEER 4,5: ≈ 100 / 4,5 = **~22,2 MWh_electric/an**. Total energie electrică pentru climatizare (fără ventilatoare/pompe): ~42 MWh/an — de comparat cu ~197 MWh_termic livrat (raport de eficiență global ~4,7), ilustrând avantajul soluției aerotermale reversibile față de o sursă clasică cu ardere (η < 1).

### 5.3 Distribuția termică

Sursa se conectează la o **butelie de egalizare a presiunilor** (decuplaj hidraulic), din care pleacă circuitele secundare cu pompe de circulație cu turație variabilă (ECM/EC):
- Circuit **încălzire/răcire ventiloconvectoare** (45/40 iarnă, 7/12 vară);
- Circuit **baterii CTA** (preîncălzire/prerăcire aer proaspăt);
- Circuit **ACM** (încărcare boilere).

Echipamente auxiliare obligatorii pe circuit:
- **Dedurizator** pe apa de adaos (protecția schimbătoarelor împotriva depunerilor de calcar);
- **Separator de aer și de nămol** (dezaerisitor + defangator magnetic);
- **Vase de expansiune** cu membrană dimensionate pe volumul instalației;
- **Contorizare termică pe niveluri** (contoare de energie termică cu emisie către BMS — repartizarea consumurilor pe chiriași/departamente);
- Robinete de echilibrare hidraulică statice/dinamice pe coloane și circuite.

### 5.4 Corpuri terminale

În spațiile de birou se folosesc **ventiloconvectoare cu 4 țevi** montate în plafon (casetate sau tip ductate în plenum), care asigură reglajul individual sensibil (încălzire iarnă / răcire vară) pe fiecare zonă termică. În circulații, grupuri sanitare și spații tehnice se prevăd corpuri statice (radiatoare/panouri) sau baterii de aer. Casele de scări și holurile de intervenție sunt încălzite pentru protecție antiîngheț și confort minim.

### 5.5 Breviar de calcul al necesarului termic pe elemente de anvelopă

Necesarul de căldură pentru încălzire se determină conform SR EN 12831 ca sumă a pierderilor prin transmisie (Φ_T) și prin ventilare (Φ_V), cu adaos pentru reîncălzire după întrerupere. Pentru clădirea de referință, cu suprafețele de anvelopă și temperaturile de calcul:

**Pierderi prin transmisie:** Φ_T = Σ(U_i · A_i) · (θ_int − θ_ext), cu θ_int = 22 °C, θ_ext = −15 °C (Δθ = 37 K):

| Element | A (mp) | U (W/mp·K) | U·A (W/K) | Φ_T = U·A·37 (W) |
|---|---|---|---|---|
| Pereți exteriori opaci | 1.800 | 0,25 | 450 | 16.650 |
| Tâmplărie (vitraj) | 1.200 | 1,0 | 1.200 | 44.400 |
| Terasă (acoperiș) | 700 | 0,18 | 126 | 4.662 |
| Placă pe sol/spre subsol | 700 | 0,30 | 210 | 7.770 |
| Punți termice (majorare 10 %) | — | — | ~199 | ~7.348 |
| **Total transmisie Φ_T** | — | — | **~2.185** | **≈ 80.830 W ≈ 81 kW** |

**Pierderi prin ventilare (infiltrații + aer proaspăt neîncălzit după recuperator):** aporturile de aer proaspăt sunt recuperate 75 % în CTA (cap. 6), astfel încât sarcina reziduală pe încălzire dinspre ventilare este Φ_V ≈ 94 kW (bateria CTA) din care se acoperă direct pe circuitul aeraulic; pierderile prin infiltrații necontrolate la anvelopa etanșă nZEB (n_50 ≤ 1,5 h⁻¹) sunt Φ_infiltr ≈ 0,34 × 0,15 × 15.000 × 37 / 1000 ≈ **28 kW**.

**Necesar total instalat** (transmisie + infiltrații + rezervă reîncălzire + ACM back-up):

Φ_înc = 81 + 28 + ~50 (baterie aer proaspăt CTA parțial + reîncălzire + margine) + 15 (ACM) ≈ **175 kW** — confirmă valoarea globală adoptată (q_specific ≈ 35 W/mp). Se observă ponderea majoră a tâmplăriei vitrate (44 kW din 81 kW transmisie), motiv pentru care controlul solar și tâmplăria performantă (triplu vitraj) sunt esențiale.

### 5.6 Volumul instalației și vasul de expansiune

Volumul total de agent termic în instalație (sursă + distribuție + terminale) se estimează la V_inst ≈ 2.500 l (circuite 45/40 și 7/12). Vasul de expansiune cu membrană se dimensionează pentru dilatarea apei la încălzirea de la temperatura de umplere (10 °C) la temperatura maximă de regim (50 °C), cu coeficient de dilatare e ≈ 0,0118 la 50 °C:

ΔV = V_inst × e = 2.500 × 0,0118 = 29,5 l → volumul nominal al vasului, ținând cont de presiunea de preîncărcare și de presiunea maximă (supapă de siguranță 3 bar): V_vas = ΔV / [(p_max − p_pre)/(p_max + 1)] ≈ 29,5 / 0,4 ≈ **~75 l** (se adoptă vas 80…100 l). Fiecare circuit închis (răcire, ACM) are propriul vas de expansiune dimensionat similar.

---

## 6. Ventilare și climatizare — HVAC (I5/2010, SR EN 16798-1)

Ventilarea și climatizarea reprezintă instalația **dominantă** a clădirii de birouri, atât ca energie cât și ca impact asupra confortului și productivității ocupanților.

### 6.1 Necesarul de aer proaspăt

Conform SR EN 16798-1 (categoria II — clădiri noi), aerul proaspăt se determină prin **metoda combinată** (per persoană + per suprafață pentru degajări de la clădire/mobilier):

- Debit per persoană (birouri, cat. II): **q_p = 7 l/s·pers**
- Debit per suprafață (emisii clădire cu poluare redusă, cat. II): **q_B = 0,7 l/s·mp**

**Q_aer = n_pers · q_p + S · q_B = 600 × 7 + 5.000 × 0,7 = 4.200 + 3.500 = 7.700 l/s**

Q_aer = 7.700 l/s × 3,6 = **27.720 mc/h**

Se adoptă acoperitor **Q_aer proaspăt = 30.000 mc/h**, corespunzând unui număr de schimburi de aer:

n = Q / V = 30.000 / (5.000 × 3,0) = 30.000 / 15.000 = **2,0 schimburi/h**

### 6.2 Centrale de tratare a aerului (CTA)

Se prevăd **2 CTA de câte 15.000 mc/h** (amplasate în subsol tehnic și/sau pe terasă, zonate pe corpuri/fațade), cu următoarele componente:

| Componentă | Caracteristică |
|---|---|
| Recuperator de căldură | **rotativ (higroscopic), η ≥ 75 %** (recuperare sensibilă + latentă) |
| Filtrare priză | **ePM1 50 % (F7)** + prefiltru ePM10 (M5/G4) |
| Baterie de răcire | 7/12 °C, cu separator de picături |
| Baterie de încălzire | 45/40 °C |
| Ventilatoare | tip **EC (plug-fan)**, reglaj VAV (turație variabilă) |
| SFP (putere specifică ventilator) | **≤ 1,5 kW/(mc/s)** (clasa SFP 2, cerință I5/nZEB) |
| Umidificare (opțional) | cu abur/adiabatică, control punct de rouă |

**Puterea recuperată iarnă** prin recuperatorul de căldură (aer evacuat 22 °C → aer proaspăt de la −15 °C):

Φ_recuperat = 0,34 × Q × η × Δt = 0,34 × 30.000 × 0,75 × (22−(−15)) / 1000 (Wh/mc·K → kW la mc/h)

Φ_recuperat = 0,34 × 30.000 × 0,75 × 37 / 1000... corect dimensional: Φ = 0,34 × 30.000 × 0,75 × 37 ≈ ... folosim relația Φ[W] = 0,34 · Q[mc/h] · Δt[K]:

- Fără recuperare, încălzirea aerului proaspăt: Φ = 0,34 × 30.000 × 37 = 377.400 W ≈ **377 kW**
- Cu recuperator η = 75 %: **Φ_recuperat = 0,75 × 377 = 283 kW**
- Sarcina rămasă pe bateria de încălzire CTA: 377 − 283 = **94 kW**

Recuperarea de 283 kW este esențială pentru bilanțul nZEB (reduce cu 75 % energia de tratare a aerului proaspăt).

### 6.3 Free-cooling și strategii de economisire

- **Free-cooling pe entalpie**: în semisezon și nopțile de vară, când entalpia aerului exterior < entalpia aerului interior, clapetele de amestec și bypass-ul recuperatorului comută pentru a răci gratuit clădirea cu aer exterior (comandă BMS pe senzori de temperatură + umiditate).
- **Night purge (răcire nocturnă)**: ventilare intensivă noaptea vara pentru descărcarea inerției termice a structurii.
- **DCV (Demand Controlled Ventilation) pe CO₂**: debitul de aer proaspăt se modulează după concentrația reală de CO₂ măsurată în zone (setpoint ~800…1000 ppm), reducând debitul în zonele slab ocupate — economie de 15…30 % la ventilare.

**Estimarea economiei prin free-cooling**: în zona climatică de amplasament, numărul de ore anuale cu entalpie exterioară favorabilă pentru răcire gratuită (semisezon + nopți de vară + zile reci de vară) este de ordinul 1.500…2.000 h. Dacă în aceste ore free-cooling-ul acoperă chiar și parțial sarcina de răcire (înlocuind funcționarea chillerului), economia estimată este de **15…25 % din energia de răcire** anuală. Cumulat cu DCV (−15…30 % ventilare) și cu recuperarea de căldură (−75 % tratare aer proaspăt), pachetul de măsuri aeraulice reduce substanțial consumul HVAC — pilonul principal al încadrării nZEB.

**Filtrarea și calitatea aerului**: filtrele ePM1 50 % (F7) rețin particulele fine (PM2.5, polen, praf urban) protejând ocupanții și bateriile/recuperatorul; prefiltrele ePM10 (M5/G4) prelungesc durata filtrelor fine. Schimbarea filtrelor se comandă la atingerea unui **Δp prag** (presostat diferențial monitorizat în BMS), nu la interval fix — optimizare de mentenanță și energie (un filtru colmatat crește consumul ventilatorului). Opțional, în zonele reprezentative se pot adăuga trepte de filtrare superioară (ePM1 80 %) sau purificare, pentru certificări de tip WELL (calitatea aerului interior).

### 6.4 Sarcina de răcire (aporturi de căldură)

Aporturile interne de căldură pentru un birou clasă A (densitate 1 pers/10 mp, echipare IT densă):

| Sursă de aport | Valoare specifică | Observații |
|---|---|---|
| Persoane | 9,0 W/mp | ~90 W/pers la 1/10 mp |
| Echipamente IT (calculatoare, ecrane) | 12,0 W/mp | Birou clasă A |
| Iluminat LED | 8,0 W/mp | ≤ 8 W/mp (nZEB) |
| Aport solar prin tâmplărie | 15,0 W/mp | fațadă vitrată, g = 0,40 + jaluzele |
| **TOTAL aporturi interne** | **≈ 44 W/mp** | — |

**Φ_interior = 44 W/mp × 5.000 mp = 220 kW**

Sarcina de răcire a aerului proaspăt (vara, 32 °C exterior → 24 °C interior, incl. dezumidificare, cu recuperare):

Φ_aer proaspăt = 0,34 × 30.000 × (32−24) × ... plus latent; cu recuperator η ~65 % vara ≈ **100 kW** (sensibil + latent, după recuperare).

**Sarcina totală de răcire:**

Φ_frig total = (Φ_interior + Φ_aer proaspăt) × factor de simultaneitate = (220 + 100) × 0,90 = 320 × 0,90 = **288 kW**

Se instalează **~300 kW capacitate de răcire** (2 chillere/module de 150 kW, redundanță N+1 parțială). Indicele de răcire rezultat:

Indice frig = 300.000 / 5.000 = **60 W/mp** — valoare specifică unei clădiri de birouri clasa A bine izolate cu control solar.

### 6.5 Sistemul de climatizare adoptat (analiza comparativă)

Se compară patru sisteme uzuale pentru birouri clasă A:

| Sistem | Avantaje | Dezavantaje | Verdict |
|---|---|---|---|
| **VAV integral** (tot aer) | Igienă maximă, control debit | Canale mari, energie ventilare | Parțial |
| **Ventiloconvectoare 4 țevi** | Sarcină sensibilă zonală, reglaj individual | Necesită aer primar separat | **Adoptat** |
| **VRF** | Flexibil, individualizat | Freon în spații, întreținere | Alternativă |
| **Grinzi de răcire (chilled beams)** | Confort superior, silențios, WELL/LEED | Cost, risc de condens | Premium opțional |

**Soluția hibridă adoptată:**
- **Aer primar** tratat în CTA cu recuperare — asigură **igiena (aer proaspăt), dezumidificarea și controlul punctului de rouă**; distribuit prin difuzoare/grile cu inducție în plafon;
- **Ventiloconvectoare cu 4 țevi** în plafon — preiau **sarcina sensibilă** pe zone termice, cu reglaj individual în funcție de orientare și ocupare (perimetru vs. interior tratate distinct);
- Alternativa premium (LEED/WELL): **grinzi de răcire** active în open-space-urile reprezentative.

**Distribuția aerului:**
- Introducere prin difuzoare/grile cu inducție sau plafonare; extracție prin plenumul de tavan/grile;
- Viteze de proiectare: canale principale **5…6 m/s**, canale secundare **3…4 m/s**, la grile ≤ **2,5 m/s** (evitarea curenților de aer și a zgomotului);
- **Clapete antifoc EI 90/EI 120** la traversarea pereților antifoc, cu resort și fuzibil + acționare de la BMS/detecție;
- **Atenuatoare de zgomot** pe tubulatura CTA pentru atingerea **NR 35 (≤ 35 dB(A))** în birouri;
- Izolare termică și fonică a tubulaturii; canale rectangulare/circulare din tablă zincată, etanșate clasa C/D.

### 6.6 Breviar de dimensionare a tubulaturii de aer

Debitul total de 30.000 mc/h se împarte pe cele două CTA (15.000 mc/h fiecare) și, în aval, pe magistrale de nivel. Secțiunea canalului principal se determină din debit și viteza admisă:

**A_canal = Q / (3600 · v)** [mp]

Pentru magistrala principală (Q = 15.000 mc/h, v = 6 m/s): A = 15.000 / (3600 × 6) = **0,694 mp** → canal rectangular ~800 × 900 mm sau circular Ø 940 mm. Pentru derivațiile de nivel (Q ≈ 4.300 mc/h, v = 4 m/s): A = 4.300 / (3600 × 4) = 0,299 mp → ~500 × 600 mm. Pierderea de sarcină pe traseul aeraulic cel mai lung (≈ 80 m echivalent, cu recuperator, baterii, filtre, atenuatoare, difuzoare) se estimează la Δp ≈ 700…900 Pa, care determină presiunea statică disponibilă a ventilatorului CTA și, implicit, puterea acestuia:

**P_ventilator = Q · Δp / (3600 · η_total)** [W]

P_vent = 15.000 × 850 / (3600 × 0,65) = 12.750.000 / 2.340 = **~5.450 W ≈ 5,45 kW per ventilator** (introducere). Verificarea SFP: SFP = P / Q[mc/s] = 5.450 / (15.000/3600) = 5.450 / 4,17 = **1.307 W/(mc/s) = 1,31 kW/(mc/s) ≤ 1,5** → **conform clasa SFP 2**. Puterea totală instalată ventilatoare (2 CTA × introducere + evacuare) ≈ 4 × 5 = 20 kW (concordă cu poziția „ventilare" din bilanțul electric).

### 6.7 Zonarea termică și controlul de confort

Clădirea se împarte pe **zone termice** distincte, tratate diferențiat:
- **Perimetru** (fâșia de ~5 m de la fațadă) — supus aporturilor solare și pierderilor prin anvelopă; ventiloconvectoare cu reglaj individual pe orientare (N/S/E/V), comandate independent;
- **Zona interioară (core)** — dominată de aporturi interne (persoane, IT, iluminat), necesită răcire aproape tot anul; tratată cu răcire pe aer primar + ventiloconvectoare;
- **Săli de ședință** — sarcini variabile mari (ocupare intermitentă densă); VAV cu senzor de CO₂ dedicat + ventiloconvector supradimensionat pentru boost.

Fiecare zonă are termostat/senzor de ambianță conectat la BMS, cu reglaj în bandă neutră (dead-band 22…24 °C iarnă/vară) pentru evitarea funcționării simultane încălzire-răcire pe aceeași zonă. Punctul de rouă este controlat central pe aerul primar (dezumidificare la CTA), astfel încât ventiloconvectoarele lucrează în regim uscat (fără condens/tavă de scurgere activă) — igienă și fiabilitate sporite.

---

## 7. Ventilare parcaj, spații tehnice și desfumare parcaj (P118-2)

### 7.1 Ventilarea parcajului subteran

Parcajul subteran (volum estimat V_parcaj ≈ 1.960 mc) se ventilează mecanic în două regimuri:

**Regim de exploatare (curent):**
- 6 volume/h → Q_exploatare = 6 × 1.960 = **11.760 ≈ 12.000 mc/h**
- Comandă automată pe **senzori de CO** (prag alarmă 100 ppm — pornire ventilare; prag evacuare 200 ppm — semnal de evacuare + ventilare maximă), integrați în BMS. Numărul de senzori: 1 senzor / ~200…400 mp de parcaj (acoperire uniformă a zonelor de staționare), cu treaptă intermediară de ventilare (funcționare parțială la concentrații medii) pentru economie de energie. Ventilarea în regim normal poate fi oprită complet când parcajul este liber (senzori de prezență/barieră), pornind doar la detecția de mișcare/CO.

**Regim de desfumare (incendiu):**
- 10 volume/h → Q_desfumare = 10 × 1.960 = **19.600 ≈ 20.000 mc/h**
- **Ventilatoare de desfumare F400** (rezistente la 400 °C timp de 120 min), pe evacuare;
- **Aport de aer de compensare ≥ 60 %** din debitul evacuat, prin guri joase (grile/trape sau ventilatoare de introducere);
- Comandă **automată de la detecția de incendiu** + comandă manuală de la panoul pompierilor;
- Alimentare electrică din **sursa de siguranță** (grup electrogen + circuite rezistente la foc).

### 7.2 Ventilarea spațiilor tehnice și grupurilor sanitare

- **Grupuri sanitare**: extracție mecanică — 25 mc/h·pisoar și 50 mc/h·cabină WC, sau global **10…15 vol/h**; introducere compensatoare din spații adiacente (transfer).
- **Camere tehnice** (pompe, tablouri, gospodărie apă PSI): 4…6 vol/h + menținere temperatură cu **antiîngheț +5 °C** iarnă.
- **Cameră servere / data center**: sistem de răcire dedicat (unități de precizie/close-control) în configurație **N+1**, cu control strict de temperatură (22 ± 1 °C) și umiditate (45…55 % RH); vezi și cap. 14.

---

## 8. Instalații electrice — curenți tari (I7/2011)

### 8.1 Alimentarea cu energie electrică

Alimentarea se realizează din rețeaua de distribuție, prin **post de transformare propriu** (racord MT 20 kV) cu **transformator uscat 400 kVA** SAU, în funcție de puterea aprobată în ATR, prin **branșament de joasă tensiune**. Distribuția principală se face din tabloul general de distribuție (TGD) amplasat în camera tablourilor de la subsol/parter.

### 8.2 Bilanțul de puteri

Bilanțul se stabilește pe receptoare, cu puterea instalată (Pi), coeficientul de utilizare/cerere (ku) și coeficientul de simultaneitate (ks):

| Nr. | Receptor / grup | Pi (kW) | ku | Pc = Pi·ku (kW) |
|---|---|---|---|---|
| 1 | Iluminat interior LED (birouri+comun) | 40 | 0,90 | 36,0 |
| 2 | Prize monofazate birouri (IT, uz general) | 125 | 0,60 | 75,0 |
| 3 | Climatizare (chillere/PC, pompe frig) | 130 | 0,80 | 104,0 |
| 4 | Ventilare (CTA, ventilatoare, parcaj) | 45 | 0,70 | 31,5 |
| 5 | Lifturi (ascensoare) | 30 | 0,50 | 15,0 |
| 6 | Servere / data center | 40 | 0,90 | 36,0 |
| 7 | Pompe (sanitare, canalizare, adaos) | 25 | 0,70 | 17,5 |
| 8 | Diverse (curățenie, exterior, receptoare mici) | 30 | 0,60 | 18,0 |
| — | **Total instalat Pi** | **465** | — | — |
| — | **Total cerut ΣPc** | — | — | **≈ 333** |

Aplicând un **coeficient de simultaneitate global ks = 0,85** peste suma puterilor cerute (nu toate grupurile ating vârful simultan):

**Pc,total = 0,85 × 333 ≈ 283 kW** (calcul conservator de bilanț)

Notă de reconciliere: adoptând Pi de referință ~435 kW (fără margine diverse), Pc ≈ 355 kW, iar cu ks = 0,85 → **Pc ≈ 302 kW** (valoare de proiectare adoptată, acoperitoare). Puterea aparentă:

**S = Pc / cos φ = 302 / 0,92 = 328 kVA**

Se prevede **compensarea factorului de putere** la un cos φ ≥ 0,92 (baterie de condensatoare automată cu trepte, filtrată împotriva armonicelor generate de convertizoarele de frecvență și de sursele IT). Puterea transformatorului **400 kVA** acoperă S = 328 kVA cu marjă pentru extindere.

### 8.3 Distribuția și schema de tablouri

Structura de distribuție (radial-arborescentă):

- **TGD** (tablou general) → alimentat din trafo, cu întrerupător general, aparataj de protecție și măsură.
- **Tablouri de nivel (TE1…TE6, TE parter)** — alimentează iluminatul, prizele și consumatorii de nivel; cabluri de coloană pe verticală în ghene electrice.
- **TH climatizare/ventilare** — surse termice, chillere/PC, CTA, pompe.
- **TPSI (tablou pentru consumatorii de siguranță la incendiu)** — pompe incendiu, desfumare, presurizare, iluminat de securitate; alimentat cu **dublă cale** (rețea + grup electrogen) prin **AAR**, cu cabluri rezistente la foc (E90/PH90).
- **Tablou parcaj + desfumare parcaj**.
- **Tablou UPS servere**.
- **Tablou grup electrogen** cu AAR.

**Schema de legare la pământ: TN-S** (neutru și protecție separate). Protecții:
- **Dispozitive diferențiale (RCD) 30 mA** pe circuitele de prize (protecția persoanelor);
- **RCD 300 mA** selectiv pe distribuția generală (protecția la incendiu);
- **Descărcătoare de supratensiune SPD tip 1+2** la TGD și **tip 2/3** la tablourile de nivel/echipamente sensibile (coordonat cu paratrăsnetul, cap. 10).

### 8.4 Sursa neîntreruptibilă (UPS) pentru IT/servere

Consumatori critici (servere, echipamente de rețea, control acces, CDSAI): P_critic ≈ **40 kW**, autonomie minimă cerută **15 minute** (până la preluarea de grup):

E_baterie = 40 kW × 0,25 h = **10 kWh** (≈ 11,1 kWh cu randament invertor 0,90)

Se prevede **UPS on-line dublă conversie 60 kVA / ~48 kW**, configurație **N+1** (module redundante), cu baterii dimensionate pentru 15 min. UPS alimentează tabloul de distribuție al data centerului și rack-urile IT.

**Dimensionarea bateriilor UPS**: pentru P = 40 kW critic, autonomie 15 min, tensiune baterie 480 Vdc, randament invertor 0,90 și factor de îmbătrânire 1,25: energia = 40 / 0,90 × 0,25 h = 11,1 kWh; capacitatea = 11,1 kWh × 1,25 / 480 V = **~29 Ah** la 480 Vdc (string de ~40 baterii 12 V). Se folosesc baterii VRLA cu durată lungă de viață sau, opțional, litiu (durată dublă, gabarit redus). La căderea rețelei, UPS-ul preia instantaneu (0 ms — dublă conversie), iar în ≤ 15 s intră grupul electrogen care realimentează UPS-ul și reîncarcă bateriile — lanț de continuitate fără întrerupere pentru IT.

### 8.5 Grupul electrogen de siguranță

Consumatorii de siguranță la incendiu care trebuie alimentați la căderea rețelei:

| Consumator de siguranță | Putere (kW) |
|---|---|
| Pompe de incendiu (principală electrică + jockey) | 55 |
| Ventilatoare desfumare + presurizare casă scări | 30 |
| Iluminat de securitate (evacuare, marcaje) | 8 |
| BMS + CDSAI + comenzi de siguranță | 5 |
| Ascensor de pompieri (dacă e cazul) | 10 |
| **TOTAL** | **≈ 108…113 kW** |

Se adoptă **grup electrogen 150 kVA / 120 kW**, cu **AAR (comutare automată) în < 15 s**, rezervor de motorină pentru **autonomie ≥ 4 h** la sarcina de siguranță, amplasat în încăpere tehnică ventilată, cu eșapare condusă la exterior.

**Verificarea rezervorului de combustibil**: consum specific motor Diesel ≈ 0,25 l/kWh la sarcina de siguranță (≈ 110 kW): consum orar = 0,25 × 110 = 27,5 l/h → pentru 4 h: **110 l** (rezervor de zi min. 120 l), iar pentru autonomie extinsă (24 h la eventuală solicitare prelungită) rezervor tampon ~700 l. **Verificarea AAR**: la căderea rețelei, secvența = detectare (< 1 s) → pornire motor (3…5 s) → stabilizare turație/tensiune (5…8 s) → comutare sarcină (< 15 s total), acoperind cerința de pornire a pompelor de incendiu. Ventilarea camerei grupului se dimensionează pentru evacuarea căldurii radiate (≈ 8 % din puterea termică a motorului) + aerul de ardere, cu grile antifonice. Grupul alimentează prin AAR tabloul TPSI și, opțional, consumatorii vitali de exploatare (parte iluminat, lifturi, IT prin UPS).

### 8.6 Breviar de dimensionare a coloanei de alimentare și verificarea căderilor de tensiune

Coloana principală de la trafo/branșament la TGD transportă curentul de calcul:

**I_c = S / (√3 · U) = 328.000 / (1,732 × 400) = 473 A**

Se adoptă cablu de coloană (sau bară capsulată) dimensionat pentru I ≥ 473 A cu marjă: cablu **4×240 mm² Cu** (I_admis ≈ 500 A la pozare în aer) sau 2 × (4×150 mm²) în paralel; alternativ **bară capsulată (busbar) 630 A**. Protecția la TGD: întrerupător automat de 500…630 A cu declanșator reglabil.

**Verificarea căderii de tensiune** pe coloana principală (L ≈ 30 m de la trafo la TGD, cablu 240 mm² Cu, ρ = 0,0175 Ω·mm²/m):

Δu = √3 · I · L · (R·cosφ + X·sinφ) ≈ √3 × 473 × (0,0175 × 30 / 240) × 0,92 ≈ √3 × 473 × 0,00219 × 0,92 ≈ **1,65 V** → ε = 1,65/400 = **0,41 %** (mult sub limita I7 de 3 % pentru coloane și 5 % total tablou→receptor) → **conform**. Pe coloanele de nivel (I ≈ 60…100 A, L ≈ 25…40 m) căderile se verifică individual, țintind ε_total ≤ 5 % la cel mai defavorabil receptor (E6).

### 8.7 Verificarea curentului de scurtcircuit și a selectivității

Curentul de scurtcircuit prezumat la barele TGD, alimentat din trafo 400 kVA cu tensiune de scurtcircuit u_k = 4 %:

**I_k = S_trafo / (√3 · U · u_k) = 400.000 / (1,732 × 400 × 0,04) = 400.000 / 27,7 = ~14,4 kA**

Aparatajul de la TGD se alege cu **capacitate de rupere I_cu ≥ 16 kA** (marjă peste 14,4 kA). Selectivitatea protecțiilor se asigură cronometric și amperometric (declanșatoare reglabile pe TGD selective față de tablourile de nivel), astfel încât un defect pe un circuit de nivel să nu declanșeze întrerupătorul general. Circuitele de siguranță (TPSI) au protecții coordonate pentru a menține continuitatea alimentării consumatorilor vitali.

### 8.8 Circuite, secțiuni și protecții tipizate

| Circuit | Secțiune (Cu) | Protecție | RCD |
|---|---|---|---|
| Prize monofazate birou (16 A) | 3×2,5 mm² | MCB C16 | 30 mA |
| Circuit iluminat (10 A) | 3×1,5 mm² | MCB B/C10 | 30 mA (comun) |
| Ventiloconvector/unitate mică | 3×2,5 mm² | MCB C16 | 30 mA |
| CTA/pompă (trifazat) | 5×6…16 mm² | MCCB + releu termic | 300 mA |
| Coloană nivel (TE) | 5×35…70 mm² | MCCB 100…160 A | 300 mA selectiv |
| Chiller/pompă căldură | 5×50…95 mm² | MCCB 160…250 A | 300 mA |

Toate circuitele de siguranță la incendiu (pompe, desfumare, presurizare, iluminat securitate, CDSAI) se execută cu **cabluri rezistente la foc (PH90/E90, izolație menținută 90 min)** pozate pe trasee protejate, separate de instalația curentă.

---

## 9. Iluminat interior și de siguranță (NP 061, SR EN 12464-1)

### 9.1 Niveluri de iluminare de calcul

| Spațiu | E_m (lx) | UGR max | Ra min | Uo min |
|---|---|---|---|---|
| Birouri (scris, tastare, ecran) | **500** | 19 | 80 | 0,60 |
| Săli de ședință/conferință | 500 | 19 | 80 | 0,60 |
| Recepție / lobby | 300 | 22 | 80 | 0,40 |
| Circulații, holuri | 100…150 | 25 | 40 | 0,40 |
| Case de scări | 150 | 25 | 40 | 0,40 |
| Grupuri sanitare | 200 | 25 | 80 | 0,40 |
| Parcaj subteran | 75 | 25 | 40 | 0,40 |
| Camere tehnice/arhivă | 200 | 25 | 60 | 0,40 |

### 9.2 Dimensionarea iluminatului birouri (metoda fluxului)

Fluxul luminos total necesar (metoda factorului de utilizare):

**Φ_total = E_m × A / (UF × MF)**

pentru un birou tip cu A = 1 mp (calcul specific), UF = 0,55 (factor de utilizare — încăpere de birou cu reflectanțe uzuale și indice de încăpere mediu), MF = 0,80 (factor de menținere — LED, mediu curat):

Φ_specific = 500 × 1 / (0,55 × 0,80) = 500 / 0,44 = **1.136 lm/mp**

Cu corpuri LED de eficacitate **130 lm/W**, puterea instalată de iluminat:

P_iluminat = 1.136 / 130 = **8,7 → adoptat ≤ 8 W/mp** (prin corpuri de eficacitate mai mare, 150 lm/W, și geometrie optimizată)

Puterea instalată totală de iluminat: P_ilum,total ≈ 8 W/mp × 5.000 mp = 40 kW (concordă cu bilanțul din cap. 8). Se urmărește un **LENI (Lighting Energy Numeric Indicator)** redus, cerință nZEB.

### 9.3 Controlul iluminatului

- **Senzori de prezență** în birouri, săli, GS, circulații — stingere/reducere automată la absență (economie 20…35 %);
- **Daylight harvesting** (reglaj după lumina naturală) în zonele perimetrale cu aport de lumină naturală (economie suplimentară 20…40 %);
- **Sistem DALI** de comandă adresabilă, integrat în BMS (scenarii, programe orare, mentenanță predictivă);
- Reglaj continuu (dimming) pentru menținerea nivelului constant pe durata de viață a corpurilor.

### 9.4 Iluminat de siguranță (NP 061, P118)

| Tip iluminat de siguranță | Nivel min. | Autonomie |
|---|---|---|
| Evacuare (căi, marcaje ieșiri) | ≥ 1 lx pe axul căii | 1…3 h |
| Antipanică (spații > 60 mp) | ≥ 0,5 lx | 1 h |
| Pentru continuarea lucrului (intervenție PSI, camere pompe) | 15 % din nominal | durata intervenției |
| Marcaje/indicatoare ieșire | luminate permanent | permanent |

Corpurile de iluminat de siguranță sunt cu **sursă proprie (kit acumulator)** sau alimentate din **sursa centrală de siguranță** (UPS/grup), cu autotestare integrată și raportare defecte la BMS. Indicatoarele de ieșire (pictograme EN ISO 7010) sunt permanent luminate pe căile de evacuare și la fiecare schimbare de direcție.

### 9.5 Dimensionarea iluminatului de securitate pe căile de evacuare

Lungimea totală a căilor de evacuare (coridoare + scări, 7 niveluri): L ≈ 7 × 60 m ≈ 420 m. La un corp de evacuare la fiecare ~8 m (pentru menținerea ≥ 1 lx pe ax și ≥ 0,5 lx antipanică pe suprafață), rezultă **~55 corpuri de evacuare** + indicatoare la fiecare ieșire/schimbare de direcție (~30 buc.). Puterea instalată de securitate ≈ 55 × 5 W + 30 × 3 W ≈ 365 W. Energia necesară pentru autonomia de 3 h (caz clădire cu > 500 pers): E = 0,365 kW × 3 h = **1,1 kWh** — acoperită de kit-uri de acumulator individuale sau de sursa centrală. Autotestarea automată (test funcțional lunar + test de autonomie anual) raportează defectele la BMS pentru mentenanță.

---

## 10. Priză de pământ și paratrăsnet (I20, SR EN 62305)

### 10.1 Priza de pământ

Se realizează **priză de pământ de fundație** (electrod natural în fundație — platbandă OL-Zn în radier/fundații), completată la nevoie cu electrozi verticali, dimensionată pentru **rezistența de dispersie R ≤ 1 Ω** (priză unică, comună pentru instalația electrică, paratrăsnet și echipotențializare, conform I7/I20).

Se prevede **bară de egalizare a potențialelor (BEP)** principală la care se conectează: nulul de protecție (PE), armătura structurii (prin bare de așteptare), conductele metalice (apă, canal, gaze — prin flanșe izolante la intrare), jgheaburile de cabluri, ecranele curenților slabi, coborârile paratrăsnetului. Echipotențializarea locală suplimentară în băi, camere tehnice și data center.

**Verificarea rezistenței de dispersie**: priza de fundație (electrod natural în beton armat, contur perimetral ~120 m platbandă OL-Zn 40×4 mm) oferă, în soluri de rezistivitate ρ ≈ 100 Ω·m, o rezistență de dispersie estimată R ≈ ρ / (2·L) ... pentru contur închis ≈ 100 / (2 × 120) × factor formă ≈ **sub 1 Ω** → conform cerinței R ≤ 1 Ω pentru priza comună. La soluri de rezistivitate mare se adaugă electrozi verticali (țăruși) legați în paralel până la atingerea valorii. Măsurarea se face la recepție cu punte de măsurare a prizei, prin metoda celor 3 puncte (62 %).

### 10.2 Evaluarea nivelului de protecție la trăsnet

Conform SR EN 62305-2 (evaluarea riscului), pentru o clădire publică de birouri cu peste 500 persoane, amplasată în mediu urban, cu echipamente electronice sensibile (IT, servere, BMS), rezultă necesitatea unui **sistem de protecție împotriva trăsnetului (LPS) nivel/clasă II** (probabilitate de interceptare corespunzătoare, rază sferă fictivă 30 m, dimensiune ochi rețea 10 × 10 m).

### 10.3 Sistemul de captare și coborâre

- **Dispozitiv de captare**: rețea de conductoare pe terasă în **ochiuri de 10 × 10 m** (clasă II) + **tije de captare** la elementele proeminente (echipamente terasă, coșuri, antene);
- **Coborâri**: minimum **4 coborâri** distribuite pe perimetru, la distanță ≤ 15 m una de alta (clasă II), preferabil folosind armătura stâlpilor structurii (coborâri naturale) cu piese de legătură;
- **Prize de pământ**: legate la priza de fundație (R ≤ 1 Ω);
- **Protecție la supratensiuni coordonată SPD T1 + T2 + T3** pe distribuția electrică (T1 la intrare/TGD, T2 la tablouri, T3 la echipamente sensibile) — protejează instalația de curenții induși de descărcarea atmosferică.

---

## 11. Instalații de stingere a incendiilor (P118-2, NP 086, SR EN 12845)

### 11.1 Hidranți interiori

Conform P118-2, pentru clădire publică de birouri de această mărime se prevăd hidranți interiori cu asigurarea a **2 jeturi simultane** care ating orice punct:

- Debit specific jet: **q = 2,1 l/s/jet** (furtun semirigid/plat, ajutaj)
- **Q_hidranți interiori = 2 × 2,1 = 4,2 l/s**
- Timp teoretic de funcționare: **10 min**
- Volum: V_hi = 4,2 l/s × 600 s = 2.520 l = **2,52 mc**

Hidranții interiori se amplasează pe fiecare nivel (cutii cu furtun 25 m + ajutaj), astfel încât fiecare punct al spațiului să fie atins de **2 jeturi**, racordați la coloane verticale de incendiu.

### 11.2 Hidranți exteriori

Conform P118-2 și volumului clădirii:
- **Q_hidranți exteriori = 20 l/s** (o intervenție cu debit corespunzător categoriei clădirii)
- Timp de funcționare: **3 h**
- Volum: V_he = 20 l/s × 3 × 3600 = 216.000 l = **216 mc**

Rețeaua exterioară de hidranți este **inelară Dn 100**, cu hidranți supraterani amplasați la distanțe ≤ 150 m și la ≥ 5 m de clădire, alimentată din rezervorul de incendiu prin pompare (sau, dacă rețeaua publică asigură debitul și presiunea, direct — de verificat prin aviz).

**Verificarea hidraulică a inelului exterior**: la Q = 20 l/s pe conductă Dn 100 (A = 0,00785 mp), viteza v = 0,020/0,00785 = **2,55 m/s** (< 3 m/s admis la incendiu). Pierderea de sarcină pe inel (L ≈ 200 m, λ ≈ 0,022): h_f = 0,022 × (200/0,1) × (2,55²/19,62) = 0,022 × 2.000 × 0,331 = **14,6 mCA**. Presiunea la hidrant trebuie să asigure ≥ 4 bar la ajutaj (pentru bătaia jetului); alimentarea inelară (din două direcții) reduce pierderile la jumătate față de rețeaua ramificată — de aceea se adoptă configurația inelară.

### 11.3 Sistemul de sprinklere (SR EN 12845)

Se adoptă **sprinklere generalizate** (măsură acoperitoare de tip clădire înaltă, deși H < 28 m). Clasa de pericol pentru birouri: **OH2 (Ordinary Hazard grupa 2)**.

- Intensitatea de stropire: **5 mm/min** (OH2)
- Aria de operare (suprafața de calcul): **144 mp** (OH2, sistem umed)
- Debit teoretic: Q = intensitate × arie = 5 mm/min × 144 mp = 5 (l/min·mp) × 144 = 720 l/min = **12 l/s**
- Cu majorarea pentru presiune la duze și pentru sprinklerele suplimentare din zona de calcul, debitul de proiectare rezultă **~15…20 l/s**
- Timp de funcționare OH2: **60 min**
- Volum: V_spk = 18 l/s × 3600 = 64.800 ≈ **72 mc** (la 20 l/s: 72 mc)

Capete de sprinkler cu bulb **68 °C** (spații birouri), montate în plafon (sistem umed, cu apă permanent sub presiune), rețea de conducte inelară pe niveluri cu supapă de control și alarmă (ACV) pe fiecare zonă.

### 11.4 Rezerva de incendiu și gospodăria de apă

Volumul rezervei intangibile de incendiu (se consideră scenariul cel mai defavorabil — funcționare simultană sprinklere + hidranți interiori, hidranții exteriori putând fi asigurați parțial din rețeaua publică):

V_rezervă = V_sprinklere + V_hidranți interiori = 72 + 2,52 ≈ **74,5 mc → rezervor 100 mc** (acoperitor, incluzând marjă și, la nevoie, o parte din hidranții exteriori)

Notă: dacă avizul impune și rezerva completă pentru hidranții exteriori (216 mc) fără aport din rețeaua publică, rezervorul se redimensionează corespunzător (rezervor tampon + racord din rețea cu debit de completare). Ipoteza de proiectare curentă: **rezervor 100 mc** cu completare din rețea pentru hidranții exteriori.

**Stație de pompare incendiu (NP 086 / SR EN 12845)** amplasată în încăpere cu rezistență la foc REI corespunzătoare, cu acces din exterior:
- **Pompă principală electrică**: Q ≈ 25 l/s, H ≈ 70 mCA (acoperă sprinklere + hidranți interiori la nivelul cel mai înalt);
- **Pompă de rezervă cu motor Diesel** (independentă de rețeaua electrică, cerință SR EN 12845), aceiași parametri;
- **Pompă de menținere presiune (jockey)** debit mic, menține rețeaua sub presiune;
- Alimentare electrică din **sursa de siguranță** (grup electrogen prin AAR);
- Racord de alimentare pentru autospecialele ISU pe fațadă.

### 11.5 Coloană uscată

Se prevede **coloană uscată** de intervenție în casa de scări (măsură acoperitoare), cu racord de alimentare pentru pompieri la parter (exterior) și robinete de refulare pe fiecare nivel — permite intervenția rapidă a echipajelor ISU la etajele superioare.

### 11.6 Breviar hidraulic al instalației de sprinklere (SR EN 12845)

Se verifică presiunea și debitul la aria de operare cea mai defavorabilă (cel mai înalt și mai îndepărtat de sursă — E6). Pentru OH2:
- Densitatea de proiectare: **5 mm/min** = 5 l/min·mp;
- Aria de proiectare (sistem umed): **144 mp**;
- Aria protejată de un cap: **≤ 12 mp** → număr de capete în aria de calcul: 144 / 12 = **12 capete active**;
- Debitul minim pe cap: q_cap = 5 l/min·mp × 12 mp = 60 l/min = **1,0 l/s/cap**;
- Presiunea minimă la capul cel mai defavorabil pentru factorul K nominal (K = 80 pentru cap 15 mm): p = (q/K)² = (60/80)² = 0,56 bar → se adoptă min. **0,7 bar** la cap.

Debitul total pe aria de operare, ținând cont de creșterea presiunii/debitului spre capetele apropiate de sursă (balansare hidraulică): **Q_spk ≈ 15…20 l/s** (se adoptă 20 l/s pentru dimensionarea pompei). Presiunea necesară la baza coloanei (E6):

H_pompă = H_geodezic (25,5 + 3 subsol) + p_cap (7 mCA) + pierderi rețea (≈ 30 mCA) = 28,5 + 7 + 34,5 = **~70 mCA (7 bar)**

Verificare: pompa principală **Q ≈ 25 l/s (sprinklere + hidranți interiori simultan) la H ≈ 70 mCA** acoperă scenariul. Conductele principale de sprinklere se dimensionează la viteze ≤ 6 m/s (v = Q/A; pentru Dn 150, Q = 20 l/s → v = 1,13 m/s → confort hidraulic).

### 11.7 Verificarea rezervei de incendiu (scenariu combinat)

Volumul de apă necesar pe durata teoretică de funcționare simultană:

| Scenariu de calcul | Debit (l/s) | Durată (min) | Volum (mc) |
|---|---|---|---|
| Sprinklere OH2 | 20 | 60 | 72,0 |
| Hidranți interiori (2 jeturi) | 4,2 | 10 | 2,5 |
| **Subtotal rezervă intangibilă interioară** | — | — | **≈ 74,5** |
| Hidranți exteriori (din rețea publică + completare) | 20 | 180 | 216 |

Rezerva intangibilă stocată în rezervorul propriu: **74,5 mc → rezervor 100 mc** (marjă + volum de completare hidranți exteriori). Hidranții exteriori (216 mc) se asigură cu **aport din rețeaua publică** (debit de completare a rezervorului) sau, dacă avizul o cere, prin rezervor suplimentar. Timpul de refacere a rezervei intangibile ≤ 24 h (racord de umplere din rețea, controlat prin plutitor + vană motorizată BMS).

---

## 12. Detecție, semnalizare și alarmare incendiu — IDSAI (P118-3)

Sistemul de detectare, semnalizare și avertizare la incendiu este **obligatoriu** pentru clădirile de birouri de această categorie și se realizează în configurație **adresabilă totală** (acoperire integrală: birouri, circulații, spații tehnice, parcaj, ghene, plenumuri de tavan, casa liftului).

### 12.1 Componente

- **Centrala de detectare, semnalizare și alarmare (CDSAI)** adresabilă, cu bucle de detectare, amplasată la parter/dispecerat, cu **sursă de rezervă (acumulatori)** dimensionată pentru **48 h în veghe + 30 min în alarmă** (P118-3, EN 54-4);
- **Detectoare optice de fum** în birouri, circulații, casa scării, ghene;
- **Detectoare termice / termovelocimetrice** în spații tehnice, parcaj, bucătării/oficii (unde fumul poate genera alarme false);
- **Detectoare de aspirație (VESDA)** în data center/servere (detecție foarte timpurie);
- **Butoane manuale de semnalizare** pe căile de evacuare, la ieșiri și la fiecare nivel;
- **Dispozitive de avertizare acustică și optică** (sirene + flash-uri).

### 12.2 Avertizare vocală (EN 54-16)

Întrucât clădirea găzduiește **peste 500 de persoane**, se prevede **sistem de avertizare și alarmare vocală (VA/PAVA) conform EN 54-16** (mesaje preînregistrate de evacuare + posibilitate de anunțuri live), în locul sirenelor simple — asigură o evacuare ordonată și diferențiată pe zone.

### 12.3 Comenzi automate declanșate de detecție

La confirmarea alarmei, CDSAI (interfațată cu BMS) execută automat:
- **Oprirea instalațiilor de ventilare/climatizare** curente (evitarea propagării fumului);
- **Pornirea desfumării** (case de scări, circulații, parcaj);
- **Închiderea clapetelor antifoc** pe tubulatură;
- **Deblocarea controlului de acces** pe căile de evacuare (uși fail-safe);
- **Rechemarea ascensoarelor la parter** și scoaterea din uz (excepție lift de pompieri);
- **Pornirea presurizării casei de scări**;
- **Transmiterea semnalului la dispeceratul ISU** (conform HG 571/2016);
- Activarea iluminatului de securitate și a avertizării vocale.

### 12.4 Dimensionarea acoperirii cu detectoare

Numărul de detectoare optice de fum se determină din aria de supraveghere per detector (max. **~60 mp/detector** la înălțime ≤ 3,5 m, cu rază de acoperire ~6,7 m, conform P118-3/SR EN 54-14) și geometria tavanului:

N_detectoare/nivel ≈ S_nivel / A_supraveghere = 620 / 60 ≈ **~11 detectoare/nivel** (birouri + circulații), la care se adaugă detectoare în plenumul de tavan (unde există cabluri/tubulatură cu sarcină termică), ghene și casa scării. Pentru 7 niveluri + subsol + parcaj + spații tehnice rezultă cca. **90…110 detectoare** pe buclele adresabile, plus butoane manuale la ieșiri (max. 30 m parcurs până la un buton) și dispozitive de avertizare (sirene/flash + difuzoare vocale) dimensionate pentru **acoperire acustică ≥ 65 dB(A)** (sau 75 dB(A) la capul patului — nu e cazul birouri) în orice punct.

### 12.5 Autonomia sursei de rezervă CDSAI

Sursa de rezervă (acumulatori) a centralei se dimensionează pentru **48 h în stare de veghe + 30 min în stare de alarmă** (P118-3, EN 54-4):

C_baterie = (I_veghe × 48 h + I_alarmă × 0,5 h) × 1,25 (factor de îmbătrânire)

cu I_veghe ≈ 0,8 A și I_alarmă ≈ 4 A (estimativ pentru sistemul dimensionat): C = (0,8 × 48 + 4 × 0,5) × 1,25 = (38,4 + 2,0) × 1,25 = **~50,5 Ah** → se adoptă baterii 2 × 12 V / 26 Ah (sau echivalent), verificate la selecția finală a centralei.

---

## 13. Desfumare case de scări, holuri și circulații (P118-2)

### 13.1 Presurizarea casei de scări de evacuare

Casa de scări de evacuare (cale de evacuare protejată) se **presurizează** pentru a împiedica pătrunderea fumului, menținând o **suprapresiune de 20…50 Pa** față de spațiile adiacente (P118-2). Sistemul cuprinde:
- **Ventilator de introducere aer** (montat la bază sau pe terasă), alimentat din sursa de siguranță;
- **Clapetă de suprapresiune (relief damper)** pentru limitarea presiunii la valoarea maximă (evitarea imposibilității deschiderii ușilor — forța la clanță ≤ 100 N);
- Debit de aer de presurizare dimensionat pe scenariul „ușă deschisă" (menținerea vitezei de ≥ 0,75 m/s prin ușa deschisă pe nivelul incendiat) și „uși închise" (menținerea suprapresiunii).

### 13.2 Desfumarea circulațiilor comune

Circulațiile comune orizontale (holuri) se desfumează prin:
- **Evacuare mecanică a fumului** (ventilatoare F400) cu **aport de aer proaspăt de compensare**, dimensionate pe volumul/aria compartimentului de fum;
- SAU desfumare naturală (trape de fum cu deschidere automată la detecție), unde geometria o permite.

### 13.3 Desfumarea parcajului

Tratată la cap. 7.1: **10 vol/h = 20.000 mc/h**, ventilatoare **F400 (400 °C/120 min)**, compensare ≥ 60 % prin guri joase, comandă de la detecție + manual pompieri, alimentare din sursa de siguranță.

### 13.4 Trape de fum și evacuarea căldurii

Pe casa de scări și în punctele înalte se prevăd **trape de fum cu acționare automată** (la detecție) și **manuală** (buton pompieri), pentru evacuarea fumului și a căldurii în faza inițială a incendiului.

### 13.5 Breviar de dimensionare a presurizării casei de scări

Debitul de aer de presurizare se determină pe **scenariul „ușă deschisă"** (ușa de la nivelul incendiat + ușa de la nivelul de evacuare deschise simultan), asigurând o viteză a aerului prin golul ușii de **v ≥ 0,75 m/s** (P118-2, EN 12101-6 sistem de clasă B/C):

Q_ușă = v × A_ușă × n_uși = 0,75 × (0,90 × 2,10) × 2 = 0,75 × 1,89 × 2 = **2,84 mc/s ≈ 10.200 mc/h**

Pe **scenariul „uși închise"**, debitul necesar pentru menținerea suprapresiunii de 50 Pa acoperă neetanșeitățile (fante uși, ~0,02 mp/ușă × 7 uși): Q_scurgeri = A_scurgeri × √(2·Δp/ρ) × 3600 = 0,14 × √(2×50/1,2) × 3600 = 0,14 × 9,13 × 3600 ≈ **4.600 mc/h**. Ventilatorul de presurizare se dimensionează la debitul cel mai mare (scenariu ușă deschisă) ≈ **10.500 mc/h**, cu clapetă de suprapresiune (relief) care evacuează surplusul pentru a limita presiunea la 50 Pa și forța la clanță ≤ 100 N (deschiderea ușii de către persoana care evacuează). Ventilatorul e alimentat din sursa de siguranță și pornit la comanda CDSAI.

### 13.6 Compartimentarea de fum și clapetele antifoc

Circulațiile comune se împart în **compartimente/canton de fum** (arie ≤ 1.600 mp, lungime ≤ 60 m conform P118-2), delimitate prin ecrane de fum (perdele coborâtoare sau grinzi). Tubulatura de ventilare care traversează pereți/planșee cu rol de compartimentare la foc este echipată cu **clapete antifoc EI 90/EI 120** (resort + fuzibil termic 72 °C + servomotor cu revenire), monitorizate și comandate de la BMS/CDSAI. La declanșarea alarmei, clapetele instalației de confort se închid, iar cele ale instalației de desfumare se deschid conform matricei de cauză-efect a scenariului de securitate.

---

## 14. Curenți slabi și BMS (date/voce, CCTV, control acces, efracție, automatizare)

### 14.1 Rețea structurată date/voce

- **Cablare orizontală Cat.6A** (suport 10 GbE), cu **minimum 2 prize RJ45 per post de lucru** (date + voce/telefonie IP), montate în dozele de pardoseală/perete/mobilier;
- **Rack de nivel (IDF)** în camera tehnică de curenți slabi de pe fiecare nivel, cu patch-panel-uri, switch-uri PoE (alimentare AP-uri Wi-Fi, telefoane IP, camere, control acces);
- **Backbone (verticală) pe fibră optică OM4/OS2** de la IDF-uri la **MDF/data center** (topologie stea), cu redundanță;
- **Wi-Fi de acoperire integrală** prin puncte de acces PoE gestionate centralizat;
- **Telefonie IP (VoIP)** integrată în rețeaua de date.

### 14.2 Data center / cameră servere

- **UPS dedicat N+1** (vezi cap. 8.4) + distribuție PDU pe rack-uri;
- **Răcire de precizie (close-control) N+1** cu control strict temperatură/umiditate;
- **Control acces** dedicat (nivel de securitate ridicat);
- **Detecție foarte timpurie VESDA** (aspirație);
- **Stingere cu gaz inert/curat** (opțional, ex. sistem cu agent gazos fără reziduuri) pentru protecția echipamentelor.

### 14.3 Supraveghere video (CCTV)

- **Camere IP PoE** (interior — accese, holuri, lifturi, parcaj; exterior — perimetru, accese auto/pietonale);
- **NVR** cu stocare pentru **minimum 30 de zile** de înregistrare;
- **Analiză video** (detecție de mișcare, numărare, LPR la parcaj), integrată în platforma de securitate.

### 14.4 Control acces și antiefracție

- **Control acces** pe carduri de proximitate/biometrie la accesele principale, lifturi (control etaje), camere tehnice și data center;
- **Interfațare cu detecția de incendiu** — ușile de pe căile de evacuare sunt **fail-safe** (se deblochează automat la alarmă);
- **Sistem antiefracție/detecție de intruziune** (contacte de uși/ferestre, detectoare de mișcare volumetrice) armat în afara programului, cu transmisie la dispecerat/firmă de pază.

### 14.5 Sistemul de management al clădirii (BMS)

BMS-ul este **esențial** pentru o clădire clasă A + nZEB și integrează:
- **HVAC**: CTA, ventiloconvectoare, chillere/pompă de căldură, free-cooling pe entalpie, night purge, DCV pe CO₂;
- **Iluminat**: comandă DALI, senzori de prezență și de lumină naturală, scenarii;
- **Energie**: submeterare pe niveluri/chiriași (electric, termic, apă), monitorizare producție fotovoltaică, optimizare vârf de sarcină;
- **Sanitare/termice**: pompe, boilere (ciclu antilegionella), stații de pompare, alarme de nivel/avarie;
- **Interfață cu CDSAI** (comenzi de siguranță la incendiu);
- **Acces, CCTV, efracție** (integrare securitate);
- **Ascensoare** (monitorizare stare, rechemare la incendiu).

**Protocoale de integrare**: **BACnet/IP** (magistrală principală), **Modbus** (echipamente termice/electrice), **KNX/DALI** (iluminat), **M-Bus** (contorizare). Beneficii operaționale: secvențierea optimă a surselor, free-cooling, night purge, **DCV pe CO₂** (economie 15…30 % la ventilare), mentenanță predictivă și raportare energetică pentru certificarea de performanță.

### 14.6 Dimensionarea rețelei structurate

Numărul de posturi de lucru: la ~85 pers/nivel și densitatea de 1 post/utilizator, rezultă ~85 posturi × 2 prize RJ45 = **~170 prize/nivel** → cca. **1.190 prize date** pe clădire (7 niveluri), plus prize pentru AP-uri Wi-Fi (1 AP / ~120 mp → ~5 AP/nivel), camere CCTV, control acces, telefonie de holuri. Fiecare IDF de nivel conține patch-panel-uri (24/48 porturi) și switch-uri PoE+ (802.3at, 30 W/port) dimensionate cu 20 % rezervă. Lungimea maximă a legăturii orizontale Cat.6A: **≤ 90 m** (canal permanent) + 10 m cordoane → respectată prin poziționarea IDF-urilor central pe nivel.

**Backbone-ul de fibră**: fiecare IDF se leagă la MDF/data center prin **fibră OM4 multimod** (distanțe scurte, 40/100 GbE) cu **cale redundantă** (topologie stea cu inele de siguranță), plus **OS2 monomod** pentru extindere/uplink extern. Sistemul de cablare respectă categoriile de performanță și se certifică (test de canal permanent) la recepție.

### 14.7 Alimentarea neîntreruptă a curenților slabi

Echipamentele de curenți slabi critice (switch-uri core, CCTV NVR, control acces, CDSAI, servere) se alimentează din **UPS-ul dedicat N+1** (cap. 8.4). Echipamentele de securitate la incendiu (CDSAI, avertizare vocală) au **sursă proprie de rezervă** (acumulatori dimensionați la 48 h + 30 min alarmă), independentă de UPS-ul IT, conform cerinței de fiabilitate a instalațiilor de siguranță.

---

## 15. Instalații de transport pe verticală — ascensoare (calcul trafic)

### 15.1 Necesarul de ascensoare (calcul de trafic)

Pentru o clădire de birouri S+P+6E cu ~600 persoane, calculul de trafic în ora de vârf de dimineață (up-peak) impune verificarea a doi indicatori:
- **Capacitatea de transport în 5 minute (HC%)**: ≥ 12…15 % din populație pentru birouri clasă A;
- **Intervalul mediu (AWT/UPP INT)**: ≤ 30 s pentru clasă A (confort ridicat).

Populația de deservit (excluzând parterul de plecare): ~600 pers. Capacitatea necesară în 5 min: 0,13 × 600 ≈ **78 pers/5 min**.

Pentru un ascensor de 13 persoane (1000 kg), viteză 1,6 m/s, cu 7 opriri, capacitatea de transport în 5 min a unui lift este de ordinul ~25…30 pers. Rezultă necesitatea a **3 ascensoare de persoane** (3 × ~26 = ~78 pers/5 min → **HC ≈ 13 %**, INT ≈ 28 s), grupate într-o baterie cu **comandă colectivă în grup (destination control opțional)**.

### 15.2 Configurația adoptată

| Ascensor | Capacitate | Viteză | Opriri | Rol |
|---|---|---|---|---|
| A1…A3 | 1000 kg / 13 pers | 1,6 m/s | S+P+6E (8) | Persoane, grup colectiv |
| A4 (opțional) | 1275 kg / 17 pers | 1,6 m/s | S+P+6E | Marfă/PMR/pompieri |

Cel puțin un ascensor este dimensionat și echipat ca **ascensor de pompieri / de intervenție** (alimentare din sursa de siguranță, cabină și puț cu rezistență la foc, sistem de rechemare și comandă de pompieri) — recomandat la această mărime deși H < 28 m. Toate ascensoarele au **rechemare automată la parter** și scoatere din uz la alarma de incendiu (excepție liftul de pompieri).

### 15.3 Verificarea capacității de transport (breviar)

Timpul de rotație (round trip time — RTT) al unui ascensor cu 8 opriri, viteză 1,6 m/s, cursă 25,5 m, se estimează cu numărul probabil de opriri (S) și de pasageri (P) pentru o cabină de 13 pers (capacitate utilă ~80 % = 10 pers): S ≈ 6, P ≈ 10. RTT ≈ 2H/v + (S+1)·(t_uși + t_accel) + 2P·t_pasager ≈ 32 + 7×8 + 20×1,2 ≈ 32 + 56 + 24 ≈ **112 s**.

- Capacitate 5 min pe cabină: 300 s / 112 s × 10 pers = **~26,8 pers/5 min**;
- Cu 3 ascensoare: 3 × 26,8 = **80 pers/5 min** → HC = 80/600 = **13,4 %** (≥ 12 % clasă A → conform);
- Interval mediu: INT = RTT / n_lifturi = 112 / 3 = **37 s** — la limita clasei A; se optimizează prin comandă cu destinație (destination dispatch) care reduce INT sub 30 s → **conform clasă A**.

### 15.4 Alimentarea și siguranța ascensoarelor

Fiecare grup de ascensoare are tablou electric dedicat, cu protecții și, pentru liftul de pompieri, alimentare de rezervă din grupul electrogen (comutare la căderea rețelei). Puțurile de lift sunt ventilate (evacuare căldură de la motoare + antifum), cu iluminat și priză de serviciu; camera mașinilor (dacă e cazul — la ascensoare fără cameră MRL se elimină) este ventilată și menținută în plaja de temperatură de funcționare a variatorului.

## 16bis. Acustică, antivibrații și protecția seismică a instalațiilor

### 16bis.1 Controlul zgomotului și al vibrațiilor

Echipamentele generatoare de zgomot și vibrații (chillere/pompă de căldură, pompe, ventilatoare CTA, grup electrogen, UPS) se montează pe **sisteme antivibrante** (plăci de cauciuc, arcuri elicoidale, plute inerțiale de beton), dimensionate pentru o **eficiență de izolare ≥ 90 %** (frecvența proprie a suportului mult sub frecvența de excitație a mașinii). Racordurile la conducte și tubulatură se fac prin **compensatoare/racorduri flexibile** (antivibrante), pentru a nu transmite vibrațiile în structură. Traseele de tubulatură și conducte se susțin cu bride cu inserție elastomerică.

Obiectivele acustice interioare: **≤ NR 35 (≈ 35 dB(A))** în birouri și săli de ședință, **≤ NR 40** în circulații. Se prevăd **atenuatoare de zgomot** (tip splitter) pe canalele de introducere și evacuare aer la ieșirea din CTA și înainte de grilele din spații; grupul electrogen se amplasează în cameră tratată acustic cu atenuatoare pe traseele de admisie/evacuare aer și eșapament cu tobă de amortizare. Camera tehnică de sub spații ocupate primește tratament de izolare la zgomot de impact.

### 16bis.2 Protecția antiseismică a instalațiilor (P100-1, clasa de importanță II)

Fiind o clădire de clasă de importanță seismică II (γ_I,e = 1,20), instalațiile se ancorează și se contravântuiesc antiseismic conform P100-1 (cap. instalații) și practicilor de tip seismic bracing:
- **Ancorarea echipamentelor** grele (chillere, boilere, rezervoare, UPS, baterii, grup) la structură cu prezoane calculate la forța seismică orizontală F_s = γ · a_g · β · m;
- **Contravântuirea traseelor** suspendate (tubulatură mare, conducte incendiu, jgheaburi de cabluri) cu tiranți transversali și longitudinali la intervale normate;
- **Racorduri flexibile** la traversarea rosturilor seismice/de tasare (conducte, tubulatură, cabluri) — preiau deplasările relative fără avarie;
- **Valve seismice** de închidere automată pe alimentarea cu gaze (dacă se prevede cazan) la depășirea unui prag de accelerație;
- Traseele instalațiilor de siguranță la incendiu (pompe, desfumare) sunt dimensionate să rămână funcționale post-seism (elemente de prindere suplimentare).

## 16ter. Recepția, punerea în funcțiune (commissioning) și probele

Înainte de recepție, instalațiile se supun probelor și punerii în funcțiune reglementate:

| Instalație | Probă / verificare | Criteriu |
|---|---|---|
| Apă rece/caldă | Probă de presiune (hidraulică) | 1,5 × p_regim, min. 6 bar, fără scădere 1 h |
| Canalizare | Probă de etanșeitate + scurgere | fără scurgeri; garda hidraulică menținută |
| Termice | Probă la rece + la cald + spălare/reglaj hidraulic | echilibrare debite ± 10 % |
| Ventilare-climatizare | Măsurare debite aer + reglaj (balansare) | debite proiectate ± 15 %; NR ≤ 35 |
| Electrice | Măsurare rezistență izolație + continuitate PE + priză pământ | R_izol ≥ 0,5 MΩ; R_priză ≤ 1 Ω |
| Iluminat | Măsurare niveluri (luxmetru) + siguranță | 500 lx birou; ≥ 1 lx evacuare |
| Paratrăsnet | Măsurare continuitate coborâri + priză | R ≤ 10 Ω (clasă II) |
| Stingere incendiu | Probă hidraulică rețea + probă pompe + debit hidranți | Q, H conforme; pornire automată pompe |
| Detecție (IDSAI) | Test fiecare detector/buton + matrice cauză-efect | 100 % puncte; comenzi automate corecte |
| Desfumare/presurizare | Măsurare debite + suprapresiune + forță ușă | 0,75 m/s; 20…50 Pa; ≤ 100 N la clanță |

**Punerea în funcțiune integrată (integrated commissioning)** verifică matricea de cauză-efect a scenariului de securitate (declanșarea coordonată detecție → oprire ventilare → desfumare → presurizare → deblocare acces → rechemare lifturi → transmisie ISU) și secvențele BMS (secvențiere surse, free-cooling, DCV). Se întocmesc procese-verbale de probe, cartea tehnică a construcției (partea de instalații) și instrucțiunile de exploatare.

## 16quater. Exploatare, mentenanță și monitorizarea consumurilor

- **Mentenanță preventivă planificată** prin BMS (contoare de ore de funcționare, alarme de defect, mentenanță predictivă pe tendințe);
- **Igiena instalațiilor** de ventilare (schimbare filtre ePM1/ePM10 la Δp prag, curățare recuperatoare, dezinfecție tubulatură) și sanitare (ciclu antilegionella automat, spălare puncte de consum rar utilizate);
- **Submeterare** energetică pe utilități (electric, termic, frig, apă, gaz) și pe zone/chiriași — bază pentru repartizarea costurilor și pentru raportarea de performanță energetică;
- **Optimizare continuă** (continuous commissioning) pe baza datelor BMS: ajustare setpoint-uri, orare, praguri DCV, curbe de reglaj în funcție de temperatura exterioară.

---

## 16. Eficiență energetică nZEB (Legea 372/2005, Mc001)

### 16.1 Pachetul de măsuri nZEB

Clădirea este proiectată pentru a atinge standardul **nZEB (nearly Zero-Energy Building)**, prin cumularea următoarelor măsuri:

| Măsură | Contribuție |
|---|---|
| Anvelopă performantă (U perete 0,25; tâmplărie U 1,0; control solar g 0,40) | Reducere necesar încălzire/răcire |
| Pompă de căldură reversibilă SCOP 3,8 / SEER 4,5 | Sursă cu energie regenerabilă aerotermală |
| Recuperare de căldură CTA η ≥ 75 % (283 kW iarnă) | −75 % energie tratare aer proaspăt |
| Free-cooling + night purge | Răcire gratuită în semisezon/noapte |
| Iluminat LED cu DALI + daylight + prezență (≤ 8 W/mp) | LENI redus |
| DCV pe CO₂ (ventilare la cerere) | −15…30 % energie ventilare |
| BMS de optimizare energetică + submeterare | Reglaj fin, mentenanță predictivă |
| Instalație fotovoltaică pe terasă | Producție RES on-site |

### 16.2 Instalația fotovoltaică

Suprafața utilă de terasă disponibilă pentru panouri (după deducerea echipamentelor, umbririlor și acceselor): **~350 mp**. La o densitate de putere de ~170 W/mp (module + spațiere), rezultă:

**P_FV ≈ 60 kWp**

Producția anuală estimată (iradiere specifică zonă ≈ 1.250 kWh/kWp·an, performance ratio inclus):

**E_FV = 60 × 1.250 = 75.000 kWh/an = 75 MWh/an**

Sistemul funcționează în regim de **prosumator** (invertoare cu injecție reglementată + autoconsum), cu **sinergie sezonieră** favorabilă: vârful de producție solară (vară, prânz) coincide cu vârful de răcire — autoconsum ridicat.

**Configurația FV**: ~350 module de ~380 Wp (Ø ~1,95 mp/modul → ~350 mp cu spațiere pentru neumbrire și acces mentenanță), grupate în stringuri pe **invertoare trifazate** (2…3 invertoare de ~20…30 kW) cu monitorizare per string și limitator de injecție (zero-export sau injecție reglementată conform contractului de prosumator). Puterea de vârf 60 kWp se corelează cu puterea aparentă a clădirii (328 kVA) → factor de penetrare FV ~18 %, sub pragul care ar necesita studii de racordare complexe. Structura de montaj pe terasă este balastată (fără perforarea hidroizolației) sau ancorată cu plăci de etanșare, verificată la încărcarea din vânt și zăpadă. Se prevede monitorizare a producției în BMS (kWh, autoconsum vs. injecție) pentru raportarea energetică.

**Estimarea producției lunare** (profil sezonier): iarnă ~2,5 MWh/lună, echinocții ~6,5 MWh/lună, vară ~9 MWh/lună → total ~75 MWh/an, cu **autoconsum estimat ~70 %** (52 MWh consumate direct, restul injectat), datorită suprapunerii cu programul de birou (zi, zile lucrătoare) și cu răcirea estivală.

### 16.3 Bilanțul energetic și încadrarea nZEB

Consumul de energie primară estimat pentru clădire, după aplicarea măsurilor: **~90…110 kWh/mp·an** (energie primară totală), în intervalul de referință pentru clădiri de birouri nZEB din România (**prag ≤ 90…120 kWh/mp·an**, în funcție de zona climatică). Ponderea energiei din surse regenerabile (aerotermal PC + fotovoltaic) depășește pragul minim de **≥ 10 % RES** cerut de reglementări.

**Certificatul de performanță energetică (CPE)** și breviarul Mc001 detaliat se elaborează la faza finală de proiectare, pe baza calculelor complete pe zone termice și a datelor reale ale echipamentelor selectate.

### 16.4 Breviar de bilanț energetic anual (estimativ)

Estimarea consumurilor anuale de energie finală pe utilizări, raportate la suprafața utilă (5.000 mp):

| Utilizare | Consum specific (kWh/mp·an) | Total (MWh/an) | Observații |
|---|---|---|---|
| Încălzire | 15 | 75 | PC SCOP 3,8 + recuperare 75 % |
| Răcire | 20 | 100 | SEER 4,5 + free-cooling |
| Ventilare (ventilatoare) | 8 | 40 | SFP ≤ 1,5; DCV CO₂ |
| Iluminat | 10 | 50 | LED ≤ 8 W/mp + daylight/prezență |
| Prize/IT/echipamente | 30 | 150 | consum de proces (neinfluențat de anvelopă) |
| Ascensoare + auxiliare | 5 | 25 | grup colectiv eficient |
| **Total energie finală** | **~88** | **~440** | — |

Conversia în **energie primară** (factori Mc001: electric ≈ 2,6…3,0; scade pe măsura decarbonizării rețelei) și scăderea aportului fotovoltaic (75 MWh/an autoconsum) conduc la un indice de energie primară de ordinul **~90…110 kWh/mp·an**, în plaja nZEB pentru birouri. Contribuția RES: aportul aerotermal al pompei de căldură (energie regenerabilă din aer) + fotovoltaic → **peste 10 % RES** (cerință minimă). Fotovoltaicul acoperă ~17 % din energia finală electrică (75 din ~440 MWh), cu autoconsum ridicat datorită sinergiei cu vârful de răcire estival.

### 16.5 Măsuri de reducere a amprentei de carbon

- Agenți frigorifici cu **GWP redus** (ex. R32/R1234ze) în locul celor clasici, cu detecție de scurgeri;
- **Electrificarea** surselor termice (pompă de căldură) — evită arderea locală și beneficiază de decarbonizarea progresivă a rețelei;
- Pregătire pentru **încărcare vehicule electrice** (EV-ready) în parcaj — tubulatură și rezervă de putere pentru stații de încărcare;
- Materiale de instalații cu conținut reciclat și durabilitate ridicată; recuperarea apelor pluviale pentru irigare/apă tehnologică (opțional).

---

## 17. Concluzii, sinteză indicatori și verificare tehnică

### 17.1 Sinteza soluțiilor și a indicatorilor de dimensionare

| Instalație | Soluție adoptată | Parametru de calcul |
|---|---|---|
| Apă rece | Branșament DN 40 + grup pompare turație variabilă (2+1) | qc = 1,5 l/s; H_nec = 3,95 bar |
| Apă caldă (ACM) | Boilere 2×500 l de la pompă căldură + antilegionella + recirculare | 3 mc/zi; Φ preparare ≈ 29 kW |
| Canalizare menajeră | Gravitațional + stație pompare tocător subsol | Q_ww = 4,67 l/s; colector Dn 160 |
| Canalizare pluvială | Sistem sifonic 4 receptoare + preaplin + atenuare | 21 l/s; retenție 15 mc @ 5 l/s |
| Sursă termică/frig | Pompă de căldură reversibilă 4 țevi + back-up | Φ_înc 175 kW; SCOP 3,8; Φ_frig 300 kW |
| Aer proaspăt | 2 CTA × 15.000 mc/h, recuperare η ≥ 75 % | 30.000 mc/h; recuperat 283 kW |
| Climatizare | Aer primar + ventiloconvectoare 4 țevi | 300 kW (60 W/mp); NR 35 |
| Ventilare/desfumare parcaj | 6 vol/h exploatare + 10 vol/h desfumare F400 | 12.000 / 20.000 mc/h |
| Electrice | Trafo 400 kVA; UPS 60 kVA N+1; grup 150 kVA | Pc ≈ 302 kW; S ≈ 328 kVA; cos φ ≥ 0,92 |
| Iluminat | LED DALI + daylight + prezență | 500 lx birouri; ≤ 8 W/mp |
| Priză pământ + paratrăsnet | Priză fundație R ≤ 1 Ω + LPS clasă II | 4 coborâri; SPD T1+T2+T3 |
| Stingere incendiu | Sprinklere OH2 + hidranți interiori/exteriori + coloană uscată | Rezervă 100 mc; pompare 25 l/s @ 70 mCA |
| Detecție (IDSAI) | Adresabilă totală + avertizare vocală EN 54-16 | CDSAI 48h+30min |
| Desfumare | Presurizare casă scări 20…50 Pa + F400 circulații/parcaj | ≥ 0,75 m/s la ușă |
| Curenți slabi/BMS | Cat.6A + fibră OM4 + BACnet/IP; data center N+1 | CCTV 30 zile |
| Ascensoare | 3 (+1) lifturi 1000 kg, 1,6 m/s, grup colectiv | HC ≈ 13 %; INT ≈ 28 s |
| nZEB | FV 60 kWp + PC + recuperare + BMS + LED | ~90…110 kWh/mp·an; ≥ 10 % RES |

### 17.2 Coordonare interdisciplinară

Instalațiile se coordonează cu specialitățile de arhitectură (ghene, plenumuri de tavan de 0,60 m, camere tehnice, trasee verticale), structură (goluri în plăci, sarcini echipamente pe terasă și subsol) și securitate la incendiu (compartimentări, clapete antifoc, rezistențe la foc ale traseelor de siguranță). Traseele principale (ghene sanitare, electrice, curenți slabi, tubulatură HVAC) sunt prevăzute cu rezervă de 20 % pentru extinderi și mentenanță.

### 17.3 Verificarea tehnică (Legea 10/1995)

Documentația se supune verificării tehnice de calitate de către **verificatori de proiecte atestați MDLPA**, pe specialitățile:

| Cerință | Verificator | Domeniu acoperit |
|---|---|---|
| **Is** | Verificator instalații sanitare | Alimentare apă, ACM, canalizare menajeră/pluvială, stingere cu apă (partea hidraulică) |
| **It** | Verificator instalații termice | Sursă termică/frig, distribuție încălzire/răcire, ventilare-climatizare, desfumare |
| **Ie** | Verificator instalații electrice | Curenți tari, curenți slabi, iluminat (inclusiv de securitate), detecție incendiu, sursă de siguranță, paratrăsnet |
| **Ig** | Verificator instalații gaze (dacă se prevede cazan pe gaz) | Instalația de utilizare gaze naturale |

Scenariul de securitate la incendiu (Ordin MAI 129/2016) fundamentează soluțiile PSI și stă la baza obținerii **avizului/autorizației de securitate la incendiu ISU** (HG 571/2016).

### 17.4 Avize și acorduri necesare

- **Apă–canal**: aviz de racordare (branșament apă + racord canalizare menajeră și pluvială, debit deversat);
- **Energie electrică**: ATR/aviz de racordare + aviz de prosumator pentru instalația fotovoltaică;
- **Gaze naturale** (dacă se prevede cazan pe gaz): aviz de racordare + proiect instalație de utilizare (I6, NTPEE), cu detector de gaz + electrovalvă de siguranță în centrala termică, ventilare permanentă a încăperii cazanului și evacuare a gazelor de ardere prin coș propriu; instalația de gaz se verifică de verificator atestat Ig;
- **ISU**: aviz de securitate la incendiu pe baza scenariului de securitate;
- **Mediu**: după caz (gestionarea apelor pluviale, agenți frigorifici, grup electrogen).

### 17.5 Notă privind stadiul documentației

Dimensionările prezentate în acest memoriu au caracter **preliminar, la nivel de DTAC**, fiind fundamentate pe ipoteze de calcul acoperitoare și pe valori normate. La faza de **proiect tehnic (PT)** se elaborează **breviarele de calcul complete** (bilanț termic pe zone, calcul hidraulic detaliat al rețelelor, bilanț electric definitiv pe circuite, calcul de trafic ascensoare cu simulare, calcul detaliat sprinklere pe zonă de calcul), **schemele funcționale**, **planurile de execuție** și **specificațiile tehnice** ale echipamentelor, cu selectarea concretă a produselor și verificarea prin note de calcul semnate de proiectanții de specialitate și avizate de verificatorii atestați.
