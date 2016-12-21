/* global assert suite test */

function assertInterpolation (transformation, expectation) {
  var target = document.createElement('div');

  for (var {at, is} of expectation) {
    var timing = {duration: 1, fill: 'forwards'};
    var currentTime = at;

    var animation;
    if (transformation.property === 'translate') {
      animation = target.animate({translate: [transformation.from, transformation.to]}, timing);
    } else if (transformation.property === 'rotate') {
      animation = target.animate({rotate: [transformation.from, transformation.to]}, timing);
    } else if (transformation.property === 'scale') {
      animation = target.animate({scale: [transformation.from, transformation.to]}, timing);
    }

    animation.currentTime = currentTime;
    var result = target.style._getAnimated(transformation.property);

    animation.cancel();
    target.remove();

    assert.equal(result, is, 'For: ' + JSON.stringify(transformation) + ' at: ' + at + '\n');
  }
}

suite('transforms', function () {
  test('interpolation', function () {
    assertInterpolation({
      property: 'translate',
      from: '-100px 0px 0px',
      to: '100px 0px 0px'
    }, [
      {at: 0, is: '-100px 0px 0px'},
      {at: 0.25, is: '-50px 0px 0px'},
      {at: 0.75, is: '50px 0px 0px'},
      {at: 1, is: '100px 0px 0px'}
    ]);

    assertInterpolation({
      property: 'rotate',
      from: '100deg',
      to: '-100deg'
    }, [
      {at: 0, is: '100deg'},
      {at: 0.25, is: '50deg'},
      {at: 0.75, is: '-50deg'},
      {at: 1, is: '-100deg'}
    ]);

    assertInterpolation({
      property: 'scale',
      from: '-10 5 1',
      to: '10 -5 1'
    }, [
      {at: 0, is: '-10 5 1'},
      {at: 0.25, is: '-5 2.5 1'},
      {at: 0.75, is: '5 -2.5 1'},
      {at: 1, is: '10 -5 1'}
    ]);
  });
});
