/* ============================================================================
 * UrbanX — 003: Structura standard a rezultatului unui model urban.
 * Vanilla, script tag clasic. Orice model (superbloc/15min/tod/mixed/sponge)
 * întoarce această formă → store, slider before/after, export documente.
 * ========================================================================== */
(function (G) {
  'use strict';
  function createModelResult(modelId, modelName, params) {
    return {
      modelId: modelId,
      modelName: modelName,
      timestamp: Date.now(),
      params: params,
      metrics: [],     // [{id,label,value,unit,direction:'positive'|'negative'|'neutral'}]
      mapLayers: [],   // [{id,type,beforePaint:{},afterPaint:{}}]
      documentContent: {
        siduSection: { projectTitle: '', description: '', justification: '', costEstimate: '', timeline: '', legalBasis: '', indicators: [] },
        masterplanSection: { interventionType: '', affectedArea: '', phasing: [], designPrinciples: [] },
        pmudSection: { measureType: '', trafficImpact: '', modalShift: '', infrastructureNeeded: [] }
      }
    };
  }
  G.createModelResult = createModelResult;
})(window);
