/*
 WordPress REST Service
 Repository: https://github.com/arielweinberger/angularjs-wordpress-rest
 ----------------------------------
 Ariel Weinberger, 2016
 GitHub: https://github.com/arielweinberger

 Contributors: -
 */
var mod = angular.module('app.services.rest', []);

mod.service('REST', function ($http, $q, $httpParamSerializerJQLike) {
  
  var self = {};

  /**
   * setStaticRoute()
   * -----------------
   * Sets a static route path so all route parameters
   * will be appended to it (useful for extending the service).
   *
   * @param path
   */
  self.setStaticRoute = function (path) {
    self.staticRoute = path;
  };

  /**
   * get()
   * ------------------
   * Sends a GET request to a given route.
   *
   * @param route
   * @param isAbsolute (if true, static route base will be ignored for the request)
   * @returns {Promise}
   */
  self.get = function (route, isAbsolute) {
    var d = $q.defer();

    if(self.staticRoute && isAbsolute !== undefined) {
      route = self.staticRoute + route;
    }

    console.debug('[REST] Sending GET request to "' + route + '"');

    $http({
      method: 'GET',
      url: route,
    }).then(function (res) {
      console.info('[REST] GET request sent to "' + route + '"');
      d.resolve(res);
    }, function (err) {
      console.error('[REST] GET request failed. Error message: ', err);
      d.reject(err);
    });

    return d.promise;
  };

  /**
   * post()
   * ----------------
   * Sends a POST request to a given route.
   * 
   * @param route
   * @param params
   * @param isAbsolute (if true, static route base will be ignored for the request)
   * @returns {Promise}
   */
  self.post = function (route, params, isAbsolute) {
    var d = $q.defer();

    if(self.staticRoute && isAbsolute !== undefined) {
      route = self.staticRoute + route;
    }

    console.debug('[REST] Sending POST request to "' + route + '", params: ' + angular.toJson(params));

    $http({
      method: 'POST',
      url: route,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $httpParamSerializerJQLike(params)
    }).then(function (res) {
      console.info('[REST] POST request sent to "' + route + '"');
      d.resolve(res);
    }, function (err) {
      console.error('[REST] POST request failed. Error message: ', err);
      d.reject(err);
    });

    return d.promise;
  };

  return self;
});