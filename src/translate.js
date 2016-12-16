/* global WebAnimationsPolyfillExtension internalScope */

(function () {
  function isNumeric (number) {
    return !isNaN(number);
  }

  function translateParse (input) {
    console.log('*** We are within the translateParse ' + input + '***\n');

    var unitsArray = [];
    var InvalidArgument = internalScope.InvalidArgument;
    
    if (input === undefined) {
      debugger;
      return null;
    } else if (input === 'none') {
      return [0, 0, 0]; // For the default translate3d(0, 0, 0)
    }

    var inputValues = input.split(/\s+/);
    var values = [];
    var numValues = inputValues.length;

    if (numValues < 1 || numValues > 3) {
      throw new InvalidArgument('Incorrect number of values for scale');
    }

    // TODO: Check for units other than px
    // TODO: Each number of translate can have a different unit so how to keep track of this?
    console.log("Input to parse function: " + input.split(/\s+/));
    for (var i = 0; i < numValues; i++) {
      var elementLength = inputValues[i].length;
      if (elementLength <= 2) { 
        throw new InvalidArgument('Incorrect argument for translate');
      }

      // Check if units are px
      console.log("This is the inputValues[i] " +  inputValues[i]);
      var unit = inputValues[i].substring(elementLength - 2, elementLength);
      console.log("This is the unit: " + unit);
      if (unit !== 'px') {
        //throw new InvalidArgument('Incorrect units for translate');
      }
      unitsArray[i] = unit;

      // Check if characters before 'px' are valid numbers
      var number = inputValues[i].substring(0, elementLength - 2);
      if (!isNumeric(number)) {
        throw new InvalidArgument('Argument must be a number');
      }
      values[i] = number;
    }

    values = values.map(Number);

    while (values.length < 3) {
      values.push(0); // Add default value to unspecified axis
    }
    internalScope.unitsArray = unitsArray;
    return values;
  }

  function merge (start, end) {
    var unitsArray = internalScope.unitsArray;
    return {
      start: start,
      end: end,
      serialize: function (input) {
        
        while (unitsArray.length < 3) {
          unitsArray.push('px'); // Add default value to unspecified axis
        }
        console.log("The units array : " + unitsArray);
        for(var i = 0; i < unitsArray.length; i++) {
          input[i] += unitsArray[i];
        }

        var string = input.join(' ');
        //console.log("With units: " + string);
        
        return string;
      }
    };
  }

  function parseManager (input) {
    var InvalidArgument = internalScope.InvalidArgument;
    try {
      return translateParse(input);
    } catch (error) {
      if (error.constructor === InvalidArgument) {
        return undefined;
      }
      throw error;
    }
  }

  WebAnimationsPolyfillExtension.register({
    name: 'translate',
    properties: {
      translate: {
        parse: parseManager,
        merge: merge
      }
    },
    /*applyHook: {
      callback: function (values) {
        var transformString = internalScope.toTransform(values);
        return {transform: transformString + ' ' + values.transform};
      },

      watchedProperties: ['translate', 'transform']
    }*/
  });
  internalScope.translateParse = translateParse;
})();
