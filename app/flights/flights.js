'use strict';

/*
 * Flight control module.
 */
var flightControlModule = angular.module('flightControlApp.flights', ['ngRoute']);

/*
 * Flight control API URL
 */
var apiUrl = 'http://localhost:8080';

/*
 * Flight control module configuration.
 * Defines routing, template and controller.
 */
flightControlModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flights', {
    templateUrl: 'flights/index.html',
    controller: 'flightsController'
  });
}]);

/*
 * Flight control module controller.
 */
flightControlModule.controller('flightsController', ['$http', '$scope', function($http, $scope) {

  var showErrorMessage = function() {
    $scope.error = "Server unreacheable";
  }

  $scope.loadFlight = function (flightId) {
    $http
      .get(apiUrl + '/flights/' + flightId)
      .then(function(response) {
        $scope.flightDetails = response.data;
      }, function(error) {
        showErrorMessage();
      });
  }

  $http
    .get(apiUrl + '/flights')
    .then(function(response) {
      $scope.flights = response.data;
    }, function(error) {
        showErrorMessage();
    });

}]);