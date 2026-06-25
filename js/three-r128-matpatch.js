/* ============================================================================
 * UrbanX — three-r128-matpatch.js
 * THREE r128 NU are thickness / sheen / sheenColor / sheenRoughness pe
 * MeshPhysicalMaterial. Zeci de locuri (33/35/44/47/48) le pasează → 556+
 * warning-uri "is not a property of this material" care alarmează utilizatorul
 * si ingreuneaza consola in timpul randarii tur/render.
 *
 * Fix global, neinvaziv: interceptam Material.setValues si pasam doar cheile
 * care exista efectiv pe instanta (restul oricum erau ignorate silentios).
 * Se incarca IMEDIAT dupa three.min.js, inainte de orice fisier care creeaza
 * materiale. NU schimba randarea — doar elimina cheile inerte + warning-urile.
 * ========================================================================== */
(function () {
  'use strict';
  try {
    if (!window.THREE || !THREE.Material || !THREE.Material.prototype) return;
    var proto = THREE.Material.prototype;
    if (proto.__urbanxSetValuesPatched) return;
    var orig = proto.setValues;
    proto.setValues = function (values) {
      if (values && typeof values === 'object') {
        var clean = {}, k;
        for (k in values) {
          if (values[k] === undefined) continue;
          // pastram doar proprietatile reale ale acestei instante de material
          if (k in this) clean[k] = values[k];
        }
        return orig.call(this, clean);
      }
      return orig.call(this, values);
    };
    proto.__urbanxSetValuesPatched = true;
  } catch (e) { /* daca THREE schimba API-ul, nu blocam pagina */ }
})();
