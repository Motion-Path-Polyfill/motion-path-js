/* global suite test assert internalScope */
'use strict';

(function () {
  suite('offsetPath', function () {
    test('polygon', function () {
      var offsetPathParse = internalScope.offsetPathParse;
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      var result = offsetPathParse('polygon(0px 0px, 150px 200px, 250px 150px, 200px -150px)');
      assert.equal(offsetPathParse(result.path, 'm 0 0 l 150 200 l 100 -50 l -50 -300 z'));

      result = offsetPathParse('polygon(0px 0px, 50px 0px, 50px -50px, 0px -50px)');
      assert.equal(offsetPathParse(result.path, 'm 0 0 l 50 0 l 0 -50 l -50 0 z'));

      result = offsetPathParse('polygon(50px 0px, 50px -50px, 0px -50px)');
      assert.equal(offsetPathParse(result.path, 'm 50 0 l 0 -50 l -50 0 z'));

      assertTransformInterpolation([
                                    {'offsetPath': 'polygon(0px 0px, 50px 0px, 50px -50px, 0px -50px)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'polygon(0px 0px, 50px 0px, 50px -50px, 0px -50px)', 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 0.25, is: 'translate3d(50px, 0px, 0px) rotate(-90deg)'},
                                    {at: 0.5, is: 'translate3d(50px, -50px, 0px) rotate(180deg)'},
                                    {at: 0.75, is: 'translate3d(0px, -50px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
        ]
      );

      assertTransformInterpolation([
                                    {'offsetPath': 'polygon(0px 0px, 250px 0px, 400px 200px, 250px 400px, 0px 400px, -150px 200px)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'polygon(0px 0px, 250px 0px, 400px 200px, 250px 400px, 0px 400px, -150px 200px)', 'offsetDistance': '100%'}],
        [
                                    {at: 0, is: 'translate3d(0px, 0px, 0px)'},
                                    {at: 1 / 3, is: 'translate3d(400px, 200px, 0px) rotate(127.04deg)'},
                                    {at: 0.5, is: 'translate3d(250px, 400px, 0px) rotate(180deg)'},
                                    {at: 2 / 3, is: 'translate3d(0px, 400px, 0px) rotate(-126.44deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
        ]
      );
    });
  });
})();
