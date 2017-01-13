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

  function convertOffsetAnchorPosition (properties, element) {
    /* According to spec: https://drafts.fxtf.org/motion-1/#offset-anchor-property
       If offset-anchor is set to auto then it will compute to the value of offset-position. */
    var position = 'auto';
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

    var savedTransform = element.style._style.transform;
    element.style._style.transform = 'none';

    var offsetLeft = element.offsetLeft;
    var offsetTop = element.offsetTop;
    element.style._style.transform = savedTransform;

    var elementProperties = element.getBoundingClientRect();
    var anchorPosX = 0.01 * anchor[0] * elementProperties.width;
    var anchorPosY = 0.01 * anchor[1] * elementProperties.height;

    if (element.parentElement === null) {
      return 'translate3d(0px, 0px, 0px)';
    }

    var parentProperties = element.offsetParent.getBoundingClientRect();
    var offsetPosX = 0.01 * position[0] * parentProperties.width;
    var offsetPosY = 0.01 * position[1] * parentProperties.height;

    var desiredPosX = (offsetPosX - anchorPosX) - offsetLeft;
    var desiredPosY = (offsetPosY - anchorPosY) - offsetTop;

    return 'translate3d(' + desiredPosX + 'px, ' + desiredPosY + 'px, ' + '0px)';
  }

  function toTransform (properties, element) {
    return [
      convertTranslate(properties.translate),
      convertRotate(properties.rotate),
      convertScale(properties.scale),
      convertOffsetAnchorPosition(properties, element)
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }
  internalScope.toTransform = toTransform;
})();
