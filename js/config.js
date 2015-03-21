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

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider
        .otherwise("/index/main");


    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
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
        .state('index.calendar', {
            url: "/calendar",
            templateUrl: "views/calendar.html",
            data: { pageTitle: 'Calendar' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            files: ['css/plugins/fullcalendar/fullcalendar.css','js/plugins/fullcalendar/fullcalendar.min.js','js/plugins/fullcalendar/gcal.js']
                        },
                        {
                            name: 'ui.calendar',
                            files: ['js/plugins/fullcalendar/calendar.js']
                        }
                    ]);
                }
            }
        })
        .state('pages', {
            abstract: true,
            url: "/pages",
            templateUrl: "views/common/content_top_navigation.html",
        })
        .state('pages.about', {
            url: "/about",
            templateUrl: "views/about.html",
            data: { pageTitle: 'About MusicLessonPlanner' }
        })
        .state('pages.support', {
            url: "/support",
            templateUrl: "views/support.html",
            data: { pageTitle: 'MusicLessonPlanner Support' }
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
                    }, {
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
