/* global internalScope */
'use strict';

(function () {
  function parseAngleAsDegrees (angle) {
    var angleUnitArray = /(deg|grad|rad|turn)$/.exec(angle);
    if (angleUnitArray === null) {
      return null;
    }

    var unit = angleUnitArray[0];
    var unitlessAngle = angle.substring(0, angle.length - unit.length);
    if (!(isNumeric(unitlessAngle)) || (unitlessAngle === '')) {
      return null;
    }
    unitlessAngle = Number(unitlessAngle);

    var conversionToDegrees = {turn: 360, grad: 0.9, rad: 180 / Math.PI, deg: 1};

    return unitlessAngle * conversionToDegrees[unit];
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

  function isInArray (array, value) {
    return array.indexOf(value) >= 0;
  }

  internalScope.parseAngleAsDegrees = parseAngleAsDegrees;
  internalScope.isNumeric = isNumeric;
  internalScope.flip = flip;
  internalScope.isInArray = isInArray;
})();
