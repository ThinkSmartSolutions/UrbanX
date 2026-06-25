/* ============================================================================
 * UrbanX — three-uniform-guard.js
 * THREE r128 poate apela gl.uniform{2,3,4}fv (forma de ARRAY) cu o valoare
 * ne-iterabila (un THREE.Color {r,g,b} sau un Vector {x,y,z}) cand un uniform
 * e declarat ca vec3[] intr-un shader -> WebGL arunca:
 *   "Failed to execute 'uniform3fv': The object must have a callable @@iterator"
 * -> acel render crapa la FIECARE cadru -> dollhouse/tur randau gol/inghetat.
 *
 * Fix universal, neinvaziv: invelim uniform{2,3,4}fv pe contextul WebGL si
 * coercem orice valoare ne-iterabila (Color -> [r,g,b], Vector -> [x,y,z]) intr-un
 * array inainte de apel. Float32Array / Array trec neschimbate. Mapbox (alt gl)
 * nu paseaza astfel de obiecte -> zero impact acolo.
 * Se incarca IMEDIAT dupa three.min.js.
 * ========================================================================== */
(function () {
  'use strict';
  function coerce(v) {
    try {
      if (v == null) return v;
      if (typeof v.length === 'number') return v;                 // Array / TypedArray
      if (typeof v[Symbol.iterator] === 'function') return v;     // iterabil
      if (typeof v.r === 'number' && typeof v.g === 'number' && typeof v.b === 'number') return [v.r, v.g, v.b]; // THREE.Color
      if (typeof v.x === 'number' && typeof v.y === 'number') return (typeof v.z === 'number') ? [v.x, v.y, v.z] : [v.x, v.y]; // Vector2/3
      return v;
    } catch (e) { return v; }
  }
  ['WebGL2RenderingContext', 'WebGLRenderingContext'].forEach(function (name) {
    try {
      var C = window[name];
      if (!C || !C.prototype || C.prototype.__uxUniGuard) return;
      ['uniform2fv', 'uniform3fv', 'uniform4fv'].forEach(function (fn) {
        var orig = C.prototype[fn];
        if (typeof orig !== 'function') return;
        C.prototype[fn] = function (loc, v) {
          return orig.call(this, loc, coerce(v));
        };
      });
      C.prototype.__uxUniGuard = true;
    } catch (e) {}
  });
})();
