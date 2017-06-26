/* global internalScope */
'use strict';

(function () {
  /* spec for the offset-anchor property:
     https://drafts.fxtf.org/motion-1/#offset-anchor-property

     spec for the offset-position property:
     https://drafts.fxtf.org/motion-1/#offset-position-property

     Sytax of <position>:
     https://drafts.csswg.org/css-values-4/#typedef-position

     We don't support calc expressions because these are not required
     to demonstrate how the properties work. Thus the implicit calc
     expressions right <length> and bottom <length> are not supported.
     right <percentage> and bottom <percentage> are fine.
  */
  function offsetPositionAnchorParse (input) {
    if (input === undefined) {
      return null;
    }

    if (input === 'auto') {
      return input;
    }

    var values = input.trim().split(/\s+/);
    if (values.length === 1) {
      return parseOneValuePosition(values[0]);
    } else if (values.length === 2) {
      return parseTwoValuePosition(values[0], values[1]);
    } else if (values.length === 4) {
      return parseFourValuePosition(values[0], values[1], values[2], values[3]);
    } else {
      return undefined;
    }
  }

  function parseOneValuePosition (value) {
    // "If only one value is specified, the second value is assumed to be ‘center’."
    // https://drafts.csswg.org/css-backgrounds-3/#background-position

    return parseTwoValuePosition(value, 'center');
  }

  function parseTwoValuePosition (first, second) {
    if (first === 'top' || first === 'bottom' || second === 'left' || second === 'right') {
      // Normalize so left|right appear first and/or top|bottom appear last.
      // The position is only valid if there is one vertical value and one
      // horizontal value, and both are keywords (not length-percentage).
      if (!internalScope.isInArray(['top', 'center', 'bottom'], first) ||
          !internalScope.isInArray(['left', 'center', 'right'], second)) {
        return undefined;
      }
      // We received [ top | center | bottom ] [ left | center | right ]
      var temp = first;
      first = second;
      second = temp;
    }

    // We have
    // [ left | center | right | <length-percentage> ]
    // [ top | center | bottom | <length-percentage> ]

    if (first === 'left') {
      first = '0%';
    } else if (first === 'center') {
      first = '50%';
    } else if (first === 'right') {
      first = '100%';
    }

    if (second === 'top') {
      second = '0%';
    } else if (second === 'center') {
      second = '50%';
    } else if (second === 'bottom') {
      second = '100%';
    }

    var leftValue = internalScope.offsetDistanceParse(first);
    var topValue = internalScope.offsetDistanceParse(second);
    if (typeof leftValue === 'undefined' || typeof topValue === 'undefined') {
      return undefined;
    }
    return [leftValue, topValue];
  }

  function parseFourValuePosition (first, second, third, fourth) {
    // Normalize so left|right appear first.
    if (first === 'top' || first === 'bottom') {
      if (!internalScope.isInArray(['left', 'right'], third)) {
        return undefined;
      }
      // We received [ top | bottom ] <length-percentage> [ left | right ] <length-percentage>
      return parseFourValuePosition(third, fourth, first, second);
    }

    // We have [ left | right ] <length-percentage> [ top | bottom ] <length-percentage>

    var leftValue;
    if (first === 'left') {
      leftValue = internalScope.offsetDistanceParse(second);
    } else if (first === 'right') {
      leftValue = mirror(internalScope.offsetDistanceParse(second));
    }

    var topValue;
    if (third === 'top') {
      topValue = internalScope.offsetDistanceParse(fourth);
    } else if (third === 'bottom') {
      topValue = mirror(internalScope.offsetDistanceParse(fourth));
    }

    if (typeof leftValue === 'undefined' || typeof topValue === 'undefined') {
      return undefined;
    }
    return [leftValue, topValue];
  }

  function mirror (distance) {
    if (typeof distance === 'undefined') {
      return undefined;
    }
    if (distance.unit !== '%') {
      // Implicit calc expression [right | bottom] not supported.
      return undefined;
    }
    return {value: 100 - distance.value, unit: '%'};
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
