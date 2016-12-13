/* global WebAnimationsPolyfillExtension internalScope*/

(function () {

  function isNumeric (number) {
    return !isNaN(number);
  }

  function addDefaultAxis (values) {
    if (values.length === 1) { // x-axis was specified
      values.push(1, 1);
    } else if (values.length === 2) { // x and y-axis were specified
      values.push(1);
    }
    return values;
  }

  function scaleParse (input) {
    var InvalidArgument = internalScope.InvalidArgument; 
    /* According to spec:
      https://drafts.csswg.org/css-transforms-2/#propdef-scale
      unspecified scales default to 1
    */
    if (input === undefined) {
      return null;
    } else if (input === 'none') {
      return [1, 1, 1];
    }

    var values = input.split(/\s+/);
    var numValues = values.length;
    if (numValues < 1 || numValues > 3) {
      throw new InvalidArgument('Incorrect number of values for scale');
    }

    for (var i = 0; i < numValues; i++) {
      if (values[i] === '') {
        throw new InvalidArgument('Argument cannot be an empty string');
      }

      if (!isNumeric(values[i])) {
        throw new InvalidArgument('Argument must be a number');
      }
    }

    for (var j = 0; j < numValues; j++) {
      values[j] = Number(values[j]);
    }

    values = addDefaultAxis(values);

    return values;
  }

  function merge (start, end) {
    return {
      start: start,
      end: end,
      serialize: function (input) {
        return input.join(' ');
      }
    };
  }

  WebAnimationsPolyfillExtension.register({
    name: 'scale',
    properties: {
      scale: {
        parse: scaleParse,
        merge: merge
      }
    },
    applyHook: {
      callback: function (values) {
        var toTransform = internalScope.toTransform;
        //var scale = values.scale;
        var transformString = toTransform(values);
        /*if (scale === undefined) {
          return null;
        } else if (scale === 'none') {
          //return {transform: 'scale(1, 1, 1)' + values.transform};
          tranformSr
        }*/

        //var valuesArray = values.scale.split(/\s+/);
        //var scaleStr = 'scale3d(' + valuesArray.join(', ') + ')';

        return {transform: transformString + ' ' + values.transform};
      },
      watchedProperties: ['scale', 'transform']
    }
  });
  internalScope.scaleParse = scaleParse;
})();
