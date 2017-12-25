'use strict';

/*
 * Flight Control Web Application.
 */
var flightControlApp = angular.module('flightControlApp', [
  'ngRoute',
  'flightControlApp.flights'
]);

/*
 * Routing configuration.
 */
flightControlApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/flights'});
}]);
