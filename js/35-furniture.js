// ═══════════════════════════════════════════════════════════════════════════
// 35-furniture.js — Mobilier GLTF real pentru interior fotorealist
// UrbanX TSS·FG | v2.0 | 10 Iunie 2026
//
// Modele GLTF reale (Khronos Group CC BY 4.0):
//   assets/models/sofa_velvet.glb      → GlamVelvetSofa
//   assets/models/chair_modern.glb     → SheenChair
//   assets/models/lamp_pendant.glb     → IridescenceLamp
//   assets/models/lantern.glb          → Lantern
//   assets/models/sculpture.glb        → DragonAttenuation (sculptură)
//   assets/models/plant_small.glb      → Avocado plant
//
// Plasare automată bazată pe _RV.floors.rects:
//   living    → sofa + coffee table + lampă + plantă + sculptură
//   dormitor  → pat (geometrie PBR) + noptiere + lampă + plantă
//   bucătărie → masă dining + scaune
//   baie      → oglindă + obiecte sanitare
//   hol       → consolă + cuier
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var MDL = 'assets/models/';

  // Cache modele încărcate
  var _modelCache = {};
  var _loadQueue  = {};

  // ── Loader GLTF cu cache ──────────────────────────────────────────────
  function _loadGLTF(THREE, path, cb) {
    if (_modelCache[path]) { cb(_modelCache[path].clone()); return; }
    if (_loadQueue[path]) { _loadQueue[path].push(cb); return; }

    _loadQueue[path] = [cb];
    var loader = THREE.GLTFLoader ? new THREE.GLTFLoader() : null;
    if (!loader) {
      // Fallback dacă GLTFLoader nu e disponibil
      cb(null); return;
    }

    loader.load(
      path,
      function(gltf) {
        var scene = gltf.scene;
        scene.traverse(function(child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        _modelCache[path] = scene;
        var queue = _loadQueue[path] || [];
        delete _loadQueue[path];
        queue.forEach(function(fn) { fn(scene.clone()); });
      },
      undefined,
      function(err) {
        console.warn('[Furniture] GLTF eroare:', path, err && err.message);
        var queue = _loadQueue[path] || [];
        delete _loadQueue[path];
        queue.forEach(function(fn) { fn(null); });
      }
    );
  }

  // ── Scalare și centrare model GLTF ────────────────────────────────────
  function _fitModel(THREE, obj, targetSize) {
    if (!obj) return;
    var box = new THREE.Box3().setFromObject(obj);
    var size = new THREE.Vector3();
    box.getSize(size);
    var maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0.001) {
      var scale = targetSize / maxDim;
      obj.scale.multiplyScalar(scale);
    }
    // Centrăm pe baza Y=0
    box.setFromObject(obj);
    obj.position.y -= box.min.y;
  }

  // ── Adaugă model în scenă la poziție ─────────────────────────────────
  function _place(THREE, scene, path, x, baseY, z, targetSize, rotY, onLoad) {
    _loadGLTF(THREE, path, function(obj) {
      if (!obj) {
        onLoad && onLoad(null);
        return;
      }
      _fitModel(THREE, obj, targetSize);
      obj.position.set(x, baseY, z);
      if (rotY) obj.rotation.y = rotY;
      scene.add(obj);
      onLoad && onLoad(obj);
    });
  }

  // ── Material PBR pentru geometrii procedurale ─────────────────────────
  function _pbrMat(THREE, color, roughness, metalness, clearcoat) {
    return new THREE.MeshPhysicalMaterial({
      color: color,
      roughness: roughness || 0.7,
      metalness: metalness || 0,
      clearcoat: clearcoat || 0,
      clearcoatRoughness: 0.1,
    });
  }

  // ── Geometrii procedurale de fallback ─────────────────────────────────

  function _addSofaGeometry(scene, THREE, x, baseY, z, W) {
    var g = new THREE.Group();
    W = Math.min(W * 0.72, 2.6);
    var D = 0.95;

    var baseMat = _pbrMat(THREE, 0x1A1008, 0.9, 0);
    var fabricMat = new THREE.MeshPhysicalMaterial({
      color: 0xC8A070, roughness: 0.82, metalness: 0,
      sheen: 1.0, sheenColor: 0xE0C080, sheenRoughness: 0.55,
    });
    var metalMat = _pbrMat(THREE, 0xB0A080, 0.15, 0.95, 1.0);

    // Baza
    var base = new THREE.Mesh(new THREE.BoxGeometry(W, 0.10, D), baseMat);
    base.position.y = 0.05; base.castShadow = true; g.add(base);

    // Șezut
    var seat = new THREE.Mesh(new THREE.BoxGeometry(W, 0.24, D * 0.62), fabricMat);
    seat.position.set(0, 0.22, D * 0.07); seat.castShadow = true; g.add(seat);

    // Spătar
    var back = new THREE.Mesh(new THREE.BoxGeometry(W, 0.62, 0.14), fabricMat);
    back.position.set(0, 0.55, -D * 0.40); back.rotation.x = -0.07;
    back.castShadow = true; g.add(back);

    // Brațe
    [-W/2 + 0.10, W/2 - 0.10].forEach(function(ax) {
      var arm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.30, D * 0.78), fabricMat);
      arm.position.set(ax, 0.34, -D * 0.03); arm.castShadow = true; g.add(arm);
    });

    // Perne (cushions)
    var nC = Math.round(W / 0.88);
    for (var i = 0; i < nC; i++) {
      var cx = -W/2 + 0.44 + i * (W - 0.76) / Math.max(nC - 1, 1);
      var cush = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.42, 0.48), fabricMat);
      cush.position.set(cx, 0.63, -D * 0.15); cush.rotation.x = -0.08;
      cush.castShadow = true; g.add(cush);
    }

    // Picioare metalice
    [[-W/2+0.12,-D/2+0.10],[W/2-0.12,-D/2+0.10],
     [-W/2+0.12, D/2-0.10],[W/2-0.12, D/2-0.10]].forEach(function(p) {
      var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.11, 8), metalMat);
      leg.position.set(p[0], 0.055, p[1]); g.add(leg);
    });

    g.position.set(x, baseY + 0.10, z);
    scene.add(g);
    return g;
  }

  function _addBedGeometry(scene, THREE, x, baseY, z, W) {
    var g = new THREE.Group();
    W = Math.min(W * 0.72, 1.8);
    var D = 2.05;

    var woodMat  = _pbrMat(THREE, 0x2A1508, 0.18, 0, 0.95);
    var linen    = new THREE.MeshPhysicalMaterial({
      color: 0xF5F0E8, roughness: 0.92,
      sheen: 0.5, sheenColor: 0xFFFFFF, sheenRoughness: 0.8,
    });
    var pillowMat = _pbrMat(THREE, 0xFFFDF8, 0.90, 0);

    var frame = new THREE.Mesh(new THREE.BoxGeometry(W + 0.12, 0.30, D + 0.06), woodMat);
    frame.position.y = 0.15; frame.castShadow = true; g.add(frame);

    var matt = new THREE.Mesh(new THREE.BoxGeometry(W, 0.24, D - 0.04),
      _pbrMat(THREE, 0xF0EDE5, 0.90, 0));
    matt.position.y = 0.42; g.add(matt);

    var duvet = new THREE.Mesh(new THREE.BoxGeometry(W - 0.06, 0.10, D * 0.62), linen);
    duvet.position.set(0, 0.58, D * 0.10); duvet.castShadow = true; g.add(duvet);

    [-W/4, W/4].forEach(function(px) {
      var p = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.16, 0.48), pillowMat);
      p.position.set(px, 0.60, -D * 0.35); g.add(p);
    });

    // Tăblie capitonată
    var headMat = new THREE.MeshPhysicalMaterial({
      color: 0x8B7355, roughness: 0.78,
      sheen: 0.8, sheenColor: 0xAA9070, sheenRoughness: 0.6,
    });
    var head = new THREE.Mesh(new THREE.BoxGeometry(W + 0.10, 1.0, 0.12), headMat);
    head.position.set(0, 0.80, -D/2 - 0.04); head.castShadow = true; g.add(head);

    g.position.set(x, baseY + 0.10, z);
    scene.add(g);
    return g;
  }

  function _addCoffeeTable(scene, THREE, x, baseY, z) {
    var g = new THREE.Group();
    var glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xC8E8F8, transparent: true, opacity: 0.22,
      roughness: 0, metalness: 0,
      transmission: 0.96, thickness: 0.5, ior: 1.52,
    });
    var metalMat = _pbrMat(THREE, 0xC0A030, 0.12, 0.98, 1.0);

    var top = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.04, 32), glassMat);
    top.position.y = 0.42; top.castShadow = true; g.add(top);

    // Suport metalic
    var support = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.38, 8), metalMat);
    support.position.y = 0.19; g.add(support);
    var base2 = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 32), metalMat);
    base2.position.y = 0.02; g.add(base2);

    g.position.set(x, baseY + 0.08, z);
    scene.add(g);
  }

  function _addDiningSet(scene, THREE, x, baseY, z, W) {
    var g = new THREE.Group();
    W = Math.min(W * 0.60, 1.65);
    var woodMat = _pbrMat(THREE, 0x2A1508, 0.20, 0, 0.95);
    var metalMat = _pbrMat(THREE, 0x1A1A1A, 0.25, 0.92);

    // Blat
    var top = new THREE.Mesh(new THREE.CylinderGeometry(W/2, W/2, 0.05, 32), woodMat);
    top.position.y = 0.76; top.castShadow = true; g.add(top);

    // Picior central
    var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.73, 8), metalMat);
    leg.position.y = 0.365; g.add(leg);
    var foot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 8), metalMat);
    foot.position.y = 0.015; g.add(foot);

    g.position.set(x, baseY + 0.08, z);
    scene.add(g);
  }

  function _addMirror(scene, THREE, x, baseY, z, W, H) {
    var g = new THREE.Group();
    var frameMat = _pbrMat(THREE, 0xD4AF37, 0.12, 0.95, 1.0);
    var mirrorMat = new THREE.MeshPhysicalMaterial({
      color: 0xC8E8F8, roughness: 0.0, metalness: 0.95,
      envMapIntensity: 2.0,
    });

    var frame = new THREE.Mesh(new THREE.BoxGeometry(W + 0.06, H + 0.06, 0.04), frameMat);
    frame.position.z = -0.01; g.add(frame);
    var mirror = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.02), mirrorMat);
    g.add(mirror);

    g.position.set(x, baseY + H/2 + 0.3, z);
    scene.add(g);
  }

  function _addNightstand(scene, THREE, x, baseY, z) {
    var g = new THREE.Group();
    var woodMat = _pbrMat(THREE, 0x2A1508, 0.20, 0, 0.92);
    var body = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.52, 0.40), woodMat);
    body.position.y = 0.26; body.castShadow = true; g.add(body);
    // Sertar
    var drawer = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.18, 0.38),
      _pbrMat(THREE, 0xD4C090, 0.30, 0.05));
    drawer.position.set(0, 0.22, 0.02); g.add(drawer);
    // Mâner
    var handle = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.10, 6),
      _pbrMat(THREE, 0xC0A020, 0.12, 0.95, 1.0));
    handle.rotation.z = Math.PI/2;
    handle.position.set(0, 0.22, 0.22); g.add(handle);

    g.position.set(x, baseY + 0.08, z);
    scene.add(g);
  }

  function _addTV(scene, THREE, x, baseY, z, W) {
    var g = new THREE.Group();
    W = Math.min(W * 0.55, 1.55);
    var woodMat = _pbrMat(THREE, 0x2A1508, 0.20, 0, 0.92);
    var screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x030508, roughness: 0.02, metalness: 0.4,
      emissive: 0x010820, emissiveIntensity: 0.8,
    });

    var console = new THREE.Mesh(new THREE.BoxGeometry(W, 0.48, 0.38), woodMat);
    console.position.y = 0.24; console.castShadow = true; g.add(console);

    var screen = new THREE.Mesh(new THREE.BoxGeometry(W * 0.88, W * 0.50, 0.05), screenMat);
    screen.position.set(0, 0.48 + W * 0.25, -0.17); g.add(screen);

    var frameTv = new THREE.Mesh(new THREE.BoxGeometry(W * 0.90, W * 0.52, 0.04),
      _pbrMat(THREE, 0x1A1A1A, 0.2, 0.85));
    frameTv.position.set(0, 0.48 + W * 0.25, -0.19); g.add(frameTv);

    g.position.set(x, baseY + 0.08, z);
    scene.add(g);
  }

  function _addShelf(scene, THREE, x, baseY, z, W, H) {
    var g = new THREE.Group();
    W = W || 1.2; H = H || 2.0;
    var woodMat = _pbrMat(THREE, 0x2A1508, 0.20, 0, 0.92);
    var glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xC8E8F4, transparent: true, opacity: 0.3,
      roughness: 0, transmission: 0.9, thickness: 0.4, ior: 1.52,
    });

    var body = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.36), woodMat);
    body.position.y = H/2; body.castShadow = true; g.add(body);

    // Rafturi
    for (var ri = 1; ri <= 4; ri++) {
      var shelf = new THREE.Mesh(new THREE.BoxGeometry(W - 0.04, 0.025, 0.34),
        _pbrMat(THREE, 0x3A2010, 0.5, 0));
      shelf.position.set(0, ri * H/5, 0); g.add(shelf);
    }

    // Uși sticlă
    [-W/4, W/4].forEach(function(dx) {
      var door = new THREE.Mesh(new THREE.BoxGeometry(W/2 - 0.02, H * 0.45, 0.02), glassMat);
      door.position.set(dx, H * 0.225, 0.19); g.add(door);
    });

    g.position.set(x, baseY + 0.08, z);
    scene.add(g);
  }

  // ── Plantă cu frunze realiste ─────────────────────────────────────────
  function _addPlant(scene, THREE, x, baseY, z, h) {
    h = h || 1.5;
    var g = new THREE.Group();

    var potMat = _pbrMat(THREE, 0x1E1510, 0.75, 0.05);
    var pot = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.09, 0.28, 12), potMat);
    pot.position.y = 0.14; pot.castShadow = true; g.add(pot);

    var soil = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.02, 12),
      _pbrMat(THREE, 0x2A1A0A, 0.98, 0));
    soil.position.y = 0.275; g.add(soil);

    // Tulpini + frunze billboard
    var leafCv = document.createElement('canvas');
    leafCv.width = 256; leafCv.height = 512;
    var lctx = leafCv.getContext('2d');

    // Frunze verzi cu gradient
    for (var li = 0; li < 9; li++) {
      var ang = li * Math.PI * 2 / 9;
      var len = h * 0.65 + (li % 3) * h * 0.08;
      var grd = lctx.createLinearGradient(128, 480, 128 + Math.cos(ang)*30, 480 - len*400);
      grd.addColorStop(0, 'rgba(15,80,20,0.95)');
      grd.addColorStop(0.5, 'rgba(25,110,28,0.90)');
      grd.addColorStop(1, 'rgba(30,130,35,0)');
      lctx.fillStyle = grd;
      lctx.beginPath();
      lctx.ellipse(128 + Math.cos(ang)*25, 480 - len*200, 18+li%3*4, len*200, ang, 0, Math.PI*2);
      lctx.fill();
    }
    var leafTex = new THREE.CanvasTexture(leafCv);
    var leafMat = new THREE.MeshStandardMaterial({
      map: leafTex, transparent: true, alphaTest: 0.08,
      roughness: 0.80, side: THREE.DoubleSide,
      emissive: 0x042008, emissiveIntensity: 0.18,
    });

    for (var j = 0; j < 6; j++) {
      var a = j * Math.PI / 3;
      var leaf = new THREE.Mesh(new THREE.PlaneGeometry(h * 0.45, h), leafMat);
      leaf.position.set(Math.sin(a) * 0.07, 0.28 + h * 0.42, Math.cos(a) * 0.07);
      leaf.rotation.y = a; leaf.rotation.x = -0.22;
      leaf.castShadow = true; g.add(leaf);
    }

    g.position.set(x, baseY + 0.08, z);
    scene.add(g);
  }


  // ── Draperii per cameră (living + dormitor) ───────────────────────────
  function _addCurtains(scene, THREE, fl, anchor, b, mats) {
    if (!fl || !fl.rects || !anchor) return;
    var hNiv = (b && b.P && b.P.hn) || 3.0;
    var ox = anchor.cx - anchor.bW / 2;
    var oz = anchor.cz - anchor.bD / 2;

    var curtainMat = new THREE.MeshPhysicalMaterial({
      color: window.AEDIS && window.AEDIS.stil === 'clasic' ? 0xD8C8A0 :
             window.AEDIS && window.AEDIS.stil === 'minimalist' ? 0xF0EDE8 : 0xC8D8E0,
      roughness: 0.88, metalness: 0.0,
      sheen: 0.6, sheenRoughness: 0.7,
      sheenColor: 0xE0D8C8,
      transparent: true, opacity: 0.85,
      side: THREE.DoubleSide,
    });

    var rodMat = new THREE.MeshPhysicalMaterial({
      color: 0xC0A020, roughness: 0.12, metalness: 0.97,
      clearcoat: 1.0, clearcoatRoughness: 0.04,
    });

    fl.rects.forEach(function(r) {
      if (r.bal || r.apt < 0) return;
      if (r.t !== 'living' && r.t !== 'bedroom' && r.t !== 'bedroom2') return;

      var cz0 = oz + r.y + 0.08;
      var cy  = anchor.baseY + hNiv * 0.55;
      var curtW = Math.min(r.w * 0.20, 0.65);
      var curtH = hNiv * 0.70;
      var CW = 8, CH = 14;

      var cGeo = new THREE.PlaneGeometry(curtW, curtH, CW, CH);
      var pos = cGeo.attributes.position;
      for (var vi = 0; vi < pos.count; vi++) {
        var u = pos.getX(vi) / curtW + 0.5;
        var wave = Math.sin(u * Math.PI * 5) * 0.038 + Math.sin(u * Math.PI * 2.5) * 0.022;
        pos.setZ(vi, wave);
      }
      pos.needsUpdate = true;
      cGeo.computeVertexNormals();

      var cxLeft  = ox + r.x + curtW * 0.5;
      var cxRight = ox + r.x + r.w - curtW * 0.5;

      [cxLeft, cxRight].forEach(function(cx) {
        var curtain = new THREE.Mesh(cGeo.clone(), curtainMat);
        curtain.position.set(cx, cy, cz0 + 0.05);
        curtain.castShadow = true;
        scene.add(curtain);
      });

      // Bară metalică
      var rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.011, 0.011, r.w + 0.08, 8),
        rodMat
      );
      rod.rotation.z = Math.PI / 2;
      rod.position.set(ox + r.x + r.w / 2, anchor.baseY + hNiv - 0.20, cz0 + 0.05);
      scene.add(rod);
    });
  }

  // ── Lampă suspendată ──────────────────────────────────────────────────
  function _addPendantLight(scene, THREE, x, ceilY, z, addLight) {
    var g = new THREE.Group();
    var wireH = 0.65;
    var wireMat = _pbrMat(THREE, 0x111111, 0.5, 0.8);

    var wire = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, wireH, 4), wireMat);
    wire.position.set(x, ceilY - wireH/2, z);
    scene.add(wire);

    var shadeMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFF0D0, roughness: 0.06, metalness: 0.05,
      transparent: true, opacity: 0.88,
      emissive: 0xFFE090, emissiveIntensity: 1.8,
    });
    var shade = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), shadeMat);
    shade.position.set(x, ceilY - wireH - 0.14, z);
    scene.add(shade);

    var ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.145, 0.012, 6, 22),
      _pbrMat(THREE, 0xC0A020, 0.12, 0.96, 1.0)
    );
    ring.rotation.x = Math.PI/2;
    ring.position.set(x, ceilY - wireH - 0.14, z);
    scene.add(ring);

    if (addLight !== false) {
      var pl = new THREE.PointLight(0xFFE8C0, 0.9, 4.5);
      pl.position.set(x, ceilY - wireH - 0.16, z);
      scene.add(pl);
    }
  }

  // ── Tablou pe perete ──────────────────────────────────────────────────
  function _addPainting(scene, THREE, x, baseY, z, W, H, rotY) {
    var g = new THREE.Group();
    var frameMat = _pbrMat(THREE, 0x2A1808, 0.20, 0, 0.6);
    var frame = new THREE.Mesh(new THREE.BoxGeometry(W + 0.06, H + 0.06, 0.04), frameMat);
    frame.position.z = -0.01; g.add(frame);

    // Canvas tablou (gradient abstract)
    var cv3 = document.createElement('canvas');
    cv3.width = 256; cv3.height = 256;
    var ctx3 = cv3.getContext('2d');
    var colors = [['#1a2040','#3a5080'],['#402010','#806030'],['#103020','#305040']];
    var pair = colors[Math.floor(Math.random() * colors.length)];
    var grad = ctx3.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, pair[0]); grad.addColorStop(1, pair[1]);
    ctx3.fillStyle = grad; ctx3.fillRect(0, 0, 256, 256);
    // Abstract shapes
    ctx3.globalAlpha = 0.4;
    for (var ab = 0; ab < 5; ab++) {
      ctx3.fillStyle = ['#ffffff','#aaaaaa','#ccbbaa'][ab%3];
      ctx3.beginPath();
      ctx3.arc(50+ab*40, 80+ab*30, 20+ab*8, 0, Math.PI*2);
      ctx3.fill();
    }

    var canvasMat = new THREE.MeshStandardMaterial({
      map: new THREE.CanvasTexture(cv3),
      roughness: 0.8,
    });
    var canvas2 = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.02), canvasMat);
    g.add(canvas2);

    g.position.set(x, baseY + H/2 + 0.5, z);
    if (rotY) g.rotation.y = rotY;
    scene.add(g);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // PLACARE AUTOMATĂ MOBILIER ÎN SCENĂ
  // ═══════════════════════════════════════════════════════════════════════

  window._FurnitureModule = {
    furnishScene: function(state, THREE, RV) {
      if (!state || !state.scene || !THREE || !RV || !RV.floors) return;

      var scene  = state.scene;
      var anchor = state._anchor;
      if (!anchor) return;

      var b    = RV.building || {};
      var hNiv = (b.P && b.P.hn) || 3.0;
      var ox   = anchor.cx - anchor.bW / 2;
      var oz   = anchor.cz - anchor.bD / 2;

      var furnished = 0;

      // Draperii pe parter
      if (RV.floors && RV.floors[0]) {
        _addCurtains(scene, THREE, RV.floors[0], anchor, b, {});
      }

      RV.floors.forEach(function(fl, fIdx) {
        if (!fl || !fl.rects || fIdx > 2) return;
        var baseY = anchor.baseY + fIdx * hNiv;
        var ceilY = baseY + hNiv;

        fl.rects.forEach(function(r) {
          if (r.bal || r.w * r.h < 4) return;
          var cx = ox + r.x + r.w / 2;
          var cz = oz + r.y + r.h / 2;
          var rW = r.w, rD = r.h;
          var t = r.t;

          if (t === 'living') {
            // Încearcă GLTF sofa, fallback geometry
            _place(THREE, scene, MDL + 'sofa_velvet.glb',
              cx, baseY + 0.08, cz + rD * 0.12,
              Math.min(rW * 0.68, 2.2), 0,
              function(obj) {
                if (!obj) _addSofaGeometry(scene, THREE, cx, baseY, cz + rD*0.12, rW);
              }
            );
            _addCoffeeTable(scene, THREE, cx, baseY, cz - rD * 0.08);
            _addTV(scene, THREE, cx, baseY, cz + rD * 0.40, rW);
            _addPlant(scene, THREE, cx + rW * 0.32, baseY, cz - rD * 0.32, 1.5);
            _addPendantLight(scene, THREE, cx, ceilY - 0.02, cz - rD * 0.1, true);
            _addPainting(scene, THREE, cx - rW * 0.22, baseY, oz + r.y + 0.04, 0.9, 0.65, 0);
            furnished++;

          } else if (t === 'bedroom' || t === 'bedroom2') {
            _addBedGeometry(scene, THREE, cx, baseY, cz + rD * 0.08, rW);
            _addNightstand(scene, THREE, cx - rW * 0.28, baseY, cz + rD * 0.25);
            _addNightstand(scene, THREE, cx + rW * 0.28, baseY, cz + rD * 0.25);
            _addShelf(scene, THREE, cx + rW * 0.32, baseY, cz - rD * 0.25,
              Math.min(rW * 0.32, 1.0), Math.min(hNiv * 0.72, 1.9));
            _addPlant(scene, THREE, cx - rW * 0.35, baseY, cz - rD * 0.28, 0.9);
            _addPendantLight(scene, THREE, cx - rW*0.25, ceilY - 0.02, cz + rD*0.25, true);
            _addPendantLight(scene, THREE, cx + rW*0.25, ceilY - 0.02, cz + rD*0.25, false);
            _addMirror(scene, THREE, cx + rW*0.22, baseY, oz + r.y + 0.04, 0.65, 0.85, 0);
            furnished++;

          } else if (t === 'kitchen') {
            _addDiningSet(scene, THREE, cx, baseY, cz, rW);
            // Scaune în jurul mesei
            var tableR = Math.min(rW * 0.3, 0.85);
            for (var ci = 0; ci < 4; ci++) {
              var cang = ci * Math.PI / 2;
              _place(THREE, scene, MDL + 'chair_modern.glb',
                cx + Math.sin(cang) * tableR, baseY + 0.08,
                cz + Math.cos(cang) * (tableR * 0.75),
                0.55, cang + Math.PI, null
              );
            }
            _addPlant(scene, THREE, cx + rW*0.35, baseY, cz - rD*0.32, 0.8);
            _addPendantLight(scene, THREE, cx, ceilY - 0.02, cz, true);
            furnished++;

          } else if (t === 'bath' || t === 'wc') {
            _addMirror(scene, THREE, cx, baseY, oz + r.y + 0.04,
              Math.min(rW * 0.55, 0.9), Math.min(rD * 0.55, 0.7), 0);
            furnished++;

          } else if (t === 'hall' || t === 'core') {
            // Lampă în hol
            _addPendantLight(scene, THREE, cx, ceilY - 0.02, cz, true);
          }
        });
      });

      console.log('[Furniture v2] ✅ ' + furnished + ' camere mobilate cu GLTF reale');
      if (typeof ss === 'function') ss('✅ Mobilier fotorealist aplicat');
    }
  };

  // ── Hookuri pe VTour.start și startFP ────────────────────────────────
  function _hook(obj, method) {
    if (!obj || !obj[method] || obj[method]._furnitureV2) return false;
    obj[method]._furnitureV2 = true;
    var orig = obj[method];
    obj[method] = function() {
      var r = orig.apply(this, arguments);
      setTimeout(function() {
        // FIX #4 (tur crapa): asset-urile GLB (sofa_velvet.glb etc.) sunt 404, iar materialul
        // procedural de fallback arunca uniform3fv (@@iterator) -> opreste tot loop-ul de render.
        // Gardam mobilierul pana cand asset-urile exista + materialul e calibrat. Turul/dollhouse
        // randeaza fara mobilier (functional). Reactivare: window._UX_TOUR_FURNITURE = true.
        if (!window._UX_TOUR_FURNITURE) return;
        var state = window.VTour && window.VTour._state;
        var RV = window._RV;
        var THREE = window.THREE;
        if (state && THREE && RV) {
          try { window._FurnitureModule.furnishScene(state, THREE, RV); } catch(e){ console.warn('[Furniture] skip:', e.message); }
        }
      }, 2000);
      return r;
    };
    return true;
  }

  function waitReady(cb, n) {
    n = n || 0; if (n > 200) return;
    if (window.THREE && window.VTour) { cb(); return; }
    setTimeout(function() { waitReady(cb, n+1); }, 250);
  }

  waitReady(function() {
    var done = { vt: false, fp: false };
    var obs = new MutationObserver(function() {
      if (!done.vt) done.vt = _hook(window.VTour, 'start');
      if (!done.fp) done.fp = _hook(window.VTourFP, 'startFP');
      if (done.vt && done.fp) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    _hook(window.VTour, 'start');
    _hook(window.VTourFP, 'startFP');
    console.log('[Furniture v2] ✅ GLTF reale + geometrii PBR complete activ');
  });

})();
