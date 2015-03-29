/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 */

/*
*	Pre-loads all modules
 */
(function () {
    angular.module('inspinia', [
        'ui.router',                    // Routing
        'ngResource',
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'angular-jwt',					// token authentication
        'angular-storage'				// token storage
    ])
})();
