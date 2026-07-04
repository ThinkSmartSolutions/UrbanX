## 1. Date generale și tema de proiectare

Memoriu de instalații, faza D.T.A.C., pentru **creșă/grădiniță cu program prelungit, ~90 copii, P+1**. Tratează instalațiile sanitare, termice, ventilare-climatizare, electrice, gaze, stingere/semnalizare incendiu și curenți slabi.

| Parametru | Valoare |
|---|---|
| Capacitate | ~90 copii + ~25 personal |
| Regim | P+1 |
| Sc / Sd | ~620 / ~1.180 mp |
| Clasa importanță seismică | II |
| Grad RF | II |
| Zona climatică | III (temp. calcul iarnă −18°C) |

**Cadru normativ:** I9/2015 (sanitare), I13/2015 (termice), I5/2010 (ventilare), I7/2011 (electrice), NP 061-2002 (iluminat), P118-2/2013 (stingere), P118-3/2015 (detectare-semnalizare), NTPEE-2018 (gaze), OMS 119/2014 (igienă copii), C107/2005, Legea 372/2005 (nZEB), SR EN 12831, SR EN 62305. Obiectivul (învățământ, copii greu evacuabili) impune aviz/autorizație ISU (HG 571/2016) și aviz sanitar DSP.

## 2. Instalații sanitare (I9/2015)

Alimentare apă rece din rețeaua publică (branșament + apometru); grup de ridicare presiune (hidrofor turație variabilă) pentru etaj + hidranți. Canalizare menajeră gravitațională la rețea; pluvială separată.

**Cerințe copii (OMS 119):** GS separate cu obiecte la înălțime redusă; apă caldă cu temperatură limitată anti-opărire; cabinet+izolator cu GS propriu; bloc alimentar cu separator de grăsimi.

**Necesar de apă:**

| Categorie | Debit specific | Nr. | Consum zilnic |
|---|---|---|---|
| Copii | 50 l/copil·zi | 90 | 4.500 l/zi |
| Personal | 30 l/pers·zi | 25 | 750 l/zi |
| Preparare hrană | 20 l/masă × 115 | — | 2.300 l/zi |
| Spălătorie | forfetar | — | 500 l/zi |
| **Total** | | | **≈ 8.050 l/zi** |

Qzi,med ≈ 8,05 mc/zi; Qzi,max = 8,05×1,30 ≈ 10,47 mc/zi; Qo,max = 10,47×2,0/10 ≈ 2,09 mc/h ≈ 0,58 l/s.

**Debit de calcul (echivalenți I9):** qc = a·b·c·√(ΣE) + 0,004·ΣE. ΣE ≈ 26,4 (56 obiecte) → qc ≈ 0,25·√26,4 + 0,004·26,4 ≈ **1,39 l/s**.

**Dimensionare (viteză 0,7-1,5 m/s):**

| Tronson | qc (l/s) | Diametru | v (m/s) |
|---|---|---|---|
| Branșament general | 1,39 | Ø63 PEHD (DN50) | 0,9 |
| Coloană principală | 1,20 | Ø50 (DN40) | 1,1 |
| Coloane etaj | 0,60 | Ø32 (DN25) | 1,0 |
| Legături GS copii | 0,30 | Ø25 (DN20) | 0,9 |

Conducte PP-R/PE-Xa izolate termic. **ACM:** ~40% din consum (~3,2 mc/zi), boiler bivalent 500-800 l (sursă termică + serpentină solară), recirculare pe coloane lungi (temperatură la consum în ≤30 s, anti-Legionella). **Anti-Legionella:** boiler ≥ 60°C cu ciclu termic, distribuție/recirculare ≥ 55°C.

**Protecția anti-opărire (critic copii):** ACM stocat/circulat la temperatură ridicată, dar la punctele accesibile copiilor: baterii termostatice cu limitare **max. 38°C** (lavoare/dușuri copii), vane de amestec **max. 43°C** pe ramuri copii; baterii fără muchii, debit limitat.

