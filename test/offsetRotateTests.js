/* global suite test assert internalScope */

(function () {
  suite('transforms', function () {
    test('offsetRotate', function () {
      var assertOffsetInterpolation = internalScope.assertOffsetInterpolation;
      var assertNoInterpolation = internalScope.assertNoInterpolation;

      assertOffsetInterpolation({
        property: 'offset-rotate',
        from: '10deg',
        to: '50deg'
      }, [
        {at: 0, is: '10deg'},
        {at: 0.3, is: '22deg'},
        {at: 0.6, is: '34deg'},
        {at: 1, is: '50deg'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-rotate',
        from: 'auto 10deg',
        to: 'auto 50deg'
      }, [
        {at: 0, is: 'auto 10deg'},
        {at: 0.3, is: 'auto 22deg'},
        {at: 0.6, is: 'auto 34deg'},
        {at: 1, is: 'auto 50deg'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-rotate',
        from: 'reverse -170deg',
        to: 'reverse -130deg'
      }, [
        {at: 0.3, is: 'auto 22deg'},
        {at: 0.6, is: 'auto 34deg'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-rotate',
        from: 'auto 10deg',
        to: 'reverse -130deg'
      }, [
        {at: 0.3, is: 'auto 22deg'},
        {at: 0.6, is: 'auto 34deg'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-rotate',
        from: 'reverse -170deg',
        to: 'auto 50deg'
      }, [
        {at: 0.3, is: 'auto 22deg'},
        {at: 0.6, is: 'auto 34deg'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-rotate',
        from: 'auto 10deg',
        to: 'reverse -130deg'
      }, [
        {at: 0.3, is: 'auto 22deg'},
        {at: 0.6, is: 'auto 34deg'}
      ]);

      assertNoInterpolation({
        property: 'offset-rotate',
        from: 'auto 10deg',
        to: '180deg'
      });

      assert.equal(internalScope.offsetRotateParse('auto asdadeg'), undefined);
      assert.equal(internalScope.offsetRotateParse('auto reverse'), undefined);
      assert.equal(internalScope.offsetRotateParse('auto auto'), undefined);
      assert.equal(internalScope.offsetRotateParse('reverse reverse'), undefined);
      assert.equal(internalScope.offsetRotateParse('auto deg'), undefined);
      assert.equal(internalScope.offsetRotateParse('20deg 40deg'), undefined);
    });
  });
})();
