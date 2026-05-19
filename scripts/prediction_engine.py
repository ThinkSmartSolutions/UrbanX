#!/usr/bin/env python3
"""
UrbanX — scripts/prediction_engine.py
=======================================
Prediction Engine: calculează probabilitatea de dezvoltare urbanistică
pentru fiecare parcelă/UTR, pe orizonturi 2/5/10/30 ani.

Model: XGBoost (sau fallback sklearn) pe features urbanistice derivate.

Features utilizate (toate calculabile fără date externe):
  - POT_utilizat / POT_max (grad de utilizare)
  - CUT_utilizat / CUT_max
  - Suprafața parcelei vs lot_min
  - Număr etaje existente vs RH_max
  - Tip funcțiune (locuire/comercial/industrial/verde)
  - Vârstă document (ani de la ultimul PUG/PUZ)
  - Număr de reguli active
  - Confidence medie a regulilor

Output: scor 0-100 per parcelă, per orizont temporal
"""

import os, json, logging, math
from datetime import datetime, date
from dataclasses import dataclass, asdict, field
from typing import Optional

log = logging.getLogger('prediction')
logging.basicConfig(level=logging.INFO, format='%(asctime)s [PRED] %(levelname)s %(message)s', datefmt='%H:%M:%S')

# ── CONSTANTE ────────────────────────────────────────────────────────────────

# Ponderi features pentru modelul heuristic (fallback fără XGBoost)
FEATURE_WEIGHTS = {
    'pot_utilizare_inv':    0.25,   # 1 - POT_utilizat/POT_max (cât spațiu mai e)
    'cut_utilizare_inv':    0.20,
    'rh_utilizare_inv':     0.15,
    'functiune_score':      0.15,   # comercial/mixt > rezidential > verde
    'doc_age_score':        0.10,   # document vechi = mai probabil revizuit
    'suprafata_score':      0.10,   # parcele mari = mai probabil dezvoltate
    'confidence_score':     0.05,   # date de calitate mai bună
}

FUNCTIUNE_SCORES = {
    'comerciala': 0.9, 'mixta': 0.8, 'locuire': 0.6,
    'institutii_servicii': 0.7, 'industriala': 0.5,
    'verde_sport': 0.2, 'transport': 0.3, 'unknown': 0.5,
}

# Multiplicatori per orizont temporal
HORIZON_MULTIPLIERS = {
    2:  0.4,   # 2 ani — mai conservator
    5:  0.7,   # 5 ani
    10: 0.9,   # 10 ani
    30: 1.0,   # 30 ani — full score
}


# ── DATA STRUCTURES ───────────────────────────────────────────────────────────

@dataclass
class PredictionFeatures:
    """Features extrase pentru o parcelă/UTR."""
    uat_code:         str
    utr_code:         str
    parcel_id:        str = ''

    # Indicatori urbanistici
    pot_max:          float = 0.0
    cut_max:          float = 0.0
    rh_max_etaje:     int   = 0     # P+2 → 2, P+4 → 4
    pot_utilizat:     float = 0.0   # din construcțiile existente (OSM)
    cut_utilizat:     float = 0.0

    # Parcelă
    suprafata_mp:     float = 0.0
    lot_min_mp:       float = 0.0

    # Context
    functiune_type:   str   = 'unknown'
    doc_age_years:    float = 5.0   # vârsta documentului urbanistic
    rules_count:      int   = 0
    confidence_avg:   float = 0.5


@dataclass
class PredictionResult:
    """Rezultatul predicției pentru o parcelă."""
    uat_code:     str
    utr_code:     str
    parcel_id:    str = ''
    scores:       dict = field(default_factory=dict)  # {2: 45, 5: 62, 10: 78, 30: 85}
    risk_level:   str = 'medium'   # low | medium | high
    main_driver:  str = ''         # feature-ul principal care influențează
    confidence:   float = 0.5
    computed_at:  str = ''
    features:     dict = field(default_factory=dict)


# ── FEATURE ENGINEERING ───────────────────────────────────────────────────────

