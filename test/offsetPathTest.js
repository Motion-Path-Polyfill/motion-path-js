/* global suite test assert internalScope */
'use strict';

(function () {
  suite('offsetPath', function () {
    test('offsetPath', function () {
      var assertOffsetInterpolation = internalScope.assertOffsetInterpolation;
      var assertNoInterpolation = internalScope.assertNoInterpolation;

      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(100deg)',
        to: 'ray(-100deg)'
      }, [
        {at: 0, is: 'ray(100deg)'},
        {at: 0.25, is: 'ray(50deg)'},
        {at: 0.75, is: 'ray(-50deg)'},
        {at: 1, is: 'ray(-100deg)'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(100deg contain)',
        to: 'ray(-100deg contain)'
      }, [
        {at: 0, is: 'ray(100deg contain)'},
        {at: 0.25, is: 'ray(50deg contain)'},
        {at: 0.75, is: 'ray(-50deg contain)'},
        {at: 1, is: 'ray(-100deg contain)'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(farthest-side 100deg contain)',
        to: 'ray(farthest-side -100deg contain)'
      }, [
        {at: 0, is: 'ray(farthest-side 100deg contain)'},
        {at: 0.25, is: 'ray(50deg farthest-side contain)'},
        {at: 0.75, is: 'ray(-50deg farthest-side contain)'},
        {at: 1, is: 'ray(farthest-side -100deg contain)'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(contain 100deg closest-side)',
        to: 'ray(contain -100deg closest-side)'
      }, [
        {at: 0, is: 'ray(contain 100deg closest-side)'},
        {at: 0.25, is: 'ray(50deg closest-side contain)'},
        {at: 0.75, is: 'ray(-50deg closest-side contain)'},
        {at: 1, is: 'ray(contain -100deg closest-side)'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(100deg closest-corner)',
        to: 'ray(-100deg closest-corner)'
      }, [
        {at: 0, is: 'ray(100deg closest-corner)'},
        {at: 0.25, is: 'ray(50deg closest-corner)'},
        {at: 0.75, is: 'ray(-50deg closest-corner)'},
        {at: 1, is: 'ray(-100deg closest-corner)'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(100deg farthest-corner)',
        to: 'ray(-100deg farthest-corner)'
      }, [
        {at: 0, is: 'ray(100deg farthest-corner)'},
        {at: 0.25, is: 'ray(50deg farthest-corner)'},
        {at: 0.75, is: 'ray(-50deg farthest-corner)'},
        {at: 1, is: 'ray(-100deg farthest-corner)'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(0deg farthest-side)',
        to: 'ray(20deg farthest-side)'
      }, [
        {at: 0, is: 'ray(0deg farthest-side)'},
        {at: 0.25, is: 'ray(5deg farthest-side)'},
        {at: 0.75, is: 'ray(15deg farthest-side)'},
        {at: 1, is: 'ray(20deg farthest-side)'}
      ]);

      assertOffsetInterpolation({
        property: 'offset-path',
        from: 'ray(0deg farthest-side)',
        to: 'ray(20deg farthest-side)'
      }, [
        {at: 0, is: 'ray(0deg farthest-side)'},
        {at: 0.25, is: 'ray(5deg farthest-side)'},
        {at: 0.75, is: 'ray(15deg farthest-side)'},
        {at: 1, is: 'ray(20deg farthest-side)'}
      ]);

      // TODO: Make this interpolate
      assertNoInterpolation({
        property: 'offset-path',
        from: "path('m 0 0 h 100')",
        to: "path('m 0 0 h 200')"
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: 'none',
        to: 'ray(180deg)'
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: 'ray(180deg)',
        to: 'none'
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: 'ray(100deg farthest-corner)',
        to: 'ray(-100deg closest-corner)'
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: 'ray(100deg farthest-side contain)',
        to: 'ray(-100deg closest-corner)'
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: 'ray(100deg contain)',
        to: 'ray(-100deg)'
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: 'ray(0deg contain contain farthest-side closest-side 50deg 90deg)',
        to: 'ray(10deg contain contain farthest-side closest-side 60deg 100deg)'
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: 'ray(0deg garbage)',
        to: 'ray(10deg contain)'
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: "path('m 0 0 h 100')",
        to: 'ray(10deg contain)'
      });

      assertNoInterpolation({
        property: 'offset-path',
        from: 'ray(farthest-side closest-side 0deg)',
        to: 'ray(farthest-side closest-side 20deg)'
      });

      assert.equal(internalScope.offsetRotateParse('ray(garbage)'), undefined);
      assert.equal(internalScope.offsetRotateParse('ray(garbagedeg)'), undefined);
      assert.equal(internalScope.offsetRotateParse('ray(deg)'), undefined);
    });
  });
})();
