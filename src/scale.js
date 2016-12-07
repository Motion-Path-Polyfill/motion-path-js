function isNumeric (number) {
  return !isNaN(number);
}

function InvalidArgument (message) {
  this.message = message;
  this.name = 'InvalidArgument';
}

function parse(input) {
  console.log(input);
  if (input === undefined || input === 'none') {
    return null;
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

function merge(start, end) {
  console.log("Merge Start: "+ start + " End: "  + end);
  return {
    start: start,
    end: end,
    apply: function(input) {
      var numValues = input.length;
      console.log(numValues);
      /*if(numValues === 3) {
        console.log('scale3d(' + input.join(', ') + ')');
        return 'scale3d(' + input.join(', ') + ')';
      }*/
      return input.join(' ');
    }
  }
}

WebAnimationsPolyfillExtension.register({
  name: 'scale',
  properties: {
    scale: {
      parse: parse,
      merge: merge,
    }
  },
  applyHook: {
    callback: function(values, style) {
      //animated transform is values.transform
      // Getting the values for the scale string
      var scale = values.scale;

      if (scale === undefined) {
        style.transform = values.transform;
        return;
      }
      var valuesArray = values.scale.split(/\s+/);
      var numValues = valuesArray.length;

      // Creating the scale string
      if (numValues === 3) {
        var scaleStr = 'scale3d(' + valuesArray.join(', ') + ')';
      } else {
        var scaleStr = 'scale(' + valuesArray.join(', ') + ')';
      }
      
      console.log(scaleStr);
      console.log('transform values: ' + values.transform);
      console.log('style values before: ' + style.transform);
      style.transform = scaleStr;
      console.log('style values after: ' + style.transform);
      /*if (values.transform === '') {
        style.transform = scaleStr;
      } else {
        style.transform = scaleStr + ' ' + values.transform;
      }*/

    },
    watchedProperties: ['scale', 'transform'],
  }

});

