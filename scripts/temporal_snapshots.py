#!/usr/bin/env python3
"""
UrbanX — scripts/temporal_snapshots.py
========================================
Temporal Engine: versionează starea urbanistică a UAT-urilor în timp.

Funcționalități:
  1. Snapshot automat la fiecare rulare pipeline
  2. Tracking modificări reguli (ce s-a schimbat, când, de ce)
  3. Comparație între două momente în timp
  4. Export timeline pentru UI (24-timeline-layer.js)

Schema folosită: urbanx_rule_history (deja în urbanx_schema.sql)
Tabele noi: urbanx_snapshots, urbanx_timeline_events
"""

import os, json, logging, hashlib, requests
from datetime import datetime, date
from dataclasses import dataclass, asdict, field
from typing import Optional

log = logging.getLogger('temporal')
logging.basicConfig(level=logging.INFO, format='%(asctime)s [TEMPORAL] %(levelname)s %(message)s', datefmt='%H:%M:%S')

SB_URL = os.environ.get('SUPABASE_URL', '')
SB_KEY = os.environ.get('SUPABASE_SERVICE_KEY', '')

TEMPORAL_SCHEMA_SQL = """
-- Adaugă în Supabase SQL Editor (după urbanx_schema.sql)

-- Snapshot-uri stare urbanistică per UAT
CREATE TABLE IF NOT EXISTS urbanx_snapshots (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    uat_code     TEXT NOT NULL,
    snapshot_date DATE NOT NULL,
    snapshot_hash TEXT,           -- SHA256 al întregii stări
    rules_count  INTEGER DEFAULT 0,
    docs_count   INTEGER DEFAULT 0,
    utrs_count   INTEGER DEFAULT 0,
    rules_json   JSONB,           -- snapshot complet al regulilor active
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(uat_code, snapshot_date)
);

-- Evenimente timeline (schimbări semnificative)
CREATE TABLE IF NOT EXISTS urbanx_timeline_events (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    uat_code     TEXT NOT NULL,
    utr_code     TEXT,
    event_date   DATE NOT NULL,
    event_type   TEXT NOT NULL,  -- RULE_CHANGE|DOC_ADDED|UTR_ADDED|CONFLICT_RESOLVED
    rule_type    TEXT,
    old_value    FLOAT,
    new_value    FLOAT,
    doc_type     TEXT,
    description  TEXT,
    impact       TEXT,           -- LOW|MEDIUM|HIGH
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_snapshots_uat  ON urbanx_snapshots (uat_code, snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_timeline_uat   ON urbanx_timeline_events (uat_code, event_date DESC);

-- RLS
ALTER TABLE urbanx_snapshots       ENABLE ROW LEVEL SECURITY;
ALTER TABLE urbanx_timeline_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_snapshots" ON urbanx_snapshots       FOR SELECT USING (true);
CREATE POLICY "public_read_timeline"  ON urbanx_timeline_events FOR SELECT USING (true);

-- Funcție: evoluția unui indicator în timp
CREATE OR REPLACE FUNCTION get_rule_timeline(
    p_uat  TEXT, p_utr  TEXT, p_rule_type TEXT
)
RETURNS TABLE (
    changed_at  TIMESTAMPTZ,
    old_value   FLOAT,
    new_value   FLOAT,
    reason      TEXT
) AS $$
    SELECT changed_at, previous_value, new_value, reason
    FROM urbanx_rule_history rh
    JOIN urbanx_rules r ON r.id = rh.rule_id::UUID
    WHERE r.uat_code = p_uat AND r.utr_code = p_utr AND r.rule_type = p_rule_type
    ORDER BY changed_at ASC;
$$ LANGUAGE SQL STABLE;
"""


@dataclass
class Snapshot:
    uat_code:      str
    snapshot_date: str
    rules:         list = field(default_factory=list)
    snapshot_hash: str = ''
    rules_count:   int = 0
    docs_count:    int = 0
    utrs_count:    int = 0


@dataclass
class TimelineEvent:
    uat_code:   str
    event_date: str
    event_type: str
    utr_code:   str  = ''
    rule_type:  str  = ''
    old_value:  Optional[float] = None
    new_value:  Optional[float] = None
    doc_type:   str  = ''
    description:str  = ''
    impact:     str  = 'MEDIUM'


