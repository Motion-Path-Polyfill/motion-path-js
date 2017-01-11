/* global assert suite test internalScope */

(function () {
  suite('transforms', function () {
    test('offsetDistance', function () {
      var assertInterpolation = internalScope.assertInterpolation;

      assertInterpolation({
        property: 'offset-distance',
        from: '10px',
        to: '50px'
      }, {
        property: 'offset-path',
        from: 'path(m 0 0 h 0 100 v 0 0)',
        to: 'path(m 0 0 h 0 200 v 0 0)'
      }, [
        {at: 0, is: '10px'},
        {at: 0.3, is: '22px'},
        {at: 0.6, is: '34px'},
        {at: 1, is: '50px'}
      ]);
    });
  });
})();
