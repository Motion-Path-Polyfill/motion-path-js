/* global internalScope */
'use strict';

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

  var pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  function convertPath (properties) {
    var offsetPath = internalScope.offsetPathParse(properties['offset-path']);

    if (!offsetPath) {
      return null;
    }

    if (offsetPath.type === 'path') {
      return convertPathString(properties);
    }

    if (offsetPath.type === 'ray') {
      return convertRayString(properties);
    }
  }

  function getOffsetDistanceLength (offsetDistance, pathLength) {
    if (offsetDistance.unit === '%') {
      return Number(offsetDistance.value) * pathLength / 100;
    } else {
      return Number(offsetDistance.value);
    }
  }

  function convertPathString (properties) {
    var offsetPath = internalScope.offsetPathParse(properties['offset-path']);

    var offsetDistance = internalScope.offsetDistanceParse(properties['offset-distance']);
    if (offsetDistance === undefined) {
      offsetDistance = {value: 0, unit: 'px'};
    }

    pathElement.setAttribute('d', offsetPath.input);

    var offsetDistanceLength = getOffsetDistanceLength(offsetDistance, pathElement.getTotalLength());

    var point = pathElement.getPointAtLength(offsetDistanceLength);
    // FIXME: calculate rotation
    return {deltaX: point.x, deltaY: point.y, rotation: 0};
  }

  function convertRayString (properties) {
    var offsetPath = internalScope.offsetPathParse(properties['offset-path']);

    var offsetDistance = internalScope.offsetDistanceParse(properties['offset-distance']);
    if (offsetDistance === undefined) {
      offsetDistance = {value: 0, unit: 'px'};
    }

    // FIXME: Calculate path length of the ray
    var offsetDistanceLength = getOffsetDistanceLength(offsetDistance, 0);

    var deltaX = Math.sin(offsetPath.input * Math.PI / 180) * offsetDistanceLength;
    var deltaY = (-1) * Math.cos(offsetPath.input * Math.PI / 180) * offsetDistanceLength;

    return {deltaX: Math.round(deltaX * 100) / 100,
            deltaY: Math.round(deltaY * 100) / 100,
            rotation: (offsetPath.input - 90)};
  }

  function convertOffsetAnchorPosition (properties, element) {
    // According to spec: https://drafts.fxtf.org/motion-1/#offset-anchor-property
    // If offset-anchor is set to auto then it will compute to the value of offset-position.
    var position = 'auto';

    if (element === undefined) {
      return null;
    }

    if ('offset-position' in properties) {
      position = internalScope.offsetPositionAnchorParse(properties['offset-position']);
    }

    if (position === 'auto' || position === undefined || position === null) {
      return null;
    }

    var anchor = 'auto';
    if ('offset-anchor' in properties) {
      anchor = internalScope.offsetPositionAnchorParse(properties['offset-anchor']);
    }

    if (anchor === 'auto' || anchor === undefined || anchor === null) {
      anchor = position;
    }

    // TODO: find a way of doing this that doesn't involve _style
    var savedTransform = element.style._style.transform;
    // clear the transform so we can access the starting position of the element.
    element.style._style.transform = 'none';

    var offsetLeft = element.offsetLeft;
    var offsetTop = element.offsetTop;

    var elementProperties = element.getBoundingClientRect();
    var parentProperties = element.offsetParent ? element.offsetParent.getBoundingClientRect() : null;
    element.style._style.transform = savedTransform;

    if (!parentProperties) {
      return null;
    }

    var anchorPosX = anchor[0].value;
    var anchorPosY = anchor[1].value;
    var offsetPosX = position[0].value;
    var offsetPosY = position[1].value;

    if (anchor[0].unit === '%') {
      anchorPosX = (anchorPosX * elementProperties.width) / 100;
    }

    if (anchor[1].unit === '%') {
      anchorPosY = (anchorPosY * elementProperties.height) / 100;
    }

    if (position[0].unit === '%') {
      offsetPosX = (offsetPosX * parentProperties.width) / 100;
    }

    if (position[1].unit === '%') {
      offsetPosY = (offsetPosY * parentProperties.height) / 100;
    }

    var deltaX = (offsetPosX - anchorPosX) - offsetLeft;
    var deltaY = (offsetPosY - anchorPosY) - offsetTop;

    return {deltaX: deltaX, deltaY: deltaY, anchorX: anchorPosX, anchorY: anchorPosY};
  }

  function convertOffsetRotate (properties, element) {
    var value = null;
    if ('offset-rotate' in properties) {
      value = internalScope.offsetRotateParse(properties['offset-rotate']);
    }

    if (!value) {
      return {angle: 0, auto: true};
    }

    return {angle: value.angle, auto: value.auto};
  }

  function convertOffsetToTransform (properties, element) {
    /* W3C spec for what syntax toTransform() outputs:
       https://drafts.csswg.org/css-transforms/#transform-functions
       W3C spec for what syntax toTransform() parses:
       https://drafts.csswg.org/css-transforms-2/#individual-transforms
       https://drafts.fxtf.org/motion-1/#motion-paths-overview
    */
    var pathTransform = convertPath(properties);
    var positionAnchorTransform = convertOffsetAnchorPosition(properties, element);
    var parsedRotate = convertOffsetRotate(properties);
    var rotation = parsedRotate.angle;

    if (!pathTransform && !positionAnchorTransform) {
      return null;
    }

    if (!pathTransform) {
      pathTransform = {deltaX: 0, deltaY: 0, rotation: 0};
    }

    if (parsedRotate.auto) {
      rotation += pathTransform.rotation;
    }

    if (!positionAnchorTransform) {
      positionAnchorTransform = {deltaX: 0, deltaY: 0};
    }

    var transform = 'translate3d(' +
        (pathTransform.deltaX + positionAnchorTransform.deltaX) + 'px, ' +
        (pathTransform.deltaY + positionAnchorTransform.deltaY) + 'px, 0px)';

    if (internalScope.offsetPathParse(properties['offset-path'])) {
      transform += ' rotate(' + rotation + 'deg)';
    }

    return transform;
  }

  function toTransform (properties, element) {
    /* W3C spec for what syntax toTransform() outputs:
       https://drafts.csswg.org/css-transforms/#transform-functions
       W3C spec for what syntax toTransform() parses:
       https://drafts.csswg.org/css-transforms-2/#individual-transforms
       https://drafts.fxtf.org/motion-1/#motion-paths-overview
    */
    return [
      convertTranslate(properties.translate),
      convertRotate(properties.rotate),
      convertScale(properties.scale),
      convertOffsetToTransform(properties, element)
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }

  internalScope.toTransform = toTransform;
})();
