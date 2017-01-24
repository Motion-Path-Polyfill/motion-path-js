/* global WebAnimationsPolyfillExtension internalScope */
'use strict';

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
      offsetRotate: {
        parse: internalScope.offsetRotateParse,
        merge: internalScope.offsetRotateMerge
      },
      offsetDistance: {
        parse: internalScope.offsetDistanceParse,
        merge: internalScope.offsetDistanceMerge
      },
      offsetPath: {
        parse: internalScope.offsetPathParse,
        merge: internalScope.offsetPathMerge
      },
      offsetAnchor: {
        parse: internalScope.offsetPositionAnchorParse,
        merge: internalScope.offsetPositionAnchorMerge
      },
      offsetPosition: {
        parse: internalScope.offsetPositionAnchorParse,
        merge: internalScope.offsetPositionAnchorMerge
      }
    },
    applyHook: {
      callback: function (values, element) {
        var transformString = internalScope.toTransform(values, element);
        var result = {
          transform: transformString + ' ' + values.transform,
          // TODO: set scale, rotate and translate to none once they are supported. Link to bug: crbug.com/679873
          scale: '1 1 1',
          rotate: '0deg',
          translate: '0px'
        };

        if (internalScope.webAnimationsJsTesting) {
          result['scaleForTesting'] = values.scale;
          result['rotateForTesting'] = values.rotate;
          result['translateForTesting'] = values.translate;
        }

        return result;
      },
      watchedProperties: ['scale', 'rotate', 'translate', 'transform', 'offsetDistance', 'offsetPath', 'offsetPosition', 'offsetAnchor', 'offsetRotate']
    }
  });
})();
