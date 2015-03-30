<<<<<<< HEAD

/**
 * UI-Router config file:
 *     Handles all links and routing to different views programmatically.
 *     UI-Router creates a nested set of states of the application.
 *
 */

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, jwtInterceptorProvider, $httpProvider) {

    /*
     *       If no other state is provided, the website defaults to this:
     */
    $urlRouterProvider.otherwise("/startpage/landing");

    /*
     *       ?? Looks for a stored token and directs as necessary??
     */
    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token'); //storage field = 'token'
    }
    $httpProvider.interceptors.push('jwtInterceptor');

    /*
     *    A config for the 'lazy loading' of plugins. 'Lazy loading' only loads plugins actively being used.
     */
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    /*
     *       State routing for the entire app
     */
    $stateProvider
        /*
        *   Root of the Teacher Dashboard, which is the logged-in pages.
         */
        .state('teacher-dashboard', {
            abstract: true,
            url: "/teacher-dashboard",
            templateUrl: "views/common/content.html",
            controller: loginCtrl
        })

        //  Main dashboard

            .state('teacher-dashboard.main', { // This is the url used in a ui-sref call (see html files)
                url: "/main",
                templateUrl: "views/startPageView.html", // assigns a template url file (partial html)
                /*
                 *       Controllers loaded in HTML
                 */
                data: { // This area handles some basic parameters
                    pageTitle: 'Teacher Dashboard',
                    requiresLogin: true
                }
            })

        //  Student Record Creation form page

            .state('teacher-dashboard.createStudentRecord', {
                url: "/createStudentRecord",
                templateUrl: "views/createStudentRecord.html",
                controller: StudentRecordCreationCrtl,
                data: {
                    pageTitle: 'Add New Student Record',
                    requiresLogin: true
                }
            })

        //  Individual Student Record view

            .state('teacher-dashboard.viewStudentRecord/:sid/:firstName/:lastName', {
                url: "/viewStudentRecord/:sid/:firstName/:lastName",
                templateUrl: "views/studentRecordPageView.html",
                /*
                 *       Controllers loaded in HTML
                 */
                data: {
                    pageTitle: "Student Record View:",
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

        //  Specific Lesson Note view

            .state('teacher-dashboard.lessonNoteViewPage', {
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

        //  Calendar view - LOGGED IN @TODO implement this.

            .state('teacher-dashboard.calendar', {
                url: "/calendar",
                templateUrl: "views/calendar.html",
                data: {
                    pageTitle: 'Calendar',
                    requiresLogin: true
                },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            insertBefore: '#loadBefore',
                            files: ['css/plugins/fullcalendar/fullcalendar.css', 'js/plugins/fullcalendar/fullcalendar.min.js', 'js/plugins/fullcalendar/gcal.js']
                        }, {
                            name: 'ui.calendar',
                            files: ['js/plugins/fullcalendar/calendar.js']
                        }]);
                    }
                }
            })

        //  About page (Logged in)

            .state('teacher-dashboard.about', {
                url: "/about",
                templateUrl: "views/about.html",
                data: {
                    pageTitle: 'About MusicLessonPlanner'
                }
            })

        //  Support page (Logged in)

            .state('teacher-dashboard.support', {
                url: "/support",
                templateUrl: "views/support.html",
                data: {
                    pageTitle: 'MusicLessonPlanner Support'
                }
            })
        /*
        *   Root of the Landing and Login pages, pages accesible without login
         */
        .state('startpage', {
            abstract: true,
            url: "/startpage",
            templateUrl: "views/common/start_page_navigation.html"
        })

        //  Log in/Landing page

            .state('startpage.landing', {
                url: "/landing",
                templateUrl: "views/login.html",
                controller: loginCtrl,
                data: {
                    pageTitle: "Welcome to MusicLessonPlanner"
                }
            })

        //  Account Creation page

            .state('startpage.register', {
                url: "/register",
                templateUrl: "views/register.html",
                controller: loginCtrl,
                data: {
                    pageTitle: "Welcome to MusicLessonPlanner"
                }
            })

        //  About page

            .state('startpage.about', {
                url: "/about",
                templateUrl: "views/about.html",
                data: {
                    pageTitle: 'About MusicLessonPlanner'
                }
            })

        //  Support page

            .state('startpage.support', {
                url: "/support",
                templateUrl: "views/support.html",
                data: {
                    pageTitle: 'MusicLessonPlanner Help & Support'
                }
            });

}

/*
*      This initializes the template module and assigns the above config.
 */
angular
    .module('inspinia')
    .config(config)

    //  Something may be wrong in here related to the Safari reload/login issue:
    .run(
        function($rootScope, $state, $stateParams, store, jwtHelper, $location) {
            $rootScope.$on('$stateChangeStart', function(e, toState) {
                if (toState.data && toState.data.requiresLogin) {
                    if (!store.get('token')) {
                        e.preventDefault();
                        $state.go('startpage.landing');
                    }
                }
            });
        }
    );
