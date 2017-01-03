/* global internalScope */

(function () {
  var isNumeric = internalScope.isNumeric;

  function offsetDistanceParse (input) {
    /* According to spec:
       https://drafts.fxtf.org/motion-1/#offset-distance-property
       initial value is 0 so will return 0 on undefined.
       Will return a number when units is px and a number array if units is %.
    */
    if (input === undefined) {
      return {value: 0, unit: 'px'};
    }

    var distance = 0;

    if (input.endsWith('%')) {
      distance = input.substring(0, input.length - 1);
      if (!(isNumeric(distance))) {
        // distance must be a number
        return {value: 0, unit: 'px'};
      }
      return {value: Number(distance), unit: '%'};
    }

    distance = input.substring(0, input.length - 2);

    if (!input.endsWith('px') || !(isNumeric(distance))) {
      // unit must be one of px or % and distance must be a number
      return {value: 0, unit: 'px'};
    }
    return {value: Number(distance), unit: 'px'};
  }

  function offsetDistanceMerge (start, end) {
    function serialize (input) {
      return input + start.unit;
    }

    if (start.unit !== end.unit) {
      return internalScope.flip(start, end);
    }

    return {
      start: start.value,
      end: end.value,
      serialize: serialize
    };
  }

  internalScope.offsetDistanceParse = offsetDistanceParse;
  internalScope.offsetDistanceMerge = offsetDistanceMerge;
})();
