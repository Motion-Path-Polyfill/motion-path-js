function InvalidArgument(message) {
	this.message = message;
	this.name = "InvalidArgument";
} 


function toTransform(properties) {
	var result = '';

	if (properties.translate != undefined && properties.translate != 'none') {
		result += 'translate(';

		var values = properties.translate;
		var valuesArray = values.split(" ");
		var numValues = valuesArray.length;


		if (numValues > 3) {
			throw new InvalidArgument("Too many values for translate");
		} 
		
		for (var counter=0; counter < numValues - 1; counter++) {
			result += valuesArray[counter] + ', ';
		}

		result += valuesArray[counter] + ') ';
	}

	if (properties.rotate != undefined && properties.rotate != 'none') {
		result += 'rotate(';

		values = properties.rotate;
		valuesArray = values.split(" ");
		numValues = valuesArray.length;

		if (numValues != 4 && numValues != 1) {
			throw new InvalidArgument("Incorrect number of arguments for rotate");
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
		
		result += valuesArray[counter] + ') ';
	}

	if (properties.scale != undefined && properties.scale != 'none') {
		result += 'scale(';

		var values = properties.scale;
		var valuesArray = values.split(" ");
		var numValues = valuesArray.length;


		if (numValues < 1 && numValues > 3) {
			throw new InvalidArgument("Incorrect number of values for scale");
		} 
		
		for (var counter=0; counter < numValues - 1; counter++) {
			result += valuesArray[counter] + ' ';
		}

		result += valuesArray[counter] + ') ';
	}

	return result;

}

var thing = toTransform({translate: '20px 30px', rotate: '10 10 30 40turn', scale: '2 3'});

console.log(thing);