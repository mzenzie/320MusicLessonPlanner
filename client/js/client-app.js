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
		var StudentRecord = $resource('/api/studentRecord');

		StudentRecord.query(function (result) {
			$scope.students = result;
		});

		$scope.students = [];
		$scope.createStudentRecord = function () {
			var newStudentRecord = new StudentRecord();
			newStudentRecord.firstName = $scope.firstName;
			newStudentRecord.lastName = $scope.lastName;
			newStudentRecord.instrument = $scope.instrument;
			newStudentRecord.email = $scope.email;
			newStudentRecord.address = $scope.address;
			newStudentRecord.startDate = $scope.startDate;
			newStudentRecord.startTime = $scope.startTime;
			newStudentRecord.$save(function (result){
				StudentRecord.query(function (result){
					$scope.students = result;
				});
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.instrument = '';
				$scope.email = '';
				$scope.address = '';
				$scope.startDate = '';
				$scope.startTime = '';
			});	

			// $scope.showModal = false;

			// $scope.toggleModal = function () {
			// 	$scope.showModal = !$scope.showModal;
			// };

			//Closes the modal window after adding new student record

			$('#addStudentForm').modal('hide');
		}
	}
	]);

// appClient.directive('modal', function (){
// 	return {
// 		template: '<div class="modal fade">' + 
// 		'<div class="modal-dialog">' + 
// 		'<div class="modal-content">' + 
// 		'<div class="modal-header">' + 
// 		'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
// 		'<h4 class="modal-title">{{ title }}</h4>' + 
// 		'</div>' + 
// 		'<div class="modal-body" ng-transclude></div>' + 
// 		'</div>' + 
// 		'</div>' + 
// 		'</div>',
// 		restrict: 'E',
// 		transclude: true,
// 		replace:true,
// 		scope:true,
// 		link: function postLink(scope, element, attrs) {
// 			scope.title = attrs.title;

// 			scope.$watch(attrs.visible, function(value){
// 				if(value == true)
// 					$(element).modal('show');
// 				else
// 					$(element).modal('hide');
// 			});

// 			$(element).on('shown.bs.modal', function(){
// 				scope.$apply(function(){
// 					scope.$parent[attrs.visible] = true;
// 				});
// 			});

// 			$(element).on('hidden.bs.modal', function(){
// 				scope.$apply(function(){
// 					scope.$parent[attrs.visible] = false;
// 				});
// 			});
// 		}
// 	};
// });