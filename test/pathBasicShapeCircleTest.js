/* global assert suite test internalScope */


(function () {
  suite('offsetPath', function () {
    test('basicShapeCircle', function () {
        var assertTransformInterpolation = internalScope.assertTransformInterpolation;
        var offsetPathParse = internalScope.offsetPathParse;  

        var containerStyle = {
        position: 'absolute',
        height: '100px',
        width: '200px'
        };

        var container = document.createElement('div');

        for (var property in containerStyle) {
        container.style[property] = containerStyle[property];
        }

        var target = document.createElement('div');
        container.appendChild(target);
        document.body.appendChild(container);

        var circlePathString = offsetPathParse('circle(50%)', target).path;
        assert.equal(circlePathString, 'M 100 50 m 0,-79.06 a 79.06,79.06 0 0,1 79.06,79.06 a 79.06,79.06 0 1,1 -79.06,-79.06 z');

        circlePathString = offsetPathParse('circle(10px)', target).path;
        assert.equal(circlePathString, 'M 100 50 m 0,-10 a 10,10 0 0,1 10,10 a 10,10 0 1,1 -10,-10 z');

        circlePathString = offsetPathParse('circle(10px at 50%)', target).path;
        assert.equal(circlePathString, 'M 100 50 m 0,-10 a 10,10 0 0,1 10,10 a 10,10 0 1,1 -10,-10 z');

        circlePathString = offsetPathParse('circle(50% at 100px 200px)', target).path;
        assert.equal(circlePathString, 'M 100 200 m 0,-79.06 a 79.06,79.06 0 0,1 79.06,79.06 a 79.06,79.06 0 1,1 -79.06,-79.06 z');

        circlePathString = offsetPathParse('circle(10px at 50% 50%)', target).path;
        assert.equal(circlePathString, 'M 100 50 m 0,-10 a 10,10 0 0,1 10,10 a 10,10 0 1,1 -10,-10 z');

        assertTransformInterpolation([
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '100%'}],
         [
                                    {at: 0, is: 'translate3d(0px, -10px, 0px)'},
                                    {at: 0.25, is: 'translate3d(10px, 0px, 0px) rotate(90deg)'},
                                    {at: 0.5, is: 'translate3d(0px, 10px, 0px) rotate(180deg)'},
                                    {at: 0.75, is: 'translate3d(-10px, 0px, 0px) rotate(-90deg)'},
                                    {at: 1, is: 'translate3d(0px, -10px, 0px)'}
         ]
        );

       assertTransformInterpolation([
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '62.83px'}],
         [
                                    {at: 0, is: 'translate3d(0px, -10px, 0px)'},
                                    {at: 0.25, is: 'translate3d(10px, 0px, 0px) rotate(89.45deg)'},
                                    {at: 0.5, is: 'translate3d(0.01px, 10px, 0px) rotate(180deg)'},
                                    {at: 0.75, is: 'translate3d(-10px, 0.01px, 0px) rotate(-90deg)'},
                                    {at: 1, is: 'translate3d(-0.01px, -10px, 0px) rotate(-0.55deg)'}
         ]
        );

       assertTransformInterpolation([
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '50%'}],
         [
                                    {at: 0, is: 'translate3d(0px, -10px, 0px)'},
                                    {at: 0.5, is: 'translate3d(10px, 0px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(0px, 10px, 0px) rotate(180deg)'}
         ]
        );

       assertTransformInterpolation([
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '0px'},
                                    {'offsetPath': 'circle(10px at 0px 0px)', 'offsetDistance': '31.42px'}],
         [
                                    {at: 0, is: 'translate3d(0px, -10px, 0px)'},
                                    {at: 0.5, is: 'translate3d(10px, 0px, 0px) rotate(90deg)'},
                                    {at: 1, is: 'translate3d(0px, 10px, 0px) rotate(179.45deg)'}
         ]
        );

       assertTransformInterpolation([
                                    {'offsetPath': 'circle(10px at 100px 100px)', 'offsetDistance': '0%'},
                                    {'offsetPath': 'circle(10px at 100px 100px)', 'offsetDistance': '100%'}],
         [
                                    {at: 0, is: 'translate3d(100px, 90px, 0px)'},
                                    {at: 0.25, is: 'translate3d(110px, 100px, 0px) rotate(90deg)'},
                                    {at: 0.5, is: 'translate3d(100px, 110px, 0px) rotate(180deg)'},
                                    {at: 0.75, is: 'translate3d(90px, 100px, 0px) rotate(-90deg)'},
                                    {at: 1, is: 'translate3d(100px, 90px, 0px)'}
         ]
        );
     });
   });
 })();
