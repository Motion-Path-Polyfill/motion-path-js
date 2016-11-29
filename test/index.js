suite("index", function() {
	test("hello", function() {
		chai.assert.equal(hello("a"), "Hello a!");
		chai.assert.equal(hello("b"), "Hello b!");
	}) 
})