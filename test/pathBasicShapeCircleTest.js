/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('basicShapeCircle', function () {
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      assertTransformInterpolation([
                                    {'offsetPath': "circle(10px at 0px 0px)", 'offsetDistance': '0%'},
                                    {'offsetPath': "circle(10px at 0px 0px)", 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, -10px, 0px)'},
                                    {at: 0.25, is: 'translate3d(10px, 0px, 0px)'},
                                    {at: 0.5, is: 'translate3d(0px, 10px, 0px)'},
                                    {at: 0.75, is: 'translate3d(-10px, 0px, 0px)'},
                                    {at: 1, is: 'translate3d(0px, -10px, 0px)'}
        ]
      );

    });
  });
})();
