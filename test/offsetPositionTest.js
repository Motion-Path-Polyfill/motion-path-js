/* global assert suite test internalScope */
'use strict';

(function () {
  suite('transforms', function () {
    test('offsetPosition', function () {
      var assertOffsetInterpolation = internalScope.assertOffsetInterpolation;

      assertOffsetInterpolation({
        property: 'offsetPosition',
        from: '10% 20%',
        to: '60% 40%'
      }, [
        {at: 0, is: '10% 20%'},
        {at: 0.3, is: '25% 26%'},
        {at: 0.6, is: '40% 32%'},
        {at: 1, is: '60% 40%'}
      ]);

      assertOffsetInterpolation({
        property: 'offsetPosition',
        from: 'auto',
        to: '80% 30%'
      }, [
        {at: 0, is: 'auto'},
        {at: 0.3, is: 'auto'},
        {at: 0.6, is: '80% 30%'},
        {at: 1, is: '80% 30%'}
      ]);

      assertOffsetInterpolation({
        property: 'offsetPosition',
        from: '15% 73%',
        to: 'auto'
      }, [
        {at: 0, is: '15% 73%'},
        {at: 0.3, is: '15% 73%'},
        {at: 0.6, is: 'auto'},
        {at: 1, is: 'auto'}
      ]);

      assertOffsetInterpolation({
        property: 'offsetPosition',
        from: 'auto',
        to: 'auto'
      }, [
        {at: 0, is: 'auto'},
        {at: 0.3, is: 'auto'},
        {at: 0.6, is: 'auto'},
        {at: 1, is: 'auto'}
      ]);

      assertOffsetInterpolation({
        property: 'offsetPosition',
        from: '20px 50%',
        to: '30% 40px'
      }, [
        {at: 0, is: '20px 50%'},
        {at: 0.3, is: '20px 50%'},
        {at: 0.6, is: '30% 40px'},
        {at: 1, is: '30% 40px'}
      ]);

      assertOffsetInterpolation({
        property: 'offsetPosition',
        from: '20px 50%',
        to: '30px 40%'
      }, [
        {at: 0, is: '20px 50%'},
        {at: 0.3, is: '23px 47%'},
        {at: 0.6, is: '26px 44%'},
        {at: 1, is: '30px 40%'}
      ]);

      assert.equal(internalScope.offsetPositionAnchorParse('garbage% pants%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('garbage pants'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('30% 40% 60%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('%'), undefined);
    });
  });
})();
