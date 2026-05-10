#!/usr/bin/env python3
"""
UrbanX — Generator tile-uri zone/ din Shapefile ANCPI
Împarte parcelele vectoriale în tile-uri de 0.05° pentru încărcare rapidă.

Folosire:
  python3 gen_zone_tiles.py input.shp   output_folder/ [camp_nrcad] [camp_utr]
  python3 gen_zone_tiles.py input.geojson output_folder/ [camp_nrcad] [camp_utr]

Exemplu:
  python3 gen_zone_tiles.py parcele_iasi.shp zone/ NR_CAD UTR

Dependinte: geopandas
Instalare:  pip install geopandas
"""

import json, os, sys, math

GRID = 0.05   # tile size in degrees (~5.5km × ~3.5km)


def get_tile_name(lng, lat):
    zx = int(lng / GRID)
    zy = int(lat / GRID)
    return f"zona_{zx}_{zy}"


def process_features(features_iter, output_folder, nrcad_field, utr_field, total_hint=None):
    tiles = {}
    processed = 0
    skipped = 0

    for row_geom, row_props in features_iter:
        nrcad = str(row_props.get(nrcad_field, row_props.get('NR_CAD', ''))).strip()
        if not nrcad or nrcad in ('nan', 'None', ''):
            skipped += 1
            continue

        try:
            # Centroid pentru determinarea tile-ului
            if row_geom['type'] == 'Point':
                lng, lat = row_geom['coordinates']
            elif row_geom['type'] == 'Polygon':
                ring = row_geom['coordinates'][0]
                lng = sum(c[0] for c in ring) / len(ring)
                lat = sum(c[1] for c in ring) / len(ring)
            elif row_geom['type'] == 'MultiPolygon':
                ring = row_geom['coordinates'][0][0]
                lng = sum(c[0] for c in ring) / len(ring)
                lat = sum(c[1] for c in ring) / len(ring)
            else:
                skipped += 1
                continue

            tile_name = get_tile_name(lng, lat)

            props = {'nrcad': nrcad, 'NR_CAD': nrcad}
            if utr_field:
                utr_val = str(row_props.get(utr_field, '')).strip()
                if utr_val and utr_val != 'nan':
                    props['utr'] = utr_val

            feature = {
                'type': 'Feature',
                'geometry': row_geom,
                'properties': props,
            }

            if tile_name not in tiles:
                tiles[tile_name] = []
            tiles[tile_name].append(feature)
            processed += 1

            if processed % 5000 == 0:
                hint = f"/{total_hint}" if total_hint else ""
                print(f"  Procesate: {processed}{hint} ({len(tiles)} tile-uri)...")

        except Exception:
            skipped += 1

    return tiles, processed, skipped


def from_shapefile(shp_path, output_folder, nrcad_field='NR_CAD', utr_field=None):
    try:
        import geopandas as gpd
    except ImportError:
        print("Instalează geopandas: pip install geopandas")
        sys.exit(1)

    print(f"Citesc shapefile: {shp_path}")
    gdf = gpd.read_file(shp_path)
    gdf = gdf.to_crs('EPSG:4326')

    # Auto-detect câmp nrcad
    candidates = [nrcad_field, 'NR_CAD', 'nrcad', 'nr_cad', 'NRCAD', 'ID', 'id']
    field = next((c for c in candidates if c in gdf.columns), None)
    if not field:
        print(f"Câmpuri disponibile: {list(gdf.columns)}")
        field = input("Câmpul cu nrcad: ").strip()

    print(f"Câmp nrcad: {field}")
    if utr_field:
        print(f"Câmp utr:   {utr_field}")

    def iter_rows():
        for _, row in gdf.iterrows():
            yield json.loads(row.geometry.to_json()), dict(row)

    tiles, processed, skipped = process_features(
        iter_rows(), output_folder, field, utr_field, len(gdf)
    )
    save_tiles(tiles, output_folder, processed, skipped)


def from_geojson(geojson_path, output_folder, nrcad_field='nrcad', utr_field=None):
    print(f"Citesc GeoJSON: {geojson_path}")
    with open(geojson_path) as f:
        data = json.load(f)

    features = data.get('features', [])

    def iter_rows():
        for feat in features:
            yield feat.get('geometry', {}), feat.get('properties', {})

    tiles, processed, skipped = process_features(
        iter_rows(), output_folder, nrcad_field, utr_field, len(features)
    )
    save_tiles(tiles, output_folder, processed, skipped)


def save_tiles(tiles, output_folder, processed, skipped):
    os.makedirs(output_folder, exist_ok=True)

    for tile_name, features in tiles.items():
        path = os.path.join(output_folder, f"{tile_name}.geojson")
        with open(path, 'w', encoding='utf-8') as f:
            json.dump({
                'type': 'FeatureCollection',
                'features': features,
            }, f, ensure_ascii=False)

    print(f"\n✅ Gata!")
    print(f"   Tile-uri generate : {len(tiles)}")
    print(f"   Parcele procesate : {processed}")
    print(f"   Parcele omise     : {skipped}")
    print(f"   Output folder     : {os.path.abspath(output_folder)}")

    if tiles:
        sample = sorted(tiles.keys())[:6]
        print(f"   Primele tile-uri  : {sample}")
        print(f"\n   Uploadează cu: git add {output_folder} && git commit -m 'Zone tiles' && git push")


def preview_tiles(city_name, lng, lat):
    """Afișează ce tile-uri acoperă un punct."""
    zx = int(lng / GRID)
    zy = int(lat / GRID)
    print(f"{city_name}: zona_{zx}_{zy}.geojson")
    print(f"  Tile acoperă: lng [{zx*GRID:.3f}–{(zx+1)*GRID:.3f}], lat [{zy*GRID:.3f}–{(zy+1)*GRID:.3f}]")


if __name__ == '__main__':
    if len(sys.argv) == 1:
        print(__doc__)
        print("\nTile-uri pentru orașele principale:")
        cities = [
            ("Iași",       27.60, 47.16),
            ("Bacău",      26.91, 46.57),
            ("Cluj",       23.59, 46.77),
            ("Timișoara",  21.23, 45.75),
            ("București",  26.10, 44.43),
            ("Brașov",     25.61, 45.65),
            ("Constanța",  28.65, 44.17),
            ("Suceava",    26.25, 47.65),
        ]
        for name, lng, lat in cities:
            preview_tiles(name, lng, lat)
        sys.exit(0)

    if len(sys.argv) < 3:
        print("Folosire: python3 gen_zone_tiles.py input.shp output/ [camp_nrcad] [camp_utr]")
        sys.exit(1)

    inp          = sys.argv[1]
    out          = sys.argv[2]
    nrcad_field  = sys.argv[3] if len(sys.argv) > 3 else 'NR_CAD'
    utr_field    = sys.argv[4] if len(sys.argv) > 4 else None

    if inp.endswith('.shp'):
        from_shapefile(inp, out, nrcad_field, utr_field)
    elif inp.endswith(('.geojson', '.json')):
        from_geojson(inp, out, nrcad_field, utr_field)
    else:
        print("Format nerecunoscut. Acceptă: .shp, .geojson, .json")
        sys.exit(1)
