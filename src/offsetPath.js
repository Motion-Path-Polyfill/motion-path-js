/* global internalScope */
'use strict';

(function () {
  var isNumeric = internalScope.isNumeric;

  function roundToHundredth (number) {
    return Math.round(number * 100) / 100;
  }

  function basicShapePolygonParse (input) {
    // TODO: Support the fill-rule option and %
    var argumentList = input.split(',');
    var coordinate = null;
    var x = null;
    var y = null;
    var previousX = 0;
    var previousY = 0;
    var path = '';
    var parentProperties = null;
    // Do something here if not at least 3 vertices?
    for (var i = 0; i < argumentList.length; i++) {
      coordinate = argumentList[i].trim().split(/\s+/);
      if (coordinate.length !== 2) {
        return undefined;
      }
      x = internalScope.offsetDistanceParse(coordinate[0]);
      y = internalScope.offsetDistanceParse(coordinate[1]);
      if (!x || !y) {
        return undefined;
      }

      if (x.unit === '%' || y.unit === '%') {
        parentProperties = element.offsetParent ? element.offsetParent.getBoundingClientRect() : null;
        if (!parentProperties) {
          return null;
        }

        if (x.unit === '%') {
          x.value = (x.value * parentProperties.width) / 100;
        }
        if (y.unit === '%') {
          y.value = (y.value * parentProperties.height) / 100;
        }
      }

      if (i === 0) {
        path += 'm ' + x.value + ' ' + y.value;
      } else {
        path += ' l ' + (x.value - previousX) + ' ' + (y.value - previousY);
      }
      previousX = x.value;
      previousY = y.value;
    }
    path += ' z';
    return {type: 'path', path: path};
  }

  function getCirclePathPosition (parentProperties, position) {
    var analysedPosition = [];

    if (position !== null) {
      var positionList = position[1].split(/\s+/);

      // If only one value is specified, the second value is assumed to be 'center'
      // https://drafts.csswg.org/css-backgrounds-3/#position
      for (var index in positionList) {
        var aPosition = positionList[index];

        var aPositionUnit = /(%|px)$/.exec(aPosition)[1];
        if (aPositionUnit === null) {
          return null;
        }

        var aPositionValueString = aPosition.substring(0, aPosition.length - aPositionUnit.length);
        if (!isNumeric(aPositionValueString) || aPositionValueString === '') {
          return null;
        }

        var aPositionValue = Number(aPositionValueString);
        if (aPositionUnit === '%') {
          if (Number(index) === 0) {
            if (!parentProperties || !parentProperties.width) {
              return null;
            }
            aPositionValue *= (parentProperties.width / 100);
          }
          if (Number(index) === 1) {
            if (!parentProperties || !parentProperties.height) {
              return null;
            }
            aPositionValue *= (parentProperties.height / 100);
          }
        }
        analysedPosition[index] = aPositionValue;
      }
    }

    if (analysedPosition.length < 2) {
      for (var i = analysedPosition.length; i < 2; i++) {
        if (Number(i) === 0) {
          if (!parentProperties || !parentProperties.width) {
            return null;
          }
          analysedPosition[i] = parentProperties.width / 2;
        } else if (Number(i) === 1) {
          if (!parentProperties || !parentProperties.height) {
            return null;
          }
          analysedPosition[i] = parentProperties.height / 2;
        }
      }
    }

    return analysedPosition;
  }

  function getCirclePathRadius (parentProperties, position, input) {
    var radiusString;
    if (position === null) {
      if (input !== '') {
        radiusString = input;
      }
    } else {
      radiusString = (/^(.*?) at/.exec(input));
      // TODO: Add support for when a radius had not been specified
      if (radiusString === null) {
        radiusString = 'closest-side';
      } else {
        radiusString = radiusString[1];
      }
    }

    var radiusUnit = /(%|px)$/.exec(radiusString);
    if (radiusUnit === null) {
      return null;
    }

    var radiusValueString = radiusString.substring(0, radiusString.length - radiusUnit[1].length);
    if (!isNumeric(radiusValueString)) {
      return null;
    }
    var radiusValue = Number(radiusValueString);

    if (radiusUnit[1] === '%') {
      var height = parentProperties.height;
      var width = parentProperties.width;
      if (!height || !width) {
        return null;
      }

      return roundToHundredth((Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / Math.sqrt(2)) * radiusValue / 100);
    }

    return Number(radiusValueString);
  }

  function basicShapeCircleParse (input, element) {
    var parentProperties = null;
    if (element) {
      parentProperties = element.offsetParent ? element.offsetParent.getBoundingClientRect() : null;
    }

    var position = /at (.*?)$/.exec(input);

    var radiusValue = getCirclePathRadius(parentProperties, position, input);
    if (!radiusValue) {
      return undefined;
    }

    var analysedPosition = getCirclePathPosition(parentProperties, position);
    if (!analysedPosition) {
      return undefined;
    }

    var pathString = 'M ' + analysedPosition[0] + ' ' + analysedPosition[1] +
                      ' m 0,' + (-radiusValue) +
                      ' a ' + radiusValue + ',' + radiusValue + ' 0 0,1 ' + radiusValue + ',' + radiusValue +
                      ' a ' + radiusValue + ',' + radiusValue + ' 0 1,1 ' + (-radiusValue) + ',' + (-radiusValue) + ' z';

    return {type: 'path', path: pathString};
  }

  function basicShapeInsetParse (input, element) {
    // WIP
    return null;
  }

  function basicShapeEllipseParse (input, element) {
    // WIP
    return null;
  }

  function parseNone (input, element) {
    if (input === 'none') {
      return {type: null, angle: null, path: null};
    }
  }

  function parseRay (input, element) {
    var isInArray = internalScope.isInArray;
    var parseAngleAsDegrees = internalScope.parseAngleAsDegrees;
    var ray = /^ray\((.*)\)$/.exec(input);

    if (ray === null) {
      return undefined;
    }
    var rayInput = ray[1].split(/\s+/);
    if (rayInput.length > 3) {
      return undefined;
    }
    var result = {type: 'ray', angle: null, path: null, contain: false, size: null};
    var validSizes = ['closest-side', 'farthest-side', 'closest-corner', 'farthest-corner'];

    for (var i = 0; i < rayInput.length; i++) {
      if (rayInput[i] === 'contain') {
        if (result.contain) {
          return undefined;
        }
        result.contain = true;
      } else if (isInArray(validSizes, rayInput[i])) {
        if (result.size) {
          return undefined;
        }
        result.size = rayInput[i];
      } else {
        if (result.angle) {
          return undefined;
        }
        var rayInputDegrees = parseAngleAsDegrees(rayInput[i]);
        if (rayInputDegrees === null) {
          return undefined;
        }
        result.angle = rayInputDegrees;
      }
    }
    return result;
  }

  function parsePath (input, element) {
    var path = /^path\(['"](.*)['"]\)$/.exec(input);
    if (path === null) {
      return undefined;
    }
    var pathInput = path[1];
    return {type: 'path', path: pathInput};
  }

  function parseShape (input, element) {
    var isInArray = internalScope.isInArray;
    var shapeType = /^[^\(]*/.exec(input);
    if (shapeType == null) {
      return undefined;
    }
    var basicShapes = ['inset', 'circle', 'ellipse', 'polygon'];
    if (!isInArray(basicShapes, shapeType[0])) {
      return undefined;
    }
    // TODO: For basic shape check for closing brackets
    var shapeArguments = /\(([^)]+)\)/.exec(input);
    if (shapeArguments === null) {
      return undefined;
    }
    var toParse = [basicShapePolygonParse, basicShapeCircleParse, basicShapeInsetParse, basicShapeEllipseParse];
    // var toParse = [basicShapeCircleParse];
    for (var i = 0; i < toParse.length; i++) {
      var result = toParse[i](shapeArguments[1], element);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  function offsetPathParse (input, element) {
    // https://drafts.fxtf.org/motion-1/#offset-path-property
    var toParse = [parseNone, parseRay, parsePath, parseShape];
    for (var i = 0; i < toParse.length; i++) {
      var result = toParse[i](input, element);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  function offsetPathMerge (start, end) {
    function serializeParsed (input) {
      if (input.type === 'ray') {
        var result = 'ray(' + input.angle + 'deg';
        if (input.size !== null) {
          result += ' ' + input.size;
        }
        if (input.contain) {
          result += ' contain';
        }
        result += ')';
        return result;
      }
      if (input.type === 'path') {
        return "path('" + input.path + "')";
      }

      if (input.type === null) {
        return 'none';
      }
    }

    if (start.type !== 'ray' || end.type !== 'ray') {
      return internalScope.flip(serializeParsed(start), serializeParsed(end));
    }
    if (start.size !== end.size || start.contain !== end.contain) {
      return internalScope.flip(serializeParsed(start), serializeParsed(end));
    }

    return {
      start: start.angle,
      end: end.angle,
      serialize: function (input) {
        var values = {angle: input, contain: start.contain, size: start.size, type: start.type};
        return serializeParsed(values);
      }
    };
  }

  internalScope.offsetPathParse = offsetPathParse;
  internalScope.offsetPathMerge = offsetPathMerge;
  internalScope.roundToHundredth = roundToHundredth;
})();
