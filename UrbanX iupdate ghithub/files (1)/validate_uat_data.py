#!/usr/bin/env python3
"""
UrbanX — Validare date UAT înainte de upload
Folosire: python3 validate_uat_data.py /path/to/data/municipiul-bacau/
"""

import json, sys, os


def validate(folder):
    print(f"\n{'='*60}")
    print(f"Validare: {os.path.abspath(folder)}")
    print('='*60)
    errors = []
    warnings = []

    # 1. pug.geojson
    pug_path = os.path.join(folder, 'pug.geojson')
    if not os.path.exists(pug_path):
        errors.append("LIPSĂ: pug.geojson")
    else:
        size_kb = os.path.getsize(pug_path) // 1024
        with open(pug_path) as f:
            try:
                pug = json.load(f)
                features = pug.get('features', [])
                utrs = {}
                fara_utr = 0
                for feat in features:
                    utr = feat.get('properties', {}).get('utr', '')
                    if not utr or utr in ['?', '??', '']:
                        fara_utr += 1
                    else:
                        utrs[utr] = utrs.get(utr, 0) + 1

                print(f"\n📋 pug.geojson  ({size_kb}KB)")
                print(f"   Zone totale : {len(features)}")
                print(f"   Fără UTR    : {fara_utr}")
                print(f"   UTR-uri ({len(utrs)}): {', '.join(sorted(utrs.keys()))}")

                if len(features) > 0 and fara_utr > len(features) * 0.1:
                    warnings.append(
                        f"{fara_utr} zone fără câmp 'utr' ({int(fara_utr/len(features)*100)}%)"
                        " — verifică că proprietatea se numește exact 'utr'"
                    )
                if len(features) < 10:
                    warnings.append("Foarte puține zone (<10) — posibil fișier incomplet")
            except json.JSONDecodeError as e:
                errors.append(f"pug.geojson JSON invalid: {e}")

    # 2. cadastru_index.json
    cad_path = os.path.join(folder, 'cadastru_index.json')
    if not os.path.exists(cad_path):
        warnings.append("LIPSĂ cadastru_index.json — căutarea după nrcad va fi dezactivată")
    else:
        size_kb = os.path.getsize(cad_path) // 1024
        with open(cad_path) as f:
            try:
                cad = json.load(f)
                bad_format = sum(
                    1 for v in cad.values()
                    if not isinstance(v, list) or len(v) != 2
                )
                sample = list(cad.items())[:2]

                print(f"\n🗺  cadastru_index.json  ({size_kb}KB)")
                print(f"   Parcele  : {len(cad)}")
                print(f"   Format ✗ : {bad_format}")
                print(f"   Exemple  : {sample}")

                if bad_format > 0:
                    errors.append(
                        f"{bad_format} înregistrări cu format greșit în cadastru_index.json"
                        " — valoarea trebuie să fie [lng, lat]"
                    )
            except json.JSONDecodeError as e:
                errors.append(f"cadastru_index.json JSON invalid: {e}")

    # 3. reguli.json
    reg_path = os.path.join(folder, 'reguli.json')
    if not os.path.exists(reg_path):
        warnings.append("LIPSĂ reguli.json — se vor folosi regulile generice din globals")
    else:
        with open(reg_path) as f:
            try:
                reguli = json.load(f)
                required_fields = ['pot', 'cut', 'niv', 'h', 'rf', 'rl', 'rs', 'sv']
                incomplete = []
                for utr, reg in reguli.items():
                    missing = [field for field in required_fields if field not in reg]
                    if missing:
                        incomplete.append(f"{utr}: lipsesc {missing}")

                print(f"\n📏 reguli.json")
                print(f"   UTR-uri definite : {len(reguli)}")
                print(f"   Lista            : {', '.join(sorted(reguli.keys()))}")

                for msg in incomplete[:5]:
                    warnings.append(f"Câmpuri lipsă: {msg}")
                if len(incomplete) > 5:
                    warnings.append(f"...și alte {len(incomplete)-5} UTR-uri cu câmpuri lipsă")
            except json.JSONDecodeError as e:
                errors.append(f"reguli.json JSON invalid: {e}")

    # Sumar final
    print(f"\n{'─'*60}")
    if errors:
        print(f"❌  ERORI ({len(errors)}) — trebuie corectate:")
        for e in errors:
            print(f"    • {e}")
    if warnings:
        print(f"⚠️   AVERTISMENTE ({len(warnings)}) — de verificat:")
        for w in warnings:
            print(f"    • {w}")
    if not errors and not warnings:
        print("✅  Toate verificările trecute! Datele sunt gata de upload.")
    elif not errors:
        print("✅  Nicio eroare critică. Uploadul poate continua.")
    else:
        print("❌  Corectează erorile înainte de upload.")

    return len(errors) == 0


if __name__ == '__main__':
    folder = sys.argv[1] if len(sys.argv) > 1 else '.'
    ok = validate(folder)
    sys.exit(0 if ok else 1)
