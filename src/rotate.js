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
  }

  // numValues - 1 --> because the last values of the array contains unit characters
  for (var i = 0; i < numValues - 1; i++) {
    values[i] = Number(values[i]);
  }
  values[i] = Number(number);

  return values;
}

function merge (start, end) {
  console.log('Merge Start: ' + start + ' End: ' + end);
  return {
    start: start,
    end: end,
    apply: function (input) {
      var numValues = input.length;
      if (numValues > 1) {
        return 'rotate3d(' + values.join(', ') + ')';
      }
      return 'rotate(' + values.join(', ') + ')';
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
      var rotate = values.rotate;
      if (rotate == null) {
        style.transform = values.transform;
        return;
      }
      style.transform = rotate;
    },
    watchedProperties: ['rotate', 'transform']
  }

});
