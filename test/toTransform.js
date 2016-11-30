/* global suite test assert toTransform InvalidArgument */

suite('toTransform', function () {
  test('testTranslate', function () {
    assert.throws(function () {
      toTransform({translate: ''});
    }, InvalidArgument);

    assert.equal(toTransform({translate: 'none'}), '');

    assert.throws(function () {
      toTransform({translate: '20px 30px 27px 90px'});
    }, InvalidArgument);

    assert.equal(toTransform({translate: '20px 30px'}), 'translate(20px, 30px)');
  });
});
