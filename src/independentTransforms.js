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
      }
    },
    applyHook: {
      callback: function (values) {
        var transformString = internalScope.toTransform(values);
        return {transform: transformString + ' ' + values.transform};
      },
      watchedProperties: ['scale', 'rotate', 'translate', 'transform', 'offset-rotate']
    }
  });
})();
