'use strict';

angular.module('flightControlApp.flights', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flights', {
    templateUrl: 'flights/index.html',
    controller: 'flightsController'
  });
}])

.controller('flightsController', ['$http', '$scope', function($http, $scope) {

  $http.get('http://localhost:8080/flights')
    .then(function(response) {
      $scope.flights = response.data;
    });

}]);