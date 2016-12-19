/* global suite test assert */

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

    assert.equal(result, expected, 'at currentTime ' + currentTime + ' comparing ' + JSON.stringify(actualKeyframes) + ' with ' + JSON.stringify(expectedKeyframes));
  }
}

suite('transforms', function () {
  test('translateTransform', function () {
    isAnimationEqual({translate: ['none', '4px 5px 6px']}, {transform: ['translate3d(0px, 0px, 0px)', 'translate3d(4px, 5px, 6px)']});
    isAnimationEqual({translate: ['1px', '2px']}, {transform: ['translate3d(1px, 0px, 0px)', 'translate3d(2px, 0px, 0px)']});
    isAnimationEqual({translate: ['0.1px', '0.2px']}, {transform: ['translate3d(0.1px, 0px, 0px)', 'translate3d(0.2px, 0px, 0px)']});
    isAnimationEqual({translate: ['1px 2px', '3px 4px']}, {transform: ['translate3d(1px, 2px, 0px)', 'translate3d(3px, 4px, 0px)']});
    isAnimationEqual({translate: ['1px 2px 3px', '4px 5px 6px']}, {transform: ['translate3d(1px, 2px, 3px)', 'translate3d(4px, 5px, 6px)']});
    // TODO: The test below should pass but the code doesn't like the exponential value
    // isAnimationEqual({translate: ['1e3px 2px 3px', '4px 5px 6px']}, {transform: ['translate3d(1e3px, 2px, 3px)', 'translate3d(4px, 5px, 6px)']});
    isAnimationEqual({translate: ['1px 2px', '2px']}, {transform: ['translate3d(1px, 2px, 0px)', 'translate3d(2px, 0px, 0px)']});
  });
});
