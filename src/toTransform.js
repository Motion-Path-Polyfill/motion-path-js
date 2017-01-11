/* global internalScope */

(function () {
  function convertTranslate (input) {
    var valuesArray = internalScope.translateParse(input);

    if (valuesArray === null || valuesArray === undefined) {
      return null;
    }

    var result = valuesArray.map(function (x) {
      return x + 'px';
    });

    return 'translate3d(' + result.join(', ') + ')';
  }

  function convertRotate (input) {
    var valuesArray = internalScope.rotateParse(input);
    if (valuesArray === null || valuesArray === undefined) {
      return null;
    }

    if (valuesArray.length > 1) {
      return 'rotate3d(' + valuesArray.join(', ') + 'deg)';
    }
    return 'rotate(' + valuesArray.join(', ') + 'deg)';
  }

  function convertScale (input) {
    var valuesArray = internalScope.scaleParse(input);
    if (valuesArray === null || valuesArray === undefined) {
      return null;
    }
    return 'scale3d(' + valuesArray.join(', ') + ')';
  }
  
  function convertPath (offsetPath, offsetDistance) {
    console.log("This is the path: " + offsetPath);
    console.log("This is the distance: " + offsetDistance);
  }

  function toTransform (properties) {
    return [
      convertPath(properties['offset-path'], properties['offset-distance']),       
      convertTranslate(properties.translate),
      convertRotate(properties.rotate),
      convertScale(properties.scale)
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }

  internalScope.toTransform = toTransform;
})();
