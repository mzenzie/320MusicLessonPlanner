/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider
        .otherwise("/index/main");
        // .otherwise("/login");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $stateProvider
        // .state('login', {
        //     url: "/login",
        //     templateUrl: "login.html",
        //     controller: "MainCtrl"
        // })
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content_top_navigation.html",
        })
            .state('index.main', {
                url: "/main",
                templateUrl: "views/startPageView.html",
                controller: studentRecordController,
                data: {
                    pageTitle: 'Teacher Dashboard'
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
                    pageTitle: 'Student Records'
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
                    pageTitle: 'Lesson Notes'
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
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
