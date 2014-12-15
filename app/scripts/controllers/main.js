'use strict';

/**
 * @ngdoc function
 * @name ngGeocodereverseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngGeocodereverseApp
 */
angular.module('ngReverseGeocodeApp')
  .filter('readeble', function () {
    return function (text) {
        if (text !== undefined) return text.replace(/\n/g, '<br />').replace(/\p/g, '&quot;');
    };
  })
  .controller('MainCtrl', ["$scope", "$q", "$anchorScroll", "$location", "GeocodeReverseService",function ($scope, $q, $anchorScroll, $location, geocodeReverse) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.GeoCodes = { a0: {
      lng: -51.21169567108154,
      lat: -30.035365213349987
    },a1:{
      lng: 30.34063699405727,
      lat: 40.85375227031111
    },a2:{
      lng: 30.033567493902805,
      lat: 39.392796969209044
    },a3:{
      lng: 4.352538585662842,
      lat: 50.84665167605899
    },a4:{
      lng: -86.21685470066613,
      lat: 32.36017444738497
    },a5:{
      lng: 120.97249746322632,
      lat: 14.579248440065973
    },a6:{
      lng: -0.12219666416832439,
      lat: 51.51299611935441
    },a7:{
      lng: -70.64397811889648,
      lat: -33.44197025218819
    },a8:{
      lng: -70.6596851348877,
      lat: -33.46259462982881
    },a9:{
      lng: -43.23025703430176,
      lat: -22.912309877562752
    },a10:{
      lng: -43.178782761096954,
      lat: -22.905248754597654
    },a11:{
      lng: -58.375983238220215,
      lat: -34.6168043069276
    },a12:{
      lng: -58.45057010650635,
      lat: -34.55619411604977
    },a13:{
      lng: -35.20737826824188,
      lat: -5.811481408697968
    },a14:{
      lng: -35.1963872927909,
      lat: -5.7631718966632
    },a15:{
      lng: -56.191432,
      lat: -34.905871
    },a16:{
      lng: -56.20674133300781,
      lat: -34.907542818529386
    },a17:{
      lng: -38.50961445182974,
      lat: -12.973679387433013
    },a19:{
      lng: -74.05539716723538,
      lat: 4.673666597385349
    },a20:{
      lng: -74.06830072402954,
      lat: 4.6155448214597765
    },a21:{
      lng: 139.7786,
      lat: 35.6807
    },a22:{
      lng: -114.0701,
      lat: 51.0495
    },a23:{
      lat: -73.989,
      lng: 40.733
    },a24:{
      lat: 52.54877605,
      lng: -1.81627023283164
    }};
    $scope.FindAllCitys = function(){
        angular.forEach($scope.GeoCodes, function(value, key){
          console.log(value);
          $scope.FindCitysUsingAllAPIs(value);
        });
    };

    $scope.FindCitysUsingAllAPIs = function(place){
      function returnResult(result){
        return result;
      }
      function mergeResutsOnArrayAtachToPlace(arryOfResults){
        return $q.all(arryOfResults).then(function(results) {
          place.results = results;
          return results;
        });
      }
      var promiseMapbox = geocodeReverse.GetCityMapbox(place.lng,place.lat).then(returnResult),
          promiseOpenstreet = geocodeReverse.GetCityOpenstreetmap(place.lng,place.lat).then(returnResult),
          promiseGeonames = geocodeReverse.GetCityGeonames(place.lng,place.lat).then(returnResult),
          promiseOpencage = geocodeReverse.GetCityOpencage(place.lng,place.lat).then(returnResult);
      var promisesArray = [promiseMapbox,promiseOpenstreet,promiseGeonames,promiseOpencage];
      return mergeResutsOnArrayAtachToPlace(promisesArray);
    };
    $scope.FindCitysGeonames = function(){
        angular.forEach($scope.GeoCodes, function(value, key){
          $scope.FindCitys(value);
        });
    };

    $scope.$on('leafletDirectiveMarker.click', function (event, args) {
      $location.hash(args.markerName);
      $anchorScroll();
    });

    $scope.FindAllCitys();
  }]);
