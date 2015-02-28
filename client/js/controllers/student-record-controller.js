appClient.controller('studentRecordController', ['$scope', '$resource', function ($scope, $resource){
		var StudentRecord = $resource('/api/studentRecord');

		StudentRecord.query(function (result) {
			$scope.students = result;
		});

		$scope.students = [];

		$scope.createStudentRecord = function () {
			var newStudentRecord = new StudentRecord();
			newStudentRecord.firstName = $scope.studentFirstName;
			newStudentRecord.lastName = $scope.studentLastName;
			newStudentRecord.instrument = $scope.studentInstrument;
			newStudentRecord.$save(function (result){
				StudentRecord.query(function (result){
					$scope.students = result;
				});
				$scope.studentFirstName = '';
				$scope.studentLastName = '';
				$scope.studentInstrument = '';
			});	
			$('#addStudentForm').modal('hide');
		}
	}
]);

