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
    
    if(angleDegrees === '') {
      return null;
    }

    if (!(isNumeric(angleDegrees))) {
      return null;
    }

    // To now convert angle to degrees
    var conversion = {turn: 360, grad: 0.9, rad: 180 / Math.PI, deg: 1};
    angleDegrees *= conversion[unit];
    return angleDegrees;
  }

  function offsetRotateParse (input) {
    // Link to off-set rotate:
    // https://drafts.fxtf.org/motion-1/#offset-rotate-property
    
    if (input === undefined) {
      return null;
    } else if (input === 'none') {
      return 'auto';
    }

    var values = input.split(/\s+/);
    var numValues = values.length;
    if (numValues < 1 || numValues > 2) {
      // Invalid number of arguments for offset-rotate
      return undefined;
    }

    var autoProvided = false;
    var angle = 0;

    for (var i = 0; i < numValues; i++) {
      if (values[i] === 'auto') {
        // Check that either 'auto' or 'reverse' was provided and only once
        if(autoProvided) { 
          return undefined;
        }
        autoProvided = true;
      } else if (values[i] === 'reverse') {
        if(autoProvided) { 
          return undefined;
        }
        // The 'reverse' is equivalent to 'auto 180deg'
        autoProvided = true;
        angle += 180;
      } else {
        var angleDegrees = convertToDegrees(values[i]);
        if (angleDegrees === null) {
          return undefined;
        }
        angle += angleDegrees;
      }
    }

    return {angle: angle, auto: autoProvided};
  }

  function offsetRotateMerge (start, end) {
    function serializeParsed(input) {
      if (input.auto) {
          return 'auto ' + input.angle + 'deg';
      }
      return input.angle + 'deg';
    }

    if (start.auto !== end.auto) {
      return internalScope.flip(serializeParsed(start), serializeParsed(end));
    }

    return {
      start: start.angle,
      end: end.angle,
      serialize: function (angle) {
        return serializeParsed({
          angle: angle,
          auto: start.auto
        });
      }
    };
  }

  internalScope.offsetRotateParse = offsetRotateParse;
  internalScope.offsetRotateMerge = offsetRotateMerge;
})();