=======
/**
 * UI-Router config file:
 *     Handles all links and routing to different views programmatically.
 *     UI-Router creates a nested set of states of the application.
 *     The nesting for this app so far is a simple one:
 *     __________________________________________________________
 *         teacher-dashboard -> main teacher workspace (after login)
 *         |    teacher-dashboard.main
 *         |    teacher-dashboard.calendar
 *         startpage -> The pages that are accesible at first visit or after logout
 *         |    startpage.landing   (login for now)
 *         |    startpage.about
 *         |    startpage.support
 *         student -> Displayed when the teacher views an individual record, may nest this with teacher-dashboard
 *         |    student.viewStudentRecord
 *         |    student.lessonNoteView
 *
 *      * THIS IS ALL SUBJECT TO CHANGE
 *
 */

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, jwtInterceptorProvider, $httpProvider) {

    /*
    *       If no other state is provided, the website defaults to this:
     */
    $urlRouterProvider.otherwise("/startpage/landing");

    /*
    *       ?? Looks for a stored token and directs as necessary??
            JwtInterceptorProvider is an Interceptor - you can google angular inceptor for more details.
            What this JwtInterceptor does is for every request we make, we are appending to the header the field
            Authorization: Bearer <token> 
            so that the Server can verify this User and give permission to protected API if neccesary. 
     */
    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token'); //storage field = 'token'
    }
    $httpProvider.interceptors.push('jwtInterceptor');

    /*
    *    A config for the 'lazy loading' of plugins. 'Lazy loading' only loads plugins actively being used.
     */
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    /*
    *       State routing for the entire app
     */
    $stateProvider
        .state('teacher-dashboard', {
            abstract: true,
            url: "/teacher-dashboard",
            templateUrl: "views/common/content.html",
            controller: loginCtrl
        })
            .state('teacher-dashboard.main', {                  // This is the url used in a ui-sref call (see html files)
                url: "/main",
                templateUrl: "views/startPageView.html",        // assigns a template url file (partial html)
                controller: teacherController,            // loads the appropriate controller
                data: {                                         // This area handles some basic parameters
                    pageTitle: 'Teacher Dashboard',
                    // requiresLogin: true

                },
                resolve: {                                      // This area is important for loading plugins,
                    loadPlugin: function($ocLazyLoad) {         //  passing parameters, and resolving promises.
                        return $ocLazyLoad.load([{
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/datePicker.js']
                        }]);
                    }
                }
            })
            .state('teacher-dashboard.calendar', {
                url: "/calendar",
                templateUrl: "views/calendar.html",
                data: {
                    pageTitle: 'Calendar'
                    // requiresLogin: true
                },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            insertBefore: '#loadBefore',
                            files: ['css/plugins/fullcalendar/fullcalendar.css', 'js/plugins/fullcalendar/fullcalendar.min.js', 'js/plugins/fullcalendar/gcal.js']
                        }, {
                            name: 'ui.calendar',
                            files: ['js/plugins/fullcalendar/calendar.js']
                        }]);
                    }
                }
            })
            .state('teacher-dashboard.about', {
                url: "/about",
                templateUrl: "views/about.html",
                data: {
                    pageTitle: 'About MusicLessonPlanner'
                }
            })
            .state('teacher-dashboard.support', {
                url: "/support",
                templateUrl: "views/support.html",
                data: {
                    pageTitle: 'MusicLessonPlanner Support'
                }
            })
        .state('startpage', {
            abstract: true,
            url: "/startpage",
            templateUrl: "views/common/start_page_navigation.html"
        })
            .state('startpage.landing', {
                url: "/landing",
                templateUrl: "views/login.html",
                controller: loginCtrl,
                data: {
                    pageTitle: "Welcome to MusicLessonPlanner"
                }
            })
            .state('startpage.register', {
                url: "/register",
                templateUrl: "views/register.html",
                controller: loginCtrl,
                data: {
                    pageTitle: "Welcome to MusicLessonPlanner"
                }
            })
            .state('startpage.about', {
                url: "/about",
                templateUrl: "views/about.html",
                data: {
                    pageTitle: 'About MusicLessonPlanner'
                }
            })
            .state('startpage.support', {
                url: "/support",
                templateUrl: "views/support.html",
                data: {
                    pageTitle: 'MusicLessonPlanner Help & Support'
                }
            })
        .state('student', {
            abstract: true,
            url: "/student",
            templateUrl: "views/common/content.html",
            controller: loginCtrl
        })
            .state('student.viewStudentRecord', {
                url: "/viewStudentRecord/:lastName",
                templateUrl: "views/studentRecordPageView.html",
                controller: studentRecordController,
                data: {
                    pageTitle: 'Student Records'
                    // requiresLogin: true
                },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/datePicker.js', 'js/plugins/datapicker/datePickerUtils.js', 'js/plugins/datapicker/input.js']
                        }, {
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css', 'css/plugins/summernote/summernote-bs3.css', 'js/plugins/summernote/summernote.min.js', 'js/plugins/summernote/angular-summernote.min.js']
                        }]);
                    }

                }
            })
            .state('student.lessonNoteViewPage', {
                url: "/lessonNotePageView",
                templateUrl: "views/lessonNotePageView.html",
                data: {
                    pageTitle: 'Lesson Notes'
                    // requiresLogin: true

                },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css', 'css/plugins/summernote/summernote-bs3.css', 'js/plugins/summernote/summernote.min.js', 'js/plugins/summernote/angular-summernote.min.js']
                        }]);
                    }
                }
            });

}

angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state, store, jwtHelper, $location) {
        $rootScope.$state = $state;
        // $rootScope.$on('$stateChangeStart', function(e, toState) {
        //     if (toState.data && toState.data.requiresLogin) {
        //         if (!store.get('token')) {
        //             e.preventDefault();
        //             $state.go('startpage.landing');
        //         }
        //     }
        // });

    });

>>>>>>> ServerBranch
