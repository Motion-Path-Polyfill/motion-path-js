/* global suite test assert internalScope */
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
        'background-color': 'yellow',
        width: '1000px',
        height: '1000px'
      };

      var targetStyle = {
        width: '100px',
        height: '100px',
        position: 'absolute',
        left: '500px',
        top: '500px',
        'background-color': 'purple',
        'offset-position': '0% 100%',
        'offset-anchor': 'auto'
      };
      assertTransform(containerStyle, targetStyle, 'translate3d(-500px, 400px, 0px)');

      containerStyle['width'] = '2000px';
      targetStyle['height'] = '300px';
      targetStyle['width'] = '400px';
      targetStyle['left'] = '70px';
      targetStyle['top'] = '80px';
      targetStyle['offset-position'] = '100% 0%';
      assertTransform(containerStyle, targetStyle, 'translate3d(1530px, -80px, 0px)');

      targetStyle['offset-position'] = '60% 40%';
      targetStyle['offset-anchor'] = '20% 30%';
      assertTransform(containerStyle, targetStyle, 'translate3d(1050px, 230px, 0px)');

      targetStyle['offset-position'] = 'auto';
      assertTransform(containerStyle, targetStyle, 'none');

      targetStyle['offset-position'] = 'garbage';
      assertTransform(containerStyle, targetStyle, 'none');

      targetStyle['offset-position'] = '55% 72%';
      targetStyle['offset-anchor'] = 'garbage';
      assertTransform(containerStyle, targetStyle, 'translate3d(810px, 424px, 0px)');
    });
  });
})();
