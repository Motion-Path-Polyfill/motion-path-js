/* global assert internalScope */

(function () {
  var InvalidTransformValue = {};

  function checkTransformKeyframes (keyframes) {
    var target = document.createElement('div');

    for (var value of keyframes) {
      target.style.transform = '';
      target.style.transform = value;
      if (value === InvalidTransformValue) {
        continue;
      }
      assert.notEqual(target.style.transform, '',
        'Invalid expected keyframe: ' + value);
    }
  }

  function isAnimationEqual (actualKeyframes, expectedKeyframes) {
    var timing = {duration: 1};
    var currentTimes = [0.10, 0.25, 0.50, 0.75, 0.90];

    checkTransformKeyframes(expectedKeyframes.transform);

    for (var currentTime of currentTimes) {
      var actualTarget = document.createElement('div');
      document.body.appendChild(actualTarget);

      var expectedTarget = document.createElement('div');
      document.body.appendChild(expectedTarget);

      var animation = actualTarget.animate(actualKeyframes, timing);
      animation.currentTime = currentTime;
      var result = window.getComputedStyle(actualTarget).transform;
      animation.cancel();

      animation = expectedTarget.animate(expectedKeyframes, timing);
      animation.currentTime = currentTime;
      var expected = window.getComputedStyle(expectedTarget).transform;
      animation.cancel();

      actualTarget.remove();
      expectedTarget.remove();

      assert.equal(result, expected, 'at currentTime ' + currentTime + ' comparing ' + JSON.stringify(actualKeyframes) + ' with ' + JSON.stringify(expectedKeyframes));
    }
  }

  function assertInterpolation (transformation, expectation) {
    var target = document.createElement('div');

    for (var {at, is} of expectation) {
      var timing = {duration: 1, fill: 'forwards'};

      assert.equal((at > 1 || at < 0), false, "Invalid value for 'at'");

      var animation;
      var keyframes = {};

      keyframes[transformation.property] = [transformation.from, transformation.to];
      animation = target.animate(keyframes, timing);

      animation.currentTime = at;
      var result = target.style._getAnimated(transformation.property);
      animation.cancel();

      assert.equal(result, is, 'For: ' + JSON.stringify(transformation) + ' at: ' + at + '\n');
    }
  }

  internalScope.isAnimationEqual = isAnimationEqual;
  internalScope.checkTransformKeyframes = checkTransformKeyframes;
  internalScope.InvalidTransformValue = InvalidTransformValue;
  internalScope.assertInterpolation = assertInterpolation;
})();