class TemporalEngine:

    def __init__(self):
        self.sb_url = SB_URL
        self.sb_key = SB_KEY
        self._headers = {
            'apikey': self.sb_key,
            'Authorization': f'Bearer {self.sb_key}',
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates',
        }

    def _sb_get(self, table: str, params: str = '') -> list:
        if not self.sb_url:
            return []
        try:
            r = requests.get(f'{self.sb_url}/rest/v1/{table}?{params}',
                             headers=self._headers, timeout=20)
            return r.json() if r.status_code == 200 else []
        except Exception as e:
            log.warning(f'SB get {table}: {e}')
            return []

    def _sb_post(self, table: str, data: list) -> bool:
        if not self.sb_url or not data:
            return False
        try:
            r = requests.post(f'{self.sb_url}/rest/v1/{table}',
                              headers=self._headers, json=data, timeout=20)
            return r.status_code in (200, 201)
        except Exception as e:
            log.warning(f'SB post {table}: {e}')
            return False

    # ── Snapshot ──────────────────────────────────────────────────────────────

    def take_snapshot(self, uat_code: str) -> Snapshot:
        """Creează un snapshot al stării curente a unui UAT."""
        today = date.today().isoformat()
        log.info(f'Snapshot {uat_code} @ {today}')

        rules = self._sb_get('urbanx_rules', f'uat_code=eq.{uat_code}&status=eq.ACTIVE')
        docs  = self._sb_get('urbanx_documents', f'uat_code=eq.{uat_code}&status=eq.ACTIVE')
        utrs  = self._sb_get('urbanx_utr', f'uat_code=eq.{uat_code}&status=eq.ACTIVE')

        rules_json = [
            {'rule_type': r.get('rule_type'), 'value_num': r.get('value_num'),
             'value_str': r.get('value_str'), 'utr_code': r.get('utr_code'),
             'doc_type': r.get('doc_type'), 'confidence': r.get('confidence')}
            for r in rules
        ]

        # Hash stare
        state_str   = json.dumps(rules_json, sort_keys=True)
        snap_hash   = hashlib.sha256(state_str.encode()).hexdigest()[:16]

        snap = Snapshot(
            uat_code=uat_code, snapshot_date=today,
            rules=rules_json, snapshot_hash=snap_hash,
            rules_count=len(rules), docs_count=len(docs), utrs_count=len(utrs),
        )

        # Salvare în Supabase
        record = {
            'uat_code':      snap.uat_code,
            'snapshot_date': snap.snapshot_date,
            'snapshot_hash': snap.snapshot_hash,
            'rules_count':   snap.rules_count,
            'docs_count':    snap.docs_count,
            'utrs_count':    snap.utrs_count,
            'rules_json':    snap.rules,
        }
        ok = self._sb_post('urbanx_snapshots', [record])
        log.info(f'  Snapshot salvat: {snap.rules_count} reguli, hash={snap_hash} → {"OK" if ok else "LOCAL"}')

        return snap

    # ── Detectare modificări ──────────────────────────────────────────────────

    def detect_changes(self, uat_code: str) -> list[TimelineEvent]:
        """
        Compară snapshot-ul curent cu cel anterior.
        Returnează lista de modificări (TimelineEvent).
        """
        snapshots = self._sb_get(
            'urbanx_snapshots',
            f'uat_code=eq.{uat_code}&order=snapshot_date.desc&limit=2'
        )
        if len(snapshots) < 2:
            log.info(f'  Insuficiente snapshot-uri pentru {uat_code} (min 2)')
            return []

        current  = snapshots[0]
        previous = snapshots[1]

        curr_rules = {r['rule_type']+'_'+r.get('utr_code',''):r
                      for r in (current.get('rules_json') or [])}
        prev_rules = {r['rule_type']+'_'+r.get('utr_code',''):r
                      for r in (previous.get('rules_json') or [])}

        events = []
        today  = date.today().isoformat()

        # Modificări valori
        for key, curr_r in curr_rules.items():
            if key in prev_rules:
                prev_r = prev_rules[key]
                curr_v = curr_r.get('value_num')
                prev_v = prev_r.get('value_num')
                if curr_v != prev_v and curr_v is not None and prev_v is not None:
                    impact = 'HIGH' if abs(curr_v - prev_v) > 5 else 'MEDIUM'
                    events.append(TimelineEvent(
                        uat_code   = uat_code,
                        event_date = today,
                        event_type = 'RULE_CHANGE',
                        utr_code   = curr_r.get('utr_code', ''),
                        rule_type  = curr_r.get('rule_type', ''),
                        old_value  = prev_v,
                        new_value  = curr_v,
                        doc_type   = curr_r.get('doc_type', ''),
                        description= f'{curr_r.get("rule_type")} modificat: {prev_v} → {curr_v}',
                        impact     = impact,
                    ))

        # Reguli noi
        for key in set(curr_rules) - set(prev_rules):
            r = curr_rules[key]
            events.append(TimelineEvent(
                uat_code   = uat_code,
                event_date = today,
                event_type = 'RULE_CHANGE',
                utr_code   = r.get('utr_code',''),
                rule_type  = r.get('rule_type',''),
                new_value  = r.get('value_num'),
                description= f'Regulă nouă: {r.get("rule_type")} = {r.get("value_num")}',
                impact     = 'MEDIUM',
            ))

        # Salvare events
        if events:
            records = [asdict(e) for e in events]
            self._sb_post('urbanx_timeline_events', records)
            log.info(f'  {len(events)} modificări detectate și salvate')
        else:
            log.info('  Nicio modificare față de snapshot-ul anterior')

        return events

    # ── Comparație ────────────────────────────────────────────────────────────

    def compare_dates(self, uat_code: str, date_a: str, date_b: str) -> dict:
        """
        Compară starea unui UAT între două date.
        date_a, date_b: ISO format (2018-01-01)
        """
        snaps = self._sb_get(
            'urbanx_snapshots',
            f'uat_code=eq.{uat_code}&snapshot_date=gte.{min(date_a,date_b)}&snapshot_date=lte.{max(date_a,date_b)}&order=snapshot_date.asc'
        )
        if len(snaps) < 2:
            return {'error': 'Insuficiente date istorice', 'snapshots': len(snaps)}

        snap_a = snaps[0]
        snap_b = snaps[-1]

        rules_a = {r['rule_type']+'_'+r.get('utr_code',''):r for r in (snap_a.get('rules_json') or [])}
        rules_b = {r['rule_type']+'_'+r.get('utr_code',''):r for r in (snap_b.get('rules_json') or [])}

        changes = []
        for key in set(list(rules_a.keys()) + list(rules_b.keys())):
            ra = rules_a.get(key)
            rb = rules_b.get(key)
            if ra and rb:
                va, vb = ra.get('value_num'), rb.get('value_num')
                if va != vb:
                    changes.append({
                        'rule_type': ra.get('rule_type'),
                        'utr_code':  ra.get('utr_code'),
                        'value_a':   va, 'value_b': vb,
                        'delta':     round(vb-va, 2) if va is not None and vb is not None else None,
                    })
            elif ra and not rb:
                changes.append({'rule_type': ra.get('rule_type'), 'status': 'REMOVED'})
            elif rb and not ra:
                changes.append({'rule_type': rb.get('rule_type'), 'status': 'ADDED'})

        return {
            'uat_code':     uat_code,
            'date_a':       snap_a.get('snapshot_date'),
            'date_b':       snap_b.get('snapshot_date'),
            'rules_a':      snap_a.get('rules_count', 0),
            'rules_b':      snap_b.get('rules_count', 0),
            'changes':      changes,
            'changes_count':len(changes),
        }

    # ── Timeline pentru UI ────────────────────────────────────────────────────

    def get_timeline_data(self, uat_code: str, utr_code: str = '') -> dict:
        """
        Returnează date pentru 24-timeline-layer.js.
        Format: { events: [...], snapshots: [...] }
        """
        events_q = f'uat_code=eq.{uat_code}&order=event_date.desc&limit=50'
        if utr_code:
            events_q += f'&utr_code=eq.{utr_code}'

        events    = self._sb_get('urbanx_timeline_events', events_q)
        snapshots = self._sb_get('urbanx_snapshots',
                                  f'uat_code=eq.{uat_code}&order=snapshot_date.desc&limit=12')

        return {
            'uat_code':  uat_code,
            'utr_code':  utr_code or 'ALL',
            'events':    events,
            'snapshots': [
                {
                    'date':        s.get('snapshot_date'),
                    'rules_count': s.get('rules_count', 0),
                    'hash':        s.get('snapshot_hash', ''),
                }
                for s in snapshots
            ],
            'generated_at': datetime.utcnow().isoformat() + 'Z',
        }

    # ── Batch UAT-uri ─────────────────────────────────────────────────────────

    def run_all(self, uat_codes: list[str]):
        """Rulează snapshot + detectare modificări pentru toate UAT-urile."""
        log.info(f'Temporal Engine: {len(uat_codes)} UAT-uri')
        results = {}
        for code in uat_codes:
            snap   = self.take_snapshot(code)
            events = self.detect_changes(code)
            results[code] = {'snapshot': snap.snapshot_hash, 'changes': len(events)}
        log.info('Temporal Engine complet')
        return results


