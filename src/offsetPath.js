/* global internalScope */

(function () {
  function offsetPathParse (input) {
    var parseAngleAsDegrees = internalScope.parseAngleAsDegrees;
    var isInArray = internalScope.isInArray;
    // https://drafts.fxtf.org/motion-1/#offset-path-property

    if (input === 'none') {
      return {type: null, input: null};
    }

    var ray = /^ray\((.*)\)$/.exec(input);
    var path = /^path\((.*)\)$/.exec(input);

    if (ray === null && path === null) {
      return undefined;
    } else if (ray !== null) {
      var rayInput = ray[1].split(/\s+/);
      if (rayInput.length > 3) {
        return undefined;
      }

      var result = {type: 'ray', input: null, contain: false, size: null};
      var validSizes = ['closest-side', 'farthest-side', 'closest-corner', 'farthest-corner'];

      for (var i = 0; i < rayInput.length; i++) {
        if (rayInput[i] === 'contain') {
          if (result.contain) {
            return undefined;
          }
          result.contain = true;
        } else if (isInArray(validSizes, rayInput[i])) {
          if (result.size === null) {
            result.size = rayInput[i];
          } else {
            return undefined;
          }
        } else if (result.input === null) {
          var rayInputDegrees = parseAngleAsDegrees(rayInput[i]);
          if (rayInputDegrees === null) {
            return undefined;
          }
          result.input = rayInputDegrees;
        } else {
          return undefined;
        }
      }
      return result;
    } else if (path !== null) {
      var pathInput = path[1];
      return {type: 'path', input: pathInput};
    }
  }

  function offsetPathMerge (start, end) {
    function serializeParsed (angle, contain, size, type) {
      if (type === 'ray') {
        var result = 'ray(' + angle + 'deg';
        if (size !== null) {
          result += ' ' + size;
        }
        if (contain) {
          result += ' contain';
        }
        result += ')';
        return result;
      }
      if (type === 'path') {
        return 'path(' + angle + ')';
      }
      if (type === null) {
        return 'none';
      }
    }

    if (start.type !== 'ray' || end.type !== 'ray') {
      return internalScope.flip(serializeParsed(start.input, start.contain, start.size, start.type),
                                serializeParsed(end.input, end.contain, end.size, end.type));
    }
    if (start.size !== end.size || start.contain !== end.contain) {
      return internalScope.flip(serializeParsed(start.input, start.contain, start.size, start.type),
                                serializeParsed(end.input, end.contain, end.size, end.type));
    }

    return {
      start: start.input,
      end: end.input,
      serialize: function (input) {
        return serializeParsed(input, start.contain, start.size, start.type);
      }
    };
  }

  internalScope.offsetPathParse = offsetPathParse;
  internalScope.offsetPathMerge = offsetPathMerge;
})();
