/* global suite test assert internalScope */
(function () {
  var toTransform = internalScope.toTransform;

  suite('toTransform', function () {
    test('convertTranslate', function () {
/*      assert.throws(function () {
        toTransform({translate: ''});
      }, InvalidArgument);

      assert.throws(function () {
        toTransform({translate: '20px 30px 27px 90px'});
      }, InvalidArgument);

      assert.throws(function () {
        toTransform({translate: 'garbage'});
      }, InvalidArgument);

      assert.throws(function () {
        toTransform({translate: 'garbagepx'});
      }, InvalidArgument); */

      assert.equal(toTransform({translate: 'none'}), 'none');
      assert.equal(toTransform({translate: '50px'}), 'translate(50px)');
      assert.equal(toTransform({translate: '20px 30px'}), 'translate(20px, 30px)');
      assert.equal(toTransform({translate: '20px 30px 90px'}), 'translate(20px, 30px, 90px)');
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
      assert.equal(toTransform({rotate: '50 10 30 100rad'}), 'rotate3d(50, 10, 30, 100rad)');
      assert.equal(toTransform({rotate: '360turn'}), 'rotate(360turn)');
      assert.equal(toTransform({rotate: '200deg'}), 'rotate(200deg)');
      assert.equal(toTransform({rotate: '20grad'}), 'rotate(20grad)');
      assert.equal(toTransform({rotate: '164rad'}), 'rotate(164rad)');
    });

    test('convertScale', function () {
/*      assert.throws(function () {
        toTransform({scale: ''});
      }, InvalidArgument);

      assert.throws(function () {
        toTransform({scale: 'a'});
      }, InvalidArgument);

      assert.throws(function () {
        toTransform({scale: '2 a'});
      }, InvalidArgument);

      assert.throws(function () {
        toTransform({scale: '2 3 4 5'});
      }, InvalidArgument); */

      assert.equal(toTransform({scale: 'none'}), 'scale3d(1, 1, 1)');

      assert.equal(toTransform({scale: '2'}), 'scale3d(2, 1, 1)');
      assert.equal(toTransform({scale: '2 3'}), 'scale3d(2, 3, 1)');
      assert.equal(toTransform({scale: '2 3 4'}), 'scale3d(2, 3, 4)');
    });
  });
})();
