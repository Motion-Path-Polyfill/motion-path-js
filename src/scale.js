/* global internalScope */
'use strict';

(function () {
  var isNumeric = internalScope.isNumeric;

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

  function scaleMerge (start, end) {
    return {
      start: start,
      end: end,
      serialize: function (input) {
        return input.join(' ');
      }
    };
  }

  internalScope.scaleParse = scaleParse;
  internalScope.scaleMerge = scaleMerge;
})();
