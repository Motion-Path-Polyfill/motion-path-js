(function () {
  function InvalidArgument (message) {
    this.message = message;
    this.name = 'InvalidArgument';
  }

  function isNumeric (number) {
    return !isNaN(number);
  }

  function convertTranslate (values) {
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

  /**
  * This function is a WIP.
  */
  function convertRotate (values) {
    if (properties.translate !== undefined && properties.translate !== 'none') {
      result += ' ';
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
    
    return 'rotate(' + valuesArray.join(', ') + ')';
  }

  /**
  * This function is a WIP.
  */
  function convertScale (scale) {
    if (properties.translate !== undefined && properties.translate !== 'none') {
      result += ' ';
    } else if (properties.rotate !== undefined && properties.rotate !== 'none') {
      result += ' ';
    }

    var valuesArray = values.split(' ');
    var numValues = valuesArray.length;

    if (numValues < 1 && numValues > 3) {
      throw new InvalidArgument('Incorrect number of values for scale');
    }

    if (numValues === 1 && valuesArray[0] === '') {
      throw new InvalidArgument('Empty string is not a valid argument');
    }

    return 'scale(' + valuesArray.join(', ') + ')';
  }

  function toTransform (properties) {
    var result = '';

    if (properties.translate !== undefined && properties.translate !== 'none') {
      result += convertTranslate(properties.translate);
    }
    //WIP
    if (properties.rotate !== undefined && properties.rotate !== 'none') {
      result += convertRotate(properties.rotate);
    }
    //WIP
    if (properties.scale !== undefined && properties.scale !== 'none') {
      result += convertScale(properties.scale);
    }

    return result;
  };
  
  window.InvalidArgument = InvalidArgument;
  window.toTransform = toTransform;

})();
