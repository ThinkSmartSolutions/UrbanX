#!/usr/bin/env python3
"""
Romania Spatial Data Pipeline — UrbanX
======================================
Aspiră CIMEC + OSM + Wikidata → normalizează → inserează în Supabase

Rulează SERVER-SIDE (nu din browser):
  pip install requests geopandas supabase shapely
  python romania_spatial_pipeline.py

Sau ca GitHub Action (scheduled weekly):
  .github/workflows/spatial-pipeline.yml
"""

import json, time, requests, os
from datetime import datetime

# ── CONFIGURARE ──────────────────────────────────────────────────────────────
SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://YOUR_PROJECT.supabase.co')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_KEY', 'YOUR_SERVICE_ROLE_KEY')

CIMEC_BASE    = 'https://map.cimec.ro/Mapserver/wms'
OVERPASS_URL  = 'https://overpass-api.de/api/interpreter'
WIKIDATA_URL  = 'https://query.wikidata.org/sparql'


# ── 1. CIMEC WFS — încearcă ArcGIS REST first, fallback la WMS/WFS ──────────
def fetch_cimec_layer(layer_name, bbox_romania=None):
    """
    Descarcă un layer CIMEC complet.
    Încearcă: ArcGIS FeatureServer → WFS GetFeature
    """
    bbox = bbox_romania or '26.0,43.5,30.0,48.5'  # întreaga Românie

    # TENTATIVA 1: ArcGIS REST FeatureServer (fără CORS, server-side)
    arcgis_urls = [
        f'https://map.cimec.ro/arcgis/rest/services/{layer_name}/FeatureServer/0/query'
        f'?where=1%3D1&outFields=*&f=geojson&resultRecordCount=5000',
        f'https://map.cimec.ro/Mapserver/rest/services/{layer_name}/FeatureServer/0/query'
        f'?where=1%3D1&outFields=*&f=geojson',
    ]

    for url in arcgis_urls:
        try:
            r = requests.get(url, timeout=30, headers={'User-Agent':'UrbanX/1.0'})
            if r.status_code == 200 and 'FeatureCollection' in r.text:
                data = r.json()
                print(f"  ✅ ArcGIS REST: {len(data.get('features',[]))} features din {layer_name}")
                return data.get('features', [])
        except Exception as e:
            print(f"  ArcGIS tentativa failed: {e}")

    # TENTATIVA 2: WFS GetFeature (direct, server-side — fără CORS)
    wfs_url = (
        f'{CIMEC_BASE}?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature'
        f'&TYPENAME={layer_name}&BBOX={bbox},EPSG:4326&SRSNAME=EPSG:4326'
        f'&OUTPUTFORMAT=application/json&maxFeatures=10000'
    )
    try:
        r = requests.get(wfs_url, timeout=60, headers={'User-Agent':'UrbanX/1.0'})
        if r.status_code == 200 and 'FeatureCollection' in r.text:
            data = r.json()
            print(f"  ✅ WFS: {len(data.get('features',[]))} features din {layer_name}")
            return data.get('features', [])
    except Exception as e:
        print(f"  WFS failed: {e}")

    print(f"  ❌ {layer_name} indisponibil")
    return []


# ── 2. NORMALIZARE LMI ────────────────────────────────────────────────────────
def normalize_lmi(features, layer_type):
    """
    Normalizează proprietățile CIMEC în format consistent UrbanX
    """
    normalized = []
    for f in features:
        p = f.get('properties', {})
        g = f.get('geometry', {})
        if not g: continue

        # Extrage coordonate centroid
        coords = g.get('coordinates', [])
        if g['type'] == 'Point':
            lon, lat = coords[0], coords[1]
        elif g['type'] in ('Polygon', 'MultiPolygon'):
            # Centroid simplu
            all_pts = coords[0] if g['type'] == 'Polygon' else coords[0][0]
            lon = sum(c[0] for c in all_pts) / len(all_pts)
            lat = sum(c[1] for c in all_pts) / len(all_pts)
        else:
            continue

        normalized.append({
            'source':     'CIMEC',
            'layer':      layer_type,
            'cod_lmi':    p.get('COD_LMI') or p.get('cod_lmi') or p.get('Cod_LMI', ''),
            'denumire':   p.get('DENUMIRE') or p.get('denumire') or p.get('Denumire', ''),
            'categorie':  p.get('CATEGORIE') or p.get('categorie', 'B'),
            'localitate': p.get('LOCALITATE') or p.get('localitate', ''),
            'judet':      p.get('JUDET') or p.get('judet', ''),
            'lon':        round(lon, 6),
            'lat':        round(lat, 6),
            'geom_type':  g['type'],
            'geom_json':  json.dumps(g),
            'buffer_m':   100 if str(p.get('CATEGORIE','')).startswith('A') else 50,
            'updated_at': datetime.utcnow().isoformat(),
        })

    return normalized


