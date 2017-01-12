/* global internalScope */

(function () {
  /* spec for the offset-anchor property:
     https://drafts.fxtf.org/motion-1/#offset-anchor-property

     spec for the offset-position property:
     https://drafts.fxtf.org/motion-1/#offset-position-property
  */
  var isNumeric = internalScope.isNumeric;

  function offsetPositionAnchorParse (input) {
    // TODO: add support for the full range of <position> values in the grammar.
    if (input === undefined) {
      return null;
    }

    if (input === 'auto') {
      return input;
    }

    var values = input.split(/\s+/);
    if (values.length !== 2) {
      // if the input is not auto, there must be 2 percentages
      return undefined;
    }

    for (var i = 0; i < values.length; i++) {
      if (!values[i].endsWith('%')) {
        // value must be a percentage
        return undefined;
      }
      var percentage = values[i].substring(0, values[i].length - 1);
      if (!(isNumeric(percentage)) || percentage.length === 0) {
        // precentage must be a number
        return undefined;
      }
      values[i] = Number(percentage);
    }

    return values;
  }

  function offsetPositionAnchorMerge (start, end) {
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

  internalScope.offsetPositionAnchorParse = offsetPositionAnchorParse;
  internalScope.offsetPositionAnchorMerge = offsetPositionAnchorMerge;
})();
