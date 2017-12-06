'use strict';

/**
 * @ngdoc overview
 * @name yakilaWebApp
 * @description
 * # yakilaWebApp
 *
 * Main module of the application.
 */


angular.module('yakilaWebApp', [
    'ngRoute',
    'socialLogin',
    'ngCookies'
  ])
  .config(function($routeProvider, socialProvider) {




    //socialProvider.setGoogleKey("YOUR GOOGLE CLIENT ID")
    socialProvider.setFbKey({ appId: "111519726157910", apiVersion: "v2.11" })
    socialProvider.setGoogleKey("1PC9JL6sE0lpbs0_S-WmLUXl");
    console.log(socialProvider.$get())


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  })


  .directive('googleplace', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, model) {
        var options = {
          types: [],
          componentRestrictions: {}
        };
        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
          scope.$apply(function() {
            model.$setViewValue(element.val());
          });
        });
      }
    };
  }).directive('googleplace', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, model) {
        var options = {
          types: [],
          componentRestrictions: {}
        };
        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
          scope.$apply(function() {
            model.$setViewValue(element.val());
          });
        });
      }
    };
  });
