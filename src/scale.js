/* global WebAnimationsPolyfillExtension internalScope */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
  }

  function scaleParse (input) {
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
      // Incorrect number of values for scale
      return undefined;
    }

    for (var i = 0; i < numValues; i++) {
      if (values[i] === '' || !isNumeric(values[i])) {
        // Argument must be a number
        return undefined;
      }
    }

    values = values.map(Number);

    while (values.length < 3) {
      values.push(1);
    }

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
        var transformString = internalScope.toTransform(values);
        return {transform: transformString + ' ' + values.transform};
      },
      watchedProperties: ['scale', 'rotate', 'translate', 'transform']
    }
  });
  internalScope.scaleParse = scaleParse;
})();
