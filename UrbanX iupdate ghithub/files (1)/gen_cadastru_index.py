#!/usr/bin/env python3
"""
UrbanX — Generator cadastru_index.json din Shapefile sau GeoJSON ANCPI
Folosire:
  python3 gen_cadastru_index.py input.shp   output.json
  python3 gen_cadastru_index.py input.geojson output.json [camp_nrcad]

Dependinte: geopandas (pentru .shp)
Instalare:  pip install geopandas
"""

import sys, json, os


def from_shapefile(shp_path, output_path, nrcad_field=None):
    try:
        import geopandas as gpd
    except ImportError:
        print("Instalează geopandas: pip install geopandas")
        return

    print(f"Citesc: {shp_path}")
    gdf = gpd.read_file(shp_path)
    gdf = gdf.to_crs('EPSG:4326')

    # Detectam campul nrcad
    possible = ['NR_CAD','nrcad','nr_cad','NRCAD','NrCad','id','ID','NR','nr']
    if nrcad_field:
        possible = [nrcad_field] + possible

    field = None
    for p in possible:
        if p in gdf.columns:
            field = p
            break

    if not field:
        print(f"Câmpuri disponibile: {list(gdf.columns)}")
        field = input("Introdu numele câmpului cu nr. cadastral: ").strip()

    print(f"Folosesc câmpul: {field}")

    index = {}
    skipped = 0
    for _, row in gdf.iterrows():
        nrcad = str(row.get(field, '')).strip()
        if not nrcad or nrcad in ['nan', 'None', '']:
            skipped += 1
            continue
        try:
            centroid = row.geometry.centroid
            index[nrcad] = [round(centroid.x, 6), round(centroid.y, 6)]
        except Exception:
            skipped += 1

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False)

    print(f"\n✅ Salvat: {output_path}")
    print(f"   Parcele indexate: {len(index)}")
    print(f"   Parcele omise:    {skipped}")
    if index:
        first_key = list(index.keys())[0]
        print(f"   Exemplu: '{first_key}': {index[first_key]}")


def from_geojson(geojson_path, output_path, nrcad_field='nrcad'):
    print(f"Citesc: {geojson_path}")
    with open(geojson_path) as f:
        data = json.load(f)

    index = {}
    skipped = 0
    for feat in data.get('features', []):
        props = feat.get('properties', {})
        nrcad = str(props.get(nrcad_field, props.get('NR_CAD', ''))).strip()
        if not nrcad or nrcad in ['nan', 'None', '']:
            skipped += 1
            continue
        try:
            geom = feat['geometry']
            if geom['type'] == 'Point':
                coords = geom['coordinates']
                index[nrcad] = [round(coords[0], 6), round(coords[1], 6)]
            elif geom['type'] in ['Polygon', 'MultiPolygon']:
                ring = geom['coordinates'][0] if geom['type'] == 'Polygon' else geom['coordinates'][0][0]
                lng = sum(c[0] for c in ring) / len(ring)
                lat = sum(c[1] for c in ring) / len(ring)
                index[nrcad] = [round(lng, 6), round(lat, 6)]
        except Exception:
            skipped += 1

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False)

    print(f"\n✅ Salvat: {output_path}")
    print(f"   Parcele indexate: {len(index)}")
    print(f"   Parcele omise:    {skipped}")


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    inp, out = sys.argv[1], sys.argv[2]
    field = sys.argv[3] if len(sys.argv) > 3 else None

    if inp.endswith('.shp'):
        from_shapefile(inp, out, field)
    elif inp.endswith(('.geojson', '.json')):
        from_geojson(inp, out, field or 'nrcad')
    else:
        print("Format nerecunoscut. Suportă .shp și .geojson")
