/* global internalScope */
'use strict';

(function () {
  function basicShapeInset(arguments) {
    // WIP
    return null;
  }

  function basicShapeCircle(arguments) {
    var isNumeric = internalScope.isNumeric;
    var argumentList = arguments.split(/\s+/);

    var radius = argumentList[0];
    // Negative radius is invalid
    // Radius defaults to closest side 

    return null;
  }

  function basicShapeEllipse(arguments) {
    // WIP
    return null;
  }

  function basicShapePolygon(arguments) {
    // WIP
    return null;
  }

  function offsetPathParse (input) {
    var parseAngleAsDegrees = internalScope.parseAngleAsDegrees;
    var isInArray = internalScope.isInArray;
    // https://drafts.fxtf.org/motion-1/#offset-path-property

    if (input === 'none') {
      return {type: null, angle: null, path: null};
    }

    // TODO: Check if need to handle trailing spaces
    var ray = /^ray\((.*)\)$/.exec(input);
    var path = /^path\(['"](.*)['"]\)$/.exec(input);
    // TODO: For basic shape check for closing brackets
    var shapeType = /^[^\(]*/.exec(input);

    if (ray !== null) {
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
    } else if (path !== null) {
      var pathInput = path[1];
      return {type: 'path', path: pathInput};
    } else {
      var basicShapes = ['inset', 'circle', 'ellipse', 'polygon'];
      if (!isInArray(basicShapes, shapeType[0])) {
        return undefined;
      }

      var shapeArguments = /\(([^)]+)\)/.exec(input);
      
      if(shapeType[0] === 'circle') {
        return basicShapeCircle(shapeArguments[1]);
      }

      // return {type: shapeType[0], path: shapeArguments[1]};
    }
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
})();
