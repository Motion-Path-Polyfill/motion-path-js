/* global suite test chai toTransform */




suite('toTransform', function () {
  test('testTranslate', function () {
  	
  	assert.throws(function() {
  		toTransform = toTransform({translate: ''});
  	}, InvalidArgument);

  	assert.equal(toTransform({translate: 'none'}), '');
  	
  	assert.throws(function() {
  		toTransform = toTransform({translate: '20px 30px 27px 90px'});
  	}, InvalidArgument);

    chai.assert.equal(toTransform({translate: '20px 30px'}), 'translate(20px, 30px)');
 
  });
});
