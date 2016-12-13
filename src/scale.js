/* global  WebAnimationsPolyfillExtension */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
  }

  function InvalidArgument (message) {
    this.message = message;
    this.name = 'InvalidArgument';
  }

  function addDefaultAxis (values) {
    if (values.length === 1) { // x-axis was specified
      values.push(1, 1);
    } else if (values.length === 2) { // x and y-axis were specified
      values.push(1);
    }
    return values;
  }

  function parse (input) {
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
        parse: parse,
        merge: merge
      }
    },
    applyHook: {
      callback: function (values) {
        var scale = values.scale;
        if (scale === undefined) {
          return null;
        } else if (scale === 'none') {
          return {transform: 'scale(1)' + values.transform};
        }

        var valuesArray = values.scale.split(/\s+/);
        var scaleStr = 'scale3d(' + valuesArray.join(', ') + ')';

        return {transform: scaleStr + ' ' + values.transform};
      },
      watchedProperties: ['scale', 'transform']
    }
  });
})();
