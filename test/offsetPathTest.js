/* global suite test assert internalScope */
'use strict';

(function () {
  suite('offsetPath', function () {
    test('offsetPath', function () {
      var assertInterpolation = internalScope.assertInterpolation;
      var assertNoInterpolation = internalScope.assertNoInterpolation;

      assertInterpolation({
        property: 'offsetPath',
        from: 'ray(100deg closest-side)',
        to: 'ray(-100deg closest-side)'
      }, [
        {at: 0, is: 'ray(100deg closest-side)'},
        {at: 0.25, is: 'ray(50deg closest-side)'},
        {at: 0.75, is: 'ray(-50deg closest-side)'},
        {at: 1, is: 'ray(-100deg closest-side)'}
      ]);

      assertInterpolation({
        property: 'offsetPath',
        from: 'ray(100deg farthest-corner contain)',
        to: 'ray(-100deg farthest-corner contain)'
      }, [
        {at: 0, is: 'ray(100deg farthest-corner contain)'},
        {at: 0.25, is: 'ray(50deg farthest-corner contain)'},
        {at: 0.75, is: 'ray(-50deg farthest-corner contain)'},
        {at: 1, is: 'ray(-100deg farthest-corner contain)'}
      ]);

      assertInterpolation({
        property: 'offsetPath',
        from: 'ray(farthest-side 100deg contain)',
        to: 'ray(farthest-side -100deg contain)'
      }, [
        {at: 0, is: 'ray(farthest-side 100deg contain)'},
        {at: 0.25, is: 'ray(50deg farthest-side contain)'},
        {at: 0.75, is: 'ray(-50deg farthest-side contain)'},
        {at: 1, is: 'ray(farthest-side -100deg contain)'}
      ]);

      assertInterpolation({
        property: 'offsetPath',
        from: 'ray( contain 100deg closest-side)',
        to: 'ray(contain -100deg closest-side )'
      }, [
        {at: 0, is: 'ray( contain 100deg closest-side)'},
        {at: 0.25, is: 'ray(50deg closest-side contain)'},
        {at: 0.75, is: 'ray(-50deg closest-side contain)'},
        {at: 1, is: 'ray(contain -100deg closest-side )'}
      ]);

      assertInterpolation({
        property: 'offsetPath',
        from: 'ray(100deg closest-corner)',
        to: 'ray(-100deg closest-corner)'
      }, [
        {at: 0, is: 'ray(100deg closest-corner)'},
        {at: 0.25, is: 'ray(50deg closest-corner)'},
        {at: 0.75, is: 'ray(-50deg closest-corner)'},
        {at: 1, is: 'ray(-100deg closest-corner)'}
      ]);

      assertInterpolation({
        property: 'offsetPath',
        from: 'ray(100deg farthest-corner)',
        to: 'ray(-100deg farthest-corner)'
      }, [
        {at: 0, is: 'ray(100deg farthest-corner)'},
        {at: 0.25, is: 'ray(50deg farthest-corner)'},
        {at: 0.75, is: 'ray(-50deg farthest-corner)'},
        {at: 1, is: 'ray(-100deg farthest-corner)'}
      ]);

      assertInterpolation({
        property: 'offsetPath',
        from: 'ray(0deg farthest-side)',
        to: 'ray(20deg farthest-side)'
      }, [
        {at: 0, is: 'ray(0deg farthest-side)'},
        {at: 0.25, is: 'ray(5deg farthest-side)'},
        {at: 0.75, is: 'ray(15deg farthest-side)'},
        {at: 1, is: 'ray(20deg farthest-side)'}
      ]);

      assertInterpolation({
        property: 'offsetPath',
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
        property: 'offsetPath',
        from: "path('m 0 0 h 100')",
        to: "path('m 0 0 h 200')"
      });

      assertNoInterpolation({
        property: 'offsetPath',
        from: 'none',
        to: 'ray(180deg closest-side)'
      });

      assertNoInterpolation({
        property: 'offsetPath',
        from: 'ray(180deg farthest-side)',
        to: 'none'
      });

      assertNoInterpolation({
        property: 'offsetPath',
        from: 'ray(100deg farthest-corner)',
        to: 'ray(-100deg closest-corner)'
      });

      assertNoInterpolation({
        property: 'offsetPath',
        from: 'ray(100deg farthest-side contain)',
        to: 'ray(-100deg closest-corner)'
      });

      assertNoInterpolation({
        property: 'offsetPath',
        from: 'ray(100deg sides contain)',
        to: 'ray(-100deg sides)'
      });

      assertNoInterpolation({
        property: 'offsetPath',
        from: "path('m 0 0 h 100')",
        to: 'ray(10deg sides contain)'
      });

      assertNoInterpolation({
        property: 'offsetPath',
        from: 'ray(0deg farthest-side)',
        to: 'ray(20deg closest-side)'
      });

      assert.equal(internalScope.offsetPathParse('ray(garbage)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(garbagedeg)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(0deg garbage)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(deg)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(deg closest-side)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(0deg)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(closest-side)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(0deg closest-side 20deg)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(farthest-side closest-side 0deg)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(farthest-side closest-side 20deg)'), undefined);
      assert.equal(internalScope.offsetPathParse('ray(0deg contain contain farthest-side closest-side 50deg 90deg)'), undefined);
    });
  });
})();
