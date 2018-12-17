describe("flightsController", function() {

  beforeEach(module('flightControlApp.flights'));

  var $controller;
  var $rootScope;
  var $httpBackend;

  beforeEach(inject(function($injector){
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET','http://localhost:8080/flights').respond(200,
      [{"id":1,"flightNumber":123,"companyName":"Azul","origin":"SJK","destination":"BSB","flightStatus":"FLYING","departureTime":"21/12/2017 18:25","arrivalTime":null},{"id":2,"flightNumber":300,"companyName":"Gol","origin":"GRU","destination":"POA","flightStatus":"LANDED","departureTime":"21/12/2017 15:00","arrivalTime":"21/12/2017 17:20"}]
    );

    $httpBackend.when('GET','http://localhost:8080/flights?search=GRU').respond(200,
      [{"id":2,"flightNumber":300,"companyName":"Gol","origin":"GRU","destination":"POA","flightStatus":"LANDED","departureTime":"21/12/2017 15:00","arrivalTime":"21/12/2017 17:20"}]
    );

    $httpBackend.when('GET','http://localhost:8080/flights/1').respond(200,
      {"id":1,"flightNumber":123,"companyName":"Azul","origin":"SJK","destination":"BSB","flightStatus":"FLYING","departureTime":"21/12/2017 18:25","arrivalTime":null}
    );

    $httpBackend.when('GET','http://localhost:8080/flights/24').respond(404, '');

    $httpBackend.when('PUT','http://localhost:8080/flights/1?action=LAND').respond(200, '');

  }));

  it('should load all flights', function() {
    var flightsController = $controller('flightsController', { $scope: $rootScope });

    $httpBackend.flush();

    expect($rootScope.flights).toBeDefined();
    expect($rootScope.flights.length).toBe(2);
    expect($rootScope.flights[0].flightNumber).toBe(123);
    expect($rootScope.flights[1].flightNumber).toBe(300);
  });

  it('should search a flight', function() {
    var flightsController = $controller('flightsController', { $scope: $rootScope });

    $rootScope.searchString = 'GRU';
    $rootScope.flightSearch();

    $httpBackend.flush();

    expect($rootScope.flights).toBeDefined();
    expect($rootScope.flights.length).toBe(1);
    expect($rootScope.flights[0].flightNumber).toBe(300);
  });

  it('should clean a search', function() {
    var flightsController = $controller('flightsController', { $scope: $rootScope });

    $rootScope.clearSearch();

    $httpBackend.flush();

    expect($rootScope.flights).toBeDefined();
    expect($rootScope.flights.length).toBe(2);
    expect($rootScope.flights[0].flightNumber).toBe(123);
  });

  it('should load flight with id number 1', function() {
    var flightsController = $controller('flightsController', { $scope: $rootScope });

    $rootScope.loadFlight(1);

    $httpBackend.flush();

    expect($rootScope.flightDetails).toBeDefined();
    expect($rootScope.flightDetails.flightNumber).toBe(123);
  });

  it('should not load flight with inexistent id', function() {
    var flightsController = $controller('flightsController', { $scope: $rootScope });

    $rootScope.loadFlight(24);

    $httpBackend.flush();

    expect($rootScope.error).toBe('Server unreacheable');
  });

  it('should change the flight status', function() {
    var flightsController = $controller('flightsController', { $scope: $rootScope });

    event = $rootScope.$emit('click');
    expect(event).toBeDefined();

    $rootScope.flightAction(event, 1, 'LAND');

    $httpBackend.flush();

    expect($rootScope.flights).toBeDefined();
    expect($rootScope.flights.length).toBe(2);
  });
});