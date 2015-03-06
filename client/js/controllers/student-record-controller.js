// appClient.controller('studentRecordController', ['$scope', '$resource', 
// 	function ($scope, $resource){
// 		var StudentRecord = $resource('/api/studentRecord');

// 		StudentRecord.query(function (result) {
// 			$scope.students = result;
// 		});

// 		$scope.students = [];
// 		$scope.createStudentRecord = function () {
// 			var newStudentRecord = new StudentRecord();
// 			newStudentRecord.firstName = $scope.firstName;
// 			newStudentRecord.lastName = $scope.lastName;
// 			newStudentRecord.instrument = $scope.instrument;
// 			newStudentRecord.email = $scope.email;
// 			newStudentRecord.address = $scope.address;
// 			newStudentRecord.startDate = $scope.startDate;
// 			newStudentRecord.lessonTime = $scope.lessonTime;
// 			newStudentRecord.$save(function (result){
// 				StudentRecord.query(function (result){
// 					$scope.students = result;
// 				});
// 				$scope.firstName = '';
// 				$scope.lastName = '';
// 				$scope.instrument = '';
// 				$scope.email = '';
// 				$scope.address = '';
// 				$scope.startDate = '';
// 				$scope.lessonTime = '';
// 			});	

// 			//Closes the modal window after adding new student record
				
// 			$('#addStudentForm').modal('hide');
// 		}
// 	}
// ]);

