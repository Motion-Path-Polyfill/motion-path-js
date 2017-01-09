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
      var rayInput = ray[1];
      var rayInputDegrees = parseAngleAsDegrees(rayInput);
      if (rayInputDegrees !== null) {
        return {type: inputType, input: rayInputDegrees};
      }
    } else if (path !== null) {
      inputType = 'path';
      var pathInput = path[1];
      return {type: inputType, input: pathInput};
    }
  }

  function offsetPathMerge (start, end) {
    function serializeParsed (input) {
      if (input.type === 'ray') {
        return 'ray(' + input + 'deg)';
      }
      if (input.type === 'path') {
        return 'path(' + input + ')';
      }
      if (input.type === null) {
        return 'none';
      }
    }

    if (start.type !== 'ray' || end.type !== 'ray') {
      return internalScope.flip(serializeParsed(start), serializeParsed(end));
    }

    return {
      start: start.input,
      end: end.input,
      serialize: function (input) {
        return 'ray(' + input + 'deg)';
      }
    };
  }

  internalScope.offsetPathParse = offsetPathParse;
  internalScope.offsetPathMerge = offsetPathMerge;
})();

