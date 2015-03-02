function loadDB(){

    var fs = require('fs');
    var SQL = require('./sql.js');
    console.log(typeof(this.path));
    var fileBuffer = fs.readFileSync(this.path);
    this.db = new SQL.Database(fileBuffer);
}

function saveDB(){

    var fs = require('fs');
    var SQL = require('sql.js');

    var data = this.db.export()
    var buffer = newBuffer(data);
    fs.writeFileSync(this.path, buffer);
}


function execute(command){
    return this.db.exec(command);
}


function getDBManager(path){
    var DBManager = {path: path, db: null, loadDB: loadDB, saveDB: saveDB, execute: execute};
    return DBManager;
}

module.exports.getDBManager = getDBManager;
