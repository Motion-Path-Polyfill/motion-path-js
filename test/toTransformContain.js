/* global suite test internalScope */
'use strict';

(function () {
  var assertTransform = internalScope.assertTransform;

  suite('toTransformContain', function () {
    test('vertical', function () {
      var containerStyle = {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '200px',
        height: '139px'
      };

      var targetStyle = {
        width: '19px',
        height: '5px',
        position: 'absolute',
        left: '85px',
        top: '23px',
        offsetPosition: '100px 25px',
        offsetPath: 'ray(0deg closest-side contain)',
        offsetDistance: '0%',
        offsetRotate: '0deg',
        offsetAnchor: 'auto', // use transformOrigin
        transformOrigin: '15px 2px'
      };

      // In this test, left/top and offsetPosition/offsetAnchor imply the same location.
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px)');

      // A 15, 20, 25 triangle is formed by
      // anchorX, |translation|+anchorY, path length
      targetStyle.offsetDistance = '987%';
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, -18px, 0px)');

      targetStyle.offsetPath = 'ray(180deg closest-side contain)';
      targetStyle.offsetDistance = '-987%';
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, -18px, 0px)');

      targetStyle.top = '98px';
      targetStyle.offsetPosition = '100px 100px';
      targetStyle.offsetDistance = '0%';

      // left/top and offsetPosition/offsetAnchor imply the same location.
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px)');

      // A 15, 36, 39 triangle is formed by
      // anchorX, translation+(height-anchorY), path length
      targetStyle.offsetDistance = '987%';
      targetStyle.offsetRotate = 'auto -90deg'; // Same as 0deg when ray bearing is 180deg.
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 33px, 0px)');

      targetStyle.offsetPath = 'ray(0deg closest-side contain)';
      targetStyle.offsetDistance = '-987%';
      targetStyle.offsetRotate = 'auto 90deg'; // Same as 0deg when ray bearing is 0deg.
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 33px, 0px)');
    });

    test('horizontal', function () {
      var containerStyle = {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '139px',
        height: '200px'
      };

      var targetStyle = {
        width: '5px',
        height: '19px',
        position: 'absolute',
        left: '23px',
        top: '85px',
        offsetPosition: '25px 100px',
        offsetPath: 'ray(-90deg closest-side contain)',
        offsetDistance: '0%',
        offsetRotate: '0deg',
        offsetAnchor: 'auto', // use transformOrigin
        transformOrigin: '2px 15px'
      };

      // In this test, left/top and offsetPosition/offsetAnchor imply the same location.
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px)');

      // A 15, 20, 25 triangle is formed by
      // anchorY, |translation|+anchorX, path length
      targetStyle.offsetDistance = '987%';
      assertTransform(containerStyle, targetStyle, 'translate3d(-18px, 0px, 0px)');

      targetStyle.offsetPath = 'ray(90deg closest-side contain)';
      targetStyle.offsetDistance = '-987%';
      assertTransform(containerStyle, targetStyle, 'translate3d(-18px, 0px, 0px)');

      targetStyle.left = '98px';
      targetStyle.offsetPosition = '100px 100px';
      targetStyle.offsetDistance = '0%';

      // left/top and offsetPosition/offsetAnchor imply the same location.
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px)');

      // A 15, 36, 39 triangle is formed by
      // anchorY, translation+(width-anchorX), path length
      targetStyle.offsetDistance = '987%';
      targetStyle.offsetRotate = 'auto'; // Same as 0deg when ray bearing is 90deg.
      assertTransform(containerStyle, targetStyle, 'translate3d(33px, 0px, 0px)');

      targetStyle.offsetPath = 'ray(-90deg closest-side contain)';
      targetStyle.offsetDistance = '-987%';
      targetStyle.offsetRotate = 'auto 180deg'; // Same as 0deg when ray bearing is -90deg.
      assertTransform(containerStyle, targetStyle, 'translate3d(33px, 0px, 0px)');
    });

    test('diagonal', function () {
      var containerStyle = {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '200px',
        height: '50px'
      };

      var targetStyle = {
        width: '20px',
        height: '50px',
        position: 'absolute',
        left: '80px',
        top: '5px',
        offsetPosition: '100px 25px',
        offsetPath: 'ray(60deg sides contain)',
        offsetDistance: '0%',
        offsetRotate: 'auto',
        offsetAnchor: 'auto', // use transformOrigin
        transformOrigin: '20px 20px'
      };

      // In this test, left/top and offsetPosition/offsetAnchor imply the same location.
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px) rotate(-30deg)');

      // A 30, 40, 50 triangle is formed by
      // height-anchorY, translation distance, path length
      targetStyle.offsetDistance = '987%';
      assertTransform(containerStyle, targetStyle, 'translate3d(34.64px, -20px, 0px) rotate(-30deg)');

      // A 30, 40, 50 triangle is formed by
      // height-anchorY, translation distance + width, path length
      targetStyle.offsetPath = 'ray(240deg sides contain)';
      targetStyle.offsetRotate = '-30deg';
      assertTransform(containerStyle, targetStyle, 'translate3d(-17.32px, 10px, 0px) rotate(-30deg)');
    });

    test('expand', function () {
      var containerStyle = {
        position: 'absolute',
        left: '300px',
        top: '300px',
        width: '0px',
        height: '0px'
      };

      var targetStyle = {
        width: '64px',
        height: '102px',
        position: 'absolute',
        left: '-10px',
        top: '-42px',
        offsetPosition: '0px 0px',
        offsetPath: 'ray(90deg closest-side)',
        offsetDistance: '0%',
        offsetRotate: '0deg',
        offsetAnchor: 'auto', // use transformOrigin
        transformOrigin: '10px 42px'
      };

      // In this test, left/top and offsetPosition/offsetAnchor imply the same location.
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px)');

      targetStyle.offsetPath = 'ray(360deg closest-side contain)';
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, -9px, 0px)');

      targetStyle.offsetPath = 'ray(270deg closest-side contain)';
      assertTransform(containerStyle, targetStyle, 'translate3d(-22px, 0px, 0px)');

      targetStyle.offsetPath = 'ray(180deg closest-side contain)';
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, -9px, 0px)');

      targetStyle.offsetPath = 'ray(90deg closest-side contain)';
      assertTransform(containerStyle, targetStyle, 'translate3d(-22px, 0px, 0px)');
    });
  });
})();
