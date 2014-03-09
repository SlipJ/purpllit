/* Filters */

angular.module('linkListFilters', []).filter('buttonActive', function() {
  return function(input) {
    return input ? 'active' : '';
  };
});

angular.module('linkListFilters', []).filter('buttonDisabled', function() {
  return function(input) {
    return input ? 'disabled' : '';
  };
});