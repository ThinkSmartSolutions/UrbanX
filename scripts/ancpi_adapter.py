#!/usr/bin/env python3
"""
UrbanX — scripts/ancpi_adapter.py
===================================
Adaptorul ANCPI — descarcă geometrii reale de parcele din:
  1. ANCPI WFS (serviciu oficial)
  2. Geoportal ANCPI REST API
  3. Fallback: OSM pentru contururi aproximative

Output: GeoJSON cu parcele + atribute cadastrale → Supabase PostGIS

Utilizare:
  python ancpi_adapter.py --uat RO-CJ-001 --output parcele.geojson
  python ancpi_adapter.py --bbox "26.0,44.3,26.2,44.5"
  python ancpi_adapter.py --nr-cadastral "123456/1"
"""

import os
import json
import time
import hashlib
import logging
import requests
import argparse
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass, asdict, field
from typing import Optional

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [ANCPI] %(levelname)s %(message)s',
    datefmt='%H:%M:%S'
)
log = logging.getLogger('ancpi_adapter')

# ── CONSTANTE ────────────────────────────────────────────────────────────────

# Endpoint-uri ANCPI publice
ANCPI_WFS_BASE    = 'https://geoportal.ancpi.ro/geoportal/wfs'
ANCPI_REST_BASE   = 'https://geoportal.ancpi.ro/maps/rest/services'
OVERPASS_URL      = 'https://overpass-api.de/api/interpreter'

HEADERS = {
    'User-Agent': 'UrbanX-Research/1.0 (contact@urbanx.ro)',
    'Accept':     'application/json',
}

REQUEST_TIMEOUT = 30
CACHE_DIR       = Path(os.environ.get('URBANX_CACHE', '/tmp/urbanx_ancpi_cache'))

# UAT-uri prioritare pentru primele 5 vectorizări
UAT_REGISTRY = {
    'RO-B':      {'name': 'București',    'bbox': '25.9,44.3,26.3,44.6', 'code_siruta': '179132'},
    'RO-CJ-001': {'name': 'Cluj-Napoca',  'bbox': '23.4,46.7,23.8,46.9', 'code_siruta': '54984'},
    'RO-TM-001': {'name': 'Timișoara',    'bbox': '21.1,45.7,21.4,45.9', 'code_siruta': '155350'},
    'RO-IS-001': {'name': 'Iași',         'bbox': '27.5,47.1,27.7,47.2', 'code_siruta': '94903'},
    'RO-BV-001': {'name': 'Brașov',       'bbox': '25.5,45.6,25.7,45.7', 'code_siruta': '29870'},
}


# ── DATA STRUCTURES ───────────────────────────────────────────────────────────

@dataclass
class ParcelGeometry:
    """O parcelă cadastrală cu geometrie și atribute."""
    parcel_id:       str
    uat_code:        str
    nr_cadastral:    str
    suprafata_mp:    float
    geometry:        dict          # GeoJSON geometry
    geometry_source: str           # 'ANCPI_WFS' | 'ANCPI_REST' | 'OSM'
    address:         str = ''
    proprietar:      str = ''
    categorie:       str = ''      # CC/A/P/PS etc.
    judet:           str = ''
    localitate:      str = ''
    fetched_at:      str = ''
    confidence:      float = 1.0


# ── CACHE ─────────────────────────────────────────────────────────────────────

def _cache_path(key: str) -> Path:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    h = hashlib.md5(key.encode()).hexdigest()
    return CACHE_DIR / f'{h}.json'

def _cache_get(key: str) -> Optional[dict]:
    p = _cache_path(key)
    if p.exists() and (time.time() - p.stat().st_mtime) < 86400:  # 24h
        try:
            return json.loads(p.read_text())
        except Exception:
            pass
    return None

def _cache_set(key: str, data: dict):
    try:
        _cache_path(key).write_text(json.dumps(data, ensure_ascii=False))
    except Exception:
        pass


# ── ANCPI WFS ─────────────────────────────────────────────────────────────────

