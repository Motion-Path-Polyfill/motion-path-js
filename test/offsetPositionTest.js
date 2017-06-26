/* global assert suite test internalScope */
'use strict';

(function () {
  suite('transforms', function () {
    test('offsetPosition', function () {
      var assertInterpolation = internalScope.assertInterpolation;

      assertInterpolation({
        property: 'offsetPosition',
        from: '10% 20%',
        to: '60% 40%'
      }, [
        {at: 0, is: '10% 20%'},
        {at: 0.3, is: '25% 26%'},
        {at: 0.6, is: '40% 32%'},
        {at: 1, is: '60% 40%'}
      ]);

      assertInterpolation({
        property: 'offsetPosition',
        from: 'auto',
        to: 'top 30% right 20%'
      }, [
        {at: 0, is: 'auto'},
        {at: 0.3, is: 'auto'},
        {at: 0.6, is: '80% 30%'},
        {at: 1, is: 'top 30% right 20%'}
      ]);

      assertInterpolation({
        property: 'offsetPosition',
        from: 'left 15% bottom 27%',
        to: 'auto'
      }, [
        {at: 0, is: 'left 15% bottom 27%'},
        {at: 0.3, is: '15% 73%'},
        {at: 0.6, is: 'auto'},
        {at: 1, is: 'auto'}
      ]);

      assertInterpolation({
        property: 'offsetPosition',
        from: 'auto',
        to: 'auto'
      }, [
        {at: 0, is: 'auto'},
        {at: 0.3, is: 'auto'},
        {at: 0.6, is: 'auto'},
        {at: 1, is: 'auto'}
      ]);

      assertInterpolation({
        property: 'offsetPosition',
        from: '20px 50%',
        to: 'right 70% top 40px'
      }, [
        {at: 0, is: '20px 50%'},
        {at: 0.3, is: '20px 50%'},
        {at: 0.6, is: '30% 40px'},
        {at: 1, is: 'right 70% top 40px'}
      ]);

      assertInterpolation({
        property: 'offsetPosition',
        from: '20px 50%',
        to: 'left 30px top 40%'
      }, [
        {at: 0, is: '20px 50%'},
        {at: 0.3, is: '23px 47%'},
        {at: 0.6, is: '26px 44%'},
        {at: 1, is: 'left 30px top 40%'}
      ]);

      assertInterpolation({
        property: 'offsetPosition',
        from: '40% bottom',
        to: 'right 20%'
      }, [
        {at: 0, is: '40% bottom'},
        {at: 0.3, is: '58% 76%'},
        {at: 0.6, is: '76% 52%'},
        {at: 1, is: 'right 20%'}
      ]);

      assertInterpolation({
        property: 'offsetPosition',
        from: 'top center',
        to: 'center left'
      }, [
        {at: 0, is: 'top center'},
        {at: 0.3, is: '35% 15%'},
        {at: 0.6, is: '20% 30%'},
        {at: 1, is: 'center left'}
      ]);

      assertInterpolation({
        property: 'offsetPosition',
        from: '  10% 20px',
        to: '60%  40px  '
      }, [
        {at: 0, is: '  10% 20px'},
        {at: 0.3, is: '25% 26px'},
        {at: 0.6, is: '40% 32px'},
        {at: 1, is: '60%  40px  '}
      ]);

      // Implicit calc values (100% - 1px) and (100% - 2px) are not supported.
      assert.equal(internalScope.offsetPositionAnchorParse('right 1px top 2%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('left 1% bottom 2px'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('(100% - 1px) (100% - 2px)'), undefined);

      assert.equal(internalScope.offsetPositionAnchorParse('garbage% pants%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('garbage pants'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('30% 40% 60%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('1px 2px 3px 4px 5px'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('center 1px top 2%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('left 1px center 2%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('top 1px bottom 2%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('left 1px right 2%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('left garbage top 4px'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('left 2% top garbage'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('top 4px right garbage'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('bottom garbage left 2%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('garbage 5% top 30px'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('right 5% garbage 30px'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('top 10px'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('bottom 20%'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('30px left'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('40% right'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('left right'), undefined);
      assert.equal(internalScope.offsetPositionAnchorParse('bottom bottom'), undefined);
    });
  });
})();
