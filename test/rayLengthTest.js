/* global suite test assert internalScope */
'use strict';

(function () {
  suite('rayLength', function () {
    test('rayLength', function () {
      var getRayLength = internalScope.getRayLength;
      assert.equal(getRayLength('closest-corner', 500, 300, 240, 75), Math.sqrt(63225));
      assert.equal(getRayLength('closest-corner', 320, 665, -432, 876), Math.sqrt(231145));
      assert.equal(getRayLength('closest-corner', 100, 430, -550, -10), Math.sqrt(302600));
      assert.equal(getRayLength('closest-corner', 1000, 1000, 0, 1000), Math.sqrt(0));
      assert.equal(getRayLength('closest-corner', 1000, 1000, 500, 500), Math.sqrt(500000));

      assert.equal(getRayLength('farthest-corner', 1000, 700, 900, 400), Math.sqrt(970000));
      assert.equal(getRayLength('farthest-corner', 654, 765, 828, -633), Math.sqrt(2639988));
      assert.equal(getRayLength('farthest-corner', 250, 160, -100, -900), Math.sqrt(1246100));
      assert.equal(getRayLength('farthest-corner', 500, 500, 500, 0), Math.sqrt(500000));
      assert.equal(getRayLength('farthest-corner', 500, 500, 250, 250), Math.sqrt(125000));

      assert.equal(getRayLength('closest-side', 580, 20, 600, 490), 20);
      assert.equal(getRayLength('closest-side', 200, 200, -300, 50), 50);
      assert.equal(getRayLength('closest-side', 219, 732, -769, -874), 769);
      assert.equal(getRayLength('closest-side', 100, 200, 0, 0), 0);
      assert.equal(getRayLength('closest-side', 700, 700, 350, 350), 350);

      assert.equal(getRayLength('farthest-side', 580, 20, 600, 490), 600);
      assert.equal(getRayLength('farthest-side', 660, 320, 710, -890), 1210);
      assert.equal(getRayLength('farthest-side', 930, 529, -483, -853), 1413);
      assert.equal(getRayLength('farthest-side', 900, 300, 450, 150), 450);
      assert.equal(getRayLength('farthest-side', 500, 500, 250, 250), 250);
    });
  });
})();
