/* global internalScope */

(function () {
  var isNumeric = internalScope.isNumeric;

  function rotateParse (input) {
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

    var angle = values[numValues - 1];
    var angleUnitArray = /(deg|grad|rad|turn)$/.exec(angle);

    if (angleUnitArray === null) {
      // Angle units isn't one of: deg, grad, rad or turn
      return undefined;
    }

    var unit = angleUnitArray[0];
    var number = angle.substring(0, angle.length - unit.length);
    if (!(isNumeric(number))) {
      // Angle given must be a number followed by units
      return undefined;
    }

    for (var i = 0; i < numValues - 1; i++) {
      if (!(isNumeric(values[i]))) {
        // Axis value isn't a number
        return undefined;
      }
      values[i] = Number(values[i]);
    }

    // Add rotation values without its unit characters
    values[numValues - 1] = Number(number);

    // all units will be converted to degrees
    var conversion = {turn: 360, grad: 0.9, rad: 180 / Math.PI, deg: 1};
    values[numValues - 1] = values[numValues - 1] * conversion[unit];

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
