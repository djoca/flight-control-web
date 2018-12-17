describe("adminController", function() {

  beforeEach(module('flightControlApp.admin'));

  var $controller;
  var $rootScope;
  var $httpBackend;
  var $compile;

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $compile = $injector.get('$compile');

    $httpBackend.when('GET','http://localhost:8080/aircrafts').respond(200,
        [{"id":1,"manufacturer":"Embraer","model":"190","registry":"PT-HYC"},{"id":2,"manufacturer":"Boeing","model":"737","registry":"PP-GOR"}]
    );
  
    $httpBackend.when('GET','http://localhost:8080/airports').respond(200,
        [{"id":1,"iataCode":"SJK","cityName":"São José dos Campos"},{"id":2,"iataCode":"GRU","cityName":"São Paulo"},{"id":3,"iataCode":"CGH","cityName":"São Paulo"}]
    );
  
    	$httpBackend.when('GET','http://localhost:8080/pilots').respond(200,
    	    [{"id":1,"name":"Jack Black"},{"id":2,"name":"Bob Bobblehead"}]
    	);
  
    $httpBackend.when('POST','http://localhost:8080/flights').respond(201,
        {"flightNumber":200,"companyName":"Azul","aircraft":{"id":1},"pilot":{"id":1},"origin":{"id":1},"destination":{"id":6},"departureTime":"12/12/2018 13:00"}
    );

  }));

  it('should load all aircrafts', function() {
    var adminController = $controller('adminController', { $scope: $rootScope });
    
    $httpBackend.flush();
    
    expect($rootScope.aircrafts).toBeDefined();
    expect($rootScope.aircrafts.length).toBe(2);
    expect($rootScope.aircrafts[0].id).toBe(1);
    expect($rootScope.aircrafts[0].manufacturer).toBe('Embraer');
    expect($rootScope.aircrafts[0].model).toBe('190');
    expect($rootScope.aircrafts[0].registry).toBe('PT-HYC');
  });

  it('should load all airports', function() {
    var adminController = $controller('adminController', { $scope: $rootScope });
    
    $httpBackend.flush();
    
    expect($rootScope.airports).toBeDefined();
    expect($rootScope.airports.length).toBe(3);
    expect($rootScope.airports[0].id).toBe(1);
    expect($rootScope.airports[0].iataCode).toBe('SJK');
    expect($rootScope.airports[0].cityName).toBe('São José dos Campos');
  });

  it('should load all pilots', function() {
    var adminController = $controller('adminController', { $scope: $rootScope });
    
    $httpBackend.flush();
    
    expect($rootScope.pilots).toBeDefined();
    expect($rootScope.pilots.length).toBe(2);
    expect($rootScope.pilots[0].id).toBe(1);
    expect($rootScope.pilots[0].name).toBe('Jack Black');
  });
  
  it('should create a new flight', function() {
    var adminController = $controller('adminController', { $scope: $rootScope });

    var element = angular.element('<form name="newFlightForm"></form>');
    $compile(element)($rootScope);

    expect($rootScope.newFlightForm).toBeDefined();
    expect($rootScope.form).toBeDefined();

    $rootScope.form.number = '200';
    $rootScope.form.companyName = 'Azul';
    $rootScope.form.aircraft = '1';
    $rootScope.form.pilot = '1';
    $rootScope.form.origin = '1';
    $rootScope.form.destination = '6';
    $rootScope.form.departureTime = '12/12/2018 13:00';
    
    $rootScope.createFlight();

    $httpBackend.flush();
    
    expect($rootScope.message).toBe('Flight created');
    expect($rootScope.form).toBeDefined();
  });
  

});