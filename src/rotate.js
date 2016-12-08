var rotationUnit;

function isNumeric (number) {
  return !isNaN(number);
}

function InvalidArgument (message) {
  this.message = message;
  this.name = 'InvalidArgument';
}

function parse (input) {
  if (input === undefined || input === 'none') {
    return null;
  }

  var values = input.split(/\s+/);
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
  rotationUnit = unit; //global
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
  }

  for (var i = 0; i < numValues - 1; i++) {
    values[i] = Number(values[i]);
  }
  // Add rotation values without its unit characters
  values[i] = Number(number);
  console.log('Parse: ' + values);
  return values;
}

function merge (start, end) {
  console.log("Merge --> Start: " + start + " End: " + end);
  return {
    start: start,
    end: end,
    apply: function (input) {
      console.log("Merge -> return: " +  input.join(' '));
      return input.join(' ') + rotationUnit;
    }
  };
}

WebAnimationsPolyfillExtension.register({
  name: 'rotate',
  properties: {
    rotate: {
      parse: parse,
      merge: merge
    }
  },
  applyHook: {
    callback: function (values, style) {
      console.log("values: ", values);
      var rotate = values.rotate;
      if (rotate == undefined) {
        style.transform = values.transform;
        return;
      }
      
      var valuesArray = rotate.split(/\s+/);
      console.log('callback -> valuesarray: ' + valuesArray);
      var numValues = valuesArray.length;
      var rotateStr = '';
      if (numValues > 1) {
        rotateStr = 'rotate3d(' + valuesArray.join(', ') + ')';
      } else {
        rotateStr = 'rotate(' + valuesArray.join(', ') + ')';
      }
      
      style.transform = rotateStr;
    },
    watchedProperties: ['rotate', 'transform']
  }
});