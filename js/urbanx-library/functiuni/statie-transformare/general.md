# MEMORIU TEHNIC GENERAL — STAȚIE DE TRANSFORMARE 110/20 kV (DTAC)

## 1. Date generale

Piesă scrisă generală DTAC (Legea 50/1991 Anexa 1) pentru **stație de transformare 110/20 kV, tip exterior izolată în aer (AIS)** pe 110 kV + celule MT 20 kV interior, racord SEN. Transformă 110→20 kV, racord prin LEA/LES 110 kV, evacuare producție regenerabilă, distribuție MT.

| Parametru | Valoare |
|---|---|
| Tensiuni | 110/20 kV (Um 123/24 kV) |
| Putere trafo | 2×25 MVA (etapa I) → 2×40 MVA (dezvoltare) |
| Schema | dublă bară + transfer / „H" (n-1) |
| In bare 110 / 20 | 1250 / 1250-2000 A |
| Isc 110 / 20 | 31,5 / 16-20 kA (1 s) |
| BIL 110 / 20 | 550 / 125 kV |
| Neutru 20 kV | bobină Petersen / rezistor |
| Categoria importanță | **B** (infrastructură energetică critică; C clădire comandă) |
| Clasa seismică | **II (γI 1,2)** echipament critic |
| Grad RF | II (I-II boxe trafo ulei) |

**Cadru normativ:** Legea 50/1991, 10/1995 (7 cerințe), HG 907/2016, 766/1997, 350/2001, Ord. 839/2009; Legea energiei 123/2012, Ord. ANRE racordare (ATR); **NTE 001/03 (coordonare izolație), NTE 003 (LEA), NTE 007 (stații), PE 101/101A/103/104/111/116, SR EN 61936-1 (>1 kV), SR EN 50522 (împământare), IEC 62271 (aparataj), IEC 60076 (trafo), IEC 60071 (coordonare izolație)**; P118-1/2/3, HG 571/2016, Legea 307/2006, Ord. MAI 129/2016; OUG 195/2005, Legea 292/2018, HG 1132/2008 (baterii), OMS 119/2014 (zgomot), limite CEM (1999/519/CE).

## 2. Categorie și clasă

**HG 766/1997 (6 criterii):** ansamblu **categoria B — importanță deosebită** (infrastructură critică, întreruperea afectează teritoriu extins); clădire comandă poate C. → verificare verificatori atestați + urmărire specială + control ISC. **P100-1/2013 tab. 4.2:** echipament critic + poluare accidentală → **clasa II γI 1,2** (clădire comandă + structuri-suport echipament + baterii cc + comandă); anexe necritice clasa III. ag 0,15-0,35g, TC 0,7-1,6s (amplasament). **Grad RF:** clădire comandă/boxe trafo II (I-II), platformă 110 kV exterior fără clasificare; trafo ulei → pereți antifoc/distanțe + cuvă retenție + stingere apă pulverizată (putere mare).

## 3. Cadru normativ complet

(vezi §1 — construcții + energetic NTE/PE + standarde SR EN/IEC + PSI + mediu).

## 4. Tipuri de stații — tipul tratat

| Criteriu | Tipuri |
|---|---|
| Aparataj | exterior (110 kV, teren mare, cost redus) / interior (urban, GIS) |
| Izolație | **AIS aer** (distanțe mari) / GIS SF₆ (compact, cost 2-3×, GWP) / hibrid |
| Transformare | **110/MT (tratat)** / MT/JT / ÎÎT-ÎT |

**Adoptat: 110/20 kV exterior AIS + celule MT interior + 2×25 MVA pe cuve retenție.** Motiv: spațiu disponibil, cost optim, matur, fără SF₆ (GWP ridicat).

## 5. Necesitate și oportunitate

Întărire capacitate distribuție (stații existente la limită) + evacuare regenerabile (nod 110 kV + reglaj tensiune + flux bidirecțional) + **fiabilitate n-1** (2 trafo + bare secționate) + reducere pierderi (transformare aproape de consumator). Corelat PDRED operator + ATR.

