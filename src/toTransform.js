/* global internalScope */

(function () {

  function isNumeric (number) {
    return !isNaN(number);
  }

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
    if (offsetPath === undefined || offsetDistance === undefined) {
      return null;
    }

    var pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', offsetPath);

    var offsetDistanceLength;

    if (offsetDistance.substring(offsetDistance.length - 1) === '%') {
      offsetDistanceLength = (Number(offsetDistance.substring(0, offsetDistance.length - 1)) / 100) * pathElement.getTotalLength();
    } else {
      offsetDistanceLength = Number(offsetDistance.substring(0, offsetDistance.length - 2));
    }

    var point = pathElement.getPointAtLength(offsetDistanceLength);

    return 'translate3d(' + point.x + 'px, ' + point.y + 'px, 0px)';
  }

  function toTransform (properties) {
    return [
      convertTranslate(properties.translate),
      convertRotate(properties.rotate),
      convertScale(properties.scale),
      convertPath(properties['offset-path'], properties['offset-distance'])
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }

  internalScope.toTransform = toTransform;
})();
