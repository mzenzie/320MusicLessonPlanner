/**
<<<<<<< HEAD
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, jwtInterceptorProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/index/main");

    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token'); //storage field = 'token'
    }
    $httpProvider.interceptors.push('jwtInterceptor');

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            controller: 'signoutController',
            templateUrl: "views/common/content_top_navigation.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/startPageView.html",
            controller: studentRecordController,
            data: {
                pageTitle: 'Teacher Dashboard',
                requiresLogin: true
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'datePicker',
                        files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/datePicker.js']
                    }]);
                }
            }
        })
        .state('index.studentRecordViewPage', {
            url: "/studentRecordPageView",
            templateUrl: "views/studentRecordPageView.html",
            controller: studentRecordController,
            data: {
                pageTitle: 'Student Records',
                requiresLogin: true
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'datePicker',
                        files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/datePicker.js']
                    }]);
                }
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'summernote',
                        files: ['css/plugins/summernote/summernote.css', 'css/plugins/summernote/summernote-bs3.css', 'js/plugins/summernote/summernote.min.js', 'js/plugins/summernote/angular-summernote.min.js']
                    }]);
                }
            }
        })
        .state('index.lessonNoteViewPage', {
            url: "/lessonNotePageView",
            templateUrl: "views/lessonNotePageView.html",
            data: {
                pageTitle: 'Lesson Notes',
                requiresLogin: true
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'summernote',
                        files: ['css/plugins/summernote/summernote.css', 'css/plugins/summernote/summernote-bs3.css', 'js/plugins/summernote/summernote.min.js', 'js/plugins/summernote/angular-summernote.min.js']
                    }]);
                }
            }
        })
        .state('signin', {
            url: '/signin',
            controller: 'signinController',
            templateUrl: 'login.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'register.html',
            controller: 'signupController'
        });
}

angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state, store, jwtHelper, $location) {
        $rootScope.$state = $state;
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            if (toState.data && toState.data.requiresLogin) {
                if (!store.get('token')) {
                    e.preventDefault();
                    $state.go('signin');
                }
            }
        });
    })
    .controller('AppController', function($scope, $location) {
        $scope.$on('$stateChangeSuccess', function(e, nextRoute) {});
    });
