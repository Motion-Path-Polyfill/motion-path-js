var WebAnimationsPolyfillExtension;

function isNumeric (number) {
  return !isNaN(number);
}

function InvalidArgument (message) {
  this.message = message;
  this.name = 'InvalidArgument';
}

function parse (input) {
  if (input === undefined) {
    return null;
  } else if (input === 'none') {
    return 'none';
  }

  var values = input.split(/\s+/);
  var numValues = values.length;
  if (numValues < 1 || numValues > 3) {
    throw new InvalidArgument('Incorrect number of values for scale');
  }

  for (var i = 0; i < numValues; i++) {
    if (!isNumeric(values[i])) {
      throw new InvalidArgument('Argument must be a number');
    }
  }

  for (var j = 0; j < numValues; j++) {
    values[j] = Number(values[j]);
  }

  return values;
}

function merge (start, end) {
  return {
    start: start,
    end: end,
    serialize: function (input) {
      return input.join(' ');
    }
  };
}

WebAnimationsPolyfillExtension.register({
  name: 'scale',
  properties: {
    scale: {
      parse: parse,
      merge: merge
    }
  },
  applyHook: {
    callback: function (values) {
      var scale = values.scale;
      if (scale === undefined) {
        return null;
      } else if (scale === 'none') {
        return {transform: 'scale3d(1 1 1) ' + values.transform};
      }

      var valuesArray = values.scale.split(/\s+/);
      var scaleStr = '';
      if (valuesArray.length === 3) {
        scaleStr = 'scale3d(' + valuesArray.join(', ') + ')';
      } else {
        scaleStr = 'scale(' + valuesArray.join(', ') + ')';
      }
      return {transform: scaleStr + ' ' + values.transform};
    },
    watchedProperties: ['scale', 'transform']
  }
});
