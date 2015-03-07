var students = [
			{firstName: "Jess", lastName: "Hendricks", instrument: "Trombone"},
			{firstName: "Wolfgang", lastName: "Mozart", instrument: "Piano"},
			{firstName: "Terry", lastName: "Kath", instrument: "Guitar"}
		];

var StudentRecord = function(_firstName, _lastName, _instrument){
	var newStudent = [];
	console.log("new StudRec => " + _firstName + " " + _lastName + " " + _instrument);
	newStudent.push({firstName:_firstName, lastName:_lastName, instrument:_instrument});
	this.newStdnt = newStudent;
};

StudentRecord.prototype.create = function() {
	students = students.concat(this.newStdnt);
	students.sort(function(a, b){
		if (a.lastName > b.lastName) {
			return 1;
		};
		if (a.lastName < b.lastName) {
			return -1;
		};
		if (a.lastName == b.lastName) {
			if (a.firstName > b.firstName) {
				return 1;
			};
			if (a.firstName < b.firstName) {
				return -1;
			};
			if (a.firstName == b.firstName) {
				if (a.instrument > b.instrument) {
					return 1;
				};
				if (a.instrument < b.instrument) {
					return -1;
				};
			};
		};
		return 0;
	});
};

module.exports = StudentRecord;

module.exports.list = function(){
	return students;
};


//	OLD CODE
// var students = [
// 	{name: "Matt", instrument: "Basso Profundo Vocal Cord", date: "2/2"},
// 	{name: "Natcha", instrument: "Piano", date: "2/4"},
// 	{name: "Jess", instrument: "Piano", date: "2/9"}
// ];
// var students = [
// 	{name: "Matt", instrument: "Basso Profundo Vocal Cord"},
// 	{name: "Natcha", instrument: "Piano"},
// 	{name: "Jess", instrument: "Piano"}
// ];

// var StudentRecord = function(_name, _instru, _date, _interv){
// 	console.log("new StudRec => " + _name + " " + _instru + " " + _date + _interv);
// 	var newSched = [];
// 	var dateF = _date.split("/");
// 	var month = parseInt(dateF[0]);
// 	var day=  parseInt(dateF[1]);
// 	for(i = 0; i < _interv; i++){
// 		if (month > 12){
// 			month=1;
// 		}
// 		if (day > 30){
// 			month+=1;
// 			day = 1;
// 		}
// 		var newDate = month.toString()+"/"+day.toString();
// 		newSched.push({name:_name, instrument:_instru, date:newDate});
// 		day+=7;
// 	}
// 	this.sched = newSched;
// };



// StudentRecord.prototype.create = function(){

// 	students = students.concat(this.sched);
// 	// console.log(this.sched);
// 	students.sort(function(a, b){
// 		var d1 = a.date.split("/");
// 		var d2 = b.date.split("/");
// 		var _d1 = (parseInt(d1[0])*100)+parseInt(d1[1]);
// 		var _d2 = (parseInt(d2[0])*100)+parseInt(d2[1]);
// 		if(_d1>_d2){
// 			return 1;
// 		} 
// 		if (_d1<_d2){
// 			return -1;
// 		}
// 		return 0;
// 	});
// };

// module.exports = StudentRecord;



