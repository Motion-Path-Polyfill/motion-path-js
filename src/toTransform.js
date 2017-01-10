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
    // clear transform ?
    element.style._style.transform = 'none';

    var anchor = internalScope.offsetPositionAnchorParse(properties.'offset-anchor');
    var position = internalScope.offsetPositionAnchorParse(properties.'offset-position');

    if (anchor === 'auto' && position !== 'auto') {
      anchor = position;
    }

    var elementProperties = element.getBoundingClientRect();
    // not sure how this works with negative percentages
    var anchorPosX = 0.01 * anchor[0] * elementProperties.width;
    var anchorPosY = 0.01 * anchor[1] * elementProperties.height;
    // need code path for if there is no parent
    var parentProperties = element.parent.getBoundingClientRect();

    var offsetPosX = 0.01 * position[0] * parentProperties.width;
    var offsetPosY = 0.01 * position[1] * parentProperties.height;

    

  }

  function toTransform (properties, element) {
    convertOffsetAnchorPosition(element);
    return [
      convertTranslate(properties.translate),
      convertRotate(properties.rotate),
      convertScale(properties.scale)
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }
  internalScope.toTransform = toTransform;
})();
