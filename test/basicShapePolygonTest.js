/* global suite test assert internalScope */
'use strict';

(function () {
  suite('offsetPath', function () {
    test('polygon', function () {
      var offsetPathParse = internalScope.offsetPathParse;
      var assertTransformInterpolation = internalScope.assertTransformInterpolation;

      var result = offsetPathParse('polygon(0px 0px, 150px 200px, 250px 150px, 200px -150px)');
      assert.equal(result.path, 'm 0 0 l 150 200 l 100 -50 l -50 -300 z');

      result = offsetPathParse('polygon(0px 0px, 50px 0px, 50px -50px, 0px -50px)');
      assert.equal(result.path, 'm 0 0 l 50 0 l 0 -50 l -50 0 z');

      result = offsetPathParse('polygon(50px 0px, 50px -50px, 0px -50px)');
      assert.equal(result.path, 'm 50 0 l 0 -50 l -50 0 z');

      result = offsetPathParse('garbage');
      assert.equal(result, undefined);

      result = offsetPathParse('polygon');
      assert.equal(result, undefined);

      result = offsetPathParse('polygon()');
      assert.equal(result, undefined);

      // Currently fails because basicShapeCircleParse doesn't return null. This is being worked on by Divyanshi.
/*      result = offsetPathParse('polygon(garbage)');
      assert.equal(result, undefined); */

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
                                    {at: 1 / 3, is: 'translate3d(400px, 200px, 0px) rotate(128.66deg)'},
                                    {at: 0.5, is: 'translate3d(250px, 400px, 0px) rotate(180deg)'},
                                    {at: 2 / 3, is: 'translate3d(0px, 400px, 0px) rotate(-128.66deg)'},
                                    {at: 1, is: 'translate3d(0px, 0px, 0px)'}
        ]
      );

      var containerStyle = {
        position: 'absolute',
        width: '500px',
        height: '500px'
      };

      var container = document.createElement('div');
      for (var property in containerStyle) {
        container.style[property] = containerStyle[property];
      }

      var target = document.createElement('div');
      container.appendChild(target);
      document.body.appendChild(container);

      result = offsetPathParse('polygon(0px 0px, 150px 200px, 250px 150px, 200px -150px)', target);
      assert.equal(result.path, 'm 0 0 l 150 200 l 100 -50 l -50 -300 z');

      result = offsetPathParse('polygon(0px 0px, 30% 200px, 50% 30%, 40% -30%)', target);
      assert.equal(result.path, 'm 0 0 l 150 200 l 100 -50 l -50 -300 z');

      result = offsetPathParse('polygon(0px 0px, 10% 50%, 40% 30%, -70% -30%)', target);
      assert.equal(result.path, 'm 0 0 l 50 250 l 150 -100 l -550 -300 z');
    });
  });
})();
