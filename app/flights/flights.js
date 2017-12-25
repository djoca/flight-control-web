'use strict';

angular.module('flightControlApp.flights', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flights', {
    templateUrl: 'flights/index.html',
    controller: 'flightsController'
  });
}])

.controller('flightsController', [function() {

}]);