/* Directives */

var linkDirective = angular.module('linkDirective', [])

linkDirective.directive('piLink', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/link.html'
    };
  });