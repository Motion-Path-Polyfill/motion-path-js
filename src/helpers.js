/* global internalScope */

(function () {
  function convertToDegrees (angle) {
    var angleUnitArray = /(deg|grad|rad|turn)$/.exec(angle);
    if (angleUnitArray === null) {
      return null;
    }

    var unit = angleUnitArray[0];
    var angleDegrees = angle.substring(0, angle.length - unit.length);

    if (angleDegrees === '') {
      return null;
    }

    if (!(isNumeric(angleDegrees))) {
      return null;
    }

    angleDegrees = Number(angleDegrees);
    // To now convert angle to degrees
    var conversion = {turn: 360, grad: 0.9, rad: 180 / Math.PI, deg: 1};
    angleDegrees *= conversion[unit];
    return angleDegrees;
  }

  function isNumeric (number) {
    return !isNaN(number);
  }

  function flip (start, end) {
    return {
      start: true,
      end: false,
      serialize: function (input) {
        if (input) {
          return start;
        }
        return end;
      }
    };
  }

  internalScope.convertToDegrees = convertToDegrees;
  internalScope.isNumeric = isNumeric;
  internalScope.flip = flip;
})();
