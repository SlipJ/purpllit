/* Services */

var linksServices = angular.module('linksListServices', ['ngResource']);

linksServices.factory('Link', ['$resource',
  function($resource){
    return $resource('data/links.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
