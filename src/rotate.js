/* global WebAnimationsPolyfillExtension internalScope */

(function () {  
  function isNumeric (number) {
    return !isNaN(number);
  }

  function rotateParse (input) {
    var InvalidArgument = internalScope.InvalidArgument;
    var rotationUnit = '';

    /* According to spec:
       https://drafts.csswg.org/css-transforms-2/#propdef-rotate
       unspecified rotate axis default to 0 0 1
    */
    if (input === undefined) {
      return null;
    } else if (input === 'none') {
      rotationUnit = 'deg'; // using deg as default units when angle is 0
      return [0, 0, 1, 0];
    }

    var values = input.split(/\s+/);
    var numValues = values.length;

    if (numValues !== 4 && numValues !== 1) {
      throw new InvalidArgument('Incorrect number of arguments for rotate');
    }

    var angle = values[numValues - 1];
    var angleUnitArray = /(deg|grad|rad|turn)$/.exec(angle);

    if (angleUnitArray === null) {
      throw new InvalidArgument('Angle units must be one of: deg, grad, rad or turn');
    }

    var unit = angleUnitArray[0];
    rotationUnit = unit; // global
    var number = angle.substring(0, angle.length - unit.length);
    if (!(isNumeric(number))) {
      throw new InvalidArgument('Angle given must be a number followed by units');
    }

    if (numValues > 1) {
      for (var i = 0; i < numValues - 1; i++) {
        if (!(isNumeric(values[i]))) {
          throw new InvalidArgument('Axis value must be a number');
        }
      }
    }

    for (var j = 0; j < numValues - 1; j++) {
      values[j] = Number(values[j]);
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
        return input.join(' ') + internalScope.rotationUnit;
      }
    };
  }

  function parseManager (input) {
    var InvalidArgument = internalScope.InvalidArgument;
    try {
      return rotateParse(input);
    } catch (error) {
      if (error.constructor === InvalidArgument) {
        return undefined;
      }
      throw error;
    }
  }

  WebAnimationsPolyfillExtension.register({
    name: 'rotate',
    properties: {
      rotate: {
        parse: parseManager,
        merge: merge
      }
    },
    applyHook: {
      callback: function (values) {
        var transformString = internalScope.toTransform(values);
        return {transform: transformString + ' ' + values.transform};
      },
      watchedProperties: ['rotate', 'transform']
    }
  });
  internalScope.rotateParse = rotateParse;
})();