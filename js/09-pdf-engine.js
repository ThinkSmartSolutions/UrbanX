// UrbanX — Design system PDF - _initStudyPdf
// Fix: auto-paginare pentru body, sec, tblRow, bullet, concluzii

function _initStudyPdf(studyName, studySubtitle, totalPages, opts){
  const _orient = opts?.orientation || 'portrait';
  const _format = opts?.format || 'a4';
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:_orient,unit:'mm',format:_format});
  // Standard de sistem: font RO (diacritice) pentru proza studiilor (fallback helvetica)
  const _roFont=(window._registerROFont&&window._registerROFont(pdf))?'DejaVuRO':null;
  // TOTAL pagini REAL: alias-ul {urbanx_tp}+putTotalPages NU se înlocuia pe studiile care
  // salvează pe alt path (apărea literal „/ {urbanx_tp}"). Soluție robustă: afișăm doar
  // „Pag. X" (nr. real din jsPDF) — fără total declarat greșit. totalPages rămas pt compat.
  const W = _orient==='landscape'?(_format==='a3'?420:297):(_format==='a3'?297:210);
  const H = _orient==='landscape'?(_format==='a3'?297:210):(_format==='a3'?420:297);

  // Paleta rafinata
  const DARK=[5,14,30],DARK2=[11,24,50],NAVY=[14,36,72];
  const GOLD=[196,146,6],GOLD2=[228,182,48],GOLD3=[245,210,100];
  const BLUE=[20,50,98],BLUE2=[32,70,136],TEAL=[0,118,120];
  const LIGHT=[248,250,253],LIGHT2=[240,244,250],LIGHT3=[232,238,248];
  const RED=[158,20,20],GREEN=[14,100,50],ORANGE=[168,76,4],PURPLE=[68,28,148];
  const GRAY=[90,104,120],GRAY2=[138,150,166],GRAY3=[200,208,220],GRAY4=[226,230,238];
  const WHITE=[255,255,255];

  const S2=t=>{ var s=t; try{ if(window.UrbanXI18n&&window.UrbanXI18n.getCurrentLang()!=='ro'&&window.T&&t!=null){ var tt=String(t).trim(); if(tt){ var tr=window.T(tt); if(tr&&tr!==tt) s=String(t).replace(tt,tr); } } }catch(e){} return _pdfSafe(s); };
  // Formatare numere cu separator de mii (virgula) + sufix optional
  // n(2489) => '2,489'  |  n(1742300,'EUR') => '1,742,300 EUR'  |  n(41.4,'%') => '41.4%'
  const n=(val,suffix,decimals)=>{
    if(val===null||val===undefined||val===''||isNaN(+val)) return S2(String(val??'-'));
    const num=+val;
    const d=decimals!==undefined?decimals:(Number.isInteger(num)?0:2);
    const formatted=num.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
    return suffix?formatted+' '+suffix:formatted;
  };
  // nK: afiseaza valori mari in format '1,742 EUR' (fara zecimale, cu separator mii)
  const nK=(val,suffix)=>n(val,suffix,0);
  const dateStr=new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'});
  const ap=S.parcels[S.activeParcel??0];
  const nrcad=ap?.nrcad||'\u2014';
  const utr=ap?.utr||'\u2014';
  const area=ap?.area?ap.area.toFixed(0):'\u2014';
  let lat=47.16, lon=27.59; try{ if(ap?.geo?.geometry){ const _c=turf.centerOfMass(ap.geo).geometry.coordinates; if(!isNaN(_c[0])&&!isNaN(_c[1])){ lon=_c[0]; lat=_c[1]; } } }catch(e){}
  const params=Object.assign({},getDefaultParams(utr)||{},ap?.params||{});
  // completează câmpurile lipsă — altfel apar „undefined" în studii (parcaje, retrageri,
  // spații verzi, regim) pentru UTR-uri fără valori complete. Default-uri RGU rezonabile.
  const _PDEF={pot:40,cut:1.5,h:10,niv:3,rf:3,rs:3,rl:3,sv:20,pk:1,
    retragere_fata:'3',retragere_lat:'3',retragere_spate:'3'};
  Object.keys(_PDEF).forEach(function(k){ if(params[k]==null||params[k]==='') params[k]=_PDEF[k]; });
  const uat=getUATLabel();
  const judet=getUATJudet();

  // Header rafinat 28mm
  const hdr=(title,pg)=>{
    // pg lipsă în multe apeluri (ex. SSF) → „Pag. undefined". Folosim nr. real de pagină din jsPDF.
    if(pg==null){ try{ pg = pdf.internal.getCurrentPageInfo().pageNumber; }catch(e){ try{ pg = pdf.internal.getNumberOfPages(); }catch(e2){ pg='—'; } } }
    pdf.setFillColor(...DARK);pdf.rect(0,0,W,28,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,0,W,2.5,'F');
    pdf.setFillColor(...GOLD2);pdf.rect(0,27,W,1,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,2.5,3.5,25.5,'F');
    try{_pdfDrawLogo&&_pdfDrawLogo(pdf,8,7,13);}catch(e){}
    pdf.setTextColor(...GOLD);pdf.setFontSize(7.5);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text('URBANX',9,9.5);
    pdf.setDrawColor(...GOLD2);pdf.setLineWidth(0.4);pdf.line(34,5,34,24);
    pdf.setTextColor(...GOLD3);pdf.setFontSize(6.5);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text(S2(studyName.toUpperCase()),38,9.5);
    pdf.setTextColor(170,185,210);pdf.setFontSize(6);pdf.setFont(_roFont||'helvetica','normal');
    pdf.text(S2(uat)+' \u00b7 jud. '+S2(judet)+' \u00b7 Nr.cad '+S2(nrcad)+' \u00b7 UTR '+S2(utr),38,15);
    pdf.setTextColor(255,255,255);pdf.setFontSize(9.5);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text(S2(title),W/2,22,{align:'center'});
    pdf.setTextColor(...GOLD2);pdf.setFontSize(7);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text('Pag. '+pg,W-8,22,{align:'right'});
  };

  // Footer elegant 10mm
  const ftr=()=>{
    pdf.setFillColor(...DARK);pdf.rect(0,H-10,W,10,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,H-10,W,0.8,'F');
    pdf.setTextColor(...GOLD2);pdf.setFontSize(6.5);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text('URBANX',8,H-3.5);
    pdf.setTextColor(160,175,200);pdf.setFontSize(5.8);pdf.setFont(_roFont||'helvetica','normal');
    pdf.text(S2(studySubtitle)+' \u00b7 '+S2(uat)+' \u00b7 Parcela '+S2(nrcad)+' \u00b7 '+S2(dateStr),W/2,H-3.5,{align:'center'});
    pdf.setTextColor(100,118,140);pdf.setFontSize(5.5);
    pdf.text('Document orientativ \u00b7 UrbanX TSS\u00b7FG',W-8,H-3.5,{align:'right'});
  };

  // Auto page-break: daca nu mai e loc, pagina noua cu header continuare + footer.
  // Evita text peste footer, randuri trunchiate si text pierdut (pagini partiale).
  const _ensureSpace=(y,needed,title)=>{
    if(y + (needed||6) > H-15){
      pdf.addPage();
      pdf.setFillColor(...LIGHT);pdf.rect(0,0,W,H,'F');
      try{ hdr((title||studyName||'').toString()+' (continuare)', pdf.getNumberOfPages()); }catch(e){}
      try{ ftr(); }catch(e){}
      return 33;
    }
    return y;
  };

  // Sectiune principala navy + gold
  const sec=(title,y,col)=>{
    // break-after: avoid — rezervam titlul + cel putin un rand de continut,
    // ca titlul sa nu ramana singur la baza paginii.
    y=_ensureSpace(y,30,title);
    const bg=col||NAVY;
    pdf.setFillColor(...bg);pdf.rect(14,y,W-28,9,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,y,3,9,'F');
    pdf.setFillColor(...GOLD2);pdf.rect(14,y+9,W-28,0.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text(S2(title.toUpperCase()),20,y+6.2);
    return y+14;
  };

  // Subsectiune
  const subsec=(title,y,col)=>{
    y=_ensureSpace(y,24,title);  // break-after: avoid — subtitlu + un rand de continut
    pdf.setFillColor(...(col||LIGHT3));pdf.rect(14,y,W-28,7.5,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,y,2,7.5,'F');
    pdf.setTextColor(...(col?WHITE:BLUE));pdf.setFontSize(8);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text(S2(title),19,y+5.2);
    return y+11;
  };

  // Body text justify
  const body=(txt,x,y,maxW,fontSize,lineH)=>{
    pdf.setTextColor(24,36,54);pdf.setFont(_roFont||'helvetica','normal');
    const fs=fontSize||8.5,lh=lineH||(fs*0.66),mx=maxW||(W-28),ox=x||14;
    pdf.setFontSize(fs);
    // cu font RO pastram diacriticele; fara, fallback la transformarea ASCII (S2)
    const _txt=_roFont?String(txt==null?'':txt):S2(txt);
    const lines=pdf.splitTextToSize(_txt,mx);
    y=_ensureSpace(y, lines.length*lh+3);  // page-break in loc de a pierde textul
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
    y=_ensureSpace(y, rowH+2);  // randul nu se mai suprapune peste footer
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
      pdf.setFontSize(fs);pdf.setFont(_roFont||'helvetica',isHeader?'bold':'normal');
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
    pdf.setTextColor(...(accentCol||GOLD3));pdf.setFontSize(6.5);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text(S2(label).toUpperCase(),x+3,y+7);
    pdf.setTextColor(255,255,255);pdf.setFontSize(10.5);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text(S2(String(val??'\u2014')).substring(0,18),x+3,y+14.5);
    return y+bh+4;
  };

  // Badge
  const badge=(txt,x,y,col,w2)=>{
    const bw=w2||38;
    pdf.setFillColor(...col);pdf.rect(x,y-6.5,bw,7.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(7.5);pdf.setFont(_roFont||'helvetica','bold');
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
      pdf.setTextColor(24,38,58);pdf.setFontSize(8.5);pdf.setFont(_roFont||'helvetica','normal');
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
      pdf.setTextColor(...DARK);pdf.setFontSize(7.5);pdf.setFont(_roFont||'helvetica','bold');
      pdf.text(String(i+1),17.5,y+0.8,{align:'center'});
      const lh=5.3,lines=pdf.splitTextToSize(S2(item),W-38);
      lines.forEach((l,li)=>{
        const isLast=li===lines.length-1;
        pdf.setTextColor(24,38,56);pdf.setFontSize(8.5);pdf.setFont(_roFont||'helvetica','normal');
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
    pdf.setTextColor(...GOLD3);pdf.setFontSize(7.5);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text('CASETA DE ELABORARE, VERIFICARE SI ASUMARE A RESPONSABILITATII',W/2,sy+10,{align:'center'});
    pdf.setDrawColor(...GOLD2);pdf.setLineWidth(0.3);pdf.line(17,sy+13,W-17,sy+13);
    const roles=['ELABORAT','VERIFICAT','BENEFICIAR / INVESTITOR'];
    const roleColors=[BLUE,GREEN,ORANGE];
    roles.forEach((r,i)=>{
      const cw=(W-28)/3,cx=14+i*cw;
      pdf.setFillColor(...roleColors[i]);pdf.rect(cx,sy+14,cw,7,'F');
      pdf.setTextColor(255,255,255);pdf.setFontSize(7);pdf.setFont(_roFont||'helvetica','bold');
      pdf.text(r,cx+cw/2,sy+19,{align:'center'});
    });
    const infos=[['Specialist UrbanX TSS\u00b7FG','\u2014','\u2014'],['Nr. lic./atestat: \u2014','\u2014','Beneficiar: \u2014'],['Data: '+dateStr,'Data: \u2014','Data: \u2014']];
    infos.forEach((row,ri)=>row.forEach((v,ci)=>{
      const cw=(W-28)/3,cx=16+ci*cw;
      pdf.setTextColor(...GRAY2);pdf.setFontSize(7);pdf.setFont(_roFont||'helvetica','normal');
      pdf.text(S2(v),cx,sy+27+ri*6);
    }));
    for(let i=0;i<3;i++){
      const cw=(W-28)/3,cx=14+i*cw+3;
      pdf.setDrawColor(...GRAY3);pdf.setLineWidth(0.3);pdf.line(cx,sy+52,cx+cw-6,sy+52);
      pdf.setFontSize(6);pdf.setTextColor(...GRAY2);
      pdf.text('Semnatura si stampila',cx,sy+56.5);
    }
    pdf.setFillColor(...RED);pdf.rect(14,sy+59,W-28,5,'F');
    pdf.setTextColor(255,255,255);pdf.setFontSize(5.8);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text('Document orientativ si preliminar. Nu inlocuieste documentatiile tehnice avizate conf. Legea 169/2026 (CATUC). UrbanX TSS-FG',W/2,sy+62.5,{align:'center'});
  };

  // Coperta premium
  const cover=(subtitle2,coverImg,kpiRows,statusOk,statusText)=>{
    pdf.setFillColor(...DARK);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(...DARK2);pdf.rect(0,H*0.40,W,H*0.60,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,0,W,3,'F');pdf.rect(0,H-3,W,3,'F');
    pdf.setFillColor(...BLUE);pdf.rect(0,3,5,H-6,'F');
    pdf.setFillColor(...GOLD);pdf.rect(0,3,2.5,H-6,'F');
    try{_pdfDrawLogo&&_pdfDrawLogo(pdf,W/2-14,15,28);}catch(e){
      pdf.setTextColor(...GOLD);pdf.setFontSize(32);pdf.setFont(_roFont||'helvetica','bold');pdf.text('UrbanX',W/2,44,{align:'center'});
    }
    pdf.setTextColor(...GOLD2);pdf.setFontSize(8);pdf.setFont(_roFont||'helvetica','bold');
    pdf.text('URBANX - PLATFORMA NATIONALA DE ANALIZA URBANISTICA',W/2,50,{align:'center'});
    pdf.setFillColor(...GOLD);pdf.rect(W/2-40,54,80,1,'F');
    pdf.setTextColor(255,255,255);pdf.setFont(_roFont||'helvetica','bold');
    // Auto-fit titlu: micsoram fontul pana incape pe un rand (titluri lungi nu mai depasesc pagina)
    {var _tt=S2(studyName.toUpperCase()),_fs=20,_maxTW=W-30;pdf.setFontSize(_fs);
     while(pdf.getTextWidth(_tt)>_maxTW&&_fs>10.5){_fs-=0.5;pdf.setFontSize(_fs);}
     pdf.text(_tt,W/2,67,{align:'center'});}
    if(subtitle2){
      pdf.setTextColor(...GOLD2);pdf.setFontSize(10);pdf.setFont(_roFont||'helvetica','normal');
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
        pdf.setTextColor(...GOLD2);pdf.setFontSize(6);pdf.setFont(_roFont||'helvetica','italic');
        pdf.text('Vedere 3D amplasament \u00b7 '+S2(uat)+' \u00b7 Nr.cad. '+S2(nrcad),W/2,85+74-1.5,{align:'center'});
      }catch(e){}
    }
    const by=hasImg?168:86;
    pdf.setFillColor(...DARK2);pdf.rect(14,by,W-28,70,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,by,W-28,2,'F');
    pdf.setFillColor(...GOLD);pdf.rect(14,by,2,70,'F');
    pdf.setTextColor(...GOLD3);pdf.setFontSize(7.5);pdf.setFont(_roFont||'helvetica','bold');
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
      pdf.setTextColor(148,168,200);pdf.setFontSize(6.5);pdf.setFont(_roFont||'helvetica','bold');
      pdf.text(S2(l)+':',kx+2,ky);
      pdf.setTextColor(255,255,255);pdf.setFontSize(8);pdf.setFont(_roFont||'helvetica','bold');
      pdf.text(S2(String(v??'\u2014')).substring(0,34),kx+2,ky+5);
    });
    if(statusText){
      const barY=by+68;
      pdf.setFillColor(...(statusOk!==false?GREEN:RED));pdf.rect(14,barY,W-28,8,'F');
      pdf.setTextColor(255,255,255);pdf.setFontSize(8.5);pdf.setFont(_roFont||'helvetica','bold');
      pdf.text(S2(statusText),W/2,barY+5.5,{align:'center'});
    }
    pdf.setTextColor(90,110,140);pdf.setFontSize(6.5);pdf.setFont(_roFont||'helvetica','normal');
    pdf.text('Generat: '+S2(dateStr)+' \u00b7 Document cu caracter ORIENTATIV \u00b7 UrbanX TSS-FG',W/2,H-8,{align:'center'});
    ftr();
  };

  // Imagine cu border si caption elegant
  // Auto figure counter (Audit #17)
  let _figCounter = 0;
  const addImg=(img,x,y,w,h2,caption,opts)=>{
    const opt=opts||{};
    _figCounter++;
    const figNum=opt.figNum||_figCounter;
    if(!img||img.length<500){
      pdf.setFillColor(...LIGHT3);pdf.rect(x,y,w,h2,'F');
      pdf.setDrawColor(...GRAY3);pdf.setLineWidth(0.3);pdf.rect(x,y,w,h2,'S');
      pdf.setTextColor(...GRAY2);pdf.setFontSize(8);pdf.setFont(_roFont||'helvetica','italic');
      pdf.text('Captur\u0103 indisponibil\u0103',x+w/2,y+h2/2,{align:'center'});
      if(caption){pdf.setFontSize(5.5);pdf.setTextColor(...GRAY);pdf.text('FIG.'+figNum+' \u2014 '+S2(caption),x+2,y+h2+3.5);return y+h2+8;}
      return y+h2+4;
    }
    const fmt=img.startsWith('data:image/png')?'PNG':'JPEG';
    try{
      pdf.setFillColor(...DARK);pdf.rect(x-0.8,y-0.8,w+1.6,h2+1.6,'F');
      pdf.addImage(img,fmt,x,y,w,h2,undefined,'FAST');
      if(opt.northArrow!==false){
        const nx=x+w-10,ny=y+9;
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.82}));}catch(e){}
        pdf.setFillColor(4,12,28);pdf.circle(nx,ny,5.5,'F');
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e){}
        pdf.setFillColor(210,40,40);
        if(pdf.triangle)pdf.triangle(nx,ny-4.5,nx-2,ny+1,nx+2,ny+1,'F');
        pdf.setFillColor(240,240,240);
        if(pdf.triangle)pdf.triangle(nx,ny+4.5,nx-2,ny-1,nx+2,ny-1,'F');
        pdf.setTextColor(255,255,255);pdf.setFontSize(4.5);pdf.setFont(_roFont||'helvetica','bold');
        pdf.text('N',nx,ny-5.5,{align:'center'});
      }
      if(opt.scaleM){
        const bx=x+3,by=y+h2-9,bw=28;
        pdf.setFillColor(255,255,255);pdf.rect(bx,by,bw,3,'F');
        pdf.setFillColor(0,0,0);pdf.rect(bx,by,bw/2,3,'F');
        pdf.setDrawColor(0);pdf.setLineWidth(0.3);pdf.rect(bx,by,bw,3,'S');
        pdf.setTextColor(255,255,255);pdf.setFontSize(5);pdf.setFont(_roFont||'helvetica','bold');
        pdf.text('0',bx,by+5.5);
        pdf.text(opt.scaleLabel||opt.scaleM+'m',bx+bw,by+5.5,{align:'right'});
      }
      if(opt.viewMeta){
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.75}));}catch(e){}
        pdf.setFillColor(4,12,28);pdf.rect(x+w-62,y+h2-8,60,7,'F');
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e){}
        pdf.setTextColor(120,160,210);pdf.setFontSize(5);pdf.setFont(_roFont||'helvetica','normal');
        pdf.text(opt.viewMeta,x+w-60,y+h2-3.5);
      }
      if(opt.legend&&opt.legend.length){
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.85}));}catch(e){}
        const legH=5+opt.legend.length*5.5;
        pdf.setFillColor(4,12,28);pdf.rect(x+3,y+3,38,legH,'F');
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e){}
        opt.legend.forEach((leg,li)=>{
          pdf.setFillColor(...(leg.col||[212,175,55]));
          pdf.rect(x+5,y+5.5+li*5.5,4,3,'F');
          pdf.setTextColor(220,230,245);pdf.setFontSize(5.5);pdf.setFont(_roFont||'helvetica','normal');
          pdf.text(leg.label,x+11,y+7.5+li*5.5);
        });
      }
      if(caption){
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.85}));}catch(e2){}
        pdf.setFillColor(8,20,42);pdf.rect(x,y+h2-9,w,9,'F');
        try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e2){}
        pdf.setFillColor(212,175,55);pdf.rect(x,y+h2-9,15,9,'F');
        pdf.setTextColor(8,20,42);pdf.setFontSize(6);pdf.setFont(_roFont||'helvetica','bold');
        pdf.text('FIG.'+figNum,x+7.5,y+h2-2.5,{align:'center'});
        pdf.setTextColor(212,175,55);pdf.setFontSize(5.8);pdf.setFont(_roFont||'helvetica','italic');
        pdf.text(S2(caption),x+17,y+h2-2.5,{maxWidth:w-20});
      }
    }catch(e){
      pdf.setFillColor(...LIGHT3);pdf.rect(x,y,w,h2,'F');
      pdf.setTextColor(...GRAY2);pdf.setFontSize(7);pdf.text('Captur\u0103 indisponibil\u0103',x+w/2,y+h2/2,{align:'center'});
    }
    return y+h2+(caption?11:4);
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

  // ── miniChart — grafic AUTO din tabel numeric, STIL IDENTIC cu motorul strategic ──
  // Self-contained (nu depinde de _makeStratDoc). Rotatie bar·hbar·donut pe pdf.__pc.
  // headers: [..,'Valoare'] | rows: [[label,..,val],...] | returneaza noul y.
  const _CFONT=_roFont||'helvetica';
  const _PALc=[[59,130,246],[34,197,94],[249,115,22],[168,85,247],[234,179,8],[14,165,233],[236,72,153]];
  const _pcNum=s=>{ if(typeof s==='number') return s; if(s==null) return null; const m=(''+s).replace(/\./g,'').replace(/,/g,'.').match(/-?\d+(\.\d+)?/); return m?parseFloat(m[0]):null; };
  const miniChart=(headers,rows,title,y,opts)=>{
    try{
      opts=opts||{}; if(!rows||rows.length<2||rows.length>14) return y;
      const li=(headers?headers.length:(rows[0]?rows[0].length:0))-1; if(li<1) return y;
      const vals=rows.map(r=>_pcNum(r[li])); const ok=vals.filter(v=>v!=null).length;
      if(ok<rows.length||ok<2) return y;
      const uniq={}; vals.forEach(v=>uniq[v]=1); if(Object.keys(uniq).length<2) return y;
      const labels=rows.map((r,i)=>S2(String(r[0]??('#'+(i+1)))).replace(/\s+/g,' ').trim());
      const data=rows.map((r,i)=>[labels[i],vals[i],_PALc[i%_PALc.length]]);
      const allPos=vals.every(v=>v!=null&&v>=0);
      const ttl=title||((headers&&headers[li])||'Valori')+' — reprezentare grafica';
      const ML=14, CW=W-28, h=opts.h||48;
      y=_ensureSpace(y, h+12, opts.contTitle);
      // titlu
      pdf.setFont(_CFONT,'bold'); pdf.setFontSize(8.5); pdf.setTextColor(...NAVY); pdf.text(S2(ttl),ML,y+1); y+=5.5;
      // alege tip (rotatie)
      const elig=['bar','hbar']; if(allPos&&rows.length<=6) elig.push('donut');
      pdf.__pc=(pdf.__pc||0)+1; const st=elig[pdf.__pc%elig.length];
      const _max=Math.max(1,...vals.map(v=>Math.abs(v||0)));
      if(st==='donut'){
        const cx=ML+26, cy=y+22, ro=20, ri=10; let tot=vals.reduce((a,v)=>a+(v||0),0)||1, a0=-Math.PI/2;
        data.forEach(d=>{ const frac=(d[1]||0)/tot, a1=a0+frac*2*Math.PI; pdf.setFillColor(...d[2]);
          const steps=Math.max(2,Math.ceil(frac*40)); pdf.moveTo? null:null;
          // sector aproximat cu triunghiuri
          for(let s=0;s<steps;s++){ const t0=a0+(a1-a0)*s/steps, t1=a0+(a1-a0)*(s+1)/steps;
            pdf.triangle(cx,cy, cx+ro*Math.cos(t0),cy+ro*Math.sin(t0), cx+ro*Math.cos(t1),cy+ro*Math.sin(t1),'F'); }
          a0=a1; });
        pdf.setFillColor(...LIGHT); pdf.circle(cx,cy,ri,'F');
        // legenda
        let ly=y+4, lx=ML+54; data.forEach(d=>{ pdf.setFillColor(...d[2]); pdf.rect(lx,ly-2.6,3,3,'F');
          pdf.setFont(_CFONT,'normal'); pdf.setFontSize(6.6); pdf.setTextColor(40,52,70);
          pdf.text(S2(d[0]).slice(0,26)+'  '+nK(d[1]),lx+4.5,ly); ly+=5.2; });
        y=Math.max(cy+ro+4, ly)+2;
      } else if(st==='hbar'){
        const bx=ML+44, bw=CW-50; let by=y+2;
        data.forEach(d=>{ const w=bw*Math.abs(d[1]||0)/_max;
          pdf.setFont(_CFONT,'normal'); pdf.setFontSize(6.6); pdf.setTextColor(40,52,70);
          pdf.text(S2(d[0]).slice(0,30),ML,by+2.6,{maxWidth:42});
          pdf.setFillColor(...d[2]); pdf.rect(bx,by,Math.max(0.6,w),4.2,'F');
          pdf.setFontSize(6.2); pdf.setTextColor(90,104,120); pdf.text(nK(d[1]),bx+w+1.5,by+3.4);
          by+=6.6; });
        y=by+2;
      } else {
        const x0=ML+10, plotW=CW-12, plotH=h-12, top=y, baseY=top+plotH;
        pdf.setDrawColor(205,210,220); pdf.setLineWidth(0.2); pdf.line(x0,top,x0,baseY); pdf.line(x0,baseY,x0+plotW,baseY);
        pdf.setFont(_CFONT,'normal'); pdf.setFontSize(5.4); pdf.setTextColor(138,150,166);
        for(let g=0;g<=4;g++){ const gy=baseY-plotH*g/4; if(g>0){pdf.setDrawColor(234,237,242);pdf.setLineWidth(0.1);pdf.line(x0,gy,x0+plotW,gy);} pdf.text(nK(Math.round(_max*g/4)),x0-1.5,gy+1,{align:'right'}); }
        const nb=data.length, gap=plotW/nb, bwid=Math.min(gap*0.6,14);
        data.forEach((d,i)=>{ const bh=plotH*Math.abs(d[1]||0)/_max, bxx=x0+gap*i+(gap-bwid)/2;
          pdf.setFillColor(...d[2]); pdf.rect(bxx,baseY-bh,bwid,bh,'F');
          pdf.setFont(_CFONT,'bold'); pdf.setFontSize(5.6); pdf.setTextColor(40,52,70); pdf.text(nK(d[1]),bxx+bwid/2,baseY-bh-1.2,{align:'center'});
          pdf.setFont(_CFONT,'normal'); pdf.setFontSize(5.2); pdf.setTextColor(90,104,120); pdf.text(S2(d[0]).slice(0,14),bxx+bwid/2,baseY+3,{align:'center',maxWidth:gap}); });
        y=baseY+6;
      }
      pdf.setFont(_CFONT,'italic'); pdf.setFontSize(5.6); pdf.setTextColor(150,160,176); pdf.text(S2(opts.source||'Date din tabelul de mai sus'),ML,y); y+=4;
      pdf.setTextColor(0,0,0);
      return y;
    }catch(e){ return y; }
  };

  return {
    pdf,W,H,DARK,DARK2,NAVY,GOLD,GOLD2,GOLD3,BLUE,BLUE2,TEAL,LIGHT,LIGHT2,LIGHT3,
    RED,GREEN,ORANGE,PURPLE,GRAY,GRAY2,GRAY3,GRAY4,WHITE,
    S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,n,nK,
    FONT:_roFont||'helvetica',
    hdr,ftr,sec,subsec,body,tblRow,addImg,kv,badge,divider,bullet,concluzii,sign,cover,newPage,checkY,smartPage,miniChart
  };
}





