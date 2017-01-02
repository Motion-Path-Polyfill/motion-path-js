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

    if (input.charAt(input.length - 1) === '%') {
      distance = input.substring(0, input.length - 1);
      if (!(isNumeric(distance))) {
        // distance must be a number
        return 0;
      }
      return [distance];
    }

    // see if unit is px
    unit = input.substring(input.length - 2, input.length);
    distance = input.substring(0, input.length - 2);
    
    if (unit !== 'px' || !(isNumeric(distance))) {
      // unit must be one of px or % and distance must be a number
      return 0;
    }
    return distance;
  }

  function offsetDistanceMerge (start, end) {
    return {
      start: start,
      end: end,
      serialize: function (input) {
        if (typeof input === 'number') {
            return input + 'px'; 
        }
        return input + '%';
      }
    };
  }

  internalScope.offsetDistanceParse = offsetDistanceParse;
  internalScope.offsetDistanceMerge = offsetDistanceMerge;
})();
