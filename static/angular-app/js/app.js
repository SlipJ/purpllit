/* App Module */

var linkListApp = angular.module('linksListApp', [
    'ngRoute',
    'linksControllers',
    'linkListFilters',
    'linksListServices',
    'linkDirective'
]);

linkListApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/list', {
                templateUrl:'templates/links-list.html',
                controller: 'linksListCtrl'
            }).
            otherwise({
              redirectTo: '/'
            });
    }]);
