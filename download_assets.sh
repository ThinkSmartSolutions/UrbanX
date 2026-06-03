#!/bin/bash
# UrbanX Tur Virtual 3D — Descărcare asseturi fotorealiste CC0
# Surse: PolyHaven (PBR + HDRI + Models) · Quaternius (modele suplimentare)
# Toate licența CC0 — utilizabile comercial fără atribuție
# Total estimat: ~85 MB

set -e

PH_TEX="https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k"
PH_HDR="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k"
PH_MDL="https://dl.polyhaven.org/file/ph-assets/Models/gltf/2k"
BASE="assets/tur3d"

echo "📦 UrbanX — descărcare asseturi fotorealiste CC0..."
mkdir -p "$BASE/pbr" "$BASE/hdri" "$BASE/models"

# ════════════════════════════════════════════════════════════════════
# A. PBR TEXTURES — 2K rezoluție (4 mape per material)
# ════════════════════════════════════════════════════════════════════
dl_pbr(){
  local DEST="$1" SLUG="$2"
  mkdir -p "$BASE/pbr/$DEST"
  echo "  → PBR/$DEST  (PolyHaven: $SLUG)"
  for MAP in "diff" "nor_gl" "rough" "ao"; do
    curl -sL --fail -o "$BASE/pbr/$DEST/${MAP}.jpg" \
      "$PH_TEX/$SLUG/${SLUG}_${MAP}_2k.jpg" 2>/dev/null \
      || echo "    ⚠ $MAP lipsește (codul folosește fallback color)"
  done
}

# Exterior
dl_pbr "tencuiala_exterior"  "plaster_brick_02"
dl_pbr "caramida_aparenta"   "brick_4"
dl_pbr "tigla_acoperis"      "roof_slates_03"
dl_pbr "dale_terasa"          "paving_stones_01"

# Interior — podele
dl_pbr "parchet_stejar"       "wood_floor_deck"
dl_pbr "gresie_baie"          "terracotta_floor_001"
dl_pbr "beton_subsol"         "concrete_floor_painted_001"
dl_pbr "marble_white"         "marble_01"

# Interior — pereți + suprafețe
dl_pbr "tencuiala_interior"   "beige_wall_001"
dl_pbr "blat_bucatarie"       "marble_01"
dl_pbr "metal_finish"         "metal_plate"
dl_pbr "fabric_canapea"       "fabric_pattern_05"

# ════════════════════════════════════════════════════════════════════
# B. HDRI — 3 ambiente diferite (1K, suficient pentru reflexii)
# ════════════════════════════════════════════════════════════════════
echo "🌅 Descărcare HDRI..."
curl -sL --fail -o "$BASE/hdri/exterior.hdr" \
  "$PH_HDR/kloofendal_43d_clear_puresky_1k.hdr" \
  || echo "  ⚠ HDRI exterior_day lipsește"
curl -sL --fail -o "$BASE/hdri/golden.hdr" \
  "$PH_HDR/spruit_sunrise_1k.hdr" \
  || echo "  ⚠ HDRI golden lipsește"
curl -sL --fail -o "$BASE/hdri/interior.hdr" \
  "$PH_HDR/studio_small_03_1k.hdr" \
  || echo "  ⚠ HDRI interior lipsește"

# ════════════════════════════════════════════════════════════════════
# C. MODELE GLB — mobilier CC0 fotorealist de la PolyHaven Models
# ════════════════════════════════════════════════════════════════════
dl_model(){
  local DEST="$1" SLUG="$2"
  echo "  → Models/$DEST  (PolyHaven: $SLUG)"
  curl -sL --fail -o "$BASE/models/${DEST}.glb" \
    "$PH_MDL/$SLUG/${SLUG}_2k.glb" 2>/dev/null \
    || echo "    ⚠ $DEST GLB lipsește (codul folosește fallback procedural)"
}

# Living
dl_model "sofa"           "Couch_01"
dl_model "armchair"       "ArmChair_01"
dl_model "coffee_table"   "CoffeeTable_01"
dl_model "tv"             "TV_old"

# Dormitor
dl_model "bed"            "Bed_01"
dl_model "nightstand"     "BedsideTable_01"
dl_model "wardrobe"       "Cabinet_01"

# Bucătărie
dl_model "fridge"         "Fridge_01"
dl_model "dining_table"   "Wooden_Table_02"
dl_model "chair"          "Wooden_Chair_02"

# Baie
dl_model "bathtub"        "Bathtub_01"
dl_model "toilet"         "Toilet_01"
dl_model "sink"           "Sink_01"

# Birou
dl_model "desk"           "Wooden_Table_01"
dl_model "office_chair"   "Office_Chair_01"
dl_model "bookshelf"      "Bookshelf_01"

# Decoraţii
dl_model "plant_potted"   "PotPlant_01"
dl_model "chandelier"     "Lamp_01"

echo ""
echo "✅ Gata. Verificare dimensiuni:"
du -sh "$BASE" 2>/dev/null
du -sh "$BASE/pbr" "$BASE/hdri" "$BASE/models" 2>/dev/null

echo ""
echo "📊 Inventar:"
echo "  PBR:    $(find $BASE/pbr -name '*.jpg' 2>/dev/null | wc -l) texturi"
echo "  HDRI:   $(find $BASE/hdri -name '*.hdr' 2>/dev/null | wc -l) variante"
echo "  Models: $(find $BASE/models -name '*.glb' 2>/dev/null | wc -l) modele GLB"

echo ""
echo "🚀 Adaugă în git:"
echo "  git add $BASE"
echo "  git commit -m 'feat: 85MB asseturi fotorealiste CC0 PolyHaven — 12 PBR 2K + 3 HDRI + 18 modele GLB'"
echo "  git push"
