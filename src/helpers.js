/* global assert internalScope */

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

  function assertInterpolation ({property, from, to}, expectation, propertyToAnimate) {
    var target = document.createElement('div');

    for (var {at, is} of expectation) {
      var timing = {duration: 1, fill: 'forwards'};

      assert.equal((at > 1 || at < 0), false, "Invalid value for 'at'");

      var animation;

      var keyframes = {[property]: [from, to]};
      animation = target.animate(keyframes, timing);

      animation.currentTime = at;
      var result = target.style._getAnimated(propertyToAnimate);
      animation.cancel();

      assert.equal(result, is, 'For: ' + JSON.stringify({property, from, to}) + ' at: ' + at + '\n');
    }
  }

  internalScope.parseAngleAsDegrees = parseAngleAsDegrees;
  internalScope.isNumeric = isNumeric;
  internalScope.flip = flip;
  internalScope.assertInterpolation = assertInterpolation;
})();
