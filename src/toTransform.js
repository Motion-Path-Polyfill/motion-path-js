(function () {
  function InvalidArgument (message) {
    this.message = message;
    this.name = 'InvalidArgument';
  }

  function isNumeric (number) {
    return !isNaN(number);
  }

  function convertTranslate (values) {
    if (values === undefined || values === 'none') {
      return null;
    }

    var valuesArray = values.split(' ');
    var numValues = valuesArray.length;

    if (numValues > 3) {
      throw new InvalidArgument('Too many values for translate');
    }

    for (var i = 0; i < numValues; i++) {
      var elementLength = valuesArray[i].length;
      if (elementLength <= 2) {
        throw new InvalidArgument('Incorrect argument for translate');
      }

      // Check if units are px
      var unit = valuesArray[i].substring(elementLength - 2, elementLength);
      if (unit !== 'px') {
        throw new InvalidArgument('Incorrect units for translate');
      }

      // Check if characters before 'px' are valid numbers
      var number = valuesArray[i].substring(0, elementLength - 2);
      if (!isNumeric(number)) {
        throw new InvalidArgument('Argument must be a number');
      }
    }

    return 'translate(' + valuesArray.join(', ') + ')';
  }

  function convertRotate (values) {
    if (values === undefined || values === 'none') {
      return null;
    }

    var valuesArray = values.split(' ');
    var numValues = valuesArray.length;

    if (numValues !== 4 && numValues !== 1) {
      throw new InvalidArgument('Incorrect number of arguments for rotate');
    }

    if (numValues === 1 && valuesArray[0] === '') {
      throw new InvalidArgument('Empty string is not a valid argument');
    }

    var angleUnits = ['deg', 'grad', 'rad', 'turn'];
    var angleUnit = valuesArray[numValues - 1];

    var foundUnit = 0;
    var unit = angleUnit.substring(angleUnit.length - 4, angleUnit.length);

    if (angleUnits.indexOf(unit) !== -1) {
      foundUnit = 1;
    }

    if (foundUnit === 0) {
      unit = angleUnit.substring(angleUnit.length - 3, angleUnit.length);
      if (angleUnits.indexOf(unit) !== -1) {
        foundUnit = 1;
      }
    }

    if (foundUnit === 0) {
      throw new InvalidArgument('Angle units must be one of: deg, grad, rad or turn');
    }

    var angleLength = angleUnit.length;
    var unitLength = unit.length;
    var number = angleUnit.substring(0, angleLength - unitLength);
    if (!(isNumeric(number))) {
      throw new InvalidArgument('Angle given must be a number followed by units');
    }

    if (numValues > 1) {
      for (var i = 0; i < numValues - 1; i++) {
        if (!(isNumeric(valuesArray[i]))) {
          throw new InvalidArgument('Axis value must be a number');
        }
      }
    }

    return 'rotate(' + valuesArray.join(', ') + ')';
  }

  function toTransform (properties) {
    var results = [];
    var conversion = convertTranslate(properties.translate);

    if (conversion !== null) {
      results.push(conversion);
    }

    conversion = convertRotate(properties.rotate);

    if (conversion !== null) {
      results.push(conversion);
    }

    return results.join(' ');
  }

  window.InvalidArgument = InvalidArgument;
  window.toTransform = toTransform;
})();