# ── 3. OVERPASS — OSM semantic pentru România ─────────────────────────────────
def fetch_osm_heritage():
    """
    Extrage patrimoniu cultural din OSM cu tag-uri semantice.
    Mai ales: historic=*, heritage=*, tourism=landmark
    """
    query = """
[out:json][timeout:120];
area["name:ro"="România"][admin_level=2]->.ro;
(
  node["historic"](area.ro);
  way["historic"](area.ro);
  node["heritage"](area.ro);
  way["heritage"](area.ro);
  node["tourism"="attraction"]["historic"](area.ro);
  node["landuse"="cemetery"](area.ro);
  way["landuse"="cemetery"](area.ro);
  way["natural"="wood"]["name"](area.ro);
);
out center qt;
"""
    try:
        r = requests.post(OVERPASS_URL, data={'data': query}, timeout=120)
        elements = r.json().get('elements', [])
        print(f"  ✅ OSM Heritage: {len(elements)} elemente")
        return elements
    except Exception as e:
        print(f"  OSM failed: {e}")
        return []


def normalize_osm(elements):
    normalized = []
    for el in elements:
        t = el.get('tags', {})
        # Coordonate
        if el['type'] == 'node':
            lon, lat = el['lon'], el['lat']
        elif 'center' in el:
            lon, lat = el['center']['lon'], el['center']['lat']
        else:
            continue

        name = t.get('name') or t.get('name:ro', '')
        if not name: continue

        normalized.append({
            'source':     'OSM',
            'layer':      'heritage',
            'osm_id':     f"{el['type']}/{el['id']}",
            'denumire':   name,
            'categorie':  'OSM',
            'historic':   t.get('historic', ''),
            'heritage':   t.get('heritage', ''),
            'landuse':    t.get('landuse', ''),
            'lon':        round(lon, 6),
            'lat':        round(lat, 6),
            'buffer_m':   60 if t.get('landuse') == 'cemetery' else 50,
            'updated_at': datetime.utcnow().isoformat(),
        })
    return normalized


# ── 4. WIKIDATA — monumente cu coordonate verificate ──────────────────────────
def fetch_wikidata_monuments():
    """
    Monumente istorice România din Wikidata cu coordonate GPS verificate.
    Wikidata are ~4000 monumente din România cu coordonate precise.
    """
    sparql = """
SELECT ?item ?itemLabel ?coord ?lmi_code WHERE {
  ?item wdt:P17 wd:Q218 .         # item din România
  ?item wdt:P625 ?coord .          # are coordonate geografice
  OPTIONAL { ?item wdt:P3722 ?lmi_code . }  # cod LMI dacă există
  FILTER(
    EXISTS { ?item wdt:P1435 [] } ||   # este monument
    EXISTS { ?item wdt:P18 [] }        # sau are imagine
  )
  SERVICE wikibase:label { bd:serviceParam wikibase:language "ro,en". }
}
LIMIT 5000
"""
    try:
        r = requests.get(WIKIDATA_URL,
            params={'query': sparql, 'format': 'json'},
            headers={'Accept': 'application/json', 'User-Agent': 'UrbanX/1.0'},
            timeout=60)
        results = r.json().get('results', {}).get('bindings', [])
        print(f"  ✅ Wikidata: {len(results)} monumente")

        normalized = []
        for b in results:
            coord_str = b.get('coord', {}).get('value', '')
            if 'Point(' not in coord_str: continue
            lon_lat = coord_str.replace('Point(','').replace(')','').split()
            if len(lon_lat) != 2: continue
            lon, lat = float(lon_lat[0]), float(lon_lat[1])
            if not (43 < lat < 49 and 20 < lon < 30): continue

            normalized.append({
                'source':     'Wikidata',
                'layer':      'monument',
                'wikidata_id': b.get('item',{}).get('value','').split('/')[-1],
                'denumire':   b.get('itemLabel',{}).get('value',''),
                'cod_lmi':    b.get('lmi_code',{}).get('value',''),
                'lon':        round(lon, 6),
                'lat':        round(lat, 6),
                'buffer_m':   50,
                'updated_at': datetime.utcnow().isoformat(),
            })
        return normalized
    except Exception as e:
        print(f"  Wikidata failed: {e}")
        return []