def fetch_parcels_wfs(bbox: str, max_features: int = 500) -> list[dict]:
    """
    Descarcă parcele din ANCPI WFS.
    bbox format: "lon_min,lat_min,lon_max,lat_max"
    Returnează lista de features GeoJSON.
    """
    cache_key = f'wfs_{bbox}_{max_features}'
    cached    = _cache_get(cache_key)
    if cached:
        log.info(f'  Cache hit WFS: {len(cached)} features')
        return cached

    # Layer-ele disponibile în ANCPI WFS
    layers = [
        'INSPIRE:CP.CadastralParcel',   # standard INSPIRE
        'cadastru:parcele',              # alternativ
        'Parcels',
    ]

    for layer in layers:
        try:
            params = {
                'SERVICE':      'WFS',
                'VERSION':      '2.0.0',
                'REQUEST':      'GetFeature',
                'TYPENAMES':    layer,
                'BBOX':         f'{bbox},EPSG:4326',
                'SRSNAME':      'EPSG:4326',
                'OUTPUTFORMAT': 'application/json',
                'COUNT':        str(max_features),
            }
            r = requests.get(
                ANCPI_WFS_BASE, params=params,
                headers=HEADERS, timeout=REQUEST_TIMEOUT, verify=False
            )
            if r.status_code == 200 and 'FeatureCollection' in r.text:
                data     = r.json()
                features = data.get('features', [])
                if features:
                    log.info(f'  ✅ WFS layer {layer}: {len(features)} parcele')
                    _cache_set(cache_key, features)
                    return features
        except Exception as e:
            log.debug(f'  WFS layer {layer} failed: {e}')

    log.warning('  ANCPI WFS indisponibil — toate layer-ele au eșuat')
    return []


def fetch_parcels_rest(bbox: str) -> list[dict]:
    """
    Alternativ: ANCPI REST API (ArcGIS FeatureServer).
    """
    cache_key = f'rest_{bbox}'
    cached    = _cache_get(cache_key)
    if cached:
        return cached

    rest_endpoints = [
        f'{ANCPI_REST_BASE}/Cadastru/FeatureServer/0/query',
        f'{ANCPI_REST_BASE}/Parcele/MapServer/0/query',
    ]

    coords = [float(x) for x in bbox.split(',')]
    # bbox pentru ArcGIS: xmin,ymin,xmax,ymax (lon,lat)
    arcgis_bbox = f'{coords[0]},{coords[1]},{coords[2]},{coords[3]}'

    for endpoint in rest_endpoints:
        try:
            params = {
                'geometry':     arcgis_bbox,
                'geometryType': 'esriGeometryEnvelope',
                'inSR':         '4326',
                'outSR':        '4326',
                'outFields':    '*',
                'f':            'geojson',
                'resultRecordCount': '500',
            }
            r = requests.get(
                endpoint, params=params,
                headers=HEADERS, timeout=REQUEST_TIMEOUT, verify=False
            )
            if r.status_code == 200 and 'features' in r.text:
                data     = r.json()
                features = data.get('features', [])
                if features:
                    log.info(f'  ✅ REST: {len(features)} parcele')
                    _cache_set(cache_key, features)
                    return features
        except Exception as e:
            log.debug(f'  REST endpoint failed: {e}')

    return []


def fetch_parcels_osm(bbox: str) -> list[dict]:
    """
    Fallback: extrage contururi parcele din OSM.
    Mai puțin precise dar mereu disponibile.
    """
    cache_key = f'osm_parcels_{bbox}'
    cached    = _cache_get(cache_key)
    if cached:
        return cached

    coords = [float(x) for x in bbox.split(',')]
    # Overpass bbox: south,west,north,east
    ob = f'{coords[1]},{coords[0]},{coords[3]},{coords[2]}'

    query = f"""
[out:json][timeout:60];
(
  way["landuse"="residential"]({ob});
  way["landuse"="commercial"]({ob});
  way["landuse"="industrial"]({ob});
  way["building"]({ob});
  relation["type"="multipolygon"]["landuse"]({ob});
);
out geom qt;
"""
    try:
        r = requests.post(
            OVERPASS_URL, data={'data': query},
            headers=HEADERS, timeout=60
        )
        elements = r.json().get('elements', [])
        features = _osm_to_geojson(elements)
        log.info(f'  ✅ OSM fallback: {len(features)} elemente')
        _cache_set(cache_key, features)
        return features
    except Exception as e:
        log.warning(f'  OSM fallback failed: {e}')
        return []


