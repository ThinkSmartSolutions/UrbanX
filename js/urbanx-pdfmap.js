// ═══════════════════════════════════════════════════════════════════════════
// urbanx-pdfmap.js — MINI-HARTĂ VECTORIALĂ GENERICĂ în PDF (Masterplan/PMUD)
// Desenează direct în jsPDF: fundal PUG (gri, dacă există) + linii (autostrăzi/Via)
// + puncte colorate cu etichete + legendă + cadru. Reutilizat de toate capitolele
// cu date spațiale (risc, infra regională, turism, faună, proiecte, demografie) —
// ca tot ce apare pe harta din cinematic să apară și în documentele generate.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
// transliterare RO->ASCII (helvetica din mini-harta nu are diacritice)
var _DIA={'ă':'a','â':'a','î':'i','ș':'s','ş':'s','ț':'t','ţ':'t','Ă':'A','Â':'A','Î':'I','Ș':'S','Ş':'S','Ț':'T','Ţ':'T','—':'-','–':'-','·':'-'};
function asc(s){ return String(s==null?'':s).replace(/[ăâîșşțţĂÂÎȘŞȚŢ—–·]/g,function(c){return _DIA[c]||c;}); }
function hx(c){ if(Array.isArray(c))return c; c=String(c||'').replace('#',''); if(c.length===3)c=c.split('').map(function(x){return x+x;}).join(''); return [parseInt(c.substr(0,2),16)||120,parseInt(c.substr(2,2),16)||130,parseInt(c.substr(4,2),16)||150]; }
function ringsOf(geom){ var out=[]; try{ if(!geom)return out;
  if(geom.type==='Polygon'){ if(geom.coordinates[0]) out.push(geom.coordinates[0]); }
  else if(geom.type==='MultiPolygon'){ geom.coordinates.forEach(function(p){ if(p[0]) out.push(p[0]); }); } }catch(e){} return out; }

G._PdfMap = {
  // doc-level PUG (setat de generatorul MP/PMUD inainte de capitole)
  _pug: null,
  setPug: function(g){ this._pug = (g&&g.features&&g.features.length)? g : null; },

  // o: {x,y,w,h, title, points:[{lon,lat,c,label}], lines:[{coords:[[lon,lat]..],c}],
  //     legend:[[ [r,g,b], 'text' ]], cx, cy, pug(optional)}
  draw: function(pdf, o){
    if(!pdf || !o) return;
    var x=o.x, y=o.y, w=o.w, h=o.h;
    var pug = o.pug || this._pug;
    var pts=o.points||[], lines=o.lines||[];
    // ── bbox din PUG + puncte + linii ──
    var mnx=1e9,mny=1e9,mxx=-1e9,mxy=-1e9, any=false;
    function ext(lon,lat){ if(lon<mnx)mnx=lon; if(lon>mxx)mxx=lon; if(lat<mny)mny=lat; if(lat>mxy)mxy=lat; any=true; }
    if(pug){ var fs=pug.features; for(var i=0;i<fs.length;i+=Math.max(1,Math.floor(fs.length/250))){ ringsOf(fs[i].geometry).forEach(function(r){ for(var k=0;k<r.length;k+=5){ var p=r[k]; if(p&&p.length>=2) ext(p[0],p[1]); } }); } }
    pts.forEach(function(p){ if(p.lon!=null) ext(p.lon,p.lat); });
    lines.forEach(function(l){ (l.coords||[]).forEach(function(c){ ext(c[0],c[1]); }); });
    if(!any){ var cx=o.cx||27, cy=o.cy||47; mnx=cx-0.06;mxx=cx+0.06;mny=cy-0.04;mxy=cy+0.04; }
    // padding 8%
    var spanX=Math.max(1e-6,mxx-mnx), spanY=Math.max(1e-6,mxy-mny);
    mnx-=spanX*0.06; mxx+=spanX*0.06; mny-=spanY*0.06; mxy+=spanY*0.06;
    spanX=mxx-mnx; spanY=mxy-mny;
    var s=Math.min(w/spanX, h/spanY)*0.96;
    var ox=x+(w-spanX*s)/2, oy=y+(h-spanY*s)/2;
    function P(lon,lat){ return [ox+(lon-mnx)*s, oy+(mxy-lat)*s]; } // flip Y
    // ── fundal ──
    pdf.setFillColor(236,240,247); pdf.rect(x,y,w,h,'F');
    // ── PUG gri (silueta orasului) ──
    if(pug){ var fs2=pug.features, step=Math.max(1,Math.floor(fs2.length/500));
      pdf.setFillColor(205,213,224); pdf.setDrawColor(205,213,224); pdf.setLineWidth(0.1);
      for(var j=0;j<fs2.length;j+=step){ ringsOf(fs2[j].geometry).forEach(function(r){ if(r.length<3)return;
        var seg=[], rs=Math.max(1,Math.floor(r.length/36)), p0=null;
        for(var k=0;k<r.length;k+=rs){ var pt=r[k]; if(!pt||pt.length<2)continue; var mm=P(pt[0],pt[1]); if(!p0)p0=mm; else seg.push([mm[0]-prev[0],mm[1]-prev[1]]); var prev=mm; }
        try{ if(seg.length>2) pdf.lines(seg,p0[0],p0[1],[1,1],'F',true); }catch(e){}
      }); }
    }
    // ── linii (autostrazi / Via) ──
    lines.forEach(function(l){ var co=l.coords||[]; if(co.length<2)return;
      var rgb=l.rgb||hx(l.c); pdf.setDrawColor(rgb[0],rgb[1],rgb[2]); pdf.setLineWidth(l.w||0.9);
      for(var i=1;i<co.length;i++){ var a=P(co[i-1][0],co[i-1][1]), b=P(co[i][0],co[i][1]); pdf.line(a[0],a[1],b[0],b[1]); }
    });
    // ── puncte colorate ──
    pts.forEach(function(p){ if(p.lon==null)return; var mm=P(p.lon,p.lat); var rgb=p.rgb||hx(p.c);
      pdf.setFillColor(rgb[0],rgb[1],rgb[2]); pdf.setDrawColor(255,255,255); pdf.setLineWidth(0.3);
      pdf.circle(mm[0],mm[1], p.r||1.6, 'FD');
      if(p.label){ pdf.setTextColor(40,52,72); pdf.setFont('helvetica','normal'); pdf.setFontSize(5); pdf.text(asc(String(p.label)).slice(0,22), mm[0]+2, mm[1]+0.6); }
    });
    // ── cadru ──
    pdf.setDrawColor(170,180,196); pdf.setLineWidth(0.3); pdf.rect(x,y,w,h,'S');
    // ── titlu ──
    if(o.title){ pdf.setTextColor(40,52,72); pdf.setFont('helvetica','bold'); pdf.setFontSize(7.5); pdf.text(asc(o.title), x, y-1.5); }
    // ── legenda ──
    if(o.legend && o.legend.length){ var bx=x, ly=y+h+4; pdf.setFontSize(6); pdf.setFont('helvetica','normal');
      o.legend.forEach(function(it){ pdf.setFillColor(it[0][0],it[0][1],it[0][2]); pdf.rect(bx,ly-2.6,3,3,'F'); pdf.setTextColor(70,82,104); pdf.text(asc(it[1]),bx+4,ly); bx+=4+pdf.getTextWidth(it[1])+6; }); }
  }
};
console.log('[PdfMap] ✅ renderer mini-harta vectoriala incarcat');
})(window);
