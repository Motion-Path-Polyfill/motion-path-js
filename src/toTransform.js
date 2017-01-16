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
  
  function convertPath (properties) {
    var offsetPath = null;
    if ('offset-path' in properties) {
      offsetPath = internalScope.offsetPathParse(properties['offset-path']);
    }

    if (offsetPath === undefined || offsetPath === null || offsetPath.type !== 'path') {
      return null;
    }

    var offsetDistance = undefined;

    if (('offset-distance' in properties) && (properties['offset-distance'] !== undefined)) {
      offsetDistance = internalScope.offsetDistanceParse(properties['offset-distance']);
    }

    if (offsetDistance === undefined) {
      offsetDistance = {value: 0, unit: 'px'};
    }

    var pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', offsetPath.input);

    var offsetDistanceLength;
    
    if (offsetDistance.unit === '%') {
      offsetDistanceLength = Number(offsetDistance.value) * pathElement.getTotalLength() / 100;
    } else {
      offsetDistanceLength = Number(offsetDistance.value);
    }

    var point = pathElement.getPointAtLength(offsetDistanceLength);

    return 'translate3d(' + point.x + 'px, ' + point.y + 'px, 0px)';
  }

  function toTransform (properties) {
    return [
      convertTranslate(properties.translate),
      convertRotate(properties.rotate),
      convertScale(properties.scale),
      convertPath(properties)
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }

  internalScope.toTransform = toTransform;
})();
