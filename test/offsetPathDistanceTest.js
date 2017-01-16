/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetDistance', function () {
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      assertTransformInterpolation([{'offset-path': 'm 0, 0 h 100 v 100 h -100 z', 'offset-distance': '0px'},
                                    {'offset-path': 'm 0, 0 h 100 v 100 h -100 z', 'offset-distance': '400px'}],
                                  [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 0.25, is: 'translate3d(100px, 0px, 0px)'},
                                    {at: 0.5, is: 'translate3d(100px, 100px, 0px)'},
                                    {at: 0.75, is: 'translate3d(0px, 100px, 0px)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
                                  ]
      );

      assertTransformInterpolation([{'offset-path': 'm 0, 0 h 100 v 100 h -100 z', 'offset-distance': '0%'},
                                    {'offset-path': 'm 0, 0 h 100 v 100 h -100 z', 'offset-distance': '100%'}],
                                  [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 0.25, is: 'translate3d(100px, 0px, 0px)'},
                                    {at: 0.5, is: 'translate3d(100px, 100px, 0px)'},
                                    {at: 0.75, is: 'translate3d(0px, 100px, 0px)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
                                  ]
      );

    });
  });
})();
