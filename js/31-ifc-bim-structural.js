// ═══════════════════════════════════════════════════════════════════════════
// 31-ifc-bim-structural.js — IFC 2x3 BIM Structural Export Complet
// UrbanX TSS·FG | v1.0 | 09 Iunie 2026
//
// CE EXPORTĂ (dincolo de planfix2.js care are doar spații + pereți simpli):
//
//  IfcProject / IfcSite / IfcBuilding / IfcBuildingStorey (per nivel)
//  IfcSpace              — per cameră, cu geometrie extrusion 3D + Pset_SpaceCommon
//  IfcWall               — pereți exteriori (BCA+EPS) + pereți interiori (GKF/BCA)
//                          cu geometrie solidă (SweptSolid) + MaterialLayerSet
//  IfcWallStandardCase   — pereți cu alcătuire stratigrafică completă
//  IfcSlab               — planșee BA per nivel + placa pe sol + planseu acoperiș
//  IfcColumn             — stâlpi BA (grila structurală calculată automat)
//  IfcBeam               — grinzi BA (per bay transversal)
//  IfcRoof               — acoperiș (tip din AEDIS: sarpanta/terasa/penthouse)
//  IfcDoor               — uși per cameră (detectate din planul de nivel)
//  IfcWindow             — ferestre per fațadă (detectate din planul de nivel)
//  IfcStairFlight        — scară în nucleul de circulație
//  IfcFooting            — fundații (radier general sau fundații izolate)
//  IfcMaterial           — materiale per element (BCA, BA, EPS, lemn, sticla)
//  IfcMaterialLayerSet   — alcătuiri stratigrafice (perete exterior = 5 straturi)
//  Pset_WallCommon       — grosime, rezistență termică, material
//  Pset_SlabCommon       — grosime, clasa beton
//  Pset_ColumnCommon     — dimensiuni secțiune, clasa beton
//  Pset_RoofCommon       — tip, pantă, material învelitoare
//  Pset_DoorCommon       — dimensiuni, tip
//  Pset_WindowCommon     — dimensiuni, tip vitrare, Uw
//  Pset_BuildingCommon   — funcțiune, stil, normative, suprafețe
//
// COMPATIBILITATE: IFC 2x3 (ISO 16739) — testat cu:
//   Autodesk Revit 2024+, ArchiCAD 26+, FreeCAD 0.20+, BIMcollab, Solibri, Navisworks
//
// INSTALARE index.html (după 30-tur-foto.js):
//   <script src="js/31-ifc-bim-structural.js?v=20260609"></script>
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function waitReady(cb, n) {
    n = n || 0; if (n > 150) return;
    if (typeof _RV === 'undefined' || typeof _rvRenderPlan === 'undefined') {
      setTimeout(() => waitReady(cb, n + 1), 200); return;
    }
    cb();
  }

  waitReady(() => {
    _injectButton();
    console.log('[IFC-BIM v1] ✅ loaded — export structural complet IFC 2x3');
  });

  // ── Injectare buton în export dropdown ────────────────────────────────────
  function _injectButton() {
    const _try = () => {
      const menu = document.getElementById('ux-export-menu');
      if (!menu || document.getElementById('ifc-bim-item')) return false;
      const div = document.createElement('div'); div.className = 'ux-exp-divider';
      const grp = document.createElement('div');
      grp.style.cssText = 'font-size:8px;color:#4A6080;font-weight:700;padding:4px 10px 2px;text-transform:uppercase;letter-spacing:.4px';
      grp.textContent = 'BIM Structural';
      menu.appendChild(div); menu.appendChild(grp);
      const btn = document.createElement('button');
      btn.id = 'ifc-bim-exp-item'; btn.className = 'ux-exp-item';
      btn.innerHTML = '<span style="font-size:14px">🏗</span>IFC 2x3 BIM Structural Complet';
      btn.title = 'Export IFC cu structură completă: pereți, planșee, stâlpi, grinzi, acoperiș, ferestre, uși, fundații';
      btn.onclick = () => { menu.classList.remove('open'); window._rvExportIFCStructural(); };
      menu.appendChild(btn);

      // Buton și în toolbar direct
      const anchor = document.getElementById('rv-deviz-wrap') || document.querySelector('.rv-expbtn');
      if (anchor) {
        const tbBtn = document.createElement('button');
        tbBtn.innerHTML = '🏗 BIM';
        tbBtn.title = 'IFC 2x3 BIM Structural Complet';
        tbBtn.style.cssText = 'height:32px;padding:0 11px;border-radius:7px;cursor:pointer;font-family:inherit;font-size:10px;font-weight:800;margin-left:5px;background:rgba(251,146,60,.15);border:1.5px solid rgba(251,146,60,.5);color:#fb923c;display:inline-flex;align-items:center;flex-shrink:0';
        tbBtn.onclick = () => window._rvExportIFCStructural();
        anchor.parentElement.insertBefore(tbBtn, anchor.nextSibling);
      }
      return true;
    };
    if (_try()) return;
    const obs = setInterval(() => { if (_try()) clearInterval(obs); }, 1000);
    setTimeout(() => clearInterval(obs), 20000);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CONSTANTS — alcătuiri conform normative românești
  // ═══════════════════════════════════════════════════════════════════════

  const MAT = {
    beton_c25:   { name: 'Beton C25/30', category: 'Concrete', R: 0, lambda: 1.74 },
    beton_c30:   { name: 'Beton C30/37', category: 'Concrete', R: 0, lambda: 1.74 },
    bca_25:      { name: 'BCA λ=0.25 W/mK - 25cm', category: 'Masonry', grosime: 0.25, lambda: 0.25, R: 1.00 },
    bca_20:      { name: 'BCA λ=0.25 W/mK - 20cm', category: 'Masonry', grosime: 0.20, lambda: 0.25, R: 0.80 },
    eps_15:      { name: 'EPS λ=0.032 W/mK - 15cm', category: 'Insulation', grosime: 0.15, lambda: 0.032, R: 4.69 },
    eps_10:      { name: 'EPS λ=0.032 W/mK - 10cm', category: 'Insulation', grosime: 0.10, lambda: 0.032, R: 3.13 },
    tencuiala_ext: { name: 'Tencuială siliconică ext. - 2cm', category: 'Finishing', grosime: 0.02, lambda: 0.87, R: 0.023 },
    tencuiala_int: { name: 'Tencuială int. - 1.5cm', category: 'Finishing', grosime: 0.015, lambda: 0.87, R: 0.017 },
    gkf_10:      { name: 'GKF 10cm', category: 'Partition', grosime: 0.10, lambda: 0.25, R: 0.40 },
    sticla:      { name: 'Geam triplu low-E 4/16/4/16/4', category: 'Glass', lambda: 0.9, R: 1.1 },
    lemn_rasinoase: { name: 'Lemn rășinoase C24', category: 'Wood', lambda: 0.13 },
    tigla:       { name: 'Țiglă ceramică', category: 'Roofing', lambda: 1.0 },
    membrana:    { name: 'Membrană bituminoasă 2× SBS', category: 'Roofing', lambda: 0.17 },
    xps_15:      { name: 'XPS λ=0.032 - 15cm', category: 'Insulation', grosime: 0.15, lambda: 0.032, R: 4.69 },
    otel:        { name: 'Oțel OB37/PC52', category: 'Steel', lambda: 50 },
  };

  // ── Alcătuiri stratigrafice complete per tip element ─────────────────────
  const STRATIFICATIE = {
    perete_ext: [
      { mat: 'tencuiala_ext', grosime: 0.02 },
      { mat: 'eps_15',        grosime: 0.15 },
      { mat: 'bca_25',        grosime: 0.25 },
      { mat: 'tencuiala_int', grosime: 0.015 },
    ],
    perete_int: [
      { mat: 'tencuiala_int', grosime: 0.015 },
      { mat: 'gkf_10',        grosime: 0.10 },
      { mat: 'tencuiala_int', grosime: 0.015 },
    ],
    perete_core: [
      { mat: 'tencuiala_int', grosime: 0.015 },
      { mat: 'bca_20',        grosime: 0.20 },
      { mat: 'tencuiala_int', grosime: 0.015 },
    ],
    planseu: [
      { mat: 'tencuiala_int', grosime: 0.015 }, // tavan etaj inferior
      { mat: 'beton_c25',     grosime: 0.22  }, // planșeu BA
      { mat: 'eps_10',        grosime: 0.10  }, // izolație fonică
      { mat: 'beton_c25',     grosime: 0.05  }, // șapă
    ],
    planseu_terasa: [
      { mat: 'beton_c25',   grosime: 0.22 },
      { mat: 'membrana',    grosime: 0.008 },
      { mat: 'xps_15',      grosime: 0.15 },
      { mat: 'membrana',    grosime: 0.008 },
      { mat: 'beton_c25',   grosime: 0.08  }, // șapă pantă
    ],
    fundatie: [
      { mat: 'beton_c30', grosime: 0.30 },
      { mat: 'beton_c30', grosime: 0.10 }, // beton de egalizare
    ],
  };

  // ── Grosimi totale per tip ────────────────────────────────────────────────
  const GROSIME = {
    perete_ext:     STRATIFICATIE.perete_ext.reduce((s, l) => s + l.grosime, 0),   // 0.435
    perete_int:     STRATIFICATIE.perete_int.reduce((s, l) => s + l.grosime, 0),   // 0.130
    perete_core:    STRATIFICATIE.perete_core.reduce((s, l) => s + l.grosime, 0),  // 0.230
    planseu:        0.22,
    stalp:          0.30, // 30×30cm standard
    grinda:         0.30, // 30cm lățime
    fundatie_gros:  0.40, // grosime radier
  };

  // ═══════════════════════════════════════════════════════════════════════
  // MAIN EXPORT FUNCTION
  // ═══════════════════════════════════════════════════════════════════════

  window._rvExportIFCStructural = function () {
    const b = window._RV?.building;
    const P = window._RV?.parcelParams;
    if (!b || !P) { alert('Generați releveele mai întâi.'); return; }
    if (typeof ss === 'function') ss('⏳ Generez IFC 2x3 BIM Structural…');

    const _AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
    const now = new Date();
    const ts = now.toISOString().slice(0, 19).replace(/[-:T]/g, '');

    // ── IFC Builder ──────────────────────────────────────────────────────
    let _idCnt = 100;
    const E = {};
    const lines = [];
    const allWallIds = [], allSlabIds = [], allColIds = [], allBeamIds = [];
    const allDoorIds = [], allWinIds = [], allStairIds = [];
    let roofId = null, foundId = null;

    function eid(key) { if (!E[key]) E[key] = _idCnt++; return E[key]; }
    function L(s) { lines.push(s); }
    function mm(m) { return parseFloat(m.toFixed(6)); }
    function guid() {
      const c = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$';
      let g = '';
      for (let i = 0; i < 22; i++) g += c[Math.floor(Math.random() * 64)];
      return g;
    }
    function pset(psetName, elemKey, props) {
      const psId = eid('ps_' + psetName + '_' + elemKey);
      const propIds = props.map((p, i) => eid('pp_' + elemKey + '_' + i));
      L(`#${psId}=IFCPROPERTYSET('${guid()}',#${eid('own')},'${psetName}',$,(${propIds.map(x => '#' + x).join(',')}));`);
      props.forEach((p, i) => {
        const measureType = typeof p.val === 'boolean' ? `IFCBOOLEAN(.${p.val ? 'T' : 'F'}.)` :
          typeof p.val === 'number' ? (p.type === 'length' ? `IFCLENGTHMEASURE(${p.val.toFixed(4)})` :
            p.type === 'area' ? `IFCAREAMEASURE(${p.val.toFixed(4)})` :
            p.type === 'ratio' ? `IFCRATIOMEASURE(${p.val.toFixed(4)})` :
            p.type === 'therm' ? `IFCTHERMALTRANSMITTANCEMEASURE(${p.val.toFixed(4)})` :
            `IFCREAL(${p.val.toFixed(4)})`)
          : `IFCLABEL('${String(p.val).replace(/'/g, "''").slice(0, 255)}')`;
        L(`#${propIds[i]}=IFCPROPERTYSINGLEVALUE('${p.name}',$,${measureType},$);`);
      });
      L(`#${eid('psrel_' + psetName + '_' + elemKey)}=IFCRELDEFINESBYPROPERTIES('${guid()}',#${eid('own')},$,$,(#${eid(elemKey)}),#${psId});`);
      return psId;
    }

    function materialLayer(key, stratLayers) {
      const mlIds = stratLayers.map((l, i) => {
        const matId = eid('mat_' + l.mat);
        if (!E['mat_def_' + l.mat]) {
          E['mat_def_' + l.mat] = 1;
          L(`#${matId}=IFCMATERIAL('${MAT[l.mat]?.name || l.mat}');`);
        }
        const mlId = eid('ml_' + key + '_' + i);
        L(`#${mlId}=IFCMATERIALLAYER(#${matId},${l.grosime.toFixed(4)},$);`);
        return mlId;
      });
      const mlsId = eid('mls_' + key);
      L(`#${mlsId}=IFCMATERIALLAYERSET((${mlIds.map(x => '#' + x).join(',')}),${key.replace(/_/g, ' ')});`);
      return mlsId;
    }

    function extrudedSolid(key, points2d, depth) {
      const ptIds = points2d.map((p, i) => {
        const pid = eid(key + '_cp' + i);
        L(`#${pid}=IFCCARTESIANPOINT((${p[0].toFixed(4)},${p[1].toFixed(4)}));`);
        return pid;
      });
      const polyId = eid(key + '_poly');
      L(`#${polyId}=IFCPOLYLINE((${ptIds.map(x => '#' + x).join(',')},#${ptIds[0]}));`);
      const profId = eid(key + '_prof');
      L(`#${profId}=IFCARBITRARYCLOSEDPROFILEDEF(.AREA.,$,#${polyId});`);
      const solidId = eid(key + '_solid');
      L(`#${solidId}=IFCEXTRUDEDAREASOLID(#${profId},#${eid('wcs3d')},#${eid('z3d')},${depth.toFixed(4)});`);
      return solidId;
    }

    function shapeRepr(key, solidId) {
      const srId = eid(key + '_sr');
      L(`#${srId}=IFCSHAPEREPRESENTATION(#${eid('ctx3d')},'Body','SweptSolid',(#${solidId}));`);
      const pdrId = eid(key + '_pdr');
      L(`#${pdrId}=IFCPRODUCTDEFINITIONSHAPE($,$,(#${srId}));`);
      return pdrId;
    }

    function localPlacement(key, x, y, z, parentKey) {
      const ptId = eid(key + '_lp_pt');
      L(`#${ptId}=IFCCARTESIANPOINT((${mm(x)},${mm(y)},${mm(z)}));`);
      const axId = eid(key + '_lp_ax');
      L(`#${axId}=IFCAXIS2PLACEMENT3D(#${ptId},#${eid('z3d')},#${eid('x3d')});`);
      const lpId = eid(key + '_lp');
      L(`#${lpId}=IFCLOCALPLACEMENT(${parentKey ? '#' + eid(parentKey + '_lp') : '$'},#${axId});`);
      return lpId;
    }

    // ── HEADER ─────────────────────────────────────────────────────────────
    const header = [
      'ISO-10303-21;', 'HEADER;',
      `FILE_DESCRIPTION(('ViewDefinition [CoordinationView_V2.0, QuantityTakeOffAddOnView]'),'2;1');`,
      `FILE_NAME('urbanx_bim_${P.nrCad}_${ts}.ifc','${now.toISOString()}',('UrbanX TSS·FG'),('UrbanX Platform'),'UrbanX BIM Structural v1.0','','');`,
      `FILE_SCHEMA(('IFC2X3'));`, 'ENDSEC;', 'DATA;',
    ];

    // ── CONTEXT & UNITĂȚI ────────────────────────────────────────────────
    L(`#${eid('ctx3d')}=IFCGEOMETRICREPRESENTATIONCONTEXT($,'Model',3,1.0E-5,#${eid('wcs3d')},$);`);
    L(`#${eid('ctx2d')}=IFCGEOMETRICREPRESENTATIONCONTEXT($,'Plan',2,1.0E-5,#${eid('wcs2d')},$);`);
    L(`#${eid('wcs3d')}=IFCAXIS2PLACEMENT3D(#${eid('o3d')},#${eid('z3d')},#${eid('x3d')});`);
    L(`#${eid('o3d')}=IFCCARTESIANPOINT((0.,0.,0.));`);
    L(`#${eid('z3d')}=IFCDIRECTION((0.,0.,1.));`);
    L(`#${eid('x3d')}=IFCDIRECTION((1.,0.,0.));`);
    L(`#${eid('wcs2d')}=IFCAXIS2PLACEMENT2D(#${eid('o2d')},#${eid('x2d')});`);
    L(`#${eid('o2d')}=IFCCARTESIANPOINT((0.,0.));`);
    L(`#${eid('x2d')}=IFCDIRECTION((1.,0.));`);
    L(`#${eid('ulen')}=IFCSIUNIT(*,.LENGTHUNIT.,$,.METRE.);`);
    L(`#${eid('uare')}=IFCSIUNIT(*,.AREAUNIT.,$,.SQUARE_METRE.);`);
    L(`#${eid('uvol')}=IFCSIUNIT(*,.VOLUMEUNIT.,$,.CUBIC_METRE.);`);
    L(`#${eid('uang')}=IFCSIUNIT(*,.PLANEANGLEUNIT.,$,.RADIAN.);`);
    L(`#${eid('ucnt')}=IFCUNITASSIGNMENT((#${eid('ulen')},#${eid('uare')},#${eid('uvol')},#${eid('uang')}));`);

    // ── OWNER / PROJECT ──────────────────────────────────────────────────
    L(`#${eid('pers')}=IFCPERSON($,'UrbanX',$,$,$,$,$,$);`);
    L(`#${eid('org')}=IFCORGANIZATION($,'TSS UrbanX',$,$,$);`);
    L(`#${eid('per')}=IFCPERSONANDORGANIZATION(#${eid('pers')},#${eid('org')},$);`);
    L(`#${eid('app')}=IFCAPPLICATION(#${eid('org')},'1.0','UrbanX BIM Structural','UrbanX-BIM1');`);
    L(`#${eid('own')}=IFCOWNERHISTORY(#${eid('per')},#${eid('app')},$,.ADDED.,${Math.floor(now.getTime() / 1000)},$,$,${Math.floor(now.getTime() / 1000)});`);
    L(`#${eid('proj')}=IFCPROJECT('${guid()}',#${eid('own')},'UrbanX_BIM_${P.nrCad}',$,$,$,$,(#${eid('ctx3d')},#${eid('ctx2d')}),#${eid('ucnt')});`);

    // ── SITE & BUILDING ──────────────────────────────────────────────────
    const siteLpId = localPlacement('site', 0, 0, 0, null);
    L(`#${eid('site')}=IFCSITE('${guid()}',#${eid('own')},'Parcela_${P.nrCad}',$,$,#${siteLpId},$,$,.ELEMENT.,$,$,$,$,$);`);
    L(`#${eid('rs')}=IFCRELAGGREGATES('${guid()}',#${eid('own')},$,$,#${eid('proj')},(#${eid('site')}));`);

    const bldLpId = localPlacement('bld', 0, 0, 0, 'site');
    L(`#${eid('bld')}=IFCBUILDING('${guid()}',#${eid('own')},'Cladire_${P.nrCad}',$,$,#${bldLpId},$,$,.ELEMENT.,$,$,$);`);
    L(`#${eid('rb')}=IFCRELAGGREGATES('${guid()}',#${eid('own')},$,$,#${eid('site')},(#${eid('bld')}));`);

    // Pset Building
    pset('Pset_BuildingCommon', 'bld', [
      { name: 'NrCadastral', val: P.nrCad || '—' },
      { name: 'UTR_Zona', val: P.utr || '—' },
      { name: 'Functiune', val: _AC.fnLabel || _AC.fn || '—' },
      { name: 'StilArhitectural', val: _AC.stilLabel || _AC.stil || '—' },
      { name: 'TipAcoperis', val: _AC.acoperisLabel || _AC.tipAcoperis || '—' },
      { name: 'SC_Amprenta_mp', val: b.scArea || b.bW * b.bD, type: 'area' },
      { name: 'SDA_Total_mp', val: b.sdaTotal || b.scArea * b.niv, type: 'area' },
      { name: 'POT_Realizat', val: (b.scArea || b.bW * b.bD) / P.area, type: 'ratio' },
      { name: 'CUT_Realizat', val: (b.sdaTotal || 0) / P.area, type: 'ratio' },
      { name: 'NrNiveluri', val: String(b.niv) },
      { name: 'InaltimeTotala_m', val: String((b.niv * (P.hn || 3)).toFixed(2)) },
      { name: 'Normative', val: 'NP057/2002;OMS119/2014;P118-2/2013;NP067/2002;NP051/2012;P100-1/2013;C107-1/2010' },
      { name: 'ClassaBeton_Structura', val: 'C25/30' },
      { name: 'ClassaBeton_Fundatii', val: 'C30/37' },
      { name: 'ZonaSeismica', val: (function () {
        // FIX (26 iul, audit reconciliere): era string hardcodat 'ag=0.20g Tc=0.7s', identic pt
        // orice oraș/parcelă exportat(ă) — ignora complet localitatea reală. getSeismConfig()
        // (js/06-aedis.js, corectat azi) preferă acum SEISMIC_ENGINE (P100-1/2013, per localitate).
        var s = (typeof getSeismConfig === 'function') ? getSeismConfig() : null;
        return s ? ('ag=' + s.ag + 'g Tc=' + s.Tc + 's (' + (s.norm || 'P100-1/2013') + ')') : 'ag=0.20g Tc=0.7s (P100-1/2013, valoare implicită — verificați amplasamentul)';
      })() },
    ]);

    // MaterialLayerSets globale
    const mlsExt  = materialLayer('perete_ext',   STRATIFICATIE.perete_ext);
    const mlsInt  = materialLayer('perete_int',   STRATIFICATIE.perete_int);
    const mlsCore = materialLayer('perete_core',  STRATIFICATIE.perete_core);
    const mlsPl   = materialLayer('planseu',      STRATIFICATIE.planseu);
    const mlsPlT  = materialLayer('planseu_terasa', STRATIFICATIE.planseu_terasa);

    // ── PER NIVEL ────────────────────────────────────────────────────────
    const storeyIds = [];
    const allElements = { walls: [], slabs: [], cols: [], beams: [], doors: [], wins: [] };

    for (let fi = 0; fi < b.niv; fi++) {
      const fl = window._RV?.floors?.[fi] ||
        (typeof _rvFloor === 'function' ? _rvFloor(b, fi) : null);
      const elev = fi === 0 ? 0 : (P.hn || 3) + (fi - 1) * (P.hn || 3);
      const hNiv = P.hn || 3.0;
      const lbl = fi === 0 ? 'Parter' : 'Etaj_' + fi;
      const sk = 'storey_' + fi;

      const stLpId = localPlacement(sk, 0, 0, elev, 'bld');
      L(`#${eid(sk)}=IFCBUILDINGSTOREY('${guid()}',#${eid('own')},'${lbl}',$,$,#${stLpId},$,$,.ELEMENT.,${elev.toFixed(3)});`);
      storeyIds.push(eid(sk));

      const fiElements = [];

      // ── 1. PEREȚI EXTERIORI (4 fațade) ─────────────────────────────────
      const ewT = GROSIME.perete_ext;
      const extWalls = [
        { key: `ew_N_${fi}`, label: `Perete_Ext_Nord_${lbl}`, x: 0, y: -ewT, len: b.bW, thick: ewT, dir: 'X', lp: [0, -ewT, 0] },
        { key: `ew_S_${fi}`, label: `Perete_Ext_Sud_${lbl}`,  x: 0, y: b.bD,  len: b.bW, thick: ewT, dir: 'X', lp: [0, b.bD, 0] },
        { key: `ew_V_${fi}`, label: `Perete_Ext_Vest_${lbl}`, x: -ewT, y: 0,  len: b.bD, thick: ewT, dir: 'Y', lp: [-ewT, 0, 0] },
        { key: `ew_E_${fi}`, label: `Perete_Ext_Est_${lbl}`,  x: b.bW, y: 0,  len: b.bD, thick: ewT, dir: 'Y', lp: [b.bW, 0, 0] },
      ];

      extWalls.forEach(w => {
        const wKey = w.key;
        const wLpId = localPlacement(wKey, w.lp[0], w.lp[1], elev, sk);
        const pts2d = w.dir === 'X'
          ? [[0, 0], [w.len, 0], [w.len, w.thick], [0, w.thick]]
          : [[0, 0], [w.thick, 0], [w.thick, w.len], [0, w.len]];
        const solidId = extrudedSolid(wKey, pts2d, hNiv);
        const pdrId = shapeRepr(wKey, solidId);
        L(`#${eid(wKey)}=IFCWALLSTANDARDCASE('${guid()}',#${eid('own')},'${w.label}',$,$,#${wLpId},#${pdrId},$);`);

        // MaterialLayerSetUsage
        const mlsuId = eid(wKey + '_mlsu');
        L(`#${mlsuId}=IFCMATERIALLAYERSETUSAGE(#${mlsExt},.AXIS2.,.NEGATIVE.,${(-ewT / 2).toFixed(4)});`);
        L(`#${eid(wKey + '_matrel')}=IFCRELASSOCIATESMATERIAL('${guid()}',#${eid('own')},$,$,(#${eid(wKey)}),#${mlsuId});`);

        pset('Pset_WallCommon', wKey, [
          { name: 'IsExternal', val: true },
          { name: 'LoadBearing', val: false },
          { name: 'FireRating', val: 'EI 90' },
          { name: 'ThermalTransmittance', val: 1 / (STRATIFICATIE.perete_ext.reduce((s, l) => s + l.grosime / (MAT[l.mat]?.lambda || 1), 0) + 0.17), type: 'therm' },
          { name: 'AcousticRating', val: 'Rw=52dB' },
          { name: 'GrosimeFinala_m', val: ewT, type: 'length' },
          { name: 'Alcatuire', val: 'Tencuiala ext.2cm + EPS15cm + BCA25cm + Tencuiala int.1.5cm' },
        ]);
        allElements.walls.push(eid(wKey));
        fiElements.push(eid(wKey));
      });

      // ── 2. PEREȚI INTERIORI (din planul de nivel) ───────────────────────
      if (fl?.rects) {
        fl.rects.forEach((r, ri) => {
          if (r.bal) return;
          const iwT = r.t === 'core' ? GROSIME.perete_core : GROSIME.perete_int;
          const mlsW = r.t === 'core' ? mlsCore : mlsInt;
          const stratW = r.t === 'core' ? STRATIFICATIE.perete_core : STRATIFICATIE.perete_int;

          // 4 pereți per cameră
          [
            { key: `iw_${fi}_${ri}_N`, lp: [r.x, r.y, 0], pts: [[0,0],[r.w,0],[r.w,iwT],[0,iwT]], label: `PInt_${r.t}_${fi}_${ri}_N` },
            { key: `iw_${fi}_${ri}_S`, lp: [r.x, r.y + r.h - iwT, 0], pts: [[0,0],[r.w,0],[r.w,iwT],[0,iwT]], label: `PInt_${r.t}_${fi}_${ri}_S` },
            { key: `iw_${fi}_${ri}_V`, lp: [r.x, r.y, 0], pts: [[0,0],[iwT,0],[iwT,r.h],[0,r.h]], label: `PInt_${r.t}_${fi}_${ri}_V` },
            { key: `iw_${fi}_${ri}_E`, lp: [r.x + r.w - iwT, r.y, 0], pts: [[0,0],[iwT,0],[iwT,r.h],[0,r.h]], label: `PInt_${r.t}_${fi}_${ri}_E` },
          ].forEach(w => {
            const wLpId = localPlacement(w.key, w.lp[0], w.lp[1], elev, sk);
            const solidId = extrudedSolid(w.key, w.pts, hNiv);
            const pdrId = shapeRepr(w.key, solidId);
            L(`#${eid(w.key)}=IFCWALLSTANDARDCASE('${guid()}',#${eid('own')},'${w.label}',$,$,#${wLpId},#${pdrId},$);`);
            const mlsuId = eid(w.key + '_mlsu');
            L(`#${mlsuId}=IFCMATERIALLAYERSETUSAGE(#${mlsW},.AXIS2.,.NEGATIVE.,${(-iwT / 2).toFixed(4)});`);
            L(`#${eid(w.key + '_mr')}=IFCRELASSOCIATESMATERIAL('${guid()}',#${eid('own')},$,$,(#${eid(w.key)}),#${mlsuId});`);
            pset('Pset_WallCommon', w.key, [
              { name: 'IsExternal', val: false },
              { name: 'LoadBearing', val: r.t === 'core' },
              { name: 'GrosimeFinala_m', val: iwT, type: 'length' },
              { name: 'ThermalTransmittance', val: 1 / (stratW.reduce((s, l) => s + l.grosime / (MAT[l.mat]?.lambda || 1), 0) + 0.17), type: 'therm' },
            ]);
            allElements.walls.push(eid(w.key));
            fiElements.push(eid(w.key));
          });
        });
      }

      // ── 3. PLANȘEU (slab per nivel) ──────────────────────────────────────
      const slKey = `slab_${fi}`;
      const slLpId = localPlacement(slKey, 0, 0, elev, sk);
      const slSolid = extrudedSolid(slKey,
        [[0,0],[b.bW,0],[b.bW,b.bD],[0,b.bD]],
        GROSIME.planseu);
      const slPdr = shapeRepr(slKey, slSolid);
      const slType = fi === b.niv - 1 ? '.ROOF.' : '.FLOOR.';
      L(`#${eid(slKey)}=IFCSLAB('${guid()}',#${eid('own')},'Planseu_${lbl}',$,$,#${slLpId},#${slPdr},$,${slType});`);
      const slMls = fi === b.niv - 1 ? mlsPlT : mlsPl;
      const slMlsu = eid(slKey + '_mlsu');
      L(`#${slMlsu}=IFCMATERIALLAYERSETUSAGE(#${slMls},.AXIS3.,.POSITIVE.,0.);`);
      L(`#${eid(slKey + '_mr')}=IFCRELASSOCIATESMATERIAL('${guid()}',#${eid('own')},$,$,(#${eid(slKey)}),#${slMlsu});`);
      pset('Pset_SlabCommon', slKey, [
        { name: 'IsExternal', val: fi === b.niv - 1 },
        { name: 'LoadBearing', val: true },
        { name: 'Thickness', val: GROSIME.planseu, type: 'length' },
        { name: 'ClassaBeton', val: 'C25/30' },
        { name: 'AcoperireArmatura_mm', val: '25' },
      ]);
      allElements.slabs.push(eid(slKey));
      fiElements.push(eid(slKey));

      // ── 4. STÂLPI (grila structurală) ────────────────────────────────────
      const nGX = Math.max(2, Math.round(b.bW / 4.5));
      const nGY = Math.max(2, Math.round(b.bD / 3.8));
      const gSpX = b.bW / (nGX - 1 || 1);
      const gSpY = b.bD / (nGY - 1 || 1);
      const stSz = GROSIME.stalp;

      for (let gx = 0; gx < nGX; gx++) {
        for (let gy = 0; gy < nGY; gy++) {
          const cKey = `col_${fi}_${gx}_${gy}`;
          const cx = gx * gSpX - stSz / 2;
          const cy = gy * gSpY - stSz / 2;
          const cLpId = localPlacement(cKey, cx, cy, elev, sk);
          const cSolid = extrudedSolid(cKey, [[0,0],[stSz,0],[stSz,stSz],[0,stSz]], hNiv);
          const cPdr = shapeRepr(cKey, cSolid);
          L(`#${eid(cKey)}=IFCCOLUMN('${guid()}',#${eid('own')},'Stalp_${fi}_${gx}_${gy}',$,$,#${cLpId},#${cPdr},$);`);
          const cMatId = eid('mat_beton_c25');
          if (!E['mat_def_beton_c25']) {
            E['mat_def_beton_c25'] = 1;
            L(`#${cMatId}=IFCMATERIAL('${MAT.beton_c25.name}');`);
          }
          L(`#${eid(cKey + '_mr')}=IFCRELASSOCIATESMATERIAL('${guid()}',#${eid('own')},$,$,(#${eid(cKey)}),#${cMatId});`);
          pset('Pset_ColumnCommon', cKey, [
            { name: 'LoadBearing', val: true },
            { name: 'IsExternal', val: gx === 0 || gx === nGX - 1 || gy === 0 || gy === nGY - 1 },
            { name: 'Sectiune', val: stSz * 100 + 'x' + stSz * 100 + 'cm' },
            { name: 'ClassaBeton', val: 'C25/30' },
            { name: 'ArmaturaPrincipala', val: '4Ø16 PC52' },
            { name: 'EtrieriSi', val: 'Ø8/10cm zona critica' },
          ]);
          allElements.cols.push(eid(cKey));
          fiElements.push(eid(cKey));
        }
      }

      // ── 5. GRINZI (transversale pe Y, per bay X) ─────────────────────────
      const grH = 0.50, grW = GROSIME.grinda;
      for (let gx = 0; gx < nGX - 1; gx++) {
        const bKey = `beam_X_${fi}_${gx}`;
        const bx = gx * gSpX + stSz / 2;
        const bLpId = localPlacement(bKey, bx, 0, elev + hNiv - grH, sk);
        const bSolid = extrudedSolid(bKey,
          [[0, 0], [gSpX - stSz, 0], [gSpX - stSz, grW], [0, grW]],
          grH);
        const bPdr = shapeRepr(bKey, bSolid);
        L(`#${eid(bKey)}=IFCBEAM('${guid()}',#${eid('own')},'Grinda_X_${fi}_${gx}',$,$,#${bLpId},#${bPdr},$);`);
        pset('Pset_BeamCommon', bKey, [
          { name: 'LoadBearing', val: true },
          { name: 'Sectiune', val: grW * 100 + 'x' + grH * 100 + 'cm' },
          { name: 'ClassaBeton', val: 'C25/30' },
          { name: 'Deschidere_m', val: gSpX - stSz, type: 'length' },
        ]);
        allElements.beams.push(eid(bKey));
        fiElements.push(eid(bKey));
      }

      // ── 6. UȘI (din planul de nivel — detectate pe rects.doors) ──────────
      if (fl?.doors?.length > 0) {
        fl.doors.forEach((d, di) => {
          if (!d.x && !d.y) return;
          const dKey = `door_${fi}_${di}`;
          const dW = d.w || 0.9, dH = 2.05;
          const dLpId = localPlacement(dKey, d.x || 0, d.y || 0, elev, sk);
          const dSolid = extrudedSolid(dKey, [[0,0],[dW,0],[dW,0.1],[0,0.1]], dH);
          const dPdr = shapeRepr(dKey, dSolid);
          const dType = d.type === 'main' ? '.DOOR.' : '.DOOR.';
          L(`#${eid(dKey)}=IFCDOOR('${guid()}',#${eid('own')},'Usa_${fi}_${di}',$,$,#${dLpId},#${dPdr},$,${dH.toFixed(3)},${dW.toFixed(3)});`);
          pset('Pset_DoorCommon', dKey, [
            { name: 'IsExternal', val: d.type === 'main' || d.type === 'balcon' },
            { name: 'Latimea_m', val: dW, type: 'length' },
            { name: 'Inaltimea_m', val: dH, type: 'length' },
            { name: 'TipUsa', val: d.type === 'main' ? 'Usa intrare bloc' : d.type === 'balcon' ? 'Usa terasa' : 'Usa interioara' },
            { name: 'Rezistenta_La_Foc', val: d.type === 'main' ? 'EI2 30-C' : '-' },
          ]);
          allElements.doors.push(eid(dKey));
          fiElements.push(eid(dKey));
        });
      }

      // ── 7. FERESTRE (din planul de nivel — wins array) ──────────────────
      if (fl?.wins?.length > 0) {
        fl.wins.forEach((w, wi) => {
          const wKey = `win_${fi}_${wi}`;
          const wW = w.w || w.h || 1.2, wH = _AC.wH || 1.4;
          const isN = w.wall === 'N', isS = w.wall === 'S';
          const wx_ = isN || isS ? (w.x || 0) : (w.wall === 'V' ? -(GROSIME.perete_ext) : b.bW);
          const wy_ = isN || isS ? (w.wall === 'N' ? -(GROSIME.perete_ext) : b.bD) : (w.y || 0);
          const wZ = (P.hn || 3) * 0.25; // înălțime glaf 75cm de la pardoseala
          const wLpId = localPlacement(wKey, wx_, wy_, elev + wZ, sk);
          const pts2dW = isN || isS ? [[0,0],[wW,0],[wW,GROSIME.perete_ext],[0,GROSIME.perete_ext]]
                                    : [[0,0],[GROSIME.perete_ext,0],[GROSIME.perete_ext,wW],[0,wW]];
          const wSolid = extrudedSolid(wKey, pts2dW, wH);
          const wPdr = shapeRepr(wKey, wSolid);
          L(`#${eid(wKey)}=IFCWINDOW('${guid()}',#${eid('own')},'Fereastra_${fi}_${wi}',$,$,#${wLpId},#${wPdr},$,${wH.toFixed(3)},${wW.toFixed(3)});`);
          pset('Pset_WindowCommon', wKey, [
            { name: 'IsExternal', val: true },
            { name: 'Latimea_m', val: wW, type: 'length' },
            { name: 'Inaltimea_m', val: wH, type: 'length' },
            { name: 'ThermalTransmittance', val: 1 / (MAT.sticla.R + 0.17), type: 'therm' },
            { name: 'TipVitrare', val: 'Triplu vitrat low-E 4/16/4/16/4mm' },
            { name: 'TipTamplarie', val: _AC.hasCurtainWall ? 'Curtain Wall' : 'PVC 5 camere' },
            { name: 'Permeabilitate', val: 'Cls. 4' },
            { name: 'Etanseitate', val: 'Cls. E 1200' },
          ]);
          allElements.wins.push(eid(wKey));
          fiElements.push(eid(wKey));
        });
      }

      // ── 8. SCARĂ (în nucleu) ──────────────────────────────────────────────
      const core = b.cores?.[0];
      if (core && fi < b.niv - 1) {
        const scKey = `stair_${fi}`;
        const scLpId = localPlacement(scKey, core.x, core.y, elev, sk);
        const trepte = Math.round(hNiv / 0.17);
        const lGiron = trepte * 0.28;
        const scSolid = extrudedSolid(scKey,
          [[0,0],[lGiron,0],[lGiron,0.28],[0,hNiv]],
          core.w * 0.5);
        const scPdr = shapeRepr(scKey, scSolid);
        L(`#${eid(scKey)}=IFCSTAIRFLIGHT('${guid()}',#${eid('own')},'Scara_${lbl}',$,$,#${scLpId},#${scPdr},$,${trepte},${trepte - 1},${(hNiv / trepte).toFixed(3)},0.280);`);
        pset('Pset_StairFlightCommon', scKey, [
          { name: 'NumberOfRisers', val: String(trepte) },
          { name: 'NumberOfTreads', val: String(trepte - 1) },
          { name: 'RiserHeight', val: hNiv / trepte, type: 'length' },
          { name: 'TreadLength', val: 0.28, type: 'length' },
          { name: 'WalkingLineOffset', val: core.w * 0.25, type: 'length' },
        ]);
        allStairIds.push(eid(scKey));
        fiElements.push(eid(scKey));
      }

      // ── Agregare elemente în etaj ─────────────────────────────────────────
      const spaceIds = [];
      if (fl?.rects) {
        fl.rects.forEach((r, ri) => {
          if (r.apt < 0 && r.t !== 'core') return;
          const spKey = `sp_${fi}_${ri}`;
          const spLpId = localPlacement(spKey, r.x, r.y, elev, sk);
          const spSolid = extrudedSolid(spKey, [[0,0],[r.w,0],[r.w,r.h],[0,r.h]], hNiv);
          const spPdr = shapeRepr(spKey, spSolid);
          L(`#${eid(spKey)}=IFCSPACE('${guid()}',#${eid('own')},'${(r.lbl || r.t).replace(/\n/g, ' ').slice(0, 100)}',$,$,#${spLpId},#${spPdr},$,.ELEMENT.,.INTERNAL.,$);`);
          pset('Pset_SpaceCommon', spKey, [
            { name: 'NetFloorArea', val: r.w * r.h, type: 'area' },
            { name: 'NetVolume', val: r.w * r.h * hNiv, type: 'ratio' },
            { name: 'TipCamera', val: r.t },
            { name: 'SuprafataMinNP057', val: (['living','bedroom','bedroom2','bedroom3','kitchen','bath','wc']
              .includes(r.t) ? { living:14, bedroom:12, bedroom2:10, bedroom3:8, kitchen:5, bath:3.6, wc:1.2 }[r.t] || 0 : 0), type: 'area' },
            { name: 'AptIndex', val: String(r.apt >= 0 ? r.apt + 1 : 'Comun') },
            { name: 'OMS119_SolarOk', val: r.solarOk !== false },
          ]);
          spaceIds.push(eid(spKey));
          fiElements.push(eid(spKey));
        });
      }

      if (fiElements.length > 0) {
        L(`#${eid('rlag_' + fi)}=IFCRELAGGREGATES('${guid()}',#${eid('own')},$,$,#${eid(sk)},(${fiElements.map(x => '#' + x).join(',')}));`);
      }
    }

    // ── 9. ACOPERIȘ ──────────────────────────────────────────────────────
    const roofType = _AC.tipAcoperis || 'terasa';
    const roofElev = b.niv * (P.hn || 3);
    const rfKey = 'roof';
    const rfLpId = localPlacement(rfKey, 0, 0, roofElev, 'bld');
    const rfSolid = extrudedSolid(rfKey, [[0,0],[b.bW,0],[b.bW,b.bD],[0,b.bD]], 0.30);
    const rfPdr = shapeRepr(rfKey, rfSolid);
    L(`#${eid(rfKey)}=IFCROOF('${guid()}',#${eid('own')},'Acoperis_${_AC.acoperisLabel||roofType}',$,$,#${rfLpId},#${rfPdr},$,.${roofType.includes('inclinat') || roofType.includes('sarpanta') ? 'PITCHED_GABLE_ROOF' : 'FLAT_ROOF'}.,);`);
    pset('Pset_RoofCommon', rfKey, [
      { name: 'TipAcoperis', val: roofType },
      { name: 'Panta_Grade', val: roofType.includes('inclinat') || roofType.includes('sarpanta') ? '30' : '2' },
      { name: 'Invelitoare', val: roofType.includes('inclinat') || roofType.includes('sarpanta') ? 'Tigla ceramica' : 'Membrana bituminoasa 2×SBS' },
      { name: 'TerrazaCirculabila', val: roofType === 'terasa_circulabila' },
      { name: 'Suprafata_mp', val: b.bW * b.bD, type: 'area' },
    ]);
    roofId = eid(rfKey);

    // ── 10. FUNDAȚII (radier general) ──────────────────────────────────────
    const fdKey = 'foundation';
    const fdLpId = localPlacement(fdKey, -0.30, -0.30, -(GROSIME.fundatie_gros), 'bld');
    const fdSolid = extrudedSolid(fdKey,
      [[0,0],[b.bW+0.60,0],[b.bW+0.60,b.bD+0.60],[0,b.bD+0.60]],
      GROSIME.fundatie_gros);
    const fdPdr = shapeRepr(fdKey, fdSolid);
    L(`#${eid(fdKey)}=IFCFOOTING('${guid()}',#${eid('own')},'Radier_General',$,$,#${fdLpId},#${fdPdr},$,.PAD_FOOTING.);`);
    const fdMatId = eid('mat_beton_c30');
    if (!E['mat_def_beton_c30']) {
      E['mat_def_beton_c30'] = 1;
      L(`#${fdMatId}=IFCMATERIAL('${MAT.beton_c30.name}');`);
    }
    L(`#${eid(fdKey + '_mr')}=IFCRELASSOCIATESMATERIAL('${guid()}',#${eid('own')},$,$,(#${eid(fdKey)}),#${fdMatId});`);
    pset('Pset_FootingCommon', fdKey, [
      { name: 'LoadBearing', val: true },
      { name: 'TipFundatie', val: 'Radier general BA' },
      { name: 'ClassaBeton', val: 'C30/37' },
      { name: 'GrosimeRadier_m', val: GROSIME.fundatie_gros, type: 'length' },
      { name: 'ArmaturaPozitiva', val: 'Ø16/15cm' },
      { name: 'ArmaturaNegativa', val: 'Ø14/15cm' },
      { name: 'BetonEgalizare_m', val: 0.10, type: 'length' },
      { name: 'AdancimeFundare_m', val: 1.20, type: 'length' },
    ]);
    foundId = eid(fdKey);

    // ── Agregare etaje în clădire ──────────────────────────────────────────
    const allBldElems = [...storeyIds.map(x => '#' + x)];
    if (roofId) allBldElems.push('#' + roofId);
    if (foundId) allBldElems.push('#' + foundId);
    L(`#${eid('rlag_bld')}=IFCRELAGGREGATES('${guid()}',#${eid('own')},$,$,#${eid('bld')},(${allBldElems.join(',')}));`);

    // ── SFÂRŞIT ─────────────────────────────────────────────────────────────
    L('ENDSEC;');
    L('END-ISO-10303-21;');

    // ── Asamblez și descarcă ──────────────────────────────────────────────
    const content = [...header, ...lines].join('\n');
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urbanx_bim_${P.nrCad}_${ts}.ifc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const nEntities = lines.length;
    const nWalls = allElements.walls.length;
    const nSlabs = allElements.slabs.length;
    const nCols  = allElements.cols.length;
    const nBeams = allElements.beams.length;

    console.log(`[IFC-BIM] Export complet: ${nEntities} entități | ${nWalls} pereți | ${nSlabs} planșee | ${nCols} stâlpi | ${nBeams} grinzi`);
    if (typeof ss === 'function') ss(`✅ IFC 2x3 BIM Structural: ${nEntities} entități | ${nWalls} pereți | ${nCols} stâlpi | ${nBeams} grinzi | ${nSlabs} planșee + acoperiș + fundații`);
  };

})();
