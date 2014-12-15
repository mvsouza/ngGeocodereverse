var reverseGeocodeModule =  angular.module('ReverseGeocode',[]);
reverseGeocodeModule.constant('GeoAPIConstants', {
    mapBoxId: 'fdorneles.map-15y345pd',
    geonameId: 'developit',
    openCage: '3c734d88400ff0ccfa6008e048586673'
  });


reverseGeocodeModule.service('OpenCageService', [ '$http','GeoAPIConstants',
  function($http,GeoAPIConstants){
    var self = this;
    var urls = {};
    urls.geocode = "https://api.opencagedata.com/geocode/v1/json?q={1},{0}&pretty=1&key={2}";
    self.FindCityGeoCodeReverse = function(lng, lat){
      if(lng>0)
        lng='+'+lng;
      if(lat>0)
        lat='+'+lat;
      var q = $http.get(urls.geocode.format(lng,lat,GeoAPIConstants.openCage));
        return q.then(function(r){
                    return r.data.results[0].components;
        });
      };
  }]);


reverseGeocodeModule.service('MapboxService', [ '$http','GeoAPIConstants',
  function($http,GeoAPIConstants){
    var self = this;
    var urls = {};
    urls.geocode = "http://api.tiles.mapbox.com/v3/{0}/geocode/{1},{2}.json";
    self.FindCityGeoCodeReverse = function(lng, lat){
      var q = $http.get(urls.geocode.format(GeoAPIConstants.mapBoxId,lng,lat));
        return q.then(function(r){
                    return self.extractCityFromGeocodeJSONResult(r.data);
        });
      };
    self.extractCityFromGeocodeJSONResult = function(result){
      if(self.isResultEmpty(result))
        return null;
      return self.searchInMatrixForCity(result);
    };
    self.isResultEmpty = function(result){
      return !result.results || result.results.length === 0;
    }
    self.searchInMatrixForCity = function(result){
      for(var i = 0; i < result.results.length; i++){
        for(var j = 0; j < result.results.length; j++){
          if(result.results[i][j].type == 'city')
            return result.results[i][j];
        }
      }
      return null;
    }
  }]);

reverseGeocodeModule.service('OpenstreetmapService', [ '$http',
  function($http){
    var self = this;
    var urls = {};
    urls.geocode = "http://nominatim.openstreetmap.org/reverse?format=json&lat={1}&lon={0}";
    self.FindCityGeoCodeReverse = function(lng, lat){
        var q = $http.get(urls.geocode.format(lng,lat));
        return q.then(function(r){
                    return r.data;
        });
    };
  }]);

reverseGeocodeModule.service('GeonamesService', [ '$http','GeoAPIConstants',
  function($http,GeoAPIConstants){
    var self = this;
    var urls = {};
    urls.geocodeReverse = "http://ws.geonames.org/findNearbyPlaceNameJSON?lat={1}&lng={0}&style=full&username={2}";
    urls.geocodeNeighbour = "http://api.geonames.org/neighbourhoodJSON?lat={1}&lng={0}&username={2}";

    self.FindCityGeoCodeReverse = function(lng, lat){
            var q = $http.get(urls.geocodeReverse.format(lng,lat,GeoAPIConstants.geonameId));
            return q.then(function(result){
                var listResults = result.data.geonames;
                for(var i = 0; i < listResults.length; i++){
                    if(0<=self.findFeatureClassIndexFor(listResults[i]))
                      return listResults[i];
                }
            });
    };
    self.findFeatureClassIndexFor = function(geolocation){
      var featureClassNameList = geolocation.fclName.split(',');
      return featureClassNameList.indexOf("city");
    };
  }]);

reverseGeocodeModule.service('GeocodeReverseService', ['MapboxService', 'OpenstreetmapService','GeonamesService','OpenCageService',
  function(MapboxService, OpenstreetmapService, GeonamesService, OpenCageService){
    var self = this;
    self.GetCityMapbox = function(lng, lat){
      var q = MapboxService.FindCityGeoCodeReverse(lng, lat);
      return q;
    };
    self.GetCityOpenstreetmap = function(lng, lat){
      return  OpenstreetmapService.FindCityGeoCodeReverse(lng, lat);
    };
    self.GetCityGeonames = function(lng, lat){
      return  GeonamesService.FindCityGeoCodeReverse(lng, lat);
    };
    self.GetCityGeonamesNeighbour = function(lng, lat){
      return  GeonamesService.FindCityGeoCodeReverse(lng, lat);
    };
    self.GetCityOpencage = function(lng, lat){
      return  OpenCageService.FindCityGeoCodeReverse(lng, lat);
    };
    return self;
  }]);
