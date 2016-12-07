/* global suite test assert toTransform InvalidArgument */

function targetTester(keyframeA, keyframeB, timing) {
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
  
  console.log('result: ' + result);
  console.log('expected: ' + expected);

  return result === expected;
}

suite('transforms', function () {
  var timing = {duration: 2000, iterations: 5, direction: 'alternate', easing: 'linear'};
  test('scaleTransform', function () {
    /*var isEqual = targetTester({scale: [0.5, 2.5]}, {transform: ['scale(0.5)', 'scale(2.5)']}, timing);
    assert.equal(isEqual, true);

    isEqual = targetTester({scale: ['','']}, {transform: ['scale()', 'scale()']}, timing);
    assert.equal(isEqual, true);*/
    
    // THE TESTS DON'T LIKE 2,2 or 1,1 i.e. same numbers! <---------------------------------------------------------!
    isEqual = targetTester({scale: ['9 2', '2 2']}, {transform: ['scale(9, 2)', 'scale(2, 2)']}, timing);
    assert.equal(isEqual, true);

    /*isEqual = targetTester({scale: ['1 2 3','3 4 5']}, {transform: ['scale3d(1, 2, 3)', 'scale3d(3, 4, 5)']}, timing);
    assert.equal(isEqual, true);*/
  });

  test('rotateTransform', function () {
    /*var isEqual = targetTester({rotate: ['45deg', '50deg']}, {transform: ['rotate(45deg)', 'rotate(50deg)']}, timing);
    assert.equal(isEqual, true);*/

   // isEqual = targetTester({rotate: ['1 1 1 45deg','1 1 1 45deg']}, {transform: ['rotate(1, 1, 1, 45deg)', 'rotate(1, 1, 1, 45deg)']}, timing);
   // assert.equal(isEqual, true);
    
    /*
    // THE TESTS DON'T LIKE 2,2 or 1,1 i.e. same numbers! <---------------------------------------------------------!
    isEqual = targetTester({scale: ['2 3','3 4']}, {transform: ['scale(2, 3)', 'scale(3, 4)']}, timing);
    assert.equal(isEqual, true);

    isEqual = targetTester({scale: ['1 2 3','3 4 5']}, {transform: ['scale3d(1, 2, 3)', 'scale3d(3, 4, 5)']}, timing);
    assert.equal(isEqual, true);*/
  });

});
