/* global internalScope */
'use strict';

(function () {
  function basicShapePolygonParse (input) {
    // TODO: Support the fill-rule option and %
    var argumentList = input.split(',');
    var coordinate = null;
    var x = null;
    var y = null;
    var previousX = 0;
    var previousY = 0;
    var path = '';
    // Do something here if not at least 3 vertices?
    for (var i = 0; i < argumentList.length; i++) {
      coordinate = argumentList[i].trim().split(/\s+/);
      if (coordinate.length !== 2) {
        return undefined;
      }
      x = internalScope.offsetDistanceParse(coordinate[0]);
      y = internalScope.offsetDistanceParse(coordinate[1]);
      if (!x || !y || x.unit === '%' || y.unit === '%') {
        return undefined;
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

  function basicShapeCircleParse (input) {
    // TODO: Need element as an argument to this function
    var radius;
    var position = /at (.*?)$/.exec(input);

    // TODO: Need to support other positions as currently this only supports positions in which both x and y are specified and are in px
    if (position === null) {
      // TODO: Set default position to the center of the reference box
      position = [0, 0];
      if (input !== '') {
        radius = input;
      }
    } else {
      position = position[1].split(/\s+/);
      radius = (/^(.*?) at/.exec(input));
      if (radius === null) {
        radius = 'closest-side';
      } else {
        radius = radius[1];
      }
    }

    radius = Number(radius.substring(0, radius.length - 2));

    var positionX = Number(position[0].substring(0, position[0].length - 2));
    var positionY = Number(position[1].substring(0, position[1].length - 2));

    var pathString = 'M ' + positionX + ' ' + positionY +
                      ' m 0,' + (-radius) +
                      ' a ' + radius + ',' + radius + ' 0 0,1 ' + radius + ',' + radius +
                      ' a ' + radius + ',' + radius + ' 0 1,1 ' + (-radius) + ',' + (-radius) + ' z';

    return {type: 'path', path: pathString};
  }

  function basicShapeInsetParse (input) {
    // WIP
    return null;
  }

  function basicShapeEllipseParse (input) {
    // WIP
    return null;
  }

  function parseNone (input) {
    if (input === 'none') {
      return {type: null, angle: null, path: null};
    }
  }

  function parseRay (input) {
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

  function parsePath (input) {
    var path = /^path\(['"](.*)['"]\)$/.exec(input);
    if (path === null) {
      return undefined;
    }
    var pathInput = path[1];
    return {type: 'path', path: pathInput};
  }

  function parseShape (input) {
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
    for (var parse of [basicShapePolygonParse, basicShapeCircleParse, basicShapeInsetParse, basicShapeEllipseParse]) {
      var result = parse(shapeArguments[1]);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  function offsetPathParse (input) {
    // https://drafts.fxtf.org/motion-1/#offset-path-property
    for (var parse of [parseNone, parseRay, parsePath, parseShape]) {
      var result = parse(input);
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
})();
