/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetPathDistance', function () {
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      assertTransformInterpolation([
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '0px'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '400px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 0.25, is: 'translate3d(100px, 0px, 0px)'},
                                    {at: 0.5, is: 'translate3d(100px, 100px, 0px)'},
                                    {at: 0.75, is: 'translate3d(0px, 100px, 0px)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
        ]
      );

      assertTransformInterpolation([{'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '0%'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 0.25, is: 'translate3d(100px, 0px, 0px)'},
                                    {at: 0.5, is: 'translate3d(100px, 100px, 0px)'},
                                    {at: 0.75, is: 'translate3d(0px, 100px, 0px)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
        ]
      );

      assertTransformInterpolation([{'offsetPath': "path('m 50, 50 h 100 v 100 h -100 z')"},
                                    {'offsetPath': "path('m 50, 50 h 100 v 100 h -100 z')"}],
        [
                                    {at: 0, is: 'translate3d(50px, 50px, 0px)'},
                                    {at: 0.25, is: 'translate3d(50px, 50px, 0px)'},
                                    {at: 0.5, is: 'translate3d(50px, 50px, 0px)'},
                                    {at: 0.75, is: 'translate3d(50px, 50px, 0px)'},
                                    {at: 1, is: 'translate3d(50px, 50px, 0px)'}
        ]
      );

      assertTransformInterpolation([{'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': undefined},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '50%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 0.25, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 0.5, is: 'translate3d(100px, 100px, 0px)'},
                                    {at: 0.75, is: 'translate3d(100px, 100px, 0px)'},
                                    {at: 1, is: 'translate3d(100px, 100px, 0px)'}
        ]
      );
    });
  });
})();
