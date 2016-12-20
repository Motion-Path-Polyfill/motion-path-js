/* global WebAnimationsPolyfillExtension internalScope */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
  }

  function translateParse (input) {
    if (input === undefined) {
      // TODO: move handling of undefined to toTransform as that's where it is expected
      return null;
    } else if (input === 'none') {
      return [0, 0, 0]; // For the default translate3d(0, 0, 0)
    }

    var inputValues = input.split(/\s+/);
    var numValues = inputValues.length;

    var valuesArray = [];

    if (numValues < 1 || numValues > 3) {
      // Invalid number of arguments
      return undefined;
    }

    for (var i = 0; i < numValues; i++) {
      var elementLength = inputValues[i].length;

      // Get the number before the unit characters
      var numberString = inputValues[i].substring(0, elementLength - 2);
      if (!isNumeric(numberString)) {
        return undefined;
      }

      // TODO: Check for units other than px
      var unit = inputValues[i].substring(elementLength - 2, elementLength);
      if (unit !== 'px') {
        // Element has invalid units for translation
        return undefined;
      }

      valuesArray[i] = Number(numberString);
    }

    while (valuesArray.length < 3) {
      // According to spec:
      // https://drafts.csswg.org/css-transforms-2/#propdef-translate
      // The default value an unspecified axis is o
      valuesArray.push(0);
    }

    return valuesArray;
  }

  function translateMerge (start, end) {
    return {
      start: start,
      end: end,
      serialize: function (valuesArray) {
        var result = valuesArray.map(function (x) {
          return x + 'px';
        }).join(' ');

        return result;
      }
    };
  }

  internalScope.translateParse = translateParse;
  internalScope.translateMerge = translateMerge;
})();
