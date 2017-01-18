/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetRayDistance', function () {
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      assertTransformInterpolation([
                                    {'offset-path': 'ray(60deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(60deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 1, is: 'translate3d(86.6px, -50px, 0px)'}
        ]
      );
    });
  });
})();
