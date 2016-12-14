/* global suite test assert internalScope */

function checkTransformKeyframes (keyframes) {
  var target = document.createElement('div');

  for (var value of keyframes) {
    target.style.transform = '';
    target.style.transform = value;
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

    animation = expectedTarget.animate(expectedKeyframes, timing);
    animation.currentTime = currentTime;
    var expected = window.getComputedStyle(expectedTarget).transform;

    element.remove(actualTarget);
    element.remove(expectedTarget);

    assert.equal(result, expected, 'at currentTime ' + currentTime + ' comparing ' + actualKeyframes + ' with ' + expectedKeyframes);
  }
}

suite('transforms', function () {
  test('scaleTransform', function () {
    var InvalidArgument = internalScope.InvalidArgument;
    assert.throws(function () {
        isAnimationEqual({scale: ['0.5 garbage', '2.5']}, {transform: ['none', 'scale3d(2.5, 1, 1)']});
    }, InvalidArgument);
 
    isAnimationEqual({scale: ['0.5', '2.5']}, {transform: ['scale3d(0.5, 1, 1)', 'scale3d(2.5, 1, 1)']});
    isAnimationEqual({scale: ['9 2', '2 2']}, {transform: ['scale3d(9, 2, 1)', 'scale3d(2, 2, 1)']});
    isAnimationEqual({scale: ['1 2 3', '3 4 5']}, {transform: ['scale3d(1, 2, 3)', 'scale3d(3, 4, 5)']});
    isAnimationEqual({scale: ['none', '8']}, {transform: ['scale3d(1, 1, 1)', 'scale3d(8, 1, 1)']});
    isAnimationEqual({scale: ['2', '3 4']}, {transform: ['scale3d(2, 1, 1)', 'scale3d(3, 4, 1)']});
  });
});