**Canalizare** din PP fonoabsorbant: racord lavoar Ø40/3%, WC Ø110/2%, coloană Ø110, colector Ø160/1,5%, racord exterior Ø160-200. Coloane ventilate peste acoperiș.

**Separator de grăsimi** la bloc alimentar (SR EN 1825, NS 2-4 l/s), îngropat exterior, vidanjabil; apele de la GS nu trec prin separator.

## 3. Instalații termice (I13/2015)

Sursă hibridă/eficientă nZEB: **pompă de căldură aer-apă** (COP ridicat) + panouri solar-termice ACM (recomandat); alternativ centrală în condensație pe gaz (η > 105%). Distribuție la parametri joși (compatibil pompă de căldură + pardoseală radiantă).

**Parametri de confort (copii — termoreglare imatură, stau pe pardoseală):**

| Încăpere | θi de calcul |
|---|---|
| Săli de grupă | +22°C |
| Dormitoare | +22…+24°C |
| GS copii / zonă schimbat | +24°C |
| Săli de mese | +20°C |
| Bloc alimentar | +18°C |
| Vestiare/holuri | +18…+20°C |
| Centrală/tehnic | +10°C |

Umiditate relativă 40-60%.

**Necesar de căldură (SR EN 12831):** ΦHL = ΦT + ΦV. Coeficienți U (anvelopă nZEB): perete 0,25, terasă 0,15, planșeu sol 0,28, tâmplărie 0,90 W/m²K.

| Zonă | Su (mp) | Necesar (W) |
|---|---|---|
| Săli de grupă | 380 | 24.700 |
| Dormitoare | 160 | 11.200 |
| GS copii | 90 | 7.200 |
| Săli mese | 90 | 4.950 |
| Bloc alimentar | 70 | 3.500 |
| Administrativ/cabinet | 80 | 4.400 |
| Vestiare/circulații | 210 | 9.450 |
| Tehnic | 60 | 1.800 |
| **Total** | 1.140 | **≈ 67,2 kW** |

Putere sursă (rezervă 15% + ACM): **≈ 80-90 kW**; pompă de căldură + rezervor tampon ≥ 300 l + sursă de vârf (bivalent).

**Corpuri de încălzire — siguranța copiilor (temperatură superficială limitată):**
- **Săli/dormitoare — ÎNCĂLZIRE PRIN PARDOSEALĂ RADIANTĂ (recomandat):** agent 35-40°C tur (compatibil pompă de căldură), temperatura pardoselii **max. 26°C** zonă ședere; fără corpuri fierbinți accesibile.
- **Holuri/birouri/bloc alimentar:** radiatoare oțel, cu **măști/carcase de protecție** în spațiile accesibile copiilor (muchii rotunjite) sau ventiloconvectoare la înălțime.

Distribuție bitubulară, butelie de egalizare, distribuitor-colector, pompe turație variabilă, automatizare cu compensare după temperatura exterioară + reducere nocturnă, grupuri de amestec termostatice pe pardoseala radiantă, vase de expansiune + supape de siguranță.

## 4. Instalații de ventilare-climatizare (I5/2010)

Calitatea aerului interior critică (densitate mare de copii). **Ventilare mecanică cu recuperare de căldură** (CTA cu recuperator η ≥ 80% — nZEB); ventilare separată bloc alimentar (hotă); climatizare vară.

**Debite aer proaspăt:**

| Tip spațiu | Debit specific | Schimburi/oră |
|---|---|---|
| Săli de grupă | 20-25 mc/h·copil | 3-5 |
| Dormitoare | 15-20 mc/h·copil | 3 |
| GS copii | — | 8-10 (evacuare) |
| Bloc alimentar | — | 15-20 (hotă) |
| Cabinet/izolator | 30 mc/h·pers | 4-6 |

**Total introducere aer proaspăt ≈ 4.000 mc/h** (1-2 CTA cu recuperare). Recuperare (η=80%, iarnă): Precuperat ≈ 0,34·4.000·(22−(−18))·0,80 ≈ **43,5 kW** economisiți (esențial nZEB).

**Bloc alimentar:** hotă inox cu filtre grăsime, ventilator rezistent la temperatură/grăsimi, evacuare peste acoperiș, compensare aer 85% din evacuat, depresiune față de spațiile curate.