## 6. Încadrare urbanistică

Zonă tehnică/industrială/edilitare. **POT/CUT foarte reduse** (POT ~3-5%, CUT ~0,03-0,05) dar **suprafață tehnică ocupată mare** (celule 110 kV + trafo + drumuri). Regim înălțime dominat de **portale 110 kV (H 8-12 m)** nu clădirea comandă (parter H 4-5 m). Teren ~8.000-12.000 mp, Sc clădire ~250-400 mp. **Servituți LEA 110 kV:** culoar protecție ~37 m (2×18,5 ax), gabarit conductor-sol ≥6-7 m (Legea 123/2012 + NTE 003/PE 104).

## 7. Descriere generală

(a) **110 kV AIS exterior:** schema dublă bară + transfer / „H"; celule linie (întreruptor SF₆/vid + separatoare + TC/TT + descărcătoare MOSA), celule trafo, cuplă/măsură, pe cadre metalice zincate. (b) **Transformatoare 2×25 MVA** cu reglaj sub sarcină (OLTC ONAN/ONAF, IEC 60076) pe cuve retenție. (c) **20 kV interior:** celule anvelopă metalică (IEC 62271-200: sosire trafo, plecări, măsură, cuplă, servicii proprii, tratare neutru Petersen). (d) **Clădire comandă:** comandă/protecții/SCADA + camera celule MT + **camera baterii cc** (110/220 V, ventilație H₂) + servicii proprii ca + GS + spații tehnice. (e) **Servicii proprii:** trafo 20/0,4 kV + redresoare + baterii cc + grup electrogen. (f) racord LEA/LES 110 kV (portaluri + coborâri). **Etapizare:** I (2×25) → dezvoltare (2×40, celule + bară suplimentare).

## 8. Protecția mediului

**Cuvă retenție ulei (100% ulei trafo + rezervă):** V_cuvă ≥ 1,00·V_ulei,max + V_apă; trafo 25 MVA ulei ~18-22 mc → **V_cuvă ≥25 mc**; b.a. impermeabil + grătar/pietriș (stingere superficială) + colector → **separator ulei-apă (deuleiator, ieșire ≤5 mg/l)**; ulei = deșeu periculos (13 03*). **Zgomot trafo:** L_p(d) = L_WA − 20log(d) − 11; trafo 25 MVA ~65-72 dB(A) la 1 m → la 30-40 m conform (Ord. MS 119: zi ≤55 / noapte ≤45 dB, + ecrane fonoabsorbante). **CEM 50 Hz:** E ≤5 kV/m, B ≤100 µT (populație) — asigurat prin distanțe gardă + zonă protecție LEA. Ape pluviale platformă + separator hidrocarburi; baterii cc uzate (HG 1132/2008); GS testat periodic.

## 9. Avize

CU, **ATR (operator rețea/OTS)**, **aviz ANRE**, aviz amplasament rețele, **aviz/autorizație ISU** (HG 571/2016), acord mediu APM (OUG 195/2005 + L 292/2018), DSP (zgomot/CEM), gospodărirea apelor ANAR/ABA (pluvial + separator), servituți LEA (Legea 123/2012), avize deținători rețele.

## 10. Concluzii

Stație 110/20 kV AIS exterior 2×25 MVA, infrastructură energetică critică, **categoria B**, **clasa seismică II (γI 1,2)** echipament critic. Cadru complet (construcții + NTE/PE + SR EN 61936-1/50522 + IEC 62271 + P118). Măsuri mediu (cuvă 100% ulei + separator + zgomot <limite + CEM <limite) integrate. Cele 7 cerințe A-F+G (L10/1995). Apt AC sub rezerva avizelor + verificare atestați. Se completează cu memoriile de specialitate (rezistență, instalații electrice) + piese desenate.
