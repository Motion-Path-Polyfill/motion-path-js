/* global suite test assert */

function isAnimationEqual (keyframesA, keyframesB, currentTime) {
  var timing = {duration: 2000, iterations: 5, direction: 'alternate', easing: 'linear'};
  var targetA = document.createElement('div');
  document.body.appendChild(targetA);

  var targetB = document.createElement('div');
  document.body.appendChild(targetB);

  var animation = targetA.animate(keyframesA, timing);
  animation.currentTime = currentTime;
  var result = getComputedStyle(targetA).transform;

  animation = targetB.animate(keyframesB, timing);
  animation.currentTime = currentTime;
  var expected = getComputedStyle(targetB).transform;

  targetA.parentNode.removeChild(targetA);
  targetB.parentNode.removeChild(targetB);

  return result === expected;
}

suite('transforms', function () {
  test('scaleTransform', function () {
    var isEqual = isAnimationEqual({scale: [0.5, 2.5]}, {transform: ['scale(0.5)', 'scale(2.5)']}, 267);
    assert.equal(isEqual, true);

    isEqual = isAnimationEqual({scale: ['', '']}, {transform: ['scale()', 'scale()']}, 1000);
    assert.equal(isEqual, true);

    isEqual = isAnimationEqual({scale: ['9 2', '2 2']}, {transform: ['scale(9, 2)', 'scale(2, 2)']}, 50);
    assert.equal(isEqual, true);

    isEqual = isAnimationEqual({scale: ['1 2 3', '3 4 5']}, {transform: ['scale3d(1, 2, 3)', 'scale3d(3, 4, 5)']}, 333);
    assert.equal(isEqual, true);
  });
});