/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('scaleTransform', function () {
      var isAnimationEqual = internalScope.isAnimationEqual;
      var InvalidTransformValue = internalScope.InvalidTransformValue;
      var assertInterpolation = internalScope.assertInterpolation;

      assertInterpolation({
        property: 'scale',
        from: '-10 5 1',
        to: '10 -5 1'
      }, [
        {at: 0, is: '-10 5 1'},
        {at: 0.25, is: '-5 2.5 1'},
        {at: 0.75, is: '5 -2.5 1'},
        {at: 1, is: '10 -5 1'}
      ]);

      isAnimationEqual({scale: ['0.5', '2.5']}, {transform: ['scale3d(0.5, 1, 1)', 'scale3d(2.5, 1, 1)']});
      isAnimationEqual({scale: ['9 2', '2 2']}, {transform: ['scale3d(9, 2, 1)', 'scale3d(2, 2, 1)']});
      isAnimationEqual({scale: ['1 2 3', '3 4 5']}, {transform: ['scale3d(1, 2, 3)', 'scale3d(3, 4, 5)']});
      isAnimationEqual({scale: ['none', '8']}, {transform: ['scale3d(1, 1, 1)', 'scale3d(8, 1, 1)']});
      isAnimationEqual({scale: ['2', '3 4']}, {transform: ['scale3d(2, 1, 1)', 'scale3d(3, 4, 1)']});
      isAnimationEqual({scale: ['1 2 3 4', '3 4']}, {transform: [InvalidTransformValue, 'scale3d(3, 4, 1)']});
      isAnimationEqual({scale: ['0.5 garbage', '2.5']}, {transform: [InvalidTransformValue, 'scale3d(2.5, 1, 1)']});
    });
  });
})();
