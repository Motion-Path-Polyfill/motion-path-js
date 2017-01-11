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
      callback: function (values) {
        /* TODO: set scale, rotate and translate to none once they are supported.
                 link to bug: crbug.com/679873 */
        var transformString = internalScope.toTransform(values);
        if (internalScope.webAnimationsJsTesting) {
          return {
            transform: transformString + ' ' + values.transform,
            scaleForTesting: values.scale,
            rotateForTesting: values.rotate,
            translateForTesting: values.translate,
            scale: '1 1 1',
            rotate: '0deg',
            translate: '0px'
          };
        }
        return {
          transform: transformString + ' ' + values.transform,
          scale: '1 1 1',
          rotate: '0deg',
          translate: '0px'};
      },
      watchedProperties: ['scale', 'rotate', 'translate', 'transform']
    }
  });
})();
