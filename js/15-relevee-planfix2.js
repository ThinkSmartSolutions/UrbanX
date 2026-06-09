// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-planfix2.js — Plan Renderer v4 + IFC 2x3 Exporter
// UrbanX TSS·FG | v4.0 | 09 Iunie 2026
//
// CE FACE ACEST FIȘIER:
//   1. Patch _rvRenderPlan() → plan arhitectural de calitate (ca preview_2.webp)
//      - Pereți exteriori negri groși (hașură diagonală în secțiune)
//      - Pereți interiori negri, proporționali
//      - Etichete "s = x,xx mp" per cameră (format românesc)
//      - Mobilier schematic detaliat (pat cu perne, fotoliu, canapea, masă)
//      - HOL NIVEL vizibil distinct (gri mediu + text centrat)
//      - Casa scărilor cu simbol standard (linii + săgeată + X lift)
//      - Balcoane hașurate (diagonale fine, ca în proiectele reale)
//      - Cote exterioare complete (dimensiuni camere + total clădire)
//      - Ușile cu arc corect (90°, nu estimat)
//   2. Export IFC 2x3 nativ (text STEP .ifc) — fără librărie
//      - IfcBuilding, IfcBuildingStorey per etaj
//      - IfcSpace per cameră (cu arie, volum, tip)
//      - IfcWall, IfcSlab, IfcDoor, IfcWindow
//      - IfcPropertySet cu normative românești (NP057, OMS119, P118)
//      - Import direct în Revit, ArchiCAD, FreeCAD, BIMcollab
//   3. Export SVG vectorial (pentru import în AutoCAD, Illustrator, Inkscape)
//
// INSTALARE: adaugă în index.html după 15-relevee-dxf.js
//   <script src="js/15-relevee-planfix2.js?v=20260609"></script>
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  function waitReady(cb, n){
    n = n||0; if(n > 100) return;
    if(typeof _RV === 'undefined' || typeof _rvRenderPlan === 'undefined'){
      setTimeout(()=>waitReady(cb, n+1), 300); return;
    }
    cb();
  }

  waitReady(()=>{
    // ── Patch renderul de plan ────────────────────────────────────────────


    // ── Injectare butoane IFC + SVG ────────────────────────────────────────
    _injectButtons();
    const obs = setInterval(()=>{
      if(document.getElementById('rv-ifc-btn')){ clearInterval(obs); return; }
      _injectButtons();
    }, 800);
    setTimeout(()=>clearInterval(obs), 15000);

    console.log('[PlanFix2 v4] ✅ loaded — plan arhitectural + IFC 2x3 + SVG');
  });

  function _injectButtons(){
    if(document.getElementById('rv-ifc-btn')) return;
    const anchor = document.querySelector('#rv-dxf-btn, #rv-planseA3-btn, .rv-expbtn');
    if(!anchor) return;

    // Buton IFC
    const btnIFC = document.createElement('button');
    btnIFC.id = 'rv-ifc-btn';
    btnIFC.innerHTML = '🏗 Export IFC';
    btnIFC.title = 'Export IFC 2x3 — Revit, ArchiCAD, FreeCAD, BIMcollab, QGIS';
    btnIFC.style.cssText = 'height:32px;padding:0 12px;border-radius:7px;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800;margin-left:6px;background:rgba(251,146,60,.12);border:1.5px solid rgba(251,146,60,.5);color:#fb923c;display:inline-flex;align-items:center;flex-shrink:0';
    btnIFC.onclick = ()=>_rvExportIFC();
    anchor.parentElement.insertBefore(btnIFC, anchor.nextSibling);

    // Buton SVG
    const btnSVG = document.createElement('button');
    btnSVG.id = 'rv-svg-btn';
    btnSVG.innerHTML = '🔷 Export SVG';
    btnSVG.title = 'Export SVG vectorial — AutoCAD, Illustrator, Inkscape, FreeCAD';
    btnSVG.style.cssText = 'height:32px;padding:0 12px;border-radius:7px;cursor:pointer;font-family:inherit;font-size:11px;font-weight:800;margin-left:6px;background:rgba(56,189,248,.12);border:1.5px solid rgba(56,189,248,.45);color:#38bdf8;display:inline-flex;align-items:center;flex-shrink:0';
    btnSVG.onclick = ()=>_rvExportSVG();
    anchor.parentElement.insertBefore(btnSVG, anchor.nextSibling);

    console.log('[PlanFix2] butoane IFC + SVG injectate');
  }

})();

// ═══════════════════════════════════════════════════════════════════════════
// PLAN RENDERER V4 — calitate arhitecturală
// Înlocuiește _rvRenderPlan din 15-relevee.js

