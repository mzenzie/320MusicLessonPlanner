var assert = require('assert');
var dbConnector = require('./dbinit.js');
var fs = require('fs');
var stud_ctrl
var db = null;

var req1;
req.body = {
    firstname: "David",
    lastname: "Carlson",
    instrument: "Piano",
    email: "myEmail@gmail.com",
    phone: "774-999-9101",
    address: "10 Javascriptsucks Road",
    birthday: "10/10/2010",
    startDate: "10/10/2014",
    numberOfLessons: "10",
    lessonLength: "10 minutes",
};


// Constructor
function flushDB() {
    fs.unlink('./mlp.sql', function (err) {
        if (err) throw err;
        console.log('successfully deleted mlp.sql');
    });
    dbConnector.init();
    db = dbConnector.getInstance();
};

