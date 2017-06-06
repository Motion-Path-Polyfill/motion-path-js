/* global suite test internalScope */
'use strict';

(function () {
  suite('transforms', function () {
    test('rotateTransform', function () {
      var isAnimationEqual = internalScope.isAnimationEqual;
      var InvalidTransformValue = internalScope.InvalidTransformValue;
      var assertInterpolation = internalScope.assertInterpolation;

      assertInterpolation({
        property: 'rotate',
        from: '100deg',
        to: '-100deg'
      }, [
        {at: 0, is: '100deg'},
        {at: 0.25, is: '50deg'},
        {at: 0.75, is: '-50deg'},
        {at: 1, is: '-100deg'}
      ]);

      assertInterpolation({
        property: 'rotate',
        from: '0.25 -0.5 1.5 0deg',
        to: '0.25 -0.5 1.5 180deg'
      }, [
        {at: 0, is: '0.25 -0.5 1.5 0deg'},
        {at: 0.25, is: '0.25 -0.5 1.5 45deg'},
        {at: 0.75, is: '0.25 -0.5 1.5 135deg'},
        {at: 1, is: '0.25 -0.5 1.5 180deg'}
      ]);

      assertInterpolation({
        property: 'rotate',
        from: '0 0 1 -720deg',
        to: 'none'
      }, [
        {at: 0, is: '0 0 1 -720deg'},
        {at: 0.25, is: '0 0 1 -540deg'},
        {at: 0.75, is: '0 0 1 -180deg'},
        {at: 1, is: 'none'}
      ]);

      // TODO: Support and test SLERP animation between different axes.

      // TODO: Support and test animation between rotations with and without axes.

      isAnimationEqual({rotate: ['100grad', '200grad']}, {transform: ['rotate(100grad)', 'rotate(200grad)']});
      // Web animations transform does not support turn, but it should!
      isAnimationEqual({rotate: ['1turn', '90deg']}, {transform: ['rotate(360deg)', 'rotate(90deg)']});

      isAnimationEqual({rotate: ['1rad', '2rad']}, {transform: ['rotate(1rad)', 'rotate(2rad)']});
      isAnimationEqual({rotate: ['33.8deg', '19deg']}, {transform: ['rotate(33.8deg)', 'rotate(19deg)']});
      isAnimationEqual({rotate: ['2turn', '4turn']}, {transform: ['rotate(2turn)', 'rotate(4turn)']});
      isAnimationEqual({rotate: ['1 9 1 45deg', '1 9 1 45deg']}, {transform: ['rotate3d(1, 9, 1, 45deg)', 'rotate3d(1, 9, 1, 45deg)']});

      isAnimationEqual({rotate: ['7 9 20 3 60deg', '2 4 13 8 20deg']}, {transform: ['translate3d(0px, 0px, 0px)', 'translate3d(0px, 0px, 0px)']});
      isAnimationEqual({rotate: ['7 9 20 3 60garbage', '2 4 13 8 20deg']}, {transform: ['translate3d(0px, 0px, 0px)', 'translate3d(0px, 0px, 0px)']});
      isAnimationEqual({rotate: ['73', '19']}, {transform: ['translate3d(0px, 0px, 0px)', 'translate3d(0px, 0px, 0px)']});
      isAnimationEqual({rotate: ['twentyone 2 3 73pants', '19']}, {transform: ['translate3d(0px, 0px, 0px)', 'translate3d(0px, 0px, 0px)']});

      isAnimationEqual({rotate: ['twentyone 2 3 73pants', '19deg']}, {transform: [InvalidTransformValue, 'rotate(19deg)']});
    });
  });
})();
