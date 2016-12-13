/* global internalScope */

(function () {
  function InvalidArgument (message) {
    this.message = message;
    this.name = 'InvalidArgument';
  }

  function isNumeric (number) {
    return !isNaN(number);
  }
 
  function convertScale (input) {
    valuesArray = internalScope.scaleParse(input);
    if (valuesArray === null || valuesArray === undefined) {
      return null;
    }
    return 'scale3d(' + valuesArray.join(', ') + ')';
  }

  function toTransform (properties) {
    return [
      //convertTranslate(properties.translate),
      //convertRotate(properties.rotate),
      convertScale(properties.scale)
    ].filter(function (result) {
      return result !== null;
    }).join(' ') || 'none';
  }

  internalScope.InvalidArgument = InvalidArgument;
  internalScope.toTransform = toTransform;
})();