def _osm_to_geojson(elements: list) -> list[dict]:
    """Convertește elemente OSM în features GeoJSON."""
    features = []
    for el in elements:
        if el['type'] == 'way' and 'geometry' in el:
            coords = [[pt['lon'], pt['lat']] for pt in el['geometry']]
            if len(coords) < 3:
                continue
            if coords[0] != coords[-1]:
                coords.append(coords[0])  # închide poligonul
            tags = el.get('tags', {})
            features.append({
                'type': 'Feature',
                'geometry': {
                    'type':        'Polygon',
                    'coordinates': [coords],
                },
                'properties': {
                    'osm_id':   str(el['id']),
                    'landuse':  tags.get('landuse', ''),
                    'building': tags.get('building', ''),
                    'name':     tags.get('name', ''),
                    'source':   'OSM',
                },
            })
    return features


# ── NORMALIZARE ───────────────────────────────────────────────────────────────

def normalize_parcel(feature: dict, uat_code: str,
                     source: str) -> Optional[ParcelGeometry]:
    """
    Normalizează un feature GeoJSON într-un ParcelGeometry standard.
    Gestionează diferențele de atribute între ANCPI WFS, REST și OSM.
    """
    props = feature.get('properties', {})
    geom  = feature.get('geometry')
    if not geom:
        return None

    # Nr. cadastral — diverse variante de câmp
    nr_cad = (
        props.get('NR_CADASTRAL') or props.get('nr_cadastral') or
        props.get('CADASTRAL_NUMBER') or props.get('PARCEL_ID') or
        props.get('osm_id') or props.get('id') or ''
    )

    # Suprafață în m²
    sup_raw = (
        props.get('SUPRAFATA') or props.get('suprafata') or
        props.get('AREA') or props.get('Shape_Area') or 0
    )
    try:
        suprafata = float(sup_raw)
        # Dacă e în hectare (valori mici)
        if suprafata < 1:
            suprafata *= 10000
    except (ValueError, TypeError):
        suprafata = 0.0

    parcel_id = hashlib.sha256(
        f'{uat_code}:{nr_cad}:{source}'.encode()
    ).hexdigest()[:16]

    return ParcelGeometry(
        parcel_id       = parcel_id,
        uat_code        = uat_code,
        nr_cadastral    = str(nr_cad),
        suprafata_mp    = round(suprafata, 2),
        geometry        = geom,
        geometry_source = source,
        address         = str(props.get('ADRESA') or props.get('address', '')),
        categorie       = str(props.get('CATEGORIE') or props.get('landuse', '')),
        judet           = str(props.get('JUDET', '')),
        localitate      = str(props.get('LOCALITATE', '')),
        fetched_at      = datetime.utcnow().isoformat() + 'Z',
        confidence      = 0.9 if source.startswith('ANCPI') else 0.6,
    )


# ── SUPABASE UPSERT ───────────────────────────────────────────────────────────

