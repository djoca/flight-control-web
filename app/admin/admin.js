'use strict';

/*
 * Admin module.
 */
var adminModule = angular.module('flightControlApp.admin', ['ngRoute']);

/*
 * Flight control API URL.
 */
var apiUrl = 'http://localhost:8080';

/*
 * Admin routing configuration.
 */
adminModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'admin/index.html',
    controller: 'adminController'
  });
}]);

/*
 * Admin controller.
 */
adminModule.controller('adminController', ['$http', '$scope', function($http, $scope) {

  /* Form object */
  $scope.form = {};

  /*
   * Show an error message.
   */
  var showErrorMessage = function(message) {
    $scope.error = message ? message : "Server unreachable";
    $('#errorModal').modal('show');
  }

  /*
   * Show a message
   */
  var showMessage = function(message) {
    $scope.message = message;
    $('#messageModal').modal('show');
  }

  /*
   * Create a flight
   */
  $scope.createFlight = function() {
    var data = {
        flightNumber: $scope.form.number,
        companyName: $scope.form.companyName,
        aircraft: { id: $scope.form.aircraft },
        pilot: { id: $scope.form.pilot },
        origin: { id: $scope.form.origin },
        destination: { id: $scope.form.destination },
        departureTime: $scope.form.departureTime
    };

    $http
      .post(apiUrl + '/flights', data)
      .then(function(response) {
        if (response.status == 201) {
          $scope.form = {};
          showMessage("Flight created");
        }
      }, function(error) {
        showErrorMessage(error.data ? error.data.message : null);
      });

  }

  /*
   * Load aircrafts
   */
  var loadAircrafts = function() {
    $http
      .get(apiUrl + '/aircrafts')
      .then(function(response) {
        $scope.aircrafts = response.data;
      }, function(error) {
        showErrorMessage();
      });
  }

  /*
   * Load airports
   */
  var loadAirports = function() {
    $http
      .get(apiUrl + '/airports')
      .then(function(response) {
        $scope.airports = response.data;
      }, function(error) {
        showErrorMessage();
      });
  }

  /*
   * Load pilots
   */
  var loadPilots = function() {
    $http
      .get(apiUrl + '/pilots')
      .then(function(response) {
        $scope.pilots = response.data;
      }, function(error) {
        showErrorMessage();
      });
  }

  /*
   * Populate components with values.
   */
  var loadComponents = function() {
	  loadAircrafts();
	  loadAirports();
	  loadPilots();
  }

  loadComponents();

}]);