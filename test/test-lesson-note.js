var assert = require('assert');
var app = require('../server/model/lesson-note.js'); // the module

describe('Lesson Note', function() {
	describe('create', function() {
		it('function exists', function() {
			assert.equal(typeof app.create, 'function');
		});
	});
	describe('get', function() {
		it('function exists', function() {
			assert.equal(typeof app.get, 'function');
		});
	});
	describe('list', function() {
		it('function exists', function() {
			assert.equal(typeof app.list, 'function');
		});
	});
	describe('delete', function() {
		it('function exists', function() {
			assert.equal(typeof app.delete, 'function');
		});
	});

});