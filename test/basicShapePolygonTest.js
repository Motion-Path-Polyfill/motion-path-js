/* global suite test assert internalScope */
'use strict';

(function () {
  suite('offsetPath', function () {
    test('polygon', function () {
      var offsetPathParse = internalScope.offsetPathParse;
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      var result = offsetPathParse('polygon(150px 200px, 250px 150px, 200px -150px)');
      assert.equal(offsetPathParse(result.path, 'm 0 0 h 150 v 200 h 100 v -50 h -50 v -300 z'));

      assertTransformInterpolation([
                                    {'offsetPath': 'polygon(50px 0px, 50px -50px, 0px -50px)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'polygon(50px 0px, 50px -50px, 0px -50px)', 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 0.25, is: 'translate3d(50px, 0px, 0px) rotate(-90deg)'},
                                    {at: 0.5, is: 'translate3d(50px, -50px, 0px) rotate(180deg)'},
                                    {at: 0.75, is: 'translate3d(0px, -50px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'polygon(250px 0px, 400px 200px, 250px 400px, 0px 400px, -150px 200px)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'polygon(250px 0px, 400px 200px, 250px 400px, 0px 400px, -150px 200px)', 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 1 / 3, is: 'translate3d(400px, 200px, 0px) rotate(180deg)'},
                                    {at: 0.5, is: 'translate3d(250px, 350px, 0px) rotate(90deg)'},
                                    {at: 2 / 3, is: 'translate3d(0px, 400px, 0px) rotate(180deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
        ]
      );
    });
  });
})();
