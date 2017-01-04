/* global internalScope */

(function () {
  var isNumeric = internalScope.isNumeric;

  function offsetAnchorParse (input) {
    if (input === 'auto') {
      return input;
    }

    var values = input.split(/\s+/);
    if (values.length !== 2) {
      // if the input is not auto, there must be 2 percentages
      return undefined;
    }

    var position = [];

    for (var value of values) {
      if (!value.endsWith('%')) {
        // value must be a percentage
        return undefined;
      }
      var percentage = value.substring(0, value.length - 1);
      if (!(isNumeric(percentage)) || percentage.length === 0) {
        // precentage must be a number
        return undefined;
      }
      position.push(Number(percentage));
    }

    return position;
  }

  function offsetAnchorMerge (start, end) {
    function serialize (input) {
      if (input === 'auto') {
        return input;
      }
      return input[0] + '% ' + input[1] + '%';
    }

    if (start === 'auto' || end === 'auto') {
      return internalScope.flip(serialize(start), serialize(end));
    }

    return {
      start: start,
      end: end,
      serialize: serialize
    };
  }

  internalScope.offsetAnchorParse = offsetAnchorParse;
  internalScope.offsetAnchorMerge = offsetAnchorMerge;
})();
