/* global WebAnimationsPolyfillExtension internalScope */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
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
      if (values[i] === '' || !isNumeric(values[i])) {
        throw new InvalidArgument('Argument must be a number');
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

  function parseManager (input) {
    var InvalidArgument = internalScope.InvalidArgument;
    try {
      return scaleParse(input);
    } catch (error) {
      if (error.constructor === InvalidArgument) {
        return undefined;
      } 
      throw error;
    }
  }

  WebAnimationsPolyfillExtension.register({
    name: 'scale',
    properties: {
      scale: {
        parse: parseManager,
        merge: merge
      }
    },
    applyHook: {
      callback: function (values) {
        var transformString = internalScope.toTransform(values);
        return {transform: transformString + ' ' + values.transform};
      },
      watchedProperties: ['scale', 'transform']
    }
  });
  internalScope.scaleParse = scaleParse;
})();
