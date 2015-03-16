/**
 * MusicLessonPlanner
 * @author Team MLP
 */

/**
 * Client AngularJS Web Application
 */


 var appClient = angular.module("musicLessonPlanner", ['ngResource', 'ngRoute', 'ngAnimate']);

/**
*	Configure the Routes
*/

appClient.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		// Start Page
		.when("/", {
			templateUrl: "/views/htmlViews/startPageView.html", 
			controller: "pageController"})
		// Student Record View
		.when("/studentRecordView", {
			templateUrl: "/views/htmlViews/studentRecordPageView.html", 
			controller: "pageController"})
		// Lesson Notes View
		.when("/lessonNoteView", {
			templateUrl: "/views/htmlViews/lessonNotePageView.html", 
			controller: "pageController"});
	}]);


appClient.controller('pageController', function (/* $scope, $location, $http */) {

});


appClient.controller('studentRecordController', ['$scope', '$resource', 
	function ($scope, $resource){
		var StudentRecord = $resource('/api/studentRecord/:id');

		StudentRecord.query(function (result) {
			$scope.students = result;
		});

		$scope.students = [];
		$scope.deleteStudentRecord = function(student){
			StudentRecord.delete({id:student.sid}, function(result){
				if (result.isSuccessful){
					var index = $scope.students.indexOf(student);
					$scope.students.splice(index, 1);
				}
			});

		};
		$scope.createStudentRecord = function () {
			var newStudentRecord = new StudentRecord();
			newStudentRecord.firstName = $scope.firstName;
			newStudentRecord.lastName = $scope.lastName;
			newStudentRecord.instrument = $scope.instrument;
			newStudentRecord.email = $scope.email;
			newStudentRecord.phone = $scope.phone;
			newStudentRecord.address = $scope.address;
			newStudentRecord.birthday = $scope.birthday;
			newStudentRecord.startDate = $scope.startDate;
			newStudentRecord.numberOfLessons = $scope.numberOfLessons;
			newStudentRecord.lessonTime = $scope.lessonTime;
			newStudentRecord.lessonLength = $scope.lessonLength;
			newStudentRecord.generalNotes = $scope.generalNotes;
			newStudentRecord.lessonNotes = $scope.lessonNotes;
			newStudentRecord.$save(function (result){
				StudentRecord.query(function (result){
					$scope.students = result;
				});
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.instrument = '';
				$scope.email = '';
				$scope.phone = '';
				$scope.address = '';
				$scope.birthday = '';
				$scope.startDate = '';
				$scope.numberOfLessons = '';
				$scope.lessonTime = '';
				$scope.lessonLength = '';
				$scope.generalNotes = '';
				$scope.lessonNotes = null;
			});	

			//Closes the modal window after adding new student record

			// $('#addStudentForm').modal('hide');
			$scope.$broadcast("REFRESH");
		}
	}
	]);

