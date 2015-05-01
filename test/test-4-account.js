var assert = require('assert');
var fs = require('fs');
var LessonSchedule = require('../server/model/lesson-schedule.js');
var StudentRecord = require('../server/model/student-record.js');
var Account = require('../server/model/account.js');
var format = require('string-format');
var dbConnector = require('../database/dbinit.js');
var util = require('./utility.js');
var jwt = require('jsonwebtoken');
var db = null;

var acc1 = {
	username: "acc1@gmail.com",
	password: "12341234",
	tid: 1
}

var acc2 = {
	username: "acc2@gmail.com",
	password: "43214321",
	tid: 2
}

describe('Test 4', function(){
	db=dbConnector.getInstance();
	assert(jwt!=null);
	assert(jwt!==undefined);
	describe('Account - [CRUD operations]', function(){
		it('should be able to SAVE new account', function(done){
			var account = new Account(acc1);
			assert(account.save!==undefined);
			account.save(function(err, account){
				assert(err==null);
				assert(account!=null);
				db.get("SELECT * FROM Account WHERE username='{0}'".format(acc1.username), function(err, acc){
					assert(err==null);
					assert(acc!=null);
					assert(acc.username==acc1.username);
					assert(acc.tid==acc1.tid);
					done();	
				});
			});
		});	

		it('should be able to GET account', function(done){
			Account.get(acc1.username, acc1.password, function(err, acc){
				assert(err==null);
				assert(acc!=null);
				assert(acc.username==acc1.username);
				assert(acc.tid == acc1.tid);
				done();
			});
		});

		it ('should already have account in database', function(done){
			Account.hasUsername(acc1.username, function(err, hasAccount){
				assert(hasAccount==true);
				assert(err==null);
				done();
			});
		});

		it ('should not already have account in database', function(done){
			Account.hasUsername(acc2.username, function(err, hasAccount){
				assert(hasAccount==false);
				assert(err==null);
				done();
			});
		});

		it ('should have encrypted password', function(done){
				Account.get(acc1.username, acc1.password, function(err, acc){
				assert(err==null);
				assert(acc!=null);
				assert(acc.password!=acc1.password);
				done();
			});
		}); 

		it ('should be able to retreive token', function(done){
			var auth = util.createToken(acc1.tid);
			var auth2 = util.createToken(acc2.tid);
			var tid = Account.getIDFromToken(auth);
			var tid2 = Account.getIDFromToken(auth2);
			assert(tid==acc1.tid);
			assert(tid2==acc2.tid);
			done();
		});

		it ('should not be able SAVE account', function(done){
			var account = new Account({username:undefined, password:undefined, tid:undefined});
			account.save(function(err, user){
				assert(err!=null);
				assert(user==null);
				done();
			});
		});

		it ('should not be able GET account', function(done){
			Account.get(undefined, undefined,function(err, user){
				// assert(err!=null);
				assert(user==null);
				done();
			});
		});

		it('shouldnt evaluate random token', function(){
            var token = Account.getIDFromToken("random string");
            assert(token==null);
        });
	});
});





