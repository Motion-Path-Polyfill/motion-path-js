/* global internalScope */
'use strict';

(function () {
  function hypotenuseLength (a, b) {
    return Math.sqrt(a * a + b * b);
  }

  // Find the distance to the container edge, in the direction given
  // by angle. The offset-position is (distLeft, distTop), and the
  //  container size is (distLeft + distRight, distTop + distBottom).
  function getDistanceToSides (distLeft, distTop, distRight, distBottom, angle) {
    var sin = Math.sin(angle * Math.PI / 180);
    var cos = Math.cos(angle * Math.PI / 180);
    var distHorizontal;
    if (sin >= 0) {
      distHorizontal = distRight;
    } else {
      distHorizontal = distLeft;
      sin = -sin;
    }
    var distVertical;
    if (cos >= 0) {
      distVertical = distTop;
    } else {
      distVertical = distBottom;
      cos = -cos;
    }
    if (distVertical * sin <= distHorizontal * cos) {
      return distVertical / cos;
    } else {
      return distHorizontal / sin;
    }
  }

  function getRayLength (size, containerWidth, containerHeight, offsetPosX, offsetPosY, angle) {
    var distLeft = Math.abs(offsetPosX);
    var distTop = Math.abs(offsetPosY);
    var distRight = Math.abs(containerWidth - offsetPosX);
    var distBottom = Math.abs(containerHeight - offsetPosY);

    if (size === 'sides') {
      if (offsetPosX <= 0 || offsetPosY <= 0 || offsetPosX >= containerWidth || offsetPosY >= containerHeight) {
        return 0;
      }
      return getDistanceToSides(distLeft, distTop, distRight, distBottom, angle);
    } else if (size === 'closest-side') {
      return Math.min(distLeft, distTop, distRight, distBottom);
    } else if (size === 'farthest-side') {
      return Math.max(distLeft, distTop, distRight, distBottom);
    }

    var distTopLeft = hypotenuseLength(distLeft, distTop);
    var distTopRightCorner = hypotenuseLength(distRight, distTop);
    var distBottomLeftCorner = hypotenuseLength(distLeft, distBottom);
    var distBottomRightCorner = hypotenuseLength(distRight, distBottom);

    if (size === 'closest-corner') {
      return Math.min(distTopLeft, distTopRightCorner, distBottomLeftCorner, distBottomRightCorner);
    } else if (size === 'farthest-corner') {
      return Math.max(distTopLeft, distTopRightCorner, distBottomLeftCorner, distBottomRightCorner);
    }
  }
  internalScope.getRayLength = getRayLength;
})();
