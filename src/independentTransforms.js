/* global WebAnimationsPolyfillExtension internalScope */

(function () {
  WebAnimationsPolyfillExtension.register({
    name: 'transforms',
    properties: {
      translate: {
        parse: internalScope.translateParse,
        merge: internalScope.translateMerge
      },
      scale: {
        parse: internalScope.scaleParse,
        merge: internalScope.scaleMerge
      },
      rotate: {
        parse: internalScope.rotateParse,
        merge: internalScope.rotateMerge
      },
      'offset-rotate': {
        parse: internalScope.offsetRotateParse,
        merge: internalScope.offsetRotateMerge
      },
      'offset-distance': {
        parse: internalScope.offsetDistanceParse,
        merge: internalScope.offsetDistanceMerge
      },
      'offset-path': {
        parse: internalScope.offsetPathParse,
        merge: internalScope.offsetPathMerge
      },
      'offset-anchor': {
        parse: internalScope.offsetPositionAnchorParse,
        merge: internalScope.offsetPositionAnchorMerge
      },
      'offset-position': {
        parse: internalScope.offsetPositionAnchorParse,
        merge: internalScope.offsetPositionAnchorMerge
      }
    },
    applyHook: {
      callback: function (values, element) {
        var transformString = internalScope.toTransform(values, element);
        return {transform: transformString + ' ' + values.transform};
      },
      watchedProperties: ['scale', 'rotate', 'translate', 'transform']
    }
  });
})();
