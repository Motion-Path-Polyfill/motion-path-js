(function () {
  function InvalidArgument (message) {
    this.message = message;
    this.name = 'InvalidArgument';
  }

  function isNumeric (number) {
    return !isNaN(number);
  }

  function convertTranslate (properties) {
    var result = '';
    if (!(properties.translate !== undefined && properties.translate !== 'none')) {
      return result;
    }
    result += 'translate(';

    var values = properties.translate;
    var valuesArray = values.split(' ');
    var numValues = valuesArray.length;

    if (numValues > 3) {
      throw new InvalidArgument('Too many values for translate');
    }

    if (numValues === 1 && valuesArray[0] === '') {
      throw new InvalidArgument('Empty string is not a valid argument');
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
      var number = valuesArray[i].substring(0, numValues - 2);
      if (!isNumeric(number)) {
        throw new InvalidArgument('Argument must be a number');
      }
    }

    result += valuesArray.join(', ') + ')';

    return result;
  }

  /**
  * This function is a WIP.
  */
  function convertRotate (properties) {
    var result = '';
    if (!(properties.rotate !== undefined && properties.rotate !== 'none')) {
      return result;
    }

    if (properties.translate !== undefined && properties.translate !== 'none') {
      result += ' ';
    }
    result += 'rotate(';

    var values = properties.rotate;
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
    var unit = angleUnit.substring(angleUnit.length - 3, angleUnit.length);

    if (angleUnits.indexOf(unit) !== -1) {
      foundUnit = 1;
    }

    if (foundUnit === 0) {
      unit = angleUnit.substring(angleUnit.length - 4, angleUnit.length);
      if (angleUnits.indexOf(unit) !== -1) {
        foundUnit = 1;
      }
    }

    if (foundUnit === 0) {
      throw new InvalidArgument('Incorrect angle units');
    }

    result += valuesArray.join(', ') + ')';

    return result;
  }

  /**
  * This function is a WIP.
  */
  function convertScale (properties) {
    var result = '';
    if (!(properties.scale !== undefined && properties.scale !== 'none')) {
      return result;
    }

    if (properties.translate !== undefined && properties.translate !== 'none') {
      result += ' ';
    } else if (properties.rotate !== undefined && properties.rotate !== 'none') {
      result += ' ';
    }

    result += 'scale(';

    var values = properties.scale;
    var valuesArray = values.split(' ');
    var numValues = valuesArray.length;

    if (numValues < 1 && numValues > 3) {
      throw new InvalidArgument('Incorrect number of values for scale');
    }

    if (numValues === 1 && valuesArray[0] === '') {
      throw new InvalidArgument('Empty string is not a valid argument');
    }

    result += valuesArray.join(', ') + ')';

    return result;
  }

  window.toTransform = function (properties) {
    var result = '';

    result += convertTranslate(properties);
    result += convertRotate(properties); // WIP
    result += convertScale(properties); // WIP

    return result;
  };

  window.InvalidArgument = InvalidArgument;
})();
