/**
 * MusicLessonPlanner
 * @author Team MLP
 */

/**
 * Client AngularJS Web Application
 */


var appClient = angular.module("musicLessonPlanner", ['ngResource', 'ngRoute']);

/**
*	Configure the Routes
*/

appClient.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		// Start Page
		.when("/", {templateUrl: "/views/htmlViews/startPageView.html", controller: "pageController"})
		// Student Record View
		.when("/studentRecordView", {templateUrl: "/views/htmlViews/studentRecordPageView.html", controller: "pageController"})
		// Lesson Notes View
		.when("/lessonNoteView", {templateUrl: "/views/htmlViews/lessonNotePageView.html", controller: "pageController"});
}]);


appClient.controller('pageController', function (/* $scope, $location, $http */) {

});