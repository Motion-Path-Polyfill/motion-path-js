/* global internalScope */
'use strict';

(function () {
  var isNumeric = internalScope.isNumeric;

  function rotateParse (input) {
    var parseAngleAsDegrees = internalScope.parseAngleAsDegrees;

    /* According to spec:
       https://drafts.csswg.org/css-transforms-2/#propdef-rotate
       unspecified rotate axis default to 0 0 1
    */
    if (input === undefined) {
      return null;
    }

    if (input === 'none') {
      return [0, 0, 1, 0];
    }

    var values = input.split(/\s+/);
    var numValues = values.length;

    if (numValues !== 4 && numValues !== 1) {
      // Incorrect number of arguments for rotate
      return undefined;
    }

    // Convert the given rotation angle to degrees
    var angle = parseAngleAsDegrees(values[numValues - 1]);
    if (angle === null) {
      return undefined;
    }
    values[numValues - 1] = angle;

    for (var i = 0; i < numValues - 1; i++) {
      if (!(isNumeric(values[i]))) {
        // Axis value isn't a number
        return undefined;
      }
      values[i] = Number(values[i]);
    }

    return values;
  }

  function rotateMerge (start, end) {
    return {
      start: start,
      end: end,
      serialize: function (input) {
        return input.join(' ') + 'deg';
      }
    };
  }

  internalScope.rotateParse = rotateParse;
  internalScope.rotateMerge = rotateMerge;
})();
