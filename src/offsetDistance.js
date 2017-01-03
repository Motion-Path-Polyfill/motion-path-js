/* global internalScope */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
  }

  function offsetDistanceParse (input) {
    /* According to spec:
       https://drafts.fxtf.org/motion-1/#offset-distance-property
       initial value is 0 so will return 0 on undefined.
       Will return a number when units is px and a number array if units is %.
    */
    if (input === undefined) {
      return 0;
    }

    var distance = 0;

    if (input.endsWith('%')) {
      distance = input.substring(0, input.length - 1);
      if (!(isNumeric(distance))) {
        // distance must be a number
        return 0;
      }
      return [Number(distance)];
    }

    distance = input.substring(0, input.length - 2);

    if (!input.endsWith('px') || !(isNumeric(distance))) {
      // unit must be one of px or % and distance must be a number
      return 0;
    }
    return Number(distance);
  }

  function offsetDistanceMerge (start, end) {
    function serialize (input) {
      if (typeof input === 'number') {
        return input + 'px';
      }
      return input[0] + '%';
    }

    if (typeof start !== typeof end) {
      return {
        start: true,
        end: false,
        serialize: function (input) {
          if (input) {
            return serialize(start);
          }
          return serialize(end);
        }
      };
    }
    return {
      start: start,
      end: end,
      serialize: serialize
    };
  }

  internalScope.offsetDistanceParse = offsetDistanceParse;
  internalScope.offsetDistanceMerge = offsetDistanceMerge;
})();
