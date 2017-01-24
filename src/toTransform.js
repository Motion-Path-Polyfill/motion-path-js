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
    var offsetPath = internalScope.offsetPathParse(properties['offsetPath']);

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

  function isClosedLoop (path) {
    var pathInput = path.input.replace(/[,\s]+$/g, '');
    var lastPathInput = pathInput[pathInput.length - 1];

    return (lastPathInput === 'z' || lastPathInput === 'Z');
  }

  
  function getPathStringOffsetDistance(offsetPath, pathElement, offsetDistance) {
    var closedLoop = isClosedLoop(offsetPath);
    var pathLength = pathElement.getTotalLength();

    var offsetDistanceLength = getOffsetDistanceLength(offsetDistance, pathLength);

    if (closedLoop) {
      if (offsetDistanceLength < 0) {
        offsetDistanceLength = offsetDistanceLength % pathLength + pathLength;
      } else {
        offsetDistanceLength = offsetDistanceLength % pathLength;
      }
    } else if (offsetDistanceLength > pathLength) {
      offsetDistanceLength = pathLength;
    }

    return offsetDistanceLength;
  }

  function getPathStringRotation(currentPoint, nextPoint) {
    var deltaX = nextPoint.x - currentPoint.x;
    var deltaY = nextPoint.y - currentPoint.y;

    if(deltaX === 0) {
      if(deltaY > 0) {
        // console.log("1. deltaX: " + deltaX + " deltaY: " + deltaY);
        return 90;
      } else if(deltaY < 0) {
        // console.log("2. deltaX: " + deltaX + " deltaY: " + deltaY);
        return -90;
      }
      // console.log("3. deltaX: " + deltaX + " deltaY: " + deltaY);
      return 0;
    }

    if(deltaY === 0) {
      if(deltaX > 0) {
        return 0;
      } 
      return 180;
    }

    return (-1) * Math.atan(deltaY / deltaX) * 180 / Math.PI;
  }

  function convertPathString (properties) {
    var offsetPath = internalScope.offsetPathParse(properties['offsetPath']);
    
    var offsetDistance = internalScope.offsetDistanceParse(properties['offsetDistance']);
    if (offsetDistance === undefined) {
      offsetDistance = {value: 0, unit: 'px'};
    }

    pathElement.setAttribute('d', offsetPath.input);

    var epsilon = 0.001;
    var currentOffsetDistance = getPathStringOffsetDistance(offsetPath, pathElement, offsetDistance);
    var nextOffsetDistance = getPathStringOffsetDistance(offsetPath, pathElement, {value: offsetDistance.value + epsilon, unit: 'px'});

    var currentPoint = pathElement.getPointAtLength(currentOffsetDistance);
    var nextPoint = pathElement.getPointAtLength(nextOffsetDistance);

    var rotation = getPathStringRotation(currentPoint, nextPoint);
/*    console.log(rotation);
*/    // FIXME: calculate rotation
    return {deltaX: currentPoint.x, deltaY: currentPoint.y, rotation: rotation};
  }

  function convertRayString (properties) {
    var offsetPath = internalScope.offsetPathParse(properties['offsetPath']);

    var offsetDistance = internalScope.offsetDistanceParse(properties['offsetDistance']);
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
    if (element === undefined) {
      return null;
    }

    var position = 'auto';
    if ('offsetPosition' in properties) {
      position = internalScope.offsetPositionAnchorParse(properties['offsetPosition']);
    }

    var anchor = 'auto';
    if ('offsetAnchor' in properties) {
      anchor = internalScope.offsetPositionAnchorParse(properties['offsetAnchor']);
    }

    var transformOrigin = window.getComputedStyle(element).transformOrigin;
    transformOrigin = transformOrigin.split(/\s+/).map(internalScope.offsetDistanceParse);

    if (anchor === 'auto' || !anchor) {
      if (!properties['offsetPath'] || properties['offsetPath'] === 'none') {
        anchor = position;
      } else {
        anchor = transformOrigin;
      }
    }

    if (position === 'auto' || !position) {
      var result = {
        deltaX: 0,
        deltaY: 0,
        transformOriginX: transformOrigin[0].value,
        transformOriginY: transformOrigin[1].value
      };
      if (anchor === transformOrigin || anchor === 'auto' || !anchor) {
        result['anchorX'] = transformOrigin[0].value;
        result['anchorY'] = transformOrigin[1].value;
        return result;
      }
      var elementProperties = element.getBoundingClientRect();
      if (anchor[0].unit === '%') {
        result['anchorX'] = (anchor[0].value * elementProperties.width) / 100;
      } else {
        result['anchorX'] = anchor[0].value;
      }

      if (anchor[1].unit === '%') {
        result['anchorY'] = (anchor[1].value * elementProperties.height) / 100;
      } else {
        result['anchorY'] = anchor[1].value;
      }
      return result;
    }

    // TODO: find a way of doing this that doesn't involve _style
    var savedTransform = element.style._style.transform;
    // clear the transform so we can access the starting position of the element.
    element.style._style.transform = 'none';

    var offsetLeft = element.offsetLeft;
    var offsetTop = element.offsetTop;

    elementProperties = element.getBoundingClientRect();
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

    return {
      deltaX: deltaX,
      deltaY: deltaY,
      anchorX: anchorPosX,
      anchorY: anchorPosY,
      transformOriginX: transformOrigin[0].value,
      transformOriginY: transformOrigin[1].value
    };
  }

  function convertOffsetRotate (properties, element) {
    var value = null;
    if ('offsetRotate' in properties) {
      value = internalScope.offsetRotateParse(properties['offsetRotate']);
    }

    if (!value) {
      return {angle: 0, auto: true};
    }

    return value;
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
    var path = internalScope.offsetPathParse(properties['offsetPath']);

    if (!pathTransform && !('offsetPosition' in properties)) {
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

    var anchorX = positionAnchorTransform.anchorX;
    var anchorY = positionAnchorTransform.anchorY;
    var transformOriginX = positionAnchorTransform.transformOriginX;
    var transformOriginY = positionAnchorTransform.transformOriginY;

    var transform = 'translate3d(' +
        (pathTransform.deltaX + positionAnchorTransform.deltaX) + 'px, ' +
        (pathTransform.deltaY + positionAnchorTransform.deltaY) + 'px, 0px)';

    if (path !== undefined) {
      if (rotation !== undefined && rotation !== 0) {
        if (anchorX !== transformOriginX && anchorY !== transformOriginY) {
          var beforeShiftX = anchorX - transformOriginX;
          var beforeShiftY = anchorY - transformOriginY;
          var beforeShiftStr = 'translate3d(' + beforeShiftX + 'px, ' + beforeShiftY + 'px, 0px)';
          var afterShiftX = (-1) * beforeShiftX;
          var afterShiftY = (-1) * beforeShiftY;
          var afterShiftStr = 'translate3d(' + afterShiftX + 'px, ' + afterShiftY + 'px, 0px)';
          transform += ' ' + beforeShiftStr + ' rotate(' + rotation + 'deg) ' + afterShiftStr;
          return transform;
        }
        transform += ' rotate(' + rotation + 'deg)';
      }
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