// ── Landscape page helpers ─────────────────────────────────────────────────
function _pdfAddLandscapePage(pdf){pdf.addPage('a4','landscape');return{W:297,H:210};}
function _pdfAddPortraitPage(pdf){pdf.addPage('a4','portrait');return{W:210,H:297};}
function _needsLandscape(cols){return cols.reduce((a,b)=>a+b,0)>175;}

// ── Print Safe Colors (Audit #26) ─────────────────────────────────────────
const _PRINT_PALETTE={
  BLACK:[0,0,0],WHITE:[255,255,255],DARK_NAVY:[8,20,42],GOLD:[180,140,0],
  GREEN_SAFE:[0,100,40],RED_SAFE:[160,0,0],BLUE_SAFE:[0,60,140],
  AMBER_SAFE:[140,90,0],GRAY_TEXT:[60,70,80],GRAY_LIGHT:[230,235,240],
};
function _wcagContrast(r1,r2){
  const l=rgb=>{const s=rgb.map(v=>{const c=v/255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);});return 0.2126*s[0]+0.7152*s[1]+0.0722*s[2];};
  const L1=l(r1),L2=l(r2);return(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
}

// ── Safe Zones (Audit Sect.III #9) ────────────────────────────────────────
const _safeZones=[];
function _resetSafeZones(){_safeZones.length=0;}
function _registerZone(x,y,w,h,lbl){_safeZones.push({x,y,w,h,lbl});}
function _isSafeToPlace(x,y,w,h){return!_safeZones.some(z=>x<z.x+z.w&&x+w>z.x&&y<z.y+z.h&&y+h>z.y);}
function _findSafeY(W,y,h){let s=y,it=0;while(!_isSafeToPlace(14,s,W-28,h)&&it<20){s+=5;it++;}return s;}

