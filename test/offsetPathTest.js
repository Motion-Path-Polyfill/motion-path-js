/* global suite test assert internalScope */

(function () {
  suite('offsetPath', function () {
    test('offsetPath', function () {
      var assertOffsetInterpolation = internalScope.assertOffsetInterpolation;
      var assertNoInterpolation = internalScope.assertNoInterpolation;

/*      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(100deg)',
        to: 'ray(-100deg)'
      }, [
        {at: 0, is: 'ray(100deg)'},
        {at: 0.25, is: 'ray(50deg)'},
        {at: 0.75, is: 'ray(-50deg)'},
        {at: 1, is: 'ray(-100deg)'}
      ]);*/

      assertNoInterpolation({
        property: 'offset-rotate',
        from: "path('m 0 0 h 100')",
        to: "path('m 0 0 h 200')"
      });

      assertNoInterpolation({
        property: 'offset-rotate',
        from: 'none',
        to: 'ray(180deg)'
      });

      assertNoInterpolation({
        property: 'offset-rotate',
        from: 'ray(180deg)',
        to: 'none'
      });

      assert.equal(internalScope.offsetRotateParse('ray(garbage)'), undefined);
      assert.equal(internalScope.offsetRotateParse('ray(garbagedeg)'), undefined);
      assert.equal(internalScope.offsetRotateParse('ray(deg)'), undefined);
    });
  });
})();
