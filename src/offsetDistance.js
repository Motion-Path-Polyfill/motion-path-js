/* global internalScope */
'use strict';

(function () {
  var isNumeric = internalScope.isNumeric;

  function offsetDistanceParse (input) {
    var distance = 0;

    if (input === undefined) {
      return undefined;
    }

    if (input.endsWith('%')) {
      distance = input.substring(0, input.length - 1);
      if (!(isNumeric(distance)) || distance.length === 0) {
        // distance must be a number
        return undefined;
      }
      return {value: Number(distance), unit: '%'};
    }

    distance = input.substring(0, input.length - 2);

    if (!input.endsWith('px') || !(isNumeric(distance)) || distance.length === 0) {
      // unit must be one of px or % and distance must be a number
      return undefined;
    }
    return {value: Number(distance), unit: 'px'};
  }

  function offsetDistanceMerge (start, end) {
    function serialize (input) {
      return input + start.unit;
    }

    if (start.unit !== end.unit) {
      return internalScope.flip(start.value + start.unit, end.value + end.unit);
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