def upsert_parcels_supabase(parcels: list[ParcelGeometry],
                             sb_url: str, sb_key: str) -> int:
    """Inserează parcele în Supabase (tabel urbanx_parcels)."""
    if not parcels or not sb_url or sb_url == 'https://YOUR_PROJECT.supabase.co':
        log.warning('Supabase neconfigurat — salvez local')
        return 0

    headers = {
        'apikey':        sb_key,
        'Authorization': f'Bearer {sb_key}',
        'Content-Type':  'application/json',
        'Prefer':        'resolution=merge-duplicates',
    }

    records = []
    for p in parcels:
        records.append({
            'parcel_id':       p.parcel_id,
            'uat_code':        p.uat_code,
            'nr_cadastral':    p.nr_cadastral,
            'suprafata_mp':    p.suprafata_mp,
            'geometry_source': p.geometry_source,
            'geometry_json':   json.dumps(p.geometry),
            'address':         p.address,
            'categorie':       p.categorie,
            'judet':           p.judet,
            'localitate':      p.localitate,
            'confidence':      p.confidence,
            'fetched_at':      p.fetched_at,
        })

    total = 0
    for i in range(0, len(records), 500):
        batch = records[i:i+500]
        try:
            r = requests.post(
                f'{sb_url}/rest/v1/urbanx_parcels',
                headers=headers, json=batch, timeout=30
            )
            if r.status_code in (200, 201):
                total += len(batch)
                log.info(f'  ✅ Batch {i//500+1}: {len(batch)} parcele în Supabase')
            else:
                log.error(f'  ❌ Supabase error: {r.status_code} {r.text[:100]}')
        except Exception as e:
            log.error(f'  ❌ Upsert error: {e}')

    return total


# ── MAIN ADAPTER ──────────────────────────────────────────────────────────────

class ANCPIAdapter:
    """
    Orchestrează descărcarea parcelelor pentru un UAT:
    1. Încearcă ANCPI WFS
    2. Fallback ANCPI REST
    3. Fallback OSM
    4. Normalizare + Supabase
    """

    def __init__(self, sb_url: str = '', sb_key: str = ''):
        self.sb_url = sb_url or os.environ.get('SUPABASE_URL', '')
        self.sb_key = sb_key or os.environ.get('SUPABASE_SERVICE_KEY', '')

    def process_uat(self, uat_code: str) -> list[ParcelGeometry]:
        """Procesează un UAT complet."""
        uat_info = UAT_REGISTRY.get(uat_code)
        if not uat_info:
            log.error(f'UAT necunoscut: {uat_code}')
            return []

        bbox = uat_info['bbox']
        name = uat_info['name']
        log.info(f'═══ ANCPI: {name} ({uat_code}) ═══')

        parcels = []

        # 1. ANCPI WFS
        log.info('  Încerc ANCPI WFS...')
        features_wfs = fetch_parcels_wfs(bbox)
        if features_wfs:
            for f in features_wfs:
                p = normalize_parcel(f, uat_code, 'ANCPI_WFS')
                if p: parcels.append(p)
            log.info(f'  WFS: {len(parcels)} parcele normalizate')

        # 2. ANCPI REST (dacă WFS a eșuat)
        if not parcels:
            log.info('  Încerc ANCPI REST...')
            features_rest = fetch_parcels_rest(bbox)
            for f in features_rest:
                p = normalize_parcel(f, uat_code, 'ANCPI_REST')
                if p: parcels.append(p)
            if parcels:
                log.info(f'  REST: {len(parcels)} parcele normalizate')

        # 3. OSM fallback
        if not parcels:
            log.warning('  ANCPI indisponibil — fallback OSM')
            features_osm = fetch_parcels_osm(bbox)
            for f in features_osm:
                p = normalize_parcel(f, uat_code, 'OSM')
                if p: parcels.append(p)
            log.info(f'  OSM: {len(parcels)} elemente normalizate')

        # 4. Supabase
        if parcels and self.sb_url:
            inserted = upsert_parcels_supabase(parcels, self.sb_url, self.sb_key)
            log.info(f'  Supabase: {inserted}/{len(parcels)} inserate')

        return parcels

    def process_all_priority_uats(self) -> dict:
        """Procesează toate UAT-urile prioritare."""
        results = {}
        for uat_code in UAT_REGISTRY:
            log.info(f'\n[{list(UAT_REGISTRY.keys()).index(uat_code)+1}/{len(UAT_REGISTRY)}] {uat_code}')
            parcels = self.process_uat(uat_code)
            results[uat_code] = {
                'count':   len(parcels),
                'sources': list(set(p.geometry_source for p in parcels)),
            }
            time.sleep(2)  # politicos față de server

        log.info('\n═══ REZUMAT ANCPI ═══')
        total = sum(r['count'] for r in results.values())
        for uat, r in results.items():
            log.info(f'  {uat}: {r["count"]} parcele [{", ".join(r["sources"])}]')
        log.info(f'  TOTAL: {total} parcele')
        return results

    def export_geojson(self, parcels: list[ParcelGeometry],
                       output_path: str):
        """Exportă parcelele ca GeoJSON."""
        fc = {
            'type':     'FeatureCollection',
            'features': [
                {
                    'type':       'Feature',
                    'geometry':   p.geometry,
                    'properties': {
                        'parcel_id':    p.parcel_id,
                        'uat_code':     p.uat_code,
                        'nr_cadastral': p.nr_cadastral,
                        'suprafata_mp': p.suprafata_mp,
                        'source':       p.geometry_source,
                        'confidence':   p.confidence,
                    },
                }
                for p in parcels
            ],
        }
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(fc, f, ensure_ascii=False, indent=2)
        log.info(f'✅ GeoJSON exportat: {output_path} ({len(parcels)} parcele)')


