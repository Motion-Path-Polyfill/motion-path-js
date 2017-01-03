/* global internalScope */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
  }

  function flip (start, end) {
    return {
      start: true,
      end: false,
      serialize: function (input) {
        if (input) {
          return start.value + start.unit;
        }
        return end.value + end.unit;
      }
    };
  }

  internalScope.isNumeric = isNumeric;
  internalScope.flip = flip;
})();
