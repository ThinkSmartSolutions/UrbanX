#!/usr/bin/env python3
"""
UrbanX — scripts/neo4j_populator.py
=====================================
Citește regulile canonice din Supabase (urbanx_rules)
și construiește graful Urban Knowledge Graph în Neo4j.

Rulare:
  pip install neo4j requests
  python neo4j_populator.py

Variabile environment:
  NEO4J_URI      = bolt://localhost:7687  (sau Neo4j Aura: neo4j+s://xxx.databases.neo4j.io)
  NEO4J_USER     = neo4j
  NEO4J_PASSWORD = parola
  SUPABASE_URL   = https://xxx.supabase.co
  SUPABASE_KEY   = sb_service_...
"""

import os
import json
import logging
import requests
from datetime import datetime
from typing import Optional

log = logging.getLogger('neo4j_populator')
logging.basicConfig(level=logging.INFO, format='%(asctime)s [NEO4J] %(levelname)s %(message)s', datefmt='%H:%M:%S')

# ── Config ────────────────────────────────────────────────────────────────────

NEO4J_URI  = os.environ.get('NEO4J_URI',      'bolt://localhost:7687')
NEO4J_USER = os.environ.get('NEO4J_USER',     'neo4j')
NEO4J_PASS = os.environ.get('NEO4J_PASSWORD', 'password')
SB_URL     = os.environ.get('SUPABASE_URL',   '')
SB_KEY     = os.environ.get('SUPABASE_SERVICE_KEY', '')


# ── Neo4j driver (lazy import) ────────────────────────────────────────────────

def _get_driver():
    try:
        from neo4j import GraphDatabase
        return GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASS))
    except ImportError:
        log.error('neo4j driver lipsă: pip install neo4j')
        return None
    except Exception as e:
        log.error(f'Neo4j connection failed: {e}')
        return None


# ── Fetch din Supabase ────────────────────────────────────────────────────────

def fetch_rules_from_supabase() -> list[dict]:
    if not SB_URL:
        log.warning('SUPABASE_URL nedefinit')
        return []
    try:
        r = requests.get(
            f'{SB_URL}/rest/v1/urbanx_rules?status=eq.ACTIVE&order=priority.desc',
            headers={'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'},
            timeout=30
        )
        if r.status_code == 200:
            rules = r.json()
            log.info(f'Supabase: {len(rules)} reguli active')
            return rules
        log.error(f'Supabase error: {r.status_code}')
        return []
    except Exception as e:
        log.error(f'Fetch failed: {e}')
        return []


def fetch_documents_from_supabase() -> list[dict]:
    if not SB_URL:
        return []
    try:
        r = requests.get(
            f'{SB_URL}/rest/v1/urbanx_documents?status=eq.ACTIVE',
            headers={'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'},
            timeout=30
        )
        return r.json() if r.status_code == 200 else []
    except Exception:
        return []


def fetch_utrs_from_supabase() -> list[dict]:
    if not SB_URL:
        return []
    try:
        r = requests.get(
            f'{SB_URL}/rest/v1/urbanx_utr?status=eq.ACTIVE',
            headers={'apikey': SB_KEY, 'Authorization': f'Bearer {SB_KEY}'},
            timeout=30
        )
        return r.json() if r.status_code == 200 else []
    except Exception:
        return []


# ── Operații Neo4j ────────────────────────────────────────────────────────────