def parse_rh(rh_str: str) -> int:
    """P+2 → 2, P+4 → 4, P → 0."""
    if not rh_str:
        return 0
    import re
    m = re.search(r'P\+(\d+)', str(rh_str).upper())
    return int(m.group(1)) if m else 0


def extract_features(rules: list[dict], parcel: dict = None,
                     snapshot_date: str = None) -> PredictionFeatures:
    """
    Extrage features din regulile unui UTR + date parcelă.
    """
    uat_code = rules[0].get('uat_code', '') if rules else ''
    utr_code = rules[0].get('utr_code', '') if rules else ''

    # Indicatori
    pot_max = next((r.get('value_num', 0) or 0
                    for r in rules if r.get('rule_type') == 'POT_MAX'), 0.0)
    cut_max = next((r.get('value_num', 0) or 0
                    for r in rules if r.get('rule_type') == 'CUT_MAX'), 0.0)
    rh_str  = next((r.get('value_str') or ''
                    for r in rules if r.get('rule_type') == 'RH_MAX'), '')
    rh_max  = parse_rh(rh_str)

    # Funcțiune
    functiune = next((r.get('function_type', 'unknown')
                      for r in rules if r.get('function_type')), 'unknown')
    if not functiune or functiune == 'unknown':
        # Deducem din codul UTR
        code = utr_code.upper()
        if code.startswith('L'):   functiune = 'locuire'
        elif code.startswith('C'): functiune = 'comerciala'
        elif code.startswith('M'): functiune = 'mixta'
        elif code.startswith('I'): functiune = 'industriala'
        elif code.startswith('V'): functiune = 'verde_sport'
        else:                      functiune = 'unknown'

    # Vârstă document
    doc_age = 5.0  # default
    if snapshot_date:
        try:
            snap = date.fromisoformat(snapshot_date)
            doc_age = (date.today() - snap).days / 365.0
        except Exception:
            pass

    # Date parcelă
    sup_mp  = float(parcel.get('suprafata_mp', 0) or 0) if parcel else 0.0
    lot_min = next((r.get('value_num', 0) or 0
                    for r in rules if r.get('rule_type') == 'LOT_MIN_M2'), 0.0)

    confidence_avg = (sum(r.get('confidence', 0.5) for r in rules) / len(rules)
                      if rules else 0.5)

    return PredictionFeatures(
        uat_code       = uat_code,
        utr_code       = utr_code,
        parcel_id      = (parcel or {}).get('parcel_id', ''),
        pot_max        = pot_max,
        cut_max        = cut_max,
        rh_max_etaje   = rh_max,
        pot_utilizat   = float((parcel or {}).get('pot_utilizat', 0) or 0),
        cut_utilizat   = float((parcel or {}).get('cut_utilizat', 0) or 0),
        suprafata_mp   = sup_mp,
        lot_min_mp     = lot_min,
        functiune_type = functiune,
        doc_age_years  = doc_age,
        rules_count    = len(rules),
        confidence_avg = confidence_avg,
    )


# ── MODEL HEURISTIC ───────────────────────────────────────────────────────────

