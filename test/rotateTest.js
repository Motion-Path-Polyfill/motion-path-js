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
  test('rotateTransform', function () {
    var isEqual = isAnimationEqual({rotate: ['45grad', '50grad']}, {transform: ['rotate(45grad)', 'rotate(50grad)']}, 666);
    assert.equal(isEqual, true);

    isEqual = isAnimationEqual({rotate: ['44.3rad', '66rad']}, {transform: ['rotate(44.3rad)', 'rotate(66rad)']}, 1500);
    assert.equal(isEqual, true);

    isEqual = isAnimationEqual({rotate: ['33.8deg', '19deg']}, {transform: ['rotate(33.8deg)', 'rotate(19deg)']}, 670);
    assert.equal(isEqual, true);

    isEqual = isAnimationEqual({rotate: ['182turn', '199.9turn']}, {transform: ['rotate(182turn)', 'rotate(199.9turn)']}, 1900);
    assert.equal(isEqual, true);

    isEqual = isAnimationEqual({rotate: ['1 9 1 45deg', '1 9 1 45deg']}, {transform: ['rotate3d(1, 9, 1, 45deg)', 'rotate3d(1, 9, 1, 45deg)']}, 1480);
    assert.equal(isEqual, true);
  });
});
