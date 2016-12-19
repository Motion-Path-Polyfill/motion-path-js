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
    var valuesArray = internalScope.translateParse(input);

    if (valuesArray === null || valuesArray === undefined) {
      return null;
    }  
    
    var result = valuesArray.map(function(x) {
          return x + 'px';
        });
        
    return 'translate3d(' + result.join(', ') + ')';
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

    var angle = values[numValues - 1];
    var angleUnitArray = /(deg|grad|rad|turn)$/.exec(angle);

    if (angleUnitArray === null) {
      throw new InvalidArgument('Angle units must be one of: deg, grad, rad or turn');
    }

    var unit = angleUnitArray[0];
    var number = angle.substring(0, angle.length - unit.length);
    if (!(isNumeric(number))) {
      throw new InvalidArgument('Angle given must be a number followed by units');
    }

    if (numValues > 1) {
      for (var i = 0; i < numValues - 1; i++) {
        if (!(isNumeric(values[i]))) {
          throw new InvalidArgument('Axis value must be a number');
        }
      }
      return 'rotate3d(' + values.join(', ') + ')';
    }
    return 'rotate(' + values.join(', ') + ')';
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
