/* global internalScope */

(function () {
  /* spec for the offset-anchor property:
     https://drafts.fxtf.org/motion-1/#offset-anchor-property

     spec for the offset-position property:
     https://drafts.fxtf.org/motion-1/#offset-position-property
  */
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
      // if the input is not auto, there must be 2 distances.
      return undefined;
    }

    var result = values.map(internalScope.offsetDistanceParse);
    if (typeof result[0] === 'undefined' || typeof result[1] === 'undefined') {
      return undefined;
    }

    return result;
  }

  function offsetPositionAnchorMerge (start, end) {
    function serializeNonInterpolable (input) {
      if (input === 'auto') {
        return input;
      }
      return input[0].value + input[0].unit + ' ' + input[1].value + input[1].unit;
    }

    function serialize (input) {
      return input[0] + start[0].unit + ' ' + input[1] + start[1].unit;
    }

    if (start === 'auto' || end === 'auto') {
      return internalScope.flip(serializeNonInterpolable(start), serializeNonInterpolable(end));
    }

    if ((start[0].unit !== end[0].unit) || (start[1].unit !== end[1].unit)) {
      return internalScope.flip(serializeNonInterpolable(start), serializeNonInterpolable(end));
    }

    return {
      start: [start[0].value, start[1].value],
      end: [end[0].value, end[1].value],
      serialize: serialize
    };
  }

  internalScope.offsetPositionAnchorParse = offsetPositionAnchorParse;
  internalScope.offsetPositionAnchorMerge = offsetPositionAnchorMerge;
})();
