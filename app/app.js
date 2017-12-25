'use strict';

angular.module('flightControlApp', [
  'ngRoute',
  'flightControlApp.flights'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/flights'});
}]);
