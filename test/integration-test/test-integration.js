var request = require('supertest')('http://localhost:8000');

describe('Integration', function() {
	it('page exists', function(done){
		request
		.get('/api/studentRecord/')
		.expect(200, done);
	});
	it('returns json', function(done){
		request
		.get('/api/studentRecord/')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done)
	})
});