# ── SCHEMA SQL pentru urbanx_parcels ─────────────────────────────────────────

PARCELS_SCHEMA_SQL = """
-- Adaugă în Supabase SQL Editor (după urbanx_schema.sql)

CREATE TABLE IF NOT EXISTS urbanx_parcels (
    id               BIGSERIAL PRIMARY KEY,
    parcel_id        TEXT UNIQUE NOT NULL,
    uat_code         TEXT NOT NULL,
    nr_cadastral     TEXT,
    suprafata_mp     FLOAT,
    geometry_source  TEXT,        -- ANCPI_WFS | ANCPI_REST | OSM
    geometry_json    TEXT,        -- GeoJSON geometry ca string
    address          TEXT,
    categorie        TEXT,        -- CC/A/P/PS
    judet            TEXT,
    localitate       TEXT,
    confidence       FLOAT DEFAULT 0.8,
    fetched_at       TIMESTAMPTZ DEFAULT NOW(),
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Index rapid pe UAT + nr cadastral
CREATE INDEX IF NOT EXISTS idx_parcels_uat     ON urbanx_parcels (uat_code);
CREATE INDEX IF NOT EXISTS idx_parcels_nrcad   ON urbanx_parcels (nr_cadastral);

-- RLS: citire publică
ALTER TABLE urbanx_parcels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_parcels" ON urbanx_parcels FOR SELECT USING (true);

-- Funcție: caută parcelă după număr cadastral
CREATE OR REPLACE FUNCTION find_parcel(p_nr_cad TEXT)
RETURNS SETOF urbanx_parcels AS $$
    SELECT * FROM urbanx_parcels
    WHERE nr_cadastral = p_nr_cad
    ORDER BY confidence DESC LIMIT 1;
$$ LANGUAGE SQL STABLE;
"""


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='UrbanX ANCPI Adapter')
    parser.add_argument('--uat',    help='Cod UAT (ex: RO-CJ-001) sau "all"')
    parser.add_argument('--bbox',   help='BBox manual: lon_min,lat_min,lon_max,lat_max')
    parser.add_argument('--output', help='Fișier GeoJSON output')
    parser.add_argument('--schema', action='store_true', help='Printează schema SQL')
    args = parser.parse_args()

    if args.schema:
        print(PARCELS_SCHEMA_SQL)
        return

    adapter = ANCPIAdapter()

    if args.uat == 'all':
        adapter.process_all_priority_uats()

    elif args.uat:
        parcels = adapter.process_uat(args.uat)
        if args.output and parcels:
            adapter.export_geojson(parcels, args.output)

    elif args.bbox:
        log.info(f'Fetch manual bbox: {args.bbox}')
        features = fetch_parcels_wfs(args.bbox) or fetch_parcels_rest(args.bbox) or fetch_parcels_osm(args.bbox)
        parcels  = [normalize_parcel(f,'MANUAL','ANCPI_WFS') for f in features]
        parcels  = [p for p in parcels if p]
        log.info(f'{len(parcels)} parcele descărcate')
        if args.output:
            adapter.export_geojson(parcels, args.output)
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
