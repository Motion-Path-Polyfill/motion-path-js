/* global suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetDistance', function () {
      var assertInterpolation = internalScope.assertInterpolation;

      assertInterpolation({
        property: 'offset-distance',
        from: '10px',
        to: '50px'
      }, [
        {at: 0, is: '10px'},
        {at: 0.3, is: '22px'},
        {at: 0.6, is: '34px'},
        {at: 1, is: '50px'}
      ]);

      assertInterpolation({
        property: 'offset-distance',
        from: '10%',
        to: '50%'
      }, [
        {at: 0, is: '10%'},
        {at: 0.3, is: '22%'},
        {at: 0.6, is: '34%'},
        {at: 1, is: '50%'}
      ]);

      assertInterpolation({
        property: 'offset-distance',
        from: '10%',
        to: '50px'
      }, [
        {at: 0, is: '10%'},
        {at: 0.3, is: '10%'},
        {at: 0.6, is: '50px'},
        {at: 1, is: '50px'}
      ]);
    });
  });
})();
