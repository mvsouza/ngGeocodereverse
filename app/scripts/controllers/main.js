'use strict';

/**
 * @ngdoc function
 * @name ngGeocodereverseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngGeocodereverseApp
 */
angular.module('ngGeocodereverseApp')
  .controller('MainCtrl', ["$scope", "$q", "GeocodeReverseService",function ($scope, $q, geocodeReverse) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.GeoCodes = [{
      lng: -51.21169567108154,
      lat: -30.035365213349987
    },{
      lng: 30.34063699405727,
      lat: 40.85375227031111
    },{
      lng: 30.033567493902805,
      lat: 39.392796969209044
    },{
      lng: 4.352538585662842,
      lat: 50.84665167605899
    },{
      lng: -86.21685470066613,
      lat: 32.36017444738497
    },{
      lng: 120.97249746322632,
      lat: 14.579248440065973
    },{
      lng: -0.12219666416832439,
      lat: 51.51299611935441
    },{
      lng: -70.64397811889648,
      lat: -33.44197025218819
    },{
      lng: -70.6596851348877,
      lat: -33.46259462982881
    },{
      lng: -43.23025703430176,
      lat: -22.912309877562752
    },{
      lng: -43.178782761096954,
      lat: -22.905248754597654
    },{
      lng: -58.375983238220215,
      lat: -34.6168043069276
    },{
      lng: -58.45057010650635,
      lat: -34.55619411604977
    },{
      lng: -35.20737826824188,
      lat: -5.811481408697968
    },{
      lng: -35.1963872927909,
      lat: -5.7631718966632
    },{
      lng: -56.191432,
      lat: -34.905871
    },{
      lng: -56.20674133300781,
      lat: -34.907542818529386
    },{
      lng: -38.50961445182974,
      lat: -12.973679387433013
    },{
      lng: -74.05539716723538,
      lat: 4.673666597385349
    },{
      lng: -74.06830072402954,
      lat: 4.6155448214597765
    },{
      lng: 139.7786,
      lat: 35.6807
    },{
      lng: -114.0701,
      lat: 51.0495
    },{
      lat: -73.989,
      lng: 40.733
    },{
      lat: 52.54877605,
      lng: -1.81627023283164
    }];
    $scope.FindAllCitys = function(){
        angular.forEach($scope.GeoCodes, function(value, key){
          $scope.FindCitys(value);
        });
    };


    $scope.FindCitys = function(place){
      var
          a1 = geocodeReverse.GetCityMapbox(place.lng,place.lat),
          a = a1.then(function(result){
            //console.info("GetCityMapbox",result ? result.name:"");
            //return result;
          })
          ,
          b = geocodeReverse.GetCityOpenstreetmap(place.lng,place.lat).success(function(result){
            //console.info("GetCityOpenstreetmap",result.address? result.address.city:"");
            //return result;
          })
          ,
          c = geocodeReverse.GetCityGeonames(place.lng,place.lat).then(function(result){
            //console.info("GetCityGeonames",result.toponymName);
            return result;
          })
          ,
          d = geocodeReverse.GetCityOpencage(place.lng,place.lat).then(function(result){
            //console.info("GetCityGeonames",result.toponymName);
            return result;
          })
          ;
      $q.all([c,d]).then(function(result) {
        var tmp = [];
        angular.forEach(result, function(response) {
          tmp.push(response);
        });
        return tmp;
      }).then(function(result) {
          console.info(result);
      });
    };
    $scope.FindCitysGeonames = function(){
        angular.forEach($scope.GeoCodes, function(value, key){
          $scope.FindCitys(value);
        });
    };
    //$scope.FindAllCitys();
    //$scope.FindCitys($scope.GeoCodes[0]);
  }]);
