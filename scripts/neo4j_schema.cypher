// ═══════════════════════════════════════════════════════════════════════════
// UrbanX — Urban Knowledge Graph Schema
// Neo4j Cypher — Rulează în Neo4j Browser sau neo4j-admin
// ═══════════════════════════════════════════════════════════════════════════

// ── CONSTRAINTS (unicitate + indexuri automate) ───────────────────────────

CREATE CONSTRAINT uat_code_unique IF NOT EXISTS
FOR (u:UAT) REQUIRE u.code IS UNIQUE;

CREATE CONSTRAINT document_id_unique IF NOT EXISTS
FOR (d:Document) REQUIRE d.doc_id IS UNIQUE;

CREATE CONSTRAINT rule_id_unique IF NOT EXISTS
FOR (r:Rule) REQUIRE r.rule_id IS UNIQUE;

CREATE CONSTRAINT utr_key_unique IF NOT EXISTS
FOR (z:UTR) REQUIRE z.key IS UNIQUE;

CREATE CONSTRAINT parcel_id_unique IF NOT EXISTS
FOR (p:Parcel) REQUIRE p.parcel_id IS UNIQUE;

CREATE CONSTRAINT case_number_unique IF NOT EXISTS
FOR (c:Case) REQUIRE c.case_number IS UNIQUE;

// ── INDEXURI SUPLIMENTARE ────────────────────────────────────────────────

CREATE INDEX utr_code_idx IF NOT EXISTS FOR (z:UTR) ON (z.utr_code);
CREATE INDEX rule_type_idx IF NOT EXISTS FOR (r:Rule) ON (r.rule_type);
CREATE INDEX rule_status_idx IF NOT EXISTS FOR (r:Rule) ON (r.status);
CREATE INDEX document_type_idx IF NOT EXISTS FOR (d:Document) ON (d.doc_type);
CREATE INDEX parcel_nr_cad_idx IF NOT EXISTS FOR (p:Parcel) ON (p.nr_cadastral);

// ═══════════════════════════════════════════════════════════════════════════
// NODURI EXEMPLU — Cluj-Napoca L1a
// (populate via neo4j_populator.py în producție)
// ═══════════════════════════════════════════════════════════════════════════

// UAT
MERGE (:UAT {
  code:   'RO-CJ-001',
  name:   'Cluj-Napoca',
  county: 'Cluj',
  domain: 'https://www.primariaclujnapoca.ro'
});

// Document PUG
MERGE (:Document {
  doc_id:      'doc_clujpug2024',
  doc_type:    'PUG',
  title:       'Plan Urbanistic General Cluj-Napoca 2024',
  uat_code:    'RO-CJ-001',
  status:      'ACTIVE',
  priority:    60,
  source_url:  'https://www.primariaclujnapoca.ro/urbanism/pug',
  valid_from:  '2024-01-01',
  valid_to:    null
});

// UTR
MERGE (:UTR {
  key:           'RO-CJ-001:L1a',
  utr_code:      'L1a',
  uat_code:      'RO-CJ-001',
  name:          'Zone de locuințe individuale cu regim mic de înălțime',
  function_type: 'locuire_individuala',
  status:        'ACTIVE'
});

// Reguli
MERGE (:Rule {
  rule_id:    'rule_clujpug_l1a_pot',
  rule_type:  'POT_MAX',
  value_num:  35.0,
  value_str:  null,
  unit:       '%',
  utr_code:   'L1a',
  uat_code:   'RO-CJ-001',
  doc_type:   'PUG',
  status:     'ACTIVE',
  priority:   60,
  confidence: 0.88
});

MERGE (:Rule {
  rule_id:    'rule_clujpug_l1a_cut',
  rule_type:  'CUT_MAX',
  value_num:  1.2,
  value_str:  null,
  unit:       '',
  utr_code:   'L1a',
  uat_code:   'RO-CJ-001',
  doc_type:   'PUG',
  status:     'ACTIVE',
  priority:   60,
  confidence: 0.88
});

MERGE (:Rule {
  rule_id:    'rule_clujpug_l1a_rh',
  rule_type:  'RH_MAX',
  value_num:  null,
  value_str:  'P+2',
  unit:       '',
  utr_code:   'L1a',
  uat_code:   'RO-CJ-001',
  doc_type:   'PUG',
  status:     'ACTIVE',
  priority:   60,
  confidence: 0.85
});

