/* global suite test internalScope */

suite('transforms', function () {
  test('transform', function () {
    var isAnimationEqual = internalScope.isAnimationEqual;

    isAnimationEqual({translate: ['20px 30px', '20px'], rotate: ['40deg', '80deg']}, {transform: ['translate3d(20px, 30px, 0px) rotate(40deg)', 'translate3d(20px, 0px, 0px) rotate(80deg)']});
    isAnimationEqual({translate: ['20px 30px', '20px'], rotate: ['1rad', '2rad']}, {transform: ['translate3d(20px, 30px, 0px) rotate(1rad)', 'translate3d(20px, 0px, 0px) rotate(2rad)']});
    // TODO: To fix the test below for invalid arguments
    // isAnimationEqual({translate: ['20px 30px 40px 50px', '20px'], rotate: ['1deg', '2deg']}, {transform: ['rotate(1deg)' , 'translate3d(20px, 0px, 0px) rotate(2deg)']});
    isAnimationEqual({translate: ['20px 30px', '20px'], rotate: ['10deg', '20deg'], scale: ['0.5', '1']}, {transform: ['translate3d(20px, 30px, 0px) rotate(10deg) scale3d(0.5, 1, 1)', 'translate3d(20px, 0px, 0px) rotate(20deg) scale3d(1, 1, 1)']});
  });
});
