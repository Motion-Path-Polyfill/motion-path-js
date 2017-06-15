/* global suite test assert internalScope */
'use strict';

(function () {
  suite('rayLength', function () {
    test('rayLength', function () {
      var getRayLength = internalScope.getRayLength;
      var epsilon = 1e-12;
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

      assert.equal(getRayLength('sides', 20, 20, 10, 20, 0), 0);
      assert.equal(getRayLength('sides', 20, 20, 0, 10, 90), 0);
      assert.equal(getRayLength('sides', 20, 20, 10, 0, 180), 0);
      assert.equal(getRayLength('sides', 20, 20, 20, 10, 270), 0);

      assert.equal(getRayLength('sides', 260, 280, 120, 130, 0), 130);
      assert.closeTo(getRayLength('sides', 260, 280, 120, 130, 45), 130 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 260, 280, 120, 130, 90), 140);
      assert.closeTo(getRayLength('sides', 260, 280, 120, 130, 135), 140 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 260, 280, 120, 130, 180), 150);
      assert.closeTo(getRayLength('sides', 260, 280, 120, 130, 225), 120 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 260, 280, 120, 130, 270), 120);
      assert.closeTo(getRayLength('sides', 260, 280, 120, 130, 315), 120 * Math.sqrt(2), epsilon);

      assert.equal(getRayLength('sides', 280, 260, 150, 120, 0), 120);
      assert.closeTo(getRayLength('sides', 280, 260, 150, 120, 45), 120 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 280, 260, 150, 120, 90), 130);
      assert.closeTo(getRayLength('sides', 280, 260, 150, 120, 135), 130 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 280, 260, 150, 120, 180), 140);
      assert.closeTo(getRayLength('sides', 280, 260, 150, 120, 225), 140 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 280, 260, 150, 120, 270), 150);
      assert.closeTo(getRayLength('sides', 280, 260, 150, 120, 315), 120 * Math.sqrt(2), epsilon);

      assert.equal(getRayLength('sides', 260, 280, 140, 150, 0), 150);
      assert.closeTo(getRayLength('sides', 260, 280, 140, 150, 45), 120 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 260, 280, 140, 150, 90), 120);
      assert.closeTo(getRayLength('sides', 260, 280, 140, 150, 135), 120 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 260, 280, 140, 150, 180), 130);
      assert.closeTo(getRayLength('sides', 260, 280, 140, 150, 225), 130 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 260, 280, 140, 150, 270), 140);
      assert.closeTo(getRayLength('sides', 260, 280, 140, 150, 315), 140 * Math.sqrt(2), epsilon);

      assert.equal(getRayLength('sides', 280, 260, 130, 140, 0), 140);
      assert.closeTo(getRayLength('sides', 280, 260, 130, 140, 45), 140 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 280, 260, 130, 140, 90), 150);
      assert.closeTo(getRayLength('sides', 280, 260, 130, 140, 135), 120 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 280, 260, 130, 140, 180), 120);
      assert.closeTo(getRayLength('sides', 280, 260, 130, 140, 225), 120 * Math.sqrt(2), epsilon);
      assert.equal(getRayLength('sides', 280, 260, 130, 140, 270), 130);
      assert.closeTo(getRayLength('sides', 280, 260, 130, 140, 315), 130 * Math.sqrt(2), epsilon);

      assert.closeTo(getRayLength('sides', 108, 115, 100, 15, 30), 16, epsilon);
      assert.closeTo(getRayLength('sides', 109, 115, 100, 15, 30), 10 * Math.sqrt(3), epsilon);
      assert.closeTo(getRayLength('sides', 115, 108, 100, 8, 60), 16, epsilon);
      assert.closeTo(getRayLength('sides', 115, 109, 100, 9, 60), 10 * Math.sqrt(3), epsilon);
      assert.closeTo(getRayLength('sides', 115, 108, 100, 100, 120), 16, epsilon);
      assert.closeTo(getRayLength('sides', 115, 109, 100, 100, 120), 10 * Math.sqrt(3), epsilon);
      assert.closeTo(getRayLength('sides', 108, 115, 100, 100, 150), 16, epsilon);
      assert.closeTo(getRayLength('sides', 109, 115, 100, 100, 150), 10 * Math.sqrt(3), epsilon);
      assert.closeTo(getRayLength('sides', 108, 115, 8, 100, 210), 16, epsilon);
      assert.closeTo(getRayLength('sides', 109, 115, 9, 100, 210), 10 * Math.sqrt(3), epsilon);
      assert.closeTo(getRayLength('sides', 115, 108, 15, 100, 240), 16, epsilon);
      assert.closeTo(getRayLength('sides', 115, 109, 15, 100, 240), 10 * Math.sqrt(3), epsilon);
      assert.closeTo(getRayLength('sides', 115, 108, 15, 8, 300), 16, epsilon);
      assert.closeTo(getRayLength('sides', 115, 109, 15, 9, 300), 10 * Math.sqrt(3), epsilon);
      assert.closeTo(getRayLength('sides', 108, 115, 8, 15, 330), 16, epsilon);
      assert.closeTo(getRayLength('sides', 109, 115, 9, 15, 330), 10 * Math.sqrt(3), epsilon);
    });
  });
})();
