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
  .config(function ($routeProvider,socialProvider) {


   

    //socialProvider.setGoogleKey("YOUR GOOGLE CLIENT ID")
 socialProvider.setFbKey({appId:"111519726157910",apiVersion:"v2.11"})
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
      .otherwise({
        redirectTo: '/'
      });
  })



