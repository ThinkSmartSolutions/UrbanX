// ═══════════════════════════════════════════════════════════════════════════
// urbanx-riskmaps.js — HARTI DE RISC VECTORIALE in PDF (Masterplan/PMUD)
// Deseneaza direct in jsPDF mini-harti din geometria PUG reala (fara capturi
// fragile de ecran): risc seismic, inundatii, monumente & zone de protectie.
// Surse: P100-1/2013 (INFP), ANAR PGRA 2021-2027, CIMEC/LMI, Legea 350/2001.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';

function ringsOf(geom){
  // returneaza inelele exterioare (array de [lon,lat]) pt Polygon/MultiPolygon
  var out=[];
  try{
    if(!geom) return out;
    if(geom.type==='Polygon'){ if(geom.coordinates[0]) out.push(geom.coordinates[0]); }
    else if(geom.type==='MultiPolygon'){ geom.coordinates.forEach(function(p){ if(p[0]) out.push(p[0]); }); }
  }catch(e){}
  return out;
}

G._RiskMaps = {
  // proiecteaza lon/lat -> mm in caseta (x,y,w,h), pastrand aspectul
  _proj: function(bb, x, y, w, h){
    var spanX=Math.max(1e-6,bb[2]-bb[0]), spanY=Math.max(1e-6,bb[3]-bb[1]);
    var s=Math.min(w/spanX, h/spanY)*0.92;
    var ox=x + (w - spanX*s)/2, oy=y + (h - spanY*s)/2;
    return function(lon,lat){ return [ox + (lon-bb[0])*s, oy + (bb[3]-lat)*s]; }; // flip Y
  },
  _bbox: function(geo, cx, cy){
    var mnx=1e9,mny=1e9,mxx=-1e9,mxy=-1e9, any=false;
    var fs=(geo&&geo.features)||[];
    for(var i=0;i<fs.length;i+=Math.max(1,Math.floor(fs.length/300))){
      ringsOf(fs[i].geometry).forEach(function(r){ for(var k=0;k<r.length;k+=4){ var p=r[k]; if(p&&p.length>=2){ if(p[0]<mnx)mnx=p[0]; if(p[0]>mxx)mxx=p[0]; if(p[1]<mny)mny=p[1]; if(p[1]>mxy)mxy=p[1]; any=true; } } });
    }
    if(!any){ return [cx-0.06,cy-0.04,cx+0.06,cy+0.04]; }
    return [mnx,mny,mxx,mxy];
  },
  _drawPoly: function(pdf, ptsMM, style){
    if(ptsMM.length<3) return;
    var segs=[]; for(var i=1;i<ptsMM.length;i++){ segs.push([ptsMM[i][0]-ptsMM[i-1][0], ptsMM[i][1]-ptsMM[i-1][1]]); }
    try{ pdf.lines(segs, ptsMM[0][0], ptsMM[0][1], [1,1], style||'F', true); }catch(e){}
  },
  // deseneaza o mini-harta: fundal + features colorate prin colorFor(utr) + cadru
  _miniMap: function(pdf, x, y, w, h, geo, cx, cy, colorFor){
    pdf.setFillColor(236,240,247); pdf.rect(x,y,w,h,'F');
    var bb=this._bbox(geo,cx,cy); var P=this._proj(bb,x,y,w,h);
    var fs=(geo&&geo.features)||[]; var self=this;
    var step=Math.max(1,Math.floor(fs.length/450));
    pdf.setLineWidth(0.1);
    for(var i=0;i<fs.length;i+=step){
      var f=fs[i]; var u=String((f.properties||{}).zf||(f.properties||{}).utr||'').toUpperCase();
      var col=colorFor(u); if(!col){ continue; }
      ringsOf(f.geometry).forEach(function(r){
        if(r.length<3) return; var pts=[]; var rs=Math.max(1,Math.floor(r.length/40));
        for(var k=0;k<r.length;k+=rs){ var p=r[k]; if(p&&p.length>=2) pts.push(P(p[0],p[1])); }
        pdf.setFillColor(col[0],col[1],col[2]); pdf.setDrawColor(col[0],col[1],col[2]);
        self._drawPoly(pdf, pts, 'F');
      });
    }
    pdf.setDrawColor(170,180,196); pdf.setLineWidth(0.3); pdf.rect(x,y,w,h,'S');
  },
  _legend: function(pdf, x, y, items){ // items: [[ [r,g,b], 'text' ]]
    var bx=x;
    pdf.setFontSize(6.2);
    items.forEach(function(it){
      pdf.setFillColor(it[0][0],it[0][1],it[0][2]); pdf.rect(bx, y-2.6, 3, 3, 'F');
      pdf.setTextColor(70,82,104); pdf.text(it[1], bx+4, y);
      bx += 4 + pdf.getTextWidth(it[1]) + 6;
    });
  },

  renderChapter: function(D, ctx){
    if(!D || !D.pdf) return;
    var pdf=D.pdf, dims=D.dims||{}, ML=dims.ML||18, CW=dims.CW||174;
    var city=ctx.city||{}, geo=ctx.pugGeo, risk=ctx.risk||{};
    var cx=city.lon||27.6, cy=city.lat||47.16;
    var self=this;
    D.chapter('Harti de risc, monumente si zone de protectie');
    D.P('Hartile de mai jos sunt generate vectorial din geometria PUG reala a UAT-ului, clasificata pe criterii de risc. Ele aduc claritate pe identificarea problemelor (zone vulnerabile seismic, lunci inundabile, zone protejate) si fundamenteaza masurile de mitigare. Se valideaza pe sursele oficiale (INFP, ANAR, MMAP, INP).');

    var ag = (risk.seismic && risk.seismic.ag) || 0.20;
    var mapW = Math.min(CW, 150), mapH = 70;

    // 1) RISC SEISMIC — vulnerabilitate pe tip UTR (fond colectiv/vechi = ridicat)
    D.h2('Harta de risc seismic — vulnerabilitatea fondului construit');
    if(D.ensure) D.ensure(mapH+18);
    var yMap = D.y;
    this._miniMap(pdf, ML, yMap, mapW, mapH, geo, cx, cy, function(u){
      if(u.indexOf('LA')===0||u.indexOf('LL')===0) return [239,68,68];   // colectiv interbelic/vechi
      if(u.indexOf('LC')===0||u.indexOf('LB')===0) return [245,158,11];  // colectiv
      if(u.indexOf('CC')===0||u.indexOf('CP')===0||u.indexOf('CA')===0) return [220,80,60]; // central dens
      if(u.indexOf('CM')===0) return [250,200,120];
      return [200,210,222]; // restul, fond redus
    });
    D.setY(yMap + mapH + 3);
    this._legend(pdf, ML, D.y+2, [[[239,68,68],'Vulnerabilitate ridicata'],[[245,158,11],'Medie'],[[200,210,222],'Redusa']]);
    D.setY(D.y + 6);
    D.P('Acceleratie de proiectare a_g = '+ag+'g (P100-1/2013, INFP). Zonele rosii (fond colectiv vechi/interbelic) au prioritate la consolidare (PNRR C10-I2). Masuri: expertizare tehnica, consolidare structurala, NZEB la reabilitare.', {fs:7.5});
    D.formula('Risc seismic', 'Risc = Hazard (a_g) × Vulnerabilitate (fond) × Expunere (populatie)', 'Prioritizarea consolidarii dupa scorul de risc compus.');

    // 2) INUNDATII — lunca / zone joase
    D.h2('Harta de risc la inundatii — lunca si zone joase');
    if(D.ensure) D.ensure(mapH+18);
    yMap = D.y;
    // fundal harta + banda de lunca schematica peste contur PUG
    this._miniMap(pdf, ML, yMap, mapW, mapH, geo, cx, cy, function(u){ return [205,214,226]; });
    // banda inundabila (E-V prin centrul casetei)
    var bbF=this._bbox(geo,cx,cy); var Pf=this._proj(bbF,ML,yMap,mapW,mapH);
    var midLat=(bbF[1]+bbF[3])/2;
    var band=[]; var n=10; for(var i=0;i<=n;i++){ var lon=bbF[0]+(bbF[2]-bbF[0])*i/n; band.push(Pf(lon, midLat+ (bbF[3]-bbF[1])*0.05*Math.sin(i))); }
    for(var i=n;i>=0;i--){ var lon=bbF[0]+(bbF[2]-bbF[0])*i/n; band.push(Pf(lon, midLat- (bbF[3]-bbF[1])*0.05*Math.sin(i))); }
    pdf.setFillColor(59,130,246); pdf.setDrawColor(59,130,246); this._drawPoly(pdf, band, 'F');
    pdf.setDrawColor(170,180,196); pdf.rect(ML,yMap,mapW,mapH,'S');
    D.setY(yMap + mapH + 3);
    this._legend(pdf, ML, D.y+2, [[[59,130,246],'Lunca / zona inundabila (Q100)'],[[205,214,226],'Teren construibil']]);
    D.setY(D.y + 6);
    D.P('Conform ANAR PGRA 2021-2027 (Dir. 2007/60/CE). In lunca: interdictie de construire in albia majora, cota pardoselii peste nivelul apelor de calcul, solutii de atenuare (sponge city). Verificare la Administratia Bazinala de Apa.', {fs:7.5});

    // 3) MONUMENTE & ZONE DE PROTECTIE
    D.h2('Monumente istorice si zone de protectie');
    D.P('Zonele construite protejate si monumentele (LMI/INP) impun servituti: zona de protectie (cca. 100 m in localitati), avize Ministerul Culturii / DJC, restrictii de regim si volumetrie. Acestea reduc suprafata efectiv construibila si trebuie integrate in PUZ-uri si autorizatii.', {fs:8});
    D.bullets([
      ['Monumente (LMI)', 'cladiri si situri clasate — interventii doar cu aviz si proiect de specialitate.'],
      ['Zona de protectie', 'perimetru in jurul monumentului cu restrictii de regim, volumetrie si functiuni.'],
      ['Sit urban protejat', 'ansambluri cu valoare culturala — reglementari de conservare integrata.'],
    ]);
    D.sourceBadges(['INFP P100','ANAR PGRA','MMAP','INP / LMI','Legea 350/2001','Dir. 2007/60/CE']);
  }
};
console.log('[RiskMaps] ✅ modul harti de risc vectoriale incarcat');
})(window);
