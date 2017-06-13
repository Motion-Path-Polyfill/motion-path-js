/* global internalScope */
'use strict';

(function () {
  function offsetRotateParse (input) {
    // https://drafts.fxtf.org/motion-1/#offset-rotate-property

    var parseAngleAsDegrees = internalScope.parseAngleAsDegrees;

    if (input === undefined) {
      return null;
    }

    var values = input.split(/\s+/);
    var numValues = values.length;
    if (numValues < 1 || numValues > 2) {
      // Invalid number of arguments for offset-rotate
      return undefined;
    }

    var autoProvided = false;
    var angleProvided = false;
    var angle = 0;

    for (var i = 0; i < numValues; i++) {
      if (values[i] === 'auto') {
        // Check that either 'auto' or 'reverse' was provided and only once
        if (autoProvided) {
          return undefined;
        }
        autoProvided = true;
      } else if (values[i] === 'reverse') {
        if (autoProvided) {
          return undefined;
        }
        // The 'reverse' is equivalent to 'auto 180deg'
        autoProvided = true;
        angle += 180;
      } else {
        var angleDegrees = parseAngleAsDegrees(values[i]);
        if (angleDegrees === null || angleProvided) {
          return undefined;
        }
        angleProvided = true;
        angle += angleDegrees;
      }
    }

    return {angle: angle, auto: autoProvided};
  }

  function offsetRotateMerge (start, end) {
    function serializeParsed (input) {
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
