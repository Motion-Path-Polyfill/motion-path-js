/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetRayDistance', function () {
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      assertTransformInterpolation([
                                    {'offset-path': 'ray(60deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(60deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(86.6px, -50px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offset-path': 'ray(90deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(90deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(100px, 0px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offset-path': 'ray(135deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(135deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(70.71px, 70.71px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offset-path': 'ray(225deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(225deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(-70.71px, 70.71px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offset-path': 'ray(315deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(315deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(-70.71px, -70.71px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offset-path': 'ray(420deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(420deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(86.6px, -50px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offset-path': 'ray(420deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(420deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(86.6px, -50px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offset-path': 'ray(-45deg)', 'offset-distance': '0px'},
                                    {'offset-path': 'ray(-45deg)', 'offset-distance': '100px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(-70.71px, -70.71px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offset-path': 'ray(135deg)', 'offset-distance': '0%'},
                                    {'offset-path': 'ray(135deg)', 'offset-distance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'}
        ]
      );
    });
  });
})();
