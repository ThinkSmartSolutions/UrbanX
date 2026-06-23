/* ============================================================================
 * UrbanX — 003: Store global pentru scenariile de modele urbane.
 * Persistă în localStorage. Nu suprascrie o instanță existentă (GLOBAL_STATE).
 * ========================================================================== */
(function (G) {
  'use strict';
  if (G.UrbanModelsStore) { console.warn('003: UrbanModelsStore există deja'); return; }
  function uuid() { try { if (G.crypto && G.crypto.randomUUID) return G.crypto.randomUUID(); } catch (e) {} return 'um_' + Date.now() + '_' + Math.round(Math.random() * 1e6); }
  var store = {
    scenarios: (function () { try { return JSON.parse(localStorage.getItem('urbanx_urban_models') || '[]'); } catch (e) { return []; } })(),
    activeResult: null,
    transitionProgress: 0,
    _listeners: [],
    save: function (name, result) {
      var s = { id: uuid(), name: name, result: result, createdAt: Date.now() };
      this.scenarios.push(s);
      try { localStorage.setItem('urbanx_urban_models', JSON.stringify(this.scenarios)); } catch (e) {}
      this._notify('save'); return s;
    },
    delete: function (id) {
      this.scenarios = this.scenarios.filter(function (s) { return s.id !== id; });
      try { localStorage.setItem('urbanx_urban_models', JSON.stringify(this.scenarios)); } catch (e) {}
      this._notify('delete');
    },
    setActive: function (result) { this.activeResult = result; this._notify('active'); },
    setTransition: function (value) { this.transitionProgress = Math.max(0, Math.min(100, value)); this._notify('transition'); },
    onChange: function (fn) { this._listeners.push(fn); },
    _notify: function (type) { this._listeners.forEach(function (fn) { try { fn(type); } catch (e) { console.warn('003 listener', e); } }); }
  };
  G.UrbanModelsStore = store;
})(window);
