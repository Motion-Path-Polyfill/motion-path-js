(function() {
	window.InvalidArgument = function InvalidArgument(message) {
		this.message = message;
		this.name = "InvalidArgument";
	} 

	function checkTranslate(properties) {
		var result = '';
		if (properties.translate != undefined && properties.translate != 'none') {
			
			result += 'translate(';

			var values = properties.translate;
			var valuesArray = values.split(" ");
			var numValues = valuesArray.length;


			if (numValues > 3) {
				throw new InvalidArgument("Too many values for translate");
			}

			if (numValues == 1 && valuesArray[0] == '') {
				throw new InvalidArgument("Empty string is not a valid argument");
			}
			
			for (var counter=0; counter < numValues - 1; counter++) {
				result += valuesArray[counter] + ', ';
			}

			result += valuesArray[counter] + ')';
		}
		return result;
	} 

	function checkRotate(properties) {
		var result = '';
		if (properties.rotate != undefined && properties.rotate != 'none') {
			if(properties.translate != undefined && properties.translate != 'none') {
				result += ' ';
			}
			result += 'rotate(';

			values = properties.rotate;
			valuesArray = values.split(" ");
			numValues = valuesArray.length;

			if (numValues != 4 && numValues != 1) {
				throw new InvalidArgument("Incorrect number of arguments for rotate");
			}

			if (numValues == 1 && valuesArray[0] == '') {
				throw new InvalidArgument("Empty string is not a valid argument");
			}

			// doesn't check ordering of arguments
			var angleUnits = ['deg', 'grad', 'rad', 'turn'];
			var angleUnit = valuesArray[numValues-1];

			var foundUnit = 0;
			var unit = angleUnit.substring(angleUnit.length - 3, angleUnit.length);

			if (angleUnits.indexOf(unit) != -1) {
				foundUnit = 1;
			}

			if (foundUnit == 0) {
				var unit = angleUnit.substring(angleUnit.length - 4, angleUnit.length);
				if (angleUnits.indexOf(unit) != -1) {
					foundUnit = 1;
				}
			}
		

			if (foundUnit == 0) {
				throw new InvalidArgument('Incorrect angle units');
			}

			for (counter=0; counter < numValues - 1; counter++) {
				result += valuesArray[counter] + ' ';
			}
			
			result += valuesArray[counter] + ')';
		}
		return result;
	} 

	function checkScale(properties) {
		var result = '';
		if (properties.scale != undefined && properties.scale != 'none') {
			if(properties.translate != undefined && properties.translate != 'none') {
				result += ' ';
			} else if(properties.rotate != undefined && properties.rotate != 'none') {
				result += ' ';
			}

			result += 'scale(';

			var values = properties.scale;
			var valuesArray = values.split(" ");
			var numValues = valuesArray.length;


			if (numValues < 1 && numValues > 3) {
				throw new InvalidArgument("Incorrect number of values for scale");
			} 

			if (numValues == 1 && valuesArray[0] == '') {
				throw new InvalidArgument("Empty string is not a valid argument");
			}
			
			for (var counter=0; counter < numValues - 1; counter++) {
				result += valuesArray[counter] + ' ';
			}

			result += valuesArray[counter] + ')';
		}
			
		return result;
	} 

	window.toTransform = function(properties) {
		var result = '';

		result += checkTranslate(properties); 
		result += checkRotate(properties);
		result += checkScale(properties);

		return result;
	}

	//var thing = toTransform({translate: '20px 30px', rotate: '10 10 30 40turn', scale: '2 3'});

	//console.log(thing);
})();