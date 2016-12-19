/* global internalScope */

(function () {
  function InvalidArgument (message) {
    this.message = message;
    this.name = 'InvalidArgument';
  }

  function isNumeric (number) {
    return !isNaN(number);
  }

  function convertTranslate (input) {
    if (input === undefined || input === 'none') {
      return null;
    }

    var values = input.split(' ');
    var numValues = values.length;

    if (numValues > 3) {
      throw new InvalidArgument('Too many values for translate');
    }

    for (var i = 0; i < numValues; i++) {
      var elementLength = values[i].length;
      if (elementLength <= 2) {
        throw new InvalidArgument('Incorrect argument for translate');
      }

      // Check if units are px
      var unit = values[i].substring(elementLength - 2, elementLength);
      if (unit !== 'px') {
        throw new InvalidArgument('Incorrect units for translate');
      }

      // Check if characters before 'px' are valid numbers
      var number = values[i].substring(0, elementLength - 2);
      if (!isNumeric(number)) {
        throw new InvalidArgument('Argument must be a number');
      }
    }

    return 'translate(' + values.join(', ') + ')';
  }

  function convertRotate (input) {
    var valuesArray = internalScope.rotateParse(input);
    if (valuesArray === null || valuesArray === undefined) {
      return null;
    }

    if (valuesArray.length > 1) {
      return 'rotate3d(' + valuesArray.join(', ') + 'deg)';
    }
    return 'rotate(' + valuesArray.join(', ') + 'deg)';
  }

  function convertScale (input) {
    var valuesArray = internalScope.scaleParse(input);
    if (valuesArray === null || valuesArray === undefined) {
      return null;
    }
    return 'scale3d(' + valuesArray.join(', ') + ')';
  }

  function toTransform (properties) {
    return [
      convertTranslate(properties.translate),
      convertRotate(properties.rotate),
      convertScale(properties.scale)
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }
  internalScope.InvalidArgument = InvalidArgument;
  internalScope.toTransform = toTransform;
})();
