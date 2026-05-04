// UrbanX — Design system PDF - _initStudyPdf
// Fix: auto-paginare pentru body, sec, tblRow, bullet, concluzii

function _initStudyPdf(studyName, studySubtitle, totalPages){
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const W=210,H=297;

  // Paleta rafinata
  const DARK=[5,14,30],DARK2=[11,24,50],NAVY=[14,36,72];
  const GOLD=[196,146,6],GOLD2=[228,182,48],GOLD3=[245,210,100];
  const BLUE=[20,50,98],BLUE2=[32,70,136],TEAL=[0,118,120];
  const LIGHT=[248,250,253],LIGHT2=[240,244,250],LIGHT3=[232,238,248];
  const RED=[158,20,20],GREEN=[14,100,50],ORANGE=[168,76,4],PURPLE=[68,28,148];
  const GRAY=[90,104,120],GRAY2=[138,150,166],GRAY3=[200,208,220],GRAY4=[226,230,238];
  const WHITE=[255,255,255];

  const S2=t=>_pdfSafe(t);
  const dateStr=new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'});
  const ap=S.parcels[S.activeParcel??0];
  const nrcad=ap?.nrcad||'\u2014';
  const utr=ap?.utr||'\u2014';
  const area=ap?.area?ap.area.toFixed(0):'\u2014';
  const lat=ap?turf.centerOfMass(ap.geo).geometry.coordinates[1]:47.16;
  const lon=ap?turf.centerOfMass(ap.geo).geometry.coordinates[0]:27.59;
  const params=ap?.params||getDefaultParams(utr);
  const uat=getUATLabel();
  const judet=getUATJudet();

  // ── Stare auto-paginare ──────────────────────────────────────────────────
  // Contextul secțiunii curente — setat de studii la fiecare pagină nouă
  let _ctxTitle = '';
  let _ctxPage  = '';
  // Limita inferioară a zonei de conținut (deasupra footer-ului + margine)
  const YMAX = H - 18;
  // Începutul zonei de conținut (sub header)
  const YTOP_HDR  = 33;  // pagini cu header complet
  const YTOP_CONT = 15;  // pagini de continuare (fără header)

  // Pagină de continuare automată — fără header, cu footer și bandă minimă
  const _autoPage = () => {
    pdf.addPage();
    pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');
    // Bandă subtilă de continuare
    pdf.setFillColor(...DARK); pdf.rect(0,0,W,7,'F');
    pdf.setFillColor(...GOLD); pdf.rect(0,0,W,1,'F');
    if(_ctxTitle){
      pdf.setTextColor(...GOLD2); pdf.setFontSize(6); pdf.setFont('helvetica','italic');
      pdf.text('continuare \u2014 '+S2(_ctxTitle),W/2,5,{align:'center'});
    }
    ftr();
    return YTOP_CONT;
  };

  // Verifică dacă mai e loc pentru `needed` mm; dacă nu, adaugă pagină automată
  const _checkY = (y, needed) => {
    if(y + (needed||12) > YMAX) return _autoPage();
    return y;
  };

  // Header rafinat 28mm
  const hdr=(title,pg)=>{
    // Salvăm contextul pentru paginile automate de continuare
    _ctxTitle = title;
    _ctxPage  = pg;
    pdf.setFillColor(...DARK);pdf.rect(0,0,W,28,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,0,W,2.5,'F');
    pdf.setFillColor(...GOLD2);pdf.rect(0,27,W,1,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,2.5,3.5,25.5,'F');
    try{_pdfDrawLogo&&_pdfDrawLogo(pdf,8,7,13);}catch(e){}
    pdf.setTextColor(...GOLD);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
    pdf.text('URBANX',9,9.5);
    pdf.setDrawColor(...GOLD2);pdf.setLineWidth(0.4);pdf.line(34,5,34,24);
    pdf.setTextColor(...GOLD3);pdf.setFontSize(6.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(studyName.toUpperCase()),38,9.5);
    pdf.setTextColor(170,185,210);pdf.setFontSize(6);pdf.setFont('helvetica','normal');
    pdf.text(S2(uat)+' \u00b7 jud. '+S2(judet)+' \u00b7 Nr.cad '+S2(nrcad)+' \u00b7 UTR '+S2(utr),38,15);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(title),W/2,22,{align:'center'});
    pdf.setTextColor(...GOLD2);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('Pag. '+pg+' / '+totalPages,W-8,22,{align:'right'});
  };

  // Footer elegant 10mm
  const ftr=()=>{
    pdf.setFillColor(...DARK);pdf.rect(0,H-10,W,10,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,H-10,W,0.8,'F');
    pdf.setTextColor(...GOLD2);pdf.setFontSize(6.5);pdf.setFont('helvetica','bold');
    pdf.text('URBANX',8,H-3.5);
    pdf.setTextColor(160,175,200);pdf.setFontSize(5.8);pdf.setFont('helvetica','normal');
    pdf.text(S2(studySubtitle)+' \u00b7 '+S2(uat)+' \u00b7 Parcela '+S2(nrcad)+' \u00b7 '+S2(dateStr),W/2,H-3.5,{align:'center'});
    pdf.setTextColor(100,118,140);pdf.setFontSize(5.5);
    pdf.text('Document orientativ \u00b7 UrbanX TSS\u00b7FG',W-8,H-3.5,{align:'right'});
  };

  // Sectiune principala navy + gold — cu verificare pagina
  const sec=(title,y,col)=>{
    // Trebuie loc pentru header sectiune (9mm) + minim 20mm continut
    y = _checkY(y, 9 + 20);
    const bg=col||NAVY;
    pdf.setFillColor(...bg);pdf.rect(14,y,W-28,9,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,y,3,9,'F');
    pdf.setFillColor(...GOLD2);pdf.rect(14,y+9,W-28,0.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(title.toUpperCase()),20,y+6.2);
    return y+14;
  };

  // Subsectiune — cu verificare pagina
  const subsec=(title,y,col)=>{
    y = _checkY(y, 7.5 + 15);
    pdf.setFillColor(...(col||LIGHT3));pdf.rect(14,y,W-28,7.5,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,y,2,7.5,'F');
    pdf.setTextColor(...(col?WHITE:BLUE));pdf.setFontSize(8);pdf.setFont('helvetica','bold');
    pdf.text(S2(title),19,y+5.2);
    return y+11;
  };

  // Body text — auto-continuare linie cu linie pe pagini noi
  const body=(txt,x,y,maxW,fontSize,lineH)=>{
    pdf.setTextColor(24,36,54);pdf.setFont('helvetica','normal');
    const fs=fontSize||8.5, lh=lineH||(fs*0.60), mx=maxW||(W-28), ox=x||14;
    const lines=pdf.splitTextToSize(S2(txt),mx);
    for(let i=0;i<lines.length;i++){
      // Verificăm înainte de fiecare linie
      y = _checkY(y, lh + 1);
      const line=lines[i];
      pdf.setFontSize(fs);
      const isLast=i===lines.length-1;
      if(!isLast&&line.trim().length>0){
        const words=line.split(' ').filter(w=>w.length>0);
        if(words.length>1){
          const textW=pdf.getTextWidth(words.join(''));
          const spW=(mx-textW)/(words.length-1);
          let cx=ox;
          words.forEach(w=>{pdf.text(w,cx,y);cx+=pdf.getTextWidth(w)+spW;});
          y+=lh; continue;
        }
      }
      pdf.text(line,ox,y);
      y+=lh;
    }
    return y+3;
  };

  // Tabel randuri — verificare pagina per rand
  const tblRow=(cols,y,isHeader,colW)=>{
    const fs=isHeader?7.5:8,lineH=5;
    let maxLines=1;
    cols.forEach((c,ci)=>{
      if(!colW[ci]) return;
      const lines=pdf.splitTextToSize(S2(String(c??'\u2014')),Math.max(5,colW[ci]-4));
      maxLines=Math.max(maxLines,lines.length);
    });
    const rowH=Math.max(isHeader?8.5:8,maxLines*lineH+(isHeader?3:2));
    // Verifică înainte de a desena rândul
    y = _checkY(y, rowH + 2);
    const bg=isHeader?NAVY:(y%2===0?LIGHT:LIGHT2);
    pdf.setFillColor(...bg);pdf.rect(14,y-5.5,W-28,rowH,'F');
    if(isHeader){
      pdf.setFillColor(...GOLD);pdf.rect(14,y-5.5,3,rowH,'F');
      pdf.setFillColor(...GOLD2);pdf.rect(14,y-5.5+rowH,W-28,0.4,'F');
    } else {
      pdf.setDrawColor(...GRAY4);pdf.setLineWidth(0.15);pdf.line(14,y-5.5+rowH,W-14,y-5.5+rowH);
    }
    cols.forEach((c,ci)=>{
      const cw=colW[ci];if(!cw)return; // skip col if no width defined
      const xc=14+colW.slice(0,ci).reduce((a,b)=>a+(b||0),0)+(isHeader&&ci===0?5:3);
      if(isNaN(xc)||xc<0||xc>200)return; // guard NaN coordinates
      pdf.setFontSize(fs);pdf.setFont('helvetica',isHeader?'bold':'normal');
      pdf.setTextColor(...(isHeader?GOLD3:[26,38,56]));
      const lines=pdf.splitTextToSize(S2(String(c??'\u2014')),Math.max(5,cw-5));
      lines.forEach((l,li)=>pdf.text(l,xc,y+li*lineH));
    });
    return y+rowH;
  };

  // Card KPI
  const kv=(label,val,x,y,w,accentCol)=>{
    const bw=w||42,bh=18;
    pdf.setFillColor(...DARK2);pdf.rect(x,y,bw,bh,'F');
    pdf.setFillColor(...(accentCol||GOLD));pdf.rect(x,y,bw,2,'F');
    pdf.setTextColor(...(accentCol||GOLD3));pdf.setFontSize(6.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(label).toUpperCase(),x+3,y+7);
    pdf.setTextColor(255,255,255);pdf.setFontSize(10.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(String(val??'\u2014')).substring(0,18),x+3,y+14.5);
    return y+bh+4;
  };

  // Badge
  const badge=(txt,x,y,col,w2)=>{
    const bw=w2||38;
    pdf.setFillColor(...col);pdf.rect(x,y-6.5,bw,7.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(txt),x+bw/2,y-0.5,{align:'center'});
    return y+4;
  };

  // Separator
  const divider=(y,col,thickness)=>{
    y = _checkY(y, 5);
    pdf.setDrawColor(...(col||GRAY3));pdf.setLineWidth(thickness||0.3);
    pdf.line(14,y,W-14,y);return y+5;
  };

  // Bullet list — auto-continuare per item
  const bullet=(items,x,y,col)=>{
    const ox=(x||14)+6,maxW=W-ox-14;
    items.forEach(item=>{
      const lines=pdf.splitTextToSize(S2(item),maxW);
      const needed=lines.length*5.3+5;
      y = _checkY(y, needed);
      pdf.setFillColor(...(col||GOLD));pdf.circle((x||14)+2,y-1,1,'F');
      pdf.setTextColor(24,38,58);pdf.setFontSize(8.5);pdf.setFont('helvetica','normal');
      const lh=5.3;
      lines.forEach((l,i)=>{
        const isLast=i===lines.length-1;
        pdf.setFontSize(8.5);
        if(!isLast&&l.trim().length>0){
          const words=l.split(' ').filter(w=>w.length>0);
          if(words.length>1){
            const tw=pdf.getTextWidth(words.join(''));
            const sw=(maxW-tw)/(words.length-1);
            let cx=ox;
            words.forEach(w=>{pdf.text(w,cx,y+i*lh);cx+=pdf.getTextWidth(w)+sw;});
            return;
          }
        }
        pdf.text(l,ox,y+i*lh);
      });
      y+=lines.length*lh+4;
    });
    return y+3;
  };

  // Concluzii numerotate — auto-continuare per item
  const concluzii=(items,y)=>{
    items.forEach((item,i)=>{
      const lh=5.3,lines=pdf.splitTextToSize(S2(item),W-38);
      const needed=lines.length*lh+5;
      y = _checkY(y, needed);
      pdf.setFillColor(...GOLD);pdf.roundedRect(14,y-4,7,7,1,1,'F');
      pdf.setTextColor(...DARK);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
      pdf.text(String(i+1),17.5,y+0.8,{align:'center'});
      lines.forEach((l,li)=>{
        const isLast=li===lines.length-1;
        pdf.setTextColor(24,38,56);pdf.setFontSize(8.5);pdf.setFont('helvetica','normal');
        if(!isLast&&l.trim().length>0){
          const words=l.split(' ').filter(w=>w.length>0);
          if(words.length>1){
            const tw=pdf.getTextWidth(words.join(''));
            const sw=((W-38)-tw)/(words.length-1);
            let cx=24;
            words.forEach(w=>{pdf.text(w,cx,y+li*lh);cx+=pdf.getTextWidth(w)+sw;});
            return;
          }
        }
        pdf.text(l,24,y+li*lh);
      });
      y+=lines.length*lh+5;
    });
    return y+5;
  };

  // Caseta semnaturi
  const sign=()=>{
    const sy=H-75;
    pdf.setFillColor(...DARK2);pdf.rect(14,sy,W-28,62,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,sy,W-28,2.5,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,sy,2.5,62,'F');
    pdf.setTextColor(...GOLD3);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
    pdf.text('CASETA DE ELABORARE, VERIFICARE SI ASUMARE A RESPONSABILITATII',W/2,sy+10,{align:'center'});
    pdf.setDrawColor(...GOLD2);pdf.setLineWidth(0.3);pdf.line(17,sy+13,W-17,sy+13);
    const roles=['ELABORAT','VERIFICAT','BENEFICIAR / INVESTITOR'];
    const roleColors=[BLUE,GREEN,ORANGE];
    roles.forEach((r,i)=>{
      const cw=(W-28)/3,cx=14+i*cw;
      pdf.setFillColor(...roleColors[i]);pdf.rect(cx,sy+14,cw,7,'F');
      pdf.setTextColor(255,255,255);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
      pdf.text(r,cx+cw/2,sy+19,{align:'center'});
    });
    const infos=[['Specialist UrbanX TSS\u00b7FG','\u2014','\u2014'],['Nr. lic./atestat: \u2014','\u2014','Beneficiar: \u2014'],['Data: '+dateStr,'Data: \u2014','Data: \u2014']];
    infos.forEach((row,ri)=>row.forEach((v,ci)=>{
      const cw=(W-28)/3,cx=16+ci*cw;
      pdf.setTextColor(...GRAY2);pdf.setFontSize(7);pdf.setFont('helvetica','normal');
      pdf.text(S2(v),cx,sy+27+ri*6);
    }));
    for(let i=0;i<3;i++){
      const cw=(W-28)/3,cx=14+i*cw+3;
      pdf.setDrawColor(...GRAY3);pdf.setLineWidth(0.3);pdf.line(cx,sy+52,cx+cw-6,sy+52);
      pdf.setFontSize(6);pdf.setTextColor(...GRAY2);
      pdf.text('Semnatura si stampila',cx,sy+56.5);
    }
    pdf.setFillColor(...RED);pdf.rect(14,sy+59,W-28,5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(5.8);pdf.setFont('helvetica','bold');
    pdf.text('Document orientativ si preliminar. Nu inlocuieste documentatiile tehnice avizate conf. Legii 50/1991 si Legii 350/2001. UrbanX TSS-FG',W/2,sy+62.5,{align:'center'});
  };

  // Coperta premium
  const cover=(subtitle2,coverImg,kpiRows,statusOk,statusText)=>{
    pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(...DARK2);pdf.rect(0,H*0.40,W,H*0.60,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
    pdf.setFillColor(...BLUE);pdf.rect(0,3,5,H-6,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,3,2.5,H-6,'F');
    try{_pdfDrawLogo&&_pdfDrawLogo(pdf,W/2-14,15,28);}catch(e){
      pdf.setTextColor(...GOLD);pdf.setFontSize(32);pdf.setFont('helvetica','bold');pdf.text('UrbanX',W/2,44,{align:'center'});
    }
    pdf.setTextColor(...GOLD2);pdf.setFontSize(8);pdf.setFont('helvetica','bold');
    pdf.text('URBANX - PLATFORMA NATIONALA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
    pdf.setFillColor(...GOLD);pdf.rect(W/2-40,54,80,1,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(20);pdf.setFont('helvetica','bold');
    pdf.text(S2(studyName.toUpperCase()),W/2,67,{align:'center'});
    if(subtitle2){
      pdf.setTextColor(...GOLD2);pdf.setFontSize(10);pdf.setFont('helvetica','normal');
      pdf.text(S2(subtitle2),W/2,76,{align:'center'});
    }
    pdf.setFillColor(...GOLD2);pdf.rect(W/2-50,80,100,0.5,'F');
    const hasImg=coverImg&&coverImg.length>500;
    if(hasImg){
      try{
        pdf.setFillColor(...GOLD);pdf.rect(18,84,W-38,76,'F');
        pdf.addImage(coverImg,'JPEG',19,85,W-40,74,undefined,'FAST');
        pdf.setFillColor(5,14,30);
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.75}));}catch(e2){}
        pdf.rect(19,85+74-8,W-40,8,'F');
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e2){}
        pdf.setTextColor(...GOLD2);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
        pdf.text('Vedere 3D amplasament \u00b7 '+S2(uat)+' \u00b7 Nr.cad. '+S2(nrcad),W/2,85+74-1.5,{align:'center'});
      }catch(e){}
    }
    const by=hasImg?168:86;
    pdf.setFillColor(...DARK2);pdf.rect(14,by,W-28,70,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,by,W-28,2,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,by,2,70,'F');
    pdf.setTextColor(...GOLD3);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
    pdf.text('DATE DE IDENTIFICARE',W/2,by+8,{align:'center'});
    pdf.setDrawColor(...GOLD2);pdf.setLineWidth(0.25);pdf.line(16,by+11,W-16,by+11);
    const kpis=[['Nr. cadastral',nrcad],['UAT / Localitate',uat],['Jude\u0163',judet],['Suprafa\u021b\u0103 teren',area+' mp'],
      ['Zon\u0103 UTR',utr],['Regim H max',params?.h?params.h+'m':'\u2014'],...(kpiRows||[]),
      ['Coordonate GPS',lat.toFixed(5)+'\u00b0N, '+lon.toFixed(5)+'\u00b0E'],['Data elaborare',dateStr]];
    const kColW=(W-32)/2;
    kpis.slice(0,12).forEach(([l,v],i)=>{
      const col=i%2,row=Math.floor(i/2),kx=15+col*kColW,ky=by+16+row*11;
      if(ky>by+66) return;
      if(col===0&&row>0){pdf.setDrawColor(20,36,68);pdf.setLineWidth(0.15);pdf.line(16,ky-3,W-16,ky-3);}
      pdf.setTextColor(148,168,200);pdf.setFontSize(6.5);pdf.setFont('helvetica','bold');
      pdf.text(S2(l)+':',kx+2,ky);
      pdf.setTextColor(255,255,255);pdf.setFontSize(8);pdf.setFont('helvetica','bold');
      pdf.text(S2(String(v??'\u2014')).substring(0,34),kx+2,ky+5);
    });
    if(statusText){
      const barY=by+68;
      pdf.setFillColor(...(statusOk!==false?GREEN:RED));pdf.rect(14,barY,W-28,8,'F');
      pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont('helvetica','bold');
      pdf.text(S2(statusText),W/2,barY+5.5,{align:'center'});
    }
    pdf.setTextColor(90,110,140);pdf.setFontSize(6.5);pdf.setFont('helvetica','normal');
    pdf.text('Generat: '+S2(dateStr)+' \u00b7 Document cu caracter ORIENTATIV \u00b7 UrbanX TSS-FG',W/2,H-8,{align:'center'});
    ftr();
  };

  // Imagine cu border si caption
  const addImg=(img,x,y,w,h2,caption)=>{
    // Verifică dacă imaginea + caption încap pe pagina curentă
    const needed = h2 + (caption ? 8 : 4);
    y = _checkY(y, needed);
    if(!img||img.length<500){
      pdf.setFillColor(...LIGHT3);pdf.rect(x,y,w,h2,'F');
      pdf.setDrawColor(...GRAY3);pdf.setLineWidth(0.3);pdf.rect(x,y,w,h2,'S');
      pdf.setTextColor(...GRAY2);pdf.setFontSize(8);pdf.setFont('helvetica','italic');
      pdf.text('Captur\u0103 indisponibil\u0103',x+w/2,y+h2/2,{align:'center'});
      if(caption){pdf.setFontSize(6);pdf.setTextColor(...GRAY);pdf.text(S2(caption),x+2,y+h2+3.5);return y+h2+8;}
      return y+h2+4;
    }
    const fmt=img.startsWith('data:image/png')?'PNG':'JPEG';
    try{
      pdf.setFillColor(...DARK);pdf.rect(x-0.8,y-0.8,w+1.6,h2+1.6,'F');
      pdf.addImage(img,fmt,x,y,w,h2,undefined,'FAST');
      if(caption){
        pdf.setFillColor(...DARK);
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.80}));}catch(e2){}
        pdf.rect(x,y+h2-7,w,7,'F');
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e2){}
        pdf.setTextColor(...GOLD2);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
        pdf.text(S2(caption),x+2,y+h2-1.8);
      }
    }catch(e){
      pdf.setFillColor(...LIGHT3);pdf.rect(x,y,w,h2,'F');
      pdf.setTextColor(...GRAY2);pdf.setFontSize(7);pdf.text('Captur\u0103 indisponibil\u0103',x+w/2,y+h2/2,{align:'center'});
    }
    return y+h2+4;
  };

  // newPage și checkY — compatibilitate cu studiile existente
  const newPage=(title,pgNum)=>{
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    if(title&&pgNum) hdr(title,pgNum);
    ftr();return YTOP_HDR;
  };
  const checkY=(y,needed,title,pgNum)=>{
    if(y+(needed||20)>YMAX){
      if(title&&pgNum) return newPage(title,pgNum);
      return _autoPage();
    }
    return y;
  };
  // smartPage — pagină nouă DOAR dacă pagina curentă e suficient de plină (>80mm conținut)
  // Folosit în studii pentru a evita pagini pe jumătate când conținut dinamic lipsește
  // Dacă cy < 80, NU adaugă pagină nouă — continuă pe aceeași pagină
  const smartPage=(cy,title,pgNum,minUsed)=>{
    const minY = minUsed||80; // min mm folosiți pe pagina curentă înainte să sară
    if(cy < minY){
      // Pagina e aproape goală — nu adăugăm pagină nouă, doar un separator
      return cy + 8;
    }
    return newPage(title, pgNum);
  };

  return {
    pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,GOLD3,BLUE,BLUE2,TEAL,LIGHT,LIGHT2,LIGHT3,
    RED,GREEN,ORANGE,PURPLE,GRAY,GRAY2,GRAY3,GRAY4,WHITE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,addImg,kv,badge,divider,bullet,concluzii,sign,cover,newPage,checkY,smartPage
  };
}

