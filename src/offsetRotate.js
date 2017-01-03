/* global internalScope */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
  }

  function convertToDegrees (angle) {
    var angleUnitArray = /(deg|grad|rad|turn)$/.exec(angle);
    if (angleUnitArray === null) {
      return undefined;
    }

    var unit = angleUnitArray[0];
    var angleDegrees = angle.substring(0, angle.length - unit.length);
    if (!(isNumeric(angleDegrees))) {
      return undefined;
    }

    // To now convert angle to degrees
    var conversion = {turn: 360, grad: 0.9, rad: 180 / Math.PI, deg: 1};
    angleDegrees *= conversion[unit];
    return angleDegrees;
  }

  function offsetRotateParse (input) {
    if (input === undefined) {
      return null;
    } else if (input === 'none') {
      return 'auto';
    }

    var values = input.split(/\s+/);
    var numValues = values.length;
    if (numValues < 1 || numValues > 2) {
      // Incorrect number of values for scale
      return undefined;
    }

    var autoProvided = false;
    var angle = 0;

    for (var i = 0; i < numValues; i++) {
      // Check if the first argument was auto
      if (i === 0 && values[i] === 'auto') { // Check if the first arugment provided was 'auto'
        autoProvided = true;
      }
      if (i === 0 && values[i] === 'reverse') { // Check if the first arugment provided was 'reverse'
        // The 'reverse' is equivalent to 'auto 180deg'
        autoProvided = true;
        angle += 180;
      }
      if (numValues === 1 && !autoProvided && i === 0) { // Only an 'angle' value was provided
        angle += convertToDegrees(values[i]);
      }

      if (numValues === 2 && autoProvided && i === 1) { // 'auto' or 'reverse' was provided with an 'angle'
        angle += convertToDegrees(values[i]);
      }
    }

    return {angle: angle, auto: autoProvided};
  }

  function offsetRotateMerge (start, end) {
    var startValue;
    var endValue;

    if (start.auto !== end.auto) {
      startValue = true;
      endValue = false;
    } else {
      startValue = start.angle;
      endValue = end.angle;
    }

    return {
      start: startValue,
      end: endValue,
      serialize: function (input) {
        if (start.auto || end.auto) {
          return 'auto ' + input + 'deg';
        }
        return input + 'deg';
      }
    };
  }

  internalScope.offsetRotateParse = offsetRotateParse;
  internalScope.offsetRotateMerge = offsetRotateMerge;
})();