// ── Iconography (Audit #27) ───────────────────────────────────────────────
function _pdfIcon(pdf,x,y,type,size,col){
  const s=size||5,c=col||[60,80,100];
  const colors={ok:[0,110,50],warn:[140,90,0],err:[150,0,0],info:[0,70,150]};
  const labels={ok:'+',warn:'!',err:'x',info:'i'};
  pdf.setFillColor(...(colors[type]||c));
  pdf.circle(x,y,s/2,'F');
  pdf.setTextColor(255,255,255);pdf.setFontSize(s*1.2);pdf.setFont(_roFont||'helvetica','bold');
  pdf.text(labels[type]||'?',x,y+s*0.4,{align:'center'});
}

// ── Dynamic Typography (Audit Sect.III #10) ───────────────────────────────
function _pdfDynamicText(pdf,text,x,y,maxW,maxH,opts){
  const minF=opts?.minSize||5.5,maxF=opts?.maxSize||8;
  for(let fs=maxF;fs>=minF;fs-=0.5){
    pdf.setFontSize(fs);
    const lines=pdf.splitTextToSize(text,maxW);
    if(lines.length*(fs*0.45)<=maxH){lines.forEach((l,i)=>pdf.text(l,x,y+i*(fs*0.45)));return y+lines.length*(fs*0.45);}
  }
  pdf.setFontSize(minF);
  const maxL=Math.floor(maxH/(minF*0.45));
  const lines=pdf.splitTextToSize(text,maxW).slice(0,maxL-1);
  lines.push('...');lines.forEach((l,i)=>pdf.text(l,x,y+i*(minF*0.45)));
  return y+maxL*(minF*0.45);
}
