/* global suite test assert internalScope */
'use strict';

(function () {
  var toTransform = internalScope.toTransform;
  var assertTransform = internalScope.assertTransform;

  suite('toTransform', function () {
    test('convertTranslate', function () {
      assert.equal(toTransform({translate: 'none'}), 'translate3d(0px, 0px, 0px)');
      assert.equal(toTransform({translate: '0.6px'}), 'translate3d(0.6px, 0px, 0px)');
      assert.equal(toTransform({translate: '50px'}), 'translate3d(50px, 0px, 0px)');
      assert.equal(toTransform({translate: '20px 30px'}), 'translate3d(20px, 30px, 0px)');
      assert.equal(toTransform({translate: '20px 30px 90px'}), 'translate3d(20px, 30px, 90px)');
    });

    test('convertRotate', function () {
      assert.equal(toTransform({rotate: '20 10'}), 'none');
      assert.equal(toTransform({rotate: ''}), 'none');
      assert.equal(toTransform({rotate: 'garbage'}), 'none');
      assert.equal(toTransform({rotate: '300degrees'}), 'none');
      assert.equal(toTransform({rotate: 'threedegrees'}), 'none');
      assert.equal(toTransform({rotate: '10 hello 20 30deg'}), 'none');
      assert.equal(toTransform({rotate: 'garbagedeg'}), 'none');

      assert.equal(toTransform({rotate: 'none'}), 'rotate3d(0, 0, 1, 0deg)');
      var expectedDeg = 100 * (180 / Math.PI);
      assert.equal(toTransform({rotate: '50 10 30 100rad'}), 'rotate3d(50, 10, 30, ' + expectedDeg + 'deg)');
      assert.equal(toTransform({rotate: '15turn'}), 'rotate(5400deg)');
      assert.equal(toTransform({rotate: '200deg'}), 'rotate(200deg)');
      assert.equal(toTransform({rotate: '20grad'}), 'rotate(18deg)');
      expectedDeg = 164 * (180 / Math.PI);
      assert.equal(toTransform({rotate: '164rad'}), 'rotate(' + expectedDeg + 'deg)');
    });

    test('convertScale', function () {
      assert.equal(toTransform({scale: ''}), 'none');
      assert.equal(toTransform({scale: 'a'}), 'none');
      assert.equal(toTransform({scale: '2 a'}), 'none');
      assert.equal(toTransform({scale: '2 3 4 5'}), 'none');

      assert.equal(toTransform({scale: 'none'}), 'scale3d(1, 1, 1)');
      assert.equal(toTransform({scale: '2'}), 'scale3d(2, 1, 1)');
      assert.equal(toTransform({scale: '2 3'}), 'scale3d(2, 3, 1)');
      assert.equal(toTransform({scale: '2 3 4'}), 'scale3d(2, 3, 4)');
    });

    test('convertOffsetAnchorPosition', function () {
      var containerStyle = {
        position: 'absolute',
        left: '300px',
        top: '300px',
        width: '1000px',
        height: '1000px'
      };

      var targetStyle = {
        width: '100px',
        height: '100px',
        position: 'absolute',
        left: '500px',
        top: '500px',
        offsetPosition: '0% 100%',
        offsetAnchor: 'auto',
        offsetPath: 'none',
        transformOrigin: '30% 40%'
      };
      assertTransform(containerStyle, targetStyle, 'translate3d(-500px, 400px, 0px)');

      containerStyle['width'] = '2000px';
      targetStyle['height'] = '300px';
      targetStyle['width'] = '400px';
      targetStyle['left'] = '70px';
      targetStyle['top'] = '80px';
      targetStyle['offsetPosition'] = '100% 0%';
      assertTransform(containerStyle, targetStyle, 'translate3d(1530px, -80px, 0px)');

      targetStyle['offsetPosition'] = '60% 40%';
      targetStyle['offsetAnchor'] = '20% 30%';
      assertTransform(containerStyle, targetStyle, 'translate3d(1050px, 230px, 0px)');

      targetStyle['offsetPosition'] = 'auto';
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px)');

      targetStyle['offsetAnchor'] = '20% 30%';
      targetStyle['offsetRotate'] = '30deg';
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px) translate3d(-40px, -30px, 0px) rotate(30deg) translate3d(40px, 30px, 0px)');

      targetStyle['offsetAnchor'] = '55% 25%';
      targetStyle['offsetRotate'] = 'auto 90deg';
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px) translate3d(100px, -45px, 0px) rotate(90deg) translate3d(-100px, 45px, 0px)');

      targetStyle['offsetAnchor'] = '80% 80%';
      targetStyle['offsetRotate'] = 'reverse 70deg';
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px) translate3d(200px, 120px, 0px) rotate(250deg) translate3d(-200px, -120px, 0px)');

      targetStyle['offsetAnchor'] = 'auto';
      targetStyle['offsetRotate'] = '100deg';
      targetStyle['offsetPosition'] = '10% 90%';
      assertTransform(containerStyle, targetStyle, 'translate3d(90px, 550px, 0px) translate3d(-80px, 150px, 0px) rotate(100deg) translate3d(80px, -150px, 0px)');

      targetStyle['offsetPosition'] = 'garbage';
      targetStyle['offsetRotate'] = null;
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 0px, 0px)');

      // offset-anchor will be set to auto
      targetStyle['offsetPosition'] = '55% 72%';
      targetStyle['offsetAnchor'] = 'garbage';
      assertTransform(containerStyle, targetStyle, 'translate3d(810px, 424px, 0px)');

      targetStyle['offsetPosition'] = '20% 45px';
      targetStyle['offsetAnchor'] = '15% 30%';
      assertTransform(containerStyle, targetStyle, 'translate3d(270px, -125px, 0px)');

      targetStyle['offsetPosition'] = '70% 12px';
      targetStyle['offsetAnchor'] = '15px 60%';
      assertTransform(containerStyle, targetStyle, 'translate3d(1315px, -248px, 0px)');
    });

    test('offsetRotate', function () {
      assert.equal(toTransform({offsetRotate: '20 10', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px)');
      assert.equal(toTransform({offsetRotate: '', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px)');
      assert.equal(toTransform({offsetRotate: 'garbage', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px)');
      assert.equal(toTransform({offsetRotate: '300degrees', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px)');
      assert.equal(toTransform({offsetRotate: 'threedegrees', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px)');
      assert.equal(toTransform({offsetRotate: '10 hello 20 30deg', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px)');
      assert.equal(toTransform({offsetRotate: 'garbagedeg', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px)');
      assert.equal(toTransform({offsetRotate: '100deg'}), 'none'); // no path specified

      var expectedDeg = 100 * (180 / Math.PI);
      assert.equal(toTransform({offsetRotate: '100rad', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px) rotate(' + expectedDeg + 'deg)');
      assert.equal(toTransform({offsetRotate: '15turn', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px) rotate(5400deg)');
      assert.equal(toTransform({offsetRotate: '200deg', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px) rotate(200deg)');
      assert.equal(toTransform({offsetRotate: '20grad', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px) rotate(18deg)');
      expectedDeg = 164 * (180 / Math.PI);
      assert.equal(toTransform({offsetRotate: '164rad', offsetPath: 'ray(90deg)'}), 'translate3d(0px, 0px, 0px) rotate(' + expectedDeg + 'deg)');
    });

    test('rayLength', function () {
      var containerStyle = {
        position: 'absolute',
        left: '300px',
        top: '300px',
        width: '500px',
        height: '500px'
      };

      var targetStyle = {
        width: '100px',
        height: '100px',
        position: 'absolute',
        left: '350px',
        top: '200px',
        offsetPosition: '80% 50%',
        offsetPath: 'ray(90deg closest-side)',
        offsetDistance: '100%'
      };
      assertTransform(containerStyle, targetStyle, 'translate3d(100px, 0px, 0px)');

      targetStyle['offsetPosition'] = '0% 100%';
      targetStyle['offsetAnchor'] = 'auto';
      targetStyle['offsetPath'] = 'ray(farthest-corner 45deg)';
      assertTransform(containerStyle, targetStyle, 'translate3d(100px, -250px, 0px) rotate(-45deg)');

      targetStyle['offsetPosition'] = '60% 40%';
      targetStyle['offsetAnchor'] = '20% 30%';
      targetStyle['offsetPath'] = 'ray(farthest-side 30deg)';
      assertTransform(containerStyle, targetStyle, 'translate3d(80px, -289.81px, 0px) translate3d(-30px, -20px, 0px) rotate(-60deg) translate3d(30px, 20px, 0px)');

      targetStyle['offsetPath'] = 'ray(closest-corner 135deg)';
      targetStyle['offsetAnchor'] = 'auto';
      assertTransform(containerStyle, targetStyle, 'translate3d(100px, 150px, 0px) rotate(45deg)');
    });

    test('offsetRotateAuto', function () {
      var containerStyle = {
        position: 'absolute',
        left: '300px',
        top: '300px',
        width: '500px',
        height: '500px'
      };

      var targetStyle = {
        width: '100px',
        height: '100px',
        position: 'absolute',
        left: '350px',
        top: '200px',
        offsetPosition: '80% 50%',
        offsetPath: 'ray(180deg closest-side)',
        offsetDistance: '100%',
        offsetRotate: 'auto 45deg'
      };
      assertTransform(containerStyle, targetStyle, 'translate3d(0px, 100px, 0px) rotate(135deg)');

      targetStyle['offsetPosition'] = '0% 100%';
      targetStyle['offsetAnchor'] = 'auto';
      targetStyle['offsetPath'] = 'ray(farthest-corner 45deg)';
      assertTransform(containerStyle, targetStyle, 'translate3d(100px, -250px, 0px)');

      targetStyle['offsetPosition'] = 'auto';
      targetStyle['offsetAnchor'] = 'auto';
      targetStyle['offsetPath'] = "path('m 0 0 L 300 300')";
      assertTransform(containerStyle, targetStyle, 'translate3d(300px, 300px, 0px) rotate(90deg)');
    });
  });
})();
