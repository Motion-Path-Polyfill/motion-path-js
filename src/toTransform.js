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
    if (input === undefined || input === 'none') {
      return null;
    }

    var values = input.split(' ');
    var numValues = values.length;

    if (numValues !== 4 && numValues !== 1) {
      throw new InvalidArgument('Incorrect number of arguments for rotate');
    }

    if (values === '') {
      throw new InvalidArgument('Empty string is not a valid argument');
    }

    var angle = values[numValues - 1];
    var angleLength = angle.length;

    var angleUnitArray = /deg|grad|rad|turn/.exec(angle);

    if (angleUnitArray === null) {
      throw new InvalidArgument('Angle units must be one of: deg, grad, rad or turn');
    } else {
      var unit = angleUnitArray[0];
    }

    var unitLength = unit.length;
    var number = angle.substring(0, angleLength - unitLength);
    if (!(isNumeric(number))) {
      throw new InvalidArgument('Angle given must be a number followed by units');
    }

    if (numValues > 1) {
      for (var i = 0; i < numValues - 1; i++) {
        if (!(isNumeric(values[i]))) {
          throw new InvalidArgument('Axis value must be a number');
        }
      }
    }

    return 'rotate(' + values.join(', ') + ')';
  }

  function toTransform (properties) {
    return [
      convertTranslate(properties.translate),
      convertRotate(properties.rotate)
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }

  window.InvalidArgument = InvalidArgument;
  window.toTransform = toTransform;
})();
