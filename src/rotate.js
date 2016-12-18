/* global WebAnimationsPolyfillExtension internalScope */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
  }

  function rotateParse (input) {
    var rotationUnit = '';

    /* According to spec:
       https://drafts.csswg.org/css-transforms-2/#propdef-rotate
       unspecified rotate axis default to 0 0 1
    */
    if (input === undefined) {
      return null;
    }

    if (input === 'none') {
      // using deg as default units when angle is 0
      rotationUnit = 'deg';
      internalScope.rotationUnit = rotationUnit;
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
    rotationUnit = unit; // global
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
    internalScope.rotationUnit = rotationUnit;
    return values;
  }

  function merge (start, end) {
    return {
      start: start,
      end: end,
      serialize: function (input) {
        console.log(input);
        return input.join(' ') + internalScope.rotationUnit;
      }
    };
  }

  WebAnimationsPolyfillExtension.register({
    name: 'rotate',
    properties: {
      rotate: {
        parse: rotateParse,
        merge: merge
      }
    }
  });
  internalScope.rotateParse = rotateParse;
})();
