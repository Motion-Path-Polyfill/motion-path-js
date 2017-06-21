/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetRayDistance', function () {
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      assertTransformInterpolation([
                                    {'offsetPath': 'ray(60deg closest-side)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'ray(60deg closest-side)', 'offsetDistance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(-30deg)'},
                                    {at: 1, is: 'translate3d(86.6px, -50px, 0px) rotate(-30deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'ray(90deg farthest-side)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'ray(90deg farthest-side)', 'offsetDistance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 1, is: 'translate3d(100px, 0px, 0px)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'ray(135deg closest-corner)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'ray(135deg closest-corner)', 'offsetDistance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(45deg)'},
                                    {at: 1, is: 'translate3d(70.71px, 70.71px, 0px) rotate(45deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'ray(225deg farthest-corner)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'ray(225deg farthest-corner)', 'offsetDistance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(135deg)'},
                                    {at: 1, is: 'translate3d(-70.71px, 70.71px, 0px) rotate(135deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'ray(315deg sides)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'ray(315deg sides)', 'offsetDistance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(225deg)'},
                                    {at: 1, is: 'translate3d(-70.71px, -70.71px, 0px) rotate(225deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'ray(420deg closest-side)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'ray(420deg closest-side)', 'offsetDistance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(330deg)'},
                                    {at: 1, is: 'translate3d(86.6px, -50px, 0px) rotate(330deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'ray(-45deg closest-side)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'ray(-45deg closest-side)', 'offsetDistance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(-135deg)'},
                                    {at: 1, is: 'translate3d(-70.71px, -70.71px, 0px) rotate(-135deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'ray(closest-side 135deg)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'ray(closest-side 135deg)', 'offsetDistance': '90%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(45deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px) rotate(45deg)'}
        ]
      );
    });
  });
})();
