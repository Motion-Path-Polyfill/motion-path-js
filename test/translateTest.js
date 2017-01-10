/* global suite test internalScope */

suite('transforms', function () {
  test('translateTransform', function () {
    var isAnimationEqual = internalScope.isAnimationEqual;
    var InvalidTransformValue = internalScope.InvalidTransformValue;
    var assertInterpolation = internalScope.assertInterpolation;

    assertInterpolation({
      property: 'translate',
      from: '-100px 0px 0px',
      to: '100px 0px 0px'
    }, [
      {at: 0, is: '-100px 0px 0px'},
      {at: 0.25, is: '-50px 0px 0px'},
      {at: 0.75, is: '50px 0px 0px'},
      {at: 1, is: '100px 0px 0px'}
    ]);

    isAnimationEqual({translate: ['20px 30px 27px 90px', '20px']}, {transform: [InvalidTransformValue, 'translate3d(20px, 0px, 0px)']});
    isAnimationEqual({translate: ['garbage', '20px']}, {transform: [InvalidTransformValue, 'translate3d(20px, 0px, 0px)']});
    isAnimationEqual({translate: ['garbagepx', '20px']}, {transform: [InvalidTransformValue, 'translate3d(20px, 0px, 0px)']});

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