# ── 5. SUPABASE UPSERT ────────────────────────────────────────────────────────
def upsert_to_supabase(records, table_name):
    """
    Inserează/actualizează în Supabase.
    Supabase e deja în platformă — nu e nevoie de altceva.
    """
    if not records:
        print(f"  ⚠️ Nimic de inserat în {table_name}")
        return

    headers = {
        'apikey':        SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type':  'application/json',
        'Prefer':        'resolution=merge-duplicates',
    }

    # Batchuri de 500
    batch_size = 500
    total = 0
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        r = requests.post(
            f'{SUPABASE_URL}/rest/v1/{table_name}',
            headers=headers,
            json=batch,
            timeout=30
        )
        if r.status_code in (200, 201):
            total += len(batch)
        else:
            print(f"  ❌ Supabase error batch {i}: {r.status_code} {r.text[:100]}")

    print(f"  ✅ {total} records în Supabase.{table_name}")


# ── 6. SQL SCHEMA Supabase ───────────────────────────────────────────────────
SCHEMA_SQL = """
-- Rulează în Supabase SQL Editor o singură dată

CREATE TABLE IF NOT EXISTS lmi_romania (
  id          BIGSERIAL PRIMARY KEY,
  source      TEXT NOT NULL,        -- 'CIMEC' | 'OSM' | 'Wikidata'
  layer       TEXT NOT NULL,        -- 'monumente' | 'zone' | 'situri' | 'heritage'
  cod_lmi     TEXT,
  wikidata_id TEXT,
  osm_id      TEXT,
  denumire    TEXT,
  categorie   TEXT,                 -- 'A' | 'B' | 'OSM' | 'Wikidata'
  localitate  TEXT,
  judet       TEXT,
  lon         DOUBLE PRECISION NOT NULL,
  lat         DOUBLE PRECISION NOT NULL,
  buffer_m    INTEGER DEFAULT 50,
  geom_type   TEXT,
  geom_json   TEXT,
  historic    TEXT,
  heritage    TEXT,
  landuse     TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index spațial pentru query rapid pe bbox
CREATE INDEX IF NOT EXISTS lmi_lon_lat ON lmi_romania (lon, lat);
CREATE INDEX IF NOT EXISTS lmi_source  ON lmi_romania (source);

-- RLS: citire publică, scriere doar service role
ALTER TABLE lmi_romania ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON lmi_romania FOR SELECT USING (true);

-- Funcție pentru query bbox (folosită de TCI)
CREATE OR REPLACE FUNCTION lmi_in_bbox(
  min_lon DOUBLE PRECISION, min_lat DOUBLE PRECISION,
  max_lon DOUBLE PRECISION, max_lat DOUBLE PRECISION
)
RETURNS SETOF lmi_romania AS $$
  SELECT * FROM lmi_romania
  WHERE lon BETWEEN min_lon AND max_lon
    AND lat BETWEEN min_lat AND max_lat
  ORDER BY buffer_m DESC;
$$ LANGUAGE SQL STABLE;
"""


# ── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    print("=" * 60)
    print("Romania Spatial Pipeline — UrbanX")
    print(f"Start: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 60)

    all_records = []

    # 1. CIMEC
    print("\n[1/3] CIMEC LMI...")
    for layer, ltype in [('LMI_Puncte','monumente'),('LMI_Zone','zone'),('Situri_Arh','situri')]:
        features = fetch_cimec_layer(layer)
        if features:
            normalized = normalize_lmi(features, ltype)
            all_records.extend(normalized)
            print(f"       → {len(normalized)} normalizate")

    # 2. OSM
    print("\n[2/3] OpenStreetMap heritage...")
    osm_elements = fetch_osm_heritage()
    osm_records  = normalize_osm(osm_elements)
    all_records.extend(osm_records)
    print(f"       → {len(osm_records)} normalizate")

    # 3. Wikidata
    print("\n[3/3] Wikidata monumente...")
    wiki_records = fetch_wikidata_monuments()
    all_records.extend(wiki_records)

    print(f"\nTOTAL: {len(all_records)} records din {len(set(r['source'] for r in all_records))} surse")

    # 4. Supabase
    if all_records and SUPABASE_URL != 'https://YOUR_PROJECT.supabase.co':
        print("\nInserare în Supabase...")
        upsert_to_supabase(all_records, 'lmi_romania')
    else:
        # Salvează local ca fallback
        with open('lmi_romania_export.json', 'w', encoding='utf-8') as f:
            json.dump(all_records, f, ensure_ascii=False, indent=2)
        print(f"\n✅ Salvat local: lmi_romania_export.json ({len(all_records)} records)")
        print("   Configurați SUPABASE_URL și SUPABASE_SERVICE_KEY pentru upload automat")

    print(f"\nSchema SQL: copiați SCHEMA_SQL din fișier și rulați în Supabase SQL Editor")
    print("Done!")

    # Printează schema
    with open('supabase_schema.sql', 'w') as f:
        f.write(SCHEMA_SQL)
    print("✅ supabase_schema.sql generat")


if __name__ == '__main__':
    main()
