/* global suite test assert */

function targetTester (keyframeA, keyframeB, timing) {
  var targetA = document.createElement('div');
  document.body.appendChild(targetA);

  var targetB = document.createElement('div');
  document.body.appendChild(targetB);

  var animation = targetA.animate(keyframeA, timing);
  animation.currentTime = 1000;
  var result = getComputedStyle(targetA).transform;

  var animation = targetB.animate(keyframeB, timing);
  animation.currentTime = 1000;
  var expected = getComputedStyle(targetB).transform;

  return result === expected;
}

suite('transforms', function () {
  var timing = {duration: 2000, iterations: 5, direction: 'alternate', easing: 'linear'};
  test('scaleTransform', function () {
    var isEqual = targetTester({scale: [0.5, 2.5]}, {transform: ['scale(0.5)', 'scale(2.5)']}, timing);
    assert.equal(isEqual, true);

    isEqual = targetTester({scale: ['', '']}, {transform: ['scale()', 'scale()']}, timing);
    assert.equal(isEqual, true);

    isEqual = targetTester({scale: ['9 2', '2 2']}, {transform: ['scale(9, 2)', 'scale(2, 2)']}, timing);
    assert.equal(isEqual, true);

    isEqual = targetTester({scale: ['1 2 3', '3 4 5']}, {transform: ['scale3d(1, 2, 3)', 'scale3d(3, 4, 5)']}, timing);
    assert.equal(isEqual, true);
  });

  test('rotateTransform', function () {
    var isEqual = targetTester({rotate: ['45grad', '50grad']}, {transform: ['rotate(45grad)', 'rotate(50grad)']}, timing);
    assert.equal(isEqual, true);

    var isEqual = targetTester({rotate: ['44.3rad', '66rad']}, {transform: ['rotate(44.3rad)', 'rotate(66rad)']}, timing);
    assert.equal(isEqual, true);

    var isEqual = targetTester({rotate: ['33.8deg', '19deg']}, {transform: ['rotate(33.8deg)', 'rotate(19deg)']}, timing);
    assert.equal(isEqual, true);

    var isEqual = targetTester({rotate: ['182turn', '199.9turn']}, {transform: ['rotate(182turn)', 'rotate(199.9turn)']}, timing);
    assert.equal(isEqual, true);

    isEqual = targetTester({rotate: ['1 9 1 45deg', '1 9 1 45deg']}, {transform: ['rotate3d(1, 9, 1, 45deg)', 'rotate3d(1, 9, 1, 45deg)']}, timing);
    assert.equal(isEqual, true);
  });
});
