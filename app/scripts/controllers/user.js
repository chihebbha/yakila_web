'use strict';

/**
 * @ngdoc function
 * @name yakilaWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yakilaWebApp
 */

var Handler = function($scope, $http, CONSTANTS, $rootScope, socialLoginService,
  $cookies, $window, $location) {



  $scope.userImageUrl = $cookies.get('user.imageUrl');
  $scope.userName = $cookies.get('user.name');
  $scope.email = $cookies.get('user.email');

  $scope.logout = function() {
    socialLoginService.logout()
    $cookies.remove('user.imageUrl');
    $cookies.remove('user.name');
    $cookies.remove('user.email');
    $window.location.reload();

  }

  $scope.addUser = function(saveForm) {

    $http({
      url: CONSTANTS.API_HOST + '/users',
      method: 'post',
      headers: {
        data: {
          "name": saveForm.name,
          "lastname": saveForm.lastname,
          "city": saveForm.city,
          "email": saveForm.email,
          "number": saveForm.number,
          'job': saveForm.job,
          'password': saveForm.password,
          'type': saveForm.type,
          'path': saveForm.path,
          'gmail': saveForm.gmail,
          'fb': saveForm.fb,
          'favourite': saveForm.favourite,
          'path_photo_profil': saveForm.path_photo_profil,
          'list_path_image': saveForm.list_path_image,
          "sex": saveForm.sex,
          "token": saveForm.token
        }
      }
    })


  }









  $rootScope.$on('event:social-sign-in-success',
    function(event, userDetails) {
      for (var i = 1; i >= 0; i--) {

        $scope.userDetails = userDetails

        var fbUser = new Object()
        var gUser = new Object()
        fbUser.email = userDetails.email
        fbUser.fb = userDetails.uid
        gUser.email = userDetails.email
        gUser.gmail = userDetails.uid
        $cookies.put('user.imageUrl', userDetails.imageUrl);
        $scope.userImageUrl = $cookies.get('user.imageUrl');
        $cookies.put('user.email', userDetails.email);
        $scope.email = $cookies.get('user.email');
        $cookies.put('user.name', userDetails.name);
        $scope.userName = $cookies.get('user.name');
        console.log($scope.email)
        if (userDetails.provider === "facebook") {

          $http({
              url: 'http://localhost:8080/authenticatefb',
              method: 'post',
              headers: {
                "Content-Type": "application/json"
              },
              data: fbUser
            })
            .then(
              function(res) {
                console.log(res)
              },
              function(err) {

                if (err.data.message === "User Not Found") {

                  console.log("register redirection")
                  console.log($location)
                  $location.path('/register')
                  $scope.userDetails = userDetails
                }
              }

            )

        }




        if (userDetails.provider === "google") {
          $http({
              url: 'http://localhost:8080/authenticategmail',
              method: 'post',
              headers: {
                "Content-Type": "application/json"
              },
              data: gUser
            })
            .then(
              function(res) {
                console.log(res)
              },
              function(err) {

                if (err.data.message === "User Not Found") {

                  console.log("register redirection")
                  console.log($location)
                  $location.path('/register')
                  $scope.userDetails = userDetails
                }
              }

            )
        }
      }
    })


  $rootScope.$on('event:social-sign-out-success', function(event, logoutStatus) {
    console.log(logoutStatus)
  })


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
        $scope.position = position;
        $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=36.84755570,10.19842850&sensor=true")
          .then(function(success) {
            console.log(success.data.results[0].formatted_address)
            $scope.geolocation = success.data.results[0].formatted_address
          })
      });
    });

  }
}










Handler.$inject = ['$scope', '$http', 'CONSTANTS', '$rootScope',
  'socialLoginService', '$cookies', '$window', '$location'
]
angular.module('yakilaWebApp').controller('UserCtrl', Handler)