class Neo4jPopulator:
    """
    Populează graful Neo4j din datele Supabase.
    """

    def __init__(self):
        self.driver = _get_driver()
        self.stats  = {'nodes': 0, 'relations': 0, 'errors': 0}

    def _run(self, query: str, params: dict = None):
        if not self.driver:
            return None
        with self.driver.session() as session:
            return session.run(query, params or {})

    def close(self):
        if self.driver:
            self.driver.close()

    # ── Creare noduri ─────────────────────────────────────────────────────────

    def upsert_uat(self, uat_code: str, name: str = '', county: str = ''):
        q = """
        MERGE (u:UAT {code: $code})
        SET u.name = $name, u.county = $county, u.updated_at = $ts
        """
        self._run(q, {'code': uat_code, 'name': name, 'county': county,
                      'ts': datetime.utcnow().isoformat()})
        self.stats['nodes'] += 1

    def upsert_document(self, doc: dict):
        q = """
        MERGE (d:Document {doc_id: $doc_id})
        SET d.doc_type   = $doc_type,
            d.title      = $title,
            d.uat_code   = $uat_code,
            d.status     = $status,
            d.priority   = $priority,
            d.source_url = $source_url,
            d.updated_at = $ts
        """
        self._run(q, {
            'doc_id':     doc.get('id') or doc.get('doc_id', ''),
            'doc_type':   doc.get('doc_type', 'UNKNOWN'),
            'title':      doc.get('title', ''),
            'uat_code':   doc.get('uat_code', ''),
            'status':     doc.get('status', 'ACTIVE'),
            'priority':   doc.get('priority', 10),
            'source_url': doc.get('source_url', ''),
            'ts':         datetime.utcnow().isoformat(),
        })
        self.stats['nodes'] += 1

    def upsert_utr(self, utr: dict):
        utr_key = f"{utr.get('uat_code')}:{utr.get('utr_code')}"
        q = """
        MERGE (z:UTR {key: $key})
        SET z.utr_code      = $utr_code,
            z.uat_code      = $uat_code,
            z.name          = $name,
            z.function_type = $function_type,
            z.status        = $status,
            z.updated_at    = $ts
        """
        self._run(q, {
            'key':           utr_key,
            'utr_code':      utr.get('utr_code', ''),
            'uat_code':      utr.get('uat_code', ''),
            'name':          utr.get('utr_name', ''),
            'function_type': utr.get('function_type', 'unknown'),
            'status':        utr.get('status', 'ACTIVE'),
            'ts':            datetime.utcnow().isoformat(),
        })
        self.stats['nodes'] += 1

    def upsert_rule(self, rule: dict):
        q = """
        MERGE (r:Rule {rule_id: $rule_id})
        SET r.rule_type  = $rule_type,
            r.value_num  = $value_num,
            r.value_str  = $value_str,
            r.unit       = $unit,
            r.utr_code   = $utr_code,
            r.uat_code   = $uat_code,
            r.doc_type   = $doc_type,
            r.status     = $status,
            r.priority   = $priority,
            r.confidence = $confidence,
            r.updated_at = $ts
        """
        self._run(q, {
            'rule_id':    rule.get('rule_id') or rule.get('id', ''),
            'rule_type':  rule.get('rule_type', ''),
            'value_num':  rule.get('value_num'),
            'value_str':  rule.get('value_str'),
            'unit':       rule.get('unit', ''),
            'utr_code':   rule.get('utr_code', ''),
            'uat_code':   rule.get('uat_code', ''),
            'doc_type':   rule.get('doc_type', ''),
            'status':     rule.get('status', 'ACTIVE'),
            'priority':   rule.get('priority', 10),
            'confidence': rule.get('confidence', 0.5),
            'ts':         datetime.utcnow().isoformat(),
        })
        self.stats['nodes'] += 1

    # ── Creare relații ────────────────────────────────────────────────────────

    def link_rule_to_utr(self, rule_id: str, uat_code: str, utr_code: str):
        utr_key = f'{uat_code}:{utr_code}'
        q = """
        MATCH (r:Rule {rule_id: $rule_id}), (z:UTR {key: $utr_key})
        MERGE (r)-[:APPLIES_TO]->(z)
        """
        self._run(q, {'rule_id': rule_id, 'utr_key': utr_key})
        self.stats['relations'] += 1

    def link_document_to_utr(self, doc_id: str, uat_code: str, utr_code: str):
        utr_key = f'{uat_code}:{utr_code}'
        q = """
        MATCH (d:Document {doc_id: $doc_id}), (z:UTR {key: $utr_key})
        MERGE (d)-[:DEFINES_UTR]->(z)
        """
        self._run(q, {'doc_id': doc_id, 'utr_key': utr_key})
        self.stats['relations'] += 1

    def link_document_to_rule(self, doc_id: str, rule_id: str, confidence: float):
        q = """
        MATCH (d:Document {doc_id: $doc_id}), (r:Rule {rule_id: $rule_id})
        MERGE (d)-[rel:DEFINES]->(r)
        SET rel.confidence = $confidence
        """
        self._run(q, {'doc_id': doc_id, 'rule_id': rule_id, 'confidence': confidence})
        self.stats['relations'] += 1

    def link_uat_to_document(self, uat_code: str, doc_id: str):
        q = """
        MATCH (u:UAT {code: $uat_code}), (d:Document {doc_id: $doc_id})
        MERGE (u)-[:HAS_DOCUMENT]->(d)
        """
        self._run(q, {'uat_code': uat_code, 'doc_id': doc_id})
        self.stats['relations'] += 1

    def mark_override(self, winner_id: str, loser_id: str, reason: str):
        """Marchează că o regulă o suprascrié pe alta."""
        q = """
        MATCH (w:Rule {rule_id: $winner}), (l:Rule {rule_id: $loser})
        MERGE (w)-[:OVERRIDES {reason: $reason, at: $ts}]->(l)
        SET l.status = 'SUPERSEDED'
        """
        self._run(q, {'winner': winner_id, 'loser': loser_id,
                      'reason': reason, 'ts': datetime.utcnow().isoformat()})
        self.stats['relations'] += 1

    def mark_conflict(self, rule_id_a: str, rule_id_b: str):
        q = """
        MATCH (a:Rule {rule_id: $id_a}), (b:Rule {rule_id: $id_b})
        MERGE (a)-[:CONFLICTS_WITH]->(b)
        """
        self._run(q, {'id_a': rule_id_a, 'id_b': rule_id_b})
        self.stats['relations'] += 1

    # ── Query: legal chain ────────────────────────────────────────────────────

    def get_legal_chain(self, uat_code: str, utr_code: str) -> list[dict]:
        """
        Returnează lanțul juridic complet pentru un UTR:
        parcelă → UTR → regulă → document → HCL sursă
        """
        if not self.driver:
            return []
        utr_key = f'{uat_code}:{utr_code}'
        q = """
        MATCH (u:UAT {code: $uat_code})-[:HAS_DOCUMENT]->(d:Document)
              -[:DEFINES]->(r:Rule)-[:APPLIES_TO]->(z:UTR {key: $utr_key})
        WHERE r.status = 'ACTIVE'
        RETURN r.rule_type  AS rule_type,
               r.value_num  AS value_num,
               r.value_str  AS value_str,
               r.unit       AS unit,
               r.confidence AS confidence,
               d.doc_type   AS doc_type,
               d.title      AS doc_title,
               d.source_url AS source_url
        ORDER BY r.priority DESC
        """
        with self.driver.session() as session:
            result = session.run(q, {'uat_code': uat_code, 'utr_key': utr_key})
            return [dict(record) for record in result]

    def get_conflicts(self, uat_code: str = '') -> list[dict]:
        """Returnează toate conflictele detectate."""
        if not self.driver:
            return []
        q = """
        MATCH (a:Rule)-[:CONFLICTS_WITH]->(b:Rule)
        WHERE ($uat = '' OR a.uat_code = $uat)
        RETURN a.rule_id AS rule_a, b.rule_id AS rule_b,
               a.rule_type AS rule_type, a.utr_code AS utr_code,
               a.value_num AS value_a, b.value_num AS value_b
        """
        with self.driver.session() as session:
            result = session.run(q, {'uat': uat_code})
            return [dict(record) for record in result]

    # ── Populate complet ──────────────────────────────────────────────────────

    def populate_from_supabase(self):
        """
        Populate complet din Supabase:
        1. Fetch documente, UTR-uri, reguli
        2. Creează noduri + relații
        3. Detectează conflicte
        """
        log.info('═══ NEO4J POPULATE START ═══')
        start = datetime.utcnow()

        # Fetch date
        rules     = fetch_rules_from_supabase()
        documents = fetch_documents_from_supabase()
        utrs      = fetch_utrs_from_supabase()

        log.info(f'Date: {len(documents)} documente, {len(utrs)} UTR-uri, {len(rules)} reguli')

        if not rules and not documents:
            log.warning('Nicio dată în Supabase — demo mode cu date hardcoded')
            self._populate_demo()
            return

        # UAT-uri unice
        uat_codes = set(r.get('uat_code','') for r in rules if r.get('uat_code'))
        for code in uat_codes:
            self.upsert_uat(code)

        # Documente
        for doc in documents:
            self.upsert_document(doc)
            if doc.get('uat_code'):
                self.link_uat_to_document(doc['uat_code'], doc.get('id') or doc.get('doc_id',''))

        # UTR-uri
        for utr in utrs:
            self.upsert_utr(utr)
            if utr.get('doc_id'):
                self.link_document_to_utr(utr['doc_id'], utr['uat_code'], utr['utr_code'])

        # Reguli
        for rule in rules:
            self.upsert_rule(rule)
            rule_id  = rule.get('rule_id') or rule.get('id', '')
            uat_code = rule.get('uat_code', '')
            utr_code = rule.get('utr_code', '')
            doc_type = rule.get('doc_type', '')

            if utr_code:
                self.link_rule_to_utr(rule_id, uat_code, utr_code)

        # Detectare conflicte (pe batch de reguli)
        seen = {}
        for rule in rules:
            key = f"{rule.get('uat_code')}:{rule.get('utr_code')}:{rule.get('rule_type')}"
            if key in seen:
                # Conflict potențial
                prev = seen[key]
                if prev.get('value_num') != rule.get('value_num'):
                    self.mark_conflict(
                        prev.get('rule_id') or prev.get('id',''),
                        rule.get('rule_id') or rule.get('id','')
                    )
            else:
                seen[key] = rule

        elapsed = (datetime.utcnow() - start).total_seconds()
        log.info(f'═══ POPULATE COMPLET în {elapsed:.1f}s ═══')
        log.info(f'   Noduri create: {self.stats["nodes"]}')
        log.info(f'   Relații create: {self.stats["relations"]}')
        log.info(f'   Erori: {self.stats["errors"]}')

    def _populate_demo(self):
        """Date demo pentru testare fără Supabase."""
        from ancpi_adapter import UAT_REGISTRY
        for code, info in list(UAT_REGISTRY.items())[:2]:
            self.upsert_uat(code, info['name'])
        log.info('Demo: 2 UAT-uri create')


