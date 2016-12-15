/* global suite test assert internalScope*/

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
    animation.cancel();

    animation = expectedTarget.animate(expectedKeyframes, timing);
    animation.currentTime = currentTime;
    var expected = window.getComputedStyle(expectedTarget).transform;
    animation.cancel();

    actualTarget.remove();
    expectedTarget.remove();


    assert.equal(result, expected, 'at currentTime ' + currentTime + ' comparing ' + actualKeyframes + ' with ' + expectedKeyframes);
  }
}

suite('transforms', function () {
  test('rotateTransform', function () {
    var InvalidArgument = internalScope.InvalidArgument;

    isAnimationEqual({rotate: ['45grad', '50grad']}, {transform: ['rotate(45grad)', 'rotate(50grad)']});
    isAnimationEqual({rotate: ['44.3rad', '66rad']}, {transform: ['rotate(44.3rad)', 'rotate(66rad)']});
    isAnimationEqual({rotate: ['33.8deg', '19deg']}, {transform: ['rotate(33.8deg)', 'rotate(19deg)']});
    isAnimationEqual({rotate: ['182turn', '199.9turn']}, {transform: ['rotate(182turn)', 'rotate(199.9turn)']});
    isAnimationEqual({rotate: ['1 9 1 45deg', '1 9 1 45deg']}, {transform: ['rotate3d(1, 9, 1, 45deg)', 'rotate3d(1, 9, 1, 45deg)']});

    isAnimationEqual({rotate: ['7 9 20 3 60deg', '2 4 13 8 20deg']}, {transform: ['none', 'none']});

    isAnimationEqual({rotate: ['7 9 20 3 60garbage', '2 4 13 8 20deg']}, {transform: ['none', 'none']});
   

/*    assert.throws(function () {
      isAnimationEqual({rotate: ['73', '19']}, {transform: ['none', 'none']});
    }, InvalidArgument);    

    assert.throws(function () {
      isAnimationEqual({rotate: ['twentyone 2 3 73pants', '19']}, {transform: ['none', 'none']});
    }, InvalidArgument);*/

  });
});
