/* global suite test internalScope */

 (function () {
   suite('offsetPath', function () {
     test('basicShapeCircle', function () {
       var assertTransformInterpolation = internalScope.assertTransformInterpolation;

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

       // TODO: Support path interpolation for basic shapes.
       assertTransformInterpolation([
                                    {'offsetPath': 'circle(0px at 100px 200px)', 'offsetDistance': '1000px', 'offsetRotate': '0deg', 'offsetAnchor': '50% 50%'},
                                    {'offsetPath': 'circle(0px at 300px 400px)', 'offsetDistance': '1000px', 'offsetRotate': '0deg', 'offsetAnchor': '50% 50%'}],
         [
                                    {at: 0, is: 'translate3d(100px, 200px, 0px)'},
                                    {at: 1, is: 'translate3d(300px, 400px, 0px)'}
         ]
        );
     });
   });
 })();