def main():
    import argparse
    parser = argparse.ArgumentParser(description='UrbanX Temporal Engine')
    parser.add_argument('--snapshot', help='Crează snapshot pentru UAT (ex: RO-CJ-001 sau all)')
    parser.add_argument('--compare',  help='Compară: UAT_CODE:DATA_A:DATA_B')
    parser.add_argument('--timeline', help='Timeline: UAT_CODE[:UTR_CODE]')
    parser.add_argument('--schema',   action='store_true', help='Printează schema SQL')
    args = parser.parse_args()

    if args.schema:
        print(TEMPORAL_SCHEMA_SQL)
        return

    engine = TemporalEngine()

    if args.snapshot:
        from ancpi_adapter import UAT_REGISTRY
        codes = list(UAT_REGISTRY.keys()) if args.snapshot == 'all' else [args.snapshot]
        engine.run_all(codes)

    elif args.compare:
        parts = args.compare.split(':')
        if len(parts) == 3:
            result = engine.compare_dates(parts[0], parts[1], parts[2])
            print(json.dumps(result, ensure_ascii=False, indent=2))

    elif args.timeline:
        parts = args.timeline.split(':')
        uat   = parts[0]
        utr   = ':'.join(parts[1:]) if len(parts) > 1 else ''
        data  = engine.get_timeline_data(uat, utr)
        print(json.dumps(data, ensure_ascii=False, indent=2))

    else:
        parser.print_help()

if __name__ == '__main__':
    import json
    main()
