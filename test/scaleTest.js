/* global suite test assert */

function isAnimationEqual (keyframesA, keyframesB) {
  var timing = {duration: 1};
  var currentTimes = [0.10, 0.25, 0.50, 0.75, 0.90];
  var testPassed = true;

  for(var i = 0; i < currentTimes.length; i++) {
    currentTime = currentTimes[i];

    var targetA = document.createElement('div');
    document.body.appendChild(targetA);

    var targetB = document.createElement('div');
    document.body.appendChild(targetB);

    var animation = targetA.animate(keyframesA, timing);
    animation.currentTime = currentTime;
    var result = window.getComputedStyle(targetA).transform;

    animation = targetB.animate(keyframesB, timing);
    animation.currentTime = currentTime;
    var expected = window.getComputedStyle(targetB).transform;

    targetA.parentNode.removeChild(targetA);
    targetB.parentNode.removeChild(targetB);
    if (result !== expected) {
      console.log('test failed for ' + 'scale: ' + keyframesA.scale + ' transform: ' + keyframesB.transform);
      testPassed = false;
      return testPassed;
    }
  }
  return testPassed;
}

suite('transforms', function () {
  test('scaleTransform', function () {
    
    var isEqual = isAnimationEqual({scale: [0.5, 2.5]}, {transform: ['scale(0.5)', 'scale(2.5)']});
    assert.equal(isEqual, true);

    /*isEqual = isAnimationEqual({scale: ['', '']}, {transform: ['scale()', 'scale()']}, 1000);
    assert.equal(isEqual, true);*/

    isEqual = isAnimationEqual({scale: ['9 2', '2 2']}, {transform: ['scale(9, 2)', 'scale(2, 2)']});
    assert.equal(isEqual, true);
/*
    isEqual = isAnimationEqual({scale: ['1 2 3', '3 4 5']}, {transform: ['scale3d(1, 2, 3)', 'scale3d(3, 4, 5)']});
    assert.equal(isEqual, true);*/

    /*isEqual = isAnimationEqual({scale: ['none', '8']}, {transform: ['scale3d(1, 1, 1)', 'scale(8)']}, 333);
    assert.equal(isEqual, true);
*/
    var errorCaught = false;

    try { 
      isEqual = isAnimationEqual({scale: ['2', '3 4']}, {transform: ['scale(2)', 'scale(3, 4)']});
    }
    catch (error) {
      errorCaught = true;
    }
    assert.equal(errorCaught, true);
  });
});
