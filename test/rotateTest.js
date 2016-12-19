/* global suite test assert */

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

  suite('transforms', function () {
    test('rotateTransform', function () {
      isAnimationEqual({rotate: ['100grad', '200grad']}, {transform: ['rotate(100grad)', 'rotate(200grad)']});

      // Web animations transform does not support turn, but it should!
      isAnimationEqual({rotate: ['1turn', '90deg']}, {transform: ['rotate(360deg)', 'rotate(90deg)']});

      isAnimationEqual({rotate: ['1rad', '2rad']}, {transform: ['rotate(1rad)', 'rotate(2rad)']});
      isAnimationEqual({rotate: ['33.8deg', '19deg']}, {transform: ['rotate(33.8deg)', 'rotate(19deg)']});
      isAnimationEqual({rotate: ['2turn', '4turn']}, {transform: ['rotate(2turn)', 'rotate(4turn)']});
      isAnimationEqual({rotate: ['1 9 1 45deg', '1 9 1 45deg']}, {transform: ['rotate3d(1, 9, 1, 45deg)', 'rotate3d(1, 9, 1, 45deg)']});

      isAnimationEqual({rotate: ['7 9 20 3 60deg', '2 4 13 8 20deg']}, {transform: ['none', 'none']});
      isAnimationEqual({rotate: ['7 9 20 3 60garbage', '2 4 13 8 20deg']}, {transform: ['none', 'none']});
      isAnimationEqual({rotate: ['73', '19']}, {transform: ['none', 'none']});
      isAnimationEqual({rotate: ['twentyone 2 3 73pants', '19']}, {transform: ['none', 'none']});

      isAnimationEqual({rotate: ['twentyone 2 3 73pants', '19deg']}, {transform: [InvalidTransformValue, 'rotate(19deg)']});
    });
  });
})();
