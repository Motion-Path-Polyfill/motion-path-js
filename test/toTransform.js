/* global suite test assert internalScope */
(function () {
  var toTransform = internalScope.toTransform;

  suite('toTransform', function () {
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
  });
})();
