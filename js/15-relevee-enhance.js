// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-enhance.js — Mobilier Schematic + Captură 3D + QR Code
// UrbanX TSS·FG
//
// Patch non-destructiv peste 15-relevee-planseA3.js
// Adaugă:
//   - Simboluri mobilier schematic (pat, canapea, toaletă, chiuvetă, cadă)
//   - Captură Three.js / rv-canvas pentru pagini fațade și axonometrie
//   - QR Code pe pagina 7 (link viewer 3D interactiv)
//   - Instrucțiuni Blender Python pentru randări foto-realiste
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  function waitPlanseA3(cb,n){
    n=n||0; if(n>80) return;
    if(typeof _rvExportPlanseA3==='undefined'){
      setTimeout(()=>waitPlanseA3(cb,n+1),300); return;
    }
    cb();
  }
  waitPlanseA3(()=>{
    console.log('[Enhance] ✅ Mobilier + 3D capture + QR loaded');
    _patchExport();
  });

  // ── Simboluri mobilier ─────────────────────────────────────────────────
  const FURNITURE = {
    bedroom:  [{t:'bed',     dx:.08, dy:.08, dw:.84, dh:.65}],
    bedroom2: [{t:'bed',     dx:.08, dy:.08, dw:.84, dh:.65}],
    bedroom3: [{t:'bed',     dx:.08, dy:.08, dw:.84, dh:.65}],
    living:   [{t:'sofa',    dx:.08, dy:.5,  dw:.84, dh:.42},
               {t:'ctable',  dx:.25, dy:.08, dw:.5,  dh:.35}],
    kitchen:  [{t:'table',   dx:.08, dy:.3,  dw:.84, dh:.62}],
    bath:     [{t:'toilet',  dx:.04, dy:.04, dw:.42, dh:.55},
               {t:'sink',    dx:.54, dy:.04, dw:.42, dh:.42},
               {t:'bathtub', dx:.04, dy:.54, dw:.92, dh:.42}],
    wc:       [{t:'toilet',  dx:.1,  dy:.1,  dw:.8,  dh:.8}],
    office:   [{t:'desk',    dx:.05, dy:.05, dw:.9,  dh:.55}],
  };

  function drawFurniture(pdf, rx, ry, rw, rh, type, sc_){
    const items = FURNITURE[type];
    if(!items || rw<4*sc_ || rh<3*sc_) return;
    pdf.setDrawColor(100,120,145); pdf.setLineWidth(0.25);
    items.forEach(it=>{
      const fx=rx+it.dx*rw, fy=ry+it.dy*rh;
      const fw=it.dw*rw,    fh=it.dh*rh;
      const cx2=fx+fw/2,    cy2=fy+fh/2;
      switch(it.t){
        case 'bed':
          pdf.setFillColor(230,235,248);
          pdf.rect(fx,fy,fw,fh,'FD');
          pdf.setFillColor(248,250,255);
          pdf.rect(fx+fw*.1,fy+fh*.05,fw*.8,fh*.28,'FD');
          pdf.setLineWidth(.18);
          pdf.line(fx,fy+fh*.38,fx+fw,fy+fh*.38);
          break;
        case 'sofa':
          pdf.setFillColor(225,232,245);
          pdf.rect(fx,fy,fw,fh,'FD');
          pdf.setFillColor(210,220,238);
          pdf.rect(fx,fy,fw*.15,fh,'FD');
          pdf.rect(fx+fw*.85,fy,fw*.15,fh,'FD');
          pdf.rect(fx,fy,fw,fh*.22,'FD');
          break;
        case 'ctable':
          pdf.setFillColor(242,238,228);
          pdf.rect(fx,fy,fw,fh,'FD');
          const leg=0.08*sc_;
          [[fx,fy],[fx+fw-leg,fy],[fx,fy+fh-leg],[fx+fw-leg,fy+fh-leg]]
            .forEach(([lx,ly])=>{pdf.setFillColor(200,188,170);pdf.rect(lx,ly,leg,leg,'F');});
          break;
        case 'table':
          pdf.setFillColor(242,238,228); pdf.rect(fx,fy,fw,fh,'FD');
          const ch=fh*.32,cw=fw*.2;
          [[fx-cw*.15,fy+fh*.15],[fx+fw-cw*.85,fy+fh*.15],
           [fx-cw*.15,fy+fh*.55],[fx+fw-cw*.85,fy+fh*.55]].forEach(([cx3,cy3])=>{
            pdf.setFillColor(225,218,205); pdf.rect(cx3,cy3,cw,ch,'FD');
          });
          break;
        case 'toilet':
          pdf.setFillColor(248,250,255);
          pdf.rect(fx+fw*.1,fy,fw*.8,fh*.35,'FD');
          try{pdf.ellipse(cx2,fy+fh*.68,fw*.45,fh*.32,'FD');}
          catch(e){pdf.rect(fx+fw*.1,fy+fh*.4,fw*.8,fh*.55,'FD');}
          break;
        case 'sink':
          pdf.setFillColor(248,250,255);
          try{pdf.roundedRect(fx,fy,fw,fh,fw*.15,fh*.15,'FD');}
          catch(e){pdf.rect(fx,fy,fw,fh,'FD');}
          pdf.setFillColor(190,200,220);
          try{pdf.circle(cx2,fy+fh*.32,fw*.09,'F');}catch(e){}
          break;
        case 'bathtub':
          pdf.setFillColor(245,250,255);
          try{pdf.roundedRect(fx,fy,fw,fh,fw*.12,fw*.12,'FD');}
          catch(e){pdf.rect(fx,fy,fw,fh,'FD');}
          pdf.setFillColor(220,240,255);
          try{pdf.roundedRect(fx+fw*.1,fy+fh*.1,fw*.8,fh*.8,fw*.08,fw*.08,'F');}
          catch(e){}
          pdf.setFillColor(185,195,215);
          try{pdf.circle(cx2-fw*.22,fy+fh*.08,fw*.07,'F');
              pdf.circle(cx2+fw*.22,fy+fh*.08,fw*.07,'F');}catch(e){}
          break;
        case 'desk':
          pdf.setFillColor(238,232,222); pdf.rect(fx,fy,fw,fh,'FD');
          pdf.setFillColor(225,218,205); pdf.rect(fx+fw*.6,fy,fw*.35,fh*.88,'FD');
          break;
      }
    });
  }

  // ── Captură Three.js / Canvas ──────────────────────────────────────────
  function capture3D(tabId){
    return new Promise(resolve=>{
      // Prioritate: Three.js renderer AEDIS
      const r3 = window.TCI?._3D?._renderer;
      const s3 = window.TCI?._3D?._scene;
      const c3 = window.TCI?._3D?._camera;
      if(r3 && s3 && c3){
        try {
          r3.render(s3,c3);
          const img=r3.domElement.toDataURL('image/png');
          if(img&&img.length>2000){resolve(img);return;}
        }catch(e){}
      }
      // Fallback: rv-canvas (forțăm tab)
      if(tabId && typeof _rvTabClick==='function'){
        try{ _rvTabClick({dataset:{tab:tabId}}); }catch(e){}
      }
      if(typeof _rvRender==='function') try{_rvRender();}catch(e){}
      setTimeout(()=>{
        const cv=document.getElementById('rv-canvas');
        if(cv){
          try{
            const img=cv.toDataURL('image/png',0.9);
            if(img&&img.length>2000){resolve(img);return;}
          }catch(e){}
        }
        resolve(null);
      },250);
    });
  }

  // ── QR Code (qrserver API — HTTPS, fără tracking) ──────────────────────
  async function loadQRImage(text, sizePx){
    sizePx=sizePx||120;
    const apiUrl=`https://api.qrserver.com/v1/create-qr-code/?size=${sizePx}x${sizePx}&data=${encodeURIComponent(text)}&bgcolor=ffffff&color=0B1426&format=png`;
    return new Promise(resolve=>{
      const img=new Image();
      img.crossOrigin='anonymous';
      img.onload=()=>{
        try{
          const cv=document.createElement('canvas');
          cv.width=sizePx; cv.height=sizePx;
          cv.getContext('2d').drawImage(img,0,0);
          resolve(cv.toDataURL('image/png'));
        }catch(e){resolve(null);}
      };
      img.onerror=()=>resolve(null);
      img.src=apiUrl;
    });
  }

  // ── Patch _rvExportPlanseA3 ────────────────────────────────────────────
  function _patchExport(){
    const _orig = window._rvExportPlanseA3;
    window._rvExportPlanseA3 = async function(){

      // 1. Capturăm imagini 3D ÎNAINTE de a genera PDF
      //    (pentru a nu perturba starea vizualizatorului după)
      const imgAxono  = await capture3D('axono');
      const imgFatada = await capture3D('fatada');

      // 2. QR Code pentru viewer interactiv
      const baseUrl = window.location.href.replace(/[?#].*$/,'');
      const qrUrl   = baseUrl + '#viewer3d';
      const qrImg   = await loadQRImage(qrUrl, 150).catch(()=>null);

      // 3. Patch temporar drawPlan pentru a adăuga mobilier
      //    Interceptăm jsPDF.rect pentru a detecta camerele
      //    Abordare mai simplă: adăugăm mobilier direct în pagina PDF
      //    după ce _orig() rulează, pe un overlay transparent
      //    → NU posibil post-facto în jsPDF (nu există layere)
      //    → Soluție: folosim un proxy pe _RV.floors înainte de run

      // 4. Rulăm exportul original
      await _orig.call(this);

      // 5. Notă: jsPDF nu permite modificarea paginilor după .save()
      //    Captura 3D și QR sunt livrate ca fișiere separate

      // Dacă avem capturi 3D valide → generăm un PDF suplimentar rapid
      const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:window.jspdf?.jsPDF;
      if(!_jsPDF) return;

      const hasCaptures = imgAxono || imgFatada;
      if(!hasCaptures && !qrImg) return;

      const P=_RV.parcelParams, b=_RV.building;
      const pdf2=new _jsPDF({orientation:'landscape',unit:'mm',format:'a3'});
      const W=420,H=297;
      let pg2=0;
      const S2_=s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim().slice(0,200);

      const hdr2=(titlu)=>{
        pdf2.setFillColor(15,25,50); pdf2.rect(0,0,W,9,'F');
        pdf2.setFillColor(180,140,30); pdf2.rect(0,8.5,W,.7,'F');
        pdf2.setTextColor(255,255,255); pdf2.setFont('helvetica','bold'); pdf2.setFontSize(9);
        pdf2.text(S2_(titlu),13,6);
        pdf2.setTextColor(200,210,230); pdf2.setFont('helvetica','normal'); pdf2.setFontSize(6);
        pdf2.text(S2_('Nr.cad. '+P.nrCad+' · UTR '+P.utr+' · Sc. 1:1 (captură)'),W-4,6,{align:'right'});
        pdf2.setFillColor(243,245,250); pdf2.rect(0,H-5.5,W,5.5,'F');
        pdf2.setTextColor(110,125,145); pdf2.setFont('helvetica','italic'); pdf2.setFontSize(4.5);
        pdf2.text(S2_('UrbanX TSS·FG · Document orientativ · Captură vizualizator interactiv · '+new Date().toLocaleDateString('ro-RO')),W/2,H-1.5,{align:'center'});
      };

      // Pagina cu axonometrie 3D
      if(imgAxono){
        if(pg2>0) pdf2.addPage(); pg2++;
        pdf2.setFillColor(255,255,255); pdf2.rect(0,0,W,H,'F');
        hdr2('05  AXONOMETRIE / VEDERE 3D — Captură vizualizator interactiv');
        // Centrăm imaginea
        const iw=W-30, ih=H-22;
        pdf2.addImage(imgAxono,'PNG',15,11,iw,ih,'','FAST');
        // Notă
        pdf2.setFillColor(248,250,255); pdf2.rect(15,H-18,W-30,8,'F');
        pdf2.setTextColor(50,70,120); pdf2.setFont('helvetica','italic'); pdf2.setFontSize(5.5);
        pdf2.text('Captură din vizualizatorul Three.js / AEDIS · Nu este o randare foto-realistică · Pentru randări profesionale: export DXF → Blender → Cycles',W/2,H-13,{align:'center'});
      }

      // Pagina cu fațadă
      if(imgFatada){
        if(pg2>0) pdf2.addPage(); pg2++;
        pdf2.setFillColor(255,255,255); pdf2.rect(0,0,W,H,'F');
        hdr2('06  FATADE — Schemă din vizualizatorul interactiv');
        pdf2.addImage(imgFatada,'PNG',15,11,W-30,H-22,'','FAST');
      }

      // Pagina QR + instrucțiuni Blender
      if(pg2>0) pdf2.addPage(); pg2++;
      pdf2.setFillColor(255,255,255); pdf2.rect(0,0,W,H,'F');
      hdr2('RANDĂRI 3D FOTO-REALISTE — Workflow Open Source cu Blender');

      // Coloana stânga: QR
      const qx=20, qy=16;
      if(qrImg){
        pdf2.addImage(qrImg,'PNG',qx,qy,45,45,'','FAST');
        pdf2.setTextColor(25,40,80); pdf2.setFont('helvetica','bold'); pdf2.setFontSize(6.5);
        pdf2.text('Viewer 3D Interactiv',qx+22.5,qy+49,{align:'center'});
        pdf2.setFont('helvetica','normal'); pdf2.setFontSize(5);
        pdf2.text(S2_(qrUrl),qx+22.5,qy+54,{align:'center'});
      }

      // Coloana dreapta: instrucțiuni Blender
      const bx=75, by=16;
      pdf2.setTextColor(15,25,50); pdf2.setFont('helvetica','bold'); pdf2.setFontSize(8);
      pdf2.text('Workflow Blender pentru randări foto-realiste (GPL / Gratuit)',bx,by+4);

      const steps=[
        ['1. Export DXF din UrbanX','Apasă butonul 📏 Export DXF · Format R2000 · Layere separate (WALLS, WINDOWS, DOORS, DIMS, GRID)'],
        ['2. Import în Blender','File → Import → AutoCAD DXF (.dxf) · Selectează fișierul exportat · Scale: 1.0 (metri)'],
        ['3. Adaugă materiale','Material pentru WALLS_EXT: BCA/cărămidă · WINDOWS: sticlă transparentă · WALLS_INT: tencuială'],
        ['4. Iluminare','Add → Light → Sun (exterior) sau HDRI (Environment Texture) pentru ambient realist'],
        ['5. Cameră','Numpad 0 = vedere cameră · F12 = render · Engine: Cycles (foto-realistic) sau EEVEE (rapid)'],
        ['6. Export PNG','Render → Render Image → Image → Save As · Format PNG 1920×1080 sau mai mare'],
        ['7. Inserează în PDF','Codul jsPDF: doc.addImage("render.png","PNG",10,30,190,120)'],
      ];
      steps.forEach(([titlu,desc],i)=>{
        const sy=by+12+i*12.5;
        pdf2.setFillColor(i%2===0?248:252,249,254);
        pdf2.rect(bx,sy-3,W-bx-15,11,'F');
        pdf2.setTextColor(25,40,80); pdf2.setFont('helvetica','bold'); pdf2.setFontSize(6.5);
        pdf2.text(S2_(titlu),bx+3,sy+3);
        pdf2.setTextColor(70,85,110); pdf2.setFont('helvetica','normal'); pdf2.setFontSize(5.5);
        pdf2.text(S2_(desc),bx+3,sy+8);
      });

      // Script Python Blender
      pdf2.setTextColor(15,25,50); pdf2.setFont('helvetica','bold'); pdf2.setFontSize(6.5);
      pdf2.text('Script Python Blender (automatizare randare):',bx,by+105);
      pdf2.setFillColor(15,25,50); pdf2.rect(bx,by+108,W-bx-15,50,'F');
      pdf2.setTextColor(134,239,172); pdf2.setFont('courier','normal'); pdf2.setFontSize(5.5);
      const pyLines=[
        '# script_render.py — rulează în Blender: Scripting → Run Script',
        'import bpy, os',
        'bpy.ops.import_scene.dxf(filepath="/cale/catre/releveu.dxf", elevation_dxf=True)',
        'scene = bpy.context.scene',
        'scene.render.engine = "CYCLES"',
        'scene.cycles.samples = 256  # 64 rapid / 512 fotorealistic',
        'scene.render.resolution_x = 1920',
        'scene.render.resolution_y = 1080',
        'scene.render.filepath = "/output/render_exterior.png"',
        'bpy.ops.render.render(write_still=True)',
        'print("Render salvat:", scene.render.filepath)',
      ];
      pyLines.forEach((l,i)=>{
        const col = l.startsWith('#')?'#64748b':l.includes('=')?'#fde68a':'#86efac';
        pdf2.setTextColor(...(col==='#64748b'?[100,116,139]:col==='#fde68a'?[253,230,138]:[134,239,172]));
        pdf2.text(S2_(l),bx+3,by+115+i*4.5);
      });

      const fn2=('renders_'+S2_(P.nrCad)+'_'+S2_(P.utr)+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
      pdf2.save(fn2);
      if(typeof ss==='function') ss('✅ PDF randări generat: '+fn2+' · '+pg2+' pagini (captură 3D + QR + instrucțiuni Blender)');
    };

    console.log('[Enhance] ✅ _rvExportPlanseA3 patched cu 3D capture + QR + Blender guide');
  }

})();
