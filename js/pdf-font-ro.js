// ═══════════════════════════════════════════════════════════════════════════
// pdf-font-ro.js — Sanitizare text PDF (jsPDF).
// helvetica jsPDF (WinAnsi) NU are glifele Latin Extended-A/B (ă/ș/ț) -> apar ca
// goluri. Embed-ul de font Unicode nu se activeaza fiabil prin jsPDF aici, deci
// transliteram consistent diacriticele la ASCII (text curat, FARA goluri/erori),
// curatam emoji (nerandabile) si fortam String pe numere (fix 'must be string').
// Wrapper aplicat pe instanta la 'initialized' (text e definit pe instanta, nu pe API).
// NU aliem setFont -> helvetica bold/normal raman corecte.
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var MAP = {
    'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ş': 's', 'ț': 't', 'ţ': 't',
    'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ş': 'S', 'Ț': 'T', 'Ţ': 'T',
    '–': '-', '—': '-', '…': '...', '„': '"', '“': '"', '”': '"',
    '«': '<<', '»': '>>', '•': '-', '·': '-', '→': '->',
    '°': ' gr', '²': '2', '³': '3', '€': 'EUR', '✓': 'OK'
  };
  function _clean(t) {
    if (t === null || t === undefined) return '';
    return String(t)
      .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')        // emoji
      .replace(/[☀-➿]/g, '')               // simboluri misc / emoji
      .replace(/[︀-️‍]/g, '')         // variation selectors / ZWJ
      .replace(/[ăâîșşțţĂÂÎȘŞȚŢ–—…„“”«»•·→°²³€✓]/g,
        function (c) { return MAP[c] != null ? MAP[c] : ''; })
      .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '');      // orice ramane non-ASCII -> eliminat (zero goluri)
  }
  function _register(J) {
    if (!J || J.__roTxt) return;
    J.__roTxt = true;
    J.API.events.push(['initialized', function () {
      try {
        var inst = this;
        if (typeof inst.text === 'function' && !inst.text.__roWrap) {
          var _t = inst.text;
          inst.text = function (text, x, y, opts, transform) {
            try { text = Array.isArray(text) ? text.map(_clean) : _clean(text); } catch (e) { }
            return _t.call(this, text, x, y, opts, transform);
          };
          inst.text.__roWrap = true;
        }
      } catch (e) { }
    }]);
  }
  function _init() { var J = window.jspdf && window.jspdf.jsPDF; if (J) { _register(J); return true; } return false; }
  if (!_init()) { var n = 0, iv = setInterval(function () { if (_init() || ++n > 60) clearInterval(iv); }, 150); }
})();