class HeuristicModel:
    """
    Model heuristic bazat pe ponderi — funcționează fără XGBoost.
    Suficient pentru MVP și testare.
    """

    def predict(self, features: PredictionFeatures) -> dict:
        """Returnează scoruri 0-100 per orizont."""
        scores_raw = {}

        # 1. Spațiu POT rămas
        if features.pot_max > 0:
            pot_inv = max(0, 1 - (features.pot_utilizat / features.pot_max))
        else:
            pot_inv = 0.5
        scores_raw['pot_utilizare_inv'] = pot_inv

        # 2. Spațiu CUT rămas
        if features.cut_max > 0:
            cut_inv = max(0, 1 - (features.cut_utilizat / features.cut_max))
        else:
            cut_inv = 0.5
        scores_raw['cut_utilizare_inv'] = cut_inv

        # 3. Spațiu RH rămas
        rh_inv = 0.5
        if features.rh_max_etaje > 0:
            # Presupunem că 30% din parcele au deja construcții
            rh_inv = max(0, 1 - 0.3 / max(1, features.rh_max_etaje))
        scores_raw['rh_utilizare_inv'] = rh_inv

        # 4. Funcțiune
        scores_raw['functiune_score'] = FUNCTIUNE_SCORES.get(features.functiune_type, 0.5)

        # 5. Vârstă document (>10 ani = mai probabil revizuit = mai probabil schimbări)
        doc_score = min(1.0, features.doc_age_years / 15.0)
        scores_raw['doc_age_score'] = doc_score

        # 6. Suprafață parcelă
        if features.suprafata_mp > 0:
            sup_score = min(1.0, math.log10(max(1, features.suprafata_mp)) / 4.0)
        else:
            sup_score = 0.3
        scores_raw['suprafata_score'] = sup_score

        # 7. Confidence date
        scores_raw['confidence_score'] = features.confidence_avg

        # Score ponderat
        base_score = sum(
            scores_raw.get(feat, 0.5) * weight
            for feat, weight in FEATURE_WEIGHTS.items()
        )
        base_score = max(0.0, min(1.0, base_score))

        # Scoruri per orizont
        scores = {
            horizon: round(base_score * mult * 100)
            for horizon, mult in HORIZON_MULTIPLIERS.items()
        }

        # Driver principal
        main_driver = max(scores_raw, key=lambda k: scores_raw[k] * FEATURE_WEIGHTS.get(k, 0))

        return {
            'scores':      scores,
            'base_score':  round(base_score * 100),
            'main_driver': main_driver,
            'raw_features': scores_raw,
        }


class XGBoostModel:
    """
    Model XGBoost — se activează dacă xgboost e instalat.
    Necesită date de training (minimum 500 parcele cu outcome cunoscut).
    """

    def __init__(self):
        self._model = None
        self._loaded = False

    def load(self, model_path: str):
        try:
            import xgboost as xgb
            import pickle
            with open(model_path, 'rb') as f:
                self._model = pickle.load(f)
            self._loaded = True
            log.info(f'XGBoost model încărcat: {model_path}')
        except ImportError:
            log.warning('xgboost nedisponibil, folosim HeuristicModel')
        except FileNotFoundError:
            log.warning(f'Model XGBoost negăsit: {model_path}')

    def predict(self, features: PredictionFeatures) -> Optional[dict]:
        if not self._loaded or not self._model:
            return None
        try:
            import numpy as np
            X = np.array([[
                features.pot_max, features.cut_max, features.rh_max_etaje,
                features.pot_utilizat, features.cut_utilizat,
                features.suprafata_mp, features.lot_min_mp,
                FUNCTIUNE_SCORES.get(features.functiune_type, 0.5),
                features.doc_age_years, features.rules_count,
                features.confidence_avg,
            ]])
            prob = float(self._model.predict_proba(X)[0][1])
            scores = {h: round(prob * m * 100) for h, m in HORIZON_MULTIPLIERS.items()}
            return {'scores': scores, 'base_score': round(prob*100), 'main_driver': 'XGBoost'}
        except Exception as e:
            log.warning(f'XGBoost predict error: {e}')
            return None


# ── PREDICTION ENGINE ─────────────────────────────────────────────────────────

