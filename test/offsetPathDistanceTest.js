/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetPathDistance', function () {
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      assertTransformInterpolation([
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '0px'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '600px'}],
        [

                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 2 / 6, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 3 / 6, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 4 / 6, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 5 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 Z')", 'offsetDistance': '0px'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 Z')", 'offsetDistance': '600px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 2 / 6, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 3 / 6, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 4 / 6, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 5 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z  ')", 'offsetDistance': '0px'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z  ')", 'offsetDistance': '600px'}],
        [

                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 2 / 6, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 3 / 6, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 4 / 6, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 5 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z,')", 'offsetDistance': '0px'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z,')", 'offsetDistance': '600px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 2 / 6, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 3 / 6, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 4 / 6, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 5 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z , ')", 'offsetDistance': '0px'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z , ')", 'offsetDistance': '600px'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 2 / 6, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 3 / 6, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 4 / 6, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 5 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '0px'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '-600px'}],
        [

                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1 / 6, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 2 / 6, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 3 / 6, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 4 / 6, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 5 / 6, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 1, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '0px'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '400px'}],
        [

                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 0.25, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 0.5, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 0.75, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'}
        ]
      );

      assertTransformInterpolation([{'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '0%'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100 z')", 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 0.25, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 0.5, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 0.75, is: 'translate3d(0px, 100px, 0px) rotate(-90deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'}
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
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 0.25, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 0.5, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 0.75, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 1, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([{'offsetPath': "path('m 0, 0 h 100 v 100 h -100')", 'offsetDistance': '0%'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100')", 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1 / 3, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 2 / 3, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 1, is: 'translate3d(0px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([{'offsetPath': "path('m 0, 0 h 100 v 100 h -100')", 'offsetDistance': '0%'},
                                    {'offsetPath': "path('m 0, 0 h 100 v 100 h -100')", 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(0deg)'},
                                    {at: 1 / 3, is: 'translate3d(100px, 0px, 0px) rotate(90deg)'},
                                    {at: 2 / 3, is: 'translate3d(100px, 100px, 0px) rotate(180deg)'},
                                    {at: 1, is: 'translate3d(0px, 100px, 0px) rotate(180deg)'}
        ]
      );

      assertTransformInterpolation([{'offsetPath': "path('M 0, 0 L 50, 50 L -50, 50 L 0, 0 z')", 'offsetDistance': '0%'},
                                    {'offsetPath': "path('M 0, 0 L 50, 50 L -50, 50 L 0, 0 z')", 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px) rotate(45deg)'},
                                    {at: 1 / 3, is: 'translate3d(40.24px, 50px, 0px) rotate(180deg)'},
                                    {at: 2 / 3, is: 'translate3d(-40.24px, 50px, 0px) rotate(180deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px) rotate(45deg)'}
        ]
      );

      assertTransformInterpolation([{'offsetPath': "path('M 0, 100 L 50, 150 L -50, 150 L 0, 100')", 'offsetDistance': '0%'},
                                    {'offsetPath': "path('M 0, 100 L 50, 150 L -50, 150 L 0, 100')", 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 100px, 0px) rotate(45.03deg)'},
                                    {at: 1 / 3, is: 'translate3d(40.24px, 150px, 0px) rotate(180deg)'},
                                    {at: 2 / 3, is: 'translate3d(-40.24px, 150px, 0px) rotate(180deg)'},
                                    {at: 1, is: 'translate3d(0px, 100px, 0px) rotate(314.94deg)'}
        ]
      );
    });
  });
})();
