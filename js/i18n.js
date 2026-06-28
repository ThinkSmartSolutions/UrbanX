/* ============================================================================
 * UrbanX — 001 i18n (window.UrbanXI18n + window.T). Multilingv RO/EN/FR/DE.
 * Arhitectură cu FALLBACK la sursa RO: t(src) → traducere dacă există, altfel
 * textul RO original (deci acoperirea parțială NU strică nimic — string-urile
 * netraduse rămân RO, nu „cheie lipsă"). Cheia = chiar string-ul RO sursă, ca
 * să nu rescriem structurile existente (NAV/RAPORT_INFO). Limba în `urbanx_lang`.
 * Faza 1a: chrome structural (grupuri sertar + acțiuni rapide + termeni comuni).
 * Restul string-urilor se adaugă incremental în DICT (sau prin pipeline MT).
 * ========================================================================== */
(function (G) {
  'use strict';
  var LANGS = ['ro', 'en', 'fr', 'de'];
  var KEY = 'urbanx_lang';

  // DICT[lang][stringRO] = traducere. Lipsă → fallback la stringRO (RO rămâne RO).
  var DICT = {
    en: {
      'Teritoriu & hărți': 'Territory & maps', 'Analiză teritorială': 'Territorial analysis',
      'Mobilitate': 'Mobility', 'Mediu, climă & verde': 'Environment, climate & green',
      'Riscuri & Protecție civilă': 'Risks & Civil protection', 'Cetățeni & consultare': 'Citizens & consultation',
      'Prezentare': 'Presentation', 'Caută': 'Search', 'Dashboard': 'Dashboard',
      'Rapoarte': 'Reports', 'Generează': 'Generate', 'Închide': 'Close', 'Rol': 'Role',
      'Acces complet': 'Full access', 'Super Administrator': 'Super Administrator', 'Administrator UAT': 'UAT Administrator',
      'Birou Arhitectură / Urbanism': 'Architecture / Planning Studio', 'CTATU / Specialist': 'CTATU / Specialist',
      'Cetățean': 'Citizen', 'Vizitator': 'Visitor'
    },
    fr: {
      'Teritoriu & hărți': 'Territoire & cartes', 'Analiză teritorială': 'Analyse territoriale',
      'Mobilitate': 'Mobilité', 'Mediu, climă & verde': 'Environnement, climat & vert',
      'Riscuri & Protecție civilă': 'Risques & Protection civile', 'Cetățeni & consultare': 'Citoyens & consultation',
      'Prezentare': 'Présentation', 'Caută': 'Rechercher', 'Dashboard': 'Tableau de bord',
      'Rapoarte': 'Rapports', 'Generează': 'Générer', 'Închide': 'Fermer', 'Rol': 'Rôle',
      'Acces complet': 'Accès complet', 'Super Administrator': 'Super Administrateur', 'Administrator UAT': 'Administrateur UAT',
      'Birou Arhitectură / Urbanism': 'Cabinet Architecture / Urbanisme', 'CTATU / Specialist': 'CTATU / Spécialiste',
      'Cetățean': 'Citoyen', 'Vizitator': 'Visiteur'
    },
    de: {
      'Teritoriu & hărți': 'Gebiet & Karten', 'Analiză teritorială': 'Territoriale Analyse',
      'Mobilitate': 'Mobilität', 'Mediu, climă & verde': 'Umwelt, Klima & Grün',
      'Riscuri & Protecție civilă': 'Risiken & Zivilschutz', 'Cetățeni & consultare': 'Bürger & Konsultation',
      'Prezentare': 'Präsentation', 'Caută': 'Suchen', 'Dashboard': 'Dashboard',
      'Rapoarte': 'Berichte', 'Generează': 'Generieren', 'Închide': 'Schließen', 'Rol': 'Rolle',
      'Acces complet': 'Voller Zugriff', 'Super Administrator': 'Super-Administrator', 'Administrator UAT': 'UAT-Administrator',
      'Birou Arhitectură / Urbanism': 'Architektur- / Planungsbüro', 'CTATU / Specialist': 'CTATU / Spezialist',
      'Cetățean': 'Bürger', 'Vizitator': 'Besucher'
    }
  };

  // — Faza 1b: acoperire COMPLETĂ a sertarului (itemi NAV + separatoare). Acronimele
  //   (SIDU/PMUD/SFU…) rămân; se traduce descriptorul. Cheia = label-ul RO exact (cu emoji).
  var _SIDEBAR = {
    en: {
      'Hartă (închide panourile)': 'Map (close panels)',
      'Dashboard UAT Live (INSE·Eurostat·OSM·GHSL)': 'Live UAT Dashboard (NIS·Eurostat·OSM·GHSL)',
      'GHSL — suprafață construită 1975-2055': 'GHSL — built-up area 1975-2055',
      'Coridoare de dezvoltare spațială': 'Spatial development corridors',
      'Inventar patrimoniu & monumente (GIS)': 'Heritage & monuments inventory (GIS)',
      'Import PUG digital (GeoJSON/KML)': 'Digital GUP import (GeoJSON/KML)',
      'Capacitate & conformitate UAT': 'UAT capacity & compliance', 'SimLab — 10 simulatoare': 'SimLab — 10 simulators',
      'Analytics — Walk/15-min/ROI/UHI/SDG/seismic': 'Analytics — Walk/15-min/ROI/UHI/SDG/seismic',
      'Raport indici urbani (PDF, 12 indici)': 'Urban indices report (PDF, 12 indices)',
      'Market — piața imobiliară (UAT)': 'Market — real-estate (UAT)',
      '💶 Hartă Valori Imobiliare (€/mp)': '💶 Property Value Map (€/sqm)',
      '📄 Studiu Valori Imobiliare (PDF)': '📄 Property Value Study (PDF)',
      'Carbon & emisii (UAT)': 'Carbon & emissions (UAT)', 'Metodologie & surse de date': 'Methodology & data sources',
      'Flux — studiu de trafic (calculator)': 'Flux — traffic study (calculator)',
      'LOISIR — spații verzi & plămân urban': 'LOISIR — green spaces & urban lung',
      'UHI — insulă de căldură urbană': 'UHI — urban heat island', 'Superbloc (model Barcelona)': 'Superblock (Barcelona model)',
      'Simulare cutremur (mag. 5-8, Vrancea)': 'Earthquake simulation (mag. 5-8, Vrancea)',
      'Predicție inundație pluvială': 'Pluvial flood prediction', 'Inventar adăposturi ALA': 'Civil shelter inventory (ALA)',
      'Rețele edilitare pe hartă': 'Utility networks on map',
      'SIDU — Strategia Integrată de Dezvoltare Urbană': 'SIDU — Integrated Urban Development Strategy',
      'Masterplan Urban': 'Urban Masterplan', 'PMUD — Plan Mobilitate Urbană Durabilă': 'SUMP — Sustainable Urban Mobility Plan',
      'SDL — Strategia de Dezvoltare Locală': 'SDL — Local Development Strategy', 'Strategia Metropolitană': 'Metropolitan Strategy',
      'Smart City — ISO 37120 · Digital Twin': 'Smart City — ISO 37120 · Digital Twin',
      '🌦 Climatică — SECAP · Adaptare': '🌦 Climate — SECAP · Adaptation', '💰 Economică — Dezvoltare Economică Locală': '💰 Economic — Local Economic Development',
      'Locuire — Fond Locativ · Regenerare': 'Housing — Stock · Regeneration', 'Turistică — Strategie Turistică': 'Tourism — Tourism Strategy',
      'Culturală — Patrimoniu · Creative': 'Cultural — Heritage · Creative', 'Mediu — Biodiversitate · Spații Verzi': 'Environment — Biodiversity · Green',
      'Digitalizare — eGov · Infrastructură': 'Digitalization — eGov · Infrastructure', 'SFU — Fezabilitate Urbană': 'SFU — Urban Feasibility',
      'SCT — Capacitate Transport': 'SCT — Transport Capacity', 'SIM — Impact Mobilitate': 'SIM — Mobility Impact',
      'SCSP — Calitate Spațiu Public': 'SCSP — Public Space Quality', 'SRgU — Regenerare Urbană Rezidențială': 'SRgU — Residential Urban Regeneration',
      'Atlas Urban — Monografie': 'Urban Atlas — Monograph', 'SRM — Risc Multihazard': 'SRM — Multi-hazard Risk',
      'SDA — Demografie Aprofundată': 'SDA — In-depth Demographics', 'SCpT — Competitivitate Teritorială': 'SCpT — Territorial Competitiveness',
      'SIVA — Infrastructură Verde și Albastră': 'SIVA — Green & Blue Infrastructure', 'SEU — Energie Urbană': 'SEU — Urban Energy',
      'SPPC — Patrimoniu Construit · Peisaj': 'SPPC — Built Heritage · Landscape', '🏗 HBU Teritoriu — Reconversie (UAT)': '🏗 HBU Territory — Reconversion (UAT)',
      '🏺 RCAI Teritoriu — Cercetare Arheologică': '🏺 RCAI Territory — Archaeological Research',
      'SIDU — registru & coerență → PUG': 'SIDU — registry & coherence → GUP', 'Portofoliu strategic 2025-2055': 'Strategic portfolio 2025-2055',
      'Proiecție urbanistică 10/20/30 ani': 'Urban projection 10/20/30 years', 'AI Memoriu justificativ': 'AI Justification memo',
      '🗓 Prospețimea datelor (surse la zi)': '🗓 Data freshness (up-to-date sources)',
      'Sesizare urbană': 'Urban report', 'Hartă sesizări (pe/off)': 'Reports map (on/off)', 'Participare publică (model Helsinki)': 'Public participation (Helsinki model)',
      'Film cinematic (25 scene)': 'Cinematic film (25 scenes)', 'TCI Clasic (panou interactiv)': 'TCI Classic (interactive panel)',
      '— TERITORIU —': '— TERRITORY —', '— SECTORIALE —': '— SECTORAL —', '— STUDII SPECIALIZATE —': '— SPECIALIZED STUDIES —',
      '— INVESTIȚIONAL —': '— INVESTMENT —', '— INSTRUMENTE & PREDICȚII —': '— TOOLS & PREDICTIONS —'
    },
    fr: {
      'Hartă (închide panourile)': 'Carte (fermer les panneaux)',
      'Dashboard UAT Live (INSE·Eurostat·OSM·GHSL)': 'Tableau de bord UAT en direct (INS·Eurostat·OSM·GHSL)',
      'GHSL — suprafață construită 1975-2055': 'GHSL — surface bâtie 1975-2055',
      'Coridoare de dezvoltare spațială': 'Corridors de développement spatial',
      'Inventar patrimoniu & monumente (GIS)': 'Inventaire patrimoine & monuments (SIG)',
      'Import PUG digital (GeoJSON/KML)': 'Import PUG numérique (GeoJSON/KML)',
      'Capacitate & conformitate UAT': 'Capacité & conformité UAT', 'SimLab — 10 simulatoare': 'SimLab — 10 simulateurs',
      'Analytics — Walk/15-min/ROI/UHI/SDG/seismic': 'Analytics — Walk/15-min/ROI/UHI/ODD/sismique',
      'Raport indici urbani (PDF, 12 indici)': 'Rapport indices urbains (PDF, 12 indices)',
      'Market — piața imobiliară (UAT)': 'Marché — immobilier (UAT)',
      '💶 Hartă Valori Imobiliare (€/mp)': '💶 Carte des valeurs immobilières (€/m²)',
      '📄 Studiu Valori Imobiliare (PDF)': '📄 Étude valeurs immobilières (PDF)',
      'Carbon & emisii (UAT)': 'Carbone & émissions (UAT)', 'Metodologie & surse de date': 'Méthodologie & sources',
      'Flux — studiu de trafic (calculator)': 'Flux — étude de trafic (calculateur)',
      'LOISIR — spații verzi & plămân urban': 'LOISIR — espaces verts & poumon urbain',
      'UHI — insulă de căldură urbană': 'UHI — îlot de chaleur urbain', 'Superbloc (model Barcelona)': 'Superîlot (modèle Barcelone)',
      'Simulare cutremur (mag. 5-8, Vrancea)': 'Simulation séisme (mag. 5-8, Vrancea)',
      'Predicție inundație pluvială': 'Prédiction inondation pluviale', 'Inventar adăposturi ALA': 'Inventaire abris (protection civile)',
      'Rețele edilitare pe hartă': 'Réseaux techniques sur carte',
      'SIDU — Strategia Integrată de Dezvoltare Urbană': 'SIDU — Stratégie intégrée de développement urbain',
      'Masterplan Urban': 'Plan directeur urbain', 'PMUD — Plan Mobilitate Urbană Durabilă': 'PMUD — Plan de mobilité urbaine durable',
      'SDL — Strategia de Dezvoltare Locală': 'SDL — Stratégie de développement local', 'Strategia Metropolitană': 'Stratégie métropolitaine',
      'Smart City — ISO 37120 · Digital Twin': 'Smart City — ISO 37120 · Jumeau numérique',
      '🌦 Climatică — SECAP · Adaptare': '🌦 Climat — SECAP · Adaptation', '💰 Economică — Dezvoltare Economică Locală': '💰 Économique — Développement économique local',
      'Locuire — Fond Locativ · Regenerare': 'Logement — Parc · Régénération', 'Turistică — Strategie Turistică': 'Tourisme — Stratégie touristique',
      'Culturală — Patrimoniu · Creative': 'Culturel — Patrimoine · Créatif', 'Mediu — Biodiversitate · Spații Verzi': 'Environnement — Biodiversité · Vert',
      'Digitalizare — eGov · Infrastructură': 'Numérisation — eGov · Infrastructure', 'SFU — Fezabilitate Urbană': 'SFU — Faisabilité urbaine',
      'SCT — Capacitate Transport': 'SCT — Capacité de transport', 'SIM — Impact Mobilitate': 'SIM — Impact mobilité',
      'SCSP — Calitate Spațiu Public': 'SCSP — Qualité espace public', 'SRgU — Regenerare Urbană Rezidențială': 'SRgU — Régénération urbaine résidentielle',
      'Atlas Urban — Monografie': 'Atlas urbain — Monographie', 'SRM — Risc Multihazard': 'SRM — Risque multi-aléas',
      'SDA — Demografie Aprofundată': 'SDA — Démographie approfondie', 'SCpT — Competitivitate Teritorială': 'SCpT — Compétitivité territoriale',
      'SIVA — Infrastructură Verde și Albastră': 'SIVA — Infrastructure verte et bleue', 'SEU — Energie Urbană': 'SEU — Énergie urbaine',
      'SPPC — Patrimoniu Construit · Peisaj': 'SPPC — Patrimoine bâti · Paysage', '🏗 HBU Teritoriu — Reconversie (UAT)': '🏗 HBU Territoire — Reconversion (UAT)',
      '🏺 RCAI Teritoriu — Cercetare Arheologică': '🏺 RCAI Territoire — Recherche archéologique',
      'SIDU — registru & coerență → PUG': 'SIDU — registre & cohérence → PUG', 'Portofoliu strategic 2025-2055': 'Portefeuille stratégique 2025-2055',
      'Proiecție urbanistică 10/20/30 ani': 'Projection urbaine 10/20/30 ans', 'AI Memoriu justificativ': 'IA Mémoire justificatif',
      '🗓 Prospețimea datelor (surse la zi)': '🗓 Fraîcheur des données (sources à jour)',
      'Sesizare urbană': 'Signalement urbain', 'Hartă sesizări (pe/off)': 'Carte signalements (on/off)', 'Participare publică (model Helsinki)': 'Participation publique (modèle Helsinki)',
      'Film cinematic (25 scene)': 'Film cinématique (25 scènes)', 'TCI Clasic (panou interactiv)': 'TCI Classique (panneau interactif)',
      '— TERITORIU —': '— TERRITOIRE —', '— SECTORIALE —': '— SECTORIEL —', '— STUDII SPECIALIZATE —': '— ÉTUDES SPÉCIALISÉES —',
      '— INVESTIȚIONAL —': '— INVESTISSEMENT —', '— INSTRUMENTE & PREDICȚII —': '— OUTILS & PRÉDICTIONS —'
    },
    de: {
      'Hartă (închide panourile)': 'Karte (Panels schließen)',
      'Dashboard UAT Live (INSE·Eurostat·OSM·GHSL)': 'Live-UAT-Dashboard (NIS·Eurostat·OSM·GHSL)',
      'GHSL — suprafață construită 1975-2055': 'GHSL — bebaute Fläche 1975-2055',
      'Coridoare de dezvoltare spațială': 'Räumliche Entwicklungskorridore',
      'Inventar patrimoniu & monumente (GIS)': 'Denkmal- & Kulturerbe-Inventar (GIS)',
      'Import PUG digital (GeoJSON/KML)': 'Digitaler PUG-Import (GeoJSON/KML)',
      'Capacitate & conformitate UAT': 'UAT-Kapazität & Konformität', 'SimLab — 10 simulatoare': 'SimLab — 10 Simulatoren',
      'Analytics — Walk/15-min/ROI/UHI/SDG/seismic': 'Analytics — Walk/15-Min/ROI/UHI/SDG/seismisch',
      'Raport indici urbani (PDF, 12 indici)': 'Bericht Stadtindizes (PDF, 12 Indizes)',
      'Market — piața imobiliară (UAT)': 'Markt — Immobilien (UAT)',
      '💶 Hartă Valori Imobiliare (€/mp)': '💶 Immobilienwertkarte (€/m²)',
      '📄 Studiu Valori Imobiliare (PDF)': '📄 Immobilienwertstudie (PDF)',
      'Carbon & emisii (UAT)': 'CO₂ & Emissionen (UAT)', 'Metodologie & surse de date': 'Methodik & Datenquellen',
      'Flux — studiu de trafic (calculator)': 'Flux — Verkehrsstudie (Rechner)',
      'LOISIR — spații verzi & plămân urban': 'LOISIR — Grünflächen & grüne Lunge',
      'UHI — insulă de căldură urbană': 'UHI — städtische Wärmeinsel', 'Superbloc (model Barcelona)': 'Superblock (Barcelona-Modell)',
      'Simulare cutremur (mag. 5-8, Vrancea)': 'Erdbebensimulation (Mag. 5-8, Vrancea)',
      'Predicție inundație pluvială': 'Pluviale Hochwasservorhersage', 'Inventar adăposturi ALA': 'Schutzraum-Inventar (Zivilschutz)',
      'Rețele edilitare pe hartă': 'Versorgungsnetze auf Karte',
      'SIDU — Strategia Integrată de Dezvoltare Urbană': 'SIDU — Integrierte Stadtentwicklungsstrategie',
      'Masterplan Urban': 'Städtebaulicher Masterplan', 'PMUD — Plan Mobilitate Urbană Durabilă': 'SUMP — Nachhaltiger urbaner Mobilitätsplan',
      'SDL — Strategia de Dezvoltare Locală': 'SDL — Lokale Entwicklungsstrategie', 'Strategia Metropolitană': 'Metropolstrategie',
      'Smart City — ISO 37120 · Digital Twin': 'Smart City — ISO 37120 · Digitaler Zwilling',
      '🌦 Climatică — SECAP · Adaptare': '🌦 Klima — SECAP · Anpassung', '💰 Economică — Dezvoltare Economică Locală': '💰 Wirtschaft — Lokale Wirtschaftsentwicklung',
      'Locuire — Fond Locativ · Regenerare': 'Wohnen — Bestand · Erneuerung', 'Turistică — Strategie Turistică': 'Tourismus — Tourismusstrategie',
      'Culturală — Patrimoniu · Creative': 'Kultur — Erbe · Kreativ', 'Mediu — Biodiversitate · Spații Verzi': 'Umwelt — Biodiversität · Grün',
      'Digitalizare — eGov · Infrastructură': 'Digitalisierung — eGov · Infrastruktur', 'SFU — Fezabilitate Urbană': 'SFU — Städtische Machbarkeit',
      'SCT — Capacitate Transport': 'SCT — Transportkapazität', 'SIM — Impact Mobilitate': 'SIM — Mobilitätswirkung',
      'SCSP — Calitate Spațiu Public': 'SCSP — Qualität öffentlicher Raum', 'SRgU — Regenerare Urbană Rezidențială': 'SRgU — Wohngebiets-Erneuerung',
      'Atlas Urban — Monografie': 'Stadtatlas — Monografie', 'SRM — Risc Multihazard': 'SRM — Multigefahren-Risiko',
      'SDA — Demografie Aprofundată': 'SDA — Vertiefte Demografie', 'SCpT — Competitivitate Teritorială': 'SCpT — Territoriale Wettbewerbsfähigkeit',
      'SIVA — Infrastructură Verde și Albastră': 'SIVA — Grüne & blaue Infrastruktur', 'SEU — Energie Urbană': 'SEU — Urbane Energie',
      'SPPC — Patrimoniu Construit · Peisaj': 'SPPC — Baukulturerbe · Landschaft', '🏗 HBU Teritoriu — Reconversie (UAT)': '🏗 HBU Gebiet — Umnutzung (UAT)',
      '🏺 RCAI Teritoriu — Cercetare Arheologică': '🏺 RCAI Gebiet — Archäologische Forschung',
      'SIDU — registru & coerență → PUG': 'SIDU — Register & Kohärenz → PUG', 'Portofoliu strategic 2025-2055': 'Strategisches Portfolio 2025-2055',
      'Proiecție urbanistică 10/20/30 ani': 'Städtebauliche Projektion 10/20/30 Jahre', 'AI Memoriu justificativ': 'KI-Begründungsmemo',
      '🗓 Prospețimea datelor (surse la zi)': '🗓 Datenaktualität (aktuelle Quellen)',
      'Sesizare urbană': 'Städtische Meldung', 'Hartă sesizări (pe/off)': 'Meldungskarte (an/aus)', 'Participare publică (model Helsinki)': 'Bürgerbeteiligung (Helsinki-Modell)',
      'Film cinematic (25 scene)': 'Kinofilm (25 Szenen)', 'TCI Clasic (panou interactiv)': 'TCI Klassisch (interaktives Panel)',
      '— TERITORIU —': '— GEBIET —', '— SECTORIALE —': '— SEKTORAL —', '— STUDII SPECIALIZATE —': '— FACHSTUDIEN —',
      '— INVESTIȚIONAL —': '— INVESTITION —', '— INSTRUMENTE & PREDICȚII —': '— WERKZEUGE & PROGNOSEN —'
    }
  };
  ['en', 'fr', 'de'].forEach(function (l) { for (var k in _SIDEBAR[l]) DICT[l][k] = _SIDEBAR[l][k]; });

  // — Faza 1c: meniul RAPOARTE (studii de parcelă) — chei = text-nodul EXACT (cu emoji). —
  var _RAP = {
    en: {
      '🗺 Studiu de Amplasament & Context Teritorial': '🗺 Site & Territorial Context Study', '📄 Studiu de Amplasament': '📄 Site Study',
      '☀ Studiu de Însorire': '☀ Sunlight Study', '🌑 Studiu Umbre & Obstrucție': '🌑 Shadow & Obstruction Study',
      '🔥 Studiu Siguranță Foc (ISU)': '🔥 Fire Safety Study (ISU)', '🪨 Pre-Studiu Geotehnic': '🪨 Preliminary Geotechnical Study',
      '✈ Studiu AACR (Aviz Aeroport)': '✈ AACR Study (Airport Permit)', '♿ Accesibilitate PMR': '♿ Accessibility (PRM)',
      '🌤 Iluminat Natural EN 17037': '🌤 Daylight EN 17037', '⛰ Stabilitate Taluzuri & Versanți': '⛰ Slope & Embankment Stability',
      '🌿 Studiu Impact Mediu (EIM)': '🌿 Environmental Impact Study (EIA)', '💧 Studiu Gospodărire Ape — DTGA': '💧 Water Management Study — DTGA',
      '🌳 Studiu Spații Verzi': '🌳 Green Space Study', '🔇 Studiu Acustic Urban': '🔇 Urban Acoustic Study',
      '🌬 Studiu Vânt & Confort Pietonal': '🌬 Wind & Pedestrian Comfort Study', '🌧 Gospodărire Ape Pluviale': '🌧 Stormwater Management',
      '🔌 Pre-studiu Bransamente & Utilități': '🔌 Utility Connections Pre-study', '🌍 Studiu Amprentă Carbon (CO₂)': '🌍 Carbon Footprint Study (CO₂)',
      '🚦 Studiu Impact Trafic': '🚦 Traffic Impact Study', '🚗 Studiu Mobilitate & Parcaje': '🚗 Mobility & Parking Study',
      '📊 Studiu Densitate Urbană': '📊 Urban Density Study', '🏛 Studiu Patrimoniu & Istoric': '🏛 Heritage & Historical Study',
      '🏚 Studiu Construcții Existente': '🏚 Existing Buildings Study', '🏺 RCAI — Cercetare Arheologică': '🏺 RCAI — Archaeological Research',
      '📊 Studiu Fezabilitate / DALI': '📊 Feasibility Study / DALI', '🏗 HBU — Reconversie': '🏗 HBU — Reconversion',
      '📋 Raport Pre-Autorizare (REPA)': '📋 Pre-Authorization Report (REPA)', '⚡ Certificat Performanță Energetică': '⚡ Energy Performance Certificate',
      '🏙 Proiecție Urbanistică 10/20/30 ani': '🏙 Urban Projection 10/20/30 years', '🫁 Studiu Impact Sănătate Publică': '🫁 Public Health Impact Study',
      '⚡ Studiu Seismic & Risc Seismic': '⚡ Seismic & Seismic Risk Study', '🚧 Studiu Restricții & Zone de Risc': '🚧 Restrictions & Risk Zones Study',
      '① Analize de Bază': '① Basic Analyses', '② Obligatorii AC/CU': '② Mandatory BP/UC', '③ Mediu & Infrastructură': '③ Environment & Infrastructure',
      '④ Mobilitate & Impact': '④ Mobility & Impact', '⑤ Patrimoniu & Construcții existente': '⑤ Heritage & Existing Buildings', '⑥ Tehnico-economic & avizare': '⑥ Techno-economic & Approvals'
    },
    fr: {
      '🗺 Studiu de Amplasament & Context Teritorial': "🗺 Étude d'implantation & contexte territorial", '📄 Studiu de Amplasament': "📄 Étude d'implantation",
      '☀ Studiu de Însorire': "☀ Étude d'ensoleillement", '🌑 Studiu Umbre & Obstrucție': '🌑 Étude ombres & obstruction',
      '🔥 Studiu Siguranță Foc (ISU)': '🔥 Étude sécurité incendie (ISU)', '🪨 Pre-Studiu Geotehnic': '🪨 Pré-étude géotechnique',
      '✈ Studiu AACR (Aviz Aeroport)': '✈ Étude AACR (avis aéroport)', '♿ Accesibilitate PMR': '♿ Accessibilité PMR',
      '🌤 Iluminat Natural EN 17037': '🌤 Éclairage naturel EN 17037', '⛰ Stabilitate Taluzuri & Versanți': '⛰ Stabilité talus & versants',
      '🌿 Studiu Impact Mediu (EIM)': "🌿 Étude d'impact environnemental (EIE)", '💧 Studiu Gospodărire Ape — DTGA': "💧 Étude gestion de l'eau — DTGA",
      '🌳 Studiu Spații Verzi': '🌳 Étude espaces verts', '🔇 Studiu Acustic Urban': '🔇 Étude acoustique urbaine',
      '🌬 Studiu Vânt & Confort Pietonal': '🌬 Étude vent & confort piéton', '🌧 Gospodărire Ape Pluviale': '🌧 Gestion des eaux pluviales',
      '🔌 Pre-studiu Bransamente & Utilități': '🔌 Pré-étude raccordements & réseaux', '🌍 Studiu Amprentă Carbon (CO₂)': '🌍 Étude empreinte carbone (CO₂)',
      '🚦 Studiu Impact Trafic': "🚦 Étude d'impact trafic", '🚗 Studiu Mobilitate & Parcaje': '🚗 Étude mobilité & stationnement',
      '📊 Studiu Densitate Urbană': '📊 Étude densité urbaine', '🏛 Studiu Patrimoniu & Istoric': '🏛 Étude patrimoine & historique',
      '🏚 Studiu Construcții Existente': '🏚 Étude bâtiments existants', '🏺 RCAI — Cercetare Arheologică': '🏺 RCAI — Recherche archéologique',
      '📊 Studiu Fezabilitate / DALI': '📊 Étude de faisabilité / DALI', '🏗 HBU — Reconversie': '🏗 HBU — Reconversion',
      '📋 Raport Pre-Autorizare (REPA)': '📋 Rapport pré-autorisation (REPA)', '⚡ Certificat Performanță Energetică': '⚡ Certificat de performance énergétique',
      '🏙 Proiecție Urbanistică 10/20/30 ani': '🏙 Projection urbaine 10/20/30 ans', '🫁 Studiu Impact Sănătate Publică': '🫁 Étude impact santé publique',
      '⚡ Studiu Seismic & Risc Seismic': '⚡ Étude sismique & risque sismique', '🚧 Studiu Restricții & Zone de Risc': '🚧 Étude restrictions & zones à risque',
      '① Analize de Bază': '① Analyses de base', '② Obligatorii AC/CU': '② Obligatoires PC/CU', '③ Mediu & Infrastructură': '③ Environnement & infrastructure',
      '④ Mobilitate & Impact': '④ Mobilité & impact', '⑤ Patrimoniu & Construcții existente': '⑤ Patrimoine & bâtiments existants', '⑥ Tehnico-economic & avizare': '⑥ Technico-économique & avis'
    },
    de: {
      '🗺 Studiu de Amplasament & Context Teritorial': '🗺 Standort- & Territorialkontext-Studie', '📄 Studiu de Amplasament': '📄 Standortstudie',
      '☀ Studiu de Însorire': '☀ Besonnungsstudie', '🌑 Studiu Umbre & Obstrucție': '🌑 Schatten- & Verschattungsstudie',
      '🔥 Studiu Siguranță Foc (ISU)': '🔥 Brandschutzstudie (ISU)', '🪨 Pre-Studiu Geotehnic': '🪨 Geotechnische Vorstudie',
      '✈ Studiu AACR (Aviz Aeroport)': '✈ AACR-Studie (Flughafengenehmigung)', '♿ Accesibilitate PMR': '♿ Barrierefreiheit (PRM)',
      '🌤 Iluminat Natural EN 17037': '🌤 Tageslicht EN 17037', '⛰ Stabilitate Taluzuri & Versanți': '⛰ Böschungs- & Hangstabilität',
      '🌿 Studiu Impact Mediu (EIM)': '🌿 Umweltverträglichkeitsstudie (UVP)', '💧 Studiu Gospodărire Ape — DTGA': '💧 Wasserwirtschaftsstudie — DTGA',
      '🌳 Studiu Spații Verzi': '🌳 Grünflächenstudie', '🔇 Studiu Acustic Urban': '🔇 Städtische Akustikstudie',
      '🌬 Studiu Vânt & Confort Pietonal': '🌬 Wind- & Fußgängerkomfortstudie', '🌧 Gospodărire Ape Pluviale': '🌧 Regenwasserbewirtschaftung',
      '🔌 Pre-studiu Bransamente & Utilități': '🔌 Anschluss- & Versorgungs-Vorstudie', '🌍 Studiu Amprentă Carbon (CO₂)': '🌍 CO₂-Fußabdruck-Studie',
      '🚦 Studiu Impact Trafic': '🚦 Verkehrsfolgenstudie', '🚗 Studiu Mobilitate & Parcaje': '🚗 Mobilitäts- & Parkstudie',
      '📊 Studiu Densitate Urbană': '📊 Städtische Dichtestudie', '🏛 Studiu Patrimoniu & Istoric': '🏛 Denkmal- & Geschichtsstudie',
      '🏚 Studiu Construcții Existente': '🏚 Bestandsgebäudestudie', '🏺 RCAI — Cercetare Arheologică': '🏺 RCAI — Archäologische Forschung',
      '📊 Studiu Fezabilitate / DALI': '📊 Machbarkeitsstudie / DALI', '🏗 HBU — Reconversie': '🏗 HBU — Umnutzung',
      '📋 Raport Pre-Autorizare (REPA)': '📋 Vorgenehmigungsbericht (REPA)', '⚡ Certificat Performanță Energetică': '⚡ Energieausweis',
      '🏙 Proiecție Urbanistică 10/20/30 ani': '🏙 Städtebauliche Projektion 10/20/30 Jahre', '🫁 Studiu Impact Sănătate Publică': '🫁 Studie öffentliche Gesundheit',
      '⚡ Studiu Seismic & Risc Seismic': '⚡ Seismik- & Erdbebenrisikostudie', '🚧 Studiu Restricții & Zone de Risc': '🚧 Beschränkungen- & Risikozonenstudie',
      '① Analize de Bază': '① Grundanalysen', '② Obligatorii AC/CU': '② Pflicht BG/NV', '③ Mediu & Infrastructură': '③ Umwelt & Infrastruktur',
      '④ Mobilitate & Impact': '④ Mobilität & Wirkung', '⑤ Patrimoniu & Construcții existente': '⑤ Denkmal & Bestandsgebäude', '⑥ Tehnico-economic & avizare': '⑥ Technisch-wirtschaftlich & Genehmigung'
    }
  };
  ['en', 'fr', 'de'].forEach(function (l) { for (var k in _RAP[l]) DICT[l][k] = _RAP[l][k]; });

  // — Faza 2: topbar + acțiuni comune (apar în zeci de panouri → traduse o dată, peste tot) + basemap —
  var _WAVE2 = {
    en: {
      '🔍 Funcții': '🔍 Features', '🗺 Cadastru': '🗺 Cadastre', '❓ Ghid rapid': '❓ Quick guide',
      '🗺 Hartă ▾': '🗺 Map ▾', '📋 Parcelă ▾': '📋 Plot ▾', '🏙 Teritoriu ▾': '🏙 Territory ▾', '📋 Rapoarte ▾': '📋 Reports ▾',
      'Descarcă PDF': 'Download PDF', 'Descarcă': 'Download', 'Înapoi': 'Back', 'Înainte': 'Next', 'Salvează': 'Save',
      'Anulează': 'Cancel', 'Detalii': 'Details', 'Se încarcă...': 'Loading...', 'Se generează...': 'Generating...',
      'Eroare': 'Error', 'Succes': 'Success', 'Selectează': 'Select', 'Aplică': 'Apply', 'Resetează': 'Reset',
      'Adaugă': 'Add', 'Generează PDF': 'Generate PDF', 'Generează raport': 'Generate report', 'Vizualizează': 'View',
      'Nord': 'North', 'Satelit': 'Satellite', 'Parcelă': 'Plot', 'Teritoriu': 'Territory', 'Hartă': 'Map', 'Admin': 'Admin'
    },
    fr: {
      '🔍 Funcții': '🔍 Fonctions', '🗺 Cadastru': '🗺 Cadastre', '❓ Ghid rapid': '❓ Guide rapide',
      '🗺 Hartă ▾': '🗺 Carte ▾', '📋 Parcelă ▾': '📋 Parcelle ▾', '🏙 Teritoriu ▾': '🏙 Territoire ▾', '📋 Rapoarte ▾': '📋 Rapports ▾',
      'Descarcă PDF': 'Télécharger PDF', 'Descarcă': 'Télécharger', 'Înapoi': 'Retour', 'Înainte': 'Suivant', 'Salvează': 'Enregistrer',
      'Anulează': 'Annuler', 'Detalii': 'Détails', 'Se încarcă...': 'Chargement...', 'Se generează...': 'Génération...',
      'Eroare': 'Erreur', 'Succes': 'Succès', 'Selectează': 'Sélectionner', 'Aplică': 'Appliquer', 'Resetează': 'Réinitialiser',
      'Adaugă': 'Ajouter', 'Generează PDF': 'Générer PDF', 'Generează raport': 'Générer le rapport', 'Vizualizează': 'Visualiser',
      'Nord': 'Nord', 'Satelit': 'Satellite', 'Parcelă': 'Parcelle', 'Teritoriu': 'Territoire', 'Hartă': 'Carte', 'Admin': 'Admin'
    },
    de: {
      '🔍 Funcții': '🔍 Funktionen', '🗺 Cadastru': '🗺 Kataster', '❓ Ghid rapid': '❓ Schnellanleitung',
      '🗺 Hartă ▾': '🗺 Karte ▾', '📋 Parcelă ▾': '📋 Parzelle ▾', '🏙 Teritoriu ▾': '🏙 Gebiet ▾', '📋 Rapoarte ▾': '📋 Berichte ▾',
      'Descarcă PDF': 'PDF herunterladen', 'Descarcă': 'Herunterladen', 'Înapoi': 'Zurück', 'Înainte': 'Weiter', 'Salvează': 'Speichern',
      'Anulează': 'Abbrechen', 'Detalii': 'Details', 'Se încarcă...': 'Wird geladen...', 'Se generează...': 'Wird generiert...',
      'Eroare': 'Fehler', 'Succes': 'Erfolg', 'Selectează': 'Auswählen', 'Aplică': 'Anwenden', 'Resetează': 'Zurücksetzen',
      'Adaugă': 'Hinzufügen', 'Generează PDF': 'PDF generieren', 'Generează raport': 'Bericht generieren', 'Vizualizează': 'Ansehen',
      'Nord': 'Norden', 'Satelit': 'Satellit', 'Parcelă': 'Parzelle', 'Teritoriu': 'Gebiet', 'Hartă': 'Karte', 'Admin': 'Admin'
    }
  };
  ['en', 'fr', 'de'].forEach(function (l) { for (var k in _WAVE2[l]) DICT[l][k] = _WAVE2[l][k]; });

  // — Faza 3: anteturile info-drawer-ului (reutilizate în ~100 de drawere → o dată, peste tot) —
  var _WAVE3 = {
    en: {
      'Ce analizează': 'What it analyzes', 'De ce este necesar': 'Why it is needed', 'Bază legală': 'Legal basis',
      'Ce primești în raport': 'What you get in the report', 'Când NU se aplică': 'When it does NOT apply',
      'Document orientativ · UrbanX TSS·FG · Valori preliminare': 'Indicative document · UrbanX TSS·FG · Preliminary values',
      'Nota UrbanX': 'UrbanX Score', 'Scor actual': 'Current score', 'Clasament național': 'National ranking',
      'Cum poate crește scorul?': 'How can the score improve?', 'Acuratețe': 'Accuracy', 'Surse': 'Sources'
    },
    fr: {
      'Ce analizează': 'Ce qu\'elle analyse', 'De ce este necesar': 'Pourquoi c\'est nécessaire', 'Bază legală': 'Base légale',
      'Ce primești în raport': 'Ce que vous obtenez dans le rapport', 'Când NU se aplică': 'Quand cela ne s\'applique PAS',
      'Document orientativ · UrbanX TSS·FG · Valori preliminare': 'Document indicatif · UrbanX TSS·FG · Valeurs préliminaires',
      'Nota UrbanX': 'Note UrbanX', 'Scor actual': 'Score actuel', 'Clasament național': 'Classement national',
      'Cum poate crește scorul?': 'Comment améliorer le score ?', 'Acuratețe': 'Précision', 'Surse': 'Sources'
    },
    de: {
      'Ce analizează': 'Was sie analysiert', 'De ce este necesar': 'Warum es nötig ist', 'Bază legală': 'Rechtsgrundlage',
      'Ce primești în raport': 'Was Sie im Bericht erhalten', 'Când NU se aplică': 'Wann es NICHT gilt',
      'Document orientativ · UrbanX TSS·FG · Valori preliminare': 'Orientierungsdokument · UrbanX TSS·FG · Vorläufige Werte',
      'Nota UrbanX': 'UrbanX-Note', 'Scor actual': 'Aktuelle Punktzahl', 'Clasament național': 'Nationale Rangliste',
      'Cum poate crește scorul?': 'Wie kann die Punktzahl steigen?', 'Acuratețe': 'Genauigkeit', 'Surse': 'Quellen'
    }
  };
  ['en', 'fr', 'de'].forEach(function (l) { for (var k in _WAVE3[l]) DICT[l][k] = _WAVE3[l][k]; });

  var _WAVE4 = {
    en: { '🔢 Număr cadastral UAT': '🔢 UAT cadastral number', 'Număr cadastral': 'Cadastral number', 'Adresă': 'Address', 'Suprafață': 'Area', 'Regim': 'Regime' },
    fr: { '🔢 Număr cadastral UAT': '🔢 Numéro cadastral UAT', 'Număr cadastral': 'Numéro cadastral', 'Adresă': 'Adresse', 'Suprafață': 'Surface', 'Regim': 'Régime' },
    de: { '🔢 Număr cadastral UAT': '🔢 UAT-Katasternummer', 'Număr cadastral': 'Katasternummer', 'Adresă': 'Adresse', 'Suprafață': 'Fläche', 'Regim': 'Regime' }
  };
  ['en', 'fr', 'de'].forEach(function (l) { for (var k in _WAVE4[l]) DICT[l][k] = _WAVE4[l][k]; });

  var _lang = 'ro';
  function _init() {
    // implicit RO (platformă RO) — limba se schimbă DOAR la alegerea explicită a userului.
    // (evităm un UI parțial-tradus pt un browser EN cât timp acoperirea dicționarului crește)
    try { var stored = localStorage.getItem(KEY); if (stored && LANGS.indexOf(stored) >= 0) _lang = stored; } catch (e) { _lang = 'ro'; }
  }
  _init();

  function t(src) {
    if (src == null) return '';
    if (_lang === 'ro') return src;
    var d = DICT[_lang]; return (d && d[src]) || src;     // fallback la RO sursă
  }
  function getCurrentLang() { return _lang; }

  // ── Traducere AUTOMATĂ a DOM-ului (toată platforma) ───────────────────────
  // Traduce DOAR text-nodurile al căror text (trimmed) e o cheie CUNOSCUTĂ în dicționar
  // (=> nu atinge date/nr./nume orașe). Păstrează RO original într-un WeakMap ca să poată
  // reveni. MutationObserver prinde conținutul generat dinamic (panouri, meniuri, drawere).
  var _ro = new WeakMap();            // textNode → { key, pre, post } (RO sursă + spațiere)
  function _known(s) { return !!(DICT.en[s] || DICT.fr[s] || DICT.de[s]); }
  function _xlNode(n) {
    try {
      var info = _ro.get(n);
      if (!info) {
        var raw = n.nodeValue; if (!raw) return;
        var t = raw.trim(); if (!t || !_known(t)) return;     // necunoscut → nu atingem
        var i0 = raw.indexOf(t);
        info = { key: t, pre: raw.slice(0, i0), post: raw.slice(i0 + t.length) };
        _ro.set(n, info);
      }
      var tr = (_lang === 'ro') ? info.key : (DICT[_lang][info.key] || info.key);
      var want = info.pre + tr + info.post;
      if (n.nodeValue !== want) n.nodeValue = want;
    } catch (e) {}
  }
  var _SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1, CODE: 1, svg: 1, SVG: 1 };
  function _xlTree(root) {
    try {
      if (!root || !G.document || !document.createTreeWalker) return;
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          var p = n.parentNode; if (!p) return NodeFilter.FILTER_REJECT;
          if (_SKIP[p.nodeName] || (p.closest && p.closest('input,textarea,[contenteditable=true]'))) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var n; while ((n = w.nextNode())) _xlNode(n);
    } catch (e) {}
  }
  // atribute traductibile (title / placeholder) pe elementele cunoscute
  function _xlAttrs(root) {
    try {
      var els = (root.querySelectorAll ? root.querySelectorAll('[title],[placeholder]') : []);
      for (var i = 0; i < els.length; i++) {
        ['title', 'placeholder'].forEach(function (a) {
          var v = els[i].getAttribute && els[i].getAttribute(a); if (!v) return;
          var st = '__i18n_' + a, key = els[i].getAttribute(st) || (_known(v) ? v : null);
          if (!key) return;
          if (!els[i].getAttribute(st)) els[i].setAttribute(st, key);
          els[i].setAttribute(a, (_lang === 'ro') ? key : (DICT[_lang][key] || key));
        });
      }
    } catch (e) {}
  }
  var _obs = null;
  function _startObserver() {
    try {
      if (_obs || !G.MutationObserver || !document.body) return;
      _obs = new MutationObserver(function (muts) {
        if (_lang === 'ro' && !_dirtyRo()) {/* still re-render to restore */ }
        for (var i = 0; i < muts.length; i++) {
          var an = muts[i].addedNodes; if (!an) continue;
          for (var j = 0; j < an.length; j++) {
            var nd = an[j];
            if (nd.nodeType === 3) _xlNode(nd);
            else if (nd.nodeType === 1) { _xlTree(nd); _xlAttrs(nd); }
          }
        }
      });
      _obs.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  }
  function _dirtyRo() { return false; }
  function applyAll() { _xlTree(document.body); _xlAttrs(document); }

  // LAZY: dicționarul MT (717KB) se încarcă DOAR la prima alegere a unei limbi ≠ RO.
  var _autoLoaded = false, _autoLoading = false, _autoCbs = [];
  function _ensureAutoDict(cb) {
    if (_lang === 'ro' || _autoLoaded) { cb && cb(); return; }
    if (cb) _autoCbs.push(cb);
    if (_autoLoading) return; _autoLoading = true;
    try {
      var s = document.createElement('script'); s.src = 'js/i18n-auto.js?v=20260628prof';
      s.onload = function () { _autoLoaded = true; _autoLoading = false; var c = _autoCbs.slice(); _autoCbs = []; c.forEach(function (f) { try { f(); } catch (e) {} }); };
      s.onerror = function () { _autoLoading = false; var c = _autoCbs.slice(); _autoCbs = []; c.forEach(function (f) { try { f(); } catch (e) {} }); };
      document.head.appendChild(s);
    } catch (e) { _autoLoading = false; }
  }
  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) return;
    _lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    var _apply = function () {
      try { if (G.UXSidebar && G.UXSidebar.render && document.getElementById('ux-sidebar-body')) G.UXSidebar.render(); } catch (e) {}
      try { applyAll(); } catch (e) {}
      try { _refreshTopbarLabel(); } catch (e) {}
      try { G.document.dispatchEvent(new CustomEvent('urbanx:langChanged', { detail: { lang: lang } })); } catch (e) {}
    };
    if (lang !== 'ro') _ensureAutoDict(_apply); else _apply();   // încarcă dicționarul MT la nevoie
    G.ss && G.ss('🌐 ' + lang.toUpperCase());
  }
  // permite adăugarea incrementală de traduceri (sau dintr-un pipeline MT)
  function extend(lang, map) { if (!DICT[lang]) DICT[lang] = {}; for (var k in map) DICT[lang][k] = map[k]; }

  G.UrbanXI18n = { t: t, setLang: setLang, getCurrentLang: getCurrentLang, LANGS: LANGS, extend: extend, applyAll: applyAll, _ddToggle: _ddToggle };
  G.T = t;   // shortcut global

  // Selector de limbă GLOBAL în topbar (limba e a întregii platforme, nu a Teritoriului)
  var FLAGS = { ro: '🇷🇴', en: '🇬🇧', fr: '🇫🇷', de: '🇩🇪' };
  function _injectTopbarSwitcher() {
    try {
      var tb = document.getElementById('topbar'); if (!tb || document.getElementById('ux-lang-btn')) return;
      var btn = document.createElement('button');
      btn.id = 'ux-lang-btn'; btn.className = 'tb-btn'; btn.title = 'Limbă / Language';
      btn.style.cssText = 'display:inline-flex;align-items:center;gap:4px;flex-shrink:0';
      btn.innerHTML = '🌐 <span id="ux-lang-cur">' + (FLAGS[_lang] || '') + ' ' + _lang.toUpperCase() + '</span> ▾';
      var anchor = document.getElementById('btn-admin') || document.getElementById('btn-launcher');
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(btn, anchor); else tb.appendChild(btn);
      // dropdown în BODY (ca să NU fie clipat de overflow-ul topbar-ului), poziționat fix
      var dd = document.createElement('div'); dd.id = 'ux-lang-dd';
      dd.style.cssText = 'display:none;position:fixed;z-index:10050;background:#0c1424;border:1px solid rgba(255,255,255,.16);border-radius:9px;padding:5px;min-width:150px;box-shadow:0 12px 30px rgba(0,0,0,.55)';
      dd.innerHTML = LANGS.map(function (l) { return '<button onclick="UrbanXI18n.setLang(\'' + l + '\');UrbanXI18n._ddToggle(false)" style="display:block;width:100%;text-align:left;background:' + (l === _lang ? 'rgba(56,138,221,.2)' : 'transparent') + ';border:0;color:#e6edf7;border-radius:6px;padding:8px 11px;cursor:pointer;font-size:12px">' + (FLAGS[l] || '') + ' ' + ({ ro: 'Română', en: 'English', fr: 'Français', de: 'Deutsch' }[l]) + '</button>'; }).join('');
      document.body.appendChild(dd);
      btn.addEventListener('click', function (e) { e.stopPropagation(); _ddToggle(); });
      document.addEventListener('click', function () { _ddToggle(false); });
    } catch (e) {}
  }
  function _ddToggle(force) {
    var dd = document.getElementById('ux-lang-dd'), btn = document.getElementById('ux-lang-btn'); if (!dd || !btn) return;
    var show = (force === false) ? false : (dd.style.display === 'none');
    if (show) { var r = btn.getBoundingClientRect(); dd.style.top = (r.bottom + 4) + 'px'; dd.style.right = (window.innerWidth - r.right) + 'px'; dd.style.left = 'auto'; dd.style.display = 'block'; }
    else dd.style.display = 'none';
  }
  function _refreshTopbarLabel() { var c = document.getElementById('ux-lang-cur'); if (c) c.textContent = (FLAGS[_lang] || '') + ' ' + _lang.toUpperCase(); }

  // Startup: pornește observerul + traduce DOM-ul existent dacă limba ≠ RO.
  function _boot() { try { _startObserver(); _injectTopbarSwitcher(); if (_lang !== 'ro') _ensureAutoDict(applyAll); } catch (e) {} }
  if (G.document && document.readyState !== 'loading') setTimeout(_boot, 0);
  else if (G.document) document.addEventListener('DOMContentLoaded', _boot);
  console.log('[i18n] încărcat · limbă: ' + _lang + ' · RO/EN/FR/DE (fallback RO + DOM auto)');
})(window);