class PredictionEngine:

    def __init__(self, model_path: str = ''):
        self.xgb     = XGBoostModel()
        self.fallback= HeuristicModel()

        if model_path:
            self.xgb.load(model_path)

    def predict_utr(self, rules: list[dict], parcel: dict = None) -> PredictionResult:
        """Predicție pentru un UTR / parcelă."""
        feats = extract_features(rules, parcel)

        # Încearcă XGBoost, fallback la heuristic
        result_raw = self.xgb.predict(feats) or self.fallback.predict(feats)

        scores     = result_raw['scores']
        base_score = result_raw['base_score']

        # Risk level
        risk = 'high' if base_score >= 70 else 'low' if base_score < 30 else 'medium'

        return PredictionResult(
            uat_code    = feats.uat_code,
            utr_code    = feats.utr_code,
            parcel_id   = feats.parcel_id,
            scores      = scores,
            risk_level  = risk,
            main_driver = result_raw.get('main_driver', ''),
            confidence  = feats.confidence_avg,
            computed_at = datetime.utcnow().isoformat() + 'Z',
            features    = asdict(feats),
        )

    def predict_batch(self, rules_by_utr: dict) -> list[PredictionResult]:
        """
        Predicție batch pentru mai multe UTR-uri.
        rules_by_utr: { 'UAT:UTR' → [rules] }
        """
        results = []
        for key, rules in rules_by_utr.items():
            if not rules:
                continue
            result = self.predict_utr(rules)
            results.append(result)
            log.info(f'  {key}: score_5ani={result.scores.get(5,0)} risk={result.risk_level}')
        return results

    def to_heatmap_data(self, results: list[PredictionResult],
                         horizon: int = 5) -> list[dict]:
        """
        Convertește predicțiile în format pentru 25-prediction-layer.js.
        Fiecare element: { uat_code, utr_code, score, risk, lat, lon }
        """
        from ancpi_adapter import UAT_REGISTRY
        heatmap = []
        for r in results:
            uat_info = UAT_REGISTRY.get(r.uat_code, {})
            if not uat_info:
                continue
            bbox   = [float(x) for x in uat_info.get('bbox','0,0,0,0').split(',')]
            center = [(bbox[0]+bbox[2])/2, (bbox[1]+bbox[3])/2]
            heatmap.append({
                'uat_code': r.uat_code,
                'utr_code': r.utr_code,
                'score':    r.scores.get(horizon, 0),
                'risk':     r.risk_level,
                'lon':      center[0],
                'lat':      center[1],
                'driver':   r.main_driver,
            })
        return heatmap


# ── SCHEMA SQL ────────────────────────────────────────────────────────────────

PREDICTION_SCHEMA_SQL = """
-- Adaugă în Supabase SQL Editor

CREATE TABLE IF NOT EXISTS urbanx_predictions (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    uat_code    TEXT NOT NULL,
    utr_code    TEXT NOT NULL,
    parcel_id   TEXT,
    score_2y    INTEGER,   -- probabilitate 2 ani (0-100)
    score_5y    INTEGER,
    score_10y   INTEGER,
    score_30y   INTEGER,
    risk_level  TEXT,      -- low | medium | high
    main_driver TEXT,
    confidence  FLOAT,
    model_type  TEXT,      -- heuristic | xgboost
    computed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(uat_code, utr_code, parcel_id)
);

CREATE INDEX IF NOT EXISTS idx_pred_uat ON urbanx_predictions (uat_code);
CREATE INDEX IF NOT EXISTS idx_pred_score ON urbanx_predictions (score_5y DESC);

ALTER TABLE urbanx_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_pred" ON urbanx_predictions FOR SELECT USING (true);
"""


def main():
    import argparse, json
    parser = argparse.ArgumentParser(description='UrbanX Prediction Engine')
    parser.add_argument('--predict', help='UAT_CODE:UTR_CODE')
    parser.add_argument('--schema',  action='store_true')
    parser.add_argument('--horizon', type=int, default=5)
    args = parser.parse_args()

    if args.schema:
        print(PREDICTION_SCHEMA_SQL)
        return

    engine = PredictionEngine()

    if args.predict:
        parts = args.predict.split(':')
        if len(parts) < 2:
            print('Format: UAT_CODE:UTR_CODE')
            return

        # Demo cu reguli hardcoded
        demo_rules = [
            {'uat_code': parts[0], 'utr_code': ':'.join(parts[1:]),
             'rule_type':'POT_MAX','value_num':35,'confidence':0.88,'doc_type':'PUG'},
            {'uat_code': parts[0], 'utr_code': ':'.join(parts[1:]),
             'rule_type':'CUT_MAX','value_num':1.2,'confidence':0.88,'doc_type':'PUG'},
        ]
        result = engine.predict_utr(demo_rules)
        print(json.dumps(asdict(result), ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
