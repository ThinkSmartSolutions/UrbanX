// ═══════════════════════════════════════════════════════════════════════════
// seismic-fix.js — Fix _getSeismicAg per județ (P100-1/2022)
// UrbanX TSS·FG | Audit 2026-05-12
//
// BUG: SEISMIC_ZONES bbox prea largi → 5/7 orașe primesc ag greșit
//   Cluj: 0.30g calculat vs 0.10g real → hMax=8et în loc de nelimitat
//   Iași: 0.30g calculat vs 0.35g real → cost construcție subevaluat
//
// FIX: lookup per județ din cityData (disponibil în TCI.d.judet)
//      Fallback geometric pentru cazuri fără judet (zone OSM/frontier)
// ═══════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // Date P100-1/2022 per județ — toate 41 județe + B
  const SEISMIC_JUDET = {
    // Zona I — ag=0.40g (Vrancea proximal)
    'VN':0.40, 'BZ':0.40,
    // Zona II — ag=0.35g
    'IS':0.35, 'GL':0.35, 'BC':0.35, 'NT':0.35, 'VS':0.35,
    'B':0.35,  'IF':0.35, 'PH':0.35, 'BR':0.35, 'IL':0.35,
    // Zona III — ag=0.25-0.30g
    'BT':0.20, 'SV':0.20, 'CT':0.20, 'TL':0.20, 'CL':0.20,
    'GR':0.25, 'TR':0.25, 'OT':0.25, 'DJ':0.25, 'GJ':0.25,
    'AG':0.25, 'DB':0.25, 'VL':0.25, 'MH':0.20,
    // Zona IV — ag=0.15g (Transilvania)
    'AB':0.15, 'SB':0.15, 'MS':0.15, 'HR':0.15, 'CV':0.15,
    'CS':0.15, 'HD':0.15, 'BV':0.15,
    // Zona V — ag=0.10g (vest + nord-vest)
    'CJ':0.10, 'BH':0.10, 'AR':0.10, 'TM':0.10,
    'SM':0.10, 'MM':0.10, 'SJ':0.10, 'BN':0.10,
  };

  // ag → hMaxStory (P100-1/2022 simplificat)
  const agToStory = (ag) =>
    ag >= 0.40 ? { hMaxStory:4,  hMaxM:13  } :
    ag >= 0.35 ? { hMaxStory:6,  hMaxM:20  } :
    ag >= 0.30 ? { hMaxStory:8,  hMaxM:26  } :
    ag >= 0.25 ? { hMaxStory:10, hMaxM:33  } :
    ag >= 0.20 ? { hMaxStory:12, hMaxM:39  } :
    ag >= 0.15 ? { hMaxStory:16, hMaxM:52  } :
                 { hMaxStory:99, hMaxM:300 };

  function waitReady(cb, n) {
    n = n || 0;
    if (n > 80) return;
    if (typeof TCI === 'undefined') { setTimeout(() => waitReady(cb, n+1), 250); return; }
    cb();
  }

  waitReady(() => {
    const _origSeismic = TCI._getSeismicAg.bind(TCI);

    TCI._getSeismicAg = function(lon, lat) {
      // 1. Încearcă per județ (cel mai precis)
      const judet = TCI.d?.judet || TCI.cityData?.judet;
      if (judet && SEISMIC_JUDET[judet] !== undefined) {
        const ag = SEISMIC_JUDET[judet];
        return { ag, ...agToStory(ag), source: 'judet_P100' };
      }

      // 2. Fallback geometric original (pentru zone OSM frontier fără judet)
      const orig = _origSeismic(lon, lat);
      return { ...orig, source: 'bbox_fallback' };
    };

    console.log('[seismic-fix] ✅ _getSeismicAg per județ P100-1/2022 activ');

    // Verificare rapidă
    const testCities = [
      {name:'Iași',     judet:'IS', expected:0.35},
      {name:'Cluj',     judet:'CJ', expected:0.10},
      {name:'Botoșani', judet:'BT', expected:0.20},
      {name:'Timișoara',judet:'TM', expected:0.10},
    ];
    testCities.forEach(c => {
      const orig = TCI.d;
      TCI.d = { judet: c.judet };
      const result = TCI._getSeismicAg(0, 0);
      TCI.d = orig;
      const ok = result.ag === c.expected;
      console.log('[seismic-fix]', ok?'✅':'❌', c.name, '→ ag='+result.ag+'g', ok?'':'(așteptat '+c.expected+'g)');
    });
  });
})();
