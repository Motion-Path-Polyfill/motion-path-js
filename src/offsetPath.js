/* global internalScope */

(function () {
  function offsetPathParse (input) {
    var parseAngleAsDegrees = internalScope.parseAngleAsDegrees;

    // https://drafts.fxtf.org/motion-1/#offset-path-property

    if (input === 'none') {
      return {type: null, input: null};
    }

    var inputType = '';
    var ray = /^ray\((.*)\)$/.exec(input);
    var path = /^path\((.*)\)$/.exec(input);

    if (ray === null && path === null) {
      return undefined;
    } else if (ray !== null) {
      inputType = 'ray';
      var rayInput = ray[1].split(/\s+/);
      var result = {type: inputType,
                    input: 'none',
                    contain: false,
                    size: 'none'
                   };

      for (var i = 0; i < rayInput.length; i++) {
        if (rayInput[i] === 'contain') {
          result.contain = true;
        } else if (rayInput[i] === 'closest-side') {
          result.size = 'closest-side';
        } else if (rayInput[i] === 'farthest-side') {
          result.size = 'farthest-side';
        } else if (rayInput[i] === 'closest-corner') {
          result.size = 'closest-corner';
        } else if (rayInput[i] === 'farthest-corner') {
          result.size = 'farthest-corner';
        } else {
          var rayInputDegrees = parseAngleAsDegrees(rayInput[i]);
          if (rayInputDegrees === null) {
            return undefined;
          }
          result.input = rayInputDegrees;
        }
      }
      return result;
    } else if (path !== null) {
      inputType = 'path';
      var pathInput = path[1];
      return {type: inputType, input: pathInput};
    }
  }

  function offsetPathMerge (start, end) {
    function serializeParsed (input) {
      if (input.type === 'ray') {
        var result = 'ray(' + input.input + 'deg';
        if (input.size !== 'none') {
          result += ' ' + input.size;
        }
        if (input.contain) {
          result += ' contain';
        }
        result += ')';
        return result;
      }
      if (input.type === 'path') {
        return 'path(' + input.input + ')';
      }
      if (input.type === null) {
        return 'none';
      }
    }

    if (start.type !== 'ray' || end.type !== 'ray') {
      return internalScope.flip(serializeParsed(start), serializeParsed(end));
    }
    if (start.size !== end.size) {
      return internalScope.flip(serializeParsed(start), serializeParsed(end));
    }
    if (start.contain !== end.contain) {
      return internalScope.flip(serializeParsed(start), serializeParsed(end));
    }

    return {
      start: start.input,
      end: end.input,
      serialize: function (input) {
        var result = 'ray(' + input + 'deg';

        if (start.size !== 'none') {
          result += ' ' + start.size;
        }
        if (start.contain) {
          result += ' contain';
        }
        result += ')';
        return result;
      }
    };
  }

  internalScope.offsetPathParse = offsetPathParse;
  internalScope.offsetPathMerge = offsetPathMerge;
})();