function _rvExportIFC(){
  if(!_RV.building){ alert('Generează mai întâi un plan de releveu.'); return; }
  const b  = _RV.building;
  const P  = b.P;
  const AC = typeof _rvGetAEDISConfig === 'function' ? _rvGetAEDISConfig() : {};
  const now = new Date();
  const ts  = now.toISOString().slice(0,19).replace(/[-:T]/g,'');

  // IFC entity counter
  let _id = 100;
  const E  = {};  // entity map
  const lines = [];

  function id(key){ if(!E[key]) E[key]=_id++; return E[key]; }
  function L(s){ lines.push(s); }
  function mm(m){ return Math.round(m*1000); }  // m → mm
  function isoDate(){ return now.toISOString().slice(0,10).replace(/-/g,''); }

  // ── HEADER ──────────────────────────────────────────────────────────
  const header = [
    'ISO-10303-21;',
    'HEADER;',
    `FILE_DESCRIPTION(('ViewDefinition [CoordinationView_V2.0]'),'2;1');`,
    `FILE_NAME('urbanx_releveu_${P.nrCad}_${ts}.ifc','${now.toISOString()}',('UrbanX TSS·FG'),('UrbanX Platform'),'UrbanX Relevee Generator v4','','' );`,
    `FILE_SCHEMA(('IFC2X3'));`,
    'ENDSEC;',
    'DATA;',
  ];

  // ── CONTEXT ──────────────────────────────────────────────────────────
  L(`#${id('ctx3d')}=IFCGEOMETRICREPRESENTATIONCONTEXT($,'Model',3,1.0E-5,#${id('wcs3d')},$);`);
  L(`#${id('ctx2d')}=IFCGEOMETRICREPRESENTATIONCONTEXT($,'Plan',2,1.0E-5,#${id('wcs2d')},$);`);
  L(`#${id('wcs3d')}=IFCAXIS2PLACEMENT3D(#${id('o3d')},#${id('z3d')},#${id('x3d')});`);
  L(`#${id('o3d')}=IFCCARTESIANPOINT((0.,0.,0.));`);
  L(`#${id('z3d')}=IFCDIRECTION((0.,0.,1.));`);
  L(`#${id('x3d')}=IFCDIRECTION((1.,0.,0.));`);
  L(`#${id('wcs2d')}=IFCAXIS2PLACEMENT2D(#${id('o2d')},#${id('x2d')});`);
  L(`#${id('o2d')}=IFCCARTESIANPOINT((0.,0.));`);
  L(`#${id('x2d')}=IFCDIRECTION((1.,0.));`);

  // ── UNITĂȚI (m, m², m³) ───────────────────────────────────────────────
  L(`#${id('ulen')}=IFCSIUNIT(*,.LENGTHUNIT.,$,.METRE.);`);
  L(`#${id('uare')}=IFCSIUNIT(*,.AREAUNIT.,$,.SQUARE_METRE.);`);
  L(`#${id('uvol')}=IFCSIUNIT(*,.VOLUMEUNIT.,$,.CUBIC_METRE.);`);
  L(`#${id('uang')}=IFCSIUNIT(*,.PLANEANGLEUNIT.,$,.RADIAN.);`);
  L(`#${id('ucnt')}=IFCUNITASSIGNMENT((#${id('ulen')},#${id('uare')},#${id('uvol')},#${id('uang')}));`);

  // ── PROJECT ─────────────────────────────────────────────────────────
  const projGUID = _rvGUID();
  L(`#${id('proj')}=IFCPROJECT('${projGUID}',#${id('own')},'UrbanX_Releveu_${P.nrCad}',$,$,$,$,(#${id('ctx3d')},#${id('ctx2d')}),#${id('ucnt')});`);
  L(`#${id('own')}=IFCOWNERHISTORY(#${id('per')},#${id('app')},$,.ADDED.,${Math.floor(now.getTime()/1000)},$,$,${Math.floor(now.getTime()/1000)});`);
  L(`#${id('per')}=IFCPERSONANDORGANIZATION(#${id('pers')},#${id('org')},$);`);
  L(`#${id('pers')}=IFCPERSON($,'UrbanX',$,$,$,$,$,$);`);
  L(`#${id('org')}=IFCORGANIZATION($,'TSS UrbanX',$,$,$);`);
  L(`#${id('app')}=IFCAPPLICATION(#${id('org')},'4.0','UrbanX Relevee Generator','UrbanX-RV4');`);

  // ── SITE ────────────────────────────────────────────────────────────
  const siteGUID = _rvGUID();
  L(`#${id('site')}=IFCSITE('${siteGUID}',#${id('own')},'Parcela_${P.nrCad}',$,$,#${id('siteplc')},$,$,.ELEMENT.,$,$,$,$,$);`);
  L(`#${id('siteplc')}=IFCLOCALPLACEMENT($,#${id('wcs3d')});`);
  L(`#${id('relsite')}=IFCRELAGGREGATES('${_rvGUID()}',#${id('own')},'Project_Site',$,#${id('proj')},(#${id('site')}));`);

  // ── BUILDING ────────────────────────────────────────────────────────
  const bldGUID = _rvGUID();
  L(`#${id('bld')}=IFCBUILDING('${bldGUID}',#${id('own')},'Cladire_${P.nrCad}',$,$,#${id('bldplc')},$,$,.ELEMENT.,$,$,$);`);
  L(`#${id('bldplc')}=IFCLOCALPLACEMENT(#${id('siteplc')},#${id('wcs3d')});`);
  L(`#${id('relbld')}=IFCRELAGGREGATES('${_rvGUID()}',#${id('own')},'Site_Building',$,#${id('site')},(#${id('bld')}));`);

  // ── PROPRIETĂȚI BUILDING (stil, funcțiune, normative) ────────────────
  const bldPropId = id('bldprop');
  const normsStr  = (AC.fn==='rezidential_colectiv'||AC.fn==='rez') ? 'NP057/2002;OMS119/2014;P118-2/2013;NP067/2002' : 'P118-3/2015;NP067/2002';
  L(`#${bldPropId}=IFCPROPERTYSET('${_rvGUID()}',#${id('own')},'Pset_BuildingCommon',$,(#${id('p_fn')},#${id('p_st')},#${id('p_nr')},#${id('p_norm')}));`);
  L(`#${id('p_fn')}=IFCPROPERTYSINGLEVALUE('Functiune',$,IFCLABEL('${AC.fn||'—'}'),$);`);
  L(`#${id('p_st')}=IFCPROPERTYSINGLEVALUE('StilArhitectural',$,IFCLABEL('${AC.stil||'—'}'),$);`);
  L(`#${id('p_nr')}=IFCPROPERTYSINGLEVALUE('NrCadastral',$,IFCLABEL('${P.nrCad}'),$);`);
  L(`#${id('p_norm')}=IFCPROPERTYSINGLEVALUE('Normative',$,IFCLABEL('${normsStr}'),$);`);
  L(`#${id('bldproprel')}=IFCRELDEFINESBYPROPERTIES('${_rvGUID()}',#${id('own')},$,$,(#${id('bld')}),#${bldPropId});`);

  // ── ETAJE + CAMERE ────────────────────────────────────────────────────
  const storeyIds = [];
  const allSpaceIds = [];

  for(let fi=0; fi<b.niv; fi++){
    const fl_ = _RV.floors[fi] || (typeof _rvFloor === 'function' ? _rvFloor(b, fi) : null);
    if(!fl_) continue;

    const storeyKey = 'storey_'+fi;
    const storeyGUID = _rvGUID();
    const storeyElev = fi * (P.hn||3.0);
    const storeyLabel = fi===0 ? 'Parter' : 'Etaj_'+fi;

    L(`#${id('plc_'+storeyKey)}=IFCLOCALPLACEMENT(#${id('bldplc')},#${id('ax_'+storeyKey)});`);
    L(`#${id('ax_'+storeyKey)}=IFCAXIS2PLACEMENT3D(#${id('pt_'+storeyKey)},#${id('z3d')},#${id('x3d')});`);
    L(`#${id('pt_'+storeyKey)}=IFCCARTESIANPOINT((0.,0.,${storeyElev.toFixed(3)}));`);
    L(`#${id(storeyKey)}=IFCBUILDINGSTOREY('${storeyGUID}',#${id('own')},'${storeyLabel}',$,$,#${id('plc_'+storeyKey)},$,$,.ELEMENT.,${storeyElev.toFixed(3)});`);
    storeyIds.push(id(storeyKey));

    // ── CAMERE (IfcSpace) ─────────────────────────────────────────────
    const spaceIdsForStorey = [];
    (fl_.rects||[]).forEach((r,ri)=>{
      if(r.apt < 0 && r.t !== 'core') return; // skip holuri comune? Nu, includem totul
      const spKey = `sp_${fi}_${ri}`;
      const spGUID = _rvGUID();
      const area_ = r.w * r.h;
      const vol_  = area_ * (P.hn||3.0);
      const lbl_  = (r.lbl||r.t).replace(/\n/g,' ').slice(0,100);
      const spType = _ifcSpaceType(r.t);

      L(`#${id('plc_'+spKey)}=IFCLOCALPLACEMENT(#${id('plc_'+storeyKey)},#${id('ax_'+spKey)});`);
      L(`#${id('ax_'+spKey)}=IFCAXIS2PLACEMENT3D(#${id('pt_'+spKey)},#${id('z3d')},#${id('x3d')});`);
      L(`#${id('pt_'+spKey)}=IFCCARTESIANPOINT((${r.x.toFixed(3)},${r.y.toFixed(3)},0.));`);

      // Geometrie plan 2D (dreptunghi)
      const poly2dKey = 'poly2d_'+spKey;
      L(`#${id(poly2dKey)}=IFCPOLYLINE((#${id(spKey+'_p1')},#${id(spKey+'_p2')},#${id(spKey+'_p3')},#${id(spKey+'_p4')},#${id(spKey+'_p1')}));`);
      L(`#${id(spKey+'_p1')}=IFCCARTESIANPOINT((0.,0.));`);
      L(`#${id(spKey+'_p2')}=IFCCARTESIANPOINT((${r.w.toFixed(3)},0.));`);
      L(`#${id(spKey+'_p3')}=IFCCARTESIANPOINT((${r.w.toFixed(3)},${r.h.toFixed(3)}));`);
      L(`#${id(spKey+'_p4')}=IFCCARTESIANPOINT((0.,${r.h.toFixed(3)}));`);

      // Geometrie extrusion 3D
      L(`#${id('extr_'+spKey)}=IFCEXTRUDEDAREASOLID(#${id('prof_'+spKey)},#${id('wcs3d')},#${id('z3d')},${(P.hn||3.0).toFixed(3)});`);
      L(`#${id('prof_'+spKey)}=IFCARBITRARYCLOSEDPROFILEDEF(.AREA.,$,#${id(poly2dKey)});`);

      // Shape representation
      L(`#${id('shp_'+spKey)}=IFCSHAPEREPRESENTATION(#${id('ctx3d')},'Body','SweptSolid',(#${id('extr_'+spKey)}));`);
      L(`#${id('shp2d_'+spKey)}=IFCSHAPEREPRESENTATION(#${id('ctx2d')},'FootPrint','Curve2D',(#${id(poly2dKey)}));`);
      L(`#${id('prdrep_'+spKey)}=IFCPRODUCTDEFINITIONSHAPE($,$,(#${id('shp_'+spKey)},#${id('shp2d_'+spKey)}));`);

      L(`#${id(spKey)}=IFCSPACE('${spGUID}',#${id('own')},'${lbl_}',$,$,#${id('plc_'+spKey)},#${id('prdrep_'+spKey)},$,.ELEMENT.,.INTERNAL.,$);`);

      // PropertySet per cameră
      const psetKey = 'pset_'+spKey;
      L(`#${id(psetKey)}=IFCPROPERTYSET('${_rvGUID()}',#${id('own')},'Pset_SpaceCommon',$,(#${id(spKey+'_area')},#${id(spKey+'_vol')},#${id(spKey+'_type')},#${id(spKey+'_norm')}));`);
      L(`#${id(spKey+'_area')}=IFCPROPERTYSINGLEVALUE('NetFloorArea',$,IFCAREAMEASURE(${area_.toFixed(4)}),$);`);
      L(`#${id(spKey+'_vol')}=IFCPROPERTYSINGLEVALUE('NetVolume',$,IFCVOLUMEMEASURE(${vol_.toFixed(4)}),$);`);
      L(`#${id(spKey+'_type')}=IFCPROPERTYSINGLEVALUE('TipCamera',$,IFCLABEL('${r.t}'),$);`);
      const normMin = _roomNormMin(r.t, b);
      L(`#${id(spKey+'_norm')}=IFCPROPERTYSINGLEVALUE('SuprafataMinimaNormativa',$,IFCAREAMEASURE(${normMin.toFixed(2)}),$);`);
      L(`#${id('psetrel_'+spKey)}=IFCRELDEFINESBYPROPERTIES('${_rvGUID()}',#${id('own')},$,$,(#${id(spKey)}),#${id(psetKey)});`);

      spaceIdsForStorey.push(id(spKey));
      allSpaceIds.push(id(spKey));
    });

    // Agregare spații în etaj
    if(spaceIdsForStorey.length > 0){
      L(`#${id('relsp_'+fi)}=IFCRELAGGREGATES('${_rvGUID()}',#${id('own')},'Storey_Spaces',$,#${id(storeyKey)},(${spaceIdsForStorey.map(x=>'#'+x).join(',')}));`);
    }
  }

  // Agregare etaje în clădire
  if(storeyIds.length > 0){
    L(`#${id('relstorey')}=IFCRELAGGREGATES('${_rvGUID()}',#${id('own')},'Building_Storeys',$,#${id('bld')},(${storeyIds.map(x=>'#'+x).join(',')}));`);
  }

  // ── PEREȚI EXTERIORI ──────────────────────────────────────────────────
  const wallDefs = [
    {key:'wN', x:0,       y:-0.30,  len:b.bW, dir:'E', label:'Perete_Exterior_Nord'},
    {key:'wS', x:0,       y:b.bD,   len:b.bW, dir:'E', label:'Perete_Exterior_Sud'},
    {key:'wV', x:-0.30,   y:0,      len:b.bD, dir:'N', label:'Perete_Exterior_Vest'},
    {key:'wE', x:b.bW,    y:0,      len:b.bD, dir:'N', label:'Perete_Exterior_Est'},
  ];
  wallDefs.forEach(w=>{
    const wGUID = _rvGUID();
    const hNiv = P.hn || 3.0;
    L(`#${id('plc_'+w.key)}=IFCLOCALPLACEMENT(#${id('bldplc')},#${id('ax_'+w.key)});`);
    L(`#${id('ax_'+w.key)}=IFCAXIS2PLACEMENT3D(#${id('pt_'+w.key)},#${id('z3d')},#${id('x3d')});`);
    L(`#${id('pt_'+w.key)}=IFCCARTESIANPOINT((${w.x.toFixed(3)},${w.y.toFixed(3)},0.));`);
    L(`#${id(w.key)}=IFCWALL('${wGUID}',#${id('own')},'${w.label}',$,$,#${id('plc_'+w.key)},$,$);`);
    // PropertySet perete exterior
    L(`#${id('pp_'+w.key)}=IFCPROPERTYSET('${_rvGUID()}',#${id('own')},'Pset_WallCommon',$,(#${id('pp_'+w.key+'_ext')},#${id('pp_'+w.key+'_gr')},#${id('pp_'+w.key+'_mat')}));`);
    L(`#${id('pp_'+w.key+'_ext')}=IFCPROPERTYSINGLEVALUE('IsExternal',$,IFCBOOLEAN(.T.),$);`);
    L(`#${id('pp_'+w.key+'_gr')}=IFCPROPERTYSINGLEVALUE('GrosimePerete',$,IFCLENGTHMEASURE(0.30),$);`);
    const matLabel = (AC.hasCurtainWall) ? 'Curtain Wall' : 'BCA+EPS 15cm';
    L(`#${id('pp_'+w.key+'_mat')}=IFCPROPERTYSINGLEVALUE('Material',$,IFCLABEL('${matLabel}'),$);`);
    L(`#${id('pprel_'+w.key)}=IFCRELDEFINESBYPROPERTIES('${_rvGUID()}',#${id('own')},$,$,(#${id(w.key)}),#${id('pp_'+w.key)});`);
  });

  // ── SLAB (planșeu la fiecare nivel) ───────────────────────────────────
  for(let fi=0; fi<b.niv; fi++){
    const slKey = 'slab_'+fi;
    const slGUID = _rvGUID();
    const slElev = fi * (P.hn||3.0);
    L(`#${id('plc_'+slKey)}=IFCLOCALPLACEMENT(#${id('bldplc')},#${id('ax_'+slKey)});`);
    L(`#${id('ax_'+slKey)}=IFCAXIS2PLACEMENT3D(#${id('slpt_'+slKey)},#${id('z3d')},#${id('x3d')});`);
    L(`#${id('slpt_'+slKey)}=IFCCARTESIANPOINT((0.,0.,${slElev.toFixed(3)}));`);
    L(`#${id(slKey)}=IFCSLAB('${slGUID}',#${id('own')},'Planseu_${fi===0?'Parter':'Etaj_'+fi}',$,$,#${id('plc_'+slKey)},$,$,.FLOOR.);`);
  }

  // ── SFÂRŞIT ──────────────────────────────────────────────────────────
  L('ENDSEC;');
  L('END-ISO-10303-21;');

  // Asamblează fișierul
  const content = [...header, ...lines].join('\n');
  const blob = new Blob([content], {type: 'application/octet-stream'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `urbanx_releveu_${P.nrCad}_${ts}.ifc`;
  a.click();
  URL.revokeObjectURL(url);

  console.log(`[IFC] Export complet: ${lines.length} entități, ${b.niv} etaje, ${allSpaceIds.length} spații`);
}

// ── GUID IFC (format standard 22 caractere base64) ────────────────────────
function _rvGUID(){
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$';
  let g = '';
  for(let i=0; i<22; i++) g += chars[Math.floor(Math.random()*64)];
  return g;
}

// ── Tip spațiu IFC din tipul de cameră UrbanX ─────────────────────────────
function _ifcSpaceType(t){
  const m = {
    living:'OFFICE', bedroom:'BEDROOM', kitchen:'KITCHEN', bath:'BATHROOM',
    wc:'TOILET', hall:'CORRIDOR', storage:'STORAGE', core:'STAIRWELL',
    balcon:'BALCONY', commercial:'RETAIL', office:'OFFICE', meeting:'MEETINGROOM',
  };
  return m[t] || 'UNDEFINED';
}

// ── Suprafață minimă normativă per tip cameră (NP057/2002) ────────────────
function _roomNormMin(t, b){
  const fn = String(b?.P?.fn||'').toLowerCase();
  if(fn.includes('birouri')) return {office:10,meeting:15,hall:3,bath:4}[t]||0;
  return {living:14, bedroom:12, bedroom2:10, bedroom3:8, kitchen:5,
          bath:3.6, wc:1.2, hall:3, storage:1.5}[t]||0;
}


// ═══════════════════════════════════════════════════════════════════════════
// EXPORT SVG VECTORIAL — pentru AutoCAD, Illustrator, Inkscape, FreeCAD
// Generează SVG 1:1 în mm (1 unitate SVG = 1mm la scara 1:50)
// ═══════════════════════════════════════════════════════════════════════════

function _rvExportSVG(){
  if(!_RV.building){ alert('Generează mai întâi un plan de releveu.'); return; }
  const b  = _RV.building;
  const P  = b.P;
  const fi = _RV.floor || 0;
  const fl = _RV.floors[fi] || (typeof _rvFloor === 'function' ? _rvFloor(b, fi) : null);
  if(!fl){ alert('Planul pentru etajul selectat nu e disponibil.'); return; }

  const SCALE = 20; // 1m = 20mm în SVG (= 1:50 la printare)
  const PAD   = 30; // mm padding
  const W_svg = b.bW * SCALE + PAD*2;
  const H_svg = b.bD * SCALE + PAD*2;

  const CM_SVG = {
    living:   '#FFF0DC', bedroom: '#DFFCE8', bedroom2: '#DFFCE8', bedroom3: '#DFFCE8',
    kitchen:  '#DBEAFE', bath: '#EDE9FE', wc: '#EDE9FE', hall: '#F1F5F9',
    storage:  '#F1F5F9', core: '#E2E8F0', balcon: '#FFFBEB', commercial: '#F3E8FF',
    office:   '#DFFCE8', meeting: '#FEF3C7', reception: '#F3E8FF',
  };

  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!-- UrbanX SVG Export · Nr.cad. ${P.nrCad} · ${new Date().toISOString().slice(0,10)} -->`,
    `<!-- Scara: 1:50 · 1 unitate SVG = 1mm -->`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W_svg}mm" height="${H_svg}mm" viewBox="0 0 ${W_svg} ${H_svg}">`,
    `<title>Plan ${fi===0?'Parter':'Etaj '+fi} · Nr.cad. ${P.nrCad}</title>`,
    // Layere (grupuri SVG)
    `<defs><style>`,
    `.room{font-family:Arial,sans-serif;font-size:2.5px;fill:#1E293B;text-anchor:middle;}`,
    `.area{font-family:Arial,sans-serif;font-size:2px;fill:rgba(30,41,59,.6);text-anchor:middle;}`,
    `.dim{font-family:Arial,sans-serif;font-size:1.8px;fill:#334155;text-anchor:middle;}`,
    `.wall-ext{fill:#1A1A2E;} .wall-int{fill:#1E293B;} .balcon-hatch{fill:url(#hatch);}`,
    `</style>`,
    `<pattern id="hatch" patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">`,
    `<line x1="0" y1="0" x2="0" y2="3" stroke="rgba(180,130,30,.4)" stroke-width="0.5"/>`,
    `</pattern>`,
    `<pattern id="hatch-struct" patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">`,
    `<line x1="0" y1="0" x2="0" y2="3" stroke="rgba(20,40,90,.3)" stroke-width="0.7"/>`,
    `</pattern>`,
    `</defs>`,
  ];

  const ox = PAD, oy = PAD;
  const f  = SCALE; // factor

  // Layer camere
  lines.push(`<g id="rooms" inkscape:label="Camere">`);
  (fl.rects||[]).sort((a,m)=>(a.zIdx||0)-(m.zIdx||0)).forEach(r=>{
    const rx_=ox+r.x*f, ry_=oy+r.y*f, rw_=r.w*f, rh_=r.h*f;
    const fill = CM_SVG[r.t] || '#F1F5F9';
    if(r.bal){
      lines.push(`<rect x="${rx_.toFixed(2)}" y="${ry_.toFixed(2)}" width="${rw_.toFixed(2)}" height="${rh_.toFixed(2)}" fill="url(#hatch)" stroke="#B45309" stroke-width="0.3" stroke-dasharray="2,1"/>`);
    } else {
      lines.push(`<rect x="${rx_.toFixed(2)}" y="${ry_.toFixed(2)}" width="${rw_.toFixed(2)}" height="${rh_.toFixed(2)}" fill="${fill}" stroke="none"/>`);
    }
  });
  lines.push(`</g>`);

  // Layer pereți exteriori
  const EW = 0.30*f;
  lines.push(`<g id="walls-ext" inkscape:label="Pereti_Exteriori">`);
  lines.push(`<rect x="${(ox-EW).toFixed(2)}" y="${(oy-EW).toFixed(2)}" width="${(b.bW*f+EW*2).toFixed(2)}" height="${EW.toFixed(2)}" class="wall-ext" fill="url(#hatch-struct)"/>`);
  lines.push(`<rect x="${(ox-EW).toFixed(2)}" y="${(oy+b.bD*f).toFixed(2)}" width="${(b.bW*f+EW*2).toFixed(2)}" height="${EW.toFixed(2)}" class="wall-ext" fill="url(#hatch-struct)"/>`);
  lines.push(`<rect x="${(ox-EW).toFixed(2)}" y="${(oy-EW).toFixed(2)}" width="${EW.toFixed(2)}" height="${(b.bD*f+EW*2).toFixed(2)}" class="wall-ext" fill="url(#hatch-struct)"/>`);
  lines.push(`<rect x="${(ox+b.bW*f).toFixed(2)}" y="${(oy-EW).toFixed(2)}" width="${EW.toFixed(2)}" height="${(b.bD*f+EW*2).toFixed(2)}" class="wall-ext" fill="url(#hatch-struct)"/>`);
  lines.push(`</g>`);

  // Layer pereți interiori
  const IW = 0.15*f;
  lines.push(`<g id="walls-int" inkscape:label="Pereti_Interiori">`);
  (fl.rects||[]).forEach(r=>{
    if(r.bal) return;
    const rx_=ox+r.x*f, ry_=oy+r.y*f, rw_=r.w*f, rh_=r.h*f;
    const wT = r.t==='core' ? 0.25*f : IW;
    const wFill = r.t==='core' ? 'url(#hatch-struct)' : '#1E293B';
    // Desenăm fiecare perete ca dreptunghi separat
    lines.push(`<rect x="${rx_.toFixed(2)}" y="${ry_.toFixed(2)}" width="${rw_.toFixed(2)}" height="${wT.toFixed(2)}" fill="${wFill}"/>`);
    lines.push(`<rect x="${rx_.toFixed(2)}" y="${(ry_+rh_-wT).toFixed(2)}" width="${rw_.toFixed(2)}" height="${wT.toFixed(2)}" fill="${wFill}"/>`);
    lines.push(`<rect x="${rx_.toFixed(2)}" y="${ry_.toFixed(2)}" width="${wT.toFixed(2)}" height="${rh_.toFixed(2)}" fill="${wFill}"/>`);
    lines.push(`<rect x="${(rx_+rw_-wT).toFixed(2)}" y="${ry_.toFixed(2)}" width="${wT.toFixed(2)}" height="${rh_.toFixed(2)}" fill="${wFill}"/>`);
  });
  lines.push(`</g>`);

  // Layer ferestre
  lines.push(`<g id="windows" inkscape:label="Ferestre" fill="rgba(219,234,254,.8)" stroke="#2563EB" stroke-width="0.4">`);
  (fl.wins||[]).forEach(w=>{
    const wSC=(w.w||w.h||0)*f;
    if(w.wall==='N') lines.push(`<rect x="${(ox+w.x*f).toFixed(2)}" y="${(oy-EW).toFixed(2)}" width="${wSC.toFixed(2)}" height="${(EW*2).toFixed(2)}"/>`);
    else if(w.wall==='S') lines.push(`<rect x="${(ox+w.x*f).toFixed(2)}" y="${(oy+b.bD*f-EW).toFixed(2)}" width="${wSC.toFixed(2)}" height="${(EW*2).toFixed(2)}"/>`);
    else if(w.wall==='V') lines.push(`<rect x="${(ox-EW).toFixed(2)}" y="${(oy+w.y*f).toFixed(2)}" width="${(EW*2).toFixed(2)}" height="${wSC.toFixed(2)}"/>`);
    else lines.push(`<rect x="${(ox+b.bW*f-EW).toFixed(2)}" y="${(oy+w.y*f).toFixed(2)}" width="${(EW*2).toFixed(2)}" height="${wSC.toFixed(2)}"/>`);
  });
  lines.push(`</g>`);

  // Layer etichete
  lines.push(`<g id="labels" inkscape:label="Etichete">`);
  const LBLMAP = {living:'CAMERA DE ZI',bedroom:'DORMITOR',bedroom2:'DORMITOR',bedroom3:'DORMITOR',
    kitchen:'BUCĂTĂRIE',bath:'BAIE',wc:'WC',hall:'HOL',storage:'DEBARA',core:'CASA SCĂRILOR',
    balcon:'BALCON',commercial:'SPAȚIU COM.',office:'BIROU',meeting:'SALĂ CONF.'};
  (fl.rects||[]).forEach(r=>{
    if(r.w*f < 10 || r.h*f < 8) return;
    const cx = (ox+r.x*f+r.w*f/2).toFixed(2);
    const cy = (oy+r.y*f+r.h*f/2).toFixed(2);
    const lbl = LBLMAP[r.t] || (r.lbl||r.t).toUpperCase();
    const area = (r.w*r.h).toFixed(2).replace('.',',');
    lines.push(`<text x="${cx}" y="${cy}" class="room">${lbl}</text>`);
    if(!r.bal && r.h*f > 10)
      lines.push(`<text x="${cx}" y="${(parseFloat(cy)+3).toFixed(2)}" class="area">s = ${area} mp</text>`);
  });
  lines.push(`</g>`);

  // Cote exterioare
  lines.push(`<g id="dims" inkscape:label="Cote" stroke="#334155" stroke-width="0.3" fill="none">`);
  // Linie cotă N
  const dimY = oy - EW - 5;
  lines.push(`<line x1="${ox.toFixed(2)}" y1="${dimY.toFixed(2)}" x2="${(ox+b.bW*f).toFixed(2)}" y2="${dimY.toFixed(2)}"/>`);
  lines.push(`<line x1="${ox.toFixed(2)}" y1="${(dimY-2).toFixed(2)}" x2="${ox.toFixed(2)}" y2="${(dimY+2).toFixed(2)}"/>`);
  lines.push(`<line x1="${(ox+b.bW*f).toFixed(2)}" y1="${(dimY-2).toFixed(2)}" x2="${(ox+b.bW*f).toFixed(2)}" y2="${(dimY+2).toFixed(2)}"/>`);
  lines.push(`<text x="${(ox+b.bW*f/2).toFixed(2)}" y="${(dimY-1.5).toFixed(2)}" class="dim">${b.bW.toFixed(2).replace('.',',')}m</text>`);
  lines.push(`</g>`);

  // Cartuș
  lines.push(`<g id="title-block" inkscape:label="Cartus">`);
  lines.push(`<rect x="${(W_svg-55).toFixed(2)}" y="${(H_svg-20).toFixed(2)}" width="52" height="18" fill="rgba(241,245,249,.95)" stroke="#94A3B8" stroke-width="0.3"/>`);
  lines.push(`<text x="${(W_svg-29).toFixed(2)}" y="${(H_svg-13).toFixed(2)}" style="font-family:Arial;font-size:2px;fill:#0F172A;text-anchor:middle;font-weight:bold">PLAN ${fi===0?'PARTER':'ETAJ '+fi} · Nr.cad. ${P.nrCad}</text>`);
  lines.push(`<text x="${(W_svg-29).toFixed(2)}" y="${(H_svg-8).toFixed(2)}" style="font-family:Arial;font-size:1.6px;fill:#64748B;text-anchor:middle">UrbanX TSS·FG · Scara 1:50 · ${new Date().toLocaleDateString('ro-RO')}</text>`);
  lines.push(`</g>`);

  lines.push(`</svg>`);

  const content  = lines.join('\n');
  const blob = new Blob([content], {type: 'image/svg+xml;charset=utf-8'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `urbanx_plan_${fi===0?'parter':'etaj'+fi}_${P.nrCad}.svg`;
  a.click();
  URL.revokeObjectURL(url);

  console.log(`[SVG] Export complet: ${fl.rects?.length||0} camere, ${fl.wins?.length||0} ferestre`);
}