// ── RELAȚII exemplu OVERRIDES și CONFLICTS_WITH ──────────────────────────
// Exemplu: un PUZ care suprascrié un PUG pentru aceeași UTR
// MATCH (puz:Document {doc_type:'PUZ'}), (pug:Document {doc_type:'PUG'})
// WHERE puz.uat_code = pug.uat_code
// MERGE (puz)-[:OVERRIDES {since:'2024-01-01'}]->(pug);

// Exemplu: două reguli cu valori diferite pentru același tip+UTR
// MATCH (r1:Rule {rule_id:'rule_a'}), (r2:Rule {rule_id:'rule_b'})
// WHERE r1.rule_type = r2.rule_type AND r1.utr_code = r2.utr_code
// MERGE (r1)-[:CONFLICTS_WITH]->(r2);

// ── RELAȚII ──────────────────────────────────────────────────────────────

// UAT → Document
MATCH (u:UAT {code:'RO-CJ-001'}), (d:Document {doc_id:'doc_clujpug2024'})
MERGE (u)-[:HAS_DOCUMENT {since:'2024-01-01'}]->(d);

// Document → UTR
MATCH (d:Document {doc_id:'doc_clujpug2024'}), (z:UTR {key:'RO-CJ-001:L1a'})
MERGE (d)-[:DEFINES_UTR]->(z);

// Document → Rule
MATCH (d:Document {doc_id:'doc_clujpug2024'}), (r:Rule {rule_id:'rule_clujpug_l1a_pot'})
MERGE (d)-[:DEFINES {extracted_at:'2026-05-19', confidence:0.88}]->(r);
MATCH (d:Document {doc_id:'doc_clujpug2024'}), (r:Rule {rule_id:'rule_clujpug_l1a_cut'})
MERGE (d)-[:DEFINES]->(r);
MATCH (d:Document {doc_id:'doc_clujpug2024'}), (r:Rule {rule_id:'rule_clujpug_l1a_rh'})
MERGE (d)-[:DEFINES]->(r);

// Rule → UTR
MATCH (r:Rule {rule_id:'rule_clujpug_l1a_pot'}), (z:UTR {key:'RO-CJ-001:L1a'})
MERGE (r)-[:APPLIES_TO]->(z);
MATCH (r:Rule {rule_id:'rule_clujpug_l1a_cut'}), (z:UTR {key:'RO-CJ-001:L1a'})
MERGE (r)-[:APPLIES_TO]->(z);
MATCH (r:Rule {rule_id:'rule_clujpug_l1a_rh'}), (z:UTR {key:'RO-CJ-001:L1a'})
MERGE (r)-[:APPLIES_TO]->(z);

// ── QUERY-URI UTILE ──────────────────────────────────────────────────────

// Q1: Ce reguli se aplică pentru UTR L1a în Cluj?
// MATCH (u:UAT {code:'RO-CJ-001'})-[:HAS_DOCUMENT]->(d:Document)
//       -[:DEFINES]->(r:Rule)-[:APPLIES_TO]->(z:UTR {utr_code:'L1a'})
// WHERE r.status = 'ACTIVE'
// RETURN r.rule_type, r.value_num, r.value_str, d.doc_type, d.title
// ORDER BY r.priority DESC

// Q2: Lanțul juridic complet pentru o regulă
// MATCH path = (u:UAT)-[:HAS_DOCUMENT]->(d)-[:DEFINES]->(r {rule_id:'rule_clujpug_l1a_pot'})-[:APPLIES_TO]->(z)
// RETURN path

// Q3: Conflicte — aceeași UTR, același tip, valori diferite
// MATCH (r1:Rule)-[:APPLIES_TO]->(z:UTR)<-[:APPLIES_TO]-(r2:Rule)
// WHERE r1.rule_type = r2.rule_type AND r1.value_num <> r2.value_num
//       AND r1.rule_id < r2.rule_id
// RETURN z.key, r1.rule_type, r1.value_num, r2.value_num,
//        r1.doc_type, r2.doc_type
