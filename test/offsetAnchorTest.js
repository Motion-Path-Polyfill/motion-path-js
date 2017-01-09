/* global assert suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetAnchor', function () {
      var assertInterpolation = internalScope.assertInterpolation;

      assertInterpolation({
        property: 'offset-anchor',
        from: '10% 20%',
        to: '60% 40%'
      }, [
        {at: 0, is: '10% 20%'},
        {at: 0.3, is: '25% 26%'},
        {at: 0.6, is: '40% 32%'},
        {at: 1, is: '60% 40%'}
      ]);

      assertInterpolation({
        property: 'offset-anchor',
        from: 'auto',
        to: '80% 30%'
      }, [
        {at: 0, is: 'auto'},
        {at: 0.3, is: 'auto'},
        {at: 0.6, is: '80% 30%'},
        {at: 1, is: '80% 30%'}
      ]);

      assertInterpolation({
        property: 'offset-anchor',
        from: '15% 73%',
        to: 'auto'
      }, [
        {at: 0, is: '15% 73%'},
        {at: 0.3, is: '15% 73%'},
        {at: 0.6, is: 'auto'},
        {at: 1, is: 'auto'}
      ]);

      assertInterpolation({
        property: 'offset-anchor',
        from: 'auto',
        to: 'auto'
      }, [
        {at: 0, is: 'auto'},
        {at: 0.3, is: 'auto'},
        {at: 0.6, is: 'auto'},
        {at: 1, is: 'auto'}
      ]);

      assert.equal(internalScope.offsetPositionAnchorParse('garbage% pants%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('garbage pants'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('30% 40% 60%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('%'), undefined);
    });
  });
})();
