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

    actualTarget.remove();
    expectedTarget.remove();

    assert.equal(result, expected, 'at currentTime ' + currentTime + ' comparing ' + JSON.stringify(actualKeyframes) + ' with ' + JSON.stringify(expectedKeyframes))
  }
}

suite('transforms', function () {
  test('translateTransform', function () {
    var InvalidArgument = internalScope.InvalidArgument;
    isAnimationEqual({translate: ['1px', '2px']}, {transform: ['translate3d(1px, 0px, 0px)', 'translate3d(2px, 0px, 0px)']});
  });
});