function _initStudyPdf(studyName, studySubtitle, totalPages){
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const W=210,H=297;

  // Paleta rafinata
  const DARK=[5,14,30],DARK2=[11,24,50],NAVY=[14,36,72];
  const GOLD=[196,146,6],GOLD2=[228,182,48],GOLD3=[245,210,100];
  const BLUE=[20,50,98],BLUE2=[32,70,136],TEAL=[0,118,120];
  const LIGHT=[248,250,253],LIGHT2=[240,244,250],LIGHT3=[232,238,248];
  const RED=[158,20,20],GREEN=[14,100,50],ORANGE=[168,76,4],PURPLE=[68,28,148];
  const GRAY=[90,104,120],GRAY2=[138,150,166],GRAY3=[200,208,220],GRAY4=[226,230,238];
  const WHITE=[255,255,255];

  const S2=t=>_pdfSafe(t);
  const dateStr=new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'});
  const ap=S.parcels[S.activeParcel??0];
  const nrcad=ap?.nrcad||'\u2014';
  const utr=ap?.utr||'\u2014';
  const area=ap?.area?ap.area.toFixed(0):'\u2014';
  const lat=ap?turf.centerOfMass(ap.geo).geometry.coordinates[1]:47.16;
  const lon=ap?turf.centerOfMass(ap.geo).geometry.coordinates[0]:27.59;
  const params=ap?.params||getDefaultParams(utr);
  const uat=getUATLabel();
  const judet=getUATJudet();

  // Header rafinat 28mm
  const hdr=(title,pg)=>{
    pdf.setFillColor(...DARK);pdf.rect(0,0,W,28,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,0,W,2.5,'F');
    pdf.setFillColor(...GOLD2);pdf.rect(0,27,W,1,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,2.5,3.5,25.5,'F');
    try{_pdfDrawLogo&&_pdfDrawLogo(pdf,8,7,13);}catch(e){}
    pdf.setTextColor(...GOLD);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
    pdf.text('URBANX',9,9.5);
    pdf.setDrawColor(...GOLD2);pdf.setLineWidth(0.4);pdf.line(34,5,34,24);
    pdf.setTextColor(...GOLD3);pdf.setFontSize(6.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(studyName.toUpperCase()),38,9.5);
    pdf.setTextColor(170,185,210);pdf.setFontSize(6);pdf.setFont('helvetica','normal');
    pdf.text(S2(uat)+' \u00b7 jud. '+S2(judet)+' \u00b7 Nr.cad '+S2(nrcad)+' \u00b7 UTR '+S2(utr),38,15);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(title),W/2,22,{align:'center'});
    pdf.setTextColor(...GOLD2);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
    pdf.text('Pag. '+pg+' / '+totalPages,W-8,22,{align:'right'});
  };

  // Footer elegant 10mm
  const ftr=()=>{
    pdf.setFillColor(...DARK);pdf.rect(0,H-10,W,10,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,H-10,W,0.8,'F');
    pdf.setTextColor(...GOLD2);pdf.setFontSize(6.5);pdf.setFont('helvetica','bold');
    pdf.text('URBANX',8,H-3.5);
    pdf.setTextColor(160,175,200);pdf.setFontSize(5.8);pdf.setFont('helvetica','normal');
    pdf.text(S2(studySubtitle)+' \u00b7 '+S2(uat)+' \u00b7 Parcela '+S2(nrcad)+' \u00b7 '+S2(dateStr),W/2,H-3.5,{align:'center'});
    pdf.setTextColor(100,118,140);pdf.setFontSize(5.5);
    pdf.text('Document orientativ \u00b7 UrbanX TSS\u00b7FG',W-8,H-3.5,{align:'right'});
  };

  // Sectiune principala navy + gold
  const sec=(title,y,col)=>{
    const bg=col||NAVY;
    pdf.setFillColor(...bg);pdf.rect(14,y,W-28,9,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,y,3,9,'F');
    pdf.setFillColor(...GOLD2);pdf.rect(14,y+9,W-28,0.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(title.toUpperCase()),20,y+6.2);
    return y+14;
  };

  // Subsectiune
  const subsec=(title,y,col)=>{
    pdf.setFillColor(...(col||LIGHT3));pdf.rect(14,y,W-28,7.5,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,y,2,7.5,'F');
    pdf.setTextColor(...(col?WHITE:BLUE));pdf.setFontSize(8);pdf.setFont('helvetica','bold');
    pdf.text(S2(title),19,y+5.2);
    return y+11;
  };

  // Body text justify
  const body=(txt,x,y,maxW,fontSize,lineH)=>{
    if(y>H-20) return y;
    pdf.setTextColor(24,36,54);pdf.setFont('helvetica','normal');
    const fs=fontSize||8.5,lh=lineH||(fs*0.66),mx=maxW||(W-28),ox=x||14;
    const lines=pdf.splitTextToSize(S2(txt),mx);
    lines.forEach((line,i)=>{
      pdf.setFontSize(fs);
      const isLast=i===lines.length-1;
      if(!isLast&&line.trim().length>0){
        const words=line.split(' ').filter(w=>w.length>0);
        if(words.length>1){
          const textW=pdf.getTextWidth(words.join(''));
          const spW=(mx-textW)/(words.length-1);
          let cx=ox;
          words.forEach(w=>{pdf.text(w,cx,y+i*lh);cx+=pdf.getTextWidth(w)+spW;});
          return;
        }
      }
      pdf.text(line,ox,y+i*lh);
    });
    return y+lines.length*lh+3;
  };

  // Tabel cu randuri dinamice - fara trunchiere
  const tblRow=(cols,y,isHeader,colW)=>{
    const fs=isHeader?7.5:8,lineH=5;
    let maxLines=1;
    cols.forEach((c,ci)=>{
      if(!colW[ci]) return;
      const lines=pdf.splitTextToSize(S2(String(c??'\u2014')),colW[ci]-4);
      maxLines=Math.max(maxLines,lines.length);
    });
    const rowH=Math.max(isHeader?8.5:8,maxLines*lineH+(isHeader?3:2));
    const bg=isHeader?NAVY:(y%2===0?LIGHT:LIGHT2);
    pdf.setFillColor(...bg);pdf.rect(14,y-5.5,W-28,rowH,'F');
    if(isHeader){
      pdf.setFillColor(...GOLD);pdf.rect(14,y-5.5,3,rowH,'F');
      pdf.setFillColor(...GOLD2);pdf.rect(14,y-5.5+rowH,W-28,0.4,'F');
    } else {
      pdf.setDrawColor(...GRAY4);pdf.setLineWidth(0.15);pdf.line(14,y-5.5+rowH,W-14,y-5.5+rowH);
    }
    cols.forEach((c,ci)=>{
      const x=14+colW.slice(0,ci).reduce((a,b)=>a+b,0)+(isHeader&&ci===0?5:3);
      pdf.setFontSize(fs);pdf.setFont('helvetica',isHeader?'bold':'normal');
      pdf.setTextColor(...(isHeader?GOLD3:[26,38,56]));
      const lines=pdf.splitTextToSize(S2(String(c??'\u2014')),colW[ci]-5);
      lines.forEach((l,li)=>pdf.text(l,x,y+li*lineH));
    });
    return y+rowH;
  };

  // Card KPI
  const kv=(label,val,x,y,w,accentCol)=>{
    const bw=w||42,bh=18;
    pdf.setFillColor(...DARK2);pdf.rect(x,y,bw,bh,'F');
    pdf.setFillColor(...(accentCol||GOLD));pdf.rect(x,y,bw,2,'F');
    pdf.setTextColor(...(accentCol||GOLD3));pdf.setFontSize(6.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(label).toUpperCase(),x+3,y+7);
    pdf.setTextColor(255,255,255);pdf.setFontSize(10.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(String(val??'\u2014')).substring(0,18),x+3,y+14.5);
    return y+bh+4;
  };

  // Badge
  const badge=(txt,x,y,col,w2)=>{
    const bw=w2||38;
    pdf.setFillColor(...col);pdf.rect(x,y-6.5,bw,7.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
    pdf.text(S2(txt),x+bw/2,y-0.5,{align:'center'});
    return y+4;
  };

  // Separator
  const divider=(y,col,thickness)=>{
    pdf.setDrawColor(...(col||GRAY3));pdf.setLineWidth(thickness||0.3);
    pdf.line(14,y,W-14,y);return y+5;
  };

  // Bullet list complet
  const bullet=(items,x,y,col)=>{
    const ox=(x||14)+6,maxW=W-ox-14;
    items.forEach(item=>{
      if(y>H-20) return;
      pdf.setFillColor(...(col||GOLD));pdf.circle((x||14)+2,y-1,1,'F');
      pdf.setTextColor(24,38,58);pdf.setFontSize(8.5);pdf.setFont('helvetica','normal');
      const lines=pdf.splitTextToSize(S2(item),maxW);
      lines.forEach((l,i)=>{
        const isLast=i===lines.length-1;
        pdf.setFontSize(8.5);
        if(!isLast&&l.trim().length>0){
          const words=l.split(' ').filter(w=>w.length>0);
          if(words.length>1){
            const tw=pdf.getTextWidth(words.join(''));
            const sw=(maxW-tw)/(words.length-1);
            let cx=ox;
            words.forEach(w=>{pdf.text(w,cx,y+i*5.2);cx+=pdf.getTextWidth(w)+sw;});
            return;
          }
        }
        pdf.text(l,ox,y+i*5.2);
      });
      y+=lines.length*5.2+3;
    });
    return y+2;
  };

  // Concluzii cu numerotare eleganta
  const concluzii=(items,y)=>{
    y=sec('CONCLUZII SI RECOMANDARI',y,GREEN);
    y=body('Pe baza analizei efectuate pentru parcela '+S2(nrcad)+' (UTR '+S2(utr)+', suprafa\u021ba '+S2(area)+' mp), '+S2(uat)+', se formuleaza urmatoarele concluzii si recomandari:',14,y);
    y+=4;
    items.forEach((item,i)=>{
      if(y>H-28){pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');ftr();y=20;}
      pdf.setFillColor(...GOLD);pdf.roundedRect(14,y-4,7,7,1,1,'F');
      pdf.setTextColor(...DARK);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
      pdf.text(String(i+1),17.5,y+0.8,{align:'center'});
      const lh=5.3,lines=pdf.splitTextToSize(S2(item),W-38);
      lines.forEach((l,li)=>{
        const isLast=li===lines.length-1;
        pdf.setTextColor(24,38,56);pdf.setFontSize(8.5);pdf.setFont('helvetica','normal');
        if(!isLast&&l.trim().length>0){
          const words=l.split(' ').filter(w=>w.length>0);
          if(words.length>1){
            const tw=pdf.getTextWidth(words.join(''));
            const sw=((W-38)-tw)/(words.length-1);
            let cx=24;
            words.forEach(w=>{pdf.text(w,cx,y+li*lh);cx+=pdf.getTextWidth(w)+sw;});
            return;
          }
        }
        pdf.text(l,24,y+li*lh);
      });
      y+=lines.length*lh+5;
    });
    return y+5;
  };

  // Caseta semnaturi
  const sign=()=>{
    const sy=H-75;
    pdf.setFillColor(...DARK2);pdf.rect(14,sy,W-28,62,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,sy,W-28,2.5,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,sy,2.5,62,'F');
    pdf.setTextColor(...GOLD3);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
    pdf.text('CASETA DE ELABORARE, VERIFICARE SI ASUMARE A RESPONSABILITATII',W/2,sy+10,{align:'center'});
    pdf.setDrawColor(...GOLD2);pdf.setLineWidth(0.3);pdf.line(17,sy+13,W-17,sy+13);
    const roles=['ELABORAT','VERIFICAT','BENEFICIAR / INVESTITOR'];
    const roleColors=[BLUE,GREEN,ORANGE];
    roles.forEach((r,i)=>{
      const cw=(W-28)/3,cx=14+i*cw;
      pdf.setFillColor(...roleColors[i]);pdf.rect(cx,sy+14,cw,7,'F');
      pdf.setTextColor(255,255,255);pdf.setFontSize(7);pdf.setFont('helvetica','bold');
      pdf.text(r,cx+cw/2,sy+19,{align:'center'});
    });
    const infos=[['Specialist UrbanX TSS\u00b7FG','\u2014','\u2014'],['Nr. lic./atestat: \u2014','\u2014','Beneficiar: \u2014'],['Data: '+dateStr,'Data: \u2014','Data: \u2014']];
    infos.forEach((row,ri)=>row.forEach((v,ci)=>{
      const cw=(W-28)/3,cx=16+ci*cw;
      pdf.setTextColor(...GRAY2);pdf.setFontSize(7);pdf.setFont('helvetica','normal');
      pdf.text(S2(v),cx,sy+27+ri*6);
    }));
    for(let i=0;i<3;i++){
      const cw=(W-28)/3,cx=14+i*cw+3;
      pdf.setDrawColor(...GRAY3);pdf.setLineWidth(0.3);pdf.line(cx,sy+52,cx+cw-6,sy+52);
      pdf.setFontSize(6);pdf.setTextColor(...GRAY2);
      pdf.text('Semnatura si stampila',cx,sy+56.5);
    }
    pdf.setFillColor(...RED);pdf.rect(14,sy+59,W-28,5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(5.8);pdf.setFont('helvetica','bold');
    pdf.text('Document orientativ si preliminar. Nu inlocuieste documentatiile tehnice avizate conf. Legii 50/1991 si Legii 350/2001. UrbanX TSS-FG',W/2,sy+62.5,{align:'center'});
  };

  // Coperta premium
  const cover=(subtitle2,coverImg,kpiRows,statusOk,statusText)=>{
    pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(...DARK2);pdf.rect(0,H*0.40,W,H*0.60,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
    pdf.setFillColor(...BLUE);pdf.rect(0,3,5,H-6,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,3,2.5,H-6,'F');
    try{_pdfDrawLogo&&_pdfDrawLogo(pdf,W/2-14,15,28);}catch(e){
      pdf.setTextColor(...GOLD);pdf.setFontSize(32);pdf.setFont('helvetica','bold');pdf.text('UrbanX',W/2,44,{align:'center'});
    }
    pdf.setTextColor(...GOLD2);pdf.setFontSize(8);pdf.setFont('helvetica','bold');
    pdf.text('URBANX - PLATFORMA NATIONALA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
    pdf.setFillColor(...GOLD);pdf.rect(W/2-40,54,80,1,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(20);pdf.setFont('helvetica','bold');
    pdf.text(S2(studyName.toUpperCase()),W/2,67,{align:'center'});
    if(subtitle2){
      pdf.setTextColor(...GOLD2);pdf.setFontSize(10);pdf.setFont('helvetica','normal');
      pdf.text(S2(subtitle2),W/2,76,{align:'center'});
    }
    pdf.setFillColor(...GOLD2);pdf.rect(W/2-50,80,100,0.5,'F');
    const hasImg=coverImg&&coverImg.length>500;
    if(hasImg){
      try{
        pdf.setFillColor(...GOLD);pdf.rect(18,84,W-38,76,'F');
        pdf.addImage(coverImg,'JPEG',19,85,W-40,74,undefined,'FAST');
        pdf.setFillColor(5,14,30);
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.75}));}catch(e2){}
        pdf.rect(19,85+74-8,W-40,8,'F');
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e2){}
        pdf.setTextColor(...GOLD2);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
        pdf.text('Vedere 3D amplasament \u00b7 '+S2(uat)+' \u00b7 Nr.cad. '+S2(nrcad),W/2,85+74-1.5,{align:'center'});
      }catch(e){}
    }
    const by=hasImg?168:86;
    pdf.setFillColor(...DARK2);pdf.rect(14,by,W-28,70,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,by,W-28,2,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,by,2,70,'F');
    pdf.setTextColor(...GOLD3);pdf.setFontSize(7.5);pdf.setFont('helvetica','bold');
    pdf.text('DATE DE IDENTIFICARE',W/2,by+8,{align:'center'});
    pdf.setDrawColor(...GOLD2);pdf.setLineWidth(0.25);pdf.line(16,by+11,W-16,by+11);
    const kpis=[['Nr. cadastral',nrcad],['UAT / Localitate',uat],['Jude\u0163',judet],['Suprafa\u021b\u0103 teren',area+' mp'],
      ['Zon\u0103 UTR',utr],['Regim H max',params?.h?params.h+'m':'\u2014'],...(kpiRows||[]),
      ['Coordonate GPS',lat.toFixed(5)+'\u00b0N, '+lon.toFixed(5)+'\u00b0E'],['Data elaborare',dateStr]];
    const kColW=(W-32)/2;
    kpis.slice(0,12).forEach(([l,v],i)=>{
      const col=i%2,row=Math.floor(i/2),kx=15+col*kColW,ky=by+16+row*11;
      if(ky>by+66) return;
      if(col===0&&row>0){pdf.setDrawColor(20,36,68);pdf.setLineWidth(0.15);pdf.line(16,ky-3,W-16,ky-3);}
      pdf.setTextColor(148,168,200);pdf.setFontSize(6.5);pdf.setFont('helvetica','bold');
      pdf.text(S2(l)+':',kx+2,ky);
      pdf.setTextColor(255,255,255);pdf.setFontSize(8);pdf.setFont('helvetica','bold');
      pdf.text(S2(String(v??'\u2014')).substring(0,34),kx+2,ky+5);
    });
    if(statusText){
      const barY=by+68;
      pdf.setFillColor(...(statusOk!==false?GREEN:RED));pdf.rect(14,barY,W-28,8,'F');
      pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont('helvetica','bold');
      pdf.text(S2(statusText),W/2,barY+5.5,{align:'center'});
    }
    pdf.setTextColor(90,110,140);pdf.setFontSize(6.5);pdf.setFont('helvetica','normal');
    pdf.text('Generat: '+S2(dateStr)+' \u00b7 Document cu caracter ORIENTATIV \u00b7 UrbanX TSS-FG',W/2,H-8,{align:'center'});
    ftr();
  };

  // Imagine cu border si caption elegant
  const addImg=(img,x,y,w,h2,caption)=>{
    if(!img||img.length<500){
      pdf.setFillColor(...LIGHT3);pdf.rect(x,y,w,h2,'F');
      pdf.setDrawColor(...GRAY3);pdf.setLineWidth(0.3);pdf.rect(x,y,w,h2,'S');
      pdf.setTextColor(...GRAY2);pdf.setFontSize(8);pdf.setFont('helvetica','italic');
      pdf.text('Captur\u0103 indisponibil\u0103',x+w/2,y+h2/2,{align:'center'});
      if(caption){pdf.setFontSize(6);pdf.setTextColor(...GRAY);pdf.text(S2(caption),x+2,y+h2+3.5);return y+h2+8;}
      return y+h2+4;
    }
    const fmt=img.startsWith('data:image/png')?'PNG':'JPEG';
    try{
      pdf.setFillColor(...DARK);pdf.rect(x-0.8,y-0.8,w+1.6,h2+1.6,'F');
      pdf.addImage(img,fmt,x,y,w,h2,undefined,'FAST');
      if(caption){
        pdf.setFillColor(...DARK);
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.80}));}catch(e2){}
        pdf.rect(x,y+h2-7,w,7,'F');
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e2){}
        pdf.setTextColor(...GOLD2);pdf.setFontSize(6);pdf.setFont('helvetica','italic');
        pdf.text(S2(caption),x+2,y+h2-1.8);
      }
    }catch(e){
      pdf.setFillColor(...LIGHT3);pdf.rect(x,y,w,h2,'F');
      pdf.setTextColor(...GRAY2);pdf.setFontSize(7);pdf.text('Captur\u0103 indisponibil\u0103',x+w/2,y+h2/2,{align:'center'});
    }
    return y+h2+4;
  };

  const newPage=(title,pgNum)=>{
    pdf.addPage();pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
    if(title&&pgNum) hdr(title,pgNum);
    ftr();return 33;
  };
  const checkY=(y,needed,title,pgNum)=>{
    if(y+(needed||20)>H-16) return newPage(title||'continuare',pgNum||'\u2014');
    return y;
  };
  const smartPage=(cy,title,pgNum,minUsed)=>{
    if(cy<(minUsed||80)) return cy+8;
    return newPage(title,pgNum);
  };

  return {
    pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,GOLD3,BLUE,BLUE2,TEAL,LIGHT,LIGHT2,LIGHT3,
    RED,GREEN,ORANGE,PURPLE,GRAY,GRAY2,GRAY3,GRAY4,WHITE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
    hdr,ftr,sec,subsec,body,tblRow,addImg,kv,badge,divider,bullet,concluzii,sign,cover,newPage,checkY,smartPage
  };
}