**Climatizare vară:** VRV/VRF sau ventiloconvectoare (pompă de căldură reversibilă); +24…+26°C, diferență max. 6-7°C față de exterior; unități inaccesibile copiilor, v < 0,15 m/s în zona ocupată.

## 5. Instalații electrice (I7/2011)

Branșament trifazat cu BMPT la limita de proprietate → TEG în încăpere tehnică cu acces restricționat.

**Bilanț de puteri:**

| Consumator | Pi (kW) | Kc | Pa (kW) |
|---|---|---|---|
| Iluminat normal LED | 8,0 | 0,85 | 6,8 |
| Iluminat securitate | 1,5 | 1,0 | 1,5 |
| Prize uz general | 20,0 | 0,30 | 6,0 |
| Bloc alimentar | 35,0 | 0,50 | 17,5 |
| Pompă de căldură/centrală | 25,0 | 0,70 | 17,5 |
| CTA + pompe | 10,0 | 0,70 | 7,0 |
| Climatizare | 15,0 | 0,60 | 9,0 |
| Curenți slabi + IDSAI | 3,0 | 0,80 | 2,4 |
| Hidrofor | 4,0 | 0,50 | 2,0 |
| **Total** | 121,5 | — | **≈ 70 kW** |

Sc = 70/0,92 ≈ 76 kVA; Ic = 76.000/(1,73·400) ≈ **110 A** → branșament 3×125 A, cablu 4×35-50 mm² (cădere tensiune < 3%). Compensare factor de putere dacă se impune.

**Iluminat (NP 061), Ra ≥ 80, 3000-4000K:**

| Spațiu | Em (lx) | UGR |
|---|---|---|
| Săli de grupă | 300-500 | 19 |
| Dormitoare | 100 (veghe 20-50) | 22 |
| GS copii | 200 | 25 |
| Bloc alimentar | 500 | 22 |
| Cabinet medical | 500 | 19 |
| Circulații/scări | 100-150 | 25 |

Corpuri LED, difuzoare mate anti-orbire, montaj inaccesibil copiilor, IP adaptat, senzori prezență/luminozitate (nZEB).

**Prize — protecție copii (OBLIGATORIU):** toate prizele accesibile copiilor cu **obturatoare de protecție**; montaj la înălțime inaccesibilă (>1,7 m) unde e posibil; toate circuitele de prize cu **DDR 30 mA**; în GS zone de protecție I7; circuite separate pe funcțiuni.

**Iluminat de securitate:** evacuare (≥1 lx pe ax), indicatoare ieșire, antipanică săli (≥0,5 lx), marcare hidranți, autonomie 1-3 h.

**Legare la pământ:** priză de fundație + electrozi verticali, R ≤ 4 Ω (comună cu paratrăsnet) / ≤ 1 Ω (cu curenți slabi), egalizare potențiale (BEP), întrerupere automată (DDR).

**Paratrăsnet (SR EN 62305):** evaluare risc R1 vs RT=10⁻⁵; clădire cu copii (agravant) → **rezultă necesitatea IPT**, nivel de protecție III (sau superior). Captare pe acoperiș, min. 2 coborâri, priză de pământ, SPD tip 1+2 la TEG + tip 2/3 la tablouri secundare.

## 6. Instalații de gaze (NTPEE-2018)

*(Doar în varianta cu centrală pe gaz; în varianta pompă de căldură obiectivul poate fi complet electric — preferat nZEB.)* Branșament cu stație reglare-măsurare în firidă ventilată, presiune joasă. Consum: centrală ~85 kW → ~9 mc/h (+ eventual utilaje bucătărie ~3 mc/h). **Siguranță:** detector automat de gaz metan + electrovalvă de siguranță (întrerupe automat la detecție), ventilare permanentă centrală, evacuare gaze arse prin coș etanș, centrală fără acces din spațiile copiilor, ușă rezistentă la foc.

## 7. Instalații pentru securitatea la incendiu (P118-2, P118-3)

