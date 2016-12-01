/* global suite test assert toTransform InvalidArgument */

suite('toTransform', function () {
  test('testTranslate', function () {
    assert.throws(function () {
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
    }, InvalidArgument);

    assert.equal(toTransform({translate: 'none'}), '');
    // assert.equal(toTransform({translate: '50px'}), 'translate(50px)');
    // assert.equal(toTransform({translate: '20px 30px'}), 'translate(20px, 30px)');
    // assert.equal(toTransform({translate: '20px 30px 90px'}), 'translate(20px, 30px, 90px)');
  });
});
