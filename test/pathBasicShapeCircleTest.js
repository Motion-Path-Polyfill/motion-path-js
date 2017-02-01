/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('basicShapeCircle', function () {
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      assertTransformInterpolation([
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, -10px, 0px) rotate(0.27deg)'},
                                    {at: 0.25, is: 'translate3d(10px, 0px, 0px) rotate(90.27deg)'},
                                    {at: 0.5, is: 'translate3d(0px, 10px, 0px) rotate(-179.73deg)'},
                                    {at: 0.75, is: 'translate3d(-10px, 0px, 0px) rotate(-89.73deg)'},
                                    {at: 1, is: 'translate3d(0px, -10px, 0px) rotate(0.27deg)'}
        ]
        );

      assertTransformInterpolation([
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '62.83px'}],
        [
                                    {at: 0, is: 'translate3d(0px, -10px, 0px) rotate(0.27deg)'},
                                    {at: 0.25, is: 'translate3d(10px, 0px, 0px) rotate(89.84deg)'},
                                    {at: 0.5, is: 'translate3d(0.01px, 10px, 0px) rotate(179.84deg)'},
                                    {at: 0.75, is: 'translate3d(-10px, 0.01px, 0px) rotate(-90.16deg)'},
                                    {at: 1, is: 'translate3d(-0.01px, -10px, 0px) rotate(-0.16deg)'}
        ]
        );

      assertTransformInterpolation([
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '31.42px'}],
        [
                                    {at: 0, is: 'translate3d(0px, -10px, 0px) rotate(0.27deg)'},
                                    {at: 0.5, is: 'translate3d(10px, 0px, 0px) rotate(90.22deg)'},
                                    {at: 1, is: 'translate3d(0px, 10px, 0px) rotate(-179.84deg)'}

        ]
        );
    });
  });
})();