# ── Serialize pentru API ──────────────────────────────────────────────────────

def legal_chain_to_json(chain: list[dict]) -> dict:
    """
    Transformă lanțul juridic în format pentru UI (js/23-legal-chain.js).
    """
    return {
        'rules': [
            {
                'rule_type':  r['rule_type'],
                'value':      r['value_num'] if r['value_num'] is not None else r['value_str'],
                'unit':       r['unit'] or '',
                'confidence': r['confidence'],
                'source': {
                    'doc_type':   r['doc_type'],
                    'doc_title':  r['doc_title'],
                    'source_url': r['source_url'],
                },
            }
            for r in chain
        ],
        'total': len(chain),
        'generated_at': datetime.utcnow().isoformat() + 'Z',
    }


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    import argparse
    parser = argparse.ArgumentParser(description='UrbanX Neo4j Populator')
    parser.add_argument('--populate', action='store_true', help='Populate din Supabase')
    parser.add_argument('--chain',    help='Legal chain: UAT_CODE:UTR_CODE')
    parser.add_argument('--conflicts',action='store_true', help='Afișează conflicte')
    args = parser.parse_args()

    pop = Neo4jPopulator()

    if args.populate:
        pop.populate_from_supabase()

    elif args.chain:
        parts = args.chain.split(':')
        if len(parts) >= 2:
            chain = pop.get_legal_chain(parts[0], ':'.join(parts[1:]))
            print(json.dumps(legal_chain_to_json(chain), ensure_ascii=False, indent=2))

    elif args.conflicts:
        conflicts = pop.get_conflicts()
        print(json.dumps(conflicts, ensure_ascii=False, indent=2))

    else:
        parser.print_help()

    pop.close()


if __name__ == '__main__':
    import json
    main()
