var request = require('supertest')('http://localhost:8000');
var should = require('should');

// Tests integration of the application.
describe('Integration', function() {
	console.log("IMPORTANT: Integration tests require the app to be running on your localhost:8000")
	// Checks to see if the page is live and accessible.
	it('page exists', function(done){
		request
		.get('/api/studentRecord/')
		.expect(200, done);
	});
	// Checks to make sure that the page is returning something in json format.
	it('returns json', function(done){
		request
		.get('/api/studentRecord/')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done)
	})
	// Checks to make sure that the fields are there and correct.
	it('all fields are present', function(done){
		request
			.get('/api/studentRecord?sid=2')
			.expect(200)
			.expect(isValidStudent)
			.end(done)
	})
});

// This function is used to make sure that the information from the database
// is the same as what we were expecting to see.
var isValidStudent = function(res) {
	res.body.firstName.should.equal("Cassie")
	res.body.lastName.should.equal("Corey")
}