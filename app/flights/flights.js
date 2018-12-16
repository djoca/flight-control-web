'use strict';

/*
 * Flight control module.
 */
var flightControlModule = angular.module('flightControlApp.flights', ['ngRoute']);

/*
 * Flight control API URL.
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

  /*
   * Show the 'Server unreacheable' message.
   */
  var showErrorMessage = function() {
    $('#errorModal').modal('show');
    $scope.error = "Server unreacheable";
  }

  /*
   * Load a flight defined by the param flightId.
   */
  $scope.loadFlight = function (flightId) {
    $http
      .get(apiUrl + '/flights/' + flightId)
      .then(function(response) {
        $scope.flightDetails = response.data;
      }, function(error) {
        showErrorMessage();
      });
  }

  /*
   * Load all flights.
   */
  var loadFlights = function() {
    $http
      .get(apiUrl + '/flights')
      .then(function(response) {
        $scope.flights = response.data;
      }, function(error) {
          showErrorMessage();
      });
  }

  loadFlights();

}]);