**IDSAI — OBLIGATORIE** (ocupare copii, indiferent de suprafață, P118-3), **acoperire totală**: centrală adresabilă la post permanent supravegheat (cu sursă de rezervă), detectoare de fum optice în toate spațiile, detectoare de temperatură în bucătărie, butoane manuale pe căi de evacuare, sirene acustice+optice. Comandă automată: oprire ventilare, deblocare uși, semnalizare la personal pentru evacuarea copiilor.

**Hidranți interiori (după caz, verificat în scenariul SU):** debit 2,1 l/s/jet, 1 jet, funcționare ≥ 10 min, rezervă ≈ 1,3 mc; echipați cu furtun/țeavă, amplasați ca fiecare punct să fie atins de un jet; grup de pompare dacă presiunea e insuficientă. Desfumarea caselor de scări/circulațiilor (dacă e cazul), alimentare de rezervă a consumatorilor de securitate.

## 8. Instalații de curenți slabi

- **Date-voce:** cablare structurată cat. 6 UTP, rack comunicații, fibră optică operator, Wi-Fi controlat.
- **Control acces + supraveghere:** yală electromagnetică + videointerfon la poartă și ușa principală (esențial pt siguranța copiilor); CCTV IP la intrări/curte/holuri/perimetru (NU în GS și dormitoare — GDPR minori), înregistrare pe NVR; registru electronic acces.
- **Interfonie + apel de urgență:** interfonie secretariat-cabinet-săli; buton de panică în cabinet medical și GS; sonorizare/anunțuri (util și pentru evacuare).

## 9. Măsuri nZEB (Legea 372/2005)

- **Surse regenerabile:** fotovoltaic pe acoperiș (10-20 kWp, autoconsum), solar-termic ACM (2-4 mp captatori), pompă de căldură (sursă principală).
- **Eficiență:** ventilare cu recuperare (η ≥ 80%), iluminat LED cu senzori, anvelopă performantă, BMS, pompe/ventilatoare turație variabilă, contorizare consumuri.
- **Bilanț:** consum energie primară sub pragul nZEB, cotă regenerabile peste minimul legal.

## 10. Măsuri specifice de siguranță pentru copii (sinteză)

| Domeniu | Măsură |
|---|---|
| Apă caldă (anti-opărire) | baterii termostatice max. 38°C lavoare/dușuri; vane amestec max. 43°C |
| Încălzire (anti-arsuri) | pardoseală radiantă (max. 26°C), radiatoare mascate/protejate |
| Prize | obturatoare de protecție + montaj inaccesibil + DDR 30 mA |
| Corpuri iluminat | montaj inaccesibil, difuzoare mate |
| Obiecte sanitare | cotă redusă, muchii rotunjite |
| Gaze | detector + electrovalvă; centrală fără acces copii |
| Incendiu | IDSAI acoperire totală + iluminat de securitate abundent (copii greu evacuabili) |
| Ventilare | aer proaspăt în exces, fără curenți direcți (v < 0,15 m/s) |
| Acces | control acces + supraveghere perimetru (nu în GS/dormitoare) |

## 11. Concluzii și verificarea tehnică

Soluțiile asigură: confort termic ridicat (22-24°C) cu sisteme sigure (pardoseală radiantă); calitatea aerului prin ventilare cu recuperare; siguranța copiilor (anti-opărire, prize protejate, temperaturi limitate, IDSAI acoperire totală); conformitate nZEB; respectarea normativelor (I9, I13, I5, I7, NP 061, P118-2/3, NTPEE, OMS 119, C107, Legea 372).

**Verificare tehnică (Legea 10/1995):** verificatori atestați MDLPA — **Is** (sanitare), **It** (termice/ventilare/gaze), **Ie** (electrice/curenți slabi/paratrăsnet), în special cerința **C — securitate la incendiu**. Documente: scenariu de securitate la incendiu (→ aviz/autorizație ISU), aviz sanitar DSP, avize de racordare utilități, referatele verificatorilor.

*Dimensionările finale, planurile și breviarele complete se elaborează la faza P.T. + D.D.E., cu respectarea reglementărilor și a condițiilor din avize.*
