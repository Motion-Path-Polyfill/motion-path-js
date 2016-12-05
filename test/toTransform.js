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


    assert.equal(toTransform({translate: 'none'}), 'none');
    assert.equal(toTransform({translate: '50px'}), 'translate(50px)');
    assert.equal(toTransform({translate: '20px 30px'}), 'translate(20px, 30px)');
    assert.equal(toTransform({translate: '20px 30px 90px'}), 'translate(20px, 30px, 90px)');
  });


  test('testRotate', function () {
    assert.throws(function () {
      toTransform({rotate: '20 10'});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({rotate: ''});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({rotate: 'garbage'});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({rotate: '300degrees'});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({rotate: 'threedegrees'});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({rotate: '10 hello 20 30deg'});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({rotate: 'garbagedeg'});
    }, InvalidArgument);

    assert.equal(toTransform({rotate: 'none'}), 'none');
    assert.equal(toTransform({rotate: '50 10 30 100rad'}), 'rotate(50, 10, 30, 100rad)');
    assert.equal(toTransform({rotate: '360turn'}), 'rotate(360turn)');
    assert.equal(toTransform({rotate: '200deg'}), 'rotate(200deg)');
    assert.equal(toTransform({rotate: '20grad'}), 'rotate(20grad)');
    assert.equal(toTransform({rotate: '164rad'}), 'rotate(164rad)');
  });

  test('testScale', function () {
    assert.throws(function () {
      toTransform({translate: ''});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({translate: 'a'});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({translate: '2 a'});
    }, InvalidArgument);

    assert.throws(function () {
      toTransform({translate: '2 3 4 5'});
    }, InvalidArgument);

    assert.equal(toTransform({translate: 'none'}), 'none');

    assert.equal(toTransform({scale: '2'}), 'scale(2)');
    assert.equal(toTransform({scale: '2 3'}), 'scale(2, 3)');
    assert.equal(toTransform({scale: '2 3 4'}), 'scale(2, 3, 4)');
  });
});
